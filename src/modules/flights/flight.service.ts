import {
    Injectable, Logger,
} from "@nestjs/common";

import { EnvConfig, IEnvConfig } from "@/constants/config";
import { SearchRoundFlightDTO } from "./dto/searchFlight.dto";
import { SearchFlightAPIResponse, RoundTripItineraryArray } from "./flight.types";
import { mapSearchFlightDTOtoParams, mapSearchFlightAPIResponsetoRoundTripResponseData } from "./flight.serializer";
import { AxiosResponse } from "axios";
import { CommonResponse } from "@/constants/response";
import axios from 'axios';
import { EnumSearchFlightContextStatus, EnumSearchFlightOrderBy, EnumSortDirection } from "@/constants/flight";
import { error } from "console";
import { calculateNumOfDays, validateStartDateEqualOrMoreThanCurrentDate, validateStartDateLessThanEndDate } from "@/helpers/days";

@Injectable()
export class FlightService {
    private logger = new Logger(FlightService.name);
    private config: IEnvConfig = EnvConfig;
    private rapidAPIheaders = {
        headers: {
            'X-RapidAPI-Key': this.config.rapidAPIToken,
            'X-RapidAPI-Host': this.config.rapidAPIBaseURL,
        }
    }

    constructor() { }

    //search round trip function
    async searchFlightRoundTrip(data: SearchRoundFlightDTO): Promise<RoundTripItineraryArray> {

        try {
            const baseUrl = this.config.rapidAPIBaseURL;
            //map the dto to the actual params used by the rapid api
            const body = mapSearchFlightDTOtoParams(data);

            this.logger.log(`Search roundtrip flights API: Trigger Rapid API Search roundtrip`);
            this.logger.log(`Search roundtrip flights API: Rapid API Search roundtrip Receieved payload: ${JSON.stringify(body)}`);

            const startDate = new Date(data.depart_at);
            const endDate = new Date(data.return_at);
            if (!validateStartDateEqualOrMoreThanCurrentDate(startDate)) {
                throw new Error("Start date is less than the current date");
            }
            if (!validateStartDateLessThanEndDate(startDate, endDate)) {
                throw new Error("Start date is less than the current date");
            }

            const discountPercentage = this.checkDiscountPercentage(startDate, endDate);

            //call for the round trip API to get the results, however it might take a while for the results to return hence returning incomplete status
            const response: AxiosResponse<CommonResponse<SearchFlightAPIResponse>> = await axios.get(
                `https://${baseUrl}/flights/search-roundtrip`, {
                headers: this.rapidAPIheaders.headers,
                params: body,
            });

            const respData = response.data.data;
            this.logger.log(`Search roundtrip flights API: Successfully received Rapid API Search roundtrip response`);

            //if complete status return the results
            if (respData.context.status === EnumSearchFlightContextStatus.COMPLETE) {
                this.logger.log(`Search roundtrip flights API: Search completed`);
                const results = mapSearchFlightAPIResponsetoRoundTripResponseData(respData, discountPercentage);
                if (data?.sort_by && data?.order_by) {
                    return this.sortRoundTripResults(results, data.sort_by, data.order_by)
                }
                return results;
            }

            //retry the api call and update current response
            let currentNoOfCalls = 0;
            let currentResponse: AxiosResponse<CommonResponse<SearchFlightAPIResponse>> = response;

            if (currentResponse.data.data.context.sessionId === "") {
                throw new Error("Session id for Rapid API Search incompleted");
            }

            //since its incomplete, use the previous session id and try to call the search incomplete api until it hits max retry
            while (currentNoOfCalls < this.config.rapidAPIMaxRetry && currentResponse.data.data.context.status === EnumSearchFlightContextStatus.INCOMPLETE) {

                this.logger.log(`Search roundtrip flights API: Trigger Rapid API Search incomplete, current attempt ${currentNoOfCalls + 1}`);

                //set delay between each api call so we dont bombard or ddos the rapid api and get banned, convert to milliseconds
                await new Promise(resolve => setTimeout(resolve, this.config.rapidAPICallIntervalInSeconds * 1000))

                //call the search incomplete api
                currentResponse = await axios.get(
                    `https://${baseUrl}/flights/search-incomplete`,
                    {
                        headers: this.rapidAPIheaders.headers,
                        params: {
                            sessionId: currentResponse.data.data.context.sessionId
                        }
                    }
                );

                //track the attempt
                currentNoOfCalls++;

                this.logger.log(`Search roundtrip flights API: Successfully received Rapid API Search incomplete response`);
                //successful return the results
                if (currentResponse.data.data.context.status === EnumSearchFlightContextStatus.COMPLETE) {
                    const results = mapSearchFlightAPIResponsetoRoundTripResponseData(currentResponse.data.data, discountPercentage);
                    this.logger.log(`Search roundtrip flights API: Search completed`);
                    if (data?.sort_by && data?.order_by) {
                        return this.sortRoundTripResults(results, data.sort_by, data.order_by)
                    }
                    return results;
                }
                //track the call attempts
                this.logger.log(`Search roundtrip flights API: Trigger Rapid API Search incomplete, still incomplete, current attempt ${currentNoOfCalls}`);
            }

            this.logger.log(`Search roundtrip flights API: Search incomplete, return incomplete data`);
            //throw error if the fallback failed after hitting max retry
            throw new Error(`Flight search incomplete after retrying ${this.config.rapidAPIMaxRetry} times which is the max attempt`)

        } catch (error) {
            this.logger.error(`Search roundtrip flights API: Error occured ${error}`);
            throw error;
        }

    }

    //the current rapid api does not support ordering, hence sort the simplified results
    private sortRoundTripResults(data: RoundTripItineraryArray, direction: EnumSortDirection, param: EnumSearchFlightOrderBy): RoundTripItineraryArray {
        this.logger.log(`Search roundtrip flights API: Sorting results`);
        if (param === EnumSearchFlightOrderBy.PRICE) {
            this.logger.log(`Search roundtrip flights API: Sorting by price in ${direction}`);
            return [...data].sort((a, b) => {
                if (direction === EnumSortDirection.DESC) {
                    return b.price - a.price;
                }

                return a.price - b.price;
            });
        }

        return data;
    }

    private checkDiscountPercentage(startDate: Date, endDate: Date): number {

        const numOfDays = calculateNumOfDays(startDate, endDate);
        if (numOfDays > this.config.applyDiscountNumOfDays && this.config.applyDiscountNumOfDays > 0) {
            return this.config.discountPercentage;
        }

        return 0;
    }
}
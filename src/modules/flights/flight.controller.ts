import { FlightService } from "./flight.service";
import { Get, Query, Controller, HttpStatus, HttpException } from "@nestjs/common";
import { RoundTripItineraryArray } from "./flight.types";
import { SearchRoundFlightDTO } from "./dto/searchFlight.dto";
import { CommonResponse } from "@/constants/response";
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import axios from "axios";

@ApiTags('Flights API')
@Controller('/v1/flights')
export class FlightController {
    constructor(private readonly service: FlightService) { }

    @ApiOperation({ summary: "Search for flights" })
    @ApiResponse({ status: 200, description: "Retrieves flight search results" })
    @Get('search/round-trip')
    public async searchFlights(@Query() params: SearchRoundFlightDTO): Promise<CommonResponse<RoundTripItineraryArray>> {
        try {
            const data = await this.service.searchFlightRoundTrip(params);
            const response: CommonResponse<RoundTripItineraryArray> = {
                code: HttpStatus.OK,
                desc: 'Flight search completed',
                data,
            };
            return response;
        } catch (error) {
            //throw specifc axios error (external calls)
            if (axios.isAxiosError(error)) {
                throw new HttpException({
                    code: error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
                    desc: error.response?.data?.messages || "Error occured in external calls",
                    data: [],
                }, error.response?.status);
            };

            //throw application specific error
            throw new HttpException({
                code: HttpStatus.INTERNAL_SERVER_ERROR,
                desc: error.message || "An application error occured",
                data: [],
            }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
import { SearchFlightAPIParams, SearchFlightAPIResponse, SearchFlightResponseData, RoundTripItinerary, RoundTripItineraryArray, FlightLocationAPIResponseData, FlightLocation, FlightLocations, FlightLocationAPIParams } from "./flight.types"
import { SearchRoundFlightDTO } from "./dto/searchFlight.dto"
import { GetFlightLocationDTO } from "./dto/flightLocation.dto"

export const mapSearchFlightDTOtoParams = (data: SearchRoundFlightDTO): SearchFlightAPIParams => {
	return {
		fromEntityId: data.origin,
		toEntityId: data.destination,
		departDate: data.depart_at,
		returnDate: data.return_at,
		stops: data.stops,
		market: data.market,
		currency: data.currency,
		locale: "en-US",
		adults: data.adults,
		children: data.children,
		infants: data.infants,
		cabinClass: data.class,
	}
}

//map the complex response into a simplified response
export const mapSearchFlightAPIResponsetoRoundTripResponseData = (data: SearchFlightAPIResponse, discountPercentage: number): RoundTripItineraryArray => {

	let respDatas: RoundTripItinerary[] = [];
	if (data.itineraries.length > 0) {

		const itineraries = data.itineraries


		for (let i = 0; i < itineraries.length; i++) {
			const itinerary = itineraries[i];

			let price = itinerary.price.raw;
			//do discount here
			let discountedPrice = itinerary.price.raw;
			if (discountPercentage > 0) {
				discountedPrice = itinerary.price.raw - (itinerary.price.raw * (discountPercentage / 100));
				discountedPrice = Number(discountedPrice.toFixed(2));
				price = discountedPrice;
			}

			const respData: RoundTripItinerary = {
				formatted_price: itinerary.price.formatted,
				original_price: itinerary.price.raw,
				price: price,
				discounted_price: discountedPrice,
				total_trip_duration: itinerary.legs[0].durationInMinutes + itinerary.legs[1].durationInMinutes,
				total_trip_duration_format: "minutes",
				outbound_flight: {
					origin: {
						airport: itinerary.legs[0].origin.name,
						code: itinerary.legs[0].origin.displayCode,
						city: itinerary.legs[0].origin.city,
						country: itinerary.legs[0].origin.country
					},
					destination: {
						airport: itinerary.legs[0].destination.name,
						code: itinerary.legs[0].destination.displayCode,
						city: itinerary.legs[0].destination.city,
						country: itinerary.legs[0].destination.country
					},
					departure: itinerary.legs[0].departure,
					arrival: itinerary.legs[0].arrival,
					duration: itinerary.legs[0].durationInMinutes,
					duration_format: 'minutes',
					airline: itinerary.legs[0].segments[0].marketingCarrier.name,
					airline_code: itinerary.legs[0].segments[0].marketingCarrier.alternateId,
					flight_number: itinerary.legs[0].segments[0].flightNumber,
					stops: itinerary.legs[0].segments.length > 1 ? '1 stop' : 'Direct'
				},
				return_flight: {
					origin: {
						airport: itinerary.legs[1].origin.name,
						code: itinerary.legs[1].origin.displayCode,
						city: itinerary.legs[1].origin.city,
						country: itinerary.legs[1].origin.country
					},
					destination: {
						airport: itinerary.legs[1].destination.name,
						code: itinerary.legs[1].destination.displayCode,
						city: itinerary.legs[1].destination.city,
						country: itinerary.legs[1].destination.country
					},
					departure: itinerary.legs[1].departure,
					arrival: itinerary.legs[1].arrival,
					duration: itinerary.legs[0].durationInMinutes,
					duration_format: 'minutes',
					airline: itinerary.legs[1].segments[0].marketingCarrier.name,
					airline_code: itinerary.legs[1].segments[0].marketingCarrier.alternateId,
					flight_number: itinerary.legs[1].segments[0].flightNumber,
					stops: itinerary.legs[1].segments.length > 1 ? '1 stop' : 'Direct'
				},
				policies: {
					change_allowed: itinerary.farePolicy.isChangeAllowed,
					cancellation_allowed: itinerary.farePolicy.isCancellationAllowed
				},
				itinerary_id: itinerary.id
			}

			respDatas.push(respData)
		}
	}

	return respDatas
}

export const mapFlightLocations = (data: FlightLocationAPIResponseData): FlightLocations => {
	let flightLocations: FlightLocations = [];

	if (data.length > 0) {

		for (let i = 0; i < data.length; i++) {
			const location = data[i];
			const flightLocation: FlightLocation = {
				city: location.presentation.title,
				country: location.presentation.subtitle,
				location_id: location.presentation.skyId,
			};
			flightLocations.push(flightLocation);
		}

	}
	return flightLocations;
}

export const mapGetFlightLocationDTOtoParams = (data: GetFlightLocationDTO): FlightLocationAPIParams => {
	return {
		query: data.query,
	}
}
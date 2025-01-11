export type SearchFlightAPIParams = {
	fromEntityId: string;
	toEntityId: string;
	departDate: string;
	returnDate: string;
	wholeMonthDepart?: string;
	wholeMonthReturn?: string;
	stops?: string;
	market?: string;
	currency?: string;
	locale?: string;
	adults?: number;
	children?: number;
	infants?: number;
	cabinClass?: string;
}


export type SearchFlightAPIResponse = {
	context: {
		status: string;
		sessionId: string;
		totalResults: number;
	};
	itineraries: {
		id: string;
		price: {
			raw: number;
			formatted: string;
			pricingOptionId: string;
		};
		legs: {
			id: string;
			origin: {
				id: string;
				entityId: string;
				name: string;
				displayCode: string;
				city: string;
				country: string;
				isHighlighted: boolean;
			};
			destination: {
				id: string;
				entityId: string;
				name: string;
				displayCode: string;
				city: string;
				country: string;
				isHighlighted: boolean;
			};
			durationInMinutes: number;
			stopCount: number;
			isSmallestStops: boolean;
			departure: string;
			arrival: string;
			timeDeltaInDays: number;
			carriers: {
				marketing: {
					id: number;
					alternateId: string;
					logoUrl: string;
					name: string;
				}[];
				operating: {
					id: number;
					alternateId: string;
					logoUrl: string;
					name: string;
				}[];
				operationType: string;
			};
			segments: {
				id: string;
				origin: {
					flightPlaceId: string;
					displayCode: string;
					parent: {
						flightPlaceId: string;
						displayCode: string;
						name: string;
						type: string;
					};
					name: string;
					type: string;
					country: string;
				};
				destination: {
					flightPlaceId: string;
					displayCode: string;
					parent: {
						flightPlaceId: string;
						displayCode: string;
						name: string;
						type: string;
					};
					name: string;
					type: string;
					country: string;
				};
				departure: string;
				arrival: string;
				durationInMinutes: number;
				flightNumber: string;
				marketingCarrier: {
					id: number;
					name: string;
					alternateId: string;
					allianceId: number;
					displayCode: string;
				};
				operatingCarrier: {
					id: number;
					name: string;
					alternateId: string;
					allianceId: number;
					displayCode: string;
				};
			}[];
		}[];
		isSelfTransfer: boolean;
		isProtectedSelfTransfer: boolean;
		farePolicy: {
			isChangeAllowed: boolean;
			isPartiallyChangeable: boolean;
			isCancellationAllowed: boolean;
			isPartiallyRefundable: boolean;
		};
		eco: {
			ecoContenderDelta: number;
		};
		hasFlexibleOptions: boolean;
		score: number;
	}[];
	filterStats: {
		duration: {
			min: number;
			max: number;
			multiCityMin: number;
			multiCityMax: number;
		};
		airports: {
			city: string;
			airports: {
				id: string;
				entityId: string;
				name: string;
			}[];
		}[];
		carriers: {
			id: number;
			alternateId: string;
			logoUrl: string;
			name: string;
		}[];
		stopPrices: {
			direct: {
				isPresent: boolean;
			};
			one: {
				isPresent: boolean;
				formattedPrice: string;
			};
			twoOrMore: {
				isPresent: boolean;
				formattedPrice: string;
			};
		};
	};
	flightsSessionId: string;
	destinationImageUrl: string;
	token: string;
};

/**
 * example:
 * Flight ID: 10413-9596-2501171045-2501171430--32132
From: Paris Charles de Gaulle (CDG), Paris, France
To: Atlanta Hartsfield-Jackson (ATL), Atlanta, United States
Departure: 2025-01-17 at 10:45 AM
Arrival: 2025-01-17 at 2:30 PM
Duration: 9 hours 45 minutes
Flight Number: KL2032
Operated by: Air France (Marketed by KLM)
 * 
 */
export type SearchFlightResponseData = {
	flight_id: string;
	from: string;
	to: string;
	departure: string;
	duration: number;
	flight_number: string;
	operated_by: string;
}

export type RoundTripItinerary = {
	original_price: number;
	price: number;
	discounted_price: number;
	formatted_price: string;
	total_trip_duration: number;
	total_trip_duration_format: string;
	outbound_flight: {
		origin: {
			airport: string;
			code: string;
			city: string;
			country: string;
		};
		destination: {
			airport: string;
			code: string;
			city: string;
			country: string;
		};
		departure: string;
		arrival: string;
		duration: number;
		duration_format: string;
		airline: string;
		flight_number: string;
		airline_code: string;
		stops: string;
	};
	return_flight: {
		origin: {
			airport: string;
			code: string;
			city: string;
			country: string;
		};
		destination: {
			airport: string;
			code: string;
			city: string;
			country: string;
		};
		departure: string;
		arrival: string;
		duration: number;
		duration_format: string;
		airline: string;
		airline_code: string;
		flight_number: string;
		stops: string;
	};
	policies: {
		change_allowed: boolean;
		cancellation_allowed: boolean;
	};
	itinerary_id: string;
};

export type RoundTripItineraryArray = RoundTripItinerary[];
export enum EnumFlightJourney {
    RoundTrip = "search-roundtrip",
    OneWay = "search-oneway",
    MultiCity = "search-multi-city",
}

export enum EnumFlightClass {
    EconomyClass = "economy",
    PremiumEconomyClass = "premium_economy",
    BusinessClass = "business",
    FirstClass = "first",
}

export enum EnumFlightStops {
    Direct = "direct",
    OneStop = "1stop",
    TwoStop = "2stops",
}

export enum EnumSortDirection {
    ASC = 'asc',
    DESC = 'desc'
}

export enum EnumSearchFlightOrderBy {
    PRICE = 'price'
}

export enum EnumSearchFlightContextStatus {
    COMPLETE = 'complete',
    INCOMPLETE = 'incomplete'
}
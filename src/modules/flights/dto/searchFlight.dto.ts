
import { EnumFlightClass, EnumFlightJourney, EnumFlightStops, EnumSearchFlightOrderBy, EnumSortDirection } from '@/constants/flight';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsDateString, IsEnum, isDateString, IsNumber, isString, Min } from 'class-validator';

export class SearchRoundFlightDTO {

    @ApiProperty({
        required: true,
        description: 'The departure location'
    })
    @IsString()
    origin: string;

    @ApiProperty({
        required: true,
        description: 'The arrival location'
    })
    @IsString()
    destination: string;

    @ApiProperty({
        required: true,
        description: 'The departure date, using this format YYYY-MM-DD'
    })
    @IsDateString()
    depart_at: string;

    @ApiProperty({
        required: true,
        description: 'The return date, Using this format YYYY-MM-DD'
    })
    @IsDateString()
    return_at: string;

    @ApiPropertyOptional({
        enum: EnumSearchFlightOrderBy,
        enumName: 'EnumSearchFlightOrderBy',
        description: 'Currently only support sorting by price',
        example: EnumSearchFlightOrderBy.PRICE
    })
    @IsOptional()
    @IsEnum(EnumSearchFlightOrderBy, {
        message: 'order_by must be: price'
    })
    order_by?: EnumSearchFlightOrderBy;

    @ApiPropertyOptional({
        enum: EnumSortDirection,
        enumName: 'EnumSortDirection',
        description: 'Sort direction allowed is asc and desc',
        example: EnumSortDirection.ASC
    })
    @IsOptional()
    @IsEnum(EnumSortDirection, {
        message: 'sort_by must be: asc or desc'
    })
    sort_by?: EnumSortDirection;

    @ApiPropertyOptional({
        enum: EnumFlightStops,
        enumName: 'EnumFlightStops',
        example: EnumFlightStops.Direct,
        description: 'Types of flight journey'
    })
    @IsOptional()
    @IsEnum(EnumFlightStops, {
        message: 'stops must be: direct, 1stop, 2stops'
    })
    stops?: EnumFlightStops;

    @ApiPropertyOptional({
        enum: EnumFlightClass,
        enumName: 'EnumFlightClass',
        example: EnumFlightClass.EconomyClass,
        description: 'Types of flight class'
    })
    @IsOptional()
    @IsString()
    class?: EnumFlightClass;

    @ApiPropertyOptional({
        description: 'Currency paramater to set to return the price by which currency. By default, if nothing is sent will be USD'
    })
    @IsOptional()
    @IsString()
    currency?: string;

    @ApiPropertyOptional({
        description: 'Market paramater to set to return the market of the flights. By default, if nothing is sent will be US'
    })
    @IsOptional()
    @IsString()
    market?: string;

    @ApiPropertyOptional({
        description: 'Adults paramater to set to set the number of adults taking the flight. By default it is 1 adult'
    })
    @IsOptional()
    @IsNumber()
    @Min(0)
    adults?: number;

    @ApiPropertyOptional({
        description: 'Children paramater to set to set the number of children taking the flight'
    })
    @IsOptional()
    @IsNumber()
    @Min(0)
    children?: number;

    @ApiPropertyOptional({
        description: 'Infants paramater to set to set the number of infants taking the flight'
    })
    @IsOptional()
    @IsNumber()
    @Min(0)
    infants?: number;
}
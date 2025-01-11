
import { EnumFlightClass, EnumFlightJourney, EnumFlightStops, EnumSearchFlightOrderBy, EnumSortDirection } from '@/constants/flight';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsDateString, IsEnum, isDateString, IsNumber, isString, Min } from 'class-validator';

export class GetFlightLocationDTO {

    @ApiProperty({
        required: true,
        description: 'The name of the location eg. New York, Sarawak etc'
    })
    @IsString()
    query: string;
}
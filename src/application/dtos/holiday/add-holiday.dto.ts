import { IsString, IsNotEmpty, Length, IsDateString, IsOptional, IsNumber, IsInt, Min, Max } from 'class-validator';

export class AddHolidayDto {
    @IsInt({ message: 'O IBGE code deve ser uma string' })
    @IsNotEmpty({ message: 'O IBGE code é obrigatório' })
    @Min(2, { message: 'O IBGE code deve ser maior ou igual a 1' })
    @Max(9999999, { message: 'O IBGE code deve ser menor ou igual a 9999999' })
    ibgeCode: number;

    @IsOptional()
    date: string;

    @IsOptional()
    @IsString({ message: 'O identificador deve ser uma string' })
    @IsNotEmpty({ message: 'O identificador é obrigatório' })
    name: string;
}

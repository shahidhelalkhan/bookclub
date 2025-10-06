import { IsString, IsNotEmpty, IsOptional, MaxLength } from 'class-validator';

export class CreateAuthorDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name!: string;

  @IsString()
  @IsOptional()
  bio?: string;
}

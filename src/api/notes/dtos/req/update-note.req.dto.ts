import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateNoteReqDto {
  @IsString()
  @IsOptional()
  @MinLength(2)
  @ApiPropertyOptional({ default: 'test' })
  title: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({ default: 'dsfdggfdgfd' })
  description: string;
}

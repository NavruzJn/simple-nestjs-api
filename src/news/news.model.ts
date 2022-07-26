import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { NewsCategory } from "../enums";

export class CreateNewsDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: "I was quite young!" })
  title: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Kate Moss opens up about the "painful" side of modeling',
  })
  description: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example:
      'Moss, who told T magazine in 2010 that she "just hate(s)" talking with the media -- and that as a young model she "used to get very ill just worrying" about interviews she\'d given -- opened up to host Lauren Laverne about "painful" experiences she underwent in the industry.',
  })
  content: string;

  @IsEnum(NewsCategory)
  @IsNotEmpty()
  @ApiProperty({ example: NewsCategory.MEDIA })
  category: NewsCategory;
}

export class UpdateNewsDto {
  @IsString()
  @ApiProperty({ example: "I was quite young!" })
  title: string;

  @IsString()
  @ApiPropertyOptional({
    example: 'Kate Moss opens up about the "painful" side of modeling',
  })
  description: string;

  @IsString()
  @ApiPropertyOptional({
    example:
      'Moss, who told T magazine in 2010 that she "just hate(s)" talking with the media -- and that as a young model she "used to get very ill just worrying" about interviews she\'d given -- opened up to host Lauren Laverne about "painful" experiences she underwent in the industry.',
  })
  content: string;

  @IsEnum(NewsCategory)
  @ApiPropertyOptional({ example: NewsCategory.MEDIA })
  category: NewsCategory;
}

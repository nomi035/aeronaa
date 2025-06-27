import { ApiProperty } from "@nestjs/swagger";
import { IsOptional } from "class-validator";
import { User } from "src/user/entities/user.entity";

export class CreateHotelDto {
     @ApiProperty({
        description:"name of the hotel",
        required:true
    })
    @IsOptional()
  name: string;

   @ApiProperty({
        description:"description of the hotel",
        required:true
    })
    @IsOptional()
  description: string;

  @ApiProperty({

  })
   @IsOptional()
  starRating: string;

@ApiProperty({

  })
   @IsOptional()
  Address: string;

  @ApiProperty({

  })
   @IsOptional()
  city: string;
  @ApiProperty({

  })
  @IsOptional()
  state: string

  @ApiProperty({

  })
  @IsOptional()
  zipCode: string;

@ApiProperty({

  })
   @IsOptional()
  country: string;

  @ApiProperty({

  })
   @IsOptional()
  checkInTime: string;

  @ApiProperty({

  })
   @IsOptional()
  checkOutTime: string;

  @ApiProperty({

  })
   @IsOptional()
  availableFrom: Date;

  @ApiProperty({

  })
   @IsOptional()
  availableTo: Date;

  @ApiProperty({
    description:"ameneties will be in the form of array",

  })
   @IsOptional()
  amenities: string[];

   @IsOptional()
  images?: string[];

  @ApiProperty({
    description:"tags will be in the form of array",
  })
   @IsOptional()
  tags: string[];


  @ApiProperty({
    description:"flag for hotel completion when the form is submitted fully send true else false ",
  })
   @IsOptional()
  isCompleted?:number

  @IsOptional()
  user:User

  @ApiProperty({
    description:"userId of the user who created the hotel",
  })
   @IsOptional()
   dataByApi:boolean

    apiId?: string;
}

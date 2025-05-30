import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { UserService } from 'src/user/user.service';
import { JwtAuthGuard } from 'src/auth/guard';
import { currentUser } from 'src/decorator/currentuser';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('reviews')
@ApiBearerAuth()
@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService,
    private readonly usersService: UserService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createReviewDto: CreateReviewDto, @currentUser() user: any) {
    const currentUser =await  this.usersService.findOne(user.userId);
    return this.reviewsService.create({...createReviewDto,user: currentUser});
  }

  @Get()
  findAll() {
    return this.reviewsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reviewsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReviewDto: UpdateReviewDto) {
    return this.reviewsService.update(+id, updateReviewDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reviewsService.remove(+id);
  }
    @Get('/user/all')
    @UseGuards(JwtAuthGuard)
  findAllUserReviews(@currentUser() user: any) {
    return this.reviewsService.findUSerReviews(user.userId);
  }
  @Get('/hotel/:id')
  findAllHotelReviews(@Param('id') id: string) {
    return this.reviewsService.findHotelReviews(+id);
  }
}

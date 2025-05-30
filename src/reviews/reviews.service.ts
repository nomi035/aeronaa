import { Injectable } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Review } from './entities/review.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ReviewsService {
  constructor(@InjectRepository(Review) private reviewRepository: Repository<Review>) {
    // The InjectRepository decorator is typically used with entities, not DTOs.
    // You might want to use an entity class here instead of CreateReviewDto.

  }
  create(createReviewDto: CreateReviewDto) {
    return this.reviewRepository.save(createReviewDto);
  }

  findAll() {
    return this.reviewRepository.find({
      relations: ['user', 'hotel'],
      order: {
        createdAt: 'DESC',
      },
    });
  }

  findOne(id: number) {
    return this.reviewRepository.findOne({
      where: { id },
  } );
  }

  findUSerReviews(id: number) {
    return this.reviewRepository.find({
      where: { user: { id } },
      relations: [ 'hotel'],
      order: {
        createdAt: 'DESC',
      },
    });
  }

  findHotelReviews(id: number) {
    return this.reviewRepository.find({
      where: { hotel: { id } },
      relations: ['user', 'hotel'],
      order: {
        createdAt: 'DESC',
      },
    });
  }


  update(id: number, updateReviewDto: UpdateReviewDto) {
    return this.reviewRepository.update(id, updateReviewDto)
  }

  remove(id: number) {
    return  this.reviewRepository.delete(id);
  }
}

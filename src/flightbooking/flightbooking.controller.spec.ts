import { Test, TestingModule } from '@nestjs/testing';
import { FlightbookingController } from './flightbooking.controller';
import { FlightbookingService } from './flightbooking.service';

describe('FlightbookingController', () => {
  let controller: FlightbookingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FlightbookingController],
      providers: [FlightbookingService],
    }).compile();

    controller = module.get<FlightbookingController>(FlightbookingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

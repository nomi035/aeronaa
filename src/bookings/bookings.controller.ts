import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { UserService } from 'src/user/user.service';
import { currentUser } from 'src/decorator/currentuser';
import { JwtAuthGuard } from 'src/auth/guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RoomsService } from 'src/rooms/rooms.service';
import { CreateFavouriteDto } from './dto/create-favourite.dto';
import { StripeService } from 'src/stripe/stripe.service';

@ApiBearerAuth()
@ApiTags('bookings')
@Controller('bookings')
export class BookingsController {
  constructor(
    private readonly bookingsService: BookingsService,
    private readonly usersService: UserService,
    private readonly roomService: RoomsService,
    private readonly stripeService: StripeService,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(
    @Body() createBookingDto: CreateBookingDto,
    @currentUser() user: any,
  ) {
    const currentUser = await this.usersService.findOne(user.userId);
    const room = await this.roomService.findByIds(createBookingDto.room);

    return this.bookingsService.create({
      ...createBookingDto,
      user: currentUser,
      room: room,
    });
  }

  @Post('checkout')
  async createCheckout(@Body() body: any) {
    const session = await this.stripeService.createCheckoutSession({
      amount: body.amount,
      currency: body.currency,
      successUrl: body.successUrl,
      cancelUrl: body.cancelUrl,
      customerEmail: body.email,
      metadata: {
        bookingId: body.bookingId,
      },
    });

    return { url: session.url };
  }

  @Get()
  findAll() {
    return this.bookingsService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/user/upcoming')
  findUpComing(@currentUser() user: any) {
    return this.bookingsService.findUpComing(user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/user/past')
  findPast(@currentUser() user: any) {
    return this.bookingsService.findPast(user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/user/cancelled')
  findCancelled(@currentUser() user: any) {
    return this.bookingsService.findCancelled(user.userId);
  }

  @Get('/user')
  @UseGuards(JwtAuthGuard)
  findAllUserBookings(@currentUser() user: any) {
    return this.bookingsService.findUserBookings(user.userId);
  }

  @Get('/hotel/:id')
  findAllHotelBookings(@Param('id') id: string) {
    return this.bookingsService.findHotelBookings(+id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookingsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBookingDto: UpdateBookingDto) {
    return this.bookingsService.update(+id, updateBookingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookingsService.remove(+id);
  }

  @Get('vendor/payments/:id')
  async getVendorPayments(
    @Param('id') id: string,
    @Query('startDate') startDate: Date,
    @Query('endDate') endDate: Date,
  ) {
    return this.bookingsService.getVendorPayments( +id,startDate,endDate);
  }

   @Get('vendor/bookings/details/:id')
  async getVendorBookingsDetails(
    @Param('id') id: string,
    @Query('startDate') startDate: Date,
    @Query('endDate') endDate: Date,
  ) {
    return this.bookingsService.getVendorPaymentsDetails( +id,startDate,endDate);
  }

  @Get('/admin/stats')
  async getAdminStats() {
    const totalUsers=await this.usersService.findTotalUsers()
    const bookingStats=await this.bookingsService.findTotalBookings()
    const monthwiseRevenue=await this.bookingsService.findMonthWiseRevenue()

    return{
      userCount:totalUsers.userCount,
      vendorCount:totalUsers.vendorCount,
      totalBookings:bookingStats.totalBookings,
      totalAmount:bookingStats.totalAmount.totalAmount,
      monthRevenue:monthwiseRevenue
    }

  }
}

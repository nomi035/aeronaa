import { Injectable } from '@nestjs/common/decorators';
import { CreateEmailDto } from './dto/create-email.dto';
import { UpdateEmailDto } from './dto/update-email.dto';
import * as sgMail from '@sendgrid/mail';
import * as ejs from 'ejs';
import * as path from 'path';

@Injectable()
export class EmailService {

  constructor(){
    sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);
  }

  async sendMail(sendMailDto: CreateEmailDto, verificationCode: string) {
    const templatePath = path.resolve(process.cwd(), 'src', 'email', 'tempelate', 'email-tempelate.ejs');
    console.log("Template path =", templatePath);

    const htmlContent = await ejs.renderFile(templatePath, {
      subject: sendMailDto.subject,
      message: sendMailDto.text,
      year: new Date().getFullYear(),
      verificationCode:verificationCode
    });

    const msg = {
      to: sendMailDto.to,
      from: process.env.SENDGRID_SENDER_EMAIL,
      subject: sendMailDto.subject,
      text: sendMailDto.text,
      html: htmlContent,
      verificationCode: verificationCode
    };

    try {
      const result = await sgMail.send(msg as sgMail.MailDataRequired);
      return { message: 'Email sent successfully'};
    } catch (error) {
      console.error('SendGrid Error:', error);
      throw new Error('Failed to send email');
    }
  }

  async sendLoginSuccessEmail(emailData: any) {
    const templatePath = path.resolve(process.cwd(), 'src', 'email', 'tempelate', 'login-success.ejs');
    
    const htmlContent = await ejs.renderFile(templatePath, {
      userName: emailData.userName,
      loginTime: emailData.loginTime,
      device: emailData.device,
      location: emailData.location,
      dashboardUrl: emailData.dashboardUrl,
      year: new Date().getFullYear(),
    });

    const msg = {
      to: emailData.to,
      from: process.env.SENDGRID_SENDER_EMAIL,
      subject: 'Welcome Back to Aerona!',
      html: htmlContent,
    };
    
    try {
      const result = await sgMail.send(msg as sgMail.MailDataRequired);
      return { message: 'Login success email sent successfully', result };
    } catch (error) {
      console.error('SendGrid Error:', error);
      throw new Error('Failed to send login success email');
    }
  }

  async sendHotelBookingConfirmation(bookingData: any) {
    const templatePath = path.resolve(process.cwd(), 'src', 'email', 'tempelate', 'hotel-booking-confirmation.ejs');
    
    const htmlContent = await ejs.renderFile(templatePath, {
      ...bookingData,
      year: new Date().getFullYear(),
    });

    const msg = {
      to: bookingData.to,
      from: process.env.SENDGRID_SENDER_EMAIL,
      subject: `Hotel Booking Confirmed - ${bookingData.hotelName}`,
      html: htmlContent,
    };

    try {
      const result = await sgMail.send(msg as sgMail.MailDataRequired);
      return { message: 'Hotel booking confirmation email sent successfully', result };
    } catch (error) {
      console.error('SendGrid Error:', error);
      throw new Error('Failed to send hotel booking confirmation email');
    }
  }

  async sendFlightBookingConfirmation(bookingData: any) {
    const templatePath = path.resolve(process.cwd(), 'src', 'email', 'tempelate', 'flight-booking-confirmation.ejs');
    
    const htmlContent = await ejs.renderFile(templatePath, {
      ...bookingData,
      year: new Date().getFullYear(),
    });

    const msg = {
      to: bookingData.to,
      from: process.env.SENDGRID_SENDER_EMAIL,
      subject: `Flight Booking Confirmed - PNR: ${bookingData.pnrNumber}`,
      html: htmlContent,
    };

    try {
      const result = await sgMail.send(msg as sgMail.MailDataRequired);
      return { message: 'Flight booking confirmation email sent successfully', result };
    } catch (error) {
      console.error('SendGrid Error:', error);
      throw new Error('Failed to send flight booking confirmation email');
    }
  }

  async sendCarRentalConfirmation(bookingData: any) {
    const templatePath = path.resolve(process.cwd(), 'src', 'email', 'tempelate', 'car-rental-confirmation.ejs');
    
    const htmlContent = await ejs.renderFile(templatePath, {
      ...bookingData,
      year: new Date().getFullYear(),
    });

    const msg = {
      to: bookingData.to,
      from: process.env.SENDGRID_SENDER_EMAIL,
      subject: `Car Rental Confirmed - ${bookingData.carModel}`,
      html: htmlContent,
    };

    try {
      const result = await sgMail.send(msg as sgMail.MailDataRequired);
      return { message: 'Car rental confirmation email sent successfully', result };
    } catch (error) {
      console.error('SendGrid Error:', error);
      throw new Error('Failed to send car rental confirmation email');
    }
  }
  

  findAll() {
    return `This action returns all email`;
  }

  findOne(id: number) {
    return `This action returns a #${id} email`;
  }

  update(id: number, updateEmailDto: UpdateEmailDto) {
    return `This action updates a #${id} email`;
  }

  remove(id: number) {
    return `This action removes a #${id} email`;
  }
}

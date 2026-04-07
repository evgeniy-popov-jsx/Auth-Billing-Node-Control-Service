import {
  BadRequestException,
  Catch,
  ConflictException,
  ExceptionFilter,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from 'prisma/generate/client';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaExceptionFilter implements ExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError) {
    switch (exception.code) {
      case 'P2002': {
        throw new ConflictException('Unique constraint failed');
      }
      case 'P2025':
        // Запись не найдена
        throw new NotFoundException('Record not found');

      case 'P2003':
        // Foreign key constraint
        throw new BadRequestException('Invalid relation reference');

      case 'P2000':
        // Значение слишком длинное
        throw new BadRequestException('Value too long for field');

      default:
        // Остальные ошибки Prisma
        throw new BadRequestException('Database error');
    }
  }
}

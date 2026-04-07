import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  /**
   * Поиск пользователя по username
   * @param username - уникальный username пользователя
   * @param select - объект, указывающий, какие поля вернуть (например, { id: true, username: true, password: true })
   * @returns объект с данными пользователя или null, если пользователь не найден
   */
  async findByUserName(username: string, select?: object): Promise<UserDto | null> {
    const data = await this.prismaService.user.findUnique({
      where: { username },
      select,
    });

    if (!data) return null;

    return data as UserDto;
  }

  async createUser(data: { username: string; email: string; password: string }) {
    return this.prismaService.user.create({
      data,
    });
  }

  /**
   * Поиск пользователя по username
   * @param username - уникальный username пользователя
   * @returns true/false
   */
  async isUsernameAvailable(username: string): Promise<boolean> {
    const user = await this.prismaService.user.findUnique({
      where: { username },
    });
    return !user;
  }
  /**
   * Поиск пользователя по username
   * @param email - уникальная почта пользователя
   * @returns true/false
   */
  async isEmailAvailable(email: string): Promise<boolean> {
    const userEmail = await this.prismaService.user.findUnique({
      where: { email },
    });
    return !userEmail;
  }
}

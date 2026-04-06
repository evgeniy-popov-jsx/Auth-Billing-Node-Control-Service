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
}

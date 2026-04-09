import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto, RegisterDto } from './dto/auth.dto';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { generateSeedPhrase, normalizeSeed } from 'src/utils/seed.util';
import { Request } from 'express';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  /**
   * Регистрация нового пользователя
   * @param dto - объект данных для регистрации
   *   - username: имя пользователя
   *   - email: адрес почты
   * @returns объект с данными пользователя, включая сгенерированную seed-фразу
   */
  async register(dto: RegisterDto) {
    const usernameTaken = await this.userService.findByUserName(dto.username);
    if (usernameTaken) throw new BadRequestException('Username already taken');

    const emailTaken = await this.userService.isEmailAvailable(dto.email);
    if (!emailTaken) throw new BadRequestException('Email already taken');

    const seedPhrase = generateSeedPhrase();
    const normalized = normalizeSeed(seedPhrase);
    const hash: string = await bcrypt.hash(normalized, 10);

    const user = await this.userService.createUser({
      username: dto.username,
      email: dto.email,
      seedPhrase: hash,
    });

    return {
      userId: user.id,
      seedPhrase,
    };
  }

  /**
   * Логин пользователя
   * @param dto - объект данных для входа
   *   - username: имя пользователя
   *   - seedPhrase: сид-фраза пользователя
   * @returns Создание сессии
   */
  async login(dto: LoginDto, req: Request) {
    const user = await this.userService.findByUserName(dto.username);

    if (!user) {
      throw new UnauthorizedException('Invalid username or seed phrase');
    }

    const normalizedSeed = normalizeSeed(dto.seedPhrase);
    const isValid = await bcrypt.compare(normalizedSeed, user.seedPhrase);

    if (!isValid) {
      throw new UnauthorizedException('Invalid username or seed phrase');
    }

    return new Promise((resolve, reject) => {
      req.session.userId = user.id;
      req.session.save((err) => {
        if (err) {
          const error = err instanceof Error ? err : new Error(String(err));
          return reject(error);
        }

        resolve({
          userId: user.id,
          userName: user.username,
        });
      });
    });
  }
}

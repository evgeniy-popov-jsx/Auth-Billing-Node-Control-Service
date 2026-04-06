import { Injectable } from '@nestjs/common';
import {
  RegisterDto,
  LoginDto,
  AuthenticateDto,
  LogoutDto,
  RefreshTokenDto,
} from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor() {}

  /**
   * Регистрация нового пользователя
   * @param dto - объект данных для регистрации
   *   - username: имя пользователя
   *   - email: адрес почты (если нужен)
   * @returns объект с данными пользователя, включая сгенерированную seed-фразу
   */
  async register(dto: RegisterDto) {
    // логика регистрации
  }

  /**
   * Логин пользователя
   * @param dto - объект данных для входа
   *   - username: имя пользователя
   *   - seedPhrase: сид-фраза пользователя
   * @returns данные пользователя / токен
   */
  async login(dto: LoginDto) {
    // логика входа
  }

  /**
   * Проверка токена / аутентификация пользователя
   * @param dto - объект данных для аутентификации
   *   - token: access token
   * @returns данные пользователя
   */
  async authenticate(dto: AuthenticateDto) {
    // логика проверки токена
  }

  /**
   * Выход пользователя
   * @param dto - объект данных для выхода
   *   - userId: id пользователя
   * @returns результат выхода (например, удаление refresh token)
   */
  async logout(dto: LogoutDto) {
    // логика выхода
  }

  /**
   * Обновление токена (refresh)
   * @param dto - объект данных для обновления токена
   *   - refreshToken: refresh токен
   * @returns новый access token
   */
  async refreshToken(dto: RefreshTokenDto) {
    // логика обновления токена
  }
}

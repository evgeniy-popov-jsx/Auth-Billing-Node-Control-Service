export class RegisterDto {
  username: string;
  email: string;
}

export class LoginDto {
  username: string;
  seedPhrase: string;
}

export class AuthenticateDto {
  token: string;
}

export class LogoutDto {
  userId: string;
}

export class RefreshTokenDto {
  refreshToken: string;
}

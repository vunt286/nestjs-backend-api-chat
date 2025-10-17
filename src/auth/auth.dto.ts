export class RegisterDto {
  username: string;
  password: string;
  displayName?: string;
  email?: string;
}

export class LoginDto {
  username: string;
  password: string;
}

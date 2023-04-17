import { registerAs } from '@nestjs/config';

export default registerAs('auth', () => ({
  secret: process.env.JWT_SECRET,
  expiresIn: '1d',
}));

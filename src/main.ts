import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaExceptionFilter } from './commons/filters/prisma.filters';
import expressSession from 'express-session';
import { RequestHandler } from 'express';

const session = expressSession as unknown as (
  options?: expressSession.SessionOptions,
) => RequestHandler;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new PrismaExceptionFilter());
  app.use(
    session({
      secret: 'secret',
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24,
      },
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

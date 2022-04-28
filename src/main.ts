import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(8080);
}
bootstrap();

process.on('SIGHUP', () => console.log('Received: SIGHUP'));
process.on('SIGINT', () => {
  console.log('Received: SIGINT');
  process.exit(1);
});

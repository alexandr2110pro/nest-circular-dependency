/** The Main Server. */

import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { SwaggerBaseConfig } from '@nestjs/swagger/interfaces';
import { ApplicationModule } from './app';

/**
 * Port number the server will be set to listen to.
 * It reads the ENV variable `PORT` or use 9000 by default.
 * @default 9000
 */
const PORT: number = Number(process.env.PORT || 9000);

/** @hidden */
const EXIT_SIGNALS: string[] = ['SIGINT', 'SIGTERM'];

/**
 * @param app
 * @hidden
 */
function _shutDown(app: INestApplication): void {
  console.log('\nExit signal received.\nShutting closing the app...');
  app.close();
  console.log('\nthe process will be terminated in 200 ms...');
  setTimeout(() => process.exit(), 200);
}

/**
 * @param sig
 * @param app
 * @hidden
 */
function _setTermListener(sig: any | string, app: INestApplication): void {
  process.on(sig, () => _shutDown(app));
}

/**
 * @param app
 * @hidden
 */
function _setShutDownListeners(app: INestApplication): void {
  EXIT_SIGNALS.forEach((sig: string) => _setTermListener(sig, app));
}

/**
 * Main server bootstrap function
 * @internal
 */
export async function bootstrap(): Promise<any> {
  const app: INestApplication = await NestFactory.create(ApplicationModule);

  app.setGlobalPrefix('/v1/api');

  const options: SwaggerBaseConfig = new DocumentBuilder()
    .setBasePath('/v1/api')
    .setSchemes('http', 'https')
    .setTitle('Grain Data Management')
    .setDescription('Grain Data Management RESTful API')
    .setVersion('1.1')
    .addTag('GDM')
    .addBearerAuth('authorization', 'header')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/api', app, document);

  await app.listen(PORT);

  _setShutDownListeners(app);
}

bootstrap();

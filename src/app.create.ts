
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { config } from "aws-sdk"
import { ConfigService } from '@nestjs/config';
export function appCreate(app: INestApplication): void {
 app.useGlobalPipes(new ValidationPipe({
  whitelist: true,
  forbidNonWhitelisted: true,
  transform: true,
  // transformOptions: {
  //   enableImplicitConversion: true,
  // }
 }))

 /* 
 Swagger configuration
 */
 const swaggerConfig = new DocumentBuilder()
  .setTitle('NestJs Masterclass - Blog app API')
  .setDescription('Use the base API URL as http://localhost:6500')
  .setTermsOfService('http://localhost:6500/terms-of-service')
  .addServer('http://localhost:6500')
  .setVersion('1.0').build();
 const document = SwaggerModule.createDocument(app, swaggerConfig)
 SwaggerModule.setup('api', app, document)


 // Setup the aws sdk used uploading the files to aws s3 bucket
 const configService = app.get(ConfigService)

 config.update({
  credentials: {
   accessKeyId: configService.get('appConfig.awsAccessKeyId') || "",
   secretAccessKey: configService.get('appConfig.awsSecretAccessKey') || "",
  },
  region: configService.get('appConfig.awsRegion') || ""
 })


 // enable cors
 app.enableCors()
}
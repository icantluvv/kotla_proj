import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Repository } from 'typeorm';

import { UserEntity } from './users/entities/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Role } from './roles/entities/role.entity';
import * as dotenv from 'dotenv';

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
  });
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('Kotlyarova Back')
    .setDescription(
      `[The source API definition (json)](http://${process.env.SERVER}:${process.env.PORT}/api-json)`,
    )
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);

  const port = parseInt(process.env.PORT);
  const server = process.env.SERVER;

  createUserAndRoles(app);

  await app.listen(port, server);
  console.log(`app based on: ${await app.getUrl()}`);
}

async function createUserAndRoles(app: INestApplication<any>) {
  dotenv.config();
  const rolesRepository = app.get<Repository<Role>>(getRepositoryToken(Role));
  const existingRoles = await rolesRepository.find();

  if (existingRoles.length === 0) {
    const initialRole = new Role();
    initialRole.role = 'admin';
    const roleadmin = await rolesRepository.save(initialRole);

    const initialRole2 = new Role();
    initialRole2.role = 'user';
    await rolesRepository.save(initialRole2);

    const userRepository = app.get<Repository<UserEntity>>(
      getRepositoryToken(UserEntity),
    );
    const initialUser = new UserEntity();

    initialUser.Nickname = process.env.username;
    // const hashedPassword = await bcrypt.hash(
    //   process.env.password,
    //   Number(process.env.hashsalt),
    // );
    initialUser.password = process.env.password;
    initialUser.email = process.env.email;
    initialUser.Phone = process.env.phone;
    initialUser.role = roleadmin;
    await userRepository.save(initialUser);
    console.log('Initial user has been created.');
  }
}
bootstrap();

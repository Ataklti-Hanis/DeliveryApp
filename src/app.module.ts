import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { LoggerMiddleware } from './common/middleware/logger/logger.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { User } from './user/create_user_entity';
import { RolesModule } from './roles/roles.module';
import { Role } from './roles/roles_entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: 'postgresql://ate:sq7lgziKHOQKIbuNj0JMb5KQfnFzpfoT@dpg-d2h34sgdl3ps73ftbv2g-a.oregon-postgres.render.com/delivery_yplu',
      entities: [User, Role],
      synchronize: true, // ⚠️ only for dev/testing
      ssl: {
        rejectUnauthorized: false, // Render requires SSL
      },
    }),
    UserModule,
    AuthModule,
    RolesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  constructor(private dataSource: DataSource) {
    console.log('***************************************');
    console.log('Connected to database:', this.dataSource.options.database);
    console.log('***************************************');
  }

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}

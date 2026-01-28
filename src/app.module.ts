import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',          // your database host
      port: 5432,                 // default PostgreSQL port
      username: 'postgres',   // replace with your postgres username
      password: 'mohamed1252003', // replace with your postgres password
      database: 'productivity-manager',   // replace with your postgres database name
      entities: [__dirname + '/**/*.entity{.ts,.js}'], // this tells TypeORM where to find entities
      synchronize: true,          // auto creates tables in DB, good for dev only
    }),
    TasksModule,                  // import your Tasks module here
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

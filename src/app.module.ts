import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseService } from './database.service'; // Zakładam, że plik jest w tym samym katalogu

@Module({
  imports: [
    ConfigModule.forRoot(), // Ładowanie zmiennych środowiskowych z pliku .env
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.PGHOST,
      port: parseInt(process.env.PGPORT, 10) || 5432,
      username: process.env.PGUSER,
      password: process.env.PGPASSWORD,
      database: process.env.PGDATABASE,
      ssl: {
        rejectUnauthorized: false,
      },
      extra: {
        options: `project=${process.env.ENDPOINT_ID}`,
      },
      autoLoadEntities: true,
      synchronize: true,
    }),
    UserModule,
  ],
  providers: [DatabaseService],
})
export class AppModule {}

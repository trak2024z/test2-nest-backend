import { Injectable, Logger } from '@nestjs/common';
import * as postgres from 'postgres';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DatabaseService {
  private readonly logger = new Logger(DatabaseService.name);
  private sql: any;

  constructor(private configService: ConfigService) {
    this.sql = postgres({
      host: this.configService.get<string>('PGHOST'),
      database: this.configService.get<string>('PGDATABASE'),
      username: this.configService.get<string>('PGUSER'),
      password: this.configService.get<string>('PGPASSWORD'),
      port: parseInt(this.configService.get<string>('PGPORT'), 10) || 5432,
      ssl: 'require',
      connection: {
        options: `project=${this.configService.get<string>('ENDPOINT_ID')}`,
      },
    });
  }

  async getPgVersion() {
    try {
      const result = await this.sql`SELECT version()`;
      this.logger.log(result);
    } catch (error) {
      this.logger.error('Error fetching PostgreSQL version:', error);
    }
  }
}

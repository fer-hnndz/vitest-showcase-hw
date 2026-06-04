import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ItemsModule } from './items/items.module';
import { SorterModule } from './sorter/sorter.module';

@Module({
  imports: [ItemsModule, SorterModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { SorterService } from './sorter.service';
import { SorterController } from './sorter.controller';

@Module({
  controllers: [SorterController],
  providers: [SorterService],
})
export class SorterModule {}

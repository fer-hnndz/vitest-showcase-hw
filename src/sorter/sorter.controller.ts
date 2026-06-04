import { Controller, Body, Post } from '@nestjs/common';
import { SorterService } from './sorter.service';
import { SortNumbersDto } from './dto/sort-numbers.dto';

@Controller('sorter')
export class SorterController {
  constructor(private readonly sorterService: SorterService) {}

  @Post()
  sort(@Body() sortNumbersDto: SortNumbersDto) {
    const { numbers, order } = sortNumbersDto;
    return {
      original: numbers,
      sorted: this.sorterService.sort(numbers, order),
    };
  }
}

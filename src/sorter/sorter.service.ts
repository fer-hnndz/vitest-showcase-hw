import { Injectable } from '@nestjs/common';

@Injectable()
export class SorterService {
  sort(numbers: number[], order: 'asc' | 'desc' = 'asc'): number[] {
    return [...numbers].sort((a, b) => {
      return order === 'asc' ? a - b : b - a;
    });
  }
}

import { Injectable } from '@nestjs/common';
import { PartRepository } from 'src/repository/part/partRepository';

@Injectable()
export class InitPartService {
  constructor(private readonly partRepository: PartRepository) {}
  async call(): Promise<void> {
    return this.partRepository.initLedger();
  }
}

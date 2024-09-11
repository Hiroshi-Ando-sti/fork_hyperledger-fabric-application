import { Injectable } from '@nestjs/common';
import { PartRepository } from 'src/repository/part/partRepository';

@Injectable()
export class PartInitLedgerService {
  constructor(private readonly partRepository: PartRepository) {}
  async call(): Promise<void> {
    await this.partRepository.initLedger();
  }
}

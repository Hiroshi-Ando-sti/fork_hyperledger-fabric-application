import { Module } from '@nestjs/common';
import { PartRepository } from 'src/repository/part/partRepository';
import { HyperledgerModule } from '../hyperledger/hyperledger.module';

@Module({
  imports: [HyperledgerModule],
  providers: [PartRepository],
  exports: [PartRepository],
})
export class PartRepositoryModule {}

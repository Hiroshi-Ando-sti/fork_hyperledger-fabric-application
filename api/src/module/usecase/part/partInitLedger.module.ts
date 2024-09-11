import { Module } from '@nestjs/common';
import { PartRepositoryModule } from 'src/module/repository/part/part.module';
import { PartInitLedgerService } from 'src/usecase/part/partInitLedger.service';
@Module({
  imports: [PartRepositoryModule],
  providers: [PartInitLedgerService],
  exports: [PartInitLedgerService],
})
export class PartInitLedgerModule {}

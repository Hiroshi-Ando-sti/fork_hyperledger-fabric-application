import { Module } from '@nestjs/common';
import { PartRepositoryModule } from 'src/module/repository/part/part.module';
import { InitPartService } from 'src/usecase/part/initPartService';

@Module({
  imports: [PartRepositoryModule],
  providers: [InitPartService],
  exports: [InitPartService],
})
export class InitPartModule {}

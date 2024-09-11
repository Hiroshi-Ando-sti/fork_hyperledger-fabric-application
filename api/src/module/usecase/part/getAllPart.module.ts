import { Module } from '@nestjs/common';
import { PartRepositoryModule } from 'src/module/repository/part/part.module';
import { GetAllPartService } from 'src/usecase/part/getAllPart.service';

@Module({
  imports: [PartRepositoryModule],
  providers: [GetAllPartService],
  exports: [GetAllPartService],
})
export class GetAllPartModule {}

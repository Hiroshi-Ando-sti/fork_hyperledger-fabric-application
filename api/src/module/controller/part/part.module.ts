import { Module } from '@nestjs/common';
import { PartController } from 'src/controller/part/part.controller';
import { GetAllPartModule } from 'src/module/usecase/part/getAllPart.module';
import { InitPartModule } from 'src/module/usecase/part/initPart.module';

@Module({
  imports: [GetAllPartModule, InitPartModule],
  controllers: [PartController],
})
export class PartModule {}

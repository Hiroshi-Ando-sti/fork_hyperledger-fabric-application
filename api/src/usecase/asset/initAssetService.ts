import { Injectable } from '@nestjs/common';
import { AssetRepository } from 'src/repository/asset/assetRepository';

@Injectable()
export class InitAssetService {
  constructor(private readonly assetRepository: AssetRepository) {}
  async call(): Promise<void> {
    return this.assetRepository.initLedger();
  }
}

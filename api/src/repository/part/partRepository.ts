import { Contract } from '@hyperledger/fabric-gateway';
import { FabricGatewayService } from 'src/repository/hyperledger/fabric-gateway/fabric-gateway.service';
import { Injectable } from '@nestjs/common';
import { Part } from 'src/domain/part/part';

@Injectable()
export class PartRepository {
  private readonly channelName = 'mychannel';
  private readonly chaincodeName = 'basic';
  private contract: Contract;
  private utf8Decoder = new TextDecoder();

  constructor(
    // private readonly prismaService: PrismaService,
    private readonly fabricGatewayService: FabricGatewayService,
  ) {}

  // async onModuleInit() {
  //     await this.fabricGatewayService.createConnection();
  //     this.contract = this.fabricGatewayService.getContract(this.channelName, this.chaincodeName);
  // }

  /**
   * TODO 本当はonModuleInitで呼び出すべきだが、ScopeをRequestServiceに定義していると動かないため明示的に呼び出す方式で対応
   */
  private async ensureConnection() {
    await this.fabricGatewayService.createConnection();
    this.contract = this.fabricGatewayService.getContract(
      this.channelName,
      this.chaincodeName,
    );
  }

  async initLedger() {
    await this.ensureConnection();
    await this.contract.submitTransaction('InitLedger');
  }

  async getAllParts() {
    await this.ensureConnection();

    const resultBytes = await this.contract.evaluateTransaction('GetAllParts');

    const resultJson = this.utf8Decoder.decode(resultBytes);
    return JSON.parse(resultJson);
  }
}

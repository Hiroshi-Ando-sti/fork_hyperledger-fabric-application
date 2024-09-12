/*
  SPDX-License-Identifier: Apache-2.0
*/

import {Object} from 'fabric-contract-api';
import {Asset} from './asset';
import {AssetPartDetail} from './assetPartDetail';

@Object()
export class Product extends Asset {
  //部品情報
  public assetPartDetails?: AssetPartDetail[];
}

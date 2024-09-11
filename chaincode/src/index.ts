/*
 * SPDX-License-Identifier: Apache-2.0
 */

import {type Contract} from 'fabric-contract-api';
import {PartTransferContract} from './partTransfer';

export const contracts: typeof Contract[] = [PartTransferContract];

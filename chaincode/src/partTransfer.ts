/*
 * SPDX-License-Identifier: Apache-2.0
 */
// Deterministic JSON.stringify()
import { Context, Contract, Info, Returns, Transaction } from 'fabric-contract-api';
import stringify from 'json-stringify-deterministic';
import sortKeysRecursive from 'sort-keys-recursive';
import { Part } from './models/part';

@Info({title: 'PartTransfer', description: 'Smart contract for trading parts'})
export class PartTransferContract extends Contract {

    @Transaction()
    public async InitLedger(ctx: Context): Promise<void> {
        const parts: Part[] = [
            {
                id: 'part1',
                name: 'part1'
            },
            {
                id: 'part2',
                name: 'part2'
            },
            {
                id: 'part3',
                name: 'part3'
            },
            {
                id: 'part4',
                name: 'part4'
            },
            {
                id: 'part5',
                name: 'part5'
            }
        ];

        for (const part of parts) {
            // example of how to write to world state deterministically
            // use convetion of alphabetic order
            // we insert data in alphabetic order using 'json-stringify-deterministic' and 'sort-keys-recursive'
            // when retrieving data, in any lang, the order of data will be the same and consequently also the corresonding hash
            if (!part.id) {
                throw new Error('Part ID must be defined');
            }
            await ctx.stub.putState(part.id, Buffer.from(stringify(sortKeysRecursive(part))));
            console.info(`Part ${part.id} initialized`);
        }
    }

    // CreatePart issues a new part to the world state with given details.
    @Transaction()
    public async CreatePart(ctx: Context, id: string, name: string): Promise<void> {
        const exists = await this.PartExists(ctx, id);
        if (exists) {
            throw new Error(`The part ${id} already exists`);
        }

        const part = {
            id: id,
            name: name
        };
        // we insert data in alphabetic order using 'json-stringify-deterministic' and 'sort-keys-recursive'
        await ctx.stub.putState(id, Buffer.from(stringify(sortKeysRecursive(part))));
    }

    // ReadPart returns the part stored in the world state with given id.
    @Transaction(false)
    public async ReadPart(ctx: Context, id: string): Promise<string> {
        const partJSON = await ctx.stub.getState(id); // get the part from chaincode state
        if (partJSON.length === 0) {
            throw new Error(`The part ${id} does not exist`);
        }
        return partJSON.toString();
    }

    // UpdatePart updates an existing part in the world state with provided parameters.
    @Transaction()
    public async UpdatePart(ctx: Context, id: string, name: string): Promise<void> {
        const exists = await this.PartExists(ctx, id);
        if (!exists) {
            throw new Error(`The part ${id} does not exist`);
        }

        // overwriting original part with new part
        const updatedPart = {
            id: id,
            name: name,
        };
        // we insert data in alphabetic order using 'json-stringify-deterministic' and 'sort-keys-recursive'
        return ctx.stub.putState(id, Buffer.from(stringify(sortKeysRecursive(updatedPart))));
    }

    // DeletePart deletes an given part from the world state.
    @Transaction()
    public async DeletePart(ctx: Context, id: string): Promise<void> {
        const exists = await this.PartExists(ctx, id);
        if (!exists) {
            throw new Error(`The part ${id} does not exist`);
        }
        return ctx.stub.deleteState(id);
    }

    // PartExists returns true when part with given ID exists in world state.
    @Transaction(false)
    @Returns('boolean')
    public async PartExists(ctx: Context, id: string): Promise<boolean> {
        const partJSON = await ctx.stub.getState(id);
        return partJSON.length > 0;
    }

    // // TransferPart updates the owner field of part with given id in the world state, and returns the old owner.
    // @Transaction()
    // public async TransferPart(ctx: Context, id: string, newOwner: string): Promise<string | undefined> {
    //     const partString = await this.ReadPart(ctx, id);
    //     const part = JSON.parse(partString) as Part;
    //     const oldOwner = part.Owner;
    //     part.Owner = newOwner;
    //     // we insert data in alphabetic order using 'json-stringify-deterministic' and 'sort-keys-recursive'
    //     await ctx.stub.putState(id, Buffer.from(stringify(sortKeysRecursive(part))));
    //     return oldOwner;
    // }

    // GetAllParts returns all parts found in the world state.
    @Transaction(false)
    @Returns('string')
    public async GetAllParts(ctx: Context): Promise<string> {
        const allResults = [];
        // range query with empty string for startKey and endKey does an open-ended query of all parts in the chaincode namespace.
        const iterator = await ctx.stub.getStateByRange('', '');
        let result = await iterator.next();
        while (!result.done) {
            const strValue = Buffer.from(result.value.value.toString()).toString('utf8');
            let record;
            try {
                record = JSON.parse(strValue) as Part;
            } catch (err) {
                console.log(err);
                record = strValue;
            }
            allResults.push(record);
            result = await iterator.next();
        }
        return JSON.stringify(allResults);
    }

}

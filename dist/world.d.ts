import { WorldEndPoints, WorldOptions } from './interfaces';
export declare class World {
    private readonly endpoints;
    private readonly sortOptions;
    private readonly orderOptions;
    private readonly releaseStatusOptions;
    constructor();
    getWorldsList(token: string, apiKey: string, worldType?: keyof WorldEndPoints, config?: WorldOptions): Promise<any>;
    getWorldById(token: string, apiKey: string, id: string): Promise<any>;
    getWorldMetaData(token: string, apiKey: string, id: string): Promise<any>;
}

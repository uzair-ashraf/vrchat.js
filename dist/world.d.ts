import { WorldEndPoints } from './interfaces';
export declare class World {
    private readonly endpoints;
    private readonly sortOptions;
    private readonly orderOptions;
    constructor();
    getWorldsList(token: string, apiKey: string, worldType?: keyof WorldEndPoints, maxResults?: number, sortBy?: string, orderBy?: string, isOwn?: boolean): Promise<any>;
    getWorldById(token: string, apiKey: string, id: string): Promise<any>;
    getWorldMetaData(token: string, apiKey: string, id: string): Promise<any>;
}

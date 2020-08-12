import { UserEndpoints, UserOptions } from './interfaces';
export declare class User {
    private readonly userEndpoints;
    constructor();
    getInfo(token: string): Promise<any>;
    getFriendsList(token: string, apiKey: string): Promise<any>;
    getUsersList(token: string, apiKey: string, userType?: keyof UserEndpoints, config?: UserOptions): Promise<any>;
    getUserByName(token: string, apiKey: string, username: string): Promise<any>;
    getUserById(token: string, apiKey: string, id: string): Promise<any>;
}

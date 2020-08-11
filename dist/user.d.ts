export declare class User {
    getInfo(token: string): Promise<any>;
    getFriendsList(token: string, apiKey: string): Promise<any>;
    getUsersList(token: string, apiKey: string, username: string, maxResults?: number, activeOnly?: boolean): Promise<any>;
    getUserByName(token: string, apiKey: string, username: string): Promise<any>;
    getUserById(token: string, apiKey: string, id: string): Promise<any>;
}

export declare class User {
    getDetails(token: string): Promise<any>;
    getFriendsList(token: string, apiKey: string): Promise<any>;
}

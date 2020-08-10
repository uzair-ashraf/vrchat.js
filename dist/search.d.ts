export declare class Search {
    users(token: string, apiKey: string, username: string, maxResults?: number): Promise<any>;
    userByName(token: string, apiKey: string, username: string): Promise<any>;
}

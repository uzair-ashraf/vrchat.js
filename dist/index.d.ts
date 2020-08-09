export declare class VRChat {
    getToken(username: string, password: string): Promise<any>;
    getUserDetails(token: string): Promise<any>;
    generateApiKey(): Promise<any>;
    getFriendsList(token: string, apiKey: string): Promise<any>;
}

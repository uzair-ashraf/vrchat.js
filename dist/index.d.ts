export declare class VRChat {
    getToken(username: string, password: string): Promise<any>;
    getUserDetails(token: string): Promise<any>;
}

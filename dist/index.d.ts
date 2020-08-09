import { Search } from './search';
import { User } from './user';
export declare class VRChat {
    search: Search;
    user: User;
    constructor();
    getToken(username: string, password: string): Promise<any>;
    generateApiKey(): Promise<any>;
}

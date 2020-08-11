import { World } from './world';
import { User } from './user';
export declare class VRChat {
    world: World;
    user: User;
    constructor();
    getToken(username: string, password: string): Promise<any>;
    generateApiKey(): Promise<any>;
}

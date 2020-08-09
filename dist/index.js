"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VRChat = void 0;
const node_fetch_1 = require("node-fetch");
const error_handling_1 = require("./error-handling");
class VRChat {
    async getToken(username, password) {
        try {
            if (!username || !password) {
                throw new TypeError('Username or Password must be provided');
            }
            const dataBuffer = Buffer.from(`${username}:${password}`);
            const authorization = dataBuffer.toString('base64');
            const response = await node_fetch_1.default('https://api.vrchat.cloud/api/1/auth/user', {
                headers: {
                    Authorization: `Basic ${authorization}`
                }
            });
            const data = await response.json();
            if (response.status === 200) {
                return authorization;
            }
            else {
                throw new error_handling_1.AuthError(response.status, data);
            }
        }
        catch (err) {
            console.error(err);
            return err;
        }
    }
    async getUserDetails(token) {
        try {
            if (!token)
                throw new TypeError('Token must be provided');
            const response = await node_fetch_1.default('https://api.vrchat.cloud/api/1/auth/user', {
                headers: {
                    Authorization: `Basic ${token}`
                }
            });
            const data = await response.json();
            if (response.status === 200) {
                return data;
            }
            else {
                throw new error_handling_1.AuthError(response.status, data);
            }
        }
        catch (err) {
            console.error(err);
            return err;
        }
    }
    async generateApiKey() {
        try {
            const response = await node_fetch_1.default('https://api.vrchat.cloud/api/1/config');
            const data = await response.json();
            if (response.status === 200 && data.clientApiKey) {
                return data.clientApiKey;
            }
            else {
                throw new Error('Unexpected Error Occurred');
            }
        }
        catch (err) {
            console.error(err);
            return err;
        }
    }
    async getFriendsList(token, apiKey) {
        try {
            if (!token || !apiKey)
                throw new TypeError('Token and apiKey must be provided');
            const response = await node_fetch_1.default(`https://api.vrchat.cloud/api/1/auth/user/friends?apiKey=${apiKey}`, {
                headers: {
                    Authorization: `Basic ${token}`
                }
            });
            const data = await response.json();
            if (response.status === 200) {
                return data;
            }
            else {
                throw new error_handling_1.AuthError(response.status, data);
            }
        }
        catch (err) {
            console.error(err);
            return err;
        }
    }
}
exports.VRChat = VRChat;

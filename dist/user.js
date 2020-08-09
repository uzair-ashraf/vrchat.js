"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const node_fetch_1 = require("node-fetch");
const error_handling_1 = require("./error-handling");
class User {
    async getDetails(token) {
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
exports.User = User;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const node_fetch_1 = require("node-fetch");
const error_handling_1 = require("./error-handling");
class User {
    async getInfo(token) {
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
    async getUsersList(token, apiKey, username, maxResults = 10, activeOnly = false) {
        try {
            if (!token || !apiKey || !username)
                throw new TypeError('token, apiKey, and username must be provided');
            const url = activeOnly
                ? `https://api.vrchat.cloud/api/1/users/active?apiKey=${apiKey}&search=${username}&n=${maxResults}`
                : `https://api.vrchat.cloud/api/1/users?apiKey=${apiKey}&search=${username}&n=${maxResults}`;
            const response = await node_fetch_1.default(url, {
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
    // username is not the display name, but the actual username
    async getUserByName(token, apiKey, username) {
        try {
            if (!token || !apiKey || !username)
                throw new TypeError('token, apiKey, and username must be provided');
            const url = `https://api.vrchat.cloud/api/1/users/${username}/name?apiKey=${apiKey}`;
            const response = await node_fetch_1.default(url, {
                headers: {
                    Authorization: `Basic ${token}`
                }
            });
            const data = await response.json();
            switch (response.status) {
                case 200:
                    return data;
                    break;
                case 404:
                    throw new error_handling_1.BadRequest(response.status, data);
                    break;
                default:
                    throw new error_handling_1.AuthError(response.status, data);
                    break;
            }
        }
        catch (err) {
            console.error(err);
            return err;
        }
    }
    async getUserById(token, apiKey, id) {
        try {
            if (!token || !apiKey || !id)
                throw new TypeError('token, apiKey, and id must be provided');
            const url = `https://api.vrchat.cloud/api/1/users/${id}?apiKey=${apiKey}`;
            const response = await node_fetch_1.default(url, {
                headers: {
                    Authorization: `Basic ${token}`
                }
            });
            const data = await response.json();
            switch (response.status) {
                case 200:
                    return data;
                    break;
                case 404:
                    throw new error_handling_1.BadRequest(response.status, data);
                    break;
                default:
                    throw new error_handling_1.AuthError(response.status, data);
                    break;
            }
        }
        catch (err) {
            console.error(err);
            return err;
        }
    }
}
exports.User = User;

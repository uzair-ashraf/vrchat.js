"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Search = void 0;
const node_fetch_1 = require("node-fetch");
const error_handling_1 = require("./error-handling");
class Search {
    async users(token, apiKey, username, maxResults = 10) {
        try {
            if (!token || !apiKey || !username)
                throw new TypeError('token, apiKey, and username must be provided');
            const url = `https://api.vrchat.cloud/api/1/users?apiKey=${apiKey}&search=${username}&n=${maxResults}`;
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
    async userByName(token, apiKey, username) {
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
}
exports.Search = Search;

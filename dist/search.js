"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Search = void 0;
const node_fetch_1 = require("node-fetch");
const error_handling_1 = require("./error-handling");
class Search {
    async users(apiKey, username) {
        try {
            if (!apiKey)
                throw new TypeError('apiKey must be provided');
            const response = await node_fetch_1.default(`https://api.vrchat.cloud/api/1/auth/user/friends?apiKey=${apiKey}${username ? `&search=${username}` : ''}`);
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
exports.Search = Search;

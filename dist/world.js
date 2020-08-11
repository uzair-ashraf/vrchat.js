"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.World = void 0;
const node_fetch_1 = require("node-fetch");
const error_handling_1 = require("./error-handling");
class World {
    async getWorldsList(token, apiKey, username, maxResults = 10) {
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
}
exports.World = World;

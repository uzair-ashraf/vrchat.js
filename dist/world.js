"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.World = void 0;
const node_fetch_1 = require("node-fetch");
const error_handling_1 = require("./error-handling");
class World {
    constructor() {
        this.endpoints = {
            any: 'https://api.vrchat.cloud/api/1/worlds',
            active: 'https://api.vrchat.cloud/api/1/worlds/active',
            recentlyVisited: 'https://api.vrchat.cloud/api/1/worlds/recent',
            favorite: 'https://api.vrchat.cloud/api/1/worlds/favorites'
        };
        this.sortOptions = new Set([
            'popularity',
            'created',
            'updated',
            'order',
            '_created_at',
            '_updated_at'
        ]);
        this.orderOptions = new Set([
            'ascending',
            'descending'
        ]);
    }
    async getWorldsList(token, apiKey, worldType = 'any', maxResults = 10, sortBy = 'popularity', orderBy = 'ascending', isOwn = false) {
        try {
            if (!token || !apiKey)
                throw new TypeError('token, apiKey must be provided');
            let url = this.endpoints[worldType];
            if (!url)
                throw new Error('Please provide a valid world type');
            if (!this.sortOptions.has(sortBy))
                throw new Error('Please supply a valid sorting option');
            if (!this.orderOptions.has(orderBy))
                throw new Error('Please supply a valid ordering option');
            url = `${url}?apiKey=${apiKey}&n=${maxResults}&sort=${sortBy}&order=${orderBy}${isOwn ? '&user=me' : ''}`;
            const response = await node_fetch_1.default(url, {
                headers: {
                    Authorization: `Basic ${token}`
                }
            });
            const data = await response.json();
            switch (response.status) {
                case 200:
                    return data;
                case 401:
                    throw new error_handling_1.AuthError(response.status, data);
                case 404:
                    throw new error_handling_1.BadRequest(response.status, data);
                default:
                    throw new error_handling_1.UnexpectedError(response.status, data);
            }
        }
        catch (err) {
            console.error(err);
            return err;
        }
    }
    async getWorldById(token, apiKey, id) {
        try {
            if (!token || !apiKey || !id)
                throw new TypeError('token, apiKey, and id must be provided');
            const url = `https://api.vrchat.cloud/api/1/worlds/${id}?apiKey=${apiKey}`;
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
    async getWorldMetaData(token, apiKey, id) {
        try {
            if (!token || !apiKey || !id)
                throw new TypeError('token, apiKey, and id must be provided');
            const url = `https://api.vrchat.cloud/api/1/worlds/${id}/metadata?apiKey=${apiKey}`;
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
exports.World = World;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.World = void 0;
const node_fetch_1 = require("node-fetch");
const error_handling_1 = require("./error-handling");
const request_formatter_1 = require("./request-formatter");
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
        this.releaseStatusOptions = new Set([
            'public',
            'private',
            'hidden'
        ]);
    }
    async getWorldsList(token, apiKey, worldType = 'any', config = {}) {
        try {
            if (!token || !apiKey)
                throw new TypeError('token, apiKey must be provided');
            let url = this.endpoints[worldType];
            // Validate worldType
            if (!url)
                throw new Error('Please provide a valid world type');
            // Validate Sort Options, only if provided
            if (config.sort) {
                if (!this.sortOptions.has(config.sort))
                    throw new Error('Please supply a valid sorting option');
            }
            // Validate Order Options, only if provided
            if (config.order) {
                if (!this.orderOptions.has(config.order))
                    throw new Error('Please supply a valid sorting option');
            }
            // Validate releaseStatus Options, only if provided
            if (config.releaseStatus) {
                if (!this.releaseStatusOptions.has(config.releaseStatus))
                    throw new Error('Please supply a valid releaseStatus option');
            }
            url = `${url}?apiKey=${apiKey}`;
            // Format query parameters
            url = request_formatter_1.RequestFormatter.formatQuery(url, config);
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

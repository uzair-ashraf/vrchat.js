"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestFormatter = void 0;
class RequestFormatter {
    static formatQuery(url, config) {
        for (const queryParam in config) {
            url += `&${queryParam}=${config[queryParam]}`;
        }
        return url;
    }
}
exports.RequestFormatter = RequestFormatter;

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
module.exports = class VRChat {
    getToken(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!username || !password) {
                    throw new TypeError('Username or Password cannot be invalid');
                }
                const dataBuffer = Buffer.from(`${username}:${password}`);
                const authorization = dataBuffer.toString('base64');
                const response = yield fetch('https://api.vrchat.cloud/api/1/auth/user', {
                    headers: {
                        Authorization: `Basic ${authorization}`
                    }
                });
                const data = yield response.json();
                return data;
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
};

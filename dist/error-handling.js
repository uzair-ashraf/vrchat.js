"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnexpectedError = exports.BadRequest = exports.AuthError = void 0;
class AuthError extends Error {
    constructor(status, response) {
        super();
        this.status = status;
        this.response = response;
    }
}
exports.AuthError = AuthError;
class BadRequest extends Error {
    constructor(status, response) {
        super();
        this.status = status;
        this.response = response;
    }
}
exports.BadRequest = BadRequest;
class UnexpectedError extends Error {
    constructor(status, response) {
        super();
        this.status = status;
        this.response = response;
    }
}
exports.UnexpectedError = UnexpectedError;

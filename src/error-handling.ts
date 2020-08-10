export class AuthError extends Error {
  status: number;
  response: object;
  constructor(status: number, response: object) {
    super();
    this.status = status;
    this.response = response
  }
}

export class BadRequest extends Error {
  status: number;
  response: object;
  constructor(status: number, response: object) {
    super();
    this.status = status;
    this.response = response
  }
}

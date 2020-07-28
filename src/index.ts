module.exports = class VRChat {
  public async getToken(username: String, password: String): Promise<any> {
    try {
      if(!username || !password) {
        throw new TypeError('Username or Password cannot be invalid')
      }
      const dataBuffer: Buffer = Buffer.from(`${username}:${password}`);
      const authorization: String = dataBuffer.toString('base64');
      const response: Response = await fetch('https://api.vrchat.cloud/api/1/auth/user', {
        headers: {
          Authorization: `Basic ${authorization}`
        }
      })
      const data: Object = await response.json()
      return data
    } catch(err) {
      throw new Error(err)
    }
  }
}

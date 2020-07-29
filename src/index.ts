import fetch from 'node-fetch'
import { AuthError } from './error-handling'

export class VRChat {
  public async getToken(username: String, password: String): Promise<any> {
    try {
      if(!username || !password) {
        throw new TypeError('Username or Password cannot be invalid')
      }
      const dataBuffer: Buffer = Buffer.from(`${username}:${password}`);
      const authorization: string = dataBuffer.toString('base64');
      const response: any = await fetch('https://api.vrchat.cloud/api/1/auth/user', {
        headers: {
          Authorization: `Basic ${authorization}`
        }
      })
      const data: object = await response.json()
      if(response.status === 200) {
        return authorization
      } else {
        throw new AuthError(response.status, data)
      }
    } catch(err) {
      console.error(err)
      return err
    }
  }
}

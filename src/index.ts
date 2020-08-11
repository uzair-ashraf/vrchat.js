import fetch from 'node-fetch'
import { AuthError } from './error-handling'
import { World } from './world'
import { User } from './user'

export class VRChat {
  public world: World;
  public user: User;
  constructor() {
    this.world = new World()
    this.user = new User()
  }
  public async getToken(username: string, password: string): Promise<any> {
    try {
      if(!username || !password) {
        throw new TypeError('Username or Password must be provided')
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

  public async generateApiKey(): Promise<any> {
    try {
      const response: any = await fetch('https://api.vrchat.cloud/api/1/config')
      const data: any = await response.json()
      if (response.status === 200 && data.clientApiKey) {
        return data.clientApiKey
      } else {
        throw new Error('Unexpected Error Occurred')
      }
    } catch(err) {
      console.error(err)
      return err
    }
  }
}

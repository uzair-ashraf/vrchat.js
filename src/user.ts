import fetch from 'node-fetch'
import { AuthError } from './error-handling'

export class User {
  public async getDetails(token: string): Promise<any> {
    try {
      if (!token) throw new TypeError('Token must be provided')
      const response: any = await fetch('https://api.vrchat.cloud/api/1/auth/user', {
        headers: {
          Authorization: `Basic ${token}`
        }
      })
      const data: object = await response.json()
      if (response.status === 200) {
        return data
      } else {
        throw new AuthError(response.status, data)
      }
    } catch (err) {
      console.error(err)
      return err
    }
  }
  public async getFriendsList(token: string, apiKey: string): Promise<any> {
    try {
      if (!token || !apiKey) throw new TypeError('Token and apiKey must be provided')
      const response: any = await fetch(`https://api.vrchat.cloud/api/1/auth/user/friends?apiKey=${apiKey}`, {
        headers: {
          Authorization: `Basic ${token}`
        }
      })
      const data: object = await response.json()
      if (response.status === 200) {
        return data
      } else {
        throw new AuthError(response.status, data)
      }
    } catch (err) {
      console.error(err)
      return err
    }
  }
}

import fetch from 'node-fetch'
import { AuthError, BadRequest } from './error-handling'

export class Search {
  public async users(token: string, apiKey: string, username: string, maxResults: number = 10): Promise<any> {
    try {
      if (!token || !apiKey || !username) throw new TypeError('token, apiKey, and username must be provided')
      const url: string = `https://api.vrchat.cloud/api/1/users?apiKey=${apiKey}&search=${username}&n=${maxResults}`
      const response: any = await fetch(url, {
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
  // username is not the display name, but the actual username
  public async userByName(token: string, apiKey: string, username: string): Promise<any> {
    try {
      if (!token || !apiKey || !username) throw new TypeError('token, apiKey, and username must be provided')
      const url: string = `https://api.vrchat.cloud/api/1/users/${username}/name?apiKey=${apiKey}`
      const response: any = await fetch(url, {
        headers: {
          Authorization: `Basic ${token}`
        }
      })
      const data: object = await response.json()
      switch(response.status) {
        case 200:
          return data;
          break;
        case 404:
          throw new BadRequest(response.status, data)
          break;
        default:
          throw new AuthError(response.status, data)
          break;
      }
    } catch (err) {
      console.error(err)
      return err
    }
  }
}

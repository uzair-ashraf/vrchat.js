import fetch from 'node-fetch'
import { AuthError } from './error-handling'

export class Search {
  public async users(token: string, apiKey: string, username: string, maxResults: number = 10): Promise<any> {
    try {
      if (!token || !apiKey || !username) throw new TypeError('token and apiKey must be provided')
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
}

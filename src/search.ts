import fetch from 'node-fetch'
import { AuthError } from './error-handling'

export class Search {
  public async users(apiKey: string, username: string): Promise<any> {
    try {
      if (!apiKey) throw new TypeError('apiKey must be provided')
      const response: any = await fetch(`https://api.vrchat.cloud/api/1/auth/user/friends?apiKey=${apiKey}${username ? `&search=${username}` : ''}`)
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

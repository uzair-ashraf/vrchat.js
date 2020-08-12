import fetch from 'node-fetch'
import { AuthError, BadRequest, UnexpectedError } from './error-handling'
import { UserEndpoints, UserOptions, FriendsListOptions } from './interfaces'
import { RequestFormatter } from './request-formatter'
export class User {
  private readonly userEndpoints: UserEndpoints;
  constructor() {
    this.userEndpoints = {
      all: 'https://api.vrchat.cloud/api/1/users',
      active: 'https://api.vrchat.cloud/api/1/users/active'
    }
  }
  public async getInfo(token: string): Promise<any> {
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
  public async getFriendsList(
    token: string,
    apiKey: string,
    config: FriendsListOptions
  ): Promise<any> {
    try {
      if (!token || !apiKey) throw new TypeError('Token and apiKey must be provided')
      let url = `https://api.vrchat.cloud/api/1/auth/user/friends?apiKey=${apiKey}`
      // if a config object is passed, format query
      if(config) {
        url = RequestFormatter.formatQuery(url, config)
      }
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
  public async getUsersList(
    token: string,
    apiKey: string,
    userType: keyof UserEndpoints = 'all',
    config: UserOptions = {
      search: ''
    }
  ): Promise<any> {
    try {
      if (!token || !apiKey) throw new TypeError('token and apiKey must be provided')
      let url: string = this.userEndpoints[userType]
      // Validate userType
      if (!url) throw new Error('Please provide a valid user type')
      // Validate search Parameter
      if(!config.search) throw new Error('Please provide a valid search parameter')
      url = `${url}?apiKey=${apiKey}`
      // Format query parameters
      url = RequestFormatter.formatQuery(url, config)
      const response: any = await fetch(url, {
        headers: {
          Authorization: `Basic ${token}`
        }
      })
      const data: object = await response.json()
      if (response.status === 200) {
        return data
      } else {
        throw new UnexpectedError(response.status, data)
      }
    } catch (err) {
      console.error(err)
      return err
    }
  }

  // username is not the display name, but the actual username
  public async getUserByName(token: string, apiKey: string, username: string): Promise<any> {
    try {
      if (!token || !apiKey || !username) throw new TypeError('token, apiKey, and username must be provided')
      const url: string = `https://api.vrchat.cloud/api/1/users/${username}/name?apiKey=${apiKey}`
      const response: any = await fetch(url, {
        headers: {
          Authorization: `Basic ${token}`
        }
      })
      const data: object = await response.json()
      switch (response.status) {
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
  public async getUserById(token: string, apiKey: string, id: string): Promise<any> {
    try {
      if (!token || !apiKey || !id) throw new TypeError('token, apiKey, and id must be provided')
      const url: string = `https://api.vrchat.cloud/api/1/users/${id}?apiKey=${apiKey}`
      const response: any = await fetch(url, {
        headers: {
          Authorization: `Basic ${token}`
        }
      })
      const data: object = await response.json()
      switch (response.status) {
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

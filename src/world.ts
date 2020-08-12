import fetch from 'node-fetch'
import { AuthError, BadRequest, UnexpectedError } from './error-handling'
import { WorldEndPoints, WorldOptions } from './interfaces'
import { RequestFormatter } from './request-formatter'

export class World {
  private readonly endpoints: WorldEndPoints;
  private readonly sortOptions: Set<string>;
  private readonly orderOptions: Set<string>;
  private readonly releaseStatusOptions: Set<string>;
  constructor() {
    this.endpoints = {
      any: 'https://api.vrchat.cloud/api/1/worlds',
      active: 'https://api.vrchat.cloud/api/1/worlds/active',
      recentlyVisited: 'https://api.vrchat.cloud/api/1/worlds/recent',
      favorite: 'https://api.vrchat.cloud/api/1/worlds/favorites'
    }
    this.sortOptions = new Set([
      'popularity',
      'created',
      'updated',
      'order',
      '_created_at',
      '_updated_at'
    ])
    this.orderOptions = new Set([
      'ascending',
      'descending'
    ])
    this.releaseStatusOptions = new Set([
      'public',
      'private',
      'hidden'
    ])
  }

  public async getWorldsList(
    token: string,
    apiKey: string,
    worldType: keyof WorldEndPoints = 'any',
    config: WorldOptions = {}
  ): Promise<any> {
    try {
      if (!token || !apiKey) throw new TypeError('token, apiKey must be provided')
      let url: string = this.endpoints[worldType]
      // Validate worldType
      if(!url) throw new Error('Please provide a valid world type')
      // Validate Sort Options, only if provided
      if(config.sort) {
        if (!this.sortOptions.has(config.sort)) throw new Error('Please supply a valid sorting option')
      }
      // Validate Order Options, only if provided
      if (config.order) {
        if (!this.orderOptions.has(config.order)) throw new Error('Please supply a valid sorting option')
      }
      // Validate releaseStatus Options, only if provided
      if (config.releaseStatus) {
        if (!this.releaseStatusOptions.has(config.releaseStatus)) throw new Error('Please supply a valid releaseStatus option')
      }
      url = `${url}?apiKey=${apiKey}`
      // Format query parameters
      url = RequestFormatter.formatQuery(url, config)
      const response: any = await fetch(url, {
        headers: {
          Authorization: `Basic ${token}`
        }
      })
      const data: object = await response.json()

      switch (response.status) {
        case 200:
          return data;
        case 401:
          throw new AuthError(response.status, data)
        case 404:
          throw new BadRequest(response.status, data)
        default:
          throw new UnexpectedError(response.status, data)
      }
    } catch (err) {
      console.error(err)
      return err
    }
  }

  public async getWorldById(token: string, apiKey: string, id: string): Promise<any> {
    try {
      if (!token || !apiKey || !id) throw new TypeError('token, apiKey, and id must be provided')
      const url: string = `https://api.vrchat.cloud/api/1/worlds/${id}?apiKey=${apiKey}`
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
    } catch(err) {
      console.error(err)
      return err
    }
  }
  public async getWorldMetaData(token: string, apiKey: string, id: string): Promise<any> {
    try {
      if (!token || !apiKey || !id) throw new TypeError('token, apiKey, and id must be provided')
      const url: string = `https://api.vrchat.cloud/api/1/worlds/${id}/metadata?apiKey=${apiKey}`
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

import path from 'path'

import { HttpService } from './HttpService'

const defaultParams = { }

const baseUrl = `${process.env.SERVICE_HOST}/api`

export class DataService {
  httpClient = null

  resourceName = ''

  constructor (resourceName, serviceBaseUrl = baseUrl) {
    this.resourceName = resourceName
    this.httpClient = new HttpService(serviceBaseUrl)
  }

  get = (params = {}, config) => this.httpClient.get(
    this.resourceName,
    {
      params: {
        ...defaultParams,
        ...params,
      },
      ...config,
    },
  )

  post = (data, params = {}) => this.httpClient.post(
    this.resourceName,
    data,
    {
      params: {
        ...params,
      },
    },
  )

  getAll = (params = {}) => this.httpClient.get(
    this.resourceName,
    {
      params: {
        ...defaultParams,
        ...params,
      },
    },
  )

  getById (id, params = {}) {
    const url = path.join(this.resourceName, id)

    return this.httpClient.get(
      url,
      {
        params: {
          ...defaultParams,
          ...params,
        },
      },
    )
  }
}

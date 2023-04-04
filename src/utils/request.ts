import qs from "qs"

interface Params {
  [key: string]: any
}

class Request {
  constructor() {}

  get(url: string, params?: Params) {
    return this.fetch(`${url}${params ? `?${qs.stringify(params)}`: "" }`, { method: 'GET' })
  }

  post(url: string, params?: Params) {
    return this.fetch(url, { method: 'POST', body: JSON.stringify(params??{}) })
  }
  
  fetch(url: string, options?: RequestInit) {
    const newOptions = { ...options??{} }
    newOptions.credentials = "include"
    newOptions.headers = {
      "Content-Type": "application/json;charset=UTF-8",
      ...newOptions.headers
    }

    return fetch(url, options).then((response) => {
      return response.json();
    })
  }
}

const request = new Request()

export default request
  
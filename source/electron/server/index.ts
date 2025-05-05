import type http from "node:http"
import type https from "node:https"
import Express from "express"

interface AppServerOptions {
  path: string
  port: number
  hostname: string
  isSafe: boolean
}

export class AppServer {
  private _option: AppServerOptions | undefined
  private _instance!: AppServer
  private _application!: Express.Application
  private _server!: http.Server | https.Server

  constructor(options?: AppServerOptions) {
    this.option = options
    this._application = Express()
  }

  start() {}

  stop() {}

  get option() {
    return this._option
  }

  set option(options: AppServerOptions | undefined) {
    this._option = options
  }

  getInstance() {
    if (!this._instance) {
      this._instance = new AppServer()
    }
    return this._instance
  }
}

export function createServer(options: AppServerOptions) {
  return new AppServer(options)
}

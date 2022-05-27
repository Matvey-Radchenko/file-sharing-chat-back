import { Express, Request, Response, NextFunction } from "express";
import router from './routers/users.router'

export default function routes(app:Express) {
  app.use('/user', router)
}

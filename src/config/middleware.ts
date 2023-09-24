import cors from 'cors'
import express, { Application, NextFunction, Request, Response } from 'express'
import { AppError } from './error';
import { router } from '../router';
export default function Config(app: Application) {
    app.use(cors(
        {origin: '*'}
    ))
    app.use(express.json({ limit: '10mb' }))
    app.use(express.static('public'))
    app.use(router)
    app.use(
        (err: Error, request: Request, response: Response, next: NextFunction) => {
          if (err instanceof AppError) {
            return response.status(err.statusCode).json({
              status: "error",
              message: err.message,
            });
          }
    
          return response.status(500).json({
            status: "error",
            message: `Internal server error - ${err.message}`,
          });
        }
      );
}
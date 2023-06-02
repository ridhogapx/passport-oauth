import express, { Express, Request, Response } from "express"

const bodyParser: any = require('body-parser')
const passport: any = require('passport')

const app: Express = express()
const port: number = 3000

app.get('/', (req: Request, res: Response) => {
    res.json({
        message: 'Hello world!'
    })
})
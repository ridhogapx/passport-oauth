import express, { Express, Request, Response } from "express"
import bodyParser from "body-parser"

const passport: any = require("passport")
const GoogleStrategy: any = require("passport-google-oauth2").Strategy()

const app: Express = express()
const port: number = 3001


app.get('/', (req: Request, res: Response) => {
    res.json({
        message: 'Hello world!'
    })
})
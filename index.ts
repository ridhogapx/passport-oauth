import express, { Express, Request, Response } from "express"
import bodyParser from "body-parser"
import { Orm, User } from "./middlewares/Orm"


const passport: any = require("passport")
require('./middlewares/PassportConfig')(passport)


const app: Express = express()
const port: number = 3001


Orm.authenticate().then((result: any) => {
	console.log("Success connected to database")
})
Orm.sync().then((result: any) => {
	console.log("Sync database is complete")
})

app.get("/", (req: Request, res: Response) => {
    res.json({
        message: 'Hello world!'
    })
})

app.get("/auth/google", passport.authenticate("google", { scope: ["email", "profile"] }))
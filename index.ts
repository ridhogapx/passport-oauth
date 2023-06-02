import express, { Express, Request, Response } from "express"
import bodyParser from "body-parser"
import { Orm, User } from "./middlewares/Orm"
import PassportConfig from "./middlewares/PassportConfig"

const passport: any = require("passport")

const app: Express = express()
const port: number = 3001

PassportConfig(passport)

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
app.get("/auth/google/callback", passport.authenticate("google", { session: false }), 
	(req: Request, res: Response) => {
		res.json({
			message: "Authentication is successfully complete"
		})
	})

app.listen(port, (): void => {
	console.log()
})
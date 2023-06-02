import express, { Express, Request, Response } from "express"
import bodyParser from "body-parser"
import { Orm, User } from "./middlewares/Orm"
import PassportConfig from "./middlewares/PassportConfig"

const passport: any = require("passport")

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

PassportConfig(passport)

app.get("/auth/google", passport.authenticate("google", { scope: ["email", "profile"] }))
app.get("/auth/google/callback", passport.authenticate("google", { session: false }), 
	(req: Request, res: Response) => {
		res.redirect("/profile")
	})

// If user is successfully auth, it will redirect to profile page
app.get("/profile", (req: Request, res: Response) => {
	res.json({
		message: "Hello user!"
	})
})

app.listen(port, (): void => {
	console.log()
})
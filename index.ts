import express, { Express, Request, Response } from "express"
import bodyParser from "body-parser"

const passport: any = require("passport")
const GoogleStrategy: any = require("passport-google-oidc")
const { Sequelize, DataTypes } = require("sequelize")

const app: Express = express()
const port: number = 3001
const Orm: any = new Sequelize(
		"test-passport",
		"root",
		"",
		{
			host: "localhost",
			dialect: "mysql"
		}
	)

const User: any = Orm.define('user', {
	emai: {
		type: DataTypes.STRING,
		allowNull: false
	},
	name: {
		type: DataTypes.STRING,
		allowNukll: false
	}
})

Orm.authenticate().then((result: any) => {
	console.log("Connection to database is successfully")
})


Orm.sync().then((result:any) => {
	console.log("Database is synced")
})

passport.use(new GoogleStrategy({
	clientID: '60848798350-o0lknfj0410at5u8j3jejsm117ptk6ej.apps.googleusercontent.com',
	clientSecret: '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',
	callbackURL: 'http://localhost:3001/auth/google/callback'
},
 (issuer: any, profile: any, cb: any) => {

 }
))

app.get('/', (req: Request, res: Response) => {
    res.json({
        message: 'Hello world!'
    })
})
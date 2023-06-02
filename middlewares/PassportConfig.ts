import { User } from "./Orm"

const GoogleStrategy: any = require("passport-google-oauth2").GoogleStrategy

const PassportConfig = (passport: any): void => {
	passport.use(new GoogleStrategy({
		clientID: "60848798350-o0lknfj0410at5u8j3jejsm117ptk6ej.apps.googleusercontent.com",
		clientSecret: "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",
		callbackURL: "http://localhost:3001/auth/google/callback",
		passReqToCallback: true
	}, async(request: any, accessToken: any, refreshToken: any, profile: any, done: any): Promise<any> => {
		try {
			let isExist = await User.findOne({
				where: {
					email: profile.email
				}
			})

			if(isExist.length) {
				return done()
			}
		} catch(err) {
			console.log(err)
		}
	} 
	))
}
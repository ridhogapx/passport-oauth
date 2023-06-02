import { User } from "./Orm"

const GoogleStrategy: any = require("passport-google-oauth2").Strategy

const PassportConfig = (passport: any): void => {
	passport.use(new GoogleStrategy({
		/* Masukkan credentials API kamu di sini...*/
		clientID: "YOUR_CLIENT_ID",
		clientSecret: "YOUR_CLIENT_SECRET",
		callbackURL: "http://localhost:3001/auth/google/callback",
		passReqToCallback: true
	}, async(request: any, accessToken: any, refreshToken: any, profile: any, done: any): Promise<any> => {
		const isExist = await User.findAll({
			where: {
				email: profile.emails[0].value
			}
		})

		if(isExist.length) {
			return done(null, true)
		}

		await User.create({
			email: profile.emails[0].value,
			name: profile.displayName
		})

		return done(null, true)

	} 
	))
}

export default PassportConfig


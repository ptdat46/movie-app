const jwt = require('jsonwebtoken')
import { verify_token } from './token.server'

const JWT_SECRET_KEY = process.env.JWT_SECRET

const isLoggingIn = async (req, res, next) => {
	try {
		const accessToken = req.header("Authorization").replace("Bearer ", "") ?? ''

		const data = verify_token(accessToken);

		if (data.isRefreshToken) {
			res.json({
				status: 401,
				message: 'Invalid token'
			})
		} else {
			res.data = data
			next()
		}

	} catch (err) {
		res.json({
			status: 401,
			message: 'Unauthorized'
		})
	}
}
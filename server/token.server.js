const jwt = require('jsonwebtoken')

require('dotenv').config();
const JWT_SECRET_KEY = process.env.SECRET_KEY;
const generate_token = async (data) => {
    const time_expires = '1d';
    const payload = {
        id: data.id,
        email: data.email,
        password: data.password,
    }
    const accessToken = await jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: time_expires })
    return Promise.resolve(accessToken)
}

const verify_token = async (token) => {
    try {
		const decoded = jwt.verify(token, JWT_SECRET_KEY)
		return Promise.resolve(decoded)
	} catch (err) {
		return Promise.reject(err)
	}
}

module.exports = {generate_token, verify_token}
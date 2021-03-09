import axios from 'axios'

export default async (req, res) => {

	const { userName, userId } = req.body

	try {
		const apiRes = await axios({
			url: 'https://api.chatengine.io/projects/people/',
			method: 'POST',
			data: {
				username: userName,
				secret: userId
			},
			headers: {
				'Content-Type': 'application/json',
				'Private-Key': process.env.chat_engine_private_key
			}
		})
		res.json({
			body: apiRes.body,
			error: null
		})
		return res
	} catch (err) {
		console.log(err)
	}
}
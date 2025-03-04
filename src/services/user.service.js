import axios from 'axios'

export const axiosBffInstance2 = axios.create({
	baseURL: 'https://hackathon-ai-outreach-production.up.railway.app/',
	withCredentials: true,
})
axiosBffInstance2.interceptors.request.use(
	config => {
		const token = localStorage.getItem('ACCESS_TOKEN') // Retrieve the token
		if (token) {
			config.headers.Authorization = `Bearer ${token}`
		}
		return config
	},
	error => Promise.reject(error)
)
export const signup = async payload => {
	const v = await axiosBffInstance2.post('/users', payload)
	return v.data
}

export const getCandidateLists = async payload => {
	const v = await axiosBffInstance2.get('/candidates/lists')
	return v.data
}

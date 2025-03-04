import axios from 'axios'
import { axiosBffInstance } from './auth.service'

export const axiosBffInstance = axios.create({
	baseURL: 'https://hackathon-ai-outreach-production.up.railway.app/',
	withCredentials: true,
})
axiosBffInstance.interceptors.request.use(
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
	const v = await axiosBffInstance.post('/users', payload)
	return v.data
}

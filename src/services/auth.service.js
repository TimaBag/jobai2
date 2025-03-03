import axios from 'axios'
import { toast } from 'react-toastify'

export const axiosBffInstance = axios.create({
	baseURL: 'https://hackathon-ai-outreach.uk.auth0.com/api/v2/',
	withCredentials: true,
})

axiosBffInstance.interceptors.response.use(
	response => response,
	error => {
		if (error.response.data.message.error === 'mfa_required')
			return Promise.reject(error)

		if (error.response?.data?.message.errors?.length) {
			error.response.data.message.errors.forEach(response => {
				toast.error(response.message, {
					position: 'top-right',
					theme: 'colored',
				})
			})
		} else if (error.response.data.message.error_description) {
			toast.error(error.response.data.message.error_description, {
				position: 'top-right',
				theme: 'colored',
			})
		} else {
			toast.error(error.response.data.message || 'Something went wrong!', {
				position: 'top-right',
				theme: 'colored',
			})
		}

		return Promise.reject(error)
	}
)

export const fetchUserTokens = async () => {
	const v = await axiosBffInstance.get('/auth/token')
	return v.data
}

export const fetchUserApp = async () => {
	const v = await axiosBffInstance.get('/auth/app')
	return v.data
}

export const fetchUserSessions = async () => {
	const v = await axiosBffInstance.get('/auth/sessions')
	return v.data
}

export const switchUserSession = async session_uid => {
	const v = await axiosBffInstance.post('/auth/switch-session/', session_uid)
	return v.data
}

export const linkUserAccount = async payload => {
	const v = await axiosBffInstance.post('/auth/link-account/', payload)
	return v.data
}

export const addUserSession = async payload => {
	const v = await axiosBffInstance.post('/auth/add-session/', payload)
	return v.data
}

export const unlinkUserAccount = async account_uuid => {
	const v = await axiosBffInstance.post('/auth/unlink-account/', account_uuid)
	return v.data
}

export const resetUserPassword = async payload => {
	const v = await axiosBffInstance.post('/auth/reset-password/', payload)
	return v.data
}

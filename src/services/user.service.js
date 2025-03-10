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
	const v = await axiosBffInstance2.get('/employee/lists/')
	return v.data
}

export const uploadCV = async (formData) => {
	const ACCESS_TOKEN = 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlFnSWVkdlRqaThEX0tDWE8zaHNhVCJ9.eyJuaWNrbmFtZSI6InRlc3QiLCJuYW1lIjoidGVzdEBnbWFpbC5jb20iLCJwaWN0dXJlIjoiaHR0cHM6Ly9zLmdyYXZhdGFyLmNvbS9hdmF0YXIvMWFlZGI4ZDlkYzQ3NTFlMjI5YTMzNWUzNzFkYjgwNTg_cz00ODAmcj1wZyZkPWh0dHBzJTNBJTJGJTJGY2RuLmF1dGgwLmNvbSUyRmF2YXRhcnMlMkZ0ZS5wbmciLCJ1cGRhdGVkX2F0IjoiMjAyNS0wMy0wNFQwOTowNjoxNy44NDZaIiwiZW1haWwiOiJ0ZXN0QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiaXNzIjoiaHR0cHM6Ly9oYWNrYXRob24tYWktb3V0cmVhY2gudWsuYXV0aDAuY29tLyIsImF1ZCI6ImdtTVZ5WTBqZGFFV1NxcVFTTGU2V1NxbFNRMG5keEpUIiwic3ViIjoiYXV0aDB8NjdjNjlmNmEwZjJiMTUzNzY3ZjFjZWVhIiwiaWF0IjoxNzQxMDc5MTc5LCJleHAiOjE3NDExMTUxNzksInNpZCI6Iksta25nU2RqWTN5amoySXZpNkNqanZDVGo5OW1Zc21CIiwibm9uY2UiOiJWRzVMYURGRk5tVTFWME51TTJsUU4zcFlaM0puU1VKS2R6WlhSSFpmZFVnNGZqRXpaRTUyV2xOWVl3PT0ifQ.1w257Qegv8T5uxQeMnEqXZJbS5J70XhQFRHPCCqQUUHGg6TIgVhdEa0iBBeNvZdghFBaInwEhhMObA3--TCjrkuKq8cJtvb2qOVneTRJ30_AZJd6kF6ndvsS9h_0YyAWXOhZDDqiqb8kgqfArZmxpGSAbjzHMS5KzTtXdJ5y3GLF5HcLjJRGpCINORhNy6LePUAJ5JbdYkJwg8D3gvEkHyVvc2rQn2JXdx5ETdaBztoma0w-IB8ClxQMNotIBl7aJ_5dsZJpInz8w97Lu4sUlZHvHWzE9MG39rEm4XVw9pZp35Li0LbGRRbqhnMisLXM6ieDhpwhuldqTyjjz03p8w'

    // const response = await axiosBffInstance2.post("https://hackathon-ai-outreach-production.up.railway.app/api/upload-cv", formData, {
    //   headers: {
    //     "Content-Type": "multipart/form-data",
    //     Authorization: `${ACCESS_TOKEN}`,
    //     'Access-Control-Allow-Credentials': true,
    //     'Access-Control-Allow-Origin': '*',
    //     'Access-Control-Allow-Methods': 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
    //     'Access-Control-Allow-Headers': 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
    //   },
    // });

	const response = await axiosBffInstance2.post(
		"https://hackathon-ai-outreach-production.up.railway.app/api/upload-cv",
		formData,
		{
		  headers: {
			"Content-Type": "multipart/form-data",
			Authorization: `${ACCESS_TOKEN}`,
			'Access-Control-Allow-Credentials': true,
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Methods': 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
			'Access-Control-Allow-Headers': 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
		  }
		}
	  );
    return response.data;
  };

export const fetchQuestions = async () => {
	const ACCESS_TOKEN = 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlFnSWVkdlRqaThEX0tDWE8zaHNhVCJ9.eyJuaWNrbmFtZSI6InRlc3QiLCJuYW1lIjoidGVzdEBnbWFpbC5jb20iLCJwaWN0dXJlIjoiaHR0cHM6Ly9zLmdyYXZhdGFyLmNvbS9hdmF0YXIvMWFlZGI4ZDlkYzQ3NTFlMjI5YTMzNWUzNzFkYjgwNTg_cz00ODAmcj1wZyZkPWh0dHBzJTNBJTJGJTJGY2RuLmF1dGgwLmNvbSUyRmF2YXRhcnMlMkZ0ZS5wbmciLCJ1cGRhdGVkX2F0IjoiMjAyNS0wMy0wNFQwOTowNjoxNy44NDZaIiwiZW1haWwiOiJ0ZXN0QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiaXNzIjoiaHR0cHM6Ly9oYWNrYXRob24tYWktb3V0cmVhY2gudWsuYXV0aDAuY29tLyIsImF1ZCI6ImdtTVZ5WTBqZGFFV1NxcVFTTGU2V1NxbFNRMG5keEpUIiwic3ViIjoiYXV0aDB8NjdjNjlmNmEwZjJiMTUzNzY3ZjFjZWVhIiwiaWF0IjoxNzQxMDc5MTc5LCJleHAiOjE3NDExMTUxNzksInNpZCI6Iksta25nU2RqWTN5amoySXZpNkNqanZDVGo5OW1Zc21CIiwibm9uY2UiOiJWRzVMYURGRk5tVTFWME51TTJsUU4zcFlaM0puU1VKS2R6WlhSSFpmZFVnNGZqRXpaRTUyV2xOWVl3PT0ifQ.1w257Qegv8T5uxQeMnEqXZJbS5J70XhQFRHPCCqQUUHGg6TIgVhdEa0iBBeNvZdghFBaInwEhhMObA3--TCjrkuKq8cJtvb2qOVneTRJ30_AZJd6kF6ndvsS9h_0YyAWXOhZDDqiqb8kgqfArZmxpGSAbjzHMS5KzTtXdJ5y3GLF5HcLjJRGpCINORhNy6LePUAJ5JbdYkJwg8D3gvEkHyVvc2rQn2JXdx5ETdaBztoma0w-IB8ClxQMNotIBl7aJ_5dsZJpInz8w97Lu4sUlZHvHWzE9MG39rEm4XVw9pZp35Li0LbGRRbqhnMisLXM6ieDhpwhuldqTyjjz03p8w'

    const response = await axiosBffInstance2.get("/api/employee/gpt-questions/", {
      headers: {
        Authorization: ACCESS_TOKEN,
      },
    });

    console.log(response.data)
    return response.data;
  };
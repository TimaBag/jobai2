import { useAuth0 } from '@auth0/auth0-react'
import React, { useEffect } from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Sidebar from './components/sidebar.component'
import AuthPage from './pages/auth.page'
import CandidateSignUp from './pages/candidate-signup.page'
import CandidateProfileForm from './pages/candidate.page'
import CompanyPage from './pages/company.page'
import EmailPreview from './pages/email-preview'
import JobDetail from './pages/job-detail.page'
import JobList from './pages/job-list.page'
import JobListingPage from './pages/jobs.page'

function App() {
	const {
		loginWithRedirect,
		isLoading,
		isAuthenticated,
		error,
		getAccessTokenSilently,
		user,
	} = useAuth0()
	if (isLoading) return <div>Loading...</div>
	if (!isAuthenticated) {
		loginWithRedirect()
		return null
	}
	if (error) return <div>Error: {error.message}</div>

	useEffect(() => {
		const fetchToken = async () => {
			if (isAuthenticated) {
				try {
					const token = await getAccessTokenSilently()
					localStorage.setItem('accessToken', token)
					console.log('Access Token:', token)
				} catch (error) {
					console.error('Error getting token:', error)
				}
			}
		}

		fetchToken()
	}, [isAuthenticated, getAccessTokenSilently])
	console.log(user)
	return (
		<Router>
			<div style={{ display: 'flex' }}>
				<div style={{ width: '80px', height: '100vh' }}>
					<Sidebar />
				</div>
				<div style={{ flex: 1 }}>
					<Routes>
						<Route path='/login' element={<AuthPage />} />
						<Route path='/talents' element={<CompanyPage />} />
						{/* <Route path='/talent' element={<TalentPage />} /> */}
						<Route path='/company/jobs' element={<JobListingPage />} />
						<Route path='/candidate' element={<CandidateProfileForm />} />
						<Route path='/candidate/signup' element={<CandidateSignUp />} />
						<Route path='/jobs' element={<JobList />} />
						<Route path='/jobs/:id' element={<JobDetail />} />
						<Route path='/email-preview' element={<EmailPreview />} />
					</Routes>
				</div>
			</div>
		</Router>
	)
}

export default App

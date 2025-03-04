import { useAuth0 } from '@auth0/auth0-react'
import React, { useEffect } from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Sidebar from './components/sidebar.component'
import AuthPage from './pages/auth.page'
import CandidateSignUp from './pages/candidate-signup.page'
import CandidateProfileForm from './pages/candidate.page'
import CompanyPage from './pages/company.page'
import JobDetail from './pages/job-detail.page'
import JobList from './pages/job-list.page'
import JobListingPage from './pages/jobs.page'
import TalentPage from './pages/talent.page'

function App() {
	const { loginWithRedirect, isAuthenticated, user } = useAuth0()

	useEffect(() => {
		console.log(isAuthenticated)
		console.log(user)
		if (!isAuthenticated) {
			loginWithRedirect()
		}
	}, [])

	return (
		<div style={{ display: 'flex' }}>
			<div style={{ width: '80px', height: '100vh' }}>
				<Sidebar />
			</div>
			<div style={{ flex: 1 }}>
				<Router>
					<Routes>
						<Route path='/login' element={<AuthPage />} />
						<Route path='/company' element={<CompanyPage />} />
						<Route path='/talent' element={<TalentPage />} />
						<Route path='/company/jobs' element={<JobListingPage />} />
						<Route path='/candidate' element={<CandidateProfileForm />} />
						<Route path='/candidate/signup' element={<CandidateSignUp />} />
						<Route path='/jobs' element={<JobList />} />
						<Route path='/jobs/:id' element={<JobDetail />} />
					</Routes>
				</Router>
			</div>
		</div>
	)
}

export default App

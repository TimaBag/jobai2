import { Auth0Provider } from '@auth0/auth0-react'
import React from 'react'
import ReactDOM from 'react-dom/client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import App from './App'
import './index.css'
import reportWebVitals from './reportWebVitals'

const root = ReactDOM.createRoot(document.getElementById('root'))

const domain = 'hackathon-ai-outreach.uk.auth0.com'
const clientId = 'gmMVyY0jdaEWSqqQSLe6WSqlSQ0ndxJT'
const queryClient = new QueryClient()

root.render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<Auth0Provider
				domain={domain}
				clientId={clientId}
				authorizationParams={{
					redirect_uri: 'https://jobai-qxn2.vercel.app/company',
				}}
			>
				<App />
			</Auth0Provider>
		</QueryClientProvider>
	</React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()

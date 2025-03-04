import {
	Box,
	Button,
	Container,
	Paper,
	TextField,
	Typography,
} from '@mui/material'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function AuthPage() {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const handleSubmit = e => {
		e.preventDefault()
		console.log('Logging in with:', { email, password })
	}

	return (
		<Container
			sx={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				height: '100vh',
				width: '100%',
			}}
		>
			<Paper
				elevation={6}
				sx={{
					padding: 4,
					borderRadius: 3,
					textAlign: 'center',
					maxWidth: 400,
				}}
			>
				<Typography variant='h4' gutterBottom>
					Welcome Back
				</Typography>
				<Typography variant='body1' color='text.secondary' mb={2}>
					Sign in to continue
				</Typography>
				<Box
					component='form'
					onSubmit={handleSubmit}
					sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
				>
					<TextField
						label='Email'
						variant='outlined'
						fullWidth
						required
						value={email}
						onChange={e => setEmail(e.target.value)}
					/>
					<TextField
						label='Password'
						type='password'
						variant='outlined'
						fullWidth
						required
						value={password}
						onChange={e => setPassword(e.target.value)}
					/>
					<Button
						type='submit'
						variant='contained'
						size='large'
						sx={{ mt: 2, borderRadius: 2 }}
					>
						Login
					</Button>
				</Box>
				<Typography variant='body2' mt={2}>
					Don't have an account?{' '}
					<Link
						to='/signup'
						style={{ textDecoration: 'none', color: '#1976d2' }}
					>
						Sign Up
					</Link>
				</Typography>
			</Paper>
		</Container>
	)
}

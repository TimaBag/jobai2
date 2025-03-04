import { useAuth0 } from '@auth0/auth0-react'
import {
	Box,
	Button,
	Container,
	FormControl,
	InputLabel,
	MenuItem,
	Paper,
	Select,
	TextField,
	Typography,
} from '@mui/material'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'

export default function AuthPage() {
	const { isLoading, isAuthenticated, error } = useAuth0()
	const {
		handleSubmit,
		control,
		formState: { errors },
	} = useForm()

	// Redirect user if already logged in
	// if (isAuthenticated) {
	// 	window.location.href = '/company' // Change to your protected route
	// 	return null
	// }

	const onSubmit = data => {
		console.log(data)
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
					Sign up
				</Typography>

				<Box
					component='form'
					onSubmit={handleSubmit(onSubmit)}
					sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
				>
					{/* Email Field */}
					<Controller
						name='email'
						control={control}
						rules={{ required: 'Email is required' }}
						render={({ field }) => (
							<TextField
								{...field}
								label='Email'
								variant='outlined'
								fullWidth
								required
								error={!!errors.email}
								helperText={errors.email?.message}
							/>
						)}
					/>

					{/* Role Selection */}
					<FormControl fullWidth>
						<InputLabel>Role</InputLabel>
						<Controller
							name='role'
							control={control}
							rules={{ required: 'Role is required' }}
							render={({ field }) => (
								<Select {...field} label='Role'>
									<MenuItem value='user'>User</MenuItem>
									<MenuItem value='admin'>Admin</MenuItem>
								</Select>
							)}
						/>
						<Typography color='error' variant='body2'>
							{errors.role?.message}
						</Typography>
					</FormControl>

					{/* Login Button */}
					<Button
						type='submit'
						variant='contained'
						size='large'
						sx={{ mt: 2, borderRadius: 2 }}
						disabled={isLoading}
					>
						{isLoading ? 'Loading...' : 'Sign Up'}
					</Button>
				</Box>
			</Paper>
		</Container>
	)
}

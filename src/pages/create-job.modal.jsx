import {
	Box,
	Button,
	FormControl,
	InputLabel,
	MenuItem,
	Modal,
	Select,
	TextField,
	Typography,
} from '@mui/material'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import jobs from '../utils/jobs'
const uniqueSkills = [...new Set(jobs.flatMap(job => job.skills))]
export default function CreateJobModal({ open, onClose, onSubmitJob }) {
	const { control, handleSubmit, register, reset } = useForm()

	const onSubmit = data => {
		onSubmitJob(data)
		reset() // Clear form after submission
		onClose() // Close modal after submitting
	}

	return (
		<Modal open={open} onClose={onClose}>
			<Box
				sx={{
					width: 500,
					bgcolor: 'background.paper',
					p: 4,
					height: '700px',
					overflow: 'auto',
					borderRadius: 2,
					mx: 'auto',
					mt: 10,
				}}
			>
				<Typography variant='h6' mb={2}>
					Create Job Listing
				</Typography>
				<form onSubmit={handleSubmit(onSubmit)}>
					<TextField
						{...register('title')}
						fullWidth
						label='Job Title'
						placeholder='ex: Software Engineer'
						margin='normal'
						required
					/>
					<TextField
						{...register('companyName')}
						fullWidth
						label='Company name'
						placeholder='ex: Google'
						margin='normal'
						required
					/>
					<TextField
						{...register('description')}
						fullWidth
						label='Description'
						multiline
						rows={4}
						margin='normal'
						required
					/>
					<Box mt={2} /> {/* Added spacing */}
					<TextField
						{...register('location')}
						fullWidth
						label='Location'
						margin='normal'
						defaultValue='Remote'
					/>
					<FormControl fullWidth margin='normal'>
						<InputLabel>Commitment Type</InputLabel>
						<Controller
							name='commitment'
							control={control}
							render={({ field }) => (
								<Select {...field}>
									<MenuItem value='Hourly'>Hourly</MenuItem>
									<MenuItem value='Full-time'>Full-time</MenuItem>
								</Select>
							)}
						/>
					</FormControl>
					<FormControl fullWidth margin='normal'>
						<InputLabel>Pay Rate Frequency</InputLabel>
						<Controller
							name='payRateFrequency'
							control={control}
							render={({ field }) => (
								<Select {...field}>
									<MenuItem value='Hourly'>Hourly</MenuItem>
									<MenuItem value='Monthly'>Monthly</MenuItem>
								</Select>
							)}
						/>
					</FormControl>
					<Controller
						name='skills'
						control={control}
						defaultValue={[]}
						rules={{ required: 'At least one skill is required' }}
						render={({ field }) => (
							<FormControl fullWidth>
								<InputLabel>Select Skills</InputLabel>
								<Select {...field} multiple label='Select Skills'>
									{uniqueSkills.map(skill => (
										<MenuItem key={skill} value={skill}>
											{skill}
										</MenuItem>
									))}
								</Select>
							</FormControl>
						)}
					/>
					<TextField
						{...register('salary')}
						fullWidth
						label='Rate'
						type='number'
						margin='normal'
						defaultValue={0}
						required
					/>
					<TextField
						{...register('workHours')}
						fullWidth
						label='Work hours'
						type='number'
						margin='normal'
						defaultValue={0}
						required
					/>
					<Box mt={2} display='flex' justifyContent='space-between'>
						<Button onClick={onClose}>Cancel</Button>
						<Button type='submit' variant='contained'>
							Submit
						</Button>
					</Box>
				</form>
			</Box>
		</Modal>
	)
}

import AccessTimeIcon from '@mui/icons-material/AccessTime'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn'
import WorkIcon from '@mui/icons-material/Work'
import { Box, Card, CardContent, Chip, Stack, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const JobCard = ({ job }) => {
	const navigate = useNavigate()
	return (
		<Card
			sx={{
				mb: 2,
				p: 2,
				cursor: 'pointer',
				transition: '0.3s',
				'&:hover': { boxShadow: 5 },
			}}
			//   onClick={onClick}
			key={job.id}
			onClick={() => navigate(`/jobs/${job.id}`)}
		>
			<CardContent>
				{/* Job Title */}
				<Typography variant='h6' fontWeight='bold' gutterBottom>
					{job.title}
				</Typography>

				{/* Company & Location */}
				<Stack direction='row' spacing={1} alignItems='center' sx={{ mb: 1 }}>
					<WorkIcon fontSize='small' color='primary' />
					<Typography variant='body2'>{job.companyName}</Typography>
				</Stack>

				<Stack direction='row' spacing={1} alignItems='center' sx={{ mb: 1 }}>
					<LocationOnIcon fontSize='small' color='secondary' />
					<Typography variant='body2'>{job.location}</Typography>
				</Stack>

				{/* Salary & Work Hours */}
				<Stack direction='row' spacing={2} sx={{ mb: 2 }}>
					<Stack direction='row' spacing={1} alignItems='center'>
						<MonetizationOnIcon fontSize='small' color='success' />
						<Typography variant='body2'>{job.salary}</Typography>
					</Stack>
					<Stack direction='row' spacing={1} alignItems='center'>
						<AccessTimeIcon fontSize='small' color='warning' />
						<Typography variant='body2'>{job.workHours}</Typography>
					</Stack>
				</Stack>

				{/* Skills Chips */}
				<Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
					{job.skills.slice(0, 5).map((skill, index) => (
						<Chip
							key={index}
							label={skill}
							color='primary'
							variant='outlined'
						/>
					))}
				</Box>
			</CardContent>
		</Card>
	)
}

export default JobCard

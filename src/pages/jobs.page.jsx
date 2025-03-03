import {
	Box,
	Button,
	Card,
	CardContent,
	Stack,
	Typography,
} from '@mui/material'
import { useState } from 'react'
import CreateJobModal from './create-job.modal'

export default function JobListPage() {
	const [open, setOpen] = useState(false)
	const [jobs, setJobs] = useState([])

	const handleCreateJob = jobData => {
		setJobs([...jobs, jobData])
		setOpen(false)
	}

	return (
		<Stack height='100vh' p={4}>
			<Box display='flex' justifyContent='space-between' mb={2}>
				<Typography variant='h4'>Jobs</Typography>
				<Button variant='contained' onClick={() => setOpen(true)}>
					Create Job
				</Button>
			</Box>

			{jobs.length === 0 ? (
				<Box textAlign='center' mt={4}>
					<Typography variant='h6'>You have not created a job yet.</Typography>
					<Typography variant='body2'>
						Please create a job bys clicking the button above.
					</Typography>
				</Box>
			) : (
				<Box display='flex' flexWrap='wrap' gap={2}>
					{jobs.map((job, index) => (
						<Card key={index} sx={{ width: '400px' }}>
							<CardContent>
								<Typography variant='h6'>{job.title}</Typography>
								<Typography variant='body2'>{job.description}</Typography>
								<Typography variant='subtitle2'>
									{job.location} - {job.commitment}
								</Typography>
								<Typography variant='subtitle2'>
									Rate: ${job.rate} {job.payRateFrequency}
								</Typography>
							</CardContent>
						</Card>
					))}
				</Box>
			)}

			<CreateJobModal
				open={open}
				onClose={() => setOpen(false)}
				onSubmitJob={handleCreateJob}
			/>
		</Stack>
	)
}

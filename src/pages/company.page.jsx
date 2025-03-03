import CloseIcon from '@mui/icons-material/Close'
import {
	Avatar,
	Box,
	Button,
	Card,
	CardContent,
	Chip,
	Container,
	Drawer,
	FormControl,
	Grid,
	IconButton,
	InputLabel,
	MenuItem,
	Select,
	Tab,
	Tabs,
	TextField,
	Typography,
} from '@mui/material'
import React, { useState } from 'react'

const mockCandidates = [
	{
		id: 1,
		name: 'V. D.',
		experience: '6 years',
		skills: ['Python', 'Pytorch', 'Docker', 'C++', 'SQL'],
		commitment: ['Full-time', 'Part-time'],
		description:
			"Led Anduril's software platform development with deployment in active war zones.",
		avatar: 'https://i.pravatar.cc/150?img=1',
		education: 'B.S. in Computer Science, MIT',
		experienceDetails: '6 years at Anduril as a Software Engineer.',
		location: 'United States',
		salary: '$23,881 / month',
		start: 'Starts in 3 weeks',
	},
	{
		id: 2,
		name: 'S. L.',
		experience: '7 years',
		skills: [
			'Chemical Synthesis',
			'Spectroscopy',
			'Chromatography',
			'Mass Spectrometry',
		],
		commitment: ['Full-time', 'Part-time'],
		description:
			'Led MIT research in polymer films for advanced gas separation applications.',
		avatar: 'https://i.pravatar.cc/150?img=2',
		education: 'B.S. in Computer Science, MIT',
		experienceDetails: '6 years at Anduril as a Software Engineer.',
		location: 'United States',
		salary: '$18,500 / month',
		start: 'Starts in 2 weeks',
	},
]

export default function JobPortal() {
	const [search, setSearch] = useState('')
	const [filter, setFilter] = useState('')
	const [tab, setTab] = useState(0)
	const [selectedCandidate, setSelectedCandidate] = useState(null)

	const filteredCandidates = mockCandidates
		.filter(
			candidate =>
				candidate.name.toLowerCase().includes(search.toLowerCase()) ||
				candidate.skills.some(skill =>
					skill.toLowerCase().includes(search.toLowerCase())
				)
		)
		.filter(candidate => (filter ? candidate.skills.includes(filter) : true))

	return (
		<Container sx={{ mt: 4 }}>
			<Box display='flex' gap={2} mb={3}>
				<TextField
					fullWidth
					label='Search candidates...'
					variant='outlined'
					value={search}
					onChange={e => setSearch(e.target.value)}
				/>
				<FormControl sx={{ minWidth: 200 }}>
					<InputLabel>Filter by Skill</InputLabel>
					<Select value={filter} onChange={e => setFilter(e.target.value)}>
						<MenuItem value=''>All</MenuItem>
						{[...new Set(mockCandidates.flatMap(c => c.skills))].map(skill => (
							<MenuItem key={skill} value={skill}>
								{skill}
							</MenuItem>
						))}
					</Select>
				</FormControl>
			</Box>
			<Grid container spacing={2}>
				{filteredCandidates.map(candidate => (
					<Grid item xs={12} sm={6} md={4} key={candidate.id}>
						<Card sx={{ p: 2, borderRadius: 3, boxShadow: 2 }}>
							<CardContent>
								<Box display='flex' alignItems='center' gap={2}>
									<Avatar
										src={candidate.avatar}
										sx={{ width: 56, height: 56 }}
									/>
									<Box>
										<Typography variant='h6'>
											{candidate.name} | Exp: {candidate.experience}
										</Typography>
										<Typography variant='body2' color='text.secondary'>
											{candidate.description}
										</Typography>
									</Box>
								</Box>
								<Box mt={2}>
									<Typography variant='body2' fontWeight={500}>
										Expert in
									</Typography>
									<Box mt={1} display='flex' gap={1} flexWrap='wrap'>
										{candidate.skills.map(skill => (
											<Chip key={skill} label={skill} variant='outlined' />
										))}
									</Box>
								</Box>
								<Box
									mt={2}
									display='flex'
									justifyContent='space-between'
									alignItems='center'
								>
									<Box>
										<Typography variant='body2' fontWeight={500}>
											Commitment
										</Typography>
										{candidate.commitment.map(c => (
											<Chip
												key={c}
												label={c}
												variant='outlined'
												sx={{ mr: 1 }}
											/>
										))}
									</Box>
									<Button
										variant='contained'
										onClick={() => setSelectedCandidate(candidate)}
									>
										View Profile
									</Button>
								</Box>
							</CardContent>
						</Card>
					</Grid>
				))}
			</Grid>

			<Drawer
				anchor='right'
				open={!!selectedCandidate}
				onClose={() => setSelectedCandidate(null)}
			>
				{selectedCandidate && (
					<Box sx={{ width: 400, p: 3 }}>
						<IconButton
							onClick={() => setSelectedCandidate(null)}
							sx={{ position: 'absolute', right: 8, top: 8 }}
						>
							<CloseIcon />
						</IconButton>
						<Box display='flex' alignItems='center' gap={2}>
							<Avatar
								src={selectedCandidate.avatar}
								sx={{ width: 72, height: 72 }}
							/>
							<Box>
								<Typography variant='h5'>{selectedCandidate.name}</Typography>
								<Typography variant='body2' color='text.secondary'>
									{selectedCandidate.experience} Experience
								</Typography>
							</Box>
						</Box>
						<Typography mt={2} variant='body2'>
							<strong>Commitment:</strong>{' '}
							{selectedCandidate.commitment.join(', ')}
						</Typography>
						<Typography variant='body2'>
							<strong>Salary:</strong> {selectedCandidate.salary}
						</Typography>
						<Typography variant='body2'>
							<strong>Location:</strong> {selectedCandidate.location}
						</Typography>
						<Typography variant='body2'>
							<strong>Start Date:</strong> {selectedCandidate.start}
						</Typography>
						<Typography mt={2} variant='body2'>
							<strong>Expert in:</strong>
						</Typography>
						<Box mt={1} mb={2} display='flex' gap={1} flexWrap='wrap'>
							{selectedCandidate.skills.map(skill => (
								<Chip key={skill} label={skill} variant='outlined' />
							))}
						</Box>
						<Tabs value={tab} onChange={(e, newValue) => setTab(newValue)}>
							<Tab label='Experience' />
							<Tab label='Education' />
						</Tabs>
						{tab === 0 && (
							<Typography mt={2} variant='body2'>
								<strong>Experience:</strong>{' '}
								{selectedCandidate.experienceDetails}
							</Typography>
						)}
						{tab === 1 && (
							<Typography mt={2} variant='body2'>
								<strong>Education:</strong> {selectedCandidate.education}
							</Typography>
						)}
					</Box>
				)}
			</Drawer>
		</Container>
	)
}

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
	Grid,
	IconButton,
	Stack,
	Tab,
	Tabs,
	TextField,
	Typography,
} from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getCandidateLists } from '../services/user.service'

export default function JobPortal() {
	const [search, setSearch] = useState('')
	const [filter, setFilter] = useState('')
	const [tab, setTab] = useState(0)
	const [candidatesData, setCandidatesData] = useState()
	const [selectedCandidate, setSelectedCandidate] = useState(null)

	const navigate = useNavigate()

	const fetchTokensQuery = useQuery({
		queryFn: () => getCandidateLists(),
	})

	const filteredCandidates = candidatesData?.filter(candidate =>
		candidate.candidate.name.toLowerCase().includes(search.toLowerCase())
	)

	useEffect(() => {
		if (fetchTokensQuery.data)
			setCandidatesData(
				fetchTokensQuery.data.map(candidate => ({
					...candidate,
					candidate: candidate,
				}))
			)
	}, [fetchTokensQuery.data])
	console.log(selectedCandidate)
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
			</Box>
			<Grid container spacing={2}>
				{filteredCandidates?.map(candidate => (
					<Grid item xs={12} sm={6} md={4} key={candidate.candidate.id}>
						<Card sx={{ p: 2, borderRadius: 3, boxShadow: 2, minHeight: 500 }}>
							<CardContent>
								<Box display='flex' alignItems='center' gap={2}>
									<Avatar
										src={candidate.candidate.avatar}
										sx={{ width: 56, height: 56 }}
									/>
									<Box>
										<Typography variant='h6'>
											{candidate.candidate.name} | Exp: 6 years
										</Typography>
										<Typography variant='body2' color='text.secondary'>
											{candidate.candidate.about.substring(0, 100)}...
										</Typography>
									</Box>
								</Box>
								<Box mt={2}>
									<Typography variant='body2' fontWeight={500} mb={2}>
										Expert in
									</Typography>
									<Box mt={1} display='flex' gap={1} flexWrap='wrap'>
										{candidate.candidate.experience.map(skill => (
											<Chip
												key={skill.company}
												label={`${skill.company} - ${skill.position}`}
												variant='outlined'
												sx={{ mr: 1, mb: 1 }}
											/>
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
										<Typography variant='body2' fontWeight={500} mb={2}>
											Languages
										</Typography>
										{candidate.candidate.languages.map(c => (
											<Chip
												key={c.language}
												label={c.language}
												variant='outlined'
												sx={{ mr: 1, mb: 1 }}
											/>
										))}
									</Box>
								</Box>
								<Stack direction='row' justifyContent='space-between' mt={2}>
									<Button
										variant='contained'
										size='small'
										onClick={() => setSelectedCandidate(candidate.candidate)}
									>
										View Profile
									</Button>
									<Button
										variant='contained'
										color='secondary'
										size='small'
										onClick={() =>
											navigate('/email-preview', {
												state: {
													name: candidate.candidate.name,
													message: candidate.WelcomeMessage,
												},
											})
										}
									>
										Reach out
									</Button>
								</Stack>
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
							</Box>
						</Box>
						<Typography mt={2} variant='body2'>
							<strong>Languages:</strong>{' '}
							{selectedCandidate.languages.map(lan => lan.language).join(', ')}
						</Typography>
						<Typography variant='body2'>
							<strong>Salary:</strong> {selectedCandidate?.salary}
						</Typography>
						<Typography variant='body2'>
							<strong>Location:</strong> {selectedCandidate?.location}
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
							<Tab label='About' />
							<Tab label='Experience' />
							<Tab label='Education' />
						</Tabs>
						{tab === 0 && (
							<Typography mt={2} variant='body2'>
								<strong>About:</strong> {selectedCandidate.about}
							</Typography>
						)}
						{tab === 1 && (
							<Typography mt={2} variant='body2'>
								<strong>Experience:</strong>{' '}
								{selectedCandidate.experience.map(exp => (
									<Box display='flex' flexDirection='column'>
										<Typography variant='body2'>
											<strong>{exp.company}:</strong> {exp.position}
										</Typography>
										<Typography>{exp.duration}</Typography>
									</Box>
								))}
							</Typography>
						)}
						{tab === 2 && (
							<Typography mt={2} variant='body2'>
								<strong>Education:</strong>
								{selectedCandidate.education.map(exp => (
									<Typography variant='body2'>
										<strong>{exp.institution}:</strong> {exp.degree}
									</Typography>
								))}
							</Typography>
						)}
					</Box>
				)}
			</Drawer>
		</Container>
	)
}

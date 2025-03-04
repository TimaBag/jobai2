import emailjs from '@emailjs/browser'
import {
	SmartToy as AIIcon,
	Add as AddIcon,
	ArrowDropDown,
	Edit as EditIcon,
} from '@mui/icons-material'
import {
	Box,
	Button,
	Card,
	CardContent,
	Chip,
	Grid,
	IconButton,
	InputAdornment,
	MenuItem,
	Paper,
	Select,
	TextField,
	Typography,
} from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { toast } from 'react-toastify'

// Mock candidate data - in a real app, this would come from your backend
const candidateData = {
	firstName: 'Martin',
	lastName: 'Lagrange',
	currentCompany: 'Typeform',
	previousCompany: 'Pubhub',
	jobTitle: 'Software Engineer',
	skills: ['full-stack development', 'user experience', 'project management'],
	education: 'Computer Science, MIT',
	fieldOfStudy: 'Computer Science',
}

// Mock recruiter data
const recruiterData = {
	name: 'Timur Adilzhanov',
	email: 'timur@remofirst.com',
	company: 'Juicebox',
}

const EmailPreview = () => {
	const form = useRef()
	const [subject, setSubject] = useState('Software Engineer Opportunity')
	const [emailBody, setEmailBody] = useState('')
	const [selectedCandidate] = useState('Martin Lagrange')
	const [isGenerating, setIsGenerating] = useState(false)
	const [selectedTimeframe, setSelectedTimeframe] = useState('immediately')

	const location = useLocation()
	const { name, message } = location.state || {}

	console.log('name', name)

	// Function to simulate backend generating email content
	const generateEmailContent = () => {
		setIsGenerating(true)

		// Simulate API call delay
		setTimeout(() => {
			const generatedEmail = `"Subject: Invitation to Speak at Our Upcoming Tech Event\n\nDear ${name},\n\nI trust this letter finds you well. I am writing on behalf of our organization where we are planning an upcoming tech event that will be focusing on the latest trends and advancements in the software engineering domain. Your extensive background and remarkable experience as a Software Engineer at Google make you an ideal candidate to share your insights.\n\nWith your impressive profile that includes more than nine years of experience in front-end development using various technologies and working with renowned firms such as Google, Delivery Hero, and Booking.com, we believe our audience will greatly benefit from your knowledge. During your current role at Google, your contribution to developing and maintaining the frontend of the application to support larger scale changes within the organization is noteworthy. Your work at Delivery Hero, where you developed new tools to support the Back-office of the Quick-Commerce area, and your contributions at Rangle.io developing features for a Health app using React Native, are remarkable.\n\nWe have taken note of your diverse experience in software engineering and team leading roles which have equipped you with a deep understanding of industry best practices. Furthermore, we are particularly interested in your ability to mentor individuals with less or no experience in Front End engineering and your commitment to ensuring best practices and driving product improvements.\n\nOn this basis, we envision you delivering a keynote speech on the topic of \"Improving User Experience through Efficient Front-end Development\", where you can share your insights on the best practices in front-end development, working with different technologies, and the future of software engineering.\n\nWe are confident that your participation would greatly enrich the discussion and provide valuable insights to our attendees. The event is planned to take place in the first week of June this year. We would be thrilled if you could confirm your availability for this date.\n\nPlease let us know if you would be interested in this opportunity. We would be happy to provide more details about the event, including the format, audience, and any specific topics you might want to cover. Your travel and accommodation expenses, if any, will be taken care of by our organization.\n\nThank you for considering our invitation. We look forward to hearing from you soon.\n\nBest Regards,\n"`

			setEmailBody(generatedEmail)
			setIsGenerating(false)
		}, 1000)
	}

	const sendEmail = async () => {
		const templateParams = {
			to_email: 'timur@remofirst.com',
			message: emailBody,
		}

		try {
			await emailjs.sendForm(
				'service_gr7sxdr',
				'template_tlzzvdn',
				form.current,
				'hZftqoIprzudCWPgd'
			)
			toast.success('Email sent successfully!')
		} catch (error) {
			console.error('Email sending error:', error)
		}
	}

	// Generate initial email on component mount
	useEffect(() => {
		generateEmailContent()
	}, []) // Updated dependencies

	return (
		<Box sx={{ p: 3, maxWidth: 1200, margin: '0 auto' }}>
			<Typography
				variant='h5'
				gutterBottom
				sx={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'space-between',
				}}
			>
				New Email Sequence (Jul 14th 2024)
				<EditIcon fontSize='small' sx={{ ml: 1, cursor: 'pointer' }} />
				<Box sx={{ ml: 'auto' }}>
					<Button variant='outlined' sx={{ mr: 1 }}>
						Cancel
					</Button>
					<Button variant='contained' color='primary' onClick={sendEmail}>
						Send email
					</Button>
				</Box>
			</Typography>

			<Typography variant='body2' color='text.secondary' gutterBottom>
				Created by {recruiterData.name} on Jul 14th, 2024
			</Typography>

			<Box sx={{ display: 'flex', alignItems: 'center', my: 2 }}>
				<Typography variant='body1'>
					When profiles are added, send this email
				</Typography>
				<Select
					value='immediately'
					size='small'
					sx={{ ml: 2, minWidth: 150 }}
					onChange={e => setSelectedTimeframe(e.target.value)}
				>
					<MenuItem value='immediately'>immediately</MenuItem>
					<MenuItem value='1day'>after 1 day</MenuItem>
					<MenuItem value='3days'>after 3 days</MenuItem>
				</Select>
			</Box>

			<Box
				sx={{
					display: 'flex',
					bgcolor: '#f9f4ff',
					borderRadius: 1,
					px: 2,
					py: 1,
					alignItems: 'center',
					mb: 2,
				}}
			>
				<Chip label='STEP 1' size='small' sx={{ bgcolor: '#e6d6ff', mr: 2 }} />
				<Typography variant='body1' fontWeight='medium'>
					Cold Email
				</Typography>
				<IconButton size='small' sx={{ ml: 1 }}>
					<MoreVertical />
				</IconButton>
			</Box>

			<Grid container spacing={3}>
				{/* Left panel - Email composition */}
				<Grid item xs={12} md={7}>
					<Paper elevation={1} sx={{ p: 2, mb: 2 }}>
						<Box sx={{ mb: 2 }}>
							<Typography variant='body2' sx={{ mb: 1 }}>
								From
							</Typography>
							<TextField
								fullWidth
								size='small'
								value={`${recruiterData.name} (You) <${recruiterData.email}>`}
								InputProps={{
									endAdornment: (
										<InputAdornment position='end'>
											<IconButton edge='end' size='small'>
												<ArrowDropDown />
											</IconButton>
										</InputAdornment>
									),
								}}
							/>
						</Box>

						<Box sx={{ mb: 2, display: 'flex' }}>
							<Box sx={{ flexGrow: 1 }}>
								<Typography variant='body2' sx={{ mb: 1 }}>
									Subject
								</Typography>
								<TextField
									fullWidth
									size='small'
									value={subject}
									onChange={e => setSubject(e.target.value)}
								/>
							</Box>
							<Box sx={{ ml: 2, display: 'flex', alignItems: 'flex-end' }}>
								<Button size='small'>Cc</Button>
								<Button size='small'>Bcc</Button>
							</Box>
						</Box>

						<Typography variant='body2' sx={{ mb: 1 }}>
							Email Body
						</Typography>
						<Box sx={{ mb: 2 }}>
							<Button
								variant='contained'
								startIcon={<AIIcon />}
								size='small'
								color='primary'
								sx={{ mr: 1, mb: 1 }}
								onClick={generateEmailContent}
								disabled={isGenerating}
							>
								{isGenerating ? 'Generating...' : 'Smart AI Command'}
							</Button>

							{/* Template variable buttons */}
							<Button
								size='small'
								variant='outlined'
								startIcon={<AddIcon />}
								sx={{ mr: 1, mb: 1 }}
							>
								First Name
							</Button>
							<Button
								size='small'
								variant='outlined'
								startIcon={<AddIcon />}
								sx={{ mr: 1, mb: 1 }}
							>
								Last Name
							</Button>
							<Button
								size='small'
								variant='outlined'
								startIcon={<AddIcon />}
								sx={{ mr: 1, mb: 1 }}
							>
								Full Name
							</Button>
							<Button
								size='small'
								variant='outlined'
								startIcon={<AddIcon />}
								sx={{ mr: 1, mb: 1 }}
							>
								Current Company
							</Button>
							<Button
								size='small'
								variant='outlined'
								startIcon={<AddIcon />}
								sx={{ mr: 1, mb: 1 }}
							>
								Current Job Title
							</Button>
							<Button
								size='small'
								variant='outlined'
								startIcon={<AddIcon />}
								sx={{ mr: 1, mb: 1 }}
							>
								Education
							</Button>
							<Button
								size='small'
								variant='outlined'
								startIcon={<AddIcon />}
								sx={{ mr: 1, mb: 1 }}
							>
								Field of Study
							</Button>
						</Box>

						<TextField
							fullWidth
							multiline
							rows={12}
							value={emailBody}
							onChange={e => setEmailBody(e.target.value)}
							sx={{ mb: 2 }}
						/>

						<Button
							variant='outlined'
							startIcon={<AddIcon />}
							size='small'
							sx={{ mt: 1 }}
							onClick={() => {
								setEmailBody(
									emailBody =>
										emailBody +
										`\n\n${recruiterData.email} \n${recruiterData.company}`
								)
							}}
						>
							Add Email Signature
						</Button>
					</Paper>
				</Grid>

				{/* Right panel - Email preview */}
				<Grid item xs={12} md={5}>
					<Box sx={{ mb: 2 }}>
						<Typography variant='h6' gutterBottom>
							Email Preview
							<Select
								value={selectedCandidate}
								size='small'
								sx={{ ml: 2, minWidth: 180 }}
							>
								<MenuItem value='Martin Lagrange'>Martin Lagrange</MenuItem>
								<MenuItem value='John Doe'>John Doe</MenuItem>
								<MenuItem value='Jane Smith'>Jane Smith</MenuItem>
							</Select>
							<Button
								variant='outlined'
								startIcon={<AIIcon />}
								size='small'
								sx={{ ml: 2 }}
							>
								Test AI Command
							</Button>
						</Typography>
					</Box>

					<Card elevation={1}>
						<CardContent>
							<Typography variant='subtitle1' fontWeight='bold' gutterBottom>
								Subject: {subject}
							</Typography>

							<Box sx={{ whiteSpace: 'pre-line', my: 2 }}>{emailBody}</Box>
						</CardContent>
					</Card>

					<Box sx={{ mt: 3 }}>
						<Typography variant='body1' gutterBottom>
							Want to see how this email looks in your inbox?
						</Typography>
						<Typography variant='body2' color='text.secondary' gutterBottom>
							Test emails have "Test" in the subject line. You can send up to 10
							per day.
						</Typography>
						<TextField
							fullWidth
							placeholder='Enter email address'
							size='small'
							sx={{ mt: 1 }}
						/>
					</Box>
				</Grid>
			</Grid>
			<form ref={form}>
				<input type='hidden' name='to_email' value='timur@remofirst.com' />
				<input type='hidden' name='message' value={emailBody} />
			</form>
		</Box>
	)
}

const MoreVertical = () => <span>⋮</span>

export default EmailPreview

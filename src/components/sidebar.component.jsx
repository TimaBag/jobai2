import GroupIcon from '@mui/icons-material/Group'
import SettingsIcon from '@mui/icons-material/Settings'
import WorkIcon from '@mui/icons-material/Work'
import {
	Avatar,
	Drawer,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
} from '@mui/material'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const menuItems = [
	{ text: 'Search Jobs', icon: <WorkIcon />, url: '/jobs' },
	{ text: 'Search Talents', icon: <GroupIcon />, url: '/talents' },
	{ text: 'Create job', icon: <WorkIcon />, url: '/company/jobs' },
	{ text: 'Upload cv', icon: <SettingsIcon />, url: '/candidate/signup' },
]

export default function Sidebar() {
	const [selectedIndex, setSelectedIndex] = useState(1)
	const navigate = useNavigate()

	return (
		<Drawer
			variant='permanent'
			sx={{
				width: 80,
				flexShrink: 0,
				'& .MuiDrawer-paper': {
					width: 80,
					boxSizing: 'border-box',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					paddingTop: 2,
				},
			}}
		>
			{/* Logo */}
			<Avatar sx={{ width: 48, height: 48, marginBottom: 2 }}>M</Avatar>

			{/* Menu Items */}
			<List sx={{ flexGrow: 1 }}>
				{menuItems.map((item, index) => (
					<ListItem key={item.text} disablePadding>
						<ListItemButton
							selected={selectedIndex === index}
							onClick={() => {
								setSelectedIndex(index)
								navigate(item.url)
							}}
							sx={{
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'center',
							}}
						>
							<ListItemIcon
								sx={{
									minWidth: 'auto',
									color: selectedIndex === index ? 'primary.main' : 'inherit',
								}}
							>
								{item.icon}
							</ListItemIcon>
							<ListItemText
								primary={item.text}
								sx={{ fontSize: 12, textAlign: 'center' }}
							/>
						</ListItemButton>
					</ListItem>
				))}
			</List>
		</Drawer>
	)
}

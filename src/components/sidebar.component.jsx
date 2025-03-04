import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import GroupIcon from '@mui/icons-material/Group'
import SearchIcon from '@mui/icons-material/Search'
import SettingsIcon from '@mui/icons-material/Settings'
import WorkIcon from '@mui/icons-material/Work'
import {
	Avatar,
	Box,
	Drawer,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
} from '@mui/material'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createBrowserRouter } from 'react-router-dom'

const menuItems = [
	{ text: 'Search', icon: <SearchIcon />, url: '/' },
	{ text: 'Search Jobs', icon: <WorkIcon />, url: '/jobs' },
	{ text: 'Search Talents', icon: <GroupIcon />, url: '/talents' },
	// { text: 'Spend', icon: <AccountBalanceWalletIcon /> },
	{ text: 'Settings', icon: <SettingsIcon />, url: '/' },
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

			{/* Bottom Icons */}
			<Box mb={2}>
				<CalendarTodayIcon sx={{ mb: 2, cursor: 'pointer' }} />
				<Avatar sx={{ cursor: 'pointer' }} />
			</Box>
		</Drawer>
	)
}

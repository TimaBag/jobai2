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

const menuItems = [
	{ text: 'Search', icon: <SearchIcon /> },
	{ text: 'Jobs', icon: <WorkIcon /> },
	{ text: 'Team', icon: <GroupIcon /> },
	{ text: 'Spend', icon: <AccountBalanceWalletIcon /> },
	{ text: 'Settings', icon: <SettingsIcon /> },
]

export default function Sidebar() {
	const [selectedIndex, setSelectedIndex] = useState(1)

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
							onClick={() => setSelectedIndex(index)}
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

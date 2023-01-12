import React from 'react';
import '../css/Header.scss';
import { Box, IconButton, Avatar, Button } from '@mui/material';
import { Menu, DarkMode, WbSunny } from '@mui/icons-material';
import { useMainContext } from '../context/contexts_/MainContext';
import { useNavigate, Link } from 'react-router-dom';
const Header = () => {
	const {
		main_state: { istheme, aadmin },
		main_dispatch,
	} = useMainContext();
	const navigate = useNavigate();
	return (
		<div className="header">
			<Box className="title">
				<h3
					onClick={() => navigate('/')}
					className="nav navbar navbar-brand"
				>
					{user?.company} || Blue Tint Movies
				</h3>
			</Box>
			<Box className="sites">
				<Button variant="outlined" size="small">
					Add New User
				</Button>
				<Button
					variant="outlined"
					size="small"
					onClick={() => navigate('/popular')}
				>
					popular movies
				</Button>
				<Button
					variant="outlined"
					size="small"
					onClick={() => navigate('/suggested')}
				>
					Suggested Movies
				</Button>
				<Button
					variant="outlined"
					size="small"
					onClick={() => navigate('/latest')}
				>
					Latest Movies
				</Button>
			</Box>
			<Box className="toggle__button">
				{istheme ? (
					<IconButton
						onClick={() =>
							main_dispatch({ type: 'THEME', payload: istheme })
						}
					>
						<DarkMode />
					</IconButton>
				) : (
					<IconButton
						onClick={() =>
							main_dispatch({ type: 'THEME', payload: istheme })
						}
					>
						<WbSunny />
					</IconButton>
				)}
				<IconButton className="menu">
					<Menu />
				</IconButton>

				<Avatar />
			</Box>
		</div>
	);
};

export default Header;

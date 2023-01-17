import React from 'react';
import '../css/landing.scss';
import { Box, Button } from '@mui/material';
import { useMainContext } from '../context/contexts_/MainContext';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import { useNavigate } from 'react-router-dom';
const LandingPage = () => {
	const {
		main_state: { istheme, admin, user },
		main_dispatch,
	} = useMainContext();
	const navigate = useNavigate();
	return (
		<div className="landing">
			<Box className="head__landing">
				<form className="formd">
					<div className="form-group">
						<input type="text" disabled value={user?.result?.email} />
					</div>
					<input type="text" placeholder="leave a comment" />
					<Button size="small" variant="contained" type="submit">
						Send Email
					</Button>
				</form>
			</Box>
			<Box className="center__landing">
				<Box className="center">
					<h2>
						<span
							style={{
								fontWeight: 'bold ',
								fontSize: '2.5rem',
								color: 'cyan',
							}}
						>
							Welcome{' '}
						</span>{' '}
						to &nbsp;
						<span style={{ fontWeight: 'bold', color: 'yellow' }}>
							MOVIEHUBZ{' '}
						</span>
						.The biggest{' '}
						<span style={{ fontWeight: 'bold', color: 'red' }}>
							Platform{' '}
						</span>{' '}
						and Access To Movies and Your Movie Data.With{' '}
						<span style={{ fontWeight: 'bold', color: 'pink' }}>
							MovieHubz{' '}
						</span>{' '}
						You Can{' '}
						<span style={{ fontWeight: 'bold', color: 'purple' }}>
							Access{' '}
						</span>{' '}
						From Anywhere AnyTime.
					</h2>
					{user?.result?._id ? (
						<Button
							variant="contained"
							onClick={() => navigate('/movie/feed')}
							sx={{
								textTransform: 'none',
								background: 'blue !important',
							}}
						>
							Explore Moviehubz
						</Button>
					) : (
						<Button
							variant="contained"
							onClick={() => navigate('/login')}
						>
							Get Started
						</Button>
					)}
				</Box>
			</Box>
			<Box className="bottom__landing">
				<Box className="follow">
					<span className="d-flex justify-content-around ">
						<Box className="icon">
							<span style={{ color: 'white' }}>Follow us :</span>
							<FacebookIcon
								sx={{
									color: 'lightblue',
									cursor: 'pointer',
									marginLeft: '.8rem',
								}}
							/>
							<InstagramIcon
								sx={{
									color: 'green',
									cursor: 'pointer',
									marginLeft: '.8rem',
								}}
							/>
							<TwitterIcon
								sx={{
									color: 'blue',
									cursor: 'pointer',
									marginLeft: '.8rem',
								}}
							/>
						</Box>
					</span>
				</Box>
				<Box className="bottom__data">
					<span className="text-light">
						Username:
						<span className="text-warning">
							{' '}
							{user?.result?.username}
						</span>
					</span>
					<span className="text-light">
						Tel no:
						<span className="text-warning">
							{' '}
							{user?.result?.phone}
						</span>
					</span>
					<span className="text-light">
						Email Address:
						<span className="text-warning">
							{' '}
							{user?.result?.email}
						</span>
					</span>
				</Box>
			</Box>
		</div>
	);
};

export default LandingPage;

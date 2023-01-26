import { useState } from 'react';
import '../css/landing.scss';
import { Box, Button } from '@mui/material';
import { useMainContext } from '../context/contexts_/MainContext';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
const LandingPage = () => {
	const {
		main_state: { istheme, admin },
		main_dispatch,
	} = useMainContext();
	const navigate = useNavigate();
	const [val, setVal] = useState('');

	const [user, setUser] = useState(() => {
		const storedvalues = localStorage.getItem('profile');
		if (!storedvalues) return {};
		return JSON.parse(storedvalues);
	});
	const buttonvariants = {
		hover: {
			scale: [1, 1.1, 1, 1.1],
			transition: {
				duration: 0.3,
			},
		},
	};
	const variants = {
		hidden: {
			x: '100%',
			opacity: 0,
		},
		show: {
			x: ['100%', '0%', '5%'],
			opacity: 1,
			transition: {
				delay: 0.7,
				duration: 0.6,
			},
		},
	};
	return (
		<div className="landing">
			<Box className="head__landing">
				<form className="formd">
					<div className="form-group">
						<input
							type="text"
							disabled
							value={user?.result?.email || val}
						/>
					</div>
					<input type="text" placeholder="leave a comment" />
					<Button size="small" variant="contained" type="submit">
						Send Email
					</Button>
				</form>
			</Box>
			<Box className="center__landing">
				<motion.div
					variants={variants}
					initial="hidden"
					animate="show"
					className="center"
				>
					<h2>
						<span
							style={{
								fontWeight: 'bold ',
								fontSize: '1.9rem',
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
						for Movies And Related Info, and Access To Movies and Your
						Movie Data.With{' '}
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
						<div className="d-flex flex-column py-2">
							<motion.button
								variants={buttonvariants}
								whileHover="hover"
								variant="contained"
								onClick={() => navigate('/movie/feed')}
								sx={{
									textTransform: 'none',
									background: 'blue !important',
								}}
							>
								Explore Moviehubz
							</motion.button>

							<Link
								className="link"
								to="/"
								style={{
									marginTop: '1.7rem',
									color: 'yellow',
								}}
							>
								Go Back
							</Link>
						</div>
					) : (
						<Button
							variant="contained"
							onClick={() => navigate('/login')}
						>
							Get Started
						</Button>
					)}
					<div> </div>
				</motion.div>
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

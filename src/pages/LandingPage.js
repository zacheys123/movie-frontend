import { useState, useEffect } from 'react';
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
import netflix from '../assets/neflix.mp4';
import home from '../assets/home.mp4';
import palmer from '../assets/palmer.mp4';
import slumber from '../assets/slumber.mp4';
import axios from 'axios';
import Email from './Email';
const LandingPage = () => {
	const adm = JSON.parse(window.localStorage.getItem('profile'));
	const admId = adm?.result?._id;
	const { data: alldata, refetch } = useQuery(['users'], async () => {
		const response = await axios.get(
			`https://moviebackendz.onrender.com/user/v2/${admId}`,
		);

		return response.data;
	});
	const {
		main_state: { istheme, admin, user },
		main_dispatch,
	} = useMainContext();
	const navigate = useNavigate();

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
	const variants1 = {
		hidden: {
			scale: 0,
			x: '100%',
			opacity: 0,
		},
		show: {
			scale: 1.1,
			x: ['100%', '5%', '10%'],
			opacity: 1,
			transition: {
				delay: 1.7,
				duration: 0.7,
			},
		},
	};
	const variants2 = {
		initial: { width: '10px' },
		animate: {
			width: '10px',
			transition: { duration: Infinity },
		},
	};
	const [randomtrailers, setRandom] = useState('');
	const random = () => {
		const trailers = [netflix, palmer, home, slumber];
		setRandom(trailers[Math.floor(Math.random() * trailers.length)]);
		return randomtrailers;
	};

	useEffect(() => {
		random();
	});
	const username =
		alldata?.result?.firstname + alldata?.result?.lastname;
	const [moreemail, setEmail] = useState(true);
	return (
		<div className="landing">
			<Box className="head__landing">
				<Email user={alldata} />
			</Box>

			<Box className="center__landing">
				<motion.div
					variants={variants1}
					initial="hidden"
					animate="show"
					className="center"
				>
					<h2 style={{ color: 'white', fontSize: '1.4rem' }}>
						<span
							style={{
								fontWeight: '800 ',
								fontFamily: 'georgia',
								fontSize: '1.9rem',
								color: 'cyan',
								fontSize: '4rem',
							}}
						>
							Welcome{' '}
							<span
								style={{
									color: 'orange',
									fontSize: '2.9rem ',
									fontWeight: 'bold',
									fontFamily: 'ariel',
									fontStyle: 'italics',
									textShadow: ' 4px 4px 4px #aae4a',
								}}
							>
								{alldata?.result?.firstname}
							</span>{' '}
							&nbsp; &nbsp; &nbsp; to{' '}
							<span
								style={{
									color: 'yellow',
									fontWeight: 'bold',
									fontFamily: 'sans',
									textShadow: ' 4px 4px 4px #aae4a',
								}}
							>
								MovieHub
							</span>{' '}
						</span>
						where you get to{' '}
						<span style={{ color: 'aqua' }}>organize, </span>{' '}
						<span style={{ color: 'aqua' }}>optimize </span> and{' '}
						<span style={{ color: 'greenyellow' }}>schedule </span>{' '}
						your Movie Orders for faster, accurate, and Efficient
						access to Data records{' '}
						<span style={{ color: 'yellow', fontWeight: 'bold' }}>
							Its scheduling feature further enables you
						</span>{' '}
						to stay on the loop with requested and upcoming movies.
						<marquee
							direction="right"
							loop=""
							style={{ color: 'cyan', fontWeight: '800' }}
						>
							{' '}
							WE ARE REVOLUTIONIZING THE MOVIE BUSINESS!!
						</marquee>
					</h2>
					{alldata?.result?._id ? (
						<div className="d-flex flex-column py-2">
							<motion.button
								variants={buttonvariants}
								whileHover="hover"
								variant="contained"
								onClick={() => navigate('/movie/feed')}
								sx={{
									textTransform: 'none',
								}}
							>
								Explore Moviehubz
							</motion.button>
						</div>
					) : (
						<Button
							variant="contained"
							onClick={() => navigate('/login')}
						>
							Get Started
						</Button>
					)}
				</motion.div>
				<motion.div
					variants={variants1}
					initial="hidden"
					animate="show"
					className="videos"
				>
					<video controls autoPlay src={randomtrailers}></video>
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
					{moreemail && (
						<motion.div
							initial={{ x: '-100%' }}
							animate={{
								x: ['-5%', '25%', '5%'],
								y: '-6rem',
								transition: { duration: 0.8, ease: 'easeInOut' },
							}}
							style={{
								background: 'lightgrey',
								padding: '.5rem',
								width: '40%',
							}}
						>
							<span
								style={{
									position: 'absolute',
									right: '10px',
									width: '3rem !important',
									height: '3rem !important',
									fontSize: '3rem !important',
									top: 0,
									cursor: 'pointer',
								}}
								onClick={() => setEmail((prev) => !prev)}
							>
								&times;
							</span>
							<h6>
								{' '}
								More information has been sent to your &nbsp;
								<a
									style={{ color: 'purple' }}
									href="mailto:gmail.com"
								>
									Email
								</a>
							</h6>
						</motion.div>
					)}
				</Box>
				<Box className="bottom__data">
					<span className="text-light">
						Username:
						<span className="text-warning"> {username}</span>
					</span>
					<span className="text-light">
						Tel no:
						<span className="text-warning">
							{' '}
							{alldata?.result?.phone}
						</span>
					</span>
					<span className="text-light">
						Email Address:
						<span className="text-warning">
							{' '}
							{alldata?.result?.email}
						</span>
					</span>
				</Box>
			</Box>
		</div>
	);
};

export default LandingPage;

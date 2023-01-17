import React, {
	useCallback,
	useState,
	useEffect,
	useRef,
} from 'react';
import '../css/Header.scss';
import { Box, IconButton, Avatar, Button } from '@mui/material';
import { Menu, DarkMode, WbSunny } from '@mui/icons-material';
import { useMainContext } from '../context/contexts_/MainContext';
import { useMovieContext } from '../context/contexts_/MovieContext';
import { Refresh, Settings, Logout } from '@mui/icons-material';
import { useNavigate, Link } from 'react-router-dom';
import { PROFILE, CLOSEMODAL } from '../context/action_type';
import { motion } from 'framer-motion';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import {
	addUser,
	createSuggested,
} from '../context/features/movieSlice';
const Header = () => {
	const {
		main_state: { istheme, user, admin, profile },
		main_dispatch,
	} = useMainContext();
	const {
		movie_state: { success, ismodal, error, loading, modalcontent },
		movie_dispatch,
	} = useMovieContext();

	const navigate = useNavigate();
	const newref = useRef();
	const newsug = useRef();
	const adm = JSON.parse(window.localStorage.getItem('profile'));
	const admId = adm?.result?._id;

	const logout = (ev) => {
		ev.preventDefault();
		window.localStorage.removeItem('profile');
		navigate('/login');
		window.location.reload();
	};
	//
	const [showform, setForm] = useState();
	const [addsuggested, setAddSuggested] = useState(false);
	const [suggested, setSuggested] = useState(false);
	const [allsuggested, setallsuggested] = useState(false);
	const [showmenu, setShowMenu] = useState(false);
	const [newuser, setUser] = useState({ username: '', phone: '' });
	const [newsuggested, setNewSuggested] = useState({ suggested: '' });
	const handleChange = (ev) => {
		setUser({ ...newuser, [ev.target.name]: ev.target.value });
		setNewSuggested({
			...newuser,
			[ev.target.name]: ev.target.value,
		});
	};
	const addNewUser = useCallback((ev) => {
		ev.preventDefault();
		const myuser = { userId: adm?.result?._id, newuser };
		addUser(
			myuser,
			movie_dispatch,
			success,
			setForm,

			ismodal,
		);
		console.log(adm?.result?._id);
	}, []);

	const addSuggested = useCallback((ev) => {
		ev.preventDefault();
		const mysuggested = { userId: adm?.result?._id, newsug };
		console.log(newsuggested);
		createSuggested(
			mysuggested,
			movie_dispatch,
			newsuggested,
			success,
		);
	}, []);
	const closemodal = () => {
		movie_dispatch({ type: CLOSEMODAL });
	};
	useEffect(() => {
		// newref.current = newuser;
		// newsug.current = newsuggested;
	}, []);
	return (
		<div className="header">
			{showform && (
				<Box className="add">
					<form onSubmit={addNewUser} className="add__form">
						<h5
							className="text-light"
							align="center"
							style={{
								color: 'white !important',
								marginTop: '1rem',
								marginBottom: '-1rem',
							}}
						>
							Add New User
						</h5>
						<input
							type="text"
							name="username"
							value={newuser.username}
							placeholder="Enter Name"
							onChange={handleChange}
						/>
						<input
							type="text"
							name="phone"
							value={newuser.phone}
							placeholder="Enter Phone Number"
							onChange={handleChange}
						/>
						<>
							{ismodal && (
								<h6
									style={{
										color: 'yellow',
										margin: '1.4rem auto -1rem auto',
										textAlign: 'center',
									}}
								>
									All fields must be entered
								</h6>
							)}
						</>
						<Button variant="contained" type="submit" size="small">
							{!loading ? 'ADD' : 'Adding user...'}
						</Button>
					</form>
				</Box>
			)}
			<Box className="title">
				<h3
					style={{ cursor: 'pointer', marginLeft: '-1.5rem' }}
					onClick={() => navigate('/')}
					className={adm ? 'nav navbar navbar-brand ' : 'disabled'}
				>
					{user?.result?.company
						? user?.result?.company
						: ' MovieHubz co'}
				</h3>
			</Box>
			<Box className="sites">
				<Button
					className={adm ? 'header' : 'disabled'}
					variant="outlined"
					size="small"
					onClick={() => {
						setForm((prev) => !prev);
					}}
				>
					Add New User
				</Button>
				<Button
					className={adm ? 'header' : 'disabled'}
					variant="outlined"
					size="small"
					onClick={() => navigate('/popular')}
				>
					popular movies
				</Button>{' '}
				<Button
					className={adm ? 'header' : 'disabled'}
					variant="outlined"
					size="small"
					onClick={() => {
						setAddSuggested(true);
						setSuggested((prev) => !prev);
					}}
				>
					Suggested Movies
				</Button>
				{suggested && (
					<Box className="suggested">
						{addsuggested ? (
							<div>
								<Box>
									<Button
										variant="outlined"
										sx={{
											display: 'flex',
											justifyContent: 'space-between',
										}}
										onClick={() => {
											setAddSuggested((prev) => !prev);
										}}
									>
										Add Suggested Movie{' '}
										<span>
											<AddCircleOutlineIcon
												sx={{ marginLeft: '.7rem' }}
												onClick={() => {
													setAddSuggested((prev) => !prev);
												}}
											/>
										</span>
									</Button>{' '}
									<Button
										onClick={() => {
											setallsuggested((prev) => !prev);
											setSuggested((prev) => !prev);
										}}
										variant="outlined"
										sx={{
											display: 'flex',
											justifyContent: 'space-between',
										}}
									>
										View Suggested Movies{' '}
										<span>
											<FullscreenIcon
												sx={{ marginLeft: '.7rem' }}
												onClick={() => {
													setallsuggested((prev) => !prev);
													setSuggested((prev) => !prev);
												}}
											/>
										</span>
									</Button>{' '}
								</Box>
							</div>
						) : (
							<Box className="addsuggested">
								<form onSubmit={addSuggested} className="add__form">
									<div>
										<input
											type="text"
											name="suggested"
											value={newsuggested.suggested}
											placeholder="Enter Name"
											onChange={handleChange}
										/>

										<Button
											variant="contained"
											type="submit"
											size="small"
										>
											{!loading ? 'ADD' : 'Adding suggested movie...'}
										</Button>
									</div>
									<div>
										{ismodal && (
											<h6
												style={{
													color: 'yellow',
												}}
											>
												All fields must be entered
											</h6>
										)}
									</div>
								</form>
							</Box>
						)}
					</Box>
				)}
				{allsuggested && (
					<motion.div
						initial={{ y: '-200px', opacity: 0 }}
						animate={{
							y: '45px',
							opacity: 1,

							transition: { duration: 0.6 },
						}}
						className="allsuggested"
					>
						<Box className="d-flex justify-content-evenly align-items-center">
							{' '}
							<h6>Suggested list of movies</h6>
							<span>
								<IconButton
									onClick={() => {
										setSuggested(true);
										setallsuggested((prev) => !prev);
									}}
								>
									<AddCircleOutlineIcon
										sx={{
											cursor: 'pointer',
											color: 'white !important',
										}}
									/>
								</IconButton>
							</span>
						</Box>

						<ol start="1">
							{user?.result?.suggested.map((data) => {
								return (
									<li key={data._id}>
										<p>{data.suggested}</p>
									</li>
								);
							})}
						</ol>
					</motion.div>
				)}
				<Button
					className={adm ? 'header' : 'disabled'}
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
						className="theme"
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
				<Box style={{ position: 'relative' }}>
					<IconButton
						className="menu"
						onClick={() => setShowMenu((prev) => !prev)}
					>
						<Menu />
					</IconButton>
					{showmenu && (
						<Box style={{ display: 'none' }} className="menu__nav">
							<p
								onClick={() => {
									setForm((prev) => !prev);
								}}
							>
								Add New User
							</p>
							<p onClick={() => navigate('/popular')}>
								Popular Movies
							</p>
							<p
								onClick={() => {
									setAddSuggested(true);
									setShowMenu((prev) => !prev);
								}}
							>
								Suggested Movies
							</p>
							<p onClick={() => navigate('/latest')}>Latest Movies</p>
						</Box>
					)}
				</Box>
				<Box className="main__prof">
					{' '}
					{adm?.result?._id && (
						<Avatar
							onClick={() =>
								main_dispatch({ type: PROFILE, profile })
							}
							sx={{ cursor: 'pointer' }}
						/>
					)}
					{profile && (
						<Box className="d-flex flex-column position-absolute bg-dark prof">
							<Button
								variant="outlined"
								siz="small"
								onClick={() => {
									main_dispatch({ type: PROFILE, profile });
									navigate(`/profile/${admId}`);
								}}
							>
								<span>
									<Settings sx={{ fontSize: '.8rem' }} />
								</span>
								View profile
							</Button>
							<Button variant="outlined">
								<span onClick={() => window.location.reload()}>
									<Refresh sx={{ fontSize: '.8rem' }} />
								</span>
								Refresh
							</Button>
							<Button variant="outlined" onClick={logout}>
								<span>
									<Logout sx={{ fontSize: '.8rem' }} />
								</span>
								log out
							</Button>
						</Box>
					)}
				</Box>
			</Box>
		</div>
	);
};

export default Header;

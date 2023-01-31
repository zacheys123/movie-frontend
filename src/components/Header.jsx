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
import {
	Refresh,
	Settings,
	Logout,
	Upgrade,
} from '@mui/icons-material';
import {
	setFree,
	setAmateur,
	setWorld,
	setPremium,
} from './plan/movie_config';
import { useNavigate, useLocation } from 'react-router-dom';
import {
	PROFILE,
	CLOSEMODAL,
	DELETEUSER,
	HEADER_HIDE,
	GETUSER,
} from '../context/action_type';
import { motion } from 'framer-motion';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import {
	addUser,
	createSuggested,
} from '../context/features/movieSlice';
import Delete from '@mui/icons-material/DeleteForever';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
const Header = ({ user, refetch }) => {
	const {
		main_state: { istheme, profile },
		main_dispatch,
	} = useMainContext();
	const {
		movie_state: { success, ismodal, error, loading, modalcontent },
		movie_dispatch,
	} = useMovieContext();

	const navigate = useNavigate();

	const adm = JSON.parse(window.localStorage.getItem('profile'));
	const admId = adm?.result?._id;

	const logout = (ev) => {
		ev.preventDefault();
		window.localStorage.removeItem('profile');
		window.localStorage.removeItem('userInfo');
		navigate('/');
		window.location.reload();
	};
	//
	const [showform, setForm] = useState();
	const [addsuggested, setAddSuggested] = useState(false);
	const [suggested, setSuggested] = useState(false);
	const [allsuggested, setallsuggested] = useState(false);
	const [showmenu, setShowMenu] = useState(false);
	const [remove, setRemove] = useState(false);

	const usernameref = useRef(null);
	const phoneref = useRef(null);
	const suggestedref = useRef();
	const suggestref = useRef(null);
	const latestref = useRef(null);
	const popularref = useRef(null);

	// add a new user to add movies
	const addNewUser = useCallback((ev) => {
		ev.preventDefault();
		const newuser = {
			username: usernameref?.current?.value,
			phone: phoneref.current?.value,
		};
		const myuser = { userId: adm?.result?._id, newuser };
		addUser(myuser, movie_dispatch, success, setForm, ismodal);

		console.log(adm?.result?._id);
	}, []);

	// add a suggested movie
	const addSuggested = useCallback((ev) => {
		ev.preventDefault();
		const mysuggested = {
			userId: adm?.result?._id,
			suggest: suggestedref?.current?.value,
		};
		console.log(mysuggested);
		createSuggested(mysuggested, movie_dispatch, success);
	}, []);

	// const removeuser = async (myid) => {
	// 	await axios.delete(
	// 		`https://moviebackendz.onrender.com/movie/remove/${myid}`,
	// 		myid,
	// 	);
	// 	movie_dispatch({
	// 		type: DELETEUSER,
	// 		payload: user?.result?.users,
	// 	});
	// };
	const myInfo = JSON.parse(window.localStorage.getItem('userInfo'));
	const info = user?.result?.package;

	const location = useLocation();
	const refs = {
		suggestref,
		latestref,
		popularref,
	};

	useEffect(() => {
		switch (myInfo || info) {
			case 'Free':
				setFree(refs);
			case 'Amateur':
				setAmateur(refs);
			case 'World':
				setWorld(refs);
			case 'Premium':
				setPremium(refs);
		}
	});

	const [showUser, setShowuser] = useState(false);
	console.log(user);
	return (
		<>
			{info && (
				<div className={istheme ? 'header' : 'header_darkmode'}>
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
									ref={usernameref}
									placeholder="Enter Name"
								/>
								<input
									type="text"
									name="phone"
									ref={phoneref}
									placeholder="Enter Phone Number"
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
											{modalcontent}
										</h6>
									)}
								</>
								<Button
									onClick={refetch}
									variant="contained"
									type="submit"
									size="small"
								>
									{!loading ? 'ADD' : 'Adding user...'}
								</Button>
							</form>
						</Box>
					)}
					<Box className="title">
						<h3
							style={{ cursor: 'pointer', marginLeft: '-1.5rem' }}
							onClick={() => navigate('/movie/feed')}
							className={
								adm ? 'nav navbar navbar-brand ' : 'disabled'
							}
						>
							{user?.result?.company
								? user?.result?.company
								: ' MovieHubz co'}
						</h3>
					</Box>
					<Box className="sites">
						{location.pathname !== '/' && (
							<Button
								className={adm ? 'header' : 'disabled'}
								variant="outlined"
								size="small"
								onClick={() => navigate('/')}
							>
								Homepage
							</Button>
						)}
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
							ref={popularref}
							className={adm ? 'header' : 'disabled'}
							variant="outlined"
							size="small"
							onClick={() => navigate('/popular')}
						>
							popular movies
						</Button>{' '}
						<Button
							ref={suggestref}
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
										<form
											onSubmit={addSuggested}
											className="add__form"
										>
											<div>
												<input
													type="text"
													name="suggested"
													ref={suggestedref}
													placeholder="Enter Name"
												/>

												<Button
													variant="contained"
													type="submit"
													size="small"
												>
													{!loading
														? 'ADD'
														: 'Adding suggested movie...'}
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
												<p>{data.suggest}</p>
											</li>
										);
									})}
								</ol>
							</motion.div>
						)}
						<Button
							ref={latestref}
							className={adm ? 'header' : 'disabled'}
							variant="outlined"
							size="small"
							onClick={() =>
								navigate(`/movie-list/${user?.result?._id}/latest`)
							}
						>
							Latest Movies
						</Button>
					</Box>
					<Box className="toggle__button">
						{istheme ? (
							<IconButton
								className="dark"
								onClick={() =>
									main_dispatch({ type: 'THEME', payload: istheme })
								}
							>
								<DarkMode />
							</IconButton>
						) : (
							<IconButton
								className="theme"
								onClick={() =>
									main_dispatch({ type: 'THEME', payload: istheme })
								}
							>
								<WbSunny />
							</IconButton>
						)}
						<Box style={{ position: 'relative' }}>
							{adm?.result?._id && (
								<IconButton
									className="menu"
									onClick={() => setShowMenu((prev) => !prev)}
								>
									<Menu />
								</IconButton>
							)}
							{showmenu && (
								<Box
									style={{ display: 'none' }}
									className="menu__nav"
								>
									<p
										onClick={() => {
											setShowMenu(false);
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
									<p
										onClick={() => {
											setShowMenu((prev) => !prev);
											navigate(
												`/movie-list/${user?.result?._id}/latest`,
											);
										}}
									>
										Latest Movies
									</p>
								</Box>
							)}
						</Box>
						<Box className="main__prof position-relative">
							{' '}
							{adm?.result?.profilepic ? (
								<Avatar
									onClick={() =>
										main_dispatch({ type: PROFILE, profile })
									}
									sx={{ cursor: 'pointer' }}
								/>
							) : (
								<div
									onMouseOver={() => setShowuser((prev) => !prev)}
									onMouseOut={() => setShowuser((prev) => !prev)}
									onClick={() => {
										setShowuser((prev) => prev);
										main_dispatch({ type: PROFILE, profile });
									}}
									className="bg-info"
									style={{
										cursor: 'pointer',
										display: 'flex',
										justifyContent: 'center',
										alignItems: 'center',
										width: '2.5rem',
										height: '2.5rem',
										fontSize: '1.1rem',
										borderRadius: '100%',
										fontWeight: 400,
										color: 'yellow',
									}}
								>
									{user?.result?.firstname
										.toUpperCase()
										.split('')[0] +
										user?.result?.lastname.toUpperCase().split('')[0]}
								</div>
							)}
							{showUser && (
								<div
									className="d-flex flex-column position-absolute bg-dark text-light"
									style={{
										marginLeft: '-10rem ',
									}}
								>
									<span className="mt-2 mx-2 ">
										<span className="mt-2 mx-2 text-info">
											{' '}
											Username:
										</span>

										{user?.result?.firstname + user?.result?.lastname}
									</span>
									{''}
									<span className="mx-2 ">
										<span className="mt-2 mx-2 text-info">
											{' '}
											email:
										</span>
										{user?.result?.email}
									</span>
									{''}
								</div>
							)}
							{profile && (
								<Box className="d-flex flex-column position-absolute bg-dark prof">
									<Button
										variant="outlined"
										size="small"
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
									<Button
										variant="outlined"
										onClick={() => window.location.reload()}
									>
										<span onClick={() => window.location.reload()}>
											<Refresh sx={{ fontSize: '.8rem' }} />
										</span>
										Refresh
									</Button>
									<Button
										variant="outlined"
										onClick={() => {
											main_dispatch({ type: PROFILE, profile });
											navigate('/create/plan');
										}}
									>
										<span
											onClick={() => {
												main_dispatch({ type: PROFILE, profile });
												navigate('/create/plan');
												window.location.reload();
											}}
										>
											<Upgrade sx={{ fontSize: '.8rem' }} />
										</span>
										Upgrade package
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
			)}
		</>
	);
};

export default Header;

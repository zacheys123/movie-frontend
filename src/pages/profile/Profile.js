import React, { useState, useCallback, useRef } from 'react';
import {
	Button,
	Box,
	Stack,
	Typography,
	TextField,
	IconButton,
} from '@mui/material';
import { useMainContext } from '../../context/contexts_/MainContext';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import VisibilityOn from '@mui/icons-material/Visibility';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {
	Main,
	Left_Bar,
	Image_Data,
	MainStack,
	Profile_Data,
	Validate,
	Profile_Auth,
	Auth,
} from './styles';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import AddIcon from '@mui/icons-material/Add';
import PropTypes from 'prop-types';
import axios from 'axios';
import { motion } from 'framer-motion';
import CircularProgress from '@mui/material/CircularProgress';
import logo from '../../assets/lohin.jpg';

import {
	update_user,
	delete_user,
	update_auth,
} from '../../context/features/user_actions';
import './profile.scss';
import Modal from '../../components/Modal';
import EditIcon from '@mui/icons-material/Edit';
import {
	useNavigate,
	useParams,
	Navigate,
	useLocation,
} from 'react-router-dom';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import {
	WRONGPASSWORD,
	NO_DATA,
	SETPASSWORD,
	SETPASS,
} from '../../context/action_type';
import { Form } from 'react-bootstrap';
const Profile = () => {
	const [image, setImage] = useState();

	const prevData = useRef({});
	const prevAuth = useRef({});
	const {
		main_state: {
			istheme,
			loading,
			ismodal,
			success,
			modalcontent,
			loader,
			disabled,
			disablepass,
			showValidate,
			logged,
			error,
		},
		main_dispatch,
	} = useMainContext();

	const navigate = useNavigate();

	const [prof, setProf] = useState({
		firstname: '',
		lastname: ' ',
		username: '',

		marital: '',
		company: '',
		occupation: '',
		city: '',
	});
	const [auth_data, setAuthData] = useState({
		password: '',
		confirmpassword: '',
	});
	const [new_user, setNewUser] = useState({
		newemail: '',
		newpass: '',
		newconfirmpass: '',
	});

	const [passw, setPassword] = useState(false);
	const [isDataChanged, setChanged] = useState(false);

	const handleChange = (ev) => {
		ev.preventDefault();
		// const fieldname = ev.target.getAttribute('name');
		// const fieldvalue = ev.target.value;
		// const newformData = { ...prof };
		// newformData[fieldname] = fieldvalue;

		setProf(() => {
			return { ...prof, [ev.target.name]: ev.target.value };
		});
		setAuthData(() => {
			return { ...auth_data, [ev.target.name]: ev.target.value };
		});

		setNewUser(() => {
			return { ...new_user, [ev.target.name]: ev.target.value };
		});
	};

	const adm = JSON.parse(window.localStorage.getItem('profile'));
	const id = adm?.result?._id; // Update function
	const imageref = useRef();
	const handleImage = (e) => {
		{
			const file = e.target.files[0];
			Transformfile(file);
		}
	};
	const Transformfile = (file) => {
		const reader = new FileReader();
		if (file) {
			reader.readAsDataURL(file);
			reader.onloadend = (e) => {
				console.log(e.target.result.replace(/(?:\r\n|\r|\n)/g, ''));
				setImage(reader.result.replace(/(?:\r\n|\r|\n)/g, ''));
			};
		} else {
			setImage('');
		}
	};
	const update_pass = useCallback(
		(ev) => {
			const myprofile = { prevAuth, userId: id };

			ev.preventDefault();

			update_auth(main_dispatch, myprofile, id, setDisabled);
		},
		[main_dispatch, id],
	);

	const update_acc = useCallback((ev) => {
		let form = { prevData, image };
		console.log(form.imageref);
		const myprofile = { form, userId: id };

		ev.preventDefault();
		if (
			prevData?.current?.firstname &&
			prevData?.current?.lastname &&
			prevData?.current?.company
		) {
			update_user(
				main_dispatch,
				loading,
				myprofile,
				id,
				ismodal,
				success,
				navigate,
			);
		} else {
			main_dispatch({ type: NO_DATA });
		}
	}, []);

	// Delete function

	const delete_acc = useCallback((ev) => {
		ev.preventDefault();

		const myprofile = {
			prevData,
			userId: id,
		};

		delete_user(
			main_dispatch,
			loading,
			myprofile,
			id,
			ismodal,
			success,
			navigate,
			setDisabled,
		);
	}, []);
	const [allprof, setDataProfile] = useState({});
	const profile = useRef();

	// Get User Data
	const getUserData = async (ev) => {
		const baseUrl = 'https://moviebackendz.onrender.com';

		try {
			const response = await axios.get(`${baseUrl}/user/v2/${id}`);

			setDataProfile(response?.data);
			let username =
				response?.data?.result?.firstname +
				response?.data?.result?.lastname;
			setProf({
				firstname: response?.data?.result?.firstname,
				lastname: response?.data?.result?.lastname,
				username: username || response?.data?.username,

				company: response?.data?.result?.company,
				marital: response?.data?.result?.marital || '',
				occupation: response?.data?.result?.occupation,
				city: response?.data?.result?.city,
				package: response?.data?.result?.package,
				company: response?.data?.result?.company,
			});
		} catch (error) {
			console.log(error.message);
		}
	};
	// Loader UseEffect
	const [progress, setProgress] = React.useState(10);

	React.useEffect(() => {
		const timer = setInterval(() => {
			setProgress((prevProgress) =>
				prevProgress >= 100 ? 0 : prevProgress + 10,
			);
		}, 450);

		return () => {
			clearInterval(timer);
		};
	}, []);

	React.useEffect(() => {
		profile.current = allprof;
		prevData.current = prof;
		prevAuth.current = auth_data;
		imageref.current = image;
	}, [prof, auth_data, image]);
	const closemodal = () => {
		main_dispatch({ type: 'CLOSEMODAL', ismodal });
	};

	const [disable, setDisabled] = useState(false);
	const [new_account, setNewAccount] = useState(false);

	React.useEffect(() => {
		getUserData();
	}, [logged]);

	//
	const variants = {
		initial: {
			x: '100%',
			opacity: 0,
		},
		animate: {
			x: ['100%', '0%', '-5%', '0%'],
			opacity: 1,
			transition: {
				delay: 0.5,
				duration: 0.6,
			},
		},
	};
	return (
		<Stack
			sx={{
				background: 'white',
				minHeight: '95vh !important',
				width: '100%',
			}}
		>
			<MainStack className="profile">
				<Left_Bar className="profile_left">
					<Image_Data className="profile_image">
						<h4>Change Profile Picture</h4>

						<Box
							sx={{
								height: '20em',
								width: '100%',
								background: 'rgb(20, 22, 52)',
								marginBottom: '2.6rem',
							}}
							className="dp_picture"
						>
							{image ? <img src={image} /> : 'Profile picture here!!'}
							<span>
								<label htmlFor="dp_image">
									<AddAPhotoIcon
										sx={{
											color: 'white',
											fontSize: '2rem',
											cursor: 'pointer',
										}}
									/>
								</label>
							</span>
							<input
								id="dp_image"
								style={{
									display: 'none',
								}}
								onChange={handleImage}
								type="file"
							/>
						</Box>

						<Box
							sx={{
								color: 'lightgrey',
								padding: '.4rem',
								display: 'flex',
								flexDirection: 'column',
							}}
						>
							<>
								<h5>
									Username:
									<span
										style={{
											color: 'lightgrey',
											opacity: '.6',
											fontSize: '1.5rem',
										}}
									>
										{prof?.username}
									</span>
								</h5>
								<p>
									{' '}
									Email:
									<span style={{ color: 'lightgrey', opacity: '.6' }}>
										{' '}
										{adm?.result?.email}
									</span>
								</p>
								<p>
									N/B: A User can Only update their data/information
									only.
								</p>
								<p>
									N/B: An Admin on the Other hand can only delete or
									terminate a user anytime but they cannot edit or
									change any of the user's data.
								</p>
								<Stack
									direction="row"
									sx={{
										padding: '.4rem',
										background: 'maroon',
										width: '50%',
										cursor: 'pointer',
									}}
									onClick={() => navigate('/')}
								>
									{' '}
									<ArrowBackIcon />
									Go Back
								</Stack>
							</>
						</Box>
					</Image_Data>
				</Left_Bar>
				<Main istheme={istheme}>
					<Box
						sx={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'space-evenly',
						}}
					>
						<Typography
							variant="h5"
							sx={{
								color: 'red',
								fontSize: '1.3rem !important',
								marginLeft: '1rem',
								marginTop: '.5rem !important',
							}}
							className="head__update"
						>
							Update Info
						</Typography>
					</Box>
					<Form.Select size="2">
						<option>Choose Update Action</option>
						<option
							style={{ fontFamily: "'Poppins', sans-serif" }}
							value="profile"
							onClick={() => setDisabled((prev) => !prev)}
						>
							Update Profile Info
						</option>
						<option
							value="password"
							onClick={() => {
								main_dispatch({
									type: SETPASSWORD,
									showValidate,
								});
							}}
						>
							Change Password
						</option>
					</Form.Select>
					{ismodal && (
						<Modal
							modalcontent={modalcontent}
							closemodal={closemodal}
							success={success}
							error={error}
						/>
					)}
					<Box
						className="container-fluid"
						sx={{
							marginTop: '.9rem',
							borderLeft: '1px solid lightgrey',
							height: '73vh',
							paddingTop: '.2rem',
							background: istheme ? 'white' : 'black',
						}}
					>
						<Profile_Data disabled={disable} className="form-group">
							<TextField
								disabled={!disable}
								InputLabelProps={{
									shrink: true,
									style: {
										color: istheme ? 'grey' : 'grey',
										marginLeft: '.5rem',
										pointerEvents: 'none',
									},
								}}
								name="firstname"
								labelid="demo-simple-select-standard-label"
								id="demo-simple-select-standard"
								variant="standard"
								label="Firstname"
								sx={{
									color: 'white',
									width: '100%',
									borderLeft: !istheme ? '2px solid grey' : 'none',
									borderBottom: '1px solid lightgrey',
								}}
								inputProps={{
									style: {
										color: !istheme
											? disabled
												? 'black'
												: 'white'
											: 'white',
										marginLeft: '.5rem',
									},
								}}
								value={prof?.firstname || ''}
								onChange={handleChange}
								type="text"
							/>
						</Profile_Data>
						<Profile_Data disabled={disable} className="form-group">
							<TextField
								disabled={!disable}
								InputLabelProps={{
									shrink: true,
									style: {
										color: istheme ? 'grey' : 'grey',
										marginLeft: '.5rem',
										pointerEvents: 'none',
									},
								}}
								name="lastname"
								labelid="demo-simple-select-standard-label"
								id="demo-simple-select-standard"
								variant="standard"
								label="Lastname"
								sx={{
									color: 'white',
									width: '100%',
									borderLeft: !istheme ? '2px solid grey' : 'none',
									borderBottom: '1px solid lightgrey',
								}}
								inputProps={{
									style: {
										color: !istheme
											? disabled
												? 'black'
												: 'white'
											: 'white',
										marginLeft: '.5rem',
									},
								}}
								value={prof?.lastname || ''}
								onChange={handleChange}
								type="text"
							/>
						</Profile_Data>
						<Profile_Data disabled={disable} className="form-group">
							<TextField
								disabled={!disable}
								InputLabelProps={{
									shrink: true,
									style: {
										color: istheme ? 'grey' : 'grey',
										marginLeft: '.5rem',
										pointerEvents: 'none',
									},
								}}
								name="username"
								labelid="demo-simple-select-standard-label"
								id="demo-simple-select-standard"
								variant="standard"
								label="Username"
								sx={{
									color: 'white',
									width: '100%',
									borderLeft: !istheme ? '2px solid grey' : 'none',
									borderBottom: '1px solid lightgrey',
								}}
								inputProps={{
									style: {
										color: !istheme
											? disabled
												? 'black'
												: 'white'
											: 'white',
										marginLeft: '.5rem',
									},
								}}
								value={prof?.username || ''}
								onChange={handleChange}
								type="text"
							/>
						</Profile_Data>

						<Profile_Data disabled={disable}>
							<TextField
								disabled={!disable}
								InputLabelProps={{
									shrink: true,
									style: {
										color: istheme ? 'grey' : 'grey',
										marginLeft: '.5rem',
									},
								}}
								name="company"
								labelid="demo-simple-select-standard-label"
								id="demo-simple-select-standard"
								variant="standard"
								label="Business Name"
								sx={{
									color: 'white',
									width: '100%',
									borderLeft: !istheme ? '2px solid grey' : 'none',
									borderBottom: '1px solid lightgrey',
								}}
								inputProps={{
									style: {
										marginLeft: '.5rem',
										color: !istheme
											? disabled
												? 'black'
												: 'white'
											: 'white',
									},
								}}
								value={prof?.company || ''}
								onChange={handleChange}
							/>
						</Profile_Data>
						<Profile_Data disabled={disable}>
							<TextField
								disabled={!disable}
								InputLabelProps={{
									shrink: true,
									style: {
										color: istheme ? 'grey' : 'grey',
										marginLeft: '.5rem',
									},
								}}
								name="marital"
								labelid="demo-simple-select-standard-label"
								id="demo-simple-select-standard"
								variant="standard"
								label="Marital Status"
								sx={{
									color: 'white',
									width: '100%',
									borderLeft: !istheme ? '2px solid grey' : 'none',
									borderBottom: '1px solid lightgrey',
								}}
								inputProps={{
									style: {
										marginLeft: '.5rem',
										color: !istheme
											? disabled
												? 'black'
												: 'white'
											: 'white',
									},
								}}
								value={prof?.marital || ''}
								onChange={handleChange}
							/>
						</Profile_Data>
						<Profile_Data disabled={disable}>
							<TextField
								disabled={!disable}
								InputLabelProps={{
									shrink: true,
									style: {
										color: istheme ? 'grey' : 'grey',
										marginLeft: '.5rem',
									},
								}}
								name="occupation"
								labelid="demo-simple-select-standard-label"
								id="demo-simple-select-standard"
								variant="standard"
								label="Occupation"
								sx={{
									color: 'white',
									width: '100%',
									borderLeft: !istheme ? '2px solid grey' : 'none',
									borderBottom: '1px solid lightgrey',
								}}
								inputProps={{
									style: {
										marginLeft: '.5rem',
										color: !istheme
											? disabled
												? 'black'
												: 'white'
											: 'white',
									},
								}}
								value={prof?.occupation || ''}
								onChange={handleChange}
							/>
						</Profile_Data>

						<Profile_Data disabled={disable}>
							<TextField
								disabled={!disable}
								InputLabelProps={{
									shrink: true,
									style: {
										color: istheme ? 'grey' : 'grey',
										marginLeft: '.5rem',
									},
								}}
								name="city"
								labelid="demo-simple-select-standard-label"
								id="demo-simple-select-standard"
								variant="standard"
								label="City"
								sx={{
									color: 'white',
									width: '100%',
									borderLeft: !istheme ? '2px solid grey' : 'none',
									borderBottom: '1px solid lightgrey',
								}}
								inputProps={{
									style: {
										marginLeft: '.5rem',
										color: !istheme
											? disabled
												? 'black'
												: 'white'
											: 'white',
									},
								}}
								value={prof?.city || ''}
								onChange={handleChange}
							/>
						</Profile_Data>

						<Validate showValidate={showValidate}>
							{showValidate && (
								<Auth>
									{' '}
									<div className="top">
										<span
											onClick={() => {
												setNewAccount((prev) => !prev);
											}}
											className="back_icon"
										>
											<KeyboardBackspaceIcon />
										</span>
										<span
											onClick={() =>
												main_dispatch({
													type: SETPASS,
													showValidate,
												})
											}
											className="close_icon"
										>
											{' '}
											&times;
										</span>
									</div>
									{!new_account ? (
										<>
											<Box className="account">
												<h6>{adm?.result?.email}</h6>
											</Box>

											<motion.div
												variants={variants}
												initial="initial"
												animate="animate"
												className="auth"
											>
												<Profile_Auth success={success} error={error}>
													<Box
														style={{
															display: 'flex',
															width: '100%',

															alignItems: 'center',
														}}
													>
														<TextField
															InputLabelProps={{
																shrink: true,
																style: {
																	color: istheme ? 'grey' : 'grey',
																	marginLeft: '.5rem',
																},
															}}
															name="password"
															labelid="demo-simple-select-standard-label"
															id="demo-simple-select-standard"
															variant="standard"
															label="New Password"
															type={!passw ? 'password' : 'text'}
															sx={{
																color: 'white',
																width: '100%',
																borderLeft: !istheme
																	? '2px solid grey'
																	: 'none',
																borderBottom: '1px solid lightgrey',
															}}
															inputProps={{
																style: {
																	marginLeft: '.5rem',
																	color: disabled
																		? 'black'
																		: 'rgb(201, 175, 175)',
																},
															}}
															value={auth_data?.password || ''}
															onChange={handleChange}
														/>
														{!passw ? (
															<VisibilityOff
																sx={{
																	cursor: 'pointer',
																	color: !istheme ? 'white' : 'black',
																	marginLeft: '.6rem',
																}}
																onClick={() => {
																	setPassword((prof) => !prof);
																}}
															/>
														) : (
															<VisibilityOn
																sx={{
																	cursor: 'pointer',
																	color: !istheme ? 'white' : 'black',
																}}
																onClick={() => {
																	setPassword((prof) => !prof);
																}}
															/>
														)}
													</Box>
												</Profile_Auth>

												<Profile_Auth success={success} error={error}>
													<TextField
														InputLabelProps={{
															shrink: true,
															style: {
																color: istheme ? 'grey' : 'grey',
																marginLeft: '.5rem',
															},
														}}
														type={!passw ? 'password' : 'text'}
														name="confirmpassword"
														labelid="demo-simple-select-standard-label"
														id="demo-simple-select-standard"
														variant="standard"
														label="Confirm New Password"
														sx={{
															color: 'white',
															width: '100%',
															borderLeft: !istheme
																? '2px solid grey'
																: 'none',
															borderBottom: '1px solid lightgrey',
														}}
														inputProps={{
															style: {
																marginLeft: '.5rem',
																color: disabled
																	? 'black'
																	: 'rgb(201, 175, 175)',
															},
														}}
														value={auth_data?.confirmpassword || ''}
														onChange={handleChange}
													/>
												</Profile_Auth>
												<Box>
													{error && (
														<span
															style={{
																color: 'red',
																margin: '3rem 0 0 1rem',
															}}
														>
															{modalcontent}
														</span>
													)}
													{success && (
														<span
															style={{
																color: 'green',
																margin: '2rem 0 0 3rem',
															}}
														>
															{modalcontent}
														</span>
													)}
												</Box>
												<Box>
													<Button
														disabled={loading}
														onClick={update_pass}
														variant="outlined"
														sx={{
															background: 'orange !important',
															marginRight: '1rem',
															color: 'black',
														}}
													>
														{loading ? (
															<>
																<CircularProgress
																	value={progress}
																	size="27px"
																	sx={{ marginRight: '.6rem' }}
																/>

																<span>Updating...</span>
															</>
														) : (
															<span style={{ color: 'indigo' }}>
																Update Password
															</span>
														)}
													</Button>
												</Box>
												<Box
													className="add_button"
													onClick={() =>
														setNewAccount((prev) => !prev)
													}
												>
													{' '}
													<Button
														disabled={loading}
														onClick={update_pass}
														variant="outlined"
														type="submit"
													>
														Add another account
														<span>
															<AddIcon />
														</span>
													</Button>
												</Box>
											</motion.div>
										</>
									) : (
										<motion.div
											variants={variants}
											initial="initial"
											animate="animate"
											className="new_account"
										>
											<input
												value={new_user?.newemail || ''}
												onChange={handleChange}
												name="newemail"
												type="email"
												placeholder="New Email"
											/>
											<input
												value={new_user?.newpass || ''}
												name="newpass"
												onChange={handleChange}
												type="text"
												placeholder="Password"
											/>
											<input
												value={new_user?.newconfirm || ''}
												name="newconfirm"
												onChange={handleChange}
												type="text"
												placeholder="Confirm password"
											/>
											<Button variant="outlined" color="info">
												Create Account
											</Button>
										</motion.div>
									)}
								</Auth>
							)}
						</Validate>

						{!showValidate ? (
							<Box
								sx={{
									marginTop: '2rem',
								}}
								className="actions"
							>
								<Button
									disabled={loading}
									onClick={update_acc}
									variant="outlined"
									sx={{
										background: 'lightblue',
										marginRight: '1rem',
										color: 'green',
									}}
								>
									{loading ? (
										<>
											{' '}
											<CircularProgress
												value={progress}
												size="27px"
												sx={{ color: 'secondary', width: '10%' }}
											/>{' '}
											<span
												style={{
													textTransform: 'none',
													marginLeft: '.7rem',
													fontWeight: 'bold',
												}}
											>
												Updating...
											</span>
										</>
									) : (
										<span
											style={{
												textTransform: 'none',
												marginLeft: '.7rem',
												fontWeight: 'bold',
											}}
										>
											Update data
										</span>
									)}
								</Button>

								<Button
									onClick={delete_acc}
									variant="contained"
									sx={{ background: 'red' }}
								>
									{loader ? (
										<CircularProgress
											size="20px"
											sx={{ color: 'white' }}
										/>
									) : (
										<span
											style={{
												textTransform: 'none',
												marginLeft: '.7rem',
												fontWeight: 'bold',
											}}
										>
											Delete Account
										</span>
									)}
								</Button>
							</Box>
						) : (
							''
						)}
					</Box>
				</Main>
			</MainStack>
		</Stack>
	);
};

export default Profile;

function CircularProgressWithLabel(props) {
	return (
		<Box sx={{ position: 'relative', display: 'inline-flex' }}>
			<CircularProgress variant="determinate" {...props} />
			<Box
				sx={{
					top: 0,
					left: 0,
					bottom: 0,
					right: 0,
					position: 'absolute',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				<Typography
					variant="caption"
					component="div"
					color="text.secondary"
				>
					{`${Math.round(props.value)}%`}
				</Typography>
			</Box>
		</Box>
	);
}

CircularProgressWithLabel.propTypes = {
	/**
	 * The value of the progress indicator for the determinate variant.
	 * Value between 0 and 100.
	 * @default 0
	 */
	value: PropTypes.number.isRequired,
};

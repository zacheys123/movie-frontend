import React, {
	useState,
	useEffect,
	useRef,
	useCallback,
} from 'react';
import {
	Container,
	Stack,
	Box,
	Typography,
	Button,
	CircularProgress,
} from '@mui/material';
import '../css/Overlay.scss';
import { useParams, useNavigate } from 'react-router-dom';
import { useMainContext } from '../context/contexts_/MainContext';

import { createPlan } from '../context/features/user_actions';
import axios from 'axios';
import { motion } from 'framer-motion';
import Success from '@mui/icons-material/CheckBox';
import { HEADER_HIDE } from '../context/action_type';
const ConfirmData = () => {
	const [plan, setPlan] = useState({
		free: '',
		amateur: '',
		world: '',
		premium: '',
	});
	const [myid, setId] = useState(() => {
		const storedvalues = localStorage.getItem('profile');
		if (!storedvalues) return {};
		return JSON.parse(storedvalues);
	});
	const prevData = useRef({});
	const {
		main_state: { loading, loader, userInfo, isplan, res, user },
		main_dispatch,
	} = useMainContext();
	const handlePlan = (ev) => {
		setPlan({ ...plan, [ev.target.name]: ev.target.value });
	};
	console.log(myid?.result?._id);
	const { id } = useParams();
	const navigate = useNavigate();

	const free_plan = useCallback(
		(ev) => {
			ev.preventDefault();

			setPlan(() => {
				return {
					free: 'Free',
					amateur: '',
					world: '',
					premium: '',
				};
			});

			const profile = {
				userId: myid?.result?._id,
				free: plan.free,
			};

			console.log(profile.userId);

			createPlan(profile, navigate, loading, main_dispatch);
		},
		[plan],
	);
	const amateur = useCallback(
		(ev) => {
			ev.preventDefault();
			setPlan(() => {
				return {
					free: '',
					amateur: 'Amateur',
					world: '',
					premium: '',
				};
			});

			const profile = {
				userId: myid?.result?._id,
				free: plan.amateur,
			};
			console.log(profile.userId);

			createPlan(profile, navigate, loading, main_dispatch);
		},
		[plan],
	);
	const world = useCallback(
		(ev) => {
			ev.preventDefault();
			setPlan(() => {
				return {
					free: '',
					amateur: '',
					world: 'World',
					premium: '',
				};
			});
			const profile = {
				userId: myid?.result?._id,
				free: plan.world,
			};
			console.log(profile.userId);

			createPlan(profile, navigate, loading, main_dispatch);
		},
		[plan],
	);
	const premium = useCallback(
		(ev) => {
			ev.preventDefault();
			setPlan(() => {
				return {
					free: '',
					amateur: '',
					world: '',
					premium: 'Premium',
				};
			});

			const profile = {
				userId: myid?.result?._id,
				free: plan.premium,
			};
			console.log(profile.userId);

			createPlan(profile, navigate, loading, main_dispatch);
		},
		[plan],
	);

	useEffect(() => {
		prevData.current = plan;
	}, []);

	const myuserInfo = JSON.parse(localStorage.getItem('userInfo'));
	return (
		<Container sx={{ height: '85vh' }} className="main">
			<Box
				className="main__plan"
				sx={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					flexDirection: 'column',
					height: '100%',
					width: '100%',
					textAlign: 'center',
				}}
			>
				<div className="d-flex flex-column head">
					<h4 style={{ color: 'black' }}>Choose A Plan</h4>

					{myuserInfo ? (
						<div
							style={{
								fontWeight: '600',
								color: 'red !important',
							}}
						>
							<span
								style={{
									color: 'navy !important',
									fontWeight: '600',
								}}
							>
								Currently:
							</span>
							<span style={{ color: 'red' }}> {myuserInfo}</span>
						</div>
					) : (
						'Currently : No package'
					)}
				</div>
				<Stack
					className="plan"
					direction="row"
					justifyContent="center"
					sx={{
						width: '100%',
						height: '80%',
					}}
				>
					<Box
						className="box free "
						style={{ opacity: isplan || loading ? 0.4 : 1 }}
					>
						<h5
							style={{
								fontFamily: "'Open Sans', sans-serif",
								marginTop: '.5rem',
								color: 'orange',
							}}
						>
							Free Plan
						</h5>
						<Typography variant="body">
							&nbsp;&nbsp;In this free plan there are afew that are
							allocated to this plan and packages to use,lets get to
							it
						</Typography>
						<div id="table">
							<div className="row">
								<div className="col-lg-6 col-md-8 col-sm-8">
									Add 1 Movie
								</div>
								<div className="col-lg-2 col-md-2 col-sm-2">
									&#x2713;
								</div>
							</div>

							<div className="row">
								<div className="col-lg-6 col-md-8 col-sm-8">
									Add 2 movies once{' '}
								</div>
								<div className="col-lg-2 col-md-2 col-sm-2">
									&times;
								</div>
							</div>
							<div className="row">
								<div className="col-lg-6 col-md-8 col-sm-8">
									Add Suggested and View Suggested Movies{' '}
								</div>
								<div className="col-lg-2 col-md-2 col-sm-2">
									&times;
								</div>
							</div>
							<div className="row">
								<div className="col-lg-6 col-md-8 col-sm-8">
									View Latest and Upcoming Movies{' '}
								</div>
								<div className="col-lg-2 col-md-2 col-sm-2">
									&times;
								</div>
							</div>
						</div>

						<Box
							sx={{
								display: 'flex',
								flexDirection: 'column',
								justifyContent: 'center',
								alignItems: 'center',
							}}
						>
							{' '}
							<input
								readOnly="readOnly"
								style={{ marginTop: '.7rem' }}
								type="text"
								onChange={handlePlan}
								value={plan.free}
								placeholder=" Free 100ksh/day"
							/>
							<Button
								onClick={free_plan}
								variant="contained"
								sx={{
									background: 'lightblue',
									mt: '2rem',
									background: 'orange',
								}}
							>
								{loader ? (
									<CircularProgress
										size="20px"
										sx={{ color: 'white' }}
									/>
								) : (
									'Start'
								)}
							</Button>
						</Box>
					</Box>
					<Box
						className="box amateur"
						style={{ opacity: isplan || loading ? 0.4 : 1 }}
					>
						{' '}
						<h5
							style={{
								fontFamily: "'Open Sans', sans-serif",
								marginTop: '.5rem',
								color: 'green',
							}}
						>
							Amateur
						</h5>
						<Typography variant="body">
							In this Amateur plan not much functionality is added to
							this plan and packages to use,but you can add movie than
							two movies at a time
						</Typography>
						<div id="table">
							<div className="row">
								<div className="col-lg-6 col-md-8 col-sm-8">
									Add 1 Movie
								</div>
								<div className="col-lg-2 col-md-2 col-sm-2">
									&#x2713;
								</div>
							</div>

							<div className="row">
								<div className="col-lg-6 col-md-8 col-sm-8">
									Add 2 movies once{' '}
								</div>
								<div className="col-lg-2 col-md-2 col-sm-2">
									&#x2713;
								</div>
							</div>
							<div className="row">
								<div className="col-lg-6 col-md-8 col-sm-8">
									View Latest and Upcoming Movies{' '}
								</div>
								<div className="col-lg-2 col-md-2 col-sm-2">
									&times;
								</div>
							</div>
							<div className="row">
								<div className="col-lg-6 col-md-8 col-sm-8">
									Add Suggested and View Suggested Movies{' '}
								</div>
								<div className="col-lg-2 col-md-2 col-sm-2">
									&times;
								</div>
							</div>
							<div className="row"></div>
						</div>
						<Box
							sx={{
								display: 'flex',
								flexDirection: 'column',
								justifyContent: 'center',
								alignItems: 'center',
							}}
						>
							{' '}
							<input
								readOnly="readOnly"
								style={{ marginTop: '.7rem' }}
								type="text"
								onChange={handlePlan}
								value={plan.amateur}
								placeholder=" 150ksh/day"
							/>
							<Button
								onClick={amateur}
								variant="contained"
								sx={{
									background: 'red',
									mt: '2rem',
									background: 'darkgreen',
								}}
							>
								{loader ? (
									<CircularProgress
										size="20px"
										sx={{ color: 'white' }}
									/>
								) : (
									'Start'
								)}
							</Button>
						</Box>
					</Box>
					<Box
						className="box world"
						style={{ opacity: isplan || loading ? 0.4 : 1 }}
					>
						<h5
							style={{
								fontFamily: "'Open Sans', sans-serif",
								marginTop: '.5rem',
								color: 'purple',
							}}
						>
							World Class
						</h5>
						<Typography variant="body">
							In this World Class offering all functionalities to
							movies, enjoy this plan and packages ,view and add
							suggested movies
						</Typography>
						<div id="table">
							<div className="row">
								<div className="col-lg-6 col-md-8 col-sm-8">
									Add 1 Movie
								</div>
								<div className="col-lg-2 col-md-2 col-sm-2">
									&#x2713;
								</div>
							</div>

							<div className="row">
								<div className="col-lg-6 col-md-8 col-sm-8">
									Add 2 movies once{' '}
								</div>
								<div className="col-lg-2 col-md-2 col-sm-2">
									&#x2713;
								</div>
							</div>
							<div className="row">
								<div className="col-lg-6 col-md-8 col-sm-8">
									View Latest and Upcoming Movies{' '}
								</div>
								<div className="col-lg-2 col-md-2 col-sm-2">
									&times;
								</div>
							</div>

							<div className="row">
								<div className="col-lg-6 col-md-8 col-sm-8">
									Add Suggested and View Suggested Movies{' '}
								</div>
								<div className="col-lg-2 col-md-2 col-sm-2">
									&#x2713;
								</div>
							</div>
						</div>
						<Box
							sx={{
								display: 'flex',
								flexDirection: 'column',
								justifyContent: 'center',
								alignItems: 'center',
							}}
						>
							{' '}
							<input
								readOnly="readOnly"
								style={{ marginTop: '.7rem' }}
								type="text"
								onChange={handlePlan}
								value={plan.world}
								placeholder=" 800ksh/day"
							/>
							<Button
								onClick={world}
								variant="contained"
								sx={{
									background: 'red',
									mt: '2rem',
									background: 'purple',
								}}
							>
								{loader ? (
									<CircularProgress
										size="20px"
										sx={{ color: 'white' }}
									/>
								) : (
									'Start'
								)}
							</Button>
						</Box>
					</Box>
					<Box
						className="box premium"
						style={{ opacity: isplan || loading ? 0.4 : 1 }}
					>
						<h5
							style={{
								fontFamily: "'Open Sans', sans-serif",
								marginTop: '.5rem',
								color: 'red',
							}}
						>
							Premium
						</h5>
						<Typography
							variant="subtitle"
							sx={{ fontSize: '.8rem !important' }}
						>
							In this Premium plan all functionalities,movies and all
							updates are done in this plan.Enjoy all premium
							functions from our package,access latest movies from
							netflix ,hulu,HBO as soon as they are released
						</Typography>
						<div id="table" className="prem">
							<div className="row">
								<div className="col-lg-6 col-md-8 col-sm-8">
									Add 1 Movie
								</div>
								<div className="col-lg-2 col-md-2 col-sm-2">
									&#x2713;
								</div>
							</div>

							<div className="row">
								<div className="col-lg-6 col-md-8 col-sm-8">
									Add 2 movies once{' '}
								</div>
								<div className="col-lg-2 col-md-2 col-sm-2">
									&#x2713;
								</div>
							</div>
							<div className="row">
								<div className="col-lg-6 col-md-8 col-sm-8">
									View Latest and Upcoming Movies{' '}
								</div>
								<div className="col-lg-2 col-md-2 col-sm-2">
									&#x2713;
								</div>
							</div>
							<div className="row">
								<div className="col-lg-6 col-md-8 col-sm-8">
									Add Suggested and View Suggested Movies{' '}
								</div>
								<div className="col-lg-2 col-md-2 col-sm-2">
									&#x2713;
								</div>
							</div>
						</div>
						<Box
							sx={{
								display: 'flex',
								flexDirection: 'column',
								justifyContent: 'center',
								alignItems: 'center',
							}}
						>
							{' '}
							<input
								readOnly="readOnly"
								type="text"
								onChange={handlePlan}
								value={plan.premium}
								placeholder="2500ksh/month"
								style={{ fontSize: '.8rem', marginTop: '.7rem' }}
							/>
							<Button
								onClick={premium}
								variant="contained"
								sx={{
									background: 'red',
									mt: '2rem',
									fontSize: '.9rem',
								}}
							>
								{loader ? (
									<CircularProgress
										size="20px"
										sx={{ color: 'white' }}
									/>
								) : (
									'Start'
								)}
							</Button>
						</Box>
					</Box>
				</Stack>
				{loading && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{
							transform: 'scale(1)',
							opacity: 0.6,
							transition: { duration: 0.9 },
						}}
						className="loading"
					>
						<CircularProgress
							size="100px"
							sx={{ color: 'lightgrey', opacity: 0.3 }}
						/>
					</motion.div>
				)}
				{isplan && (
					<motion.div
						initial={{ transform: 'scale(0)', opacity: 0 }}
						animate={{
							transform: 'scale(1)',
							opacity: 0.7,
							transition: { duration: 0.6 },
						}}
						className="plan_success"
					>
						<Box>
							<span>
								Welcome {user?.result?.username} to{' '}
								<span style={{ color: 'yellow' }}> MovieHubz</span>
								,You
								<h2>{res}</h2> <h4>({userInfo})</h4>.You can always
								upgrade your plan when you click on user settings.
							</span>
							<h1>
								<span>SUCCESS</span>
								<Success
									sx={{
										fontSize: '1.7rem',
										color: 'rgb(245, 569, 352)',
									}}
								/>
							</h1>{' '}
							<Button
								variant="contained"
								color="primary"
								onClick={() => {
									navigate('/');
									main_dispatch({ type: HEADER_HIDE });
									window.location.reload();
								}}
							>
								OK
							</Button>
						</Box>
					</motion.div>
				)}
			</Box>
		</Container>
	);
};

export default ConfirmData;

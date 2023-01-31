import { useState, useRef, useEffect, useCallback } from 'react';
import {
	Stack,
	Box,
	Card,
	Button,
	Container,
	CircularProgress,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { adminLogin } from '../context/features/admin';
import { useMainContext } from '../context/contexts_/MainContext';
import Modal from '../components/Modal';
import VisibilityOn from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import '../css/auth.scss';
import profile from '../assets/profile.png';

function Login(props) {
	const {
		main_state: { ismodal, modalcontent, loading, success, error },
		main_dispatch,
	} = useMainContext();
	const [user, setUser] = useState({
		email: '',
		password: '',
	});
	const [passw, setPassw] = useState(false);
	const handleInput = (ev) => {
		const { value, name } = ev.target;
		setUser({ ...user, [name]: value });
	};
	const userdata = useRef();
	const navigate = useNavigate();
	const userinfo = JSON.parse(localStorage.getItem('profile'));
	const handleLogin = useCallback(
		(ev) => {
			ev.preventDefault();
			if (userdata?.current?.email && userdata?.current?.password) {
				if (
					userdata?.current?.email.length > 6 &&
					userdata?.current?.password.length > 6
				) {
					adminLogin(
						navigate,
						main_dispatch,
						loading,
						userdata,
						userinfo,
					);
				} else {
					main_dispatch({
						type: 'PASSWORDLENGTH',
						modalcontent:
							' Password should be at least 6 characters long',
					});
				}
			} else {
				main_dispatch({
					type: 'EMPTY',
					modalcontent: 'Cannot submit empty inputs',
				});
			}
		},
		[userdata?.current?.email, userdata?.current?.password],
	);
	const closemodal = () => {
		main_dispatch({ type: 'CLOSEMODAL' });
	};
	useEffect(() => {
		userdata.current = user;
	}, [user]);
	return (
		<Card
			className="auth_page"
			style={{ height: props.height || '' }}
		>
			<Container className="form__login">
				{ismodal && (
					<Modal
						closemodal={closemodal}
						modalcontent={modalcontent}
						success={success}
						error={error}
					/>
				)}
				<h2 style={{ fontWeight: 'bold' }} align="center">
					{' '}
					Sign In To Moviehubz
				</h2>
				<Box className="profile__pic">
					<img src={profile} alt="" />
				</Box>
				<form onSubmit={handleLogin}>
					<div className="form-group">
						<label htmlFor="email">Email</label>
						<input
							name="email"
							value={user.email}
							onChange={handleInput}
							type="text"
							className="form-control"
						/>
					</div>
					<div className="form-group">
						<label htmlFor="password">Password</label>
						<Box className="d-flex align-items-center">
							{' '}
							<input
								name="password"
								value={user.password}
								onChange={handleInput}
								type={!passw ? 'password' : 'text'}
								className="form-control"
							/>
							{!passw ? (
								<VisibilityOn
									sx={{ cursor: 'pointer', marginLeft: '.3rem' }}
									onClick={() => setPassw((prev) => !prev)}
								/>
							) : (
								<VisibilityOff
									sx={{ cursor: 'pointer', marginLeft: '.3rem' }}
									onClick={() => setPassw((prev) => !prev)}
								/>
							)}
						</Box>
					</div>

					<Button
						variant="outlined"
						className="login"
						color="secondary"
						type="submit"
					>
						{!loading ? (
							'Login'
						) : (
							<CircularProgress size="20px" sx={{ color: 'white' }} />
						)}{' '}
					</Button>
					<br />
					<Box className="d-flex flex-column foot">
						<span
							onClick={() => navigate('/register')}
							style={{
								cursor: 'pointer',
								color: 'yellow',
								marginBottom: '.5rem',
							}}
						>
							Don't have An Account?Sign Up
						</span>
						<span
							onClick={() => navigate('/')}
							style={{ cursor: 'pointer', color: 'greenyellow' }}
						>
							Get Started-Moviehubz
						</span>
					</Box>
				</form>
			</Container>
		</Card>
	);
}
export default Login;

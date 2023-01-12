import { useState, useRef, useEffect, useCallback } from 'react';
import { Stack, Card, Button, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { adminLogin } from '../context/features/admin';
import { useMainContext } from '../context/contexts_/MainContext';
import Modal from '../components/Modal';
import '../css/auth.css';

function Login(props) {
	const {
		main_state: { ismodal, modalcontent, loading, success, error },
		main_dispatch,
	} = useMainContext();
	const [user, setUser] = useState({
		username: '',
		password: '',
		confirmpassword: '',
	});

	const handleInput = (ev) => {
		const { value, name } = ev.target;
		setUser({ ...user, [name]: value });
	};
	const userdata = useRef();
	const navigate = useNavigate();
	const handleLogin = useCallback(
		(ev) => {
			ev.preventDefault();
			if (
				userdata?.current?.username &&
				userdata?.current?.password &&
				userdata?.current?.confirmpassword
			) {
				if (
					userdata?.current?.password ===
					userdata?.current?.confirmpassword
				) {
					if (
						userdata?.current?.username.length > 6 &&
						userdata?.current?.password.length > 6
					) {
						adminLogin(navigate, main_dispatch, loading, userdata);
					} else {
						main_dispatch({
							type: 'PASSWORDLENGTH',
							modalcontent:
								'Username or Password should be at least 6 characters long',
						});
					}
				} else {
					main_dispatch({
						type: 'WRONGPASSWORD',
						modalcontent: 'Both Passwords Should Match',
					});
				}
			} else {
				main_dispatch({
					type: 'EMPTY',
					modalcontent: 'Cannot submit empty inputs',
				});
			}
		},
		[userdata?.current?.username, userdata?.current?.password],
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
			<Container className="form">
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
					Sign In
				</h2>
				<form onSubmit={handleLogin}>
					<div className="form-group">
						<label htmlFor="email">Email</label>
						<input
							name="username"
							value={user.username}
							onChange={handleInput}
							type="text"
							className="form-control"
						/>
					</div>
					<div className="form-group">
						<label htmlFor="password">Password</label>
						<input
							name="password"
							value={user.password}
							onChange={handleInput}
							type="password"
							className="form-control"
						/>
					</div>
					<div className="form-group">
						<label htmlFor="confirmpassword">Confirm Password</label>
						<input
							name="confirmpassword"
							value={user.confirmpassword}
							onChange={handleInput}
							type="password"
							className="form-control"
						/>
					</div>
					<Button variant="outlined" color="secondary" type="submit">
						Login
					</Button>
					<br />
					<small
						onClick={() => navigate('/register')}
						style={{ cursor: 'pointer', color: 'blue' }}
					>
						Already have Account?Sign Up
					</small>
				</form>
			</Container>
		</Card>
	);
}
export default Login;

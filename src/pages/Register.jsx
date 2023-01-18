import { useState, useCallback, useRef, useEffect } from 'react';

import '../css/auth.scss';
import Modal from '../components/Modal';
import {
	Stack,
	Card,
	Button,
	Container,
	CircularProgress,
	Box,
} from '@mui/material';
import { useMainContext } from '../context/contexts_/MainContext';
import { useNavigate } from 'react-router-dom';
import { createAdmin } from '../context/features/admin';
import {
	WRONGPASSWORD,
	EMPTY,
	PASSWORDLENGTH,
	CLOSEMODAL,
} from '../context/action_type';
import VisibilityOn from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
function Register(props) {
	const {
		main_state: { ismodal, modalcontent, loading, success, error },
		main_dispatch,
	} = useMainContext();
	const navigate = useNavigate();
	const [user, setUser] = useState({
		firstname: '',
		lastname: '',
		company: '',
		phone: '',
		email: '',
		password: '',
		confirmpassword: '',
	});
	const [passw, setPassw] = useState(false);
	const handleInput = (ev) => {
		const { value, name } = ev.target;
		setUser({ ...user, [name]: value });
	};
	// Register admin
	const adminData = useRef();
	const handleSubmit = useCallback((ev) => {
		ev.preventDefault();
		if (
			adminData?.current.firstname &&
			adminData?.current.lastname &&
			adminData?.current.password &&
			adminData?.current.email &&
			adminData?.current.company &&
			adminData?.current.phone &&
			adminData?.current.confirmpassword
		) {
			if (adminData?.current?.password.length > 6) {
				console.log(adminData.current);
				createAdmin(navigate, main_dispatch, loading, adminData);
			} else {
				main_dispatch({
					type: PASSWORDLENGTH,
					modalcontent:
						'Username or Password should be at least 6 characters long',
				});
			}
		} else {
			console.log(adminData.current);
			main_dispatch({
				type: EMPTY,
				modalcontent: 'Cannot submit empty inputs',
			});
		}
	}, []);
	const closemodal = () => {
		main_dispatch({ type: CLOSEMODAL });
	};
	useEffect(() => {
		adminData.current = user;
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
				<h3 style={{ fontWeight: 'bold' }} align="center">
					Sign Up To Moviehubz
				</h3>
				<form>
					<div className="form-group">
						<label htmlFor="firstname">Firstname</label>
						<input
							autoComplete="off"
							name="firstname"
							value={user.firstname}
							onChange={handleInput}
							type="text"
							className="form-control"
						/>
					</div>
					<div className="form-group">
						<label htmlFor="lastname">Lastname</label>
						<input
							autoComplete="off"
							name="lastname"
							value={user.lastname}
							onChange={handleInput}
							type="text"
							className="form-control"
						/>
					</div>
					<div className="form-group">
						<label htmlFor="email">Email</label>
						<input
							autoComplete="off"
							name="email"
							value={user.email}
							onChange={handleInput}
							type="text"
							className="form-control"
						/>
					</div>
					<div className="form-group">
						<label htmlFor="company">Company Name</label>
						<input
							autoComplete="off"
							name="company"
							value={user.company}
							onChange={handleInput}
							type="text"
							className="form-control"
						/>
					</div>
					<div className="form-group">
						<label htmlFor="company">Phone Number</label>
						<input
							autoComplete="off"
							name="phone"
							value={user.phone}
							onChange={handleInput}
							type="text"
							className="form-control"
						/>
					</div>
					<div className="form-group">
						<label htmlFor="confirmpassword"> Password</label>
						<input
							autoComplete="off"
							name="password"
							value={user.password}
							onChange={handleInput}
							type={!passw ? 'password' : 'text'}
							className="form-control"
						/>
					</div>
					<div className="form-group">
						<label htmlFor="email">Confirm Password</label>
						<Box className="d-flex align-items-center">
							{' '}
							<input
								autoComplete="off"
								name="confirmpassword"
								value={user.confirmpassword}
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
						color="secondary"
						onClick={handleSubmit}
					>
						{!loading ? (
							'Register'
						) : (
							<CircularProgress size="20px" sx={{ color: 'white' }} />
						)}{' '}
					</Button>
					<br />
					<Box className="d-flex flex-column foot">
						<span
							onClick={() => navigate('/login')}
							style={{
								cursor: 'pointer',
								color: 'yellow',
								marginBottom: '.5rem',
							}}
						>
							Already have Account?Sign in
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
export default Register;

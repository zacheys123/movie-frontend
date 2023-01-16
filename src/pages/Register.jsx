import { useState, useCallback, useRef, useEffect } from 'react';

import '../css/auth.scss';
import Modal from '../components/Modal';
import {
	Stack,
	Card,
	Button,
	Container,
	CircularProgress,
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
	});

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
			adminData?.current.phone
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
				<h2 style={{ fontWeight: 'bold' }} align="center">
					Sign Up
				</h2>
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
						<label htmlFor="email">Password</label>
						<input
							autoComplete="off"
							name="password"
							value={user.password}
							onChange={handleInput}
							type="password"
							className="form-control"
						/>
					</div>

					<Button
						variant="outlined"
						color="secondary"
						onClick={handleSubmit}
					>
						{!loading ? (
							'Register'
						) : (
							<CircularProgress
								size="20px"
								sx={{ color: 'purple' }}
							/>
						)}{' '}
					</Button>
					<br />
					<small
						onClick={() => navigate('/login')}
						style={{ cursor: 'pointer', color: 'blue' }}
					>
						Already have Account?Sign in
					</small>
				</form>
			</Container>
		</Card>
	);
}
export default Register;

import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { Button, CircularProgress } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useMainContext } from '../context/contexts_/MainContext';
import { LOADING } from '../context/action_type';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Email = ({ user }) => {
	const form = useRef();
	const {
		main_state: { loading },
		main_dispatch,
	} = useMainContext();
	const [message, setMessage] = useState('');
	const [email, setEmail] = useState(user?.result?.email);
	const [username, setName] = useState(user?.result?.username);
	const sendEmail = async (e) => {
		e.preventDefault();
		if (email && username && message) {
			const result = await emailjs.sendForm(
				process.env.REACT_APP_SERVICE,
				process.env.REACT_APP_TEMPLATE,
				form.current,
				process.env.REACT_APP_PUBLIC,
			);
			try {
				setTimeout(() => {
					main_dispatch({ type: LOADING });
					toast.info('Email sent Successsfully', {
						position: 'top-right',
						autoClose: 5000,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						progress: undefined,
						theme: 'light',
					});
					setMessage('');
				}, 2000);
				console.log(result);
				main_dispatch({ type: LOADING });
			} catch (error) {
				console.log(error);
			}
		} else {
			alert('Cannot submit empty inputs');
		}
	};

	return (
		<form className="formd" onSubmit={sendEmail} ref={form}>
			<div className="form-group">
				<input
					type="text"
					name="username"
					readOnly="readonly"
					value={username}
					onChange={(ev) => setName(ev.target.value)}
				/>
				<input
					type="text"
					readOnly="readonly"
					name="email"
					value={email}
					onChange={(ev) => setEmail(ev.target.value)}
				/>
			</div>
			<input
				type="text"
				placeholder="leave a comment"
				name="message"
				value={message}
				onChange={(ev) => setMessage(ev.target.value)}
			/>
			<Button size="small" variant="contained" type="submit">
				{!loading ? (
					<>
						Send
						<SendIcon
							sx={{ marginLeft: '.5rem', fontSize: '.8rem' }}
						/>
					</>
				) : (
					<CircularProgress size="20px" sx={{ color: 'white' }} />
				)}
			</Button>
			<ToastContainer />
		</form>
	);
};
export default Email;

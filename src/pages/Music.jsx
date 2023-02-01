import { useState, useCallback, useRef, useEffect } from 'react';
import { Form, Label } from 'react-bootstrap';
import { Button, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useMainContext } from '../context/contexts_/MainContext';
import { useMovieContext } from '../context/contexts_/MovieContext';

import Modal from '../components/Modal';
import axios from 'axios';
import { createMusic } from '../context/features/movieSlice';
import {
	MUSICRECORD,
	CLOSEMODAL,
	EMPTYHOME,
} from '../context/action_type';
const Music = ({ user }) => {
	const {
		main_state: { istheme, profile },
		main_dispatch,
	} = useMainContext();
	const {
		movie_state: {
			loading,
			success,
			modalcontent,
			error,
			ismodalhome,
		},
		movie_dispatch,
	} = useMovieContext();
	const [mymusic, setMusic] = useState({
		user: 'Admin',
		song_name: '',
		music_type: '',
		amount: '',
		paid: '',
	});
	// input function
	const handleChange = (ev) => {
		const { name, value } = ev.target;
		setMusic({ ...mymusic, [name]: value });
	};

	//* create movies for this user function
	const navigate = useNavigate();

	const [myid, setId] = useState(() => {
		const storedvalues = localStorage.getItem('profile');
		if (!storedvalues) return {};
		return JSON.parse(storedvalues);
	});
	const id = myid?.result?._id;
	const musicref = useRef();

	const create_music = useCallback(
		(ev) => {
			ev.preventDefault();

			const music_data = { userId: id, mymusic };
			console.log(mymusic);

			createMusic(music_data, movie_dispatch);
		},
		[mymusic],
	);

	const closemodal = () => {
		movie_dispatch({ type: CLOSEMODAL });
	};
	useEffect(() => {
		musicref.current = mymusic;
	}, []);
	const users = user?.result?.users;
	return (
		<div>
			<Form className="music" onSubmit={create_music}>
				{ismodalhome && (
					<Modal
						error={error}
						success={success}
						modalcontent={modalcontent}
						closemodal={closemodal}
					/>
				)}
				<div className="row">
					<div className="col-md-12 select mx-2">
						<Form.Select
							size="sm"
							name="user"
							value={mymusic.user || ''}
							onChange={handleChange}
						>
							{users &&
								users.map((data) => {
									return (
										<option
											key={data._id}
											value={data.username || 'New User'}
										>
											{data.username}
										</option>
									);
								})}
						</Form.Select>
					</div>
				</div>

				<div className="row">
					{' '}
					<div className="col-md-12 select mt-4 mx-2">
						{' '}
						<Form.Select
							size="sm"
							name="music_type"
							value={mymusic.music_type || ''}
							onChange={handleChange}
						>
							<option>Choose Type</option>{' '}
							<option value="single">Single</option>{' '}
							<option value="mix">Mix</option>{' '}
						</Form.Select>
					</div>
				</div>
				<div className="row">
					<Form.Group className="row movie">
						<div className="col">
							<Form.Control
								value={mymusic.amount || ''}
								onChange={handleChange}
								className="form__inputs mx-2"
								type="number"
								name="amount"
								placeholder="Enter Amount"
							/>
						</div>
						<div className="col">
							<Form.Control
								value={mymusic.paid || ''}
								onChange={handleChange}
								className="form__inputs mx-2"
								type="number"
								name="paid"
								placeholder="Enter Amount Paid"
							/>
						</div>
					</Form.Group>
				</div>
				<div className="row">
					<Form.Group className="row movie">
						<div className="col">
							<Form.Control
								value={mymusic.song_name || ''}
								onChange={handleChange}
								className="form__inputs mx-2"
								type="text"
								name="song_name"
								placeholder="Enter Song/Mix e.g Gods plan,Mwana,Nimeuona(optional) "
							/>
						</div>
					</Form.Group>
				</div>

				<Button variant="contained" type="submit">
					{!loading ? (
						'Enter Music'
					) : (
						<CircularProgress size="20px" sx={{ color: 'white' }} />
					)}
				</Button>
			</Form>
		</div>
	);
};

export default Music;

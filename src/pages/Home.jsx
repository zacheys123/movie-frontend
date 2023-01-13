import { useState, useEffect, useRef, useCallback } from 'react';
import '../css/Feed.scss';
import { Form, Label } from 'react-bootstrap';
import { Box, Button } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { GENRE, EMPTY, CLOSEMODAL } from '../context/action_type';
import { useMainContext } from '../context/contexts_/MainContext';
import { useMovieContext } from '../context/contexts_/MovieContext';
import Modal from '../components/Modal';
import axios from 'axios';
import { createMovie } from '../context/features/movieSlice';
import { MOVIES } from '../context/action_type';
import { motion } from 'framer-motion';
const Feed = () => {
	const [admin_id, setId] = useState(null);
	const [movie, setMovie] = useState({
		user: '',
		movie_name: '',
		season: '',
		episodes: '',
		customer_name: '',
		genre: '',
		amount: '',
		paid: '',
	});

	const movieref = useRef();
	const {
		main_state: { istheme, admin },
		main_dispatch,
	} = useMainContext();
	const {
		movie_state: {
			isgenre,
			movies,
			ismodal,
			success,
			error,
			modalcontent,
			loading,
		},
		movie_dispatch,
	} = useMovieContext();
	// input function
	const handleChange = (ev) => {
		const { name, value } = ev.target;
		setMovie({ ...movie, [name]: value });
	};
	useEffect(() => {
		movieref.current = movie;
	}, [movieref]);

	//* create movies for this user function
	const id = admin_id?.result?._id;
	const createMovies = useCallback((ev) => {
		ev.preventDefault();

		const mymovie = { userId: id, movieref };
		console.log(mymovie);

		createMovie(mymovie, movie_dispatch, success, setMovie);
	}, []);
	const closemodal = () => {
		movie_dispatch({ type: CLOSEMODAL });
	};

	// getting all games for this user
	const getMovie = async (source) => {
		try {
			let response = await axios.get(
				`http://localhost:4000/movie/${id}`,
				{
					cancelToken: source.token,
				},
			);

			movie_dispatch({
				type: MOVIES,
				payload: { movies: response?.data?.result?.movies },
			});
			console.log(movies);
		} catch (error) {
			console.log(error.message);
		}
	};
	useEffect(() => {
		const source = axios.CancelToken.source();
		getMovie(source);
		setId(() => JSON.parse(window.localStorage.getItem('profile')));
		return () => {
			source.cancel();
		};
	}, []);
	return (
		<div className="feed">
			<Box className="feed__movies">
				<Form onSubmit={createMovies} className="formd">
					{ismodal ? (
						<Modal
							modalcontent={modalcontent}
							closemodal={closemodal}
							error={error}
							success={success}
						/>
					) : (
						<h4 className="h4">New Movie Entry!!</h4>
					)}

					<div className="row">
						<div className="col-md-12 select mx-2">
							<Form.Select
								size="sm"
								name="user"
								value={movie.user}
								onChange={handleChange}
							>
								<option value="admin">admin</option>
							</Form.Select>
						</div>
						<Form.Group className="row movie">
							<div className="col">
								<Form.Control
									value={movie.movie_name}
									onChange={handleChange}
									className="form__inputs mx-2"
									type="text"
									name="movie_name"
									placeholder="Enter movie"
								/>
							</div>
							<div className="col">
								<Form.Control
									value={movie.season}
									onChange={handleChange}
									className="form__inputs mx-2"
									type="text"
									name="season"
									placeholder="Enter season "
								/>
							</div>
						</Form.Group>
						<Form.Group className="row movie">
							<div className="col">
								<Form.Control
									className="form__inputs mx-2"
									value={movie.episodes}
									onChange={handleChange}
									type="text"
									name="episodes"
									placeholder="Number of Episodes"
								/>
							</div>
							<div className="col">
								<Form.Control
									className="form__inputs mx-2"
									value={movie.customer}
									onChange={handleChange}
									type="text"
									name="customer_name"
									placeholder="Enter customer name"
								/>
							</div>
						</Form.Group>
						<Form.Group className="movie">
							<div className="col">
								<div className="col mx-3 genres">
									<Button
										onClick={() =>
											movie_dispatch({ type: GENRE, isgenre })
										}
										variant="contained"
									>
										<span className="genre">
											<span>Genre </span>
											{!isgenre ? (
												<KeyboardArrowDownIcon />
											) : (
												<KeyboardArrowUpIcon />
											)}
										</span>
									</Button>
								</div>
								<div className="col ">
									<Form.Control
										disabled
										className="form__inputs"
										value={movie.genre}
										type="text"
										onChange={handleChange}
										name="genre"
									/>
								</div>
							</div>
						</Form.Group>

						<div className="row amount1">
							<div className="col amount">
								<Form.Label htmlFor="amount">
									Amount Owed:{' '}
								</Form.Label>
								&nbsp;
								<Form.Control
									className="form__inputs"
									type="number"
									name="amount"
									value={movie.amount}
									onChange={handleChange}
									placeholder=""
								/>
							</div>
						</div>
						<div className="amount1">
							<div className="col amount">
								<Form.Label htmlFor="amountpaid">
									AmountPaid:{' '}
								</Form.Label>
								&nbsp;&nbsp;&nbsp;&nbsp;
								<Form.Control
									name="paid"
									value={movie.paid}
									onChange={handleChange}
									className="form__inputs"
									type="number"
								/>
							</div>
						</div>
					</div>
					<Button
						type="submit"
						variant="outlined"
						className="submit"
						color="secondary"
					>
						Entry Movie
					</Button>
					{isgenre && (
						<Box className="genre__list">
							<div className="row">
								<div className="col">
									<p></p>
									<p
										onClick={() =>
											setMovie((prev) => {
												return { ...prev, genre: 'Action' };
											})
										}
									>
										Action
									</p>
									<p
										onClick={() =>
											setMovie((prev) => {
												return { ...prev, genre: 'Anime' };
											})
										}
									>
										Anime
									</p>
									<p
										onClick={() =>
											setMovie((prev) => {
												return { ...prev, genre: 'Children' };
											})
										}
									>
										Children & Family
									</p>
									<p
										onClick={() =>
											setMovie((prev) => {
												return { ...prev, genre: 'Classic' };
											})
										}
									>
										Classics
									</p>
									<p
										onClick={() =>
											setMovie((prev) => {
												return { ...prev, genre: 'Comedies' };
											})
										}
									>
										Comedies
									</p>
									<p
										onClick={() =>
											setMovie((prev) => {
												return { ...prev, genre: 'Drama' };
											})
										}
									>
										Drama
									</p>
								</div>
								<div className="col">
									<p></p>
									<p
										onClick={() =>
											setMovie((prev) => {
												return { ...prev, genre: 'Hollywood' };
											})
										}
									>
										HollyWood
									</p>
									<p
										onClick={() =>
											setMovie((prev) => {
												return { ...prev, genre: 'Horror' };
											})
										}
									>
										Horror
									</p>
									<p
										onClick={() =>
											setMovie((prev) => {
												return { ...prev, genre: 'Independent' };
											})
										}
									>
										Independent
									</p>
									<p
										onClick={() =>
											setMovie((prev) => {
												return { ...prev, genre: 'Indian' };
											})
										}
									>
										Indian
									</p>
									<p
										onClick={() =>
											setMovie((prev) => {
												return { ...prev, genre: 'Kenyan' };
											})
										}
									>
										Kenyan
									</p>
									<p
										onClick={() =>
											setMovie((prev) => {
												return { ...prev, genre: 'Nollywood' };
											})
										}
									>
										NollyWood
									</p>
								</div>
								<div className="col">
									<p></p>
									<p
										onClick={() =>
											setMovie((prev) => {
												return { ...prev, genre: 'Romance' };
											})
										}
									>
										Romance
									</p>
									<p
										onClick={() =>
											setMovie((prev) => {
												return { ...prev, genre: 'Scifi' };
											})
										}
									>
										Scifi
									</p>

									<p
										onClick={() =>
											setMovie((prev) => {
												return { ...prev, genre: 'Sports' };
											})
										}
									>
										Sporty
									</p>
									<p
										onClick={() =>
											setMovie((prev) => {
												return { ...prev, genre: 'Fantasy' };
											})
										}
									>
										Fantasy
									</p>
									<p
										onClick={() =>
											setMovie((prev) => {
												return { ...prev, genre: 'Thriller' };
											})
										}
									>
										Thriller
									</p>
									<p
										onClick={() =>
											setMovie((prev) => {
												return { ...prev, genre: 'Dramedy' };
											})
										}
									>
										Dramedy
									</p>
								</div>
							</div>
						</Box>
					)}
				</Form>
				<Box className="movie__list">
					<h4 className="h4">All Movies (Today)</h4>
					<input type="text" placeholder="Search movie.." />
					<Box className="listing">
						<table className="table table-bordered table-striped my-2 ">
							<thead>
								<tr>
									<th>User</th>
									<th>Movie</th>
									<th>Ssn</th>
									<th>Eps</th>
									<th>Genre</th>
									<th>Customer</th>
									<th>Amount</th>
									<th>Paid</th>
									<th>Balance</th>
								</tr>
							</thead>
							<tbody>
								{movies &&
									movies.map(
										({
											_id,
											user,
											season,
											episodes,
											amount,
											paid,
											genre,
											customer_name,
											movie_name,
										}) => {
											return (
												<tr key={_id}>
													<td>{user}</td>
													<td>{movie_name}</td>
													<td>{season}</td>
													<td>{episodes}</td>
													<td>{genre}</td>
													<td>{customer_name}</td>
													<td>{amount}</td>
													<td>{paid}</td>

													<td>{parseFloat(amount - paid)}</td>
												</tr>
											);
										},
									)}
							</tbody>
						</table>
					</Box>
				</Box>
			</Box>
		</div>
	);
};
export default Feed;

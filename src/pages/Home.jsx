import { useState, useEffect, useRef, useCallback } from 'react';
import '../css/Feed.scss';
import { Form, Label } from 'react-bootstrap';
import { Box, Button } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Table from '@mui/icons-material/TableView';
import Refresh from '@mui/icons-material/Refresh';
import {
	GENRE,
	EMPTY,
	CLOSEMODAL,
	EMPTYHOME,
	LOGGED,
} from '../context/action_type';
import NoCellIcon from '@mui/icons-material/NoCell';
import { useMainContext } from '../context/contexts_/MainContext';
import { useMovieContext } from '../context/contexts_/MovieContext';
import {
	useParams,
	useNavigate,
	UNSAFE_DataRouterStateContext,
} from 'react-router-dom';
import Modal from '../components/Modal';
import axios from 'axios';
import { createMovie } from '../context/features/movieSlice';
import { MOVIES } from '../context/action_type';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
const Feed = () => {
	// fetch movies

	const [showtable, setShowtable] = useState(false);
	const movieref = useRef();
	const [movie, setMovie] = useState({
		user: 'Admin',
		movie_name: '',
		season: '',
		episodes: '',
		customer_name: '',
		genre: '',
		amount: '',
		paid: '',
	});

	const {
		main_state: { istheme, admin, user },
		main_dispatch,
	} = useMainContext();
	const {
		movie_state: {
			isgenre,
			movies,
			ismodalhome,
			loading,
			success,
			error,
			modalcontent,
			logged,
		},
		movie_dispatch,
	} = useMovieContext();
	// input function
	const handleChange = (ev) => {
		const { name, value } = ev.target;
		setMovie({ ...movie, [name]: value });
	};

	//* create movies for this user function
	const navigate = useNavigate();
	const users = user?.result?.users;

	const createMovies = useCallback(
		(ev) => {
			ev.preventDefault();

			if (
				movie.user &&
				movie.movie_name &&
				movie.paid &&
				movie.genre &&
				movie.amount
			) {
				const mymovie = { userId: admin?.result?._id, movie };
				console.log(movie);

				createMovie(mymovie, movie_dispatch, success, navigate);
				movie_dispatch({ type: LOGGED, logged });
			} else {
				console.log(movie);
				movie_dispatch({
					type: EMPTYHOME,
					modalcontent: 'Cannot submit empty inputs',
				});
			}
		},
		[movie],
	);

	const closemodal = () => {
		movie_dispatch({ type: CLOSEMODAL });
	};

	// getting all movies for this user
	const getMovie = async (source) => {
		try {
			movie_dispatch({
				type: MOVIES,
				payload: { movies: user?.result?.movies },
			});
		} catch (error) {
			console.log(error.message);
		}
	};

	useEffect(() => {
		getMovie();
	}, [ismodalhome, logged, movieref]);
	const [searchquery, setQuery] = useState('');

	const moviefunc = () => {
		let sortedvalue = movies;
		if (searchquery) {
			sortedvalue = sortedvalue.filter((movie) => {
				if (
					movie.user.toLowerCase().includes(searchquery) ||
					movie.movie_name.toLowerCase().includes(searchquery) ||
					movie.customer_name.toLowerCase().includes(searchquery) ||
					movie.genre.toLowerCase().includes(searchquery)
					// movie.created_at.toLowerCase().includes(searchquery)
				) {
					return sortedvalue;
				}
			});
		}
		return sortedvalue;
	};

	return (
		<div className="feed">
			<Box className="feed__movies">
				<Form onSubmit={createMovies} className="formd">
					{ismodalhome ? (
						<Modal
							modalcontent={modalcontent}
							closemodal={closemodal}
							error={error}
							success={success}
						/>
					) : (
						<Box className="d-flex justify-content-between align-items-center">
							{!showtable ? (
								<h4 className="h4">New Movie Entry!!</h4>
							) : (
								''
							)}
							{!showtable && (
								<Box className="tabular">
									<Table
										onClick={() => setShowtable((prev) => !prev)}
									/>
									<span onClick={() => setShowtable((prev) => !prev)}>
										View Movies
									</span>
								</Box>
							)}
						</Box>
					)}

					<div className="row">
						<div className="col-md-12 select mx-2">
							<Form.Select
								size="sm"
								name="user"
								value={movie.user}
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
									value={movie.customer_name}
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
						{loading ? 'Adding Movie...' : 'Entry Movie'}
					</Button>
					{isgenre && (
						<Box className="genre__list">
							<div className="row">
								<div className="col">
									<p></p>
									<p
										onClick={() => {
											movie_dispatch({ type: GENRE, isgenre });
											setMovie((prev) => {
												return { ...prev, genre: 'Action' };
											});
										}}
									>
										Action
									</p>
									<p
										onClick={() => {
											movie_dispatch({ type: GENRE, isgenre });
											setMovie((prev) => {
												return { ...prev, genre: 'Anime' };
											});
										}}
									>
										Anime
									</p>
									<p
										onClick={() => {
											movie_dispatch({ type: GENRE, isgenre });
											setMovie((prev) => {
												return { ...prev, genre: 'Children' };
											});
										}}
									>
										Children & Family
									</p>
									<p
										onClick={() => {
											movie_dispatch({ type: GENRE, isgenre });
											setMovie((prev) => {
												return { ...prev, genre: 'Classic' };
											});
										}}
									>
										Classics
									</p>
									<p
										onClick={() => {
											movie_dispatch({ type: GENRE, isgenre });
											setMovie((prev) => {
												return { ...prev, genre: 'Comedies' };
											});
										}}
									>
										Comedies
									</p>
									<p
										onClick={() => {
											movie_dispatch({ type: GENRE, isgenre });
											setMovie((prev) => {
												return { ...prev, genre: 'Drama' };
											});
										}}
									>
										Drama
									</p>
								</div>
								<div className="col">
									<p></p>
									<p
										onClick={() => {
											movie_dispatch({ type: GENRE, isgenre });
											setMovie((prev) => {
												return { ...prev, genre: 'Hollywood' };
											});
										}}
									>
										HollyWood
									</p>
									<p
										onClick={() => {
											movie_dispatch({ type: GENRE, isgenre });
											setMovie((prev) => {
												return { ...prev, genre: 'Horror' };
											});
										}}
									>
										Horror
									</p>
									<p
										onClick={() => {
											movie_dispatch({ type: GENRE, isgenre });
											setMovie((prev) => {
												return { ...prev, genre: 'Independent' };
											});
										}}
									>
										Independent
									</p>
									<p
										onClick={() => {
											movie_dispatch({ type: GENRE, isgenre });
											setMovie((prev) => {
												return { ...prev, genre: 'Indian' };
											});
										}}
									>
										Indian
									</p>
									<p
										onClick={() => {
											movie_dispatch({ type: GENRE, isgenre });
											setMovie((prev) => {
												return { ...prev, genre: 'Kenyan' };
											});
										}}
									>
										Kenyan
									</p>
									<p
										onClick={() => {
											movie_dispatch({ type: GENRE, isgenre });
											setMovie((prev) => {
												return { ...prev, genre: 'Nollywood' };
											});
										}}
									>
										NollyWood
									</p>
								</div>
								<div className="col">
									<p></p>
									<p
										onClick={() => {
											movie_dispatch({ type: GENRE, isgenre });
											setMovie((prev) => {
												return { ...prev, genre: 'Romance' };
											});
										}}
									>
										Romance
									</p>
									<p
										onClick={() => {
											movie_dispatch({ type: GENRE, isgenre });
											setMovie((prev) => {
												return { ...prev, genre: 'Scifi' };
											});
										}}
									>
										Scifi
									</p>

									<p
										onClick={() => {
											movie_dispatch({ type: GENRE, isgenre });
											setMovie((prev) => {
												return { ...prev, genre: 'Sports' };
											});
										}}
									>
										Sporty
									</p>
									<p
										onClick={() => {
											movie_dispatch({ type: GENRE, isgenre });
											setMovie((prev) => {
												return { ...prev, genre: 'Fantasy' };
											});
										}}
									>
										Fantasy
									</p>
									<p
										onClick={() => {
											movie_dispatch({ type: GENRE, isgenre });
											setMovie((prev) => {
												return { ...prev, genre: 'Thriller' };
											});
										}}
									>
										Thriller
									</p>
									<p
										onClick={() => {
											movie_dispatch({ type: GENRE, isgenre });
											setMovie((prev) => {
												return { ...prev, genre: 'Dramedy' };
											});
										}}
									>
										Dramedy
									</p>
									<p
										onClick={() => {
											movie_dispatch({ type: GENRE, isgenre });
											setMovie((prev) => {
												return { ...prev, genre: 'Dramedy' };
											});
										}}
									>
										Medical
									</p>
								</div>
							</div>
						</Box>
					)}
				</Form>
				<Box
					className={!showtable ? 'movie__list' : 'movie__listphone'}
				>
					<Box
						className="d-flex justify-content-around movie__head"
						style={{ borderBottom: '1px solid lightgrey' }}
					>
						{' '}
						<h4 className="h4">All Movies </h4>
						{showtable && (
							<Box
								className="tabular text-secondary"
								sx={{ fontSize: '.7rem', cursor: 'pointer' }}
							>
								<NoCellIcon
									onClick={() => setShowtable((prev) => !prev)}
								/>
								<span onClick={() => setShowtable((prev) => !prev)}>
									&nbsp;&nbsp;Exit View
								</span>
							</Box>
						)}
						<Box
							sx={{
								cursor: 'pointer',
							}}
							className="span"
						>
							<Refresh
								sx={{
									fontSize: '1.4rem !important',
									color: 'green !important',
									fontWeight: 'bolder !important',
									cursor: 'pointer',
								}}
								onClick={() => {
									movie_dispatch({
										type: 'REFRESH',
										logged,
									});
								}}
							/>{' '}
							<span style={{ color: 'red', cursor: 'pointer' }}>
								refresh
							</span>
						</Box>
					</Box>

					<input
						type="text"
						placeholder="Search movie.."
						value={searchquery}
						onChange={(ev) => setQuery(ev.target.value)}
					/>

					<Box className="listing">
						<table className="table table-bordered table-striped my-2 bg-dark">
							<thead>
								<tr>
									<th>User</th>
									<th>Movie</th>
									<th>Ssn</th>
									<th>Eps</th>
									<th>Genre</th>
									<th>Cust</th>
									<th>Amt</th>
									<th>Paid</th>
									<th>Bal</th>
								</tr>
							</thead>
							<tbody>
								{movies &&
									moviefunc().map(
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
													<td
														style={{
															color: 'cyan',
															fontWeight: '400',
														}}
													>
														{user}
													</td>
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

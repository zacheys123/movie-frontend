import { useState, useEffect, useRef } from 'react';
import '../css/Feed.scss';
import { Input, Form, Label } from 'react-bootstrap';
import { Box, Button } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { GENRE } from '../context/action_type';
import { useMainContext } from '../context/contexts_/MainContext';
import { useMovieContext } from '../context/contexts_/MovieContext';
const Feed = () => {
	const [genre, setGenre] = useState();
	const [movie, setMovie] = useState({});
	const movieref = useRef();
	const {
		main_state: { istheme },
		main_dispatch,
	} = useMainContext();
	const {
		movie_state: { isgenre },
		movie_dispatch,
	} = useMovieContext();

	return (
		<div className="feed">
			<Box className="feed__movies">
				<Form action="" className="formd">
					<h4 className="h4">New Movie Entry!!</h4>
					<div className="row">
						<div className="col-md-12 select mx-2">
							<Form.Select size="sm">
								<option>Choose User</option>
								<option value=""></option>
								<option value=""></option>
							</Form.Select>
						</div>
						<Form.Group className="row movie">
							<div className="col">
								<Form.Control
									className="form__inputs mx-2"
									type="text"
									placeholder="Enter movie"
								/>
							</div>
							<div className="col">
								<Form.Control
									className="form__inputs mx-2"
									type="text"
									placeholder="Enter season "
								/>
							</div>
						</Form.Group>
						<Form.Group className="row movie">
							<div className="col">
								<Form.Control
									className="form__inputs mx-2"
									type="text"
									placeholder="Number of Episodes"
								/>
							</div>
							<div className="col">
								<Form.Control
									className="form__inputs mx-2"
									type="text"
									placeholder="Enter customer name"
								/>
							</div>
						</Form.Group>
						<Form.Group className="movie">
							<div className="col">
								<Form.Control
									className="form__input mx-2"
									type="number"
									placeholder="Enter customer name"
								/>
								<div className="col mx-3 genres">
									<Button variant="contained">
										<span className="genre">
											<span>Genre </span>
											{!isgenre ? (
												<KeyboardArrowDownIcon
													onClick={() =>
														movie_dispatch({ type: GENRE, isgenre })
													}
												/>
											) : (
												<KeyboardArrowUpIcon
													onClick={() =>
														movie_dispatch({ type: GENRE, isgenre })
													}
												/>
											)}
										</span>
									</Button>
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
									className="form__inputs"
									type="number"
								/>
							</div>
						</div>
					</div>
					<Button variant="outlined" className="" color="secondary">
						Entry Movie
					</Button>
					{isgenre && (
						<Box className="genre__list">
							<div className="row">
								<div className="col">
									<p></p>
									<p>Action</p>
									<p>Anime</p>
									<p>Children & Family</p>
									<p>Classics</p>
									<p>Commedies</p>
									<p>Drama</p>
									<p>Fantasy</p>
								</div>
								<div className="col">
									<p></p>
									<p>HollyWood</p>
									<p>Horror</p>
									<p>Independent</p>
									<p>Indian</p>
									<p>Kenyan</p>
									<p>NollyWood</p>
								</div>
								<div className="col">
									<p></p>
									<p>Romance</p>
									<p>Scifi</p>
									<p>Shorts</p>
									<p>Sporty</p>
									<p>Stand Up Comedy</p>
									<p>Thriller</p>
								</div>
							</div>
						</Box>
					)}
				</Form>
				<Box className="movie__list">
					<h4 className="h4">All Movies</h4>
					<input type="text" placeholder="search movie" />
				</Box>
			</Box>
		</div>
	);
};
export default Feed;

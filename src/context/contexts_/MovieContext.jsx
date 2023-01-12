import { useContext, useReducer } from 'react';
import { moviereducer } from '../reducers/movie';
import { MovieProvider } from '../config';
import { initialState } from '../reducers/movie';
const MovieContext = ({ children }) => {
	const [movie_state, movie_dispatch] = useReducer(
		moviereducer,
		initialState,
	);
	let value = { movie_state, movie_dispatch };
	return (
		<MovieProvider.Provider value={value}>
			{children}
		</MovieProvider.Provider>
	);
};

export default MovieContext;

export const useMovieContext = () => {
	const context = useContext(MovieProvider);
	if (!context) {
		throw new Error('UseMainContext can only be used in children');
	}
	return context;
};

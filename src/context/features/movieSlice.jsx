import axios from 'axios';

import { CREATEMOVIE, ERROR, LOADING } from '../action_type';
export const createMovie = async (
	data,
	dispatch,
	success,
	setMovie,
) => {
	const { userId, movieref } = data;
	try {
		let response = await axios.put(
			`http://localhost:4000/movie/create/${userId}`,
			movieref.current,
		);
		setTimeout(() => {
			dispatch({
				type: CREATEMOVIE,
				payload: {
					modalcontent: response?.data?.message,
					success,
				},
			});
			dispatch({
				type: LOADING,
			});
			setMovie({});
		}, 2000);
		dispatch({
			type: LOADING,
		});
	} catch (error) {
		console.log(error.message);
		dispatch({
			type: LOADING,
		});
	}
};

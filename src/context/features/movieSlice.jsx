import axios from 'axios';

import {
	CREATEMOVIE,
	ERRORADD,
	ERROR,
	LOADING,
	NEWUSER,
} from '../action_type';
const baseUrl = 'https://moviebackendz.onrender.com';
export const createMovie = async (
	datah,
	dispatch,
	success,
	navigate,
) => {
	const { userId, movie } = datah;

	try {
		let response = await axios.put(
			`${baseUrl}/movie/create/${userId}`,
			movie,
		);

		setTimeout(() => {
			dispatch({
				type: LOADING,
			});
			dispatch({
				type: CREATEMOVIE,
				payload: {
					modalcontent: response?.data,
				},
			});
		}, 2000);
		dispatch({
			type: LOADING,
		});
	} catch (error) {
		console.log(error.message);
		dispatch({
			type: LOADING,
		});
		dispatch({
			type: ERROR,
			payload: {
				modalcontent: error?.response?.data?.message,
			},
		});
	}
};

// adding new user for movies
export const addUser = async (
	user,
	dispatch,
	success,
	setForm,
	ismodal,
) => {
	const { userId, newuser } = user;
	console.log(user);
	try {
		let response = await axios.put(
			`${baseUrl}/movie/newuser/${userId}`,
			newuser,
		);

		setTimeout(() => {
			setTimeout(() => {
				dispatch({
					type: NEWUSER,
					payload: {
						newuser: response?.data,
						modalcontent: response?.data?.message,
						success,
						ismodal,
					},
				});
			}, 2000);
			setTimeout(() => {
				setForm((prev) => !prev);
			}, 1000);

			console.log(response);
			dispatch({
				type: LOADING,
			});
		}, 4000);
		dispatch({
			type: LOADING,
		});
	} catch (error) {
		dispatch({
			type: ERRORADD,
			payload: {
				modalcontent: error?.response?.data?.message,
			},
		});
	}
};

export const createSuggested = async (
	mysuggested,
	dispatch,
	success,
) => {
	const { userId, suggest } = mysuggested;
	console.log(suggest);
	try {
		let response = await axios.put(
			`${baseUrl}/movie/newsuggested/${userId}`,
			mysuggested,
		);

		setTimeout(() => {
			setTimeout(() => {
				dispatch({
					type: NEWUSER,
					payload: {
						newuser: response?.data,
						modalcontent: response?.data?.message,
						success,
					},
				});
			}, 2000);
			dispatch({
				type: LOADING,
			});
		}, 4000);
		dispatch({
			type: LOADING,
		});
	} catch (error) {
		console.log(userId);
		dispatch({
			type: ERRORADD,
			payload: {
				modalcontent: error?.response?.data?.message,
			},
		});
	}
};

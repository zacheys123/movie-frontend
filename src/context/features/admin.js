import axios from 'axios';

import { ERROR, SIGNUP, LOADING } from '../action_type';
const baseUrl = process.env.REACT_APP_BASE;
export const createAdmin = async (
	navigate,
	dispatch,
	loading,
	data,
) => {
	try {
		const response = await axios.post(
			`
https://moviebackendz.onrender.com/register`,
			data.current,
		);

		setTimeout(() => {
			setTimeout(() => {
				navigate('/create/plan');
			}, 2000);
			window.localStorage.setItem(
				'profile',
				JSON.stringify(response.data),
			);

			dispatch({
				type: SIGNUP,
				payload: {
					modalcontent: response?.data?.message,
					loading,
				},
			});
		}, 1000);

		dispatch({ type: LOADING, loading });
	} catch (error) {
		dispatch({
			type: ERROR,
			payload: { modalcontent: error?.response?.data?.message },
		});
	}
};

export const adminLogin = async (
	navigate,
	dispatch,
	loading,
	data,
) => {
	try {
		const response = await axios.post(
			`
			https://moviebackendz.onrender.com/login`,
			data.current,
		);

		setTimeout(() => {
			window.localStorage.setItem(
				'profile',
				JSON.stringify(response.data),
			);

			dispatch({
				type: SIGNUP,
				payload: {
					modalcontent: response?.data?.message,
					loading,
				},
			});
			navigate('/');
		}, 1000);
		console.log(response?.data);
		dispatch({ type: 'LOADING', loading });
	} catch (error) {
		dispatch({
			type: ERROR,
			payload: { modalcontent: error?.response?.data?.message },
		});
	}
};

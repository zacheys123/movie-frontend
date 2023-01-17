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
				navigate('/');
				window.location.reload();
			}, 3000);
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
		}, 2000);
		console.log(response?.data);
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
			setTimeout(() => {
				navigate('/');
				window.location.reload();
			}, 3000);
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
		}, 2000);
		console.log(response?.data);
		dispatch({ type: 'LOADING', loading });
	} catch (error) {
		dispatch({
			type: ERROR,
			payload: { modalcontent: error?.response?.data?.message },
		});
	}
};

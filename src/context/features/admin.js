import axios from 'axios';
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
			https://movie-backend-ygcx.onrender.com/register`,
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
				type: 'SIGNUP',
				payload: {
					modalcontent: response?.data?.message,
					loading,
				},
			});
		}, 2000);
		console.log(response?.data);
		dispatch({ type: 'LOADING', loading });
	} catch (error) {
		console.log(error.message);
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
			${baseUrl}/login`,
			data.current,
		);

		setTimeout(() => {
			setTimeout(() => {
				navigate('/dashboard');
				window.location.reload();
			}, 3000);
			window.localStorage.setItem(
				'profile',
				JSON.stringify(response.data),
			);

			dispatch({
				type: 'SIGNUP',
				payload: {
					modalcontent: response?.data?.message,
					loading,
				},
			});
		}, 2000);
		console.log(response?.data);
		dispatch({ type: 'LOADING', loading });
	} catch (error) {
		console.log(error.message);
	}
};

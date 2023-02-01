import axios from 'axios';
import {
	UPDATEAUTH,
	UPDATEAUTH_ERROR,
	UPDATE,
	UPDATE_ERROR,
	DELETE_USER,
	DELETE_WAIT,
	DELETE_ERROR,
	HEADER_HIDE,
	LOADING,
	PLAN,
	AUTH_COMPLETE,
} from '../action_type';
const baseUrl = 'https://moviebackendz.onrender.com';

export const update_user = async (
	setMainContext,
	loading,
	myprof,
	id,
	ismodal,
	success,
) => {
	console.log(myprof);
	try {
		let user = await axios.put(
			`${baseUrl}/user/v2/update/${id}`,
			myprof,
		);
		setTimeout(() => {
			setMainContext({ type: LOADING });
			setMainContext({
				type: UPDATE,
				payload: {
					loading,
					success,
					ismodal,
					updated_user: user?.data,
					modalcontent: user?.data?.message,
				},
			});
			setTimeout(() => {
				window.location.reload();
			}, 100);
		}, 3000);
		setMainContext({ type: LOADING });
	} catch (error) {
		console.log(error.response);
		setMainContext({
			type: UPDATE_ERROR,
			payload: error?.response?.data?.message,
		});
	}
};

// update  password fields

export const update_auth = async (
	dispatch,
	myprof,
	id,
	setDisabled,
) => {
	console.log(myprof);
	try {
		let user = await axios.put(
			`${baseUrl}/user/v2/update_auth/${id}`,
			myprof,
		);
		setTimeout(() => {
			setTimeout(() => {
				dispatch({ type: AUTH_COMPLETE });
			}, 3000);
			dispatch({ type: LOADING });
			dispatch({
				type: UPDATEAUTH,
				payload: {
					modalcontent: user?.data?.message,
				},
			});
		}, 3000);
		dispatch({ type: LOADING });
	} catch (error) {
		console.log(error.response);
		dispatch({
			type: UPDATEAUTH_ERROR,
			payload: error?.response?.data?.message,
		});
	}
};
//

export const delete_user = async (
	setMainContext,
	loader,
	myprof,
	id,
	ismodal,
	success,
	navigate,
) => {
	try {
		let user = await axios.post(
			`${baseUrl}/user/v2/deleteuser`,
			myprof,
		);

		setTimeout(() => {
			setMainContext({
				type: DELETE_USER,
				payload: {
					loader,
					success,
					ismodal,
					updated_user: user,
					modalcontent: 'Account Successfully Deleted',
				},
			});
			setTimeout(() => {
				window.localStorage.removeItem('profile');
				window.location.reload();
			}, 4000);
		}, 3000);
		setMainContext({ type: DELETE_WAIT });
	} catch (error) {
		console.log(error);
		setMainContext({
			type: DELETE_ERROR,
			payload: error.response.data || error.message,
		});
	}
};

export const createPlan = async (
	plan,
	navigate,
	loading,
	setMainContext,
) => {
	try {
		if (plan.userId) {
			if (plan?.free?.length > 0) {
				console.log(plan?.userId);
				const response = await axios.put(
					`${baseUrl}/user/v2/package/${plan.userId}`,
					plan,
				);
				console.log(response?.data?.result);

				setTimeout(() => {
					setMainContext({ type: LOADING });
					setMainContext({
						type: PLAN,
						res: response?.data?.message,
						userInfo: plan?.free,
					});

					window.localStorage.setItem(
						'userInfo',
						JSON.stringify(plan?.free),
					);
				}, 6000);

				setMainContext({ type: LOADING });
			} else {
				console.log('No Value Entered');
			}
		} else {
			console.log('No UserId');
		}
	} catch (error) {
		setTimeout(() => {
			navigate('/create/plan');
		}, 2000);
		setMainContext({ type: LOADING });
	}
};

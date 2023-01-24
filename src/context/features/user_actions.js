import axios from 'axios';
const baseUrl = process.env.REACT_APP_BASE;

export const update_user = async (
	setMainContext,
	loading,
	myprof,
	id,
	ismodal,
	success,
	navigate,
	refetch,
) => {
	console.log(id);
	try {
		let user = await axios.put(`${baseUrl}/user/v2/${id}`, myprof);
		setTimeout(() => {
			setMainContext({
				type: 'UPDATE',
				payload: {
					loading,
					success,
					ismodal,
					updated_user: user?.data,
					modalcontent: 'Data Succesfully Updated',
				},
			});

			setTimeout(() => {
				refetch();
				window.location.reload();
			}, 5000);
		}, 3000);
		setMainContext({ type: 'UPDATE_LOADING' });
	} catch (error) {
		setMainContext({
			type: 'UPDATE_ERROR',
			payload: error.response.data || error.message,
		});
	}
};

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
				type: 'DELETE_USER',
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
				navigate('/register');
				window.location.reload();
			}, 4000);
		}, 3000);
		setMainContext({ type: 'DELETE_WAIT' });
	} catch (error) {
		console.log(error);
		setMainContext({
			type: 'DELETE_ERROR',
			payload: error.response.data || error.message,
		});
	}
};

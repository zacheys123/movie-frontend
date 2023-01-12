import { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Stack } from '@mui/material';
import { useMainContext } from './context/contexts_/MainContext';
import axios from 'axios';
import Layout from './components/layout/Layout';
import {
	Home,
	Dashboard,
	Login,
	List,
	Register,
	NoPage,
} from './pages';
import Profile from './pages/profile/Profile';
import { JWT, GETUSER } from './context/action_type';
function App() {
	const {
		main_state: { istheme, admin },
		main_dispatch,
	} = useMainContext();
	const mydata = JSON.parse(localStorage.getItem('profile'));

	const navigate = useNavigate();
	useEffect(() => {
		if (mydata) {
			navigate('/login');
		}
	}, []);
	const id = admin?.result?._id;
	const getUser = async () => {
		try {
			const response = await axios.get(
				`https://moviebackendz.onrender.com/user/v2/${id}`,
			);
			main_dispatch({
				type: GETUSER,
				payload: {
					user: response?.data,
					userInfo: response?.data?.package,
				},
			});
			window.localStorage.setItem(
				'userinfo',
				JSON.stringify(response?.data?.package),
			);
		} catch (error) {
			console.log(error.message);
		}
	};
	useEffect(() => {
		getUser();
		main_dispatch({
			type: JWT,
			payload: {
				admin: mydata,
			},
		});
	}, [admin?.result?._id]);
	return (
		<Layout>
			<Routes>
				<Route path="/">
					<Route index element={<Home />} />
					<Route path="dashboard" element={<Dashboard />} />
					<Route path="login" element={<Login />} />
					<Route exact path="/movie-list" element={<List />} />
					<Route path="register" element={<Register />} />
					<Route path="profile/:adminId" element={<Profile />} />
				</Route>
				<Route path="*" element={<NoPage />} />
			</Routes>
		</Layout>
	);
}
export default App;

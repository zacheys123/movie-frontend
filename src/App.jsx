import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Stack } from '@mui/material';
import { useMainContext } from './context/contexts_/MainContext';
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
function App() {
	const {
		main_state: { istheme, admin },
		main_dispatch,
	} = useMainContext();
	const mydata = JSON.parse(localStorage.getItem('profile'));
	useEffect(() => {
		main_dispatch({
			type: 'JWT',
			payload: {
				admin: mydata,
			},
		});
	}, [admin, main_dispatch]);
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

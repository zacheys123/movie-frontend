import { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Stack } from '@mui/material';
import { useMainContext } from './context/contexts_/MainContext';
import axios from 'axios';
import { useMovieContext } from './context/contexts_/MovieContext';
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
import LandingPage from './pages/LandingPage';
import {
	QueryClient,
	QueryClientProvider,
} from '@tanstack/react-query';
import './css/global.scss';
import Plan from './pages/Plan';
import PrivateRoutes from './components/PrivateRoutes';
import { useQuery } from '@tanstack/react-query';
function App() {
	const {
		main_state: { istheme },
	} = useMainContext();

	const mydata = JSON.parse(localStorage.getItem('profile'));
	const myinfo = JSON.parse(localStorage.getItem('userInfo'));

	const navigate = useNavigate();
	useEffect(() => {
		if (!mydata) {
			navigate('/');
		}
	}, [mydata?.result?._id]);

	const client = new QueryClient();
	return (
		<QueryClientProvider client={client}>
			<Layout>
				<Routes>
					<Route exact path="/">
						<Route
							index
							element={
								<PrivateRoutes>
									{' '}
									<LandingPage />
								</PrivateRoutes>
							}
						/>
						<Route
							exact
							path="/movie/feed"
							element={
								<PrivateRoutes>
									<Home />
								</PrivateRoutes>
							}
						/>
						<Route
							exact
							path="dashboard"
							element={
								<PrivateRoutes>
									<Dashboard />
								</PrivateRoutes>
							}
						/>
						<Route exact path="login" element={<Login />} />
						<Route
							exact
							path="/movie-list/:id/latest"
							element={
								<PrivateRoutes>
									<List />
								</PrivateRoutes>
							}
						/>
						<Route exact path="register" element={<Register />} />

						<Route
							exact
							path="/profile/:adminId"
							element={
								<PrivateRoutes>
									<Profile />
								</PrivateRoutes>
							}
						/>
						<Route
							exact
							path="/create/plan"
							element={
								<PrivateRoutes>
									<Plan />
								</PrivateRoutes>
							}
						/>
					</Route>
					<Route exact path="*" element={<NoPage />} />
				</Routes>
			</Layout>
		</QueryClientProvider>
	);
}
export default App;

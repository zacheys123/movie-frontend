import { useRef, useState, useEffect } from 'react';
import Header from '../Header';
import Footer from '../Footer';
import { Box, Button } from '@mui/material';
import { useLocation } from 'react-router-dom';
import './Layout.scss';
import { useMovieContext } from '../../context/contexts_/MovieContext';
import { useMainContext } from '../../context/contexts_/MainContext';
import {
	RECORD_ONE,
	RECORD_TWO,
	RECORD_THREE,
	MUSIC,
} from '../../context/action_type';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import {
	setFree,
	setAmateur,
	setWorld,
	setPremium,
} from '../plan/_config';

function Layout({ children }) {
	const { movie_dispatch } = useMovieContext();
	const {
		main_state: { istheme },
	} = useMainContext();
	const adm = JSON.parse(window.localStorage.getItem('profile'));
	const admId = adm?.result?._id;

	// get
	// getting all movies for this user
	const { data: alldata, refetch } = useQuery(
		['allusers'],
		async () => {
			const response = await axios.get(
				`https://moviebackendz.onrender.com/user/v2/${admId}`,
			);

			return response.data;
		},
	);
	const myinfo = JSON.parse(localStorage.getItem('userInfo'));
	const info = alldata?.result?.package;

	const location = useLocation();

	const tworef = useRef(null);
	const threeref = useRef();

	const refs = {
		tworef,
		threeref,
	};

	useEffect(() => {
		switch (info || myinfo) {
			case 'Free':
				setFree(refs);
			case 'Amateur':
				setAmateur(refs);
			case 'World':
				setWorld(refs);
			case 'Premium':
				setPremium(refs);
		}
	});

	return (
		<div className={!istheme ? 'layout' : 'darkmode'}>
			<Box className="layout_header_container">
				<Header user={alldata} refetch={refetch} />
			</Box>

			{location.pathname === '/movie/feed' && (
				<Box className="movie_count">
					<Button
						variant="outlined"
						onClick={() => movie_dispatch({ type: MUSIC })}
						color="secondary"
						size="small"
					>
						Music
					</Button>
					<Button
						variant="outlined"
						onClick={() => movie_dispatch({ type: RECORD_ONE })}
						color="secondary"
						size="small"
					>
						1 movie
					</Button>
					<Button
						onClick={() => movie_dispatch({ type: RECORD_TWO })}
						variant="outlined"
						ref={tworef}
						color="secondary"
						size="small"
					>
						2-3 movies
					</Button>
					<Button
						onClick={() => movie_dispatch({ type: RECORD_THREE })}
						variant="outlined"
						ref={threeref}
						color="secondary"
						size="small"
					>
						3 and above movies
					</Button>
				</Box>
			)}
			<Box className="children">{children}</Box>
			<Footer />
		</div>
	);
}
export default Layout;

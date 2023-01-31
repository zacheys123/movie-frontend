import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Box } from '@mui/material';
const MusicList = ({ user }) => {
	const [myid, setId] = useState(() => {
		const storedvalues = localStorage.getItem('profile');
		if (!storedvalues) return {};
		return JSON.parse(storedvalues);
	});
	const id = myid?.result?._id;

	// getting all movies for this user
	const { data: alldata, refetch } = useQuery(['music'], async () => {
		const response = await axios.get(
			`https://moviebackendz.onrender.com/user/v2/${id}`,
		);

		return response?.data;
	});
	console.log(user);
	const [searchquery, setQuery] = useState('');

	const musicfunc = () => {
		let sortedvalue = user?.result?.music || alldata?.result?.music;
		if (searchquery) {
			sortedvalue = sortedvalue.filter((music) => {
				console.log(music);
				if (
					music.user.toLowerCase().includes(searchquery) ||
					music.song_name.toLowerCase().includes(searchquery) ||
					music.music_type.toLowerCase().includes(searchquery) ||
					music.createdAt.toLowerCase().includes(searchquery)
				) {
					return sortedvalue;
				}
			});
		}
		return sortedvalue;
	};
	return (
		<div className="music__list">
			<input
				type="text"
				placeholder="Search movie.."
				value={searchquery}
				onChange={(ev) => setQuery(ev.target.value)}
			/>

			<Box className="listing">
				<table className="table table-bordered table-striped my-2 bg-dark">
					<thead>
						<tr>
							<th>User</th>
							<th>Song</th>
							<th>Type</th>
							<th>amount</th>
							<th>paid</th>
							<th>balance</th>
							<th>void</th>
						</tr>
					</thead>
					<tbody>
						{alldata &&
							musicfunc().map(
								({
									_id,
									user,
									song_name,
									music_type,
									amount,
									paid,
								}) => {
									return (
										<tr key={_id}>
											<td
												style={{
													color: 'cyan',
													fontWeight: '400',
												}}
											>
												{user}
											</td>
											<td>{song_name}</td>
											<td>{music_type}</td>

											<td>{amount}</td>
											<td>{paid}</td>

											<td>{parseFloat(amount - paid)}</td>
										</tr>
									);
								},
							)}
					</tbody>
				</table>
			</Box>
		</div>
	);
};

export default MusicList;

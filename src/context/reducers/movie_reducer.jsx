import {
	GENRE,
	CREATEMOVIE,
	ERROR,
	SUCCESS,
	LOADING,
	CLOSEMODAL,
	EMPTY,
	MOVIES,
} from '../action_type';
export const initialState = {
	isgenre: false,
	ismodal: false,
	modalcontent: '',
	loading: false,
	success: false,
	error: false,
	movies: [],
	movie_added: false,
};
export const moviereducer = (state = initialState, action) => {
	switch (action.type) {
		case GENRE:
			return {
				...state,
				isgenre: !action.isgenre,
			};
		case CREATEMOVIE:
			return {
				...state,
				ismodal: true,
				modalcontent: action.payload.modalcontent,
				added: !action.movie_added,
				loading: false,
				success: !action.payload.success,
				error: false,
			};
		case MOVIES:
			return {
				...state,
				movies: action.payload.movies,
			};

		case ERROR:
			return {
				...state,
				ismodal: true,
				modalcontent: action.payload.modalcontent,
				error: true,
				success: false,
			};
		case SUCCESS:
			return {
				...state,
				ismodal: true,
				modalcontent: action.payload.modalcontent,
				error: false,
				success: true,
			};
		case EMPTY:
			return {
				...state,
				ismodal: !state.ismodal,
				modalcontent: action.modalcontent,
				error: true,
				success: false,
			};
		case CLOSEMODAL:
			return {
				...state,
				ismodal: false,
			};
		case LOADING:
			return {
				...state,
				loading: !action.loading,
			};
	}
};

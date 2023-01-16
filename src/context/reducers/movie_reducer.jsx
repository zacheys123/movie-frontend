import {
	GENRE,
	CREATEMOVIE,
	ERROR,
	SUCCESS,
	LOADING,
	CLOSEMODAL,
	EMPTY,
	MOVIES,
	ERRORADD,
	NEWUSER,
	LOGGED,
	EMPTYHOME,
} from '../action_type';
export const initialState = {
	isgenre: false,
	ismodalhome: false,
	ismodal: false,
	modalcontent: '',
	loading: false,
	success: false,
	error: false,
	movies: [],
	movie_added: false,
	errorm: false,
	newuser: [],
	logged: false,
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
				ismodalhome: true,
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
				ismodalhome: true,
				modalcontent: action.payload.modalcontent,
				error: true,
				success: false,
			};
		case SUCCESS:
			return {
				...state,
				ismodalhome: true,
				modalcontent: action.payload.modalcontent,
				error: false,
				success: true,
			};
		case EMPTY:
			return {
				...state,
				ismodalhome: !state.ismodalhome,
				modalcontent: action.modalcontent,
				error: true,
				success: false,
			};
		case EMPTYHOME:
			return {
				...state,
				ismodalhome: !state.ismodalhome,
				modalcontent: action.modalcontent,
				error: true,
				success: false,
			};
		case CLOSEMODAL:
			return {
				...state,
				ismodalhome: false,
			};
		case LOADING:
			return {
				...state,
				loading: !state.loading,
			};
		case NEWUSER:
			return {
				...state,
				newuser: action.payload.newuser,
				ismodal: !action.payload.ismodal,
				ismodalhome: false,
				success: true,
				modalcontent: action.payload.modalcontent,
			};
		case ERRORADD:
			return {
				...state,

				ismodal: true,
				modalcontent: action.payload.modalcontent,
				error: true,
				success: false,
			};
		case LOGGED:
			return {
				...state,
				logged: !action.logged,
			};
	}
};

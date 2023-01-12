import { GENRE } from '../action_type';
export const initialState = {
	isgenre: false,
};
export const moviereducer = (state = initialState, action) => {
	switch (action.type) {
		case GENRE:
			return {
				...state,
				isgenre: !action.isgenre,
			};
	}
};

export const main_reducer = (state = {}, action) => {
	switch (action.type) {
		case 'THEME':
			return {
				...state,
				istheme: !action.payload,
			};

		case 'EMPTY':
			return {
				...state,
				ismodal: !state.ismodal,
				modalcontent: action.modalcontent,
				error: true,
			};
		case 'WRONGPASSWORD':
			return {
				...state,
				ismodal: !state.ismodal,
				modalcontent: action.modalcontent,
				error: true,
			};
		case 'PASSWORDLENGTH':
			return {
				...state,
				ismodal: !state.ismodal,
				modalcontent: action.modalcontent,
				error: true,
			};

		case 'CLOSEMODAL':
			return {
				...state,
				ismodal: false,
			};

		// signup admin

		case 'SIGNUP':
			return {
				...state,
				ismodal: true,
				modalcontent: action.payload.modalcontent,
				disable: true,
				loading: false,
				success: !action.payload.success,
				admin: action.payload.admin,
				logged: !state.logged,
			};
		case 'JWT':
			return {
				...state,
				admin: action.payload.admin,
			};
		case 'LOGOUT':
			return {
				...state,
				ismodal: true,
				modalcontent: action.payload.modalcontent,
				disable: true,
				loading: false,
				success: !action.payload.success,
				admin: action.payload.admin,
			};
		case 'LOADING':
			return {
				...state,
				loading: !action.loading,
			};
		case 'NOLOADING':
			return {
				...state,
				loading: false,
			};
		default:
			return {
				...state,
			};
	}
};

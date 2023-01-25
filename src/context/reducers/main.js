import {
	JWT,
	GETUSER,
	ERROR,
	SIGNUP,
	LOADING,
	EMPTY,
	WRONGPASSWORD,
	PASSWORDLENGTH,
	CLOSEMODAL,
	SUCCESS,
	PROFILE,
	UPDATE,
	UPDATE_ERROR,
	DELETE_USER,
	DELETE_WAIT,
	DELETE_ERROR,
	LOGOUT,
	NO_DATA,
	PLAN,
	UNPLAN,
	PLAN_ERROR,
	SETPASSWORD,
} from '../action_type';
export const main_reducer = (state = {}, action) => {
	switch (action.type) {
		case 'THEME':
			return {
				...state,
				istheme: !action.payload,
			};
		case GETUSER:
			return {
				...state,
				user: action.payload.user,
				userInfo: action.payload.userInfo,
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
		case WRONGPASSWORD:
			return {
				...state,
				ismodal: !state.ismodal,
				modalcontent: action.modalcontent,
				error: true,
				success: false,
			};
		case PASSWORDLENGTH:
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

		// signup admin

		case SIGNUP:
			return {
				...state,
				ismodal: true,
				modalcontent: action.payload.modalcontent,
				disable: true,
				loading: false,
				success: !action.payload.success,
				admin: action.payload.admin,
				logged: !state.logged,
				error: false,
			};
		case JWT:
			return {
				...state,
				admin: action.payload.admin,
			};
		case LOGOUT:
			return {
				...state,
				ismodal: true,
				modalcontent: action.payload.modalcontent,
				disable: true,
				loading: false,
				success: !action.payload.success,
				admin: action.payload.admin,
			};
		case LOADING:
			return {
				...state,
				loading: !state.loading,
			};
		case PROFILE:
			return {
				...state,
				profile: !action.profile,
			};

		case UPDATE:
			return {
				...state,

				success: !action.payload.success,
				ismodal: !action.payload.ismodal,
				modalcontent: action.payload.modalcontent,
				logged: !state.logged,
			};
		case UPDATE_ERROR:
			return {
				...state,
				ismodal: !action.ismodal,
				modalcontent: action.payload,
				loading: false,
			};
		case DELETE_USER:
			return {
				...state,
				ismodal: !action.ismodal,
				modalcontent: action.payload.modalcontent,
				loader: true,
			};
		case DELETE_ERROR:
			return {
				...state,
				ismodal: !action.ismodal,
				modalcontent: action.payload,
				loader: true,
			};
		case DELETE_WAIT:
			return {
				...state,
				loader: true,
			};
		case NO_DATA:
			return {
				...state,
				ismodal: true,
				modalcontent: 'Cannot Submit Empty Inputs',
			};
		case SETPASSWORD:
			return {
				...state,
				showValidate: !action.showValidate,
				disablepass: !action.disablepass,
			};
		case PLAN:
			return {
				...state,
				res: action.res,
				loading: false,
				isplan: true,
				userInfo: action.userInfo,
			};

		case UNPLAN:
			return {
				...state,
				isplan: !action.loading,
			};

		case PLAN_ERROR:
			return {
				...state,
				loading: true,
			};
		default:
			return {
				...state,
			};
	}
};

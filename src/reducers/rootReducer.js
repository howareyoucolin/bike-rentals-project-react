const initialState = {
	appStatus: 'loading',
	products: [],
	formData: {
		biketype: -1,
		accessory:-1,
		insurance:-1,
	}
};

function rootReducer(state = initialState, action) {
	if(action.type == 'UPDATE_APP_STATUS'){
		return {
			...state,
			appStatus: action.payload,
		}
	}
	else if(action.type == 'UPDATE_PRODUCTS'){
		return {
			...state,
			products: action.payload,
		}
	}
	else if(action.type == 'UPDATE_FORM_DATA'){
		return {
			...state,
			formData:{
				...state.formData,
				[action.payload.key]: action.payload.value
			}
		}
	}
	return state;
};

export default rootReducer;
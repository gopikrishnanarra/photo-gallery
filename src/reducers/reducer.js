const defaultState = {
    images: [],
    getNewImages: false
};

const reducers = (state = defaultState, action) => {
    if (action.type === 'GET_IMAGES') {
        return {
            ...state,
            images: action.images,
            getNewImages: false
        };
    } else if (action.type === 'UPLOAD_IMAGE') {
        return {
            ...state,
            getNewImages: true
        };
    } else {
        return state
    }
    };
export default reducers

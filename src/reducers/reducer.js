const defaultState = {
    images: [],
    getNewImages: false,
    imageUploading: false
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
    } else if (action.type === 'UPLOADING_IMAGE') {
        return {
            ...state,
            imageUploading: action.value
        };
    } else {
        return state
    }
    };
export default reducers

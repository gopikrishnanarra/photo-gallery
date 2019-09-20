const defaultState = {
    images: [],
    getNewImages: false,
    imageUploading: false,
    canDeleteImages: false,
    loggedIn: false,
    welcome: true,
    forgot: false,
    getLoginPage: false,
    canGetUsers: true,
    users: [],
    user: {},
    addUser: false,
    imageIsDeleted: false
};

const reducers = (state = defaultState, action) => {
    if (action.type === 'LOGIN') {
        return {
            ...state,
            loggedIn: true,
            welcome: false,
            getLoginPage: false,
            user: action.user,
            getNewImages: true
        };
    } else if (action.type === 'LOGOUT') {
        return {
            ...defaultState,
            canGetUsers: true,
        };
    } else if (action.type === 'GET_LOGIN') {
        return {
            ...state,
            getLoginPage: !action.value,
            welcome: action.value,
            canGetUsers: true
        };
    } else if (action.type === 'FORGOT') {
        return {
            ...state,
            forgot: action.value
        };
    } else if (action.type === 'DELETE_WINDOW') {
        return {
            ...state,
            canDeleteImages: action.value
        };
    } else if (action.type === 'CAN_GET_USERS') {
        return {
            ...state,
            canGetUsers: true
        };
    } else if (action.type === 'GET_USERS') {
        return {
            ...state,
            users: action.users,
            canGetUsers: false
        };
    } else if (action.type === 'ADD_USER') {
        if(action.value) {
            return {
                ...state,
                addUser: action.value,
                canGetUsers: true,
                loggedIn: false,
                getLoginPage: false,
                editEnabled: false
            };
        } else {
            return {
                ...state,
                loggedIn: false,
                getLoginPage: false,
                addUser: action.value,
                getNewImages: true
            }
        }
    } else if (action.type === 'GET_IMAGES') {
        return {
            ...state,
            images: action.images.data.filter(image => image.userId === state.user.userId),
            getNewImages: false,
            imageUploading: false,
            imageIsDeleted: false,
        };
    } else if (action.type === 'UPLOAD_IMAGE') {
        return {
            ...state,
            getNewImages: true
        };
    } else if (action.type === 'DELETE_IMAGE') {
        return {
            ...state,
            imageIsDeleted: true,
            canDeleteImages: state.images.length < 0 ? false : state.canDeleteImages
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

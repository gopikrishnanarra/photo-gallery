export const getImages = (images) => ({
    type: 'GET_IMAGES',
    images: images
});
export const getUsers = (users) => ({
    type: 'GET_USERS',
    users: users
});
export const uploadImage = () => ({
    type: 'UPLOAD_IMAGE'
});
export const imageDeleted = () => ({
    type: 'DELETE_IMAGE'
});
export const uploadingImage = (value) => ({
    type: 'UPLOADING_IMAGE',
    value: value
});
export const login = (user) => ({
    type: 'LOGIN',
    user: user
});
export const logout = () => ({
    type: 'LOGOUT'
});
export const welcomePage = (value) => ({
    type: 'GET_LOGIN',
    value: value
});
export const forgotPassword = (value) => ({
    type: 'FORGOT',
    value: value
});
export const canGetCloudUsers = () => ({
    type: 'CAN_GET_USERS'
});
export const addUser = (value) => ({
    type: 'ADD_USER',
    value: value
});
export const deleteWindowOpen = (value) => ({
    type: 'DELETE_WINDOW',
    value: value
});


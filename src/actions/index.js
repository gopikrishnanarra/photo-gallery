
export const getImages = (images) => ({
    type: 'GET_IMAGES',
    images: images
});
export const uploadImage = () => ({
    type: 'UPLOAD_IMAGE'
});
export const uploadingImage = (value) => ({
    type: 'UPLOADING_IMAGE',
    value: value
});


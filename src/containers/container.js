import { connect } from 'react-redux'
import * as actions from '../actions'
import App from '../App'
const getGalleryStateData = (data) => {
    return data;
};

function mapStateToProps(state) {
    return {
        data: getGalleryStateData(state.data)
    }}
const mapDispatchToProps = dispatch => ({
    getImages: (images) => dispatch(actions.getImages(images)),
    getUsers: (users) => dispatch(actions.getUsers(users)),
    uploadImage: () => dispatch(actions.uploadImage()),
    uploadingImage: (value) => dispatch(actions.uploadingImage(value)),
    logout: () => dispatch(actions.logout()),
    welcomePage: (value) => dispatch(actions.welcomePage(value)),
    login: (user) => dispatch(actions.login(user)),
    forgotPassword: (value) => dispatch(actions.forgotPassword(value)),
    canGetCloudUsers: () => dispatch(actions.canGetCloudUsers()),
    createUser: (value) => dispatch(actions.addUser(value)),
    deleteWindowOpen: (value) => dispatch(actions.deleteWindowOpen(value)),
});
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)

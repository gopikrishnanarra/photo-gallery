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
    uploadImage: () => dispatch(actions.uploadImage()),
});
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)

import React, { Component } from 'react'
import Dropzone from 'react-dropzone';
import axios from 'axios';
import './App.css'
import Welcome from './components/welcome'
import Login from './components/login'
import ResetPassword from './components/resetPassword'
import compressData from './utils/compress'
import decompressData from './utils/decompress'
import Create from "./components/create";

const IMAGES_API = 'https://api.mlab.com/api/1/databases/images/collections/images?apiKey=kIOuLscCmhbeSOoBEtJUYPV6vy1TMIaQ';
const USERS_API = 'https://api.mlab.com/api/1/databases/users/collections/photo-cloud-users?apiKey=kIOuLscCmhbeSOoBEtJUYPV6vy1TMIaQ';

function fetchImages() {
    axios.get(IMAGES_API)
        .then(list => {
            this.setState({
                images: list
            });
            this.props.getImages(list);
            this.props.uploadingImage(false);
        });
}

function fetchUsers() {
    fetch(USERS_API)
        .then(res => res.json())
        .then(users => {
            this.props.getUsers(users);
        });
}

async function deleteImage(id) {
    const url = `https://api.mlab.com/api/1/databases/images/collections/images/${id}?apiKey=kIOuLscCmhbeSOoBEtJUYPV6vy1TMIaQ`;
    try {
        await axios.delete(url);
        fetchImages.call(this);
    } catch (e){
        console.log(e)
    }
}

function getImages() {
    return this.props.data.images.map((image) => {
        const decompressed = decompressData(image.imageUrl);
        return <div>
            <img key={image._id.$oid} src={decompressed} alt="" className="image"/>
            {this.props.data.canDeleteImages &&
                <span>
                  <button className="delete-button" onClick={() => deleteImage.call(this, image._id.$oid)}> delete </button>
                </span>
            }
        </div>
    })
}

async function uploadImage() {
    this.props.uploadingImage(true);
    await axios.post(IMAGES_API, {
        userId: this.props.data.user.userId,
        imageUrl: this.state.imageFile
    });
    this.props.uploadImage();
}

function getLogoutButton() {
    if(this.props.data.loggedIn === true) {
        return (
            <button className="nav-button" onClick={this.props.logout}>logout</button>
        );
    }
}

export default class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            imageFile: "",
            images: {}
        };
    }

    componentDidMount() {
        fetchUsers.call(this);
        fetchImages.call(this);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.data.getNewImages) {
            fetchImages.call(this);
        }
        if (this.props.data.canGetUsers) {
            fetchUsers.call(this);
        }
    }

    onImageDrop(files) {
        this.handleImageUpload(files[0]);
    }

    handleImageUpload(file) {
        const toBase64 = file => new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });

        toBase64(file).then(res => {
            const compressed = compressData(res);
            this.setState({
                imageFile: compressed
        });
        uploadImage.call(this);
        });
    }

    render() {
        return (
            <div>
                <nav className="nav-bar">
                    <h2 className="nav-header">
                        My Photo Cloud
                    </h2>
                    <span className="nav-section">
                        {getLogoutButton.call(this)}
                    </span>
                </nav>
                <div className="images">
                    {this.props.data.welcome &&
                    <Welcome {...this.props}/>
                    }
                    {(!this.props.data.loggedIn && !this.props.data.forgot && this.props.data.getLoginPage) &&
                    <Login {...this.props}/>
                    }
                    {this.props.data.forgot &&
                    <ResetPassword {...this.props}/>
                    }
                    {this.props.data.addUser &&
                    <Create {...this.props}/>
                    }
                </div>
                {this.props.data.loggedIn &&
                <div>
                    <div className="split left">
                        <div>
                            <Dropzone
                            onDrop={this.onImageDrop.bind(this)}
                            accept="image/*"
                            multiple={false}>
                            {({getRootProps, getInputProps}) => {
                                return (
                                    <div className="dropFile"
                                         {...getRootProps()}
                                    >
                                        <input {...getInputProps()} />
                                        {
                                            <button className="upload">drop file here, or click to upload</button>
                                        }
                                    </div>
                                )
                            }}
                            </Dropzone>
                            {
                            !this.props.data.canDeleteImages ?
                            <button className="side-panel-button" onClick={() => this.props.deleteWindowOpen(true)}> open delete window</button> :
                            <button className="side-panel-button" onClick={() => this.props.deleteWindowOpen(false)}> close delete window</button>
                            }
                        </div>
                    </div>
                    <div className="split right">
                        {this.props.data.imageUploading &&
                        <h1 className="uploading">Uploading......</h1>
                        }
                        <div>
                            {this.props.data.images && getImages.call(this)}
                        </div>
                    </div>
                </div>
                }
            </div>
        )
    }
}

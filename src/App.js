import React, { Component } from 'react'
import { Image } from 'cloudinary-react';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import request from 'superagent';
import './App.css'

const CLOUDINARY_UPLOAD_PRESET = 'gkupload';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/gkimages/upload';
const GET_SCREEN_IMAGES = 'https://res.cloudinary.com/gkimages/image/list/screen.json';
const GET_CLOUD_IMAGES = 'https://res.cloudinary.com/gkimages/image/list/cloud.json';

function fetchScreenImages() {
    axios.get(GET_SCREEN_IMAGES)
        .then(list => {
            console.log(list);
            this.setState({
                screenImages: list.data.resources.map((res) => {
                    return res.public_id;
                })
            })
        });
}
function fetchCloudImages() {
    axios.get(GET_CLOUD_IMAGES)
        .then(list => {
            console.log(list)
            this.setState({
                cloudImages: list.data.resources.map((res) => {
                    return res.public_id;
                })
            })
        });
}

function getScreenImages() {
    return this.state.screenImages.map((image) => {
        console.log(image);
        return <Image cloudName="gkimages" publicId={image} width="300" height="200"/>;
    })
}
function getCloudImages() {
    return this.state.cloudImages.map((image) => {
        console.log(image);
        return <Image cloudName="gkimages" publicId={image} width="300" height="200"/>;
    })
}

export default class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            uploadedFileCloudinaryUrl: '',
            screenImages: [],
            cloudImages: []
        };
    }

    componentDidMount() {
        fetchScreenImages.call(this);
        fetchCloudImages.call(this);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.uploadedFileCloudinaryUrl !== prevState.uploadedFileCloudinaryUrl) {
            fetchScreenImages.call(this);
            fetchCloudImages.call(this);
        }
    }

    onImageDrop(files) {
        this.setState({
            uploadedFile: files[0]
        });

        this.handleImageUpload(files[0]);
    }

    handleImageUpload(file) {
        let upload = request.post(CLOUDINARY_UPLOAD_URL)
            .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
            .field('file', file)
            .field('tags', 'cloud');
            upload.end((err, response) => {
            if (err) {
                console.error(err);
            }

            if (response.body.secure_url !== '') {
                this.setState({
                    uploadedFileCloudinaryUrl: response.body.secure_url
                });
            }
        });
    }

    render() {
        return (
            <div>
                <div>
                    <div className="split left">
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
                                            <button className= "upload">drop file here, or click to upload</button>
                                        }
                                    </div>
                                )
                            }}
                        </Dropzone>
                    </div>
                    <div className="split right">
                        <div>
                        {this.state.screenImages.length > 0 && getScreenImages.call(this)}
                        {this.state.cloudImages.length > 0 && getCloudImages.call(this)}
                        </div>
                    </div>

                </div>
            </div>

        )
    }
}

import React, { Component } from 'react'
import Dropzone from 'react-dropzone';
import Gallery from 'react-photo-gallery';
import axios from 'axios';
import request from 'superagent';
import './App.css'

const CLOUDINARY_UPLOAD_PRESET = 'gkupload';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/gkimages/upload';

function fetchImages() {
    axios.get('https://583445573231844:knWGSHrzyKFV-3tqojei9yhtP-o@api.cloudinary.com/v1_1/gkimages/resources/image')
        .then(list => {
            this.setState({
                images: list.data.resources.map((res) => {
                    return res.secure_url;
                })
            })
        });
}

export default class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            uploadedFileCloudinaryUrl: '',
            images: []
        };
    }

    componentDidMount() {
        fetchImages.call(this);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.uploadedFileCloudinaryUrl !== prevState.uploadedFileCloudinaryUrl) {
            fetchImages.call(this);
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
            .field('file', file);
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
        const photos = this.state.images.map((image) => {
            return {
                src: image,
                width: 2,
                height: 1
            }
        });

        return (
            <div>
                <div>
                    <Gallery photos={photos} />
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
        </div>

        )
    }
}

import React, { Component } from 'react'
import Dropzone from 'react-dropzone';
import axios from 'axios';
import './App.css'
import compressData from './utils/compress'
import decompressData from './utils/decompress'

const IMAGES_API = 'https://api.mlab.com/api/1/databases/images/collections/images?apiKey=kIOuLscCmhbeSOoBEtJUYPV6vy1TMIaQ';

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

function getImages() {
    return this.props.data.images.data.map((image) => {
        const decompressed = decompressData(image.imageUrl);
        return <div>
            <img key={image._id.$oid} src={decompressed} alt="" className="image"/>
        </div>
    })
}

function uploadImage() {
    this.props.uploadingImage(true);
    axios.post(IMAGES_API, {imageUrl: this.state.imageFile});
    this.props.uploadImage();
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
        fetchImages.call(this);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.data.getNewImages) {
            fetchImages.call(this);
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
                {this.props.data.imageUploading &&
                    <h1>UPLOADING......</h1>
                }
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
                            {this.props.data.images.data && getImages.call(this)}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

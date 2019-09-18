import React, { Component } from 'react'
import Dropzone from 'react-dropzone';
import axios from 'axios';
import './App.css'

const IMAGES_API = 'https://api.mlab.com/api/1/databases/images/collections/images?apiKey=kIOuLscCmhbeSOoBEtJUYPV6vy1TMIaQ';

function fetchImages() {
    axios.get(IMAGES_API)
        .then(list => {
            this.setState({
                images: list
            })
        });
}

function getImages() {
    return this.state.images.data.map((image) => {
        return <div>
            <img src={image.imageUrl} alt="" className="image"/>;
        </div>
    })
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
            this.setState({
                imageFile: res
        });
        axios.post(IMAGES_API, {imageUrl: this.state.imageFile});
        fetchImages.call(this);
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
                            {this.state.images.data && getImages.call(this)}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

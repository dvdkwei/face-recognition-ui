import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import Rank from "./components/Rank/Rank";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";

import Particles from 'react-particles-js';
import 'tachyons';
import './App.css';
import {Component} from "react";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";

import SignIn from "./components/SignIn/SignIn";
import Register from "./components/Register/Register";


const particlesOptions = {
    particles: {
        number: {
            value: 100,
            density: {
                enable: true,
                value_area: 800
            }
        }
    }
}

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            input: '',
            imageUrl: '',
            box: {},
            route: 'signin',
            user: {
                id: '',
                name: '',
                email: '',
                entries: 0,
                joined: ''
            }
        }
    }

    onInputChange = (event) => {
        this.setState({input: event.target.value});
    }

    calculateFaceLocation = (data) => {
        const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
        const image = document.getElementById('inputimage');
        const width = Number(image.width);
        const height = Number(image.height);

        return {
            leftCol: clarifaiFace.left_col * width,
            topRow: clarifaiFace.top_row * height,
            rightCol: width - (clarifaiFace.right_col * width),
            bottomRow: height - (clarifaiFace.bottom_row * height)
        }
    }

    displayFaceBox = (box) => {
        this.setState({box: box});
    }

    onButtonSubmit = () => {
        this.setState({imageUrl: this.state.input});
        if (this.state.input !== '') {
            fetch('https://salty-eyrie-25969.herokuapp.com/image/api', {
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    input: this.state.input
                })
            }).then(response => response.json())
                .then(response => {
                if (response) {
                    //increase entry
                    fetch('https://salty-eyrie-25969.herokuapp.com/image/' + this.state.user.id, {
                        method: 'put',
                        headers: {'Content-Type': 'application/json'}
                    })
                        .then(response => response.json())
                        .then(newEntry => this.setState({
                            user: {
                                id: this.state.user.id,
                                name: this.state.user.name,
                                email: this.state.user.email,
                                entries: newEntry,
                                joined: this.state.user.joined
                            }
                        }))
                        .catch(console.log);
                }
                this.displayFaceBox(this.calculateFaceLocation(response))
            });
            // console.log(this.state.user);
        } else {
            alert('no image');
        }
    }

    onRouteChange = (route) => {
        this.setState({
            input: '',
            imageUrl: '',
            box: {},
            route: route
        });
    }

    loadUser = (data) => {
        this.setState({
            user: {
                id: data.id,
                name: data.name,
                email: data.email,
                entries: data.entries,
                joined: data.joined
            }
        });
    }

    render() {
        return (
            <div className="App">
                <Particles className='particles' params={particlesOptions}/>
                {this.state.route === 'home' ?
                    <div>
                        <Navigation onRouteChange={this.onRouteChange}/>
                        <Logo/>
                        <Rank entry={this.state.user.entries}/>
                        <ImageLinkForm
                            onInputChange={this.onInputChange}
                            onButtonSubmit={this.onButtonSubmit}
                        />
                        <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl}/>
                    </div> :
                    this.state.route === 'signin' ?
                        <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
                        :
                        <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
                }
            </div>
        );
    }
}

export default App;

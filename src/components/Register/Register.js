import React, {Component} from "react";
import '../SignIn/SignIn.css';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            name: ''
        }
    }

    onEmailChange = (event) => {
        this.setState({email: event.target.value});
    }

    onPasswordChange = (event) => {
        this.setState({password: event.target.value});
    }

    onNameChange = (event) =>{
        this.setState({name: event.target.value})
    }

    onRegister = () => {
        fetch('https://salty-eyrie-25969.herokuapp.com/register', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                name: this.state.name,
                password: this.state.password,
                email: this.state.email
            })
        })
            .then(response => response.json())
            .then(user => {
                if(user){
                    this.props.loadUser(user);
                    this.props.onRouteChange('home');
                }
            }).catch(()=> alert('false email/password'));
        // this.props.onRouteChange(route)
    }

    render() {
        // const {onRouteChange} = this.props;
        return (

            <article
                className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
                <main className="pa4 black-80">
                    <form className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f1 fw6 ph0 mh0">Register</legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6"
                                       htmlFor="name">Name</label>
                                <input
                                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                    type="text" name="name" id="name" onChange={this.onNameChange}/>
                            </div>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6"
                                       htmlFor="name">Email</label>
                                <input
                                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                    type="email" name="email" id="email" onChange={this.onEmailChange}/>
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6"
                                       htmlFor="password">Password</label>
                                <input
                                    className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                    type="password" name="password" id="password" onChange={this.onPasswordChange}/>
                            </div>
                        </fieldset>
                        <div className="">
                            <input
                                onClick={this.onRegister}
                                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                                type="button" value="Register"/>
                        </div>
                    </form>
                </main>
            </article>
        );
    }
}

export default Register;
import React from 'react'
import { Link } from 'react-router-dom'
import {Helmet} from 'react-helmet';


class SessionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name: "",
      last_name: "",
      email: "",
      password: ""
    };

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleDemo = this.handleDemo.bind(this)
  }

  componentWillUnmount() {
    this.props.removeErrors()
  }

  handleInput(type) {
    return (e) => {
      this.setState({ [type]: e.target.value })
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    const user = Object.assign({}, this.state);
    this.props.processForm(user).then(this.props.closeModal);
  }

  handleDemo(e) {
    e.preventDefault();
    const demoUser = {email: "demo_user@demo.com", password: "password"};
    
    if (this.props.formType === "login") {
    this.props.processForm(demoUser).then(this.props.closeModal)
    } else {
      this.props.logIn(demoUser).then(this.props.closeModal)
    }
  }


  render() {
    const formType = this.props.formType
    const errors = this.props.errors
    let form;

    if (formType === "login") {
      
      form = (
        <div>
          <form className="modal-form" id="login-form">
          <div className = "x-out" onClick={this.props.closeModal}>X</div>
          <div className="form-headers">
            <h1 className="form-header1">Welcome back!</h1>
            <h2 className="form-header2">Log in to continue.</h2>
          </div>
          <div className="form-inputs">
            <label className="input-label">Email <br></br>
            <input className="form-field" type="text" value={this.state.email} onChange={this.handleInput('email')} />
            </label>
            <br></br>
              <label className="input-label">Password <br></br>
              <input className="form-field" id="logpw" type="password" value={this.state.password} onChange={this.handleInput('password')} />
            </label>

            <div>{errors}</div>
            <button className="modal-button"onClick={this.handleSubmit}>Log In</button>

              <button className="modal-button" id="demo-button" onClick={this.handleDemo}>Demo Login</button>
              <div>New to Windygogo?
                  <a className="navbtn" onClick={() => this.props.openModal('signup')}>Sign Up</a> 
              </div>
            </div>
          </form>
          <div className="modal-background" onClick={this.props.closeModal}> </div>
        </div>
      )
    } else if (formType === "signup") {

      form = (
        <div>
          <form className="modal-form" id="signup-form">
          <div className="x-out" onClick={this.props.closeModal}>X</div>   
            <div className="form-headers">
              <h1 className="form-header1">Welcome!</h1>
              <h2 className="form-header2">Sign up to join Indiegogo.</h2>
          </div>
            <div className="form-inputs">

              <label className="input-label">First Name <br></br>
                <input className="form-field" type="text" value={this.state.first_name} onChange={this.handleInput('first_name')} />
              </label>

              <label className="input-label">Last Name <br></br>
                <input className="form-field" type="text" value={this.state.last_name} onChange={this.handleInput('last_name')} />
              </label>

              <label className="input-label">Email <br></br>
            <input className="form-field" type="text" value={this.state.email} onChange={this.handleInput('email')} />
            </label>

              <label className="input-label">Password <br></br>
              <input className="form-field" id="logpw" type="password" value={this.state.password} onChange={this.handleInput('password')} />
            </label>
            <div>{errors}</div>
            <button className="modal-button"  onClick={this.handleSubmit}>Sign Up</button>
            <button className="modal-button" id="demo-button" onClick={this.handleDemo}>Demo Login</button>
              <div>Already have an account?
                <a className="navbtn" onClick={() => this.props.openModal('login')}>Log In</a>
                </div> 
            </div>
          </form>
          <div className="modal-background" onClick={this.props.closeModal}> </div>
   
        </div>
      )
    }

    return (
      <div>
        {form}
        
      </div>
      
    );


  }
}

export default SessionForm;
import React from 'react';
import { loadModules } from 'esri-loader';
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import 'bootstrap/dist/css/bootstrap.min.css'

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: null,
      email: null
    }
    this.handleClick = this.handleClick.bind(this);
  }

  async componentDidMount() {
    // load modules
    const [Portal, OAuthInfo, IdentityManager] = await (loadModules([
      "esri/portal/Portal",
      "esri/identity/OAuthInfo",
      "esri/identity/IdentityManager"
    ]));

    var info = new OAuthInfo({
      appId: "n5A1575tmQq5eFPd",
      popup: false
    });

    // this out of scope within the promise after auth
    var that = this;

    IdentityManager.registerOAuthInfos([info]);
    IdentityManager.getCredential(info.portalUrl + "/sharing");
    IdentityManager.checkSignInStatus(info.portalUrl + "/sharing")
      .then(() => {
        var portal = new Portal();
        // Setting authMode to immediate signs the user in once loaded
        portal.authMode = "immediate";
        // Once loaded, user is signed in
        portal.load().then(function () {
          console.log
          // set store values of email and name
          that.setState({ name: portal.user.fullName, email: portal.user.email })
          console.log(portal.user.fullName)
        });
      })
  };

  async componentWillUnmount() {
    // load modules
    const [OAuthInfo, IdentityManager] = await (loadModules([
      "esri/identity/OAuthInfo",
      "esri/identity/IdentityManager"
    ]));

    // destroy credentials
    var info = new OAuthInfo({
      appId: "n5A1575tmQq5eFPd",
      popup: false
    });
    IdentityManager.registerOAuthInfos([info]);
    IdentityManager.destroyCredentials();

    // reload
    window.location.reload();
  }

  handleClick() {
    console.log('submit clicked')
  }

  render() {
    const { name, email } = this.state
    return (
      <div>
        <title>Training Request</title>
        <h2 className="text-center m-4">ESS Training Request</h2>

        <div className="container">
          <form>
            <div className="form-row">
            <div className="form-group col-md-6">
                <label>Name</label>
                <input type="text" className="form-control" placeholder="Name" disabled value={name}/>
              </div>
              <div className="form-group col-md-6">
                <label>Email</label>
                <input type="email" className="form-control" id="inputEmail4" placeholder="Email" disabled value={email}/>
              </div>
            </div>
            <div className="form-group">
              <label>Address</label>
              <input type="text" className="form-control" placeholder="1234 Main St" />
            </div>
            <div className="form-group">
              <label>Address 2</label>
              <input type="text" className="form-control" placeholder="Apartment, studio, or floor" />
            </div>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label>City</label>
                <input type="text" className="form-control" />
              </div>
              <div className="form-group col-md-4">
                <label>State</label>
                <select className="form-control">
                  <option>Choose...</option>
                  <option>...</option>
                </select>
              </div>
              <div className="form-group col-md-2">
                <label>Zip</label>
                <input type="text" className="form-control" />
              </div>
            </div>
            <div className="form-group">
              <div className="form-check">
                <input className="form-check-input" type="checkbox" />
                <label className="form-check-label">Check me out</label>
              </div>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>
      </div>
    )
  }
}

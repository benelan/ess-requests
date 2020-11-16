import React from 'react';
import { loadModules } from 'esri-loader';
import 'bootstrap/dist/css/bootstrap.min.css'


// NORUS: TE0702
// Other Units: TE0352 

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nameEm: '',
      emailEm: '',
      locationEm: null,
      nunberEm: null,
      nameEx: null,
      cost: null,
      locationEx: null,
      vendor: null,
      justification: null,
      norus: false
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // async componentDidMount() {
  //   // load modules
  //   const [Portal, OAuthInfo, IdentityManager] = await (loadModules([
  //     "esri/portal/Portal",
  //     "esri/identity/OAuthInfo",
  //     "esri/identity/IdentityManager"
  //   ]));

  //   var info = new OAuthInfo({
  //     appId: "n5A1575tmQq5eFPd",
  //     popup: false
  //   });

  //   // this out of scope within the promise after auth
  //   var that = this;

  //   IdentityManager.registerOAuthInfos([info]);
  //   IdentityManager.getCredential(info.portalUrl + "/sharing");
  //   IdentityManager.checkSignInStatus(info.portalUrl + "/sharing")
  //     .then(() => {
  //       var portal = new Portal();
  //       // Setting authMode to immediate signs the user in once loaded
  //       portal.authMode = "immediate";
  //       // Once loaded, user is signed in
  //       portal.load().then(function () {
  //         console.log
  //         // set store values of email and name
  //         that.setState({ nameEm: portal.user.fullName, emailEm: portal.user.email })
  //         console.log(portal.user.fullName)
  //       });
  //     })
  // };

  // async componentWillUnmount() {
  //   // load modules
  //   const [OAuthInfo, IdentityManager] = await (loadModules([
  //     "esri/identity/OAuthInfo",
  //     "esri/identity/IdentityManager"
  //   ]));

  //   // destroy credentials
  //   var info = new OAuthInfo({
  //     appId: "n5A1575tmQq5eFPd",
  //     popup: false
  //   });
  //   IdentityManager.registerOAuthInfos([info]);
  //   IdentityManager.destroyCredentials();

  //   // reload
  //   window.location.reload();
  // }

  handleSubmit() {
    console.log(this.state)
  }

  render() {
    const { nameEm, emailEm } = this.state
    return (
      <div>
        <title>Training Request</title>
        <h3 className="text-center m-4">Certification Exam</h3>

        <div className="container">
          <div className="form-row">
            <div className="form-group col-md-3">
              <label>Employee Name</label>
              <input type="text" className="form-control" disabled value={nameEm} />
            </div>
            <div className="form-group col-md-3">
              <label>Employee Email</label>
              <input type="email" className="form-control" disabled value={emailEm} />
            </div>
            <div className="form-group col-md-3">
              <label>Employee Number</label>
              <input type="number" className="form-control" onChange={x => this.setState({ nunberEm: x.target.value })} />
            </div>
            <div className="form-group col-md-3">
              <label>Employee Location</label>
              <select className="form-control" onChange={x => this.setState({ locationEm: x.target.value })}>
                <option>Redlands</option>
                <option>Charlotte</option>
                <option>Washington DC</option>
                <option>St Louis</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group col-md-5">
              <label>Exam Name</label>
              <input type="text" className="form-control" onChange={x => this.setState({ nameEx: x.target.value })} />
            </div>
            <div className="form-group col-md-4">
              <label>Vendor</label>
              <input type="text" className="form-control" onChange={x => this.setState({ vendor: x.target.value })} />
            </div>
            <div className="form-group col-md-3">
              <label>Exam Location</label>
              <select className="form-control" onChange={x => this.setState({ locationEx: x.target.value })}>
                <option>Redlands</option>
                <option>Charlotte</option>
                <option>Washington DC</option>
                <option>St Louis</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group col-md-3">
              <label>Cost</label>
              <input type="text" className="form-control" onChange={x => this.setState({ cost: x.target.value })} />
            </div>
            <div className="form-group col-md-9">
              <label>Justification</label>
              <textarea className="form-control" rows="1" onChange={x => this.setState({ justification: x.target.value })}></textarea>
            </div>
          </div>

          <div className="form-row mt-4">
            <div className="form-group col-md-3">
              <div className="form-check">
                <input className="form-check-input" type="checkbox" onChange={x => this.setState({ norus: x.target.checked })} />
                <label className="form-check-label">NORUS Unit</label>
              </div>
            </div>
            <div className="form-group col-md-3" style={{ marginTop: '-5px' }}>
              <button onClick={this.handleSubmit} className="btn btn-primary">Submit</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

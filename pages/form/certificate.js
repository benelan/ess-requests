import React from 'react';
import { loadModules } from 'esri-loader';
import 'bootstrap/dist/css/bootstrap.min.css'

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nameEm: '',
      emailEm: '',
      locationEm: 'Redlands',
      numberEm: null,
      nameEx: null,
      cost: null,
      locationEx: 'Redlands',
      vendor: null,
      justification: null,
      unit: 'supt-ArcGIS-Unit-Mgmt@esri.com'
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.createMailText = this.createMailText.bind(this);
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
          that.setState({ nameEm: portal.user.fullName, emailEm: portal.user.email })
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

  getChargeCode(unit) {
    switch (unit) {
      case 'Supt-NORUS-Unit-Mgmt@esri.com':
        return 'TE0702'
      default:
        return 'TE0352'
    }
  }

  getCostCenter(unit, location) {
    if (unit === 'Supt-NORUS-Unit-Mgmt@esri.com') return '4255'

    switch (location) {
      case 'Redlands':
        return '4252'
      case 'Charlotte':
        return '4253'
      case 'St Louis':
        return '4252'
      default:
        return '4255'
    }
  }

  handleSubmit() {
    // fetch('/api/certificate', {
    //   method: 'post',
    //   body: JSON.stringify(this.state)
    // }).then(function (response) {
    //   return response.json();
    // }).then(function (data) {
    //   console.log(data)
    // });
    console.log(this.state)
    window.open(this.createMailText())
  }

  createMailText() {
    const { nameEm, emailEm, numberEm, locationEm, nameEx, cost, locationEx, vendor, justification, unit } = this.state
    const subject = "Request for Exam Certification"
    const body =
      `Employee Name: ${nameEm}
      Employee Email: ${emailEm}
      Employee Number: ${numberEm}
      Employee Location: ${locationEm}
      Cost Center: ${this.getCostCenter(unit, locationEm)}
      Charge Code: ${this.getChargeCode(unit)}
      Exam Name: ${nameEx}
      Exam Cost: $${cost}
      Exam Testing Location: ${locationEx}
      Exam Vendor: ${vendor}
      Justification: ${justification}`

    return `mailto:${unit}?cc=${emailEm}&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }

  render() {
    const { nameEm } = this.state
    return (
      <div>
        <title>Training Request</title>
        <h3 className="text-center m-4">Certification Exam</h3>

        <div className="container">
          <div className="form-row mt-2">
            <div className="form-group col-md-3">
              <label>Employee Name</label>
              <input type="text" className="form-control" disabled value={nameEm} />
            </div>
            <div className="form-group col-md-3">
              <label>Employee Number</label>
              <input type="number" className="form-control" onChange={x => this.setState({ numberEm: x.target.value })} />
            </div>
            <div className="form-group col-md-3">
              <label>Employee Unit</label>
              <select className="form-control" onChange={x => this.setState({ unit: x.target.value })}>
                <option value='Supt-ArcGIS-Unit-Mgmt@esri.com'>Online</option>
                <option value='Supt-Enterprise-Unit-Mgmt@esri.com'>Enterprise</option>
                <option value='Supt-Desktop-Unit-Mgmt@esri.com'>Desktop</option>
                <option value='Supt-NORUS-Unit-Mgmt@esri.com'>NORUS</option>
                <option value='Supt-DaDP-Unit-Mgmt@esri.com'>DaDP Products</option>
              </select>
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

          <div className="form-row mt-2">
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
                <option>Remote</option>
              </select>
            </div>
          </div>

          <div className="form-row mt-2">
            <div className="form-group col-md-3">
              <label>Cost $</label>
              <input type="number" className="form-control" onChange={x => this.setState({ cost: x.target.value })} />
            </div>
            <div className="form-group col-md-9">
              <label>Justification</label>
              <textarea className="form-control" rows="1" onChange={x => this.setState({ justification: x.target.value })}></textarea>
            </div>
          </div>

          <div className="form-row mt-3">
            <div className="form-group col" style={{ marginTop: '-5px' }}>
              <button onClick={this.handleSubmit} className="btn btn-primary">Submit</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

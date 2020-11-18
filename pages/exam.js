import React from 'react';
import { loadModules } from 'esri-loader';
import 'bootstrap/dist/css/bootstrap.min.css'
import {getChargeCode, getCostCenter} from './_utils'

export default class Exam extends React.Component {
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
    this.handleSubmit = this.handleSubmit.bind(this)
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
          // set store values of email and name
          that.setState({ nameEm: portal.user.fullName, emailEm: portal.user.email })
        });
      })
  };

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
  // }

  handleSubmit() {
    if (Object.values(this.state).includes(null)) {
      alert('Please fill out all of the results before submitting')
    }
    else {
      const { nameEm, emailEm, numberEm, locationEm, nameEx, cost, locationEx, vendor, justification, unit } = this.state

      const chargeCode = getChargeCode(unit)
      const costCenter = getCostCenter(unit, locationEm)

      /*********** SEND DATA TO SERVER FOR CSV ***********/
      const outputData = {
        'Employee Name': nameEm,
        'Employee Email': emailEm,
        'Employee Number': numberEm,
        'Employee Location': locationEm,
        'Cost Center': costCenter,
        'Charge Code': chargeCode,
        'Exam Name': nameEx,
        'Exam Cost': cost,
        'Exam Testing Location': locationEx,
        'Exam Vendor': vendor,
        'Justification': justification,
      }
      fetch('/api/logExam', {
        method: 'post',
        body: JSON.stringify(outputData)
      }).then(function (response) {
        return response.json();
      }).then(function (data) {
        console.log(data.response)
      });

      /****************** CREATE EMAIL ******************/
      const subject = "Request for Exam Certification"
      const body =
        `Employee Name: ${nameEm}
Employee Email: ${emailEm}
Employee Number: ${numberEm}
Employee Location: ${locationEm}
Cost Center: ${costCenter}
Charge Code: ${chargeCode}
Exam Name: ${nameEx}
Exam Cost: $${cost}
Exam Testing Location: ${locationEx}
Exam Vendor: ${vendor}
Justification: ${justification}`

      window.open(`mailto:${unit}?cc=${emailEm}&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`)
    }
  }

  render() {
    return (
      <div>
        <title>Exam Request</title>
        <h3 className="text-center m-4">Request for Exam Certification</h3>

        <div className="container">
          <div className="form-row mt-2">
            <div className="form-group col-md-3">
              <label>Employee Name</label>
              <input type="text" className="form-control" disabled value={this.state.nameEm} />
            </div>
            <div className="form-group col-md-3">
              <label>Employee Number</label>
              <input type="text" className="form-control" onChange={x => this.setState({ numberEm: x.target.value })} />
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
              <label>Cost</label>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text">$</span>
                </div>
                <input type="text" className="form-control" onChange={x => this.setState({ cost: x.target.value })} />
              </div>
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

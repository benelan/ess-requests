import React from 'react';
import { loadModules } from 'esri-loader';
import Link from 'next/link'

export default class Training extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nameE: '',
      emailE: '',
      locationE: 'Redlands',
      numberE: null,
      nameC: null,
      cost: null,
      startDate: null,
      endDate: null,
      vendor: null,
      justification: null,
      comments: null,
      unit: 'supt-ArcGIS-Unit-Mgmt@esri.com'
    }
    this.handleSubmit = this.handleSubmit.bind(this);
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
          that.setState({ nameE: portal.user.fullName, emailE: portal.user.email })
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
    // if all inputs were not filled in, don't submit
    if (Object.values(this.state).includes(null)) {
      alert('Please fill out all of the results before submitting')
    }
    else {
      const { nameE, emailE, numberE, locationE, nameC, cost, startDate, endDate, vendor, justification, comments, unit } = this.state

      // get the charge code and cost centers
      const chargeCode = this.getChargeCode(unit)
      const costCenter = this.getCostCenter(unit, locationE)


      /*********** SEND DATA TO SERVER FOR CSV ***********/
      const outputData = {
        'Employee Name': nameE,
        'Employee Email': emailE,
        'Employee Number': numberE,
        'Employee Location': locationE,
        'Cost Center': costCenter,
        'Charge Code': chargeCode,
        'Course Name': nameC,
        'Exam Cost': cost,
        'Exam Vendor': vendor,
        'Start Date': startDate,
        'End Date': endDate,
        'Comments': comments,
        'Justification': justification,
      }

      // REST POST data to api
      fetch('/api/logTraining', {
        method: 'post',
        body: JSON.stringify(outputData)
      }).then(function (response) {
        return response.json();
      }).then(function (data) {
        console.log(data.response)
      });

      /****************** CREATE EMAIL ******************/
      const subject = "Request for Training"
      const body =
        `Employee Name: ${nameE}
Employee Email: ${emailE}
Employee Number: ${numberE}
Cost Center: ${costCenter}
Employee Location: ${locationE}
Charge Code: ${chargeCode}
Course Name: ${nameC}
Cost: ${cost}
Start Date: ${startDate}
End Date: ${endDate}
Vendor: ${vendor}
Justification: ${justification}
Comments: ${comments}`

      // open email in default email client
      window.open(`mailto:${unit}?cc=${emailE}&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`)
    }
  }

  render() {
    return (
      <div>
        <title>Training Request</title>
        <nav className="navbar navbar-expand navbar-light border-bottom" style={{ background: 'white' }}>
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link href="/">
                <a className="nav-link">Home</a>
              </Link>
            </li>
            <li className="nav-item active">
              <Link href="/training">
                <a className="nav-link">Training<span className="sr-only">(current)</span></a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/exam">
                <a className="nav-link">Exam</a>
              </Link>
            </li>
          </ul>
        </nav>
        <h3 className="text-center m-4">Request for Training</h3>

        <div className="container">
          <div className="form-row mt-2">
            <div className="form-group col-md-3">
              <label>Employee Name</label>
              <input type="text" className="form-control" disabled value={this.state.nameE} />
            </div>
            <div className="form-group col-md-3">
              <label>Employee Number</label>
              <input type="text" className="form-control" onChange={x => this.setState({ numberE: x.target.value })} />
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
              <select className="form-control" onChange={x => this.setState({ locationE: x.target.value })}>
                <option>Redlands</option>
                <option>Charlotte</option>
                <option>Washington DC</option>
                <option>St Louis</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group col-md-5">
              <label>Course Name</label>
              <input type="text" className="form-control" onChange={x => this.setState({ nameC: x.target.value })} />
            </div>
            <div className="form-group col-md-5">
              <label>Vendor</label>
              <input type="text" className="form-control" onChange={x => this.setState({ vendor: x.target.value })} />
            </div>
            <div className="form-group col-md-2">
              <label>Cost</label>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text">$</span>
                </div>
                <input type="text" className="form-control" onChange={x => this.setState({ cost: x.target.value })} />
              </div>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group col-md-6">
              <label>Justification</label>
              <textarea className="form-control" rows="2" onChange={x => this.setState({ justification: x.target.value })}></textarea>
            </div>
            <div className="form-group col-md-6">
              <label>Comments</label>
              <textarea className="form-control" rows="2" onChange={x => this.setState({ comments: x.target.value })}></textarea>
            </div>
          </div>

          <div className="form-row mt-2">
            <div className="form-group col-md-4">
              <label>Start Date</label>
              <input type="date" className="form-control" onChange={x => this.setState({ startDate: x.target.value })} />
            </div>
            <div className="form-group col-md-4 offset-md-1">
              <label>End Date</label>
              <input type="date" className="form-control" onChange={x => this.setState({ endDate: x.target.value })} />
            </div>

            <div className="form-group col-md-2 offset-md-1" style={{ marginTop: "31px" }}>
              <button onClick={this.handleSubmit} className="btn btn-primary">Submit</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

import React from 'react';
import { loadModules } from 'esri-loader';
import Link from 'next/link'

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
    this.validateSubmit = this.validateSubmit.bind(this)
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

  handleValidSubmit() {
    const { nameEm, emailEm, numberEm, locationEm, nameEx, cost, locationEx, vendor, justification, unit } = this.state

    const chargeCode = this.getChargeCode(unit)
    const costCenter = this.getCostCenter(unit, locationEm)

    const confirmed = confirm('Please remember your charge code: ' + chargeCode)
    if (confirmed) {
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
Cost Center: ${costCenter}
Employee Location: ${locationEm}
Charge Code: ${chargeCode}
Exam Name: ${nameEx}
Exam Cost: $${cost}
Exam Testing Location: ${locationEx}
Exam Vendor: ${vendor}
Justification: ${justification}`

      window.open(`mailto:${unit}?cc=${emailEm}&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`)
    }
  }

  validateSubmit(event) {
    var forms = document.getElementsByClassName('needs-validation');
    const that = this
    // Loop over them and prevent submission
    var validation = Array.prototype.filter.call(forms, function (form) {
      form.classList.add('was-validated');
      if (form.checkValidity() === true) {
        that.handleValidSubmit()
      }
      else {
        event.preventDefault();
      }
    });
  }

  render() {
    return (
      <div>
        <title>Exam Request</title>
        <nav className="navbar navbar-expand navbar-light border-bottom" style={{ background: 'white' }}>
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link href="/">
                <a className="nav-link">Home</a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/training">
                <a className="nav-link">Training</a>
              </Link>
            </li>
            <li className="nav-item active">
              <Link href="/exam">
                <a className="nav-link">Exam<span className="sr-only">(current)</span></a>
              </Link>
            </li>
          </ul>
        </nav>

        <h3 className="text-center m-4">Request for Exam Certification</h3>
        <div className="container">
          <form className="needs-validation" noValidate onSubmit={this.validateSubmit}>
            <div className="form-row mt-3">
              <div className="form-group col-md-3">
                <label>Employee Name</label>
                <input type="text" className="form-control" disabled value={this.state.nameEm} required />
              </div>
              <div className="form-group col-md-3">
                <label>Employee Number</label>
                <input type="number" className="form-control" onChange={x => this.setState({ numberEm: x.target.value })} required />
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

            <div className="form-row mt-3">
              <div className="form-group col-md-5">
                <label>Exam Name</label>
                <input type="text" className="form-control" onChange={x => this.setState({ nameEx: x.target.value })} required />
              </div>
              <div className="form-group col-md-4">
                <label>Vendor</label>
                <input type="text" className="form-control" onChange={x => this.setState({ vendor: x.target.value })} required />
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

            <div className="form-row mt-3">
              <div className="form-group col-md-2">
                <label>Cost</label>
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text">$</span>
                  </div>
                  <input type="number" className="form-control" onChange={x => this.setState({ cost: x.target.value })} required />
                </div>
              </div>
              <div className="form-group col-md-10">
                <label>Justification</label>
                <textarea className="form-control" rows="1" onChange={x => this.setState({ justification: x.target.value })} required />
              </div>
            </div>

            <div className="form-row mt-3">
              <div className="form-group col">
                <input type="submit" className="btn btn-primary" value="Submit" />
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

import React from 'react';
import { loadModules } from 'esri-loader';
import DatePicker from "react-datepicker";
import 'bootstrap/dist/css/bootstrap.min.css'
import "react-datepicker/dist/react-datepicker.css";

// NORUS: TE0702
// Other Units: TE0352 

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // nameE: '',
      // emailE: '',
      // locationE: 'Redlands',
      // nunberE: null,
      // nameC: null,
      // cost: null,
      // startDate: null,
      // endDate: null,
      // vendor: null,
      // justification: null,
      // comments: null,
      // unit: 'supt-ArcGIS-Unit-Mgmt@esri.com'
      nameE: 'Ben Elan',
      emailE: 'belan@esri.com',
      locationE: 'Redlands',
      numberE: '12345',
      nameC: 'testing exam name',
      cost: '500',
      startDate: null,
      endDate: null,
      vendor: 'tester inc',
      justification: 'for fun',
      comments: "hi I'm ben",
      unit: 'Supt-NORUS-Unit-Mgmt@esri.com'
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
  //         that.setState({ nameE: portal.user.fullName, emailE: portal.user.email })
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
    if (Object.values(this.state).includes(null)) {
      alert('Please fill out all of the results before submitting')
    }
    else {
      const { nameE, emailE, numberE, locationE, nameC, cost, startDate, endDate, vendor, justification, comments, unit } = this.state

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
      fetch('/api/instructor', {
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
      Employee Location: ${locationE}
      Cost Center: ${costCenter}
      Charge Code: ${chargeCode}
      Course Name: ${nameC}
      Exam Cost: ${cost}
      Exam Vendor: ${vendor}
      Start Date: ${startDate}
      End Date: ${endDate}
      Comments: ${comments}
      Justification: ${justification}`

      window.open(`mailto:${unit}?cc=${emailE}&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`)
    }
  }

  render() {
    const { nameE, startDate, endDate } = this.state
    return (
      <div>
        <title>Training Request</title>
        <h3 className="text-center m-4">Request for Training</h3>

        <div className="container">
          <div className="form-row mt-2">
            <div className="form-group col-md-3">
              <label>Employee Name</label>
              <input type="text" className="form-control" disabled value={nameE} />
            </div>
            <div className="form-group col-md-3">
              <label>Employee Number</label>
              <input type="number" className="form-control" onChange={x => this.setState({ numberE: x.target.value })} />
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
              <input type="text" className="form-control" onChange={x => this.setState({ cost: x.target.value })} />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group col-md-6">
              <label>Justification</label>
              <textarea className="form-control" rows="3" onChange={x => this.setState({ justification: x.target.value })}></textarea>
            </div>
            <div className="form-group col-md-6">
              <label>Comments</label>
              <textarea className="form-control" rows="3" onChange={x => this.setState({ comments: x.target.value })}></textarea>
            </div>
          </div>

          <div className="form-row mt-4">
            <div className="form-group col-md-4">
              <label className="mr-2">Start Date</label>
              <DatePicker selected={startDate} onChange={date => this.setState({ startDate: date })} />
            </div>
            <div className="form-group col-md-4">
              <label className="mr-2">End Date</label>
              <DatePicker selected={endDate} onChange={date => this.setState({ endDate: date })} />
            </div>

            <div className="form-row mt-3">
              <div className="form-group col" style={{ marginTop: '-5px' }}>
                <button onClick={this.handleSubmit} className="btn btn-primary">Submit</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

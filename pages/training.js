import React from 'react';
import TopNav from '../components/TopNav'
import { esriLogin } from '../utils/authenticator'
import { validateSubmit } from '../utils/formSubmitter'
import { getUnits, getEmployeeLocations } from '../utils/constGetter'

export default class Training extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nameEmployee: '',
      emailEmployee: '',
      locationEmployee: 'Redlands',
      numberEmploye: null,
      nameCourse: null,
      cost: null,
      startDate: null,
      endDate: null,
      vendor: null,
      justification: null,
      comments: '',
      unit: 'supt-ArcGIS-Unit-Mgmt@esri.com'
    }
  }

  async componentDidMount() {
    try {
      const { name, email } = await esriLogin()
      console.log('signed in as', name)
      this.setState({ nameEmployee: name, emailEmployee: email })
    }
    catch (err) {
      console.error('login failed:', err)
    }
  }

  render() {
    const units = getUnits()
    const unitOptions = Object.keys(units).map(u =>
      <option key={u} value={units[u]}>{u}</option>)

    const employeeLocations = getEmployeeLocations()
    const employeeLocationOptions = employeeLocations.map(loc =>
      <option key={loc}>{loc}</option>)
    return (
      <div>
        <title>Training Request</title>
        <TopNav page="training" />
        <h3 className="text-center m-4">Request for Training</h3>

        <div className="container">
          <form className="needs-validation" noValidate onSubmit={(event) =>
            validateSubmit(event, 'training', this.state)}
          >
            <div className="form-row mt-3">
              <div className="form-group col-md-3">
                <label>Employee Name</label>
                <input type="text" className="form-control" disabled value={this.state.nameEmployee} required />
              </div>
              <div className="form-group col-md-3">
                <label>Employee Number</label>
                <input type="number" className="form-control" onChange={x => this.setState({ numberEmploye: x.target.value })} required />
              </div>
              <div className="form-group col-md-3">
                <label>Employee Unit</label>
                <select className="form-control" onChange={x => this.setState({ unit: x.target.value })}>
                  {unitOptions}
                </select>
              </div>
              <div className="form-group col-md-3">
                <label>Employee Location</label>
                <select className="form-control" onChange={x => this.setState({ locationEmployee: x.target.value })}>
                  {employeeLocationOptions}
                </select>
              </div>
            </div>

            <div className="form-row mt-3">
              <div className="form-group col-md-5">
                <label>Course Name</label>
                <input type="text" className="form-control" onChange={x => this.setState({ nameCourse: x.target.value })} required />
              </div>
              <div className="form-group col-md-5">
                <label>Vendor</label>
                <input type="text" className="form-control" onChange={x => this.setState({ vendor: x.target.value })} required />
              </div>
              <div className="form-group col-md-2">
                <label>Cost</label>
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text">$</span>
                  </div>
                  <input type="number" className="form-control" onChange={x => this.setState({ cost: x.target.value })} required />
                </div>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group col-md-6">
                <label>Justification</label>
                <textarea className="form-control" rows="2" onChange={x => this.setState({ justification: x.target.value })} required />
              </div>
              <div className="form-group col-md-6">
                <label>Comments</label>
                <textarea className="form-control" rows="2" onChange={x => this.setState({ comments: x.target.value })} />
              </div>
            </div>

            <div className="form-row mt-3">
              <div className="form-group col-md-4">
                <label>Start Date</label>
                <input type="date" className="form-control" onChange={x => this.setState({ startDate: x.target.value })} required />
              </div>
              <div className="form-group col-md-4 offset-md-1">
                <label>End Date</label>
                <input type="date" className="form-control" onChange={x => this.setState({ endDate: x.target.value })} required />
              </div>

              <div className="form-group col-md-2 offset-md-1" style={{ marginTop: "31px" }}>
                <input type="submit" className="btn btn-primary" value="Submit" />
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

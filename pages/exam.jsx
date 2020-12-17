import React from 'react'
import TopNav from '../components/TopNav'
import { esriLogin } from '../utils/authenticator'
import { validateSubmit } from '../utils/formSubmitter'
import {
  getUnits,
  getEmployeeLocations,
  getExamLocations,
} from '../utils/constGetter'

/**
 * The exam request form
 * @name Exam
 * @class
 */
export default class Exam extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      nameEmployee: '',
      emailEmployee: '',
      locationEmployee: 'Redlands',
      numberEmployee: null,
      nameExam: null,
      cost: null,
      locationExam: 'Redlands',
      vendor: null,
      justification: null,
      unit: 'supt-ArcGIS-Unit-Mgmt@esri.com',
    }
  }

  async componentDidMount() {
    try {
      const { name, email } = await esriLogin()
      this.setState({ nameEmployee: name, emailEmployee: email })
    } catch (err) {
      console.error('login failed:', err)
    }
  }

  render() {
    // get the units and locations and create the dropdown options
    const units = getUnits()
    const unitOptions = Object.keys(units).map((u) => (
      <option key={u} value={units[u]}>
        {u}
      </option>
    ))

    const employeeLocations = getEmployeeLocations()
    const employeeLocationOptions = employeeLocations.map((loc) => (
      <option key={loc}>{loc}</option>
    ))

    const examLocations = getExamLocations()
    const examLocationOptions = examLocations.map((loc) => (
      <option key={loc}>{loc}</option>
    ))

    const { employeeName } = this.state
    return (
      <div>
        <title>Exam Request</title>
        <TopNav page="exam" />
        <h3 className="text-center m-4">Request for Exam Certification</h3>
        <div className="container">
          <form
            className="needs-validation"
            noValidate
            onSubmit={(event) => validateSubmit(event, 'exam', this.state)}
          >
            <div className="form-row mt-3">
              <div className="form-group col-md-3">
                <label htmlFor="employeeName">Employee Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="employeeName"
                  disabled
                  value={employeeName}
                  required
                />
              </div>
              <div className="form-group col-md-3">
                <label htmlFor="employeeNumber">Employee Number</label>
                <input
                  type="number"
                  id="employeeNumber"
                  className="form-control"
                  onChange={(x) => this.setState({ numberEmployee: x.target.value })}
                  required
                />
              </div>
              <div className="form-group col-md-3">
                <label htmlFor="employeeUnit">Employee Unit</label>
                <select
                  id="employeeUnit"
                  className="form-control"
                  onChange={(x) => this.setState({ unit: x.target.value })}
                >
                  {unitOptions}
                </select>
              </div>
              <div className="form-group col-md-3">
                <label htmlFor="employeeLocation">Employee Location</label>
                <select
                  id="employeeLocation"
                  className="form-control"
                  onChange={(x) => this.setState({ locationEmployee: x.target.value })}
                >
                  {employeeLocationOptions}
                </select>
              </div>
            </div>

            <div className="form-row mt-3">
              <div className="form-group col-md-5">
                <label htmlFor="examName">Exam Name</label>
                <input
                  id="examName"
                  type="text"
                  className="form-control"
                  onChange={(x) => this.setState({ nameExam: x.target.value })}
                  required
                />
              </div>
              <div className="form-group col-md-4">
                <label htmlFor="vendor">Vendor</label>
                <input
                  id="vendor"
                  type="text"
                  className="form-control"
                  onChange={(x) => this.setState({ vendor: x.target.value })}
                  required
                />
              </div>
              <div className="form-group col-md-3">
                <label htmlFor="examLocation">Exam Location</label>
                <select
                  id="examLocation"
                  className="form-control"
                  onChange={(x) => this.setState({ locationExam: x.target.value })}
                >
                  {examLocationOptions}
                </select>
              </div>
            </div>
            <div className="form-row mt-3">
              <div className="form-group col-md-2">
                <label htmlFor="cost">Cost</label>
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text">$</span>
                  </div>
                  <input
                    id="cost"
                    type="number"
                    className="form-control"
                    onChange={(x) => this.setState({ cost: x.target.value })}
                    required
                  />
                </div>
              </div>
              <div className="form-group col-md-10">
                <label htmlFor="justification">Justification</label>
                <input
                  id="justification"
                  className="form-control"
                  onChange={(x) => this.setState({ justification: x.target.value })}
                  required
                />
              </div>
            </div>

            <div className="form-row mt-3">
              <div className="form-group col">
                <input
                  type="submit"
                  className="btn btn-primary"
                  value="Submit"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

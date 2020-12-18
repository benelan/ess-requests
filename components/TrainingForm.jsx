/* eslint-disable react/prop-types */
import React from 'react'
/**
 * The training request form
 * @name TrainingForm
 * @class
 */
export default class TrainingForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      locationEmployee: 'Redlands',
      numberEmployee: null,
      nameCourse: null,
      cost: null,
      startDate: null,
      endDate: null,
      vendor: null,
      justification: null,
      comments: '',
      unit: 'supt-ArcGIS-Unit-Mgmt@esri.com',
    }
  }

  render() {
    const {
      units, offices, validateSubmit, nameEmployee,
    } = this.props
    // get the units and locations and create the dropdown options
    const unitOptions = Object.keys(units).map((u) => (
      <option key={u} value={units[u]}>
        {u}
      </option>
    ))

    const employeeLocationOptions = offices.map((loc) => (
      <option key={loc}>{loc}</option>
    ))
    return (
      <>
        <title>Training Request</title>
        <h3 className="text-center m-4">Request for Training</h3>
        <div className="container">
          <form
            className="needs-validation"
            noValidate
            onSubmit={(event) => validateSubmit(event, 'training', this.state)}
          >
            <div className="form-row mt-3">
              <div className="form-group col-md-3">
                <label htmlFor="employeeName">Employee Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="employeeName"
                  disabled
                  value={nameEmployee}
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
                <label htmlFor="courseName">Course Name</label>
                <input
                  id="courseName"
                  type="text"
                  className="form-control"
                  onChange={(x) => this.setState({ nameCourse: x.target.value })}
                  required
                />
              </div>
              <div className="form-group col-md-5">
                <label htmlFor="vendor">Vendor</label>
                <input
                  id="vendor"
                  type="text"
                  className="form-control"
                  onChange={(x) => this.setState({ vendor: x.target.value })}
                  required
                />
              </div>
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
            </div>

            <div className="form-row">
              <div className="form-group col-md-6">
                <label htmlFor="justification">Justification</label>
                <textarea
                  id="justification"
                  className="form-control"
                  rows="2"
                  onChange={(x) => this.setState({ justification: x.target.value })}
                  required
                />
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="comments">Comments</label>
                <textarea
                  id="comments"
                  className="form-control"
                  rows="2"
                  onChange={(x) => this.setState({ comments: x.target.value })}
                />
              </div>
            </div>

            <div className="form-row mt-3">
              <div className="form-group col-md-4">
                <label htmlFor="startDate">Start Date</label>
                <input
                  id="startDate"
                  type="date"
                  className="form-control"
                  onChange={(x) => this.setState({ startDate: x.target.value })}
                  required
                />
              </div>
              <div className="form-group col-md-4 offset-md-1">
                <label htmlFor="endDate">End Date</label>
                <input
                  id="endDate"
                  type="date"
                  className="form-control"
                  onChange={(x) => this.setState({ endDate: x.target.value })}
                  required
                />
              </div>

              <div
                className="form-group col-md-2 offset-md-1"
                style={{ marginTop: '31px' }}
              >
                <input
                  type="submit"
                  className="btn btn-primary"
                  value="Submit"
                />
              </div>
            </div>
          </form>
        </div>
      </>
    )
  }
}

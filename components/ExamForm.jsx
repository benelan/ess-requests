import React from 'react'
import PropTypes from 'prop-types'

/**
 * The exam request form
 * @name ExamForm
 * @class
 */
class ExamForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
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

    // add the remote training option
    const examLocationOptions = [...offices, 'Remote'].map((loc) => (
      <option key={loc}>{loc}</option>
    ))

    return (
      <div className="container">
        <form
          className="needs-validation"
          aria-label="Exam Request Form"
          noValidate
          onSubmit={(event) => validateSubmit(event, 'exam', this.state)}
        >
          <div className="form-row mt-3">
            <div className="form-group col-md-3">
              <label htmlFor="nameEmployee">Employee Name</label>
              <input
                type="text"
                className="form-control"
                id="nameEmployee"
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
                onChange={(x) => this.setState({ numberEmployee: parseInt(x.target.value, 10) })}
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
                  onChange={(x) => this.setState({ cost: parseFloat(x.target.value) })}
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
              <input type="submit" className="btn btn-primary" value="Submit" />
            </div>
          </div>
        </form>
      </div>
    )
  }
}

ExamForm.defaultProps = {
  units: {},
  offices: [],
  nameEmployee: '',
  validateSubmit: () => console.error('pass a submit function to ExamForm'),
}

ExamForm.propTypes = {
  nameEmployee: PropTypes.string,
  units: PropTypes.instanceOf(Object),
  offices: PropTypes.instanceOf(Array),
  validateSubmit: PropTypes.func,
}

export default ExamForm

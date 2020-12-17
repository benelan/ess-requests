/** @module constGetter */

/**
   * @func
   * @return {array} employee locations
   */
export const getEmployeeLocations = () => ['Redlands', 'Charlotte', 'Washington DC', 'St Louis']

/**
   * @func
   * @return {array} exam locations
   */
export const getExamLocations = () => ['Redlands', 'Charlotte', 'Washington DC', 'St Louis', 'Remote']

/**
   * @func
   * @return {object} employee units
   */
export const getUnits = () => ({
  Online: 'Supt-ArcGIS-Unit-Mgmt@esri.com',
  Enterprise: 'Supt-Enterprise-Unit-Mgmt@esri.com',
  Desktop: 'Supt-Desktop-Unit-Mgmt@esri.com',
  'DaDP Product': 'Supt-DaDP-Unit-Mgmt@esri.co',
  NORUS: 'Supt-NORUS-Unit-Mgmt@esri.com',
  TAMS: 'SWhittington@esri.com',
  Readiness: 'Christian_Wells@esri.com',
})

/**
   * @func
   * @param {string} unit
   * @param {string} location
   * @return {string} cost center
   */
export const getCostCenter = (unit, location) => {
  if (unit === 'Supt-NORUS-Unit-Mgmt@esri.com') {
    return '4255'
  }
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

/**
   * @func
   * @param {string} unit
   * @return {string} charge code
   */
export const getChargeCode = (unit) => {
  switch (unit) {
  case 'Supt-NORUS-Unit-Mgmt@esri.com':
    return 'TE0702'
  default:
    return 'TE0352'
  }
}

/**
 * Named function exports that return hardcoded values
 * @module getValue
 * */

/**
 * The location of ESS offices
 * @func
 * @return {array} ESS office locations
 */
export const getOfficeLocations = () => [
  'Redlands',
  'Charlotte',
  'Washington DC',
  'St Louis',
]

/**
 * The email addresses for requests by unit
 * @func
 * @return {object} employee units
 */
export const getUnits = () => ({
  Online: 'Supt-ArcGIS-Unit-Mgmt@esri.com',
  Enterprise: 'Supt-Enterprise-Unit-Mgmt@esri.com',
  Desktop: 'Supt-Desktop-Unit-Mgmt@esri.com',
  'DaDP Product': 'Supt-DaDP-Unit-Mgmt@esri.com',
  NORUS: 'Supt-NORUS-Unit-Mgmt@esri.com',
  TAMS: 'SWhittington@esri.com',
  Readiness: 'Christian_Wells@esri.com',
})

/**
 * St Louis employees get sent to Enterprise unit alias
 * @func
 * @param {string} location
 * @param {string} unit
 * @return {string} employee unit
 */
export const getStLouisUnit = (location, unit) => (location === 'St Louis' ? 'belan@esri.com' : unit)

/**
 * Determines cost center by employee unit and location
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
 * Determines charge code by employee unit
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

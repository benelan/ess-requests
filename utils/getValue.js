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
  'DaD Products': 'Supt-DaDP-Unit-Mgmt@esri.com',
  NORUS: 'Supt-NORUS-Unit-Mgmt@esri.com',
  TAMs: 'SWhittington@esri.com',
  Readiness: 'Christian_Wells@esri.com',
})

/**
 * St Louis employee requests get sent to Enterprise unit alias
 * @func
 * @param {string} unit
 * @param {string} location
 * @return {string} employee unit
 */
export const getStLouisUnit = (unit, location) => (location === 'St Louis' ? getUnits().Enterprise : unit)

/**
 * Determines cost center by employee unit and location
 * @func
 * @param {string} unit
 * @param {string} location
 * @return {string} cost center
 */
export const getCostCenter = (unit, location) => {
  const costLookup = {
    Redlands: '4252',
    Charlotte: '4253',
    'St Louis': '4252',
    'Washington DC': '4255',
  }

  return unit === 'Supt-NORUS-Unit-Mgmt@esri.com' ? '4255' : costLookup[location]
}

/**
 * Determines charge code by employee unit
 * @func
 * @param {string} unit
 * @return {string} charge code
 */
export const getChargeCode = (unit) => (unit === 'Supt-NORUS-Unit-Mgmt@esri.com' ? 'TE0702' : 'TE0352')

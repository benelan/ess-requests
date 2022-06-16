/**
 * Named function exports that return hardcoded values
 * @module getValue
 * */

/**
 * The location of ESS offices
 * @func
 * @return {array} ESS office locations
 */
export const getOfficeLocations = () => ['Redlands', 'Charlotte', 'Washington DC', 'St Louis']

/**
 * The email addresses for requests by unit
 * @func
 * @return {object} employee units
 */
export const getUnits = () => ({
  Online: 'online@fake.com',
  Enterprise: 'enterprise@fake.com',
  Desktop: 'desktop@fake.com',
  'DaD Products': 'dadp@fake.com',
  NORUS: 'norus@fake.com',
  TAMS: 'tams@fake.com',
  Readiness: 'readiness@fake.com',
})

/**
 * Determines cost center by employee unit and location
 * @func
 * @param {string} unit
 * @param {string} location
 * @return {string} cost center
 */
export const getCostCenter = (unit, location) => {
  if (unit === 'norus@fake.com') {
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
  case 'norus@fake.com':
    return 'TE0702'
  default:
    return 'TE0352'
  }
}

export function getChargeCode(unit) {
  switch (unit) {
    case 'Supt-NORUS-Unit-Mgmt@esri.com':
      return 'TE0702'
    default:
      return 'TE0352'
  }
}

export function getCostCenter(unit, location) {
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
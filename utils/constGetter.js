export const getEmployeeLocations = () => ['Rendlands', 'Charlotte', 'Washington DC', 'St Louis']

export const getExamLocations = () => ['Rendlands', 'Charlotte', 'Washington DC', 'St Louis', 'Remote']

export const getUnits = () => {
  return {
    'Online': 'Supt-ArcGIS-Unit-Mgmt@esri.com',
    'Enterprise': 'Supt-Enterprise-Unit-Mgmt@esri.com',
    'Desktop': 'Supt-Desktop-Unit-Mgmt@esri.com',
    'DaDP Product': 'Supt-DaDP-Unit-Mgmt@esri.co',
    'NORUS': 'Supt-NORUS-Unit-Mgmt@esri.com',
    'TAMS': 'SWhittington@esri.com',
    'Readiness': 'Christian_Wells@esri.com',
  }
}

export const getCostCenter = (unit, location) => {
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

export const getChargeCode = (unit) => {
  switch (unit) {
    case 'Supt-NORUS-Unit-Mgmt@esri.com':
      return 'TE0702'
    default:
      return 'TE0352'
  }
}
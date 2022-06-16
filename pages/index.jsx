import React from 'react'
import TopNav from '../components/TopNav'
import FormSelector from '../components/FormSelector'

/**
 * Home page contains a landing page to select a form
 * @author Ben Elan
 * @name HomePage
 * @class
 */
function HomePage() {
  return (
    <>
      <title>ESS Requests</title>
      <TopNav page="home" />
      <FormSelector />
    </>
  )
}

export default HomePage

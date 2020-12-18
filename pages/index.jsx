import React from 'react'
import TopNav from '../components/TopNav'
import FormSelect from '../components/FormSelect'

/**
 * Home page
 * @author Ben Elan
 * @name Home
 * @class
 */
const Home = () => (
  <>
    <title>ESS Requests</title>
    <TopNav page="home" />
    <FormSelect />
  </>
)

export default Home

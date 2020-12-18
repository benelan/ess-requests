import React from 'react'
import TopNav from '../components/TopNav'
import FormWrapper from '../components/FormWrapper'
import TrainingForm from '../components/TrainingForm'
/**
 * The training request page
 * @name Training
 * @class
 */
const Training = () => (
  <>
    <TopNav page="training" />
    <FormWrapper>
      <TrainingForm />
    </FormWrapper>
  </>
)

export default Training

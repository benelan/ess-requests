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
    <title>Training Request</title>
    <TopNav page="training" />
    <h3 className="text-center m-4">Request for Training</h3>
    <FormWrapper>
      <TrainingForm />
    </FormWrapper>
  </>
)

export default Training

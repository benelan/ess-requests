import React from 'react'
import TopNav from '../components/TopNav'
import FormWrapper from '../components/FormWrapper'
import TrainingForm from '../components/TrainingForm'
/**
 * The training request page. The user will be challenged to sign in with ArcGIS OAuth via the FormWrapper. They can then fill out the TrainingForm. When submitting the FormWrapper will validate the data and submit if all is good.
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

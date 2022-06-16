import React from 'react'
import TopNav from '../components/TopNav'
import FormWrapper from '../components/FormWrapper'
import ExamForm from '../components/ExamForm'
/**
 * The exam request page. The user will be challenged to sign in with ArcGIS OAuth via the FormWrapper. They can then fill out the ExamForm. When submitting the FormWrapper will validate the data and submit if all is good.
 * @name ExamPage
 * @class
 */
function ExamPage() {
  return (
    <>
      <title>Exam Request</title>
      <TopNav page="exam" />
      <h3 className="text-center m-4">Request for Exam Certification</h3>
      <FormWrapper>
        <ExamForm />
      </FormWrapper>
    </>
  )
}

export default ExamPage

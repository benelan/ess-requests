import React from 'react'
import TopNav from '../components/TopNav'
import FormWrapper from '../components/FormWrapper'
import ExamForm from '../components/ExamForm'
/**
 * The exam request page
 * @name Exam
 * @class
 */
const Exam = () => (
  <>
    <title>Exam Request</title>
    <TopNav page="exam" />
    <h3 className="text-center m-4">Request for Exam Certification</h3>
    <FormWrapper>
      <ExamForm />
    </FormWrapper>
  </>
)

export default Exam

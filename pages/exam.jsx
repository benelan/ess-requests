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
    <TopNav page="exam" />
    <FormWrapper>
      <ExamForm />
    </FormWrapper>
  </>
)

export default Exam

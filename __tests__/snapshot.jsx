import React from 'react'
import renderer from 'react-test-renderer'
import Index from '../pages/index'
import Exam from '../pages/exam'
import Training from '../pages/training'

it('renders home page unchanged', () => {
  const homeTree = renderer.create(<Index />).toJSON()
  expect(homeTree).toMatchSnapshot()
})

it('renders exam form unchanged', () => {
  const examTree = renderer.create(<Exam />).toJSON()
  expect(examTree).toMatchSnapshot()
})

it('renders training form unchanged', () => {
  const trainingTree = renderer.create(<Training />).toJSON()
  expect(trainingTree).toMatchSnapshot()
})

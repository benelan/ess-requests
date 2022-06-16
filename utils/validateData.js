/**
 * Schema validators for training and exam data
 * @module validateData
 * */
import { Validator } from 'jsonschema'

/**
 * Takes an exam data object as an input and validates it's schema
 * @param {object} instance - data to validate
 * @return {boolean} does the data have the proper schema
 */
export const examSchemaIsValid = (instance) => {
  const v = new Validator()
  const schema = {
    id: 'examData',
    type: 'object',
    properties: {
      nameEmployee: { type: 'string', minLength: 1, required: true },
      emailEmployee: { type: 'string', minLength: 1, required: true },
      numberEmployee: { type: 'number', minimum: 1, required: true },
      locationEmployee: { type: 'string', minLength: 1, required: true },
      costCenter: { type: 'string', minLength: 1, required: true },
      chargeCode: { type: 'string', minLength: 1, required: true },
      nameExam: { type: 'string', minLength: 1, required: true },
      cost: { type: 'number', minimum: 1, required: true },
      locationExam: { type: 'string', minLength: 1, required: true },
      vendor: { type: 'string', minLength: 1, required: true },
      justification: { type: 'string', minLength: 1, required: true },
    },
  }
  return v.validate(instance, schema).valid
}

/**
 * Takes a training data object as an input and validates it's schema
 * @param {object} instance - data to validate
 * @return {boolean} does the data have the proper schema
 */
export const trainingSchemaIsValid = (instance) => {
  const v = new Validator()
  const schema = {
    id: 'trainingData',
    type: 'object',
    properties: {
      nameEmployee: { type: 'string', minLength: 1, required: true },
      emailEmployee: { type: 'string', minLength: 1, required: true },
      numberEmployee: { type: 'number', minimum: 1, required: true },
      locationEmployee: { type: 'string', minLength: 1, required: true },
      costCenter: { type: 'string', minLength: 1, required: true },
      chargeCode: { type: 'string', minLength: 1, required: true },
      nameCourse: { type: 'string', minLength: 1, required: true },
      cost: { type: 'number', minimum: 1, required: true },
      startDate: { type: 'string', minLength: 1, required: true },
      endDate: { type: 'string', minLength: 1, required: true },
      vendor: { type: 'string', minLength: 1, required: true },
      justification: { type: 'string', minLength: 1, required: true },
      comments: { type: 'string', minLength: 0, required: false },
    },
  }
  return v.validate(instance, schema).valid
}

/**
 * Takes a data object as an input and validates it's schema
 * @param {object} instance - data to validate
 * @return {boolean} does the data have a proper schema
 */
export const anySchemaIsValid = (instance) => (
  examSchemaIsValid(instance).valid || trainingSchemaIsValid(instance).valid
)

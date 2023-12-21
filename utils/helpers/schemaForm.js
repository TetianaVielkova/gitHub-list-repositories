import * as yup from 'yup';

const schema = yup.object({
  name: yup
    .string()
    .min(3, 'Too short name')
    .required('Repository name is required'),
  description: yup
    .string()
    .max(200, 'Maximum 200 characters'),
  updatedAt: yup
    .string()
    .required('Repository updatedAt is required'),
  primaryLanguage: yup
    .string()
    .required('Choose primary Language'),
  commitCount: yup
    .number()
    .positive('Commit count should be a positive number')
    .typeError('Commit count should be a number'),
  defaultBranch: yup
    .string()
});

export default schema;
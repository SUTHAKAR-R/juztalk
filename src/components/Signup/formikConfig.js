import * as Yup from 'yup'

export const initialValues = {
	userName: '',
	email: '',
	password: '',
	confirmPassword: ''
}

export const validationSchema = Yup.object().shape({
	userName: Yup.string().required('Required').matches(/^\S*$/, 'No spaces').min(3, 'Must be at least 3 characters'),
	email: Yup.string().email('Invalid email address').required('Required'),
	password: Yup.string().required('Required').min(8, 'Must be at least 8 characters'),
	confirmPassword: Yup.string().required('Required').oneOf([Yup.ref('password'), null], 'Passwords must match')
})
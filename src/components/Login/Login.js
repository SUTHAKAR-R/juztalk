import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Formik, Form } from 'formik'

import FormField from '../FormField'
import { initialValues, validationSchema } from './formikConfig'
import fb from '../../service/firebase'

const Login = () => {

	const history = useHistory()

	const [serverError, setServerError] = useState('')

	const login = async ({ email, password }, { setSubmitting }) => {
		try {

			const res = await fb.auth.signInWithEmailAndPassword(email, password)
			if (!res.user) setServerError('We are having problem logging you in. Please try again')

		} catch (err) {
			if (err.code === 'auth/wrong-password') {
				setServerError('Invalid Credentials')
			} else if (err.code === 'auth/user-not-found') {
				setServerError('No account found for this email')
			} else {
				setServerError('Something went wrong :(')
			}
		} finally {
			setSubmitting(false)
		}
	}

	return (
		<div className='auth-form'>
			<h1>Login</h1>
			<Formik
				onSubmit={login}
				validateOnMount={true}
				initialValues={initialValues}
				validationSchema={validationSchema}
			>
				{({ isValid, isSubmitting }) => (
					<Form>
						<FormField name='email' label='Email' type='email' />
						<FormField name='password' label='Password' type='password' />
						<div className='auth-link-container'>
							Need an account?
							<span onClick={() => history.push('/signup')} className='auth-link'>
								Signup!
							</span>
						</div>
						<button disabled={isSubmitting || !isValid} type='submit'>
							Login
						</button>
					</Form>
				)}
			</Formik>
			{ !!serverError && <div className='error'>{serverError}</div>}
		</div>
	)
}

export default Login

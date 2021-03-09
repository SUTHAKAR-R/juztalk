import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Formik, Form } from 'formik'

import { initialValues, validationSchema } from './formikConfig'
import FormField from '../FormField'
import fb from '../../service/firebase'


const Signup = () => {

	const history = useHistory()

	const [serverError, setServerError] = useState('')

	const signup = async ({ email, userName, password }, { setSubmitting }) => {
		try {

			const res = await fb.auth.createUserWithEmailAndPassword(email, password)

			if (res?.user?.uid) {

				try {
					const user = await fetch('api/createUser', {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify({
							userName,
							userId: res.user.uid
						})
					})

					if (user) {
						fb
							.firestore
							.collection('chatUsers')
							.doc(res.user.uid)
							.set({ avatar: '', userName })
					}

				} catch (err) {
					console.log(err, 'error requesting to chat engine api')
				}

			} else {
				setServerError('We are having trouble signing you in. Please try again.')
			}

		} catch (err) {
			if (err.code === 'auth/email-already-in-use') {
				setServerError('An account with email already exists')
			} else {
				setServerError('We are having trouble signing you in. Please try again.')
			}

		} finally {
			setSubmitting(false)
		}
	}

	return (
		<div className='auth-form'>
			<h1>Signup</h1>
			<Formik
				onSubmit={signup}
				validateOnMount={true}
				initialValues={initialValues}
				validationSchema={validationSchema}
			>
				{({ isValid, isSubmitting }) => (
					<Form>
						<FormField name='userName' label='Username' />
						<FormField name='email' label='Email' type='email' />
						<FormField name='password' label='Password' type='password' />
						<FormField name='confirmPassword' label='Confirm Password' type='password' />
						<div className='auth-link-container'>
							Already have an account?
							<span onClick={() => history.push('/login')} className='auth-link'>
								Log In!
							</span>
						</div>
						<button disabled={isSubmitting || !isValid} type='submit'>
							Sign Up
						</button>
					</Form>
				)}
			</Formik>
			{ !!serverError && <div className='error'>{serverError}</div>}
		</div>
	)
}

export default Signup

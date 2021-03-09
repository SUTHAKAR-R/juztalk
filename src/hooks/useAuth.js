import { useState, useEffect } from 'react'
import fb from '../service/firebase'

const useAuth = () => {

	const [authUser, setAuthUser] = useState()

	useEffect(() => {
		const unsubscribe = fb.auth.onAuthStateChanged(user => {
			if (user) {
				setAuthUser(user)
			} else {
				setAuthUser(null)
			}
		})
		return unsubscribe
	}, [])

	return {
		authUser
	}
}

export default useAuth
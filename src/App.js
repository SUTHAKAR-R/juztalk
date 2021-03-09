import { useEffect } from 'react'
import { Switch, Route, useHistory } from 'react-router-dom'

import Chat from './components/Chat'
import Login from './components/Login/Login'
import Signup from './components/Signup/Signup'

import useAuth from './hooks/useAuth'
import useResolved from './hooks/useResolved'

import ChatProvider from './context/ChatContext'

const App = () => {

	const history = useHistory()
	const { authUser } = useAuth()
	const authResolved = useResolved(authUser)

	useEffect(() => {
		if (authResolved) history.push(!!authUser ? '/' : '/login')
	}, [authResolved, authUser, history])

	return authResolved ? (
		<ChatProvider authUser={authUser}>
			<div className='app'>
				<Switch>
					<Route exact path='/' component={Chat} />
					<Route path='/login' component={Login} />
					<Route path='/signup' component={Signup} />
				</Switch>
			</div>
		</ChatProvider>
	) : <>Loading...</>
}

export default App
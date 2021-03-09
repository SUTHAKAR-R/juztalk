import { Loader } from 'semantic-ui-react'
import { useChat } from '../context/ChatContext'
import useResolved from '../hooks/useResolved'
import ChatList from './ChatList'
import RailHeader from './RailHeader'

const LefRail = () => {
	const { myChats, newChatClick } = useChat()
	const chatsResolved = useResolved(myChats)

	return (
		<div className='left-rail'>
			<RailHeader />
			{chatsResolved ? (
				<>
					{!!myChats.length ? (
						<div className='chat-list-container'>
							<ChatList />
						</div>
					) : (
						<div className='chat-list-container no-chats-yet'>
							<h3>No Chats Yet</h3>
						</div>
					)}
					<button className='create-chat-button' onClick={newChatClick}>
						New Chat
					</button>
				</>
			) : (
				<div className='chats-loading'>
					<Loader active size='huge' />
				</div>
			)}
		</div>
	)
}

export default LefRail

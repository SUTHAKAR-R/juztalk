import { useChat } from '../context/ChatContext'
import ChatAvatar from './ChatAvatar'
import groupMessages from '../helpers/groupMessages'
import useScrollToBottom from '../hooks/useScrollToBottom'

const MessageList = () => {

	const { selectedChat } = useChat()
	useScrollToBottom(selectedChat, 'chat-messages')

	return (
		<div className='chat-messages'>
			{!!selectedChat.messages.length ? (
				groupMessages(selectedChat.messages).map((message, i) => (
					<div key={i} className='chat-message'>
						<div className='chat-message-header'>
							<ChatAvatar
								username={message[0].sender.username}
								chat={selectedChat}
								className='message-avatar'
							/>
							<div className='message-author'>{message[0].sender.username}</div>
						</div>
						<div className='message-content'>
							{message.map((induvidulMessage, i) => (
								<div key={i}>
									<div className='message-text'>{induvidulMessage.text}</div>
									{!!induvidulMessage.attachments.lenght && (
										<img
											className='message-image'
											src={induvidulMessage.attachments[0].file}
											alt={induvidulMessage.id + '-attachment'}
										/>
									)}
								</div>
							))}
						</div>
					</div>
				))
			) : (
				<div className='no-messages-yet'>No Messages Yet</div>
			)}
		</div>
	)
}

export default MessageList

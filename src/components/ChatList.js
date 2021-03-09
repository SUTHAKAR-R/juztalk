import { Icon } from 'semantic-ui-react'

import { useChat } from '../context/ChatContext'
import notMe from '../helpers/notMe'
import joinUsernames from '../helpers/joinUsernames'
import ChatAvatar from './ChatAvatar'

const ChatList = () => {
	const {
		myChats,
		chatConfig,
		selectedChat,
		deleteChatClick,
		selectChatClick,
	} = useChat()

	return (
		<div className='chat-list'>
			{
				myChats.map((chat, i) => (
					<div
						key={i}
						className={`chat-list-item ${selectedChat?.id === chat.id ? 'selected-chat-item' : ''}`}
					>
						<div className='chat-list-item-content' onClick={() => selectChatClick(chat)}>
							{chat.people.length === 1 ? (
								<>
									<Icon circular inverted color='violet' name='user cancel' />
									<div className="chat-list-preview">
										<div className='preview-username'>No One Added yet</div>
									</div>
								</>
							) : chat.people.length === 2 ? (
								<>
									<ChatAvatar username={notMe(chatConfig, chat)} chat={chat} />
									<div className="chat-list-preview">
										<div className='preview-username'>{notMe(chatConfig, chat)}</div>
										<div className='preview-message'>
											{chat.last_message.attachments.length
												? `${chat.last_message.sender.username} sent an attachment`
												: chat.last_message.text.slice(0, 50) + '...'
											}
										</div>
									</div>
								</>

							) : (
								<>
									<Icon circular inverted color='brown' name='users' />
									<div className='preview-username'>
										{joinUsernames(chat.people, chatConfig.userName)}
									</div>
									<div className='preview-message'>
										{chat.last_message.attachments.length
											? `${chat.last_message.sender.username} sent an attachment`
											: chat.last_message.text.slice(0, 50) + '...'
										}
									</div>
								</>
							)}
						</div>
						<div onClick={() => deleteChatClick(chat)} className='chat-item-delete'>
							<Icon name='delete' />
						</div>
					</div>
				))
			}
		</div>
	)
}

export default ChatList

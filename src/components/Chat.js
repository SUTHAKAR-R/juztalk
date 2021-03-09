import { useEffect } from 'react'
import { getChats, ChatEngine } from 'react-chat-engine'

import { useChat } from '../context/ChatContext'
import LeftRail from './LefRail'
import ChatToolBar from './ChatToolBar'
import ChatInput from './ChatInput'
import MessageList from './MessageList'

const Chat = () => {
	const { myChats, setMyChats, chatConfig, selectedChat, setSelectedChat, selectChatClick } = useChat()

	useEffect(() => {
		console.log('My Chats: ', myChats)
	}, [myChats])

	return (
		<>
			<LeftRail />

			{!!chatConfig && (
				<ChatEngine
					hideUI={true}
					userSecret={chatConfig.userSecret}
					userName={chatConfig.userName}
					projectID={chatConfig.projectID}
					onConnect={() => {
						getChats(chatConfig, setMyChats)
					}}
					onNewChat={chat => {
						if (chat.admin.username === chatConfig.userName) selectChatClick(chat)
						setMyChats([...myChats, chat].sort((a, b) => a.id - b.id))
					}}
					onDeleteChat={chat => {
						if (selectedChat?.id === chat.id) setSelectedChat(null)
						setMyChats(myChats.filter(c => c.id !== chat.id).sort((a, b) => a.id - b.id))
					}}
					onNewMessage={(chatId, message) => {
						if (selectedChat && selectedChat.id === chatId) {
							setSelectedChat({
								...selectedChat,
								messages: [...selectedChat.messages, message]
							})
						}
						const chatThatMessageBelongsTo = myChats.find(c => c.id === chatId)
						const filteredChats = myChats.filter(c => c.id !== chatId)
						const updatedChat = {
							...chatThatMessageBelongsTo,
							last_message: message
						}
						setMyChats([updatedChat, ...filteredChats].sort((a, b) => a.id - b.id))
					}}
				/>
			)}

			<div className="chat-container">
				<div className="current-chat">
					{selectedChat ? (
						<div className='chat' >
							<ChatToolBar />
							<MessageList />
							<ChatInput />
						</div>
					) : (
						<div className="no-chat-selected">
							<img
								src="pointLeft.png"
								className="point-left"
								alt="point-left"
							/>
              					Select A Chat
						</div>
					)}
				</div>
			</div>
		</>
	)
}

export default Chat
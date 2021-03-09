import { createContext, useState, useEffect, useContext } from 'react'
import { deleteChat, leaveChat, newChat, getMessages } from 'react-chat-engine'
import fb from '../service/firebase'

const ChatContext = createContext()

const ChatProvider = ({ children, authUser }) => {

	const [chatConfig, setChatConfig] = useState()
	const [myChats, setMyChats] = useState()
	const [selectedChat, setSelectedChat] = useState()

	const newChatClick = () => {
		newChat(chatConfig, { title: '' })
	}

	const deleteChatClick = chat => {

		const isAdmin = chat.admin.username === chatConfig.userName

		if (isAdmin && window.confirm('Are you sure you want to delete this chat?')) {
			deleteChat(chatConfig, chat.id)
		} else if (window.confirm('Are you sure you want to leanve this chat?')) {
			leaveChat(chatConfig, chat.id, chatConfig.userName)
		}
	}

	const selectChatClick = chat => {
		getMessages(chatConfig, chat.id, messages => {
			setSelectedChat({
				...chat,
				messages
			})
		})
	}

	useEffect(() => {
		if (authUser) {
			fb
				.firestore
				.collection('chatUsers')
				.doc(authUser.uid)
				.onSnapshot(snap => {
					setChatConfig({
						userSecret: authUser.uid,
						userName: snap.data().userName,
						avatar: snap.data().avatar,
						projectID: '35e0ec3d-153d-4325-a760-6f978c897907'
					})
				})
		}
	}, [authUser])

	return (
		<ChatContext.Provider value={{
			myChats,
			setMyChats,
			selectedChat,
			setSelectedChat,
			chatConfig,
			setChatConfig,
			newChatClick,
			deleteChatClick,
			selectChatClick
		}} >
			{ children}
		</ChatContext.Provider>
	)
}

export const useChat = () => {
	const {
		myChats,
		setMyChats,
		selectedChat,
		setSelectedChat,
		chatConfig,
		setChatConfig,
		newChatClick,
		deleteChatClick,
		selectChatClick
	} = useContext(ChatContext)

	return {
		myChats,
		setMyChats,
		selectedChat,
		setSelectedChat,
		chatConfig,
		setChatConfig,
		newChatClick,
		deleteChatClick,
		selectChatClick
	}
}

export default ChatProvider
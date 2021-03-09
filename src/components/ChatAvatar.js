import { useState, useEffect } from 'react'
import { Image } from 'semantic-ui-react'

import { useChat } from '../context/ChatContext'
import fb from '../service/firebase'

const ChatAvatar = ({ chat, username, className }) => {
	const { chatConfig } = useChat()
	const [avatar, setAvatar] = useState('')

	useEffect(() => {
		fb
			.firestore
			.collection('chatUsers')
			.where('userName', '==', username)
			.get()
			.then(snap => {
				const data = snap.docs[0]?.data()
				if (data?.avatar) {
					setAvatar(data.avatar)
				}
			})

	}, [chat, chatConfig, username])

	return avatar ? (
		<Image className={className || 'chat-list-avatar'} src={avatar} />
	) : (
		<div className={className || 'empty-avatar'}>
			{username[0].toUpperCase()}
		</div>
	)
}

export default ChatAvatar

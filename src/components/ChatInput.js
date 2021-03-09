import { useState, useRef } from 'react'
import { Icon } from 'semantic-ui-react'
import { sendMessage } from 'react-chat-engine'

import { useChat } from '../context/ChatContext'
import ImageUpload from './ImageUpload'

const ChatInput = () => {
	const { chatConfig, selectedChat } = useChat()
	const [chatInputText, setChatInputText] = useState('')
	const [imageModalOpen, setImageModalOpen] = useState(false)
	const [image, setImage] = useState()

	const inputRef = useRef(null)

	const onFileAttach = file => {
		setImage(file)
		setImageModalOpen(true)
	}

	const sendChatMessage = () => {
		if (selectedChat && chatInputText) {
			setChatInputText('')
			sendMessage(chatConfig, selectedChat.id, {
				text: chatInputText,
				files: []
			})
		}
	}

	return (
		<>
			<div className='chat-controls'>
				<div
					className='attachment-icon'
					onClick={() => {
						const input = inputRef.current
						if (input) {
							input.value = ''
							input.click()
						}
					}}
				>
					<Icon name='attach' color='grey' />
				</div>
				<input
					className='chat-input'
					value={chatInputText}
					placeholder='Send a message'
					onKeyPress={e => {
						if (e.key === 'Enter') sendChatMessage()
					}}
					onChange={e => setChatInputText(e.target.value)}
				/>
				<div className='send-message-icon' onClick={sendChatMessage} >
					<Icon name='send' color='grey' />
				</div>
			</div>

			<input
				type="file"
				ref={inputRef}
				className="file-input"
				accept="image/jpeg,image/png"
				onChange={e => {
					const file = e.target?.files?.[0]
					if (file) onFileAttach(file)
				}}
			/>

			{imageModalOpen && !!image && (
				<ImageUpload
					file={image}
					close={() => setImageModalOpen(false)}
					onSubmit={() => {
						sendMessage(
							chatConfig,
							selectedChat.id,
							{
								text: chatInputText,
								files: [image]
							},
							() => {
								setImage(null)
								setChatInputText('')
							}
						)
					}}
				/>
			)}
		</>
	)
}

export default ChatInput

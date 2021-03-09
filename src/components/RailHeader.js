import { useRef, useState } from 'react'
import { Icon, IconGroup, Image, Loader } from 'semantic-ui-react'

import fb from '../service/firebase'
import { useChat } from '../context/ChatContext'
import useResolved from '../hooks/useResolved'
import ImageUpload from './ImageUpload'

const RailHeader = () => {

	const { chatConfig } = useChat()
	const configResolved = useResolved(chatConfig)
	const inputRef = useRef(null)
	const [image, setImage] = useState()

	return (
		<>
			<input
				type='file'
				className='file-input'
				ref={inputRef}
				accept='image/jpeg,image/png,image/jpg'
				onChange={e => {
					const file = e.target?.files?.[0]
					if (file) setImage(file)
				}}
			/>

			{!!image && (
				<ImageUpload
					crop
					file={image}
					header='Set Your Avatar'
					close={() => setImage(null)}
					onSubmit={(croppedImage) => {
						const storageRef = fb.storage.ref()
						const uploadRef = storageRef.child(
							`${chatConfig.userSecret}_avatar.jpg`
						)
						uploadRef.put(croppedImage).then(() => {
							uploadRef.getDownloadURL().then(url => {
								fb
									.firestore
									.collection('chatUsers')
									.doc(chatConfig.userSecret)
									.update({ avatar: url })
									.then(() => setImage(null))
							})
						})
					}}
				/>
			)}

			<div className='left-rail-header'>
				<Icon className='sign-out' name='sign out' onClick={() => fb.auth.signOut()} />
				{configResolved && !!chatConfig ? (
					<div className='current-user-info'>
						<IconGroup
							onClick={() => {
								const input = inputRef.current;
								if (input) {
									input.value = '';
									input.click();
								}
							}}
							className="user-avatar"
							size="large"
						>
							{chatConfig.avatar ? (
								<Image src={chatConfig.avatar} avatar />
							) : (
								<div className="empty-avatar">
									{chatConfig.userName[0].toUpperCase()}
								</div>
							)}

							<Icon corner name="camera" inverted circular />
						</IconGroup>
						<div className="current-username">@{chatConfig.userName}</div>
					</div>
				) : (
					<div className='user-loading'>
						<Loader active size='smaill' />
					</div>
				)}
			</div>
		</>
	)
}

export default RailHeader

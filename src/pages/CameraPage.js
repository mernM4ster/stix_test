import { useState, useRef, useEffect } from 'react';
import { Camera } from 'react-camera-pro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowsRotate } from '@fortawesome/free-solid-svg-icons';

const CameraPage = ({onCheck}) => {
	const [image, setImage] = useState(null);
  const [numberOfCameras, setNumberOfCameras] = useState(0);
  const cam = useRef(null);

	const onTakePhoto = () => {
		const photo = cam.current.takePhoto();
		setImage(photo);
		onCheck(true)
	}

	return (
		<div className='fixed w-full h-full z-10'>
			<Camera ref={cam} numberOfCamerasCallback={setNumberOfCameras} />
			<div className='fixed bottom-0 w-full h-40 p-8 flex items-center justify-between bg-black bg-opacity-80'>
				<img className='w-16 h-16' src={image} />
				<button
					className='text-white text-2xl'
					onClick={onTakePhoto}
				><div className='w-16 h-16 bg-white rounded-full'></div></button>
				<button
					className='text-white'
					hidden={numberOfCameras <= 1}
					onClick={() => {
						cam.current.switchCamera();
					}}
				><FontAwesomeIcon size='2xl' icon={faArrowsRotate} /></button>
			</div>
		</div>
	)
}

export default CameraPage;
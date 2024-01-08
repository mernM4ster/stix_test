import { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Stats from 'stats.js';
import AR from 'js-aruco/src/aruco';
import CV from 'js-aruco/src/cv';

const CameraPage = () => {
  const navigate = useNavigate();
	const videoRef = useRef(null);
	const canvasRef = useRef(null);
	const mediaStreamRef = useRef();
	
	const onTakePhoto = () => {
		navigate(`/result`);
	}

	useEffect(() => {
		const video = videoRef.current;
    const stats = new Stats();
    stats.showPanel( 0 ); // 0: fps, 1: ms, 2: mb, 3+: custom
    document.getElementById("camera-section").appendChild( stats.dom );
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    let imageData;
    let detector;

    // const animate = () => {
    //   stats.begin();
    //   stats.end();
    //   requestAnimationFrame(animate);
    // }

    const onLoad = () => {
      canvas.width = parseInt(canvas.style.width);
      canvas.height = parseInt(canvas.style.height);

      video.addEventListener('loadedmetadata', () => {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        detector = new AR.Detector({
          dictionaryName: 'ARUCO',
        });
        requestAnimationFrame(tick);
      });

      navigator.mediaDevices
        .getUserMedia({ video: {facingMode: 'environment'} })
        .then(function (stream) {
          if ('srcObject' in video) {
            mediaStreamRef.current = stream;
            video.srcObject = stream;
          } else {
            video.src = window.URL.createObjectURL(stream);
          }
        })
        .catch(function (err) {
          console.log(err.name + ': ' + err.message);
        });
    };

    const tick = () => {
      requestAnimationFrame(tick);

      stats.begin();
      if (video.readyState === video.HAVE_ENOUGH_DATA) {
        snapshot();

        const markers = detector.detect(imageData);
				drawWarps(detector.grey, markers, 0, parseInt(video.height) * 2 + 20);
        // drawCorners(markers);
        // drawId(markers);
      }
      stats.end();

    };

		const drawWarps = (imageSrc, contours, x, y) => {
      var i = contours.length, j, contour;
			const warpImage = context.createImageData(49, 49);
			const homographyImage = new CV.Image();
      
      var offset = ( canvas.width - ( (warpImage.width + 10) * contours.length) ) / 2
      while(i --){
        contour = contours[i].corners;
        
        CV.warp(imageSrc, homographyImage, contour, warpImage.width);
        // context.putImageData( createImage(homographyImage, warpImage), offset + i * (warpImage.width + 10), y);
        
        CV.threshold(homographyImage, homographyImage, CV.otsu(homographyImage) );
        context.putImageData( createImage(homographyImage, warpImage), offset + i * (warpImage.width + 10), y + 60);
      }
    }

		const createImage = (src, dst) => {
      var i = src.data.length, j = (i * 4) + 3;
      
      while(i --){
        dst.data[j -= 4] = 255;
        dst.data[j - 1] = dst.data[j - 2] = dst.data[j - 3] = src.data[i];
      }
      
      return dst;
    };

    const snapshot = () => {
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    };

    const drawCorners = (markers) => {
      context.lineWidth = 3;

      for (let i = 0; i !== markers.length; ++i) {
        const corners = markers[i].corners;

        context.strokeStyle = 'red';
        context.beginPath();

        for (let j = 0; j !== corners.length; ++j) {
          const corner = corners[j];
          context.moveTo(corner.x, corner.y);
          const nextCorner = corners[(j + 1) % corners.length];
          context.lineTo(nextCorner.x, nextCorner.y);
        }

        context.stroke();
        context.closePath();

        context.strokeStyle = 'green';
        context.strokeRect(
          corners[0].x - 2,
          corners[0].y - 2,
          4,
          4
        );
      }
    };

    const drawId = (markers) => {
      context.strokeStyle = 'blue';
      context.lineWidth = 1;

      for (let i = 0; i !== markers.length; ++i) {
        const corners = markers[i].corners;

        let x = Infinity;
        let y = Infinity;

        for (let j = 0; j !== corners.length; ++j) {
          const corner = corners[j];

          x = Math.min(x, corner.x);
          y = Math.min(y, corner.y);
        }

        context.strokeText(markers[i].id, x, y);
      }
    };

    onLoad();
    // requestAnimationFrame( animate );

    return () => {
      if (mediaStreamRef.current && mediaStreamRef.current.getTracks) {
        mediaStreamRef.current.getTracks().forEach((track) => {
          track.stop();
        });
      }
      // Clean up any resources or event listeners here
    };
  }, []);

	return (
		<div id='camera-section' className='fixed w-full h-full z-10'>
			<div className='w-full h-full flex justify-center items-center'>
				<video className='w-full h-full object-cover hidden' ref={videoRef} autoPlay playsInline />
				<canvas ref={canvasRef} className="w-full h-full object-cover"></canvas>
			</div>
			<div className='fixed bottom-0 w-full h-40 p-8 flex items-center justify-center'>
				{/* <img className='w-16 h-16' src={image} /> */}
				<button
					className='text-white text-2xl'
					// onClick={onTakePhoto}
					onClick={onTakePhoto}
				><div className='w-16 h-16 bg-white rounded-full'></div></button>
				{/* <button
					className='text-white'
					hidden={numberOfCameras <= 1}
					onClick={() => {
						cam.current.switchCamera();
					}}
				><FontAwesomeIcon size='2xl' icon={faArrowsRotate} /></button> */}
			</div>
		</div>
	)
}

export default CameraPage;
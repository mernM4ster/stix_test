import { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Stats from 'stats.js';
import AR from 'js-aruco/src/aruco';
import CV from 'js-aruco/src/cv';

const CameraPage = () => {
  const navigate = useNavigate();
	const videoRef = useRef(null);
	const canvasRef = useRef(null);
	const mediaStreamRef = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isVideo, setIsVideo] = useState(0);
	
	const onTakePhoto = () => {
    setIsLoading(true);
    setTimeout(() => {
      navigate(`/result`);
    }, 2000)
	}

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    console.log("file", file)
    setSelectedImage(URL.createObjectURL(file));
    setIsLoading(true);
    setTimeout(() => {
      navigate(`/result`);
    }, 2000)
  };

	useEffect(() => {
    console.log(isVideo)
    if(isVideo === 1){
      const video = videoRef.current;
      const stats = new Stats();
      stats.showPanel( 0 ); // 0: fps, 1: ms, 2: mb, 3+: custom
      document.getElementById("camera-section").appendChild( stats.dom );
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      let imageData;
      let detector;
  
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
            const fileInput = document.createElement("input");
            fileInput.type = "file";
            fileInput.accept = "image/*";
            fileInput.capture = "camera";
            fileInput.click();
  
            fileInput.addEventListener("change", (event) => {
              handleImageUpload(event);
              fileInput.remove();
            });
  
            fileInput.addEventListener("cancel", () => {
              navigate(-1)
              fileInput.remove();
              toast.error("You have to take a photo or upload image", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                progress: undefined,
                theme: "dark"
              })
            });
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
  
      onLoad();
    } else {
      setIsVideo(isVideo + 1)
    }
    // requestAnimationFrame( animate );

    return () => {
      if (mediaStreamRef.current && mediaStreamRef.current.getTracks) {
        mediaStreamRef.current.getTracks().forEach((track) => {
          track.stop();
        });
      }
      // Clean up any resources or event listeners here
    };
  }, [isVideo]);

	return (
    <>
    <input type="file" capture="camera" accept="image/*">Pic</input>
    {
      !isLoading
        ? <div id='camera-section' className='fixed w-full h-full z-10 right-0'>
            <div className='w-full h-full flex justify-center items-center'>
              <video className='w-full h-full object-cover hidden' ref={videoRef} autoPlay playsInline />
              <canvas ref={canvasRef} className="w-full h-full object-cover"></canvas>
            </div>
            <div className='fixed bottom-0 w-full h-40 p-8 flex items-center justify-center'>
              <button
                className='text-white text-2xl'
                onClick={onTakePhoto}
              ><div className='w-16 h-16 bg-white rounded-full'></div></button>
            </div>
          </div>
        : <div className='w-full h-full bg-[#e8e4f2] flex items-center justify-center beatrice-font text-[#6e66bc]'>Scan Animation</div>
    }
    </>
	)
}

export default CameraPage;
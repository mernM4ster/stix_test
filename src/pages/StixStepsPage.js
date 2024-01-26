import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import PurpleBtn from '../Components/PurpleBtn';
import TransparentBtn from '../Components/TransParentBtn';
import { UTI_STEPS } from '../const/const';

import StixTestImg from "../assets/img/stix-uti-test.png";
import AlertMP3 from "../assets/audio/alert.mp3";

const StixStepsPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
	const [currentStep, setCurrentStep] = useState(0);
	const [timer, setTimer] = useState(5);
	const [timerId, setTimerId] = useState(null);
  const [min, setMin] = useState("0");
  const [sec, setSec] = useState("00");
  const [onAudio, setOnAudio] = useState(true);
  const [isAlarmStart, setIsAlarmStart] = useState(false);
  const audioElement = new Audio(AlertMP3);
  audioElement.loop = true

  const onNextBtn = () => {
    if (currentStep < UTI_STEPS.length) {
      navigate(`/uti?step=${currentStep + 1}`);
      if (currentStep === 3 && timerId === null && timer > 0) {
        const current = Math.floor(Date.now() / 1000);
        localStorage.setItem("target", current + 5);
        const newTimerId = setInterval(onTimer, 1000);
        localStorage.setItem("timerId", newTimerId);
        setTimerId(newTimerId);
      }
    } else {
      localStorage.setItem("timerId", null);
      console.log(isAlarmStart)
      isAlarmStart && audioElement.pause();
      navigate(`/camera`);
		}
  }

  const onPrevBtn = () => {
    if (currentStep > 0) {
      navigate(`/uti?step=${currentStep - 1}`);
    }
  }

  const onTimer = () => {
    const current = Math.floor(Date.now() / 1000);
    const target = parseInt(localStorage.getItem("target"));
    setTimer(target - current);
  }

  const switchAudio = (flag) => {
    setOnAudio(flag);
    audioElement.pause();
  }

  const playAlarm = () => {
    setIsAlarmStart(true);
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const source = audioContext.createMediaElementSource(audioElement);
    source.connect(audioContext.destination);
    audioElement.play();
    setTimeout(() => {
      audioElement.pause();
      setIsAlarmStart(false);
    }, 5000);
  };

  useEffect(() => {
    if (timerId) {
      if (timer <= 0) {
        clearInterval(timerId);
        if (onAudio) {
          setTimeout(playAlarm, 100);
        } 
        // setTimerId(null)
        setSec("00");
        localStorage.setItem("timerId", null);
        localStorage.setItem("timer", 0);
      } else {
        localStorage.setItem("timer", timer);
        const newMin = Math.floor(timer / 60);
        const newSec = timer % 60;
        setMin(newMin.toString());
        setSec(newSec < 10 ? `0${newSec}` : newSec.toString())
      }
    } else {
      setTimer(5);
    }
  }, [timer, timerId])

  useEffect(() => {
    if (searchParams.get("step")) {
      setCurrentStep(parseInt(searchParams.get("step")));
    }
  }, [searchParams])

  useEffect(() => {
    if (localStorage.getItem("timerId") !== "null" && localStorage.getItem("timerId") !== null) {
      clearInterval(parseInt(localStorage.getItem("timerId")));
      setTimer(localStorage.getItem("timer") * 1);
      const newTimerId = setInterval(onTimer, 1000);
      localStorage.setItem("timerId", newTimerId)
      setTimerId(newTimerId);
    }
  }, [])


	return (
		<>
    <button onClick={playAlarm}>alert</button>
      <div className='relative w-full xxs:h-48 xs:h-60 px-4 py-10 bg-[#e8e4f2] relative flex flex-col items-center justify-center text-4xl font-bold'>
				{
					!!timerId && 
            <div className={`absolute top-4 py-2 px-4 rounded-full ${timer ? "bg-black" : "bg-red-600"} text-white beatrice-font font-bold xxxs:text-sm xxs:text-lg xs:text-2xl flex justify-center leading-none`}>
              <span>{min}:{sec}</span>
              {
                onAudio
                  ? <button className='mt-[1px] ml-2' onClick={() => switchAudio(false)}><i className="fi fi-rs-volume"></i></button>
                  : <button className='mt-[1px] ml-2' onClick={() => switchAudio(true)}><i className="fi fi-rs-volume-mute"></i></button>
              }
            </div>
				}
        {
          currentStep === 0
            ? <>
              <div className='text-[#1a618d] beatrice-font' >Stix UTI</div>
              <div className='domaine-bold xxxs:mb-16 xxs:mb-0'>Test & Treat</div>
            </>
            : <div className='text-center beatrice-font text-[#6e66bc] xxxs:text-base xxs:text-xl xs:text-2xl'>{UTI_STEPS[currentStep - 1].img_alt}</div>
        }
        {
          currentStep === 0 &&
            <img className='absolute xxxs:w-20 xxs:w-48 xs:w-60 top-40' src={StixTestImg} alt='stix-uti-test' />
        }
      </div>
      <div className='bg-[#fff4ea] flex-1 flex flex-col pb-6 px-4'>
        {
          currentStep > 0 &&
            <div className='flex flex-col items-center xxs:mb-8 xs:mb-16'>
              <div className='flex my-4'>
                {
                  Array.from({length: 6}).map((_, index) =>
                    <div key={index} className={`w-2 h-2 rounded-full mx-2 ${index + 1 <= currentStep ? "bg-[#6e66bc]" : "bg-[#d9d9d9]"}`}></div>
                  )
                }
              </div>
              <span className='domaine-regular xxxs:text-sm xxs:text-lg xs:text-2xl xxxs:mb-2 xxs:mb-4 xs:mb-6'>Step {currentStep}</span>
              <div className='w-full beatrice-font xxxs:text-sm xxs:text-lg xxs:leading-tight xs:text-2xl font-bold text-left xxs:mb-2 xs:mb-4'>{UTI_STEPS[currentStep - 1].title}</div>
              <div className='w-full domaine-regular xxxs:text-sm xxs:text-lg xxs:leading-tight xs:text-2xl text-left'>{UTI_STEPS[currentStep - 1].description}</div>
            </div>
        }
        <div className='flex-1'></div>
        <div className=''>
            <PurpleBtn func={onNextBtn} >
              {
                currentStep === 0
                  ? "Get Started"
                  : UTI_STEPS[currentStep - 1].next_btn
              }
            </PurpleBtn>
            {
              currentStep > 0 && currentStep < UTI_STEPS.length &&
                <TransparentBtn className="mt-2" func={onPrevBtn} > 
                  <FontAwesomeIcon className='mr-2' icon={faArrowLeft} />
                  Go Back
                </TransparentBtn>
            }
        </div>
      </div>
		</>
	)
}

export default StixStepsPage;
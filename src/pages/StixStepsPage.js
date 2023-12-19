import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import PurpleBtn from '../Components/PurpleBtn';
import TransparentBtn from '../Components/TransParentBtn';
import { UTI_STEPS } from '../const/const';

import StixTestImg from "../assets/img/stix-uti-test.png";

const StixStepsPage = ({onCamera}) => {
	const [currentStep, setCurrentStep] = useState(0);
	const [timer, setTimer] = useState(115);
	const [timerId, setTimerId] = useState(null);
  const [min, setMin] = useState("0");
  const [sec, setSec] = useState("00");

  const onNextBtn = () => {
    if (currentStep < UTI_STEPS.length) {
      setCurrentStep(currentStep + 1);
      if (currentStep === 3 && timerId === null && timer > 0) {
        setTimerId(setInterval(onTimer, 1000));
      }
    } else {
			onCamera(true);
		}
  }

  const onPrevBtn = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  }

  const onTimer = () => setTimer(oldTimer => oldTimer - 1);

  useEffect(() => {
    if (timer === 0) {
      clearInterval(timerId);
      setTimerId(null)
    } else {
      const newMin = Math.floor(timer / 60);
      const newSec = timer % 60;
      setMin(newMin.toString());
      setSec(newSec < 10 ? `0${newSec}` : newSec.toString())
    }
  }, [timer])

	return (
		<>
      <div className='relative w-full h-60 px-4 py-10 bg-[#e8e4f2] relative flex flex-col items-center justify-center text-4xl font-bold'>
				{
					!!timerId && <div className='absolute top-4 py-2 px-4 rounded-full bg-black text-white beatrice-font font-bold text-2xl'>{min}:{sec}</div>
				}
        {
          currentStep === 0
            ? <>
              <div className='text-[#1a618d] beatrice-font' >Stix UTI</div>
              <div className='domaine-bold xxxs:mb-16 xxs:mb-0'>Test & Treat</div>
            </>
            : <div className='text-center beatrice-font text-[#6e66bc] text-2xl'>{UTI_STEPS[currentStep - 1].img_alt}</div>
        }
        {
          currentStep === 0 &&
            <img className='absolute xxxs:w-20 xxs:w-48 xs:w-60 top-40' src={StixTestImg} alt='stix-uti-test' />
        }
      </div>
      <div className='bg-[#fff4ea] flex-1 flex flex-col pb-10 px-4'>
        {
          currentStep > 0 &&
            <div className='flex flex-col items-center mb-16'>
              <div className='flex my-4'>
                {
                  Array.from({length: 6}).map((_, index) =>
                    <div key={index} className={`w-4 h-4 rounded-full mx-2 ${index + 1 <= currentStep ? "bg-[#6e66bc]" : "bg-[#d9d9d9]"}`}></div>
                  )
                }
              </div>
              <span className='domaine-regular text-2xl mb-6'>Step {currentStep}</span>
              <div className='w-full beatrice-font text-2xl font-bold text-left mb-4'>{UTI_STEPS[currentStep - 1].title}</div>
              <div className='w-full domaine-regular text-2xl text-left'>{UTI_STEPS[currentStep - 1].description}</div>
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
                <TransparentBtn className="mt-4" func={onPrevBtn} > 
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
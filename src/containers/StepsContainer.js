import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import PurpleBtn from "../Components/PurpleBtn";
import TransparentBtn from "../Components/TransParentBtn";

const StepsContainer = ({STEPS, onCamera, goToSymptom, setStep}) => {
	const [currentStep, setCurrentStep] = useState(0);

	const onNextBtn = () => {
    if (currentStep + 1 < STEPS.length) {
      setCurrentStep(currentStep + 1);
			setStep(currentStep + 1)
    } else {
			onCamera(true);
		}
  }

  const onPrevBtn = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
			setStep(currentStep - 1);
    } else {
			goToSymptom()
		}
  }

	return (
		<>
			<div className='flex flex-col items-center mb-16'>
				<div className='flex my-4'>
					{
						Array.from({length: STEPS.length}).map((_, index) =>
							<div key={index} className={`w-4 h-4 rounded-full mx-2 ${index <= currentStep ? "bg-[#6e66bc]" : "bg-[#d9d9d9]"}`}></div>
						)
					}
				</div>
				<span className='domaine-regular text-2xl mb-6'>Step {currentStep + 1}</span>
				<div className='w-full beatrice-font text-2xl font-bold text-left mb-4'>{STEPS[currentStep].title}</div>
				<div className='w-full domaine-regular text-2xl text-left'>{STEPS[currentStep].description}</div>
			</div>
			<div className='flex-1'></div>
			<div className=''>
					<PurpleBtn func={onNextBtn} >
						{ STEPS[currentStep].next_btn }
					</PurpleBtn>
					{
						currentStep < STEPS.length - 1 &&
							<TransparentBtn className="mt-4" func={onPrevBtn} > 
								<FontAwesomeIcon className='mr-2' icon={faArrowLeft} />
								Go Back
							</TransparentBtn>
					}
			</div>
		</>
	);
}

export default StepsContainer;
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import PurpleBtn from "../Components/PurpleBtn";
import TransparentBtn from "../Components/TransParentBtn";

const StepsContainer = ({STEPS, goToSymptom}) => {
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	const [currentStep, setCurrentStep] = useState(1);

	const onNextBtn = () => {
    if (currentStep < STEPS.length) {
			navigate(`/ph?stage=step&step=${currentStep + 1}`);
    } else {
			navigate(`/camera`);
		}
  }

  const onPrevBtn = () => {
    if (currentStep > 1) {
			navigate(`/ph?stage=step&step=${currentStep - 1}`);
    } else {
			goToSymptom()
		}
  }

  useEffect(() => {
    if (searchParams.get("step")) {
      setCurrentStep(parseInt(searchParams.get("step")));
    }
  }, [searchParams])

	return (
		<>
			<div className='flex flex-col items-center xxs:mb-8 xs:mb-16'>
				<div className='flex my-4'>
					{
						Array.from({length: STEPS.length}).map((_, index) =>
							<div key={index} className={`w-2 h-2 rounded-full mx-2 ${index + 1 <= currentStep ? "bg-[#6e66bc]" : "bg-[#d9d9d9]"}`}></div>
						)
					}
				</div>
				<span className='domaine-regular xxxs:text-sm xxs:text-lg xs:text-2xl xxxs:mb-2 xxs:mb-4 xs:mb-6'>Step {currentStep}</span>
				<div className='w-full beatrice-font xxxs:text-sm xxs:text-lg xs:text-2xl font-bold text-left xxs:mb-2 xs:mb-4'>{STEPS[currentStep - 1].title}</div>
				<div className='w-full domaine-regular xxxs:text-sm xxs:text-lg xs:text-2xl text-left'>{STEPS[currentStep - 1].description}</div>
			</div>
			<div className='flex-1'></div>
			<div className=''>
					<PurpleBtn func={onNextBtn} >
						{ STEPS[currentStep - 1].next_btn }
					</PurpleBtn>
					{
						currentStep < STEPS.length &&
							<TransparentBtn className="mt-2" func={onPrevBtn} > 
								<FontAwesomeIcon className='mr-2' icon={faArrowLeft} />
								Go Back
							</TransparentBtn>
					}
			</div>
		</>
	);
}

export default StepsContainer;
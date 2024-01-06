import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import PurpleBtn from "../Components/PurpleBtn";
import TransparentBtn from "../Components/TransParentBtn";
import { SYMPTOMS } from "../const/const";
import SmileImg from "../assets/img/smile.png";

const SymptomContainer = ({goToStep, goToHome}) => {
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	const [currentStep, setCurrentStep] = useState(0);
	const [selectedItems, setSelectedItems] = useState([[], [], []]);
	const [state, setState] = useState(0);

	const onNextBtn = () => {
		if (state === 0) {
			setState(1);
		} else if (state === 1) {
			if (currentStep < SYMPTOMS.length) {
				navigate(`/ph?stage=symptom&step=${currentStep + 1}`);
			} else {
				setState(2);
			}
		} else {
			goToStep();
		}
  }

  const onPrevBtn = () => {
    if (currentStep > 1) {
      navigate(`/ph?stage=symptom&step=${currentStep - 1}`);
    } else {
			goToHome()
		}
  }

	const onSelect = (step, index) => {
		console.log(step, index)
		if (selectedItems[step].indexOf(index) > -1) {
			const newSelectedItems = selectedItems.map((group, i) => {
				if (i === step) {
					return group.filter(item => item !== index)
				} else return group;
			});
			console.log(newSelectedItems)
			setSelectedItems(newSelectedItems)
		} else {
			const newSelectedItems = selectedItems.map((group, i) => {
				if (i === step) {
					group.push(index)
					return group
				} else return group;
			});
			console.log(newSelectedItems)
			setSelectedItems(newSelectedItems)
		}
	}

	useEffect(() => {
    if (searchParams.get("step")) {
      setCurrentStep(parseInt(searchParams.get("step")));
    }
  }, [searchParams])

	return (
		<>
			{
				state === 0 &&
					<div className="flex-1 flex flex-col py-4 items-center justify-center text-center beatrice-font xxxs:text-base xxs:text-xl xs:text-3xl font-bold">
						<img className="mb-6" src={SmileImg} alt="smile" />
						<div className="mb-6">Before we get started, we have a few questions about your symptoms.</div>
						<div className="">Ready?</div>
					</div>	
			}
			{
				state === 1 &&
					<div className='flex-1 flex flex-col items-center xxxs:mb-4 xxs:mb-8 xs:mb-16 text-center'>
						<div className='flex xxxs:my-2 xxs:my-4'>
							{
								Array.from({length: SYMPTOMS.length}).map((_, index) =>
									<div key={index} className={`w-2 h-2 rounded-full mx-2 ${index + 1 <= currentStep ? "bg-[#6e66bc]" : "bg-[#d9d9d9]"}`}></div>
								)
							}
						</div>
						<div className="domaine-regular xxxs:text-base xxs:text-xl xs:text-2xl xxxs:mb-2 xxs:mb-4">Symptoms</div>
						<div className="beatrice-font xxxs:text-base xxs:text-xl xs:text-3xl font-bold xxxs:mb-2 xxs:mb-6">{SYMPTOMS[currentStep - 1].title}</div>
						<div className="domaine-regular xxxs:text-base xxs:text-xl xs:text-2xl xxxs:mb-2 xxs:mb-6">How would you describe the texture of your infection?</div>
						<div className="w-full flex flex-col domaine-bold xxxs:text-base xxs:text-xl xs:text-2xl">
							{
								SYMPTOMS[currentStep - 1].options.map((option, index) => 
									<div key={index} className={`xxxs:p-1 xxs:p-2 xs:p-4 rounded-full mb-2 border-2  ${selectedItems[currentStep - 1].length && selectedItems[currentStep - 1].indexOf(index) > -1 ? "bg-black text-white border-black" : "border-black"}`} onClick={() => onSelect(currentStep, index)}>{option}</div>
								)
							}
						</div>
					</div>
			}
			{
				state === 2 &&
					<div className="flex-1 flex flex-col py-4 items-center justify-center text-center beatrice-font xxxs:text-base xxs:text-xl xs:text-3xl font-bold">
						<img className="mb-6" src={SmileImg} alt="smile" />
						<div className="mb-6">Ok, it's time to take the test.</div>
						<div className="">Ready?</div>
					</div>
			}
			<div className="">
				<PurpleBtn func={onNextBtn}>Next</PurpleBtn>
				<TransparentBtn className="mt-2" func={onPrevBtn} > 
					<FontAwesomeIcon className='mr-2' icon={faArrowLeft} />
					Go Back
				</TransparentBtn>
			</div>
		</>
	);
}

export default SymptomContainer;
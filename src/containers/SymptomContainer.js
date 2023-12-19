import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import PurpleBtn from "../Components/PurpleBtn";
import TransparentBtn from "../Components/TransParentBtn";
import { SYMPTOMS } from "../const/const";

const SymptomContainer = ({goToStep, isBack, goToHome}) => {
	const [currentStep, setCurrentStep] = useState(isBack ? SYMPTOMS.length - 1 : 0);
	const [selectedItems, setSelectedItems] = useState([[], [], []]);

	const onNextBtn = () => {
    if (currentStep + 1 < SYMPTOMS.length) {
      setCurrentStep(currentStep + 1);
    } else {
			goToStep();
		}
  }

  const onPrevBtn = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
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

	return (
		<>
			<div className='flex flex-col items-center mb-16 text-center'>
				<div className='flex my-4'>
					{
						Array.from({length: SYMPTOMS.length}).map((_, index) =>
							<div key={index} className={`w-4 h-4 rounded-full mx-2 ${index <= currentStep ? "bg-[#6e66bc]" : "bg-[#d9d9d9]"}`}></div>
						)
					}
				</div>
				<div className="domaine-regular text-xl mb-4">Symptoms</div>
				<div className="beatrice-font text-3xl font-bold mb-6">{SYMPTOMS[currentStep].title}</div>
				<div className="domaine-regular text-xl mb-6">How would you describe the texture of your infection?</div>
				<div className="w-full flex flex-col domaine-bold text-2xl">
					{
						SYMPTOMS[currentStep].options.map((option, index) => 
							<div key={index} className={`p-4 rounded-full mb-2 border-2  ${selectedItems[currentStep].length && selectedItems[currentStep].indexOf(index) > -1 ? "bg-black text-white border-black" : "border-black"}`} onClick={() => onSelect(currentStep, index)}>{option}</div>
						)
					}
				</div>
			</div>
			<div className="">
				<PurpleBtn func={onNextBtn}>Next</PurpleBtn>
				<TransparentBtn className="mt-4" func={onPrevBtn} > 
					<FontAwesomeIcon className='mr-2' icon={faArrowLeft} />
					Go Back
				</TransparentBtn>
			</div>
		</>
	);
}

export default SymptomContainer;
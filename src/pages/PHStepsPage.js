import { useState } from "react";
import PurpleBtn from "../Components/PurpleBtn";
import SymptomContainer from "../containers/SymptomContainer";
import StepsContainer from "../containers/StepsContainer";
import { PH_STEPS } from "../const/const";
import StixPHTestImg from "../assets/img/stix-ph-test.png";

const PHStepsPage = ({onCamera}) => {
	const [isSymptom, setIsSymptom] = useState(false);
	const [step, setStep] = useState(0);
	const [isStep, setIsStep] = useState(false);
	const [isBack, setIsBack] = useState(false);

	const goToHome = () => {
		setIsStep(false);
		setIsSymptom(false);
		setIsBack(false)
	}

	const goToStep = () => {
		setIsStep(true);
		setIsSymptom(false);
		setIsBack(false)
	}
	
	const goToSymptom = () => {
		setIsStep(false);
		setIsSymptom(true);
		setIsBack(true)
	}

	return (
		<>
			{
				!isSymptom &&
					<div className='relative w-full h-60 px-4 py-10 bg-[#e8e4f2] relative flex flex-col items-center justify-center text-4xl font-bold'>
						{
							!isStep
								? <>
									<div className='text-[#ff9068] beatrice-font' >Stix pH</div>
									<div className='domaine-bold xxxs:mb-16 xxs:mb-0'>Test & Treat</div>
								</>
								: <div className='text-center beatrice-font text-[#6e66bc] text-2xl'>{PH_STEPS[step].img_alt}</div>
						}
						{
							!isStep &&
								<img className='absolute xxxs:w-20 xxs:w-48 xs:w-60 top-40' src={StixPHTestImg} alt='stix-uti-test' />
						}
					</div>
			}
			<div className='bg-[#fff4ea] flex-1 flex flex-col pb-10 px-4'>
				{
					!isSymptom && !isStep && 
						<>
							<div className="flex-1"></div>
							<PurpleBtn func={() => setIsSymptom(true)} >Get Started</PurpleBtn>
						</>
				}
				{
					isSymptom && <SymptomContainer goToStep={goToStep} isBack={isBack} goToHome={goToHome} />
				}
				{
					isStep && <StepsContainer STEPS={PH_STEPS} onCamera={onCamera} goToSymptom={goToSymptom} setStep={setStep} />
				}
			</div>
		</>
	);
}

export default PHStepsPage;
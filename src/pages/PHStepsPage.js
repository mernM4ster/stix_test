import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import PurpleBtn from "../Components/PurpleBtn";
import SymptomContainer from "../containers/SymptomContainer";
import StepsContainer from "../containers/StepsContainer";
import { PH_STEPS } from "../const/const";
import StixPHTestImg from "../assets/img/stix-ph-test.png";

const PHStepsPage = () => {
	const navigate = useNavigate();
  const [searchParams] = useSearchParams();
	const [isSymptom, setIsSymptom] = useState(false);
	const [step, setStep] = useState(0);
	const [isStep, setIsStep] = useState(false);

	const goToHome = () => {
		navigate("/ph");
		setIsStep(false);
		setIsSymptom(false);
	}

	const goToStep = () => {
		navigate("/ph?stage=step&step=1");
	}
	
	const goToSymptom = () => {
		navigate("/ph?stage=symptom&step=3");
	}

	useEffect(() => {
		const stage = searchParams.get("stage");
		const curStep = searchParams.get("step");
		console.log(stage)
		if (stage) {
			if (stage === "symptom") {
				setIsSymptom(true);
				setIsStep(false);
			}
			if (stage === "step") {
				setIsSymptom(false);
				setIsStep(true);
			}
		}

		if (step) {
			setStep(curStep)
		}
	}, [searchParams])

	return (
		<>
			{
				!isSymptom &&
					<div className='relative w-full xxs:h-48 xs:h-60 px-4 py-10 bg-[#e8e4f2] relative flex flex-col items-center justify-center text-4xl font-bold'>
						{
							!isStep
								? <>
									<div className='text-[#ff9068] beatrice-font' >Vaginal Health</div>
									<div className='domaine-bold xxxs:mb-16 xxs:mb-0'>Test & Treat</div>
								</>
								: <div className='text-center beatrice-font text-[#6e66bc] xxxs:text-base xxs:text-xl xs:text-2xl'>{PH_STEPS[step].img_alt}</div>
						}
						{
							!isStep &&
								<img className='absolute xxxs:w-20 xxs:w-48 xs:w-60 top-40' src={StixPHTestImg} alt='stix-uti-test' />
						}
					</div>
			}
			<div className='bg-[#fff4ea] flex-1 flex flex-col pb-6 px-4'>
				{
					!isSymptom && !isStep && 
						<>
							<div className="flex-1"></div>
							<PurpleBtn func={() => navigate('/ph?stage=symptom&step=1')} >Get Started</PurpleBtn>
						</>
				}
				{
					isSymptom && <SymptomContainer goToStep={goToStep} goToHome={goToHome} />
				}
				{
					isStep && <StepsContainer STEPS={PH_STEPS} goToSymptom={goToSymptom} />
				}
			</div>
		</>
	);
}

export default PHStepsPage;
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

import ProtectionImg from "../assets/img/Rectangle 9765.png";
import ReliefImg from "../assets/img/Rectangle 9766.png";
import ProbioticImg from "../assets/img/Rectangle 9764.png";
import PurpleBtn from "../Components/PurpleBtn";
import TransparentBtn from "../Components/TransParentBtn";

const ResultPage = () => {
	return(
		<>
			<div className='relative w-full h-60 px-4 bg-[#e8e4f2] relative flex flex-col items-center justify-between text-xl'>
				<div className="w-full flex justify-between pt-8 pb-6 domaine-regular font-bold"><span>Results</span><span>Oct 23, 2023</span></div>
				<div className="w-full h-40 bg-[#6e66bc] rounded-t-xl"></div>
			</div>
			<div className='bg-[#fff4ea] flex-1 flex flex-col items-center pb-10 px-4'>
				<div className="w-full h-40 bg-white rounded-b-xl p-8 text-center">
					<div className="beatrice-font text-2xl">Looks like a UTI</div>
					<div className="domaine-regular text-xl">Your results suggest signs of a Urinary tract infection.</div>
				</div>
				<p className="beatrice-font font-bold text-2xl py-4">Doctors recommend:</p>
				<div className="grid grid-cols-3 gap-4 beatrice-font text-base font-bold text-center mb-8">
					<div className="flex flex-col">
						<div className="bg-white mb-4 rounded-lg"><img src={ProtectionImg} alt="protection_img" /></div>
						<div className="">UTI Daily Protection</div>
					</div>
					<div className="flex flex-col">
						<div className="bg-white mb-4 rounded-lg"><img src={ReliefImg} alt="relief_img" /></div>
						<div className="">UTI Pain Relief</div>
					</div>
					<div className="flex flex-col">
						<div className="bg-white mb-4 rounded-lg"><img src={ProbioticImg} alt="probiotic_img" /></div>
						<div className="">Health Probiotic</div>
					</div>
				</div>
				<PurpleBtn>Get a Prescription</PurpleBtn>
				<TransparentBtn className="mt-4">Shop the Stix Store <FontAwesomeIcon className='ml-2' icon={faArrowRight} /></TransparentBtn>
			</div>
		</>
	)
}

export default ResultPage;
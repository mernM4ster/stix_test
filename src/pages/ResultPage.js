import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

import ProtectionImg from "../assets/img/Rectangle 9765.png";
import ReliefImg from "../assets/img/Rectangle 9766.png";
import ProbioticImg from "../assets/img/Rectangle 9764.png";
import PurpleBtn from "../Components/PurpleBtn";
import TransparentBtn from "../Components/TransParentBtn";

const ResultPage = () => {
	const goToPrescription = () => {
		window.open("https://staging.drbubba.net/care/primary-care/uti?partner=scanbase", "_blank", "noreferrer")
	}
	
	const goToShop = () => {
		window.open("https://getstix.co/collections/urinary-tract-health", "_blank", "noreferrer")
	}
	return(
		<>
			<div className='relative w-full xxs:h-40 xs:h-60 px-4 bg-[#e8e4f2] relative flex flex-col items-center justify-between xxxs:text-sm xxs:text-lg xs:text-xl'>
					<div className="w-full flex justify-between xxxs:py-1 xxs:py-4 xs:py-6 domaine-regular font-bold"><span>Results</span><span>Oct 23, 2023</span></div>
					<div className="w-full xxxs:h-16 xxs:h-24 xs:h-40 bg-[#6e66bc] rounded-t-xl"></div>
			</div>
			<div className='bg-[#fff4ea] flex-1 flex flex-col items-center xxxs:pb-2 xs:pb-10 px-4'>
				<div className="w-full xxs:h-24 xs:h-40 bg-white rounded-b-xl xxxs:p-1 xxs:p-2 xs:p-8 text-center">
					<div className="beatrice-font xxxs:text-sm xxs:text-lg xs:text-2xl">Looks like a UTI</div>
					<div className="domaine-regular xxxs:text-sm xxs:text-lg xs:text-xl">Your results suggest signs of a Urinary tract infection.</div>
				</div>
				<p className="beatrice-font font-bold xxxs:text-sm xxs:text-lg xs:text-2xl xxxs:py-1 xxs:py-4">Doctors recommend:</p>
				<div className="flex-1 grid grid-cols-3 gap-4 beatrice-font xxxs:text-xs xxs:text-base font-bold text-center xxxs:mb-2 xxs:mb-4 xs:mb-8">
					<a className="flex flex-col" href="https://getstix.co/products/uti-daily-protection-supplement" target="_blank" rel="noreferrer">
						<div className="bg-white xxxs:mb-2 xxs:mb-4 rounded-lg"><img src={ProtectionImg} alt="protection_img" /></div>
						<div className="">UTI Daily Protection</div>
					</a>
					<a className="flex flex-col" href="https://getstix.co/products/uti-fast-acting-pain-relief" target="_blank" rel="noreferrer">
						<div className="bg-white xxxs:mb-2 xxs:mb-4 rounded-lg"><img src={ReliefImg} alt="relief_img" /></div>
						<div className="">UTI Pain Relief</div>
					</a>
					<a className="flex flex-col" href="https://getstix.co/products/vaginal-health-probiotic" target="_blank" rel="noreferrer">
						<div className="bg-white xxxs:mb-2 xxs:mb-4 rounded-lg"><img src={ProbioticImg} alt="probiotic_img" /></div>
						<div className="">Health Probiotic</div>
					</a>
				</div>
				<PurpleBtn func={goToPrescription}>Get a Prescription</PurpleBtn>
				<TransparentBtn className="mt-2" func={goToShop}>Shop the Stix Store <FontAwesomeIcon className='ml-2' icon={faArrowRight} /></TransparentBtn>
			</div>
			{/* <div className='bg-[#fff4ea] flex-1 flex flex-col pb-10 px-4'>
				<div className="flex-1 flex flex-col py-4 items-center justify-center text-center beatrice-font text-2xl">
					<img className="mb-6" src={SmileImg} alt="smile" />
					<div className="mb-6 font-bold text-3xl">We need a higher quality image</div>
					<div className="domaine-regular">1. Hold the camera steady.</div>
					<div className="mb-6 domaine-regular">2. Be sure you're in good light.</div>
				</div>
				<PurpleBtn>Take Picture</PurpleBtn>
			</div> */}
			{/* <div className='bg-[#fff4ea] flex-1 flex flex-col pb-10 px-4'>
				<div className="flex-1 flex flex-col py-4 items-center justify-center text-center beatrice-font text-2xl">
					<img className="mb-6" src={SmileImg} alt="smile" />
					<div className="mb-6 font-bold text-3xl">Too much time has passed. Your test has expired.</div>
					<div className="domaine-regular">Please try again with a new strip.</div>
				</div>
				<PurpleBtn>Try Again</PurpleBtn>
			</div> */}
		</>
	)
}

export default ResultPage;
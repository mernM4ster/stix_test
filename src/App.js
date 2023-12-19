import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import NoSleep  from 'nosleep.js';
import StixStepsPage from './pages/StixStepsPage';
import ResultPage from './pages/ResultPage';
import LogoImg from "./assets/img/stix-logo.png";

import './App.css';
import CameraPage from './pages/CameraPage';
import PHStepsPage from './pages/PHStepsPage';

function App() {
  const [checked, setChecked] = useState(false);
  const [camStatus, setCamStatus] = useState(false);
  
  useEffect(() => {
    const noSleep = new NoSleep();
    noSleep.enable();
    
    // Clean up the wake lock when the component unmounts
    return () => {
      noSleep.disable();
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <div className='w-full flex justify-between items-center px-4 py-2'>
        <img src={LogoImg} alt='logo' />
        <div className='w-10 h-10 rounded-full bg-[#6e66bc] flex items-center justify-center'><FontAwesomeIcon color='white' icon={faBars} /></div>
      </div>
      {/* {
        !checked
          ? !camStatus
            ? <StixStepsPage onCamera={setCamStatus} />
            : <CameraPage onCheck={setChecked}  />
          : <ResultPage />
      } */}
      {
        !checked
          ? !camStatus
            ? <PHStepsPage onCamera={setCamStatus} />
            : <CameraPage onCheck={setChecked}  />
          : <ResultPage />
      }
      {/* <CameraPage /> */}
    </div>
  );
}

export default App;

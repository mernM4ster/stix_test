import { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import NoSleep  from 'nosleep.js';
import LogoImg from "./assets/img/stix-logo.png";

import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import MyRoutes from './routes';

function App() {
  const [disabledBack, setDisabledBack] = useState(false);
  const [clickBack, setClickBack] = useState(0);
  const noSleep = new NoSleep();

  useEffect(() => {
    document.addEventListener('click', function enableNoSleep() {
      document.removeEventListener('click', enableNoSleep, false);
      noSleep.enable();
    }, false);
    
    // Clean up the wake lock when the component unmounts
    return () => {
      noSleep.disable();
    };
  }, []);

  return (
    <div className="stretch-height flex justify-center">
      <div className='flex flex-col w-[800px]'>
        <div className='w-full flex justify-between items-center px-4 py-2'>
          <img src={LogoImg} alt='logo' />
          <div className='w-10 h-10 rounded-full bg-[#6e66bc] flex items-center justify-center'><FontAwesomeIcon color='white' icon={faBars} /></div>
        </div>
        <BrowserRouter>
          <MyRoutes setDisabledBack={setDisabledBack} clickBack={clickBack} />
        </BrowserRouter>
      </div>
      {/* <button className='fixed top-20 right-6 w-8 h-8 rounded-full bg-[#6e66bc] flex items-center justify-center' disabled={disabledBack} onClick={() => setClickBack(old => old + 1)}>
        <FontAwesomeIcon color='white' icon={faArrowLeft} />
      </button> */}
      <ToastContainer />
    </div>
  );
}

export default App;

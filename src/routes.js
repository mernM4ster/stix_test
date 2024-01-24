import { useEffect } from 'react';
import { Route, Routes, Navigate, useLocation, useNavigate } from 'react-router-dom';
import StixStepsPage from './pages/StixStepsPage';
import ResultPage from './pages/ResultPage';
import CameraPage from './pages/CameraPage';
import PHStepsPage from './pages/PHStepsPage';

const MyRoutes = ({setDisabledBack, clickBack, activeWakeLock}) => {
	const navigate = useNavigate();
	const location = useLocation();

	useEffect(() => {
    const isFirstPage = location.key === '1'; // Check if it's the first page of the history
    setDisabledBack(isFirstPage)
  }, [location]);

	useEffect(() => {
		if (clickBack > 0) {
			navigate(-1);
		}
	}, [clickBack])
	
	return (
		<Routes>
			<Route path="/uti" element={<StixStepsPage />} />
			<Route path="/ph" element={<PHStepsPage />} />
			<Route path='/camera' element={<CameraPage />} />
			<Route path='/result' element={<ResultPage />} />
			<Route path="*" element={<Navigate to="/uti" replace />} />
		</Routes>
	)
}

export default MyRoutes
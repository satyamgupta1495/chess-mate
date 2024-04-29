import './App.css'
import './assets/css/global.css'
import './assets/css/custombtn.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useRoutes } from 'react-router-dom';
import { Suspense } from 'react';
import AppRoutes from '@/routes/index';
import Particle from './components/Particles';
import Loader from './Loader';

function App() {

  const routing = useRoutes(AppRoutes())
  return (
    <>
      <Suspense fallback={<Loader />}>
        {routing}
        <Particle id="tsparticles" />
      </Suspense>
    </>
  )
}

export default App

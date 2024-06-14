import './App.css'
import './assets/css/global.css'
import './assets/css/custombtn.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useRoutes } from 'react-router-dom';
import { Suspense } from 'react';
import AppRoutes from '@/routes/index';
import Particle from './components/Particles';
import Loader from './Loader';
import { Toaster } from 'react-hot-toast';

function App() {

  const routing = useRoutes(AppRoutes())
  return (
    <>
      <Suspense fallback={<Loader />}>
        {routing}
        <Toaster
          position="top-right"
          reverseOrder={true}
          toastOptions={{
            style: {
              fontSize: '14px',
              border: '1px dashed white',
              color: '#000',
              zIndex: 100
            }
          }}
        />
        <Particle id="tsparticles" />
      </Suspense>
    </>
  )
}

export default App

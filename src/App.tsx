import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import DaysContextProvider from './context/days';
import Header from './components/base/header';
import Spinner from './components/base/spinner';

import './css/mobile.css';
import './css/tablet.css';
import './css/pc.css';

const HomeView = lazy(() => import('./views/home'));
const CreateView = lazy(() => import('./views/create'));
const UpdateView = lazy(() => import('./views/update'));
const NotFoundView = lazy(() => import('./views/notfound'));

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Suspense fallback={<Spinner />}>
        <HelmetProvider>
          <DaysContextProvider>
            <main>
              <Routes>
                <Route path='/' element={<HomeView />} />
                <Route path='/create' element={<CreateView />} />
                <Route path='/update/:id' element={<UpdateView />} />
                <Route path='*' element={<NotFoundView />} />
              </Routes>
            </main>
          </DaysContextProvider>
        </HelmetProvider>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;

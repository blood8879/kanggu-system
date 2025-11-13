import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MainLayout } from './components/layout/MainLayout';
import { HomePage } from './pages/HomePage';
import { WorkersPage } from './pages/WorkersPage';
import { CreateContractPage } from './pages/CreateContractPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { workerStorage } from './services/workerStorage';
import { generateMockWorkers } from './utils/mockData';

function App() {
  useEffect(() => {
    const initializeMockData = async () => {
      const existingWorkers = await workerStorage.getAll();
      if (existingWorkers.length === 0) {
        const mockWorkers = generateMockWorkers(15);
        for (const worker of mockWorkers) {
          await workerStorage.create(worker);
        }
      }
    };
    initializeMockData();
  }, []);

  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/workers" element={<WorkersPage />} />
          <Route path="/create-contract" element={<CreateContractPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { TaskProvider } from './context/TaskContext';
import { TranslationProvider } from './context/TranslationContext';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { Dashboard } from './pages/Dashboard';
import { Tasks } from './pages/Tasks';
import { TaskDetail } from './pages/TaskDetail';
import { NewTask } from './pages/NewTask';
import { Categories } from './pages/Categories';
import { Settings } from './pages/Settings';

function Layout() {
  return (
    <div className="min-h-screen bg-bg-deep">
      <Sidebar />
      <Header />
      <main className="min-h-screen">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/tasks/new" element={<NewTask />} />
          <Route path="/tasks/:id" element={<TaskDetail />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  return (
    <TaskProvider>
      <TranslationProvider>
        <BrowserRouter>
          <Layout />
        </BrowserRouter>
      </TranslationProvider>
    </TaskProvider>
  );
}

export default App;
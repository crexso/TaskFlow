import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
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
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-bg-deep">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <Header onMenuClick={() => setSidebarOpen(true)} />
      <main className="min-h-screen lg:pl-64">
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
import { Search, Filter, Bell, User, ChevronDown, Moon, Sun, LogOut, Settings, User as UserIcon, Menu } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useTasks } from '@hooks/useTasks';
import { Button } from '@components/ui/Button';
import { Input } from '@components/ui/Input';
import { Link } from 'react-router-dom';

const getInitialTheme = (): 'dark' | 'light' => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('taskflow_theme');
    if (saved === 'dark' || saved === 'light') return saved;
  }
  return 'dark';
};

interface HeaderProps {
  onMenuClick: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showProfile, setShowProfile] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>(getInitialTheme);
  const { setFilters } = useTasks();

  useEffect(() => {
    document.documentElement.classList.toggle('light', theme === 'light');
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('taskflow_theme', newTheme);
    document.documentElement.classList.toggle('light', newTheme === 'light');
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setFilters({ search: e.target.value });
  };

  const handleLogout = () => {
    localStorage.removeItem('taskflow_tasks');
    localStorage.removeItem('taskflow_theme');
    window.location.reload();
  };

  return (
    <header className="fixed left-64 right-0 top-0 z-30 h-16 bg-bg-base/80 backdrop-blur-lg border-b border-border-subtle flex items-center px-6 lg:pl-0">
      <Button
        variant="ghost"
        size="sm"
        className="lg:hidden mr-4"
        onClick={onMenuClick}
        aria-label="Открыть меню"
      >
        <Menu className="h-6 w-6" />
      </Button>

      <div className="flex-1 flex items-center gap-4 max-w-2xl">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" aria-hidden="true" />
          <Input
            type="search"
            placeholder="Поиск задач..."
            value={searchQuery}
            onChange={handleSearch}
            className="pl-10 bg-bg-card border-border-default"
            aria-label="Поиск задач"
          />
        </div>
        <Button variant="ghost" size="sm" onClick={() => setFilters({ status: 'all', category: 'all', priority: 'all', search: '' })} className="hidden sm:flex gap-2">
          <Filter className="h-4 w-4" aria-hidden="true" />
          <span>Сбросить фильтры</span>
        </Button>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" onClick={toggleTheme} aria-label={`Переключить на ${theme === 'dark' ? 'светлую' : 'тёмную'} тему`}>
          {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>

        <Button variant="ghost" size="sm" aria-label="Уведомления">
          <Bell className="h-5 w-5" />
        </Button>

        <div className="relative">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowProfile(!showProfile)}
            aria-expanded={showProfile}
            aria-haspopup="true"
            className="gap-2"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent-blue to-accent-purple flex items-center justify-center">
              <User className="h-4 w-4 text-white" />
            </div>
            <ChevronDown className="h-4 w-4 text-text-muted" />
          </Button>

          {showProfile && (
            <div className="absolute right-0 mt-2 w-48 bg-bg-card border border-border-default rounded-lg shadow-lg py-2 animate-in">
              <div className="px-4 py-2 border-b border-border-subtle">
                <p className="text-sm font-medium text-text-primary">Пользователь</p>
                <p className="text-xs text-text-muted">user@taskflow.app</p>
              </div>
              <Button variant="ghost" className="w-full justify-start gap-2 px-4 py-2" asChild onClick={() => { setShowProfile(false); }}>
                <Link to="/settings">
                  <UserIcon className="h-4 w-4" />
                  Профиль
                </Link>
              </Button>
              <Button variant="ghost" className="w-full justify-start gap-2 px-4 py-2" asChild onClick={() => { setShowProfile(false); }}>
                <Link to="/settings">
                  <Settings className="h-4 w-4" />
                  Настройки
                </Link>
              </Button>
              <hr className="my-2 border-border-subtle" />
              <Button variant="ghost" className="w-full justify-start gap-2 px-4 py-2 text-accent-coral" onClick={handleLogout}>
                <LogOut className="h-4 w-4" />
                Выйти
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
import { NavLink, useLocation } from 'react-router-dom';
import { LayoutDashboard, ListTodo, FolderKanban, Settings, Plus, X } from 'lucide-react';
import { cn } from '@lib/utils';
import { Button } from '@components/ui/Button';

const navigation = [
  { href: '/', label: 'Дашборд', icon: LayoutDashboard },
  { href: '/tasks', label: 'Задачи', icon: ListTodo },
  { href: '/categories', label: 'Категории', icon: FolderKanban },
  { href: '/settings', label: 'Настройки', icon: Settings },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const location = useLocation();

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}
      <aside
        className={cn(
          'fixed left-0 top-0 z-50 h-screen w-64 bg-bg-base border-r border-border-subtle flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
        aria-label="Навигация"
      >
        <div className="flex items-center justify-between h-16 px-4 border-b border-border-subtle">
          <NavLink to="/" className="flex items-center gap-2" onClick={onClose}>
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent-blue to-accent-purple flex items-center justify-center">
              <Plus className="h-5 w-5 text-white" />
            </div>
            <span className="font-semibold text-lg text-text-primary tracking-tight">TaskFlow</span>
          </NavLink>
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden"
            onClick={onClose}
            aria-label="Закрыть меню"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <NavLink
                key={item.href}
                to={item.href}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150',
                  isActive
                    ? 'bg-bg-card text-text-primary border border-border-default shadow-sm'
                    : 'text-text-secondary hover:bg-bg-elevated hover:text-text-primary'
                )}
                aria-current={isActive ? 'page' : undefined}
                onClick={onClose}
              >
                <item.icon className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
                {item.label}
              </NavLink>
            );
          })}
        </nav>

        <div className="p-3 border-t border-border-subtle">
          <Button variant="primary" className="w-full" asChild>
            <NavLink to="/tasks/new" onClick={onClose}>
              <Plus className="h-4 w-4" aria-hidden="true" />
              Новая задача
            </NavLink>
          </Button>
        </div>
      </aside>
    </>
  );
}
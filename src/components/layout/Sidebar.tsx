import { NavLink, useLocation } from 'react-router-dom';
import { LayoutDashboard, ListTodo, FolderKanban, Settings, Plus } from 'lucide-react';
import { cn } from '@lib/utils';
import { Button } from '@components/ui/Button';

const navigation = [
  { href: '/', label: 'Дашборд', icon: LayoutDashboard },
  { href: '/tasks', label: 'Задачи', icon: ListTodo },
  { href: '/categories', label: 'Категории', icon: FolderKanban },
  { href: '/settings', label: 'Настройки', icon: Settings },
];

export function Sidebar() {
  const location = useLocation();

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 bg-bg-base border-r border-border-subtle flex flex-col transition-all duration-300">
      <div className="flex items-center justify-between h-16 px-4 border-b border-border-subtle">
        <NavLink to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent-blue to-accent-purple flex items-center justify-center">
            <Plus className="h-5 w-5 text-white" />
          </div>
          <span className="font-semibold text-lg text-text-primary tracking-tight">TaskFlow</span>
        </NavLink>
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
            >
              <item.icon className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
              {item.label}
            </NavLink>
          );
        })}
      </nav>

      <div className="p-3 border-t border-border-subtle">
        <Button variant="primary" className="w-full" asChild>
          <NavLink to="/tasks/new">
            <Plus className="h-4 w-4" aria-hidden="true" />
            Новая задача
          </NavLink>
        </Button>
      </div>
    </aside>
  );
}
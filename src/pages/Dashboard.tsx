import { Link } from 'react-router-dom';
import { TrendingUp, CheckCircle2, Clock, Target, Plus, ArrowRight } from 'lucide-react';
import { cn } from '@lib/utils';
import { useTasks } from '@hooks/useTasks';
import { TaskCard } from '@components/tasks/TaskCard';
import { Button } from '@components/ui/Button';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  Cell,
} from 'recharts';

export function Dashboard() {
  const { tasks, stats, activityData, toggleTask, deleteTask } = useTasks();
  const recentTasks = tasks.slice(0, 5);

  const statCards = [
    { label: 'Всего задач', value: stats.total, icon: Target, color: 'text-accent-blue', bg: 'bg-accent-blue/10' },
    { label: 'Выполнено', value: stats.completed, icon: CheckCircle2, color: 'text-accent-emerald', bg: 'bg-accent-emerald/10' },
    { label: 'В процессе', value: stats.inProgress, icon: Clock, color: 'text-accent-amber', bg: 'bg-accent-amber/10' },
    { label: 'Прогресс', value: `${stats.completionRate}%`, icon: TrendingUp, color: 'text-accent-purple', bg: 'bg-accent-purple/10' },
  ];

  const tooltipFormatter = (value: unknown): readonly [number, string] => {
    const num = typeof value === 'number' ? value : Number(value ?? 0);
    return [isNaN(num) ? 0 : num, 'задач'];
  };

  return (
    <div className="pt-16 pl-64 p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-text-primary tracking-tight">Дашборд</h1>
          <p className="mt-1 text-text-secondary">Обзор ваших задач и прогресса</p>
        </div>
        <Button variant="primary" asChild>
          <Link to="/tasks/new">
            <Plus className="h-4 w-4" aria-hidden="true" />
            Новая задача
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat, i) => (
          <div key={stat.label} className={cn('card p-5 animate-in stagger-', i + 1)}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-text-muted uppercase tracking-wide">{stat.label}</p>
                <p className="mt-1 text-3xl font-bold text-text-primary">{stat.value}</p>
              </div>
              <div className={cn('w-12 h-12 rounded-xl flex items-center justify-center', stat.bg)}>
                <stat.icon className={cn('h-6 w-6', stat.color)} aria-hidden="true" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 card p-5 animate-in stagger-1">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-semibold text-text-primary">Активность за неделю</h2>
            <div className="flex items-center gap-4 text-xs text-text-muted">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-accent-blue" />
                Создано
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-accent-emerald" />
                Выполнено
              </span>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={activityData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorCreated" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorCompleted" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#2a2a44" vertical={false} />
                <XAxis
                  dataKey="date"
                  tickFormatter={(date) => new Date(date).toLocaleDateString('ru-RU', { weekday: 'short', day: 'numeric' })}
                  tick={{ fill: '#6a6a8a', fontSize: 11 }}
                  axisLine={{ stroke: '#2a2a44' }}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fill: '#6a6a8a', fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                  domain={[0, 'dataMax + 1']}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1a1a2e',
                    border: '1px solid #333355',
                    borderRadius: '10px',
                    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4)',
                  }}
                  labelStyle={{ color: '#f5f5f7', fontSize: '12px' }}
                  itemStyle={{ fontSize: '12px' }}
                  formatter={tooltipFormatter}
                />
                <Area
                  type="monotone"
                  dataKey="created"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorCreated)"
                />
                <Area
                  type="monotone"
                  dataKey="completed"
                  stroke="#10b981"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorCompleted)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card p-5 animate-in stagger-2">
          <h2 className="text-lg font-semibold text-text-primary mb-5">Распределение по статусам</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={[
                  { name: 'К выполнению', value: tasks.filter((t) => t.status === 'todo').length },
                  { name: 'В процессе', value: tasks.filter((t) => t.status === 'in-progress').length },
                  { name: 'На проверке', value: tasks.filter((t) => t.status === 'review').length },
                  { name: 'Готово', value: tasks.filter((t) => t.status === 'done').length },
                ]}
                layout="vertical"
                margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#2a2a44" horizontal={false} />
                <XAxis axisLine={false} tickLine={false} tick={false} />
                <YAxis
                  type="category"
                  dataKey="name"
                  tick={{ fill: '#a0a0b8', fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                  width={80}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1a1a2e',
                    border: '1px solid #333355',
                    borderRadius: '10px',
                  }}
                  labelStyle={{ color: '#f5f5f7' }}
                  formatter={tooltipFormatter}
                />
                <Bar dataKey="value" radius={[0, 6, 6, 0]}>
                  <Cell fill="#64748b" />
                  <Cell fill="#3b82f6" />
                  <Cell fill="#a855f7" />
                  <Cell fill="#10b981" />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="card animate-in stagger-3">
        <div className="flex items-center justify-between p-5 border-b border-border-subtle">
          <h2 className="text-lg font-semibold text-text-primary">Последние задачи</h2>
          <Button variant="ghost" size="sm" asChild>
            <Link to="/tasks">
              Все задачи <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </Button>
        </div>
        <div className="divide-y divide-border-subtle">
          {recentTasks.length === 0 ? (
            <div className="p-12 text-center">
              <p className="text-text-muted mb-4">Пока нет задач</p>
              <Button variant="primary" asChild>
                <Link to="/tasks/new">
                  <Plus className="h-4 w-4 mr-2" aria-hidden="true" />
                  Создать первую задачу
                </Link>
              </Button>
            </div>
          ) : (
            recentTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onEdit={() => {}}
                onDelete={deleteTask}
                onToggle={toggleTask}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
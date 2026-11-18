import { User, Bell, Palette, Database, Trash2, Moon, Sun, Download, Upload, Globe, Clock } from 'lucide-react';
import { useState, useEffect } from 'react';
import { cn } from '@lib/utils';
import { useTasks } from '@hooks/useTasks';
import { useTranslation } from '@hooks/useTranslation';
import { Button } from '@components/ui/Button';
import { Input } from '@components/ui/Input';
import { Modal } from '@components/ui/Modal';
import { Checkbox } from '@components/ui/Checkbox';
import type { Task } from '@type/task';

// Validation function for imported tasks (exported for testing)
export const validateTask = (task: unknown): task is Task => {
  if (!task || typeof task !== 'object') return false;
  const t = task as Record<string, unknown>;

  const validStatus = ['todo', 'in-progress', 'review', 'done'];
  const validPriority = ['low', 'medium', 'high'];
  const validCategory = ['work', 'study', 'personal', 'other'];

  return (
    typeof t.id === 'string' &&
    typeof t.title === 'string' && t.title.length > 0 && t.title.length <= 100 &&
    typeof t.description === 'string' && t.description.length <= 1000 &&
    validStatus.includes(t.status as string) &&
    validPriority.includes(t.priority as string) &&
    validCategory.includes(t.category as string) &&
    (t.deadline === null || (typeof t.deadline === 'string' && !isNaN(Date.parse(t.deadline)))) &&
    typeof t.createdAt === 'string' && !isNaN(Date.parse(t.createdAt)) &&
    typeof t.updatedAt === 'string' && !isNaN(Date.parse(t.updatedAt)) &&
    (t.completedAt === null || (typeof t.completedAt === 'string' && !isNaN(Date.parse(t.completedAt))))
  );
};

// Lazy initializers to avoid setState in useEffect
const getInitialTheme = (): 'dark' | 'light' | 'system' => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('taskflow_theme');
    if (saved === 'dark' || saved === 'light' || saved === 'system') return saved;
  }
  return 'dark';
};

type Timezone = 'auto' | 'UTC' | 'Europe/Moscow' | 'Europe/Kyiv';

const getInitialTimezone = (): Timezone => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('taskflow_timezone');
    if (saved === 'auto' || saved === 'UTC' || saved === 'Europe/Moscow' || saved === 'Europe/Kyiv') return saved;
  }
  return 'auto';
};

const getInitialNotifications = () => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('taskflow_notifications');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // ignore parse errors
      }
    }
  }
  return { deadlines: true, daily: false, weekly: true };
};

const getInitialAnimations = () => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('taskflow_animations');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // ignore parse errors
      }
    }
  }
  return true;
};

const getInitialProfileName = () => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('taskflow_profile_name');
    if (saved) return saved;
  }
  return 'Пользователь';
};

const getInitialProfileEmail = () => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('taskflow_profile_email');
    if (saved) return saved;
  }
  return 'user@taskflow.app';
};

export function Settings() {
  const { tasks } = useTasks();
  const { language, setLanguage, t } = useTranslation();
  const [activeTab, setActiveTab] = useState<'general' | 'appearance' | 'data' | 'account'>('general');
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light' | 'system'>(getInitialTheme);
  const [timezone, setTimezone] = useState<Timezone>(getInitialTimezone);
  const [notifications, setNotifications] = useState(getInitialNotifications);
  const [animationsEnabled, setAnimationsEnabled] = useState(getInitialAnimations);
  const [profileName, setProfileName] = useState(getInitialProfileName);
  const [profileEmail, setProfileEmail] = useState(getInitialProfileEmail);

  const tabs = [
    { id: 'general', label: t('settings.general'), icon: Globe },
    { id: 'appearance', label: t('settings.appearance'), icon: Palette },
    { id: 'data', label: t('settings.data'), icon: Database },
    { id: 'account', label: t('settings.account'), icon: Bell },
  ];

  // Apply theme when it changes
  useEffect(() => {
    const isDark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
    document.documentElement.classList.toggle('light', !isDark);
  }, [theme]);

  const handleThemeChange = (newTheme: 'dark' | 'light' | 'system') => {
    setTheme(newTheme);
    localStorage.setItem('taskflow_theme', newTheme);
    const isDark = newTheme === 'dark' || (newTheme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
    document.documentElement.classList.toggle('light', !isDark);
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value as 'ru' | 'en');
  };

  const handleTimezoneChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTimezone(e.target.value as Timezone);
    localStorage.setItem('taskflow_timezone', e.target.value);
  };

  const handleNotificationChange = (key: keyof typeof notifications, value: boolean) => {
    setNotifications((prev: typeof notifications) => {
      const updated = { ...prev, [key]: value };
      localStorage.setItem('taskflow_notifications', JSON.stringify(updated));
      return updated;
    });
  };

  const handleAnimationsChange = (value: boolean) => {
    setAnimationsEnabled(value);
    localStorage.setItem('taskflow_animations', JSON.stringify(value));
  };

  const handleProfileNameChange = (value: string) => {
    setProfileName(value);
    localStorage.setItem('taskflow_profile_name', value);
  };

  const handleProfileEmailChange = (value: string) => {
    setProfileEmail(value);
    localStorage.setItem('taskflow_profile_email', value);
  };

  const handleExport = () => {
    const data = JSON.stringify(tasks, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `taskflow-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target?.result as string);
        if (!Array.isArray(data)) {
          alert('Ошибка при импорте: ожидается массив задач');
          return;
        }

        const validTasks = data.filter(validateTask);
        const invalidCount = data.length - validTasks.length;

        if (validTasks.length === 0) {
          alert('Ошибка при импорте: ни одна задача не прошла проверку структуры');
          return;
        }

        if (invalidCount > 0) {
          if (!confirm(`Найдено ${invalidCount} некорректных задач, которые будут пропущены. Продолжить импорт ${validTasks.length} валидных задач?`)) {
            return;
          }
        }

        localStorage.setItem('taskflow_tasks', JSON.stringify(validTasks));
        window.location.reload();
      } catch {
        alert('Ошибка при импорте: неверный формат JSON файла');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const handleClearAll = () => {
    localStorage.removeItem('taskflow_tasks');
    window.location.reload();
  };

  return (
    <div className="pt-16 lg:pl-64 p-6 max-w-4xl space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-text-primary tracking-tight">{t('settings.title')}</h1>
        <p className="mt-1 text-text-secondary">{t('settings.subtitle')}</p>
      </div>

      <div className="card">
        <div className="border-b border-border-subtle">
          <nav className="flex gap-1 p-1" role="tablist">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                role="tab"
                aria-selected={activeTab === tab.id}
                aria-controls={`${tab.id}-panel`}
                id={`${tab.id}-tab`}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={cn(
                  'flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-150',
                  activeTab === tab.id
                    ? 'bg-bg-card text-text-primary border border-border-default shadow-sm'
                    : 'text-text-secondary hover:bg-bg-elevated hover:text-text-primary'
                )}
              >
                <tab.icon className="h-4 w-4" aria-hidden="true" />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6" role="tabpanel">
          {activeTab === 'general' && (
            <div className={cn('space-y-6 animate-in', !animationsEnabled && 'animate-none')}>
              <section>
                <h3 className="text-sm font-medium text-text-secondary mb-4 uppercase tracking-wide">{t('settings.languageRegion')}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <select
                    value={language}
                    onChange={handleLanguageChange}
                    className="w-full px-4 py-2.5 bg-bg-base border border-border-subtle rounded-lg text-text-primary focus:outline-none focus:border-accent-blue focus:ring-1 focus:ring-accent-blue appearance-none"
                  >
                    <option value="ru">{t('settings.language')}: Русский</option>
                    <option value="en">{t('settings.language')}: English</option>
                  </select>
                  <select
                    value={timezone}
                    onChange={handleTimezoneChange}
                    className="w-full px-4 py-2.5 bg-bg-base border border-border-subtle rounded-lg text-text-primary focus:outline-none focus:border-accent-blue focus:ring-1 focus:ring-accent-blue appearance-none"
                  >
                    <option value="auto">{t('settings.autoDetect')}</option>
                    <option value="UTC">UTC</option>
                    <option value="Europe/Moscow">{t('settings.moscow')}</option>
                    <option value="Europe/Kyiv">{t('settings.kyiv')}</option>
                  </select>
                </div>
              </section>

              <section className="pt-6 border-t border-border-subtle">
                <h3 className="text-sm font-medium text-text-secondary mb-4 uppercase tracking-wide">{t('settings.notifications')}</h3>
                <p className="text-xs text-text-muted mb-4">{t('settings.notificationsDemo')}</p>
                <div className="space-y-3">
                  <Checkbox
                    checked={notifications.deadlines}
                    onChange={(e) => handleNotificationChange('deadlines', e.target.checked)}
                    label={t('settings.deadlineNotifications')}
                  />
                  <Checkbox
                    checked={notifications.daily}
                    onChange={(e) => handleNotificationChange('daily', e.target.checked)}
                    label={t('settings.dailyDigest')}
                  />
                  <Checkbox
                    checked={notifications.weekly}
                    onChange={(e) => handleNotificationChange('weekly', e.target.checked)}
                    label={t('settings.weeklyStats')}
                  />
                </div>
              </section>
            </div>
          )}

          {activeTab === 'appearance' && (
            <div className={cn('space-y-6 animate-in', !animationsEnabled && 'animate-none')}>
              <section>
                <h3 className="text-sm font-medium text-text-secondary mb-4 uppercase tracking-wide">{t('settings.theme')}</h3>
                <div className="grid grid-cols-3 gap-3">
                  {(['dark', 'light', 'system'] as const).map((themeOption) => (
                    <button
                      key={themeOption}
                      onClick={() => handleThemeChange(themeOption)}
                      className={cn(
                        'p-4 rounded-lg border-2 transition-all text-left',
                        theme === themeOption
                          ? 'border-accent-blue bg-accent-blue/10'
                          : 'border-border-subtle hover:border-border-default'
                      )}
                    >
                      <div className="flex items-center gap-3">
                        {themeOption === 'dark' && <Moon className="h-5 w-5 text-accent-blue" />}
                        {themeOption === 'light' && <Sun className="h-5 w-5 text-accent-amber" />}
                        {themeOption === 'system' && <Clock className="h-5 w-5 text-text-muted" />}
                        <span className="font-medium text-text-primary capitalize">{t(`settings.${themeOption}`)}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </section>

              <section className="pt-6 border-t border-border-subtle">
                <h3 className="text-sm font-medium text-text-secondary mb-4 uppercase tracking-wide">{t('settings.animations')}</h3>
                <Checkbox
                  checked={animationsEnabled}
                  onChange={(e) => handleAnimationsChange(e.target.checked)}
                  label={t('settings.enableAnimations')}
                />
              </section>
            </div>
          )}

          {activeTab === 'data' && (
            <div className={cn('space-y-6 animate-in', !animationsEnabled && 'animate-none')}>
              <section>
                <h3 className="text-sm font-medium text-text-secondary mb-4 uppercase tracking-wide">{t('settings.exportData')}</h3>
                <p className="text-text-muted mb-4">{t('settings.exportDesc')}</p>
                <Button variant="secondary" onClick={handleExport} className="gap-2">
                  <Download className="h-4 w-4" aria-hidden="true" />
                  {t('settings.exportButton')}
                </Button>
              </section>

              <section className="pt-6 border-t border-border-subtle">
                <h3 className="text-sm font-medium text-text-secondary mb-4 uppercase tracking-wide">{t('settings.importData')}</h3>
                <p className="text-text-muted mb-4">{t('settings.importDesc')}</p>
                <div className="flex items-center gap-3">
                  <input
                    type="file"
                    accept=".json"
                    onChange={handleImport}
                    className="sr-only"
                    id="import-file"
                  />
                  <Button variant="secondary" asChild>
                    <label htmlFor="import-file" className="cursor-pointer">
                      <Upload className="h-4 w-4" aria-hidden="true" />
                      {t('settings.importButton')}
                    </label>
                  </Button>
                </div>
              </section>

              <section className="pt-6 border-t border-border-subtle">
                <h3 className="text-sm font-medium text-text-secondary mb-4 uppercase tracking-wide">{t('settings.clearData')}</h3>
                <p className="text-text-muted mb-4">{t('settings.clearDesc')}</p>
                <Button variant="danger" onClick={() => setShowClearConfirm(true)} className="gap-2">
                  <Trash2 className="h-4 w-4" aria-hidden="true" />
                  {t('settings.clearButton')}
                </Button>
              </section>

              <section className="pt-6 border-t border-border-subtle">
                <h3 className="text-sm font-medium text-text-secondary mb-4 uppercase tracking-wide">{t('settings.storageStats')}</h3>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="p-4 rounded-lg bg-bg-base">
                    <p className="text-2xl font-bold text-text-primary">{tasks.length}</p>
                    <p className="text-xs text-text-muted">{t('settings.tasksCount')}</p>
                  </div>
                  <div className="p-4 rounded-lg bg-bg-base">
                    <p className="text-2xl font-bold text-text-primary">
                      {Math.round(new Blob([JSON.stringify(tasks)]).size / 1024)} KB
                    </p>
                    <p className="text-xs text-text-muted">{t('settings.dataSize')}</p>
                  </div>
                </div>
              </section>
            </div>
          )}

          {activeTab === 'account' && (
            <div className={cn('space-y-6 animate-in', !animationsEnabled && 'animate-none')}>
              <section>
                <h3 className="text-sm font-medium text-text-secondary mb-4 uppercase tracking-wide">{t('settings.profile')}</h3>
                <p className="text-xs text-text-muted mb-4">{t('settings.profileDemo')}</p>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-accent-blue to-accent-purple flex items-center justify-center">
                    <User className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <Input
                      label={t('settings.name')}
                      placeholder={t('settings.name')}
                      value={profileName}
                      onChange={(e) => handleProfileNameChange(e.target.value)}
                    />
                    <Input
                      label={t('settings.email')}
                      type="email"
                      placeholder="email@example.com"
                      value={profileEmail}
                      onChange={(e) => handleProfileEmailChange(e.target.value)}
                    />
                  </div>
                </div>
              </section>

              <section className="pt-6 border-t border-border-subtle">
                <h3 className="text-sm font-medium text-text-secondary mb-4 uppercase tracking-wide">{t('settings.appInfo')}</h3>
                <div className="space-y-2 text-sm text-text-muted">
                  <p>{t('settings.versionLabel')}</p>
                  <p>{t('common.madeWithCare')}</p>
                </div>
              </section>
            </div>
          )}
        </div>
      </div>

      <Modal
        isOpen={showClearConfirm}
        onClose={() => setShowClearConfirm(false)}
        title={t('settings.clearConfirm')}
        description={t('settings.clearConfirmDesc')}
        size="sm"
      >
        <div className="flex justify-end gap-3">
          <Button variant="secondary" onClick={() => setShowClearConfirm(false)}>
            {t('common.cancel')}
          </Button>
          <Button variant="danger" onClick={handleClearAll}>
            {t('settings.clearAction')}
          </Button>
        </div>
      </Modal>
    </div>
  );
}
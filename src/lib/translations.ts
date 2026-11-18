export type Language = 'ru' | 'en';

export type TranslationKeys =
  // Common
  | 'app.name'
  | 'app.loading'
  | 'common.save'
  | 'common.cancel'
  | 'common.delete'
  | 'common.edit'
  | 'common.create'
  | 'common.back'
  | 'common.search'
  | 'common.filter'
  | 'common.clear'
  | 'common.confirm'
  | 'common.yes'
  | 'common.no'
  | 'common.close'
  | 'common.settings'
  | 'common.profile'
  | 'common.logout'
  | 'common.language'
  | 'common.theme'
  | 'common.animations'
  | 'common.notifications'
  | 'common.export'
  | 'common.import'
  | 'common.clearAll'
  | 'common.storage'
  | 'common.tasks'
  | 'common.size'
  | 'common.about'
  | 'common.version'
  | 'common.madeWithCare'

  // Dashboard
  | 'dashboard.title'
  | 'dashboard.subtitle'
  | 'dashboard.newTask'
  | 'dashboard.allTasks'
  | 'dashboard.totalTasks'
  | 'dashboard.completed'
  | 'dashboard.inProgress'
  | 'dashboard.progress'
  | 'dashboard.weeklyActivity'
  | 'dashboard.created'
  | 'dashboard.completedShort'
  | 'dashboard.statusDistribution'
  | 'dashboard.recentTasks'
  | 'dashboard.noTasks'
  | 'dashboard.createFirstTask'

  // Tasks
  | 'tasks.title'
  | 'tasks.subtitle'
  | 'tasks.newTask'
  | 'tasks.resetFilters'
  | 'tasks.noTasks'
  | 'tasks.noResults'
  | 'tasks.changeFilters'
  | 'tasks.createFirstTask'
  | 'tasks.edit'
  | 'tasks.delete'
  | 'tasks.markComplete'
  | 'tasks.markIncomplete'

  // New Task
  | 'newTask.title'
  | 'newTask.subtitle'
  | 'newTask.back'
  | 'newTask.name'
  | 'newTask.namePlaceholder'
  | 'newTask.description'
  | 'newTask.descriptionPlaceholder'
  | 'newTask.status'
  | 'newTask.priority'
  | 'newTask.category'
  | 'newTask.deadline'
  | 'newTask.cancel'
  | 'newTask.create'
  | 'newTask.creating'
  | 'newTask.nameRequired'
  | 'newTask.nameMaxLength'
  | 'newTask.descriptionMaxLength'

  // Task Detail
  | 'taskDetail.notFound'
  | 'taskDetail.back'
  | 'taskDetail.description'
  | 'taskDetail.info'
  | 'taskDetail.deadline'
  | 'taskDetail.created'
  | 'taskDetail.completed'
  | 'taskDetail.overdue'
  | 'taskDetail.edit'
  | 'taskDetail.delete'
  | 'taskDetail.deleteConfirm'
  | 'taskDetail.deleteDesc'
  | 'taskDetail.deleteAction'

  // Categories
  | 'categories.title'
  | 'categories.subtitle'
  | 'categories.work'
  | 'categories.study'
  | 'categories.personal'
  | 'categories.other'
  | 'categories.total'
  | 'categories.completed'
  | 'categories.inProgress'
  | 'categories.addCustom'
  | 'categories.fixedNotice'

  // Settings - General
  | 'settings.title'
  | 'settings.subtitle'
  | 'settings.general'
  | 'settings.appearance'
  | 'settings.data'
  | 'settings.account'
  | 'settings.languageRegion'
  | 'settings.language'
  | 'settings.timezone'
  | 'settings.autoDetect'
  | 'settings.moscow'
  | 'settings.kyiv'
  | 'settings.notifications'
  | 'settings.deadlineNotifications'
  | 'settings.dailyDigest'
  | 'settings.weeklyStats'
  | 'settings.animations'
  | 'settings.enableAnimations'
  | 'settings.theme'
  | 'settings.dark'
  | 'settings.light'
  | 'settings.system'
  | 'settings.exportData'
  | 'settings.exportDesc'
  | 'settings.exportButton'
  | 'settings.importData'
  | 'settings.importDesc'
  | 'settings.importButton'
  | 'settings.clearData'
  | 'settings.clearDesc'
  | 'settings.clearButton'
  | 'settings.clearConfirm'
  | 'settings.clearConfirmDesc'
  | 'settings.clearAction'
  | 'settings.storageStats'
  | 'settings.notificationsDemo'
  | 'settings.profileDemo'
  | 'settings.tasksCount'
  | 'settings.dataSize'
  | 'settings.profile'
  | 'settings.name'
  | 'settings.email'
  | 'settings.appInfo'
  | 'settings.versionLabel'

  // Status labels
  | 'status.todo'
  | 'status.inProgress'
  | 'status.review'
  | 'status.done'

  // Priority labels
  | 'priority.low'
  | 'priority.medium'
  | 'priority.high'

  // Category labels
  | 'category.work'
  | 'category.study'
  | 'category.personal'
  | 'category.other';

export const translations: Record<Language, Record<TranslationKeys, string>> = {
  ru: {
    // Common
    'app.name': 'TaskFlow',
    'app.loading': 'Загрузка...',
    'common.save': 'Сохранить',
    'common.cancel': 'Отмена',
    'common.delete': 'Удалить',
    'common.edit': 'Редактировать',
    'common.create': 'Создать',
    'common.back': 'Назад',
    'common.search': 'Поиск',
    'common.filter': 'Фильтры',
    'common.clear': 'Сбросить',
    'common.confirm': 'Подтвердить',
    'common.yes': 'Да',
    'common.no': 'Нет',
    'common.close': 'Закрыть',
    'common.settings': 'Настройки',
    'common.profile': 'Профиль',
    'common.logout': 'Выйти',
    'common.language': 'Язык',
    'common.theme': 'Тема',
    'common.animations': 'Анимации',
    'common.notifications': 'Уведомления',
    'common.export': 'Экспорт',
    'common.import': 'Импорт',
    'common.clearAll': 'Очистить всё',
    'common.storage': 'Хранилище',
    'common.tasks': 'задач',
    'common.size': 'размер',
    'common.about': 'О приложении',
    'common.version': 'Версия',
    'common.madeWithCare': 'Сделано с вниманием к деталям',

    // Dashboard
    'dashboard.title': 'Дашборд',
    'dashboard.subtitle': 'Обзор ваших задач и прогресса',
    'dashboard.newTask': 'Новая задача',
    'dashboard.allTasks': 'Все задачи',
    'dashboard.totalTasks': 'Всего задач',
    'dashboard.completed': 'Выполнено',
    'dashboard.inProgress': 'В процессе',
    'dashboard.progress': 'Прогресс',
    'dashboard.weeklyActivity': 'Активность за неделю',
    'dashboard.created': 'Создано',
    'dashboard.completedShort': 'Выполнено',
    'dashboard.statusDistribution': 'Распределение по статусам',
    'dashboard.recentTasks': 'Последние задачи',
    'dashboard.noTasks': 'Пока нет задач',
    'dashboard.createFirstTask': 'Создать первую задачу',

    // Tasks
    'tasks.title': 'Задачи',
    'tasks.subtitle': 'задач',
    'tasks.newTask': 'Новая задача',
    'tasks.resetFilters': 'Сбросить фильтры',
    'tasks.noTasks': 'Задач пока нет',
    'tasks.noResults': 'Ничего не найдено',
    'tasks.changeFilters': 'Попробуйте изменить фильтры или поисковый запрос',
    'tasks.createFirstTask': 'Создайте свою первую задачу, чтобы начать',
    'tasks.edit': 'Редактировать',
    'tasks.delete': 'Удалить',
    'tasks.markComplete': 'Отметить выполненной',
    'tasks.markIncomplete': 'Отменить выполнение',

    // New Task
    'newTask.title': 'Новая задача',
    'newTask.subtitle': 'Заполните поля ниже, чтобы создать задачу',
    'newTask.back': 'Назад к задачам',
    'newTask.name': 'Название',
    'newTask.namePlaceholder': 'Введите название задачи',
    'newTask.description': 'Описание',
    'newTask.descriptionPlaceholder': 'Добавьте описание (необязательно)',
    'newTask.status': 'Статус',
    'newTask.priority': 'Приоритет',
    'newTask.category': 'Категория',
    'newTask.deadline': 'Дедлайн',
    'newTask.cancel': 'Отмена',
    'newTask.create': 'Создать задачу',
    'newTask.creating': 'Создание...',
    'newTask.nameRequired': 'Название задачи обязательно',
    'newTask.nameMaxLength': 'Название не должно превышать 100 символов',
    'newTask.descriptionMaxLength': 'Описание не должно превышать 1000 символов',

    // Task Detail
    'taskDetail.notFound': 'Задача не найдена',
    'taskDetail.back': 'Вернуться к списку',
    'taskDetail.description': 'Описание',
    'taskDetail.info': 'Информация',
    'taskDetail.deadline': 'Дедлайн',
    'taskDetail.created': 'Создана',
    'taskDetail.completed': 'Завершена',
    'taskDetail.overdue': 'Просрочено',
    'taskDetail.edit': 'Редактировать',
    'taskDetail.delete': 'Удалить',
    'taskDetail.deleteConfirm': 'Удалить задачу?',
    'taskDetail.deleteDesc': 'Это действие нельзя отменить. Задача будет удалена навсегда.',
    'taskDetail.deleteAction': 'Удалить',

    // Categories
    'categories.title': 'Категории',
    'categories.subtitle': 'Управление категориями задач',
    'categories.work': 'Работа',
    'categories.study': 'Учёба',
    'categories.personal': 'Личное',
    'categories.other': 'Другое',
    'categories.total': 'Всего',
    'categories.completed': 'Готово',
    'categories.inProgress': 'В процессе',
    'categories.addCustom': 'Добавить категорию',
    'categories.fixedNotice': 'Категории фиксированы в текущей версии. В будущем можно добавить кастомные категории.',

    // Settings
    'settings.title': 'Настройки',
    'settings.subtitle': 'Управление предпочтениями и данными',
    'settings.general': 'Общие',
    'settings.appearance': 'Внешний вид',
    'settings.data': 'Данные',
    'settings.account': 'Аккаунт',
    'settings.languageRegion': 'Язык и регион',
    'settings.language': 'Язык',
    'settings.timezone': 'Часовой пояс',
    'settings.autoDetect': 'Автоопределение',
    'settings.moscow': 'Москва (UTC+3)',
    'settings.kyiv': 'Киев (UTC+2/UTC+3)',
    'settings.notifications': 'Уведомления',
    'settings.deadlineNotifications': 'Уведомления о дедлайнах',
    'settings.dailyDigest': 'Ежедневный дайджест',
    'settings.weeklyStats': 'Недельная статистика',
    'settings.animations': 'Анимации',
    'settings.enableAnimations': 'Включить анимации',
    'settings.theme': 'Тема',
    'settings.dark': 'Тёмная',
    'settings.light': 'Светлая',
    'settings.system': 'Системная',
    'settings.exportData': 'Экспорт данных',
    'settings.exportDesc': 'Скачайте все свои задачи в JSON формате для бэкапа или переноса.',
    'settings.exportButton': 'Экспортировать задачи (JSON)',
    'settings.importData': 'Импорт данных',
    'settings.importDesc': 'Загрузите ранее экспортированный JSON файл.',
    'settings.importButton': 'Выбрать файл',
    'settings.clearData': 'Очистка данных',
    'settings.clearDesc': 'Удалите все задачи навсегда. Это действие нельзя отменить.',
    'settings.clearButton': 'Удалить все задачи',
    'settings.clearConfirm': 'Удалить все задачи?',
    'settings.clearConfirmDesc': 'Это действие удалит все ваши задачи без возможности восстановления. Вы уверены?',
    'settings.clearAction': 'Удалить всё',
    'settings.storageStats': 'Статистика хранилища',
    'settings.notificationsDemo': 'Настройки сохраняются локально. Реальные уведомления не отправляются (демо).',
    'settings.profileDemo': 'Профиль сохраняется локально в браузере. Синхронизации и авторизации нет (демо).',
    'settings.tasksCount': 'Задач',
    'settings.dataSize': 'Размер данных',
    'settings.profile': 'Профиль',
    'settings.name': 'Имя',
    'settings.email': 'Email',
    'settings.appInfo': 'О приложении',
    'settings.versionLabel': 'TaskFlow v1.0.0',

    // Status labels
    'status.todo': 'К выполнению',
    'status.inProgress': 'В процессе',
    'status.review': 'На проверке',
    'status.done': 'Готово',

    // Priority labels
    'priority.low': 'Низкий',
    'priority.medium': 'Средний',
    'priority.high': 'Высокий',

    // Category labels
    'category.work': 'Работа',
    'category.study': 'Учёба',
    'category.personal': 'Личное',
    'category.other': 'Другое',
  },
  en: {
    // Common
    'app.name': 'TaskFlow',
    'app.loading': 'Loading...',
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.delete': 'Delete',
    'common.edit': 'Edit',
    'common.create': 'Create',
    'common.back': 'Back',
    'common.search': 'Search',
    'common.filter': 'Filters',
    'common.clear': 'Clear',
    'common.confirm': 'Confirm',
    'common.yes': 'Yes',
    'common.no': 'No',
    'common.close': 'Close',
    'common.settings': 'Settings',
    'common.profile': 'Profile',
    'common.logout': 'Logout',
    'common.language': 'Language',
    'common.theme': 'Theme',
    'common.animations': 'Animations',
    'common.notifications': 'Notifications',
    'common.export': 'Export',
    'common.import': 'Import',
    'common.clearAll': 'Clear All',
    'common.storage': 'Storage',
    'common.tasks': 'tasks',
    'common.size': 'size',
    'common.about': 'About',
    'common.version': 'Version',
    'common.madeWithCare': 'Made with attention to detail',

    // Dashboard
    'dashboard.title': 'Dashboard',
    'dashboard.subtitle': 'Overview of your tasks and progress',
    'dashboard.newTask': 'New Task',
    'dashboard.allTasks': 'All Tasks',
    'dashboard.totalTasks': 'Total Tasks',
    'dashboard.completed': 'Completed',
    'dashboard.inProgress': 'In Progress',
    'dashboard.progress': 'Progress',
    'dashboard.weeklyActivity': 'Weekly Activity',
    'dashboard.created': 'Created',
    'dashboard.completedShort': 'Completed',
    'dashboard.statusDistribution': 'Status Distribution',
    'dashboard.recentTasks': 'Recent Tasks',
    'dashboard.noTasks': 'No tasks yet',
    'dashboard.createFirstTask': 'Create first task',

    // Tasks
    'tasks.title': 'Tasks',
    'tasks.subtitle': 'tasks',
    'tasks.newTask': 'New Task',
    'tasks.resetFilters': 'Reset Filters',
    'tasks.noTasks': 'No tasks yet',
    'tasks.noResults': 'Nothing found',
    'tasks.changeFilters': 'Try changing filters or search query',
    'tasks.createFirstTask': 'Create your first task to get started',
    'tasks.edit': 'Edit',
    'tasks.delete': 'Delete',
    'tasks.markComplete': 'Mark complete',
    'tasks.markIncomplete': 'Mark incomplete',

    // New Task
    'newTask.title': 'New Task',
    'newTask.subtitle': 'Fill in the fields below to create a task',
    'newTask.back': 'Back to tasks',
    'newTask.name': 'Title',
    'newTask.namePlaceholder': 'Enter task title',
    'newTask.description': 'Description',
    'newTask.descriptionPlaceholder': 'Add description (optional)',
    'newTask.status': 'Status',
    'newTask.priority': 'Priority',
    'newTask.category': 'Category',
    'newTask.deadline': 'Deadline',
    'newTask.cancel': 'Cancel',
    'newTask.create': 'Create Task',
    'newTask.creating': 'Creating...',
    'newTask.nameRequired': 'Task title is required',
    'newTask.nameMaxLength': 'Title must not exceed 100 characters',
    'newTask.descriptionMaxLength': 'Description must not exceed 1000 characters',

    // Task Detail
    'taskDetail.notFound': 'Task not found',
    'taskDetail.back': 'Back to list',
    'taskDetail.description': 'Description',
    'taskDetail.info': 'Information',
    'taskDetail.deadline': 'Deadline',
    'taskDetail.created': 'Created',
    'taskDetail.completed': 'Completed',
    'taskDetail.overdue': 'Overdue',
    'taskDetail.edit': 'Edit',
    'taskDetail.delete': 'Delete',
    'taskDetail.deleteConfirm': 'Delete task?',
    'taskDetail.deleteDesc': 'This action cannot be undone. The task will be deleted permanently.',
    'taskDetail.deleteAction': 'Delete',

    // Categories
    'categories.title': 'Categories',
    'categories.subtitle': 'Manage task categories',
    'categories.work': 'Work',
    'categories.study': 'Study',
    'categories.personal': 'Personal',
    'categories.other': 'Other',
    'categories.total': 'Total',
    'categories.completed': 'Completed',
    'categories.inProgress': 'In Progress',
    'categories.addCustom': 'Add Category',
    'categories.fixedNotice': 'Categories are fixed in the current version. Custom categories may be added in the future.',

    // Settings
    'settings.title': 'Settings',
    'settings.subtitle': 'Manage preferences and data',
    'settings.general': 'General',
    'settings.appearance': 'Appearance',
    'settings.data': 'Data',
    'settings.account': 'Account',
    'settings.languageRegion': 'Language & Region',
    'settings.language': 'Language',
    'settings.timezone': 'Timezone',
    'settings.autoDetect': 'Auto detect',
    'settings.moscow': 'Moscow (UTC+3)',
    'settings.kyiv': 'Kyiv (UTC+2/UTC+3)',
    'settings.notifications': 'Notifications',
    'settings.deadlineNotifications': 'Deadline notifications',
    'settings.dailyDigest': 'Daily digest',
    'settings.weeklyStats': 'Weekly stats',
    'settings.animations': 'Animations',
    'settings.enableAnimations': 'Enable animations',
    'settings.theme': 'Theme',
    'settings.dark': 'Dark',
    'settings.light': 'Light',
    'settings.system': 'System',
    'settings.exportData': 'Export Data',
    'settings.exportDesc': 'Download all your tasks in JSON format for backup or transfer.',
    'settings.exportButton': 'Export tasks (JSON)',
    'settings.importData': 'Import Data',
    'settings.importDesc': 'Upload a previously exported JSON file.',
    'settings.importButton': 'Choose file',
    'settings.clearData': 'Clear Data',
    'settings.clearDesc': 'Delete all tasks permanently. This action cannot be undone.',
    'settings.clearButton': 'Delete all tasks',
    'settings.clearConfirm': 'Delete all tasks?',
    'settings.clearConfirmDesc': 'This action will delete all your tasks without the possibility of recovery. Are you sure?',
    'settings.clearAction': 'Delete everything',
    'settings.storageStats': 'Storage Statistics',
    'settings.notificationsDemo': 'Settings are saved locally. Real notifications are not sent (demo).',
    'settings.profileDemo': 'Profile is saved locally in the browser. No sync or authentication (demo).',
    'settings.tasksCount': 'Tasks',
    'settings.dataSize': 'Data size',
    'settings.profile': 'Profile',
    'settings.name': 'Name',
    'settings.email': 'Email',
    'settings.appInfo': 'About App',
    'settings.versionLabel': 'TaskFlow v1.0.0',

    // Status labels
    'status.todo': 'To Do',
    'status.inProgress': 'In Progress',
    'status.review': 'In Review',
    'status.done': 'Done',

    // Priority labels
    'priority.low': 'Low',
    'priority.medium': 'Medium',
    'priority.high': 'High',

    // Category labels
    'category.work': 'Work',
    'category.study': 'Study',
    'category.personal': 'Personal',
    'category.other': 'Other',
  },
};
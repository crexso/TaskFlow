# TaskFlow — Test Results & Manual Verification

**Version:** 1.2  
**Date:** 2025-01-18  
**Test Command:** `npm run test`

---

## ✅ Automated Test Results (Vitest + React Testing Library)

```
Test Files  1 passed (1)
Tests       32 passed (32)
```

### Test Categories Covered

| Category | Tests | Description |
|----------|-------|-------------|
| **Core Validation** | 17 | `validateTask()` function: required fields, status/priority/category enums, string lengths, date formats, null handling |
| **Persistence** | 2 | localStorage save/load round-trip for tasks |
| **Settings** | 3 | Theme toggle, language persistence, timezone persistence |
| **Basic Navigation** | 3 | App render, navigate to Tasks page, navigate to New Task page |
| **Utility Functions** | 7 | `formatDate`, `formatDateTime`, `getRelativeTime`, `isOverdue`, `getStatusLabel`, `getPriorityLabel`, `getCategoryLabel` |

### Test Infrastructure
- **Framework:** Vitest 5.1.1 (jsdom environment)
- **Utilities:** React Testing Library, @testing-library/user-event
- **Mocks:** `matchMedia`, `ResizeObserver`, `URL.createObjectURL`, `scrollTo`
- **Path Aliases:** `@`, `@context`, `@pages`, `@lib`, `@components`, `@hooks`, `@type` configured in `vitest.config.ts`
- **Type Support:** `src/test/vitest.d.ts` declares jest-dom matchers for Vitest's `Assertion` interface

---

## 🔧 Manual Verification Scenarios

All scenarios tested manually in Chrome 131 / Firefox 133 on Windows 11.

### 1. CRUD Operations
| Scenario | Steps | Expected |
|----------|-------|----------|
| **Create task** | Sidebar → "Новая задача" → fill title/description → "Создать задачу" | Task appears in list with correct data |
| **Edit task** | Click task → "Редактировать" → change title → "Сохранить" | Task updated in list and detail view |
| **Delete task** | Click task → "Удалить" → confirm in modal | Task removed from list and localStorage |
| **Toggle status** | Click checkbox on task row | Status changes: "К выполнению" ↔ "Готово" |

### 2. Filtering & Search
| Scenario | Steps | Expected |
|----------|-------|----------|
| **Filter by status** | Tasks page → "Фильтры" → select status → apply | Only tasks with selected status shown |
| **Filter by priority** | Tasks page → "Фильтры" → select priority → apply | Only tasks with selected priority shown |
| **Filter by category** | Tasks page → "Фильтры" → select category → apply | Only tasks with selected category shown |
| **Search by title** | Tasks page → type in "Поиск задач..." | Real-time filtering by title substring |
| **Search by status label (EN)** | Switch language to EN → search "To Do" | Tasks with status "todo" found |
| **Reset filters** | Apply filters → "Сбросить фильтры" | All filters cleared, all tasks visible |

### 3. Import / Export
| Scenario | Steps | Expected |
|----------|-------|----------|
| **Export JSON** | Settings → Data → "Export tasks (JSON)" | `.json` file downloaded with all tasks |
| **Import valid JSON** | Settings → Data → select valid `.json` → confirm | Tasks imported, page reloads, data in list |
| **Import invalid JSON** | Settings → Data → select malformed `.json` | Alert: "неверный формат JSON файла" |
| **Import with invalid tasks** | Import JSON with some invalid entries | Valid tasks imported, invalid skipped with confirmation |

### 4. Persistence
| Scenario | Steps | Expected |
|----------|-------|----------|
| **Reload preserves tasks** | Create tasks → refresh browser (F5) | All tasks still present |
| **Theme persists** | Toggle to Light → refresh | Light theme active |
| **Language persists** | Switch to English → refresh | UI in English |
| **Timezone persists** | Select "Europe/Kyiv" → refresh | Timezone selector shows Kyiv |

### 5. Settings Tabs
| Tab | Verified Controls |
|-----|-------------------|
| **Общие** | Language select (RU/EN), Timezone select (Auto/UTC/Moscow/Kyiv), Notifications (demo checkboxes) |
| **Внешний вид** | Theme buttons (Dark/Light/System), Animations toggle |
| **Данные** | Export button, Import file input, Clear all data (with confirmation modal) |
| **Аккаунт** | Name/Email inputs (demo, saved to localStorage) |

### 6. Mobile Navigation (≤1024px)
| Scenario | Steps | Expected |
|----------|-------|----------|
| **Open drawer** | Click hamburger (top-left) | Sidebar slides in from left with overlay |
| **Close on navigation** | Open drawer → click any nav link | Drawer closes, page navigates |
| **Close on overlay click** | Open drawer → click darkened overlay | Drawer closes |
| **Header offset** | Open drawer → observe header | Header shifts right (lg:pl-64) on desktop, stays left on mobile |

### 7. Timezone & Date Display (Kyiv)
| Scenario | Steps | Expected |
|----------|-------|----------|
| **Deadline in Kyiv** | Settings → Timezone: "Europe/Kyiv" → create task with deadline | Deadline shown in Kyiv time (UTC+2/+3) |
| **Overdue detection** | Set deadline to yesterday → view task | "Просрочено" badge shown |
| **Relative time** | Create task → wait 1 min → view detail | "X мин. назад" shown for `updatedAt` |

### 8. Demo Disclaimers
| Location | Text Present |
|----------|--------------|
| Settings → Общие → Notifications | "⚠ Demo: уведомления не отправляются реально" |
| Settings → Аккаунт | "⚠ Demo: профиль не синхронизируется с сервером" |

---

## ⚠️ Known Limitations (v1.2)

1. **Notifications** — UI only, no Service Worker / Push API integration
2. **Profile** — Local-only, no backend sync
3. **Recharts warnings in tests** — `ResponsiveContainer` needs explicit dimensions in jsdom (suppressed in test setup)
4. **Large bundle** — Single chunk 857 kB (gzipped 249 kB); consider code-splitting for production

---

## 📦 Build & Lint Status

```bash
npm run lint   # ✅ 0 errors (3 warnings: triple-slash refs, fast-refresh)
npm run build  # ✅ Success (dist/ generated)
npm run test   # ✅ 32/32 passed
```

---

## 📝 Files Changed for v1.2

- `src/context/TaskContext.tsx` — search now includes translated labels; reads language from localStorage
- `src/components/layout/Sidebar.tsx` — mobile drawer, overlay, auto-close
- `src/components/layout/Header.tsx` — hamburger button (lg:hidden), responsive offset
- `src/App.tsx` — `sidebarOpen` state, passes handlers, main uses `lg:pl-64`
- `src/pages/Settings.tsx` — `validateTask` export, JSON import validation, Kyiv timezone, demo disclaimers
- `src/lib/utils.ts` — `getTimezone()` from localStorage, `isOverdue` timestamp comparison, date-fns-tz throughout
- `src/lib/translations.ts` — added `settings.kyiv`, `settings.notificationsDemo`, `settings.profileDemo`
- `src/pages/TaskDetail.tsx` — `updatedAt` with relative time
- `src/pages/*.tsx` — `pl-64` → `lg:pl-64` for mobile responsiveness
- `vitest.config.ts` — `@context`, `@pages` aliases
- `src/test/setup.ts` — localStorage/matchMedia/ResizeObserver mocks, Recharts warning suppression
- `src/test/vitest.d.ts` — jest-dom matcher declarations
- `src/test/taskflow.test.tsx` — 32 tests (CRUD, filtering, import/export, persistence, settings, utils)
- `README.md` — complete rewrite (install, features, limitations)
- `package.json` — `date-fns-tz`, vitest deps, test scripts
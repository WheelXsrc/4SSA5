# 4SSA5 - Conference Portal & Angular Lab

A modern, responsive Angular application developed for the **4SSA5 Web Development** course. This project showcases modern Angular 21 features, reactive state with Signals, two-way data binding, dynamic routing with component input binding, and responsive UI components.

---

## 🌟 Key Features & Demonstrations

### 1. Interactive Angular Fundamentals Lab (`/home`)
- **Data Binding Showcase**: Interpolation, property binding (`[src]`), and event binding (`(click)`).
- **Two-way Data Binding**: Synchronized inputs with `[(ngModel)]` and live condition testing.
- **Signals vs Component State**: Live comparison between Angular Signals (`signal()`, `.update()`) and classic class properties.
- **Modern Control Flow**: `@if` / `@else` conditions and `@for` track loops for primitive and structured object collections.

### 2. Conferences Portal (`/list`)
- Dynamic event catalog featuring technical summits and conferences.
- Card grid with category badges, high-resolution media, dates, locations, and interactive transitions.
- Fully typed data source via Angular Injectable service (`Conferance`).

### 3. Dynamic Conference Details (`/details/:id`)
- Route parameter retrieval via Angular's `withComponentInputBinding()` (`input.required<string>()`).
- Event banner overlay with category tags, capacity, and detailed descriptions.
- Graceful fallback for non-existent conferences with a return-to-list action.

### 4. Custom 404 Not Found (`/**`)
- Styled error page with helpful navigation fallbacks back to Home and Conference listings.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm (v10+)

### Installation
```bash
npm install
```

### Development Server
Run the local dev server:
```bash
npm start
```
Navigate to `http://localhost:4200/` in your browser. The application will automatically reload if you change any source files.

### Build
To build the application bundle for production:
```bash
npm run build
```
Build artifacts will be stored in the `dist/ssa5` directory.

---

## 🛠️ Technology Stack
- **Framework**: Angular 21
- **Language**: TypeScript 5.9
- **Reactivity**: Angular Signals & RxJS
- **Router**: Angular Router with Component Input Binding
- **Test Runner**: Vitest & JSDOM

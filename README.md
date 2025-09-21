# Creative Upaay Task Management Dashboard

A beautiful, production-ready task management dashboard built with React.js, Redux, and Tailwind CSS. Features drag-and-drop functionality, advanced filtering, and persistent local storage.

## 🚀 Features

- **Pixel-Perfect UI**: Beautiful, modern design with attention to detail
- **Kanban Board**: Three-column layout (To Do, In Progress, Done)
- **Drag & Drop**: Intuitive task movement between columns
- **Advanced Filtering**: Filter by category, priority, and search terms
- **Persistent Storage**: Tasks saved to localStorage and restored on refresh
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Redux State Management**: Centralized, predictable state management
- **Production Ready**: Clean code structure and best practices

## 🛠️ Technologies Used

- **React.js** - Component-based UI framework
- **TypeScript** - Type-safe JavaScript
- **Redux** - Predictable state container
- **Tailwind CSS** - Utility-first CSS framework
- **React Beautiful DnD** - Drag and drop functionality
- **Lucide React** - Beautiful icons
- **Vite** - Fast build tool and dev server

## 📦 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd creative-upaay-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

## 🎯 Core Features

### Task Management
- **Add Tasks**: Create new tasks with title, description, category, priority, and due date
- **Move Tasks**: Drag and drop tasks between columns or use status updates
- **Delete Tasks**: Remove unwanted tasks with confirmation
- **Filter Tasks**: Advanced filtering by category, priority, and search terms

### State Management
- **Redux Store**: Centralized state management with proper actions and reducers
- **Local Storage**: Automatic persistence of tasks and filters
- **Type Safety**: Full TypeScript integration for better development experience

### User Experience
- **Responsive Design**: Works seamlessly across all device sizes
- **Beautiful Animations**: Smooth transitions and micro-interactions
- **Intuitive Interface**: Clean, modern design following best practices
- **Performance Optimized**: Efficient rendering and state updates

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── TaskCard.tsx     # Individual task display
│   ├── TaskColumn.tsx   # Kanban column component
│   ├── AddTaskModal.tsx # Task creation modal
│   ├── FilterBar.tsx    # Filtering interface
│   └── Header.tsx       # Application header
├── redux/              # State management
│   ├── actions/        # Action creators
│   ├── reducers/       # State reducers
│   └── store.ts        # Redux store configuration
├── types/              # TypeScript type definitions
├── utils/              # Helper functions
└── App.tsx             # Main application component
```

## 🔧 Configuration

### Environment Variables
No environment variables required for basic functionality.

### Local Storage
Tasks are automatically saved to localStorage under the key `dashboardState`.

## 🚀 Deployment

The application is ready for deployment on any static hosting service:

- **Netlify**: Connect your GitHub repository for automatic deployments
- **Vercel**: Import project and deploy with zero configuration
- **GitHub Pages**: Use the built files from the `dist` folder

## 🎨 Customization

### Adding New Task Categories
1. Update the `Task` interface in `src/types/index.ts`
2. Add the new category to the dropdown in `AddTaskModal.tsx`
3. Update the color scheme in `TaskCard.tsx`

### Modifying Styles
The application uses Tailwind CSS for styling. Key design tokens:
- **Primary Color**: Blue (blue-500, blue-600, etc.)
- **Success Color**: Green (green-500, green-600, etc.)
- **Warning Color**: Yellow (yellow-500, yellow-600, etc.)
- **Error Color**: Red (red-500, red-600, etc.)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🎥 Demo

[Include a link to your live demo here]

---

**Created with ❤️ for Creative Upaay Full Stack Development Assignment**

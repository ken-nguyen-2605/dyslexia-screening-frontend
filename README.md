# DyslexiaDetect

A modern web application for dyslexia screening built with React, TypeScript, and Tailwind CSS. This project provides an accessible and user-friendly interface for early detection and assessment of dyslexia symptoms.

## 🚀 Features

-   **Modern UI/UX**: Clean and responsive design built with Tailwind CSS
-   **Accessibility-Focused**: Designed with accessibility best practices for users with learning differences
-   **Type-Safe**: Built with TypeScript for better code quality and developer experience
-   **Fast Development**: Powered by Vite for lightning-fast hot module replacement
-   **Routing**: Client-side routing with React Router DOM

## 🛠️ Tech Stack

-   **Frontend Framework**: React 19
-   **Language**: TypeScript
-   **Styling**: Tailwind CSS 4.1
-   **Build Tool**: Vite 7
-   **Routing**: React Router DOM 7.6
-   **Code Quality**: ESLint with TypeScript ESLint
-   **Package Manager**: npm

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Header.tsx      # Navigation header
│   ├── Footer.tsx      # Site footer
│   └── Layout.tsx      # Main layout wrapper
├── pages/              # Page components
│   ├── Home.tsx        # Home page
│   └── About.tsx       # About page
├── hooks/              # Custom React hooks
├── utils/              # Utility functions
├── assets/             # Static assets
├── App.tsx             # Main application component
├── main.tsx            # Application entry point
└── index.css           # Global styles
```

## 🚀 Getting Started

### Prerequisites

-   Node.js (version 18 or higher)
-   npm or yarn package manager

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd dyslexia-screening-frontend
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 📜 Available Scripts

-   `npm run dev` - Start the development server
-   `npm run build` - Build the project for production
-   `npm run preview` - Preview the production build locally
-   `npm run lint` - Run ESLint to check code quality

## 🏗️ Building for Production

To create a production build:

```bash
npm run build
```

The built files will be in the `dist` directory, ready to be deployed to any static hosting service.

## 🧪 Development

### Code Quality

This project uses ESLint with TypeScript-specific rules to maintain code quality. The configuration includes:

-   Strict TypeScript checking
-   React-specific linting rules
-   Modern JavaScript best practices

### Styling

The project uses Tailwind CSS for styling with a utility-first approach. The configuration is optimized for:

-   Responsive design
-   Accessibility
-   Modern CSS features

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is developed by a group of students in HCMUT (Ho Chi Minh City University of Technology).

## 🔧 Configuration

### ESLint Configuration

For production applications, consider updating the ESLint configuration to enable type-aware lint rules:

```js
export default tseslint.config([
	globalIgnores(["dist"]),
	{
		files: ["**/*.{ts,tsx}"],
		extends: [
			...tseslint.configs.recommendedTypeChecked,
			...tseslint.configs.strictTypeChecked,
			...tseslint.configs.stylisticTypeChecked,
		],
		languageOptions: {
			parserOptions: {
				project: ["./tsconfig.node.json", "./tsconfig.app.json"],
				tsconfigRootDir: import.meta.dirname,
			},
		},
	},
]);
```

## 📞 Support

For questions, issues, or contributions, please contact the development team at HCMUT.

---

Built with ❤️ by HCMUT Students

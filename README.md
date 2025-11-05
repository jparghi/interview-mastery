# Interview Mastery UI

An interactive React + Vite experience for exploring Java interview questions with searchable Q&A cards, code snippets, and Mermaid diagram support.

## Getting Started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Run the development server:

   ```bash
   npm run dev
   ```

3. Build for production:

   ```bash
   npm run build
   ```

## Features

- Search and filter Java interview questions by topic or keyword
- Interview mode for practicing without seeing answers immediately
- Syntax highlighted Java code snippets using Prism.js
- Inline Mermaid diagram rendering for visual explanations
- Responsive layout styled with Tailwind CSS and animated with Framer Motion

## Project Structure

```
interivew-mastery/
├── public/
│   └── questions/
├── src/
│   ├── components/
│   ├── data/
│   ├── pages/
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
└── README.md
```

Add additional questions to `src/data/questions.json` or place Markdown/JSON sources inside `public/questions/` for future ingestion pipelines.

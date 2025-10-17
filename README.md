# cafe-frontend
Front-End of a Cafe Website

## Set Up [Vite](https://github.com/vitejs/vite) for the Project
1. Make sure you have installed [Node.js](https://github.com/nodejs/node).
2. Clone this repo to your machine.
3. Run this command in your repo:
  ```shell
  npm install
  ```
4. You can now open [Vite](https://github.com/vitejs/vite) using this commnad:
  ```shell
  npx vite
  ```

You can learn more from this video:

<a href="http://www.youtube.com/watch?feature=player_embedded&v=vj8KSZjPTUU" target="_blank">
 <img src="https://i.ytimg.com/vi/vj8KSZjPTUU/maxresdefault.jpg" alt="Watch the video" width="560" height="315" border="10" />
</a>

## Proposed Project Structure with Vite

```
my-website/
├── public/
│   ├── index.html              # Main HTML page (non-React)
│   ├── menu.html               # Loads React menu page
│   └── assets/
│       ├── images/             # Static images
│       └── fonts/              # Fonts if needed
├── src/
│   ├── main.jsx                # Vite entry point for React
│   ├── MenuPage.jsx            # React menu page component
│   ├── components/
│   │   ├── MenuCard.jsx        # Individual card component
│   │   ├── CategoryList.jsx    # Sidebar categories
│   │   └── SubcategoryTitle.jsx# Subcategory title
│   └── styles/
│       └── card.css            # Shared CSS
├── index.html                  # Vite root HTML (used for menu page)
├── vite.config.js              # Vite config
├── package.json                # Dependencies and scripts
└── README.md
```

## Setup Steps

### 1. **Initialize Vite**

```bash
npm create vite@latest my-website --template react
cd my-website
npm install
```

### 2. **Configure Vite for a Custom HTML Entry**

Update `vite.config.js` to support multiple pages:

```js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        menu: 'menu.html'
      }
    }
  }
});
```

### 3. **Create `menu.html`**

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Menu Page</title>
    <link rel="stylesheet" href="/src/styles/card.css" />
  </head>
  <body>
    <div id="menu-root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

### 4. **React Entry (`main.jsx`)**

```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import MenuPage from './MenuPage';
import './styles/card.css';

ReactDOM.createRoot(document.getElementById('menu-root')).render(
  <React.StrictMode>
    <MenuPage />
  </React.StrictMode>
);
```
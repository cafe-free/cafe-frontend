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

## Proposed Project Structure
```
my-website/
├── public/
│   ├── index.html              # Main HTML file for non-React pages
│   ├── menu.html               # HTML file that loads the React menu page
│   ├── assets/
│   │   ├── images/             # Static images
│   │   └── fonts/              # Custom fonts if needed
├── src/
│   ├── index.js                # Entry point for React (menu page only)
│   ├── MenuPage.jsx            # React component for the menu page
│   ├── components/
│   │   ├── MenuCard.jsx        # Individual menu card component
│   │   ├── CategoryList.jsx    # Sidebar category list
│   │   └── SubcategoryTitle.jsx# Subcategory title component
│   ├── styles/
│   │   └── card.css            # Shared CSS for menu styling
├── package.json                # Project dependencies and scripts
├── webpack.config.js           # Webpack config to bundle React
└── README.md                   # Project documentation
```

## How It Works
- `menu.html` includes a `<div id="menu-root"></div>` and loads the React bundle.
- `index.html` and other pages remain unchanged and use traditional HTML/CSS/JS.
- React components are modular and styled using `card.css` or CSS Modules.
- Webpack (or Vite) bundles React code into a single JS file (e.g., `menu.bundle.js`) that’s included in `menu.html`.

## Sample `menu.html`
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Menu Page</title>
  <link rel="stylesheet" href="/styles/card.css" />
</head>
<body>
  <div id="menu-root"></div>
  <script src="/dist/menu.bundle.js"></script>
</body>
</html>
```

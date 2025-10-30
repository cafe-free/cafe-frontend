// import './globals.css'

export const metadata = {
  title: 'Cafe de Coral',
  description: 'Wandering Time - A cozy cafe experience',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        {/* <link rel="stylesheet" href="/css/sanitize.css" /> */}
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}

import './envConfig.js';
 
export default defineConfig({
  dbCredentials: {
    connectionString: process.env.MONGODB_URI,
  },
})

// console.log(process.env.MONGODB_URI);
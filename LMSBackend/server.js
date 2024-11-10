const app = require("./app");

// Set the port (use 3000 or any available port)
const PORT = process.env.APP_PORT || 3500;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

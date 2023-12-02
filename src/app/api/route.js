// pages/api/your-api-route.js
import Cors from "cors";

// Initializing the cors middleware
const cors = Cors({
  methods: ["GET", "HEAD", "POST", "PUT", "PATCH", "DELETE"],
});

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

// Your API route
export default async function handler(req, res) {
  // Run cors
  await runMiddleware(req, res, cors);

  // Your API logic here
  res.status(200).json({ message: "Hello, World!" });
}

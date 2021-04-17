let BASE_URL: string;

if (process.env.NODE_ENV === "development") {
  BASE_URL = "http://localhost:5000/api/v1";
} else {
  BASE_URL = "https://ampersand-careers.onrender.com/api/v1";
}

export { BASE_URL };

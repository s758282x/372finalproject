const API_URL = process.env.NODE_ENV === "production"
  ? "https://finalback-ejdffjg2fjgedkde.centralus-01.azurewebsites.net/api"
  : "http://localhost:5001/api";

export default API_URL;

import axios from "axios";

export default axios.create({
  baseURL: "http://127.0.0.1:8089/api",
  headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Accept' : 'application/json, text/plain, */*',
      'Access-Control-Allow-Methods' : 'GET, PUT, POST, DELETE, OPTIONS',
      'Access-Control-Allow-Credentials' : true
    }
});
import http from "./httpService";
import { apiUrl } from "../config.json";
const apiEndPoint = apiUrl + "/users";

export function register(username, password, name) {
  return http.post(apiEndPoint, {
    email: username,
    password: password,
    name: name,
  });
}

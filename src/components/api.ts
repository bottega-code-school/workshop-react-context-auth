import axios from "axios";

export default axios.create({
  baseURL: "https://61a68ecb8395690017be932e.mockapi.io/",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json; charset=UTF-8",
  },
});

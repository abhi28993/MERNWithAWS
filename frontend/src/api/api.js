import axios from "axios";

const production = "";
const local = "http://localhost:5000";
//-----------
let api_url = "";
let mode = "pro";

if (mode === "pro") {
  api_url = production;
} else {
  api_url = local;
}
const api = axios.create({
    baseURL : `${api_url}/api`
})


export default api;

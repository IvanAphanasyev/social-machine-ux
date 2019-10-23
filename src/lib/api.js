import axios from "axios";

const domain =
  process.env.NODE_ENV === "production"
    ? "https://social-machine-api.herokuapp.com"
    : "http://localhost:7777";
const version = "v1";
const get = async (q, config) => {
  console.log(`get requset to ${domain}/api/${version}${q}`);
  return new Promise(async (resolve, reject) => {
    const response = await axios
      .get(
        `${domain}/api/v1${q}`,
        config ? config : { "Content-Type": "application/json; charset=utf-8" }
      )
      .catch(err => reject(err));
    console.log(response);
    resolve(response);
  });
};
const post = async (q, data, config) => {
  console.log(`post requset to ${domain}/api/${version}${q}`);
  return new Promise(async (resolve, reject) => {
    const response = await axios
      .post(
        `${domain}/api/v1${q}`,
        data,
        config ? config : { "Content-Type": "application/json; charset=utf-8" }
      )
      .catch(err => {
        reject(err);
      });
    resolve(response);
  });
};
export default { get, post };

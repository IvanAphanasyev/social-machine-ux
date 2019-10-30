import axios from "axios";
import jwt from "./jwt";

const domain =
  process.env.NODE_ENV === "production"
    ? "https://social-machine-api.herokuapp.com"
    : "http://localhost:7777";
const version = "v1";

const get = async (q, config) => {
  console.log(`get requset to ${domain}/api/${version}${q}`);
  return new Promise(async (resolve, reject) => {
    const options = config
      ? config
      : {
          "Content-Type": "application/json; charset=utf-8",
          headers: {
            accesstoken: await jwt
              .access()
              .catch(err => reject("rejected on access"))
          }
        };
    axios
      .get(`${domain}/api/v1${q}`, options)
      .then(responce => {
        resolve(responce);
        return responce;
      })
      .then(x => {
        console.log("from api:", x);
        return x;
      })
      .catch(err => reject(err));
  });
};
const post = async (q, data, config) => {
  console.log(`post requset to ${domain}/api/${version}${q}`);
  return new Promise(async (resolve, reject) => {
    const options = config
      ? config
      : {
          "Content-Type": "application/json; charset=utf-8",
          headers: {
            accesstoken: await jwt
              .access()
              .catch(err => reject("rejected on access"))
          }
        };

    axios
      .post(`${domain}/api/v1${q}`, data, options)
      .then(responce => {
        resolve(responce);
        return responce;
      })
      .then(x => {
        console.log("from api:", x);
        return x;
      })
      .catch(err => reject(err));
  });
};
export default { get, post };

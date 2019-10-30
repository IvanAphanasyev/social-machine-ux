import api from "./api";
import Cookies from "js-cookie";

const access = async () => {
  const jwt = Cookies.get("jwt") ? Cookies.getJSON("jwt") : null;
  console.log("try parse jwt", jwt);
  return new Promise((resolve, reject) => {
    if (!jwt) reject("jwt is null");
    else {
      const expire = jwt.expiresIn;
      let accessToken = jwt.accessToken;
      const refreshToken = jwt.refreshToken;

      if (Date.now() > expire) {
        //session is out, need send to api refresh token for getting new jwt pair;
        console.log("refresh");
        api
          .post(
            "/auth/refresh",
            {},
            {
              headers: { refreshtoken: refreshToken }
            }
          )
          .then(response => {
            Cookies.set("jwt", response.data);
            return response.data.accessToken;
          })
          .then(token => resolve(token))
          .catch(err => {
            console.log("delete cookies in catch in jwt");
            Cookies.remove("jwt");
            reject(err);
          });
        //save it to Cookiess
      } else {
        resolve(accessToken);
      }
    }
  });
};

const expire = exp => {
  return exp ? Date.now() < exp : null;
};
export default { access, expire };

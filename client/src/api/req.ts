const API_URL = "/api";

const req = (path: string, method?: "POST" | "GET" | "DELETE", body?: {}) =>
  new Promise(async (resolve, reject) => {
    if (!method) method = "GET";
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };
    const mode = "cors";
    const credentials = "include";
    try {
      const res = await fetch(API_URL + path, {
        headers,
        method,
        body: method == "GET" ? null : JSON.stringify(body),
        credentials,
        mode,
      });
      const json = await res.json();
      const { status } = res;
      if (status >= 200 && status < 300) resolve(json);
      else if (status == 401) unAuthorized();
      else reject(json?.message);
    } catch (error) {
      reject((error as any).toString());
    }
  });

const unAuthorized = () => {
  document.cookie = "isloggedin=;Max-Age=0";
  document.cookie = "token=;Max-age=0";
  document.cookie = "refreshid=;Max-Age=0";
  document.location.reload();
};

export default req;

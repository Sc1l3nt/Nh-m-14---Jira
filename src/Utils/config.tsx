import axios from "axios";
import { createBrowserHistory } from "history";
export const DOMAIN = "https://jiranew.cybersoft.edu.vn/api";

export const history = createBrowserHistory();

export const USER_LOGIN: string = "user_login";
export const ACCESS_TOKEN: string = "access_token";

export const http = axios.create({
  baseURL: "DOMAIN",
  timeout: 30000,
});

export const settings = {
  setStorageJson: (name: string, data: any): void => {
    data = JSON.stringify(data);
    localStorage.setItem(name, data);
  },
  setStorage: (name: string, data: string): void => {
    localStorage.setItem(name, data);
  },
  getStorageJson: (name: string): any | undefined => {
    if (localStorage.getItem(name)) {
      const dataStore: string | undefined | null = localStorage.getItem(name);
      if (typeof dataStore == "string") {
        const data = JSON.parse(dataStore);
        return data;
      }
      return undefined;
    }
    return; //undefined
  },
  getStore: (name: string): string | null | undefined | boolean | any => {
    if (localStorage.getItem(name)) {
      const data: string | null | undefined = localStorage.getItem(name);
      return data;
    }
    return; //undefined
  },
  setCookieJson: (name: string, value: any, days: number): void => {
    var expires = "";
    if (days) {
      var date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = "; expires=" + date.toUTCString();
    }
    value = JSON.stringify(value);
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
  },
  getCookieJson: (name: string): any => {
    var nameEQ = name + "=";
    var ca = document.cookie.split(";");
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == " ") c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) == 0)
        return JSON.parse(c.substring(nameEQ.length, c.length));
    }
    return null;
  },
  setCookie: (name: string, value: string, days: number): void => {
    var expires = "";
    if (days) {
      var date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
  },
  getCookie: (name: string): string | null => {
    var nameEQ = name + "=";
    var ca = document.cookie.split(";");
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == " ") c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  },
  eraseCookie: (name: string): void => {
    document.cookie =
      name + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
  },
  clearStorage: (name: string) => {
    localStorage.removeItem(name);
  },
};

// Cấu hình cho các request gửi đi
http.interceptors.request.use(
  (config: any) => {
    //Cấu hình tất cả header gửi đi đều có bearer token (token authorization đăng nhập)
    config.headers = {
      ...config.headers,
      Authorization: "Bearer " + settings.getStore(ACCESS_TOKEN),
    };

    return config;
  },
  (err: any) => {
    return Promise.reject(err);
  }
);

//Cấu hình cho tất cả kết quả trả về (cấu hình cho response)
http.interceptors.response.use(
  (response: any) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  (error: any) => {
    //Hàm cấu hình cho tất cả lỗi nhận về
    if (error.response?.status === 400 || error.response?.status === 404) {
      //Chuyển hướng trang về trang chủ
      history.push("/");
    }

    if (error.response?.status === 401 || error.response?.status === 403) {
      history.push("/login");
    }

    return Promise.reject(error);
  }
);

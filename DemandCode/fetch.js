function myFetch(params) {
  let { url, method = "get", data = {}, body = {}, withCre = false } = params;
  let isGET = method.toUpperCase() === "GET";
  if (isGET) {
    data = formatData(data);
    url += "?" + data;
  }
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();
    xhr.withCredentials = withCre;
    xhr.open(method, url, true);
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (/2\d{2}|304/.test(xhr.status)) {
          resolve(JSON.parse(xhr.response));
        } else if (/[45]\d{2}/.test(xhr.status)) {
          reject(xhr);
        }
      }
    };
    xhr.send(isGET ? null : JSON.stringify(body));
  });
}

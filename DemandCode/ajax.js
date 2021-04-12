function ajax(params) {
  params = params || {};
  params.data = params.data || {};
  var json = params.jsonp ? jsonp(params) : jsonReq(params);
  function jsonReq(params) {
    params.type = (params.type || "GET").toUpperCase();
    params.data = formatParams(params.data);
    let xhr;
    if (window.XMLHttpRequest) {
      xhr = new XMLHttpRequest();
    } else {
      xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }

    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4) {
        let status = xhr.status;
        if (status >= 200 && status < 300) {
          let response;
          let type = xhr.getResponseHeader("Content-Type");
          if (type.indexOf("xml") !== -1 && xhr.responseXML) {
            response = xhr.responseXML;
          } else if (type === "application/json") {
            response = JSON.parse(xhr.responseText);
          } else {
            response = xhr.responseText;
          }
          params.success && params.success(response);
        } else {
          params.error && params.error(status);
        }
      }
    };

    if (params.type === "GET") {
      xhr.open(
        params.type,
        params.url + (params.data ? "?" + params.data : ""),
        true
      );
      xhr.send(null);
    } else {
      xhr.open(params.type, params.url, true);
      xhr.setRequsetHeader(
        "Content-Type",
        "application/x-www-form-urlencoded; charset=UTF-8"
      );
      xhr.send(params.data);
    }

    function formatParams(data) {
      let arr = [];
      for (let name in data) {
        arr.push(
          encodeURIComponent(name) + "=" + encodeURIComponent(data[name])
        );
      }
      return arr.join("&");
    }
  }
}
ajax({
  url: "http://47.110.57.82:3001/test",
  type: "GET",
  data: {
    a: 1,
    b: 2,
  },
  success: (data) => console.log(data),
});

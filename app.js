fetch("https://api.abantether.com/api/v1/manager/otc/ticker")
.then(res => res.json())
.then(data => {
  document.body.innerHTML =
    "<pre>" +
    JSON.stringify(data, null, 2) +
    "</pre>";
})
.catch(err => {
  document.body.innerHTML =
    "<h1>خطا: " + err + "</h1>";
});

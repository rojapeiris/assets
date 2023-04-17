var currentUrl = window.location.href;

// Define the keyword you want to check
var keyword = "admin";

// Check if the current URL contains the keyword
if (currentUrl.indexOf(keyword) !== -1) {
  //load all css and javascript file of website theam
  console.log("keyword not found in url");
} else {
  var head = document.getElementsByTagName("HEAD")[0];
  var link = document.createElement('link');
  link.rel = 'stylesheet';
  link.type = 'text/css';
  link.href = 'css-loader.css';
  head.appendChild(link);
  //load all css and javascript file of admin theam
  console.log("keyword found in url");
}

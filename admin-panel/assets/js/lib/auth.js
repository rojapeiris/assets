/*
 * Create form to request access token from Google's OAuth 2.0 server.
 */
var YOUR_CLIENT_ID =
  "706852802807-8l7dfqbplqfj7udhp8r1mos7e3lj89d3.apps.googleusercontent.com";
var YOUR_REDIRECT_URI = "https://esmssolutions.blogspot.com/p/admin-token.html";
var fragmentString = location.hash.substring(1);

// Parse query string to see if page request is coming from OAuth 2.0 server.
var params = {};
var regex = /([^&=]+)=([^&]*)/g,
  m;
while ((m = regex.exec(fragmentString))) {
  params[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
}

if (Object.keys(params).length > 0) {
  localStorage.setItem("oauth2_params", JSON.stringify(params));
  if (params["state"] && params["state"] == "try_sample_request") {
    console.log("param state" + params["state"]);
  }
}

function checkAuth() {
  var params = JSON.parse(localStorage.getItem("oauth2_params"));
  if (params && params["access_token"]) {
    //redirect to dashboard
    window.location.href = "https://esmssolutions.blogspot.com/admin-dashboard";
    console.log("user authenticated");
  } else {
    oauthSignIn();
  }
}

function oauthSignIn() {
  // Google's OAuth 2.0 endpoint for requesting an access token
  var oauth2Endpoint = "https://accounts.google.com/o/oauth2/v2/auth";

  // Create <form> element to submit parameters to OAuth 2.0 endpoint.
  var form = document.createElement("form");
  form.setAttribute("method", "GET"); // Send as a GET request.
  form.setAttribute("action", oauth2Endpoint);

  // Parameters to pass to OAuth 2.0 endpoint.
  var params = {
    client_id:
      "706852802807-8l7dfqbplqfj7udhp8r1mos7e3lj89d3.apps.googleusercontent.com",
    redirect_uri: "https://esmssolutions.blogspot.com/p/admin-token.html",
    response_type: "token",
    scope: "https://www.googleapis.com/auth/blogger",
    include_granted_scopes: "true",
    state: "pass-through value",
  };

  // Add form parameters as hidden input values.
  for (var p in params) {
    var input = document.createElement("input");
    input.setAttribute("type", "hidden");
    input.setAttribute("name", p);
    input.setAttribute("value", params[p]);
    form.appendChild(input);
  }

  // Add form to page and submit it to open the OAuth 2.0 endpoint.
  document.body.appendChild(form);
  form.submit();
}


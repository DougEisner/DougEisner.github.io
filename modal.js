var sheet = (function() {
  var style = document.createElement("style");
  style.appendChild(document.createTextNode(""));
  document.head.appendChild(style);
  return style.sheet;
})();

function addCSSRule(sheet, selector, rules, index) {
  if("insertRule" in sheet) {
    sheet.insertRule(selector + "{" + rules + "}", index);
  }
  else if("addRule" in sheet) {
    sheet.addRule(selector, rules, index);
  }
}

function loginPopup() {
  addOverlay();
  addPopup();
  addStyles();
}

function addOverlay() {
  var overlay = document.createElement('div');
  overlay.className = "overlay";
  document.body.appendChild(overlay);
}

function addPopup() {
  var loginModal = document.createElement('form');
  loginModal.className = "login-form";
  loginModal.innerHTML = '<button class="closeBtn">&times;</button><h4>Login to access downloads</h4><input type="text" name="academic_user" placeholder="username"/><input type="password" name="password" placeholder="password"/><input type="submit" value="submit"></input><p class="message">Not registered? <a href="#">Create an account</a></p>'
  document.body.appendChild(loginModal);
}

function addStyles() {
  var pageHeight = document.body.clientHeight;
  var pageWidth = document.body.clientWidth;
  var overlay = document.querySelector('.overlay');
  overlay.style.cssText += "position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0,0,0,.5); z-index: 999; display: fixed; transition: all .5s ease;"

  addCSSRule(sheet, ".login-form", "font-family: Helvetica, sans-serif; position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); z-index: 1000; background: #FFFFFF; min-width: 250px; max-width: 360px; padding: 40px 60px; text-align: center; transition: all 0.3s ease;", 0);
  addCSSRule(sheet, ".login-form input", "outline: 0; background: #f2f2f2; width: 100%; border: 0; margin: 0 0 15px; padding: 15px; box-sizing: border-box; font-size: 14px;", 0);
  addCSSRule(sheet, ".login-form input[type='submit']", "text-transform: uppercase; outline: 0; background-color: #465ca8; width: 100%; border: 0; padding: 15px; color: #FFFFFF; font-size: 14px; cursor: pointer;", 0);
  addCSSRule(sheet, ".login-form input[type='submit']:hover", "background-color: #0099FF;", 0);
  addCSSRule(sheet, ".login-form h4", "color: #039; font-size: 20px; margin: 0 0 30px 0;", 0);
  addCSSRule(sheet, ".login-form .message", "color: #b3b3b3; font-size: 12px; margin: 15px 0 0;", 0);
  addCSSRule(sheet, ".login-form .message a", "color: rgb(0,0,238); text-decoration: none;", 0);
  addCSSRule(sheet, ".login-form .closeBtn", "background: #fff; border: none; font-size: 2em; position: absolute; top: 5px; right: 10px; color: #999; cursor: pointer; outline: none;", 0);
  addCSSRule(sheet, ".login-form .closeBtn:hover", "color: goldenrod", 0);
}

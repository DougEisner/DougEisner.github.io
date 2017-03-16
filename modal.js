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
  var body = document.body;
  var overlay = document.querySelector('.overlay');

  var formWrapper = document.createElement('form');
  formWrapper.className = "form-wrapper";
  body.appendChild(formWrapper);

  var loginForm = document.createElement('div');
  formWrapper.appendChild(loginForm);
  loginForm.innerHTML = '<button class="close-btn">&times;</button><h4>Login to access downloads</h4><input type="text" name="academic_user" placeholder="username"/><input type="password" name="password" placeholder="password"/><input type="submit" value="submit"></input><p class="message">Not registered? <a class="registrationLink" href="#">Create an account</a></p>'
  loginForm.className = "login-form";

  var registrationLink = document.querySelector('.registrationLink');
  registrationLink.addEventListener('click', function() {
    replaceFormContents(formWrapper, loginForm);
  });

  var closeBtn = document.querySelector('.close-btn');
  closeBtn.addEventListener('click', function() {
    closeForm();
  });
}


function closeForm() {
  var formWrapper = document.querySelector('.form-wrapper');
  var overlay = document.querySelector('.overlay');
  console.log({formWrapper, overlay});
  document.body.removeChild(formWrapper);
  document.body.removeChild(overlay);
}

function addStyles() {
  var pageHeight = document.body.clientHeight;
  var pageWidth = document.body.clientWidth;
  var overlay = document.querySelector('.overlay');

  addCSSRule(sheet, ".overlay", "position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0,0,0,.5); z-index: 999; display: fixed; transition: all .5s ease;", 0);
  addCSSRule(sheet, ".form-wrapper", "font-family: Helvetica, sans-serif; position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); z-index: 1000; background: #FFFFFF; min-width: 250px; max-width: 360px; padding: 40px 60px; text-align: center; transition: all 0.3s ease;", 0);
  addCSSRule(sheet, ".form-wrapper input", "outline: 0; background: #f2f2f2; width: 100%; border: 0; margin: 0 0 15px; padding: 15px; box-sizing: border-box; font-size: 14px;", 0);
  addCSSRule(sheet, ".form-wrapper input[type='submit']", "text-transform: uppercase; outline: 0; background-color: #465ca8; width: 100%; border: 0; padding: 15px; color: #FFFFFF; font-size: 14px; cursor: pointer;", 0);
  addCSSRule(sheet, ".form-wrapper input[type='submit']:hover", "background-color: #0099FF;", 0);
  addCSSRule(sheet, ".form-wrapper h4", "color: #039; font-size: 20px; margin: 0 0 30px 0;", 0);
  addCSSRule(sheet, ".form-wrapper .message", "color: #b3b3b3; font-size: 12px; margin: 15px 0 0;", 0);
  addCSSRule(sheet, ".form-wrapper .message a", "color: rgb(0,0,238); text-decoration: none;", 0);
  addCSSRule(sheet, ".form-wrapper .close-btn", "background: #fff; border: none; font-size: 2em; position: absolute; top: 5px; right: 10px; color: #999; cursor: pointer; outline: none;", 0);
  addCSSRule(sheet, ".form-wrapper .close-btn:hover", "color: goldenrod", 0);
  addCSSRule(sheet, ".form-wrapper select", "height: 40px; margin: 0 0 15px; width: 100%;", 0);
}

function replaceFormContents(formWrapper, form) {
  var registrationForm = document.createElement('div');
  var registrationContent = '<button class="close-btn">&times;</button><h4>Register</h4><input type="text" name="academic_name" placeholder="Name"/><input type="text" name="academic_email" placeholder="Email"/><input type="text" name="academic_organization" placeholder="Institution"/><select name="academic_research_area" placeholder="Institution"><option value="" disabled selected>Select Research Area</option><option value="biology">Biology</option><option value="chemistry">Chemistry</option><option value="fishery">Fishery</option><option value="animal_genetics">Animal Genetics</option></select><input type="password" name="academic_password" placeholder="Password"/><input type="password" name="academic_password_confirmation" placeholder="Password Confirmation"/><input type="submit" value="Register"/>';

  formWrapper.removeChild(form);
  registrationForm.innerHTML = registrationContent;
  formWrapper.appendChild(registrationForm);
  fadeIn(registrationForm);

  var closeBtn = document.querySelector('.close-btn');
  closeBtn.addEventListener('click', function() {
    closeForm();
  });
}

function fadeIn(el){
  el.style.opacity = 0;

  (function fade() {
    var val = parseFloat(el.style.opacity);
    if (!((val += .1) > 1)) {
      el.style.opacity = val;
      requestAnimationFrame(fade);
    }
  })();
}

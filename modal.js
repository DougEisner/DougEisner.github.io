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

function replaceContents(view) {
  var content = {
    login: '<span class="close">&times;</span><h4>Login to access downloads</h4><input type="text" name="email" id="email" placeholder="email"/><input type="password" name="password" id="password" placeholder="password"/><input type="submit" value="submit"></input>  <a class="registration" href="#">Create an account</a></p><p class="message">Review <a class="registration" href="https://catalyst-research-demo.herokuapp.com/privacy">Privacy Policy</a></p><p class="message">Not registered? <a class="registration" href="#">Create an account</a></p>',
    registration: '<span class="close">&times;</span><h4>Register</h4><input type="text" name="academic_name" id="name" placeholder="Name"/><input type="text" name="academic_email" id="email" placeholder="Email"/><input type="text" name="academic_organization" id="organization" placeholder="Institution"/><input type="password" name="academic_password" id="password" placeholder="Password"/><input type="password" name="academic_password_confirmation" id="password_confirmation" placeholder="Password Confirmation"/><input type="submit" value="Register"/><p class="message">Already Registered? <a class="login" href="#">Log In</a></p>'
  }
  var popup = document.querySelector('.popup');
  var form = document.createElement('form');

  form.id = view;
  popup.appendChild(form);
  form.innerHTML = content[view];
  fadeIn(form);

  var closeBtn = document.querySelector('.close');
  closeBtn.addEventListener('click', closeForm);

  if (view == 'login') {

    var academicReg = document.querySelector('.registration');

    academicReg.addEventListener('click', function() {
      popup.removeChild(form);
      replaceContents('registration');
    });

    $('#' + view).submit(handleLoginSubmit);

  } else if (view == 'registration') {

    var login = document.querySelector('.login');

    login.addEventListener('click', function() {
      popup.removeChild(form);
      replaceContents('login');
    });

    $('#' + view).submit( function(e) {
      handleRegistrationSubmit(e);
      popup.removeChild(form);
      replaceContents('login');
    });
  }
}

function addPopup() {
  var body = document.body;
  var overlay = document.querySelector('.overlay');
  var popup = document.createElement('div');
  popup.className = "popup";
  body.appendChild(popup);
  popup.innerHTML = '<div class="wrapper"><div class="titleWrapper"><h1>Data downloads require registration</h1><span class="close">&times;</span></div><div class="bodyWrapper"><section><h2>Non-Commercial</h2><p style="margin-top: -5px; color: #888;font-size:14px;">(Academic, Nonprofit, and Government)</p><p>Data downloads remain free, but require a one-time registration.</p><a style="margin-top: 10px" class="registration">Register</a></section><hr width="1"><section><h2>Commercial</h2><p style="margin-top: -5px; color: #fff;font-size:13px;">Business<p>To purchase a license, transfer to our licensing partner Catalyst Research Alliance</p><a href="http://catalyst-research-demo.herokuapp.com/ctd" class="business">Learn More</a></section></div><p class="message">Already Registered? <a class="login" href="#">Log In</a></p></div>';

  var closeBtn = document.querySelector('.close');
  closeBtn.addEventListener('click', closeForm);

  var academicReg = document.querySelector('.registration');
  academicReg.addEventListener('click', function() {
    var wrapper = document.querySelector('.wrapper');
    popup.removeChild(wrapper);
    replaceContents('registration');
  });

  var login = document.querySelector('.login');
  login.addEventListener('click', function() {
    var wrapper = document.querySelector('.wrapper');
    popup.removeChild(wrapper);
    replaceContents('login');
  });
}

function handleLoginSubmit(e) {
  e.preventDefault();
  var url = "http://localhost:3000/ctd/sign_in";
  var data = {
    email: $('#email').val(),
    password: $('#password').val()
  }
  sendData(url, data);
  closeForm();
}

function closeForm() {
  var popup = document.querySelector('.popup');
  var overlay = document.querySelector('.overlay');
  document.body.removeChild(popup);
  document.body.removeChild(overlay);
}

function addStyles() {
  var pageHeight = document.body.clientHeight;
  var pageWidth = document.body.clientWidth;

  addCSSRule(sheet, ".overlay", "position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0,0,0,.5); z-index: 999; display: fixed; transition: all .5s ease;", 0);
  addCSSRule(sheet, ".popup", "background-color: white; flex-flow: row wrap; position: fixed;  top: 50%;  left: 50%;  transform: translate(-50%, -50%);  max-height: calc(100% - 100px);  min-width: 25em; max-width: 40em; overflow: scroll; text-align: center; justify-content: center; font-family: helvetica, sans-serif; z-index: 1000;", 0);
  addCSSRule(sheet, ".wrapper", "padding: 0 0 2em 0", 0);
  addCSSRule(sheet, ".titleWrapper", "display: flex; flex: 1 1 auto; padding: 0.5em; background: #465ca8; align-items: center;", 0);
  addCSSRule(sheet, ".bodyWrapper", "padding: 2em; padding-bottom: 0;", 0);
  addCSSRule(sheet, ".bodyWrapper", "display: flex; padding: 1em;", 0);
  addCSSRule(sheet, "section", "flex: 1 1 50%; display: flex; flex-flow: column nowrap; justify-content: space-between; color: #333; padding: 5px 15px;", 0);
  addCSSRule(sheet, "hr", "margin: 0.5em; border: none; border-left: 1px solid #999; align-self: center; height: 13em;", 0);
  addCSSRule(sheet, "h1", "font-size: 1.3rem; margin: 0; padding: 10px; color: white; flex: 1 1 auto;", 0);
  addCSSRule(sheet, "h2", "background: transparent; color: black; font-weight: 500; text-align: center; border: none; font-size: 24px; margin: 0;", 0);
  addCSSRule(sheet, "section a", "font-size: 14px; font-weight: bold; line-height: 14px; text-transform: uppercase; background-color: #465ca8; color: white; padding: 15px; border: none; cursor: pointer; box-shadow: 1px 1px 5px -1px rgba(0, 0, 0, 0.85); text-decoration: none;", 0);
  addCSSRule(sheet, "section a:hover", "background-color: #09f", 0);
  addCSSRule(sheet, ".message", "color: #888; font-size: 14px; margin: 15px 0 0;", 0);
  addCSSRule(sheet, ".message a", "color: rgb(0,0,238); text-decoration: none;", 0);
  addCSSRule(sheet, "span.close", "background: none; color: white; cursor: pointer; font-size: 2em; outline: none; padding: 0 .2em;", 0);
  addCSSRule(sheet, "span.close:hover", "color: goldenrod;", 0);
  addCSSRule(sheet, "form", "padding: 3em", 0);
  addCSSRule(sheet, "form h4", "color: #039; font-size: 20px; margin: 0 0 30px 0;", 0);
  addCSSRule(sheet, "form input", "outline: 0; background: #f2f2f2; width: 100%; border: 0; margin: 0 0 15px; padding: 15px; box-sizing: border-box; font-size: 14px;", 0);
  addCSSRule(sheet, "form input[type='submit']", "text-transform: uppercase; outline: 0; background-color: #465ca8; width: 100%; border: 0; padding: 15px; color: #FFFFFF; font-size: 14px; cursor: pointer;", 0);
  addCSSRule(sheet, "form input[type='submit']:hover", "background-color: #0099FF;", 0);
  addCSSRule(sheet, "form select", "height: 40px; margin: 0 0 15px; width: 100%;", 0);
  addCSSRule(sheet, "form span.close", "background: #fff; position: absolute; top: 5px; right: 10px; color: #999;", 0);
}

function handleRegistrationSubmit(e) {
  e.preventDefault();
  var url = "http://localhost:3000/ctd/sign_up";
  var data = {
    'user[name]': $('#name').val(),
    'user[email]': $('#email').val(),
    'user[role]': "academic",
    'user[password]': $('#password').val(),
    'user[password_confirmation]': $('#password_confirmation').val(),
    'user[research_area]': $('#research').val(),
    'user[organization]': $('#organization').val()
  }
  sendData(url, data);
}


function fadeIn(el){
  el.style.opacity = '0';

  (function fade() {
    var val = parseFloat(el.style.opacity);
    if (!((val += .1) > 1)) {
      el.style.opacity = val;
      requestAnimationFrame(fade);
    }
  })();
}

function sendData(url, inputData) {
  $.ajaxSetup({
    crossDomain: true,
    xhrFields: {
       withCredentials: true
    }
  });

  var posting = $.post( url, inputData );
  posting.done(function( data, textStatus, request ) {
    var token = request.getResponseHeader("_code_alliance_reg");
    if (token) {
      document.cookie = "valid_user= " + token;
    } else {
      console.log("WOMP");
    }
  });
}

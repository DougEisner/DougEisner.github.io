(function() {
  function validateToken() {
    return false;
  }

  function getAllLinks() {
    return document.getElementsByTagName('a');
  }

  function getProtectedLinks(links) {
    var protectedLinks = [];

    for (var i = 0, length = links.length; i < length; i++) {
      var link = links[i];

      if (isProtectedLink(link)) {
        protectedLinks.push(link);
      }
    }
    return protectedLinks;
  }

  function protectLinks(links) {
    for (var i = 0, length = links.length; i < length; i++) {
      var link = links[i];

      // console.log('protecting', link.href);

      link.onclick = function(e) {
        onProtectedLinkClicked(e, link);
      };
    }
  }

  function isProtectedLink(link) {
    // TODO: implement real logic to determine if a link is protected

    // var protectedPaths = ['/detail.go', '/reports/'];
    var protectedPaths = ['?657']

    for (var i = 0, length = protectedPaths.length; i < length; i++) {
      var protectedPath = protectedPaths[i];

      var isMatchingPath = link.href.indexOf(protectedPath) !== -1;

      if (isMatchingPath) {
        return true;
      }
    }

    return false;
  }

  function onProtectedLinkClicked(e, link) {
    // TODO: implement auth, cookie check, modal window, login, paywall stuff

    // if (!isLoggedIn()) requestLogin();

    // if (!isAcademic() && !hasPaid()) requestPayment();

    if (validateToken()) {
      alert('download');
    } else {
      e.preventDefault();
      e.stopPropagation();
      // display login modal
      loginPopup();
    }


    // console.warn(link.href, 'is protected');
  }

  function main() {
    // TODO: implement guard clause if they are a logged in academic or have up to date payment

    // if (isLoggedIn() && (isAcademic() || hasPaid())) {
    //   return;
    // }

    if(validateToken()) return;

    var links = getAllLinks();
    links = getProtectedLinks(links);

    protectLinks(links);
  }

  main();
})();

_cookiesTools = {
  exportCookies: function (cookies, format, url) {
    cookies = JSON.parse(cookies).cookies;
    cookies = this.fixCookies(cookies);
    var result = '';
    switch (format) {
      case 'jsonETC': {
        result = this.exportCookiesToJson(cookies);
        result = JSON.stringify(result);
        break;
      }
      case 'jsonJ2': {
        result = this.exportCookiesToJson(cookies);
        if (!url) {
          url = 'https://' + result[0].domain.replace(/^\./, '');
        }
        result = {
          url: url,
          cookies: result,
        };
        result = JSON.stringify(result);
        break;
      }
      case 'netscape': {
        for (var i = 0; i < cookies.length; i++) {
          var cookie = cookies[i];
          if (this.isGoogleSyncCookies(cookie)) {
            continue;
          }
          result +=
            cookie.domain +
            '\t' +
            (cookie.domain[0] !== '.').toString().toUpperCase() +
            '\t' +
            cookie.path +
            '\t' +
            cookie.secure.toString().toUpperCase() +
            '\t' +
            (cookie.expires < 0 ? '0' : Math.round(cookie.expires)) +
            '\t' +
            cookie.name +
            '\t' +
            cookie.value +
            (i === cookies.length - 1 ? '' : '\n');
        }
        break;
      }
    }
    return result;
  },

  exportCookiesToJson: function (cookies) {
    var resultCookies = [];
    var self = this;
    cookies.forEach(function (el) {
      var cookie = {
        domain: el.domain,
        expirationDate: el.expires > 0 ? el.expires : 0,
        hostOnly: el.domain[0] !== '.',
        httpOnly: el.httpOnly,
        name: el.name,
        path: el.path,
        sameSite: el.sameSite ? 'no_restriction' : 'unspecified',
        secure: el.secure,
        session: el.session,
        storeId: '0',
        value: el.value,
      };

      if (!self.isGoogleSyncCookies(cookie)) {
        resultCookies.push(cookie);
      }
    });
    return resultCookies;
  },

  importCookies: function (cookies, format, debug) {
    debug = debug ? debug.toString() === 'true' : false;
    var result = [];
    switch (format) {
      case 'jsonETC': {
        result = this.importCookiesFromJson(JSON.parse(cookies));
        break;
      }
      case 'jsonJ2': {
        result = this.importCookiesFromJson(this.parseBASCookies(cookies));
        break;
      }
      case 'netscape': {
        cookies = cookies.split(/\r?\n/);
        cookies = cookies.filter(function (row) {
          return row !== '';
        });

        for (var i = 0; i < cookies.length; i++) {
          var cookieString = cookies[i];
          if (cookieString[0] === '#') {
            continue;
          }

          var cookieParts = cookieString.split(/\t/);
          if (cookieParts.length !== 7) {
            if (debug) {
              ScriptWorker.Info('incorrect netscape format, line #' + (i + 1));
            }
            continue;
          }

          var expires = +cookieParts[4];
          var name = cookieParts[5];
          var secure =
            eval(cookieParts[3].toLowerCase()) ||
            /(^__Host|^__Secure)/.test(name);
          var cookie = {
            domain: cookieParts[0],
            expires: expires > 0 ? expires : -1,
            httpOnly: false,
            name: name,
            path: cookieParts[2],
            secure: secure,
            session: expires <= 0,
            value: cookieParts[6],
          };

          if (!this.isGoogleSyncCookies(cookie)) {
            result.push(cookie);
          }
        }
        break;
      }
    }

    return this.stringifyBASCookies(this.fixCookies(result));
  },

  importCookiesFromJson: function (cookies) {
    var result = [];
    var self = this;
    cookies.forEach(function (cookie) {
      if (!self.isGoogleSyncCookies(cookie)) {
        result.push(self.createBasCookie(cookie));
      }
    });

    return result;
  },

  pushCoookie: function (cookies, name, value, domain, secure, date) {
    var cookies = this.parseBASCookies(cookies).filter(function (cookie) {
      return cookie.name !== name || cookie.domain !== domain;
    });

    cookies.push(
      this.createBasCookie({
        domain: domain,
        expirationDate: _parse_date(date, 'auto').getTime() / 1000,
        name: name,
        value: value,
        secure: secure === 'true',
      })
    );
    return this.stringifyBASCookies(cookies);
  },

  getValue: function (cookies, name, domain) {
    var cookies = this.parseBASCookies(cookies);
    for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i];
      if (cookie.name === name && cookie.domain === domain) {
        return cookie.value;
      }
    }
    return '';
  },

  concatCookies: function (cookies1, cookies2) {
    var concatCookies = [];
    var indexes = {};
    var currentIndex = 0;
    var pushCookie = function (cookies) {
      cookies.forEach(function (cookie) {
        var hash = cookie.name + +'_' + cookie.domain;
        var index = indexes[hash];
        if (!index) {
          concatCookies.push(cookie);
          indexes[hash] = currentIndex;
        } else {
          concatCookies[index].value = cookie.value;
          concatCookies[index].secure = cookie.secure;
          concatCookies[index].expires = cookie.expires;
        }
        currentIndex++;
      });
    };

    pushCookie(this.parseBASCookies(cookies1));
    pushCookie(this.parseBASCookies(cookies2));
    return this.stringifyBASCookies(concatCookies);
  },

  parseBASCookies: function (cookies) {
    try {
      return JSON.parse(cookies).cookies;
    } catch (e) {
      fail('incorrect cookies format');
    }
  },

  stringifyBASCookies: function (cookies) {
    return JSON.stringify({ cookies: cookies });
  },

  createBasCookie: function (data) {
    var cookie = {
      domain: data.domain,
      expires: data.session ? -1 : data.expirationDate,
      httpOnly: data.httpOnly || false,
      name: data.name,
      path: data.path || '/',
      priority: 'Medium',
      sameParty: false,
      secure: data.secure || false,
      session: data.session || false,
      size: data.name.length + data.value.toString().length,
      sourcePort: data.secure ? 443 : 80,
      sourceScheme: data.secure ? 'Secure' : 'NonSecure',
      value: data.value.toString(),
    };

    if (data.secure) {
      cookie.sameSite = 'None';
    }
    return cookie;
  },
  fixCookies: function (basCookies) {
    return basCookies
      .map(function (coo) {
        if (coo.expires < Date.now() || isNaN(new Date(coo.expires))) {
          coo.expires = new Date(2050, 1, 1).getTime();
        }
        return coo;
      })
      .filter(function (coo) {
        return !/^__Host/i.test(coo.name);
      });
  },
  isGoogleSyncCookies: function (cookie) {
    return (
      cookie.domain.indexOf('google') > -1 && cookie.name === 'ACCOUNT_CHOOSER' // || cookie.name === 'LSID'
    );
  },
};

let isLoaded = false;
export default function (options, gaTrackingID) {
  if (isLoaded) return;
  isLoaded = true;

  const useGA4 = gaTrackingID.indexOf('G-') === 0;

  let gaAddress = 'https://www.google-analytics.com/analytics.js';
  if (options && options.gaAddress) {
    gaAddress = options.gaAddress;
  } else if (options && options.debug) {
    gaAddress = 'https://www.google-analytics.com/analytics_debug.js';
  } else if (useGA4) {
    gaAddress = `https://www.googletagmanager.com/gtag/js?id=${gaTrackingID}`;
  }

  const onerror = options && options.onerror;

  // https://developers.google.com/analytics/devguides/collection/analyticsjs/
  /* eslint-disable */
  (function (i, s, o, g, r, a, m) {
    i['GoogleAnalyticsObject'] = r;
    (i[r] =
      i[r] ||
      function () {
        (i[r].q = i[r].q || []).push(arguments);
      }),
      (i[r].l = 1 * new Date());
    (a = s.createElement(o)), (m = s.getElementsByTagName(o)[0]);
    a.async = 1;
    a.src = g;
    a.onerror = onerror;
    m.parentNode.insertBefore(a, m);
  })(window, document, 'script', gaAddress, 'ga');
  /* eslint-enable */

  if (useGA4) {
    // https://developers.google.com/analytics/devguides/collection/gtagjs
    window.dataLayer = window.dataLayer || [];
    function gtag() {
      dataLayer.push(arguments);
    }
    window.ga = gtag;
    window.ga('js', new Date());
  }
}

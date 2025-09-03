'use strict';

/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7);

var isNativeScroll = 'scrollBehavior' in document.documentElement.style && 'smooth' === _utils__WEBPACK_IMPORTED_MODULE_0__.$html.css('scroll-behavior');

function runScroll($hashBlock, hash) {
  // add hash to address bar
  $hashBlock.attr('id', '');
  document.location.hash = hash;
  $hashBlock.attr('id', hash);
  window.scrollTo({
    top: $hashBlock.offset().top - 80,
    behavior: 'smooth'
  });
}

_utils__WEBPACK_IMPORTED_MODULE_0__.$doc.on('click', 'a.button, a.ghostkit-button, .cpl-navbar-nav a, .cpl-anchor, .posted-comments a, .cpl-fancybox-navbar .cpl-navbar-body a', function (e) {
  var isHash = this.hash;
  var isURIsame = this.baseURI === window.location.href;
  var isOpenFancybox = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.$)('.cpl-fancybox-open').length;

  if (isHash && '#' !== isHash && '#!' !== isHash && isURIsame) {
    var $hashBlock = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.$)(isHash);
    var hash = isHash.replace(/^#/, '');

    if ($hashBlock.length) {
      // Close all fancybox.
      _utils__WEBPACK_IMPORTED_MODULE_0__.$.fancybox.close(true);

      if (isNativeScroll) {
        return;
      }

      e.preventDefault(); // Scroll after Fancybox closes and if it's not a native scroll.

      if (isOpenFancybox) {
        _utils__WEBPACK_IMPORTED_MODULE_0__.$doc.one('afterClose.fb', function () {
          runScroll($hashBlock, hash);
        }); // Scroll immediately.
      } else {
        runScroll($hashBlock, hash);
      }
    }
  }
});

/***/ }),
/* 7 */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "$": function() { return /* binding */ $; },
/* harmony export */   "$body": function() { return /* binding */ $body; },
/* harmony export */   "$doc": function() { return /* binding */ $doc; },
/* harmony export */   "$html": function() { return /* binding */ $html; },
/* harmony export */   "$wnd": function() { return /* binding */ $wnd; },
/* harmony export */   "bodyGetScrollbarWidth": function() { return /* binding */ bodyGetScrollbarWidth; },
/* harmony export */   "bodyOverflow": function() { return /* binding */ bodyOverflow; },
/* harmony export */   "debounceResize": function() { return /* binding */ debounceResize; },
/* harmony export */   "isMobile": function() { return /* binding */ isMobile; },
/* harmony export */   "throttleScroll": function() { return /* binding */ throttleScroll; }
/* harmony export */ });
/* harmony import */ var throttle_debounce__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8);
/* harmony import */ var raf_schd__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9);


var $ = window.jQuery;
var isIos = ['iPad Simulator', 'iPhone Simulator', 'iPod Simulator', 'iPad', 'iPhone', 'iPod'].includes(navigator.platform) || navigator.userAgent.includes('Mac') && 'ontouchend' in document;
var isMobile = isIos || /Android|BlackBerry|Windows Phone/g.test(navigator.userAgent || navigator.vendor || window.opera);
var $wnd = $(window);
var $doc = $(document);
var $body = $('body');
var $html = $('html'); // add 'is-mobile' or 'is-desktop' classname to html tag

$html.addClass(isMobile ? 'is-mobile' : 'is-desktop');

if (isIos) {
  $html.addClass('is-ios');
}
/**
 * Debounce resize
 */


var resizeArr = [];

function debounceResized() {
  if (resizeArr.length) {
    for (var k = 0; k < resizeArr.length; k += 1) {
      resizeArr[k]();
    }
  }
}

$wnd.on('load resize orientationchange', (0,throttle_debounce__WEBPACK_IMPORTED_MODULE_0__.throttle)(200, (0,raf_schd__WEBPACK_IMPORTED_MODULE_1__["default"])(debounceResized)));
$((0,raf_schd__WEBPACK_IMPORTED_MODULE_1__["default"])(debounceResized));
debounceResized();

function debounceResize(func) {
  if ('function' === typeof func) {
    resizeArr.push(func);
  } else {
    window.dispatchEvent(new Event('resize'));
  }
}
/**
 * Throttle scroll
 */


var hideOnScrollList = [];
var lastST = 0;

function hasScrolled() {
  if (!hideOnScrollList.length) {
    return;
  }

  var ST = $wnd.scrollTop();
  var type = ''; // [up, down, end, start]

  if (ST > lastST) {
    type = 'down';
  } else if (ST < lastST) {
    type = 'up';
  } else {
    type = 'none';
  }

  if (0 === ST) {
    type = 'start';
  } else if (window.innerHeight + window.scrollY >= document.body.scrollHeight) {
    type = 'end';
  }

  hideOnScrollList.forEach(function (value) {
    if ('function' === typeof value) {
      value(type, ST, lastST, $wnd);
    }
  });
  lastST = ST;
}

$wnd.on('scroll load resize orientationchange', (0,throttle_debounce__WEBPACK_IMPORTED_MODULE_0__.throttle)(200, (0,raf_schd__WEBPACK_IMPORTED_MODULE_1__["default"])(hasScrolled)));
$((0,raf_schd__WEBPACK_IMPORTED_MODULE_1__["default"])(hasScrolled));

function throttleScroll(callback) {
  hideOnScrollList.push(callback);
}
/**
 * Body Overflow
 * Thanks https://jsfiddle.net/mariusc23/s6mLJ/31/
 * Usage:
 *    // enable
 *    bodyOverflow(1);
 *
 *    // disable
 *    bodyOverflow(0);
 */


var bodyOverflowEnabled;
var isBodyOverflowing;
var scrollbarWidth;
var originalBodyStyle;
var originalBodyPadding = parseFloat($body.css('margin-right')) || 0;

function bodyGetScrollbarWidth() {
  // thx d.walsh
  var scrollDiv = document.createElement('div');
  scrollDiv.className = 'body-scrollbar-measure';
  $body[0].appendChild(scrollDiv);
  var result = scrollDiv.offsetWidth - scrollDiv.clientWidth;
  $body[0].removeChild(scrollDiv);
  return result;
}

function bodyCheckScrollbar() {
  var fullWindowWidth = window.innerWidth;

  if (!fullWindowWidth) {
    // workaround for missing window.innerWidth in IE8
    var documentElementRect = document.documentElement.getBoundingClientRect();
    fullWindowWidth = documentElementRect.right - Math.abs(documentElementRect.left);
  }

  isBodyOverflowing = $body[0].clientWidth < fullWindowWidth;
  scrollbarWidth = bodyGetScrollbarWidth();
}

function bodySetScrollbar() {
  if ('undefined' === typeof originalBodyStyle) {
    originalBodyStyle = $body.attr('style') || '';
  }

  if (isBodyOverflowing) {
    $body.css('margin-right', scrollbarWidth + originalBodyPadding);
  }
}

function bodyResetScrollbar() {
  $body.attr('style', originalBodyStyle);
}

function bodyOverflow(enable) {
  if (enable && !bodyOverflowEnabled) {
    bodyOverflowEnabled = 1;
    bodyCheckScrollbar();
    bodySetScrollbar();
    $body.css('overflow', 'hidden');
  } else if (!enable && bodyOverflowEnabled) {
    bodyOverflowEnabled = 0;
    $body.css('overflow', '');
    bodyResetScrollbar();
  }
} // Set scrollbar size variable.


function updateScrollbarVariable() {
  bodyCheckScrollbar();
  $body[0].style.setProperty('--cpl-page-scrollbar__size', "".concat(scrollbarWidth, "px"));
}

$wnd.on('load', (0,raf_schd__WEBPACK_IMPORTED_MODULE_1__["default"])(updateScrollbarVariable));
$((0,raf_schd__WEBPACK_IMPORTED_MODULE_1__["default"])(updateScrollbarVariable));
updateScrollbarVariable();


/***/ }),
/* 8 */
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "debounce": function() { return /* binding */ debounce; },
/* harmony export */   "throttle": function() { return /* binding */ throttle; }
/* harmony export */ });
/* eslint-disable no-undefined,no-param-reassign,no-shadow */

/**
 * Throttle execution of a function. Especially useful for rate limiting
 * execution of handlers on events like resize and scroll.
 *
 * @param  {number}    delay -          A zero-or-greater delay in milliseconds. For event callbacks, values around 100 or 250 (or even higher) are most useful.
 * @param  {boolean}   [noTrailing] -   Optional, defaults to false. If noTrailing is true, callback will only execute every `delay` milliseconds while the
 *                                    throttled-function is being called. If noTrailing is false or unspecified, callback will be executed one final time
 *                                    after the last throttled-function call. (After the throttled-function has not been called for `delay` milliseconds,
 *                                    the internal counter is reset).
 * @param  {Function}  callback -       A function to be executed after delay milliseconds. The `this` context and all arguments are passed through, as-is,
 *                                    to `callback` when the throttled-function is executed.
 * @param  {boolean}   [debounceMode] - If `debounceMode` is true (at begin), schedule `clear` to execute after `delay` ms. If `debounceMode` is false (at end),
 *                                    schedule `callback` to execute after `delay` ms.
 *
 * @returns {Function}  A new, throttled, function.
 */
function throttle(delay, noTrailing, callback, debounceMode) {
  /*
   * After wrapper has stopped being called, this timeout ensures that
   * `callback` is executed at the proper times in `throttle` and `end`
   * debounce modes.
   */
  var timeoutID;
  var cancelled = false; // Keep track of the last time `callback` was executed.

  var lastExec = 0; // Function to clear existing timeout

  function clearExistingTimeout() {
    if (timeoutID) {
      clearTimeout(timeoutID);
    }
  } // Function to cancel next exec


  function cancel() {
    clearExistingTimeout();
    cancelled = true;
  } // `noTrailing` defaults to falsy.


  if (typeof noTrailing !== 'boolean') {
    debounceMode = callback;
    callback = noTrailing;
    noTrailing = undefined;
  }
  /*
   * The `wrapper` function encapsulates all of the throttling / debouncing
   * functionality and when executed will limit the rate at which `callback`
   * is executed.
   */


  function wrapper() {
    for (var _len = arguments.length, arguments_ = new Array(_len), _key = 0; _key < _len; _key++) {
      arguments_[_key] = arguments[_key];
    }

    var self = this;
    var elapsed = Date.now() - lastExec;

    if (cancelled) {
      return;
    } // Execute `callback` and update the `lastExec` timestamp.


    function exec() {
      lastExec = Date.now();
      callback.apply(self, arguments_);
    }
    /*
     * If `debounceMode` is true (at begin) this is used to clear the flag
     * to allow future `callback` executions.
     */


    function clear() {
      timeoutID = undefined;
    }

    if (debounceMode && !timeoutID) {
      /*
       * Since `wrapper` is being called for the first time and
       * `debounceMode` is true (at begin), execute `callback`.
       */
      exec();
    }

    clearExistingTimeout();

    if (debounceMode === undefined && elapsed > delay) {
      /*
       * In throttle mode, if `delay` time has been exceeded, execute
       * `callback`.
       */
      exec();
    } else if (noTrailing !== true) {
      /*
       * In trailing throttle mode, since `delay` time has not been
       * exceeded, schedule `callback` to execute `delay` ms after most
       * recent execution.
       *
       * If `debounceMode` is true (at begin), schedule `clear` to execute
       * after `delay` ms.
       *
       * If `debounceMode` is false (at end), schedule `callback` to
       * execute after `delay` ms.
       */
      timeoutID = setTimeout(debounceMode ? clear : exec, debounceMode === undefined ? delay - elapsed : delay);
    }
  }

  wrapper.cancel = cancel; // Return the wrapper function.

  return wrapper;
}
/* eslint-disable no-undefined */

/**
 * Debounce execution of a function. Debouncing, unlike throttling,
 * guarantees that a function is only executed a single time, either at the
 * very beginning of a series of calls, or at the very end.
 *
 * @param  {number}   delay -         A zero-or-greater delay in milliseconds. For event callbacks, values around 100 or 250 (or even higher) are most useful.
 * @param  {boolean}  [atBegin] -     Optional, defaults to false. If atBegin is false or unspecified, callback will only be executed `delay` milliseconds
 *                                  after the last debounced-function call. If atBegin is true, callback will be executed only at the first debounced-function call.
 *                                  (After the throttled-function has not been called for `delay` milliseconds, the internal counter is reset).
 * @param  {Function} callback -      A function to be executed after delay milliseconds. The `this` context and all arguments are passed through, as-is,
 *                                  to `callback` when the debounced-function is executed.
 *
 * @returns {Function} A new, debounced function.
 */


function debounce(delay, atBegin, callback) {
  return callback === undefined ? throttle(delay, atBegin, false) : throttle(delay, callback, atBegin !== false);
}



/***/ }),
/* 9 */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
var rafSchd = function rafSchd(fn) {
  var lastArgs = [];
  var frameId = null;

  var wrapperFn = function wrapperFn() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    lastArgs = args;

    if (frameId) {
      return;
    }

    frameId = requestAnimationFrame(function () {
      frameId = null;
      fn.apply(void 0, lastArgs);
    });
  };

  wrapperFn.cancel = function () {
    if (!frameId) {
      return;
    }

    cancelAnimationFrame(frameId);
    frameId = null;
  };

  return wrapperFn;
};

/* harmony default export */ __webpack_exports__["default"] = (rafSchd);

/***/ }),
/* 10 */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7);

var _window = window,
    cplData = _window.cplData; // Internal: Return the `href` component of given URL object with the hash
// portion removed.
//
// location - Location or HTMLAnchorElement
//
// Returns String

function stripHash(href) {
  return href.replace(/#.*/, '');
}

function init() {
  var $fadeOverlay = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.$)('<div class="cpl-fade-between-pages"></div>').appendTo('body');
  _utils__WEBPACK_IMPORTED_MODULE_0__.$doc.on('click', 'a:not(.no-fade):not([target="_blank"]):not([href^="#"]):not([href^="mailto"]):not([href^="javascript:"])', function (e) {
    var href = this.href; // stop if empty href

    if (!href) {
      return;
    } // Middle click, cmd click, and ctrl click should open
    // links in a new tab as normal.


    if (1 < e.which || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) {
      return;
    } // Ignore case when a hash is being tacked on the current URL


    if (-1 < href.indexOf('#') && stripHash(href) === stripHash(window.location.href)) {
      return;
    } // Ignore e with default prevented


    if (e.isDefaultPrevented()) {
      return;
    } // prevent menu item clicked


    if ((0,_utils__WEBPACK_IMPORTED_MODULE_0__.$)(this).next('.sub-menu').length) {
      if ('hidden' === (0,_utils__WEBPACK_IMPORTED_MODULE_0__.$)(this).next('.sub-menu').css('visibility') || (0,_utils__WEBPACK_IMPORTED_MODULE_0__.$)(this).parent().hasClass('open')) {
        return;
      }
    }

    e.preventDefault();
    $fadeOverlay.show(); // Trigger a reflow, flushing the CSS changes. This need to fix some glitches in Safari and Firefox.
    // Info here - https://stackoverflow.com/questions/11131875/what-is-the-cleanest-way-to-disable-css-transition-effects-temporarily
    // eslint-disable-next-line no-unused-expressions

    $fadeOverlay[0].offsetHeight;
    $fadeOverlay.addClass('cpl-fade-between-pages-show');
    window.location.href = href;
  }); // fix safari back button
  // thanks http://stackoverflow.com/questions/8788802/prevent-safari-loading-from-cache-when-back-button-is-clicked

  _utils__WEBPACK_IMPORTED_MODULE_0__.$wnd.on('pageshow', function (e) {
    if (e.originalEvent.persisted) {
      $fadeOverlay.hide();
      $fadeOverlay.removeClass('cpl-fade-between-pages-show');
    }
  });
}

if (cplData.fade_between_pages) {
  // We need to init script after the page ready to let other plugins run preventDefault to prevent our script.
  // For example, it is useful for Visual Portfolio images popup.
  (0,_utils__WEBPACK_IMPORTED_MODULE_0__.$)(init);
}

/***/ }),
/* 11 */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7);

var buttonMinus = "\n    <button class=\"cpl-touchspin-button-minus\">\n        <svg width=\"14\" height=\"14\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n            <path d=\"M5 12H19\" stroke=\"currentColor\" stroke-width=\"2.5\" stroke-linecap=\"square\" stroke-linejoin=\"round\"/>\n        </svg>\n    </button>\n";
var buttonPlus = "\n    <button class=\"cpl-touchspin-button-plus\">\n        <svg width=\"14\" height=\"14\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n            <path d=\"M12 5V19M5 12H19\" stroke=\"currentColor\" stroke-width=\"2.5\" stroke-linecap=\"square\" stroke-linejoin=\"round\"/>\n        </svg>\n    </button>\n"; // create buttons and wrapper

function createButtonsAndWrapper() {
  (0,_utils__WEBPACK_IMPORTED_MODULE_0__.$)('.quantity > input').wrap('<span class="cpl-touchspin"></span>').each(function () {
    (0,_utils__WEBPACK_IMPORTED_MODULE_0__.$)("".concat(buttonMinus).concat(buttonPlus)).appendTo((0,_utils__WEBPACK_IMPORTED_MODULE_0__.$)(this).parent('.cpl-touchspin'));
  });
}

createButtonsAndWrapper(); // button plus

_utils__WEBPACK_IMPORTED_MODULE_0__.$doc.on('click', '.cpl-touchspin-button-plus', function (e) {
  e.preventDefault();
  var $input = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.$)(this).siblings('input');
  var max = $input.attr('max') || 9999999;
  var oldValue = parseFloat($input.val()) || 0;
  var newVal;

  if (oldValue >= max) {
    newVal = oldValue;
  } else {
    newVal = oldValue + 1;
  }

  $input.val(newVal);
  $input.trigger('change');
}); // button minus

_utils__WEBPACK_IMPORTED_MODULE_0__.$doc.on('click', '.cpl-touchspin-button-minus', function (e) {
  e.preventDefault();
  var $input = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.$)(this).siblings('input');
  var min = $input.attr('min') || -9999999;
  var oldValue = parseFloat($input.val()) || 0;
  var newVal;

  if (oldValue <= min) {
    newVal = oldValue;
  } else {
    newVal = oldValue - 1;
  }

  $input.val(newVal);
  $input.trigger('change');
}); // updated cart

_utils__WEBPACK_IMPORTED_MODULE_0__.$doc.on('updated_cart_totals', function () {
  createButtonsAndWrapper();
});

/***/ }),
/* 12 */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7);

var glitchStyle = {
  text: "\n        article.post .entry-title a,\n        .comment-author a,\n        .widget_archive a,\n        .widget_categories a,\n        .widget_pages a,\n        .widget_meta a,\n        .widget_recent_entries a,\n        .widget_rss > .widgettitle > a:last-child,\n        .widget_rss ul a,\n        .widget_product_categories a,\n        .wp-block-latest-posts a,\n        .wp-block-categories a,\n        .wp-block-archives a,\n        .wp-block-rss .wp-block-rss__item-title a,\n        .wp-block-latest-comments .wp-block-latest-comments__comment-meta a,\n        .sociality-author-bio .sociality-author-bio-name a,\n        .vp-portfolio__items-style-default .vp-portfolio__item-meta-title a,\n        .woocommerce-widget-layered-nav li:not(.chosen) a,\n        .woocommerce-cart .shop_table.cart .product-name a,\n        .woocommerce-checkout .shop_table.order_details .product-name a,\n        .cyberpress-team .cyberpress-team-title a,\n        .cyberpress-player .cyberpress-player-title a,\n        .cyberpress-tournament .cyberpress-tournament-title a,\n        .cyberpress-game .cyberpress-game-title a\n    ",
  button: "\n        button.button,\n        .button-404,\n        .wp-block-button:not(.is-style-outline) .wp-block-button__link,\n        .cpl-input-group button,\n        .ghostkit-button:not(.is-style-cpl-btn-link),\n        .woocommerce-mini-cart__buttons .button,\n        .woocommerce .single_add_to_cart_button,\n        .woocommerce .return-to-shop > .button,\n        .woocommerce .checkout-button,\n        .woocommerce-account button.woocommerce-button,\n        .lwa .lwa-submit-button button,\n        .lwa .lwa-remember-buttons button\n    "
}; // Text.

_utils__WEBPACK_IMPORTED_MODULE_0__.$doc.on('mouseover', glitchStyle.text, function () {
  var $this = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.$)(this);

  if ($this.hasClass('cpl-glitch-text')) {
    return;
  }

  $this.addClass('cpl-glitch-text'); // Added Wrapper.

  var innerContent = $this.html();
  (0,_utils__WEBPACK_IMPORTED_MODULE_0__.$)('<span class="cpl-glitch-wrapper"><span></span><span></span></span><span class="cpl-glitch-zone-hover"></span>').appendTo($this);
  $this.find('.cpl-glitch-wrapper > span').html(innerContent);
}); // Button.

_utils__WEBPACK_IMPORTED_MODULE_0__.$doc.on('mouseover', glitchStyle.button, function () {
  var $this = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.$)(this);

  if ($this.hasClass('disabled') || $this.is('[disabled]') || $this.hasClass('cpl-glitch-button')) {
    return;
  }

  $this.addClass('cpl-glitch-button'); // Added Wrapper.

  var innerContent = $this.html();
  $this.append('<span class="cpl-glitch-wrapper"><span></span><span></span></span>').find('.cpl-glitch-wrapper > span').html(innerContent); // Added Background.

  $this.append('<span class="cpl-glitch-background"></span><span class="cpl-glitch-zone-hover"></span>');
});

/***/ }),
/* 13 */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7);


function recalculatePositionSlide($item, $slide) {
  if ($item.length && $slide.length) {
    var isVertical = 'column' === $item.closest('.is-style-cpl-tabs').children('.ghostkit-tabs-buttons').css('flex-direction');

    if (isVertical) {
      $slide.css({
        width: '',
        height: $item.innerHeight(),
        transform: "translate(".concat($item.position().left + $item.innerWidth(), "px, ").concat($item.position().top, "px)")
      });
    } else {
      $slide.css({
        height: '',
        width: $item.innerWidth(),
        transform: "translate(".concat($item.position().left + parseInt($item.css('margin-left'), 10), "px, ").concat($item.position().top + $item.innerHeight(), "px)")
      });
    }
  }
}

function createSlide($list, $itemActive, parentClass) {
  // create
  if (!$list.children('.cpl-tabs-slide').length) {
    $list.append('<span class="cpl-tabs-slide"></span>');
  }

  var $tabsSlide = $list.children('.cpl-tabs-slide');
  recalculatePositionSlide($itemActive, $tabsSlide);
  setTimeout(function () {
    $list.parents(parentClass).addClass('cpl-tabs-ready');
  }, 10);
} // Ghostkit create and position slide


_utils__WEBPACK_IMPORTED_MODULE_0__.$doc.on('activateTab.ghostkit', function (event) {
  if ('ghostkit' !== event.namespace) {
    return;
  }

  (0,_utils__WEBPACK_IMPORTED_MODULE_0__.$)('.is-style-cpl-tabs:not(.cpl-tabs-ready) > .ghostkit-tabs-buttons').each(function () {
    var $tabsItemsList = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.$)(this);
    var $tabsItemActive = $tabsItemsList.children('.ghostkit-tabs-buttons-item-active');
    createSlide($tabsItemsList, $tabsItemActive, '.is-style-cpl-tabs');
  });
}); // WooCommerce create and position slide

_utils__WEBPACK_IMPORTED_MODULE_0__.$doc.one('init', '.woocommerce-tabs:not(.cpl-tabs-ready)', function (e) {
  var $tabsItemList = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.$)(e.currentTarget).children('.tabs');
  var $tabsItemActive = $tabsItemList.children('.active');
  createSlide($tabsItemList, $tabsItemActive, '.woocommerce-tabs');
}); // position slide on click

_utils__WEBPACK_IMPORTED_MODULE_0__.$doc.on('click', '.is-style-cpl-tabs.cpl-tabs-ready > .ghostkit-tabs-buttons, .woocommerce-tabs.cpl-tabs-ready > .tabs', function () {
  var $tabsItemList = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.$)(this);
  var $tabsItemActive = $tabsItemList.children('.ghostkit-tabs-buttons-item-active, .active');
  var $tabsSlide = $tabsItemList.children('.cpl-tabs-slide');
  recalculatePositionSlide($tabsItemActive, $tabsSlide);
}); // update position on resize

(0,_utils__WEBPACK_IMPORTED_MODULE_0__.debounceResize)(function () {
  (0,_utils__WEBPACK_IMPORTED_MODULE_0__.$)('.is-style-cpl-tabs.cpl-tabs-ready > .ghostkit-tabs-buttons, .woocommerce-tabs.cpl-tabs-ready > .tabs').each(function () {
    var $tabsItemList = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.$)(this);
    var $tabsItemActive = $tabsItemList.children('.ghostkit-tabs-buttons-item-active, .active');
    var $tabsSlide = $tabsItemList.children('.cpl-tabs-slide');
    recalculatePositionSlide($tabsItemActive, $tabsSlide);
  });
});

/***/ }),
/* 14 */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7);

/**
 * Stretch Background Columns
 */

function stretchColumns() {
  (0,_utils__WEBPACK_IMPORTED_MODULE_0__.$)('.ghostkit-grid-inner').each(function () {
    var $this = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.$)(this);
    var $cols = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.$)(this).find('> .ghostkit-col');
    var rectRow = $this.parent()[0].getBoundingClientRect();
    var leftRow = rectRow.left;
    var rightRow = window.innerWidth - rectRow.right;
    $cols.each(function () {
      var $col = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.$)(this);
      var awbWrap = $col.children('.nk-awb.alignfull');

      if (awbWrap) {
        var rectCol = $col[0].getBoundingClientRect();
        var leftCol = rectCol.left;
        var rightCol = window.innerWidth - rectCol.right; // We need to round numbers because in some situations the same blocks has different offsets, for example
        // Row right is 68
        // Col right is 68.015625
        // I don't know why :(

        if (Math.round(leftRow) === Math.round(leftCol)) {
          awbWrap.addClass('alignfull-left');
        } else {
          awbWrap.removeClass('alignfull-left');
        }

        if (Math.round(rightRow) === Math.round(rightCol)) {
          awbWrap.addClass('alignfull-right');
        } else {
          awbWrap.removeClass('alignfull-right');
        }
      }
    });
  });
} // init stretch


(0,_utils__WEBPACK_IMPORTED_MODULE_0__.debounceResize)(stretchColumns);
(0,_utils__WEBPACK_IMPORTED_MODULE_0__.$)(stretchColumns);
stretchColumns();

/***/ }),
/* 15 */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7);

var $navbar = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.$)('.site-header, .woocommerce-notices, .cpl-navbar-icons, .cpl-scroll-top-button'); // hide / show

var hideClass = 'cpl-navbar-hide';
var showClass = 'cpl-navbar-show';
var scrollClass = 'cpl-navbar-scroll';
(0,_utils__WEBPACK_IMPORTED_MODULE_0__.throttleScroll)(function (type, scroll) {
  // show / hide
  if ('down' === type && 200 < scroll) {
    $navbar.removeClass(showClass).addClass(hideClass);
  } else if ('up' === type || 'start' === type) {
    $navbar.removeClass(hideClass).addClass(showClass);
  }

  if (100 < scroll) {
    $navbar.addClass(scrollClass);
  } else {
    $navbar.removeClass(scrollClass);
  }
}); // Add child menu items with parent link

var __openParentLink = window.cplData.__open_parent_link;
var navigationMobileParentLinksToDropdowns = window.cplData.navigation_mobile_parent_links_to_dropdowns;
(0,_utils__WEBPACK_IMPORTED_MODULE_0__.$)('.cpl-navbar-mobile .menu-item-has-children > a, .cpl-navbar-mobile .page_item_has_children > a').each(function () {
  var isHash = this.hash;
  var $this = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.$)(this);

  if ('#!' !== isHash && $this.attr('href') && '#' !== $this.attr('href') && navigationMobileParentLinksToDropdowns) {
    $this.next().prepend('<li class="menu-item"></li>').children('li:first-child').prepend($this.clone()).children().text(__openParentLink).addClass('cpl-navbar-mobile-parent-links-to-dropdowns').append('<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 9L15 4M15 4L20 9M15 4V16C15 17.0609 14.5786 18.0783 13.8284 18.8284C13.0783 19.5786 12.0609 20 11 20H4" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>');
  }
}); // Mobile open

_utils__WEBPACK_IMPORTED_MODULE_0__.$doc.on('click', '.site-header .cpl-navbar-toggle, .cpl-navbar-icons .cpl-navbar-toggle', function (e) {
  e.preventDefault();
  _utils__WEBPACK_IMPORTED_MODULE_0__.$body.toggleClass('cpl-navbar-mobile-open');
}); // Mobile close

_utils__WEBPACK_IMPORTED_MODULE_0__.$doc.on('beforeClose.fb', function (e) {
  if (e.target.querySelectorAll('.cpl-navbar-mobile').length) {
    _utils__WEBPACK_IMPORTED_MODULE_0__.$body.removeClass('cpl-navbar-mobile-open');
  }
}); // mobile collapse

function hideCollapseNavbar($collapse) {
  var $collapseMenu = $collapse.children('.sub-menu, .children');
  $collapseMenu.stop().css('display', 'block').slideUp(300, function () {
    $collapseMenu.css('height', '');
    $collapseMenu.find('.menu-item-has-children.show, .page_item_has_children.show').removeClass('show').children('.sub-menu, .children').stop().css('display', 'none');
  });
  $collapse.removeClass('show');
}

function showCollapseNavbar($collapse) {
  var $collapseMenu = $collapse.children('.sub-menu, .children');
  $collapseMenu.stop().css('display', 'none').slideDown(300, function () {
    $collapseMenu.css('height', '');
  });
  $collapse.addClass('show');
}

_utils__WEBPACK_IMPORTED_MODULE_0__.$doc.on('click', '.cpl-navbar-mobile .menu-item-has-children > a, .cpl-navbar-mobile .page_item_has_children > a, .widget_nav_menu .menu-item-has-children > a, .widget_nav_menu .page_item_has_children > a', function (e) {
  e.preventDefault();
  var $collapse = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.$)(this).siblings('.sub-menu, .children').parent();

  if ($collapse.length) {
    var isShowed = $collapse.hasClass('show');

    if (isShowed) {
      hideCollapseNavbar($collapse);
    } else {
      showCollapseNavbar($collapse);
    }
  }
}); // hide collapse

_utils__WEBPACK_IMPORTED_MODULE_0__.$doc.on('afterClose.fb', function () {
  var $collapse = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.$)('.cpl-navbar-mobile .menu-item-has-children, .cpl-navbar-mobile .page_item_has_children');
  hideCollapseNavbar($collapse);
}); // Dropdown

var $itemDropdown = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.$)('.site-header .menu-item-has-children, .site-header .page_item_has_children');
var $dropdownMenu = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.$)('.site-header .sub-menu, .site-header .children'); // closing the menu when click to the side

_utils__WEBPACK_IMPORTED_MODULE_0__.$doc.on('mouseup', function (e) {
  var dropdownHas = $itemDropdown.has(e.target).length;

  if (!dropdownHas && ($itemDropdown.hasClass('focus') || $itemDropdown.hasClass('show'))) {
    $itemDropdown.removeClass('focus show').children('.sub-menu, .children').removeClass('focus show');
  }
}); // don't close the menu with the form

var focusForm = "\n    .sub-menu:not(.show) input,\n    .sub-menu:not(.show) textarea,\n    .sub-menu:not(.show) button,\n    .sub-menu:not(.show) select,\n    .children:not(.show) input,\n    .children:not(.show) textarea,\n    .children:not(.show) button,\n    .children:not(.show) select\n";
_utils__WEBPACK_IMPORTED_MODULE_0__.$doc.on('focus', focusForm, function () {
  var $thisDropdown = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.$)(this).parents('.menu-item-has-children');
  $thisDropdown.addClass('show').children('.sub-menu, .children').addClass('show');
}); // closing the menu when hover to the other nav-link

_utils__WEBPACK_IMPORTED_MODULE_0__.$doc.on('mouseenter', '.site-header .menu-item-has-children > a, .site-header .page_item_has_children > a', function () {
  var $dropdowns = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.$)(this).closest('.site-header').find('.menu-item-has-children.focus, .page_item_has_children.focus');

  if ($dropdowns.length) {
    $dropdowns.children('a').blur();
    $dropdowns.removeClass('focus').children('.sub-menu, .children').removeClass('focus');
  }
}); // show and hide the menu with focus

function toggleShow() {
  var $thisDropdown = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.$)(this).parents('.menu-item-has-children, .page_item_has_children');
  var $thisDropdownMenu = $thisDropdown.children('.sub-menu, .children');

  if (!$thisDropdown.hasClass('focus')) {
    $thisDropdown.addClass('focus');
    $thisDropdownMenu.addClass('focus');
  } else {
    $thisDropdown.removeClass('focus');
    $thisDropdownMenu.removeClass('focus');
  }
}

_utils__WEBPACK_IMPORTED_MODULE_0__.$doc.on('focus', '.site-header a', toggleShow);
_utils__WEBPACK_IMPORTED_MODULE_0__.$doc.on('blur', '.site-header a', toggleShow); // update position

(0,_utils__WEBPACK_IMPORTED_MODULE_0__.debounceResize)(function () {
  $dropdownMenu.each(function () {
    var $thisDropdown = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.$)(this);
    var rect = $thisDropdown[0].getBoundingClientRect();
    var rectLeft = rect.left;
    var rectRight = rect.right;
    var rectWidth = rect.width;
    var wndW = _utils__WEBPACK_IMPORTED_MODULE_0__.$wnd.width();

    if (0 > wndW - rectRight && $dropdownMenu.parents('.cpl-navbar-align-left')) {
      $thisDropdown.addClass('cpl-menu-drop-left');

      if (wndW - rectRight === rectWidth + 10) {
        $thisDropdown.removeClass('cpl-menu-drop-left');
      }
    }

    if (0 > rectLeft && $dropdownMenu.parents('.cpl-navbar-align-center, .cpl-navbar-align-right')) {
      $thisDropdown.addClass('cpl-menu-drop-right');

      if (rectLeft === rectWidth + 10) {
        $thisDropdown.removeClass('cpl-menu-drop-right');
      }
    }
  });
}); // Hide when a key is pressed Esc

_utils__WEBPACK_IMPORTED_MODULE_0__.$doc.on('keyup', function (e) {
  if (27 === e.keyCode) {
    // hide navbar mobile
    if (_utils__WEBPACK_IMPORTED_MODULE_0__.$body.hasClass('cpl-navbar-mobile-open')) {
      _utils__WEBPACK_IMPORTED_MODULE_0__.$body.removeClass('cpl-navbar-mobile-open');
    } // hide dropdown


    if ($itemDropdown.hasClass('focus show')) {
      $itemDropdown.removeClass('focus show').children('.sub-menu.focus').removeClass('focus show');
    }
  }
}); // Prepare mega menu lines.

var $megaMenus = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.$)('.ghost-mega-menu > .sub-menu');

function prepareMegaMenuLines() {
  // Find all mega menus.
  $megaMenus.each(function () {
    var $mega = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.$)(this);
    var $columns = $mega.children('.menu-item');
    var rows = [];
    var currentRow = 0;
    var lastTopPos = null; // Find all rows.

    $columns.each(function () {
      var $item = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.$)(this);
      var topPos = $item[0].getBoundingClientRect().top; // Check if current item on new row.

      if (null !== lastTopPos && lastTopPos !== topPos) {
        currentRow = 1;
      }

      lastTopPos = topPos;

      if (!rows[currentRow]) {
        rows[currentRow] = [];
      }

      rows[currentRow].push($item);
    }); // Prepare lines div.

    var $lines = $mega.find('.ghost-mega-menu-lines');
    var linesHTML = '';
    var lastLineTopPos = 0;

    if (!$lines.length) {
      $lines = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.$)('<div class="ghost-mega-menu-lines"></div>').appendTo($mega);
    } // Add horizontal lines between rows.


    rows.forEach(function (row, i) {
      if (rows[i + 1]) {
        if (row[0]) {
          lastLineTopPos += row[0].innerHeight();
        }

        linesHTML += "<div class=\"ghost-mega-menu-line-horizontal\" style=\"position: absolute; top: ".concat(lastLineTopPos, "px; left: 0; right: 0;\"></div>");
      }
    });
    $lines.html(linesHTML);
  });
}

prepareMegaMenuLines();
(0,_utils__WEBPACK_IMPORTED_MODULE_0__.debounceResize)(prepareMegaMenuLines); // Open search using keyboard shortcut "Ctrl + /".

var $searchToggle = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.$)('[data-src="#popup_search"]:eq(0)');

if ($searchToggle.length) {
  _utils__WEBPACK_IMPORTED_MODULE_0__.$doc.on('keydown', function (e) {
    if (e.ctrlKey && '/' === e.key) {
      e.preventDefault();
      $searchToggle.click();
    }
  });
} // navbar mobile animation


_utils__WEBPACK_IMPORTED_MODULE_0__.$doc.on('beforeShow.fb', function () {
  // navbar mobile items
  var $delay = 200;
  (0,_utils__WEBPACK_IMPORTED_MODULE_0__.$)('.cpl-navbar-mobile .cpl-navbar-body ul.menu > .menu-item, .cpl-navbar-mobile .cpl-navbar-body .menu > ul > .page_item').each(function () {
    var _this = this;

    $delay += 100;
    setTimeout(function () {
      (0,_utils__WEBPACK_IMPORTED_MODULE_0__.$)(_this).addClass('cpl-navbar-item-animation');
    }, $delay);
  });
}); // navbar mobile removed class animation

_utils__WEBPACK_IMPORTED_MODULE_0__.$doc.on('afterClose.fb', function () {
  (0,_utils__WEBPACK_IMPORTED_MODULE_0__.$)('.cpl-navbar-mobile .cpl-navbar-body ul.menu > .menu-item, .cpl-navbar-mobile .cpl-navbar-body .menu > ul > .page_item').each(function () {
    (0,_utils__WEBPACK_IMPORTED_MODULE_0__.$)(this).removeClass('cpl-navbar-item-animation');
  });
});

/***/ }),
/* 16 */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var raf_schd__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7);


var $cursor = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.$)('.cpl-cursor');
var elements = "\n    a,\n    button,\n    input,\n    textarea,\n    select,\n    [role=\"button\"],\n    .ghostkit-video\n";
var moveCursor = (0,raf_schd__WEBPACK_IMPORTED_MODULE_1__["default"])(function (e) {
  $cursor[0].style.setProperty('--cpl-cursor__x', "".concat(e.clientX, "px"));
  $cursor[0].style.setProperty('--cpl-cursor__y', "".concat(e.clientY, "px"));
});

if (!_utils__WEBPACK_IMPORTED_MODULE_0__.isMobile && $cursor.length) {
  _utils__WEBPACK_IMPORTED_MODULE_0__.$body.addClass('cpl-cursor-enabled');
  _utils__WEBPACK_IMPORTED_MODULE_0__.$doc.on('mousemove drag', moveCursor);
  _utils__WEBPACK_IMPORTED_MODULE_0__.$doc.on('swiperTouchMove.vpf', function (event, vpObject, swiper, e) {
    if ('vpf' !== event.namespace) {
      return;
    }

    moveCursor(e);
  });
  _utils__WEBPACK_IMPORTED_MODULE_0__.$doc.on('swiperTouchMove.ghostkit', function (event, gktObject, swiper, e) {
    if ('ghostkit' !== event.namespace) {
      return;
    }

    moveCursor(e);
  });
  _utils__WEBPACK_IMPORTED_MODULE_0__.$doc.on('mouseenter', elements, function () {
    $cursor.addClass('cpl-cursor-hover');
  }).on('mouseleave', elements, function () {
    $cursor.removeClass('cpl-cursor-hover');
  });
}

/***/ }),
/* 17 */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7);

var $navbarTopBadge = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.$)('.cpl-navbar-top .badge');
_utils__WEBPACK_IMPORTED_MODULE_0__.$body.on('added_to_cart removed_from_cart wc_fragments_loaded wc_fragments_refreshed', function () {
  var $smallCartCount = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.$)('.widget_shopping_cart_content:eq(0) [data-cpl-cart-count]');
  var count = parseInt($smallCartCount.attr('data-cpl-cart-count'), 10);

  if (!count) {
    $navbarTopBadge.addClass('d-none');
  } else {
    $navbarTopBadge.removeClass('d-none');
  }

  $navbarTopBadge.html(count);
});

/***/ }),
/* 18 */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var throttle_debounce__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7);


var $ticker = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.$)('.cpl-ticker');
var $tickerInner = $ticker.children();
var $starterElements = $tickerInner.children('div');
var PIXES_PER_SECOND = 50;

if ($starterElements.length) {
  var clonesCount = 1;
  var firstRun = true; // Create ticker clones if needed, recalculate animation speed.

  var recalculateTickerClones = (0,throttle_debounce__WEBPACK_IMPORTED_MODULE_0__.throttle)(200, function () {
    var wndW = _utils__WEBPACK_IMPORTED_MODULE_1__.$wnd.width();
    var clonesWidth = 0;
    $starterElements.each(function () {
      clonesWidth += (0,_utils__WEBPACK_IMPORTED_MODULE_1__.$)(this).innerWidth();
    }); // We should fill the whole line + 2 more item to prevent possible blinking.

    var neededClones = 2 + Math.ceil(wndW / clonesWidth);

    if (neededClones > clonesCount) {
      var additionalClones = neededClones - clonesCount;

      for (var i = 0; i < additionalClones; i += 1) {
        $starterElements.clone().appendTo($tickerInner);
        clonesCount += 1;
      }
    } // Set animation.


    $tickerInner.css({
      width: clonesWidth,
      animationDuration: "".concat(clonesWidth / PIXES_PER_SECOND, "s")
    }); // Show ticker on first run.

    if (firstRun) {
      firstRun = false;
      $ticker.addClass('cpl-ticker-ready');
    }
  });
  _utils__WEBPACK_IMPORTED_MODULE_1__.$doc.on('load', function () {
    return recalculateTickerClones;
  });
  (0,_utils__WEBPACK_IMPORTED_MODULE_1__.debounceResize)(recalculateTickerClones);
  recalculateTickerClones();
}

/***/ }),
/* 19 */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7);

var $button = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.$)('.cpl-scroll-top-button');

if ($button.length) {
  (0,_utils__WEBPACK_IMPORTED_MODULE_0__.throttleScroll)(function (type, scroll) {
    if ('end' === type || 400 < scroll) {
      $button.addClass('cpl-scroll-top-button-show');
    } else {
      $button.removeClass('cpl-scroll-top-button-show');
    }
  });
}

/***/ }),
/* 20 */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var raf_schd__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7);


var $progress = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.$)('.cpl-scroll-progress-bar');

function updateScrollProgress() {
  var maxHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  $progress[0].style.setProperty('--cpl-scroll-progress', "".concat(Math.min(100, _utils__WEBPACK_IMPORTED_MODULE_0__.$wnd.scrollTop() / maxHeight * 100).toFixed(2), "%"));
}

if ($progress.length) {
  _utils__WEBPACK_IMPORTED_MODULE_0__.$wnd.on('scroll resize', (0,raf_schd__WEBPACK_IMPORTED_MODULE_1__["default"])(updateScrollProgress));
  (0,_utils__WEBPACK_IMPORTED_MODULE_0__.$)((0,raf_schd__WEBPACK_IMPORTED_MODULE_1__["default"])(updateScrollProgress));
  (0,_utils__WEBPACK_IMPORTED_MODULE_0__.throttleScroll)(function (type, scroll) {
    if ('end' === type || 400 < scroll) {
      // Display progress bar only if document height is twice larger than window height.
      if (window.innerHeight * 2 < document.documentElement.offsetHeight) {
        $progress.addClass('cpl-scroll-progress-bar-show');
      }
    } else {
      $progress.removeClass('cpl-scroll-progress-bar-show');
    }
  });
}

/***/ }),
/* 21 */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7);

(0,_utils__WEBPACK_IMPORTED_MODULE_0__.$)('.cpl-masonry').each(function () {
  var $masonry = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.$)(this).masonry();
  $masonry.imagesLoaded().progress(function () {
    $masonry.masonry();
  });
});

/***/ }),
/* 22 */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7);

var _window = window,
    anime = _window.anime; // search socials

var animeSearchSocials = anime({
  opacity: [0, 1],
  easing: 'easeOutSine',
  duration: 200,
  targets: '.cpl-search .cpl-social-links li',
  autoplay: false,
  delay: anime.stagger(100, {
    start: 550
  })
}); // widgets navbar

var animeWidgetNavbar = anime({
  opacity: [0, 1],
  translateY: ['10px', 0],
  easing: 'easeOutSine',
  duration: 200,
  targets: '.cpl-navbar-mobile .cpl-navbar-widget-area .widget > *',
  autoplay: false,
  delay: anime.stagger(80, {
    start: 550
  })
}); // open popup

_utils__WEBPACK_IMPORTED_MODULE_0__.$doc.on('beforeShow.fb', function () {
  // play animejs
  animeSearchSocials.play();
  animeWidgetNavbar.play();
});

/***/ }),
/* 23 */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7);

(0,_utils__WEBPACK_IMPORTED_MODULE_0__.$)('.cpl-fancybox-toggle').each(function () {
  var $this = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.$)(this);
  var conf = {};
  conf.backFocus = false;
  conf.hideScrollbar = false;
  conf.touch = false;
  conf.closeExisting = true;
  conf.smallBtn = false;
  conf.toolbar = false; // Navbar init.

  if ($this.hasClass('cpl-navbar-toggle')) {
    conf.baseClass = 'cpl-fancybox-navbar';
    conf.keyboard = false;
    conf.autoFocus = false;
  } // Offcanvas init.


  if ($this.hasClass('cpl-offcanvas-toggle')) {
    conf.baseClass = 'cpl-fancybox-offcanvas';
    conf.keyboard = false;
    conf.autoFocus = false;
  } // Search init.


  if ($this.hasClass('cpl-search-toggle')) {
    conf.baseClass = 'cpl-fancybox-search';
    conf.autoFocus = true;
  } // Cart init.


  if ($this.hasClass('cpl-cart-toggle')) {
    conf.baseClass = 'cpl-fancybox-cart';
    conf.keyboard = false;
    conf.autoFocus = false;
  } // Signin init.


  if ($this.hasClass('cpl-signin-toggle')) {
    conf.baseClass = 'cpl-fancybox-signin';
    conf.autoFocus = true;
  }

  $this.fancybox(conf);
}); // fix scrollbar in the fancybox

_utils__WEBPACK_IMPORTED_MODULE_0__.$doc.on('beforeShow.fb', function (e) {
  (0,_utils__WEBPACK_IMPORTED_MODULE_0__.bodyOverflow)(1);
  setTimeout(function () {
    (0,_utils__WEBPACK_IMPORTED_MODULE_0__.$)(e.target).addClass('cpl-fancybox-open');
  }, 10);
});
_utils__WEBPACK_IMPORTED_MODULE_0__.$doc.on('beforeClose.fb', function (e) {
  var $this = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.$)(e.target);
  $this.removeClass('cpl-fancybox-open'); // Close SearchWP if available.

  var $search = $this.find('.cpl-search-input');

  if ($search.length && $search.data('plugin_searchwp_live_search') && $search.data('plugin_searchwp_live_search').destroy_results) {
    $search.data('plugin_searchwp_live_search').destroy_results();
  }
});
_utils__WEBPACK_IMPORTED_MODULE_0__.$doc.on('afterClose.fb', function () {
  if (!(0,_utils__WEBPACK_IMPORTED_MODULE_0__.$)('.fancybox-container').length) {
    (0,_utils__WEBPACK_IMPORTED_MODULE_0__.bodyOverflow)(0);
  }
});
_utils__WEBPACK_IMPORTED_MODULE_0__.$doc.on('keyup', function (e) {
  if (27 === e.keyCode) {
    _utils__WEBPACK_IMPORTED_MODULE_0__.$.fancybox.close();
  }
});

/***/ }),
/* 24 */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7);

/**
 * Update Cart Total Number.
 */

function updateCartTotals() {
  var totals = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.$)('#popup_cart [data-cpl-cart-count]:eq(0)').attr('data-cpl-cart-count');
  var $badge = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.$)('[data-src="#popup_cart"] .badge'); // update badge totals.

  $badge.text(totals); // hide/show badge.

  $badge["".concat(!totals || '0' === totals ? 'add' : 'remove', "Class")]('d-none');
} // Cart Events.


_utils__WEBPACK_IMPORTED_MODULE_0__.$doc.on('added_to_cart removed_from_cart wc_fragments_loaded wc_fragments_refreshed', function () {
  updateCartTotals();
});

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
!function() {
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _parts_anchor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6);
/* harmony import */ var _parts_fade_between_pages__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(10);
/* harmony import */ var _parts_element_touchspin__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(11);
/* harmony import */ var _parts_element_glitch__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(12);
/* harmony import */ var _parts_element_tabs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(13);
/* harmony import */ var _parts_element_grid__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(14);
/* harmony import */ var _parts_layout_navigation__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(15);
/* harmony import */ var _parts_layout_cursor__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(16);
/* harmony import */ var _parts_layout_cart__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(17);
/* harmony import */ var _parts_layout_ticker__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(18);
/* harmony import */ var _parts_layout_scroll_top_button__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(19);
/* harmony import */ var _parts_layout_scroll_progress__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(20);
/* harmony import */ var _parts_plugin_masonry__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(21);
/* harmony import */ var _parts_plugin_anime__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(22);
/* harmony import */ var _parts_plugin_fancybox__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(23);
/* harmony import */ var _parts_plugin_woocommerce__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(24);
















}();
/******/ })()
;
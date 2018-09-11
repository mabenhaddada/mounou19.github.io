/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 13);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("preact");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.init = init;
exports.getLatestUUID = getLatestUUID;
exports.getFeed = getFeed;
exports.getFeedItem = getFeedItem;
exports.getDetailsItem = getDetailsItem;

var _v = _interopRequireDefault(__webpack_require__(17));

var _child_process = _interopRequireDefault(__webpack_require__(21));

var _fetch = __webpack_require__(4);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

Function.prototype.$asyncbind = function $asyncbind(self, catcher) {
  "use strict";

  if (!Function.prototype.$asyncbind) {
    Object.defineProperty(Function.prototype, "$asyncbind", {
      value: $asyncbind,
      enumerable: false,
      configurable: true,
      writable: true
    });
  }

  if (!$asyncbind.trampoline) {
    $asyncbind.trampoline = function trampoline(t, x, s, e, u) {
      return function b(q) {
        while (q) {
          if (q.then) {
            q = q.then(b, e);
            return u ? undefined : q;
          }

          try {
            if (q.pop) {
              if (q.length) return q.pop() ? x.call(t) : q;
              q = s;
            } else q = q.call(t);
          } catch (r) {
            return e(r);
          }
        }
      };
    };
  }

  if (!$asyncbind.LazyThenable) {
    $asyncbind.LazyThenable = function () {
      function isThenable(obj) {
        return obj && obj instanceof Object && typeof obj.then === "function";
      }

      function resolution(p, r, how) {
        try {
          var x = how ? how(r) : r;
          if (p === x) return p.reject(new TypeError("Promise resolution loop"));

          if (isThenable(x)) {
            x.then(function (y) {
              resolution(p, y);
            }, function (e) {
              p.reject(e);
            });
          } else {
            p.resolve(x);
          }
        } catch (ex) {
          p.reject(ex);
        }
      }

      function _unchained(v) {}

      function thenChain(res, rej) {
        this.resolve = res;
        this.reject = rej;
      }

      function Chained() {}

      ;
      Chained.prototype = {
        resolve: _unchained,
        reject: _unchained,
        then: thenChain
      };

      function then(res, rej) {
        var chain = new Chained();

        try {
          this._resolver(function (value) {
            return isThenable(value) ? value.then(res, rej) : resolution(chain, value, res);
          }, function (ex) {
            resolution(chain, ex, rej);
          });
        } catch (ex) {
          resolution(chain, ex, rej);
        }

        return chain;
      }

      function Thenable(resolver) {
        this._resolver = resolver;
        this.then = then;
      }

      ;

      Thenable.resolve = function (v) {
        return Thenable.isThenable(v) ? v : {
          then: function then(resolve) {
            return resolve(v);
          }
        };
      };

      Thenable.isThenable = isThenable;
      return Thenable;
    }();

    $asyncbind.EagerThenable = $asyncbind.Thenable = ($asyncbind.EagerThenableFactory = function (tick) {
      tick = tick || typeof process === "object" && process.nextTick || typeof setImmediate === "function" && setImmediate || function (f) {
        setTimeout(f, 0);
      };

      var soon = function () {
        var fq = [],
            fqStart = 0,
            bufferSize = 1024;

        function callQueue() {
          while (fq.length - fqStart) {
            try {
              fq[fqStart]();
            } catch (ex) {}

            fq[fqStart++] = undefined;

            if (fqStart === bufferSize) {
              fq.splice(0, bufferSize);
              fqStart = 0;
            }
          }
        }

        return function (fn) {
          fq.push(fn);
          if (fq.length - fqStart === 1) tick(callQueue);
        };
      }();

      function Zousan(func) {
        if (func) {
          var me = this;
          func(function (arg) {
            me.resolve(arg);
          }, function (arg) {
            me.reject(arg);
          });
        }
      }

      Zousan.prototype = {
        resolve: function resolve(value) {
          if (this.state !== undefined) return;
          if (value === this) return this.reject(new TypeError("Attempt to resolve promise with self"));
          var me = this;

          if (value && (typeof value === "function" || typeof value === "object")) {
            try {
              var first = 0;
              var then = value.then;

              if (typeof then === "function") {
                then.call(value, function (ra) {
                  if (!first++) {
                    me.resolve(ra);
                  }
                }, function (rr) {
                  if (!first++) {
                    me.reject(rr);
                  }
                });
                return;
              }
            } catch (e) {
              if (!first) this.reject(e);
              return;
            }
          }

          this.state = STATE_FULFILLED;
          this.v = value;
          if (me.c) soon(function () {
            for (var n = 0, l = me.c.length; n < l; n++) {
              STATE_FULFILLED(me.c[n], value);
            }
          });
        },
        reject: function reject(reason) {
          if (this.state !== undefined) return;
          this.state = STATE_REJECTED;
          this.v = reason;
          var clients = this.c;
          if (clients) soon(function () {
            for (var n = 0, l = clients.length; n < l; n++) {
              STATE_REJECTED(clients[n], reason);
            }
          });
        },
        then: function then(onF, onR) {
          var p = new Zousan();
          var client = {
            y: onF,
            n: onR,
            p: p
          };

          if (this.state === undefined) {
            if (this.c) this.c.push(client);else this.c = [client];
          } else {
            var s = this.state,
                a = this.v;
            soon(function () {
              s(client, a);
            });
          }

          return p;
        }
      };

      function STATE_FULFILLED(c, arg) {
        if (typeof c.y === "function") {
          try {
            var yret = c.y.call(undefined, arg);
            c.p.resolve(yret);
          } catch (err) {
            c.p.reject(err);
          }
        } else c.p.resolve(arg);
      }

      function STATE_REJECTED(c, reason) {
        if (typeof c.n === "function") {
          try {
            var yret = c.n.call(undefined, reason);
            c.p.resolve(yret);
          } catch (err) {
            c.p.reject(err);
          }
        } else c.p.reject(reason);
      }

      Zousan.resolve = function (val) {
        if (val && val instanceof Zousan) return val;
        var z = new Zousan();
        z.resolve(val);
        return z;
      };

      Zousan.reject = function (err) {
        if (err && err instanceof Zousan) return err;
        var z = new Zousan();
        z.reject(err);
        return z;
      };

      Zousan.version = "2.3.3-nodent";
      return Zousan;
    })();
  }

  function boundThen() {
    return resolver.apply(self, arguments);
  }

  var resolver = this;

  switch (catcher) {
    case true:
      return new $asyncbind.Thenable(boundThen);

    case 0:
      return new $asyncbind.LazyThenable(boundThen);

    case undefined:
      boundThen.then = boundThen;
      return boundThen;

    default:
      return function () {
        try {
          return resolver.apply(self, arguments);
        } catch (ex) {
          return catcher(ex);
        }
      };
  }
};

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } } function _next(value) { step("next", value); } function _throw(err) { step("throw", err); } _next(); }); }; }

var UPDATE_TIMER = 300000;
var MAXIMUM_SIMULTANEOUS_UUID = UPDATE_TIMER / 1000 / 60 * 6; // Maximum of six hours of supported UUIDs.

var supportedUUIDs = [];
var storedFeeds = {};
var itemDeletionCandidates = {};
var storedItems = {};

function handleNewDeletionCandidates({
  deletionCandidates
}) {
  console.log('handleNewDeletionCandidates', deletionCandidates);
  deletionCandidates.forEach(candidate => {
    switch (itemDeletionCandidates[candidate]) {
      case 2:
        // Already marked for deletion twice
        // now it's time to remove it.
        delete storedItems[candidate];
        break;

      default:
        // Either not present in the candidate list, or only has been marked once.
        // Increment the marker.
        itemDeletionCandidates[candidate] = itemDeletionCandidates[candidate] ? 2 : 1;
    }
  });
}

function handleNewFeeds({
  feeds
}) {
  var newUUID = (0, _v.default)();
  var uuidSupportedCount = supportedUUIDs.length;

  if (uuidSupportedCount > MAXIMUM_SIMULTANEOUS_UUID) {
    var removed = supportedUUIDs.splice(0, MAXIMUM_SIMULTANEOUS_UUID - supportedUUIDs.length);
    removed.forEach(remove => {
      delete storedFeeds[remove];
    });
  }

  supportedUUIDs.push(newUUID);
  storedFeeds[newUUID] = feeds;
}

function init(backgroundLocation) {
  var updateThread = _child_process.default.fork(backgroundLocation);

  updateThread.on('message', message => {
    var type = message.type;

    if (type === 0
    /* FeedsRetrieved */
    ) {
        // This is the updated set of feeds that have been successfully retrieved.
        handleNewFeeds(message);
        handleNewDeletionCandidates(message);
        var feeds = message.feeds;
        setTimeout(() => {
          var message = {
            type: 1
            /* RetrieveFeeds */
            ,
            lastUpdate: feeds
          };
          updateThread.send(message);
        }, UPDATE_TIMER);
      } else if (type === 2
    /* FeedItemRetieved */
    ) {
        var item = message.item;

        if (item && item.id) {
          storedItems[item.id] = item;
        }
      }
  });
  var message = {
    type: 1
    /* RetrieveFeeds */
    ,
    lastUpdate: null
  };
  updateThread.send(message);
}

function getLatestUUID() {
  return supportedUUIDs[supportedUUIDs.length - 1];
}

function getFeed(type, uuid = getLatestUUID()) {
  if (storedFeeds[uuid] && storedFeeds[uuid] && storedFeeds[uuid][type]) {
    return storedFeeds[uuid][type];
  }

  return null;
}

function getFeedItem(_x) {
  return _getFeedItem.apply(this, arguments);
}

function _getFeedItem() {
  _getFeedItem = _asyncToGenerator(function* (id) {
    if (storedItems[id]) {
      return storedItems[id];
    }

    console.log(`${id} requested, and not in storedItems`);
    return yield (0, _fetch.fetchItem)(id);
  });
  return _getFeedItem.apply(this, arguments);
}

function getDetailsItem(_x2) {
  return _getDetailsItem.apply(this, arguments);
}

function _getDetailsItem() {
  _getDetailsItem = _asyncToGenerator(function* (id) {
    return yield (0, _fetch.fetchDetails)(id);
  });
  return _getDetailsItem.apply(this, arguments);
}

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchList = fetchList;
exports.fetchItem = fetchItem;
exports.fetchDetails = fetchDetails;

var _nodeFetch = _interopRequireDefault(__webpack_require__(5));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

Function.prototype.$asyncbind = function $asyncbind(self, catcher) {
  "use strict";

  if (!Function.prototype.$asyncbind) {
    Object.defineProperty(Function.prototype, "$asyncbind", {
      value: $asyncbind,
      enumerable: false,
      configurable: true,
      writable: true
    });
  }

  if (!$asyncbind.trampoline) {
    $asyncbind.trampoline = function trampoline(t, x, s, e, u) {
      return function b(q) {
        while (q) {
          if (q.then) {
            q = q.then(b, e);
            return u ? undefined : q;
          }

          try {
            if (q.pop) {
              if (q.length) return q.pop() ? x.call(t) : q;
              q = s;
            } else q = q.call(t);
          } catch (r) {
            return e(r);
          }
        }
      };
    };
  }

  if (!$asyncbind.LazyThenable) {
    $asyncbind.LazyThenable = function () {
      function isThenable(obj) {
        return obj && obj instanceof Object && typeof obj.then === "function";
      }

      function resolution(p, r, how) {
        try {
          var x = how ? how(r) : r;
          if (p === x) return p.reject(new TypeError("Promise resolution loop"));

          if (isThenable(x)) {
            x.then(function (y) {
              resolution(p, y);
            }, function (e) {
              p.reject(e);
            });
          } else {
            p.resolve(x);
          }
        } catch (ex) {
          p.reject(ex);
        }
      }

      function _unchained(v) {}

      function thenChain(res, rej) {
        this.resolve = res;
        this.reject = rej;
      }

      function Chained() {}

      ;
      Chained.prototype = {
        resolve: _unchained,
        reject: _unchained,
        then: thenChain
      };

      function then(res, rej) {
        var chain = new Chained();

        try {
          this._resolver(function (value) {
            return isThenable(value) ? value.then(res, rej) : resolution(chain, value, res);
          }, function (ex) {
            resolution(chain, ex, rej);
          });
        } catch (ex) {
          resolution(chain, ex, rej);
        }

        return chain;
      }

      function Thenable(resolver) {
        this._resolver = resolver;
        this.then = then;
      }

      ;

      Thenable.resolve = function (v) {
        return Thenable.isThenable(v) ? v : {
          then: function then(resolve) {
            return resolve(v);
          }
        };
      };

      Thenable.isThenable = isThenable;
      return Thenable;
    }();

    $asyncbind.EagerThenable = $asyncbind.Thenable = ($asyncbind.EagerThenableFactory = function (tick) {
      tick = tick || typeof process === "object" && process.nextTick || typeof setImmediate === "function" && setImmediate || function (f) {
        setTimeout(f, 0);
      };

      var soon = function () {
        var fq = [],
            fqStart = 0,
            bufferSize = 1024;

        function callQueue() {
          while (fq.length - fqStart) {
            try {
              fq[fqStart]();
            } catch (ex) {}

            fq[fqStart++] = undefined;

            if (fqStart === bufferSize) {
              fq.splice(0, bufferSize);
              fqStart = 0;
            }
          }
        }

        return function (fn) {
          fq.push(fn);
          if (fq.length - fqStart === 1) tick(callQueue);
        };
      }();

      function Zousan(func) {
        if (func) {
          var me = this;
          func(function (arg) {
            me.resolve(arg);
          }, function (arg) {
            me.reject(arg);
          });
        }
      }

      Zousan.prototype = {
        resolve: function resolve(value) {
          if (this.state !== undefined) return;
          if (value === this) return this.reject(new TypeError("Attempt to resolve promise with self"));
          var me = this;

          if (value && (typeof value === "function" || typeof value === "object")) {
            try {
              var first = 0;
              var then = value.then;

              if (typeof then === "function") {
                then.call(value, function (ra) {
                  if (!first++) {
                    me.resolve(ra);
                  }
                }, function (rr) {
                  if (!first++) {
                    me.reject(rr);
                  }
                });
                return;
              }
            } catch (e) {
              if (!first) this.reject(e);
              return;
            }
          }

          this.state = STATE_FULFILLED;
          this.v = value;
          if (me.c) soon(function () {
            for (var n = 0, l = me.c.length; n < l; n++) {
              STATE_FULFILLED(me.c[n], value);
            }
          });
        },
        reject: function reject(reason) {
          if (this.state !== undefined) return;
          this.state = STATE_REJECTED;
          this.v = reason;
          var clients = this.c;
          if (clients) soon(function () {
            for (var n = 0, l = clients.length; n < l; n++) {
              STATE_REJECTED(clients[n], reason);
            }
          });
        },
        then: function then(onF, onR) {
          var p = new Zousan();
          var client = {
            y: onF,
            n: onR,
            p: p
          };

          if (this.state === undefined) {
            if (this.c) this.c.push(client);else this.c = [client];
          } else {
            var s = this.state,
                a = this.v;
            soon(function () {
              s(client, a);
            });
          }

          return p;
        }
      };

      function STATE_FULFILLED(c, arg) {
        if (typeof c.y === "function") {
          try {
            var yret = c.y.call(undefined, arg);
            c.p.resolve(yret);
          } catch (err) {
            c.p.reject(err);
          }
        } else c.p.resolve(arg);
      }

      function STATE_REJECTED(c, reason) {
        if (typeof c.n === "function") {
          try {
            var yret = c.n.call(undefined, reason);
            c.p.resolve(yret);
          } catch (err) {
            c.p.reject(err);
          }
        } else c.p.reject(reason);
      }

      Zousan.resolve = function (val) {
        if (val && val instanceof Zousan) return val;
        var z = new Zousan();
        z.resolve(val);
        return z;
      };

      Zousan.reject = function (err) {
        if (err && err instanceof Zousan) return err;
        var z = new Zousan();
        z.reject(err);
        return z;
      };

      Zousan.version = "2.3.3-nodent";
      return Zousan;
    })();
  }

  function boundThen() {
    return resolver.apply(self, arguments);
  }

  var resolver = this;

  switch (catcher) {
    case true:
      return new $asyncbind.Thenable(boundThen);

    case 0:
      return new $asyncbind.LazyThenable(boundThen);

    case undefined:
      boundThen.then = boundThen;
      return boundThen;

    default:
      return function () {
        try {
          return resolver.apply(self, arguments);
        } catch (ex) {
          return catcher(ex);
        }
      };
  }
};

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } } function _next(value) { step("next", value); } function _throw(err) { step("throw", err); } _next(); }); }; }

function fetchList(_x) {
  return _fetchList.apply(this, arguments);
}

function _fetchList() {
  _fetchList = _asyncToGenerator(function* (type) {
    try {
      var json = yield (yield (0, _nodeFetch.default)(`https://hacker-news.firebaseio.com/v0/${type}stories.json`)).json();
      return json.reduce(function (acc, value, index) {
        acc[index] = value;
        return acc;
      }, {});
    } catch (error) {
      console.log(`fetchList ${type}, error`, error);
      return null;
    }
  });
  return _fetchList.apply(this, arguments);
}

function fetchItem(_x2) {
  return _fetchItem.apply(this, arguments);
}

function _fetchItem() {
  _fetchItem = _asyncToGenerator(function* (id) {
    try {
      var _ref = yield (yield (0, _nodeFetch.default)(`https://hnpwa.com/api/v0/item/${id}.json`)).json(),
          title = _ref.title,
          points = _ref.points,
          user = _ref.user,
          time = _ref.time,
          time_ago = _ref.time_ago,
          comments_count = _ref.comments_count,
          type = _ref.type,
          url = _ref.url,
          domain = _ref.domain;

      return {
        id,
        title,
        points,
        user,
        time,
        time_ago,
        comments_count,
        type,
        url,
        domain
      };
    } catch (error) {
      console.log(`Error updating item: ${id}`);
      return null;
    }
  });
  return _fetchItem.apply(this, arguments);
}

function fetchDetails(_x3) {
  return _fetchDetails.apply(this, arguments);
}

function _fetchDetails() {
  _fetchDetails = _asyncToGenerator(function* (id) {
    try {
      var json = yield (yield (0, _nodeFetch.default)(`https://hnpwa.com/api/v0/item/${id}.json`)).json();
      return json;
    } catch (error) {
      console.log(`Error updating details: ${id}`);
      return null;
    }
  });
  return _fetchDetails.apply(this, arguments);
}

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("node-fetch");

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _preact = __webpack_require__(0);

var _Logo = _interopRequireDefault(__webpack_require__(12));

var _styles = _interopRequireDefault(__webpack_require__(31));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = () => (0, _preact.h)("div", {
  "class": _styles.default.routeLoading
}, (0, _preact.h)(_Logo.default, {
  width: 60,
  height: 60
}));

exports.default = _default;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.route = route;
exports.serverRoute = serverRoute;

var _utilities = __webpack_require__(25);

var _foreground = __webpack_require__(3);

Function.prototype.$asyncbind = function $asyncbind(self, catcher) {
  "use strict";

  if (!Function.prototype.$asyncbind) {
    Object.defineProperty(Function.prototype, "$asyncbind", {
      value: $asyncbind,
      enumerable: false,
      configurable: true,
      writable: true
    });
  }

  if (!$asyncbind.trampoline) {
    $asyncbind.trampoline = function trampoline(t, x, s, e, u) {
      return function b(q) {
        while (q) {
          if (q.then) {
            q = q.then(b, e);
            return u ? undefined : q;
          }

          try {
            if (q.pop) {
              if (q.length) return q.pop() ? x.call(t) : q;
              q = s;
            } else q = q.call(t);
          } catch (r) {
            return e(r);
          }
        }
      };
    };
  }

  if (!$asyncbind.LazyThenable) {
    $asyncbind.LazyThenable = function () {
      function isThenable(obj) {
        return obj && obj instanceof Object && typeof obj.then === "function";
      }

      function resolution(p, r, how) {
        try {
          var x = how ? how(r) : r;
          if (p === x) return p.reject(new TypeError("Promise resolution loop"));

          if (isThenable(x)) {
            x.then(function (y) {
              resolution(p, y);
            }, function (e) {
              p.reject(e);
            });
          } else {
            p.resolve(x);
          }
        } catch (ex) {
          p.reject(ex);
        }
      }

      function _unchained(v) {}

      function thenChain(res, rej) {
        this.resolve = res;
        this.reject = rej;
      }

      function Chained() {}

      ;
      Chained.prototype = {
        resolve: _unchained,
        reject: _unchained,
        then: thenChain
      };

      function then(res, rej) {
        var chain = new Chained();

        try {
          this._resolver(function (value) {
            return isThenable(value) ? value.then(res, rej) : resolution(chain, value, res);
          }, function (ex) {
            resolution(chain, ex, rej);
          });
        } catch (ex) {
          resolution(chain, ex, rej);
        }

        return chain;
      }

      function Thenable(resolver) {
        this._resolver = resolver;
        this.then = then;
      }

      ;

      Thenable.resolve = function (v) {
        return Thenable.isThenable(v) ? v : {
          then: function then(resolve) {
            return resolve(v);
          }
        };
      };

      Thenable.isThenable = isThenable;
      return Thenable;
    }();

    $asyncbind.EagerThenable = $asyncbind.Thenable = ($asyncbind.EagerThenableFactory = function (tick) {
      tick = tick || typeof process === "object" && process.nextTick || typeof setImmediate === "function" && setImmediate || function (f) {
        setTimeout(f, 0);
      };

      var soon = function () {
        var fq = [],
            fqStart = 0,
            bufferSize = 1024;

        function callQueue() {
          while (fq.length - fqStart) {
            try {
              fq[fqStart]();
            } catch (ex) {}

            fq[fqStart++] = undefined;

            if (fqStart === bufferSize) {
              fq.splice(0, bufferSize);
              fqStart = 0;
            }
          }
        }

        return function (fn) {
          fq.push(fn);
          if (fq.length - fqStart === 1) tick(callQueue);
        };
      }();

      function Zousan(func) {
        if (func) {
          var me = this;
          func(function (arg) {
            me.resolve(arg);
          }, function (arg) {
            me.reject(arg);
          });
        }
      }

      Zousan.prototype = {
        resolve: function resolve(value) {
          if (this.state !== undefined) return;
          if (value === this) return this.reject(new TypeError("Attempt to resolve promise with self"));
          var me = this;

          if (value && (typeof value === "function" || typeof value === "object")) {
            try {
              var first = 0;
              var then = value.then;

              if (typeof then === "function") {
                then.call(value, function (ra) {
                  if (!first++) {
                    me.resolve(ra);
                  }
                }, function (rr) {
                  if (!first++) {
                    me.reject(rr);
                  }
                });
                return;
              }
            } catch (e) {
              if (!first) this.reject(e);
              return;
            }
          }

          this.state = STATE_FULFILLED;
          this.v = value;
          if (me.c) soon(function () {
            for (var n = 0, l = me.c.length; n < l; n++) {
              STATE_FULFILLED(me.c[n], value);
            }
          });
        },
        reject: function reject(reason) {
          if (this.state !== undefined) return;
          this.state = STATE_REJECTED;
          this.v = reason;
          var clients = this.c;
          if (clients) soon(function () {
            for (var n = 0, l = clients.length; n < l; n++) {
              STATE_REJECTED(clients[n], reason);
            }
          });
        },
        then: function then(onF, onR) {
          var p = new Zousan();
          var client = {
            y: onF,
            n: onR,
            p: p
          };

          if (this.state === undefined) {
            if (this.c) this.c.push(client);else this.c = [client];
          } else {
            var s = this.state,
                a = this.v;
            soon(function () {
              s(client, a);
            });
          }

          return p;
        }
      };

      function STATE_FULFILLED(c, arg) {
        if (typeof c.y === "function") {
          try {
            var yret = c.y.call(undefined, arg);
            c.p.resolve(yret);
          } catch (err) {
            c.p.reject(err);
          }
        } else c.p.resolve(arg);
      }

      function STATE_REJECTED(c, reason) {
        if (typeof c.n === "function") {
          try {
            var yret = c.n.call(undefined, reason);
            c.p.resolve(yret);
          } catch (err) {
            c.p.reject(err);
          }
        } else c.p.reject(reason);
      }

      Zousan.resolve = function (val) {
        if (val && val instanceof Zousan) return val;
        var z = new Zousan();
        z.resolve(val);
        return z;
      };

      Zousan.reject = function (err) {
        if (err && err instanceof Zousan) return err;
        var z = new Zousan();
        z.reject(err);
        return z;
      };

      Zousan.version = "2.3.3-nodent";
      return Zousan;
    })();
  }

  function boundThen() {
    return resolver.apply(self, arguments);
  }

  var resolver = this;

  switch (catcher) {
    case true:
      return new $asyncbind.Thenable(boundThen);

    case 0:
      return new $asyncbind.LazyThenable(boundThen);

    case undefined:
      boundThen.then = boundThen;
      return boundThen;

    default:
      return function () {
        try {
          return resolver.apply(self, arguments);
        } catch (ex) {
          return catcher(ex);
        }
      };
  }
};

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } } function _next(value) { step("next", value); } function _throw(err) { step("throw", err); } _next(); }); }; }

function generateJSON(_x) {
  return _generateJSON.apply(this, arguments);
}

function _generateJSON() {
  _generateJSON = _asyncToGenerator(function* ({
    type,
    from,
    to,
    uuid
  }) {
    var feedItems = (0, _foreground.getFeed)(type, uuid);

    if (feedItems === null) {
      return null;
    }

    var items = {};
    var $entities = {};

    for (var id in feedItems) {
      var formattedId = Number(id);
      var feedItemId = feedItems[id];

      if (formattedId >= from && formattedId <= to) {
        items[formattedId] = feedItemId;
        $entities[feedItemId] = yield (0, _foreground.getFeedItem)(feedItemId);
      } else if (formattedId > to) {
        break;
      }
    }

    return {
      uuid,
      type,
      from,
      to,
      max: Object.keys(feedItems).length,
      items,
      $entities
    };
  });
  return _generateJSON.apply(this, arguments);
}

function route(_x2, _x3, _x4) {
  return _route.apply(this, arguments);
}

function _route() {
  _route = _asyncToGenerator(function* (req, res, next) {
    res.setHeader('content-type', 'application/json; charset=utf-8');
    var _req$params = req.params,
        _req$params$type = _req$params.type,
        type = _req$params$type === void 0 ? 'top' : _req$params$type,
        _req$params$from = _req$params.from,
        from = _req$params$from === void 0 ? 0 : _req$params$from,
        _req$params$to = _req$params.to,
        to = _req$params$to === void 0 ? 29 : _req$params$to,
        _req$params$uuid = _req$params.uuid,
        uuid = _req$params$uuid === void 0 ? (0, _foreground.getLatestUUID)() : _req$params$uuid;

    try {
      var json = yield generateJSON({
        type,
        from: Number(from),
        to: Number(to),
        uuid
      });
      res.send(200, json);
    } catch (error) {
      res.send(200, {});
    }

    next();
  });
  return _route.apply(this, arguments);
}

function serverRoute(_x5, _x6) {
  return _serverRoute.apply(this, arguments);
}

function _serverRoute() {
  _serverRoute = _asyncToGenerator(function* (req, {
    type
  }) {
    var page = req.params.id || 1;

    var _listRange = (0, _utilities.listRange)(page),
        from = _listRange.from,
        to = _listRange.to;

    try {
      var json = yield generateJSON({
        type,
        from,
        to,
        uuid: (0, _foreground.getLatestUUID)()
      });
      return Object.assign(json, {
        page
      });
    } catch (error) {
      return {
        from,
        to
      };
    }
  });
  return _serverRoute.apply(this, arguments);
}

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ITEMS_PER_PAGE = void 0;
var ITEMS_PER_PAGE = 30;
exports.ITEMS_PER_PAGE = ITEMS_PER_PAGE;

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("preact-render-to-string");

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _preact = __webpack_require__(0);

var _Header = _interopRequireDefault(__webpack_require__(29));

var _Loading = _interopRequireDefault(__webpack_require__(6));

var _routedView = _interopRequireDefault(__webpack_require__(32));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class RoutedView extends _preact.Component {
  constructor(props) {
    super(props);
    this.lazyLoadedRoutes = {};
  }

  loader() {
    var _props = this.props,
        load = _props.load,
        path = _props.path,
        _props$delay = _props.delay,
        delay = _props$delay === void 0 ? 200 : _props$delay;
    var timeout = delay === 0 ? null : setTimeout(_ => {
      this.setState({
        pastDelay: true
      });
    }, delay);
    load && load(file => {
      timeout && clearTimeout(timeout);
      this.setState({
        child: file.default
      }, _ => {
        this.lazyLoadedRoutes[path] = file.default;
      });
    });
  }

  componentWillMount() {
    this.loader();
  }

  componentWillReceiveProps({
    path
  }) {
    if (this.props.path !== path) {
      var nextChild = this.lazyLoadedRoutes[path];
      this.setState({
        child: nextChild
      }, _ => {
        nextChild === undefined && this.loader();
      });
    }
  }

  render(props, {
    child,
    pastDelay
  }) {
    var usableChild = props.child || child || null;
    return (0, _preact.h)("div", {
      id: "mount",
      "class": _routedView.default.viewHasHeader
    }, (0, _preact.h)(_Header.default, props), (0, _preact.h)("div", {
      "class": _routedView.default.mainView
    }, usableChild ? (0, _preact.h)(usableChild, props) : pastDelay || props.delay === 0 ? (0, _preact.h)(_Loading.default, null) : null));
  }

}

exports.default = RoutedView;

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = require("obj-str");

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _preact = __webpack_require__(0);

var _default = ({
  width = 30,
  height = 30
}) => {
  return (0, _preact.h)("svg", {
    width: width,
    height: height,
    viewBox: "-256 -256 512 512"
  }, (0, _preact.h)("path", {
    d: "M0,-256 221.7025033688164,-128 221.7025033688164,128 0,256 -221.7025033688164,128 -221.7025033688164,-128z",
    fill: "white"
  }), (0, _preact.h)("ellipse", {
    cx: "0",
    cy: "0",
    "stroke-dasharray": "416.1929553294638 30.807044670536186",
    "stroke-dashoffset": "27790.570421873046",
    "stroke-width": "16px",
    rx: "75px",
    ry: "196px",
    fill: "none",
    stroke: "#673ab8",
    transform: "rotate(52)"
  }), (0, _preact.h)("ellipse", {
    cx: "0",
    cy: "0",
    "stroke-dasharray": "377.89098046931156 69.10901953068846",
    "stroke-dashoffset": "-19309.07993846995",
    "stroke-width": "16px",
    rx: "75px",
    ry: "196px",
    fill: "none",
    stroke: "#673ab8",
    transform: "rotate(-52)"
  }), (0, _preact.h)("circle", {
    cx: "0",
    cy: "0",
    r: "34",
    fill: "#673ab8"
  }));
};

exports.default = _default;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _restify = _interopRequireDefault(__webpack_require__(14));

var _bunyan = _interopRequireDefault(__webpack_require__(15));

var _resources = _interopRequireDefault(__webpack_require__(16));

var _foreground = __webpack_require__(3);

var _classifyBrowser = _interopRequireDefault(__webpack_require__(22));

var _setRequestResources = _interopRequireDefault(__webpack_require__(24));

var _list = __webpack_require__(7);

var _details = __webpack_require__(26);

var _insecure = _interopRequireDefault(__webpack_require__(27));

var _defaultServerrender = _interopRequireDefault(__webpack_require__(28));

var _default = _interopRequireDefault(__webpack_require__(40));

var _static = _interopRequireDefault(__webpack_require__(41));

var _staticIcons = _interopRequireDefault(__webpack_require__(42));

var _serviceWorker = _interopRequireDefault(__webpack_require__(43));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Restify Plugins
// Routes
// Server Constants
var APPLICATION_NAME = 'hn-web';

var logger = _bunyan.default.createLogger({
  name: APPLICATION_NAME
});

var server = _restify.default.createServer({
  name: APPLICATION_NAME,
  log: logger
});

server.use(_restify.default.requestLogger());
server.use(_restify.default.bodyParser());
server.use(_restify.default.queryParser());
server.use((0, _classifyBrowser.default)());
server.use((0, _setRequestResources.default)((0, _resources.default)(logger))); // TODO: Do not duplicate route definitions...
// Programatically derive from a single source of truth.

server.get('/api/list/:type', _list.route);
server.get('/api/details/:id', _details.route);
server.get('/item/:id', _insecure.default, _defaultServerrender.default);
server.get('/shell', _default.default);
server.get('/dist/:classification/:file', _static.default);
server.get('/static/icons/:file', _staticIcons.default);
server.get('/service-worker.js', _serviceWorker.default);
server.get('/.*', _insecure.default, _defaultServerrender.default); // Prefetch Data for API.

(0, _foreground.init)('dist/server/restify.background.js');
server.listen(22164, function () {
  console.log('%s listening at %s', server.name, server.url);
});
process.on('unhandledRejection', (reason, p) => {
  console.log('Unhandled Rejection at:', p, 'reason:', reason); // application specific logging, throwing an error, or other logic here
});

/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = require("restify");

/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = require("bunyan");

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = loadResources;

var _fs = _interopRequireDefault(__webpack_require__(1));

var _path = _interopRequireDefault(__webpack_require__(2));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CLASSIFICATIONS = ['chrome', 'edge', 'safari', 'firefox', 'fallback'];

function loadResources(bunyanLogger) {
  var returnedResources = {};
  CLASSIFICATIONS.forEach(classification => {
    _fs.default.readFile(_path.default.resolve('dist', classification, 'webpack.json'), 'utf8', function (err, data) {
      if (err) {
        bunyanLogger.error(err);
        return;
      }

      var _JSON$parse = JSON.parse(data),
          assetsByChunkName = _JSON$parse.assetsByChunkName;

      var cssFilename = assetsByChunkName.application.filter(filename => /.css/.test(filename));
      var jsFilename = assetsByChunkName.application.filter(filename => /.js/.test(filename));
      var jsRoutes = Object.keys(assetsByChunkName).filter(key => key !== 'application').reduce((res, key) => (res[key] = `/dist/${classification}/${assetsByChunkName[key]}`, res), {}); //.reduce((res, key) => (res[key] = { js: `/dist/${classification}/${assetsByChunkName[key][0]}`, css: `/dist/${classification}/${assetsByChunkName[key][1]}`}, res), {});

      if (cssFilename && cssFilename.length > 0 && jsFilename && jsFilename.length > 0) {
        _fs.default.readFile(_path.default.resolve('dist', classification, cssFilename[0]), 'utf8', function (err, data) {
          if (err) {
            bunyanLogger.error(err);
            return;
          }

          returnedResources[classification] = {
            css: {
              inline: data,
              url: `/dist/${classification}/${cssFilename[0]}`
            },
            js: `/dist/${classification}/${jsFilename[0]}`,
            'service.worker': assetsByChunkName['service.worker'],
            routes: jsRoutes
          };
          bunyanLogger.info(`RESOURCES – Load – ${classification} success`);
        });
      }
    });
  });
  return returnedResources;
}

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

var rng = __webpack_require__(18);
var bytesToUuid = __webpack_require__(20);

function v4(options, buf, offset) {
  var i = buf && offset || 0;

  if (typeof(options) == 'string') {
    buf = options === 'binary' ? new Array(16) : null;
    options = null;
  }
  options = options || {};

  var rnds = options.random || (options.rng || rng)();

  // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`
  rnds[6] = (rnds[6] & 0x0f) | 0x40;
  rnds[8] = (rnds[8] & 0x3f) | 0x80;

  // Copy bytes to buffer, if provided
  if (buf) {
    for (var ii = 0; ii < 16; ++ii) {
      buf[i + ii] = rnds[ii];
    }
  }

  return buf || bytesToUuid(rnds);
}

module.exports = v4;


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

// Unique ID creation requires a high quality random # generator.  In node.js
// this is pretty straight-forward - we use the crypto API.

var crypto = __webpack_require__(19);

module.exports = function nodeRNG() {
  return crypto.randomBytes(16);
};


/***/ }),
/* 19 */
/***/ (function(module, exports) {

module.exports = require("crypto");

/***/ }),
/* 20 */
/***/ (function(module, exports) {

/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */
var byteToHex = [];
for (var i = 0; i < 256; ++i) {
  byteToHex[i] = (i + 0x100).toString(16).substr(1);
}

function bytesToUuid(buf, offset) {
  var i = offset || 0;
  var bth = byteToHex;
  // join used to fix memory issue caused by concatenation: https://bugs.chromium.org/p/v8/issues/detail?id=3175#c4
  return ([bth[buf[i++]], bth[buf[i++]], 
	bth[buf[i++]], bth[buf[i++]], '-',
	bth[buf[i++]], bth[buf[i++]], '-',
	bth[buf[i++]], bth[buf[i++]], '-',
	bth[buf[i++]], bth[buf[i++]], '-',
	bth[buf[i++]], bth[buf[i++]],
	bth[buf[i++]], bth[buf[i++]],
	bth[buf[i++]], bth[buf[i++]]]).join('');
}

module.exports = bytesToUuid;


/***/ }),
/* 21 */
/***/ (function(module, exports) {

module.exports = require("child_process");

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = classifyBrowser;

var _useragent = _interopRequireDefault(__webpack_require__(23));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function canDecodeBrotli(classification, os) {
  if (classification === 'chrome' || classification === 'firefox') {
    return true;
  } else if (classification === 'safari') {
    var osJson = os && os.toJSON();
    var osFamily = osJson.family && osJson.family.toLowerCase();

    if (osFamily === 'ios' && osJson.major >= 11) {
      return true;
    } else if (osFamily === 'mac os x' && osJson.minor >= 13) {
      return true;
    }
  }

  return false;
}
/**
 * Classify the browser based on user-agent
 * @public
 * @function classifyBrowser
 * @returns {Function}
 */


function classifyBrowser() {
  function userAgentClassification(req, res, next) {
    var _useragent$lookup = _useragent.default.lookup(req.headers['user-agent']),
        family = _useragent$lookup.family,
        major = _useragent$lookup.major,
        os = _useragent$lookup.os;

    var lowerCaseFamily = family.toLowerCase();
    var classification = 'fallback';
    req.log.info(`user-agent: ${req.headers['user-agent']}`);
    req.log.info(`user-agent parsed: ${lowerCaseFamily}, ${major}`);

    if (lowerCaseFamily === 'chrome' || lowerCaseFamily === 'chrome mobile' && major >= 59) {
      classification = 'chrome';
    } else if (lowerCaseFamily === 'safari' || lowerCaseFamily === 'mobile safari' && major >= 11) {
      classification = 'safari';
    } else if (lowerCaseFamily === 'firefox' && major >= 55) {
      classification = 'firefox';
    } else if (lowerCaseFamily === 'edge' && major >= 15) {
      classification = 'edge';
    }

    req.userAgentClassifiction = classification;
    var brotliCapable = canDecodeBrotli(classification, os);
    req.log.info(`user-agent canDecodeBrotli: ${brotliCapable}`);
    req.canDecodeBrotli = brotliCapable;
    next();
  }

  return userAgentClassification;
}

/***/ }),
/* 23 */
/***/ (function(module, exports) {

module.exports = require("useragent");

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = setRequestResources;

/**
 * Set on the request the resources needed for this particular request.
 * @public
 * @function setRequestResources
 * @returns {Function}
 */
function setRequestResources(resourcesList) {
  function routeBundle(req, resources) {
    var routeResources = resources && resources.routes;

    if (routeResources) {
      if (/\/item/.test(req.url)) {
        return {
          js: routeResources.ItemHome
        };
      }

      if (/\/about/.test(req.url)) {
        return {
          js: routeResources.AboutHome
        };
      }

      if (/\/user/.test(req.url)) {
        return {
          js: routeResources.UserHome
        };
      }

      return {
        js: routeResources.ListHome ? routeResources.ListHome : null
      };
    }

    return {
      js: null
    };
  }

  function setResources(req, res, next) {
    var resources = resourcesList[req.userAgentClassifiction];

    if (!/\/api\//.test(req.url) && resources) {
      req.resources = {
        inline: resources && resources.css && resources.css.inline,
        css: resources && resources.css && resources.css.url,
        js: resources && resources.js,
        'service.worker': resources && resources['service.worker'],
        route: routeBundle(req, resources)
      };
    }

    next();
  }

  return setResources;
}

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.listRange = listRange;

var _constants = __webpack_require__(8);

function listRange(page) {
  var from = (page - 1) * _constants.ITEMS_PER_PAGE;
  var to = from + (_constants.ITEMS_PER_PAGE - 1);
  return {
    from,
    to
  };
}

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.route = route;

var _foreground = __webpack_require__(3);

Function.prototype.$asyncbind = function $asyncbind(self, catcher) {
  "use strict";

  if (!Function.prototype.$asyncbind) {
    Object.defineProperty(Function.prototype, "$asyncbind", {
      value: $asyncbind,
      enumerable: false,
      configurable: true,
      writable: true
    });
  }

  if (!$asyncbind.trampoline) {
    $asyncbind.trampoline = function trampoline(t, x, s, e, u) {
      return function b(q) {
        while (q) {
          if (q.then) {
            q = q.then(b, e);
            return u ? undefined : q;
          }

          try {
            if (q.pop) {
              if (q.length) return q.pop() ? x.call(t) : q;
              q = s;
            } else q = q.call(t);
          } catch (r) {
            return e(r);
          }
        }
      };
    };
  }

  if (!$asyncbind.LazyThenable) {
    $asyncbind.LazyThenable = function () {
      function isThenable(obj) {
        return obj && obj instanceof Object && typeof obj.then === "function";
      }

      function resolution(p, r, how) {
        try {
          var x = how ? how(r) : r;
          if (p === x) return p.reject(new TypeError("Promise resolution loop"));

          if (isThenable(x)) {
            x.then(function (y) {
              resolution(p, y);
            }, function (e) {
              p.reject(e);
            });
          } else {
            p.resolve(x);
          }
        } catch (ex) {
          p.reject(ex);
        }
      }

      function _unchained(v) {}

      function thenChain(res, rej) {
        this.resolve = res;
        this.reject = rej;
      }

      function Chained() {}

      ;
      Chained.prototype = {
        resolve: _unchained,
        reject: _unchained,
        then: thenChain
      };

      function then(res, rej) {
        var chain = new Chained();

        try {
          this._resolver(function (value) {
            return isThenable(value) ? value.then(res, rej) : resolution(chain, value, res);
          }, function (ex) {
            resolution(chain, ex, rej);
          });
        } catch (ex) {
          resolution(chain, ex, rej);
        }

        return chain;
      }

      function Thenable(resolver) {
        this._resolver = resolver;
        this.then = then;
      }

      ;

      Thenable.resolve = function (v) {
        return Thenable.isThenable(v) ? v : {
          then: function then(resolve) {
            return resolve(v);
          }
        };
      };

      Thenable.isThenable = isThenable;
      return Thenable;
    }();

    $asyncbind.EagerThenable = $asyncbind.Thenable = ($asyncbind.EagerThenableFactory = function (tick) {
      tick = tick || typeof process === "object" && process.nextTick || typeof setImmediate === "function" && setImmediate || function (f) {
        setTimeout(f, 0);
      };

      var soon = function () {
        var fq = [],
            fqStart = 0,
            bufferSize = 1024;

        function callQueue() {
          while (fq.length - fqStart) {
            try {
              fq[fqStart]();
            } catch (ex) {}

            fq[fqStart++] = undefined;

            if (fqStart === bufferSize) {
              fq.splice(0, bufferSize);
              fqStart = 0;
            }
          }
        }

        return function (fn) {
          fq.push(fn);
          if (fq.length - fqStart === 1) tick(callQueue);
        };
      }();

      function Zousan(func) {
        if (func) {
          var me = this;
          func(function (arg) {
            me.resolve(arg);
          }, function (arg) {
            me.reject(arg);
          });
        }
      }

      Zousan.prototype = {
        resolve: function resolve(value) {
          if (this.state !== undefined) return;
          if (value === this) return this.reject(new TypeError("Attempt to resolve promise with self"));
          var me = this;

          if (value && (typeof value === "function" || typeof value === "object")) {
            try {
              var first = 0;
              var then = value.then;

              if (typeof then === "function") {
                then.call(value, function (ra) {
                  if (!first++) {
                    me.resolve(ra);
                  }
                }, function (rr) {
                  if (!first++) {
                    me.reject(rr);
                  }
                });
                return;
              }
            } catch (e) {
              if (!first) this.reject(e);
              return;
            }
          }

          this.state = STATE_FULFILLED;
          this.v = value;
          if (me.c) soon(function () {
            for (var n = 0, l = me.c.length; n < l; n++) {
              STATE_FULFILLED(me.c[n], value);
            }
          });
        },
        reject: function reject(reason) {
          if (this.state !== undefined) return;
          this.state = STATE_REJECTED;
          this.v = reason;
          var clients = this.c;
          if (clients) soon(function () {
            for (var n = 0, l = clients.length; n < l; n++) {
              STATE_REJECTED(clients[n], reason);
            }
          });
        },
        then: function then(onF, onR) {
          var p = new Zousan();
          var client = {
            y: onF,
            n: onR,
            p: p
          };

          if (this.state === undefined) {
            if (this.c) this.c.push(client);else this.c = [client];
          } else {
            var s = this.state,
                a = this.v;
            soon(function () {
              s(client, a);
            });
          }

          return p;
        }
      };

      function STATE_FULFILLED(c, arg) {
        if (typeof c.y === "function") {
          try {
            var yret = c.y.call(undefined, arg);
            c.p.resolve(yret);
          } catch (err) {
            c.p.reject(err);
          }
        } else c.p.resolve(arg);
      }

      function STATE_REJECTED(c, reason) {
        if (typeof c.n === "function") {
          try {
            var yret = c.n.call(undefined, reason);
            c.p.resolve(yret);
          } catch (err) {
            c.p.reject(err);
          }
        } else c.p.reject(reason);
      }

      Zousan.resolve = function (val) {
        if (val && val instanceof Zousan) return val;
        var z = new Zousan();
        z.resolve(val);
        return z;
      };

      Zousan.reject = function (err) {
        if (err && err instanceof Zousan) return err;
        var z = new Zousan();
        z.reject(err);
        return z;
      };

      Zousan.version = "2.3.3-nodent";
      return Zousan;
    })();
  }

  function boundThen() {
    return resolver.apply(self, arguments);
  }

  var resolver = this;

  switch (catcher) {
    case true:
      return new $asyncbind.Thenable(boundThen);

    case 0:
      return new $asyncbind.LazyThenable(boundThen);

    case undefined:
      boundThen.then = boundThen;
      return boundThen;

    default:
      return function () {
        try {
          return resolver.apply(self, arguments);
        } catch (ex) {
          return catcher(ex);
        }
      };
  }
};

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } } function _next(value) { step("next", value); } function _throw(err) { step("throw", err); } _next(); }); }; }

function route(_x, _x2, _x3) {
  return _route.apply(this, arguments);
}

function _route() {
  _route = _asyncToGenerator(function* (req, res, next) {
    res.setHeader('content-type', 'application/json; charset=utf-8');
    var details = yield (0, _foreground.getDetailsItem)(req.params.id);
    res.send(200, {
      $entities: {
        [req.params.id]: details
      }
    });
    next();
  });
  return _route.apply(this, arguments);
}

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = upgradeInsecureRequest;

function upgradeInsecureRequest(req, res, next) {
  var cloudflareVisitorHeader = req.header('cf-visitor');

  if (cloudflareVisitorHeader) {
    var currentProtocol = JSON.parse(cloudflareVisitorHeader).scheme;

    if (currentProtocol === 'http') {
      var newURL = `https://${req.header('x-forwarded-host')}${req.header('forwarded-request-uri')}`;
      res.redirect(301, newURL, next);
    } else {
      next();
    }
  } else {
    next();
  }
}

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = defaultRoute;

var _preact = __webpack_require__(0);

var _preactRenderToString = __webpack_require__(9);

var _routedView = _interopRequireDefault(__webpack_require__(10));

var _Loading = _interopRequireDefault(__webpack_require__(6));

var _List = _interopRequireDefault(__webpack_require__(33));

var _list = __webpack_require__(7);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

Function.prototype.$asyncbind = function $asyncbind(self, catcher) {
  "use strict";

  if (!Function.prototype.$asyncbind) {
    Object.defineProperty(Function.prototype, "$asyncbind", {
      value: $asyncbind,
      enumerable: false,
      configurable: true,
      writable: true
    });
  }

  if (!$asyncbind.trampoline) {
    $asyncbind.trampoline = function trampoline(t, x, s, e, u) {
      return function b(q) {
        while (q) {
          if (q.then) {
            q = q.then(b, e);
            return u ? undefined : q;
          }

          try {
            if (q.pop) {
              if (q.length) return q.pop() ? x.call(t) : q;
              q = s;
            } else q = q.call(t);
          } catch (r) {
            return e(r);
          }
        }
      };
    };
  }

  if (!$asyncbind.LazyThenable) {
    $asyncbind.LazyThenable = function () {
      function isThenable(obj) {
        return obj && obj instanceof Object && typeof obj.then === "function";
      }

      function resolution(p, r, how) {
        try {
          var x = how ? how(r) : r;
          if (p === x) return p.reject(new TypeError("Promise resolution loop"));

          if (isThenable(x)) {
            x.then(function (y) {
              resolution(p, y);
            }, function (e) {
              p.reject(e);
            });
          } else {
            p.resolve(x);
          }
        } catch (ex) {
          p.reject(ex);
        }
      }

      function _unchained(v) {}

      function thenChain(res, rej) {
        this.resolve = res;
        this.reject = rej;
      }

      function Chained() {}

      ;
      Chained.prototype = {
        resolve: _unchained,
        reject: _unchained,
        then: thenChain
      };

      function then(res, rej) {
        var chain = new Chained();

        try {
          this._resolver(function (value) {
            return isThenable(value) ? value.then(res, rej) : resolution(chain, value, res);
          }, function (ex) {
            resolution(chain, ex, rej);
          });
        } catch (ex) {
          resolution(chain, ex, rej);
        }

        return chain;
      }

      function Thenable(resolver) {
        this._resolver = resolver;
        this.then = then;
      }

      ;

      Thenable.resolve = function (v) {
        return Thenable.isThenable(v) ? v : {
          then: function then(resolve) {
            return resolve(v);
          }
        };
      };

      Thenable.isThenable = isThenable;
      return Thenable;
    }();

    $asyncbind.EagerThenable = $asyncbind.Thenable = ($asyncbind.EagerThenableFactory = function (tick) {
      tick = tick || typeof process === "object" && process.nextTick || typeof setImmediate === "function" && setImmediate || function (f) {
        setTimeout(f, 0);
      };

      var soon = function () {
        var fq = [],
            fqStart = 0,
            bufferSize = 1024;

        function callQueue() {
          while (fq.length - fqStart) {
            try {
              fq[fqStart]();
            } catch (ex) {}

            fq[fqStart++] = undefined;

            if (fqStart === bufferSize) {
              fq.splice(0, bufferSize);
              fqStart = 0;
            }
          }
        }

        return function (fn) {
          fq.push(fn);
          if (fq.length - fqStart === 1) tick(callQueue);
        };
      }();

      function Zousan(func) {
        if (func) {
          var me = this;
          func(function (arg) {
            me.resolve(arg);
          }, function (arg) {
            me.reject(arg);
          });
        }
      }

      Zousan.prototype = {
        resolve: function resolve(value) {
          if (this.state !== undefined) return;
          if (value === this) return this.reject(new TypeError("Attempt to resolve promise with self"));
          var me = this;

          if (value && (typeof value === "function" || typeof value === "object")) {
            try {
              var first = 0;
              var then = value.then;

              if (typeof then === "function") {
                then.call(value, function (ra) {
                  if (!first++) {
                    me.resolve(ra);
                  }
                }, function (rr) {
                  if (!first++) {
                    me.reject(rr);
                  }
                });
                return;
              }
            } catch (e) {
              if (!first) this.reject(e);
              return;
            }
          }

          this.state = STATE_FULFILLED;
          this.v = value;
          if (me.c) soon(function () {
            for (var n = 0, l = me.c.length; n < l; n++) {
              STATE_FULFILLED(me.c[n], value);
            }
          });
        },
        reject: function reject(reason) {
          if (this.state !== undefined) return;
          this.state = STATE_REJECTED;
          this.v = reason;
          var clients = this.c;
          if (clients) soon(function () {
            for (var n = 0, l = clients.length; n < l; n++) {
              STATE_REJECTED(clients[n], reason);
            }
          });
        },
        then: function then(onF, onR) {
          var p = new Zousan();
          var client = {
            y: onF,
            n: onR,
            p: p
          };

          if (this.state === undefined) {
            if (this.c) this.c.push(client);else this.c = [client];
          } else {
            var s = this.state,
                a = this.v;
            soon(function () {
              s(client, a);
            });
          }

          return p;
        }
      };

      function STATE_FULFILLED(c, arg) {
        if (typeof c.y === "function") {
          try {
            var yret = c.y.call(undefined, arg);
            c.p.resolve(yret);
          } catch (err) {
            c.p.reject(err);
          }
        } else c.p.resolve(arg);
      }

      function STATE_REJECTED(c, reason) {
        if (typeof c.n === "function") {
          try {
            var yret = c.n.call(undefined, reason);
            c.p.resolve(yret);
          } catch (err) {
            c.p.reject(err);
          }
        } else c.p.reject(reason);
      }

      Zousan.resolve = function (val) {
        if (val && val instanceof Zousan) return val;
        var z = new Zousan();
        z.resolve(val);
        return z;
      };

      Zousan.reject = function (err) {
        if (err && err instanceof Zousan) return err;
        var z = new Zousan();
        z.reject(err);
        return z;
      };

      Zousan.version = "2.3.3-nodent";
      return Zousan;
    })();
  }

  function boundThen() {
    return resolver.apply(self, arguments);
  }

  var resolver = this;

  switch (catcher) {
    case true:
      return new $asyncbind.Thenable(boundThen);

    case 0:
      return new $asyncbind.LazyThenable(boundThen);

    case undefined:
      boundThen.then = boundThen;
      return boundThen;

    default:
      return function () {
        try {
          return resolver.apply(self, arguments);
        } catch (ex) {
          return catcher(ex);
        }
      };
  }
};

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } } function _next(value) { step("next", value); } function _throw(err) { step("throw", err); } _next(); }); }; }

function defaultRoute(_x, _x2, _x3) {
  return _defaultRoute.apply(this, arguments);
}

function _defaultRoute() {
  _defaultRoute = _asyncToGenerator(function* (req, res, next) {
    var supportsManifest = req.userAgentClassifiction === 'chrome';
    var resources = req.resources;

    if (resources) {
      var linkHeaderValue = '';
      var toPush = resources.route && resources.route.js ? [resources.js, resources.route.js] : [resources.js];
      toPush.forEach(preloadResource => {
        linkHeaderValue += `<${preloadResource}>; rel=preload; as=script,`;
      });
      res.setHeader('Link', linkHeaderValue);
    }

    res.writeHead(200, {
      'Content-Type': 'text/html; charset=utf-8',
      Connection: 'Transfer-Encoding',
      'Transfer-Encoding': 'chunked',
      'Strict-Transport-Security': 'max-age=31557600; includeSubDomains; preload',
      'Timing-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Allow-Origin': '*'
    });
    var data = {};
    var listType = req.url === '/' && 'top' || req.params.type || null;

    if (listType) {
      data = yield (0, _list.serverRoute)(req, {
        type: listType
      });
    }

    res.write(`<!DOCTYPE html>
    <html lang="en">
    <head>
      <title>Preact Hacker News</title>
      <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=5" />
      ${supportsManifest ? '<meta name="theme-color" content="#0077B5" />' : ''}
      ${resources.inline !== null ? `<style>${resources.inline}</style>` : resources.css !== null ? `<link rel="stylesheet" href="${resources.css}" />` : ''}
      ${supportsManifest ? '<link rel="manifest" href="/dist/chrome/manifest.json" />' : ''}
      <link rel="icon" href="/static/icons/favicon.png">
      <script>window.seed=${JSON.stringify(data)}</script>
      <script src='${resources.js}' defer></script>
      ${resources.route && resources.route.js ? `<script src='${resources.route.js}' defer></script>` : ''}
    </head>
    <body>`);
    var RoutedViewComponent = (0, _preactRenderToString.render)((0, _preact.h)(_routedView.default, {
      url: req.url,
      delay: 0,
      child: listType ? _List.default : _Loading.default,
      data: data
    }));
    res.write(`
        ${RoutedViewComponent}
      </body>
    </html>`);
    res.end();
    next();
  });
  return _defaultRoute.apply(this, arguments);
}

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _preact = __webpack_require__(0);

var _objStr = _interopRequireDefault(__webpack_require__(11));

var _Logo = _interopRequireDefault(__webpack_require__(12));

var _styles = _interopRequireDefault(__webpack_require__(30));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Item({
  href,
  text,
  url
}) {
  var hrefRegex = href === '/' ? /(\/$|\/top)/ : new RegExp(href);
  return (0, _preact.h)("li", {
    "class": _styles.default.item
  }, (0, _preact.h)("a", {
    href: href,
    "class": (0, _objStr.default)({
      [_styles.default.link]: true,
      [_styles.default.active]: hrefRegex.test(url)
    })
  }, text));
}

class _default extends _preact.Component {
  constructor(props) {
    super(props);

    this.handleNetworkChange = () => {
      this.setState({
        online: navigator.onLine
      });
    };

    if (false) {
      this.state = {
        online: navigator.onLine
      };
    }

    if (true) {
      this.state = {
        online: true
      };
    }
  }

  shouldComponentUpdate({
    type
  }, {
    online
  }) {
    return type !== this.props.type || online !== this.state.online;
  }

  componentDidMount() {
    addEventListener('online', this.handleNetworkChange);
    addEventListener('offline', this.handleNetworkChange);
  }

  componentWillUnmount() {
    removeEventListener('online', this.handleNetworkChange);
    removeEventListener('offline', this.handleNetworkChange);
  }

  render({
    url
  }, {
    online
  }) {
    return (0, _preact.h)("nav", {
      "class": (0, _objStr.default)({
        [_styles.default.header]: true,
        [_styles.default.offline]: !online
      })
    }, (0, _preact.h)("ol", {
      "class": _styles.default.links
    }, (0, _preact.h)("li", {
      "class": _styles.default.logo
    }, (0, _preact.h)("a", {
      href: "/",
      "aria-label": "Home"
    }, (0, _preact.h)(_Logo.default, null))), (0, _preact.h)(Item, {
      href: "/",
      text: "top",
      url: url
    }), (0, _preact.h)(Item, {
      href: "/new/1",
      text: "new",
      url: url
    }), (0, _preact.h)(Item, {
      href: "/show/1",
      text: "show",
      url: url
    }), (0, _preact.h)(Item, {
      href: "/ask/1",
      text: "ask",
      url: url
    }), (0, _preact.h)(Item, {
      href: "/jobs/1",
      text: "jobs",
      url: url
    }), (0, _preact.h)(Item, {
      href: "/about",
      text: "about",
      url: url
    })));
  }

}

exports.default = _default;

/***/ }),
/* 30 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"header":"_1c59","offline":"_2zfH","links":"THY0","logo":"_1ZE0","item":"_1Uo-","link":"_3Qqt","active":"_1HhD"};

/***/ }),
/* 31 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"routeLoading":"_2lvT","showLoader":"_1UqG"};

/***/ }),
/* 32 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"mainView":"JxOJ","viewHasHeader":"_2eQT"};

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _preact = __webpack_require__(0);

var _Pagination = _interopRequireDefault(__webpack_require__(34));

var _Loading = _interopRequireDefault(__webpack_require__(6));

var _ListItem = _interopRequireDefault(__webpack_require__(36));

var _constants = __webpack_require__(8);

var _styles = _interopRequireDefault(__webpack_require__(39));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _default({
  data = null
}) {
  if (data === null) {
    return (0, _preact.h)(_Loading.default, null);
  }

  var items = data.items,
      $entities = data.$entities,
      max = data.max,
      page = data.page,
      type = data.type;
  var itemKeys = Object.keys(items);
  return (0, _preact.h)("main", {
    "class": _styles.default.list
  }, (0, _preact.h)(_Pagination.default, {
    page: page,
    maxPages: Math.ceil(max / _constants.ITEMS_PER_PAGE),
    type: type
  }), itemKeys.length === 0 && (0, _preact.h)(_Loading.default, null), itemKeys.map(itemKey => {
    var keyNumber = Number(itemKey);
    return (0, _preact.h)(_ListItem.default, {
      index: keyNumber + 1,
      entity: $entities[items[keyNumber]]
    });
  }));
}

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _preact = __webpack_require__(0);

var _objStr = _interopRequireDefault(__webpack_require__(11));

var _styles = _interopRequireDefault(__webpack_require__(35));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = ({
  page,
  maxPages,
  type
}) => (0, _preact.h)("p", {
  "class": _styles.default.pagination
}, (0, _preact.h)("a", {
  href: `/${type}/${page - 1}`,
  "class": (0, _objStr.default)({
    [_styles.default.navigate]: true,
    [_styles.default.disabled]: page <= 1
  })
}, "< prev"), (0, _preact.h)("span", {
  "class": _styles.default.pages
}, page, "/", maxPages), (0, _preact.h)("a", {
  href: `/${type}/${page + 1}`,
  "class": (0, _objStr.default)({
    [_styles.default.navigate]: true,
    [_styles.default.disabled]: page >= maxPages
  })
}, "next >"));

exports.default = _default;

/***/ }),
/* 35 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"navigate":"_3Qfk","disabled":"_3cqK","pagination":"_1kli","pages":"B-mi"};

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _preact = __webpack_require__(0);

var _time = _interopRequireDefault(__webpack_require__(37));

var _styles = _interopRequireDefault(__webpack_require__(38));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _default({
  index,
  entity
}) {
  if (!entity) return null;
  var url = entity.url,
      title = entity.title,
      points = entity.points,
      user = entity.user,
      time = entity.time,
      comments_count = entity.comments_count,
      id = entity.id;
  return (0, _preact.h)("article", {
    "class": _styles.default.article
  }, (0, _preact.h)("span", {
    "class": _styles.default.index
  }, index), (0, _preact.h)("div", {
    "class": _styles.default.metadata
  }, (0, _preact.h)("h2", null, (0, _preact.h)("a", {
    href: url,
    "class": _styles.default.outboundLink
  }, title)), (0, _preact.h)("p", null, points ? `${points} points` : null, user ? ' by ' : null, user ? (0, _preact.h)("a", {
    href: `/user/${user}`,
    "class": _styles.default.link
  }, user) : null, ` ${(0, _time.default)(time)}`, (0, _preact.h)("a", {
    href: `/item/${id}`,
    "class": _styles.default.commentCount
  }, comments_count === 0 ? 'discuss' : `${comments_count} comment${comments_count > 1 ? 's' : ''}`))));
}

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var nearest = (count, units) => {
  return `${Math.floor(count)} ${units}${count > 1 ? 's' : ''} ago`;
};

var _default = time => {
  var delta = Date.now() / 1000 - time;

  if (delta < 3600) {
    return nearest(delta / 60, 'minute');
  }

  if (delta < 86400) {
    return nearest(delta / 3600, 'hour');
  }

  return nearest(delta / 86400, 'day');
};

exports.default = _default;

/***/ }),
/* 38 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"article":"_2a9r","index":"_3y_e","outboundLink":"_3aAi","metadata":"_1dZT","link":"_2lvq","commentCount":"_3bKV"};

/***/ }),
/* 39 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"list":"_1Hhs"};

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = defaultRoute;

var _preact = __webpack_require__(0);

var _preactRenderToString = __webpack_require__(9);

var _routedView = _interopRequireDefault(__webpack_require__(10));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// UI Imports
// UI Components
function defaultRoute(req, res, next) {
  var supportsManifest = req.userAgentClassifiction === 'chrome';
  var resources = req.resources;
  res.writeHead(200, {
    'Content-Type': 'text/html; charset=utf-8',
    Connection: 'Transfer-Encoding',
    'Transfer-Encoding': 'chunked',
    'Strict-Transport-Security': 'max-age=31557600; includeSubDomains; preload',
    'Timing-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Origin': '*'
  });
  res.write(`<!DOCTYPE html>
    <html lang="en">
    <head>
      <title>Preact Hacker News</title>
      <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=5" />
      ${supportsManifest ? '<meta name="theme-color" content="#0077B5" />' : ''}
      <style>${resources.inline}</style>
      ${resources.inline === null && resources.css !== null ? '<link rel="stylesheet" href="' + resources.css + '" />' : ''}
      ${supportsManifest ? '<link rel="manifest" href="/dist/chrome/manifest.json" />' : ''}
      <link rel="icon" href="/static/icons/favicon.png">
      <script>window.seed={"uuid": localStorage.getItem('uuid')}</script>
      <script src='${resources.js}' defer></script>
    </head>
    <body>
      <div id="mount">`);
  var RoutedViewComponent = (0, _preactRenderToString.render)((0, _preact.h)(_routedView.default, {
    url: req.url,
    delay: 0
  }));
  res.write(`
        ${RoutedViewComponent}
        </div>
      </body>
    </html>`); // TODO: More research on why these scripts cannot be loaded async.

  res.end();
  next();
}

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = staticRoute;

var _path = _interopRequireDefault(__webpack_require__(2));

var _fs = _interopRequireDefault(__webpack_require__(1));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function fileValues(req, file, classification) {
  var format = req.canDecodeBrotli ? ['br', 'gzip'] : ['gzip'];
  var returnValue = {
    finalFormat: null,
    finalFile: file
  };
  format.some(formatValue => {
    var testFile = file.replace('.js', `.js.${formatValue}`);

    if (_fs.default.existsSync(_path.default.resolve('dist', classification, testFile))) {
      returnValue = {
        finalFormat: formatValue,
        finalFile: testFile
      };
      return true;
    }

    return false;
  });
  return returnValue;
}

function staticRoute(req, res, next) {
  var _req$params = req.params,
      classification = _req$params.classification,
      file = _req$params.file;

  if (['chrome', 'safari', 'firefox', 'edge', 'fallback'].indexOf(classification) >= 0) {
    var _fileValues = fileValues(req, file, classification),
        finalFormat = _fileValues.finalFormat,
        finalFile = _fileValues.finalFile;

    var resolvedPath = _path.default.resolve('dist', classification, finalFile);

    var stream = _fs.default.createReadStream(resolvedPath);

    stream.on('error', error => {
      res.writeHead(404, {
        'Content-Type': 'text/plain'
      });
      res.end('file not found');
      req.log.warn(`${resolvedPath} file not found.`);
      next();
    });
    stream.on('open', () => {
      res.writeHead(200, {
        'Content-Type': 'text/javascript',
        'Cache-Control': 'public,max-age=31536000,immutable',
        'Timing-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Origin': '*',
        'Content-Encoding': finalFormat
      });
      stream.pipe(res);
    });
    stream.on('end', () => {
      req.log.info(`${resolvedPath} file delivered.`);
      next();
    });
  } else {
    res.writeHead(404, {
      'Content-Type': 'text/plain'
    });
    res.end('file not found');
    next();
  }
}

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = staticRoute;

var _path = _interopRequireDefault(__webpack_require__(2));

var _fs = _interopRequireDefault(__webpack_require__(1));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function staticRoute(req, res, next) {
  var file = req.params.file;

  if (_fs.default.existsSync(_path.default.resolve('dist', 'server', 'static', 'icons', file))) {
    _fs.default.readFile(_path.default.resolve('dist', 'server', 'static', 'icons', file), 'binary', function (err, data) {
      res.writeHead(200, {
        'Content-Type': file.indexOf('.ico') >= 0 ? 'image/x-icon' : 'image/png',
        'Cache-Control': 'public,max-age=31536000,immutable',
        'Timing-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Origin': '*'
      });
      res.end(data, 'binary');
      next();
    });
  } else {
    res.writeHead(404);
    res.end();
    next();
  }
}

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = staticRoute;

var _path = _interopRequireDefault(__webpack_require__(2));

var _fs = _interopRequireDefault(__webpack_require__(1));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function staticRoute(req, res, next) {
  _fs.default.readFile(_path.default.resolve('dist', 'chrome', 'service-worker.js'), 'binary', function (err, data) {
    res.writeHead(200, {
      'Content-Type': 'application/javascript; charset=utf-8',
      'Timing-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Allow-Origin': '*'
    });
    res.end(data, 'binary');
    next();
  });
}

/***/ })
/******/ ]);
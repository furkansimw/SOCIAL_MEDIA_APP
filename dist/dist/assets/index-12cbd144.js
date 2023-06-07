(function () {
  const t = document.createElement("link").relList;
  if (t && t.supports && t.supports("modulepreload")) return;
  for (const i of document.querySelectorAll('link[rel="modulepreload"]')) r(i);
  new MutationObserver((i) => {
    for (const o of i)
      if (o.type === "childList")
        for (const a of o.addedNodes)
          a.tagName === "LINK" && a.rel === "modulepreload" && r(a);
  }).observe(document, { childList: !0, subtree: !0 });
  function n(i) {
    const o = {};
    return (
      i.integrity && (o.integrity = i.integrity),
      i.referrerPolicy && (o.referrerPolicy = i.referrerPolicy),
      i.crossOrigin === "use-credentials"
        ? (o.credentials = "include")
        : i.crossOrigin === "anonymous"
        ? (o.credentials = "omit")
        : (o.credentials = "same-origin"),
      o
    );
  }
  function r(i) {
    if (i.ep) return;
    i.ep = !0;
    const o = n(i);
    fetch(i.href, o);
  }
})();
function ii(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default")
    ? e.default
    : e;
}
var Nv = { exports: {} },
  Fs = {},
  Rv = { exports: {} },
  fe = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Aa = Symbol.for("react.element"),
  Vw = Symbol.for("react.portal"),
  qw = Symbol.for("react.fragment"),
  Yw = Symbol.for("react.strict_mode"),
  Xw = Symbol.for("react.profiler"),
  Kw = Symbol.for("react.provider"),
  Qw = Symbol.for("react.context"),
  Zw = Symbol.for("react.forward_ref"),
  Jw = Symbol.for("react.suspense"),
  eb = Symbol.for("react.memo"),
  tb = Symbol.for("react.lazy"),
  _m = Symbol.iterator;
function nb(e) {
  return e === null || typeof e != "object"
    ? null
    : ((e = (_m && e[_m]) || e["@@iterator"]),
      typeof e == "function" ? e : null);
}
var Lv = {
    isMounted: function () {
      return !1;
    },
    enqueueForceUpdate: function () {},
    enqueueReplaceState: function () {},
    enqueueSetState: function () {},
  },
  Mv = Object.assign,
  _v = {};
function to(e, t, n) {
  (this.props = e),
    (this.context = t),
    (this.refs = _v),
    (this.updater = n || Lv);
}
to.prototype.isReactComponent = {};
to.prototype.setState = function (e, t) {
  if (typeof e != "object" && typeof e != "function" && e != null)
    throw Error(
      "setState(...): takes an object of state variables to update or a function which returns an object of state variables."
    );
  this.updater.enqueueSetState(this, e, t, "setState");
};
to.prototype.forceUpdate = function (e) {
  this.updater.enqueueForceUpdate(this, e, "forceUpdate");
};
function $v() {}
$v.prototype = to.prototype;
function Nf(e, t, n) {
  (this.props = e),
    (this.context = t),
    (this.refs = _v),
    (this.updater = n || Lv);
}
var Rf = (Nf.prototype = new $v());
Rf.constructor = Nf;
Mv(Rf, to.prototype);
Rf.isPureReactComponent = !0;
var $m = Array.isArray,
  Bv = Object.prototype.hasOwnProperty,
  Lf = { current: null },
  zv = { key: !0, ref: !0, __self: !0, __source: !0 };
function Fv(e, t, n) {
  var r,
    i = {},
    o = null,
    a = null;
  if (t != null)
    for (r in (t.ref !== void 0 && (a = t.ref),
    t.key !== void 0 && (o = "" + t.key),
    t))
      Bv.call(t, r) && !zv.hasOwnProperty(r) && (i[r] = t[r]);
  var l = arguments.length - 2;
  if (l === 1) i.children = n;
  else if (1 < l) {
    for (var s = Array(l), u = 0; u < l; u++) s[u] = arguments[u + 2];
    i.children = s;
  }
  if (e && e.defaultProps)
    for (r in ((l = e.defaultProps), l)) i[r] === void 0 && (i[r] = l[r]);
  return {
    $$typeof: Aa,
    type: e,
    key: o,
    ref: a,
    props: i,
    _owner: Lf.current,
  };
}
function rb(e, t) {
  return {
    $$typeof: Aa,
    type: e.type,
    key: t,
    ref: e.ref,
    props: e.props,
    _owner: e._owner,
  };
}
function Mf(e) {
  return typeof e == "object" && e !== null && e.$$typeof === Aa;
}
function ib(e) {
  var t = { "=": "=0", ":": "=2" };
  return (
    "$" +
    e.replace(/[=:]/g, function (n) {
      return t[n];
    })
  );
}
var Bm = /\/+/g;
function Xu(e, t) {
  return typeof e == "object" && e !== null && e.key != null
    ? ib("" + e.key)
    : t.toString(36);
}
function Al(e, t, n, r, i) {
  var o = typeof e;
  (o === "undefined" || o === "boolean") && (e = null);
  var a = !1;
  if (e === null) a = !0;
  else
    switch (o) {
      case "string":
      case "number":
        a = !0;
        break;
      case "object":
        switch (e.$$typeof) {
          case Aa:
          case Vw:
            a = !0;
        }
    }
  if (a)
    return (
      (a = e),
      (i = i(a)),
      (e = r === "" ? "." + Xu(a, 0) : r),
      $m(i)
        ? ((n = ""),
          e != null && (n = e.replace(Bm, "$&/") + "/"),
          Al(i, t, n, "", function (u) {
            return u;
          }))
        : i != null &&
          (Mf(i) &&
            (i = rb(
              i,
              n +
                (!i.key || (a && a.key === i.key)
                  ? ""
                  : ("" + i.key).replace(Bm, "$&/") + "/") +
                e
            )),
          t.push(i)),
      1
    );
  if (((a = 0), (r = r === "" ? "." : r + ":"), $m(e)))
    for (var l = 0; l < e.length; l++) {
      o = e[l];
      var s = r + Xu(o, l);
      a += Al(o, t, n, s, i);
    }
  else if (((s = nb(e)), typeof s == "function"))
    for (e = s.call(e), l = 0; !(o = e.next()).done; )
      (o = o.value), (s = r + Xu(o, l++)), (a += Al(o, t, n, s, i));
  else if (o === "object")
    throw (
      ((t = String(e)),
      Error(
        "Objects are not valid as a React child (found: " +
          (t === "[object Object]"
            ? "object with keys {" + Object.keys(e).join(", ") + "}"
            : t) +
          "). If you meant to render a collection of children, use an array instead."
      ))
    );
  return a;
}
function el(e, t, n) {
  if (e == null) return e;
  var r = [],
    i = 0;
  return (
    Al(e, r, "", "", function (o) {
      return t.call(n, o, i++);
    }),
    r
  );
}
function ob(e) {
  if (e._status === -1) {
    var t = e._result;
    (t = t()),
      t.then(
        function (n) {
          (e._status === 0 || e._status === -1) &&
            ((e._status = 1), (e._result = n));
        },
        function (n) {
          (e._status === 0 || e._status === -1) &&
            ((e._status = 2), (e._result = n));
        }
      ),
      e._status === -1 && ((e._status = 0), (e._result = t));
  }
  if (e._status === 1) return e._result.default;
  throw e._result;
}
var yt = { current: null },
  Dl = { transition: null },
  ab = {
    ReactCurrentDispatcher: yt,
    ReactCurrentBatchConfig: Dl,
    ReactCurrentOwner: Lf,
  };
fe.Children = {
  map: el,
  forEach: function (e, t, n) {
    el(
      e,
      function () {
        t.apply(this, arguments);
      },
      n
    );
  },
  count: function (e) {
    var t = 0;
    return (
      el(e, function () {
        t++;
      }),
      t
    );
  },
  toArray: function (e) {
    return (
      el(e, function (t) {
        return t;
      }) || []
    );
  },
  only: function (e) {
    if (!Mf(e))
      throw Error(
        "React.Children.only expected to receive a single React element child."
      );
    return e;
  },
};
fe.Component = to;
fe.Fragment = qw;
fe.Profiler = Xw;
fe.PureComponent = Nf;
fe.StrictMode = Yw;
fe.Suspense = Jw;
fe.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = ab;
fe.cloneElement = function (e, t, n) {
  if (e == null)
    throw Error(
      "React.cloneElement(...): The argument must be a React element, but you passed " +
        e +
        "."
    );
  var r = Mv({}, e.props),
    i = e.key,
    o = e.ref,
    a = e._owner;
  if (t != null) {
    if (
      (t.ref !== void 0 && ((o = t.ref), (a = Lf.current)),
      t.key !== void 0 && (i = "" + t.key),
      e.type && e.type.defaultProps)
    )
      var l = e.type.defaultProps;
    for (s in t)
      Bv.call(t, s) &&
        !zv.hasOwnProperty(s) &&
        (r[s] = t[s] === void 0 && l !== void 0 ? l[s] : t[s]);
  }
  var s = arguments.length - 2;
  if (s === 1) r.children = n;
  else if (1 < s) {
    l = Array(s);
    for (var u = 0; u < s; u++) l[u] = arguments[u + 2];
    r.children = l;
  }
  return { $$typeof: Aa, type: e.type, key: i, ref: o, props: r, _owner: a };
};
fe.createContext = function (e) {
  return (
    (e = {
      $$typeof: Qw,
      _currentValue: e,
      _currentValue2: e,
      _threadCount: 0,
      Provider: null,
      Consumer: null,
      _defaultValue: null,
      _globalName: null,
    }),
    (e.Provider = { $$typeof: Kw, _context: e }),
    (e.Consumer = e)
  );
};
fe.createElement = Fv;
fe.createFactory = function (e) {
  var t = Fv.bind(null, e);
  return (t.type = e), t;
};
fe.createRef = function () {
  return { current: null };
};
fe.forwardRef = function (e) {
  return { $$typeof: Zw, render: e };
};
fe.isValidElement = Mf;
fe.lazy = function (e) {
  return { $$typeof: tb, _payload: { _status: -1, _result: e }, _init: ob };
};
fe.memo = function (e, t) {
  return { $$typeof: eb, type: e, compare: t === void 0 ? null : t };
};
fe.startTransition = function (e) {
  var t = Dl.transition;
  Dl.transition = {};
  try {
    e();
  } finally {
    Dl.transition = t;
  }
};
fe.unstable_act = function () {
  throw Error("act(...) is not supported in production builds of React.");
};
fe.useCallback = function (e, t) {
  return yt.current.useCallback(e, t);
};
fe.useContext = function (e) {
  return yt.current.useContext(e);
};
fe.useDebugValue = function () {};
fe.useDeferredValue = function (e) {
  return yt.current.useDeferredValue(e);
};
fe.useEffect = function (e, t) {
  return yt.current.useEffect(e, t);
};
fe.useId = function () {
  return yt.current.useId();
};
fe.useImperativeHandle = function (e, t, n) {
  return yt.current.useImperativeHandle(e, t, n);
};
fe.useInsertionEffect = function (e, t) {
  return yt.current.useInsertionEffect(e, t);
};
fe.useLayoutEffect = function (e, t) {
  return yt.current.useLayoutEffect(e, t);
};
fe.useMemo = function (e, t) {
  return yt.current.useMemo(e, t);
};
fe.useReducer = function (e, t, n) {
  return yt.current.useReducer(e, t, n);
};
fe.useRef = function (e) {
  return yt.current.useRef(e);
};
fe.useState = function (e) {
  return yt.current.useState(e);
};
fe.useSyncExternalStore = function (e, t, n) {
  return yt.current.useSyncExternalStore(e, t, n);
};
fe.useTransition = function () {
  return yt.current.useTransition();
};
fe.version = "18.2.0";
Rv.exports = fe;
var S = Rv.exports;
const H = ii(S);
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var lb = S,
  sb = Symbol.for("react.element"),
  ub = Symbol.for("react.fragment"),
  cb = Object.prototype.hasOwnProperty,
  db = lb.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,
  fb = { key: !0, ref: !0, __self: !0, __source: !0 };
function Uv(e, t, n) {
  var r,
    i = {},
    o = null,
    a = null;
  n !== void 0 && (o = "" + n),
    t.key !== void 0 && (o = "" + t.key),
    t.ref !== void 0 && (a = t.ref);
  for (r in t) cb.call(t, r) && !fb.hasOwnProperty(r) && (i[r] = t[r]);
  if (e && e.defaultProps)
    for (r in ((t = e.defaultProps), t)) i[r] === void 0 && (i[r] = t[r]);
  return {
    $$typeof: sb,
    type: e,
    key: o,
    ref: a,
    props: i,
    _owner: db.current,
  };
}
Fs.Fragment = ub;
Fs.jsx = Uv;
Fs.jsxs = Uv;
Nv.exports = Fs;
var p = Nv.exports,
  od = {},
  Hv = { exports: {} },
  Bt = {},
  Gv = { exports: {} },
  Wv = {};
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ (function (e) {
  function t(L, M) {
    var W = L.length;
    L.push(M);
    e: for (; 0 < W; ) {
      var K = (W - 1) >>> 1,
        $ = L[K];
      if (0 < i($, M)) (L[K] = M), (L[W] = $), (W = K);
      else break e;
    }
  }
  function n(L) {
    return L.length === 0 ? null : L[0];
  }
  function r(L) {
    if (L.length === 0) return null;
    var M = L[0],
      W = L.pop();
    if (W !== M) {
      L[0] = W;
      e: for (var K = 0, $ = L.length, _ = $ >>> 1; K < _; ) {
        var G = 2 * (K + 1) - 1,
          X = L[G],
          j = G + 1,
          ie = L[j];
        if (0 > i(X, W))
          j < $ && 0 > i(ie, X)
            ? ((L[K] = ie), (L[j] = W), (K = j))
            : ((L[K] = X), (L[G] = W), (K = G));
        else if (j < $ && 0 > i(ie, W)) (L[K] = ie), (L[j] = W), (K = j);
        else break e;
      }
    }
    return M;
  }
  function i(L, M) {
    var W = L.sortIndex - M.sortIndex;
    return W !== 0 ? W : L.id - M.id;
  }
  if (typeof performance == "object" && typeof performance.now == "function") {
    var o = performance;
    e.unstable_now = function () {
      return o.now();
    };
  } else {
    var a = Date,
      l = a.now();
    e.unstable_now = function () {
      return a.now() - l;
    };
  }
  var s = [],
    u = [],
    d = 1,
    c = null,
    f = 3,
    h = !1,
    v = !1,
    y = !1,
    w = typeof setTimeout == "function" ? setTimeout : null,
    m = typeof clearTimeout == "function" ? clearTimeout : null,
    g = typeof setImmediate < "u" ? setImmediate : null;
  typeof navigator < "u" &&
    navigator.scheduling !== void 0 &&
    navigator.scheduling.isInputPending !== void 0 &&
    navigator.scheduling.isInputPending.bind(navigator.scheduling);
  function x(L) {
    for (var M = n(u); M !== null; ) {
      if (M.callback === null) r(u);
      else if (M.startTime <= L)
        r(u), (M.sortIndex = M.expirationTime), t(s, M);
      else break;
      M = n(u);
    }
  }
  function b(L) {
    if (((y = !1), x(L), !v))
      if (n(s) !== null) (v = !0), J(C);
      else {
        var M = n(u);
        M !== null && re(b, M.startTime - L);
      }
  }
  function C(L, M) {
    (v = !1), y && ((y = !1), m(T), (T = -1)), (h = !0);
    var W = f;
    try {
      for (
        x(M), c = n(s);
        c !== null && (!(c.expirationTime > M) || (L && !D()));

      ) {
        var K = c.callback;
        if (typeof K == "function") {
          (c.callback = null), (f = c.priorityLevel);
          var $ = K(c.expirationTime <= M);
          (M = e.unstable_now()),
            typeof $ == "function" ? (c.callback = $) : c === n(s) && r(s),
            x(M);
        } else r(s);
        c = n(s);
      }
      if (c !== null) var _ = !0;
      else {
        var G = n(u);
        G !== null && re(b, G.startTime - M), (_ = !1);
      }
      return _;
    } finally {
      (c = null), (f = W), (h = !1);
    }
  }
  var E = !1,
    P = null,
    T = -1,
    I = 5,
    O = -1;
  function D() {
    return !(e.unstable_now() - O < I);
  }
  function N() {
    if (P !== null) {
      var L = e.unstable_now();
      O = L;
      var M = !0;
      try {
        M = P(!0, L);
      } finally {
        M ? A() : ((E = !1), (P = null));
      }
    } else E = !1;
  }
  var A;
  if (typeof g == "function")
    A = function () {
      g(N);
    };
  else if (typeof MessageChannel < "u") {
    var R = new MessageChannel(),
      V = R.port2;
    (R.port1.onmessage = N),
      (A = function () {
        V.postMessage(null);
      });
  } else
    A = function () {
      w(N, 0);
    };
  function J(L) {
    (P = L), E || ((E = !0), A());
  }
  function re(L, M) {
    T = w(function () {
      L(e.unstable_now());
    }, M);
  }
  (e.unstable_IdlePriority = 5),
    (e.unstable_ImmediatePriority = 1),
    (e.unstable_LowPriority = 4),
    (e.unstable_NormalPriority = 3),
    (e.unstable_Profiling = null),
    (e.unstable_UserBlockingPriority = 2),
    (e.unstable_cancelCallback = function (L) {
      L.callback = null;
    }),
    (e.unstable_continueExecution = function () {
      v || h || ((v = !0), J(C));
    }),
    (e.unstable_forceFrameRate = function (L) {
      0 > L || 125 < L
        ? console.error(
            "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
          )
        : (I = 0 < L ? Math.floor(1e3 / L) : 5);
    }),
    (e.unstable_getCurrentPriorityLevel = function () {
      return f;
    }),
    (e.unstable_getFirstCallbackNode = function () {
      return n(s);
    }),
    (e.unstable_next = function (L) {
      switch (f) {
        case 1:
        case 2:
        case 3:
          var M = 3;
          break;
        default:
          M = f;
      }
      var W = f;
      f = M;
      try {
        return L();
      } finally {
        f = W;
      }
    }),
    (e.unstable_pauseExecution = function () {}),
    (e.unstable_requestPaint = function () {}),
    (e.unstable_runWithPriority = function (L, M) {
      switch (L) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          L = 3;
      }
      var W = f;
      f = L;
      try {
        return M();
      } finally {
        f = W;
      }
    }),
    (e.unstable_scheduleCallback = function (L, M, W) {
      var K = e.unstable_now();
      switch (
        (typeof W == "object" && W !== null
          ? ((W = W.delay), (W = typeof W == "number" && 0 < W ? K + W : K))
          : (W = K),
        L)
      ) {
        case 1:
          var $ = -1;
          break;
        case 2:
          $ = 250;
          break;
        case 5:
          $ = 1073741823;
          break;
        case 4:
          $ = 1e4;
          break;
        default:
          $ = 5e3;
      }
      return (
        ($ = W + $),
        (L = {
          id: d++,
          callback: M,
          priorityLevel: L,
          startTime: W,
          expirationTime: $,
          sortIndex: -1,
        }),
        W > K
          ? ((L.sortIndex = W),
            t(u, L),
            n(s) === null &&
              L === n(u) &&
              (y ? (m(T), (T = -1)) : (y = !0), re(b, W - K)))
          : ((L.sortIndex = $), t(s, L), v || h || ((v = !0), J(C))),
        L
      );
    }),
    (e.unstable_shouldYield = D),
    (e.unstable_wrapCallback = function (L) {
      var M = f;
      return function () {
        var W = f;
        f = M;
        try {
          return L.apply(this, arguments);
        } finally {
          f = W;
        }
      };
    });
})(Wv);
Gv.exports = Wv;
var pb = Gv.exports;
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Vv = S,
  Mt = pb;
function B(e) {
  for (
    var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e, n = 1;
    n < arguments.length;
    n++
  )
    t += "&args[]=" + encodeURIComponent(arguments[n]);
  return (
    "Minified React error #" +
    e +
    "; visit " +
    t +
    " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
  );
}
var qv = new Set(),
  Yo = {};
function oi(e, t) {
  zi(e, t), zi(e + "Capture", t);
}
function zi(e, t) {
  for (Yo[e] = t, e = 0; e < t.length; e++) qv.add(t[e]);
}
var Fn = !(
    typeof window > "u" ||
    typeof window.document > "u" ||
    typeof window.document.createElement > "u"
  ),
  ad = Object.prototype.hasOwnProperty,
  mb =
    /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,
  zm = {},
  Fm = {};
function hb(e) {
  return ad.call(Fm, e)
    ? !0
    : ad.call(zm, e)
    ? !1
    : mb.test(e)
    ? (Fm[e] = !0)
    : ((zm[e] = !0), !1);
}
function gb(e, t, n, r) {
  if (n !== null && n.type === 0) return !1;
  switch (typeof t) {
    case "function":
    case "symbol":
      return !0;
    case "boolean":
      return r
        ? !1
        : n !== null
        ? !n.acceptsBooleans
        : ((e = e.toLowerCase().slice(0, 5)), e !== "data-" && e !== "aria-");
    default:
      return !1;
  }
}
function vb(e, t, n, r) {
  if (t === null || typeof t > "u" || gb(e, t, n, r)) return !0;
  if (r) return !1;
  if (n !== null)
    switch (n.type) {
      case 3:
        return !t;
      case 4:
        return t === !1;
      case 5:
        return isNaN(t);
      case 6:
        return isNaN(t) || 1 > t;
    }
  return !1;
}
function xt(e, t, n, r, i, o, a) {
  (this.acceptsBooleans = t === 2 || t === 3 || t === 4),
    (this.attributeName = r),
    (this.attributeNamespace = i),
    (this.mustUseProperty = n),
    (this.propertyName = e),
    (this.type = t),
    (this.sanitizeURL = o),
    (this.removeEmptyString = a);
}
var st = {};
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style"
  .split(" ")
  .forEach(function (e) {
    st[e] = new xt(e, 0, !1, e, null, !1, !1);
  });
[
  ["acceptCharset", "accept-charset"],
  ["className", "class"],
  ["htmlFor", "for"],
  ["httpEquiv", "http-equiv"],
].forEach(function (e) {
  var t = e[0];
  st[t] = new xt(t, 1, !1, e[1], null, !1, !1);
});
["contentEditable", "draggable", "spellCheck", "value"].forEach(function (e) {
  st[e] = new xt(e, 2, !1, e.toLowerCase(), null, !1, !1);
});
[
  "autoReverse",
  "externalResourcesRequired",
  "focusable",
  "preserveAlpha",
].forEach(function (e) {
  st[e] = new xt(e, 2, !1, e, null, !1, !1);
});
"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope"
  .split(" ")
  .forEach(function (e) {
    st[e] = new xt(e, 3, !1, e.toLowerCase(), null, !1, !1);
  });
["checked", "multiple", "muted", "selected"].forEach(function (e) {
  st[e] = new xt(e, 3, !0, e, null, !1, !1);
});
["capture", "download"].forEach(function (e) {
  st[e] = new xt(e, 4, !1, e, null, !1, !1);
});
["cols", "rows", "size", "span"].forEach(function (e) {
  st[e] = new xt(e, 6, !1, e, null, !1, !1);
});
["rowSpan", "start"].forEach(function (e) {
  st[e] = new xt(e, 5, !1, e.toLowerCase(), null, !1, !1);
});
var _f = /[\-:]([a-z])/g;
function $f(e) {
  return e[1].toUpperCase();
}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset strokeLinecap strokeLinejoin stroke-miterlimit stroke-opacity strokeWidth text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height"
  .split(" ")
  .forEach(function (e) {
    var t = e.replace(_f, $f);
    st[t] = new xt(t, 1, !1, e, null, !1, !1);
  });
"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type"
  .split(" ")
  .forEach(function (e) {
    var t = e.replace(_f, $f);
    st[t] = new xt(t, 1, !1, e, "http://www.w3.org/1999/xlink", !1, !1);
  });
["xml:base", "xml:lang", "xml:space"].forEach(function (e) {
  var t = e.replace(_f, $f);
  st[t] = new xt(t, 1, !1, e, "http://www.w3.org/XML/1998/namespace", !1, !1);
});
["tabIndex", "crossOrigin"].forEach(function (e) {
  st[e] = new xt(e, 1, !1, e.toLowerCase(), null, !1, !1);
});
st.xlinkHref = new xt(
  "xlinkHref",
  1,
  !1,
  "xlink:href",
  "http://www.w3.org/1999/xlink",
  !0,
  !1
);
["src", "href", "action", "formAction"].forEach(function (e) {
  st[e] = new xt(e, 1, !1, e.toLowerCase(), null, !0, !0);
});
function Bf(e, t, n, r) {
  var i = st.hasOwnProperty(t) ? st[t] : null;
  (i !== null
    ? i.type !== 0
    : r ||
      !(2 < t.length) ||
      (t[0] !== "o" && t[0] !== "O") ||
      (t[1] !== "n" && t[1] !== "N")) &&
    (vb(t, n, i, r) && (n = null),
    r || i === null
      ? hb(t) && (n === null ? e.removeAttribute(t) : e.setAttribute(t, "" + n))
      : i.mustUseProperty
      ? (e[i.propertyName] = n === null ? (i.type === 3 ? !1 : "") : n)
      : ((t = i.attributeName),
        (r = i.attributeNamespace),
        n === null
          ? e.removeAttribute(t)
          : ((i = i.type),
            (n = i === 3 || (i === 4 && n === !0) ? "" : "" + n),
            r ? e.setAttributeNS(r, t, n) : e.setAttribute(t, n))));
}
var Vn = Vv.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,
  tl = Symbol.for("react.element"),
  yi = Symbol.for("react.portal"),
  xi = Symbol.for("react.fragment"),
  zf = Symbol.for("react.strict_mode"),
  ld = Symbol.for("react.profiler"),
  Yv = Symbol.for("react.provider"),
  Xv = Symbol.for("react.context"),
  Ff = Symbol.for("react.forward_ref"),
  sd = Symbol.for("react.suspense"),
  ud = Symbol.for("react.suspense_list"),
  Uf = Symbol.for("react.memo"),
  Yn = Symbol.for("react.lazy"),
  Kv = Symbol.for("react.offscreen"),
  Um = Symbol.iterator;
function co(e) {
  return e === null || typeof e != "object"
    ? null
    : ((e = (Um && e[Um]) || e["@@iterator"]),
      typeof e == "function" ? e : null);
}
var ze = Object.assign,
  Ku;
function Po(e) {
  if (Ku === void 0)
    try {
      throw Error();
    } catch (n) {
      var t = n.stack.trim().match(/\n( *(at )?)/);
      Ku = (t && t[1]) || "";
    }
  return (
    `
` +
    Ku +
    e
  );
}
var Qu = !1;
function Zu(e, t) {
  if (!e || Qu) return "";
  Qu = !0;
  var n = Error.prepareStackTrace;
  Error.prepareStackTrace = void 0;
  try {
    if (t)
      if (
        ((t = function () {
          throw Error();
        }),
        Object.defineProperty(t.prototype, "props", {
          set: function () {
            throw Error();
          },
        }),
        typeof Reflect == "object" && Reflect.construct)
      ) {
        try {
          Reflect.construct(t, []);
        } catch (u) {
          var r = u;
        }
        Reflect.construct(e, [], t);
      } else {
        try {
          t.call();
        } catch (u) {
          r = u;
        }
        e.call(t.prototype);
      }
    else {
      try {
        throw Error();
      } catch (u) {
        r = u;
      }
      e();
    }
  } catch (u) {
    if (u && r && typeof u.stack == "string") {
      for (
        var i = u.stack.split(`
`),
          o = r.stack.split(`
`),
          a = i.length - 1,
          l = o.length - 1;
        1 <= a && 0 <= l && i[a] !== o[l];

      )
        l--;
      for (; 1 <= a && 0 <= l; a--, l--)
        if (i[a] !== o[l]) {
          if (a !== 1 || l !== 1)
            do
              if ((a--, l--, 0 > l || i[a] !== o[l])) {
                var s =
                  `
` + i[a].replace(" at new ", " at ");
                return (
                  e.displayName &&
                    s.includes("<anonymous>") &&
                    (s = s.replace("<anonymous>", e.displayName)),
                  s
                );
              }
            while (1 <= a && 0 <= l);
          break;
        }
    }
  } finally {
    (Qu = !1), (Error.prepareStackTrace = n);
  }
  return (e = e ? e.displayName || e.name : "") ? Po(e) : "";
}
function yb(e) {
  switch (e.tag) {
    case 5:
      return Po(e.type);
    case 16:
      return Po("Lazy");
    case 13:
      return Po("Suspense");
    case 19:
      return Po("SuspenseList");
    case 0:
    case 2:
    case 15:
      return (e = Zu(e.type, !1)), e;
    case 11:
      return (e = Zu(e.type.render, !1)), e;
    case 1:
      return (e = Zu(e.type, !0)), e;
    default:
      return "";
  }
}
function cd(e) {
  if (e == null) return null;
  if (typeof e == "function") return e.displayName || e.name || null;
  if (typeof e == "string") return e;
  switch (e) {
    case xi:
      return "Fragment";
    case yi:
      return "Portal";
    case ld:
      return "Profiler";
    case zf:
      return "StrictMode";
    case sd:
      return "Suspense";
    case ud:
      return "SuspenseList";
  }
  if (typeof e == "object")
    switch (e.$$typeof) {
      case Xv:
        return (e.displayName || "Context") + ".Consumer";
      case Yv:
        return (e._context.displayName || "Context") + ".Provider";
      case Ff:
        var t = e.render;
        return (
          (e = e.displayName),
          e ||
            ((e = t.displayName || t.name || ""),
            (e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef")),
          e
        );
      case Uf:
        return (
          (t = e.displayName || null), t !== null ? t : cd(e.type) || "Memo"
        );
      case Yn:
        (t = e._payload), (e = e._init);
        try {
          return cd(e(t));
        } catch {}
    }
  return null;
}
function xb(e) {
  var t = e.type;
  switch (e.tag) {
    case 24:
      return "Cache";
    case 9:
      return (t.displayName || "Context") + ".Consumer";
    case 10:
      return (t._context.displayName || "Context") + ".Provider";
    case 18:
      return "DehydratedFragment";
    case 11:
      return (
        (e = t.render),
        (e = e.displayName || e.name || ""),
        t.displayName || (e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef")
      );
    case 7:
      return "Fragment";
    case 5:
      return t;
    case 4:
      return "Portal";
    case 3:
      return "Root";
    case 6:
      return "Text";
    case 16:
      return cd(t);
    case 8:
      return t === zf ? "StrictMode" : "Mode";
    case 22:
      return "Offscreen";
    case 12:
      return "Profiler";
    case 21:
      return "Scope";
    case 13:
      return "Suspense";
    case 19:
      return "SuspenseList";
    case 25:
      return "TracingMarker";
    case 1:
    case 0:
    case 17:
    case 2:
    case 14:
    case 15:
      if (typeof t == "function") return t.displayName || t.name || null;
      if (typeof t == "string") return t;
  }
  return null;
}
function br(e) {
  switch (typeof e) {
    case "boolean":
    case "number":
    case "string":
    case "undefined":
      return e;
    case "object":
      return e;
    default:
      return "";
  }
}
function Qv(e) {
  var t = e.type;
  return (
    (e = e.nodeName) &&
    e.toLowerCase() === "input" &&
    (t === "checkbox" || t === "radio")
  );
}
function wb(e) {
  var t = Qv(e) ? "checked" : "value",
    n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t),
    r = "" + e[t];
  if (
    !e.hasOwnProperty(t) &&
    typeof n < "u" &&
    typeof n.get == "function" &&
    typeof n.set == "function"
  ) {
    var i = n.get,
      o = n.set;
    return (
      Object.defineProperty(e, t, {
        configurable: !0,
        get: function () {
          return i.call(this);
        },
        set: function (a) {
          (r = "" + a), o.call(this, a);
        },
      }),
      Object.defineProperty(e, t, { enumerable: n.enumerable }),
      {
        getValue: function () {
          return r;
        },
        setValue: function (a) {
          r = "" + a;
        },
        stopTracking: function () {
          (e._valueTracker = null), delete e[t];
        },
      }
    );
  }
}
function nl(e) {
  e._valueTracker || (e._valueTracker = wb(e));
}
function Zv(e) {
  if (!e) return !1;
  var t = e._valueTracker;
  if (!t) return !0;
  var n = t.getValue(),
    r = "";
  return (
    e && (r = Qv(e) ? (e.checked ? "true" : "false") : e.value),
    (e = r),
    e !== n ? (t.setValue(e), !0) : !1
  );
}
function Xl(e) {
  if (((e = e || (typeof document < "u" ? document : void 0)), typeof e > "u"))
    return null;
  try {
    return e.activeElement || e.body;
  } catch {
    return e.body;
  }
}
function dd(e, t) {
  var n = t.checked;
  return ze({}, t, {
    defaultChecked: void 0,
    defaultValue: void 0,
    value: void 0,
    checked: n ?? e._wrapperState.initialChecked,
  });
}
function Hm(e, t) {
  var n = t.defaultValue == null ? "" : t.defaultValue,
    r = t.checked != null ? t.checked : t.defaultChecked;
  (n = br(t.value != null ? t.value : n)),
    (e._wrapperState = {
      initialChecked: r,
      initialValue: n,
      controlled:
        t.type === "checkbox" || t.type === "radio"
          ? t.checked != null
          : t.value != null,
    });
}
function Jv(e, t) {
  (t = t.checked), t != null && Bf(e, "checked", t, !1);
}
function fd(e, t) {
  Jv(e, t);
  var n = br(t.value),
    r = t.type;
  if (n != null)
    r === "number"
      ? ((n === 0 && e.value === "") || e.value != n) && (e.value = "" + n)
      : e.value !== "" + n && (e.value = "" + n);
  else if (r === "submit" || r === "reset") {
    e.removeAttribute("value");
    return;
  }
  t.hasOwnProperty("value")
    ? pd(e, t.type, n)
    : t.hasOwnProperty("defaultValue") && pd(e, t.type, br(t.defaultValue)),
    t.checked == null &&
      t.defaultChecked != null &&
      (e.defaultChecked = !!t.defaultChecked);
}
function Gm(e, t, n) {
  if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
    var r = t.type;
    if (
      !(
        (r !== "submit" && r !== "reset") ||
        (t.value !== void 0 && t.value !== null)
      )
    )
      return;
    (t = "" + e._wrapperState.initialValue),
      n || t === e.value || (e.value = t),
      (e.defaultValue = t);
  }
  (n = e.name),
    n !== "" && (e.name = ""),
    (e.defaultChecked = !!e._wrapperState.initialChecked),
    n !== "" && (e.name = n);
}
function pd(e, t, n) {
  (t !== "number" || Xl(e.ownerDocument) !== e) &&
    (n == null
      ? (e.defaultValue = "" + e._wrapperState.initialValue)
      : e.defaultValue !== "" + n && (e.defaultValue = "" + n));
}
var Io = Array.isArray;
function Oi(e, t, n, r) {
  if (((e = e.options), t)) {
    t = {};
    for (var i = 0; i < n.length; i++) t["$" + n[i]] = !0;
    for (n = 0; n < e.length; n++)
      (i = t.hasOwnProperty("$" + e[n].value)),
        e[n].selected !== i && (e[n].selected = i),
        i && r && (e[n].defaultSelected = !0);
  } else {
    for (n = "" + br(n), t = null, i = 0; i < e.length; i++) {
      if (e[i].value === n) {
        (e[i].selected = !0), r && (e[i].defaultSelected = !0);
        return;
      }
      t !== null || e[i].disabled || (t = e[i]);
    }
    t !== null && (t.selected = !0);
  }
}
function md(e, t) {
  if (t.dangerouslySetInnerHTML != null) throw Error(B(91));
  return ze({}, t, {
    value: void 0,
    defaultValue: void 0,
    children: "" + e._wrapperState.initialValue,
  });
}
function Wm(e, t) {
  var n = t.value;
  if (n == null) {
    if (((n = t.children), (t = t.defaultValue), n != null)) {
      if (t != null) throw Error(B(92));
      if (Io(n)) {
        if (1 < n.length) throw Error(B(93));
        n = n[0];
      }
      t = n;
    }
    t == null && (t = ""), (n = t);
  }
  e._wrapperState = { initialValue: br(n) };
}
function e0(e, t) {
  var n = br(t.value),
    r = br(t.defaultValue);
  n != null &&
    ((n = "" + n),
    n !== e.value && (e.value = n),
    t.defaultValue == null && e.defaultValue !== n && (e.defaultValue = n)),
    r != null && (e.defaultValue = "" + r);
}
function Vm(e) {
  var t = e.textContent;
  t === e._wrapperState.initialValue && t !== "" && t !== null && (e.value = t);
}
function t0(e) {
  switch (e) {
    case "svg":
      return "http://www.w3.org/2000/svg";
    case "math":
      return "http://www.w3.org/1998/Math/MathML";
    default:
      return "http://www.w3.org/1999/xhtml";
  }
}
function hd(e, t) {
  return e == null || e === "http://www.w3.org/1999/xhtml"
    ? t0(t)
    : e === "http://www.w3.org/2000/svg" && t === "foreignObject"
    ? "http://www.w3.org/1999/xhtml"
    : e;
}
var rl,
  n0 = (function (e) {
    return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction
      ? function (t, n, r, i) {
          MSApp.execUnsafeLocalFunction(function () {
            return e(t, n, r, i);
          });
        }
      : e;
  })(function (e, t) {
    if (e.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in e)
      e.innerHTML = t;
    else {
      for (
        rl = rl || document.createElement("div"),
          rl.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>",
          t = rl.firstChild;
        e.firstChild;

      )
        e.removeChild(e.firstChild);
      for (; t.firstChild; ) e.appendChild(t.firstChild);
    }
  });
function Xo(e, t) {
  if (t) {
    var n = e.firstChild;
    if (n && n === e.lastChild && n.nodeType === 3) {
      n.nodeValue = t;
      return;
    }
  }
  e.textContent = t;
}
var No = {
    animationIterationCount: !0,
    aspectRatio: !0,
    borderImageOutset: !0,
    borderImageSlice: !0,
    borderImageWidth: !0,
    boxFlex: !0,
    boxFlexGroup: !0,
    boxOrdinalGroup: !0,
    columnCount: !0,
    columns: !0,
    flex: !0,
    flexGrow: !0,
    flexPositive: !0,
    flexShrink: !0,
    flexNegative: !0,
    flexOrder: !0,
    gridArea: !0,
    gridRow: !0,
    gridRowEnd: !0,
    gridRowSpan: !0,
    gridRowStart: !0,
    gridColumn: !0,
    gridColumnEnd: !0,
    gridColumnSpan: !0,
    gridColumnStart: !0,
    fontWeight: !0,
    lineClamp: !0,
    lineHeight: !0,
    opacity: !0,
    order: !0,
    orphans: !0,
    tabSize: !0,
    widows: !0,
    zIndex: !0,
    zoom: !0,
    fillOpacity: !0,
    floodOpacity: !0,
    stopOpacity: !0,
    strokeDasharray: !0,
    strokeDashoffset: !0,
    strokeMiterlimit: !0,
    strokeOpacity: !0,
    strokeWidth: !0,
  },
  bb = ["Webkit", "ms", "Moz", "O"];
Object.keys(No).forEach(function (e) {
  bb.forEach(function (t) {
    (t = t + e.charAt(0).toUpperCase() + e.substring(1)), (No[t] = No[e]);
  });
});
function r0(e, t, n) {
  return t == null || typeof t == "boolean" || t === ""
    ? ""
    : n || typeof t != "number" || t === 0 || (No.hasOwnProperty(e) && No[e])
    ? ("" + t).trim()
    : t + "px";
}
function i0(e, t) {
  e = e.style;
  for (var n in t)
    if (t.hasOwnProperty(n)) {
      var r = n.indexOf("--") === 0,
        i = r0(n, t[n], r);
      n === "float" && (n = "cssFloat"), r ? e.setProperty(n, i) : (e[n] = i);
    }
}
var Sb = ze(
  { menuitem: !0 },
  {
    area: !0,
    base: !0,
    br: !0,
    col: !0,
    embed: !0,
    hr: !0,
    img: !0,
    input: !0,
    keygen: !0,
    link: !0,
    meta: !0,
    param: !0,
    source: !0,
    track: !0,
    wbr: !0,
  }
);
function gd(e, t) {
  if (t) {
    if (Sb[e] && (t.children != null || t.dangerouslySetInnerHTML != null))
      throw Error(B(137, e));
    if (t.dangerouslySetInnerHTML != null) {
      if (t.children != null) throw Error(B(60));
      if (
        typeof t.dangerouslySetInnerHTML != "object" ||
        !("__html" in t.dangerouslySetInnerHTML)
      )
        throw Error(B(61));
    }
    if (t.style != null && typeof t.style != "object") throw Error(B(62));
  }
}
function vd(e, t) {
  if (e.indexOf("-") === -1) return typeof t.is == "string";
  switch (e) {
    case "annotation-xml":
    case "color-profile":
    case "font-face":
    case "font-face-src":
    case "font-face-uri":
    case "font-face-format":
    case "font-face-name":
    case "missing-glyph":
      return !1;
    default:
      return !0;
  }
}
var yd = null;
function Hf(e) {
  return (
    (e = e.target || e.srcElement || window),
    e.correspondingUseElement && (e = e.correspondingUseElement),
    e.nodeType === 3 ? e.parentNode : e
  );
}
var xd = null,
  ji = null,
  Ni = null;
function qm(e) {
  if ((e = ja(e))) {
    if (typeof xd != "function") throw Error(B(280));
    var t = e.stateNode;
    t && ((t = Vs(t)), xd(e.stateNode, e.type, t));
  }
}
function o0(e) {
  ji ? (Ni ? Ni.push(e) : (Ni = [e])) : (ji = e);
}
function a0() {
  if (ji) {
    var e = ji,
      t = Ni;
    if (((Ni = ji = null), qm(e), t)) for (e = 0; e < t.length; e++) qm(t[e]);
  }
}
function l0(e, t) {
  return e(t);
}
function s0() {}
var Ju = !1;
function u0(e, t, n) {
  if (Ju) return e(t, n);
  Ju = !0;
  try {
    return l0(e, t, n);
  } finally {
    (Ju = !1), (ji !== null || Ni !== null) && (s0(), a0());
  }
}
function Ko(e, t) {
  var n = e.stateNode;
  if (n === null) return null;
  var r = Vs(n);
  if (r === null) return null;
  n = r[t];
  e: switch (t) {
    case "onClick":
    case "onClickCapture":
    case "onDoubleClick":
    case "onDoubleClickCapture":
    case "onMouseDown":
    case "onMouseDownCapture":
    case "onMouseMove":
    case "onMouseMoveCapture":
    case "onMouseUp":
    case "onMouseUpCapture":
    case "onMouseEnter":
      (r = !r.disabled) ||
        ((e = e.type),
        (r = !(
          e === "button" ||
          e === "input" ||
          e === "select" ||
          e === "textarea"
        ))),
        (e = !r);
      break e;
    default:
      e = !1;
  }
  if (e) return null;
  if (n && typeof n != "function") throw Error(B(231, t, typeof n));
  return n;
}
var wd = !1;
if (Fn)
  try {
    var fo = {};
    Object.defineProperty(fo, "passive", {
      get: function () {
        wd = !0;
      },
    }),
      window.addEventListener("test", fo, fo),
      window.removeEventListener("test", fo, fo);
  } catch {
    wd = !1;
  }
function Cb(e, t, n, r, i, o, a, l, s) {
  var u = Array.prototype.slice.call(arguments, 3);
  try {
    t.apply(n, u);
  } catch (d) {
    this.onError(d);
  }
}
var Ro = !1,
  Kl = null,
  Ql = !1,
  bd = null,
  Eb = {
    onError: function (e) {
      (Ro = !0), (Kl = e);
    },
  };
function Tb(e, t, n, r, i, o, a, l, s) {
  (Ro = !1), (Kl = null), Cb.apply(Eb, arguments);
}
function kb(e, t, n, r, i, o, a, l, s) {
  if ((Tb.apply(this, arguments), Ro)) {
    if (Ro) {
      var u = Kl;
      (Ro = !1), (Kl = null);
    } else throw Error(B(198));
    Ql || ((Ql = !0), (bd = u));
  }
}
function ai(e) {
  var t = e,
    n = e;
  if (e.alternate) for (; t.return; ) t = t.return;
  else {
    e = t;
    do (t = e), t.flags & 4098 && (n = t.return), (e = t.return);
    while (e);
  }
  return t.tag === 3 ? n : null;
}
function c0(e) {
  if (e.tag === 13) {
    var t = e.memoizedState;
    if (
      (t === null && ((e = e.alternate), e !== null && (t = e.memoizedState)),
      t !== null)
    )
      return t.dehydrated;
  }
  return null;
}
function Ym(e) {
  if (ai(e) !== e) throw Error(B(188));
}
function Pb(e) {
  var t = e.alternate;
  if (!t) {
    if (((t = ai(e)), t === null)) throw Error(B(188));
    return t !== e ? null : e;
  }
  for (var n = e, r = t; ; ) {
    var i = n.return;
    if (i === null) break;
    var o = i.alternate;
    if (o === null) {
      if (((r = i.return), r !== null)) {
        n = r;
        continue;
      }
      break;
    }
    if (i.child === o.child) {
      for (o = i.child; o; ) {
        if (o === n) return Ym(i), e;
        if (o === r) return Ym(i), t;
        o = o.sibling;
      }
      throw Error(B(188));
    }
    if (n.return !== r.return) (n = i), (r = o);
    else {
      for (var a = !1, l = i.child; l; ) {
        if (l === n) {
          (a = !0), (n = i), (r = o);
          break;
        }
        if (l === r) {
          (a = !0), (r = i), (n = o);
          break;
        }
        l = l.sibling;
      }
      if (!a) {
        for (l = o.child; l; ) {
          if (l === n) {
            (a = !0), (n = o), (r = i);
            break;
          }
          if (l === r) {
            (a = !0), (r = o), (n = i);
            break;
          }
          l = l.sibling;
        }
        if (!a) throw Error(B(189));
      }
    }
    if (n.alternate !== r) throw Error(B(190));
  }
  if (n.tag !== 3) throw Error(B(188));
  return n.stateNode.current === n ? e : t;
}
function d0(e) {
  return (e = Pb(e)), e !== null ? f0(e) : null;
}
function f0(e) {
  if (e.tag === 5 || e.tag === 6) return e;
  for (e = e.child; e !== null; ) {
    var t = f0(e);
    if (t !== null) return t;
    e = e.sibling;
  }
  return null;
}
var p0 = Mt.unstable_scheduleCallback,
  Xm = Mt.unstable_cancelCallback,
  Ib = Mt.unstable_shouldYield,
  Ab = Mt.unstable_requestPaint,
  He = Mt.unstable_now,
  Db = Mt.unstable_getCurrentPriorityLevel,
  Gf = Mt.unstable_ImmediatePriority,
  m0 = Mt.unstable_UserBlockingPriority,
  Zl = Mt.unstable_NormalPriority,
  Ob = Mt.unstable_LowPriority,
  h0 = Mt.unstable_IdlePriority,
  Us = null,
  Pn = null;
function jb(e) {
  if (Pn && typeof Pn.onCommitFiberRoot == "function")
    try {
      Pn.onCommitFiberRoot(Us, e, void 0, (e.current.flags & 128) === 128);
    } catch {}
}
var mn = Math.clz32 ? Math.clz32 : Lb,
  Nb = Math.log,
  Rb = Math.LN2;
function Lb(e) {
  return (e >>>= 0), e === 0 ? 32 : (31 - ((Nb(e) / Rb) | 0)) | 0;
}
var il = 64,
  ol = 4194304;
function Ao(e) {
  switch (e & -e) {
    case 1:
      return 1;
    case 2:
      return 2;
    case 4:
      return 4;
    case 8:
      return 8;
    case 16:
      return 16;
    case 32:
      return 32;
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return e & 4194240;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return e & 130023424;
    case 134217728:
      return 134217728;
    case 268435456:
      return 268435456;
    case 536870912:
      return 536870912;
    case 1073741824:
      return 1073741824;
    default:
      return e;
  }
}
function Jl(e, t) {
  var n = e.pendingLanes;
  if (n === 0) return 0;
  var r = 0,
    i = e.suspendedLanes,
    o = e.pingedLanes,
    a = n & 268435455;
  if (a !== 0) {
    var l = a & ~i;
    l !== 0 ? (r = Ao(l)) : ((o &= a), o !== 0 && (r = Ao(o)));
  } else (a = n & ~i), a !== 0 ? (r = Ao(a)) : o !== 0 && (r = Ao(o));
  if (r === 0) return 0;
  if (
    t !== 0 &&
    t !== r &&
    !(t & i) &&
    ((i = r & -r), (o = t & -t), i >= o || (i === 16 && (o & 4194240) !== 0))
  )
    return t;
  if ((r & 4 && (r |= n & 16), (t = e.entangledLanes), t !== 0))
    for (e = e.entanglements, t &= r; 0 < t; )
      (n = 31 - mn(t)), (i = 1 << n), (r |= e[n]), (t &= ~i);
  return r;
}
function Mb(e, t) {
  switch (e) {
    case 1:
    case 2:
    case 4:
      return t + 250;
    case 8:
    case 16:
    case 32:
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return t + 5e3;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return -1;
    case 134217728:
    case 268435456:
    case 536870912:
    case 1073741824:
      return -1;
    default:
      return -1;
  }
}
function _b(e, t) {
  for (
    var n = e.suspendedLanes,
      r = e.pingedLanes,
      i = e.expirationTimes,
      o = e.pendingLanes;
    0 < o;

  ) {
    var a = 31 - mn(o),
      l = 1 << a,
      s = i[a];
    s === -1
      ? (!(l & n) || l & r) && (i[a] = Mb(l, t))
      : s <= t && (e.expiredLanes |= l),
      (o &= ~l);
  }
}
function Sd(e) {
  return (
    (e = e.pendingLanes & -1073741825),
    e !== 0 ? e : e & 1073741824 ? 1073741824 : 0
  );
}
function g0() {
  var e = il;
  return (il <<= 1), !(il & 4194240) && (il = 64), e;
}
function ec(e) {
  for (var t = [], n = 0; 31 > n; n++) t.push(e);
  return t;
}
function Da(e, t, n) {
  (e.pendingLanes |= t),
    t !== 536870912 && ((e.suspendedLanes = 0), (e.pingedLanes = 0)),
    (e = e.eventTimes),
    (t = 31 - mn(t)),
    (e[t] = n);
}
function $b(e, t) {
  var n = e.pendingLanes & ~t;
  (e.pendingLanes = t),
    (e.suspendedLanes = 0),
    (e.pingedLanes = 0),
    (e.expiredLanes &= t),
    (e.mutableReadLanes &= t),
    (e.entangledLanes &= t),
    (t = e.entanglements);
  var r = e.eventTimes;
  for (e = e.expirationTimes; 0 < n; ) {
    var i = 31 - mn(n),
      o = 1 << i;
    (t[i] = 0), (r[i] = -1), (e[i] = -1), (n &= ~o);
  }
}
function Wf(e, t) {
  var n = (e.entangledLanes |= t);
  for (e = e.entanglements; n; ) {
    var r = 31 - mn(n),
      i = 1 << r;
    (i & t) | (e[r] & t) && (e[r] |= t), (n &= ~i);
  }
}
var xe = 0;
function v0(e) {
  return (e &= -e), 1 < e ? (4 < e ? (e & 268435455 ? 16 : 536870912) : 4) : 1;
}
var y0,
  Vf,
  x0,
  w0,
  b0,
  Cd = !1,
  al = [],
  or = null,
  ar = null,
  lr = null,
  Qo = new Map(),
  Zo = new Map(),
  Kn = [],
  Bb =
    "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(
      " "
    );
function Km(e, t) {
  switch (e) {
    case "focusin":
    case "focusout":
      or = null;
      break;
    case "dragenter":
    case "dragleave":
      ar = null;
      break;
    case "mouseover":
    case "mouseout":
      lr = null;
      break;
    case "pointerover":
    case "pointerout":
      Qo.delete(t.pointerId);
      break;
    case "gotpointercapture":
    case "lostpointercapture":
      Zo.delete(t.pointerId);
  }
}
function po(e, t, n, r, i, o) {
  return e === null || e.nativeEvent !== o
    ? ((e = {
        blockedOn: t,
        domEventName: n,
        eventSystemFlags: r,
        nativeEvent: o,
        targetContainers: [i],
      }),
      t !== null && ((t = ja(t)), t !== null && Vf(t)),
      e)
    : ((e.eventSystemFlags |= r),
      (t = e.targetContainers),
      i !== null && t.indexOf(i) === -1 && t.push(i),
      e);
}
function zb(e, t, n, r, i) {
  switch (t) {
    case "focusin":
      return (or = po(or, e, t, n, r, i)), !0;
    case "dragenter":
      return (ar = po(ar, e, t, n, r, i)), !0;
    case "mouseover":
      return (lr = po(lr, e, t, n, r, i)), !0;
    case "pointerover":
      var o = i.pointerId;
      return Qo.set(o, po(Qo.get(o) || null, e, t, n, r, i)), !0;
    case "gotpointercapture":
      return (
        (o = i.pointerId), Zo.set(o, po(Zo.get(o) || null, e, t, n, r, i)), !0
      );
  }
  return !1;
}
function S0(e) {
  var t = zr(e.target);
  if (t !== null) {
    var n = ai(t);
    if (n !== null) {
      if (((t = n.tag), t === 13)) {
        if (((t = c0(n)), t !== null)) {
          (e.blockedOn = t),
            b0(e.priority, function () {
              x0(n);
            });
          return;
        }
      } else if (t === 3 && n.stateNode.current.memoizedState.isDehydrated) {
        e.blockedOn = n.tag === 3 ? n.stateNode.containerInfo : null;
        return;
      }
    }
  }
  e.blockedOn = null;
}
function Ol(e) {
  if (e.blockedOn !== null) return !1;
  for (var t = e.targetContainers; 0 < t.length; ) {
    var n = Ed(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
    if (n === null) {
      n = e.nativeEvent;
      var r = new n.constructor(n.type, n);
      (yd = r), n.target.dispatchEvent(r), (yd = null);
    } else return (t = ja(n)), t !== null && Vf(t), (e.blockedOn = n), !1;
    t.shift();
  }
  return !0;
}
function Qm(e, t, n) {
  Ol(e) && n.delete(t);
}
function Fb() {
  (Cd = !1),
    or !== null && Ol(or) && (or = null),
    ar !== null && Ol(ar) && (ar = null),
    lr !== null && Ol(lr) && (lr = null),
    Qo.forEach(Qm),
    Zo.forEach(Qm);
}
function mo(e, t) {
  e.blockedOn === t &&
    ((e.blockedOn = null),
    Cd ||
      ((Cd = !0),
      Mt.unstable_scheduleCallback(Mt.unstable_NormalPriority, Fb)));
}
function Jo(e) {
  function t(i) {
    return mo(i, e);
  }
  if (0 < al.length) {
    mo(al[0], e);
    for (var n = 1; n < al.length; n++) {
      var r = al[n];
      r.blockedOn === e && (r.blockedOn = null);
    }
  }
  for (
    or !== null && mo(or, e),
      ar !== null && mo(ar, e),
      lr !== null && mo(lr, e),
      Qo.forEach(t),
      Zo.forEach(t),
      n = 0;
    n < Kn.length;
    n++
  )
    (r = Kn[n]), r.blockedOn === e && (r.blockedOn = null);
  for (; 0 < Kn.length && ((n = Kn[0]), n.blockedOn === null); )
    S0(n), n.blockedOn === null && Kn.shift();
}
var Ri = Vn.ReactCurrentBatchConfig,
  es = !0;
function Ub(e, t, n, r) {
  var i = xe,
    o = Ri.transition;
  Ri.transition = null;
  try {
    (xe = 1), qf(e, t, n, r);
  } finally {
    (xe = i), (Ri.transition = o);
  }
}
function Hb(e, t, n, r) {
  var i = xe,
    o = Ri.transition;
  Ri.transition = null;
  try {
    (xe = 4), qf(e, t, n, r);
  } finally {
    (xe = i), (Ri.transition = o);
  }
}
function qf(e, t, n, r) {
  if (es) {
    var i = Ed(e, t, n, r);
    if (i === null) cc(e, t, r, ts, n), Km(e, r);
    else if (zb(i, e, t, n, r)) r.stopPropagation();
    else if ((Km(e, r), t & 4 && -1 < Bb.indexOf(e))) {
      for (; i !== null; ) {
        var o = ja(i);
        if (
          (o !== null && y0(o),
          (o = Ed(e, t, n, r)),
          o === null && cc(e, t, r, ts, n),
          o === i)
        )
          break;
        i = o;
      }
      i !== null && r.stopPropagation();
    } else cc(e, t, r, null, n);
  }
}
var ts = null;
function Ed(e, t, n, r) {
  if (((ts = null), (e = Hf(r)), (e = zr(e)), e !== null))
    if (((t = ai(e)), t === null)) e = null;
    else if (((n = t.tag), n === 13)) {
      if (((e = c0(t)), e !== null)) return e;
      e = null;
    } else if (n === 3) {
      if (t.stateNode.current.memoizedState.isDehydrated)
        return t.tag === 3 ? t.stateNode.containerInfo : null;
      e = null;
    } else t !== e && (e = null);
  return (ts = e), null;
}
function C0(e) {
  switch (e) {
    case "cancel":
    case "click":
    case "close":
    case "contextmenu":
    case "copy":
    case "cut":
    case "auxclick":
    case "dblclick":
    case "dragend":
    case "dragstart":
    case "drop":
    case "focusin":
    case "focusout":
    case "input":
    case "invalid":
    case "keydown":
    case "keypress":
    case "keyup":
    case "mousedown":
    case "mouseup":
    case "paste":
    case "pause":
    case "play":
    case "pointercancel":
    case "pointerdown":
    case "pointerup":
    case "ratechange":
    case "reset":
    case "resize":
    case "seeked":
    case "submit":
    case "touchcancel":
    case "touchend":
    case "touchstart":
    case "volumechange":
    case "change":
    case "selectionchange":
    case "textInput":
    case "compositionstart":
    case "compositionend":
    case "compositionupdate":
    case "beforeblur":
    case "afterblur":
    case "beforeinput":
    case "blur":
    case "fullscreenchange":
    case "focus":
    case "hashchange":
    case "popstate":
    case "select":
    case "selectstart":
      return 1;
    case "drag":
    case "dragenter":
    case "dragexit":
    case "dragleave":
    case "dragover":
    case "mousemove":
    case "mouseout":
    case "mouseover":
    case "pointermove":
    case "pointerout":
    case "pointerover":
    case "scroll":
    case "toggle":
    case "touchmove":
    case "wheel":
    case "mouseenter":
    case "mouseleave":
    case "pointerenter":
    case "pointerleave":
      return 4;
    case "message":
      switch (Db()) {
        case Gf:
          return 1;
        case m0:
          return 4;
        case Zl:
        case Ob:
          return 16;
        case h0:
          return 536870912;
        default:
          return 16;
      }
    default:
      return 16;
  }
}
var Jn = null,
  Yf = null,
  jl = null;
function E0() {
  if (jl) return jl;
  var e,
    t = Yf,
    n = t.length,
    r,
    i = "value" in Jn ? Jn.value : Jn.textContent,
    o = i.length;
  for (e = 0; e < n && t[e] === i[e]; e++);
  var a = n - e;
  for (r = 1; r <= a && t[n - r] === i[o - r]; r++);
  return (jl = i.slice(e, 1 < r ? 1 - r : void 0));
}
function Nl(e) {
  var t = e.keyCode;
  return (
    "charCode" in e
      ? ((e = e.charCode), e === 0 && t === 13 && (e = 13))
      : (e = t),
    e === 10 && (e = 13),
    32 <= e || e === 13 ? e : 0
  );
}
function ll() {
  return !0;
}
function Zm() {
  return !1;
}
function zt(e) {
  function t(n, r, i, o, a) {
    (this._reactName = n),
      (this._targetInst = i),
      (this.type = r),
      (this.nativeEvent = o),
      (this.target = a),
      (this.currentTarget = null);
    for (var l in e)
      e.hasOwnProperty(l) && ((n = e[l]), (this[l] = n ? n(o) : o[l]));
    return (
      (this.isDefaultPrevented = (
        o.defaultPrevented != null ? o.defaultPrevented : o.returnValue === !1
      )
        ? ll
        : Zm),
      (this.isPropagationStopped = Zm),
      this
    );
  }
  return (
    ze(t.prototype, {
      preventDefault: function () {
        this.defaultPrevented = !0;
        var n = this.nativeEvent;
        n &&
          (n.preventDefault
            ? n.preventDefault()
            : typeof n.returnValue != "unknown" && (n.returnValue = !1),
          (this.isDefaultPrevented = ll));
      },
      stopPropagation: function () {
        var n = this.nativeEvent;
        n &&
          (n.stopPropagation
            ? n.stopPropagation()
            : typeof n.cancelBubble != "unknown" && (n.cancelBubble = !0),
          (this.isPropagationStopped = ll));
      },
      persist: function () {},
      isPersistent: ll,
    }),
    t
  );
}
var no = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function (e) {
      return e.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0,
  },
  Xf = zt(no),
  Oa = ze({}, no, { view: 0, detail: 0 }),
  Gb = zt(Oa),
  tc,
  nc,
  ho,
  Hs = ze({}, Oa, {
    screenX: 0,
    screenY: 0,
    clientX: 0,
    clientY: 0,
    pageX: 0,
    pageY: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    getModifierState: Kf,
    button: 0,
    buttons: 0,
    relatedTarget: function (e) {
      return e.relatedTarget === void 0
        ? e.fromElement === e.srcElement
          ? e.toElement
          : e.fromElement
        : e.relatedTarget;
    },
    movementX: function (e) {
      return "movementX" in e
        ? e.movementX
        : (e !== ho &&
            (ho && e.type === "mousemove"
              ? ((tc = e.screenX - ho.screenX), (nc = e.screenY - ho.screenY))
              : (nc = tc = 0),
            (ho = e)),
          tc);
    },
    movementY: function (e) {
      return "movementY" in e ? e.movementY : nc;
    },
  }),
  Jm = zt(Hs),
  Wb = ze({}, Hs, { dataTransfer: 0 }),
  Vb = zt(Wb),
  qb = ze({}, Oa, { relatedTarget: 0 }),
  rc = zt(qb),
  Yb = ze({}, no, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
  Xb = zt(Yb),
  Kb = ze({}, no, {
    clipboardData: function (e) {
      return "clipboardData" in e ? e.clipboardData : window.clipboardData;
    },
  }),
  Qb = zt(Kb),
  Zb = ze({}, no, { data: 0 }),
  eh = zt(Zb),
  Jb = {
    Esc: "Escape",
    Spacebar: " ",
    Left: "ArrowLeft",
    Up: "ArrowUp",
    Right: "ArrowRight",
    Down: "ArrowDown",
    Del: "Delete",
    Win: "OS",
    Menu: "ContextMenu",
    Apps: "ContextMenu",
    Scroll: "ScrollLock",
    MozPrintableKey: "Unidentified",
  },
  eS = {
    8: "Backspace",
    9: "Tab",
    12: "Clear",
    13: "Enter",
    16: "Shift",
    17: "Control",
    18: "Alt",
    19: "Pause",
    20: "CapsLock",
    27: "Escape",
    32: " ",
    33: "PageUp",
    34: "PageDown",
    35: "End",
    36: "Home",
    37: "ArrowLeft",
    38: "ArrowUp",
    39: "ArrowRight",
    40: "ArrowDown",
    45: "Insert",
    46: "Delete",
    112: "F1",
    113: "F2",
    114: "F3",
    115: "F4",
    116: "F5",
    117: "F6",
    118: "F7",
    119: "F8",
    120: "F9",
    121: "F10",
    122: "F11",
    123: "F12",
    144: "NumLock",
    145: "ScrollLock",
    224: "Meta",
  },
  tS = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey",
  };
function nS(e) {
  var t = this.nativeEvent;
  return t.getModifierState ? t.getModifierState(e) : (e = tS[e]) ? !!t[e] : !1;
}
function Kf() {
  return nS;
}
var rS = ze({}, Oa, {
    key: function (e) {
      if (e.key) {
        var t = Jb[e.key] || e.key;
        if (t !== "Unidentified") return t;
      }
      return e.type === "keypress"
        ? ((e = Nl(e)), e === 13 ? "Enter" : String.fromCharCode(e))
        : e.type === "keydown" || e.type === "keyup"
        ? eS[e.keyCode] || "Unidentified"
        : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: Kf,
    charCode: function (e) {
      return e.type === "keypress" ? Nl(e) : 0;
    },
    keyCode: function (e) {
      return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    },
    which: function (e) {
      return e.type === "keypress"
        ? Nl(e)
        : e.type === "keydown" || e.type === "keyup"
        ? e.keyCode
        : 0;
    },
  }),
  iS = zt(rS),
  oS = ze({}, Hs, {
    pointerId: 0,
    width: 0,
    height: 0,
    pressure: 0,
    tangentialPressure: 0,
    tiltX: 0,
    tiltY: 0,
    twist: 0,
    pointerType: 0,
    isPrimary: 0,
  }),
  th = zt(oS),
  aS = ze({}, Oa, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: Kf,
  }),
  lS = zt(aS),
  sS = ze({}, no, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),
  uS = zt(sS),
  cS = ze({}, Hs, {
    deltaX: function (e) {
      return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
    },
    deltaY: function (e) {
      return "deltaY" in e
        ? e.deltaY
        : "wheelDeltaY" in e
        ? -e.wheelDeltaY
        : "wheelDelta" in e
        ? -e.wheelDelta
        : 0;
    },
    deltaZ: 0,
    deltaMode: 0,
  }),
  dS = zt(cS),
  fS = [9, 13, 27, 32],
  Qf = Fn && "CompositionEvent" in window,
  Lo = null;
Fn && "documentMode" in document && (Lo = document.documentMode);
var pS = Fn && "TextEvent" in window && !Lo,
  T0 = Fn && (!Qf || (Lo && 8 < Lo && 11 >= Lo)),
  nh = String.fromCharCode(32),
  rh = !1;
function k0(e, t) {
  switch (e) {
    case "keyup":
      return fS.indexOf(t.keyCode) !== -1;
    case "keydown":
      return t.keyCode !== 229;
    case "keypress":
    case "mousedown":
    case "focusout":
      return !0;
    default:
      return !1;
  }
}
function P0(e) {
  return (e = e.detail), typeof e == "object" && "data" in e ? e.data : null;
}
var wi = !1;
function mS(e, t) {
  switch (e) {
    case "compositionend":
      return P0(t);
    case "keypress":
      return t.which !== 32 ? null : ((rh = !0), nh);
    case "textInput":
      return (e = t.data), e === nh && rh ? null : e;
    default:
      return null;
  }
}
function hS(e, t) {
  if (wi)
    return e === "compositionend" || (!Qf && k0(e, t))
      ? ((e = E0()), (jl = Yf = Jn = null), (wi = !1), e)
      : null;
  switch (e) {
    case "paste":
      return null;
    case "keypress":
      if (!(t.ctrlKey || t.altKey || t.metaKey) || (t.ctrlKey && t.altKey)) {
        if (t.char && 1 < t.char.length) return t.char;
        if (t.which) return String.fromCharCode(t.which);
      }
      return null;
    case "compositionend":
      return T0 && t.locale !== "ko" ? null : t.data;
    default:
      return null;
  }
}
var gS = {
  color: !0,
  date: !0,
  datetime: !0,
  "datetime-local": !0,
  email: !0,
  month: !0,
  number: !0,
  password: !0,
  range: !0,
  search: !0,
  tel: !0,
  text: !0,
  time: !0,
  url: !0,
  week: !0,
};
function ih(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return t === "input" ? !!gS[e.type] : t === "textarea";
}
function I0(e, t, n, r) {
  o0(r),
    (t = ns(t, "onChange")),
    0 < t.length &&
      ((n = new Xf("onChange", "change", null, n, r)),
      e.push({ event: n, listeners: t }));
}
var Mo = null,
  ea = null;
function vS(e) {
  B0(e, 0);
}
function Gs(e) {
  var t = Ci(e);
  if (Zv(t)) return e;
}
function yS(e, t) {
  if (e === "change") return t;
}
var A0 = !1;
if (Fn) {
  var ic;
  if (Fn) {
    var oc = "oninput" in document;
    if (!oc) {
      var oh = document.createElement("div");
      oh.setAttribute("oninput", "return;"),
        (oc = typeof oh.oninput == "function");
    }
    ic = oc;
  } else ic = !1;
  A0 = ic && (!document.documentMode || 9 < document.documentMode);
}
function ah() {
  Mo && (Mo.detachEvent("onpropertychange", D0), (ea = Mo = null));
}
function D0(e) {
  if (e.propertyName === "value" && Gs(ea)) {
    var t = [];
    I0(t, ea, e, Hf(e)), u0(vS, t);
  }
}
function xS(e, t, n) {
  e === "focusin"
    ? (ah(), (Mo = t), (ea = n), Mo.attachEvent("onpropertychange", D0))
    : e === "focusout" && ah();
}
function wS(e) {
  if (e === "selectionchange" || e === "keyup" || e === "keydown")
    return Gs(ea);
}
function bS(e, t) {
  if (e === "click") return Gs(t);
}
function SS(e, t) {
  if (e === "input" || e === "change") return Gs(t);
}
function CS(e, t) {
  return (e === t && (e !== 0 || 1 / e === 1 / t)) || (e !== e && t !== t);
}
var gn = typeof Object.is == "function" ? Object.is : CS;
function ta(e, t) {
  if (gn(e, t)) return !0;
  if (typeof e != "object" || e === null || typeof t != "object" || t === null)
    return !1;
  var n = Object.keys(e),
    r = Object.keys(t);
  if (n.length !== r.length) return !1;
  for (r = 0; r < n.length; r++) {
    var i = n[r];
    if (!ad.call(t, i) || !gn(e[i], t[i])) return !1;
  }
  return !0;
}
function lh(e) {
  for (; e && e.firstChild; ) e = e.firstChild;
  return e;
}
function sh(e, t) {
  var n = lh(e);
  e = 0;
  for (var r; n; ) {
    if (n.nodeType === 3) {
      if (((r = e + n.textContent.length), e <= t && r >= t))
        return { node: n, offset: t - e };
      e = r;
    }
    e: {
      for (; n; ) {
        if (n.nextSibling) {
          n = n.nextSibling;
          break e;
        }
        n = n.parentNode;
      }
      n = void 0;
    }
    n = lh(n);
  }
}
function O0(e, t) {
  return e && t
    ? e === t
      ? !0
      : e && e.nodeType === 3
      ? !1
      : t && t.nodeType === 3
      ? O0(e, t.parentNode)
      : "contains" in e
      ? e.contains(t)
      : e.compareDocumentPosition
      ? !!(e.compareDocumentPosition(t) & 16)
      : !1
    : !1;
}
function j0() {
  for (var e = window, t = Xl(); t instanceof e.HTMLIFrameElement; ) {
    try {
      var n = typeof t.contentWindow.location.href == "string";
    } catch {
      n = !1;
    }
    if (n) e = t.contentWindow;
    else break;
    t = Xl(e.document);
  }
  return t;
}
function Zf(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return (
    t &&
    ((t === "input" &&
      (e.type === "text" ||
        e.type === "search" ||
        e.type === "tel" ||
        e.type === "url" ||
        e.type === "password")) ||
      t === "textarea" ||
      e.contentEditable === "true")
  );
}
function ES(e) {
  var t = j0(),
    n = e.focusedElem,
    r = e.selectionRange;
  if (
    t !== n &&
    n &&
    n.ownerDocument &&
    O0(n.ownerDocument.documentElement, n)
  ) {
    if (r !== null && Zf(n)) {
      if (
        ((t = r.start),
        (e = r.end),
        e === void 0 && (e = t),
        "selectionStart" in n)
      )
        (n.selectionStart = t), (n.selectionEnd = Math.min(e, n.value.length));
      else if (
        ((e = ((t = n.ownerDocument || document) && t.defaultView) || window),
        e.getSelection)
      ) {
        e = e.getSelection();
        var i = n.textContent.length,
          o = Math.min(r.start, i);
        (r = r.end === void 0 ? o : Math.min(r.end, i)),
          !e.extend && o > r && ((i = r), (r = o), (o = i)),
          (i = sh(n, o));
        var a = sh(n, r);
        i &&
          a &&
          (e.rangeCount !== 1 ||
            e.anchorNode !== i.node ||
            e.anchorOffset !== i.offset ||
            e.focusNode !== a.node ||
            e.focusOffset !== a.offset) &&
          ((t = t.createRange()),
          t.setStart(i.node, i.offset),
          e.removeAllRanges(),
          o > r
            ? (e.addRange(t), e.extend(a.node, a.offset))
            : (t.setEnd(a.node, a.offset), e.addRange(t)));
      }
    }
    for (t = [], e = n; (e = e.parentNode); )
      e.nodeType === 1 &&
        t.push({ element: e, left: e.scrollLeft, top: e.scrollTop });
    for (typeof n.focus == "function" && n.focus(), n = 0; n < t.length; n++)
      (e = t[n]),
        (e.element.scrollLeft = e.left),
        (e.element.scrollTop = e.top);
  }
}
var TS = Fn && "documentMode" in document && 11 >= document.documentMode,
  bi = null,
  Td = null,
  _o = null,
  kd = !1;
function uh(e, t, n) {
  var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
  kd ||
    bi == null ||
    bi !== Xl(r) ||
    ((r = bi),
    "selectionStart" in r && Zf(r)
      ? (r = { start: r.selectionStart, end: r.selectionEnd })
      : ((r = (
          (r.ownerDocument && r.ownerDocument.defaultView) ||
          window
        ).getSelection()),
        (r = {
          anchorNode: r.anchorNode,
          anchorOffset: r.anchorOffset,
          focusNode: r.focusNode,
          focusOffset: r.focusOffset,
        })),
    (_o && ta(_o, r)) ||
      ((_o = r),
      (r = ns(Td, "onSelect")),
      0 < r.length &&
        ((t = new Xf("onSelect", "select", null, t, n)),
        e.push({ event: t, listeners: r }),
        (t.target = bi))));
}
function sl(e, t) {
  var n = {};
  return (
    (n[e.toLowerCase()] = t.toLowerCase()),
    (n["Webkit" + e] = "webkit" + t),
    (n["Moz" + e] = "moz" + t),
    n
  );
}
var Si = {
    animationend: sl("Animation", "AnimationEnd"),
    animationiteration: sl("Animation", "AnimationIteration"),
    animationstart: sl("Animation", "AnimationStart"),
    transitionend: sl("Transition", "TransitionEnd"),
  },
  ac = {},
  N0 = {};
Fn &&
  ((N0 = document.createElement("div").style),
  "AnimationEvent" in window ||
    (delete Si.animationend.animation,
    delete Si.animationiteration.animation,
    delete Si.animationstart.animation),
  "TransitionEvent" in window || delete Si.transitionend.transition);
function Ws(e) {
  if (ac[e]) return ac[e];
  if (!Si[e]) return e;
  var t = Si[e],
    n;
  for (n in t) if (t.hasOwnProperty(n) && n in N0) return (ac[e] = t[n]);
  return e;
}
var R0 = Ws("animationend"),
  L0 = Ws("animationiteration"),
  M0 = Ws("animationstart"),
  _0 = Ws("transitionend"),
  $0 = new Map(),
  ch =
    "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
      " "
    );
function kr(e, t) {
  $0.set(e, t), oi(t, [e]);
}
for (var lc = 0; lc < ch.length; lc++) {
  var sc = ch[lc],
    kS = sc.toLowerCase(),
    PS = sc[0].toUpperCase() + sc.slice(1);
  kr(kS, "on" + PS);
}
kr(R0, "onAnimationEnd");
kr(L0, "onAnimationIteration");
kr(M0, "onAnimationStart");
kr("dblclick", "onDoubleClick");
kr("focusin", "onFocus");
kr("focusout", "onBlur");
kr(_0, "onTransitionEnd");
zi("onMouseEnter", ["mouseout", "mouseover"]);
zi("onMouseLeave", ["mouseout", "mouseover"]);
zi("onPointerEnter", ["pointerout", "pointerover"]);
zi("onPointerLeave", ["pointerout", "pointerover"]);
oi(
  "onChange",
  "change click focusin focusout input keydown keyup selectionchange".split(" ")
);
oi(
  "onSelect",
  "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
    " "
  )
);
oi("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
oi(
  "onCompositionEnd",
  "compositionend focusout keydown keypress keyup mousedown".split(" ")
);
oi(
  "onCompositionStart",
  "compositionstart focusout keydown keypress keyup mousedown".split(" ")
);
oi(
  "onCompositionUpdate",
  "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
);
var Do =
    "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
      " "
    ),
  IS = new Set("cancel close invalid load scroll toggle".split(" ").concat(Do));
function dh(e, t, n) {
  var r = e.type || "unknown-event";
  (e.currentTarget = n), kb(r, t, void 0, e), (e.currentTarget = null);
}
function B0(e, t) {
  t = (t & 4) !== 0;
  for (var n = 0; n < e.length; n++) {
    var r = e[n],
      i = r.event;
    r = r.listeners;
    e: {
      var o = void 0;
      if (t)
        for (var a = r.length - 1; 0 <= a; a--) {
          var l = r[a],
            s = l.instance,
            u = l.currentTarget;
          if (((l = l.listener), s !== o && i.isPropagationStopped())) break e;
          dh(i, l, u), (o = s);
        }
      else
        for (a = 0; a < r.length; a++) {
          if (
            ((l = r[a]),
            (s = l.instance),
            (u = l.currentTarget),
            (l = l.listener),
            s !== o && i.isPropagationStopped())
          )
            break e;
          dh(i, l, u), (o = s);
        }
    }
  }
  if (Ql) throw ((e = bd), (Ql = !1), (bd = null), e);
}
function Ae(e, t) {
  var n = t[Od];
  n === void 0 && (n = t[Od] = new Set());
  var r = e + "__bubble";
  n.has(r) || (z0(t, e, 2, !1), n.add(r));
}
function uc(e, t, n) {
  var r = 0;
  t && (r |= 4), z0(n, e, r, t);
}
var ul = "_reactListening" + Math.random().toString(36).slice(2);
function na(e) {
  if (!e[ul]) {
    (e[ul] = !0),
      qv.forEach(function (n) {
        n !== "selectionchange" && (IS.has(n) || uc(n, !1, e), uc(n, !0, e));
      });
    var t = e.nodeType === 9 ? e : e.ownerDocument;
    t === null || t[ul] || ((t[ul] = !0), uc("selectionchange", !1, t));
  }
}
function z0(e, t, n, r) {
  switch (C0(t)) {
    case 1:
      var i = Ub;
      break;
    case 4:
      i = Hb;
      break;
    default:
      i = qf;
  }
  (n = i.bind(null, t, n, e)),
    (i = void 0),
    !wd ||
      (t !== "touchstart" && t !== "touchmove" && t !== "wheel") ||
      (i = !0),
    r
      ? i !== void 0
        ? e.addEventListener(t, n, { capture: !0, passive: i })
        : e.addEventListener(t, n, !0)
      : i !== void 0
      ? e.addEventListener(t, n, { passive: i })
      : e.addEventListener(t, n, !1);
}
function cc(e, t, n, r, i) {
  var o = r;
  if (!(t & 1) && !(t & 2) && r !== null)
    e: for (;;) {
      if (r === null) return;
      var a = r.tag;
      if (a === 3 || a === 4) {
        var l = r.stateNode.containerInfo;
        if (l === i || (l.nodeType === 8 && l.parentNode === i)) break;
        if (a === 4)
          for (a = r.return; a !== null; ) {
            var s = a.tag;
            if (
              (s === 3 || s === 4) &&
              ((s = a.stateNode.containerInfo),
              s === i || (s.nodeType === 8 && s.parentNode === i))
            )
              return;
            a = a.return;
          }
        for (; l !== null; ) {
          if (((a = zr(l)), a === null)) return;
          if (((s = a.tag), s === 5 || s === 6)) {
            r = o = a;
            continue e;
          }
          l = l.parentNode;
        }
      }
      r = r.return;
    }
  u0(function () {
    var u = o,
      d = Hf(n),
      c = [];
    e: {
      var f = $0.get(e);
      if (f !== void 0) {
        var h = Xf,
          v = e;
        switch (e) {
          case "keypress":
            if (Nl(n) === 0) break e;
          case "keydown":
          case "keyup":
            h = iS;
            break;
          case "focusin":
            (v = "focus"), (h = rc);
            break;
          case "focusout":
            (v = "blur"), (h = rc);
            break;
          case "beforeblur":
          case "afterblur":
            h = rc;
            break;
          case "click":
            if (n.button === 2) break e;
          case "auxclick":
          case "dblclick":
          case "mousedown":
          case "mousemove":
          case "mouseup":
          case "mouseout":
          case "mouseover":
          case "contextmenu":
            h = Jm;
            break;
          case "drag":
          case "dragend":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "dragstart":
          case "drop":
            h = Vb;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            h = lS;
            break;
          case R0:
          case L0:
          case M0:
            h = Xb;
            break;
          case _0:
            h = uS;
            break;
          case "scroll":
            h = Gb;
            break;
          case "wheel":
            h = dS;
            break;
          case "copy":
          case "cut":
          case "paste":
            h = Qb;
            break;
          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
          case "pointerdown":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "pointerup":
            h = th;
        }
        var y = (t & 4) !== 0,
          w = !y && e === "scroll",
          m = y ? (f !== null ? f + "Capture" : null) : f;
        y = [];
        for (var g = u, x; g !== null; ) {
          x = g;
          var b = x.stateNode;
          if (
            (x.tag === 5 &&
              b !== null &&
              ((x = b),
              m !== null && ((b = Ko(g, m)), b != null && y.push(ra(g, b, x)))),
            w)
          )
            break;
          g = g.return;
        }
        0 < y.length &&
          ((f = new h(f, v, null, n, d)), c.push({ event: f, listeners: y }));
      }
    }
    if (!(t & 7)) {
      e: {
        if (
          ((f = e === "mouseover" || e === "pointerover"),
          (h = e === "mouseout" || e === "pointerout"),
          f &&
            n !== yd &&
            (v = n.relatedTarget || n.fromElement) &&
            (zr(v) || v[Un]))
        )
          break e;
        if (
          (h || f) &&
          ((f =
            d.window === d
              ? d
              : (f = d.ownerDocument)
              ? f.defaultView || f.parentWindow
              : window),
          h
            ? ((v = n.relatedTarget || n.toElement),
              (h = u),
              (v = v ? zr(v) : null),
              v !== null &&
                ((w = ai(v)), v !== w || (v.tag !== 5 && v.tag !== 6)) &&
                (v = null))
            : ((h = null), (v = u)),
          h !== v)
        ) {
          if (
            ((y = Jm),
            (b = "onMouseLeave"),
            (m = "onMouseEnter"),
            (g = "mouse"),
            (e === "pointerout" || e === "pointerover") &&
              ((y = th),
              (b = "onPointerLeave"),
              (m = "onPointerEnter"),
              (g = "pointer")),
            (w = h == null ? f : Ci(h)),
            (x = v == null ? f : Ci(v)),
            (f = new y(b, g + "leave", h, n, d)),
            (f.target = w),
            (f.relatedTarget = x),
            (b = null),
            zr(d) === u &&
              ((y = new y(m, g + "enter", v, n, d)),
              (y.target = x),
              (y.relatedTarget = w),
              (b = y)),
            (w = b),
            h && v)
          )
            t: {
              for (y = h, m = v, g = 0, x = y; x; x = pi(x)) g++;
              for (x = 0, b = m; b; b = pi(b)) x++;
              for (; 0 < g - x; ) (y = pi(y)), g--;
              for (; 0 < x - g; ) (m = pi(m)), x--;
              for (; g--; ) {
                if (y === m || (m !== null && y === m.alternate)) break t;
                (y = pi(y)), (m = pi(m));
              }
              y = null;
            }
          else y = null;
          h !== null && fh(c, f, h, y, !1),
            v !== null && w !== null && fh(c, w, v, y, !0);
        }
      }
      e: {
        if (
          ((f = u ? Ci(u) : window),
          (h = f.nodeName && f.nodeName.toLowerCase()),
          h === "select" || (h === "input" && f.type === "file"))
        )
          var C = yS;
        else if (ih(f))
          if (A0) C = SS;
          else {
            C = wS;
            var E = xS;
          }
        else
          (h = f.nodeName) &&
            h.toLowerCase() === "input" &&
            (f.type === "checkbox" || f.type === "radio") &&
            (C = bS);
        if (C && (C = C(e, u))) {
          I0(c, C, n, d);
          break e;
        }
        E && E(e, f, u),
          e === "focusout" &&
            (E = f._wrapperState) &&
            E.controlled &&
            f.type === "number" &&
            pd(f, "number", f.value);
      }
      switch (((E = u ? Ci(u) : window), e)) {
        case "focusin":
          (ih(E) || E.contentEditable === "true") &&
            ((bi = E), (Td = u), (_o = null));
          break;
        case "focusout":
          _o = Td = bi = null;
          break;
        case "mousedown":
          kd = !0;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          (kd = !1), uh(c, n, d);
          break;
        case "selectionchange":
          if (TS) break;
        case "keydown":
        case "keyup":
          uh(c, n, d);
      }
      var P;
      if (Qf)
        e: {
          switch (e) {
            case "compositionstart":
              var T = "onCompositionStart";
              break e;
            case "compositionend":
              T = "onCompositionEnd";
              break e;
            case "compositionupdate":
              T = "onCompositionUpdate";
              break e;
          }
          T = void 0;
        }
      else
        wi
          ? k0(e, n) && (T = "onCompositionEnd")
          : e === "keydown" && n.keyCode === 229 && (T = "onCompositionStart");
      T &&
        (T0 &&
          n.locale !== "ko" &&
          (wi || T !== "onCompositionStart"
            ? T === "onCompositionEnd" && wi && (P = E0())
            : ((Jn = d),
              (Yf = "value" in Jn ? Jn.value : Jn.textContent),
              (wi = !0))),
        (E = ns(u, T)),
        0 < E.length &&
          ((T = new eh(T, e, null, n, d)),
          c.push({ event: T, listeners: E }),
          P ? (T.data = P) : ((P = P0(n)), P !== null && (T.data = P)))),
        (P = pS ? mS(e, n) : hS(e, n)) &&
          ((u = ns(u, "onBeforeInput")),
          0 < u.length &&
            ((d = new eh("onBeforeInput", "beforeinput", null, n, d)),
            c.push({ event: d, listeners: u }),
            (d.data = P)));
    }
    B0(c, t);
  });
}
function ra(e, t, n) {
  return { instance: e, listener: t, currentTarget: n };
}
function ns(e, t) {
  for (var n = t + "Capture", r = []; e !== null; ) {
    var i = e,
      o = i.stateNode;
    i.tag === 5 &&
      o !== null &&
      ((i = o),
      (o = Ko(e, n)),
      o != null && r.unshift(ra(e, o, i)),
      (o = Ko(e, t)),
      o != null && r.push(ra(e, o, i))),
      (e = e.return);
  }
  return r;
}
function pi(e) {
  if (e === null) return null;
  do e = e.return;
  while (e && e.tag !== 5);
  return e || null;
}
function fh(e, t, n, r, i) {
  for (var o = t._reactName, a = []; n !== null && n !== r; ) {
    var l = n,
      s = l.alternate,
      u = l.stateNode;
    if (s !== null && s === r) break;
    l.tag === 5 &&
      u !== null &&
      ((l = u),
      i
        ? ((s = Ko(n, o)), s != null && a.unshift(ra(n, s, l)))
        : i || ((s = Ko(n, o)), s != null && a.push(ra(n, s, l)))),
      (n = n.return);
  }
  a.length !== 0 && e.push({ event: t, listeners: a });
}
var AS = /\r\n?/g,
  DS = /\u0000|\uFFFD/g;
function ph(e) {
  return (typeof e == "string" ? e : "" + e)
    .replace(
      AS,
      `
`
    )
    .replace(DS, "");
}
function cl(e, t, n) {
  if (((t = ph(t)), ph(e) !== t && n)) throw Error(B(425));
}
function rs() {}
var Pd = null,
  Id = null;
function Ad(e, t) {
  return (
    e === "textarea" ||
    e === "noscript" ||
    typeof t.children == "string" ||
    typeof t.children == "number" ||
    (typeof t.dangerouslySetInnerHTML == "object" &&
      t.dangerouslySetInnerHTML !== null &&
      t.dangerouslySetInnerHTML.__html != null)
  );
}
var Dd = typeof setTimeout == "function" ? setTimeout : void 0,
  OS = typeof clearTimeout == "function" ? clearTimeout : void 0,
  mh = typeof Promise == "function" ? Promise : void 0,
  jS =
    typeof queueMicrotask == "function"
      ? queueMicrotask
      : typeof mh < "u"
      ? function (e) {
          return mh.resolve(null).then(e).catch(NS);
        }
      : Dd;
function NS(e) {
  setTimeout(function () {
    throw e;
  });
}
function dc(e, t) {
  var n = t,
    r = 0;
  do {
    var i = n.nextSibling;
    if ((e.removeChild(n), i && i.nodeType === 8))
      if (((n = i.data), n === "/$")) {
        if (r === 0) {
          e.removeChild(i), Jo(t);
          return;
        }
        r--;
      } else (n !== "$" && n !== "$?" && n !== "$!") || r++;
    n = i;
  } while (n);
  Jo(t);
}
function sr(e) {
  for (; e != null; e = e.nextSibling) {
    var t = e.nodeType;
    if (t === 1 || t === 3) break;
    if (t === 8) {
      if (((t = e.data), t === "$" || t === "$!" || t === "$?")) break;
      if (t === "/$") return null;
    }
  }
  return e;
}
function hh(e) {
  e = e.previousSibling;
  for (var t = 0; e; ) {
    if (e.nodeType === 8) {
      var n = e.data;
      if (n === "$" || n === "$!" || n === "$?") {
        if (t === 0) return e;
        t--;
      } else n === "/$" && t++;
    }
    e = e.previousSibling;
  }
  return null;
}
var ro = Math.random().toString(36).slice(2),
  Tn = "__reactFiber$" + ro,
  ia = "__reactProps$" + ro,
  Un = "__reactContainer$" + ro,
  Od = "__reactEvents$" + ro,
  RS = "__reactListeners$" + ro,
  LS = "__reactHandles$" + ro;
function zr(e) {
  var t = e[Tn];
  if (t) return t;
  for (var n = e.parentNode; n; ) {
    if ((t = n[Un] || n[Tn])) {
      if (
        ((n = t.alternate),
        t.child !== null || (n !== null && n.child !== null))
      )
        for (e = hh(e); e !== null; ) {
          if ((n = e[Tn])) return n;
          e = hh(e);
        }
      return t;
    }
    (e = n), (n = e.parentNode);
  }
  return null;
}
function ja(e) {
  return (
    (e = e[Tn] || e[Un]),
    !e || (e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3) ? null : e
  );
}
function Ci(e) {
  if (e.tag === 5 || e.tag === 6) return e.stateNode;
  throw Error(B(33));
}
function Vs(e) {
  return e[ia] || null;
}
var jd = [],
  Ei = -1;
function Pr(e) {
  return { current: e };
}
function De(e) {
  0 > Ei || ((e.current = jd[Ei]), (jd[Ei] = null), Ei--);
}
function Te(e, t) {
  Ei++, (jd[Ei] = e.current), (e.current = t);
}
var Sr = {},
  pt = Pr(Sr),
  Et = Pr(!1),
  qr = Sr;
function Fi(e, t) {
  var n = e.type.contextTypes;
  if (!n) return Sr;
  var r = e.stateNode;
  if (r && r.__reactInternalMemoizedUnmaskedChildContext === t)
    return r.__reactInternalMemoizedMaskedChildContext;
  var i = {},
    o;
  for (o in n) i[o] = t[o];
  return (
    r &&
      ((e = e.stateNode),
      (e.__reactInternalMemoizedUnmaskedChildContext = t),
      (e.__reactInternalMemoizedMaskedChildContext = i)),
    i
  );
}
function Tt(e) {
  return (e = e.childContextTypes), e != null;
}
function is() {
  De(Et), De(pt);
}
function gh(e, t, n) {
  if (pt.current !== Sr) throw Error(B(168));
  Te(pt, t), Te(Et, n);
}
function F0(e, t, n) {
  var r = e.stateNode;
  if (((t = t.childContextTypes), typeof r.getChildContext != "function"))
    return n;
  r = r.getChildContext();
  for (var i in r) if (!(i in t)) throw Error(B(108, xb(e) || "Unknown", i));
  return ze({}, n, r);
}
function os(e) {
  return (
    (e =
      ((e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext) || Sr),
    (qr = pt.current),
    Te(pt, e),
    Te(Et, Et.current),
    !0
  );
}
function vh(e, t, n) {
  var r = e.stateNode;
  if (!r) throw Error(B(169));
  n
    ? ((e = F0(e, t, qr)),
      (r.__reactInternalMemoizedMergedChildContext = e),
      De(Et),
      De(pt),
      Te(pt, e))
    : De(Et),
    Te(Et, n);
}
var Mn = null,
  qs = !1,
  fc = !1;
function U0(e) {
  Mn === null ? (Mn = [e]) : Mn.push(e);
}
function MS(e) {
  (qs = !0), U0(e);
}
function Ir() {
  if (!fc && Mn !== null) {
    fc = !0;
    var e = 0,
      t = xe;
    try {
      var n = Mn;
      for (xe = 1; e < n.length; e++) {
        var r = n[e];
        do r = r(!0);
        while (r !== null);
      }
      (Mn = null), (qs = !1);
    } catch (i) {
      throw (Mn !== null && (Mn = Mn.slice(e + 1)), p0(Gf, Ir), i);
    } finally {
      (xe = t), (fc = !1);
    }
  }
  return null;
}
var Ti = [],
  ki = 0,
  as = null,
  ls = 0,
  qt = [],
  Yt = 0,
  Yr = null,
  _n = 1,
  $n = "";
function Rr(e, t) {
  (Ti[ki++] = ls), (Ti[ki++] = as), (as = e), (ls = t);
}
function H0(e, t, n) {
  (qt[Yt++] = _n), (qt[Yt++] = $n), (qt[Yt++] = Yr), (Yr = e);
  var r = _n;
  e = $n;
  var i = 32 - mn(r) - 1;
  (r &= ~(1 << i)), (n += 1);
  var o = 32 - mn(t) + i;
  if (30 < o) {
    var a = i - (i % 5);
    (o = (r & ((1 << a) - 1)).toString(32)),
      (r >>= a),
      (i -= a),
      (_n = (1 << (32 - mn(t) + i)) | (n << i) | r),
      ($n = o + e);
  } else (_n = (1 << o) | (n << i) | r), ($n = e);
}
function Jf(e) {
  e.return !== null && (Rr(e, 1), H0(e, 1, 0));
}
function ep(e) {
  for (; e === as; )
    (as = Ti[--ki]), (Ti[ki] = null), (ls = Ti[--ki]), (Ti[ki] = null);
  for (; e === Yr; )
    (Yr = qt[--Yt]),
      (qt[Yt] = null),
      ($n = qt[--Yt]),
      (qt[Yt] = null),
      (_n = qt[--Yt]),
      (qt[Yt] = null);
}
var Nt = null,
  Ot = null,
  Le = !1,
  cn = null;
function G0(e, t) {
  var n = Xt(5, null, null, 0);
  (n.elementType = "DELETED"),
    (n.stateNode = t),
    (n.return = e),
    (t = e.deletions),
    t === null ? ((e.deletions = [n]), (e.flags |= 16)) : t.push(n);
}
function yh(e, t) {
  switch (e.tag) {
    case 5:
      var n = e.type;
      return (
        (t =
          t.nodeType !== 1 || n.toLowerCase() !== t.nodeName.toLowerCase()
            ? null
            : t),
        t !== null
          ? ((e.stateNode = t), (Nt = e), (Ot = sr(t.firstChild)), !0)
          : !1
      );
    case 6:
      return (
        (t = e.pendingProps === "" || t.nodeType !== 3 ? null : t),
        t !== null ? ((e.stateNode = t), (Nt = e), (Ot = null), !0) : !1
      );
    case 13:
      return (
        (t = t.nodeType !== 8 ? null : t),
        t !== null
          ? ((n = Yr !== null ? { id: _n, overflow: $n } : null),
            (e.memoizedState = {
              dehydrated: t,
              treeContext: n,
              retryLane: 1073741824,
            }),
            (n = Xt(18, null, null, 0)),
            (n.stateNode = t),
            (n.return = e),
            (e.child = n),
            (Nt = e),
            (Ot = null),
            !0)
          : !1
      );
    default:
      return !1;
  }
}
function Nd(e) {
  return (e.mode & 1) !== 0 && (e.flags & 128) === 0;
}
function Rd(e) {
  if (Le) {
    var t = Ot;
    if (t) {
      var n = t;
      if (!yh(e, t)) {
        if (Nd(e)) throw Error(B(418));
        t = sr(n.nextSibling);
        var r = Nt;
        t && yh(e, t)
          ? G0(r, n)
          : ((e.flags = (e.flags & -4097) | 2), (Le = !1), (Nt = e));
      }
    } else {
      if (Nd(e)) throw Error(B(418));
      (e.flags = (e.flags & -4097) | 2), (Le = !1), (Nt = e);
    }
  }
}
function xh(e) {
  for (e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13; )
    e = e.return;
  Nt = e;
}
function dl(e) {
  if (e !== Nt) return !1;
  if (!Le) return xh(e), (Le = !0), !1;
  var t;
  if (
    ((t = e.tag !== 3) &&
      !(t = e.tag !== 5) &&
      ((t = e.type),
      (t = t !== "head" && t !== "body" && !Ad(e.type, e.memoizedProps))),
    t && (t = Ot))
  ) {
    if (Nd(e)) throw (W0(), Error(B(418)));
    for (; t; ) G0(e, t), (t = sr(t.nextSibling));
  }
  if ((xh(e), e.tag === 13)) {
    if (((e = e.memoizedState), (e = e !== null ? e.dehydrated : null), !e))
      throw Error(B(317));
    e: {
      for (e = e.nextSibling, t = 0; e; ) {
        if (e.nodeType === 8) {
          var n = e.data;
          if (n === "/$") {
            if (t === 0) {
              Ot = sr(e.nextSibling);
              break e;
            }
            t--;
          } else (n !== "$" && n !== "$!" && n !== "$?") || t++;
        }
        e = e.nextSibling;
      }
      Ot = null;
    }
  } else Ot = Nt ? sr(e.stateNode.nextSibling) : null;
  return !0;
}
function W0() {
  for (var e = Ot; e; ) e = sr(e.nextSibling);
}
function Ui() {
  (Ot = Nt = null), (Le = !1);
}
function tp(e) {
  cn === null ? (cn = [e]) : cn.push(e);
}
var _S = Vn.ReactCurrentBatchConfig;
function sn(e, t) {
  if (e && e.defaultProps) {
    (t = ze({}, t)), (e = e.defaultProps);
    for (var n in e) t[n] === void 0 && (t[n] = e[n]);
    return t;
  }
  return t;
}
var ss = Pr(null),
  us = null,
  Pi = null,
  np = null;
function rp() {
  np = Pi = us = null;
}
function ip(e) {
  var t = ss.current;
  De(ss), (e._currentValue = t);
}
function Ld(e, t, n) {
  for (; e !== null; ) {
    var r = e.alternate;
    if (
      ((e.childLanes & t) !== t
        ? ((e.childLanes |= t), r !== null && (r.childLanes |= t))
        : r !== null && (r.childLanes & t) !== t && (r.childLanes |= t),
      e === n)
    )
      break;
    e = e.return;
  }
}
function Li(e, t) {
  (us = e),
    (np = Pi = null),
    (e = e.dependencies),
    e !== null &&
      e.firstContext !== null &&
      (e.lanes & t && (St = !0), (e.firstContext = null));
}
function Jt(e) {
  var t = e._currentValue;
  if (np !== e)
    if (((e = { context: e, memoizedValue: t, next: null }), Pi === null)) {
      if (us === null) throw Error(B(308));
      (Pi = e), (us.dependencies = { lanes: 0, firstContext: e });
    } else Pi = Pi.next = e;
  return t;
}
var Fr = null;
function op(e) {
  Fr === null ? (Fr = [e]) : Fr.push(e);
}
function V0(e, t, n, r) {
  var i = t.interleaved;
  return (
    i === null ? ((n.next = n), op(t)) : ((n.next = i.next), (i.next = n)),
    (t.interleaved = n),
    Hn(e, r)
  );
}
function Hn(e, t) {
  e.lanes |= t;
  var n = e.alternate;
  for (n !== null && (n.lanes |= t), n = e, e = e.return; e !== null; )
    (e.childLanes |= t),
      (n = e.alternate),
      n !== null && (n.childLanes |= t),
      (n = e),
      (e = e.return);
  return n.tag === 3 ? n.stateNode : null;
}
var Xn = !1;
function ap(e) {
  e.updateQueue = {
    baseState: e.memoizedState,
    firstBaseUpdate: null,
    lastBaseUpdate: null,
    shared: { pending: null, interleaved: null, lanes: 0 },
    effects: null,
  };
}
function q0(e, t) {
  (e = e.updateQueue),
    t.updateQueue === e &&
      (t.updateQueue = {
        baseState: e.baseState,
        firstBaseUpdate: e.firstBaseUpdate,
        lastBaseUpdate: e.lastBaseUpdate,
        shared: e.shared,
        effects: e.effects,
      });
}
function zn(e, t) {
  return {
    eventTime: e,
    lane: t,
    tag: 0,
    payload: null,
    callback: null,
    next: null,
  };
}
function ur(e, t, n) {
  var r = e.updateQueue;
  if (r === null) return null;
  if (((r = r.shared), he & 2)) {
    var i = r.pending;
    return (
      i === null ? (t.next = t) : ((t.next = i.next), (i.next = t)),
      (r.pending = t),
      Hn(e, n)
    );
  }
  return (
    (i = r.interleaved),
    i === null ? ((t.next = t), op(r)) : ((t.next = i.next), (i.next = t)),
    (r.interleaved = t),
    Hn(e, n)
  );
}
function Rl(e, t, n) {
  if (
    ((t = t.updateQueue), t !== null && ((t = t.shared), (n & 4194240) !== 0))
  ) {
    var r = t.lanes;
    (r &= e.pendingLanes), (n |= r), (t.lanes = n), Wf(e, n);
  }
}
function wh(e, t) {
  var n = e.updateQueue,
    r = e.alternate;
  if (r !== null && ((r = r.updateQueue), n === r)) {
    var i = null,
      o = null;
    if (((n = n.firstBaseUpdate), n !== null)) {
      do {
        var a = {
          eventTime: n.eventTime,
          lane: n.lane,
          tag: n.tag,
          payload: n.payload,
          callback: n.callback,
          next: null,
        };
        o === null ? (i = o = a) : (o = o.next = a), (n = n.next);
      } while (n !== null);
      o === null ? (i = o = t) : (o = o.next = t);
    } else i = o = t;
    (n = {
      baseState: r.baseState,
      firstBaseUpdate: i,
      lastBaseUpdate: o,
      shared: r.shared,
      effects: r.effects,
    }),
      (e.updateQueue = n);
    return;
  }
  (e = n.lastBaseUpdate),
    e === null ? (n.firstBaseUpdate = t) : (e.next = t),
    (n.lastBaseUpdate = t);
}
function cs(e, t, n, r) {
  var i = e.updateQueue;
  Xn = !1;
  var o = i.firstBaseUpdate,
    a = i.lastBaseUpdate,
    l = i.shared.pending;
  if (l !== null) {
    i.shared.pending = null;
    var s = l,
      u = s.next;
    (s.next = null), a === null ? (o = u) : (a.next = u), (a = s);
    var d = e.alternate;
    d !== null &&
      ((d = d.updateQueue),
      (l = d.lastBaseUpdate),
      l !== a &&
        (l === null ? (d.firstBaseUpdate = u) : (l.next = u),
        (d.lastBaseUpdate = s)));
  }
  if (o !== null) {
    var c = i.baseState;
    (a = 0), (d = u = s = null), (l = o);
    do {
      var f = l.lane,
        h = l.eventTime;
      if ((r & f) === f) {
        d !== null &&
          (d = d.next =
            {
              eventTime: h,
              lane: 0,
              tag: l.tag,
              payload: l.payload,
              callback: l.callback,
              next: null,
            });
        e: {
          var v = e,
            y = l;
          switch (((f = t), (h = n), y.tag)) {
            case 1:
              if (((v = y.payload), typeof v == "function")) {
                c = v.call(h, c, f);
                break e;
              }
              c = v;
              break e;
            case 3:
              v.flags = (v.flags & -65537) | 128;
            case 0:
              if (
                ((v = y.payload),
                (f = typeof v == "function" ? v.call(h, c, f) : v),
                f == null)
              )
                break e;
              c = ze({}, c, f);
              break e;
            case 2:
              Xn = !0;
          }
        }
        l.callback !== null &&
          l.lane !== 0 &&
          ((e.flags |= 64),
          (f = i.effects),
          f === null ? (i.effects = [l]) : f.push(l));
      } else
        (h = {
          eventTime: h,
          lane: f,
          tag: l.tag,
          payload: l.payload,
          callback: l.callback,
          next: null,
        }),
          d === null ? ((u = d = h), (s = c)) : (d = d.next = h),
          (a |= f);
      if (((l = l.next), l === null)) {
        if (((l = i.shared.pending), l === null)) break;
        (f = l),
          (l = f.next),
          (f.next = null),
          (i.lastBaseUpdate = f),
          (i.shared.pending = null);
      }
    } while (1);
    if (
      (d === null && (s = c),
      (i.baseState = s),
      (i.firstBaseUpdate = u),
      (i.lastBaseUpdate = d),
      (t = i.shared.interleaved),
      t !== null)
    ) {
      i = t;
      do (a |= i.lane), (i = i.next);
      while (i !== t);
    } else o === null && (i.shared.lanes = 0);
    (Kr |= a), (e.lanes = a), (e.memoizedState = c);
  }
}
function bh(e, t, n) {
  if (((e = t.effects), (t.effects = null), e !== null))
    for (t = 0; t < e.length; t++) {
      var r = e[t],
        i = r.callback;
      if (i !== null) {
        if (((r.callback = null), (r = n), typeof i != "function"))
          throw Error(B(191, i));
        i.call(r);
      }
    }
}
var Y0 = new Vv.Component().refs;
function Md(e, t, n, r) {
  (t = e.memoizedState),
    (n = n(r, t)),
    (n = n == null ? t : ze({}, t, n)),
    (e.memoizedState = n),
    e.lanes === 0 && (e.updateQueue.baseState = n);
}
var Ys = {
  isMounted: function (e) {
    return (e = e._reactInternals) ? ai(e) === e : !1;
  },
  enqueueSetState: function (e, t, n) {
    e = e._reactInternals;
    var r = gt(),
      i = dr(e),
      o = zn(r, i);
    (o.payload = t),
      n != null && (o.callback = n),
      (t = ur(e, o, i)),
      t !== null && (hn(t, e, i, r), Rl(t, e, i));
  },
  enqueueReplaceState: function (e, t, n) {
    e = e._reactInternals;
    var r = gt(),
      i = dr(e),
      o = zn(r, i);
    (o.tag = 1),
      (o.payload = t),
      n != null && (o.callback = n),
      (t = ur(e, o, i)),
      t !== null && (hn(t, e, i, r), Rl(t, e, i));
  },
  enqueueForceUpdate: function (e, t) {
    e = e._reactInternals;
    var n = gt(),
      r = dr(e),
      i = zn(n, r);
    (i.tag = 2),
      t != null && (i.callback = t),
      (t = ur(e, i, r)),
      t !== null && (hn(t, e, r, n), Rl(t, e, r));
  },
};
function Sh(e, t, n, r, i, o, a) {
  return (
    (e = e.stateNode),
    typeof e.shouldComponentUpdate == "function"
      ? e.shouldComponentUpdate(r, o, a)
      : t.prototype && t.prototype.isPureReactComponent
      ? !ta(n, r) || !ta(i, o)
      : !0
  );
}
function X0(e, t, n) {
  var r = !1,
    i = Sr,
    o = t.contextType;
  return (
    typeof o == "object" && o !== null
      ? (o = Jt(o))
      : ((i = Tt(t) ? qr : pt.current),
        (r = t.contextTypes),
        (o = (r = r != null) ? Fi(e, i) : Sr)),
    (t = new t(n, o)),
    (e.memoizedState = t.state !== null && t.state !== void 0 ? t.state : null),
    (t.updater = Ys),
    (e.stateNode = t),
    (t._reactInternals = e),
    r &&
      ((e = e.stateNode),
      (e.__reactInternalMemoizedUnmaskedChildContext = i),
      (e.__reactInternalMemoizedMaskedChildContext = o)),
    t
  );
}
function Ch(e, t, n, r) {
  (e = t.state),
    typeof t.componentWillReceiveProps == "function" &&
      t.componentWillReceiveProps(n, r),
    typeof t.UNSAFE_componentWillReceiveProps == "function" &&
      t.UNSAFE_componentWillReceiveProps(n, r),
    t.state !== e && Ys.enqueueReplaceState(t, t.state, null);
}
function _d(e, t, n, r) {
  var i = e.stateNode;
  (i.props = n), (i.state = e.memoizedState), (i.refs = Y0), ap(e);
  var o = t.contextType;
  typeof o == "object" && o !== null
    ? (i.context = Jt(o))
    : ((o = Tt(t) ? qr : pt.current), (i.context = Fi(e, o))),
    (i.state = e.memoizedState),
    (o = t.getDerivedStateFromProps),
    typeof o == "function" && (Md(e, t, o, n), (i.state = e.memoizedState)),
    typeof t.getDerivedStateFromProps == "function" ||
      typeof i.getSnapshotBeforeUpdate == "function" ||
      (typeof i.UNSAFE_componentWillMount != "function" &&
        typeof i.componentWillMount != "function") ||
      ((t = i.state),
      typeof i.componentWillMount == "function" && i.componentWillMount(),
      typeof i.UNSAFE_componentWillMount == "function" &&
        i.UNSAFE_componentWillMount(),
      t !== i.state && Ys.enqueueReplaceState(i, i.state, null),
      cs(e, n, i, r),
      (i.state = e.memoizedState)),
    typeof i.componentDidMount == "function" && (e.flags |= 4194308);
}
function go(e, t, n) {
  if (
    ((e = n.ref), e !== null && typeof e != "function" && typeof e != "object")
  ) {
    if (n._owner) {
      if (((n = n._owner), n)) {
        if (n.tag !== 1) throw Error(B(309));
        var r = n.stateNode;
      }
      if (!r) throw Error(B(147, e));
      var i = r,
        o = "" + e;
      return t !== null &&
        t.ref !== null &&
        typeof t.ref == "function" &&
        t.ref._stringRef === o
        ? t.ref
        : ((t = function (a) {
            var l = i.refs;
            l === Y0 && (l = i.refs = {}),
              a === null ? delete l[o] : (l[o] = a);
          }),
          (t._stringRef = o),
          t);
    }
    if (typeof e != "string") throw Error(B(284));
    if (!n._owner) throw Error(B(290, e));
  }
  return e;
}
function fl(e, t) {
  throw (
    ((e = Object.prototype.toString.call(t)),
    Error(
      B(
        31,
        e === "[object Object]"
          ? "object with keys {" + Object.keys(t).join(", ") + "}"
          : e
      )
    ))
  );
}
function Eh(e) {
  var t = e._init;
  return t(e._payload);
}
function K0(e) {
  function t(m, g) {
    if (e) {
      var x = m.deletions;
      x === null ? ((m.deletions = [g]), (m.flags |= 16)) : x.push(g);
    }
  }
  function n(m, g) {
    if (!e) return null;
    for (; g !== null; ) t(m, g), (g = g.sibling);
    return null;
  }
  function r(m, g) {
    for (m = new Map(); g !== null; )
      g.key !== null ? m.set(g.key, g) : m.set(g.index, g), (g = g.sibling);
    return m;
  }
  function i(m, g) {
    return (m = fr(m, g)), (m.index = 0), (m.sibling = null), m;
  }
  function o(m, g, x) {
    return (
      (m.index = x),
      e
        ? ((x = m.alternate),
          x !== null
            ? ((x = x.index), x < g ? ((m.flags |= 2), g) : x)
            : ((m.flags |= 2), g))
        : ((m.flags |= 1048576), g)
    );
  }
  function a(m) {
    return e && m.alternate === null && (m.flags |= 2), m;
  }
  function l(m, g, x, b) {
    return g === null || g.tag !== 6
      ? ((g = xc(x, m.mode, b)), (g.return = m), g)
      : ((g = i(g, x)), (g.return = m), g);
  }
  function s(m, g, x, b) {
    var C = x.type;
    return C === xi
      ? d(m, g, x.props.children, b, x.key)
      : g !== null &&
        (g.elementType === C ||
          (typeof C == "object" &&
            C !== null &&
            C.$$typeof === Yn &&
            Eh(C) === g.type))
      ? ((b = i(g, x.props)), (b.ref = go(m, g, x)), (b.return = m), b)
      : ((b = zl(x.type, x.key, x.props, null, m.mode, b)),
        (b.ref = go(m, g, x)),
        (b.return = m),
        b);
  }
  function u(m, g, x, b) {
    return g === null ||
      g.tag !== 4 ||
      g.stateNode.containerInfo !== x.containerInfo ||
      g.stateNode.implementation !== x.implementation
      ? ((g = wc(x, m.mode, b)), (g.return = m), g)
      : ((g = i(g, x.children || [])), (g.return = m), g);
  }
  function d(m, g, x, b, C) {
    return g === null || g.tag !== 7
      ? ((g = Gr(x, m.mode, b, C)), (g.return = m), g)
      : ((g = i(g, x)), (g.return = m), g);
  }
  function c(m, g, x) {
    if ((typeof g == "string" && g !== "") || typeof g == "number")
      return (g = xc("" + g, m.mode, x)), (g.return = m), g;
    if (typeof g == "object" && g !== null) {
      switch (g.$$typeof) {
        case tl:
          return (
            (x = zl(g.type, g.key, g.props, null, m.mode, x)),
            (x.ref = go(m, null, g)),
            (x.return = m),
            x
          );
        case yi:
          return (g = wc(g, m.mode, x)), (g.return = m), g;
        case Yn:
          var b = g._init;
          return c(m, b(g._payload), x);
      }
      if (Io(g) || co(g))
        return (g = Gr(g, m.mode, x, null)), (g.return = m), g;
      fl(m, g);
    }
    return null;
  }
  function f(m, g, x, b) {
    var C = g !== null ? g.key : null;
    if ((typeof x == "string" && x !== "") || typeof x == "number")
      return C !== null ? null : l(m, g, "" + x, b);
    if (typeof x == "object" && x !== null) {
      switch (x.$$typeof) {
        case tl:
          return x.key === C ? s(m, g, x, b) : null;
        case yi:
          return x.key === C ? u(m, g, x, b) : null;
        case Yn:
          return (C = x._init), f(m, g, C(x._payload), b);
      }
      if (Io(x) || co(x)) return C !== null ? null : d(m, g, x, b, null);
      fl(m, x);
    }
    return null;
  }
  function h(m, g, x, b, C) {
    if ((typeof b == "string" && b !== "") || typeof b == "number")
      return (m = m.get(x) || null), l(g, m, "" + b, C);
    if (typeof b == "object" && b !== null) {
      switch (b.$$typeof) {
        case tl:
          return (m = m.get(b.key === null ? x : b.key) || null), s(g, m, b, C);
        case yi:
          return (m = m.get(b.key === null ? x : b.key) || null), u(g, m, b, C);
        case Yn:
          var E = b._init;
          return h(m, g, x, E(b._payload), C);
      }
      if (Io(b) || co(b)) return (m = m.get(x) || null), d(g, m, b, C, null);
      fl(g, b);
    }
    return null;
  }
  function v(m, g, x, b) {
    for (
      var C = null, E = null, P = g, T = (g = 0), I = null;
      P !== null && T < x.length;
      T++
    ) {
      P.index > T ? ((I = P), (P = null)) : (I = P.sibling);
      var O = f(m, P, x[T], b);
      if (O === null) {
        P === null && (P = I);
        break;
      }
      e && P && O.alternate === null && t(m, P),
        (g = o(O, g, T)),
        E === null ? (C = O) : (E.sibling = O),
        (E = O),
        (P = I);
    }
    if (T === x.length) return n(m, P), Le && Rr(m, T), C;
    if (P === null) {
      for (; T < x.length; T++)
        (P = c(m, x[T], b)),
          P !== null &&
            ((g = o(P, g, T)), E === null ? (C = P) : (E.sibling = P), (E = P));
      return Le && Rr(m, T), C;
    }
    for (P = r(m, P); T < x.length; T++)
      (I = h(P, m, T, x[T], b)),
        I !== null &&
          (e && I.alternate !== null && P.delete(I.key === null ? T : I.key),
          (g = o(I, g, T)),
          E === null ? (C = I) : (E.sibling = I),
          (E = I));
    return (
      e &&
        P.forEach(function (D) {
          return t(m, D);
        }),
      Le && Rr(m, T),
      C
    );
  }
  function y(m, g, x, b) {
    var C = co(x);
    if (typeof C != "function") throw Error(B(150));
    if (((x = C.call(x)), x == null)) throw Error(B(151));
    for (
      var E = (C = null), P = g, T = (g = 0), I = null, O = x.next();
      P !== null && !O.done;
      T++, O = x.next()
    ) {
      P.index > T ? ((I = P), (P = null)) : (I = P.sibling);
      var D = f(m, P, O.value, b);
      if (D === null) {
        P === null && (P = I);
        break;
      }
      e && P && D.alternate === null && t(m, P),
        (g = o(D, g, T)),
        E === null ? (C = D) : (E.sibling = D),
        (E = D),
        (P = I);
    }
    if (O.done) return n(m, P), Le && Rr(m, T), C;
    if (P === null) {
      for (; !O.done; T++, O = x.next())
        (O = c(m, O.value, b)),
          O !== null &&
            ((g = o(O, g, T)), E === null ? (C = O) : (E.sibling = O), (E = O));
      return Le && Rr(m, T), C;
    }
    for (P = r(m, P); !O.done; T++, O = x.next())
      (O = h(P, m, T, O.value, b)),
        O !== null &&
          (e && O.alternate !== null && P.delete(O.key === null ? T : O.key),
          (g = o(O, g, T)),
          E === null ? (C = O) : (E.sibling = O),
          (E = O));
    return (
      e &&
        P.forEach(function (N) {
          return t(m, N);
        }),
      Le && Rr(m, T),
      C
    );
  }
  function w(m, g, x, b) {
    if (
      (typeof x == "object" &&
        x !== null &&
        x.type === xi &&
        x.key === null &&
        (x = x.props.children),
      typeof x == "object" && x !== null)
    ) {
      switch (x.$$typeof) {
        case tl:
          e: {
            for (var C = x.key, E = g; E !== null; ) {
              if (E.key === C) {
                if (((C = x.type), C === xi)) {
                  if (E.tag === 7) {
                    n(m, E.sibling),
                      (g = i(E, x.props.children)),
                      (g.return = m),
                      (m = g);
                    break e;
                  }
                } else if (
                  E.elementType === C ||
                  (typeof C == "object" &&
                    C !== null &&
                    C.$$typeof === Yn &&
                    Eh(C) === E.type)
                ) {
                  n(m, E.sibling),
                    (g = i(E, x.props)),
                    (g.ref = go(m, E, x)),
                    (g.return = m),
                    (m = g);
                  break e;
                }
                n(m, E);
                break;
              } else t(m, E);
              E = E.sibling;
            }
            x.type === xi
              ? ((g = Gr(x.props.children, m.mode, b, x.key)),
                (g.return = m),
                (m = g))
              : ((b = zl(x.type, x.key, x.props, null, m.mode, b)),
                (b.ref = go(m, g, x)),
                (b.return = m),
                (m = b));
          }
          return a(m);
        case yi:
          e: {
            for (E = x.key; g !== null; ) {
              if (g.key === E)
                if (
                  g.tag === 4 &&
                  g.stateNode.containerInfo === x.containerInfo &&
                  g.stateNode.implementation === x.implementation
                ) {
                  n(m, g.sibling),
                    (g = i(g, x.children || [])),
                    (g.return = m),
                    (m = g);
                  break e;
                } else {
                  n(m, g);
                  break;
                }
              else t(m, g);
              g = g.sibling;
            }
            (g = wc(x, m.mode, b)), (g.return = m), (m = g);
          }
          return a(m);
        case Yn:
          return (E = x._init), w(m, g, E(x._payload), b);
      }
      if (Io(x)) return v(m, g, x, b);
      if (co(x)) return y(m, g, x, b);
      fl(m, x);
    }
    return (typeof x == "string" && x !== "") || typeof x == "number"
      ? ((x = "" + x),
        g !== null && g.tag === 6
          ? (n(m, g.sibling), (g = i(g, x)), (g.return = m), (m = g))
          : (n(m, g), (g = xc(x, m.mode, b)), (g.return = m), (m = g)),
        a(m))
      : n(m, g);
  }
  return w;
}
var Hi = K0(!0),
  Q0 = K0(!1),
  Na = {},
  In = Pr(Na),
  oa = Pr(Na),
  aa = Pr(Na);
function Ur(e) {
  if (e === Na) throw Error(B(174));
  return e;
}
function lp(e, t) {
  switch ((Te(aa, t), Te(oa, e), Te(In, Na), (e = t.nodeType), e)) {
    case 9:
    case 11:
      t = (t = t.documentElement) ? t.namespaceURI : hd(null, "");
      break;
    default:
      (e = e === 8 ? t.parentNode : t),
        (t = e.namespaceURI || null),
        (e = e.tagName),
        (t = hd(t, e));
  }
  De(In), Te(In, t);
}
function Gi() {
  De(In), De(oa), De(aa);
}
function Z0(e) {
  Ur(aa.current);
  var t = Ur(In.current),
    n = hd(t, e.type);
  t !== n && (Te(oa, e), Te(In, n));
}
function sp(e) {
  oa.current === e && (De(In), De(oa));
}
var $e = Pr(0);
function ds(e) {
  for (var t = e; t !== null; ) {
    if (t.tag === 13) {
      var n = t.memoizedState;
      if (
        n !== null &&
        ((n = n.dehydrated), n === null || n.data === "$?" || n.data === "$!")
      )
        return t;
    } else if (t.tag === 19 && t.memoizedProps.revealOrder !== void 0) {
      if (t.flags & 128) return t;
    } else if (t.child !== null) {
      (t.child.return = t), (t = t.child);
      continue;
    }
    if (t === e) break;
    for (; t.sibling === null; ) {
      if (t.return === null || t.return === e) return null;
      t = t.return;
    }
    (t.sibling.return = t.return), (t = t.sibling);
  }
  return null;
}
var pc = [];
function up() {
  for (var e = 0; e < pc.length; e++)
    pc[e]._workInProgressVersionPrimary = null;
  pc.length = 0;
}
var Ll = Vn.ReactCurrentDispatcher,
  mc = Vn.ReactCurrentBatchConfig,
  Xr = 0,
  Be = null,
  qe = null,
  Ze = null,
  fs = !1,
  $o = !1,
  la = 0,
  $S = 0;
function ut() {
  throw Error(B(321));
}
function cp(e, t) {
  if (t === null) return !1;
  for (var n = 0; n < t.length && n < e.length; n++)
    if (!gn(e[n], t[n])) return !1;
  return !0;
}
function dp(e, t, n, r, i, o) {
  if (
    ((Xr = o),
    (Be = t),
    (t.memoizedState = null),
    (t.updateQueue = null),
    (t.lanes = 0),
    (Ll.current = e === null || e.memoizedState === null ? US : HS),
    (e = n(r, i)),
    $o)
  ) {
    o = 0;
    do {
      if ((($o = !1), (la = 0), 25 <= o)) throw Error(B(301));
      (o += 1),
        (Ze = qe = null),
        (t.updateQueue = null),
        (Ll.current = GS),
        (e = n(r, i));
    } while ($o);
  }
  if (
    ((Ll.current = ps),
    (t = qe !== null && qe.next !== null),
    (Xr = 0),
    (Ze = qe = Be = null),
    (fs = !1),
    t)
  )
    throw Error(B(300));
  return e;
}
function fp() {
  var e = la !== 0;
  return (la = 0), e;
}
function En() {
  var e = {
    memoizedState: null,
    baseState: null,
    baseQueue: null,
    queue: null,
    next: null,
  };
  return Ze === null ? (Be.memoizedState = Ze = e) : (Ze = Ze.next = e), Ze;
}
function en() {
  if (qe === null) {
    var e = Be.alternate;
    e = e !== null ? e.memoizedState : null;
  } else e = qe.next;
  var t = Ze === null ? Be.memoizedState : Ze.next;
  if (t !== null) (Ze = t), (qe = e);
  else {
    if (e === null) throw Error(B(310));
    (qe = e),
      (e = {
        memoizedState: qe.memoizedState,
        baseState: qe.baseState,
        baseQueue: qe.baseQueue,
        queue: qe.queue,
        next: null,
      }),
      Ze === null ? (Be.memoizedState = Ze = e) : (Ze = Ze.next = e);
  }
  return Ze;
}
function sa(e, t) {
  return typeof t == "function" ? t(e) : t;
}
function hc(e) {
  var t = en(),
    n = t.queue;
  if (n === null) throw Error(B(311));
  n.lastRenderedReducer = e;
  var r = qe,
    i = r.baseQueue,
    o = n.pending;
  if (o !== null) {
    if (i !== null) {
      var a = i.next;
      (i.next = o.next), (o.next = a);
    }
    (r.baseQueue = i = o), (n.pending = null);
  }
  if (i !== null) {
    (o = i.next), (r = r.baseState);
    var l = (a = null),
      s = null,
      u = o;
    do {
      var d = u.lane;
      if ((Xr & d) === d)
        s !== null &&
          (s = s.next =
            {
              lane: 0,
              action: u.action,
              hasEagerState: u.hasEagerState,
              eagerState: u.eagerState,
              next: null,
            }),
          (r = u.hasEagerState ? u.eagerState : e(r, u.action));
      else {
        var c = {
          lane: d,
          action: u.action,
          hasEagerState: u.hasEagerState,
          eagerState: u.eagerState,
          next: null,
        };
        s === null ? ((l = s = c), (a = r)) : (s = s.next = c),
          (Be.lanes |= d),
          (Kr |= d);
      }
      u = u.next;
    } while (u !== null && u !== o);
    s === null ? (a = r) : (s.next = l),
      gn(r, t.memoizedState) || (St = !0),
      (t.memoizedState = r),
      (t.baseState = a),
      (t.baseQueue = s),
      (n.lastRenderedState = r);
  }
  if (((e = n.interleaved), e !== null)) {
    i = e;
    do (o = i.lane), (Be.lanes |= o), (Kr |= o), (i = i.next);
    while (i !== e);
  } else i === null && (n.lanes = 0);
  return [t.memoizedState, n.dispatch];
}
function gc(e) {
  var t = en(),
    n = t.queue;
  if (n === null) throw Error(B(311));
  n.lastRenderedReducer = e;
  var r = n.dispatch,
    i = n.pending,
    o = t.memoizedState;
  if (i !== null) {
    n.pending = null;
    var a = (i = i.next);
    do (o = e(o, a.action)), (a = a.next);
    while (a !== i);
    gn(o, t.memoizedState) || (St = !0),
      (t.memoizedState = o),
      t.baseQueue === null && (t.baseState = o),
      (n.lastRenderedState = o);
  }
  return [o, r];
}
function J0() {}
function e1(e, t) {
  var n = Be,
    r = en(),
    i = t(),
    o = !gn(r.memoizedState, i);
  if (
    (o && ((r.memoizedState = i), (St = !0)),
    (r = r.queue),
    pp(r1.bind(null, n, r, e), [e]),
    r.getSnapshot !== t || o || (Ze !== null && Ze.memoizedState.tag & 1))
  ) {
    if (
      ((n.flags |= 2048),
      ua(9, n1.bind(null, n, r, i, t), void 0, null),
      Je === null)
    )
      throw Error(B(349));
    Xr & 30 || t1(n, t, i);
  }
  return i;
}
function t1(e, t, n) {
  (e.flags |= 16384),
    (e = { getSnapshot: t, value: n }),
    (t = Be.updateQueue),
    t === null
      ? ((t = { lastEffect: null, stores: null }),
        (Be.updateQueue = t),
        (t.stores = [e]))
      : ((n = t.stores), n === null ? (t.stores = [e]) : n.push(e));
}
function n1(e, t, n, r) {
  (t.value = n), (t.getSnapshot = r), i1(t) && o1(e);
}
function r1(e, t, n) {
  return n(function () {
    i1(t) && o1(e);
  });
}
function i1(e) {
  var t = e.getSnapshot;
  e = e.value;
  try {
    var n = t();
    return !gn(e, n);
  } catch {
    return !0;
  }
}
function o1(e) {
  var t = Hn(e, 1);
  t !== null && hn(t, e, 1, -1);
}
function Th(e) {
  var t = En();
  return (
    typeof e == "function" && (e = e()),
    (t.memoizedState = t.baseState = e),
    (e = {
      pending: null,
      interleaved: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: sa,
      lastRenderedState: e,
    }),
    (t.queue = e),
    (e = e.dispatch = FS.bind(null, Be, e)),
    [t.memoizedState, e]
  );
}
function ua(e, t, n, r) {
  return (
    (e = { tag: e, create: t, destroy: n, deps: r, next: null }),
    (t = Be.updateQueue),
    t === null
      ? ((t = { lastEffect: null, stores: null }),
        (Be.updateQueue = t),
        (t.lastEffect = e.next = e))
      : ((n = t.lastEffect),
        n === null
          ? (t.lastEffect = e.next = e)
          : ((r = n.next), (n.next = e), (e.next = r), (t.lastEffect = e))),
    e
  );
}
function a1() {
  return en().memoizedState;
}
function Ml(e, t, n, r) {
  var i = En();
  (Be.flags |= e),
    (i.memoizedState = ua(1 | t, n, void 0, r === void 0 ? null : r));
}
function Xs(e, t, n, r) {
  var i = en();
  r = r === void 0 ? null : r;
  var o = void 0;
  if (qe !== null) {
    var a = qe.memoizedState;
    if (((o = a.destroy), r !== null && cp(r, a.deps))) {
      i.memoizedState = ua(t, n, o, r);
      return;
    }
  }
  (Be.flags |= e), (i.memoizedState = ua(1 | t, n, o, r));
}
function kh(e, t) {
  return Ml(8390656, 8, e, t);
}
function pp(e, t) {
  return Xs(2048, 8, e, t);
}
function l1(e, t) {
  return Xs(4, 2, e, t);
}
function s1(e, t) {
  return Xs(4, 4, e, t);
}
function u1(e, t) {
  if (typeof t == "function")
    return (
      (e = e()),
      t(e),
      function () {
        t(null);
      }
    );
  if (t != null)
    return (
      (e = e()),
      (t.current = e),
      function () {
        t.current = null;
      }
    );
}
function c1(e, t, n) {
  return (
    (n = n != null ? n.concat([e]) : null), Xs(4, 4, u1.bind(null, t, e), n)
  );
}
function mp() {}
function d1(e, t) {
  var n = en();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && cp(t, r[1])
    ? r[0]
    : ((n.memoizedState = [e, t]), e);
}
function f1(e, t) {
  var n = en();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && cp(t, r[1])
    ? r[0]
    : ((e = e()), (n.memoizedState = [e, t]), e);
}
function p1(e, t, n) {
  return Xr & 21
    ? (gn(n, t) || ((n = g0()), (Be.lanes |= n), (Kr |= n), (e.baseState = !0)),
      t)
    : (e.baseState && ((e.baseState = !1), (St = !0)), (e.memoizedState = n));
}
function BS(e, t) {
  var n = xe;
  (xe = n !== 0 && 4 > n ? n : 4), e(!0);
  var r = mc.transition;
  mc.transition = {};
  try {
    e(!1), t();
  } finally {
    (xe = n), (mc.transition = r);
  }
}
function m1() {
  return en().memoizedState;
}
function zS(e, t, n) {
  var r = dr(e);
  if (
    ((n = {
      lane: r,
      action: n,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    }),
    h1(e))
  )
    g1(t, n);
  else if (((n = V0(e, t, n, r)), n !== null)) {
    var i = gt();
    hn(n, e, r, i), v1(n, t, r);
  }
}
function FS(e, t, n) {
  var r = dr(e),
    i = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null };
  if (h1(e)) g1(t, i);
  else {
    var o = e.alternate;
    if (
      e.lanes === 0 &&
      (o === null || o.lanes === 0) &&
      ((o = t.lastRenderedReducer), o !== null)
    )
      try {
        var a = t.lastRenderedState,
          l = o(a, n);
        if (((i.hasEagerState = !0), (i.eagerState = l), gn(l, a))) {
          var s = t.interleaved;
          s === null
            ? ((i.next = i), op(t))
            : ((i.next = s.next), (s.next = i)),
            (t.interleaved = i);
          return;
        }
      } catch {
      } finally {
      }
    (n = V0(e, t, i, r)),
      n !== null && ((i = gt()), hn(n, e, r, i), v1(n, t, r));
  }
}
function h1(e) {
  var t = e.alternate;
  return e === Be || (t !== null && t === Be);
}
function g1(e, t) {
  $o = fs = !0;
  var n = e.pending;
  n === null ? (t.next = t) : ((t.next = n.next), (n.next = t)),
    (e.pending = t);
}
function v1(e, t, n) {
  if (n & 4194240) {
    var r = t.lanes;
    (r &= e.pendingLanes), (n |= r), (t.lanes = n), Wf(e, n);
  }
}
var ps = {
    readContext: Jt,
    useCallback: ut,
    useContext: ut,
    useEffect: ut,
    useImperativeHandle: ut,
    useInsertionEffect: ut,
    useLayoutEffect: ut,
    useMemo: ut,
    useReducer: ut,
    useRef: ut,
    useState: ut,
    useDebugValue: ut,
    useDeferredValue: ut,
    useTransition: ut,
    useMutableSource: ut,
    useSyncExternalStore: ut,
    useId: ut,
    unstable_isNewReconciler: !1,
  },
  US = {
    readContext: Jt,
    useCallback: function (e, t) {
      return (En().memoizedState = [e, t === void 0 ? null : t]), e;
    },
    useContext: Jt,
    useEffect: kh,
    useImperativeHandle: function (e, t, n) {
      return (
        (n = n != null ? n.concat([e]) : null),
        Ml(4194308, 4, u1.bind(null, t, e), n)
      );
    },
    useLayoutEffect: function (e, t) {
      return Ml(4194308, 4, e, t);
    },
    useInsertionEffect: function (e, t) {
      return Ml(4, 2, e, t);
    },
    useMemo: function (e, t) {
      var n = En();
      return (
        (t = t === void 0 ? null : t), (e = e()), (n.memoizedState = [e, t]), e
      );
    },
    useReducer: function (e, t, n) {
      var r = En();
      return (
        (t = n !== void 0 ? n(t) : t),
        (r.memoizedState = r.baseState = t),
        (e = {
          pending: null,
          interleaved: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: e,
          lastRenderedState: t,
        }),
        (r.queue = e),
        (e = e.dispatch = zS.bind(null, Be, e)),
        [r.memoizedState, e]
      );
    },
    useRef: function (e) {
      var t = En();
      return (e = { current: e }), (t.memoizedState = e);
    },
    useState: Th,
    useDebugValue: mp,
    useDeferredValue: function (e) {
      return (En().memoizedState = e);
    },
    useTransition: function () {
      var e = Th(!1),
        t = e[0];
      return (e = BS.bind(null, e[1])), (En().memoizedState = e), [t, e];
    },
    useMutableSource: function () {},
    useSyncExternalStore: function (e, t, n) {
      var r = Be,
        i = En();
      if (Le) {
        if (n === void 0) throw Error(B(407));
        n = n();
      } else {
        if (((n = t()), Je === null)) throw Error(B(349));
        Xr & 30 || t1(r, t, n);
      }
      i.memoizedState = n;
      var o = { value: n, getSnapshot: t };
      return (
        (i.queue = o),
        kh(r1.bind(null, r, o, e), [e]),
        (r.flags |= 2048),
        ua(9, n1.bind(null, r, o, n, t), void 0, null),
        n
      );
    },
    useId: function () {
      var e = En(),
        t = Je.identifierPrefix;
      if (Le) {
        var n = $n,
          r = _n;
        (n = (r & ~(1 << (32 - mn(r) - 1))).toString(32) + n),
          (t = ":" + t + "R" + n),
          (n = la++),
          0 < n && (t += "H" + n.toString(32)),
          (t += ":");
      } else (n = $S++), (t = ":" + t + "r" + n.toString(32) + ":");
      return (e.memoizedState = t);
    },
    unstable_isNewReconciler: !1,
  },
  HS = {
    readContext: Jt,
    useCallback: d1,
    useContext: Jt,
    useEffect: pp,
    useImperativeHandle: c1,
    useInsertionEffect: l1,
    useLayoutEffect: s1,
    useMemo: f1,
    useReducer: hc,
    useRef: a1,
    useState: function () {
      return hc(sa);
    },
    useDebugValue: mp,
    useDeferredValue: function (e) {
      var t = en();
      return p1(t, qe.memoizedState, e);
    },
    useTransition: function () {
      var e = hc(sa)[0],
        t = en().memoizedState;
      return [e, t];
    },
    useMutableSource: J0,
    useSyncExternalStore: e1,
    useId: m1,
    unstable_isNewReconciler: !1,
  },
  GS = {
    readContext: Jt,
    useCallback: d1,
    useContext: Jt,
    useEffect: pp,
    useImperativeHandle: c1,
    useInsertionEffect: l1,
    useLayoutEffect: s1,
    useMemo: f1,
    useReducer: gc,
    useRef: a1,
    useState: function () {
      return gc(sa);
    },
    useDebugValue: mp,
    useDeferredValue: function (e) {
      var t = en();
      return qe === null ? (t.memoizedState = e) : p1(t, qe.memoizedState, e);
    },
    useTransition: function () {
      var e = gc(sa)[0],
        t = en().memoizedState;
      return [e, t];
    },
    useMutableSource: J0,
    useSyncExternalStore: e1,
    useId: m1,
    unstable_isNewReconciler: !1,
  };
function Wi(e, t) {
  try {
    var n = "",
      r = t;
    do (n += yb(r)), (r = r.return);
    while (r);
    var i = n;
  } catch (o) {
    i =
      `
Error generating stack: ` +
      o.message +
      `
` +
      o.stack;
  }
  return { value: e, source: t, stack: i, digest: null };
}
function vc(e, t, n) {
  return { value: e, source: null, stack: n ?? null, digest: t ?? null };
}
function $d(e, t) {
  try {
    console.error(t.value);
  } catch (n) {
    setTimeout(function () {
      throw n;
    });
  }
}
var WS = typeof WeakMap == "function" ? WeakMap : Map;
function y1(e, t, n) {
  (n = zn(-1, n)), (n.tag = 3), (n.payload = { element: null });
  var r = t.value;
  return (
    (n.callback = function () {
      hs || ((hs = !0), (Yd = r)), $d(e, t);
    }),
    n
  );
}
function x1(e, t, n) {
  (n = zn(-1, n)), (n.tag = 3);
  var r = e.type.getDerivedStateFromError;
  if (typeof r == "function") {
    var i = t.value;
    (n.payload = function () {
      return r(i);
    }),
      (n.callback = function () {
        $d(e, t);
      });
  }
  var o = e.stateNode;
  return (
    o !== null &&
      typeof o.componentDidCatch == "function" &&
      (n.callback = function () {
        $d(e, t),
          typeof r != "function" &&
            (cr === null ? (cr = new Set([this])) : cr.add(this));
        var a = t.stack;
        this.componentDidCatch(t.value, {
          componentStack: a !== null ? a : "",
        });
      }),
    n
  );
}
function Ph(e, t, n) {
  var r = e.pingCache;
  if (r === null) {
    r = e.pingCache = new WS();
    var i = new Set();
    r.set(t, i);
  } else (i = r.get(t)), i === void 0 && ((i = new Set()), r.set(t, i));
  i.has(n) || (i.add(n), (e = o2.bind(null, e, t, n)), t.then(e, e));
}
function Ih(e) {
  do {
    var t;
    if (
      ((t = e.tag === 13) &&
        ((t = e.memoizedState), (t = t !== null ? t.dehydrated !== null : !0)),
      t)
    )
      return e;
    e = e.return;
  } while (e !== null);
  return null;
}
function Ah(e, t, n, r, i) {
  return e.mode & 1
    ? ((e.flags |= 65536), (e.lanes = i), e)
    : (e === t
        ? (e.flags |= 65536)
        : ((e.flags |= 128),
          (n.flags |= 131072),
          (n.flags &= -52805),
          n.tag === 1 &&
            (n.alternate === null
              ? (n.tag = 17)
              : ((t = zn(-1, 1)), (t.tag = 2), ur(n, t, 1))),
          (n.lanes |= 1)),
      e);
}
var VS = Vn.ReactCurrentOwner,
  St = !1;
function ht(e, t, n, r) {
  t.child = e === null ? Q0(t, null, n, r) : Hi(t, e.child, n, r);
}
function Dh(e, t, n, r, i) {
  n = n.render;
  var o = t.ref;
  return (
    Li(t, i),
    (r = dp(e, t, n, r, o, i)),
    (n = fp()),
    e !== null && !St
      ? ((t.updateQueue = e.updateQueue),
        (t.flags &= -2053),
        (e.lanes &= ~i),
        Gn(e, t, i))
      : (Le && n && Jf(t), (t.flags |= 1), ht(e, t, r, i), t.child)
  );
}
function Oh(e, t, n, r, i) {
  if (e === null) {
    var o = n.type;
    return typeof o == "function" &&
      !Sp(o) &&
      o.defaultProps === void 0 &&
      n.compare === null &&
      n.defaultProps === void 0
      ? ((t.tag = 15), (t.type = o), w1(e, t, o, r, i))
      : ((e = zl(n.type, null, r, t, t.mode, i)),
        (e.ref = t.ref),
        (e.return = t),
        (t.child = e));
  }
  if (((o = e.child), !(e.lanes & i))) {
    var a = o.memoizedProps;
    if (
      ((n = n.compare), (n = n !== null ? n : ta), n(a, r) && e.ref === t.ref)
    )
      return Gn(e, t, i);
  }
  return (
    (t.flags |= 1),
    (e = fr(o, r)),
    (e.ref = t.ref),
    (e.return = t),
    (t.child = e)
  );
}
function w1(e, t, n, r, i) {
  if (e !== null) {
    var o = e.memoizedProps;
    if (ta(o, r) && e.ref === t.ref)
      if (((St = !1), (t.pendingProps = r = o), (e.lanes & i) !== 0))
        e.flags & 131072 && (St = !0);
      else return (t.lanes = e.lanes), Gn(e, t, i);
  }
  return Bd(e, t, n, r, i);
}
function b1(e, t, n) {
  var r = t.pendingProps,
    i = r.children,
    o = e !== null ? e.memoizedState : null;
  if (r.mode === "hidden")
    if (!(t.mode & 1))
      (t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }),
        Te(Ai, At),
        (At |= n);
    else {
      if (!(n & 1073741824))
        return (
          (e = o !== null ? o.baseLanes | n : n),
          (t.lanes = t.childLanes = 1073741824),
          (t.memoizedState = {
            baseLanes: e,
            cachePool: null,
            transitions: null,
          }),
          (t.updateQueue = null),
          Te(Ai, At),
          (At |= e),
          null
        );
      (t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }),
        (r = o !== null ? o.baseLanes : n),
        Te(Ai, At),
        (At |= r);
    }
  else
    o !== null ? ((r = o.baseLanes | n), (t.memoizedState = null)) : (r = n),
      Te(Ai, At),
      (At |= r);
  return ht(e, t, i, n), t.child;
}
function S1(e, t) {
  var n = t.ref;
  ((e === null && n !== null) || (e !== null && e.ref !== n)) &&
    ((t.flags |= 512), (t.flags |= 2097152));
}
function Bd(e, t, n, r, i) {
  var o = Tt(n) ? qr : pt.current;
  return (
    (o = Fi(t, o)),
    Li(t, i),
    (n = dp(e, t, n, r, o, i)),
    (r = fp()),
    e !== null && !St
      ? ((t.updateQueue = e.updateQueue),
        (t.flags &= -2053),
        (e.lanes &= ~i),
        Gn(e, t, i))
      : (Le && r && Jf(t), (t.flags |= 1), ht(e, t, n, i), t.child)
  );
}
function jh(e, t, n, r, i) {
  if (Tt(n)) {
    var o = !0;
    os(t);
  } else o = !1;
  if ((Li(t, i), t.stateNode === null))
    _l(e, t), X0(t, n, r), _d(t, n, r, i), (r = !0);
  else if (e === null) {
    var a = t.stateNode,
      l = t.memoizedProps;
    a.props = l;
    var s = a.context,
      u = n.contextType;
    typeof u == "object" && u !== null
      ? (u = Jt(u))
      : ((u = Tt(n) ? qr : pt.current), (u = Fi(t, u)));
    var d = n.getDerivedStateFromProps,
      c =
        typeof d == "function" ||
        typeof a.getSnapshotBeforeUpdate == "function";
    c ||
      (typeof a.UNSAFE_componentWillReceiveProps != "function" &&
        typeof a.componentWillReceiveProps != "function") ||
      ((l !== r || s !== u) && Ch(t, a, r, u)),
      (Xn = !1);
    var f = t.memoizedState;
    (a.state = f),
      cs(t, r, a, i),
      (s = t.memoizedState),
      l !== r || f !== s || Et.current || Xn
        ? (typeof d == "function" && (Md(t, n, d, r), (s = t.memoizedState)),
          (l = Xn || Sh(t, n, l, r, f, s, u))
            ? (c ||
                (typeof a.UNSAFE_componentWillMount != "function" &&
                  typeof a.componentWillMount != "function") ||
                (typeof a.componentWillMount == "function" &&
                  a.componentWillMount(),
                typeof a.UNSAFE_componentWillMount == "function" &&
                  a.UNSAFE_componentWillMount()),
              typeof a.componentDidMount == "function" && (t.flags |= 4194308))
            : (typeof a.componentDidMount == "function" && (t.flags |= 4194308),
              (t.memoizedProps = r),
              (t.memoizedState = s)),
          (a.props = r),
          (a.state = s),
          (a.context = u),
          (r = l))
        : (typeof a.componentDidMount == "function" && (t.flags |= 4194308),
          (r = !1));
  } else {
    (a = t.stateNode),
      q0(e, t),
      (l = t.memoizedProps),
      (u = t.type === t.elementType ? l : sn(t.type, l)),
      (a.props = u),
      (c = t.pendingProps),
      (f = a.context),
      (s = n.contextType),
      typeof s == "object" && s !== null
        ? (s = Jt(s))
        : ((s = Tt(n) ? qr : pt.current), (s = Fi(t, s)));
    var h = n.getDerivedStateFromProps;
    (d =
      typeof h == "function" ||
      typeof a.getSnapshotBeforeUpdate == "function") ||
      (typeof a.UNSAFE_componentWillReceiveProps != "function" &&
        typeof a.componentWillReceiveProps != "function") ||
      ((l !== c || f !== s) && Ch(t, a, r, s)),
      (Xn = !1),
      (f = t.memoizedState),
      (a.state = f),
      cs(t, r, a, i);
    var v = t.memoizedState;
    l !== c || f !== v || Et.current || Xn
      ? (typeof h == "function" && (Md(t, n, h, r), (v = t.memoizedState)),
        (u = Xn || Sh(t, n, u, r, f, v, s) || !1)
          ? (d ||
              (typeof a.UNSAFE_componentWillUpdate != "function" &&
                typeof a.componentWillUpdate != "function") ||
              (typeof a.componentWillUpdate == "function" &&
                a.componentWillUpdate(r, v, s),
              typeof a.UNSAFE_componentWillUpdate == "function" &&
                a.UNSAFE_componentWillUpdate(r, v, s)),
            typeof a.componentDidUpdate == "function" && (t.flags |= 4),
            typeof a.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024))
          : (typeof a.componentDidUpdate != "function" ||
              (l === e.memoizedProps && f === e.memoizedState) ||
              (t.flags |= 4),
            typeof a.getSnapshotBeforeUpdate != "function" ||
              (l === e.memoizedProps && f === e.memoizedState) ||
              (t.flags |= 1024),
            (t.memoizedProps = r),
            (t.memoizedState = v)),
        (a.props = r),
        (a.state = v),
        (a.context = s),
        (r = u))
      : (typeof a.componentDidUpdate != "function" ||
          (l === e.memoizedProps && f === e.memoizedState) ||
          (t.flags |= 4),
        typeof a.getSnapshotBeforeUpdate != "function" ||
          (l === e.memoizedProps && f === e.memoizedState) ||
          (t.flags |= 1024),
        (r = !1));
  }
  return zd(e, t, n, r, o, i);
}
function zd(e, t, n, r, i, o) {
  S1(e, t);
  var a = (t.flags & 128) !== 0;
  if (!r && !a) return i && vh(t, n, !1), Gn(e, t, o);
  (r = t.stateNode), (VS.current = t);
  var l =
    a && typeof n.getDerivedStateFromError != "function" ? null : r.render();
  return (
    (t.flags |= 1),
    e !== null && a
      ? ((t.child = Hi(t, e.child, null, o)), (t.child = Hi(t, null, l, o)))
      : ht(e, t, l, o),
    (t.memoizedState = r.state),
    i && vh(t, n, !0),
    t.child
  );
}
function C1(e) {
  var t = e.stateNode;
  t.pendingContext
    ? gh(e, t.pendingContext, t.pendingContext !== t.context)
    : t.context && gh(e, t.context, !1),
    lp(e, t.containerInfo);
}
function Nh(e, t, n, r, i) {
  return Ui(), tp(i), (t.flags |= 256), ht(e, t, n, r), t.child;
}
var Fd = { dehydrated: null, treeContext: null, retryLane: 0 };
function Ud(e) {
  return { baseLanes: e, cachePool: null, transitions: null };
}
function E1(e, t, n) {
  var r = t.pendingProps,
    i = $e.current,
    o = !1,
    a = (t.flags & 128) !== 0,
    l;
  if (
    ((l = a) ||
      (l = e !== null && e.memoizedState === null ? !1 : (i & 2) !== 0),
    l
      ? ((o = !0), (t.flags &= -129))
      : (e === null || e.memoizedState !== null) && (i |= 1),
    Te($e, i & 1),
    e === null)
  )
    return (
      Rd(t),
      (e = t.memoizedState),
      e !== null && ((e = e.dehydrated), e !== null)
        ? (t.mode & 1
            ? e.data === "$!"
              ? (t.lanes = 8)
              : (t.lanes = 1073741824)
            : (t.lanes = 1),
          null)
        : ((a = r.children),
          (e = r.fallback),
          o
            ? ((r = t.mode),
              (o = t.child),
              (a = { mode: "hidden", children: a }),
              !(r & 1) && o !== null
                ? ((o.childLanes = 0), (o.pendingProps = a))
                : (o = Zs(a, r, 0, null)),
              (e = Gr(e, r, n, null)),
              (o.return = t),
              (e.return = t),
              (o.sibling = e),
              (t.child = o),
              (t.child.memoizedState = Ud(n)),
              (t.memoizedState = Fd),
              e)
            : hp(t, a))
    );
  if (((i = e.memoizedState), i !== null && ((l = i.dehydrated), l !== null)))
    return qS(e, t, a, r, l, i, n);
  if (o) {
    (o = r.fallback), (a = t.mode), (i = e.child), (l = i.sibling);
    var s = { mode: "hidden", children: r.children };
    return (
      !(a & 1) && t.child !== i
        ? ((r = t.child),
          (r.childLanes = 0),
          (r.pendingProps = s),
          (t.deletions = null))
        : ((r = fr(i, s)), (r.subtreeFlags = i.subtreeFlags & 14680064)),
      l !== null ? (o = fr(l, o)) : ((o = Gr(o, a, n, null)), (o.flags |= 2)),
      (o.return = t),
      (r.return = t),
      (r.sibling = o),
      (t.child = r),
      (r = o),
      (o = t.child),
      (a = e.child.memoizedState),
      (a =
        a === null
          ? Ud(n)
          : {
              baseLanes: a.baseLanes | n,
              cachePool: null,
              transitions: a.transitions,
            }),
      (o.memoizedState = a),
      (o.childLanes = e.childLanes & ~n),
      (t.memoizedState = Fd),
      r
    );
  }
  return (
    (o = e.child),
    (e = o.sibling),
    (r = fr(o, { mode: "visible", children: r.children })),
    !(t.mode & 1) && (r.lanes = n),
    (r.return = t),
    (r.sibling = null),
    e !== null &&
      ((n = t.deletions),
      n === null ? ((t.deletions = [e]), (t.flags |= 16)) : n.push(e)),
    (t.child = r),
    (t.memoizedState = null),
    r
  );
}
function hp(e, t) {
  return (
    (t = Zs({ mode: "visible", children: t }, e.mode, 0, null)),
    (t.return = e),
    (e.child = t)
  );
}
function pl(e, t, n, r) {
  return (
    r !== null && tp(r),
    Hi(t, e.child, null, n),
    (e = hp(t, t.pendingProps.children)),
    (e.flags |= 2),
    (t.memoizedState = null),
    e
  );
}
function qS(e, t, n, r, i, o, a) {
  if (n)
    return t.flags & 256
      ? ((t.flags &= -257), (r = vc(Error(B(422)))), pl(e, t, a, r))
      : t.memoizedState !== null
      ? ((t.child = e.child), (t.flags |= 128), null)
      : ((o = r.fallback),
        (i = t.mode),
        (r = Zs({ mode: "visible", children: r.children }, i, 0, null)),
        (o = Gr(o, i, a, null)),
        (o.flags |= 2),
        (r.return = t),
        (o.return = t),
        (r.sibling = o),
        (t.child = r),
        t.mode & 1 && Hi(t, e.child, null, a),
        (t.child.memoizedState = Ud(a)),
        (t.memoizedState = Fd),
        o);
  if (!(t.mode & 1)) return pl(e, t, a, null);
  if (i.data === "$!") {
    if (((r = i.nextSibling && i.nextSibling.dataset), r)) var l = r.dgst;
    return (r = l), (o = Error(B(419))), (r = vc(o, r, void 0)), pl(e, t, a, r);
  }
  if (((l = (a & e.childLanes) !== 0), St || l)) {
    if (((r = Je), r !== null)) {
      switch (a & -a) {
        case 4:
          i = 2;
          break;
        case 16:
          i = 8;
          break;
        case 64:
        case 128:
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
        case 67108864:
          i = 32;
          break;
        case 536870912:
          i = 268435456;
          break;
        default:
          i = 0;
      }
      (i = i & (r.suspendedLanes | a) ? 0 : i),
        i !== 0 &&
          i !== o.retryLane &&
          ((o.retryLane = i), Hn(e, i), hn(r, e, i, -1));
    }
    return bp(), (r = vc(Error(B(421)))), pl(e, t, a, r);
  }
  return i.data === "$?"
    ? ((t.flags |= 128),
      (t.child = e.child),
      (t = a2.bind(null, e)),
      (i._reactRetry = t),
      null)
    : ((e = o.treeContext),
      (Ot = sr(i.nextSibling)),
      (Nt = t),
      (Le = !0),
      (cn = null),
      e !== null &&
        ((qt[Yt++] = _n),
        (qt[Yt++] = $n),
        (qt[Yt++] = Yr),
        (_n = e.id),
        ($n = e.overflow),
        (Yr = t)),
      (t = hp(t, r.children)),
      (t.flags |= 4096),
      t);
}
function Rh(e, t, n) {
  e.lanes |= t;
  var r = e.alternate;
  r !== null && (r.lanes |= t), Ld(e.return, t, n);
}
function yc(e, t, n, r, i) {
  var o = e.memoizedState;
  o === null
    ? (e.memoizedState = {
        isBackwards: t,
        rendering: null,
        renderingStartTime: 0,
        last: r,
        tail: n,
        tailMode: i,
      })
    : ((o.isBackwards = t),
      (o.rendering = null),
      (o.renderingStartTime = 0),
      (o.last = r),
      (o.tail = n),
      (o.tailMode = i));
}
function T1(e, t, n) {
  var r = t.pendingProps,
    i = r.revealOrder,
    o = r.tail;
  if ((ht(e, t, r.children, n), (r = $e.current), r & 2))
    (r = (r & 1) | 2), (t.flags |= 128);
  else {
    if (e !== null && e.flags & 128)
      e: for (e = t.child; e !== null; ) {
        if (e.tag === 13) e.memoizedState !== null && Rh(e, n, t);
        else if (e.tag === 19) Rh(e, n, t);
        else if (e.child !== null) {
          (e.child.return = e), (e = e.child);
          continue;
        }
        if (e === t) break e;
        for (; e.sibling === null; ) {
          if (e.return === null || e.return === t) break e;
          e = e.return;
        }
        (e.sibling.return = e.return), (e = e.sibling);
      }
    r &= 1;
  }
  if ((Te($e, r), !(t.mode & 1))) t.memoizedState = null;
  else
    switch (i) {
      case "forwards":
        for (n = t.child, i = null; n !== null; )
          (e = n.alternate),
            e !== null && ds(e) === null && (i = n),
            (n = n.sibling);
        (n = i),
          n === null
            ? ((i = t.child), (t.child = null))
            : ((i = n.sibling), (n.sibling = null)),
          yc(t, !1, i, n, o);
        break;
      case "backwards":
        for (n = null, i = t.child, t.child = null; i !== null; ) {
          if (((e = i.alternate), e !== null && ds(e) === null)) {
            t.child = i;
            break;
          }
          (e = i.sibling), (i.sibling = n), (n = i), (i = e);
        }
        yc(t, !0, n, null, o);
        break;
      case "together":
        yc(t, !1, null, null, void 0);
        break;
      default:
        t.memoizedState = null;
    }
  return t.child;
}
function _l(e, t) {
  !(t.mode & 1) &&
    e !== null &&
    ((e.alternate = null), (t.alternate = null), (t.flags |= 2));
}
function Gn(e, t, n) {
  if (
    (e !== null && (t.dependencies = e.dependencies),
    (Kr |= t.lanes),
    !(n & t.childLanes))
  )
    return null;
  if (e !== null && t.child !== e.child) throw Error(B(153));
  if (t.child !== null) {
    for (
      e = t.child, n = fr(e, e.pendingProps), t.child = n, n.return = t;
      e.sibling !== null;

    )
      (e = e.sibling), (n = n.sibling = fr(e, e.pendingProps)), (n.return = t);
    n.sibling = null;
  }
  return t.child;
}
function YS(e, t, n) {
  switch (t.tag) {
    case 3:
      C1(t), Ui();
      break;
    case 5:
      Z0(t);
      break;
    case 1:
      Tt(t.type) && os(t);
      break;
    case 4:
      lp(t, t.stateNode.containerInfo);
      break;
    case 10:
      var r = t.type._context,
        i = t.memoizedProps.value;
      Te(ss, r._currentValue), (r._currentValue = i);
      break;
    case 13:
      if (((r = t.memoizedState), r !== null))
        return r.dehydrated !== null
          ? (Te($e, $e.current & 1), (t.flags |= 128), null)
          : n & t.child.childLanes
          ? E1(e, t, n)
          : (Te($e, $e.current & 1),
            (e = Gn(e, t, n)),
            e !== null ? e.sibling : null);
      Te($e, $e.current & 1);
      break;
    case 19:
      if (((r = (n & t.childLanes) !== 0), e.flags & 128)) {
        if (r) return T1(e, t, n);
        t.flags |= 128;
      }
      if (
        ((i = t.memoizedState),
        i !== null &&
          ((i.rendering = null), (i.tail = null), (i.lastEffect = null)),
        Te($e, $e.current),
        r)
      )
        break;
      return null;
    case 22:
    case 23:
      return (t.lanes = 0), b1(e, t, n);
  }
  return Gn(e, t, n);
}
var k1, Hd, P1, I1;
k1 = function (e, t) {
  for (var n = t.child; n !== null; ) {
    if (n.tag === 5 || n.tag === 6) e.appendChild(n.stateNode);
    else if (n.tag !== 4 && n.child !== null) {
      (n.child.return = n), (n = n.child);
      continue;
    }
    if (n === t) break;
    for (; n.sibling === null; ) {
      if (n.return === null || n.return === t) return;
      n = n.return;
    }
    (n.sibling.return = n.return), (n = n.sibling);
  }
};
Hd = function () {};
P1 = function (e, t, n, r) {
  var i = e.memoizedProps;
  if (i !== r) {
    (e = t.stateNode), Ur(In.current);
    var o = null;
    switch (n) {
      case "input":
        (i = dd(e, i)), (r = dd(e, r)), (o = []);
        break;
      case "select":
        (i = ze({}, i, { value: void 0 })),
          (r = ze({}, r, { value: void 0 })),
          (o = []);
        break;
      case "textarea":
        (i = md(e, i)), (r = md(e, r)), (o = []);
        break;
      default:
        typeof i.onClick != "function" &&
          typeof r.onClick == "function" &&
          (e.onclick = rs);
    }
    gd(n, r);
    var a;
    n = null;
    for (u in i)
      if (!r.hasOwnProperty(u) && i.hasOwnProperty(u) && i[u] != null)
        if (u === "style") {
          var l = i[u];
          for (a in l) l.hasOwnProperty(a) && (n || (n = {}), (n[a] = ""));
        } else
          u !== "dangerouslySetInnerHTML" &&
            u !== "children" &&
            u !== "suppressContentEditableWarning" &&
            u !== "suppressHydrationWarning" &&
            u !== "autoFocus" &&
            (Yo.hasOwnProperty(u)
              ? o || (o = [])
              : (o = o || []).push(u, null));
    for (u in r) {
      var s = r[u];
      if (
        ((l = i != null ? i[u] : void 0),
        r.hasOwnProperty(u) && s !== l && (s != null || l != null))
      )
        if (u === "style")
          if (l) {
            for (a in l)
              !l.hasOwnProperty(a) ||
                (s && s.hasOwnProperty(a)) ||
                (n || (n = {}), (n[a] = ""));
            for (a in s)
              s.hasOwnProperty(a) &&
                l[a] !== s[a] &&
                (n || (n = {}), (n[a] = s[a]));
          } else n || (o || (o = []), o.push(u, n)), (n = s);
        else
          u === "dangerouslySetInnerHTML"
            ? ((s = s ? s.__html : void 0),
              (l = l ? l.__html : void 0),
              s != null && l !== s && (o = o || []).push(u, s))
            : u === "children"
            ? (typeof s != "string" && typeof s != "number") ||
              (o = o || []).push(u, "" + s)
            : u !== "suppressContentEditableWarning" &&
              u !== "suppressHydrationWarning" &&
              (Yo.hasOwnProperty(u)
                ? (s != null && u === "onScroll" && Ae("scroll", e),
                  o || l === s || (o = []))
                : (o = o || []).push(u, s));
    }
    n && (o = o || []).push("style", n);
    var u = o;
    (t.updateQueue = u) && (t.flags |= 4);
  }
};
I1 = function (e, t, n, r) {
  n !== r && (t.flags |= 4);
};
function vo(e, t) {
  if (!Le)
    switch (e.tailMode) {
      case "hidden":
        t = e.tail;
        for (var n = null; t !== null; )
          t.alternate !== null && (n = t), (t = t.sibling);
        n === null ? (e.tail = null) : (n.sibling = null);
        break;
      case "collapsed":
        n = e.tail;
        for (var r = null; n !== null; )
          n.alternate !== null && (r = n), (n = n.sibling);
        r === null
          ? t || e.tail === null
            ? (e.tail = null)
            : (e.tail.sibling = null)
          : (r.sibling = null);
    }
}
function ct(e) {
  var t = e.alternate !== null && e.alternate.child === e.child,
    n = 0,
    r = 0;
  if (t)
    for (var i = e.child; i !== null; )
      (n |= i.lanes | i.childLanes),
        (r |= i.subtreeFlags & 14680064),
        (r |= i.flags & 14680064),
        (i.return = e),
        (i = i.sibling);
  else
    for (i = e.child; i !== null; )
      (n |= i.lanes | i.childLanes),
        (r |= i.subtreeFlags),
        (r |= i.flags),
        (i.return = e),
        (i = i.sibling);
  return (e.subtreeFlags |= r), (e.childLanes = n), t;
}
function XS(e, t, n) {
  var r = t.pendingProps;
  switch ((ep(t), t.tag)) {
    case 2:
    case 16:
    case 15:
    case 0:
    case 11:
    case 7:
    case 8:
    case 12:
    case 9:
    case 14:
      return ct(t), null;
    case 1:
      return Tt(t.type) && is(), ct(t), null;
    case 3:
      return (
        (r = t.stateNode),
        Gi(),
        De(Et),
        De(pt),
        up(),
        r.pendingContext &&
          ((r.context = r.pendingContext), (r.pendingContext = null)),
        (e === null || e.child === null) &&
          (dl(t)
            ? (t.flags |= 4)
            : e === null ||
              (e.memoizedState.isDehydrated && !(t.flags & 256)) ||
              ((t.flags |= 1024), cn !== null && (Qd(cn), (cn = null)))),
        Hd(e, t),
        ct(t),
        null
      );
    case 5:
      sp(t);
      var i = Ur(aa.current);
      if (((n = t.type), e !== null && t.stateNode != null))
        P1(e, t, n, r, i),
          e.ref !== t.ref && ((t.flags |= 512), (t.flags |= 2097152));
      else {
        if (!r) {
          if (t.stateNode === null) throw Error(B(166));
          return ct(t), null;
        }
        if (((e = Ur(In.current)), dl(t))) {
          (r = t.stateNode), (n = t.type);
          var o = t.memoizedProps;
          switch (((r[Tn] = t), (r[ia] = o), (e = (t.mode & 1) !== 0), n)) {
            case "dialog":
              Ae("cancel", r), Ae("close", r);
              break;
            case "iframe":
            case "object":
            case "embed":
              Ae("load", r);
              break;
            case "video":
            case "audio":
              for (i = 0; i < Do.length; i++) Ae(Do[i], r);
              break;
            case "source":
              Ae("error", r);
              break;
            case "img":
            case "image":
            case "link":
              Ae("error", r), Ae("load", r);
              break;
            case "details":
              Ae("toggle", r);
              break;
            case "input":
              Hm(r, o), Ae("invalid", r);
              break;
            case "select":
              (r._wrapperState = { wasMultiple: !!o.multiple }),
                Ae("invalid", r);
              break;
            case "textarea":
              Wm(r, o), Ae("invalid", r);
          }
          gd(n, o), (i = null);
          for (var a in o)
            if (o.hasOwnProperty(a)) {
              var l = o[a];
              a === "children"
                ? typeof l == "string"
                  ? r.textContent !== l &&
                    (o.suppressHydrationWarning !== !0 &&
                      cl(r.textContent, l, e),
                    (i = ["children", l]))
                  : typeof l == "number" &&
                    r.textContent !== "" + l &&
                    (o.suppressHydrationWarning !== !0 &&
                      cl(r.textContent, l, e),
                    (i = ["children", "" + l]))
                : Yo.hasOwnProperty(a) &&
                  l != null &&
                  a === "onScroll" &&
                  Ae("scroll", r);
            }
          switch (n) {
            case "input":
              nl(r), Gm(r, o, !0);
              break;
            case "textarea":
              nl(r), Vm(r);
              break;
            case "select":
            case "option":
              break;
            default:
              typeof o.onClick == "function" && (r.onclick = rs);
          }
          (r = i), (t.updateQueue = r), r !== null && (t.flags |= 4);
        } else {
          (a = i.nodeType === 9 ? i : i.ownerDocument),
            e === "http://www.w3.org/1999/xhtml" && (e = t0(n)),
            e === "http://www.w3.org/1999/xhtml"
              ? n === "script"
                ? ((e = a.createElement("div")),
                  (e.innerHTML = "<script></script>"),
                  (e = e.removeChild(e.firstChild)))
                : typeof r.is == "string"
                ? (e = a.createElement(n, { is: r.is }))
                : ((e = a.createElement(n)),
                  n === "select" &&
                    ((a = e),
                    r.multiple
                      ? (a.multiple = !0)
                      : r.size && (a.size = r.size)))
              : (e = a.createElementNS(e, n)),
            (e[Tn] = t),
            (e[ia] = r),
            k1(e, t, !1, !1),
            (t.stateNode = e);
          e: {
            switch (((a = vd(n, r)), n)) {
              case "dialog":
                Ae("cancel", e), Ae("close", e), (i = r);
                break;
              case "iframe":
              case "object":
              case "embed":
                Ae("load", e), (i = r);
                break;
              case "video":
              case "audio":
                for (i = 0; i < Do.length; i++) Ae(Do[i], e);
                i = r;
                break;
              case "source":
                Ae("error", e), (i = r);
                break;
              case "img":
              case "image":
              case "link":
                Ae("error", e), Ae("load", e), (i = r);
                break;
              case "details":
                Ae("toggle", e), (i = r);
                break;
              case "input":
                Hm(e, r), (i = dd(e, r)), Ae("invalid", e);
                break;
              case "option":
                i = r;
                break;
              case "select":
                (e._wrapperState = { wasMultiple: !!r.multiple }),
                  (i = ze({}, r, { value: void 0 })),
                  Ae("invalid", e);
                break;
              case "textarea":
                Wm(e, r), (i = md(e, r)), Ae("invalid", e);
                break;
              default:
                i = r;
            }
            gd(n, i), (l = i);
            for (o in l)
              if (l.hasOwnProperty(o)) {
                var s = l[o];
                o === "style"
                  ? i0(e, s)
                  : o === "dangerouslySetInnerHTML"
                  ? ((s = s ? s.__html : void 0), s != null && n0(e, s))
                  : o === "children"
                  ? typeof s == "string"
                    ? (n !== "textarea" || s !== "") && Xo(e, s)
                    : typeof s == "number" && Xo(e, "" + s)
                  : o !== "suppressContentEditableWarning" &&
                    o !== "suppressHydrationWarning" &&
                    o !== "autoFocus" &&
                    (Yo.hasOwnProperty(o)
                      ? s != null && o === "onScroll" && Ae("scroll", e)
                      : s != null && Bf(e, o, s, a));
              }
            switch (n) {
              case "input":
                nl(e), Gm(e, r, !1);
                break;
              case "textarea":
                nl(e), Vm(e);
                break;
              case "option":
                r.value != null && e.setAttribute("value", "" + br(r.value));
                break;
              case "select":
                (e.multiple = !!r.multiple),
                  (o = r.value),
                  o != null
                    ? Oi(e, !!r.multiple, o, !1)
                    : r.defaultValue != null &&
                      Oi(e, !!r.multiple, r.defaultValue, !0);
                break;
              default:
                typeof i.onClick == "function" && (e.onclick = rs);
            }
            switch (n) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                r = !!r.autoFocus;
                break e;
              case "img":
                r = !0;
                break e;
              default:
                r = !1;
            }
          }
          r && (t.flags |= 4);
        }
        t.ref !== null && ((t.flags |= 512), (t.flags |= 2097152));
      }
      return ct(t), null;
    case 6:
      if (e && t.stateNode != null) I1(e, t, e.memoizedProps, r);
      else {
        if (typeof r != "string" && t.stateNode === null) throw Error(B(166));
        if (((n = Ur(aa.current)), Ur(In.current), dl(t))) {
          if (
            ((r = t.stateNode),
            (n = t.memoizedProps),
            (r[Tn] = t),
            (o = r.nodeValue !== n) && ((e = Nt), e !== null))
          )
            switch (e.tag) {
              case 3:
                cl(r.nodeValue, n, (e.mode & 1) !== 0);
                break;
              case 5:
                e.memoizedProps.suppressHydrationWarning !== !0 &&
                  cl(r.nodeValue, n, (e.mode & 1) !== 0);
            }
          o && (t.flags |= 4);
        } else
          (r = (n.nodeType === 9 ? n : n.ownerDocument).createTextNode(r)),
            (r[Tn] = t),
            (t.stateNode = r);
      }
      return ct(t), null;
    case 13:
      if (
        (De($e),
        (r = t.memoizedState),
        e === null ||
          (e.memoizedState !== null && e.memoizedState.dehydrated !== null))
      ) {
        if (Le && Ot !== null && t.mode & 1 && !(t.flags & 128))
          W0(), Ui(), (t.flags |= 98560), (o = !1);
        else if (((o = dl(t)), r !== null && r.dehydrated !== null)) {
          if (e === null) {
            if (!o) throw Error(B(318));
            if (
              ((o = t.memoizedState),
              (o = o !== null ? o.dehydrated : null),
              !o)
            )
              throw Error(B(317));
            o[Tn] = t;
          } else
            Ui(), !(t.flags & 128) && (t.memoizedState = null), (t.flags |= 4);
          ct(t), (o = !1);
        } else cn !== null && (Qd(cn), (cn = null)), (o = !0);
        if (!o) return t.flags & 65536 ? t : null;
      }
      return t.flags & 128
        ? ((t.lanes = n), t)
        : ((r = r !== null),
          r !== (e !== null && e.memoizedState !== null) &&
            r &&
            ((t.child.flags |= 8192),
            t.mode & 1 &&
              (e === null || $e.current & 1 ? Ye === 0 && (Ye = 3) : bp())),
          t.updateQueue !== null && (t.flags |= 4),
          ct(t),
          null);
    case 4:
      return (
        Gi(), Hd(e, t), e === null && na(t.stateNode.containerInfo), ct(t), null
      );
    case 10:
      return ip(t.type._context), ct(t), null;
    case 17:
      return Tt(t.type) && is(), ct(t), null;
    case 19:
      if ((De($e), (o = t.memoizedState), o === null)) return ct(t), null;
      if (((r = (t.flags & 128) !== 0), (a = o.rendering), a === null))
        if (r) vo(o, !1);
        else {
          if (Ye !== 0 || (e !== null && e.flags & 128))
            for (e = t.child; e !== null; ) {
              if (((a = ds(e)), a !== null)) {
                for (
                  t.flags |= 128,
                    vo(o, !1),
                    r = a.updateQueue,
                    r !== null && ((t.updateQueue = r), (t.flags |= 4)),
                    t.subtreeFlags = 0,
                    r = n,
                    n = t.child;
                  n !== null;

                )
                  (o = n),
                    (e = r),
                    (o.flags &= 14680066),
                    (a = o.alternate),
                    a === null
                      ? ((o.childLanes = 0),
                        (o.lanes = e),
                        (o.child = null),
                        (o.subtreeFlags = 0),
                        (o.memoizedProps = null),
                        (o.memoizedState = null),
                        (o.updateQueue = null),
                        (o.dependencies = null),
                        (o.stateNode = null))
                      : ((o.childLanes = a.childLanes),
                        (o.lanes = a.lanes),
                        (o.child = a.child),
                        (o.subtreeFlags = 0),
                        (o.deletions = null),
                        (o.memoizedProps = a.memoizedProps),
                        (o.memoizedState = a.memoizedState),
                        (o.updateQueue = a.updateQueue),
                        (o.type = a.type),
                        (e = a.dependencies),
                        (o.dependencies =
                          e === null
                            ? null
                            : {
                                lanes: e.lanes,
                                firstContext: e.firstContext,
                              })),
                    (n = n.sibling);
                return Te($e, ($e.current & 1) | 2), t.child;
              }
              e = e.sibling;
            }
          o.tail !== null &&
            He() > Vi &&
            ((t.flags |= 128), (r = !0), vo(o, !1), (t.lanes = 4194304));
        }
      else {
        if (!r)
          if (((e = ds(a)), e !== null)) {
            if (
              ((t.flags |= 128),
              (r = !0),
              (n = e.updateQueue),
              n !== null && ((t.updateQueue = n), (t.flags |= 4)),
              vo(o, !0),
              o.tail === null && o.tailMode === "hidden" && !a.alternate && !Le)
            )
              return ct(t), null;
          } else
            2 * He() - o.renderingStartTime > Vi &&
              n !== 1073741824 &&
              ((t.flags |= 128), (r = !0), vo(o, !1), (t.lanes = 4194304));
        o.isBackwards
          ? ((a.sibling = t.child), (t.child = a))
          : ((n = o.last),
            n !== null ? (n.sibling = a) : (t.child = a),
            (o.last = a));
      }
      return o.tail !== null
        ? ((t = o.tail),
          (o.rendering = t),
          (o.tail = t.sibling),
          (o.renderingStartTime = He()),
          (t.sibling = null),
          (n = $e.current),
          Te($e, r ? (n & 1) | 2 : n & 1),
          t)
        : (ct(t), null);
    case 22:
    case 23:
      return (
        wp(),
        (r = t.memoizedState !== null),
        e !== null && (e.memoizedState !== null) !== r && (t.flags |= 8192),
        r && t.mode & 1
          ? At & 1073741824 && (ct(t), t.subtreeFlags & 6 && (t.flags |= 8192))
          : ct(t),
        null
      );
    case 24:
      return null;
    case 25:
      return null;
  }
  throw Error(B(156, t.tag));
}
function KS(e, t) {
  switch ((ep(t), t.tag)) {
    case 1:
      return (
        Tt(t.type) && is(),
        (e = t.flags),
        e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
      );
    case 3:
      return (
        Gi(),
        De(Et),
        De(pt),
        up(),
        (e = t.flags),
        e & 65536 && !(e & 128) ? ((t.flags = (e & -65537) | 128), t) : null
      );
    case 5:
      return sp(t), null;
    case 13:
      if (
        (De($e), (e = t.memoizedState), e !== null && e.dehydrated !== null)
      ) {
        if (t.alternate === null) throw Error(B(340));
        Ui();
      }
      return (
        (e = t.flags), e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
      );
    case 19:
      return De($e), null;
    case 4:
      return Gi(), null;
    case 10:
      return ip(t.type._context), null;
    case 22:
    case 23:
      return wp(), null;
    case 24:
      return null;
    default:
      return null;
  }
}
var ml = !1,
  dt = !1,
  QS = typeof WeakSet == "function" ? WeakSet : Set,
  Y = null;
function Ii(e, t) {
  var n = e.ref;
  if (n !== null)
    if (typeof n == "function")
      try {
        n(null);
      } catch (r) {
        Ue(e, t, r);
      }
    else n.current = null;
}
function Gd(e, t, n) {
  try {
    n();
  } catch (r) {
    Ue(e, t, r);
  }
}
var Lh = !1;
function ZS(e, t) {
  if (((Pd = es), (e = j0()), Zf(e))) {
    if ("selectionStart" in e)
      var n = { start: e.selectionStart, end: e.selectionEnd };
    else
      e: {
        n = ((n = e.ownerDocument) && n.defaultView) || window;
        var r = n.getSelection && n.getSelection();
        if (r && r.rangeCount !== 0) {
          n = r.anchorNode;
          var i = r.anchorOffset,
            o = r.focusNode;
          r = r.focusOffset;
          try {
            n.nodeType, o.nodeType;
          } catch {
            n = null;
            break e;
          }
          var a = 0,
            l = -1,
            s = -1,
            u = 0,
            d = 0,
            c = e,
            f = null;
          t: for (;;) {
            for (
              var h;
              c !== n || (i !== 0 && c.nodeType !== 3) || (l = a + i),
                c !== o || (r !== 0 && c.nodeType !== 3) || (s = a + r),
                c.nodeType === 3 && (a += c.nodeValue.length),
                (h = c.firstChild) !== null;

            )
              (f = c), (c = h);
            for (;;) {
              if (c === e) break t;
              if (
                (f === n && ++u === i && (l = a),
                f === o && ++d === r && (s = a),
                (h = c.nextSibling) !== null)
              )
                break;
              (c = f), (f = c.parentNode);
            }
            c = h;
          }
          n = l === -1 || s === -1 ? null : { start: l, end: s };
        } else n = null;
      }
    n = n || { start: 0, end: 0 };
  } else n = null;
  for (Id = { focusedElem: e, selectionRange: n }, es = !1, Y = t; Y !== null; )
    if (((t = Y), (e = t.child), (t.subtreeFlags & 1028) !== 0 && e !== null))
      (e.return = t), (Y = e);
    else
      for (; Y !== null; ) {
        t = Y;
        try {
          var v = t.alternate;
          if (t.flags & 1024)
            switch (t.tag) {
              case 0:
              case 11:
              case 15:
                break;
              case 1:
                if (v !== null) {
                  var y = v.memoizedProps,
                    w = v.memoizedState,
                    m = t.stateNode,
                    g = m.getSnapshotBeforeUpdate(
                      t.elementType === t.type ? y : sn(t.type, y),
                      w
                    );
                  m.__reactInternalSnapshotBeforeUpdate = g;
                }
                break;
              case 3:
                var x = t.stateNode.containerInfo;
                x.nodeType === 1
                  ? (x.textContent = "")
                  : x.nodeType === 9 &&
                    x.documentElement &&
                    x.removeChild(x.documentElement);
                break;
              case 5:
              case 6:
              case 4:
              case 17:
                break;
              default:
                throw Error(B(163));
            }
        } catch (b) {
          Ue(t, t.return, b);
        }
        if (((e = t.sibling), e !== null)) {
          (e.return = t.return), (Y = e);
          break;
        }
        Y = t.return;
      }
  return (v = Lh), (Lh = !1), v;
}
function Bo(e, t, n) {
  var r = t.updateQueue;
  if (((r = r !== null ? r.lastEffect : null), r !== null)) {
    var i = (r = r.next);
    do {
      if ((i.tag & e) === e) {
        var o = i.destroy;
        (i.destroy = void 0), o !== void 0 && Gd(t, n, o);
      }
      i = i.next;
    } while (i !== r);
  }
}
function Ks(e, t) {
  if (
    ((t = t.updateQueue), (t = t !== null ? t.lastEffect : null), t !== null)
  ) {
    var n = (t = t.next);
    do {
      if ((n.tag & e) === e) {
        var r = n.create;
        n.destroy = r();
      }
      n = n.next;
    } while (n !== t);
  }
}
function Wd(e) {
  var t = e.ref;
  if (t !== null) {
    var n = e.stateNode;
    switch (e.tag) {
      case 5:
        e = n;
        break;
      default:
        e = n;
    }
    typeof t == "function" ? t(e) : (t.current = e);
  }
}
function A1(e) {
  var t = e.alternate;
  t !== null && ((e.alternate = null), A1(t)),
    (e.child = null),
    (e.deletions = null),
    (e.sibling = null),
    e.tag === 5 &&
      ((t = e.stateNode),
      t !== null &&
        (delete t[Tn], delete t[ia], delete t[Od], delete t[RS], delete t[LS])),
    (e.stateNode = null),
    (e.return = null),
    (e.dependencies = null),
    (e.memoizedProps = null),
    (e.memoizedState = null),
    (e.pendingProps = null),
    (e.stateNode = null),
    (e.updateQueue = null);
}
function D1(e) {
  return e.tag === 5 || e.tag === 3 || e.tag === 4;
}
function Mh(e) {
  e: for (;;) {
    for (; e.sibling === null; ) {
      if (e.return === null || D1(e.return)) return null;
      e = e.return;
    }
    for (
      e.sibling.return = e.return, e = e.sibling;
      e.tag !== 5 && e.tag !== 6 && e.tag !== 18;

    ) {
      if (e.flags & 2 || e.child === null || e.tag === 4) continue e;
      (e.child.return = e), (e = e.child);
    }
    if (!(e.flags & 2)) return e.stateNode;
  }
}
function Vd(e, t, n) {
  var r = e.tag;
  if (r === 5 || r === 6)
    (e = e.stateNode),
      t
        ? n.nodeType === 8
          ? n.parentNode.insertBefore(e, t)
          : n.insertBefore(e, t)
        : (n.nodeType === 8
            ? ((t = n.parentNode), t.insertBefore(e, n))
            : ((t = n), t.appendChild(e)),
          (n = n._reactRootContainer),
          n != null || t.onclick !== null || (t.onclick = rs));
  else if (r !== 4 && ((e = e.child), e !== null))
    for (Vd(e, t, n), e = e.sibling; e !== null; ) Vd(e, t, n), (e = e.sibling);
}
function qd(e, t, n) {
  var r = e.tag;
  if (r === 5 || r === 6)
    (e = e.stateNode), t ? n.insertBefore(e, t) : n.appendChild(e);
  else if (r !== 4 && ((e = e.child), e !== null))
    for (qd(e, t, n), e = e.sibling; e !== null; ) qd(e, t, n), (e = e.sibling);
}
var it = null,
  un = !1;
function qn(e, t, n) {
  for (n = n.child; n !== null; ) O1(e, t, n), (n = n.sibling);
}
function O1(e, t, n) {
  if (Pn && typeof Pn.onCommitFiberUnmount == "function")
    try {
      Pn.onCommitFiberUnmount(Us, n);
    } catch {}
  switch (n.tag) {
    case 5:
      dt || Ii(n, t);
    case 6:
      var r = it,
        i = un;
      (it = null),
        qn(e, t, n),
        (it = r),
        (un = i),
        it !== null &&
          (un
            ? ((e = it),
              (n = n.stateNode),
              e.nodeType === 8 ? e.parentNode.removeChild(n) : e.removeChild(n))
            : it.removeChild(n.stateNode));
      break;
    case 18:
      it !== null &&
        (un
          ? ((e = it),
            (n = n.stateNode),
            e.nodeType === 8
              ? dc(e.parentNode, n)
              : e.nodeType === 1 && dc(e, n),
            Jo(e))
          : dc(it, n.stateNode));
      break;
    case 4:
      (r = it),
        (i = un),
        (it = n.stateNode.containerInfo),
        (un = !0),
        qn(e, t, n),
        (it = r),
        (un = i);
      break;
    case 0:
    case 11:
    case 14:
    case 15:
      if (
        !dt &&
        ((r = n.updateQueue), r !== null && ((r = r.lastEffect), r !== null))
      ) {
        i = r = r.next;
        do {
          var o = i,
            a = o.destroy;
          (o = o.tag),
            a !== void 0 && (o & 2 || o & 4) && Gd(n, t, a),
            (i = i.next);
        } while (i !== r);
      }
      qn(e, t, n);
      break;
    case 1:
      if (
        !dt &&
        (Ii(n, t),
        (r = n.stateNode),
        typeof r.componentWillUnmount == "function")
      )
        try {
          (r.props = n.memoizedProps),
            (r.state = n.memoizedState),
            r.componentWillUnmount();
        } catch (l) {
          Ue(n, t, l);
        }
      qn(e, t, n);
      break;
    case 21:
      qn(e, t, n);
      break;
    case 22:
      n.mode & 1
        ? ((dt = (r = dt) || n.memoizedState !== null), qn(e, t, n), (dt = r))
        : qn(e, t, n);
      break;
    default:
      qn(e, t, n);
  }
}
function _h(e) {
  var t = e.updateQueue;
  if (t !== null) {
    e.updateQueue = null;
    var n = e.stateNode;
    n === null && (n = e.stateNode = new QS()),
      t.forEach(function (r) {
        var i = l2.bind(null, e, r);
        n.has(r) || (n.add(r), r.then(i, i));
      });
  }
}
function an(e, t) {
  var n = t.deletions;
  if (n !== null)
    for (var r = 0; r < n.length; r++) {
      var i = n[r];
      try {
        var o = e,
          a = t,
          l = a;
        e: for (; l !== null; ) {
          switch (l.tag) {
            case 5:
              (it = l.stateNode), (un = !1);
              break e;
            case 3:
              (it = l.stateNode.containerInfo), (un = !0);
              break e;
            case 4:
              (it = l.stateNode.containerInfo), (un = !0);
              break e;
          }
          l = l.return;
        }
        if (it === null) throw Error(B(160));
        O1(o, a, i), (it = null), (un = !1);
        var s = i.alternate;
        s !== null && (s.return = null), (i.return = null);
      } catch (u) {
        Ue(i, t, u);
      }
    }
  if (t.subtreeFlags & 12854)
    for (t = t.child; t !== null; ) j1(t, e), (t = t.sibling);
}
function j1(e, t) {
  var n = e.alternate,
    r = e.flags;
  switch (e.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
      if ((an(t, e), Sn(e), r & 4)) {
        try {
          Bo(3, e, e.return), Ks(3, e);
        } catch (y) {
          Ue(e, e.return, y);
        }
        try {
          Bo(5, e, e.return);
        } catch (y) {
          Ue(e, e.return, y);
        }
      }
      break;
    case 1:
      an(t, e), Sn(e), r & 512 && n !== null && Ii(n, n.return);
      break;
    case 5:
      if (
        (an(t, e),
        Sn(e),
        r & 512 && n !== null && Ii(n, n.return),
        e.flags & 32)
      ) {
        var i = e.stateNode;
        try {
          Xo(i, "");
        } catch (y) {
          Ue(e, e.return, y);
        }
      }
      if (r & 4 && ((i = e.stateNode), i != null)) {
        var o = e.memoizedProps,
          a = n !== null ? n.memoizedProps : o,
          l = e.type,
          s = e.updateQueue;
        if (((e.updateQueue = null), s !== null))
          try {
            l === "input" && o.type === "radio" && o.name != null && Jv(i, o),
              vd(l, a);
            var u = vd(l, o);
            for (a = 0; a < s.length; a += 2) {
              var d = s[a],
                c = s[a + 1];
              d === "style"
                ? i0(i, c)
                : d === "dangerouslySetInnerHTML"
                ? n0(i, c)
                : d === "children"
                ? Xo(i, c)
                : Bf(i, d, c, u);
            }
            switch (l) {
              case "input":
                fd(i, o);
                break;
              case "textarea":
                e0(i, o);
                break;
              case "select":
                var f = i._wrapperState.wasMultiple;
                i._wrapperState.wasMultiple = !!o.multiple;
                var h = o.value;
                h != null
                  ? Oi(i, !!o.multiple, h, !1)
                  : f !== !!o.multiple &&
                    (o.defaultValue != null
                      ? Oi(i, !!o.multiple, o.defaultValue, !0)
                      : Oi(i, !!o.multiple, o.multiple ? [] : "", !1));
            }
            i[ia] = o;
          } catch (y) {
            Ue(e, e.return, y);
          }
      }
      break;
    case 6:
      if ((an(t, e), Sn(e), r & 4)) {
        if (e.stateNode === null) throw Error(B(162));
        (i = e.stateNode), (o = e.memoizedProps);
        try {
          i.nodeValue = o;
        } catch (y) {
          Ue(e, e.return, y);
        }
      }
      break;
    case 3:
      if (
        (an(t, e), Sn(e), r & 4 && n !== null && n.memoizedState.isDehydrated)
      )
        try {
          Jo(t.containerInfo);
        } catch (y) {
          Ue(e, e.return, y);
        }
      break;
    case 4:
      an(t, e), Sn(e);
      break;
    case 13:
      an(t, e),
        Sn(e),
        (i = e.child),
        i.flags & 8192 &&
          ((o = i.memoizedState !== null),
          (i.stateNode.isHidden = o),
          !o ||
            (i.alternate !== null && i.alternate.memoizedState !== null) ||
            (yp = He())),
        r & 4 && _h(e);
      break;
    case 22:
      if (
        ((d = n !== null && n.memoizedState !== null),
        e.mode & 1 ? ((dt = (u = dt) || d), an(t, e), (dt = u)) : an(t, e),
        Sn(e),
        r & 8192)
      ) {
        if (
          ((u = e.memoizedState !== null),
          (e.stateNode.isHidden = u) && !d && e.mode & 1)
        )
          for (Y = e, d = e.child; d !== null; ) {
            for (c = Y = d; Y !== null; ) {
              switch (((f = Y), (h = f.child), f.tag)) {
                case 0:
                case 11:
                case 14:
                case 15:
                  Bo(4, f, f.return);
                  break;
                case 1:
                  Ii(f, f.return);
                  var v = f.stateNode;
                  if (typeof v.componentWillUnmount == "function") {
                    (r = f), (n = f.return);
                    try {
                      (t = r),
                        (v.props = t.memoizedProps),
                        (v.state = t.memoizedState),
                        v.componentWillUnmount();
                    } catch (y) {
                      Ue(r, n, y);
                    }
                  }
                  break;
                case 5:
                  Ii(f, f.return);
                  break;
                case 22:
                  if (f.memoizedState !== null) {
                    Bh(c);
                    continue;
                  }
              }
              h !== null ? ((h.return = f), (Y = h)) : Bh(c);
            }
            d = d.sibling;
          }
        e: for (d = null, c = e; ; ) {
          if (c.tag === 5) {
            if (d === null) {
              d = c;
              try {
                (i = c.stateNode),
                  u
                    ? ((o = i.style),
                      typeof o.setProperty == "function"
                        ? o.setProperty("display", "none", "important")
                        : (o.display = "none"))
                    : ((l = c.stateNode),
                      (s = c.memoizedProps.style),
                      (a =
                        s != null && s.hasOwnProperty("display")
                          ? s.display
                          : null),
                      (l.style.display = r0("display", a)));
              } catch (y) {
                Ue(e, e.return, y);
              }
            }
          } else if (c.tag === 6) {
            if (d === null)
              try {
                c.stateNode.nodeValue = u ? "" : c.memoizedProps;
              } catch (y) {
                Ue(e, e.return, y);
              }
          } else if (
            ((c.tag !== 22 && c.tag !== 23) ||
              c.memoizedState === null ||
              c === e) &&
            c.child !== null
          ) {
            (c.child.return = c), (c = c.child);
            continue;
          }
          if (c === e) break e;
          for (; c.sibling === null; ) {
            if (c.return === null || c.return === e) break e;
            d === c && (d = null), (c = c.return);
          }
          d === c && (d = null), (c.sibling.return = c.return), (c = c.sibling);
        }
      }
      break;
    case 19:
      an(t, e), Sn(e), r & 4 && _h(e);
      break;
    case 21:
      break;
    default:
      an(t, e), Sn(e);
  }
}
function Sn(e) {
  var t = e.flags;
  if (t & 2) {
    try {
      e: {
        for (var n = e.return; n !== null; ) {
          if (D1(n)) {
            var r = n;
            break e;
          }
          n = n.return;
        }
        throw Error(B(160));
      }
      switch (r.tag) {
        case 5:
          var i = r.stateNode;
          r.flags & 32 && (Xo(i, ""), (r.flags &= -33));
          var o = Mh(e);
          qd(e, o, i);
          break;
        case 3:
        case 4:
          var a = r.stateNode.containerInfo,
            l = Mh(e);
          Vd(e, l, a);
          break;
        default:
          throw Error(B(161));
      }
    } catch (s) {
      Ue(e, e.return, s);
    }
    e.flags &= -3;
  }
  t & 4096 && (e.flags &= -4097);
}
function JS(e, t, n) {
  (Y = e), N1(e);
}
function N1(e, t, n) {
  for (var r = (e.mode & 1) !== 0; Y !== null; ) {
    var i = Y,
      o = i.child;
    if (i.tag === 22 && r) {
      var a = i.memoizedState !== null || ml;
      if (!a) {
        var l = i.alternate,
          s = (l !== null && l.memoizedState !== null) || dt;
        l = ml;
        var u = dt;
        if (((ml = a), (dt = s) && !u))
          for (Y = i; Y !== null; )
            (a = Y),
              (s = a.child),
              a.tag === 22 && a.memoizedState !== null
                ? zh(i)
                : s !== null
                ? ((s.return = a), (Y = s))
                : zh(i);
        for (; o !== null; ) (Y = o), N1(o), (o = o.sibling);
        (Y = i), (ml = l), (dt = u);
      }
      $h(e);
    } else
      i.subtreeFlags & 8772 && o !== null ? ((o.return = i), (Y = o)) : $h(e);
  }
}
function $h(e) {
  for (; Y !== null; ) {
    var t = Y;
    if (t.flags & 8772) {
      var n = t.alternate;
      try {
        if (t.flags & 8772)
          switch (t.tag) {
            case 0:
            case 11:
            case 15:
              dt || Ks(5, t);
              break;
            case 1:
              var r = t.stateNode;
              if (t.flags & 4 && !dt)
                if (n === null) r.componentDidMount();
                else {
                  var i =
                    t.elementType === t.type
                      ? n.memoizedProps
                      : sn(t.type, n.memoizedProps);
                  r.componentDidUpdate(
                    i,
                    n.memoizedState,
                    r.__reactInternalSnapshotBeforeUpdate
                  );
                }
              var o = t.updateQueue;
              o !== null && bh(t, o, r);
              break;
            case 3:
              var a = t.updateQueue;
              if (a !== null) {
                if (((n = null), t.child !== null))
                  switch (t.child.tag) {
                    case 5:
                      n = t.child.stateNode;
                      break;
                    case 1:
                      n = t.child.stateNode;
                  }
                bh(t, a, n);
              }
              break;
            case 5:
              var l = t.stateNode;
              if (n === null && t.flags & 4) {
                n = l;
                var s = t.memoizedProps;
                switch (t.type) {
                  case "button":
                  case "input":
                  case "select":
                  case "textarea":
                    s.autoFocus && n.focus();
                    break;
                  case "img":
                    s.src && (n.src = s.src);
                }
              }
              break;
            case 6:
              break;
            case 4:
              break;
            case 12:
              break;
            case 13:
              if (t.memoizedState === null) {
                var u = t.alternate;
                if (u !== null) {
                  var d = u.memoizedState;
                  if (d !== null) {
                    var c = d.dehydrated;
                    c !== null && Jo(c);
                  }
                }
              }
              break;
            case 19:
            case 17:
            case 21:
            case 22:
            case 23:
            case 25:
              break;
            default:
              throw Error(B(163));
          }
        dt || (t.flags & 512 && Wd(t));
      } catch (f) {
        Ue(t, t.return, f);
      }
    }
    if (t === e) {
      Y = null;
      break;
    }
    if (((n = t.sibling), n !== null)) {
      (n.return = t.return), (Y = n);
      break;
    }
    Y = t.return;
  }
}
function Bh(e) {
  for (; Y !== null; ) {
    var t = Y;
    if (t === e) {
      Y = null;
      break;
    }
    var n = t.sibling;
    if (n !== null) {
      (n.return = t.return), (Y = n);
      break;
    }
    Y = t.return;
  }
}
function zh(e) {
  for (; Y !== null; ) {
    var t = Y;
    try {
      switch (t.tag) {
        case 0:
        case 11:
        case 15:
          var n = t.return;
          try {
            Ks(4, t);
          } catch (s) {
            Ue(t, n, s);
          }
          break;
        case 1:
          var r = t.stateNode;
          if (typeof r.componentDidMount == "function") {
            var i = t.return;
            try {
              r.componentDidMount();
            } catch (s) {
              Ue(t, i, s);
            }
          }
          var o = t.return;
          try {
            Wd(t);
          } catch (s) {
            Ue(t, o, s);
          }
          break;
        case 5:
          var a = t.return;
          try {
            Wd(t);
          } catch (s) {
            Ue(t, a, s);
          }
      }
    } catch (s) {
      Ue(t, t.return, s);
    }
    if (t === e) {
      Y = null;
      break;
    }
    var l = t.sibling;
    if (l !== null) {
      (l.return = t.return), (Y = l);
      break;
    }
    Y = t.return;
  }
}
var e2 = Math.ceil,
  ms = Vn.ReactCurrentDispatcher,
  gp = Vn.ReactCurrentOwner,
  Qt = Vn.ReactCurrentBatchConfig,
  he = 0,
  Je = null,
  We = null,
  lt = 0,
  At = 0,
  Ai = Pr(0),
  Ye = 0,
  ca = null,
  Kr = 0,
  Qs = 0,
  vp = 0,
  zo = null,
  bt = null,
  yp = 0,
  Vi = 1 / 0,
  Ln = null,
  hs = !1,
  Yd = null,
  cr = null,
  hl = !1,
  er = null,
  gs = 0,
  Fo = 0,
  Xd = null,
  $l = -1,
  Bl = 0;
function gt() {
  return he & 6 ? He() : $l !== -1 ? $l : ($l = He());
}
function dr(e) {
  return e.mode & 1
    ? he & 2 && lt !== 0
      ? lt & -lt
      : _S.transition !== null
      ? (Bl === 0 && (Bl = g0()), Bl)
      : ((e = xe),
        e !== 0 || ((e = window.event), (e = e === void 0 ? 16 : C0(e.type))),
        e)
    : 1;
}
function hn(e, t, n, r) {
  if (50 < Fo) throw ((Fo = 0), (Xd = null), Error(B(185)));
  Da(e, n, r),
    (!(he & 2) || e !== Je) &&
      (e === Je && (!(he & 2) && (Qs |= n), Ye === 4 && Qn(e, lt)),
      kt(e, r),
      n === 1 && he === 0 && !(t.mode & 1) && ((Vi = He() + 500), qs && Ir()));
}
function kt(e, t) {
  var n = e.callbackNode;
  _b(e, t);
  var r = Jl(e, e === Je ? lt : 0);
  if (r === 0)
    n !== null && Xm(n), (e.callbackNode = null), (e.callbackPriority = 0);
  else if (((t = r & -r), e.callbackPriority !== t)) {
    if ((n != null && Xm(n), t === 1))
      e.tag === 0 ? MS(Fh.bind(null, e)) : U0(Fh.bind(null, e)),
        jS(function () {
          !(he & 6) && Ir();
        }),
        (n = null);
    else {
      switch (v0(r)) {
        case 1:
          n = Gf;
          break;
        case 4:
          n = m0;
          break;
        case 16:
          n = Zl;
          break;
        case 536870912:
          n = h0;
          break;
        default:
          n = Zl;
      }
      n = F1(n, R1.bind(null, e));
    }
    (e.callbackPriority = t), (e.callbackNode = n);
  }
}
function R1(e, t) {
  if ((($l = -1), (Bl = 0), he & 6)) throw Error(B(327));
  var n = e.callbackNode;
  if (Mi() && e.callbackNode !== n) return null;
  var r = Jl(e, e === Je ? lt : 0);
  if (r === 0) return null;
  if (r & 30 || r & e.expiredLanes || t) t = vs(e, r);
  else {
    t = r;
    var i = he;
    he |= 2;
    var o = M1();
    (Je !== e || lt !== t) && ((Ln = null), (Vi = He() + 500), Hr(e, t));
    do
      try {
        r2();
        break;
      } catch (l) {
        L1(e, l);
      }
    while (1);
    rp(),
      (ms.current = o),
      (he = i),
      We !== null ? (t = 0) : ((Je = null), (lt = 0), (t = Ye));
  }
  if (t !== 0) {
    if (
      (t === 2 && ((i = Sd(e)), i !== 0 && ((r = i), (t = Kd(e, i)))), t === 1)
    )
      throw ((n = ca), Hr(e, 0), Qn(e, r), kt(e, He()), n);
    if (t === 6) Qn(e, r);
    else {
      if (
        ((i = e.current.alternate),
        !(r & 30) &&
          !t2(i) &&
          ((t = vs(e, r)),
          t === 2 && ((o = Sd(e)), o !== 0 && ((r = o), (t = Kd(e, o)))),
          t === 1))
      )
        throw ((n = ca), Hr(e, 0), Qn(e, r), kt(e, He()), n);
      switch (((e.finishedWork = i), (e.finishedLanes = r), t)) {
        case 0:
        case 1:
          throw Error(B(345));
        case 2:
          Lr(e, bt, Ln);
          break;
        case 3:
          if (
            (Qn(e, r), (r & 130023424) === r && ((t = yp + 500 - He()), 10 < t))
          ) {
            if (Jl(e, 0) !== 0) break;
            if (((i = e.suspendedLanes), (i & r) !== r)) {
              gt(), (e.pingedLanes |= e.suspendedLanes & i);
              break;
            }
            e.timeoutHandle = Dd(Lr.bind(null, e, bt, Ln), t);
            break;
          }
          Lr(e, bt, Ln);
          break;
        case 4:
          if ((Qn(e, r), (r & 4194240) === r)) break;
          for (t = e.eventTimes, i = -1; 0 < r; ) {
            var a = 31 - mn(r);
            (o = 1 << a), (a = t[a]), a > i && (i = a), (r &= ~o);
          }
          if (
            ((r = i),
            (r = He() - r),
            (r =
              (120 > r
                ? 120
                : 480 > r
                ? 480
                : 1080 > r
                ? 1080
                : 1920 > r
                ? 1920
                : 3e3 > r
                ? 3e3
                : 4320 > r
                ? 4320
                : 1960 * e2(r / 1960)) - r),
            10 < r)
          ) {
            e.timeoutHandle = Dd(Lr.bind(null, e, bt, Ln), r);
            break;
          }
          Lr(e, bt, Ln);
          break;
        case 5:
          Lr(e, bt, Ln);
          break;
        default:
          throw Error(B(329));
      }
    }
  }
  return kt(e, He()), e.callbackNode === n ? R1.bind(null, e) : null;
}
function Kd(e, t) {
  var n = zo;
  return (
    e.current.memoizedState.isDehydrated && (Hr(e, t).flags |= 256),
    (e = vs(e, t)),
    e !== 2 && ((t = bt), (bt = n), t !== null && Qd(t)),
    e
  );
}
function Qd(e) {
  bt === null ? (bt = e) : bt.push.apply(bt, e);
}
function t2(e) {
  for (var t = e; ; ) {
    if (t.flags & 16384) {
      var n = t.updateQueue;
      if (n !== null && ((n = n.stores), n !== null))
        for (var r = 0; r < n.length; r++) {
          var i = n[r],
            o = i.getSnapshot;
          i = i.value;
          try {
            if (!gn(o(), i)) return !1;
          } catch {
            return !1;
          }
        }
    }
    if (((n = t.child), t.subtreeFlags & 16384 && n !== null))
      (n.return = t), (t = n);
    else {
      if (t === e) break;
      for (; t.sibling === null; ) {
        if (t.return === null || t.return === e) return !0;
        t = t.return;
      }
      (t.sibling.return = t.return), (t = t.sibling);
    }
  }
  return !0;
}
function Qn(e, t) {
  for (
    t &= ~vp,
      t &= ~Qs,
      e.suspendedLanes |= t,
      e.pingedLanes &= ~t,
      e = e.expirationTimes;
    0 < t;

  ) {
    var n = 31 - mn(t),
      r = 1 << n;
    (e[n] = -1), (t &= ~r);
  }
}
function Fh(e) {
  if (he & 6) throw Error(B(327));
  Mi();
  var t = Jl(e, 0);
  if (!(t & 1)) return kt(e, He()), null;
  var n = vs(e, t);
  if (e.tag !== 0 && n === 2) {
    var r = Sd(e);
    r !== 0 && ((t = r), (n = Kd(e, r)));
  }
  if (n === 1) throw ((n = ca), Hr(e, 0), Qn(e, t), kt(e, He()), n);
  if (n === 6) throw Error(B(345));
  return (
    (e.finishedWork = e.current.alternate),
    (e.finishedLanes = t),
    Lr(e, bt, Ln),
    kt(e, He()),
    null
  );
}
function xp(e, t) {
  var n = he;
  he |= 1;
  try {
    return e(t);
  } finally {
    (he = n), he === 0 && ((Vi = He() + 500), qs && Ir());
  }
}
function Qr(e) {
  er !== null && er.tag === 0 && !(he & 6) && Mi();
  var t = he;
  he |= 1;
  var n = Qt.transition,
    r = xe;
  try {
    if (((Qt.transition = null), (xe = 1), e)) return e();
  } finally {
    (xe = r), (Qt.transition = n), (he = t), !(he & 6) && Ir();
  }
}
function wp() {
  (At = Ai.current), De(Ai);
}
function Hr(e, t) {
  (e.finishedWork = null), (e.finishedLanes = 0);
  var n = e.timeoutHandle;
  if ((n !== -1 && ((e.timeoutHandle = -1), OS(n)), We !== null))
    for (n = We.return; n !== null; ) {
      var r = n;
      switch ((ep(r), r.tag)) {
        case 1:
          (r = r.type.childContextTypes), r != null && is();
          break;
        case 3:
          Gi(), De(Et), De(pt), up();
          break;
        case 5:
          sp(r);
          break;
        case 4:
          Gi();
          break;
        case 13:
          De($e);
          break;
        case 19:
          De($e);
          break;
        case 10:
          ip(r.type._context);
          break;
        case 22:
        case 23:
          wp();
      }
      n = n.return;
    }
  if (
    ((Je = e),
    (We = e = fr(e.current, null)),
    (lt = At = t),
    (Ye = 0),
    (ca = null),
    (vp = Qs = Kr = 0),
    (bt = zo = null),
    Fr !== null)
  ) {
    for (t = 0; t < Fr.length; t++)
      if (((n = Fr[t]), (r = n.interleaved), r !== null)) {
        n.interleaved = null;
        var i = r.next,
          o = n.pending;
        if (o !== null) {
          var a = o.next;
          (o.next = i), (r.next = a);
        }
        n.pending = r;
      }
    Fr = null;
  }
  return e;
}
function L1(e, t) {
  do {
    var n = We;
    try {
      if ((rp(), (Ll.current = ps), fs)) {
        for (var r = Be.memoizedState; r !== null; ) {
          var i = r.queue;
          i !== null && (i.pending = null), (r = r.next);
        }
        fs = !1;
      }
      if (
        ((Xr = 0),
        (Ze = qe = Be = null),
        ($o = !1),
        (la = 0),
        (gp.current = null),
        n === null || n.return === null)
      ) {
        (Ye = 1), (ca = t), (We = null);
        break;
      }
      e: {
        var o = e,
          a = n.return,
          l = n,
          s = t;
        if (
          ((t = lt),
          (l.flags |= 32768),
          s !== null && typeof s == "object" && typeof s.then == "function")
        ) {
          var u = s,
            d = l,
            c = d.tag;
          if (!(d.mode & 1) && (c === 0 || c === 11 || c === 15)) {
            var f = d.alternate;
            f
              ? ((d.updateQueue = f.updateQueue),
                (d.memoizedState = f.memoizedState),
                (d.lanes = f.lanes))
              : ((d.updateQueue = null), (d.memoizedState = null));
          }
          var h = Ih(a);
          if (h !== null) {
            (h.flags &= -257),
              Ah(h, a, l, o, t),
              h.mode & 1 && Ph(o, u, t),
              (t = h),
              (s = u);
            var v = t.updateQueue;
            if (v === null) {
              var y = new Set();
              y.add(s), (t.updateQueue = y);
            } else v.add(s);
            break e;
          } else {
            if (!(t & 1)) {
              Ph(o, u, t), bp();
              break e;
            }
            s = Error(B(426));
          }
        } else if (Le && l.mode & 1) {
          var w = Ih(a);
          if (w !== null) {
            !(w.flags & 65536) && (w.flags |= 256),
              Ah(w, a, l, o, t),
              tp(Wi(s, l));
            break e;
          }
        }
        (o = s = Wi(s, l)),
          Ye !== 4 && (Ye = 2),
          zo === null ? (zo = [o]) : zo.push(o),
          (o = a);
        do {
          switch (o.tag) {
            case 3:
              (o.flags |= 65536), (t &= -t), (o.lanes |= t);
              var m = y1(o, s, t);
              wh(o, m);
              break e;
            case 1:
              l = s;
              var g = o.type,
                x = o.stateNode;
              if (
                !(o.flags & 128) &&
                (typeof g.getDerivedStateFromError == "function" ||
                  (x !== null &&
                    typeof x.componentDidCatch == "function" &&
                    (cr === null || !cr.has(x))))
              ) {
                (o.flags |= 65536), (t &= -t), (o.lanes |= t);
                var b = x1(o, l, t);
                wh(o, b);
                break e;
              }
          }
          o = o.return;
        } while (o !== null);
      }
      $1(n);
    } catch (C) {
      (t = C), We === n && n !== null && (We = n = n.return);
      continue;
    }
    break;
  } while (1);
}
function M1() {
  var e = ms.current;
  return (ms.current = ps), e === null ? ps : e;
}
function bp() {
  (Ye === 0 || Ye === 3 || Ye === 2) && (Ye = 4),
    Je === null || (!(Kr & 268435455) && !(Qs & 268435455)) || Qn(Je, lt);
}
function vs(e, t) {
  var n = he;
  he |= 2;
  var r = M1();
  (Je !== e || lt !== t) && ((Ln = null), Hr(e, t));
  do
    try {
      n2();
      break;
    } catch (i) {
      L1(e, i);
    }
  while (1);
  if ((rp(), (he = n), (ms.current = r), We !== null)) throw Error(B(261));
  return (Je = null), (lt = 0), Ye;
}
function n2() {
  for (; We !== null; ) _1(We);
}
function r2() {
  for (; We !== null && !Ib(); ) _1(We);
}
function _1(e) {
  var t = z1(e.alternate, e, At);
  (e.memoizedProps = e.pendingProps),
    t === null ? $1(e) : (We = t),
    (gp.current = null);
}
function $1(e) {
  var t = e;
  do {
    var n = t.alternate;
    if (((e = t.return), t.flags & 32768)) {
      if (((n = KS(n, t)), n !== null)) {
        (n.flags &= 32767), (We = n);
        return;
      }
      if (e !== null)
        (e.flags |= 32768), (e.subtreeFlags = 0), (e.deletions = null);
      else {
        (Ye = 6), (We = null);
        return;
      }
    } else if (((n = XS(n, t, At)), n !== null)) {
      We = n;
      return;
    }
    if (((t = t.sibling), t !== null)) {
      We = t;
      return;
    }
    We = t = e;
  } while (t !== null);
  Ye === 0 && (Ye = 5);
}
function Lr(e, t, n) {
  var r = xe,
    i = Qt.transition;
  try {
    (Qt.transition = null), (xe = 1), i2(e, t, n, r);
  } finally {
    (Qt.transition = i), (xe = r);
  }
  return null;
}
function i2(e, t, n, r) {
  do Mi();
  while (er !== null);
  if (he & 6) throw Error(B(327));
  n = e.finishedWork;
  var i = e.finishedLanes;
  if (n === null) return null;
  if (((e.finishedWork = null), (e.finishedLanes = 0), n === e.current))
    throw Error(B(177));
  (e.callbackNode = null), (e.callbackPriority = 0);
  var o = n.lanes | n.childLanes;
  if (
    ($b(e, o),
    e === Je && ((We = Je = null), (lt = 0)),
    (!(n.subtreeFlags & 2064) && !(n.flags & 2064)) ||
      hl ||
      ((hl = !0),
      F1(Zl, function () {
        return Mi(), null;
      })),
    (o = (n.flags & 15990) !== 0),
    n.subtreeFlags & 15990 || o)
  ) {
    (o = Qt.transition), (Qt.transition = null);
    var a = xe;
    xe = 1;
    var l = he;
    (he |= 4),
      (gp.current = null),
      ZS(e, n),
      j1(n, e),
      ES(Id),
      (es = !!Pd),
      (Id = Pd = null),
      (e.current = n),
      JS(n),
      Ab(),
      (he = l),
      (xe = a),
      (Qt.transition = o);
  } else e.current = n;
  if (
    (hl && ((hl = !1), (er = e), (gs = i)),
    (o = e.pendingLanes),
    o === 0 && (cr = null),
    jb(n.stateNode),
    kt(e, He()),
    t !== null)
  )
    for (r = e.onRecoverableError, n = 0; n < t.length; n++)
      (i = t[n]), r(i.value, { componentStack: i.stack, digest: i.digest });
  if (hs) throw ((hs = !1), (e = Yd), (Yd = null), e);
  return (
    gs & 1 && e.tag !== 0 && Mi(),
    (o = e.pendingLanes),
    o & 1 ? (e === Xd ? Fo++ : ((Fo = 0), (Xd = e))) : (Fo = 0),
    Ir(),
    null
  );
}
function Mi() {
  if (er !== null) {
    var e = v0(gs),
      t = Qt.transition,
      n = xe;
    try {
      if (((Qt.transition = null), (xe = 16 > e ? 16 : e), er === null))
        var r = !1;
      else {
        if (((e = er), (er = null), (gs = 0), he & 6)) throw Error(B(331));
        var i = he;
        for (he |= 4, Y = e.current; Y !== null; ) {
          var o = Y,
            a = o.child;
          if (Y.flags & 16) {
            var l = o.deletions;
            if (l !== null) {
              for (var s = 0; s < l.length; s++) {
                var u = l[s];
                for (Y = u; Y !== null; ) {
                  var d = Y;
                  switch (d.tag) {
                    case 0:
                    case 11:
                    case 15:
                      Bo(8, d, o);
                  }
                  var c = d.child;
                  if (c !== null) (c.return = d), (Y = c);
                  else
                    for (; Y !== null; ) {
                      d = Y;
                      var f = d.sibling,
                        h = d.return;
                      if ((A1(d), d === u)) {
                        Y = null;
                        break;
                      }
                      if (f !== null) {
                        (f.return = h), (Y = f);
                        break;
                      }
                      Y = h;
                    }
                }
              }
              var v = o.alternate;
              if (v !== null) {
                var y = v.child;
                if (y !== null) {
                  v.child = null;
                  do {
                    var w = y.sibling;
                    (y.sibling = null), (y = w);
                  } while (y !== null);
                }
              }
              Y = o;
            }
          }
          if (o.subtreeFlags & 2064 && a !== null) (a.return = o), (Y = a);
          else
            e: for (; Y !== null; ) {
              if (((o = Y), o.flags & 2048))
                switch (o.tag) {
                  case 0:
                  case 11:
                  case 15:
                    Bo(9, o, o.return);
                }
              var m = o.sibling;
              if (m !== null) {
                (m.return = o.return), (Y = m);
                break e;
              }
              Y = o.return;
            }
        }
        var g = e.current;
        for (Y = g; Y !== null; ) {
          a = Y;
          var x = a.child;
          if (a.subtreeFlags & 2064 && x !== null) (x.return = a), (Y = x);
          else
            e: for (a = g; Y !== null; ) {
              if (((l = Y), l.flags & 2048))
                try {
                  switch (l.tag) {
                    case 0:
                    case 11:
                    case 15:
                      Ks(9, l);
                  }
                } catch (C) {
                  Ue(l, l.return, C);
                }
              if (l === a) {
                Y = null;
                break e;
              }
              var b = l.sibling;
              if (b !== null) {
                (b.return = l.return), (Y = b);
                break e;
              }
              Y = l.return;
            }
        }
        if (
          ((he = i), Ir(), Pn && typeof Pn.onPostCommitFiberRoot == "function")
        )
          try {
            Pn.onPostCommitFiberRoot(Us, e);
          } catch {}
        r = !0;
      }
      return r;
    } finally {
      (xe = n), (Qt.transition = t);
    }
  }
  return !1;
}
function Uh(e, t, n) {
  (t = Wi(n, t)),
    (t = y1(e, t, 1)),
    (e = ur(e, t, 1)),
    (t = gt()),
    e !== null && (Da(e, 1, t), kt(e, t));
}
function Ue(e, t, n) {
  if (e.tag === 3) Uh(e, e, n);
  else
    for (; t !== null; ) {
      if (t.tag === 3) {
        Uh(t, e, n);
        break;
      } else if (t.tag === 1) {
        var r = t.stateNode;
        if (
          typeof t.type.getDerivedStateFromError == "function" ||
          (typeof r.componentDidCatch == "function" &&
            (cr === null || !cr.has(r)))
        ) {
          (e = Wi(n, e)),
            (e = x1(t, e, 1)),
            (t = ur(t, e, 1)),
            (e = gt()),
            t !== null && (Da(t, 1, e), kt(t, e));
          break;
        }
      }
      t = t.return;
    }
}
function o2(e, t, n) {
  var r = e.pingCache;
  r !== null && r.delete(t),
    (t = gt()),
    (e.pingedLanes |= e.suspendedLanes & n),
    Je === e &&
      (lt & n) === n &&
      (Ye === 4 || (Ye === 3 && (lt & 130023424) === lt && 500 > He() - yp)
        ? Hr(e, 0)
        : (vp |= n)),
    kt(e, t);
}
function B1(e, t) {
  t === 0 &&
    (e.mode & 1
      ? ((t = ol), (ol <<= 1), !(ol & 130023424) && (ol = 4194304))
      : (t = 1));
  var n = gt();
  (e = Hn(e, t)), e !== null && (Da(e, t, n), kt(e, n));
}
function a2(e) {
  var t = e.memoizedState,
    n = 0;
  t !== null && (n = t.retryLane), B1(e, n);
}
function l2(e, t) {
  var n = 0;
  switch (e.tag) {
    case 13:
      var r = e.stateNode,
        i = e.memoizedState;
      i !== null && (n = i.retryLane);
      break;
    case 19:
      r = e.stateNode;
      break;
    default:
      throw Error(B(314));
  }
  r !== null && r.delete(t), B1(e, n);
}
var z1;
z1 = function (e, t, n) {
  if (e !== null)
    if (e.memoizedProps !== t.pendingProps || Et.current) St = !0;
    else {
      if (!(e.lanes & n) && !(t.flags & 128)) return (St = !1), YS(e, t, n);
      St = !!(e.flags & 131072);
    }
  else (St = !1), Le && t.flags & 1048576 && H0(t, ls, t.index);
  switch (((t.lanes = 0), t.tag)) {
    case 2:
      var r = t.type;
      _l(e, t), (e = t.pendingProps);
      var i = Fi(t, pt.current);
      Li(t, n), (i = dp(null, t, r, e, i, n));
      var o = fp();
      return (
        (t.flags |= 1),
        typeof i == "object" &&
        i !== null &&
        typeof i.render == "function" &&
        i.$$typeof === void 0
          ? ((t.tag = 1),
            (t.memoizedState = null),
            (t.updateQueue = null),
            Tt(r) ? ((o = !0), os(t)) : (o = !1),
            (t.memoizedState =
              i.state !== null && i.state !== void 0 ? i.state : null),
            ap(t),
            (i.updater = Ys),
            (t.stateNode = i),
            (i._reactInternals = t),
            _d(t, r, e, n),
            (t = zd(null, t, r, !0, o, n)))
          : ((t.tag = 0), Le && o && Jf(t), ht(null, t, i, n), (t = t.child)),
        t
      );
    case 16:
      r = t.elementType;
      e: {
        switch (
          (_l(e, t),
          (e = t.pendingProps),
          (i = r._init),
          (r = i(r._payload)),
          (t.type = r),
          (i = t.tag = u2(r)),
          (e = sn(r, e)),
          i)
        ) {
          case 0:
            t = Bd(null, t, r, e, n);
            break e;
          case 1:
            t = jh(null, t, r, e, n);
            break e;
          case 11:
            t = Dh(null, t, r, e, n);
            break e;
          case 14:
            t = Oh(null, t, r, sn(r.type, e), n);
            break e;
        }
        throw Error(B(306, r, ""));
      }
      return t;
    case 0:
      return (
        (r = t.type),
        (i = t.pendingProps),
        (i = t.elementType === r ? i : sn(r, i)),
        Bd(e, t, r, i, n)
      );
    case 1:
      return (
        (r = t.type),
        (i = t.pendingProps),
        (i = t.elementType === r ? i : sn(r, i)),
        jh(e, t, r, i, n)
      );
    case 3:
      e: {
        if ((C1(t), e === null)) throw Error(B(387));
        (r = t.pendingProps),
          (o = t.memoizedState),
          (i = o.element),
          q0(e, t),
          cs(t, r, null, n);
        var a = t.memoizedState;
        if (((r = a.element), o.isDehydrated))
          if (
            ((o = {
              element: r,
              isDehydrated: !1,
              cache: a.cache,
              pendingSuspenseBoundaries: a.pendingSuspenseBoundaries,
              transitions: a.transitions,
            }),
            (t.updateQueue.baseState = o),
            (t.memoizedState = o),
            t.flags & 256)
          ) {
            (i = Wi(Error(B(423)), t)), (t = Nh(e, t, r, n, i));
            break e;
          } else if (r !== i) {
            (i = Wi(Error(B(424)), t)), (t = Nh(e, t, r, n, i));
            break e;
          } else
            for (
              Ot = sr(t.stateNode.containerInfo.firstChild),
                Nt = t,
                Le = !0,
                cn = null,
                n = Q0(t, null, r, n),
                t.child = n;
              n;

            )
              (n.flags = (n.flags & -3) | 4096), (n = n.sibling);
        else {
          if ((Ui(), r === i)) {
            t = Gn(e, t, n);
            break e;
          }
          ht(e, t, r, n);
        }
        t = t.child;
      }
      return t;
    case 5:
      return (
        Z0(t),
        e === null && Rd(t),
        (r = t.type),
        (i = t.pendingProps),
        (o = e !== null ? e.memoizedProps : null),
        (a = i.children),
        Ad(r, i) ? (a = null) : o !== null && Ad(r, o) && (t.flags |= 32),
        S1(e, t),
        ht(e, t, a, n),
        t.child
      );
    case 6:
      return e === null && Rd(t), null;
    case 13:
      return E1(e, t, n);
    case 4:
      return (
        lp(t, t.stateNode.containerInfo),
        (r = t.pendingProps),
        e === null ? (t.child = Hi(t, null, r, n)) : ht(e, t, r, n),
        t.child
      );
    case 11:
      return (
        (r = t.type),
        (i = t.pendingProps),
        (i = t.elementType === r ? i : sn(r, i)),
        Dh(e, t, r, i, n)
      );
    case 7:
      return ht(e, t, t.pendingProps, n), t.child;
    case 8:
      return ht(e, t, t.pendingProps.children, n), t.child;
    case 12:
      return ht(e, t, t.pendingProps.children, n), t.child;
    case 10:
      e: {
        if (
          ((r = t.type._context),
          (i = t.pendingProps),
          (o = t.memoizedProps),
          (a = i.value),
          Te(ss, r._currentValue),
          (r._currentValue = a),
          o !== null)
        )
          if (gn(o.value, a)) {
            if (o.children === i.children && !Et.current) {
              t = Gn(e, t, n);
              break e;
            }
          } else
            for (o = t.child, o !== null && (o.return = t); o !== null; ) {
              var l = o.dependencies;
              if (l !== null) {
                a = o.child;
                for (var s = l.firstContext; s !== null; ) {
                  if (s.context === r) {
                    if (o.tag === 1) {
                      (s = zn(-1, n & -n)), (s.tag = 2);
                      var u = o.updateQueue;
                      if (u !== null) {
                        u = u.shared;
                        var d = u.pending;
                        d === null
                          ? (s.next = s)
                          : ((s.next = d.next), (d.next = s)),
                          (u.pending = s);
                      }
                    }
                    (o.lanes |= n),
                      (s = o.alternate),
                      s !== null && (s.lanes |= n),
                      Ld(o.return, n, t),
                      (l.lanes |= n);
                    break;
                  }
                  s = s.next;
                }
              } else if (o.tag === 10) a = o.type === t.type ? null : o.child;
              else if (o.tag === 18) {
                if (((a = o.return), a === null)) throw Error(B(341));
                (a.lanes |= n),
                  (l = a.alternate),
                  l !== null && (l.lanes |= n),
                  Ld(a, n, t),
                  (a = o.sibling);
              } else a = o.child;
              if (a !== null) a.return = o;
              else
                for (a = o; a !== null; ) {
                  if (a === t) {
                    a = null;
                    break;
                  }
                  if (((o = a.sibling), o !== null)) {
                    (o.return = a.return), (a = o);
                    break;
                  }
                  a = a.return;
                }
              o = a;
            }
        ht(e, t, i.children, n), (t = t.child);
      }
      return t;
    case 9:
      return (
        (i = t.type),
        (r = t.pendingProps.children),
        Li(t, n),
        (i = Jt(i)),
        (r = r(i)),
        (t.flags |= 1),
        ht(e, t, r, n),
        t.child
      );
    case 14:
      return (
        (r = t.type),
        (i = sn(r, t.pendingProps)),
        (i = sn(r.type, i)),
        Oh(e, t, r, i, n)
      );
    case 15:
      return w1(e, t, t.type, t.pendingProps, n);
    case 17:
      return (
        (r = t.type),
        (i = t.pendingProps),
        (i = t.elementType === r ? i : sn(r, i)),
        _l(e, t),
        (t.tag = 1),
        Tt(r) ? ((e = !0), os(t)) : (e = !1),
        Li(t, n),
        X0(t, r, i),
        _d(t, r, i, n),
        zd(null, t, r, !0, e, n)
      );
    case 19:
      return T1(e, t, n);
    case 22:
      return b1(e, t, n);
  }
  throw Error(B(156, t.tag));
};
function F1(e, t) {
  return p0(e, t);
}
function s2(e, t, n, r) {
  (this.tag = e),
    (this.key = n),
    (this.sibling =
      this.child =
      this.return =
      this.stateNode =
      this.type =
      this.elementType =
        null),
    (this.index = 0),
    (this.ref = null),
    (this.pendingProps = t),
    (this.dependencies =
      this.memoizedState =
      this.updateQueue =
      this.memoizedProps =
        null),
    (this.mode = r),
    (this.subtreeFlags = this.flags = 0),
    (this.deletions = null),
    (this.childLanes = this.lanes = 0),
    (this.alternate = null);
}
function Xt(e, t, n, r) {
  return new s2(e, t, n, r);
}
function Sp(e) {
  return (e = e.prototype), !(!e || !e.isReactComponent);
}
function u2(e) {
  if (typeof e == "function") return Sp(e) ? 1 : 0;
  if (e != null) {
    if (((e = e.$$typeof), e === Ff)) return 11;
    if (e === Uf) return 14;
  }
  return 2;
}
function fr(e, t) {
  var n = e.alternate;
  return (
    n === null
      ? ((n = Xt(e.tag, t, e.key, e.mode)),
        (n.elementType = e.elementType),
        (n.type = e.type),
        (n.stateNode = e.stateNode),
        (n.alternate = e),
        (e.alternate = n))
      : ((n.pendingProps = t),
        (n.type = e.type),
        (n.flags = 0),
        (n.subtreeFlags = 0),
        (n.deletions = null)),
    (n.flags = e.flags & 14680064),
    (n.childLanes = e.childLanes),
    (n.lanes = e.lanes),
    (n.child = e.child),
    (n.memoizedProps = e.memoizedProps),
    (n.memoizedState = e.memoizedState),
    (n.updateQueue = e.updateQueue),
    (t = e.dependencies),
    (n.dependencies =
      t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }),
    (n.sibling = e.sibling),
    (n.index = e.index),
    (n.ref = e.ref),
    n
  );
}
function zl(e, t, n, r, i, o) {
  var a = 2;
  if (((r = e), typeof e == "function")) Sp(e) && (a = 1);
  else if (typeof e == "string") a = 5;
  else
    e: switch (e) {
      case xi:
        return Gr(n.children, i, o, t);
      case zf:
        (a = 8), (i |= 8);
        break;
      case ld:
        return (
          (e = Xt(12, n, t, i | 2)), (e.elementType = ld), (e.lanes = o), e
        );
      case sd:
        return (e = Xt(13, n, t, i)), (e.elementType = sd), (e.lanes = o), e;
      case ud:
        return (e = Xt(19, n, t, i)), (e.elementType = ud), (e.lanes = o), e;
      case Kv:
        return Zs(n, i, o, t);
      default:
        if (typeof e == "object" && e !== null)
          switch (e.$$typeof) {
            case Yv:
              a = 10;
              break e;
            case Xv:
              a = 9;
              break e;
            case Ff:
              a = 11;
              break e;
            case Uf:
              a = 14;
              break e;
            case Yn:
              (a = 16), (r = null);
              break e;
          }
        throw Error(B(130, e == null ? e : typeof e, ""));
    }
  return (
    (t = Xt(a, n, t, i)), (t.elementType = e), (t.type = r), (t.lanes = o), t
  );
}
function Gr(e, t, n, r) {
  return (e = Xt(7, e, r, t)), (e.lanes = n), e;
}
function Zs(e, t, n, r) {
  return (
    (e = Xt(22, e, r, t)),
    (e.elementType = Kv),
    (e.lanes = n),
    (e.stateNode = { isHidden: !1 }),
    e
  );
}
function xc(e, t, n) {
  return (e = Xt(6, e, null, t)), (e.lanes = n), e;
}
function wc(e, t, n) {
  return (
    (t = Xt(4, e.children !== null ? e.children : [], e.key, t)),
    (t.lanes = n),
    (t.stateNode = {
      containerInfo: e.containerInfo,
      pendingChildren: null,
      implementation: e.implementation,
    }),
    t
  );
}
function c2(e, t, n, r, i) {
  (this.tag = t),
    (this.containerInfo = e),
    (this.finishedWork =
      this.pingCache =
      this.current =
      this.pendingChildren =
        null),
    (this.timeoutHandle = -1),
    (this.callbackNode = this.pendingContext = this.context = null),
    (this.callbackPriority = 0),
    (this.eventTimes = ec(0)),
    (this.expirationTimes = ec(-1)),
    (this.entangledLanes =
      this.finishedLanes =
      this.mutableReadLanes =
      this.expiredLanes =
      this.pingedLanes =
      this.suspendedLanes =
      this.pendingLanes =
        0),
    (this.entanglements = ec(0)),
    (this.identifierPrefix = r),
    (this.onRecoverableError = i),
    (this.mutableSourceEagerHydrationData = null);
}
function Cp(e, t, n, r, i, o, a, l, s) {
  return (
    (e = new c2(e, t, n, l, s)),
    t === 1 ? ((t = 1), o === !0 && (t |= 8)) : (t = 0),
    (o = Xt(3, null, null, t)),
    (e.current = o),
    (o.stateNode = e),
    (o.memoizedState = {
      element: r,
      isDehydrated: n,
      cache: null,
      transitions: null,
      pendingSuspenseBoundaries: null,
    }),
    ap(o),
    e
  );
}
function d2(e, t, n) {
  var r = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
  return {
    $$typeof: yi,
    key: r == null ? null : "" + r,
    children: e,
    containerInfo: t,
    implementation: n,
  };
}
function U1(e) {
  if (!e) return Sr;
  e = e._reactInternals;
  e: {
    if (ai(e) !== e || e.tag !== 1) throw Error(B(170));
    var t = e;
    do {
      switch (t.tag) {
        case 3:
          t = t.stateNode.context;
          break e;
        case 1:
          if (Tt(t.type)) {
            t = t.stateNode.__reactInternalMemoizedMergedChildContext;
            break e;
          }
      }
      t = t.return;
    } while (t !== null);
    throw Error(B(171));
  }
  if (e.tag === 1) {
    var n = e.type;
    if (Tt(n)) return F0(e, n, t);
  }
  return t;
}
function H1(e, t, n, r, i, o, a, l, s) {
  return (
    (e = Cp(n, r, !0, e, i, o, a, l, s)),
    (e.context = U1(null)),
    (n = e.current),
    (r = gt()),
    (i = dr(n)),
    (o = zn(r, i)),
    (o.callback = t ?? null),
    ur(n, o, i),
    (e.current.lanes = i),
    Da(e, i, r),
    kt(e, r),
    e
  );
}
function Js(e, t, n, r) {
  var i = t.current,
    o = gt(),
    a = dr(i);
  return (
    (n = U1(n)),
    t.context === null ? (t.context = n) : (t.pendingContext = n),
    (t = zn(o, a)),
    (t.payload = { element: e }),
    (r = r === void 0 ? null : r),
    r !== null && (t.callback = r),
    (e = ur(i, t, a)),
    e !== null && (hn(e, i, a, o), Rl(e, i, a)),
    a
  );
}
function ys(e) {
  if (((e = e.current), !e.child)) return null;
  switch (e.child.tag) {
    case 5:
      return e.child.stateNode;
    default:
      return e.child.stateNode;
  }
}
function Hh(e, t) {
  if (((e = e.memoizedState), e !== null && e.dehydrated !== null)) {
    var n = e.retryLane;
    e.retryLane = n !== 0 && n < t ? n : t;
  }
}
function Ep(e, t) {
  Hh(e, t), (e = e.alternate) && Hh(e, t);
}
function f2() {
  return null;
}
var G1 =
  typeof reportError == "function"
    ? reportError
    : function (e) {
        console.error(e);
      };
function Tp(e) {
  this._internalRoot = e;
}
eu.prototype.render = Tp.prototype.render = function (e) {
  var t = this._internalRoot;
  if (t === null) throw Error(B(409));
  Js(e, t, null, null);
};
eu.prototype.unmount = Tp.prototype.unmount = function () {
  var e = this._internalRoot;
  if (e !== null) {
    this._internalRoot = null;
    var t = e.containerInfo;
    Qr(function () {
      Js(null, e, null, null);
    }),
      (t[Un] = null);
  }
};
function eu(e) {
  this._internalRoot = e;
}
eu.prototype.unstable_scheduleHydration = function (e) {
  if (e) {
    var t = w0();
    e = { blockedOn: null, target: e, priority: t };
    for (var n = 0; n < Kn.length && t !== 0 && t < Kn[n].priority; n++);
    Kn.splice(n, 0, e), n === 0 && S0(e);
  }
};
function kp(e) {
  return !(!e || (e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11));
}
function tu(e) {
  return !(
    !e ||
    (e.nodeType !== 1 &&
      e.nodeType !== 9 &&
      e.nodeType !== 11 &&
      (e.nodeType !== 8 || e.nodeValue !== " react-mount-point-unstable "))
  );
}
function Gh() {}
function p2(e, t, n, r, i) {
  if (i) {
    if (typeof r == "function") {
      var o = r;
      r = function () {
        var u = ys(a);
        o.call(u);
      };
    }
    var a = H1(t, r, e, 0, null, !1, !1, "", Gh);
    return (
      (e._reactRootContainer = a),
      (e[Un] = a.current),
      na(e.nodeType === 8 ? e.parentNode : e),
      Qr(),
      a
    );
  }
  for (; (i = e.lastChild); ) e.removeChild(i);
  if (typeof r == "function") {
    var l = r;
    r = function () {
      var u = ys(s);
      l.call(u);
    };
  }
  var s = Cp(e, 0, !1, null, null, !1, !1, "", Gh);
  return (
    (e._reactRootContainer = s),
    (e[Un] = s.current),
    na(e.nodeType === 8 ? e.parentNode : e),
    Qr(function () {
      Js(t, s, n, r);
    }),
    s
  );
}
function nu(e, t, n, r, i) {
  var o = n._reactRootContainer;
  if (o) {
    var a = o;
    if (typeof i == "function") {
      var l = i;
      i = function () {
        var s = ys(a);
        l.call(s);
      };
    }
    Js(t, a, e, i);
  } else a = p2(n, t, e, i, r);
  return ys(a);
}
y0 = function (e) {
  switch (e.tag) {
    case 3:
      var t = e.stateNode;
      if (t.current.memoizedState.isDehydrated) {
        var n = Ao(t.pendingLanes);
        n !== 0 &&
          (Wf(t, n | 1), kt(t, He()), !(he & 6) && ((Vi = He() + 500), Ir()));
      }
      break;
    case 13:
      Qr(function () {
        var r = Hn(e, 1);
        if (r !== null) {
          var i = gt();
          hn(r, e, 1, i);
        }
      }),
        Ep(e, 1);
  }
};
Vf = function (e) {
  if (e.tag === 13) {
    var t = Hn(e, 134217728);
    if (t !== null) {
      var n = gt();
      hn(t, e, 134217728, n);
    }
    Ep(e, 134217728);
  }
};
x0 = function (e) {
  if (e.tag === 13) {
    var t = dr(e),
      n = Hn(e, t);
    if (n !== null) {
      var r = gt();
      hn(n, e, t, r);
    }
    Ep(e, t);
  }
};
w0 = function () {
  return xe;
};
b0 = function (e, t) {
  var n = xe;
  try {
    return (xe = e), t();
  } finally {
    xe = n;
  }
};
xd = function (e, t, n) {
  switch (t) {
    case "input":
      if ((fd(e, n), (t = n.name), n.type === "radio" && t != null)) {
        for (n = e; n.parentNode; ) n = n.parentNode;
        for (
          n = n.querySelectorAll(
            "input[name=" + JSON.stringify("" + t) + '][type="radio"]'
          ),
            t = 0;
          t < n.length;
          t++
        ) {
          var r = n[t];
          if (r !== e && r.form === e.form) {
            var i = Vs(r);
            if (!i) throw Error(B(90));
            Zv(r), fd(r, i);
          }
        }
      }
      break;
    case "textarea":
      e0(e, n);
      break;
    case "select":
      (t = n.value), t != null && Oi(e, !!n.multiple, t, !1);
  }
};
l0 = xp;
s0 = Qr;
var m2 = { usingClientEntryPoint: !1, Events: [ja, Ci, Vs, o0, a0, xp] },
  yo = {
    findFiberByHostInstance: zr,
    bundleType: 0,
    version: "18.2.0",
    rendererPackageName: "react-dom",
  },
  h2 = {
    bundleType: yo.bundleType,
    version: yo.version,
    rendererPackageName: yo.rendererPackageName,
    rendererConfig: yo.rendererConfig,
    overrideHookState: null,
    overrideHookStateDeletePath: null,
    overrideHookStateRenamePath: null,
    overrideProps: null,
    overridePropsDeletePath: null,
    overridePropsRenamePath: null,
    setErrorHandler: null,
    setSuspenseHandler: null,
    scheduleUpdate: null,
    currentDispatcherRef: Vn.ReactCurrentDispatcher,
    findHostInstanceByFiber: function (e) {
      return (e = d0(e)), e === null ? null : e.stateNode;
    },
    findFiberByHostInstance: yo.findFiberByHostInstance || f2,
    findHostInstancesForRefresh: null,
    scheduleRefresh: null,
    scheduleRoot: null,
    setRefreshHandler: null,
    getCurrentFiber: null,
    reconcilerVersion: "18.2.0-next-9e3b772b8-20220608",
  };
if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
  var gl = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (!gl.isDisabled && gl.supportsFiber)
    try {
      (Us = gl.inject(h2)), (Pn = gl);
    } catch {}
}
Bt.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = m2;
Bt.createPortal = function (e, t) {
  var n = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
  if (!kp(t)) throw Error(B(200));
  return d2(e, t, null, n);
};
Bt.createRoot = function (e, t) {
  if (!kp(e)) throw Error(B(299));
  var n = !1,
    r = "",
    i = G1;
  return (
    t != null &&
      (t.unstable_strictMode === !0 && (n = !0),
      t.identifierPrefix !== void 0 && (r = t.identifierPrefix),
      t.onRecoverableError !== void 0 && (i = t.onRecoverableError)),
    (t = Cp(e, 1, !1, null, null, n, !1, r, i)),
    (e[Un] = t.current),
    na(e.nodeType === 8 ? e.parentNode : e),
    new Tp(t)
  );
};
Bt.findDOMNode = function (e) {
  if (e == null) return null;
  if (e.nodeType === 1) return e;
  var t = e._reactInternals;
  if (t === void 0)
    throw typeof e.render == "function"
      ? Error(B(188))
      : ((e = Object.keys(e).join(",")), Error(B(268, e)));
  return (e = d0(t)), (e = e === null ? null : e.stateNode), e;
};
Bt.flushSync = function (e) {
  return Qr(e);
};
Bt.hydrate = function (e, t, n) {
  if (!tu(t)) throw Error(B(200));
  return nu(null, e, t, !0, n);
};
Bt.hydrateRoot = function (e, t, n) {
  if (!kp(e)) throw Error(B(405));
  var r = (n != null && n.hydratedSources) || null,
    i = !1,
    o = "",
    a = G1;
  if (
    (n != null &&
      (n.unstable_strictMode === !0 && (i = !0),
      n.identifierPrefix !== void 0 && (o = n.identifierPrefix),
      n.onRecoverableError !== void 0 && (a = n.onRecoverableError)),
    (t = H1(t, null, e, 1, n ?? null, i, !1, o, a)),
    (e[Un] = t.current),
    na(e),
    r)
  )
    for (e = 0; e < r.length; e++)
      (n = r[e]),
        (i = n._getVersion),
        (i = i(n._source)),
        t.mutableSourceEagerHydrationData == null
          ? (t.mutableSourceEagerHydrationData = [n, i])
          : t.mutableSourceEagerHydrationData.push(n, i);
  return new eu(t);
};
Bt.render = function (e, t, n) {
  if (!tu(t)) throw Error(B(200));
  return nu(null, e, t, !1, n);
};
Bt.unmountComponentAtNode = function (e) {
  if (!tu(e)) throw Error(B(40));
  return e._reactRootContainer
    ? (Qr(function () {
        nu(null, null, e, !1, function () {
          (e._reactRootContainer = null), (e[Un] = null);
        });
      }),
      !0)
    : !1;
};
Bt.unstable_batchedUpdates = xp;
Bt.unstable_renderSubtreeIntoContainer = function (e, t, n, r) {
  if (!tu(n)) throw Error(B(200));
  if (e == null || e._reactInternals === void 0) throw Error(B(38));
  return nu(e, t, n, !1, r);
};
Bt.version = "18.2.0-next-9e3b772b8-20220608";
function W1() {
  if (
    !(
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" ||
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"
    )
  )
    try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(W1);
    } catch (e) {
      console.error(e);
    }
}
W1(), (Hv.exports = Bt);
var ru = Hv.exports;
const g2 = ii(ru);
var Wh = ru;
(od.createRoot = Wh.createRoot), (od.hydrateRoot = Wh.hydrateRoot);
/**
 * @remix-run/router v1.6.2
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */ function da() {
  return (
    (da = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n)
              Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
          }
          return e;
        }),
    da.apply(this, arguments)
  );
}
var tr;
(function (e) {
  (e.Pop = "POP"), (e.Push = "PUSH"), (e.Replace = "REPLACE");
})(tr || (tr = {}));
const Vh = "popstate";
function v2(e) {
  e === void 0 && (e = {});
  function t(r, i) {
    let { pathname: o, search: a, hash: l } = r.location;
    return Zd(
      "",
      { pathname: o, search: a, hash: l },
      (i.state && i.state.usr) || null,
      (i.state && i.state.key) || "default"
    );
  }
  function n(r, i) {
    return typeof i == "string" ? i : xs(i);
  }
  return x2(t, n, null, e);
}
function Ve(e, t) {
  if (e === !1 || e === null || typeof e > "u") throw new Error(t);
}
function Pp(e, t) {
  if (!e) {
    typeof console < "u" && console.warn(t);
    try {
      throw new Error(t);
    } catch {}
  }
}
function y2() {
  return Math.random().toString(36).substr(2, 8);
}
function qh(e, t) {
  return { usr: e.state, key: e.key, idx: t };
}
function Zd(e, t, n, r) {
  return (
    n === void 0 && (n = null),
    da(
      { pathname: typeof e == "string" ? e : e.pathname, search: "", hash: "" },
      typeof t == "string" ? io(t) : t,
      { state: n, key: (t && t.key) || r || y2() }
    )
  );
}
function xs(e) {
  let { pathname: t = "/", search: n = "", hash: r = "" } = e;
  return (
    n && n !== "?" && (t += n.charAt(0) === "?" ? n : "?" + n),
    r && r !== "#" && (t += r.charAt(0) === "#" ? r : "#" + r),
    t
  );
}
function io(e) {
  let t = {};
  if (e) {
    let n = e.indexOf("#");
    n >= 0 && ((t.hash = e.substr(n)), (e = e.substr(0, n)));
    let r = e.indexOf("?");
    r >= 0 && ((t.search = e.substr(r)), (e = e.substr(0, r))),
      e && (t.pathname = e);
  }
  return t;
}
function x2(e, t, n, r) {
  r === void 0 && (r = {});
  let { window: i = document.defaultView, v5Compat: o = !1 } = r,
    a = i.history,
    l = tr.Pop,
    s = null,
    u = d();
  u == null && ((u = 0), a.replaceState(da({}, a.state, { idx: u }), ""));
  function d() {
    return (a.state || { idx: null }).idx;
  }
  function c() {
    l = tr.Pop;
    let w = d(),
      m = w == null ? null : w - u;
    (u = w), s && s({ action: l, location: y.location, delta: m });
  }
  function f(w, m) {
    l = tr.Push;
    let g = Zd(y.location, w, m);
    n && n(g, w), (u = d() + 1);
    let x = qh(g, u),
      b = y.createHref(g);
    try {
      a.pushState(x, "", b);
    } catch {
      i.location.assign(b);
    }
    o && s && s({ action: l, location: y.location, delta: 1 });
  }
  function h(w, m) {
    l = tr.Replace;
    let g = Zd(y.location, w, m);
    n && n(g, w), (u = d());
    let x = qh(g, u),
      b = y.createHref(g);
    a.replaceState(x, "", b),
      o && s && s({ action: l, location: y.location, delta: 0 });
  }
  function v(w) {
    let m = i.location.origin !== "null" ? i.location.origin : i.location.href,
      g = typeof w == "string" ? w : xs(w);
    return (
      Ve(
        m,
        "No window.location.(origin|href) available to create URL for href: " +
          g
      ),
      new URL(g, m)
    );
  }
  let y = {
    get action() {
      return l;
    },
    get location() {
      return e(i, a);
    },
    listen(w) {
      if (s) throw new Error("A history only accepts one active listener");
      return (
        i.addEventListener(Vh, c),
        (s = w),
        () => {
          i.removeEventListener(Vh, c), (s = null);
        }
      );
    },
    createHref(w) {
      return t(i, w);
    },
    createURL: v,
    encodeLocation(w) {
      let m = v(w);
      return { pathname: m.pathname, search: m.search, hash: m.hash };
    },
    push: f,
    replace: h,
    go(w) {
      return a.go(w);
    },
  };
  return y;
}
var Yh;
(function (e) {
  (e.data = "data"),
    (e.deferred = "deferred"),
    (e.redirect = "redirect"),
    (e.error = "error");
})(Yh || (Yh = {}));
function w2(e, t, n) {
  n === void 0 && (n = "/");
  let r = typeof t == "string" ? io(t) : t,
    i = Ip(r.pathname || "/", n);
  if (i == null) return null;
  let o = V1(e);
  b2(o);
  let a = null;
  for (let l = 0; a == null && l < o.length; ++l) a = D2(o[l], N2(i));
  return a;
}
function V1(e, t, n, r) {
  t === void 0 && (t = []), n === void 0 && (n = []), r === void 0 && (r = "");
  let i = (o, a, l) => {
    let s = {
      relativePath: l === void 0 ? o.path || "" : l,
      caseSensitive: o.caseSensitive === !0,
      childrenIndex: a,
      route: o,
    };
    s.relativePath.startsWith("/") &&
      (Ve(
        s.relativePath.startsWith(r),
        'Absolute route path "' +
          s.relativePath +
          '" nested under path ' +
          ('"' + r + '" is not valid. An absolute child route path ') +
          "must start with the combined path of all its parent routes."
      ),
      (s.relativePath = s.relativePath.slice(r.length)));
    let u = pr([r, s.relativePath]),
      d = n.concat(s);
    o.children &&
      o.children.length > 0 &&
      (Ve(
        o.index !== !0,
        "Index routes must not have child routes. Please remove " +
          ('all child routes from route path "' + u + '".')
      ),
      V1(o.children, t, d, u)),
      !(o.path == null && !o.index) &&
        t.push({ path: u, score: I2(u, o.index), routesMeta: d });
  };
  return (
    e.forEach((o, a) => {
      var l;
      if (o.path === "" || !((l = o.path) != null && l.includes("?"))) i(o, a);
      else for (let s of q1(o.path)) i(o, a, s);
    }),
    t
  );
}
function q1(e) {
  let t = e.split("/");
  if (t.length === 0) return [];
  let [n, ...r] = t,
    i = n.endsWith("?"),
    o = n.replace(/\?$/, "");
  if (r.length === 0) return i ? [o, ""] : [o];
  let a = q1(r.join("/")),
    l = [];
  return (
    l.push(...a.map((s) => (s === "" ? o : [o, s].join("/")))),
    i && l.push(...a),
    l.map((s) => (e.startsWith("/") && s === "" ? "/" : s))
  );
}
function b2(e) {
  e.sort((t, n) =>
    t.score !== n.score
      ? n.score - t.score
      : A2(
          t.routesMeta.map((r) => r.childrenIndex),
          n.routesMeta.map((r) => r.childrenIndex)
        )
  );
}
const S2 = /^:\w+$/,
  C2 = 3,
  E2 = 2,
  T2 = 1,
  k2 = 10,
  P2 = -2,
  Xh = (e) => e === "*";
function I2(e, t) {
  let n = e.split("/"),
    r = n.length;
  return (
    n.some(Xh) && (r += P2),
    t && (r += E2),
    n
      .filter((i) => !Xh(i))
      .reduce((i, o) => i + (S2.test(o) ? C2 : o === "" ? T2 : k2), r)
  );
}
function A2(e, t) {
  return e.length === t.length && e.slice(0, -1).every((r, i) => r === t[i])
    ? e[e.length - 1] - t[t.length - 1]
    : 0;
}
function D2(e, t) {
  let { routesMeta: n } = e,
    r = {},
    i = "/",
    o = [];
  for (let a = 0; a < n.length; ++a) {
    let l = n[a],
      s = a === n.length - 1,
      u = i === "/" ? t : t.slice(i.length) || "/",
      d = O2(
        { path: l.relativePath, caseSensitive: l.caseSensitive, end: s },
        u
      );
    if (!d) return null;
    Object.assign(r, d.params);
    let c = l.route;
    o.push({
      params: r,
      pathname: pr([i, d.pathname]),
      pathnameBase: _2(pr([i, d.pathnameBase])),
      route: c,
    }),
      d.pathnameBase !== "/" && (i = pr([i, d.pathnameBase]));
  }
  return o;
}
function O2(e, t) {
  typeof e == "string" && (e = { path: e, caseSensitive: !1, end: !0 });
  let [n, r] = j2(e.path, e.caseSensitive, e.end),
    i = t.match(n);
  if (!i) return null;
  let o = i[0],
    a = o.replace(/(.)\/+$/, "$1"),
    l = i.slice(1);
  return {
    params: r.reduce((u, d, c) => {
      if (d === "*") {
        let f = l[c] || "";
        a = o.slice(0, o.length - f.length).replace(/(.)\/+$/, "$1");
      }
      return (u[d] = R2(l[c] || "", d)), u;
    }, {}),
    pathname: o,
    pathnameBase: a,
    pattern: e,
  };
}
function j2(e, t, n) {
  t === void 0 && (t = !1),
    n === void 0 && (n = !0),
    Pp(
      e === "*" || !e.endsWith("*") || e.endsWith("/*"),
      'Route path "' +
        e +
        '" will be treated as if it were ' +
        ('"' + e.replace(/\*$/, "/*") + '" because the `*` character must ') +
        "always follow a `/` in the pattern. To get rid of this warning, " +
        ('please change the route path to "' + e.replace(/\*$/, "/*") + '".')
    );
  let r = [],
    i =
      "^" +
      e
        .replace(/\/*\*?$/, "")
        .replace(/^\/*/, "/")
        .replace(/[\\.*+^$?{}|()[\]]/g, "\\$&")
        .replace(/\/:(\w+)/g, (a, l) => (r.push(l), "/([^\\/]+)"));
  return (
    e.endsWith("*")
      ? (r.push("*"),
        (i += e === "*" || e === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$"))
      : n
      ? (i += "\\/*$")
      : e !== "" && e !== "/" && (i += "(?:(?=\\/|$))"),
    [new RegExp(i, t ? void 0 : "i"), r]
  );
}
function N2(e) {
  try {
    return decodeURI(e);
  } catch (t) {
    return (
      Pp(
        !1,
        'The URL path "' +
          e +
          '" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent ' +
          ("encoding (" + t + ").")
      ),
      e
    );
  }
}
function R2(e, t) {
  try {
    return decodeURIComponent(e);
  } catch (n) {
    return (
      Pp(
        !1,
        'The value for the URL param "' +
          t +
          '" will not be decoded because' +
          (' the string "' +
            e +
            '" is a malformed URL segment. This is probably') +
          (" due to a bad percent encoding (" + n + ").")
      ),
      e
    );
  }
}
function Ip(e, t) {
  if (t === "/") return e;
  if (!e.toLowerCase().startsWith(t.toLowerCase())) return null;
  let n = t.endsWith("/") ? t.length - 1 : t.length,
    r = e.charAt(n);
  return r && r !== "/" ? null : e.slice(n) || "/";
}
function L2(e, t) {
  t === void 0 && (t = "/");
  let {
    pathname: n,
    search: r = "",
    hash: i = "",
  } = typeof e == "string" ? io(e) : e;
  return {
    pathname: n ? (n.startsWith("/") ? n : M2(n, t)) : t,
    search: $2(r),
    hash: B2(i),
  };
}
function M2(e, t) {
  let n = t.replace(/\/+$/, "").split("/");
  return (
    e.split("/").forEach((i) => {
      i === ".." ? n.length > 1 && n.pop() : i !== "." && n.push(i);
    }),
    n.length > 1 ? n.join("/") : "/"
  );
}
function bc(e, t, n, r) {
  return (
    "Cannot include a '" +
    e +
    "' character in a manually specified " +
    ("`to." +
      t +
      "` field [" +
      JSON.stringify(r) +
      "].  Please separate it out to the ") +
    ("`to." + n + "` field. Alternatively you may provide the full path as ") +
    'a string in <Link to="..."> and the router will parse it for you.'
  );
}
function Y1(e) {
  return e.filter(
    (t, n) => n === 0 || (t.route.path && t.route.path.length > 0)
  );
}
function X1(e, t, n, r) {
  r === void 0 && (r = !1);
  let i;
  typeof e == "string"
    ? (i = io(e))
    : ((i = da({}, e)),
      Ve(
        !i.pathname || !i.pathname.includes("?"),
        bc("?", "pathname", "search", i)
      ),
      Ve(
        !i.pathname || !i.pathname.includes("#"),
        bc("#", "pathname", "hash", i)
      ),
      Ve(!i.search || !i.search.includes("#"), bc("#", "search", "hash", i)));
  let o = e === "" || i.pathname === "",
    a = o ? "/" : i.pathname,
    l;
  if (r || a == null) l = n;
  else {
    let c = t.length - 1;
    if (a.startsWith("..")) {
      let f = a.split("/");
      for (; f[0] === ".."; ) f.shift(), (c -= 1);
      i.pathname = f.join("/");
    }
    l = c >= 0 ? t[c] : "/";
  }
  let s = L2(i, l),
    u = a && a !== "/" && a.endsWith("/"),
    d = (o || a === ".") && n.endsWith("/");
  return !s.pathname.endsWith("/") && (u || d) && (s.pathname += "/"), s;
}
const pr = (e) => e.join("/").replace(/\/\/+/g, "/"),
  _2 = (e) => e.replace(/\/+$/, "").replace(/^\/*/, "/"),
  $2 = (e) => (!e || e === "?" ? "" : e.startsWith("?") ? e : "?" + e),
  B2 = (e) => (!e || e === "#" ? "" : e.startsWith("#") ? e : "#" + e);
function z2(e) {
  return (
    e != null &&
    typeof e.status == "number" &&
    typeof e.statusText == "string" &&
    typeof e.internal == "boolean" &&
    "data" in e
  );
}
const K1 = ["post", "put", "patch", "delete"];
new Set(K1);
const F2 = ["get", ...K1];
new Set(F2);
/**
 * React Router v6.11.2
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */ function ws() {
  return (
    (ws = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n)
              Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
          }
          return e;
        }),
    ws.apply(this, arguments)
  );
}
const Ap = S.createContext(null),
  U2 = S.createContext(null),
  oo = S.createContext(null),
  iu = S.createContext(null),
  li = S.createContext({ outlet: null, matches: [], isDataRoute: !1 }),
  Q1 = S.createContext(null);
function H2(e, t) {
  let { relative: n } = t === void 0 ? {} : t;
  Ra() || Ve(!1);
  let { basename: r, navigator: i } = S.useContext(oo),
    { hash: o, pathname: a, search: l } = J1(e, { relative: n }),
    s = a;
  return (
    r !== "/" && (s = a === "/" ? r : pr([r, a])),
    i.createHref({ pathname: s, search: l, hash: o })
  );
}
function Ra() {
  return S.useContext(iu) != null;
}
function si() {
  return Ra() || Ve(!1), S.useContext(iu).location;
}
function Z1(e) {
  S.useContext(oo).static || S.useLayoutEffect(e);
}
function Dp() {
  let { isDataRoute: e } = S.useContext(li);
  return e ? nC() : G2();
}
function G2() {
  Ra() || Ve(!1);
  let e = S.useContext(Ap),
    { basename: t, navigator: n } = S.useContext(oo),
    { matches: r } = S.useContext(li),
    { pathname: i } = si(),
    o = JSON.stringify(Y1(r).map((s) => s.pathnameBase)),
    a = S.useRef(!1);
  return (
    Z1(() => {
      a.current = !0;
    }),
    S.useCallback(
      function (s, u) {
        if ((u === void 0 && (u = {}), !a.current)) return;
        if (typeof s == "number") {
          n.go(s);
          return;
        }
        let d = X1(s, JSON.parse(o), i, u.relative === "path");
        e == null &&
          t !== "/" &&
          (d.pathname = d.pathname === "/" ? t : pr([t, d.pathname])),
          (u.replace ? n.replace : n.push)(d, u.state, u);
      },
      [t, n, o, i, e]
    )
  );
}
function J1(e, t) {
  let { relative: n } = t === void 0 ? {} : t,
    { matches: r } = S.useContext(li),
    { pathname: i } = si(),
    o = JSON.stringify(Y1(r).map((a) => a.pathnameBase));
  return S.useMemo(() => X1(e, JSON.parse(o), i, n === "path"), [e, o, i, n]);
}
function W2(e, t) {
  return V2(e, t);
}
function V2(e, t, n) {
  Ra() || Ve(!1);
  let { navigator: r } = S.useContext(oo),
    { matches: i } = S.useContext(li),
    o = i[i.length - 1],
    a = o ? o.params : {};
  o && o.pathname;
  let l = o ? o.pathnameBase : "/";
  o && o.route;
  let s = si(),
    u;
  if (t) {
    var d;
    let y = typeof t == "string" ? io(t) : t;
    l === "/" || ((d = y.pathname) != null && d.startsWith(l)) || Ve(!1),
      (u = y);
  } else u = s;
  let c = u.pathname || "/",
    f = l === "/" ? c : c.slice(l.length) || "/",
    h = w2(e, { pathname: f }),
    v = Q2(
      h &&
        h.map((y) =>
          Object.assign({}, y, {
            params: Object.assign({}, a, y.params),
            pathname: pr([
              l,
              r.encodeLocation
                ? r.encodeLocation(y.pathname).pathname
                : y.pathname,
            ]),
            pathnameBase:
              y.pathnameBase === "/"
                ? l
                : pr([
                    l,
                    r.encodeLocation
                      ? r.encodeLocation(y.pathnameBase).pathname
                      : y.pathnameBase,
                  ]),
          })
        ),
      i,
      n
    );
  return t && v
    ? S.createElement(
        iu.Provider,
        {
          value: {
            location: ws(
              {
                pathname: "/",
                search: "",
                hash: "",
                state: null,
                key: "default",
              },
              u
            ),
            navigationType: tr.Pop,
          },
        },
        v
      )
    : v;
}
function q2() {
  let e = tC(),
    t = z2(e)
      ? e.status + " " + e.statusText
      : e instanceof Error
      ? e.message
      : JSON.stringify(e),
    n = e instanceof Error ? e.stack : null,
    i = { padding: "0.5rem", backgroundColor: "rgba(200,200,200, 0.5)" },
    o = null;
  return S.createElement(
    S.Fragment,
    null,
    S.createElement("h2", null, "Unexpected Application Error!"),
    S.createElement("h3", { style: { fontStyle: "italic" } }, t),
    n ? S.createElement("pre", { style: i }, n) : null,
    o
  );
}
const Y2 = S.createElement(q2, null);
class X2 extends S.Component {
  constructor(t) {
    super(t),
      (this.state = {
        location: t.location,
        revalidation: t.revalidation,
        error: t.error,
      });
  }
  static getDerivedStateFromError(t) {
    return { error: t };
  }
  static getDerivedStateFromProps(t, n) {
    return n.location !== t.location ||
      (n.revalidation !== "idle" && t.revalidation === "idle")
      ? { error: t.error, location: t.location, revalidation: t.revalidation }
      : {
          error: t.error || n.error,
          location: n.location,
          revalidation: t.revalidation || n.revalidation,
        };
  }
  componentDidCatch(t, n) {
    console.error(
      "React Router caught the following error during render",
      t,
      n
    );
  }
  render() {
    return this.state.error
      ? S.createElement(
          li.Provider,
          { value: this.props.routeContext },
          S.createElement(Q1.Provider, {
            value: this.state.error,
            children: this.props.component,
          })
        )
      : this.props.children;
  }
}
function K2(e) {
  let { routeContext: t, match: n, children: r } = e,
    i = S.useContext(Ap);
  return (
    i &&
      i.static &&
      i.staticContext &&
      (n.route.errorElement || n.route.ErrorBoundary) &&
      (i.staticContext._deepestRenderedBoundaryId = n.route.id),
    S.createElement(li.Provider, { value: t }, r)
  );
}
function Q2(e, t, n) {
  var r;
  if ((t === void 0 && (t = []), n === void 0 && (n = null), e == null)) {
    var i;
    if ((i = n) != null && i.errors) e = n.matches;
    else return null;
  }
  let o = e,
    a = (r = n) == null ? void 0 : r.errors;
  if (a != null) {
    let l = o.findIndex(
      (s) => s.route.id && (a == null ? void 0 : a[s.route.id])
    );
    l >= 0 || Ve(!1), (o = o.slice(0, Math.min(o.length, l + 1)));
  }
  return o.reduceRight((l, s, u) => {
    let d = s.route.id ? (a == null ? void 0 : a[s.route.id]) : null,
      c = null;
    n && (c = s.route.errorElement || Y2);
    let f = t.concat(o.slice(0, u + 1)),
      h = () => {
        let v;
        return (
          d
            ? (v = c)
            : s.route.Component
            ? (v = S.createElement(s.route.Component, null))
            : s.route.element
            ? (v = s.route.element)
            : (v = l),
          S.createElement(K2, {
            match: s,
            routeContext: { outlet: l, matches: f, isDataRoute: n != null },
            children: v,
          })
        );
      };
    return n && (s.route.ErrorBoundary || s.route.errorElement || u === 0)
      ? S.createElement(X2, {
          location: n.location,
          revalidation: n.revalidation,
          component: c,
          error: d,
          children: h(),
          routeContext: { outlet: null, matches: f, isDataRoute: !0 },
        })
      : h();
  }, null);
}
var Jd;
(function (e) {
  (e.UseBlocker = "useBlocker"),
    (e.UseRevalidator = "useRevalidator"),
    (e.UseNavigateStable = "useNavigate");
})(Jd || (Jd = {}));
var fa;
(function (e) {
  (e.UseBlocker = "useBlocker"),
    (e.UseLoaderData = "useLoaderData"),
    (e.UseActionData = "useActionData"),
    (e.UseRouteError = "useRouteError"),
    (e.UseNavigation = "useNavigation"),
    (e.UseRouteLoaderData = "useRouteLoaderData"),
    (e.UseMatches = "useMatches"),
    (e.UseRevalidator = "useRevalidator"),
    (e.UseNavigateStable = "useNavigate"),
    (e.UseRouteId = "useRouteId");
})(fa || (fa = {}));
function Z2(e) {
  let t = S.useContext(Ap);
  return t || Ve(!1), t;
}
function J2(e) {
  let t = S.useContext(U2);
  return t || Ve(!1), t;
}
function eC(e) {
  let t = S.useContext(li);
  return t || Ve(!1), t;
}
function ey(e) {
  let t = eC(),
    n = t.matches[t.matches.length - 1];
  return n.route.id || Ve(!1), n.route.id;
}
function tC() {
  var e;
  let t = S.useContext(Q1),
    n = J2(fa.UseRouteError),
    r = ey(fa.UseRouteError);
  return t || ((e = n.errors) == null ? void 0 : e[r]);
}
function nC() {
  let { router: e } = Z2(Jd.UseNavigateStable),
    t = ey(fa.UseNavigateStable),
    n = S.useRef(!1);
  return (
    Z1(() => {
      n.current = !0;
    }),
    S.useCallback(
      function (i, o) {
        o === void 0 && (o = {}),
          n.current &&
            (typeof i == "number"
              ? e.navigate(i)
              : e.navigate(i, ws({ fromRouteId: t }, o)));
      },
      [e, t]
    )
  );
}
function Mr(e) {
  Ve(!1);
}
function rC(e) {
  let {
    basename: t = "/",
    children: n = null,
    location: r,
    navigationType: i = tr.Pop,
    navigator: o,
    static: a = !1,
  } = e;
  Ra() && Ve(!1);
  let l = t.replace(/^\/*/, "/"),
    s = S.useMemo(() => ({ basename: l, navigator: o, static: a }), [l, o, a]);
  typeof r == "string" && (r = io(r));
  let {
      pathname: u = "/",
      search: d = "",
      hash: c = "",
      state: f = null,
      key: h = "default",
    } = r,
    v = S.useMemo(() => {
      let y = Ip(u, l);
      return y == null
        ? null
        : {
            location: { pathname: y, search: d, hash: c, state: f, key: h },
            navigationType: i,
          };
    }, [l, u, d, c, f, h, i]);
  return v == null
    ? null
    : S.createElement(
        oo.Provider,
        { value: s },
        S.createElement(iu.Provider, { children: n, value: v })
      );
}
function iC(e) {
  let { children: t, location: n } = e;
  return W2(ef(t), n);
}
var Kh;
(function (e) {
  (e[(e.pending = 0)] = "pending"),
    (e[(e.success = 1)] = "success"),
    (e[(e.error = 2)] = "error");
})(Kh || (Kh = {}));
new Promise(() => {});
function ef(e, t) {
  t === void 0 && (t = []);
  let n = [];
  return (
    S.Children.forEach(e, (r, i) => {
      if (!S.isValidElement(r)) return;
      let o = [...t, i];
      if (r.type === S.Fragment) {
        n.push.apply(n, ef(r.props.children, o));
        return;
      }
      r.type !== Mr && Ve(!1), !r.props.index || !r.props.children || Ve(!1);
      let a = {
        id: r.props.id || o.join("-"),
        caseSensitive: r.props.caseSensitive,
        element: r.props.element,
        Component: r.props.Component,
        index: r.props.index,
        path: r.props.path,
        loader: r.props.loader,
        action: r.props.action,
        errorElement: r.props.errorElement,
        ErrorBoundary: r.props.ErrorBoundary,
        hasErrorBoundary:
          r.props.ErrorBoundary != null || r.props.errorElement != null,
        shouldRevalidate: r.props.shouldRevalidate,
        handle: r.props.handle,
        lazy: r.props.lazy,
      };
      r.props.children && (a.children = ef(r.props.children, o)), n.push(a);
    }),
    n
  );
}
/**
 * React Router DOM v6.11.2
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */ function tf() {
  return (
    (tf = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n)
              Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
          }
          return e;
        }),
    tf.apply(this, arguments)
  );
}
function oC(e, t) {
  if (e == null) return {};
  var n = {},
    r = Object.keys(e),
    i,
    o;
  for (o = 0; o < r.length; o++)
    (i = r[o]), !(t.indexOf(i) >= 0) && (n[i] = e[i]);
  return n;
}
function aC(e) {
  return !!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey);
}
function lC(e, t) {
  return e.button === 0 && (!t || t === "_self") && !aC(e);
}
const sC = [
  "onClick",
  "relative",
  "reloadDocument",
  "replace",
  "state",
  "target",
  "to",
  "preventScrollReset",
];
function uC(e) {
  let { basename: t, children: n, window: r } = e,
    i = S.useRef();
  i.current == null && (i.current = v2({ window: r, v5Compat: !0 }));
  let o = i.current,
    [a, l] = S.useState({ action: o.action, location: o.location });
  return (
    S.useLayoutEffect(() => o.listen(l), [o]),
    S.createElement(rC, {
      basename: t,
      children: n,
      location: a.location,
      navigationType: a.action,
      navigator: o,
    })
  );
}
const cC =
    typeof window < "u" &&
    typeof window.document < "u" &&
    typeof window.document.createElement < "u",
  dC = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,
  ft = S.forwardRef(function (t, n) {
    let {
        onClick: r,
        relative: i,
        reloadDocument: o,
        replace: a,
        state: l,
        target: s,
        to: u,
        preventScrollReset: d,
      } = t,
      c = oC(t, sC),
      { basename: f } = S.useContext(oo),
      h,
      v = !1;
    if (typeof u == "string" && dC.test(u) && ((h = u), cC))
      try {
        let g = new URL(window.location.href),
          x = u.startsWith("//") ? new URL(g.protocol + u) : new URL(u),
          b = Ip(x.pathname, f);
        x.origin === g.origin && b != null
          ? (u = b + x.search + x.hash)
          : (v = !0);
      } catch {}
    let y = H2(u, { relative: i }),
      w = fC(u, {
        replace: a,
        state: l,
        target: s,
        preventScrollReset: d,
        relative: i,
      });
    function m(g) {
      r && r(g), g.defaultPrevented || w(g);
    }
    return S.createElement(
      "a",
      tf({}, c, { href: h || y, onClick: v || o ? r : m, ref: n, target: s })
    );
  });
var Qh;
(function (e) {
  (e.UseScrollRestoration = "useScrollRestoration"),
    (e.UseSubmitImpl = "useSubmitImpl"),
    (e.UseFetcher = "useFetcher");
})(Qh || (Qh = {}));
var Zh;
(function (e) {
  (e.UseFetchers = "useFetchers"),
    (e.UseScrollRestoration = "useScrollRestoration");
})(Zh || (Zh = {}));
function fC(e, t) {
  let {
      target: n,
      replace: r,
      state: i,
      preventScrollReset: o,
      relative: a,
    } = t === void 0 ? {} : t,
    l = Dp(),
    s = si(),
    u = J1(e, { relative: a });
  return S.useCallback(
    (d) => {
      if (lC(d, n)) {
        d.preventDefault();
        let c = r !== void 0 ? r : xs(s) === xs(u);
        l(e, { replace: c, state: i, preventScrollReset: o, relative: a });
      }
    },
    [s, l, u, r, i, n, e, o, a]
  );
}
var ty = { exports: {} },
  we = {};
/**
 * @license React
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Op = Symbol.for("react.element"),
  jp = Symbol.for("react.portal"),
  ou = Symbol.for("react.fragment"),
  au = Symbol.for("react.strict_mode"),
  lu = Symbol.for("react.profiler"),
  su = Symbol.for("react.provider"),
  uu = Symbol.for("react.context"),
  pC = Symbol.for("react.server_context"),
  cu = Symbol.for("react.forward_ref"),
  du = Symbol.for("react.suspense"),
  fu = Symbol.for("react.suspense_list"),
  pu = Symbol.for("react.memo"),
  mu = Symbol.for("react.lazy"),
  mC = Symbol.for("react.offscreen"),
  ny;
ny = Symbol.for("react.module.reference");
function nn(e) {
  if (typeof e == "object" && e !== null) {
    var t = e.$$typeof;
    switch (t) {
      case Op:
        switch (((e = e.type), e)) {
          case ou:
          case lu:
          case au:
          case du:
          case fu:
            return e;
          default:
            switch (((e = e && e.$$typeof), e)) {
              case pC:
              case uu:
              case cu:
              case mu:
              case pu:
              case su:
                return e;
              default:
                return t;
            }
        }
      case jp:
        return t;
    }
  }
}
we.ContextConsumer = uu;
we.ContextProvider = su;
we.Element = Op;
we.ForwardRef = cu;
we.Fragment = ou;
we.Lazy = mu;
we.Memo = pu;
we.Portal = jp;
we.Profiler = lu;
we.StrictMode = au;
we.Suspense = du;
we.SuspenseList = fu;
we.isAsyncMode = function () {
  return !1;
};
we.isConcurrentMode = function () {
  return !1;
};
we.isContextConsumer = function (e) {
  return nn(e) === uu;
};
we.isContextProvider = function (e) {
  return nn(e) === su;
};
we.isElement = function (e) {
  return typeof e == "object" && e !== null && e.$$typeof === Op;
};
we.isForwardRef = function (e) {
  return nn(e) === cu;
};
we.isFragment = function (e) {
  return nn(e) === ou;
};
we.isLazy = function (e) {
  return nn(e) === mu;
};
we.isMemo = function (e) {
  return nn(e) === pu;
};
we.isPortal = function (e) {
  return nn(e) === jp;
};
we.isProfiler = function (e) {
  return nn(e) === lu;
};
we.isStrictMode = function (e) {
  return nn(e) === au;
};
we.isSuspense = function (e) {
  return nn(e) === du;
};
we.isSuspenseList = function (e) {
  return nn(e) === fu;
};
we.isValidElementType = function (e) {
  return (
    typeof e == "string" ||
    typeof e == "function" ||
    e === ou ||
    e === lu ||
    e === au ||
    e === du ||
    e === fu ||
    e === mC ||
    (typeof e == "object" &&
      e !== null &&
      (e.$$typeof === mu ||
        e.$$typeof === pu ||
        e.$$typeof === su ||
        e.$$typeof === uu ||
        e.$$typeof === cu ||
        e.$$typeof === ny ||
        e.getModuleId !== void 0))
  );
};
we.typeOf = nn;
ty.exports = we;
var ry = ty.exports;
function hC(e) {
  function t($, _, G, X, j) {
    for (
      var ie = 0,
        F = 0,
        ye = 0,
        oe = 0,
        le,
        te,
        ke = 0,
        Ee = 0,
        se,
        Pe = (se = le = 0),
        de = 0,
        Fe = 0,
        Pt = 0,
        Ie = 0,
        wn = G.length,
        Ht = wn - 1,
        Xe,
        ne = "",
        Oe = "",
        ci = "",
        Dr = "",
        on;
      de < wn;

    ) {
      if (
        ((te = G.charCodeAt(de)),
        de === Ht &&
          F + oe + ye + ie !== 0 &&
          (F !== 0 && (te = F === 47 ? 10 : 47),
          (oe = ye = ie = 0),
          wn++,
          Ht++),
        F + oe + ye + ie === 0)
      ) {
        if (
          de === Ht &&
          (0 < Fe && (ne = ne.replace(f, "")), 0 < ne.trim().length)
        ) {
          switch (te) {
            case 32:
            case 9:
            case 59:
            case 13:
            case 10:
              break;
            default:
              ne += G.charAt(de);
          }
          te = 59;
        }
        switch (te) {
          case 123:
            for (
              ne = ne.trim(), le = ne.charCodeAt(0), se = 1, Ie = ++de;
              de < wn;

            ) {
              switch ((te = G.charCodeAt(de))) {
                case 123:
                  se++;
                  break;
                case 125:
                  se--;
                  break;
                case 47:
                  switch ((te = G.charCodeAt(de + 1))) {
                    case 42:
                    case 47:
                      e: {
                        for (Pe = de + 1; Pe < Ht; ++Pe)
                          switch (G.charCodeAt(Pe)) {
                            case 47:
                              if (
                                te === 42 &&
                                G.charCodeAt(Pe - 1) === 42 &&
                                de + 2 !== Pe
                              ) {
                                de = Pe + 1;
                                break e;
                              }
                              break;
                            case 10:
                              if (te === 47) {
                                de = Pe + 1;
                                break e;
                              }
                          }
                        de = Pe;
                      }
                  }
                  break;
                case 91:
                  te++;
                case 40:
                  te++;
                case 34:
                case 39:
                  for (; de++ < Ht && G.charCodeAt(de) !== te; );
              }
              if (se === 0) break;
              de++;
            }
            switch (
              ((se = G.substring(Ie, de)),
              le === 0 && (le = (ne = ne.replace(c, "").trim()).charCodeAt(0)),
              le)
            ) {
              case 64:
                switch (
                  (0 < Fe && (ne = ne.replace(f, "")),
                  (te = ne.charCodeAt(1)),
                  te)
                ) {
                  case 100:
                  case 109:
                  case 115:
                  case 45:
                    Fe = _;
                    break;
                  default:
                    Fe = J;
                }
                if (
                  ((se = t(_, Fe, se, te, j + 1)),
                  (Ie = se.length),
                  0 < L &&
                    ((Fe = n(J, ne, Pt)),
                    (on = l(3, se, Fe, _, A, N, Ie, te, j, X)),
                    (ne = Fe.join("")),
                    on !== void 0 &&
                      (Ie = (se = on.trim()).length) === 0 &&
                      ((te = 0), (se = ""))),
                  0 < Ie)
                )
                  switch (te) {
                    case 115:
                      ne = ne.replace(E, a);
                    case 100:
                    case 109:
                    case 45:
                      se = ne + "{" + se + "}";
                      break;
                    case 107:
                      (ne = ne.replace(g, "$1 $2")),
                        (se = ne + "{" + se + "}"),
                        (se =
                          V === 1 || (V === 2 && o("@" + se, 3))
                            ? "@-webkit-" + se + "@" + se
                            : "@" + se);
                      break;
                    default:
                      (se = ne + se), X === 112 && (se = ((Oe += se), ""));
                  }
                else se = "";
                break;
              default:
                se = t(_, n(_, ne, Pt), se, X, j + 1);
            }
            (ci += se),
              (se = Pt = Fe = Pe = le = 0),
              (ne = ""),
              (te = G.charCodeAt(++de));
            break;
          case 125:
          case 59:
            if (
              ((ne = (0 < Fe ? ne.replace(f, "") : ne).trim()),
              1 < (Ie = ne.length))
            )
              switch (
                (Pe === 0 &&
                  ((le = ne.charCodeAt(0)),
                  le === 45 || (96 < le && 123 > le)) &&
                  (Ie = (ne = ne.replace(" ", ":")).length),
                0 < L &&
                  (on = l(1, ne, _, $, A, N, Oe.length, X, j, X)) !== void 0 &&
                  (Ie = (ne = on.trim()).length) === 0 &&
                  (ne = "\0\0"),
                (le = ne.charCodeAt(0)),
                (te = ne.charCodeAt(1)),
                le)
              ) {
                case 0:
                  break;
                case 64:
                  if (te === 105 || te === 99) {
                    Dr += ne + G.charAt(de);
                    break;
                  }
                default:
                  ne.charCodeAt(Ie - 1) !== 58 &&
                    (Oe += i(ne, le, te, ne.charCodeAt(2)));
              }
            (Pt = Fe = Pe = le = 0), (ne = ""), (te = G.charCodeAt(++de));
        }
      }
      switch (te) {
        case 13:
        case 10:
          F === 47
            ? (F = 0)
            : 1 + le === 0 &&
              X !== 107 &&
              0 < ne.length &&
              ((Fe = 1), (ne += "\0")),
            0 < L * W && l(0, ne, _, $, A, N, Oe.length, X, j, X),
            (N = 1),
            A++;
          break;
        case 59:
        case 125:
          if (F + oe + ye + ie === 0) {
            N++;
            break;
          }
        default:
          switch ((N++, (Xe = G.charAt(de)), te)) {
            case 9:
            case 32:
              if (oe + ie + F === 0)
                switch (ke) {
                  case 44:
                  case 58:
                  case 9:
                  case 32:
                    Xe = "";
                    break;
                  default:
                    te !== 32 && (Xe = " ");
                }
              break;
            case 0:
              Xe = "\\0";
              break;
            case 12:
              Xe = "\\f";
              break;
            case 11:
              Xe = "\\v";
              break;
            case 38:
              oe + F + ie === 0 && ((Fe = Pt = 1), (Xe = "\f" + Xe));
              break;
            case 108:
              if (oe + F + ie + R === 0 && 0 < Pe)
                switch (de - Pe) {
                  case 2:
                    ke === 112 && G.charCodeAt(de - 3) === 58 && (R = ke);
                  case 8:
                    Ee === 111 && (R = Ee);
                }
              break;
            case 58:
              oe + F + ie === 0 && (Pe = de);
              break;
            case 44:
              F + ye + oe + ie === 0 && ((Fe = 1), (Xe += "\r"));
              break;
            case 34:
            case 39:
              F === 0 && (oe = oe === te ? 0 : oe === 0 ? te : oe);
              break;
            case 91:
              oe + F + ye === 0 && ie++;
              break;
            case 93:
              oe + F + ye === 0 && ie--;
              break;
            case 41:
              oe + F + ie === 0 && ye--;
              break;
            case 40:
              if (oe + F + ie === 0) {
                if (le === 0)
                  switch (2 * ke + 3 * Ee) {
                    case 533:
                      break;
                    default:
                      le = 1;
                  }
                ye++;
              }
              break;
            case 64:
              F + ye + oe + ie + Pe + se === 0 && (se = 1);
              break;
            case 42:
            case 47:
              if (!(0 < oe + ie + ye))
                switch (F) {
                  case 0:
                    switch (2 * te + 3 * G.charCodeAt(de + 1)) {
                      case 235:
                        F = 47;
                        break;
                      case 220:
                        (Ie = de), (F = 42);
                    }
                    break;
                  case 42:
                    te === 47 &&
                      ke === 42 &&
                      Ie + 2 !== de &&
                      (G.charCodeAt(Ie + 2) === 33 &&
                        (Oe += G.substring(Ie, de + 1)),
                      (Xe = ""),
                      (F = 0));
                }
          }
          F === 0 && (ne += Xe);
      }
      (Ee = ke), (ke = te), de++;
    }
    if (((Ie = Oe.length), 0 < Ie)) {
      if (
        ((Fe = _),
        0 < L &&
          ((on = l(2, Oe, Fe, $, A, N, Ie, X, j, X)),
          on !== void 0 && (Oe = on).length === 0))
      )
        return Dr + Oe + ci;
      if (((Oe = Fe.join(",") + "{" + Oe + "}"), V * R !== 0)) {
        switch ((V !== 2 || o(Oe, 2) || (R = 0), R)) {
          case 111:
            Oe = Oe.replace(b, ":-moz-$1") + Oe;
            break;
          case 112:
            Oe =
              Oe.replace(x, "::-webkit-input-$1") +
              Oe.replace(x, "::-moz-$1") +
              Oe.replace(x, ":-ms-input-$1") +
              Oe;
        }
        R = 0;
      }
    }
    return Dr + Oe + ci;
  }
  function n($, _, G) {
    var X = _.trim().split(w);
    _ = X;
    var j = X.length,
      ie = $.length;
    switch (ie) {
      case 0:
      case 1:
        var F = 0;
        for ($ = ie === 0 ? "" : $[0] + " "; F < j; ++F)
          _[F] = r($, _[F], G).trim();
        break;
      default:
        var ye = (F = 0);
        for (_ = []; F < j; ++F)
          for (var oe = 0; oe < ie; ++oe)
            _[ye++] = r($[oe] + " ", X[F], G).trim();
    }
    return _;
  }
  function r($, _, G) {
    var X = _.charCodeAt(0);
    switch ((33 > X && (X = (_ = _.trim()).charCodeAt(0)), X)) {
      case 38:
        return _.replace(m, "$1" + $.trim());
      case 58:
        return $.trim() + _.replace(m, "$1" + $.trim());
      default:
        if (0 < 1 * G && 0 < _.indexOf("\f"))
          return _.replace(m, ($.charCodeAt(0) === 58 ? "" : "$1") + $.trim());
    }
    return $ + _;
  }
  function i($, _, G, X) {
    var j = $ + ";",
      ie = 2 * _ + 3 * G + 4 * X;
    if (ie === 944) {
      $ = j.indexOf(":", 9) + 1;
      var F = j.substring($, j.length - 1).trim();
      return (
        (F = j.substring(0, $).trim() + F + ";"),
        V === 1 || (V === 2 && o(F, 1)) ? "-webkit-" + F + F : F
      );
    }
    if (V === 0 || (V === 2 && !o(j, 1))) return j;
    switch (ie) {
      case 1015:
        return j.charCodeAt(10) === 97 ? "-webkit-" + j + j : j;
      case 951:
        return j.charCodeAt(3) === 116 ? "-webkit-" + j + j : j;
      case 963:
        return j.charCodeAt(5) === 110 ? "-webkit-" + j + j : j;
      case 1009:
        if (j.charCodeAt(4) !== 100) break;
      case 969:
      case 942:
        return "-webkit-" + j + j;
      case 978:
        return "-webkit-" + j + "-moz-" + j + j;
      case 1019:
      case 983:
        return "-webkit-" + j + "-moz-" + j + "-ms-" + j + j;
      case 883:
        if (j.charCodeAt(8) === 45) return "-webkit-" + j + j;
        if (0 < j.indexOf("image-set(", 11))
          return j.replace(D, "$1-webkit-$2") + j;
        break;
      case 932:
        if (j.charCodeAt(4) === 45)
          switch (j.charCodeAt(5)) {
            case 103:
              return (
                "-webkit-box-" +
                j.replace("-grow", "") +
                "-webkit-" +
                j +
                "-ms-" +
                j.replace("grow", "positive") +
                j
              );
            case 115:
              return (
                "-webkit-" + j + "-ms-" + j.replace("shrink", "negative") + j
              );
            case 98:
              return (
                "-webkit-" +
                j +
                "-ms-" +
                j.replace("basis", "preferred-size") +
                j
              );
          }
        return "-webkit-" + j + "-ms-" + j + j;
      case 964:
        return "-webkit-" + j + "-ms-flex-" + j + j;
      case 1023:
        if (j.charCodeAt(8) !== 99) break;
        return (
          (F = j
            .substring(j.indexOf(":", 15))
            .replace("flex-", "")
            .replace("space-between", "justify")),
          "-webkit-box-pack" + F + "-webkit-" + j + "-ms-flex-pack" + F + j
        );
      case 1005:
        return v.test(j)
          ? j.replace(h, ":-webkit-") + j.replace(h, ":-moz-") + j
          : j;
      case 1e3:
        switch (
          ((F = j.substring(13).trim()),
          (_ = F.indexOf("-") + 1),
          F.charCodeAt(0) + F.charCodeAt(_))
        ) {
          case 226:
            F = j.replace(C, "tb");
            break;
          case 232:
            F = j.replace(C, "tb-rl");
            break;
          case 220:
            F = j.replace(C, "lr");
            break;
          default:
            return j;
        }
        return "-webkit-" + j + "-ms-" + F + j;
      case 1017:
        if (j.indexOf("sticky", 9) === -1) break;
      case 975:
        switch (
          ((_ = (j = $).length - 10),
          (F = (j.charCodeAt(_) === 33 ? j.substring(0, _) : j)
            .substring($.indexOf(":", 7) + 1)
            .trim()),
          (ie = F.charCodeAt(0) + (F.charCodeAt(7) | 0)))
        ) {
          case 203:
            if (111 > F.charCodeAt(8)) break;
          case 115:
            j = j.replace(F, "-webkit-" + F) + ";" + j;
            break;
          case 207:
          case 102:
            j =
              j.replace(F, "-webkit-" + (102 < ie ? "inline-" : "") + "box") +
              ";" +
              j.replace(F, "-webkit-" + F) +
              ";" +
              j.replace(F, "-ms-" + F + "box") +
              ";" +
              j;
        }
        return j + ";";
      case 938:
        if (j.charCodeAt(5) === 45)
          switch (j.charCodeAt(6)) {
            case 105:
              return (
                (F = j.replace("-items", "")),
                "-webkit-" + j + "-webkit-box-" + F + "-ms-flex-" + F + j
              );
            case 115:
              return "-webkit-" + j + "-ms-flex-item-" + j.replace(T, "") + j;
            default:
              return (
                "-webkit-" +
                j +
                "-ms-flex-line-pack" +
                j.replace("align-content", "").replace(T, "") +
                j
              );
          }
        break;
      case 973:
      case 989:
        if (j.charCodeAt(3) !== 45 || j.charCodeAt(4) === 122) break;
      case 931:
      case 953:
        if (O.test($) === !0)
          return (F = $.substring($.indexOf(":") + 1)).charCodeAt(0) === 115
            ? i($.replace("stretch", "fill-available"), _, G, X).replace(
                ":fill-available",
                ":stretch"
              )
            : j.replace(F, "-webkit-" + F) +
                j.replace(F, "-moz-" + F.replace("fill-", "")) +
                j;
        break;
      case 962:
        if (
          ((j =
            "-webkit-" + j + (j.charCodeAt(5) === 102 ? "-ms-" + j : "") + j),
          G + X === 211 &&
            j.charCodeAt(13) === 105 &&
            0 < j.indexOf("transform", 10))
        )
          return (
            j.substring(0, j.indexOf(";", 27) + 1).replace(y, "$1-webkit-$2") +
            j
          );
    }
    return j;
  }
  function o($, _) {
    var G = $.indexOf(_ === 1 ? ":" : "{"),
      X = $.substring(0, _ !== 3 ? G : 10);
    return (
      (G = $.substring(G + 1, $.length - 1)),
      M(_ !== 2 ? X : X.replace(I, "$1"), G, _)
    );
  }
  function a($, _) {
    var G = i(_, _.charCodeAt(0), _.charCodeAt(1), _.charCodeAt(2));
    return G !== _ + ";"
      ? G.replace(P, " or ($1)").substring(4)
      : "(" + _ + ")";
  }
  function l($, _, G, X, j, ie, F, ye, oe, le) {
    for (var te = 0, ke = _, Ee; te < L; ++te)
      switch ((Ee = re[te].call(d, $, ke, G, X, j, ie, F, ye, oe, le))) {
        case void 0:
        case !1:
        case !0:
        case null:
          break;
        default:
          ke = Ee;
      }
    if (ke !== _) return ke;
  }
  function s($) {
    switch ($) {
      case void 0:
      case null:
        L = re.length = 0;
        break;
      default:
        if (typeof $ == "function") re[L++] = $;
        else if (typeof $ == "object")
          for (var _ = 0, G = $.length; _ < G; ++_) s($[_]);
        else W = !!$ | 0;
    }
    return s;
  }
  function u($) {
    return (
      ($ = $.prefix),
      $ !== void 0 &&
        ((M = null),
        $ ? (typeof $ != "function" ? (V = 1) : ((V = 2), (M = $))) : (V = 0)),
      u
    );
  }
  function d($, _) {
    var G = $;
    if ((33 > G.charCodeAt(0) && (G = G.trim()), (K = G), (G = [K]), 0 < L)) {
      var X = l(-1, _, G, G, A, N, 0, 0, 0, 0);
      X !== void 0 && typeof X == "string" && (_ = X);
    }
    var j = t(J, G, _, 0, 0);
    return (
      0 < L &&
        ((X = l(-2, j, G, G, A, N, j.length, 0, 0, 0)),
        X !== void 0 && (j = X)),
      (K = ""),
      (R = 0),
      (N = A = 1),
      j
    );
  }
  var c = /^\0+/g,
    f = /[\0\r\f]/g,
    h = /: */g,
    v = /zoo|gra/,
    y = /([,: ])(transform)/g,
    w = /,\r+?/g,
    m = /([\t\r\n ])*\f?&/g,
    g = /@(k\w+)\s*(\S*)\s*/,
    x = /::(place)/g,
    b = /:(read-only)/g,
    C = /[svh]\w+-[tblr]{2}/,
    E = /\(\s*(.*)\s*\)/g,
    P = /([\s\S]*?);/g,
    T = /-self|flex-/g,
    I = /[^]*?(:[rp][el]a[\w-]+)[^]*/,
    O = /stretch|:\s*\w+\-(?:conte|avail)/,
    D = /([^-])(image-set\()/,
    N = 1,
    A = 1,
    R = 0,
    V = 1,
    J = [],
    re = [],
    L = 0,
    M = null,
    W = 0,
    K = "";
  return (d.use = s), (d.set = u), e !== void 0 && u(e), d;
}
var gC = {
  animationIterationCount: 1,
  borderImageOutset: 1,
  borderImageSlice: 1,
  borderImageWidth: 1,
  boxFlex: 1,
  boxFlexGroup: 1,
  boxOrdinalGroup: 1,
  columnCount: 1,
  columns: 1,
  flex: 1,
  flexGrow: 1,
  flexPositive: 1,
  flexShrink: 1,
  flexNegative: 1,
  flexOrder: 1,
  gridRow: 1,
  gridRowEnd: 1,
  gridRowSpan: 1,
  gridRowStart: 1,
  gridColumn: 1,
  gridColumnEnd: 1,
  gridColumnSpan: 1,
  gridColumnStart: 1,
  msGridRow: 1,
  msGridRowSpan: 1,
  msGridColumn: 1,
  msGridColumnSpan: 1,
  fontWeight: 1,
  lineHeight: 1,
  opacity: 1,
  order: 1,
  orphans: 1,
  tabSize: 1,
  widows: 1,
  zIndex: 1,
  zoom: 1,
  WebkitLineClamp: 1,
  fillOpacity: 1,
  floodOpacity: 1,
  stopOpacity: 1,
  strokeDasharray: 1,
  strokeDashoffset: 1,
  strokeMiterlimit: 1,
  strokeOpacity: 1,
  strokeWidth: 1,
};
function vC(e) {
  var t = Object.create(null);
  return function (n) {
    return t[n] === void 0 && (t[n] = e(n)), t[n];
  };
}
var yC =
    /^((children|dangerouslySetInnerHTML|key|ref|autoFocus|defaultValue|defaultChecked|innerHTML|suppressContentEditableWarning|suppressHydrationWarning|valueLink|abbr|accept|acceptCharset|accessKey|action|allow|allowUserMedia|allowPaymentRequest|allowFullScreen|allowTransparency|alt|async|autoComplete|autoPlay|capture|cellPadding|cellSpacing|challenge|charSet|checked|cite|classID|className|cols|colSpan|content|contentEditable|contextMenu|controls|controlsList|coords|crossOrigin|data|dateTime|decoding|default|defer|dir|disabled|disablePictureInPicture|download|draggable|encType|enterKeyHint|form|formAction|formEncType|formMethod|formNoValidate|formTarget|frameBorder|headers|height|hidden|high|href|hrefLang|htmlFor|httpEquiv|id|inputMode|integrity|is|keyParams|keyType|kind|label|lang|list|loading|loop|low|marginHeight|marginWidth|max|maxLength|media|mediaGroup|method|min|minLength|multiple|muted|name|nonce|noValidate|open|optimum|pattern|placeholder|playsInline|poster|preload|profile|radioGroup|readOnly|referrerPolicy|rel|required|reversed|role|rows|rowSpan|sandbox|scope|scoped|scrolling|seamless|selected|shape|size|sizes|slot|span|spellCheck|src|srcDoc|srcLang|srcSet|start|step|style|summary|tabIndex|target|title|translate|type|useMap|value|width|wmode|wrap|about|datatype|inlist|prefix|property|resource|typeof|vocab|autoCapitalize|autoCorrect|autoSave|color|incremental|fallback|inert|itemProp|itemScope|itemType|itemID|itemRef|on|option|results|security|unselectable|accentHeight|accumulate|additive|alignmentBaseline|allowReorder|alphabetic|amplitude|arabicForm|ascent|attributeName|attributeType|autoReverse|azimuth|baseFrequency|baselineShift|baseProfile|bbox|begin|bias|by|calcMode|capHeight|clip|clipPathUnits|clipPath|clipRule|colorInterpolation|colorInterpolationFilters|colorProfile|colorRendering|contentScriptType|contentStyleType|cursor|cx|cy|d|decelerate|descent|diffuseConstant|direction|display|divisor|dominantBaseline|dur|dx|dy|edgeMode|elevation|enableBackground|end|exponent|externalResourcesRequired|fill|fillOpacity|fillRule|filter|filterRes|filterUnits|floodColor|floodOpacity|focusable|fontFamily|fontSize|fontSizeAdjust|fontStretch|fontStyle|fontVariant|fontWeight|format|from|fr|fx|fy|g1|g2|glyphName|glyphOrientationHorizontal|glyphOrientationVertical|glyphRef|gradientTransform|gradientUnits|hanging|horizAdvX|horizOriginX|ideographic|imageRendering|in|in2|intercept|k|k1|k2|k3|k4|kernelMatrix|kernelUnitLength|kerning|keyPoints|keySplines|keyTimes|lengthAdjust|letterSpacing|lightingColor|limitingConeAngle|local|markerEnd|markerMid|markerStart|markerHeight|markerUnits|markerWidth|mask|maskContentUnits|maskUnits|mathematical|mode|numOctaves|offset|opacity|operator|order|orient|orientation|origin|overflow|overlinePosition|overlineThickness|panose1|paintOrder|pathLength|patternContentUnits|patternTransform|patternUnits|pointerEvents|points|pointsAtX|pointsAtY|pointsAtZ|preserveAlpha|preserveAspectRatio|primitiveUnits|r|radius|refX|refY|renderingIntent|repeatCount|repeatDur|requiredExtensions|requiredFeatures|restart|result|rotate|rx|ry|scale|seed|shapeRendering|slope|spacing|specularConstant|specularExponent|speed|spreadMethod|startOffset|stdDeviation|stemh|stemv|stitchTiles|stopColor|stopOpacity|strikethroughPosition|strikethroughThickness|string|stroke|strokeDasharray|strokeDashoffset|strokeLinecap|strokeLinejoin|strokeMiterlimit|strokeOpacity|strokeWidth|surfaceScale|systemLanguage|tableValues|targetX|targetY|textAnchor|textDecoration|textRendering|textLength|to|transform|u1|u2|underlinePosition|underlineThickness|unicode|unicodeBidi|unicodeRange|unitsPerEm|vAlphabetic|vHanging|vIdeographic|vMathematical|values|vectorEffect|version|vertAdvY|vertOriginX|vertOriginY|viewBox|viewTarget|visibility|widths|wordSpacing|writingMode|x|xHeight|x1|x2|xChannelSelector|xlinkActuate|xlinkArcrole|xlinkHref|xlinkRole|xlinkShow|xlinkTitle|xlinkType|xmlBase|xmlns|xmlnsXlink|xmlLang|xmlSpace|y|y1|y2|yChannelSelector|z|zoomAndPan|for|class|autofocus)|(([Dd][Aa][Tt][Aa]|[Aa][Rr][Ii][Aa]|x)-.*))$/,
  Jh = vC(function (e) {
    return (
      yC.test(e) ||
      (e.charCodeAt(0) === 111 &&
        e.charCodeAt(1) === 110 &&
        e.charCodeAt(2) < 91)
    );
  }),
  iy = { exports: {} },
  be = {};
/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var nt = typeof Symbol == "function" && Symbol.for,
  Np = nt ? Symbol.for("react.element") : 60103,
  Rp = nt ? Symbol.for("react.portal") : 60106,
  hu = nt ? Symbol.for("react.fragment") : 60107,
  gu = nt ? Symbol.for("react.strict_mode") : 60108,
  vu = nt ? Symbol.for("react.profiler") : 60114,
  yu = nt ? Symbol.for("react.provider") : 60109,
  xu = nt ? Symbol.for("react.context") : 60110,
  Lp = nt ? Symbol.for("react.async_mode") : 60111,
  wu = nt ? Symbol.for("react.concurrent_mode") : 60111,
  bu = nt ? Symbol.for("react.forward_ref") : 60112,
  Su = nt ? Symbol.for("react.suspense") : 60113,
  xC = nt ? Symbol.for("react.suspense_list") : 60120,
  Cu = nt ? Symbol.for("react.memo") : 60115,
  Eu = nt ? Symbol.for("react.lazy") : 60116,
  wC = nt ? Symbol.for("react.block") : 60121,
  bC = nt ? Symbol.for("react.fundamental") : 60117,
  SC = nt ? Symbol.for("react.responder") : 60118,
  CC = nt ? Symbol.for("react.scope") : 60119;
function Ft(e) {
  if (typeof e == "object" && e !== null) {
    var t = e.$$typeof;
    switch (t) {
      case Np:
        switch (((e = e.type), e)) {
          case Lp:
          case wu:
          case hu:
          case vu:
          case gu:
          case Su:
            return e;
          default:
            switch (((e = e && e.$$typeof), e)) {
              case xu:
              case bu:
              case Eu:
              case Cu:
              case yu:
                return e;
              default:
                return t;
            }
        }
      case Rp:
        return t;
    }
  }
}
function oy(e) {
  return Ft(e) === wu;
}
be.AsyncMode = Lp;
be.ConcurrentMode = wu;
be.ContextConsumer = xu;
be.ContextProvider = yu;
be.Element = Np;
be.ForwardRef = bu;
be.Fragment = hu;
be.Lazy = Eu;
be.Memo = Cu;
be.Portal = Rp;
be.Profiler = vu;
be.StrictMode = gu;
be.Suspense = Su;
be.isAsyncMode = function (e) {
  return oy(e) || Ft(e) === Lp;
};
be.isConcurrentMode = oy;
be.isContextConsumer = function (e) {
  return Ft(e) === xu;
};
be.isContextProvider = function (e) {
  return Ft(e) === yu;
};
be.isElement = function (e) {
  return typeof e == "object" && e !== null && e.$$typeof === Np;
};
be.isForwardRef = function (e) {
  return Ft(e) === bu;
};
be.isFragment = function (e) {
  return Ft(e) === hu;
};
be.isLazy = function (e) {
  return Ft(e) === Eu;
};
be.isMemo = function (e) {
  return Ft(e) === Cu;
};
be.isPortal = function (e) {
  return Ft(e) === Rp;
};
be.isProfiler = function (e) {
  return Ft(e) === vu;
};
be.isStrictMode = function (e) {
  return Ft(e) === gu;
};
be.isSuspense = function (e) {
  return Ft(e) === Su;
};
be.isValidElementType = function (e) {
  return (
    typeof e == "string" ||
    typeof e == "function" ||
    e === hu ||
    e === wu ||
    e === vu ||
    e === gu ||
    e === Su ||
    e === xC ||
    (typeof e == "object" &&
      e !== null &&
      (e.$$typeof === Eu ||
        e.$$typeof === Cu ||
        e.$$typeof === yu ||
        e.$$typeof === xu ||
        e.$$typeof === bu ||
        e.$$typeof === bC ||
        e.$$typeof === SC ||
        e.$$typeof === CC ||
        e.$$typeof === wC))
  );
};
be.typeOf = Ft;
iy.exports = be;
var EC = iy.exports,
  Mp = EC,
  TC = {
    childContextTypes: !0,
    contextType: !0,
    contextTypes: !0,
    defaultProps: !0,
    displayName: !0,
    getDefaultProps: !0,
    getDerivedStateFromError: !0,
    getDerivedStateFromProps: !0,
    mixins: !0,
    propTypes: !0,
    type: !0,
  },
  kC = {
    name: !0,
    length: !0,
    prototype: !0,
    caller: !0,
    callee: !0,
    arguments: !0,
    arity: !0,
  },
  PC = {
    $$typeof: !0,
    render: !0,
    defaultProps: !0,
    displayName: !0,
    propTypes: !0,
  },
  ay = {
    $$typeof: !0,
    compare: !0,
    defaultProps: !0,
    displayName: !0,
    propTypes: !0,
    type: !0,
  },
  _p = {};
_p[Mp.ForwardRef] = PC;
_p[Mp.Memo] = ay;
function eg(e) {
  return Mp.isMemo(e) ? ay : _p[e.$$typeof] || TC;
}
var IC = Object.defineProperty,
  AC = Object.getOwnPropertyNames,
  tg = Object.getOwnPropertySymbols,
  DC = Object.getOwnPropertyDescriptor,
  OC = Object.getPrototypeOf,
  ng = Object.prototype;
function ly(e, t, n) {
  if (typeof t != "string") {
    if (ng) {
      var r = OC(t);
      r && r !== ng && ly(e, r, n);
    }
    var i = AC(t);
    tg && (i = i.concat(tg(t)));
    for (var o = eg(e), a = eg(t), l = 0; l < i.length; ++l) {
      var s = i[l];
      if (!kC[s] && !(n && n[s]) && !(a && a[s]) && !(o && o[s])) {
        var u = DC(t, s);
        try {
          IC(e, s, u);
        } catch {}
      }
    }
  }
  return e;
}
var jC = ly;
const nf = ii(jC);
function Bn() {
  return (Bn =
    Object.assign ||
    function (e) {
      for (var t = 1; t < arguments.length; t++) {
        var n = arguments[t];
        for (var r in n)
          Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
      }
      return e;
    }).apply(this, arguments);
}
var rg = function (e, t) {
    for (var n = [e[0]], r = 0, i = t.length; r < i; r += 1)
      n.push(t[r], e[r + 1]);
    return n;
  },
  rf = function (e) {
    return (
      e !== null &&
      typeof e == "object" &&
      (e.toString ? e.toString() : Object.prototype.toString.call(e)) ===
        "[object Object]" &&
      !ry.typeOf(e)
    );
  },
  bs = Object.freeze([]),
  mr = Object.freeze({});
function pa(e) {
  return typeof e == "function";
}
function ig(e) {
  return e.displayName || e.name || "Component";
}
function $p(e) {
  return e && typeof e.styledComponentId == "string";
}
var qi =
    (typeof process < "u" &&
      process.env !== void 0 &&
      ({}.REACT_APP_SC_ATTR || {}.SC_ATTR)) ||
    "data-styled",
  Bp = typeof window < "u" && "HTMLElement" in window,
  NC = !!(typeof SC_DISABLE_SPEEDY == "boolean"
    ? SC_DISABLE_SPEEDY
    : typeof process < "u" &&
      process.env !== void 0 &&
      ({}.REACT_APP_SC_DISABLE_SPEEDY !== void 0 &&
      {}.REACT_APP_SC_DISABLE_SPEEDY !== ""
        ? {}.REACT_APP_SC_DISABLE_SPEEDY !== "false" &&
          {}.REACT_APP_SC_DISABLE_SPEEDY
        : {}.SC_DISABLE_SPEEDY !== void 0 &&
          {}.SC_DISABLE_SPEEDY !== "" &&
          {}.SC_DISABLE_SPEEDY !== "false" &&
          {}.SC_DISABLE_SPEEDY));
function La(e) {
  for (
    var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), r = 1;
    r < t;
    r++
  )
    n[r - 1] = arguments[r];
  throw new Error(
    "An error occurred. See https://git.io/JUIaE#" +
      e +
      " for more information." +
      (n.length > 0 ? " Args: " + n.join(", ") : "")
  );
}
var RC = (function () {
    function e(n) {
      (this.groupSizes = new Uint32Array(512)),
        (this.length = 512),
        (this.tag = n);
    }
    var t = e.prototype;
    return (
      (t.indexOfGroup = function (n) {
        for (var r = 0, i = 0; i < n; i++) r += this.groupSizes[i];
        return r;
      }),
      (t.insertRules = function (n, r) {
        if (n >= this.groupSizes.length) {
          for (var i = this.groupSizes, o = i.length, a = o; n >= a; )
            (a <<= 1) < 0 && La(16, "" + n);
          (this.groupSizes = new Uint32Array(a)),
            this.groupSizes.set(i),
            (this.length = a);
          for (var l = o; l < a; l++) this.groupSizes[l] = 0;
        }
        for (var s = this.indexOfGroup(n + 1), u = 0, d = r.length; u < d; u++)
          this.tag.insertRule(s, r[u]) && (this.groupSizes[n]++, s++);
      }),
      (t.clearGroup = function (n) {
        if (n < this.length) {
          var r = this.groupSizes[n],
            i = this.indexOfGroup(n),
            o = i + r;
          this.groupSizes[n] = 0;
          for (var a = i; a < o; a++) this.tag.deleteRule(i);
        }
      }),
      (t.getGroup = function (n) {
        var r = "";
        if (n >= this.length || this.groupSizes[n] === 0) return r;
        for (
          var i = this.groupSizes[n],
            o = this.indexOfGroup(n),
            a = o + i,
            l = o;
          l < a;
          l++
        )
          r +=
            this.tag.getRule(l) +
            `/*!sc*/
`;
        return r;
      }),
      e
    );
  })(),
  Fl = new Map(),
  Ss = new Map(),
  Uo = 1,
  vl = function (e) {
    if (Fl.has(e)) return Fl.get(e);
    for (; Ss.has(Uo); ) Uo++;
    var t = Uo++;
    return Fl.set(e, t), Ss.set(t, e), t;
  },
  LC = function (e) {
    return Ss.get(e);
  },
  MC = function (e, t) {
    t >= Uo && (Uo = t + 1), Fl.set(e, t), Ss.set(t, e);
  },
  _C = "style[" + qi + '][data-styled-version="5.3.11"]',
  $C = new RegExp("^" + qi + '\\.g(\\d+)\\[id="([\\w\\d-]+)"\\].*?"([^"]*)'),
  BC = function (e, t, n) {
    for (var r, i = n.split(","), o = 0, a = i.length; o < a; o++)
      (r = i[o]) && e.registerName(t, r);
  },
  zC = function (e, t) {
    for (
      var n = (t.textContent || "").split(`/*!sc*/
`),
        r = [],
        i = 0,
        o = n.length;
      i < o;
      i++
    ) {
      var a = n[i].trim();
      if (a) {
        var l = a.match($C);
        if (l) {
          var s = 0 | parseInt(l[1], 10),
            u = l[2];
          s !== 0 && (MC(u, s), BC(e, u, l[3]), e.getTag().insertRules(s, r)),
            (r.length = 0);
        } else r.push(a);
      }
    }
  },
  FC = function () {
    return typeof __webpack_nonce__ < "u" ? __webpack_nonce__ : null;
  },
  sy = function (e) {
    var t = document.head,
      n = e || t,
      r = document.createElement("style"),
      i = (function (l) {
        for (var s = l.childNodes, u = s.length; u >= 0; u--) {
          var d = s[u];
          if (d && d.nodeType === 1 && d.hasAttribute(qi)) return d;
        }
      })(n),
      o = i !== void 0 ? i.nextSibling : null;
    r.setAttribute(qi, "active"),
      r.setAttribute("data-styled-version", "5.3.11");
    var a = FC();
    return a && r.setAttribute("nonce", a), n.insertBefore(r, o), r;
  },
  UC = (function () {
    function e(n) {
      var r = (this.element = sy(n));
      r.appendChild(document.createTextNode("")),
        (this.sheet = (function (i) {
          if (i.sheet) return i.sheet;
          for (var o = document.styleSheets, a = 0, l = o.length; a < l; a++) {
            var s = o[a];
            if (s.ownerNode === i) return s;
          }
          La(17);
        })(r)),
        (this.length = 0);
    }
    var t = e.prototype;
    return (
      (t.insertRule = function (n, r) {
        try {
          return this.sheet.insertRule(r, n), this.length++, !0;
        } catch {
          return !1;
        }
      }),
      (t.deleteRule = function (n) {
        this.sheet.deleteRule(n), this.length--;
      }),
      (t.getRule = function (n) {
        var r = this.sheet.cssRules[n];
        return r !== void 0 && typeof r.cssText == "string" ? r.cssText : "";
      }),
      e
    );
  })(),
  HC = (function () {
    function e(n) {
      var r = (this.element = sy(n));
      (this.nodes = r.childNodes), (this.length = 0);
    }
    var t = e.prototype;
    return (
      (t.insertRule = function (n, r) {
        if (n <= this.length && n >= 0) {
          var i = document.createTextNode(r),
            o = this.nodes[n];
          return this.element.insertBefore(i, o || null), this.length++, !0;
        }
        return !1;
      }),
      (t.deleteRule = function (n) {
        this.element.removeChild(this.nodes[n]), this.length--;
      }),
      (t.getRule = function (n) {
        return n < this.length ? this.nodes[n].textContent : "";
      }),
      e
    );
  })(),
  GC = (function () {
    function e(n) {
      (this.rules = []), (this.length = 0);
    }
    var t = e.prototype;
    return (
      (t.insertRule = function (n, r) {
        return (
          n <= this.length && (this.rules.splice(n, 0, r), this.length++, !0)
        );
      }),
      (t.deleteRule = function (n) {
        this.rules.splice(n, 1), this.length--;
      }),
      (t.getRule = function (n) {
        return n < this.length ? this.rules[n] : "";
      }),
      e
    );
  })(),
  og = Bp,
  WC = { isServer: !Bp, useCSSOMInjection: !NC },
  uy = (function () {
    function e(n, r, i) {
      n === void 0 && (n = mr),
        r === void 0 && (r = {}),
        (this.options = Bn({}, WC, {}, n)),
        (this.gs = r),
        (this.names = new Map(i)),
        (this.server = !!n.isServer),
        !this.server &&
          Bp &&
          og &&
          ((og = !1),
          (function (o) {
            for (
              var a = document.querySelectorAll(_C), l = 0, s = a.length;
              l < s;
              l++
            ) {
              var u = a[l];
              u &&
                u.getAttribute(qi) !== "active" &&
                (zC(o, u), u.parentNode && u.parentNode.removeChild(u));
            }
          })(this));
    }
    e.registerId = function (n) {
      return vl(n);
    };
    var t = e.prototype;
    return (
      (t.reconstructWithOptions = function (n, r) {
        return (
          r === void 0 && (r = !0),
          new e(
            Bn({}, this.options, {}, n),
            this.gs,
            (r && this.names) || void 0
          )
        );
      }),
      (t.allocateGSInstance = function (n) {
        return (this.gs[n] = (this.gs[n] || 0) + 1);
      }),
      (t.getTag = function () {
        return (
          this.tag ||
          (this.tag =
            ((i = (r = this.options).isServer),
            (o = r.useCSSOMInjection),
            (a = r.target),
            (n = i ? new GC(a) : o ? new UC(a) : new HC(a)),
            new RC(n)))
        );
        var n, r, i, o, a;
      }),
      (t.hasNameForId = function (n, r) {
        return this.names.has(n) && this.names.get(n).has(r);
      }),
      (t.registerName = function (n, r) {
        if ((vl(n), this.names.has(n))) this.names.get(n).add(r);
        else {
          var i = new Set();
          i.add(r), this.names.set(n, i);
        }
      }),
      (t.insertRules = function (n, r, i) {
        this.registerName(n, r), this.getTag().insertRules(vl(n), i);
      }),
      (t.clearNames = function (n) {
        this.names.has(n) && this.names.get(n).clear();
      }),
      (t.clearRules = function (n) {
        this.getTag().clearGroup(vl(n)), this.clearNames(n);
      }),
      (t.clearTag = function () {
        this.tag = void 0;
      }),
      (t.toString = function () {
        return (function (n) {
          for (var r = n.getTag(), i = r.length, o = "", a = 0; a < i; a++) {
            var l = LC(a);
            if (l !== void 0) {
              var s = n.names.get(l),
                u = r.getGroup(a);
              if (s && u && s.size) {
                var d = qi + ".g" + a + '[id="' + l + '"]',
                  c = "";
                s !== void 0 &&
                  s.forEach(function (f) {
                    f.length > 0 && (c += f + ",");
                  }),
                  (o +=
                    "" +
                    u +
                    d +
                    '{content:"' +
                    c +
                    `"}/*!sc*/
`);
              }
            }
          }
          return o;
        })(this);
      }),
      e
    );
  })(),
  VC = /(a)(d)/gi,
  ag = function (e) {
    return String.fromCharCode(e + (e > 25 ? 39 : 97));
  };
function of(e) {
  var t,
    n = "";
  for (t = Math.abs(e); t > 52; t = (t / 52) | 0) n = ag(t % 52) + n;
  return (ag(t % 52) + n).replace(VC, "$1-$2");
}
var Di = function (e, t) {
    for (var n = t.length; n; ) e = (33 * e) ^ t.charCodeAt(--n);
    return e;
  },
  cy = function (e) {
    return Di(5381, e);
  };
function qC(e) {
  for (var t = 0; t < e.length; t += 1) {
    var n = e[t];
    if (pa(n) && !$p(n)) return !1;
  }
  return !0;
}
var YC = cy("5.3.11"),
  XC = (function () {
    function e(t, n, r) {
      (this.rules = t),
        (this.staticRulesId = ""),
        (this.isStatic = (r === void 0 || r.isStatic) && qC(t)),
        (this.componentId = n),
        (this.baseHash = Di(YC, n)),
        (this.baseStyle = r),
        uy.registerId(n);
    }
    return (
      (e.prototype.generateAndInjectStyles = function (t, n, r) {
        var i = this.componentId,
          o = [];
        if (
          (this.baseStyle &&
            o.push(this.baseStyle.generateAndInjectStyles(t, n, r)),
          this.isStatic && !r.hash)
        )
          if (this.staticRulesId && n.hasNameForId(i, this.staticRulesId))
            o.push(this.staticRulesId);
          else {
            var a = Yi(this.rules, t, n, r).join(""),
              l = of(Di(this.baseHash, a) >>> 0);
            if (!n.hasNameForId(i, l)) {
              var s = r(a, "." + l, void 0, i);
              n.insertRules(i, l, s);
            }
            o.push(l), (this.staticRulesId = l);
          }
        else {
          for (
            var u = this.rules.length,
              d = Di(this.baseHash, r.hash),
              c = "",
              f = 0;
            f < u;
            f++
          ) {
            var h = this.rules[f];
            if (typeof h == "string") c += h;
            else if (h) {
              var v = Yi(h, t, n, r),
                y = Array.isArray(v) ? v.join("") : v;
              (d = Di(d, y + f)), (c += y);
            }
          }
          if (c) {
            var w = of(d >>> 0);
            if (!n.hasNameForId(i, w)) {
              var m = r(c, "." + w, void 0, i);
              n.insertRules(i, w, m);
            }
            o.push(w);
          }
        }
        return o.join(" ");
      }),
      e
    );
  })(),
  KC = /^\s*\/\/.*$/gm,
  QC = [":", "[", ".", "#"];
function ZC(e) {
  var t,
    n,
    r,
    i,
    o = e === void 0 ? mr : e,
    a = o.options,
    l = a === void 0 ? mr : a,
    s = o.plugins,
    u = s === void 0 ? bs : s,
    d = new hC(l),
    c = [],
    f = (function (y) {
      function w(m) {
        if (m)
          try {
            y(m + "}");
          } catch {}
      }
      return function (m, g, x, b, C, E, P, T, I, O) {
        switch (m) {
          case 1:
            if (I === 0 && g.charCodeAt(0) === 64) return y(g + ";"), "";
            break;
          case 2:
            if (T === 0) return g + "/*|*/";
            break;
          case 3:
            switch (T) {
              case 102:
              case 112:
                return y(x[0] + g), "";
              default:
                return g + (O === 0 ? "/*|*/" : "");
            }
          case -2:
            g.split("/*|*/}").forEach(w);
        }
      };
    })(function (y) {
      c.push(y);
    }),
    h = function (y, w, m) {
      return (w === 0 && QC.indexOf(m[n.length]) !== -1) || m.match(i)
        ? y
        : "." + t;
    };
  function v(y, w, m, g) {
    g === void 0 && (g = "&");
    var x = y.replace(KC, ""),
      b = w && m ? m + " " + w + " { " + x + " }" : x;
    return (
      (t = g),
      (n = w),
      (r = new RegExp("\\" + n + "\\b", "g")),
      (i = new RegExp("(\\" + n + "\\b){2,}")),
      d(m || !w ? "" : w, b)
    );
  }
  return (
    d.use(
      [].concat(u, [
        function (y, w, m) {
          y === 2 &&
            m.length &&
            m[0].lastIndexOf(n) > 0 &&
            (m[0] = m[0].replace(r, h));
        },
        f,
        function (y) {
          if (y === -2) {
            var w = c;
            return (c = []), w;
          }
        },
      ])
    ),
    (v.hash = u.length
      ? u
          .reduce(function (y, w) {
            return w.name || La(15), Di(y, w.name);
          }, 5381)
          .toString()
      : ""),
    v
  );
}
var dy = H.createContext();
dy.Consumer;
var fy = H.createContext(),
  JC = (fy.Consumer, new uy()),
  af = ZC();
function eE() {
  return S.useContext(dy) || JC;
}
function tE() {
  return S.useContext(fy) || af;
}
var nE = (function () {
    function e(t, n) {
      var r = this;
      (this.inject = function (i, o) {
        o === void 0 && (o = af);
        var a = r.name + o.hash;
        i.hasNameForId(r.id, a) ||
          i.insertRules(r.id, a, o(r.rules, a, "@keyframes"));
      }),
        (this.toString = function () {
          return La(12, String(r.name));
        }),
        (this.name = t),
        (this.id = "sc-keyframes-" + t),
        (this.rules = n);
    }
    return (
      (e.prototype.getName = function (t) {
        return t === void 0 && (t = af), this.name + t.hash;
      }),
      e
    );
  })(),
  rE = /([A-Z])/,
  iE = /([A-Z])/g,
  oE = /^ms-/,
  aE = function (e) {
    return "-" + e.toLowerCase();
  };
function lg(e) {
  return rE.test(e) ? e.replace(iE, aE).replace(oE, "-ms-") : e;
}
var sg = function (e) {
  return e == null || e === !1 || e === "";
};
function Yi(e, t, n, r) {
  if (Array.isArray(e)) {
    for (var i, o = [], a = 0, l = e.length; a < l; a += 1)
      (i = Yi(e[a], t, n, r)) !== "" &&
        (Array.isArray(i) ? o.push.apply(o, i) : o.push(i));
    return o;
  }
  if (sg(e)) return "";
  if ($p(e)) return "." + e.styledComponentId;
  if (pa(e)) {
    if (
      typeof (u = e) != "function" ||
      (u.prototype && u.prototype.isReactComponent) ||
      !t
    )
      return e;
    var s = e(t);
    return Yi(s, t, n, r);
  }
  var u;
  return e instanceof nE
    ? n
      ? (e.inject(n, r), e.getName(r))
      : e
    : rf(e)
    ? (function d(c, f) {
        var h,
          v,
          y = [];
        for (var w in c)
          c.hasOwnProperty(w) &&
            !sg(c[w]) &&
            ((Array.isArray(c[w]) && c[w].isCss) || pa(c[w])
              ? y.push(lg(w) + ":", c[w], ";")
              : rf(c[w])
              ? y.push.apply(y, d(c[w], w))
              : y.push(
                  lg(w) +
                    ": " +
                    ((h = w),
                    (v = c[w]) == null || typeof v == "boolean" || v === ""
                      ? ""
                      : typeof v != "number" ||
                        v === 0 ||
                        h in gC ||
                        h.startsWith("--")
                      ? String(v).trim()
                      : v + "px") +
                    ";"
                ));
        return f ? [f + " {"].concat(y, ["}"]) : y;
      })(e)
    : e.toString();
}
var ug = function (e) {
  return Array.isArray(e) && (e.isCss = !0), e;
};
function lE(e) {
  for (
    var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), r = 1;
    r < t;
    r++
  )
    n[r - 1] = arguments[r];
  return pa(e) || rf(e)
    ? ug(Yi(rg(bs, [e].concat(n))))
    : n.length === 0 && e.length === 1 && typeof e[0] == "string"
    ? e
    : ug(Yi(rg(e, n)));
}
var sE = function (e, t, n) {
    return (
      n === void 0 && (n = mr), (e.theme !== n.theme && e.theme) || t || n.theme
    );
  },
  uE = /[!"#$%&'()*+,./:;<=>?@[\\\]^`{|}~-]+/g,
  cE = /(^-|-$)/g;
function Sc(e) {
  return e.replace(uE, "-").replace(cE, "");
}
var dE = function (e) {
  return of(cy(e) >>> 0);
};
function yl(e) {
  return typeof e == "string" && !0;
}
var lf = function (e) {
    return (
      typeof e == "function" ||
      (typeof e == "object" && e !== null && !Array.isArray(e))
    );
  },
  fE = function (e) {
    return e !== "__proto__" && e !== "constructor" && e !== "prototype";
  };
function pE(e, t, n) {
  var r = e[n];
  lf(t) && lf(r) ? py(r, t) : (e[n] = t);
}
function py(e) {
  for (
    var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), r = 1;
    r < t;
    r++
  )
    n[r - 1] = arguments[r];
  for (var i = 0, o = n; i < o.length; i++) {
    var a = o[i];
    if (lf(a)) for (var l in a) fE(l) && pE(e, a[l], l);
  }
  return e;
}
var my = H.createContext();
my.Consumer;
var Cc = {};
function hy(e, t, n) {
  var r = $p(e),
    i = !yl(e),
    o = t.attrs,
    a = o === void 0 ? bs : o,
    l = t.componentId,
    s =
      l === void 0
        ? (function (g, x) {
            var b = typeof g != "string" ? "sc" : Sc(g);
            Cc[b] = (Cc[b] || 0) + 1;
            var C = b + "-" + dE("5.3.11" + b + Cc[b]);
            return x ? x + "-" + C : C;
          })(t.displayName, t.parentComponentId)
        : l,
    u = t.displayName,
    d =
      u === void 0
        ? (function (g) {
            return yl(g) ? "styled." + g : "Styled(" + ig(g) + ")";
          })(e)
        : u,
    c =
      t.displayName && t.componentId
        ? Sc(t.displayName) + "-" + t.componentId
        : t.componentId || s,
    f = r && e.attrs ? Array.prototype.concat(e.attrs, a).filter(Boolean) : a,
    h = t.shouldForwardProp;
  r &&
    e.shouldForwardProp &&
    (h = t.shouldForwardProp
      ? function (g, x, b) {
          return e.shouldForwardProp(g, x, b) && t.shouldForwardProp(g, x, b);
        }
      : e.shouldForwardProp);
  var v,
    y = new XC(n, c, r ? e.componentStyle : void 0),
    w = y.isStatic && a.length === 0,
    m = function (g, x) {
      return (function (b, C, E, P) {
        var T = b.attrs,
          I = b.componentStyle,
          O = b.defaultProps,
          D = b.foldedComponentIds,
          N = b.shouldForwardProp,
          A = b.styledComponentId,
          R = b.target,
          V = (function (X, j, ie) {
            X === void 0 && (X = mr);
            var F = Bn({}, j, { theme: X }),
              ye = {};
            return (
              ie.forEach(function (oe) {
                var le,
                  te,
                  ke,
                  Ee = oe;
                for (le in (pa(Ee) && (Ee = Ee(F)), Ee))
                  F[le] = ye[le] =
                    le === "className"
                      ? ((te = ye[le]),
                        (ke = Ee[le]),
                        te && ke ? te + " " + ke : te || ke)
                      : Ee[le];
              }),
              [F, ye]
            );
          })(sE(C, S.useContext(my), O) || mr, C, T),
          J = V[0],
          re = V[1],
          L = (function (X, j, ie, F) {
            var ye = eE(),
              oe = tE(),
              le = j
                ? X.generateAndInjectStyles(mr, ye, oe)
                : X.generateAndInjectStyles(ie, ye, oe);
            return le;
          })(I, P, J),
          M = E,
          W = re.$as || C.$as || re.as || C.as || R,
          K = yl(W),
          $ = re !== C ? Bn({}, C, {}, re) : C,
          _ = {};
        for (var G in $)
          G[0] !== "$" &&
            G !== "as" &&
            (G === "forwardedAs"
              ? (_.as = $[G])
              : (N ? N(G, Jh, W) : !K || Jh(G)) && (_[G] = $[G]));
        return (
          C.style &&
            re.style !== C.style &&
            (_.style = Bn({}, C.style, {}, re.style)),
          (_.className = Array.prototype
            .concat(D, A, L !== A ? L : null, C.className, re.className)
            .filter(Boolean)
            .join(" ")),
          (_.ref = M),
          S.createElement(W, _)
        );
      })(v, g, x, w);
    };
  return (
    (m.displayName = d),
    ((v = H.forwardRef(m)).attrs = f),
    (v.componentStyle = y),
    (v.displayName = d),
    (v.shouldForwardProp = h),
    (v.foldedComponentIds = r
      ? Array.prototype.concat(e.foldedComponentIds, e.styledComponentId)
      : bs),
    (v.styledComponentId = c),
    (v.target = r ? e.target : e),
    (v.withComponent = function (g) {
      var x = t.componentId,
        b = (function (E, P) {
          if (E == null) return {};
          var T,
            I,
            O = {},
            D = Object.keys(E);
          for (I = 0; I < D.length; I++)
            (T = D[I]), P.indexOf(T) >= 0 || (O[T] = E[T]);
          return O;
        })(t, ["componentId"]),
        C = x && x + "-" + (yl(g) ? g : Sc(ig(g)));
      return hy(g, Bn({}, b, { attrs: f, componentId: C }), n);
    }),
    Object.defineProperty(v, "defaultProps", {
      get: function () {
        return this._foldedDefaultProps;
      },
      set: function (g) {
        this._foldedDefaultProps = r ? py({}, e.defaultProps, g) : g;
      },
    }),
    Object.defineProperty(v, "toString", {
      value: function () {
        return "." + v.styledComponentId;
      },
    }),
    i &&
      nf(v, e, {
        attrs: !0,
        componentStyle: !0,
        displayName: !0,
        foldedComponentIds: !0,
        shouldForwardProp: !0,
        styledComponentId: !0,
        target: !0,
        withComponent: !0,
      }),
    v
  );
}
var sf = function (e) {
  return (function t(n, r, i) {
    if ((i === void 0 && (i = mr), !ry.isValidElementType(r)))
      return La(1, String(r));
    var o = function () {
      return n(r, i, lE.apply(void 0, arguments));
    };
    return (
      (o.withConfig = function (a) {
        return t(n, r, Bn({}, i, {}, a));
      }),
      (o.attrs = function (a) {
        return t(
          n,
          r,
          Bn({}, i, {
            attrs: Array.prototype.concat(i.attrs, a).filter(Boolean),
          })
        );
      }),
      o
    );
  })(hy, e);
};
[
  "a",
  "abbr",
  "address",
  "area",
  "article",
  "aside",
  "audio",
  "b",
  "base",
  "bdi",
  "bdo",
  "big",
  "blockquote",
  "body",
  "br",
  "button",
  "canvas",
  "caption",
  "cite",
  "code",
  "col",
  "colgroup",
  "data",
  "datalist",
  "dd",
  "del",
  "details",
  "dfn",
  "dialog",
  "div",
  "dl",
  "dt",
  "em",
  "embed",
  "fieldset",
  "figcaption",
  "figure",
  "footer",
  "form",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "head",
  "header",
  "hgroup",
  "hr",
  "html",
  "i",
  "iframe",
  "img",
  "input",
  "ins",
  "kbd",
  "keygen",
  "label",
  "legend",
  "li",
  "link",
  "main",
  "map",
  "mark",
  "marquee",
  "menu",
  "menuitem",
  "meta",
  "meter",
  "nav",
  "noscript",
  "object",
  "ol",
  "optgroup",
  "option",
  "output",
  "p",
  "param",
  "picture",
  "pre",
  "progress",
  "q",
  "rp",
  "rt",
  "ruby",
  "s",
  "samp",
  "script",
  "section",
  "select",
  "small",
  "source",
  "span",
  "strong",
  "style",
  "sub",
  "summary",
  "sup",
  "table",
  "tbody",
  "td",
  "textarea",
  "tfoot",
  "th",
  "thead",
  "time",
  "title",
  "tr",
  "track",
  "u",
  "ul",
  "var",
  "video",
  "wbr",
  "circle",
  "clipPath",
  "defs",
  "ellipse",
  "foreignObject",
  "g",
  "image",
  "line",
  "linearGradient",
  "marker",
  "mask",
  "path",
  "pattern",
  "polygon",
  "polyline",
  "radialGradient",
  "rect",
  "stop",
  "svg",
  "text",
  "textPath",
  "tspan",
].forEach(function (e) {
  sf[e] = sf(e);
});
const ce = sf,
  mE = ({ isactive: e }) =>
    e
      ? p.jsx("svg", {
          "aria-label": "Home",
          color: "rgb(245, 245, 245)",
          fill: "rgb(245, 245, 245)",
          height: "24",
          role: "img",
          viewBox: "0 0 24 24",
          width: "24",
          children: p.jsx("path", {
            d: "M22 23h-6.001a1 1 0 0 1-1-1v-5.455a2.997 2.997 0 1 0-5.993 0V22a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V11.543a1.002 1.002 0 0 1 .31-.724l10-9.543a1.001 1.001 0 0 1 1.38 0l10 9.543a1.002 1.002 0 0 1 .31.724V22a1 1 0 0 1-1 1Z",
          }),
        })
      : p.jsx("svg", {
          "aria-label": "Home",
          color: "rgb(245, 245, 245)",
          fill: "rgb(245, 245, 245)",
          height: "24",
          role: "img",
          viewBox: "0 0 24 24",
          width: "24",
          children: p.jsx("path", {
            d: "M9.005 16.545a2.997 2.997 0 0 1 2.997-2.997A2.997 2.997 0 0 1 15 16.545V22h7V11.543L12 2 2 11.543V22h7.005Z",
            fill: "none",
            stroke: "currentColor",
            strokeLinejoin: "round",
            strokeWidth: "2",
          }),
        }),
  hE = ({ isactive: e }) =>
    e
      ? p.jsxs("svg", {
          "aria-label": "Search",
          color: "rgb(245, 245, 245)",
          fill: "rgb(245, 245, 245)",
          height: "24",
          role: "img",
          viewBox: "0 0 24 24",
          width: "24",
          children: [
            p.jsx("path", {
              d: "M18.5 10.5a8 8 0 1 1-8-8 8 8 0 0 1 8 8Z",
              fill: "none",
              stroke: "currentColor",
              strokeLinecap: "round",
              strokeLinejoin: "round",
              strokeWidth: "3",
            }),
            p.jsx("line", {
              fill: "none",
              stroke: "currentColor",
              strokeLinecap: "round",
              strokeLinejoin: "round",
              strokeWidth: "3",
              x1: "16.511",
              x2: "21.643",
              y1: "16.511",
              y2: "21.643",
            }),
          ],
        })
      : p.jsxs("svg", {
          "aria-label": "Search",
          color: "rgb(245, 245, 245)",
          fill: "rgb(245, 245, 245)",
          height: "24",
          role: "img",
          viewBox: "0 0 24 24",
          width: "24",
          children: [
            p.jsx("path", {
              d: "M19 10.5A8.5 8.5 0 1 1 10.5 2a8.5 8.5 0 0 1 8.5 8.5Z",
              fill: "none",
              stroke: "currentColor",
              strokeLinecap: "round",
              strokeLinejoin: "round",
              strokeWidth: "2",
            }),
            p.jsx("line", {
              fill: "none",
              stroke: "currentColor",
              strokeLinecap: "round",
              strokeLinejoin: "round",
              strokeWidth: "2",
              x1: "16.511",
              x2: "22",
              y1: "16.511",
              y2: "22",
            }),
          ],
        }),
  gE = ({ isactive: e }) =>
    e
      ? p.jsx("svg", {
          "aria-label": "Explore",
          color: "rgb(245, 245, 245)",
          fill: "rgb(245, 245, 245)",
          height: "24",
          role: "img",
          viewBox: "0 0 24 24",
          width: "24",
          children: p.jsx("path", {
            d: "m13.173 13.164 1.491-3.829-3.83 1.49ZM12.001.5a11.5 11.5 0 1 0 11.5 11.5A11.513 11.513 0 0 0 12.001.5Zm5.35 7.443-2.478 6.369a1 1 0 0 1-.57.569l-6.36 2.47a1 1 0 0 1-1.294-1.294l2.48-6.369a1 1 0 0 1 .57-.569l6.359-2.47a1 1 0 0 1 1.294 1.294Z",
          }),
        })
      : p.jsxs("svg", {
          "aria-label": "Explore",
          color: "rgb(245, 245, 245)",
          fill: "rgb(245, 245, 245)",
          height: "24",
          role: "img",
          viewBox: "0 0 24 24",
          width: "24",
          children: [
            p.jsx("polygon", {
              fill: "none",
              points:
                "13.941 13.953 7.581 16.424 10.06 10.056 16.42 7.585 13.941 13.953",
              stroke: "currentColor",
              strokeLinecap: "round",
              strokeLinejoin: "round",
              strokeWidth: "2",
            }),
            p.jsx("polygon", {
              fillRule: "evenodd",
              points: "10.06 10.056 13.949 13.945 7.581 16.424 10.06 10.056",
            }),
            p.jsx("circle", {
              cx: "12.001",
              cy: "12.005",
              fill: "none",
              r: "10.5",
              stroke: "currentColor",
              strokeLinecap: "round",
              strokeLinejoin: "round",
              strokeWidth: "2",
            }),
          ],
        }),
  vE = ({ isactive: e }) =>
    e
      ? p.jsx("svg", {
          "aria-label": "Messenger",
          color: "rgb(245, 245, 245)",
          fill: "rgb(245, 245, 245)",
          height: "24",
          role: "img",
          viewBox: "0 0 24 24",
          width: "24",
          children: p.jsx("path", {
            d: "M12.003 1.131a10.487 10.487 0 0 0-10.87 10.57 10.194 10.194 0 0 0 3.412 7.771l.054 1.78a1.67 1.67 0 0 0 2.342 1.476l1.935-.872a11.767 11.767 0 0 0 3.127.416 10.488 10.488 0 0 0 10.87-10.57 10.487 10.487 0 0 0-10.87-10.57Zm5.786 9.001-2.566 3.983a1.577 1.577 0 0 1-2.278.42l-2.452-1.84a.63.63 0 0 0-.759.002l-2.556 2.049a.659.659 0 0 1-.96-.874L8.783 9.89a1.576 1.576 0 0 1 2.277-.42l2.453 1.84a.63.63 0 0 0 .758-.003l2.556-2.05a.659.659 0 0 1 .961.874Z",
          }),
        })
      : p.jsxs("svg", {
          "aria-label": "Messenger",
          color: "rgb(245, 245, 245)",
          fill: "rgb(245, 245, 245)",
          height: "24",
          role: "img",
          viewBox: "0 0 24 24",
          width: "24",
          children: [
            p.jsx("path", {
              d: "M12.003 2.001a9.705 9.705 0 1 1 0 19.4 10.876 10.876 0 0 1-2.895-.384.798.798 0 0 0-.533.04l-1.984.876a.801.801 0 0 1-1.123-.708l-.054-1.78a.806.806 0 0 0-.27-.569 9.49 9.49 0 0 1-3.14-7.175 9.65 9.65 0 0 1 10-9.7Z",
              fill: "none",
              stroke: "currentColor",
              strokeMiterlimit: "10",
              strokeWidth: "1.739",
            }),
            p.jsx("path", {
              d: "M17.79 10.132a.659.659 0 0 0-.962-.873l-2.556 2.05a.63.63 0 0 1-.758.002L11.06 9.47a1.576 1.576 0 0 0-2.277.42l-2.567 3.98a.659.659 0 0 0 .961.875l2.556-2.049a.63.63 0 0 1 .759-.002l2.452 1.84a1.576 1.576 0 0 0 2.278-.42Z",
              fillRule: "evenodd",
            }),
          ],
        }),
  yE = ({ isactive: e }) =>
    e
      ? p.jsx("svg", {
          "aria-label": "Notifications",
          color: "rgb(245, 245, 245)",
          fill: "rgb(245, 245, 245)",
          height: "24",
          role: "img",
          viewBox: "0 0 48 48",
          width: "24",
          children: p.jsx("path", {
            d: "M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z",
          }),
        })
      : p.jsx("svg", {
          "aria-label": "Notifications",
          color: "rgb(245, 245, 245)",
          fill: "rgb(245, 245, 245)",
          height: "24",
          role: "img",
          viewBox: "0 0 24 24",
          width: "24",
          children: p.jsx("path", {
            d: "M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z",
          }),
        }),
  xE = ({ isactive: e }) =>
    e
      ? p.jsx("svg", {
          "aria-label": "New post",
          color: "rgb(245, 245, 245)",
          fill: "rgb(245, 245, 245)",
          height: "24",
          role: "img",
          viewBox: "0 0 24 24",
          width: "24",
          children: p.jsx("path", {
            d: "m12.003 5.545-.117.006-.112.02a1 1 0 0 0-.764.857l-.007.117V11H6.544l-.116.007a1 1 0 0 0-.877.876L5.545 12l.007.117a1 1 0 0 0 .877.876l.116.007h4.457l.001 4.454.007.116a1 1 0 0 0 .876.877l.117.007.117-.007a1 1 0 0 0 .876-.877l.007-.116V13h4.452l.116-.007a1 1 0 0 0 .877-.876l.007-.117-.007-.117a1 1 0 0 0-.877-.876L17.455 11h-4.453l.001-4.455-.007-.117a1 1 0 0 0-.876-.877ZM8.552.999h6.896c2.754 0 4.285.579 5.664 1.912 1.255 1.297 1.838 2.758 1.885 5.302L23 8.55v6.898c0 2.755-.578 4.286-1.912 5.664-1.298 1.255-2.759 1.838-5.302 1.885l-.338.003H8.552c-2.754 0-4.285-.579-5.664-1.912-1.255-1.297-1.839-2.758-1.885-5.302L1 15.45V8.551c0-2.754.579-4.286 1.912-5.664C4.21 1.633 5.67 1.05 8.214 1.002L8.552 1Z",
          }),
        })
      : p.jsxs("svg", {
          "aria-label": "New post",
          color: "rgb(245, 245, 245)",
          fill: "rgb(245, 245, 245)",
          height: "24",
          role: "img",
          viewBox: "0 0 24 24",
          width: "24",
          children: [
            p.jsx("path", {
              d: "M2 12v3.45c0 2.849.698 4.005 1.606 4.944.94.909 2.098 1.608 4.946 1.608h6.896c2.848 0 4.006-.7 4.946-1.608C21.302 19.455 22 18.3 22 15.45V8.552c0-2.849-.698-4.006-1.606-4.945C19.454 2.7 18.296 2 15.448 2H8.552c-2.848 0-4.006.699-4.946 1.607C2.698 4.547 2 5.703 2 8.552Z",
              fill: "none",
              stroke: "currentColor",
              strokeLinecap: "round",
              strokeLinejoin: "round",
              strokeWidth: "2",
            }),
            p.jsx("line", {
              fill: "none",
              stroke: "currentColor",
              strokeLinecap: "round",
              strokeLinejoin: "round",
              strokeWidth: "2",
              x1: "6.545",
              x2: "17.455",
              y1: "12.001",
              y2: "12.001",
            }),
            p.jsx("line", {
              fill: "none",
              stroke: "currentColor",
              strokeLinecap: "round",
              strokeLinejoin: "round",
              strokeWidth: "2",
              x1: "12.003",
              x2: "12.003",
              y1: "6.545",
              y2: "17.455",
            }),
          ],
        }),
  wE = ({ isactive: e }) =>
    e
      ? p.jsx("svg", {
          "aria-label": "Settings",
          color: "rgb(245, 245, 245)",
          fill: "rgb(245, 245, 245)",
          height: "24",
          role: "img",
          viewBox: "0 0 24 24",
          width: "24",
          children: p.jsx("path", {
            d: "M3.5 6.5h17a1.5 1.5 0 0 0 0-3h-17a1.5 1.5 0 0 0 0 3Zm17 4h-17a1.5 1.5 0 0 0 0 3h17a1.5 1.5 0 0 0 0-3Zm0 7h-17a1.5 1.5 0 0 0 0 3h17a1.5 1.5 0 0 0 0-3Z",
          }),
        })
      : p.jsxs("svg", {
          "aria-label": "Settings",
          color: "rgb(245, 245, 245)",
          fill: "rgb(245, 245, 245)",
          height: "24",
          role: "img",
          viewBox: "0 0 24 24",
          width: "24",
          children: [
            p.jsx("line", {
              fill: "none",
              stroke: "currentColor",
              strokeLinecap: "round",
              strokeLinejoin: "round",
              strokeWidth: "2",
              x1: "3",
              x2: "21",
              y1: "4",
              y2: "4",
            }),
            p.jsx("line", {
              fill: "none",
              stroke: "currentColor",
              strokeLinecap: "round",
              strokeLinejoin: "round",
              strokeWidth: "2",
              x1: "3",
              x2: "21",
              y1: "12",
              y2: "12",
            }),
            p.jsx("line", {
              fill: "none",
              stroke: "currentColor",
              strokeLinecap: "round",
              strokeLinejoin: "round",
              strokeWidth: "2",
              x1: "3",
              x2: "21",
              y1: "20",
              y2: "20",
            }),
          ],
        }),
  bE = () =>
    p.jsxs("svg", {
      "aria-label": "Back",
      color: "rgb(245, 245, 245)",
      fill: "rgb(245, 245, 245)",
      height: "24",
      role: "img",
      viewBox: "0 0 24 24",
      width: "24",
      children: [
        p.jsx("title", { children: "Back" }),
        p.jsx("line", {
          fill: "none",
          stroke: "currentColor",
          strokeLinecap: "round",
          strokeLinejoin: "round",
          strokeWidth: "2",
          x1: "2.909",
          x2: "22.001",
          y1: "12.004",
          y2: "12.004",
        }),
        p.jsx("polyline", {
          fill: "none",
          points: "9.276 4.726 2.001 12.004 9.276 19.274",
          stroke: "currentColor",
          strokeLinecap: "round",
          strokeLinejoin: "round",
          strokeWidth: "2",
        }),
      ],
    }),
  gy = () =>
    p.jsx("svg", {
      className: "moreimagesicon",
      "aria-label": "Open media gallery",
      color: "rgb(255, 255, 255)",
      fill: "rgb(255, 255, 255)",
      height: "16",
      role: "img",
      viewBox: "0 0 24 24",
      width: "16",
      children: p.jsx("path", {
        d: "M19 15V5a4.004 4.004 0 0 0-4-4H5a4.004 4.004 0 0 0-4 4v10a4.004 4.004 0 0 0 4 4h10a4.004 4.004 0 0 0 4-4ZM3 15V5a2.002 2.002 0 0 1 2-2h10a2.002 2.002 0 0 1 2 2v10a2.002 2.002 0 0 1-2 2H5a2.002 2.002 0 0 1-2-2Zm18.862-8.773A.501.501 0 0 0 21 6.57v8.431a6 6 0 0 1-6 6H6.58a.504.504 0 0 0-.35.863A3.944 3.944 0 0 0 9 23h6a8 8 0 0 0 8-8V9a3.95 3.95 0 0 0-1.138-2.773Z",
        fillRule: "evenodd",
      }),
    }),
  SE = () =>
    p.jsxs("svg", {
      "aria-label": "Delete",
      color: "rgb(255, 255, 255)",
      fill: "rgb(255, 255, 255)",
      height: "12",
      role: "img",
      viewBox: "0 0 24 24",
      width: "12",
      children: [
        p.jsx("line", {
          fill: "none",
          stroke: "currentColor",
          strokeLinecap: "round",
          strokeLinejoin: "round",
          strokeWidth: "2",
          x1: "21",
          x2: "3",
          y1: "3",
          y2: "21",
        }),
        p.jsx("line", {
          fill: "none",
          stroke: "currentColor",
          strokeLinecap: "round",
          strokeLinejoin: "round",
          strokeWidth: "2",
          x1: "21",
          x2: "3",
          y1: "21",
          y2: "3",
        }),
      ],
    }),
  CE = () =>
    p.jsxs("svg", {
      "aria-label": "Plus icon",
      color: "rgb(245, 245, 245)",
      fill: "rgb(245, 245, 245)",
      height: "22",
      role: "img",
      viewBox: "0 0 24 24",
      width: "22",
      children: [
        p.jsx("title", { children: "Plus icon" }),
        p.jsx("path", {
          d: "M21 11.3h-8.2V3c0-.4-.3-.8-.8-.8s-.8.4-.8.8v8.2H3c-.4 0-.8.3-.8.8s.3.8.8.8h8.2V21c0 .4.3.8.8.8s.8-.3.8-.8v-8.2H21c.4 0 .8-.3.8-.8s-.4-.7-.8-.7z",
        }),
      ],
    }),
  EE = () =>
    p.jsxs("svg", {
      "aria-label": "More options",
      color: "rgb(245, 245, 245)",
      fill: "rgb(245, 245, 245)",
      height: "24",
      role: "img",
      viewBox: "0 0 24 24",
      width: "24",
      children: [
        p.jsx("circle", { cx: "12", cy: "12", r: "1.5" }),
        p.jsx("circle", { cx: "6", cy: "12", r: "1.5" }),
        p.jsx("circle", { cx: "18", cy: "12", r: "1.5" }),
      ],
    }),
  vy = ({ isactive: e }) =>
    e
      ? p.jsxs("svg", {
          "aria-label": "Unlike",
          color: "rgb(255, 48, 64)",
          fill: "rgb(255, 48, 64)",
          height: "24",
          role: "img",
          viewBox: "0 0 48 48",
          width: "24",
          children: [
            p.jsx("title", { children: "Unlike" }),
            p.jsx("path", {
              d: "M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z",
            }),
          ],
        })
      : p.jsxs("svg", {
          "aria-label": "Like",
          color: "rgb(245, 245, 245)",
          fill: "rgb(245, 245, 245)",
          height: "24",
          role: "img",
          viewBox: "0 0 24 24",
          width: "24",
          children: [
            p.jsx("title", { children: "Like" }),
            p.jsx("path", {
              d: "M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z",
            }),
          ],
        }),
  yy = () =>
    p.jsxs("svg", {
      "aria-label": "Comment",
      color: "rgb(245, 245, 245)",
      fill: "rgb(245, 245, 245)",
      height: "24",
      role: "img",
      viewBox: "0 0 24 24",
      width: "24",
      children: [
        p.jsx("title", { children: "Comment" }),
        p.jsx("path", {
          d: "M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z",
          fill: "none",
          stroke: "currentColor",
          strokeLinejoin: "round",
          strokeWidth: "2",
        }),
      ],
    }),
  xy = () =>
    p.jsxs("svg", {
      "aria-label": "Share Post",
      color: "rgb(245, 245, 245)",
      fill: "rgb(245, 245, 245)",
      height: "24",
      role: "img",
      viewBox: "0 0 24 24",
      width: "24",
      children: [
        p.jsx("title", { children: "Share Post" }),
        p.jsx("line", {
          fill: "none",
          stroke: "currentColor",
          strokeLinejoin: "round",
          strokeWidth: "2",
          x1: "22",
          x2: "9.218",
          y1: "3",
          y2: "10.083",
        }),
        p.jsx("polygon", {
          fill: "none",
          points: "11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334",
          stroke: "currentColor",
          strokeLinejoin: "round",
          strokeWidth: "2",
        }),
      ],
    }),
  wy = ({ isactive: e }) =>
    e
      ? p.jsxs("svg", {
          "aria-label": "Remove",
          color: "rgb(245, 245, 245)",
          fill: "rgb(245, 245, 245)",
          height: "24",
          role: "img",
          viewBox: "0 0 24 24",
          width: "24",
          children: [
            p.jsx("title", { children: "Remove" }),
            p.jsx("path", {
              d: "M20 22a.999.999 0 0 1-.687-.273L12 14.815l-7.313 6.912A1 1 0 0 1 3 21V3a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1Z",
            }),
          ],
        })
      : p.jsxs("svg", {
          "aria-label": "Save",
          color: "rgb(245, 245, 245)",
          fill: "rgb(245, 245, 245)",
          height: "24",
          role: "img",
          viewBox: "0 0 24 24",
          width: "24",
          children: [
            p.jsx("title", { children: "Save" }),
            p.jsx("polygon", {
              fill: "none",
              points: "20 21 12 13.44 4 21 4 3 20 3 20 21",
              stroke: "currentColor",
              strokeLinecap: "round",
              strokeLinejoin: "round",
              strokeWidth: "2",
            }),
          ],
        }),
  by = ({ isactive: e }) =>
    e
      ? p.jsxs("svg", {
          "aria-label": "Unlike",
          color: "rgb(255, 48, 64)",
          fill: "rgb(255, 48, 64)",
          height: "12",
          role: "img",
          viewBox: "0 0 48 48",
          width: "12",
          children: [
            p.jsx("title", { children: "Unlike" }),
            p.jsx("path", {
              d: "M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z",
            }),
          ],
        })
      : p.jsxs("svg", {
          "aria-label": "Like",
          color: "rgb(245, 245, 245)",
          fill: "rgb(245, 245, 245)",
          height: "12",
          role: "img",
          viewBox: "0 0 24 24",
          width: "12",
          children: [
            p.jsx("title", { children: "Like" }),
            p.jsx("path", {
              d: "M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z",
            }),
          ],
        }),
  zp = () =>
    p.jsxs("svg", {
      "aria-label": "Comment Options",
      color: "rgb(168, 168, 168)",
      fill: "rgb(168, 168, 168)",
      height: "24",
      role: "img",
      viewBox: "0 0 24 24",
      width: "24",
      children: [
        p.jsx("title", { children: "Comment Options" }),
        p.jsx("circle", { cx: "12", cy: "12", r: "1.5" }),
        p.jsx("circle", { cx: "6", cy: "12", r: "1.5" }),
        p.jsx("circle", { cx: "18", cy: "12", r: "1.5" }),
      ],
    }),
  TE = () =>
    p.jsxs("svg", {
      "aria-label": "Close",
      color: "rgb(245, 245, 245)",
      fill: "rgb(245, 245, 245)",
      height: "18",
      role: "img",
      viewBox: "0 0 24 24",
      width: "18",
      children: [
        p.jsx("title", { children: "Close" }),
        p.jsx("polyline", {
          fill: "none",
          points: "20.643 3.357 12 12 3.353 20.647",
          stroke: "currentColor",
          strokeLinecap: "round",
          strokeLinejoin: "round",
          strokeWidth: "3",
        }),
        p.jsx("line", {
          fill: "none",
          stroke: "currentColor",
          strokeLinecap: "round",
          strokeLinejoin: "round",
          strokeWidth: "3",
          x1: "20.649",
          x2: "3.354",
          y1: "20.649",
          y2: "3.354",
        }),
      ],
    }),
  kE = () =>
    p.jsxs("svg", {
      "aria-label": "Options",
      color: "rgb(245, 245, 245)",
      fill: "rgb(245, 245, 245)",
      height: "32",
      role: "img",
      viewBox: "0 0 24 24",
      width: "32",
      children: [
        p.jsx("title", { children: "Options" }),
        p.jsx("circle", { cx: "12", cy: "12", r: "1.5" }),
        p.jsx("circle", { cx: "6", cy: "12", r: "1.5" }),
        p.jsx("circle", { cx: "18", cy: "12", r: "1.5" }),
      ],
    }),
  PE = () =>
    p.jsxs("svg", {
      "aria-label": "Search",
      color: "rgb(142, 142, 142)",
      fill: "rgb(142, 142, 142)",
      height: "16",
      role: "img",
      viewBox: "0 0 24 24",
      width: "16",
      children: [
        p.jsx("title", { children: "Search" }),
        p.jsx("path", {
          d: "M19 10.5A8.5 8.5 0 1 1 10.5 2a8.5 8.5 0 0 1 8.5 8.5Z",
          fill: "none",
          stroke: "currentColor",
          strokeLinecap: "round",
          strokeLinejoin: "round",
          strokeWidth: "2",
        }),
        p.jsx("line", {
          fill: "none",
          stroke: "currentColor",
          strokeLinecap: "round",
          strokeLinejoin: "round",
          strokeWidth: "2",
          x1: "16.511",
          x2: "22",
          y1: "16.511",
          y2: "22",
        }),
      ],
    }),
  IE = () =>
    p.jsxs("svg", {
      "aria-label": "Close",
      color: "rgb(168, 168, 168)",
      fill: "rgb(168, 168, 168)",
      height: "16",
      role: "img",
      viewBox: "0 0 24 24",
      width: "16",
      children: [
        p.jsx("title", { children: "Close" }),
        p.jsx("polyline", {
          fill: "none",
          points: "20.643 3.357 12 12 3.353 20.647",
          stroke: "currentColor",
          strokeLinecap: "round",
          strokeLinejoin: "round",
          strokeWidth: "3",
        }),
        p.jsx("line", {
          fill: "none",
          stroke: "currentColor",
          strokeLinecap: "round",
          strokeLinejoin: "round",
          strokeWidth: "3",
          x1: "20.649",
          x2: "3.354",
          y1: "20.649",
          y2: "3.354",
        }),
      ],
    }),
  Sy = () =>
    p.jsxs("svg", {
      "aria-label": "Options",
      color: "rgb(245, 245, 245)",
      fill: "rgb(245, 245, 245)",
      height: "24",
      role: "img",
      viewBox: "0 0 24 24",
      width: "24",
      children: [
        p.jsx("title", { children: "Options" }),
        p.jsx("circle", {
          cx: "12",
          cy: "12",
          fill: "none",
          r: "8.635",
          stroke: "currentColor",
          strokeLinecap: "round",
          strokeLinejoin: "round",
          strokeWidth: "2",
        }),
        p.jsx("path", {
          d: "M14.232 3.656a1.269 1.269 0 0 1-.796-.66L12.93 2h-1.86l-.505.996a1.269 1.269 0 0 1-.796.66m-.001 16.688a1.269 1.269 0 0 1 .796.66l.505.996h1.862l.505-.996a1.269 1.269 0 0 1 .796-.66M3.656 9.768a1.269 1.269 0 0 1-.66.796L2 11.07v1.862l.996.505a1.269 1.269 0 0 1 .66.796m16.688-.001a1.269 1.269 0 0 1 .66-.796L22 12.93v-1.86l-.996-.505a1.269 1.269 0 0 1-.66-.796M7.678 4.522a1.269 1.269 0 0 1-1.03.096l-1.06-.348L4.27 5.587l.348 1.062a1.269 1.269 0 0 1-.096 1.03m11.8 11.799a1.269 1.269 0 0 1 1.03-.096l1.06.348 1.318-1.317-.348-1.062a1.269 1.269 0 0 1 .096-1.03m-14.956.001a1.269 1.269 0 0 1 .096 1.03l-.348 1.06 1.317 1.318 1.062-.348a1.269 1.269 0 0 1 1.03.096m11.799-11.8a1.269 1.269 0 0 1-.096-1.03l.348-1.06-1.317-1.318-1.062.348a1.269 1.269 0 0 1-1.03-.096",
          fill: "none",
          stroke: "currentColor",
          strokeLinejoin: "round",
          strokeWidth: "2",
        }),
      ],
    }),
  AE = () =>
    p.jsxs("svg", {
      "aria-label": "Next",
      color: "rgb(0, 0, 0)",
      fill: "rgb(0, 0, 0)",
      height: "16",
      role: "img",
      viewBox: "0 0 24 24",
      width: "16",
      children: [
        p.jsx("title", { children: "Next" }),
        p.jsx("path", {
          d: "M21 17.502a.997.997 0 0 1-.707-.293L12 8.913l-8.293 8.296a1 1 0 1 1-1.414-1.414l9-9.004a1.03 1.03 0 0 1 1.414 0l9 9.004A1 1 0 0 1 21 17.502Z",
        }),
      ],
    }),
  DE = () =>
    p.jsxs("svg", {
      "aria-label": "Go Back",
      color: "rgb(0, 0, 0)",
      fill: "rgb(0, 0, 0)",
      height: "16",
      role: "img",
      viewBox: "0 0 24 24",
      width: "16",
      children: [
        p.jsx("title", { children: "Go Back" }),
        p.jsx("path", {
          d: "M21 17.502a.997.997 0 0 1-.707-.293L12 8.913l-8.293 8.296a1 1 0 1 1-1.414-1.414l9-9.004a1.03 1.03 0 0 1 1.414 0l9 9.004A1 1 0 0 1 21 17.502Z",
        }),
      ],
    }),
  OE = () =>
    p.jsxs("svg", {
      "aria-label": "Saved",
      color: "rgb(245, 245, 245)",
      fill: "rgb(245, 245, 245)",
      height: "18",
      role: "img",
      viewBox: "0 0 24 24",
      width: "18",
      children: [
        p.jsx("title", { children: "Saved" }),
        p.jsx("polygon", {
          fill: "none",
          points: "20 21 12 13.44 4 21 4 3 20 3 20 21",
          stroke: "currentColor",
          strokeLinecap: "round",
          strokeLinejoin: "round",
          strokeWidth: "2",
        }),
      ],
    });
var Cy = { exports: {} },
  Ey = {};
/**
 * @license React
 * use-sync-external-store-shim.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Xi = S;
function jE(e, t) {
  return (e === t && (e !== 0 || 1 / e === 1 / t)) || (e !== e && t !== t);
}
var NE = typeof Object.is == "function" ? Object.is : jE,
  RE = Xi.useState,
  LE = Xi.useEffect,
  ME = Xi.useLayoutEffect,
  _E = Xi.useDebugValue;
function $E(e, t) {
  var n = t(),
    r = RE({ inst: { value: n, getSnapshot: t } }),
    i = r[0].inst,
    o = r[1];
  return (
    ME(
      function () {
        (i.value = n), (i.getSnapshot = t), Ec(i) && o({ inst: i });
      },
      [e, n, t]
    ),
    LE(
      function () {
        return (
          Ec(i) && o({ inst: i }),
          e(function () {
            Ec(i) && o({ inst: i });
          })
        );
      },
      [e]
    ),
    _E(n),
    n
  );
}
function Ec(e) {
  var t = e.getSnapshot;
  e = e.value;
  try {
    var n = t();
    return !NE(e, n);
  } catch {
    return !0;
  }
}
function BE(e, t) {
  return t();
}
var zE =
  typeof window > "u" ||
  typeof window.document > "u" ||
  typeof window.document.createElement > "u"
    ? BE
    : $E;
Ey.useSyncExternalStore =
  Xi.useSyncExternalStore !== void 0 ? Xi.useSyncExternalStore : zE;
Cy.exports = Ey;
var FE = Cy.exports,
  Ty = { exports: {} },
  ky = {};
/**
 * @license React
 * use-sync-external-store-shim/with-selector.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Tu = S,
  UE = FE;
function HE(e, t) {
  return (e === t && (e !== 0 || 1 / e === 1 / t)) || (e !== e && t !== t);
}
var GE = typeof Object.is == "function" ? Object.is : HE,
  WE = UE.useSyncExternalStore,
  VE = Tu.useRef,
  qE = Tu.useEffect,
  YE = Tu.useMemo,
  XE = Tu.useDebugValue;
ky.useSyncExternalStoreWithSelector = function (e, t, n, r, i) {
  var o = VE(null);
  if (o.current === null) {
    var a = { hasValue: !1, value: null };
    o.current = a;
  } else a = o.current;
  o = YE(
    function () {
      function s(h) {
        if (!u) {
          if (((u = !0), (d = h), (h = r(h)), i !== void 0 && a.hasValue)) {
            var v = a.value;
            if (i(v, h)) return (c = v);
          }
          return (c = h);
        }
        if (((v = c), GE(d, h))) return v;
        var y = r(h);
        return i !== void 0 && i(v, y) ? v : ((d = h), (c = y));
      }
      var u = !1,
        d,
        c,
        f = n === void 0 ? null : n;
      return [
        function () {
          return s(t());
        },
        f === null
          ? void 0
          : function () {
              return s(f());
            },
      ];
    },
    [t, n, r, i]
  );
  var l = WE(e, o[0], o[1]);
  return (
    qE(
      function () {
        (a.hasValue = !0), (a.value = l);
      },
      [l]
    ),
    XE(l),
    l
  );
};
Ty.exports = ky;
var KE = Ty.exports;
function QE(e) {
  e();
}
let Py = QE;
const ZE = (e) => (Py = e),
  JE = () => Py,
  Cr = S.createContext(null);
function Iy() {
  return S.useContext(Cr);
}
const eT = () => {
  throw new Error("uSES not initialized!");
};
let Ay = eT;
const tT = (e) => {
    Ay = e;
  },
  nT = (e, t) => e === t;
function rT(e = Cr) {
  const t = e === Cr ? Iy : () => S.useContext(e);
  return function (r, i = nT) {
    const { store: o, subscription: a, getServerState: l } = t(),
      s = Ay(a.addNestedSub, o.getState, l || o.getState, r, i);
    return S.useDebugValue(s), s;
  };
}
const ge = rT();
function ee() {
  return (
    (ee = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n)
              Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
          }
          return e;
        }),
    ee.apply(this, arguments)
  );
}
function Cs(e, t) {
  if (e == null) return {};
  var n = {},
    r = Object.keys(e),
    i,
    o;
  for (o = 0; o < r.length; o++)
    (i = r[o]), !(t.indexOf(i) >= 0) && (n[i] = e[i]);
  return n;
}
function iT() {
  const e = JE();
  let t = null,
    n = null;
  return {
    clear() {
      (t = null), (n = null);
    },
    notify() {
      e(() => {
        let r = t;
        for (; r; ) r.callback(), (r = r.next);
      });
    },
    get() {
      let r = [],
        i = t;
      for (; i; ) r.push(i), (i = i.next);
      return r;
    },
    subscribe(r) {
      let i = !0,
        o = (n = { callback: r, next: null, prev: n });
      return (
        o.prev ? (o.prev.next = o) : (t = o),
        function () {
          !i ||
            t === null ||
            ((i = !1),
            o.next ? (o.next.prev = o.prev) : (n = o.prev),
            o.prev ? (o.prev.next = o.next) : (t = o.next));
        }
      );
    },
  };
}
const cg = { notify() {}, get: () => [] };
function oT(e, t) {
  let n,
    r = cg;
  function i(c) {
    return s(), r.subscribe(c);
  }
  function o() {
    r.notify();
  }
  function a() {
    d.onStateChange && d.onStateChange();
  }
  function l() {
    return !!n;
  }
  function s() {
    n || ((n = t ? t.addNestedSub(a) : e.subscribe(a)), (r = iT()));
  }
  function u() {
    n && (n(), (n = void 0), r.clear(), (r = cg));
  }
  const d = {
    addNestedSub: i,
    notifyNestedSubs: o,
    handleChangeWrapper: a,
    isSubscribed: l,
    trySubscribe: s,
    tryUnsubscribe: u,
    getListeners: () => r,
  };
  return d;
}
const aT =
    typeof window < "u" &&
    typeof window.document < "u" &&
    typeof window.document.createElement < "u",
  lT = aT ? S.useLayoutEffect : S.useEffect;
function dg(e, t) {
  return e === t ? e !== 0 || t !== 0 || 1 / e === 1 / t : e !== e && t !== t;
}
function ve(e, t) {
  if (dg(e, t)) return !0;
  if (typeof e != "object" || e === null || typeof t != "object" || t === null)
    return !1;
  const n = Object.keys(e),
    r = Object.keys(t);
  if (n.length !== r.length) return !1;
  for (let i = 0; i < n.length; i++)
    if (!Object.prototype.hasOwnProperty.call(t, n[i]) || !dg(e[n[i]], t[n[i]]))
      return !1;
  return !0;
}
function sT({ store: e, context: t, children: n, serverState: r }) {
  const i = S.useMemo(() => {
      const l = oT(e);
      return {
        store: e,
        subscription: l,
        getServerState: r ? () => r : void 0,
      };
    }, [e, r]),
    o = S.useMemo(() => e.getState(), [e]);
  lT(() => {
    const { subscription: l } = i;
    return (
      (l.onStateChange = l.notifyNestedSubs),
      l.trySubscribe(),
      o !== e.getState() && l.notifyNestedSubs(),
      () => {
        l.tryUnsubscribe(), (l.onStateChange = void 0);
      }
    );
  }, [i, o]);
  const a = t || Cr;
  return H.createElement(a.Provider, { value: i }, n);
}
function Dy(e = Cr) {
  const t = e === Cr ? Iy : () => S.useContext(e);
  return function () {
    const { store: r } = t();
    return r;
  };
}
const uT = Dy();
function cT(e = Cr) {
  const t = e === Cr ? uT : Dy(e);
  return function () {
    return t().dispatch;
  };
}
const Ge = cT();
tT(KE.useSyncExternalStoreWithSelector);
ZE(ru.unstable_batchedUpdates);
function dn(e) {
  for (
    var t = arguments.length, n = Array(t > 1 ? t - 1 : 0), r = 1;
    r < t;
    r++
  )
    n[r - 1] = arguments[r];
  throw Error(
    "[Immer] minified error nr: " +
      e +
      (n.length
        ? " " +
          n
            .map(function (i) {
              return "'" + i + "'";
            })
            .join(",")
        : "") +
      ". Find the full error at: https://bit.ly/3cXEKWf"
  );
}
function Er(e) {
  return !!e && !!e[Re];
}
function Wn(e) {
  var t;
  return (
    !!e &&
    ((function (n) {
      if (!n || typeof n != "object") return !1;
      var r = Object.getPrototypeOf(n);
      if (r === null) return !0;
      var i = Object.hasOwnProperty.call(r, "constructor") && r.constructor;
      return (
        i === Object ||
        (typeof i == "function" && Function.toString.call(i) === xT)
      );
    })(e) ||
      Array.isArray(e) ||
      !!e[yg] ||
      !!(!((t = e.constructor) === null || t === void 0) && t[yg]) ||
      Fp(e) ||
      Up(e))
  );
}
function Zr(e, t, n) {
  n === void 0 && (n = !1),
    ao(e) === 0
      ? (n ? Object.keys : $i)(e).forEach(function (r) {
          (n && typeof r == "symbol") || t(r, e[r], e);
        })
      : e.forEach(function (r, i) {
          return t(i, r, e);
        });
}
function ao(e) {
  var t = e[Re];
  return t
    ? t.i > 3
      ? t.i - 4
      : t.i
    : Array.isArray(e)
    ? 1
    : Fp(e)
    ? 2
    : Up(e)
    ? 3
    : 0;
}
function _i(e, t) {
  return ao(e) === 2 ? e.has(t) : Object.prototype.hasOwnProperty.call(e, t);
}
function dT(e, t) {
  return ao(e) === 2 ? e.get(t) : e[t];
}
function Oy(e, t, n) {
  var r = ao(e);
  r === 2 ? e.set(t, n) : r === 3 ? e.add(n) : (e[t] = n);
}
function jy(e, t) {
  return e === t ? e !== 0 || 1 / e == 1 / t : e != e && t != t;
}
function Fp(e) {
  return vT && e instanceof Map;
}
function Up(e) {
  return yT && e instanceof Set;
}
function _r(e) {
  return e.o || e.t;
}
function Hp(e) {
  if (Array.isArray(e)) return Array.prototype.slice.call(e);
  var t = Ry(e);
  delete t[Re];
  for (var n = $i(t), r = 0; r < n.length; r++) {
    var i = n[r],
      o = t[i];
    o.writable === !1 && ((o.writable = !0), (o.configurable = !0)),
      (o.get || o.set) &&
        (t[i] = {
          configurable: !0,
          writable: !0,
          enumerable: o.enumerable,
          value: e[i],
        });
  }
  return Object.create(Object.getPrototypeOf(e), t);
}
function Gp(e, t) {
  return (
    t === void 0 && (t = !1),
    Wp(e) ||
      Er(e) ||
      !Wn(e) ||
      (ao(e) > 1 && (e.set = e.add = e.clear = e.delete = fT),
      Object.freeze(e),
      t &&
        Zr(
          e,
          function (n, r) {
            return Gp(r, !0);
          },
          !0
        )),
    e
  );
}
function fT() {
  dn(2);
}
function Wp(e) {
  return e == null || typeof e != "object" || Object.isFrozen(e);
}
function An(e) {
  var t = ff[e];
  return t || dn(18, e), t;
}
function pT(e, t) {
  ff[e] || (ff[e] = t);
}
function uf() {
  return ma;
}
function Tc(e, t) {
  t && (An("Patches"), (e.u = []), (e.s = []), (e.v = t));
}
function Es(e) {
  cf(e), e.p.forEach(mT), (e.p = null);
}
function cf(e) {
  e === ma && (ma = e.l);
}
function fg(e) {
  return (ma = { p: [], l: ma, h: e, m: !0, _: 0 });
}
function mT(e) {
  var t = e[Re];
  t.i === 0 || t.i === 1 ? t.j() : (t.g = !0);
}
function kc(e, t) {
  t._ = t.p.length;
  var n = t.p[0],
    r = e !== void 0 && e !== n;
  return (
    t.h.O || An("ES5").S(t, e, r),
    r
      ? (n[Re].P && (Es(t), dn(4)),
        Wn(e) && ((e = Ts(t, e)), t.l || ks(t, e)),
        t.u && An("Patches").M(n[Re].t, e, t.u, t.s))
      : (e = Ts(t, n, [])),
    Es(t),
    t.u && t.v(t.u, t.s),
    e !== Ny ? e : void 0
  );
}
function Ts(e, t, n) {
  if (Wp(t)) return t;
  var r = t[Re];
  if (!r)
    return (
      Zr(
        t,
        function (l, s) {
          return pg(e, r, t, l, s, n);
        },
        !0
      ),
      t
    );
  if (r.A !== e) return t;
  if (!r.P) return ks(e, r.t, !0), r.t;
  if (!r.I) {
    (r.I = !0), r.A._--;
    var i = r.i === 4 || r.i === 5 ? (r.o = Hp(r.k)) : r.o,
      o = i,
      a = !1;
    r.i === 3 && ((o = new Set(i)), i.clear(), (a = !0)),
      Zr(o, function (l, s) {
        return pg(e, r, i, l, s, n, a);
      }),
      ks(e, i, !1),
      n && e.u && An("Patches").N(r, n, e.u, e.s);
  }
  return r.o;
}
function pg(e, t, n, r, i, o, a) {
  if (Er(i)) {
    var l = Ts(e, i, o && t && t.i !== 3 && !_i(t.R, r) ? o.concat(r) : void 0);
    if ((Oy(n, r, l), !Er(l))) return;
    e.m = !1;
  } else a && n.add(i);
  if (Wn(i) && !Wp(i)) {
    if (!e.h.D && e._ < 1) return;
    Ts(e, i), (t && t.A.l) || ks(e, i);
  }
}
function ks(e, t, n) {
  n === void 0 && (n = !1), !e.l && e.h.D && e.m && Gp(t, n);
}
function Pc(e, t) {
  var n = e[Re];
  return (n ? _r(n) : e)[t];
}
function mg(e, t) {
  if (t in e)
    for (var n = Object.getPrototypeOf(e); n; ) {
      var r = Object.getOwnPropertyDescriptor(n, t);
      if (r) return r;
      n = Object.getPrototypeOf(n);
    }
}
function Zn(e) {
  e.P || ((e.P = !0), e.l && Zn(e.l));
}
function Ic(e) {
  e.o || (e.o = Hp(e.t));
}
function df(e, t, n) {
  var r = Fp(t)
    ? An("MapSet").F(t, n)
    : Up(t)
    ? An("MapSet").T(t, n)
    : e.O
    ? (function (i, o) {
        var a = Array.isArray(i),
          l = {
            i: a ? 1 : 0,
            A: o ? o.A : uf(),
            P: !1,
            I: !1,
            R: {},
            l: o,
            t: i,
            k: null,
            o: null,
            j: null,
            C: !1,
          },
          s = l,
          u = ha;
        a && ((s = [l]), (u = Oo));
        var d = Proxy.revocable(s, u),
          c = d.revoke,
          f = d.proxy;
        return (l.k = f), (l.j = c), f;
      })(t, n)
    : An("ES5").J(t, n);
  return (n ? n.A : uf()).p.push(r), r;
}
function hT(e) {
  return (
    Er(e) || dn(22, e),
    (function t(n) {
      if (!Wn(n)) return n;
      var r,
        i = n[Re],
        o = ao(n);
      if (i) {
        if (!i.P && (i.i < 4 || !An("ES5").K(i))) return i.t;
        (i.I = !0), (r = hg(n, o)), (i.I = !1);
      } else r = hg(n, o);
      return (
        Zr(r, function (a, l) {
          (i && dT(i.t, a) === l) || Oy(r, a, t(l));
        }),
        o === 3 ? new Set(r) : r
      );
    })(e)
  );
}
function hg(e, t) {
  switch (t) {
    case 2:
      return new Map(e);
    case 3:
      return Array.from(e);
  }
  return Hp(e);
}
function gT() {
  function e(o, a) {
    var l = i[o];
    return (
      l
        ? (l.enumerable = a)
        : (i[o] = l =
            {
              configurable: !0,
              enumerable: a,
              get: function () {
                var s = this[Re];
                return ha.get(s, o);
              },
              set: function (s) {
                var u = this[Re];
                ha.set(u, o, s);
              },
            }),
      l
    );
  }
  function t(o) {
    for (var a = o.length - 1; a >= 0; a--) {
      var l = o[a][Re];
      if (!l.P)
        switch (l.i) {
          case 5:
            r(l) && Zn(l);
            break;
          case 4:
            n(l) && Zn(l);
        }
    }
  }
  function n(o) {
    for (var a = o.t, l = o.k, s = $i(l), u = s.length - 1; u >= 0; u--) {
      var d = s[u];
      if (d !== Re) {
        var c = a[d];
        if (c === void 0 && !_i(a, d)) return !0;
        var f = l[d],
          h = f && f[Re];
        if (h ? h.t !== c : !jy(f, c)) return !0;
      }
    }
    var v = !!a[Re];
    return s.length !== $i(a).length + (v ? 0 : 1);
  }
  function r(o) {
    var a = o.k;
    if (a.length !== o.t.length) return !0;
    var l = Object.getOwnPropertyDescriptor(a, a.length - 1);
    if (l && !l.get) return !0;
    for (var s = 0; s < a.length; s++) if (!a.hasOwnProperty(s)) return !0;
    return !1;
  }
  var i = {};
  pT("ES5", {
    J: function (o, a) {
      var l = Array.isArray(o),
        s = (function (d, c) {
          if (d) {
            for (var f = Array(c.length), h = 0; h < c.length; h++)
              Object.defineProperty(f, "" + h, e(h, !0));
            return f;
          }
          var v = Ry(c);
          delete v[Re];
          for (var y = $i(v), w = 0; w < y.length; w++) {
            var m = y[w];
            v[m] = e(m, d || !!v[m].enumerable);
          }
          return Object.create(Object.getPrototypeOf(c), v);
        })(l, o),
        u = {
          i: l ? 5 : 4,
          A: a ? a.A : uf(),
          P: !1,
          I: !1,
          R: {},
          l: a,
          t: o,
          k: s,
          o: null,
          g: !1,
          C: !1,
        };
      return Object.defineProperty(s, Re, { value: u, writable: !0 }), s;
    },
    S: function (o, a, l) {
      l
        ? Er(a) && a[Re].A === o && t(o.p)
        : (o.u &&
            (function s(u) {
              if (u && typeof u == "object") {
                var d = u[Re];
                if (d) {
                  var c = d.t,
                    f = d.k,
                    h = d.R,
                    v = d.i;
                  if (v === 4)
                    Zr(f, function (x) {
                      x !== Re &&
                        (c[x] !== void 0 || _i(c, x)
                          ? h[x] || s(f[x])
                          : ((h[x] = !0), Zn(d)));
                    }),
                      Zr(c, function (x) {
                        f[x] !== void 0 || _i(f, x) || ((h[x] = !1), Zn(d));
                      });
                  else if (v === 5) {
                    if ((r(d) && (Zn(d), (h.length = !0)), f.length < c.length))
                      for (var y = f.length; y < c.length; y++) h[y] = !1;
                    else for (var w = c.length; w < f.length; w++) h[w] = !0;
                    for (
                      var m = Math.min(f.length, c.length), g = 0;
                      g < m;
                      g++
                    )
                      f.hasOwnProperty(g) || (h[g] = !0),
                        h[g] === void 0 && s(f[g]);
                  }
                }
              }
            })(o.p[0]),
          t(o.p));
    },
    K: function (o) {
      return o.i === 4 ? n(o) : r(o);
    },
  });
}
var gg,
  ma,
  Vp = typeof Symbol < "u" && typeof Symbol("x") == "symbol",
  vT = typeof Map < "u",
  yT = typeof Set < "u",
  vg = typeof Proxy < "u" && Proxy.revocable !== void 0 && typeof Reflect < "u",
  Ny = Vp
    ? Symbol.for("immer-nothing")
    : (((gg = {})["immer-nothing"] = !0), gg),
  yg = Vp ? Symbol.for("immer-draftable") : "__$immer_draftable",
  Re = Vp ? Symbol.for("immer-state") : "__$immer_state",
  xT = "" + Object.prototype.constructor,
  $i =
    typeof Reflect < "u" && Reflect.ownKeys
      ? Reflect.ownKeys
      : Object.getOwnPropertySymbols !== void 0
      ? function (e) {
          return Object.getOwnPropertyNames(e).concat(
            Object.getOwnPropertySymbols(e)
          );
        }
      : Object.getOwnPropertyNames,
  Ry =
    Object.getOwnPropertyDescriptors ||
    function (e) {
      var t = {};
      return (
        $i(e).forEach(function (n) {
          t[n] = Object.getOwnPropertyDescriptor(e, n);
        }),
        t
      );
    },
  ff = {},
  ha = {
    get: function (e, t) {
      if (t === Re) return e;
      var n = _r(e);
      if (!_i(n, t))
        return (function (i, o, a) {
          var l,
            s = mg(o, a);
          return s
            ? "value" in s
              ? s.value
              : (l = s.get) === null || l === void 0
              ? void 0
              : l.call(i.k)
            : void 0;
        })(e, n, t);
      var r = n[t];
      return e.I || !Wn(r)
        ? r
        : r === Pc(e.t, t)
        ? (Ic(e), (e.o[t] = df(e.A.h, r, e)))
        : r;
    },
    has: function (e, t) {
      return t in _r(e);
    },
    ownKeys: function (e) {
      return Reflect.ownKeys(_r(e));
    },
    set: function (e, t, n) {
      var r = mg(_r(e), t);
      if (r != null && r.set) return r.set.call(e.k, n), !0;
      if (!e.P) {
        var i = Pc(_r(e), t),
          o = i == null ? void 0 : i[Re];
        if (o && o.t === n) return (e.o[t] = n), (e.R[t] = !1), !0;
        if (jy(n, i) && (n !== void 0 || _i(e.t, t))) return !0;
        Ic(e), Zn(e);
      }
      return (
        (e.o[t] === n && (n !== void 0 || t in e.o)) ||
          (Number.isNaN(n) && Number.isNaN(e.o[t])) ||
          ((e.o[t] = n), (e.R[t] = !0)),
        !0
      );
    },
    deleteProperty: function (e, t) {
      return (
        Pc(e.t, t) !== void 0 || t in e.t
          ? ((e.R[t] = !1), Ic(e), Zn(e))
          : delete e.R[t],
        e.o && delete e.o[t],
        !0
      );
    },
    getOwnPropertyDescriptor: function (e, t) {
      var n = _r(e),
        r = Reflect.getOwnPropertyDescriptor(n, t);
      return (
        r && {
          writable: !0,
          configurable: e.i !== 1 || t !== "length",
          enumerable: r.enumerable,
          value: n[t],
        }
      );
    },
    defineProperty: function () {
      dn(11);
    },
    getPrototypeOf: function (e) {
      return Object.getPrototypeOf(e.t);
    },
    setPrototypeOf: function () {
      dn(12);
    },
  },
  Oo = {};
Zr(ha, function (e, t) {
  Oo[e] = function () {
    return (arguments[0] = arguments[0][0]), t.apply(this, arguments);
  };
}),
  (Oo.deleteProperty = function (e, t) {
    return Oo.set.call(this, e, t, void 0);
  }),
  (Oo.set = function (e, t, n) {
    return ha.set.call(this, e[0], t, n, e[0]);
  });
var wT = (function () {
    function e(n) {
      var r = this;
      (this.O = vg),
        (this.D = !0),
        (this.produce = function (i, o, a) {
          if (typeof i == "function" && typeof o != "function") {
            var l = o;
            o = i;
            var s = r;
            return function (y) {
              var w = this;
              y === void 0 && (y = l);
              for (
                var m = arguments.length, g = Array(m > 1 ? m - 1 : 0), x = 1;
                x < m;
                x++
              )
                g[x - 1] = arguments[x];
              return s.produce(y, function (b) {
                var C;
                return (C = o).call.apply(C, [w, b].concat(g));
              });
            };
          }
          var u;
          if (
            (typeof o != "function" && dn(6),
            a !== void 0 && typeof a != "function" && dn(7),
            Wn(i))
          ) {
            var d = fg(r),
              c = df(r, i, void 0),
              f = !0;
            try {
              (u = o(c)), (f = !1);
            } finally {
              f ? Es(d) : cf(d);
            }
            return typeof Promise < "u" && u instanceof Promise
              ? u.then(
                  function (y) {
                    return Tc(d, a), kc(y, d);
                  },
                  function (y) {
                    throw (Es(d), y);
                  }
                )
              : (Tc(d, a), kc(u, d));
          }
          if (!i || typeof i != "object") {
            if (
              ((u = o(i)) === void 0 && (u = i),
              u === Ny && (u = void 0),
              r.D && Gp(u, !0),
              a)
            ) {
              var h = [],
                v = [];
              An("Patches").M(i, u, h, v), a(h, v);
            }
            return u;
          }
          dn(21, i);
        }),
        (this.produceWithPatches = function (i, o) {
          if (typeof i == "function")
            return function (u) {
              for (
                var d = arguments.length, c = Array(d > 1 ? d - 1 : 0), f = 1;
                f < d;
                f++
              )
                c[f - 1] = arguments[f];
              return r.produceWithPatches(u, function (h) {
                return i.apply(void 0, [h].concat(c));
              });
            };
          var a,
            l,
            s = r.produce(i, o, function (u, d) {
              (a = u), (l = d);
            });
          return typeof Promise < "u" && s instanceof Promise
            ? s.then(function (u) {
                return [u, a, l];
              })
            : [s, a, l];
        }),
        typeof (n == null ? void 0 : n.useProxies) == "boolean" &&
          this.setUseProxies(n.useProxies),
        typeof (n == null ? void 0 : n.autoFreeze) == "boolean" &&
          this.setAutoFreeze(n.autoFreeze);
    }
    var t = e.prototype;
    return (
      (t.createDraft = function (n) {
        Wn(n) || dn(8), Er(n) && (n = hT(n));
        var r = fg(this),
          i = df(this, n, void 0);
        return (i[Re].C = !0), cf(r), i;
      }),
      (t.finishDraft = function (n, r) {
        var i = n && n[Re],
          o = i.A;
        return Tc(o, r), kc(void 0, o);
      }),
      (t.setAutoFreeze = function (n) {
        this.D = n;
      }),
      (t.setUseProxies = function (n) {
        n && !vg && dn(20), (this.O = n);
      }),
      (t.applyPatches = function (n, r) {
        var i;
        for (i = r.length - 1; i >= 0; i--) {
          var o = r[i];
          if (o.path.length === 0 && o.op === "replace") {
            n = o.value;
            break;
          }
        }
        i > -1 && (r = r.slice(i + 1));
        var a = An("Patches").$;
        return Er(n)
          ? a(n, r)
          : this.produce(n, function (l) {
              return a(l, r);
            });
      }),
      e
    );
  })(),
  _t = new wT(),
  Ly = _t.produce;
_t.produceWithPatches.bind(_t);
_t.setAutoFreeze.bind(_t);
_t.setUseProxies.bind(_t);
_t.applyPatches.bind(_t);
_t.createDraft.bind(_t);
_t.finishDraft.bind(_t);
function ga(e) {
  "@babel/helpers - typeof";
  return (
    (ga =
      typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
        ? function (t) {
            return typeof t;
          }
        : function (t) {
            return t &&
              typeof Symbol == "function" &&
              t.constructor === Symbol &&
              t !== Symbol.prototype
              ? "symbol"
              : typeof t;
          }),
    ga(e)
  );
}
function bT(e, t) {
  if (ga(e) !== "object" || e === null) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t || "default");
    if (ga(r) !== "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function ST(e) {
  var t = bT(e, "string");
  return ga(t) === "symbol" ? t : String(t);
}
function CT(e, t, n) {
  return (
    (t = ST(t)),
    t in e
      ? Object.defineProperty(e, t, {
          value: n,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[t] = n),
    e
  );
}
function xg(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t &&
      (r = r.filter(function (i) {
        return Object.getOwnPropertyDescriptor(e, i).enumerable;
      })),
      n.push.apply(n, r);
  }
  return n;
}
function wg(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2
      ? xg(Object(n), !0).forEach(function (r) {
          CT(e, r, n[r]);
        })
      : Object.getOwnPropertyDescriptors
      ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
      : xg(Object(n)).forEach(function (r) {
          Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
        });
  }
  return e;
}
function ot(e) {
  return (
    "Minified Redux error #" +
    e +
    "; visit https://redux.js.org/Errors?code=" +
    e +
    " for the full message or use the non-minified dev environment for full errors. "
  );
}
var bg = (function () {
    return (typeof Symbol == "function" && Symbol.observable) || "@@observable";
  })(),
  Ac = function () {
    return Math.random().toString(36).substring(7).split("").join(".");
  },
  Ps = {
    INIT: "@@redux/INIT" + Ac(),
    REPLACE: "@@redux/REPLACE" + Ac(),
    PROBE_UNKNOWN_ACTION: function () {
      return "@@redux/PROBE_UNKNOWN_ACTION" + Ac();
    },
  };
function ET(e) {
  if (typeof e != "object" || e === null) return !1;
  for (var t = e; Object.getPrototypeOf(t) !== null; )
    t = Object.getPrototypeOf(t);
  return Object.getPrototypeOf(e) === t;
}
function qp(e, t, n) {
  var r;
  if (
    (typeof t == "function" && typeof n == "function") ||
    (typeof n == "function" && typeof arguments[3] == "function")
  )
    throw new Error(ot(0));
  if (
    (typeof t == "function" && typeof n > "u" && ((n = t), (t = void 0)),
    typeof n < "u")
  ) {
    if (typeof n != "function") throw new Error(ot(1));
    return n(qp)(e, t);
  }
  if (typeof e != "function") throw new Error(ot(2));
  var i = e,
    o = t,
    a = [],
    l = a,
    s = !1;
  function u() {
    l === a && (l = a.slice());
  }
  function d() {
    if (s) throw new Error(ot(3));
    return o;
  }
  function c(y) {
    if (typeof y != "function") throw new Error(ot(4));
    if (s) throw new Error(ot(5));
    var w = !0;
    return (
      u(),
      l.push(y),
      function () {
        if (w) {
          if (s) throw new Error(ot(6));
          (w = !1), u();
          var g = l.indexOf(y);
          l.splice(g, 1), (a = null);
        }
      }
    );
  }
  function f(y) {
    if (!ET(y)) throw new Error(ot(7));
    if (typeof y.type > "u") throw new Error(ot(8));
    if (s) throw new Error(ot(9));
    try {
      (s = !0), (o = i(o, y));
    } finally {
      s = !1;
    }
    for (var w = (a = l), m = 0; m < w.length; m++) {
      var g = w[m];
      g();
    }
    return y;
  }
  function h(y) {
    if (typeof y != "function") throw new Error(ot(10));
    (i = y), f({ type: Ps.REPLACE });
  }
  function v() {
    var y,
      w = c;
    return (
      (y = {
        subscribe: function (g) {
          if (typeof g != "object" || g === null) throw new Error(ot(11));
          function x() {
            g.next && g.next(d());
          }
          x();
          var b = w(x);
          return { unsubscribe: b };
        },
      }),
      (y[bg] = function () {
        return this;
      }),
      y
    );
  }
  return (
    f({ type: Ps.INIT }),
    (r = { dispatch: f, subscribe: c, getState: d, replaceReducer: h }),
    (r[bg] = v),
    r
  );
}
function TT(e) {
  Object.keys(e).forEach(function (t) {
    var n = e[t],
      r = n(void 0, { type: Ps.INIT });
    if (typeof r > "u") throw new Error(ot(12));
    if (typeof n(void 0, { type: Ps.PROBE_UNKNOWN_ACTION() }) > "u")
      throw new Error(ot(13));
  });
}
function kT(e) {
  for (var t = Object.keys(e), n = {}, r = 0; r < t.length; r++) {
    var i = t[r];
    typeof e[i] == "function" && (n[i] = e[i]);
  }
  var o = Object.keys(n),
    a;
  try {
    TT(n);
  } catch (l) {
    a = l;
  }
  return function (s, u) {
    if ((s === void 0 && (s = {}), a)) throw a;
    for (var d = !1, c = {}, f = 0; f < o.length; f++) {
      var h = o[f],
        v = n[h],
        y = s[h],
        w = v(y, u);
      if (typeof w > "u") throw (u && u.type, new Error(ot(14)));
      (c[h] = w), (d = d || w !== y);
    }
    return (d = d || o.length !== Object.keys(s).length), d ? c : s;
  };
}
function Sg(e, t) {
  return function () {
    return t(e.apply(this, arguments));
  };
}
function Cg(e, t) {
  if (typeof e == "function") return Sg(e, t);
  if (typeof e != "object" || e === null) throw new Error(ot(16));
  var n = {};
  for (var r in e) {
    var i = e[r];
    typeof i == "function" && (n[r] = Sg(i, t));
  }
  return n;
}
function va() {
  for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
    t[n] = arguments[n];
  return t.length === 0
    ? function (r) {
        return r;
      }
    : t.length === 1
    ? t[0]
    : t.reduce(function (r, i) {
        return function () {
          return r(i.apply(void 0, arguments));
        };
      });
}
function My() {
  for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
    t[n] = arguments[n];
  return function (r) {
    return function () {
      var i = r.apply(void 0, arguments),
        o = function () {
          throw new Error(ot(15));
        },
        a = {
          getState: i.getState,
          dispatch: function () {
            return o.apply(void 0, arguments);
          },
        },
        l = t.map(function (s) {
          return s(a);
        });
      return (
        (o = va.apply(void 0, l)(i.dispatch)),
        wg(wg({}, i), {}, { dispatch: o })
      );
    };
  };
}
function _y(e) {
  var t = function (r) {
    var i = r.dispatch,
      o = r.getState;
    return function (a) {
      return function (l) {
        return typeof l == "function" ? l(i, o, e) : a(l);
      };
    };
  };
  return t;
}
var $y = _y();
$y.withExtraArgument = _y;
const Eg = $y;
var By =
    (globalThis && globalThis.__extends) ||
    (function () {
      var e = function (t, n) {
        return (
          (e =
            Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array &&
              function (r, i) {
                r.__proto__ = i;
              }) ||
            function (r, i) {
              for (var o in i)
                Object.prototype.hasOwnProperty.call(i, o) && (r[o] = i[o]);
            }),
          e(t, n)
        );
      };
      return function (t, n) {
        if (typeof n != "function" && n !== null)
          throw new TypeError(
            "Class extends value " + String(n) + " is not a constructor or null"
          );
        e(t, n);
        function r() {
          this.constructor = t;
        }
        t.prototype =
          n === null
            ? Object.create(n)
            : ((r.prototype = n.prototype), new r());
      };
    })(),
  PT =
    (globalThis && globalThis.__generator) ||
    function (e, t) {
      var n = {
          label: 0,
          sent: function () {
            if (o[0] & 1) throw o[1];
            return o[1];
          },
          trys: [],
          ops: [],
        },
        r,
        i,
        o,
        a;
      return (
        (a = { next: l(0), throw: l(1), return: l(2) }),
        typeof Symbol == "function" &&
          (a[Symbol.iterator] = function () {
            return this;
          }),
        a
      );
      function l(u) {
        return function (d) {
          return s([u, d]);
        };
      }
      function s(u) {
        if (r) throw new TypeError("Generator is already executing.");
        for (; n; )
          try {
            if (
              ((r = 1),
              i &&
                (o =
                  u[0] & 2
                    ? i.return
                    : u[0]
                    ? i.throw || ((o = i.return) && o.call(i), 0)
                    : i.next) &&
                !(o = o.call(i, u[1])).done)
            )
              return o;
            switch (((i = 0), o && (u = [u[0] & 2, o.value]), u[0])) {
              case 0:
              case 1:
                o = u;
                break;
              case 4:
                return n.label++, { value: u[1], done: !1 };
              case 5:
                n.label++, (i = u[1]), (u = [0]);
                continue;
              case 7:
                (u = n.ops.pop()), n.trys.pop();
                continue;
              default:
                if (
                  ((o = n.trys),
                  !(o = o.length > 0 && o[o.length - 1]) &&
                    (u[0] === 6 || u[0] === 2))
                ) {
                  n = 0;
                  continue;
                }
                if (u[0] === 3 && (!o || (u[1] > o[0] && u[1] < o[3]))) {
                  n.label = u[1];
                  break;
                }
                if (u[0] === 6 && n.label < o[1]) {
                  (n.label = o[1]), (o = u);
                  break;
                }
                if (o && n.label < o[2]) {
                  (n.label = o[2]), n.ops.push(u);
                  break;
                }
                o[2] && n.ops.pop(), n.trys.pop();
                continue;
            }
            u = t.call(e, n);
          } catch (d) {
            (u = [6, d]), (i = 0);
          } finally {
            r = o = 0;
          }
        if (u[0] & 5) throw u[1];
        return { value: u[0] ? u[1] : void 0, done: !0 };
      }
    },
  Ki =
    (globalThis && globalThis.__spreadArray) ||
    function (e, t) {
      for (var n = 0, r = t.length, i = e.length; n < r; n++, i++) e[i] = t[n];
      return e;
    },
  IT = Object.defineProperty,
  AT = Object.defineProperties,
  DT = Object.getOwnPropertyDescriptors,
  Tg = Object.getOwnPropertySymbols,
  OT = Object.prototype.hasOwnProperty,
  jT = Object.prototype.propertyIsEnumerable,
  kg = function (e, t, n) {
    return t in e
      ? IT(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n })
      : (e[t] = n);
  },
  hr = function (e, t) {
    for (var n in t || (t = {})) OT.call(t, n) && kg(e, n, t[n]);
    if (Tg)
      for (var r = 0, i = Tg(t); r < i.length; r++) {
        var n = i[r];
        jT.call(t, n) && kg(e, n, t[n]);
      }
    return e;
  },
  Dc = function (e, t) {
    return AT(e, DT(t));
  },
  NT = function (e, t, n) {
    return new Promise(function (r, i) {
      var o = function (s) {
          try {
            l(n.next(s));
          } catch (u) {
            i(u);
          }
        },
        a = function (s) {
          try {
            l(n.throw(s));
          } catch (u) {
            i(u);
          }
        },
        l = function (s) {
          return s.done ? r(s.value) : Promise.resolve(s.value).then(o, a);
        };
      l((n = n.apply(e, t)).next());
    });
  },
  RT =
    typeof window < "u" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      : function () {
          if (arguments.length !== 0)
            return typeof arguments[0] == "object"
              ? va
              : va.apply(null, arguments);
        };
function LT(e) {
  if (typeof e != "object" || e === null) return !1;
  var t = Object.getPrototypeOf(e);
  if (t === null) return !0;
  for (var n = t; Object.getPrototypeOf(n) !== null; )
    n = Object.getPrototypeOf(n);
  return t === n;
}
var MT = (function (e) {
    By(t, e);
    function t() {
      for (var n = [], r = 0; r < arguments.length; r++) n[r] = arguments[r];
      var i = e.apply(this, n) || this;
      return Object.setPrototypeOf(i, t.prototype), i;
    }
    return (
      Object.defineProperty(t, Symbol.species, {
        get: function () {
          return t;
        },
        enumerable: !1,
        configurable: !0,
      }),
      (t.prototype.concat = function () {
        for (var n = [], r = 0; r < arguments.length; r++) n[r] = arguments[r];
        return e.prototype.concat.apply(this, n);
      }),
      (t.prototype.prepend = function () {
        for (var n = [], r = 0; r < arguments.length; r++) n[r] = arguments[r];
        return n.length === 1 && Array.isArray(n[0])
          ? new (t.bind.apply(t, Ki([void 0], n[0].concat(this))))()
          : new (t.bind.apply(t, Ki([void 0], n.concat(this))))();
      }),
      t
    );
  })(Array),
  _T = (function (e) {
    By(t, e);
    function t() {
      for (var n = [], r = 0; r < arguments.length; r++) n[r] = arguments[r];
      var i = e.apply(this, n) || this;
      return Object.setPrototypeOf(i, t.prototype), i;
    }
    return (
      Object.defineProperty(t, Symbol.species, {
        get: function () {
          return t;
        },
        enumerable: !1,
        configurable: !0,
      }),
      (t.prototype.concat = function () {
        for (var n = [], r = 0; r < arguments.length; r++) n[r] = arguments[r];
        return e.prototype.concat.apply(this, n);
      }),
      (t.prototype.prepend = function () {
        for (var n = [], r = 0; r < arguments.length; r++) n[r] = arguments[r];
        return n.length === 1 && Array.isArray(n[0])
          ? new (t.bind.apply(t, Ki([void 0], n[0].concat(this))))()
          : new (t.bind.apply(t, Ki([void 0], n.concat(this))))();
      }),
      t
    );
  })(Array);
function pf(e) {
  return Wn(e) ? Ly(e, function () {}) : e;
}
function $T(e) {
  return typeof e == "boolean";
}
function BT() {
  return function (t) {
    return zT(t);
  };
}
function zT(e) {
  e === void 0 && (e = {});
  var t = e.thunk,
    n = t === void 0 ? !0 : t;
  e.immutableCheck, e.serializableCheck;
  var r = new MT();
  return (
    n && ($T(n) ? r.push(Eg) : r.push(Eg.withExtraArgument(n.extraArgument))), r
  );
}
var FT = !0;
function UT(e) {
  var t = BT(),
    n = e || {},
    r = n.reducer,
    i = r === void 0 ? void 0 : r,
    o = n.middleware,
    a = o === void 0 ? t() : o,
    l = n.devTools,
    s = l === void 0 ? !0 : l,
    u = n.preloadedState,
    d = u === void 0 ? void 0 : u,
    c = n.enhancers,
    f = c === void 0 ? void 0 : c,
    h;
  if (typeof i == "function") h = i;
  else if (LT(i)) h = kT(i);
  else
    throw new Error(
      '"reducer" is a required argument, and must be a function or an object of functions that can be passed to combineReducers'
    );
  var v = a;
  typeof v == "function" && (v = v(t));
  var y = My.apply(void 0, v),
    w = va;
  s && (w = RT(hr({ trace: !FT }, typeof s == "object" && s)));
  var m = new _T(y),
    g = m;
  Array.isArray(f) ? (g = Ki([y], f)) : typeof f == "function" && (g = f(m));
  var x = w.apply(void 0, g);
  return qp(h, d, x);
}
function gr(e, t) {
  function n() {
    for (var r = [], i = 0; i < arguments.length; i++) r[i] = arguments[i];
    if (t) {
      var o = t.apply(void 0, r);
      if (!o) throw new Error("prepareAction did not return an object");
      return hr(
        hr({ type: e, payload: o.payload }, "meta" in o && { meta: o.meta }),
        "error" in o && { error: o.error }
      );
    }
    return { type: e, payload: r[0] };
  }
  return (
    (n.toString = function () {
      return "" + e;
    }),
    (n.type = e),
    (n.match = function (r) {
      return r.type === e;
    }),
    n
  );
}
function zy(e) {
  var t = {},
    n = [],
    r,
    i = {
      addCase: function (o, a) {
        var l = typeof o == "string" ? o : o.type;
        if (l in t)
          throw new Error(
            "addCase cannot be called with two reducers for the same action type"
          );
        return (t[l] = a), i;
      },
      addMatcher: function (o, a) {
        return n.push({ matcher: o, reducer: a }), i;
      },
      addDefaultCase: function (o) {
        return (r = o), i;
      },
    };
  return e(i), [t, n, r];
}
function HT(e) {
  return typeof e == "function";
}
function GT(e, t, n, r) {
  n === void 0 && (n = []);
  var i = typeof t == "function" ? zy(t) : [t, n, r],
    o = i[0],
    a = i[1],
    l = i[2],
    s;
  if (HT(e))
    s = function () {
      return pf(e());
    };
  else {
    var u = pf(e);
    s = function () {
      return u;
    };
  }
  function d(c, f) {
    c === void 0 && (c = s());
    var h = Ki(
      [o[f.type]],
      a
        .filter(function (v) {
          var y = v.matcher;
          return y(f);
        })
        .map(function (v) {
          var y = v.reducer;
          return y;
        })
    );
    return (
      h.filter(function (v) {
        return !!v;
      }).length === 0 && (h = [l]),
      h.reduce(function (v, y) {
        if (y)
          if (Er(v)) {
            var w = v,
              m = y(w, f);
            return m === void 0 ? v : m;
          } else {
            if (Wn(v))
              return Ly(v, function (g) {
                return y(g, f);
              });
            var m = y(v, f);
            if (m === void 0) {
              if (v === null) return v;
              throw Error(
                "A case reducer on a non-draftable value must not return undefined"
              );
            }
            return m;
          }
        return v;
      }, c)
    );
  }
  return (d.getInitialState = s), d;
}
function WT(e, t) {
  return e + "/" + t;
}
function Fy(e) {
  var t = e.name;
  if (!t) throw new Error("`name` is a required option for createSlice");
  typeof process < "u";
  var n =
      typeof e.initialState == "function" ? e.initialState : pf(e.initialState),
    r = e.reducers || {},
    i = Object.keys(r),
    o = {},
    a = {},
    l = {};
  i.forEach(function (d) {
    var c = r[d],
      f = WT(t, d),
      h,
      v;
    "reducer" in c ? ((h = c.reducer), (v = c.prepare)) : (h = c),
      (o[d] = h),
      (a[f] = h),
      (l[d] = v ? gr(f, v) : gr(f));
  });
  function s() {
    var d =
        typeof e.extraReducers == "function"
          ? zy(e.extraReducers)
          : [e.extraReducers],
      c = d[0],
      f = c === void 0 ? {} : c,
      h = d[1],
      v = h === void 0 ? [] : h,
      y = d[2],
      w = y === void 0 ? void 0 : y,
      m = hr(hr({}, f), a);
    return GT(n, function (g) {
      for (var x in m) g.addCase(x, m[x]);
      for (var b = 0, C = v; b < C.length; b++) {
        var E = C[b];
        g.addMatcher(E.matcher, E.reducer);
      }
      w && g.addDefaultCase(w);
    });
  }
  var u;
  return {
    name: t,
    reducer: function (d, c) {
      return u || (u = s()), u(d, c);
    },
    actions: l,
    caseReducers: o,
    getInitialState: function () {
      return u || (u = s()), u.getInitialState();
    },
  };
}
var VT = "ModuleSymbhasOwnPr-0123456789ABCDEFGHNRVfgctiUvz_KqYTJkLxpZXIjQW",
  qT = function (e) {
    e === void 0 && (e = 21);
    for (var t = "", n = e; n--; ) t += VT[(Math.random() * 64) | 0];
    return t;
  },
  YT = ["name", "message", "stack", "code"],
  Oc = (function () {
    function e(t, n) {
      (this.payload = t), (this.meta = n);
    }
    return e;
  })(),
  Pg = (function () {
    function e(t, n) {
      (this.payload = t), (this.meta = n);
    }
    return e;
  })(),
  XT = function (e) {
    if (typeof e == "object" && e !== null) {
      for (var t = {}, n = 0, r = YT; n < r.length; n++) {
        var i = r[n];
        typeof e[i] == "string" && (t[i] = e[i]);
      }
      return t;
    }
    return { message: String(e) };
  },
  rn = (function () {
    function e(t, n, r) {
      var i = gr(t + "/fulfilled", function (u, d, c, f) {
          return {
            payload: u,
            meta: Dc(hr({}, f || {}), {
              arg: c,
              requestId: d,
              requestStatus: "fulfilled",
            }),
          };
        }),
        o = gr(t + "/pending", function (u, d, c) {
          return {
            payload: void 0,
            meta: Dc(hr({}, c || {}), {
              arg: d,
              requestId: u,
              requestStatus: "pending",
            }),
          };
        }),
        a = gr(t + "/rejected", function (u, d, c, f, h) {
          return {
            payload: f,
            error: ((r && r.serializeError) || XT)(u || "Rejected"),
            meta: Dc(hr({}, h || {}), {
              arg: c,
              requestId: d,
              rejectedWithValue: !!f,
              requestStatus: "rejected",
              aborted: (u == null ? void 0 : u.name) === "AbortError",
              condition: (u == null ? void 0 : u.name) === "ConditionError",
            }),
          };
        }),
        l =
          typeof AbortController < "u"
            ? AbortController
            : (function () {
                function u() {
                  this.signal = {
                    aborted: !1,
                    addEventListener: function () {},
                    dispatchEvent: function () {
                      return !1;
                    },
                    onabort: function () {},
                    removeEventListener: function () {},
                    reason: void 0,
                    throwIfAborted: function () {},
                  };
                }
                return (u.prototype.abort = function () {}), u;
              })();
      function s(u) {
        return function (d, c, f) {
          var h = r != null && r.idGenerator ? r.idGenerator(u) : qT(),
            v = new l(),
            y;
          function w(g) {
            (y = g), v.abort();
          }
          var m = (function () {
            return NT(this, null, function () {
              var g, x, b, C, E, P, T;
              return PT(this, function (I) {
                switch (I.label) {
                  case 0:
                    return (
                      I.trys.push([0, 4, , 5]),
                      (C =
                        (g = r == null ? void 0 : r.condition) == null
                          ? void 0
                          : g.call(r, u, { getState: c, extra: f })),
                      QT(C) ? [4, C] : [3, 2]
                    );
                  case 1:
                    (C = I.sent()), (I.label = 2);
                  case 2:
                    if (C === !1 || v.signal.aborted)
                      throw {
                        name: "ConditionError",
                        message:
                          "Aborted due to condition callback returning false.",
                      };
                    return (
                      (E = new Promise(function (O, D) {
                        return v.signal.addEventListener("abort", function () {
                          return D({
                            name: "AbortError",
                            message: y || "Aborted",
                          });
                        });
                      })),
                      d(
                        o(
                          h,
                          u,
                          (x = r == null ? void 0 : r.getPendingMeta) == null
                            ? void 0
                            : x.call(
                                r,
                                { requestId: h, arg: u },
                                { getState: c, extra: f }
                              )
                        )
                      ),
                      [
                        4,
                        Promise.race([
                          E,
                          Promise.resolve(
                            n(u, {
                              dispatch: d,
                              getState: c,
                              extra: f,
                              requestId: h,
                              signal: v.signal,
                              abort: w,
                              rejectWithValue: function (O, D) {
                                return new Oc(O, D);
                              },
                              fulfillWithValue: function (O, D) {
                                return new Pg(O, D);
                              },
                            })
                          ).then(function (O) {
                            if (O instanceof Oc) throw O;
                            return O instanceof Pg
                              ? i(O.payload, h, u, O.meta)
                              : i(O, h, u);
                          }),
                        ]),
                      ]
                    );
                  case 3:
                    return (b = I.sent()), [3, 5];
                  case 4:
                    return (
                      (P = I.sent()),
                      (b =
                        P instanceof Oc
                          ? a(null, h, u, P.payload, P.meta)
                          : a(P, h, u)),
                      [3, 5]
                    );
                  case 5:
                    return (
                      (T =
                        r &&
                        !r.dispatchConditionRejection &&
                        a.match(b) &&
                        b.meta.condition),
                      T || d(b),
                      [2, b]
                    );
                }
              });
            });
          })();
          return Object.assign(m, {
            abort: w,
            requestId: h,
            arg: u,
            unwrap: function () {
              return m.then(KT);
            },
          });
        };
      }
      return Object.assign(s, {
        pending: o,
        rejected: a,
        fulfilled: i,
        typePrefix: t,
      });
    }
    return (
      (e.withTypes = function () {
        return e;
      }),
      e
    );
  })();
function KT(e) {
  if (e.meta && e.meta.rejectedWithValue) throw e.payload;
  if (e.error) throw e.error;
  return e.payload;
}
function QT(e) {
  return e !== null && typeof e == "object" && typeof e.then == "function";
}
var Yp = "listenerMiddleware";
gr(Yp + "/add");
gr(Yp + "/removeAll");
gr(Yp + "/remove");
var Ig;
typeof queueMicrotask == "function" &&
  queueMicrotask.bind(
    typeof window < "u" ? window : typeof global < "u" ? global : globalThis
  );
gT();
const ZT = "/api",
  Me = (e, t, n) =>
    new Promise(async (r, i) => {
      t || (t = "GET");
      const o = {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        a = "cors",
        l = "include";
      try {
        const s = await fetch(ZT + e, {
            headers: o,
            method: t,
            body: t == "GET" ? null : JSON.stringify(n),
            credentials: l,
            mode: a,
          }),
          u = await s.json(),
          { status: d } = s;
        d >= 200 && d < 300
          ? r(u)
          : d == 401
          ? JT()
          : i(u == null ? void 0 : u.message);
      } catch (s) {
        i(s.toString());
      }
    }),
  JT = () => {
    (document.cookie = "isloggedin=;Max-Age=0"),
      (document.cookie = "token=;Max-age=0"),
      (document.cookie = "refreshid=;Max-Age=0"),
      document.location.reload();
  },
  Xp = rn("/profile/my", () => Me("/profile/my")),
  Ul = rn("/profile/:username", (e) => Me(`/profile/${e}`)),
  Wr = rn("/profile/:username/posts", ({ username: e, date: t, id: n }) =>
    Me(`/profile/${e}/posts?date=${t}&id=${n}`)
  ),
  ek = (e) => Me(`/profile/search?u=${e}`).then((t) => t),
  Is = rn("/profile/:username/follow~{POST|DELETE}", ({ a: e, userid: t }) =>
    Me("/profile/follow", e ? "POST" : "DELETE", { userid: t }).then((n) => n)
  ),
  Hl = rn("/profile/:username/block~{POST|DELETE}", ({ a: e, userid: t }) =>
    Me("/profile/block", e ? "POST" : "DELETE", { userid: t })
  ),
  tk = () => Me("/profile/edit").then((e) => e),
  jc = (e) => Me("/profile/edit", "POST", e).then((t) => t),
  nk = (e, t, n) => Me("/auth/password", "POST", { op: e, np: t, adlo: n }),
  rk = ({ date: e, id: t }) =>
    Me(`/profile/notifications?date=${e}&id=${t}`).then((n) => n),
  ik = () => document.cookie.includes("isloggedin=true"),
  ok = {
    isloggedin: ik(),
    loginPopupActive: !1,
    values: { username: "", pp: null, id: "" },
  },
  Uy = Fy({
    name: "profile",
    initialState: ok,
    reducers: {
      toggleSetLoginPopupActive: (e) => {
        e.loginPopupActive = !e.loginPopupActive;
      },
    },
    extraReducers: (e) => {
      e.addCase(Xp.fulfilled, (t, n) => {
        t.values = n.payload;
      });
    },
  }),
  { toggleSetLoginPopupActive: Kp } = Uy.actions,
  ak = (e) => e.profile,
  Dn = (e) => e.profile.values,
  lk = (e) => e.profile.isloggedin,
  sk = (e) => e.profile.loginPopupActive,
  uk = Uy.reducer,
  yn = () => p.jsx(ck, { className: "loading-box", children: p.jsx(dk, {}) }),
  ck = ce.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 2rem;
  @keyframes looprotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
  svg {
    animation: 1.4s linear looprotate infinite;
    width: 2rem;
    height: 2rem;
    color: #fafafa;
    fill: #fafafa;
  }
`,
  dk = () =>
    p.jsxs("svg", {
      "aria-label": "Loading...",
      className: "loading-icon",
      role: "img",
      viewBox: "0 0 100 100",
      children: [
        p.jsx("rect", {
          className: "x1i210e2",
          height: "6",
          opacity: "0",
          rx: "3",
          ry: "3",
          transform: "rotate(-90 50 50)",
          width: "25",
          x: "72",
          y: "47",
        }),
        p.jsx("rect", {
          className: "x1i210e2",
          height: "6",
          opacity: "0.08333333333333333",
          rx: "3",
          ry: "3",
          transform: "rotate(-60 50 50)",
          width: "25",
          x: "72",
          y: "47",
        }),
        p.jsx("rect", {
          className: "x1i210e2",
          height: "6",
          opacity: "0.16666666666666666",
          rx: "3",
          ry: "3",
          transform: "rotate(-30 50 50)",
          width: "25",
          x: "72",
          y: "47",
        }),
        p.jsx("rect", {
          className: "x1i210e2",
          height: "6",
          opacity: "0.25",
          rx: "3",
          ry: "3",
          transform: "rotate(0 50 50)",
          width: "25",
          x: "72",
          y: "47",
        }),
        p.jsx("rect", {
          className: "x1i210e2",
          height: "6",
          opacity: "0.3333333333333333",
          rx: "3",
          ry: "3",
          transform: "rotate(30 50 50)",
          width: "25",
          x: "72",
          y: "47",
        }),
        p.jsx("rect", {
          className: "x1i210e2",
          height: "6",
          opacity: "0.4166666666666667",
          rx: "3",
          ry: "3",
          transform: "rotate(60 50 50)",
          width: "25",
          x: "72",
          y: "47",
        }),
        p.jsx("rect", {
          className: "x1i210e2",
          height: "6",
          opacity: "0.5",
          rx: "3",
          ry: "3",
          transform: "rotate(90 50 50)",
          width: "25",
          x: "72",
          y: "47",
        }),
        p.jsx("rect", {
          className: "x1i210e2",
          height: "6",
          opacity: "0.5833333333333334",
          rx: "3",
          ry: "3",
          transform: "rotate(120 50 50)",
          width: "25",
          x: "72",
          y: "47",
        }),
        p.jsx("rect", {
          className: "x1i210e2",
          height: "6",
          opacity: "0.6666666666666666",
          rx: "3",
          ry: "3",
          transform: "rotate(150 50 50)",
          width: "25",
          x: "72",
          y: "47",
        }),
        p.jsx("rect", {
          className: "x1i210e2",
          height: "6",
          opacity: "0.75",
          rx: "3",
          ry: "3",
          transform: "rotate(180 50 50)",
          width: "25",
          x: "72",
          y: "47",
        }),
        p.jsx("rect", {
          className: "x1i210e2",
          height: "6",
          opacity: "0.8333333333333334",
          rx: "3",
          ry: "3",
          transform: "rotate(210 50 50)",
          width: "25",
          x: "72",
          y: "47",
        }),
        p.jsx("rect", {
          className: "x1i210e2",
          height: "6",
          opacity: "0.9166666666666666",
          rx: "3",
          ry: "3",
          transform: "rotate(240 50 50)",
          width: "25",
          x: "72",
          y: "47",
        }),
      ],
    }),
  fk = S.forwardRef(({ isActive: e, close: t }, n) => {
    const [r, i] = S.useState(""),
      [o, a] = S.useState(!1),
      [l, s] = S.useState([]),
      [u, d] = S.useState([]),
      [c, f] = S.useState(!1);
    S.useEffect(() => {
      var b;
      const x = localStorage.getItem("recent");
      (b = v.current) == null || b.focus(), i(""), f(!1);
      try {
        if (x) {
          const C = JSON.parse(x);
          d(C);
        }
      } catch {
        localStorage.removeItem("recent");
      }
    }, [e]);
    const h = (x) => x.preventDefault();
    S.useLayoutEffect(() => {
      f(r.trim().length != 0), s([]);
      var x;
      return (
        clearTimeout(x),
        (x = setTimeout(() => {
          r.trim().length > 0 &&
            ek(r)
              .then(s)
              .finally(() => {
                f(!1);
              });
        }, 500)),
        () => clearTimeout(x)
      );
    }, [r]),
      S.useEffect(() => {
        r.trim().length == 0 && i("");
      }, [o]);
    const v = S.useRef(null),
      y = () => a(!0),
      w = () => a(!1),
      m = (x) => {
        var C;
        let b = u;
        (C = b.find((E) => E.username == x.username)) != null &&
          C.username &&
          (b = b.filter((E) => E.username != x.username)),
          (b = [x, ...b]),
          (b = b.filter((E, P) => P < 20)),
          d(b),
          localStorage.setItem("recent", JSON.stringify(b)),
          t();
      },
      g = () => d([]);
    return (
      S.useEffect(() => {
        localStorage.setItem("recent", JSON.stringify(u));
      }, [u]),
      p.jsxs(pk, {
        className: e ? "active" : "",
        ref: n,
        children: [
          p.jsx("div", {
            className: "title",
            children: p.jsx("h1", { children: "Search" }),
          }),
          p.jsx("div", {
            className: "input",
            children: p.jsxs("form", {
              onSubmit: h,
              children: [
                !o && r.trim().length == 0 && p.jsx(PE, {}),
                p.jsx("input", {
                  ref: v,
                  onChange: (x) => i(x.target.value),
                  type: "text",
                  value: r,
                  onFocus: y,
                  onBlur: w,
                  placeholder: "Search",
                }),
                (r.length > 0 || o) &&
                  p.jsx("button", {
                    onClick: () => {
                      a(!1), i("");
                    },
                  }),
              ],
            }),
          }),
          r.trim().length == 0 &&
            p.jsxs("div", {
              className: "rp",
              children: [
                p.jsx("p", { className: "r", children: "Recent" }),
                u.length > 0 &&
                  p.jsx("button", { onClick: g, children: "Clear all" }),
              ],
            }),
          p.jsxs("ul", {
            className: r.trim().length == 0 ? "f" : "",
            children: [
              !c &&
                l.length == 0 &&
                r.trim().length != 0 &&
                p.jsx("p", { className: "nf", children: "No results found." }),
              c && p.jsx(yn, {}),
              !c &&
                (r.trim().length > 0 ? l : u).map((x) => {
                  const { username: b, pp: C, fullname: E } = x;
                  return p.jsx("li", {
                    children: p.jsxs(ft, {
                      to: `/${b}`,
                      onClick: () => m(x),
                      children: [
                        p.jsx("img", { src: C || "/pp.jpg", alt: "pp" }),
                        p.jsxs("div", {
                          className: "text",
                          children: [
                            p.jsx("p", { className: "username", children: b }),
                            p.jsx("p", { className: "fullname", children: E }),
                            r.trim().length == 0 &&
                              p.jsx("button", {
                                onClick: (P) => {
                                  P.stopPropagation(),
                                    P.preventDefault(),
                                    d((T) => T.filter((I) => I.username != b));
                                },
                                children: p.jsx(IE, {}),
                              }),
                          ],
                        }),
                      ],
                    }),
                  });
                }),
            ],
          }),
        ],
      })
    );
  }),
  pk = ce.div`
  position: absolute;
  width: 440px;
  height: 100vh;
  left: -440px;
  top: 0px;
  background-color: #000;
  transition: 0.3s ease-in-out all;
  padding-left: 73px;
  border-right: 1px solid #262626;
  box-shadow: 4px 0 24px rgba(0, 0, 0, 0.15);
  border-radius: 0px 1rem 1rem 0px;
  z-index: 50;
  overflow: hidden;
  &.active {
    left: 0px;
  }
  .title {
    padding: 20px;
    h1 {
      font-size: 24px;
      font-weight: 600;
      line-height: 30px;
    }
  }

  .input {
    border-bottom: 1px solid #262626;
    display: flex;
    padding: 10px 20px;
    padding-bottom: 2rem;
    form {
      position: relative;
      width: 100%;
      display: flex;
      border-radius: 8px;
      background-color: #262626;
      align-items: center;
      svg {
        margin-left: 1rem;
      }
      input {
        width: 100%;
        line-height: 18px;
        padding: 12px 1rem;
        font-size: 1rem;
        height: 40px;
        background-color: transparent;
        border: none;
        outline: none;
        padding-right: 40px;
      }
      button {
        background-repeat: no-repeat;
        background-position: -318px -333px;
        height: 20px;
        position: absolute;
        right: 12px;
        top: 50%;
        transform: translateY(-50%);
        z-index: 3;
        width: 20px;
        background-image: url("/bg.png");
      }
    }
  }
  .rp {
    display: flex;
    justify-content: space-between;
    padding: 1rem 20px;
    width: 100;
    .r {
      font-weight: 600;
    }
    button {
      color: #0095f6;
      &:hover {
        opacity: 0.7;
      }
    }
  }
  ul {
    height: calc(100% - 150px);
    position: relative;
    &.f {
      height: calc(100% - 210px);
    }
    &::-webkit-scrollbar-thumb {
      width: 8px;
      background-color: #363636;
      border-radius: 8px;
      &:active {
        background-color: #404040;
      }
    }
    &::-webkit-scrollbar {
      width: 8px;
      background-color: #161616;
    }
    width: 100%;
    overflow-y: auto;

    .loading-box {
      top: 0px;
      left: 0px;
      height: 100%;
      position: absolute;
      svg {
        height: 24px;
      }
    }
    .nf {
      color: #a8a8a8;
      font-size: 14px;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    li {
      position: relative;
      a {
        &:hover {
          background-color: #121212;
        }
        display: flex;
        height: 60px;
        width: 100%;
        padding: 8px 24px;
      }
      img {
        width: 44px;
        height: 44px;
        object-fit: cover;
        border-radius: 100%;
        margin-right: 12px;
      }
      .text {
        display: flex;
        flex-direction: column;
        justify-content: center;
        p {
          font-size: 14px;
          &.username {
            font-weight: 600;
          }
          &.fullname {
            color: #a8a8a8;
          }
        }
      }
      button {
        position: absolute;
        right: 24px;
        top: 22px;
        width: 1rem;
        height: 1rem;
      }
    }
  }
`,
  mk = ({ n: e }) => {
    const { id: t, targeturl: n } = e;
    return p.jsx(hk, { children: p.jsx(ft, { to: n }) }, t);
  },
  hk = ce.li``,
  gk = S.forwardRef(({ isActive: e }, t) => {
    S.useEffect(() => {
      e &&
        (o(!0),
        rk({})
          .then((u) => {
            r(u), l(u.length == 12);
          })
          .catch(() => l(!1))
          .finally(() => o(!1)));
    }, [e]);
    const [n, r] = S.useState([]),
      [i, o] = S.useState(!0),
      [a, l] = S.useState(!0),
      s = (u) => {
        u.preventDefault(), u.target;
      };
    return p.jsxs(vk, {
      className: e ? "active" : "",
      ref: t,
      children: [
        p.jsx("div", {
          className: "upside",
          children: p.jsx("h1", { children: "Notifications" }),
        }),
        p.jsxs("ul", {
          onScroll: s,
          children: [
            n.map((u) => p.jsx(mk, { n: u }, u.id)),
            i && p.jsx(yn, {}),
          ],
        }),
      ],
    });
  }),
  vk = ce.div`
  position: absolute;
  width: 440px;
  height: 100vh;
  left: -440px;
  top: 0px;
  background-color: #000;
  transition: 0.3s ease-in-out all;
  padding-left: 73px;
  border-right: 1px solid #262626;
  box-shadow: 4px 0 24px rgba(0, 0, 0, 0.15);
  border-radius: 0px 1rem 1rem 0px;
  z-index: 10;
  overflow: hidden;
  &.active {
    left: 0px;
  }
  .upside {
    padding: 24px;
    h1 {
      font-size: 24px;
      line-height: 28px;
    }
  }
  ul {
    height: calc(100% - 80px);
    overflow-y: auto;
    padding: 0px 24px;
    &::-webkit-scrollbar {
      width: 8px;
      background-color: #101010;
    }
    &::-webkit-scrollbar-thumb {
      width: 8px;
      background-color: #363636;
      border-radius: 8px;
      &:active {
        background-color: #464646;
      }
    }
    .loading-box {
      margin: 2rem 0px;
    }
  }
`,
  yk = ({ discard: e, cancel: t }) =>
    p.jsxs(p.Fragment, {
      children: [
        p.jsx(xk, { onClick: e }),
        p.jsxs(wk, {
          children: [
            p.jsxs("div", {
              className: "text",
              children: [
                p.jsx("h1", { children: "Discard post?" }),
                p.jsx("h2", {
                  children: "If you leave, your edits won't be saved.",
                }),
              ],
            }),
            p.jsxs("div", {
              className: "buttons",
              children: [
                p.jsx("button", {
                  onClick: e,
                  className: "discard",
                  children: "Discard",
                }),
                p.jsx("button", { onClick: t, children: "Cancel" }),
              ],
            }),
          ],
        }),
      ],
    }),
  xk = ce.div`
  width: 100vw;
  height: 100vh;
  left: 0px;
  top: 0px;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 100;
  position: fixed;
  cursor: pointer;
`,
  wk = ce.div`
  position: fixed;
  left: 50%;
  top: 50%;
  z-index: 200;
  transform: translate(-50%, -50%);
  background-color: #262626;
  width: 400px;
  border-radius: 12px;
  overflow: hidden;
  .text {
    padding: 2rem;
    h1,
    h2 {
      text-align: center;
    }
    h1 {
      margin-bottom: 4px;
      font-size: 20px;
      line-height: 24px;
      font-weight: 400;
    }
    h2 {
      font-size: 14px;
      line-height: 18px;
      font-weight: 400;
      color: #a8a8a8;
    }
  }
  .buttons {
    button {
      display: block;
      width: 100%;
      border: none;
      font-size: 14px;
      height: 44px;
      background-color: transparent;
      color: #fafafa;
      border-top: 1px solid #363636;
      &.discard {
        font-weight: 700;
        color: #ed4956;
      }
    }
  }
`,
  bk = ({ pick: e }) => {
    const [t, n] = S.useState(!1),
      r = (a) => {
        a.preventDefault(), n(!0);
      },
      i = () => n(!1),
      o = async (a) => {
        a.preventDefault(), n(!1);
        const l = Array.from(a.dataTransfer.files);
        l.length != 0 && e(l);
      };
    return p.jsxs(Sk, {
      className: t ? "d" : "",
      children: [
        p.jsx(Ck, {}),
        p.jsx("p", { children: "Drag photos here" }),
        p.jsxs("button", {
          children: [
            "Select from computer",
            p.jsx("input", {
              onChange: e,
              type: "file",
              multiple: !0,
              accept: "image/jpeg, image/png, image/jpg",
              name: "images",
              id: "images",
            }),
          ],
        }),
        p.jsx("input", {
          className: "t",
          onChange: e,
          type: "file",
          onClick: (a) => a.preventDefault(),
          multiple: !0,
          accept: "image/jpeg, image/png, image/jpg",
          name: "images",
          id: "images",
          onDragOver: r,
          onDragLeave: i,
          onDrop: o,
        }),
      ],
    });
  },
  Sk = ce.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  &.d {
    background-color: #181818;
    svg {
      color: #0095f6;
    }
  }
  p {
    margin: 1rem;
    font-size: 24px;
    line-height: 20px;
    position: relative;
    z-index: 50;
  }
  button {
    position: relative;
    padding: 7px 1rem;
    border-radius: 8px;
    font-size: 14px;
    color: #fafafa;
    font-weight: 600;
    border: none;
    outline: none;
    margin-top: 1rem;
    background-color: #0095f6;
    &:hover {
      background-color: #1877f2;
    }
    z-index: 50;
  }
  input {
    position: absolute;
    left: 0px;
    top: 0px;
    width: 100%;
    height: 100%;
    opacity: 0;
    cursor: pointer;
    user-select: none;

    &.t {
      cursor: default;
    }
  }
`,
  Ck = () =>
    p.jsxs("svg", {
      "aria-label": "Icon to represent media such as images",
      color: "rgb(245, 245, 245)",
      fill: "rgb(245, 245, 245)",
      height: "77",
      role: "img",
      viewBox: "0 0 97.6 77.3",
      width: "96",
      children: [
        p.jsx("title", { children: "Icon to represent media such as images" }),
        p.jsx("path", {
          d: "M16.3 24h.3c2.8-.2 4.9-2.6 4.8-5.4-.2-2.8-2.6-4.9-5.4-4.8s-4.9 2.6-4.8 5.4c.1 2.7 2.4 4.8 5.1 4.8zm-2.4-7.2c.5-.6 1.3-1 2.1-1h.2c1.7 0 3.1 1.4 3.1 3.1 0 1.7-1.4 3.1-3.1 3.1-1.7 0-3.1-1.4-3.1-3.1 0-.8.3-1.5.8-2.1z",
          fill: "currentColor",
        }),
        p.jsx("path", {
          d: "M84.7 18.4 58 16.9l-.2-3c-.3-5.7-5.2-10.1-11-9.8L12.9 6c-5.7.3-10.1 5.3-9.8 11L5 51v.8c.7 5.2 5.1 9.1 10.3 9.1h.6l21.7-1.2v.6c-.3 5.7 4 10.7 9.8 11l34 2h.6c5.5 0 10.1-4.3 10.4-9.8l2-34c.4-5.8-4-10.7-9.7-11.1zM7.2 10.8C8.7 9.1 10.8 8.1 13 8l34-1.9c4.6-.3 8.6 3.3 8.9 7.9l.2 2.8-5.3-.3c-5.7-.3-10.7 4-11 9.8l-.6 9.5-9.5 10.7c-.2.3-.6.4-1 .5-.4 0-.7-.1-1-.4l-7.8-7c-1.4-1.3-3.5-1.1-4.8.3L7 49 5.2 17c-.2-2.3.6-4.5 2-6.2zm8.7 48c-4.3.2-8.1-2.8-8.8-7.1l9.4-10.5c.2-.3.6-.4 1-.5.4 0 .7.1 1 .4l7.8 7c.7.6 1.6.9 2.5.9.9 0 1.7-.5 2.3-1.1l7.8-8.8-1.1 18.6-21.9 1.1zm76.5-29.5-2 34c-.3 4.6-4.3 8.2-8.9 7.9l-34-2c-4.6-.3-8.2-4.3-7.9-8.9l2-34c.3-4.4 3.9-7.9 8.4-7.9h.5l34 2c4.7.3 8.2 4.3 7.9 8.9z",
          fill: "currentColor",
        }),
        p.jsx("path", {
          d: "M78.2 41.6 61.3 30.5c-2.1-1.4-4.9-.8-6.2 1.3-.4.7-.7 1.4-.7 2.2l-1.2 20.1c-.1 2.5 1.7 4.6 4.2 4.8h.3c.7 0 1.4-.2 2-.5l18-9c2.2-1.1 3.1-3.8 2-6-.4-.7-.9-1.3-1.5-1.8zm-1.4 6-18 9c-.4.2-.8.3-1.3.3-.4 0-.9-.2-1.2-.4-.7-.5-1.2-1.3-1.1-2.2l1.2-20.1c.1-.9.6-1.7 1.4-2.1.8-.4 1.7-.3 2.5.1L77 43.3c1.2.8 1.5 2.3.7 3.4-.2.4-.5.7-.9.9z",
          fill: "currentColor",
        }),
      ],
    });
function Hy(e) {
  var t,
    n,
    r = "";
  if (typeof e == "string" || typeof e == "number") r += e;
  else if (typeof e == "object")
    if (Array.isArray(e))
      for (t = 0; t < e.length; t++)
        e[t] && (n = Hy(e[t])) && (r && (r += " "), (r += n));
    else for (t in e) e[t] && (r && (r += " "), (r += t));
  return r;
}
function nr() {
  for (var e, t, n = 0, r = ""; n < arguments.length; )
    (e = arguments[n++]) && (t = Hy(e)) && (r && (r += " "), (r += t));
  return r;
}
const Ho = (e) => typeof e == "number" && !isNaN(e),
  Jr = (e) => typeof e == "string",
  Ct = (e) => typeof e == "function",
  Gl = (e) => (Jr(e) || Ct(e) ? e : null),
  Nc = (e) => S.isValidElement(e) || Jr(e) || Ct(e) || Ho(e);
function Ek(e, t, n) {
  n === void 0 && (n = 300);
  const { scrollHeight: r, style: i } = e;
  requestAnimationFrame(() => {
    (i.minHeight = "initial"),
      (i.height = r + "px"),
      (i.transition = `all ${n}ms`),
      requestAnimationFrame(() => {
        (i.height = "0"), (i.padding = "0"), (i.margin = "0"), setTimeout(t, n);
      });
  });
}
function ku(e) {
  let {
    enter: t,
    exit: n,
    appendPosition: r = !1,
    collapse: i = !0,
    collapseDuration: o = 300,
  } = e;
  return function (a) {
    let {
      children: l,
      position: s,
      preventExitTransition: u,
      done: d,
      nodeRef: c,
      isIn: f,
    } = a;
    const h = r ? `${t}--${s}` : t,
      v = r ? `${n}--${s}` : n,
      y = S.useRef(0);
    return (
      S.useLayoutEffect(() => {
        const w = c.current,
          m = h.split(" "),
          g = (x) => {
            x.target === c.current &&
              (w.dispatchEvent(new Event("d")),
              w.removeEventListener("animationend", g),
              w.removeEventListener("animationcancel", g),
              y.current === 0 &&
                x.type !== "animationcancel" &&
                w.classList.remove(...m));
          };
        w.classList.add(...m),
          w.addEventListener("animationend", g),
          w.addEventListener("animationcancel", g);
      }, []),
      S.useEffect(() => {
        const w = c.current,
          m = () => {
            w.removeEventListener("animationend", m), i ? Ek(w, d, o) : d();
          };
        f ||
          (u
            ? m()
            : ((y.current = 1),
              (w.className += ` ${v}`),
              w.addEventListener("animationend", m)));
      }, [f]),
      H.createElement(H.Fragment, null, l)
    );
  };
}
function Ag(e, t) {
  return e != null
    ? {
        content: e.content,
        containerId: e.props.containerId,
        id: e.props.toastId,
        theme: e.props.theme,
        type: e.props.type,
        data: e.props.data || {},
        isLoading: e.props.isLoading,
        icon: e.props.icon,
        status: t,
      }
    : {};
}
const Vt = {
    list: new Map(),
    emitQueue: new Map(),
    on(e, t) {
      return (
        this.list.has(e) || this.list.set(e, []), this.list.get(e).push(t), this
      );
    },
    off(e, t) {
      if (t) {
        const n = this.list.get(e).filter((r) => r !== t);
        return this.list.set(e, n), this;
      }
      return this.list.delete(e), this;
    },
    cancelEmit(e) {
      const t = this.emitQueue.get(e);
      return t && (t.forEach(clearTimeout), this.emitQueue.delete(e)), this;
    },
    emit(e) {
      this.list.has(e) &&
        this.list.get(e).forEach((t) => {
          const n = setTimeout(() => {
            t(...[].slice.call(arguments, 1));
          }, 0);
          this.emitQueue.has(e) || this.emitQueue.set(e, []),
            this.emitQueue.get(e).push(n);
        });
    },
  },
  xl = (e) => {
    let { theme: t, type: n, ...r } = e;
    return H.createElement("svg", {
      viewBox: "0 0 24 24",
      width: "100%",
      height: "100%",
      fill:
        t === "colored" ? "currentColor" : `var(--toastify-icon-color-${n})`,
      ...r,
    });
  },
  Rc = {
    info: function (e) {
      return H.createElement(
        xl,
        { ...e },
        H.createElement("path", {
          d: "M12 0a12 12 0 1012 12A12.013 12.013 0 0012 0zm.25 5a1.5 1.5 0 11-1.5 1.5 1.5 1.5 0 011.5-1.5zm2.25 13.5h-4a1 1 0 010-2h.75a.25.25 0 00.25-.25v-4.5a.25.25 0 00-.25-.25h-.75a1 1 0 010-2h1a2 2 0 012 2v4.75a.25.25 0 00.25.25h.75a1 1 0 110 2z",
        })
      );
    },
    warning: function (e) {
      return H.createElement(
        xl,
        { ...e },
        H.createElement("path", {
          d: "M23.32 17.191L15.438 2.184C14.728.833 13.416 0 11.996 0c-1.42 0-2.733.833-3.443 2.184L.533 17.448a4.744 4.744 0 000 4.368C1.243 23.167 2.555 24 3.975 24h16.05C22.22 24 24 22.044 24 19.632c0-.904-.251-1.746-.68-2.44zm-9.622 1.46c0 1.033-.724 1.823-1.698 1.823s-1.698-.79-1.698-1.822v-.043c0-1.028.724-1.822 1.698-1.822s1.698.79 1.698 1.822v.043zm.039-12.285l-.84 8.06c-.057.581-.408.943-.897.943-.49 0-.84-.367-.896-.942l-.84-8.065c-.057-.624.25-1.095.779-1.095h1.91c.528.005.84.476.784 1.1z",
        })
      );
    },
    success: function (e) {
      return H.createElement(
        xl,
        { ...e },
        H.createElement("path", {
          d: "M12 0a12 12 0 1012 12A12.014 12.014 0 0012 0zm6.927 8.2l-6.845 9.289a1.011 1.011 0 01-1.43.188l-4.888-3.908a1 1 0 111.25-1.562l4.076 3.261 6.227-8.451a1 1 0 111.61 1.183z",
        })
      );
    },
    error: function (e) {
      return H.createElement(
        xl,
        { ...e },
        H.createElement("path", {
          d: "M11.983 0a12.206 12.206 0 00-8.51 3.653A11.8 11.8 0 000 12.207 11.779 11.779 0 0011.8 24h.214A12.111 12.111 0 0024 11.791 11.766 11.766 0 0011.983 0zM10.5 16.542a1.476 1.476 0 011.449-1.53h.027a1.527 1.527 0 011.523 1.47 1.475 1.475 0 01-1.449 1.53h-.027a1.529 1.529 0 01-1.523-1.47zM11 12.5v-6a1 1 0 012 0v6a1 1 0 11-2 0z",
        })
      );
    },
    spinner: function () {
      return H.createElement("div", { className: "Toastify__spinner" });
    },
  };
function Tk(e) {
  const [, t] = S.useReducer((h) => h + 1, 0),
    [n, r] = S.useState([]),
    i = S.useRef(null),
    o = S.useRef(new Map()).current,
    a = (h) => n.indexOf(h) !== -1,
    l = S.useRef({
      toastKey: 1,
      displayedToast: 0,
      count: 0,
      queue: [],
      props: e,
      containerId: null,
      isToastActive: a,
      getToast: (h) => o.get(h),
    }).current;
  function s(h) {
    let { containerId: v } = h;
    const { limit: y } = l.props;
    !y ||
      (v && l.containerId !== v) ||
      ((l.count -= l.queue.length), (l.queue = []));
  }
  function u(h) {
    r((v) => (h == null ? [] : v.filter((y) => y !== h)));
  }
  function d() {
    const { toastContent: h, toastProps: v, staleId: y } = l.queue.shift();
    f(h, v, y);
  }
  function c(h, v) {
    let { delay: y, staleId: w, ...m } = v;
    if (
      !Nc(h) ||
      (function (N) {
        return (
          !i.current ||
          (l.props.enableMultiContainer &&
            N.containerId !== l.props.containerId) ||
          (o.has(N.toastId) && N.updateId == null)
        );
      })(m)
    )
      return;
    const { toastId: g, updateId: x, data: b } = m,
      { props: C } = l,
      E = () => u(g),
      P = x == null;
    P && l.count++;
    const T = {
      ...C,
      style: C.toastStyle,
      key: l.toastKey++,
      ...Object.fromEntries(
        Object.entries(m).filter((N) => {
          let [A, R] = N;
          return R != null;
        })
      ),
      toastId: g,
      updateId: x,
      data: b,
      closeToast: E,
      isIn: !1,
      className: Gl(m.className || C.toastClassName),
      bodyClassName: Gl(m.bodyClassName || C.bodyClassName),
      progressClassName: Gl(m.progressClassName || C.progressClassName),
      autoClose:
        !m.isLoading &&
        ((I = m.autoClose),
        (O = C.autoClose),
        I === !1 || (Ho(I) && I > 0) ? I : O),
      deleteToast() {
        const N = Ag(o.get(g), "removed");
        o.delete(g), Vt.emit(4, N);
        const A = l.queue.length;
        if (
          ((l.count = g == null ? l.count - l.displayedToast : l.count - 1),
          l.count < 0 && (l.count = 0),
          A > 0)
        ) {
          const R = g == null ? l.props.limit : 1;
          if (A === 1 || R === 1) l.displayedToast++, d();
          else {
            const V = R > A ? A : R;
            l.displayedToast = V;
            for (let J = 0; J < V; J++) d();
          }
        } else t();
      },
    };
    var I, O;
    (T.iconOut = (function (N) {
      let { theme: A, type: R, isLoading: V, icon: J } = N,
        re = null;
      const L = { theme: A, type: R };
      return (
        J === !1 ||
          (Ct(J)
            ? (re = J(L))
            : S.isValidElement(J)
            ? (re = S.cloneElement(J, L))
            : Jr(J) || Ho(J)
            ? (re = J)
            : V
            ? (re = Rc.spinner())
            : ((M) => M in Rc)(R) && (re = Rc[R](L))),
        re
      );
    })(T)),
      Ct(m.onOpen) && (T.onOpen = m.onOpen),
      Ct(m.onClose) && (T.onClose = m.onClose),
      (T.closeButton = C.closeButton),
      m.closeButton === !1 || Nc(m.closeButton)
        ? (T.closeButton = m.closeButton)
        : m.closeButton === !0 &&
          (T.closeButton = !Nc(C.closeButton) || C.closeButton);
    let D = h;
    S.isValidElement(h) && !Jr(h.type)
      ? (D = S.cloneElement(h, { closeToast: E, toastProps: T, data: b }))
      : Ct(h) && (D = h({ closeToast: E, toastProps: T, data: b })),
      C.limit && C.limit > 0 && l.count > C.limit && P
        ? l.queue.push({ toastContent: D, toastProps: T, staleId: w })
        : Ho(y)
        ? setTimeout(() => {
            f(D, T, w);
          }, y)
        : f(D, T, w);
  }
  function f(h, v, y) {
    const { toastId: w } = v;
    y && o.delete(y);
    const m = { content: h, props: v };
    o.set(w, m),
      r((g) => [...g, w].filter((x) => x !== y)),
      Vt.emit(4, Ag(m, m.props.updateId == null ? "added" : "updated"));
  }
  return (
    S.useEffect(
      () => (
        (l.containerId = e.containerId),
        Vt.cancelEmit(3)
          .on(0, c)
          .on(1, (h) => i.current && u(h))
          .on(5, s)
          .emit(2, l),
        () => {
          o.clear(), Vt.emit(3, l);
        }
      ),
      []
    ),
    S.useEffect(() => {
      (l.props = e), (l.isToastActive = a), (l.displayedToast = n.length);
    }),
    {
      getToastToRender: function (h) {
        const v = new Map(),
          y = Array.from(o.values());
        return (
          e.newestOnTop && y.reverse(),
          y.forEach((w) => {
            const { position: m } = w.props;
            v.has(m) || v.set(m, []), v.get(m).push(w);
          }),
          Array.from(v, (w) => h(w[0], w[1]))
        );
      },
      containerRef: i,
      isToastActive: a,
    }
  );
}
function Dg(e) {
  return e.targetTouches && e.targetTouches.length >= 1
    ? e.targetTouches[0].clientX
    : e.clientX;
}
function Og(e) {
  return e.targetTouches && e.targetTouches.length >= 1
    ? e.targetTouches[0].clientY
    : e.clientY;
}
function kk(e) {
  const [t, n] = S.useState(!1),
    [r, i] = S.useState(!1),
    o = S.useRef(null),
    a = S.useRef({
      start: 0,
      x: 0,
      y: 0,
      delta: 0,
      removalDistance: 0,
      canCloseOnClick: !0,
      canDrag: !1,
      boundingRect: null,
      didMove: !1,
    }).current,
    l = S.useRef(e),
    {
      autoClose: s,
      pauseOnHover: u,
      closeToast: d,
      onClick: c,
      closeOnClick: f,
    } = e;
  function h(b) {
    if (e.draggable) {
      b.nativeEvent.type === "touchstart" && b.nativeEvent.preventDefault(),
        (a.didMove = !1),
        document.addEventListener("mousemove", m),
        document.addEventListener("mouseup", g),
        document.addEventListener("touchmove", m),
        document.addEventListener("touchend", g);
      const C = o.current;
      (a.canCloseOnClick = !0),
        (a.canDrag = !0),
        (a.boundingRect = C.getBoundingClientRect()),
        (C.style.transition = ""),
        (a.x = Dg(b.nativeEvent)),
        (a.y = Og(b.nativeEvent)),
        e.draggableDirection === "x"
          ? ((a.start = a.x),
            (a.removalDistance = C.offsetWidth * (e.draggablePercent / 100)))
          : ((a.start = a.y),
            (a.removalDistance =
              C.offsetHeight *
              (e.draggablePercent === 80
                ? 1.5 * e.draggablePercent
                : e.draggablePercent / 100)));
    }
  }
  function v(b) {
    if (a.boundingRect) {
      const { top: C, bottom: E, left: P, right: T } = a.boundingRect;
      b.nativeEvent.type !== "touchend" &&
      e.pauseOnHover &&
      a.x >= P &&
      a.x <= T &&
      a.y >= C &&
      a.y <= E
        ? w()
        : y();
    }
  }
  function y() {
    n(!0);
  }
  function w() {
    n(!1);
  }
  function m(b) {
    const C = o.current;
    a.canDrag &&
      C &&
      ((a.didMove = !0),
      t && w(),
      (a.x = Dg(b)),
      (a.y = Og(b)),
      (a.delta = e.draggableDirection === "x" ? a.x - a.start : a.y - a.start),
      a.start !== a.x && (a.canCloseOnClick = !1),
      (C.style.transform = `translate${e.draggableDirection}(${a.delta}px)`),
      (C.style.opacity = "" + (1 - Math.abs(a.delta / a.removalDistance))));
  }
  function g() {
    document.removeEventListener("mousemove", m),
      document.removeEventListener("mouseup", g),
      document.removeEventListener("touchmove", m),
      document.removeEventListener("touchend", g);
    const b = o.current;
    if (a.canDrag && a.didMove && b) {
      if (((a.canDrag = !1), Math.abs(a.delta) > a.removalDistance))
        return i(!0), void e.closeToast();
      (b.style.transition = "transform 0.2s, opacity 0.2s"),
        (b.style.transform = `translate${e.draggableDirection}(0)`),
        (b.style.opacity = "1");
    }
  }
  S.useEffect(() => {
    l.current = e;
  }),
    S.useEffect(
      () => (
        o.current && o.current.addEventListener("d", y, { once: !0 }),
        Ct(e.onOpen) &&
          e.onOpen(S.isValidElement(e.children) && e.children.props),
        () => {
          const b = l.current;
          Ct(b.onClose) &&
            b.onClose(S.isValidElement(b.children) && b.children.props);
        }
      ),
      []
    ),
    S.useEffect(
      () => (
        e.pauseOnFocusLoss &&
          (document.hasFocus() || w(),
          window.addEventListener("focus", y),
          window.addEventListener("blur", w)),
        () => {
          e.pauseOnFocusLoss &&
            (window.removeEventListener("focus", y),
            window.removeEventListener("blur", w));
        }
      ),
      [e.pauseOnFocusLoss]
    );
  const x = { onMouseDown: h, onTouchStart: h, onMouseUp: v, onTouchEnd: v };
  return (
    s && u && ((x.onMouseEnter = w), (x.onMouseLeave = y)),
    f &&
      (x.onClick = (b) => {
        c && c(b), a.canCloseOnClick && d();
      }),
    {
      playToast: y,
      pauseToast: w,
      isRunning: t,
      preventExitTransition: r,
      toastRef: o,
      eventHandlers: x,
    }
  );
}
function Gy(e) {
  let { closeToast: t, theme: n, ariaLabel: r = "close" } = e;
  return H.createElement(
    "button",
    {
      className: `Toastify__close-button Toastify__close-button--${n}`,
      type: "button",
      onClick: (i) => {
        i.stopPropagation(), t(i);
      },
      "aria-label": r,
    },
    H.createElement(
      "svg",
      { "aria-hidden": "true", viewBox: "0 0 14 16" },
      H.createElement("path", {
        fillRule: "evenodd",
        d: "M7.71 8.23l3.75 3.75-1.48 1.48-3.75-3.75-3.75 3.75L1 11.98l3.75-3.75L1 4.48 2.48 3l3.75 3.75L9.98 3l1.48 1.48-3.75 3.75z",
      })
    )
  );
}
function Pk(e) {
  let {
    delay: t,
    isRunning: n,
    closeToast: r,
    type: i = "default",
    hide: o,
    className: a,
    style: l,
    controlledProgress: s,
    progress: u,
    rtl: d,
    isIn: c,
    theme: f,
  } = e;
  const h = o || (s && u === 0),
    v = {
      ...l,
      animationDuration: `${t}ms`,
      animationPlayState: n ? "running" : "paused",
      opacity: h ? 0 : 1,
    };
  s && (v.transform = `scaleX(${u})`);
  const y = nr(
      "Toastify__progress-bar",
      s
        ? "Toastify__progress-bar--controlled"
        : "Toastify__progress-bar--animated",
      `Toastify__progress-bar-theme--${f}`,
      `Toastify__progress-bar--${i}`,
      { "Toastify__progress-bar--rtl": d }
    ),
    w = Ct(a) ? a({ rtl: d, type: i, defaultClassName: y }) : nr(y, a);
  return H.createElement("div", {
    role: "progressbar",
    "aria-hidden": h ? "true" : "false",
    "aria-label": "notification timer",
    className: w,
    style: v,
    [s && u >= 1 ? "onTransitionEnd" : "onAnimationEnd"]:
      s && u < 1
        ? null
        : () => {
            c && r();
          },
  });
}
const Ik = (e) => {
    const {
        isRunning: t,
        preventExitTransition: n,
        toastRef: r,
        eventHandlers: i,
      } = kk(e),
      {
        closeButton: o,
        children: a,
        autoClose: l,
        onClick: s,
        type: u,
        hideProgressBar: d,
        closeToast: c,
        transition: f,
        position: h,
        className: v,
        style: y,
        bodyClassName: w,
        bodyStyle: m,
        progressClassName: g,
        progressStyle: x,
        updateId: b,
        role: C,
        progress: E,
        rtl: P,
        toastId: T,
        deleteToast: I,
        isIn: O,
        isLoading: D,
        iconOut: N,
        closeOnClick: A,
        theme: R,
      } = e,
      V = nr(
        "Toastify__toast",
        `Toastify__toast-theme--${R}`,
        `Toastify__toast--${u}`,
        { "Toastify__toast--rtl": P },
        { "Toastify__toast--close-on-click": A }
      ),
      J = Ct(v)
        ? v({ rtl: P, position: h, type: u, defaultClassName: V })
        : nr(V, v),
      re = !!E || !l,
      L = { closeToast: c, type: u, theme: R };
    let M = null;
    return (
      o === !1 ||
        (M = Ct(o) ? o(L) : S.isValidElement(o) ? S.cloneElement(o, L) : Gy(L)),
      H.createElement(
        f,
        { isIn: O, done: I, position: h, preventExitTransition: n, nodeRef: r },
        H.createElement(
          "div",
          { id: T, onClick: s, className: J, ...i, style: y, ref: r },
          H.createElement(
            "div",
            {
              ...(O && { role: C }),
              className: Ct(w) ? w({ type: u }) : nr("Toastify__toast-body", w),
              style: m,
            },
            N != null &&
              H.createElement(
                "div",
                {
                  className: nr("Toastify__toast-icon", {
                    "Toastify--animate-icon Toastify__zoom-enter": !D,
                  }),
                },
                N
              ),
            H.createElement("div", null, a)
          ),
          M,
          H.createElement(Pk, {
            ...(b && !re ? { key: `pb-${b}` } : {}),
            rtl: P,
            theme: R,
            delay: l,
            isRunning: t,
            isIn: O,
            closeToast: c,
            hide: d,
            type: u,
            style: x,
            className: g,
            controlledProgress: re,
            progress: E || 0,
          })
        )
      )
    );
  },
  Pu = function (e, t) {
    return (
      t === void 0 && (t = !1),
      {
        enter: `Toastify--animate Toastify__${e}-enter`,
        exit: `Toastify--animate Toastify__${e}-exit`,
        appendPosition: t,
      }
    );
  },
  Ak = ku(Pu("bounce", !0));
ku(Pu("slide", !0));
ku(Pu("zoom"));
ku(Pu("flip"));
const ya = S.forwardRef((e, t) => {
  const { getToastToRender: n, containerRef: r, isToastActive: i } = Tk(e),
    { className: o, style: a, rtl: l, containerId: s } = e;
  function u(d) {
    const c = nr(
      "Toastify__toast-container",
      `Toastify__toast-container--${d}`,
      { "Toastify__toast-container--rtl": l }
    );
    return Ct(o)
      ? o({ position: d, rtl: l, defaultClassName: c })
      : nr(c, Gl(o));
  }
  return (
    S.useEffect(() => {
      t && (t.current = r.current);
    }, []),
    H.createElement(
      "div",
      { ref: r, className: "Toastify", id: s },
      n((d, c) => {
        const f = c.length ? { ...a } : { ...a, pointerEvents: "none" };
        return H.createElement(
          "div",
          { className: u(d), style: f, key: `container-${d}` },
          c.map((h, v) => {
            let { content: y, props: w } = h;
            return H.createElement(
              Ik,
              {
                ...w,
                isIn: i(w.toastId),
                style: { ...w.style, "--nth": v + 1, "--len": c.length },
                key: `toast-${w.key}`,
              },
              y
            );
          })
        );
      })
    )
  );
});
(ya.displayName = "ToastContainer"),
  (ya.defaultProps = {
    position: "top-right",
    transition: Ak,
    autoClose: 5e3,
    closeButton: Gy,
    pauseOnHover: !0,
    pauseOnFocusLoss: !0,
    closeOnClick: !0,
    draggable: !0,
    draggablePercent: 80,
    draggableDirection: "x",
    role: "alert",
    theme: "light",
  });
let Lc,
  $r = new Map(),
  jo = [],
  Dk = 1;
function Wy() {
  return "" + Dk++;
}
function Ok(e) {
  return e && (Jr(e.toastId) || Ho(e.toastId)) ? e.toastId : Wy();
}
function Go(e, t) {
  return (
    $r.size > 0 ? Vt.emit(0, e, t) : jo.push({ content: e, options: t }),
    t.toastId
  );
}
function As(e, t) {
  return { ...t, type: (t && t.type) || e, toastId: Ok(t) };
}
function wl(e) {
  return (t, n) => Go(t, As(e, n));
}
function pe(e, t) {
  return Go(e, As("default", t));
}
(pe.loading = (e, t) =>
  Go(
    e,
    As("default", {
      isLoading: !0,
      autoClose: !1,
      closeOnClick: !1,
      closeButton: !1,
      draggable: !1,
      ...t,
    })
  )),
  (pe.promise = function (e, t, n) {
    let r,
      { pending: i, error: o, success: a } = t;
    i && (r = Jr(i) ? pe.loading(i, n) : pe.loading(i.render, { ...n, ...i }));
    const l = {
        isLoading: null,
        autoClose: null,
        closeOnClick: null,
        closeButton: null,
        draggable: null,
      },
      s = (d, c, f) => {
        if (c == null) return void pe.dismiss(r);
        const h = { type: d, ...l, ...n, data: f },
          v = Jr(c) ? { render: c } : c;
        return (
          r ? pe.update(r, { ...h, ...v }) : pe(v.render, { ...h, ...v }), f
        );
      },
      u = Ct(e) ? e() : e;
    return u.then((d) => s("success", a, d)).catch((d) => s("error", o, d)), u;
  }),
  (pe.success = wl("success")),
  (pe.info = wl("info")),
  (pe.error = wl("error")),
  (pe.warning = wl("warning")),
  (pe.warn = pe.warning),
  (pe.dark = (e, t) => Go(e, As("default", { theme: "dark", ...t }))),
  (pe.dismiss = (e) => {
    $r.size > 0
      ? Vt.emit(1, e)
      : (jo = jo.filter((t) => e != null && t.options.toastId !== e));
  }),
  (pe.clearWaitingQueue = function (e) {
    return e === void 0 && (e = {}), Vt.emit(5, e);
  }),
  (pe.isActive = (e) => {
    let t = !1;
    return (
      $r.forEach((n) => {
        n.isToastActive && n.isToastActive(e) && (t = !0);
      }),
      t
    );
  }),
  (pe.update = function (e, t) {
    t === void 0 && (t = {}),
      setTimeout(() => {
        const n = (function (r, i) {
          let { containerId: o } = i;
          const a = $r.get(o || Lc);
          return a && a.getToast(r);
        })(e, t);
        if (n) {
          const { props: r, content: i } = n,
            o = {
              delay: 100,
              ...r,
              ...t,
              toastId: t.toastId || e,
              updateId: Wy(),
            };
          o.toastId !== e && (o.staleId = e);
          const a = o.render || i;
          delete o.render, Go(a, o);
        }
      }, 0);
  }),
  (pe.done = (e) => {
    pe.update(e, { progress: 1 });
  }),
  (pe.onChange = (e) => (
    Vt.on(4, e),
    () => {
      Vt.off(4, e);
    }
  )),
  (pe.POSITION = {
    TOP_LEFT: "top-left",
    TOP_RIGHT: "top-right",
    TOP_CENTER: "top-center",
    BOTTOM_LEFT: "bottom-left",
    BOTTOM_RIGHT: "bottom-right",
    BOTTOM_CENTER: "bottom-center",
  }),
  (pe.TYPE = {
    INFO: "info",
    SUCCESS: "success",
    WARNING: "warning",
    ERROR: "error",
    DEFAULT: "default",
  }),
  Vt.on(2, (e) => {
    (Lc = e.containerId || e),
      $r.set(Lc, e),
      jo.forEach((t) => {
        Vt.emit(0, t.content, t.options);
      }),
      (jo = []);
  }).on(3, (e) => {
    $r.delete(e.containerId || e), $r.size === 0 && Vt.off(0).off(1).off(5);
  });
const jk = ({ textAreaIsActive: e, text: t, setText: n }) => {
    const { username: r, pp: i } = ge(Dn, ve),
      o = (a) => n(a.target.value);
    return p.jsxs(Nk, {
      className: e ? "active" : "",
      children: [
        p.jsxs("div", {
          className: "info",
          children: [
            p.jsx("img", { onContextMenu: qa, src: i || "/pp.jpg", alt: "pp" }),
            p.jsx("p", { children: r }),
          ],
        }),
        p.jsx("textarea", {
          value: t,
          onChange: o,
          maxLength: 1e3,
          placeholder: "Write a caption...",
        }),
      ],
    });
  },
  Nk = ce.div`
  overflow: hidden;
  transition: 0.2s ease all;
  width: 0px;
  max-width: 400px;
  padding: 0px;
  min-width: 0px;
  &.active {
    min-width: 300px;
    padding: 1rem;
    width: 100%;
  }
  .info {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
    img {
      margin-right: 12px;
      width: 2rem;
      height: 2rem;
      border-radius: 100%;
      cursor: pointer;
    }
    p {
      font-size: 14px;
      font-weight: 600;
    }
  }
  textarea {
    border: none;
    outline: none;
    background-color: transparent;
    resize: none;
    width: 100%;
    color: #fafafa;
    font-size: 1rem;
    padding-right: 4px;
    overflow-y: auto;
    height: calc(100% - 50px);
    &:hover {
      &::-webkit-scrollbar-thumb {
        background-color: #363636;
      }
      &::-webkit-scrollbar {
        background-color: #202020;
      }
    }

    &::-webkit-scrollbar {
      width: 8px;
    }
    &::-webkit-scrollbar-thumb {
      width: 8px;
      border-radius: 8px;
      background-color: transparent;
      &:active {
        background-color: #484848;
      }
    }
  }
`;
function jg(e) {
  return (
    e !== null &&
    typeof e == "object" &&
    "constructor" in e &&
    e.constructor === Object
  );
}
function Qp(e = {}, t = {}) {
  Object.keys(t).forEach((n) => {
    typeof e[n] > "u"
      ? (e[n] = t[n])
      : jg(t[n]) && jg(e[n]) && Object.keys(t[n]).length > 0 && Qp(e[n], t[n]);
  });
}
const Vy = {
  body: {},
  addEventListener() {},
  removeEventListener() {},
  activeElement: { blur() {}, nodeName: "" },
  querySelector() {
    return null;
  },
  querySelectorAll() {
    return [];
  },
  getElementById() {
    return null;
  },
  createEvent() {
    return { initEvent() {} };
  },
  createElement() {
    return {
      children: [],
      childNodes: [],
      style: {},
      setAttribute() {},
      getElementsByTagName() {
        return [];
      },
    };
  },
  createElementNS() {
    return {};
  },
  importNode() {
    return null;
  },
  location: {
    hash: "",
    host: "",
    hostname: "",
    href: "",
    origin: "",
    pathname: "",
    protocol: "",
    search: "",
  },
};
function ui() {
  const e = typeof document < "u" ? document : {};
  return Qp(e, Vy), e;
}
const Rk = {
  document: Vy,
  navigator: { userAgent: "" },
  location: {
    hash: "",
    host: "",
    hostname: "",
    href: "",
    origin: "",
    pathname: "",
    protocol: "",
    search: "",
  },
  history: { replaceState() {}, pushState() {}, go() {}, back() {} },
  CustomEvent: function () {
    return this;
  },
  addEventListener() {},
  removeEventListener() {},
  getComputedStyle() {
    return {
      getPropertyValue() {
        return "";
      },
    };
  },
  Image() {},
  Date() {},
  screen: {},
  setTimeout() {},
  clearTimeout() {},
  matchMedia() {
    return {};
  },
  requestAnimationFrame(e) {
    return typeof setTimeout > "u" ? (e(), null) : setTimeout(e, 0);
  },
  cancelAnimationFrame(e) {
    typeof setTimeout > "u" || clearTimeout(e);
  },
};
function Ut() {
  const e = typeof window < "u" ? window : {};
  return Qp(e, Rk), e;
}
function Lk(e) {
  const t = e;
  Object.keys(t).forEach((n) => {
    try {
      t[n] = null;
    } catch {}
    try {
      delete t[n];
    } catch {}
  });
}
function mf(e, t = 0) {
  return setTimeout(e, t);
}
function Ds() {
  return Date.now();
}
function Mk(e) {
  const t = Ut();
  let n;
  return (
    t.getComputedStyle && (n = t.getComputedStyle(e, null)),
    !n && e.currentStyle && (n = e.currentStyle),
    n || (n = e.style),
    n
  );
}
function _k(e, t = "x") {
  const n = Ut();
  let r, i, o;
  const a = Mk(e);
  return (
    n.WebKitCSSMatrix
      ? ((i = a.transform || a.webkitTransform),
        i.split(",").length > 6 &&
          (i = i
            .split(", ")
            .map((l) => l.replace(",", "."))
            .join(", ")),
        (o = new n.WebKitCSSMatrix(i === "none" ? "" : i)))
      : ((o =
          a.MozTransform ||
          a.OTransform ||
          a.MsTransform ||
          a.msTransform ||
          a.transform ||
          a
            .getPropertyValue("transform")
            .replace("translate(", "matrix(1, 0, 0, 1,")),
        (r = o.toString().split(","))),
    t === "x" &&
      (n.WebKitCSSMatrix
        ? (i = o.m41)
        : r.length === 16
        ? (i = parseFloat(r[12]))
        : (i = parseFloat(r[4]))),
    t === "y" &&
      (n.WebKitCSSMatrix
        ? (i = o.m42)
        : r.length === 16
        ? (i = parseFloat(r[13]))
        : (i = parseFloat(r[5]))),
    i || 0
  );
}
function bl(e) {
  return (
    typeof e == "object" &&
    e !== null &&
    e.constructor &&
    Object.prototype.toString.call(e).slice(8, -1) === "Object"
  );
}
function $k(e) {
  return typeof window < "u" && typeof window.HTMLElement < "u"
    ? e instanceof HTMLElement
    : e && (e.nodeType === 1 || e.nodeType === 11);
}
function Dt(...e) {
  const t = Object(e[0]),
    n = ["__proto__", "constructor", "prototype"];
  for (let r = 1; r < e.length; r += 1) {
    const i = e[r];
    if (i != null && !$k(i)) {
      const o = Object.keys(Object(i)).filter((a) => n.indexOf(a) < 0);
      for (let a = 0, l = o.length; a < l; a += 1) {
        const s = o[a],
          u = Object.getOwnPropertyDescriptor(i, s);
        u !== void 0 &&
          u.enumerable &&
          (bl(t[s]) && bl(i[s])
            ? i[s].__swiper__
              ? (t[s] = i[s])
              : Dt(t[s], i[s])
            : !bl(t[s]) && bl(i[s])
            ? ((t[s] = {}), i[s].__swiper__ ? (t[s] = i[s]) : Dt(t[s], i[s]))
            : (t[s] = i[s]));
      }
    }
  }
  return t;
}
function Sl(e, t, n) {
  e.style.setProperty(t, n);
}
function qy({ swiper: e, targetPosition: t, side: n }) {
  const r = Ut(),
    i = -e.translate;
  let o = null,
    a;
  const l = e.params.speed;
  (e.wrapperEl.style.scrollSnapType = "none"),
    r.cancelAnimationFrame(e.cssModeFrameID);
  const s = t > i ? "next" : "prev",
    u = (c, f) => (s === "next" && c >= f) || (s === "prev" && c <= f),
    d = () => {
      (a = new Date().getTime()), o === null && (o = a);
      const c = Math.max(Math.min((a - o) / l, 1), 0),
        f = 0.5 - Math.cos(c * Math.PI) / 2;
      let h = i + f * (t - i);
      if ((u(h, t) && (h = t), e.wrapperEl.scrollTo({ [n]: h }), u(h, t))) {
        (e.wrapperEl.style.overflow = "hidden"),
          (e.wrapperEl.style.scrollSnapType = ""),
          setTimeout(() => {
            (e.wrapperEl.style.overflow = ""), e.wrapperEl.scrollTo({ [n]: h });
          }),
          r.cancelAnimationFrame(e.cssModeFrameID);
        return;
      }
      e.cssModeFrameID = r.requestAnimationFrame(d);
    };
  d();
}
function kn(e, t = "") {
  return [...e.children].filter((n) => n.matches(t));
}
function Yy(e, t = []) {
  const n = document.createElement(e);
  return n.classList.add(...(Array.isArray(t) ? t : [t])), n;
}
function Bk(e, t) {
  const n = [];
  for (; e.previousElementSibling; ) {
    const r = e.previousElementSibling;
    t ? r.matches(t) && n.push(r) : n.push(r), (e = r);
  }
  return n;
}
function zk(e, t) {
  const n = [];
  for (; e.nextElementSibling; ) {
    const r = e.nextElementSibling;
    t ? r.matches(t) && n.push(r) : n.push(r), (e = r);
  }
  return n;
}
function rr(e, t) {
  return Ut().getComputedStyle(e, null).getPropertyValue(t);
}
function Os(e) {
  let t = e,
    n;
  if (t) {
    for (n = 0; (t = t.previousSibling) !== null; )
      t.nodeType === 1 && (n += 1);
    return n;
  }
}
function Xy(e, t) {
  const n = [];
  let r = e.parentElement;
  for (; r; ) t ? r.matches(t) && n.push(r) : n.push(r), (r = r.parentElement);
  return n;
}
function hf(e, t, n) {
  const r = Ut();
  return n
    ? e[t === "width" ? "offsetWidth" : "offsetHeight"] +
        parseFloat(
          r
            .getComputedStyle(e, null)
            .getPropertyValue(t === "width" ? "margin-right" : "margin-top")
        ) +
        parseFloat(
          r
            .getComputedStyle(e, null)
            .getPropertyValue(t === "width" ? "margin-left" : "margin-bottom")
        )
    : e.offsetWidth;
}
let Mc;
function Fk() {
  const e = Ut(),
    t = ui();
  return {
    smoothScroll:
      t.documentElement &&
      t.documentElement.style &&
      "scrollBehavior" in t.documentElement.style,
    touch: !!(
      "ontouchstart" in e ||
      (e.DocumentTouch && t instanceof e.DocumentTouch)
    ),
  };
}
function Ky() {
  return Mc || (Mc = Fk()), Mc;
}
let _c;
function Uk({ userAgent: e } = {}) {
  const t = Ky(),
    n = Ut(),
    r = n.navigator.platform,
    i = e || n.navigator.userAgent,
    o = { ios: !1, android: !1 },
    a = n.screen.width,
    l = n.screen.height,
    s = i.match(/(Android);?[\s\/]+([\d.]+)?/);
  let u = i.match(/(iPad).*OS\s([\d_]+)/);
  const d = i.match(/(iPod)(.*OS\s([\d_]+))?/),
    c = !u && i.match(/(iPhone\sOS|iOS)\s([\d_]+)/),
    f = r === "Win32";
  let h = r === "MacIntel";
  const v = [
    "1024x1366",
    "1366x1024",
    "834x1194",
    "1194x834",
    "834x1112",
    "1112x834",
    "768x1024",
    "1024x768",
    "820x1180",
    "1180x820",
    "810x1080",
    "1080x810",
  ];
  return (
    !u &&
      h &&
      t.touch &&
      v.indexOf(`${a}x${l}`) >= 0 &&
      ((u = i.match(/(Version)\/([\d.]+)/)),
      u || (u = [0, 1, "13_0_0"]),
      (h = !1)),
    s && !f && ((o.os = "android"), (o.android = !0)),
    (u || c || d) && ((o.os = "ios"), (o.ios = !0)),
    o
  );
}
function Hk(e = {}) {
  return _c || (_c = Uk(e)), _c;
}
let $c;
function Gk() {
  const e = Ut();
  let t = !1;
  function n() {
    const r = e.navigator.userAgent.toLowerCase();
    return (
      r.indexOf("safari") >= 0 &&
      r.indexOf("chrome") < 0 &&
      r.indexOf("android") < 0
    );
  }
  if (n()) {
    const r = String(e.navigator.userAgent);
    if (r.includes("Version/")) {
      const [i, o] = r
        .split("Version/")[1]
        .split(" ")[0]
        .split(".")
        .map((a) => Number(a));
      t = i < 16 || (i === 16 && o < 2);
    }
  }
  return {
    isSafari: t || n(),
    needPerspectiveFix: t,
    isWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(
      e.navigator.userAgent
    ),
  };
}
function Wk() {
  return $c || ($c = Gk()), $c;
}
function Vk({ swiper: e, on: t, emit: n }) {
  const r = Ut();
  let i = null,
    o = null;
  const a = () => {
      !e || e.destroyed || !e.initialized || (n("beforeResize"), n("resize"));
    },
    l = () => {
      !e ||
        e.destroyed ||
        !e.initialized ||
        ((i = new ResizeObserver((d) => {
          o = r.requestAnimationFrame(() => {
            const { width: c, height: f } = e;
            let h = c,
              v = f;
            d.forEach(({ contentBoxSize: y, contentRect: w, target: m }) => {
              (m && m !== e.el) ||
                ((h = w ? w.width : (y[0] || y).inlineSize),
                (v = w ? w.height : (y[0] || y).blockSize));
            }),
              (h !== c || v !== f) && a();
          });
        })),
        i.observe(e.el));
    },
    s = () => {
      o && r.cancelAnimationFrame(o),
        i && i.unobserve && e.el && (i.unobserve(e.el), (i = null));
    },
    u = () => {
      !e || e.destroyed || !e.initialized || n("orientationchange");
    };
  t("init", () => {
    if (e.params.resizeObserver && typeof r.ResizeObserver < "u") {
      l();
      return;
    }
    r.addEventListener("resize", a), r.addEventListener("orientationchange", u);
  }),
    t("destroy", () => {
      s(),
        r.removeEventListener("resize", a),
        r.removeEventListener("orientationchange", u);
    });
}
function qk({ swiper: e, extendParams: t, on: n, emit: r }) {
  const i = [],
    o = Ut(),
    a = (u, d = {}) => {
      const c = o.MutationObserver || o.WebkitMutationObserver,
        f = new c((h) => {
          if (e.__preventObserver__) return;
          if (h.length === 1) {
            r("observerUpdate", h[0]);
            return;
          }
          const v = function () {
            r("observerUpdate", h[0]);
          };
          o.requestAnimationFrame
            ? o.requestAnimationFrame(v)
            : o.setTimeout(v, 0);
        });
      f.observe(u, {
        attributes: typeof d.attributes > "u" ? !0 : d.attributes,
        childList: typeof d.childList > "u" ? !0 : d.childList,
        characterData: typeof d.characterData > "u" ? !0 : d.characterData,
      }),
        i.push(f);
    },
    l = () => {
      if (e.params.observer) {
        if (e.params.observeParents) {
          const u = Xy(e.el);
          for (let d = 0; d < u.length; d += 1) a(u[d]);
        }
        a(e.el, { childList: e.params.observeSlideChildren }),
          a(e.wrapperEl, { attributes: !1 });
      }
    },
    s = () => {
      i.forEach((u) => {
        u.disconnect();
      }),
        i.splice(0, i.length);
    };
  t({ observer: !1, observeParents: !1, observeSlideChildren: !1 }),
    n("init", l),
    n("destroy", s);
}
const Yk = {
  on(e, t, n) {
    const r = this;
    if (!r.eventsListeners || r.destroyed || typeof t != "function") return r;
    const i = n ? "unshift" : "push";
    return (
      e.split(" ").forEach((o) => {
        r.eventsListeners[o] || (r.eventsListeners[o] = []),
          r.eventsListeners[o][i](t);
      }),
      r
    );
  },
  once(e, t, n) {
    const r = this;
    if (!r.eventsListeners || r.destroyed || typeof t != "function") return r;
    function i(...o) {
      r.off(e, i), i.__emitterProxy && delete i.__emitterProxy, t.apply(r, o);
    }
    return (i.__emitterProxy = t), r.on(e, i, n);
  },
  onAny(e, t) {
    const n = this;
    if (!n.eventsListeners || n.destroyed || typeof e != "function") return n;
    const r = t ? "unshift" : "push";
    return n.eventsAnyListeners.indexOf(e) < 0 && n.eventsAnyListeners[r](e), n;
  },
  offAny(e) {
    const t = this;
    if (!t.eventsListeners || t.destroyed || !t.eventsAnyListeners) return t;
    const n = t.eventsAnyListeners.indexOf(e);
    return n >= 0 && t.eventsAnyListeners.splice(n, 1), t;
  },
  off(e, t) {
    const n = this;
    return (
      !n.eventsListeners ||
        n.destroyed ||
        !n.eventsListeners ||
        e.split(" ").forEach((r) => {
          typeof t > "u"
            ? (n.eventsListeners[r] = [])
            : n.eventsListeners[r] &&
              n.eventsListeners[r].forEach((i, o) => {
                (i === t || (i.__emitterProxy && i.__emitterProxy === t)) &&
                  n.eventsListeners[r].splice(o, 1);
              });
        }),
      n
    );
  },
  emit(...e) {
    const t = this;
    if (!t.eventsListeners || t.destroyed || !t.eventsListeners) return t;
    let n, r, i;
    return (
      typeof e[0] == "string" || Array.isArray(e[0])
        ? ((n = e[0]), (r = e.slice(1, e.length)), (i = t))
        : ((n = e[0].events), (r = e[0].data), (i = e[0].context || t)),
      r.unshift(i),
      (Array.isArray(n) ? n : n.split(" ")).forEach((a) => {
        t.eventsAnyListeners &&
          t.eventsAnyListeners.length &&
          t.eventsAnyListeners.forEach((l) => {
            l.apply(i, [a, ...r]);
          }),
          t.eventsListeners &&
            t.eventsListeners[a] &&
            t.eventsListeners[a].forEach((l) => {
              l.apply(i, r);
            });
      }),
      t
    );
  },
};
function Xk() {
  const e = this;
  let t, n;
  const r = e.el;
  typeof e.params.width < "u" && e.params.width !== null
    ? (t = e.params.width)
    : (t = r.clientWidth),
    typeof e.params.height < "u" && e.params.height !== null
      ? (n = e.params.height)
      : (n = r.clientHeight),
    !((t === 0 && e.isHorizontal()) || (n === 0 && e.isVertical())) &&
      ((t =
        t -
        parseInt(rr(r, "padding-left") || 0, 10) -
        parseInt(rr(r, "padding-right") || 0, 10)),
      (n =
        n -
        parseInt(rr(r, "padding-top") || 0, 10) -
        parseInt(rr(r, "padding-bottom") || 0, 10)),
      Number.isNaN(t) && (t = 0),
      Number.isNaN(n) && (n = 0),
      Object.assign(e, {
        width: t,
        height: n,
        size: e.isHorizontal() ? t : n,
      }));
}
function Kk() {
  const e = this;
  function t(D) {
    return e.isHorizontal()
      ? D
      : {
          width: "height",
          "margin-top": "margin-left",
          "margin-bottom ": "margin-right",
          "margin-left": "margin-top",
          "margin-right": "margin-bottom",
          "padding-left": "padding-top",
          "padding-right": "padding-bottom",
          marginRight: "marginBottom",
        }[D];
  }
  function n(D, N) {
    return parseFloat(D.getPropertyValue(t(N)) || 0);
  }
  const r = e.params,
    { wrapperEl: i, slidesEl: o, size: a, rtlTranslate: l, wrongRTL: s } = e,
    u = e.virtual && r.virtual.enabled,
    d = u ? e.virtual.slides.length : e.slides.length,
    c = kn(o, `.${e.params.slideClass}, swiper-slide`),
    f = u ? e.virtual.slides.length : c.length;
  let h = [];
  const v = [],
    y = [];
  let w = r.slidesOffsetBefore;
  typeof w == "function" && (w = r.slidesOffsetBefore.call(e));
  let m = r.slidesOffsetAfter;
  typeof m == "function" && (m = r.slidesOffsetAfter.call(e));
  const g = e.snapGrid.length,
    x = e.slidesGrid.length;
  let b = r.spaceBetween,
    C = -w,
    E = 0,
    P = 0;
  if (typeof a > "u") return;
  typeof b == "string" && b.indexOf("%") >= 0
    ? (b = (parseFloat(b.replace("%", "")) / 100) * a)
    : typeof b == "string" && (b = parseFloat(b)),
    (e.virtualSize = -b),
    c.forEach((D) => {
      l ? (D.style.marginLeft = "") : (D.style.marginRight = ""),
        (D.style.marginBottom = ""),
        (D.style.marginTop = "");
    }),
    r.centeredSlides &&
      r.cssMode &&
      (Sl(i, "--swiper-centered-offset-before", ""),
      Sl(i, "--swiper-centered-offset-after", ""));
  const T = r.grid && r.grid.rows > 1 && e.grid;
  T && e.grid.initSlides(f);
  let I;
  const O =
    r.slidesPerView === "auto" &&
    r.breakpoints &&
    Object.keys(r.breakpoints).filter(
      (D) => typeof r.breakpoints[D].slidesPerView < "u"
    ).length > 0;
  for (let D = 0; D < f; D += 1) {
    I = 0;
    let N;
    if (
      (c[D] && (N = c[D]),
      T && e.grid.updateSlide(D, N, f, t),
      !(c[D] && rr(N, "display") === "none"))
    ) {
      if (r.slidesPerView === "auto") {
        O && (c[D].style[t("width")] = "");
        const A = getComputedStyle(N),
          R = N.style.transform,
          V = N.style.webkitTransform;
        if (
          (R && (N.style.transform = "none"),
          V && (N.style.webkitTransform = "none"),
          r.roundLengths)
        )
          I = e.isHorizontal() ? hf(N, "width", !0) : hf(N, "height", !0);
        else {
          const J = n(A, "width"),
            re = n(A, "padding-left"),
            L = n(A, "padding-right"),
            M = n(A, "margin-left"),
            W = n(A, "margin-right"),
            K = A.getPropertyValue("box-sizing");
          if (K && K === "border-box") I = J + M + W;
          else {
            const { clientWidth: $, offsetWidth: _ } = N;
            I = J + re + L + M + W + (_ - $);
          }
        }
        R && (N.style.transform = R),
          V && (N.style.webkitTransform = V),
          r.roundLengths && (I = Math.floor(I));
      } else
        (I = (a - (r.slidesPerView - 1) * b) / r.slidesPerView),
          r.roundLengths && (I = Math.floor(I)),
          c[D] && (c[D].style[t("width")] = `${I}px`);
      c[D] && (c[D].swiperSlideSize = I),
        y.push(I),
        r.centeredSlides
          ? ((C = C + I / 2 + E / 2 + b),
            E === 0 && D !== 0 && (C = C - a / 2 - b),
            D === 0 && (C = C - a / 2 - b),
            Math.abs(C) < 1 / 1e3 && (C = 0),
            r.roundLengths && (C = Math.floor(C)),
            P % r.slidesPerGroup === 0 && h.push(C),
            v.push(C))
          : (r.roundLengths && (C = Math.floor(C)),
            (P - Math.min(e.params.slidesPerGroupSkip, P)) %
              e.params.slidesPerGroup ===
              0 && h.push(C),
            v.push(C),
            (C = C + I + b)),
        (e.virtualSize += I + b),
        (E = I),
        (P += 1);
    }
  }
  if (
    ((e.virtualSize = Math.max(e.virtualSize, a) + m),
    l &&
      s &&
      (r.effect === "slide" || r.effect === "coverflow") &&
      (i.style.width = `${e.virtualSize + b}px`),
    r.setWrapperSize && (i.style[t("width")] = `${e.virtualSize + b}px`),
    T && e.grid.updateWrapperSize(I, h, t),
    !r.centeredSlides)
  ) {
    const D = [];
    for (let N = 0; N < h.length; N += 1) {
      let A = h[N];
      r.roundLengths && (A = Math.floor(A)),
        h[N] <= e.virtualSize - a && D.push(A);
    }
    (h = D),
      Math.floor(e.virtualSize - a) - Math.floor(h[h.length - 1]) > 1 &&
        h.push(e.virtualSize - a);
  }
  if (u && r.loop) {
    const D = y[0] + b;
    if (r.slidesPerGroup > 1) {
      const N = Math.ceil(
          (e.virtual.slidesBefore + e.virtual.slidesAfter) / r.slidesPerGroup
        ),
        A = D * r.slidesPerGroup;
      for (let R = 0; R < N; R += 1) h.push(h[h.length - 1] + A);
    }
    for (let N = 0; N < e.virtual.slidesBefore + e.virtual.slidesAfter; N += 1)
      r.slidesPerGroup === 1 && h.push(h[h.length - 1] + D),
        v.push(v[v.length - 1] + D),
        (e.virtualSize += D);
  }
  if ((h.length === 0 && (h = [0]), b !== 0)) {
    const D = e.isHorizontal() && l ? "marginLeft" : t("marginRight");
    c.filter((N, A) =>
      !r.cssMode || r.loop ? !0 : A !== c.length - 1
    ).forEach((N) => {
      N.style[D] = `${b}px`;
    });
  }
  if (r.centeredSlides && r.centeredSlidesBounds) {
    let D = 0;
    y.forEach((A) => {
      D += A + (b || 0);
    }),
      (D -= b);
    const N = D - a;
    h = h.map((A) => (A < 0 ? -w : A > N ? N + m : A));
  }
  if (r.centerInsufficientSlides) {
    let D = 0;
    if (
      (y.forEach((N) => {
        D += N + (b || 0);
      }),
      (D -= b),
      D < a)
    ) {
      const N = (a - D) / 2;
      h.forEach((A, R) => {
        h[R] = A - N;
      }),
        v.forEach((A, R) => {
          v[R] = A + N;
        });
    }
  }
  if (
    (Object.assign(e, {
      slides: c,
      snapGrid: h,
      slidesGrid: v,
      slidesSizesGrid: y,
    }),
    r.centeredSlides && r.cssMode && !r.centeredSlidesBounds)
  ) {
    Sl(i, "--swiper-centered-offset-before", `${-h[0]}px`),
      Sl(
        i,
        "--swiper-centered-offset-after",
        `${e.size / 2 - y[y.length - 1] / 2}px`
      );
    const D = -e.snapGrid[0],
      N = -e.slidesGrid[0];
    (e.snapGrid = e.snapGrid.map((A) => A + D)),
      (e.slidesGrid = e.slidesGrid.map((A) => A + N));
  }
  if (
    (f !== d && e.emit("slidesLengthChange"),
    h.length !== g &&
      (e.params.watchOverflow && e.checkOverflow(),
      e.emit("snapGridLengthChange")),
    v.length !== x && e.emit("slidesGridLengthChange"),
    r.watchSlidesProgress && e.updateSlidesOffset(),
    !u && !r.cssMode && (r.effect === "slide" || r.effect === "fade"))
  ) {
    const D = `${r.containerModifierClass}backface-hidden`,
      N = e.el.classList.contains(D);
    f <= r.maxBackfaceHiddenSlides
      ? N || e.el.classList.add(D)
      : N && e.el.classList.remove(D);
  }
}
function Qk(e) {
  const t = this,
    n = [],
    r = t.virtual && t.params.virtual.enabled;
  let i = 0,
    o;
  typeof e == "number"
    ? t.setTransition(e)
    : e === !0 && t.setTransition(t.params.speed);
  const a = (l) => (r ? t.slides[t.getSlideIndexByData(l)] : t.slides[l]);
  if (t.params.slidesPerView !== "auto" && t.params.slidesPerView > 1)
    if (t.params.centeredSlides)
      (t.visibleSlides || []).forEach((l) => {
        n.push(l);
      });
    else
      for (o = 0; o < Math.ceil(t.params.slidesPerView); o += 1) {
        const l = t.activeIndex + o;
        if (l > t.slides.length && !r) break;
        n.push(a(l));
      }
  else n.push(a(t.activeIndex));
  for (o = 0; o < n.length; o += 1)
    if (typeof n[o] < "u") {
      const l = n[o].offsetHeight;
      i = l > i ? l : i;
    }
  (i || i === 0) && (t.wrapperEl.style.height = `${i}px`);
}
function Zk() {
  const e = this,
    t = e.slides,
    n = e.isElement
      ? e.isHorizontal()
        ? e.wrapperEl.offsetLeft
        : e.wrapperEl.offsetTop
      : 0;
  for (let r = 0; r < t.length; r += 1)
    t[r].swiperSlideOffset =
      (e.isHorizontal() ? t[r].offsetLeft : t[r].offsetTop) -
      n -
      e.cssOverflowAdjustment();
}
function Jk(e = (this && this.translate) || 0) {
  const t = this,
    n = t.params,
    { slides: r, rtlTranslate: i, snapGrid: o } = t;
  if (r.length === 0) return;
  typeof r[0].swiperSlideOffset > "u" && t.updateSlidesOffset();
  let a = -e;
  i && (a = e),
    r.forEach((s) => {
      s.classList.remove(n.slideVisibleClass);
    }),
    (t.visibleSlidesIndexes = []),
    (t.visibleSlides = []);
  let l = n.spaceBetween;
  typeof l == "string" && l.indexOf("%") >= 0
    ? (l = (parseFloat(l.replace("%", "")) / 100) * t.size)
    : typeof l == "string" && (l = parseFloat(l));
  for (let s = 0; s < r.length; s += 1) {
    const u = r[s];
    let d = u.swiperSlideOffset;
    n.cssMode && n.centeredSlides && (d -= r[0].swiperSlideOffset);
    const c =
        (a + (n.centeredSlides ? t.minTranslate() : 0) - d) /
        (u.swiperSlideSize + l),
      f =
        (a - o[0] + (n.centeredSlides ? t.minTranslate() : 0) - d) /
        (u.swiperSlideSize + l),
      h = -(a - d),
      v = h + t.slidesSizesGrid[s];
    ((h >= 0 && h < t.size - 1) ||
      (v > 1 && v <= t.size) ||
      (h <= 0 && v >= t.size)) &&
      (t.visibleSlides.push(u),
      t.visibleSlidesIndexes.push(s),
      r[s].classList.add(n.slideVisibleClass)),
      (u.progress = i ? -c : c),
      (u.originalProgress = i ? -f : f);
  }
}
function eP(e) {
  const t = this;
  if (typeof e > "u") {
    const d = t.rtlTranslate ? -1 : 1;
    e = (t && t.translate && t.translate * d) || 0;
  }
  const n = t.params,
    r = t.maxTranslate() - t.minTranslate();
  let { progress: i, isBeginning: o, isEnd: a, progressLoop: l } = t;
  const s = o,
    u = a;
  if (r === 0) (i = 0), (o = !0), (a = !0);
  else {
    i = (e - t.minTranslate()) / r;
    const d = Math.abs(e - t.minTranslate()) < 1,
      c = Math.abs(e - t.maxTranslate()) < 1;
    (o = d || i <= 0), (a = c || i >= 1), d && (i = 0), c && (i = 1);
  }
  if (n.loop) {
    const d = t.getSlideIndexByData(0),
      c = t.getSlideIndexByData(t.slides.length - 1),
      f = t.slidesGrid[d],
      h = t.slidesGrid[c],
      v = t.slidesGrid[t.slidesGrid.length - 1],
      y = Math.abs(e);
    y >= f ? (l = (y - f) / v) : (l = (y + v - h) / v), l > 1 && (l -= 1);
  }
  Object.assign(t, { progress: i, progressLoop: l, isBeginning: o, isEnd: a }),
    (n.watchSlidesProgress || (n.centeredSlides && n.autoHeight)) &&
      t.updateSlidesProgress(e),
    o && !s && t.emit("reachBeginning toEdge"),
    a && !u && t.emit("reachEnd toEdge"),
    ((s && !o) || (u && !a)) && t.emit("fromEdge"),
    t.emit("progress", i);
}
function tP() {
  const e = this,
    { slides: t, params: n, slidesEl: r, activeIndex: i } = e,
    o = e.virtual && n.virtual.enabled,
    a = (s) => kn(r, `.${n.slideClass}${s}, swiper-slide${s}`)[0];
  t.forEach((s) => {
    s.classList.remove(n.slideActiveClass, n.slideNextClass, n.slidePrevClass);
  });
  let l;
  if (o)
    if (n.loop) {
      let s = i - e.virtual.slidesBefore;
      s < 0 && (s = e.virtual.slides.length + s),
        s >= e.virtual.slides.length && (s -= e.virtual.slides.length),
        (l = a(`[data-swiper-slide-index="${s}"]`));
    } else l = a(`[data-swiper-slide-index="${i}"]`);
  else l = t[i];
  if (l) {
    l.classList.add(n.slideActiveClass);
    let s = zk(l, `.${n.slideClass}, swiper-slide`)[0];
    n.loop && !s && (s = t[0]), s && s.classList.add(n.slideNextClass);
    let u = Bk(l, `.${n.slideClass}, swiper-slide`)[0];
    n.loop && !u === 0 && (u = t[t.length - 1]),
      u && u.classList.add(n.slidePrevClass);
  }
  e.emitSlidesClasses();
}
const Wl = (e, t) => {
    if (!e || e.destroyed || !e.params) return;
    const n = () => (e.isElement ? "swiper-slide" : `.${e.params.slideClass}`),
      r = t.closest(n());
    if (r) {
      const i = r.querySelector(`.${e.params.lazyPreloaderClass}`);
      i && i.remove();
    }
  },
  Ng = (e, t) => {
    if (!e.slides[t]) return;
    const n = e.slides[t].querySelector('[loading="lazy"]');
    n && n.removeAttribute("loading");
  },
  gf = (e) => {
    if (!e || e.destroyed || !e.params) return;
    let t = e.params.lazyPreloadPrevNext;
    const n = e.slides.length;
    if (!n || !t || t < 0) return;
    t = Math.min(t, n);
    const r =
        e.params.slidesPerView === "auto"
          ? e.slidesPerViewDynamic()
          : Math.ceil(e.params.slidesPerView),
      i = e.activeIndex,
      o = i + r - 1;
    if (e.params.rewind)
      for (let a = i - t; a <= o + t; a += 1) {
        const l = ((a % n) + n) % n;
        l !== i && l > o && Ng(e, l);
      }
    else
      for (let a = Math.max(o - t, 0); a <= Math.min(o + t, n - 1); a += 1)
        a !== i && a > o && Ng(e, a);
  };
function nP(e) {
  const { slidesGrid: t, params: n } = e,
    r = e.rtlTranslate ? e.translate : -e.translate;
  let i;
  for (let o = 0; o < t.length; o += 1)
    typeof t[o + 1] < "u"
      ? r >= t[o] && r < t[o + 1] - (t[o + 1] - t[o]) / 2
        ? (i = o)
        : r >= t[o] && r < t[o + 1] && (i = o + 1)
      : r >= t[o] && (i = o);
  return n.normalizeSlideIndex && (i < 0 || typeof i > "u") && (i = 0), i;
}
function rP(e) {
  const t = this,
    n = t.rtlTranslate ? t.translate : -t.translate,
    { snapGrid: r, params: i, activeIndex: o, realIndex: a, snapIndex: l } = t;
  let s = e,
    u;
  const d = (f) => {
    let h = f - t.virtual.slidesBefore;
    return (
      h < 0 && (h = t.virtual.slides.length + h),
      h >= t.virtual.slides.length && (h -= t.virtual.slides.length),
      h
    );
  };
  if ((typeof s > "u" && (s = nP(t)), r.indexOf(n) >= 0)) u = r.indexOf(n);
  else {
    const f = Math.min(i.slidesPerGroupSkip, s);
    u = f + Math.floor((s - f) / i.slidesPerGroup);
  }
  if ((u >= r.length && (u = r.length - 1), s === o)) {
    u !== l && ((t.snapIndex = u), t.emit("snapIndexChange")),
      t.params.loop &&
        t.virtual &&
        t.params.virtual.enabled &&
        (t.realIndex = d(s));
    return;
  }
  let c;
  t.virtual && i.virtual.enabled && i.loop
    ? (c = d(s))
    : t.slides[s]
    ? (c = parseInt(
        t.slides[s].getAttribute("data-swiper-slide-index") || s,
        10
      ))
    : (c = s),
    Object.assign(t, {
      previousSnapIndex: l,
      snapIndex: u,
      previousRealIndex: a,
      realIndex: c,
      previousIndex: o,
      activeIndex: s,
    }),
    t.initialized && gf(t),
    t.emit("activeIndexChange"),
    t.emit("snapIndexChange"),
    a !== c && t.emit("realIndexChange"),
    (t.initialized || t.params.runCallbacksOnInit) && t.emit("slideChange");
}
function iP(e) {
  const t = this,
    n = t.params,
    r = e.closest(`.${n.slideClass}, swiper-slide`);
  let i = !1,
    o;
  if (r) {
    for (let a = 0; a < t.slides.length; a += 1)
      if (t.slides[a] === r) {
        (i = !0), (o = a);
        break;
      }
  }
  if (r && i)
    (t.clickedSlide = r),
      t.virtual && t.params.virtual.enabled
        ? (t.clickedIndex = parseInt(
            r.getAttribute("data-swiper-slide-index"),
            10
          ))
        : (t.clickedIndex = o);
  else {
    (t.clickedSlide = void 0), (t.clickedIndex = void 0);
    return;
  }
  n.slideToClickedSlide &&
    t.clickedIndex !== void 0 &&
    t.clickedIndex !== t.activeIndex &&
    t.slideToClickedSlide();
}
const oP = {
  updateSize: Xk,
  updateSlides: Kk,
  updateAutoHeight: Qk,
  updateSlidesOffset: Zk,
  updateSlidesProgress: Jk,
  updateProgress: eP,
  updateSlidesClasses: tP,
  updateActiveIndex: rP,
  updateClickedSlide: iP,
};
function aP(e = this.isHorizontal() ? "x" : "y") {
  const t = this,
    { params: n, rtlTranslate: r, translate: i, wrapperEl: o } = t;
  if (n.virtualTranslate) return r ? -i : i;
  if (n.cssMode) return i;
  let a = _k(o, e);
  return (a += t.cssOverflowAdjustment()), r && (a = -a), a || 0;
}
function lP(e, t) {
  const n = this,
    { rtlTranslate: r, params: i, wrapperEl: o, progress: a } = n;
  let l = 0,
    s = 0;
  const u = 0;
  n.isHorizontal() ? (l = r ? -e : e) : (s = e),
    i.roundLengths && ((l = Math.floor(l)), (s = Math.floor(s))),
    (n.previousTranslate = n.translate),
    (n.translate = n.isHorizontal() ? l : s),
    i.cssMode
      ? (o[n.isHorizontal() ? "scrollLeft" : "scrollTop"] = n.isHorizontal()
          ? -l
          : -s)
      : i.virtualTranslate ||
        (n.isHorizontal()
          ? (l -= n.cssOverflowAdjustment())
          : (s -= n.cssOverflowAdjustment()),
        (o.style.transform = `translate3d(${l}px, ${s}px, ${u}px)`));
  let d;
  const c = n.maxTranslate() - n.minTranslate();
  c === 0 ? (d = 0) : (d = (e - n.minTranslate()) / c),
    d !== a && n.updateProgress(e),
    n.emit("setTranslate", n.translate, t);
}
function sP() {
  return -this.snapGrid[0];
}
function uP() {
  return -this.snapGrid[this.snapGrid.length - 1];
}
function cP(e = 0, t = this.params.speed, n = !0, r = !0, i) {
  const o = this,
    { params: a, wrapperEl: l } = o;
  if (o.animating && a.preventInteractionOnTransition) return !1;
  const s = o.minTranslate(),
    u = o.maxTranslate();
  let d;
  if (
    (r && e > s ? (d = s) : r && e < u ? (d = u) : (d = e),
    o.updateProgress(d),
    a.cssMode)
  ) {
    const c = o.isHorizontal();
    if (t === 0) l[c ? "scrollLeft" : "scrollTop"] = -d;
    else {
      if (!o.support.smoothScroll)
        return (
          qy({ swiper: o, targetPosition: -d, side: c ? "left" : "top" }), !0
        );
      l.scrollTo({ [c ? "left" : "top"]: -d, behavior: "smooth" });
    }
    return !0;
  }
  return (
    t === 0
      ? (o.setTransition(0),
        o.setTranslate(d),
        n && (o.emit("beforeTransitionStart", t, i), o.emit("transitionEnd")))
      : (o.setTransition(t),
        o.setTranslate(d),
        n && (o.emit("beforeTransitionStart", t, i), o.emit("transitionStart")),
        o.animating ||
          ((o.animating = !0),
          o.onTranslateToWrapperTransitionEnd ||
            (o.onTranslateToWrapperTransitionEnd = function (f) {
              !o ||
                o.destroyed ||
                (f.target === this &&
                  (o.wrapperEl.removeEventListener(
                    "transitionend",
                    o.onTranslateToWrapperTransitionEnd
                  ),
                  (o.onTranslateToWrapperTransitionEnd = null),
                  delete o.onTranslateToWrapperTransitionEnd,
                  n && o.emit("transitionEnd")));
            }),
          o.wrapperEl.addEventListener(
            "transitionend",
            o.onTranslateToWrapperTransitionEnd
          ))),
    !0
  );
}
const dP = {
  getTranslate: aP,
  setTranslate: lP,
  minTranslate: sP,
  maxTranslate: uP,
  translateTo: cP,
};
function fP(e, t) {
  const n = this;
  n.params.cssMode || (n.wrapperEl.style.transitionDuration = `${e}ms`),
    n.emit("setTransition", e, t);
}
function Qy({ swiper: e, runCallbacks: t, direction: n, step: r }) {
  const { activeIndex: i, previousIndex: o } = e;
  let a = n;
  if (
    (a || (i > o ? (a = "next") : i < o ? (a = "prev") : (a = "reset")),
    e.emit(`transition${r}`),
    t && i !== o)
  ) {
    if (a === "reset") {
      e.emit(`slideResetTransition${r}`);
      return;
    }
    e.emit(`slideChangeTransition${r}`),
      a === "next"
        ? e.emit(`slideNextTransition${r}`)
        : e.emit(`slidePrevTransition${r}`);
  }
}
function pP(e = !0, t) {
  const n = this,
    { params: r } = n;
  r.cssMode ||
    (r.autoHeight && n.updateAutoHeight(),
    Qy({ swiper: n, runCallbacks: e, direction: t, step: "Start" }));
}
function mP(e = !0, t) {
  const n = this,
    { params: r } = n;
  (n.animating = !1),
    !r.cssMode &&
      (n.setTransition(0),
      Qy({ swiper: n, runCallbacks: e, direction: t, step: "End" }));
}
const hP = { setTransition: fP, transitionStart: pP, transitionEnd: mP };
function gP(e = 0, t = this.params.speed, n = !0, r, i) {
  typeof e == "string" && (e = parseInt(e, 10));
  const o = this;
  let a = e;
  a < 0 && (a = 0);
  const {
    params: l,
    snapGrid: s,
    slidesGrid: u,
    previousIndex: d,
    activeIndex: c,
    rtlTranslate: f,
    wrapperEl: h,
    enabled: v,
  } = o;
  if ((o.animating && l.preventInteractionOnTransition) || (!v && !r && !i))
    return !1;
  const y = Math.min(o.params.slidesPerGroupSkip, a);
  let w = y + Math.floor((a - y) / o.params.slidesPerGroup);
  w >= s.length && (w = s.length - 1);
  const m = -s[w];
  if (l.normalizeSlideIndex)
    for (let x = 0; x < u.length; x += 1) {
      const b = -Math.floor(m * 100),
        C = Math.floor(u[x] * 100),
        E = Math.floor(u[x + 1] * 100);
      typeof u[x + 1] < "u"
        ? b >= C && b < E - (E - C) / 2
          ? (a = x)
          : b >= C && b < E && (a = x + 1)
        : b >= C && (a = x);
    }
  if (
    o.initialized &&
    a !== c &&
    ((!o.allowSlideNext && m < o.translate && m < o.minTranslate()) ||
      (!o.allowSlidePrev &&
        m > o.translate &&
        m > o.maxTranslate() &&
        (c || 0) !== a))
  )
    return !1;
  a !== (d || 0) && n && o.emit("beforeSlideChangeStart"), o.updateProgress(m);
  let g;
  if (
    (a > c ? (g = "next") : a < c ? (g = "prev") : (g = "reset"),
    (f && -m === o.translate) || (!f && m === o.translate))
  )
    return (
      o.updateActiveIndex(a),
      l.autoHeight && o.updateAutoHeight(),
      o.updateSlidesClasses(),
      l.effect !== "slide" && o.setTranslate(m),
      g !== "reset" && (o.transitionStart(n, g), o.transitionEnd(n, g)),
      !1
    );
  if (l.cssMode) {
    const x = o.isHorizontal(),
      b = f ? m : -m;
    if (t === 0) {
      const C = o.virtual && o.params.virtual.enabled;
      C &&
        ((o.wrapperEl.style.scrollSnapType = "none"),
        (o._immediateVirtual = !0)),
        C && !o._cssModeVirtualInitialSet && o.params.initialSlide > 0
          ? ((o._cssModeVirtualInitialSet = !0),
            requestAnimationFrame(() => {
              h[x ? "scrollLeft" : "scrollTop"] = b;
            }))
          : (h[x ? "scrollLeft" : "scrollTop"] = b),
        C &&
          requestAnimationFrame(() => {
            (o.wrapperEl.style.scrollSnapType = ""), (o._immediateVirtual = !1);
          });
    } else {
      if (!o.support.smoothScroll)
        return (
          qy({ swiper: o, targetPosition: b, side: x ? "left" : "top" }), !0
        );
      h.scrollTo({ [x ? "left" : "top"]: b, behavior: "smooth" });
    }
    return !0;
  }
  return (
    o.setTransition(t),
    o.setTranslate(m),
    o.updateActiveIndex(a),
    o.updateSlidesClasses(),
    o.emit("beforeTransitionStart", t, r),
    o.transitionStart(n, g),
    t === 0
      ? o.transitionEnd(n, g)
      : o.animating ||
        ((o.animating = !0),
        o.onSlideToWrapperTransitionEnd ||
          (o.onSlideToWrapperTransitionEnd = function (b) {
            !o ||
              o.destroyed ||
              (b.target === this &&
                (o.wrapperEl.removeEventListener(
                  "transitionend",
                  o.onSlideToWrapperTransitionEnd
                ),
                (o.onSlideToWrapperTransitionEnd = null),
                delete o.onSlideToWrapperTransitionEnd,
                o.transitionEnd(n, g)));
          }),
        o.wrapperEl.addEventListener(
          "transitionend",
          o.onSlideToWrapperTransitionEnd
        )),
    !0
  );
}
function vP(e = 0, t = this.params.speed, n = !0, r) {
  typeof e == "string" && (e = parseInt(e, 10));
  const i = this;
  let o = e;
  return (
    i.params.loop &&
      (i.virtual && i.params.virtual.enabled
        ? (o = o + i.virtual.slidesBefore)
        : (o = i.getSlideIndexByData(o))),
    i.slideTo(o, t, n, r)
  );
}
function yP(e = this.params.speed, t = !0, n) {
  const r = this,
    { enabled: i, params: o, animating: a } = r;
  if (!i) return r;
  let l = o.slidesPerGroup;
  o.slidesPerView === "auto" &&
    o.slidesPerGroup === 1 &&
    o.slidesPerGroupAuto &&
    (l = Math.max(r.slidesPerViewDynamic("current", !0), 1));
  const s = r.activeIndex < o.slidesPerGroupSkip ? 1 : l,
    u = r.virtual && o.virtual.enabled;
  if (o.loop) {
    if (a && !u && o.loopPreventsSliding) return !1;
    r.loopFix({ direction: "next" }), (r._clientLeft = r.wrapperEl.clientLeft);
  }
  return o.rewind && r.isEnd
    ? r.slideTo(0, e, t, n)
    : r.slideTo(r.activeIndex + s, e, t, n);
}
function xP(e = this.params.speed, t = !0, n) {
  const r = this,
    {
      params: i,
      snapGrid: o,
      slidesGrid: a,
      rtlTranslate: l,
      enabled: s,
      animating: u,
    } = r;
  if (!s) return r;
  const d = r.virtual && i.virtual.enabled;
  if (i.loop) {
    if (u && !d && i.loopPreventsSliding) return !1;
    r.loopFix({ direction: "prev" }), (r._clientLeft = r.wrapperEl.clientLeft);
  }
  const c = l ? r.translate : -r.translate;
  function f(m) {
    return m < 0 ? -Math.floor(Math.abs(m)) : Math.floor(m);
  }
  const h = f(c),
    v = o.map((m) => f(m));
  let y = o[v.indexOf(h) - 1];
  if (typeof y > "u" && i.cssMode) {
    let m;
    o.forEach((g, x) => {
      h >= g && (m = x);
    }),
      typeof m < "u" && (y = o[m > 0 ? m - 1 : m]);
  }
  let w = 0;
  if (
    (typeof y < "u" &&
      ((w = a.indexOf(y)),
      w < 0 && (w = r.activeIndex - 1),
      i.slidesPerView === "auto" &&
        i.slidesPerGroup === 1 &&
        i.slidesPerGroupAuto &&
        ((w = w - r.slidesPerViewDynamic("previous", !0) + 1),
        (w = Math.max(w, 0)))),
    i.rewind && r.isBeginning)
  ) {
    const m =
      r.params.virtual && r.params.virtual.enabled && r.virtual
        ? r.virtual.slides.length - 1
        : r.slides.length - 1;
    return r.slideTo(m, e, t, n);
  }
  return r.slideTo(w, e, t, n);
}
function wP(e = this.params.speed, t = !0, n) {
  const r = this;
  return r.slideTo(r.activeIndex, e, t, n);
}
function bP(e = this.params.speed, t = !0, n, r = 0.5) {
  const i = this;
  let o = i.activeIndex;
  const a = Math.min(i.params.slidesPerGroupSkip, o),
    l = a + Math.floor((o - a) / i.params.slidesPerGroup),
    s = i.rtlTranslate ? i.translate : -i.translate;
  if (s >= i.snapGrid[l]) {
    const u = i.snapGrid[l],
      d = i.snapGrid[l + 1];
    s - u > (d - u) * r && (o += i.params.slidesPerGroup);
  } else {
    const u = i.snapGrid[l - 1],
      d = i.snapGrid[l];
    s - u <= (d - u) * r && (o -= i.params.slidesPerGroup);
  }
  return (
    (o = Math.max(o, 0)),
    (o = Math.min(o, i.slidesGrid.length - 1)),
    i.slideTo(o, e, t, n)
  );
}
function SP() {
  const e = this,
    { params: t, slidesEl: n } = e,
    r = t.slidesPerView === "auto" ? e.slidesPerViewDynamic() : t.slidesPerView;
  let i = e.clickedIndex,
    o;
  const a = e.isElement ? "swiper-slide" : `.${t.slideClass}`;
  if (t.loop) {
    if (e.animating) return;
    (o = parseInt(e.clickedSlide.getAttribute("data-swiper-slide-index"), 10)),
      t.centeredSlides
        ? i < e.loopedSlides - r / 2 ||
          i > e.slides.length - e.loopedSlides + r / 2
          ? (e.loopFix(),
            (i = e.getSlideIndex(
              kn(n, `${a}[data-swiper-slide-index="${o}"]`)[0]
            )),
            mf(() => {
              e.slideTo(i);
            }))
          : e.slideTo(i)
        : i > e.slides.length - r
        ? (e.loopFix(),
          (i = e.getSlideIndex(
            kn(n, `${a}[data-swiper-slide-index="${o}"]`)[0]
          )),
          mf(() => {
            e.slideTo(i);
          }))
        : e.slideTo(i);
  } else e.slideTo(i);
}
const CP = {
  slideTo: gP,
  slideToLoop: vP,
  slideNext: yP,
  slidePrev: xP,
  slideReset: wP,
  slideToClosest: bP,
  slideToClickedSlide: SP,
};
function EP(e) {
  const t = this,
    { params: n, slidesEl: r } = t;
  if (!n.loop || (t.virtual && t.params.virtual.enabled)) return;
  kn(r, `.${n.slideClass}, swiper-slide`).forEach((o, a) => {
    o.setAttribute("data-swiper-slide-index", a);
  }),
    t.loopFix({
      slideRealIndex: e,
      direction: n.centeredSlides ? void 0 : "next",
    });
}
function TP({
  slideRealIndex: e,
  slideTo: t = !0,
  direction: n,
  setTranslate: r,
  activeSlideIndex: i,
  byController: o,
  byMousewheel: a,
} = {}) {
  const l = this;
  if (!l.params.loop) return;
  l.emit("beforeLoopFix");
  const {
    slides: s,
    allowSlidePrev: u,
    allowSlideNext: d,
    slidesEl: c,
    params: f,
  } = l;
  if (
    ((l.allowSlidePrev = !0),
    (l.allowSlideNext = !0),
    l.virtual && f.virtual.enabled)
  ) {
    t &&
      (!f.centeredSlides && l.snapIndex === 0
        ? l.slideTo(l.virtual.slides.length, 0, !1, !0)
        : f.centeredSlides && l.snapIndex < f.slidesPerView
        ? l.slideTo(l.virtual.slides.length + l.snapIndex, 0, !1, !0)
        : l.snapIndex === l.snapGrid.length - 1 &&
          l.slideTo(l.virtual.slidesBefore, 0, !1, !0)),
      (l.allowSlidePrev = u),
      (l.allowSlideNext = d),
      l.emit("loopFix");
    return;
  }
  const h =
    f.slidesPerView === "auto"
      ? l.slidesPerViewDynamic()
      : Math.ceil(parseFloat(f.slidesPerView, 10));
  let v = f.loopedSlides || h;
  v % f.slidesPerGroup !== 0 &&
    (v += f.slidesPerGroup - (v % f.slidesPerGroup)),
    (l.loopedSlides = v);
  const y = [],
    w = [];
  let m = l.activeIndex;
  typeof i > "u"
    ? (i = l.getSlideIndex(
        l.slides.filter((E) => E.classList.contains(f.slideActiveClass))[0]
      ))
    : (m = i);
  const g = n === "next" || !n,
    x = n === "prev" || !n;
  let b = 0,
    C = 0;
  if (i < v) {
    b = Math.max(v - i, f.slidesPerGroup);
    for (let E = 0; E < v - i; E += 1) {
      const P = E - Math.floor(E / s.length) * s.length;
      y.push(s.length - P - 1);
    }
  } else if (i > l.slides.length - v * 2) {
    C = Math.max(i - (l.slides.length - v * 2), f.slidesPerGroup);
    for (let E = 0; E < C; E += 1) {
      const P = E - Math.floor(E / s.length) * s.length;
      w.push(P);
    }
  }
  if (
    (x &&
      y.forEach((E) => {
        (l.slides[E].swiperLoopMoveDOM = !0),
          c.prepend(l.slides[E]),
          (l.slides[E].swiperLoopMoveDOM = !1);
      }),
    g &&
      w.forEach((E) => {
        (l.slides[E].swiperLoopMoveDOM = !0),
          c.append(l.slides[E]),
          (l.slides[E].swiperLoopMoveDOM = !1);
      }),
    l.recalcSlides(),
    f.slidesPerView === "auto" && l.updateSlides(),
    f.watchSlidesProgress && l.updateSlidesOffset(),
    t)
  ) {
    if (y.length > 0 && x)
      if (typeof e > "u") {
        const E = l.slidesGrid[m],
          T = l.slidesGrid[m + b] - E;
        a
          ? l.setTranslate(l.translate - T)
          : (l.slideTo(m + b, 0, !1, !0),
            r && (l.touches[l.isHorizontal() ? "startX" : "startY"] += T));
      } else r && l.slideToLoop(e, 0, !1, !0);
    else if (w.length > 0 && g)
      if (typeof e > "u") {
        const E = l.slidesGrid[m],
          T = l.slidesGrid[m - C] - E;
        a
          ? l.setTranslate(l.translate - T)
          : (l.slideTo(m - C, 0, !1, !0),
            r && (l.touches[l.isHorizontal() ? "startX" : "startY"] += T));
      } else l.slideToLoop(e, 0, !1, !0);
  }
  if (
    ((l.allowSlidePrev = u),
    (l.allowSlideNext = d),
    l.controller && l.controller.control && !o)
  ) {
    const E = {
      slideRealIndex: e,
      slideTo: !1,
      direction: n,
      setTranslate: r,
      activeSlideIndex: i,
      byController: !0,
    };
    Array.isArray(l.controller.control)
      ? l.controller.control.forEach((P) => {
          !P.destroyed && P.params.loop && P.loopFix(E);
        })
      : l.controller.control instanceof l.constructor &&
        l.controller.control.params.loop &&
        l.controller.control.loopFix(E);
  }
  l.emit("loopFix");
}
function kP() {
  const e = this,
    { params: t, slidesEl: n } = e;
  if (!t.loop || (e.virtual && e.params.virtual.enabled)) return;
  e.recalcSlides();
  const r = [];
  e.slides.forEach((i) => {
    const o =
      typeof i.swiperSlideIndex > "u"
        ? i.getAttribute("data-swiper-slide-index") * 1
        : i.swiperSlideIndex;
    r[o] = i;
  }),
    e.slides.forEach((i) => {
      i.removeAttribute("data-swiper-slide-index");
    }),
    r.forEach((i) => {
      n.append(i);
    }),
    e.recalcSlides(),
    e.slideTo(e.realIndex, 0);
}
const PP = { loopCreate: EP, loopFix: TP, loopDestroy: kP };
function IP(e) {
  const t = this;
  if (
    !t.params.simulateTouch ||
    (t.params.watchOverflow && t.isLocked) ||
    t.params.cssMode
  )
    return;
  const n = t.params.touchEventsTarget === "container" ? t.el : t.wrapperEl;
  t.isElement && (t.__preventObserver__ = !0),
    (n.style.cursor = "move"),
    (n.style.cursor = e ? "grabbing" : "grab"),
    t.isElement &&
      requestAnimationFrame(() => {
        t.__preventObserver__ = !1;
      });
}
function AP() {
  const e = this;
  (e.params.watchOverflow && e.isLocked) ||
    e.params.cssMode ||
    (e.isElement && (e.__preventObserver__ = !0),
    (e[
      e.params.touchEventsTarget === "container" ? "el" : "wrapperEl"
    ].style.cursor = ""),
    e.isElement &&
      requestAnimationFrame(() => {
        e.__preventObserver__ = !1;
      }));
}
const DP = { setGrabCursor: IP, unsetGrabCursor: AP };
function OP(e, t = this) {
  function n(r) {
    if (!r || r === ui() || r === Ut()) return null;
    r.assignedSlot && (r = r.assignedSlot);
    const i = r.closest(e);
    return !i && !r.getRootNode ? null : i || n(r.getRootNode().host);
  }
  return n(t);
}
function jP(e) {
  const t = this,
    n = ui(),
    r = Ut(),
    i = t.touchEventsData;
  i.evCache.push(e);
  const { params: o, touches: a, enabled: l } = t;
  if (
    !l ||
    (!o.simulateTouch && e.pointerType === "mouse") ||
    (t.animating && o.preventInteractionOnTransition)
  )
    return;
  !t.animating && o.cssMode && o.loop && t.loopFix();
  let s = e;
  s.originalEvent && (s = s.originalEvent);
  let u = s.target;
  if (
    (o.touchEventsTarget === "wrapper" && !t.wrapperEl.contains(u)) ||
    ("which" in s && s.which === 3) ||
    ("button" in s && s.button > 0) ||
    (i.isTouched && i.isMoved)
  )
    return;
  const d = !!o.noSwipingClass && o.noSwipingClass !== "",
    c = e.composedPath ? e.composedPath() : e.path;
  d && s.target && s.target.shadowRoot && c && (u = c[0]);
  const f = o.noSwipingSelector ? o.noSwipingSelector : `.${o.noSwipingClass}`,
    h = !!(s.target && s.target.shadowRoot);
  if (o.noSwiping && (h ? OP(f, u) : u.closest(f))) {
    t.allowClick = !0;
    return;
  }
  if (o.swipeHandler && !u.closest(o.swipeHandler)) return;
  (a.currentX = s.pageX), (a.currentY = s.pageY);
  const v = a.currentX,
    y = a.currentY,
    w = o.edgeSwipeDetection || o.iOSEdgeSwipeDetection,
    m = o.edgeSwipeThreshold || o.iOSEdgeSwipeThreshold;
  if (w && (v <= m || v >= r.innerWidth - m))
    if (w === "prevent") e.preventDefault();
    else return;
  Object.assign(i, {
    isTouched: !0,
    isMoved: !1,
    allowTouchCallbacks: !0,
    isScrolling: void 0,
    startMoving: void 0,
  }),
    (a.startX = v),
    (a.startY = y),
    (i.touchStartTime = Ds()),
    (t.allowClick = !0),
    t.updateSize(),
    (t.swipeDirection = void 0),
    o.threshold > 0 && (i.allowThresholdMove = !1);
  let g = !0;
  u.matches(i.focusableElements) &&
    ((g = !1), u.nodeName === "SELECT" && (i.isTouched = !1)),
    n.activeElement &&
      n.activeElement.matches(i.focusableElements) &&
      n.activeElement !== u &&
      n.activeElement.blur();
  const x = g && t.allowTouchMove && o.touchStartPreventDefault;
  (o.touchStartForcePreventDefault || x) &&
    !u.isContentEditable &&
    s.preventDefault(),
    t.params.freeMode &&
      t.params.freeMode.enabled &&
      t.freeMode &&
      t.animating &&
      !o.cssMode &&
      t.freeMode.onTouchStart(),
    t.emit("touchStart", s);
}
function NP(e) {
  const t = ui(),
    n = this,
    r = n.touchEventsData,
    { params: i, touches: o, rtlTranslate: a, enabled: l } = n;
  if (!l || (!i.simulateTouch && e.pointerType === "mouse")) return;
  let s = e;
  if ((s.originalEvent && (s = s.originalEvent), !r.isTouched)) {
    r.startMoving && r.isScrolling && n.emit("touchMoveOpposite", s);
    return;
  }
  const u = r.evCache.findIndex((E) => E.pointerId === s.pointerId);
  u >= 0 && (r.evCache[u] = s);
  const d = r.evCache.length > 1 ? r.evCache[0] : s,
    c = d.pageX,
    f = d.pageY;
  if (s.preventedByNestedSwiper) {
    (o.startX = c), (o.startY = f);
    return;
  }
  if (!n.allowTouchMove) {
    s.target.matches(r.focusableElements) || (n.allowClick = !1),
      r.isTouched &&
        (Object.assign(o, {
          startX: c,
          startY: f,
          prevX: n.touches.currentX,
          prevY: n.touches.currentY,
          currentX: c,
          currentY: f,
        }),
        (r.touchStartTime = Ds()));
    return;
  }
  if (i.touchReleaseOnEdges && !i.loop) {
    if (n.isVertical()) {
      if (
        (f < o.startY && n.translate <= n.maxTranslate()) ||
        (f > o.startY && n.translate >= n.minTranslate())
      ) {
        (r.isTouched = !1), (r.isMoved = !1);
        return;
      }
    } else if (
      (c < o.startX && n.translate <= n.maxTranslate()) ||
      (c > o.startX && n.translate >= n.minTranslate())
    )
      return;
  }
  if (
    t.activeElement &&
    s.target === t.activeElement &&
    s.target.matches(r.focusableElements)
  ) {
    (r.isMoved = !0), (n.allowClick = !1);
    return;
  }
  if (
    (r.allowTouchCallbacks && n.emit("touchMove", s),
    s.targetTouches && s.targetTouches.length > 1)
  )
    return;
  (o.currentX = c), (o.currentY = f);
  const h = o.currentX - o.startX,
    v = o.currentY - o.startY;
  if (n.params.threshold && Math.sqrt(h ** 2 + v ** 2) < n.params.threshold)
    return;
  if (typeof r.isScrolling > "u") {
    let E;
    (n.isHorizontal() && o.currentY === o.startY) ||
    (n.isVertical() && o.currentX === o.startX)
      ? (r.isScrolling = !1)
      : h * h + v * v >= 25 &&
        ((E = (Math.atan2(Math.abs(v), Math.abs(h)) * 180) / Math.PI),
        (r.isScrolling = n.isHorizontal()
          ? E > i.touchAngle
          : 90 - E > i.touchAngle));
  }
  if (
    (r.isScrolling && n.emit("touchMoveOpposite", s),
    typeof r.startMoving > "u" &&
      (o.currentX !== o.startX || o.currentY !== o.startY) &&
      (r.startMoving = !0),
    r.isScrolling ||
      (n.zoom &&
        n.params.zoom &&
        n.params.zoom.enabled &&
        r.evCache.length > 1))
  ) {
    r.isTouched = !1;
    return;
  }
  if (!r.startMoving) return;
  (n.allowClick = !1),
    !i.cssMode && s.cancelable && s.preventDefault(),
    i.touchMoveStopPropagation && !i.nested && s.stopPropagation();
  let y = n.isHorizontal() ? h : v,
    w = n.isHorizontal() ? o.currentX - o.previousX : o.currentY - o.previousY;
  i.oneWayMovement &&
    ((y = Math.abs(y) * (a ? 1 : -1)), (w = Math.abs(w) * (a ? 1 : -1))),
    (o.diff = y),
    (y *= i.touchRatio),
    a && ((y = -y), (w = -w));
  const m = n.touchesDirection;
  (n.swipeDirection = y > 0 ? "prev" : "next"),
    (n.touchesDirection = w > 0 ? "prev" : "next");
  const g = n.params.loop && !i.cssMode;
  if (!r.isMoved) {
    if (
      (g && n.loopFix({ direction: n.swipeDirection }),
      (r.startTranslate = n.getTranslate()),
      n.setTransition(0),
      n.animating)
    ) {
      const E = new window.CustomEvent("transitionend", {
        bubbles: !0,
        cancelable: !0,
      });
      n.wrapperEl.dispatchEvent(E);
    }
    (r.allowMomentumBounce = !1),
      i.grabCursor &&
        (n.allowSlideNext === !0 || n.allowSlidePrev === !0) &&
        n.setGrabCursor(!0),
      n.emit("sliderFirstMove", s);
  }
  let x;
  r.isMoved &&
    m !== n.touchesDirection &&
    g &&
    Math.abs(y) >= 1 &&
    (n.loopFix({ direction: n.swipeDirection, setTranslate: !0 }), (x = !0)),
    n.emit("sliderMove", s),
    (r.isMoved = !0),
    (r.currentTranslate = y + r.startTranslate);
  let b = !0,
    C = i.resistanceRatio;
  if (
    (i.touchReleaseOnEdges && (C = 0),
    y > 0
      ? (g &&
          !x &&
          r.currentTranslate >
            (i.centeredSlides
              ? n.minTranslate() - n.size / 2
              : n.minTranslate()) &&
          n.loopFix({
            direction: "prev",
            setTranslate: !0,
            activeSlideIndex: 0,
          }),
        r.currentTranslate > n.minTranslate() &&
          ((b = !1),
          i.resistance &&
            (r.currentTranslate =
              n.minTranslate() -
              1 +
              (-n.minTranslate() + r.startTranslate + y) ** C)))
      : y < 0 &&
        (g &&
          !x &&
          r.currentTranslate <
            (i.centeredSlides
              ? n.maxTranslate() + n.size / 2
              : n.maxTranslate()) &&
          n.loopFix({
            direction: "next",
            setTranslate: !0,
            activeSlideIndex:
              n.slides.length -
              (i.slidesPerView === "auto"
                ? n.slidesPerViewDynamic()
                : Math.ceil(parseFloat(i.slidesPerView, 10))),
          }),
        r.currentTranslate < n.maxTranslate() &&
          ((b = !1),
          i.resistance &&
            (r.currentTranslate =
              n.maxTranslate() +
              1 -
              (n.maxTranslate() - r.startTranslate - y) ** C))),
    b && (s.preventedByNestedSwiper = !0),
    !n.allowSlideNext &&
      n.swipeDirection === "next" &&
      r.currentTranslate < r.startTranslate &&
      (r.currentTranslate = r.startTranslate),
    !n.allowSlidePrev &&
      n.swipeDirection === "prev" &&
      r.currentTranslate > r.startTranslate &&
      (r.currentTranslate = r.startTranslate),
    !n.allowSlidePrev &&
      !n.allowSlideNext &&
      (r.currentTranslate = r.startTranslate),
    i.threshold > 0)
  )
    if (Math.abs(y) > i.threshold || r.allowThresholdMove) {
      if (!r.allowThresholdMove) {
        (r.allowThresholdMove = !0),
          (o.startX = o.currentX),
          (o.startY = o.currentY),
          (r.currentTranslate = r.startTranslate),
          (o.diff = n.isHorizontal()
            ? o.currentX - o.startX
            : o.currentY - o.startY);
        return;
      }
    } else {
      r.currentTranslate = r.startTranslate;
      return;
    }
  !i.followFinger ||
    i.cssMode ||
    (((i.freeMode && i.freeMode.enabled && n.freeMode) ||
      i.watchSlidesProgress) &&
      (n.updateActiveIndex(), n.updateSlidesClasses()),
    n.params.freeMode &&
      i.freeMode.enabled &&
      n.freeMode &&
      n.freeMode.onTouchMove(),
    n.updateProgress(r.currentTranslate),
    n.setTranslate(r.currentTranslate));
}
function RP(e) {
  const t = this,
    n = t.touchEventsData,
    r = n.evCache.findIndex((x) => x.pointerId === e.pointerId);
  if (
    (r >= 0 && n.evCache.splice(r, 1),
    ["pointercancel", "pointerout", "pointerleave"].includes(e.type) &&
      !(
        e.type === "pointercancel" &&
        (t.browser.isSafari || t.browser.isWebView)
      ))
  )
    return;
  const {
    params: i,
    touches: o,
    rtlTranslate: a,
    slidesGrid: l,
    enabled: s,
  } = t;
  if (!s || (!i.simulateTouch && e.pointerType === "mouse")) return;
  let u = e;
  if (
    (u.originalEvent && (u = u.originalEvent),
    n.allowTouchCallbacks && t.emit("touchEnd", u),
    (n.allowTouchCallbacks = !1),
    !n.isTouched)
  ) {
    n.isMoved && i.grabCursor && t.setGrabCursor(!1),
      (n.isMoved = !1),
      (n.startMoving = !1);
    return;
  }
  i.grabCursor &&
    n.isMoved &&
    n.isTouched &&
    (t.allowSlideNext === !0 || t.allowSlidePrev === !0) &&
    t.setGrabCursor(!1);
  const d = Ds(),
    c = d - n.touchStartTime;
  if (t.allowClick) {
    const x = u.path || (u.composedPath && u.composedPath());
    t.updateClickedSlide((x && x[0]) || u.target),
      t.emit("tap click", u),
      c < 300 &&
        d - n.lastClickTime < 300 &&
        t.emit("doubleTap doubleClick", u);
  }
  if (
    ((n.lastClickTime = Ds()),
    mf(() => {
      t.destroyed || (t.allowClick = !0);
    }),
    !n.isTouched ||
      !n.isMoved ||
      !t.swipeDirection ||
      o.diff === 0 ||
      n.currentTranslate === n.startTranslate)
  ) {
    (n.isTouched = !1), (n.isMoved = !1), (n.startMoving = !1);
    return;
  }
  (n.isTouched = !1), (n.isMoved = !1), (n.startMoving = !1);
  let f;
  if (
    (i.followFinger
      ? (f = a ? t.translate : -t.translate)
      : (f = -n.currentTranslate),
    i.cssMode)
  )
    return;
  if (t.params.freeMode && i.freeMode.enabled) {
    t.freeMode.onTouchEnd({ currentPos: f });
    return;
  }
  let h = 0,
    v = t.slidesSizesGrid[0];
  for (
    let x = 0;
    x < l.length;
    x += x < i.slidesPerGroupSkip ? 1 : i.slidesPerGroup
  ) {
    const b = x < i.slidesPerGroupSkip - 1 ? 1 : i.slidesPerGroup;
    typeof l[x + b] < "u"
      ? f >= l[x] && f < l[x + b] && ((h = x), (v = l[x + b] - l[x]))
      : f >= l[x] && ((h = x), (v = l[l.length - 1] - l[l.length - 2]));
  }
  let y = null,
    w = null;
  i.rewind &&
    (t.isBeginning
      ? (w =
          t.params.virtual && t.params.virtual.enabled && t.virtual
            ? t.virtual.slides.length - 1
            : t.slides.length - 1)
      : t.isEnd && (y = 0));
  const m = (f - l[h]) / v,
    g = h < i.slidesPerGroupSkip - 1 ? 1 : i.slidesPerGroup;
  if (c > i.longSwipesMs) {
    if (!i.longSwipes) {
      t.slideTo(t.activeIndex);
      return;
    }
    t.swipeDirection === "next" &&
      (m >= i.longSwipesRatio
        ? t.slideTo(i.rewind && t.isEnd ? y : h + g)
        : t.slideTo(h)),
      t.swipeDirection === "prev" &&
        (m > 1 - i.longSwipesRatio
          ? t.slideTo(h + g)
          : w !== null && m < 0 && Math.abs(m) > i.longSwipesRatio
          ? t.slideTo(w)
          : t.slideTo(h));
  } else {
    if (!i.shortSwipes) {
      t.slideTo(t.activeIndex);
      return;
    }
    t.navigation &&
    (u.target === t.navigation.nextEl || u.target === t.navigation.prevEl)
      ? u.target === t.navigation.nextEl
        ? t.slideTo(h + g)
        : t.slideTo(h)
      : (t.swipeDirection === "next" && t.slideTo(y !== null ? y : h + g),
        t.swipeDirection === "prev" && t.slideTo(w !== null ? w : h));
  }
}
function Rg() {
  const e = this,
    { params: t, el: n } = e;
  if (n && n.offsetWidth === 0) return;
  t.breakpoints && e.setBreakpoint();
  const { allowSlideNext: r, allowSlidePrev: i, snapGrid: o } = e,
    a = e.virtual && e.params.virtual.enabled;
  (e.allowSlideNext = !0),
    (e.allowSlidePrev = !0),
    e.updateSize(),
    e.updateSlides(),
    e.updateSlidesClasses();
  const l = a && t.loop;
  (t.slidesPerView === "auto" || t.slidesPerView > 1) &&
  e.isEnd &&
  !e.isBeginning &&
  !e.params.centeredSlides &&
  !l
    ? e.slideTo(e.slides.length - 1, 0, !1, !0)
    : e.params.loop && !a
    ? e.slideToLoop(e.realIndex, 0, !1, !0)
    : e.slideTo(e.activeIndex, 0, !1, !0),
    e.autoplay &&
      e.autoplay.running &&
      e.autoplay.paused &&
      (clearTimeout(e.autoplay.resizeTimeout),
      (e.autoplay.resizeTimeout = setTimeout(() => {
        e.autoplay &&
          e.autoplay.running &&
          e.autoplay.paused &&
          e.autoplay.resume();
      }, 500))),
    (e.allowSlidePrev = i),
    (e.allowSlideNext = r),
    e.params.watchOverflow && o !== e.snapGrid && e.checkOverflow();
}
function LP(e) {
  const t = this;
  t.enabled &&
    (t.allowClick ||
      (t.params.preventClicks && e.preventDefault(),
      t.params.preventClicksPropagation &&
        t.animating &&
        (e.stopPropagation(), e.stopImmediatePropagation())));
}
function MP() {
  const e = this,
    { wrapperEl: t, rtlTranslate: n, enabled: r } = e;
  if (!r) return;
  (e.previousTranslate = e.translate),
    e.isHorizontal()
      ? (e.translate = -t.scrollLeft)
      : (e.translate = -t.scrollTop),
    e.translate === 0 && (e.translate = 0),
    e.updateActiveIndex(),
    e.updateSlidesClasses();
  let i;
  const o = e.maxTranslate() - e.minTranslate();
  o === 0 ? (i = 0) : (i = (e.translate - e.minTranslate()) / o),
    i !== e.progress && e.updateProgress(n ? -e.translate : e.translate),
    e.emit("setTranslate", e.translate, !1);
}
function _P(e) {
  const t = this;
  Wl(t, e.target),
    !(
      t.params.cssMode ||
      (t.params.slidesPerView !== "auto" && !t.params.autoHeight)
    ) && t.update();
}
let Lg = !1;
function $P() {}
const Zy = (e, t) => {
  const n = ui(),
    { params: r, el: i, wrapperEl: o, device: a } = e,
    l = !!r.nested,
    s = t === "on" ? "addEventListener" : "removeEventListener",
    u = t;
  i[s]("pointerdown", e.onTouchStart, { passive: !1 }),
    n[s]("pointermove", e.onTouchMove, { passive: !1, capture: l }),
    n[s]("pointerup", e.onTouchEnd, { passive: !0 }),
    n[s]("pointercancel", e.onTouchEnd, { passive: !0 }),
    n[s]("pointerout", e.onTouchEnd, { passive: !0 }),
    n[s]("pointerleave", e.onTouchEnd, { passive: !0 }),
    (r.preventClicks || r.preventClicksPropagation) &&
      i[s]("click", e.onClick, !0),
    r.cssMode && o[s]("scroll", e.onScroll),
    r.updateOnWindowResize
      ? e[u](
          a.ios || a.android
            ? "resize orientationchange observerUpdate"
            : "resize observerUpdate",
          Rg,
          !0
        )
      : e[u]("observerUpdate", Rg, !0),
    i[s]("load", e.onLoad, { capture: !0 });
};
function BP() {
  const e = this,
    t = ui(),
    { params: n } = e;
  (e.onTouchStart = jP.bind(e)),
    (e.onTouchMove = NP.bind(e)),
    (e.onTouchEnd = RP.bind(e)),
    n.cssMode && (e.onScroll = MP.bind(e)),
    (e.onClick = LP.bind(e)),
    (e.onLoad = _P.bind(e)),
    Lg || (t.addEventListener("touchstart", $P), (Lg = !0)),
    Zy(e, "on");
}
function zP() {
  Zy(this, "off");
}
const FP = { attachEvents: BP, detachEvents: zP },
  Mg = (e, t) => e.grid && t.grid && t.grid.rows > 1;
function UP() {
  const e = this,
    { realIndex: t, initialized: n, params: r, el: i } = e,
    o = r.breakpoints;
  if (!o || (o && Object.keys(o).length === 0)) return;
  const a = e.getBreakpoint(o, e.params.breakpointsBase, e.el);
  if (!a || e.currentBreakpoint === a) return;
  const s = (a in o ? o[a] : void 0) || e.originalParams,
    u = Mg(e, r),
    d = Mg(e, s),
    c = r.enabled;
  u && !d
    ? (i.classList.remove(
        `${r.containerModifierClass}grid`,
        `${r.containerModifierClass}grid-column`
      ),
      e.emitContainerClasses())
    : !u &&
      d &&
      (i.classList.add(`${r.containerModifierClass}grid`),
      ((s.grid.fill && s.grid.fill === "column") ||
        (!s.grid.fill && r.grid.fill === "column")) &&
        i.classList.add(`${r.containerModifierClass}grid-column`),
      e.emitContainerClasses()),
    ["navigation", "pagination", "scrollbar"].forEach((y) => {
      const w = r[y] && r[y].enabled,
        m = s[y] && s[y].enabled;
      w && !m && e[y].disable(), !w && m && e[y].enable();
    });
  const f = s.direction && s.direction !== r.direction,
    h = r.loop && (s.slidesPerView !== r.slidesPerView || f);
  f && n && e.changeDirection(), Dt(e.params, s);
  const v = e.params.enabled;
  Object.assign(e, {
    allowTouchMove: e.params.allowTouchMove,
    allowSlideNext: e.params.allowSlideNext,
    allowSlidePrev: e.params.allowSlidePrev,
  }),
    c && !v ? e.disable() : !c && v && e.enable(),
    (e.currentBreakpoint = a),
    e.emit("_beforeBreakpoint", s),
    h && n && (e.loopDestroy(), e.loopCreate(t), e.updateSlides()),
    e.emit("breakpoint", s);
}
function HP(e, t = "window", n) {
  if (!e || (t === "container" && !n)) return;
  let r = !1;
  const i = Ut(),
    o = t === "window" ? i.innerHeight : n.clientHeight,
    a = Object.keys(e).map((l) => {
      if (typeof l == "string" && l.indexOf("@") === 0) {
        const s = parseFloat(l.substr(1));
        return { value: o * s, point: l };
      }
      return { value: l, point: l };
    });
  a.sort((l, s) => parseInt(l.value, 10) - parseInt(s.value, 10));
  for (let l = 0; l < a.length; l += 1) {
    const { point: s, value: u } = a[l];
    t === "window"
      ? i.matchMedia(`(min-width: ${u}px)`).matches && (r = s)
      : u <= n.clientWidth && (r = s);
  }
  return r || "max";
}
const GP = { setBreakpoint: UP, getBreakpoint: HP };
function WP(e, t) {
  const n = [];
  return (
    e.forEach((r) => {
      typeof r == "object"
        ? Object.keys(r).forEach((i) => {
            r[i] && n.push(t + i);
          })
        : typeof r == "string" && n.push(t + r);
    }),
    n
  );
}
function VP() {
  const e = this,
    { classNames: t, params: n, rtl: r, el: i, device: o } = e,
    a = WP(
      [
        "initialized",
        n.direction,
        { "free-mode": e.params.freeMode && n.freeMode.enabled },
        { autoheight: n.autoHeight },
        { rtl: r },
        { grid: n.grid && n.grid.rows > 1 },
        {
          "grid-column": n.grid && n.grid.rows > 1 && n.grid.fill === "column",
        },
        { android: o.android },
        { ios: o.ios },
        { "css-mode": n.cssMode },
        { centered: n.cssMode && n.centeredSlides },
        { "watch-progress": n.watchSlidesProgress },
      ],
      n.containerModifierClass
    );
  t.push(...a), i.classList.add(...t), e.emitContainerClasses();
}
function qP() {
  const e = this,
    { el: t, classNames: n } = e;
  t.classList.remove(...n), e.emitContainerClasses();
}
const YP = { addClasses: VP, removeClasses: qP };
function XP() {
  const e = this,
    { isLocked: t, params: n } = e,
    { slidesOffsetBefore: r } = n;
  if (r) {
    const i = e.slides.length - 1,
      o = e.slidesGrid[i] + e.slidesSizesGrid[i] + r * 2;
    e.isLocked = e.size > o;
  } else e.isLocked = e.snapGrid.length === 1;
  n.allowSlideNext === !0 && (e.allowSlideNext = !e.isLocked),
    n.allowSlidePrev === !0 && (e.allowSlidePrev = !e.isLocked),
    t && t !== e.isLocked && (e.isEnd = !1),
    t !== e.isLocked && e.emit(e.isLocked ? "lock" : "unlock");
}
const KP = { checkOverflow: XP },
  _g = {
    init: !0,
    direction: "horizontal",
    oneWayMovement: !1,
    touchEventsTarget: "wrapper",
    initialSlide: 0,
    speed: 300,
    cssMode: !1,
    updateOnWindowResize: !0,
    resizeObserver: !0,
    nested: !1,
    createElements: !1,
    enabled: !0,
    focusableElements: "input, select, option, textarea, button, video, label",
    width: null,
    height: null,
    preventInteractionOnTransition: !1,
    userAgent: null,
    url: null,
    edgeSwipeDetection: !1,
    edgeSwipeThreshold: 20,
    autoHeight: !1,
    setWrapperSize: !1,
    virtualTranslate: !1,
    effect: "slide",
    breakpoints: void 0,
    breakpointsBase: "window",
    spaceBetween: 0,
    slidesPerView: 1,
    slidesPerGroup: 1,
    slidesPerGroupSkip: 0,
    slidesPerGroupAuto: !1,
    centeredSlides: !1,
    centeredSlidesBounds: !1,
    slidesOffsetBefore: 0,
    slidesOffsetAfter: 0,
    normalizeSlideIndex: !0,
    centerInsufficientSlides: !1,
    watchOverflow: !0,
    roundLengths: !1,
    touchRatio: 1,
    touchAngle: 45,
    simulateTouch: !0,
    shortSwipes: !0,
    longSwipes: !0,
    longSwipesRatio: 0.5,
    longSwipesMs: 300,
    followFinger: !0,
    allowTouchMove: !0,
    threshold: 5,
    touchMoveStopPropagation: !1,
    touchStartPreventDefault: !0,
    touchStartForcePreventDefault: !1,
    touchReleaseOnEdges: !1,
    uniqueNavElements: !0,
    resistance: !0,
    resistanceRatio: 0.85,
    watchSlidesProgress: !1,
    grabCursor: !1,
    preventClicks: !0,
    preventClicksPropagation: !0,
    slideToClickedSlide: !1,
    loop: !1,
    loopedSlides: null,
    loopPreventsSliding: !0,
    rewind: !1,
    allowSlidePrev: !0,
    allowSlideNext: !0,
    swipeHandler: null,
    noSwiping: !0,
    noSwipingClass: "swiper-no-swiping",
    noSwipingSelector: null,
    passiveListeners: !0,
    maxBackfaceHiddenSlides: 10,
    containerModifierClass: "swiper-",
    slideClass: "swiper-slide",
    slideActiveClass: "swiper-slide-active",
    slideVisibleClass: "swiper-slide-visible",
    slideNextClass: "swiper-slide-next",
    slidePrevClass: "swiper-slide-prev",
    wrapperClass: "swiper-wrapper",
    lazyPreloaderClass: "swiper-lazy-preloader",
    lazyPreloadPrevNext: 0,
    runCallbacksOnInit: !0,
    _emitClasses: !1,
  };
function QP(e, t) {
  return function (r = {}) {
    const i = Object.keys(r)[0],
      o = r[i];
    if (typeof o != "object" || o === null) {
      Dt(t, r);
      return;
    }
    if (
      (["navigation", "pagination", "scrollbar"].indexOf(i) >= 0 &&
        e[i] === !0 &&
        (e[i] = { auto: !0 }),
      !(i in e && "enabled" in o))
    ) {
      Dt(t, r);
      return;
    }
    e[i] === !0 && (e[i] = { enabled: !0 }),
      typeof e[i] == "object" && !("enabled" in e[i]) && (e[i].enabled = !0),
      e[i] || (e[i] = { enabled: !1 }),
      Dt(t, r);
  };
}
const Bc = {
    eventsEmitter: Yk,
    update: oP,
    translate: dP,
    transition: hP,
    slide: CP,
    loop: PP,
    grabCursor: DP,
    events: FP,
    breakpoints: GP,
    checkOverflow: KP,
    classes: YP,
  },
  zc = {};
let xa = class Rn {
  constructor(...t) {
    let n, r;
    t.length === 1 &&
    t[0].constructor &&
    Object.prototype.toString.call(t[0]).slice(8, -1) === "Object"
      ? (r = t[0])
      : ([n, r] = t),
      r || (r = {}),
      (r = Dt({}, r)),
      n && !r.el && (r.el = n);
    const i = ui();
    if (
      r.el &&
      typeof r.el == "string" &&
      i.querySelectorAll(r.el).length > 1
    ) {
      const s = [];
      return (
        i.querySelectorAll(r.el).forEach((u) => {
          const d = Dt({}, r, { el: u });
          s.push(new Rn(d));
        }),
        s
      );
    }
    const o = this;
    (o.__swiper__ = !0),
      (o.support = Ky()),
      (o.device = Hk({ userAgent: r.userAgent })),
      (o.browser = Wk()),
      (o.eventsListeners = {}),
      (o.eventsAnyListeners = []),
      (o.modules = [...o.__modules__]),
      r.modules && Array.isArray(r.modules) && o.modules.push(...r.modules);
    const a = {};
    o.modules.forEach((s) => {
      s({
        params: r,
        swiper: o,
        extendParams: QP(r, a),
        on: o.on.bind(o),
        once: o.once.bind(o),
        off: o.off.bind(o),
        emit: o.emit.bind(o),
      });
    });
    const l = Dt({}, _g, a);
    return (
      (o.params = Dt({}, l, zc, r)),
      (o.originalParams = Dt({}, o.params)),
      (o.passedParams = Dt({}, r)),
      o.params &&
        o.params.on &&
        Object.keys(o.params.on).forEach((s) => {
          o.on(s, o.params.on[s]);
        }),
      o.params && o.params.onAny && o.onAny(o.params.onAny),
      Object.assign(o, {
        enabled: o.params.enabled,
        el: n,
        classNames: [],
        slides: [],
        slidesGrid: [],
        snapGrid: [],
        slidesSizesGrid: [],
        isHorizontal() {
          return o.params.direction === "horizontal";
        },
        isVertical() {
          return o.params.direction === "vertical";
        },
        activeIndex: 0,
        realIndex: 0,
        isBeginning: !0,
        isEnd: !1,
        translate: 0,
        previousTranslate: 0,
        progress: 0,
        velocity: 0,
        animating: !1,
        cssOverflowAdjustment() {
          return Math.trunc(this.translate / 2 ** 23) * 2 ** 23;
        },
        allowSlideNext: o.params.allowSlideNext,
        allowSlidePrev: o.params.allowSlidePrev,
        touchEventsData: {
          isTouched: void 0,
          isMoved: void 0,
          allowTouchCallbacks: void 0,
          touchStartTime: void 0,
          isScrolling: void 0,
          currentTranslate: void 0,
          startTranslate: void 0,
          allowThresholdMove: void 0,
          focusableElements: o.params.focusableElements,
          lastClickTime: 0,
          clickTimeout: void 0,
          velocities: [],
          allowMomentumBounce: void 0,
          startMoving: void 0,
          evCache: [],
        },
        allowClick: !0,
        allowTouchMove: o.params.allowTouchMove,
        touches: { startX: 0, startY: 0, currentX: 0, currentY: 0, diff: 0 },
        imagesToLoad: [],
        imagesLoaded: 0,
      }),
      o.emit("_swiper"),
      o.params.init && o.init(),
      o
    );
  }
  getSlideIndex(t) {
    const { slidesEl: n, params: r } = this,
      i = kn(n, `.${r.slideClass}, swiper-slide`),
      o = Os(i[0]);
    return Os(t) - o;
  }
  getSlideIndexByData(t) {
    return this.getSlideIndex(
      this.slides.filter(
        (n) => n.getAttribute("data-swiper-slide-index") * 1 === t
      )[0]
    );
  }
  recalcSlides() {
    const t = this,
      { slidesEl: n, params: r } = t;
    t.slides = kn(n, `.${r.slideClass}, swiper-slide`);
  }
  enable() {
    const t = this;
    t.enabled ||
      ((t.enabled = !0),
      t.params.grabCursor && t.setGrabCursor(),
      t.emit("enable"));
  }
  disable() {
    const t = this;
    t.enabled &&
      ((t.enabled = !1),
      t.params.grabCursor && t.unsetGrabCursor(),
      t.emit("disable"));
  }
  setProgress(t, n) {
    const r = this;
    t = Math.min(Math.max(t, 0), 1);
    const i = r.minTranslate(),
      a = (r.maxTranslate() - i) * t + i;
    r.translateTo(a, typeof n > "u" ? 0 : n),
      r.updateActiveIndex(),
      r.updateSlidesClasses();
  }
  emitContainerClasses() {
    const t = this;
    if (!t.params._emitClasses || !t.el) return;
    const n = t.el.className
      .split(" ")
      .filter(
        (r) =>
          r.indexOf("swiper") === 0 ||
          r.indexOf(t.params.containerModifierClass) === 0
      );
    t.emit("_containerClasses", n.join(" "));
  }
  getSlideClasses(t) {
    const n = this;
    return n.destroyed
      ? ""
      : t.className
          .split(" ")
          .filter(
            (r) =>
              r.indexOf("swiper-slide") === 0 ||
              r.indexOf(n.params.slideClass) === 0
          )
          .join(" ");
  }
  emitSlidesClasses() {
    const t = this;
    if (!t.params._emitClasses || !t.el) return;
    const n = [];
    t.slides.forEach((r) => {
      const i = t.getSlideClasses(r);
      n.push({ slideEl: r, classNames: i }), t.emit("_slideClass", r, i);
    }),
      t.emit("_slideClasses", n);
  }
  slidesPerViewDynamic(t = "current", n = !1) {
    const r = this,
      {
        params: i,
        slides: o,
        slidesGrid: a,
        slidesSizesGrid: l,
        size: s,
        activeIndex: u,
      } = r;
    let d = 1;
    if (i.centeredSlides) {
      let c = o[u].swiperSlideSize,
        f;
      for (let h = u + 1; h < o.length; h += 1)
        o[h] &&
          !f &&
          ((c += o[h].swiperSlideSize), (d += 1), c > s && (f = !0));
      for (let h = u - 1; h >= 0; h -= 1)
        o[h] &&
          !f &&
          ((c += o[h].swiperSlideSize), (d += 1), c > s && (f = !0));
    } else if (t === "current")
      for (let c = u + 1; c < o.length; c += 1)
        (n ? a[c] + l[c] - a[u] < s : a[c] - a[u] < s) && (d += 1);
    else for (let c = u - 1; c >= 0; c -= 1) a[u] - a[c] < s && (d += 1);
    return d;
  }
  update() {
    const t = this;
    if (!t || t.destroyed) return;
    const { snapGrid: n, params: r } = t;
    r.breakpoints && t.setBreakpoint(),
      [...t.el.querySelectorAll('[loading="lazy"]')].forEach((a) => {
        a.complete && Wl(t, a);
      }),
      t.updateSize(),
      t.updateSlides(),
      t.updateProgress(),
      t.updateSlidesClasses();
    function i() {
      const a = t.rtlTranslate ? t.translate * -1 : t.translate,
        l = Math.min(Math.max(a, t.maxTranslate()), t.minTranslate());
      t.setTranslate(l), t.updateActiveIndex(), t.updateSlidesClasses();
    }
    let o;
    if (t.params.freeMode && t.params.freeMode.enabled)
      i(), t.params.autoHeight && t.updateAutoHeight();
    else {
      if (
        (t.params.slidesPerView === "auto" || t.params.slidesPerView > 1) &&
        t.isEnd &&
        !t.params.centeredSlides
      ) {
        const a =
          t.virtual && t.params.virtual.enabled ? t.virtual.slides : t.slides;
        o = t.slideTo(a.length - 1, 0, !1, !0);
      } else o = t.slideTo(t.activeIndex, 0, !1, !0);
      o || i();
    }
    r.watchOverflow && n !== t.snapGrid && t.checkOverflow(), t.emit("update");
  }
  changeDirection(t, n = !0) {
    const r = this,
      i = r.params.direction;
    return (
      t || (t = i === "horizontal" ? "vertical" : "horizontal"),
      t === i ||
        (t !== "horizontal" && t !== "vertical") ||
        (r.el.classList.remove(`${r.params.containerModifierClass}${i}`),
        r.el.classList.add(`${r.params.containerModifierClass}${t}`),
        r.emitContainerClasses(),
        (r.params.direction = t),
        r.slides.forEach((o) => {
          t === "vertical" ? (o.style.width = "") : (o.style.height = "");
        }),
        r.emit("changeDirection"),
        n && r.update()),
      r
    );
  }
  changeLanguageDirection(t) {
    const n = this;
    (n.rtl && t === "rtl") ||
      (!n.rtl && t === "ltr") ||
      ((n.rtl = t === "rtl"),
      (n.rtlTranslate = n.params.direction === "horizontal" && n.rtl),
      n.rtl
        ? (n.el.classList.add(`${n.params.containerModifierClass}rtl`),
          (n.el.dir = "rtl"))
        : (n.el.classList.remove(`${n.params.containerModifierClass}rtl`),
          (n.el.dir = "ltr")),
      n.update());
  }
  mount(t) {
    const n = this;
    if (n.mounted) return !0;
    let r = t || n.params.el;
    if ((typeof r == "string" && (r = document.querySelector(r)), !r))
      return !1;
    (r.swiper = n), r.shadowEl && (n.isElement = !0);
    const i = () =>
      `.${(n.params.wrapperClass || "").trim().split(" ").join(".")}`;
    let a = (() =>
      r && r.shadowRoot && r.shadowRoot.querySelector
        ? r.shadowRoot.querySelector(i())
        : kn(r, i())[0])();
    return (
      !a &&
        n.params.createElements &&
        ((a = Yy("div", n.params.wrapperClass)),
        r.append(a),
        kn(r, `.${n.params.slideClass}`).forEach((l) => {
          a.append(l);
        })),
      Object.assign(n, {
        el: r,
        wrapperEl: a,
        slidesEl: n.isElement ? r : a,
        mounted: !0,
        rtl: r.dir.toLowerCase() === "rtl" || rr(r, "direction") === "rtl",
        rtlTranslate:
          n.params.direction === "horizontal" &&
          (r.dir.toLowerCase() === "rtl" || rr(r, "direction") === "rtl"),
        wrongRTL: rr(a, "display") === "-webkit-box",
      }),
      !0
    );
  }
  init(t) {
    const n = this;
    return (
      n.initialized ||
        n.mount(t) === !1 ||
        (n.emit("beforeInit"),
        n.params.breakpoints && n.setBreakpoint(),
        n.addClasses(),
        n.updateSize(),
        n.updateSlides(),
        n.params.watchOverflow && n.checkOverflow(),
        n.params.grabCursor && n.enabled && n.setGrabCursor(),
        n.params.loop && n.virtual && n.params.virtual.enabled
          ? n.slideTo(
              n.params.initialSlide + n.virtual.slidesBefore,
              0,
              n.params.runCallbacksOnInit,
              !1,
              !0
            )
          : n.slideTo(
              n.params.initialSlide,
              0,
              n.params.runCallbacksOnInit,
              !1,
              !0
            ),
        n.params.loop && n.loopCreate(),
        n.attachEvents(),
        [...n.el.querySelectorAll('[loading="lazy"]')].forEach((i) => {
          i.complete
            ? Wl(n, i)
            : i.addEventListener("load", (o) => {
                Wl(n, o.target);
              });
        }),
        gf(n),
        (n.initialized = !0),
        gf(n),
        n.emit("init"),
        n.emit("afterInit")),
      n
    );
  }
  destroy(t = !0, n = !0) {
    const r = this,
      { params: i, el: o, wrapperEl: a, slides: l } = r;
    return (
      typeof r.params > "u" ||
        r.destroyed ||
        (r.emit("beforeDestroy"),
        (r.initialized = !1),
        r.detachEvents(),
        i.loop && r.loopDestroy(),
        n &&
          (r.removeClasses(),
          o.removeAttribute("style"),
          a.removeAttribute("style"),
          l &&
            l.length &&
            l.forEach((s) => {
              s.classList.remove(
                i.slideVisibleClass,
                i.slideActiveClass,
                i.slideNextClass,
                i.slidePrevClass
              ),
                s.removeAttribute("style"),
                s.removeAttribute("data-swiper-slide-index");
            })),
        r.emit("destroy"),
        Object.keys(r.eventsListeners).forEach((s) => {
          r.off(s);
        }),
        t !== !1 && ((r.el.swiper = null), Lk(r)),
        (r.destroyed = !0)),
      null
    );
  }
  static extendDefaults(t) {
    Dt(zc, t);
  }
  static get extendedDefaults() {
    return zc;
  }
  static get defaults() {
    return _g;
  }
  static installModule(t) {
    Rn.prototype.__modules__ || (Rn.prototype.__modules__ = []);
    const n = Rn.prototype.__modules__;
    typeof t == "function" && n.indexOf(t) < 0 && n.push(t);
  }
  static use(t) {
    return Array.isArray(t)
      ? (t.forEach((n) => Rn.installModule(n)), Rn)
      : (Rn.installModule(t), Rn);
  }
};
Object.keys(Bc).forEach((e) => {
  Object.keys(Bc[e]).forEach((t) => {
    xa.prototype[t] = Bc[e][t];
  });
});
xa.use([Vk, qk]);
function Jy(e, t, n, r) {
  return (
    e.params.createElements &&
      Object.keys(r).forEach((i) => {
        if (!n[i] && n.auto === !0) {
          let o = kn(e.el, `.${r[i]}`)[0];
          o || ((o = Yy("div", r[i])), (o.className = r[i]), e.el.append(o)),
            (n[i] = o),
            (t[i] = o);
        }
      }),
    n
  );
}
function Zp({ swiper: e, extendParams: t, on: n, emit: r }) {
  t({
    navigation: {
      nextEl: null,
      prevEl: null,
      hideOnClick: !1,
      disabledClass: "swiper-button-disabled",
      hiddenClass: "swiper-button-hidden",
      lockClass: "swiper-button-lock",
      navigationDisabledClass: "swiper-navigation-disabled",
    },
  }),
    (e.navigation = { nextEl: null, prevEl: null });
  const i = (v) => (Array.isArray(v) || (v = [v].filter((y) => !!y)), v);
  function o(v) {
    let y;
    return v &&
      typeof v == "string" &&
      e.isElement &&
      ((y = e.el.shadowRoot.querySelector(v)), y)
      ? y
      : (v &&
          (typeof v == "string" && (y = [...document.querySelectorAll(v)]),
          e.params.uniqueNavElements &&
            typeof v == "string" &&
            y.length > 1 &&
            e.el.querySelectorAll(v).length === 1 &&
            (y = e.el.querySelector(v))),
        v && !y ? v : y);
  }
  function a(v, y) {
    const w = e.params.navigation;
    (v = i(v)),
      v.forEach((m) => {
        m &&
          (m.classList[y ? "add" : "remove"](...w.disabledClass.split(" ")),
          m.tagName === "BUTTON" && (m.disabled = y),
          e.params.watchOverflow &&
            e.enabled &&
            m.classList[e.isLocked ? "add" : "remove"](w.lockClass));
      });
  }
  function l() {
    const { nextEl: v, prevEl: y } = e.navigation;
    if (e.params.loop) {
      a(y, !1), a(v, !1);
      return;
    }
    a(y, e.isBeginning && !e.params.rewind), a(v, e.isEnd && !e.params.rewind);
  }
  function s(v) {
    v.preventDefault(),
      !(e.isBeginning && !e.params.loop && !e.params.rewind) &&
        (e.slidePrev(), r("navigationPrev"));
  }
  function u(v) {
    v.preventDefault(),
      !(e.isEnd && !e.params.loop && !e.params.rewind) &&
        (e.slideNext(), r("navigationNext"));
  }
  function d() {
    const v = e.params.navigation;
    if (
      ((e.params.navigation = Jy(
        e,
        e.originalParams.navigation,
        e.params.navigation,
        { nextEl: "swiper-button-next", prevEl: "swiper-button-prev" }
      )),
      !(v.nextEl || v.prevEl))
    )
      return;
    let y = o(v.nextEl),
      w = o(v.prevEl);
    Object.assign(e.navigation, { nextEl: y, prevEl: w }),
      (y = i(y)),
      (w = i(w));
    const m = (g, x) => {
      g && g.addEventListener("click", x === "next" ? u : s),
        !e.enabled && g && g.classList.add(...v.lockClass.split(" "));
    };
    y.forEach((g) => m(g, "next")), w.forEach((g) => m(g, "prev"));
  }
  function c() {
    let { nextEl: v, prevEl: y } = e.navigation;
    (v = i(v)), (y = i(y));
    const w = (m, g) => {
      m.removeEventListener("click", g === "next" ? u : s),
        m.classList.remove(...e.params.navigation.disabledClass.split(" "));
    };
    v.forEach((m) => w(m, "next")), y.forEach((m) => w(m, "prev"));
  }
  n("init", () => {
    e.params.navigation.enabled === !1 ? h() : (d(), l());
  }),
    n("toEdge fromEdge lock unlock", () => {
      l();
    }),
    n("destroy", () => {
      c();
    }),
    n("enable disable", () => {
      let { nextEl: v, prevEl: y } = e.navigation;
      (v = i(v)),
        (y = i(y)),
        [...v, ...y]
          .filter((w) => !!w)
          .forEach((w) =>
            w.classList[e.enabled ? "remove" : "add"](
              e.params.navigation.lockClass
            )
          );
    }),
    n("click", (v, y) => {
      let { nextEl: w, prevEl: m } = e.navigation;
      (w = i(w)), (m = i(m));
      const g = y.target;
      if (e.params.navigation.hideOnClick && !m.includes(g) && !w.includes(g)) {
        if (
          e.pagination &&
          e.params.pagination &&
          e.params.pagination.clickable &&
          (e.pagination.el === g || e.pagination.el.contains(g))
        )
          return;
        let x;
        w.length
          ? (x = w[0].classList.contains(e.params.navigation.hiddenClass))
          : m.length &&
            (x = m[0].classList.contains(e.params.navigation.hiddenClass)),
          r(x === !0 ? "navigationShow" : "navigationHide"),
          [...w, ...m]
            .filter((b) => !!b)
            .forEach((b) =>
              b.classList.toggle(e.params.navigation.hiddenClass)
            );
      }
    });
  const f = () => {
      e.el.classList.remove(
        ...e.params.navigation.navigationDisabledClass.split(" ")
      ),
        d(),
        l();
    },
    h = () => {
      e.el.classList.add(
        ...e.params.navigation.navigationDisabledClass.split(" ")
      ),
        c();
    };
  Object.assign(e.navigation, {
    enable: f,
    disable: h,
    update: l,
    init: d,
    destroy: c,
  });
}
function xo(e = "") {
  return `.${e
    .trim()
    .replace(/([\.:!+\/])/g, "\\$1")
    .replace(/ /g, ".")}`;
}
function Jp({ swiper: e, extendParams: t, on: n, emit: r }) {
  const i = "swiper-pagination";
  t({
    pagination: {
      el: null,
      bulletElement: "span",
      clickable: !1,
      hideOnClick: !1,
      renderBullet: null,
      renderProgressbar: null,
      renderFraction: null,
      renderCustom: null,
      progressbarOpposite: !1,
      type: "bullets",
      dynamicBullets: !1,
      dynamicMainBullets: 1,
      formatFractionCurrent: (m) => m,
      formatFractionTotal: (m) => m,
      bulletClass: `${i}-bullet`,
      bulletActiveClass: `${i}-bullet-active`,
      modifierClass: `${i}-`,
      currentClass: `${i}-current`,
      totalClass: `${i}-total`,
      hiddenClass: `${i}-hidden`,
      progressbarFillClass: `${i}-progressbar-fill`,
      progressbarOppositeClass: `${i}-progressbar-opposite`,
      clickableClass: `${i}-clickable`,
      lockClass: `${i}-lock`,
      horizontalClass: `${i}-horizontal`,
      verticalClass: `${i}-vertical`,
      paginationDisabledClass: `${i}-disabled`,
    },
  }),
    (e.pagination = { el: null, bullets: [] });
  let o,
    a = 0;
  const l = (m) => (Array.isArray(m) || (m = [m].filter((g) => !!g)), m);
  function s() {
    return (
      !e.params.pagination.el ||
      !e.pagination.el ||
      (Array.isArray(e.pagination.el) && e.pagination.el.length === 0)
    );
  }
  function u(m, g) {
    const { bulletActiveClass: x } = e.params.pagination;
    m &&
      ((m = m[`${g === "prev" ? "previous" : "next"}ElementSibling`]),
      m &&
        (m.classList.add(`${x}-${g}`),
        (m = m[`${g === "prev" ? "previous" : "next"}ElementSibling`]),
        m && m.classList.add(`${x}-${g}-${g}`)));
  }
  function d(m) {
    const g = m.target.closest(xo(e.params.pagination.bulletClass));
    if (!g) return;
    m.preventDefault();
    const x = Os(g) * e.params.slidesPerGroup;
    if (e.params.loop) {
      if (e.realIndex === x) return;
      const b = e.getSlideIndexByData(x),
        C = e.getSlideIndexByData(e.realIndex);
      b > e.slides.length - e.loopedSlides &&
        e.loopFix({
          direction: b > C ? "next" : "prev",
          activeSlideIndex: b,
          slideTo: !1,
        }),
        e.slideToLoop(x);
    } else e.slideTo(x);
  }
  function c() {
    const m = e.rtl,
      g = e.params.pagination;
    if (s()) return;
    let x = e.pagination.el;
    x = l(x);
    let b, C;
    const E =
        e.virtual && e.params.virtual.enabled
          ? e.virtual.slides.length
          : e.slides.length,
      P = e.params.loop
        ? Math.ceil(E / e.params.slidesPerGroup)
        : e.snapGrid.length;
    if (
      (e.params.loop
        ? ((C = e.previousRealIndex || 0),
          (b =
            e.params.slidesPerGroup > 1
              ? Math.floor(e.realIndex / e.params.slidesPerGroup)
              : e.realIndex))
        : typeof e.snapIndex < "u"
        ? ((b = e.snapIndex), (C = e.previousSnapIndex))
        : ((C = e.previousIndex || 0), (b = e.activeIndex || 0)),
      g.type === "bullets" &&
        e.pagination.bullets &&
        e.pagination.bullets.length > 0)
    ) {
      const T = e.pagination.bullets;
      let I, O, D;
      if (
        (g.dynamicBullets &&
          ((o = hf(T[0], e.isHorizontal() ? "width" : "height", !0)),
          x.forEach((N) => {
            N.style[e.isHorizontal() ? "width" : "height"] = `${
              o * (g.dynamicMainBullets + 4)
            }px`;
          }),
          g.dynamicMainBullets > 1 &&
            C !== void 0 &&
            ((a += b - (C || 0)),
            a > g.dynamicMainBullets - 1
              ? (a = g.dynamicMainBullets - 1)
              : a < 0 && (a = 0)),
          (I = Math.max(b - a, 0)),
          (O = I + (Math.min(T.length, g.dynamicMainBullets) - 1)),
          (D = (O + I) / 2)),
        T.forEach((N) => {
          const A = [
            ...["", "-next", "-next-next", "-prev", "-prev-prev", "-main"].map(
              (R) => `${g.bulletActiveClass}${R}`
            ),
          ]
            .map((R) =>
              typeof R == "string" && R.includes(" ") ? R.split(" ") : R
            )
            .flat();
          N.classList.remove(...A);
        }),
        x.length > 1)
      )
        T.forEach((N) => {
          const A = Os(N);
          A === b && N.classList.add(...g.bulletActiveClass.split(" ")),
            g.dynamicBullets &&
              (A >= I &&
                A <= O &&
                N.classList.add(...`${g.bulletActiveClass}-main`.split(" ")),
              A === I && u(N, "prev"),
              A === O && u(N, "next"));
        });
      else {
        const N = T[b];
        if (
          (N && N.classList.add(...g.bulletActiveClass.split(" ")),
          g.dynamicBullets)
        ) {
          const A = T[I],
            R = T[O];
          for (let V = I; V <= O; V += 1)
            T[V] &&
              T[V].classList.add(...`${g.bulletActiveClass}-main`.split(" "));
          u(A, "prev"), u(R, "next");
        }
      }
      if (g.dynamicBullets) {
        const N = Math.min(T.length, g.dynamicMainBullets + 4),
          A = (o * N - o) / 2 - D * o,
          R = m ? "right" : "left";
        T.forEach((V) => {
          V.style[e.isHorizontal() ? R : "top"] = `${A}px`;
        });
      }
    }
    x.forEach((T, I) => {
      if (
        (g.type === "fraction" &&
          (T.querySelectorAll(xo(g.currentClass)).forEach((O) => {
            O.textContent = g.formatFractionCurrent(b + 1);
          }),
          T.querySelectorAll(xo(g.totalClass)).forEach((O) => {
            O.textContent = g.formatFractionTotal(P);
          })),
        g.type === "progressbar")
      ) {
        let O;
        g.progressbarOpposite
          ? (O = e.isHorizontal() ? "vertical" : "horizontal")
          : (O = e.isHorizontal() ? "horizontal" : "vertical");
        const D = (b + 1) / P;
        let N = 1,
          A = 1;
        O === "horizontal" ? (N = D) : (A = D),
          T.querySelectorAll(xo(g.progressbarFillClass)).forEach((R) => {
            (R.style.transform = `translate3d(0,0,0) scaleX(${N}) scaleY(${A})`),
              (R.style.transitionDuration = `${e.params.speed}ms`);
          });
      }
      g.type === "custom" && g.renderCustom
        ? ((T.innerHTML = g.renderCustom(e, b + 1, P)),
          I === 0 && r("paginationRender", T))
        : (I === 0 && r("paginationRender", T), r("paginationUpdate", T)),
        e.params.watchOverflow &&
          e.enabled &&
          T.classList[e.isLocked ? "add" : "remove"](g.lockClass);
    });
  }
  function f() {
    const m = e.params.pagination;
    if (s()) return;
    const g =
      e.virtual && e.params.virtual.enabled
        ? e.virtual.slides.length
        : e.slides.length;
    let x = e.pagination.el;
    x = l(x);
    let b = "";
    if (m.type === "bullets") {
      let C = e.params.loop
        ? Math.ceil(g / e.params.slidesPerGroup)
        : e.snapGrid.length;
      e.params.freeMode && e.params.freeMode.enabled && C > g && (C = g);
      for (let E = 0; E < C; E += 1)
        m.renderBullet
          ? (b += m.renderBullet.call(e, E, m.bulletClass))
          : (b += `<${m.bulletElement} class="${m.bulletClass}"></${m.bulletElement}>`);
    }
    m.type === "fraction" &&
      (m.renderFraction
        ? (b = m.renderFraction.call(e, m.currentClass, m.totalClass))
        : (b = `<span class="${m.currentClass}"></span> / <span class="${m.totalClass}"></span>`)),
      m.type === "progressbar" &&
        (m.renderProgressbar
          ? (b = m.renderProgressbar.call(e, m.progressbarFillClass))
          : (b = `<span class="${m.progressbarFillClass}"></span>`)),
      (e.pagination.bullets = []),
      x.forEach((C) => {
        m.type !== "custom" && (C.innerHTML = b || ""),
          m.type === "bullets" &&
            e.pagination.bullets.push(...C.querySelectorAll(xo(m.bulletClass)));
      }),
      m.type !== "custom" && r("paginationRender", x[0]);
  }
  function h() {
    e.params.pagination = Jy(
      e,
      e.originalParams.pagination,
      e.params.pagination,
      { el: "swiper-pagination" }
    );
    const m = e.params.pagination;
    if (!m.el) return;
    let g;
    typeof m.el == "string" &&
      e.isElement &&
      (g = e.el.shadowRoot.querySelector(m.el)),
      !g &&
        typeof m.el == "string" &&
        (g = [...document.querySelectorAll(m.el)]),
      g || (g = m.el),
      !(!g || g.length === 0) &&
        (e.params.uniqueNavElements &&
          typeof m.el == "string" &&
          Array.isArray(g) &&
          g.length > 1 &&
          ((g = [...e.el.querySelectorAll(m.el)]),
          g.length > 1 &&
            (g = g.filter((x) => Xy(x, ".swiper")[0] === e.el)[0])),
        Array.isArray(g) && g.length === 1 && (g = g[0]),
        Object.assign(e.pagination, { el: g }),
        (g = l(g)),
        g.forEach((x) => {
          m.type === "bullets" &&
            m.clickable &&
            x.classList.add(m.clickableClass),
            x.classList.add(m.modifierClass + m.type),
            x.classList.add(
              e.isHorizontal() ? m.horizontalClass : m.verticalClass
            ),
            m.type === "bullets" &&
              m.dynamicBullets &&
              (x.classList.add(`${m.modifierClass}${m.type}-dynamic`),
              (a = 0),
              m.dynamicMainBullets < 1 && (m.dynamicMainBullets = 1)),
            m.type === "progressbar" &&
              m.progressbarOpposite &&
              x.classList.add(m.progressbarOppositeClass),
            m.clickable && x.addEventListener("click", d),
            e.enabled || x.classList.add(m.lockClass);
        }));
  }
  function v() {
    const m = e.params.pagination;
    if (s()) return;
    let g = e.pagination.el;
    g &&
      ((g = l(g)),
      g.forEach((x) => {
        x.classList.remove(m.hiddenClass),
          x.classList.remove(m.modifierClass + m.type),
          x.classList.remove(
            e.isHorizontal() ? m.horizontalClass : m.verticalClass
          ),
          m.clickable && x.removeEventListener("click", d);
      })),
      e.pagination.bullets &&
        e.pagination.bullets.forEach((x) =>
          x.classList.remove(...m.bulletActiveClass.split(" "))
        );
  }
  n("changeDirection", () => {
    if (!e.pagination || !e.pagination.el) return;
    const m = e.params.pagination;
    let { el: g } = e.pagination;
    (g = l(g)),
      g.forEach((x) => {
        x.classList.remove(m.horizontalClass, m.verticalClass),
          x.classList.add(
            e.isHorizontal() ? m.horizontalClass : m.verticalClass
          );
      });
  }),
    n("init", () => {
      e.params.pagination.enabled === !1 ? w() : (h(), f(), c());
    }),
    n("activeIndexChange", () => {
      typeof e.snapIndex > "u" && c();
    }),
    n("snapIndexChange", () => {
      c();
    }),
    n("snapGridLengthChange", () => {
      f(), c();
    }),
    n("destroy", () => {
      v();
    }),
    n("enable disable", () => {
      let { el: m } = e.pagination;
      m &&
        ((m = l(m)),
        m.forEach((g) =>
          g.classList[e.enabled ? "remove" : "add"](
            e.params.pagination.lockClass
          )
        ));
    }),
    n("lock unlock", () => {
      c();
    }),
    n("click", (m, g) => {
      const x = g.target;
      let { el: b } = e.pagination;
      if (
        (Array.isArray(b) || (b = [b].filter((C) => !!C)),
        e.params.pagination.el &&
          e.params.pagination.hideOnClick &&
          b &&
          b.length > 0 &&
          !x.classList.contains(e.params.pagination.bulletClass))
      ) {
        if (
          e.navigation &&
          ((e.navigation.nextEl && x === e.navigation.nextEl) ||
            (e.navigation.prevEl && x === e.navigation.prevEl))
        )
          return;
        const C = b[0].classList.contains(e.params.pagination.hiddenClass);
        r(C === !0 ? "paginationShow" : "paginationHide"),
          b.forEach((E) => E.classList.toggle(e.params.pagination.hiddenClass));
      }
    });
  const y = () => {
      e.el.classList.remove(e.params.pagination.paginationDisabledClass);
      let { el: m } = e.pagination;
      m &&
        ((m = l(m)),
        m.forEach((g) =>
          g.classList.remove(e.params.pagination.paginationDisabledClass)
        )),
        h(),
        f(),
        c();
    },
    w = () => {
      e.el.classList.add(e.params.pagination.paginationDisabledClass);
      let { el: m } = e.pagination;
      m &&
        ((m = l(m)),
        m.forEach((g) =>
          g.classList.add(e.params.pagination.paginationDisabledClass)
        )),
        v();
    };
  Object.assign(e.pagination, {
    enable: y,
    disable: w,
    render: f,
    update: c,
    init: h,
    destroy: v,
  });
}
function ei(e) {
  return (
    typeof e == "object" &&
    e !== null &&
    e.constructor &&
    Object.prototype.toString.call(e).slice(8, -1) === "Object"
  );
}
function ir(e, t) {
  const n = ["__proto__", "constructor", "prototype"];
  Object.keys(t)
    .filter((r) => n.indexOf(r) < 0)
    .forEach((r) => {
      typeof e[r] > "u"
        ? (e[r] = t[r])
        : ei(t[r]) && ei(e[r]) && Object.keys(t[r]).length > 0
        ? t[r].__swiper__
          ? (e[r] = t[r])
          : ir(e[r], t[r])
        : (e[r] = t[r]);
    });
}
function ex(e = {}) {
  return (
    e.navigation &&
    typeof e.navigation.nextEl > "u" &&
    typeof e.navigation.prevEl > "u"
  );
}
function tx(e = {}) {
  return e.pagination && typeof e.pagination.el > "u";
}
function nx(e = {}) {
  return e.scrollbar && typeof e.scrollbar.el > "u";
}
function rx(e = "") {
  const t = e
      .split(" ")
      .map((r) => r.trim())
      .filter((r) => !!r),
    n = [];
  return (
    t.forEach((r) => {
      n.indexOf(r) < 0 && n.push(r);
    }),
    n.join(" ")
  );
}
function ZP(e = "") {
  return e
    ? e.includes("swiper-wrapper")
      ? e
      : `swiper-wrapper ${e}`
    : "swiper-wrapper";
}
const ix = [
  "eventsPrefix",
  "injectStyles",
  "injectStylesUrls",
  "modules",
  "init",
  "_direction",
  "oneWayMovement",
  "touchEventsTarget",
  "initialSlide",
  "_speed",
  "cssMode",
  "updateOnWindowResize",
  "resizeObserver",
  "nested",
  "focusableElements",
  "_enabled",
  "_width",
  "_height",
  "preventInteractionOnTransition",
  "userAgent",
  "url",
  "_edgeSwipeDetection",
  "_edgeSwipeThreshold",
  "_freeMode",
  "_autoHeight",
  "setWrapperSize",
  "virtualTranslate",
  "_effect",
  "breakpoints",
  "_spaceBetween",
  "_slidesPerView",
  "maxBackfaceHiddenSlides",
  "_grid",
  "_slidesPerGroup",
  "_slidesPerGroupSkip",
  "_slidesPerGroupAuto",
  "_centeredSlides",
  "_centeredSlidesBounds",
  "_slidesOffsetBefore",
  "_slidesOffsetAfter",
  "normalizeSlideIndex",
  "_centerInsufficientSlides",
  "_watchOverflow",
  "roundLengths",
  "touchRatio",
  "touchAngle",
  "simulateTouch",
  "_shortSwipes",
  "_longSwipes",
  "longSwipesRatio",
  "longSwipesMs",
  "_followFinger",
  "allowTouchMove",
  "_threshold",
  "touchMoveStopPropagation",
  "touchStartPreventDefault",
  "touchStartForcePreventDefault",
  "touchReleaseOnEdges",
  "uniqueNavElements",
  "_resistance",
  "_resistanceRatio",
  "_watchSlidesProgress",
  "_grabCursor",
  "preventClicks",
  "preventClicksPropagation",
  "_slideToClickedSlide",
  "_loop",
  "loopedSlides",
  "loopPreventsSliding",
  "_rewind",
  "_allowSlidePrev",
  "_allowSlideNext",
  "_swipeHandler",
  "_noSwiping",
  "noSwipingClass",
  "noSwipingSelector",
  "passiveListeners",
  "containerModifierClass",
  "slideClass",
  "slideActiveClass",
  "slideVisibleClass",
  "slideNextClass",
  "slidePrevClass",
  "wrapperClass",
  "lazyPreloaderClass",
  "lazyPreloadPrevNext",
  "runCallbacksOnInit",
  "observer",
  "observeParents",
  "observeSlideChildren",
  "a11y",
  "_autoplay",
  "_controller",
  "coverflowEffect",
  "cubeEffect",
  "fadeEffect",
  "flipEffect",
  "creativeEffect",
  "cardsEffect",
  "hashNavigation",
  "history",
  "keyboard",
  "mousewheel",
  "_navigation",
  "_pagination",
  "parallax",
  "_scrollbar",
  "_thumbs",
  "virtual",
  "zoom",
  "control",
];
function JP(e = {}, t = !0) {
  const n = { on: {} },
    r = {},
    i = {};
  ir(n, xa.defaults),
    ir(n, xa.extendedDefaults),
    (n._emitClasses = !0),
    (n.init = !1);
  const o = {},
    a = ix.map((s) => s.replace(/_/, "")),
    l = Object.assign({}, e);
  return (
    Object.keys(l).forEach((s) => {
      typeof e[s] > "u" ||
        (a.indexOf(s) >= 0
          ? ei(e[s])
            ? ((n[s] = {}), (i[s] = {}), ir(n[s], e[s]), ir(i[s], e[s]))
            : ((n[s] = e[s]), (i[s] = e[s]))
          : s.search(/on[A-Z]/) === 0 && typeof e[s] == "function"
          ? t
            ? (r[`${s[2].toLowerCase()}${s.substr(3)}`] = e[s])
            : (n.on[`${s[2].toLowerCase()}${s.substr(3)}`] = e[s])
          : (o[s] = e[s]));
    }),
    ["navigation", "pagination", "scrollbar"].forEach((s) => {
      n[s] === !0 && (n[s] = {}), n[s] === !1 && delete n[s];
    }),
    { params: n, passedParams: i, rest: o, events: r }
  );
}
function e4(
  { el: e, nextEl: t, prevEl: n, paginationEl: r, scrollbarEl: i, swiper: o },
  a
) {
  ex(a) &&
    t &&
    n &&
    ((o.params.navigation.nextEl = t),
    (o.originalParams.navigation.nextEl = t),
    (o.params.navigation.prevEl = n),
    (o.originalParams.navigation.prevEl = n)),
    tx(a) &&
      r &&
      ((o.params.pagination.el = r), (o.originalParams.pagination.el = r)),
    nx(a) &&
      i &&
      ((o.params.scrollbar.el = i), (o.originalParams.scrollbar.el = i)),
    o.init(e);
}
function t4(e, t, n, r, i) {
  const o = [];
  if (!t) return o;
  const a = (s) => {
    o.indexOf(s) < 0 && o.push(s);
  };
  if (n && r) {
    const s = r.map(i),
      u = n.map(i);
    s.join("") !== u.join("") && a("children"),
      r.length !== n.length && a("children");
  }
  return (
    ix
      .filter((s) => s[0] === "_")
      .map((s) => s.replace(/_/, ""))
      .forEach((s) => {
        if (s in e && s in t)
          if (ei(e[s]) && ei(t[s])) {
            const u = Object.keys(e[s]),
              d = Object.keys(t[s]);
            u.length !== d.length
              ? a(s)
              : (u.forEach((c) => {
                  e[s][c] !== t[s][c] && a(s);
                }),
                d.forEach((c) => {
                  e[s][c] !== t[s][c] && a(s);
                }));
          } else e[s] !== t[s] && a(s);
      }),
    o
  );
}
function ox(e) {
  return (
    e.type && e.type.displayName && e.type.displayName.includes("SwiperSlide")
  );
}
function ax(e) {
  const t = [];
  return (
    H.Children.toArray(e).forEach((n) => {
      ox(n)
        ? t.push(n)
        : n.props &&
          n.props.children &&
          ax(n.props.children).forEach((r) => t.push(r));
    }),
    t
  );
}
function n4(e) {
  const t = [],
    n = {
      "container-start": [],
      "container-end": [],
      "wrapper-start": [],
      "wrapper-end": [],
    };
  return (
    H.Children.toArray(e).forEach((r) => {
      if (ox(r)) t.push(r);
      else if (r.props && r.props.slot && n[r.props.slot])
        n[r.props.slot].push(r);
      else if (r.props && r.props.children) {
        const i = ax(r.props.children);
        i.length > 0 ? i.forEach((o) => t.push(o)) : n["container-end"].push(r);
      } else n["container-end"].push(r);
    }),
    { slides: t, slots: n }
  );
}
function r4({
  swiper: e,
  slides: t,
  passedParams: n,
  changedParams: r,
  nextEl: i,
  prevEl: o,
  scrollbarEl: a,
  paginationEl: l,
}) {
  const s = r.filter(
      (T) => T !== "children" && T !== "direction" && T !== "wrapperClass"
    ),
    {
      params: u,
      pagination: d,
      navigation: c,
      scrollbar: f,
      virtual: h,
      thumbs: v,
    } = e;
  let y, w, m, g, x, b, C, E;
  r.includes("thumbs") &&
    n.thumbs &&
    n.thumbs.swiper &&
    u.thumbs &&
    !u.thumbs.swiper &&
    (y = !0),
    r.includes("controller") &&
      n.controller &&
      n.controller.control &&
      u.controller &&
      !u.controller.control &&
      (w = !0),
    r.includes("pagination") &&
      n.pagination &&
      (n.pagination.el || l) &&
      (u.pagination || u.pagination === !1) &&
      d &&
      !d.el &&
      (m = !0),
    r.includes("scrollbar") &&
      n.scrollbar &&
      (n.scrollbar.el || a) &&
      (u.scrollbar || u.scrollbar === !1) &&
      f &&
      !f.el &&
      (g = !0),
    r.includes("navigation") &&
      n.navigation &&
      (n.navigation.prevEl || o) &&
      (n.navigation.nextEl || i) &&
      (u.navigation || u.navigation === !1) &&
      c &&
      !c.prevEl &&
      !c.nextEl &&
      (x = !0);
  const P = (T) => {
    e[T] &&
      (e[T].destroy(),
      T === "navigation"
        ? (e.isElement && (e[T].prevEl.remove(), e[T].nextEl.remove()),
          (u[T].prevEl = void 0),
          (u[T].nextEl = void 0),
          (e[T].prevEl = void 0),
          (e[T].nextEl = void 0))
        : (e.isElement && e[T].el.remove(),
          (u[T].el = void 0),
          (e[T].el = void 0)));
  };
  r.includes("loop") &&
    e.isElement &&
    (u.loop && !n.loop ? (b = !0) : !u.loop && n.loop ? (C = !0) : (E = !0)),
    s.forEach((T) => {
      if (ei(u[T]) && ei(n[T]))
        ir(u[T], n[T]),
          (T === "navigation" || T === "pagination" || T === "scrollbar") &&
            "enabled" in n[T] &&
            !n[T].enabled &&
            P(T);
      else {
        const I = n[T];
        (I === !0 || I === !1) &&
        (T === "navigation" || T === "pagination" || T === "scrollbar")
          ? I === !1 && P(T)
          : (u[T] = n[T]);
      }
    }),
    s.includes("controller") &&
      !w &&
      e.controller &&
      e.controller.control &&
      u.controller &&
      u.controller.control &&
      (e.controller.control = u.controller.control),
    r.includes("children") &&
      t &&
      h &&
      u.virtual.enabled &&
      ((h.slides = t), h.update(!0)),
    r.includes("children") && t && u.loop && (E = !0),
    y && v.init() && v.update(!0),
    w && (e.controller.control = u.controller.control),
    m &&
      (e.isElement &&
        (!l || typeof l == "string") &&
        ((l = document.createElement("div")),
        l.classList.add("swiper-pagination"),
        e.el.shadowEl.appendChild(l)),
      l && (u.pagination.el = l),
      d.init(),
      d.render(),
      d.update()),
    g &&
      (e.isElement &&
        (!a || typeof a == "string") &&
        ((a = document.createElement("div")),
        a.classList.add("swiper-scrollbar"),
        e.el.shadowEl.appendChild(a)),
      a && (u.scrollbar.el = a),
      f.init(),
      f.updateSize(),
      f.setTranslate()),
    x &&
      (e.isElement &&
        ((!i || typeof i == "string") &&
          ((i = document.createElement("div")),
          i.classList.add("swiper-button-next"),
          e.el.shadowEl.appendChild(i)),
        (!o || typeof o == "string") &&
          ((o = document.createElement("div")),
          o.classList.add("swiper-button-prev"),
          e.el.shadowEl.appendChild(o))),
      i && (u.navigation.nextEl = i),
      o && (u.navigation.prevEl = o),
      c.init(),
      c.update()),
    r.includes("allowSlideNext") && (e.allowSlideNext = n.allowSlideNext),
    r.includes("allowSlidePrev") && (e.allowSlidePrev = n.allowSlidePrev),
    r.includes("direction") && e.changeDirection(n.direction, !1),
    (b || E) && e.loopDestroy(),
    (C || E) && e.loopCreate(),
    e.update();
}
function i4(e, t, n) {
  if (!n) return null;
  const r = (d) => {
      let c = d;
      return (
        d < 0 ? (c = t.length + d) : c >= t.length && (c = c - t.length), c
      );
    },
    i = e.isHorizontal()
      ? { [e.rtlTranslate ? "right" : "left"]: `${n.offset}px` }
      : { top: `${n.offset}px` },
    { from: o, to: a } = n,
    l = e.params.loop ? -t.length : 0,
    s = e.params.loop ? t.length * 2 : t.length,
    u = [];
  for (let d = l; d < s; d += 1) d >= o && d <= a && u.push(t[r(d)]);
  return u.map((d, c) =>
    H.cloneElement(d, { swiper: e, style: i, key: `slide-${c}` })
  );
}
const o4 = (e) => {
  !e ||
    e.destroyed ||
    !e.params.virtual ||
    (e.params.virtual && !e.params.virtual.enabled) ||
    (e.updateSlides(),
    e.updateProgress(),
    e.updateSlidesClasses(),
    e.parallax &&
      e.params.parallax &&
      e.params.parallax.enabled &&
      e.parallax.setTranslate());
};
function Wo(e, t) {
  return typeof window > "u" ? S.useEffect(e, t) : S.useLayoutEffect(e, t);
}
const $g = S.createContext(null),
  a4 = S.createContext(null);
function vf() {
  return (
    (vf = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n)
              Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
          }
          return e;
        }),
    vf.apply(this, arguments)
  );
}
const Iu = S.forwardRef(function (e, t) {
  let {
      className: n,
      tag: r = "div",
      wrapperTag: i = "div",
      children: o,
      onSwiper: a,
      ...l
    } = e === void 0 ? {} : e,
    s = !1;
  const [u, d] = S.useState("swiper"),
    [c, f] = S.useState(null),
    [h, v] = S.useState(!1),
    y = S.useRef(!1),
    w = S.useRef(null),
    m = S.useRef(null),
    g = S.useRef(null),
    x = S.useRef(null),
    b = S.useRef(null),
    C = S.useRef(null),
    E = S.useRef(null),
    P = S.useRef(null),
    { params: T, passedParams: I, rest: O, events: D } = JP(l),
    { slides: N, slots: A } = n4(o),
    R = () => {
      v(!h);
    };
  Object.assign(T.on, {
    _containerClasses(M, W) {
      d(W);
    },
  });
  const V = () => {
    Object.assign(T.on, D), (s = !0);
    const M = { ...T };
    if (
      (delete M.wrapperClass,
      (m.current = new xa(M)),
      m.current.virtual && m.current.params.virtual.enabled)
    ) {
      m.current.virtual.slides = N;
      const W = {
        cache: !1,
        slides: N,
        renderExternal: f,
        renderExternalUpdate: !1,
      };
      ir(m.current.params.virtual, W), ir(m.current.originalParams.virtual, W);
    }
  };
  w.current || V(), m.current && m.current.on("_beforeBreakpoint", R);
  const J = () => {
      s ||
        !D ||
        !m.current ||
        Object.keys(D).forEach((M) => {
          m.current.on(M, D[M]);
        });
    },
    re = () => {
      !D ||
        !m.current ||
        Object.keys(D).forEach((M) => {
          m.current.off(M, D[M]);
        });
    };
  S.useEffect(() => () => {
    m.current && m.current.off("_beforeBreakpoint", R);
  }),
    S.useEffect(() => {
      !y.current &&
        m.current &&
        (m.current.emitSlidesClasses(), (y.current = !0));
    }),
    Wo(() => {
      if ((t && (t.current = w.current), !!w.current))
        return (
          m.current.destroyed && V(),
          e4(
            {
              el: w.current,
              nextEl: b.current,
              prevEl: C.current,
              paginationEl: E.current,
              scrollbarEl: P.current,
              swiper: m.current,
            },
            T
          ),
          a && a(m.current),
          () => {
            m.current && !m.current.destroyed && m.current.destroy(!0, !1);
          }
        );
    }, []),
    Wo(() => {
      J();
      const M = t4(I, g.current, N, x.current, (W) => W.key);
      return (
        (g.current = I),
        (x.current = N),
        M.length &&
          m.current &&
          !m.current.destroyed &&
          r4({
            swiper: m.current,
            slides: N,
            passedParams: I,
            changedParams: M,
            nextEl: b.current,
            prevEl: C.current,
            scrollbarEl: P.current,
            paginationEl: E.current,
          }),
        () => {
          re();
        }
      );
    }),
    Wo(() => {
      o4(m.current);
    }, [c]);
  function L() {
    return T.virtual
      ? i4(m.current, N, c)
      : N.map((M, W) =>
          H.cloneElement(M, { swiper: m.current, swiperSlideIndex: W })
        );
  }
  return H.createElement(
    r,
    vf({ ref: w, className: rx(`${u}${n ? ` ${n}` : ""}`) }, O),
    H.createElement(
      a4.Provider,
      { value: m.current },
      A["container-start"],
      H.createElement(
        i,
        { className: ZP(T.wrapperClass) },
        A["wrapper-start"],
        L(),
        A["wrapper-end"]
      ),
      ex(T) &&
        H.createElement(
          H.Fragment,
          null,
          H.createElement("div", { ref: C, className: "swiper-button-prev" }),
          H.createElement("div", { ref: b, className: "swiper-button-next" })
        ),
      nx(T) &&
        H.createElement("div", { ref: P, className: "swiper-scrollbar" }),
      tx(T) &&
        H.createElement("div", { ref: E, className: "swiper-pagination" }),
      A["container-end"]
    )
  );
});
Iu.displayName = "Swiper";
function yf() {
  return (
    (yf = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n)
              Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
          }
          return e;
        }),
    yf.apply(this, arguments)
  );
}
const Au = S.forwardRef(function (e, t) {
  let {
    tag: n = "div",
    children: r,
    className: i = "",
    swiper: o,
    zoom: a,
    lazy: l,
    virtualIndex: s,
    swiperSlideIndex: u,
    ...d
  } = e === void 0 ? {} : e;
  const c = S.useRef(null),
    [f, h] = S.useState("swiper-slide"),
    [v, y] = S.useState(!1);
  function w(b, C, E) {
    C === c.current && h(E);
  }
  Wo(() => {
    if (
      (typeof u < "u" && (c.current.swiperSlideIndex = u),
      t && (t.current = c.current),
      !(!c.current || !o))
    ) {
      if (o.destroyed) {
        f !== "swiper-slide" && h("swiper-slide");
        return;
      }
      return (
        o.on("_slideClass", w),
        () => {
          o && o.off("_slideClass", w);
        }
      );
    }
  }),
    Wo(() => {
      o && c.current && !o.destroyed && h(o.getSlideClasses(c.current));
    }, [o]);
  const m = {
      isActive: f.indexOf("swiper-slide-active") >= 0,
      isVisible: f.indexOf("swiper-slide-visible") >= 0,
      isPrev: f.indexOf("swiper-slide-prev") >= 0,
      isNext: f.indexOf("swiper-slide-next") >= 0,
    },
    g = () => (typeof r == "function" ? r(m) : r),
    x = () => {
      y(!0);
    };
  return H.createElement(
    n,
    yf(
      {
        ref: c,
        className: rx(`${f}${i ? ` ${i}` : ""}`),
        "data-swiper-slide-index": s,
        onLoad: x,
      },
      d
    ),
    a &&
      H.createElement(
        $g.Provider,
        { value: m },
        H.createElement(
          "div",
          {
            className: "swiper-zoom-container",
            "data-swiper-zoom": typeof a == "number" ? a : void 0,
          },
          g(),
          l &&
            !v &&
            H.createElement("div", { className: "swiper-lazy-preloader" })
        )
      ),
    !a &&
      H.createElement(
        $g.Provider,
        { value: m },
        g(),
        l &&
          !v &&
          H.createElement("div", { className: "swiper-lazy-preloader" })
      )
  );
});
Au.displayName = "SwiperSlide";
function xf(e, t) {
  return (
    (xf = Object.setPrototypeOf
      ? Object.setPrototypeOf.bind()
      : function (r, i) {
          return (r.__proto__ = i), r;
        }),
    xf(e, t)
  );
}
function lx(e, t) {
  (e.prototype = Object.create(t.prototype)),
    (e.prototype.constructor = e),
    xf(e, t);
}
var sx = { exports: {} },
  l4 = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED",
  s4 = l4,
  u4 = s4;
function ux() {}
function cx() {}
cx.resetWarningCache = ux;
var c4 = function () {
  function e(r, i, o, a, l, s) {
    if (s !== u4) {
      var u = new Error(
        "Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types"
      );
      throw ((u.name = "Invariant Violation"), u);
    }
  }
  e.isRequired = e;
  function t() {
    return e;
  }
  var n = {
    array: e,
    bigint: e,
    bool: e,
    func: e,
    number: e,
    object: e,
    string: e,
    symbol: e,
    any: e,
    arrayOf: t,
    element: e,
    elementType: e,
    instanceOf: t,
    node: e,
    objectOf: t,
    oneOf: t,
    oneOfType: t,
    shape: t,
    exact: t,
    checkPropTypes: cx,
    resetWarningCache: ux,
  };
  return (n.PropTypes = n), n;
};
sx.exports = c4();
var d4 = sx.exports;
const je = ii(d4);
var dx = H.createContext(null);
function f4(e) {
  e();
}
var fx = f4,
  p4 = function (t) {
    return (fx = t);
  },
  m4 = function () {
    return fx;
  };
function h4() {
  var e = m4(),
    t = null,
    n = null;
  return {
    clear: function () {
      (t = null), (n = null);
    },
    notify: function () {
      e(function () {
        for (var i = t; i; ) i.callback(), (i = i.next);
      });
    },
    get: function () {
      for (var i = [], o = t; o; ) i.push(o), (o = o.next);
      return i;
    },
    subscribe: function (i) {
      var o = !0,
        a = (n = { callback: i, next: null, prev: n });
      return (
        a.prev ? (a.prev.next = a) : (t = a),
        function () {
          !o ||
            t === null ||
            ((o = !1),
            a.next ? (a.next.prev = a.prev) : (n = a.prev),
            a.prev ? (a.prev.next = a.next) : (t = a.next));
        }
      );
    },
  };
}
var Bg = {
  notify: function () {},
  get: function () {
    return [];
  },
};
function px(e, t) {
  var n,
    r = Bg;
  function i(c) {
    return s(), r.subscribe(c);
  }
  function o() {
    r.notify();
  }
  function a() {
    d.onStateChange && d.onStateChange();
  }
  function l() {
    return !!n;
  }
  function s() {
    n || ((n = t ? t.addNestedSub(a) : e.subscribe(a)), (r = h4()));
  }
  function u() {
    n && (n(), (n = void 0), r.clear(), (r = Bg));
  }
  var d = {
    addNestedSub: i,
    notifyNestedSubs: o,
    handleChangeWrapper: a,
    isSubscribed: l,
    trySubscribe: s,
    tryUnsubscribe: u,
    getListeners: function () {
      return r;
    },
  };
  return d;
}
var mx =
  typeof window < "u" &&
  typeof window.document < "u" &&
  typeof window.document.createElement < "u"
    ? S.useLayoutEffect
    : S.useEffect;
function g4(e) {
  var t = e.store,
    n = e.context,
    r = e.children,
    i = S.useMemo(
      function () {
        var l = px(t);
        return { store: t, subscription: l };
      },
      [t]
    ),
    o = S.useMemo(
      function () {
        return t.getState();
      },
      [t]
    );
  mx(
    function () {
      var l = i.subscription;
      return (
        (l.onStateChange = l.notifyNestedSubs),
        l.trySubscribe(),
        o !== t.getState() && l.notifyNestedSubs(),
        function () {
          l.tryUnsubscribe(), (l.onStateChange = null);
        }
      );
    },
    [i, o]
  );
  var a = n || dx;
  return H.createElement(a.Provider, { value: i }, r);
}
var hx = { exports: {} },
  Ce = {};
/** @license React v17.0.2
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Du = 60103,
  Ou = 60106,
  Ma = 60107,
  _a = 60108,
  $a = 60114,
  Ba = 60109,
  za = 60110,
  Fa = 60112,
  Ua = 60113,
  em = 60120,
  Ha = 60115,
  Ga = 60116,
  gx = 60121,
  vx = 60122,
  yx = 60117,
  xx = 60129,
  wx = 60131;
if (typeof Symbol == "function" && Symbol.for) {
  var rt = Symbol.for;
  (Du = rt("react.element")),
    (Ou = rt("react.portal")),
    (Ma = rt("react.fragment")),
    (_a = rt("react.strict_mode")),
    ($a = rt("react.profiler")),
    (Ba = rt("react.provider")),
    (za = rt("react.context")),
    (Fa = rt("react.forward_ref")),
    (Ua = rt("react.suspense")),
    (em = rt("react.suspense_list")),
    (Ha = rt("react.memo")),
    (Ga = rt("react.lazy")),
    (gx = rt("react.block")),
    (vx = rt("react.server.block")),
    (yx = rt("react.fundamental")),
    (xx = rt("react.debug_trace_mode")),
    (wx = rt("react.legacy_hidden"));
}
function xn(e) {
  if (typeof e == "object" && e !== null) {
    var t = e.$$typeof;
    switch (t) {
      case Du:
        switch (((e = e.type), e)) {
          case Ma:
          case $a:
          case _a:
          case Ua:
          case em:
            return e;
          default:
            switch (((e = e && e.$$typeof), e)) {
              case za:
              case Fa:
              case Ga:
              case Ha:
              case Ba:
                return e;
              default:
                return t;
            }
        }
      case Ou:
        return t;
    }
  }
}
var v4 = Ba,
  y4 = Du,
  x4 = Fa,
  w4 = Ma,
  b4 = Ga,
  S4 = Ha,
  C4 = Ou,
  E4 = $a,
  T4 = _a,
  k4 = Ua;
Ce.ContextConsumer = za;
Ce.ContextProvider = v4;
Ce.Element = y4;
Ce.ForwardRef = x4;
Ce.Fragment = w4;
Ce.Lazy = b4;
Ce.Memo = S4;
Ce.Portal = C4;
Ce.Profiler = E4;
Ce.StrictMode = T4;
Ce.Suspense = k4;
Ce.isAsyncMode = function () {
  return !1;
};
Ce.isConcurrentMode = function () {
  return !1;
};
Ce.isContextConsumer = function (e) {
  return xn(e) === za;
};
Ce.isContextProvider = function (e) {
  return xn(e) === Ba;
};
Ce.isElement = function (e) {
  return typeof e == "object" && e !== null && e.$$typeof === Du;
};
Ce.isForwardRef = function (e) {
  return xn(e) === Fa;
};
Ce.isFragment = function (e) {
  return xn(e) === Ma;
};
Ce.isLazy = function (e) {
  return xn(e) === Ga;
};
Ce.isMemo = function (e) {
  return xn(e) === Ha;
};
Ce.isPortal = function (e) {
  return xn(e) === Ou;
};
Ce.isProfiler = function (e) {
  return xn(e) === $a;
};
Ce.isStrictMode = function (e) {
  return xn(e) === _a;
};
Ce.isSuspense = function (e) {
  return xn(e) === Ua;
};
Ce.isValidElementType = function (e) {
  return (
    typeof e == "string" ||
    typeof e == "function" ||
    e === Ma ||
    e === $a ||
    e === xx ||
    e === _a ||
    e === Ua ||
    e === em ||
    e === wx ||
    (typeof e == "object" &&
      e !== null &&
      (e.$$typeof === Ga ||
        e.$$typeof === Ha ||
        e.$$typeof === Ba ||
        e.$$typeof === za ||
        e.$$typeof === Fa ||
        e.$$typeof === yx ||
        e.$$typeof === gx ||
        e[0] === vx))
  );
};
Ce.typeOf = xn;
hx.exports = Ce;
var P4 = hx.exports,
  I4 = [
    "getDisplayName",
    "methodName",
    "renderCountProp",
    "shouldHandleStateChanges",
    "storeKey",
    "withRef",
    "forwardRef",
    "context",
  ],
  A4 = ["reactReduxForwardedRef"],
  D4 = [],
  O4 = [null, null];
function j4(e, t) {
  var n = e[1];
  return [t.payload, n + 1];
}
function zg(e, t, n) {
  mx(function () {
    return e.apply(void 0, t);
  }, n);
}
function N4(e, t, n, r, i, o, a) {
  (e.current = r),
    (t.current = i),
    (n.current = !1),
    o.current && ((o.current = null), a());
}
function R4(e, t, n, r, i, o, a, l, s, u) {
  if (e) {
    var d = !1,
      c = null,
      f = function () {
        if (!d) {
          var y = t.getState(),
            w,
            m;
          try {
            w = r(y, i.current);
          } catch (g) {
            (m = g), (c = g);
          }
          m || (c = null),
            w === o.current
              ? a.current || s()
              : ((o.current = w),
                (l.current = w),
                (a.current = !0),
                u({ type: "STORE_UPDATED", payload: { error: m } }));
        }
      };
    (n.onStateChange = f), n.trySubscribe(), f();
    var h = function () {
      if (((d = !0), n.tryUnsubscribe(), (n.onStateChange = null), c)) throw c;
    };
    return h;
  }
}
var L4 = function () {
  return [null, 0];
};
function M4(e, t) {
  t === void 0 && (t = {});
  var n = t,
    r = n.getDisplayName,
    i =
      r === void 0
        ? function (x) {
            return "ConnectAdvanced(" + x + ")";
          }
        : r,
    o = n.methodName,
    a = o === void 0 ? "connectAdvanced" : o,
    l = n.renderCountProp,
    s = l === void 0 ? void 0 : l,
    u = n.shouldHandleStateChanges,
    d = u === void 0 ? !0 : u,
    c = n.storeKey,
    f = c === void 0 ? "store" : c;
  n.withRef;
  var h = n.forwardRef,
    v = h === void 0 ? !1 : h,
    y = n.context,
    w = y === void 0 ? dx : y,
    m = Cs(n, I4),
    g = w;
  return function (b) {
    var C = b.displayName || b.name || "Component",
      E = i(C),
      P = ee({}, m, {
        getDisplayName: i,
        methodName: a,
        renderCountProp: s,
        shouldHandleStateChanges: d,
        storeKey: f,
        displayName: E,
        wrappedComponentName: C,
        WrappedComponent: b,
      }),
      T = m.pure;
    function I(R) {
      return e(R.dispatch, P);
    }
    var O = T
      ? S.useMemo
      : function (R) {
          return R();
        };
    function D(R) {
      var V = S.useMemo(
          function () {
            var Pt = R.reactReduxForwardedRef,
              Ie = Cs(R, A4);
            return [R.context, Pt, Ie];
          },
          [R]
        ),
        J = V[0],
        re = V[1],
        L = V[2],
        M = S.useMemo(
          function () {
            return J &&
              J.Consumer &&
              P4.isContextConsumer(H.createElement(J.Consumer, null))
              ? J
              : g;
          },
          [J, g]
        ),
        W = S.useContext(M),
        K = !!R.store && !!R.store.getState && !!R.store.dispatch;
      W && W.store;
      var $ = K ? R.store : W.store,
        _ = S.useMemo(
          function () {
            return I($);
          },
          [$]
        ),
        G = S.useMemo(
          function () {
            if (!d) return O4;
            var Pt = px($, K ? null : W.subscription),
              Ie = Pt.notifyNestedSubs.bind(Pt);
            return [Pt, Ie];
          },
          [$, K, W]
        ),
        X = G[0],
        j = G[1],
        ie = S.useMemo(
          function () {
            return K ? W : ee({}, W, { subscription: X });
          },
          [K, W, X]
        ),
        F = S.useReducer(j4, D4, L4),
        ye = F[0],
        oe = ye[0],
        le = F[1];
      if (oe && oe.error) throw oe.error;
      var te = S.useRef(),
        ke = S.useRef(L),
        Ee = S.useRef(),
        se = S.useRef(!1),
        Pe = O(
          function () {
            return Ee.current && L === ke.current
              ? Ee.current
              : _($.getState(), L);
          },
          [$, oe, L]
        );
      zg(N4, [ke, te, se, L, Pe, Ee, j]),
        zg(R4, [d, $, X, _, ke, te, se, Ee, j, le], [$, X, _]);
      var de = S.useMemo(
          function () {
            return H.createElement(b, ee({}, Pe, { ref: re }));
          },
          [re, b, Pe]
        ),
        Fe = S.useMemo(
          function () {
            return d ? H.createElement(M.Provider, { value: ie }, de) : de;
          },
          [M, de, ie]
        );
      return Fe;
    }
    var N = T ? H.memo(D) : D;
    if (((N.WrappedComponent = b), (N.displayName = D.displayName = E), v)) {
      var A = H.forwardRef(function (V, J) {
        return H.createElement(N, ee({}, V, { reactReduxForwardedRef: J }));
      });
      return (A.displayName = E), (A.WrappedComponent = b), nf(A, b);
    }
    return nf(N, b);
  };
}
function Fg(e, t) {
  return e === t ? e !== 0 || t !== 0 || 1 / e === 1 / t : e !== e && t !== t;
}
function Fc(e, t) {
  if (Fg(e, t)) return !0;
  if (typeof e != "object" || e === null || typeof t != "object" || t === null)
    return !1;
  var n = Object.keys(e),
    r = Object.keys(t);
  if (n.length !== r.length) return !1;
  for (var i = 0; i < n.length; i++)
    if (!Object.prototype.hasOwnProperty.call(t, n[i]) || !Fg(e[n[i]], t[n[i]]))
      return !1;
  return !0;
}
function _4(e, t) {
  var n = {},
    r = function (a) {
      var l = e[a];
      typeof l == "function" &&
        (n[a] = function () {
          return t(l.apply(void 0, arguments));
        });
    };
  for (var i in e) r(i);
  return n;
}
function tm(e) {
  return function (n, r) {
    var i = e(n, r);
    function o() {
      return i;
    }
    return (o.dependsOnOwnProps = !1), o;
  };
}
function Ug(e) {
  return e.dependsOnOwnProps !== null && e.dependsOnOwnProps !== void 0
    ? !!e.dependsOnOwnProps
    : e.length !== 1;
}
function bx(e, t) {
  return function (r, i) {
    i.displayName;
    var o = function (l, s) {
      return o.dependsOnOwnProps ? o.mapToProps(l, s) : o.mapToProps(l);
    };
    return (
      (o.dependsOnOwnProps = !0),
      (o.mapToProps = function (l, s) {
        (o.mapToProps = e), (o.dependsOnOwnProps = Ug(e));
        var u = o(l, s);
        return (
          typeof u == "function" &&
            ((o.mapToProps = u), (o.dependsOnOwnProps = Ug(u)), (u = o(l, s))),
          u
        );
      }),
      o
    );
  };
}
function $4(e) {
  return typeof e == "function" ? bx(e) : void 0;
}
function B4(e) {
  return e
    ? void 0
    : tm(function (t) {
        return { dispatch: t };
      });
}
function z4(e) {
  return e && typeof e == "object"
    ? tm(function (t) {
        return _4(e, t);
      })
    : void 0;
}
const F4 = [$4, B4, z4];
function U4(e) {
  return typeof e == "function" ? bx(e) : void 0;
}
function H4(e) {
  return e
    ? void 0
    : tm(function () {
        return {};
      });
}
const G4 = [U4, H4];
function W4(e, t, n) {
  return ee({}, n, e, t);
}
function V4(e) {
  return function (n, r) {
    r.displayName;
    var i = r.pure,
      o = r.areMergedPropsEqual,
      a = !1,
      l;
    return function (u, d, c) {
      var f = e(u, d, c);
      return a ? (!i || !o(f, l)) && (l = f) : ((a = !0), (l = f)), l;
    };
  };
}
function q4(e) {
  return typeof e == "function" ? V4(e) : void 0;
}
function Y4(e) {
  return e
    ? void 0
    : function () {
        return W4;
      };
}
const X4 = [q4, Y4];
var K4 = ["initMapStateToProps", "initMapDispatchToProps", "initMergeProps"];
function Q4(e, t, n, r) {
  return function (o, a) {
    return n(e(o, a), t(r, a), a);
  };
}
function Z4(e, t, n, r, i) {
  var o = i.areStatesEqual,
    a = i.areOwnPropsEqual,
    l = i.areStatePropsEqual,
    s = !1,
    u,
    d,
    c,
    f,
    h;
  function v(x, b) {
    return (
      (u = x),
      (d = b),
      (c = e(u, d)),
      (f = t(r, d)),
      (h = n(c, f, d)),
      (s = !0),
      h
    );
  }
  function y() {
    return (
      (c = e(u, d)), t.dependsOnOwnProps && (f = t(r, d)), (h = n(c, f, d)), h
    );
  }
  function w() {
    return (
      e.dependsOnOwnProps && (c = e(u, d)),
      t.dependsOnOwnProps && (f = t(r, d)),
      (h = n(c, f, d)),
      h
    );
  }
  function m() {
    var x = e(u, d),
      b = !l(x, c);
    return (c = x), b && (h = n(c, f, d)), h;
  }
  function g(x, b) {
    var C = !a(b, d),
      E = !o(x, u, b, d);
    return (u = x), (d = b), C && E ? y() : C ? w() : E ? m() : h;
  }
  return function (b, C) {
    return s ? g(b, C) : v(b, C);
  };
}
function J4(e, t) {
  var n = t.initMapStateToProps,
    r = t.initMapDispatchToProps,
    i = t.initMergeProps,
    o = Cs(t, K4),
    a = n(e, o),
    l = r(e, o),
    s = i(e, o),
    u = o.pure ? Z4 : Q4;
  return u(a, l, s, e, o);
}
var eI = [
  "pure",
  "areStatesEqual",
  "areOwnPropsEqual",
  "areStatePropsEqual",
  "areMergedPropsEqual",
];
function Uc(e, t, n) {
  for (var r = t.length - 1; r >= 0; r--) {
    var i = t[r](e);
    if (i) return i;
  }
  return function (o, a) {
    throw new Error(
      "Invalid value of type " +
        typeof e +
        " for " +
        n +
        " argument when connecting component " +
        a.wrappedComponentName +
        "."
    );
  };
}
function tI(e, t) {
  return e === t;
}
function nI(e) {
  var t = e === void 0 ? {} : e,
    n = t.connectHOC,
    r = n === void 0 ? M4 : n,
    i = t.mapStateToPropsFactories,
    o = i === void 0 ? G4 : i,
    a = t.mapDispatchToPropsFactories,
    l = a === void 0 ? F4 : a,
    s = t.mergePropsFactories,
    u = s === void 0 ? X4 : s,
    d = t.selectorFactory,
    c = d === void 0 ? J4 : d;
  return function (h, v, y, w) {
    w === void 0 && (w = {});
    var m = w,
      g = m.pure,
      x = g === void 0 ? !0 : g,
      b = m.areStatesEqual,
      C = b === void 0 ? tI : b,
      E = m.areOwnPropsEqual,
      P = E === void 0 ? Fc : E,
      T = m.areStatePropsEqual,
      I = T === void 0 ? Fc : T,
      O = m.areMergedPropsEqual,
      D = O === void 0 ? Fc : O,
      N = Cs(m, eI),
      A = Uc(h, o, "mapStateToProps"),
      R = Uc(v, l, "mapDispatchToProps"),
      V = Uc(y, u, "mergeProps");
    return r(
      c,
      ee(
        {
          methodName: "connect",
          getDisplayName: function (re) {
            return "Connect(" + re + ")";
          },
          shouldHandleStateChanges: !!h,
          initMapStateToProps: A,
          initMapDispatchToProps: R,
          initMergeProps: V,
          pure: x,
          areStatesEqual: C,
          areOwnPropsEqual: P,
          areStatePropsEqual: I,
          areMergedPropsEqual: D,
        },
        N
      )
    );
  };
}
const Sx = nI();
p4(ru.unstable_batchedUpdates);
function rI(e, t) {
  if (e.length !== t.length) return !1;
  for (var n = 0; n < e.length; n++) if (e[n] !== t[n]) return !1;
  return !0;
}
function Cx(e, t) {
  var n = S.useState(function () {
      return { inputs: t, result: e() };
    })[0],
    r = S.useRef(!0),
    i = S.useRef(n),
    o = r.current || !!(t && i.current.inputs && rI(t, i.current.inputs)),
    a = o ? i.current : { inputs: t, result: e() };
  return (
    S.useEffect(
      function () {
        (r.current = !1), (i.current = a);
      },
      [a]
    ),
    a.result
  );
}
function iI(e, t) {
  return Cx(function () {
    return e;
  }, t);
}
var me = Cx,
  Z = iI,
  oI = !0,
  Hc = "Invariant failed";
function aI(e, t) {
  if (!e) {
    if (oI) throw new Error(Hc);
    var n = typeof t == "function" ? t() : t,
      r = n ? "".concat(Hc, ": ").concat(n) : Hc;
    throw new Error(r);
  }
}
var fn = function (t) {
    var n = t.top,
      r = t.right,
      i = t.bottom,
      o = t.left,
      a = r - o,
      l = i - n,
      s = {
        top: n,
        right: r,
        bottom: i,
        left: o,
        width: a,
        height: l,
        x: o,
        y: n,
        center: { x: (r + o) / 2, y: (i + n) / 2 },
      };
    return s;
  },
  nm = function (t, n) {
    return {
      top: t.top - n.top,
      left: t.left - n.left,
      bottom: t.bottom + n.bottom,
      right: t.right + n.right,
    };
  },
  Hg = function (t, n) {
    return {
      top: t.top + n.top,
      left: t.left + n.left,
      bottom: t.bottom - n.bottom,
      right: t.right - n.right,
    };
  },
  lI = function (t, n) {
    return {
      top: t.top + n.y,
      left: t.left + n.x,
      bottom: t.bottom + n.y,
      right: t.right + n.x,
    };
  },
  Gc = { top: 0, right: 0, bottom: 0, left: 0 },
  rm = function (t) {
    var n = t.borderBox,
      r = t.margin,
      i = r === void 0 ? Gc : r,
      o = t.border,
      a = o === void 0 ? Gc : o,
      l = t.padding,
      s = l === void 0 ? Gc : l,
      u = fn(nm(n, i)),
      d = fn(Hg(n, a)),
      c = fn(Hg(d, s));
    return {
      marginBox: u,
      borderBox: fn(n),
      paddingBox: d,
      contentBox: c,
      margin: i,
      border: a,
      padding: s,
    };
  },
  Wt = function (t) {
    var n = t.slice(0, -2),
      r = t.slice(-2);
    if (r !== "px") return 0;
    var i = Number(n);
    return isNaN(i) && aI(!1), i;
  },
  sI = function () {
    return { x: window.pageXOffset, y: window.pageYOffset };
  },
  js = function (t, n) {
    var r = t.borderBox,
      i = t.border,
      o = t.margin,
      a = t.padding,
      l = lI(r, n);
    return rm({ borderBox: l, border: i, margin: o, padding: a });
  },
  Ns = function (t, n) {
    return n === void 0 && (n = sI()), js(t, n);
  },
  Ex = function (t, n) {
    var r = {
        top: Wt(n.marginTop),
        right: Wt(n.marginRight),
        bottom: Wt(n.marginBottom),
        left: Wt(n.marginLeft),
      },
      i = {
        top: Wt(n.paddingTop),
        right: Wt(n.paddingRight),
        bottom: Wt(n.paddingBottom),
        left: Wt(n.paddingLeft),
      },
      o = {
        top: Wt(n.borderTopWidth),
        right: Wt(n.borderRightWidth),
        bottom: Wt(n.borderBottomWidth),
        left: Wt(n.borderLeftWidth),
      };
    return rm({ borderBox: t, margin: r, padding: i, border: o });
  },
  Tx = function (t) {
    var n = t.getBoundingClientRect(),
      r = window.getComputedStyle(t);
    return Ex(n, r);
  },
  Gg =
    Number.isNaN ||
    function (t) {
      return typeof t == "number" && t !== t;
    };
function uI(e, t) {
  return !!(e === t || (Gg(e) && Gg(t)));
}
function cI(e, t) {
  if (e.length !== t.length) return !1;
  for (var n = 0; n < e.length; n++) if (!uI(e[n], t[n])) return !1;
  return !0;
}
function et(e, t) {
  t === void 0 && (t = cI);
  var n,
    r = [],
    i,
    o = !1;
  function a() {
    for (var l = [], s = 0; s < arguments.length; s++) l[s] = arguments[s];
    return (
      (o && n === this && t(l, r)) ||
        ((i = e.apply(this, l)), (o = !0), (n = this), (r = l)),
      i
    );
  }
  return a;
}
var dI = function (t) {
  var n = [],
    r = null,
    i = function () {
      for (var a = arguments.length, l = new Array(a), s = 0; s < a; s++)
        l[s] = arguments[s];
      (n = l),
        !r &&
          (r = requestAnimationFrame(function () {
            (r = null), t.apply(void 0, n);
          }));
    };
  return (
    (i.cancel = function () {
      r && (cancelAnimationFrame(r), (r = null));
    }),
    i
  );
};
const wa = dI;
function kx(e, t) {}
kx.bind(null, "warn");
kx.bind(null, "error");
function vr() {}
function fI(e, t) {
  return ee({}, e, {}, t);
}
function Kt(e, t, n) {
  var r = t.map(function (i) {
    var o = fI(n, i.options);
    return (
      e.addEventListener(i.eventName, i.fn, o),
      function () {
        e.removeEventListener(i.eventName, i.fn, o);
      }
    );
  });
  return function () {
    r.forEach(function (o) {
      o();
    });
  };
}
var pI = "Invariant failed";
function Rs(e) {
  this.message = e;
}
Rs.prototype.toString = function () {
  return this.message;
};
function U(e, t) {
  if (!e) throw new Rs(pI);
}
var mI = (function (e) {
    lx(t, e);
    function t() {
      for (var r, i = arguments.length, o = new Array(i), a = 0; a < i; a++)
        o[a] = arguments[a];
      return (
        (r = e.call.apply(e, [this].concat(o)) || this),
        (r.callbacks = null),
        (r.unbind = vr),
        (r.onWindowError = function (l) {
          var s = r.getCallbacks();
          s.isDragging() && s.tryAbort();
          var u = l.error;
          u instanceof Rs && l.preventDefault();
        }),
        (r.getCallbacks = function () {
          if (!r.callbacks)
            throw new Error("Unable to find AppCallbacks in <ErrorBoundary/>");
          return r.callbacks;
        }),
        (r.setCallbacks = function (l) {
          r.callbacks = l;
        }),
        r
      );
    }
    var n = t.prototype;
    return (
      (n.componentDidMount = function () {
        this.unbind = Kt(window, [
          { eventName: "error", fn: this.onWindowError },
        ]);
      }),
      (n.componentDidCatch = function (i) {
        if (i instanceof Rs) {
          this.setState({});
          return;
        }
        throw i;
      }),
      (n.componentWillUnmount = function () {
        this.unbind();
      }),
      (n.render = function () {
        return this.props.children(this.setCallbacks);
      }),
      t
    );
  })(H.Component),
  hI = `
  Press space bar to start a drag.
  When dragging you can use the arrow keys to move the item around and escape to cancel.
  Some screen readers may require you to be in focus mode or to use your pass through key
`,
  Ls = function (t) {
    return t + 1;
  },
  gI = function (t) {
    return (
      `
  You have lifted an item in position ` +
      Ls(t.source.index) +
      `
`
    );
  },
  Px = function (t, n) {
    var r = t.droppableId === n.droppableId,
      i = Ls(t.index),
      o = Ls(n.index);
    return r
      ? `
      You have moved the item from position ` +
          i +
          `
      to position ` +
          o +
          `
    `
      : `
    You have moved the item from position ` +
          i +
          `
    in list ` +
          t.droppableId +
          `
    to list ` +
          n.droppableId +
          `
    in position ` +
          o +
          `
  `;
  },
  Ix = function (t, n, r) {
    var i = n.droppableId === r.droppableId;
    return i
      ? `
      The item ` +
          t +
          `
      has been combined with ` +
          r.draggableId
      : `
      The item ` +
          t +
          `
      in list ` +
          n.droppableId +
          `
      has been combined with ` +
          r.draggableId +
          `
      in list ` +
          r.droppableId +
          `
    `;
  },
  vI = function (t) {
    var n = t.destination;
    if (n) return Px(t.source, n);
    var r = t.combine;
    return r
      ? Ix(t.draggableId, t.source, r)
      : "You are over an area that cannot be dropped on";
  },
  Wg = function (t) {
    return (
      `
  The item has returned to its starting position
  of ` +
      Ls(t.index) +
      `
`
    );
  },
  yI = function (t) {
    if (t.reason === "CANCEL")
      return (
        `
      Movement cancelled.
      ` +
        Wg(t.source) +
        `
    `
      );
    var n = t.destination,
      r = t.combine;
    return n
      ? `
      You have dropped the item.
      ` +
          Px(t.source, n) +
          `
    `
      : r
      ? `
      You have dropped the item.
      ` +
        Ix(t.draggableId, t.source, r) +
        `
    `
      : `
    The item has been dropped while not over a drop area.
    ` +
        Wg(t.source) +
        `
  `;
  },
  Vl = {
    dragHandleUsageInstructions: hI,
    onDragStart: gI,
    onDragUpdate: vI,
    onDragEnd: yI,
  },
  tt = { x: 0, y: 0 },
  at = function (t, n) {
    return { x: t.x + n.x, y: t.y + n.y };
  },
  jt = function (t, n) {
    return { x: t.x - n.x, y: t.y - n.y };
  },
  yr = function (t, n) {
    return t.x === n.x && t.y === n.y;
  },
  lo = function (t) {
    return { x: t.x !== 0 ? -t.x : 0, y: t.y !== 0 ? -t.y : 0 };
  },
  ti = function (t, n, r) {
    var i;
    return (
      r === void 0 && (r = 0),
      (i = {}),
      (i[t] = n),
      (i[t === "x" ? "y" : "x"] = r),
      i
    );
  },
  ba = function (t, n) {
    return Math.sqrt(Math.pow(n.x - t.x, 2) + Math.pow(n.y - t.y, 2));
  },
  Vg = function (t, n) {
    return Math.min.apply(
      Math,
      n.map(function (r) {
        return ba(t, r);
      })
    );
  },
  Ax = function (t) {
    return function (n) {
      return { x: t(n.x), y: t(n.y) };
    };
  },
  xI = function (e, t) {
    var n = fn({
      top: Math.max(t.top, e.top),
      right: Math.min(t.right, e.right),
      bottom: Math.min(t.bottom, e.bottom),
      left: Math.max(t.left, e.left),
    });
    return n.width <= 0 || n.height <= 0 ? null : n;
  },
  Wa = function (t, n) {
    return {
      top: t.top + n.y,
      left: t.left + n.x,
      bottom: t.bottom + n.y,
      right: t.right + n.x,
    };
  },
  qg = function (t) {
    return [
      { x: t.left, y: t.top },
      { x: t.right, y: t.top },
      { x: t.left, y: t.bottom },
      { x: t.right, y: t.bottom },
    ];
  },
  wI = { top: 0, right: 0, bottom: 0, left: 0 },
  bI = function (t, n) {
    return n ? Wa(t, n.scroll.diff.displacement) : t;
  },
  SI = function (t, n, r) {
    if (r && r.increasedBy) {
      var i;
      return ee(
        {},
        t,
        ((i = {}), (i[n.end] = t[n.end] + r.increasedBy[n.line]), i)
      );
    }
    return t;
  },
  CI = function (t, n) {
    return n && n.shouldClipSubject ? xI(n.pageMarginBox, t) : fn(t);
  },
  Qi = function (e) {
    var t = e.page,
      n = e.withPlaceholder,
      r = e.axis,
      i = e.frame,
      o = bI(t.marginBox, i),
      a = SI(o, r, n),
      l = CI(a, i);
    return { page: t, withPlaceholder: n, active: l };
  },
  im = function (e, t) {
    e.frame || U(!1);
    var n = e.frame,
      r = jt(t, n.scroll.initial),
      i = lo(r),
      o = ee({}, n, {
        scroll: {
          initial: n.scroll.initial,
          current: t,
          diff: { value: r, displacement: i },
          max: n.scroll.max,
        },
      }),
      a = Qi({
        page: e.subject.page,
        withPlaceholder: e.subject.withPlaceholder,
        axis: e.axis,
        frame: o,
      }),
      l = ee({}, e, { frame: o, subject: a });
    return l;
  };
function Ms(e) {
  return Object.values
    ? Object.values(e)
    : Object.keys(e).map(function (t) {
        return e[t];
      });
}
function om(e, t) {
  if (e.findIndex) return e.findIndex(t);
  for (var n = 0; n < e.length; n++) if (t(e[n])) return n;
  return -1;
}
function Ar(e, t) {
  if (e.find) return e.find(t);
  var n = om(e, t);
  if (n !== -1) return e[n];
}
function Dx(e) {
  return Array.prototype.slice.call(e);
}
var Ox = et(function (e) {
    return e.reduce(function (t, n) {
      return (t[n.descriptor.id] = n), t;
    }, {});
  }),
  jx = et(function (e) {
    return e.reduce(function (t, n) {
      return (t[n.descriptor.id] = n), t;
    }, {});
  }),
  ju = et(function (e) {
    return Ms(e);
  }),
  EI = et(function (e) {
    return Ms(e);
  }),
  so = et(function (e, t) {
    var n = EI(t)
      .filter(function (r) {
        return e === r.descriptor.droppableId;
      })
      .sort(function (r, i) {
        return r.descriptor.index - i.descriptor.index;
      });
    return n;
  });
function am(e) {
  return e.at && e.at.type === "REORDER" ? e.at.destination : null;
}
function Nu(e) {
  return e.at && e.at.type === "COMBINE" ? e.at.combine : null;
}
var Ru = et(function (e, t) {
    return t.filter(function (n) {
      return n.descriptor.id !== e.descriptor.id;
    });
  }),
  TI = function (e) {
    var t = e.isMovingForward,
      n = e.draggable,
      r = e.destination,
      i = e.insideDestination,
      o = e.previousImpact;
    if (!r.isCombineEnabled) return null;
    var a = am(o);
    if (!a) return null;
    function l(y) {
      var w = {
        type: "COMBINE",
        combine: { draggableId: y, droppableId: r.descriptor.id },
      };
      return ee({}, o, { at: w });
    }
    var s = o.displaced.all,
      u = s.length ? s[0] : null;
    if (t) return u ? l(u) : null;
    var d = Ru(n, i);
    if (!u) {
      if (!d.length) return null;
      var c = d[d.length - 1];
      return l(c.descriptor.id);
    }
    var f = om(d, function (y) {
      return y.descriptor.id === u;
    });
    f === -1 && U(!1);
    var h = f - 1;
    if (h < 0) return null;
    var v = d[h];
    return l(v.descriptor.id);
  },
  uo = function (e, t) {
    return e.descriptor.droppableId === t.descriptor.id;
  },
  Nx = { point: tt, value: 0 },
  Sa = { invisible: {}, visible: {}, all: [] },
  kI = { displaced: Sa, displacedBy: Nx, at: null },
  Zt = function (e, t) {
    return function (n) {
      return e <= n && n <= t;
    };
  },
  Rx = function (e) {
    var t = Zt(e.top, e.bottom),
      n = Zt(e.left, e.right);
    return function (r) {
      var i = t(r.top) && t(r.bottom) && n(r.left) && n(r.right);
      if (i) return !0;
      var o = t(r.top) || t(r.bottom),
        a = n(r.left) || n(r.right),
        l = o && a;
      if (l) return !0;
      var s = r.top < e.top && r.bottom > e.bottom,
        u = r.left < e.left && r.right > e.right,
        d = s && u;
      if (d) return !0;
      var c = (s && a) || (u && o);
      return c;
    };
  },
  PI = function (e) {
    var t = Zt(e.top, e.bottom),
      n = Zt(e.left, e.right);
    return function (r) {
      var i = t(r.top) && t(r.bottom) && n(r.left) && n(r.right);
      return i;
    };
  },
  lm = {
    direction: "vertical",
    line: "y",
    crossAxisLine: "x",
    start: "top",
    end: "bottom",
    size: "height",
    crossAxisStart: "left",
    crossAxisEnd: "right",
    crossAxisSize: "width",
  },
  Lx = {
    direction: "horizontal",
    line: "x",
    crossAxisLine: "y",
    start: "left",
    end: "right",
    size: "width",
    crossAxisStart: "top",
    crossAxisEnd: "bottom",
    crossAxisSize: "height",
  },
  II = function (e) {
    return function (t) {
      var n = Zt(t.top, t.bottom),
        r = Zt(t.left, t.right);
      return function (i) {
        return e === lm ? n(i.top) && n(i.bottom) : r(i.left) && r(i.right);
      };
    };
  },
  AI = function (t, n) {
    var r = n.frame ? n.frame.scroll.diff.displacement : tt;
    return Wa(t, r);
  },
  DI = function (t, n, r) {
    return n.subject.active ? r(n.subject.active)(t) : !1;
  },
  OI = function (t, n, r) {
    return r(n)(t);
  },
  sm = function (t) {
    var n = t.target,
      r = t.destination,
      i = t.viewport,
      o = t.withDroppableDisplacement,
      a = t.isVisibleThroughFrameFn,
      l = o ? AI(n, r) : n;
    return DI(l, r, a) && OI(l, i, a);
  },
  jI = function (t) {
    return sm(ee({}, t, { isVisibleThroughFrameFn: Rx }));
  },
  Mx = function (t) {
    return sm(ee({}, t, { isVisibleThroughFrameFn: PI }));
  },
  NI = function (t) {
    return sm(ee({}, t, { isVisibleThroughFrameFn: II(t.destination.axis) }));
  },
  RI = function (t, n, r) {
    if (typeof r == "boolean") return r;
    if (!n) return !0;
    var i = n.invisible,
      o = n.visible;
    if (i[t]) return !1;
    var a = o[t];
    return a ? a.shouldAnimate : !0;
  };
function LI(e, t) {
  var n = e.page.marginBox,
    r = { top: t.point.y, right: 0, bottom: 0, left: t.point.x };
  return fn(nm(n, r));
}
function Ca(e) {
  var t = e.afterDragging,
    n = e.destination,
    r = e.displacedBy,
    i = e.viewport,
    o = e.forceShouldAnimate,
    a = e.last;
  return t.reduce(
    function (s, u) {
      var d = LI(u, r),
        c = u.descriptor.id;
      s.all.push(c);
      var f = jI({
        target: d,
        destination: n,
        viewport: i,
        withDroppableDisplacement: !0,
      });
      if (!f) return (s.invisible[u.descriptor.id] = !0), s;
      var h = RI(c, a, o),
        v = { draggableId: c, shouldAnimate: h };
      return (s.visible[c] = v), s;
    },
    { all: [], visible: {}, invisible: {} }
  );
}
function MI(e, t) {
  if (!e.length) return 0;
  var n = e[e.length - 1].descriptor.index;
  return t.inHomeList ? n : n + 1;
}
function Yg(e) {
  var t = e.insideDestination,
    n = e.inHomeList,
    r = e.displacedBy,
    i = e.destination,
    o = MI(t, { inHomeList: n });
  return {
    displaced: Sa,
    displacedBy: r,
    at: {
      type: "REORDER",
      destination: { droppableId: i.descriptor.id, index: o },
    },
  };
}
function _s(e) {
  var t = e.draggable,
    n = e.insideDestination,
    r = e.destination,
    i = e.viewport,
    o = e.displacedBy,
    a = e.last,
    l = e.index,
    s = e.forceShouldAnimate,
    u = uo(t, r);
  if (l == null)
    return Yg({
      insideDestination: n,
      inHomeList: u,
      displacedBy: o,
      destination: r,
    });
  var d = Ar(n, function (y) {
    return y.descriptor.index === l;
  });
  if (!d)
    return Yg({
      insideDestination: n,
      inHomeList: u,
      displacedBy: o,
      destination: r,
    });
  var c = Ru(t, n),
    f = n.indexOf(d),
    h = c.slice(f),
    v = Ca({
      afterDragging: h,
      destination: r,
      displacedBy: o,
      last: a,
      viewport: i.frame,
      forceShouldAnimate: s,
    });
  return {
    displaced: v,
    displacedBy: o,
    at: {
      type: "REORDER",
      destination: { droppableId: r.descriptor.id, index: l },
    },
  };
}
function Tr(e, t) {
  return !!t.effected[e];
}
var _I = function (e) {
    var t = e.isMovingForward,
      n = e.destination,
      r = e.draggables,
      i = e.combine,
      o = e.afterCritical;
    if (!n.isCombineEnabled) return null;
    var a = i.draggableId,
      l = r[a],
      s = l.descriptor.index,
      u = Tr(a, o);
    return u ? (t ? s : s - 1) : t ? s + 1 : s;
  },
  $I = function (e) {
    var t = e.isMovingForward,
      n = e.isInHomeList,
      r = e.insideDestination,
      i = e.location;
    if (!r.length) return null;
    var o = i.index,
      a = t ? o + 1 : o - 1,
      l = r[0].descriptor.index,
      s = r[r.length - 1].descriptor.index,
      u = n ? s : s + 1;
    return a < l || a > u ? null : a;
  },
  BI = function (e) {
    var t = e.isMovingForward,
      n = e.isInHomeList,
      r = e.draggable,
      i = e.draggables,
      o = e.destination,
      a = e.insideDestination,
      l = e.previousImpact,
      s = e.viewport,
      u = e.afterCritical,
      d = l.at;
    if ((d || U(!1), d.type === "REORDER")) {
      var c = $I({
        isMovingForward: t,
        isInHomeList: n,
        location: d.destination,
        insideDestination: a,
      });
      return c == null
        ? null
        : _s({
            draggable: r,
            insideDestination: a,
            destination: o,
            viewport: s,
            last: l.displaced,
            displacedBy: l.displacedBy,
            index: c,
          });
    }
    var f = _I({
      isMovingForward: t,
      destination: o,
      displaced: l.displaced,
      draggables: i,
      combine: d.combine,
      afterCritical: u,
    });
    return f == null
      ? null
      : _s({
          draggable: r,
          insideDestination: a,
          destination: o,
          viewport: s,
          last: l.displaced,
          displacedBy: l.displacedBy,
          index: f,
        });
  },
  zI = function (e) {
    var t = e.displaced,
      n = e.afterCritical,
      r = e.combineWith,
      i = e.displacedBy,
      o = !!(t.visible[r] || t.invisible[r]);
    return Tr(r, n) ? (o ? tt : lo(i.point)) : o ? i.point : tt;
  },
  FI = function (e) {
    var t = e.afterCritical,
      n = e.impact,
      r = e.draggables,
      i = Nu(n);
    i || U(!1);
    var o = i.draggableId,
      a = r[o].page.borderBox.center,
      l = zI({
        displaced: n.displaced,
        afterCritical: t,
        combineWith: o,
        displacedBy: n.displacedBy,
      });
    return at(a, l);
  },
  _x = function (t, n) {
    return n.margin[t.start] + n.borderBox[t.size] / 2;
  },
  UI = function (t, n) {
    return n.margin[t.end] + n.borderBox[t.size] / 2;
  },
  um = function (t, n, r) {
    return (
      n[t.crossAxisStart] +
      r.margin[t.crossAxisStart] +
      r.borderBox[t.crossAxisSize] / 2
    );
  },
  Xg = function (t) {
    var n = t.axis,
      r = t.moveRelativeTo,
      i = t.isMoving;
    return ti(n.line, r.marginBox[n.end] + _x(n, i), um(n, r.marginBox, i));
  },
  Kg = function (t) {
    var n = t.axis,
      r = t.moveRelativeTo,
      i = t.isMoving;
    return ti(n.line, r.marginBox[n.start] - UI(n, i), um(n, r.marginBox, i));
  },
  HI = function (t) {
    var n = t.axis,
      r = t.moveInto,
      i = t.isMoving;
    return ti(n.line, r.contentBox[n.start] + _x(n, i), um(n, r.contentBox, i));
  },
  GI = function (e) {
    var t = e.impact,
      n = e.draggable,
      r = e.draggables,
      i = e.droppable,
      o = e.afterCritical,
      a = so(i.descriptor.id, r),
      l = n.page,
      s = i.axis;
    if (!a.length) return HI({ axis: s, moveInto: i.page, isMoving: l });
    var u = t.displaced,
      d = t.displacedBy,
      c = u.all[0];
    if (c) {
      var f = r[c];
      if (Tr(c, o)) return Kg({ axis: s, moveRelativeTo: f.page, isMoving: l });
      var h = js(f.page, d.point);
      return Kg({ axis: s, moveRelativeTo: h, isMoving: l });
    }
    var v = a[a.length - 1];
    if (v.descriptor.id === n.descriptor.id) return l.borderBox.center;
    if (Tr(v.descriptor.id, o)) {
      var y = js(v.page, lo(o.displacedBy.point));
      return Xg({ axis: s, moveRelativeTo: y, isMoving: l });
    }
    return Xg({ axis: s, moveRelativeTo: v.page, isMoving: l });
  },
  wf = function (e, t) {
    var n = e.frame;
    return n ? at(t, n.scroll.diff.displacement) : t;
  },
  WI = function (t) {
    var n = t.impact,
      r = t.draggable,
      i = t.droppable,
      o = t.draggables,
      a = t.afterCritical,
      l = r.page.borderBox.center,
      s = n.at;
    return !i || !s
      ? l
      : s.type === "REORDER"
      ? GI({
          impact: n,
          draggable: r,
          draggables: o,
          droppable: i,
          afterCritical: a,
        })
      : FI({ impact: n, draggables: o, afterCritical: a });
  },
  Lu = function (e) {
    var t = WI(e),
      n = e.droppable,
      r = n ? wf(n, t) : t;
    return r;
  },
  $x = function (e, t) {
    var n = jt(t, e.scroll.initial),
      r = lo(n),
      i = fn({
        top: t.y,
        bottom: t.y + e.frame.height,
        left: t.x,
        right: t.x + e.frame.width,
      }),
      o = {
        frame: i,
        scroll: {
          initial: e.scroll.initial,
          max: e.scroll.max,
          current: t,
          diff: { value: n, displacement: r },
        },
      };
    return o;
  };
function Qg(e, t) {
  return e.map(function (n) {
    return t[n];
  });
}
function VI(e, t) {
  for (var n = 0; n < t.length; n++) {
    var r = t[n].visible[e];
    if (r) return r;
  }
  return null;
}
var qI = function (e) {
    var t = e.impact,
      n = e.viewport,
      r = e.destination,
      i = e.draggables,
      o = e.maxScrollChange,
      a = $x(n, at(n.scroll.current, o)),
      l = r.frame ? im(r, at(r.frame.scroll.current, o)) : r,
      s = t.displaced,
      u = Ca({
        afterDragging: Qg(s.all, i),
        destination: r,
        displacedBy: t.displacedBy,
        viewport: a.frame,
        last: s,
        forceShouldAnimate: !1,
      }),
      d = Ca({
        afterDragging: Qg(s.all, i),
        destination: l,
        displacedBy: t.displacedBy,
        viewport: n.frame,
        last: s,
        forceShouldAnimate: !1,
      }),
      c = {},
      f = {},
      h = [s, u, d];
    s.all.forEach(function (y) {
      var w = VI(y, h);
      if (w) {
        f[y] = w;
        return;
      }
      c[y] = !0;
    });
    var v = ee({}, t, { displaced: { all: s.all, invisible: c, visible: f } });
    return v;
  },
  YI = function (e, t) {
    return at(e.scroll.diff.displacement, t);
  },
  cm = function (e) {
    var t = e.pageBorderBoxCenter,
      n = e.draggable,
      r = e.viewport,
      i = YI(r, t),
      o = jt(i, n.page.borderBox.center);
    return at(n.client.borderBox.center, o);
  },
  Bx = function (e) {
    var t = e.draggable,
      n = e.destination,
      r = e.newPageBorderBoxCenter,
      i = e.viewport,
      o = e.withDroppableDisplacement,
      a = e.onlyOnMainAxis,
      l = a === void 0 ? !1 : a,
      s = jt(r, t.page.borderBox.center),
      u = Wa(t.page.borderBox, s),
      d = {
        target: u,
        destination: n,
        withDroppableDisplacement: o,
        viewport: i,
      };
    return l ? NI(d) : Mx(d);
  },
  XI = function (e) {
    var t = e.isMovingForward,
      n = e.draggable,
      r = e.destination,
      i = e.draggables,
      o = e.previousImpact,
      a = e.viewport,
      l = e.previousPageBorderBoxCenter,
      s = e.previousClientSelection,
      u = e.afterCritical;
    if (!r.isEnabled) return null;
    var d = so(r.descriptor.id, i),
      c = uo(n, r),
      f =
        TI({
          isMovingForward: t,
          draggable: n,
          destination: r,
          insideDestination: d,
          previousImpact: o,
        }) ||
        BI({
          isMovingForward: t,
          isInHomeList: c,
          draggable: n,
          draggables: i,
          destination: r,
          insideDestination: d,
          previousImpact: o,
          viewport: a,
          afterCritical: u,
        });
    if (!f) return null;
    var h = Lu({
        impact: f,
        draggable: n,
        droppable: r,
        draggables: i,
        afterCritical: u,
      }),
      v = Bx({
        draggable: n,
        destination: r,
        newPageBorderBoxCenter: h,
        viewport: a.frame,
        withDroppableDisplacement: !1,
        onlyOnMainAxis: !0,
      });
    if (v) {
      var y = cm({ pageBorderBoxCenter: h, draggable: n, viewport: a });
      return { clientSelection: y, impact: f, scrollJumpRequest: null };
    }
    var w = jt(h, l),
      m = qI({
        impact: f,
        viewport: a,
        destination: r,
        draggables: i,
        maxScrollChange: w,
      });
    return { clientSelection: s, impact: m, scrollJumpRequest: w };
  },
  mt = function (t) {
    var n = t.subject.active;
    return n || U(!1), n;
  },
  KI = function (e) {
    var t = e.isMovingForward,
      n = e.pageBorderBoxCenter,
      r = e.source,
      i = e.droppables,
      o = e.viewport,
      a = r.subject.active;
    if (!a) return null;
    var l = r.axis,
      s = Zt(a[l.start], a[l.end]),
      u = ju(i)
        .filter(function (c) {
          return c !== r;
        })
        .filter(function (c) {
          return c.isEnabled;
        })
        .filter(function (c) {
          return !!c.subject.active;
        })
        .filter(function (c) {
          return Rx(o.frame)(mt(c));
        })
        .filter(function (c) {
          var f = mt(c);
          return t
            ? a[l.crossAxisEnd] < f[l.crossAxisEnd]
            : f[l.crossAxisStart] < a[l.crossAxisStart];
        })
        .filter(function (c) {
          var f = mt(c),
            h = Zt(f[l.start], f[l.end]);
          return s(f[l.start]) || s(f[l.end]) || h(a[l.start]) || h(a[l.end]);
        })
        .sort(function (c, f) {
          var h = mt(c)[l.crossAxisStart],
            v = mt(f)[l.crossAxisStart];
          return t ? h - v : v - h;
        })
        .filter(function (c, f, h) {
          return mt(c)[l.crossAxisStart] === mt(h[0])[l.crossAxisStart];
        });
    if (!u.length) return null;
    if (u.length === 1) return u[0];
    var d = u.filter(function (c) {
      var f = Zt(mt(c)[l.start], mt(c)[l.end]);
      return f(n[l.line]);
    });
    return d.length === 1
      ? d[0]
      : d.length > 1
      ? d.sort(function (c, f) {
          return mt(c)[l.start] - mt(f)[l.start];
        })[0]
      : u.sort(function (c, f) {
          var h = Vg(n, qg(mt(c))),
            v = Vg(n, qg(mt(f)));
          return h !== v ? h - v : mt(c)[l.start] - mt(f)[l.start];
        })[0];
  },
  Zg = function (t, n) {
    var r = t.page.borderBox.center;
    return Tr(t.descriptor.id, n) ? jt(r, n.displacedBy.point) : r;
  },
  QI = function (t, n) {
    var r = t.page.borderBox;
    return Tr(t.descriptor.id, n) ? Wa(r, lo(n.displacedBy.point)) : r;
  },
  ZI = function (e) {
    var t = e.pageBorderBoxCenter,
      n = e.viewport,
      r = e.destination,
      i = e.insideDestination,
      o = e.afterCritical,
      a = i
        .filter(function (l) {
          return Mx({
            target: QI(l, o),
            destination: r,
            viewport: n.frame,
            withDroppableDisplacement: !0,
          });
        })
        .sort(function (l, s) {
          var u = ba(t, wf(r, Zg(l, o))),
            d = ba(t, wf(r, Zg(s, o)));
          return u < d
            ? -1
            : d < u
            ? 1
            : l.descriptor.index - s.descriptor.index;
        });
    return a[0] || null;
  },
  Va = et(function (t, n) {
    var r = n[t.line];
    return { value: r, point: ti(t.line, r) };
  }),
  JI = function (t, n, r) {
    var i = t.axis;
    if (t.descriptor.mode === "virtual") return ti(i.line, n[i.line]);
    var o = t.subject.page.contentBox[i.size],
      a = so(t.descriptor.id, r),
      l = a.reduce(function (d, c) {
        return d + c.client.marginBox[i.size];
      }, 0),
      s = l + n[i.line],
      u = s - o;
    return u <= 0 ? null : ti(i.line, u);
  },
  zx = function (t, n) {
    return ee({}, t, { scroll: ee({}, t.scroll, { max: n }) });
  },
  Fx = function (t, n, r) {
    var i = t.frame;
    uo(n, t) && U(!1), t.subject.withPlaceholder && U(!1);
    var o = Va(t.axis, n.displaceBy).point,
      a = JI(t, o, r),
      l = {
        placeholderSize: o,
        increasedBy: a,
        oldFrameMaxScroll: t.frame ? t.frame.scroll.max : null,
      };
    if (!i) {
      var s = Qi({
        page: t.subject.page,
        withPlaceholder: l,
        axis: t.axis,
        frame: t.frame,
      });
      return ee({}, t, { subject: s });
    }
    var u = a ? at(i.scroll.max, a) : i.scroll.max,
      d = zx(i, u),
      c = Qi({
        page: t.subject.page,
        withPlaceholder: l,
        axis: t.axis,
        frame: d,
      });
    return ee({}, t, { subject: c, frame: d });
  },
  eA = function (t) {
    var n = t.subject.withPlaceholder;
    n || U(!1);
    var r = t.frame;
    if (!r) {
      var i = Qi({
        page: t.subject.page,
        axis: t.axis,
        frame: null,
        withPlaceholder: null,
      });
      return ee({}, t, { subject: i });
    }
    var o = n.oldFrameMaxScroll;
    o || U(!1);
    var a = zx(r, o),
      l = Qi({
        page: t.subject.page,
        axis: t.axis,
        frame: a,
        withPlaceholder: null,
      });
    return ee({}, t, { subject: l, frame: a });
  },
  tA = function (e) {
    var t = e.previousPageBorderBoxCenter,
      n = e.moveRelativeTo,
      r = e.insideDestination,
      i = e.draggable,
      o = e.draggables,
      a = e.destination,
      l = e.viewport,
      s = e.afterCritical;
    if (!n) {
      if (r.length) return null;
      var u = {
          displaced: Sa,
          displacedBy: Nx,
          at: {
            type: "REORDER",
            destination: { droppableId: a.descriptor.id, index: 0 },
          },
        },
        d = Lu({
          impact: u,
          draggable: i,
          droppable: a,
          draggables: o,
          afterCritical: s,
        }),
        c = uo(i, a) ? a : Fx(a, i, o),
        f = Bx({
          draggable: i,
          destination: c,
          newPageBorderBoxCenter: d,
          viewport: l.frame,
          withDroppableDisplacement: !1,
          onlyOnMainAxis: !0,
        });
      return f ? u : null;
    }
    var h = t[a.axis.line] <= n.page.borderBox.center[a.axis.line],
      v = (function () {
        var w = n.descriptor.index;
        return n.descriptor.id === i.descriptor.id || h ? w : w + 1;
      })(),
      y = Va(a.axis, i.displaceBy);
    return _s({
      draggable: i,
      insideDestination: r,
      destination: a,
      viewport: l,
      displacedBy: y,
      last: Sa,
      index: v,
    });
  },
  nA = function (e) {
    var t = e.isMovingForward,
      n = e.previousPageBorderBoxCenter,
      r = e.draggable,
      i = e.isOver,
      o = e.draggables,
      a = e.droppables,
      l = e.viewport,
      s = e.afterCritical,
      u = KI({
        isMovingForward: t,
        pageBorderBoxCenter: n,
        source: i,
        droppables: a,
        viewport: l,
      });
    if (!u) return null;
    var d = so(u.descriptor.id, o),
      c = ZI({
        pageBorderBoxCenter: n,
        viewport: l,
        destination: u,
        insideDestination: d,
        afterCritical: s,
      }),
      f = tA({
        previousPageBorderBoxCenter: n,
        destination: u,
        draggable: r,
        draggables: o,
        moveRelativeTo: c,
        insideDestination: d,
        viewport: l,
        afterCritical: s,
      });
    if (!f) return null;
    var h = Lu({
        impact: f,
        draggable: r,
        droppable: u,
        draggables: o,
        afterCritical: s,
      }),
      v = cm({ pageBorderBoxCenter: h, draggable: r, viewport: l });
    return { clientSelection: v, impact: f, scrollJumpRequest: null };
  },
  Rt = function (e) {
    var t = e.at;
    return t
      ? t.type === "REORDER"
        ? t.destination.droppableId
        : t.combine.droppableId
      : null;
  },
  rA = function (t, n) {
    var r = Rt(t);
    return r ? n[r] : null;
  },
  iA = function (e) {
    var t = e.state,
      n = e.type,
      r = rA(t.impact, t.dimensions.droppables),
      i = !!r,
      o = t.dimensions.droppables[t.critical.droppable.id],
      a = r || o,
      l = a.axis.direction,
      s =
        (l === "vertical" && (n === "MOVE_UP" || n === "MOVE_DOWN")) ||
        (l === "horizontal" && (n === "MOVE_LEFT" || n === "MOVE_RIGHT"));
    if (s && !i) return null;
    var u = n === "MOVE_DOWN" || n === "MOVE_RIGHT",
      d = t.dimensions.draggables[t.critical.draggable.id],
      c = t.current.page.borderBoxCenter,
      f = t.dimensions,
      h = f.draggables,
      v = f.droppables;
    return s
      ? XI({
          isMovingForward: u,
          previousPageBorderBoxCenter: c,
          draggable: d,
          destination: a,
          draggables: h,
          viewport: t.viewport,
          previousClientSelection: t.current.client.selection,
          previousImpact: t.impact,
          afterCritical: t.afterCritical,
        })
      : nA({
          isMovingForward: u,
          previousPageBorderBoxCenter: c,
          draggable: d,
          isOver: a,
          draggables: h,
          droppables: v,
          viewport: t.viewport,
          afterCritical: t.afterCritical,
        });
  };
function Br(e) {
  return e.phase === "DRAGGING" || e.phase === "COLLECTING";
}
function Ux(e) {
  var t = Zt(e.top, e.bottom),
    n = Zt(e.left, e.right);
  return function (i) {
    return t(i.y) && n(i.x);
  };
}
function oA(e, t) {
  return (
    e.left < t.right && e.right > t.left && e.top < t.bottom && e.bottom > t.top
  );
}
function aA(e) {
  var t = e.pageBorderBox,
    n = e.draggable,
    r = e.candidates,
    i = n.page.borderBox.center,
    o = r
      .map(function (a) {
        var l = a.axis,
          s = ti(
            a.axis.line,
            t.center[l.line],
            a.page.borderBox.center[l.crossAxisLine]
          );
        return { id: a.descriptor.id, distance: ba(i, s) };
      })
      .sort(function (a, l) {
        return l.distance - a.distance;
      });
  return o[0] ? o[0].id : null;
}
function lA(e) {
  var t = e.pageBorderBox,
    n = e.draggable,
    r = e.droppables,
    i = ju(r).filter(function (o) {
      if (!o.isEnabled) return !1;
      var a = o.subject.active;
      if (!a || !oA(t, a)) return !1;
      if (Ux(a)(t.center)) return !0;
      var l = o.axis,
        s = a.center[l.crossAxisLine],
        u = t[l.crossAxisStart],
        d = t[l.crossAxisEnd],
        c = Zt(a[l.crossAxisStart], a[l.crossAxisEnd]),
        f = c(u),
        h = c(d);
      return !f && !h ? !0 : f ? u < s : d > s;
    });
  return i.length
    ? i.length === 1
      ? i[0].descriptor.id
      : aA({ pageBorderBox: t, draggable: n, candidates: i })
    : null;
}
var Hx = function (t, n) {
    return fn(Wa(t, n));
  },
  sA = function (e, t) {
    var n = e.frame;
    return n ? Hx(t, n.scroll.diff.value) : t;
  };
function Gx(e) {
  var t = e.displaced,
    n = e.id;
  return !!(t.visible[n] || t.invisible[n]);
}
function uA(e) {
  var t = e.draggable,
    n = e.closest,
    r = e.inHomeList;
  return n
    ? r && n.descriptor.index > t.descriptor.index
      ? n.descriptor.index - 1
      : n.descriptor.index
    : null;
}
var cA = function (e) {
    var t = e.pageBorderBoxWithDroppableScroll,
      n = e.draggable,
      r = e.destination,
      i = e.insideDestination,
      o = e.last,
      a = e.viewport,
      l = e.afterCritical,
      s = r.axis,
      u = Va(r.axis, n.displaceBy),
      d = u.value,
      c = t[s.start],
      f = t[s.end],
      h = Ru(n, i),
      v = Ar(h, function (w) {
        var m = w.descriptor.id,
          g = w.page.borderBox.center[s.line],
          x = Tr(m, l),
          b = Gx({ displaced: o, id: m });
        return x ? (b ? f <= g : c < g - d) : b ? f <= g + d : c < g;
      }),
      y = uA({ draggable: n, closest: v, inHomeList: uo(n, r) });
    return _s({
      draggable: n,
      insideDestination: i,
      destination: r,
      viewport: a,
      last: o,
      displacedBy: u,
      index: y,
    });
  },
  dA = 4,
  fA = function (e) {
    var t = e.draggable,
      n = e.pageBorderBoxWithDroppableScroll,
      r = e.previousImpact,
      i = e.destination,
      o = e.insideDestination,
      a = e.afterCritical;
    if (!i.isCombineEnabled) return null;
    var l = i.axis,
      s = Va(i.axis, t.displaceBy),
      u = s.value,
      d = n[l.start],
      c = n[l.end],
      f = Ru(t, o),
      h = Ar(f, function (y) {
        var w = y.descriptor.id,
          m = y.page.borderBox,
          g = m[l.size],
          x = g / dA,
          b = Tr(w, a),
          C = Gx({ displaced: r.displaced, id: w });
        return b
          ? C
            ? c > m[l.start] + x && c < m[l.end] - x
            : d > m[l.start] - u + x && d < m[l.end] - u - x
          : C
          ? c > m[l.start] + u + x && c < m[l.end] + u - x
          : d > m[l.start] + x && d < m[l.end] - x;
      });
    if (!h) return null;
    var v = {
      displacedBy: s,
      displaced: r.displaced,
      at: {
        type: "COMBINE",
        combine: { draggableId: h.descriptor.id, droppableId: i.descriptor.id },
      },
    };
    return v;
  },
  Wx = function (e) {
    var t = e.pageOffset,
      n = e.draggable,
      r = e.draggables,
      i = e.droppables,
      o = e.previousImpact,
      a = e.viewport,
      l = e.afterCritical,
      s = Hx(n.page.borderBox, t),
      u = lA({ pageBorderBox: s, draggable: n, droppables: i });
    if (!u) return kI;
    var d = i[u],
      c = so(d.descriptor.id, r),
      f = sA(d, s);
    return (
      fA({
        pageBorderBoxWithDroppableScroll: f,
        draggable: n,
        previousImpact: o,
        destination: d,
        insideDestination: c,
        afterCritical: l,
      }) ||
      cA({
        pageBorderBoxWithDroppableScroll: f,
        draggable: n,
        destination: d,
        insideDestination: c,
        last: o.displaced,
        viewport: a,
        afterCritical: l,
      })
    );
  },
  dm = function (e, t) {
    var n;
    return ee({}, e, ((n = {}), (n[t.descriptor.id] = t), n));
  },
  pA = function (t) {
    var n = t.previousImpact,
      r = t.impact,
      i = t.droppables,
      o = Rt(n),
      a = Rt(r);
    if (!o || o === a) return i;
    var l = i[o];
    if (!l.subject.withPlaceholder) return i;
    var s = eA(l);
    return dm(i, s);
  },
  mA = function (e) {
    var t = e.draggable,
      n = e.draggables,
      r = e.droppables,
      i = e.previousImpact,
      o = e.impact,
      a = pA({ previousImpact: i, impact: o, droppables: r }),
      l = Rt(o);
    if (!l) return a;
    var s = r[l];
    if (uo(t, s) || s.subject.withPlaceholder) return a;
    var u = Fx(s, t, n);
    return dm(a, u);
  },
  Vo = function (e) {
    var t = e.state,
      n = e.clientSelection,
      r = e.dimensions,
      i = e.viewport,
      o = e.impact,
      a = e.scrollJumpRequest,
      l = i || t.viewport,
      s = r || t.dimensions,
      u = n || t.current.client.selection,
      d = jt(u, t.initial.client.selection),
      c = {
        offset: d,
        selection: u,
        borderBoxCenter: at(t.initial.client.borderBoxCenter, d),
      },
      f = {
        selection: at(c.selection, l.scroll.current),
        borderBoxCenter: at(c.borderBoxCenter, l.scroll.current),
        offset: at(c.offset, l.scroll.diff.value),
      },
      h = { client: c, page: f };
    if (t.phase === "COLLECTING")
      return ee({ phase: "COLLECTING" }, t, {
        dimensions: s,
        viewport: l,
        current: h,
      });
    var v = s.draggables[t.critical.draggable.id],
      y =
        o ||
        Wx({
          pageOffset: f.offset,
          draggable: v,
          draggables: s.draggables,
          droppables: s.droppables,
          previousImpact: t.impact,
          viewport: l,
          afterCritical: t.afterCritical,
        }),
      w = mA({
        draggable: v,
        impact: y,
        previousImpact: t.impact,
        draggables: s.draggables,
        droppables: s.droppables,
      }),
      m = ee({}, t, {
        current: h,
        dimensions: { draggables: s.draggables, droppables: w },
        impact: y,
        viewport: l,
        scrollJumpRequest: a || null,
        forceShouldAnimate: a ? !1 : null,
      });
    return m;
  };
function hA(e, t) {
  return e.map(function (n) {
    return t[n];
  });
}
var Vx = function (e) {
    var t = e.impact,
      n = e.viewport,
      r = e.draggables,
      i = e.destination,
      o = e.forceShouldAnimate,
      a = t.displaced,
      l = hA(a.all, r),
      s = Ca({
        afterDragging: l,
        destination: i,
        displacedBy: t.displacedBy,
        viewport: n.frame,
        forceShouldAnimate: o,
        last: a,
      });
    return ee({}, t, { displaced: s });
  },
  qx = function (e) {
    var t = e.impact,
      n = e.draggable,
      r = e.droppable,
      i = e.draggables,
      o = e.viewport,
      a = e.afterCritical,
      l = Lu({
        impact: t,
        draggable: n,
        draggables: i,
        droppable: r,
        afterCritical: a,
      });
    return cm({ pageBorderBoxCenter: l, draggable: n, viewport: o });
  },
  Yx = function (e) {
    var t = e.state,
      n = e.dimensions,
      r = e.viewport;
    t.movementMode !== "SNAP" && U(!1);
    var i = t.impact,
      o = r || t.viewport,
      a = n || t.dimensions,
      l = a.draggables,
      s = a.droppables,
      u = l[t.critical.draggable.id],
      d = Rt(i);
    d || U(!1);
    var c = s[d],
      f = Vx({ impact: i, viewport: o, destination: c, draggables: l }),
      h = qx({
        impact: f,
        draggable: u,
        droppable: c,
        draggables: l,
        viewport: o,
        afterCritical: t.afterCritical,
      });
    return Vo({
      impact: f,
      clientSelection: h,
      state: t,
      dimensions: a,
      viewport: o,
    });
  },
  gA = function (e) {
    return { index: e.index, droppableId: e.droppableId };
  },
  Xx = function (e) {
    var t = e.draggable,
      n = e.home,
      r = e.draggables,
      i = e.viewport,
      o = Va(n.axis, t.displaceBy),
      a = so(n.descriptor.id, r),
      l = a.indexOf(t);
    l === -1 && U(!1);
    var s = a.slice(l + 1),
      u = s.reduce(function (h, v) {
        return (h[v.descriptor.id] = !0), h;
      }, {}),
      d = {
        inVirtualList: n.descriptor.mode === "virtual",
        displacedBy: o,
        effected: u,
      },
      c = Ca({
        afterDragging: s,
        destination: n,
        displacedBy: o,
        last: null,
        viewport: i.frame,
        forceShouldAnimate: !1,
      }),
      f = {
        displaced: c,
        displacedBy: o,
        at: { type: "REORDER", destination: gA(t.descriptor) },
      };
    return { impact: f, afterCritical: d };
  },
  vA = function (e, t) {
    return { draggables: e.draggables, droppables: dm(e.droppables, t) };
  },
  yA = function (e) {
    var t = e.draggable,
      n = e.offset,
      r = e.initialWindowScroll,
      i = js(t.client, n),
      o = Ns(i, r),
      a = ee({}, t, {
        placeholder: ee({}, t.placeholder, { client: i }),
        client: i,
        page: o,
      });
    return a;
  },
  xA = function (e) {
    var t = e.frame;
    return t || U(!1), t;
  },
  wA = function (e) {
    var t = e.additions,
      n = e.updatedDroppables,
      r = e.viewport,
      i = r.scroll.diff.value;
    return t.map(function (o) {
      var a = o.descriptor.droppableId,
        l = n[a],
        s = xA(l),
        u = s.scroll.diff.value,
        d = at(i, u),
        c = yA({
          draggable: o,
          offset: d,
          initialWindowScroll: r.scroll.initial,
        });
      return c;
    });
  },
  bA = function (e) {
    var t = e.state,
      n = e.published,
      r = n.modified.map(function (x) {
        var b = t.dimensions.droppables[x.droppableId],
          C = im(b, x.scroll);
        return C;
      }),
      i = ee({}, t.dimensions.droppables, {}, Ox(r)),
      o = jx(
        wA({
          additions: n.additions,
          updatedDroppables: i,
          viewport: t.viewport,
        })
      ),
      a = ee({}, t.dimensions.draggables, {}, o);
    n.removals.forEach(function (x) {
      delete a[x];
    });
    var l = { droppables: i, draggables: a },
      s = Rt(t.impact),
      u = s ? l.droppables[s] : null,
      d = l.draggables[t.critical.draggable.id],
      c = l.droppables[t.critical.droppable.id],
      f = Xx({ draggable: d, home: c, draggables: a, viewport: t.viewport }),
      h = f.impact,
      v = f.afterCritical,
      y = u && u.isCombineEnabled ? t.impact : h,
      w = Wx({
        pageOffset: t.current.page.offset,
        draggable: l.draggables[t.critical.draggable.id],
        draggables: l.draggables,
        droppables: l.droppables,
        previousImpact: y,
        viewport: t.viewport,
        afterCritical: v,
      }),
      m = ee({ phase: "DRAGGING" }, t, {
        phase: "DRAGGING",
        impact: w,
        onLiftImpact: h,
        dimensions: l,
        afterCritical: v,
        forceShouldAnimate: !1,
      });
    if (t.phase === "COLLECTING") return m;
    var g = ee({ phase: "DROP_PENDING" }, m, {
      phase: "DROP_PENDING",
      reason: t.reason,
      isWaiting: !1,
    });
    return g;
  },
  bf = function (t) {
    return t.movementMode === "SNAP";
  },
  Wc = function (t, n, r) {
    var i = vA(t.dimensions, n);
    return !bf(t) || r
      ? Vo({ state: t, dimensions: i })
      : Yx({ state: t, dimensions: i });
  };
function Vc(e) {
  return e.isDragging && e.movementMode === "SNAP"
    ? ee({ phase: "DRAGGING" }, e, { scrollJumpRequest: null })
    : e;
}
var Jg = { phase: "IDLE", completed: null, shouldFlush: !1 },
  SA = function (e, t) {
    if ((e === void 0 && (e = Jg), t.type === "FLUSH"))
      return ee({}, Jg, { shouldFlush: !0 });
    if (t.type === "INITIAL_PUBLISH") {
      e.phase !== "IDLE" && U(!1);
      var n = t.payload,
        r = n.critical,
        i = n.clientSelection,
        o = n.viewport,
        a = n.dimensions,
        l = n.movementMode,
        s = a.draggables[r.draggable.id],
        u = a.droppables[r.droppable.id],
        d = {
          selection: i,
          borderBoxCenter: s.client.borderBox.center,
          offset: tt,
        },
        c = {
          client: d,
          page: {
            selection: at(d.selection, o.scroll.initial),
            borderBoxCenter: at(d.selection, o.scroll.initial),
            offset: at(d.selection, o.scroll.diff.value),
          },
        },
        f = ju(a.droppables).every(function (le) {
          return !le.isFixedOnPage;
        }),
        h = Xx({
          draggable: s,
          home: u,
          draggables: a.draggables,
          viewport: o,
        }),
        v = h.impact,
        y = h.afterCritical,
        w = {
          phase: "DRAGGING",
          isDragging: !0,
          critical: r,
          movementMode: l,
          dimensions: a,
          initial: c,
          current: c,
          isWindowScrollAllowed: f,
          impact: v,
          afterCritical: y,
          onLiftImpact: v,
          viewport: o,
          scrollJumpRequest: null,
          forceShouldAnimate: null,
        };
      return w;
    }
    if (t.type === "COLLECTION_STARTING") {
      if (e.phase === "COLLECTING" || e.phase === "DROP_PENDING") return e;
      e.phase !== "DRAGGING" && U(!1);
      var m = ee({ phase: "COLLECTING" }, e, { phase: "COLLECTING" });
      return m;
    }
    if (t.type === "PUBLISH_WHILE_DRAGGING")
      return (
        e.phase === "COLLECTING" || e.phase === "DROP_PENDING" || U(!1),
        bA({ state: e, published: t.payload })
      );
    if (t.type === "MOVE") {
      if (e.phase === "DROP_PENDING") return e;
      Br(e) || U(!1);
      var g = t.payload.client;
      return yr(g, e.current.client.selection)
        ? e
        : Vo({ state: e, clientSelection: g, impact: bf(e) ? e.impact : null });
    }
    if (t.type === "UPDATE_DROPPABLE_SCROLL") {
      if (e.phase === "DROP_PENDING" || e.phase === "COLLECTING") return Vc(e);
      Br(e) || U(!1);
      var x = t.payload,
        b = x.id,
        C = x.newScroll,
        E = e.dimensions.droppables[b];
      if (!E) return e;
      var P = im(E, C);
      return Wc(e, P, !1);
    }
    if (t.type === "UPDATE_DROPPABLE_IS_ENABLED") {
      if (e.phase === "DROP_PENDING") return e;
      Br(e) || U(!1);
      var T = t.payload,
        I = T.id,
        O = T.isEnabled,
        D = e.dimensions.droppables[I];
      D || U(!1), D.isEnabled === O && U(!1);
      var N = ee({}, D, { isEnabled: O });
      return Wc(e, N, !0);
    }
    if (t.type === "UPDATE_DROPPABLE_IS_COMBINE_ENABLED") {
      if (e.phase === "DROP_PENDING") return e;
      Br(e) || U(!1);
      var A = t.payload,
        R = A.id,
        V = A.isCombineEnabled,
        J = e.dimensions.droppables[R];
      J || U(!1), J.isCombineEnabled === V && U(!1);
      var re = ee({}, J, { isCombineEnabled: V });
      return Wc(e, re, !0);
    }
    if (t.type === "MOVE_BY_WINDOW_SCROLL") {
      if (e.phase === "DROP_PENDING" || e.phase === "DROP_ANIMATING") return e;
      Br(e) || U(!1), e.isWindowScrollAllowed || U(!1);
      var L = t.payload.newScroll;
      if (yr(e.viewport.scroll.current, L)) return Vc(e);
      var M = $x(e.viewport, L);
      return bf(e)
        ? Yx({ state: e, viewport: M })
        : Vo({ state: e, viewport: M });
    }
    if (t.type === "UPDATE_VIEWPORT_MAX_SCROLL") {
      if (!Br(e)) return e;
      var W = t.payload.maxScroll;
      if (yr(W, e.viewport.scroll.max)) return e;
      var K = ee({}, e.viewport, {
        scroll: ee({}, e.viewport.scroll, { max: W }),
      });
      return ee({ phase: "DRAGGING" }, e, { viewport: K });
    }
    if (
      t.type === "MOVE_UP" ||
      t.type === "MOVE_DOWN" ||
      t.type === "MOVE_LEFT" ||
      t.type === "MOVE_RIGHT"
    ) {
      if (e.phase === "COLLECTING" || e.phase === "DROP_PENDING") return e;
      e.phase !== "DRAGGING" && U(!1);
      var $ = iA({ state: e, type: t.type });
      return $
        ? Vo({
            state: e,
            impact: $.impact,
            clientSelection: $.clientSelection,
            scrollJumpRequest: $.scrollJumpRequest,
          })
        : e;
    }
    if (t.type === "DROP_PENDING") {
      var _ = t.payload.reason;
      e.phase !== "COLLECTING" && U(!1);
      var G = ee({ phase: "DROP_PENDING" }, e, {
        phase: "DROP_PENDING",
        isWaiting: !0,
        reason: _,
      });
      return G;
    }
    if (t.type === "DROP_ANIMATE") {
      var X = t.payload,
        j = X.completed,
        ie = X.dropDuration,
        F = X.newHomeClientOffset;
      e.phase === "DRAGGING" || e.phase === "DROP_PENDING" || U(!1);
      var ye = {
        phase: "DROP_ANIMATING",
        completed: j,
        dropDuration: ie,
        newHomeClientOffset: F,
        dimensions: e.dimensions,
      };
      return ye;
    }
    if (t.type === "DROP_COMPLETE") {
      var oe = t.payload.completed;
      return { phase: "IDLE", completed: oe, shouldFlush: !1 };
    }
    return e;
  },
  CA = function (t) {
    return { type: "BEFORE_INITIAL_CAPTURE", payload: t };
  },
  EA = function (t) {
    return { type: "LIFT", payload: t };
  },
  TA = function (t) {
    return { type: "INITIAL_PUBLISH", payload: t };
  },
  kA = function (t) {
    return { type: "PUBLISH_WHILE_DRAGGING", payload: t };
  },
  PA = function () {
    return { type: "COLLECTION_STARTING", payload: null };
  },
  IA = function (t) {
    return { type: "UPDATE_DROPPABLE_SCROLL", payload: t };
  },
  AA = function (t) {
    return { type: "UPDATE_DROPPABLE_IS_ENABLED", payload: t };
  },
  DA = function (t) {
    return { type: "UPDATE_DROPPABLE_IS_COMBINE_ENABLED", payload: t };
  },
  Kx = function (t) {
    return { type: "MOVE", payload: t };
  },
  OA = function (t) {
    return { type: "MOVE_BY_WINDOW_SCROLL", payload: t };
  },
  jA = function (t) {
    return { type: "UPDATE_VIEWPORT_MAX_SCROLL", payload: t };
  },
  NA = function () {
    return { type: "MOVE_UP", payload: null };
  },
  RA = function () {
    return { type: "MOVE_DOWN", payload: null };
  },
  LA = function () {
    return { type: "MOVE_RIGHT", payload: null };
  },
  MA = function () {
    return { type: "MOVE_LEFT", payload: null };
  },
  fm = function () {
    return { type: "FLUSH", payload: null };
  },
  _A = function (t) {
    return { type: "DROP_ANIMATE", payload: t };
  },
  pm = function (t) {
    return { type: "DROP_COMPLETE", payload: t };
  },
  Qx = function (t) {
    return { type: "DROP", payload: t };
  },
  $A = function (t) {
    return { type: "DROP_PENDING", payload: t };
  },
  Zx = function () {
    return { type: "DROP_ANIMATION_FINISHED", payload: null };
  },
  BA = function (e) {
    return function (t) {
      var n = t.getState,
        r = t.dispatch;
      return function (i) {
        return function (o) {
          if (o.type !== "LIFT") {
            i(o);
            return;
          }
          var a = o.payload,
            l = a.id,
            s = a.clientSelection,
            u = a.movementMode,
            d = n();
          d.phase === "DROP_ANIMATING" && r(pm({ completed: d.completed })),
            n().phase !== "IDLE" && U(!1),
            r(fm()),
            r(CA({ draggableId: l, movementMode: u }));
          var c = { shouldPublishImmediately: u === "SNAP" },
            f = { draggableId: l, scrollOptions: c },
            h = e.startPublishing(f),
            v = h.critical,
            y = h.dimensions,
            w = h.viewport;
          r(
            TA({
              critical: v,
              dimensions: y,
              clientSelection: s,
              movementMode: u,
              viewport: w,
            })
          );
        };
      };
    };
  },
  zA = function (e) {
    return function () {
      return function (t) {
        return function (n) {
          n.type === "INITIAL_PUBLISH" && e.dragging(),
            n.type === "DROP_ANIMATE" &&
              e.dropping(n.payload.completed.result.reason),
            (n.type === "FLUSH" || n.type === "DROP_COMPLETE") && e.resting(),
            t(n);
        };
      };
    };
  },
  mm = {
    outOfTheWay: "cubic-bezier(0.2, 0, 0, 1)",
    drop: "cubic-bezier(.2,1,.1,1)",
  },
  Ea = { opacity: { drop: 0, combining: 0.7 }, scale: { drop: 0.75 } },
  hm = { outOfTheWay: 0.2, minDropTime: 0.33, maxDropTime: 0.55 },
  Nr = hm.outOfTheWay + "s " + mm.outOfTheWay,
  qo = {
    fluid: "opacity " + Nr,
    snap: "transform " + Nr + ", opacity " + Nr,
    drop: function (t) {
      var n = t + "s " + mm.drop;
      return "transform " + n + ", opacity " + n;
    },
    outOfTheWay: "transform " + Nr,
    placeholder: "height " + Nr + ", width " + Nr + ", margin " + Nr,
  },
  ev = function (t) {
    return yr(t, tt) ? null : "translate(" + t.x + "px, " + t.y + "px)";
  },
  Sf = {
    moveTo: ev,
    drop: function (t, n) {
      var r = ev(t);
      return r ? (n ? r + " scale(" + Ea.scale.drop + ")" : r) : null;
    },
  },
  Cf = hm.minDropTime,
  Jx = hm.maxDropTime,
  FA = Jx - Cf,
  tv = 1500,
  UA = 0.6,
  HA = function (e) {
    var t = e.current,
      n = e.destination,
      r = e.reason,
      i = ba(t, n);
    if (i <= 0) return Cf;
    if (i >= tv) return Jx;
    var o = i / tv,
      a = Cf + FA * o,
      l = r === "CANCEL" ? a * UA : a;
    return Number(l.toFixed(2));
  },
  GA = function (e) {
    var t = e.impact,
      n = e.draggable,
      r = e.dimensions,
      i = e.viewport,
      o = e.afterCritical,
      a = r.draggables,
      l = r.droppables,
      s = Rt(t),
      u = s ? l[s] : null,
      d = l[n.descriptor.droppableId],
      c = qx({
        impact: t,
        draggable: n,
        draggables: a,
        afterCritical: o,
        droppable: u || d,
        viewport: i,
      }),
      f = jt(c, n.client.borderBox.center);
    return f;
  },
  WA = function (e) {
    var t = e.draggables,
      n = e.reason,
      r = e.lastImpact,
      i = e.home,
      o = e.viewport,
      a = e.onLiftImpact;
    if (!r.at || n !== "DROP") {
      var l = Vx({
        draggables: t,
        impact: a,
        destination: i,
        viewport: o,
        forceShouldAnimate: !0,
      });
      return { impact: l, didDropInsideDroppable: !1 };
    }
    if (r.at.type === "REORDER")
      return { impact: r, didDropInsideDroppable: !0 };
    var s = ee({}, r, { displaced: Sa });
    return { impact: s, didDropInsideDroppable: !0 };
  },
  VA = function (e) {
    var t = e.getState,
      n = e.dispatch;
    return function (r) {
      return function (i) {
        if (i.type !== "DROP") {
          r(i);
          return;
        }
        var o = t(),
          a = i.payload.reason;
        if (o.phase === "COLLECTING") {
          n($A({ reason: a }));
          return;
        }
        if (o.phase !== "IDLE") {
          var l = o.phase === "DROP_PENDING" && o.isWaiting;
          l && U(!1),
            o.phase === "DRAGGING" || o.phase === "DROP_PENDING" || U(!1);
          var s = o.critical,
            u = o.dimensions,
            d = u.draggables[o.critical.draggable.id],
            c = WA({
              reason: a,
              lastImpact: o.impact,
              afterCritical: o.afterCritical,
              onLiftImpact: o.onLiftImpact,
              home: o.dimensions.droppables[o.critical.droppable.id],
              viewport: o.viewport,
              draggables: o.dimensions.draggables,
            }),
            f = c.impact,
            h = c.didDropInsideDroppable,
            v = h ? am(f) : null,
            y = h ? Nu(f) : null,
            w = { index: s.draggable.index, droppableId: s.droppable.id },
            m = {
              draggableId: d.descriptor.id,
              type: d.descriptor.type,
              source: w,
              reason: a,
              mode: o.movementMode,
              destination: v,
              combine: y,
            },
            g = GA({
              impact: f,
              draggable: d,
              dimensions: u,
              viewport: o.viewport,
              afterCritical: o.afterCritical,
            }),
            x = {
              critical: o.critical,
              afterCritical: o.afterCritical,
              result: m,
              impact: f,
            },
            b = !yr(o.current.client.offset, g) || !!m.combine;
          if (!b) {
            n(pm({ completed: x }));
            return;
          }
          var C = HA({
              current: o.current.client.offset,
              destination: g,
              reason: a,
            }),
            E = { newHomeClientOffset: g, dropDuration: C, completed: x };
          n(_A(E));
        }
      };
    };
  },
  ew = function () {
    return { x: window.pageXOffset, y: window.pageYOffset };
  };
function qA(e) {
  return {
    eventName: "scroll",
    options: { passive: !0, capture: !1 },
    fn: function (n) {
      (n.target !== window && n.target !== window.document) || e();
    },
  };
}
function YA(e) {
  var t = e.onWindowScroll;
  function n() {
    t(ew());
  }
  var r = wa(n),
    i = qA(r),
    o = vr;
  function a() {
    return o !== vr;
  }
  function l() {
    a() && U(!1), (o = Kt(window, [i]));
  }
  function s() {
    a() || U(!1), r.cancel(), o(), (o = vr);
  }
  return { start: l, stop: s, isActive: a };
}
var XA = function (t) {
    return (
      t.type === "DROP_COMPLETE" ||
      t.type === "DROP_ANIMATE" ||
      t.type === "FLUSH"
    );
  },
  KA = function (e) {
    var t = YA({
      onWindowScroll: function (r) {
        e.dispatch(OA({ newScroll: r }));
      },
    });
    return function (n) {
      return function (r) {
        !t.isActive() && r.type === "INITIAL_PUBLISH" && t.start(),
          t.isActive() && XA(r) && t.stop(),
          n(r);
      };
    };
  },
  QA = function (e) {
    var t = !1,
      n = !1,
      r = setTimeout(function () {
        n = !0;
      }),
      i = function (a) {
        t || n || ((t = !0), e(a), clearTimeout(r));
      };
    return (
      (i.wasCalled = function () {
        return t;
      }),
      i
    );
  },
  ZA = function () {
    var e = [],
      t = function (o) {
        var a = om(e, function (u) {
          return u.timerId === o;
        });
        a === -1 && U(!1);
        var l = e.splice(a, 1),
          s = l[0];
        s.callback();
      },
      n = function (o) {
        var a = setTimeout(function () {
            return t(a);
          }),
          l = { timerId: a, callback: o };
        e.push(l);
      },
      r = function () {
        if (e.length) {
          var o = [].concat(e);
          (e.length = 0),
            o.forEach(function (a) {
              clearTimeout(a.timerId), a.callback();
            });
        }
      };
    return { add: n, flush: r };
  },
  JA = function (t, n) {
    return t == null && n == null
      ? !0
      : t == null || n == null
      ? !1
      : t.droppableId === n.droppableId && t.index === n.index;
  },
  eD = function (t, n) {
    return t == null && n == null
      ? !0
      : t == null || n == null
      ? !1
      : t.draggableId === n.draggableId && t.droppableId === n.droppableId;
  },
  tD = function (t, n) {
    if (t === n) return !0;
    var r =
        t.draggable.id === n.draggable.id &&
        t.draggable.droppableId === n.draggable.droppableId &&
        t.draggable.type === n.draggable.type &&
        t.draggable.index === n.draggable.index,
      i =
        t.droppable.id === n.droppable.id &&
        t.droppable.type === n.droppable.type;
    return r && i;
  },
  wo = function (t, n) {
    n();
  },
  Cl = function (t, n) {
    return {
      draggableId: t.draggable.id,
      type: t.droppable.type,
      source: { droppableId: t.droppable.id, index: t.draggable.index },
      mode: n,
    };
  },
  qc = function (t, n, r, i) {
    if (!t) {
      r(i(n));
      return;
    }
    var o = QA(r),
      a = { announce: o };
    t(n, a), o.wasCalled() || r(i(n));
  },
  nD = function (e, t) {
    var n = ZA(),
      r = null,
      i = function (f, h) {
        r && U(!1),
          wo("onBeforeCapture", function () {
            var v = e().onBeforeCapture;
            if (v) {
              var y = { draggableId: f, mode: h };
              v(y);
            }
          });
      },
      o = function (f, h) {
        r && U(!1),
          wo("onBeforeDragStart", function () {
            var v = e().onBeforeDragStart;
            v && v(Cl(f, h));
          });
      },
      a = function (f, h) {
        r && U(!1);
        var v = Cl(f, h);
        (r = {
          mode: h,
          lastCritical: f,
          lastLocation: v.source,
          lastCombine: null,
        }),
          n.add(function () {
            wo("onDragStart", function () {
              return qc(e().onDragStart, v, t, Vl.onDragStart);
            });
          });
      },
      l = function (f, h) {
        var v = am(h),
          y = Nu(h);
        r || U(!1);
        var w = !tD(f, r.lastCritical);
        w && (r.lastCritical = f);
        var m = !JA(r.lastLocation, v);
        m && (r.lastLocation = v);
        var g = !eD(r.lastCombine, y);
        if ((g && (r.lastCombine = y), !(!w && !m && !g))) {
          var x = ee({}, Cl(f, r.mode), { combine: y, destination: v });
          n.add(function () {
            wo("onDragUpdate", function () {
              return qc(e().onDragUpdate, x, t, Vl.onDragUpdate);
            });
          });
        }
      },
      s = function () {
        r || U(!1), n.flush();
      },
      u = function (f) {
        r || U(!1),
          (r = null),
          wo("onDragEnd", function () {
            return qc(e().onDragEnd, f, t, Vl.onDragEnd);
          });
      },
      d = function () {
        if (r) {
          var f = ee({}, Cl(r.lastCritical, r.mode), {
            combine: null,
            destination: null,
            reason: "CANCEL",
          });
          u(f);
        }
      };
    return {
      beforeCapture: i,
      beforeStart: o,
      start: a,
      update: l,
      flush: s,
      drop: u,
      abort: d,
    };
  },
  rD = function (e, t) {
    var n = nD(e, t);
    return function (r) {
      return function (i) {
        return function (o) {
          if (o.type === "BEFORE_INITIAL_CAPTURE") {
            n.beforeCapture(o.payload.draggableId, o.payload.movementMode);
            return;
          }
          if (o.type === "INITIAL_PUBLISH") {
            var a = o.payload.critical;
            n.beforeStart(a, o.payload.movementMode),
              i(o),
              n.start(a, o.payload.movementMode);
            return;
          }
          if (o.type === "DROP_COMPLETE") {
            var l = o.payload.completed.result;
            n.flush(), i(o), n.drop(l);
            return;
          }
          if ((i(o), o.type === "FLUSH")) {
            n.abort();
            return;
          }
          var s = r.getState();
          s.phase === "DRAGGING" && n.update(s.critical, s.impact);
        };
      };
    };
  },
  iD = function (e) {
    return function (t) {
      return function (n) {
        if (n.type !== "DROP_ANIMATION_FINISHED") {
          t(n);
          return;
        }
        var r = e.getState();
        r.phase !== "DROP_ANIMATING" && U(!1),
          e.dispatch(pm({ completed: r.completed }));
      };
    };
  },
  oD = function (e) {
    var t = null,
      n = null;
    function r() {
      n && (cancelAnimationFrame(n), (n = null)), t && (t(), (t = null));
    }
    return function (i) {
      return function (o) {
        if (
          ((o.type === "FLUSH" ||
            o.type === "DROP_COMPLETE" ||
            o.type === "DROP_ANIMATION_FINISHED") &&
            r(),
          i(o),
          o.type === "DROP_ANIMATE")
        ) {
          var a = {
            eventName: "scroll",
            options: { capture: !0, passive: !1, once: !0 },
            fn: function () {
              var s = e.getState();
              s.phase === "DROP_ANIMATING" && e.dispatch(Zx());
            },
          };
          n = requestAnimationFrame(function () {
            (n = null), (t = Kt(window, [a]));
          });
        }
      };
    };
  },
  aD = function (e) {
    return function () {
      return function (t) {
        return function (n) {
          (n.type === "DROP_COMPLETE" ||
            n.type === "FLUSH" ||
            n.type === "DROP_ANIMATE") &&
            e.stopPublishing(),
            t(n);
        };
      };
    };
  },
  lD = function (e) {
    var t = !1;
    return function () {
      return function (n) {
        return function (r) {
          if (r.type === "INITIAL_PUBLISH") {
            (t = !0),
              e.tryRecordFocus(r.payload.critical.draggable.id),
              n(r),
              e.tryRestoreFocusRecorded();
            return;
          }
          if ((n(r), !!t)) {
            if (r.type === "FLUSH") {
              (t = !1), e.tryRestoreFocusRecorded();
              return;
            }
            if (r.type === "DROP_COMPLETE") {
              t = !1;
              var i = r.payload.completed.result;
              i.combine &&
                e.tryShiftRecord(i.draggableId, i.combine.draggableId),
                e.tryRestoreFocusRecorded();
            }
          }
        };
      };
    };
  },
  sD = function (t) {
    return (
      t.type === "DROP_COMPLETE" ||
      t.type === "DROP_ANIMATE" ||
      t.type === "FLUSH"
    );
  },
  uD = function (e) {
    return function (t) {
      return function (n) {
        return function (r) {
          if (sD(r)) {
            e.stop(), n(r);
            return;
          }
          if (r.type === "INITIAL_PUBLISH") {
            n(r);
            var i = t.getState();
            i.phase !== "DRAGGING" && U(!1), e.start(i);
            return;
          }
          n(r), e.scroll(t.getState());
        };
      };
    };
  },
  cD = function (e) {
    return function (t) {
      return function (n) {
        if ((t(n), n.type === "PUBLISH_WHILE_DRAGGING")) {
          var r = e.getState();
          r.phase === "DROP_PENDING" &&
            (r.isWaiting || e.dispatch(Qx({ reason: r.reason })));
        }
      };
    };
  },
  dD = va,
  fD = function (e) {
    var t = e.dimensionMarshal,
      n = e.focusMarshal,
      r = e.styleMarshal,
      i = e.getResponders,
      o = e.announce,
      a = e.autoScroller;
    return qp(
      SA,
      dD(My(zA(r), aD(t), BA(t), VA, iD, oD, cD, uD(a), KA, lD(n), rD(i, o)))
    );
  },
  Yc = function () {
    return { additions: {}, removals: {}, modified: {} };
  };
function pD(e) {
  var t = e.registry,
    n = e.callbacks,
    r = Yc(),
    i = null,
    o = function () {
      i ||
        (n.collectionStarting(),
        (i = requestAnimationFrame(function () {
          i = null;
          var d = r,
            c = d.additions,
            f = d.removals,
            h = d.modified,
            v = Object.keys(c)
              .map(function (m) {
                return t.draggable.getById(m).getDimension(tt);
              })
              .sort(function (m, g) {
                return m.descriptor.index - g.descriptor.index;
              }),
            y = Object.keys(h).map(function (m) {
              var g = t.droppable.getById(m),
                x = g.callbacks.getScrollWhileDragging();
              return { droppableId: m, scroll: x };
            }),
            w = { additions: v, removals: Object.keys(f), modified: y };
          (r = Yc()), n.publish(w);
        })));
    },
    a = function (d) {
      var c = d.descriptor.id;
      (r.additions[c] = d),
        (r.modified[d.descriptor.droppableId] = !0),
        r.removals[c] && delete r.removals[c],
        o();
    },
    l = function (d) {
      var c = d.descriptor;
      (r.removals[c.id] = !0),
        (r.modified[c.droppableId] = !0),
        r.additions[c.id] && delete r.additions[c.id],
        o();
    },
    s = function () {
      i && (cancelAnimationFrame(i), (i = null), (r = Yc()));
    };
  return { add: a, remove: l, stop: s };
}
var tw = function (e) {
    var t = e.scrollHeight,
      n = e.scrollWidth,
      r = e.height,
      i = e.width,
      o = jt({ x: n, y: t }, { x: i, y: r }),
      a = { x: Math.max(0, o.x), y: Math.max(0, o.y) };
    return a;
  },
  nw = function () {
    var e = document.documentElement;
    return e || U(!1), e;
  },
  rw = function () {
    var e = nw(),
      t = tw({
        scrollHeight: e.scrollHeight,
        scrollWidth: e.scrollWidth,
        width: e.clientWidth,
        height: e.clientHeight,
      });
    return t;
  },
  mD = function () {
    var e = ew(),
      t = rw(),
      n = e.y,
      r = e.x,
      i = nw(),
      o = i.clientWidth,
      a = i.clientHeight,
      l = r + o,
      s = n + a,
      u = fn({ top: n, left: r, right: l, bottom: s }),
      d = {
        frame: u,
        scroll: {
          initial: e,
          current: e,
          max: t,
          diff: { value: tt, displacement: tt },
        },
      };
    return d;
  },
  hD = function (e) {
    var t = e.critical,
      n = e.scrollOptions,
      r = e.registry,
      i = mD(),
      o = i.scroll.current,
      a = t.droppable,
      l = r.droppable.getAllByType(a.type).map(function (c) {
        return c.callbacks.getDimensionAndWatchScroll(o, n);
      }),
      s = r.draggable.getAllByType(t.draggable.type).map(function (c) {
        return c.getDimension(o);
      }),
      u = { draggables: jx(s), droppables: Ox(l) },
      d = { dimensions: u, critical: t, viewport: i };
    return d;
  };
function nv(e, t, n) {
  if (n.descriptor.id === t.id || n.descriptor.type !== t.type) return !1;
  var r = e.droppable.getById(n.descriptor.droppableId);
  return r.descriptor.mode === "virtual";
}
var gD = function (e, t) {
    var n = null,
      r = pD({
        callbacks: {
          publish: t.publishWhileDragging,
          collectionStarting: t.collectionStarting,
        },
        registry: e,
      }),
      i = function (h, v) {
        e.droppable.exists(h) || U(!1),
          n && t.updateDroppableIsEnabled({ id: h, isEnabled: v });
      },
      o = function (h, v) {
        n &&
          (e.droppable.exists(h) || U(!1),
          t.updateDroppableIsCombineEnabled({ id: h, isCombineEnabled: v }));
      },
      a = function (h, v) {
        n &&
          (e.droppable.exists(h) || U(!1),
          t.updateDroppableScroll({ id: h, newScroll: v }));
      },
      l = function (h, v) {
        n && e.droppable.getById(h).callbacks.scroll(v);
      },
      s = function () {
        if (n) {
          r.stop();
          var h = n.critical.droppable;
          e.droppable.getAllByType(h.type).forEach(function (v) {
            return v.callbacks.dragStopped();
          }),
            n.unsubscribe(),
            (n = null);
        }
      },
      u = function (h) {
        n || U(!1);
        var v = n.critical.draggable;
        h.type === "ADDITION" && nv(e, v, h.value) && r.add(h.value),
          h.type === "REMOVAL" && nv(e, v, h.value) && r.remove(h.value);
      },
      d = function (h) {
        n && U(!1);
        var v = e.draggable.getById(h.draggableId),
          y = e.droppable.getById(v.descriptor.droppableId),
          w = { draggable: v.descriptor, droppable: y.descriptor },
          m = e.subscribe(u);
        return (
          (n = { critical: w, unsubscribe: m }),
          hD({ critical: w, registry: e, scrollOptions: h.scrollOptions })
        );
      },
      c = {
        updateDroppableIsEnabled: i,
        updateDroppableIsCombineEnabled: o,
        scrollDroppable: l,
        updateDroppableScroll: a,
        startPublishing: d,
        stopPublishing: s,
      };
    return c;
  },
  iw = function (e, t) {
    return e.phase === "IDLE"
      ? !0
      : e.phase !== "DROP_ANIMATING" || e.completed.result.draggableId === t
      ? !1
      : e.completed.result.reason === "DROP";
  },
  vD = function (e) {
    window.scrollBy(e.x, e.y);
  },
  yD = et(function (e) {
    return ju(e).filter(function (t) {
      return !(!t.isEnabled || !t.frame);
    });
  }),
  xD = function (t, n) {
    var r = Ar(yD(n), function (i) {
      return i.frame || U(!1), Ux(i.frame.pageMarginBox)(t);
    });
    return r;
  },
  wD = function (e) {
    var t = e.center,
      n = e.destination,
      r = e.droppables;
    if (n) {
      var i = r[n];
      return i.frame ? i : null;
    }
    var o = xD(t, r);
    return o;
  },
  xr = {
    startFromPercentage: 0.25,
    maxScrollAtPercentage: 0.05,
    maxPixelScroll: 28,
    ease: function (t) {
      return Math.pow(t, 2);
    },
    durationDampening: { stopDampeningAt: 1200, accelerateAt: 360 },
  },
  bD = function (e, t) {
    var n = e[t.size] * xr.startFromPercentage,
      r = e[t.size] * xr.maxScrollAtPercentage,
      i = { startScrollingFrom: n, maxScrollValueAt: r };
    return i;
  },
  ow = function (e) {
    var t = e.startOfRange,
      n = e.endOfRange,
      r = e.current,
      i = n - t;
    if (i === 0) return 0;
    var o = r - t,
      a = o / i;
    return a;
  },
  gm = 1,
  SD = function (e, t) {
    if (e > t.startScrollingFrom) return 0;
    if (e <= t.maxScrollValueAt) return xr.maxPixelScroll;
    if (e === t.startScrollingFrom) return gm;
    var n = ow({
        startOfRange: t.maxScrollValueAt,
        endOfRange: t.startScrollingFrom,
        current: e,
      }),
      r = 1 - n,
      i = xr.maxPixelScroll * xr.ease(r);
    return Math.ceil(i);
  },
  rv = xr.durationDampening.accelerateAt,
  iv = xr.durationDampening.stopDampeningAt,
  CD = function (e, t) {
    var n = t,
      r = iv,
      i = Date.now(),
      o = i - n;
    if (o >= iv) return e;
    if (o < rv) return gm;
    var a = ow({ startOfRange: rv, endOfRange: r, current: o }),
      l = e * xr.ease(a);
    return Math.ceil(l);
  },
  ov = function (e) {
    var t = e.distanceToEdge,
      n = e.thresholds,
      r = e.dragStartTime,
      i = e.shouldUseTimeDampening,
      o = SD(t, n);
    return o === 0 ? 0 : i ? Math.max(CD(o, r), gm) : o;
  },
  av = function (e) {
    var t = e.container,
      n = e.distanceToEdges,
      r = e.dragStartTime,
      i = e.axis,
      o = e.shouldUseTimeDampening,
      a = bD(t, i),
      l = n[i.end] < n[i.start];
    return l
      ? ov({
          distanceToEdge: n[i.end],
          thresholds: a,
          dragStartTime: r,
          shouldUseTimeDampening: o,
        })
      : -1 *
          ov({
            distanceToEdge: n[i.start],
            thresholds: a,
            dragStartTime: r,
            shouldUseTimeDampening: o,
          });
  },
  ED = function (e) {
    var t = e.container,
      n = e.subject,
      r = e.proposedScroll,
      i = n.height > t.height,
      o = n.width > t.width;
    return !o && !i ? r : o && i ? null : { x: o ? 0 : r.x, y: i ? 0 : r.y };
  },
  TD = Ax(function (e) {
    return e === 0 ? 0 : e;
  }),
  aw = function (e) {
    var t = e.dragStartTime,
      n = e.container,
      r = e.subject,
      i = e.center,
      o = e.shouldUseTimeDampening,
      a = {
        top: i.y - n.top,
        right: n.right - i.x,
        bottom: n.bottom - i.y,
        left: i.x - n.left,
      },
      l = av({
        container: n,
        distanceToEdges: a,
        dragStartTime: t,
        axis: lm,
        shouldUseTimeDampening: o,
      }),
      s = av({
        container: n,
        distanceToEdges: a,
        dragStartTime: t,
        axis: Lx,
        shouldUseTimeDampening: o,
      }),
      u = TD({ x: s, y: l });
    if (yr(u, tt)) return null;
    var d = ED({ container: n, subject: r, proposedScroll: u });
    return d ? (yr(d, tt) ? null : d) : null;
  },
  kD = Ax(function (e) {
    return e === 0 ? 0 : e > 0 ? 1 : -1;
  }),
  vm = (function () {
    var e = function (n, r) {
      return n < 0 ? n : n > r ? n - r : 0;
    };
    return function (t) {
      var n = t.current,
        r = t.max,
        i = t.change,
        o = at(n, i),
        a = { x: e(o.x, r.x), y: e(o.y, r.y) };
      return yr(a, tt) ? null : a;
    };
  })(),
  lw = function (t) {
    var n = t.max,
      r = t.current,
      i = t.change,
      o = { x: Math.max(r.x, n.x), y: Math.max(r.y, n.y) },
      a = kD(i),
      l = vm({ max: o, current: r, change: a });
    return !l || (a.x !== 0 && l.x === 0) || (a.y !== 0 && l.y === 0);
  },
  ym = function (t, n) {
    return lw({ current: t.scroll.current, max: t.scroll.max, change: n });
  },
  PD = function (t, n) {
    if (!ym(t, n)) return null;
    var r = t.scroll.max,
      i = t.scroll.current;
    return vm({ current: i, max: r, change: n });
  },
  xm = function (t, n) {
    var r = t.frame;
    return r
      ? lw({ current: r.scroll.current, max: r.scroll.max, change: n })
      : !1;
  },
  ID = function (t, n) {
    var r = t.frame;
    return !r || !xm(t, n)
      ? null
      : vm({ current: r.scroll.current, max: r.scroll.max, change: n });
  },
  AD = function (e) {
    var t = e.viewport,
      n = e.subject,
      r = e.center,
      i = e.dragStartTime,
      o = e.shouldUseTimeDampening,
      a = aw({
        dragStartTime: i,
        container: t.frame,
        subject: n,
        center: r,
        shouldUseTimeDampening: o,
      });
    return a && ym(t, a) ? a : null;
  },
  DD = function (e) {
    var t = e.droppable,
      n = e.subject,
      r = e.center,
      i = e.dragStartTime,
      o = e.shouldUseTimeDampening,
      a = t.frame;
    if (!a) return null;
    var l = aw({
      dragStartTime: i,
      container: a.pageMarginBox,
      subject: n,
      center: r,
      shouldUseTimeDampening: o,
    });
    return l && xm(t, l) ? l : null;
  },
  lv = function (e) {
    var t = e.state,
      n = e.dragStartTime,
      r = e.shouldUseTimeDampening,
      i = e.scrollWindow,
      o = e.scrollDroppable,
      a = t.current.page.borderBoxCenter,
      l = t.dimensions.draggables[t.critical.draggable.id],
      s = l.page.marginBox;
    if (t.isWindowScrollAllowed) {
      var u = t.viewport,
        d = AD({
          dragStartTime: n,
          viewport: u,
          subject: s,
          center: a,
          shouldUseTimeDampening: r,
        });
      if (d) {
        i(d);
        return;
      }
    }
    var c = wD({
      center: a,
      destination: Rt(t.impact),
      droppables: t.dimensions.droppables,
    });
    if (c) {
      var f = DD({
        dragStartTime: n,
        droppable: c,
        subject: s,
        center: a,
        shouldUseTimeDampening: r,
      });
      f && o(c.descriptor.id, f);
    }
  },
  OD = function (e) {
    var t = e.scrollWindow,
      n = e.scrollDroppable,
      r = wa(t),
      i = wa(n),
      o = null,
      a = function (d) {
        o || U(!1);
        var c = o,
          f = c.shouldUseTimeDampening,
          h = c.dragStartTime;
        lv({
          state: d,
          scrollWindow: r,
          scrollDroppable: i,
          dragStartTime: h,
          shouldUseTimeDampening: f,
        });
      },
      l = function (d) {
        o && U(!1);
        var c = Date.now(),
          f = !1,
          h = function () {
            f = !0;
          };
        lv({
          state: d,
          dragStartTime: 0,
          shouldUseTimeDampening: !1,
          scrollWindow: h,
          scrollDroppable: h,
        }),
          (o = { dragStartTime: c, shouldUseTimeDampening: f }),
          f && a(d);
      },
      s = function () {
        o && (r.cancel(), i.cancel(), (o = null));
      };
    return { start: l, stop: s, scroll: a };
  },
  jD = function (e) {
    var t = e.move,
      n = e.scrollDroppable,
      r = e.scrollWindow,
      i = function (u, d) {
        var c = at(u.current.client.selection, d);
        t({ client: c });
      },
      o = function (u, d) {
        if (!xm(u, d)) return d;
        var c = ID(u, d);
        if (!c) return n(u.descriptor.id, d), null;
        var f = jt(d, c);
        n(u.descriptor.id, f);
        var h = jt(d, f);
        return h;
      },
      a = function (u, d, c) {
        if (!u || !ym(d, c)) return c;
        var f = PD(d, c);
        if (!f) return r(c), null;
        var h = jt(c, f);
        r(h);
        var v = jt(c, h);
        return v;
      },
      l = function (u) {
        var d = u.scrollJumpRequest;
        if (d) {
          var c = Rt(u.impact);
          c || U(!1);
          var f = o(u.dimensions.droppables[c], d);
          if (f) {
            var h = u.viewport,
              v = a(u.isWindowScrollAllowed, h, f);
            v && i(u, v);
          }
        }
      };
    return l;
  },
  ND = function (e) {
    var t = e.scrollDroppable,
      n = e.scrollWindow,
      r = e.move,
      i = OD({ scrollWindow: n, scrollDroppable: t }),
      o = jD({ move: r, scrollWindow: n, scrollDroppable: t }),
      a = function (u) {
        if (u.phase === "DRAGGING") {
          if (u.movementMode === "FLUID") {
            i.scroll(u);
            return;
          }
          u.scrollJumpRequest && o(u);
        }
      },
      l = { scroll: a, start: i.start, stop: i.stop };
    return l;
  },
  Zi = "data-rbd",
  Ji = (function () {
    var e = Zi + "-drag-handle";
    return {
      base: e,
      draggableId: e + "-draggable-id",
      contextId: e + "-context-id",
    };
  })(),
  Ef = (function () {
    var e = Zi + "-draggable";
    return { base: e, contextId: e + "-context-id", id: e + "-id" };
  })(),
  RD = (function () {
    var e = Zi + "-droppable";
    return { base: e, contextId: e + "-context-id", id: e + "-id" };
  })(),
  sv = { contextId: Zi + "-scroll-container-context-id" },
  LD = function (t) {
    return function (n) {
      return "[" + n + '="' + t + '"]';
    };
  },
  bo = function (t, n) {
    return t
      .map(function (r) {
        var i = r.styles[n];
        return i ? r.selector + " { " + i + " }" : "";
      })
      .join(" ");
  },
  MD = "pointer-events: none;",
  _D = function (e) {
    var t = LD(e),
      n = (function () {
        var l = `
      cursor: -webkit-grab;
      cursor: grab;
    `;
        return {
          selector: t(Ji.contextId),
          styles: {
            always: `
          -webkit-touch-callout: none;
          -webkit-tap-highlight-color: rgba(0,0,0,0);
          touch-action: manipulation;
        `,
            resting: l,
            dragging: MD,
            dropAnimating: l,
          },
        };
      })(),
      r = (function () {
        var l =
          `
      transition: ` +
          qo.outOfTheWay +
          `;
    `;
        return {
          selector: t(Ef.contextId),
          styles: { dragging: l, dropAnimating: l, userCancel: l },
        };
      })(),
      i = {
        selector: t(RD.contextId),
        styles: { always: "overflow-anchor: none;" },
      },
      o = {
        selector: "body",
        styles: {
          dragging: `
        cursor: grabbing;
        cursor: -webkit-grabbing;
        user-select: none;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        overflow-anchor: none;
      `,
        },
      },
      a = [r, n, i, o];
    return {
      always: bo(a, "always"),
      resting: bo(a, "resting"),
      dragging: bo(a, "dragging"),
      dropAnimating: bo(a, "dropAnimating"),
      userCancel: bo(a, "userCancel"),
    };
  },
  Lt =
    typeof window < "u" &&
    typeof window.document < "u" &&
    typeof window.document.createElement < "u"
      ? S.useLayoutEffect
      : S.useEffect,
  Xc = function () {
    var t = document.querySelector("head");
    return t || U(!1), t;
  },
  uv = function (t) {
    var n = document.createElement("style");
    return t && n.setAttribute("nonce", t), (n.type = "text/css"), n;
  };
function $D(e, t) {
  var n = me(
      function () {
        return _D(e);
      },
      [e]
    ),
    r = S.useRef(null),
    i = S.useRef(null),
    o = Z(
      et(function (c) {
        var f = i.current;
        f || U(!1), (f.textContent = c);
      }),
      []
    ),
    a = Z(function (c) {
      var f = r.current;
      f || U(!1), (f.textContent = c);
    }, []);
  Lt(
    function () {
      (!r.current && !i.current) || U(!1);
      var c = uv(t),
        f = uv(t);
      return (
        (r.current = c),
        (i.current = f),
        c.setAttribute(Zi + "-always", e),
        f.setAttribute(Zi + "-dynamic", e),
        Xc().appendChild(c),
        Xc().appendChild(f),
        a(n.always),
        o(n.resting),
        function () {
          var h = function (y) {
            var w = y.current;
            w || U(!1), Xc().removeChild(w), (y.current = null);
          };
          h(r), h(i);
        }
      );
    },
    [t, a, o, n.always, n.resting, e]
  );
  var l = Z(
      function () {
        return o(n.dragging);
      },
      [o, n.dragging]
    ),
    s = Z(
      function (c) {
        if (c === "DROP") {
          o(n.dropAnimating);
          return;
        }
        o(n.userCancel);
      },
      [o, n.dropAnimating, n.userCancel]
    ),
    u = Z(
      function () {
        i.current && o(n.resting);
      },
      [o, n.resting]
    ),
    d = me(
      function () {
        return { dragging: l, dropping: s, resting: u };
      },
      [l, s, u]
    );
  return d;
}
var sw = function (e) {
  return e && e.ownerDocument ? e.ownerDocument.defaultView : window;
};
function Mu(e) {
  return e instanceof sw(e).HTMLElement;
}
function BD(e, t) {
  var n = "[" + Ji.contextId + '="' + e + '"]',
    r = Dx(document.querySelectorAll(n));
  if (!r.length) return null;
  var i = Ar(r, function (o) {
    return o.getAttribute(Ji.draggableId) === t;
  });
  return !i || !Mu(i) ? null : i;
}
function zD(e) {
  var t = S.useRef({}),
    n = S.useRef(null),
    r = S.useRef(null),
    i = S.useRef(!1),
    o = Z(function (f, h) {
      var v = { id: f, focus: h };
      return (
        (t.current[f] = v),
        function () {
          var w = t.current,
            m = w[f];
          m !== v && delete w[f];
        }
      );
    }, []),
    a = Z(
      function (f) {
        var h = BD(e, f);
        h && h !== document.activeElement && h.focus();
      },
      [e]
    ),
    l = Z(function (f, h) {
      n.current === f && (n.current = h);
    }, []),
    s = Z(
      function () {
        r.current ||
          (i.current &&
            (r.current = requestAnimationFrame(function () {
              r.current = null;
              var f = n.current;
              f && a(f);
            })));
      },
      [a]
    ),
    u = Z(function (f) {
      n.current = null;
      var h = document.activeElement;
      h && h.getAttribute(Ji.draggableId) === f && (n.current = f);
    }, []);
  Lt(function () {
    return (
      (i.current = !0),
      function () {
        i.current = !1;
        var f = r.current;
        f && cancelAnimationFrame(f);
      }
    );
  }, []);
  var d = me(
    function () {
      return {
        register: o,
        tryRecordFocus: u,
        tryRestoreFocusRecorded: s,
        tryShiftRecord: l,
      };
    },
    [o, u, s, l]
  );
  return d;
}
function FD() {
  var e = { draggables: {}, droppables: {} },
    t = [];
  function n(c) {
    return (
      t.push(c),
      function () {
        var h = t.indexOf(c);
        h !== -1 && t.splice(h, 1);
      }
    );
  }
  function r(c) {
    t.length &&
      t.forEach(function (f) {
        return f(c);
      });
  }
  function i(c) {
    return e.draggables[c] || null;
  }
  function o(c) {
    var f = i(c);
    return f || U(!1), f;
  }
  var a = {
    register: function (f) {
      (e.draggables[f.descriptor.id] = f), r({ type: "ADDITION", value: f });
    },
    update: function (f, h) {
      var v = e.draggables[h.descriptor.id];
      v &&
        v.uniqueId === f.uniqueId &&
        (delete e.draggables[h.descriptor.id],
        (e.draggables[f.descriptor.id] = f));
    },
    unregister: function (f) {
      var h = f.descriptor.id,
        v = i(h);
      v &&
        f.uniqueId === v.uniqueId &&
        (delete e.draggables[h], r({ type: "REMOVAL", value: f }));
    },
    getById: o,
    findById: i,
    exists: function (f) {
      return !!i(f);
    },
    getAllByType: function (f) {
      return Ms(e.draggables).filter(function (h) {
        return h.descriptor.type === f;
      });
    },
  };
  function l(c) {
    return e.droppables[c] || null;
  }
  function s(c) {
    var f = l(c);
    return f || U(!1), f;
  }
  var u = {
    register: function (f) {
      e.droppables[f.descriptor.id] = f;
    },
    unregister: function (f) {
      var h = l(f.descriptor.id);
      h && f.uniqueId === h.uniqueId && delete e.droppables[f.descriptor.id];
    },
    getById: s,
    findById: l,
    exists: function (f) {
      return !!l(f);
    },
    getAllByType: function (f) {
      return Ms(e.droppables).filter(function (h) {
        return h.descriptor.type === f;
      });
    },
  };
  function d() {
    (e.draggables = {}), (e.droppables = {}), (t.length = 0);
  }
  return { draggable: a, droppable: u, subscribe: n, clean: d };
}
function UD() {
  var e = me(FD, []);
  return (
    S.useEffect(
      function () {
        return function () {
          requestAnimationFrame(e.clean);
        };
      },
      [e]
    ),
    e
  );
}
var wm = H.createContext(null),
  $s = function () {
    var e = document.body;
    return e || U(!1), e;
  },
  HD = {
    position: "absolute",
    width: "1px",
    height: "1px",
    margin: "-1px",
    border: "0",
    padding: "0",
    overflow: "hidden",
    clip: "rect(0 0 0 0)",
    "clip-path": "inset(100%)",
  },
  GD = function (t) {
    return "rbd-announcement-" + t;
  };
function WD(e) {
  var t = me(
      function () {
        return GD(e);
      },
      [e]
    ),
    n = S.useRef(null);
  S.useEffect(
    function () {
      var o = document.createElement("div");
      return (
        (n.current = o),
        (o.id = t),
        o.setAttribute("aria-live", "assertive"),
        o.setAttribute("aria-atomic", "true"),
        ee(o.style, HD),
        $s().appendChild(o),
        function () {
          setTimeout(function () {
            var s = $s();
            s.contains(o) && s.removeChild(o),
              o === n.current && (n.current = null);
          });
        }
      );
    },
    [t]
  );
  var r = Z(function (i) {
    var o = n.current;
    if (o) {
      o.textContent = i;
      return;
    }
  }, []);
  return r;
}
var VD = 0,
  qD = { separator: "::" };
function bm(e, t) {
  return (
    t === void 0 && (t = qD),
    me(
      function () {
        return "" + e + t.separator + VD++;
      },
      [t.separator, e]
    )
  );
}
function YD(e) {
  var t = e.contextId,
    n = e.uniqueId;
  return "rbd-hidden-text-" + t + "-" + n;
}
function XD(e) {
  var t = e.contextId,
    n = e.text,
    r = bm("hidden-text", { separator: "-" }),
    i = me(
      function () {
        return YD({ contextId: t, uniqueId: r });
      },
      [r, t]
    );
  return (
    S.useEffect(
      function () {
        var a = document.createElement("div");
        return (
          (a.id = i),
          (a.textContent = n),
          (a.style.display = "none"),
          $s().appendChild(a),
          function () {
            var s = $s();
            s.contains(a) && s.removeChild(a);
          }
        );
      },
      [i, n]
    ),
    i
  );
}
var _u = H.createContext(null);
function uw(e) {
  var t = S.useRef(e);
  return (
    S.useEffect(function () {
      t.current = e;
    }),
    t
  );
}
function KD() {
  var e = null;
  function t() {
    return !!e;
  }
  function n(a) {
    return a === e;
  }
  function r(a) {
    e && U(!1);
    var l = { abandon: a };
    return (e = l), l;
  }
  function i() {
    e || U(!1), (e = null);
  }
  function o() {
    e && (e.abandon(), i());
  }
  return { isClaimed: t, isActive: n, claim: r, release: i, tryAbandon: o };
}
var QD = 9,
  ZD = 13,
  Sm = 27,
  cw = 32,
  JD = 33,
  e5 = 34,
  t5 = 35,
  n5 = 36,
  r5 = 37,
  i5 = 38,
  o5 = 39,
  a5 = 40,
  El,
  l5 = ((El = {}), (El[ZD] = !0), (El[QD] = !0), El),
  dw = function (e) {
    l5[e.keyCode] && e.preventDefault();
  },
  $u = (function () {
    var e = "visibilitychange";
    if (typeof document > "u") return e;
    var t = [e, "ms" + e, "webkit" + e, "moz" + e, "o" + e],
      n = Ar(t, function (r) {
        return "on" + r in document;
      });
    return n || e;
  })(),
  fw = 0,
  cv = 5;
function s5(e, t) {
  return Math.abs(t.x - e.x) >= cv || Math.abs(t.y - e.y) >= cv;
}
var dv = { type: "IDLE" };
function u5(e) {
  var t = e.cancel,
    n = e.completed,
    r = e.getPhase,
    i = e.setPhase;
  return [
    {
      eventName: "mousemove",
      fn: function (a) {
        var l = a.button,
          s = a.clientX,
          u = a.clientY;
        if (l === fw) {
          var d = { x: s, y: u },
            c = r();
          if (c.type === "DRAGGING") {
            a.preventDefault(), c.actions.move(d);
            return;
          }
          c.type !== "PENDING" && U(!1);
          var f = c.point;
          if (s5(f, d)) {
            a.preventDefault();
            var h = c.actions.fluidLift(d);
            i({ type: "DRAGGING", actions: h });
          }
        }
      },
    },
    {
      eventName: "mouseup",
      fn: function (a) {
        var l = r();
        if (l.type !== "DRAGGING") {
          t();
          return;
        }
        a.preventDefault(), l.actions.drop({ shouldBlockNextClick: !0 }), n();
      },
    },
    {
      eventName: "mousedown",
      fn: function (a) {
        r().type === "DRAGGING" && a.preventDefault(), t();
      },
    },
    {
      eventName: "keydown",
      fn: function (a) {
        var l = r();
        if (l.type === "PENDING") {
          t();
          return;
        }
        if (a.keyCode === Sm) {
          a.preventDefault(), t();
          return;
        }
        dw(a);
      },
    },
    { eventName: "resize", fn: t },
    {
      eventName: "scroll",
      options: { passive: !0, capture: !1 },
      fn: function () {
        r().type === "PENDING" && t();
      },
    },
    {
      eventName: "webkitmouseforcedown",
      fn: function (a) {
        var l = r();
        if ((l.type === "IDLE" && U(!1), l.actions.shouldRespectForcePress())) {
          t();
          return;
        }
        a.preventDefault();
      },
    },
    { eventName: $u, fn: t },
  ];
}
function c5(e) {
  var t = S.useRef(dv),
    n = S.useRef(vr),
    r = me(
      function () {
        return {
          eventName: "mousedown",
          fn: function (c) {
            if (
              !c.defaultPrevented &&
              c.button === fw &&
              !(c.ctrlKey || c.metaKey || c.shiftKey || c.altKey)
            ) {
              var f = e.findClosestDraggableId(c);
              if (f) {
                var h = e.tryGetLock(f, a, { sourceEvent: c });
                if (h) {
                  c.preventDefault();
                  var v = { x: c.clientX, y: c.clientY };
                  n.current(), u(h, v);
                }
              }
            }
          },
        };
      },
      [e]
    ),
    i = me(
      function () {
        return {
          eventName: "webkitmouseforcewillbegin",
          fn: function (c) {
            if (!c.defaultPrevented) {
              var f = e.findClosestDraggableId(c);
              if (f) {
                var h = e.findOptionsForDraggable(f);
                h &&
                  (h.shouldRespectForcePress ||
                    (e.canGetLock(f) && c.preventDefault()));
              }
            }
          },
        };
      },
      [e]
    ),
    o = Z(
      function () {
        var c = { passive: !1, capture: !0 };
        n.current = Kt(window, [i, r], c);
      },
      [i, r]
    ),
    a = Z(
      function () {
        var d = t.current;
        d.type !== "IDLE" && ((t.current = dv), n.current(), o());
      },
      [o]
    ),
    l = Z(
      function () {
        var d = t.current;
        a(),
          d.type === "DRAGGING" &&
            d.actions.cancel({ shouldBlockNextClick: !0 }),
          d.type === "PENDING" && d.actions.abort();
      },
      [a]
    ),
    s = Z(
      function () {
        var c = { capture: !0, passive: !1 },
          f = u5({
            cancel: l,
            completed: a,
            getPhase: function () {
              return t.current;
            },
            setPhase: function (v) {
              t.current = v;
            },
          });
        n.current = Kt(window, f, c);
      },
      [l, a]
    ),
    u = Z(
      function (c, f) {
        t.current.type !== "IDLE" && U(!1),
          (t.current = { type: "PENDING", point: f, actions: c }),
          s();
      },
      [s]
    );
  Lt(
    function () {
      return (
        o(),
        function () {
          n.current();
        }
      );
    },
    [o]
  );
}
var mi;
function d5() {}
var f5 =
  ((mi = {}), (mi[e5] = !0), (mi[JD] = !0), (mi[n5] = !0), (mi[t5] = !0), mi);
function p5(e, t) {
  function n() {
    t(), e.cancel();
  }
  function r() {
    t(), e.drop();
  }
  return [
    {
      eventName: "keydown",
      fn: function (o) {
        if (o.keyCode === Sm) {
          o.preventDefault(), n();
          return;
        }
        if (o.keyCode === cw) {
          o.preventDefault(), r();
          return;
        }
        if (o.keyCode === a5) {
          o.preventDefault(), e.moveDown();
          return;
        }
        if (o.keyCode === i5) {
          o.preventDefault(), e.moveUp();
          return;
        }
        if (o.keyCode === o5) {
          o.preventDefault(), e.moveRight();
          return;
        }
        if (o.keyCode === r5) {
          o.preventDefault(), e.moveLeft();
          return;
        }
        if (f5[o.keyCode]) {
          o.preventDefault();
          return;
        }
        dw(o);
      },
    },
    { eventName: "mousedown", fn: n },
    { eventName: "mouseup", fn: n },
    { eventName: "click", fn: n },
    { eventName: "touchstart", fn: n },
    { eventName: "resize", fn: n },
    { eventName: "wheel", fn: n, options: { passive: !0 } },
    { eventName: $u, fn: n },
  ];
}
function m5(e) {
  var t = S.useRef(d5),
    n = me(
      function () {
        return {
          eventName: "keydown",
          fn: function (o) {
            if (o.defaultPrevented || o.keyCode !== cw) return;
            var a = e.findClosestDraggableId(o);
            if (!a) return;
            var l = e.tryGetLock(a, d, { sourceEvent: o });
            if (!l) return;
            o.preventDefault();
            var s = !0,
              u = l.snapLift();
            t.current();
            function d() {
              s || U(!1), (s = !1), t.current(), r();
            }
            t.current = Kt(window, p5(u, d), { capture: !0, passive: !1 });
          },
        };
      },
      [e]
    ),
    r = Z(
      function () {
        var o = { passive: !1, capture: !0 };
        t.current = Kt(window, [n], o);
      },
      [n]
    );
  Lt(
    function () {
      return (
        r(),
        function () {
          t.current();
        }
      );
    },
    [r]
  );
}
var Kc = { type: "IDLE" },
  h5 = 120,
  g5 = 0.15;
function v5(e) {
  var t = e.cancel,
    n = e.getPhase;
  return [
    { eventName: "orientationchange", fn: t },
    { eventName: "resize", fn: t },
    {
      eventName: "contextmenu",
      fn: function (i) {
        i.preventDefault();
      },
    },
    {
      eventName: "keydown",
      fn: function (i) {
        if (n().type !== "DRAGGING") {
          t();
          return;
        }
        i.keyCode === Sm && i.preventDefault(), t();
      },
    },
    { eventName: $u, fn: t },
  ];
}
function y5(e) {
  var t = e.cancel,
    n = e.completed,
    r = e.getPhase;
  return [
    {
      eventName: "touchmove",
      options: { capture: !1 },
      fn: function (o) {
        var a = r();
        if (a.type !== "DRAGGING") {
          t();
          return;
        }
        a.hasMoved = !0;
        var l = o.touches[0],
          s = l.clientX,
          u = l.clientY,
          d = { x: s, y: u };
        o.preventDefault(), a.actions.move(d);
      },
    },
    {
      eventName: "touchend",
      fn: function (o) {
        var a = r();
        if (a.type !== "DRAGGING") {
          t();
          return;
        }
        o.preventDefault(), a.actions.drop({ shouldBlockNextClick: !0 }), n();
      },
    },
    {
      eventName: "touchcancel",
      fn: function (o) {
        if (r().type !== "DRAGGING") {
          t();
          return;
        }
        o.preventDefault(), t();
      },
    },
    {
      eventName: "touchforcechange",
      fn: function (o) {
        var a = r();
        a.type === "IDLE" && U(!1);
        var l = o.touches[0];
        if (l) {
          var s = l.force >= g5;
          if (s) {
            var u = a.actions.shouldRespectForcePress();
            if (a.type === "PENDING") {
              u && t();
              return;
            }
            if (u) {
              if (a.hasMoved) {
                o.preventDefault();
                return;
              }
              t();
              return;
            }
            o.preventDefault();
          }
        }
      },
    },
    { eventName: $u, fn: t },
  ];
}
function x5(e) {
  var t = S.useRef(Kc),
    n = S.useRef(vr),
    r = Z(function () {
      return t.current;
    }, []),
    i = Z(function (h) {
      t.current = h;
    }, []),
    o = me(
      function () {
        return {
          eventName: "touchstart",
          fn: function (h) {
            if (!h.defaultPrevented) {
              var v = e.findClosestDraggableId(h);
              if (v) {
                var y = e.tryGetLock(v, l, { sourceEvent: h });
                if (y) {
                  var w = h.touches[0],
                    m = w.clientX,
                    g = w.clientY,
                    x = { x: m, y: g };
                  n.current(), c(y, x);
                }
              }
            }
          },
        };
      },
      [e]
    ),
    a = Z(
      function () {
        var h = { capture: !0, passive: !1 };
        n.current = Kt(window, [o], h);
      },
      [o]
    ),
    l = Z(
      function () {
        var f = t.current;
        f.type !== "IDLE" &&
          (f.type === "PENDING" && clearTimeout(f.longPressTimerId),
          i(Kc),
          n.current(),
          a());
      },
      [a, i]
    ),
    s = Z(
      function () {
        var f = t.current;
        l(),
          f.type === "DRAGGING" &&
            f.actions.cancel({ shouldBlockNextClick: !0 }),
          f.type === "PENDING" && f.actions.abort();
      },
      [l]
    ),
    u = Z(
      function () {
        var h = { capture: !0, passive: !1 },
          v = { cancel: s, completed: l, getPhase: r },
          y = Kt(window, y5(v), h),
          w = Kt(window, v5(v), h);
        n.current = function () {
          y(), w();
        };
      },
      [s, r, l]
    ),
    d = Z(
      function () {
        var h = r();
        h.type !== "PENDING" && U(!1);
        var v = h.actions.fluidLift(h.point);
        i({ type: "DRAGGING", actions: v, hasMoved: !1 });
      },
      [r, i]
    ),
    c = Z(
      function (h, v) {
        r().type !== "IDLE" && U(!1);
        var y = setTimeout(d, h5);
        i({ type: "PENDING", point: v, actions: h, longPressTimerId: y }), u();
      },
      [u, r, i, d]
    );
  Lt(
    function () {
      return (
        a(),
        function () {
          n.current();
          var v = r();
          v.type === "PENDING" && (clearTimeout(v.longPressTimerId), i(Kc));
        }
      );
    },
    [r, a, i]
  ),
    Lt(function () {
      var h = Kt(window, [
        {
          eventName: "touchmove",
          fn: function () {},
          options: { capture: !1, passive: !1 },
        },
      ]);
      return h;
    }, []);
}
var w5 = {
  input: !0,
  button: !0,
  textarea: !0,
  select: !0,
  option: !0,
  optgroup: !0,
  video: !0,
  audio: !0,
};
function pw(e, t) {
  if (t == null) return !1;
  var n = !!w5[t.tagName.toLowerCase()];
  if (n) return !0;
  var r = t.getAttribute("contenteditable");
  return r === "true" || r === "" ? !0 : t === e ? !1 : pw(e, t.parentElement);
}
function b5(e, t) {
  var n = t.target;
  return Mu(n) ? pw(e, n) : !1;
}
var S5 = function (e) {
  return fn(e.getBoundingClientRect()).center;
};
function C5(e) {
  return e instanceof sw(e).Element;
}
var E5 = (function () {
  var e = "matches";
  if (typeof document > "u") return e;
  var t = [e, "msMatchesSelector", "webkitMatchesSelector"],
    n = Ar(t, function (r) {
      return r in Element.prototype;
    });
  return n || e;
})();
function mw(e, t) {
  return e == null ? null : e[E5](t) ? e : mw(e.parentElement, t);
}
function T5(e, t) {
  return e.closest ? e.closest(t) : mw(e, t);
}
function k5(e) {
  return "[" + Ji.contextId + '="' + e + '"]';
}
function P5(e, t) {
  var n = t.target;
  if (!C5(n)) return null;
  var r = k5(e),
    i = T5(n, r);
  return !i || !Mu(i) ? null : i;
}
function I5(e, t) {
  var n = P5(e, t);
  return n ? n.getAttribute(Ji.draggableId) : null;
}
function A5(e, t) {
  var n = "[" + Ef.contextId + '="' + e + '"]',
    r = Dx(document.querySelectorAll(n)),
    i = Ar(r, function (o) {
      return o.getAttribute(Ef.id) === t;
    });
  return !i || !Mu(i) ? null : i;
}
function D5(e) {
  e.preventDefault();
}
function Tl(e) {
  var t = e.expected,
    n = e.phase,
    r = e.isLockActive;
  return e.shouldWarn, !(!r() || t !== n);
}
function hw(e) {
  var t = e.lockAPI,
    n = e.store,
    r = e.registry,
    i = e.draggableId;
  if (t.isClaimed()) return !1;
  var o = r.draggable.findById(i);
  return !(!o || !o.options.isEnabled || !iw(n.getState(), i));
}
function O5(e) {
  var t = e.lockAPI,
    n = e.contextId,
    r = e.store,
    i = e.registry,
    o = e.draggableId,
    a = e.forceSensorStop,
    l = e.sourceEvent,
    s = hw({ lockAPI: t, store: r, registry: i, draggableId: o });
  if (!s) return null;
  var u = i.draggable.getById(o),
    d = A5(n, u.descriptor.id);
  if (!d || (l && !u.options.canDragInteractiveElements && b5(d, l)))
    return null;
  var c = t.claim(a || vr),
    f = "PRE_DRAG";
  function h() {
    return u.options.shouldRespectForcePress;
  }
  function v() {
    return t.isActive(c);
  }
  function y(E, P) {
    Tl({ expected: E, phase: f, isLockActive: v, shouldWarn: !0 }) &&
      r.dispatch(P());
  }
  var w = y.bind(null, "DRAGGING");
  function m(E) {
    function P() {
      t.release(), (f = "COMPLETED");
    }
    f !== "PRE_DRAG" && (P(), f !== "PRE_DRAG" && U(!1)),
      r.dispatch(EA(E.liftActionArgs)),
      (f = "DRAGGING");
    function T(I, O) {
      if (
        (O === void 0 && (O = { shouldBlockNextClick: !1 }),
        E.cleanup(),
        O.shouldBlockNextClick)
      ) {
        var D = Kt(window, [
          {
            eventName: "click",
            fn: D5,
            options: { once: !0, passive: !1, capture: !0 },
          },
        ]);
        setTimeout(D);
      }
      P(), r.dispatch(Qx({ reason: I }));
    }
    return ee(
      {
        isActive: function () {
          return Tl({
            expected: "DRAGGING",
            phase: f,
            isLockActive: v,
            shouldWarn: !1,
          });
        },
        shouldRespectForcePress: h,
        drop: function (O) {
          return T("DROP", O);
        },
        cancel: function (O) {
          return T("CANCEL", O);
        },
      },
      E.actions
    );
  }
  function g(E) {
    var P = wa(function (I) {
        w(function () {
          return Kx({ client: I });
        });
      }),
      T = m({
        liftActionArgs: { id: o, clientSelection: E, movementMode: "FLUID" },
        cleanup: function () {
          return P.cancel();
        },
        actions: { move: P },
      });
    return ee({}, T, { move: P });
  }
  function x() {
    var E = {
      moveUp: function () {
        return w(NA);
      },
      moveRight: function () {
        return w(LA);
      },
      moveDown: function () {
        return w(RA);
      },
      moveLeft: function () {
        return w(MA);
      },
    };
    return m({
      liftActionArgs: { id: o, clientSelection: S5(d), movementMode: "SNAP" },
      cleanup: vr,
      actions: E,
    });
  }
  function b() {
    var E = Tl({
      expected: "PRE_DRAG",
      phase: f,
      isLockActive: v,
      shouldWarn: !0,
    });
    E && t.release();
  }
  var C = {
    isActive: function () {
      return Tl({
        expected: "PRE_DRAG",
        phase: f,
        isLockActive: v,
        shouldWarn: !1,
      });
    },
    shouldRespectForcePress: h,
    fluidLift: g,
    snapLift: x,
    abort: b,
  };
  return C;
}
var j5 = [c5, m5, x5];
function N5(e) {
  var t = e.contextId,
    n = e.store,
    r = e.registry,
    i = e.customSensors,
    o = e.enableDefaultSensors,
    a = [].concat(o ? j5 : [], i || []),
    l = S.useState(function () {
      return KD();
    })[0],
    s = Z(
      function (g, x) {
        g.isDragging && !x.isDragging && l.tryAbandon();
      },
      [l]
    );
  Lt(
    function () {
      var g = n.getState(),
        x = n.subscribe(function () {
          var b = n.getState();
          s(g, b), (g = b);
        });
      return x;
    },
    [l, n, s]
  ),
    Lt(
      function () {
        return l.tryAbandon;
      },
      [l.tryAbandon]
    );
  for (
    var u = Z(
        function (m) {
          return hw({ lockAPI: l, registry: r, store: n, draggableId: m });
        },
        [l, r, n]
      ),
      d = Z(
        function (m, g, x) {
          return O5({
            lockAPI: l,
            registry: r,
            contextId: t,
            store: n,
            draggableId: m,
            forceSensorStop: g,
            sourceEvent: x && x.sourceEvent ? x.sourceEvent : null,
          });
        },
        [t, l, r, n]
      ),
      c = Z(
        function (m) {
          return I5(t, m);
        },
        [t]
      ),
      f = Z(
        function (m) {
          var g = r.draggable.findById(m);
          return g ? g.options : null;
        },
        [r.draggable]
      ),
      h = Z(
        function () {
          l.isClaimed() &&
            (l.tryAbandon(), n.getState().phase !== "IDLE" && n.dispatch(fm()));
        },
        [l, n]
      ),
      v = Z(l.isClaimed, [l]),
      y = me(
        function () {
          return {
            canGetLock: u,
            tryGetLock: d,
            findClosestDraggableId: c,
            findOptionsForDraggable: f,
            tryReleaseLock: h,
            isLockClaimed: v,
          };
        },
        [u, d, c, f, h, v]
      ),
      w = 0;
    w < a.length;
    w++
  )
    a[w](y);
}
var R5 = function (t) {
  return {
    onBeforeCapture: t.onBeforeCapture,
    onBeforeDragStart: t.onBeforeDragStart,
    onDragStart: t.onDragStart,
    onDragEnd: t.onDragEnd,
    onDragUpdate: t.onDragUpdate,
  };
};
function So(e) {
  return e.current || U(!1), e.current;
}
function L5(e) {
  var t = e.contextId,
    n = e.setCallbacks,
    r = e.sensors,
    i = e.nonce,
    o = e.dragHandleUsageInstructions,
    a = S.useRef(null),
    l = uw(e),
    s = Z(
      function () {
        return R5(l.current);
      },
      [l]
    ),
    u = WD(t),
    d = XD({ contextId: t, text: o }),
    c = $D(t, i),
    f = Z(function (I) {
      So(a).dispatch(I);
    }, []),
    h = me(
      function () {
        return Cg(
          {
            publishWhileDragging: kA,
            updateDroppableScroll: IA,
            updateDroppableIsEnabled: AA,
            updateDroppableIsCombineEnabled: DA,
            collectionStarting: PA,
          },
          f
        );
      },
      [f]
    ),
    v = UD(),
    y = me(
      function () {
        return gD(v, h);
      },
      [v, h]
    ),
    w = me(
      function () {
        return ND(
          ee(
            { scrollWindow: vD, scrollDroppable: y.scrollDroppable },
            Cg({ move: Kx }, f)
          )
        );
      },
      [y.scrollDroppable, f]
    ),
    m = zD(t),
    g = me(
      function () {
        return fD({
          announce: u,
          autoScroller: w,
          dimensionMarshal: y,
          focusMarshal: m,
          getResponders: s,
          styleMarshal: c,
        });
      },
      [u, w, y, m, s, c]
    );
  a.current = g;
  var x = Z(function () {
      var I = So(a),
        O = I.getState();
      O.phase !== "IDLE" && I.dispatch(fm());
    }, []),
    b = Z(function () {
      var I = So(a).getState();
      return I.isDragging || I.phase === "DROP_ANIMATING";
    }, []),
    C = me(
      function () {
        return { isDragging: b, tryAbort: x };
      },
      [b, x]
    );
  n(C);
  var E = Z(function (I) {
      return iw(So(a).getState(), I);
    }, []),
    P = Z(function () {
      return Br(So(a).getState());
    }, []),
    T = me(
      function () {
        return {
          marshal: y,
          focus: m,
          contextId: t,
          canLift: E,
          isMovementAllowed: P,
          dragHandleUsageInstructionsId: d,
          registry: v,
        };
      },
      [t, y, d, m, E, P, v]
    );
  return (
    N5({
      contextId: t,
      store: g,
      registry: v,
      customSensors: r,
      enableDefaultSensors: e.enableDefaultSensors !== !1,
    }),
    S.useEffect(
      function () {
        return x;
      },
      [x]
    ),
    H.createElement(
      _u.Provider,
      { value: T },
      H.createElement(g4, { context: wm, store: g }, e.children)
    )
  );
}
var M5 = 0;
function _5() {
  return me(function () {
    return "" + M5++;
  }, []);
}
function $5(e) {
  var t = _5(),
    n = e.dragHandleUsageInstructions || Vl.dragHandleUsageInstructions;
  return H.createElement(mI, null, function (r) {
    return H.createElement(
      L5,
      {
        nonce: e.nonce,
        contextId: t,
        setCallbacks: r,
        dragHandleUsageInstructions: n,
        enableDefaultSensors: e.enableDefaultSensors,
        sensors: e.sensors,
        onBeforeCapture: e.onBeforeCapture,
        onBeforeDragStart: e.onBeforeDragStart,
        onDragStart: e.onDragStart,
        onDragUpdate: e.onDragUpdate,
        onDragEnd: e.onDragEnd,
      },
      e.children
    );
  });
}
var gw = function (t) {
    return function (n) {
      return t === n;
    };
  },
  B5 = gw("scroll"),
  z5 = gw("auto"),
  fv = function (t, n) {
    return n(t.overflowX) || n(t.overflowY);
  },
  F5 = function (t) {
    var n = window.getComputedStyle(t),
      r = { overflowX: n.overflowX, overflowY: n.overflowY };
    return fv(r, B5) || fv(r, z5);
  },
  U5 = function () {
    return !1;
  },
  H5 = function e(t) {
    return t == null
      ? null
      : t === document.body
      ? U5()
        ? t
        : null
      : t === document.documentElement
      ? null
      : F5(t)
      ? t
      : e(t.parentElement);
  },
  Tf = function (e) {
    return { x: e.scrollLeft, y: e.scrollTop };
  },
  G5 = function e(t) {
    if (!t) return !1;
    var n = window.getComputedStyle(t);
    return n.position === "fixed" ? !0 : e(t.parentElement);
  },
  W5 = function (e) {
    var t = H5(e),
      n = G5(e);
    return { closestScrollable: t, isFixedOnPage: n };
  },
  V5 = function (e) {
    var t = e.descriptor,
      n = e.isEnabled,
      r = e.isCombineEnabled,
      i = e.isFixedOnPage,
      o = e.direction,
      a = e.client,
      l = e.page,
      s = e.closest,
      u = (function () {
        if (!s) return null;
        var h = s.scrollSize,
          v = s.client,
          y = tw({
            scrollHeight: h.scrollHeight,
            scrollWidth: h.scrollWidth,
            height: v.paddingBox.height,
            width: v.paddingBox.width,
          });
        return {
          pageMarginBox: s.page.marginBox,
          frameClient: v,
          scrollSize: h,
          shouldClipSubject: s.shouldClipSubject,
          scroll: {
            initial: s.scroll,
            current: s.scroll,
            max: y,
            diff: { value: tt, displacement: tt },
          },
        };
      })(),
      d = o === "vertical" ? lm : Lx,
      c = Qi({ page: l, withPlaceholder: null, axis: d, frame: u }),
      f = {
        descriptor: t,
        isCombineEnabled: r,
        isFixedOnPage: i,
        axis: d,
        isEnabled: n,
        client: a,
        page: l,
        frame: u,
        subject: c,
      };
    return f;
  },
  q5 = function (t, n) {
    var r = Tx(t);
    if (!n || t !== n) return r;
    var i = r.paddingBox.top - n.scrollTop,
      o = r.paddingBox.left - n.scrollLeft,
      a = i + n.scrollHeight,
      l = o + n.scrollWidth,
      s = { top: i, right: l, bottom: a, left: o },
      u = nm(s, r.border),
      d = rm({
        borderBox: u,
        margin: r.margin,
        border: r.border,
        padding: r.padding,
      });
    return d;
  },
  Y5 = function (e) {
    var t = e.ref,
      n = e.descriptor,
      r = e.env,
      i = e.windowScroll,
      o = e.direction,
      a = e.isDropDisabled,
      l = e.isCombineEnabled,
      s = e.shouldClipSubject,
      u = r.closestScrollable,
      d = q5(t, u),
      c = Ns(d, i),
      f = (function () {
        if (!u) return null;
        var v = Tx(u),
          y = { scrollHeight: u.scrollHeight, scrollWidth: u.scrollWidth };
        return {
          client: v,
          page: Ns(v, i),
          scroll: Tf(u),
          scrollSize: y,
          shouldClipSubject: s,
        };
      })(),
      h = V5({
        descriptor: n,
        isEnabled: !a,
        isCombineEnabled: l,
        isFixedOnPage: r.isFixedOnPage,
        direction: o,
        client: d,
        page: c,
        closest: f,
      });
    return h;
  },
  X5 = { passive: !1 },
  K5 = { passive: !0 },
  pv = function (e) {
    return e.shouldPublishImmediately ? X5 : K5;
  };
function Bs(e) {
  var t = S.useContext(e);
  return t || U(!1), t;
}
var kl = function (t) {
  return (t && t.env.closestScrollable) || null;
};
function Q5(e) {
  var t = S.useRef(null),
    n = Bs(_u),
    r = bm("droppable"),
    i = n.registry,
    o = n.marshal,
    a = uw(e),
    l = me(
      function () {
        return { id: e.droppableId, type: e.type, mode: e.mode };
      },
      [e.droppableId, e.mode, e.type]
    ),
    s = S.useRef(l),
    u = me(
      function () {
        return et(function (b, C) {
          t.current || U(!1);
          var E = { x: b, y: C };
          o.updateDroppableScroll(l.id, E);
        });
      },
      [l.id, o]
    ),
    d = Z(function () {
      var b = t.current;
      return !b || !b.env.closestScrollable ? tt : Tf(b.env.closestScrollable);
    }, []),
    c = Z(
      function () {
        var b = d();
        u(b.x, b.y);
      },
      [d, u]
    ),
    f = me(
      function () {
        return wa(c);
      },
      [c]
    ),
    h = Z(
      function () {
        var b = t.current,
          C = kl(b);
        (b && C) || U(!1);
        var E = b.scrollOptions;
        if (E.shouldPublishImmediately) {
          c();
          return;
        }
        f();
      },
      [f, c]
    ),
    v = Z(
      function (b, C) {
        t.current && U(!1);
        var E = a.current,
          P = E.getDroppableRef();
        P || U(!1);
        var T = W5(P),
          I = { ref: P, descriptor: l, env: T, scrollOptions: C };
        t.current = I;
        var O = Y5({
            ref: P,
            descriptor: l,
            env: T,
            windowScroll: b,
            direction: E.direction,
            isDropDisabled: E.isDropDisabled,
            isCombineEnabled: E.isCombineEnabled,
            shouldClipSubject: !E.ignoreContainerClipping,
          }),
          D = T.closestScrollable;
        return (
          D &&
            (D.setAttribute(sv.contextId, n.contextId),
            D.addEventListener("scroll", h, pv(I.scrollOptions))),
          O
        );
      },
      [n.contextId, l, h, a]
    ),
    y = Z(function () {
      var b = t.current,
        C = kl(b);
      return (b && C) || U(!1), Tf(C);
    }, []),
    w = Z(
      function () {
        var b = t.current;
        b || U(!1);
        var C = kl(b);
        (t.current = null),
          C &&
            (f.cancel(),
            C.removeAttribute(sv.contextId),
            C.removeEventListener("scroll", h, pv(b.scrollOptions)));
      },
      [h, f]
    ),
    m = Z(function (b) {
      var C = t.current;
      C || U(!1);
      var E = kl(C);
      E || U(!1), (E.scrollTop += b.y), (E.scrollLeft += b.x);
    }, []),
    g = me(
      function () {
        return {
          getDimensionAndWatchScroll: v,
          getScrollWhileDragging: y,
          dragStopped: w,
          scroll: m,
        };
      },
      [w, v, y, m]
    ),
    x = me(
      function () {
        return { uniqueId: r, descriptor: l, callbacks: g };
      },
      [g, l, r]
    );
  Lt(
    function () {
      return (
        (s.current = x.descriptor),
        i.droppable.register(x),
        function () {
          t.current && w(), i.droppable.unregister(x);
        }
      );
    },
    [g, l, w, x, o, i.droppable]
  ),
    Lt(
      function () {
        t.current &&
          o.updateDroppableIsEnabled(s.current.id, !e.isDropDisabled);
      },
      [e.isDropDisabled, o]
    ),
    Lt(
      function () {
        t.current &&
          o.updateDroppableIsCombineEnabled(s.current.id, e.isCombineEnabled);
      },
      [e.isCombineEnabled, o]
    );
}
function Qc() {}
var mv = { width: 0, height: 0, margin: wI },
  Z5 = function (t) {
    var n = t.isAnimatingOpenOnMount,
      r = t.placeholder,
      i = t.animate;
    return n || i === "close"
      ? mv
      : {
          height: r.client.borderBox.height,
          width: r.client.borderBox.width,
          margin: r.client.margin,
        };
  },
  J5 = function (t) {
    var n = t.isAnimatingOpenOnMount,
      r = t.placeholder,
      i = t.animate,
      o = Z5({ isAnimatingOpenOnMount: n, placeholder: r, animate: i });
    return {
      display: r.display,
      boxSizing: "border-box",
      width: o.width,
      height: o.height,
      marginTop: o.margin.top,
      marginRight: o.margin.right,
      marginBottom: o.margin.bottom,
      marginLeft: o.margin.left,
      flexShrink: "0",
      flexGrow: "0",
      pointerEvents: "none",
      transition: i !== "none" ? qo.placeholder : null,
    };
  };
function eO(e) {
  var t = S.useRef(null),
    n = Z(function () {
      t.current && (clearTimeout(t.current), (t.current = null));
    }, []),
    r = e.animate,
    i = e.onTransitionEnd,
    o = e.onClose,
    a = e.contextId,
    l = S.useState(e.animate === "open"),
    s = l[0],
    u = l[1];
  S.useEffect(
    function () {
      return s
        ? r !== "open"
          ? (n(), u(!1), Qc)
          : t.current
          ? Qc
          : ((t.current = setTimeout(function () {
              (t.current = null), u(!1);
            })),
            n)
        : Qc;
    },
    [r, s, n]
  );
  var d = Z(
      function (f) {
        f.propertyName === "height" && (i(), r === "close" && o());
      },
      [r, o, i]
    ),
    c = J5({
      isAnimatingOpenOnMount: s,
      animate: e.animate,
      placeholder: e.placeholder,
    });
  return H.createElement(e.placeholder.tagName, {
    style: c,
    "data-rbd-placeholder-context-id": a,
    onTransitionEnd: d,
    ref: e.innerRef,
  });
}
var tO = H.memo(eO),
  Cm = H.createContext(null),
  nO = (function (e) {
    lx(t, e);
    function t() {
      for (var r, i = arguments.length, o = new Array(i), a = 0; a < i; a++)
        o[a] = arguments[a];
      return (
        (r = e.call.apply(e, [this].concat(o)) || this),
        (r.state = {
          isVisible: !!r.props.on,
          data: r.props.on,
          animate: r.props.shouldAnimate && r.props.on ? "open" : "none",
        }),
        (r.onClose = function () {
          r.state.animate === "close" && r.setState({ isVisible: !1 });
        }),
        r
      );
    }
    t.getDerivedStateFromProps = function (i, o) {
      return i.shouldAnimate
        ? i.on
          ? { isVisible: !0, data: i.on, animate: "open" }
          : o.isVisible
          ? { isVisible: !0, data: o.data, animate: "close" }
          : { isVisible: !1, animate: "close", data: null }
        : { isVisible: !!i.on, data: i.on, animate: "none" };
    };
    var n = t.prototype;
    return (
      (n.render = function () {
        if (!this.state.isVisible) return null;
        var i = {
          onClose: this.onClose,
          data: this.state.data,
          animate: this.state.animate,
        };
        return this.props.children(i);
      }),
      t
    );
  })(H.PureComponent),
  hv = { dragging: 5e3, dropAnimating: 4500 },
  rO = function (t, n) {
    return n ? qo.drop(n.duration) : t ? qo.snap : qo.fluid;
  },
  iO = function (t, n) {
    return t ? (n ? Ea.opacity.drop : Ea.opacity.combining) : null;
  },
  oO = function (t) {
    return t.forceShouldAnimate != null
      ? t.forceShouldAnimate
      : t.mode === "SNAP";
  };
function aO(e) {
  var t = e.dimension,
    n = t.client,
    r = e.offset,
    i = e.combineWith,
    o = e.dropping,
    a = !!i,
    l = oO(e),
    s = !!o,
    u = s ? Sf.drop(r, a) : Sf.moveTo(r),
    d = {
      position: "fixed",
      top: n.marginBox.top,
      left: n.marginBox.left,
      boxSizing: "border-box",
      width: n.borderBox.width,
      height: n.borderBox.height,
      transition: rO(l, o),
      transform: u,
      opacity: iO(a, s),
      zIndex: s ? hv.dropAnimating : hv.dragging,
      pointerEvents: "none",
    };
  return d;
}
function lO(e) {
  return {
    transform: Sf.moveTo(e.offset),
    transition: e.shouldAnimateDisplacement ? null : "none",
  };
}
function sO(e) {
  return e.type === "DRAGGING" ? aO(e) : lO(e);
}
function uO(e, t, n) {
  n === void 0 && (n = tt);
  var r = window.getComputedStyle(t),
    i = t.getBoundingClientRect(),
    o = Ex(i, r),
    a = Ns(o, n),
    l = { client: o, tagName: t.tagName.toLowerCase(), display: r.display },
    s = { x: o.marginBox.width, y: o.marginBox.height },
    u = { descriptor: e, placeholder: l, displaceBy: s, client: o, page: a };
  return u;
}
function cO(e) {
  var t = bm("draggable"),
    n = e.descriptor,
    r = e.registry,
    i = e.getDraggableRef,
    o = e.canDragInteractiveElements,
    a = e.shouldRespectForcePress,
    l = e.isEnabled,
    s = me(
      function () {
        return {
          canDragInteractiveElements: o,
          shouldRespectForcePress: a,
          isEnabled: l,
        };
      },
      [o, l, a]
    ),
    u = Z(
      function (h) {
        var v = i();
        return v || U(!1), uO(n, v, h);
      },
      [n, i]
    ),
    d = me(
      function () {
        return { uniqueId: t, descriptor: n, options: s, getDimension: u };
      },
      [n, u, s, t]
    ),
    c = S.useRef(d),
    f = S.useRef(!0);
  Lt(
    function () {
      return (
        r.draggable.register(c.current),
        function () {
          return r.draggable.unregister(c.current);
        }
      );
    },
    [r.draggable]
  ),
    Lt(
      function () {
        if (f.current) {
          f.current = !1;
          return;
        }
        var h = c.current;
        (c.current = d), r.draggable.update(d, h);
      },
      [d, r.draggable]
    );
}
function dO(e) {
  e.preventDefault();
}
function fO(e) {
  var t = S.useRef(null),
    n = Z(function (I) {
      t.current = I;
    }, []),
    r = Z(function () {
      return t.current;
    }, []),
    i = Bs(_u),
    o = i.contextId,
    a = i.dragHandleUsageInstructionsId,
    l = i.registry,
    s = Bs(Cm),
    u = s.type,
    d = s.droppableId,
    c = me(
      function () {
        return { id: e.draggableId, index: e.index, type: u, droppableId: d };
      },
      [e.draggableId, e.index, u, d]
    ),
    f = e.children,
    h = e.draggableId,
    v = e.isEnabled,
    y = e.shouldRespectForcePress,
    w = e.canDragInteractiveElements,
    m = e.isClone,
    g = e.mapped,
    x = e.dropAnimationFinished;
  if (!m) {
    var b = me(
      function () {
        return {
          descriptor: c,
          registry: l,
          getDraggableRef: r,
          canDragInteractiveElements: w,
          shouldRespectForcePress: y,
          isEnabled: v,
        };
      },
      [c, l, r, w, y, v]
    );
    cO(b);
  }
  var C = me(
      function () {
        return v
          ? {
              tabIndex: 0,
              role: "button",
              "aria-describedby": a,
              "data-rbd-drag-handle-draggable-id": h,
              "data-rbd-drag-handle-context-id": o,
              draggable: !1,
              onDragStart: dO,
            }
          : null;
      },
      [o, a, h, v]
    ),
    E = Z(
      function (I) {
        g.type === "DRAGGING" &&
          g.dropping &&
          I.propertyName === "transform" &&
          x();
      },
      [x, g]
    ),
    P = me(
      function () {
        var I = sO(g),
          O = g.type === "DRAGGING" && g.dropping ? E : null,
          D = {
            innerRef: n,
            draggableProps: {
              "data-rbd-draggable-context-id": o,
              "data-rbd-draggable-id": h,
              style: I,
              onTransitionEnd: O,
            },
            dragHandleProps: C,
          };
        return D;
      },
      [o, C, h, g, E, n]
    ),
    T = me(
      function () {
        return {
          draggableId: c.id,
          type: c.type,
          source: { index: c.index, droppableId: c.droppableId },
        };
      },
      [c.droppableId, c.id, c.index, c.type]
    );
  return f(P, g.snapshot, T);
}
var vw = function (e, t) {
    return e === t;
  },
  yw = function (e) {
    var t = e.combine,
      n = e.destination;
    return n ? n.droppableId : t ? t.droppableId : null;
  },
  pO = function (t) {
    return t.combine ? t.combine.draggableId : null;
  },
  mO = function (t) {
    return t.at && t.at.type === "COMBINE" ? t.at.combine.draggableId : null;
  };
function hO() {
  var e = et(function (i, o) {
      return { x: i, y: o };
    }),
    t = et(function (i, o, a, l, s) {
      return {
        isDragging: !0,
        isClone: o,
        isDropAnimating: !!s,
        dropAnimation: s,
        mode: i,
        draggingOver: a,
        combineWith: l,
        combineTargetFor: null,
      };
    }),
    n = et(function (i, o, a, l, s, u, d) {
      return {
        mapped: {
          type: "DRAGGING",
          dropping: null,
          draggingOver: s,
          combineWith: u,
          mode: o,
          offset: i,
          dimension: a,
          forceShouldAnimate: d,
          snapshot: t(o, l, s, u, null),
        },
      };
    }),
    r = function (o, a) {
      if (o.isDragging) {
        if (o.critical.draggable.id !== a.draggableId) return null;
        var l = o.current.client.offset,
          s = o.dimensions.draggables[a.draggableId],
          u = Rt(o.impact),
          d = mO(o.impact),
          c = o.forceShouldAnimate;
        return n(e(l.x, l.y), o.movementMode, s, a.isClone, u, d, c);
      }
      if (o.phase === "DROP_ANIMATING") {
        var f = o.completed;
        if (f.result.draggableId !== a.draggableId) return null;
        var h = a.isClone,
          v = o.dimensions.draggables[a.draggableId],
          y = f.result,
          w = y.mode,
          m = yw(y),
          g = pO(y),
          x = o.dropDuration,
          b = {
            duration: x,
            curve: mm.drop,
            moveTo: o.newHomeClientOffset,
            opacity: g ? Ea.opacity.drop : null,
            scale: g ? Ea.scale.drop : null,
          };
        return {
          mapped: {
            type: "DRAGGING",
            offset: o.newHomeClientOffset,
            dimension: v,
            dropping: b,
            draggingOver: m,
            combineWith: g,
            mode: w,
            forceShouldAnimate: null,
            snapshot: t(w, h, m, g, b),
          },
        };
      }
      return null;
    };
  return r;
}
function xw(e) {
  return {
    isDragging: !1,
    isDropAnimating: !1,
    isClone: !1,
    dropAnimation: null,
    mode: null,
    draggingOver: null,
    combineTargetFor: e,
    combineWith: null,
  };
}
var gO = {
  mapped: {
    type: "SECONDARY",
    offset: tt,
    combineTargetFor: null,
    shouldAnimateDisplacement: !0,
    snapshot: xw(null),
  },
};
function vO() {
  var e = et(function (a, l) {
      return { x: a, y: l };
    }),
    t = et(xw),
    n = et(function (a, l, s) {
      return (
        l === void 0 && (l = null),
        {
          mapped: {
            type: "SECONDARY",
            offset: a,
            combineTargetFor: l,
            shouldAnimateDisplacement: s,
            snapshot: t(l),
          },
        }
      );
    }),
    r = function (l) {
      return l ? n(tt, l, !0) : null;
    },
    i = function (l, s, u, d) {
      var c = u.displaced.visible[l],
        f = !!(d.inVirtualList && d.effected[l]),
        h = Nu(u),
        v = h && h.draggableId === l ? s : null;
      if (!c) {
        if (!f) return r(v);
        if (u.displaced.invisible[l]) return null;
        var y = lo(d.displacedBy.point),
          w = e(y.x, y.y);
        return n(w, v, !0);
      }
      if (f) return r(v);
      var m = u.displacedBy.point,
        g = e(m.x, m.y);
      return n(g, v, c.shouldAnimate);
    },
    o = function (l, s) {
      if (l.isDragging)
        return l.critical.draggable.id === s.draggableId
          ? null
          : i(
              s.draggableId,
              l.critical.draggable.id,
              l.impact,
              l.afterCritical
            );
      if (l.phase === "DROP_ANIMATING") {
        var u = l.completed;
        return u.result.draggableId === s.draggableId
          ? null
          : i(s.draggableId, u.result.draggableId, u.impact, u.afterCritical);
      }
      return null;
    };
  return o;
}
var yO = function () {
    var t = hO(),
      n = vO(),
      r = function (o, a) {
        return t(o, a) || n(o, a) || gO;
      };
    return r;
  },
  xO = { dropAnimationFinished: Zx },
  wO = Sx(yO, xO, null, { context: wm, pure: !0, areStatePropsEqual: vw })(fO);
function ww(e) {
  var t = Bs(Cm),
    n = t.isUsingCloneFor;
  return n === e.draggableId && !e.isClone ? null : H.createElement(wO, e);
}
function bO(e) {
  var t = typeof e.isDragDisabled == "boolean" ? !e.isDragDisabled : !0,
    n = !!e.disableInteractiveElementBlocking,
    r = !!e.shouldRespectForcePress;
  return H.createElement(
    ww,
    ee({}, e, {
      isClone: !1,
      isEnabled: t,
      canDragInteractiveElements: n,
      shouldRespectForcePress: r,
    })
  );
}
function SO(e) {
  var t = S.useContext(_u);
  t || U(!1);
  var n = t.contextId,
    r = t.isMovementAllowed,
    i = S.useRef(null),
    o = S.useRef(null),
    a = e.children,
    l = e.droppableId,
    s = e.type,
    u = e.mode,
    d = e.direction,
    c = e.ignoreContainerClipping,
    f = e.isDropDisabled,
    h = e.isCombineEnabled,
    v = e.snapshot,
    y = e.useClone,
    w = e.updateViewportMaxScroll,
    m = e.getContainerForClone,
    g = Z(function () {
      return i.current;
    }, []),
    x = Z(function (D) {
      i.current = D;
    }, []);
  Z(function () {
    return o.current;
  }, []);
  var b = Z(function (D) {
      o.current = D;
    }, []),
    C = Z(
      function () {
        r() && w({ maxScroll: rw() });
      },
      [r, w]
    );
  Q5({
    droppableId: l,
    type: s,
    mode: u,
    direction: d,
    isDropDisabled: f,
    isCombineEnabled: h,
    ignoreContainerClipping: c,
    getDroppableRef: g,
  });
  var E = H.createElement(
      nO,
      { on: e.placeholder, shouldAnimate: e.shouldAnimatePlaceholder },
      function (D) {
        var N = D.onClose,
          A = D.data,
          R = D.animate;
        return H.createElement(tO, {
          placeholder: A,
          onClose: N,
          innerRef: b,
          animate: R,
          contextId: n,
          onTransitionEnd: C,
        });
      }
    ),
    P = me(
      function () {
        return {
          innerRef: x,
          placeholder: E,
          droppableProps: {
            "data-rbd-droppable-id": l,
            "data-rbd-droppable-context-id": n,
          },
        };
      },
      [n, l, E, x]
    ),
    T = y ? y.dragging.draggableId : null,
    I = me(
      function () {
        return { droppableId: l, type: s, isUsingCloneFor: T };
      },
      [l, T, s]
    );
  function O() {
    if (!y) return null;
    var D = y.dragging,
      N = y.render,
      A = H.createElement(
        ww,
        {
          draggableId: D.draggableId,
          index: D.source.index,
          isClone: !0,
          isEnabled: !0,
          shouldRespectForcePress: !1,
          canDragInteractiveElements: !0,
        },
        function (R, V) {
          return N(R, V, D);
        }
      );
    return g2.createPortal(A, m());
  }
  return H.createElement(Cm.Provider, { value: I }, a(P, v), O());
}
var Zc = function (t, n) {
    return t === n.droppable.type;
  },
  gv = function (t, n) {
    return n.draggables[t.draggable.id];
  },
  CO = function () {
    var t = {
        placeholder: null,
        shouldAnimatePlaceholder: !0,
        snapshot: {
          isDraggingOver: !1,
          draggingOverWith: null,
          draggingFromThisWith: null,
          isUsingPlaceholder: !1,
        },
        useClone: null,
      },
      n = ee({}, t, { shouldAnimatePlaceholder: !1 }),
      r = et(function (a) {
        return {
          draggableId: a.id,
          type: a.type,
          source: { index: a.index, droppableId: a.droppableId },
        };
      }),
      i = et(function (a, l, s, u, d, c) {
        var f = d.descriptor.id,
          h = d.descriptor.droppableId === a;
        if (h) {
          var v = c ? { render: c, dragging: r(d.descriptor) } : null,
            y = {
              isDraggingOver: s,
              draggingOverWith: s ? f : null,
              draggingFromThisWith: f,
              isUsingPlaceholder: !0,
            };
          return {
            placeholder: d.placeholder,
            shouldAnimatePlaceholder: !1,
            snapshot: y,
            useClone: v,
          };
        }
        if (!l) return n;
        if (!u) return t;
        var w = {
          isDraggingOver: s,
          draggingOverWith: f,
          draggingFromThisWith: null,
          isUsingPlaceholder: !0,
        };
        return {
          placeholder: d.placeholder,
          shouldAnimatePlaceholder: !0,
          snapshot: w,
          useClone: null,
        };
      }),
      o = function (l, s) {
        var u = s.droppableId,
          d = s.type,
          c = !s.isDropDisabled,
          f = s.renderClone;
        if (l.isDragging) {
          var h = l.critical;
          if (!Zc(d, h)) return n;
          var v = gv(h, l.dimensions),
            y = Rt(l.impact) === u;
          return i(u, c, y, y, v, f);
        }
        if (l.phase === "DROP_ANIMATING") {
          var w = l.completed;
          if (!Zc(d, w.critical)) return n;
          var m = gv(w.critical, l.dimensions);
          return i(u, c, yw(w.result) === u, Rt(w.impact) === u, m, f);
        }
        if (l.phase === "IDLE" && l.completed && !l.shouldFlush) {
          var g = l.completed;
          if (!Zc(d, g.critical)) return n;
          var x = Rt(g.impact) === u,
            b = !!(g.impact.at && g.impact.at.type === "COMBINE"),
            C = g.critical.droppable.id === u;
          return x ? (b ? t : n) : C ? t : n;
        }
        return n;
      };
    return o;
  },
  EO = { updateViewportMaxScroll: jA };
function TO() {
  return document.body || U(!1), document.body;
}
var kO = {
    mode: "standard",
    type: "DEFAULT",
    direction: "vertical",
    isDropDisabled: !1,
    isCombineEnabled: !1,
    ignoreContainerClipping: !1,
    renderClone: null,
    getContainerForClone: TO,
  },
  bw = Sx(CO, EO, null, { context: wm, pure: !0, areStatePropsEqual: vw })(SO);
bw.defaultProps = kO;
const PO = S.forwardRef(
    ({ extraPick: e, images: t, setImages: n, isActive: r }, i) => {
      const o = (l) => {
          if (!l.destination) return;
          const s = [...t],
            [u] = s.splice(l.source.index, 1);
          s.splice(l.destination.index, 0, u);
          const d = s.map((c, f) => ({ src: c.src, index: f.toString() }));
          n(d);
        },
        a = (l) =>
          n(
            t
              .filter((s) => s.index != l)
              .map((s, u) => ({ src: s.src, index: u.toString() }))
          );
      return p.jsxs(IO, {
        style: { width: `${t.length * 90 + (t.length == 10 ? 0 : 110)}px` },
        ref: i,
        className: r ? "active" : "",
        children: [
          p.jsx("div", {
            className: "items",
            children: p.jsx($5, {
              onDragEnd: o,
              children: p.jsx(bw, {
                droppableId: "droppable",
                direction: "horizontal",
                children: (l) =>
                  p.jsxs("div", {
                    className: `in ${t.length == 10 ? "f" : ""}`,
                    style: { width: `${t.length * 90}px` },
                    ...l.droppableProps,
                    ref: l.innerRef,
                    children: [
                      t.map((s, u) =>
                        p.jsx(bO, {
                          draggableId: s.index,
                          index: u,
                          children: (d) =>
                            p.jsx("div", {
                              ref: d.innerRef,
                              ...d.draggableProps,
                              ...d.dragHandleProps,
                              children: p.jsxs("div", {
                                className: "item",
                                children: [
                                  p.jsx("img", { src: s.src, alt: s.index }),
                                  p.jsx("div", { className: "layer" }),
                                  p.jsx("button", {
                                    onClick: () => a(s.index),
                                    className: "remove",
                                    children: p.jsx(SE, {}),
                                  }),
                                ],
                              }),
                            }),
                        })
                      ),
                      l.placeholder,
                    ],
                  }),
              }),
            }),
          }),
          t.length < 10 &&
            p.jsxs("button", {
              className: "add",
              children: [
                p.jsx(CE, {}),
                p.jsx("input", {
                  onChange: e,
                  type: "file",
                  multiple: !0,
                  accept: "image/jpeg, image/png, image/jpg",
                  name: "images",
                  id: "images",
                }),
              ],
            }),
        ],
      });
    }
  ),
  IO = ce.div`
  position: absolute;
  bottom: 4rem;
  right: 4rem;
  z-index: 20;
  background-color: rgba(0, 0, 0, 0.6);
  border-radius: 8px;
  cursor: default;
  overflow: hidden;
  transform-origin: bottom right;
  transition: 0.3s ease-in-out all;
  max-width: calc(700px - 6rem);
  height: 0px;
  width: 0px;
  transition: 0.3s ease-in-out all;
  &.active {
    padding-right: 0px;
    padding: 10px;
    height: 100px;
    padding: 10px;
    width: calc(100% - 6rem);
    display: flex;
  }
  .in {
    cursor: default;
    display: flex;
    max-width: 484px;
    &.f {
      max-width: 584px;
    }
    overflow-x: scroll;
    &::-webkit-scrollbar {
      display: none;
    }
    .item {
      width: 80px;
      height: 80px;
      margin-right: 10px;
      border-radius: 4px;
      overflow: hidden;
      position: relative;
      &:hover .remove {
        display: block;
      }
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        cursor: default;
      }
      .remove {
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0px;
        display: none;
        position: absolute;
        right: 3px;
        top: 3px;
        width: 22px;
        height: 22px;
        background-color: rgba(0, 0, 0, 0.6);
        border-radius: 100%;
        border: none !important;
        outline: none !important;
        svg {
          width: 10px;
          height: 10px;
          border: none;
          outline: none;
        }
      }
    }
  }
  button {
    width: 80px;
    height: 80px;
    margin-left: 10px;
    position: relative;
    background-color: transparent;
    border: none;
    outline: none;
    input {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0px;
      top: 0px;
      opacity: 0;
      cursor: pointer;
    }
    svg {
      outline-offset: 10px;
      outline: 1px solid #262626;
      border-radius: 100%;
    }
  }
`,
  AO = ({
    extraPick: e,
    textAreaIsActive: t,
    text: n,
    setText: r,
    images: i,
    setImages: o,
  }) => {
    const [a, l] = S.useState(!1),
      s = S.useRef(null),
      u = S.useRef(null);
    return (
      S.useEffect(() => {
        const d = (c) => {
          if (!(s.current && u.current)) return;
          const f = c.composedPath();
          f.includes(s.current) || f.includes(u.current)
            ? f.includes(s.current) && l(!a)
            : l(!1);
        };
        return (
          window.addEventListener("click", d),
          () => {
            window.removeEventListener("click", d);
          }
        );
      }, [a]),
      p.jsxs(DO, {
        children: [
          p.jsxs(Iu, {
            slidesPerView: 1,
            pagination: { clickable: !0 },
            navigation: !0,
            modules: [Jp, Zp],
            className: "mySwiper",
            children: [
              i.map((d) =>
                p.jsxs(Au, {
                  children: [
                    p.jsx("img", { src: d.src, alt: d.index }),
                    p.jsx("div", { className: "layer" }),
                  ],
                })
              ),
              !t &&
                p.jsxs(p.Fragment, {
                  children: [
                    p.jsx(PO, {
                      ref: u,
                      images: i,
                      setImages: o,
                      extraPick: e,
                      isActive: a,
                    }),
                    p.jsx("button", {
                      ref: s,
                      className: "moreiconimages",
                      children: p.jsx(gy, {}),
                    }),
                  ],
                }),
            ],
          }),
          p.jsx(jk, { textAreaIsActive: t, text: n, setText: r }),
        ],
      })
    );
  },
  DO = ce.div`
  display: flex;
  width: 100%;
  max-width: 1100px;
  .mySwiper {
    width: 100%;
    height: 100%;
    position: relative;
    min-width: 700px;
    @media screen and (max-width: 1228px) {
      min-width: 0px;
      width: 100%;
    }
    .swiper-slide {
      width: 100%;
      height: 100%;
      position: relative;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      .layer {
        left: 0px;
        top: 0px;
        width: 100%;
        position: absolute;
        height: 100%;
      }
    }
    .moreiconimages {
      position: absolute;
      right: 20px;
      bottom: 20px;
      z-index: 10;
      padding: 8px;
      width: 36px;
      height: 36px;
      border-radius: 100%;
      background-color: rgba(0, 0, 0, 0.6);
      border: none;
      outline: none;
    }
  }
`,
  ni = rn("/posts", ({ explore: e, date: t, id: n }) =>
    Me(`${e ? "/posts/explore" : "/posts"}?date=${t}&id=${n}`).then((r) => r)
  ),
  OO = (e, t) =>
    Me("/posts/create", "POST", { images: e, content: t }).then((n) => n),
  Sw = rn("/posts/:postid/images", (e) =>
    Me(`/posts/${e}/images`).then((t) => t)
  ),
  Ta = rn(
    "/posts/:postid/comments",
    ({ id: e, postid: t, date: n, commentid: r }) =>
      Me(
        `/posts/${t}/comments/${r ? `${r}/subcomments` : ""}?date=${n}&id=${e}`
      ).then((i) => i)
  ),
  kf = rn(
    "/posts/:postid/comment~{POST}",
    ({ postid: e, content: t, commentid: n }) =>
      Me(`/posts/${e}/${n ? `comments/${n}` : "comment"}`, "POST", {
        content: t,
      }).then((r) => r)
  ),
  wr = rn("/posts/:postid/like~{POST}", ({ a: e, postid: t, t: n }) =>
    Me(`/posts/${t}/${n}`, e ? "POST" : "DELETE")
  ),
  eo = rn(
    "/posts/:postid/comments/:commentid/like~{POST}",
    ({ a: e, commentid: t, subcommentid: n, postid: r }) =>
      Me(
        `/posts/${r}/comments/${t}${n ? `/${n}` : ""}/like`,
        e ? "POST" : "DELETE"
      )
  ),
  vv = ({ id: e, postid: t, date: n }) =>
    Me(`/posts/${t}/likes?date=${n}&id=${e}`).then((r) => r),
  yv = ({ id: e, date: t, commentid: n, postid: r }) =>
    Me(`/posts/${r}/comments/${n}/likes?date=${t}&id=${e}`).then((i) => i),
  xv = ({ commentid: e, postid: t, subcommentid: n, date: r, id: i }) =>
    Me(`/posts/${t}/likes/comments/${e}/${n}/likes?date=${r}&id=${i}`).then(
      (o) => o
    ),
  Cw = rn("/posts/:postid~{DELETE}", (e) => Me(`/posts/${e}`, "DELETE")),
  jO = ({ close: e }) => {
    const [t, n] = S.useState(!1),
      [r, i] = S.useState(!1),
      o = () => n(!1),
      [a, l] = S.useState(1),
      [s, u] = S.useState([]),
      [d, c] = S.useState(""),
      [f, h] = S.useState(!1),
      v = (T) =>
        new Promise((I, O) => {
          let D = new FileReader();
          D.readAsDataURL(T),
            (D.onload = function () {
              I(D.result);
            }),
            (D.onerror = function () {
              O(D.error);
            });
        }),
      y = (T) =>
        T.size <= 5e6 &&
        ["image/jpeg", "image/jpg", "image/png"].includes(T.type),
      w = (T, I) => I < 10,
      m = async (T) => {
        const I = Array.isArray(T) ? T : Array.from(T.target.files ?? []);
        if (I.length == 0) return;
        const O = I.filter(y).filter(w);
        I.length != O.length &&
          pe.info("First 10 image or size 5mb under image"),
          O.length > 0 && l(2);
        const D = await Promise.all(
          O.map(async (N, A) => {
            const R = await v(N);
            return { index: A.toString(), src: R };
          })
        );
        u(D);
      },
      g = async (T) => {
        const I = Array.from(T.target.files ?? []);
        if (I.length == 0) return;
        const O = I.filter(y).filter((N, A) => A < 10 - s.length);
        I.length != O.length &&
          pe.info(`First ${10 - s.length} image or size 5mb under image`);
        const D = await Promise.all(
          O.map(async (N, A) => {
            const R = await v(N);
            return { index: A + s.length.toString(), src: R };
          })
        );
        u([...s, ...D]);
      },
      x = () => {
        a == 2 ? (i(!0), n(!0)) : l(a - 1);
      },
      b = Dp();
    S.useEffect(() => {
      s.length == 0 && l(1);
    }, [s]);
    const C = async () => {
        if (a == 3) {
          const T =
              (d == null ? void 0 : d.trim().length) > 0
                ? d.trim().replace(
                    /\n\s*\n/g,
                    `

`
                  )
                : null,
            I = s.map((O) => O.src);
          try {
            h(!0);
            const O = await OO(I, T);
            e(), b(`/p/${O}`), window.location.reload();
          } catch (O) {
            pe.error(O.toString());
          } finally {
            h(!1);
          }
        } else l(a + 1);
      },
      E = () => {
        i(!1), a > 1 ? n(!0) : e();
      },
      P = () => {
        r ? (l(1), n(!1)) : e();
      };
    return p.jsxs(p.Fragment, {
      children: [
        p.jsx(NO, { onClick: E }),
        p.jsxs(RO, {
          className: a == 3 ? "exp" : "",
          children: [
            p.jsx(ya, { position: "bottom-center", theme: "dark" }),
            p.jsxs("div", {
              className: "header",
              children: [
                a > 1 &&
                  p.jsx("button", {
                    onClick: x,
                    className: "back",
                    children: p.jsx(bE, {}),
                  }),
                p.jsx("p", {
                  children: a == 1 ? "Pick image" : "Create new post",
                }),
                a > 1 &&
                  p.jsx("button", {
                    onClick: C,
                    className: "next",
                    children: "Next",
                  }),
              ],
            }),
            p.jsxs("div", {
              className: "content",
              children: [
                a == 1
                  ? p.jsx(bk, { pick: m })
                  : p.jsx(AO, {
                      extraPick: g,
                      text: d,
                      setText: c,
                      textAreaIsActive: a == 3,
                      images: s,
                      setImages: u,
                    }),
                f && p.jsx(yn, {}),
              ],
            }),
            t && p.jsx(yk, { cancel: o, discard: P }),
          ],
        }),
      ],
    });
  },
  NO = ce.div`
  position: fixed;
  z-index: 70;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.6);
  left: 0px;
  top: 0px;
  cursor: pointer;
`,
  RO = ce.div`
  @keyframes scalex {
    0% {
      transform: scale(0.9) translate(initial);
    }
    100% {
      transform: scale(1) translate(initial);
    }
  }
  transform: scale(0.9) translate(initial);
  animation: 0.1s scalex ease-in-out forwards;
  position: fixed;
  z-index: 80;
  max-width: 700px;
  background-color: #262626;
  left: calc(50vw - 350px);
  top: calc(50vh - 350px);
  max-height: 700px;
  &.exp {
    left: calc(50vw - 550px);
    max-width: 1100px;
    @media screen and (max-width: 1228px) {
      left: 4rem;
      width: calc(100% - 8rem);
    }
  }
  .loading-box {
    height: 100%;
    position: absolute;
    z-index: 50;
  }
  width: 100%;
  height: 100%;
  border-radius: 12px;
  overflow: hidden;
  transition: 0.2s ease all;
  @media screen and (max-height: 828px) {
    top: 4rem;
    height: calc(100% - 8rem);
  }
  @media screen and (max-width: 828px) {
    left: 4rem;
    width: calc(100% - 8rem);
  }
  .header {
    height: 42px;
    border-bottom: 1px solid #363636;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    button {
      position: absolute;
      background-color: transparent;
      border: none;
      outline: none;
      color: #fafafa;
      font-size: 14px;
      font-weight: 600;
      &.back {
        left: 20px;
      }
      &.next {
        color: #0095f6;
        right: 20px;
        &:hover {
          color: #e0f1ff;
        }
      }
    }
    p {
      text-align: center;
      font-weight: 600;
    }
  }
  .content {
    height: calc(100% - 42px);
    display: flex;
    width: 100%;
    position: relative;
    overflow: hidden;
    .loading-box {
      background-color: #262626;
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0px;
      top: 0px;
      .loading-icon {
        width: 3rem;
        height: 3rem;
      }
    }
  }
`,
  LO = (e, t) => Me("/auth/login", "POST", { username: e, password: t }),
  MO = (e, t, n, r) =>
    Me("/auth/signup", "POST", {
      username: e,
      password: t,
      fullname: n,
      email: r,
    }),
  _O = () => Me("/auth/logout", "POST"),
  qa = (e) => e.preventDefault(),
  $O = () => {
    const { username: e, pp: t } = ge(Dn, ve),
      [n, r] = S.useState(!1),
      { pathname: i } = si(),
      [o, a] = S.useState(null),
      [l, s] = S.useState(!1),
      u = (E) => {
        if (l) return E == "create";
        if (o) {
          if (o == "search") return E == "search";
          if (o == "notifications") return E == "notifications";
        }
        return E == i;
      };
    S.useEffect(() => {
      r(o != null);
    }, [o]);
    const d = S.useRef(null),
      c = S.useRef(null),
      f = S.useRef(null),
      h = S.useRef(null),
      v = S.useRef(null);
    S.useEffect(() => {
      const E = (P) => {
        const T = P.composedPath();
        d.current &&
          c.current &&
          f.current &&
          h.current &&
          v.current &&
          o &&
          (T.includes(f.current) ||
            (o == "notifications"
              ? T.includes(c.current) || T.includes(v.current) || a(null)
              : T.includes(d.current) || T.includes(h.current) || a(null)));
      };
      return (
        window.addEventListener("click", E),
        () => {
          window.removeEventListener("click", E);
        }
      );
    }, [o]);
    const y = () => a(null),
      w = Ge();
    S.useEffect(() => {
      w(Xp());
    }, []);
    const m = () => s(!1),
      g = S.useRef(null),
      x = S.useRef(null),
      [b, C] = S.useState(!1);
    return (
      S.useEffect(() => {
        const E = (P) => {
          const T = P.composedPath();
          !g.current ||
            !x.current ||
            (T.includes(g.current)
              ? C((I) => !I)
              : T.includes(x.current)
              ? C(!0)
              : C(!1));
        };
        return (
          window.addEventListener("click", E),
          () => {
            window.removeEventListener("click", E);
          }
        );
      }, []),
      p.jsxs(p.Fragment, {
        children: [
          p.jsx(fk, { close: y, isActive: o == "search", ref: h }),
          p.jsx(gk, { isActive: o == "notifications", ref: v }),
          l && p.jsx(jO, { close: m }),
          p.jsx(zO, {
            className: n ? "mini" : "",
            children: p.jsxs("div", {
              className: "content",
              ref: f,
              children: [
                p.jsx("div", {
                  className: "up",
                  children: p.jsxs(ft, {
                    onClick: y,
                    to: "/",
                    children: [
                      p.jsx("h1", { children: "Social Media App" }),
                      p.jsx(FO, {}),
                    ],
                  }),
                }),
                p.jsxs("ul", {
                  children: [
                    p.jsx("li", {
                      className: u("/") ? "active" : "",
                      children: p.jsxs(ft, {
                        onClick: y,
                        to: "/",
                        children: [
                          p.jsx(mE, { isactive: u("/") }),
                          p.jsx("p", { children: "Home" }),
                        ],
                      }),
                    }),
                    p.jsx("li", {
                      ref: d,
                      className: u("search") ? "active" : "",
                      children: p.jsxs("div", {
                        onClick: () => a("search"),
                        children: [
                          p.jsx(hE, { isactive: u("search") }),
                          p.jsx("p", { children: "Search" }),
                        ],
                      }),
                    }),
                    p.jsx("li", {
                      className: u("/explore") ? "active" : "",
                      children: p.jsxs(ft, {
                        onClick: y,
                        to: "/explore",
                        children: [
                          p.jsx(gE, { isactive: u("/explore") }),
                          p.jsx("p", { children: "Explore" }),
                        ],
                      }),
                    }),
                    p.jsx("li", {
                      className: u("/direct/inbox") ? "active" : "",
                      children: p.jsxs(ft, {
                        onClick: y,
                        to: "/direct/inbox",
                        children: [
                          p.jsx(vE, { isactive: u("/direct/inbox") }),
                          p.jsx("p", { children: "Messages" }),
                        ],
                      }),
                    }),
                    p.jsx("li", {
                      ref: c,
                      className: u("notifications") ? "active" : "",
                      children: p.jsxs("div", {
                        onClick: () => a("notifications"),
                        children: [
                          p.jsx(yE, { isactive: u("notifications") }),
                          p.jsx("p", { children: "Notifications" }),
                        ],
                      }),
                    }),
                    p.jsx("li", {
                      className: u("create") ? "active" : "",
                      children: p.jsxs("div", {
                        onClick: () => s(!0),
                        children: [
                          p.jsx(xE, { isactive: u("create") }),
                          p.jsx("p", { children: "Create" }),
                        ],
                      }),
                    }),
                    p.jsx("li", {
                      className: u(`/${e}`) ? "active" : "",
                      children: p.jsxs(ft, {
                        onClick: y,
                        to: `/${e}`,
                        children: [
                          p.jsx("img", {
                            onContextMenu: qa,
                            src: t || "/pp.jpg",
                            alt: "pp",
                          }),
                          p.jsx("p", { children: "Profile" }),
                        ],
                      }),
                    }),
                  ],
                }),
                p.jsx("div", {
                  className: "bottom",
                  children: p.jsxs("button", {
                    ref: g,
                    className: b ? "active" : "",
                    children: [
                      p.jsx(wE, { isactive: b }),
                      p.jsx("p", { children: "More" }),
                      p.jsx(BO, { moreIconActive: b, ref: x }),
                    ],
                  }),
                }),
              ],
            }),
          }),
        ],
      })
    );
  },
  BO = S.forwardRef(({ moreIconActive: e }, t) => {
    const n = ge(Dn, ve).username;
    return p.jsxs("div", {
      ref: t,
      className: `morepanel ${e ? "a" : ""}`,
      children: [
        p.jsxs(ft, {
          to: "/account/edit",
          children: [p.jsx(Sy, {}), p.jsx("p", { children: "Settings" })],
        }),
        p.jsxs(ft, {
          to: `/${n}/saved`,
          children: [p.jsx(OE, {}), p.jsx("p", { children: "Saved" })],
        }),
        p.jsx("button", {
          onClick: _O,
          children: p.jsx("p", { children: "Logout" }),
        }),
      ],
    });
  }),
  zO = ce.div`
  height: 100vh;
  width: 360px;
  .content {
    position: relative;
    z-index: 70;
    background-color: #000;
    position: relative;
    border-right: 1px solid #262626;
    height: 100%;
    width: 100%;
    padding: 8px 12px 20px;
    display: flex;
    min-width: 48px;
    overflow: hidden;
    justify-content: space-between;
    flex-direction: column;
    transition: 0.3s ease-in-out width;
    .up {
      display: block;
      padding: 25px 12px 12px;
      width: 100%;
      margin-bottom: 19px;
      height: 74px !important;
      min-height: 74px;
      max-height: 74px;
      h1 {
        font-size: 24px;
        height: 36px;
        display: block;
        width: 100%;
        white-space: nowrap;
        width: 100%;
      }
      .logo {
        display: none;
        animation: scale 0.3s ease-in-out;
        @keyframes scale {
          from {
            transform: scale(0.7);
          }
          to {
            transform: scale(1);
          }
        }
        width: 2rem;
        height: 2rem;
        transition: 0.2s ease transform;
        &:hover {
          transform: scale(1.05);
        }
      }
    }
    ul {
      height: 100%;
      width: 100%;
      overflow-y: auto;
      &::-webkit-scrollbar {
        display: none;
      }
      li {
        margin: 8px 0px;
        &.active {
          p {
            font-weight: 600;
          }
          img {
            outline: 2px solid #fff;
            outline-offset: 1px;
          }
        }
        a,
        div {
          cursor: pointer;
          border-radius: 8px;
          padding: 12px;
          display: flex;
          align-items: center;
          transition: 0.2s ease all;
          transition-delay: 0.1s;
          svg,
          img {
            min-width: 24px;
            min-height: 24px;
            max-width: 24px;
            max-height: 24px;
            width: 24px;
            height: 24px;
            transition-delay: 0.1s;
            transition: 0.2s ease transform;
          }
          img {
            border-radius: 100%;
          }
          p {
            margin-left: 10px;
          }
          &:hover {
            background-color: rgba(255, 255, 255, 0.12);
            svg {
              transform: scale(1.05);
            }
          }
        }
      }
    }
    .bottom {
      button {
        padding: 12px;
        background-color: transparent;
        display: flex;
        width: 100%;
        position: relative;
        border: none;
        border-radius: 0.5rem;
        outline: none;
        align-items: center;
        &.active {
          p {
            font-weight: 600;
          }
        }
        svg {
          transition: 0.2s ease all;
          transition-delay: 0.1s;
        }
        p {
          font-size: 1rem;
          color: #fafafa;
          margin-left: 10px;
        }
        &:hover {
          background-color: rgba(255, 255, 255, 0.12);
          svg {
            transform: scale(1.05);
          }
        }
      }
    }
  }
  &.mini {
    .content {
      overflow: hidden;
      width: 73px;
      .up {
        h1 {
          display: none;
        }
        .logo {
          display: block !important;
        }
      }
      ul {
        li {
          p {
            display: none;
          }
        }
      }
      .bottom {
        p {
          display: none;
        }
      }
    }
  }
  @media screen and (max-width: 1250px) {
    & {
      width: 73px;
    }
    .content {
      width: 73px;
      .up {
        h1 {
          display: none;
        }
        .logo {
          display: block !important;
        }
      }
      ul {
        li {
          p {
            display: none;
          }
        }
      }
      .bottom {
        p {
          display: none;
        }
      }
    }
  }
  .morepanel {
    position: absolute;
    background-color: #262626;
    bottom: 56px;
    left: 4px;
    border-radius: 12px;
    overflow: hidden;
    width: 0px;
    height: 0px;
    transition: 0.1s ease-in-out height;
    padding: 0px;
    &.a {
      padding: 8px;
      width: 270px;
      height: 162px;
    }
    button,
    a {
      display: flex;
      padding: 1rem;
      p {
        margin: 0px !important;
        font-weight: 400 !important;
        font-size: 14px !important;
      }
      svg {
        width: 18px;
        height: 18px;
        margin-right: 12px;
      }
      &:hover {
        background-color: #363636;
        border-radius: 8px;
      }
    }
  }
`,
  FO = () =>
    p.jsxs("svg", {
      className: "logo",
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "-11.5 -10.23174 23 20.46348",
      children: [
        p.jsx("title", { children: "React Logo" }),
        p.jsx("circle", { cx: "0", cy: "0", r: "2.05", fill: "#61dafb" }),
        p.jsxs("g", {
          stroke: "#61dafb",
          strokeWidth: "1",
          fill: "none",
          children: [
            p.jsx("ellipse", { rx: "11", ry: "4.2" }),
            p.jsx("ellipse", { rx: "11", ry: "4.2", transform: "rotate(60)" }),
            p.jsx("ellipse", { rx: "11", ry: "4.2", transform: "rotate(120)" }),
          ],
        }),
      ],
    }),
  wv = (e) => new Date(e).getTime(),
  Cn = (e, t, n) => e.map((r) => (r.id == t ? { ...r, ...n(r) } : r)),
  UO = (e, t, n) => e.map((r) => (r.id == t ? n(r) : r)),
  hi = (e, t, n) => e.map((r) => (r.username == t ? n(r) : r)),
  HO = {
    posts: [],
    profiles: [],
    back: null,
    hasmore: { home: !0, explore: !0 },
    loading: { home: !0, explore: !0 },
    offset: { home: 0, explore: 0 },
    currentId: null,
  },
  Ew = Fy({
    name: "posts",
    initialState: HO,
    reducers: {
      setBack: (e, t) => {
        e.back = t.payload;
      },
      toggleSubCommetsT: (e, t) => {
        const { postid: n, commentid: r, t: i } = t.payload,
          { posts: o } = e,
          a = (s) => ({
            data: s.map((u) =>
              u.id == r ? { ...u, subcomments: { ...u.subcomments, t: i } } : u
            ),
          }),
          l = (s) => ({
            ...s,
            comments: { ...s.comments, ...a(s.comments.data) },
          });
        e.posts = Cn(o, n, l);
      },
      setCurrentPostId: (e, t) => {
        e.currentId = t.payload;
      },
      setOffset: (e, t) => {
        const { offset: n, page: r } = t.payload,
          { profiles: i } = e;
        if (["home", "explore"].includes(r))
          e.offset[r == "home" ? "home" : "explore"] = n;
        else {
          const o = (a) => ({
            ...a,
            info: a.info ? { ...a.info, offset: n } : void 0,
          });
          e.profiles = hi(i, r, o);
        }
      },
    },
    extraReducers: (e) => {
      e
        .addCase(ni.pending, (t, n) => {
          const { explore: r } = n.meta.arg;
          t.loading[r ? "explore" : "home"] = !0;
        })
        .addCase(ni.fulfilled, (t, n) => {
          const { explore: r } = n.meta.arg,
            i = (u) => ({
              ...u,
              comments: { loading: !1, hasmore: !0, sending: !1, data: [] },
              page: r ? "explore" : "home",
              isFollowing: !r,
            }),
            o = n.payload,
            { posts: a } = t,
            l = o.map(i),
            s = a.concat(l).sort((u, d) => wv(d.created) - wv(u.created));
          (t.posts = s),
            (t.loading[r ? "explore" : "home"] = !1),
            (t.hasmore[r ? "explore" : "home"] = o.length == 12);
        }),
        e.addCase(Sw.fulfilled, (t, n) => {
          const r = n.meta.arg,
            { posts: i } = t,
            o = n.payload,
            l = Cn(i, r, (s) => ({ ...s, images: o }));
          t.posts = l;
        }),
        e
          .addCase(Ta.pending, (t, n) => {
            const { posts: r } = t,
              { postid: i, commentid: o } = n.meta.arg,
              a = (l) =>
                o
                  ? {
                      ...l,
                      comments: {
                        ...l.comments,
                        data: l.comments.data.map((s) =>
                          s.id == o
                            ? {
                                ...s,
                                subcomments: { ...s.subcomments, loading: !0 },
                              }
                            : s
                        ),
                      },
                    }
                  : { ...l, comments: { ...l.comments, loading: !0 } };
            t.posts = Cn(r, i, a);
          })
          .addCase(Ta.fulfilled, (t, n) => {
            const { posts: r } = t,
              { postid: i, commentid: o } = n.meta.arg,
              a = n.payload,
              l = a.length == 12,
              s = !1,
              u = (c) => {
                const f = [...c, ...a]
                    .filter((v) => v.s == null)
                    .sort(
                      (v, y) =>
                        new Date(y.created).getTime() -
                        new Date(v.created).getTime()
                    ),
                  h = c
                    .filter((v) => v.s)
                    .sort(
                      (v, y) =>
                        new Date(y.created).getTime() -
                        new Date(v.created).getTime()
                    );
                return f.concat(h);
              },
              d = (c) =>
                o
                  ? {
                      ...c,
                      comments: {
                        ...c.comments,
                        data: UO(c.comments.data, o, (f) => ({
                          ...f,
                          subcomments: {
                            ...f.subcomments,
                            loading: s,
                            t: !(
                              l &&
                              f.subcomments.data.length + a.length !=
                                f.subcommentcount
                            ),
                            hasmore:
                              l &&
                              f.subcomments.data.length + a.length !=
                                f.subcommentcount,
                            data: u(f.subcomments.data),
                          },
                        })),
                      },
                    }
                  : {
                      ...c,
                      comments: {
                        ...c.comments,
                        loading: !1,
                        hasmore: l,
                        data: [
                          ...c.comments.data,
                          ...a.map((f) => ({
                            ...f,
                            subcomments: {
                              data: [],
                              hasmore: f.subcommentcount != 0,
                              t: !1,
                              loading: !1,
                            },
                          })),
                        ],
                      },
                    };
            t.posts = Cn(r, i, d);
          }),
        e
          .addCase(kf.pending, (t, n) => {
            const { posts: r } = t,
              { postid: i } = n.meta.arg,
              o = (a) => ({ ...a, comments: { ...a.comments, sending: !0 } });
            t.posts = Cn(r, i, o);
          })
          .addCase(kf.fulfilled, (t, n) => {
            const { posts: r } = t,
              {
                postid: i,
                content: o,
                id: a,
                pp: l,
                username: s,
                commentid: u,
              } = n.meta.arg,
              d = n.payload,
              c = new Date(Date.now()).toString(),
              f = {
                content: o,
                created: c,
                id: d,
                owner: a,
                username: s,
                pp: l,
                isliked: !1,
                likecount: 0,
                subcommentcount: 0,
                subcomments: { data: [], hasmore: !1, loading: !1, t: !1 },
              },
              h = {
                content: o,
                created: c,
                owner: a,
                id: d,
                isliked: !1,
                likecount: 0,
                pp: l,
                username: s,
                s: !0,
              },
              v = (y) => ({
                ...y,
                commentcount: y.commentcount + (u ? 0 : 1),
                comments: {
                  ...y.comments,
                  sending: !1,
                  data: u
                    ? y.comments.data.map((w) =>
                        w.id == u
                          ? {
                              ...w,
                              subcommentcount: w.subcommentcount + 1,
                              subcomments: {
                                ...w.subcomments,
                                t: !0,
                                data: [...w.subcomments.data, h],
                              },
                            }
                          : w
                      )
                    : [f, ...y.comments.data],
                },
              });
            t.posts = Cn(r, i, v);
          }),
        e
          .addCase(wr.pending, (t, n) => {
            const { a: r, postid: i, t: o } = n.meta.arg,
              { posts: a } = t,
              l = (s) => ({
                ...s,
                [`is${o}d`]: r,
                likecount:
                  o == "like" ? s.likecount + (r ? 1 : -1) : s.likecount,
              });
            t.posts = Cn(a, i, l);
          })
          .addCase(wr.rejected, (t, n) => {
            const { a: r, postid: i, t: o } = n.meta.arg,
              { posts: a } = t,
              l = (s) => ({
                ...s,
                [`is${o}d`]: !r,
                likecount:
                  o == "like" ? s.likecount + (r ? -1 : 1) : s.likecount,
              });
            t.posts = Cn(a, i, l);
          }),
        e
          .addCase(eo.pending, (t, n) => {
            const {
                a: r,
                postid: i,
                commentid: o,
                subcommentid: a,
              } = n.meta.arg,
              { posts: l } = t,
              s = (d) =>
                d.map((c) =>
                  c.id == o
                    ? a
                      ? {
                          ...c,
                          subcomments: {
                            ...c.subcomments,
                            data: c.subcomments.data.map((f) =>
                              f.id == a
                                ? {
                                    ...f,
                                    likecount: f.likecount + (r ? 1 : -1),
                                    isliked: r,
                                  }
                                : f
                            ),
                          },
                        }
                      : {
                          ...c,
                          isliked: r,
                          likecount: c.likecount + (r ? 1 : -1),
                        }
                    : c
                ),
              u = (d) => ({
                ...d,
                comments: { ...d.comments, data: s(d.comments.data) },
              });
            t.posts = Cn(l, i, u);
          })
          .addCase(eo.rejected, (t, n) => {
            const {
                a: r,
                postid: i,
                commentid: o,
                subcommentid: a,
              } = n.meta.arg,
              { posts: l } = t,
              s = (d) =>
                d.map((c) =>
                  c.id == o
                    ? a
                      ? {
                          ...c,
                          subcomments: {
                            ...c.subcomments,
                            data: c.subcomments.data.map((f) => ({
                              ...f,
                              likecount: f.likecount + (r ? -1 : 1),
                              isliked: !r,
                            })),
                          },
                        }
                      : {
                          ...c,
                          isliked: !r,
                          likecount: c.likecount + (r ? -1 : 1),
                        }
                    : c
                ),
              u = (d) => ({
                ...d,
                comments: { ...d.comments, data: s(d.comments.data) },
              });
            t.posts = Cn(l, i, u);
          }),
        e
          .addCase(Ul.pending, (t, n) => {
            const r = n.meta.arg,
              { profiles: i } = t,
              o = { loading: !0, username: r };
            t.profiles = [...i, o];
          })
          .addCase(Ul.fulfilled, (t, n) => {
            const r = n.meta.arg,
              i = n.payload,
              { profiles: o } = t,
              a = (l) => ({ ...l, loading: !1, username: r, info: i });
            t.profiles = hi(o, r, a);
          })
          .addCase(Ul.rejected, (t, n) => {
            const r = n.meta.arg,
              { profiles: i } = t,
              o = (a) => ({ ...a, loading: !1, exists: !1 });
            t.profiles = hi(i, r, o);
          }),
        e
          .addCase(Wr.pending, (t, n) => {
            const { profiles: r } = t,
              { username: i } = n.meta.arg,
              o = { loading: !0, hasmore: !0 },
              a = (l) => ({ ...l, postsState: o });
            t.profiles = hi(r, i, a);
          })
          .addCase(Wr.fulfilled, (t, n) => {
            const { profiles: r, posts: i } = t,
              { username: o } = n.meta.arg,
              a = n.payload.map((u) => ({
                ...u,
                page: o,
                comments: { data: [], hasmore: !0, loading: !1, sending: !1 },
              })),
              l = { loading: !1, hasmore: a.length == 12 },
              s = (u) => ({ ...u, postsState: l });
            (t.posts = [...i, ...a]), (t.profiles = hi(r, o, s));
          })
          .addCase(Wr.rejected, (t, n) => {
            const { profiles: r } = t,
              { username: i } = n.meta.arg,
              o = { loading: !1, hasmore: !1 },
              a = (l) => ({ ...l, postsState: o });
            t.profiles = hi(r, i, a);
          }),
        e
          .addCase(Is.pending, (t, n) => {
            var s, u;
            const { profiles: r, posts: i } = t,
              { userid: o, a } = n.meta.arg,
              l =
                (u =
                  (s = r.find((d) => {
                    var c;
                    return ((c = d.info) == null ? void 0 : c.id) == o;
                  })) == null
                    ? void 0
                    : s.info) == null
                  ? void 0
                  : u.ispublic;
            !l && !a && (t.posts = i.filter((d) => d.owner != o)),
              (t.profiles = r.map((d) => {
                var c;
                return ((c = d.info) == null ? void 0 : c.id) == o
                  ? {
                      ...d,
                      info: {
                        ...d.info,
                        followercount: d.info.followercount + (a ? 1 : -1),
                        status: a ? (l ? 0 : 1) : null,
                      },
                    }
                  : d;
              }));
          })
          .addCase(Is.rejected, (t, n) => {
            var l, s;
            const { profiles: r } = t,
              { userid: i, a: o } = n.meta.arg,
              a =
                (s =
                  (l = r.find((u) => {
                    var d;
                    return ((d = u.info) == null ? void 0 : d.id) == i;
                  })) == null
                    ? void 0
                    : l.info) == null
                  ? void 0
                  : s.ispublic;
            t.profiles = r.map((u) => {
              var d;
              return ((d = u.info) == null ? void 0 : d.id) == i
                ? {
                    ...u,
                    info: {
                      ...u.info,
                      followercount: u.info.followercount + (o ? -1 : 1),
                      status: o ? null : a ? 0 : 1,
                    },
                  }
                : u;
            });
          }),
        e
          .addCase(Hl.pending, (t, n) => {
            const { a: r, userid: i } = n.meta.arg,
              { profiles: o } = t;
            t.profiles = o.map((a) => {
              var l;
              return ((l = a.info) == null ? void 0 : l.id) == i
                ? {
                    ...a,
                    info: a.info ? { ...a.info, status: r ? 2 : null } : void 0,
                  }
                : a;
            });
          })
          .addCase(Hl.fulfilled, (t, n) => {
            const { userid: r, a: i } = n.meta.arg,
              { posts: o, profiles: a } = t,
              l = a.find((s) => {
                var u;
                return ((u = s.info) == null ? void 0 : u.id) == r;
              }).username;
            i && (t.posts = o.filter((s) => s.page != l || s.owner != r));
          })
          .addCase(Hl.rejected, (t, n) => {
            const { a: r, userid: i } = n.meta.arg,
              { profiles: o } = t;
            t.profiles = o.map((a) => {
              var l;
              return ((l = a.info) == null ? void 0 : l.id) == i
                ? {
                    ...a,
                    info: a.info ? { ...a.info, status: r ? null : 2 } : void 0,
                  }
                : a;
            });
          }),
        e.addCase(Cw.fulfilled, (t, n) => {
          const r = n.meta.arg,
            { profiles: i, posts: o } = t;
          (t.currentId = null), (t.back = null);
          const a = t.posts.find((l) => l.id == r).username;
          (t.profiles = i.map((l) =>
            l.username == a
              ? { ...l, info: { ...l.info, postcount: l.info.postcount - 1 } }
              : l
          )),
            (t.posts = o.filter((l) => l.id != r));
        });
    },
  }),
  {
    setBack: ka,
    toggleSubCommetsT: GO,
    setCurrentPostId: Pa,
    setOffset: Em,
  } = Ew.actions,
  WO = (e) => e.posts.posts.filter((t) => t.page == "home"),
  VO = (e, t) => e.posts.posts.filter((n) => n.page == t),
  qO = (e) => e.posts.posts.filter((t) => t.page == "explore"),
  Tm = (e, t) => e.posts.profiles.find((n) => n.username == t),
  Bu = (e) => e.posts.back,
  ri = (e) => e.posts.posts.find((t) => t.id == e.posts.currentId),
  YO = (e) => e.posts.posts.filter((t) => t.page == e.posts.back),
  km = (e) => ({
    hasmore: e.posts.hasmore,
    loading: e.posts.loading,
    offset: e.posts.offset,
  }),
  XO = Ew.reducer,
  $t = (e) => {
    const t = Ge(),
      n = () => t(ka(null));
    return p.jsx(ft, {
      to: e.to,
      className: e.className,
      onClick: n,
      replace: !0,
      children: e.children,
    });
  },
  zu = ({ quit: e, postid: t, commentid: n, subcommentid: r, type: i }) => {
    const [o, a] = S.useState(!0),
      [l, s] = S.useState(!0),
      [u, d] = S.useState([]);
    S.useEffect(() => {
      const y = (w) => {
        w.key == "Escape" && e();
      };
      return (
        window.addEventListener("keydown", y),
        () => {
          window.removeEventListener("keydown", y);
        }
      );
    }, []);
    const c = (y) => {
      d([...u, ...y]), s(y.length == 1), a(!1);
    };
    S.useEffect(() => {
      i == "post"
        ? vv({ postid: t }).then(c)
        : i == "comment"
        ? yv({ postid: t, commentid: n }).then(c)
        : xv({ postid: t, commentid: n, subcommentid: r }).then(c);
    }, []);
    const f = (y) => {
        const { created: w, id: m } = u[u.length - 1];
        if (o || !l) return;
        const { scrollTop: g, clientHeight: x, scrollHeight: b } = y.target;
        g + x + 40 > b &&
          (a(!0),
          i == "post"
            ? vv({ postid: t, id: m, date: w }).then(c)
            : i == "comment"
            ? yv({ postid: t, commentid: n, id: m, date: w }).then(c)
            : xv({
                postid: t,
                commentid: n,
                subcommentid: r,
                id: m,
                date: w,
              }).then(c));
      },
      h = (y) => {
        if (y == null) return "Follow";
      },
      { username: v } = ge(Dn, ve);
    return p.jsxs(p.Fragment, {
      children: [
        p.jsx(KO, { onClick: e }),
        p.jsxs(QO, {
          children: [
            p.jsxs("div", {
              className: "headerxxx",
              children: [
                p.jsx("p", { children: "Likes" }),
                p.jsx("button", { onClick: e, children: p.jsx(TE, {}) }),
              ],
            }),
            p.jsxs("ul", {
              onScroll: f,
              className: "contentx",
              children: [
                o && p.jsx(yn, {}),
                u.map((y) =>
                  p.jsxs("li", {
                    children: [
                      p.jsx($t, {
                        className: "pp",
                        to: `/${y.username}`,
                        children: p.jsx("img", {
                          src: y.pp || "/pp.jpg",
                          alt: "pp",
                        }),
                      }),
                      p.jsxs("div", {
                        className: "text",
                        children: [
                          p.jsx($t, {
                            to: `/${y.username}`,
                            children: p.jsx("p", {
                              className: "username",
                              children: y.username,
                            }),
                          }),
                          y.fullname &&
                            p.jsx("p", {
                              className: "fullname",
                              children: y.fullname,
                            }),
                        ],
                      }),
                      y.username != v &&
                        p.jsx("button", { children: h(y.status) }),
                    ],
                  })
                ),
              ],
            }),
          ],
        }),
      ],
    });
  },
  KO = ce.div`
  background-color: rgba(0, 0, 0, 0.5);
  width: 200vw;
  height: 200vh;
  position: fixed;
  top: 0px;
  left: 0px;
  z-index: 1300;
  transform: translate(-10%, -10%);
`,
  QO = ce.div`
  transform: scale(1.2);
  @keyframes scx {
    from {
      transform: scale(1.2);
    }
    to {
      transform: scale(1);
    }
  }
  animation: scx 0.1s ease-in-out forwards;
  width: 400px;
  background-color: #262626;
  border-radius: 8px;
  height: 400px;
  position: fixed;
  z-index: 1400;
  left: calc(50% - 200px);
  top: calc(50% - 200px);
  border-radius: 1rem;
  overflow: hidden;
  .headerxxx {
    height: 42px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    font-weight: 600;
    border-bottom: 1px solid #363636;
    button {
      width: 2rem;
      height: 2rem;
      position: absolute !important;
      right: 10px;
    }
  }
  .contentx {
    height: calc(100% - 42px);
    overflow-y: auto;
    .loading-box {
      margin: 2rem 0px;
      position: relative;
      height: 2rem;
      background-color: transparent;
    }
    li {
      display: flex;
      height: 60px;
      padding: 0.5rem 1rem;
      align-items: center;
      .pp {
        width: 44px;
        height: 44px;
        margin-right: 12px;
        display: block;
        img {
          width: 44px;
          height: 44px;
          border-radius: 100%;
        }
      }
      .text {
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        height: 36px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        p {
          width: 100%;
          overflow: hidden;
          text-overflow: ellipsis;
          line-height: 18px;
          font-size: 14px;
          margin: 0px;
          &.username {
            font-weight: 600;
          }
          &.fullname {
            color: #a8a8a8;
            font-weight: 400;
          }
        }
      }
      button {
        margin-left: 12px;
        padding: 7px 1rem;
        border-radius: 8px;
        background-color: #0095f6;
        font-size: 14px;
        font-weight: 600;
        color: #fafafa;
        &:hover {
          opacity: 0.8;
        }
      }
    }
  }
  @media screen and (max-width: 464px) {
    left: 2rem;
    width: calc(100% - 4rem);
  }
  @media screen and (max-height: 464px) {
    top: 2rem;
    max-height: calc(100% - 4rem);
  }
`,
  Ya = (e) => {
    const t = new Date(Date.now()),
      n = new Date(e),
      r = parseInt(((t.getTime() - n.getTime()) / 1e3 / 60).toString());
    if (r < 1) return "now";
    if (r < 60) return `${r}m ago`;
    const i = parseInt((r / 60).toString());
    if (i < 24) return `${i}h ago`;
    const o = t.getFullYear() == n.getFullYear(),
      a = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ][n.getMonth()],
      l = n.getDate() < 10 ? `0${n.getDate()}` : n.getDate();
    return i / 24 < 7
      ? `${parseInt((i / 24).toString())}d ago`
      : o
      ? `${l} ${a}`
      : `${l} ${a} ${n.getFullYear()}`;
  },
  ZO = S.forwardRef(({ comment: e, setComment: t, isRepliying: n }, r) => {
    const i = Ge(),
      o = ge(Dn, ve),
      a = window.location.pathname.split("/")[2],
      {
        comments: { sending: l },
        isliked: s,
        id: u,
        likecount: d,
        issaved: c,
        created: f,
      } = ge(ri, ve),
      h = S.useMemo(() => Ya(f), []),
      v = () => i(wr({ postid: a, a: !s, t: "like" })),
      y = () => i(wr({ postid: a, a: !c, t: "save" })),
      [w, m] = S.useState(!1),
      g = () => m(!1),
      x = () => m(!0);
    return p.jsxs(JO, {
      children: [
        p.jsxs("div", {
          className: "icons",
          children: [
            p.jsxs("div", {
              className: "l",
              children: [
                p.jsx("button", {
                  className: `like ${s ? "active" : ""}`,
                  onClick: v,
                  children: p.jsx(vy, { isactive: s }),
                }),
                p.jsx("button", {
                  onClick: () => r.current.focus(),
                  className: "comment",
                  children: p.jsx(yy, {}),
                }),
                w && p.jsx(zu, { type: "post", quit: g, postid: u }),
                p.jsx("button", { children: p.jsx(xy, {}) }),
              ],
            }),
            p.jsx("button", {
              onClick: y,
              className: `save ${c ? "active" : ""}`,
              children: p.jsx(wy, { isactive: c }),
            }),
          ],
        }),
        p.jsxs("div", {
          className: "detail",
          children: [
            p.jsxs("p", {
              onClick: x,
              className: "likecount",
              children: [d.toLocaleString(), " likes"],
            }),
            p.jsx("p", { className: "date", children: h }),
          ],
        }),
        p.jsxs("form", {
          onSubmit: (b) => {
            if ((b.preventDefault(), e.trim().length === 0)) return;
            const C = e.replace(/\s+/g, " ").trim();
            i(
              kf({
                content: C,
                postid: a,
                ...o,
                commentid: n == null ? void 0 : n.commentid,
              })
            );
          },
          children: [
            p.jsx("input", {
              type: "text",
              name: "comment",
              id: "comment",
              placeholder: "Add a comment...",
              ref: r,
              onChange: (b) => t(b.target.value),
              value: e,
              maxLength: 200,
            }),
            n &&
              p.jsxs($t, { to: `/${n.username}`, children: ["@", n.username] }),
            p.jsx("button", {
              disabled:
                e.trim().length == 0 ||
                (n ? n.username.length + 2 > e.trim().length : !1),
              type: "submit",
              children: "Post",
            }),
          ],
        }),
        l && p.jsx(yn, {}),
      ],
    });
  }),
  JO = ce.div`
  position: relative;
  border-top: 1px solid #262626;
  .icons {
    display: flex;
    padding: 6px 1rem 6px;

    button {
      &:first-child {
        padding-left: 0px;
      }
      &:hover {
        &.active {
          opacity: 1 !important;
        }
        opacity: 0.7;
      }
      background-color: transparent;
      padding: 6px;
      position: relative;

      &.like {
        svg {
          transform: scale(1);
        }
        &.active {
          svg {
            @keyframes likep {
              0% {
                transform: scale(1);
              }
              25% {
                transform: scale(1.2);
              }
              50% {
                transform: scale(0.95);
              }
              100% {
                transform: scale(1);
              }
            }
            animation: likep 0.45s ease-in-out;
          }
        }
      }
      &.save {
        padding-right: 0px;
      }
    }
    .l {
      display: flex;
      width: 100%;
    }
  }
  .detail {
    padding: 0px 1rem;
    margin-bottom: 1rem;
    p {
      margin-bottom: 6px;
      font-size: 14px;
      line-height: 18px;
      font-weight: 500;
      cursor: pointer;
      &.date {
        user-select: none;
        cursor: default;
        font-size: 12px;
        line-height: 14px;
        color: #a8a8a8;
        font-weight: 400;
      }
      &.likecount {
        font-weight: 600;
      }
    }
  }
  form {
    display: flex;
    width: 100%;
    height: 40px;
    border-top: 1px solid #262626;
    padding: 0px 1rem;
    position: relative;
    input {
      background-color: transparent;
      outline: none;
      width: 100%;
      height: 40px;
      border: none;
      line-height: 20px;
      padding-right: 10px;
      font-weight: 400;
      height: 40px;
      &::placeholder {
        color: #a8a8a8;
      }
    }
    a {
      background-color: #000;
      position: absolute;
      font-weight: 600;
      font-size: 14px;
      top: 10px;
      height: 18px;
      left: 10.5px;
      padding-right: 4px;
    }
    button {
      color: #0095f6;
      background-color: transparent;
      border: none;
      font-size: 14px;
      font-weight: 600;
      outline: none;
      &:disabled {
        cursor: default;
        opacity: 0.6;
      }
      margin-right: 10px;
    }
  }
  .loading-box {
    position: absolute;
    left: 0px;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    top: 0px;
  }
`;
/*! @license DOMPurify 3.0.3 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/3.0.3/LICENSE */ const {
  entries: Tw,
  setPrototypeOf: bv,
  isFrozen: ej,
  getPrototypeOf: tj,
  getOwnPropertyDescriptor: nj,
} = Object;
let { freeze: vt, seal: vn, create: rj } = Object,
  { apply: Pf, construct: If } = typeof Reflect < "u" && Reflect;
Pf ||
  (Pf = function (t, n, r) {
    return t.apply(n, r);
  });
vt ||
  (vt = function (t) {
    return t;
  });
vn ||
  (vn = function (t) {
    return t;
  });
If ||
  (If = function (t, n) {
    return new t(...n);
  });
const ij = tn(Array.prototype.forEach),
  Sv = tn(Array.prototype.pop),
  Co = tn(Array.prototype.push),
  ql = tn(String.prototype.toLowerCase),
  Jc = tn(String.prototype.toString),
  oj = tn(String.prototype.match),
  ln = tn(String.prototype.replace),
  aj = tn(String.prototype.indexOf),
  lj = tn(String.prototype.trim),
  It = tn(RegExp.prototype.test),
  Eo = sj(TypeError);
function tn(e) {
  return function (t) {
    for (
      var n = arguments.length, r = new Array(n > 1 ? n - 1 : 0), i = 1;
      i < n;
      i++
    )
      r[i - 1] = arguments[i];
    return Pf(e, t, r);
  };
}
function sj(e) {
  return function () {
    for (var t = arguments.length, n = new Array(t), r = 0; r < t; r++)
      n[r] = arguments[r];
    return If(e, n);
  };
}
function ue(e, t, n) {
  var r;
  (n = (r = n) !== null && r !== void 0 ? r : ql), bv && bv(e, null);
  let i = t.length;
  for (; i--; ) {
    let o = t[i];
    if (typeof o == "string") {
      const a = n(o);
      a !== o && (ej(t) || (t[i] = a), (o = a));
    }
    e[o] = !0;
  }
  return e;
}
function gi(e) {
  const t = rj(null);
  for (const [n, r] of Tw(e)) t[n] = r;
  return t;
}
function Pl(e, t) {
  for (; e !== null; ) {
    const r = nj(e, t);
    if (r) {
      if (r.get) return tn(r.get);
      if (typeof r.value == "function") return tn(r.value);
    }
    e = tj(e);
  }
  function n(r) {
    return console.warn("fallback value for", r), null;
  }
  return n;
}
const Cv = vt([
    "a",
    "abbr",
    "acronym",
    "address",
    "area",
    "article",
    "aside",
    "audio",
    "b",
    "bdi",
    "bdo",
    "big",
    "blink",
    "blockquote",
    "body",
    "br",
    "button",
    "canvas",
    "caption",
    "center",
    "cite",
    "code",
    "col",
    "colgroup",
    "content",
    "data",
    "datalist",
    "dd",
    "decorator",
    "del",
    "details",
    "dfn",
    "dialog",
    "dir",
    "div",
    "dl",
    "dt",
    "element",
    "em",
    "fieldset",
    "figcaption",
    "figure",
    "font",
    "footer",
    "form",
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "head",
    "header",
    "hgroup",
    "hr",
    "html",
    "i",
    "img",
    "input",
    "ins",
    "kbd",
    "label",
    "legend",
    "li",
    "main",
    "map",
    "mark",
    "marquee",
    "menu",
    "menuitem",
    "meter",
    "nav",
    "nobr",
    "ol",
    "optgroup",
    "option",
    "output",
    "p",
    "picture",
    "pre",
    "progress",
    "q",
    "rp",
    "rt",
    "ruby",
    "s",
    "samp",
    "section",
    "select",
    "shadow",
    "small",
    "source",
    "spacer",
    "span",
    "strike",
    "strong",
    "style",
    "sub",
    "summary",
    "sup",
    "table",
    "tbody",
    "td",
    "template",
    "textarea",
    "tfoot",
    "th",
    "thead",
    "time",
    "tr",
    "track",
    "tt",
    "u",
    "ul",
    "var",
    "video",
    "wbr",
  ]),
  ed = vt([
    "svg",
    "a",
    "altglyph",
    "altglyphdef",
    "altglyphitem",
    "animatecolor",
    "animatemotion",
    "animatetransform",
    "circle",
    "clippath",
    "defs",
    "desc",
    "ellipse",
    "filter",
    "font",
    "g",
    "glyph",
    "glyphref",
    "hkern",
    "image",
    "line",
    "lineargradient",
    "marker",
    "mask",
    "metadata",
    "mpath",
    "path",
    "pattern",
    "polygon",
    "polyline",
    "radialgradient",
    "rect",
    "stop",
    "style",
    "switch",
    "symbol",
    "text",
    "textpath",
    "title",
    "tref",
    "tspan",
    "view",
    "vkern",
  ]),
  td = vt([
    "feBlend",
    "feColorMatrix",
    "feComponentTransfer",
    "feComposite",
    "feConvolveMatrix",
    "feDiffuseLighting",
    "feDisplacementMap",
    "feDistantLight",
    "feDropShadow",
    "feFlood",
    "feFuncA",
    "feFuncB",
    "feFuncG",
    "feFuncR",
    "feGaussianBlur",
    "feImage",
    "feMerge",
    "feMergeNode",
    "feMorphology",
    "feOffset",
    "fePointLight",
    "feSpecularLighting",
    "feSpotLight",
    "feTile",
    "feTurbulence",
  ]),
  uj = vt([
    "animate",
    "color-profile",
    "cursor",
    "discard",
    "font-face",
    "font-face-format",
    "font-face-name",
    "font-face-src",
    "font-face-uri",
    "foreignobject",
    "hatch",
    "hatchpath",
    "mesh",
    "meshgradient",
    "meshpatch",
    "meshrow",
    "missing-glyph",
    "script",
    "set",
    "solidcolor",
    "unknown",
    "use",
  ]),
  nd = vt([
    "math",
    "menclose",
    "merror",
    "mfenced",
    "mfrac",
    "mglyph",
    "mi",
    "mlabeledtr",
    "mmultiscripts",
    "mn",
    "mo",
    "mover",
    "mpadded",
    "mphantom",
    "mroot",
    "mrow",
    "ms",
    "mspace",
    "msqrt",
    "mstyle",
    "msub",
    "msup",
    "msubsup",
    "mtable",
    "mtd",
    "mtext",
    "mtr",
    "munder",
    "munderover",
    "mprescripts",
  ]),
  cj = vt([
    "maction",
    "maligngroup",
    "malignmark",
    "mlongdiv",
    "mscarries",
    "mscarry",
    "msgroup",
    "mstack",
    "msline",
    "msrow",
    "semantics",
    "annotation",
    "annotation-xml",
    "mprescripts",
    "none",
  ]),
  Ev = vt(["#text"]),
  Tv = vt([
    "accept",
    "action",
    "align",
    "alt",
    "autocapitalize",
    "autocomplete",
    "autopictureinpicture",
    "autoplay",
    "background",
    "bgcolor",
    "border",
    "capture",
    "cellpadding",
    "cellspacing",
    "checked",
    "cite",
    "class",
    "clear",
    "color",
    "cols",
    "colspan",
    "controls",
    "controlslist",
    "coords",
    "crossorigin",
    "datetime",
    "decoding",
    "default",
    "dir",
    "disabled",
    "disablepictureinpicture",
    "disableremoteplayback",
    "download",
    "draggable",
    "enctype",
    "enterkeyhint",
    "face",
    "for",
    "headers",
    "height",
    "hidden",
    "high",
    "href",
    "hreflang",
    "id",
    "inputmode",
    "integrity",
    "ismap",
    "kind",
    "label",
    "lang",
    "list",
    "loading",
    "loop",
    "low",
    "max",
    "maxlength",
    "media",
    "method",
    "min",
    "minlength",
    "multiple",
    "muted",
    "name",
    "nonce",
    "noshade",
    "novalidate",
    "nowrap",
    "open",
    "optimum",
    "pattern",
    "placeholder",
    "playsinline",
    "poster",
    "preload",
    "pubdate",
    "radiogroup",
    "readonly",
    "rel",
    "required",
    "rev",
    "reversed",
    "role",
    "rows",
    "rowspan",
    "spellcheck",
    "scope",
    "selected",
    "shape",
    "size",
    "sizes",
    "span",
    "srclang",
    "start",
    "src",
    "srcset",
    "step",
    "style",
    "summary",
    "tabindex",
    "title",
    "translate",
    "type",
    "usemap",
    "valign",
    "value",
    "width",
    "xmlns",
    "slot",
  ]),
  rd = vt([
    "accent-height",
    "accumulate",
    "additive",
    "alignment-baseline",
    "ascent",
    "attributename",
    "attributetype",
    "azimuth",
    "basefrequency",
    "baseline-shift",
    "begin",
    "bias",
    "by",
    "class",
    "clip",
    "clippathunits",
    "clip-path",
    "clip-rule",
    "color",
    "color-interpolation",
    "color-interpolation-filters",
    "color-profile",
    "color-rendering",
    "cx",
    "cy",
    "d",
    "dx",
    "dy",
    "diffuseconstant",
    "direction",
    "display",
    "divisor",
    "dur",
    "edgemode",
    "elevation",
    "end",
    "fill",
    "fill-opacity",
    "fill-rule",
    "filter",
    "filterunits",
    "flood-color",
    "flood-opacity",
    "font-family",
    "font-size",
    "font-size-adjust",
    "font-stretch",
    "font-style",
    "font-variant",
    "font-weight",
    "fx",
    "fy",
    "g1",
    "g2",
    "glyph-name",
    "glyphref",
    "gradientunits",
    "gradienttransform",
    "height",
    "href",
    "id",
    "image-rendering",
    "in",
    "in2",
    "k",
    "k1",
    "k2",
    "k3",
    "k4",
    "kerning",
    "keypoints",
    "keysplines",
    "keytimes",
    "lang",
    "lengthadjust",
    "letter-spacing",
    "kernelmatrix",
    "kernelunitlength",
    "lighting-color",
    "local",
    "marker-end",
    "marker-mid",
    "marker-start",
    "markerheight",
    "markerunits",
    "markerwidth",
    "maskcontentunits",
    "maskunits",
    "max",
    "mask",
    "media",
    "method",
    "mode",
    "min",
    "name",
    "numoctaves",
    "offset",
    "operator",
    "opacity",
    "order",
    "orient",
    "orientation",
    "origin",
    "overflow",
    "paint-order",
    "path",
    "pathlength",
    "patterncontentunits",
    "patterntransform",
    "patternunits",
    "points",
    "preservealpha",
    "preserveaspectratio",
    "primitiveunits",
    "r",
    "rx",
    "ry",
    "radius",
    "refx",
    "refy",
    "repeatcount",
    "repeatdur",
    "restart",
    "result",
    "rotate",
    "scale",
    "seed",
    "shape-rendering",
    "specularconstant",
    "specularexponent",
    "spreadmethod",
    "startoffset",
    "stddeviation",
    "stitchtiles",
    "stop-color",
    "stop-opacity",
    "stroke-dasharray",
    "stroke-dashoffset",
    "strokeLinecap",
    "strokeLinejoin",
    "stroke-miterlimit",
    "stroke-opacity",
    "stroke",
    "strokeWidth",
    "style",
    "surfacescale",
    "systemlanguage",
    "tabindex",
    "targetx",
    "targety",
    "transform",
    "transform-origin",
    "text-anchor",
    "text-decoration",
    "text-rendering",
    "textlength",
    "type",
    "u1",
    "u2",
    "unicode",
    "values",
    "viewbox",
    "visibility",
    "version",
    "vert-adv-y",
    "vert-origin-x",
    "vert-origin-y",
    "width",
    "word-spacing",
    "wrap",
    "writing-mode",
    "xchannelselector",
    "ychannelselector",
    "x",
    "x1",
    "x2",
    "xmlns",
    "y",
    "y1",
    "y2",
    "z",
    "zoomandpan",
  ]),
  kv = vt([
    "accent",
    "accentunder",
    "align",
    "bevelled",
    "close",
    "columnsalign",
    "columnlines",
    "columnspan",
    "denomalign",
    "depth",
    "dir",
    "display",
    "displaystyle",
    "encoding",
    "fence",
    "frame",
    "height",
    "href",
    "id",
    "largeop",
    "length",
    "linethickness",
    "lspace",
    "lquote",
    "mathbackground",
    "mathcolor",
    "mathsize",
    "mathvariant",
    "maxsize",
    "minsize",
    "movablelimits",
    "notation",
    "numalign",
    "open",
    "rowalign",
    "rowlines",
    "rowspacing",
    "rowspan",
    "rspace",
    "rquote",
    "scriptlevel",
    "scriptminsize",
    "scriptsizemultiplier",
    "selection",
    "separator",
    "separators",
    "stretchy",
    "subscriptshift",
    "supscriptshift",
    "symmetric",
    "voffset",
    "width",
    "xmlns",
  ]),
  Il = vt(["xlink:href", "xml:id", "xlink:title", "xml:space", "xmlns:xlink"]),
  dj = vn(/\{\{[\w\W]*|[\w\W]*\}\}/gm),
  fj = vn(/<%[\w\W]*|[\w\W]*%>/gm),
  pj = vn(/\${[\w\W]*}/gm),
  mj = vn(/^data-[\-\w.\u00B7-\uFFFF]/),
  hj = vn(/^aria-[\-\w]+$/),
  kw = vn(
    /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i
  ),
  gj = vn(/^(?:\w+script|data):/i),
  vj = vn(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),
  Pw = vn(/^html$/i);
var Pv = Object.freeze({
  __proto__: null,
  MUSTACHE_EXPR: dj,
  ERB_EXPR: fj,
  TMPLIT_EXPR: pj,
  DATA_ATTR: mj,
  ARIA_ATTR: hj,
  IS_ALLOWED_URI: kw,
  IS_SCRIPT_OR_DATA: gj,
  ATTR_WHITESPACE: vj,
  DOCTYPE_NAME: Pw,
});
const yj = () => (typeof window > "u" ? null : window),
  xj = function (t, n) {
    if (typeof t != "object" || typeof t.createPolicy != "function")
      return null;
    let r = null;
    const i = "data-tt-policy-suffix";
    n && n.hasAttribute(i) && (r = n.getAttribute(i));
    const o = "dompurify" + (r ? "#" + r : "");
    try {
      return t.createPolicy(o, {
        createHTML(a) {
          return a;
        },
        createScriptURL(a) {
          return a;
        },
      });
    } catch {
      return (
        console.warn("TrustedTypes policy " + o + " could not be created."),
        null
      );
    }
  };
function Iw() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : yj();
  const t = (Q) => Iw(Q);
  if (
    ((t.version = "3.0.3"),
    (t.removed = []),
    !e || !e.document || e.document.nodeType !== 9)
  )
    return (t.isSupported = !1), t;
  const n = e.document,
    r = n.currentScript;
  let { document: i } = e;
  const {
      DocumentFragment: o,
      HTMLTemplateElement: a,
      Node: l,
      Element: s,
      NodeFilter: u,
      NamedNodeMap: d = e.NamedNodeMap || e.MozNamedAttrMap,
      HTMLFormElement: c,
      DOMParser: f,
      trustedTypes: h,
    } = e,
    v = s.prototype,
    y = Pl(v, "cloneNode"),
    w = Pl(v, "nextSibling"),
    m = Pl(v, "childNodes"),
    g = Pl(v, "parentNode");
  if (typeof a == "function") {
    const Q = i.createElement("template");
    Q.content && Q.content.ownerDocument && (i = Q.content.ownerDocument);
  }
  let x,
    b = "";
  const {
      implementation: C,
      createNodeIterator: E,
      createDocumentFragment: P,
      getElementsByTagName: T,
    } = i,
    { importNode: I } = n;
  let O = {};
  t.isSupported =
    typeof Tw == "function" &&
    typeof g == "function" &&
    C &&
    C.createHTMLDocument !== void 0;
  const {
    MUSTACHE_EXPR: D,
    ERB_EXPR: N,
    TMPLIT_EXPR: A,
    DATA_ATTR: R,
    ARIA_ATTR: V,
    IS_SCRIPT_OR_DATA: J,
    ATTR_WHITESPACE: re,
  } = Pv;
  let { IS_ALLOWED_URI: L } = Pv,
    M = null;
  const W = ue({}, [...Cv, ...ed, ...td, ...nd, ...Ev]);
  let K = null;
  const $ = ue({}, [...Tv, ...rd, ...kv, ...Il]);
  let _ = Object.seal(
      Object.create(null, {
        tagNameCheck: {
          writable: !0,
          configurable: !1,
          enumerable: !0,
          value: null,
        },
        attributeNameCheck: {
          writable: !0,
          configurable: !1,
          enumerable: !0,
          value: null,
        },
        allowCustomizedBuiltInElements: {
          writable: !0,
          configurable: !1,
          enumerable: !0,
          value: !1,
        },
      })
    ),
    G = null,
    X = null,
    j = !0,
    ie = !0,
    F = !1,
    ye = !0,
    oe = !1,
    le = !1,
    te = !1,
    ke = !1,
    Ee = !1,
    se = !1,
    Pe = !1,
    de = !0,
    Fe = !1;
  const Pt = "user-content-";
  let Ie = !0,
    wn = !1,
    Ht = {},
    Xe = null;
  const ne = ue({}, [
    "annotation-xml",
    "audio",
    "colgroup",
    "desc",
    "foreignobject",
    "head",
    "iframe",
    "math",
    "mi",
    "mn",
    "mo",
    "ms",
    "mtext",
    "noembed",
    "noframes",
    "noscript",
    "plaintext",
    "script",
    "style",
    "svg",
    "template",
    "thead",
    "title",
    "video",
    "xmp",
  ]);
  let Oe = null;
  const ci = ue({}, ["audio", "video", "img", "source", "image", "track"]);
  let Dr = null;
  const on = ue({}, [
      "alt",
      "class",
      "for",
      "id",
      "label",
      "name",
      "pattern",
      "placeholder",
      "role",
      "summary",
      "title",
      "value",
      "style",
      "xmlns",
    ]),
    Ka = "http://www.w3.org/1998/Math/MathML",
    Qa = "http://www.w3.org/2000/svg",
    On = "http://www.w3.org/1999/xhtml";
  let di = On,
    Hu = !1,
    Gu = null;
  const $w = ue({}, [Ka, Qa, On], Jc);
  let Or;
  const Bw = ["application/xhtml+xml", "text/html"],
    zw = "text/html";
  let Ke,
    fi = null;
  const Fw = i.createElement("form"),
    Pm = function (k) {
      return k instanceof RegExp || k instanceof Function;
    },
    Wu = function (k) {
      if (!(fi && fi === k)) {
        if (
          ((!k || typeof k != "object") && (k = {}),
          (k = gi(k)),
          (Or =
            Bw.indexOf(k.PARSER_MEDIA_TYPE) === -1
              ? (Or = zw)
              : (Or = k.PARSER_MEDIA_TYPE)),
          (Ke = Or === "application/xhtml+xml" ? Jc : ql),
          (M = "ALLOWED_TAGS" in k ? ue({}, k.ALLOWED_TAGS, Ke) : W),
          (K = "ALLOWED_ATTR" in k ? ue({}, k.ALLOWED_ATTR, Ke) : $),
          (Gu =
            "ALLOWED_NAMESPACES" in k ? ue({}, k.ALLOWED_NAMESPACES, Jc) : $w),
          (Dr =
            "ADD_URI_SAFE_ATTR" in k
              ? ue(gi(on), k.ADD_URI_SAFE_ATTR, Ke)
              : on),
          (Oe =
            "ADD_DATA_URI_TAGS" in k
              ? ue(gi(ci), k.ADD_DATA_URI_TAGS, Ke)
              : ci),
          (Xe = "FORBID_CONTENTS" in k ? ue({}, k.FORBID_CONTENTS, Ke) : ne),
          (G = "FORBID_TAGS" in k ? ue({}, k.FORBID_TAGS, Ke) : {}),
          (X = "FORBID_ATTR" in k ? ue({}, k.FORBID_ATTR, Ke) : {}),
          (Ht = "USE_PROFILES" in k ? k.USE_PROFILES : !1),
          (j = k.ALLOW_ARIA_ATTR !== !1),
          (ie = k.ALLOW_DATA_ATTR !== !1),
          (F = k.ALLOW_UNKNOWN_PROTOCOLS || !1),
          (ye = k.ALLOW_SELF_CLOSE_IN_ATTR !== !1),
          (oe = k.SAFE_FOR_TEMPLATES || !1),
          (le = k.WHOLE_DOCUMENT || !1),
          (Ee = k.RETURN_DOM || !1),
          (se = k.RETURN_DOM_FRAGMENT || !1),
          (Pe = k.RETURN_TRUSTED_TYPE || !1),
          (ke = k.FORCE_BODY || !1),
          (de = k.SANITIZE_DOM !== !1),
          (Fe = k.SANITIZE_NAMED_PROPS || !1),
          (Ie = k.KEEP_CONTENT !== !1),
          (wn = k.IN_PLACE || !1),
          (L = k.ALLOWED_URI_REGEXP || kw),
          (di = k.NAMESPACE || On),
          (_ = k.CUSTOM_ELEMENT_HANDLING || {}),
          k.CUSTOM_ELEMENT_HANDLING &&
            Pm(k.CUSTOM_ELEMENT_HANDLING.tagNameCheck) &&
            (_.tagNameCheck = k.CUSTOM_ELEMENT_HANDLING.tagNameCheck),
          k.CUSTOM_ELEMENT_HANDLING &&
            Pm(k.CUSTOM_ELEMENT_HANDLING.attributeNameCheck) &&
            (_.attributeNameCheck =
              k.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),
          k.CUSTOM_ELEMENT_HANDLING &&
            typeof k.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements ==
              "boolean" &&
            (_.allowCustomizedBuiltInElements =
              k.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),
          oe && (ie = !1),
          se && (Ee = !0),
          Ht &&
            ((M = ue({}, [...Ev])),
            (K = []),
            Ht.html === !0 && (ue(M, Cv), ue(K, Tv)),
            Ht.svg === !0 && (ue(M, ed), ue(K, rd), ue(K, Il)),
            Ht.svgFilters === !0 && (ue(M, td), ue(K, rd), ue(K, Il)),
            Ht.mathMl === !0 && (ue(M, nd), ue(K, kv), ue(K, Il))),
          k.ADD_TAGS && (M === W && (M = gi(M)), ue(M, k.ADD_TAGS, Ke)),
          k.ADD_ATTR && (K === $ && (K = gi(K)), ue(K, k.ADD_ATTR, Ke)),
          k.ADD_URI_SAFE_ATTR && ue(Dr, k.ADD_URI_SAFE_ATTR, Ke),
          k.FORBID_CONTENTS &&
            (Xe === ne && (Xe = gi(Xe)), ue(Xe, k.FORBID_CONTENTS, Ke)),
          Ie && (M["#text"] = !0),
          le && ue(M, ["html", "head", "body"]),
          M.table && (ue(M, ["tbody"]), delete G.tbody),
          k.TRUSTED_TYPES_POLICY)
        ) {
          if (typeof k.TRUSTED_TYPES_POLICY.createHTML != "function")
            throw Eo(
              'TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.'
            );
          if (typeof k.TRUSTED_TYPES_POLICY.createScriptURL != "function")
            throw Eo(
              'TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.'
            );
          (x = k.TRUSTED_TYPES_POLICY), (b = x.createHTML(""));
        } else
          x === void 0 && (x = xj(h, r)),
            x !== null && typeof b == "string" && (b = x.createHTML(""));
        vt && vt(k), (fi = k);
      }
    },
    Im = ue({}, ["mi", "mo", "mn", "ms", "mtext"]),
    Am = ue({}, ["foreignobject", "desc", "title", "annotation-xml"]),
    Uw = ue({}, ["title", "style", "font", "a", "script"]),
    Za = ue({}, ed);
  ue(Za, td), ue(Za, uj);
  const Vu = ue({}, nd);
  ue(Vu, cj);
  const Hw = function (k) {
      let z = g(k);
      (!z || !z.tagName) && (z = { namespaceURI: di, tagName: "template" });
      const q = ql(k.tagName),
        Se = ql(z.tagName);
      return Gu[k.namespaceURI]
        ? k.namespaceURI === Qa
          ? z.namespaceURI === On
            ? q === "svg"
            : z.namespaceURI === Ka
            ? q === "svg" && (Se === "annotation-xml" || Im[Se])
            : !!Za[q]
          : k.namespaceURI === Ka
          ? z.namespaceURI === On
            ? q === "math"
            : z.namespaceURI === Qa
            ? q === "math" && Am[Se]
            : !!Vu[q]
          : k.namespaceURI === On
          ? (z.namespaceURI === Qa && !Am[Se]) ||
            (z.namespaceURI === Ka && !Im[Se])
            ? !1
            : !Vu[q] && (Uw[q] || !Za[q])
          : !!(Or === "application/xhtml+xml" && Gu[k.namespaceURI])
        : !1;
    },
    jr = function (k) {
      Co(t.removed, { element: k });
      try {
        k.parentNode.removeChild(k);
      } catch {
        k.remove();
      }
    },
    qu = function (k, z) {
      try {
        Co(t.removed, { attribute: z.getAttributeNode(k), from: z });
      } catch {
        Co(t.removed, { attribute: null, from: z });
      }
      if ((z.removeAttribute(k), k === "is" && !K[k]))
        if (Ee || se)
          try {
            jr(z);
          } catch {}
        else
          try {
            z.setAttribute(k, "");
          } catch {}
    },
    Dm = function (k) {
      let z, q;
      if (ke) k = "<remove></remove>" + k;
      else {
        const Gt = oj(k, /^[\r\n\t ]+/);
        q = Gt && Gt[0];
      }
      Or === "application/xhtml+xml" &&
        di === On &&
        (k =
          '<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>' +
          k +
          "</body></html>");
      const Se = x ? x.createHTML(k) : k;
      if (di === On)
        try {
          z = new f().parseFromString(Se, Or);
        } catch {}
      if (!z || !z.documentElement) {
        z = C.createDocument(di, "template", null);
        try {
          z.documentElement.innerHTML = Hu ? b : Se;
        } catch {}
      }
      const Qe = z.body || z.documentElement;
      return (
        k &&
          q &&
          Qe.insertBefore(i.createTextNode(q), Qe.childNodes[0] || null),
        di === On
          ? T.call(z, le ? "html" : "body")[0]
          : le
          ? z.documentElement
          : Qe
      );
    },
    Om = function (k) {
      return E.call(
        k.ownerDocument || k,
        k,
        u.SHOW_ELEMENT | u.SHOW_COMMENT | u.SHOW_TEXT,
        null,
        !1
      );
    },
    Gw = function (k) {
      return (
        k instanceof c &&
        (typeof k.nodeName != "string" ||
          typeof k.textContent != "string" ||
          typeof k.removeChild != "function" ||
          !(k.attributes instanceof d) ||
          typeof k.removeAttribute != "function" ||
          typeof k.setAttribute != "function" ||
          typeof k.namespaceURI != "string" ||
          typeof k.insertBefore != "function" ||
          typeof k.hasChildNodes != "function")
      );
    },
    Ja = function (k) {
      return typeof l == "object"
        ? k instanceof l
        : k &&
            typeof k == "object" &&
            typeof k.nodeType == "number" &&
            typeof k.nodeName == "string";
    },
    jn = function (k, z, q) {
      O[k] &&
        ij(O[k], (Se) => {
          Se.call(t, z, q, fi);
        });
    },
    jm = function (k) {
      let z;
      if ((jn("beforeSanitizeElements", k, null), Gw(k))) return jr(k), !0;
      const q = Ke(k.nodeName);
      if (
        (jn("uponSanitizeElement", k, { tagName: q, allowedTags: M }),
        k.hasChildNodes() &&
          !Ja(k.firstElementChild) &&
          (!Ja(k.content) || !Ja(k.content.firstElementChild)) &&
          It(/<[/\w]/g, k.innerHTML) &&
          It(/<[/\w]/g, k.textContent))
      )
        return jr(k), !0;
      if (!M[q] || G[q]) {
        if (
          !G[q] &&
          Rm(q) &&
          ((_.tagNameCheck instanceof RegExp && It(_.tagNameCheck, q)) ||
            (_.tagNameCheck instanceof Function && _.tagNameCheck(q)))
        )
          return !1;
        if (Ie && !Xe[q]) {
          const Se = g(k) || k.parentNode,
            Qe = m(k) || k.childNodes;
          if (Qe && Se) {
            const Gt = Qe.length;
            for (let _e = Gt - 1; _e >= 0; --_e)
              Se.insertBefore(y(Qe[_e], !0), w(k));
          }
        }
        return jr(k), !0;
      }
      return (k instanceof s && !Hw(k)) ||
        ((q === "noscript" || q === "noembed") &&
          It(/<\/no(script|embed)/i, k.innerHTML))
        ? (jr(k), !0)
        : (oe &&
            k.nodeType === 3 &&
            ((z = k.textContent),
            (z = ln(z, D, " ")),
            (z = ln(z, N, " ")),
            (z = ln(z, A, " ")),
            k.textContent !== z &&
              (Co(t.removed, { element: k.cloneNode() }), (k.textContent = z))),
          jn("afterSanitizeElements", k, null),
          !1);
    },
    Nm = function (k, z, q) {
      if (de && (z === "id" || z === "name") && (q in i || q in Fw)) return !1;
      if (!(ie && !X[z] && It(R, z))) {
        if (!(j && It(V, z))) {
          if (!K[z] || X[z]) {
            if (
              !(
                (Rm(k) &&
                  ((_.tagNameCheck instanceof RegExp &&
                    It(_.tagNameCheck, k)) ||
                    (_.tagNameCheck instanceof Function &&
                      _.tagNameCheck(k))) &&
                  ((_.attributeNameCheck instanceof RegExp &&
                    It(_.attributeNameCheck, z)) ||
                    (_.attributeNameCheck instanceof Function &&
                      _.attributeNameCheck(z)))) ||
                (z === "is" &&
                  _.allowCustomizedBuiltInElements &&
                  ((_.tagNameCheck instanceof RegExp &&
                    It(_.tagNameCheck, q)) ||
                    (_.tagNameCheck instanceof Function && _.tagNameCheck(q))))
              )
            )
              return !1;
          } else if (!Dr[z]) {
            if (!It(L, ln(q, re, ""))) {
              if (
                !(
                  (z === "src" || z === "xlink:href" || z === "href") &&
                  k !== "script" &&
                  aj(q, "data:") === 0 &&
                  Oe[k]
                )
              ) {
                if (!(F && !It(J, ln(q, re, "")))) {
                  if (q) return !1;
                }
              }
            }
          }
        }
      }
      return !0;
    },
    Rm = function (k) {
      return k.indexOf("-") > 0;
    },
    Lm = function (k) {
      let z, q, Se, Qe;
      jn("beforeSanitizeAttributes", k, null);
      const { attributes: Gt } = k;
      if (!Gt) return;
      const _e = {
        attrName: "",
        attrValue: "",
        keepAttr: !0,
        allowedAttributes: K,
      };
      for (Qe = Gt.length; Qe--; ) {
        z = Gt[Qe];
        const { name: bn, namespaceURI: Yu } = z;
        if (
          ((q = bn === "value" ? z.value : lj(z.value)),
          (Se = Ke(bn)),
          (_e.attrName = Se),
          (_e.attrValue = q),
          (_e.keepAttr = !0),
          (_e.forceKeepAttr = void 0),
          jn("uponSanitizeAttribute", k, _e),
          (q = _e.attrValue),
          _e.forceKeepAttr || (qu(bn, k), !_e.keepAttr))
        )
          continue;
        if (!ye && It(/\/>/i, q)) {
          qu(bn, k);
          continue;
        }
        oe && ((q = ln(q, D, " ")), (q = ln(q, N, " ")), (q = ln(q, A, " ")));
        const Mm = Ke(k.nodeName);
        if (Nm(Mm, Se, q)) {
          if (
            (Fe && (Se === "id" || Se === "name") && (qu(bn, k), (q = Pt + q)),
            x &&
              typeof h == "object" &&
              typeof h.getAttributeType == "function" &&
              !Yu)
          )
            switch (h.getAttributeType(Mm, Se)) {
              case "TrustedHTML": {
                q = x.createHTML(q);
                break;
              }
              case "TrustedScriptURL": {
                q = x.createScriptURL(q);
                break;
              }
            }
          try {
            Yu ? k.setAttributeNS(Yu, bn, q) : k.setAttribute(bn, q),
              Sv(t.removed);
          } catch {}
        }
      }
      jn("afterSanitizeAttributes", k, null);
    },
    Ww = function Q(k) {
      let z;
      const q = Om(k);
      for (jn("beforeSanitizeShadowDOM", k, null); (z = q.nextNode()); )
        jn("uponSanitizeShadowNode", z, null),
          !jm(z) && (z.content instanceof o && Q(z.content), Lm(z));
      jn("afterSanitizeShadowDOM", k, null);
    };
  return (
    (t.sanitize = function (Q) {
      let k =
          arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {},
        z,
        q,
        Se,
        Qe;
      if (((Hu = !Q), Hu && (Q = "<!-->"), typeof Q != "string" && !Ja(Q)))
        if (typeof Q.toString == "function") {
          if (((Q = Q.toString()), typeof Q != "string"))
            throw Eo("dirty is not a string, aborting");
        } else throw Eo("toString is not a function");
      if (!t.isSupported) return Q;
      if (
        (te || Wu(k), (t.removed = []), typeof Q == "string" && (wn = !1), wn)
      ) {
        if (Q.nodeName) {
          const bn = Ke(Q.nodeName);
          if (!M[bn] || G[bn])
            throw Eo("root node is forbidden and cannot be sanitized in-place");
        }
      } else if (Q instanceof l)
        (z = Dm("<!---->")),
          (q = z.ownerDocument.importNode(Q, !0)),
          (q.nodeType === 1 && q.nodeName === "BODY") || q.nodeName === "HTML"
            ? (z = q)
            : z.appendChild(q);
      else {
        if (!Ee && !oe && !le && Q.indexOf("<") === -1)
          return x && Pe ? x.createHTML(Q) : Q;
        if (((z = Dm(Q)), !z)) return Ee ? null : Pe ? b : "";
      }
      z && ke && jr(z.firstChild);
      const Gt = Om(wn ? Q : z);
      for (; (Se = Gt.nextNode()); )
        jm(Se) || (Se.content instanceof o && Ww(Se.content), Lm(Se));
      if (wn) return Q;
      if (Ee) {
        if (se)
          for (Qe = P.call(z.ownerDocument); z.firstChild; )
            Qe.appendChild(z.firstChild);
        else Qe = z;
        return (
          (K.shadowroot || K.shadowrootmod) && (Qe = I.call(n, Qe, !0)), Qe
        );
      }
      let _e = le ? z.outerHTML : z.innerHTML;
      return (
        le &&
          M["!doctype"] &&
          z.ownerDocument &&
          z.ownerDocument.doctype &&
          z.ownerDocument.doctype.name &&
          It(Pw, z.ownerDocument.doctype.name) &&
          (_e =
            "<!DOCTYPE " +
            z.ownerDocument.doctype.name +
            `>
` +
            _e),
        oe &&
          ((_e = ln(_e, D, " ")), (_e = ln(_e, N, " ")), (_e = ln(_e, A, " "))),
        x && Pe ? x.createHTML(_e) : _e
      );
    }),
    (t.setConfig = function (Q) {
      Wu(Q), (te = !0);
    }),
    (t.clearConfig = function () {
      (fi = null), (te = !1);
    }),
    (t.isValidAttribute = function (Q, k, z) {
      fi || Wu({});
      const q = Ke(Q),
        Se = Ke(k);
      return Nm(q, Se, z);
    }),
    (t.addHook = function (Q, k) {
      typeof k == "function" && ((O[Q] = O[Q] || []), Co(O[Q], k));
    }),
    (t.removeHook = function (Q) {
      if (O[Q]) return Sv(O[Q]);
    }),
    (t.removeHooks = function (Q) {
      O[Q] && (O[Q] = []);
    }),
    (t.removeAllHooks = function () {
      O = {};
    }),
    t
  );
}
var wj = Iw();
const bj = ({ text: e }) => {
    const t = () =>
      wj
        .sanitize(e)
        .split(/(\s+)/)
        .map((i, o) => {
          if (i.startsWith("@") && i.endsWith("")) {
            const l = `/${i.slice(1)}`;
            return p.jsx(
              H.Fragment,
              { children: p.jsx($t, { className: "b", to: l, children: i }) },
              o
            );
          } else return p.jsxs(H.Fragment, { children: [i, " "] }, o);
        });
    return p.jsx(p.Fragment, { children: t() });
  },
  Fu = S.memo(bj),
  Sj = () => {
    var d;
    const e = ge(Bu, ve),
      { username: t, pp: n } = ge(ri, ve),
      { username: r } = ge(Dn, ve),
      i = ge((c) => Tm(c, t), ve),
      o = ge(ri, ve),
      a = `/${t}`,
      l = ((d = i == null ? void 0 : i.info) == null ? void 0 : d.status) == 0,
      [s, u] = S.useState(!1);
    return p.jsxs(Cj, {
      children: [
        p.jsxs("div", {
          className: "l",
          children: [
            p.jsx($t, {
              className: "pp",
              to: a,
              children: p.jsx("img", {
                onContextMenu: qa,
                src: n || "/pp.jpg",
                alt: "pp",
              }),
            }),
            p.jsx($t, {
              className: "username",
              to: a,
              children: p.jsx("p", { children: t }),
            }),
            t != r &&
              !l &&
              e != "home" &&
              p.jsxs(p.Fragment, {
                children: [
                  p.jsx("span", { children: "•" }),
                  p.jsx("button", { children: "Follow" }),
                ],
              }),
          ],
        }),
        p.jsx("button", {
          onClick: () => u(!0),
          className: "d",
          children: p.jsx(EE, {}),
        }),
        s && p.jsx(Aw, { post: o, close: () => u(!1) }),
      ],
    });
  },
  Cj = ce.div`
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 14px 1rem;
  border-bottom: 1px solid #262626;
  .l {
    display: flex;
    align-items: center;
    .pp {
      img {
        width: 2rem;
        height: 2rem;
        border-radius: 100%;
      }
      margin-right: 14px;
    }
    .username {
      p {
        font-size: 14px;
        font-weight: 600;
        line-height: 18px;
      }
    }
    span {
      margin: 0px 6px;
    }
    button {
      background-color: transparent;
      border: none;
      outline: none;
      font-size: 14px;
      font-weight: 600;
      color: #0095f6;
      &:hover {
        color: #fafafa;
      }
    }
  }
  .d {
    width: 24px;
    height: 24px;
    background-color: transparent;
    border: none;
    outline: none;
  }
  a:hover {
    opacity: 0.6;
  }
  .d:hover {
    opacity: 0.6;
  }
`,
  Ej = ({ subcomment: e, commentid: t, reply: n }) => {
    const {
        isliked: r,
        pp: i,
        username: o,
        content: a,
        created: l,
        likecount: s,
        id: u,
      } = e,
      d = Ge(),
      c = window.location.pathname.split("/")[2],
      f = () => d(eo({ a: !r, commentid: t, postid: c, subcommentid: u })),
      h = S.useMemo(() => Ya(l), []),
      v = S.useMemo(
        () =>
          (new Date(Date.now()).getTime() - new Date(l).getTime()) / 1e3 < 1,
        []
      ),
      y = () => {
        r || d(eo({ a: !0, commentid: t, postid: c, subcommentid: u }));
      },
      [w, m] = S.useState(!1),
      g = () => m(!0),
      x = () => m(!1);
    return p.jsxs(Tj, {
      onDoubleClick: y,
      className: v ? "lastactive" : "",
      children: [
        p.jsx("div", {
          className: "left",
          children: p.jsx("div", {
            className: "pp",
            children: p.jsx($t, {
              className: "u",
              to: `/${o}`,
              children: p.jsx("img", { src: i || "/pp.jpg", alt: "pp" }),
            }),
          }),
        }),
        p.jsxs("div", {
          className: "right",
          children: [
            p.jsxs("div", {
              className: "upside",
              children: [
                p.jsxs("pre", {
                  children: [
                    p.jsx($t, { className: "u", to: `/${o}`, children: o }),
                    p.jsx(Fu, { text: a }),
                  ],
                }),
                p.jsx("button", {
                  onClick: f,
                  className: r ? "active" : "",
                  children: p.jsx(by, { isactive: r }),
                }),
              ],
            }),
            p.jsxs("div", {
              className: "down-side",
              children: [
                w &&
                  p.jsx(zu, {
                    postid: c,
                    type: "comment",
                    commentid: t,
                    quit: x,
                  }),
                s > 0 &&
                  p.jsxs("button", {
                    onClick: g,
                    className: "likes",
                    children: [s, " like", s > 1 && "s"],
                  }),
                p.jsx("p", { className: "date", children: h }),
                p.jsx("button", {
                  className: "reply",
                  onClick: n,
                  children: "Reply",
                }),
                p.jsx("button", {
                  className: "morex",
                  children: p.jsx(zp, {}),
                }),
              ],
            }),
          ],
        }),
      ],
    });
  },
  Tj = ce.li`
  display: flex;
  align-items: start;
  padding: 8px 4.5px;
  width: 100%;
  border-radius: 6px;
  &.lastactive {
    @keyframes l {
      0% {
        background-color: transparent;
      }
      25% {
        background-color: transparent;
      }
      50% {
        background-color: rgb(50, 50, 50);
      }
      100% {
        background-color: transparent;
      }
    }
    animation: 3s ease l;
  }
  &:hover .morex {
    display: block !important;
  }
  .left {
    width: 2rem;
    margin-right: 9px !important;
    min-width: 2rem;
    height: 2rem;
    width: 2rem;
    min-height: 2rem;
    .pp {
      a {
        width: 2rem;
        height: 2rem;
        img {
          border-radius: 100%;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
    }
  }
  .right {
    padding: 0px 4.5px;
    width: 100%;
    button {
      background-color: transparent;
    }
    .upside {
      width: 100%;
      display: flex;
      align-items: start;
      pre {
        word-wrap: break-word;
        max-width: 288px;
        width: 100%;
        white-space: pre-wrap;
        font-size: 14px;
        a {
          font-weight: 600;
          margin-right: 4px;
        }
      }
      button {
        margin-left: 18px;
      }
    }
    .down-side {
      display: flex;
      align-items: center;
      height: 18px;
      margin: 8px 0px 4px;
      .likes {
        font-size: 12px;
        color: #a8a8a8;
        margin-right: 12px;
        font-weight: 600;
      }
      .date {
        font-size: 12px;
        color: #a8a8a8;
        user-select: none;
        margin-right: 12px;
        font-weight: 600;
      }
      .reply {
        font-size: 12px;
        margin-right: 12px;
        color: #a8a8a8;
      }
      .morex {
        display: none;
      }
    }
  }
`,
  kj = ({ comment: e, reply: t }) => {
    const n = Ge(),
      {
        id: r,
        username: i,
        pp: o,
        likecount: a,
        subcommentcount: l,
        content: s,
        isliked: u,
        created: d,
        subcomments: { data: c, hasmore: f, t: h, loading: v },
      } = e,
      y = window.location.pathname.split("/")[2],
      w = () => n(eo({ a: !u, commentid: r, postid: y })),
      m = S.useMemo(() => Ya(d), []),
      g = () => t(r, i),
      x = () => {
        var N, A;
        const O = (N = c[c.length - 1]) == null ? void 0 : N.created,
          D = (A = c[c.length - 1]) == null ? void 0 : A.id;
        f && l > 0
          ? n(Ta({ postid: y, commentid: r, date: O, id: D }))
          : n(GO({ postid: y, commentid: r, t: !h }));
      },
      b = S.useMemo(
        () =>
          (new Date(Date.now()).getTime() - new Date(d).getTime()) / 1e3 < 1,
        []
      ),
      C = () => {
        u || n(eo({ a: !0, commentid: r, postid: y }));
      },
      [E, P] = S.useState(!1),
      T = () => P(!0),
      I = () => P(!1);
    return p.jsxs(Pj, {
      className: b ? "lastactive" : "",
      children: [
        p.jsx("div", {
          className: "left",
          onDoubleClick: C,
          children: p.jsx("div", {
            className: "pp",
            children: p.jsx($t, {
              className: "u",
              to: `/${i}`,
              children: p.jsx("img", { src: o || "/pp.jpg", alt: "pp" }),
            }),
          }),
        }),
        p.jsxs("div", {
          className: "right",
          children: [
            p.jsxs("div", {
              className: "upside",
              onDoubleClick: C,
              children: [
                p.jsxs("pre", {
                  children: [
                    p.jsx($t, {
                      className: "username",
                      to: `/${i}`,
                      children: i,
                    }),
                    p.jsx(Fu, { text: s }),
                  ],
                }),
                p.jsx("button", {
                  onClick: w,
                  className: u ? "active" : "",
                  children: p.jsx(by, { isactive: u }),
                }),
                E &&
                  p.jsx(zu, {
                    postid: y,
                    type: "comment",
                    commentid: r,
                    quit: I,
                  }),
              ],
            }),
            p.jsxs("div", {
              className: "down-side",
              onDoubleClick: C,
              children: [
                a > 0 &&
                  p.jsxs("button", {
                    onClick: T,
                    className: "likes",
                    children: [a, " like", a > 1 && "s"],
                  }),
                p.jsx("p", { className: "date", children: m }),
                p.jsx("button", {
                  className: "reply",
                  onClick: g,
                  children: "Reply",
                }),
                p.jsx("button", { className: "more", children: p.jsx(zp, {}) }),
              ],
            }),
            l > 0 &&
              p.jsxs("ul", {
                className: "view-replies",
                children: [
                  p.jsxs("div", {
                    className: "up",
                    children: [
                      p.jsxs("button", {
                        onClick: x,
                        children: [
                          p.jsx("div", { className: "line" }),
                          h && !f
                            ? p.jsx("p", { children: "Hide Replies" })
                            : p.jsxs("p", {
                                children: [
                                  "View replies (",
                                  f ? l - c.length : l,
                                  ")",
                                ],
                              }),
                        ],
                      }),
                      v && p.jsx(yn, {}),
                    ],
                  }),
                  (f ? c.length > 0 : h) &&
                    c.map((O) =>
                      p.jsx(
                        Ej,
                        {
                          subcomment: O,
                          commentid: r,
                          reply: () => t(e.id, O.username),
                        },
                        O.id
                      )
                    ),
                ],
              }),
          ],
        }),
      ],
    });
  },
  Pj = ce.li`
  display: flex;
  align-items: start;
  width: 100%;
  border-radius: 6px;
  overflow: hidden;
  padding: 8px 1rem;
  &.lastactive {
    @keyframes l {
      0% {
        background-color: transparent;
      }
      25% {
        background-color: transparent;
      }
      50% {
        background-color: rgb(50, 50, 50);
      }
      100% {
        background-color: transparent;
      }
    }
    animation: 3s ease l;
  }
  &:hover .more {
    display: block !important;
  }
  .left {
    width: 2rem;
    margin-right: 18px;
    min-width: 2rem;
    height: 2rem;
    width: 2rem;
    min-height: 2rem;
    .pp {
      a {
        width: 2rem;
        height: 2rem;
        img {
          border-radius: 100%;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
    }
  }
  .right {
    width: 100%;
    button {
      background-color: transparent;
    }
    .upside {
      width: 100%;
      display: flex;
      align-items: start;
      pre {
        word-wrap: break-word;
        max-width: 288px;
        width: 100%;
        white-space: pre-wrap;
        font-size: 14px;
        .username {
          font-weight: 600;
          margin-right: 4px;
        }
      }
      button {
        margin-left: 18px;
      }
    }
    .down-side {
      display: flex;
      align-items: center;
      height: 18px;
      margin: 8px 0px 4px;
      .likes {
        font-size: 12px;
        color: #a8a8a8;
        margin-right: 12px;
        font-weight: 600;
      }
      .date {
        user-select: none;
        font-size: 12px;
        font-weight: 600;
        color: #a8a8a8;
        margin-right: 12px;
      }
      .reply {
        font-size: 12px;
        margin-right: 12px;
        color: #a8a8a8;
      }
      .more {
        display: none;
      }
    }
    .view-replies {
      margin-top: 1rem;
      .up {
        height: 18px;
        display: flex;
        align-items: center;
        margin-bottom: 0.5rem;
        .loading-box {
          width: 20px;
          height: 20px;
        }
        button {
          display: flex;
          align-items: center;
          margin-right: 12px;
          .line {
            margin-right: 1rem;
            width: 24px;
            height: 1px;
            background-color: #a8a8a8;
          }
          color: #a8a8a8;
          font-size: 12px;
        }
      }
    }
  }
`,
  Ij = S.forwardRef(({ reply: e }, t) => {
    const n = S.useRef(null),
      r = S.useRef(null),
      i = Ge(),
      o = window.location.pathname.split("/")[2],
      {
        comments: { data: a, loading: l, hasmore: s },
      } = ge(ri, ve),
      u = (d) => {
        var v, y;
        const { scrollTop: c, clientHeight: f, scrollHeight: h } = d.target;
        l ||
          !s ||
          (f + c > h - 132 &&
            i(
              Ta({
                postid: o,
                id: (v = a[a.length - 1]) == null ? void 0 : v.id,
                date: (y = a[a.length - 1]) == null ? void 0 : y.created,
              })
            ));
      };
    return (
      S.useImperativeHandle(t, () => ({ dataContainerRef: n, contentRef: r })),
      p.jsxs(Aj, {
        ref: n,
        onScroll: u,
        children: [
          p.jsx(Dj, { ref: r }),
          a.map((d) => p.jsx(kj, { comment: d, reply: e }, d.id)),
          l && p.jsx(yn, {}),
        ],
      })
    );
  }),
  Aj = ce.ul`
  height: calc(100% - 146px - 71px);
  overflow-y: auto;
  width: 100%;
  &::-webkit-scrollbar {
    display: none;
  }
  .loading-box {
    margin: 1rem 0px;
  }
  .content {
    padding: 1rem;
    display: flex;
    width: 324px;
    margin-bottom: 1rem;
    pre {
      width: 100%;
      text-overflow: ellipsis;
      word-wrap: break-word;
      font-size: 14px;
      line-height: 18px;
      word-wrap: break-word;
      white-space: pre-wrap;
      overflow-wrap: break-word;
    }
    .pp {
      margin-right: 18px;
      a {
        width: 2rem;
        height: 2rem;
        display: block;
        &.b {
          font-weight: 400;
          color: #e0f1ff;
        }
        img {
          border-radius: 100%;
          width: 100%;
          height: 100%;
        }
      }
    }
    .text {
      font-size: 14px;
      width: 100%;
      .username {
        margin-right: 4px;
        font-weight: 600;
      }
      p {
        font-size: 12px;
        color: #a8a8a8;
        margin-top: 8px;
      }
    }
  }
`,
  Dj = S.forwardRef((e, t) => {
    const { pp: n, username: r, content: i, created: o } = ge(ri, ve),
      a = S.useMemo(() => Ya(o), []);
    return p.jsxs("div", {
      ref: t,
      className: "content",
      children: [
        p.jsx("div", {
          className: "pp",
          children: p.jsx($t, {
            to: `/${r}`,
            children: p.jsx("img", { src: n || "/pp.jpg", alt: "pp" }),
          }),
        }),
        p.jsxs("div", {
          className: "text",
          children: [
            p.jsxs("pre", {
              children: [
                p.jsx($t, { className: "username", to: `/${r}`, children: r }),
                i && p.jsx(Fu, { text: i }),
              ],
            }),
            p.jsx("p", { children: a }),
          ],
        }),
      ],
    });
  }),
  Oj = (e, t, n) => {
    if (!e) return;
    let r = e.scrollTop;
    const i = t - r,
      o = performance.now(),
      a = (l) => {
        const s = l - o,
          u = Math.min(s / n, 1),
          d = r + i * u;
        (e.scrollTop = d),
          s < n && e.scrollTop !== t && requestAnimationFrame(a);
      };
    requestAnimationFrame(a);
  },
  jj = () => {
    const e = Ge(),
      t = window.location.pathname.split("/")[2],
      {
        comments: { hasmore: n, data: r, sending: i },
      } = ge(ri, ve);
    S.useEffect(() => {
      n && r.length == 0 && e(Ta({ postid: t }));
    }, [t]);
    const [o, a] = S.useState(""),
      l = S.useRef(null),
      [s, u] = S.useState(null),
      [d, c] = S.useState(!1);
    S.useEffect(() => {
      c(!0);
    }, []);
    const f = (x, b) => {
      var C, E;
      a(`@${b} `),
        u({
          commentid: x,
          username: b,
          offset: ((C = w.current) == null ? void 0 : C.scrollTop) || 0,
        }),
        (E = l.current) == null || E.focus();
    };
    S.useEffect(() => {
      d &&
        (i ||
          (y(s ? h : g.current.contentRef.current.clientHeight || 0), a("")));
    }, [i]),
      S.useEffect(() => {
        if (s) {
          const { username: x } = s;
          o.slice(0, x.length + 2) != `@${x} ` && (u(null), a(""));
        }
      }, [o]);
    const [h, v] = S.useState(0),
      y = (x) => Oj(g.current.dataContainerRef.current, x, 500),
      w = S.useRef(null),
      m = S.useRef(null),
      g = S.useRef({ dataContainerRef: w, contentRef: m });
    return (
      S.useEffect(() => {
        var b;
        if (s && g.current.dataContainerRef.current) {
          var x = Array.from(g.current.dataContainerRef.current.children);
          x = x.slice(1);
          const C = r.findIndex((P) => P.id == s.commentid);
          let E = 0;
          for (let P = 0; P <= C; P++) E += x[P].clientHeight;
          v(
            E +
              ((b = g.current.contentRef.current) == null
                ? void 0
                : b.clientHeight)
          );
        }
      }, [r, s]),
      p.jsxs(Nj, {
        children: [
          p.jsx(Sj, {}),
          p.jsx(Ij, { reply: f, ref: g }),
          p.jsx(ZO, { ref: l, comment: o, setComment: a, isRepliying: s }),
        ],
      })
    );
  },
  Nj = ce.div`
  width: 100%;
  min-width: 240px;
  max-width: 400px;
  height: 100%;
`,
  Rj = () => {
    const e = Ge(),
      t = ge(ri, ve);
    S.useEffect(() => {
      a && !i && e(Sw(l));
    }, [t]);
    const [n, r] = S.useState(!1),
      { images: i, cover: o, more: a, id: l, isliked: s } = t;
    S.useEffect(() => {
      const d = setTimeout(() => {
        r(!1);
      }, 1e3);
      return () => {
        clearTimeout(d);
      };
    }, [n]);
    const u = () => {
      r(!0), !s && e(wr({ a: !0, t: "like", postid: l }));
    };
    return i
      ? p.jsxs("div", {
          className: "images",
          onDoubleClick: u,
          children: [
            p.jsx(Iu, {
              slidesPerView: 1,
              pagination: { clickable: !0 },
              navigation: !0,
              modules: [Jp, Zp],
              className: "mySwiper",
              children: i.map((d, c) =>
                p.jsxs(Au, {
                  children: [
                    p.jsx("img", { src: d, alt: c.toString() }),
                    p.jsx("div", { className: "layer" }),
                  ],
                })
              ),
            }),
            p.jsx("div", { className: `like-a ${n ? "a" : ""}` }),
          ],
        })
      : p.jsxs("div", {
          className: "cvr",
          onDoubleClick: u,
          children: [
            p.jsx("img", { className: "cover", src: o, alt: "cover" }),
            p.jsx("div", { className: "layer" }),
            p.jsx("div", { className: `like-a ${n ? "a" : ""}` }),
          ],
        });
  },
  Lj = () => {
    const e = ge(YO, ve),
      [t, n] = S.useState(
        e.findIndex((u) => u.id == window.location.pathname.split("/")[2])
      ),
      r = Ge(),
      i = () => {
        t != e.length - 1 &&
          (n(t + 1),
          window.history.replaceState(null, "", `/p/${e[t + 1].id}`),
          r(Pa(window.location.pathname.split("/")[2])));
      },
      o = ge(Bu, ve),
      a = o || window.location.pathname.split("/")[1],
      l = ge((u) => (["explore", "home"].includes(o) ? km(u) : Tm(u, a)), ve);
    S.useEffect(() => {
      if (o == "explore") {
        const {
          hasmore: { [o]: u },
          loading: { [o]: d },
        } = l;
        if (t == e.length - 1 && u && !d) {
          const { created: c, id: f } = e[e.length - 1];
          r(ni({ explore: !0, date: c, id: f }));
        }
      } else {
        const { hasmore: u, loading: d } = l;
        if (t == e.length - 1 && u && !d) {
          const c = window.location.pathname.split("/")[2],
            { created: f, id: h } = e[e.length - 1];
          r(Wr({ username: c, date: f, id: h }));
        }
      }
    }, [t]),
      S.useEffect(() => {
        const u = (d) => {
          d.key == "ArrowLeft" ? s() : d.key == "ArrowRight" && i();
        };
        return (
          window.addEventListener("keydown", u),
          () => {
            window.removeEventListener("keydown", u);
          }
        );
      }, [t]);
    const s = () => {
      t != 0 &&
        (n(t - 1),
        window.history.replaceState(null, "", `/p/${e[t - 1].id}`),
        r(Pa(window.location.pathname.split("/")[2])));
    };
    return p.jsxs(Mj, {
      children: [
        t > 0 &&
          p.jsx("button", {
            className: "leftnav",
            onClick: s,
            children: p.jsx(DE, {}),
          }),
        t < e.length - 1 &&
          p.jsx("button", {
            className: "rightnav",
            onClick: i,
            children: p.jsx(AE, {}),
          }),
      ],
    });
  },
  Mj = ce.div`
  position: fixed;
  top: calc(50% - 1rem);
  z-index: 121;
  width: 100%;
  height: 2rem;
  padding: 0px 1rem;
  pointer-events: none;
  button {
    pointer-events: all;
    width: 2rem;
    height: 2rem;
    border-radius: 100%;
    display: flex;
    position: absolute;
    justify-content: center;
    align-items: center;
    &:hover {
      opacity: 0.8;
    }
    background-color: #fff;
    &.leftnav {
      left: 1rem;
    }
    &.rightnav {
      right: 1rem;
    }
  }
  svg {
    transform: rotate(90deg);
    width: 1rem;
    height: 1rem;
  }
  .leftnav {
    transform: rotate(-180deg);
  }
`,
  _j = S.memo(Lj),
  $j = () => {
    const e = Ge(),
      t = ge(Bu, ve),
      n = () => {
        window.history.replaceState(null, "", `/${t == "home" ? "" : t}`),
          e(ka(null)),
          e(Pa(null));
      },
      r = (i) => {
        i.key == "Escape" && n();
      };
    return (
      S.useEffect(() => {
        const i = () => e(ka(null));
        return (
          window.addEventListener("popstate", i),
          window.addEventListener("keydown", r),
          () => {
            window.removeEventListener("popstate", i),
              window.removeEventListener("keydown", r);
          }
        );
      }, []),
      p.jsxs(p.Fragment, {
        children: [
          p.jsx(Uu, { onClick: n }),
          p.jsxs(Bj, { children: [p.jsx(Rj, {}), p.jsx(jj, {})] }),
          t != "home" && p.jsx(_j, {}),
        ],
      })
    );
  },
  Uu = ce.div`
  background-color: rgba(0, 0, 0, 0.6);
  width: 100vw;
  height: 100vh;
  left: 0px;
  top: 0px;
  position: fixed;
  z-index: 120;
`,
  Bj = ce.div`
  border-radius: 4px;
  @media screen and (max-width: 1328px) {
    left: 4rem !important;
    width: calc(100% - 8rem) !important;
    .cvr,
    .images {
      width: 100%;
      min-width: 500px;
      object-fit: cover;
    }
  }

  @media screen and (max-height: 864px) {
    top: 2rem !important;
    height: calc(100% - 4rem) !important;
  }

  background-color: rgba(0, 0, 0, 0.6);
  left: calc(50% - 600px);
  top: calc(50% - 400px);
  max-width: 1200px;
  width: 100%;
  height: 100%;
  max-height: 800px;
  position: fixed;
  z-index: 150;
  background-color: #000;
  display: flex;
  transform: scale(1.2);
  @keyframes sc {
    from {
      transform: scale(1.2);
    }
    to {
      transform: scale(1);
    }
  }
  animation: sc 0.1s ease-in-out forwards;
  .like-a {
    position: absolute;
    left: calc(50% - 64px);
    z-index: 10;
    top: calc(50% - 64px);
    background-image: url("/bg.png");
    background-repeat: no-repeat;
    background-position: 0 0;
    height: 128px;
    width: 128px;
    opacity: 0;
    &.a {
      @keyframes scsx {
        0% {
          opacity: 0;
          transform: scale(0);
        }
        15% {
          opacity: 0.9;
          transform: scale(1.2);
        }
        30% {
          transform: scale(0.95);
        }
        45%,
        80% {
          opacity: 0.9;
          transform: scale(1);
        }
        100% {
          opacity: 0;
          transform: scale(0);
        }
      }
      animation: 1s scsx ease-in-out;
    }
  }
  .cvr {
    height: 100%;
    max-width: 800px;
    width: 100%;
    min-width: 500px;
    position: relative;

    .layer {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0px;
      top: 0px;
      z-index: 10;
    }
    .cover {
      width: 100%;
      object-fit: cover;
      height: 100%;
    }
  }
  .swiper {
    height: 100%;
  }
  .images {
    height: 100%;
    width: 800px;
    position: relative;
    img {
      width: 100%;
      object-fit: cover;
      height: 100%;
      max-width: 800px;
    }
    .layer {
      position: absolute;
      left: 0px;
      top: 0px;
      width: 100%;
      height: 100%;
    }
  }
`,
  Aw = ({ post: e, close: t }) => {
    const { id: n } = ge(Dn, ve),
      r = e.owner == n,
      i = Ge(),
      o = () => i(Cw(e.id));
    return p.jsxs(p.Fragment, {
      children: [
        p.jsx(Uu, { onClick: t }),
        p.jsxs(zj, {
          className: r ? "my" : "",
          children: [
            r &&
              p.jsx("button", {
                onClick: o,
                className: "r",
                children: "Remove",
              }),
            p.jsx($t, { to: `/p/${e.id}`, children: "Go to post" }),
            p.jsx("button", {
              onClick: () =>
                navigator.clipboard
                  .writeText(window.location.origin + "/p/" + e.id)
                  .then(t),
              children: "Copy link",
            }),
            p.jsx("button", { onClick: t, children: "Cancel" }),
          ],
        }),
      ],
    });
  },
  zj = ce.div`
  @keyframes identifierx {
    0% {
      transform: scale(1.2);
    }
    100% {
      transform: scale(1);
    }
  }
  animation: identifierx 0.1s ease-in-out all;
  width: 400px;
  height: 150px;
  &.my {
    height: 200px;
  }
  background-color: #262626;
  border-radius: 12px;
  border-radius: 12px;
  position: fixed;
  left: calc(50% - 200px);
  top: calc(50% - 75px);
  z-index: 130;
  button,
  a,
  button {
    &.r {
      color: #ed4956;
      font-weight: 600 !important;
    }
    &:first-child {
      border-top: none;
    }
    border-top: 1px solid #363636;
    width: 100%;
    height: 49px;
    font-size: 14px;
    color: #fafafa;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`,
  Fj = ({ post: e }) => {
    const [t, n] = S.useState(!1),
      {
        images: r,
        isliked: i,
        id: o,
        username: a,
        pp: l,
        content: s,
        issaved: u,
        likecount: d,
        created: c,
        commentcount: f,
      } = e,
      h = Ge(),
      [v, y] = S.useState(!1);
    S.useEffect(() => {
      const R = setTimeout(() => {
        y(!1);
      }, 1e3);
      return () => {
        clearTimeout(R);
      };
    }, [v]);
    const w = () => {
        y(!0), !i && h(wr({ a: !0, t: "like", postid: o }));
      },
      m = () => h(wr({ a: !i, postid: o, t: "like" })),
      [g, x] = S.useState(!1),
      b = () => x(!1),
      C = () => x(!0),
      E = () => h(wr({ a: !u, postid: o, t: "save" })),
      P = S.useMemo(() => Ya(c).replace("ago", ""), []),
      T = () => {
        window.history.replaceState(null, "", `/p/${o}`),
          h(ka("home")),
          h(Pa(o));
      },
      I = S.useRef(null);
    S.useLayoutEffect(() => {
      I.current && A(I.current.scrollHeight > 36);
    }, []);
    const [O, D] = S.useState(!1),
      [N, A] = S.useState(!1);
    return p.jsxs(Uj, {
      children: [
        p.jsxs("div", {
          className: "info-s",
          children: [
            p.jsxs("div", {
              className: "left",
              children: [
                p.jsx(ft, {
                  className: "pp",
                  to: `/${a}`,
                  children: p.jsx("img", {
                    onContextMenu: qa,
                    src: l || "/pp.jpg",
                    alt: "pp",
                  }),
                }),
                p.jsx(ft, { className: "username", to: `/${a}`, children: a }),
                p.jsxs("p", { className: "date", children: [" • ", P] }),
              ],
            }),
            p.jsx("div", {
              className: "right",
              children: p.jsx("button", {
                onClick: () => n(!0),
                children: p.jsx(zp, {}),
              }),
            }),
          ],
        }),
        p.jsxs("div", {
          className: "images",
          onDoubleClick: w,
          children: [
            p.jsx(Iu, {
              slidesPerView: 1,
              pagination: { clickable: !0 },
              navigation: !0,
              modules: [Jp, Zp],
              className: "mySwiper",
              children:
                r == null
                  ? void 0
                  : r.map((R, V) =>
                      p.jsxs(Au, {
                        children: [
                          p.jsx("img", { src: R, alt: V.toString() }),
                          p.jsx("div", { className: "layer" }),
                        ],
                      })
                    ),
            }),
            p.jsx("div", { className: `like-a ${v ? "a" : ""}` }),
          ],
        }),
        p.jsxs("div", {
          className: "bottom",
          children: [
            p.jsxs("div", {
              className: "icons",
              children: [
                p.jsxs("div", {
                  className: "l",
                  children: [
                    p.jsx("button", {
                      className: `like ${i ? "active" : ""}`,
                      onClick: m,
                      children: p.jsx(vy, { isactive: i }),
                    }),
                    p.jsx("button", {
                      onClick: T,
                      className: "comment",
                      children: p.jsx(yy, {}),
                    }),
                    g && p.jsx(zu, { type: "post", quit: b, postid: o }),
                    p.jsx("button", { children: p.jsx(xy, {}) }),
                  ],
                }),
                p.jsx("button", {
                  onClick: E,
                  className: `save ${u ? "active" : ""}`,
                  children: p.jsx(wy, { isactive: u }),
                }),
              ],
            }),
            p.jsx("div", {
              className: "detail",
              children: p.jsxs("p", {
                onClick: C,
                className: "likecount",
                children: [d.toLocaleString(), " likes"],
              }),
            }),
            p.jsxs("pre", {
              ref: I,
              className: `${O ? "" : N ? "o" : ""}`,
              children: [
                p.jsx(ft, { className: "username", to: `/${a}`, children: a }),
                s && p.jsx(Fu, { text: s }),
              ],
            }),
            N &&
              !O &&
              p.jsx("button", {
                className: "more",
                onClick: () => D(!0),
                children: "more",
              }),
            f > 0 &&
              p.jsxs("p", {
                className: "viewc",
                onClick: T,
                children: ["View all ", f, " comments"],
              }),
          ],
        }),
        t && p.jsx(Aw, { close: () => n(!1), post: e }),
      ],
    });
  },
  Uj = ce.li`
  width: 100%;
  max-width: 500px;
  margin: 1rem 0px;
  height: calc(100% + 24px);
  position: relative;
  border-top: 1px solid #262626;
  @media (max-width: 669px) {
    width: calc(100% - 2rem) !important;
  }
  .info-s {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    height: 58px;
    padding: 0px 6px;
    border-bottom: 1px solid #262626;
    .left {
      display: flex;
      align-items: center;
      .pp {
        width: 2rem;
        height: 2rem;
        margin-right: 10px;
        img {
          width: 2rem;
          height: 2rem;
          border-radius: 100%;
        }
      }
      .username {
        font-size: 14px;
        font-weight: 600;
        margin-right: 6px;
        &:hover {
          opacity: 0.7;
        }
      }
      .date {
        color: #a8a8a8;
        font-size: 14px;
        line-height: 18px;
      }
    }
    .right {
      button {
        &:hover {
          opacity: 0.7;
        }
        svg {
          fill: #fafafa;
        }
      }
    }
  }
  .images,
  .swiper-slide,
  .swiper,
  .swiper-wrapper {
    height: 100%;
    position: relative;
    width: 100%;
    max-height: 500px;
    img {
      width: 100%;
      height: 100%;
      max-height: 500px;
      object-fit: cover;
    }
    .layer {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0px;
      top: 0px;
    }
  }
  .like-a {
    position: absolute;
    left: calc(50% - 64px);
    z-index: 10;
    top: calc(50% - 64px);
    background-image: url("/bg.png");
    background-repeat: no-repeat;
    background-position: 0 0;
    height: 128px;
    width: 128px;
    opacity: 0;
    &.a {
      @keyframes scsx {
        0% {
          opacity: 0;
          transform: scale(0);
        }
        15% {
          opacity: 0.9;
          transform: scale(1.2);
        }
        30% {
          transform: scale(0.95);
        }
        45%,
        80% {
          opacity: 0.9;
          transform: scale(1);
        }
        100% {
          opacity: 0;
          transform: scale(0);
        }
      }
      animation: 1s scsx ease-in-out;
    }
  }
  .icons {
    display: flex;
    padding: 6px 1rem 6px 0px;
    button {
      &:first-child {
        padding-left: 0px;
      }
      &:hover {
        &.active {
          opacity: 1 !important;
        }
        opacity: 0.7;
      }
      background-color: transparent;
      padding: 6px;
      position: relative;

      &.like {
        svg {
          transform: scale(1);
        }
        &.active {
          svg {
            @keyframes likep {
              0% {
                transform: scale(1);
              }
              25% {
                transform: scale(1.2);
              }
              50% {
                transform: scale(0.95);
              }
              100% {
                transform: scale(1);
              }
            }
            animation: likep 0.45s ease-in-out;
          }
        }
      }
      &.save {
        padding-right: 0px;
      }
    }
    .l {
      display: flex;
      width: 100%;
    }
  }
  .detail {
    padding: 0px 1rem 0px 0px;
    margin-bottom: 4px;
    p {
      font-size: 14px;
      line-height: 18px;
      font-weight: 500;
      cursor: pointer;
      &.date {
        user-select: none;
        cursor: default;
        font-size: 12px;
        line-height: 14px;
        color: #a8a8a8;
        font-weight: 400;
      }
      &.likecount {
        font-weight: 600;
      }
    }
  }
  pre {
    max-height: 1000px;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    word-wrap: break-word;
    font-size: 14px;
    line-height: 18px;
    text-overflow: ellipsis;
    word-wrap: break-word;
    white-space: pre-wrap;
    overflow-wrap: break-word;
    display: block;
    &.o {
      height: 36px;
      max-height: 36px;
      text-overflow: ellipsis;
      overflow: hidden;
      word-wrap: normal;
      white-space: normal;
      overflow-wrap: normal;
    }
    .username {
      margin-right: 4px;
    }
    a {
      display: inline;
    }
  }
  .more {
    line-height: 18px;
    font-size: 14px;
    font-weight: 600;
    color: #a8a8a8;
  }
  .viewc {
    display: block;
    margin-top: 8px;
    font-size: 14px;
    line-height: 18px;
    color: #a8a8a8;
    cursor: pointer;
  }
`;
function Hj(e) {
  return e && typeof e == "object" && "default" in e ? e.default : e;
}
var Dw = S,
  Gj = Hj(Dw);
function Iv(e, t, n) {
  return (
    t in e
      ? Object.defineProperty(e, t, {
          value: n,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[t] = n),
    e
  );
}
function Wj(e, t) {
  (e.prototype = Object.create(t.prototype)),
    (e.prototype.constructor = e),
    (e.__proto__ = t);
}
var Vj = !!(
  typeof window < "u" &&
  window.document &&
  window.document.createElement
);
function qj(e, t, n) {
  if (typeof e != "function")
    throw new Error("Expected reducePropsToState to be a function.");
  if (typeof t != "function")
    throw new Error("Expected handleStateChangeOnClient to be a function.");
  if (typeof n < "u" && typeof n != "function")
    throw new Error(
      "Expected mapStateOnServer to either be undefined or a function."
    );
  function r(i) {
    return i.displayName || i.name || "Component";
  }
  return function (o) {
    if (typeof o != "function")
      throw new Error("Expected WrappedComponent to be a React component.");
    var a = [],
      l;
    function s() {
      (l = e(
        a.map(function (d) {
          return d.props;
        })
      )),
        u.canUseDOM ? t(l) : n && (l = n(l));
    }
    var u = (function (d) {
      Wj(c, d);
      function c() {
        return d.apply(this, arguments) || this;
      }
      (c.peek = function () {
        return l;
      }),
        (c.rewind = function () {
          if (c.canUseDOM)
            throw new Error(
              "You may only call rewind() on the server. Call peek() to read the current state."
            );
          var v = l;
          return (l = void 0), (a = []), v;
        });
      var f = c.prototype;
      return (
        (f.UNSAFE_componentWillMount = function () {
          a.push(this), s();
        }),
        (f.componentDidUpdate = function () {
          s();
        }),
        (f.componentWillUnmount = function () {
          var v = a.indexOf(this);
          a.splice(v, 1), s();
        }),
        (f.render = function () {
          return Gj.createElement(o, this.props);
        }),
        c
      );
    })(Dw.PureComponent);
    return (
      Iv(u, "displayName", "SideEffect(" + r(o) + ")"),
      Iv(u, "canUseDOM", Vj),
      u
    );
  };
}
var Yj = qj;
const Xj = ii(Yj);
var Kj = typeof Element < "u",
  Qj = typeof Map == "function",
  Zj = typeof Set == "function",
  Jj = typeof ArrayBuffer == "function" && !!ArrayBuffer.isView;
function Yl(e, t) {
  if (e === t) return !0;
  if (e && t && typeof e == "object" && typeof t == "object") {
    if (e.constructor !== t.constructor) return !1;
    var n, r, i;
    if (Array.isArray(e)) {
      if (((n = e.length), n != t.length)) return !1;
      for (r = n; r-- !== 0; ) if (!Yl(e[r], t[r])) return !1;
      return !0;
    }
    var o;
    if (Qj && e instanceof Map && t instanceof Map) {
      if (e.size !== t.size) return !1;
      for (o = e.entries(); !(r = o.next()).done; )
        if (!t.has(r.value[0])) return !1;
      for (o = e.entries(); !(r = o.next()).done; )
        if (!Yl(r.value[1], t.get(r.value[0]))) return !1;
      return !0;
    }
    if (Zj && e instanceof Set && t instanceof Set) {
      if (e.size !== t.size) return !1;
      for (o = e.entries(); !(r = o.next()).done; )
        if (!t.has(r.value[0])) return !1;
      return !0;
    }
    if (Jj && ArrayBuffer.isView(e) && ArrayBuffer.isView(t)) {
      if (((n = e.length), n != t.length)) return !1;
      for (r = n; r-- !== 0; ) if (e[r] !== t[r]) return !1;
      return !0;
    }
    if (e.constructor === RegExp)
      return e.source === t.source && e.flags === t.flags;
    if (
      e.valueOf !== Object.prototype.valueOf &&
      typeof e.valueOf == "function" &&
      typeof t.valueOf == "function"
    )
      return e.valueOf() === t.valueOf();
    if (
      e.toString !== Object.prototype.toString &&
      typeof e.toString == "function" &&
      typeof t.toString == "function"
    )
      return e.toString() === t.toString();
    if (((i = Object.keys(e)), (n = i.length), n !== Object.keys(t).length))
      return !1;
    for (r = n; r-- !== 0; )
      if (!Object.prototype.hasOwnProperty.call(t, i[r])) return !1;
    if (Kj && e instanceof Element) return !1;
    for (r = n; r-- !== 0; )
      if (
        !(
          (i[r] === "_owner" || i[r] === "__v" || i[r] === "__o") &&
          e.$$typeof
        ) &&
        !Yl(e[i[r]], t[i[r]])
      )
        return !1;
    return !0;
  }
  return e !== e && t !== t;
}
var e3 = function (t, n) {
  try {
    return Yl(t, n);
  } catch (r) {
    if ((r.message || "").match(/stack|recursion/i))
      return console.warn("react-fast-compare cannot handle circular refs"), !1;
    throw r;
  }
};
const t3 = ii(e3);
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/ var Av = Object.getOwnPropertySymbols,
  n3 = Object.prototype.hasOwnProperty,
  r3 = Object.prototype.propertyIsEnumerable;
function i3(e) {
  if (e == null)
    throw new TypeError(
      "Object.assign cannot be called with null or undefined"
    );
  return Object(e);
}
function o3() {
  try {
    if (!Object.assign) return !1;
    var e = new String("abc");
    if (((e[5] = "de"), Object.getOwnPropertyNames(e)[0] === "5")) return !1;
    for (var t = {}, n = 0; n < 10; n++) t["_" + String.fromCharCode(n)] = n;
    var r = Object.getOwnPropertyNames(t).map(function (o) {
      return t[o];
    });
    if (r.join("") !== "0123456789") return !1;
    var i = {};
    return (
      "abcdefghijklmnopqrst".split("").forEach(function (o) {
        i[o] = o;
      }),
      Object.keys(Object.assign({}, i)).join("") === "abcdefghijklmnopqrst"
    );
  } catch {
    return !1;
  }
}
var a3 = o3()
  ? Object.assign
  : function (e, t) {
      for (var n, r = i3(e), i, o = 1; o < arguments.length; o++) {
        n = Object(arguments[o]);
        for (var a in n) n3.call(n, a) && (r[a] = n[a]);
        if (Av) {
          i = Av(n);
          for (var l = 0; l < i.length; l++)
            r3.call(n, i[l]) && (r[i[l]] = n[i[l]]);
        }
      }
      return r;
    };
const l3 = ii(a3);
var Vr = {
    BODY: "bodyAttributes",
    HTML: "htmlAttributes",
    TITLE: "titleAttributes",
  },
  ae = {
    BASE: "base",
    BODY: "body",
    HEAD: "head",
    HTML: "html",
    LINK: "link",
    META: "meta",
    NOSCRIPT: "noscript",
    SCRIPT: "script",
    STYLE: "style",
    TITLE: "title",
  };
Object.keys(ae).map(function (e) {
  return ae[e];
});
var Ne = {
    CHARSET: "charset",
    CSS_TEXT: "cssText",
    HREF: "href",
    HTTPEQUIV: "http-equiv",
    INNER_HTML: "innerHTML",
    ITEM_PROP: "itemprop",
    NAME: "name",
    PROPERTY: "property",
    REL: "rel",
    SRC: "src",
    TARGET: "target",
  },
  zs = {
    accesskey: "accessKey",
    charset: "charSet",
    class: "className",
    contenteditable: "contentEditable",
    contextmenu: "contextMenu",
    "http-equiv": "httpEquiv",
    itemprop: "itemProp",
    tabindex: "tabIndex",
  },
  Ia = {
    DEFAULT_TITLE: "defaultTitle",
    DEFER: "defer",
    ENCODE_SPECIAL_CHARACTERS: "encodeSpecialCharacters",
    ON_CHANGE_CLIENT_STATE: "onChangeClientState",
    TITLE_TEMPLATE: "titleTemplate",
  },
  s3 = Object.keys(zs).reduce(function (e, t) {
    return (e[zs[t]] = t), e;
  }, {}),
  u3 = [ae.NOSCRIPT, ae.SCRIPT, ae.STYLE],
  pn = "data-react-helmet",
  c3 =
    typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
      ? function (e) {
          return typeof e;
        }
      : function (e) {
          return e &&
            typeof Symbol == "function" &&
            e.constructor === Symbol &&
            e !== Symbol.prototype
            ? "symbol"
            : typeof e;
        },
  d3 = function (e, t) {
    if (!(e instanceof t))
      throw new TypeError("Cannot call a class as a function");
  },
  f3 = (function () {
    function e(t, n) {
      for (var r = 0; r < n.length; r++) {
        var i = n[r];
        (i.enumerable = i.enumerable || !1),
          (i.configurable = !0),
          "value" in i && (i.writable = !0),
          Object.defineProperty(t, i.key, i);
      }
    }
    return function (t, n, r) {
      return n && e(t.prototype, n), r && e(t, r), t;
    };
  })(),
  wt =
    Object.assign ||
    function (e) {
      for (var t = 1; t < arguments.length; t++) {
        var n = arguments[t];
        for (var r in n)
          Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
      }
      return e;
    },
  p3 = function (e, t) {
    if (typeof t != "function" && t !== null)
      throw new TypeError(
        "Super expression must either be null or a function, not " + typeof t
      );
    (e.prototype = Object.create(t && t.prototype, {
      constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 },
    })),
      t &&
        (Object.setPrototypeOf
          ? Object.setPrototypeOf(e, t)
          : (e.__proto__ = t));
  },
  Dv = function (e, t) {
    var n = {};
    for (var r in e)
      t.indexOf(r) >= 0 ||
        (Object.prototype.hasOwnProperty.call(e, r) && (n[r] = e[r]));
    return n;
  },
  m3 = function (e, t) {
    if (!e)
      throw new ReferenceError(
        "this hasn't been initialised - super() hasn't been called"
      );
    return t && (typeof t == "object" || typeof t == "function") ? t : e;
  },
  Af = function (t) {
    var n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0;
    return n === !1
      ? String(t)
      : String(t)
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")
          .replace(/"/g, "&quot;")
          .replace(/'/g, "&#x27;");
  },
  h3 = function (t) {
    var n = Bi(t, ae.TITLE),
      r = Bi(t, Ia.TITLE_TEMPLATE);
    if (r && n)
      return r.replace(/%s/g, function () {
        return Array.isArray(n) ? n.join("") : n;
      });
    var i = Bi(t, Ia.DEFAULT_TITLE);
    return n || i || void 0;
  },
  g3 = function (t) {
    return Bi(t, Ia.ON_CHANGE_CLIENT_STATE) || function () {};
  },
  id = function (t, n) {
    return n
      .filter(function (r) {
        return typeof r[t] < "u";
      })
      .map(function (r) {
        return r[t];
      })
      .reduce(function (r, i) {
        return wt({}, r, i);
      }, {});
  },
  v3 = function (t, n) {
    return n
      .filter(function (r) {
        return typeof r[ae.BASE] < "u";
      })
      .map(function (r) {
        return r[ae.BASE];
      })
      .reverse()
      .reduce(function (r, i) {
        if (!r.length)
          for (var o = Object.keys(i), a = 0; a < o.length; a++) {
            var l = o[a],
              s = l.toLowerCase();
            if (t.indexOf(s) !== -1 && i[s]) return r.concat(i);
          }
        return r;
      }, []);
  },
  To = function (t, n, r) {
    var i = {};
    return r
      .filter(function (o) {
        return Array.isArray(o[t])
          ? !0
          : (typeof o[t] < "u" &&
              b3(
                "Helmet: " +
                  t +
                  ' should be of type "Array". Instead found type "' +
                  c3(o[t]) +
                  '"'
              ),
            !1);
      })
      .map(function (o) {
        return o[t];
      })
      .reverse()
      .reduce(function (o, a) {
        var l = {};
        a.filter(function (f) {
          for (var h = void 0, v = Object.keys(f), y = 0; y < v.length; y++) {
            var w = v[y],
              m = w.toLowerCase();
            n.indexOf(m) !== -1 &&
              !(h === Ne.REL && f[h].toLowerCase() === "canonical") &&
              !(m === Ne.REL && f[m].toLowerCase() === "stylesheet") &&
              (h = m),
              n.indexOf(w) !== -1 &&
                (w === Ne.INNER_HTML ||
                  w === Ne.CSS_TEXT ||
                  w === Ne.ITEM_PROP) &&
                (h = w);
          }
          if (!h || !f[h]) return !1;
          var g = f[h].toLowerCase();
          return (
            i[h] || (i[h] = {}),
            l[h] || (l[h] = {}),
            i[h][g] ? !1 : ((l[h][g] = !0), !0)
          );
        })
          .reverse()
          .forEach(function (f) {
            return o.push(f);
          });
        for (var s = Object.keys(l), u = 0; u < s.length; u++) {
          var d = s[u],
            c = l3({}, i[d], l[d]);
          i[d] = c;
        }
        return o;
      }, [])
      .reverse();
  },
  Bi = function (t, n) {
    for (var r = t.length - 1; r >= 0; r--) {
      var i = t[r];
      if (i.hasOwnProperty(n)) return i[n];
    }
    return null;
  },
  y3 = function (t) {
    return {
      baseTag: v3([Ne.HREF, Ne.TARGET], t),
      bodyAttributes: id(Vr.BODY, t),
      defer: Bi(t, Ia.DEFER),
      encode: Bi(t, Ia.ENCODE_SPECIAL_CHARACTERS),
      htmlAttributes: id(Vr.HTML, t),
      linkTags: To(ae.LINK, [Ne.REL, Ne.HREF], t),
      metaTags: To(
        ae.META,
        [Ne.NAME, Ne.CHARSET, Ne.HTTPEQUIV, Ne.PROPERTY, Ne.ITEM_PROP],
        t
      ),
      noscriptTags: To(ae.NOSCRIPT, [Ne.INNER_HTML], t),
      onChangeClientState: g3(t),
      scriptTags: To(ae.SCRIPT, [Ne.SRC, Ne.INNER_HTML], t),
      styleTags: To(ae.STYLE, [Ne.CSS_TEXT], t),
      title: h3(t),
      titleAttributes: id(Vr.TITLE, t),
    };
  },
  Df = (function () {
    var e = Date.now();
    return function (t) {
      var n = Date.now();
      n - e > 16
        ? ((e = n), t(n))
        : setTimeout(function () {
            Df(t);
          }, 0);
    };
  })(),
  Ov = function (t) {
    return clearTimeout(t);
  },
  x3 =
    typeof window < "u"
      ? (window.requestAnimationFrame &&
          window.requestAnimationFrame.bind(window)) ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        Df
      : global.requestAnimationFrame || Df,
  w3 =
    typeof window < "u"
      ? window.cancelAnimationFrame ||
        window.webkitCancelAnimationFrame ||
        window.mozCancelAnimationFrame ||
        Ov
      : global.cancelAnimationFrame || Ov,
  b3 = function (t) {
    return console && typeof console.warn == "function" && console.warn(t);
  },
  ko = null,
  S3 = function (t) {
    ko && w3(ko),
      t.defer
        ? (ko = x3(function () {
            jv(t, function () {
              ko = null;
            });
          }))
        : (jv(t), (ko = null));
  },
  jv = function (t, n) {
    var r = t.baseTag,
      i = t.bodyAttributes,
      o = t.htmlAttributes,
      a = t.linkTags,
      l = t.metaTags,
      s = t.noscriptTags,
      u = t.onChangeClientState,
      d = t.scriptTags,
      c = t.styleTags,
      f = t.title,
      h = t.titleAttributes;
    Of(ae.BODY, i), Of(ae.HTML, o), C3(f, h);
    var v = {
        baseTag: vi(ae.BASE, r),
        linkTags: vi(ae.LINK, a),
        metaTags: vi(ae.META, l),
        noscriptTags: vi(ae.NOSCRIPT, s),
        scriptTags: vi(ae.SCRIPT, d),
        styleTags: vi(ae.STYLE, c),
      },
      y = {},
      w = {};
    Object.keys(v).forEach(function (m) {
      var g = v[m],
        x = g.newTags,
        b = g.oldTags;
      x.length && (y[m] = x), b.length && (w[m] = v[m].oldTags);
    }),
      n && n(),
      u(t, y, w);
  },
  Ow = function (t) {
    return Array.isArray(t) ? t.join("") : t;
  },
  C3 = function (t, n) {
    typeof t < "u" && document.title !== t && (document.title = Ow(t)),
      Of(ae.TITLE, n);
  },
  Of = function (t, n) {
    var r = document.getElementsByTagName(t)[0];
    if (r) {
      for (
        var i = r.getAttribute(pn),
          o = i ? i.split(",") : [],
          a = [].concat(o),
          l = Object.keys(n),
          s = 0;
        s < l.length;
        s++
      ) {
        var u = l[s],
          d = n[u] || "";
        r.getAttribute(u) !== d && r.setAttribute(u, d),
          o.indexOf(u) === -1 && o.push(u);
        var c = a.indexOf(u);
        c !== -1 && a.splice(c, 1);
      }
      for (var f = a.length - 1; f >= 0; f--) r.removeAttribute(a[f]);
      o.length === a.length
        ? r.removeAttribute(pn)
        : r.getAttribute(pn) !== l.join(",") && r.setAttribute(pn, l.join(","));
    }
  },
  vi = function (t, n) {
    var r = document.head || document.querySelector(ae.HEAD),
      i = r.querySelectorAll(t + "[" + pn + "]"),
      o = Array.prototype.slice.call(i),
      a = [],
      l = void 0;
    return (
      n &&
        n.length &&
        n.forEach(function (s) {
          var u = document.createElement(t);
          for (var d in s)
            if (s.hasOwnProperty(d))
              if (d === Ne.INNER_HTML) u.innerHTML = s.innerHTML;
              else if (d === Ne.CSS_TEXT)
                u.styleSheet
                  ? (u.styleSheet.cssText = s.cssText)
                  : u.appendChild(document.createTextNode(s.cssText));
              else {
                var c = typeof s[d] > "u" ? "" : s[d];
                u.setAttribute(d, c);
              }
          u.setAttribute(pn, "true"),
            o.some(function (f, h) {
              return (l = h), u.isEqualNode(f);
            })
              ? o.splice(l, 1)
              : a.push(u);
        }),
      o.forEach(function (s) {
        return s.parentNode.removeChild(s);
      }),
      a.forEach(function (s) {
        return r.appendChild(s);
      }),
      { oldTags: o, newTags: a }
    );
  },
  jw = function (t) {
    return Object.keys(t).reduce(function (n, r) {
      var i = typeof t[r] < "u" ? r + '="' + t[r] + '"' : "" + r;
      return n ? n + " " + i : i;
    }, "");
  },
  E3 = function (t, n, r, i) {
    var o = jw(r),
      a = Ow(n);
    return o
      ? "<" + t + " " + pn + '="true" ' + o + ">" + Af(a, i) + "</" + t + ">"
      : "<" + t + " " + pn + '="true">' + Af(a, i) + "</" + t + ">";
  },
  T3 = function (t, n, r) {
    return n.reduce(function (i, o) {
      var a = Object.keys(o)
          .filter(function (u) {
            return !(u === Ne.INNER_HTML || u === Ne.CSS_TEXT);
          })
          .reduce(function (u, d) {
            var c = typeof o[d] > "u" ? d : d + '="' + Af(o[d], r) + '"';
            return u ? u + " " + c : c;
          }, ""),
        l = o.innerHTML || o.cssText || "",
        s = u3.indexOf(t) === -1;
      return (
        i +
        "<" +
        t +
        " " +
        pn +
        '="true" ' +
        a +
        (s ? "/>" : ">" + l + "</" + t + ">")
      );
    }, "");
  },
  Nw = function (t) {
    var n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    return Object.keys(t).reduce(function (r, i) {
      return (r[zs[i] || i] = t[i]), r;
    }, n);
  },
  k3 = function (t) {
    var n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    return Object.keys(t).reduce(function (r, i) {
      return (r[s3[i] || i] = t[i]), r;
    }, n);
  },
  P3 = function (t, n, r) {
    var i,
      o = ((i = { key: n }), (i[pn] = !0), i),
      a = Nw(r, o);
    return [H.createElement(ae.TITLE, a, n)];
  },
  I3 = function (t, n) {
    return n.map(function (r, i) {
      var o,
        a = ((o = { key: i }), (o[pn] = !0), o);
      return (
        Object.keys(r).forEach(function (l) {
          var s = zs[l] || l;
          if (s === Ne.INNER_HTML || s === Ne.CSS_TEXT) {
            var u = r.innerHTML || r.cssText;
            a.dangerouslySetInnerHTML = { __html: u };
          } else a[s] = r[l];
        }),
        H.createElement(t, a)
      );
    });
  },
  Nn = function (t, n, r) {
    switch (t) {
      case ae.TITLE:
        return {
          toComponent: function () {
            return P3(t, n.title, n.titleAttributes);
          },
          toString: function () {
            return E3(t, n.title, n.titleAttributes, r);
          },
        };
      case Vr.BODY:
      case Vr.HTML:
        return {
          toComponent: function () {
            return Nw(n);
          },
          toString: function () {
            return jw(n);
          },
        };
      default:
        return {
          toComponent: function () {
            return I3(t, n);
          },
          toString: function () {
            return T3(t, n, r);
          },
        };
    }
  },
  Rw = function (t) {
    var n = t.baseTag,
      r = t.bodyAttributes,
      i = t.encode,
      o = t.htmlAttributes,
      a = t.linkTags,
      l = t.metaTags,
      s = t.noscriptTags,
      u = t.scriptTags,
      d = t.styleTags,
      c = t.title,
      f = c === void 0 ? "" : c,
      h = t.titleAttributes;
    return {
      base: Nn(ae.BASE, n, i),
      bodyAttributes: Nn(Vr.BODY, r, i),
      htmlAttributes: Nn(Vr.HTML, o, i),
      link: Nn(ae.LINK, a, i),
      meta: Nn(ae.META, l, i),
      noscript: Nn(ae.NOSCRIPT, s, i),
      script: Nn(ae.SCRIPT, u, i),
      style: Nn(ae.STYLE, d, i),
      title: Nn(ae.TITLE, { title: f, titleAttributes: h }, i),
    };
  },
  A3 = function (t) {
    var n, r;
    return (
      (r = n =
        (function (i) {
          p3(o, i);
          function o() {
            return d3(this, o), m3(this, i.apply(this, arguments));
          }
          return (
            (o.prototype.shouldComponentUpdate = function (l) {
              return !t3(this.props, l);
            }),
            (o.prototype.mapNestedChildrenToProps = function (l, s) {
              if (!s) return null;
              switch (l.type) {
                case ae.SCRIPT:
                case ae.NOSCRIPT:
                  return { innerHTML: s };
                case ae.STYLE:
                  return { cssText: s };
              }
              throw new Error(
                "<" +
                  l.type +
                  " /> elements are self-closing and can not contain children. Refer to our API for more information."
              );
            }),
            (o.prototype.flattenArrayTypeChildren = function (l) {
              var s,
                u = l.child,
                d = l.arrayTypeChildren,
                c = l.newChildProps,
                f = l.nestedChildren;
              return wt(
                {},
                d,
                ((s = {}),
                (s[u.type] = [].concat(d[u.type] || [], [
                  wt({}, c, this.mapNestedChildrenToProps(u, f)),
                ])),
                s)
              );
            }),
            (o.prototype.mapObjectTypeChildren = function (l) {
              var s,
                u,
                d = l.child,
                c = l.newProps,
                f = l.newChildProps,
                h = l.nestedChildren;
              switch (d.type) {
                case ae.TITLE:
                  return wt(
                    {},
                    c,
                    ((s = {}),
                    (s[d.type] = h),
                    (s.titleAttributes = wt({}, f)),
                    s)
                  );
                case ae.BODY:
                  return wt({}, c, { bodyAttributes: wt({}, f) });
                case ae.HTML:
                  return wt({}, c, { htmlAttributes: wt({}, f) });
              }
              return wt({}, c, ((u = {}), (u[d.type] = wt({}, f)), u));
            }),
            (o.prototype.mapArrayTypeChildrenToProps = function (l, s) {
              var u = wt({}, s);
              return (
                Object.keys(l).forEach(function (d) {
                  var c;
                  u = wt({}, u, ((c = {}), (c[d] = l[d]), c));
                }),
                u
              );
            }),
            (o.prototype.warnOnInvalidChildren = function (l, s) {
              return !0;
            }),
            (o.prototype.mapChildrenToProps = function (l, s) {
              var u = this,
                d = {};
              return (
                H.Children.forEach(l, function (c) {
                  if (!(!c || !c.props)) {
                    var f = c.props,
                      h = f.children,
                      v = Dv(f, ["children"]),
                      y = k3(v);
                    switch ((u.warnOnInvalidChildren(c, h), c.type)) {
                      case ae.LINK:
                      case ae.META:
                      case ae.NOSCRIPT:
                      case ae.SCRIPT:
                      case ae.STYLE:
                        d = u.flattenArrayTypeChildren({
                          child: c,
                          arrayTypeChildren: d,
                          newChildProps: y,
                          nestedChildren: h,
                        });
                        break;
                      default:
                        s = u.mapObjectTypeChildren({
                          child: c,
                          newProps: s,
                          newChildProps: y,
                          nestedChildren: h,
                        });
                        break;
                    }
                  }
                }),
                (s = this.mapArrayTypeChildrenToProps(d, s)),
                s
              );
            }),
            (o.prototype.render = function () {
              var l = this.props,
                s = l.children,
                u = Dv(l, ["children"]),
                d = wt({}, u);
              return (
                s && (d = this.mapChildrenToProps(s, d)), H.createElement(t, d)
              );
            }),
            f3(o, null, [
              {
                key: "canUseDOM",
                set: function (l) {
                  t.canUseDOM = l;
                },
              },
            ]),
            o
          );
        })(H.Component)),
      (n.propTypes = {
        base: je.object,
        bodyAttributes: je.object,
        children: je.oneOfType([je.arrayOf(je.node), je.node]),
        defaultTitle: je.string,
        defer: je.bool,
        encodeSpecialCharacters: je.bool,
        htmlAttributes: je.object,
        link: je.arrayOf(je.object),
        meta: je.arrayOf(je.object),
        noscript: je.arrayOf(je.object),
        onChangeClientState: je.func,
        script: je.arrayOf(je.object),
        style: je.arrayOf(je.object),
        title: je.string,
        titleAttributes: je.object,
        titleTemplate: je.string,
      }),
      (n.defaultProps = { defer: !0, encodeSpecialCharacters: !0 }),
      (n.peek = t.peek),
      (n.rewind = function () {
        var i = t.rewind();
        return (
          i ||
            (i = Rw({
              baseTag: [],
              bodyAttributes: {},
              encodeSpecialCharacters: !0,
              htmlAttributes: {},
              linkTags: [],
              metaTags: [],
              noscriptTags: [],
              scriptTags: [],
              styleTags: [],
              title: "",
              titleAttributes: {},
            })),
          i
        );
      }),
      r
    );
  },
  D3 = function () {
    return null;
  },
  O3 = Xj(y3, S3, Rw)(D3),
  jf = A3(O3);
jf.renderStatic = jf.rewind;
const Xa = ({ title: e }) => (
    (e = "| " + e),
    p.jsx(jf, {
      children: p.jsxs("title", { children: ["Social Media App ", e] }),
    })
  ),
  j3 = () => {
    const e = Ge(),
      t = ge(WO),
      {
        hasmore: { home: n },
        loading: { home: r },
        offset: { home: i },
      } = ge(km, ve);
    S.useEffect(() => {
      t.length == 0 && e(ni({}));
    }, []);
    const o = (l) => {
        if (r || !n) return;
        const { created: s, id: u } = t[t.length - 1],
          { scrollTop: d, scrollHeight: c, clientHeight: f } = l.target;
        d + f + 100 >= c && e(ni({ date: s, id: u }));
      },
      a = S.useRef(null);
    return (
      S.useLayoutEffect(
        () => (
          a.current.scroll({ top: i }),
          () => {
            const l = a.current.scrollTop;
            e(Em({ page: "home", offset: l }));
          }
        ),
        []
      ),
      p.jsxs(N3, {
        ref: a,
        onScroll: o,
        children: [
          p.jsx(Xa, { title: "Posts" }),
          t.map((l) => p.jsx(Fj, { post: l })),
          r && p.jsx(yn, {}),
        ],
      })
    );
  },
  N3 = ce.ul`
  height: 100vh;
  overflow-x: hidden;
  width: 100%;
  overflow-y: auto;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 1rem;
  li {
    max-width: 500px;
    width: 100%;
    min-width: 0px;
    &:first-child {
      border-top: none;
    }
  }
  .loading-box {
    margin: 2rem;
  }
`,
  Lw = ({ post: e, back: t }) => {
    const n = Ge(),
      { cover: r, id: i, likecount: o, commentcount: a, more: l } = e,
      s = () => {
        window.history.replaceState(null, "", `/p/${i}`), n(Pa(i)), n(ka(t));
      };
    return p.jsx(R3, {
      onClick: s,
      children: p.jsxs(ft, {
        to: `/p/${i}`,
        onClick: (u) => u.preventDefault(),
        children: [
          p.jsx("img", { src: r, alt: `cover ${i}` }),
          p.jsxs("div", {
            className: "text",
            children: [
              o > 0 &&
                p.jsxs("div", {
                  className: "like",
                  children: [
                    p.jsx("div", { className: "icon" }),
                    p.jsx("p", { children: o.toLocaleString() }),
                  ],
                }),
              a > 0 &&
                p.jsxs("div", {
                  className: "comment",
                  children: [
                    p.jsx("div", { className: "icon" }),
                    p.jsx("p", { children: a.toLocaleString() }),
                  ],
                }),
            ],
          }),
          l && p.jsx(gy, {}),
          p.jsx("div", { className: "layer" }),
        ],
      }),
    });
  },
  R3 = ce.li`
  height: 100px;
  max-width: 300px;
  max-height: 300px;
  width: 100%;
  object-fit: cover;
  height: 100%;
  aspect-ratio: 1;
  cursor: pointer;
  position: relative;
  margin: -3px 0px;
  .moreimagesicon {
    position: absolute;
    right: 20px;
    top: 20px;
    z-index: 10;
    width: 1rem;
    height: 1rem;
  }
  .layer {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0px;
    top: 0px;
  }
  &:hover {
    .layer {
      background-color: rgba(0, 0, 0, 0.3);
    }
    .text {
      opacity: 1;
    }
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .text {
    z-index: 10;
    opacity: 0;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    position: absolute;
    display: flex;
    justify-content: center;
    div {
      display: flex;
      align-items: center;
      p {
        font-weight: 600;
      }
    }
    .like {
      margin-right: 2rem;
      .icon {
        background-repeat: no-repeat;
        background-position: -340px -333px;
        height: 19px;
        width: 19px;
        background-image: url("/bg.png");
        margin-right: 6px;
      }
    }
    .comment {
      .icon {
        background-image: url("/bg.png");
        background-repeat: no-repeat;
        background-position: -382px -333px;
        height: 19px;
        margin-right: 6px;
        width: 19px;
      }
    }
  }
`,
  L3 = () => {
    const e = Ge(),
      t = ge(qO, ve),
      {
        hasmore: { explore: n },
        loading: { explore: r },
        offset: { explore: i },
      } = ge(km, ve);
    S.useEffect(() => {
      t.length == 0 && e(ni({ explore: !0 }));
    }, []);
    const o = (l) => {
        if (r || !n) return;
        const { scrollTop: s, scrollHeight: u, clientHeight: d } = l.target;
        if (s + d + 100 >= u) {
          const { created: c, id: f } = t[t.length - 1];
          e(ni({ explore: !0, date: c, id: f }));
        }
      },
      a = S.useRef(null);
    return (
      S.useLayoutEffect(
        () => (
          a.current.scroll({ top: i }),
          () => {
            const l = a.current.scrollTop;
            e(Em({ page: "explore", offset: l }));
          }
        ),
        []
      ),
      p.jsxs(M3, {
        ref: a,
        onScroll: o,
        children: [
          p.jsx(Xa, { title: "Explore" }),
          p.jsx("div", {
            className: "content",
            children: t.map((l) =>
              p.jsx(Lw, { post: l, back: "explore" }, l.id)
            ),
          }),
          r && p.jsx(yn, {}),
        ],
      })
    );
  },
  M3 = ce.ul`
  width: 100%;
  max-height: 100vh;
  overflow-y: auto;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  .content {
    max-width: calc(906px + 2rem);
    width: 100%;
    padding: 1rem;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 3px;
  }
  .loading-box {
    margin: 2rem 0px;
  }
`,
  Mw = () => {
    const e = "^(?=.{6,36}$)(?![_.])(?!.*[_.]{2})[a-z0-9._]+(?<![_.])$",
      t = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$",
      [n, r] = S.useState(!0),
      [i, o] = S.useState(""),
      [a, l] = S.useState(""),
      [s, u] = S.useState(""),
      [d, c] = S.useState(""),
      [f, h] = S.useState(!1),
      v = () => {
        h(!1);
        const m = new RegExp(e).test(i),
          g = new RegExp(t).test(s);
        m &&
          ((!n && !g) ||
            d.length < 6 ||
            i.length < 6 ||
            (!n && a.length > 50) ||
            h(!0));
      };
    S.useEffect(() => {
      v();
    }, [i, s, a, d, n]);
    const y = async (m) => {
        m.preventDefault();
        try {
          n ? await LO(i, d) : await MO(i, d, a, s), window.location.reload();
        } catch (g) {
          pe.error(g.toString());
        }
      },
      w = () => r(!n);
    return p.jsxs(_3, {
      className: "login",
      children: [
        p.jsx(Xa, { title: n ? "Login" : "Signup" }),
        p.jsx(ya, { theme: "dark", position: "bottom-center" }),
        p.jsx("h1", { children: "Social Media App" }),
        p.jsxs("form", {
          onSubmit: y,
          children: [
            p.jsxs("div", {
              className: `input-box ${i && "focus"}`,
              children: [
                p.jsx("label", { htmlFor: "username", children: "Username" }),
                p.jsx("input", {
                  type: "text",
                  id: "username",
                  onChange: (m) => o(m.target.value.toLowerCase()),
                  value: i,
                  pattern: e,
                  required: !0,
                  minLength: 6,
                  maxLength: 36,
                  autoFocus: !0,
                }),
              ],
            }),
            !n &&
              p.jsxs(p.Fragment, {
                children: [
                  p.jsxs("div", {
                    className: `input-box ${s && "focus"}`,
                    children: [
                      p.jsx("label", { htmlFor: "email", children: "Email" }),
                      p.jsx("input", {
                        type: "email",
                        id: "email",
                        onChange: (m) => u(m.target.value),
                        value: s,
                        pattern: t,
                        required: !0,
                      }),
                    ],
                  }),
                  p.jsxs("div", {
                    className: `input-box ${a && "focus"}`,
                    children: [
                      p.jsx("label", {
                        htmlFor: "fullname",
                        children: "Fullname",
                      }),
                      p.jsx("input", {
                        type: "text",
                        id: "fullname",
                        onChange: (m) => l(m.target.value),
                        value: a,
                        maxLength: 50,
                      }),
                    ],
                  }),
                ],
              }),
            p.jsxs("div", {
              className: `input-box ${d && "focus"}`,
              children: [
                p.jsx("label", { htmlFor: "password", children: "Password" }),
                p.jsx("input", {
                  type: "password",
                  id: "password",
                  onChange: (m) => c(m.target.value),
                  value: d,
                  required: !0,
                  minLength: 6,
                  maxLength: 100,
                }),
              ],
            }),
            p.jsx("button", {
              disabled: !f,
              type: "submit",
              children: n ? "Login" : "Signup",
            }),
          ],
        }),
        p.jsxs("div", {
          className: "change",
          children: [
            p.jsx("p", {
              children: n
                ? "Don't have an account? "
                : "Have an account? Log in ",
            }),
            p.jsx("button", { onClick: w, children: n ? "Signup" : "Login" }),
          ],
        }),
      ],
    });
  },
  _3 = ce.div`
  width: 350px;
  margin: 2rem;
  border: 1px solid #363636;
  padding: 40px;
  h1 {
    font-size: 26px;
    font-weight: 700;
  }
  form {
    margin-top: 24px;
    .input-box {
      margin-bottom: 8px;
      height: 36px;
      width: 100%;
      position: relative;
      &.focus {
        input {
          padding: 14px 8px 2px;
        }
        label {
          transform: scale(calc(10 / 12)) translateY(-10px);
          left: 4px;
        }
      }
      label {
        top: 8px;
        left: 8px;
        pointer-events: none;
        font-size: 12px;
        color: #a8a8a8;
        position: absolute;
        height: 36px;
        transition: 0.1s ease-in-out all;
      }
      input {
        font-size: 12px;
        border-radius: 3px;
        padding: 9px 8px 7px;
        width: 100%;
        line-height: 18px;
        outline: 1px solid #363636;
        background-color: #121212;
        border: none;
      }
    }
    button {
      font-size: 14px;
      font-weight: 600;
      margin-top: 8px;
      width: 100%;
      padding: 7px 1rem;
      border-radius: 8px;
      color: #fafafa;
      border: none;
      outline: none;
      background-color: #0095f6;
      &:disabled {
        opacity: 0.7;
        cursor: text;
      }
      opacity: 1;
    }
  }
  .change {
    margin-top: 1rem;
    display: flex;
    justify-content: center;
    p {
      color: #f5f5f5;
      font-size: 14px;
      margin-right: 4px;
    }
    button {
      background-color: transparent;
      border: none;
      outline: none;
      color: #0095f6;
      font-size: 14px;
      font-weight: 600;
    }
  }
`;
const $3 = () => p.jsx("div", { children: p.jsx(Xa, { title: "Messages" }) }),
  B3 = () => p.jsx("div", { children: p.jsx("h1", { children: "Furkan" }) }),
  z3 = () =>
    p.jsxs(F3, {
      children: [
        p.jsx("h1", { children: "Sorry, this page isn't available." }),
        p.jsxs(ft, {
          to: "/",
          children: [
            "The link you followed may be broken, or the page may have been removed. Go back to ",
            p.jsx("span", { children: "Home" }),
            ".",
          ],
        }),
      ],
    }),
  F3 = ce.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  h1 {
    margin: 1rem;
    font-size: 24px;
  }
  span {
    font-weight: 600;
    color: #e0f1ff;
  }
`,
  U3 = ({ info: e }) => {
    const { username: t } = ge(Dn, ve),
      { username: n, ispublic: r, status: i } = e,
      o = ge(lk, ve),
      a = Ge(),
      l = () => a(Kp());
    return n == t
      ? null
      : i != 0 && !r
      ? p.jsx("div", {
          className: "priv",
          children: o
            ? p.jsxs(p.Fragment, {
                children: [
                  p.jsx("p", { children: "This Account is Private" }),
                  p.jsx("p", { children: " Follow to see their photos." }),
                ],
              })
            : p.jsxs(p.Fragment, {
                children: [
                  p.jsxs("p", {
                    children: [
                      "This Account is Private Already follow",
                      p.jsx("span", { className: "us", children: n }),
                    ],
                  }),
                  p.jsxs("p", {
                    children: [
                      p.jsx("span", { onClick: l, children: "Log in" }),
                      " to see their photos.",
                    ],
                  }),
                ],
              }),
        })
      : null;
  },
  H3 = () => {
    const t = si().pathname.split("/")[1],
      [n, r] = S.useState([!1, !1]),
      [i, o] = S.useState(!1),
      a = Ge(),
      l = ge((A) => Tm(A, t), ve);
    S.useEffect(() => {
      l || a(Ul(t)), l || a(Wr({ username: t }));
    }, [t]);
    const s = ge((A) => VO(A, t), ve),
      { username: u } = ge(Dn, ve),
      d = S.useRef(null);
    if (
      (S.useLayoutEffect(() => {
        var R;
        if (!(l != null && l.info) || d.current == null) return;
        const A = l.info.offset || 0;
        return (
          (R = d.current) == null || R.scroll({ top: A }),
          () => {
            var V;
            a(
              Em({
                page: t,
                offset: ((V = d.current) == null ? void 0 : V.scrollTop) ?? 0,
              })
            );
          }
        );
      }, []),
      S.useEffect(() => {
        var A, R;
        (l == null ? void 0 : l.username) != u &&
          ((A = l == null ? void 0 : l.info) == null ? void 0 : A.status) ==
            null &&
          (R = l == null ? void 0 : l.info) != null &&
          R.ispublic &&
          s.length == 0 &&
          a(Wr({ username: t }));
      }, [l == null ? void 0 : l.info]),
      !l)
    )
      return p.jsx(p.Fragment, {});
    const { postsState: c, loading: f } = l;
    if (l.exists == !1) return p.jsx(z3, {});
    if (f || !c || !l.info) return p.jsx(p.Fragment, {});
    const { info: h } = l,
      {
        followercount: v,
        followingcount: y,
        postcount: w,
        status: m,
        id: g,
        fullname: x,
        bio: b,
      } = h,
      C = () => {
        m == 2
          ? r([!0, !1])
          : m == null
          ? a(Is({ a: !0, userid: g }))
          : a(Is({ a: !1, userid: g }));
      },
      E = () =>
        m == null ? "Follow" : ["Following", "Requested", "Blocked"][m],
      P = t == u,
      T = (A) =>
        A >= 1e9
          ? (A / 1e9).toFixed(1) + "B"
          : A >= 1e6
          ? (A / 1e6).toFixed(1) + "M"
          : A >= 1e3
          ? (A / 1e3).toFixed(1) + "K"
          : A,
      I = T(w),
      O = T(v),
      D = T(y),
      N = (A) => {
        const { hasmore: R, loading: V } = c;
        if (V || !R) return;
        const { scrollTop: J, scrollHeight: re, clientHeight: L } = A.target;
        if (J + L + 100 >= re) {
          const { created: M, id: W } = s[s.length - 1];
          a(Wr({ username: t, date: M, id: W }));
        }
      };
    return p.jsxs(V3, {
      onScroll: N,
      ref: d,
      children: [
        p.jsx(Xa, { title: t }),
        p.jsxs("div", {
          className: "info",
          children: [
            p.jsx("div", {
              className: "pp",
              children: p.jsx("img", {
                onContextMenu: qa,
                src: (h == null ? void 0 : h.pp) || "/pp.jpg",
              }),
            }),
            p.jsxs("div", {
              className: "text",
              children: [
                p.jsxs("div", {
                  className: "up",
                  children: [
                    p.jsx("p", { className: "username", children: t }),
                    P
                      ? p.jsxs(p.Fragment, {
                          children: [
                            p.jsx(ft, {
                              to: "/account/edit",
                              className: "edit",
                              children: "Edit profile",
                            }),
                            p.jsx("button", {
                              className: "settings",
                              children: p.jsx(Sy, {}),
                            }),
                          ],
                        })
                      : p.jsxs(p.Fragment, {
                          children: [
                            p.jsx("button", {
                              onClick: C,
                              className: `state ${E()}`,
                              children: E(),
                            }),
                            p.jsx("button", {
                              className: "message",
                              children: "Message",
                            }),
                            p.jsx("button", {
                              className: "more",
                              onClick: () => o(!0),
                              children: p.jsx(kE, {}),
                            }),
                          ],
                        }),
                  ],
                }),
                p.jsxs("div", {
                  className: "details",
                  children: [
                    p.jsxs("p", {
                      children: [p.jsx("span", { children: I }), " posts"],
                    }),
                    p.jsxs("p", {
                      children: [p.jsx("span", { children: O }), " followers"],
                    }),
                    p.jsxs("p", {
                      children: [p.jsx("span", { children: D }), " following"],
                    }),
                  ],
                }),
                x && p.jsx("div", { className: "fullname", children: x }),
                b && p.jsx("pre", { className: "bio", children: b }),
              ],
            }),
          ],
        }),
        p.jsx(U3, { info: h }),
        n[0] &&
          p.jsx(G3, {
            close: () => r([!1, !1]),
            username: t,
            state: n[1],
            userid: g,
          }),
        i && p.jsx(W3, { close: () => o(!1), procces: () => r([!0, !0]) }),
        p.jsx("ul", {
          children: s.map((A) => p.jsx(Lw, { post: A, back: t })),
        }),
        (c == null ? void 0 : c.loading) && p.jsx(yn, {}),
      ],
    });
  },
  G3 = ({ state: e, username: t, close: n, userid: r }) => {
    const i = Ge(),
      o = () => {
        i(Hl({ a: e, userid: r })), n();
      };
    return p.jsxs(p.Fragment, {
      children: [
        p.jsx(_w, { onClick: n }),
        p.jsxs("div", {
          className: "block",
          children: [
            p.jsxs("div", {
              className: "txt",
              children: [
                p.jsxs("h1", { children: [e ? "Block" : "Unblock", " ", t] }),
                p.jsx("p", {
                  children: e
                    ? `They won't be able to find your profile, posts or story on App.
          Instagram won't let them know you blocked them.`
                    : `They will now be able to see your posts and follow
          you on App. Instagram won't let them know you unblocked them.`,
                }),
              ],
            }),
            p.jsx("button", {
              onClick: o,
              className: "b",
              children: e ? "Block" : "Unblock",
            }),
            p.jsx("button", { onClick: n, children: "Cancel" }),
          ],
        }),
      ],
    });
  },
  W3 = ({ close: e, procces: t }) =>
    p.jsxs(p.Fragment, {
      children: [
        p.jsx(_w, { onClick: e }),
        p.jsxs("div", {
          className: "morep",
          children: [
            p.jsx("button", {
              onClick: () => {
                e(), t();
              },
              className: "b",
              children: "Block",
            }),
            p.jsx("button", { onClick: e, children: "Cancel" }),
          ],
        }),
      ],
    }),
  _w = ce.div`
  background-color: rgba(0, 0, 0, 0.5);

  width: 100vw;

  height: 100vh;

  position: fixed;

  z-index: 100;

  left: 0px;

  top: 0px;
`,
  V3 = ce.ul`
  height: 100vh;
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
  .loading-box {
    margin: 4rem 0px;
  }
  button {
    &.more {
      svg {
        fill: #fafafa;
      }
    }
    &.settings {
      background-color: transparent !important;
      padding: 0px !important;
      &:hover {
        opacity: 1 !important;
      }
    }
  }
  .priv {
    max-width: calc(906px + 4rem);
    width: 100%;
    border: 1px solid #262626;
    text-align: center;
    padding: 40px;
    p {
      font-size: 14px;
      margin-top: 6px;
    }
    span {
      cursor: pointer;
      color: #0095f6;
      font-weight: 600;
      cursor: pointer;
      &.us {
        color: #fff;
      }
    }
  }
  .info {
    display: flex;
    max-width: calc(906px + 4rem);
    align-items: start;
    padding: 2rem 2rem 1rem;
    width: 100%;
    @media screen and (max-width: 800px) {
      .pp,
      img {
        width: 120px !important;
        height: 120px !important;
      }
    }
    .pp {
      min-width: 150px;

      width: 100%;

      height: 150px;

      flex: 1;

      display: flex;

      justify-content: center;

      img {
        width: 150px;

        height: 150px;

        object-fit: cover;

        border-radius: 100%;
      }
    }
    .text {
      height: 100%;

      flex: 2;

      overflow: hidden;

      .up {
        margin-bottom: 20px;

        display: flex;

        align-items: center;

        .username {
          font-size: 20px;

          margin-right: 2rem;

          max-width: 390px;

          overflow: hidden;

          text-overflow: ellipsis;

          white-space: nowrap;
        }
        button,
        a {
          padding: 7px 1rem;
          border-radius: 8px;
          color: #000;
          background-color: #fafafa;
          margin-right: 1rem;
          font-weight: 600;
          font-size: 14px;
          &:hover {
            opacity: 0.8;
          }
          &.more {
            padding: 0px;
            background-color: transparent;
            opacity: 1 !important;
          }
          &.state {
            &.Follow {
              background-color: #0095f6 !important;
              color: #fafafa;
            }
          }
        }
      }
      .details {
        display: flex;

        justify-content: space-between;

        max-width: 260px;

        width: 100%;

        line-height: 18px;

        margin-bottom: 1rem;

        p {
          cursor: pointer;
        }
        span {
          font-weight: 600;
        }
      }
      .fullname {
        max-width: 450px;

        overflow: hidden;

        font-size: 14px;

        font-weight: 600;

        line-height: 18px;

        text-overflow: ellipsis;

        margin-bottom: 6px;
      }
      .bio {
        max-width: 450px;

        width: 100%;

        line-height: 18px;

        max-height: 80px;

        overflow-y: auto;

        font-size: 14px;

        white-space: pre-wrap;

        word-wrap: break-word;

        &:hover::-webkit-scrollbar {
          display: block;
        }
        &::-webkit-scrollbar {
          width: 8px;

          display: none;
        }
        &::-webkit-scrollbar-thumb {
          width: 8px;

          border-radius: 8px;

          background-color: #363636;

          &:active {
            background-color: #505050;
          }
        }
      }
    }
  }
  .morep {
    border-radius: 12px;
    background-color: #262626;
    width: 400px;
    position: fixed;
    z-index: 120;
    top: calc(50% - 150px);
    left: calc(50% - 200px);
    @keyframes an {
      0% {
        transform: scale(1.2);
      }
      100% {
        transform: scale(1);
      }
    }
    animation: an 0.1s ease-in-out;
    button {
      display: block;

      height: 50px;

      display: flex;

      justify-content: center;

      align-items: center;

      font-size: 14px;

      color: #fafafa;

      width: 100%;

      border-top: 1px solid #363636;

      &:first-child {
        border-top: none;
      }
      &.b {
        font-weight: 600;

        color: #ed4956;
      }
    }
  }
  ul {
    max-width: calc(906px + 4rem);
    width: 100%;
    padding: 2rem;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 3px;
  }
  .block {
    border-radius: 12px;
    background-color: #262626;
    width: 400px;
    position: fixed;
    z-index: 120;
    top: calc(50% - 150px);
    left: calc(50% - 200px);
    @keyframes an {
      0% {
        transform: scale(1.2);
      }
      100% {
        transform: scale(1);
      }
    }
    animation: an 0.1s ease-in-out;
    .txt {
      padding: 2rem;
      h1 {
        color: #f5f5fe;
        font-size: 20px;
        font-weight: 400;
        text-align: center;
      }
      p {
        font-size: 14px;
        color: #a8a8a8;
        text-align: center;
      }
    }

    button {
      display: block;
      height: 50px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 14px;
      color: #fafafa;
      width: 100%;
      border-top: 1px solid #363636;
      &:first-child {
        border-top: none;
      }
      &.b {
        font-weight: 600;
        color: #ed4956;
      }
    }
  }
`,
  q3 = () => {
    const e = ge(sk),
      t = Ge(),
      n = () => t(Kp());
    return e
      ? p.jsxs(p.Fragment, {
          children: [
            p.jsx(Y3, { onClick: n }),
            p.jsx(X3, {
              className: e ? "active" : "",
              children: p.jsx(Mw, {}),
            }),
          ],
        })
      : null;
  },
  Y3 = ce.div`
  background-color: rgba(0, 0, 0, 0.7);
  width: 100vw;
  height: 100vh;
  position: fixed;
  z-index: 299;
  left: 0px;
  top: 0px;
  transition: 0.3s ease-in-out all;
`,
  X3 = ce.div`
  position: fixed;
  z-index: 300;
  top: -400px;
  min-height: 400px;
  top: calc(50% - 200px);
  min-width: 400px;
  border-radius: 8px;
  left: calc(50% - 200px);
  overflow: hidden;
  background-color: #000;
  transition: 0.3s ease-in-out all;
  transform: scale(1);
  .login {
    border: none !important;
  }
  &.active {
    @keyframes sca {
      0% {
        transform: scale(1.1);
      }
      100% {
        transform: scale(1);
      }
    }
    animation: sca 0.1s ease-in-out;
  }
`,
  K3 = () => {
    S.useEffect(() => {
      tk().then((A) => {
        t(A),
          setTimeout(() => {
            a(!1);
          }, 1);
      });
    }, []);
    const [e, t] = S.useState(null),
      n = Ge(),
      r = Dp(),
      i = (A) => {
        if ((A.preventDefault(), !o)) return;
        const R = ((e == null ? void 0 : e.bio) ?? "")
          .replace(
            /\n{2,}/g,
            `
`
          )
          .trim();
        var V = e;
        (V.bio = R),
          delete V.pp,
          jc(V)
            .then(() => {
              n(Xp()),
                r(`/${V.username}`, { replace: !0 }),
                window.location.reload();
            })
            .catch(pe.error);
      };
    S.useEffect(() => {
      a(!0);
    }, [e]);
    const [o, a] = S.useState(!1);
    S.useEffect(() => {
      if (e == null) return;
      const { bio: A } = e;
      if (!(!A || A.trim().length == 0)) {
        var R;
        return (
          clearTimeout(R),
          (R = setTimeout(() => {
            (A || "").trim().length > 0 &&
              t({
                ...e,
                bio: A.replace(
                  /\n{2,}/g,
                  `
`
                ).trim(),
              });
          }, 5e3)),
          () => clearTimeout(R)
        );
      }
    }, [e == null ? void 0 : e.bio]);
    const l = (A) => t({ ...e, fullname: A.target.value }),
      s = (A) => t({ ...e, username: A.target.value.toLowerCase() }),
      u = (A) => t({ ...e, bio: A.target.value }),
      d = (A) => t({ ...e, email: A.target.value }),
      c = (A) => t({ ...e, ispublic: A.target.checked }),
      f = (A) =>
        new Promise((R, V) => {
          let J = new FileReader();
          J.readAsDataURL(A),
            (J.onload = function () {
              R(J.result);
            }),
            (J.onerror = function () {
              V(J.error);
            });
        }),
      [h, v] = S.useState(!1),
      y = () => v(!1),
      [w, m] = S.useState(!1),
      g = async (A) => {
        const R = Array.from(A.target.files || []);
        if (R.length == 0) return;
        const V = R[0];
        if (
          !["image/jpeg", "image/jpg", "image/png"].includes(V.type) ||
          V.size >= 5e6
        )
          return pe.error("Image 5mb under must be and type png, jpeg or jpg");
        m(!0),
          v(!1),
          f(V)
            .then((J) => {
              jc({ pp: J })
                .then((re) => {
                  m(!1), t({ ...e, pp: re });
                })
                .catch((re) => pe.error(re.toString()));
            })
            .catch((J) => pe.error(J.toString()));
      },
      x = () =>
        jc({ pp: null }).then(() => {
          y(), t({ ...e, pp: null }), window.location.reload();
        }),
      [b, C] = S.useState(!1),
      { username: E } = ge(Dn, ve);
    if (e == null) return p.jsx(p.Fragment, {});
    const {
      username: P,
      fullname: T,
      pp: I,
      bio: O,
      email: D,
      ispublic: N,
    } = e;
    return p.jsxs(J3, {
      children: [
        p.jsx(ya, { position: "bottom-center", theme: "dark" }),
        p.jsx("h1", { className: "settings", children: "Settings" }),
        p.jsxs("form", {
          onSubmit: i,
          children: [
            p.jsx("p", { className: "title", children: "Edit Profile" }),
            p.jsxs("div", {
              className: "pp",
              children: [
                p.jsx("div", {
                  className: "l",
                  children: w
                    ? p.jsx(yn, {})
                    : p.jsx("img", { src: I || "/pp.jpg", alt: "pp" }),
                }),
                p.jsxs("div", {
                  className: "t",
                  children: [
                    p.jsx("p", { children: E }),
                    p.jsxs("button", {
                      type: "button",
                      onClick: () => v(!0),
                      autoFocus: !1,
                      tabIndex: 999,
                      children: [
                        I ? "Change" : "Upload",
                        " profile photo",
                        !I &&
                          p.jsx("input", {
                            onClick: (A) => A.stopPropagation(),
                            type: "file",
                            accept: "image/jpeg, image/png, image/jpg",
                            name: "imageu",
                            id: "imageu",
                            onChange: g,
                          }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
            p.jsxs("div", {
              className: "username",
              children: [
                p.jsx("div", {
                  className: "l",
                  children: p.jsx("p", { children: "Fullname" }),
                }),
                p.jsx("input", {
                  type: "text",
                  name: "username",
                  id: "fullname",
                  value: T || "",
                  placeholder: "fullname",
                  onChange: l,
                  maxLength: 50,
                }),
              ],
            }),
            p.jsxs("div", {
              className: "fullname",
              children: [
                p.jsx("div", {
                  className: "l",
                  children: p.jsx("p", { children: "Username" }),
                }),
                p.jsx("input", {
                  type: "text",
                  name: "username",
                  pattern:
                    "^(?=.{6,36}$)(?![_.])(?!.*[_.]{2})[a-z0-9._]+(?<![_.])$",
                  id: "username",
                  value: P,
                  placeholder: "username",
                  onChange: s,
                  required: !0,
                }),
              ],
            }),
            p.jsxs("div", {
              className: "email",
              children: [
                p.jsx("div", {
                  className: "l",
                  children: p.jsx("p", { children: "Email" }),
                }),
                p.jsx("input", {
                  value: D,
                  type: "email",
                  name: "username",
                  pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$",
                  id: "email",
                  placeholder: "email",
                  onChange: d,
                }),
              ],
            }),
            p.jsxs("div", {
              className: "bio",
              children: [
                p.jsx("div", {
                  className: "l",
                  children: p.jsx("p", { className: "bio", children: "Bio" }),
                }),
                p.jsxs("span", {
                  children: [
                    p.jsx("textarea", {
                      placeholder: "bio...",
                      name: "bio",
                      id: "bio",
                      onChange: u,
                      value: O || "",
                      maxLength: 200,
                    }),
                    p.jsxs("p", {
                      children: [
                        (O == null ? void 0 : O.length) || 0,
                        " / 200",
                      ],
                    }),
                  ],
                }),
              ],
            }),
            p.jsxs("div", {
              className: "privacy",
              children: [
                p.jsx("div", {
                  className: "l",
                  children: p.jsx("p", { children: "Account Public" }),
                }),
                p.jsx("input", {
                  type: "checkbox",
                  checked: N,
                  onChange: c,
                  id: "ispublic",
                }),
              ],
            }),
            p.jsxs("div", {
              className: "submitspan",
              children: [
                p.jsx("div", {
                  className: "l",
                  children: p.jsx("button", {
                    onClick: () => C(!0),
                    type: "button",
                    children: "Password Change",
                  }),
                }),
                p.jsx("input", {
                  disabled: !o,
                  className: "submit",
                  type: "submit",
                  value: "Submit",
                }),
              ],
            }),
          ],
        }),
        b && p.jsx(Q3, { close: () => C(!1) }),
        h && p.jsx(Z3, { close: y, pick: g, remove: x }),
      ],
    });
  },
  Q3 = ({ close: e }) =>
    p.jsxs(p.Fragment, {
      children: [
        p.jsx(Uu, { onClick: e }),
        p.jsxs("div", {
          className: "pas",
          children: [
            p.jsx("h1", { children: "Password Change" }),
            p.jsxs("form", {
              onSubmit: async (t) => {
                t.preventDefault();
                const n = t.target,
                  [r, i, o, a] = n,
                  l = r.value,
                  s = i.value,
                  u = o.value,
                  d = a.checked;
                if (s != u) {
                  pe.error("Password not matching"), o.select();
                  return;
                }
                try {
                  await nk(l, s, d),
                    pe.info("Your password has been changed to successful"),
                    e();
                } catch (c) {
                  console.log(c), r.select(), pe.error(c.toString());
                }
              },
              children: [
                p.jsx("input", {
                  type: "password",
                  required: !0,
                  minLength: 6,
                  maxLength: 50,
                  id: "oldpassword",
                  placeholder: "enter old password",
                }),
                p.jsx("input", {
                  type: "password",
                  required: !0,
                  id: "newpassword",
                  minLength: 6,
                  maxLength: 50,
                  placeholder: "enter new password",
                }),
                p.jsx("input", {
                  type: "password",
                  required: !0,
                  minLength: 6,
                  maxLength: 50,
                  id: "again",
                  placeholder: "again new password",
                }),
                p.jsxs("div", {
                  children: [
                    p.jsx("p", { children: "Another devices logout" }),
                    p.jsx("input", {
                      type: "checkbox",
                      defaultChecked: !0,
                      name: "x",
                      id: "logoutcb",
                    }),
                  ],
                }),
                p.jsx("span", {
                  children: p.jsx("button", {
                    type: "submit",
                    children: "Save",
                  }),
                }),
              ],
            }),
          ],
        }),
      ],
    }),
  Z3 = ({ close: e, pick: t, remove: n }) => (
    S.useEffect(() => {
      const r = (i) => {
        i.key == "Escape" && e();
      };
      return (
        window.addEventListener("keydown", r),
        () => {
          window.removeEventListener("keydown", r);
        }
      );
    }, []),
    p.jsxs(p.Fragment, {
      children: [
        p.jsx(Uu, { onClick: e }),
        p.jsxs("div", {
          className: "popup",
          children: [
            p.jsx("h1", { children: "Change Profile Photo" }),
            p.jsxs("button", {
              className: "u",
              autoFocus: !1,
              tabIndex: -1,
              children: [
                "Upload Photo",
                p.jsx("input", {
                  type: "file",
                  accept: "image/jpeg, image/png, image/jpg",
                  name: "imageu",
                  id: "imagequ",
                  onChange: t,
                }),
              ],
            }),
            p.jsx("button", {
              className: "d",
              onClick: n,
              children: "Remove Current Photo",
            }),
            p.jsx("button", { onClick: e, children: "Cancel" }),
          ],
        }),
      ],
    })
  ),
  J3 = ce.div`
  width: 100%;
  height: 100vh;
  padding: 2rem;
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  .pas {
    width: 400px;
    background-color: #161616;
    top: calc(50% - 200px);
    left: calc(50% - 200px);
    height: 400px;
    border-radius: 12px;
    z-index: 200;
    position: fixed;
    padding: 1rem;
    h1 {
      text-align: center;
      font-size: 22px;
      margin-top: 2rem;
      font-weight: 500;
    }
    form {
      border: none;
      input {
        width: 100%;
        border: 1px solid #363636;
        padding: 10px;
        font-size: 14px;
        margin-top: 10px;
        outline: none;
        border-radius: 4px;
        background-color: #141414;
      }
      div {
        margin-top: 1rem;
        display: flex;
        font-size: 14px;
        white-space: nowrap;
        line-height: 18px;
        color: rgb(230, 230, 230);
        input {
          margin: 0px;
          width: 12px;
          margin-left: 10px;
        }
      }
      span {
        display: flex;
        justify-content: center;
        width: 100%;
        button {
          margin-top: 1rem;
          color: #0095f6;
          font-size: 14px;
          font-weight: 600;
          transition: 0.1s ease-in-out all;
          padding: 7px 2rem;
          border-radius: 8px;
          &:hover {
            background-color: #0095f6;
            color: #fafafa;
          }
        }
      }
    }
  }
  .settings {
    font-size: 24px;
    position: absolute;
    left: 2rem;
    top: 2rem;
    font-weight: 600;
  }
  .loading-box {
    width: 2rem;
    height: 2rem;
    svg {
      width: 2rem;
      height: 2rem;
    }
  }
  .popup {
    @keyframes xsxa {
      0% {
        transform: scale(1.2);
      }
      100% {
        transform: scale(1.2);
      }
    }
    animation: xsxa 0.1 ease-in-out;
    position: fixed;
    width: 400px;
    height: 223px;
    border-radius: 12px;
    background-color: #262626;
    z-index: 200;
    left: calc(50% - 200px);
    top: calc(50% - 110px);

    h1 {
      height: 79px;
      font-size: 20px;
      padding: 2rem 0px 1rem;
      line-height: 15px;
      font-weight: 600;
      text-align: center;
      width: 100%;
    }
    button {
      width: 100%;
      height: 48px;
      font-size: 14px;
      color: #fafafa;
      border-top: 1px solid #363636;
      position: relative;
      input {
        position: absolute;
        left: 0px;
        top: 0px;
        width: 100%;
        height: 100%;
        opacity: 0;
        cursor: pointer;
      }
      &.u {
        color: #0095f6;
        font-weight: 700;
      }
      &.d {
        font-weight: 700;
        color: #ed4956;
      }
    }
  }
  form {
    border: 1px solid #363636;
    padding: 2rem;
    max-width: 500px;
    width: 100%;
    max-height: 700px;
    overflow-y: auto;
    &::-webkit-scrollbar {
      width: 8px;
    }
    &::-webkit-scrollbar-thumb {
      width: 8px;
      background-color: #262626;
      &:active {
        background-color: #363636;
        border-radius: 8px;
      }
    }
    .title {
      font-size: 24px;
      margin-bottom: 28px;
      white-space: nowrap;
      width: 120px;
    }
    .l {
      min-width: 120px;
      width: 120px;
      margin-right: 2rem;
      display: flex;
      justify-content: end;
    }

    .pp {
      margin-bottom: 2rem;
      height: 2rem;
      display: flex;
      align-items: start;
      img {
        max-width: 2rem;
        max-height: 2rem;
        object-fit: cover;
        border-radius: 100%;
        width: 2rem;
        height: 2rem;
        min-height: 2rem;
        min-width: 2rem;
      }
      .t {
        font-weight: 600;
        line-height: 18px;
      }
      button {
        font-size: 14px;
        font-weight: 600;
        line-height: 18px;
        color: #0095f6;
        white-space: nowrap;
        position: relative;
        cursor: pointer;
        input {
          position: absolute;
          left: 0px;
          top: 0px;
          width: 100%;
          height: 100%;
          cursor: pointer;
          opacity: 0;
        }
        &:hover {
          color: #f5f5f5;
        }
      }
    }
    .username,
    .fullname {
      margin-bottom: 1rem;
      display: flex;
      input {
        background-color: #000;
        border: 1px solid #363636;
        border-radius: 3px;
        font-size: 1rem;
        padding: 6px;
        width: 100%;
        line-height: 18px;
      }
    }
    .email {
      margin-bottom: 1rem;
      display: flex;
      input {
        background-color: #000;
        border: 1px solid #363636;
        border-radius: 3px;
        font-size: 1rem;
        padding: 6px;
        width: 100%;
        line-height: 18px;
      }
    }
    .bio {
      display: flex;
      align-items: start;
      margin-bottom: 1rem;
      .bio {
        font-size: 1rem;
        color: #fafafa;
      }
      span {
        width: 100%;
      }
      textarea {
        width: 100%;
        height: 48px;
        line-height: 18px;
        background-color: #000;
        border: 1px solid #363636;
        border-radius: 3px;
        padding: 6px 10px;
        color: #fafafa;
        max-width: 282px;
        resize: vertical;
        font-size: 1rem;
      }
      p {
        font-size: 12px;
        line-height: 12px;
        margin-top: 4px;
        color: #a8a8a8;
        text-align: start;
      }
    }
    .privacy {
      margin-top: 1rem;
      display: flex;
    }
    .submitspan {
      margin-top: 1rem;
      display: flex;
      justify-content: space-between;
      button {
        color: #0095f6;
        font-size: 14px;
        font-weight: 600;
        &:hover {
          opacity: 0.8;
        }
      }
      .submit {
        padding: 7px 1rem;
        border-radius: 8px;
        font-size: 14px;
        background-color: #0095f6;
        outline: none;
        cursor: pointer;
        border: none;
        &:disabled {
          cursor: default;
          opacity: 0.8;
        }
      }
    }
  }
`,
  eN = () => {
    const e = Ge(),
      t = () => e(Kp());
    return p.jsx(tN, {
      children: p.jsxs("div", {
        className: "content",
        children: [
          p.jsx("h1", { children: "Social Media App" }),
          p.jsx("button", { onClick: t, children: "Login" }),
        ],
      }),
    });
  },
  tN = ce.div`
  width: 100%;
  justify-content: center;
  display: flex;
  position: absolute;
  align-items: center;
  bottom: 0rem;
  z-index: 5560;
  .content {
    border-radius: 22px 22px 0px 0px;
    padding: 2rem;
    background-color: #000;
    max-width: 940px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    h1 {
      font-size: 24px;
      font-weight: 600;
    }
    button {
      padding: 7px 1rem;
      border-radius: 8px;
      color: #fafafa;
      font-size: 14px;
      cursor: pointer;
      background-color: #0095f6;
      &:hover {
        opacity: 0.7;
      }
    }
  }
`,
  nN = () => {
    const { isloggedin: e, loginPopupActive: t } = ge(ak),
      n = ge(Bu, ve),
      r = si().pathname;
    return p.jsxs(rN, {
      children: [
        t && p.jsx(q3, {}),
        e && p.jsx($O, {}),
        p.jsxs(iN, {
          children: [
            !e && r != "/" && p.jsx(eN, {}),
            p.jsxs(iC, {
              children: [
                p.jsx(Mr, {
                  path: "/",
                  element: e ? p.jsx(j3, {}) : p.jsx(Mw, {}),
                }),
                p.jsx(Mr, { path: "/p/:postid", element: p.jsx(B3, {}) }),
                p.jsx(Mr, {
                  path: "/:username/saved?",
                  element: p.jsx(H3, {}),
                }),
                e &&
                  p.jsxs(p.Fragment, {
                    children: [
                      p.jsx(Mr, { path: "/explore", element: p.jsx(L3, {}) }),
                      p.jsx(Mr, {
                        path: "/direct/inbox",
                        element: p.jsx($3, {}),
                      }),
                      p.jsx(Mr, {
                        path: "/account/edit",
                        element: p.jsx(K3, {}),
                      }),
                    ],
                  }),
              ],
            }),
          ],
        }),
        n && p.jsx($j, {}),
      ],
    });
  },
  rN = ce.div`
  width: 100vw;
  height: 100vh;
  display: flex;
`,
  iN = ce.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;
const oN = UT({ reducer: { profile: uk, posts: XO } });
od.createRoot(document.getElementById("root")).render(
  p.jsx(sT, { store: oN, children: p.jsx(uC, { children: p.jsx(nN, {}) }) })
);

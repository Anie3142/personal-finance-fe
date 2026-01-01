
import {Buffer} from "node:buffer";
globalThis.Buffer = Buffer;

import {AsyncLocalStorage} from "node:async_hooks";
globalThis.AsyncLocalStorage = AsyncLocalStorage;


const defaultDefineProperty = Object.defineProperty;
Object.defineProperty = function(o, p, a) {
  if(p=== '__import_unsupported' && Boolean(globalThis.__import_unsupported)) {
    return;
  }
  return defaultDefineProperty(o, p, a);
};

  
  
  globalThis.openNextDebug = false;globalThis.openNextVersion = "3.9.7";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __reExport = (target, mod, secondTarget) => (__copyProps(target, mod, "default"), secondTarget && __copyProps(secondTarget, mod, "default"));
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// node_modules/@opennextjs/aws/dist/utils/error.js
function isOpenNextError(e) {
  try {
    return "__openNextInternal" in e;
  } catch {
    return false;
  }
}
var init_error = __esm({
  "node_modules/@opennextjs/aws/dist/utils/error.js"() {
  }
});

// node_modules/@opennextjs/aws/dist/adapters/logger.js
function debug(...args) {
  if (globalThis.openNextDebug) {
    console.log(...args);
  }
}
function warn(...args) {
  console.warn(...args);
}
function error(...args) {
  if (args.some((arg) => isDownplayedErrorLog(arg))) {
    return debug(...args);
  }
  if (args.some((arg) => isOpenNextError(arg))) {
    const error2 = args.find((arg) => isOpenNextError(arg));
    if (error2.logLevel < getOpenNextErrorLogLevel()) {
      return;
    }
    if (error2.logLevel === 0) {
      return console.log(...args.map((arg) => isOpenNextError(arg) ? `${arg.name}: ${arg.message}` : arg));
    }
    if (error2.logLevel === 1) {
      return warn(...args.map((arg) => isOpenNextError(arg) ? `${arg.name}: ${arg.message}` : arg));
    }
    return console.error(...args);
  }
  console.error(...args);
}
function getOpenNextErrorLogLevel() {
  const strLevel = process.env.OPEN_NEXT_ERROR_LOG_LEVEL ?? "1";
  switch (strLevel.toLowerCase()) {
    case "debug":
    case "0":
      return 0;
    case "error":
    case "2":
      return 2;
    default:
      return 1;
  }
}
var DOWNPLAYED_ERROR_LOGS, isDownplayedErrorLog;
var init_logger = __esm({
  "node_modules/@opennextjs/aws/dist/adapters/logger.js"() {
    init_error();
    DOWNPLAYED_ERROR_LOGS = [
      {
        clientName: "S3Client",
        commandName: "GetObjectCommand",
        errorName: "NoSuchKey"
      }
    ];
    isDownplayedErrorLog = (errorLog) => DOWNPLAYED_ERROR_LOGS.some((downplayedInput) => downplayedInput.clientName === errorLog?.clientName && downplayedInput.commandName === errorLog?.commandName && (downplayedInput.errorName === errorLog?.error?.name || downplayedInput.errorName === errorLog?.error?.Code));
  }
});

// node_modules/@opennextjs/aws/node_modules/cookie/dist/index.js
var require_dist = __commonJS({
  "node_modules/@opennextjs/aws/node_modules/cookie/dist/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.parseCookie = parseCookie;
    exports.parse = parseCookie;
    exports.stringifyCookie = stringifyCookie;
    exports.stringifySetCookie = stringifySetCookie;
    exports.serialize = stringifySetCookie;
    exports.parseSetCookie = parseSetCookie;
    exports.stringifySetCookie = stringifySetCookie;
    exports.serialize = stringifySetCookie;
    var cookieNameRegExp = /^[\u0021-\u003A\u003C\u003E-\u007E]+$/;
    var cookieValueRegExp = /^[\u0021-\u003A\u003C-\u007E]*$/;
    var domainValueRegExp = /^([.]?[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)([.][a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)*$/i;
    var pathValueRegExp = /^[\u0020-\u003A\u003D-\u007E]*$/;
    var maxAgeRegExp = /^-?\d+$/;
    var __toString = Object.prototype.toString;
    var NullObject = /* @__PURE__ */ (() => {
      const C = function() {
      };
      C.prototype = /* @__PURE__ */ Object.create(null);
      return C;
    })();
    function parseCookie(str, options) {
      const obj = new NullObject();
      const len = str.length;
      if (len < 2)
        return obj;
      const dec = options?.decode || decode;
      let index = 0;
      do {
        const eqIdx = eqIndex(str, index, len);
        if (eqIdx === -1)
          break;
        const endIdx = endIndex(str, index, len);
        if (eqIdx > endIdx) {
          index = str.lastIndexOf(";", eqIdx - 1) + 1;
          continue;
        }
        const key = valueSlice(str, index, eqIdx);
        if (obj[key] === void 0) {
          obj[key] = dec(valueSlice(str, eqIdx + 1, endIdx));
        }
        index = endIdx + 1;
      } while (index < len);
      return obj;
    }
    function stringifyCookie(cookie, options) {
      const enc = options?.encode || encodeURIComponent;
      const cookieStrings = [];
      for (const name of Object.keys(cookie)) {
        const val = cookie[name];
        if (val === void 0)
          continue;
        if (!cookieNameRegExp.test(name)) {
          throw new TypeError(`cookie name is invalid: ${name}`);
        }
        const value = enc(val);
        if (!cookieValueRegExp.test(value)) {
          throw new TypeError(`cookie val is invalid: ${val}`);
        }
        cookieStrings.push(`${name}=${value}`);
      }
      return cookieStrings.join("; ");
    }
    function stringifySetCookie(_name, _val, _opts) {
      const cookie = typeof _name === "object" ? _name : { ..._opts, name: _name, value: String(_val) };
      const options = typeof _val === "object" ? _val : _opts;
      const enc = options?.encode || encodeURIComponent;
      if (!cookieNameRegExp.test(cookie.name)) {
        throw new TypeError(`argument name is invalid: ${cookie.name}`);
      }
      const value = cookie.value ? enc(cookie.value) : "";
      if (!cookieValueRegExp.test(value)) {
        throw new TypeError(`argument val is invalid: ${cookie.value}`);
      }
      let str = cookie.name + "=" + value;
      if (cookie.maxAge !== void 0) {
        if (!Number.isInteger(cookie.maxAge)) {
          throw new TypeError(`option maxAge is invalid: ${cookie.maxAge}`);
        }
        str += "; Max-Age=" + cookie.maxAge;
      }
      if (cookie.domain) {
        if (!domainValueRegExp.test(cookie.domain)) {
          throw new TypeError(`option domain is invalid: ${cookie.domain}`);
        }
        str += "; Domain=" + cookie.domain;
      }
      if (cookie.path) {
        if (!pathValueRegExp.test(cookie.path)) {
          throw new TypeError(`option path is invalid: ${cookie.path}`);
        }
        str += "; Path=" + cookie.path;
      }
      if (cookie.expires) {
        if (!isDate(cookie.expires) || !Number.isFinite(cookie.expires.valueOf())) {
          throw new TypeError(`option expires is invalid: ${cookie.expires}`);
        }
        str += "; Expires=" + cookie.expires.toUTCString();
      }
      if (cookie.httpOnly) {
        str += "; HttpOnly";
      }
      if (cookie.secure) {
        str += "; Secure";
      }
      if (cookie.partitioned) {
        str += "; Partitioned";
      }
      if (cookie.priority) {
        const priority = typeof cookie.priority === "string" ? cookie.priority.toLowerCase() : void 0;
        switch (priority) {
          case "low":
            str += "; Priority=Low";
            break;
          case "medium":
            str += "; Priority=Medium";
            break;
          case "high":
            str += "; Priority=High";
            break;
          default:
            throw new TypeError(`option priority is invalid: ${cookie.priority}`);
        }
      }
      if (cookie.sameSite) {
        const sameSite = typeof cookie.sameSite === "string" ? cookie.sameSite.toLowerCase() : cookie.sameSite;
        switch (sameSite) {
          case true:
          case "strict":
            str += "; SameSite=Strict";
            break;
          case "lax":
            str += "; SameSite=Lax";
            break;
          case "none":
            str += "; SameSite=None";
            break;
          default:
            throw new TypeError(`option sameSite is invalid: ${cookie.sameSite}`);
        }
      }
      return str;
    }
    function parseSetCookie(str, options) {
      const dec = options?.decode || decode;
      const len = str.length;
      const endIdx = endIndex(str, 0, len);
      const eqIdx = eqIndex(str, 0, endIdx);
      const setCookie = eqIdx === -1 ? { name: "", value: dec(valueSlice(str, 0, endIdx)) } : {
        name: valueSlice(str, 0, eqIdx),
        value: dec(valueSlice(str, eqIdx + 1, endIdx))
      };
      let index = endIdx + 1;
      while (index < len) {
        const endIdx2 = endIndex(str, index, len);
        const eqIdx2 = eqIndex(str, index, endIdx2);
        const attr = eqIdx2 === -1 ? valueSlice(str, index, endIdx2) : valueSlice(str, index, eqIdx2);
        const val = eqIdx2 === -1 ? void 0 : valueSlice(str, eqIdx2 + 1, endIdx2);
        switch (attr.toLowerCase()) {
          case "httponly":
            setCookie.httpOnly = true;
            break;
          case "secure":
            setCookie.secure = true;
            break;
          case "partitioned":
            setCookie.partitioned = true;
            break;
          case "domain":
            setCookie.domain = val;
            break;
          case "path":
            setCookie.path = val;
            break;
          case "max-age":
            if (val && maxAgeRegExp.test(val))
              setCookie.maxAge = Number(val);
            break;
          case "expires":
            if (!val)
              break;
            const date = new Date(val);
            if (Number.isFinite(date.valueOf()))
              setCookie.expires = date;
            break;
          case "priority":
            if (!val)
              break;
            const priority = val.toLowerCase();
            if (priority === "low" || priority === "medium" || priority === "high") {
              setCookie.priority = priority;
            }
            break;
          case "samesite":
            if (!val)
              break;
            const sameSite = val.toLowerCase();
            if (sameSite === "lax" || sameSite === "strict" || sameSite === "none") {
              setCookie.sameSite = sameSite;
            }
            break;
        }
        index = endIdx2 + 1;
      }
      return setCookie;
    }
    function endIndex(str, min, len) {
      const index = str.indexOf(";", min);
      return index === -1 ? len : index;
    }
    function eqIndex(str, min, max) {
      const index = str.indexOf("=", min);
      return index < max ? index : -1;
    }
    function valueSlice(str, min, max) {
      let start = min;
      let end = max;
      do {
        const code = str.charCodeAt(start);
        if (code !== 32 && code !== 9)
          break;
      } while (++start < end);
      while (end > start) {
        const code = str.charCodeAt(end - 1);
        if (code !== 32 && code !== 9)
          break;
        end--;
      }
      return str.slice(start, end);
    }
    function decode(str) {
      if (str.indexOf("%") === -1)
        return str;
      try {
        return decodeURIComponent(str);
      } catch (e) {
        return str;
      }
    }
    function isDate(val) {
      return __toString.call(val) === "[object Date]";
    }
  }
});

// node_modules/@opennextjs/aws/dist/http/util.js
function parseSetCookieHeader(cookies) {
  if (!cookies) {
    return [];
  }
  if (typeof cookies === "string") {
    return cookies.split(/(?<!Expires=\w+),/i).map((c) => c.trim());
  }
  return cookies;
}
function getQueryFromIterator(it) {
  const query = {};
  for (const [key, value] of it) {
    if (key in query) {
      if (Array.isArray(query[key])) {
        query[key].push(value);
      } else {
        query[key] = [query[key], value];
      }
    } else {
      query[key] = value;
    }
  }
  return query;
}
var init_util = __esm({
  "node_modules/@opennextjs/aws/dist/http/util.js"() {
    init_logger();
  }
});

// node_modules/@opennextjs/aws/dist/overrides/converters/utils.js
function getQueryFromSearchParams(searchParams) {
  return getQueryFromIterator(searchParams.entries());
}
var init_utils = __esm({
  "node_modules/@opennextjs/aws/dist/overrides/converters/utils.js"() {
    init_util();
  }
});

// node_modules/@opennextjs/aws/dist/overrides/converters/edge.js
var edge_exports = {};
__export(edge_exports, {
  default: () => edge_default
});
import { Buffer as Buffer2 } from "node:buffer";
var import_cookie, NULL_BODY_STATUSES, converter, edge_default;
var init_edge = __esm({
  "node_modules/@opennextjs/aws/dist/overrides/converters/edge.js"() {
    import_cookie = __toESM(require_dist(), 1);
    init_util();
    init_utils();
    NULL_BODY_STATUSES = /* @__PURE__ */ new Set([101, 103, 204, 205, 304]);
    converter = {
      convertFrom: async (event) => {
        const url = new URL(event.url);
        const searchParams = url.searchParams;
        const query = getQueryFromSearchParams(searchParams);
        const headers = {};
        event.headers.forEach((value, key) => {
          headers[key] = value;
        });
        const rawPath = url.pathname;
        const method = event.method;
        const shouldHaveBody = method !== "GET" && method !== "HEAD";
        const body = shouldHaveBody ? Buffer2.from(await event.arrayBuffer()) : void 0;
        const cookieHeader = event.headers.get("cookie");
        const cookies = cookieHeader ? import_cookie.default.parse(cookieHeader) : {};
        return {
          type: "core",
          method,
          rawPath,
          url: event.url,
          body,
          headers,
          remoteAddress: event.headers.get("x-forwarded-for") ?? "::1",
          query,
          cookies
        };
      },
      convertTo: async (result) => {
        if ("internalEvent" in result) {
          const request = new Request(result.internalEvent.url, {
            body: result.internalEvent.body,
            method: result.internalEvent.method,
            headers: {
              ...result.internalEvent.headers,
              "x-forwarded-host": result.internalEvent.headers.host
            }
          });
          if (globalThis.__dangerous_ON_edge_converter_returns_request === true) {
            return request;
          }
          const cfCache = (result.isISR || result.internalEvent.rawPath.startsWith("/_next/image")) && process.env.DISABLE_CACHE !== "true" ? { cacheEverything: true } : {};
          return fetch(request, {
            // This is a hack to make sure that the response is cached by Cloudflare
            // See https://developers.cloudflare.com/workers/examples/cache-using-fetch/#caching-html-resources
            // @ts-expect-error - This is a Cloudflare specific option
            cf: cfCache
          });
        }
        const headers = new Headers();
        for (const [key, value] of Object.entries(result.headers)) {
          if (key === "set-cookie" && typeof value === "string") {
            const cookies = parseSetCookieHeader(value);
            for (const cookie of cookies) {
              headers.append(key, cookie);
            }
            continue;
          }
          if (Array.isArray(value)) {
            for (const v of value) {
              headers.append(key, v);
            }
          } else {
            headers.set(key, value);
          }
        }
        const body = NULL_BODY_STATUSES.has(result.statusCode) ? null : result.body;
        return new Response(body, {
          status: result.statusCode,
          headers
        });
      },
      name: "edge"
    };
    edge_default = converter;
  }
});

// node_modules/@opennextjs/aws/dist/overrides/wrappers/cloudflare-edge.js
var cloudflare_edge_exports = {};
__export(cloudflare_edge_exports, {
  default: () => cloudflare_edge_default
});
var cfPropNameMapping, handler, cloudflare_edge_default;
var init_cloudflare_edge = __esm({
  "node_modules/@opennextjs/aws/dist/overrides/wrappers/cloudflare-edge.js"() {
    cfPropNameMapping = {
      // The city name is percent-encoded.
      // See https://github.com/vercel/vercel/blob/4cb6143/packages/functions/src/headers.ts#L94C19-L94C37
      city: [encodeURIComponent, "x-open-next-city"],
      country: "x-open-next-country",
      regionCode: "x-open-next-region",
      latitude: "x-open-next-latitude",
      longitude: "x-open-next-longitude"
    };
    handler = async (handler3, converter2) => async (request, env, ctx) => {
      globalThis.process = process;
      for (const [key, value] of Object.entries(env)) {
        if (typeof value === "string") {
          process.env[key] = value;
        }
      }
      const internalEvent = await converter2.convertFrom(request);
      const cfProperties = request.cf;
      for (const [propName, mapping] of Object.entries(cfPropNameMapping)) {
        const propValue = cfProperties?.[propName];
        if (propValue != null) {
          const [encode, headerName] = Array.isArray(mapping) ? mapping : [null, mapping];
          internalEvent.headers[headerName] = encode ? encode(propValue) : propValue;
        }
      }
      const response = await handler3(internalEvent, {
        waitUntil: ctx.waitUntil.bind(ctx)
      });
      const result = await converter2.convertTo(response);
      return result;
    };
    cloudflare_edge_default = {
      wrapper: handler,
      name: "cloudflare-edge",
      supportStreaming: true,
      edgeRuntime: true
    };
  }
});

// node_modules/@opennextjs/aws/dist/overrides/originResolver/pattern-env.js
var pattern_env_exports = {};
__export(pattern_env_exports, {
  default: () => pattern_env_default
});
function initializeOnce() {
  if (initialized)
    return;
  cachedOrigins = JSON.parse(process.env.OPEN_NEXT_ORIGIN ?? "{}");
  const functions = globalThis.openNextConfig.functions ?? {};
  for (const key in functions) {
    if (key !== "default") {
      const value = functions[key];
      const regexes = [];
      for (const pattern of value.patterns) {
        const regexPattern = `/${pattern.replace(/\*\*/g, "(.*)").replace(/\*/g, "([^/]*)").replace(/\//g, "\\/").replace(/\?/g, ".")}`;
        regexes.push(new RegExp(regexPattern));
      }
      cachedPatterns.push({
        key,
        patterns: value.patterns,
        regexes
      });
    }
  }
  initialized = true;
}
var cachedOrigins, cachedPatterns, initialized, envLoader, pattern_env_default;
var init_pattern_env = __esm({
  "node_modules/@opennextjs/aws/dist/overrides/originResolver/pattern-env.js"() {
    init_logger();
    cachedPatterns = [];
    initialized = false;
    envLoader = {
      name: "env",
      resolve: async (_path) => {
        try {
          initializeOnce();
          for (const { key, patterns, regexes } of cachedPatterns) {
            for (const regex of regexes) {
              if (regex.test(_path)) {
                debug("Using origin", key, patterns);
                return cachedOrigins[key];
              }
            }
          }
          if (_path.startsWith("/_next/image") && cachedOrigins.imageOptimizer) {
            debug("Using origin", "imageOptimizer", _path);
            return cachedOrigins.imageOptimizer;
          }
          if (cachedOrigins.default) {
            debug("Using default origin", cachedOrigins.default, _path);
            return cachedOrigins.default;
          }
          return false;
        } catch (e) {
          error("Error while resolving origin", e);
          return false;
        }
      }
    };
    pattern_env_default = envLoader;
  }
});

// node_modules/@opennextjs/aws/dist/overrides/assetResolver/dummy.js
var dummy_exports = {};
__export(dummy_exports, {
  default: () => dummy_default
});
var resolver, dummy_default;
var init_dummy = __esm({
  "node_modules/@opennextjs/aws/dist/overrides/assetResolver/dummy.js"() {
    resolver = {
      name: "dummy"
    };
    dummy_default = resolver;
  }
});

// node_modules/@opennextjs/aws/dist/utils/stream.js
import { ReadableStream } from "node:stream/web";
function toReadableStream(value, isBase64) {
  return new ReadableStream({
    pull(controller) {
      controller.enqueue(Buffer.from(value, isBase64 ? "base64" : "utf8"));
      controller.close();
    }
  }, { highWaterMark: 0 });
}
function emptyReadableStream() {
  if (process.env.OPEN_NEXT_FORCE_NON_EMPTY_RESPONSE === "true") {
    return new ReadableStream({
      pull(controller) {
        maybeSomethingBuffer ??= Buffer.from("SOMETHING");
        controller.enqueue(maybeSomethingBuffer);
        controller.close();
      }
    }, { highWaterMark: 0 });
  }
  return new ReadableStream({
    start(controller) {
      controller.close();
    }
  });
}
var maybeSomethingBuffer;
var init_stream = __esm({
  "node_modules/@opennextjs/aws/dist/utils/stream.js"() {
  }
});

// node_modules/@opennextjs/aws/dist/overrides/proxyExternalRequest/fetch.js
var fetch_exports = {};
__export(fetch_exports, {
  default: () => fetch_default
});
var fetchProxy, fetch_default;
var init_fetch = __esm({
  "node_modules/@opennextjs/aws/dist/overrides/proxyExternalRequest/fetch.js"() {
    init_stream();
    fetchProxy = {
      name: "fetch-proxy",
      // @ts-ignore
      proxy: async (internalEvent) => {
        const { url, headers: eventHeaders, method, body } = internalEvent;
        const headers = Object.fromEntries(Object.entries(eventHeaders).filter(([key]) => key.toLowerCase() !== "cf-connecting-ip"));
        const response = await fetch(url, {
          method,
          headers,
          body
        });
        const responseHeaders = {};
        response.headers.forEach((value, key) => {
          responseHeaders[key] = value;
        });
        return {
          type: "core",
          headers: responseHeaders,
          statusCode: response.status,
          isBase64Encoded: true,
          body: response.body ?? emptyReadableStream()
        };
      }
    };
    fetch_default = fetchProxy;
  }
});

// .next/server/edge-runtime-webpack.js
var require_edge_runtime_webpack = __commonJS({
  ".next/server/edge-runtime-webpack.js"() {
    "use strict";
    (() => {
      "use strict";
      var e = {}, r = {};
      function t(o) {
        var n = r[o];
        if (void 0 !== n) return n.exports;
        var i = r[o] = { exports: {} }, l = true;
        try {
          e[o].call(i.exports, i, i.exports, t), l = false;
        } finally {
          l && delete r[o];
        }
        return i.exports;
      }
      t.m = e, t.amdO = {}, (() => {
        var e2 = [];
        t.O = (r2, o, n, i) => {
          if (o) {
            i = i || 0;
            for (var l = e2.length; l > 0 && e2[l - 1][2] > i; l--) e2[l] = e2[l - 1];
            e2[l] = [o, n, i];
            return;
          }
          for (var a = 1 / 0, l = 0; l < e2.length; l++) {
            for (var [o, n, i] = e2[l], u = true, f = 0; f < o.length; f++) a >= i && Object.keys(t.O).every((e3) => t.O[e3](o[f])) ? o.splice(f--, 1) : (u = false, i < a && (a = i));
            if (u) {
              e2.splice(l--, 1);
              var s = n();
              void 0 !== s && (r2 = s);
            }
          }
          return r2;
        };
      })(), t.n = (e2) => {
        var r2 = e2 && e2.__esModule ? () => e2.default : () => e2;
        return t.d(r2, { a: r2 }), r2;
      }, t.d = (e2, r2) => {
        for (var o in r2) t.o(r2, o) && !t.o(e2, o) && Object.defineProperty(e2, o, { enumerable: true, get: r2[o] });
      }, t.g = function() {
        if ("object" == typeof globalThis) return globalThis;
        try {
          return this || Function("return this")();
        } catch (e2) {
          if ("object" == typeof window) return window;
        }
      }(), t.o = (e2, r2) => Object.prototype.hasOwnProperty.call(e2, r2), t.r = (e2) => {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e2, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(e2, "__esModule", { value: true });
      }, (() => {
        var e2 = { 993: 0 };
        t.O.j = (r3) => 0 === e2[r3];
        var r2 = (r3, o2) => {
          var n, i, [l, a, u] = o2, f = 0;
          if (l.some((r4) => 0 !== e2[r4])) {
            for (n in a) t.o(a, n) && (t.m[n] = a[n]);
            if (u) var s = u(t);
          }
          for (r3 && r3(o2); f < l.length; f++) i = l[f], t.o(e2, i) && e2[i] && e2[i][0](), e2[i] = 0;
          return t.O(s);
        }, o = self.webpackChunk_N_E = self.webpackChunk_N_E || [];
        o.forEach(r2.bind(null, 0)), o.push = r2.bind(null, o.push.bind(o));
      })();
    })();
  }
});

// node-built-in-modules:node:async_hooks
var node_async_hooks_exports = {};
import * as node_async_hooks_star from "node:async_hooks";
var init_node_async_hooks = __esm({
  "node-built-in-modules:node:async_hooks"() {
    __reExport(node_async_hooks_exports, node_async_hooks_star);
  }
});

// node-built-in-modules:node:buffer
var node_buffer_exports = {};
import * as node_buffer_star from "node:buffer";
var init_node_buffer = __esm({
  "node-built-in-modules:node:buffer"() {
    __reExport(node_buffer_exports, node_buffer_star);
  }
});

// .next/server/src/middleware.js
var require_middleware = __commonJS({
  ".next/server/src/middleware.js"() {
    "use strict";
    (self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([[727], { 2067: (e) => {
      "use strict";
      e.exports = (init_node_async_hooks(), __toCommonJS(node_async_hooks_exports));
    }, 6195: (e) => {
      "use strict";
      e.exports = (init_node_buffer(), __toCommonJS(node_buffer_exports));
    }, 7413: (e, t, r) => {
      "use strict";
      let n;
      r.r(t), r.d(t, { default: () => e_ });
      var a, i, s, o, l, c, u, d, p, h, f, m, g = {};
      async function y() {
        let e2 = "_ENTRIES" in globalThis && _ENTRIES.middleware_instrumentation && (await _ENTRIES.middleware_instrumentation).register;
        if (e2) try {
          await e2();
        } catch (e3) {
          throw e3.message = `An error occurred while loading instrumentation hook: ${e3.message}`, e3;
        }
      }
      r.r(g), r.d(g, { config: () => ey, middleware: () => eg });
      let b = null;
      function w() {
        return b || (b = y()), b;
      }
      function v(e2) {
        return `The edge runtime does not support Node.js '${e2}' module.
Learn More: https://nextjs.org/docs/messages/node-module-in-edge-runtime`;
      }
      process !== r.g.process && (process.env = r.g.process.env, r.g.process = process), Object.defineProperty(globalThis, "__import_unsupported", { value: function(e2) {
        let t2 = new Proxy(function() {
        }, { get(t3, r2) {
          if ("then" === r2) return {};
          throw Error(v(e2));
        }, construct() {
          throw Error(v(e2));
        }, apply(r2, n2, a2) {
          if ("function" == typeof a2[0]) return a2[0](t2);
          throw Error(v(e2));
        } });
        return new Proxy({}, { get: () => t2 });
      }, enumerable: false, configurable: false }), w();
      var _ = r(6416), S = r(6329);
      let E = Symbol("response"), A = Symbol("passThrough"), k = Symbol("waitUntil");
      class x {
        constructor(e2) {
          this[k] = [], this[A] = false;
        }
        respondWith(e2) {
          this[E] || (this[E] = Promise.resolve(e2));
        }
        passThroughOnException() {
          this[A] = true;
        }
        waitUntil(e2) {
          this[k].push(e2);
        }
      }
      class R extends x {
        constructor(e2) {
          super(e2.request), this.sourcePage = e2.page;
        }
        get request() {
          throw new _.qJ({ page: this.sourcePage });
        }
        respondWith() {
          throw new _.qJ({ page: this.sourcePage });
        }
      }
      var C = r(1669), O = r(8241);
      function P(e2, t2) {
        let r2 = "string" == typeof t2 ? new URL(t2) : t2, n2 = new URL(e2, t2), a2 = r2.protocol + "//" + r2.host;
        return n2.protocol + "//" + n2.host === a2 ? n2.toString().replace(a2, "") : n2.toString();
      }
      var T = r(9718);
      let j = [["RSC"], ["Next-Router-State-Tree"], ["Next-Router-Prefetch"]], I = ["__nextFallback", "__nextLocale", "__nextInferredLocaleFromDefault", "__nextDefaultLocale", "__nextIsNotFound", "_rsc"], $ = ["__nextDataReq"];
      var N = r(7862), M = r(8009), D = r(938), L = r(300);
      !function(e2) {
        e2.handleRequest = "BaseServer.handleRequest", e2.run = "BaseServer.run", e2.pipe = "BaseServer.pipe", e2.getStaticHTML = "BaseServer.getStaticHTML", e2.render = "BaseServer.render", e2.renderToResponseWithComponents = "BaseServer.renderToResponseWithComponents", e2.renderToResponse = "BaseServer.renderToResponse", e2.renderToHTML = "BaseServer.renderToHTML", e2.renderError = "BaseServer.renderError", e2.renderErrorToResponse = "BaseServer.renderErrorToResponse", e2.renderErrorToHTML = "BaseServer.renderErrorToHTML", e2.render404 = "BaseServer.render404";
      }(a || (a = {})), function(e2) {
        e2.loadDefaultErrorComponents = "LoadComponents.loadDefaultErrorComponents", e2.loadComponents = "LoadComponents.loadComponents";
      }(i || (i = {})), function(e2) {
        e2.getRequestHandler = "NextServer.getRequestHandler", e2.getServer = "NextServer.getServer", e2.getServerRequestHandler = "NextServer.getServerRequestHandler", e2.createServer = "createServer.createServer";
      }(s || (s = {})), function(e2) {
        e2.compression = "NextNodeServer.compression", e2.getBuildId = "NextNodeServer.getBuildId", e2.createComponentTree = "NextNodeServer.createComponentTree", e2.clientComponentLoading = "NextNodeServer.clientComponentLoading", e2.getLayoutOrPageModule = "NextNodeServer.getLayoutOrPageModule", e2.generateStaticRoutes = "NextNodeServer.generateStaticRoutes", e2.generateFsStaticRoutes = "NextNodeServer.generateFsStaticRoutes", e2.generatePublicRoutes = "NextNodeServer.generatePublicRoutes", e2.generateImageRoutes = "NextNodeServer.generateImageRoutes.route", e2.sendRenderResult = "NextNodeServer.sendRenderResult", e2.proxyRequest = "NextNodeServer.proxyRequest", e2.runApi = "NextNodeServer.runApi", e2.render = "NextNodeServer.render", e2.renderHTML = "NextNodeServer.renderHTML", e2.imageOptimizer = "NextNodeServer.imageOptimizer", e2.getPagePath = "NextNodeServer.getPagePath", e2.getRoutesManifest = "NextNodeServer.getRoutesManifest", e2.findPageComponents = "NextNodeServer.findPageComponents", e2.getFontManifest = "NextNodeServer.getFontManifest", e2.getServerComponentManifest = "NextNodeServer.getServerComponentManifest", e2.getRequestHandler = "NextNodeServer.getRequestHandler", e2.renderToHTML = "NextNodeServer.renderToHTML", e2.renderError = "NextNodeServer.renderError", e2.renderErrorToHTML = "NextNodeServer.renderErrorToHTML", e2.render404 = "NextNodeServer.render404", e2.startResponse = "NextNodeServer.startResponse", e2.route = "route", e2.onProxyReq = "onProxyReq", e2.apiResolver = "apiResolver", e2.internalFetch = "internalFetch";
      }(o || (o = {})), (l || (l = {})).startServer = "startServer.startServer", function(e2) {
        e2.getServerSideProps = "Render.getServerSideProps", e2.getStaticProps = "Render.getStaticProps", e2.renderToString = "Render.renderToString", e2.renderDocument = "Render.renderDocument", e2.createBodyResult = "Render.createBodyResult";
      }(c || (c = {})), function(e2) {
        e2.renderToString = "AppRender.renderToString", e2.renderToReadableStream = "AppRender.renderToReadableStream", e2.getBodyResult = "AppRender.getBodyResult", e2.fetch = "AppRender.fetch";
      }(u || (u = {})), (d || (d = {})).executeRoute = "Router.executeRoute", (p || (p = {})).runHandler = "Node.runHandler", (h || (h = {})).runHandler = "AppRouteRouteHandlers.runHandler", function(e2) {
        e2.generateMetadata = "ResolveMetadata.generateMetadata", e2.generateViewport = "ResolveMetadata.generateViewport";
      }(f || (f = {})), (m || (m = {})).execute = "Middleware.execute";
      let H = ["Middleware.execute", "BaseServer.handleRequest", "Render.getServerSideProps", "Render.getStaticProps", "AppRender.fetch", "AppRender.getBodyResult", "Render.renderDocument", "Node.runHandler", "AppRouteRouteHandlers.runHandler", "ResolveMetadata.generateMetadata", "ResolveMetadata.generateViewport", "NextNodeServer.createComponentTree", "NextNodeServer.findPageComponents", "NextNodeServer.getLayoutOrPageModule", "NextNodeServer.startResponse", "NextNodeServer.clientComponentLoading"], U = ["NextNodeServer.findPageComponents", "NextNodeServer.createComponentTree", "NextNodeServer.clientComponentLoading"], { context: q, propagation: K, trace: W, SpanStatusCode: F, SpanKind: J, ROOT_CONTEXT: z } = n = r(8439), B = (e2) => null !== e2 && "object" == typeof e2 && "function" == typeof e2.then, G = (e2, t2) => {
        (null == t2 ? void 0 : t2.bubble) === true ? e2.setAttribute("next.bubble", true) : (t2 && e2.recordException(t2), e2.setStatus({ code: F.ERROR, message: null == t2 ? void 0 : t2.message })), e2.end();
      }, V = /* @__PURE__ */ new Map(), X = n.createContextKey("next.rootSpanId"), Y = 0, Z = () => Y++;
      class Q {
        getTracerInstance() {
          return W.getTracer("next.js", "0.0.1");
        }
        getContext() {
          return q;
        }
        getActiveScopeSpan() {
          return W.getSpan(null == q ? void 0 : q.active());
        }
        withPropagatedContext(e2, t2, r2) {
          let n2 = q.active();
          if (W.getSpanContext(n2)) return t2();
          let a2 = K.extract(n2, e2, r2);
          return q.with(a2, t2);
        }
        trace(...e2) {
          var t2;
          let [r2, n2, a2] = e2, { fn: i2, options: s2 } = "function" == typeof n2 ? { fn: n2, options: {} } : { fn: a2, options: { ...n2 } }, o2 = s2.spanName ?? r2;
          if (!H.includes(r2) && "1" !== process.env.NEXT_OTEL_VERBOSE || s2.hideSpan) return i2();
          let l2 = this.getSpanContext((null == s2 ? void 0 : s2.parentSpan) ?? this.getActiveScopeSpan()), c2 = false;
          l2 ? (null == (t2 = W.getSpanContext(l2)) ? void 0 : t2.isRemote) && (c2 = true) : (l2 = (null == q ? void 0 : q.active()) ?? z, c2 = true);
          let u2 = Z();
          return s2.attributes = { "next.span_name": o2, "next.span_type": r2, ...s2.attributes }, q.with(l2.setValue(X, u2), () => this.getTracerInstance().startActiveSpan(o2, s2, (e3) => {
            let t3 = "performance" in globalThis ? globalThis.performance.now() : void 0, n3 = () => {
              V.delete(u2), t3 && process.env.NEXT_OTEL_PERFORMANCE_PREFIX && U.includes(r2 || "") && performance.measure(`${process.env.NEXT_OTEL_PERFORMANCE_PREFIX}:next-${(r2.split(".").pop() || "").replace(/[A-Z]/g, (e4) => "-" + e4.toLowerCase())}`, { start: t3, end: performance.now() });
            };
            c2 && V.set(u2, new Map(Object.entries(s2.attributes ?? {})));
            try {
              if (i2.length > 1) return i2(e3, (t5) => G(e3, t5));
              let t4 = i2(e3);
              if (B(t4)) return t4.then((t5) => (e3.end(), t5)).catch((t5) => {
                throw G(e3, t5), t5;
              }).finally(n3);
              return e3.end(), n3(), t4;
            } catch (t4) {
              throw G(e3, t4), n3(), t4;
            }
          }));
        }
        wrap(...e2) {
          let t2 = this, [r2, n2, a2] = 3 === e2.length ? e2 : [e2[0], {}, e2[1]];
          return H.includes(r2) || "1" === process.env.NEXT_OTEL_VERBOSE ? function() {
            let e3 = n2;
            "function" == typeof e3 && "function" == typeof a2 && (e3 = e3.apply(this, arguments));
            let i2 = arguments.length - 1, s2 = arguments[i2];
            if ("function" != typeof s2) return t2.trace(r2, e3, () => a2.apply(this, arguments));
            {
              let n3 = t2.getContext().bind(q.active(), s2);
              return t2.trace(r2, e3, (e4, t3) => (arguments[i2] = function(e5) {
                return null == t3 || t3(e5), n3.apply(this, arguments);
              }, a2.apply(this, arguments)));
            }
          } : a2;
        }
        startSpan(...e2) {
          let [t2, r2] = e2, n2 = this.getSpanContext((null == r2 ? void 0 : r2.parentSpan) ?? this.getActiveScopeSpan());
          return this.getTracerInstance().startSpan(t2, r2, n2);
        }
        getSpanContext(e2) {
          return e2 ? W.setSpan(q.active(), e2) : void 0;
        }
        getRootSpanAttributes() {
          let e2 = q.active().getValue(X);
          return V.get(e2);
        }
      }
      let ee = (() => {
        let e2 = new Q();
        return () => e2;
      })(), et = "__prerender_bypass";
      Symbol("__next_preview_data"), Symbol(et);
      class er {
        constructor(e2, t2, r2, n2) {
          var a2;
          let i2 = e2 && function(e3, t3) {
            let r3 = N.h.from(e3.headers);
            return { isOnDemandRevalidate: r3.get(L.y3) === t3.previewModeId, revalidateOnlyGenerated: r3.has(L.Qq) };
          }(t2, e2).isOnDemandRevalidate, s2 = null == (a2 = r2.get(et)) ? void 0 : a2.value;
          this.isEnabled = !!(!i2 && s2 && e2 && s2 === e2.previewModeId), this._previewModeId = null == e2 ? void 0 : e2.previewModeId, this._mutableCookies = n2;
        }
        enable() {
          if (!this._previewModeId) throw Error("Invariant: previewProps missing previewModeId this should never happen");
          this._mutableCookies.set({ name: et, value: this._previewModeId, httpOnly: true, sameSite: "none", secure: true, path: "/" });
        }
        disable() {
          this._mutableCookies.set({ name: et, value: "", httpOnly: true, sameSite: "none", secure: true, path: "/", expires: /* @__PURE__ */ new Date(0) });
        }
      }
      function en(e2, t2) {
        if ("x-middleware-set-cookie" in e2.headers && "string" == typeof e2.headers["x-middleware-set-cookie"]) {
          let r2 = e2.headers["x-middleware-set-cookie"], n2 = new Headers();
          for (let e3 of (0, S.l$)(r2)) n2.append("set-cookie", e3);
          for (let e3 of new D.nV(n2).getAll()) t2.set(e3);
        }
      }
      let ea = { wrap(e2, { req: t2, res: r2, renderOpts: n2 }, a2) {
        let i2;
        function s2(e3) {
          r2 && r2.setHeader("Set-Cookie", e3);
        }
        n2 && "previewProps" in n2 && (i2 = n2.previewProps);
        let o2 = {}, l2 = { get headers() {
          return o2.headers || (o2.headers = function(e3) {
            let t3 = N.h.from(e3);
            for (let e4 of j) t3.delete(e4.toString().toLowerCase());
            return N.h.seal(t3);
          }(t2.headers)), o2.headers;
        }, get cookies() {
          if (!o2.cookies) {
            let e3 = new D.qC(N.h.from(t2.headers));
            en(t2, e3), o2.cookies = M.Qb.seal(e3);
          }
          return o2.cookies;
        }, get mutableCookies() {
          if (!o2.mutableCookies) {
            let e3 = function(e4, t3) {
              let r3 = new D.qC(N.h.from(e4));
              return M.vr.wrap(r3, t3);
            }(t2.headers, (null == n2 ? void 0 : n2.onUpdateCookies) || (r2 ? s2 : void 0));
            en(t2, e3), o2.mutableCookies = e3;
          }
          return o2.mutableCookies;
        }, get draftMode() {
          return o2.draftMode || (o2.draftMode = new er(i2, t2, this.cookies, this.mutableCookies)), o2.draftMode;
        }, reactLoadableManifest: (null == n2 ? void 0 : n2.reactLoadableManifest) || {}, assetPrefix: (null == n2 ? void 0 : n2.assetPrefix) || "" };
        return e2.run(l2, a2, l2);
      } };
      var ei = r(1053);
      function es() {
        return { previewModeId: process.env.__NEXT_PREVIEW_MODE_ID, previewModeSigningKey: process.env.__NEXT_PREVIEW_MODE_SIGNING_KEY || "", previewModeEncryptionKey: process.env.__NEXT_PREVIEW_MODE_ENCRYPTION_KEY || "" };
      }
      class eo extends C.I {
        constructor(e2) {
          super(e2.input, e2.init), this.sourcePage = e2.page;
        }
        get request() {
          throw new _.qJ({ page: this.sourcePage });
        }
        respondWith() {
          throw new _.qJ({ page: this.sourcePage });
        }
        waitUntil() {
          throw new _.qJ({ page: this.sourcePage });
        }
      }
      let el = { keys: (e2) => Array.from(e2.keys()), get: (e2, t2) => e2.get(t2) ?? void 0 }, ec = (e2, t2) => ee().withPropagatedContext(e2.headers, t2, el), eu = false;
      async function ed(e2) {
        let t2, n2;
        !function() {
          if (!eu && (eu = true, "true" === process.env.NEXT_PRIVATE_TEST_PROXY)) {
            let { interceptTestApis: e3, wrapRequestHandler: t3 } = r(4177);
            e3(), ec = t3(ec);
          }
        }(), await w();
        let a2 = void 0 !== self.__BUILD_MANIFEST;
        e2.request.url = e2.request.url.replace(/\.rsc($|\?)/, "$1");
        let i2 = new T.c(e2.request.url, { headers: e2.request.headers, nextConfig: e2.request.nextConfig });
        for (let e3 of [...i2.searchParams.keys()]) {
          let t3 = i2.searchParams.getAll(e3);
          (0, S.LI)(e3, (r2) => {
            for (let e4 of (i2.searchParams.delete(r2), t3)) i2.searchParams.append(r2, e4);
            i2.searchParams.delete(e3);
          });
        }
        i2.buildId, i2.buildId = "";
        let s2 = e2.request.headers["x-nextjs-data"];
        s2 && "/index" === i2.pathname && (i2.pathname = "/");
        let o2 = (0, S.EK)(e2.request.headers), l2 = /* @__PURE__ */ new Map();
        if (!a2) for (let e3 of j) {
          let t3 = e3.toString().toLowerCase();
          o2.get(t3) && (l2.set(t3, o2.get(t3)), o2.delete(t3));
        }
        let c2 = new URL(e2.request.url), u2 = new eo({ page: e2.page, input: function(e3, t3) {
          let r2 = "string" == typeof e3, n3 = r2 ? new URL(e3) : e3;
          for (let e4 of I) n3.searchParams.delete(e4);
          if (t3) for (let e4 of $) n3.searchParams.delete(e4);
          return r2 ? n3.toString() : n3;
        }(c2, true).toString(), init: { body: e2.request.body, geo: e2.request.geo, headers: o2, ip: e2.request.ip, method: e2.request.method, nextConfig: e2.request.nextConfig, signal: e2.request.signal } });
        s2 && Object.defineProperty(u2, "__isData", { enumerable: false, value: true }), !globalThis.__incrementalCacheShared && e2.IncrementalCache && (globalThis.__incrementalCache = new e2.IncrementalCache({ appDir: true, fetchCache: true, minimalMode: true, fetchCacheKeyPrefix: "", dev: false, requestHeaders: e2.request.headers, requestProtocol: "https", getPrerenderManifest: () => ({ version: -1, routes: {}, dynamicRoutes: {}, notFoundRoutes: [], preview: es() }) }));
        let d2 = new R({ request: u2, page: e2.page });
        if ((t2 = await ec(u2, () => "/middleware" === e2.page || "/src/middleware" === e2.page ? ee().trace(m.execute, { spanName: `middleware ${u2.method} ${u2.nextUrl.pathname}`, attributes: { "http.target": u2.nextUrl.pathname, "http.method": u2.method } }, () => ea.wrap(ei.O, { req: u2, renderOpts: { onUpdateCookies: (e3) => {
          n2 = e3;
        }, previewProps: es() } }, () => e2.handler(u2, d2))) : e2.handler(u2, d2))) && !(t2 instanceof Response)) throw TypeError("Expected an instance of Response to be returned");
        t2 && n2 && t2.headers.set("set-cookie", n2);
        let p2 = null == t2 ? void 0 : t2.headers.get("x-middleware-rewrite");
        if (t2 && p2 && !a2) {
          let r2 = P(String(new T.c(p2, { forceLocale: true, headers: e2.request.headers, nextConfig: e2.request.nextConfig })), String(i2));
          s2 && t2.headers.set("x-nextjs-rewrite", r2);
        }
        let h2 = null == t2 ? void 0 : t2.headers.get("Location");
        if (t2 && h2 && !a2) {
          let r2 = new T.c(h2, { forceLocale: false, headers: e2.request.headers, nextConfig: e2.request.nextConfig });
          t2 = new Response(t2.body, t2), s2 && (t2.headers.delete("Location"), t2.headers.set("x-nextjs-redirect", P(String(r2), String(i2))));
        }
        let f2 = t2 || O.x.next(), g2 = f2.headers.get("x-middleware-override-headers"), y2 = [];
        if (g2) {
          for (let [e3, t3] of l2) f2.headers.set(`x-middleware-request-${e3}`, t3), y2.push(e3);
          y2.length > 0 && f2.headers.set("x-middleware-override-headers", g2 + "," + y2.join(","));
        }
        return { response: f2, waitUntil: Promise.all(d2[k]), fetchMetrics: u2.fetchMetrics };
      }
      var ep = r(4635), eh = r(5647);
      let ef = ["/dashboard", "/accounts", "/transactions", "/budgets", "/goals", "/categories", "/recurring", "/reports", "/insights", "/export", "/settings", "/categorize"], em = ["/", "/login", "/signup", "/pricing", "/about", "/contact", "/demo"];
      async function eg(e2) {
        let { pathname: t2 } = e2.nextUrl;
        if (t2.startsWith("/api/") || t2.startsWith("/_next/") || t2.includes(".") || t2.startsWith("/favicon") || em.some((e3) => t2 === e3)) return ep.NextResponse.next();
        if (ef.some((e3) => t2 === e3 || t2.startsWith(`${e3}/`))) try {
          let r2 = ep.NextResponse.next(), n2 = await (0, eh.getSession)(e2, r2);
          if (!n2?.user) {
            let r3 = new URL("/api/auth/login", e2.url);
            return r3.searchParams.set("returnTo", t2), ep.NextResponse.redirect(r3);
          }
        } catch (n2) {
          let r2 = new URL("/api/auth/login", e2.url);
          return r2.searchParams.set("returnTo", t2), ep.NextResponse.redirect(r2);
        }
        return ep.NextResponse.next();
      }
      let ey = { matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"] }, eb = { ...g }, ew = eb.middleware || eb.default, ev = "/src/middleware";
      if ("function" != typeof ew) throw Error(`The Middleware "${ev}" must export a \`middleware\` or a \`default\` function`);
      function e_(e2) {
        return ed({ ...e2, page: ev, handler: ew });
      }
    }, 7929: (e, t) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: true }), t.AbstractClient = void 0;
      class r {
        constructor(e2, t2) {
          this.config = e2, this.telemetry = t2;
        }
      }
      t.AbstractClient = r;
    }, 9079: (e, t, r) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: true }), t.clientGetter = t.EdgeClient = void 0;
      let n = r(2397), a = n.__importStar(r(8053)), i = n.__importStar(r(9507)), s = r(7929), o = r(6611), l = r(7447), c = n.__importDefault(r(6650)), u = (e2) => {
        let t2 = new TextEncoder().encode(e2), r2 = [];
        for (let e3 = 0; e3 < t2.length; e3 += 32768) r2.push(String.fromCharCode.apply(null, t2.subarray(e3, e3 + 32768)));
        return btoa(r2.join(""));
      };
      class d extends s.AbstractClient {
        constructor(e2, t2) {
          if (super(e2, t2), this.config = e2, this.telemetry = t2, "code" !== e2.authorizationParams.response_type) throw Error("This SDK only supports `response_type=code` when used in an Edge runtime.");
          this.httpOptions = () => {
            let r2 = new Headers();
            if (e2.enableTelemetry) {
              let { name: e3, version: n2 } = t2;
              r2.set("User-Agent", `${e3}/${n2}`), r2.set("Auth0-Client", u(JSON.stringify({ name: e3, version: n2, env: { edge: true } })));
            }
            return { signal: AbortSignal.timeout(this.config.httpTimeout), headers: r2 };
          };
        }
        async getClient() {
          if (this.as) return [this.as, this.client];
          let e2 = new URL(this.config.issuerBaseURL);
          try {
            this.as = await a.discoveryRequest(e2, this.httpOptions()).then((t2) => a.processDiscoveryResponse(e2, t2));
          } catch (e3) {
            throw new o.DiscoveryError(e3, this.config.issuerBaseURL);
          }
          if (this.config.pushedAuthorizationRequests && !this.as.pushed_authorization_request_endpoint) throw TypeError("pushed_authorization_request_endpoint must be configured on the issuer to use pushedAuthorizationRequests");
          return this.client = Object.assign(Object.assign({ client_id: this.config.clientID }, !this.config.clientAssertionSigningKey && { client_secret: this.config.clientSecret }), { token_endpoint_auth_method: this.config.clientAuthMethod, id_token_signed_response_alg: this.config.idTokenSigningAlg, [a.clockTolerance]: this.config.clockTolerance }), [this.as, this.client];
        }
        async authorizationUrl(e2) {
          let [t2, r2] = await this.getClient();
          if (this.config.pushedAuthorizationRequests) {
            let { clientAssertionSigningKey: n3, clientAssertionSigningAlg: s2 } = this.config, l2 = n3;
            !l2 || l2 instanceof CryptoKey || (l2 = await i.importPKCS8(l2, s2 || "RS256"));
            let c2 = await a.pushedAuthorizationRequest(t2, r2, e2, Object.assign(Object.assign({}, l2 && { clientPrivateKey: l2, [a.modifyAssertion](e3, r3) {
              Array.isArray(r3.aud) && (r3.aud = t2.issuer);
            } }), this.httpOptions())), u2 = await a.processPushedAuthorizationResponse(t2, r2, c2);
            if (a.isOAuth2Error(u2)) throw new o.IdentityProviderError({ message: u2.error_description || u2.error, error: u2.error, error_description: u2.error_description });
            e2 = { request_uri: u2.request_uri };
          }
          let n2 = new URL(t2.authorization_endpoint);
          return n2.searchParams.set("client_id", this.config.clientID), Object.entries(e2).forEach(([e3, t3]) => {
            null != t3 && n2.searchParams.set(e3, String(t3));
          }), n2.toString();
        }
        async callbackParams(e2, t2) {
          let r2;
          let [n2, i2] = await this.getClient(), s2 = "GET" === e2.getMethod().toUpperCase() ? new URL(e2.getUrl()) : new URLSearchParams(await e2.getBody());
          try {
            r2 = a.validateAuthResponse(n2, i2, s2, t2);
          } catch (e3) {
            throw new o.ApplicationError(e3);
          }
          if (a.isOAuth2Error(r2)) throw new o.IdentityProviderError({ message: r2.error_description || r2.error, error: r2.error, error_description: r2.error_description });
          return r2;
        }
        async callback(e2, t2, r2, n2) {
          let [s2, l2] = await this.getClient(), { clientAssertionSigningKey: c2, clientAssertionSigningAlg: u2 } = this.config, d2 = c2;
          !d2 || d2 instanceof CryptoKey || (d2 = await i.importPKCS8(d2, u2 || "RS256"));
          let p = await a.authorizationCodeGrantRequest(s2, l2, t2, e2, r2.code_verifier, Object.assign(Object.assign({ additionalParameters: n2.exchangeBody }, d2 && { clientPrivateKey: d2, [a.modifyAssertion](e3, t3) {
            Array.isArray(t3.aud) && (t3.aud = s2.issuer);
          } }), this.httpOptions())), h = await a.processAuthorizationCodeOpenIDResponse(s2, l2, p, r2.nonce, r2.max_age);
          if (a.isOAuth2Error(h)) throw new o.IdentityProviderError({ message: h.error_description || h.error, error: h.error, error_description: h.error_description });
          return h;
        }
        async endSessionUrl(e2) {
          let [t2] = await this.getClient(), r2 = new URL(t2.issuer);
          if (this.config.idpLogout && (this.config.auth0Logout || r2.hostname.match("\\.auth0\\.com$") && false !== this.config.auth0Logout)) {
            let { post_logout_redirect_uri: r3 } = e2, a3 = n.__rest(e2, ["post_logout_redirect_uri"]), i2 = new URL((0, c.default)(t2.issuer, "/v2/logout"));
            return r3 && i2.searchParams.set("returnTo", r3), i2.searchParams.set("client_id", this.config.clientID), Object.entries(a3).forEach(([e3, t3]) => {
              null != t3 && i2.searchParams.set(e3, t3);
            }), i2.toString();
          }
          if (!t2.end_session_endpoint) throw Error("RP Initiated Logout is not supported on your Authorization Server.");
          let a2 = new URL(t2.end_session_endpoint);
          return Object.entries(e2).forEach(([e3, t3]) => {
            null != t3 && a2.searchParams.set(e3, t3);
          }), a2.searchParams.set("client_id", this.config.clientID), a2.toString();
        }
        async userinfo(e2) {
          let [t2, r2] = await this.getClient(), n2 = await a.userInfoRequest(t2, r2, e2, this.httpOptions());
          try {
            return await a.processUserInfoResponse(t2, r2, a.skipSubjectCheck, n2);
          } catch (e3) {
            throw new o.UserInfoError(e3.message);
          }
        }
        async refresh(e2, t2) {
          let [r2, n2] = await this.getClient(), { clientAssertionSigningKey: s2, clientAssertionSigningAlg: c2 } = this.config, u2 = s2;
          !u2 || u2 instanceof CryptoKey || (u2 = await i.importPKCS8(u2, c2 || "RS256"));
          let d2 = await a.refreshTokenGrantRequest(r2, n2, e2, Object.assign(Object.assign({ additionalParameters: t2.exchangeBody }, u2 && { clientPrivateKey: u2, [a.modifyAssertion](e3, t3) {
            Array.isArray(t3.aud) && (t3.aud = r2.issuer);
          } }), this.httpOptions())), p = await a.processRefreshTokenResponse(r2, n2, d2);
          if (a.isOAuth2Error(p)) throw new l.AccessTokenError(l.AccessTokenErrorCode.FAILED_REFRESH_GRANT, "The request to refresh the access token failed.", new o.IdentityProviderError({ message: p.error_description || p.error, error: p.error, error_description: p.error_description }));
          return p;
        }
        generateRandomCodeVerifier() {
          return a.generateRandomCodeVerifier();
        }
        generateRandomNonce() {
          return a.generateRandomNonce();
        }
        calculateCodeChallenge(e2) {
          return a.calculatePKCECodeChallenge(e2);
        }
        async getIssuerMetadata() {
          let [e2] = await this.getClient();
          return e2;
        }
      }
      t.EdgeClient = d, t.clientGetter = (e2) => {
        let t2;
        return async (r2) => (t2 || (t2 = new d(r2, e2)), t2);
      };
    }, 3610: (e, t, r) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: true }), t.get = void 0;
      let n = r(2397).__importDefault(r(2343)), a = r(583), i = /^https:/i, s = n.default.object({ secret: n.default.alternatives([n.default.string().min(8), n.default.array().items(n.default.string().min(8))]).required(), session: n.default.object({ rolling: n.default.boolean().optional().default(true), rollingDuration: n.default.when(n.default.ref("rolling"), { is: true, then: n.default.number().integer().messages({ "number.base": '"session.rollingDuration" must be provided an integer value when "session.rolling" is true' }), otherwise: n.default.boolean().valid(false).messages({ "any.only": '"session.rollingDuration" must be false when "session.rolling" is disabled' }) }).optional().default((e2) => !!e2.rolling && 86400), absoluteDuration: n.default.when(n.default.ref("rolling"), { is: false, then: n.default.number().integer().messages({ "number.base": '"session.absoluteDuration" must be provided an integer value when "session.rolling" is false' }), otherwise: n.default.alternatives([n.default.number().integer(), n.default.boolean().valid(false)]) }).optional().default(604800), autoSave: n.default.boolean().optional().default(true), name: n.default.string().token().optional().default("appSession"), store: n.default.object().optional().when(n.default.ref("/backchannelLogout"), { not: false, then: n.default.when("/backchannelLogout.store", { not: n.default.exist(), then: n.default.object().required().messages({ "any.required": 'Back-Channel Logout requires a "backchannelLogout.store" (you can also reuse "session.store" if you have stateful sessions).' }) }) }), genId: n.default.function().maxArity(2).when(n.default.ref("store"), { then: n.default.required() }), storeIDToken: n.default.boolean().optional().default(true), cookie: n.default.object({ domain: n.default.string().optional(), transient: n.default.boolean().optional().default(false), httpOnly: n.default.boolean().optional().default(true), sameSite: n.default.string().valid("lax", "strict", "none").optional().default("lax"), secure: n.default.when(n.default.ref("/baseURL"), { is: n.default.string().pattern(i), then: n.default.boolean().valid(true).default(true).messages({ "any.only": "Cookies must be secure when base url is https." }), otherwise: n.default.boolean().valid(false).default(false).messages({ "any.only": "Cookies set with the `Secure` property wont be attached to http requests" }) }), path: n.default.string().uri({ relativeOnly: true }).optional() }).default().unknown(false) }).default().unknown(false), auth0Logout: n.default.boolean().optional(), authorizationParams: n.default.object({ response_type: n.default.string().optional().valid("id_token", "code id_token", "code").default("id_token"), scope: n.default.string().optional().pattern(/\bopenid\b/, "contains openid").default("openid profile email"), response_mode: n.default.string().optional().when("response_type", { is: "code", then: n.default.valid("query", "form_post"), otherwise: n.default.valid("form_post").default("form_post") }) }).optional().unknown(true).default(), baseURL: n.default.string().uri().required().when(n.default.ref("authorizationParams.response_mode"), { is: "form_post", then: n.default.string().pattern(i).rule({ warn: true, message: "Using 'form_post' for response_mode may cause issues for you logging in over http, see https://github.com/auth0/express-openid-connect/blob/master/FAQ.md" }) }), clientID: n.default.string().required(), clientSecret: n.default.string().when(n.default.ref("clientAuthMethod", { adjust: (e2) => e2 && e2.includes("client_secret") }), { is: true, then: n.default.string().required().messages({ "any.required": '"clientSecret" is required for the clientAuthMethod {{clientAuthMethod}}' }) }).when(n.default.ref("idTokenSigningAlg", { adjust: (e2) => e2 && e2.startsWith("HS") }), { is: true, then: n.default.string().required().messages({ "any.required": '"clientSecret" is required for ID tokens with HMAC based algorithms' }) }), clockTolerance: n.default.number().optional().default(60), httpTimeout: n.default.number().optional().default(5e3), httpAgent: n.default.object().optional(), enableTelemetry: n.default.boolean().optional().default(true), getLoginState: n.default.function().optional().default(() => a.getLoginState), identityClaimFilter: n.default.array().optional().default(["aud", "iss", "iat", "exp", "nbf", "nonce", "azp", "auth_time", "s_hash", "at_hash", "c_hash"]), idpLogout: n.default.boolean().optional().default((e2) => e2.auth0Logout || false), idTokenSigningAlg: n.default.string().insensitive().not("none").optional().default("RS256"), issuerBaseURL: n.default.string().uri().required(), legacySameSiteCookie: n.default.boolean().optional().default(true), routes: n.default.object({ callback: n.default.string().uri({ relativeOnly: true }).required(), postLogoutRedirect: n.default.string().uri({ allowRelative: true }).default("") }).default().unknown(false), clientAuthMethod: n.default.string().valid("client_secret_basic", "client_secret_post", "client_secret_jwt", "private_key_jwt", "none").optional().default((e2) => "id_token" !== e2.authorizationParams.response_type || e2.pushedAuthorizationRequests ? e2.clientAssertionSigningKey ? "private_key_jwt" : "client_secret_basic" : "none").when(n.default.ref("authorizationParams.response_type", { adjust: (e2) => e2 && e2.includes("code") }), { is: true, then: n.default.string().invalid("none").messages({ "any.only": "Public code flow clients are not supported." }) }).when(n.default.ref("pushedAuthorizationRequests"), { is: true, then: n.default.string().invalid("none").messages({ "any.only": "Public PAR clients are not supported" }) }), clientAssertionSigningKey: n.default.any().optional().when(n.default.ref("clientAuthMethod"), { is: "private_key_jwt", then: n.default.any().required().messages({ "any.required": '"clientAssertionSigningKey" is required for a "clientAuthMethod" of "private_key_jwt"' }) }), clientAssertionSigningAlg: n.default.string().optional().valid("RS256", "RS384", "RS512", "PS256", "PS384", "PS512", "ES256", "ES256K", "ES384", "ES512", "EdDSA"), transactionCookie: n.default.object({ name: n.default.string().default("auth_verification"), domain: n.default.string().default(n.default.ref("/session.cookie.domain")), secure: n.default.boolean().default(n.default.ref("/session.cookie.secure")), sameSite: n.default.string().valid("lax", "strict", "none").default(n.default.ref("/session.cookie.sameSite")), path: n.default.string().uri({ relativeOnly: true }).default(n.default.ref("/session.cookie.transient")) }).default().unknown(false), backchannelLogout: n.default.alternatives([n.default.object({ store: n.default.object().optional() }), n.default.boolean()]).default(false), pushedAuthorizationRequests: n.default.boolean().optional().default(false) });
      t.get = (e2 = {}) => {
        let { value: t2, error: r2, warning: n2 } = s.validate(e2, { allowUnknown: true });
        if (r2) throw TypeError(r2.details[0].message);
        return n2 && console.warn(n2.message), t2;
      };
    }, 3774: (e, t, r) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: true }), t.deleteSub = t.isLoggedOut = void 0;
      let n = r(2397).__importDefault(r(1099)), a = r(6611), i = (e2) => {
        let { session: { store: t2 }, backchannelLogout: r2 } = e2;
        return "boolean" == typeof r2 ? t2 : r2.store;
      };
      t.default = function(e2, t2) {
        let r2 = "function" == typeof e2 ? e2 : () => e2, s2 = (0, n.default)();
        return async (e3, n2) => {
          let o2;
          let l = await r2(e3), c = await t2(l);
          n2.setHeader("cache-control", "no-store");
          let u = new URLSearchParams(await e3.getBody()).get("logout_token");
          if (!u) throw new a.BackchannelLogoutError("invalid_request", "Missing Logout Token");
          try {
            o2 = await s2(u, l, await c.getIssuerMetadata());
          } catch (e4) {
            throw new a.BackchannelLogoutError("invalid_request", e4.message);
          }
          let { clientID: d, session: { absoluteDuration: p, rolling: h, rollingDuration: f } } = l, m = i(l), g = (h ? Math.min(p, f) : p) * 1e3, y = Date.now() / 1e3 | 0, b = { header: { iat: y, uat: y, exp: y + g, maxAge: g }, data: {} };
          try {
            let { sid: e4, sub: t3 } = o2;
            await Promise.all([e4 && m.set(`sid|${d}|${e4}`, b), t3 && m.set(`sub|${d}|${t3}`, b)]);
          } catch (e4) {
            throw new a.BackchannelLogoutError("application_error", e4.message);
          }
          n2.send204();
        };
      };
      let s = async (e2, t2) => {
        let { clientID: r2 } = t2, n2 = i(t2), { sid: a2, sub: s2 } = e2, [o2, l] = await Promise.all([n2.get(`sid|${r2}|${a2}`), n2.get(`sub|${r2}|${s2}`)]);
        return !!(o2 || l);
      };
      t.isLoggedOut = s;
      let o = async (e2, t2) => {
        let { clientID: r2 } = t2, n2 = i(t2);
        await n2.delete(`sub|${r2}|${e2}`);
      };
      t.deleteSub = o;
    }, 5016: (e, t, r) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: true });
      let n = r(2397).__importDefault(r(6650)), a = r(4991), i = r(6611);
      t.default = function(e2, t2, r2, s) {
        let o = "function" == typeof e2 ? e2 : () => e2;
        return async (e3, l, c) => {
          let u, d, p;
          let h = await o(e3), f = await t2(h), m = (null == c ? void 0 : c.redirectUri) || (0, n.default)(h.baseURL, h.routes.callback), g = await s.read(h.transactionCookie.name, e3, l);
          if (!g) throw new i.MissingStateCookieError();
          try {
            d = JSON.parse(g);
          } catch (e4) {
            throw new i.MalformedStateCookieError();
          }
          let { max_age: y, code_verifier: b, nonce: w, state: v, response_type: _ = h.authorizationParams.response_type } = d;
          try {
            p = await f.callbackParams(e3, v);
          } catch (e4) {
            throw e4.status = 400, e4.statusCode = 400, e4.openIdState = (0, a.decodeState)(v), e4;
          }
          if (!p.get("state")) throw new i.MissingStateParamError();
          try {
            u = await f.callback(m, p, { max_age: void 0 !== y ? +y : void 0, code_verifier: b, nonce: w, state: v, response_type: _ }, { exchangeBody: null == c ? void 0 : c.authorizationParams });
          } catch (e4) {
            throw e4.status = 400, e4.statusCode = 400, e4.openIdState = (0, a.decodeState)(v), e4;
          }
          let S = (0, a.decodeState)(v), E = await r2.fromTokenEndpointResponse(e3, l, u);
          (null == c ? void 0 : c.afterCallback) && (E = await c.afterCallback(E, S)), E && await r2.create(e3.req, l.res, E), l.redirect(S.returnTo || h.baseURL);
        };
      };
    }, 3658: (e, t, r) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: true });
      let n = r(2397), a = n.__importDefault(r(6650)), i = r(4991), s = (0, n.__importDefault(r(9705)).default)("handlers");
      t.default = function(e2, t2, r2) {
        let n2 = "function" == typeof e2 ? e2 : () => e2;
        return async (e3, o, l = {}) => {
          let c = await n2(e3), u = await t2(c), d = Object.assign({ returnTo: l.returnTo || c.baseURL, getLoginState: c.getLoginState }, l);
          d.authorizationParams = Object.assign(Object.assign({ redirect_uri: (0, a.default)(c.baseURL, c.routes.callback) }, c.authorizationParams), d.authorizationParams || {});
          let p = await d.getLoginState(d);
          if ("object" != typeof p) throw Error("Custom state value must be an object.");
          p.nonce = u.generateRandomNonce(), p.returnTo = p.returnTo || d.returnTo;
          let h = d.authorizationParams.response_type, f = h.includes("code");
          f && (s("response_type includes code, the authorization request will use PKCE"), p.code_verifier = u.generateRandomCodeVerifier());
          let m = ["id_token", "code id_token", "code"];
          if (!m.includes(h)) throw Error(`response_type should be one of ${m.join(", ")}`);
          if (!/\bopenid\b/.test(d.authorizationParams.scope)) throw Error('scope should contain "openid"');
          let g = { nonce: u.generateRandomNonce(), state: (0, i.encodeState)(p) };
          d.authorizationParams.max_age && (g.max_age = d.authorizationParams.max_age);
          let y = Object.assign(Object.assign({}, d.authorizationParams), g);
          f && (g.code_verifier = u.generateRandomCodeVerifier(), y.code_challenge_method = "S256", y.code_challenge = await u.calculateCodeChallenge(g.code_verifier)), h !== c.authorizationParams.response_type && (g.response_type = h), await r2.save(c.transactionCookie.name, e3, o, { sameSite: "form_post" === y.response_mode ? "none" : c.transactionCookie.sameSite, value: JSON.stringify(g) });
          let b = await u.authorizationUrl(y);
          s("redirecting to %s", b), o.redirect(b);
        };
      };
    }, 3089: (e, t, r) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: true });
      let n = r(2397), a = n.__importDefault(r(6650)), i = (0, n.__importDefault(r(9705)).default)("logout");
      t.default = function(e2, t2, r2) {
        let n2 = "function" == typeof e2 ? e2 : () => e2;
        return async (e3, s, o = {}) => {
          let l = await n2(e3), c = await t2(l), u = o.returnTo || l.routes.postLogoutRedirect;
          i("logout() with return url: %s", u);
          try {
            new URL(u);
          } catch (e4) {
            u = (0, a.default)(l.baseURL, u);
          }
          if (!await r2.isAuthenticated(e3.req, s.res)) {
            i("end-user already logged out, redirecting to %s", u), s.redirect(u);
            return;
          }
          let d = await r2.getIdToken(e3.req, s.res);
          if (await r2.delete(e3.req, s.res), !l.idpLogout) {
            i("performing a local only logout, redirecting to %s", u), s.redirect(u);
            return;
          }
          i("logging out of identity provider, redirecting to %s", u = await c.endSessionUrl(Object.assign(Object.assign({}, o.logoutParams), { post_logout_redirect_uri: u, id_token_hint: d }))), s.redirect(u);
        };
      };
    }, 583: (e, t, r) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: true }), t.getLoginState = void 0;
      let n = (0, r(2397).__importDefault(r(9705)).default)("get-login-state");
      t.getLoginState = (e2) => {
        let t2 = { returnTo: e2.returnTo };
        return n("adding default state %O", t2), t2;
      };
    }, 4462: (e, t) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: true });
      class r {
      }
      t.default = r;
    }, 1303: (e, t, r) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: true });
      let n = r(2397).__importDefault(r(4462));
      class a extends n.default {
        constructor(e2) {
          super(), this.req = e2;
        }
      }
      t.default = a;
    }, 3012: (e, t) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: true });
      class r {
        clearCookie(e2, t2 = {}) {
          let { domain: r2, path: n, secure: a, sameSite: i } = t2, s = { domain: r2, path: n, maxAge: 0 };
          "none" === i && (s.secure = a, s.sameSite = i), this.setCookie(e2, "", s);
        }
      }
      t.default = r;
    }, 1388: (e, t, r) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: true });
      let n = r(2397).__importDefault(r(3012));
      class a extends n.default {
        constructor(e2) {
          super(), this.res = e2;
        }
      }
      t.default = a;
    }, 276: function(e, t, r) {
      "use strict";
      var n = this && this.__importDefault || function(e2) {
        return e2 && e2.__esModule ? e2 : { default: e2 };
      };
      Object.defineProperty(t, "__esModule", { value: true }), t.NodeResponse = t.NodeRequest = t.Auth0ResponseCookies = t.Auth0RequestCookies = t.Auth0Response = t.Auth0Request = void 0;
      var a = r(1303);
      Object.defineProperty(t, "Auth0Request", { enumerable: true, get: function() {
        return n(a).default;
      } });
      var i = r(1388);
      Object.defineProperty(t, "Auth0Response", { enumerable: true, get: function() {
        return n(i).default;
      } });
      var s = r(4462);
      Object.defineProperty(t, "Auth0RequestCookies", { enumerable: true, get: function() {
        return n(s).default;
      } });
      var o = r(3012);
      Object.defineProperty(t, "Auth0ResponseCookies", { enumerable: true, get: function() {
        return n(o).default;
      } });
      var l = r(8461);
      Object.defineProperty(t, "NodeRequest", { enumerable: true, get: function() {
        return n(l).default;
      } });
      var c = r(8497);
      Object.defineProperty(t, "NodeResponse", { enumerable: true, get: function() {
        return n(c).default;
      } });
    }, 8461: (e, t, r) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: true });
      let n = r(2397), a = r(1250), i = n.__importDefault(r(1303));
      class s extends i.default {
        constructor(e2) {
          super(e2), this.req = e2;
        }
        getUrl() {
          return this.req.url;
        }
        getMethod() {
          return this.req.method;
        }
        getBody() {
          return this.req.body;
        }
        getCookies() {
          return (0, a.parse)(this.req.headers.cookie || "");
        }
      }
      t.default = s;
    }, 8497: (e, t, r) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: true });
      let n = r(2397), a = r(1250), i = n.__importDefault(r(1388)), s = r(6611);
      class o extends i.default {
        constructor(e2) {
          super(e2), this.res = e2;
        }
        setCookie(e2, t2, r2) {
          let n2 = this.res.getHeader("Set-Cookie") || [];
          Array.isArray(n2) || (n2 = [n2]), this.res.setHeader("Set-Cookie", [...n2.filter((t3) => !t3.startsWith(`${e2}=`)), (0, a.serialize)(e2, t2, r2)]);
        }
        redirect(e2, t2 = 302) {
          this.res.writableEnded || (this.res.writeHead(t2, { Location: this.res.getHeader("Location") || e2 }), this.res.end((0, s.htmlSafe)(e2)));
        }
        send204() {
          this.res.statusCode = 204, this.res.end();
        }
        setHeader(e2, t2) {
          this.res.setHeader(e2, t2);
        }
      }
      t.default = o;
    }, 7907: function(e, t, r) {
      "use strict";
      var n = this && this.__importDefault || function(e2) {
        return e2 && e2.__esModule ? e2 : { default: e2 };
      };
      Object.defineProperty(t, "__esModule", { value: true }), t.AbstractClient = t.deleteSub = t.isLoggedOut = t.backchannelLogoutHandler = t.callbackHandler = t.logoutHandler = t.loginHandler = t.getConfig = t.TransientStore = t.StatefulSession = t.AbstractSession = t.StatelessSession = t.ApplicationError = t.IdentityProviderError = t.MalformedStateCookieError = t.MissingStateCookieError = t.MissingStateParamError = void 0;
      var a = r(6611);
      Object.defineProperty(t, "MissingStateParamError", { enumerable: true, get: function() {
        return a.MissingStateParamError;
      } }), Object.defineProperty(t, "MissingStateCookieError", { enumerable: true, get: function() {
        return a.MissingStateCookieError;
      } }), Object.defineProperty(t, "MalformedStateCookieError", { enumerable: true, get: function() {
        return a.MalformedStateCookieError;
      } }), Object.defineProperty(t, "IdentityProviderError", { enumerable: true, get: function() {
        return a.IdentityProviderError;
      } }), Object.defineProperty(t, "ApplicationError", { enumerable: true, get: function() {
        return a.ApplicationError;
      } });
      var i = r(6683);
      Object.defineProperty(t, "StatelessSession", { enumerable: true, get: function() {
        return i.StatelessSession;
      } });
      var s = r(2109);
      Object.defineProperty(t, "AbstractSession", { enumerable: true, get: function() {
        return s.AbstractSession;
      } });
      var o = r(1620);
      Object.defineProperty(t, "StatefulSession", { enumerable: true, get: function() {
        return o.StatefulSession;
      } });
      var l = r(5096);
      Object.defineProperty(t, "TransientStore", { enumerable: true, get: function() {
        return n(l).default;
      } });
      var c = r(3610);
      Object.defineProperty(t, "getConfig", { enumerable: true, get: function() {
        return c.get;
      } });
      var u = r(3658);
      Object.defineProperty(t, "loginHandler", { enumerable: true, get: function() {
        return n(u).default;
      } });
      var d = r(3089);
      Object.defineProperty(t, "logoutHandler", { enumerable: true, get: function() {
        return n(d).default;
      } });
      var p = r(5016);
      Object.defineProperty(t, "callbackHandler", { enumerable: true, get: function() {
        return n(p).default;
      } });
      var h = r(3774);
      Object.defineProperty(t, "backchannelLogoutHandler", { enumerable: true, get: function() {
        return n(h).default;
      } }), Object.defineProperty(t, "isLoggedOut", { enumerable: true, get: function() {
        return h.isLoggedOut;
      } }), Object.defineProperty(t, "deleteSub", { enumerable: true, get: function() {
        return h.deleteSub;
      } });
      var f = r(7929);
      Object.defineProperty(t, "AbstractClient", { enumerable: true, get: function() {
        return f.AbstractClient;
      } });
    }, 2109: (e, t, r) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: true }), t.AbstractSession = void 0;
      let n = r(2397), a = (0, n.__importDefault(r(9705)).default)("session"), i = () => Date.now() / 1e3 | 0, s = (e2, t2) => {
        if (!e2) throw Error(t2);
      };
      class o {
        constructor(e2) {
          this.getConfig = "function" == typeof e2 ? e2 : () => e2;
        }
        async read(e2) {
          let { rollingDuration: t2, absoluteDuration: r2 } = (await this.getConfig(e2)).session;
          try {
            let n2 = await this.getSession(e2);
            if (n2) {
              let { header: e3, data: a2 } = n2, { iat: o2, uat: l, exp: c } = e3;
              return s(c > i(), "it is expired based on options when it was established"), t2 && s(l + t2 > i(), "it is expired based on current rollingDuration rules"), "number" == typeof r2 && s(o2 + r2 > i(), "it is expired based on current absoluteDuration rules"), [a2, o2];
            }
          } catch (e3) {
            a("error handling session %O", e3);
          }
          return [];
        }
        async save(e2, t2, r2, a2) {
          let s2 = await this.getConfig(e2), o2 = s2.session.cookie, { transient: l } = o2, c = n.__rest(o2, ["transient"]);
          if (!r2) {
            await this.deleteSession(e2, t2, c);
            return;
          }
          let u = i(), d = "number" == typeof a2 ? a2 : u, p = this.calculateExp(d, u, s2), h = Object.assign({}, c);
          l || (h.expires = new Date(1e3 * p)), await this.setSession(e2, t2, r2, u, d, p, h, void 0 === a2);
        }
        calculateExp(e2, t2, r2) {
          let { absoluteDuration: n2 } = r2.session, { rolling: a2, rollingDuration: i2 } = r2.session;
          return "number" != typeof n2 ? t2 + i2 : a2 ? Math.min(t2 + i2, e2 + n2) : e2 + n2;
        }
      }
      t.AbstractSession = o;
    }, 1620: (e, t, r) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: true }), t.StatefulSession = void 0;
      let n = r(2397).__importDefault(r(9705)), a = r(2109), i = r(8747), s = r(6331), o = (0, n.default)("stateful-session");
      class l extends a.AbstractSession {
        async getStore(e2) {
          return this.store || (this.store = e2.session.store), this.store;
        }
        async getKeys(e2) {
          if (!this.keys) {
            let t2 = e2.secret, r2 = Array.isArray(t2) ? t2 : [t2];
            this.keys = await Promise.all(r2.map(s.signing));
          }
          return this.keys;
        }
        async getSession(e2) {
          let t2 = await this.getConfig(e2), { name: r2 } = t2.session, n2 = e2.getCookies(), a2 = await this.getKeys(t2), s2 = await (0, i.getCookieValue)(r2, n2[r2], a2);
          if (s2) {
            let e3 = await this.getStore(t2);
            return o("reading session from %s store", s2), e3.get(s2);
          }
        }
        async setSession(e2, t2, r2, n2, a2, s2, l2, c) {
          let u = await this.getConfig(e2), d = await this.getStore(u), { name: p, genId: h } = u.session, f = e2.getCookies(), m = await this.getKeys(u), g = await (0, i.getCookieValue)(p, f[p], m);
          g && c && (o("regenerating session id %o to prevent session fixation", g), await d.delete(g), g = void 0), g || o("generated new session id %o", g = await h(e2, r2)), o("set session %o", g);
          let y = await (0, i.generateCookieValue)(p, g, m[0]);
          t2.setCookie(p, y, l2), await d.set(g, { header: { iat: a2, uat: n2, exp: s2 }, data: r2 });
        }
        async deleteSession(e2, t2, r2) {
          let n2 = await this.getConfig(e2), { name: a2 } = n2.session, s2 = e2.getCookies(), l2 = await this.getKeys(n2), c = await (0, i.getCookieValue)(a2, s2[a2], l2);
          if (c) {
            let e3 = await this.getStore(n2);
            o("deleting session %o", c), t2.clearCookie(a2, r2), await e3.delete(c);
          }
        }
      }
      t.StatefulSession = l;
    }, 6683: (e, t, r) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: true }), t.StatelessSession = void 0;
      let n = r(2397), a = n.__importStar(r(9507)), i = r(1250), s = n.__importDefault(r(9705)), o = r(6331), l = r(2109), c = (0, s.default)("stateless-session"), u = (e2) => null !== e2;
      class d extends l.AbstractSession {
        constructor(e2) {
          super(e2), this.config = e2;
        }
        async getChunkSize(e2) {
          if (void 0 === this.chunkSize) {
            let t2 = e2.session, r2 = t2.cookie, { transient: a2 } = r2, s2 = n.__rest(r2, ["transient"]), { name: o2 } = t2, l2 = Object.assign({}, s2);
            a2 || (l2.expires = /* @__PURE__ */ new Date());
            let c2 = (0, i.serialize)(`${o2}.0`, "", l2);
            this.chunkSize = 4096 - c2.length;
          }
          return this.chunkSize;
        }
        async getKeys(e2) {
          if (!this.keys) {
            let t2 = e2.secret, r2 = Array.isArray(t2) ? t2 : [t2];
            this.keys = await Promise.all(r2.map(o.encryption));
          }
          return this.keys;
        }
        async encrypt(e2, { iat: t2, uat: r2, exp: n2 }, i2) {
          return await new a.EncryptJWT(Object.assign({}, e2)).setProtectedHeader({ alg: "dir", enc: "A256GCM", uat: r2, iat: t2, exp: n2 }).encrypt(i2);
        }
        async decrypt(e2, t2) {
          let r2;
          for (let n2 of t2) try {
            return await a.jwtDecrypt(e2, n2);
          } catch (e3) {
            r2 = e3;
          }
          throw r2;
        }
        async getSession(e2) {
          let t2;
          let r2 = await this.getConfig(e2), { name: n2 } = r2.session, a2 = e2.getCookies();
          if (n2 in a2 ? (c("reading session from %s cookie", n2), t2 = a2[n2]) : `${n2}.0` in a2 && (t2 = Object.entries(a2).map(([e3, t3]) => {
            let r3 = e3.match(`^${n2}\\.(\\d+)$`);
            return r3 ? [r3[1], t3] : null;
          }).filter(u).sort(([e3], [t3]) => parseInt(e3, 10) - parseInt(t3, 10)).map(([e3, t3]) => (c("reading session chunk from %s.%d cookie", n2, e3), t3)).join("")), t2) {
            let e3 = await this.getKeys(r2), { protectedHeader: n3, payload: a3 } = await this.decrypt(t2, e3);
            return { header: n3, data: a3 };
          }
        }
        async setSession(e2, t2, r2, n2, a2, i2, s2) {
          let o2 = await this.getConfig(e2), { name: l2 } = o2.session, u2 = e2.getCookies();
          c("found session, creating signed session cookie(s) with name %o(.i)", l2);
          let [d2] = await this.getKeys(o2), p = await this.encrypt(r2, { iat: a2, uat: n2, exp: i2 }, d2), h = await this.getChunkSize(o2), f = Math.ceil(p.length / h), m = new Set(Object.keys(u2).filter((e3) => e3.match(`^${l2}(?:\\.\\d)?$`)));
          if (f > 1) {
            c("cookie size greater than %d, chunking", this.chunkSize);
            for (let e3 = 0; e3 < f; e3++) {
              let r3 = p.slice(e3 * h, (e3 + 1) * h), n3 = `${l2}.${e3}`;
              t2.setCookie(n3, r3, s2), m.delete(n3);
            }
          } else t2.setCookie(l2, p, s2), m.delete(l2);
          m.forEach((e3) => t2.clearCookie(e3, s2));
        }
        async deleteSession(e2, t2, r2) {
          let { name: n2 } = (await this.getConfig(e2)).session;
          for (let a2 of Object.keys(e2.getCookies())) a2.match(`^${n2}(?:\\.\\d)?$`) && t2.clearCookie(a2, r2);
        }
      }
      t.StatelessSession = d;
    }, 5096: (e, t, r) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: true });
      let n = r(8747), a = r(6331);
      class i {
        constructor(e2) {
          this.getConfig = "function" == typeof e2 ? e2 : () => e2;
        }
        async getKeys(e2) {
          if (!this.keys) {
            let t2 = e2.secret, r2 = Array.isArray(t2) ? t2 : [t2];
            this.keys = await Promise.all(r2.map(a.signing));
          }
          return this.keys;
        }
        async save(e2, t2, r2, { sameSite: a2 = "none", value: i2 }) {
          let s = "none" === a2, o = await this.getConfig(t2), { domain: l, path: c, secure: u } = o.transactionCookie, d = { httpOnly: true, secure: u, domain: l, path: c }, [p] = await this.getKeys(o);
          {
            let t3 = await (0, n.generateCookieValue)(e2, i2, p);
            r2.setCookie(e2, t3, Object.assign(Object.assign({}, d), { sameSite: a2, secure: !!s || d.secure }));
          }
          if (s && o.legacySameSiteCookie) {
            let t3 = await (0, n.generateCookieValue)(`_${e2}`, i2, p);
            r2.setCookie(`_${e2}`, t3, d);
          }
          return i2;
        }
        async read(e2, t2, r2) {
          let a2 = t2.getCookies(), i2 = a2[e2], s = await this.getConfig(t2), o = s.transactionCookie, l = await this.getKeys(s), c = await (0, n.getCookieValue)(e2, i2, l);
          if (r2.clearCookie(e2, o), s.legacySameSiteCookie) {
            let t3 = `_${e2}`;
            if (!c) {
              let e3 = a2[t3];
              c = await (0, n.getCookieValue)(t3, e3, l);
            }
            r2.clearCookie(t3, o);
          }
          return c;
        }
      }
      t.default = i;
    }, 9705: (e, t, r) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: true });
      let n = r(2397).__importDefault(r(591));
      t.default = (e2) => (0, n.default)("nextjs-auth0").extend(e2);
    }, 4991: (e, t, r) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: true }), t.decodeState = t.encodeState = void 0;
      let n = r(2397), a = n.__importStar(r(9507));
      t.encodeState = function(e2) {
        let { nonce: t2, code_verifier: r2, max_age: i } = e2, s = n.__rest(e2, ["nonce", "code_verifier", "max_age"]);
        return a.base64url.encode(JSON.stringify(s));
      }, t.decodeState = function(e2) {
        try {
          return JSON.parse(new TextDecoder().decode(a.base64url.decode(e2)));
        } catch (e3) {
          return;
        }
      };
    }, 6611: (e, t) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: true }), t.htmlSafe = t.BackchannelLogoutError = t.UserInfoError = t.DiscoveryError = t.IdentityProviderError = t.ApplicationError = t.MissingStateCookieError = t.MalformedStateCookieError = t.MissingStateParamError = t.EscapedError = void 0;
      class r extends Error {
        constructor(e2) {
          super(d(e2)), Object.setPrototypeOf(this, r.prototype);
        }
      }
      t.EscapedError = r;
      class n extends Error {
        constructor() {
          super(n.message), this.status = 400, this.statusCode = 400, Object.setPrototypeOf(this, n.prototype);
        }
      }
      t.MissingStateParamError = n, n.message = "Missing state parameter in Authorization Response.";
      class a extends Error {
        constructor() {
          super(a.message), this.status = 400, this.statusCode = 400, Object.setPrototypeOf(this, a.prototype);
        }
      }
      t.MalformedStateCookieError = a, a.message = "Your state cookie is not valid JSON.";
      class i extends Error {
        constructor() {
          super(i.message), this.status = 400, this.statusCode = 400, Object.setPrototypeOf(this, i.prototype);
        }
      }
      t.MissingStateCookieError = i, i.message = "Missing state cookie from login request (check login URL, callback URL and cookie config).";
      class s extends r {
        constructor(e2) {
          super(e2.message), Object.setPrototypeOf(this, s.prototype);
        }
      }
      t.ApplicationError = s;
      class o extends r {
        constructor(e2) {
          super(e2.message), this.error = d(e2.error), this.errorDescription = d(e2.error_description), Object.setPrototypeOf(this, o.prototype);
        }
      }
      t.IdentityProviderError = o;
      class l extends r {
        constructor(e2, t2) {
          super(`Discovery requests failing for ${t2}, ${e2.message}`), Object.setPrototypeOf(this, l.prototype);
        }
      }
      t.DiscoveryError = l;
      class c extends r {
        constructor(e2) {
          super(`Userinfo request failing with: ${e2}`), Object.setPrototypeOf(this, c.prototype);
        }
      }
      t.UserInfoError = c;
      class u extends Error {
        constructor(e2, t2) {
          super(t2), this.code = e2, this.description = t2, Object.setPrototypeOf(this, u.prototype);
        }
      }
      function d(e2) {
        return e2 && e2.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
      }
      t.BackchannelLogoutError = u, t.htmlSafe = d;
    }, 6331: (e, t, r) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: true }), t.signing = t.encryption = void 0;
      let n = r(2397).__importDefault(r(728)), a = "sha256";
      t.encryption = (e2) => (0, n.default)(a, e2, "", "JWE CEK", 32), t.signing = (e2) => (0, n.default)(a, e2, "", "JWS Cookie Signing", 32);
    }, 1099: (e, t, r) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: true });
      let n = r(9507);
      t.default = function() {
        let e2;
        return async (t2, r2, a) => {
          let i;
          "RS256" === r2.idTokenSigningAlg ? (e2 || (e2 = (0, n.createRemoteJWKSet)(new URL(a.jwks_uri))), i = e2) : i = new TextEncoder().encode(r2.clientSecret);
          let { payload: s } = await (0, n.jwtVerify)(t2, i, { issuer: a.issuer, audience: r2.clientID, algorithms: [r2.idTokenSigningAlg], requiredClaims: ["iat"] });
          if (!("sid" in s) && !("sub" in s)) throw Error('either "sid" or "sub" (or both) claims must be present');
          if ("nonce" in s) throw Error('"nonce" claim is prohibited');
          if (!("events" in s)) throw Error('"events" claim is missing');
          if ("object" != typeof s.events || null === s.events) throw Error('"events" claim must be an object');
          if (!("http://schemas.openid.net/event/backchannel-logout" in s.events)) throw Error('"http://schemas.openid.net/event/backchannel-logout" member is missing in the "events" claim');
          if ("object" != typeof s.events["http://schemas.openid.net/event/backchannel-logout"]) throw Error('"http://schemas.openid.net/event/backchannel-logout" member in the "events" claim must be an object');
          return s;
        };
      };
    }, 8747: (e, t, r) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: true }), t.generateCookieValue = t.getCookieValue = void 0;
      let n = r(2397).__importStar(r(9507)), a = async (e2, t2, r2) => {
        if (!t2) return;
        let [a2, i2] = t2.split("."), s = { protected: n.base64url.encode(JSON.stringify({ alg: "HS256", b64: false, crit: ["b64"] })), payload: `${e2}=${a2}`, signature: i2 };
        for (let e3 of r2) try {
          return await n.flattenedVerify(s, e3, { algorithms: ["HS256"] }), a2;
        } catch (e4) {
        }
      };
      t.getCookieValue = a;
      let i = async (e2, t2, r2) => {
        let { signature: a2 } = await new n.FlattenedSign(new TextEncoder().encode(`${e2}=${t2}`)).setProtectedHeader({ alg: "HS256", b64: false, crit: ["b64"] }).sign(r2);
        return `${t2}.${a2}`;
      };
      t.generateCookieValue = i;
    }, 5339: (e, t, r) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: true }), t.configSingletonGetter = t.getConfig = void 0;
      let n = r(2397), a = r(3610), i = ["n", "no", "false", "0", "off"], s = (e2, t2) => void 0 === e2 || "" === e2 ? t2 : e2 && "string" == typeof e2 ? !i.includes(e2.toLowerCase().trim()) : !!e2, o = (e2) => void 0 === e2 || "" === e2 ? void 0 : +e2, l = (e2) => void 0 === e2 || "" === e2 ? void 0 : e2.replace(/\s/g, "").split(",");
      t.getConfig = (e2 = {}) => {
        var t2, r2, i2, c;
        let u = process.env.AUTH0_SECRET, d = process.env.AUTH0_ISSUER_BASE_URL, p = process.env.AUTH0_BASE_URL || process.env.NEXT_PUBLIC_AUTH0_BASE_URL, h = process.env.AUTH0_CLIENT_ID, f = process.env.AUTH0_CLIENT_SECRET, m = process.env.AUTH0_CLOCK_TOLERANCE, g = process.env.AUTH0_HTTP_TIMEOUT, y = process.env.AUTH0_ENABLE_TELEMETRY, b = process.env.AUTH0_IDP_LOGOUT, w = process.env.AUTH0_LOGOUT, v = process.env.AUTH0_ID_TOKEN_SIGNING_ALG, _ = process.env.AUTH0_LEGACY_SAME_SITE_COOKIE, S = process.env.AUTH0_IDENTITY_CLAIM_FILTER, E = process.env.AUTH0_PUSHED_AUTHORIZATION_REQUESTS, A = process.env.AUTH0_CALLBACK, k = process.env.AUTH0_POST_LOGOUT_REDIRECT, x = process.env.AUTH0_AUDIENCE, R = process.env.AUTH0_SCOPE, C = process.env.AUTH0_ORGANIZATION, O = process.env.AUTH0_SESSION_NAME, P = process.env.AUTH0_SESSION_ROLLING, T = process.env.AUTH0_SESSION_ROLLING_DURATION, j = process.env.AUTH0_SESSION_ABSOLUTE_DURATION, I = process.env.AUTH0_SESSION_AUTO_SAVE, $ = process.env.AUTH0_SESSION_STORE_ID_TOKEN, N = process.env.AUTH0_COOKIE_DOMAIN, M = process.env.AUTH0_COOKIE_PATH, D = process.env.AUTH0_COOKIE_TRANSIENT, L = process.env.AUTH0_COOKIE_HTTP_ONLY, H = process.env.AUTH0_COOKIE_SECURE, U = process.env.AUTH0_COOKIE_SAME_SITE, q = process.env.AUTH0_CLIENT_ASSERTION_SIGNING_KEY, K = process.env.AUTH0_CLIENT_ASSERTION_SIGNING_ALG, W = process.env.AUTH0_TRANSACTION_COOKIE_NAME, F = process.env.AUTH0_TRANSACTION_COOKIE_DOMAIN, J = process.env.AUTH0_TRANSACTION_COOKIE_PATH, z = process.env.AUTH0_TRANSACTION_COOKIE_SAME_SITE, B = process.env.AUTH0_TRANSACTION_COOKIE_SECURE, G = p && !/^https?:\/\//.test(p) ? `https://${p}` : p, { organization: V } = e2, X = n.__rest(e2, ["organization"]), Y = (0, a.get)(Object.assign(Object.assign({ secret: u, issuerBaseURL: d, baseURL: G, clientID: h, clientSecret: f, clockTolerance: o(m), httpTimeout: o(g), enableTelemetry: s(y), idpLogout: s(b, true), auth0Logout: s(w, true), idTokenSigningAlg: v, legacySameSiteCookie: s(_), identityClaimFilter: l(S), pushedAuthorizationRequests: s(E, false) }, X), { authorizationParams: Object.assign({ response_type: "code", audience: x, scope: R }, X.authorizationParams), session: Object.assign(Object.assign({ name: O, rolling: s(P), rollingDuration: T && isNaN(Number(T)) ? s(T) : o(T), absoluteDuration: j && isNaN(Number(j)) ? s(j) : o(j), autoSave: s(I, true), storeIDToken: s($) }, X.session), { cookie: Object.assign({ domain: N, path: M || "/", transient: s(D), httpOnly: s(L), secure: s(H), sameSite: U }, null === (t2 = X.session) || void 0 === t2 ? void 0 : t2.cookie) }), routes: { callback: (null === (r2 = X.routes) || void 0 === r2 ? void 0 : r2.callback) || A || "/api/auth/callback", postLogoutRedirect: (null === (i2 = X.routes) || void 0 === i2 ? void 0 : i2.postLogoutRedirect) || k }, clientAssertionSigningKey: q, clientAssertionSigningAlg: K, transactionCookie: Object.assign({ name: W, domain: F, path: J || "/", secure: s(B), sameSite: z }, X.transactionCookie) }));
        return Object.assign(Object.assign({}, Y), { organization: V || C, routes: Object.assign(Object.assign({}, Y.routes), { login: (null === (c = X.routes) || void 0 === c ? void 0 : c.login) || process.env.NEXT_PUBLIC_AUTH0_LOGIN || "/api/auth/login" }) });
      }, t.configSingletonGetter = (e2 = {}, r2) => {
        let n2;
        return (a2) => (n2 || (a2.getCookies(), "getUrl" in a2 && a2.getUrl(), n2 = (0, t.getConfig)(Object.assign(Object.assign({}, e2), { session: Object.assign({ genId: r2 }, e2.session) }))), n2);
      };
    }, 5647: (e, t, r) => {
      "use strict";
      let n;
      Object.defineProperty(t, "__esModule", { value: true }), t.withMiddlewareAuthRequired = t.handleAuth = t.handleProfile = t.handleCallback = t.handleLogout = t.handleLogin = t.withPageAuthRequired = t.withApiAuthRequired = t.touchSession = t.getAccessToken = t.updateSession = t.getSession = t.initAuth0 = void 0;
      let a = r(2397), i = r(7874), s = r(674), o = r(9079), l = () => {
        let e2 = new Uint8Array(16);
        return crypto.getRandomValues(e2), Array.from(e2).map((e3) => e3.toString(16).padStart(2, "0")).join("");
      };
      function c() {
        return ((0, s.setIsUsingNamedExports)(), n) ? n : n = (0, i._initAuth)({ genId: l, clientGetter: o.clientGetter });
      }
      t.initAuth0 = (e2) => ((0, s.setIsUsingOwnInstance)(), (0, i._initAuth)({ genId: l, clientGetter: o.clientGetter, params: e2 })), t.getSession = (...e2) => c().getSession(...e2), t.updateSession = (...e2) => c().updateSession(...e2), t.getAccessToken = (...e2) => c().getAccessToken(...e2), t.touchSession = (...e2) => c().touchSession(...e2), t.withApiAuthRequired = (...e2) => c().withApiAuthRequired(...e2), t.withPageAuthRequired = (...e2) => c().withPageAuthRequired(...e2), t.handleLogin = (...e2) => c().handleLogin(...e2), t.handleLogout = (...e2) => c().handleLogout(...e2), t.handleCallback = (...e2) => c().handleCallback(...e2), t.handleProfile = (...e2) => c().handleProfile(...e2), t.handleAuth = (...e2) => c().handleAuth(...e2), t.withMiddlewareAuthRequired = (...e2) => c().withMiddlewareAuthRequired(...e2), a.__exportStar(r(186), t);
    }, 1719: (e, t, r) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: true });
      let n = r(2397), a = r(7766), i = (e2, t2, r2) => {
        console.error(r2), t2.status(r2.status || 500).end();
      }, s = (e2, t2) => {
        console.error(t2);
      };
      t.default = function({ handleLogin: e2, handleLogout: t2, handleCallback: r2, handleProfile: i2, handleBackchannelLogout: s2 }) {
        return (c = {}) => {
          var { onError: u } = c, d = n.__rest(c, ["onError"]);
          let p = Object.assign({ login: e2, logout: t2, callback: r2, "backchannel-logout": s2, me: d.profile || i2 }, d), h = o(p, u), f = l(p, u);
          return (e3, t3) => (0, a.isRequest)(e3) ? h(e3, t3) : f(e3, t3);
        };
      };
      let o = (e2, t2) => async (r2, n2) => {
        let { params: a2 } = n2, i2 = a2.auth0;
        if (Array.isArray(i2)) {
          let e3;
          if ([i2, ...e3] = i2, e3.length) return new Response(null, { status: 404 });
        }
        let o2 = i2 && e2.hasOwnProperty(i2) && e2[i2];
        try {
          if (o2) return await o2(r2, n2);
          return new Response(null, { status: 404 });
        } catch (e3) {
          return await (t2 || s)(r2, e3) || new Response(null, { status: e3.status || 500 });
        }
      }, l = (e2, t2) => async (r2, n2) => {
        let { query: { auth0: a2 } } = r2;
        if (Array.isArray(a2)) {
          let e3;
          if ([a2, ...e3] = a2, e3.length) {
            n2.status(404).end();
            return;
          }
        }
        try {
          let t3 = a2 && e2.hasOwnProperty(a2) && e2[a2];
          t3 ? await t3(r2, n2) : n2.status(404).end();
        } catch (e3) {
          await (t2 || i)(r2, n2, e3), n2.writableEnded || n2.status(200 === n2.statusCode ? 500 : n2.statusCode).end();
        }
      };
    }, 1399: (e, t, r) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: true });
      let n = r(4635), a = r(8555), i = r(2973);
      t.default = function(e2, t2) {
        let r2 = s(e2, t2), n2 = o(e2, t2);
        return (0, i.getHandler)(r2, n2);
      };
      let s = (e2, t2) => async (r2) => {
        try {
          let i2 = new a.Auth0NextRequest(r2);
          if (!(await t2(i2)).backchannelLogout) return new n.NextResponse("Back-Channel Logout is not enabled.", { status: 404 });
          let s2 = new a.Auth0NextResponse(new n.NextResponse());
          return await e2(i2, s2), s2.res;
        } catch (e3) {
          return n.NextResponse.json({ error: e3.code || "unknown_error", error_description: e3.description || e3.message }, { status: 400, headers: { "cache-control": "no-store" } });
        }
      }, o = (e2, t2) => async (r2, n2) => {
        try {
          let i2 = new a.Auth0NextApiRequest(r2);
          if (!(await t2(i2)).backchannelLogout) {
            n2.status(404).end("Back-Channel Logout is not enabled.");
            return;
          }
          return await e2(i2, new a.Auth0NextApiResponse(n2));
        } catch (e3) {
          n2.setHeader("cache-control", "no-store"), n2.status(400).json({ error: e3.code || "unknown_error", error_description: e3.description || e3.message });
        }
      };
    }, 521: (e, t, r) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: true });
      let n = r(4635), a = r(8203), i = r(7447), s = r(8555), o = r(2973);
      t.default = function(e2, t2) {
        let r2 = c(e2, t2), n2 = u(e2, t2);
        return (0, o.getHandler)(r2, n2);
      };
      let l = (e2, t2, r2, n2) => {
        let a2, i2;
        let s2 = Object.assign({}, r2);
        return Object.assign(Object.assign({}, s2), { afterCallback: (a2 = s2.afterCallback, i2 = s2.organization || n2.organization, (r3, n3) => {
          if (i2) {
            if (i2.startsWith("org_")) {
              if (!r3.user.org_id) throw Error("Organization Id (org_id) claim must be a string present in the ID token");
              if (r3.user.org_id !== i2) throw Error(`Organization Id (org_id) claim value mismatch in the ID token; expected "${i2}", found "${r3.user.org_id}"`);
            } else {
              if (!r3.user.org_name) throw Error("Organization Name (org_name) claim must be a string present in the ID token");
              if (r3.user.org_name !== i2.toLowerCase()) throw Error(`Organization Name (org_name) claim value mismatch in the ID token; expected "${i2}", found "${r3.user.org_name}"`);
            }
          }
          return a2 ? t2 ? a2(e2, t2, r3, n3) : a2(e2, r3, n3) : r3;
        }) });
      }, c = (e2, t2) => async (r2, a2, o2 = {}) => {
        try {
          let a3 = new s.Auth0NextRequest(r2), i2 = await t2(a3), c2 = new s.Auth0NextResponse(new n.NextResponse());
          return await e2(a3, c2, l(r2, void 0, o2, i2)), c2.res;
        } catch (e3) {
          throw new i.CallbackHandlerError(e3);
        }
      }, u = (e2, t2) => async (r2, n2, o2 = {}) => {
        try {
          let i2 = new s.Auth0NextApiRequest(r2), c2 = await t2(i2);
          return (0, a.assertReqRes)(r2, n2), await e2(i2, new s.Auth0NextApiResponse(n2), l(r2, n2, o2, c2));
        } catch (e3) {
          throw new i.CallbackHandlerError(e3);
        }
      };
    }, 1273: function(e, t, r) {
      "use strict";
      var n = this && this.__importDefault || function(e2) {
        return e2 && e2.__esModule ? e2 : { default: e2 };
      };
      Object.defineProperty(t, "__esModule", { value: true }), t.handlerFactory = t.profileHandler = t.backchannelLogoutHandler = t.logoutHandler = t.loginHandler = t.callbackHandler = void 0;
      var a = r(521);
      Object.defineProperty(t, "callbackHandler", { enumerable: true, get: function() {
        return n(a).default;
      } });
      var i = r(7818);
      Object.defineProperty(t, "loginHandler", { enumerable: true, get: function() {
        return n(i).default;
      } });
      var s = r(1426);
      Object.defineProperty(t, "logoutHandler", { enumerable: true, get: function() {
        return n(s).default;
      } });
      var o = r(1399);
      Object.defineProperty(t, "backchannelLogoutHandler", { enumerable: true, get: function() {
        return n(o).default;
      } });
      var l = r(2355);
      Object.defineProperty(t, "profileHandler", { enumerable: true, get: function() {
        return n(l).default;
      } });
      var c = r(1719);
      Object.defineProperty(t, "handlerFactory", { enumerable: true, get: function() {
        return n(c).default;
      } });
    }, 7818: (e, t, r) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: true });
      let n = r(2397), a = r(4635), i = n.__importDefault(r(7370)), s = r(8203), o = r(7447), l = r(8555), c = r(2973);
      t.default = function(e2, t2) {
        let r2 = d(e2, t2), n2 = p(e2, t2);
        return (0, c.getHandler)(r2, n2);
      };
      let u = (e2, t2, r2, a2) => {
        var s2;
        let o2, l2;
        if ({ getLoginState: l2 } = t2, o2 = n.__rest(t2, ["getLoginState"]), r2) {
          let e3 = new URL((null === (s2 = t2.authorizationParams) || void 0 === s2 ? void 0 : s2.redirect_uri) || a2.baseURL), n2 = (0, i.default)(r2, e3);
          o2 = Object.assign(Object.assign({}, o2), { returnTo: n2 });
        }
        return a2.organization && (o2 = Object.assign(Object.assign({}, o2), { authorizationParams: Object.assign({ organization: a2.organization }, o2.authorizationParams) })), l2 && (o2.getLoginState = (t3) => l2(e2, t3)), o2;
      }, d = (e2, t2) => async (r2, n2, i2 = {}) => {
        try {
          let n3 = new l.Auth0NextRequest(r2), s2 = await t2(n3), o2 = new URL(r2.url).searchParams.get("returnTo"), c2 = new l.Auth0NextResponse(new a.NextResponse());
          return await e2(n3, c2, u(r2, i2, o2, s2)), c2.res;
        } catch (e3) {
          throw new o.LoginHandlerError(e3);
        }
      }, p = (e2, t2) => async (r2, n2, a2 = {}) => {
        try {
          let i2 = new l.Auth0NextApiRequest(r2), o2 = await t2(i2);
          (0, s.assertReqRes)(r2, n2);
          let c2 = r2.query.returnTo && Array.isArray(r2.query.returnTo) ? r2.query.returnTo[0] : r2.query.returnTo;
          return await e2(i2, new l.Auth0NextApiResponse(n2), u(r2, a2, c2, o2));
        } catch (e3) {
          throw new o.LoginHandlerError(e3);
        }
      };
    }, 1426: (e, t, r) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: true });
      let n = r(4635), a = r(8203), i = r(7447), s = r(8555), o = r(2973);
      t.default = function(e2) {
        let t2 = l(e2), r2 = c(e2);
        return (0, o.getHandler)(t2, r2);
      };
      let l = (e2) => async (t2, r2, a2 = {}) => {
        try {
          let r3 = new s.Auth0NextResponse(new n.NextResponse());
          return await e2(new s.Auth0NextRequest(t2), r3, a2), r3.res;
        } catch (e3) {
          throw new i.LogoutHandlerError(e3);
        }
      }, c = (e2) => async (t2, r2, n2 = {}) => {
        try {
          return (0, a.assertReqRes)(t2, r2), await e2(new s.Auth0NextApiRequest(t2), new s.Auth0NextApiResponse(r2), n2);
        } catch (e3) {
          throw new i.LogoutHandlerError(e3);
        }
      };
    }, 2355: (e, t, r) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: true });
      let n = r(4635), a = r(7770), i = r(8203), s = r(7447), o = r(2973), l = r(8555);
      t.default = function(e2, t2, r2, n2) {
        let a2 = c(e2, t2, r2, n2), i2 = u(e2, t2, r2, n2);
        return (0, o.getHandler)(a2, i2);
      };
      let c = (e2, t2, r2, i2) => async (o2, c2, u2 = {}) => {
        try {
          let s2 = await e2(new l.Auth0NextRequest(o2)), c3 = await t2(s2), d = new n.NextResponse();
          if (!await i2.isAuthenticated(o2, d)) {
            let e3 = new n.NextResponse(null, { status: 204 });
            return d.headers.forEach((t3, r3) => e3.headers.set(r3, t3)), e3;
          }
          let p = await i2.get(o2, d);
          if (d.headers.set("Cache-Control", "no-store"), u2.refetch) {
            let { accessToken: e3 } = await r2(o2, d);
            if (!e3) throw Error("No access token available to refetch the profile");
            let t3 = await c3.userinfo(e3), s3 = (0, a.fromJson)(Object.assign(Object.assign({}, p), { user: Object.assign(Object.assign({}, p.user), t3) }));
            return u2.afterRefetch && (s3 = await u2.afterRefetch(o2, s3)), await i2.set(o2, d, s3), n.NextResponse.json(s3.user, d);
          }
          return n.NextResponse.json(p.user, d);
        } catch (e3) {
          throw new s.ProfileHandlerError(e3);
        }
      }, u = (e2, t2, r2, n2) => async (o2, c2, u2 = {}) => {
        try {
          (0, i.assertReqRes)(o2, c2);
          let s2 = await e2(new l.Auth0NextApiRequest(o2)), d = await t2(s2);
          if (!await n2.isAuthenticated(o2, c2)) {
            c2.status(204).end();
            return;
          }
          let p = await n2.get(o2, c2);
          if (c2.setHeader("Cache-Control", "no-store"), u2.refetch) {
            let { accessToken: e3 } = await r2(o2, c2);
            if (!e3) throw Error("No access token available to refetch the profile");
            let t3 = await d.userinfo(e3), i2 = (0, a.fromJson)(Object.assign(Object.assign({}, p), { user: Object.assign(Object.assign({}, p.user), t3) }));
            u2.afterRefetch && (i2 = await u2.afterRefetch(o2, c2, i2)), await n2.set(o2, c2, i2), c2.json(i2.user);
            return;
          }
          c2.json(p.user);
        } catch (e3) {
          throw new s.ProfileHandlerError(e3);
        }
      };
    }, 2973: (e, t, r) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: true }), t.getHandler = void 0;
      let n = r(7766);
      t.getHandler = (e2, t2) => (r2, a, i) => (0, n.isRequest)(r2) ? e2(r2, a, i) : "socket" in r2 ? t2(r2, a, i) : (a2, i2) => {
        let s = "function" == typeof r2 ? r2(a2) : r2;
        return (0, n.isRequest)(a2) ? e2(a2, i2, s) : t2(a2, i2, s);
      };
    }, 8595: function(e, t, r) {
      "use strict";
      var n = this && this.__importDefault || function(e2) {
        return e2 && e2.__esModule ? e2 : { default: e2 };
      };
      Object.defineProperty(t, "__esModule", { value: true }), t.withPageAuthRequiredFactory = t.withApiAuthRequiredFactory = void 0;
      var a = r(4225);
      Object.defineProperty(t, "withApiAuthRequiredFactory", { enumerable: true, get: function() {
        return n(a).default;
      } });
      var i = r(8627);
      Object.defineProperty(t, "withPageAuthRequiredFactory", { enumerable: true, get: function() {
        return n(i).default;
      } });
    }, 4225: (e, t, r) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: true });
      let n = r(4635), a = r(7770), i = r(8203), s = r(7766);
      t.default = function(e2) {
        let t2 = l(e2), r2 = o(e2);
        return (e3) => (n2, a2) => (0, s.isRequest)(n2) ? r2(e3)(n2, a2) : t2(e3)(n2, a2);
      };
      let o = (e2) => (t2) => async (r2, i2) => {
        let s2 = new n.NextResponse(), [o2] = await (0, a.get)({ sessionCache: e2, req: r2, res: s2 });
        if (!o2 || !o2.user) return n.NextResponse.json({ error: "not_authenticated", description: "The user does not have an active session or is not authenticated" }, { status: 401 });
        let l2 = await t2(r2, i2), c = l2 instanceof n.NextResponse ? l2 : new n.NextResponse(l2.body, l2);
        for (let e3 of s2.cookies.getAll()) c.cookies.get(e3.name) || c.cookies.set(e3);
        return c;
      }, l = (e2) => (t2) => async (r2, n2) => {
        (0, i.assertReqRes)(r2, n2);
        let a2 = await e2.get(r2, n2);
        if (!a2 || !a2.user) {
          n2.status(401).json({ error: "not_authenticated", description: "The user does not have an active session or is not authenticated" });
          return;
        }
        await t2(r2, n2);
      };
    }, 1358: (e, t, r) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: true });
      let n = r(4635), a = r(8555);
      t.default = function(e2, t2) {
        return function(r2) {
          return async function(...i) {
            let s;
            let [o] = i, { routes: { login: l, callback: c } } = await e2(new a.Auth0NextRequest(o)), { pathname: u, origin: d, search: p } = o.nextUrl, h = `${u}${p}`;
            if ("function" == typeof r2 ? s = r2 : r2 && (s = r2.middleware, h = ("function" == typeof r2.returnTo ? await r2.returnTo(o) : r2.returnTo) || h), [l, c, "/_next", "/favicon.ico"].some((e3) => u.startsWith(e3))) return;
            let f = n.NextResponse.next(), m = await t2.get(o, f);
            if (!(null == m ? void 0 : m.user)) return u.startsWith("/api") ? n.NextResponse.json({ error: "not_authenticated", description: "The user does not have an active session or is not authenticated" }, { status: 401 }) : n.NextResponse.redirect(new URL(`${l}?returnTo=${encodeURIComponent(h)}`, d));
            let g = await (s && s(...i));
            if (!g) return f;
            {
              let e3 = new n.NextResponse(g.body, g), t3 = f.cookies.getAll();
              if ("cookies" in g) for (let t4 of g.cookies.getAll()) e3.cookies.set(t4);
              for (let r3 of t3) e3.cookies.get(r3.name) || e3.cookies.set(r3);
              return e3;
            }
          };
        };
      };
    }, 8627: (e, t, r) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: true });
      let n = r(7770), a = r(8203), i = r(8555), s = r(276);
      t.default = function(e2, t2) {
        let r2 = o(e2, t2), n2 = l(e2, t2);
        return (e3, t3) => "function" == typeof e3 ? r2(e3, t3) : n2(e3);
      };
      let o = (e2, t2) => (a2, s2 = {}) => async (o2) => {
        let { routes: { login: l2 } } = await e2(new i.Auth0NextRequestCookies()), [c] = await (0, n.get)({ sessionCache: t2 });
        if (!(null == c ? void 0 : c.user)) {
          let e3 = "function" == typeof s2.returnTo ? await s2.returnTo(o2) : s2.returnTo, { redirect: t3 } = r(1119);
          t3(`${l2}${s2.returnTo ? `?returnTo=${e3}` : ""}`);
        }
        return a2(o2);
      }, l = (e2, t2) => ({ getServerSideProps: r2, returnTo: n2 } = {}) => async (i2) => {
        (0, a.assertCtx)(i2);
        let { routes: { login: o2 } } = await e2(new s.NodeRequest(i2.req)), l2 = await t2.get(i2.req, i2.res);
        if (!(null == l2 ? void 0 : l2.user)) return { redirect: { destination: `${o2}?returnTo=${encodeURIComponent(n2 || i2.resolvedUrl)}`, permanent: false } };
        let c = { props: {} };
        return (r2 && (c = await r2(i2)), c.props instanceof Promise) ? Object.assign(Object.assign({}, c), { props: c.props.then((e3) => Object.assign({ user: l2.user }, e3)) }) : Object.assign(Object.assign({}, c), { props: Object.assign({ user: l2.user }, c.props) });
      };
    }, 3835: (e, t, r) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: true });
      let n = r(276);
      class a extends n.Auth0Request {
        constructor(e2) {
          super(e2);
        }
        getUrl() {
          return this.req.url;
        }
        getMethod() {
          return this.req.method;
        }
        getBody() {
          return this.req.body;
        }
        getCookies() {
          return this.req.cookies;
        }
      }
      t.default = a;
    }, 4087: (e, t, r) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: true });
      let n = r(276);
      class a extends n.NodeResponse {
        redirect(e2, t2 = 302) {
          this.res.writableEnded || this.res.redirect(t2, this.res.getHeader("Location") || e2);
        }
      }
      t.default = a;
    }, 9064: (e, t, r) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: true });
      let n = r(276);
      class a extends n.Auth0RequestCookies {
        constructor() {
          super();
        }
        getCookies() {
          let { cookies: e2 } = r(6831);
          return e2().getAll().reduce((e3, { name: t2, value: r2 }) => Object.assign(Object.assign({}, e3), { [t2]: r2 }), {});
        }
      }
      t.default = a;
    }, 1996: (e, t, r) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: true });
      let n = r(276);
      class a extends n.Auth0Request {
        constructor(e2) {
          super(e2);
        }
        getUrl() {
          return this.req.url;
        }
        getMethod() {
          return this.req.method;
        }
        async getBody() {
          return this.req.text();
        }
        getCookies() {
          let { cookies: e2 } = this.req;
          return "function" == typeof e2.getAll ? this.req.cookies.getAll().reduce((e3, { name: t2, value: r2 }) => Object.assign(Object.assign({}, e3), { [t2]: r2 }), {}) : Array.from(e2.keys()).reduce((t2, r2) => (t2[r2] = e2.get(r2), t2), {});
        }
      }
      t.default = a;
    }, 7972: (e, t, r) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: true });
      let n = r(276), a = () => {
      };
      class i extends n.Auth0ResponseCookies {
        constructor() {
          super();
        }
        setCookie(e2, t2, n2) {
          let { cookies: i2 } = r(6831), s = i2();
          try {
            s.set(Object.assign(Object.assign({}, n2), { name: e2, value: t2 }));
          } catch (e3) {
            a();
          }
        }
        clearCookie(e2, t2) {
          let { cookies: n2 } = r(6831), i2 = n2();
          try {
            i2.set(Object.assign(Object.assign({}, t2), { name: e2, value: "", expires: /* @__PURE__ */ new Date(0) }));
          } catch (e3) {
            a();
          }
        }
      }
      t.default = i;
    }, 5168: (e, t, r) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: true });
      let n = r(4635), a = r(276);
      class i extends a.Auth0Response {
        constructor(e2) {
          super(e2);
        }
        setCookie(e2, t2, r2) {
          this.res.cookies.set(e2, t2, r2);
        }
        clearCookie(e2, t2) {
          this.setCookie(e2, "", Object.assign(Object.assign({}, t2), { expires: /* @__PURE__ */ new Date(0) }));
        }
        redirect(e2, t2 = 302) {
          let r2 = this.res;
          for (let a2 of (this.res = new n.NextResponse(null, { status: t2 }), r2.headers.forEach((e3, t3) => {
            this.res.headers.set(t3, e3);
          }), this.res.headers.set("location", e2), r2.cookies.getAll())) this.res.cookies.set(a2);
        }
        setHeader(e2, t2) {
          this.res.headers.set(e2, t2);
        }
        send204() {
          let e2 = this.res;
          this.res = new n.NextResponse(null, { status: 204 }), e2.headers.forEach((e3, t2) => {
            this.res.headers.set(t2, e3);
          });
        }
      }
      t.default = i;
    }, 8555: function(e, t, r) {
      "use strict";
      var n = this && this.__importDefault || function(e2) {
        return e2 && e2.__esModule ? e2 : { default: e2 };
      };
      Object.defineProperty(t, "__esModule", { value: true }), t.Auth0NextResponseCookies = t.Auth0NextRequestCookies = t.Auth0NextResponse = t.Auth0NextRequest = t.Auth0NextApiResponse = t.Auth0NextApiRequest = void 0;
      var a = r(3835);
      Object.defineProperty(t, "Auth0NextApiRequest", { enumerable: true, get: function() {
        return n(a).default;
      } });
      var i = r(4087);
      Object.defineProperty(t, "Auth0NextApiResponse", { enumerable: true, get: function() {
        return n(i).default;
      } });
      var s = r(1996);
      Object.defineProperty(t, "Auth0NextRequest", { enumerable: true, get: function() {
        return n(s).default;
      } });
      var o = r(5168);
      Object.defineProperty(t, "Auth0NextResponse", { enumerable: true, get: function() {
        return n(o).default;
      } });
      var l = r(9064);
      Object.defineProperty(t, "Auth0NextRequestCookies", { enumerable: true, get: function() {
        return n(l).default;
      } });
      var c = r(7972);
      Object.defineProperty(t, "Auth0NextResponseCookies", { enumerable: true, get: function() {
        return n(c).default;
      } });
    }, 7874: (e, t, r) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: true }), t._initAuth = void 0;
      let n = r(2397), a = r(7907), i = r(1273), s = r(7770), o = r(8595), l = r(5339), c = r(186), u = n.__importDefault(r(1358));
      t._initAuth = ({ params: e2, genId: t2, clientGetter: r2 }) => {
        let n2 = (0, l.configSingletonGetter)(e2, t2), d = r2(c.telemetry), p = new a.TransientStore(n2), h = new s.SessionCache(n2), f = (0, a.loginHandler)(n2, d, p), m = (0, a.logoutHandler)(n2, d, h), g = (0, a.callbackHandler)(n2, d, h, p), y = (0, a.backchannelLogoutHandler)(n2, d), b = (0, s.sessionFactory)(h), w = (0, s.touchSessionFactory)(h), v = (0, s.updateSessionFactory)(h), _ = (0, s.accessTokenFactory)(n2, d, h), S = (0, o.withApiAuthRequiredFactory)(h), E = (0, o.withPageAuthRequiredFactory)(n2, h), A = (0, i.loginHandler)(f, n2), k = (0, i.logoutHandler)(m), x = (0, i.callbackHandler)(g, n2), R = (0, i.backchannelLogoutHandler)(y, n2), C = (0, i.profileHandler)(n2, d, _, h), O = (0, i.handlerFactory)({ handleLogin: A, handleLogout: k, handleCallback: x, handleProfile: C, handleBackchannelLogout: R });
        return { getSession: b, touchSession: w, updateSession: v, getAccessToken: _, withApiAuthRequired: S, withPageAuthRequired: E, handleLogin: A, handleLogout: k, handleCallback: x, handleBackchannelLogout: R, handleProfile: C, handleAuth: O, withMiddlewareAuthRequired: (0, u.default)(n2, h) };
      };
    }, 2390: (e, t, r) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: true }), t.set = t.get = t.getAuth0ReqRes = void 0;
      let n = r(7907), a = r(111), i = r(276), s = r(8555), o = r(7766);
      t.getAuth0ReqRes = (e2, t2) => (0, o.isRequest)(e2) ? [new s.Auth0NextRequest(e2), new s.Auth0NextResponse(t2)] : (0, o.isNextApiRequest)(e2) ? [new s.Auth0NextApiRequest(e2), new s.Auth0NextApiResponse(t2)] : [new i.NodeRequest(e2), new i.NodeResponse(t2)];
      class l {
        constructor(e2) {
          this.getConfig = e2, this.cache = /* @__PURE__ */ new WeakMap(), this.iatCache = /* @__PURE__ */ new WeakMap();
        }
        getSessionStore(e2) {
          return this.sessionStore || (this.sessionStore = e2.session.store ? new n.StatefulSession(e2) : new n.StatelessSession(e2)), this.sessionStore;
        }
        async init(e2, r2, i2 = true) {
          if (!this.cache.has(e2)) {
            let [s2] = (0, t.getAuth0ReqRes)(e2, r2), o2 = await this.getConfig(s2), l2 = this.getSessionStore(o2), [c2, u2] = await l2.read(s2), d = (0, a.fromJson)(c2);
            d && o2.backchannelLogout && await (0, n.isLoggedOut)(d.user, o2) ? (this.cache.set(e2, null), await this.save(e2, r2)) : (this.iatCache.set(e2, u2), this.cache.set(e2, d), o2.session.rolling && o2.session.autoSave && i2 && await this.save(e2, r2));
          }
        }
        async save(e2, r2) {
          let [n2, a2] = (0, t.getAuth0ReqRes)(e2, r2), i2 = await this.getConfig(n2), s2 = this.getSessionStore(i2);
          await s2.save(n2, a2, this.cache.get(e2), this.iatCache.get(e2));
        }
        async create(e2, r2, a2) {
          let [i2] = (0, t.getAuth0ReqRes)(e2, r2), s2 = await this.getConfig(i2);
          s2.backchannelLogout && await (0, n.deleteSub)(a2.user.sub, s2), this.cache.set(e2, a2), await this.save(e2, r2);
        }
        async delete(e2, t2) {
          await this.init(e2, t2, false), this.cache.set(e2, null), await this.save(e2, t2);
        }
        async isAuthenticated(e2, t2) {
          await this.init(e2, t2);
          let r2 = this.cache.get(e2);
          return !!(null == r2 ? void 0 : r2.user);
        }
        async getIdToken(e2, t2) {
          await this.init(e2, t2);
          let r2 = this.cache.get(e2);
          return null == r2 ? void 0 : r2.idToken;
        }
        async set(e2, t2, r2) {
          await this.init(e2, t2, false), this.cache.set(e2, r2), await this.save(e2, t2);
        }
        async get(e2, t2) {
          return await this.init(e2, t2), this.cache.get(e2);
        }
        async fromTokenEndpointResponse(e2, r2, n2) {
          let [i2] = (0, t.getAuth0ReqRes)(e2, r2), s2 = await this.getConfig(i2);
          return (0, a.fromTokenEndpointResponse)(n2, s2);
        }
      }
      t.default = l;
      let c = async ({ sessionCache: e2, req: r2, res: i2 }) => {
        if (r2 && i2) return [await e2.get(r2, i2)];
        let o2 = new s.Auth0NextRequestCookies(), l2 = await e2.getConfig(o2), c2 = e2.getSessionStore(l2), { session: { rolling: u2, autoSave: d } } = l2, [p, h] = await c2.read(o2), f = (0, a.fromJson)(p);
        return f && l2.backchannelLogout && await (0, n.isLoggedOut)(f.user, l2) ? (await (0, t.set)({ session: null, sessionCache: e2 }), []) : (u2 && d && await (0, t.set)({ session: f, sessionCache: e2, iat: h }), [f, h]);
      };
      t.get = c;
      let u = async ({ session: e2, sessionCache: t2, iat: r2, req: n2, res: a2 }) => {
        if (n2 && a2) return t2.set(n2, a2, e2);
        let i2 = new s.Auth0NextRequestCookies(), o2 = await t2.getConfig(i2), l2 = t2.getSessionStore(o2);
        await l2.save(i2, new s.Auth0NextResponseCookies(), e2, r2);
      };
      t.set = u;
    }, 2642: (e, t, r) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: true });
      let n = r(7447), a = r(1573), i = r(7770), s = r(2390), o = r(8555);
      t.default = function(e2, t2, r2) {
        return async (l, c, u) => {
          let d = c ? u : l, p = c ? l : void 0, h = await e2(p ? (0, s.getAuth0ReqRes)(p, c)[0] : new o.Auth0NextRequestCookies()), f = await t2(h), m = await (0, i.get)({ sessionCache: r2, req: p, res: c }), [g] = m, [, y] = m;
          if (!g) throw new n.AccessTokenError(n.AccessTokenErrorCode.MISSING_SESSION, "The user does not have a valid session.");
          if (!g.accessToken && !g.refreshToken) throw new n.AccessTokenError(n.AccessTokenErrorCode.MISSING_ACCESS_TOKEN, "The user does not have a valid access token.");
          if (!g.accessTokenExpiresAt) throw new n.AccessTokenError(n.AccessTokenErrorCode.EXPIRED_ACCESS_TOKEN, "Expiration information for the access token is not available. The user will need to sign in again.");
          if (d && d.scopes) {
            let e3 = g.accessTokenScope;
            if (!e3 || 0 === e3.length) throw new n.AccessTokenError(n.AccessTokenErrorCode.INSUFFICIENT_SCOPE, "An access token with the requested scopes could not be provided. The user will need to sign in again.");
            let t3 = (0, a.intersect)(d.scopes, e3.split(" "));
            if (!(0, a.match)(d.scopes, [...t3])) throw new n.AccessTokenError(n.AccessTokenErrorCode.INSUFFICIENT_SCOPE, `Could not retrieve an access token with scopes "${d.scopes.join(" ")}". The user will need to sign in again.`);
          }
          if (!g.refreshToken && 1e3 * g.accessTokenExpiresAt - 6e4 < Date.now()) throw new n.AccessTokenError(n.AccessTokenErrorCode.EXPIRED_ACCESS_TOKEN, "The access token expired and a refresh token is not available. The user will need to sign in again.");
          if ((null == d ? void 0 : d.refresh) && !g.refreshToken) throw new n.AccessTokenError(n.AccessTokenErrorCode.MISSING_REFRESH_TOKEN, "A refresh token is required to refresh the access token, but none is present.");
          if (g.refreshToken && 1e3 * g.accessTokenExpiresAt - 6e4 < Date.now() || g.refreshToken && d && d.refresh) {
            let e3 = await f.refresh(g.refreshToken, { exchangeBody: null == d ? void 0 : d.authorizationParams }), t3 = (0, i.fromTokenEndpointResponse)(e3, h);
            return Object.assign(g, Object.assign(Object.assign({}, t3), { refreshToken: t3.refreshToken || g.refreshToken, user: Object.assign(Object.assign({}, g.user), t3.user) })), (null == d ? void 0 : d.afterRefresh) && (g = p ? await d.afterRefresh(p, c, g) : await d.afterRefresh(g)), await (0, i.set)({ sessionCache: r2, req: p, res: c, session: g, iat: y }), { accessToken: e3.access_token };
          }
          if (!g.accessToken) throw new n.AccessTokenError(n.AccessTokenErrorCode.MISSING_ACCESS_TOKEN, "The user does not have a valid access token.");
          return { accessToken: g.accessToken };
        };
      };
    }, 8995: (e, t, r) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: true });
      let n = r(7770);
      t.default = function(e2) {
        return async (t2, r2) => {
          let [a] = await (0, n.get)({ req: t2, res: r2, sessionCache: e2 });
          return a;
        };
      };
    }, 7770: function(e, t, r) {
      "use strict";
      var n = this && this.__importDefault || function(e2) {
        return e2 && e2.__esModule ? e2 : { default: e2 };
      };
      Object.defineProperty(t, "__esModule", { value: true }), t.updateSessionFactory = t.touchSessionFactory = t.set = t.get = t.SessionCache = t.accessTokenFactory = t.sessionFactory = t.fromTokenEndpointResponse = t.fromJson = t.Session = void 0;
      var a = r(111);
      Object.defineProperty(t, "Session", { enumerable: true, get: function() {
        return n(a).default;
      } }), Object.defineProperty(t, "fromJson", { enumerable: true, get: function() {
        return a.fromJson;
      } }), Object.defineProperty(t, "fromTokenEndpointResponse", { enumerable: true, get: function() {
        return a.fromTokenEndpointResponse;
      } });
      var i = r(8995);
      Object.defineProperty(t, "sessionFactory", { enumerable: true, get: function() {
        return n(i).default;
      } });
      var s = r(2642);
      Object.defineProperty(t, "accessTokenFactory", { enumerable: true, get: function() {
        return n(s).default;
      } });
      var o = r(2390);
      Object.defineProperty(t, "SessionCache", { enumerable: true, get: function() {
        return n(o).default;
      } }), Object.defineProperty(t, "get", { enumerable: true, get: function() {
        return o.get;
      } }), Object.defineProperty(t, "set", { enumerable: true, get: function() {
        return o.set;
      } });
      var l = r(7049);
      Object.defineProperty(t, "touchSessionFactory", { enumerable: true, get: function() {
        return n(l).default;
      } });
      var c = r(3087);
      Object.defineProperty(t, "updateSessionFactory", { enumerable: true, get: function() {
        return n(c).default;
      } });
    }, 111: (e, t, r) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: true }), t.fromJson = t.fromTokenEndpointResponse = void 0;
      let n = r(2397), a = n.__importStar(r(9507));
      class i {
        constructor(e2) {
          this.user = e2;
        }
      }
      t.default = i, t.fromTokenEndpointResponse = function(e2, t2) {
        let r2 = a.decodeJwt(e2.id_token);
        t2.identityClaimFilter.forEach((e3) => {
          delete r2[e3];
        });
        let { id_token: s, access_token: o, scope: l, expires_in: c, expires_at: u, refresh_token: d } = e2, p = n.__rest(e2, ["id_token", "access_token", "scope", "expires_in", "expires_at", "refresh_token"]), h = t2.session.storeIDToken;
        return Object.assign(new i(Object.assign({}, r2)), Object.assign({ accessToken: o, accessTokenScope: l, accessTokenExpiresAt: Math.floor(Date.now() / 1e3) + Number(c), refreshToken: d }, h && { idToken: s }), p);
      }, t.fromJson = function(e2) {
        return e2 ? Object.assign(new i(Object.assign({}, e2.user)), e2) : null;
      };
    }, 7049: (e, t, r) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: true });
      let n = r(7770);
      t.default = function(e2) {
        return async (t2, r2) => {
          let [a, i] = await (0, n.get)({ sessionCache: e2, req: t2, res: r2 });
          a && await (0, n.set)({ req: t2, res: r2, session: a, sessionCache: e2, iat: i });
        };
      };
    }, 3087: (e, t, r) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: true });
      let n = r(7770);
      t.default = function(e2) {
        return async (t2, r2, a) => {
          let i = r2 ? a : t2, s = r2 ? t2 : void 0, [o, l] = await (0, n.get)({ sessionCache: e2, req: s, res: r2 });
          o && i && i.user && await (0, n.set)({ req: s, res: r2, session: i, sessionCache: e2, iat: l });
        };
      };
    }, 186: (e, t, r) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: true }), t.Session = t.SessionCache = t.ApplicationError = t.IdentityProviderError = t.MissingStateParamError = t.MalformedStateCookieError = t.MissingStateCookieError = t.ProfileHandlerError = t.LogoutHandlerError = t.LoginHandlerError = t.CallbackHandlerError = t.HandlerError = t.AccessTokenError = t.AccessTokenErrorCode = t.AuthError = t.telemetry = void 0;
      let n = r(2397), a = r(7770);
      Object.defineProperty(t, "SessionCache", { enumerable: true, get: function() {
        return a.SessionCache;
      } }), Object.defineProperty(t, "Session", { enumerable: true, get: function() {
        return a.Session;
      } });
      let i = n.__importDefault(r(858));
      t.telemetry = { name: "nextjs-auth0", version: i.default };
      var s = r(7447);
      Object.defineProperty(t, "AuthError", { enumerable: true, get: function() {
        return s.AuthError;
      } }), Object.defineProperty(t, "AccessTokenErrorCode", { enumerable: true, get: function() {
        return s.AccessTokenErrorCode;
      } }), Object.defineProperty(t, "AccessTokenError", { enumerable: true, get: function() {
        return s.AccessTokenError;
      } }), Object.defineProperty(t, "HandlerError", { enumerable: true, get: function() {
        return s.HandlerError;
      } }), Object.defineProperty(t, "CallbackHandlerError", { enumerable: true, get: function() {
        return s.CallbackHandlerError;
      } }), Object.defineProperty(t, "LoginHandlerError", { enumerable: true, get: function() {
        return s.LoginHandlerError;
      } }), Object.defineProperty(t, "LogoutHandlerError", { enumerable: true, get: function() {
        return s.LogoutHandlerError;
      } }), Object.defineProperty(t, "ProfileHandlerError", { enumerable: true, get: function() {
        return s.ProfileHandlerError;
      } });
      var o = r(7907);
      Object.defineProperty(t, "MissingStateCookieError", { enumerable: true, get: function() {
        return o.MissingStateCookieError;
      } }), Object.defineProperty(t, "MalformedStateCookieError", { enumerable: true, get: function() {
        return o.MalformedStateCookieError;
      } }), Object.defineProperty(t, "MissingStateParamError", { enumerable: true, get: function() {
        return o.MissingStateParamError;
      } }), Object.defineProperty(t, "IdentityProviderError", { enumerable: true, get: function() {
        return o.IdentityProviderError;
      } }), Object.defineProperty(t, "ApplicationError", { enumerable: true, get: function() {
        return o.ApplicationError;
      } });
    }, 1573: (e, t) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: true }), t.match = t.intersect = void 0, t.intersect = function(e2, t2) {
        let r = new Set(e2), n = new Set(t2);
        return new Set([...r].filter((e3) => n.has(e3)));
      }, t.match = function(e2, t2) {
        let r = new Set(e2), n = new Set(t2);
        if (r.size !== n.size) return false;
        for (let t3 = 0; t3 < e2.length; t3 += 1) {
          let r2 = e2[t3];
          if (!n.has(r2)) return false;
        }
        return true;
      };
    }, 8203: (e, t) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: true }), t.assertCtx = t.assertReqRes = void 0, t.assertReqRes = (e2, t2) => {
        if (!e2) throw Error("Request is not available");
        if (!t2) throw Error("Response is not available");
      }, t.assertCtx = ({ req: e2, res: r }) => {
        (0, t.assertReqRes)(e2, r);
      };
    }, 7447: (e, t) => {
      "use strict";
      function r(e2, t2) {
        if (!t2) return e2;
        let r2 = e2.endsWith(".") ? "" : ".";
        return `${e2}${r2} CAUSE: ${t2.message}`;
      }
      Object.defineProperty(t, "__esModule", { value: true }), t.ProfileHandlerError = t.LogoutHandlerError = t.LoginHandlerError = t.CallbackHandlerError = t.HandlerError = t.AccessTokenError = t.AccessTokenErrorCode = t.AuthError = t.appendCause = void 0, t.appendCause = r;
      class n extends Error {
        constructor(e2) {
          super(r(e2.message, e2.cause)), this.code = e2.code, this.name = e2.name, this.cause = e2.cause, this.status = e2.status;
        }
      }
      t.AuthError = n, function(e2) {
        e2.MISSING_SESSION = "ERR_MISSING_SESSION", e2.MISSING_ACCESS_TOKEN = "ERR_MISSING_ACCESS_TOKEN", e2.MISSING_REFRESH_TOKEN = "ERR_MISSING_REFRESH_TOKEN", e2.EXPIRED_ACCESS_TOKEN = "ERR_EXPIRED_ACCESS_TOKEN", e2.INSUFFICIENT_SCOPE = "ERR_INSUFFICIENT_SCOPE", e2.FAILED_REFRESH_GRANT = "ERR_FAILED_REFRESH_GRANT";
      }(t.AccessTokenErrorCode || (t.AccessTokenErrorCode = {}));
      class a extends n {
        constructor(e2, t2, r2) {
          super({ code: e2, message: t2, name: "AccessTokenError", cause: r2 }), Error.captureStackTrace(this, this.constructor), Object.setPrototypeOf(this, a.prototype);
        }
      }
      t.AccessTokenError = a;
      class i extends n {
        constructor(e2) {
          let t2;
          "status" in e2.cause && (t2 = e2.cause.status), super(Object.assign(Object.assign({}, e2), { status: t2 }));
        }
      }
      t.HandlerError = i;
      class s extends i {
        constructor(e2) {
          super({ code: s.code, message: "Callback handler failed.", name: "CallbackHandlerError", cause: e2 }), Object.setPrototypeOf(this, s.prototype);
        }
      }
      t.CallbackHandlerError = s, s.code = "ERR_CALLBACK_HANDLER_FAILURE";
      class o extends i {
        constructor(e2) {
          super({ code: o.code, message: "Login handler failed.", name: "LoginHandlerError", cause: e2 }), Object.setPrototypeOf(this, o.prototype);
        }
      }
      t.LoginHandlerError = o, o.code = "ERR_LOGIN_HANDLER_FAILURE";
      class l extends i {
        constructor(e2) {
          super({ code: l.code, message: "Logout handler failed.", name: "LogoutHandlerError", cause: e2 }), Object.setPrototypeOf(this, l.prototype);
        }
      }
      t.LogoutHandlerError = l, l.code = "ERR_LOGOUT_HANDLER_FAILURE";
      class c extends i {
        constructor(e2) {
          super({ code: c.code, message: "Profile handler failed.", name: "ProfileHandlerError", cause: e2 }), Object.setPrototypeOf(this, c.prototype);
        }
      }
      t.ProfileHandlerError = c, c.code = "ERR_PROFILE_HANDLER_FAILURE";
    }, 674: (e, t) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: true }), t.setIsUsingOwnInstance = t.setIsUsingNamedExports = void 0;
      let r = false, n = false, a = () => {
        if (r && n) throw Error("You cannot mix creating your own instance with `initAuth0` and using named exports like `import { handleAuth } from '@auth0/nextjs-auth0'`");
      };
      t.setIsUsingNamedExports = () => {
        r = true, a();
      }, t.setIsUsingOwnInstance = () => {
        n = true, a();
      };
    }, 7766: (e, t) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: true }), t.isNextApiRequest = t.isRequest = void 0, t.isRequest = (e2) => e2 instanceof Request || e2.headers instanceof Headers || "boolean" == typeof e2.bodyUsed, t.isNextApiRequest = (e2) => !(0, t.isRequest)(e2) && "query" in e2;
    }, 7370: (e, t) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: true }), t.default = function(e2, t2) {
        let r;
        try {
          r = new URL(e2, t2);
        } catch (e3) {
          return;
        }
        if (r.origin === t2.origin) return r.toString();
      };
    }, 858: (e, t) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: true }), t.default = "3.8.0";
    }, 1250: (e, t) => {
      "use strict";
      t.parse = function(e2, t2) {
        if ("string" != typeof e2) throw TypeError("argument str must be a string");
        var r2 = {}, a2 = e2.length;
        if (a2 < 2) return r2;
        var i2 = t2 && t2.decode || u, s2 = 0, o2 = 0, d = 0;
        do {
          if (-1 === (o2 = e2.indexOf("=", s2))) break;
          if (-1 === (d = e2.indexOf(";", s2))) d = a2;
          else if (o2 > d) {
            s2 = e2.lastIndexOf(";", o2 - 1) + 1;
            continue;
          }
          var p = l(e2, s2, o2), h = c(e2, o2, p), f = e2.slice(p, h);
          if (!n.call(r2, f)) {
            var m = l(e2, o2 + 1, d), g = c(e2, d, m);
            34 === e2.charCodeAt(m) && 34 === e2.charCodeAt(g - 1) && (m++, g--);
            var y = e2.slice(m, g);
            r2[f] = function(e3, t3) {
              try {
                return t3(e3);
              } catch (t4) {
                return e3;
              }
            }(y, i2);
          }
          s2 = d + 1;
        } while (s2 < a2);
        return r2;
      }, t.serialize = function(e2, t2, n2) {
        var l2 = n2 && n2.encode || encodeURIComponent;
        if ("function" != typeof l2) throw TypeError("option encode is invalid");
        if (!a.test(e2)) throw TypeError("argument name is invalid");
        var c2 = l2(t2);
        if (!i.test(c2)) throw TypeError("argument val is invalid");
        var u2 = e2 + "=" + c2;
        if (!n2) return u2;
        if (null != n2.maxAge) {
          var d = Math.floor(n2.maxAge);
          if (!isFinite(d)) throw TypeError("option maxAge is invalid");
          u2 += "; Max-Age=" + d;
        }
        if (n2.domain) {
          if (!s.test(n2.domain)) throw TypeError("option domain is invalid");
          u2 += "; Domain=" + n2.domain;
        }
        if (n2.path) {
          if (!o.test(n2.path)) throw TypeError("option path is invalid");
          u2 += "; Path=" + n2.path;
        }
        if (n2.expires) {
          var p = n2.expires;
          if ("[object Date]" !== r.call(p) || isNaN(p.valueOf())) throw TypeError("option expires is invalid");
          u2 += "; Expires=" + p.toUTCString();
        }
        if (n2.httpOnly && (u2 += "; HttpOnly"), n2.secure && (u2 += "; Secure"), n2.partitioned && (u2 += "; Partitioned"), n2.priority) switch ("string" == typeof n2.priority ? n2.priority.toLowerCase() : n2.priority) {
          case "low":
            u2 += "; Priority=Low";
            break;
          case "medium":
            u2 += "; Priority=Medium";
            break;
          case "high":
            u2 += "; Priority=High";
            break;
          default:
            throw TypeError("option priority is invalid");
        }
        if (n2.sameSite) switch ("string" == typeof n2.sameSite ? n2.sameSite.toLowerCase() : n2.sameSite) {
          case true:
          case "strict":
            u2 += "; SameSite=Strict";
            break;
          case "lax":
            u2 += "; SameSite=Lax";
            break;
          case "none":
            u2 += "; SameSite=None";
            break;
          default:
            throw TypeError("option sameSite is invalid");
        }
        return u2;
      };
      var r = Object.prototype.toString, n = Object.prototype.hasOwnProperty, a = /^[!#$%&'*+\-.^_`|~0-9A-Za-z]+$/, i = /^("?)[\u0021\u0023-\u002B\u002D-\u003A\u003C-\u005B\u005D-\u007E]*\1$/, s = /^([.]?[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)([.][a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)*$/i, o = /^[\u0020-\u003A\u003D-\u007E]*$/;
      function l(e2, t2, r2) {
        do {
          var n2 = e2.charCodeAt(t2);
          if (32 !== n2 && 9 !== n2) return t2;
        } while (++t2 < r2);
        return r2;
      }
      function c(e2, t2, r2) {
        for (; t2 > r2; ) {
          var n2 = e2.charCodeAt(--t2);
          if (32 !== n2 && 9 !== n2) return t2 + 1;
        }
        return r2;
      }
      function u(e2) {
        return -1 !== e2.indexOf("%") ? decodeURIComponent(e2) : e2;
      }
    }, 591: (e, t, r) => {
      t.formatArgs = function(t2) {
        if (t2[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + t2[0] + (this.useColors ? "%c " : " ") + "+" + e.exports.humanize(this.diff), !this.useColors) return;
        let r2 = "color: " + this.color;
        t2.splice(1, 0, r2, "color: inherit");
        let n2 = 0, a = 0;
        t2[0].replace(/%[a-zA-Z%]/g, (e2) => {
          "%%" !== e2 && (n2++, "%c" === e2 && (a = n2));
        }), t2.splice(a, 0, r2);
      }, t.save = function(e2) {
        try {
          e2 ? t.storage.setItem("debug", e2) : t.storage.removeItem("debug");
        } catch (e3) {
        }
      }, t.load = function() {
        let e2;
        try {
          e2 = t.storage.getItem("debug") || t.storage.getItem("DEBUG");
        } catch (e3) {
        }
        return !e2 && "undefined" != typeof process && "env" in process && (e2 = process.env.DEBUG), e2;
      }, t.useColors = function() {
        let e2;
        return "undefined" != typeof window && !!window.process && ("renderer" === window.process.type || !!window.process.__nwjs) || !("undefined" != typeof navigator && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) && ("undefined" != typeof document && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || "undefined" != typeof window && window.console && (window.console.firebug || window.console.exception && window.console.table) || "undefined" != typeof navigator && navigator.userAgent && (e2 = navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)) && parseInt(e2[1], 10) >= 31 || "undefined" != typeof navigator && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/));
      }, t.storage = function() {
        try {
          return localStorage;
        } catch (e2) {
        }
      }(), t.destroy = /* @__PURE__ */ (() => {
        let e2 = false;
        return () => {
          e2 || (e2 = true, console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."));
        };
      })(), t.colors = ["#0000CC", "#0000FF", "#0033CC", "#0033FF", "#0066CC", "#0066FF", "#0099CC", "#0099FF", "#00CC00", "#00CC33", "#00CC66", "#00CC99", "#00CCCC", "#00CCFF", "#3300CC", "#3300FF", "#3333CC", "#3333FF", "#3366CC", "#3366FF", "#3399CC", "#3399FF", "#33CC00", "#33CC33", "#33CC66", "#33CC99", "#33CCCC", "#33CCFF", "#6600CC", "#6600FF", "#6633CC", "#6633FF", "#66CC00", "#66CC33", "#9900CC", "#9900FF", "#9933CC", "#9933FF", "#99CC00", "#99CC33", "#CC0000", "#CC0033", "#CC0066", "#CC0099", "#CC00CC", "#CC00FF", "#CC3300", "#CC3333", "#CC3366", "#CC3399", "#CC33CC", "#CC33FF", "#CC6600", "#CC6633", "#CC9900", "#CC9933", "#CCCC00", "#CCCC33", "#FF0000", "#FF0033", "#FF0066", "#FF0099", "#FF00CC", "#FF00FF", "#FF3300", "#FF3333", "#FF3366", "#FF3399", "#FF33CC", "#FF33FF", "#FF6600", "#FF6633", "#FF9900", "#FF9933", "#FFCC00", "#FFCC33"], t.log = console.debug || console.log || (() => {
      }), e.exports = r(670)(t);
      let { formatters: n } = e.exports;
      n.j = function(e2) {
        try {
          return JSON.stringify(e2);
        } catch (e3) {
          return "[UnexpectedJSONParseError]: " + e3.message;
        }
      };
    }, 670: (e, t, r) => {
      e.exports = function(e2) {
        function t2(e3) {
          let r2, a2, i;
          let s = null;
          function o(...e4) {
            if (!o.enabled) return;
            let n2 = Number(/* @__PURE__ */ new Date()), a3 = n2 - (r2 || n2);
            o.diff = a3, o.prev = r2, o.curr = n2, r2 = n2, e4[0] = t2.coerce(e4[0]), "string" != typeof e4[0] && e4.unshift("%O");
            let i2 = 0;
            e4[0] = e4[0].replace(/%([a-zA-Z%])/g, (r3, n3) => {
              if ("%%" === r3) return "%";
              i2++;
              let a4 = t2.formatters[n3];
              if ("function" == typeof a4) {
                let t3 = e4[i2];
                r3 = a4.call(o, t3), e4.splice(i2, 1), i2--;
              }
              return r3;
            }), t2.formatArgs.call(o, e4), (o.log || t2.log).apply(o, e4);
          }
          return o.namespace = e3, o.useColors = t2.useColors(), o.color = t2.selectColor(e3), o.extend = n, o.destroy = t2.destroy, Object.defineProperty(o, "enabled", { enumerable: true, configurable: false, get: () => null !== s ? s : (a2 !== t2.namespaces && (a2 = t2.namespaces, i = t2.enabled(e3)), i), set: (e4) => {
            s = e4;
          } }), "function" == typeof t2.init && t2.init(o), o;
        }
        function n(e3, r2) {
          let n2 = t2(this.namespace + (void 0 === r2 ? ":" : r2) + e3);
          return n2.log = this.log, n2;
        }
        function a(e3, t3) {
          let r2 = 0, n2 = 0, a2 = -1, i = 0;
          for (; r2 < e3.length; ) if (n2 < t3.length && (t3[n2] === e3[r2] || "*" === t3[n2])) "*" === t3[n2] ? (a2 = n2, i = r2) : r2++, n2++;
          else {
            if (-1 === a2) return false;
            n2 = a2 + 1, r2 = ++i;
          }
          for (; n2 < t3.length && "*" === t3[n2]; ) n2++;
          return n2 === t3.length;
        }
        return t2.debug = t2, t2.default = t2, t2.coerce = function(e3) {
          return e3 instanceof Error ? e3.stack || e3.message : e3;
        }, t2.disable = function() {
          let e3 = [...t2.names, ...t2.skips.map((e4) => "-" + e4)].join(",");
          return t2.enable(""), e3;
        }, t2.enable = function(e3) {
          for (let r2 of (t2.save(e3), t2.namespaces = e3, t2.names = [], t2.skips = [], ("string" == typeof e3 ? e3 : "").trim().replace(/\s+/g, ",").split(",").filter(Boolean))) "-" === r2[0] ? t2.skips.push(r2.slice(1)) : t2.names.push(r2);
        }, t2.enabled = function(e3) {
          for (let r2 of t2.skips) if (a(e3, r2)) return false;
          for (let r2 of t2.names) if (a(e3, r2)) return true;
          return false;
        }, t2.humanize = r(6863), t2.destroy = function() {
          console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
        }, Object.keys(e2).forEach((r2) => {
          t2[r2] = e2[r2];
        }), t2.names = [], t2.skips = [], t2.formatters = {}, t2.selectColor = function(e3) {
          let r2 = 0;
          for (let t3 = 0; t3 < e3.length; t3++) r2 = (r2 << 5) - r2 + e3.charCodeAt(t3) | 0;
          return t2.colors[Math.abs(r2) % t2.colors.length];
        }, t2.enable(t2.load()), t2;
      };
    }, 2343: (e) => {
      var t;
      self, t = () => {
        var e2, t2;
        return e2 = { 7629: (e3, t3, r) => {
          "use strict";
          let n = r(375), a = r(8571), i = r(9474), s = r(1687), o = r(8652), l = r(8160), c = r(3292), u = r(6354), d = r(8901), p = r(9708), h = r(6914), f = r(2294), m = r(6133), g = r(1152), y = r(8863), b = r(2036), w = { Base: class {
            constructor(e4) {
              this.type = e4, this.$_root = null, this._definition = {}, this._reset();
            }
            _reset() {
              this._ids = new f.Ids(), this._preferences = null, this._refs = new m.Manager(), this._cache = null, this._valids = null, this._invalids = null, this._flags = {}, this._rules = [], this._singleRules = /* @__PURE__ */ new Map(), this.$_terms = {}, this.$_temp = { ruleset: null, whens: {} };
            }
            describe() {
              return n("function" == typeof p.describe, "Manifest functionality disabled"), p.describe(this);
            }
            allow(...e4) {
              return l.verifyFlat(e4, "allow"), this._values(e4, "_valids");
            }
            alter(e4) {
              n(e4 && "object" == typeof e4 && !Array.isArray(e4), "Invalid targets argument"), n(!this._inRuleset(), "Cannot set alterations inside a ruleset");
              let t4 = this.clone();
              for (let r2 in t4.$_terms.alterations = t4.$_terms.alterations || [], e4) {
                let a2 = e4[r2];
                n("function" == typeof a2, "Alteration adjuster for", r2, "must be a function"), t4.$_terms.alterations.push({ target: r2, adjuster: a2 });
              }
              return t4.$_temp.ruleset = false, t4;
            }
            artifact(e4) {
              return n(void 0 !== e4, "Artifact cannot be undefined"), n(!this._cache, "Cannot set an artifact with a rule cache"), this.$_setFlag("artifact", e4);
            }
            cast(e4) {
              return n(false === e4 || "string" == typeof e4, "Invalid to value"), n(false === e4 || this._definition.cast[e4], "Type", this.type, "does not support casting to", e4), this.$_setFlag("cast", false === e4 ? void 0 : e4);
            }
            default(e4, t4) {
              return this._default("default", e4, t4);
            }
            description(e4) {
              return n(e4 && "string" == typeof e4, "Description must be a non-empty string"), this.$_setFlag("description", e4);
            }
            empty(e4) {
              let t4 = this.clone();
              return void 0 !== e4 && (e4 = t4.$_compile(e4, { override: false })), t4.$_setFlag("empty", e4, { clone: false });
            }
            error(e4) {
              return n(e4, "Missing error"), n(e4 instanceof Error || "function" == typeof e4, "Must provide a valid Error object or a function"), this.$_setFlag("error", e4);
            }
            example(e4, t4 = {}) {
              return n(void 0 !== e4, "Missing example"), l.assertOptions(t4, ["override"]), this._inner("examples", e4, { single: true, override: t4.override });
            }
            external(e4, t4) {
              return "object" == typeof e4 && (n(!t4, "Cannot combine options with description"), t4 = e4.description, e4 = e4.method), n("function" == typeof e4, "Method must be a function"), n(void 0 === t4 || t4 && "string" == typeof t4, "Description must be a non-empty string"), this._inner("externals", { method: e4, description: t4 }, { single: true });
            }
            failover(e4, t4) {
              return this._default("failover", e4, t4);
            }
            forbidden() {
              return this.presence("forbidden");
            }
            id(e4) {
              return e4 ? (n("string" == typeof e4, "id must be a non-empty string"), n(/^[^\.]+$/.test(e4), "id cannot contain period character"), this.$_setFlag("id", e4)) : this.$_setFlag("id", void 0);
            }
            invalid(...e4) {
              return this._values(e4, "_invalids");
            }
            label(e4) {
              return n(e4 && "string" == typeof e4, "Label name must be a non-empty string"), this.$_setFlag("label", e4);
            }
            meta(e4) {
              return n(void 0 !== e4, "Meta cannot be undefined"), this._inner("metas", e4, { single: true });
            }
            note(...e4) {
              for (let t4 of (n(e4.length, "Missing notes"), e4)) n(t4 && "string" == typeof t4, "Notes must be non-empty strings");
              return this._inner("notes", e4);
            }
            only(e4 = true) {
              return n("boolean" == typeof e4, "Invalid mode:", e4), this.$_setFlag("only", e4);
            }
            optional() {
              return this.presence("optional");
            }
            prefs(e4) {
              n(e4, "Missing preferences"), n(void 0 === e4.context, "Cannot override context"), n(void 0 === e4.externals, "Cannot override externals"), n(void 0 === e4.warnings, "Cannot override warnings"), n(void 0 === e4.debug, "Cannot override debug"), l.checkPreferences(e4);
              let t4 = this.clone();
              return t4._preferences = l.preferences(t4._preferences, e4), t4;
            }
            presence(e4) {
              return n(["optional", "required", "forbidden"].includes(e4), "Unknown presence mode", e4), this.$_setFlag("presence", e4);
            }
            raw(e4 = true) {
              return this.$_setFlag("result", e4 ? "raw" : void 0);
            }
            result(e4) {
              return n(["raw", "strip"].includes(e4), "Unknown result mode", e4), this.$_setFlag("result", e4);
            }
            required() {
              return this.presence("required");
            }
            strict(e4) {
              let t4 = this.clone();
              return t4._preferences = l.preferences(t4._preferences, { convert: void 0 !== e4 && !e4 }), t4;
            }
            strip(e4 = true) {
              return this.$_setFlag("result", e4 ? "strip" : void 0);
            }
            tag(...e4) {
              for (let t4 of (n(e4.length, "Missing tags"), e4)) n(t4 && "string" == typeof t4, "Tags must be non-empty strings");
              return this._inner("tags", e4);
            }
            unit(e4) {
              return n(e4 && "string" == typeof e4, "Unit name must be a non-empty string"), this.$_setFlag("unit", e4);
            }
            valid(...e4) {
              l.verifyFlat(e4, "valid");
              let t4 = this.allow(...e4);
              return t4.$_setFlag("only", !!t4._valids, { clone: false }), t4;
            }
            when(e4, t4) {
              let r2 = this.clone();
              r2.$_terms.whens || (r2.$_terms.whens = []);
              let a2 = c.when(r2, e4, t4);
              if (!["any", "link"].includes(r2.type)) for (let e5 of a2.is ? [a2] : a2.switch) n(!e5.then || "any" === e5.then.type || e5.then.type === r2.type, "Cannot combine", r2.type, "with", e5.then && e5.then.type), n(!e5.otherwise || "any" === e5.otherwise.type || e5.otherwise.type === r2.type, "Cannot combine", r2.type, "with", e5.otherwise && e5.otherwise.type);
              return r2.$_terms.whens.push(a2), r2.$_mutateRebuild();
            }
            cache(e4) {
              n(!this._inRuleset(), "Cannot set caching inside a ruleset"), n(!this._cache, "Cannot override schema cache"), n(void 0 === this._flags.artifact, "Cannot cache a rule with an artifact");
              let t4 = this.clone();
              return t4._cache = e4 || o.provider.provision(), t4.$_temp.ruleset = false, t4;
            }
            clone() {
              let e4 = Object.create(Object.getPrototypeOf(this));
              return this._assign(e4);
            }
            concat(e4) {
              n(l.isSchema(e4), "Invalid schema object"), n("any" === this.type || "any" === e4.type || e4.type === this.type, "Cannot merge type", this.type, "with another type:", e4.type), n(!this._inRuleset(), "Cannot concatenate onto a schema with open ruleset"), n(!e4._inRuleset(), "Cannot concatenate a schema with open ruleset");
              let t4 = this.clone();
              if ("any" === this.type && "any" !== e4.type) {
                let r2 = e4.clone();
                for (let e5 of Object.keys(t4)) "type" !== e5 && (r2[e5] = t4[e5]);
                t4 = r2;
              }
              for (let r2 of (t4._ids.concat(e4._ids), t4._refs.register(e4, m.toSibling), t4._preferences = t4._preferences ? l.preferences(t4._preferences, e4._preferences) : e4._preferences, t4._valids = b.merge(t4._valids, e4._valids, e4._invalids), t4._invalids = b.merge(t4._invalids, e4._invalids, e4._valids), e4._singleRules.keys())) t4._singleRules.has(r2) && (t4._rules = t4._rules.filter((e5) => e5.keep || e5.name !== r2), t4._singleRules.delete(r2));
              for (let r2 of e4._rules) e4._definition.rules[r2.method].multi || t4._singleRules.set(r2.name, r2), t4._rules.push(r2);
              if (t4._flags.empty && e4._flags.empty) {
                t4._flags.empty = t4._flags.empty.concat(e4._flags.empty);
                let r2 = Object.assign({}, e4._flags);
                delete r2.empty, s(t4._flags, r2);
              } else if (e4._flags.empty) {
                t4._flags.empty = e4._flags.empty;
                let r2 = Object.assign({}, e4._flags);
                delete r2.empty, s(t4._flags, r2);
              } else s(t4._flags, e4._flags);
              for (let r2 in e4.$_terms) {
                let n2 = e4.$_terms[r2];
                n2 ? t4.$_terms[r2] ? t4.$_terms[r2] = t4.$_terms[r2].concat(n2) : t4.$_terms[r2] = n2.slice() : t4.$_terms[r2] || (t4.$_terms[r2] = n2);
              }
              return this.$_root._tracer && this.$_root._tracer._combine(t4, [this, e4]), t4.$_mutateRebuild();
            }
            extend(e4) {
              return n(!e4.base, "Cannot extend type with another base"), d.type(this, e4);
            }
            extract(e4) {
              return e4 = Array.isArray(e4) ? e4 : e4.split("."), this._ids.reach(e4);
            }
            fork(e4, t4) {
              n(!this._inRuleset(), "Cannot fork inside a ruleset");
              let r2 = this;
              for (let n2 of [].concat(e4)) n2 = Array.isArray(n2) ? n2 : n2.split("."), r2 = r2._ids.fork(n2, t4, r2);
              return r2.$_temp.ruleset = false, r2;
            }
            rule(e4) {
              let t4 = this._definition;
              l.assertOptions(e4, Object.keys(t4.modifiers)), n(false !== this.$_temp.ruleset, "Cannot apply rules to empty ruleset or the last rule added does not support rule properties");
              let r2 = null === this.$_temp.ruleset ? this._rules.length - 1 : this.$_temp.ruleset;
              n(r2 >= 0 && r2 < this._rules.length, "Cannot apply rules to empty ruleset");
              let i2 = this.clone();
              for (let s2 = r2; s2 < i2._rules.length; ++s2) {
                let r3 = i2._rules[s2], o2 = a(r3);
                for (let a2 in e4) t4.modifiers[a2](o2, e4[a2]), n(o2.name === r3.name, "Cannot change rule name");
                i2._rules[s2] = o2, i2._singleRules.get(o2.name) === r3 && i2._singleRules.set(o2.name, o2);
              }
              return i2.$_temp.ruleset = false, i2.$_mutateRebuild();
            }
            get ruleset() {
              n(!this._inRuleset(), "Cannot start a new ruleset without closing the previous one");
              let e4 = this.clone();
              return e4.$_temp.ruleset = e4._rules.length, e4;
            }
            get $() {
              return this.ruleset;
            }
            tailor(e4) {
              e4 = [].concat(e4), n(!this._inRuleset(), "Cannot tailor inside a ruleset");
              let t4 = this;
              if (this.$_terms.alterations) for (let { target: r2, adjuster: a2 } of this.$_terms.alterations) e4.includes(r2) && (t4 = a2(t4), n(l.isSchema(t4), "Alteration adjuster for", r2, "failed to return a schema object"));
              return (t4 = t4.$_modify({ each: (t5) => t5.tailor(e4), ref: false })).$_temp.ruleset = false, t4.$_mutateRebuild();
            }
            tracer() {
              return g.location ? g.location(this) : this;
            }
            validate(e4, t4) {
              return y.entry(e4, this, t4);
            }
            validateAsync(e4, t4) {
              return y.entryAsync(e4, this, t4);
            }
            $_addRule(e4) {
              for (let t5 in "string" == typeof e4 && (e4 = { name: e4 }), n(e4 && "object" == typeof e4, "Invalid options"), n(e4.name && "string" == typeof e4.name, "Invalid rule name"), e4) n("_" !== t5[0], "Cannot set private rule properties");
              let t4 = Object.assign({}, e4);
              t4._resolve = [], t4.method = t4.method || t4.name;
              let r2 = this._definition.rules[t4.method], a2 = t4.args;
              n(r2, "Unknown rule", t4.method);
              let i2 = this.clone();
              if (a2) for (let e5 in n(1 === Object.keys(a2).length || Object.keys(a2).length === this._definition.rules[t4.name].args.length, "Invalid rule definition for", this.type, t4.name), a2) {
                let s2 = a2[e5];
                if (r2.argsByName) {
                  let o2 = r2.argsByName.get(e5);
                  if (o2.ref && l.isResolvable(s2)) t4._resolve.push(e5), i2.$_mutateRegister(s2);
                  else if (o2.normalize && (s2 = o2.normalize(s2), a2[e5] = s2), o2.assert) {
                    let t5 = l.validateArg(s2, e5, o2);
                    n(!t5, t5, "or reference");
                  }
                }
                void 0 !== s2 ? a2[e5] = s2 : delete a2[e5];
              }
              return r2.multi || (i2._ruleRemove(t4.name, { clone: false }), i2._singleRules.set(t4.name, t4)), false === i2.$_temp.ruleset && (i2.$_temp.ruleset = null), r2.priority ? i2._rules.unshift(t4) : i2._rules.push(t4), i2;
            }
            $_compile(e4, t4) {
              return c.schema(this.$_root, e4, t4);
            }
            $_createError(e4, t4, r2, n2, a2, i2 = {}) {
              let s2 = false !== i2.flags ? this._flags : {}, o2 = i2.messages ? h.merge(this._definition.messages, i2.messages) : this._definition.messages;
              return new u.Report(e4, t4, r2, s2, o2, n2, a2);
            }
            $_getFlag(e4) {
              return this._flags[e4];
            }
            $_getRule(e4) {
              return this._singleRules.get(e4);
            }
            $_mapLabels(e4) {
              return e4 = Array.isArray(e4) ? e4 : e4.split("."), this._ids.labels(e4);
            }
            $_match(e4, t4, r2, n2) {
              (r2 = Object.assign({}, r2)).abortEarly = true, r2._externals = false, t4.snapshot();
              let a2 = !y.validate(e4, this, t4, r2, n2).errors;
              return t4.restore(), a2;
            }
            $_modify(e4) {
              return l.assertOptions(e4, ["each", "once", "ref", "schema"]), f.schema(this, e4) || this;
            }
            $_mutateRebuild() {
              return n(!this._inRuleset(), "Cannot add this rule inside a ruleset"), this._refs.reset(), this._ids.reset(), this.$_modify({ each: (e4, { source: t4, name: r2, path: n2, key: a2 }) => {
                let i2 = this._definition[t4][r2] && this._definition[t4][r2].register;
                false !== i2 && this.$_mutateRegister(e4, { family: i2, key: a2 });
              } }), this._definition.rebuild && this._definition.rebuild(this), this.$_temp.ruleset = false, this;
            }
            $_mutateRegister(e4, { family: t4, key: r2 } = {}) {
              this._refs.register(e4, t4), this._ids.register(e4, { key: r2 });
            }
            $_property(e4) {
              return this._definition.properties[e4];
            }
            $_reach(e4) {
              return this._ids.reach(e4);
            }
            $_rootReferences() {
              return this._refs.roots();
            }
            $_setFlag(e4, t4, r2 = {}) {
              n("_" === e4[0] || !this._inRuleset(), "Cannot set flag inside a ruleset");
              let a2 = this._definition.flags[e4] || {};
              if (i(t4, a2.default) && (t4 = void 0), i(t4, this._flags[e4])) return this;
              let s2 = false !== r2.clone ? this.clone() : this;
              return void 0 !== t4 ? (s2._flags[e4] = t4, s2.$_mutateRegister(t4)) : delete s2._flags[e4], "_" !== e4[0] && (s2.$_temp.ruleset = false), s2;
            }
            $_parent(e4, ...t4) {
              return this[e4][l.symbols.parent].call(this, ...t4);
            }
            $_validate(e4, t4, r2) {
              return y.validate(e4, this, t4, r2);
            }
            _assign(e4) {
              for (let t4 in e4.type = this.type, e4.$_root = this.$_root, e4.$_temp = Object.assign({}, this.$_temp), e4.$_temp.whens = {}, e4._ids = this._ids.clone(), e4._preferences = this._preferences, e4._valids = this._valids && this._valids.clone(), e4._invalids = this._invalids && this._invalids.clone(), e4._rules = this._rules.slice(), e4._singleRules = a(this._singleRules, { shallow: true }), e4._refs = this._refs.clone(), e4._flags = Object.assign({}, this._flags), e4._cache = null, e4.$_terms = {}, this.$_terms) e4.$_terms[t4] = this.$_terms[t4] ? this.$_terms[t4].slice() : null;
              for (let t4 in e4.$_super = {}, this.$_super) e4.$_super[t4] = this._super[t4].bind(e4);
              return e4;
            }
            _bare() {
              let e4 = this.clone();
              e4._reset();
              let t4 = e4._definition.terms;
              for (let r2 in t4) {
                let n2 = t4[r2];
                e4.$_terms[r2] = n2.init;
              }
              return e4.$_mutateRebuild();
            }
            _default(e4, t4, r2 = {}) {
              return l.assertOptions(r2, "literal"), n(void 0 !== t4, "Missing", e4, "value"), n("function" == typeof t4 || !r2.literal, "Only function value supports literal option"), "function" == typeof t4 && r2.literal && (t4 = { [l.symbols.literal]: true, literal: t4 }), this.$_setFlag(e4, t4);
            }
            _generate(e4, t4, r2) {
              if (!this.$_terms.whens) return { schema: this };
              let n2 = [], a2 = [];
              for (let i3 = 0; i3 < this.$_terms.whens.length; ++i3) {
                let s3 = this.$_terms.whens[i3];
                if (s3.concat) {
                  n2.push(s3.concat), a2.push(`${i3}.concat`);
                  continue;
                }
                let o2 = s3.ref ? s3.ref.resolve(e4, t4, r2) : e4, l2 = s3.is ? [s3] : s3.switch, c2 = a2.length;
                for (let c3 = 0; c3 < l2.length; ++c3) {
                  let { is: u2, then: d2, otherwise: p2 } = l2[c3], h2 = `${i3}${s3.switch ? "." + c3 : ""}`;
                  if (u2.$_match(o2, t4.nest(u2, `${h2}.is`), r2)) {
                    if (d2) {
                      let i4 = t4.localize([...t4.path, `${h2}.then`], t4.ancestors, t4.schemas), { schema: s4, id: o3 } = d2._generate(e4, i4, r2);
                      n2.push(s4), a2.push(`${h2}.then${o3 ? `(${o3})` : ""}`);
                      break;
                    }
                  } else if (p2) {
                    let i4 = t4.localize([...t4.path, `${h2}.otherwise`], t4.ancestors, t4.schemas), { schema: s4, id: o3 } = p2._generate(e4, i4, r2);
                    n2.push(s4), a2.push(`${h2}.otherwise${o3 ? `(${o3})` : ""}`);
                    break;
                  }
                }
                if (s3.break && a2.length > c2) break;
              }
              let i2 = a2.join(", ");
              if (t4.mainstay.tracer.debug(t4, "rule", "when", i2), !i2) return { schema: this };
              if (!t4.mainstay.tracer.active && this.$_temp.whens[i2]) return { schema: this.$_temp.whens[i2], id: i2 };
              let s2 = this;
              for (let a3 of (this._definition.generate && (s2 = this._definition.generate(this, e4, t4, r2)), n2)) s2 = s2.concat(a3);
              return this.$_root._tracer && this.$_root._tracer._combine(s2, [this, ...n2]), this.$_temp.whens[i2] = s2, { schema: s2, id: i2 };
            }
            _inner(e4, t4, r2 = {}) {
              n(!this._inRuleset(), `Cannot set ${e4} inside a ruleset`);
              let a2 = this.clone();
              return a2.$_terms[e4] && !r2.override || (a2.$_terms[e4] = []), r2.single ? a2.$_terms[e4].push(t4) : a2.$_terms[e4].push(...t4), a2.$_temp.ruleset = false, a2;
            }
            _inRuleset() {
              return null !== this.$_temp.ruleset && false !== this.$_temp.ruleset;
            }
            _ruleRemove(e4, t4 = {}) {
              if (!this._singleRules.has(e4)) return this;
              let r2 = false !== t4.clone ? this.clone() : this;
              r2._singleRules.delete(e4);
              let n2 = [];
              for (let t5 = 0; t5 < r2._rules.length; ++t5) {
                let a2 = r2._rules[t5];
                a2.name !== e4 || a2.keep ? n2.push(a2) : r2._inRuleset() && t5 < r2.$_temp.ruleset && --r2.$_temp.ruleset;
              }
              return r2._rules = n2, r2;
            }
            _values(e4, t4) {
              l.verifyFlat(e4, t4.slice(1, -1));
              let r2 = this.clone(), a2 = e4[0] === l.symbols.override;
              if (a2 && (e4 = e4.slice(1)), !r2[t4] && e4.length ? r2[t4] = new b() : a2 && (r2[t4] = e4.length ? new b() : null, r2.$_mutateRebuild()), !r2[t4]) return r2;
              for (let i2 of (a2 && r2[t4].override(), e4)) {
                n(void 0 !== i2, "Cannot call allow/valid/invalid with undefined"), n(i2 !== l.symbols.override, "Override must be the first value");
                let e5 = "_invalids" === t4 ? "_valids" : "_invalids";
                r2[e5] && (r2[e5].remove(i2), r2[e5].length || (n("_valids" === t4 || !r2._flags.only, "Setting invalid value", i2, "leaves schema rejecting all values due to previous valid rule"), r2[e5] = null)), r2[t4].add(i2, r2._refs);
              }
              return r2;
            }
          } };
          w.Base.prototype[l.symbols.any] = { version: l.version, compile: c.compile, root: "$_root" }, w.Base.prototype.isImmutable = true, w.Base.prototype.deny = w.Base.prototype.invalid, w.Base.prototype.disallow = w.Base.prototype.invalid, w.Base.prototype.equal = w.Base.prototype.valid, w.Base.prototype.exist = w.Base.prototype.required, w.Base.prototype.not = w.Base.prototype.invalid, w.Base.prototype.options = w.Base.prototype.prefs, w.Base.prototype.preferences = w.Base.prototype.prefs, e3.exports = new w.Base();
        }, 8652: (e3, t3, r) => {
          "use strict";
          let n = r(375), a = r(8571), i = r(8160), s = { max: 1e3, supported: /* @__PURE__ */ new Set(["undefined", "boolean", "number", "string"]) };
          t3.provider = { provision: (e4) => new s.Cache(e4) }, s.Cache = class {
            constructor(e4 = {}) {
              i.assertOptions(e4, ["max"]), n(void 0 === e4.max || e4.max && e4.max > 0 && isFinite(e4.max), "Invalid max cache size"), this._max = e4.max || s.max, this._map = /* @__PURE__ */ new Map(), this._list = new s.List();
            }
            get length() {
              return this._map.size;
            }
            set(e4, t4) {
              if (null !== e4 && !s.supported.has(typeof e4)) return;
              let r2 = this._map.get(e4);
              if (r2) return r2.value = t4, void this._list.first(r2);
              r2 = this._list.unshift({ key: e4, value: t4 }), this._map.set(e4, r2), this._compact();
            }
            get(e4) {
              let t4 = this._map.get(e4);
              if (t4) return this._list.first(t4), a(t4.value);
            }
            _compact() {
              if (this._map.size > this._max) {
                let e4 = this._list.pop();
                this._map.delete(e4.key);
              }
            }
          }, s.List = class {
            constructor() {
              this.tail = null, this.head = null;
            }
            unshift(e4) {
              return e4.next = null, e4.prev = this.head, this.head && (this.head.next = e4), this.head = e4, this.tail || (this.tail = e4), e4;
            }
            first(e4) {
              e4 !== this.head && (this._remove(e4), this.unshift(e4));
            }
            pop() {
              return this._remove(this.tail);
            }
            _remove(e4) {
              let { next: t4, prev: r2 } = e4;
              return t4.prev = r2, r2 && (r2.next = t4), e4 === this.tail && (this.tail = t4), e4.prev = null, e4.next = null, e4;
            }
          };
        }, 8160: (e3, t3, r) => {
          "use strict";
          let n, a;
          let i = r(375), s = r(7916), o = r(5934), l = { isoDate: /^(?:[-+]\d{2})?(?:\d{4}(?!\d{2}\b))(?:(-?)(?:(?:0[1-9]|1[0-2])(?:\1(?:[12]\d|0[1-9]|3[01]))?|W(?:[0-4]\d|5[0-2])(?:-?[1-7])?|(?:00[1-9]|0[1-9]\d|[12]\d{2}|3(?:[0-5]\d|6[1-6])))(?![T]$|[T][\d]+Z$)(?:[T\s](?:(?:(?:[01]\d|2[0-3])(?:(:?)[0-5]\d)?|24\:?00)(?:[.,]\d+(?!:))?)(?:\2[0-5]\d(?:[.,]\d+)?)?(?:[Z]|(?:[+-])(?:[01]\d|2[0-3])(?::?[0-5]\d)?)?)?)?$/ };
          t3.version = o.version, t3.defaults = { abortEarly: true, allowUnknown: false, artifacts: false, cache: true, context: null, convert: true, dateFormat: "iso", errors: { escapeHtml: false, label: "path", language: null, render: true, stack: false, wrap: { label: '"', array: "[]" } }, externals: true, messages: {}, nonEnumerables: false, noDefaults: false, presence: "optional", skipFunctions: false, stripUnknown: false, warnings: false }, t3.symbols = { any: Symbol.for("@hapi/joi/schema"), arraySingle: Symbol("arraySingle"), deepDefault: Symbol("deepDefault"), errors: Symbol("errors"), literal: Symbol("literal"), override: Symbol("override"), parent: Symbol("parent"), prefs: Symbol("prefs"), ref: Symbol("ref"), template: Symbol("template"), values: Symbol("values") }, t3.assertOptions = function(e4, t4, r2 = "Options") {
            i(e4 && "object" == typeof e4 && !Array.isArray(e4), "Options must be of type object");
            let n2 = Object.keys(e4).filter((e5) => !t4.includes(e5));
            i(0 === n2.length, `${r2} contain unknown keys: ${n2}`);
          }, t3.checkPreferences = function(e4) {
            let t4 = (a = a || r(3378)).preferences.validate(e4);
            if (t4.error) throw new s([t4.error.details[0].message]);
          }, t3.compare = function(e4, t4, r2) {
            switch (r2) {
              case "=":
                return e4 === t4;
              case ">":
                return e4 > t4;
              case "<":
                return e4 < t4;
              case ">=":
                return e4 >= t4;
              case "<=":
                return e4 <= t4;
            }
          }, t3.default = function(e4, t4) {
            return void 0 === e4 ? t4 : e4;
          }, t3.isIsoDate = function(e4) {
            return l.isoDate.test(e4);
          }, t3.isNumber = function(e4) {
            return "number" == typeof e4 && !isNaN(e4);
          }, t3.isResolvable = function(e4) {
            return !!e4 && (e4[t3.symbols.ref] || e4[t3.symbols.template]);
          }, t3.isSchema = function(e4, r2 = {}) {
            let n2 = e4 && e4[t3.symbols.any];
            return !!n2 && (i(r2.legacy || n2.version === t3.version, "Cannot mix different versions of joi schemas"), true);
          }, t3.isValues = function(e4) {
            return e4[t3.symbols.values];
          }, t3.limit = function(e4) {
            return Number.isSafeInteger(e4) && e4 >= 0;
          }, t3.preferences = function(e4, a2) {
            n = n || r(6914);
            let i2 = Object.assign({}, e4 = e4 || {}, a2 = a2 || {});
            return a2.errors && e4.errors && (i2.errors = Object.assign({}, e4.errors, a2.errors), i2.errors.wrap = Object.assign({}, e4.errors.wrap, a2.errors.wrap)), a2.messages && (i2.messages = n.compile(a2.messages, e4.messages)), delete i2[t3.symbols.prefs], i2;
          }, t3.tryWithPath = function(e4, t4, r2 = {}) {
            try {
              return e4();
            } catch (e5) {
              throw void 0 !== e5.path ? e5.path = t4 + "." + e5.path : e5.path = t4, r2.append && (e5.message = `${e5.message} (${e5.path})`), e5;
            }
          }, t3.validateArg = function(e4, r2, { assert: n2, message: a2 }) {
            if (t3.isSchema(n2)) {
              let t4 = n2.validate(e4);
              if (!t4.error) return;
              return t4.error.message;
            }
            if (!n2(e4)) return r2 ? `${r2} ${a2}` : a2;
          }, t3.verifyFlat = function(e4, t4) {
            for (let r2 of e4) i(!Array.isArray(r2), "Method no longer accepts array arguments:", t4);
          };
        }, 3292: (e3, t3, r) => {
          "use strict";
          let n = r(375), a = r(8160), i = r(6133), s = {};
          t3.schema = function(e4, t4, r2 = {}) {
            a.assertOptions(r2, ["appendPath", "override"]);
            try {
              return s.schema(e4, t4, r2);
            } catch (e5) {
              throw r2.appendPath && void 0 !== e5.path && (e5.message = `${e5.message} (${e5.path})`), e5;
            }
          }, s.schema = function(e4, t4, r2) {
            n(void 0 !== t4, "Invalid undefined schema"), Array.isArray(t4) && (n(t4.length, "Invalid empty array schema"), 1 === t4.length && (t4 = t4[0]));
            let i2 = (t5, ...n2) => false !== r2.override ? t5.valid(e4.override, ...n2) : t5.valid(...n2);
            if (s.simple(t4)) return i2(e4, t4);
            if ("function" == typeof t4) return e4.custom(t4);
            if (n("object" == typeof t4, "Invalid schema content:", typeof t4), a.isResolvable(t4)) return i2(e4, t4);
            if (a.isSchema(t4)) return t4;
            if (Array.isArray(t4)) {
              for (let r3 of t4) if (!s.simple(r3)) return e4.alternatives().try(...t4);
              return i2(e4, ...t4);
            }
            return t4 instanceof RegExp ? e4.string().regex(t4) : t4 instanceof Date ? i2(e4.date(), t4) : (n(Object.getPrototypeOf(t4) === Object.getPrototypeOf({}), "Schema can only contain plain objects"), e4.object().keys(t4));
          }, t3.ref = function(e4, t4) {
            return i.isRef(e4) ? e4 : i.create(e4, t4);
          }, t3.compile = function(e4, r2, i2 = {}) {
            a.assertOptions(i2, ["legacy"]);
            let o = r2 && r2[a.symbols.any];
            if (o) return n(i2.legacy || o.version === a.version, "Cannot mix different versions of joi schemas:", o.version, a.version), r2;
            if ("object" != typeof r2 || !i2.legacy) return t3.schema(e4, r2, { appendPath: true });
            let l = s.walk(r2);
            return l ? l.compile(l.root, r2) : t3.schema(e4, r2, { appendPath: true });
          }, s.walk = function(e4) {
            if ("object" != typeof e4) return null;
            if (Array.isArray(e4)) {
              for (let t5 of e4) {
                let e5 = s.walk(t5);
                if (e5) return e5;
              }
              return null;
            }
            let t4 = e4[a.symbols.any];
            if (t4) return { root: e4[t4.root], compile: t4.compile };
            for (let t5 in n(Object.getPrototypeOf(e4) === Object.getPrototypeOf({}), "Schema can only contain plain objects"), e4) {
              let r2 = s.walk(e4[t5]);
              if (r2) return r2;
            }
            return null;
          }, s.simple = function(e4) {
            return null === e4 || ["boolean", "string", "number"].includes(typeof e4);
          }, t3.when = function(e4, r2, o) {
            if (void 0 === o && (n(r2 && "object" == typeof r2, "Missing options"), o = r2, r2 = i.create(".")), Array.isArray(o) && (o = { switch: o }), a.assertOptions(o, ["is", "not", "then", "otherwise", "switch", "break"]), a.isSchema(r2)) return n(void 0 === o.is, '"is" can not be used with a schema condition'), n(void 0 === o.not, '"not" can not be used with a schema condition'), n(void 0 === o.switch, '"switch" can not be used with a schema condition'), s.condition(e4, { is: r2, then: o.then, otherwise: o.otherwise, break: o.break });
            if (n(i.isRef(r2) || "string" == typeof r2, "Invalid condition:", r2), n(void 0 === o.not || void 0 === o.is, 'Cannot combine "is" with "not"'), void 0 === o.switch) {
              let l2 = o;
              void 0 !== o.not && (l2 = { is: o.not, then: o.otherwise, otherwise: o.then, break: o.break });
              let c = void 0 !== l2.is ? e4.$_compile(l2.is) : e4.$_root.invalid(null, false, 0, "").required();
              return n(void 0 !== l2.then || void 0 !== l2.otherwise, 'options must have at least one of "then", "otherwise", or "switch"'), n(void 0 === l2.break || void 0 === l2.then || void 0 === l2.otherwise, "Cannot specify then, otherwise, and break all together"), void 0 === o.is || i.isRef(o.is) || a.isSchema(o.is) || (c = c.required()), s.condition(e4, { ref: t3.ref(r2), is: c, then: l2.then, otherwise: l2.otherwise, break: l2.break });
            }
            n(Array.isArray(o.switch), '"switch" must be an array'), n(void 0 === o.is, 'Cannot combine "switch" with "is"'), n(void 0 === o.not, 'Cannot combine "switch" with "not"'), n(void 0 === o.then, 'Cannot combine "switch" with "then"');
            let l = { ref: t3.ref(r2), switch: [], break: o.break };
            for (let t4 = 0; t4 < o.switch.length; ++t4) {
              let r3 = o.switch[t4], s2 = t4 === o.switch.length - 1;
              a.assertOptions(r3, s2 ? ["is", "then", "otherwise"] : ["is", "then"]), n(void 0 !== r3.is, 'Switch statement missing "is"'), n(void 0 !== r3.then, 'Switch statement missing "then"');
              let c = { is: e4.$_compile(r3.is), then: e4.$_compile(r3.then) };
              if (i.isRef(r3.is) || a.isSchema(r3.is) || (c.is = c.is.required()), s2) {
                n(void 0 === o.otherwise || void 0 === r3.otherwise, 'Cannot specify "otherwise" inside and outside a "switch"');
                let t5 = void 0 !== o.otherwise ? o.otherwise : r3.otherwise;
                void 0 !== t5 && (n(void 0 === l.break, "Cannot specify both otherwise and break"), c.otherwise = e4.$_compile(t5));
              }
              l.switch.push(c);
            }
            return l;
          }, s.condition = function(e4, t4) {
            for (let r2 of ["then", "otherwise"]) void 0 === t4[r2] ? delete t4[r2] : t4[r2] = e4.$_compile(t4[r2]);
            return t4;
          };
        }, 6354: (e3, t3, r) => {
          "use strict";
          let n = r(5688), a = r(8160), i = r(3328);
          t3.Report = class {
            constructor(e4, r2, n2, a2, i2, s, o) {
              if (this.code = e4, this.flags = a2, this.messages = i2, this.path = s.path, this.prefs = o, this.state = s, this.value = r2, this.message = null, this.template = null, this.local = n2 || {}, this.local.label = t3.label(this.flags, this.state, this.prefs, this.messages), void 0 === this.value || this.local.hasOwnProperty("value") || (this.local.value = this.value), this.path.length) {
                let e5 = this.path[this.path.length - 1];
                "object" != typeof e5 && (this.local.key = e5);
              }
            }
            _setTemplate(e4) {
              if (this.template = e4, !this.flags.label && 0 === this.path.length) {
                let e5 = this._template(this.template, "root");
                e5 && (this.local.label = e5);
              }
            }
            toString() {
              if (this.message) return this.message;
              let e4 = this.code;
              if (!this.prefs.errors.render) return this.code;
              let t4 = this._template(this.template) || this._template(this.prefs.messages) || this._template(this.messages);
              return void 0 === t4 ? `Error code "${e4}" is not defined, your custom type is missing the correct messages definition` : (this.message = t4.render(this.value, this.state, this.prefs, this.local, { errors: this.prefs.errors, messages: [this.prefs.messages, this.messages] }), this.prefs.errors.label || (this.message = this.message.replace(/^"" /, "").trim()), this.message);
            }
            _template(e4, r2) {
              return t3.template(this.value, e4, r2 || this.code, this.state, this.prefs);
            }
          }, t3.path = function(e4) {
            let t4 = "";
            for (let r2 of e4) "object" != typeof r2 && ("string" == typeof r2 ? (t4 && (t4 += "."), t4 += r2) : t4 += `[${r2}]`);
            return t4;
          }, t3.template = function(e4, t4, r2, n2, s) {
            if (!t4) return;
            if (i.isTemplate(t4)) return "root" !== r2 ? t4 : null;
            let o = s.errors.language;
            if (a.isResolvable(o) && (o = o.resolve(e4, n2, s)), o && t4[o]) {
              if (void 0 !== t4[o][r2]) return t4[o][r2];
              if (void 0 !== t4[o]["*"]) return t4[o]["*"];
            }
            return t4[r2] ? t4[r2] : t4["*"];
          }, t3.label = function(e4, r2, n2, a2) {
            if (!n2.errors.label) return "";
            if (e4.label) return e4.label;
            let i2 = r2.path;
            return "key" === n2.errors.label && r2.path.length > 1 && (i2 = r2.path.slice(-1)), t3.path(i2) || t3.template(null, n2.messages, "root", r2, n2) || a2 && t3.template(null, a2, "root", r2, n2) || "value";
          }, t3.process = function(e4, r2, n2) {
            if (!e4) return null;
            let { override: a2, message: i2, details: s } = t3.details(e4);
            if (a2) return a2;
            if (n2.errors.stack) return new t3.ValidationError(i2, s, r2);
            let o = Error.stackTraceLimit;
            Error.stackTraceLimit = 0;
            let l = new t3.ValidationError(i2, s, r2);
            return Error.stackTraceLimit = o, l;
          }, t3.details = function(e4, t4 = {}) {
            let r2 = [], n2 = [];
            for (let a2 of e4) {
              if (a2 instanceof Error) {
                if (false !== t4.override) return { override: a2 };
                let e6 = a2.toString();
                r2.push(e6), n2.push({ message: e6, type: "override", context: { error: a2 } });
                continue;
              }
              let e5 = a2.toString();
              r2.push(e5), n2.push({ message: e5, path: a2.path.filter((e6) => "object" != typeof e6), type: a2.code, context: a2.local });
            }
            return r2.length > 1 && (r2 = [...new Set(r2)]), { message: r2.join(". "), details: n2 };
          }, t3.ValidationError = class extends Error {
            constructor(e4, t4, r2) {
              super(e4), this._original = r2, this.details = t4;
            }
            static isError(e4) {
              return e4 instanceof t3.ValidationError;
            }
          }, t3.ValidationError.prototype.isJoi = true, t3.ValidationError.prototype.name = "ValidationError", t3.ValidationError.prototype.annotate = n.error;
        }, 8901: (e3, t3, r) => {
          "use strict";
          let n = r(375), a = r(8571), i = r(8160), s = r(6914), o = {};
          t3.type = function(e4, t4) {
            let r2 = Object.getPrototypeOf(e4), l = a(r2), c = e4._assign(Object.create(l)), u = Object.assign({}, t4);
            delete u.base, l._definition = u;
            let d = r2._definition || {};
            u.messages = s.merge(d.messages, u.messages), u.properties = Object.assign({}, d.properties, u.properties), c.type = u.type, u.flags = Object.assign({}, d.flags, u.flags);
            let p = Object.assign({}, d.terms);
            if (u.terms) for (let e5 in u.terms) {
              let t5 = u.terms[e5];
              n(void 0 === c.$_terms[e5], "Invalid term override for", u.type, e5), c.$_terms[e5] = t5.init, p[e5] = t5;
            }
            u.terms = p, u.args || (u.args = d.args), u.prepare = o.prepare(u.prepare, d.prepare), u.coerce && ("function" == typeof u.coerce && (u.coerce = { method: u.coerce }), u.coerce.from && !Array.isArray(u.coerce.from) && (u.coerce = { method: u.coerce.method, from: [].concat(u.coerce.from) })), u.coerce = o.coerce(u.coerce, d.coerce), u.validate = o.validate(u.validate, d.validate);
            let h = Object.assign({}, d.rules);
            if (u.rules) for (let e5 in u.rules) {
              let t5 = u.rules[e5];
              n("object" == typeof t5, "Invalid rule definition for", u.type, e5);
              let r3 = t5.method;
              if (void 0 === r3 && (r3 = function() {
                return this.$_addRule(e5);
              }), r3 && (n(!l[e5], "Rule conflict in", u.type, e5), l[e5] = r3), n(!h[e5], "Rule conflict in", u.type, e5), h[e5] = t5, t5.alias) for (let e6 of [].concat(t5.alias)) l[e6] = t5.method;
              t5.args && (t5.argsByName = /* @__PURE__ */ new Map(), t5.args = t5.args.map((e6) => ("string" == typeof e6 && (e6 = { name: e6 }), n(!t5.argsByName.has(e6.name), "Duplicated argument name", e6.name), i.isSchema(e6.assert) && (e6.assert = e6.assert.strict().label(e6.name)), t5.argsByName.set(e6.name, e6), e6)));
            }
            u.rules = h;
            let f = Object.assign({}, d.modifiers);
            if (u.modifiers) for (let e5 in u.modifiers) {
              n(!l[e5], "Rule conflict in", u.type, e5);
              let t5 = u.modifiers[e5];
              n("function" == typeof t5, "Invalid modifier definition for", u.type, e5);
              let r3 = function(t6) {
                return this.rule({ [e5]: t6 });
              };
              l[e5] = r3, f[e5] = t5;
            }
            if (u.modifiers = f, u.overrides) {
              for (let e5 in l._super = r2, c.$_super = {}, u.overrides) n(r2[e5], "Cannot override missing", e5), u.overrides[e5][i.symbols.parent] = r2[e5], c.$_super[e5] = r2[e5].bind(c);
              Object.assign(l, u.overrides);
            }
            u.cast = Object.assign({}, d.cast, u.cast);
            let m = Object.assign({}, d.manifest, u.manifest);
            return m.build = o.build(u.manifest && u.manifest.build, d.manifest && d.manifest.build), u.manifest = m, u.rebuild = o.rebuild(u.rebuild, d.rebuild), c;
          }, o.build = function(e4, t4) {
            return e4 && t4 ? function(r2, n2) {
              return t4(e4(r2, n2), n2);
            } : e4 || t4;
          }, o.coerce = function(e4, t4) {
            return e4 && t4 ? { from: e4.from && t4.from ? [.../* @__PURE__ */ new Set([...e4.from, ...t4.from])] : null, method(r2, n2) {
              let a2;
              if ((!t4.from || t4.from.includes(typeof r2)) && (a2 = t4.method(r2, n2))) {
                if (a2.errors || void 0 === a2.value) return a2;
                r2 = a2.value;
              }
              if (!e4.from || e4.from.includes(typeof r2)) {
                let t5 = e4.method(r2, n2);
                if (t5) return t5;
              }
              return a2;
            } } : e4 || t4;
          }, o.prepare = function(e4, t4) {
            return e4 && t4 ? function(r2, n2) {
              let a2 = e4(r2, n2);
              if (a2) {
                if (a2.errors || void 0 === a2.value) return a2;
                r2 = a2.value;
              }
              return t4(r2, n2) || a2;
            } : e4 || t4;
          }, o.rebuild = function(e4, t4) {
            return e4 && t4 ? function(r2) {
              t4(r2), e4(r2);
            } : e4 || t4;
          }, o.validate = function(e4, t4) {
            return e4 && t4 ? function(r2, n2) {
              let a2 = t4(r2, n2);
              if (a2) {
                if (a2.errors && (!Array.isArray(a2.errors) || a2.errors.length)) return a2;
                r2 = a2.value;
              }
              return e4(r2, n2) || a2;
            } : e4 || t4;
          };
        }, 5107: (e3, t3, r) => {
          "use strict";
          let n;
          let a = r(375), i = r(8571), s = r(8652), o = r(8160), l = r(3292), c = r(6354), u = r(8901), d = r(9708), p = r(6133), h = r(3328), f = r(1152), m = { types: { alternatives: r(4946), any: r(8068), array: r(546), boolean: r(4937), date: r(7500), function: r(390), link: r(8785), number: r(3832), object: r(8966), string: r(7417), symbol: r(8826) }, aliases: { alt: "alternatives", bool: "boolean", func: "function" }, root: function() {
            let e4 = { _types: new Set(Object.keys(m.types)) };
            for (let t4 of e4._types) e4[t4] = function(...e5) {
              return a(!e5.length || ["alternatives", "link", "object"].includes(t4), "The", t4, "type does not allow arguments"), m.generate(this, m.types[t4], e5);
            };
            for (let t4 of ["allow", "custom", "disallow", "equal", "exist", "forbidden", "invalid", "not", "only", "optional", "options", "prefs", "preferences", "required", "strip", "valid", "when"]) e4[t4] = function(...e5) {
              return this.any()[t4](...e5);
            };
            for (let t4 in Object.assign(e4, m.methods), m.aliases) {
              let r2 = m.aliases[t4];
              e4[t4] = e4[r2];
            }
            return e4.x = e4.expression, f.setup && f.setup(e4), e4;
          } };
          m.methods = { ValidationError: c.ValidationError, version: o.version, cache: s.provider, assert(e4, t4, ...r2) {
            m.assert(e4, t4, true, r2);
          }, attempt: (e4, t4, ...r2) => m.assert(e4, t4, false, r2), build(e4) {
            return a("function" == typeof d.build, "Manifest functionality disabled"), d.build(this, e4);
          }, checkPreferences(e4) {
            o.checkPreferences(e4);
          }, compile(e4, t4) {
            return l.compile(this, e4, t4);
          }, defaults(e4) {
            a("function" == typeof e4, "modifier must be a function");
            let t4 = Object.assign({}, this);
            for (let r2 of t4._types) {
              let n2 = e4(t4[r2]());
              a(o.isSchema(n2), "modifier must return a valid schema object"), t4[r2] = function(...e5) {
                return m.generate(this, n2, e5);
              };
            }
            return t4;
          }, expression: (...e4) => new h(...e4), extend(...e4) {
            o.verifyFlat(e4, "extend"), n = n || r(3378), a(e4.length, "You need to provide at least one extension"), this.assert(e4, n.extensions);
            let t4 = Object.assign({}, this);
            for (let r2 of (t4._types = new Set(t4._types), e4)) for (let e5 of ("function" == typeof r2 && (r2 = r2(t4)), this.assert(r2, n.extension), m.expandExtension(r2, t4))) {
              a(void 0 === t4[e5.type] || t4._types.has(e5.type), "Cannot override name", e5.type);
              let r3 = e5.base || this.any(), n2 = u.type(r3, e5);
              t4._types.add(e5.type), t4[e5.type] = function(...e6) {
                return m.generate(this, n2, e6);
              };
            }
            return t4;
          }, isError: c.ValidationError.isError, isExpression: h.isTemplate, isRef: p.isRef, isSchema: o.isSchema, in: (...e4) => p.in(...e4), override: o.symbols.override, ref: (...e4) => p.create(...e4), types() {
            let e4 = {};
            for (let t4 of this._types) e4[t4] = this[t4]();
            for (let t4 in m.aliases) e4[t4] = this[t4]();
            return e4;
          } }, m.assert = function(e4, t4, r2, n2) {
            let a2 = n2[0] instanceof Error || "string" == typeof n2[0] ? n2[0] : null, s2 = null !== a2 ? n2[1] : n2[0], l2 = t4.validate(e4, o.preferences({ errors: { stack: true } }, s2 || {})), u2 = l2.error;
            if (!u2) return l2.value;
            if (a2 instanceof Error) throw a2;
            let d2 = r2 && "function" == typeof u2.annotate ? u2.annotate() : u2.message;
            throw u2 instanceof c.ValidationError == 0 && (u2 = i(u2)), u2.message = a2 ? `${a2} ${d2}` : d2, u2;
          }, m.generate = function(e4, t4, r2) {
            return a(e4, "Must be invoked on a Joi instance."), t4.$_root = e4, t4._definition.args && r2.length ? t4._definition.args(t4, ...r2) : t4;
          }, m.expandExtension = function(e4, t4) {
            if ("string" == typeof e4.type) return [e4];
            let r2 = [];
            for (let n2 of t4._types) if (e4.type.test(n2)) {
              let a2 = Object.assign({}, e4);
              a2.type = n2, a2.base = t4[n2](), r2.push(a2);
            }
            return r2;
          }, e3.exports = m.root();
        }, 6914: (e3, t3, r) => {
          "use strict";
          let n = r(375), a = r(8571), i = r(3328);
          t3.compile = function(e4, t4) {
            if ("string" == typeof e4) return n(!t4, "Cannot set single message string"), new i(e4);
            if (i.isTemplate(e4)) return n(!t4, "Cannot set single message template"), e4;
            for (let r2 in n("object" == typeof e4 && !Array.isArray(e4), "Invalid message options"), t4 = t4 ? a(t4) : {}, e4) {
              let a2 = e4[r2];
              if ("root" === r2 || i.isTemplate(a2)) {
                t4[r2] = a2;
                continue;
              }
              if ("string" == typeof a2) {
                t4[r2] = new i(a2);
                continue;
              }
              n("object" == typeof a2 && !Array.isArray(a2), "Invalid message for", r2);
              let s = r2;
              for (r2 in t4[s] = t4[s] || {}, a2) {
                let e5 = a2[r2];
                "root" === r2 || i.isTemplate(e5) ? t4[s][r2] = e5 : (n("string" == typeof e5, "Invalid message for", r2, "in", s), t4[s][r2] = new i(e5));
              }
            }
            return t4;
          }, t3.decompile = function(e4) {
            let t4 = {};
            for (let r2 in e4) {
              let n2 = e4[r2];
              if ("root" === r2) {
                t4.root = n2;
                continue;
              }
              if (i.isTemplate(n2)) {
                t4[r2] = n2.describe({ compact: true });
                continue;
              }
              let a2 = r2;
              for (r2 in t4[a2] = {}, n2) {
                let e5 = n2[r2];
                "root" !== r2 ? t4[a2][r2] = e5.describe({ compact: true }) : t4[a2].root = e5;
              }
            }
            return t4;
          }, t3.merge = function(e4, r2) {
            if (!e4) return t3.compile(r2);
            if (!r2) return e4;
            if ("string" == typeof r2) return new i(r2);
            if (i.isTemplate(r2)) return r2;
            let s = a(e4);
            for (let e5 in r2) {
              let t4 = r2[e5];
              if ("root" === e5 || i.isTemplate(t4)) {
                s[e5] = t4;
                continue;
              }
              if ("string" == typeof t4) {
                s[e5] = new i(t4);
                continue;
              }
              n("object" == typeof t4 && !Array.isArray(t4), "Invalid message for", e5);
              let a2 = e5;
              for (e5 in s[a2] = s[a2] || {}, t4) {
                let r3 = t4[e5];
                "root" === e5 || i.isTemplate(r3) ? s[a2][e5] = r3 : (n("string" == typeof r3, "Invalid message for", e5, "in", a2), s[a2][e5] = new i(r3));
              }
            }
            return s;
          };
        }, 2294: (e3, t3, r) => {
          "use strict";
          let n = r(375), a = r(8160), i = r(6133), s = {};
          t3.Ids = s.Ids = class {
            constructor() {
              this._byId = /* @__PURE__ */ new Map(), this._byKey = /* @__PURE__ */ new Map(), this._schemaChain = false;
            }
            clone() {
              let e4 = new s.Ids();
              return e4._byId = new Map(this._byId), e4._byKey = new Map(this._byKey), e4._schemaChain = this._schemaChain, e4;
            }
            concat(e4) {
              for (let [t4, r2] of (e4._schemaChain && (this._schemaChain = true), e4._byId.entries())) n(!this._byKey.has(t4), "Schema id conflicts with existing key:", t4), this._byId.set(t4, r2);
              for (let [t4, r2] of e4._byKey.entries()) n(!this._byId.has(t4), "Schema key conflicts with existing id:", t4), this._byKey.set(t4, r2);
            }
            fork(e4, t4, r2) {
              let i2 = this._collect(e4);
              i2.push({ schema: r2 });
              let o = i2.shift(), l = { id: o.id, schema: t4(o.schema) };
              for (let e5 of (n(a.isSchema(l.schema), "adjuster function failed to return a joi schema type"), i2)) l = { id: e5.id, schema: s.fork(e5.schema, l.id, l.schema) };
              return l.schema;
            }
            labels(e4, t4 = []) {
              let r2 = e4[0], n2 = this._get(r2);
              if (!n2) return [...t4, ...e4].join(".");
              let a2 = e4.slice(1);
              return t4 = [...t4, n2.schema._flags.label || r2], a2.length ? n2.schema._ids.labels(a2, t4) : t4.join(".");
            }
            reach(e4, t4 = []) {
              let r2 = e4[0], a2 = this._get(r2);
              n(a2, "Schema does not contain path", [...t4, ...e4].join("."));
              let i2 = e4.slice(1);
              return i2.length ? a2.schema._ids.reach(i2, [...t4, r2]) : a2.schema;
            }
            register(e4, { key: t4 } = {}) {
              if (!e4 || !a.isSchema(e4)) return;
              (e4.$_property("schemaChain") || e4._ids._schemaChain) && (this._schemaChain = true);
              let r2 = e4._flags.id;
              if (r2) {
                let t5 = this._byId.get(r2);
                n(!t5 || t5.schema === e4, "Cannot add different schemas with the same id:", r2), n(!this._byKey.has(r2), "Schema id conflicts with existing key:", r2), this._byId.set(r2, { schema: e4, id: r2 });
              }
              t4 && (n(!this._byKey.has(t4), "Schema already contains key:", t4), n(!this._byId.has(t4), "Schema key conflicts with existing id:", t4), this._byKey.set(t4, { schema: e4, id: t4 }));
            }
            reset() {
              this._byId = /* @__PURE__ */ new Map(), this._byKey = /* @__PURE__ */ new Map(), this._schemaChain = false;
            }
            _collect(e4, t4 = [], r2 = []) {
              let a2 = e4[0], i2 = this._get(a2);
              n(i2, "Schema does not contain path", [...t4, ...e4].join(".")), r2 = [i2, ...r2];
              let s2 = e4.slice(1);
              return s2.length ? i2.schema._ids._collect(s2, [...t4, a2], r2) : r2;
            }
            _get(e4) {
              return this._byId.get(e4) || this._byKey.get(e4);
            }
          }, s.fork = function(e4, r2, n2) {
            let a2 = t3.schema(e4, { each: (e5, { key: t4 }) => {
              if (r2 === (e5._flags.id || t4)) return n2;
            }, ref: false });
            return a2 ? a2.$_mutateRebuild() : e4;
          }, t3.schema = function(e4, t4) {
            let r2;
            for (let n2 in e4._flags) {
              if ("_" === n2[0]) continue;
              let a2 = s.scan(e4._flags[n2], { source: "flags", name: n2 }, t4);
              void 0 !== a2 && ((r2 = r2 || e4.clone())._flags[n2] = a2);
            }
            for (let n2 = 0; n2 < e4._rules.length; ++n2) {
              let a2 = e4._rules[n2], i2 = s.scan(a2.args, { source: "rules", name: a2.name }, t4);
              if (void 0 !== i2) {
                r2 = r2 || e4.clone();
                let t5 = Object.assign({}, a2);
                t5.args = i2, r2._rules[n2] = t5, r2._singleRules.get(a2.name) === a2 && r2._singleRules.set(a2.name, t5);
              }
            }
            for (let n2 in e4.$_terms) {
              if ("_" === n2[0]) continue;
              let a2 = s.scan(e4.$_terms[n2], { source: "terms", name: n2 }, t4);
              void 0 !== a2 && ((r2 = r2 || e4.clone()).$_terms[n2] = a2);
            }
            return r2;
          }, s.scan = function(e4, t4, r2, n2, o) {
            let l;
            let c = n2 || [];
            if (null !== e4 && "object" == typeof e4) {
              if (Array.isArray(e4)) {
                for (let n3 = 0; n3 < e4.length; ++n3) {
                  let a2 = "terms" === t4.source && "keys" === t4.name && e4[n3].key, i2 = s.scan(e4[n3], t4, r2, [n3, ...c], a2);
                  void 0 !== i2 && ((l = l || e4.slice())[n3] = i2);
                }
                return l;
              }
              if (false !== r2.schema && a.isSchema(e4) || false !== r2.ref && i.isRef(e4)) {
                let n3 = r2.each(e4, { ...t4, path: c, key: o });
                if (n3 === e4) return;
                return n3;
              }
              for (let n3 in e4) {
                if ("_" === n3[0]) continue;
                let a2 = s.scan(e4[n3], t4, r2, [n3, ...c], o);
                void 0 !== a2 && ((l = l || Object.assign({}, e4))[n3] = a2);
              }
              return l;
            }
          };
        }, 6133: (e3, t3, r) => {
          "use strict";
          let n;
          let a = r(375), i = r(8571), s = r(9621), o = r(8160), l = { symbol: Symbol("ref"), defaults: { adjust: null, in: false, iterables: null, map: null, separator: ".", type: "value" } };
          t3.create = function(e4, t4 = {}) {
            a("string" == typeof e4, "Invalid reference key:", e4), o.assertOptions(t4, ["adjust", "ancestor", "in", "iterables", "map", "prefix", "render", "separator"]), a(!t4.prefix || "object" == typeof t4.prefix, "options.prefix must be of type object");
            let r2 = Object.assign({}, l.defaults, t4);
            delete r2.prefix;
            let n2 = r2.separator, i2 = l.context(e4, n2, t4.prefix);
            if (r2.type = i2.type, e4 = i2.key, "value" === r2.type) {
              if (i2.root && (a(!n2 || e4[0] !== n2, "Cannot specify relative path with root prefix"), r2.ancestor = "root", e4 || (e4 = null)), n2 && n2 === e4) e4 = null, r2.ancestor = 0;
              else if (void 0 !== r2.ancestor) a(!n2 || !e4 || e4[0] !== n2, "Cannot combine prefix with ancestor option");
              else {
                let [t5, a2] = l.ancestor(e4, n2);
                a2 && "" === (e4 = e4.slice(a2)) && (e4 = null), r2.ancestor = t5;
              }
            }
            return r2.path = n2 ? null === e4 ? [] : e4.split(n2) : [e4], new l.Ref(r2);
          }, t3.in = function(e4, r2 = {}) {
            return t3.create(e4, { ...r2, in: true });
          }, t3.isRef = function(e4) {
            return !!e4 && !!e4[o.symbols.ref];
          }, l.Ref = class {
            constructor(e4) {
              a("object" == typeof e4, "Invalid reference construction"), o.assertOptions(e4, ["adjust", "ancestor", "in", "iterables", "map", "path", "render", "separator", "type", "depth", "key", "root", "display"]), a([false, void 0].includes(e4.separator) || "string" == typeof e4.separator && 1 === e4.separator.length, "Invalid separator"), a(!e4.adjust || "function" == typeof e4.adjust, "options.adjust must be a function"), a(!e4.map || Array.isArray(e4.map), "options.map must be an array"), a(!e4.map || !e4.adjust, "Cannot set both map and adjust options"), Object.assign(this, l.defaults, e4), a("value" === this.type || void 0 === this.ancestor, "Non-value references cannot reference ancestors"), Array.isArray(this.map) && (this.map = new Map(this.map)), this.depth = this.path.length, this.key = this.path.length ? this.path.join(this.separator) : null, this.root = this.path[0], this.updateDisplay();
            }
            resolve(e4, t4, r2, n2, i2 = {}) {
              return a(!this.in || i2.in, "Invalid in() reference usage"), "global" === this.type ? this._resolve(r2.context, t4, i2) : "local" === this.type ? this._resolve(n2, t4, i2) : this.ancestor ? "root" === this.ancestor ? this._resolve(t4.ancestors[t4.ancestors.length - 1], t4, i2) : (a(this.ancestor <= t4.ancestors.length, "Invalid reference exceeds the schema root:", this.display), this._resolve(t4.ancestors[this.ancestor - 1], t4, i2)) : this._resolve(e4, t4, i2);
            }
            _resolve(e4, t4, r2) {
              let n2;
              if ("value" === this.type && t4.mainstay.shadow && false !== r2.shadow && (n2 = t4.mainstay.shadow.get(this.absolute(t4))), void 0 === n2 && (n2 = s(e4, this.path, { iterables: this.iterables, functions: true })), this.adjust && (n2 = this.adjust(n2)), this.map) {
                let e5 = this.map.get(n2);
                void 0 !== e5 && (n2 = e5);
              }
              return t4.mainstay && t4.mainstay.tracer.resolve(t4, this, n2), n2;
            }
            toString() {
              return this.display;
            }
            absolute(e4) {
              return [...e4.path.slice(0, -this.ancestor), ...this.path];
            }
            clone() {
              return new l.Ref(this);
            }
            describe() {
              let e4 = { path: this.path };
              for (let t4 of ("value" !== this.type && (e4.type = this.type), "." !== this.separator && (e4.separator = this.separator), "value" === this.type && 1 !== this.ancestor && (e4.ancestor = this.ancestor), this.map && (e4.map = [...this.map]), ["adjust", "iterables", "render"])) null !== this[t4] && void 0 !== this[t4] && (e4[t4] = this[t4]);
              return false !== this.in && (e4.in = true), { ref: e4 };
            }
            updateDisplay() {
              let e4 = null !== this.key ? this.key : "";
              if ("value" !== this.type) return void (this.display = `ref:${this.type}:${e4}`);
              if (!this.separator) return void (this.display = `ref:${e4}`);
              if (!this.ancestor) return void (this.display = `ref:${this.separator}${e4}`);
              if ("root" === this.ancestor) return void (this.display = `ref:root:${e4}`);
              if (1 === this.ancestor) return void (this.display = `ref:${e4 || ".."}`);
              let t4 = Array(this.ancestor + 1).fill(this.separator).join("");
              this.display = `ref:${t4}${e4 || ""}`;
            }
          }, l.Ref.prototype[o.symbols.ref] = true, t3.build = function(e4) {
            return "value" === (e4 = Object.assign({}, l.defaults, e4)).type && void 0 === e4.ancestor && (e4.ancestor = 1), new l.Ref(e4);
          }, l.context = function(e4, t4, r2 = {}) {
            if (e4 = e4.trim(), r2) {
              let n2 = void 0 === r2.global ? "$" : r2.global;
              if (n2 !== t4 && e4.startsWith(n2)) return { key: e4.slice(n2.length), type: "global" };
              let a2 = void 0 === r2.local ? "#" : r2.local;
              if (a2 !== t4 && e4.startsWith(a2)) return { key: e4.slice(a2.length), type: "local" };
              let i2 = void 0 === r2.root ? "/" : r2.root;
              if (i2 !== t4 && e4.startsWith(i2)) return { key: e4.slice(i2.length), type: "value", root: true };
            }
            return { key: e4, type: "value" };
          }, l.ancestor = function(e4, t4) {
            if (!t4 || e4[0] !== t4) return [1, 0];
            if (e4[1] !== t4) return [0, 1];
            let r2 = 2;
            for (; e4[r2] === t4; ) ++r2;
            return [r2 - 1, r2];
          }, t3.toSibling = 0, t3.toParent = 1, t3.Manager = class {
            constructor() {
              this.refs = [];
            }
            register(e4, a2) {
              if (e4) {
                if (a2 = void 0 === a2 ? t3.toParent : a2, Array.isArray(e4)) for (let t4 of e4) this.register(t4, a2);
                else if (o.isSchema(e4)) for (let t4 of e4._refs.refs) t4.ancestor - a2 >= 0 && this.refs.push({ ancestor: t4.ancestor - a2, root: t4.root });
                else t3.isRef(e4) && "value" === e4.type && e4.ancestor - a2 >= 0 && this.refs.push({ ancestor: e4.ancestor - a2, root: e4.root }), (n = n || r(3328)).isTemplate(e4) && this.register(e4.refs(), a2);
              }
            }
            get length() {
              return this.refs.length;
            }
            clone() {
              let e4 = new t3.Manager();
              return e4.refs = i(this.refs), e4;
            }
            reset() {
              this.refs = [];
            }
            roots() {
              return this.refs.filter((e4) => !e4.ancestor).map((e4) => e4.root);
            }
          };
        }, 3378: (e3, t3, r) => {
          "use strict";
          let n = r(5107), a = {};
          a.wrap = n.string().min(1).max(2).allow(false), t3.preferences = n.object({ allowUnknown: n.boolean(), abortEarly: n.boolean(), artifacts: n.boolean(), cache: n.boolean(), context: n.object(), convert: n.boolean(), dateFormat: n.valid("date", "iso", "string", "time", "utc"), debug: n.boolean(), errors: { escapeHtml: n.boolean(), label: n.valid("path", "key", false), language: [n.string(), n.object().ref()], render: n.boolean(), stack: n.boolean(), wrap: { label: a.wrap, array: a.wrap, string: a.wrap } }, externals: n.boolean(), messages: n.object(), noDefaults: n.boolean(), nonEnumerables: n.boolean(), presence: n.valid("required", "optional", "forbidden"), skipFunctions: n.boolean(), stripUnknown: n.object({ arrays: n.boolean(), objects: n.boolean() }).or("arrays", "objects").allow(true, false), warnings: n.boolean() }).strict(), a.nameRx = /^[a-zA-Z0-9]\w*$/, a.rule = n.object({ alias: n.array().items(n.string().pattern(a.nameRx)).single(), args: n.array().items(n.string(), n.object({ name: n.string().pattern(a.nameRx).required(), ref: n.boolean(), assert: n.alternatives([n.function(), n.object().schema()]).conditional("ref", { is: true, then: n.required() }), normalize: n.function(), message: n.string().when("assert", { is: n.function(), then: n.required() }) })), convert: n.boolean(), manifest: n.boolean(), method: n.function().allow(false), multi: n.boolean(), validate: n.function() }), t3.extension = n.object({ type: n.alternatives([n.string(), n.object().regex()]).required(), args: n.function(), cast: n.object().pattern(a.nameRx, n.object({ from: n.function().maxArity(1).required(), to: n.function().minArity(1).maxArity(2).required() })), base: n.object().schema().when("type", { is: n.object().regex(), then: n.forbidden() }), coerce: [n.function().maxArity(3), n.object({ method: n.function().maxArity(3).required(), from: n.array().items(n.string()).single() })], flags: n.object().pattern(a.nameRx, n.object({ setter: n.string(), default: n.any() })), manifest: { build: n.function().arity(2) }, messages: [n.object(), n.string()], modifiers: n.object().pattern(a.nameRx, n.function().minArity(1).maxArity(2)), overrides: n.object().pattern(a.nameRx, n.function()), prepare: n.function().maxArity(3), rebuild: n.function().arity(1), rules: n.object().pattern(a.nameRx, a.rule), terms: n.object().pattern(a.nameRx, n.object({ init: n.array().allow(null).required(), manifest: n.object().pattern(/.+/, [n.valid("schema", "single"), n.object({ mapped: n.object({ from: n.string().required(), to: n.string().required() }).required() })]) })), validate: n.function().maxArity(3) }).strict(), t3.extensions = n.array().items(n.object(), n.function().arity(1)).strict(), a.desc = { buffer: n.object({ buffer: n.string() }), func: n.object({ function: n.function().required(), options: { literal: true } }), override: n.object({ override: true }), ref: n.object({ ref: n.object({ type: n.valid("value", "global", "local"), path: n.array().required(), separator: n.string().length(1).allow(false), ancestor: n.number().min(0).integer().allow("root"), map: n.array().items(n.array().length(2)).min(1), adjust: n.function(), iterables: n.boolean(), in: n.boolean(), render: n.boolean() }).required() }), regex: n.object({ regex: n.string().min(3) }), special: n.object({ special: n.valid("deep").required() }), template: n.object({ template: n.string().required(), options: n.object() }), value: n.object({ value: n.alternatives([n.object(), n.array()]).required() }) }, a.desc.entity = n.alternatives([n.array().items(n.link("...")), n.boolean(), n.function(), n.number(), n.string(), a.desc.buffer, a.desc.func, a.desc.ref, a.desc.regex, a.desc.special, a.desc.template, a.desc.value, n.link("/")]), a.desc.values = n.array().items(null, n.boolean(), n.function(), n.number().allow(1 / 0, -1 / 0), n.string().allow(""), n.symbol(), a.desc.buffer, a.desc.func, a.desc.override, a.desc.ref, a.desc.regex, a.desc.template, a.desc.value), a.desc.messages = n.object().pattern(/.+/, [n.string(), a.desc.template, n.object().pattern(/.+/, [n.string(), a.desc.template])]), t3.description = n.object({ type: n.string().required(), flags: n.object({ cast: n.string(), default: n.any(), description: n.string(), empty: n.link("/"), failover: a.desc.entity, id: n.string(), label: n.string(), only: true, presence: ["optional", "required", "forbidden"], result: ["raw", "strip"], strip: n.boolean(), unit: n.string() }).unknown(), preferences: { allowUnknown: n.boolean(), abortEarly: n.boolean(), artifacts: n.boolean(), cache: n.boolean(), convert: n.boolean(), dateFormat: ["date", "iso", "string", "time", "utc"], errors: { escapeHtml: n.boolean(), label: ["path", "key"], language: [n.string(), a.desc.ref], wrap: { label: a.wrap, array: a.wrap } }, externals: n.boolean(), messages: a.desc.messages, noDefaults: n.boolean(), nonEnumerables: n.boolean(), presence: ["required", "optional", "forbidden"], skipFunctions: n.boolean(), stripUnknown: n.object({ arrays: n.boolean(), objects: n.boolean() }).or("arrays", "objects").allow(true, false), warnings: n.boolean() }, allow: a.desc.values, invalid: a.desc.values, rules: n.array().min(1).items({ name: n.string().required(), args: n.object().min(1), keep: n.boolean(), message: [n.string(), a.desc.messages], warn: n.boolean() }), keys: n.object().pattern(/.*/, n.link("/")), link: a.desc.ref }).pattern(/^[a-z]\w*$/, n.any());
        }, 493: (e3, t3, r) => {
          "use strict";
          let n = r(8571), a = r(9621), i = r(8160), s = { value: Symbol("value") };
          e3.exports = s.State = class {
            constructor(e4, t4, r2) {
              this.path = e4, this.ancestors = t4, this.mainstay = r2.mainstay, this.schemas = r2.schemas, this.debug = null;
            }
            localize(e4, t4 = null, r2 = null) {
              let n2 = new s.State(e4, t4, this);
              return r2 && n2.schemas && (n2.schemas = [s.schemas(r2), ...n2.schemas]), n2;
            }
            nest(e4, t4) {
              let r2 = new s.State(this.path, this.ancestors, this);
              return r2.schemas = r2.schemas && [s.schemas(e4), ...r2.schemas], r2.debug = t4, r2;
            }
            shadow(e4, t4) {
              this.mainstay.shadow = this.mainstay.shadow || new s.Shadow(), this.mainstay.shadow.set(this.path, e4, t4);
            }
            snapshot() {
              this.mainstay.shadow && (this._snapshot = n(this.mainstay.shadow.node(this.path))), this.mainstay.snapshot();
            }
            restore() {
              this.mainstay.shadow && (this.mainstay.shadow.override(this.path, this._snapshot), this._snapshot = void 0), this.mainstay.restore();
            }
            commit() {
              this.mainstay.shadow && (this.mainstay.shadow.override(this.path, this._snapshot), this._snapshot = void 0), this.mainstay.commit();
            }
          }, s.schemas = function(e4) {
            return i.isSchema(e4) ? { schema: e4 } : e4;
          }, s.Shadow = class {
            constructor() {
              this._values = null;
            }
            set(e4, t4, r2) {
              if (!e4.length || "strip" === r2 && "number" == typeof e4[e4.length - 1]) return;
              this._values = this._values || /* @__PURE__ */ new Map();
              let n2 = this._values;
              for (let t5 = 0; t5 < e4.length; ++t5) {
                let r3 = e4[t5], a2 = n2.get(r3);
                a2 || (a2 = /* @__PURE__ */ new Map(), n2.set(r3, a2)), n2 = a2;
              }
              n2[s.value] = t4;
            }
            get(e4) {
              let t4 = this.node(e4);
              if (t4) return t4[s.value];
            }
            node(e4) {
              if (this._values) return a(this._values, e4, { iterables: true });
            }
            override(e4, t4) {
              if (!this._values) return;
              let r2 = e4.slice(0, -1), n2 = e4[e4.length - 1], i2 = a(this._values, r2, { iterables: true });
              t4 ? i2.set(n2, t4) : i2 && i2.delete(n2);
            }
          };
        }, 3328: (e3, t3, r) => {
          "use strict";
          let n = r(375), a = r(8571), i = r(5277), s = r(1447), o = r(8160), l = r(6354), c = r(6133), u = { symbol: Symbol("template"), opens: Array(1e3).join("\0"), closes: Array(1e3).join(""), dateFormat: { date: Date.prototype.toDateString, iso: Date.prototype.toISOString, string: Date.prototype.toString, time: Date.prototype.toTimeString, utc: Date.prototype.toUTCString } };
          e3.exports = u.Template = class {
            constructor(e4, t4) {
              if (n("string" == typeof e4, "Template source must be a string"), n(!e4.includes("\0") && !e4.includes(""), "Template source cannot contain reserved control characters"), this.source = e4, this.rendered = e4, this._template = null, t4) {
                let { functions: e5, ...r2 } = t4;
                this._settings = Object.keys(r2).length ? a(r2) : void 0, this._functions = e5, this._functions && (n(Object.keys(this._functions).every((e6) => "string" == typeof e6), "Functions keys must be strings"), n(Object.values(this._functions).every((e6) => "function" == typeof e6), "Functions values must be functions"));
              } else this._settings = void 0, this._functions = void 0;
              this._parse();
            }
            _parse() {
              if (!this.source.includes("{")) return;
              let e4 = u.encode(this.source), t4 = u.split(e4), r2 = false, n2 = [], a2 = t4.shift();
              for (let e5 of (a2 && n2.push(a2), t4)) {
                let t5 = "{" !== e5[0], a3 = t5 ? "}" : "}}", i2 = e5.indexOf(a3);
                if (-1 === i2 || "{" === e5[1]) {
                  n2.push(`{${u.decode(e5)}`);
                  continue;
                }
                let s2 = e5.slice(t5 ? 0 : 1, i2), o2 = ":" === s2[0];
                o2 && (s2 = s2.slice(1));
                let l2 = this._ref(u.decode(s2), { raw: t5, wrapped: o2 });
                n2.push(l2), "string" != typeof l2 && (r2 = true);
                let c2 = e5.slice(i2 + a3.length);
                c2 && n2.push(u.decode(c2));
              }
              r2 ? this._template = n2 : this.rendered = n2.join("");
            }
            static date(e4, t4) {
              return u.dateFormat[t4.dateFormat].call(e4);
            }
            describe(e4 = {}) {
              if (!this._settings && e4.compact) return this.source;
              let t4 = { template: this.source };
              return this._settings && (t4.options = this._settings), this._functions && (t4.functions = this._functions), t4;
            }
            static build(e4) {
              return new u.Template(e4.template, e4.options || e4.functions ? { ...e4.options, functions: e4.functions } : void 0);
            }
            isDynamic() {
              return !!this._template;
            }
            static isTemplate(e4) {
              return !!e4 && !!e4[o.symbols.template];
            }
            refs() {
              if (!this._template) return;
              let e4 = [];
              for (let t4 of this._template) "string" != typeof t4 && e4.push(...t4.refs);
              return e4;
            }
            resolve(e4, t4, r2, n2) {
              return this._template && 1 === this._template.length ? this._part(this._template[0], e4, t4, r2, n2, {}) : this.render(e4, t4, r2, n2);
            }
            _part(e4, ...t4) {
              return e4.ref ? e4.ref.resolve(...t4) : e4.formula.evaluate(t4);
            }
            render(e4, t4, r2, n2, a2 = {}) {
              if (!this.isDynamic()) return this.rendered;
              let s2 = [];
              for (let o2 of this._template) if ("string" == typeof o2) s2.push(o2);
              else {
                let l2 = this._part(o2, e4, t4, r2, n2, a2), c2 = u.stringify(l2, e4, t4, r2, n2, a2);
                if (void 0 !== c2) {
                  let e5 = o2.raw || false === (a2.errors && a2.errors.escapeHtml) ? c2 : i(c2);
                  s2.push(u.wrap(e5, o2.wrapped && r2.errors.wrap.label));
                }
              }
              return s2.join("");
            }
            _ref(e4, { raw: t4, wrapped: r2 }) {
              let n2 = [];
              try {
                let t5 = this._functions ? { ...u.functions, ...this._functions } : u.functions;
                var a2 = new s.Parser(e4, { reference: (e5) => {
                  let t6 = c.create(e5, this._settings);
                  return n2.push(t6), (e6) => {
                    let r3 = t6.resolve(...e6);
                    return void 0 !== r3 ? r3 : null;
                  };
                }, functions: t5, constants: u.constants });
              } catch (t5) {
                throw t5.message = `Invalid template variable "${e4}" fails due to: ${t5.message}`, t5;
              }
              if (a2.single) {
                if ("reference" === a2.single.type) {
                  let e5 = n2[0];
                  return { ref: e5, raw: t4, refs: n2, wrapped: r2 || "local" === e5.type && "label" === e5.key };
                }
                return u.stringify(a2.single.value);
              }
              return { formula: a2, raw: t4, refs: n2 };
            }
            toString() {
              return this.source;
            }
          }, u.Template.prototype[o.symbols.template] = true, u.Template.prototype.isImmutable = true, u.encode = function(e4) {
            return e4.replace(/\\(\{+)/g, (e5, t4) => u.opens.slice(0, t4.length)).replace(/\\(\}+)/g, (e5, t4) => u.closes.slice(0, t4.length));
          }, u.decode = function(e4) {
            return e4.replace(/\u0000/g, "{").replace(/\u0001/g, "}");
          }, u.split = function(e4) {
            let t4 = [], r2 = "";
            for (let n2 = 0; n2 < e4.length; ++n2) {
              let a2 = e4[n2];
              if ("{" === a2) {
                let a3 = "";
                for (; n2 + 1 < e4.length && "{" === e4[n2 + 1]; ) a3 += "{", ++n2;
                t4.push(r2), r2 = a3;
              } else r2 += a2;
            }
            return t4.push(r2), t4;
          }, u.wrap = function(e4, t4) {
            return t4 ? 1 === t4.length ? `${t4}${e4}${t4}` : `${t4[0]}${e4}${t4[1]}` : e4;
          }, u.stringify = function(e4, t4, r2, n2, a2, i2 = {}) {
            let s2 = typeof e4, o2 = n2 && n2.errors && n2.errors.wrap || {}, l2 = false;
            if (c.isRef(e4) && e4.render && (l2 = e4.in, e4 = e4.resolve(t4, r2, n2, a2, { in: e4.in, ...i2 })), null === e4) return "null";
            if ("string" === s2) return u.wrap(e4, i2.arrayItems && o2.string);
            if ("number" === s2 || "function" === s2 || "symbol" === s2) return e4.toString();
            if ("object" !== s2) return JSON.stringify(e4);
            if (e4 instanceof Date) return u.Template.date(e4, n2);
            if (e4 instanceof Map) {
              let t5 = [];
              for (let [r3, n3] of e4.entries()) t5.push(`${r3.toString()} -> ${n3.toString()}`);
              e4 = t5;
            }
            if (!Array.isArray(e4)) return e4.toString();
            let d = [];
            for (let s3 of e4) d.push(u.stringify(s3, t4, r2, n2, a2, { arrayItems: true, ...i2 }));
            return u.wrap(d.join(", "), !l2 && o2.array);
          }, u.constants = { true: true, false: false, null: null, second: 1e3, minute: 6e4, hour: 36e5, day: 864e5 }, u.functions = { if: (e4, t4, r2) => e4 ? t4 : r2, length: (e4) => "string" == typeof e4 ? e4.length : e4 && "object" == typeof e4 ? Array.isArray(e4) ? e4.length : Object.keys(e4).length : null, msg(e4) {
            let [t4, r2, n2, a2, i2] = this, s2 = i2.messages;
            if (!s2) return "";
            let o2 = l.template(t4, s2[0], e4, r2, n2) || l.template(t4, s2[1], e4, r2, n2);
            return o2 ? o2.render(t4, r2, n2, a2, i2) : "";
          }, number: (e4) => "number" == typeof e4 ? e4 : "string" == typeof e4 ? parseFloat(e4) : "boolean" == typeof e4 ? e4 ? 1 : 0 : e4 instanceof Date ? e4.getTime() : null };
        }, 4946: (e3, t3, r) => {
          "use strict";
          let n = r(375), a = r(1687), i = r(8068), s = r(8160), o = r(3292), l = r(6354), c = r(6133), u = {};
          e3.exports = i.extend({ type: "alternatives", flags: { match: { default: "any" } }, terms: { matches: { init: [], register: c.toSibling } }, args: (e4, ...t4) => 1 === t4.length && Array.isArray(t4[0]) ? e4.try(...t4[0]) : e4.try(...t4), validate(e4, t4) {
            let { schema: r2, error: n2, state: i2, prefs: s2 } = t4;
            if (r2._flags.match) {
              let t5 = [], o3 = [];
              for (let n3 = 0; n3 < r2.$_terms.matches.length; ++n3) {
                let a2 = r2.$_terms.matches[n3], l2 = i2.nest(a2.schema, `match.${n3}`);
                l2.snapshot();
                let c3 = a2.schema.$_validate(e4, l2, s2);
                c3.errors ? (o3.push(c3.errors), l2.restore()) : (t5.push(c3.value), l2.commit());
              }
              if (0 === t5.length) return { errors: n2("alternatives.any", { details: o3.map((e5) => l.details(e5, { override: false })) }) };
              if ("one" === r2._flags.match) return 1 === t5.length ? { value: t5[0] } : { errors: n2("alternatives.one") };
              if (t5.length !== r2.$_terms.matches.length) return { errors: n2("alternatives.all", { details: o3.map((e5) => l.details(e5, { override: false })) }) };
              let c2 = (e5) => e5.$_terms.matches.some((e6) => "object" === e6.schema.type || "alternatives" === e6.schema.type && c2(e6.schema));
              return c2(r2) ? { value: t5.reduce((e5, t6) => a(e5, t6, { mergeArrays: false })) } : { value: t5[t5.length - 1] };
            }
            let o2 = [];
            for (let t5 = 0; t5 < r2.$_terms.matches.length; ++t5) {
              let n3 = r2.$_terms.matches[t5];
              if (n3.schema) {
                let r3 = i2.nest(n3.schema, `match.${t5}`);
                r3.snapshot();
                let a3 = n3.schema.$_validate(e4, r3, s2);
                if (!a3.errors) return r3.commit(), a3;
                r3.restore(), o2.push({ schema: n3.schema, reports: a3.errors });
                continue;
              }
              let a2 = n3.ref ? n3.ref.resolve(e4, i2, s2) : e4, l2 = n3.is ? [n3] : n3.switch;
              for (let r3 = 0; r3 < l2.length; ++r3) {
                let { is: o3, then: c2, otherwise: u2 } = l2[r3], d = `match.${t5}${n3.switch ? "." + r3 : ""}`;
                if (o3.$_match(a2, i2.nest(o3, `${d}.is`), s2)) {
                  if (c2) return c2.$_validate(e4, i2.nest(c2, `${d}.then`), s2);
                } else if (u2) return u2.$_validate(e4, i2.nest(u2, `${d}.otherwise`), s2);
              }
            }
            return u.errors(o2, t4);
          }, rules: { conditional: { method(e4, t4) {
            n(!this._flags._endedSwitch, "Unreachable condition"), n(!this._flags.match, "Cannot combine match mode", this._flags.match, "with conditional rule"), n(void 0 === t4.break, "Cannot use break option with alternatives conditional");
            let r2 = this.clone(), a2 = o.when(r2, e4, t4);
            for (let e5 of a2.is ? [a2] : a2.switch) if (e5.then && e5.otherwise) {
              r2.$_setFlag("_endedSwitch", true, { clone: false });
              break;
            }
            return r2.$_terms.matches.push(a2), r2.$_mutateRebuild();
          } }, match: { method(e4) {
            if (n(["any", "one", "all"].includes(e4), "Invalid alternatives match mode", e4), "any" !== e4) for (let t4 of this.$_terms.matches) n(t4.schema, "Cannot combine match mode", e4, "with conditional rules");
            return this.$_setFlag("match", e4);
          } }, try: { method(...e4) {
            n(e4.length, "Missing alternative schemas"), s.verifyFlat(e4, "try"), n(!this._flags._endedSwitch, "Unreachable condition");
            let t4 = this.clone();
            for (let r2 of e4) t4.$_terms.matches.push({ schema: t4.$_compile(r2) });
            return t4.$_mutateRebuild();
          } } }, overrides: { label(e4) {
            return this.$_parent("label", e4).$_modify({ each: (t4, r2) => "is" !== r2.path[0] && "string" != typeof t4._flags.label ? t4.label(e4) : void 0, ref: false });
          } }, rebuild(e4) {
            e4.$_modify({ each: (t4) => {
              s.isSchema(t4) && "array" === t4.type && e4.$_setFlag("_arrayItems", true, { clone: false });
            } });
          }, manifest: { build(e4, t4) {
            if (t4.matches) for (let r2 of t4.matches) {
              let { schema: t5, ref: n2, is: a2, not: i2, then: s2, otherwise: o2 } = r2;
              e4 = t5 ? e4.try(t5) : n2 ? e4.conditional(n2, { is: a2, then: s2, not: i2, otherwise: o2, switch: r2.switch }) : e4.conditional(a2, { then: s2, otherwise: o2 });
            }
            return e4;
          } }, messages: { "alternatives.all": "{{#label}} does not match all of the required types", "alternatives.any": "{{#label}} does not match any of the allowed types", "alternatives.match": "{{#label}} does not match any of the allowed types", "alternatives.one": "{{#label}} matches more than one allowed type", "alternatives.types": "{{#label}} must be one of {{#types}}" } }), u.errors = function(e4, { error: t4, state: r2 }) {
            if (!e4.length) return { errors: t4("alternatives.any") };
            if (1 === e4.length) return { errors: e4[0].reports };
            let n2 = /* @__PURE__ */ new Set(), a2 = [];
            for (let { reports: i2, schema: s2 } of e4) {
              if (i2.length > 1) return u.unmatched(e4, t4);
              let o2 = i2[0];
              if (o2 instanceof l.Report == 0) return u.unmatched(e4, t4);
              if (o2.state.path.length !== r2.path.length) {
                a2.push({ type: s2.type, report: o2 });
                continue;
              }
              if ("any.only" === o2.code) {
                for (let e5 of o2.local.valids) n2.add(e5);
                continue;
              }
              let [c2, d] = o2.code.split(".");
              "base" !== d ? a2.push({ type: s2.type, report: o2 }) : "object.base" === o2.code ? n2.add(o2.local.type) : n2.add(c2);
            }
            return a2.length ? 1 === a2.length ? { errors: a2[0].report } : u.unmatched(e4, t4) : { errors: t4("alternatives.types", { types: [...n2] }) };
          }, u.unmatched = function(e4, t4) {
            let r2 = [];
            for (let t5 of e4) r2.push(...t5.reports);
            return { errors: t4("alternatives.match", l.details(r2, { override: false })) };
          };
        }, 8068: (e3, t3, r) => {
          "use strict";
          let n = r(375), a = r(7629), i = r(8160), s = r(6914);
          e3.exports = a.extend({ type: "any", flags: { only: { default: false } }, terms: { alterations: { init: null }, examples: { init: null }, externals: { init: null }, metas: { init: [] }, notes: { init: [] }, shared: { init: null }, tags: { init: [] }, whens: { init: null } }, rules: { custom: { method(e4, t4) {
            return n("function" == typeof e4, "Method must be a function"), n(void 0 === t4 || t4 && "string" == typeof t4, "Description must be a non-empty string"), this.$_addRule({ name: "custom", args: { method: e4, description: t4 } });
          }, validate(e4, t4, { method: r2 }) {
            try {
              return r2(e4, t4);
            } catch (e5) {
              return t4.error("any.custom", { error: e5 });
            }
          }, args: ["method", "description"], multi: true }, messages: { method(e4) {
            return this.prefs({ messages: e4 });
          } }, shared: { method(e4) {
            n(i.isSchema(e4) && e4._flags.id, "Schema must be a schema with an id");
            let t4 = this.clone();
            return t4.$_terms.shared = t4.$_terms.shared || [], t4.$_terms.shared.push(e4), t4.$_mutateRegister(e4), t4;
          } }, warning: { method(e4, t4) {
            return n(e4 && "string" == typeof e4, "Invalid warning code"), this.$_addRule({ name: "warning", args: { code: e4, local: t4 }, warn: true });
          }, validate: (e4, t4, { code: r2, local: n2 }) => t4.error(r2, n2), args: ["code", "local"], multi: true } }, modifiers: { keep(e4, t4 = true) {
            e4.keep = t4;
          }, message(e4, t4) {
            e4.message = s.compile(t4);
          }, warn(e4, t4 = true) {
            e4.warn = t4;
          } }, manifest: { build(e4, t4) {
            for (let r2 in t4) {
              let n2 = t4[r2];
              if (["examples", "externals", "metas", "notes", "tags"].includes(r2)) for (let t5 of n2) e4 = e4[r2.slice(0, -1)](t5);
              else if ("alterations" !== r2) {
                if ("whens" !== r2) {
                  if ("shared" === r2) for (let t5 of n2) e4 = e4.shared(t5);
                } else for (let t5 of n2) {
                  let { ref: r3, is: n3, not: a2, then: i2, otherwise: s2, concat: o } = t5;
                  e4 = o ? e4.concat(o) : r3 ? e4.when(r3, { is: n3, not: a2, then: i2, otherwise: s2, switch: t5.switch, break: t5.break }) : e4.when(n3, { then: i2, otherwise: s2, break: t5.break });
                }
              } else {
                let t5 = {};
                for (let { target: e5, adjuster: r3 } of n2) t5[e5] = r3;
                e4 = e4.alter(t5);
              }
            }
            return e4;
          } }, messages: { "any.custom": "{{#label}} failed custom validation because {{#error.message}}", "any.default": "{{#label}} threw an error when running default method", "any.failover": "{{#label}} threw an error when running failover method", "any.invalid": "{{#label}} contains an invalid value", "any.only": '{{#label}} must be {if(#valids.length == 1, "", "one of ")}{{#valids}}', "any.ref": "{{#label}} {{#arg}} references {{:#ref}} which {{#reason}}", "any.required": "{{#label}} is required", "any.unknown": "{{#label}} is not allowed" } });
        }, 546: (e3, t3, r) => {
          "use strict";
          let n = r(375), a = r(9474), i = r(9621), s = r(8068), o = r(8160), l = r(3292), c = {};
          e3.exports = s.extend({ type: "array", flags: { single: { default: false }, sparse: { default: false } }, terms: { items: { init: [], manifest: "schema" }, ordered: { init: [], manifest: "schema" }, _exclusions: { init: [] }, _inclusions: { init: [] }, _requireds: { init: [] } }, coerce: { from: "object", method(e4, { schema: t4, state: r2, prefs: n2 }) {
            if (!Array.isArray(e4)) return;
            let a2 = t4.$_getRule("sort");
            return a2 ? c.sort(t4, e4, a2.args.options, r2, n2) : void 0;
          } }, validate(e4, { schema: t4, error: r2 }) {
            if (!Array.isArray(e4)) {
              if (t4._flags.single) {
                let t5 = [e4];
                return t5[o.symbols.arraySingle] = true, { value: t5 };
              }
              return { errors: r2("array.base") };
            }
            if (t4.$_getRule("items") || t4.$_terms.externals) return { value: e4.slice() };
          }, rules: { has: { method(e4) {
            e4 = this.$_compile(e4, { appendPath: true });
            let t4 = this.$_addRule({ name: "has", args: { schema: e4 } });
            return t4.$_mutateRegister(e4), t4;
          }, validate(e4, { state: t4, prefs: r2, error: n2 }, { schema: a2 }) {
            let i2 = [e4, ...t4.ancestors];
            for (let n3 = 0; n3 < e4.length; ++n3) {
              let s3 = t4.localize([...t4.path, n3], i2, a2);
              if (a2.$_match(e4[n3], s3, r2)) return e4;
            }
            let s2 = a2._flags.label;
            return s2 ? n2("array.hasKnown", { patternLabel: s2 }) : n2("array.hasUnknown", null);
          }, multi: true }, items: { method(...e4) {
            o.verifyFlat(e4, "items");
            let t4 = this.$_addRule("items");
            for (let r2 = 0; r2 < e4.length; ++r2) {
              let n2 = o.tryWithPath(() => this.$_compile(e4[r2]), r2, { append: true });
              t4.$_terms.items.push(n2);
            }
            return t4.$_mutateRebuild();
          }, validate(e4, { schema: t4, error: r2, state: n2, prefs: a2, errorsArray: i2 }) {
            let s2 = t4.$_terms._requireds.slice(), l2 = t4.$_terms.ordered.slice(), u = [...t4.$_terms._inclusions, ...s2], d = !e4[o.symbols.arraySingle];
            delete e4[o.symbols.arraySingle];
            let p = i2(), h = e4.length;
            for (let i3 = 0; i3 < h; ++i3) {
              let o2 = e4[i3], f = false, m = false, g = d ? i3 : new Number(i3), y = [...n2.path, g];
              if (!t4._flags.sparse && void 0 === o2) {
                if (p.push(r2("array.sparse", { key: g, path: y, pos: i3, value: void 0 }, n2.localize(y))), a2.abortEarly) return p;
                l2.shift();
                continue;
              }
              let b = [e4, ...n2.ancestors];
              for (let e5 of t4.$_terms._exclusions) if (e5.$_match(o2, n2.localize(y, b, e5), a2, { presence: "ignore" })) {
                if (p.push(r2("array.excludes", { pos: i3, value: o2 }, n2.localize(y))), a2.abortEarly) return p;
                f = true, l2.shift();
                break;
              }
              if (f) continue;
              if (t4.$_terms.ordered.length) {
                if (l2.length) {
                  let s3 = l2.shift(), u2 = s3.$_validate(o2, n2.localize(y, b, s3), a2);
                  if (u2.errors) {
                    if (p.push(...u2.errors), a2.abortEarly) return p;
                  } else if ("strip" === s3._flags.result) c.fastSplice(e4, i3), --i3, --h;
                  else {
                    if (!t4._flags.sparse && void 0 === u2.value) {
                      if (p.push(r2("array.sparse", { key: g, path: y, pos: i3, value: void 0 }, n2.localize(y))), a2.abortEarly) return p;
                      continue;
                    }
                    e4[i3] = u2.value;
                  }
                  continue;
                }
                if (!t4.$_terms.items.length) {
                  if (p.push(r2("array.orderedLength", { pos: i3, limit: t4.$_terms.ordered.length })), a2.abortEarly) return p;
                  break;
                }
              }
              let w = [], v = s2.length;
              for (let l3 = 0; l3 < v; ++l3) {
                let u2 = n2.localize(y, b, s2[l3]);
                u2.snapshot();
                let d2 = s2[l3].$_validate(o2, u2, a2);
                if (w[l3] = d2, !d2.errors) {
                  if (u2.commit(), e4[i3] = d2.value, m = true, c.fastSplice(s2, l3), --l3, --v, !t4._flags.sparse && void 0 === d2.value && (p.push(r2("array.sparse", { key: g, path: y, pos: i3, value: void 0 }, n2.localize(y))), a2.abortEarly)) return p;
                  break;
                }
                u2.restore();
              }
              if (m) continue;
              let _ = a2.stripUnknown && !!a2.stripUnknown.arrays || false;
              for (let l3 of (v = u.length, u)) {
                let u2;
                let d2 = s2.indexOf(l3);
                if (-1 !== d2) u2 = w[d2];
                else {
                  let s3 = n2.localize(y, b, l3);
                  if (s3.snapshot(), !(u2 = l3.$_validate(o2, s3, a2)).errors) {
                    s3.commit(), "strip" === l3._flags.result ? (c.fastSplice(e4, i3), --i3, --h) : t4._flags.sparse || void 0 !== u2.value ? e4[i3] = u2.value : (p.push(r2("array.sparse", { key: g, path: y, pos: i3, value: void 0 }, n2.localize(y))), f = true), m = true;
                    break;
                  }
                  s3.restore();
                }
                if (1 === v) {
                  if (_) {
                    c.fastSplice(e4, i3), --i3, --h, m = true;
                    break;
                  }
                  if (p.push(...u2.errors), a2.abortEarly) return p;
                  f = true;
                  break;
                }
              }
              if (!f && (t4.$_terms._inclusions.length || t4.$_terms._requireds.length) && !m) {
                if (_) {
                  c.fastSplice(e4, i3), --i3, --h;
                  continue;
                }
                if (p.push(r2("array.includes", { pos: i3, value: o2 }, n2.localize(y))), a2.abortEarly) return p;
              }
            }
            return s2.length && c.fillMissedErrors(t4, p, s2, e4, n2, a2), l2.length && (c.fillOrderedErrors(t4, p, l2, e4, n2, a2), p.length || c.fillDefault(l2, e4, n2, a2)), p.length ? p : e4;
          }, priority: true, manifest: false }, length: { method(e4) {
            return this.$_addRule({ name: "length", args: { limit: e4 }, operator: "=" });
          }, validate: (e4, t4, { limit: r2 }, { name: n2, operator: a2, args: i2 }) => o.compare(e4.length, r2, a2) ? e4 : t4.error("array." + n2, { limit: i2.limit, value: e4 }), args: [{ name: "limit", ref: true, assert: o.limit, message: "must be a positive integer" }] }, max: { method(e4) {
            return this.$_addRule({ name: "max", method: "length", args: { limit: e4 }, operator: "<=" });
          } }, min: { method(e4) {
            return this.$_addRule({ name: "min", method: "length", args: { limit: e4 }, operator: ">=" });
          } }, ordered: { method(...e4) {
            o.verifyFlat(e4, "ordered");
            let t4 = this.$_addRule("items");
            for (let r2 = 0; r2 < e4.length; ++r2) {
              let n2 = o.tryWithPath(() => this.$_compile(e4[r2]), r2, { append: true });
              c.validateSingle(n2, t4), t4.$_mutateRegister(n2), t4.$_terms.ordered.push(n2);
            }
            return t4.$_mutateRebuild();
          } }, single: { method(e4) {
            let t4 = void 0 === e4 || !!e4;
            return n(!t4 || !this._flags._arrayItems, "Cannot specify single rule when array has array items"), this.$_setFlag("single", t4);
          } }, sort: { method(e4 = {}) {
            o.assertOptions(e4, ["by", "order"]);
            let t4 = { order: e4.order || "ascending" };
            return e4.by && (t4.by = l.ref(e4.by, { ancestor: 0 }), n(!t4.by.ancestor, "Cannot sort by ancestor")), this.$_addRule({ name: "sort", args: { options: t4 } });
          }, validate(e4, { error: t4, state: r2, prefs: n2, schema: a2 }, { options: i2 }) {
            let { value: s2, errors: o2 } = c.sort(a2, e4, i2, r2, n2);
            if (o2) return o2;
            for (let r3 = 0; r3 < e4.length; ++r3) if (e4[r3] !== s2[r3]) return t4("array.sort", { order: i2.order, by: i2.by ? i2.by.key : "value" });
            return e4;
          }, convert: true }, sparse: { method(e4) {
            let t4 = void 0 === e4 || !!e4;
            return this._flags.sparse === t4 ? this : (t4 ? this.clone() : this.$_addRule("items")).$_setFlag("sparse", t4, { clone: false });
          } }, unique: { method(e4, t4 = {}) {
            n(!e4 || "function" == typeof e4 || "string" == typeof e4, "comparator must be a function or a string"), o.assertOptions(t4, ["ignoreUndefined", "separator"]);
            let r2 = { name: "unique", args: { options: t4, comparator: e4 } };
            if (e4) {
              if ("string" == typeof e4) {
                let n2 = o.default(t4.separator, ".");
                r2.path = n2 ? e4.split(n2) : [e4];
              } else r2.comparator = e4;
            }
            return this.$_addRule(r2);
          }, validate(e4, { state: t4, error: r2, schema: s2 }, { comparator: o2, options: l2 }, { comparator: c2, path: u }) {
            let d = { string: /* @__PURE__ */ Object.create(null), number: /* @__PURE__ */ Object.create(null), undefined: /* @__PURE__ */ Object.create(null), boolean: /* @__PURE__ */ Object.create(null), bigint: /* @__PURE__ */ Object.create(null), object: /* @__PURE__ */ new Map(), function: /* @__PURE__ */ new Map(), custom: /* @__PURE__ */ new Map() }, p = c2 || a, h = l2.ignoreUndefined;
            for (let a2 = 0; a2 < e4.length; ++a2) {
              let s3 = u ? i(e4[a2], u) : e4[a2], l3 = c2 ? d.custom : d[typeof s3];
              if (n(l3, "Failed to find unique map container for type", typeof s3), l3 instanceof Map) {
                let n2;
                let i2 = l3.entries();
                for (; !(n2 = i2.next()).done; ) if (p(n2.value[0], s3)) {
                  let i3 = t4.localize([...t4.path, a2], [e4, ...t4.ancestors]), s4 = { pos: a2, value: e4[a2], dupePos: n2.value[1], dupeValue: e4[n2.value[1]] };
                  return u && (s4.path = o2), r2("array.unique", s4, i3);
                }
                l3.set(s3, a2);
              } else {
                if ((!h || void 0 !== s3) && void 0 !== l3[s3]) {
                  let n2 = { pos: a2, value: e4[a2], dupePos: l3[s3], dupeValue: e4[l3[s3]] };
                  return u && (n2.path = o2), r2("array.unique", n2, t4.localize([...t4.path, a2], [e4, ...t4.ancestors]));
                }
                l3[s3] = a2;
              }
            }
            return e4;
          }, args: ["comparator", "options"], multi: true } }, cast: { set: { from: Array.isArray, to: (e4, t4) => new Set(e4) } }, rebuild(e4) {
            for (let t4 of (e4.$_terms._inclusions = [], e4.$_terms._exclusions = [], e4.$_terms._requireds = [], e4.$_terms.items)) c.validateSingle(t4, e4), "required" === t4._flags.presence ? e4.$_terms._requireds.push(t4) : "forbidden" === t4._flags.presence ? e4.$_terms._exclusions.push(t4) : e4.$_terms._inclusions.push(t4);
            for (let t4 of e4.$_terms.ordered) c.validateSingle(t4, e4);
          }, manifest: { build: (e4, t4) => (t4.items && (e4 = e4.items(...t4.items)), t4.ordered && (e4 = e4.ordered(...t4.ordered)), e4) }, messages: { "array.base": "{{#label}} must be an array", "array.excludes": "{{#label}} contains an excluded value", "array.hasKnown": "{{#label}} does not contain at least one required match for type {:#patternLabel}", "array.hasUnknown": "{{#label}} does not contain at least one required match", "array.includes": "{{#label}} does not match any of the allowed types", "array.includesRequiredBoth": "{{#label}} does not contain {{#knownMisses}} and {{#unknownMisses}} other required value(s)", "array.includesRequiredKnowns": "{{#label}} does not contain {{#knownMisses}}", "array.includesRequiredUnknowns": "{{#label}} does not contain {{#unknownMisses}} required value(s)", "array.length": "{{#label}} must contain {{#limit}} items", "array.max": "{{#label}} must contain less than or equal to {{#limit}} items", "array.min": "{{#label}} must contain at least {{#limit}} items", "array.orderedLength": "{{#label}} must contain at most {{#limit}} items", "array.sort": "{{#label}} must be sorted in {#order} order by {{#by}}", "array.sort.mismatching": "{{#label}} cannot be sorted due to mismatching types", "array.sort.unsupported": "{{#label}} cannot be sorted due to unsupported type {#type}", "array.sparse": "{{#label}} must not be a sparse array item", "array.unique": "{{#label}} contains a duplicate value" } }), c.fillMissedErrors = function(e4, t4, r2, n2, a2, i2) {
            let s2 = [], o2 = 0;
            for (let e5 of r2) {
              let t5 = e5._flags.label;
              t5 ? s2.push(t5) : ++o2;
            }
            s2.length ? o2 ? t4.push(e4.$_createError("array.includesRequiredBoth", n2, { knownMisses: s2, unknownMisses: o2 }, a2, i2)) : t4.push(e4.$_createError("array.includesRequiredKnowns", n2, { knownMisses: s2 }, a2, i2)) : t4.push(e4.$_createError("array.includesRequiredUnknowns", n2, { unknownMisses: o2 }, a2, i2));
          }, c.fillOrderedErrors = function(e4, t4, r2, n2, a2, i2) {
            let s2 = [];
            for (let e5 of r2) "required" === e5._flags.presence && s2.push(e5);
            s2.length && c.fillMissedErrors(e4, t4, s2, n2, a2, i2);
          }, c.fillDefault = function(e4, t4, r2, n2) {
            let a2 = [], i2 = true;
            for (let s2 = e4.length - 1; s2 >= 0; --s2) {
              let o2 = e4[s2], l2 = [t4, ...r2.ancestors], c2 = o2.$_validate(void 0, r2.localize(r2.path, l2, o2), n2).value;
              if (i2) {
                if (void 0 === c2) continue;
                i2 = false;
              }
              a2.unshift(c2);
            }
            a2.length && t4.push(...a2);
          }, c.fastSplice = function(e4, t4) {
            let r2 = t4;
            for (; r2 < e4.length; ) e4[r2++] = e4[r2];
            --e4.length;
          }, c.validateSingle = function(e4, t4) {
            ("array" === e4.type || e4._flags._arrayItems) && (n(!t4._flags.single, "Cannot specify array item with single rule enabled"), t4.$_setFlag("_arrayItems", true, { clone: false }));
          }, c.sort = function(e4, t4, r2, n2, a2) {
            let i2 = "ascending" === r2.order ? 1 : -1, s2 = -1 * i2;
            try {
              return { value: t4.slice().sort((o2, l2) => {
                let u = c.compare(o2, l2, s2, i2);
                if (null !== u || (r2.by && (o2 = r2.by.resolve(o2, n2, a2), l2 = r2.by.resolve(l2, n2, a2)), null !== (u = c.compare(o2, l2, s2, i2)))) return u;
                let d = typeof o2;
                if (d !== typeof l2) throw e4.$_createError("array.sort.mismatching", t4, null, n2, a2);
                if ("number" !== d && "string" !== d) throw e4.$_createError("array.sort.unsupported", t4, { type: d }, n2, a2);
                return "number" === d ? (o2 - l2) * i2 : o2 < l2 ? s2 : i2;
              }) };
            } catch (e5) {
              return { errors: e5 };
            }
          }, c.compare = function(e4, t4, r2, n2) {
            return e4 === t4 ? 0 : void 0 === e4 ? 1 : void 0 === t4 ? -1 : null === e4 ? n2 : null === t4 ? r2 : null;
          };
        }, 4937: (e3, t3, r) => {
          "use strict";
          let n = r(375), a = r(8068), i = r(8160), s = r(2036), o = { isBool: function(e4) {
            return "boolean" == typeof e4;
          } };
          e3.exports = a.extend({ type: "boolean", flags: { sensitive: { default: false } }, terms: { falsy: { init: null, manifest: "values" }, truthy: { init: null, manifest: "values" } }, coerce(e4, { schema: t4 }) {
            if ("boolean" != typeof e4) {
              if ("string" == typeof e4) {
                let r2 = t4._flags.sensitive ? e4 : e4.toLowerCase();
                e4 = "true" === r2 || "false" !== r2 && e4;
              }
              return "boolean" != typeof e4 && (e4 = t4.$_terms.truthy && t4.$_terms.truthy.has(e4, null, null, !t4._flags.sensitive) || (!t4.$_terms.falsy || !t4.$_terms.falsy.has(e4, null, null, !t4._flags.sensitive)) && e4), { value: e4 };
            }
          }, validate(e4, { error: t4 }) {
            if ("boolean" != typeof e4) return { value: e4, errors: t4("boolean.base") };
          }, rules: { truthy: { method(...e4) {
            i.verifyFlat(e4, "truthy");
            let t4 = this.clone();
            t4.$_terms.truthy = t4.$_terms.truthy || new s();
            for (let r2 = 0; r2 < e4.length; ++r2) {
              let a2 = e4[r2];
              n(void 0 !== a2, "Cannot call truthy with undefined"), t4.$_terms.truthy.add(a2);
            }
            return t4;
          } }, falsy: { method(...e4) {
            i.verifyFlat(e4, "falsy");
            let t4 = this.clone();
            t4.$_terms.falsy = t4.$_terms.falsy || new s();
            for (let r2 = 0; r2 < e4.length; ++r2) {
              let a2 = e4[r2];
              n(void 0 !== a2, "Cannot call falsy with undefined"), t4.$_terms.falsy.add(a2);
            }
            return t4;
          } }, sensitive: { method(e4 = true) {
            return this.$_setFlag("sensitive", e4);
          } } }, cast: { number: { from: o.isBool, to: (e4, t4) => e4 ? 1 : 0 }, string: { from: o.isBool, to: (e4, t4) => e4 ? "true" : "false" } }, manifest: { build: (e4, t4) => (t4.truthy && (e4 = e4.truthy(...t4.truthy)), t4.falsy && (e4 = e4.falsy(...t4.falsy)), e4) }, messages: { "boolean.base": "{{#label}} must be a boolean" } });
        }, 7500: (e3, t3, r) => {
          "use strict";
          let n = r(375), a = r(8068), i = r(8160), s = r(3328), o = { isDate: function(e4) {
            return e4 instanceof Date;
          } };
          e3.exports = a.extend({ type: "date", coerce: { from: ["number", "string"], method: (e4, { schema: t4 }) => ({ value: o.parse(e4, t4._flags.format) || e4 }) }, validate(e4, { schema: t4, error: r2, prefs: n2 }) {
            if (e4 instanceof Date && !isNaN(e4.getTime())) return;
            let a2 = t4._flags.format;
            return n2.convert && a2 && "string" == typeof e4 ? { value: e4, errors: r2("date.format", { format: a2 }) } : { value: e4, errors: r2("date.base") };
          }, rules: { compare: { method: false, validate(e4, t4, { date: r2 }, { name: n2, operator: a2, args: s2 }) {
            let o2 = "now" === r2 ? Date.now() : r2.getTime();
            return i.compare(e4.getTime(), o2, a2) ? e4 : t4.error("date." + n2, { limit: s2.date, value: e4 });
          }, args: [{ name: "date", ref: true, normalize: (e4) => "now" === e4 ? e4 : o.parse(e4), assert: (e4) => null !== e4, message: "must have a valid date format" }] }, format: { method(e4) {
            return n(["iso", "javascript", "unix"].includes(e4), "Unknown date format", e4), this.$_setFlag("format", e4);
          } }, greater: { method(e4) {
            return this.$_addRule({ name: "greater", method: "compare", args: { date: e4 }, operator: ">" });
          } }, iso: { method() {
            return this.format("iso");
          } }, less: { method(e4) {
            return this.$_addRule({ name: "less", method: "compare", args: { date: e4 }, operator: "<" });
          } }, max: { method(e4) {
            return this.$_addRule({ name: "max", method: "compare", args: { date: e4 }, operator: "<=" });
          } }, min: { method(e4) {
            return this.$_addRule({ name: "min", method: "compare", args: { date: e4 }, operator: ">=" });
          } }, timestamp: { method(e4 = "javascript") {
            return n(["javascript", "unix"].includes(e4), '"type" must be one of "javascript, unix"'), this.format(e4);
          } } }, cast: { number: { from: o.isDate, to: (e4, t4) => e4.getTime() }, string: { from: o.isDate, to: (e4, { prefs: t4 }) => s.date(e4, t4) } }, messages: { "date.base": "{{#label}} must be a valid date", "date.format": '{{#label}} must be in {msg("date.format." + #format) || #format} format', "date.greater": "{{#label}} must be greater than {{:#limit}}", "date.less": "{{#label}} must be less than {{:#limit}}", "date.max": "{{#label}} must be less than or equal to {{:#limit}}", "date.min": "{{#label}} must be greater than or equal to {{:#limit}}", "date.format.iso": "ISO 8601 date", "date.format.javascript": "timestamp or number of milliseconds", "date.format.unix": "timestamp or number of seconds" } }), o.parse = function(e4, t4) {
            if (e4 instanceof Date) return e4;
            if ("string" != typeof e4 && (isNaN(e4) || !isFinite(e4)) || /^\s*$/.test(e4)) return null;
            if ("iso" === t4) return i.isIsoDate(e4) ? o.date(e4.toString()) : null;
            let r2 = e4;
            if ("string" == typeof e4 && /^[+-]?\d+(\.\d+)?$/.test(e4) && (e4 = parseFloat(e4)), t4) {
              if ("javascript" === t4) return o.date(1 * e4);
              if ("unix" === t4) return o.date(1e3 * e4);
              if ("string" == typeof r2) return null;
            }
            return o.date(e4);
          }, o.date = function(e4) {
            let t4 = new Date(e4);
            return isNaN(t4.getTime()) ? null : t4;
          };
        }, 390: (e3, t3, r) => {
          "use strict";
          let n = r(375), a = r(7824);
          e3.exports = a.extend({ type: "function", properties: { typeof: "function" }, rules: { arity: { method(e4) {
            return n(Number.isSafeInteger(e4) && e4 >= 0, "n must be a positive integer"), this.$_addRule({ name: "arity", args: { n: e4 } });
          }, validate: (e4, t4, { n: r2 }) => e4.length === r2 ? e4 : t4.error("function.arity", { n: r2 }) }, class: { method() {
            return this.$_addRule("class");
          }, validate: (e4, t4) => /^\s*class\s/.test(e4.toString()) ? e4 : t4.error("function.class", { value: e4 }) }, minArity: { method(e4) {
            return n(Number.isSafeInteger(e4) && e4 > 0, "n must be a strict positive integer"), this.$_addRule({ name: "minArity", args: { n: e4 } });
          }, validate: (e4, t4, { n: r2 }) => e4.length >= r2 ? e4 : t4.error("function.minArity", { n: r2 }) }, maxArity: { method(e4) {
            return n(Number.isSafeInteger(e4) && e4 >= 0, "n must be a positive integer"), this.$_addRule({ name: "maxArity", args: { n: e4 } });
          }, validate: (e4, t4, { n: r2 }) => e4.length <= r2 ? e4 : t4.error("function.maxArity", { n: r2 }) } }, messages: { "function.arity": "{{#label}} must have an arity of {{#n}}", "function.class": "{{#label}} must be a class", "function.maxArity": "{{#label}} must have an arity lesser or equal to {{#n}}", "function.minArity": "{{#label}} must have an arity greater or equal to {{#n}}" } });
        }, 7824: (e3, t3, r) => {
          "use strict";
          let n = r(978), a = r(375), i = r(8571), s = r(3652), o = r(8068), l = r(8160), c = r(3292), u = r(6354), d = r(6133), p = r(3328), h = { renameDefaults: { alias: false, multiple: false, override: false } };
          e3.exports = o.extend({ type: "_keys", properties: { typeof: "object" }, flags: { unknown: { default: void 0 } }, terms: { dependencies: { init: null }, keys: { init: null, manifest: { mapped: { from: "schema", to: "key" } } }, patterns: { init: null }, renames: { init: null } }, args: (e4, t4) => e4.keys(t4), validate(e4, { schema: t4, error: r2, state: n2, prefs: a2 }) {
            if (!e4 || typeof e4 !== t4.$_property("typeof") || Array.isArray(e4)) return { value: e4, errors: r2("object.base", { type: t4.$_property("typeof") }) };
            if (!(t4.$_terms.renames || t4.$_terms.dependencies || t4.$_terms.keys || t4.$_terms.patterns || t4.$_terms.externals)) return;
            e4 = h.clone(e4, a2);
            let i2 = [];
            if (t4.$_terms.renames && !h.rename(t4, e4, n2, a2, i2) || !t4.$_terms.keys && !t4.$_terms.patterns && !t4.$_terms.dependencies) return { value: e4, errors: i2 };
            let s2 = new Set(Object.keys(e4));
            if (t4.$_terms.keys) {
              let r3 = [e4, ...n2.ancestors];
              for (let o2 of t4.$_terms.keys) {
                let t5 = o2.key, l2 = e4[t5];
                s2.delete(t5);
                let c2 = n2.localize([...n2.path, t5], r3, o2), u2 = o2.schema.$_validate(l2, c2, a2);
                if (u2.errors) {
                  if (a2.abortEarly) return { value: e4, errors: u2.errors };
                  void 0 !== u2.value && (e4[t5] = u2.value), i2.push(...u2.errors);
                } else "strip" === o2.schema._flags.result || void 0 === u2.value && void 0 !== l2 ? delete e4[t5] : void 0 !== u2.value && (e4[t5] = u2.value);
              }
            }
            if (s2.size || t4._flags._hasPatternMatch) {
              let r3 = h.unknown(t4, e4, s2, i2, n2, a2);
              if (r3) return r3;
            }
            if (t4.$_terms.dependencies) for (let r3 of t4.$_terms.dependencies) {
              if (null !== r3.key && false === h.isPresent(r3.options)(r3.key.resolve(e4, n2, a2, null, { shadow: false }))) continue;
              let s3 = h.dependencies[r3.rel](t4, r3, e4, n2, a2);
              if (s3) {
                let r4 = t4.$_createError(s3.code, e4, s3.context, n2, a2);
                if (a2.abortEarly) return { value: e4, errors: r4 };
                i2.push(r4);
              }
            }
            return { value: e4, errors: i2 };
          }, rules: { and: { method(...e4) {
            return l.verifyFlat(e4, "and"), h.dependency(this, "and", null, e4);
          } }, append: { method(e4) {
            return null == e4 || 0 === Object.keys(e4).length ? this : this.keys(e4);
          } }, assert: { method(e4, t4, r2) {
            p.isTemplate(e4) || (e4 = c.ref(e4)), a(void 0 === r2 || "string" == typeof r2, "Message must be a string"), t4 = this.$_compile(t4, { appendPath: true });
            let n2 = this.$_addRule({ name: "assert", args: { subject: e4, schema: t4, message: r2 } });
            return n2.$_mutateRegister(e4), n2.$_mutateRegister(t4), n2;
          }, validate(e4, { error: t4, prefs: r2, state: n2 }, { subject: a2, schema: i2, message: s2 }) {
            let o2 = a2.resolve(e4, n2, r2), l2 = d.isRef(a2) ? a2.absolute(n2) : [];
            return i2.$_match(o2, n2.localize(l2, [e4, ...n2.ancestors], i2), r2) ? e4 : t4("object.assert", { subject: a2, message: s2 });
          }, args: ["subject", "schema", "message"], multi: true }, instance: { method(e4, t4) {
            return a("function" == typeof e4, "constructor must be a function"), t4 = t4 || e4.name, this.$_addRule({ name: "instance", args: { constructor: e4, name: t4 } });
          }, validate: (e4, t4, { constructor: r2, name: n2 }) => e4 instanceof r2 ? e4 : t4.error("object.instance", { type: n2, value: e4 }), args: ["constructor", "name"] }, keys: { method(e4) {
            a(void 0 === e4 || "object" == typeof e4, "Object schema must be a valid object"), a(!l.isSchema(e4), "Object schema cannot be a joi schema");
            let t4 = this.clone();
            if (e4) {
              if (Object.keys(e4).length) for (let r2 in t4.$_terms.keys = t4.$_terms.keys ? t4.$_terms.keys.filter((t5) => !e4.hasOwnProperty(t5.key)) : new h.Keys(), e4) l.tryWithPath(() => t4.$_terms.keys.push({ key: r2, schema: this.$_compile(e4[r2]) }), r2);
              else t4.$_terms.keys = new h.Keys();
            } else t4.$_terms.keys = null;
            return t4.$_mutateRebuild();
          } }, length: { method(e4) {
            return this.$_addRule({ name: "length", args: { limit: e4 }, operator: "=" });
          }, validate: (e4, t4, { limit: r2 }, { name: n2, operator: a2, args: i2 }) => l.compare(Object.keys(e4).length, r2, a2) ? e4 : t4.error("object." + n2, { limit: i2.limit, value: e4 }), args: [{ name: "limit", ref: true, assert: l.limit, message: "must be a positive integer" }] }, max: { method(e4) {
            return this.$_addRule({ name: "max", method: "length", args: { limit: e4 }, operator: "<=" });
          } }, min: { method(e4) {
            return this.$_addRule({ name: "min", method: "length", args: { limit: e4 }, operator: ">=" });
          } }, nand: { method(...e4) {
            return l.verifyFlat(e4, "nand"), h.dependency(this, "nand", null, e4);
          } }, or: { method(...e4) {
            return l.verifyFlat(e4, "or"), h.dependency(this, "or", null, e4);
          } }, oxor: { method(...e4) {
            return h.dependency(this, "oxor", null, e4);
          } }, pattern: { method(e4, t4, r2 = {}) {
            let n2 = e4 instanceof RegExp;
            n2 || (e4 = this.$_compile(e4, { appendPath: true })), a(void 0 !== t4, "Invalid rule"), l.assertOptions(r2, ["fallthrough", "matches"]), n2 && a(!e4.flags.includes("g") && !e4.flags.includes("y"), "pattern should not use global or sticky mode"), t4 = this.$_compile(t4, { appendPath: true });
            let i2 = this.clone();
            i2.$_terms.patterns = i2.$_terms.patterns || [];
            let s2 = { [n2 ? "regex" : "schema"]: e4, rule: t4 };
            return r2.matches && (s2.matches = this.$_compile(r2.matches), "array" !== s2.matches.type && (s2.matches = s2.matches.$_root.array().items(s2.matches)), i2.$_mutateRegister(s2.matches), i2.$_setFlag("_hasPatternMatch", true, { clone: false })), r2.fallthrough && (s2.fallthrough = true), i2.$_terms.patterns.push(s2), i2.$_mutateRegister(t4), i2;
          } }, ref: { method() {
            return this.$_addRule("ref");
          }, validate: (e4, t4) => d.isRef(e4) ? e4 : t4.error("object.refType", { value: e4 }) }, regex: { method() {
            return this.$_addRule("regex");
          }, validate: (e4, t4) => e4 instanceof RegExp ? e4 : t4.error("object.regex", { value: e4 }) }, rename: { method(e4, t4, r2 = {}) {
            a("string" == typeof e4 || e4 instanceof RegExp, "Rename missing the from argument"), a("string" == typeof t4 || t4 instanceof p, "Invalid rename to argument"), a(t4 !== e4, "Cannot rename key to same name:", e4), l.assertOptions(r2, ["alias", "ignoreUndefined", "override", "multiple"]);
            let i2 = this.clone();
            for (let t5 of (i2.$_terms.renames = i2.$_terms.renames || [], i2.$_terms.renames)) a(t5.from !== e4, "Cannot rename the same key multiple times");
            return t4 instanceof p && i2.$_mutateRegister(t4), i2.$_terms.renames.push({ from: e4, to: t4, options: n(h.renameDefaults, r2) }), i2;
          } }, schema: { method(e4 = "any") {
            return this.$_addRule({ name: "schema", args: { type: e4 } });
          }, validate: (e4, t4, { type: r2 }) => l.isSchema(e4) && ("any" === r2 || e4.type === r2) ? e4 : t4.error("object.schema", { type: r2 }) }, unknown: { method(e4) {
            return this.$_setFlag("unknown", false !== e4);
          } }, with: { method(e4, t4, r2 = {}) {
            return h.dependency(this, "with", e4, t4, r2);
          } }, without: { method(e4, t4, r2 = {}) {
            return h.dependency(this, "without", e4, t4, r2);
          } }, xor: { method(...e4) {
            return l.verifyFlat(e4, "xor"), h.dependency(this, "xor", null, e4);
          } } }, overrides: { default(e4, t4) {
            return void 0 === e4 && (e4 = l.symbols.deepDefault), this.$_parent("default", e4, t4);
          } }, rebuild(e4) {
            if (e4.$_terms.keys) {
              let t4 = new s.Sorter();
              for (let r2 of e4.$_terms.keys) l.tryWithPath(() => t4.add(r2, { after: r2.schema.$_rootReferences(), group: r2.key }), r2.key);
              e4.$_terms.keys = new h.Keys(...t4.nodes);
            }
          }, manifest: { build(e4, t4) {
            if (t4.keys && (e4 = e4.keys(t4.keys)), t4.dependencies) for (let { rel: r2, key: n2 = null, peers: a2, options: i2 } of t4.dependencies) e4 = h.dependency(e4, r2, n2, a2, i2);
            if (t4.patterns) for (let { regex: r2, schema: n2, rule: a2, fallthrough: i2, matches: s2 } of t4.patterns) e4 = e4.pattern(r2 || n2, a2, { fallthrough: i2, matches: s2 });
            if (t4.renames) for (let { from: r2, to: n2, options: a2 } of t4.renames) e4 = e4.rename(r2, n2, a2);
            return e4;
          } }, messages: { "object.and": "{{#label}} contains {{#presentWithLabels}} without its required peers {{#missingWithLabels}}", "object.assert": '{{#label}} is invalid because {if(#subject.key, `"` + #subject.key + `" failed to ` + (#message || "pass the assertion test"), #message || "the assertion failed")}', "object.base": "{{#label}} must be of type {{#type}}", "object.instance": "{{#label}} must be an instance of {{:#type}}", "object.length": '{{#label}} must have {{#limit}} key{if(#limit == 1, "", "s")}', "object.max": '{{#label}} must have less than or equal to {{#limit}} key{if(#limit == 1, "", "s")}', "object.min": '{{#label}} must have at least {{#limit}} key{if(#limit == 1, "", "s")}', "object.missing": "{{#label}} must contain at least one of {{#peersWithLabels}}", "object.nand": "{{:#mainWithLabel}} must not exist simultaneously with {{#peersWithLabels}}", "object.oxor": "{{#label}} contains a conflict between optional exclusive peers {{#peersWithLabels}}", "object.pattern.match": "{{#label}} keys failed to match pattern requirements", "object.refType": "{{#label}} must be a Joi reference", "object.regex": "{{#label}} must be a RegExp object", "object.rename.multiple": "{{#label}} cannot rename {{:#from}} because multiple renames are disabled and another key was already renamed to {{:#to}}", "object.rename.override": "{{#label}} cannot rename {{:#from}} because override is disabled and target {{:#to}} exists", "object.schema": "{{#label}} must be a Joi schema of {{#type}} type", "object.unknown": "{{#label}} is not allowed", "object.with": "{{:#mainWithLabel}} missing required peer {{:#peerWithLabel}}", "object.without": "{{:#mainWithLabel}} conflict with forbidden peer {{:#peerWithLabel}}", "object.xor": "{{#label}} contains a conflict between exclusive peers {{#peersWithLabels}}" } }), h.clone = function(e4, t4) {
            if ("object" == typeof e4) {
              if (t4.nonEnumerables) return i(e4, { shallow: true });
              let r3 = Object.create(Object.getPrototypeOf(e4));
              return Object.assign(r3, e4), r3;
            }
            let r2 = function(...t5) {
              return e4.apply(this, t5);
            };
            return r2.prototype = i(e4.prototype), Object.defineProperty(r2, "name", { value: e4.name, writable: false }), Object.defineProperty(r2, "length", { value: e4.length, writable: false }), Object.assign(r2, e4), r2;
          }, h.dependency = function(e4, t4, r2, n2, i2) {
            a(null === r2 || "string" == typeof r2, t4, "key must be a strings"), i2 || (i2 = n2.length > 1 && "object" == typeof n2[n2.length - 1] ? n2.pop() : {}), l.assertOptions(i2, ["separator", "isPresent"]), n2 = [].concat(n2);
            let s2 = l.default(i2.separator, "."), o2 = [];
            for (let e5 of n2) a("string" == typeof e5, t4, "peers must be strings"), o2.push(c.ref(e5, { separator: s2, ancestor: 0, prefix: false }));
            null !== r2 && (r2 = c.ref(r2, { separator: s2, ancestor: 0, prefix: false }));
            let u2 = e4.clone();
            return u2.$_terms.dependencies = u2.$_terms.dependencies || [], u2.$_terms.dependencies.push(new h.Dependency(t4, r2, o2, n2, i2)), u2;
          }, h.dependencies = { and(e4, t4, r2, n2, a2) {
            let i2 = [], s2 = [], o2 = t4.peers.length, l2 = h.isPresent(t4.options);
            for (let e5 of t4.peers) false === l2(e5.resolve(r2, n2, a2, null, { shadow: false })) ? i2.push(e5.key) : s2.push(e5.key);
            if (i2.length !== o2 && s2.length !== o2) return { code: "object.and", context: { present: s2, presentWithLabels: h.keysToLabels(e4, s2), missing: i2, missingWithLabels: h.keysToLabels(e4, i2) } };
          }, nand(e4, t4, r2, n2, a2) {
            let i2 = [], s2 = h.isPresent(t4.options);
            for (let e5 of t4.peers) s2(e5.resolve(r2, n2, a2, null, { shadow: false })) && i2.push(e5.key);
            if (i2.length !== t4.peers.length) return;
            let o2 = t4.paths[0], l2 = t4.paths.slice(1);
            return { code: "object.nand", context: { main: o2, mainWithLabel: h.keysToLabels(e4, o2), peers: l2, peersWithLabels: h.keysToLabels(e4, l2) } };
          }, or(e4, t4, r2, n2, a2) {
            let i2 = h.isPresent(t4.options);
            for (let e5 of t4.peers) if (i2(e5.resolve(r2, n2, a2, null, { shadow: false }))) return;
            return { code: "object.missing", context: { peers: t4.paths, peersWithLabels: h.keysToLabels(e4, t4.paths) } };
          }, oxor(e4, t4, r2, n2, a2) {
            let i2 = [], s2 = h.isPresent(t4.options);
            for (let e5 of t4.peers) s2(e5.resolve(r2, n2, a2, null, { shadow: false })) && i2.push(e5.key);
            if (!i2.length || 1 === i2.length) return;
            let o2 = { peers: t4.paths, peersWithLabels: h.keysToLabels(e4, t4.paths) };
            return o2.present = i2, o2.presentWithLabels = h.keysToLabels(e4, i2), { code: "object.oxor", context: o2 };
          }, with(e4, t4, r2, n2, a2) {
            let i2 = h.isPresent(t4.options);
            for (let s2 of t4.peers) if (false === i2(s2.resolve(r2, n2, a2, null, { shadow: false }))) return { code: "object.with", context: { main: t4.key.key, mainWithLabel: h.keysToLabels(e4, t4.key.key), peer: s2.key, peerWithLabel: h.keysToLabels(e4, s2.key) } };
          }, without(e4, t4, r2, n2, a2) {
            let i2 = h.isPresent(t4.options);
            for (let s2 of t4.peers) if (i2(s2.resolve(r2, n2, a2, null, { shadow: false }))) return { code: "object.without", context: { main: t4.key.key, mainWithLabel: h.keysToLabels(e4, t4.key.key), peer: s2.key, peerWithLabel: h.keysToLabels(e4, s2.key) } };
          }, xor(e4, t4, r2, n2, a2) {
            let i2 = [], s2 = h.isPresent(t4.options);
            for (let e5 of t4.peers) s2(e5.resolve(r2, n2, a2, null, { shadow: false })) && i2.push(e5.key);
            if (1 === i2.length) return;
            let o2 = { peers: t4.paths, peersWithLabels: h.keysToLabels(e4, t4.paths) };
            return 0 === i2.length ? { code: "object.missing", context: o2 } : (o2.present = i2, o2.presentWithLabels = h.keysToLabels(e4, i2), { code: "object.xor", context: o2 });
          } }, h.keysToLabels = function(e4, t4) {
            return Array.isArray(t4) ? t4.map((t5) => e4.$_mapLabels(t5)) : e4.$_mapLabels(t4);
          }, h.isPresent = function(e4) {
            return "function" == typeof e4.isPresent ? e4.isPresent : (e5) => void 0 !== e5;
          }, h.rename = function(e4, t4, r2, n2, a2) {
            let i2 = {};
            for (let s2 of e4.$_terms.renames) {
              let o2 = [], l2 = "string" != typeof s2.from;
              if (l2) for (let e5 in t4) {
                if (void 0 === t4[e5] && s2.options.ignoreUndefined || e5 === s2.to) continue;
                let r3 = s2.from.exec(e5);
                r3 && o2.push({ from: e5, to: s2.to, match: r3 });
              }
              else !Object.prototype.hasOwnProperty.call(t4, s2.from) || void 0 === t4[s2.from] && s2.options.ignoreUndefined || o2.push(s2);
              for (let c2 of o2) {
                let o3 = c2.from, u2 = c2.to;
                if (u2 instanceof p && (u2 = u2.render(t4, r2, n2, c2.match)), o3 !== u2) {
                  if (!s2.options.multiple && i2[u2] && (a2.push(e4.$_createError("object.rename.multiple", t4, { from: o3, to: u2, pattern: l2 }, r2, n2)), n2.abortEarly) || Object.prototype.hasOwnProperty.call(t4, u2) && !s2.options.override && !i2[u2] && (a2.push(e4.$_createError("object.rename.override", t4, { from: o3, to: u2, pattern: l2 }, r2, n2)), n2.abortEarly)) return false;
                  void 0 === t4[o3] ? delete t4[u2] : t4[u2] = t4[o3], i2[u2] = true, s2.options.alias || delete t4[o3];
                }
              }
            }
            return true;
          }, h.unknown = function(e4, t4, r2, n2, a2, i2) {
            if (e4.$_terms.patterns) {
              let s2 = false, o2 = e4.$_terms.patterns.map((e5) => {
                if (e5.matches) return s2 = true, [];
              }), l2 = [t4, ...a2.ancestors];
              for (let s3 of r2) {
                let c2 = t4[s3], u2 = [...a2.path, s3];
                for (let d2 = 0; d2 < e4.$_terms.patterns.length; ++d2) {
                  let p2 = e4.$_terms.patterns[d2];
                  if (p2.regex) {
                    let e5 = p2.regex.test(s3);
                    if (a2.mainstay.tracer.debug(a2, "rule", `pattern.${d2}`, e5 ? "pass" : "error"), !e5) continue;
                  } else if (!p2.schema.$_match(s3, a2.nest(p2.schema, `pattern.${d2}`), i2)) continue;
                  r2.delete(s3);
                  let h2 = a2.localize(u2, l2, { schema: p2.rule, key: s3 }), f = p2.rule.$_validate(c2, h2, i2);
                  if (f.errors) {
                    if (i2.abortEarly) return { value: t4, errors: f.errors };
                    n2.push(...f.errors);
                  }
                  if (p2.matches && o2[d2].push(s3), t4[s3] = f.value, !p2.fallthrough) break;
                }
              }
              if (s2) for (let r3 = 0; r3 < o2.length; ++r3) {
                let s3 = o2[r3];
                if (!s3) continue;
                let c2 = e4.$_terms.patterns[r3].matches, d2 = a2.localize(a2.path, l2, c2), p2 = c2.$_validate(s3, d2, i2);
                if (p2.errors) {
                  let r4 = u.details(p2.errors, { override: false });
                  r4.matches = s3;
                  let o3 = e4.$_createError("object.pattern.match", t4, r4, a2, i2);
                  if (i2.abortEarly) return { value: t4, errors: o3 };
                  n2.push(o3);
                }
              }
            }
            if (r2.size && (e4.$_terms.keys || e4.$_terms.patterns)) {
              if (i2.stripUnknown && void 0 === e4._flags.unknown || i2.skipFunctions) {
                let e5 = !(!i2.stripUnknown || true !== i2.stripUnknown && !i2.stripUnknown.objects);
                for (let n3 of r2) e5 ? (delete t4[n3], r2.delete(n3)) : "function" == typeof t4[n3] && r2.delete(n3);
              }
              if (!l.default(e4._flags.unknown, i2.allowUnknown)) for (let s2 of r2) {
                let r3 = a2.localize([...a2.path, s2], []), o2 = e4.$_createError("object.unknown", t4[s2], { child: s2 }, r3, i2, { flags: false });
                if (i2.abortEarly) return { value: t4, errors: o2 };
                n2.push(o2);
              }
            }
          }, h.Dependency = class {
            constructor(e4, t4, r2, n2, a2) {
              this.rel = e4, this.key = t4, this.peers = r2, this.paths = n2, this.options = a2;
            }
            describe() {
              let e4 = { rel: this.rel, peers: this.paths };
              return null !== this.key && (e4.key = this.key.key), "." !== this.peers[0].separator && (e4.options = { ...e4.options, separator: this.peers[0].separator }), this.options.isPresent && (e4.options = { ...e4.options, isPresent: this.options.isPresent }), e4;
            }
          }, h.Keys = class extends Array {
            concat(e4) {
              let t4 = this.slice(), r2 = /* @__PURE__ */ new Map();
              for (let e5 = 0; e5 < t4.length; ++e5) r2.set(t4[e5].key, e5);
              for (let n2 of e4) {
                let e5 = n2.key, a2 = r2.get(e5);
                void 0 !== a2 ? t4[a2] = { key: e5, schema: t4[a2].schema.concat(n2.schema) } : t4.push(n2);
              }
              return t4;
            }
          };
        }, 8785: (e3, t3, r) => {
          "use strict";
          let n = r(375), a = r(8068), i = r(8160), s = r(3292), o = r(6354), l = {};
          e3.exports = a.extend({ type: "link", properties: { schemaChain: true }, terms: { link: { init: null, manifest: "single", register: false } }, args: (e4, t4) => e4.ref(t4), validate(e4, { schema: t4, state: r2, prefs: a2 }) {
            n(t4.$_terms.link, "Uninitialized link schema");
            let i2 = l.generate(t4, e4, r2, a2), s2 = t4.$_terms.link[0].ref;
            return i2.$_validate(e4, r2.nest(i2, `link:${s2.display}:${i2.type}`), a2);
          }, generate: (e4, t4, r2, n2) => l.generate(e4, t4, r2, n2), rules: { ref: { method(e4) {
            n(!this.$_terms.link, "Cannot reinitialize schema"), n("value" === (e4 = s.ref(e4)).type || "local" === e4.type, "Invalid reference type:", e4.type), n("local" === e4.type || "root" === e4.ancestor || e4.ancestor > 0, "Link cannot reference itself");
            let t4 = this.clone();
            return t4.$_terms.link = [{ ref: e4 }], t4;
          } }, relative: { method(e4 = true) {
            return this.$_setFlag("relative", e4);
          } } }, overrides: { concat(e4) {
            n(this.$_terms.link, "Uninitialized link schema"), n(i.isSchema(e4), "Invalid schema object"), n("link" !== e4.type, "Cannot merge type link with another link");
            let t4 = this.clone();
            return t4.$_terms.whens || (t4.$_terms.whens = []), t4.$_terms.whens.push({ concat: e4 }), t4.$_mutateRebuild();
          } }, manifest: { build: (e4, t4) => (n(t4.link, "Invalid link description missing link"), e4.ref(t4.link)) } }), l.generate = function(e4, t4, r2, n2) {
            let a2 = r2.mainstay.links.get(e4);
            if (a2) return a2._generate(t4, r2, n2).schema;
            let i2 = e4.$_terms.link[0].ref, { perspective: s2, path: o2 } = l.perspective(i2, r2);
            l.assert(s2, "which is outside of schema boundaries", i2, e4, r2, n2);
            try {
              a2 = o2.length ? s2.$_reach(o2) : s2;
            } catch (t5) {
              l.assert(false, "to non-existing schema", i2, e4, r2, n2);
            }
            return l.assert("link" !== a2.type, "which is another link", i2, e4, r2, n2), e4._flags.relative || r2.mainstay.links.set(e4, a2), a2._generate(t4, r2, n2).schema;
          }, l.perspective = function(e4, t4) {
            if ("local" === e4.type) {
              for (let { schema: r2, key: n2 } of t4.schemas) {
                if ((r2._flags.id || n2) === e4.path[0]) return { perspective: r2, path: e4.path.slice(1) };
                if (r2.$_terms.shared) {
                  for (let t5 of r2.$_terms.shared) if (t5._flags.id === e4.path[0]) return { perspective: t5, path: e4.path.slice(1) };
                }
              }
              return { perspective: null, path: null };
            }
            return "root" === e4.ancestor ? { perspective: t4.schemas[t4.schemas.length - 1].schema, path: e4.path } : { perspective: t4.schemas[e4.ancestor] && t4.schemas[e4.ancestor].schema, path: e4.path };
          }, l.assert = function(e4, t4, r2, a2, i2, s2) {
            e4 || n(false, `"${o.label(a2._flags, i2, s2)}" contains link reference "${r2.display}" ${t4}`);
          };
        }, 3832: (e3, t3, r) => {
          "use strict";
          let n = r(375), a = r(8068), i = r(8160), s = { numberRx: /^\s*[+-]?(?:(?:\d+(?:\.\d*)?)|(?:\.\d+))(?:e([+-]?\d+))?\s*$/i, precisionRx: /(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/, exponentialPartRegex: /[eE][+-]?\d+$/, leadingSignAndZerosRegex: /^[+-]?(0*)?/, dotRegex: /\./, trailingZerosRegex: /0+$/, decimalPlaces(e4) {
            let t4 = e4.toString(), r2 = t4.indexOf("."), n2 = t4.indexOf("e");
            return (r2 < 0 ? 0 : (n2 < 0 ? t4.length : n2) - r2 - 1) + (n2 < 0 ? 0 : Math.max(0, -parseInt(t4.slice(n2 + 1))));
          } };
          e3.exports = a.extend({ type: "number", flags: { unsafe: { default: false } }, coerce: { from: "string", method(e4, { schema: t4, error: r2 }) {
            if (!e4.match(s.numberRx)) return;
            let n2 = { value: parseFloat(e4 = e4.trim()) };
            if (0 === n2.value && (n2.value = 0), !t4._flags.unsafe) {
              if (e4.match(/e/i)) {
                if (s.extractSignificantDigits(e4) !== s.extractSignificantDigits(String(n2.value))) return n2.errors = r2("number.unsafe"), n2;
              } else {
                let t5 = n2.value.toString();
                if (t5.match(/e/i)) return n2;
                if (t5 !== s.normalizeDecimal(e4)) return n2.errors = r2("number.unsafe"), n2;
              }
            }
            return n2;
          } }, validate(e4, { schema: t4, error: r2, prefs: n2 }) {
            if (e4 === 1 / 0 || e4 === -1 / 0) return { value: e4, errors: r2("number.infinity") };
            if (!i.isNumber(e4)) return { value: e4, errors: r2("number.base") };
            let a2 = { value: e4 };
            if (n2.convert) {
              let e5 = t4.$_getRule("precision");
              if (e5) {
                let t5 = Math.pow(10, e5.args.limit);
                a2.value = Math.round(a2.value * t5) / t5;
              }
            }
            return 0 === a2.value && (a2.value = 0), !t4._flags.unsafe && (e4 > Number.MAX_SAFE_INTEGER || e4 < Number.MIN_SAFE_INTEGER) && (a2.errors = r2("number.unsafe")), a2;
          }, rules: { compare: { method: false, validate: (e4, t4, { limit: r2 }, { name: n2, operator: a2, args: s2 }) => i.compare(e4, r2, a2) ? e4 : t4.error("number." + n2, { limit: s2.limit, value: e4 }), args: [{ name: "limit", ref: true, assert: i.isNumber, message: "must be a number" }] }, greater: { method(e4) {
            return this.$_addRule({ name: "greater", method: "compare", args: { limit: e4 }, operator: ">" });
          } }, integer: { method() {
            return this.$_addRule("integer");
          }, validate: (e4, t4) => Math.trunc(e4) - e4 == 0 ? e4 : t4.error("number.integer") }, less: { method(e4) {
            return this.$_addRule({ name: "less", method: "compare", args: { limit: e4 }, operator: "<" });
          } }, max: { method(e4) {
            return this.$_addRule({ name: "max", method: "compare", args: { limit: e4 }, operator: "<=" });
          } }, min: { method(e4) {
            return this.$_addRule({ name: "min", method: "compare", args: { limit: e4 }, operator: ">=" });
          } }, multiple: { method(e4) {
            let t4 = "number" == typeof e4 ? s.decimalPlaces(e4) : null, r2 = Math.pow(10, t4);
            return this.$_addRule({ name: "multiple", args: { base: e4, baseDecimalPlace: t4, pfactor: r2 } });
          }, validate: (e4, t4, { base: r2, baseDecimalPlace: n2, pfactor: a2 }, i2) => s.decimalPlaces(e4) > n2 ? t4.error("number.multiple", { multiple: i2.args.base, value: e4 }) : Math.round(a2 * e4) % Math.round(a2 * r2) == 0 ? e4 : t4.error("number.multiple", { multiple: i2.args.base, value: e4 }), args: [{ name: "base", ref: true, assert: (e4) => "number" == typeof e4 && isFinite(e4) && e4 > 0, message: "must be a positive number" }, "baseDecimalPlace", "pfactor"], multi: true }, negative: { method() {
            return this.sign("negative");
          } }, port: { method() {
            return this.$_addRule("port");
          }, validate: (e4, t4) => Number.isSafeInteger(e4) && e4 >= 0 && e4 <= 65535 ? e4 : t4.error("number.port") }, positive: { method() {
            return this.sign("positive");
          } }, precision: { method(e4) {
            return n(Number.isSafeInteger(e4), "limit must be an integer"), this.$_addRule({ name: "precision", args: { limit: e4 } });
          }, validate(e4, t4, { limit: r2 }) {
            let n2 = e4.toString().match(s.precisionRx);
            return Math.max((n2[1] ? n2[1].length : 0) - (n2[2] ? parseInt(n2[2], 10) : 0), 0) <= r2 ? e4 : t4.error("number.precision", { limit: r2, value: e4 });
          }, convert: true }, sign: { method(e4) {
            return n(["negative", "positive"].includes(e4), "Invalid sign", e4), this.$_addRule({ name: "sign", args: { sign: e4 } });
          }, validate: (e4, t4, { sign: r2 }) => "negative" === r2 && e4 < 0 || "positive" === r2 && e4 > 0 ? e4 : t4.error(`number.${r2}`) }, unsafe: { method(e4 = true) {
            return n("boolean" == typeof e4, "enabled must be a boolean"), this.$_setFlag("unsafe", e4);
          } } }, cast: { string: { from: (e4) => "number" == typeof e4, to: (e4, t4) => e4.toString() } }, messages: { "number.base": "{{#label}} must be a number", "number.greater": "{{#label}} must be greater than {{#limit}}", "number.infinity": "{{#label}} cannot be infinity", "number.integer": "{{#label}} must be an integer", "number.less": "{{#label}} must be less than {{#limit}}", "number.max": "{{#label}} must be less than or equal to {{#limit}}", "number.min": "{{#label}} must be greater than or equal to {{#limit}}", "number.multiple": "{{#label}} must be a multiple of {{#multiple}}", "number.negative": "{{#label}} must be a negative number", "number.port": "{{#label}} must be a valid port", "number.positive": "{{#label}} must be a positive number", "number.precision": "{{#label}} must have no more than {{#limit}} decimal places", "number.unsafe": "{{#label}} must be a safe number" } }), s.extractSignificantDigits = function(e4) {
            return e4.replace(s.exponentialPartRegex, "").replace(s.dotRegex, "").replace(s.trailingZerosRegex, "").replace(s.leadingSignAndZerosRegex, "");
          }, s.normalizeDecimal = function(e4) {
            return (e4 = e4.replace(/^\+/, "").replace(/\.0*$/, "").replace(/^(-?)\.([^\.]*)$/, "$10.$2").replace(/^(-?)0+([0-9])/, "$1$2")).includes(".") && e4.endsWith("0") && (e4 = e4.replace(/0+$/, "")), "-0" === e4 ? "0" : e4;
          };
        }, 8966: (e3, t3, r) => {
          "use strict";
          let n = r(7824);
          e3.exports = n.extend({ type: "object", cast: { map: { from: (e4) => e4 && "object" == typeof e4, to: (e4, t4) => new Map(Object.entries(e4)) } } });
        }, 7417: (e3, t3, r) => {
          "use strict";
          let n = r(375), a = r(5380), i = r(1745), s = r(9959), o = r(6064), l = r(9926), c = r(5752), u = r(8068), d = r(8160), p = { tlds: l instanceof Set && { tlds: { allow: l, deny: null } }, base64Regex: { true: { true: /^(?:[\w\-]{2}[\w\-]{2})*(?:[\w\-]{2}==|[\w\-]{3}=)?$/, false: /^(?:[A-Za-z0-9+\/]{2}[A-Za-z0-9+\/]{2})*(?:[A-Za-z0-9+\/]{2}==|[A-Za-z0-9+\/]{3}=)?$/ }, false: { true: /^(?:[\w\-]{2}[\w\-]{2})*(?:[\w\-]{2}(==)?|[\w\-]{3}=?)?$/, false: /^(?:[A-Za-z0-9+\/]{2}[A-Za-z0-9+\/]{2})*(?:[A-Za-z0-9+\/]{2}(==)?|[A-Za-z0-9+\/]{3}=?)?$/ } }, dataUriRegex: /^data:[\w+.-]+\/[\w+.-]+;((charset=[\w-]+|base64),)?(.*)$/, hexRegex: { withPrefix: /^0x[0-9a-f]+$/i, withOptionalPrefix: /^(?:0x)?[0-9a-f]+$/i, withoutPrefix: /^[0-9a-f]+$/i }, ipRegex: s.regex({ cidr: "forbidden" }).regex, isoDurationRegex: /^P(?!$)(\d+Y)?(\d+M)?(\d+W)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+S)?)?$/, guidBrackets: { "{": "}", "[": "]", "(": ")", "": "" }, guidVersions: { uuidv1: "1", uuidv2: "2", uuidv3: "3", uuidv4: "4", uuidv5: "5", uuidv6: "6", uuidv7: "7", uuidv8: "8" }, guidSeparators: /* @__PURE__ */ new Set([void 0, true, false, "-", ":"]), normalizationForms: ["NFC", "NFD", "NFKC", "NFKD"] };
          e3.exports = u.extend({ type: "string", flags: { insensitive: { default: false }, truncate: { default: false } }, terms: { replacements: { init: null } }, coerce: { from: "string", method(e4, { schema: t4, state: r2, prefs: n2 }) {
            let a2 = t4.$_getRule("normalize");
            a2 && (e4 = e4.normalize(a2.args.form));
            let i2 = t4.$_getRule("case");
            i2 && (e4 = "upper" === i2.args.direction ? e4.toLocaleUpperCase() : e4.toLocaleLowerCase());
            let s2 = t4.$_getRule("trim");
            if (s2 && s2.args.enabled && (e4 = e4.trim()), t4.$_terms.replacements) for (let r3 of t4.$_terms.replacements) e4 = e4.replace(r3.pattern, r3.replacement);
            let o2 = t4.$_getRule("hex");
            if (o2 && o2.args.options.byteAligned && e4.length % 2 != 0 && (e4 = `0${e4}`), t4.$_getRule("isoDate")) {
              let t5 = p.isoDate(e4);
              t5 && (e4 = t5);
            }
            if (t4._flags.truncate) {
              let a3 = t4.$_getRule("max");
              if (a3) {
                let i3 = a3.args.limit;
                if (d.isResolvable(i3) && (i3 = i3.resolve(e4, r2, n2), !d.limit(i3))) return { value: e4, errors: t4.$_createError("any.ref", i3, { ref: a3.args.limit, arg: "limit", reason: "must be a positive integer" }, r2, n2) };
                e4 = e4.slice(0, i3);
              }
            }
            return { value: e4 };
          } }, validate(e4, { schema: t4, error: r2 }) {
            if ("string" != typeof e4) return { value: e4, errors: r2("string.base") };
            if ("" === e4) {
              let n2 = t4.$_getRule("min");
              if (n2 && 0 === n2.args.limit) return;
              return { value: e4, errors: r2("string.empty") };
            }
          }, rules: { alphanum: { method() {
            return this.$_addRule("alphanum");
          }, validate: (e4, t4) => /^[a-zA-Z0-9]+$/.test(e4) ? e4 : t4.error("string.alphanum") }, base64: { method(e4 = {}) {
            return d.assertOptions(e4, ["paddingRequired", "urlSafe"]), n("boolean" == typeof (e4 = { urlSafe: false, paddingRequired: true, ...e4 }).paddingRequired, "paddingRequired must be boolean"), n("boolean" == typeof e4.urlSafe, "urlSafe must be boolean"), this.$_addRule({ name: "base64", args: { options: e4 } });
          }, validate: (e4, t4, { options: r2 }) => p.base64Regex[r2.paddingRequired][r2.urlSafe].test(e4) ? e4 : t4.error("string.base64") }, case: { method(e4) {
            return n(["lower", "upper"].includes(e4), "Invalid case:", e4), this.$_addRule({ name: "case", args: { direction: e4 } });
          }, validate: (e4, t4, { direction: r2 }) => "lower" === r2 && e4 === e4.toLocaleLowerCase() || "upper" === r2 && e4 === e4.toLocaleUpperCase() ? e4 : t4.error(`string.${r2}case`), convert: true }, creditCard: { method() {
            return this.$_addRule("creditCard");
          }, validate(e4, t4) {
            let r2 = e4.length, n2 = 0, a2 = 1;
            for (; r2--; ) {
              let t5 = e4.charAt(r2) * a2;
              n2 += t5 - 9 * (t5 > 9), a2 ^= 3;
            }
            return n2 > 0 && n2 % 10 == 0 ? e4 : t4.error("string.creditCard");
          } }, dataUri: { method(e4 = {}) {
            return d.assertOptions(e4, ["paddingRequired"]), n("boolean" == typeof (e4 = { paddingRequired: true, ...e4 }).paddingRequired, "paddingRequired must be boolean"), this.$_addRule({ name: "dataUri", args: { options: e4 } });
          }, validate(e4, t4, { options: r2 }) {
            let n2 = e4.match(p.dataUriRegex);
            return n2 && (!n2[2] || "base64" !== n2[2] || p.base64Regex[r2.paddingRequired].false.test(n2[3])) ? e4 : t4.error("string.dataUri");
          } }, domain: { method(e4) {
            e4 && d.assertOptions(e4, ["allowFullyQualified", "allowUnicode", "maxDomainSegments", "minDomainSegments", "tlds"]);
            let t4 = p.addressOptions(e4);
            return this.$_addRule({ name: "domain", args: { options: e4 }, address: t4 });
          }, validate: (e4, t4, r2, { address: n2 }) => a.isValid(e4, n2) ? e4 : t4.error("string.domain") }, email: { method(e4 = {}) {
            d.assertOptions(e4, ["allowFullyQualified", "allowUnicode", "ignoreLength", "maxDomainSegments", "minDomainSegments", "multiple", "separator", "tlds"]), n(void 0 === e4.multiple || "boolean" == typeof e4.multiple, "multiple option must be an boolean");
            let t4 = p.addressOptions(e4), r2 = RegExp(`\\s*[${e4.separator ? o(e4.separator) : ","}]\\s*`);
            return this.$_addRule({ name: "email", args: { options: e4 }, regex: r2, address: t4 });
          }, validate(e4, t4, { options: r2 }, { regex: n2, address: a2 }) {
            let s2 = r2.multiple ? e4.split(n2) : [e4], o2 = [];
            for (let e5 of s2) i.isValid(e5, a2) || o2.push(e5);
            return o2.length ? t4.error("string.email", { value: e4, invalids: o2 }) : e4;
          } }, guid: { alias: "uuid", method(e4 = {}) {
            d.assertOptions(e4, ["version", "separator"]);
            let t4 = "";
            if (e4.version) {
              let r3 = [].concat(e4.version);
              n(r3.length >= 1, "version must have at least 1 valid version specified");
              let a3 = /* @__PURE__ */ new Set();
              for (let e5 = 0; e5 < r3.length; ++e5) {
                let i2 = r3[e5];
                n("string" == typeof i2, "version at position " + e5 + " must be a string");
                let s2 = p.guidVersions[i2.toLowerCase()];
                n(s2, "version at position " + e5 + " must be one of " + Object.keys(p.guidVersions).join(", ")), n(!a3.has(s2), "version at position " + e5 + " must not be a duplicate"), t4 += s2, a3.add(s2);
              }
            }
            n(p.guidSeparators.has(e4.separator), 'separator must be one of true, false, "-", or ":"');
            let r2 = void 0 === e4.separator ? "[:-]?" : true === e4.separator ? "[:-]" : false === e4.separator ? "[]?" : `\\${e4.separator}`, a2 = RegExp(`^([\\[{\\(]?)[0-9A-F]{8}(${r2})[0-9A-F]{4}\\2?[${t4 || "0-9A-F"}][0-9A-F]{3}\\2?[${t4 ? "89AB" : "0-9A-F"}][0-9A-F]{3}\\2?[0-9A-F]{12}([\\]}\\)]?)$`, "i");
            return this.$_addRule({ name: "guid", args: { options: e4 }, regex: a2 });
          }, validate(e4, t4, r2, { regex: n2 }) {
            let a2 = n2.exec(e4);
            return a2 ? p.guidBrackets[a2[1]] !== a2[a2.length - 1] ? t4.error("string.guid") : e4 : t4.error("string.guid");
          } }, hex: { method(e4 = {}) {
            return d.assertOptions(e4, ["byteAligned", "prefix"]), n("boolean" == typeof (e4 = { byteAligned: false, prefix: false, ...e4 }).byteAligned, "byteAligned must be boolean"), n("boolean" == typeof e4.prefix || "optional" === e4.prefix, 'prefix must be boolean or "optional"'), this.$_addRule({ name: "hex", args: { options: e4 } });
          }, validate: (e4, t4, { options: r2 }) => ("optional" === r2.prefix ? p.hexRegex.withOptionalPrefix : true === r2.prefix ? p.hexRegex.withPrefix : p.hexRegex.withoutPrefix).test(e4) ? r2.byteAligned && e4.length % 2 != 0 ? t4.error("string.hexAlign") : e4 : t4.error("string.hex") }, hostname: { method() {
            return this.$_addRule("hostname");
          }, validate: (e4, t4) => a.isValid(e4, { minDomainSegments: 1 }) || p.ipRegex.test(e4) ? e4 : t4.error("string.hostname") }, insensitive: { method() {
            return this.$_setFlag("insensitive", true);
          } }, ip: { method(e4 = {}) {
            d.assertOptions(e4, ["cidr", "version"]);
            let { cidr: t4, versions: r2, regex: n2 } = s.regex(e4), a2 = e4.version ? r2 : void 0;
            return this.$_addRule({ name: "ip", args: { options: { cidr: t4, version: a2 } }, regex: n2 });
          }, validate: (e4, t4, { options: r2 }, { regex: n2 }) => n2.test(e4) ? e4 : r2.version ? t4.error("string.ipVersion", { value: e4, cidr: r2.cidr, version: r2.version }) : t4.error("string.ip", { value: e4, cidr: r2.cidr }) }, isoDate: { method() {
            return this.$_addRule("isoDate");
          }, validate: (e4, { error: t4 }) => p.isoDate(e4) ? e4 : t4("string.isoDate") }, isoDuration: { method() {
            return this.$_addRule("isoDuration");
          }, validate: (e4, t4) => p.isoDurationRegex.test(e4) ? e4 : t4.error("string.isoDuration") }, length: { method(e4, t4) {
            return p.length(this, "length", e4, "=", t4);
          }, validate(e4, t4, { limit: r2, encoding: n2 }, { name: a2, operator: i2, args: s2 }) {
            let o2 = !n2 && e4.length;
            return d.compare(o2, r2, i2) ? e4 : t4.error("string." + a2, { limit: s2.limit, value: e4, encoding: n2 });
          }, args: [{ name: "limit", ref: true, assert: d.limit, message: "must be a positive integer" }, "encoding"] }, lowercase: { method() {
            return this.case("lower");
          } }, max: { method(e4, t4) {
            return p.length(this, "max", e4, "<=", t4);
          }, args: ["limit", "encoding"] }, min: { method(e4, t4) {
            return p.length(this, "min", e4, ">=", t4);
          }, args: ["limit", "encoding"] }, normalize: { method(e4 = "NFC") {
            return n(p.normalizationForms.includes(e4), "normalization form must be one of " + p.normalizationForms.join(", ")), this.$_addRule({ name: "normalize", args: { form: e4 } });
          }, validate: (e4, { error: t4 }, { form: r2 }) => e4 === e4.normalize(r2) ? e4 : t4("string.normalize", { value: e4, form: r2 }), convert: true }, pattern: { alias: "regex", method(e4, t4 = {}) {
            n(e4 instanceof RegExp, "regex must be a RegExp"), n(!e4.flags.includes("g") && !e4.flags.includes("y"), "regex should not use global or sticky mode"), "string" == typeof t4 && (t4 = { name: t4 }), d.assertOptions(t4, ["invert", "name"]);
            let r2 = ["string.pattern", t4.invert ? ".invert" : "", t4.name ? ".name" : ".base"].join("");
            return this.$_addRule({ name: "pattern", args: { regex: e4, options: t4 }, errorCode: r2 });
          }, validate: (e4, t4, { regex: r2, options: n2 }, { errorCode: a2 }) => r2.test(e4) ^ n2.invert ? e4 : t4.error(a2, { name: n2.name, regex: r2, value: e4 }), args: ["regex", "options"], multi: true }, replace: { method(e4, t4) {
            "string" == typeof e4 && (e4 = RegExp(o(e4), "g")), n(e4 instanceof RegExp, "pattern must be a RegExp"), n("string" == typeof t4, "replacement must be a String");
            let r2 = this.clone();
            return r2.$_terms.replacements || (r2.$_terms.replacements = []), r2.$_terms.replacements.push({ pattern: e4, replacement: t4 }), r2;
          } }, token: { method() {
            return this.$_addRule("token");
          }, validate: (e4, t4) => /^\w+$/.test(e4) ? e4 : t4.error("string.token") }, trim: { method(e4 = true) {
            return n("boolean" == typeof e4, "enabled must be a boolean"), this.$_addRule({ name: "trim", args: { enabled: e4 } });
          }, validate: (e4, t4, { enabled: r2 }) => r2 && e4 !== e4.trim() ? t4.error("string.trim") : e4, convert: true }, truncate: { method(e4 = true) {
            return n("boolean" == typeof e4, "enabled must be a boolean"), this.$_setFlag("truncate", e4);
          } }, uppercase: { method() {
            return this.case("upper");
          } }, uri: { method(e4 = {}) {
            d.assertOptions(e4, ["allowRelative", "allowQuerySquareBrackets", "domain", "relativeOnly", "scheme", "encodeUri"]), e4.domain && d.assertOptions(e4.domain, ["allowFullyQualified", "allowUnicode", "maxDomainSegments", "minDomainSegments", "tlds"]);
            let { regex: t4, scheme: r2 } = c.regex(e4), n2 = e4.domain ? p.addressOptions(e4.domain) : null;
            return this.$_addRule({ name: "uri", args: { options: e4 }, regex: t4, domain: n2, scheme: r2 });
          }, validate(e4, t4, { options: r2 }, { regex: n2, domain: i2, scheme: s2 }) {
            if (["http:/", "https:/"].includes(e4)) return t4.error("string.uri");
            let o2 = n2.exec(e4);
            if (!o2 && t4.prefs.convert && r2.encodeUri) {
              let t5 = encodeURI(e4);
              (o2 = n2.exec(t5)) && (e4 = t5);
            }
            if (o2) {
              let n3 = o2[1] || o2[2];
              return !i2 || r2.allowRelative && !n3 || a.isValid(n3, i2) ? e4 : t4.error("string.domain", { value: n3 });
            }
            return r2.relativeOnly ? t4.error("string.uriRelativeOnly") : r2.scheme ? t4.error("string.uriCustomScheme", { scheme: s2, value: e4 }) : t4.error("string.uri");
          } } }, manifest: { build(e4, t4) {
            if (t4.replacements) for (let { pattern: r2, replacement: n2 } of t4.replacements) e4 = e4.replace(r2, n2);
            return e4;
          } }, messages: { "string.alphanum": "{{#label}} must only contain alpha-numeric characters", "string.base": "{{#label}} must be a string", "string.base64": "{{#label}} must be a valid base64 string", "string.creditCard": "{{#label}} must be a credit card", "string.dataUri": "{{#label}} must be a valid dataUri string", "string.domain": "{{#label}} must contain a valid domain name", "string.email": "{{#label}} must be a valid email", "string.empty": "{{#label}} is not allowed to be empty", "string.guid": "{{#label}} must be a valid GUID", "string.hex": "{{#label}} must only contain hexadecimal characters", "string.hexAlign": "{{#label}} hex decoded representation must be byte aligned", "string.hostname": "{{#label}} must be a valid hostname", "string.ip": "{{#label}} must be a valid ip address with a {{#cidr}} CIDR", "string.ipVersion": "{{#label}} must be a valid ip address of one of the following versions {{#version}} with a {{#cidr}} CIDR", "string.isoDate": "{{#label}} must be in iso format", "string.isoDuration": "{{#label}} must be a valid ISO 8601 duration", "string.length": "{{#label}} length must be {{#limit}} characters long", "string.lowercase": "{{#label}} must only contain lowercase characters", "string.max": "{{#label}} length must be less than or equal to {{#limit}} characters long", "string.min": "{{#label}} length must be at least {{#limit}} characters long", "string.normalize": "{{#label}} must be unicode normalized in the {{#form}} form", "string.token": "{{#label}} must only contain alpha-numeric and underscore characters", "string.pattern.base": "{{#label}} with value {:[.]} fails to match the required pattern: {{#regex}}", "string.pattern.name": "{{#label}} with value {:[.]} fails to match the {{#name}} pattern", "string.pattern.invert.base": "{{#label}} with value {:[.]} matches the inverted pattern: {{#regex}}", "string.pattern.invert.name": "{{#label}} with value {:[.]} matches the inverted {{#name}} pattern", "string.trim": "{{#label}} must not have leading or trailing whitespace", "string.uri": "{{#label}} must be a valid uri", "string.uriCustomScheme": "{{#label}} must be a valid uri with a scheme matching the {{#scheme}} pattern", "string.uriRelativeOnly": "{{#label}} must be a valid relative uri", "string.uppercase": "{{#label}} must only contain uppercase characters" } }), p.addressOptions = function(e4) {
            if (!e4) return p.tlds || e4;
            if (n(void 0 === e4.minDomainSegments || Number.isSafeInteger(e4.minDomainSegments) && e4.minDomainSegments > 0, "minDomainSegments must be a positive integer"), n(void 0 === e4.maxDomainSegments || Number.isSafeInteger(e4.maxDomainSegments) && e4.maxDomainSegments > 0, "maxDomainSegments must be a positive integer"), false === e4.tlds) return e4;
            if (true === e4.tlds || void 0 === e4.tlds) return n(p.tlds, "Built-in TLD list disabled"), Object.assign({}, e4, p.tlds);
            n("object" == typeof e4.tlds, "tlds must be true, false, or an object");
            let t4 = e4.tlds.deny;
            if (t4) return Array.isArray(t4) && (e4 = Object.assign({}, e4, { tlds: { deny: new Set(t4) } })), n(e4.tlds.deny instanceof Set, "tlds.deny must be an array, Set, or boolean"), n(!e4.tlds.allow, "Cannot specify both tlds.allow and tlds.deny lists"), p.validateTlds(e4.tlds.deny, "tlds.deny"), e4;
            let r2 = e4.tlds.allow;
            return r2 ? true === r2 ? (n(p.tlds, "Built-in TLD list disabled"), Object.assign({}, e4, p.tlds)) : (Array.isArray(r2) && (e4 = Object.assign({}, e4, { tlds: { allow: new Set(r2) } })), n(e4.tlds.allow instanceof Set, "tlds.allow must be an array, Set, or boolean"), p.validateTlds(e4.tlds.allow, "tlds.allow"), e4) : e4;
          }, p.validateTlds = function(e4, t4) {
            for (let r2 of e4) n(a.isValid(r2, { minDomainSegments: 1, maxDomainSegments: 1 }), `${t4} must contain valid top level domain names`);
          }, p.isoDate = function(e4) {
            if (!d.isIsoDate(e4)) return null;
            /.*T.*[+-]\d\d$/.test(e4) && (e4 += "00");
            let t4 = new Date(e4);
            return isNaN(t4.getTime()) ? null : t4.toISOString();
          }, p.length = function(e4, t4, r2, a2, i2) {
            return n(!i2, "Invalid encoding:", i2), e4.$_addRule({ name: t4, method: "length", args: { limit: r2, encoding: i2 }, operator: a2 });
          };
        }, 8826: (e3, t3, r) => {
          "use strict";
          let n = r(375), a = r(8068), i = {};
          i.Map = class extends Map {
            slice() {
              return new i.Map(this);
            }
          }, e3.exports = a.extend({ type: "symbol", terms: { map: { init: new i.Map() } }, coerce: { method(e4, { schema: t4, error: r2 }) {
            let n2 = t4.$_terms.map.get(e4);
            return n2 && (e4 = n2), t4._flags.only && "symbol" != typeof e4 ? { value: e4, errors: r2("symbol.map", { map: t4.$_terms.map }) } : { value: e4 };
          } }, validate(e4, { error: t4 }) {
            if ("symbol" != typeof e4) return { value: e4, errors: t4("symbol.base") };
          }, rules: { map: { method(e4) {
            e4 && !e4[Symbol.iterator] && "object" == typeof e4 && (e4 = Object.entries(e4)), n(e4 && e4[Symbol.iterator], "Iterable must be an iterable or object");
            let t4 = this.clone(), r2 = [];
            for (let a2 of e4) {
              n(a2 && a2[Symbol.iterator], "Entry must be an iterable");
              let [e5, i2] = a2;
              n("object" != typeof e5 && "function" != typeof e5 && "symbol" != typeof e5, "Key must not be of type object, function, or Symbol"), n("symbol" == typeof i2, "Value must be a Symbol"), t4.$_terms.map.set(e5, i2), r2.push(i2);
            }
            return t4.valid(...r2);
          } } }, manifest: { build: (e4, t4) => (t4.map && (e4 = e4.map(t4.map)), e4) }, messages: { "symbol.base": "{{#label}} must be a symbol", "symbol.map": "{{#label}} must be one of {{#map}}" } });
        }, 8863: (e3, t3, r) => {
          "use strict";
          let n = r(375), a = r(8571), i = r(738), s = r(9621), o = r(8160), l = r(6354), c = r(493), u = { result: Symbol("result") };
          t3.entry = function(e4, t4, r2) {
            let a2 = o.defaults;
            r2 && (n(void 0 === r2.warnings, "Cannot override warnings preference in synchronous validation"), n(void 0 === r2.artifacts, "Cannot override artifacts preference in synchronous validation"), a2 = o.preferences(o.defaults, r2));
            let i2 = u.entry(e4, t4, a2);
            n(!i2.mainstay.externals.length, "Schema with external rules must use validateAsync()");
            let s2 = { value: i2.value };
            return i2.error && (s2.error = i2.error), i2.mainstay.warnings.length && (s2.warning = l.details(i2.mainstay.warnings)), i2.mainstay.debug && (s2.debug = i2.mainstay.debug), i2.mainstay.artifacts && (s2.artifacts = i2.mainstay.artifacts), s2;
          }, t3.entryAsync = async function(e4, t4, r2) {
            let n2 = o.defaults;
            r2 && (n2 = o.preferences(o.defaults, r2));
            let a2 = u.entry(e4, t4, n2), i2 = a2.mainstay;
            if (a2.error) throw i2.debug && (a2.error.debug = i2.debug), a2.error;
            if (i2.externals.length) {
              let t5 = a2.value, c3 = [];
              for (let a3 of i2.externals) {
                let d = a3.state.path, p = "link" === a3.schema.type ? i2.links.get(a3.schema) : null, h, f, m = t5, g = d.length ? [t5] : [], y = d.length ? s(e4, d) : e4;
                if (d.length) {
                  h = d[d.length - 1];
                  let e5 = t5;
                  for (let t6 of d.slice(0, -1)) e5 = e5[t6], g.unshift(e5);
                  m = (f = g[0])[h];
                }
                try {
                  let e5 = (e6, t6) => (p || a3.schema).$_createError(e6, m, t6, a3.state, n2), s2 = await a3.method(m, { schema: a3.schema, linked: p, state: a3.state, prefs: r2, original: y, error: e5, errorsArray: u.errorsArray, warn: (e6, t6) => i2.warnings.push((p || a3.schema).$_createError(e6, m, t6, a3.state, n2)), message: (e6, t6) => (p || a3.schema).$_createError("external", m, t6, a3.state, n2, { messages: e6 }) });
                  if (void 0 === s2 || s2 === m) continue;
                  if (s2 instanceof l.Report) {
                    if (i2.tracer.log(a3.schema, a3.state, "rule", "external", "error"), c3.push(s2), n2.abortEarly) break;
                    continue;
                  }
                  if (Array.isArray(s2) && s2[o.symbols.errors]) {
                    if (i2.tracer.log(a3.schema, a3.state, "rule", "external", "error"), c3.push(...s2), n2.abortEarly) break;
                    continue;
                  }
                  f ? (i2.tracer.value(a3.state, "rule", m, s2, "external"), f[h] = s2) : (i2.tracer.value(a3.state, "rule", t5, s2, "external"), t5 = s2);
                } catch (e5) {
                  throw n2.errors.label && (e5.message += ` (${a3.label})`), e5;
                }
              }
              if (a2.value = t5, c3.length) throw a2.error = l.process(c3, e4, n2), i2.debug && (a2.error.debug = i2.debug), a2.error;
            }
            if (!n2.warnings && !n2.debug && !n2.artifacts) return a2.value;
            let c2 = { value: a2.value };
            return i2.warnings.length && (c2.warning = l.details(i2.warnings)), i2.debug && (c2.debug = i2.debug), i2.artifacts && (c2.artifacts = i2.artifacts), c2;
          }, u.Mainstay = class {
            constructor(e4, t4, r2) {
              this.externals = [], this.warnings = [], this.tracer = e4, this.debug = t4, this.links = r2, this.shadow = null, this.artifacts = null, this._snapshots = [];
            }
            snapshot() {
              this._snapshots.push({ externals: this.externals.slice(), warnings: this.warnings.slice() });
            }
            restore() {
              let e4 = this._snapshots.pop();
              this.externals = e4.externals, this.warnings = e4.warnings;
            }
            commit() {
              this._snapshots.pop();
            }
          }, u.entry = function(e4, r2, n2) {
            let { tracer: a2, cleanup: i2 } = u.tracer(r2, n2), s2 = n2.debug ? [] : null, o2 = r2._ids._schemaChain ? /* @__PURE__ */ new Map() : null, d = new u.Mainstay(a2, s2, o2), p = new c([], [], { mainstay: d, schemas: r2._ids._schemaChain ? [{ schema: r2 }] : null }), h = t3.validate(e4, r2, p, n2);
            i2 && r2.$_root.untrace();
            let f = l.process(h.errors, e4, n2);
            return { value: h.value, error: f, mainstay: d };
          }, u.tracer = function(e4, t4) {
            return e4.$_root._tracer ? { tracer: e4.$_root._tracer._register(e4) } : t4.debug ? (n(e4.$_root.trace, "Debug mode not supported"), { tracer: e4.$_root.trace()._register(e4), cleanup: true }) : { tracer: u.ignore };
          }, t3.validate = function(e4, t4, r2, n2, a2 = {}) {
            if (t4.$_terms.whens && (t4 = t4._generate(e4, r2, n2).schema), t4._preferences && (n2 = u.prefs(t4, n2)), t4._cache && n2.cache) {
              let n3 = t4._cache.get(e4);
              if (r2.mainstay.tracer.debug(r2, "validate", "cached", !!n3), n3) return n3;
            }
            let i2 = (a3, i3, s3) => t4.$_createError(a3, e4, i3, s3 || r2, n2), s2 = { original: e4, prefs: n2, schema: t4, state: r2, error: i2, errorsArray: u.errorsArray, warn: (e5, t5, n3) => r2.mainstay.warnings.push(i2(e5, t5, n3)), message: (a3, i3) => t4.$_createError("custom", e4, i3, r2, n2, { messages: a3 }) };
            r2.mainstay.tracer.entry(t4, r2);
            let l2 = t4._definition;
            if (l2.prepare && void 0 !== e4 && n2.convert) {
              let t5 = l2.prepare(e4, s2);
              if (t5) {
                if (r2.mainstay.tracer.value(r2, "prepare", e4, t5.value), t5.errors) return u.finalize(t5.value, [].concat(t5.errors), s2);
                e4 = t5.value;
              }
            }
            if (l2.coerce && void 0 !== e4 && n2.convert && (!l2.coerce.from || l2.coerce.from.includes(typeof e4))) {
              let t5 = l2.coerce.method(e4, s2);
              if (t5) {
                if (r2.mainstay.tracer.value(r2, "coerced", e4, t5.value), t5.errors) return u.finalize(t5.value, [].concat(t5.errors), s2);
                e4 = t5.value;
              }
            }
            let c2 = t4._flags.empty;
            c2 && c2.$_match(u.trim(e4, t4), r2.nest(c2), o.defaults) && (r2.mainstay.tracer.value(r2, "empty", e4, void 0), e4 = void 0);
            let d = a2.presence || t4._flags.presence || (t4._flags._endedSwitch ? null : n2.presence);
            if (void 0 === e4) {
              if ("forbidden" === d) return u.finalize(e4, null, s2);
              if ("required" === d) return u.finalize(e4, [t4.$_createError("any.required", e4, null, r2, n2)], s2);
              if ("optional" === d) {
                if (t4._flags.default !== o.symbols.deepDefault) return u.finalize(e4, null, s2);
                r2.mainstay.tracer.value(r2, "default", e4, {}), e4 = {};
              }
            } else if ("forbidden" === d) return u.finalize(e4, [t4.$_createError("any.unknown", e4, null, r2, n2)], s2);
            let p = [];
            if (t4._valids) {
              let a3 = t4._valids.get(e4, r2, n2, t4._flags.insensitive);
              if (a3) return n2.convert && (r2.mainstay.tracer.value(r2, "valids", e4, a3.value), e4 = a3.value), r2.mainstay.tracer.filter(t4, r2, "valid", a3), u.finalize(e4, null, s2);
              if (t4._flags.only) {
                let a4 = t4.$_createError("any.only", e4, { valids: t4._valids.values({ display: true }) }, r2, n2);
                if (n2.abortEarly) return u.finalize(e4, [a4], s2);
                p.push(a4);
              }
            }
            if (t4._invalids) {
              let a3 = t4._invalids.get(e4, r2, n2, t4._flags.insensitive);
              if (a3) {
                r2.mainstay.tracer.filter(t4, r2, "invalid", a3);
                let i3 = t4.$_createError("any.invalid", e4, { invalids: t4._invalids.values({ display: true }) }, r2, n2);
                if (n2.abortEarly) return u.finalize(e4, [i3], s2);
                p.push(i3);
              }
            }
            if (l2.validate) {
              let t5 = l2.validate(e4, s2);
              if (t5 && (r2.mainstay.tracer.value(r2, "base", e4, t5.value), e4 = t5.value, t5.errors)) {
                if (!Array.isArray(t5.errors)) return p.push(t5.errors), u.finalize(e4, p, s2);
                if (t5.errors.length) return p.push(...t5.errors), u.finalize(e4, p, s2);
              }
            }
            return t4._rules.length ? u.rules(e4, p, s2) : u.finalize(e4, p, s2);
          }, u.rules = function(e4, t4, r2) {
            let { schema: n2, state: a2, prefs: i2 } = r2;
            for (let s2 of n2._rules) {
              let l2 = n2._definition.rules[s2.method];
              if (l2.convert && i2.convert) {
                a2.mainstay.tracer.log(n2, a2, "rule", s2.name, "full");
                continue;
              }
              let c2, d = s2.args;
              if (s2._resolve.length) for (let t5 of (d = Object.assign({}, d), s2._resolve)) {
                let r3 = l2.argsByName.get(t5), s3 = d[t5].resolve(e4, a2, i2), u2 = r3.normalize ? r3.normalize(s3) : s3, p2 = o.validateArg(u2, null, r3);
                if (p2) {
                  c2 = n2.$_createError("any.ref", s3, { arg: t5, ref: d[t5], reason: p2 }, a2, i2);
                  break;
                }
                d[t5] = u2;
              }
              c2 = c2 || l2.validate(e4, r2, d, s2);
              let p = u.rule(c2, s2);
              if (p.errors) {
                if (a2.mainstay.tracer.log(n2, a2, "rule", s2.name, "error"), s2.warn) {
                  a2.mainstay.warnings.push(...p.errors);
                  continue;
                }
                if (i2.abortEarly) return u.finalize(e4, p.errors, r2);
                t4.push(...p.errors);
              } else a2.mainstay.tracer.log(n2, a2, "rule", s2.name, "pass"), a2.mainstay.tracer.value(a2, "rule", e4, p.value, s2.name), e4 = p.value;
            }
            return u.finalize(e4, t4, r2);
          }, u.rule = function(e4, t4) {
            return e4 instanceof l.Report ? (u.error(e4, t4), { errors: [e4], value: null }) : Array.isArray(e4) && e4[o.symbols.errors] ? (e4.forEach((e5) => u.error(e5, t4)), { errors: e4, value: null }) : { errors: null, value: e4 };
          }, u.error = function(e4, t4) {
            return t4.message && e4._setTemplate(t4.message), e4;
          }, u.finalize = function(e4, t4, r2) {
            let { schema: a2, state: i2, prefs: s2 } = r2;
            if ((t4 = t4 || []).length) {
              let n2 = u.default("failover", void 0, t4, r2);
              void 0 !== n2 && (i2.mainstay.tracer.value(i2, "failover", e4, n2), e4 = n2, t4 = []);
            }
            if (t4.length && a2._flags.error) {
              if ("function" == typeof a2._flags.error) for (let e5 of (Array.isArray(t4 = a2._flags.error(t4)) || (t4 = [t4]), t4)) n(e5 instanceof Error || e5 instanceof l.Report, "error() must return an Error object");
              else t4 = [a2._flags.error];
            }
            if (void 0 === e4) {
              let n2 = u.default("default", e4, t4, r2);
              i2.mainstay.tracer.value(i2, "default", e4, n2), e4 = n2;
            }
            if (a2._flags.cast && void 0 !== e4) {
              let t5 = a2._definition.cast[a2._flags.cast];
              if (t5.from(e4)) {
                let n2 = t5.to(e4, r2);
                i2.mainstay.tracer.value(i2, "cast", e4, n2, a2._flags.cast), e4 = n2;
              }
            }
            if (a2.$_terms.externals && s2.externals && false !== s2._externals) for (let { method: e5 } of a2.$_terms.externals) i2.mainstay.externals.push({ method: e5, schema: a2, state: i2, label: l.label(a2._flags, i2, s2) });
            let o2 = { value: e4, errors: t4.length ? t4 : null };
            return a2._flags.result && (o2.value = "strip" === a2._flags.result ? void 0 : r2.original, i2.mainstay.tracer.value(i2, a2._flags.result, e4, o2.value), i2.shadow(e4, a2._flags.result)), a2._cache && false !== s2.cache && !a2._refs.length && a2._cache.set(r2.original, o2), void 0 === e4 || o2.errors || void 0 === a2._flags.artifact || (i2.mainstay.artifacts = i2.mainstay.artifacts || /* @__PURE__ */ new Map(), i2.mainstay.artifacts.has(a2._flags.artifact) || i2.mainstay.artifacts.set(a2._flags.artifact, []), i2.mainstay.artifacts.get(a2._flags.artifact).push(i2.path)), o2;
          }, u.prefs = function(e4, t4) {
            let r2 = t4 === o.defaults;
            return r2 && e4._preferences[o.symbols.prefs] ? e4._preferences[o.symbols.prefs] : (t4 = o.preferences(t4, e4._preferences), r2 && (e4._preferences[o.symbols.prefs] = t4), t4);
          }, u.default = function(e4, t4, r2, n2) {
            let { schema: i2, state: s2, prefs: l2 } = n2, c2 = i2._flags[e4];
            if (l2.noDefaults || void 0 === c2) return t4;
            if (s2.mainstay.tracer.log(i2, s2, "rule", e4, "full"), !c2) return c2;
            if ("function" == typeof c2) {
              let t5 = c2.length ? [a(s2.ancestors[0]), n2] : [];
              try {
                return c2(...t5);
              } catch (t6) {
                return void r2.push(i2.$_createError(`any.${e4}`, null, { error: t6 }, s2, l2));
              }
            }
            return "object" != typeof c2 ? c2 : c2[o.symbols.literal] ? c2.literal : o.isResolvable(c2) ? c2.resolve(t4, s2, l2) : a(c2);
          }, u.trim = function(e4, t4) {
            if ("string" != typeof e4) return e4;
            let r2 = t4.$_getRule("trim");
            return r2 && r2.args.enabled ? e4.trim() : e4;
          }, u.ignore = { active: false, debug: i, entry: i, filter: i, log: i, resolve: i, value: i }, u.errorsArray = function() {
            let e4 = [];
            return e4[o.symbols.errors] = true, e4;
          };
        }, 2036: (e3, t3, r) => {
          "use strict";
          let n = r(375), a = r(9474), i = r(8160), s = {};
          e3.exports = s.Values = class {
            constructor(e4, t4) {
              this._values = new Set(e4), this._refs = new Set(t4), this._lowercase = s.lowercases(e4), this._override = false;
            }
            get length() {
              return this._values.size + this._refs.size;
            }
            add(e4, t4) {
              i.isResolvable(e4) ? this._refs.has(e4) || (this._refs.add(e4), t4 && t4.register(e4)) : this.has(e4, null, null, false) || (this._values.add(e4), "string" == typeof e4 && this._lowercase.set(e4.toLowerCase(), e4));
            }
            static merge(e4, t4, r2) {
              if (e4 = e4 || new s.Values(), t4) {
                if (t4._override) return t4.clone();
                for (let r3 of [...t4._values, ...t4._refs]) e4.add(r3);
              }
              if (r2) for (let t5 of [...r2._values, ...r2._refs]) e4.remove(t5);
              return e4.length ? e4 : null;
            }
            remove(e4) {
              i.isResolvable(e4) ? this._refs.delete(e4) : (this._values.delete(e4), "string" == typeof e4 && this._lowercase.delete(e4.toLowerCase()));
            }
            has(e4, t4, r2, n2) {
              return !!this.get(e4, t4, r2, n2);
            }
            get(e4, t4, r2, n2) {
              if (!this.length) return false;
              if (this._values.has(e4)) return { value: e4 };
              if ("string" == typeof e4 && e4 && n2) {
                let t5 = this._lowercase.get(e4.toLowerCase());
                if (t5) return { value: t5 };
              }
              if (!this._refs.size && "object" != typeof e4) return false;
              if ("object" == typeof e4) {
                for (let t5 of this._values) if (a(t5, e4)) return { value: t5 };
              }
              if (t4) for (let i2 of this._refs) {
                let s2 = i2.resolve(e4, t4, r2, null, { in: true });
                if (void 0 !== s2) {
                  for (let t5 of i2.in && "object" == typeof s2 ? Array.isArray(s2) ? s2 : Object.keys(s2) : [s2]) if (typeof t5 == typeof e4) {
                    if (n2 && e4 && "string" == typeof e4) {
                      if (t5.toLowerCase() === e4.toLowerCase()) return { value: t5, ref: i2 };
                    } else if (a(t5, e4)) return { value: t5, ref: i2 };
                  }
                }
              }
              return false;
            }
            override() {
              this._override = true;
            }
            values(e4) {
              if (e4 && e4.display) {
                let e5 = [];
                for (let t4 of [...this._values, ...this._refs]) void 0 !== t4 && e5.push(t4);
                return e5;
              }
              return Array.from([...this._values, ...this._refs]);
            }
            clone() {
              let e4 = new s.Values(this._values, this._refs);
              return e4._override = this._override, e4;
            }
            concat(e4) {
              n(!e4._override, "Cannot concat override set of values");
              let t4 = new s.Values([...this._values, ...e4._values], [...this._refs, ...e4._refs]);
              return t4._override = this._override, t4;
            }
            describe() {
              let e4 = [];
              for (let t4 of (this._override && e4.push({ override: true }), this._values.values())) e4.push(t4 && "object" == typeof t4 ? { value: t4 } : t4);
              for (let t4 of this._refs.values()) e4.push(t4.describe());
              return e4;
            }
          }, s.Values.prototype[i.symbols.values] = true, s.Values.prototype.slice = s.Values.prototype.clone, s.lowercases = function(e4) {
            let t4 = /* @__PURE__ */ new Map();
            if (e4) for (let r2 of e4) "string" == typeof r2 && t4.set(r2.toLowerCase(), r2);
            return t4;
          };
        }, 978: (e3, t3, r) => {
          "use strict";
          let n = r(375), a = r(8571), i = r(1687), s = r(9621), o = {};
          e3.exports = function(e4, t4, r2 = {}) {
            if (n(e4 && "object" == typeof e4, "Invalid defaults value: must be an object"), n(!t4 || true === t4 || "object" == typeof t4, "Invalid source value: must be true, falsy or an object"), n("object" == typeof r2, "Invalid options: must be an object"), !t4) return null;
            if (r2.shallow) return o.applyToDefaultsWithShallow(e4, t4, r2);
            let s2 = a(e4);
            return true === t4 ? s2 : i(s2, t4, { nullOverride: void 0 !== r2.nullOverride && r2.nullOverride, mergeArrays: false });
          }, o.applyToDefaultsWithShallow = function(e4, t4, r2) {
            let l = r2.shallow;
            n(Array.isArray(l), "Invalid keys");
            let c = /* @__PURE__ */ new Map(), u = true === t4 ? null : /* @__PURE__ */ new Set();
            for (let r3 of l) {
              let n2 = s(e4, r3 = Array.isArray(r3) ? r3 : r3.split("."));
              n2 && "object" == typeof n2 ? c.set(n2, u && s(t4, r3) || n2) : u && u.add(r3);
            }
            let d = a(e4, {}, c);
            if (!u) return d;
            for (let e5 of u) o.reachCopy(d, t4, e5);
            return i(d, t4, { nullOverride: void 0 !== r2.nullOverride && r2.nullOverride, mergeArrays: false });
          }, o.reachCopy = function(e4, t4, r2) {
            for (let e5 of r2) {
              if (!(e5 in t4)) return;
              let r3 = t4[e5];
              if ("object" != typeof r3 || null === r3) return;
              t4 = r3;
            }
            let n2 = t4, a2 = e4;
            for (let e5 = 0; e5 < r2.length - 1; ++e5) {
              let t5 = r2[e5];
              "object" != typeof a2[t5] && (a2[t5] = {}), a2 = a2[t5];
            }
            a2[r2[r2.length - 1]] = n2;
          };
        }, 375: (e3, t3, r) => {
          "use strict";
          let n = r(7916);
          e3.exports = function(e4, ...t4) {
            if (!e4) {
              if (1 === t4.length && t4[0] instanceof Error) throw t4[0];
              throw new n(t4);
            }
          };
        }, 8571: (e3, t3, r) => {
          "use strict";
          let n = r(9621), a = r(4277), i = r(7043), s = { needsProtoHack: /* @__PURE__ */ new Set([a.set, a.map, a.weakSet, a.weakMap]) };
          e3.exports = s.clone = function(e4, t4 = {}, r2 = null) {
            if ("object" != typeof e4 || null === e4) return e4;
            let n2 = s.clone, o = r2;
            if (t4.shallow) {
              if (true !== t4.shallow) return s.cloneWithShallow(e4, t4);
              n2 = (e5) => e5;
            } else if (o) {
              let t5 = o.get(e4);
              if (t5) return t5;
            } else o = /* @__PURE__ */ new Map();
            let l = a.getInternalProto(e4);
            if (l === a.buffer) return false;
            if (l === a.date) return new Date(e4.getTime());
            if (l === a.regex) return new RegExp(e4);
            let c = s.base(e4, l, t4);
            if (c === e4) return e4;
            if (o && o.set(e4, c), l === a.set) for (let r3 of e4) c.add(n2(r3, t4, o));
            else if (l === a.map) for (let [r3, a2] of e4) c.set(r3, n2(a2, t4, o));
            for (let r3 of i.keys(e4, t4)) {
              if ("__proto__" === r3) continue;
              if (l === a.array && "length" === r3) {
                c.length = e4.length;
                continue;
              }
              let i2 = Object.getOwnPropertyDescriptor(e4, r3);
              i2 ? i2.get || i2.set ? Object.defineProperty(c, r3, i2) : i2.enumerable ? c[r3] = n2(e4[r3], t4, o) : Object.defineProperty(c, r3, { enumerable: false, writable: true, configurable: true, value: n2(e4[r3], t4, o) }) : Object.defineProperty(c, r3, { enumerable: true, writable: true, configurable: true, value: n2(e4[r3], t4, o) });
            }
            return c;
          }, s.cloneWithShallow = function(e4, t4) {
            let r2 = t4.shallow;
            (t4 = Object.assign({}, t4)).shallow = false;
            let a2 = /* @__PURE__ */ new Map();
            for (let t5 of r2) {
              let r3 = n(e4, t5);
              "object" != typeof r3 && "function" != typeof r3 || a2.set(r3, r3);
            }
            return s.clone(e4, t4, a2);
          }, s.base = function(e4, t4, r2) {
            if (false === r2.prototype) return s.needsProtoHack.has(t4) ? new t4.constructor() : t4 === a.array ? [] : {};
            let n2 = Object.getPrototypeOf(e4);
            if (n2 && n2.isImmutable) return e4;
            if (t4 === a.array) {
              let e5 = [];
              return n2 !== t4 && Object.setPrototypeOf(e5, n2), e5;
            }
            if (s.needsProtoHack.has(t4)) {
              let e5 = new n2.constructor();
              return n2 !== t4 && Object.setPrototypeOf(e5, n2), e5;
            }
            return Object.create(n2);
          };
        }, 9474: (e3, t3, r) => {
          "use strict";
          let n = r(4277), a = { mismatched: null };
          e3.exports = function(e4, t4, r2) {
            return r2 = Object.assign({ prototype: true }, r2), !!a.isDeepEqual(e4, t4, r2, []);
          }, a.isDeepEqual = function(e4, t4, r2, i) {
            if (e4 === t4) return 0 !== e4 || 1 / e4 == 1 / t4;
            let s = typeof e4;
            if (s !== typeof t4 || null === e4 || null === t4) return false;
            if ("function" === s) {
              if (!r2.deepFunction || e4.toString() !== t4.toString()) return false;
            } else if ("object" !== s) return e4 != e4 && t4 != t4;
            let o = a.getSharedType(e4, t4, !!r2.prototype);
            switch (o) {
              case n.buffer:
                return false;
              case n.promise:
                return e4 === t4;
              case n.regex:
                return e4.toString() === t4.toString();
              case a.mismatched:
                return false;
            }
            for (let r3 = i.length - 1; r3 >= 0; --r3) if (i[r3].isSame(e4, t4)) return true;
            i.push(new a.SeenEntry(e4, t4));
            try {
              return !!a.isDeepEqualObj(o, e4, t4, r2, i);
            } finally {
              i.pop();
            }
          }, a.getSharedType = function(e4, t4, r2) {
            if (r2) return Object.getPrototypeOf(e4) !== Object.getPrototypeOf(t4) ? a.mismatched : n.getInternalProto(e4);
            let i = n.getInternalProto(e4);
            return i !== n.getInternalProto(t4) ? a.mismatched : i;
          }, a.valueOf = function(e4) {
            let t4 = e4.valueOf;
            if (void 0 === t4) return e4;
            try {
              return t4.call(e4);
            } catch (e5) {
              return e5;
            }
          }, a.hasOwnEnumerableProperty = function(e4, t4) {
            return Object.prototype.propertyIsEnumerable.call(e4, t4);
          }, a.isSetSimpleEqual = function(e4, t4) {
            for (let r2 of Set.prototype.values.call(e4)) if (!Set.prototype.has.call(t4, r2)) return false;
            return true;
          }, a.isDeepEqualObj = function(e4, t4, r2, i, s) {
            let { isDeepEqual: o, valueOf: l, hasOwnEnumerableProperty: c } = a, { keys: u, getOwnPropertySymbols: d } = Object;
            if (e4 === n.array) {
              if (!i.part) {
                if (t4.length !== r2.length) return false;
                for (let e5 = 0; e5 < t4.length; ++e5) if (!o(t4[e5], r2[e5], i, s)) return false;
                return true;
              }
              for (let e5 of t4) for (let t5 of r2) if (o(e5, t5, i, s)) return true;
            } else if (e4 === n.set) {
              if (t4.size !== r2.size) return false;
              if (!a.isSetSimpleEqual(t4, r2)) {
                let e5 = new Set(Set.prototype.values.call(r2));
                for (let r3 of Set.prototype.values.call(t4)) {
                  if (e5.delete(r3)) continue;
                  let t5 = false;
                  for (let n2 of e5) if (o(r3, n2, i, s)) {
                    e5.delete(n2), t5 = true;
                    break;
                  }
                  if (!t5) return false;
                }
              }
            } else if (e4 === n.map) {
              if (t4.size !== r2.size) return false;
              for (let [e5, n2] of Map.prototype.entries.call(t4)) if (void 0 === n2 && !Map.prototype.has.call(r2, e5) || !o(n2, Map.prototype.get.call(r2, e5), i, s)) return false;
            } else if (e4 === n.error && (t4.name !== r2.name || t4.message !== r2.message)) return false;
            let p = l(t4), h = l(r2);
            if ((t4 !== p || r2 !== h) && !o(p, h, i, s)) return false;
            let f = u(t4);
            if (!i.part && f.length !== u(r2).length && !i.skip) return false;
            let m = 0;
            for (let e5 of f) if (i.skip && i.skip.includes(e5)) void 0 === r2[e5] && ++m;
            else if (!c(r2, e5) || !o(t4[e5], r2[e5], i, s)) return false;
            if (!i.part && f.length - m !== u(r2).length) return false;
            if (false !== i.symbols) {
              let e5 = d(t4), n2 = new Set(d(r2));
              for (let a2 of e5) {
                if (!i.skip || !i.skip.includes(a2)) {
                  if (c(t4, a2)) {
                    if (!c(r2, a2) || !o(t4[a2], r2[a2], i, s)) return false;
                  } else if (c(r2, a2)) return false;
                }
                n2.delete(a2);
              }
              for (let e6 of n2) if (c(r2, e6)) return false;
            }
            return true;
          }, a.SeenEntry = class {
            constructor(e4, t4) {
              this.obj = e4, this.ref = t4;
            }
            isSame(e4, t4) {
              return this.obj === e4 && this.ref === t4;
            }
          };
        }, 7916: (e3, t3, r) => {
          "use strict";
          let n = r(8761);
          e3.exports = class extends Error {
            constructor(e4) {
              super(e4.filter((e5) => "" !== e5).map((e5) => "string" == typeof e5 ? e5 : e5 instanceof Error ? e5.message : n(e5)).join(" ") || "Unknown error"), "function" == typeof Error.captureStackTrace && Error.captureStackTrace(this, t3.assert);
            }
          };
        }, 5277: (e3) => {
          "use strict";
          let t3 = {};
          e3.exports = function(e4) {
            if (!e4) return "";
            let r = "";
            for (let n = 0; n < e4.length; ++n) {
              let a = e4.charCodeAt(n);
              t3.isSafe(a) ? r += e4[n] : r += t3.escapeHtmlChar(a);
            }
            return r;
          }, t3.escapeHtmlChar = function(e4) {
            return t3.namedHtml.get(e4) || (e4 >= 256 ? "&#" + e4 + ";" : `&#x${e4.toString(16).padStart(2, "0")};`);
          }, t3.isSafe = function(e4) {
            return t3.safeCharCodes.has(e4);
          }, t3.namedHtml = /* @__PURE__ */ new Map([[38, "&amp;"], [60, "&lt;"], [62, "&gt;"], [34, "&quot;"], [160, "&nbsp;"], [162, "&cent;"], [163, "&pound;"], [164, "&curren;"], [169, "&copy;"], [174, "&reg;"]]), t3.safeCharCodes = function() {
            let e4 = /* @__PURE__ */ new Set();
            for (let t4 = 32; t4 < 123; ++t4) (t4 >= 97 || t4 >= 65 && t4 <= 90 || t4 >= 48 && t4 <= 57 || 32 === t4 || 46 === t4 || 44 === t4 || 45 === t4 || 58 === t4 || 95 === t4) && e4.add(t4);
            return e4;
          }();
        }, 6064: (e3) => {
          "use strict";
          e3.exports = function(e4) {
            return e4.replace(/[\^\$\.\*\+\-\?\=\!\:\|\\\/\(\)\[\]\{\}\,]/g, "\\$&");
          };
        }, 738: (e3) => {
          "use strict";
          e3.exports = function() {
          };
        }, 1687: (e3, t3, r) => {
          "use strict";
          let n = r(375), a = r(8571), i = r(7043), s = {};
          e3.exports = s.merge = function(e4, t4, r2) {
            if (n(e4 && "object" == typeof e4, "Invalid target value: must be an object"), n(null == t4 || "object" == typeof t4, "Invalid source value: must be null, undefined, or an object"), !t4) return e4;
            if (r2 = Object.assign({ nullOverride: true, mergeArrays: true }, r2), Array.isArray(t4)) {
              n(Array.isArray(e4), "Cannot merge array onto an object"), r2.mergeArrays || (e4.length = 0);
              for (let n2 = 0; n2 < t4.length; ++n2) e4.push(a(t4[n2], { symbols: r2.symbols }));
              return e4;
            }
            let o = i.keys(t4, r2);
            for (let n2 = 0; n2 < o.length; ++n2) {
              let i2 = o[n2];
              if ("__proto__" === i2 || !Object.prototype.propertyIsEnumerable.call(t4, i2)) continue;
              let l = t4[i2];
              if (l && "object" == typeof l) {
                if (e4[i2] === l) continue;
                !e4[i2] || "object" != typeof e4[i2] || Array.isArray(e4[i2]) !== Array.isArray(l) || l instanceof Date || l instanceof RegExp ? e4[i2] = a(l, { symbols: r2.symbols }) : s.merge(e4[i2], l, r2);
              } else (null != l || r2.nullOverride) && (e4[i2] = l);
            }
            return e4;
          };
        }, 9621: (e3, t3, r) => {
          "use strict";
          let n = r(375), a = {};
          e3.exports = function(e4, t4, r2) {
            if (false === t4 || null == t4) return e4;
            "string" == typeof (r2 = r2 || {}) && (r2 = { separator: r2 });
            let i = Array.isArray(t4);
            n(!i || !r2.separator, "Separator option is not valid for array-based chain");
            let s = i ? t4 : t4.split(r2.separator || "."), o = e4;
            for (let e5 = 0; e5 < s.length; ++e5) {
              let i2 = s[e5], l = r2.iterables && a.iterables(o);
              if (Array.isArray(o) || "set" === l) {
                let e6 = Number(i2);
                Number.isInteger(e6) && (i2 = e6 < 0 ? o.length + e6 : e6);
              }
              if (!o || "function" == typeof o && false === r2.functions || !l && void 0 === o[i2]) {
                n(!r2.strict || e5 + 1 === s.length, "Missing segment", i2, "in reach path ", t4), n("object" == typeof o || true === r2.functions || "function" != typeof o, "Invalid segment", i2, "in reach path ", t4), o = r2.default;
                break;
              }
              o = l ? "set" === l ? [...o][i2] : o.get(i2) : o[i2];
            }
            return o;
          }, a.iterables = function(e4) {
            return e4 instanceof Set ? "set" : e4 instanceof Map ? "map" : void 0;
          };
        }, 8761: (e3) => {
          "use strict";
          e3.exports = function(...e4) {
            try {
              return JSON.stringify(...e4);
            } catch (e5) {
              return "[Cannot display object: " + e5.message + "]";
            }
          };
        }, 4277: (e3, t3) => {
          "use strict";
          let r = {};
          t3 = e3.exports = { array: Array.prototype, buffer: false, date: Date.prototype, error: Error.prototype, generic: Object.prototype, map: Map.prototype, promise: Promise.prototype, regex: RegExp.prototype, set: Set.prototype, weakMap: WeakMap.prototype, weakSet: WeakSet.prototype }, r.typeMap = /* @__PURE__ */ new Map([["[object Error]", t3.error], ["[object Map]", t3.map], ["[object Promise]", t3.promise], ["[object Set]", t3.set], ["[object WeakMap]", t3.weakMap], ["[object WeakSet]", t3.weakSet]]), t3.getInternalProto = function(e4) {
            if (Array.isArray(e4)) return t3.array;
            if (e4 instanceof Date) return t3.date;
            if (e4 instanceof RegExp) return t3.regex;
            if (e4 instanceof Error) return t3.error;
            let n = Object.prototype.toString.call(e4);
            return r.typeMap.get(n) || t3.generic;
          };
        }, 7043: (e3, t3) => {
          "use strict";
          t3.keys = function(e4, t4 = {}) {
            return false !== t4.symbols ? Reflect.ownKeys(e4) : Object.getOwnPropertyNames(e4);
          };
        }, 3652: (e3, t3, r) => {
          "use strict";
          let n = r(375), a = {};
          t3.Sorter = class {
            constructor() {
              this._items = [], this.nodes = [];
            }
            add(e4, t4) {
              let r2 = [].concat((t4 = t4 || {}).before || []), a2 = [].concat(t4.after || []), i = t4.group || "?", s = t4.sort || 0;
              for (let t5 of (n(!r2.includes(i), `Item cannot come before itself: ${i}`), n(!r2.includes("?"), "Item cannot come before unassociated items"), n(!a2.includes(i), `Item cannot come after itself: ${i}`), n(!a2.includes("?"), "Item cannot come after unassociated items"), Array.isArray(e4) || (e4 = [e4]), e4)) {
                let e5 = { seq: this._items.length, sort: s, before: r2, after: a2, group: i, node: t5 };
                this._items.push(e5);
              }
              return t4.manual || n(this._sort(), "item", "?" !== i ? `added into group ${i}` : "", "created a dependencies error"), this.nodes;
            }
            merge(e4) {
              for (let t4 of (Array.isArray(e4) || (e4 = [e4]), e4)) if (t4) for (let e5 of t4._items) this._items.push(Object.assign({}, e5));
              this._items.sort(a.mergeSort);
              for (let e5 = 0; e5 < this._items.length; ++e5) this._items[e5].seq = e5;
              return n(this._sort(), "merge created a dependencies error"), this.nodes;
            }
            sort() {
              return n(this._sort(), "sort created a dependencies error"), this.nodes;
            }
            _sort() {
              let e4 = {}, t4 = /* @__PURE__ */ Object.create(null), r2 = /* @__PURE__ */ Object.create(null);
              for (let n3 of this._items) {
                let a3 = n3.seq, i2 = n3.group;
                for (let s2 of (r2[i2] = r2[i2] || [], r2[i2].push(a3), e4[a3] = n3.before, n3.after)) t4[s2] = t4[s2] || [], t4[s2].push(a3);
              }
              for (let t5 in e4) {
                let n3 = [];
                for (let a3 in e4[t5]) {
                  let i2 = e4[t5][a3];
                  r2[i2] = r2[i2] || [], n3.push(...r2[i2]);
                }
                e4[t5] = n3;
              }
              for (let n3 in t4) if (r2[n3]) for (let a3 of r2[n3]) e4[a3].push(...t4[n3]);
              let n2 = {};
              for (let t5 in e4) for (let r3 of e4[t5]) n2[r3] = n2[r3] || [], n2[r3].push(t5);
              let a2 = {}, i = [];
              for (let e5 = 0; e5 < this._items.length; ++e5) {
                let t5 = e5;
                if (n2[e5]) {
                  t5 = null;
                  for (let e6 = 0; e6 < this._items.length; ++e6) {
                    if (true === a2[e6]) continue;
                    n2[e6] || (n2[e6] = []);
                    let r3 = n2[e6].length, i2 = 0;
                    for (let t6 = 0; t6 < r3; ++t6) a2[n2[e6][t6]] && ++i2;
                    if (i2 === r3) {
                      t5 = e6;
                      break;
                    }
                  }
                }
                null !== t5 && (a2[t5] = true, i.push(t5));
              }
              if (i.length !== this._items.length) return false;
              let s = {};
              for (let e5 of this._items) s[e5.seq] = e5;
              for (let e5 of (this._items = [], this.nodes = [], i)) {
                let t5 = s[e5];
                this.nodes.push(t5.node), this._items.push(t5);
              }
              return true;
            }
          }, a.mergeSort = (e4, t4) => e4.sort === t4.sort ? 0 : e4.sort < t4.sort ? -1 : 1;
        }, 5380: (e3, t3, r) => {
          "use strict";
          let n = r(443), a = r(2178), i = { minDomainSegments: 2, nonAsciiRx: /[^\x00-\x7f]/, domainControlRx: /[\x00-\x20@\:\/\\#!\$&\'\(\)\*\+,;=\?]/, tldSegmentRx: /^[a-zA-Z](?:[a-zA-Z0-9\-]*[a-zA-Z0-9])?$/, domainSegmentRx: /^[a-zA-Z0-9](?:[a-zA-Z0-9\-]*[a-zA-Z0-9])?$/, URL: n.URL || URL };
          t3.analyze = function(e4, t4 = {}) {
            if (!e4) return a.code("DOMAIN_NON_EMPTY_STRING");
            if ("string" != typeof e4) throw Error("Invalid input: domain must be a string");
            if (e4.length > 256) return a.code("DOMAIN_TOO_LONG");
            if (i.nonAsciiRx.test(e4)) {
              if (false === t4.allowUnicode) return a.code("DOMAIN_INVALID_UNICODE_CHARS");
              e4 = e4.normalize("NFC");
            }
            if (i.domainControlRx.test(e4)) return a.code("DOMAIN_INVALID_CHARS");
            e4 = i.punycode(e4), t4.allowFullyQualified && "." === e4[e4.length - 1] && (e4 = e4.slice(0, -1));
            let r2 = t4.minDomainSegments || i.minDomainSegments, n2 = e4.split(".");
            if (n2.length < r2) return a.code("DOMAIN_SEGMENTS_COUNT");
            if (t4.maxDomainSegments && n2.length > t4.maxDomainSegments) return a.code("DOMAIN_SEGMENTS_COUNT_MAX");
            let s = t4.tlds;
            if (s) {
              let e5 = n2[n2.length - 1].toLowerCase();
              if (s.deny && s.deny.has(e5) || s.allow && !s.allow.has(e5)) return a.code("DOMAIN_FORBIDDEN_TLDS");
            }
            for (let e5 = 0; e5 < n2.length; ++e5) {
              let t5 = n2[e5];
              if (!t5.length) return a.code("DOMAIN_EMPTY_SEGMENT");
              if (t5.length > 63) return a.code("DOMAIN_LONG_SEGMENT");
              if (e5 < n2.length - 1) {
                if (!i.domainSegmentRx.test(t5)) return a.code("DOMAIN_INVALID_CHARS");
              } else if (!i.tldSegmentRx.test(t5)) return a.code("DOMAIN_INVALID_TLDS_CHARS");
            }
            return null;
          }, t3.isValid = function(e4, r2) {
            return !t3.analyze(e4, r2);
          }, i.punycode = function(e4) {
            e4.includes("%") && (e4 = e4.replace(/%/g, "%25"));
            try {
              return new i.URL(`http://${e4}`).host;
            } catch (t4) {
              return e4;
            }
          };
        }, 1745: (e3, t3, r) => {
          "use strict";
          let n = r(9848), a = r(5380), i = r(2178), s = { nonAsciiRx: /[^\x00-\x7f]/, encoder: new (n.TextEncoder || TextEncoder)() };
          t3.analyze = function(e4, t4) {
            return s.email(e4, t4);
          }, t3.isValid = function(e4, t4) {
            return !s.email(e4, t4);
          }, s.email = function(e4, t4 = {}) {
            if ("string" != typeof e4) throw Error("Invalid input: email must be a string");
            if (!e4) return i.code("EMPTY_STRING");
            let r2 = !s.nonAsciiRx.test(e4);
            if (!r2) {
              if (false === t4.allowUnicode) return i.code("FORBIDDEN_UNICODE");
              e4 = e4.normalize("NFC");
            }
            let n2 = e4.split("@");
            if (2 !== n2.length) return n2.length > 2 ? i.code("MULTIPLE_AT_CHAR") : i.code("MISSING_AT_CHAR");
            let [o, l] = n2;
            if (!o) return i.code("EMPTY_LOCAL");
            if (!t4.ignoreLength) {
              if (e4.length > 254) return i.code("ADDRESS_TOO_LONG");
              if (s.encoder.encode(o).length > 64) return i.code("LOCAL_TOO_LONG");
            }
            return s.local(o, r2) || a.analyze(l, t4);
          }, s.local = function(e4, t4) {
            for (let r2 of e4.split(".")) {
              if (!r2.length) return i.code("EMPTY_LOCAL_SEGMENT");
              if (t4) {
                if (!s.atextRx.test(r2)) return i.code("INVALID_LOCAL_CHARS");
              } else for (let e5 of r2) {
                if (s.atextRx.test(e5)) continue;
                let t5 = s.binary(e5);
                if (!s.atomRx.test(t5)) return i.code("INVALID_LOCAL_CHARS");
              }
            }
          }, s.binary = function(e4) {
            return Array.from(s.encoder.encode(e4)).map((e5) => String.fromCharCode(e5)).join("");
          }, s.atextRx = /^[\w!#\$%&'\*\+\-/=\?\^`\{\|\}~]+$/, s.atomRx = RegExp("(?:[\\xc2-\\xdf][\\x80-\\xbf])|(?:\\xe0[\\xa0-\\xbf][\\x80-\\xbf])|(?:[\\xe1-\\xec][\\x80-\\xbf]{2})|(?:\\xed[\\x80-\\x9f][\\x80-\\xbf])|(?:[\\xee-\\xef][\\x80-\\xbf]{2})|(?:\\xf0[\\x90-\\xbf][\\x80-\\xbf]{2})|(?:[\\xf1-\\xf3][\\x80-\\xbf]{3})|(?:\\xf4[\\x80-\\x8f][\\x80-\\xbf]{2})");
        }, 2178: (e3, t3) => {
          "use strict";
          t3.codes = { EMPTY_STRING: "Address must be a non-empty string", FORBIDDEN_UNICODE: "Address contains forbidden Unicode characters", MULTIPLE_AT_CHAR: "Address cannot contain more than one @ character", MISSING_AT_CHAR: "Address must contain one @ character", EMPTY_LOCAL: "Address local part cannot be empty", ADDRESS_TOO_LONG: "Address too long", LOCAL_TOO_LONG: "Address local part too long", EMPTY_LOCAL_SEGMENT: "Address local part contains empty dot-separated segment", INVALID_LOCAL_CHARS: "Address local part contains invalid character", DOMAIN_NON_EMPTY_STRING: "Domain must be a non-empty string", DOMAIN_TOO_LONG: "Domain too long", DOMAIN_INVALID_UNICODE_CHARS: "Domain contains forbidden Unicode characters", DOMAIN_INVALID_CHARS: "Domain contains invalid character", DOMAIN_INVALID_TLDS_CHARS: "Domain contains invalid tld character", DOMAIN_SEGMENTS_COUNT: "Domain lacks the minimum required number of segments", DOMAIN_SEGMENTS_COUNT_MAX: "Domain contains too many segments", DOMAIN_FORBIDDEN_TLDS: "Domain uses forbidden TLD", DOMAIN_EMPTY_SEGMENT: "Domain contains empty dot-separated segment", DOMAIN_LONG_SEGMENT: "Domain contains dot-separated segment that is too long" }, t3.code = function(e4) {
            return { code: e4, error: t3.codes[e4] };
          };
        }, 9959: (e3, t3, r) => {
          "use strict";
          let n = r(375), a = r(5752);
          t3.regex = function(e4 = {}) {
            n(void 0 === e4.cidr || "string" == typeof e4.cidr, "options.cidr must be a string");
            let t4 = e4.cidr ? e4.cidr.toLowerCase() : "optional";
            n(["required", "optional", "forbidden"].includes(t4), "options.cidr must be one of required, optional, forbidden"), n(void 0 === e4.version || "string" == typeof e4.version || Array.isArray(e4.version), "options.version must be a string or an array of string");
            let r2 = e4.version || ["ipv4", "ipv6", "ipvfuture"];
            Array.isArray(r2) || (r2 = [r2]), n(r2.length >= 1, "options.version must have at least 1 version specified");
            for (let e5 = 0; e5 < r2.length; ++e5) n("string" == typeof r2[e5], "options.version must only contain strings"), r2[e5] = r2[e5].toLowerCase(), n(["ipv4", "ipv6", "ipvfuture"].includes(r2[e5]), "options.version contains unknown version " + r2[e5] + " - must be one of ipv4, ipv6, ipvfuture");
            r2 = Array.from(new Set(r2));
            let i = `(?:${r2.map((e5) => {
              if ("forbidden" === t4) return a.ip[e5];
              let r3 = `\\/${"ipv4" === e5 ? a.ip.v4Cidr : a.ip.v6Cidr}`;
              return "required" === t4 ? `${a.ip[e5]}${r3}` : `${a.ip[e5]}(?:${r3})?`;
            }).join("|")})`;
            return { cidr: t4, versions: r2, regex: RegExp(`^${i}$`), raw: i };
          };
        }, 5752: (e3, t3, r) => {
          "use strict";
          let n = r(375), a = r(6064), i = { generate: function() {
            let e4 = {}, t4 = "\\dA-Fa-f", r2 = "[" + t4 + "]", n2 = "\\w-\\.~", a2 = "!\\$&'\\(\\)\\*\\+,;=", i2 = "%" + t4, s = n2 + i2 + a2 + ":@", o = "[" + s + "]", l = "(?:0{0,2}\\d|0?[1-9]\\d|1\\d\\d|2[0-4]\\d|25[0-5])";
            e4.ipv4address = "(?:" + l + "\\.){3}" + l;
            let c = r2 + "{1,4}", u = "(?:" + c + ":" + c + "|" + e4.ipv4address + ")";
            e4.ipv4Cidr = "(?:\\d|[1-2]\\d|3[0-2])", e4.ipv6Cidr = "(?:0{0,2}\\d|0?[1-9]\\d|1[01]\\d|12[0-8])", e4.ipv6address = "(?:(?:" + c + ":){6}" + u + "|::(?:" + c + ":){5}" + u + "|" + ("(?:" + c + ")?::(?:") + c + ":){4}" + u + "|" + ("(?:(?:" + c + ":){0,1}" + c + ")?::(?:") + c + ":){3}" + u + "|" + ("(?:(?:" + c + ":){0,2}" + c + ")?::(?:") + c + ":){2}" + u + "|" + ("(?:(?:" + c + ":){0,3}" + c + ")?::") + c + ":" + u + "|" + ("(?:(?:" + c + ":){0,4}") + c + ")?::" + u + "|" + ("(?:(?:" + c + ":){0,5}") + c + ")?::" + c + "|" + ("(?:(?:" + c) + ":){0,6}" + c + ")?::)", e4.ipvFuture = "v" + r2 + "+\\.[" + n2 + a2 + ":]+", e4.scheme = "[a-zA-Z][a-zA-Z\\d+-\\.]*", e4.schemeRegex = new RegExp(e4.scheme);
            let d = "[" + n2 + i2 + a2 + ":]*", p = "(?:\\[(?:" + e4.ipv6address + "|" + e4.ipvFuture + ")\\]|" + e4.ipv4address + "|" + ("[" + n2) + i2 + a2 + "]{1,255})", h = "(?:" + d + "@)?" + p + "(?::\\d*)?", f = "(?:" + d + "@)?(" + p + ")(?::\\d*)?", m = o + "*", g = o + "+", y = "(?:\\/" + m + ")*", b = "\\/(?:" + g + y + ")?", w = g + y, v = "[" + n2 + i2 + a2 + "@]+" + y;
            return e4.hierPart = "(?:(?:\\/\\/" + h + y + ")|" + b + "|" + w + "|(?:\\/\\/\\/" + m + y + "))", e4.hierPartCapture = "(?:(?:\\/\\/" + f + y + ")|" + b + "|" + w + ")", e4.relativeRef = "(?:(?:\\/\\/" + h + y + ")|" + b + "|" + v + "|)", e4.relativeRefCapture = "(?:(?:\\/\\/" + f + y + ")|" + b + "|" + v + "|)", e4.query = "[" + s + "\\/\\?]*(?=#|$)", e4.queryWithSquareBrackets = "[" + s + "\\[\\]\\/\\?]*(?=#|$)", e4.fragment = "[" + s + "\\/\\?]*", e4;
          } };
          i.rfc3986 = i.generate(), t3.ip = { v4Cidr: i.rfc3986.ipv4Cidr, v6Cidr: i.rfc3986.ipv6Cidr, ipv4: i.rfc3986.ipv4address, ipv6: i.rfc3986.ipv6address, ipvfuture: i.rfc3986.ipvFuture }, i.createRegex = function(e4) {
            let t4 = i.rfc3986, r2 = "(?:\\?" + (e4.allowQuerySquareBrackets ? t4.queryWithSquareBrackets : t4.query) + ")?(?:#" + t4.fragment + ")?", s = e4.domain ? t4.relativeRefCapture : t4.relativeRef;
            if (e4.relativeOnly) return i.wrap(s + r2);
            let o = "";
            if (e4.scheme) {
              n(e4.scheme instanceof RegExp || "string" == typeof e4.scheme || Array.isArray(e4.scheme), "scheme must be a RegExp, String, or Array");
              let r3 = [].concat(e4.scheme);
              n(r3.length >= 1, "scheme must have at least 1 scheme specified");
              let i2 = [];
              for (let e5 = 0; e5 < r3.length; ++e5) {
                let s2 = r3[e5];
                n(s2 instanceof RegExp || "string" == typeof s2, "scheme at position " + e5 + " must be a RegExp or String"), s2 instanceof RegExp ? i2.push(s2.source.toString()) : (n(t4.schemeRegex.test(s2), "scheme at position " + e5 + " must be a valid scheme"), i2.push(a(s2)));
              }
              o = i2.join("|");
            }
            let l = "(?:" + (o ? "(?:" + o + ")" : t4.scheme) + ":" + (e4.domain ? t4.hierPartCapture : t4.hierPart) + ")", c = e4.allowRelative ? "(?:" + l + "|" + s + ")" : l;
            return i.wrap(c + r2, o);
          }, i.wrap = function(e4, t4) {
            return { raw: e4 = `(?=.)(?!https?:/(?:$|[^/]))(?!https?:///)(?!https?:[^/])${e4}`, regex: RegExp(`^${e4}$`), scheme: t4 };
          }, i.uriRegex = i.createRegex({}), t3.regex = function(e4 = {}) {
            return e4.scheme || e4.allowRelative || e4.relativeOnly || e4.allowQuerySquareBrackets || e4.domain ? i.createRegex(e4) : i.uriRegex;
          };
        }, 1447: (e3, t3) => {
          "use strict";
          let r = { operators: ["!", "^", "*", "/", "%", "+", "-", "<", "<=", ">", ">=", "==", "!=", "&&", "||", "??"], operatorCharacters: ["!", "^", "*", "/", "%", "+", "-", "<", "=", ">", "&", "|", "?"], operatorsOrder: [["^"], ["*", "/", "%"], ["+", "-"], ["<", "<=", ">", ">="], ["==", "!="], ["&&"], ["||", "??"]], operatorsPrefix: ["!", "n"], literals: { '"': '"', "`": "`", "'": "'", "[": "]" }, numberRx: /^(?:[0-9]*(\.[0-9]*)?){1}$/, tokenRx: /^[\w\$\#\.\@\:\{\}]+$/, symbol: Symbol("formula"), settings: Symbol("settings") };
          t3.Parser = class {
            constructor(e4, t4 = {}) {
              if (!t4[r.settings] && t4.constants) for (let e5 in t4.constants) {
                let r2 = t4.constants[e5];
                if (null !== r2 && !["boolean", "number", "string"].includes(typeof r2)) throw Error(`Formula constant ${e5} contains invalid ${typeof r2} value type`);
              }
              this.settings = t4[r.settings] ? t4 : Object.assign({ [r.settings]: true, constants: {}, functions: {} }, t4), this.single = null, this._parts = null, this._parse(e4);
            }
            _parse(e4) {
              let n = [], a = "", i = 0, s = false, o = (e5) => {
                if (i) throw Error("Formula missing closing parenthesis");
                let o2 = n.length ? n[n.length - 1] : null;
                if (s || a || e5) {
                  if (o2 && "reference" === o2.type && ")" === e5) return o2.type = "function", o2.value = this._subFormula(a, o2.value), void (a = "");
                  if (")" === e5) {
                    let e6 = new t3.Parser(a, this.settings);
                    n.push({ type: "segment", value: e6 });
                  } else if (s) {
                    if ("]" === s) return n.push({ type: "reference", value: a }), void (a = "");
                    n.push({ type: "literal", value: a });
                  } else if (r.operatorCharacters.includes(a)) o2 && "operator" === o2.type && r.operators.includes(o2.value + a) ? o2.value += a : n.push({ type: "operator", value: a });
                  else if (a.match(r.numberRx)) n.push({ type: "constant", value: parseFloat(a) });
                  else if (void 0 !== this.settings.constants[a]) n.push({ type: "constant", value: this.settings.constants[a] });
                  else {
                    if (!a.match(r.tokenRx)) throw Error(`Formula contains invalid token: ${a}`);
                    n.push({ type: "reference", value: a });
                  }
                  a = "";
                }
              };
              for (let t4 of e4) s ? t4 === s ? (o(), s = false) : a += t4 : i ? "(" === t4 ? (a += t4, ++i) : ")" === t4 ? --i ? a += t4 : o(t4) : a += t4 : t4 in r.literals ? s = r.literals[t4] : "(" === t4 ? (o(), ++i) : r.operatorCharacters.includes(t4) ? (o(), a = t4, o()) : " " !== t4 ? a += t4 : o();
              o();
              let l = false;
              for (let e5 of n = n.map((e6, t4) => "operator" !== e6.type || "-" !== e6.value || t4 && "operator" !== n[t4 - 1].type ? e6 : { type: "operator", value: "n" })) {
                if ("operator" === e5.type) {
                  if (r.operatorsPrefix.includes(e5.value)) continue;
                  if (!l) throw Error("Formula contains an operator in invalid position");
                  if (!r.operators.includes(e5.value)) throw Error(`Formula contains an unknown operator ${e5.value}`);
                } else if (l) throw Error("Formula missing expected operator");
                l = !l;
              }
              if (!l) throw Error("Formula contains invalid trailing operator");
              1 === n.length && ["reference", "literal", "constant"].includes(n[0].type) && (this.single = { type: "reference" === n[0].type ? "reference" : "value", value: n[0].value }), this._parts = n.map((e5) => {
                if ("operator" === e5.type) return r.operatorsPrefix.includes(e5.value) ? e5 : e5.value;
                if ("reference" !== e5.type) return e5.value;
                if (this.settings.tokenRx && !this.settings.tokenRx.test(e5.value)) throw Error(`Formula contains invalid reference ${e5.value}`);
                return this.settings.reference ? this.settings.reference(e5.value) : r.reference(e5.value);
              });
            }
            _subFormula(e4, n) {
              let a = this.settings.functions[n];
              if ("function" != typeof a) throw Error(`Formula contains unknown function ${n}`);
              let i = [];
              if (e4) {
                let t4 = "", a2 = 0, s = false, o = () => {
                  if (!t4) throw Error(`Formula contains function ${n} with invalid arguments ${e4}`);
                  i.push(t4), t4 = "";
                };
                for (let n2 = 0; n2 < e4.length; ++n2) {
                  let i2 = e4[n2];
                  s ? (t4 += i2, i2 === s && (s = false)) : i2 in r.literals && !a2 ? (t4 += i2, s = r.literals[i2]) : "," !== i2 || a2 ? (t4 += i2, "(" === i2 ? ++a2 : ")" === i2 && --a2) : o();
                }
                o();
              }
              return i = i.map((e5) => new t3.Parser(e5, this.settings)), function(e5) {
                let t4 = [];
                for (let r2 of i) t4.push(r2.evaluate(e5));
                return a.call(e5, ...t4);
              };
            }
            evaluate(e4) {
              let t4 = this._parts.slice();
              for (let n = t4.length - 2; n >= 0; --n) {
                let a = t4[n];
                if (a && "operator" === a.type) {
                  let i = t4[n + 1];
                  t4.splice(n + 1, 1);
                  let s = r.evaluate(i, e4);
                  t4[n] = r.single(a.value, s);
                }
              }
              return r.operatorsOrder.forEach((n) => {
                for (let a = 1; a < t4.length - 1; ) if (n.includes(t4[a])) {
                  let n2 = t4[a], i = r.evaluate(t4[a - 1], e4), s = r.evaluate(t4[a + 1], e4);
                  t4.splice(a, 2);
                  let o = r.calculate(n2, i, s);
                  t4[a - 1] = 0 === o ? 0 : o;
                } else a += 2;
              }), r.evaluate(t4[0], e4);
            }
          }, t3.Parser.prototype[r.symbol] = true, r.reference = function(e4) {
            return function(t4) {
              return t4 && void 0 !== t4[e4] ? t4[e4] : null;
            };
          }, r.evaluate = function(e4, t4) {
            return null === e4 ? null : "function" == typeof e4 ? e4(t4) : e4[r.symbol] ? e4.evaluate(t4) : e4;
          }, r.single = function(e4, t4) {
            if ("!" === e4) return !t4;
            let r2 = -t4;
            return 0 === r2 ? 0 : r2;
          }, r.calculate = function(e4, t4, n) {
            if ("??" === e4) return r.exists(t4) ? t4 : n;
            if ("string" == typeof t4 || "string" == typeof n) {
              if ("+" === e4) return (t4 = r.exists(t4) ? t4 : "") + (r.exists(n) ? n : "");
            } else switch (e4) {
              case "^":
                return Math.pow(t4, n);
              case "*":
                return t4 * n;
              case "/":
                return t4 / n;
              case "%":
                return t4 % n;
              case "+":
                return t4 + n;
              case "-":
                return t4 - n;
            }
            switch (e4) {
              case "<":
                return t4 < n;
              case "<=":
                return t4 <= n;
              case ">":
                return t4 > n;
              case ">=":
                return t4 >= n;
              case "==":
                return t4 === n;
              case "!=":
                return t4 !== n;
              case "&&":
                return t4 && n;
              case "||":
                return t4 || n;
            }
            return null;
          }, r.exists = function(e4) {
            return null != e4;
          };
        }, 9926: () => {
        }, 5688: () => {
        }, 9708: () => {
        }, 1152: () => {
        }, 443: () => {
        }, 9848: () => {
        }, 5934: (e3) => {
          "use strict";
          e3.exports = JSON.parse('{"version":"17.13.3"}');
        } }, t2 = {}, function r(n) {
          var a = t2[n];
          if (void 0 !== a) return a.exports;
          var i = t2[n] = { exports: {} };
          return e2[n](i, i.exports, r), i.exports;
        }(5107);
      }, e.exports = t();
    }, 6863: (e) => {
      function t(e2, t2, r, n) {
        return Math.round(e2 / r) + " " + n + (t2 >= 1.5 * r ? "s" : "");
      }
      e.exports = function(e2, r) {
        r = r || {};
        var n, a, i = typeof e2;
        if ("string" === i && e2.length > 0) return function(e3) {
          if (!((e3 = String(e3)).length > 100)) {
            var t2 = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(e3);
            if (t2) {
              var r2 = parseFloat(t2[1]);
              switch ((t2[2] || "ms").toLowerCase()) {
                case "years":
                case "year":
                case "yrs":
                case "yr":
                case "y":
                  return 315576e5 * r2;
                case "weeks":
                case "week":
                case "w":
                  return 6048e5 * r2;
                case "days":
                case "day":
                case "d":
                  return 864e5 * r2;
                case "hours":
                case "hour":
                case "hrs":
                case "hr":
                case "h":
                  return 36e5 * r2;
                case "minutes":
                case "minute":
                case "mins":
                case "min":
                case "m":
                  return 6e4 * r2;
                case "seconds":
                case "second":
                case "secs":
                case "sec":
                case "s":
                  return 1e3 * r2;
                case "milliseconds":
                case "millisecond":
                case "msecs":
                case "msec":
                case "ms":
                  return r2;
                default:
                  return;
              }
            }
          }
        }(e2);
        if ("number" === i && isFinite(e2)) return r.long ? (n = Math.abs(e2)) >= 864e5 ? t(e2, n, 864e5, "day") : n >= 36e5 ? t(e2, n, 36e5, "hour") : n >= 6e4 ? t(e2, n, 6e4, "minute") : n >= 1e3 ? t(e2, n, 1e3, "second") : e2 + " ms" : (a = Math.abs(e2)) >= 864e5 ? Math.round(e2 / 864e5) + "d" : a >= 36e5 ? Math.round(e2 / 36e5) + "h" : a >= 6e4 ? Math.round(e2 / 6e4) + "m" : a >= 1e3 ? Math.round(e2 / 1e3) + "s" : e2 + "ms";
        throw Error("val is not a non-empty string or a valid number. val=" + JSON.stringify(e2));
      };
    }, 5945: (e) => {
      "use strict";
      var t = Object.defineProperty, r = Object.getOwnPropertyDescriptor, n = Object.getOwnPropertyNames, a = Object.prototype.hasOwnProperty, i = {};
      function s(e2) {
        var t2;
        let r2 = ["path" in e2 && e2.path && `Path=${e2.path}`, "expires" in e2 && (e2.expires || 0 === e2.expires) && `Expires=${("number" == typeof e2.expires ? new Date(e2.expires) : e2.expires).toUTCString()}`, "maxAge" in e2 && "number" == typeof e2.maxAge && `Max-Age=${e2.maxAge}`, "domain" in e2 && e2.domain && `Domain=${e2.domain}`, "secure" in e2 && e2.secure && "Secure", "httpOnly" in e2 && e2.httpOnly && "HttpOnly", "sameSite" in e2 && e2.sameSite && `SameSite=${e2.sameSite}`, "partitioned" in e2 && e2.partitioned && "Partitioned", "priority" in e2 && e2.priority && `Priority=${e2.priority}`].filter(Boolean), n2 = `${e2.name}=${encodeURIComponent(null != (t2 = e2.value) ? t2 : "")}`;
        return 0 === r2.length ? n2 : `${n2}; ${r2.join("; ")}`;
      }
      function o(e2) {
        let t2 = /* @__PURE__ */ new Map();
        for (let r2 of e2.split(/; */)) {
          if (!r2) continue;
          let e3 = r2.indexOf("=");
          if (-1 === e3) {
            t2.set(r2, "true");
            continue;
          }
          let [n2, a2] = [r2.slice(0, e3), r2.slice(e3 + 1)];
          try {
            t2.set(n2, decodeURIComponent(null != a2 ? a2 : "true"));
          } catch {
          }
        }
        return t2;
      }
      function l(e2) {
        var t2, r2;
        if (!e2) return;
        let [[n2, a2], ...i2] = o(e2), { domain: s2, expires: l2, httponly: d2, maxage: p2, path: h, samesite: f, secure: m, partitioned: g, priority: y } = Object.fromEntries(i2.map(([e3, t3]) => [e3.toLowerCase(), t3]));
        return function(e3) {
          let t3 = {};
          for (let r3 in e3) e3[r3] && (t3[r3] = e3[r3]);
          return t3;
        }({ name: n2, value: decodeURIComponent(a2), domain: s2, ...l2 && { expires: new Date(l2) }, ...d2 && { httpOnly: true }, ..."string" == typeof p2 && { maxAge: Number(p2) }, path: h, ...f && { sameSite: c.includes(t2 = (t2 = f).toLowerCase()) ? t2 : void 0 }, ...m && { secure: true }, ...y && { priority: u.includes(r2 = (r2 = y).toLowerCase()) ? r2 : void 0 }, ...g && { partitioned: true } });
      }
      ((e2, r2) => {
        for (var n2 in r2) t(e2, n2, { get: r2[n2], enumerable: true });
      })(i, { RequestCookies: () => d, ResponseCookies: () => p, parseCookie: () => o, parseSetCookie: () => l, stringifyCookie: () => s }), e.exports = ((e2, i2, s2, o2) => {
        if (i2 && "object" == typeof i2 || "function" == typeof i2) for (let l2 of n(i2)) a.call(e2, l2) || l2 === s2 || t(e2, l2, { get: () => i2[l2], enumerable: !(o2 = r(i2, l2)) || o2.enumerable });
        return e2;
      })(t({}, "__esModule", { value: true }), i);
      var c = ["strict", "lax", "none"], u = ["low", "medium", "high"], d = class {
        constructor(e2) {
          this._parsed = /* @__PURE__ */ new Map(), this._headers = e2;
          let t2 = e2.get("cookie");
          if (t2) for (let [e3, r2] of o(t2)) this._parsed.set(e3, { name: e3, value: r2 });
        }
        [Symbol.iterator]() {
          return this._parsed[Symbol.iterator]();
        }
        get size() {
          return this._parsed.size;
        }
        get(...e2) {
          let t2 = "string" == typeof e2[0] ? e2[0] : e2[0].name;
          return this._parsed.get(t2);
        }
        getAll(...e2) {
          var t2;
          let r2 = Array.from(this._parsed);
          if (!e2.length) return r2.map(([e3, t3]) => t3);
          let n2 = "string" == typeof e2[0] ? e2[0] : null == (t2 = e2[0]) ? void 0 : t2.name;
          return r2.filter(([e3]) => e3 === n2).map(([e3, t3]) => t3);
        }
        has(e2) {
          return this._parsed.has(e2);
        }
        set(...e2) {
          let [t2, r2] = 1 === e2.length ? [e2[0].name, e2[0].value] : e2, n2 = this._parsed;
          return n2.set(t2, { name: t2, value: r2 }), this._headers.set("cookie", Array.from(n2).map(([e3, t3]) => s(t3)).join("; ")), this;
        }
        delete(e2) {
          let t2 = this._parsed, r2 = Array.isArray(e2) ? e2.map((e3) => t2.delete(e3)) : t2.delete(e2);
          return this._headers.set("cookie", Array.from(t2).map(([e3, t3]) => s(t3)).join("; ")), r2;
        }
        clear() {
          return this.delete(Array.from(this._parsed.keys())), this;
        }
        [Symbol.for("edge-runtime.inspect.custom")]() {
          return `RequestCookies ${JSON.stringify(Object.fromEntries(this._parsed))}`;
        }
        toString() {
          return [...this._parsed.values()].map((e2) => `${e2.name}=${encodeURIComponent(e2.value)}`).join("; ");
        }
      }, p = class {
        constructor(e2) {
          var t2, r2, n2;
          this._parsed = /* @__PURE__ */ new Map(), this._headers = e2;
          let a2 = null != (n2 = null != (r2 = null == (t2 = e2.getSetCookie) ? void 0 : t2.call(e2)) ? r2 : e2.get("set-cookie")) ? n2 : [];
          for (let e3 of Array.isArray(a2) ? a2 : function(e4) {
            if (!e4) return [];
            var t3, r3, n3, a3, i2, s2 = [], o2 = 0;
            function l2() {
              for (; o2 < e4.length && /\s/.test(e4.charAt(o2)); ) o2 += 1;
              return o2 < e4.length;
            }
            for (; o2 < e4.length; ) {
              for (t3 = o2, i2 = false; l2(); ) if ("," === (r3 = e4.charAt(o2))) {
                for (n3 = o2, o2 += 1, l2(), a3 = o2; o2 < e4.length && "=" !== (r3 = e4.charAt(o2)) && ";" !== r3 && "," !== r3; ) o2 += 1;
                o2 < e4.length && "=" === e4.charAt(o2) ? (i2 = true, o2 = a3, s2.push(e4.substring(t3, n3)), t3 = o2) : o2 = n3 + 1;
              } else o2 += 1;
              (!i2 || o2 >= e4.length) && s2.push(e4.substring(t3, e4.length));
            }
            return s2;
          }(a2)) {
            let t3 = l(e3);
            t3 && this._parsed.set(t3.name, t3);
          }
        }
        get(...e2) {
          let t2 = "string" == typeof e2[0] ? e2[0] : e2[0].name;
          return this._parsed.get(t2);
        }
        getAll(...e2) {
          var t2;
          let r2 = Array.from(this._parsed.values());
          if (!e2.length) return r2;
          let n2 = "string" == typeof e2[0] ? e2[0] : null == (t2 = e2[0]) ? void 0 : t2.name;
          return r2.filter((e3) => e3.name === n2);
        }
        has(e2) {
          return this._parsed.has(e2);
        }
        set(...e2) {
          let [t2, r2, n2] = 1 === e2.length ? [e2[0].name, e2[0].value, e2[0]] : e2, a2 = this._parsed;
          return a2.set(t2, function(e3 = { name: "", value: "" }) {
            return "number" == typeof e3.expires && (e3.expires = new Date(e3.expires)), e3.maxAge && (e3.expires = new Date(Date.now() + 1e3 * e3.maxAge)), (null === e3.path || void 0 === e3.path) && (e3.path = "/"), e3;
          }({ name: t2, value: r2, ...n2 })), function(e3, t3) {
            for (let [, r3] of (t3.delete("set-cookie"), e3)) {
              let e4 = s(r3);
              t3.append("set-cookie", e4);
            }
          }(a2, this._headers), this;
        }
        delete(...e2) {
          let [t2, r2, n2] = "string" == typeof e2[0] ? [e2[0]] : [e2[0].name, e2[0].path, e2[0].domain];
          return this.set({ name: t2, path: r2, domain: n2, value: "", expires: /* @__PURE__ */ new Date(0) });
        }
        [Symbol.for("edge-runtime.inspect.custom")]() {
          return `ResponseCookies ${JSON.stringify(Object.fromEntries(this._parsed))}`;
        }
        toString() {
          return [...this._parsed.values()].map(s).join("; ");
        }
      };
    }, 8439: (e, t, r) => {
      (() => {
        "use strict";
        var t2 = { 491: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.ContextAPI = void 0;
          let n2 = r2(223), a2 = r2(172), i2 = r2(930), s = "context", o = new n2.NoopContextManager();
          class l {
            constructor() {
            }
            static getInstance() {
              return this._instance || (this._instance = new l()), this._instance;
            }
            setGlobalContextManager(e3) {
              return (0, a2.registerGlobal)(s, e3, i2.DiagAPI.instance());
            }
            active() {
              return this._getContextManager().active();
            }
            with(e3, t4, r3, ...n3) {
              return this._getContextManager().with(e3, t4, r3, ...n3);
            }
            bind(e3, t4) {
              return this._getContextManager().bind(e3, t4);
            }
            _getContextManager() {
              return (0, a2.getGlobal)(s) || o;
            }
            disable() {
              this._getContextManager().disable(), (0, a2.unregisterGlobal)(s, i2.DiagAPI.instance());
            }
          }
          t3.ContextAPI = l;
        }, 930: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.DiagAPI = void 0;
          let n2 = r2(56), a2 = r2(912), i2 = r2(957), s = r2(172);
          class o {
            constructor() {
              function e3(e4) {
                return function(...t5) {
                  let r3 = (0, s.getGlobal)("diag");
                  if (r3) return r3[e4](...t5);
                };
              }
              let t4 = this;
              t4.setLogger = (e4, r3 = { logLevel: i2.DiagLogLevel.INFO }) => {
                var n3, o2, l;
                if (e4 === t4) {
                  let e5 = Error("Cannot use diag as the logger for itself. Please use a DiagLogger implementation like ConsoleDiagLogger or a custom implementation");
                  return t4.error(null !== (n3 = e5.stack) && void 0 !== n3 ? n3 : e5.message), false;
                }
                "number" == typeof r3 && (r3 = { logLevel: r3 });
                let c = (0, s.getGlobal)("diag"), u = (0, a2.createLogLevelDiagLogger)(null !== (o2 = r3.logLevel) && void 0 !== o2 ? o2 : i2.DiagLogLevel.INFO, e4);
                if (c && !r3.suppressOverrideMessage) {
                  let e5 = null !== (l = Error().stack) && void 0 !== l ? l : "<failed to generate stacktrace>";
                  c.warn(`Current logger will be overwritten from ${e5}`), u.warn(`Current logger will overwrite one already registered from ${e5}`);
                }
                return (0, s.registerGlobal)("diag", u, t4, true);
              }, t4.disable = () => {
                (0, s.unregisterGlobal)("diag", t4);
              }, t4.createComponentLogger = (e4) => new n2.DiagComponentLogger(e4), t4.verbose = e3("verbose"), t4.debug = e3("debug"), t4.info = e3("info"), t4.warn = e3("warn"), t4.error = e3("error");
            }
            static instance() {
              return this._instance || (this._instance = new o()), this._instance;
            }
          }
          t3.DiagAPI = o;
        }, 653: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.MetricsAPI = void 0;
          let n2 = r2(660), a2 = r2(172), i2 = r2(930), s = "metrics";
          class o {
            constructor() {
            }
            static getInstance() {
              return this._instance || (this._instance = new o()), this._instance;
            }
            setGlobalMeterProvider(e3) {
              return (0, a2.registerGlobal)(s, e3, i2.DiagAPI.instance());
            }
            getMeterProvider() {
              return (0, a2.getGlobal)(s) || n2.NOOP_METER_PROVIDER;
            }
            getMeter(e3, t4, r3) {
              return this.getMeterProvider().getMeter(e3, t4, r3);
            }
            disable() {
              (0, a2.unregisterGlobal)(s, i2.DiagAPI.instance());
            }
          }
          t3.MetricsAPI = o;
        }, 181: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.PropagationAPI = void 0;
          let n2 = r2(172), a2 = r2(874), i2 = r2(194), s = r2(277), o = r2(369), l = r2(930), c = "propagation", u = new a2.NoopTextMapPropagator();
          class d {
            constructor() {
              this.createBaggage = o.createBaggage, this.getBaggage = s.getBaggage, this.getActiveBaggage = s.getActiveBaggage, this.setBaggage = s.setBaggage, this.deleteBaggage = s.deleteBaggage;
            }
            static getInstance() {
              return this._instance || (this._instance = new d()), this._instance;
            }
            setGlobalPropagator(e3) {
              return (0, n2.registerGlobal)(c, e3, l.DiagAPI.instance());
            }
            inject(e3, t4, r3 = i2.defaultTextMapSetter) {
              return this._getGlobalPropagator().inject(e3, t4, r3);
            }
            extract(e3, t4, r3 = i2.defaultTextMapGetter) {
              return this._getGlobalPropagator().extract(e3, t4, r3);
            }
            fields() {
              return this._getGlobalPropagator().fields();
            }
            disable() {
              (0, n2.unregisterGlobal)(c, l.DiagAPI.instance());
            }
            _getGlobalPropagator() {
              return (0, n2.getGlobal)(c) || u;
            }
          }
          t3.PropagationAPI = d;
        }, 997: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.TraceAPI = void 0;
          let n2 = r2(172), a2 = r2(846), i2 = r2(139), s = r2(607), o = r2(930), l = "trace";
          class c {
            constructor() {
              this._proxyTracerProvider = new a2.ProxyTracerProvider(), this.wrapSpanContext = i2.wrapSpanContext, this.isSpanContextValid = i2.isSpanContextValid, this.deleteSpan = s.deleteSpan, this.getSpan = s.getSpan, this.getActiveSpan = s.getActiveSpan, this.getSpanContext = s.getSpanContext, this.setSpan = s.setSpan, this.setSpanContext = s.setSpanContext;
            }
            static getInstance() {
              return this._instance || (this._instance = new c()), this._instance;
            }
            setGlobalTracerProvider(e3) {
              let t4 = (0, n2.registerGlobal)(l, this._proxyTracerProvider, o.DiagAPI.instance());
              return t4 && this._proxyTracerProvider.setDelegate(e3), t4;
            }
            getTracerProvider() {
              return (0, n2.getGlobal)(l) || this._proxyTracerProvider;
            }
            getTracer(e3, t4) {
              return this.getTracerProvider().getTracer(e3, t4);
            }
            disable() {
              (0, n2.unregisterGlobal)(l, o.DiagAPI.instance()), this._proxyTracerProvider = new a2.ProxyTracerProvider();
            }
          }
          t3.TraceAPI = c;
        }, 277: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.deleteBaggage = t3.setBaggage = t3.getActiveBaggage = t3.getBaggage = void 0;
          let n2 = r2(491), a2 = (0, r2(780).createContextKey)("OpenTelemetry Baggage Key");
          function i2(e3) {
            return e3.getValue(a2) || void 0;
          }
          t3.getBaggage = i2, t3.getActiveBaggage = function() {
            return i2(n2.ContextAPI.getInstance().active());
          }, t3.setBaggage = function(e3, t4) {
            return e3.setValue(a2, t4);
          }, t3.deleteBaggage = function(e3) {
            return e3.deleteValue(a2);
          };
        }, 993: (e2, t3) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.BaggageImpl = void 0;
          class r2 {
            constructor(e3) {
              this._entries = e3 ? new Map(e3) : /* @__PURE__ */ new Map();
            }
            getEntry(e3) {
              let t4 = this._entries.get(e3);
              if (t4) return Object.assign({}, t4);
            }
            getAllEntries() {
              return Array.from(this._entries.entries()).map(([e3, t4]) => [e3, t4]);
            }
            setEntry(e3, t4) {
              let n2 = new r2(this._entries);
              return n2._entries.set(e3, t4), n2;
            }
            removeEntry(e3) {
              let t4 = new r2(this._entries);
              return t4._entries.delete(e3), t4;
            }
            removeEntries(...e3) {
              let t4 = new r2(this._entries);
              for (let r3 of e3) t4._entries.delete(r3);
              return t4;
            }
            clear() {
              return new r2();
            }
          }
          t3.BaggageImpl = r2;
        }, 830: (e2, t3) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.baggageEntryMetadataSymbol = void 0, t3.baggageEntryMetadataSymbol = Symbol("BaggageEntryMetadata");
        }, 369: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.baggageEntryMetadataFromString = t3.createBaggage = void 0;
          let n2 = r2(930), a2 = r2(993), i2 = r2(830), s = n2.DiagAPI.instance();
          t3.createBaggage = function(e3 = {}) {
            return new a2.BaggageImpl(new Map(Object.entries(e3)));
          }, t3.baggageEntryMetadataFromString = function(e3) {
            return "string" != typeof e3 && (s.error(`Cannot create baggage metadata from unknown type: ${typeof e3}`), e3 = ""), { __TYPE__: i2.baggageEntryMetadataSymbol, toString: () => e3 };
          };
        }, 67: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.context = void 0;
          let n2 = r2(491);
          t3.context = n2.ContextAPI.getInstance();
        }, 223: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.NoopContextManager = void 0;
          let n2 = r2(780);
          class a2 {
            active() {
              return n2.ROOT_CONTEXT;
            }
            with(e3, t4, r3, ...n3) {
              return t4.call(r3, ...n3);
            }
            bind(e3, t4) {
              return t4;
            }
            enable() {
              return this;
            }
            disable() {
              return this;
            }
          }
          t3.NoopContextManager = a2;
        }, 780: (e2, t3) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.ROOT_CONTEXT = t3.createContextKey = void 0, t3.createContextKey = function(e3) {
            return Symbol.for(e3);
          };
          class r2 {
            constructor(e3) {
              let t4 = this;
              t4._currentContext = e3 ? new Map(e3) : /* @__PURE__ */ new Map(), t4.getValue = (e4) => t4._currentContext.get(e4), t4.setValue = (e4, n2) => {
                let a2 = new r2(t4._currentContext);
                return a2._currentContext.set(e4, n2), a2;
              }, t4.deleteValue = (e4) => {
                let n2 = new r2(t4._currentContext);
                return n2._currentContext.delete(e4), n2;
              };
            }
          }
          t3.ROOT_CONTEXT = new r2();
        }, 506: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.diag = void 0;
          let n2 = r2(930);
          t3.diag = n2.DiagAPI.instance();
        }, 56: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.DiagComponentLogger = void 0;
          let n2 = r2(172);
          class a2 {
            constructor(e3) {
              this._namespace = e3.namespace || "DiagComponentLogger";
            }
            debug(...e3) {
              return i2("debug", this._namespace, e3);
            }
            error(...e3) {
              return i2("error", this._namespace, e3);
            }
            info(...e3) {
              return i2("info", this._namespace, e3);
            }
            warn(...e3) {
              return i2("warn", this._namespace, e3);
            }
            verbose(...e3) {
              return i2("verbose", this._namespace, e3);
            }
          }
          function i2(e3, t4, r3) {
            let a3 = (0, n2.getGlobal)("diag");
            if (a3) return r3.unshift(t4), a3[e3](...r3);
          }
          t3.DiagComponentLogger = a2;
        }, 972: (e2, t3) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.DiagConsoleLogger = void 0;
          let r2 = [{ n: "error", c: "error" }, { n: "warn", c: "warn" }, { n: "info", c: "info" }, { n: "debug", c: "debug" }, { n: "verbose", c: "trace" }];
          class n2 {
            constructor() {
              for (let e3 = 0; e3 < r2.length; e3++) this[r2[e3].n] = /* @__PURE__ */ function(e4) {
                return function(...t4) {
                  if (console) {
                    let r3 = console[e4];
                    if ("function" != typeof r3 && (r3 = console.log), "function" == typeof r3) return r3.apply(console, t4);
                  }
                };
              }(r2[e3].c);
            }
          }
          t3.DiagConsoleLogger = n2;
        }, 912: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.createLogLevelDiagLogger = void 0;
          let n2 = r2(957);
          t3.createLogLevelDiagLogger = function(e3, t4) {
            function r3(r4, n3) {
              let a2 = t4[r4];
              return "function" == typeof a2 && e3 >= n3 ? a2.bind(t4) : function() {
              };
            }
            return e3 < n2.DiagLogLevel.NONE ? e3 = n2.DiagLogLevel.NONE : e3 > n2.DiagLogLevel.ALL && (e3 = n2.DiagLogLevel.ALL), t4 = t4 || {}, { error: r3("error", n2.DiagLogLevel.ERROR), warn: r3("warn", n2.DiagLogLevel.WARN), info: r3("info", n2.DiagLogLevel.INFO), debug: r3("debug", n2.DiagLogLevel.DEBUG), verbose: r3("verbose", n2.DiagLogLevel.VERBOSE) };
          };
        }, 957: (e2, t3) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.DiagLogLevel = void 0, function(e3) {
            e3[e3.NONE = 0] = "NONE", e3[e3.ERROR = 30] = "ERROR", e3[e3.WARN = 50] = "WARN", e3[e3.INFO = 60] = "INFO", e3[e3.DEBUG = 70] = "DEBUG", e3[e3.VERBOSE = 80] = "VERBOSE", e3[e3.ALL = 9999] = "ALL";
          }(t3.DiagLogLevel || (t3.DiagLogLevel = {}));
        }, 172: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.unregisterGlobal = t3.getGlobal = t3.registerGlobal = void 0;
          let n2 = r2(200), a2 = r2(521), i2 = r2(130), s = a2.VERSION.split(".")[0], o = Symbol.for(`opentelemetry.js.api.${s}`), l = n2._globalThis;
          t3.registerGlobal = function(e3, t4, r3, n3 = false) {
            var i3;
            let s2 = l[o] = null !== (i3 = l[o]) && void 0 !== i3 ? i3 : { version: a2.VERSION };
            if (!n3 && s2[e3]) {
              let t5 = Error(`@opentelemetry/api: Attempted duplicate registration of API: ${e3}`);
              return r3.error(t5.stack || t5.message), false;
            }
            if (s2.version !== a2.VERSION) {
              let t5 = Error(`@opentelemetry/api: Registration of version v${s2.version} for ${e3} does not match previously registered API v${a2.VERSION}`);
              return r3.error(t5.stack || t5.message), false;
            }
            return s2[e3] = t4, r3.debug(`@opentelemetry/api: Registered a global for ${e3} v${a2.VERSION}.`), true;
          }, t3.getGlobal = function(e3) {
            var t4, r3;
            let n3 = null === (t4 = l[o]) || void 0 === t4 ? void 0 : t4.version;
            if (n3 && (0, i2.isCompatible)(n3)) return null === (r3 = l[o]) || void 0 === r3 ? void 0 : r3[e3];
          }, t3.unregisterGlobal = function(e3, t4) {
            t4.debug(`@opentelemetry/api: Unregistering a global for ${e3} v${a2.VERSION}.`);
            let r3 = l[o];
            r3 && delete r3[e3];
          };
        }, 130: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.isCompatible = t3._makeCompatibilityCheck = void 0;
          let n2 = r2(521), a2 = /^(\d+)\.(\d+)\.(\d+)(-(.+))?$/;
          function i2(e3) {
            let t4 = /* @__PURE__ */ new Set([e3]), r3 = /* @__PURE__ */ new Set(), n3 = e3.match(a2);
            if (!n3) return () => false;
            let i3 = { major: +n3[1], minor: +n3[2], patch: +n3[3], prerelease: n3[4] };
            if (null != i3.prerelease) return function(t5) {
              return t5 === e3;
            };
            function s(e4) {
              return r3.add(e4), false;
            }
            return function(e4) {
              if (t4.has(e4)) return true;
              if (r3.has(e4)) return false;
              let n4 = e4.match(a2);
              if (!n4) return s(e4);
              let o = { major: +n4[1], minor: +n4[2], patch: +n4[3], prerelease: n4[4] };
              return null != o.prerelease || i3.major !== o.major ? s(e4) : 0 === i3.major ? i3.minor === o.minor && i3.patch <= o.patch ? (t4.add(e4), true) : s(e4) : i3.minor <= o.minor ? (t4.add(e4), true) : s(e4);
            };
          }
          t3._makeCompatibilityCheck = i2, t3.isCompatible = i2(n2.VERSION);
        }, 886: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.metrics = void 0;
          let n2 = r2(653);
          t3.metrics = n2.MetricsAPI.getInstance();
        }, 901: (e2, t3) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.ValueType = void 0, function(e3) {
            e3[e3.INT = 0] = "INT", e3[e3.DOUBLE = 1] = "DOUBLE";
          }(t3.ValueType || (t3.ValueType = {}));
        }, 102: (e2, t3) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.createNoopMeter = t3.NOOP_OBSERVABLE_UP_DOWN_COUNTER_METRIC = t3.NOOP_OBSERVABLE_GAUGE_METRIC = t3.NOOP_OBSERVABLE_COUNTER_METRIC = t3.NOOP_UP_DOWN_COUNTER_METRIC = t3.NOOP_HISTOGRAM_METRIC = t3.NOOP_COUNTER_METRIC = t3.NOOP_METER = t3.NoopObservableUpDownCounterMetric = t3.NoopObservableGaugeMetric = t3.NoopObservableCounterMetric = t3.NoopObservableMetric = t3.NoopHistogramMetric = t3.NoopUpDownCounterMetric = t3.NoopCounterMetric = t3.NoopMetric = t3.NoopMeter = void 0;
          class r2 {
            constructor() {
            }
            createHistogram(e3, r3) {
              return t3.NOOP_HISTOGRAM_METRIC;
            }
            createCounter(e3, r3) {
              return t3.NOOP_COUNTER_METRIC;
            }
            createUpDownCounter(e3, r3) {
              return t3.NOOP_UP_DOWN_COUNTER_METRIC;
            }
            createObservableGauge(e3, r3) {
              return t3.NOOP_OBSERVABLE_GAUGE_METRIC;
            }
            createObservableCounter(e3, r3) {
              return t3.NOOP_OBSERVABLE_COUNTER_METRIC;
            }
            createObservableUpDownCounter(e3, r3) {
              return t3.NOOP_OBSERVABLE_UP_DOWN_COUNTER_METRIC;
            }
            addBatchObservableCallback(e3, t4) {
            }
            removeBatchObservableCallback(e3) {
            }
          }
          t3.NoopMeter = r2;
          class n2 {
          }
          t3.NoopMetric = n2;
          class a2 extends n2 {
            add(e3, t4) {
            }
          }
          t3.NoopCounterMetric = a2;
          class i2 extends n2 {
            add(e3, t4) {
            }
          }
          t3.NoopUpDownCounterMetric = i2;
          class s extends n2 {
            record(e3, t4) {
            }
          }
          t3.NoopHistogramMetric = s;
          class o {
            addCallback(e3) {
            }
            removeCallback(e3) {
            }
          }
          t3.NoopObservableMetric = o;
          class l extends o {
          }
          t3.NoopObservableCounterMetric = l;
          class c extends o {
          }
          t3.NoopObservableGaugeMetric = c;
          class u extends o {
          }
          t3.NoopObservableUpDownCounterMetric = u, t3.NOOP_METER = new r2(), t3.NOOP_COUNTER_METRIC = new a2(), t3.NOOP_HISTOGRAM_METRIC = new s(), t3.NOOP_UP_DOWN_COUNTER_METRIC = new i2(), t3.NOOP_OBSERVABLE_COUNTER_METRIC = new l(), t3.NOOP_OBSERVABLE_GAUGE_METRIC = new c(), t3.NOOP_OBSERVABLE_UP_DOWN_COUNTER_METRIC = new u(), t3.createNoopMeter = function() {
            return t3.NOOP_METER;
          };
        }, 660: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.NOOP_METER_PROVIDER = t3.NoopMeterProvider = void 0;
          let n2 = r2(102);
          class a2 {
            getMeter(e3, t4, r3) {
              return n2.NOOP_METER;
            }
          }
          t3.NoopMeterProvider = a2, t3.NOOP_METER_PROVIDER = new a2();
        }, 200: function(e2, t3, r2) {
          var n2 = this && this.__createBinding || (Object.create ? function(e3, t4, r3, n3) {
            void 0 === n3 && (n3 = r3), Object.defineProperty(e3, n3, { enumerable: true, get: function() {
              return t4[r3];
            } });
          } : function(e3, t4, r3, n3) {
            void 0 === n3 && (n3 = r3), e3[n3] = t4[r3];
          }), a2 = this && this.__exportStar || function(e3, t4) {
            for (var r3 in e3) "default" === r3 || Object.prototype.hasOwnProperty.call(t4, r3) || n2(t4, e3, r3);
          };
          Object.defineProperty(t3, "__esModule", { value: true }), a2(r2(46), t3);
        }, 651: (e2, t3) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3._globalThis = void 0, t3._globalThis = "object" == typeof globalThis ? globalThis : r.g;
        }, 46: function(e2, t3, r2) {
          var n2 = this && this.__createBinding || (Object.create ? function(e3, t4, r3, n3) {
            void 0 === n3 && (n3 = r3), Object.defineProperty(e3, n3, { enumerable: true, get: function() {
              return t4[r3];
            } });
          } : function(e3, t4, r3, n3) {
            void 0 === n3 && (n3 = r3), e3[n3] = t4[r3];
          }), a2 = this && this.__exportStar || function(e3, t4) {
            for (var r3 in e3) "default" === r3 || Object.prototype.hasOwnProperty.call(t4, r3) || n2(t4, e3, r3);
          };
          Object.defineProperty(t3, "__esModule", { value: true }), a2(r2(651), t3);
        }, 939: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.propagation = void 0;
          let n2 = r2(181);
          t3.propagation = n2.PropagationAPI.getInstance();
        }, 874: (e2, t3) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.NoopTextMapPropagator = void 0;
          class r2 {
            inject(e3, t4) {
            }
            extract(e3, t4) {
              return e3;
            }
            fields() {
              return [];
            }
          }
          t3.NoopTextMapPropagator = r2;
        }, 194: (e2, t3) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.defaultTextMapSetter = t3.defaultTextMapGetter = void 0, t3.defaultTextMapGetter = { get(e3, t4) {
            if (null != e3) return e3[t4];
          }, keys: (e3) => null == e3 ? [] : Object.keys(e3) }, t3.defaultTextMapSetter = { set(e3, t4, r2) {
            null != e3 && (e3[t4] = r2);
          } };
        }, 845: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.trace = void 0;
          let n2 = r2(997);
          t3.trace = n2.TraceAPI.getInstance();
        }, 403: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.NonRecordingSpan = void 0;
          let n2 = r2(476);
          class a2 {
            constructor(e3 = n2.INVALID_SPAN_CONTEXT) {
              this._spanContext = e3;
            }
            spanContext() {
              return this._spanContext;
            }
            setAttribute(e3, t4) {
              return this;
            }
            setAttributes(e3) {
              return this;
            }
            addEvent(e3, t4) {
              return this;
            }
            setStatus(e3) {
              return this;
            }
            updateName(e3) {
              return this;
            }
            end(e3) {
            }
            isRecording() {
              return false;
            }
            recordException(e3, t4) {
            }
          }
          t3.NonRecordingSpan = a2;
        }, 614: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.NoopTracer = void 0;
          let n2 = r2(491), a2 = r2(607), i2 = r2(403), s = r2(139), o = n2.ContextAPI.getInstance();
          class l {
            startSpan(e3, t4, r3 = o.active()) {
              if (null == t4 ? void 0 : t4.root) return new i2.NonRecordingSpan();
              let n3 = r3 && (0, a2.getSpanContext)(r3);
              return "object" == typeof n3 && "string" == typeof n3.spanId && "string" == typeof n3.traceId && "number" == typeof n3.traceFlags && (0, s.isSpanContextValid)(n3) ? new i2.NonRecordingSpan(n3) : new i2.NonRecordingSpan();
            }
            startActiveSpan(e3, t4, r3, n3) {
              let i3, s2, l2;
              if (arguments.length < 2) return;
              2 == arguments.length ? l2 = t4 : 3 == arguments.length ? (i3 = t4, l2 = r3) : (i3 = t4, s2 = r3, l2 = n3);
              let c = null != s2 ? s2 : o.active(), u = this.startSpan(e3, i3, c), d = (0, a2.setSpan)(c, u);
              return o.with(d, l2, void 0, u);
            }
          }
          t3.NoopTracer = l;
        }, 124: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.NoopTracerProvider = void 0;
          let n2 = r2(614);
          class a2 {
            getTracer(e3, t4, r3) {
              return new n2.NoopTracer();
            }
          }
          t3.NoopTracerProvider = a2;
        }, 125: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.ProxyTracer = void 0;
          let n2 = new (r2(614)).NoopTracer();
          class a2 {
            constructor(e3, t4, r3, n3) {
              this._provider = e3, this.name = t4, this.version = r3, this.options = n3;
            }
            startSpan(e3, t4, r3) {
              return this._getTracer().startSpan(e3, t4, r3);
            }
            startActiveSpan(e3, t4, r3, n3) {
              let a3 = this._getTracer();
              return Reflect.apply(a3.startActiveSpan, a3, arguments);
            }
            _getTracer() {
              if (this._delegate) return this._delegate;
              let e3 = this._provider.getDelegateTracer(this.name, this.version, this.options);
              return e3 ? (this._delegate = e3, this._delegate) : n2;
            }
          }
          t3.ProxyTracer = a2;
        }, 846: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.ProxyTracerProvider = void 0;
          let n2 = r2(125), a2 = new (r2(124)).NoopTracerProvider();
          class i2 {
            getTracer(e3, t4, r3) {
              var a3;
              return null !== (a3 = this.getDelegateTracer(e3, t4, r3)) && void 0 !== a3 ? a3 : new n2.ProxyTracer(this, e3, t4, r3);
            }
            getDelegate() {
              var e3;
              return null !== (e3 = this._delegate) && void 0 !== e3 ? e3 : a2;
            }
            setDelegate(e3) {
              this._delegate = e3;
            }
            getDelegateTracer(e3, t4, r3) {
              var n3;
              return null === (n3 = this._delegate) || void 0 === n3 ? void 0 : n3.getTracer(e3, t4, r3);
            }
          }
          t3.ProxyTracerProvider = i2;
        }, 996: (e2, t3) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.SamplingDecision = void 0, function(e3) {
            e3[e3.NOT_RECORD = 0] = "NOT_RECORD", e3[e3.RECORD = 1] = "RECORD", e3[e3.RECORD_AND_SAMPLED = 2] = "RECORD_AND_SAMPLED";
          }(t3.SamplingDecision || (t3.SamplingDecision = {}));
        }, 607: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.getSpanContext = t3.setSpanContext = t3.deleteSpan = t3.setSpan = t3.getActiveSpan = t3.getSpan = void 0;
          let n2 = r2(780), a2 = r2(403), i2 = r2(491), s = (0, n2.createContextKey)("OpenTelemetry Context Key SPAN");
          function o(e3) {
            return e3.getValue(s) || void 0;
          }
          function l(e3, t4) {
            return e3.setValue(s, t4);
          }
          t3.getSpan = o, t3.getActiveSpan = function() {
            return o(i2.ContextAPI.getInstance().active());
          }, t3.setSpan = l, t3.deleteSpan = function(e3) {
            return e3.deleteValue(s);
          }, t3.setSpanContext = function(e3, t4) {
            return l(e3, new a2.NonRecordingSpan(t4));
          }, t3.getSpanContext = function(e3) {
            var t4;
            return null === (t4 = o(e3)) || void 0 === t4 ? void 0 : t4.spanContext();
          };
        }, 325: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.TraceStateImpl = void 0;
          let n2 = r2(564);
          class a2 {
            constructor(e3) {
              this._internalState = /* @__PURE__ */ new Map(), e3 && this._parse(e3);
            }
            set(e3, t4) {
              let r3 = this._clone();
              return r3._internalState.has(e3) && r3._internalState.delete(e3), r3._internalState.set(e3, t4), r3;
            }
            unset(e3) {
              let t4 = this._clone();
              return t4._internalState.delete(e3), t4;
            }
            get(e3) {
              return this._internalState.get(e3);
            }
            serialize() {
              return this._keys().reduce((e3, t4) => (e3.push(t4 + "=" + this.get(t4)), e3), []).join(",");
            }
            _parse(e3) {
              !(e3.length > 512) && (this._internalState = e3.split(",").reverse().reduce((e4, t4) => {
                let r3 = t4.trim(), a3 = r3.indexOf("=");
                if (-1 !== a3) {
                  let i2 = r3.slice(0, a3), s = r3.slice(a3 + 1, t4.length);
                  (0, n2.validateKey)(i2) && (0, n2.validateValue)(s) && e4.set(i2, s);
                }
                return e4;
              }, /* @__PURE__ */ new Map()), this._internalState.size > 32 && (this._internalState = new Map(Array.from(this._internalState.entries()).reverse().slice(0, 32))));
            }
            _keys() {
              return Array.from(this._internalState.keys()).reverse();
            }
            _clone() {
              let e3 = new a2();
              return e3._internalState = new Map(this._internalState), e3;
            }
          }
          t3.TraceStateImpl = a2;
        }, 564: (e2, t3) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.validateValue = t3.validateKey = void 0;
          let r2 = "[_0-9a-z-*/]", n2 = `[a-z]${r2}{0,255}`, a2 = `[a-z0-9]${r2}{0,240}@[a-z]${r2}{0,13}`, i2 = RegExp(`^(?:${n2}|${a2})$`), s = /^[ -~]{0,255}[!-~]$/, o = /,|=/;
          t3.validateKey = function(e3) {
            return i2.test(e3);
          }, t3.validateValue = function(e3) {
            return s.test(e3) && !o.test(e3);
          };
        }, 98: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.createTraceState = void 0;
          let n2 = r2(325);
          t3.createTraceState = function(e3) {
            return new n2.TraceStateImpl(e3);
          };
        }, 476: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.INVALID_SPAN_CONTEXT = t3.INVALID_TRACEID = t3.INVALID_SPANID = void 0;
          let n2 = r2(475);
          t3.INVALID_SPANID = "0000000000000000", t3.INVALID_TRACEID = "00000000000000000000000000000000", t3.INVALID_SPAN_CONTEXT = { traceId: t3.INVALID_TRACEID, spanId: t3.INVALID_SPANID, traceFlags: n2.TraceFlags.NONE };
        }, 357: (e2, t3) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.SpanKind = void 0, function(e3) {
            e3[e3.INTERNAL = 0] = "INTERNAL", e3[e3.SERVER = 1] = "SERVER", e3[e3.CLIENT = 2] = "CLIENT", e3[e3.PRODUCER = 3] = "PRODUCER", e3[e3.CONSUMER = 4] = "CONSUMER";
          }(t3.SpanKind || (t3.SpanKind = {}));
        }, 139: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.wrapSpanContext = t3.isSpanContextValid = t3.isValidSpanId = t3.isValidTraceId = void 0;
          let n2 = r2(476), a2 = r2(403), i2 = /^([0-9a-f]{32})$/i, s = /^[0-9a-f]{16}$/i;
          function o(e3) {
            return i2.test(e3) && e3 !== n2.INVALID_TRACEID;
          }
          function l(e3) {
            return s.test(e3) && e3 !== n2.INVALID_SPANID;
          }
          t3.isValidTraceId = o, t3.isValidSpanId = l, t3.isSpanContextValid = function(e3) {
            return o(e3.traceId) && l(e3.spanId);
          }, t3.wrapSpanContext = function(e3) {
            return new a2.NonRecordingSpan(e3);
          };
        }, 847: (e2, t3) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.SpanStatusCode = void 0, function(e3) {
            e3[e3.UNSET = 0] = "UNSET", e3[e3.OK = 1] = "OK", e3[e3.ERROR = 2] = "ERROR";
          }(t3.SpanStatusCode || (t3.SpanStatusCode = {}));
        }, 475: (e2, t3) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.TraceFlags = void 0, function(e3) {
            e3[e3.NONE = 0] = "NONE", e3[e3.SAMPLED = 1] = "SAMPLED";
          }(t3.TraceFlags || (t3.TraceFlags = {}));
        }, 521: (e2, t3) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.VERSION = void 0, t3.VERSION = "1.6.0";
        } }, n = {};
        function a(e2) {
          var r2 = n[e2];
          if (void 0 !== r2) return r2.exports;
          var i2 = n[e2] = { exports: {} }, s = true;
          try {
            t2[e2].call(i2.exports, i2, i2.exports, a), s = false;
          } finally {
            s && delete n[e2];
          }
          return i2.exports;
        }
        a.ab = "//";
        var i = {};
        (() => {
          Object.defineProperty(i, "__esModule", { value: true }), i.trace = i.propagation = i.metrics = i.diag = i.context = i.INVALID_SPAN_CONTEXT = i.INVALID_TRACEID = i.INVALID_SPANID = i.isValidSpanId = i.isValidTraceId = i.isSpanContextValid = i.createTraceState = i.TraceFlags = i.SpanStatusCode = i.SpanKind = i.SamplingDecision = i.ProxyTracerProvider = i.ProxyTracer = i.defaultTextMapSetter = i.defaultTextMapGetter = i.ValueType = i.createNoopMeter = i.DiagLogLevel = i.DiagConsoleLogger = i.ROOT_CONTEXT = i.createContextKey = i.baggageEntryMetadataFromString = void 0;
          var e2 = a(369);
          Object.defineProperty(i, "baggageEntryMetadataFromString", { enumerable: true, get: function() {
            return e2.baggageEntryMetadataFromString;
          } });
          var t3 = a(780);
          Object.defineProperty(i, "createContextKey", { enumerable: true, get: function() {
            return t3.createContextKey;
          } }), Object.defineProperty(i, "ROOT_CONTEXT", { enumerable: true, get: function() {
            return t3.ROOT_CONTEXT;
          } });
          var r2 = a(972);
          Object.defineProperty(i, "DiagConsoleLogger", { enumerable: true, get: function() {
            return r2.DiagConsoleLogger;
          } });
          var n2 = a(957);
          Object.defineProperty(i, "DiagLogLevel", { enumerable: true, get: function() {
            return n2.DiagLogLevel;
          } });
          var s = a(102);
          Object.defineProperty(i, "createNoopMeter", { enumerable: true, get: function() {
            return s.createNoopMeter;
          } });
          var o = a(901);
          Object.defineProperty(i, "ValueType", { enumerable: true, get: function() {
            return o.ValueType;
          } });
          var l = a(194);
          Object.defineProperty(i, "defaultTextMapGetter", { enumerable: true, get: function() {
            return l.defaultTextMapGetter;
          } }), Object.defineProperty(i, "defaultTextMapSetter", { enumerable: true, get: function() {
            return l.defaultTextMapSetter;
          } });
          var c = a(125);
          Object.defineProperty(i, "ProxyTracer", { enumerable: true, get: function() {
            return c.ProxyTracer;
          } });
          var u = a(846);
          Object.defineProperty(i, "ProxyTracerProvider", { enumerable: true, get: function() {
            return u.ProxyTracerProvider;
          } });
          var d = a(996);
          Object.defineProperty(i, "SamplingDecision", { enumerable: true, get: function() {
            return d.SamplingDecision;
          } });
          var p = a(357);
          Object.defineProperty(i, "SpanKind", { enumerable: true, get: function() {
            return p.SpanKind;
          } });
          var h = a(847);
          Object.defineProperty(i, "SpanStatusCode", { enumerable: true, get: function() {
            return h.SpanStatusCode;
          } });
          var f = a(475);
          Object.defineProperty(i, "TraceFlags", { enumerable: true, get: function() {
            return f.TraceFlags;
          } });
          var m = a(98);
          Object.defineProperty(i, "createTraceState", { enumerable: true, get: function() {
            return m.createTraceState;
          } });
          var g = a(139);
          Object.defineProperty(i, "isSpanContextValid", { enumerable: true, get: function() {
            return g.isSpanContextValid;
          } }), Object.defineProperty(i, "isValidTraceId", { enumerable: true, get: function() {
            return g.isValidTraceId;
          } }), Object.defineProperty(i, "isValidSpanId", { enumerable: true, get: function() {
            return g.isValidSpanId;
          } });
          var y = a(476);
          Object.defineProperty(i, "INVALID_SPANID", { enumerable: true, get: function() {
            return y.INVALID_SPANID;
          } }), Object.defineProperty(i, "INVALID_TRACEID", { enumerable: true, get: function() {
            return y.INVALID_TRACEID;
          } }), Object.defineProperty(i, "INVALID_SPAN_CONTEXT", { enumerable: true, get: function() {
            return y.INVALID_SPAN_CONTEXT;
          } });
          let b = a(67);
          Object.defineProperty(i, "context", { enumerable: true, get: function() {
            return b.context;
          } });
          let w = a(506);
          Object.defineProperty(i, "diag", { enumerable: true, get: function() {
            return w.diag;
          } });
          let v = a(886);
          Object.defineProperty(i, "metrics", { enumerable: true, get: function() {
            return v.metrics;
          } });
          let _ = a(939);
          Object.defineProperty(i, "propagation", { enumerable: true, get: function() {
            return _.propagation;
          } });
          let S = a(845);
          Object.defineProperty(i, "trace", { enumerable: true, get: function() {
            return S.trace;
          } }), i.default = { context: b.context, diag: w.diag, metrics: v.metrics, propagation: _.propagation, trace: S.trace };
        })(), e.exports = i;
      })();
    }, 1133: (e) => {
      (() => {
        "use strict";
        "undefined" != typeof __nccwpck_require__ && (__nccwpck_require__.ab = "//");
        var t = {};
        (() => {
          t.parse = function(t2, r2) {
            if ("string" != typeof t2) throw TypeError("argument str must be a string");
            for (var a2 = {}, i = t2.split(n), s = (r2 || {}).decode || e2, o = 0; o < i.length; o++) {
              var l = i[o], c = l.indexOf("=");
              if (!(c < 0)) {
                var u = l.substr(0, c).trim(), d = l.substr(++c, l.length).trim();
                '"' == d[0] && (d = d.slice(1, -1)), void 0 == a2[u] && (a2[u] = function(e3, t3) {
                  try {
                    return t3(e3);
                  } catch (t4) {
                    return e3;
                  }
                }(d, s));
              }
            }
            return a2;
          }, t.serialize = function(e3, t2, n2) {
            var i = n2 || {}, s = i.encode || r;
            if ("function" != typeof s) throw TypeError("option encode is invalid");
            if (!a.test(e3)) throw TypeError("argument name is invalid");
            var o = s(t2);
            if (o && !a.test(o)) throw TypeError("argument val is invalid");
            var l = e3 + "=" + o;
            if (null != i.maxAge) {
              var c = i.maxAge - 0;
              if (isNaN(c) || !isFinite(c)) throw TypeError("option maxAge is invalid");
              l += "; Max-Age=" + Math.floor(c);
            }
            if (i.domain) {
              if (!a.test(i.domain)) throw TypeError("option domain is invalid");
              l += "; Domain=" + i.domain;
            }
            if (i.path) {
              if (!a.test(i.path)) throw TypeError("option path is invalid");
              l += "; Path=" + i.path;
            }
            if (i.expires) {
              if ("function" != typeof i.expires.toUTCString) throw TypeError("option expires is invalid");
              l += "; Expires=" + i.expires.toUTCString();
            }
            if (i.httpOnly && (l += "; HttpOnly"), i.secure && (l += "; Secure"), i.sameSite) switch ("string" == typeof i.sameSite ? i.sameSite.toLowerCase() : i.sameSite) {
              case true:
              case "strict":
                l += "; SameSite=Strict";
                break;
              case "lax":
                l += "; SameSite=Lax";
                break;
              case "none":
                l += "; SameSite=None";
                break;
              default:
                throw TypeError("option sameSite is invalid");
            }
            return l;
          };
          var e2 = decodeURIComponent, r = encodeURIComponent, n = /; */, a = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;
        })(), e.exports = t;
      })();
    }, 340: (e, t, r) => {
      var n;
      (() => {
        var a = { 226: function(a2, i2) {
          !function(s2, o2) {
            "use strict";
            var l = "function", c = "undefined", u = "object", d = "string", p = "major", h = "model", f = "name", m = "type", g = "vendor", y = "version", b = "architecture", w = "console", v = "mobile", _ = "tablet", S = "smarttv", E = "wearable", A = "embedded", k = "Amazon", x = "Apple", R = "ASUS", C = "BlackBerry", O = "Browser", P = "Chrome", T = "Firefox", j = "Google", I = "Huawei", $ = "Microsoft", N = "Motorola", M = "Opera", D = "Samsung", L = "Sharp", H = "Sony", U = "Xiaomi", q = "Zebra", K = "Facebook", W = "Chromium OS", F = "Mac OS", J = function(e2, t2) {
              var r2 = {};
              for (var n2 in e2) t2[n2] && t2[n2].length % 2 == 0 ? r2[n2] = t2[n2].concat(e2[n2]) : r2[n2] = e2[n2];
              return r2;
            }, z = function(e2) {
              for (var t2 = {}, r2 = 0; r2 < e2.length; r2++) t2[e2[r2].toUpperCase()] = e2[r2];
              return t2;
            }, B = function(e2, t2) {
              return typeof e2 === d && -1 !== G(t2).indexOf(G(e2));
            }, G = function(e2) {
              return e2.toLowerCase();
            }, V = function(e2, t2) {
              if (typeof e2 === d) return e2 = e2.replace(/^\s\s*/, ""), typeof t2 === c ? e2 : e2.substring(0, 350);
            }, X = function(e2, t2) {
              for (var r2, n2, a3, i3, s3, c2, d2 = 0; d2 < t2.length && !s3; ) {
                var p2 = t2[d2], h2 = t2[d2 + 1];
                for (r2 = n2 = 0; r2 < p2.length && !s3 && p2[r2]; ) if (s3 = p2[r2++].exec(e2)) for (a3 = 0; a3 < h2.length; a3++) c2 = s3[++n2], typeof (i3 = h2[a3]) === u && i3.length > 0 ? 2 === i3.length ? typeof i3[1] == l ? this[i3[0]] = i3[1].call(this, c2) : this[i3[0]] = i3[1] : 3 === i3.length ? typeof i3[1] !== l || i3[1].exec && i3[1].test ? this[i3[0]] = c2 ? c2.replace(i3[1], i3[2]) : void 0 : this[i3[0]] = c2 ? i3[1].call(this, c2, i3[2]) : void 0 : 4 === i3.length && (this[i3[0]] = c2 ? i3[3].call(this, c2.replace(i3[1], i3[2])) : void 0) : this[i3] = c2 || o2;
                d2 += 2;
              }
            }, Y = function(e2, t2) {
              for (var r2 in t2) if (typeof t2[r2] === u && t2[r2].length > 0) {
                for (var n2 = 0; n2 < t2[r2].length; n2++) if (B(t2[r2][n2], e2)) return "?" === r2 ? o2 : r2;
              } else if (B(t2[r2], e2)) return "?" === r2 ? o2 : r2;
              return e2;
            }, Z = { ME: "4.90", "NT 3.11": "NT3.51", "NT 4.0": "NT4.0", 2e3: "NT 5.0", XP: ["NT 5.1", "NT 5.2"], Vista: "NT 6.0", 7: "NT 6.1", 8: "NT 6.2", 8.1: "NT 6.3", 10: ["NT 6.4", "NT 10.0"], RT: "ARM" }, Q = { browser: [[/\b(?:crmo|crios)\/([\w\.]+)/i], [y, [f, "Chrome"]], [/edg(?:e|ios|a)?\/([\w\.]+)/i], [y, [f, "Edge"]], [/(opera mini)\/([-\w\.]+)/i, /(opera [mobiletab]{3,6})\b.+version\/([-\w\.]+)/i, /(opera)(?:.+version\/|[\/ ]+)([\w\.]+)/i], [f, y], [/opios[\/ ]+([\w\.]+)/i], [y, [f, M + " Mini"]], [/\bopr\/([\w\.]+)/i], [y, [f, M]], [/(kindle)\/([\w\.]+)/i, /(lunascape|maxthon|netfront|jasmine|blazer)[\/ ]?([\w\.]*)/i, /(avant |iemobile|slim)(?:browser)?[\/ ]?([\w\.]*)/i, /(ba?idubrowser)[\/ ]?([\w\.]+)/i, /(?:ms|\()(ie) ([\w\.]+)/i, /(flock|rockmelt|midori|epiphany|silk|skyfire|bolt|iron|vivaldi|iridium|phantomjs|bowser|quark|qupzilla|falkon|rekonq|puffin|brave|whale(?!.+naver)|qqbrowserlite|qq|duckduckgo)\/([-\w\.]+)/i, /(heytap|ovi)browser\/([\d\.]+)/i, /(weibo)__([\d\.]+)/i], [f, y], [/(?:\buc? ?browser|(?:juc.+)ucweb)[\/ ]?([\w\.]+)/i], [y, [f, "UC" + O]], [/microm.+\bqbcore\/([\w\.]+)/i, /\bqbcore\/([\w\.]+).+microm/i], [y, [f, "WeChat(Win) Desktop"]], [/micromessenger\/([\w\.]+)/i], [y, [f, "WeChat"]], [/konqueror\/([\w\.]+)/i], [y, [f, "Konqueror"]], [/trident.+rv[: ]([\w\.]{1,9})\b.+like gecko/i], [y, [f, "IE"]], [/ya(?:search)?browser\/([\w\.]+)/i], [y, [f, "Yandex"]], [/(avast|avg)\/([\w\.]+)/i], [[f, /(.+)/, "$1 Secure " + O], y], [/\bfocus\/([\w\.]+)/i], [y, [f, T + " Focus"]], [/\bopt\/([\w\.]+)/i], [y, [f, M + " Touch"]], [/coc_coc\w+\/([\w\.]+)/i], [y, [f, "Coc Coc"]], [/dolfin\/([\w\.]+)/i], [y, [f, "Dolphin"]], [/coast\/([\w\.]+)/i], [y, [f, M + " Coast"]], [/miuibrowser\/([\w\.]+)/i], [y, [f, "MIUI " + O]], [/fxios\/([-\w\.]+)/i], [y, [f, T]], [/\bqihu|(qi?ho?o?|360)browser/i], [[f, "360 " + O]], [/(oculus|samsung|sailfish|huawei)browser\/([\w\.]+)/i], [[f, /(.+)/, "$1 " + O], y], [/(comodo_dragon)\/([\w\.]+)/i], [[f, /_/g, " "], y], [/(electron)\/([\w\.]+) safari/i, /(tesla)(?: qtcarbrowser|\/(20\d\d\.[-\w\.]+))/i, /m?(qqbrowser|baiduboxapp|2345Explorer)[\/ ]?([\w\.]+)/i], [f, y], [/(metasr)[\/ ]?([\w\.]+)/i, /(lbbrowser)/i, /\[(linkedin)app\]/i], [f], [/((?:fban\/fbios|fb_iab\/fb4a)(?!.+fbav)|;fbav\/([\w\.]+);)/i], [[f, K], y], [/(kakao(?:talk|story))[\/ ]([\w\.]+)/i, /(naver)\(.*?(\d+\.[\w\.]+).*\)/i, /safari (line)\/([\w\.]+)/i, /\b(line)\/([\w\.]+)\/iab/i, /(chromium|instagram)[\/ ]([-\w\.]+)/i], [f, y], [/\bgsa\/([\w\.]+) .*safari\//i], [y, [f, "GSA"]], [/musical_ly(?:.+app_?version\/|_)([\w\.]+)/i], [y, [f, "TikTok"]], [/headlesschrome(?:\/([\w\.]+)| )/i], [y, [f, P + " Headless"]], [/ wv\).+(chrome)\/([\w\.]+)/i], [[f, P + " WebView"], y], [/droid.+ version\/([\w\.]+)\b.+(?:mobile safari|safari)/i], [y, [f, "Android " + O]], [/(chrome|omniweb|arora|[tizenoka]{5} ?browser)\/v?([\w\.]+)/i], [f, y], [/version\/([\w\.\,]+) .*mobile\/\w+ (safari)/i], [y, [f, "Mobile Safari"]], [/version\/([\w(\.|\,)]+) .*(mobile ?safari|safari)/i], [y, f], [/webkit.+?(mobile ?safari|safari)(\/[\w\.]+)/i], [f, [y, Y, { "1.0": "/8", 1.2: "/1", 1.3: "/3", "2.0": "/412", "2.0.2": "/416", "2.0.3": "/417", "2.0.4": "/419", "?": "/" }]], [/(webkit|khtml)\/([\w\.]+)/i], [f, y], [/(navigator|netscape\d?)\/([-\w\.]+)/i], [[f, "Netscape"], y], [/mobile vr; rv:([\w\.]+)\).+firefox/i], [y, [f, T + " Reality"]], [/ekiohf.+(flow)\/([\w\.]+)/i, /(swiftfox)/i, /(icedragon|iceweasel|camino|chimera|fennec|maemo browser|minimo|conkeror|klar)[\/ ]?([\w\.\+]+)/i, /(seamonkey|k-meleon|icecat|iceape|firebird|phoenix|palemoon|basilisk|waterfox)\/([-\w\.]+)$/i, /(firefox)\/([\w\.]+)/i, /(mozilla)\/([\w\.]+) .+rv\:.+gecko\/\d+/i, /(polaris|lynx|dillo|icab|doris|amaya|w3m|netsurf|sleipnir|obigo|mosaic|(?:go|ice|up)[\. ]?browser)[-\/ ]?v?([\w\.]+)/i, /(links) \(([\w\.]+)/i, /panasonic;(viera)/i], [f, y], [/(cobalt)\/([\w\.]+)/i], [f, [y, /master.|lts./, ""]]], cpu: [[/(?:(amd|x(?:(?:86|64)[-_])?|wow|win)64)[;\)]/i], [[b, "amd64"]], [/(ia32(?=;))/i], [[b, G]], [/((?:i[346]|x)86)[;\)]/i], [[b, "ia32"]], [/\b(aarch64|arm(v?8e?l?|_?64))\b/i], [[b, "arm64"]], [/\b(arm(?:v[67])?ht?n?[fl]p?)\b/i], [[b, "armhf"]], [/windows (ce|mobile); ppc;/i], [[b, "arm"]], [/((?:ppc|powerpc)(?:64)?)(?: mac|;|\))/i], [[b, /ower/, "", G]], [/(sun4\w)[;\)]/i], [[b, "sparc"]], [/((?:avr32|ia64(?=;))|68k(?=\))|\barm(?=v(?:[1-7]|[5-7]1)l?|;|eabi)|(?=atmel )avr|(?:irix|mips|sparc)(?:64)?\b|pa-risc)/i], [[b, G]]], device: [[/\b(sch-i[89]0\d|shw-m380s|sm-[ptx]\w{2,4}|gt-[pn]\d{2,4}|sgh-t8[56]9|nexus 10)/i], [h, [g, D], [m, _]], [/\b((?:s[cgp]h|gt|sm)-\w+|sc[g-]?[\d]+a?|galaxy nexus)/i, /samsung[- ]([-\w]+)/i, /sec-(sgh\w+)/i], [h, [g, D], [m, v]], [/(?:\/|\()(ip(?:hone|od)[\w, ]*)(?:\/|;)/i], [h, [g, x], [m, v]], [/\((ipad);[-\w\),; ]+apple/i, /applecoremedia\/[\w\.]+ \((ipad)/i, /\b(ipad)\d\d?,\d\d?[;\]].+ios/i], [h, [g, x], [m, _]], [/(macintosh);/i], [h, [g, x]], [/\b(sh-?[altvz]?\d\d[a-ekm]?)/i], [h, [g, L], [m, v]], [/\b((?:ag[rs][23]?|bah2?|sht?|btv)-a?[lw]\d{2})\b(?!.+d\/s)/i], [h, [g, I], [m, _]], [/(?:huawei|honor)([-\w ]+)[;\)]/i, /\b(nexus 6p|\w{2,4}e?-[atu]?[ln][\dx][012359c][adn]?)\b(?!.+d\/s)/i], [h, [g, I], [m, v]], [/\b(poco[\w ]+)(?: bui|\))/i, /\b; (\w+) build\/hm\1/i, /\b(hm[-_ ]?note?[_ ]?(?:\d\w)?) bui/i, /\b(redmi[\-_ ]?(?:note|k)?[\w_ ]+)(?: bui|\))/i, /\b(mi[-_ ]?(?:a\d|one|one[_ ]plus|note lte|max|cc)?[_ ]?(?:\d?\w?)[_ ]?(?:plus|se|lite)?)(?: bui|\))/i], [[h, /_/g, " "], [g, U], [m, v]], [/\b(mi[-_ ]?(?:pad)(?:[\w_ ]+))(?: bui|\))/i], [[h, /_/g, " "], [g, U], [m, _]], [/; (\w+) bui.+ oppo/i, /\b(cph[12]\d{3}|p(?:af|c[al]|d\w|e[ar])[mt]\d0|x9007|a101op)\b/i], [h, [g, "OPPO"], [m, v]], [/vivo (\w+)(?: bui|\))/i, /\b(v[12]\d{3}\w?[at])(?: bui|;)/i], [h, [g, "Vivo"], [m, v]], [/\b(rmx[12]\d{3})(?: bui|;|\))/i], [h, [g, "Realme"], [m, v]], [/\b(milestone|droid(?:[2-4x]| (?:bionic|x2|pro|razr))?:?( 4g)?)\b[\w ]+build\//i, /\bmot(?:orola)?[- ](\w*)/i, /((?:moto[\w\(\) ]+|xt\d{3,4}|nexus 6)(?= bui|\)))/i], [h, [g, N], [m, v]], [/\b(mz60\d|xoom[2 ]{0,2}) build\//i], [h, [g, N], [m, _]], [/((?=lg)?[vl]k\-?\d{3}) bui| 3\.[-\w; ]{10}lg?-([06cv9]{3,4})/i], [h, [g, "LG"], [m, _]], [/(lm(?:-?f100[nv]?|-[\w\.]+)(?= bui|\))|nexus [45])/i, /\blg[-e;\/ ]+((?!browser|netcast|android tv)\w+)/i, /\blg-?([\d\w]+) bui/i], [h, [g, "LG"], [m, v]], [/(ideatab[-\w ]+)/i, /lenovo ?(s[56]000[-\w]+|tab(?:[\w ]+)|yt[-\d\w]{6}|tb[-\d\w]{6})/i], [h, [g, "Lenovo"], [m, _]], [/(?:maemo|nokia).*(n900|lumia \d+)/i, /nokia[-_ ]?([-\w\.]*)/i], [[h, /_/g, " "], [g, "Nokia"], [m, v]], [/(pixel c)\b/i], [h, [g, j], [m, _]], [/droid.+; (pixel[\daxl ]{0,6})(?: bui|\))/i], [h, [g, j], [m, v]], [/droid.+ (a?\d[0-2]{2}so|[c-g]\d{4}|so[-gl]\w+|xq-a\w[4-7][12])(?= bui|\).+chrome\/(?![1-6]{0,1}\d\.))/i], [h, [g, H], [m, v]], [/sony tablet [ps]/i, /\b(?:sony)?sgp\w+(?: bui|\))/i], [[h, "Xperia Tablet"], [g, H], [m, _]], [/ (kb2005|in20[12]5|be20[12][59])\b/i, /(?:one)?(?:plus)? (a\d0\d\d)(?: b|\))/i], [h, [g, "OnePlus"], [m, v]], [/(alexa)webm/i, /(kf[a-z]{2}wi|aeo[c-r]{2})( bui|\))/i, /(kf[a-z]+)( bui|\)).+silk\//i], [h, [g, k], [m, _]], [/((?:sd|kf)[0349hijorstuw]+)( bui|\)).+silk\//i], [[h, /(.+)/g, "Fire Phone $1"], [g, k], [m, v]], [/(playbook);[-\w\),; ]+(rim)/i], [h, g, [m, _]], [/\b((?:bb[a-f]|st[hv])100-\d)/i, /\(bb10; (\w+)/i], [h, [g, C], [m, v]], [/(?:\b|asus_)(transfo[prime ]{4,10} \w+|eeepc|slider \w+|nexus 7|padfone|p00[cj])/i], [h, [g, R], [m, _]], [/ (z[bes]6[027][012][km][ls]|zenfone \d\w?)\b/i], [h, [g, R], [m, v]], [/(nexus 9)/i], [h, [g, "HTC"], [m, _]], [/(htc)[-;_ ]{1,2}([\w ]+(?=\)| bui)|\w+)/i, /(zte)[- ]([\w ]+?)(?: bui|\/|\))/i, /(alcatel|geeksphone|nexian|panasonic(?!(?:;|\.))|sony(?!-bra))[-_ ]?([-\w]*)/i], [g, [h, /_/g, " "], [m, v]], [/droid.+; ([ab][1-7]-?[0178a]\d\d?)/i], [h, [g, "Acer"], [m, _]], [/droid.+; (m[1-5] note) bui/i, /\bmz-([-\w]{2,})/i], [h, [g, "Meizu"], [m, v]], [/(blackberry|benq|palm(?=\-)|sonyericsson|acer|asus|dell|meizu|motorola|polytron)[-_ ]?([-\w]*)/i, /(hp) ([\w ]+\w)/i, /(asus)-?(\w+)/i, /(microsoft); (lumia[\w ]+)/i, /(lenovo)[-_ ]?([-\w]+)/i, /(jolla)/i, /(oppo) ?([\w ]+) bui/i], [g, h, [m, v]], [/(kobo)\s(ereader|touch)/i, /(archos) (gamepad2?)/i, /(hp).+(touchpad(?!.+tablet)|tablet)/i, /(kindle)\/([\w\.]+)/i, /(nook)[\w ]+build\/(\w+)/i, /(dell) (strea[kpr\d ]*[\dko])/i, /(le[- ]+pan)[- ]+(\w{1,9}) bui/i, /(trinity)[- ]*(t\d{3}) bui/i, /(gigaset)[- ]+(q\w{1,9}) bui/i, /(vodafone) ([\w ]+)(?:\)| bui)/i], [g, h, [m, _]], [/(surface duo)/i], [h, [g, $], [m, _]], [/droid [\d\.]+; (fp\du?)(?: b|\))/i], [h, [g, "Fairphone"], [m, v]], [/(u304aa)/i], [h, [g, "AT&T"], [m, v]], [/\bsie-(\w*)/i], [h, [g, "Siemens"], [m, v]], [/\b(rct\w+) b/i], [h, [g, "RCA"], [m, _]], [/\b(venue[\d ]{2,7}) b/i], [h, [g, "Dell"], [m, _]], [/\b(q(?:mv|ta)\w+) b/i], [h, [g, "Verizon"], [m, _]], [/\b(?:barnes[& ]+noble |bn[rt])([\w\+ ]*) b/i], [h, [g, "Barnes & Noble"], [m, _]], [/\b(tm\d{3}\w+) b/i], [h, [g, "NuVision"], [m, _]], [/\b(k88) b/i], [h, [g, "ZTE"], [m, _]], [/\b(nx\d{3}j) b/i], [h, [g, "ZTE"], [m, v]], [/\b(gen\d{3}) b.+49h/i], [h, [g, "Swiss"], [m, v]], [/\b(zur\d{3}) b/i], [h, [g, "Swiss"], [m, _]], [/\b((zeki)?tb.*\b) b/i], [h, [g, "Zeki"], [m, _]], [/\b([yr]\d{2}) b/i, /\b(dragon[- ]+touch |dt)(\w{5}) b/i], [[g, "Dragon Touch"], h, [m, _]], [/\b(ns-?\w{0,9}) b/i], [h, [g, "Insignia"], [m, _]], [/\b((nxa|next)-?\w{0,9}) b/i], [h, [g, "NextBook"], [m, _]], [/\b(xtreme\_)?(v(1[045]|2[015]|[3469]0|7[05])) b/i], [[g, "Voice"], h, [m, v]], [/\b(lvtel\-)?(v1[12]) b/i], [[g, "LvTel"], h, [m, v]], [/\b(ph-1) /i], [h, [g, "Essential"], [m, v]], [/\b(v(100md|700na|7011|917g).*\b) b/i], [h, [g, "Envizen"], [m, _]], [/\b(trio[-\w\. ]+) b/i], [h, [g, "MachSpeed"], [m, _]], [/\btu_(1491) b/i], [h, [g, "Rotor"], [m, _]], [/(shield[\w ]+) b/i], [h, [g, "Nvidia"], [m, _]], [/(sprint) (\w+)/i], [g, h, [m, v]], [/(kin\.[onetw]{3})/i], [[h, /\./g, " "], [g, $], [m, v]], [/droid.+; (cc6666?|et5[16]|mc[239][23]x?|vc8[03]x?)\)/i], [h, [g, q], [m, _]], [/droid.+; (ec30|ps20|tc[2-8]\d[kx])\)/i], [h, [g, q], [m, v]], [/smart-tv.+(samsung)/i], [g, [m, S]], [/hbbtv.+maple;(\d+)/i], [[h, /^/, "SmartTV"], [g, D], [m, S]], [/(nux; netcast.+smarttv|lg (netcast\.tv-201\d|android tv))/i], [[g, "LG"], [m, S]], [/(apple) ?tv/i], [g, [h, x + " TV"], [m, S]], [/crkey/i], [[h, P + "cast"], [g, j], [m, S]], [/droid.+aft(\w)( bui|\))/i], [h, [g, k], [m, S]], [/\(dtv[\);].+(aquos)/i, /(aquos-tv[\w ]+)\)/i], [h, [g, L], [m, S]], [/(bravia[\w ]+)( bui|\))/i], [h, [g, H], [m, S]], [/(mitv-\w{5}) bui/i], [h, [g, U], [m, S]], [/Hbbtv.*(technisat) (.*);/i], [g, h, [m, S]], [/\b(roku)[\dx]*[\)\/]((?:dvp-)?[\d\.]*)/i, /hbbtv\/\d+\.\d+\.\d+ +\([\w\+ ]*; *([\w\d][^;]*);([^;]*)/i], [[g, V], [h, V], [m, S]], [/\b(android tv|smart[- ]?tv|opera tv|tv; rv:)\b/i], [[m, S]], [/(ouya)/i, /(nintendo) ([wids3utch]+)/i], [g, h, [m, w]], [/droid.+; (shield) bui/i], [h, [g, "Nvidia"], [m, w]], [/(playstation [345portablevi]+)/i], [h, [g, H], [m, w]], [/\b(xbox(?: one)?(?!; xbox))[\); ]/i], [h, [g, $], [m, w]], [/((pebble))app/i], [g, h, [m, E]], [/(watch)(?: ?os[,\/]|\d,\d\/)[\d\.]+/i], [h, [g, x], [m, E]], [/droid.+; (glass) \d/i], [h, [g, j], [m, E]], [/droid.+; (wt63?0{2,3})\)/i], [h, [g, q], [m, E]], [/(quest( 2| pro)?)/i], [h, [g, K], [m, E]], [/(tesla)(?: qtcarbrowser|\/[-\w\.]+)/i], [g, [m, A]], [/(aeobc)\b/i], [h, [g, k], [m, A]], [/droid .+?; ([^;]+?)(?: bui|\) applew).+? mobile safari/i], [h, [m, v]], [/droid .+?; ([^;]+?)(?: bui|\) applew).+?(?! mobile) safari/i], [h, [m, _]], [/\b((tablet|tab)[;\/]|focus\/\d(?!.+mobile))/i], [[m, _]], [/(phone|mobile(?:[;\/]| [ \w\/\.]*safari)|pda(?=.+windows ce))/i], [[m, v]], [/(android[-\w\. ]{0,9});.+buil/i], [h, [g, "Generic"]]], engine: [[/windows.+ edge\/([\w\.]+)/i], [y, [f, "EdgeHTML"]], [/webkit\/537\.36.+chrome\/(?!27)([\w\.]+)/i], [y, [f, "Blink"]], [/(presto)\/([\w\.]+)/i, /(webkit|trident|netfront|netsurf|amaya|lynx|w3m|goanna)\/([\w\.]+)/i, /ekioh(flow)\/([\w\.]+)/i, /(khtml|tasman|links)[\/ ]\(?([\w\.]+)/i, /(icab)[\/ ]([23]\.[\d\.]+)/i, /\b(libweb)/i], [f, y], [/rv\:([\w\.]{1,9})\b.+(gecko)/i], [y, f]], os: [[/microsoft (windows) (vista|xp)/i], [f, y], [/(windows) nt 6\.2; (arm)/i, /(windows (?:phone(?: os)?|mobile))[\/ ]?([\d\.\w ]*)/i, /(windows)[\/ ]?([ntce\d\. ]+\w)(?!.+xbox)/i], [f, [y, Y, Z]], [/(win(?=3|9|n)|win 9x )([nt\d\.]+)/i], [[f, "Windows"], [y, Y, Z]], [/ip[honead]{2,4}\b(?:.*os ([\w]+) like mac|; opera)/i, /ios;fbsv\/([\d\.]+)/i, /cfnetwork\/.+darwin/i], [[y, /_/g, "."], [f, "iOS"]], [/(mac os x) ?([\w\. ]*)/i, /(macintosh|mac_powerpc\b)(?!.+haiku)/i], [[f, F], [y, /_/g, "."]], [/droid ([\w\.]+)\b.+(android[- ]x86|harmonyos)/i], [y, f], [/(android|webos|qnx|bada|rim tablet os|maemo|meego|sailfish)[-\/ ]?([\w\.]*)/i, /(blackberry)\w*\/([\w\.]*)/i, /(tizen|kaios)[\/ ]([\w\.]+)/i, /\((series40);/i], [f, y], [/\(bb(10);/i], [y, [f, C]], [/(?:symbian ?os|symbos|s60(?=;)|series60)[-\/ ]?([\w\.]*)/i], [y, [f, "Symbian"]], [/mozilla\/[\d\.]+ \((?:mobile|tablet|tv|mobile; [\w ]+); rv:.+ gecko\/([\w\.]+)/i], [y, [f, T + " OS"]], [/web0s;.+rt(tv)/i, /\b(?:hp)?wos(?:browser)?\/([\w\.]+)/i], [y, [f, "webOS"]], [/watch(?: ?os[,\/]|\d,\d\/)([\d\.]+)/i], [y, [f, "watchOS"]], [/crkey\/([\d\.]+)/i], [y, [f, P + "cast"]], [/(cros) [\w]+(?:\)| ([\w\.]+)\b)/i], [[f, W], y], [/panasonic;(viera)/i, /(netrange)mmh/i, /(nettv)\/(\d+\.[\w\.]+)/i, /(nintendo|playstation) ([wids345portablevuch]+)/i, /(xbox); +xbox ([^\);]+)/i, /\b(joli|palm)\b ?(?:os)?\/?([\w\.]*)/i, /(mint)[\/\(\) ]?(\w*)/i, /(mageia|vectorlinux)[; ]/i, /([kxln]?ubuntu|debian|suse|opensuse|gentoo|arch(?= linux)|slackware|fedora|mandriva|centos|pclinuxos|red ?hat|zenwalk|linpus|raspbian|plan 9|minix|risc os|contiki|deepin|manjaro|elementary os|sabayon|linspire)(?: gnu\/linux)?(?: enterprise)?(?:[- ]linux)?(?:-gnu)?[-\/ ]?(?!chrom|package)([-\w\.]*)/i, /(hurd|linux) ?([\w\.]*)/i, /(gnu) ?([\w\.]*)/i, /\b([-frentopcghs]{0,5}bsd|dragonfly)[\/ ]?(?!amd|[ix346]{1,2}86)([\w\.]*)/i, /(haiku) (\w+)/i], [f, y], [/(sunos) ?([\w\.\d]*)/i], [[f, "Solaris"], y], [/((?:open)?solaris)[-\/ ]?([\w\.]*)/i, /(aix) ((\d)(?=\.|\)| )[\w\.])*/i, /\b(beos|os\/2|amigaos|morphos|openvms|fuchsia|hp-ux|serenityos)/i, /(unix) ?([\w\.]*)/i], [f, y]] }, ee = function(e2, t2) {
              if (typeof e2 === u && (t2 = e2, e2 = o2), !(this instanceof ee)) return new ee(e2, t2).getResult();
              var r2 = typeof s2 !== c && s2.navigator ? s2.navigator : o2, n2 = e2 || (r2 && r2.userAgent ? r2.userAgent : ""), a3 = r2 && r2.userAgentData ? r2.userAgentData : o2, i3 = t2 ? J(Q, t2) : Q, w2 = r2 && r2.userAgent == n2;
              return this.getBrowser = function() {
                var e3, t3 = {};
                return t3[f] = o2, t3[y] = o2, X.call(t3, n2, i3.browser), t3[p] = typeof (e3 = t3[y]) === d ? e3.replace(/[^\d\.]/g, "").split(".")[0] : o2, w2 && r2 && r2.brave && typeof r2.brave.isBrave == l && (t3[f] = "Brave"), t3;
              }, this.getCPU = function() {
                var e3 = {};
                return e3[b] = o2, X.call(e3, n2, i3.cpu), e3;
              }, this.getDevice = function() {
                var e3 = {};
                return e3[g] = o2, e3[h] = o2, e3[m] = o2, X.call(e3, n2, i3.device), w2 && !e3[m] && a3 && a3.mobile && (e3[m] = v), w2 && "Macintosh" == e3[h] && r2 && typeof r2.standalone !== c && r2.maxTouchPoints && r2.maxTouchPoints > 2 && (e3[h] = "iPad", e3[m] = _), e3;
              }, this.getEngine = function() {
                var e3 = {};
                return e3[f] = o2, e3[y] = o2, X.call(e3, n2, i3.engine), e3;
              }, this.getOS = function() {
                var e3 = {};
                return e3[f] = o2, e3[y] = o2, X.call(e3, n2, i3.os), w2 && !e3[f] && a3 && "Unknown" != a3.platform && (e3[f] = a3.platform.replace(/chrome os/i, W).replace(/macos/i, F)), e3;
              }, this.getResult = function() {
                return { ua: this.getUA(), browser: this.getBrowser(), engine: this.getEngine(), os: this.getOS(), device: this.getDevice(), cpu: this.getCPU() };
              }, this.getUA = function() {
                return n2;
              }, this.setUA = function(e3) {
                return n2 = typeof e3 === d && e3.length > 350 ? V(e3, 350) : e3, this;
              }, this.setUA(n2), this;
            };
            ee.VERSION = "1.0.35", ee.BROWSER = z([f, y, p]), ee.CPU = z([b]), ee.DEVICE = z([h, g, m, w, v, S, _, E, A]), ee.ENGINE = ee.OS = z([f, y]), typeof i2 !== c ? (a2.exports && (i2 = a2.exports = ee), i2.UAParser = ee) : r.amdO ? void 0 !== (n = function() {
              return ee;
            }.call(t, r, t, e)) && (e.exports = n) : typeof s2 !== c && (s2.UAParser = ee);
            var et = typeof s2 !== c && (s2.jQuery || s2.Zepto);
            if (et && !et.ua) {
              var er = new ee();
              et.ua = er.getResult(), et.ua.get = function() {
                return er.getUA();
              }, et.ua.set = function(e2) {
                er.setUA(e2);
                var t2 = er.getResult();
                for (var r2 in t2) et.ua[r2] = t2[r2];
              };
            }
          }("object" == typeof window ? window : this);
        } }, i = {};
        function s(e2) {
          var t2 = i[e2];
          if (void 0 !== t2) return t2.exports;
          var r2 = i[e2] = { exports: {} }, n2 = true;
          try {
            a[e2].call(r2.exports, r2, r2.exports, s), n2 = false;
          } finally {
            n2 && delete i[e2];
          }
          return r2.exports;
        }
        s.ab = "//";
        var o = s(226);
        e.exports = o;
      })();
    }, 6831: (e, t, r) => {
      "use strict";
      r.r(t), r.d(t, { cookies: () => g, draftMode: () => y, headers: () => m });
      var n = r(8009), a = r(7862), i = r(938), s = r(5425), o = r(9452), l = r(5023);
      class c extends Error {
        constructor(e2) {
          super("Dynamic server usage: " + e2), this.description = e2, this.digest = "DYNAMIC_SERVER_USAGE";
        }
      }
      class u extends Error {
        constructor(...e2) {
          super(...e2), this.code = "NEXT_STATIC_GEN_BAILOUT";
        }
      }
      let d = "function" == typeof l.unstable_postpone;
      function p(e2, t2) {
        let r2 = new URL(e2.urlPathname, "http://n").pathname;
        if (e2.isUnstableCacheCallback) throw Error(`Route ${r2} used "${t2}" inside a function cached with "unstable_cache(...)". Accessing Dynamic data sources inside a cache scope is not supported. If you need this data inside a cached function use "${t2}" outside of the cached function and pass the required dynamic data in as an argument. See more info here: https://nextjs.org/docs/app/api-reference/functions/unstable_cache`);
        if (e2.dynamicShouldError) throw new u(`Route ${r2} with \`dynamic = "error"\` couldn't be rendered statically because it used \`${t2}\`. See more info here: https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic#dynamic-rendering`);
        if (e2.prerenderState) !function(e3, t3, r3) {
          !function() {
            if (!d) throw Error("Invariant: React.unstable_postpone is not defined. This suggests the wrong version of React was loaded. This is a bug in Next.js");
          }();
          let n2 = `Route ${r3} needs to bail out of prerendering at this point because it used ${t3}. React throws this special object to indicate where. It should not be caught by your own try/catch. Learn more: https://nextjs.org/docs/messages/ppr-caught-error`;
          e3.dynamicAccesses.push({ stack: e3.isDebugSkeleton ? Error().stack : void 0, expression: t3 }), l.unstable_postpone(n2);
        }(e2.prerenderState, t2, r2);
        else if (e2.revalidate = 0, e2.isStaticGeneration) {
          let n2 = new c(`Route ${r2} couldn't be rendered statically because it used \`${t2}\`. See more info here: https://nextjs.org/docs/messages/dynamic-server-error`);
          throw e2.dynamicUsageDescription = t2, e2.dynamicUsageStack = n2.stack, n2;
        }
      }
      class h {
        get isEnabled() {
          return this._provider.isEnabled;
        }
        enable() {
          let e2 = o.A.getStore();
          return e2 && p(e2, "draftMode().enable()"), this._provider.enable();
        }
        disable() {
          let e2 = o.A.getStore();
          return e2 && p(e2, "draftMode().disable()"), this._provider.disable();
        }
        constructor(e2) {
          this._provider = e2;
        }
      }
      var f = r(1053);
      function m() {
        let e2 = "headers", t2 = o.A.getStore();
        if (t2) {
          if (t2.forceStatic) return a.h.seal(new Headers({}));
          p(t2, e2);
        }
        return (0, f.F)(e2).headers;
      }
      function g() {
        let e2 = "cookies", t2 = o.A.getStore();
        if (t2) {
          if (t2.forceStatic) return n.Qb.seal(new i.qC(new Headers({})));
          p(t2, e2);
        }
        let r2 = (0, f.F)(e2), a2 = s.W.getStore();
        return (null == a2 ? void 0 : a2.isAction) || (null == a2 ? void 0 : a2.isAppRoute) ? r2.mutableCookies : r2.cookies;
      }
      function y() {
        return new h((0, f.F)("draftMode").draftMode);
      }
    }, 1119: (e, t, r) => {
      "use strict";
      r.r(t), r.d(t, { ReadonlyURLSearchParams: () => v, RedirectType: () => a, ServerInsertedHTMLContext: () => _, notFound: () => b, permanentRedirect: () => g, redirect: () => m, useParams: () => x, usePathname: () => A, useRouter: () => k, useSearchParams: () => E, useSelectedLayoutSegment: () => C, useSelectedLayoutSegments: () => R, useServerInsertedHTML: () => S });
      var n, a, i = r(5023);
      let s = i.createContext(null), o = i.createContext(null), l = (0, i.createContext)(null), c = (0, i.createContext)(null), u = (0, i.createContext)(null);
      var d = r(1053), p = r(5425);
      !function(e2) {
        e2[e2.SeeOther = 303] = "SeeOther", e2[e2.TemporaryRedirect = 307] = "TemporaryRedirect", e2[e2.PermanentRedirect = 308] = "PermanentRedirect";
      }(n || (n = {}));
      let h = "NEXT_REDIRECT";
      function f(e2, t2, r2) {
        void 0 === r2 && (r2 = n.TemporaryRedirect);
        let a2 = Error(h);
        a2.digest = h + ";" + t2 + ";" + e2 + ";" + r2 + ";";
        let i2 = d.O.getStore();
        return i2 && (a2.mutableCookies = i2.mutableCookies), a2;
      }
      function m(e2, t2) {
        void 0 === t2 && (t2 = "replace");
        let r2 = p.W.getStore();
        throw f(e2, t2, (null == r2 ? void 0 : r2.isAction) ? n.SeeOther : n.TemporaryRedirect);
      }
      function g(e2, t2) {
        void 0 === t2 && (t2 = "replace");
        let r2 = p.W.getStore();
        throw f(e2, t2, (null == r2 ? void 0 : r2.isAction) ? n.SeeOther : n.PermanentRedirect);
      }
      !function(e2) {
        e2.push = "push", e2.replace = "replace";
      }(a || (a = {}));
      let y = "NEXT_NOT_FOUND";
      function b() {
        let e2 = Error(y);
        throw e2.digest = y, e2;
      }
      class w extends Error {
        constructor() {
          super("Method unavailable on `ReadonlyURLSearchParams`. Read more: https://nextjs.org/docs/app/api-reference/functions/use-search-params#updating-searchparams");
        }
      }
      class v extends URLSearchParams {
        append() {
          throw new w();
        }
        delete() {
          throw new w();
        }
        set() {
          throw new w();
        }
        sort() {
          throw new w();
        }
      }
      let _ = i.createContext(null);
      function S(e2) {
        let t2 = (0, i.useContext)(_);
        t2 && t2(e2);
      }
      function E() {
        let e2 = (0, i.useContext)(l), t2 = (0, i.useMemo)(() => e2 ? new v(e2) : null, [e2]);
        {
          let { bailoutToClientRendering: e3 } = r(2912);
          e3("useSearchParams()");
        }
        return t2;
      }
      function A() {
        return (0, i.useContext)(c);
      }
      function k() {
        let e2 = (0, i.useContext)(s);
        if (null === e2) throw Error("invariant expected app router to be mounted");
        return e2;
      }
      function x() {
        return (0, i.useContext)(u);
      }
      function R(e2) {
        void 0 === e2 && (e2 = "children");
        let t2 = (0, i.useContext)(o);
        return t2 ? function e3(t3, r2, n2, a2) {
          var i2, s2;
          let o2;
          if (void 0 === n2 && (n2 = true), void 0 === a2 && (a2 = []), n2) o2 = t3[1][r2];
          else {
            let e4 = t3[1];
            o2 = null != (i2 = e4.children) ? i2 : Object.values(e4)[0];
          }
          if (!o2) return a2;
          let l2 = Array.isArray(s2 = o2[0]) ? s2[1] : s2;
          return !l2 || l2.startsWith("__PAGE__") ? a2 : (a2.push(l2), e3(o2, r2, false, a2));
        }(t2.tree, e2) : null;
      }
      function C(e2) {
        void 0 === e2 && (e2 = "children");
        let t2 = R(e2);
        if (!t2 || 0 === t2.length) return null;
        let r2 = "children" === e2 ? t2[0] : t2[t2.length - 1];
        return "__DEFAULT__" === r2 ? null : r2;
      }
    }, 4635: (e, t, r) => {
      "use strict";
      function n() {
        throw Error('ImageResponse moved from "next/server" to "next/og" since Next.js 14, please import from "next/og" instead');
      }
      r.r(t), r.d(t, { ImageResponse: () => n, NextRequest: () => a.I, NextResponse: () => i.x, URLPattern: () => u, userAgent: () => c, userAgentFromString: () => l });
      var a = r(1669), i = r(8241), s = r(340), o = r.n(s);
      function l(e2) {
        return { ...o()(e2), isBot: void 0 !== e2 && /Googlebot|Mediapartners-Google|AdsBot-Google|googleweblight|Storebot-Google|Google-PageRenderer|Google-InspectionTool|Bingbot|BingPreview|Slurp|DuckDuckBot|baiduspider|yandex|sogou|LinkedInBot|bitlybot|tumblr|vkShare|quora link preview|facebookexternalhit|facebookcatalog|Twitterbot|applebot|redditbot|Slackbot|Discordbot|WhatsApp|SkypeUriPreview|ia_archiver/i.test(e2) };
      }
      function c({ headers: e2 }) {
        return l(e2.get("user-agent") || void 0);
      }
      let u = "undefined" == typeof URLPattern ? void 0 : URLPattern;
    }, 5425: (e, t, r) => {
      "use strict";
      r.d(t, { W: () => n });
      let n = (0, r(5228).P)();
    }, 2912: (e, t, r) => {
      "use strict";
      r.r(t), r.d(t, { bailoutToClientRendering: () => i });
      class n extends Error {
        constructor(e2) {
          super("Bail out to client-side rendering: " + e2), this.reason = e2, this.digest = "BAILOUT_TO_CLIENT_SIDE_RENDERING";
        }
      }
      var a = r(9452);
      function i(e2) {
        let t2 = a.A.getStore();
        if ((null == t2 || !t2.forceStatic) && (null == t2 ? void 0 : t2.isStaticGeneration)) throw new n(e2);
      }
    }, 1053: (e, t, r) => {
      "use strict";
      r.d(t, { F: () => a, O: () => n });
      let n = (0, r(5228).P)();
      function a(e2) {
        let t2 = n.getStore();
        if (t2) return t2;
        throw Error("`" + e2 + "` was called outside a request scope. Read more: https://nextjs.org/docs/messages/next-dynamic-api-wrong-context");
      }
    }, 9452: (e, t, r) => {
      "use strict";
      r.d(t, { A: () => n });
      let n = (0, r(5228).P)();
    }, 300: (e, t, r) => {
      "use strict";
      r.d(t, { Qq: () => s, dN: () => n, u7: () => a, y3: () => i });
      let n = "nxtP", a = "nxtI", i = "x-prerender-revalidate", s = "x-prerender-revalidate-if-generated", o = { shared: "shared", reactServerComponents: "rsc", serverSideRendering: "ssr", actionBrowser: "action-browser", api: "api", middleware: "middleware", instrument: "instrument", edgeAsset: "edge-asset", appPagesBrowser: "app-pages-browser", appMetadataRoute: "app-metadata-route", appRouteHandler: "app-route-handler" };
      ({ ...o, GROUP: { serverOnly: [o.reactServerComponents, o.actionBrowser, o.appMetadataRoute, o.appRouteHandler, o.instrument], clientOnly: [o.serverSideRendering, o.appPagesBrowser], nonClientServerTarget: [o.middleware, o.api], app: [o.reactServerComponents, o.actionBrowser, o.appMetadataRoute, o.appRouteHandler, o.serverSideRendering, o.appPagesBrowser, o.shared, o.instrument] } });
    }, 6416: (e, t, r) => {
      "use strict";
      r.d(t, { Y5: () => i, cR: () => a, qJ: () => n });
      class n extends Error {
        constructor({ page: e2 }) {
          super(`The middleware "${e2}" accepts an async API directly with the form:
  
  export function middleware(request, event) {
    return NextResponse.redirect('/new-location')
  }
  
  Read more: https://nextjs.org/docs/messages/middleware-new-signature
  `);
        }
      }
      class a extends Error {
        constructor() {
          super(`The request.page has been deprecated in favour of \`URLPattern\`.
  Read more: https://nextjs.org/docs/messages/middleware-request-page
  `);
        }
      }
      class i extends Error {
        constructor() {
          super(`The request.ua has been removed in favour of \`userAgent\` function.
  Read more: https://nextjs.org/docs/messages/middleware-parse-user-agent
  `);
        }
      }
    }, 9718: (e, t, r) => {
      "use strict";
      function n(e2) {
        return e2.replace(/\/$/, "") || "/";
      }
      function a(e2) {
        let t2 = e2.indexOf("#"), r2 = e2.indexOf("?"), n2 = r2 > -1 && (t2 < 0 || r2 < t2);
        return n2 || t2 > -1 ? { pathname: e2.substring(0, n2 ? r2 : t2), query: n2 ? e2.substring(r2, t2 > -1 ? t2 : void 0) : "", hash: t2 > -1 ? e2.slice(t2) : "" } : { pathname: e2, query: "", hash: "" };
      }
      function i(e2, t2) {
        if (!e2.startsWith("/") || !t2) return e2;
        let { pathname: r2, query: n2, hash: i2 } = a(e2);
        return "" + t2 + r2 + n2 + i2;
      }
      function s(e2, t2) {
        if (!e2.startsWith("/") || !t2) return e2;
        let { pathname: r2, query: n2, hash: i2 } = a(e2);
        return "" + r2 + t2 + n2 + i2;
      }
      function o(e2, t2) {
        if ("string" != typeof e2) return false;
        let { pathname: r2 } = a(e2);
        return r2 === t2 || r2.startsWith(t2 + "/");
      }
      function l(e2, t2) {
        let r2;
        let n2 = e2.split("/");
        return (t2 || []).some((t3) => !!n2[1] && n2[1].toLowerCase() === t3.toLowerCase() && (r2 = t3, n2.splice(1, 1), e2 = n2.join("/") || "/", true)), { pathname: e2, detectedLocale: r2 };
      }
      r.d(t, { c: () => p });
      let c = /(?!^https?:\/\/)(127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}|\[::1\]|localhost)/;
      function u(e2, t2) {
        return new URL(String(e2).replace(c, "localhost"), t2 && String(t2).replace(c, "localhost"));
      }
      let d = Symbol("NextURLInternal");
      class p {
        constructor(e2, t2, r2) {
          let n2, a2;
          "object" == typeof t2 && "pathname" in t2 || "string" == typeof t2 ? (n2 = t2, a2 = r2 || {}) : a2 = r2 || t2 || {}, this[d] = { url: u(e2, n2 ?? a2.base), options: a2, basePath: "" }, this.analyze();
        }
        analyze() {
          var e2, t2, r2, n2, a2;
          let i2 = function(e3, t3) {
            var r3, n3;
            let { basePath: a3, i18n: i3, trailingSlash: s3 } = null != (r3 = t3.nextConfig) ? r3 : {}, c3 = { pathname: e3, trailingSlash: "/" !== e3 ? e3.endsWith("/") : s3 };
            a3 && o(c3.pathname, a3) && (c3.pathname = function(e4, t4) {
              if (!o(e4, t4)) return e4;
              let r4 = e4.slice(t4.length);
              return r4.startsWith("/") ? r4 : "/" + r4;
            }(c3.pathname, a3), c3.basePath = a3);
            let u2 = c3.pathname;
            if (c3.pathname.startsWith("/_next/data/") && c3.pathname.endsWith(".json")) {
              let e4 = c3.pathname.replace(/^\/_next\/data\//, "").replace(/\.json$/, "").split("/"), r4 = e4[0];
              c3.buildId = r4, u2 = "index" !== e4[1] ? "/" + e4.slice(1).join("/") : "/", true === t3.parseData && (c3.pathname = u2);
            }
            if (i3) {
              let e4 = t3.i18nProvider ? t3.i18nProvider.analyze(c3.pathname) : l(c3.pathname, i3.locales);
              c3.locale = e4.detectedLocale, c3.pathname = null != (n3 = e4.pathname) ? n3 : c3.pathname, !e4.detectedLocale && c3.buildId && (e4 = t3.i18nProvider ? t3.i18nProvider.analyze(u2) : l(u2, i3.locales)).detectedLocale && (c3.locale = e4.detectedLocale);
            }
            return c3;
          }(this[d].url.pathname, { nextConfig: this[d].options.nextConfig, parseData: false, i18nProvider: this[d].options.i18nProvider }), s2 = function(e3, t3) {
            let r3;
            if ((null == t3 ? void 0 : t3.host) && !Array.isArray(t3.host)) r3 = t3.host.toString().split(":", 1)[0];
            else {
              if (!e3.hostname) return;
              r3 = e3.hostname;
            }
            return r3.toLowerCase();
          }(this[d].url, this[d].options.headers);
          this[d].domainLocale = this[d].options.i18nProvider ? this[d].options.i18nProvider.detectDomainLocale(s2) : function(e3, t3, r3) {
            if (e3) for (let i3 of (r3 && (r3 = r3.toLowerCase()), e3)) {
              var n3, a3;
              if (t3 === (null == (n3 = i3.domain) ? void 0 : n3.split(":", 1)[0].toLowerCase()) || r3 === i3.defaultLocale.toLowerCase() || (null == (a3 = i3.locales) ? void 0 : a3.some((e4) => e4.toLowerCase() === r3))) return i3;
            }
          }(null == (t2 = this[d].options.nextConfig) ? void 0 : null == (e2 = t2.i18n) ? void 0 : e2.domains, s2);
          let c2 = (null == (r2 = this[d].domainLocale) ? void 0 : r2.defaultLocale) || (null == (a2 = this[d].options.nextConfig) ? void 0 : null == (n2 = a2.i18n) ? void 0 : n2.defaultLocale);
          this[d].url.pathname = i2.pathname, this[d].defaultLocale = c2, this[d].basePath = i2.basePath ?? "", this[d].buildId = i2.buildId, this[d].locale = i2.locale ?? c2, this[d].trailingSlash = i2.trailingSlash;
        }
        formatPathname() {
          var e2;
          let t2;
          return t2 = function(e3, t3, r2, n2) {
            if (!t3 || t3 === r2) return e3;
            let a2 = e3.toLowerCase();
            return !n2 && (o(a2, "/api") || o(a2, "/" + t3.toLowerCase())) ? e3 : i(e3, "/" + t3);
          }((e2 = { basePath: this[d].basePath, buildId: this[d].buildId, defaultLocale: this[d].options.forceLocale ? void 0 : this[d].defaultLocale, locale: this[d].locale, pathname: this[d].url.pathname, trailingSlash: this[d].trailingSlash }).pathname, e2.locale, e2.buildId ? void 0 : e2.defaultLocale, e2.ignorePrefix), (e2.buildId || !e2.trailingSlash) && (t2 = n(t2)), e2.buildId && (t2 = s(i(t2, "/_next/data/" + e2.buildId), "/" === e2.pathname ? "index.json" : ".json")), t2 = i(t2, e2.basePath), !e2.buildId && e2.trailingSlash ? t2.endsWith("/") ? t2 : s(t2, "/") : n(t2);
        }
        formatSearch() {
          return this[d].url.search;
        }
        get buildId() {
          return this[d].buildId;
        }
        set buildId(e2) {
          this[d].buildId = e2;
        }
        get locale() {
          return this[d].locale ?? "";
        }
        set locale(e2) {
          var t2, r2;
          if (!this[d].locale || !(null == (r2 = this[d].options.nextConfig) ? void 0 : null == (t2 = r2.i18n) ? void 0 : t2.locales.includes(e2))) throw TypeError(`The NextURL configuration includes no locale "${e2}"`);
          this[d].locale = e2;
        }
        get defaultLocale() {
          return this[d].defaultLocale;
        }
        get domainLocale() {
          return this[d].domainLocale;
        }
        get searchParams() {
          return this[d].url.searchParams;
        }
        get host() {
          return this[d].url.host;
        }
        set host(e2) {
          this[d].url.host = e2;
        }
        get hostname() {
          return this[d].url.hostname;
        }
        set hostname(e2) {
          this[d].url.hostname = e2;
        }
        get port() {
          return this[d].url.port;
        }
        set port(e2) {
          this[d].url.port = e2;
        }
        get protocol() {
          return this[d].url.protocol;
        }
        set protocol(e2) {
          this[d].url.protocol = e2;
        }
        get href() {
          let e2 = this.formatPathname(), t2 = this.formatSearch();
          return `${this.protocol}//${this.host}${e2}${t2}${this.hash}`;
        }
        set href(e2) {
          this[d].url = u(e2), this.analyze();
        }
        get origin() {
          return this[d].url.origin;
        }
        get pathname() {
          return this[d].url.pathname;
        }
        set pathname(e2) {
          this[d].url.pathname = e2;
        }
        get hash() {
          return this[d].url.hash;
        }
        set hash(e2) {
          this[d].url.hash = e2;
        }
        get search() {
          return this[d].url.search;
        }
        set search(e2) {
          this[d].url.search = e2;
        }
        get password() {
          return this[d].url.password;
        }
        set password(e2) {
          this[d].url.password = e2;
        }
        get username() {
          return this[d].url.username;
        }
        set username(e2) {
          this[d].url.username = e2;
        }
        get basePath() {
          return this[d].basePath;
        }
        set basePath(e2) {
          this[d].basePath = e2.startsWith("/") ? e2 : `/${e2}`;
        }
        toString() {
          return this.href;
        }
        toJSON() {
          return this.href;
        }
        [Symbol.for("edge-runtime.inspect.custom")]() {
          return { href: this.href, origin: this.origin, protocol: this.protocol, username: this.username, password: this.password, host: this.host, hostname: this.hostname, port: this.port, pathname: this.pathname, search: this.search, searchParams: this.searchParams, hash: this.hash };
        }
        clone() {
          return new p(String(this), this[d].options);
        }
      }
    }, 7862: (e, t, r) => {
      "use strict";
      r.d(t, { h: () => i });
      var n = r(7217);
      class a extends Error {
        constructor() {
          super("Headers cannot be modified. Read more: https://nextjs.org/docs/app/api-reference/functions/headers");
        }
        static callable() {
          throw new a();
        }
      }
      class i extends Headers {
        constructor(e2) {
          super(), this.headers = new Proxy(e2, { get(t2, r2, a2) {
            if ("symbol" == typeof r2) return n.g.get(t2, r2, a2);
            let i2 = r2.toLowerCase(), s = Object.keys(e2).find((e3) => e3.toLowerCase() === i2);
            if (void 0 !== s) return n.g.get(t2, s, a2);
          }, set(t2, r2, a2, i2) {
            if ("symbol" == typeof r2) return n.g.set(t2, r2, a2, i2);
            let s = r2.toLowerCase(), o = Object.keys(e2).find((e3) => e3.toLowerCase() === s);
            return n.g.set(t2, o ?? r2, a2, i2);
          }, has(t2, r2) {
            if ("symbol" == typeof r2) return n.g.has(t2, r2);
            let a2 = r2.toLowerCase(), i2 = Object.keys(e2).find((e3) => e3.toLowerCase() === a2);
            return void 0 !== i2 && n.g.has(t2, i2);
          }, deleteProperty(t2, r2) {
            if ("symbol" == typeof r2) return n.g.deleteProperty(t2, r2);
            let a2 = r2.toLowerCase(), i2 = Object.keys(e2).find((e3) => e3.toLowerCase() === a2);
            return void 0 === i2 || n.g.deleteProperty(t2, i2);
          } });
        }
        static seal(e2) {
          return new Proxy(e2, { get(e3, t2, r2) {
            switch (t2) {
              case "append":
              case "delete":
              case "set":
                return a.callable;
              default:
                return n.g.get(e3, t2, r2);
            }
          } });
        }
        merge(e2) {
          return Array.isArray(e2) ? e2.join(", ") : e2;
        }
        static from(e2) {
          return e2 instanceof Headers ? e2 : new i(e2);
        }
        append(e2, t2) {
          let r2 = this.headers[e2];
          "string" == typeof r2 ? this.headers[e2] = [r2, t2] : Array.isArray(r2) ? r2.push(t2) : this.headers[e2] = t2;
        }
        delete(e2) {
          delete this.headers[e2];
        }
        get(e2) {
          let t2 = this.headers[e2];
          return void 0 !== t2 ? this.merge(t2) : null;
        }
        has(e2) {
          return void 0 !== this.headers[e2];
        }
        set(e2, t2) {
          this.headers[e2] = t2;
        }
        forEach(e2, t2) {
          for (let [r2, n2] of this.entries()) e2.call(t2, n2, r2, this);
        }
        *entries() {
          for (let e2 of Object.keys(this.headers)) {
            let t2 = e2.toLowerCase(), r2 = this.get(t2);
            yield [t2, r2];
          }
        }
        *keys() {
          for (let e2 of Object.keys(this.headers)) {
            let t2 = e2.toLowerCase();
            yield t2;
          }
        }
        *values() {
          for (let e2 of Object.keys(this.headers)) {
            let t2 = this.get(e2);
            yield t2;
          }
        }
        [Symbol.iterator]() {
          return this.entries();
        }
      }
    }, 7217: (e, t, r) => {
      "use strict";
      r.d(t, { g: () => n });
      class n {
        static get(e2, t2, r2) {
          let n2 = Reflect.get(e2, t2, r2);
          return "function" == typeof n2 ? n2.bind(e2) : n2;
        }
        static set(e2, t2, r2, n2) {
          return Reflect.set(e2, t2, r2, n2);
        }
        static has(e2, t2) {
          return Reflect.has(e2, t2);
        }
        static deleteProperty(e2, t2) {
          return Reflect.deleteProperty(e2, t2);
        }
      }
    }, 8009: (e, t, r) => {
      "use strict";
      r.d(t, { Qb: () => o, vr: () => c });
      var n = r(938), a = r(7217), i = r(9452);
      class s extends Error {
        constructor() {
          super("Cookies can only be modified in a Server Action or Route Handler. Read more: https://nextjs.org/docs/app/api-reference/functions/cookies#cookiessetname-value-options");
        }
        static callable() {
          throw new s();
        }
      }
      class o {
        static seal(e2) {
          return new Proxy(e2, { get(e3, t2, r2) {
            switch (t2) {
              case "clear":
              case "delete":
              case "set":
                return s.callable;
              default:
                return a.g.get(e3, t2, r2);
            }
          } });
        }
      }
      let l = Symbol.for("next.mutated.cookies");
      class c {
        static wrap(e2, t2) {
          let r2 = new n.nV(new Headers());
          for (let t3 of e2.getAll()) r2.set(t3);
          let s2 = [], o2 = /* @__PURE__ */ new Set(), c2 = () => {
            let e3 = i.A.getStore();
            if (e3 && (e3.pathWasRevalidated = true), s2 = r2.getAll().filter((e4) => o2.has(e4.name)), t2) {
              let e4 = [];
              for (let t3 of s2) {
                let r3 = new n.nV(new Headers());
                r3.set(t3), e4.push(r3.toString());
              }
              t2(e4);
            }
          };
          return new Proxy(r2, { get(e3, t3, r3) {
            switch (t3) {
              case l:
                return s2;
              case "delete":
                return function(...t4) {
                  o2.add("string" == typeof t4[0] ? t4[0] : t4[0].name);
                  try {
                    e3.delete(...t4);
                  } finally {
                    c2();
                  }
                };
              case "set":
                return function(...t4) {
                  o2.add("string" == typeof t4[0] ? t4[0] : t4[0].name);
                  try {
                    return e3.set(...t4);
                  } finally {
                    c2();
                  }
                };
              default:
                return a.g.get(e3, t3, r3);
            }
          } });
        }
      }
    }, 938: (e, t, r) => {
      "use strict";
      r.d(t, { Q7: () => n.stringifyCookie, nV: () => n.ResponseCookies, qC: () => n.RequestCookies });
      var n = r(5945);
    }, 1669: (e, t, r) => {
      "use strict";
      r.d(t, { I: () => l });
      var n = r(9718), a = r(6329), i = r(6416), s = r(938);
      let o = Symbol("internal request");
      class l extends Request {
        constructor(e2, t2 = {}) {
          let r2 = "string" != typeof e2 && "url" in e2 ? e2.url : String(e2);
          (0, a.r4)(r2), e2 instanceof Request ? super(e2, t2) : super(r2, t2);
          let i2 = new n.c(r2, { headers: (0, a.lb)(this.headers), nextConfig: t2.nextConfig });
          this[o] = { cookies: new s.qC(this.headers), geo: t2.geo || {}, ip: t2.ip, nextUrl: i2, url: r2 };
        }
        [Symbol.for("edge-runtime.inspect.custom")]() {
          return { cookies: this.cookies, geo: this.geo, ip: this.ip, nextUrl: this.nextUrl, url: this.url, bodyUsed: this.bodyUsed, cache: this.cache, credentials: this.credentials, destination: this.destination, headers: Object.fromEntries(this.headers), integrity: this.integrity, keepalive: this.keepalive, method: this.method, mode: this.mode, redirect: this.redirect, referrer: this.referrer, referrerPolicy: this.referrerPolicy, signal: this.signal };
        }
        get cookies() {
          return this[o].cookies;
        }
        get geo() {
          return this[o].geo;
        }
        get ip() {
          return this[o].ip;
        }
        get nextUrl() {
          return this[o].nextUrl;
        }
        get page() {
          throw new i.cR();
        }
        get ua() {
          throw new i.Y5();
        }
        get url() {
          return this[o].url;
        }
      }
    }, 8241: (e, t, r) => {
      "use strict";
      r.d(t, { x: () => u });
      var n = r(938), a = r(9718), i = r(6329), s = r(7217);
      let o = Symbol("internal response"), l = /* @__PURE__ */ new Set([301, 302, 303, 307, 308]);
      function c(e2, t2) {
        var r2;
        if (null == e2 ? void 0 : null == (r2 = e2.request) ? void 0 : r2.headers) {
          if (!(e2.request.headers instanceof Headers)) throw Error("request.headers must be an instance of Headers");
          let r3 = [];
          for (let [n2, a2] of e2.request.headers) t2.set("x-middleware-request-" + n2, a2), r3.push(n2);
          t2.set("x-middleware-override-headers", r3.join(","));
        }
      }
      class u extends Response {
        constructor(e2, t2 = {}) {
          super(e2, t2);
          let r2 = this.headers, l2 = new Proxy(new n.nV(r2), { get(e3, a2, i2) {
            switch (a2) {
              case "delete":
              case "set":
                return (...i3) => {
                  let s2 = Reflect.apply(e3[a2], e3, i3), o2 = new Headers(r2);
                  return s2 instanceof n.nV && r2.set("x-middleware-set-cookie", s2.getAll().map((e4) => (0, n.Q7)(e4)).join(",")), c(t2, o2), s2;
                };
              default:
                return s.g.get(e3, a2, i2);
            }
          } });
          this[o] = { cookies: l2, url: t2.url ? new a.c(t2.url, { headers: (0, i.lb)(r2), nextConfig: t2.nextConfig }) : void 0 };
        }
        [Symbol.for("edge-runtime.inspect.custom")]() {
          return { cookies: this.cookies, url: this.url, body: this.body, bodyUsed: this.bodyUsed, headers: Object.fromEntries(this.headers), ok: this.ok, redirected: this.redirected, status: this.status, statusText: this.statusText, type: this.type };
        }
        get cookies() {
          return this[o].cookies;
        }
        static json(e2, t2) {
          let r2 = Response.json(e2, t2);
          return new u(r2.body, r2);
        }
        static redirect(e2, t2) {
          let r2 = "number" == typeof t2 ? t2 : (null == t2 ? void 0 : t2.status) ?? 307;
          if (!l.has(r2)) throw RangeError('Failed to execute "redirect" on "response": Invalid status code');
          let n2 = "object" == typeof t2 ? t2 : {}, a2 = new Headers(null == n2 ? void 0 : n2.headers);
          return a2.set("Location", (0, i.r4)(e2)), new u(null, { ...n2, headers: a2, status: r2 });
        }
        static rewrite(e2, t2) {
          let r2 = new Headers(null == t2 ? void 0 : t2.headers);
          return r2.set("x-middleware-rewrite", (0, i.r4)(e2)), c(t2, r2), new u(null, { ...t2, headers: r2 });
        }
        static next(e2) {
          let t2 = new Headers(null == e2 ? void 0 : e2.headers);
          return t2.set("x-middleware-next", "1"), c(e2, t2), new u(null, { ...e2, headers: t2 });
        }
      }
    }, 6329: (e, t, r) => {
      "use strict";
      r.d(t, { EK: () => a, LI: () => l, l$: () => i, lb: () => s, r4: () => o });
      var n = r(300);
      function a(e2) {
        let t2 = new Headers();
        for (let [r2, n2] of Object.entries(e2)) for (let e3 of Array.isArray(n2) ? n2 : [n2]) void 0 !== e3 && ("number" == typeof e3 && (e3 = e3.toString()), t2.append(r2, e3));
        return t2;
      }
      function i(e2) {
        var t2, r2, n2, a2, i2, s2 = [], o2 = 0;
        function l2() {
          for (; o2 < e2.length && /\s/.test(e2.charAt(o2)); ) o2 += 1;
          return o2 < e2.length;
        }
        for (; o2 < e2.length; ) {
          for (t2 = o2, i2 = false; l2(); ) if ("," === (r2 = e2.charAt(o2))) {
            for (n2 = o2, o2 += 1, l2(), a2 = o2; o2 < e2.length && "=" !== (r2 = e2.charAt(o2)) && ";" !== r2 && "," !== r2; ) o2 += 1;
            o2 < e2.length && "=" === e2.charAt(o2) ? (i2 = true, o2 = a2, s2.push(e2.substring(t2, n2)), t2 = o2) : o2 = n2 + 1;
          } else o2 += 1;
          (!i2 || o2 >= e2.length) && s2.push(e2.substring(t2, e2.length));
        }
        return s2;
      }
      function s(e2) {
        let t2 = {}, r2 = [];
        if (e2) for (let [n2, a2] of e2.entries()) "set-cookie" === n2.toLowerCase() ? (r2.push(...i(a2)), t2[n2] = 1 === r2.length ? r2[0] : r2) : t2[n2] = a2;
        return t2;
      }
      function o(e2) {
        try {
          return String(new URL(String(e2)));
        } catch (t2) {
          throw Error(`URL is malformed "${String(e2)}". Please use only absolute URLs - https://nextjs.org/docs/messages/middleware-relative-urls`, { cause: t2 });
        }
      }
      function l(e2, t2) {
        for (let r2 of [n.dN, n.u7]) e2 !== r2 && e2.startsWith(r2) && t2(e2.substring(r2.length));
      }
    }, 8488: (e, t, r) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: true }), function(e2, t2) {
        for (var r2 in t2) Object.defineProperty(e2, r2, { enumerable: true, get: t2[r2] });
      }(t, { getTestReqInfo: function() {
        return s;
      }, withRequest: function() {
        return i;
      } });
      let n = new (r(2067)).AsyncLocalStorage();
      function a(e2, t2) {
        let r2 = t2.header(e2, "next-test-proxy-port");
        if (r2) return { url: t2.url(e2), proxyPort: Number(r2), testData: t2.header(e2, "next-test-data") || "" };
      }
      function i(e2, t2, r2) {
        let i2 = a(e2, t2);
        return i2 ? n.run(i2, r2) : r2();
      }
      function s(e2, t2) {
        return n.getStore() || (e2 && t2 ? a(e2, t2) : void 0);
      }
    }, 375: (e, t, r) => {
      "use strict";
      var n = r(6195).Buffer;
      Object.defineProperty(t, "__esModule", { value: true }), function(e2, t2) {
        for (var r2 in t2) Object.defineProperty(e2, r2, { enumerable: true, get: t2[r2] });
      }(t, { handleFetch: function() {
        return o;
      }, interceptFetch: function() {
        return l;
      }, reader: function() {
        return i;
      } });
      let a = r(8488), i = { url: (e2) => e2.url, header: (e2, t2) => e2.headers.get(t2) };
      async function s(e2, t2) {
        let { url: r2, method: a2, headers: i2, body: s2, cache: o2, credentials: l2, integrity: c, mode: u, redirect: d, referrer: p, referrerPolicy: h } = t2;
        return { testData: e2, api: "fetch", request: { url: r2, method: a2, headers: [...Array.from(i2), ["next-test-stack", function() {
          let e3 = (Error().stack ?? "").split("\n");
          for (let t3 = 1; t3 < e3.length; t3++) if (e3[t3].length > 0) {
            e3 = e3.slice(t3);
            break;
          }
          return (e3 = (e3 = (e3 = e3.filter((e4) => !e4.includes("/next/dist/"))).slice(0, 5)).map((e4) => e4.replace("webpack-internal:///(rsc)/", "").trim())).join("    ");
        }()]], body: s2 ? n.from(await t2.arrayBuffer()).toString("base64") : null, cache: o2, credentials: l2, integrity: c, mode: u, redirect: d, referrer: p, referrerPolicy: h } };
      }
      async function o(e2, t2) {
        let r2 = (0, a.getTestReqInfo)(t2, i);
        if (!r2) return e2(t2);
        let { testData: o2, proxyPort: l2 } = r2, c = await s(o2, t2), u = await e2(`http://localhost:${l2}`, { method: "POST", body: JSON.stringify(c), next: { internal: true } });
        if (!u.ok) throw Error(`Proxy request failed: ${u.status}`);
        let d = await u.json(), { api: p } = d;
        switch (p) {
          case "continue":
            return e2(t2);
          case "abort":
          case "unhandled":
            throw Error(`Proxy request aborted [${t2.method} ${t2.url}]`);
        }
        return function(e3) {
          let { status: t3, headers: r3, body: a2 } = e3.response;
          return new Response(a2 ? n.from(a2, "base64") : null, { status: t3, headers: new Headers(r3) });
        }(d);
      }
      function l(e2) {
        return r.g.fetch = function(t2, r2) {
          var n2;
          return (null == r2 ? void 0 : null == (n2 = r2.next) ? void 0 : n2.internal) ? e2(t2, r2) : o(e2, new Request(t2, r2));
        }, () => {
          r.g.fetch = e2;
        };
      }
    }, 4177: (e, t, r) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: true }), function(e2, t2) {
        for (var r2 in t2) Object.defineProperty(e2, r2, { enumerable: true, get: t2[r2] });
      }(t, { interceptTestApis: function() {
        return i;
      }, wrapRequestHandler: function() {
        return s;
      } });
      let n = r(8488), a = r(375);
      function i() {
        return (0, a.interceptFetch)(r.g.fetch);
      }
      function s(e2) {
        return (t2, r2) => (0, n.withRequest)(t2, a.reader, () => e2(t2, r2));
      }
    }, 4835: (e, t) => {
      "use strict";
      var r = Symbol.for("react.element"), n = Symbol.for("react.portal"), a = Symbol.for("react.fragment"), i = Symbol.for("react.strict_mode"), s = Symbol.for("react.profiler"), o = Symbol.for("react.provider"), l = Symbol.for("react.context"), c = Symbol.for("react.forward_ref"), u = Symbol.for("react.suspense"), d = Symbol.for("react.memo"), p = Symbol.for("react.lazy"), h = Symbol.iterator, f = { isMounted: function() {
        return false;
      }, enqueueForceUpdate: function() {
      }, enqueueReplaceState: function() {
      }, enqueueSetState: function() {
      } }, m = Object.assign, g = {};
      function y(e2, t2, r2) {
        this.props = e2, this.context = t2, this.refs = g, this.updater = r2 || f;
      }
      function b() {
      }
      function w(e2, t2, r2) {
        this.props = e2, this.context = t2, this.refs = g, this.updater = r2 || f;
      }
      y.prototype.isReactComponent = {}, y.prototype.setState = function(e2, t2) {
        if ("object" != typeof e2 && "function" != typeof e2 && null != e2) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
        this.updater.enqueueSetState(this, e2, t2, "setState");
      }, y.prototype.forceUpdate = function(e2) {
        this.updater.enqueueForceUpdate(this, e2, "forceUpdate");
      }, b.prototype = y.prototype;
      var v = w.prototype = new b();
      v.constructor = w, m(v, y.prototype), v.isPureReactComponent = true;
      var _ = Array.isArray, S = Object.prototype.hasOwnProperty, E = { current: null }, A = { key: true, ref: true, __self: true, __source: true };
      function k(e2, t2, n2) {
        var a2, i2 = {}, s2 = null, o2 = null;
        if (null != t2) for (a2 in void 0 !== t2.ref && (o2 = t2.ref), void 0 !== t2.key && (s2 = "" + t2.key), t2) S.call(t2, a2) && !A.hasOwnProperty(a2) && (i2[a2] = t2[a2]);
        var l2 = arguments.length - 2;
        if (1 === l2) i2.children = n2;
        else if (1 < l2) {
          for (var c2 = Array(l2), u2 = 0; u2 < l2; u2++) c2[u2] = arguments[u2 + 2];
          i2.children = c2;
        }
        if (e2 && e2.defaultProps) for (a2 in l2 = e2.defaultProps) void 0 === i2[a2] && (i2[a2] = l2[a2]);
        return { $$typeof: r, type: e2, key: s2, ref: o2, props: i2, _owner: E.current };
      }
      function x(e2) {
        return "object" == typeof e2 && null !== e2 && e2.$$typeof === r;
      }
      var R = /\/+/g;
      function C(e2, t2) {
        var r2, n2;
        return "object" == typeof e2 && null !== e2 && null != e2.key ? (r2 = "" + e2.key, n2 = { "=": "=0", ":": "=2" }, "$" + r2.replace(/[=:]/g, function(e3) {
          return n2[e3];
        })) : t2.toString(36);
      }
      function O(e2, t2, a2) {
        if (null == e2) return e2;
        var i2 = [], s2 = 0;
        return !function e3(t3, a3, i3, s3, o2) {
          var l2, c2, u2, d2 = typeof t3;
          ("undefined" === d2 || "boolean" === d2) && (t3 = null);
          var p2 = false;
          if (null === t3) p2 = true;
          else switch (d2) {
            case "string":
            case "number":
              p2 = true;
              break;
            case "object":
              switch (t3.$$typeof) {
                case r:
                case n:
                  p2 = true;
              }
          }
          if (p2) return o2 = o2(p2 = t3), t3 = "" === s3 ? "." + C(p2, 0) : s3, _(o2) ? (i3 = "", null != t3 && (i3 = t3.replace(R, "$&/") + "/"), e3(o2, a3, i3, "", function(e4) {
            return e4;
          })) : null != o2 && (x(o2) && (l2 = o2, c2 = i3 + (!o2.key || p2 && p2.key === o2.key ? "" : ("" + o2.key).replace(R, "$&/") + "/") + t3, o2 = { $$typeof: r, type: l2.type, key: c2, ref: l2.ref, props: l2.props, _owner: l2._owner }), a3.push(o2)), 1;
          if (p2 = 0, s3 = "" === s3 ? "." : s3 + ":", _(t3)) for (var f2 = 0; f2 < t3.length; f2++) {
            var m2 = s3 + C(d2 = t3[f2], f2);
            p2 += e3(d2, a3, i3, m2, o2);
          }
          else if ("function" == typeof (m2 = null === (u2 = t3) || "object" != typeof u2 ? null : "function" == typeof (u2 = h && u2[h] || u2["@@iterator"]) ? u2 : null)) for (t3 = m2.call(t3), f2 = 0; !(d2 = t3.next()).done; ) m2 = s3 + C(d2 = d2.value, f2++), p2 += e3(d2, a3, i3, m2, o2);
          else if ("object" === d2) throw Error("Objects are not valid as a React child (found: " + ("[object Object]" === (a3 = String(t3)) ? "object with keys {" + Object.keys(t3).join(", ") + "}" : a3) + "). If you meant to render a collection of children, use an array instead.");
          return p2;
        }(e2, i2, "", "", function(e3) {
          return t2.call(a2, e3, s2++);
        }), i2;
      }
      function P(e2) {
        if (-1 === e2._status) {
          var t2 = e2._result;
          (t2 = t2()).then(function(t3) {
            (0 === e2._status || -1 === e2._status) && (e2._status = 1, e2._result = t3);
          }, function(t3) {
            (0 === e2._status || -1 === e2._status) && (e2._status = 2, e2._result = t3);
          }), -1 === e2._status && (e2._status = 0, e2._result = t2);
        }
        if (1 === e2._status) return e2._result.default;
        throw e2._result;
      }
      var T = { current: null }, j = { transition: null };
      function I() {
        throw Error("act(...) is not supported in production builds of React.");
      }
      t.Children = { map: O, forEach: function(e2, t2, r2) {
        O(e2, function() {
          t2.apply(this, arguments);
        }, r2);
      }, count: function(e2) {
        var t2 = 0;
        return O(e2, function() {
          t2++;
        }), t2;
      }, toArray: function(e2) {
        return O(e2, function(e3) {
          return e3;
        }) || [];
      }, only: function(e2) {
        if (!x(e2)) throw Error("React.Children.only expected to receive a single React element child.");
        return e2;
      } }, t.Component = y, t.Fragment = a, t.Profiler = s, t.PureComponent = w, t.StrictMode = i, t.Suspense = u, t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = { ReactCurrentDispatcher: T, ReactCurrentBatchConfig: j, ReactCurrentOwner: E }, t.act = I, t.cloneElement = function(e2, t2, n2) {
        if (null == e2) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + e2 + ".");
        var a2 = m({}, e2.props), i2 = e2.key, s2 = e2.ref, o2 = e2._owner;
        if (null != t2) {
          if (void 0 !== t2.ref && (s2 = t2.ref, o2 = E.current), void 0 !== t2.key && (i2 = "" + t2.key), e2.type && e2.type.defaultProps) var l2 = e2.type.defaultProps;
          for (c2 in t2) S.call(t2, c2) && !A.hasOwnProperty(c2) && (a2[c2] = void 0 === t2[c2] && void 0 !== l2 ? l2[c2] : t2[c2]);
        }
        var c2 = arguments.length - 2;
        if (1 === c2) a2.children = n2;
        else if (1 < c2) {
          l2 = Array(c2);
          for (var u2 = 0; u2 < c2; u2++) l2[u2] = arguments[u2 + 2];
          a2.children = l2;
        }
        return { $$typeof: r, type: e2.type, key: i2, ref: s2, props: a2, _owner: o2 };
      }, t.createContext = function(e2) {
        return (e2 = { $$typeof: l, _currentValue: e2, _currentValue2: e2, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null }).Provider = { $$typeof: o, _context: e2 }, e2.Consumer = e2;
      }, t.createElement = k, t.createFactory = function(e2) {
        var t2 = k.bind(null, e2);
        return t2.type = e2, t2;
      }, t.createRef = function() {
        return { current: null };
      }, t.forwardRef = function(e2) {
        return { $$typeof: c, render: e2 };
      }, t.isValidElement = x, t.lazy = function(e2) {
        return { $$typeof: p, _payload: { _status: -1, _result: e2 }, _init: P };
      }, t.memo = function(e2, t2) {
        return { $$typeof: d, type: e2, compare: void 0 === t2 ? null : t2 };
      }, t.startTransition = function(e2) {
        var t2 = j.transition;
        j.transition = {};
        try {
          e2();
        } finally {
          j.transition = t2;
        }
      }, t.unstable_act = I, t.useCallback = function(e2, t2) {
        return T.current.useCallback(e2, t2);
      }, t.useContext = function(e2) {
        return T.current.useContext(e2);
      }, t.useDebugValue = function() {
      }, t.useDeferredValue = function(e2) {
        return T.current.useDeferredValue(e2);
      }, t.useEffect = function(e2, t2) {
        return T.current.useEffect(e2, t2);
      }, t.useId = function() {
        return T.current.useId();
      }, t.useImperativeHandle = function(e2, t2, r2) {
        return T.current.useImperativeHandle(e2, t2, r2);
      }, t.useInsertionEffect = function(e2, t2) {
        return T.current.useInsertionEffect(e2, t2);
      }, t.useLayoutEffect = function(e2, t2) {
        return T.current.useLayoutEffect(e2, t2);
      }, t.useMemo = function(e2, t2) {
        return T.current.useMemo(e2, t2);
      }, t.useReducer = function(e2, t2, r2) {
        return T.current.useReducer(e2, t2, r2);
      }, t.useRef = function(e2) {
        return T.current.useRef(e2);
      }, t.useState = function(e2) {
        return T.current.useState(e2);
      }, t.useSyncExternalStore = function(e2, t2, r2) {
        return T.current.useSyncExternalStore(e2, t2, r2);
      }, t.useTransition = function() {
        return T.current.useTransition();
      }, t.version = "18.3.1";
    }, 5023: (e, t, r) => {
      "use strict";
      e.exports = r(4835);
    }, 6650: function(e, t, r) {
      var n, a;
      a = function() {
        return function() {
          var e2;
          return e2 = "object" == typeof arguments[0] ? arguments[0] : [].slice.call(arguments), function(e3) {
            var t2 = [];
            if (0 === e3.length) return "";
            if ("string" != typeof e3[0]) throw TypeError("Url must be a string. Received " + e3[0]);
            if (e3[0].match(/^[^/:]+:\/*$/) && e3.length > 1) {
              var r2 = e3.shift();
              e3[0] = r2 + e3[0];
            }
            e3[0].match(/^file:\/\/\//) ? e3[0] = e3[0].replace(/^([^/:]+):\/*/, "$1:///") : e3[0] = e3[0].replace(/^([^/:]+):\/*/, "$1://");
            for (var n2 = 0; n2 < e3.length; n2++) {
              var a2 = e3[n2];
              if ("string" != typeof a2) throw TypeError("Url must be a string. Received " + a2);
              "" !== a2 && (n2 > 0 && (a2 = a2.replace(/^[\/]+/, "")), a2 = n2 < e3.length - 1 ? a2.replace(/[\/]+$/, "") : a2.replace(/[\/]+$/, "/"), t2.push(a2));
            }
            var i = t2.join("/"), s = (i = i.replace(/\/(\?|&|#[^!])/g, "$1")).split("?");
            return s.shift() + (s.length > 0 ? "?" : "") + s.join("&");
          }(e2);
        };
      }, e.exports ? e.exports = a() : void 0 === (n = a.call(t, r, t, e)) || (e.exports = n);
    }, 5228: (e, t, r) => {
      "use strict";
      r.d(t, { P: () => s });
      let n = Error("Invariant: AsyncLocalStorage accessed in runtime where it is not available");
      class a {
        disable() {
          throw n;
        }
        getStore() {
        }
        run() {
          throw n;
        }
        exit() {
          throw n;
        }
        enterWith() {
          throw n;
        }
      }
      let i = globalThis.AsyncLocalStorage;
      function s() {
        return i ? new i() : new a();
      }
    }, 728: (e, t, r) => {
      "use strict";
      r.r(t), r.d(t, { default: () => s, hkdf: () => s });
      let n = () => {
        if ("undefined" != typeof globalThis) return globalThis;
        if ("undefined" != typeof self) return self;
        if ("undefined" != typeof window) return window;
        throw Error("unable to locate global object");
      }, a = async (e2, t2, r2, a2, i2) => {
        let { crypto: { subtle: s2 } } = n();
        return new Uint8Array(await s2.deriveBits({ name: "HKDF", hash: `SHA-${e2.substr(3)}`, salt: r2, info: a2 }, await s2.importKey("raw", t2, "HKDF", false, ["deriveBits"]), i2 << 3));
      };
      function i(e2, t2) {
        if ("string" == typeof e2) return new TextEncoder().encode(e2);
        if (!(e2 instanceof Uint8Array)) throw TypeError(`"${t2}"" must be an instance of Uint8Array or a string`);
        return e2;
      }
      async function s(e2, t2, r2, n2, s2) {
        return a(function(e3) {
          switch (e3) {
            case "sha256":
            case "sha384":
            case "sha512":
            case "sha1":
              return e3;
            default:
              throw TypeError('unsupported "digest" value');
          }
        }(e2), function(e3) {
          let t3 = i(e3, "ikm");
          if (!t3.byteLength) throw TypeError('"ikm" must be at least one byte in length');
          return t3;
        }(t2), i(r2, "salt"), function(e3) {
          let t3 = i(e3, "info");
          if (t3.byteLength > 1024) throw TypeError('"info" must not contain more than 1024 bytes');
          return t3;
        }(n2), function(e3, t3) {
          if ("number" != typeof e3 || !Number.isInteger(e3) || e3 < 1) throw TypeError('"keylen" must be a positive integer');
          if (e3 > 255 * (parseInt(t3.substr(3), 10) >> 3 || 20)) throw TypeError('"keylen" too large');
          return e3;
        }(s2, e2));
      }
    }, 9507: (e, t, r) => {
      "use strict";
      r.r(t), r.d(t, { CompactEncrypt: () => tp, CompactSign: () => tm, EmbeddedJWK: () => tA, EncryptJWT: () => tv, FlattenedEncrypt: () => e5, FlattenedSign: () => tf, GeneralEncrypt: () => e4, GeneralSign: () => ty, SignJWT: () => tw, UnsecuredJWT: () => tI, base64url: () => a, calculateJwkThumbprint: () => tS, calculateJwkThumbprintUri: () => tE, compactDecrypt: () => eY, compactVerify: () => tr, createLocalJWKSet: () => tO, createRemoteJWKSet: () => tj, cryptoRuntime: () => tW, decodeJwt: () => tD, decodeProtectedHeader: () => tM, errors: () => n, exportJWK: () => e2, exportPKCS8: () => e1, exportSPKI: () => e0, flattenedDecrypt: () => eX, flattenedVerify: () => tt, generalDecrypt: () => eZ, generalVerify: () => tn, generateKeyPair: () => tq, generateSecret: () => tK, importJWK: () => eL, importPKCS8: () => eD, importSPKI: () => eN, importX509: () => eM, jwtDecrypt: () => td, jwtVerify: () => tu });
      var n = {};
      r.r(n), r.d(n, { JOSEAlgNotAllowed: () => E, JOSEError: () => v, JOSENotSupported: () => A, JWEDecompressionFailed: () => x, JWEDecryptionFailed: () => k, JWEInvalid: () => R, JWKInvalid: () => P, JWKSInvalid: () => T, JWKSMultipleMatchingKeys: () => I, JWKSNoMatchingKey: () => j, JWKSTimeout: () => $, JWSInvalid: () => C, JWSSignatureVerificationFailed: () => N, JWTClaimValidationFailed: () => _, JWTExpired: () => S, JWTInvalid: () => O });
      var a = {};
      r.r(a), r.d(a, { decode: () => tN, encode: () => t$ });
      let i = crypto, s = (e10) => e10 instanceof CryptoKey, o = async (e10, t2) => {
        let r2 = `SHA-${e10.slice(-3)}`;
        return new Uint8Array(await i.subtle.digest(r2, t2));
      }, l = new TextEncoder(), c = new TextDecoder();
      function u(...e10) {
        let t2 = new Uint8Array(e10.reduce((e11, { length: t3 }) => e11 + t3, 0)), r2 = 0;
        return e10.forEach((e11) => {
          t2.set(e11, r2), r2 += e11.length;
        }), t2;
      }
      function d(e10, t2, r2) {
        if (t2 < 0 || t2 >= 4294967296) throw RangeError(`value must be >= 0 and <= ${4294967296 - 1}. Received ${t2}`);
        e10.set([t2 >>> 24, t2 >>> 16, t2 >>> 8, 255 & t2], r2);
      }
      function p(e10) {
        let t2 = new Uint8Array(8);
        return d(t2, Math.floor(e10 / 4294967296), 0), d(t2, e10 % 4294967296, 4), t2;
      }
      function h(e10) {
        let t2 = new Uint8Array(4);
        return d(t2, e10), t2;
      }
      function f(e10) {
        return u(h(e10.length), e10);
      }
      async function m(e10, t2, r2) {
        let n2 = Math.ceil((t2 >> 3) / 32), a2 = new Uint8Array(32 * n2);
        for (let t3 = 0; t3 < n2; t3++) {
          let n3 = new Uint8Array(4 + e10.length + r2.length);
          n3.set(h(t3 + 1)), n3.set(e10, 4), n3.set(r2, 4 + e10.length), a2.set(await o("sha256", n3), 32 * t3);
        }
        return a2.slice(0, t2 >> 3);
      }
      let g = (e10) => {
        let t2 = e10;
        "string" == typeof t2 && (t2 = l.encode(t2));
        let r2 = [];
        for (let e11 = 0; e11 < t2.length; e11 += 32768) r2.push(String.fromCharCode.apply(null, t2.subarray(e11, e11 + 32768)));
        return btoa(r2.join(""));
      }, y = (e10) => g(e10).replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_"), b = (e10) => {
        let t2 = atob(e10), r2 = new Uint8Array(t2.length);
        for (let e11 = 0; e11 < t2.length; e11++) r2[e11] = t2.charCodeAt(e11);
        return r2;
      }, w = (e10) => {
        let t2 = e10;
        t2 instanceof Uint8Array && (t2 = c.decode(t2)), t2 = t2.replace(/-/g, "+").replace(/_/g, "/").replace(/\s/g, "");
        try {
          return b(t2);
        } catch (e11) {
          throw TypeError("The input to be decoded is not correctly encoded.");
        }
      };
      class v extends Error {
        static get code() {
          return "ERR_JOSE_GENERIC";
        }
        constructor(e10) {
          var t2;
          super(e10), this.code = "ERR_JOSE_GENERIC", this.name = this.constructor.name, null === (t2 = Error.captureStackTrace) || void 0 === t2 || t2.call(Error, this, this.constructor);
        }
      }
      class _ extends v {
        static get code() {
          return "ERR_JWT_CLAIM_VALIDATION_FAILED";
        }
        constructor(e10, t2 = "unspecified", r2 = "unspecified") {
          super(e10), this.code = "ERR_JWT_CLAIM_VALIDATION_FAILED", this.claim = t2, this.reason = r2;
        }
      }
      class S extends v {
        static get code() {
          return "ERR_JWT_EXPIRED";
        }
        constructor(e10, t2 = "unspecified", r2 = "unspecified") {
          super(e10), this.code = "ERR_JWT_EXPIRED", this.claim = t2, this.reason = r2;
        }
      }
      class E extends v {
        constructor() {
          super(...arguments), this.code = "ERR_JOSE_ALG_NOT_ALLOWED";
        }
        static get code() {
          return "ERR_JOSE_ALG_NOT_ALLOWED";
        }
      }
      class A extends v {
        constructor() {
          super(...arguments), this.code = "ERR_JOSE_NOT_SUPPORTED";
        }
        static get code() {
          return "ERR_JOSE_NOT_SUPPORTED";
        }
      }
      class k extends v {
        constructor() {
          super(...arguments), this.code = "ERR_JWE_DECRYPTION_FAILED", this.message = "decryption operation failed";
        }
        static get code() {
          return "ERR_JWE_DECRYPTION_FAILED";
        }
      }
      class x extends v {
        constructor() {
          super(...arguments), this.code = "ERR_JWE_DECOMPRESSION_FAILED", this.message = "decompression operation failed";
        }
        static get code() {
          return "ERR_JWE_DECOMPRESSION_FAILED";
        }
      }
      class R extends v {
        constructor() {
          super(...arguments), this.code = "ERR_JWE_INVALID";
        }
        static get code() {
          return "ERR_JWE_INVALID";
        }
      }
      class C extends v {
        constructor() {
          super(...arguments), this.code = "ERR_JWS_INVALID";
        }
        static get code() {
          return "ERR_JWS_INVALID";
        }
      }
      class O extends v {
        constructor() {
          super(...arguments), this.code = "ERR_JWT_INVALID";
        }
        static get code() {
          return "ERR_JWT_INVALID";
        }
      }
      class P extends v {
        constructor() {
          super(...arguments), this.code = "ERR_JWK_INVALID";
        }
        static get code() {
          return "ERR_JWK_INVALID";
        }
      }
      class T extends v {
        constructor() {
          super(...arguments), this.code = "ERR_JWKS_INVALID";
        }
        static get code() {
          return "ERR_JWKS_INVALID";
        }
      }
      class j extends v {
        constructor() {
          super(...arguments), this.code = "ERR_JWKS_NO_MATCHING_KEY", this.message = "no applicable key found in the JSON Web Key Set";
        }
        static get code() {
          return "ERR_JWKS_NO_MATCHING_KEY";
        }
      }
      class I extends v {
        constructor() {
          super(...arguments), this.code = "ERR_JWKS_MULTIPLE_MATCHING_KEYS", this.message = "multiple matching keys found in the JSON Web Key Set";
        }
        static get code() {
          return "ERR_JWKS_MULTIPLE_MATCHING_KEYS";
        }
      }
      Symbol.asyncIterator;
      class $ extends v {
        constructor() {
          super(...arguments), this.code = "ERR_JWKS_TIMEOUT", this.message = "request timed out";
        }
        static get code() {
          return "ERR_JWKS_TIMEOUT";
        }
      }
      class N extends v {
        constructor() {
          super(...arguments), this.code = "ERR_JWS_SIGNATURE_VERIFICATION_FAILED", this.message = "signature verification failed";
        }
        static get code() {
          return "ERR_JWS_SIGNATURE_VERIFICATION_FAILED";
        }
      }
      let M = i.getRandomValues.bind(i);
      function D(e10) {
        switch (e10) {
          case "A128GCM":
          case "A128GCMKW":
          case "A192GCM":
          case "A192GCMKW":
          case "A256GCM":
          case "A256GCMKW":
            return 96;
          case "A128CBC-HS256":
          case "A192CBC-HS384":
          case "A256CBC-HS512":
            return 128;
          default:
            throw new A(`Unsupported JWE Algorithm: ${e10}`);
        }
      }
      let L = (e10) => M(new Uint8Array(D(e10) >> 3)), H = (e10, t2) => {
        if (t2.length << 3 !== D(e10)) throw new R("Invalid Initialization Vector length");
      }, U = (e10, t2) => {
        let r2 = e10.byteLength << 3;
        if (r2 !== t2) throw new R(`Invalid Content Encryption Key length. Expected ${t2} bits, got ${r2} bits`);
      }, q = (e10, t2) => {
        if (!(e10 instanceof Uint8Array)) throw TypeError("First argument must be a buffer");
        if (!(t2 instanceof Uint8Array)) throw TypeError("Second argument must be a buffer");
        if (e10.length !== t2.length) throw TypeError("Input buffers must have the same length");
        let r2 = e10.length, n2 = 0, a2 = -1;
        for (; ++a2 < r2; ) n2 |= e10[a2] ^ t2[a2];
        return 0 === n2;
      };
      function K(e10, t2 = "algorithm.name") {
        return TypeError(`CryptoKey does not support this operation, its ${t2} must be ${e10}`);
      }
      function W(e10, t2) {
        return e10.name === t2;
      }
      function F(e10) {
        return parseInt(e10.name.slice(4), 10);
      }
      function J(e10, t2) {
        if (t2.length && !t2.some((t3) => e10.usages.includes(t3))) {
          let e11 = "CryptoKey does not support this operation, its usages must include ";
          if (t2.length > 2) {
            let r2 = t2.pop();
            e11 += `one of ${t2.join(", ")}, or ${r2}.`;
          } else 2 === t2.length ? e11 += `one of ${t2[0]} or ${t2[1]}.` : e11 += `${t2[0]}.`;
          throw TypeError(e11);
        }
      }
      function z(e10, t2, ...r2) {
        switch (t2) {
          case "A128GCM":
          case "A192GCM":
          case "A256GCM": {
            if (!W(e10.algorithm, "AES-GCM")) throw K("AES-GCM");
            let r3 = parseInt(t2.slice(1, 4), 10);
            if (e10.algorithm.length !== r3) throw K(r3, "algorithm.length");
            break;
          }
          case "A128KW":
          case "A192KW":
          case "A256KW": {
            if (!W(e10.algorithm, "AES-KW")) throw K("AES-KW");
            let r3 = parseInt(t2.slice(1, 4), 10);
            if (e10.algorithm.length !== r3) throw K(r3, "algorithm.length");
            break;
          }
          case "ECDH":
            switch (e10.algorithm.name) {
              case "ECDH":
              case "X25519":
              case "X448":
                break;
              default:
                throw K("ECDH, X25519, or X448");
            }
            break;
          case "PBES2-HS256+A128KW":
          case "PBES2-HS384+A192KW":
          case "PBES2-HS512+A256KW":
            if (!W(e10.algorithm, "PBKDF2")) throw K("PBKDF2");
            break;
          case "RSA-OAEP":
          case "RSA-OAEP-256":
          case "RSA-OAEP-384":
          case "RSA-OAEP-512": {
            if (!W(e10.algorithm, "RSA-OAEP")) throw K("RSA-OAEP");
            let r3 = parseInt(t2.slice(9), 10) || 1;
            if (F(e10.algorithm.hash) !== r3) throw K(`SHA-${r3}`, "algorithm.hash");
            break;
          }
          default:
            throw TypeError("CryptoKey does not support this operation");
        }
        J(e10, r2);
      }
      function B(e10, t2, ...r2) {
        if (r2.length > 2) {
          let t3 = r2.pop();
          e10 += `one of type ${r2.join(", ")}, or ${t3}.`;
        } else 2 === r2.length ? e10 += `one of type ${r2[0]} or ${r2[1]}.` : e10 += `of type ${r2[0]}.`;
        return null == t2 ? e10 += ` Received ${t2}` : "function" == typeof t2 && t2.name ? e10 += ` Received function ${t2.name}` : "object" == typeof t2 && null != t2 && t2.constructor && t2.constructor.name && (e10 += ` Received an instance of ${t2.constructor.name}`), e10;
      }
      let G = (e10, ...t2) => B("Key must be ", e10, ...t2);
      function V(e10, t2, ...r2) {
        return B(`Key for the ${e10} algorithm must be `, t2, ...r2);
      }
      let X = (e10) => s(e10), Y = ["CryptoKey"];
      async function Z(e10, t2, r2, n2, a2, s2) {
        let o2, l2;
        if (!(t2 instanceof Uint8Array)) throw TypeError(G(t2, "Uint8Array"));
        let c2 = parseInt(e10.slice(1, 4), 10), d2 = await i.subtle.importKey("raw", t2.subarray(c2 >> 3), "AES-CBC", false, ["decrypt"]), h2 = await i.subtle.importKey("raw", t2.subarray(0, c2 >> 3), { hash: `SHA-${c2 << 1}`, name: "HMAC" }, false, ["sign"]), f2 = u(s2, n2, r2, p(s2.length << 3)), m2 = new Uint8Array((await i.subtle.sign("HMAC", h2, f2)).slice(0, c2 >> 3));
        try {
          o2 = q(a2, m2);
        } catch (e11) {
        }
        if (!o2) throw new k();
        try {
          l2 = new Uint8Array(await i.subtle.decrypt({ iv: n2, name: "AES-CBC" }, d2, r2));
        } catch (e11) {
        }
        if (!l2) throw new k();
        return l2;
      }
      async function Q(e10, t2, r2, n2, a2, s2) {
        let o2;
        t2 instanceof Uint8Array ? o2 = await i.subtle.importKey("raw", t2, "AES-GCM", false, ["decrypt"]) : (z(t2, e10, "decrypt"), o2 = t2);
        try {
          return new Uint8Array(await i.subtle.decrypt({ additionalData: s2, iv: n2, name: "AES-GCM", tagLength: 128 }, o2, u(r2, a2)));
        } catch (e11) {
          throw new k();
        }
      }
      let ee = async (e10, t2, r2, n2, a2, i2) => {
        if (!s(t2) && !(t2 instanceof Uint8Array)) throw TypeError(G(t2, ...Y, "Uint8Array"));
        switch (H(e10, n2), e10) {
          case "A128CBC-HS256":
          case "A192CBC-HS384":
          case "A256CBC-HS512":
            return t2 instanceof Uint8Array && U(t2, parseInt(e10.slice(-3), 10)), Z(e10, t2, r2, n2, a2, i2);
          case "A128GCM":
          case "A192GCM":
          case "A256GCM":
            return t2 instanceof Uint8Array && U(t2, parseInt(e10.slice(1, 4), 10)), Q(e10, t2, r2, n2, a2, i2);
          default:
            throw new A("Unsupported JWE Content Encryption Algorithm");
        }
      }, et = async () => {
        throw new A('JWE "zip" (Compression Algorithm) Header Parameter is not supported by your javascript runtime. You need to use the `inflateRaw` decrypt option to provide Inflate Raw implementation.');
      }, er = async () => {
        throw new A('JWE "zip" (Compression Algorithm) Header Parameter is not supported by your javascript runtime. You need to use the `deflateRaw` encrypt option to provide Deflate Raw implementation.');
      }, en = (...e10) => {
        let t2;
        let r2 = e10.filter(Boolean);
        if (0 === r2.length || 1 === r2.length) return true;
        for (let e11 of r2) {
          let r3 = Object.keys(e11);
          if (!t2 || 0 === t2.size) {
            t2 = new Set(r3);
            continue;
          }
          for (let e12 of r3) {
            if (t2.has(e12)) return false;
            t2.add(e12);
          }
        }
        return true;
      };
      function ea(e10) {
        if (!("object" == typeof e10 && null !== e10) || "[object Object]" !== Object.prototype.toString.call(e10)) return false;
        if (null === Object.getPrototypeOf(e10)) return true;
        let t2 = e10;
        for (; null !== Object.getPrototypeOf(t2); ) t2 = Object.getPrototypeOf(t2);
        return Object.getPrototypeOf(e10) === t2;
      }
      let ei = [{ hash: "SHA-256", name: "HMAC" }, true, ["sign"]];
      function es(e10, t2) {
        if (e10.algorithm.length !== parseInt(t2.slice(1, 4), 10)) throw TypeError(`Invalid key size for alg: ${t2}`);
      }
      function eo(e10, t2, r2) {
        if (s(e10)) return z(e10, t2, r2), e10;
        if (e10 instanceof Uint8Array) return i.subtle.importKey("raw", e10, "AES-KW", true, [r2]);
        throw TypeError(G(e10, ...Y, "Uint8Array"));
      }
      let el = async (e10, t2, r2) => {
        let n2 = await eo(t2, e10, "wrapKey");
        es(n2, e10);
        let a2 = await i.subtle.importKey("raw", r2, ...ei);
        return new Uint8Array(await i.subtle.wrapKey("raw", a2, n2, "AES-KW"));
      }, ec = async (e10, t2, r2) => {
        let n2 = await eo(t2, e10, "unwrapKey");
        es(n2, e10);
        let a2 = await i.subtle.unwrapKey("raw", r2, n2, "AES-KW", ...ei);
        return new Uint8Array(await i.subtle.exportKey("raw", a2));
      };
      async function eu(e10, t2, r2, n2, a2 = new Uint8Array(0), o2 = new Uint8Array(0)) {
        let c2;
        if (!s(e10)) throw TypeError(G(e10, ...Y));
        if (z(e10, "ECDH"), !s(t2)) throw TypeError(G(t2, ...Y));
        z(t2, "ECDH", "deriveBits");
        let d2 = u(f(l.encode(r2)), f(a2), f(o2), h(n2));
        return c2 = "X25519" === e10.algorithm.name ? 256 : "X448" === e10.algorithm.name ? 448 : Math.ceil(parseInt(e10.algorithm.namedCurve.substr(-3), 10) / 8) << 3, m(new Uint8Array(await i.subtle.deriveBits({ name: e10.algorithm.name, public: e10 }, t2, c2)), n2, d2);
      }
      async function ed(e10) {
        if (!s(e10)) throw TypeError(G(e10, ...Y));
        return i.subtle.generateKey(e10.algorithm, true, ["deriveBits"]);
      }
      function ep(e10) {
        if (!s(e10)) throw TypeError(G(e10, ...Y));
        return ["P-256", "P-384", "P-521"].includes(e10.algorithm.namedCurve) || "X25519" === e10.algorithm.name || "X448" === e10.algorithm.name;
      }
      async function eh(e10, t2, r2, n2) {
        !function(e11) {
          if (!(e11 instanceof Uint8Array) || e11.length < 8) throw new R("PBES2 Salt Input must be 8 or more octets");
        }(e10);
        let a2 = u(l.encode(t2), new Uint8Array([0]), e10), o2 = parseInt(t2.slice(13, 16), 10), c2 = { hash: `SHA-${t2.slice(8, 11)}`, iterations: r2, name: "PBKDF2", salt: a2 }, d2 = await function(e11, t3) {
          if (e11 instanceof Uint8Array) return i.subtle.importKey("raw", e11, "PBKDF2", false, ["deriveBits"]);
          if (s(e11)) return z(e11, t3, "deriveBits", "deriveKey"), e11;
          throw TypeError(G(e11, ...Y, "Uint8Array"));
        }(n2, t2);
        if (d2.usages.includes("deriveBits")) return new Uint8Array(await i.subtle.deriveBits(c2, d2, o2));
        if (d2.usages.includes("deriveKey")) return i.subtle.deriveKey(c2, d2, { length: o2, name: "AES-KW" }, false, ["wrapKey", "unwrapKey"]);
        throw TypeError('PBKDF2 key "usages" must include "deriveBits" or "deriveKey"');
      }
      let ef = async (e10, t2, r2, n2 = 2048, a2 = M(new Uint8Array(16))) => {
        let i2 = await eh(a2, e10, n2, t2);
        return { encryptedKey: await el(e10.slice(-6), i2, r2), p2c: n2, p2s: y(a2) };
      }, em = async (e10, t2, r2, n2, a2) => {
        let i2 = await eh(a2, e10, n2, t2);
        return ec(e10.slice(-6), i2, r2);
      };
      function eg(e10) {
        switch (e10) {
          case "RSA-OAEP":
          case "RSA-OAEP-256":
          case "RSA-OAEP-384":
          case "RSA-OAEP-512":
            return "RSA-OAEP";
          default:
            throw new A(`alg ${e10} is not supported either by JOSE or your javascript runtime`);
        }
      }
      let ey = (e10, t2) => {
        if (e10.startsWith("RS") || e10.startsWith("PS")) {
          let { modulusLength: r2 } = t2.algorithm;
          if ("number" != typeof r2 || r2 < 2048) throw TypeError(`${e10} requires key modulusLength to be 2048 bits or larger`);
        }
      }, eb = async (e10, t2, r2) => {
        if (!s(t2)) throw TypeError(G(t2, ...Y));
        if (z(t2, e10, "encrypt", "wrapKey"), ey(e10, t2), t2.usages.includes("encrypt")) return new Uint8Array(await i.subtle.encrypt(eg(e10), t2, r2));
        if (t2.usages.includes("wrapKey")) {
          let n2 = await i.subtle.importKey("raw", r2, ...ei);
          return new Uint8Array(await i.subtle.wrapKey("raw", n2, t2, eg(e10)));
        }
        throw TypeError('RSA-OAEP key "usages" must include "encrypt" or "wrapKey" for this operation');
      }, ew = async (e10, t2, r2) => {
        if (!s(t2)) throw TypeError(G(t2, ...Y));
        if (z(t2, e10, "decrypt", "unwrapKey"), ey(e10, t2), t2.usages.includes("decrypt")) return new Uint8Array(await i.subtle.decrypt(eg(e10), t2, r2));
        if (t2.usages.includes("unwrapKey")) {
          let n2 = await i.subtle.unwrapKey("raw", r2, t2, eg(e10), ...ei);
          return new Uint8Array(await i.subtle.exportKey("raw", n2));
        }
        throw TypeError('RSA-OAEP key "usages" must include "decrypt" or "unwrapKey" for this operation');
      };
      function ev(e10) {
        switch (e10) {
          case "A128GCM":
            return 128;
          case "A192GCM":
            return 192;
          case "A256GCM":
          case "A128CBC-HS256":
            return 256;
          case "A192CBC-HS384":
            return 384;
          case "A256CBC-HS512":
            return 512;
          default:
            throw new A(`Unsupported JWE Algorithm: ${e10}`);
        }
      }
      let e_ = (e10) => M(new Uint8Array(ev(e10) >> 3)), eS = (e10, t2) => {
        let r2 = (e10.match(/.{1,64}/g) || []).join("\n");
        return `-----BEGIN ${t2}-----
${r2}
-----END ${t2}-----`;
      }, eE = async (e10, t2, r2) => {
        if (!s(r2)) throw TypeError(G(r2, ...Y));
        if (!r2.extractable) throw TypeError("CryptoKey is not extractable");
        if (r2.type !== e10) throw TypeError(`key is not a ${e10} key`);
        return eS(g(new Uint8Array(await i.subtle.exportKey(t2, r2))), `${e10.toUpperCase()} KEY`);
      }, eA = (e10) => eE("public", "spki", e10), ek = (e10) => eE("private", "pkcs8", e10), ex = (e10, t2, r2 = 0) => {
        0 === r2 && (t2.unshift(t2.length), t2.unshift(6));
        let n2 = e10.indexOf(t2[0], r2);
        if (-1 === n2) return false;
        let a2 = e10.subarray(n2, n2 + t2.length);
        return a2.length === t2.length && (a2.every((e11, r3) => e11 === t2[r3]) || ex(e10, t2, n2 + 1));
      }, eR = (e10) => {
        switch (true) {
          case ex(e10, [42, 134, 72, 206, 61, 3, 1, 7]):
            return "P-256";
          case ex(e10, [43, 129, 4, 0, 34]):
            return "P-384";
          case ex(e10, [43, 129, 4, 0, 35]):
            return "P-521";
          case ex(e10, [43, 101, 110]):
            return "X25519";
          case ex(e10, [43, 101, 111]):
            return "X448";
          case ex(e10, [43, 101, 112]):
            return "Ed25519";
          case ex(e10, [43, 101, 113]):
            return "Ed448";
          default:
            throw new A("Invalid or unsupported EC Key Curve or OKP Key Sub Type");
        }
      }, eC = async (e10, t2, r2, n2, a2) => {
        var s2;
        let o2, l2;
        let c2 = new Uint8Array(atob(r2.replace(e10, "")).split("").map((e11) => e11.charCodeAt(0))), u2 = "spki" === t2;
        switch (n2) {
          case "PS256":
          case "PS384":
          case "PS512":
            o2 = { name: "RSA-PSS", hash: `SHA-${n2.slice(-3)}` }, l2 = u2 ? ["verify"] : ["sign"];
            break;
          case "RS256":
          case "RS384":
          case "RS512":
            o2 = { name: "RSASSA-PKCS1-v1_5", hash: `SHA-${n2.slice(-3)}` }, l2 = u2 ? ["verify"] : ["sign"];
            break;
          case "RSA-OAEP":
          case "RSA-OAEP-256":
          case "RSA-OAEP-384":
          case "RSA-OAEP-512":
            o2 = { name: "RSA-OAEP", hash: `SHA-${parseInt(n2.slice(-3), 10) || 1}` }, l2 = u2 ? ["encrypt", "wrapKey"] : ["decrypt", "unwrapKey"];
            break;
          case "ES256":
            o2 = { name: "ECDSA", namedCurve: "P-256" }, l2 = u2 ? ["verify"] : ["sign"];
            break;
          case "ES384":
            o2 = { name: "ECDSA", namedCurve: "P-384" }, l2 = u2 ? ["verify"] : ["sign"];
            break;
          case "ES512":
            o2 = { name: "ECDSA", namedCurve: "P-521" }, l2 = u2 ? ["verify"] : ["sign"];
            break;
          case "ECDH-ES":
          case "ECDH-ES+A128KW":
          case "ECDH-ES+A192KW":
          case "ECDH-ES+A256KW": {
            let e11 = eR(c2);
            o2 = e11.startsWith("P-") ? { name: "ECDH", namedCurve: e11 } : { name: e11 }, l2 = u2 ? [] : ["deriveBits"];
            break;
          }
          case "EdDSA":
            o2 = { name: eR(c2) }, l2 = u2 ? ["verify"] : ["sign"];
            break;
          default:
            throw new A('Invalid or unsupported "alg" (Algorithm) value');
        }
        return i.subtle.importKey(t2, c2, o2, null !== (s2 = null == a2 ? void 0 : a2.extractable) && void 0 !== s2 && s2, l2);
      }, eO = (e10, t2, r2) => eC(/(?:-----(?:BEGIN|END) PRIVATE KEY-----|\s)/g, "pkcs8", e10, t2, r2), eP = (e10, t2, r2) => eC(/(?:-----(?:BEGIN|END) PUBLIC KEY-----|\s)/g, "spki", e10, t2, r2);
      function eT(e10) {
        let t2 = [], r2 = 0;
        for (; r2 < e10.length; ) {
          let n2 = ej(e10.subarray(r2));
          t2.push(n2), r2 += n2.byteLength;
        }
        return t2;
      }
      function ej(e10) {
        let t2 = 0, r2 = 31 & e10[0];
        if (t2++, 31 === r2) {
          for (r2 = 0; e10[t2] >= 128; ) r2 = 128 * r2 + e10[t2] - 128, t2++;
          r2 = 128 * r2 + e10[t2] - 128, t2++;
        }
        let n2 = 0;
        if (e10[t2] < 128) n2 = e10[t2], t2++;
        else if (128 === n2) {
          for (n2 = 0; 0 !== e10[t2 + n2] || 0 !== e10[t2 + n2 + 1]; ) {
            if (n2 > e10.byteLength) throw TypeError("invalid indefinite form length");
            n2++;
          }
          let r3 = t2 + n2 + 2;
          return { byteLength: r3, contents: e10.subarray(t2, t2 + n2), raw: e10.subarray(0, r3) };
        } else {
          let r3 = 127 & e10[t2];
          t2++, n2 = 0;
          for (let a3 = 0; a3 < r3; a3++) n2 = 256 * n2 + e10[t2], t2++;
        }
        let a2 = t2 + n2;
        return { byteLength: a2, contents: e10.subarray(t2, a2), raw: e10.subarray(0, a2) };
      }
      let eI = (e10, t2, r2) => {
        let n2;
        try {
          n2 = eS(function(e11) {
            let t3 = eT(eT(ej(e11).contents)[0].contents);
            return g(t3[160 === t3[0].raw[0] ? 6 : 5].raw);
          }(b(e10.replace(/(?:-----(?:BEGIN|END) CERTIFICATE-----|\s)/g, ""))), "PUBLIC KEY");
        } catch (e11) {
          throw TypeError("Failed to parse the X.509 certificate", { cause: e11 });
        }
        return eP(n2, t2, r2);
      }, e$ = async (e10) => {
        var t2, r2;
        if (!e10.alg) throw TypeError('"alg" argument is required when "jwk.alg" is not present');
        let { algorithm: n2, keyUsages: a2 } = function(e11) {
          let t3, r3;
          switch (e11.kty) {
            case "oct":
              switch (e11.alg) {
                case "HS256":
                case "HS384":
                case "HS512":
                  t3 = { name: "HMAC", hash: `SHA-${e11.alg.slice(-3)}` }, r3 = ["sign", "verify"];
                  break;
                case "A128CBC-HS256":
                case "A192CBC-HS384":
                case "A256CBC-HS512":
                  throw new A(`${e11.alg} keys cannot be imported as CryptoKey instances`);
                case "A128GCM":
                case "A192GCM":
                case "A256GCM":
                case "A128GCMKW":
                case "A192GCMKW":
                case "A256GCMKW":
                  t3 = { name: "AES-GCM" }, r3 = ["encrypt", "decrypt"];
                  break;
                case "A128KW":
                case "A192KW":
                case "A256KW":
                  t3 = { name: "AES-KW" }, r3 = ["wrapKey", "unwrapKey"];
                  break;
                case "PBES2-HS256+A128KW":
                case "PBES2-HS384+A192KW":
                case "PBES2-HS512+A256KW":
                  t3 = { name: "PBKDF2" }, r3 = ["deriveBits"];
                  break;
                default:
                  throw new A('Invalid or unsupported JWK "alg" (Algorithm) Parameter value');
              }
              break;
            case "RSA":
              switch (e11.alg) {
                case "PS256":
                case "PS384":
                case "PS512":
                  t3 = { name: "RSA-PSS", hash: `SHA-${e11.alg.slice(-3)}` }, r3 = e11.d ? ["sign"] : ["verify"];
                  break;
                case "RS256":
                case "RS384":
                case "RS512":
                  t3 = { name: "RSASSA-PKCS1-v1_5", hash: `SHA-${e11.alg.slice(-3)}` }, r3 = e11.d ? ["sign"] : ["verify"];
                  break;
                case "RSA-OAEP":
                case "RSA-OAEP-256":
                case "RSA-OAEP-384":
                case "RSA-OAEP-512":
                  t3 = { name: "RSA-OAEP", hash: `SHA-${parseInt(e11.alg.slice(-3), 10) || 1}` }, r3 = e11.d ? ["decrypt", "unwrapKey"] : ["encrypt", "wrapKey"];
                  break;
                default:
                  throw new A('Invalid or unsupported JWK "alg" (Algorithm) Parameter value');
              }
              break;
            case "EC":
              switch (e11.alg) {
                case "ES256":
                  t3 = { name: "ECDSA", namedCurve: "P-256" }, r3 = e11.d ? ["sign"] : ["verify"];
                  break;
                case "ES384":
                  t3 = { name: "ECDSA", namedCurve: "P-384" }, r3 = e11.d ? ["sign"] : ["verify"];
                  break;
                case "ES512":
                  t3 = { name: "ECDSA", namedCurve: "P-521" }, r3 = e11.d ? ["sign"] : ["verify"];
                  break;
                case "ECDH-ES":
                case "ECDH-ES+A128KW":
                case "ECDH-ES+A192KW":
                case "ECDH-ES+A256KW":
                  t3 = { name: "ECDH", namedCurve: e11.crv }, r3 = e11.d ? ["deriveBits"] : [];
                  break;
                default:
                  throw new A('Invalid or unsupported JWK "alg" (Algorithm) Parameter value');
              }
              break;
            case "OKP":
              switch (e11.alg) {
                case "EdDSA":
                  t3 = { name: e11.crv }, r3 = e11.d ? ["sign"] : ["verify"];
                  break;
                case "ECDH-ES":
                case "ECDH-ES+A128KW":
                case "ECDH-ES+A192KW":
                case "ECDH-ES+A256KW":
                  t3 = { name: e11.crv }, r3 = e11.d ? ["deriveBits"] : [];
                  break;
                default:
                  throw new A('Invalid or unsupported JWK "alg" (Algorithm) Parameter value');
              }
              break;
            default:
              throw new A('Invalid or unsupported JWK "kty" (Key Type) Parameter value');
          }
          return { algorithm: t3, keyUsages: r3 };
        }(e10), s2 = [n2, null !== (t2 = e10.ext) && void 0 !== t2 && t2, null !== (r2 = e10.key_ops) && void 0 !== r2 ? r2 : a2];
        if ("PBKDF2" === n2.name) return i.subtle.importKey("raw", w(e10.k), ...s2);
        let o2 = { ...e10 };
        return delete o2.alg, delete o2.use, i.subtle.importKey("jwk", o2, ...s2);
      };
      async function eN(e10, t2, r2) {
        if ("string" != typeof e10 || 0 !== e10.indexOf("-----BEGIN PUBLIC KEY-----")) throw TypeError('"spki" must be SPKI formatted string');
        return eP(e10, t2, r2);
      }
      async function eM(e10, t2, r2) {
        if ("string" != typeof e10 || 0 !== e10.indexOf("-----BEGIN CERTIFICATE-----")) throw TypeError('"x509" must be X.509 formatted string');
        return eI(e10, t2, r2);
      }
      async function eD(e10, t2, r2) {
        if ("string" != typeof e10 || 0 !== e10.indexOf("-----BEGIN PRIVATE KEY-----")) throw TypeError('"pkcs8" must be PKCS#8 formatted string');
        return eO(e10, t2, r2);
      }
      async function eL(e10, t2, r2) {
        var n2;
        if (!ea(e10)) throw TypeError("JWK must be an object");
        switch (t2 || (t2 = e10.alg), e10.kty) {
          case "oct":
            if ("string" != typeof e10.k || !e10.k) throw TypeError('missing "k" (Key Value) Parameter value');
            if (null != r2 || (r2 = true !== e10.ext), r2) return e$({ ...e10, alg: t2, ext: null !== (n2 = e10.ext) && void 0 !== n2 && n2 });
            return w(e10.k);
          case "RSA":
            if (void 0 !== e10.oth) throw new A('RSA JWK "oth" (Other Primes Info) Parameter value is not supported');
          case "EC":
          case "OKP":
            return e$({ ...e10, alg: t2 });
          default:
            throw new A('Unsupported "kty" (Key Type) Parameter value');
        }
      }
      let eH = (e10, t2) => {
        if (!(t2 instanceof Uint8Array)) {
          if (!X(t2)) throw TypeError(V(e10, t2, ...Y, "Uint8Array"));
          if ("secret" !== t2.type) throw TypeError(`${Y.join(" or ")} instances for symmetric algorithms must be of type "secret"`);
        }
      }, eU = (e10, t2, r2) => {
        if (!X(t2)) throw TypeError(V(e10, t2, ...Y));
        if ("secret" === t2.type) throw TypeError(`${Y.join(" or ")} instances for asymmetric algorithms must not be of type "secret"`);
        if ("sign" === r2 && "public" === t2.type) throw TypeError(`${Y.join(" or ")} instances for asymmetric algorithm signing must be of type "private"`);
        if ("decrypt" === r2 && "public" === t2.type) throw TypeError(`${Y.join(" or ")} instances for asymmetric algorithm decryption must be of type "private"`);
        if (t2.algorithm && "verify" === r2 && "private" === t2.type) throw TypeError(`${Y.join(" or ")} instances for asymmetric algorithm verifying must be of type "public"`);
        if (t2.algorithm && "encrypt" === r2 && "private" === t2.type) throw TypeError(`${Y.join(" or ")} instances for asymmetric algorithm encryption must be of type "public"`);
      }, eq = (e10, t2, r2) => {
        e10.startsWith("HS") || "dir" === e10 || e10.startsWith("PBES2") || /^A\d{3}(?:GCM)?KW$/.test(e10) ? eH(e10, t2) : eU(e10, t2, r2);
      };
      async function eK(e10, t2, r2, n2, a2) {
        if (!(r2 instanceof Uint8Array)) throw TypeError(G(r2, "Uint8Array"));
        let s2 = parseInt(e10.slice(1, 4), 10), o2 = await i.subtle.importKey("raw", r2.subarray(s2 >> 3), "AES-CBC", false, ["encrypt"]), l2 = await i.subtle.importKey("raw", r2.subarray(0, s2 >> 3), { hash: `SHA-${s2 << 1}`, name: "HMAC" }, false, ["sign"]), c2 = new Uint8Array(await i.subtle.encrypt({ iv: n2, name: "AES-CBC" }, o2, t2)), d2 = u(a2, n2, c2, p(a2.length << 3));
        return { ciphertext: c2, tag: new Uint8Array((await i.subtle.sign("HMAC", l2, d2)).slice(0, s2 >> 3)) };
      }
      async function eW(e10, t2, r2, n2, a2) {
        let s2;
        r2 instanceof Uint8Array ? s2 = await i.subtle.importKey("raw", r2, "AES-GCM", false, ["encrypt"]) : (z(r2, e10, "encrypt"), s2 = r2);
        let o2 = new Uint8Array(await i.subtle.encrypt({ additionalData: a2, iv: n2, name: "AES-GCM", tagLength: 128 }, s2, t2)), l2 = o2.slice(-16);
        return { ciphertext: o2.slice(0, -16), tag: l2 };
      }
      let eF = async (e10, t2, r2, n2, a2) => {
        if (!s(r2) && !(r2 instanceof Uint8Array)) throw TypeError(G(r2, ...Y, "Uint8Array"));
        switch (H(e10, n2), e10) {
          case "A128CBC-HS256":
          case "A192CBC-HS384":
          case "A256CBC-HS512":
            return r2 instanceof Uint8Array && U(r2, parseInt(e10.slice(-3), 10)), eK(e10, t2, r2, n2, a2);
          case "A128GCM":
          case "A192GCM":
          case "A256GCM":
            return r2 instanceof Uint8Array && U(r2, parseInt(e10.slice(1, 4), 10)), eW(e10, t2, r2, n2, a2);
          default:
            throw new A("Unsupported JWE Content Encryption Algorithm");
        }
      };
      async function eJ(e10, t2, r2, n2) {
        let a2 = e10.slice(0, 7);
        n2 || (n2 = L(a2));
        let { ciphertext: i2, tag: s2 } = await eF(a2, r2, t2, n2, new Uint8Array(0));
        return { encryptedKey: i2, iv: y(n2), tag: y(s2) };
      }
      async function ez(e10, t2, r2, n2, a2) {
        return ee(e10.slice(0, 7), t2, r2, n2, a2, new Uint8Array(0));
      }
      async function eB(e10, t2, r2, n2, a2) {
        switch (eq(e10, t2, "decrypt"), e10) {
          case "dir":
            if (void 0 !== r2) throw new R("Encountered unexpected JWE Encrypted Key");
            return t2;
          case "ECDH-ES":
            if (void 0 !== r2) throw new R("Encountered unexpected JWE Encrypted Key");
          case "ECDH-ES+A128KW":
          case "ECDH-ES+A192KW":
          case "ECDH-ES+A256KW": {
            let a3, i2;
            if (!ea(n2.epk)) throw new R('JOSE Header "epk" (Ephemeral Public Key) missing or invalid');
            if (!ep(t2)) throw new A("ECDH with the provided key is not allowed or not supported by your javascript runtime");
            let s2 = await eL(n2.epk, e10);
            if (void 0 !== n2.apu) {
              if ("string" != typeof n2.apu) throw new R('JOSE Header "apu" (Agreement PartyUInfo) invalid');
              try {
                a3 = w(n2.apu);
              } catch (e11) {
                throw new R("Failed to base64url decode the apu");
              }
            }
            if (void 0 !== n2.apv) {
              if ("string" != typeof n2.apv) throw new R('JOSE Header "apv" (Agreement PartyVInfo) invalid');
              try {
                i2 = w(n2.apv);
              } catch (e11) {
                throw new R("Failed to base64url decode the apv");
              }
            }
            let o2 = await eu(s2, t2, "ECDH-ES" === e10 ? n2.enc : e10, "ECDH-ES" === e10 ? ev(n2.enc) : parseInt(e10.slice(-5, -2), 10), a3, i2);
            if ("ECDH-ES" === e10) return o2;
            if (void 0 === r2) throw new R("JWE Encrypted Key missing");
            return ec(e10.slice(-6), o2, r2);
          }
          case "RSA1_5":
          case "RSA-OAEP":
          case "RSA-OAEP-256":
          case "RSA-OAEP-384":
          case "RSA-OAEP-512":
            if (void 0 === r2) throw new R("JWE Encrypted Key missing");
            return ew(e10, t2, r2);
          case "PBES2-HS256+A128KW":
          case "PBES2-HS384+A192KW":
          case "PBES2-HS512+A256KW": {
            let i2;
            if (void 0 === r2) throw new R("JWE Encrypted Key missing");
            if ("number" != typeof n2.p2c) throw new R('JOSE Header "p2c" (PBES2 Count) missing or invalid');
            let s2 = (null == a2 ? void 0 : a2.maxPBES2Count) || 1e4;
            if (n2.p2c > s2) throw new R('JOSE Header "p2c" (PBES2 Count) out is of acceptable bounds');
            if ("string" != typeof n2.p2s) throw new R('JOSE Header "p2s" (PBES2 Salt) missing or invalid');
            try {
              i2 = w(n2.p2s);
            } catch (e11) {
              throw new R("Failed to base64url decode the p2s");
            }
            return em(e10, t2, r2, n2.p2c, i2);
          }
          case "A128KW":
          case "A192KW":
          case "A256KW":
            if (void 0 === r2) throw new R("JWE Encrypted Key missing");
            return ec(e10, t2, r2);
          case "A128GCMKW":
          case "A192GCMKW":
          case "A256GCMKW": {
            let a3, i2;
            if (void 0 === r2) throw new R("JWE Encrypted Key missing");
            if ("string" != typeof n2.iv) throw new R('JOSE Header "iv" (Initialization Vector) missing or invalid');
            if ("string" != typeof n2.tag) throw new R('JOSE Header "tag" (Authentication Tag) missing or invalid');
            try {
              a3 = w(n2.iv);
            } catch (e11) {
              throw new R("Failed to base64url decode the iv");
            }
            try {
              i2 = w(n2.tag);
            } catch (e11) {
              throw new R("Failed to base64url decode the tag");
            }
            return ez(e10, t2, r2, a3, i2);
          }
          default:
            throw new A('Invalid or unsupported "alg" (JWE Algorithm) header value');
        }
      }
      let eG = function(e10, t2, r2, n2, a2) {
        let i2;
        if (void 0 !== a2.crit && void 0 === n2.crit) throw new e10('"crit" (Critical) Header Parameter MUST be integrity protected');
        if (!n2 || void 0 === n2.crit) return /* @__PURE__ */ new Set();
        if (!Array.isArray(n2.crit) || 0 === n2.crit.length || n2.crit.some((e11) => "string" != typeof e11 || 0 === e11.length)) throw new e10('"crit" (Critical) Header Parameter MUST be an array of non-empty strings when present');
        for (let s2 of (i2 = void 0 !== r2 ? new Map([...Object.entries(r2), ...t2.entries()]) : t2, n2.crit)) {
          if (!i2.has(s2)) throw new A(`Extension Header Parameter "${s2}" is not recognized`);
          if (void 0 === a2[s2]) throw new e10(`Extension Header Parameter "${s2}" is missing`);
          if (i2.get(s2) && void 0 === n2[s2]) throw new e10(`Extension Header Parameter "${s2}" MUST be integrity protected`);
        }
        return new Set(n2.crit);
      }, eV = (e10, t2) => {
        if (void 0 !== t2 && (!Array.isArray(t2) || t2.some((e11) => "string" != typeof e11))) throw TypeError(`"${e10}" option must be an array of strings`);
        if (t2) return new Set(t2);
      };
      async function eX(e10, t2, r2) {
        var n2;
        let a2, i2, s2, o2, d2, p2, h2;
        if (!ea(e10)) throw new R("Flattened JWE must be an object");
        if (void 0 === e10.protected && void 0 === e10.header && void 0 === e10.unprotected) throw new R("JOSE Header missing");
        if ("string" != typeof e10.iv) throw new R("JWE Initialization Vector missing or incorrect type");
        if ("string" != typeof e10.ciphertext) throw new R("JWE Ciphertext missing or incorrect type");
        if ("string" != typeof e10.tag) throw new R("JWE Authentication Tag missing or incorrect type");
        if (void 0 !== e10.protected && "string" != typeof e10.protected) throw new R("JWE Protected Header incorrect type");
        if (void 0 !== e10.encrypted_key && "string" != typeof e10.encrypted_key) throw new R("JWE Encrypted Key incorrect type");
        if (void 0 !== e10.aad && "string" != typeof e10.aad) throw new R("JWE AAD incorrect type");
        if (void 0 !== e10.header && !ea(e10.header)) throw new R("JWE Shared Unprotected Header incorrect type");
        if (void 0 !== e10.unprotected && !ea(e10.unprotected)) throw new R("JWE Per-Recipient Unprotected Header incorrect type");
        if (e10.protected) try {
          let t3 = w(e10.protected);
          a2 = JSON.parse(c.decode(t3));
        } catch (e11) {
          throw new R("JWE Protected Header is invalid");
        }
        if (!en(a2, e10.header, e10.unprotected)) throw new R("JWE Protected, JWE Unprotected Header, and JWE Per-Recipient Unprotected Header Parameter names must be disjoint");
        let f2 = { ...a2, ...e10.header, ...e10.unprotected };
        if (eG(R, /* @__PURE__ */ new Map(), null == r2 ? void 0 : r2.crit, a2, f2), void 0 !== f2.zip) {
          if (!a2 || !a2.zip) throw new R('JWE "zip" (Compression Algorithm) Header MUST be integrity protected');
          if ("DEF" !== f2.zip) throw new A('Unsupported JWE "zip" (Compression Algorithm) Header Parameter value');
        }
        let { alg: m2, enc: g2 } = f2;
        if ("string" != typeof m2 || !m2) throw new R("missing JWE Algorithm (alg) in JWE Header");
        if ("string" != typeof g2 || !g2) throw new R("missing JWE Encryption Algorithm (enc) in JWE Header");
        let y2 = r2 && eV("keyManagementAlgorithms", r2.keyManagementAlgorithms), b2 = r2 && eV("contentEncryptionAlgorithms", r2.contentEncryptionAlgorithms);
        if (y2 && !y2.has(m2)) throw new E('"alg" (Algorithm) Header Parameter not allowed');
        if (b2 && !b2.has(g2)) throw new E('"enc" (Encryption Algorithm) Header Parameter not allowed');
        if (void 0 !== e10.encrypted_key) try {
          i2 = w(e10.encrypted_key);
        } catch (e11) {
          throw new R("Failed to base64url decode the encrypted_key");
        }
        let v2 = false;
        "function" == typeof t2 && (t2 = await t2(a2, e10), v2 = true);
        try {
          s2 = await eB(m2, t2, i2, f2, r2);
        } catch (e11) {
          if (e11 instanceof TypeError || e11 instanceof R || e11 instanceof A) throw e11;
          s2 = e_(g2);
        }
        try {
          o2 = w(e10.iv);
        } catch (e11) {
          throw new R("Failed to base64url decode the iv");
        }
        try {
          d2 = w(e10.tag);
        } catch (e11) {
          throw new R("Failed to base64url decode the tag");
        }
        let _2 = l.encode(null !== (n2 = e10.protected) && void 0 !== n2 ? n2 : "");
        p2 = void 0 !== e10.aad ? u(_2, l.encode("."), l.encode(e10.aad)) : _2;
        try {
          h2 = w(e10.ciphertext);
        } catch (e11) {
          throw new R("Failed to base64url decode the ciphertext");
        }
        let S2 = await ee(g2, s2, h2, o2, d2, p2);
        "DEF" === f2.zip && (S2 = await ((null == r2 ? void 0 : r2.inflateRaw) || et)(S2));
        let k2 = { plaintext: S2 };
        if (void 0 !== e10.protected && (k2.protectedHeader = a2), void 0 !== e10.aad) try {
          k2.additionalAuthenticatedData = w(e10.aad);
        } catch (e11) {
          throw new R("Failed to base64url decode the aad");
        }
        return (void 0 !== e10.unprotected && (k2.sharedUnprotectedHeader = e10.unprotected), void 0 !== e10.header && (k2.unprotectedHeader = e10.header), v2) ? { ...k2, key: t2 } : k2;
      }
      async function eY(e10, t2, r2) {
        if (e10 instanceof Uint8Array && (e10 = c.decode(e10)), "string" != typeof e10) throw new R("Compact JWE must be a string or Uint8Array");
        let { 0: n2, 1: a2, 2: i2, 3: s2, 4: o2, length: l2 } = e10.split(".");
        if (5 !== l2) throw new R("Invalid Compact JWE");
        let u2 = await eX({ ciphertext: s2, iv: i2 || void 0, protected: n2 || void 0, tag: o2 || void 0, encrypted_key: a2 || void 0 }, t2, r2), d2 = { plaintext: u2.plaintext, protectedHeader: u2.protectedHeader };
        return "function" == typeof t2 ? { ...d2, key: u2.key } : d2;
      }
      async function eZ(e10, t2, r2) {
        if (!ea(e10)) throw new R("General JWE must be an object");
        if (!Array.isArray(e10.recipients) || !e10.recipients.every(ea)) throw new R("JWE Recipients missing or incorrect type");
        if (!e10.recipients.length) throw new R("JWE Recipients has no members");
        for (let n2 of e10.recipients) try {
          return await eX({ aad: e10.aad, ciphertext: e10.ciphertext, encrypted_key: n2.encrypted_key, header: n2.header, iv: e10.iv, protected: e10.protected, tag: e10.tag, unprotected: e10.unprotected }, t2, r2);
        } catch (e11) {
        }
        throw new k();
      }
      let eQ = async (e10) => {
        if (e10 instanceof Uint8Array) return { kty: "oct", k: y(e10) };
        if (!s(e10)) throw TypeError(G(e10, ...Y, "Uint8Array"));
        if (!e10.extractable) throw TypeError("non-extractable CryptoKey cannot be exported as a JWK");
        let { ext: t2, key_ops: r2, alg: n2, use: a2, ...o2 } = await i.subtle.exportKey("jwk", e10);
        return o2;
      };
      async function e0(e10) {
        return eA(e10);
      }
      async function e1(e10) {
        return ek(e10);
      }
      async function e2(e10) {
        return eQ(e10);
      }
      async function e3(e10, t2, r2, n2, a2 = {}) {
        let i2, s2, o2;
        switch (eq(e10, r2, "encrypt"), e10) {
          case "dir":
            o2 = r2;
            break;
          case "ECDH-ES":
          case "ECDH-ES+A128KW":
          case "ECDH-ES+A192KW":
          case "ECDH-ES+A256KW": {
            if (!ep(r2)) throw new A("ECDH with the provided key is not allowed or not supported by your javascript runtime");
            let { apu: l2, apv: c2 } = a2, { epk: u2 } = a2;
            u2 || (u2 = (await ed(r2)).privateKey);
            let { x: d2, y: p2, crv: h2, kty: f2 } = await e2(u2), m2 = await eu(r2, u2, "ECDH-ES" === e10 ? t2 : e10, "ECDH-ES" === e10 ? ev(t2) : parseInt(e10.slice(-5, -2), 10), l2, c2);
            if (s2 = { epk: { x: d2, crv: h2, kty: f2 } }, "EC" === f2 && (s2.epk.y = p2), l2 && (s2.apu = y(l2)), c2 && (s2.apv = y(c2)), "ECDH-ES" === e10) {
              o2 = m2;
              break;
            }
            o2 = n2 || e_(t2);
            let g2 = e10.slice(-6);
            i2 = await el(g2, m2, o2);
            break;
          }
          case "RSA1_5":
          case "RSA-OAEP":
          case "RSA-OAEP-256":
          case "RSA-OAEP-384":
          case "RSA-OAEP-512":
            o2 = n2 || e_(t2), i2 = await eb(e10, r2, o2);
            break;
          case "PBES2-HS256+A128KW":
          case "PBES2-HS384+A192KW":
          case "PBES2-HS512+A256KW": {
            o2 = n2 || e_(t2);
            let { p2c: l2, p2s: c2 } = a2;
            ({ encryptedKey: i2, ...s2 } = await ef(e10, r2, o2, l2, c2));
            break;
          }
          case "A128KW":
          case "A192KW":
          case "A256KW":
            o2 = n2 || e_(t2), i2 = await el(e10, r2, o2);
            break;
          case "A128GCMKW":
          case "A192GCMKW":
          case "A256GCMKW": {
            o2 = n2 || e_(t2);
            let { iv: l2 } = a2;
            ({ encryptedKey: i2, ...s2 } = await eJ(e10, r2, o2, l2));
            break;
          }
          default:
            throw new A('Invalid or unsupported "alg" (JWE Algorithm) header value');
        }
        return { cek: o2, encryptedKey: i2, parameters: s2 };
      }
      let e6 = Symbol();
      class e5 {
        constructor(e10) {
          if (!(e10 instanceof Uint8Array)) throw TypeError("plaintext must be an instance of Uint8Array");
          this._plaintext = e10;
        }
        setKeyManagementParameters(e10) {
          if (this._keyManagementParameters) throw TypeError("setKeyManagementParameters can only be called once");
          return this._keyManagementParameters = e10, this;
        }
        setProtectedHeader(e10) {
          if (this._protectedHeader) throw TypeError("setProtectedHeader can only be called once");
          return this._protectedHeader = e10, this;
        }
        setSharedUnprotectedHeader(e10) {
          if (this._sharedUnprotectedHeader) throw TypeError("setSharedUnprotectedHeader can only be called once");
          return this._sharedUnprotectedHeader = e10, this;
        }
        setUnprotectedHeader(e10) {
          if (this._unprotectedHeader) throw TypeError("setUnprotectedHeader can only be called once");
          return this._unprotectedHeader = e10, this;
        }
        setAdditionalAuthenticatedData(e10) {
          return this._aad = e10, this;
        }
        setContentEncryptionKey(e10) {
          if (this._cek) throw TypeError("setContentEncryptionKey can only be called once");
          return this._cek = e10, this;
        }
        setInitializationVector(e10) {
          if (this._iv) throw TypeError("setInitializationVector can only be called once");
          return this._iv = e10, this;
        }
        async encrypt(e10, t2) {
          let r2, n2, a2, i2, s2, o2, d2;
          if (!this._protectedHeader && !this._unprotectedHeader && !this._sharedUnprotectedHeader) throw new R("either setProtectedHeader, setUnprotectedHeader, or sharedUnprotectedHeader must be called before #encrypt()");
          if (!en(this._protectedHeader, this._unprotectedHeader, this._sharedUnprotectedHeader)) throw new R("JWE Protected, JWE Shared Unprotected and JWE Per-Recipient Header Parameter names must be disjoint");
          let p2 = { ...this._protectedHeader, ...this._unprotectedHeader, ...this._sharedUnprotectedHeader };
          if (eG(R, /* @__PURE__ */ new Map(), null == t2 ? void 0 : t2.crit, this._protectedHeader, p2), void 0 !== p2.zip) {
            if (!this._protectedHeader || !this._protectedHeader.zip) throw new R('JWE "zip" (Compression Algorithm) Header MUST be integrity protected');
            if ("DEF" !== p2.zip) throw new A('Unsupported JWE "zip" (Compression Algorithm) Header Parameter value');
          }
          let { alg: h2, enc: f2 } = p2;
          if ("string" != typeof h2 || !h2) throw new R('JWE "alg" (Algorithm) Header Parameter missing or invalid');
          if ("string" != typeof f2 || !f2) throw new R('JWE "enc" (Encryption Algorithm) Header Parameter missing or invalid');
          if ("dir" === h2) {
            if (this._cek) throw TypeError("setContentEncryptionKey cannot be called when using Direct Encryption");
          } else if ("ECDH-ES" === h2 && this._cek) throw TypeError("setContentEncryptionKey cannot be called when using Direct Key Agreement");
          {
            let a3;
            ({ cek: n2, encryptedKey: r2, parameters: a3 } = await e3(h2, f2, e10, this._cek, this._keyManagementParameters)), a3 && (t2 && e6 in t2 ? this._unprotectedHeader ? this._unprotectedHeader = { ...this._unprotectedHeader, ...a3 } : this.setUnprotectedHeader(a3) : this._protectedHeader ? this._protectedHeader = { ...this._protectedHeader, ...a3 } : this.setProtectedHeader(a3));
          }
          if (this._iv || (this._iv = L(f2)), i2 = this._protectedHeader ? l.encode(y(JSON.stringify(this._protectedHeader))) : l.encode(""), this._aad ? (s2 = y(this._aad), a2 = u(i2, l.encode("."), l.encode(s2))) : a2 = i2, "DEF" === p2.zip) {
            let e11 = await ((null == t2 ? void 0 : t2.deflateRaw) || er)(this._plaintext);
            ({ ciphertext: o2, tag: d2 } = await eF(f2, e11, n2, this._iv, a2));
          } else ({ ciphertext: o2, tag: d2 } = await eF(f2, this._plaintext, n2, this._iv, a2));
          let m2 = { ciphertext: y(o2), iv: y(this._iv), tag: y(d2) };
          return r2 && (m2.encrypted_key = y(r2)), s2 && (m2.aad = s2), this._protectedHeader && (m2.protected = c.decode(i2)), this._sharedUnprotectedHeader && (m2.unprotected = this._sharedUnprotectedHeader), this._unprotectedHeader && (m2.header = this._unprotectedHeader), m2;
        }
      }
      class e8 {
        constructor(e10, t2, r2) {
          this.parent = e10, this.key = t2, this.options = r2;
        }
        setUnprotectedHeader(e10) {
          if (this.unprotectedHeader) throw TypeError("setUnprotectedHeader can only be called once");
          return this.unprotectedHeader = e10, this;
        }
        addRecipient(...e10) {
          return this.parent.addRecipient(...e10);
        }
        encrypt(...e10) {
          return this.parent.encrypt(...e10);
        }
        done() {
          return this.parent;
        }
      }
      class e4 {
        constructor(e10) {
          this._recipients = [], this._plaintext = e10;
        }
        addRecipient(e10, t2) {
          let r2 = new e8(this, e10, { crit: null == t2 ? void 0 : t2.crit });
          return this._recipients.push(r2), r2;
        }
        setProtectedHeader(e10) {
          if (this._protectedHeader) throw TypeError("setProtectedHeader can only be called once");
          return this._protectedHeader = e10, this;
        }
        setSharedUnprotectedHeader(e10) {
          if (this._unprotectedHeader) throw TypeError("setSharedUnprotectedHeader can only be called once");
          return this._unprotectedHeader = e10, this;
        }
        setAdditionalAuthenticatedData(e10) {
          return this._aad = e10, this;
        }
        async encrypt(e10) {
          var t2, r2, n2;
          let a2;
          if (!this._recipients.length) throw new R("at least one recipient must be added");
          if (e10 = { deflateRaw: null == e10 ? void 0 : e10.deflateRaw }, 1 === this._recipients.length) {
            let [t3] = this._recipients, r3 = await new e5(this._plaintext).setAdditionalAuthenticatedData(this._aad).setProtectedHeader(this._protectedHeader).setSharedUnprotectedHeader(this._unprotectedHeader).setUnprotectedHeader(t3.unprotectedHeader).encrypt(t3.key, { ...t3.options, ...e10 }), n3 = { ciphertext: r3.ciphertext, iv: r3.iv, recipients: [{}], tag: r3.tag };
            return r3.aad && (n3.aad = r3.aad), r3.protected && (n3.protected = r3.protected), r3.unprotected && (n3.unprotected = r3.unprotected), r3.encrypted_key && (n3.recipients[0].encrypted_key = r3.encrypted_key), r3.header && (n3.recipients[0].header = r3.header), n3;
          }
          for (let e11 = 0; e11 < this._recipients.length; e11++) {
            let t3 = this._recipients[e11];
            if (!en(this._protectedHeader, this._unprotectedHeader, t3.unprotectedHeader)) throw new R("JWE Protected, JWE Shared Unprotected and JWE Per-Recipient Header Parameter names must be disjoint");
            let r3 = { ...this._protectedHeader, ...this._unprotectedHeader, ...t3.unprotectedHeader }, { alg: n3 } = r3;
            if ("string" != typeof n3 || !n3) throw new R('JWE "alg" (Algorithm) Header Parameter missing or invalid');
            if ("dir" === n3 || "ECDH-ES" === n3) throw new R('"dir" and "ECDH-ES" alg may only be used with a single recipient');
            if ("string" != typeof r3.enc || !r3.enc) throw new R('JWE "enc" (Encryption Algorithm) Header Parameter missing or invalid');
            if (a2) {
              if (a2 !== r3.enc) throw new R('JWE "enc" (Encryption Algorithm) Header Parameter must be the same for all recipients');
            } else a2 = r3.enc;
            if (eG(R, /* @__PURE__ */ new Map(), t3.options.crit, this._protectedHeader, r3), void 0 !== r3.zip && (!this._protectedHeader || !this._protectedHeader.zip)) throw new R('JWE "zip" (Compression Algorithm) Header MUST be integrity protected');
          }
          let i2 = e_(a2), s2 = { ciphertext: "", iv: "", recipients: [], tag: "" };
          for (let o2 = 0; o2 < this._recipients.length; o2++) {
            let l2 = this._recipients[o2], c2 = {};
            s2.recipients.push(c2);
            let u2 = { ...this._protectedHeader, ...this._unprotectedHeader, ...l2.unprotectedHeader }.alg.startsWith("PBES2") ? 2048 + o2 : void 0;
            if (0 === o2) {
              let t3 = await new e5(this._plaintext).setAdditionalAuthenticatedData(this._aad).setContentEncryptionKey(i2).setProtectedHeader(this._protectedHeader).setSharedUnprotectedHeader(this._unprotectedHeader).setUnprotectedHeader(l2.unprotectedHeader).setKeyManagementParameters({ p2c: u2 }).encrypt(l2.key, { ...l2.options, ...e10, [e6]: true });
              s2.ciphertext = t3.ciphertext, s2.iv = t3.iv, s2.tag = t3.tag, t3.aad && (s2.aad = t3.aad), t3.protected && (s2.protected = t3.protected), t3.unprotected && (s2.unprotected = t3.unprotected), c2.encrypted_key = t3.encrypted_key, t3.header && (c2.header = t3.header);
              continue;
            }
            let { encryptedKey: d2, parameters: p2 } = await e3((null === (t2 = l2.unprotectedHeader) || void 0 === t2 ? void 0 : t2.alg) || (null === (r2 = this._protectedHeader) || void 0 === r2 ? void 0 : r2.alg) || (null === (n2 = this._unprotectedHeader) || void 0 === n2 ? void 0 : n2.alg), a2, l2.key, i2, { p2c: u2 });
            c2.encrypted_key = y(d2), (l2.unprotectedHeader || p2) && (c2.header = { ...l2.unprotectedHeader, ...p2 });
          }
          return s2;
        }
      }
      function e9(e10, t2) {
        let r2 = `SHA-${e10.slice(-3)}`;
        switch (e10) {
          case "HS256":
          case "HS384":
          case "HS512":
            return { hash: r2, name: "HMAC" };
          case "PS256":
          case "PS384":
          case "PS512":
            return { hash: r2, name: "RSA-PSS", saltLength: e10.slice(-3) >> 3 };
          case "RS256":
          case "RS384":
          case "RS512":
            return { hash: r2, name: "RSASSA-PKCS1-v1_5" };
          case "ES256":
          case "ES384":
          case "ES512":
            return { hash: r2, name: "ECDSA", namedCurve: t2.namedCurve };
          case "EdDSA":
            return { name: t2.name };
          default:
            throw new A(`alg ${e10} is not supported either by JOSE or your javascript runtime`);
        }
      }
      function e7(e10, t2, r2) {
        if (s(t2)) return !function(e11, t3, ...r3) {
          switch (t3) {
            case "HS256":
            case "HS384":
            case "HS512": {
              if (!W(e11.algorithm, "HMAC")) throw K("HMAC");
              let r4 = parseInt(t3.slice(2), 10);
              if (F(e11.algorithm.hash) !== r4) throw K(`SHA-${r4}`, "algorithm.hash");
              break;
            }
            case "RS256":
            case "RS384":
            case "RS512": {
              if (!W(e11.algorithm, "RSASSA-PKCS1-v1_5")) throw K("RSASSA-PKCS1-v1_5");
              let r4 = parseInt(t3.slice(2), 10);
              if (F(e11.algorithm.hash) !== r4) throw K(`SHA-${r4}`, "algorithm.hash");
              break;
            }
            case "PS256":
            case "PS384":
            case "PS512": {
              if (!W(e11.algorithm, "RSA-PSS")) throw K("RSA-PSS");
              let r4 = parseInt(t3.slice(2), 10);
              if (F(e11.algorithm.hash) !== r4) throw K(`SHA-${r4}`, "algorithm.hash");
              break;
            }
            case "EdDSA":
              if ("Ed25519" !== e11.algorithm.name && "Ed448" !== e11.algorithm.name) throw K("Ed25519 or Ed448");
              break;
            case "ES256":
            case "ES384":
            case "ES512": {
              if (!W(e11.algorithm, "ECDSA")) throw K("ECDSA");
              let r4 = function(e12) {
                switch (e12) {
                  case "ES256":
                    return "P-256";
                  case "ES384":
                    return "P-384";
                  case "ES512":
                    return "P-521";
                  default:
                    throw Error("unreachable");
                }
              }(t3);
              if (e11.algorithm.namedCurve !== r4) throw K(r4, "algorithm.namedCurve");
              break;
            }
            default:
              throw TypeError("CryptoKey does not support this operation");
          }
          J(e11, r3);
        }(t2, e10, r2), t2;
        if (t2 instanceof Uint8Array) {
          if (!e10.startsWith("HS")) throw TypeError(G(t2, ...Y));
          return i.subtle.importKey("raw", t2, { hash: `SHA-${e10.slice(-3)}`, name: "HMAC" }, false, [r2]);
        }
        throw TypeError(G(t2, ...Y, "Uint8Array"));
      }
      let te = async (e10, t2, r2, n2) => {
        let a2 = await e7(e10, t2, "verify");
        ey(e10, a2);
        let s2 = e9(e10, a2.algorithm);
        try {
          return await i.subtle.verify(s2, a2, r2, n2);
        } catch (e11) {
          return false;
        }
      };
      async function tt(e10, t2, r2) {
        var n2;
        let a2, i2;
        if (!ea(e10)) throw new C("Flattened JWS must be an object");
        if (void 0 === e10.protected && void 0 === e10.header) throw new C('Flattened JWS must have either of the "protected" or "header" members');
        if (void 0 !== e10.protected && "string" != typeof e10.protected) throw new C("JWS Protected Header incorrect type");
        if (void 0 === e10.payload) throw new C("JWS Payload missing");
        if ("string" != typeof e10.signature) throw new C("JWS Signature missing or incorrect type");
        if (void 0 !== e10.header && !ea(e10.header)) throw new C("JWS Unprotected Header incorrect type");
        let s2 = {};
        if (e10.protected) try {
          let t3 = w(e10.protected);
          s2 = JSON.parse(c.decode(t3));
        } catch (e11) {
          throw new C("JWS Protected Header is invalid");
        }
        if (!en(s2, e10.header)) throw new C("JWS Protected and JWS Unprotected Header Parameter names must be disjoint");
        let o2 = { ...s2, ...e10.header }, d2 = eG(C, /* @__PURE__ */ new Map([["b64", true]]), null == r2 ? void 0 : r2.crit, s2, o2), p2 = true;
        if (d2.has("b64") && "boolean" != typeof (p2 = s2.b64)) throw new C('The "b64" (base64url-encode payload) Header Parameter must be a boolean');
        let { alg: h2 } = o2;
        if ("string" != typeof h2 || !h2) throw new C('JWS "alg" (Algorithm) Header Parameter missing or invalid');
        let f2 = r2 && eV("algorithms", r2.algorithms);
        if (f2 && !f2.has(h2)) throw new E('"alg" (Algorithm) Header Parameter not allowed');
        if (p2) {
          if ("string" != typeof e10.payload) throw new C("JWS Payload must be a string");
        } else if ("string" != typeof e10.payload && !(e10.payload instanceof Uint8Array)) throw new C("JWS Payload must be a string or an Uint8Array instance");
        let m2 = false;
        "function" == typeof t2 && (t2 = await t2(s2, e10), m2 = true), eq(h2, t2, "verify");
        let g2 = u(l.encode(null !== (n2 = e10.protected) && void 0 !== n2 ? n2 : ""), l.encode("."), "string" == typeof e10.payload ? l.encode(e10.payload) : e10.payload);
        try {
          a2 = w(e10.signature);
        } catch (e11) {
          throw new C("Failed to base64url decode the signature");
        }
        if (!await te(h2, t2, a2, g2)) throw new N();
        if (p2) try {
          i2 = w(e10.payload);
        } catch (e11) {
          throw new C("Failed to base64url decode the payload");
        }
        else i2 = "string" == typeof e10.payload ? l.encode(e10.payload) : e10.payload;
        let y2 = { payload: i2 };
        return (void 0 !== e10.protected && (y2.protectedHeader = s2), void 0 !== e10.header && (y2.unprotectedHeader = e10.header), m2) ? { ...y2, key: t2 } : y2;
      }
      async function tr(e10, t2, r2) {
        if (e10 instanceof Uint8Array && (e10 = c.decode(e10)), "string" != typeof e10) throw new C("Compact JWS must be a string or Uint8Array");
        let { 0: n2, 1: a2, 2: i2, length: s2 } = e10.split(".");
        if (3 !== s2) throw new C("Invalid Compact JWS");
        let o2 = await tt({ payload: a2, protected: n2, signature: i2 }, t2, r2), l2 = { payload: o2.payload, protectedHeader: o2.protectedHeader };
        return "function" == typeof t2 ? { ...l2, key: o2.key } : l2;
      }
      async function tn(e10, t2, r2) {
        if (!ea(e10)) throw new C("General JWS must be an object");
        if (!Array.isArray(e10.signatures) || !e10.signatures.every(ea)) throw new C("JWS Signatures missing or incorrect type");
        for (let n2 of e10.signatures) try {
          return await tt({ header: n2.header, payload: e10.payload, protected: n2.protected, signature: n2.signature }, t2, r2);
        } catch (e11) {
        }
        throw new N();
      }
      let ta = (e10) => Math.floor(e10.getTime() / 1e3), ti = /^(\d+|\d+\.\d+) ?(seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)$/i, ts = (e10) => {
        let t2 = ti.exec(e10);
        if (!t2) throw TypeError("Invalid time period format");
        let r2 = parseFloat(t2[1]);
        switch (t2[2].toLowerCase()) {
          case "sec":
          case "secs":
          case "second":
          case "seconds":
          case "s":
            return Math.round(r2);
          case "minute":
          case "minutes":
          case "min":
          case "mins":
          case "m":
            return Math.round(60 * r2);
          case "hour":
          case "hours":
          case "hr":
          case "hrs":
          case "h":
            return Math.round(3600 * r2);
          case "day":
          case "days":
          case "d":
            return Math.round(86400 * r2);
          case "week":
          case "weeks":
          case "w":
            return Math.round(604800 * r2);
          default:
            return Math.round(31557600 * r2);
        }
      }, to = (e10) => e10.toLowerCase().replace(/^application\//, ""), tl = (e10, t2) => "string" == typeof e10 ? t2.includes(e10) : !!Array.isArray(e10) && t2.some(Set.prototype.has.bind(new Set(e10))), tc = (e10, t2, r2 = {}) => {
        let n2, a2;
        let { typ: i2 } = r2;
        if (i2 && ("string" != typeof e10.typ || to(e10.typ) !== to(i2))) throw new _('unexpected "typ" JWT header value', "typ", "check_failed");
        try {
          n2 = JSON.parse(c.decode(t2));
        } catch (e11) {
        }
        if (!ea(n2)) throw new O("JWT Claims Set must be a top-level JSON object");
        let { requiredClaims: s2 = [], issuer: o2, subject: l2, audience: u2, maxTokenAge: d2 } = r2;
        for (let e11 of (void 0 !== d2 && s2.push("iat"), void 0 !== u2 && s2.push("aud"), void 0 !== l2 && s2.push("sub"), void 0 !== o2 && s2.push("iss"), new Set(s2.reverse()))) if (!(e11 in n2)) throw new _(`missing required "${e11}" claim`, e11, "missing");
        if (o2 && !(Array.isArray(o2) ? o2 : [o2]).includes(n2.iss)) throw new _('unexpected "iss" claim value', "iss", "check_failed");
        if (l2 && n2.sub !== l2) throw new _('unexpected "sub" claim value', "sub", "check_failed");
        if (u2 && !tl(n2.aud, "string" == typeof u2 ? [u2] : u2)) throw new _('unexpected "aud" claim value', "aud", "check_failed");
        switch (typeof r2.clockTolerance) {
          case "string":
            a2 = ts(r2.clockTolerance);
            break;
          case "number":
            a2 = r2.clockTolerance;
            break;
          case "undefined":
            a2 = 0;
            break;
          default:
            throw TypeError("Invalid clockTolerance option type");
        }
        let { currentDate: p2 } = r2, h2 = ta(p2 || /* @__PURE__ */ new Date());
        if ((void 0 !== n2.iat || d2) && "number" != typeof n2.iat) throw new _('"iat" claim must be a number', "iat", "invalid");
        if (void 0 !== n2.nbf) {
          if ("number" != typeof n2.nbf) throw new _('"nbf" claim must be a number', "nbf", "invalid");
          if (n2.nbf > h2 + a2) throw new _('"nbf" claim timestamp check failed', "nbf", "check_failed");
        }
        if (void 0 !== n2.exp) {
          if ("number" != typeof n2.exp) throw new _('"exp" claim must be a number', "exp", "invalid");
          if (n2.exp <= h2 - a2) throw new S('"exp" claim timestamp check failed', "exp", "check_failed");
        }
        if (d2) {
          let e11 = h2 - n2.iat;
          if (e11 - a2 > ("number" == typeof d2 ? d2 : ts(d2))) throw new S('"iat" claim timestamp check failed (too far in the past)', "iat", "check_failed");
          if (e11 < 0 - a2) throw new _('"iat" claim timestamp check failed (it should be in the past)', "iat", "check_failed");
        }
        return n2;
      };
      async function tu(e10, t2, r2) {
        var n2;
        let a2 = await tr(e10, t2, r2);
        if ((null === (n2 = a2.protectedHeader.crit) || void 0 === n2 ? void 0 : n2.includes("b64")) && false === a2.protectedHeader.b64) throw new O("JWTs MUST NOT use unencoded payload");
        let i2 = { payload: tc(a2.protectedHeader, a2.payload, r2), protectedHeader: a2.protectedHeader };
        return "function" == typeof t2 ? { ...i2, key: a2.key } : i2;
      }
      async function td(e10, t2, r2) {
        let n2 = await eY(e10, t2, r2), a2 = tc(n2.protectedHeader, n2.plaintext, r2), { protectedHeader: i2 } = n2;
        if (void 0 !== i2.iss && i2.iss !== a2.iss) throw new _('replicated "iss" claim header parameter mismatch', "iss", "mismatch");
        if (void 0 !== i2.sub && i2.sub !== a2.sub) throw new _('replicated "sub" claim header parameter mismatch', "sub", "mismatch");
        if (void 0 !== i2.aud && JSON.stringify(i2.aud) !== JSON.stringify(a2.aud)) throw new _('replicated "aud" claim header parameter mismatch', "aud", "mismatch");
        let s2 = { payload: a2, protectedHeader: i2 };
        return "function" == typeof t2 ? { ...s2, key: n2.key } : s2;
      }
      class tp {
        constructor(e10) {
          this._flattened = new e5(e10);
        }
        setContentEncryptionKey(e10) {
          return this._flattened.setContentEncryptionKey(e10), this;
        }
        setInitializationVector(e10) {
          return this._flattened.setInitializationVector(e10), this;
        }
        setProtectedHeader(e10) {
          return this._flattened.setProtectedHeader(e10), this;
        }
        setKeyManagementParameters(e10) {
          return this._flattened.setKeyManagementParameters(e10), this;
        }
        async encrypt(e10, t2) {
          let r2 = await this._flattened.encrypt(e10, t2);
          return [r2.protected, r2.encrypted_key, r2.iv, r2.ciphertext, r2.tag].join(".");
        }
      }
      let th = async (e10, t2, r2) => {
        let n2 = await e7(e10, t2, "sign");
        return ey(e10, n2), new Uint8Array(await i.subtle.sign(e9(e10, n2.algorithm), n2, r2));
      };
      class tf {
        constructor(e10) {
          if (!(e10 instanceof Uint8Array)) throw TypeError("payload must be an instance of Uint8Array");
          this._payload = e10;
        }
        setProtectedHeader(e10) {
          if (this._protectedHeader) throw TypeError("setProtectedHeader can only be called once");
          return this._protectedHeader = e10, this;
        }
        setUnprotectedHeader(e10) {
          if (this._unprotectedHeader) throw TypeError("setUnprotectedHeader can only be called once");
          return this._unprotectedHeader = e10, this;
        }
        async sign(e10, t2) {
          let r2;
          if (!this._protectedHeader && !this._unprotectedHeader) throw new C("either setProtectedHeader or setUnprotectedHeader must be called before #sign()");
          if (!en(this._protectedHeader, this._unprotectedHeader)) throw new C("JWS Protected and JWS Unprotected Header Parameter names must be disjoint");
          let n2 = { ...this._protectedHeader, ...this._unprotectedHeader }, a2 = eG(C, /* @__PURE__ */ new Map([["b64", true]]), null == t2 ? void 0 : t2.crit, this._protectedHeader, n2), i2 = true;
          if (a2.has("b64") && "boolean" != typeof (i2 = this._protectedHeader.b64)) throw new C('The "b64" (base64url-encode payload) Header Parameter must be a boolean');
          let { alg: s2 } = n2;
          if ("string" != typeof s2 || !s2) throw new C('JWS "alg" (Algorithm) Header Parameter missing or invalid');
          eq(s2, e10, "sign");
          let o2 = this._payload;
          i2 && (o2 = l.encode(y(o2)));
          let d2 = u(r2 = this._protectedHeader ? l.encode(y(JSON.stringify(this._protectedHeader))) : l.encode(""), l.encode("."), o2), p2 = { signature: y(await th(s2, e10, d2)), payload: "" };
          return i2 && (p2.payload = c.decode(o2)), this._unprotectedHeader && (p2.header = this._unprotectedHeader), this._protectedHeader && (p2.protected = c.decode(r2)), p2;
        }
      }
      class tm {
        constructor(e10) {
          this._flattened = new tf(e10);
        }
        setProtectedHeader(e10) {
          return this._flattened.setProtectedHeader(e10), this;
        }
        async sign(e10, t2) {
          let r2 = await this._flattened.sign(e10, t2);
          if (void 0 === r2.payload) throw TypeError("use the flattened module for creating JWS with b64: false");
          return `${r2.protected}.${r2.payload}.${r2.signature}`;
        }
      }
      class tg {
        constructor(e10, t2, r2) {
          this.parent = e10, this.key = t2, this.options = r2;
        }
        setProtectedHeader(e10) {
          if (this.protectedHeader) throw TypeError("setProtectedHeader can only be called once");
          return this.protectedHeader = e10, this;
        }
        setUnprotectedHeader(e10) {
          if (this.unprotectedHeader) throw TypeError("setUnprotectedHeader can only be called once");
          return this.unprotectedHeader = e10, this;
        }
        addSignature(...e10) {
          return this.parent.addSignature(...e10);
        }
        sign(...e10) {
          return this.parent.sign(...e10);
        }
        done() {
          return this.parent;
        }
      }
      class ty {
        constructor(e10) {
          this._signatures = [], this._payload = e10;
        }
        addSignature(e10, t2) {
          let r2 = new tg(this, e10, t2);
          return this._signatures.push(r2), r2;
        }
        async sign() {
          if (!this._signatures.length) throw new C("at least one signature must be added");
          let e10 = { signatures: [], payload: "" };
          for (let t2 = 0; t2 < this._signatures.length; t2++) {
            let r2 = this._signatures[t2], n2 = new tf(this._payload);
            n2.setProtectedHeader(r2.protectedHeader), n2.setUnprotectedHeader(r2.unprotectedHeader);
            let { payload: a2, ...i2 } = await n2.sign(r2.key, r2.options);
            if (0 === t2) e10.payload = a2;
            else if (e10.payload !== a2) throw new C("inconsistent use of JWS Unencoded Payload (RFC7797)");
            e10.signatures.push(i2);
          }
          return e10;
        }
      }
      class tb {
        constructor(e10) {
          if (!ea(e10)) throw TypeError("JWT Claims Set MUST be an object");
          this._payload = e10;
        }
        setIssuer(e10) {
          return this._payload = { ...this._payload, iss: e10 }, this;
        }
        setSubject(e10) {
          return this._payload = { ...this._payload, sub: e10 }, this;
        }
        setAudience(e10) {
          return this._payload = { ...this._payload, aud: e10 }, this;
        }
        setJti(e10) {
          return this._payload = { ...this._payload, jti: e10 }, this;
        }
        setNotBefore(e10) {
          return "number" == typeof e10 ? this._payload = { ...this._payload, nbf: e10 } : this._payload = { ...this._payload, nbf: ta(/* @__PURE__ */ new Date()) + ts(e10) }, this;
        }
        setExpirationTime(e10) {
          return "number" == typeof e10 ? this._payload = { ...this._payload, exp: e10 } : this._payload = { ...this._payload, exp: ta(/* @__PURE__ */ new Date()) + ts(e10) }, this;
        }
        setIssuedAt(e10) {
          return void 0 === e10 ? this._payload = { ...this._payload, iat: ta(/* @__PURE__ */ new Date()) } : this._payload = { ...this._payload, iat: e10 }, this;
        }
      }
      class tw extends tb {
        setProtectedHeader(e10) {
          return this._protectedHeader = e10, this;
        }
        async sign(e10, t2) {
          var r2;
          let n2 = new tm(l.encode(JSON.stringify(this._payload)));
          if (n2.setProtectedHeader(this._protectedHeader), Array.isArray(null === (r2 = this._protectedHeader) || void 0 === r2 ? void 0 : r2.crit) && this._protectedHeader.crit.includes("b64") && false === this._protectedHeader.b64) throw new O("JWTs MUST NOT use unencoded payload");
          return n2.sign(e10, t2);
        }
      }
      class tv extends tb {
        setProtectedHeader(e10) {
          if (this._protectedHeader) throw TypeError("setProtectedHeader can only be called once");
          return this._protectedHeader = e10, this;
        }
        setKeyManagementParameters(e10) {
          if (this._keyManagementParameters) throw TypeError("setKeyManagementParameters can only be called once");
          return this._keyManagementParameters = e10, this;
        }
        setContentEncryptionKey(e10) {
          if (this._cek) throw TypeError("setContentEncryptionKey can only be called once");
          return this._cek = e10, this;
        }
        setInitializationVector(e10) {
          if (this._iv) throw TypeError("setInitializationVector can only be called once");
          return this._iv = e10, this;
        }
        replicateIssuerAsHeader() {
          return this._replicateIssuerAsHeader = true, this;
        }
        replicateSubjectAsHeader() {
          return this._replicateSubjectAsHeader = true, this;
        }
        replicateAudienceAsHeader() {
          return this._replicateAudienceAsHeader = true, this;
        }
        async encrypt(e10, t2) {
          let r2 = new tp(l.encode(JSON.stringify(this._payload)));
          return this._replicateIssuerAsHeader && (this._protectedHeader = { ...this._protectedHeader, iss: this._payload.iss }), this._replicateSubjectAsHeader && (this._protectedHeader = { ...this._protectedHeader, sub: this._payload.sub }), this._replicateAudienceAsHeader && (this._protectedHeader = { ...this._protectedHeader, aud: this._payload.aud }), r2.setProtectedHeader(this._protectedHeader), this._iv && r2.setInitializationVector(this._iv), this._cek && r2.setContentEncryptionKey(this._cek), this._keyManagementParameters && r2.setKeyManagementParameters(this._keyManagementParameters), r2.encrypt(e10, t2);
        }
      }
      let t_ = (e10, t2) => {
        if ("string" != typeof e10 || !e10) throw new P(`${t2} missing or invalid`);
      };
      async function tS(e10, t2) {
        let r2;
        if (!ea(e10)) throw TypeError("JWK must be an object");
        if (null != t2 || (t2 = "sha256"), "sha256" !== t2 && "sha384" !== t2 && "sha512" !== t2) throw TypeError('digestAlgorithm must one of "sha256", "sha384", or "sha512"');
        switch (e10.kty) {
          case "EC":
            t_(e10.crv, '"crv" (Curve) Parameter'), t_(e10.x, '"x" (X Coordinate) Parameter'), t_(e10.y, '"y" (Y Coordinate) Parameter'), r2 = { crv: e10.crv, kty: e10.kty, x: e10.x, y: e10.y };
            break;
          case "OKP":
            t_(e10.crv, '"crv" (Subtype of Key Pair) Parameter'), t_(e10.x, '"x" (Public Key) Parameter'), r2 = { crv: e10.crv, kty: e10.kty, x: e10.x };
            break;
          case "RSA":
            t_(e10.e, '"e" (Exponent) Parameter'), t_(e10.n, '"n" (Modulus) Parameter'), r2 = { e: e10.e, kty: e10.kty, n: e10.n };
            break;
          case "oct":
            t_(e10.k, '"k" (Key Value) Parameter'), r2 = { k: e10.k, kty: e10.kty };
            break;
          default:
            throw new A('"kty" (Key Type) Parameter missing or unsupported');
        }
        let n2 = l.encode(JSON.stringify(r2));
        return y(await o(t2, n2));
      }
      async function tE(e10, t2) {
        null != t2 || (t2 = "sha256");
        let r2 = await tS(e10, t2);
        return `urn:ietf:params:oauth:jwk-thumbprint:sha-${t2.slice(-3)}:${r2}`;
      }
      async function tA(e10, t2) {
        let r2 = { ...e10, ...null == t2 ? void 0 : t2.header };
        if (!ea(r2.jwk)) throw new C('"jwk" (JSON Web Key) Header Parameter must be a JSON object');
        let n2 = await eL({ ...r2.jwk, ext: true }, r2.alg, true);
        if (n2 instanceof Uint8Array || "public" !== n2.type) throw new C('"jwk" (JSON Web Key) Header Parameter must be a public key');
        return n2;
      }
      function tk(e10) {
        return e10 && "object" == typeof e10 && Array.isArray(e10.keys) && e10.keys.every(tx);
      }
      function tx(e10) {
        return ea(e10);
      }
      class tR {
        constructor(e10) {
          if (this._cached = /* @__PURE__ */ new WeakMap(), !tk(e10)) throw new T("JSON Web Key Set malformed");
          this._jwks = function(e11) {
            return "function" == typeof structuredClone ? structuredClone(e11) : JSON.parse(JSON.stringify(e11));
          }(e10);
        }
        async getKey(e10, t2) {
          let { alg: r2, kid: n2 } = { ...e10, ...null == t2 ? void 0 : t2.header }, a2 = function(e11) {
            switch ("string" == typeof e11 && e11.slice(0, 2)) {
              case "RS":
              case "PS":
                return "RSA";
              case "ES":
                return "EC";
              case "Ed":
                return "OKP";
              default:
                throw new A('Unsupported "alg" value for a JSON Web Key Set');
            }
          }(r2), i2 = this._jwks.keys.filter((e11) => {
            let t3 = a2 === e11.kty;
            if (t3 && "string" == typeof n2 && (t3 = n2 === e11.kid), t3 && "string" == typeof e11.alg && (t3 = r2 === e11.alg), t3 && "string" == typeof e11.use && (t3 = "sig" === e11.use), t3 && Array.isArray(e11.key_ops) && (t3 = e11.key_ops.includes("verify")), t3 && "EdDSA" === r2 && (t3 = "Ed25519" === e11.crv || "Ed448" === e11.crv), t3) switch (r2) {
              case "ES256":
                t3 = "P-256" === e11.crv;
                break;
              case "ES256K":
                t3 = "secp256k1" === e11.crv;
                break;
              case "ES384":
                t3 = "P-384" === e11.crv;
                break;
              case "ES512":
                t3 = "P-521" === e11.crv;
            }
            return t3;
          }), { 0: s2, length: o2 } = i2;
          if (0 === o2) throw new j();
          if (1 !== o2) {
            let e11 = new I(), { _cached: t3 } = this;
            throw e11[Symbol.asyncIterator] = async function* () {
              for (let e12 of i2) try {
                yield await tC(t3, e12, r2);
              } catch (e13) {
                continue;
              }
            }, e11;
          }
          return tC(this._cached, s2, r2);
        }
      }
      async function tC(e10, t2, r2) {
        let n2 = e10.get(t2) || e10.set(t2, {}).get(t2);
        if (void 0 === n2[r2]) {
          let e11 = await eL({ ...t2, ext: true }, r2);
          if (e11 instanceof Uint8Array || "public" !== e11.type) throw new T("JSON Web Key Set members must be public keys");
          n2[r2] = e11;
        }
        return n2[r2];
      }
      function tO(e10) {
        let t2 = new tR(e10);
        return async function(e11, r2) {
          return t2.getKey(e11, r2);
        };
      }
      let tP = async (e10, t2, r2) => {
        let n2, a2;
        let i2 = false;
        "function" == typeof AbortController && (n2 = new AbortController(), a2 = setTimeout(() => {
          i2 = true, n2.abort();
        }, t2));
        let s2 = await fetch(e10.href, { signal: n2 ? n2.signal : void 0, redirect: "manual", headers: r2.headers }).catch((e11) => {
          if (i2) throw new $();
          throw e11;
        });
        if (void 0 !== a2 && clearTimeout(a2), 200 !== s2.status) throw new v("Expected 200 OK from the JSON Web Key Set HTTP response");
        try {
          return await s2.json();
        } catch (e11) {
          throw new v("Failed to parse the JSON Web Key Set HTTP response as JSON");
        }
      };
      class tT extends tR {
        constructor(e10, t2) {
          if (super({ keys: [] }), this._jwks = void 0, !(e10 instanceof URL)) throw TypeError("url must be an instance of URL");
          this._url = new URL(e10.href), this._options = { agent: null == t2 ? void 0 : t2.agent, headers: null == t2 ? void 0 : t2.headers }, this._timeoutDuration = "number" == typeof (null == t2 ? void 0 : t2.timeoutDuration) ? null == t2 ? void 0 : t2.timeoutDuration : 5e3, this._cooldownDuration = "number" == typeof (null == t2 ? void 0 : t2.cooldownDuration) ? null == t2 ? void 0 : t2.cooldownDuration : 3e4, this._cacheMaxAge = "number" == typeof (null == t2 ? void 0 : t2.cacheMaxAge) ? null == t2 ? void 0 : t2.cacheMaxAge : 6e5;
        }
        coolingDown() {
          return "number" == typeof this._jwksTimestamp && Date.now() < this._jwksTimestamp + this._cooldownDuration;
        }
        fresh() {
          return "number" == typeof this._jwksTimestamp && Date.now() < this._jwksTimestamp + this._cacheMaxAge;
        }
        async getKey(e10, t2) {
          this._jwks && this.fresh() || await this.reload();
          try {
            return await super.getKey(e10, t2);
          } catch (r2) {
            if (r2 instanceof j && false === this.coolingDown()) return await this.reload(), super.getKey(e10, t2);
            throw r2;
          }
        }
        async reload() {
          this._pendingFetch && ("undefined" != typeof WebSocketPair || "undefined" != typeof navigator && "Cloudflare-Workers" === navigator.userAgent) && (this._pendingFetch = void 0), this._pendingFetch || (this._pendingFetch = tP(this._url, this._timeoutDuration, this._options).then((e10) => {
            if (!tk(e10)) throw new T("JSON Web Key Set malformed");
            this._jwks = { keys: e10.keys }, this._jwksTimestamp = Date.now(), this._pendingFetch = void 0;
          }).catch((e10) => {
            throw this._pendingFetch = void 0, e10;
          })), await this._pendingFetch;
        }
      }
      function tj(e10, t2) {
        let r2 = new tT(e10, t2);
        return async function(e11, t3) {
          return r2.getKey(e11, t3);
        };
      }
      class tI extends tb {
        encode() {
          let e10 = y(JSON.stringify({ alg: "none" })), t2 = y(JSON.stringify(this._payload));
          return `${e10}.${t2}.`;
        }
        static decode(e10, t2) {
          let r2;
          if ("string" != typeof e10) throw new O("Unsecured JWT must be a string");
          let { 0: n2, 1: a2, 2: i2, length: s2 } = e10.split(".");
          if (3 !== s2 || "" !== i2) throw new O("Invalid Unsecured JWT");
          try {
            if (r2 = JSON.parse(c.decode(w(n2))), "none" !== r2.alg) throw Error();
          } catch (e11) {
            throw new O("Invalid Unsecured JWT");
          }
          return { payload: tc(r2, w(a2), t2), header: r2 };
        }
      }
      let t$ = y, tN = w;
      function tM(e10) {
        let t2;
        if ("string" == typeof e10) {
          let r2 = e10.split(".");
          (3 === r2.length || 5 === r2.length) && ([t2] = r2);
        } else if ("object" == typeof e10 && e10) {
          if ("protected" in e10) t2 = e10.protected;
          else throw TypeError("Token does not contain a Protected Header");
        }
        try {
          if ("string" != typeof t2 || !t2) throw Error();
          let e11 = JSON.parse(c.decode(tN(t2)));
          if (!ea(e11)) throw Error();
          return e11;
        } catch (e11) {
          throw TypeError("Invalid Token or Protected Header formatting");
        }
      }
      function tD(e10) {
        let t2, r2;
        if ("string" != typeof e10) throw new O("JWTs must use Compact JWS serialization, JWT must be a string");
        let { 1: n2, length: a2 } = e10.split(".");
        if (5 === a2) throw new O("Only JWTs using Compact JWS serialization can be decoded");
        if (3 !== a2) throw new O("Invalid JWT");
        if (!n2) throw new O("JWTs must contain a payload");
        try {
          t2 = tN(n2);
        } catch (e11) {
          throw new O("Failed to base64url decode the payload");
        }
        try {
          r2 = JSON.parse(c.decode(t2));
        } catch (e11) {
          throw new O("Failed to parse the decoded payload as JSON");
        }
        if (!ea(r2)) throw new O("Invalid JWT Claims Set");
        return r2;
      }
      async function tL(e10, t2) {
        var r2;
        let n2, a2, s2;
        switch (e10) {
          case "HS256":
          case "HS384":
          case "HS512":
            n2 = parseInt(e10.slice(-3), 10), a2 = { name: "HMAC", hash: `SHA-${n2}`, length: n2 }, s2 = ["sign", "verify"];
            break;
          case "A128CBC-HS256":
          case "A192CBC-HS384":
          case "A256CBC-HS512":
            return M(new Uint8Array((n2 = parseInt(e10.slice(-3), 10)) >> 3));
          case "A128KW":
          case "A192KW":
          case "A256KW":
            a2 = { name: "AES-KW", length: n2 = parseInt(e10.slice(1, 4), 10) }, s2 = ["wrapKey", "unwrapKey"];
            break;
          case "A128GCMKW":
          case "A192GCMKW":
          case "A256GCMKW":
          case "A128GCM":
          case "A192GCM":
          case "A256GCM":
            a2 = { name: "AES-GCM", length: n2 = parseInt(e10.slice(1, 4), 10) }, s2 = ["encrypt", "decrypt"];
            break;
          default:
            throw new A('Invalid or unsupported JWK "alg" (Algorithm) Parameter value');
        }
        return i.subtle.generateKey(a2, null !== (r2 = null == t2 ? void 0 : t2.extractable) && void 0 !== r2 && r2, s2);
      }
      function tH(e10) {
        var t2;
        let r2 = null !== (t2 = null == e10 ? void 0 : e10.modulusLength) && void 0 !== t2 ? t2 : 2048;
        if ("number" != typeof r2 || r2 < 2048) throw new A("Invalid or unsupported modulusLength option provided, 2048 bits or larger keys must be used");
        return r2;
      }
      async function tU(e10, t2) {
        var r2, n2, a2;
        let s2, o2;
        switch (e10) {
          case "PS256":
          case "PS384":
          case "PS512":
            s2 = { name: "RSA-PSS", hash: `SHA-${e10.slice(-3)}`, publicExponent: new Uint8Array([1, 0, 1]), modulusLength: tH(t2) }, o2 = ["sign", "verify"];
            break;
          case "RS256":
          case "RS384":
          case "RS512":
            s2 = { name: "RSASSA-PKCS1-v1_5", hash: `SHA-${e10.slice(-3)}`, publicExponent: new Uint8Array([1, 0, 1]), modulusLength: tH(t2) }, o2 = ["sign", "verify"];
            break;
          case "RSA-OAEP":
          case "RSA-OAEP-256":
          case "RSA-OAEP-384":
          case "RSA-OAEP-512":
            s2 = { name: "RSA-OAEP", hash: `SHA-${parseInt(e10.slice(-3), 10) || 1}`, publicExponent: new Uint8Array([1, 0, 1]), modulusLength: tH(t2) }, o2 = ["decrypt", "unwrapKey", "encrypt", "wrapKey"];
            break;
          case "ES256":
            s2 = { name: "ECDSA", namedCurve: "P-256" }, o2 = ["sign", "verify"];
            break;
          case "ES384":
            s2 = { name: "ECDSA", namedCurve: "P-384" }, o2 = ["sign", "verify"];
            break;
          case "ES512":
            s2 = { name: "ECDSA", namedCurve: "P-521" }, o2 = ["sign", "verify"];
            break;
          case "EdDSA":
            o2 = ["sign", "verify"];
            let l2 = null !== (r2 = null == t2 ? void 0 : t2.crv) && void 0 !== r2 ? r2 : "Ed25519";
            switch (l2) {
              case "Ed25519":
              case "Ed448":
                s2 = { name: l2 };
                break;
              default:
                throw new A("Invalid or unsupported crv option provided");
            }
            break;
          case "ECDH-ES":
          case "ECDH-ES+A128KW":
          case "ECDH-ES+A192KW":
          case "ECDH-ES+A256KW": {
            o2 = ["deriveKey", "deriveBits"];
            let e11 = null !== (n2 = null == t2 ? void 0 : t2.crv) && void 0 !== n2 ? n2 : "P-256";
            switch (e11) {
              case "P-256":
              case "P-384":
              case "P-521":
                s2 = { name: "ECDH", namedCurve: e11 };
                break;
              case "X25519":
              case "X448":
                s2 = { name: e11 };
                break;
              default:
                throw new A("Invalid or unsupported crv option provided, supported values are P-256, P-384, P-521, X25519, and X448");
            }
            break;
          }
          default:
            throw new A('Invalid or unsupported JWK "alg" (Algorithm) Parameter value');
        }
        return i.subtle.generateKey(s2, null !== (a2 = null == t2 ? void 0 : t2.extractable) && void 0 !== a2 && a2, o2);
      }
      async function tq(e10, t2) {
        return tU(e10, t2);
      }
      async function tK(e10, t2) {
        return tL(e10, t2);
      }
      let tW = "WebCryptoAPI";
    }, 8053: (e, t, r) => {
      "use strict";
      let n, a, i;
      function s(e10, t2) {
        if (null == e10) return false;
        try {
          return e10 instanceof t2 || Object.getPrototypeOf(e10)[Symbol.toStringTag] === t2.prototype[Symbol.toStringTag];
        } catch {
          return false;
        }
      }
      r.r(t), r.d(t, { OperationProcessingError: () => v, UnsupportedOperationError: () => w, authorizationCodeGrantRequest: () => eM, calculatePKCECodeChallenge: () => D, clientCredentialsGrantRequest: () => eF, clockSkew: () => o, clockTolerance: () => l, customFetch: () => c, deviceAuthorizationRequest: () => to, deviceCodeGrantRequest: () => tc, discoveryRequest: () => P, expectNoNonce: () => eH, expectNoState: () => tn, experimentalCustomFetch: () => tm, experimentalUseMtlsAlias: () => ty, experimental_customFetch: () => tg, experimental_jwksCache: () => tS, experimental_useMtlsAlias: () => tb, experimental_validateDetachedSignatureResponse: () => tw, experimental_validateJwtAccessToken: () => tv, generateKeyPair: () => td, generateRandomCodeVerifier: () => $, generateRandomNonce: () => M, generateRandomState: () => N, genericTokenEndpointRequest: () => eJ, getValidatedIdTokenClaims: () => eA, introspectionRequest: () => eX, isOAuth2Error: () => es, issueRequestObject: () => Z, jweDecrypt: () => d, jwksCache: () => p, modifyAssertion: () => u, parseWwwAuthenticateChallenges: () => ec, processAuthorizationCodeOAuth2Response: () => eK, processAuthorizationCodeOpenIDResponse: () => eq, processClientCredentialsResponse: () => ez, processDeviceAuthorizationResponse: () => tl, processDeviceCodeResponse: () => tu, processDiscoveryResponse: () => j, processIntrospectionResponse: () => eY, processPushedAuthorizationResponse: () => eu, processRefreshTokenResponse: () => eP, processRevocationResponse: () => eG, processUserInfoResponse: () => eb, protectedResourceRequest: () => ed, pushedAuthorizationRequest: () => ei, refreshTokenGrantRequest: () => e_, revocationRequest: () => eB, skipAuthTimeCheck: () => eU, skipStateCheck: () => tr, skipSubjectCheck: () => eg, useMtlsAlias: () => h, userInfoRequest: () => ep, validateAuthResponse: () => ta, validateDetachedSignatureResponse: () => e7, validateIdTokenSignature: () => ek, validateJwtAccessToken: () => tf, validateJwtAuthResponse: () => e8, validateJwtIntrospectionSignature: () => eC, validateJwtUserInfoSignature: () => eR, validateJwtUserinfoSignature: () => t_ }), "undefined" != typeof navigator && navigator.userAgent?.startsWith?.("Mozilla/5.0 ") || (n = "oauth4webapi/v2.17.0");
      let o = Symbol(), l = Symbol(), c = Symbol(), u = Symbol(), d = Symbol(), p = Symbol(), h = Symbol(), f = new TextEncoder(), m = new TextDecoder();
      function g(e10) {
        return "string" == typeof e10 ? f.encode(e10) : m.decode(e10);
      }
      function y(e10) {
        return "string" == typeof e10 ? function(e11) {
          try {
            let t2 = atob(e11.replace(/-/g, "+").replace(/_/g, "/").replace(/\s/g, "")), r2 = new Uint8Array(t2.length);
            for (let e12 = 0; e12 < t2.length; e12++) r2[e12] = t2.charCodeAt(e12);
            return r2;
          } catch (e12) {
            throw new _("The input to be decoded is not correctly encoded.", { cause: e12 });
          }
        }(e10) : function(e11) {
          e11 instanceof ArrayBuffer && (e11 = new Uint8Array(e11));
          let t2 = [];
          for (let r2 = 0; r2 < e11.byteLength; r2 += 32768) t2.push(String.fromCharCode.apply(null, e11.subarray(r2, r2 + 32768)));
          return btoa(t2.join("")).replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
        }(e10);
      }
      class b {
        constructor(e10) {
          this.cache = /* @__PURE__ */ new Map(), this._cache = /* @__PURE__ */ new Map(), this.maxSize = e10;
        }
        get(e10) {
          let t2 = this.cache.get(e10);
          return t2 || ((t2 = this._cache.get(e10)) ? (this.update(e10, t2), t2) : void 0);
        }
        has(e10) {
          return this.cache.has(e10) || this._cache.has(e10);
        }
        set(e10, t2) {
          return this.cache.has(e10) ? this.cache.set(e10, t2) : this.update(e10, t2), this;
        }
        delete(e10) {
          return this.cache.has(e10) ? this.cache.delete(e10) : !!this._cache.has(e10) && this._cache.delete(e10);
        }
        update(e10, t2) {
          this.cache.set(e10, t2), this.cache.size >= this.maxSize && (this._cache = this.cache, this.cache = /* @__PURE__ */ new Map());
        }
      }
      class w extends Error {
        constructor(e10) {
          super(e10 ?? "operation not supported"), this.name = this.constructor.name, Error.captureStackTrace?.(this, this.constructor);
        }
      }
      class v extends Error {
        constructor(e10, t2) {
          super(e10, t2), this.name = this.constructor.name, Error.captureStackTrace?.(this, this.constructor);
        }
      }
      let _ = v, S = new b(100);
      function E(e10) {
        return e10 instanceof CryptoKey;
      }
      function A(e10) {
        return E(e10) && "private" === e10.type;
      }
      let k = ["PS256", "ES256", "RS256", "PS384", "ES384", "RS384", "PS512", "ES512", "RS512", "EdDSA"];
      function x(e10) {
        try {
          let t2 = e10.headers.get("dpop-nonce");
          t2 && S.set(new URL(e10.url).origin, t2);
        } catch {
        }
        return e10;
      }
      function R(e10) {
        return !(null === e10 || "object" != typeof e10 || Array.isArray(e10));
      }
      function C(e10) {
        s(e10, Headers) && (e10 = Object.fromEntries(e10.entries()));
        let t2 = new Headers(e10);
        if (n && !t2.has("user-agent") && t2.set("user-agent", n), t2.has("authorization")) throw TypeError('"options.headers" must not include the "authorization" header name');
        if (t2.has("dpop")) throw TypeError('"options.headers" must not include the "dpop" header name');
        return t2;
      }
      function O(e10) {
        if ("function" == typeof e10 && (e10 = e10()), !(e10 instanceof AbortSignal)) throw TypeError('"options.signal" must return or be an instance of AbortSignal');
        return e10;
      }
      async function P(e10, t2) {
        if (!(e10 instanceof URL)) throw TypeError('"issuerIdentifier" must be an instance of URL');
        if ("https:" !== e10.protocol && "http:" !== e10.protocol) throw TypeError('"issuer.protocol" must be "https:" or "http:"');
        let r2 = new URL(e10.href);
        switch (t2?.algorithm) {
          case void 0:
          case "oidc":
            r2.pathname = `${r2.pathname}/.well-known/openid-configuration`.replace("//", "/");
            break;
          case "oauth2":
            "/" === r2.pathname ? r2.pathname = ".well-known/oauth-authorization-server" : r2.pathname = `.well-known/oauth-authorization-server/${r2.pathname}`.replace("//", "/");
            break;
          default:
            throw TypeError('"options.algorithm" must be "oidc" (default), or "oauth2"');
        }
        let n2 = C(t2?.headers);
        return n2.set("accept", "application/json"), (t2?.[c] || fetch)(r2.href, { headers: Object.fromEntries(n2.entries()), method: "GET", redirect: "manual", signal: t2?.signal ? O(t2.signal) : null }).then(x);
      }
      function T(e10) {
        return "string" == typeof e10 && 0 !== e10.length;
      }
      async function j(e10, t2) {
        let r2;
        if (!(e10 instanceof URL)) throw TypeError('"expectedIssuer" must be an instance of URL');
        if (!s(t2, Response)) throw TypeError('"response" must be an instance of Response');
        if (200 !== t2.status) throw new _('"response" is not a conform Authorization Server Metadata response');
        eV(t2);
        try {
          r2 = await t2.json();
        } catch (e11) {
          throw new _('failed to parse "response" body as JSON', { cause: e11 });
        }
        if (!R(r2)) throw new _('"response" body must be a top level object');
        if (!T(r2.issuer)) throw new _('"response" body "issuer" property must be a non-empty string');
        if (new URL(r2.issuer).href !== e10.href) throw new _('"response" body "issuer" does not match "expectedIssuer"');
        return r2;
      }
      function I() {
        return y(crypto.getRandomValues(new Uint8Array(32)));
      }
      function $() {
        return I();
      }
      function N() {
        return I();
      }
      function M() {
        return I();
      }
      async function D(e10) {
        if (!T(e10)) throw TypeError('"codeVerifier" must be a non-empty string');
        return y(await crypto.subtle.digest("SHA-256", g(e10)));
      }
      function L(e10) {
        if (e10 instanceof CryptoKey) return { key: e10 };
        if (!(e10?.key instanceof CryptoKey)) return {};
        if (void 0 !== e10.kid && !T(e10.kid)) throw TypeError('"kid" must be a non-empty string');
        return { key: e10.key, kid: e10.kid, modifyAssertion: e10[u] };
      }
      function H(e10) {
        return encodeURIComponent(e10).replace(/%20/g, "+");
      }
      function U(e10) {
        switch (e10.algorithm.name) {
          case "RSA-PSS":
            return function(e11) {
              switch (e11.algorithm.hash.name) {
                case "SHA-256":
                  return "PS256";
                case "SHA-384":
                  return "PS384";
                case "SHA-512":
                  return "PS512";
                default:
                  throw new w("unsupported RsaHashedKeyAlgorithm hash name");
              }
            }(e10);
          case "RSASSA-PKCS1-v1_5":
            return function(e11) {
              switch (e11.algorithm.hash.name) {
                case "SHA-256":
                  return "RS256";
                case "SHA-384":
                  return "RS384";
                case "SHA-512":
                  return "RS512";
                default:
                  throw new w("unsupported RsaHashedKeyAlgorithm hash name");
              }
            }(e10);
          case "ECDSA":
            return function(e11) {
              switch (e11.algorithm.namedCurve) {
                case "P-256":
                  return "ES256";
                case "P-384":
                  return "ES384";
                case "P-521":
                  return "ES512";
                default:
                  throw new w("unsupported EcKeyAlgorithm namedCurve");
              }
            }(e10);
          case "Ed25519":
          case "Ed448":
            return "EdDSA";
          default:
            throw new w("unsupported CryptoKey algorithm name");
        }
      }
      function q(e10) {
        let t2 = e10?.[o];
        return "number" == typeof t2 && Number.isFinite(t2) ? t2 : 0;
      }
      function K(e10) {
        let t2 = e10?.[l];
        return "number" == typeof t2 && Number.isFinite(t2) && -1 !== Math.sign(t2) ? t2 : 30;
      }
      function W() {
        return Math.floor(Date.now() / 1e3);
      }
      async function F(e10, t2, r2, n2, a2) {
        let i2 = { alg: U(r2), kid: n2 }, s2 = function(e11, t3) {
          let r3 = W() + q(t3);
          return { jti: I(), aud: [e11.issuer, e11.token_endpoint], exp: r3 + 60, iat: r3, nbf: r3, iss: t3.client_id, sub: t3.client_id };
        }(e10, t2);
        return a2?.(i2, s2), Y(i2, s2, r2);
      }
      function J(e10) {
        if ("object" != typeof e10 || null === e10) throw TypeError('"as" must be an object');
        if (!T(e10.issuer)) throw TypeError('"as.issuer" property must be a non-empty string');
        return true;
      }
      function z(e10) {
        if ("object" != typeof e10 || null === e10) throw TypeError('"client" must be an object');
        if (!T(e10.client_id)) throw TypeError('"client.client_id" property must be a non-empty string');
        return true;
      }
      function B(e10) {
        if (!T(e10)) throw TypeError('"client.client_secret" property must be a non-empty string');
        return e10;
      }
      function G(e10, t2) {
        if (void 0 !== t2) throw TypeError(`"options.clientPrivateKey" property must not be provided when ${e10} client authentication method is used.`);
      }
      function V(e10, t2) {
        if (void 0 !== t2) throw TypeError(`"client.client_secret" property must not be provided when ${e10} client authentication method is used.`);
      }
      async function X(e10, t2, r2, n2, a2) {
        switch (r2.delete("client_secret"), r2.delete("client_assertion_type"), r2.delete("client_assertion"), t2.token_endpoint_auth_method) {
          case void 0:
          case "client_secret_basic":
            G("client_secret_basic", a2), n2.set("authorization", function(e11, t3) {
              let r3 = H(e11), n3 = H(t3), a3 = btoa(`${r3}:${n3}`);
              return `Basic ${a3}`;
            }(t2.client_id, B(t2.client_secret)));
            break;
          case "client_secret_post":
            G("client_secret_post", a2), r2.set("client_id", t2.client_id), r2.set("client_secret", B(t2.client_secret));
            break;
          case "private_key_jwt": {
            if (V("private_key_jwt", t2.client_secret), void 0 === a2) throw TypeError('"options.clientPrivateKey" must be provided when "client.token_endpoint_auth_method" is "private_key_jwt"');
            let { key: n3, kid: i2, modifyAssertion: s2 } = L(a2);
            if (!A(n3)) throw TypeError('"options.clientPrivateKey.key" must be a private CryptoKey');
            r2.set("client_id", t2.client_id), r2.set("client_assertion_type", "urn:ietf:params:oauth:client-assertion-type:jwt-bearer"), r2.set("client_assertion", await F(e10, t2, n3, i2, s2));
            break;
          }
          case "tls_client_auth":
          case "self_signed_tls_client_auth":
          case "none":
            V(t2.token_endpoint_auth_method, t2.client_secret), G(t2.token_endpoint_auth_method, a2), r2.set("client_id", t2.client_id);
            break;
          default:
            throw new w("unsupported client token_endpoint_auth_method");
        }
      }
      async function Y(e10, t2, r2) {
        if (!r2.usages.includes("sign")) throw TypeError('CryptoKey instances used for signing assertions must include "sign" in their "usages"');
        let n2 = `${y(g(JSON.stringify(e10)))}.${y(g(JSON.stringify(t2)))}`, a2 = y(await crypto.subtle.sign(e2(r2), r2, g(n2)));
        return `${n2}.${a2}`;
      }
      async function Z(e10, t2, r2, n2) {
        let a2;
        J(e10), z(t2), r2 = new URLSearchParams(r2);
        let { key: i2, kid: s2, modifyAssertion: o2 } = L(n2);
        if (!A(i2)) throw TypeError('"privateKey.key" must be a private CryptoKey');
        r2.set("client_id", t2.client_id);
        let l2 = W() + q(t2), c2 = { ...Object.fromEntries(r2.entries()), jti: I(), aud: e10.issuer, exp: l2 + 60, iat: l2, nbf: l2, iss: t2.client_id };
        r2.has("resource") && (a2 = r2.getAll("resource")) && a2.length > 1 && (c2.resource = a2);
        {
          let e11 = r2.get("max_age");
          if (null !== e11 && (c2.max_age = parseInt(e11, 10), !Number.isFinite(c2.max_age))) throw new _('"max_age" parameter must be a number');
        }
        {
          let e11 = r2.get("claims");
          if (null !== e11) {
            try {
              c2.claims = JSON.parse(e11);
            } catch (e12) {
              throw new _('failed to parse the "claims" parameter as JSON', { cause: e12 });
            }
            if (!R(c2.claims)) throw new _('"claims" parameter must be a JSON with a top level object');
          }
        }
        {
          let e11 = r2.get("authorization_details");
          if (null !== e11) {
            try {
              c2.authorization_details = JSON.parse(e11);
            } catch (e12) {
              throw new _('failed to parse the "authorization_details" parameter as JSON', { cause: e12 });
            }
            if (!Array.isArray(c2.authorization_details)) throw new _('"authorization_details" parameter must be a JSON with a top level array');
          }
        }
        let u2 = { alg: U(i2), typ: "oauth-authz-req+jwt", kid: s2 };
        return o2?.(u2, c2), Y(u2, c2, i2);
      }
      async function Q(e10, t2, r2, n2, a2, i2) {
        let { privateKey: s2, publicKey: o2, nonce: l2 = S.get(r2.origin) } = t2;
        if (!A(s2)) throw TypeError('"DPoP.privateKey" must be a private CryptoKey');
        if (!(E(o2) && "public" === o2.type)) throw TypeError('"DPoP.publicKey" must be a public CryptoKey');
        if (void 0 !== l2 && !T(l2)) throw TypeError('"DPoP.nonce" must be a non-empty string or undefined');
        if (!o2.extractable) throw TypeError('"DPoP.publicKey.extractable" must be true');
        let c2 = W() + a2, d2 = { alg: U(s2), typ: "dpop+jwt", jwk: await et(o2) }, p2 = { iat: c2, jti: I(), htm: n2, nonce: l2, htu: `${r2.origin}${r2.pathname}`, ath: i2 ? y(await crypto.subtle.digest("SHA-256", g(i2))) : void 0 };
        t2[u]?.(d2, p2), e10.set("dpop", await Y(d2, p2, s2));
      }
      async function ee(e10) {
        let { kty: t2, e: r2, n: n2, x: i2, y: s2, crv: o2 } = await crypto.subtle.exportKey("jwk", e10), l2 = { kty: t2, e: r2, n: n2, x: i2, y: s2, crv: o2 };
        return a.set(e10, l2), l2;
      }
      async function et(e10) {
        return a || (a = /* @__PURE__ */ new WeakMap()), a.get(e10) || ee(e10);
      }
      function er(e10, t2, r2) {
        if ("string" != typeof e10) {
          if (r2) throw TypeError(`"as.mtls_endpoint_aliases.${t2}" must be a string`);
          throw TypeError(`"as.${t2}" must be a string`);
        }
        return new URL(e10);
      }
      function en(e10, t2, r2 = false) {
        return r2 && e10.mtls_endpoint_aliases && t2 in e10.mtls_endpoint_aliases ? er(e10.mtls_endpoint_aliases[t2], t2, r2) : er(e10[t2], t2, r2);
      }
      function ea(e10, t2) {
        return !!(e10.use_mtls_endpoint_aliases || t2?.[h]);
      }
      async function ei(e10, t2, r2, n2) {
        J(e10), z(t2);
        let a2 = en(e10, "pushed_authorization_request_endpoint", ea(t2, n2)), i2 = new URLSearchParams(r2);
        i2.set("client_id", t2.client_id);
        let s2 = C(n2?.headers);
        return s2.set("accept", "application/json"), n2?.DPoP !== void 0 && await Q(s2, n2.DPoP, a2, "POST", q(t2)), ew(e10, t2, "POST", a2, i2, s2, n2);
      }
      function es(e10) {
        return !("object" != typeof e10 || Array.isArray(e10)) && null !== e10 && void 0 !== e10.error;
      }
      let eo = /((?:,|, )?[0-9a-zA-Z!#$%&'*+-.^_`|~]+=)/, el = /(?:^|, ?)([0-9a-zA-Z!#$%&'*+\-.^_`|~]+)(?=$|[ ,])/g;
      function ec(e10) {
        if (!s(e10, Response)) throw TypeError('"response" must be an instance of Response');
        let t2 = e10.headers.get("www-authenticate");
        if (null === t2) return;
        let r2 = [];
        for (let { 1: e11, index: n2 } of t2.matchAll(el)) r2.push([e11, n2]);
        if (r2.length) return r2.map(([e11, r3], n2, a2) => {
          let i2 = a2[n2 + 1];
          return function(e12, t3) {
            let r4 = t3.split(eo).slice(1);
            if (!r4.length) return { scheme: e12.toLowerCase(), parameters: {} };
            r4[r4.length - 1] = r4[r4.length - 1].replace(/,$/, "");
            let n3 = {};
            for (let e13 = 1; e13 < r4.length; e13 += 2) {
              var a3;
              let t4 = e13;
              if ('"' === r4[t4][0]) for (; '"' !== r4[t4].slice(-1) && ++e13 < r4.length; ) r4[t4] += r4[e13];
              n3[r4[t4 - 1].replace(/^(?:, ?)|=$/g, "").toLowerCase()] = (a3 = r4[t4]).length >= 2 && '"' === a3[0] && '"' === a3[a3.length - 1] ? a3.slice(1, -1) : a3;
            }
            return { scheme: e12.toLowerCase(), parameters: n3 };
          }(e11, i2 ? t2.slice(r3, i2[1]) : t2.slice(r3));
        });
      }
      async function eu(e10, t2, r2) {
        let n2;
        if (J(e10), z(t2), !s(r2, Response)) throw TypeError('"response" must be an instance of Response');
        if (201 !== r2.status) {
          let e11;
          if (e11 = await e0(r2)) return e11;
          throw new _('"response" is not a conform Pushed Authorization Request Endpoint response');
        }
        eV(r2);
        try {
          n2 = await r2.json();
        } catch (e11) {
          throw new _('failed to parse "response" body as JSON', { cause: e11 });
        }
        if (!R(n2)) throw new _('"response" body must be a top level object');
        if (!T(n2.request_uri)) throw new _('"response" body "request_uri" property must be a non-empty string');
        if ("number" != typeof n2.expires_in || n2.expires_in <= 0) throw new _('"response" body "expires_in" property must be a positive number');
        return n2;
      }
      async function ed(e10, t2, r2, n2, a2, i2) {
        if (!T(e10)) throw TypeError('"accessToken" must be a non-empty string');
        if (!(r2 instanceof URL)) throw TypeError('"url" must be an instance of URL');
        return n2 = C(n2), i2?.DPoP === void 0 ? n2.set("authorization", `Bearer ${e10}`) : (await Q(n2, i2.DPoP, r2, t2.toUpperCase(), q({ [o]: i2?.[o] }), e10), n2.set("authorization", `DPoP ${e10}`)), (i2?.[c] || fetch)(r2.href, { body: a2, headers: Object.fromEntries(n2.entries()), method: t2, redirect: "manual", signal: i2?.signal ? O(i2.signal) : null }).then(x);
      }
      async function ep(e10, t2, r2, n2) {
        J(e10), z(t2);
        let a2 = en(e10, "userinfo_endpoint", ea(t2, n2)), i2 = C(n2?.headers);
        return t2.userinfo_signed_response_alg ? i2.set("accept", "application/jwt") : (i2.set("accept", "application/json"), i2.append("accept", "application/jwt")), ed(r2, "GET", a2, i2, null, { ...n2, [o]: q(t2) });
      }
      function eh(e10, t2, r2, n2) {
        i || (i = /* @__PURE__ */ new WeakMap()), i.set(e10, { jwks: t2, uat: r2, get age() {
          return W() - this.uat;
        } }), n2 && Object.assign(n2, { jwks: structuredClone(t2), uat: r2 });
      }
      function ef(e10, t2) {
        i?.delete(e10), delete t2?.jwks, delete t2?.uat;
      }
      async function em(e10, t2, r2) {
        var n2;
        let a2, s2, o2;
        let { alg: l2, kid: c2 } = r2;
        if (function(e11) {
          if (!k.includes(e11)) throw new w('unsupported JWS "alg" identifier');
        }(l2), !i?.has(e10) && !("object" != typeof (n2 = t2?.[p]) || null === n2 || !("uat" in n2) || "number" != typeof n2.uat || W() - n2.uat >= 300) && "jwks" in n2 && R(n2.jwks) && Array.isArray(n2.jwks.keys) && Array.prototype.every.call(n2.jwks.keys, R) && eh(e10, t2?.[p].jwks, t2?.[p].uat), i?.has(e10)) {
          if ({ jwks: a2, age: s2 } = i.get(e10), s2 >= 300) return ef(e10, t2?.[p]), em(e10, t2, r2);
        } else a2 = await eZ(e10, t2).then(eQ), s2 = 0, eh(e10, a2, W(), t2?.[p]);
        switch (l2.slice(0, 2)) {
          case "RS":
          case "PS":
            o2 = "RSA";
            break;
          case "ES":
            o2 = "EC";
            break;
          case "Ed":
            o2 = "OKP";
            break;
          default:
            throw new w();
        }
        let { 0: u2, length: d2 } = a2.keys.filter((e11) => {
          if (e11.kty !== o2 || void 0 !== c2 && c2 !== e11.kid || void 0 !== e11.alg && l2 !== e11.alg || void 0 !== e11.use && "sig" !== e11.use || e11.key_ops?.includes("verify") === false) return false;
          switch (true) {
            case ("ES256" === l2 && "P-256" !== e11.crv):
            case ("ES384" === l2 && "P-384" !== e11.crv):
            case ("ES512" === l2 && "P-521" !== e11.crv):
            case ("EdDSA" === l2 && !("Ed25519" === e11.crv || "Ed448" === e11.crv)):
              return false;
          }
          return true;
        });
        if (!d2) {
          if (s2 >= 60) return ef(e10, t2?.[p]), em(e10, t2, r2);
          throw new _("error when selecting a JWT verification key, no applicable keys found");
        }
        if (1 !== d2) throw new _('error when selecting a JWT verification key, multiple applicable keys found, a "kid" JWT Header Parameter is required');
        let h2 = await ts(l2, u2);
        if ("public" !== h2.type) throw new _("jwks_uri must only contain public keys");
        return h2;
      }
      let eg = Symbol();
      function ey(e10) {
        return e10.headers.get("content-type")?.split(";")[0];
      }
      async function eb(e10, t2, r2, n2) {
        let a2;
        if (J(e10), z(t2), !s(n2, Response)) throw TypeError('"response" must be an instance of Response');
        if (200 !== n2.status) throw new _('"response" is not a conform UserInfo Endpoint response');
        if ("application/jwt" === ey(n2)) {
          eV(n2);
          let { claims: r3, jwt: i2 } = await e5(await n2.text(), te.bind(void 0, t2.userinfo_signed_response_alg, e10.userinfo_signing_alg_values_supported), e3, q(t2), K(t2), t2[d]).then(eT.bind(void 0, t2.client_id)).then(eI.bind(void 0, e10.issuer));
          eE.set(n2, i2), a2 = r3;
        } else {
          if (t2.userinfo_signed_response_alg) throw new _("JWT UserInfo Response expected");
          eV(n2);
          try {
            a2 = await n2.json();
          } catch (e11) {
            throw new _('failed to parse "response" body as JSON', { cause: e11 });
          }
        }
        if (!R(a2)) throw new _('"response" body must be a top level object');
        if (!T(a2.sub)) throw new _('"response" body "sub" property must be a non-empty string');
        if (r2 === eg) ;
        else {
          if (!T(r2)) throw new _('"expectedSubject" must be a non-empty string');
          if (a2.sub !== r2) throw new _('unexpected "response" body "sub" value');
        }
        return a2;
      }
      async function ew(e10, t2, r2, n2, a2, i2, s2) {
        return await X(e10, t2, a2, i2, s2?.clientPrivateKey), i2.set("content-type", "application/x-www-form-urlencoded;charset=UTF-8"), (s2?.[c] || fetch)(n2.href, { body: a2, headers: Object.fromEntries(i2.entries()), method: r2, redirect: "manual", signal: s2?.signal ? O(s2.signal) : null }).then(x);
      }
      async function ev(e10, t2, r2, n2, a2) {
        let i2 = en(e10, "token_endpoint", ea(t2, a2));
        n2.set("grant_type", r2);
        let s2 = C(a2?.headers);
        return s2.set("accept", "application/json"), a2?.DPoP !== void 0 && await Q(s2, a2.DPoP, i2, "POST", q(t2)), ew(e10, t2, "POST", i2, n2, s2, a2);
      }
      async function e_(e10, t2, r2, n2) {
        if (J(e10), z(t2), !T(r2)) throw TypeError('"refreshToken" must be a non-empty string');
        let a2 = new URLSearchParams(n2?.additionalParameters);
        return a2.set("refresh_token", r2), ev(e10, t2, "refresh_token", a2, n2);
      }
      let eS = /* @__PURE__ */ new WeakMap(), eE = /* @__PURE__ */ new WeakMap();
      function eA(e10) {
        if (!e10.id_token) return;
        let t2 = eS.get(e10);
        if (!t2) throw TypeError('"ref" was already garbage collected or did not resolve from the proper sources');
        return t2[0];
      }
      async function ek(e10, t2, r2) {
        let n2;
        if (J(e10), !eS.has(t2)) throw new _('"ref" does not contain an ID Token to verify the signature of');
        let { 0: a2, 1: i2, 2: s2 } = eS.get(t2)[1].split("."), o2 = JSON.parse(g(y(a2)));
        if (o2.alg.startsWith("HS")) throw new w();
        n2 = await em(e10, r2, o2), await e6(a2, i2, n2, y(s2));
      }
      async function ex(e10, t2, r2) {
        let n2;
        if (J(e10), !eE.has(t2)) throw new _('"ref" does not contain a processed JWT Response to verify the signature of');
        let { 0: a2, 1: i2, 2: s2 } = eE.get(t2).split("."), o2 = JSON.parse(g(y(a2)));
        if (o2.alg.startsWith("HS")) throw new w();
        n2 = await em(e10, r2, o2), await e6(a2, i2, n2, y(s2));
      }
      function eR(e10, t2, r2) {
        return ex(e10, t2, r2);
      }
      function eC(e10, t2, r2) {
        return ex(e10, t2, r2);
      }
      async function eO(e10, t2, r2, n2 = false, a2 = false) {
        let i2;
        if (J(e10), z(t2), !s(r2, Response)) throw TypeError('"response" must be an instance of Response');
        if (200 !== r2.status) {
          let e11;
          if (e11 = await e0(r2)) return e11;
          throw new _('"response" is not a conform Token Endpoint response');
        }
        eV(r2);
        try {
          i2 = await r2.json();
        } catch (e11) {
          throw new _('failed to parse "response" body as JSON', { cause: e11 });
        }
        if (!R(i2)) throw new _('"response" body must be a top level object');
        if (!T(i2.access_token)) throw new _('"response" body "access_token" property must be a non-empty string');
        if (!T(i2.token_type)) throw new _('"response" body "token_type" property must be a non-empty string');
        if (i2.token_type = i2.token_type.toLowerCase(), "dpop" !== i2.token_type && "bearer" !== i2.token_type) throw new w("unsupported `token_type` value");
        if (void 0 !== i2.expires_in && ("number" != typeof i2.expires_in || i2.expires_in <= 0)) throw new _('"response" body "expires_in" property must be a positive number');
        if (!a2 && void 0 !== i2.refresh_token && !T(i2.refresh_token)) throw new _('"response" body "refresh_token" property must be a non-empty string');
        if (void 0 !== i2.scope && "string" != typeof i2.scope) throw new _('"response" body "scope" property must be a string');
        if (!n2) {
          if (void 0 !== i2.id_token && !T(i2.id_token)) throw new _('"response" body "id_token" property must be a non-empty string');
          if (i2.id_token) {
            let { claims: r3, jwt: n3 } = await e5(i2.id_token, te.bind(void 0, t2.id_token_signed_response_alg, e10.id_token_signing_alg_values_supported), e3, q(t2), K(t2), t2[d]).then(eL.bind(void 0, ["aud", "exp", "iat", "iss", "sub"])).then(e$.bind(void 0, e10.issuer)).then(ej.bind(void 0, t2.client_id));
            if (Array.isArray(r3.aud) && 1 !== r3.aud.length) {
              if (void 0 === r3.azp) throw new _('ID Token "aud" (audience) claim includes additional untrusted audiences');
              if (r3.azp !== t2.client_id) throw new _('unexpected ID Token "azp" (authorized party) claim value');
            }
            if (void 0 !== r3.auth_time && (!Number.isFinite(r3.auth_time) || 1 !== Math.sign(r3.auth_time))) throw new _('ID Token "auth_time" (authentication time) must be a positive number');
            eS.set(i2, [r3, n3]);
          }
        }
        return i2;
      }
      async function eP(e10, t2, r2) {
        return eO(e10, t2, r2);
      }
      function eT(e10, t2) {
        return void 0 !== t2.claims.aud ? ej(e10, t2) : t2;
      }
      function ej(e10, t2) {
        if (Array.isArray(t2.claims.aud)) {
          if (!t2.claims.aud.includes(e10)) throw new _('unexpected JWT "aud" (audience) claim value');
        } else if (t2.claims.aud !== e10) throw new _('unexpected JWT "aud" (audience) claim value');
        return t2;
      }
      function eI(e10, t2) {
        return void 0 !== t2.claims.iss ? e$(e10, t2) : t2;
      }
      function e$(e10, t2) {
        if (t2.claims.iss !== e10) throw new _('unexpected JWT "iss" (issuer) claim value');
        return t2;
      }
      let eN = /* @__PURE__ */ new WeakSet();
      async function eM(e10, t2, r2, n2, a2, i2) {
        if (J(e10), z(t2), !eN.has(r2)) throw TypeError('"callbackParameters" must be an instance of URLSearchParams obtained from "validateAuthResponse()", or "validateJwtAuthResponse()');
        if (!T(n2)) throw TypeError('"redirectUri" must be a non-empty string');
        if (!T(a2)) throw TypeError('"codeVerifier" must be a non-empty string');
        let s2 = tt(r2, "code");
        if (!s2) throw new _('no authorization code in "callbackParameters"');
        let o2 = new URLSearchParams(i2?.additionalParameters);
        return o2.set("redirect_uri", n2), o2.set("code_verifier", a2), o2.set("code", s2), ev(e10, t2, "authorization_code", o2, i2);
      }
      let eD = { aud: "audience", c_hash: "code hash", client_id: "client id", exp: "expiration time", iat: "issued at", iss: "issuer", jti: "jwt id", nonce: "nonce", s_hash: "state hash", sub: "subject", ath: "access token hash", htm: "http method", htu: "http uri", cnf: "confirmation" };
      function eL(e10, t2) {
        for (let r2 of e10) if (void 0 === t2.claims[r2]) throw new _(`JWT "${r2}" (${eD[r2]}) claim missing`);
        return t2;
      }
      let eH = Symbol(), eU = Symbol();
      async function eq(e10, t2, r2, n2, a2) {
        let i2 = await eO(e10, t2, r2);
        if (es(i2)) return i2;
        if (!T(i2.id_token)) throw new _('"response" body "id_token" property must be a non-empty string');
        a2 ?? (a2 = t2.default_max_age ?? eU);
        let s2 = eA(i2);
        if ((t2.require_auth_time || a2 !== eU) && void 0 === s2.auth_time) throw new _('ID Token "auth_time" (authentication time) claim missing');
        if (a2 !== eU) {
          if ("number" != typeof a2 || a2 < 0) throw TypeError('"maxAge" must be a non-negative number');
          let e11 = W() + q(t2), r3 = K(t2);
          if (s2.auth_time + a2 < e11 - r3) throw new _("too much time has elapsed since the last End-User authentication");
        }
        switch (n2) {
          case void 0:
          case eH:
            if (void 0 !== s2.nonce) throw new _('unexpected ID Token "nonce" claim value');
            break;
          default:
            if (!T(n2)) throw TypeError('"expectedNonce" must be a non-empty string');
            if (void 0 === s2.nonce) throw new _('ID Token "nonce" claim missing');
            if (s2.nonce !== n2) throw new _('unexpected ID Token "nonce" claim value');
        }
        return i2;
      }
      async function eK(e10, t2, r2) {
        let n2 = await eO(e10, t2, r2, true);
        if (es(n2)) return n2;
        if (void 0 !== n2.id_token) {
          if ("string" == typeof n2.id_token && n2.id_token.length) throw new _("Unexpected ID Token returned, use processAuthorizationCodeOpenIDResponse() for OpenID Connect callback processing");
          delete n2.id_token;
        }
        return n2;
      }
      function eW(e10, t2) {
        if ("string" != typeof t2.header.typ || t2.header.typ.toLowerCase().replace(/^application\//, "") !== e10) throw new _('unexpected JWT "typ" header parameter value');
        return t2;
      }
      async function eF(e10, t2, r2, n2) {
        return J(e10), z(t2), ev(e10, t2, "client_credentials", new URLSearchParams(r2), n2);
      }
      async function eJ(e10, t2, r2, n2, a2) {
        if (J(e10), z(t2), !T(r2)) throw TypeError('"grantType" must be a non-empty string');
        return ev(e10, t2, r2, new URLSearchParams(n2), a2);
      }
      async function ez(e10, t2, r2) {
        let n2 = await eO(e10, t2, r2, true, true);
        return es(n2), n2;
      }
      async function eB(e10, t2, r2, n2) {
        if (J(e10), z(t2), !T(r2)) throw TypeError('"token" must be a non-empty string');
        let a2 = en(e10, "revocation_endpoint", ea(t2, n2)), i2 = new URLSearchParams(n2?.additionalParameters);
        i2.set("token", r2);
        let s2 = C(n2?.headers);
        return s2.delete("accept"), ew(e10, t2, "POST", a2, i2, s2, n2);
      }
      async function eG(e10) {
        if (!s(e10, Response)) throw TypeError('"response" must be an instance of Response');
        if (200 !== e10.status) {
          let t2;
          if (t2 = await e0(e10)) return t2;
          throw new _('"response" is not a conform Revocation Endpoint response');
        }
      }
      function eV(e10) {
        if (e10.bodyUsed) throw TypeError('"response" body has been used already');
      }
      async function eX(e10, t2, r2, n2) {
        if (J(e10), z(t2), !T(r2)) throw TypeError('"token" must be a non-empty string');
        let a2 = en(e10, "introspection_endpoint", ea(t2, n2)), i2 = new URLSearchParams(n2?.additionalParameters);
        i2.set("token", r2);
        let s2 = C(n2?.headers);
        return n2?.requestJwtResponse ?? t2.introspection_signed_response_alg ? s2.set("accept", "application/token-introspection+jwt") : s2.set("accept", "application/json"), ew(e10, t2, "POST", a2, i2, s2, n2);
      }
      async function eY(e10, t2, r2) {
        let n2;
        if (J(e10), z(t2), !s(r2, Response)) throw TypeError('"response" must be an instance of Response');
        if (200 !== r2.status) {
          let e11;
          if (e11 = await e0(r2)) return e11;
          throw new _('"response" is not a conform Introspection Endpoint response');
        }
        if ("application/token-introspection+jwt" === ey(r2)) {
          eV(r2);
          let { claims: a2, jwt: i2 } = await e5(await r2.text(), te.bind(void 0, t2.introspection_signed_response_alg, e10.introspection_signing_alg_values_supported), e3, q(t2), K(t2), t2[d]).then(eW.bind(void 0, "token-introspection+jwt")).then(eL.bind(void 0, ["aud", "iat", "iss"])).then(e$.bind(void 0, e10.issuer)).then(ej.bind(void 0, t2.client_id));
          if (eE.set(r2, i2), !R(n2 = a2.token_introspection)) throw new _('JWT "token_introspection" claim must be a JSON object');
        } else {
          eV(r2);
          try {
            n2 = await r2.json();
          } catch (e11) {
            throw new _('failed to parse "response" body as JSON', { cause: e11 });
          }
          if (!R(n2)) throw new _('"response" body must be a top level object');
        }
        if ("boolean" != typeof n2.active) throw new _('"response" body "active" property must be a boolean');
        return n2;
      }
      async function eZ(e10, t2) {
        J(e10);
        let r2 = en(e10, "jwks_uri"), n2 = C(t2?.headers);
        return n2.set("accept", "application/json"), n2.append("accept", "application/jwk-set+json"), (t2?.[c] || fetch)(r2.href, { headers: Object.fromEntries(n2.entries()), method: "GET", redirect: "manual", signal: t2?.signal ? O(t2.signal) : null }).then(x);
      }
      async function eQ(e10) {
        let t2;
        if (!s(e10, Response)) throw TypeError('"response" must be an instance of Response');
        if (200 !== e10.status) throw new _('"response" is not a conform JSON Web Key Set response');
        eV(e10);
        try {
          t2 = await e10.json();
        } catch (e11) {
          throw new _('failed to parse "response" body as JSON', { cause: e11 });
        }
        if (!R(t2)) throw new _('"response" body must be a top level object');
        if (!Array.isArray(t2.keys)) throw new _('"response" body "keys" property must be an array');
        if (!Array.prototype.every.call(t2.keys, R)) throw new _('"response" body "keys" property members must be JWK formatted objects');
        return t2;
      }
      async function e0(e10) {
        if (e10.status > 399 && e10.status < 500) {
          eV(e10);
          try {
            let t2 = await e10.json();
            if (R(t2) && "string" == typeof t2.error && t2.error.length) return void 0 !== t2.error_description && "string" != typeof t2.error_description && delete t2.error_description, void 0 !== t2.error_uri && "string" != typeof t2.error_uri && delete t2.error_uri, void 0 !== t2.algs && "string" != typeof t2.algs && delete t2.algs, void 0 !== t2.scope && "string" != typeof t2.scope && delete t2.scope, t2;
          } catch {
          }
        }
      }
      function e1(e10) {
        if ("number" != typeof e10.modulusLength || e10.modulusLength < 2048) throw new _(`${e10.name} modulusLength must be at least 2048 bits`);
      }
      function e2(e10) {
        switch (e10.algorithm.name) {
          case "ECDSA":
            return { name: e10.algorithm.name, hash: function(e11) {
              switch (e11) {
                case "P-256":
                  return "SHA-256";
                case "P-384":
                  return "SHA-384";
                case "P-521":
                  return "SHA-512";
                default:
                  throw new w();
              }
            }(e10.algorithm.namedCurve) };
          case "RSA-PSS":
            switch (e1(e10.algorithm), e10.algorithm.hash.name) {
              case "SHA-256":
              case "SHA-384":
              case "SHA-512":
                return { name: e10.algorithm.name, saltLength: parseInt(e10.algorithm.hash.name.slice(-3), 10) >> 3 };
              default:
                throw new w();
            }
          case "RSASSA-PKCS1-v1_5":
            return e1(e10.algorithm), e10.algorithm.name;
          case "Ed448":
          case "Ed25519":
            return e10.algorithm.name;
        }
        throw new w();
      }
      let e3 = Symbol();
      async function e6(e10, t2, r2, n2) {
        let a2 = `${e10}.${t2}`;
        if (!await crypto.subtle.verify(e2(r2), r2, n2, g(a2))) throw new _("JWT signature verification failed");
      }
      async function e5(e10, t2, r2, n2, a2, i2) {
        let s2, o2, l2, { 0: c2, 1: u2, 2: d2, length: p2 } = e10.split(".");
        if (5 === p2) {
          if (void 0 !== i2) e10 = await i2(e10), { 0: c2, 1: u2, 2: d2, length: p2 } = e10.split(".");
          else throw new w("JWE structure JWTs are not supported");
        }
        if (3 !== p2) throw new _("Invalid JWT");
        try {
          s2 = JSON.parse(g(y(c2)));
        } catch (e11) {
          throw new _("failed to parse JWT Header body as base64url encoded JSON", { cause: e11 });
        }
        if (!R(s2)) throw new _("JWT Header must be a top level object");
        if (t2(s2), void 0 !== s2.crit) throw new _('unexpected JWT "crit" header parameter');
        let h2 = y(d2);
        r2 !== e3 && (o2 = await r2(s2), await e6(c2, u2, o2, h2));
        try {
          l2 = JSON.parse(g(y(u2)));
        } catch (e11) {
          throw new _("failed to parse JWT Payload body as base64url encoded JSON", { cause: e11 });
        }
        if (!R(l2)) throw new _("JWT Payload must be a top level object");
        let f2 = W() + n2;
        if (void 0 !== l2.exp) {
          if ("number" != typeof l2.exp) throw new _('unexpected JWT "exp" (expiration time) claim type');
          if (l2.exp <= f2 - a2) throw new _('unexpected JWT "exp" (expiration time) claim value, timestamp is <= now()');
        }
        if (void 0 !== l2.iat && "number" != typeof l2.iat) throw new _('unexpected JWT "iat" (issued at) claim type');
        if (void 0 !== l2.iss && "string" != typeof l2.iss) throw new _('unexpected JWT "iss" (issuer) claim type');
        if (void 0 !== l2.nbf) {
          if ("number" != typeof l2.nbf) throw new _('unexpected JWT "nbf" (not before) claim type');
          if (l2.nbf > f2 + a2) throw new _('unexpected JWT "nbf" (not before) claim value, timestamp is > now()');
        }
        if (void 0 !== l2.aud && "string" != typeof l2.aud && !Array.isArray(l2.aud)) throw new _('unexpected JWT "aud" (audience) claim type');
        return { header: s2, claims: l2, signature: h2, key: o2, jwt: e10 };
      }
      async function e8(e10, t2, r2, n2, a2) {
        if (J(e10), z(t2), r2 instanceof URL && (r2 = r2.searchParams), !(r2 instanceof URLSearchParams)) throw TypeError('"parameters" must be an instance of URLSearchParams, or URL');
        let i2 = tt(r2, "response");
        if (!i2) throw new _('"parameters" does not contain a JARM response');
        let { claims: s2 } = await e5(i2, te.bind(void 0, t2.authorization_signed_response_alg, e10.authorization_signing_alg_values_supported), em.bind(void 0, e10, a2), q(t2), K(t2), t2[d]).then(eL.bind(void 0, ["aud", "exp", "iss"])).then(e$.bind(void 0, e10.issuer)).then(ej.bind(void 0, t2.client_id)), o2 = new URLSearchParams();
        for (let [e11, t3] of Object.entries(s2)) "string" == typeof t3 && "aud" !== e11 && o2.set(e11, t3);
        return ta(e10, t2, o2, n2);
      }
      async function e4(e10, t2, r2) {
        let n2;
        switch (e10) {
          case "RS256":
          case "PS256":
          case "ES256":
            n2 = "SHA-256";
            break;
          case "RS384":
          case "PS384":
          case "ES384":
            n2 = "SHA-384";
            break;
          case "RS512":
          case "PS512":
          case "ES512":
            n2 = "SHA-512";
            break;
          case "EdDSA":
            if ("Ed25519" === r2.algorithm.name) {
              n2 = "SHA-512";
              break;
            }
            throw new w();
          default:
            throw new w();
        }
        let a2 = await crypto.subtle.digest(n2, g(t2));
        return y(a2.slice(0, a2.byteLength / 2));
      }
      async function e9(e10, t2, r2, n2) {
        return t2 === await e4(r2, e10, n2);
      }
      async function e7(e10, t2, r2, n2, a2, i2, s2) {
        if (J(e10), z(t2), r2 instanceof URL) {
          if (!r2.hash.length) throw TypeError('"parameters" as an instance of URL must contain a hash (fragment) with the Authorization Response parameters');
          r2 = new URLSearchParams(r2.hash.slice(1));
        }
        if (!(r2 instanceof URLSearchParams)) throw TypeError('"parameters" must be an instance of URLSearchParams');
        let o2 = tt(r2 = new URLSearchParams(r2), "id_token");
        switch (r2.delete("id_token"), a2) {
          case void 0:
          case tn:
            break;
          default:
            if (!T(a2)) throw TypeError('"expectedState" must be a non-empty string');
        }
        let l2 = ta({ ...e10, authorization_response_iss_parameter_supported: false }, t2, r2, a2);
        if (es(l2)) return l2;
        if (!o2) throw new _('"parameters" does not contain an ID Token');
        let c2 = tt(r2, "code");
        if (!c2) throw new _('"parameters" does not contain an Authorization Code');
        let u2 = ["aud", "exp", "iat", "iss", "sub", "nonce", "c_hash"];
        "string" == typeof a2 && u2.push("s_hash");
        let { claims: p2, header: h2, key: f2 } = await e5(o2, te.bind(void 0, t2.id_token_signed_response_alg, e10.id_token_signing_alg_values_supported), em.bind(void 0, e10, s2), q(t2), K(t2), t2[d]).then(eL.bind(void 0, u2)).then(e$.bind(void 0, e10.issuer)).then(ej.bind(void 0, t2.client_id)), m2 = q(t2), g2 = W() + m2;
        if (p2.iat < g2 - 3600) throw new _('unexpected JWT "iat" (issued at) claim value, it is too far in the past');
        if ("string" != typeof p2.c_hash || await e9(c2, p2.c_hash, h2.alg, f2) !== true) throw new _('invalid ID Token "c_hash" (code hash) claim value');
        if (void 0 !== p2.s_hash && "string" != typeof a2) throw new _('could not verify ID Token "s_hash" (state hash) claim value');
        if ("string" == typeof a2 && ("string" != typeof p2.s_hash || await e9(a2, p2.s_hash, h2.alg, f2) !== true)) throw new _('invalid ID Token "s_hash" (state hash) claim value');
        if (void 0 !== p2.auth_time && (!Number.isFinite(p2.auth_time) || 1 !== Math.sign(p2.auth_time))) throw new _('ID Token "auth_time" (authentication time) must be a positive number');
        if (i2 ?? (i2 = t2.default_max_age ?? eU), (t2.require_auth_time || i2 !== eU) && void 0 === p2.auth_time) throw new _('ID Token "auth_time" (authentication time) claim missing');
        if (i2 !== eU) {
          if ("number" != typeof i2 || i2 < 0) throw TypeError('"maxAge" must be a non-negative number');
          let e11 = W() + q(t2), r3 = K(t2);
          if (p2.auth_time + i2 < e11 - r3) throw new _("too much time has elapsed since the last End-User authentication");
        }
        if (!T(n2)) throw TypeError('"expectedNonce" must be a non-empty string');
        if (p2.nonce !== n2) throw new _('unexpected ID Token "nonce" claim value');
        if (Array.isArray(p2.aud) && 1 !== p2.aud.length) {
          if (void 0 === p2.azp) throw new _('ID Token "aud" (audience) claim includes additional untrusted audiences');
          if (p2.azp !== t2.client_id) throw new _('unexpected ID Token "azp" (authorized party) claim value');
        }
        return l2;
      }
      function te(e10, t2, r2) {
        if (void 0 !== e10) {
          if (r2.alg !== e10) throw new _('unexpected JWT "alg" header parameter');
          return;
        }
        if (Array.isArray(t2)) {
          if (!t2.includes(r2.alg)) throw new _('unexpected JWT "alg" header parameter');
          return;
        }
        if ("RS256" !== r2.alg) throw new _('unexpected JWT "alg" header parameter');
      }
      function tt(e10, t2) {
        let { 0: r2, length: n2 } = e10.getAll(t2);
        if (n2 > 1) throw new _(`"${t2}" parameter must be provided only once`);
        return r2;
      }
      let tr = Symbol(), tn = Symbol();
      function ta(e10, t2, r2, n2) {
        var a2;
        if (J(e10), z(t2), r2 instanceof URL && (r2 = r2.searchParams), !(r2 instanceof URLSearchParams)) throw TypeError('"parameters" must be an instance of URLSearchParams, or URL');
        if (tt(r2, "response")) throw new _('"parameters" contains a JARM response, use validateJwtAuthResponse() instead of validateAuthResponse()');
        let i2 = tt(r2, "iss"), s2 = tt(r2, "state");
        if (!i2 && e10.authorization_response_iss_parameter_supported) throw new _('response parameter "iss" (issuer) missing');
        if (i2 && i2 !== e10.issuer) throw new _('unexpected "iss" (issuer) response parameter value');
        switch (n2) {
          case void 0:
          case tn:
            if (void 0 !== s2) throw new _('unexpected "state" response parameter encountered');
            break;
          case tr:
            break;
          default:
            if (!T(n2)) throw new _('"expectedState" must be a non-empty string');
            if (void 0 === s2) throw new _('response parameter "state" missing');
            if (s2 !== n2) throw new _('unexpected "state" response parameter value');
        }
        let o2 = tt(r2, "error");
        if (o2) return { error: o2, error_description: tt(r2, "error_description"), error_uri: tt(r2, "error_uri") };
        let l2 = tt(r2, "id_token"), c2 = tt(r2, "token");
        if (void 0 !== l2 || void 0 !== c2) throw new w("implicit and hybrid flows are not supported");
        return a2 = new URLSearchParams(r2), eN.add(a2), a2;
      }
      function ti(e10, t2) {
        switch (e10) {
          case "PS256":
          case "PS384":
          case "PS512":
            return { name: "RSA-PSS", hash: `SHA-${e10.slice(-3)}` };
          case "RS256":
          case "RS384":
          case "RS512":
            return { name: "RSASSA-PKCS1-v1_5", hash: `SHA-${e10.slice(-3)}` };
          case "ES256":
          case "ES384":
            return { name: "ECDSA", namedCurve: `P-${e10.slice(-3)}` };
          case "ES512":
            return { name: "ECDSA", namedCurve: "P-521" };
          case "EdDSA":
            switch (t2) {
              case "Ed25519":
              case "Ed448":
                return t2;
              default:
                throw new w();
            }
          default:
            throw new w();
        }
      }
      async function ts(e10, t2) {
        let { ext: r2, key_ops: n2, use: a2, ...i2 } = t2;
        return crypto.subtle.importKey("jwk", i2, ti(e10, t2.crv), true, ["verify"]);
      }
      async function to(e10, t2, r2, n2) {
        J(e10), z(t2);
        let a2 = en(e10, "device_authorization_endpoint", ea(t2, n2)), i2 = new URLSearchParams(r2);
        i2.set("client_id", t2.client_id);
        let s2 = C(n2?.headers);
        return s2.set("accept", "application/json"), ew(e10, t2, "POST", a2, i2, s2, n2);
      }
      async function tl(e10, t2, r2) {
        let n2;
        if (J(e10), z(t2), !s(r2, Response)) throw TypeError('"response" must be an instance of Response');
        if (200 !== r2.status) {
          let e11;
          if (e11 = await e0(r2)) return e11;
          throw new _('"response" is not a conform Device Authorization Endpoint response');
        }
        eV(r2);
        try {
          n2 = await r2.json();
        } catch (e11) {
          throw new _('failed to parse "response" body as JSON', { cause: e11 });
        }
        if (!R(n2)) throw new _('"response" body must be a top level object');
        if (!T(n2.device_code)) throw new _('"response" body "device_code" property must be a non-empty string');
        if (!T(n2.user_code)) throw new _('"response" body "user_code" property must be a non-empty string');
        if (!T(n2.verification_uri)) throw new _('"response" body "verification_uri" property must be a non-empty string');
        if ("number" != typeof n2.expires_in || n2.expires_in <= 0) throw new _('"response" body "expires_in" property must be a positive number');
        if (void 0 !== n2.verification_uri_complete && !T(n2.verification_uri_complete)) throw new _('"response" body "verification_uri_complete" property must be a non-empty string');
        if (void 0 !== n2.interval && ("number" != typeof n2.interval || n2.interval <= 0)) throw new _('"response" body "interval" property must be a positive number');
        return n2;
      }
      async function tc(e10, t2, r2, n2) {
        if (J(e10), z(t2), !T(r2)) throw TypeError('"deviceCode" must be a non-empty string');
        let a2 = new URLSearchParams(n2?.additionalParameters);
        return a2.set("device_code", r2), ev(e10, t2, "urn:ietf:params:oauth:grant-type:device_code", a2, n2);
      }
      async function tu(e10, t2, r2) {
        return eO(e10, t2, r2);
      }
      async function td(e10, t2) {
        if (!T(e10)) throw TypeError('"alg" must be a non-empty string');
        let r2 = ti(e10, "EdDSA" === e10 ? t2?.crv ?? "Ed25519" : void 0);
        return (e10.startsWith("PS") || e10.startsWith("RS")) && Object.assign(r2, { modulusLength: t2?.modulusLength ?? 2048, publicExponent: new Uint8Array([1, 0, 1]) }), crypto.subtle.generateKey(r2, t2?.extractable ?? false, ["sign", "verify"]);
      }
      function tp(e10) {
        let t2 = new URL(e10);
        return t2.search = "", t2.hash = "", t2.href;
      }
      async function th(e10, t2, r2, n2, a2) {
        let i2 = t2.headers.get("dpop");
        if (null === i2) throw new _("operation indicated DPoP use but the request has no DPoP HTTP Header");
        if (t2.headers.get("authorization")?.toLowerCase().startsWith("dpop ") === false) throw new _("operation indicated DPoP use but the request's Authorization HTTP Header scheme is not DPoP");
        if ("string" != typeof n2.cnf?.jkt) throw new _("operation indicated DPoP use but the JWT Access Token has no jkt confirmation claim");
        let s2 = q(a2), o2 = await e5(i2, te.bind(void 0, void 0, e10?.dpop_signing_alg_values_supported || k), async ({ jwk: e11, alg: t3 }) => {
          if (!e11) throw new _("DPoP Proof is missing the jwk header parameter");
          let r3 = await ts(t3, e11);
          if ("public" !== r3.type) throw new _("DPoP Proof jwk header parameter must contain a public key");
          return r3;
        }, s2, K(a2), void 0).then(eW.bind(void 0, "dpop+jwt")).then(eL.bind(void 0, ["iat", "jti", "ath", "htm", "htu"]));
        if (Math.abs(W() + s2 - o2.claims.iat) > 300) throw new _("DPoP Proof iat is not recent enough");
        if (o2.claims.htm !== t2.method) throw new _("DPoP Proof htm mismatch");
        if ("string" != typeof o2.claims.htu || tp(o2.claims.htu) !== tp(t2.url)) throw new _("DPoP Proof htu mismatch");
        {
          let e11 = y(await crypto.subtle.digest("SHA-256", f.encode(r2)));
          if (o2.claims.ath !== e11) throw new _("DPoP Proof ath mismatch");
        }
        {
          let e11;
          switch (o2.header.jwk.kty) {
            case "EC":
              e11 = { crv: o2.header.jwk.crv, kty: o2.header.jwk.kty, x: o2.header.jwk.x, y: o2.header.jwk.y };
              break;
            case "OKP":
              e11 = { crv: o2.header.jwk.crv, kty: o2.header.jwk.kty, x: o2.header.jwk.x };
              break;
            case "RSA":
              e11 = { e: o2.header.jwk.e, kty: o2.header.jwk.kty, n: o2.header.jwk.n };
              break;
            default:
              throw new w();
          }
          let t3 = y(await crypto.subtle.digest("SHA-256", f.encode(JSON.stringify(e11))));
          if (n2.cnf.jkt !== t3) throw new _("JWT Access Token confirmation mismatch");
        }
      }
      async function tf(e10, t2, r2, n2) {
        if (J(e10), !s(t2, Request)) throw TypeError('"request" must be an instance of Request');
        if (!T(r2)) throw new _('"expectedAudience" must be a non-empty string');
        let a2 = t2.headers.get("authorization");
        if (null === a2) throw new _('"request" is missing an Authorization HTTP Header');
        let { 0: i2, 1: o2, length: l2 } = a2.split(" ");
        switch (i2 = i2.toLowerCase()) {
          case "dpop":
          case "bearer":
            break;
          default:
            throw new w("unsupported Authorization HTTP Header scheme");
        }
        if (2 !== l2) throw new _("invalid Authorization HTTP Header format");
        let c2 = ["iss", "exp", "aud", "sub", "iat", "jti", "client_id"];
        (n2?.requireDPoP || "dpop" === i2 || t2.headers.has("dpop")) && c2.push("cnf");
        let { claims: u2 } = await e5(o2, te.bind(void 0, void 0, k), em.bind(void 0, e10, n2), q(n2), K(n2), void 0).then(eW.bind(void 0, "at+jwt")).then(eL.bind(void 0, c2)).then(e$.bind(void 0, e10.issuer)).then(ej.bind(void 0, r2));
        for (let e11 of ["client_id", "jti", "sub"]) if ("string" != typeof u2[e11]) throw new _(`unexpected JWT "${e11}" claim type`);
        if ("cnf" in u2) {
          if (!R(u2.cnf)) throw new _('unexpected JWT "cnf" (confirmation) claim value');
          let { 0: e11, length: t3 } = Object.keys(u2.cnf);
          if (t3) {
            if (1 !== t3) throw new w("multiple confirmation claims are not supported");
            if ("jkt" !== e11) throw new w("unsupported JWT Confirmation method");
          }
        }
        return (n2?.requireDPoP || "dpop" === i2 || u2.cnf?.jkt !== void 0 || t2.headers.has("dpop")) && await th(e10, t2, o2, u2, n2), u2;
      }
      let tm = c, tg = c, ty = h, tb = h, tw = (...e10) => e7(...e10), tv = (...e10) => tf(...e10), t_ = (...e10) => function(e11, t2, r2) {
        return ex(e11, t2, r2);
      }(...e10), tS = p;
    }, 2397: (e, t, r) => {
      "use strict";
      r.r(t), r.d(t, { __addDisposableResource: () => N, __assign: () => i, __asyncDelegator: () => k, __asyncGenerator: () => A, __asyncValues: () => x, __await: () => E, __awaiter: () => f, __classPrivateFieldGet: () => j, __classPrivateFieldIn: () => $, __classPrivateFieldSet: () => I, __createBinding: () => g, __decorate: () => o, __disposeResources: () => D, __esDecorate: () => c, __exportStar: () => y, __extends: () => a, __generator: () => m, __importDefault: () => T, __importStar: () => P, __makeTemplateObject: () => R, __metadata: () => h, __param: () => l, __propKey: () => d, __read: () => w, __rest: () => s, __rewriteRelativeImportExtension: () => L, __runInitializers: () => u, __setFunctionName: () => p, __spread: () => v, __spreadArray: () => S, __spreadArrays: () => _, __values: () => b, default: () => H });
      var n = function(e2, t2) {
        return (n = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e3, t3) {
          e3.__proto__ = t3;
        } || function(e3, t3) {
          for (var r2 in t3) Object.prototype.hasOwnProperty.call(t3, r2) && (e3[r2] = t3[r2]);
        })(e2, t2);
      };
      function a(e2, t2) {
        if ("function" != typeof t2 && null !== t2) throw TypeError("Class extends value " + String(t2) + " is not a constructor or null");
        function r2() {
          this.constructor = e2;
        }
        n(e2, t2), e2.prototype = null === t2 ? Object.create(t2) : (r2.prototype = t2.prototype, new r2());
      }
      var i = function() {
        return (i = Object.assign || function(e2) {
          for (var t2, r2 = 1, n2 = arguments.length; r2 < n2; r2++) for (var a2 in t2 = arguments[r2]) Object.prototype.hasOwnProperty.call(t2, a2) && (e2[a2] = t2[a2]);
          return e2;
        }).apply(this, arguments);
      };
      function s(e2, t2) {
        var r2 = {};
        for (var n2 in e2) Object.prototype.hasOwnProperty.call(e2, n2) && 0 > t2.indexOf(n2) && (r2[n2] = e2[n2]);
        if (null != e2 && "function" == typeof Object.getOwnPropertySymbols) for (var a2 = 0, n2 = Object.getOwnPropertySymbols(e2); a2 < n2.length; a2++) 0 > t2.indexOf(n2[a2]) && Object.prototype.propertyIsEnumerable.call(e2, n2[a2]) && (r2[n2[a2]] = e2[n2[a2]]);
        return r2;
      }
      function o(e2, t2, r2, n2) {
        var a2, i2 = arguments.length, s2 = i2 < 3 ? t2 : null === n2 ? n2 = Object.getOwnPropertyDescriptor(t2, r2) : n2;
        if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s2 = Reflect.decorate(e2, t2, r2, n2);
        else for (var o2 = e2.length - 1; o2 >= 0; o2--) (a2 = e2[o2]) && (s2 = (i2 < 3 ? a2(s2) : i2 > 3 ? a2(t2, r2, s2) : a2(t2, r2)) || s2);
        return i2 > 3 && s2 && Object.defineProperty(t2, r2, s2), s2;
      }
      function l(e2, t2) {
        return function(r2, n2) {
          t2(r2, n2, e2);
        };
      }
      function c(e2, t2, r2, n2, a2, i2) {
        function s2(e3) {
          if (void 0 !== e3 && "function" != typeof e3) throw TypeError("Function expected");
          return e3;
        }
        for (var o2, l2 = n2.kind, c2 = "getter" === l2 ? "get" : "setter" === l2 ? "set" : "value", u2 = !t2 && e2 ? n2.static ? e2 : e2.prototype : null, d2 = t2 || (u2 ? Object.getOwnPropertyDescriptor(u2, n2.name) : {}), p2 = false, h2 = r2.length - 1; h2 >= 0; h2--) {
          var f2 = {};
          for (var m2 in n2) f2[m2] = "access" === m2 ? {} : n2[m2];
          for (var m2 in n2.access) f2.access[m2] = n2.access[m2];
          f2.addInitializer = function(e3) {
            if (p2) throw TypeError("Cannot add initializers after decoration has completed");
            i2.push(s2(e3 || null));
          };
          var g2 = (0, r2[h2])("accessor" === l2 ? { get: d2.get, set: d2.set } : d2[c2], f2);
          if ("accessor" === l2) {
            if (void 0 === g2) continue;
            if (null === g2 || "object" != typeof g2) throw TypeError("Object expected");
            (o2 = s2(g2.get)) && (d2.get = o2), (o2 = s2(g2.set)) && (d2.set = o2), (o2 = s2(g2.init)) && a2.unshift(o2);
          } else (o2 = s2(g2)) && ("field" === l2 ? a2.unshift(o2) : d2[c2] = o2);
        }
        u2 && Object.defineProperty(u2, n2.name, d2), p2 = true;
      }
      function u(e2, t2, r2) {
        for (var n2 = arguments.length > 2, a2 = 0; a2 < t2.length; a2++) r2 = n2 ? t2[a2].call(e2, r2) : t2[a2].call(e2);
        return n2 ? r2 : void 0;
      }
      function d(e2) {
        return "symbol" == typeof e2 ? e2 : "".concat(e2);
      }
      function p(e2, t2, r2) {
        return "symbol" == typeof t2 && (t2 = t2.description ? "[".concat(t2.description, "]") : ""), Object.defineProperty(e2, "name", { configurable: true, value: r2 ? "".concat(r2, " ", t2) : t2 });
      }
      function h(e2, t2) {
        if ("object" == typeof Reflect && "function" == typeof Reflect.metadata) return Reflect.metadata(e2, t2);
      }
      function f(e2, t2, r2, n2) {
        return new (r2 || (r2 = Promise))(function(a2, i2) {
          function s2(e3) {
            try {
              l2(n2.next(e3));
            } catch (e4) {
              i2(e4);
            }
          }
          function o2(e3) {
            try {
              l2(n2.throw(e3));
            } catch (e4) {
              i2(e4);
            }
          }
          function l2(e3) {
            var t3;
            e3.done ? a2(e3.value) : ((t3 = e3.value) instanceof r2 ? t3 : new r2(function(e4) {
              e4(t3);
            })).then(s2, o2);
          }
          l2((n2 = n2.apply(e2, t2 || [])).next());
        });
      }
      function m(e2, t2) {
        var r2, n2, a2, i2 = { label: 0, sent: function() {
          if (1 & a2[0]) throw a2[1];
          return a2[1];
        }, trys: [], ops: [] }, s2 = Object.create(("function" == typeof Iterator ? Iterator : Object).prototype);
        return s2.next = o2(0), s2.throw = o2(1), s2.return = o2(2), "function" == typeof Symbol && (s2[Symbol.iterator] = function() {
          return this;
        }), s2;
        function o2(o3) {
          return function(l2) {
            return function(o4) {
              if (r2) throw TypeError("Generator is already executing.");
              for (; s2 && (s2 = 0, o4[0] && (i2 = 0)), i2; ) try {
                if (r2 = 1, n2 && (a2 = 2 & o4[0] ? n2.return : o4[0] ? n2.throw || ((a2 = n2.return) && a2.call(n2), 0) : n2.next) && !(a2 = a2.call(n2, o4[1])).done) return a2;
                switch (n2 = 0, a2 && (o4 = [2 & o4[0], a2.value]), o4[0]) {
                  case 0:
                  case 1:
                    a2 = o4;
                    break;
                  case 4:
                    return i2.label++, { value: o4[1], done: false };
                  case 5:
                    i2.label++, n2 = o4[1], o4 = [0];
                    continue;
                  case 7:
                    o4 = i2.ops.pop(), i2.trys.pop();
                    continue;
                  default:
                    if (!(a2 = (a2 = i2.trys).length > 0 && a2[a2.length - 1]) && (6 === o4[0] || 2 === o4[0])) {
                      i2 = 0;
                      continue;
                    }
                    if (3 === o4[0] && (!a2 || o4[1] > a2[0] && o4[1] < a2[3])) {
                      i2.label = o4[1];
                      break;
                    }
                    if (6 === o4[0] && i2.label < a2[1]) {
                      i2.label = a2[1], a2 = o4;
                      break;
                    }
                    if (a2 && i2.label < a2[2]) {
                      i2.label = a2[2], i2.ops.push(o4);
                      break;
                    }
                    a2[2] && i2.ops.pop(), i2.trys.pop();
                    continue;
                }
                o4 = t2.call(e2, i2);
              } catch (e3) {
                o4 = [6, e3], n2 = 0;
              } finally {
                r2 = a2 = 0;
              }
              if (5 & o4[0]) throw o4[1];
              return { value: o4[0] ? o4[1] : void 0, done: true };
            }([o3, l2]);
          };
        }
      }
      var g = Object.create ? function(e2, t2, r2, n2) {
        void 0 === n2 && (n2 = r2);
        var a2 = Object.getOwnPropertyDescriptor(t2, r2);
        (!a2 || ("get" in a2 ? !t2.__esModule : a2.writable || a2.configurable)) && (a2 = { enumerable: true, get: function() {
          return t2[r2];
        } }), Object.defineProperty(e2, n2, a2);
      } : function(e2, t2, r2, n2) {
        void 0 === n2 && (n2 = r2), e2[n2] = t2[r2];
      };
      function y(e2, t2) {
        for (var r2 in e2) "default" === r2 || Object.prototype.hasOwnProperty.call(t2, r2) || g(t2, e2, r2);
      }
      function b(e2) {
        var t2 = "function" == typeof Symbol && Symbol.iterator, r2 = t2 && e2[t2], n2 = 0;
        if (r2) return r2.call(e2);
        if (e2 && "number" == typeof e2.length) return { next: function() {
          return e2 && n2 >= e2.length && (e2 = void 0), { value: e2 && e2[n2++], done: !e2 };
        } };
        throw TypeError(t2 ? "Object is not iterable." : "Symbol.iterator is not defined.");
      }
      function w(e2, t2) {
        var r2 = "function" == typeof Symbol && e2[Symbol.iterator];
        if (!r2) return e2;
        var n2, a2, i2 = r2.call(e2), s2 = [];
        try {
          for (; (void 0 === t2 || t2-- > 0) && !(n2 = i2.next()).done; ) s2.push(n2.value);
        } catch (e3) {
          a2 = { error: e3 };
        } finally {
          try {
            n2 && !n2.done && (r2 = i2.return) && r2.call(i2);
          } finally {
            if (a2) throw a2.error;
          }
        }
        return s2;
      }
      function v() {
        for (var e2 = [], t2 = 0; t2 < arguments.length; t2++) e2 = e2.concat(w(arguments[t2]));
        return e2;
      }
      function _() {
        for (var e2 = 0, t2 = 0, r2 = arguments.length; t2 < r2; t2++) e2 += arguments[t2].length;
        for (var n2 = Array(e2), a2 = 0, t2 = 0; t2 < r2; t2++) for (var i2 = arguments[t2], s2 = 0, o2 = i2.length; s2 < o2; s2++, a2++) n2[a2] = i2[s2];
        return n2;
      }
      function S(e2, t2, r2) {
        if (r2 || 2 == arguments.length) for (var n2, a2 = 0, i2 = t2.length; a2 < i2; a2++) !n2 && a2 in t2 || (n2 || (n2 = Array.prototype.slice.call(t2, 0, a2)), n2[a2] = t2[a2]);
        return e2.concat(n2 || Array.prototype.slice.call(t2));
      }
      function E(e2) {
        return this instanceof E ? (this.v = e2, this) : new E(e2);
      }
      function A(e2, t2, r2) {
        if (!Symbol.asyncIterator) throw TypeError("Symbol.asyncIterator is not defined.");
        var n2, a2 = r2.apply(e2, t2 || []), i2 = [];
        return n2 = Object.create(("function" == typeof AsyncIterator ? AsyncIterator : Object).prototype), s2("next"), s2("throw"), s2("return", function(e3) {
          return function(t3) {
            return Promise.resolve(t3).then(e3, c2);
          };
        }), n2[Symbol.asyncIterator] = function() {
          return this;
        }, n2;
        function s2(e3, t3) {
          a2[e3] && (n2[e3] = function(t4) {
            return new Promise(function(r3, n3) {
              i2.push([e3, t4, r3, n3]) > 1 || o2(e3, t4);
            });
          }, t3 && (n2[e3] = t3(n2[e3])));
        }
        function o2(e3, t3) {
          try {
            var r3;
            (r3 = a2[e3](t3)).value instanceof E ? Promise.resolve(r3.value.v).then(l2, c2) : u2(i2[0][2], r3);
          } catch (e4) {
            u2(i2[0][3], e4);
          }
        }
        function l2(e3) {
          o2("next", e3);
        }
        function c2(e3) {
          o2("throw", e3);
        }
        function u2(e3, t3) {
          e3(t3), i2.shift(), i2.length && o2(i2[0][0], i2[0][1]);
        }
      }
      function k(e2) {
        var t2, r2;
        return t2 = {}, n2("next"), n2("throw", function(e3) {
          throw e3;
        }), n2("return"), t2[Symbol.iterator] = function() {
          return this;
        }, t2;
        function n2(n3, a2) {
          t2[n3] = e2[n3] ? function(t3) {
            return (r2 = !r2) ? { value: E(e2[n3](t3)), done: false } : a2 ? a2(t3) : t3;
          } : a2;
        }
      }
      function x(e2) {
        if (!Symbol.asyncIterator) throw TypeError("Symbol.asyncIterator is not defined.");
        var t2, r2 = e2[Symbol.asyncIterator];
        return r2 ? r2.call(e2) : (e2 = b(e2), t2 = {}, n2("next"), n2("throw"), n2("return"), t2[Symbol.asyncIterator] = function() {
          return this;
        }, t2);
        function n2(r3) {
          t2[r3] = e2[r3] && function(t3) {
            return new Promise(function(n3, a2) {
              !function(e3, t4, r4, n4) {
                Promise.resolve(n4).then(function(t5) {
                  e3({ value: t5, done: r4 });
                }, t4);
              }(n3, a2, (t3 = e2[r3](t3)).done, t3.value);
            });
          };
        }
      }
      function R(e2, t2) {
        return Object.defineProperty ? Object.defineProperty(e2, "raw", { value: t2 }) : e2.raw = t2, e2;
      }
      var C = Object.create ? function(e2, t2) {
        Object.defineProperty(e2, "default", { enumerable: true, value: t2 });
      } : function(e2, t2) {
        e2.default = t2;
      }, O = function(e2) {
        return (O = Object.getOwnPropertyNames || function(e3) {
          var t2 = [];
          for (var r2 in e3) Object.prototype.hasOwnProperty.call(e3, r2) && (t2[t2.length] = r2);
          return t2;
        })(e2);
      };
      function P(e2) {
        if (e2 && e2.__esModule) return e2;
        var t2 = {};
        if (null != e2) for (var r2 = O(e2), n2 = 0; n2 < r2.length; n2++) "default" !== r2[n2] && g(t2, e2, r2[n2]);
        return C(t2, e2), t2;
      }
      function T(e2) {
        return e2 && e2.__esModule ? e2 : { default: e2 };
      }
      function j(e2, t2, r2, n2) {
        if ("a" === r2 && !n2) throw TypeError("Private accessor was defined without a getter");
        if ("function" == typeof t2 ? e2 !== t2 || !n2 : !t2.has(e2)) throw TypeError("Cannot read private member from an object whose class did not declare it");
        return "m" === r2 ? n2 : "a" === r2 ? n2.call(e2) : n2 ? n2.value : t2.get(e2);
      }
      function I(e2, t2, r2, n2, a2) {
        if ("m" === n2) throw TypeError("Private method is not writable");
        if ("a" === n2 && !a2) throw TypeError("Private accessor was defined without a setter");
        if ("function" == typeof t2 ? e2 !== t2 || !a2 : !t2.has(e2)) throw TypeError("Cannot write private member to an object whose class did not declare it");
        return "a" === n2 ? a2.call(e2, r2) : a2 ? a2.value = r2 : t2.set(e2, r2), r2;
      }
      function $(e2, t2) {
        if (null === t2 || "object" != typeof t2 && "function" != typeof t2) throw TypeError("Cannot use 'in' operator on non-object");
        return "function" == typeof e2 ? t2 === e2 : e2.has(t2);
      }
      function N(e2, t2, r2) {
        if (null != t2) {
          var n2, a2;
          if ("object" != typeof t2 && "function" != typeof t2) throw TypeError("Object expected.");
          if (r2) {
            if (!Symbol.asyncDispose) throw TypeError("Symbol.asyncDispose is not defined.");
            n2 = t2[Symbol.asyncDispose];
          }
          if (void 0 === n2) {
            if (!Symbol.dispose) throw TypeError("Symbol.dispose is not defined.");
            n2 = t2[Symbol.dispose], r2 && (a2 = n2);
          }
          if ("function" != typeof n2) throw TypeError("Object not disposable.");
          a2 && (n2 = function() {
            try {
              a2.call(this);
            } catch (e3) {
              return Promise.reject(e3);
            }
          }), e2.stack.push({ value: t2, dispose: n2, async: r2 });
        } else r2 && e2.stack.push({ async: true });
        return t2;
      }
      var M = "function" == typeof SuppressedError ? SuppressedError : function(e2, t2, r2) {
        var n2 = Error(r2);
        return n2.name = "SuppressedError", n2.error = e2, n2.suppressed = t2, n2;
      };
      function D(e2) {
        function t2(t3) {
          e2.error = e2.hasError ? new M(t3, e2.error, "An error was suppressed during disposal.") : t3, e2.hasError = true;
        }
        var r2, n2 = 0;
        return function a2() {
          for (; r2 = e2.stack.pop(); ) try {
            if (!r2.async && 1 === n2) return n2 = 0, e2.stack.push(r2), Promise.resolve().then(a2);
            if (r2.dispose) {
              var i2 = r2.dispose.call(r2.value);
              if (r2.async) return n2 |= 2, Promise.resolve(i2).then(a2, function(e3) {
                return t2(e3), a2();
              });
            } else n2 |= 1;
          } catch (e3) {
            t2(e3);
          }
          if (1 === n2) return e2.hasError ? Promise.reject(e2.error) : Promise.resolve();
          if (e2.hasError) throw e2.error;
        }();
      }
      function L(e2, t2) {
        return "string" == typeof e2 && /^\.\.?\//.test(e2) ? e2.replace(/\.(tsx)$|((?:\.d)?)((?:\.[^./]+?)?)\.([cm]?)ts$/i, function(e3, r2, n2, a2, i2) {
          return r2 ? t2 ? ".jsx" : ".js" : !n2 || a2 && i2 ? n2 + a2 + "." + i2.toLowerCase() + "js" : e3;
        }) : e2;
      }
      let H = { __extends: a, __assign: i, __rest: s, __decorate: o, __param: l, __esDecorate: c, __runInitializers: u, __propKey: d, __setFunctionName: p, __metadata: h, __awaiter: f, __generator: m, __createBinding: g, __exportStar: y, __values: b, __read: w, __spread: v, __spreadArrays: _, __spreadArray: S, __await: E, __asyncGenerator: A, __asyncDelegator: k, __asyncValues: x, __makeTemplateObject: R, __importStar: P, __importDefault: T, __classPrivateFieldGet: j, __classPrivateFieldSet: I, __classPrivateFieldIn: $, __addDisposableResource: N, __disposeResources: D, __rewriteRelativeImportExtension: L };
    } }, (e) => {
      var t = e(e.s = 7413);
      (_ENTRIES = "undefined" == typeof _ENTRIES ? {} : _ENTRIES)["middleware_src/middleware"] = t;
    }]);
  }
});

// node_modules/@opennextjs/aws/dist/core/edgeFunctionHandler.js
var edgeFunctionHandler_exports = {};
__export(edgeFunctionHandler_exports, {
  default: () => edgeFunctionHandler
});
async function edgeFunctionHandler(request) {
  const path3 = new URL(request.url).pathname;
  const routes = globalThis._ROUTES;
  const correspondingRoute = routes.find((route) => route.regex.some((r) => new RegExp(r).test(path3)));
  if (!correspondingRoute) {
    throw new Error(`No route found for ${request.url}`);
  }
  const entry = await self._ENTRIES[`middleware_${correspondingRoute.name}`];
  const result = await entry.default({
    page: correspondingRoute.page,
    request: {
      ...request,
      page: {
        name: correspondingRoute.name
      }
    }
  });
  globalThis.__openNextAls.getStore()?.pendingPromiseRunner.add(result.waitUntil);
  const response = result.response;
  return response;
}
var init_edgeFunctionHandler = __esm({
  "node_modules/@opennextjs/aws/dist/core/edgeFunctionHandler.js"() {
    globalThis._ENTRIES = {};
    globalThis.self = globalThis;
    globalThis._ROUTES = [{ "name": "src/middleware", "page": "/", "regex": ["^(?:\\/(_next\\/data\\/[^/]{1,}))?(?:\\/((?!_next\\/static|_next\\/image|favicon.ico).*))(.json)?[\\/#\\?]?$"] }];
    require_edge_runtime_webpack();
    require_middleware();
  }
});

// node_modules/@opennextjs/aws/dist/utils/promise.js
init_logger();
var DetachedPromise = class {
  resolve;
  reject;
  promise;
  constructor() {
    let resolve;
    let reject;
    this.promise = new Promise((res, rej) => {
      resolve = res;
      reject = rej;
    });
    this.resolve = resolve;
    this.reject = reject;
  }
};
var DetachedPromiseRunner = class {
  promises = [];
  withResolvers() {
    const detachedPromise = new DetachedPromise();
    this.promises.push(detachedPromise);
    return detachedPromise;
  }
  add(promise) {
    const detachedPromise = new DetachedPromise();
    this.promises.push(detachedPromise);
    promise.then(detachedPromise.resolve, detachedPromise.reject);
  }
  async await() {
    debug(`Awaiting ${this.promises.length} detached promises`);
    const results = await Promise.allSettled(this.promises.map((p) => p.promise));
    const rejectedPromises = results.filter((r) => r.status === "rejected");
    rejectedPromises.forEach((r) => {
      error(r.reason);
    });
  }
};
async function awaitAllDetachedPromise() {
  const store = globalThis.__openNextAls.getStore();
  const promisesToAwait = store?.pendingPromiseRunner.await() ?? Promise.resolve();
  if (store?.waitUntil) {
    store.waitUntil(promisesToAwait);
    return;
  }
  await promisesToAwait;
}
function provideNextAfterProvider() {
  const NEXT_REQUEST_CONTEXT_SYMBOL = Symbol.for("@next/request-context");
  const VERCEL_REQUEST_CONTEXT_SYMBOL = Symbol.for("@vercel/request-context");
  const store = globalThis.__openNextAls.getStore();
  const waitUntil = store?.waitUntil ?? ((promise) => store?.pendingPromiseRunner.add(promise));
  const nextAfterContext = {
    get: () => ({
      waitUntil
    })
  };
  globalThis[NEXT_REQUEST_CONTEXT_SYMBOL] = nextAfterContext;
  if (process.env.EMULATE_VERCEL_REQUEST_CONTEXT) {
    globalThis[VERCEL_REQUEST_CONTEXT_SYMBOL] = nextAfterContext;
  }
}
function runWithOpenNextRequestContext({ isISRRevalidation, waitUntil, requestId = Math.random().toString(36) }, fn) {
  return globalThis.__openNextAls.run({
    requestId,
    pendingPromiseRunner: new DetachedPromiseRunner(),
    isISRRevalidation,
    waitUntil,
    writtenTags: /* @__PURE__ */ new Set()
  }, async () => {
    provideNextAfterProvider();
    let result;
    try {
      result = await fn();
    } finally {
      await awaitAllDetachedPromise();
    }
    return result;
  });
}

// node_modules/@opennextjs/aws/dist/adapters/middleware.js
init_logger();

// node_modules/@opennextjs/aws/dist/core/createGenericHandler.js
init_logger();

// node_modules/@opennextjs/aws/dist/core/resolve.js
async function resolveConverter(converter2) {
  if (typeof converter2 === "function") {
    return converter2();
  }
  const m_1 = await Promise.resolve().then(() => (init_edge(), edge_exports));
  return m_1.default;
}
async function resolveWrapper(wrapper) {
  if (typeof wrapper === "function") {
    return wrapper();
  }
  const m_1 = await Promise.resolve().then(() => (init_cloudflare_edge(), cloudflare_edge_exports));
  return m_1.default;
}
async function resolveOriginResolver(originResolver) {
  if (typeof originResolver === "function") {
    return originResolver();
  }
  const m_1 = await Promise.resolve().then(() => (init_pattern_env(), pattern_env_exports));
  return m_1.default;
}
async function resolveAssetResolver(assetResolver) {
  if (typeof assetResolver === "function") {
    return assetResolver();
  }
  const m_1 = await Promise.resolve().then(() => (init_dummy(), dummy_exports));
  return m_1.default;
}
async function resolveProxyRequest(proxyRequest) {
  if (typeof proxyRequest === "function") {
    return proxyRequest();
  }
  const m_1 = await Promise.resolve().then(() => (init_fetch(), fetch_exports));
  return m_1.default;
}

// node_modules/@opennextjs/aws/dist/core/createGenericHandler.js
async function createGenericHandler(handler3) {
  const config = await import("./open-next.config.mjs").then((m) => m.default);
  globalThis.openNextConfig = config;
  const handlerConfig = config[handler3.type];
  const override = handlerConfig && "override" in handlerConfig ? handlerConfig.override : void 0;
  const converter2 = await resolveConverter(override?.converter);
  const { name, wrapper } = await resolveWrapper(override?.wrapper);
  debug("Using wrapper", name);
  return wrapper(handler3.handler, converter2);
}

// node_modules/@opennextjs/aws/dist/core/routing/util.js
import crypto2 from "node:crypto";
import { parse as parseQs, stringify as stringifyQs } from "node:querystring";

// node_modules/@opennextjs/aws/dist/adapters/config/index.js
init_logger();
import path from "node:path";
globalThis.__dirname ??= "";
var NEXT_DIR = path.join(__dirname, ".next");
var OPEN_NEXT_DIR = path.join(__dirname, ".open-next");
debug({ NEXT_DIR, OPEN_NEXT_DIR });
var NextConfig = { "env": {}, "webpack": null, "eslint": { "ignoreDuringBuilds": false }, "typescript": { "ignoreBuildErrors": false, "tsconfigPath": "tsconfig.json" }, "distDir": ".next", "cleanDistDir": true, "assetPrefix": "", "cacheMaxMemorySize": 52428800, "configOrigin": "next.config.js", "useFileSystemPublicRoutes": true, "generateEtags": true, "pageExtensions": ["tsx", "ts", "jsx", "js"], "poweredByHeader": true, "compress": true, "analyticsId": "", "images": { "deviceSizes": [640, 750, 828, 1080, 1200, 1920, 2048, 3840], "imageSizes": [16, 32, 48, 64, 96, 128, 256, 384], "path": "/_next/image", "loader": "default", "loaderFile": "", "domains": ["localhost", "api.personal-finance.namelesscompany.cc"], "disableStaticImages": false, "minimumCacheTTL": 60, "formats": ["image/webp"], "dangerouslyAllowSVG": false, "contentSecurityPolicy": "script-src 'none'; frame-src 'none'; sandbox;", "contentDispositionType": "inline", "remotePatterns": [], "unoptimized": true }, "devIndicators": { "buildActivity": true, "buildActivityPosition": "bottom-right" }, "onDemandEntries": { "maxInactiveAge": 6e4, "pagesBufferLength": 5 }, "amp": { "canonicalBase": "" }, "basePath": "", "sassOptions": {}, "trailingSlash": false, "i18n": null, "productionBrowserSourceMaps": false, "optimizeFonts": true, "excludeDefaultMomentLocales": true, "serverRuntimeConfig": {}, "publicRuntimeConfig": {}, "reactProductionProfiling": false, "reactStrictMode": true, "httpAgentOptions": { "keepAlive": true }, "outputFileTracing": true, "staticPageGenerationTimeout": 60, "swcMinify": true, "output": "standalone", "modularizeImports": { "@mui/icons-material": { "transform": "@mui/icons-material/{{member}}" }, "lodash": { "transform": "lodash/{{member}}" } }, "experimental": { "multiZoneDraftMode": false, "prerenderEarlyExit": false, "serverMinification": true, "serverSourceMaps": false, "linkNoTouchStart": false, "caseSensitiveRoutes": false, "clientRouterFilter": true, "clientRouterFilterRedirects": false, "fetchCacheKeyPrefix": "", "middlewarePrefetch": "flexible", "optimisticClientCache": true, "manualClientBasePath": false, "cpus": 15, "memoryBasedWorkersCount": false, "isrFlushToDisk": true, "workerThreads": false, "optimizeCss": false, "nextScriptWorkers": false, "scrollRestoration": false, "externalDir": false, "disableOptimizedLoading": false, "gzipSize": true, "craCompat": false, "esmExternals": true, "fullySpecified": false, "outputFileTracingRoot": "/Users/aniebiet-abasiudo/code-repo/personal-finance-fe", "swcTraceProfiling": false, "forceSwcTransforms": false, "largePageDataBytes": 128e3, "adjustFontFallbacks": false, "adjustFontFallbacksWithSizeAdjust": false, "typedRoutes": false, "instrumentationHook": false, "bundlePagesExternals": false, "parallelServerCompiles": false, "parallelServerBuildTraces": false, "ppr": false, "missingSuspenseWithCSRBailout": true, "optimizeServerReact": true, "useEarlyImport": false, "staleTimes": { "dynamic": 30, "static": 300 }, "optimizePackageImports": ["lucide-react", "date-fns", "lodash-es", "ramda", "antd", "react-bootstrap", "ahooks", "@ant-design/icons", "@headlessui/react", "@headlessui-float/react", "@heroicons/react/20/solid", "@heroicons/react/24/solid", "@heroicons/react/24/outline", "@visx/visx", "@tremor/react", "rxjs", "@mui/material", "@mui/icons-material", "recharts", "react-use", "@material-ui/core", "@material-ui/icons", "@tabler/icons-react", "mui-core", "react-icons/ai", "react-icons/bi", "react-icons/bs", "react-icons/cg", "react-icons/ci", "react-icons/di", "react-icons/fa", "react-icons/fa6", "react-icons/fc", "react-icons/fi", "react-icons/gi", "react-icons/go", "react-icons/gr", "react-icons/hi", "react-icons/hi2", "react-icons/im", "react-icons/io", "react-icons/io5", "react-icons/lia", "react-icons/lib", "react-icons/lu", "react-icons/md", "react-icons/pi", "react-icons/ri", "react-icons/rx", "react-icons/si", "react-icons/sl", "react-icons/tb", "react-icons/tfi", "react-icons/ti", "react-icons/vsc", "react-icons/wi"], "trustHostHeader": false, "isExperimentalCompile": false }, "configFileName": "next.config.js", "skipMiddlewareUrlNormalize": true, "skipTrailingSlashRedirect": true, "_originalRewrites": { "beforeFiles": [], "afterFiles": [], "fallback": [] } };
var BuildId = "-XxtYeN9vDREIEH2xW8lt";
var RoutesManifest = { "basePath": "", "rewrites": { "beforeFiles": [], "afterFiles": [], "fallback": [] }, "redirects": [], "routes": { "static": [{ "page": "/", "regex": "^/(?:/)?$", "routeKeys": {}, "namedRegex": "^/(?:/)?$" }, { "page": "/_not-found", "regex": "^/_not\\-found(?:/)?$", "routeKeys": {}, "namedRegex": "^/_not\\-found(?:/)?$" }, { "page": "/accounts", "regex": "^/accounts(?:/)?$", "routeKeys": {}, "namedRegex": "^/accounts(?:/)?$" }, { "page": "/budgets", "regex": "^/budgets(?:/)?$", "routeKeys": {}, "namedRegex": "^/budgets(?:/)?$" }, { "page": "/categories", "regex": "^/categories(?:/)?$", "routeKeys": {}, "namedRegex": "^/categories(?:/)?$" }, { "page": "/categories/rules", "regex": "^/categories/rules(?:/)?$", "routeKeys": {}, "namedRegex": "^/categories/rules(?:/)?$" }, { "page": "/categorize", "regex": "^/categorize(?:/)?$", "routeKeys": {}, "namedRegex": "^/categorize(?:/)?$" }, { "page": "/dashboard", "regex": "^/dashboard(?:/)?$", "routeKeys": {}, "namedRegex": "^/dashboard(?:/)?$" }, { "page": "/export", "regex": "^/export(?:/)?$", "routeKeys": {}, "namedRegex": "^/export(?:/)?$" }, { "page": "/goals", "regex": "^/goals(?:/)?$", "routeKeys": {}, "namedRegex": "^/goals(?:/)?$" }, { "page": "/insights", "regex": "^/insights(?:/)?$", "routeKeys": {}, "namedRegex": "^/insights(?:/)?$" }, { "page": "/login", "regex": "^/login(?:/)?$", "routeKeys": {}, "namedRegex": "^/login(?:/)?$" }, { "page": "/onboarding/budgets", "regex": "^/onboarding/budgets(?:/)?$", "routeKeys": {}, "namedRegex": "^/onboarding/budgets(?:/)?$" }, { "page": "/onboarding/complete", "regex": "^/onboarding/complete(?:/)?$", "routeKeys": {}, "namedRegex": "^/onboarding/complete(?:/)?$" }, { "page": "/onboarding/connect", "regex": "^/onboarding/connect(?:/)?$", "routeKeys": {}, "namedRegex": "^/onboarding/connect(?:/)?$" }, { "page": "/onboarding/profile", "regex": "^/onboarding/profile(?:/)?$", "routeKeys": {}, "namedRegex": "^/onboarding/profile(?:/)?$" }, { "page": "/onboarding/welcome", "regex": "^/onboarding/welcome(?:/)?$", "routeKeys": {}, "namedRegex": "^/onboarding/welcome(?:/)?$" }, { "page": "/pricing", "regex": "^/pricing(?:/)?$", "routeKeys": {}, "namedRegex": "^/pricing(?:/)?$" }, { "page": "/recurring", "regex": "^/recurring(?:/)?$", "routeKeys": {}, "namedRegex": "^/recurring(?:/)?$" }, { "page": "/reports", "regex": "^/reports(?:/)?$", "routeKeys": {}, "namedRegex": "^/reports(?:/)?$" }, { "page": "/reports/categories", "regex": "^/reports/categories(?:/)?$", "routeKeys": {}, "namedRegex": "^/reports/categories(?:/)?$" }, { "page": "/reports/monthly", "regex": "^/reports/monthly(?:/)?$", "routeKeys": {}, "namedRegex": "^/reports/monthly(?:/)?$" }, { "page": "/reports/net-worth", "regex": "^/reports/net\\-worth(?:/)?$", "routeKeys": {}, "namedRegex": "^/reports/net\\-worth(?:/)?$" }, { "page": "/settings", "regex": "^/settings(?:/)?$", "routeKeys": {}, "namedRegex": "^/settings(?:/)?$" }, { "page": "/signup", "regex": "^/signup(?:/)?$", "routeKeys": {}, "namedRegex": "^/signup(?:/)?$" }, { "page": "/transactions", "regex": "^/transactions(?:/)?$", "routeKeys": {}, "namedRegex": "^/transactions(?:/)?$" }, { "page": "/transactions/new", "regex": "^/transactions/new(?:/)?$", "routeKeys": {}, "namedRegex": "^/transactions/new(?:/)?$" }], "dynamic": [{ "page": "/accounts/[id]", "regex": "^/accounts/([^/]+?)(?:/)?$", "routeKeys": { "nxtPid": "nxtPid" }, "namedRegex": "^/accounts/(?<nxtPid>[^/]+?)(?:/)?$" }, { "page": "/api/auth/[auth0]", "regex": "^/api/auth/([^/]+?)(?:/)?$", "routeKeys": { "nxtPauth0": "nxtPauth0" }, "namedRegex": "^/api/auth/(?<nxtPauth0>[^/]+?)(?:/)?$" }, { "page": "/budgets/[id]", "regex": "^/budgets/([^/]+?)(?:/)?$", "routeKeys": { "nxtPid": "nxtPid" }, "namedRegex": "^/budgets/(?<nxtPid>[^/]+?)(?:/)?$" }, { "page": "/goals/[id]", "regex": "^/goals/([^/]+?)(?:/)?$", "routeKeys": { "nxtPid": "nxtPid" }, "namedRegex": "^/goals/(?<nxtPid>[^/]+?)(?:/)?$" }], "data": { "static": [], "dynamic": [] } }, "locales": [] };
var ConfigHeaders = [];
var PrerenderManifest = { "version": 4, "routes": { "/onboarding/complete": { "experimentalBypassFor": [{ "type": "header", "key": "Next-Action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/onboarding/complete", "dataRoute": "/onboarding/complete.rsc" }, "/onboarding/welcome": { "experimentalBypassFor": [{ "type": "header", "key": "Next-Action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/onboarding/welcome", "dataRoute": "/onboarding/welcome.rsc" }, "/login": { "experimentalBypassFor": [{ "type": "header", "key": "Next-Action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/login", "dataRoute": "/login.rsc" }, "/onboarding/connect": { "experimentalBypassFor": [{ "type": "header", "key": "Next-Action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/onboarding/connect", "dataRoute": "/onboarding/connect.rsc" }, "/onboarding/profile": { "experimentalBypassFor": [{ "type": "header", "key": "Next-Action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/onboarding/profile", "dataRoute": "/onboarding/profile.rsc" }, "/signup": { "experimentalBypassFor": [{ "type": "header", "key": "Next-Action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/signup", "dataRoute": "/signup.rsc" }, "/accounts": { "experimentalBypassFor": [{ "type": "header", "key": "Next-Action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/accounts", "dataRoute": "/accounts.rsc" }, "/transactions/new": { "experimentalBypassFor": [{ "type": "header", "key": "Next-Action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/transactions/new", "dataRoute": "/transactions/new.rsc" }, "/onboarding/budgets": { "experimentalBypassFor": [{ "type": "header", "key": "Next-Action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/onboarding/budgets", "dataRoute": "/onboarding/budgets.rsc" }, "/reports": { "experimentalBypassFor": [{ "type": "header", "key": "Next-Action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/reports", "dataRoute": "/reports.rsc" }, "/categorize": { "experimentalBypassFor": [{ "type": "header", "key": "Next-Action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/categorize", "dataRoute": "/categorize.rsc" }, "/categories/rules": { "experimentalBypassFor": [{ "type": "header", "key": "Next-Action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/categories/rules", "dataRoute": "/categories/rules.rsc" }, "/export": { "experimentalBypassFor": [{ "type": "header", "key": "Next-Action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/export", "dataRoute": "/export.rsc" }, "/budgets": { "experimentalBypassFor": [{ "type": "header", "key": "Next-Action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/budgets", "dataRoute": "/budgets.rsc" }, "/reports/net-worth": { "experimentalBypassFor": [{ "type": "header", "key": "Next-Action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/reports/net-worth", "dataRoute": "/reports/net-worth.rsc" }, "/goals": { "experimentalBypassFor": [{ "type": "header", "key": "Next-Action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/goals", "dataRoute": "/goals.rsc" }, "/": { "experimentalBypassFor": [{ "type": "header", "key": "Next-Action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/", "dataRoute": "/index.rsc" }, "/pricing": { "experimentalBypassFor": [{ "type": "header", "key": "Next-Action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/pricing", "dataRoute": "/pricing.rsc" }, "/categories": { "experimentalBypassFor": [{ "type": "header", "key": "Next-Action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/categories", "dataRoute": "/categories.rsc" }, "/settings": { "experimentalBypassFor": [{ "type": "header", "key": "Next-Action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/settings", "dataRoute": "/settings.rsc" }, "/reports/monthly": { "experimentalBypassFor": [{ "type": "header", "key": "Next-Action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/reports/monthly", "dataRoute": "/reports/monthly.rsc" }, "/transactions": { "experimentalBypassFor": [{ "type": "header", "key": "Next-Action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/transactions", "dataRoute": "/transactions.rsc" }, "/reports/categories": { "experimentalBypassFor": [{ "type": "header", "key": "Next-Action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/reports/categories", "dataRoute": "/reports/categories.rsc" }, "/dashboard": { "experimentalBypassFor": [{ "type": "header", "key": "Next-Action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/dashboard", "dataRoute": "/dashboard.rsc" }, "/insights": { "experimentalBypassFor": [{ "type": "header", "key": "Next-Action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/insights", "dataRoute": "/insights.rsc" }, "/recurring": { "experimentalBypassFor": [{ "type": "header", "key": "Next-Action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/recurring", "dataRoute": "/recurring.rsc" } }, "dynamicRoutes": {}, "notFoundRoutes": [], "preview": { "previewModeId": "adfa94e780befcec7d4ba9c55dbfdf56", "previewModeSigningKey": "bb31b0860a03f105598a8e6ec19cbf50f461d9db0e56d747701f773be4264ac5", "previewModeEncryptionKey": "4ae29cce31de9eae6865d76fbb9a9a2c9fa6f2ec144bad3bb1f99fc83a212126" } };
var MiddlewareManifest = { "version": 3, "middleware": { "/": { "files": ["server/edge-runtime-webpack.js", "server/src/middleware.js"], "name": "src/middleware", "page": "/", "matchers": [{ "regexp": "^(?:\\/(_next\\/data\\/[^/]{1,}))?(?:\\/((?!_next\\/static|_next\\/image|favicon.ico).*))(.json)?[\\/#\\?]?$", "originalSource": "/((?!_next/static|_next/image|favicon.ico).*)" }], "wasm": [], "assets": [], "env": { "__NEXT_BUILD_ID": "-XxtYeN9vDREIEH2xW8lt", "NEXT_SERVER_ACTIONS_ENCRYPTION_KEY": "PDTWeBGRBYg8wSlybWWXk539YXN9R4yLAS4Z5FED5Xw=", "__NEXT_PREVIEW_MODE_ID": "adfa94e780befcec7d4ba9c55dbfdf56", "__NEXT_PREVIEW_MODE_ENCRYPTION_KEY": "4ae29cce31de9eae6865d76fbb9a9a2c9fa6f2ec144bad3bb1f99fc83a212126", "__NEXT_PREVIEW_MODE_SIGNING_KEY": "bb31b0860a03f105598a8e6ec19cbf50f461d9db0e56d747701f773be4264ac5" } } }, "functions": {}, "sortedMiddleware": ["/"] };
var AppPathRoutesManifest = { "/_not-found/page": "/_not-found", "/onboarding/budgets/page": "/onboarding/budgets", "/onboarding/complete/page": "/onboarding/complete", "/onboarding/connect/page": "/onboarding/connect", "/login/page": "/login", "/onboarding/welcome/page": "/onboarding/welcome", "/onboarding/profile/page": "/onboarding/profile", "/page": "/", "/pricing/page": "/pricing", "/signup/page": "/signup", "/api/auth/[auth0]/route": "/api/auth/[auth0]", "/(dashboard)/categorize/page": "/categorize", "/(dashboard)/goals/[id]/page": "/goals/[id]", "/(dashboard)/accounts/[id]/page": "/accounts/[id]", "/(dashboard)/categories/rules/page": "/categories/rules", "/(dashboard)/budgets/[id]/page": "/budgets/[id]", "/(dashboard)/reports/categories/page": "/reports/categories", "/(dashboard)/reports/net-worth/page": "/reports/net-worth", "/(dashboard)/reports/monthly/page": "/reports/monthly", "/(dashboard)/budgets/page": "/budgets", "/(dashboard)/goals/page": "/goals", "/(dashboard)/accounts/page": "/accounts", "/(dashboard)/categories/page": "/categories", "/(dashboard)/transactions/new/page": "/transactions/new", "/(dashboard)/insights/page": "/insights", "/(dashboard)/recurring/page": "/recurring", "/(dashboard)/export/page": "/export", "/(dashboard)/reports/page": "/reports", "/(dashboard)/settings/page": "/settings", "/(dashboard)/transactions/page": "/transactions", "/(dashboard)/dashboard/page": "/dashboard" };
var FunctionsConfigManifest = { "version": 1, "functions": { "/api/auth/[auth0]": {}, "/export": {}, "/accounts": {}, "/budgets": {}, "/insights": {}, "/goals": {}, "/reports": {}, "/recurring": {}, "/settings": {}, "/categories": {}, "/transactions": {}, "/dashboard": {} } };
var PagesManifest = { "/_app": "pages/_app.js", "/_error": "pages/_error.js", "/_document": "pages/_document.js", "/404": "pages/404.html" };
process.env.NEXT_BUILD_ID = BuildId;
process.env.NEXT_PREVIEW_MODE_ID = PrerenderManifest?.preview?.previewModeId;

// node_modules/@opennextjs/aws/dist/http/openNextResponse.js
init_logger();
init_util();
import { Transform } from "node:stream";

// node_modules/@opennextjs/aws/dist/core/routing/util.js
init_util();
init_logger();
import { ReadableStream as ReadableStream2 } from "node:stream/web";

// node_modules/@opennextjs/aws/dist/utils/binary.js
var commonBinaryMimeTypes = /* @__PURE__ */ new Set([
  "application/octet-stream",
  // Docs
  "application/epub+zip",
  "application/msword",
  "application/pdf",
  "application/rtf",
  "application/vnd.amazon.ebook",
  "application/vnd.ms-excel",
  "application/vnd.ms-powerpoint",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  // Fonts
  "font/otf",
  "font/woff",
  "font/woff2",
  // Images
  "image/bmp",
  "image/gif",
  "image/jpeg",
  "image/png",
  "image/tiff",
  "image/vnd.microsoft.icon",
  "image/webp",
  // Audio
  "audio/3gpp",
  "audio/aac",
  "audio/basic",
  "audio/flac",
  "audio/mpeg",
  "audio/ogg",
  "audio/wavaudio/webm",
  "audio/x-aiff",
  "audio/x-midi",
  "audio/x-wav",
  // Video
  "video/3gpp",
  "video/mp2t",
  "video/mpeg",
  "video/ogg",
  "video/quicktime",
  "video/webm",
  "video/x-msvideo",
  // Archives
  "application/java-archive",
  "application/vnd.apple.installer+xml",
  "application/x-7z-compressed",
  "application/x-apple-diskimage",
  "application/x-bzip",
  "application/x-bzip2",
  "application/x-gzip",
  "application/x-java-archive",
  "application/x-rar-compressed",
  "application/x-tar",
  "application/x-zip",
  "application/zip",
  // Serialized data
  "application/x-protobuf"
]);
function isBinaryContentType(contentType) {
  if (!contentType)
    return false;
  const value = contentType.split(";")[0];
  return commonBinaryMimeTypes.has(value);
}

// node_modules/@opennextjs/aws/dist/core/routing/i18n/index.js
init_stream();
init_logger();

// node_modules/@opennextjs/aws/dist/core/routing/i18n/accept-header.js
function parse(raw, preferences, options) {
  const lowers = /* @__PURE__ */ new Map();
  const header = raw.replace(/[ \t]/g, "");
  if (preferences) {
    let pos = 0;
    for (const preference of preferences) {
      const lower = preference.toLowerCase();
      lowers.set(lower, { orig: preference, pos: pos++ });
      if (options.prefixMatch) {
        const parts2 = lower.split("-");
        while (parts2.pop(), parts2.length > 0) {
          const joined = parts2.join("-");
          if (!lowers.has(joined)) {
            lowers.set(joined, { orig: preference, pos: pos++ });
          }
        }
      }
    }
  }
  const parts = header.split(",");
  const selections = [];
  const map = /* @__PURE__ */ new Set();
  for (let i = 0; i < parts.length; ++i) {
    const part = parts[i];
    if (!part) {
      continue;
    }
    const params = part.split(";");
    if (params.length > 2) {
      throw new Error(`Invalid ${options.type} header`);
    }
    const token = params[0].toLowerCase();
    if (!token) {
      throw new Error(`Invalid ${options.type} header`);
    }
    const selection = { token, pos: i, q: 1 };
    if (preferences && lowers.has(token)) {
      selection.pref = lowers.get(token).pos;
    }
    map.add(selection.token);
    if (params.length === 2) {
      const q = params[1];
      const [key, value] = q.split("=");
      if (!value || key !== "q" && key !== "Q") {
        throw new Error(`Invalid ${options.type} header`);
      }
      const score = Number.parseFloat(value);
      if (score === 0) {
        continue;
      }
      if (Number.isFinite(score) && score <= 1 && score >= 1e-3) {
        selection.q = score;
      }
    }
    selections.push(selection);
  }
  selections.sort((a, b) => {
    if (b.q !== a.q) {
      return b.q - a.q;
    }
    if (b.pref !== a.pref) {
      if (a.pref === void 0) {
        return 1;
      }
      if (b.pref === void 0) {
        return -1;
      }
      return a.pref - b.pref;
    }
    return a.pos - b.pos;
  });
  const values = selections.map((selection) => selection.token);
  if (!preferences || !preferences.length) {
    return values;
  }
  const preferred = [];
  for (const selection of values) {
    if (selection === "*") {
      for (const [preference, value] of lowers) {
        if (!map.has(preference)) {
          preferred.push(value.orig);
        }
      }
    } else {
      const lower = selection.toLowerCase();
      if (lowers.has(lower)) {
        preferred.push(lowers.get(lower).orig);
      }
    }
  }
  return preferred;
}
function acceptLanguage(header = "", preferences) {
  return parse(header, preferences, {
    type: "accept-language",
    prefixMatch: true
  })[0] || void 0;
}

// node_modules/@opennextjs/aws/dist/core/routing/i18n/index.js
function isLocalizedPath(path3) {
  return NextConfig.i18n?.locales.includes(path3.split("/")[1].toLowerCase()) ?? false;
}
function getLocaleFromCookie(cookies) {
  const i18n = NextConfig.i18n;
  const nextLocale = cookies.NEXT_LOCALE?.toLowerCase();
  return nextLocale ? i18n?.locales.find((locale) => nextLocale === locale.toLowerCase()) : void 0;
}
function detectDomainLocale({ hostname, detectedLocale }) {
  const i18n = NextConfig.i18n;
  const domains = i18n?.domains;
  if (!domains) {
    return;
  }
  const lowercasedLocale = detectedLocale?.toLowerCase();
  for (const domain of domains) {
    const domainHostname = domain.domain.split(":", 1)[0].toLowerCase();
    if (hostname === domainHostname || lowercasedLocale === domain.defaultLocale.toLowerCase() || domain.locales?.some((locale) => lowercasedLocale === locale.toLowerCase())) {
      return domain;
    }
  }
}
function detectLocale(internalEvent, i18n) {
  const domainLocale = detectDomainLocale({
    hostname: internalEvent.headers.host
  });
  if (i18n.localeDetection === false) {
    return domainLocale?.defaultLocale ?? i18n.defaultLocale;
  }
  const cookiesLocale = getLocaleFromCookie(internalEvent.cookies);
  const preferredLocale = acceptLanguage(internalEvent.headers["accept-language"], i18n?.locales);
  debug({
    cookiesLocale,
    preferredLocale,
    defaultLocale: i18n.defaultLocale,
    domainLocale
  });
  return domainLocale?.defaultLocale ?? cookiesLocale ?? preferredLocale ?? i18n.defaultLocale;
}
function localizePath(internalEvent) {
  const i18n = NextConfig.i18n;
  if (!i18n) {
    return internalEvent.rawPath;
  }
  if (isLocalizedPath(internalEvent.rawPath)) {
    return internalEvent.rawPath;
  }
  const detectedLocale = detectLocale(internalEvent, i18n);
  return `/${detectedLocale}${internalEvent.rawPath}`;
}
function handleLocaleRedirect(internalEvent) {
  const i18n = NextConfig.i18n;
  if (!i18n || i18n.localeDetection === false || internalEvent.rawPath !== "/") {
    return false;
  }
  const preferredLocale = acceptLanguage(internalEvent.headers["accept-language"], i18n?.locales);
  const detectedLocale = detectLocale(internalEvent, i18n);
  const domainLocale = detectDomainLocale({
    hostname: internalEvent.headers.host
  });
  const preferredDomain = detectDomainLocale({
    detectedLocale: preferredLocale
  });
  if (domainLocale && preferredDomain) {
    const isPDomain = preferredDomain.domain === domainLocale.domain;
    const isPLocale = preferredDomain.defaultLocale === preferredLocale;
    if (!isPDomain || !isPLocale) {
      const scheme = `http${preferredDomain.http ? "" : "s"}`;
      const rlocale = isPLocale ? "" : preferredLocale;
      return {
        type: "core",
        statusCode: 307,
        headers: {
          Location: `${scheme}://${preferredDomain.domain}/${rlocale}`
        },
        body: emptyReadableStream(),
        isBase64Encoded: false
      };
    }
  }
  const defaultLocale = domainLocale?.defaultLocale ?? i18n.defaultLocale;
  if (detectedLocale.toLowerCase() !== defaultLocale.toLowerCase()) {
    return {
      type: "core",
      statusCode: 307,
      headers: {
        Location: constructNextUrl(internalEvent.url, `/${detectedLocale}`)
      },
      body: emptyReadableStream(),
      isBase64Encoded: false
    };
  }
  return false;
}

// node_modules/@opennextjs/aws/dist/core/routing/queue.js
function generateShardId(rawPath, maxConcurrency, prefix) {
  let a = cyrb128(rawPath);
  let t = a += 1831565813;
  t = Math.imul(t ^ t >>> 15, t | 1);
  t ^= t + Math.imul(t ^ t >>> 7, t | 61);
  const randomFloat = ((t ^ t >>> 14) >>> 0) / 4294967296;
  const randomInt = Math.floor(randomFloat * maxConcurrency);
  return `${prefix}-${randomInt}`;
}
function generateMessageGroupId(rawPath) {
  const maxConcurrency = Number.parseInt(process.env.MAX_REVALIDATE_CONCURRENCY ?? "10");
  return generateShardId(rawPath, maxConcurrency, "revalidate");
}
function cyrb128(str) {
  let h1 = 1779033703;
  let h2 = 3144134277;
  let h3 = 1013904242;
  let h4 = 2773480762;
  for (let i = 0, k; i < str.length; i++) {
    k = str.charCodeAt(i);
    h1 = h2 ^ Math.imul(h1 ^ k, 597399067);
    h2 = h3 ^ Math.imul(h2 ^ k, 2869860233);
    h3 = h4 ^ Math.imul(h3 ^ k, 951274213);
    h4 = h1 ^ Math.imul(h4 ^ k, 2716044179);
  }
  h1 = Math.imul(h3 ^ h1 >>> 18, 597399067);
  h2 = Math.imul(h4 ^ h2 >>> 22, 2869860233);
  h3 = Math.imul(h1 ^ h3 >>> 17, 951274213);
  h4 = Math.imul(h2 ^ h4 >>> 19, 2716044179);
  h1 ^= h2 ^ h3 ^ h4, h2 ^= h1, h3 ^= h1, h4 ^= h1;
  return h1 >>> 0;
}

// node_modules/@opennextjs/aws/dist/core/routing/util.js
function isExternal(url, host) {
  if (!url)
    return false;
  const pattern = /^https?:\/\//;
  if (!pattern.test(url))
    return false;
  if (host) {
    try {
      const parsedUrl = new URL(url);
      return parsedUrl.host !== host;
    } catch {
      return !url.includes(host);
    }
  }
  return true;
}
function convertFromQueryString(query) {
  if (query === "")
    return {};
  const queryParts = query.split("&");
  return getQueryFromIterator(queryParts.map((p) => {
    const [key, value] = p.split("=");
    return [key, value];
  }));
}
function getUrlParts(url, isExternal2) {
  if (!isExternal2) {
    const regex2 = /\/([^?]*)\??(.*)/;
    const match3 = url.match(regex2);
    return {
      hostname: "",
      pathname: match3?.[1] ? `/${match3[1]}` : url,
      protocol: "",
      queryString: match3?.[2] ?? ""
    };
  }
  const regex = /^(https?:)\/\/?([^\/\s]+)(\/[^?]*)?(\?.*)?/;
  const match2 = url.match(regex);
  if (!match2) {
    throw new Error(`Invalid external URL: ${url}`);
  }
  return {
    protocol: match2[1] ?? "https:",
    hostname: match2[2],
    pathname: match2[3] ?? "",
    queryString: match2[4]?.slice(1) ?? ""
  };
}
function constructNextUrl(baseUrl, path3) {
  const nextBasePath = NextConfig.basePath ?? "";
  const url = new URL(`${nextBasePath}${path3}`, baseUrl);
  return url.href;
}
function convertToQueryString(query) {
  const queryStrings = [];
  Object.entries(query).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((entry) => queryStrings.push(`${key}=${entry}`));
    } else {
      queryStrings.push(`${key}=${value}`);
    }
  });
  return queryStrings.length > 0 ? `?${queryStrings.join("&")}` : "";
}
function getMiddlewareMatch(middlewareManifest2, functionsManifest) {
  if (functionsManifest?.functions?.["/_middleware"]) {
    return functionsManifest.functions["/_middleware"].matchers?.map(({ regexp }) => new RegExp(regexp)) ?? [/.*/];
  }
  const rootMiddleware = middlewareManifest2.middleware["/"];
  if (!rootMiddleware?.matchers)
    return [];
  return rootMiddleware.matchers.map(({ regexp }) => new RegExp(regexp));
}
function escapeRegex(str, { isPath } = {}) {
  const result = str.replaceAll("(.)", "_\xB51_").replaceAll("(..)", "_\xB52_").replaceAll("(...)", "_\xB53_");
  return isPath ? result : result.replaceAll("+", "_\xB54_");
}
function unescapeRegex(str) {
  return str.replaceAll("_\xB51_", "(.)").replaceAll("_\xB52_", "(..)").replaceAll("_\xB53_", "(...)").replaceAll("_\xB54_", "+");
}
function convertBodyToReadableStream(method, body) {
  if (method === "GET" || method === "HEAD")
    return void 0;
  if (!body)
    return void 0;
  return new ReadableStream2({
    start(controller) {
      controller.enqueue(body);
      controller.close();
    }
  });
}
var CommonHeaders;
(function(CommonHeaders2) {
  CommonHeaders2["CACHE_CONTROL"] = "cache-control";
  CommonHeaders2["NEXT_CACHE"] = "x-nextjs-cache";
})(CommonHeaders || (CommonHeaders = {}));
function normalizeLocationHeader(location, baseUrl, encodeQuery = false) {
  if (!URL.canParse(location)) {
    return location;
  }
  const locationURL = new URL(location);
  const origin = new URL(baseUrl).origin;
  let search = locationURL.search;
  if (encodeQuery && search) {
    search = `?${stringifyQs(parseQs(search.slice(1)))}`;
  }
  const href = `${locationURL.origin}${locationURL.pathname}${search}${locationURL.hash}`;
  if (locationURL.origin === origin) {
    return href.slice(origin.length);
  }
  return href;
}

// node_modules/@opennextjs/aws/dist/core/routingHandler.js
init_logger();

// node_modules/@opennextjs/aws/dist/core/routing/cacheInterceptor.js
import { createHash } from "node:crypto";
init_stream();

// node_modules/@opennextjs/aws/dist/utils/cache.js
init_logger();
async function hasBeenRevalidated(key, tags, cacheEntry) {
  if (globalThis.openNextConfig.dangerous?.disableTagCache) {
    return false;
  }
  const value = cacheEntry.value;
  if (!value) {
    return true;
  }
  if ("type" in cacheEntry && cacheEntry.type === "page") {
    return false;
  }
  const lastModified = cacheEntry.lastModified ?? Date.now();
  if (globalThis.tagCache.mode === "nextMode") {
    return tags.length === 0 ? false : await globalThis.tagCache.hasBeenRevalidated(tags, lastModified);
  }
  const _lastModified = await globalThis.tagCache.getLastModified(key, lastModified);
  return _lastModified === -1;
}
function getTagsFromValue(value) {
  if (!value) {
    return [];
  }
  try {
    const cacheTags = value.meta?.headers?.["x-next-cache-tags"]?.split(",") ?? [];
    delete value.meta?.headers?.["x-next-cache-tags"];
    return cacheTags;
  } catch (e) {
    return [];
  }
}

// node_modules/@opennextjs/aws/dist/core/routing/cacheInterceptor.js
init_logger();
var CACHE_ONE_YEAR = 60 * 60 * 24 * 365;
var CACHE_ONE_MONTH = 60 * 60 * 24 * 30;
var VARY_HEADER = "RSC, Next-Router-State-Tree, Next-Router-Prefetch, Next-Router-Segment-Prefetch, Next-Url";
var NEXT_SEGMENT_PREFETCH_HEADER = "next-router-segment-prefetch";
var NEXT_PRERENDER_HEADER = "x-nextjs-prerender";
var NEXT_POSTPONED_HEADER = "x-nextjs-postponed";
async function computeCacheControl(path3, body, host, revalidate, lastModified) {
  let finalRevalidate = CACHE_ONE_YEAR;
  const existingRoute = Object.entries(PrerenderManifest?.routes ?? {}).find((p) => p[0] === path3)?.[1];
  if (revalidate === void 0 && existingRoute) {
    finalRevalidate = existingRoute.initialRevalidateSeconds === false ? CACHE_ONE_YEAR : existingRoute.initialRevalidateSeconds;
  } else if (revalidate !== void 0) {
    finalRevalidate = revalidate === false ? CACHE_ONE_YEAR : revalidate;
  }
  const age = Math.round((Date.now() - (lastModified ?? 0)) / 1e3);
  const hash = (str) => createHash("md5").update(str).digest("hex");
  const etag = hash(body);
  if (revalidate === 0) {
    return {
      "cache-control": "private, no-cache, no-store, max-age=0, must-revalidate",
      "x-opennext-cache": "ERROR",
      etag
    };
  }
  if (finalRevalidate !== CACHE_ONE_YEAR) {
    const sMaxAge = Math.max(finalRevalidate - age, 1);
    debug("sMaxAge", {
      finalRevalidate,
      age,
      lastModified,
      revalidate
    });
    const isStale = sMaxAge === 1;
    if (isStale) {
      let url = NextConfig.trailingSlash ? `${path3}/` : path3;
      if (NextConfig.basePath) {
        url = `${NextConfig.basePath}${url}`;
      }
      await globalThis.queue.send({
        MessageBody: {
          host,
          url,
          eTag: etag,
          lastModified: lastModified ?? Date.now()
        },
        MessageDeduplicationId: hash(`${path3}-${lastModified}-${etag}`),
        MessageGroupId: generateMessageGroupId(path3)
      });
    }
    return {
      "cache-control": `s-maxage=${sMaxAge}, stale-while-revalidate=${CACHE_ONE_MONTH}`,
      "x-opennext-cache": isStale ? "STALE" : "HIT",
      etag
    };
  }
  return {
    "cache-control": `s-maxage=${CACHE_ONE_YEAR}, stale-while-revalidate=${CACHE_ONE_MONTH}`,
    "x-opennext-cache": "HIT",
    etag
  };
}
function getBodyForAppRouter(event, cachedValue) {
  if (cachedValue.type !== "app") {
    throw new Error("getBodyForAppRouter called with non-app cache value");
  }
  try {
    const segmentHeader = `${event.headers[NEXT_SEGMENT_PREFETCH_HEADER]}`;
    const isSegmentResponse = Boolean(segmentHeader) && segmentHeader in (cachedValue.segmentData || {});
    const body = isSegmentResponse ? cachedValue.segmentData[segmentHeader] : cachedValue.rsc;
    return {
      body,
      additionalHeaders: isSegmentResponse ? { [NEXT_PRERENDER_HEADER]: "1", [NEXT_POSTPONED_HEADER]: "2" } : {}
    };
  } catch (e) {
    error("Error while getting body for app router from cache:", e);
    return { body: cachedValue.rsc, additionalHeaders: {} };
  }
}
async function generateResult(event, localizedPath, cachedValue, lastModified) {
  debug("Returning result from experimental cache");
  let body = "";
  let type = "application/octet-stream";
  let isDataRequest = false;
  let additionalHeaders = {};
  if (cachedValue.type === "app") {
    isDataRequest = Boolean(event.headers.rsc);
    if (isDataRequest) {
      const { body: appRouterBody, additionalHeaders: appHeaders } = getBodyForAppRouter(event, cachedValue);
      body = appRouterBody;
      additionalHeaders = appHeaders;
    } else {
      body = cachedValue.html;
    }
    type = isDataRequest ? "text/x-component" : "text/html; charset=utf-8";
  } else if (cachedValue.type === "page") {
    isDataRequest = Boolean(event.query.__nextDataReq);
    body = isDataRequest ? JSON.stringify(cachedValue.json) : cachedValue.html;
    type = isDataRequest ? "application/json" : "text/html; charset=utf-8";
  } else {
    throw new Error("generateResult called with unsupported cache value type, only 'app' and 'page' are supported");
  }
  const cacheControl = await computeCacheControl(localizedPath, body, event.headers.host, cachedValue.revalidate, lastModified);
  return {
    type: "core",
    // Sometimes other status codes can be cached, like 404. For these cases, we should return the correct status code
    // Also set the status code to the rewriteStatusCode if defined
    // This can happen in handleMiddleware in routingHandler.
    // `NextResponse.rewrite(url, { status: xxx})
    // The rewrite status code should take precedence over the cached one
    statusCode: event.rewriteStatusCode ?? cachedValue.meta?.status ?? 200,
    body: toReadableStream(body, false),
    isBase64Encoded: false,
    headers: {
      ...cacheControl,
      "content-type": type,
      ...cachedValue.meta?.headers,
      vary: VARY_HEADER,
      ...additionalHeaders
    }
  };
}
function escapePathDelimiters(segment, escapeEncoded) {
  return segment.replace(new RegExp(`([/#?]${escapeEncoded ? "|%(2f|23|3f|5c)" : ""})`, "gi"), (char) => encodeURIComponent(char));
}
function decodePathParams(pathname) {
  return pathname.split("/").map((segment) => {
    try {
      return escapePathDelimiters(decodeURIComponent(segment), true);
    } catch (e) {
      return segment;
    }
  }).join("/");
}
async function cacheInterceptor(event) {
  if (Boolean(event.headers["next-action"]) || Boolean(event.headers["x-prerender-revalidate"]))
    return event;
  const cookies = event.headers.cookie || "";
  const hasPreviewData = cookies.includes("__prerender_bypass") || cookies.includes("__next_preview_data");
  if (hasPreviewData) {
    debug("Preview mode detected, passing through to handler");
    return event;
  }
  let localizedPath = localizePath(event);
  if (NextConfig.basePath) {
    localizedPath = localizedPath.replace(NextConfig.basePath, "");
  }
  localizedPath = localizedPath.replace(/\/$/, "");
  localizedPath = decodePathParams(localizedPath);
  debug("Checking cache for", localizedPath, PrerenderManifest);
  const isISR = Object.keys(PrerenderManifest?.routes ?? {}).includes(localizedPath ?? "/") || Object.values(PrerenderManifest?.dynamicRoutes ?? {}).some((dr) => new RegExp(dr.routeRegex).test(localizedPath));
  debug("isISR", isISR);
  if (isISR) {
    try {
      const cachedData = await globalThis.incrementalCache.get(localizedPath ?? "/index");
      debug("cached data in interceptor", cachedData);
      if (!cachedData?.value) {
        return event;
      }
      if (cachedData.value?.type === "app" || cachedData.value?.type === "route") {
        const tags = getTagsFromValue(cachedData.value);
        const _hasBeenRevalidated = cachedData.shouldBypassTagCache ? false : await hasBeenRevalidated(localizedPath, tags, cachedData);
        if (_hasBeenRevalidated) {
          return event;
        }
      }
      const host = event.headers.host;
      switch (cachedData?.value?.type) {
        case "app":
        case "page":
          return generateResult(event, localizedPath, cachedData.value, cachedData.lastModified);
        case "redirect": {
          const cacheControl = await computeCacheControl(localizedPath, "", host, cachedData.value.revalidate, cachedData.lastModified);
          return {
            type: "core",
            statusCode: cachedData.value.meta?.status ?? 307,
            body: emptyReadableStream(),
            headers: {
              ...cachedData.value.meta?.headers ?? {},
              ...cacheControl
            },
            isBase64Encoded: false
          };
        }
        case "route": {
          const cacheControl = await computeCacheControl(localizedPath, cachedData.value.body, host, cachedData.value.revalidate, cachedData.lastModified);
          const isBinary = isBinaryContentType(String(cachedData.value.meta?.headers?.["content-type"]));
          return {
            type: "core",
            statusCode: event.rewriteStatusCode ?? cachedData.value.meta?.status ?? 200,
            body: toReadableStream(cachedData.value.body, isBinary),
            headers: {
              ...cacheControl,
              ...cachedData.value.meta?.headers,
              vary: VARY_HEADER
            },
            isBase64Encoded: isBinary
          };
        }
        default:
          return event;
      }
    } catch (e) {
      debug("Error while fetching cache", e);
      return event;
    }
  }
  return event;
}

// node_modules/path-to-regexp/dist.es2015/index.js
function lexer(str) {
  var tokens = [];
  var i = 0;
  while (i < str.length) {
    var char = str[i];
    if (char === "*" || char === "+" || char === "?") {
      tokens.push({ type: "MODIFIER", index: i, value: str[i++] });
      continue;
    }
    if (char === "\\") {
      tokens.push({ type: "ESCAPED_CHAR", index: i++, value: str[i++] });
      continue;
    }
    if (char === "{") {
      tokens.push({ type: "OPEN", index: i, value: str[i++] });
      continue;
    }
    if (char === "}") {
      tokens.push({ type: "CLOSE", index: i, value: str[i++] });
      continue;
    }
    if (char === ":") {
      var name = "";
      var j = i + 1;
      while (j < str.length) {
        var code = str.charCodeAt(j);
        if (
          // `0-9`
          code >= 48 && code <= 57 || // `A-Z`
          code >= 65 && code <= 90 || // `a-z`
          code >= 97 && code <= 122 || // `_`
          code === 95
        ) {
          name += str[j++];
          continue;
        }
        break;
      }
      if (!name)
        throw new TypeError("Missing parameter name at ".concat(i));
      tokens.push({ type: "NAME", index: i, value: name });
      i = j;
      continue;
    }
    if (char === "(") {
      var count = 1;
      var pattern = "";
      var j = i + 1;
      if (str[j] === "?") {
        throw new TypeError('Pattern cannot start with "?" at '.concat(j));
      }
      while (j < str.length) {
        if (str[j] === "\\") {
          pattern += str[j++] + str[j++];
          continue;
        }
        if (str[j] === ")") {
          count--;
          if (count === 0) {
            j++;
            break;
          }
        } else if (str[j] === "(") {
          count++;
          if (str[j + 1] !== "?") {
            throw new TypeError("Capturing groups are not allowed at ".concat(j));
          }
        }
        pattern += str[j++];
      }
      if (count)
        throw new TypeError("Unbalanced pattern at ".concat(i));
      if (!pattern)
        throw new TypeError("Missing pattern at ".concat(i));
      tokens.push({ type: "PATTERN", index: i, value: pattern });
      i = j;
      continue;
    }
    tokens.push({ type: "CHAR", index: i, value: str[i++] });
  }
  tokens.push({ type: "END", index: i, value: "" });
  return tokens;
}
function parse2(str, options) {
  if (options === void 0) {
    options = {};
  }
  var tokens = lexer(str);
  var _a = options.prefixes, prefixes = _a === void 0 ? "./" : _a, _b = options.delimiter, delimiter = _b === void 0 ? "/#?" : _b;
  var result = [];
  var key = 0;
  var i = 0;
  var path3 = "";
  var tryConsume = function(type) {
    if (i < tokens.length && tokens[i].type === type)
      return tokens[i++].value;
  };
  var mustConsume = function(type) {
    var value2 = tryConsume(type);
    if (value2 !== void 0)
      return value2;
    var _a2 = tokens[i], nextType = _a2.type, index = _a2.index;
    throw new TypeError("Unexpected ".concat(nextType, " at ").concat(index, ", expected ").concat(type));
  };
  var consumeText = function() {
    var result2 = "";
    var value2;
    while (value2 = tryConsume("CHAR") || tryConsume("ESCAPED_CHAR")) {
      result2 += value2;
    }
    return result2;
  };
  var isSafe = function(value2) {
    for (var _i = 0, delimiter_1 = delimiter; _i < delimiter_1.length; _i++) {
      var char2 = delimiter_1[_i];
      if (value2.indexOf(char2) > -1)
        return true;
    }
    return false;
  };
  var safePattern = function(prefix2) {
    var prev = result[result.length - 1];
    var prevText = prefix2 || (prev && typeof prev === "string" ? prev : "");
    if (prev && !prevText) {
      throw new TypeError('Must have text between two parameters, missing text after "'.concat(prev.name, '"'));
    }
    if (!prevText || isSafe(prevText))
      return "[^".concat(escapeString(delimiter), "]+?");
    return "(?:(?!".concat(escapeString(prevText), ")[^").concat(escapeString(delimiter), "])+?");
  };
  while (i < tokens.length) {
    var char = tryConsume("CHAR");
    var name = tryConsume("NAME");
    var pattern = tryConsume("PATTERN");
    if (name || pattern) {
      var prefix = char || "";
      if (prefixes.indexOf(prefix) === -1) {
        path3 += prefix;
        prefix = "";
      }
      if (path3) {
        result.push(path3);
        path3 = "";
      }
      result.push({
        name: name || key++,
        prefix,
        suffix: "",
        pattern: pattern || safePattern(prefix),
        modifier: tryConsume("MODIFIER") || ""
      });
      continue;
    }
    var value = char || tryConsume("ESCAPED_CHAR");
    if (value) {
      path3 += value;
      continue;
    }
    if (path3) {
      result.push(path3);
      path3 = "";
    }
    var open = tryConsume("OPEN");
    if (open) {
      var prefix = consumeText();
      var name_1 = tryConsume("NAME") || "";
      var pattern_1 = tryConsume("PATTERN") || "";
      var suffix = consumeText();
      mustConsume("CLOSE");
      result.push({
        name: name_1 || (pattern_1 ? key++ : ""),
        pattern: name_1 && !pattern_1 ? safePattern(prefix) : pattern_1,
        prefix,
        suffix,
        modifier: tryConsume("MODIFIER") || ""
      });
      continue;
    }
    mustConsume("END");
  }
  return result;
}
function compile(str, options) {
  return tokensToFunction(parse2(str, options), options);
}
function tokensToFunction(tokens, options) {
  if (options === void 0) {
    options = {};
  }
  var reFlags = flags(options);
  var _a = options.encode, encode = _a === void 0 ? function(x) {
    return x;
  } : _a, _b = options.validate, validate = _b === void 0 ? true : _b;
  var matches = tokens.map(function(token) {
    if (typeof token === "object") {
      return new RegExp("^(?:".concat(token.pattern, ")$"), reFlags);
    }
  });
  return function(data) {
    var path3 = "";
    for (var i = 0; i < tokens.length; i++) {
      var token = tokens[i];
      if (typeof token === "string") {
        path3 += token;
        continue;
      }
      var value = data ? data[token.name] : void 0;
      var optional = token.modifier === "?" || token.modifier === "*";
      var repeat = token.modifier === "*" || token.modifier === "+";
      if (Array.isArray(value)) {
        if (!repeat) {
          throw new TypeError('Expected "'.concat(token.name, '" to not repeat, but got an array'));
        }
        if (value.length === 0) {
          if (optional)
            continue;
          throw new TypeError('Expected "'.concat(token.name, '" to not be empty'));
        }
        for (var j = 0; j < value.length; j++) {
          var segment = encode(value[j], token);
          if (validate && !matches[i].test(segment)) {
            throw new TypeError('Expected all "'.concat(token.name, '" to match "').concat(token.pattern, '", but got "').concat(segment, '"'));
          }
          path3 += token.prefix + segment + token.suffix;
        }
        continue;
      }
      if (typeof value === "string" || typeof value === "number") {
        var segment = encode(String(value), token);
        if (validate && !matches[i].test(segment)) {
          throw new TypeError('Expected "'.concat(token.name, '" to match "').concat(token.pattern, '", but got "').concat(segment, '"'));
        }
        path3 += token.prefix + segment + token.suffix;
        continue;
      }
      if (optional)
        continue;
      var typeOfMessage = repeat ? "an array" : "a string";
      throw new TypeError('Expected "'.concat(token.name, '" to be ').concat(typeOfMessage));
    }
    return path3;
  };
}
function match(str, options) {
  var keys = [];
  var re = pathToRegexp(str, keys, options);
  return regexpToFunction(re, keys, options);
}
function regexpToFunction(re, keys, options) {
  if (options === void 0) {
    options = {};
  }
  var _a = options.decode, decode = _a === void 0 ? function(x) {
    return x;
  } : _a;
  return function(pathname) {
    var m = re.exec(pathname);
    if (!m)
      return false;
    var path3 = m[0], index = m.index;
    var params = /* @__PURE__ */ Object.create(null);
    var _loop_1 = function(i2) {
      if (m[i2] === void 0)
        return "continue";
      var key = keys[i2 - 1];
      if (key.modifier === "*" || key.modifier === "+") {
        params[key.name] = m[i2].split(key.prefix + key.suffix).map(function(value) {
          return decode(value, key);
        });
      } else {
        params[key.name] = decode(m[i2], key);
      }
    };
    for (var i = 1; i < m.length; i++) {
      _loop_1(i);
    }
    return { path: path3, index, params };
  };
}
function escapeString(str) {
  return str.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");
}
function flags(options) {
  return options && options.sensitive ? "" : "i";
}
function regexpToRegexp(path3, keys) {
  if (!keys)
    return path3;
  var groupsRegex = /\((?:\?<(.*?)>)?(?!\?)/g;
  var index = 0;
  var execResult = groupsRegex.exec(path3.source);
  while (execResult) {
    keys.push({
      // Use parenthesized substring match if available, index otherwise
      name: execResult[1] || index++,
      prefix: "",
      suffix: "",
      modifier: "",
      pattern: ""
    });
    execResult = groupsRegex.exec(path3.source);
  }
  return path3;
}
function arrayToRegexp(paths, keys, options) {
  var parts = paths.map(function(path3) {
    return pathToRegexp(path3, keys, options).source;
  });
  return new RegExp("(?:".concat(parts.join("|"), ")"), flags(options));
}
function stringToRegexp(path3, keys, options) {
  return tokensToRegexp(parse2(path3, options), keys, options);
}
function tokensToRegexp(tokens, keys, options) {
  if (options === void 0) {
    options = {};
  }
  var _a = options.strict, strict = _a === void 0 ? false : _a, _b = options.start, start = _b === void 0 ? true : _b, _c = options.end, end = _c === void 0 ? true : _c, _d = options.encode, encode = _d === void 0 ? function(x) {
    return x;
  } : _d, _e = options.delimiter, delimiter = _e === void 0 ? "/#?" : _e, _f = options.endsWith, endsWith = _f === void 0 ? "" : _f;
  var endsWithRe = "[".concat(escapeString(endsWith), "]|$");
  var delimiterRe = "[".concat(escapeString(delimiter), "]");
  var route = start ? "^" : "";
  for (var _i = 0, tokens_1 = tokens; _i < tokens_1.length; _i++) {
    var token = tokens_1[_i];
    if (typeof token === "string") {
      route += escapeString(encode(token));
    } else {
      var prefix = escapeString(encode(token.prefix));
      var suffix = escapeString(encode(token.suffix));
      if (token.pattern) {
        if (keys)
          keys.push(token);
        if (prefix || suffix) {
          if (token.modifier === "+" || token.modifier === "*") {
            var mod = token.modifier === "*" ? "?" : "";
            route += "(?:".concat(prefix, "((?:").concat(token.pattern, ")(?:").concat(suffix).concat(prefix, "(?:").concat(token.pattern, "))*)").concat(suffix, ")").concat(mod);
          } else {
            route += "(?:".concat(prefix, "(").concat(token.pattern, ")").concat(suffix, ")").concat(token.modifier);
          }
        } else {
          if (token.modifier === "+" || token.modifier === "*") {
            throw new TypeError('Can not repeat "'.concat(token.name, '" without a prefix and suffix'));
          }
          route += "(".concat(token.pattern, ")").concat(token.modifier);
        }
      } else {
        route += "(?:".concat(prefix).concat(suffix, ")").concat(token.modifier);
      }
    }
  }
  if (end) {
    if (!strict)
      route += "".concat(delimiterRe, "?");
    route += !options.endsWith ? "$" : "(?=".concat(endsWithRe, ")");
  } else {
    var endToken = tokens[tokens.length - 1];
    var isEndDelimited = typeof endToken === "string" ? delimiterRe.indexOf(endToken[endToken.length - 1]) > -1 : endToken === void 0;
    if (!strict) {
      route += "(?:".concat(delimiterRe, "(?=").concat(endsWithRe, "))?");
    }
    if (!isEndDelimited) {
      route += "(?=".concat(delimiterRe, "|").concat(endsWithRe, ")");
    }
  }
  return new RegExp(route, flags(options));
}
function pathToRegexp(path3, keys, options) {
  if (path3 instanceof RegExp)
    return regexpToRegexp(path3, keys);
  if (Array.isArray(path3))
    return arrayToRegexp(path3, keys, options);
  return stringToRegexp(path3, keys, options);
}

// node_modules/@opennextjs/aws/dist/utils/normalize-path.js
import path2 from "node:path";
function normalizeRepeatedSlashes(url) {
  const urlNoQuery = url.host + url.pathname;
  return `${url.protocol}//${urlNoQuery.replace(/\\/g, "/").replace(/\/\/+/g, "/")}${url.search}`;
}

// node_modules/@opennextjs/aws/dist/core/routing/matcher.js
init_stream();
init_logger();

// node_modules/@opennextjs/aws/dist/core/routing/routeMatcher.js
var optionalLocalePrefixRegex = `^/(?:${RoutesManifest.locales.map((locale) => `${locale}/?`).join("|")})?`;
var optionalBasepathPrefixRegex = RoutesManifest.basePath ? `^${RoutesManifest.basePath}/?` : "^/";
var optionalPrefix = optionalLocalePrefixRegex.replace("^/", optionalBasepathPrefixRegex);
function routeMatcher(routeDefinitions) {
  const regexp = routeDefinitions.map((route) => ({
    page: route.page,
    regexp: new RegExp(route.regex.replace("^/", optionalPrefix))
  }));
  const appPathsSet = /* @__PURE__ */ new Set();
  const routePathsSet = /* @__PURE__ */ new Set();
  for (const [k, v] of Object.entries(AppPathRoutesManifest)) {
    if (k.endsWith("page")) {
      appPathsSet.add(v);
    } else if (k.endsWith("route")) {
      routePathsSet.add(v);
    }
  }
  return function matchRoute(path3) {
    const foundRoutes = regexp.filter((route) => route.regexp.test(path3));
    return foundRoutes.map((foundRoute) => {
      let routeType = "page";
      if (appPathsSet.has(foundRoute.page)) {
        routeType = "app";
      } else if (routePathsSet.has(foundRoute.page)) {
        routeType = "route";
      }
      return {
        route: foundRoute.page,
        type: routeType
      };
    });
  };
}
var staticRouteMatcher = routeMatcher([
  ...RoutesManifest.routes.static,
  ...getStaticAPIRoutes()
]);
var dynamicRouteMatcher = routeMatcher(RoutesManifest.routes.dynamic);
function getStaticAPIRoutes() {
  const createRouteDefinition = (route) => ({
    page: route,
    regex: `^${route}(?:/)?$`
  });
  const dynamicRoutePages = new Set(RoutesManifest.routes.dynamic.map(({ page }) => page));
  const pagesStaticAPIRoutes = Object.keys(PagesManifest).filter((route) => route.startsWith("/api/") && !dynamicRoutePages.has(route)).map(createRouteDefinition);
  const appPathsStaticAPIRoutes = Object.values(AppPathRoutesManifest).filter((route) => (route.startsWith("/api/") || route === "/api") && !dynamicRoutePages.has(route)).map(createRouteDefinition);
  return [...pagesStaticAPIRoutes, ...appPathsStaticAPIRoutes];
}

// node_modules/@opennextjs/aws/dist/core/routing/matcher.js
var routeHasMatcher = (headers, cookies, query) => (redirect) => {
  switch (redirect.type) {
    case "header":
      return !!headers?.[redirect.key.toLowerCase()] && new RegExp(redirect.value ?? "").test(headers[redirect.key.toLowerCase()] ?? "");
    case "cookie":
      return !!cookies?.[redirect.key] && new RegExp(redirect.value ?? "").test(cookies[redirect.key] ?? "");
    case "query":
      return query[redirect.key] && Array.isArray(redirect.value) ? redirect.value.reduce((prev, current) => prev || new RegExp(current).test(query[redirect.key]), false) : new RegExp(redirect.value ?? "").test(query[redirect.key] ?? "");
    case "host":
      return headers?.host !== "" && new RegExp(redirect.value ?? "").test(headers.host);
    default:
      return false;
  }
};
function checkHas(matcher, has, inverted = false) {
  return has ? has.reduce((acc, cur) => {
    if (acc === false)
      return false;
    return inverted ? !matcher(cur) : matcher(cur);
  }, true) : true;
}
var getParamsFromSource = (source) => (value) => {
  debug("value", value);
  const _match = source(value);
  return _match ? _match.params : {};
};
var computeParamHas = (headers, cookies, query) => (has) => {
  if (!has.value)
    return {};
  const matcher = new RegExp(`^${has.value}$`);
  const fromSource = (value) => {
    const matches = value.match(matcher);
    return matches?.groups ?? {};
  };
  switch (has.type) {
    case "header":
      return fromSource(headers[has.key.toLowerCase()] ?? "");
    case "cookie":
      return fromSource(cookies[has.key] ?? "");
    case "query":
      return Array.isArray(query[has.key]) ? fromSource(query[has.key].join(",")) : fromSource(query[has.key] ?? "");
    case "host":
      return fromSource(headers.host ?? "");
  }
};
function convertMatch(match2, toDestination, destination) {
  if (!match2) {
    return destination;
  }
  const { params } = match2;
  const isUsingParams = Object.keys(params).length > 0;
  return isUsingParams ? toDestination(params) : destination;
}
function getNextConfigHeaders(event, configHeaders) {
  if (!configHeaders) {
    return {};
  }
  const matcher = routeHasMatcher(event.headers, event.cookies, event.query);
  const requestHeaders = {};
  const localizedRawPath = localizePath(event);
  for (const { headers, has, missing, regex, source, locale } of configHeaders) {
    const path3 = locale === false ? event.rawPath : localizedRawPath;
    if (new RegExp(regex).test(path3) && checkHas(matcher, has) && checkHas(matcher, missing, true)) {
      const fromSource = match(source);
      const _match = fromSource(path3);
      headers.forEach((h) => {
        try {
          const key = convertMatch(_match, compile(h.key), h.key);
          const value = convertMatch(_match, compile(h.value), h.value);
          requestHeaders[key] = value;
        } catch {
          debug(`Error matching header ${h.key} with value ${h.value}`);
          requestHeaders[h.key] = h.value;
        }
      });
    }
  }
  return requestHeaders;
}
function handleRewrites(event, rewrites) {
  const { rawPath, headers, query, cookies, url } = event;
  const localizedRawPath = localizePath(event);
  const matcher = routeHasMatcher(headers, cookies, query);
  const computeHas = computeParamHas(headers, cookies, query);
  const rewrite = rewrites.find((route) => {
    const path3 = route.locale === false ? rawPath : localizedRawPath;
    return new RegExp(route.regex).test(path3) && checkHas(matcher, route.has) && checkHas(matcher, route.missing, true);
  });
  let finalQuery = query;
  let rewrittenUrl = url;
  const isExternalRewrite = isExternal(rewrite?.destination);
  debug("isExternalRewrite", isExternalRewrite);
  if (rewrite) {
    const { pathname, protocol, hostname, queryString } = getUrlParts(rewrite.destination, isExternalRewrite);
    const pathToUse = rewrite.locale === false ? rawPath : localizedRawPath;
    debug("urlParts", { pathname, protocol, hostname, queryString });
    const toDestinationPath = compile(escapeRegex(pathname, { isPath: true }));
    const toDestinationHost = compile(escapeRegex(hostname));
    const toDestinationQuery = compile(escapeRegex(queryString));
    const params = {
      // params for the source
      ...getParamsFromSource(match(escapeRegex(rewrite.source, { isPath: true })))(pathToUse),
      // params for the has
      ...rewrite.has?.reduce((acc, cur) => {
        return Object.assign(acc, computeHas(cur));
      }, {}),
      // params for the missing
      ...rewrite.missing?.reduce((acc, cur) => {
        return Object.assign(acc, computeHas(cur));
      }, {})
    };
    const isUsingParams = Object.keys(params).length > 0;
    let rewrittenQuery = queryString;
    let rewrittenHost = hostname;
    let rewrittenPath = pathname;
    if (isUsingParams) {
      rewrittenPath = unescapeRegex(toDestinationPath(params));
      rewrittenHost = unescapeRegex(toDestinationHost(params));
      rewrittenQuery = unescapeRegex(toDestinationQuery(params));
    }
    if (NextConfig.i18n && !isExternalRewrite) {
      const strippedPathLocale = rewrittenPath.replace(new RegExp(`^/(${NextConfig.i18n.locales.join("|")})`), "");
      if (strippedPathLocale.startsWith("/api/")) {
        rewrittenPath = strippedPathLocale;
      }
    }
    rewrittenUrl = isExternalRewrite ? `${protocol}//${rewrittenHost}${rewrittenPath}` : new URL(rewrittenPath, event.url).href;
    finalQuery = {
      ...query,
      ...convertFromQueryString(rewrittenQuery)
    };
    rewrittenUrl += convertToQueryString(finalQuery);
    debug("rewrittenUrl", { rewrittenUrl, finalQuery, isUsingParams });
  }
  return {
    internalEvent: {
      ...event,
      query: finalQuery,
      rawPath: new URL(rewrittenUrl).pathname,
      url: rewrittenUrl
    },
    __rewrite: rewrite,
    isExternalRewrite
  };
}
function handleRepeatedSlashRedirect(event) {
  if (event.rawPath.match(/(\\|\/\/)/)) {
    return {
      type: event.type,
      statusCode: 308,
      headers: {
        Location: normalizeRepeatedSlashes(new URL(event.url))
      },
      body: emptyReadableStream(),
      isBase64Encoded: false
    };
  }
  return false;
}
function handleTrailingSlashRedirect(event) {
  const url = new URL(event.rawPath, "http://localhost");
  if (
    // Someone is trying to redirect to a different origin, let's not do that
    url.host !== "localhost" || NextConfig.skipTrailingSlashRedirect || // We should not apply trailing slash redirect to API routes
    event.rawPath.startsWith("/api/")
  ) {
    return false;
  }
  const emptyBody = emptyReadableStream();
  if (NextConfig.trailingSlash && !event.headers["x-nextjs-data"] && !event.rawPath.endsWith("/") && !event.rawPath.match(/[\w-]+\.[\w]+$/g)) {
    const headersLocation = event.url.split("?");
    return {
      type: event.type,
      statusCode: 308,
      headers: {
        Location: `${headersLocation[0]}/${headersLocation[1] ? `?${headersLocation[1]}` : ""}`
      },
      body: emptyBody,
      isBase64Encoded: false
    };
  }
  if (!NextConfig.trailingSlash && event.rawPath.endsWith("/") && event.rawPath !== "/") {
    const headersLocation = event.url.split("?");
    return {
      type: event.type,
      statusCode: 308,
      headers: {
        Location: `${headersLocation[0].replace(/\/$/, "")}${headersLocation[1] ? `?${headersLocation[1]}` : ""}`
      },
      body: emptyBody,
      isBase64Encoded: false
    };
  }
  return false;
}
function handleRedirects(event, redirects) {
  const repeatedSlashRedirect = handleRepeatedSlashRedirect(event);
  if (repeatedSlashRedirect)
    return repeatedSlashRedirect;
  const trailingSlashRedirect = handleTrailingSlashRedirect(event);
  if (trailingSlashRedirect)
    return trailingSlashRedirect;
  const localeRedirect = handleLocaleRedirect(event);
  if (localeRedirect)
    return localeRedirect;
  const { internalEvent, __rewrite } = handleRewrites(event, redirects.filter((r) => !r.internal));
  if (__rewrite && !__rewrite.internal) {
    return {
      type: event.type,
      statusCode: __rewrite.statusCode ?? 308,
      headers: {
        Location: internalEvent.url
      },
      body: emptyReadableStream(),
      isBase64Encoded: false
    };
  }
}
function fixDataPage(internalEvent, buildId) {
  const { rawPath, query } = internalEvent;
  const basePath = NextConfig.basePath ?? "";
  const dataPattern = `${basePath}/_next/data/${buildId}`;
  if (rawPath.startsWith("/_next/data") && !rawPath.startsWith(dataPattern)) {
    return {
      type: internalEvent.type,
      statusCode: 404,
      body: toReadableStream("{}"),
      headers: {
        "Content-Type": "application/json"
      },
      isBase64Encoded: false
    };
  }
  if (rawPath.startsWith(dataPattern) && rawPath.endsWith(".json")) {
    const newPath = `${basePath}${rawPath.slice(dataPattern.length, -".json".length).replace(/^\/index$/, "/")}`;
    query.__nextDataReq = "1";
    return {
      ...internalEvent,
      rawPath: newPath,
      query,
      url: new URL(`${newPath}${convertToQueryString(query)}`, internalEvent.url).href
    };
  }
  return internalEvent;
}
function handleFallbackFalse(internalEvent, prerenderManifest) {
  const { rawPath } = internalEvent;
  const { dynamicRoutes = {}, routes = {} } = prerenderManifest ?? {};
  const prerenderedFallbackRoutes = Object.entries(dynamicRoutes).filter(([, { fallback }]) => fallback === false);
  const routeFallback = prerenderedFallbackRoutes.some(([, { routeRegex }]) => {
    const routeRegexExp = new RegExp(routeRegex);
    return routeRegexExp.test(rawPath);
  });
  const locales = NextConfig.i18n?.locales;
  const routesAlreadyHaveLocale = locales?.includes(rawPath.split("/")[1]) || // If we don't use locales, we don't need to add the default locale
  locales === void 0;
  let localizedPath = routesAlreadyHaveLocale ? rawPath : `/${NextConfig.i18n?.defaultLocale}${rawPath}`;
  if (
    // Not if localizedPath is "/" tho, because that would not make it find `isPregenerated` below since it would be try to match an empty string.
    localizedPath !== "/" && NextConfig.trailingSlash && localizedPath.endsWith("/")
  ) {
    localizedPath = localizedPath.slice(0, -1);
  }
  const matchedStaticRoute = staticRouteMatcher(localizedPath);
  const prerenderedFallbackRoutesName = prerenderedFallbackRoutes.map(([name]) => name);
  const matchedDynamicRoute = dynamicRouteMatcher(localizedPath).filter(({ route }) => !prerenderedFallbackRoutesName.includes(route));
  const isPregenerated = Object.keys(routes).includes(localizedPath);
  if (routeFallback && !isPregenerated && matchedStaticRoute.length === 0 && matchedDynamicRoute.length === 0) {
    return {
      event: {
        ...internalEvent,
        rawPath: "/404",
        url: constructNextUrl(internalEvent.url, "/404"),
        headers: {
          ...internalEvent.headers,
          "x-invoke-status": "404"
        }
      },
      isISR: false
    };
  }
  return {
    event: internalEvent,
    isISR: routeFallback || isPregenerated
  };
}

// node_modules/@opennextjs/aws/dist/core/routing/middleware.js
init_stream();
init_utils();
var middlewareManifest = MiddlewareManifest;
var functionsConfigManifest = FunctionsConfigManifest;
var middleMatch = getMiddlewareMatch(middlewareManifest, functionsConfigManifest);
var REDIRECTS = /* @__PURE__ */ new Set([301, 302, 303, 307, 308]);
function defaultMiddlewareLoader() {
  return Promise.resolve().then(() => (init_edgeFunctionHandler(), edgeFunctionHandler_exports));
}
async function handleMiddleware(internalEvent, initialSearch, middlewareLoader = defaultMiddlewareLoader) {
  const headers = internalEvent.headers;
  if (headers["x-isr"] && headers["x-prerender-revalidate"] === PrerenderManifest?.preview?.previewModeId)
    return internalEvent;
  const normalizedPath = localizePath(internalEvent);
  const hasMatch = middleMatch.some((r) => r.test(normalizedPath));
  if (!hasMatch)
    return internalEvent;
  const initialUrl = new URL(normalizedPath, internalEvent.url);
  initialUrl.search = initialSearch;
  const url = initialUrl.href;
  const middleware = await middlewareLoader();
  const result = await middleware.default({
    // `geo` is pre Next 15.
    geo: {
      // The city name is percent-encoded.
      // See https://github.com/vercel/vercel/blob/4cb6143/packages/functions/src/headers.ts#L94C19-L94C37
      city: decodeURIComponent(headers["x-open-next-city"]),
      country: headers["x-open-next-country"],
      region: headers["x-open-next-region"],
      latitude: headers["x-open-next-latitude"],
      longitude: headers["x-open-next-longitude"]
    },
    headers,
    method: internalEvent.method || "GET",
    nextConfig: {
      basePath: NextConfig.basePath,
      i18n: NextConfig.i18n,
      trailingSlash: NextConfig.trailingSlash
    },
    url,
    body: convertBodyToReadableStream(internalEvent.method, internalEvent.body)
  });
  const statusCode = result.status;
  const responseHeaders = result.headers;
  const reqHeaders = {};
  const resHeaders = {};
  const filteredHeaders = [
    "x-middleware-override-headers",
    "x-middleware-next",
    "x-middleware-rewrite",
    // We need to drop `content-encoding` because it will be decoded
    "content-encoding"
  ];
  const xMiddlewareKey = "x-middleware-request-";
  responseHeaders.forEach((value, key) => {
    if (key.startsWith(xMiddlewareKey)) {
      const k = key.substring(xMiddlewareKey.length);
      reqHeaders[k] = value;
    } else {
      if (filteredHeaders.includes(key.toLowerCase()))
        return;
      if (key.toLowerCase() === "set-cookie") {
        resHeaders[key] = resHeaders[key] ? [...resHeaders[key], value] : [value];
      } else if (REDIRECTS.has(statusCode) && key.toLowerCase() === "location") {
        resHeaders[key] = normalizeLocationHeader(value, internalEvent.url);
      } else {
        resHeaders[key] = value;
      }
    }
  });
  const rewriteUrl = responseHeaders.get("x-middleware-rewrite");
  let isExternalRewrite = false;
  let middlewareQuery = internalEvent.query;
  let newUrl = internalEvent.url;
  if (rewriteUrl) {
    newUrl = rewriteUrl;
    if (isExternal(newUrl, internalEvent.headers.host)) {
      isExternalRewrite = true;
    } else {
      const rewriteUrlObject = new URL(rewriteUrl);
      middlewareQuery = getQueryFromSearchParams(rewriteUrlObject.searchParams);
      if ("__nextDataReq" in internalEvent.query) {
        middlewareQuery.__nextDataReq = internalEvent.query.__nextDataReq;
      }
    }
  }
  if (!rewriteUrl && !responseHeaders.get("x-middleware-next")) {
    const body = result.body ?? emptyReadableStream();
    return {
      type: internalEvent.type,
      statusCode,
      headers: resHeaders,
      body,
      isBase64Encoded: false
    };
  }
  return {
    responseHeaders: resHeaders,
    url: newUrl,
    rawPath: new URL(newUrl).pathname,
    type: internalEvent.type,
    headers: { ...internalEvent.headers, ...reqHeaders },
    body: internalEvent.body,
    method: internalEvent.method,
    query: middlewareQuery,
    cookies: internalEvent.cookies,
    remoteAddress: internalEvent.remoteAddress,
    isExternalRewrite,
    rewriteStatusCode: rewriteUrl && !isExternalRewrite ? statusCode : void 0
  };
}

// node_modules/@opennextjs/aws/dist/core/routingHandler.js
var MIDDLEWARE_HEADER_PREFIX = "x-middleware-response-";
var MIDDLEWARE_HEADER_PREFIX_LEN = MIDDLEWARE_HEADER_PREFIX.length;
var INTERNAL_HEADER_PREFIX = "x-opennext-";
var INTERNAL_HEADER_INITIAL_URL = `${INTERNAL_HEADER_PREFIX}initial-url`;
var INTERNAL_HEADER_LOCALE = `${INTERNAL_HEADER_PREFIX}locale`;
var INTERNAL_HEADER_RESOLVED_ROUTES = `${INTERNAL_HEADER_PREFIX}resolved-routes`;
var INTERNAL_HEADER_REWRITE_STATUS_CODE = `${INTERNAL_HEADER_PREFIX}rewrite-status-code`;
var INTERNAL_EVENT_REQUEST_ID = `${INTERNAL_HEADER_PREFIX}request-id`;
var geoHeaderToNextHeader = {
  "x-open-next-city": "x-vercel-ip-city",
  "x-open-next-country": "x-vercel-ip-country",
  "x-open-next-region": "x-vercel-ip-country-region",
  "x-open-next-latitude": "x-vercel-ip-latitude",
  "x-open-next-longitude": "x-vercel-ip-longitude"
};
function applyMiddlewareHeaders(eventOrResult, middlewareHeaders) {
  const isResult = isInternalResult(eventOrResult);
  const headers = eventOrResult.headers;
  const keyPrefix = isResult ? "" : MIDDLEWARE_HEADER_PREFIX;
  Object.entries(middlewareHeaders).forEach(([key, value]) => {
    if (value) {
      headers[keyPrefix + key] = Array.isArray(value) ? value.join(",") : value;
    }
  });
}
async function routingHandler(event, { assetResolver }) {
  try {
    for (const [openNextGeoName, nextGeoName] of Object.entries(geoHeaderToNextHeader)) {
      const value = event.headers[openNextGeoName];
      if (value) {
        event.headers[nextGeoName] = value;
      }
    }
    for (const key of Object.keys(event.headers)) {
      if (key.startsWith(INTERNAL_HEADER_PREFIX) || key.startsWith(MIDDLEWARE_HEADER_PREFIX)) {
        delete event.headers[key];
      }
    }
    let headers = getNextConfigHeaders(event, ConfigHeaders);
    let eventOrResult = fixDataPage(event, BuildId);
    if (isInternalResult(eventOrResult)) {
      return eventOrResult;
    }
    const redirect = handleRedirects(eventOrResult, RoutesManifest.redirects);
    if (redirect) {
      redirect.headers.Location = normalizeLocationHeader(redirect.headers.Location, event.url, true);
      debug("redirect", redirect);
      return redirect;
    }
    const middlewareEventOrResult = await handleMiddleware(
      eventOrResult,
      // We need to pass the initial search without any decoding
      // TODO: we'd need to refactor InternalEvent to include the initial querystring directly
      // Should be done in another PR because it is a breaking change
      new URL(event.url).search
    );
    if (isInternalResult(middlewareEventOrResult)) {
      return middlewareEventOrResult;
    }
    const middlewareHeadersPrioritized = globalThis.openNextConfig.dangerous?.middlewareHeadersOverrideNextConfigHeaders ?? false;
    if (middlewareHeadersPrioritized) {
      headers = {
        ...headers,
        ...middlewareEventOrResult.responseHeaders
      };
    } else {
      headers = {
        ...middlewareEventOrResult.responseHeaders,
        ...headers
      };
    }
    let isExternalRewrite = middlewareEventOrResult.isExternalRewrite ?? false;
    eventOrResult = middlewareEventOrResult;
    if (!isExternalRewrite) {
      const beforeRewrite = handleRewrites(eventOrResult, RoutesManifest.rewrites.beforeFiles);
      eventOrResult = beforeRewrite.internalEvent;
      isExternalRewrite = beforeRewrite.isExternalRewrite;
      if (!isExternalRewrite) {
        const assetResult = await assetResolver?.maybeGetAssetResult?.(eventOrResult);
        if (assetResult) {
          applyMiddlewareHeaders(assetResult, headers);
          return assetResult;
        }
      }
    }
    const foundStaticRoute = staticRouteMatcher(eventOrResult.rawPath);
    const isStaticRoute = !isExternalRewrite && foundStaticRoute.length > 0;
    if (!(isStaticRoute || isExternalRewrite)) {
      const afterRewrite = handleRewrites(eventOrResult, RoutesManifest.rewrites.afterFiles);
      eventOrResult = afterRewrite.internalEvent;
      isExternalRewrite = afterRewrite.isExternalRewrite;
    }
    let isISR = false;
    if (!isExternalRewrite) {
      const fallbackResult = handleFallbackFalse(eventOrResult, PrerenderManifest);
      eventOrResult = fallbackResult.event;
      isISR = fallbackResult.isISR;
    }
    const foundDynamicRoute = dynamicRouteMatcher(eventOrResult.rawPath);
    const isDynamicRoute = !isExternalRewrite && foundDynamicRoute.length > 0;
    if (!(isDynamicRoute || isStaticRoute || isExternalRewrite)) {
      const fallbackRewrites = handleRewrites(eventOrResult, RoutesManifest.rewrites.fallback);
      eventOrResult = fallbackRewrites.internalEvent;
      isExternalRewrite = fallbackRewrites.isExternalRewrite;
    }
    const isNextImageRoute = eventOrResult.rawPath.startsWith("/_next/image");
    const isRouteFoundBeforeAllRewrites = isStaticRoute || isDynamicRoute || isExternalRewrite;
    if (!(isRouteFoundBeforeAllRewrites || isNextImageRoute || // We need to check again once all rewrites have been applied
    staticRouteMatcher(eventOrResult.rawPath).length > 0 || dynamicRouteMatcher(eventOrResult.rawPath).length > 0)) {
      eventOrResult = {
        ...eventOrResult,
        rawPath: "/404",
        url: constructNextUrl(eventOrResult.url, "/404"),
        headers: {
          ...eventOrResult.headers,
          "x-middleware-response-cache-control": "private, no-cache, no-store, max-age=0, must-revalidate"
        }
      };
    }
    if (globalThis.openNextConfig.dangerous?.enableCacheInterception && !isInternalResult(eventOrResult)) {
      debug("Cache interception enabled");
      eventOrResult = await cacheInterceptor(eventOrResult);
      if (isInternalResult(eventOrResult)) {
        applyMiddlewareHeaders(eventOrResult, headers);
        return eventOrResult;
      }
    }
    applyMiddlewareHeaders(eventOrResult, headers);
    const resolvedRoutes = [
      ...foundStaticRoute,
      ...foundDynamicRoute
    ];
    debug("resolvedRoutes", resolvedRoutes);
    return {
      internalEvent: eventOrResult,
      isExternalRewrite,
      origin: false,
      isISR,
      resolvedRoutes,
      initialURL: event.url,
      locale: NextConfig.i18n ? detectLocale(eventOrResult, NextConfig.i18n) : void 0,
      rewriteStatusCode: middlewareEventOrResult.rewriteStatusCode
    };
  } catch (e) {
    error("Error in routingHandler", e);
    return {
      internalEvent: {
        type: "core",
        method: "GET",
        rawPath: "/500",
        url: constructNextUrl(event.url, "/500"),
        headers: {
          ...event.headers
        },
        query: event.query,
        cookies: event.cookies,
        remoteAddress: event.remoteAddress
      },
      isExternalRewrite: false,
      origin: false,
      isISR: false,
      resolvedRoutes: [],
      initialURL: event.url,
      locale: NextConfig.i18n ? detectLocale(event, NextConfig.i18n) : void 0
    };
  }
}
function isInternalResult(eventOrResult) {
  return eventOrResult != null && "statusCode" in eventOrResult;
}

// node_modules/@opennextjs/aws/dist/adapters/middleware.js
globalThis.internalFetch = fetch;
globalThis.__openNextAls = new AsyncLocalStorage();
var defaultHandler = async (internalEvent, options) => {
  const middlewareConfig = globalThis.openNextConfig.middleware;
  const originResolver = await resolveOriginResolver(middlewareConfig?.originResolver);
  const externalRequestProxy = await resolveProxyRequest(middlewareConfig?.override?.proxyExternalRequest);
  const assetResolver = await resolveAssetResolver(middlewareConfig?.assetResolver);
  const requestId = Math.random().toString(36);
  return runWithOpenNextRequestContext({
    isISRRevalidation: internalEvent.headers["x-isr"] === "1",
    waitUntil: options?.waitUntil,
    requestId
  }, async () => {
    const result = await routingHandler(internalEvent, { assetResolver });
    if ("internalEvent" in result) {
      debug("Middleware intercepted event", internalEvent);
      if (!result.isExternalRewrite) {
        const origin = await originResolver.resolve(result.internalEvent.rawPath);
        return {
          type: "middleware",
          internalEvent: {
            ...result.internalEvent,
            headers: {
              ...result.internalEvent.headers,
              [INTERNAL_HEADER_INITIAL_URL]: internalEvent.url,
              [INTERNAL_HEADER_RESOLVED_ROUTES]: JSON.stringify(result.resolvedRoutes),
              [INTERNAL_EVENT_REQUEST_ID]: requestId,
              [INTERNAL_HEADER_REWRITE_STATUS_CODE]: String(result.rewriteStatusCode)
            }
          },
          isExternalRewrite: result.isExternalRewrite,
          origin,
          isISR: result.isISR,
          initialURL: result.initialURL,
          resolvedRoutes: result.resolvedRoutes
        };
      }
      try {
        return externalRequestProxy.proxy(result.internalEvent);
      } catch (e) {
        error("External request failed.", e);
        return {
          type: "middleware",
          internalEvent: {
            ...result.internalEvent,
            headers: {
              ...result.internalEvent.headers,
              [INTERNAL_EVENT_REQUEST_ID]: requestId
            },
            rawPath: "/500",
            url: constructNextUrl(result.internalEvent.url, "/500"),
            method: "GET"
          },
          // On error we need to rewrite to the 500 page which is an internal rewrite
          isExternalRewrite: false,
          origin: false,
          isISR: result.isISR,
          initialURL: result.internalEvent.url,
          resolvedRoutes: [{ route: "/500", type: "page" }]
        };
      }
    }
    if (process.env.OPEN_NEXT_REQUEST_ID_HEADER || globalThis.openNextDebug) {
      result.headers[INTERNAL_EVENT_REQUEST_ID] = requestId;
    }
    debug("Middleware response", result);
    return result;
  });
};
var handler2 = await createGenericHandler({
  handler: defaultHandler,
  type: "middleware"
});
var middleware_default = {
  fetch: handler2
};
export {
  middleware_default as default,
  handler2 as handler
};

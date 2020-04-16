webpackJsonp([0,13],[
/* 0 */,
/* 1 */,
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "add", function() { return add; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "remove", function() { return remove; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "get", function() { return get; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getAll", function() { return getAll; });
/**
 * Filename: dbfunc.js
 */

const DB_NAME = "grocery_list";
const DB_VERSION = 1;
/**
 * @param name string
 * @param version int
 */
const db = (name, version) => {
  return new Promise((resolve, reject) => {
    let req = indexedDB.open(name, version);
    req.onupgradeneeded = event => {
      let store = event.target.result.createObjectStore(name, {
        autoIncrement: false,
        keyPath: "id"
      });
      store.createIndex("id", "id", { unique: true });
    };
    req.onsuccess = event => resolve(event.target.result);
    req.onerror = event => reject(event.target);
  });
};
/**
 * @param schema string
 * @param obj object | array
 */
const add = obj => {
  return new Promise((resolve, reject) => {
    db(DB_NAME, DB_VERSION).then(res => {
      let trans = res.transaction([DB_NAME], "readwrite");
      let store = trans.objectStore(DB_NAME);
      store.add(obj);
      trans.oncomplete = event => resolve(event.type);
      trans.onerror = event => reject(event.target);
    });
  });
};
/**
 * @param key string
 */
const remove = key => {
  return new Promise((resolve, reject) => {
    db(DB_NAME, DB_VERSION).then(res => {
      let trans = res.transaction([DB_NAME], "readwrite");
      let store = trans.objectStore(DB_NAME);
      let req = store.delete(key);
      req.onsuccess = event => resolve(event.target.result);
      req.onerror = event => reject(event);
    });
  });
};
/**
 * @param key string
 */
const get = key => {
  return new Promise((resolve, reject) => {
    db(DB_NAME, DB_VERSION).then(res => {
      let trans = res.transaction([DB_NAME], "readonly");
      let store = trans.objectStore(DB_NAME);
      let req = store.get(key);
      req.onsuccess = event => resolve(event.target.result);
      req.onerror = event => reject(event);
    });
  });
};
/**
 *
 */
const getAll = () => {
  return new Promise((resolve, reject) => {
    db(DB_NAME, DB_VERSION).then(res => {
      let trans = res.transaction([DB_NAME], "readonly");
      let store = trans.objectStore(DB_NAME);
      store.getAll().onsuccess = event => resolve(event.target.result);
    });
  });
};




/***/ }),
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lib_dbfunc_js__ = __webpack_require__(2);
/**
 * dbfunc.test.js
 * Async write/read to indexedDB
 */

__webpack_require__(44);



test("resolves when object is stored", () => {
  return expect(
    Object(__WEBPACK_IMPORTED_MODULE_0__lib_dbfunc_js__["add"])({
      name: "Kitty",
      id: Math.floor(Math.random() * Date.now())
    })
  ).resolves.toMatch("complete");
});
/*
test("resolves when array is stored", () => {
  return expect(
    add([
      { name: "Hello", id: Math.floor(Math.random() * Date.now()) },
      { name: "Kitty", id: Math.floor(Math.random() * Date.now()) }
    ])
  ).resolves.toMatch("complete");
});
*/
test("resolves object with key = key", () => {
  return expect(Object(__WEBPACK_IMPORTED_MODULE_0__lib_dbfunc_js__["get"])(1)).resolves.toMatchObject({ name: "Kitty" });
});

test("resolves with error when key is not found", () => {
  return expect(Object(__WEBPACK_IMPORTED_MODULE_0__lib_dbfunc_js__["get"])(42)).resolves.toBeUndefined();
});

test("resolves when key is deleted", () => {
  return expect(Object(__WEBPACK_IMPORTED_MODULE_0__lib_dbfunc_js__["remove"])(1)).resolves.toBeUndefined();
});

test("resolves when getall is called", () => {
  return expect(Object(__WEBPACK_IMPORTED_MODULE_0__lib_dbfunc_js__["getAll"])()).resolves.toBe(true);
});


/***/ }),
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/* tslint:disable: max-classes-per-file max-line-length */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var messages = {
    AbortError: "A request was aborted, for example through a call to IDBTransaction.abort.",
    ConstraintError: "A mutation operation in the transaction failed because a constraint was not satisfied. For example, an object such as an object store or index already exists and a request attempted to create a new one.",
    DataCloneError: "The data being stored could not be cloned by the internal structured cloning algorithm.",
    DataError: "Data provided to an operation does not meet requirements.",
    InvalidAccessError: "An invalid operation was performed on an object. For example transaction creation attempt was made, but an empty scope was provided.",
    InvalidStateError: "An operation was called on an object on which it is not allowed or at a time when it is not allowed. Also occurs if a request is made on a source object that has been deleted or removed. Use TransactionInactiveError or ReadOnlyError when possible, as they are more specific variations of InvalidStateError.",
    NotFoundError: "The operation failed because the requested database object could not be found. For example, an object store did not exist but was being opened.",
    ReadOnlyError: 'The mutating operation was attempted in a "readonly" transaction.',
    TransactionInactiveError: "A request was placed against a transaction which is currently not active, or which is finished.",
    VersionError: "An attempt was made to open a database using a lower version than the existing version.",
};
var AbortError = /** @class */ (function (_super) {
    __extends(AbortError, _super);
    function AbortError(message) {
        if (message === void 0) { message = messages.AbortError; }
        var _this = _super.call(this) || this;
        _this.name = "AbortError";
        _this.message = message;
        return _this;
    }
    return AbortError;
}(Error));
exports.AbortError = AbortError;
var ConstraintError = /** @class */ (function (_super) {
    __extends(ConstraintError, _super);
    function ConstraintError(message) {
        if (message === void 0) { message = messages.ConstraintError; }
        var _this = _super.call(this) || this;
        _this.name = "ConstraintError";
        _this.message = message;
        return _this;
    }
    return ConstraintError;
}(Error));
exports.ConstraintError = ConstraintError;
var DataCloneError = /** @class */ (function (_super) {
    __extends(DataCloneError, _super);
    function DataCloneError(message) {
        if (message === void 0) { message = messages.DataCloneError; }
        var _this = _super.call(this) || this;
        _this.name = "DataCloneError";
        _this.message = message;
        return _this;
    }
    return DataCloneError;
}(Error));
exports.DataCloneError = DataCloneError;
var DataError = /** @class */ (function (_super) {
    __extends(DataError, _super);
    function DataError(message) {
        if (message === void 0) { message = messages.DataError; }
        var _this = _super.call(this) || this;
        _this.name = "DataError";
        _this.message = message;
        return _this;
    }
    return DataError;
}(Error));
exports.DataError = DataError;
var InvalidAccessError = /** @class */ (function (_super) {
    __extends(InvalidAccessError, _super);
    function InvalidAccessError(message) {
        if (message === void 0) { message = messages.InvalidAccessError; }
        var _this = _super.call(this) || this;
        _this.name = "InvalidAccessError";
        _this.message = message;
        return _this;
    }
    return InvalidAccessError;
}(Error));
exports.InvalidAccessError = InvalidAccessError;
var InvalidStateError = /** @class */ (function (_super) {
    __extends(InvalidStateError, _super);
    function InvalidStateError(message) {
        if (message === void 0) { message = messages.InvalidStateError; }
        var _this = _super.call(this) || this;
        _this.name = "InvalidStateError";
        _this.message = message;
        return _this;
    }
    return InvalidStateError;
}(Error));
exports.InvalidStateError = InvalidStateError;
var NotFoundError = /** @class */ (function (_super) {
    __extends(NotFoundError, _super);
    function NotFoundError(message) {
        if (message === void 0) { message = messages.NotFoundError; }
        var _this = _super.call(this) || this;
        _this.name = "NotFoundError";
        _this.message = message;
        return _this;
    }
    return NotFoundError;
}(Error));
exports.NotFoundError = NotFoundError;
var ReadOnlyError = /** @class */ (function (_super) {
    __extends(ReadOnlyError, _super);
    function ReadOnlyError(message) {
        if (message === void 0) { message = messages.ReadOnlyError; }
        var _this = _super.call(this) || this;
        _this.name = "ReadOnlyError";
        _this.message = message;
        return _this;
    }
    return ReadOnlyError;
}(Error));
exports.ReadOnlyError = ReadOnlyError;
var TransactionInactiveError = /** @class */ (function (_super) {
    __extends(TransactionInactiveError, _super);
    function TransactionInactiveError(message) {
        if (message === void 0) { message = messages.TransactionInactiveError; }
        var _this = _super.call(this) || this;
        _this.name = "TransactionInactiveError";
        _this.message = message;
        return _this;
    }
    return TransactionInactiveError;
}(Error));
exports.TransactionInactiveError = TransactionInactiveError;
var VersionError = /** @class */ (function (_super) {
    __extends(VersionError, _super);
    function VersionError(message) {
        if (message === void 0) { message = messages.VersionError; }
        var _this = _super.call(this) || this;
        _this.name = "VersionError";
        _this.message = message;
        return _this;
    }
    return VersionError;
}(Error));
exports.VersionError = VersionError;


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var errors_1 = __webpack_require__(18);
// https://w3c.github.io/IndexedDB/#convert-a-value-to-a-input
var valueToKey = function (input, seen) {
    if (typeof input === "number") {
        if (isNaN(input)) {
            throw new errors_1.DataError();
        }
        return input;
    }
    else if (input instanceof Date) {
        var ms = input.valueOf();
        if (isNaN(ms)) {
            throw new errors_1.DataError();
        }
        return new Date(ms);
    }
    else if (typeof input === "string") {
        return input;
    }
    else if (input instanceof ArrayBuffer ||
        (typeof ArrayBuffer !== "undefined" &&
            ArrayBuffer.isView &&
            ArrayBuffer.isView(input))) {
        if (input instanceof ArrayBuffer) {
            return new Uint8Array(input).buffer;
        }
        return new Uint8Array(input.buffer).buffer;
    }
    else if (Array.isArray(input)) {
        if (seen === undefined) {
            seen = new Set();
        }
        else if (seen.has(input)) {
            throw new errors_1.DataError();
        }
        seen.add(input);
        var keys = [];
        for (var i = 0; i < input.length; i++) {
            var hop = input.hasOwnProperty(i);
            if (!hop) {
                throw new errors_1.DataError();
            }
            var entry = input[i];
            var key = valueToKey(entry, seen);
            keys.push(key);
        }
        return keys;
    }
    else {
        throw new errors_1.DataError();
    }
};
exports.default = valueToKey;


/***/ }),
/* 20 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var cmp_1 = __webpack_require__(25);
var errors_1 = __webpack_require__(18);
var valueToKey_1 = __webpack_require__(19);
// http://www.w3.org/TR/2015/REC-IndexedDB-20150108/#range-concept
var FDBKeyRange = /** @class */ (function () {
    function FDBKeyRange(lower, upper, lowerOpen, upperOpen) {
        this.lower = lower;
        this.upper = upper;
        this.lowerOpen = lowerOpen;
        this.upperOpen = upperOpen;
    }
    FDBKeyRange.only = function (value) {
        if (arguments.length === 0) {
            throw new TypeError();
        }
        value = valueToKey_1.default(value);
        return new FDBKeyRange(value, value, false, false);
    };
    FDBKeyRange.lowerBound = function (lower, open) {
        if (open === void 0) { open = false; }
        if (arguments.length === 0) {
            throw new TypeError();
        }
        lower = valueToKey_1.default(lower);
        return new FDBKeyRange(lower, undefined, open, true);
    };
    FDBKeyRange.upperBound = function (upper, open) {
        if (open === void 0) { open = false; }
        if (arguments.length === 0) {
            throw new TypeError();
        }
        upper = valueToKey_1.default(upper);
        return new FDBKeyRange(undefined, upper, true, open);
    };
    FDBKeyRange.bound = function (lower, upper, lowerOpen, upperOpen) {
        if (lowerOpen === void 0) { lowerOpen = false; }
        if (upperOpen === void 0) { upperOpen = false; }
        if (arguments.length < 2) {
            throw new TypeError();
        }
        var cmpResult = cmp_1.default(lower, upper);
        if (cmpResult === 1 || (cmpResult === 0 && (lowerOpen || upperOpen))) {
            throw new errors_1.DataError();
        }
        lower = valueToKey_1.default(lower);
        upper = valueToKey_1.default(upper);
        return new FDBKeyRange(lower, upper, lowerOpen, upperOpen);
    };
    // https://w3c.github.io/IndexedDB/#dom-idbkeyrange-includes
    FDBKeyRange.prototype.includes = function (key) {
        if (arguments.length === 0) {
            throw new TypeError();
        }
        key = valueToKey_1.default(key);
        if (this.lower !== undefined) {
            var cmpResult = cmp_1.default(this.lower, key);
            if (cmpResult === 1 || (cmpResult === 0 && this.lowerOpen)) {
                return false;
            }
        }
        if (this.upper !== undefined) {
            var cmpResult = cmp_1.default(this.upper, key);
            if (cmpResult === -1 || (cmpResult === 0 && this.upperOpen)) {
                return false;
            }
        }
        return true;
    };
    FDBKeyRange.prototype.toString = function () {
        return "[object IDBKeyRange]";
    };
    return FDBKeyRange;
}());
exports.default = FDBKeyRange;


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var errors_1 = __webpack_require__(18);
var FakeEventTarget_1 = __webpack_require__(31);
var FDBRequest = /** @class */ (function (_super) {
    __extends(FDBRequest, _super);
    function FDBRequest() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._result = null;
        _this._error = null;
        _this.source = null;
        _this.transaction = null;
        _this.readyState = "pending";
        _this.onsuccess = null;
        _this.onerror = null;
        return _this;
    }
    Object.defineProperty(FDBRequest.prototype, "error", {
        get: function () {
            if (this.readyState === "pending") {
                throw new errors_1.InvalidStateError();
            }
            return this._error;
        },
        set: function (value) {
            this._error = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FDBRequest.prototype, "result", {
        get: function () {
            if (this.readyState === "pending") {
                throw new errors_1.InvalidStateError();
            }
            return this._result;
        },
        set: function (value) {
            this._result = value;
        },
        enumerable: true,
        configurable: true
    });
    FDBRequest.prototype.toString = function () {
        return "[object IDBRequest]";
    };
    return FDBRequest;
}(FakeEventTarget_1.default));
exports.default = FDBRequest;


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var scope = (typeof global !== "undefined" && global) ||
            (typeof self !== "undefined" && self) ||
            window;
var apply = Function.prototype.apply;

// DOM APIs, for completeness

exports.setTimeout = function() {
  return new Timeout(apply.call(setTimeout, scope, arguments), clearTimeout);
};
exports.setInterval = function() {
  return new Timeout(apply.call(setInterval, scope, arguments), clearInterval);
};
exports.clearTimeout =
exports.clearInterval = function(timeout) {
  if (timeout) {
    timeout.close();
  }
};

function Timeout(id, clearFn) {
  this._id = id;
  this._clearFn = clearFn;
}
Timeout.prototype.unref = Timeout.prototype.ref = function() {};
Timeout.prototype.close = function() {
  this._clearFn.call(scope, this._id);
};

// Does not start the time, just sets up the members needed.
exports.enroll = function(item, msecs) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = msecs;
};

exports.unenroll = function(item) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = -1;
};

exports._unrefActive = exports.active = function(item) {
  clearTimeout(item._idleTimeoutId);

  var msecs = item._idleTimeout;
  if (msecs >= 0) {
    item._idleTimeoutId = setTimeout(function onTimeout() {
      if (item._onTimeout)
        item._onTimeout();
    }, msecs);
  }
};

// setimmediate attaches itself to the global object
__webpack_require__(46);
// On some exotic environments, it's not clear which object `setimmediate` was
// able to install onto.  Search each possibility in the same order as the
// `setimmediate` library.
exports.setImmediate = (typeof self !== "undefined" && self.setImmediate) ||
                       (typeof global !== "undefined" && global.setImmediate) ||
                       (this && this.setImmediate);
exports.clearImmediate = (typeof self !== "undefined" && self.clearImmediate) ||
                         (typeof global !== "undefined" && global.clearImmediate) ||
                         (this && this.clearImmediate);

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(20)))

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(exports, "__esModule", { value: true });
var FDBKeyRange_1 = __webpack_require__(21);
var FDBObjectStore_1 = __webpack_require__(29);
var cmp_1 = __webpack_require__(25);
var errors_1 = __webpack_require__(18);
var extractKey_1 = __webpack_require__(26);
var structuredClone_1 = __webpack_require__(27);
var valueToKey_1 = __webpack_require__(19);
var getEffectiveObjectStore = function (cursor) {
    if (cursor.source instanceof FDBObjectStore_1.default) {
        return cursor.source;
    }
    return cursor.source.objectStore;
};
// This takes a key range, a list of lower bounds, and a list of upper bounds and combines them all into a single key
// range. It does not handle gt/gte distinctions, because it doesn't really matter much anyway, since for next/prev
// cursor iteration it'd also have to look at values to be precise, which would be complicated. This should get us 99%
// of the way there.
var makeKeyRange = function (range, lowers, uppers) {
    var e_1, _a, e_2, _b;
    // Start with bounds from range
    var lower = range !== undefined ? range.lower : undefined;
    var upper = range !== undefined ? range.upper : undefined;
    try {
        // Augment with values from lowers and uppers
        for (var lowers_1 = __values(lowers), lowers_1_1 = lowers_1.next(); !lowers_1_1.done; lowers_1_1 = lowers_1.next()) {
            var lowerTemp = lowers_1_1.value;
            if (lowerTemp === undefined) {
                continue;
            }
            if (lower === undefined || cmp_1.default(lower, lowerTemp) === 1) {
                lower = lowerTemp;
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (lowers_1_1 && !lowers_1_1.done && (_a = lowers_1.return)) _a.call(lowers_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    try {
        for (var uppers_1 = __values(uppers), uppers_1_1 = uppers_1.next(); !uppers_1_1.done; uppers_1_1 = uppers_1.next()) {
            var upperTemp = uppers_1_1.value;
            if (upperTemp === undefined) {
                continue;
            }
            if (upper === undefined || cmp_1.default(upper, upperTemp) === -1) {
                upper = upperTemp;
            }
        }
    }
    catch (e_2_1) { e_2 = { error: e_2_1 }; }
    finally {
        try {
            if (uppers_1_1 && !uppers_1_1.done && (_b = uppers_1.return)) _b.call(uppers_1);
        }
        finally { if (e_2) throw e_2.error; }
    }
    if (lower !== undefined && upper !== undefined) {
        return FDBKeyRange_1.default.bound(lower, upper);
    }
    if (lower !== undefined) {
        return FDBKeyRange_1.default.lowerBound(lower);
    }
    if (upper !== undefined) {
        return FDBKeyRange_1.default.upperBound(upper);
    }
};
// http://www.w3.org/TR/2015/REC-IndexedDB-20150108/#cursor
var FDBCursor = /** @class */ (function () {
    function FDBCursor(source, range, direction, request, keyOnly) {
        if (direction === void 0) { direction = "next"; }
        if (keyOnly === void 0) { keyOnly = false; }
        this._gotValue = false;
        this._position = undefined; // Key of previously returned record
        this._objectStorePosition = undefined;
        this._keyOnly = false;
        this._key = undefined;
        this._primaryKey = undefined;
        this._range = range;
        this._source = source;
        this._direction = direction;
        this._request = request;
        this._keyOnly = keyOnly;
    }
    Object.defineProperty(FDBCursor.prototype, "source", {
        // Read only properties
        get: function () {
            return this._source;
        },
        set: function (val) {
            /* For babel */
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FDBCursor.prototype, "direction", {
        get: function () {
            return this._direction;
        },
        set: function (val) {
            /* For babel */
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FDBCursor.prototype, "key", {
        get: function () {
            return this._key;
        },
        set: function (val) {
            /* For babel */
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FDBCursor.prototype, "primaryKey", {
        get: function () {
            return this._primaryKey;
        },
        set: function (val) {
            /* For babel */
        },
        enumerable: true,
        configurable: true
    });
    // https://w3c.github.io/IndexedDB/#iterate-a-cursor
    FDBCursor.prototype._iterate = function (key, primaryKey) {
        var e_3, _a, e_4, _b, e_5, _c, e_6, _d;
        var sourceIsObjectStore = this.source instanceof FDBObjectStore_1.default;
        // Can't use sourceIsObjectStore because TypeScript
        var records = this.source instanceof FDBObjectStore_1.default
            ? this.source._rawObjectStore.records
            : this.source._rawIndex.records;
        var foundRecord;
        if (this.direction === "next") {
            var range = makeKeyRange(this._range, [key, this._position], []);
            try {
                for (var _e = __values(records.values(range)), _f = _e.next(); !_f.done; _f = _e.next()) {
                    var record = _f.value;
                    var cmpResultKey = key !== undefined ? cmp_1.default(record.key, key) : undefined;
                    var cmpResultPosition = this._position !== undefined
                        ? cmp_1.default(record.key, this._position)
                        : undefined;
                    if (key !== undefined) {
                        if (cmpResultKey === -1) {
                            continue;
                        }
                    }
                    if (primaryKey !== undefined) {
                        if (cmpResultKey === -1) {
                            continue;
                        }
                        var cmpResultPrimaryKey = cmp_1.default(record.value, primaryKey);
                        if (cmpResultKey === 0 && cmpResultPrimaryKey === -1) {
                            continue;
                        }
                    }
                    if (this._position !== undefined && sourceIsObjectStore) {
                        if (cmpResultPosition !== 1) {
                            continue;
                        }
                    }
                    if (this._position !== undefined && !sourceIsObjectStore) {
                        if (cmpResultPosition === -1) {
                            continue;
                        }
                        if (cmpResultPosition === 0 &&
                            cmp_1.default(record.value, this._objectStorePosition) !== 1) {
                            continue;
                        }
                    }
                    if (this._range !== undefined) {
                        if (!this._range.includes(record.key)) {
                            continue;
                        }
                    }
                    foundRecord = record;
                    break;
                }
            }
            catch (e_3_1) { e_3 = { error: e_3_1 }; }
            finally {
                try {
                    if (_f && !_f.done && (_a = _e.return)) _a.call(_e);
                }
                finally { if (e_3) throw e_3.error; }
            }
        }
        else if (this.direction === "nextunique") {
            // This could be done without iterating, if the range was defined slightly better (to handle gt/gte cases).
            // But the performance difference should be small, and that wouldn't work anyway for directions where the
            // value needs to be used (like next and prev).
            var range = makeKeyRange(this._range, [key, this._position], []);
            try {
                for (var _g = __values(records.values(range)), _h = _g.next(); !_h.done; _h = _g.next()) {
                    var record = _h.value;
                    if (key !== undefined) {
                        if (cmp_1.default(record.key, key) === -1) {
                            continue;
                        }
                    }
                    if (this._position !== undefined) {
                        if (cmp_1.default(record.key, this._position) !== 1) {
                            continue;
                        }
                    }
                    if (this._range !== undefined) {
                        if (!this._range.includes(record.key)) {
                            continue;
                        }
                    }
                    foundRecord = record;
                    break;
                }
            }
            catch (e_4_1) { e_4 = { error: e_4_1 }; }
            finally {
                try {
                    if (_h && !_h.done && (_b = _g.return)) _b.call(_g);
                }
                finally { if (e_4) throw e_4.error; }
            }
        }
        else if (this.direction === "prev") {
            var range = makeKeyRange(this._range, [], [key, this._position]);
            try {
                for (var _j = __values(records.values(range, "prev")), _k = _j.next(); !_k.done; _k = _j.next()) {
                    var record = _k.value;
                    var cmpResultKey = key !== undefined ? cmp_1.default(record.key, key) : undefined;
                    var cmpResultPosition = this._position !== undefined
                        ? cmp_1.default(record.key, this._position)
                        : undefined;
                    if (key !== undefined) {
                        if (cmpResultKey === 1) {
                            continue;
                        }
                    }
                    if (primaryKey !== undefined) {
                        if (cmpResultKey === 1) {
                            continue;
                        }
                        var cmpResultPrimaryKey = cmp_1.default(record.value, primaryKey);
                        if (cmpResultKey === 0 && cmpResultPrimaryKey === 1) {
                            continue;
                        }
                    }
                    if (this._position !== undefined && sourceIsObjectStore) {
                        if (cmpResultPosition !== -1) {
                            continue;
                        }
                    }
                    if (this._position !== undefined && !sourceIsObjectStore) {
                        if (cmpResultPosition === 1) {
                            continue;
                        }
                        if (cmpResultPosition === 0 &&
                            cmp_1.default(record.value, this._objectStorePosition) !== -1) {
                            continue;
                        }
                    }
                    if (this._range !== undefined) {
                        if (!this._range.includes(record.key)) {
                            continue;
                        }
                    }
                    foundRecord = record;
                    break;
                }
            }
            catch (e_5_1) { e_5 = { error: e_5_1 }; }
            finally {
                try {
                    if (_k && !_k.done && (_c = _j.return)) _c.call(_j);
                }
                finally { if (e_5) throw e_5.error; }
            }
        }
        else if (this.direction === "prevunique") {
            var tempRecord = void 0;
            var range = makeKeyRange(this._range, [], [key, this._position]);
            try {
                for (var _l = __values(records.values(range, "prev")), _m = _l.next(); !_m.done; _m = _l.next()) {
                    var record = _m.value;
                    if (key !== undefined) {
                        if (cmp_1.default(record.key, key) === 1) {
                            continue;
                        }
                    }
                    if (this._position !== undefined) {
                        if (cmp_1.default(record.key, this._position) !== -1) {
                            continue;
                        }
                    }
                    if (this._range !== undefined) {
                        if (!this._range.includes(record.key)) {
                            continue;
                        }
                    }
                    tempRecord = record;
                    break;
                }
            }
            catch (e_6_1) { e_6 = { error: e_6_1 }; }
            finally {
                try {
                    if (_m && !_m.done && (_d = _l.return)) _d.call(_l);
                }
                finally { if (e_6) throw e_6.error; }
            }
            if (tempRecord) {
                foundRecord = records.get(tempRecord.key);
            }
        }
        var result;
        if (!foundRecord) {
            this._key = undefined;
            if (!sourceIsObjectStore) {
                this._objectStorePosition = undefined;
            }
            // "this instanceof FDBCursorWithValue" would be better and not require (this as any), but causes runtime
            // error due to circular dependency.
            if (!this._keyOnly &&
                this.constructor.name === "FDBCursorWithValue") {
                this.value = undefined;
            }
            result = null;
        }
        else {
            this._position = foundRecord.key;
            if (!sourceIsObjectStore) {
                this._objectStorePosition = foundRecord.value;
            }
            this._key = foundRecord.key;
            if (sourceIsObjectStore) {
                this._primaryKey = structuredClone_1.default(foundRecord.key);
                if (!this._keyOnly &&
                    this.constructor.name === "FDBCursorWithValue") {
                    this.value = structuredClone_1.default(foundRecord.value);
                }
            }
            else {
                this._primaryKey = structuredClone_1.default(foundRecord.value);
                if (!this._keyOnly &&
                    this.constructor.name === "FDBCursorWithValue") {
                    if (this.source instanceof FDBObjectStore_1.default) {
                        // Can't use sourceIsObjectStore because TypeScript
                        throw new Error("This should never happen");
                    }
                    var value = this.source.objectStore._rawObjectStore.getValue(foundRecord.value);
                    this.value = structuredClone_1.default(value);
                }
            }
            this._gotValue = true;
            result = this;
        }
        return result;
    };
    // http://www.w3.org/TR/2015/REC-IndexedDB-20150108/#widl-IDBCursor-update-IDBRequest-any-value
    FDBCursor.prototype.update = function (value) {
        if (value === undefined) {
            throw new TypeError();
        }
        var effectiveObjectStore = getEffectiveObjectStore(this);
        var effectiveKey = this.source.hasOwnProperty("_rawIndex")
            ? this.primaryKey
            : this._position;
        var transaction = effectiveObjectStore.transaction;
        if (transaction._state !== "active") {
            throw new errors_1.TransactionInactiveError();
        }
        if (transaction.mode === "readonly") {
            throw new errors_1.ReadOnlyError();
        }
        if (effectiveObjectStore._rawObjectStore.deleted) {
            throw new errors_1.InvalidStateError();
        }
        if (!(this.source instanceof FDBObjectStore_1.default) &&
            this.source._rawIndex.deleted) {
            throw new errors_1.InvalidStateError();
        }
        if (!this._gotValue || !this.hasOwnProperty("value")) {
            throw new errors_1.InvalidStateError();
        }
        var clone = structuredClone_1.default(value);
        if (effectiveObjectStore.keyPath !== null) {
            var tempKey = void 0;
            try {
                tempKey = extractKey_1.default(effectiveObjectStore.keyPath, clone);
            }
            catch (err) {
                /* Handled immediately below */
            }
            if (cmp_1.default(tempKey, effectiveKey) !== 0) {
                throw new errors_1.DataError();
            }
        }
        var record = {
            key: effectiveKey,
            value: clone,
        };
        return transaction._execRequestAsync({
            operation: effectiveObjectStore._rawObjectStore.storeRecord.bind(effectiveObjectStore._rawObjectStore, record, false, transaction._rollbackLog),
            source: this,
        });
    };
    // http://www.w3.org/TR/2015/REC-IndexedDB-20150108/#widl-IDBCursor-advance-void-unsigned-long-count
    FDBCursor.prototype.advance = function (count) {
        var _this = this;
        if (!Number.isInteger(count) || count <= 0) {
            throw new TypeError();
        }
        var effectiveObjectStore = getEffectiveObjectStore(this);
        var transaction = effectiveObjectStore.transaction;
        if (transaction._state !== "active") {
            throw new errors_1.TransactionInactiveError();
        }
        if (effectiveObjectStore._rawObjectStore.deleted) {
            throw new errors_1.InvalidStateError();
        }
        if (!(this.source instanceof FDBObjectStore_1.default) &&
            this.source._rawIndex.deleted) {
            throw new errors_1.InvalidStateError();
        }
        if (!this._gotValue) {
            throw new errors_1.InvalidStateError();
        }
        if (this._request) {
            this._request.readyState = "pending";
        }
        transaction._execRequestAsync({
            operation: function () {
                var result;
                for (var i = 0; i < count; i++) {
                    result = _this._iterate();
                    // Not sure why this is needed
                    if (!result) {
                        break;
                    }
                }
                return result;
            },
            request: this._request,
            source: this.source,
        });
        this._gotValue = false;
    };
    // http://www.w3.org/TR/2015/REC-IndexedDB-20150108/#widl-IDBCursor-continue-void-any-key
    FDBCursor.prototype.continue = function (key) {
        var effectiveObjectStore = getEffectiveObjectStore(this);
        var transaction = effectiveObjectStore.transaction;
        if (transaction._state !== "active") {
            throw new errors_1.TransactionInactiveError();
        }
        if (effectiveObjectStore._rawObjectStore.deleted) {
            throw new errors_1.InvalidStateError();
        }
        if (!(this.source instanceof FDBObjectStore_1.default) &&
            this.source._rawIndex.deleted) {
            throw new errors_1.InvalidStateError();
        }
        if (!this._gotValue) {
            throw new errors_1.InvalidStateError();
        }
        if (key !== undefined) {
            key = valueToKey_1.default(key);
            var cmpResult = cmp_1.default(key, this._position);
            if ((cmpResult <= 0 &&
                (this.direction === "next" ||
                    this.direction === "nextunique")) ||
                (cmpResult >= 0 &&
                    (this.direction === "prev" ||
                        this.direction === "prevunique"))) {
                throw new errors_1.DataError();
            }
        }
        if (this._request) {
            this._request.readyState = "pending";
        }
        transaction._execRequestAsync({
            operation: this._iterate.bind(this, key),
            request: this._request,
            source: this.source,
        });
        this._gotValue = false;
    };
    // hthttps://w3c.github.io/IndexedDB/#dom-idbcursor-continueprimarykey
    FDBCursor.prototype.continuePrimaryKey = function (key, primaryKey) {
        var effectiveObjectStore = getEffectiveObjectStore(this);
        var transaction = effectiveObjectStore.transaction;
        if (transaction._state !== "active") {
            throw new errors_1.TransactionInactiveError();
        }
        if (effectiveObjectStore._rawObjectStore.deleted) {
            throw new errors_1.InvalidStateError();
        }
        if (!(this.source instanceof FDBObjectStore_1.default) &&
            this.source._rawIndex.deleted) {
            throw new errors_1.InvalidStateError();
        }
        if (this.source instanceof FDBObjectStore_1.default ||
            (this.direction !== "next" && this.direction !== "prev")) {
            throw new errors_1.InvalidAccessError();
        }
        if (!this._gotValue) {
            throw new errors_1.InvalidStateError();
        }
        // Not sure about this
        if (key === undefined || primaryKey === undefined) {
            throw new errors_1.DataError();
        }
        key = valueToKey_1.default(key);
        var cmpResult = cmp_1.default(key, this._position);
        if ((cmpResult === -1 && this.direction === "next") ||
            (cmpResult === 1 && this.direction === "prev")) {
            throw new errors_1.DataError();
        }
        var cmpResult2 = cmp_1.default(primaryKey, this._objectStorePosition);
        if (cmpResult === 0) {
            if ((cmpResult2 <= 0 && this.direction === "next") ||
                (cmpResult2 >= 0 && this.direction === "prev")) {
                throw new errors_1.DataError();
            }
        }
        if (this._request) {
            this._request.readyState = "pending";
        }
        transaction._execRequestAsync({
            operation: this._iterate.bind(this, key, primaryKey),
            request: this._request,
            source: this.source,
        });
        this._gotValue = false;
    };
    FDBCursor.prototype.delete = function () {
        var effectiveObjectStore = getEffectiveObjectStore(this);
        var effectiveKey = this.source.hasOwnProperty("_rawIndex")
            ? this.primaryKey
            : this._position;
        var transaction = effectiveObjectStore.transaction;
        if (transaction._state !== "active") {
            throw new errors_1.TransactionInactiveError();
        }
        if (transaction.mode === "readonly") {
            throw new errors_1.ReadOnlyError();
        }
        if (effectiveObjectStore._rawObjectStore.deleted) {
            throw new errors_1.InvalidStateError();
        }
        if (!(this.source instanceof FDBObjectStore_1.default) &&
            this.source._rawIndex.deleted) {
            throw new errors_1.InvalidStateError();
        }
        if (!this._gotValue || !this.hasOwnProperty("value")) {
            throw new errors_1.InvalidStateError();
        }
        return transaction._execRequestAsync({
            operation: effectiveObjectStore._rawObjectStore.deleteRecord.bind(effectiveObjectStore._rawObjectStore, effectiveKey, transaction._rollbackLog),
            source: this,
        });
    };
    FDBCursor.prototype.toString = function () {
        return "[object IDBCursor]";
    };
    return FDBCursor;
}());
exports.default = FDBCursor;


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var errors_1 = __webpack_require__(18);
var valueToKey_1 = __webpack_require__(19);
var getType = function (x) {
    if (typeof x === "number") {
        return "Number";
    }
    if (x instanceof Date) {
        return "Date";
    }
    if (Array.isArray(x)) {
        return "Array";
    }
    if (typeof x === "string") {
        return "String";
    }
    if (x instanceof ArrayBuffer) {
        return "Binary";
    }
    throw new errors_1.DataError();
};
// https://w3c.github.io/IndexedDB/#compare-two-keys
var cmp = function (first, second) {
    if (second === undefined) {
        throw new TypeError();
    }
    first = valueToKey_1.default(first);
    second = valueToKey_1.default(second);
    var t1 = getType(first);
    var t2 = getType(second);
    if (t1 !== t2) {
        if (t1 === "Array") {
            return 1;
        }
        if (t1 === "Binary" &&
            (t2 === "String" || t2 === "Date" || t2 === "Number")) {
            return 1;
        }
        if (t1 === "String" && (t2 === "Date" || t2 === "Number")) {
            return 1;
        }
        if (t1 === "Date" && t2 === "Number") {
            return 1;
        }
        return -1;
    }
    if (t1 === "Binary") {
        first = new Uint8Array(first);
        second = new Uint8Array(second);
    }
    if (t1 === "Array" || t1 === "Binary") {
        var length_1 = Math.min(first.length, second.length);
        for (var i = 0; i < length_1; i++) {
            var result = cmp(first[i], second[i]);
            if (result !== 0) {
                return result;
            }
        }
        if (first.length > second.length) {
            return 1;
        }
        if (first.length < second.length) {
            return -1;
        }
        return 0;
    }
    if (t1 === "Date") {
        if (first.getTime() === second.getTime()) {
            return 0;
        }
    }
    else {
        if (first === second) {
            return 0;
        }
    }
    return first > second ? 1 : -1;
};
exports.default = cmp;


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(exports, "__esModule", { value: true });
var valueToKey_1 = __webpack_require__(19);
// http://www.w3.org/TR/2015/REC-IndexedDB-20150108/#dfn-steps-for-extracting-a-key-from-a-value-using-a-key-path
var extractKey = function (keyPath, value) {
    var e_1, _a;
    if (Array.isArray(keyPath)) {
        var result = [];
        try {
            for (var keyPath_1 = __values(keyPath), keyPath_1_1 = keyPath_1.next(); !keyPath_1_1.done; keyPath_1_1 = keyPath_1.next()) {
                var item = keyPath_1_1.value;
                // This doesn't make sense to me based on the spec, but it is needed to pass the W3C KeyPath tests (see same
                // comment in validateKeyPath)
                if (item !== undefined &&
                    item !== null &&
                    typeof item !== "string" &&
                    item.toString) {
                    item = item.toString();
                }
                result.push(valueToKey_1.default(extractKey(item, value)));
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (keyPath_1_1 && !keyPath_1_1.done && (_a = keyPath_1.return)) _a.call(keyPath_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return result;
    }
    if (keyPath === "") {
        return value;
    }
    var remainingKeyPath = keyPath;
    var object = value;
    while (remainingKeyPath !== null) {
        var identifier = void 0;
        var i = remainingKeyPath.indexOf(".");
        if (i >= 0) {
            identifier = remainingKeyPath.slice(0, i);
            remainingKeyPath = remainingKeyPath.slice(i + 1);
        }
        else {
            identifier = remainingKeyPath;
            remainingKeyPath = null;
        }
        if (!object.hasOwnProperty(identifier)) {
            return;
        }
        object = object[identifier];
    }
    return object;
};
exports.default = extractKey;


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var realisticStructuredClone = __webpack_require__(48); // tslint:disable-line no-var-requires
var errors_1 = __webpack_require__(18);
var structuredClone = function (input) {
    try {
        return realisticStructuredClone(input);
    }
    catch (err) {
        throw new errors_1.DataCloneError();
    }
};
exports.default = structuredClone;


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
// Would be nicer to sublcass Array, but I'd have to sacrifice Node 4 support to do that.
var fakeDOMStringList = function (arr) {
    var arr2 = arr.slice();
    Object.defineProperty(arr2, "contains", {
        // tslint:disable-next-line object-literal-shorthand
        value: function (value) { return arr2.indexOf(value) >= 0; },
    });
    Object.defineProperty(arr2, "item", {
        // tslint:disable-next-line object-literal-shorthand
        value: function (i) { return arr2[i]; },
    });
    return arr2;
};
exports.default = fakeDOMStringList;


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var FDBCursor_1 = __webpack_require__(24);
var FDBCursorWithValue_1 = __webpack_require__(30);
var FDBIndex_1 = __webpack_require__(38);
var FDBKeyRange_1 = __webpack_require__(21);
var FDBRequest_1 = __webpack_require__(22);
var canInjectKey_1 = __webpack_require__(53);
var enforceRange_1 = __webpack_require__(32);
var errors_1 = __webpack_require__(18);
var extractKey_1 = __webpack_require__(26);
var fakeDOMStringList_1 = __webpack_require__(28);
var Index_1 = __webpack_require__(54);
var structuredClone_1 = __webpack_require__(27);
var validateKeyPath_1 = __webpack_require__(41);
var valueToKey_1 = __webpack_require__(19);
var valueToKeyRange_1 = __webpack_require__(39);
var confirmActiveTransaction = function (objectStore) {
    if (objectStore._rawObjectStore.deleted) {
        throw new errors_1.InvalidStateError();
    }
    if (objectStore.transaction._state !== "active") {
        throw new errors_1.TransactionInactiveError();
    }
};
var buildRecordAddPut = function (objectStore, value, key) {
    confirmActiveTransaction(objectStore);
    if (objectStore.transaction.mode === "readonly") {
        throw new errors_1.ReadOnlyError();
    }
    if (objectStore.keyPath !== null) {
        if (key !== undefined) {
            throw new errors_1.DataError();
        }
    }
    var clone = structuredClone_1.default(value);
    if (objectStore.keyPath !== null) {
        var tempKey = extractKey_1.default(objectStore.keyPath, clone);
        if (tempKey !== undefined) {
            valueToKey_1.default(tempKey);
        }
        else {
            if (!objectStore._rawObjectStore.keyGenerator) {
                throw new errors_1.DataError();
            }
            else if (!canInjectKey_1.default(objectStore.keyPath, clone)) {
                throw new errors_1.DataError();
            }
        }
    }
    if (objectStore.keyPath === null &&
        objectStore._rawObjectStore.keyGenerator === null &&
        key === undefined) {
        throw new errors_1.DataError();
    }
    if (key !== undefined) {
        key = valueToKey_1.default(key);
    }
    return {
        key: key,
        value: clone,
    };
};
// http://www.w3.org/TR/2015/REC-IndexedDB-20150108/#object-store
var FDBObjectStore = /** @class */ (function () {
    function FDBObjectStore(transaction, rawObjectStore) {
        this._indexesCache = new Map();
        this._rawObjectStore = rawObjectStore;
        this._name = rawObjectStore.name;
        this.keyPath = rawObjectStore.keyPath;
        this.autoIncrement = rawObjectStore.autoIncrement;
        this.transaction = transaction;
        this.indexNames = fakeDOMStringList_1.default(Array.from(rawObjectStore.rawIndexes.keys())).sort();
    }
    Object.defineProperty(FDBObjectStore.prototype, "name", {
        get: function () {
            return this._name;
        },
        // http://w3c.github.io/IndexedDB/#dom-idbobjectstore-name
        set: function (name) {
            var _this = this;
            var transaction = this.transaction;
            if (!transaction.db._runningVersionchangeTransaction) {
                throw new errors_1.InvalidStateError();
            }
            confirmActiveTransaction(this);
            name = String(name);
            if (name === this._name) {
                return;
            }
            if (this._rawObjectStore.rawDatabase.rawObjectStores.has(name)) {
                throw new errors_1.ConstraintError();
            }
            var oldName = this._name;
            var oldObjectStoreNames = transaction.db.objectStoreNames.slice();
            this._name = name;
            this._rawObjectStore.name = name;
            this.transaction._objectStoresCache.delete(oldName);
            this.transaction._objectStoresCache.set(name, this);
            this._rawObjectStore.rawDatabase.rawObjectStores.delete(oldName);
            this._rawObjectStore.rawDatabase.rawObjectStores.set(name, this._rawObjectStore);
            transaction.db.objectStoreNames = fakeDOMStringList_1.default(Array.from(this._rawObjectStore.rawDatabase.rawObjectStores.keys()).filter(function (objectStoreName) {
                var objectStore = _this._rawObjectStore.rawDatabase.rawObjectStores.get(objectStoreName);
                return objectStore && !objectStore.deleted;
            })).sort();
            var oldScope = new Set(transaction._scope);
            var oldTransactionObjectStoreNames = transaction.objectStoreNames.slice();
            this.transaction._scope.delete(oldName);
            transaction._scope.add(name);
            transaction.objectStoreNames = fakeDOMStringList_1.default(Array.from(transaction._scope).sort());
            transaction._rollbackLog.push(function () {
                _this._name = oldName;
                _this._rawObjectStore.name = oldName;
                _this.transaction._objectStoresCache.delete(name);
                _this.transaction._objectStoresCache.set(oldName, _this);
                _this._rawObjectStore.rawDatabase.rawObjectStores.delete(name);
                _this._rawObjectStore.rawDatabase.rawObjectStores.set(oldName, _this._rawObjectStore);
                transaction.db.objectStoreNames = fakeDOMStringList_1.default(oldObjectStoreNames);
                transaction._scope = oldScope;
                transaction.objectStoreNames = fakeDOMStringList_1.default(oldTransactionObjectStoreNames);
            });
        },
        enumerable: true,
        configurable: true
    });
    FDBObjectStore.prototype.put = function (value, key) {
        if (arguments.length === 0) {
            throw new TypeError();
        }
        var record = buildRecordAddPut(this, value, key);
        return this.transaction._execRequestAsync({
            operation: this._rawObjectStore.storeRecord.bind(this._rawObjectStore, record, false, this.transaction._rollbackLog),
            source: this,
        });
    };
    FDBObjectStore.prototype.add = function (value, key) {
        if (arguments.length === 0) {
            throw new TypeError();
        }
        var record = buildRecordAddPut(this, value, key);
        return this.transaction._execRequestAsync({
            operation: this._rawObjectStore.storeRecord.bind(this._rawObjectStore, record, true, this.transaction._rollbackLog),
            source: this,
        });
    };
    FDBObjectStore.prototype.delete = function (key) {
        if (arguments.length === 0) {
            throw new TypeError();
        }
        confirmActiveTransaction(this);
        if (this.transaction.mode === "readonly") {
            throw new errors_1.ReadOnlyError();
        }
        if (!(key instanceof FDBKeyRange_1.default)) {
            key = valueToKey_1.default(key);
        }
        return this.transaction._execRequestAsync({
            operation: this._rawObjectStore.deleteRecord.bind(this._rawObjectStore, key, this.transaction._rollbackLog),
            source: this,
        });
    };
    FDBObjectStore.prototype.get = function (key) {
        if (arguments.length === 0) {
            throw new TypeError();
        }
        confirmActiveTransaction(this);
        if (!(key instanceof FDBKeyRange_1.default)) {
            key = valueToKey_1.default(key);
        }
        return this.transaction._execRequestAsync({
            operation: this._rawObjectStore.getValue.bind(this._rawObjectStore, key),
            source: this,
        });
    };
    // http://w3c.github.io/IndexedDB/#dom-idbobjectstore-getall
    FDBObjectStore.prototype.getAll = function (query, count) {
        if (arguments.length > 1 && count !== undefined) {
            count = enforceRange_1.default(count, "unsigned long");
        }
        confirmActiveTransaction(this);
        var range = valueToKeyRange_1.default(query);
        return this.transaction._execRequestAsync({
            operation: this._rawObjectStore.getAllValues.bind(this._rawObjectStore, range, count),
            source: this,
        });
    };
    // http://w3c.github.io/IndexedDB/#dom-idbobjectstore-getkey
    FDBObjectStore.prototype.getKey = function (key) {
        if (arguments.length === 0) {
            throw new TypeError();
        }
        confirmActiveTransaction(this);
        if (!(key instanceof FDBKeyRange_1.default)) {
            key = valueToKey_1.default(key);
        }
        return this.transaction._execRequestAsync({
            operation: this._rawObjectStore.getKey.bind(this._rawObjectStore, key),
            source: this,
        });
    };
    // http://w3c.github.io/IndexedDB/#dom-idbobjectstore-getallkeys
    FDBObjectStore.prototype.getAllKeys = function (query, count) {
        if (arguments.length > 1 && count !== undefined) {
            count = enforceRange_1.default(count, "unsigned long");
        }
        confirmActiveTransaction(this);
        var range = valueToKeyRange_1.default(query);
        return this.transaction._execRequestAsync({
            operation: this._rawObjectStore.getAllKeys.bind(this._rawObjectStore, range, count),
            source: this,
        });
    };
    FDBObjectStore.prototype.clear = function () {
        confirmActiveTransaction(this);
        if (this.transaction.mode === "readonly") {
            throw new errors_1.ReadOnlyError();
        }
        return this.transaction._execRequestAsync({
            operation: this._rawObjectStore.clear.bind(this._rawObjectStore, this.transaction._rollbackLog),
            source: this,
        });
    };
    FDBObjectStore.prototype.openCursor = function (range, direction) {
        confirmActiveTransaction(this);
        if (range === null) {
            range = undefined;
        }
        if (range !== undefined && !(range instanceof FDBKeyRange_1.default)) {
            range = FDBKeyRange_1.default.only(valueToKey_1.default(range));
        }
        var request = new FDBRequest_1.default();
        request.source = this;
        request.transaction = this.transaction;
        var cursor = new FDBCursorWithValue_1.default(this, range, direction, request);
        return this.transaction._execRequestAsync({
            operation: cursor._iterate.bind(cursor),
            request: request,
            source: this,
        });
    };
    FDBObjectStore.prototype.openKeyCursor = function (range, direction) {
        confirmActiveTransaction(this);
        if (range === null) {
            range = undefined;
        }
        if (range !== undefined && !(range instanceof FDBKeyRange_1.default)) {
            range = FDBKeyRange_1.default.only(valueToKey_1.default(range));
        }
        var request = new FDBRequest_1.default();
        request.source = this;
        request.transaction = this.transaction;
        var cursor = new FDBCursor_1.default(this, range, direction, request, true);
        return this.transaction._execRequestAsync({
            operation: cursor._iterate.bind(cursor),
            request: request,
            source: this,
        });
    };
    // tslint:disable-next-line max-line-length
    // http://www.w3.org/TR/2015/REC-IndexedDB-20150108/#widl-IDBObjectStore-createIndex-IDBIndex-DOMString-name-DOMString-sequence-DOMString--keyPath-IDBIndexParameters-optionalParameters
    FDBObjectStore.prototype.createIndex = function (name, keyPath, optionalParameters) {
        var _this = this;
        if (optionalParameters === void 0) { optionalParameters = {}; }
        if (arguments.length < 2) {
            throw new TypeError();
        }
        var multiEntry = optionalParameters.multiEntry !== undefined
            ? optionalParameters.multiEntry
            : false;
        var unique = optionalParameters.unique !== undefined
            ? optionalParameters.unique
            : false;
        if (this.transaction.mode !== "versionchange") {
            throw new errors_1.InvalidStateError();
        }
        confirmActiveTransaction(this);
        if (this.indexNames.indexOf(name) >= 0) {
            throw new errors_1.ConstraintError();
        }
        validateKeyPath_1.default(keyPath);
        if (Array.isArray(keyPath) && multiEntry) {
            throw new errors_1.InvalidAccessError();
        }
        // The index that is requested to be created can contain constraints on the data allowed in the index's
        // referenced object store, such as requiring uniqueness of the values referenced by the index's keyPath. If the
        // referenced object store already contains data which violates these constraints, this MUST NOT cause the
        // implementation of createIndex to throw an exception or affect what it returns. The implementation MUST still
        // create and return an IDBIndex object. Instead the implementation must queue up an operation to abort the
        // "versionchange" transaction which was used for the createIndex call.
        var indexNames = this.indexNames.slice();
        this.transaction._rollbackLog.push(function () {
            var index2 = _this._rawObjectStore.rawIndexes.get(name);
            if (index2) {
                index2.deleted = true;
            }
            _this.indexNames = fakeDOMStringList_1.default(indexNames);
            _this._rawObjectStore.rawIndexes.delete(name);
        });
        var index = new Index_1.default(this._rawObjectStore, name, keyPath, multiEntry, unique);
        this.indexNames.push(name);
        this.indexNames.sort();
        this._rawObjectStore.rawIndexes.set(name, index);
        index.initialize(this.transaction); // This is async by design
        return new FDBIndex_1.default(this, index);
    };
    // https://w3c.github.io/IndexedDB/#dom-idbobjectstore-index
    FDBObjectStore.prototype.index = function (name) {
        if (arguments.length === 0) {
            throw new TypeError();
        }
        if (this._rawObjectStore.deleted ||
            this.transaction._state === "finished") {
            throw new errors_1.InvalidStateError();
        }
        var index = this._indexesCache.get(name);
        if (index !== undefined) {
            return index;
        }
        var rawIndex = this._rawObjectStore.rawIndexes.get(name);
        if (this.indexNames.indexOf(name) < 0 || rawIndex === undefined) {
            throw new errors_1.NotFoundError();
        }
        var index2 = new FDBIndex_1.default(this, rawIndex);
        this._indexesCache.set(name, index2);
        return index2;
    };
    FDBObjectStore.prototype.deleteIndex = function (name) {
        var _this = this;
        if (arguments.length === 0) {
            throw new TypeError();
        }
        if (this.transaction.mode !== "versionchange") {
            throw new errors_1.InvalidStateError();
        }
        confirmActiveTransaction(this);
        var rawIndex = this._rawObjectStore.rawIndexes.get(name);
        if (rawIndex === undefined) {
            throw new errors_1.NotFoundError();
        }
        this.transaction._rollbackLog.push(function () {
            rawIndex.deleted = false;
            _this._rawObjectStore.rawIndexes.set(name, rawIndex);
            _this.indexNames.push(name);
            _this.indexNames.sort();
        });
        this.indexNames = fakeDOMStringList_1.default(this.indexNames.filter(function (indexName) {
            return indexName !== name;
        }));
        rawIndex.deleted = true; // Not sure if this is supposed to happen synchronously
        this.transaction._execRequestAsync({
            operation: function () {
                var rawIndex2 = _this._rawObjectStore.rawIndexes.get(name);
                // Hack in case another index is given this name before this async request is processed. It'd be better
                // to have a real unique ID for each index.
                if (rawIndex === rawIndex2) {
                    _this._rawObjectStore.rawIndexes.delete(name);
                }
            },
            source: this,
        });
    };
    // http://www.w3.org/TR/2015/REC-IndexedDB-20150108/#widl-IDBObjectStore-count-IDBRequest-any-key
    FDBObjectStore.prototype.count = function (key) {
        var _this = this;
        confirmActiveTransaction(this);
        if (key === null) {
            key = undefined;
        }
        if (key !== undefined && !(key instanceof FDBKeyRange_1.default)) {
            key = FDBKeyRange_1.default.only(valueToKey_1.default(key));
        }
        return this.transaction._execRequestAsync({
            operation: function () {
                var count = 0;
                var cursor = new FDBCursor_1.default(_this, key);
                while (cursor._iterate() !== null) {
                    count += 1;
                }
                return count;
            },
            source: this,
        });
    };
    FDBObjectStore.prototype.toString = function () {
        return "[object IDBObjectStore]";
    };
    return FDBObjectStore;
}());
exports.default = FDBObjectStore;


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var FDBCursor_1 = __webpack_require__(24);
var FDBCursorWithValue = /** @class */ (function (_super) {
    __extends(FDBCursorWithValue, _super);
    function FDBCursorWithValue(source, range, direction, request) {
        var _this = _super.call(this, source, range, direction, request) || this;
        _this.value = undefined;
        return _this;
    }
    FDBCursorWithValue.prototype.toString = function () {
        return "[object IDBCursorWithValue]";
    };
    return FDBCursorWithValue;
}(FDBCursor_1.default));
exports.default = FDBCursorWithValue;


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(exports, "__esModule", { value: true });
var errors_1 = __webpack_require__(18);
var stopped = function (event, listener) {
    return (event.immediatePropagationStopped ||
        (event.eventPhase === event.CAPTURING_PHASE &&
            listener.capture === false) ||
        (event.eventPhase === event.BUBBLING_PHASE && listener.capture === true));
};
// http://www.w3.org/TR/dom/#concept-event-listener-invoke
var invokeEventListeners = function (event, obj) {
    var e_1, _a;
    event.currentTarget = obj;
    try {
        // The callback might cause obj.listeners to mutate as we traverse it.
        // Take a copy of the array so that nothing sneaks in and we don't lose
        // our place.
        for (var _b = __values(obj.listeners.slice()), _c = _b.next(); !_c.done; _c = _b.next()) {
            var listener = _c.value;
            if (event.type !== listener.type || stopped(event, listener)) {
                continue;
            }
            // @ts-ignore
            listener.callback.call(event.currentTarget, event);
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        }
        finally { if (e_1) throw e_1.error; }
    }
    var typeToProp = {
        abort: "onabort",
        blocked: "onblocked",
        complete: "oncomplete",
        error: "onerror",
        success: "onsuccess",
        upgradeneeded: "onupgradeneeded",
        versionchange: "onversionchange",
    };
    var prop = typeToProp[event.type];
    if (prop === undefined) {
        throw new Error("Unknown event type: \"" + event.type + "\"");
    }
    var callback = event.currentTarget[prop];
    if (callback) {
        var listener = {
            callback: callback,
            capture: false,
            type: event.type,
        };
        if (!stopped(event, listener)) {
            // @ts-ignore
            listener.callback.call(event.currentTarget, event);
        }
    }
};
var FakeEventTarget = /** @class */ (function () {
    function FakeEventTarget() {
        this.listeners = [];
    }
    FakeEventTarget.prototype.addEventListener = function (type, callback, capture) {
        if (capture === void 0) { capture = false; }
        this.listeners.push({
            callback: callback,
            capture: capture,
            type: type,
        });
    };
    FakeEventTarget.prototype.removeEventListener = function (type, callback, capture) {
        if (capture === void 0) { capture = false; }
        var i = this.listeners.findIndex(function (listener) {
            return (listener.type === type &&
                listener.callback === callback &&
                listener.capture === capture);
        });
        this.listeners.splice(i, 1);
    };
    // http://www.w3.org/TR/dom/#dispatching-events
    FakeEventTarget.prototype.dispatchEvent = function (event) {
        var e_2, _a, e_3, _b;
        if (event.dispatched || !event.initialized) {
            throw new errors_1.InvalidStateError("The object is in an invalid state.");
        }
        event.isTrusted = false;
        event.dispatched = true;
        event.target = this;
        // NOT SURE WHEN THIS SHOULD BE SET        event.eventPath = [];
        event.eventPhase = event.CAPTURING_PHASE;
        try {
            for (var _c = __values(event.eventPath), _d = _c.next(); !_d.done; _d = _c.next()) {
                var obj = _d.value;
                if (!event.propagationStopped) {
                    invokeEventListeners(event, obj);
                }
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
            }
            finally { if (e_2) throw e_2.error; }
        }
        event.eventPhase = event.AT_TARGET;
        if (!event.propagationStopped) {
            invokeEventListeners(event, event.target);
        }
        if (event.bubbles) {
            event.eventPath.reverse();
            event.eventPhase = event.BUBBLING_PHASE;
            try {
                for (var _e = __values(event.eventPath), _f = _e.next(); !_f.done; _f = _e.next()) {
                    var obj = _f.value;
                    if (!event.propagationStopped) {
                        invokeEventListeners(event, obj);
                    }
                }
            }
            catch (e_3_1) { e_3 = { error: e_3_1 }; }
            finally {
                try {
                    if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
                }
                finally { if (e_3) throw e_3.error; }
            }
        }
        event.dispatched = false;
        event.eventPhase = event.NONE;
        event.currentTarget = null;
        if (event.canceled) {
            return false;
        }
        return true;
    };
    return FakeEventTarget;
}());
exports.default = FakeEventTarget;


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://heycam.github.io/webidl/#EnforceRange
Object.defineProperty(exports, "__esModule", { value: true });
var enforceRange = function (num, type) {
    var min = 0;
    var max = type === "unsigned long" ? 4294967295 : 9007199254740991;
    if (isNaN(num) || num < min || num > max) {
        throw new TypeError();
    }
    if (num >= 0) {
        return Math.floor(num);
    }
};
exports.default = enforceRange;


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Event = /** @class */ (function () {
    function Event(type, eventInitDict) {
        if (eventInitDict === void 0) { eventInitDict = {}; }
        this.eventPath = [];
        this.NONE = 0;
        this.CAPTURING_PHASE = 1;
        this.AT_TARGET = 2;
        this.BUBBLING_PHASE = 3;
        // Flags
        this.propagationStopped = false;
        this.immediatePropagationStopped = false;
        this.canceled = false;
        this.initialized = true;
        this.dispatched = false;
        this.target = null;
        this.currentTarget = null;
        this.eventPhase = 0;
        this.defaultPrevented = false;
        this.isTrusted = false;
        this.timeStamp = Date.now();
        this.type = type;
        this.bubbles =
            eventInitDict.bubbles !== undefined ? eventInitDict.bubbles : false;
        this.cancelable =
            eventInitDict.cancelable !== undefined
                ? eventInitDict.cancelable
                : false;
    }
    Event.prototype.preventDefault = function () {
        if (this.cancelable) {
            this.canceled = true;
        }
    };
    Event.prototype.stopPropagation = function () {
        this.propagationStopped = true;
    };
    Event.prototype.stopImmediatePropagation = function () {
        this.propagationStopped = true;
        this.immediatePropagationStopped = true;
    };
    return Event;
}());
exports.default = Event;


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(setImmediate) {
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
__webpack_require__(47);
var FDBDatabase_1 = __webpack_require__(36);
var FDBOpenDBRequest_1 = __webpack_require__(42);
var FDBVersionChangeEvent_1 = __webpack_require__(43);
var cmp_1 = __webpack_require__(25);
var Database_1 = __webpack_require__(57);
var enforceRange_1 = __webpack_require__(32);
var errors_1 = __webpack_require__(18);
var FakeEvent_1 = __webpack_require__(33);
var waitForOthersClosedDelete = function (databases, name, openDatabases, cb) {
    var anyOpen = openDatabases.some(function (openDatabase2) {
        return !openDatabase2._closed && !openDatabase2._closePending;
    });
    if (anyOpen) {
        setImmediate(function () {
            return waitForOthersClosedDelete(databases, name, openDatabases, cb);
        });
        return;
    }
    databases.delete(name);
    cb(null);
};
// http://www.w3.org/TR/2015/REC-IndexedDB-20150108/#dfn-steps-for-deleting-a-database
var deleteDatabase = function (databases, name, request, cb) {
    var e_1, _a;
    try {
        var db = databases.get(name);
        if (db === undefined) {
            cb(null);
            return;
        }
        db.deletePending = true;
        var openDatabases = db.connections.filter(function (connection) {
            return !connection._closed && !connection._closePending;
        });
        try {
            for (var openDatabases_1 = __values(openDatabases), openDatabases_1_1 = openDatabases_1.next(); !openDatabases_1_1.done; openDatabases_1_1 = openDatabases_1.next()) {
                var openDatabase2 = openDatabases_1_1.value;
                if (!openDatabase2._closePending) {
                    var event_1 = new FDBVersionChangeEvent_1.default("versionchange", {
                        newVersion: null,
                        oldVersion: db.version,
                    });
                    openDatabase2.dispatchEvent(event_1);
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (openDatabases_1_1 && !openDatabases_1_1.done && (_a = openDatabases_1.return)) _a.call(openDatabases_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        var anyOpen = openDatabases.some(function (openDatabase3) {
            return !openDatabase3._closed && !openDatabase3._closePending;
        });
        if (request && anyOpen) {
            var event_2 = new FDBVersionChangeEvent_1.default("blocked", {
                newVersion: null,
                oldVersion: db.version,
            });
            request.dispatchEvent(event_2);
        }
        waitForOthersClosedDelete(databases, name, openDatabases, cb);
    }
    catch (err) {
        cb(err);
    }
};
// http://www.w3.org/TR/2015/REC-IndexedDB-20150108/#dfn-steps-for-running-a-versionchange-transaction
var runVersionchangeTransaction = function (connection, version, request, cb) {
    var e_2, _a;
    connection._runningVersionchangeTransaction = true;
    var oldVersion = connection.version;
    var openDatabases = connection._rawDatabase.connections.filter(function (otherDatabase) {
        return connection !== otherDatabase;
    });
    try {
        for (var openDatabases_2 = __values(openDatabases), openDatabases_2_1 = openDatabases_2.next(); !openDatabases_2_1.done; openDatabases_2_1 = openDatabases_2.next()) {
            var openDatabase2 = openDatabases_2_1.value;
            if (!openDatabase2._closed && !openDatabase2._closePending) {
                var event_3 = new FDBVersionChangeEvent_1.default("versionchange", {
                    newVersion: version,
                    oldVersion: oldVersion,
                });
                openDatabase2.dispatchEvent(event_3);
            }
        }
    }
    catch (e_2_1) { e_2 = { error: e_2_1 }; }
    finally {
        try {
            if (openDatabases_2_1 && !openDatabases_2_1.done && (_a = openDatabases_2.return)) _a.call(openDatabases_2);
        }
        finally { if (e_2) throw e_2.error; }
    }
    var anyOpen = openDatabases.some(function (openDatabase3) {
        return !openDatabase3._closed && !openDatabase3._closePending;
    });
    if (anyOpen) {
        var event_4 = new FDBVersionChangeEvent_1.default("blocked", {
            newVersion: version,
            oldVersion: oldVersion,
        });
        request.dispatchEvent(event_4);
    }
    var waitForOthersClosed = function () {
        var anyOpen2 = openDatabases.some(function (openDatabase2) {
            return !openDatabase2._closed && !openDatabase2._closePending;
        });
        if (anyOpen2) {
            setImmediate(waitForOthersClosed);
            return;
        }
        // Set the version of database to version. This change is considered part of the transaction, and so if the
        // transaction is aborted, this change is reverted.
        connection._rawDatabase.version = version;
        connection.version = version;
        // Get rid of this setImmediate?
        var transaction = connection.transaction(connection.objectStoreNames, "versionchange");
        request.result = connection;
        request.readyState = "done";
        request.transaction = transaction;
        transaction._rollbackLog.push(function () {
            connection._rawDatabase.version = oldVersion;
            connection.version = oldVersion;
        });
        var event = new FDBVersionChangeEvent_1.default("upgradeneeded", {
            newVersion: version,
            oldVersion: oldVersion,
        });
        request.dispatchEvent(event);
        transaction.addEventListener("error", function () {
            connection._runningVersionchangeTransaction = false;
            // throw arguments[0].target.error;
            // console.log("error in versionchange transaction - not sure if anything needs to be done here", e.target.error.name);
        });
        transaction.addEventListener("abort", function () {
            connection._runningVersionchangeTransaction = false;
            request.transaction = null;
            setImmediate(function () {
                cb(new errors_1.AbortError());
            });
        });
        transaction.addEventListener("complete", function () {
            connection._runningVersionchangeTransaction = false;
            request.transaction = null;
            // Let other complete event handlers run before continuing
            setImmediate(function () {
                if (connection._closePending) {
                    cb(new errors_1.AbortError());
                }
                else {
                    cb(null);
                }
            });
        });
    };
    waitForOthersClosed();
};
// http://www.w3.org/TR/2015/REC-IndexedDB-20150108/#dfn-steps-for-opening-a-database
var openDatabase = function (databases, name, version, request, cb) {
    var db = databases.get(name);
    if (db === undefined) {
        db = new Database_1.default(name, 0);
        databases.set(name, db);
    }
    if (version === undefined) {
        version = db.version !== 0 ? db.version : 1;
    }
    if (db.version > version) {
        return cb(new errors_1.VersionError());
    }
    var connection = new FDBDatabase_1.default(db);
    if (db.version < version) {
        runVersionchangeTransaction(connection, version, request, function (err) {
            if (err) {
                // DO THIS HERE: ensure that connection is closed by running the steps for closing a database connection before these
                // steps are aborted.
                return cb(err);
            }
            cb(null, connection);
        });
    }
    else {
        cb(null, connection);
    }
};
var FDBFactory = /** @class */ (function () {
    function FDBFactory() {
        this.cmp = cmp_1.default;
        this._databases = new Map();
    }
    // http://www.w3.org/TR/2015/REC-IndexedDB-20150108/#widl-IDBFactory-deleteDatabase-IDBOpenDBRequest-DOMString-name
    FDBFactory.prototype.deleteDatabase = function (name) {
        var _this = this;
        var request = new FDBOpenDBRequest_1.default();
        request.source = null;
        setImmediate(function () {
            var db = _this._databases.get(name);
            var oldVersion = db !== undefined ? db.version : 0;
            deleteDatabase(_this._databases, name, request, function (err) {
                if (err) {
                    request.error = new Error();
                    request.error.name = err.name;
                    request.readyState = "done";
                    var event_5 = new FakeEvent_1.default("error", {
                        bubbles: true,
                        cancelable: true,
                    });
                    event_5.eventPath = [];
                    request.dispatchEvent(event_5);
                    return;
                }
                request.result = undefined;
                request.readyState = "done";
                var event2 = new FDBVersionChangeEvent_1.default("success", {
                    newVersion: null,
                    oldVersion: oldVersion,
                });
                request.dispatchEvent(event2);
            });
        });
        return request;
    };
    // tslint:disable-next-line max-line-length
    // http://www.w3.org/TR/2015/REC-IndexedDB-20150108/#widl-IDBFactory-open-IDBOpenDBRequest-DOMString-name-unsigned-long-long-version
    FDBFactory.prototype.open = function (name, version) {
        var _this = this;
        if (arguments.length > 1 && version !== undefined) {
            // Based on spec, not sure why "MAX_SAFE_INTEGER" instead of "unsigned long long", but it's needed to pass
            // tests
            version = enforceRange_1.default(version, "MAX_SAFE_INTEGER");
        }
        if (version === 0) {
            throw new TypeError();
        }
        var request = new FDBOpenDBRequest_1.default();
        request.source = null;
        setImmediate(function () {
            openDatabase(_this._databases, name, version, request, function (err, connection) {
                if (err) {
                    request.result = undefined;
                    request.readyState = "done";
                    request.error = new Error();
                    request.error.name = err.name;
                    var event_6 = new FakeEvent_1.default("error", {
                        bubbles: true,
                        cancelable: true,
                    });
                    event_6.eventPath = [];
                    request.dispatchEvent(event_6);
                    return;
                }
                request.result = connection;
                request.readyState = "done";
                var event2 = new FakeEvent_1.default("success");
                event2.eventPath = [];
                request.dispatchEvent(event2);
            });
        });
        return request;
    };
    // https://w3c.github.io/IndexedDB/#dom-idbfactory-databases
    FDBFactory.prototype.databases = function () {
        var _this = this;
        return new Promise(function (resolve) {
            var e_3, _a;
            var result = [];
            try {
                for (var _b = __values(_this._databases), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var _d = __read(_c.value, 2), name_1 = _d[0], database = _d[1];
                    result.push({
                        name: name_1,
                        version: database.version,
                    });
                }
            }
            catch (e_3_1) { e_3 = { error: e_3_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_3) throw e_3.error; }
            }
            resolve(result);
        });
    };
    FDBFactory.prototype.toString = function () {
        return "[object IDBFactory]";
    };
    return FDBFactory;
}());
exports.default = FDBFactory;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(23).setImmediate))

/***/ }),
/* 35 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(setImmediate) {
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(exports, "__esModule", { value: true });
var FDBTransaction_1 = __webpack_require__(37);
var errors_1 = __webpack_require__(18);
var fakeDOMStringList_1 = __webpack_require__(28);
var FakeEventTarget_1 = __webpack_require__(31);
var ObjectStore_1 = __webpack_require__(55);
var validateKeyPath_1 = __webpack_require__(41);
var confirmActiveVersionchangeTransaction = function (database) {
    if (!database._runningVersionchangeTransaction) {
        throw new errors_1.InvalidStateError();
    }
    // Find the latest versionchange transaction
    var transactions = database._rawDatabase.transactions.filter(function (tx) {
        return tx.mode === "versionchange";
    });
    var transaction = transactions[transactions.length - 1];
    if (!transaction || transaction._state === "finished") {
        throw new errors_1.InvalidStateError();
    }
    if (transaction._state !== "active") {
        throw new errors_1.TransactionInactiveError();
    }
    return transaction;
};
// http://www.w3.org/TR/2015/REC-IndexedDB-20150108/#database-closing-steps
var closeConnection = function (connection) {
    connection._closePending = true;
    var transactionsComplete = connection._rawDatabase.transactions.every(function (transaction) {
        return transaction._state === "finished";
    });
    if (transactionsComplete) {
        connection._closed = true;
        connection._rawDatabase.connections = connection._rawDatabase.connections.filter(function (otherConnection) {
            return connection !== otherConnection;
        });
    }
    else {
        setImmediate(function () {
            closeConnection(connection);
        });
    }
};
// http://www.w3.org/TR/2015/REC-IndexedDB-20150108/#database-interface
var FDBDatabase = /** @class */ (function (_super) {
    __extends(FDBDatabase, _super);
    function FDBDatabase(rawDatabase) {
        var _this = _super.call(this) || this;
        _this._closePending = false;
        _this._closed = false;
        _this._runningVersionchangeTransaction = false;
        _this._rawDatabase = rawDatabase;
        _this._rawDatabase.connections.push(_this);
        _this.name = rawDatabase.name;
        _this.version = rawDatabase.version;
        _this.objectStoreNames = fakeDOMStringList_1.default(Array.from(rawDatabase.rawObjectStores.keys())).sort();
        return _this;
    }
    // http://w3c.github.io/IndexedDB/#dom-idbdatabase-createobjectstore
    FDBDatabase.prototype.createObjectStore = function (name, options) {
        var _this = this;
        if (options === void 0) { options = {}; }
        if (name === undefined) {
            throw new TypeError();
        }
        var transaction = confirmActiveVersionchangeTransaction(this);
        var keyPath = options !== null && options.keyPath !== undefined
            ? options.keyPath
            : null;
        var autoIncrement = options !== null && options.autoIncrement !== undefined
            ? options.autoIncrement
            : false;
        if (keyPath !== null) {
            validateKeyPath_1.default(keyPath);
        }
        if (this._rawDatabase.rawObjectStores.has(name)) {
            throw new errors_1.ConstraintError();
        }
        if (autoIncrement && (keyPath === "" || Array.isArray(keyPath))) {
            throw new errors_1.InvalidAccessError();
        }
        var objectStoreNames = this.objectStoreNames.slice();
        transaction._rollbackLog.push(function () {
            var objectStore = _this._rawDatabase.rawObjectStores.get(name);
            if (objectStore) {
                objectStore.deleted = true;
            }
            _this.objectStoreNames = fakeDOMStringList_1.default(objectStoreNames);
            transaction._scope.delete(name);
            _this._rawDatabase.rawObjectStores.delete(name);
        });
        var rawObjectStore = new ObjectStore_1.default(this._rawDatabase, name, keyPath, autoIncrement);
        this.objectStoreNames.push(name);
        this.objectStoreNames.sort();
        transaction._scope.add(name);
        this._rawDatabase.rawObjectStores.set(name, rawObjectStore);
        transaction.objectStoreNames = fakeDOMStringList_1.default(this.objectStoreNames.slice());
        return transaction.objectStore(name);
    };
    FDBDatabase.prototype.deleteObjectStore = function (name) {
        var _this = this;
        if (name === undefined) {
            throw new TypeError();
        }
        var transaction = confirmActiveVersionchangeTransaction(this);
        var store = this._rawDatabase.rawObjectStores.get(name);
        if (store === undefined) {
            throw new errors_1.NotFoundError();
        }
        this.objectStoreNames = fakeDOMStringList_1.default(this.objectStoreNames.filter(function (objectStoreName) {
            return objectStoreName !== name;
        }));
        transaction.objectStoreNames = fakeDOMStringList_1.default(this.objectStoreNames.slice());
        transaction._rollbackLog.push(function () {
            store.deleted = false;
            _this._rawDatabase.rawObjectStores.set(name, store);
            _this.objectStoreNames.push(name);
            _this.objectStoreNames.sort();
        });
        store.deleted = true;
        this._rawDatabase.rawObjectStores.delete(name);
        transaction._objectStoresCache.delete(name);
    };
    FDBDatabase.prototype.transaction = function (storeNames, mode) {
        var e_1, _a;
        var _this = this;
        mode = mode !== undefined ? mode : "readonly";
        if (mode !== "readonly" &&
            mode !== "readwrite" &&
            mode !== "versionchange") {
            throw new TypeError("Invalid mode: " + mode);
        }
        var hasActiveVersionchange = this._rawDatabase.transactions.some(function (transaction) {
            return (transaction._state === "active" &&
                transaction.mode === "versionchange" &&
                transaction.db === _this);
        });
        if (hasActiveVersionchange) {
            throw new errors_1.InvalidStateError();
        }
        if (this._closePending) {
            throw new errors_1.InvalidStateError();
        }
        if (!Array.isArray(storeNames)) {
            storeNames = [storeNames];
        }
        if (storeNames.length === 0 && mode !== "versionchange") {
            throw new errors_1.InvalidAccessError();
        }
        try {
            for (var storeNames_1 = __values(storeNames), storeNames_1_1 = storeNames_1.next(); !storeNames_1_1.done; storeNames_1_1 = storeNames_1.next()) {
                var storeName = storeNames_1_1.value;
                if (this.objectStoreNames.indexOf(storeName) < 0) {
                    throw new errors_1.NotFoundError("No objectStore named " + storeName + " in this database");
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (storeNames_1_1 && !storeNames_1_1.done && (_a = storeNames_1.return)) _a.call(storeNames_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        var tx = new FDBTransaction_1.default(storeNames, mode, this);
        this._rawDatabase.transactions.push(tx);
        this._rawDatabase.processTransactions(); // See if can start right away (async)
        return tx;
    };
    FDBDatabase.prototype.close = function () {
        closeConnection(this);
    };
    FDBDatabase.prototype.toString = function () {
        return "[object IDBDatabase]";
    };
    return FDBDatabase;
}(FakeEventTarget_1.default));
exports.default = FDBDatabase;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(23).setImmediate))

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(setImmediate) {
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(exports, "__esModule", { value: true });
var FDBObjectStore_1 = __webpack_require__(29);
var FDBRequest_1 = __webpack_require__(22);
var errors_1 = __webpack_require__(18);
var fakeDOMStringList_1 = __webpack_require__(28);
var FakeEvent_1 = __webpack_require__(33);
var FakeEventTarget_1 = __webpack_require__(31);
// http://www.w3.org/TR/2015/REC-IndexedDB-20150108/#transaction
var FDBTransaction = /** @class */ (function (_super) {
    __extends(FDBTransaction, _super);
    function FDBTransaction(storeNames, mode, db) {
        var _this = _super.call(this) || this;
        _this._state = "active";
        _this._started = false;
        _this._rollbackLog = [];
        _this._objectStoresCache = new Map();
        _this.error = null;
        _this.onabort = null;
        _this.oncomplete = null;
        _this.onerror = null;
        _this._requests = [];
        _this._scope = new Set(storeNames);
        _this.mode = mode;
        _this.db = db;
        _this.objectStoreNames = fakeDOMStringList_1.default(Array.from(_this._scope).sort());
        return _this;
    }
    // http://www.w3.org/TR/2015/REC-IndexedDB-20150108/#dfn-steps-for-aborting-a-transaction
    FDBTransaction.prototype._abort = function (errName) {
        var e_1, _a, e_2, _b;
        var _this = this;
        try {
            for (var _c = __values(this._rollbackLog.reverse()), _d = _c.next(); !_d.done; _d = _c.next()) {
                var f = _d.value;
                f();
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
            }
            finally { if (e_1) throw e_1.error; }
        }
        if (errName !== null) {
            var e = new Error();
            e.name = errName;
            this.error = e;
        }
        try {
            // Should this directly remove from _requests?
            for (var _e = __values(this._requests), _f = _e.next(); !_f.done; _f = _e.next()) {
                var request = _f.value.request;
                if (request.readyState !== "done") {
                    request.readyState = "done"; // This will cancel execution of this request's operation
                    if (request.source) {
                        request.result = undefined;
                        request.error = new errors_1.AbortError();
                        var event_1 = new FakeEvent_1.default("error", {
                            bubbles: true,
                            cancelable: true,
                        });
                        event_1.eventPath = [this.db, this];
                        request.dispatchEvent(event_1);
                    }
                }
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
            }
            finally { if (e_2) throw e_2.error; }
        }
        setImmediate(function () {
            var event = new FakeEvent_1.default("abort", {
                bubbles: true,
                cancelable: false,
            });
            event.eventPath = [_this.db];
            _this.dispatchEvent(event);
        });
        this._state = "finished";
    };
    FDBTransaction.prototype.abort = function () {
        if (this._state === "committing" || this._state === "finished") {
            throw new errors_1.InvalidStateError();
        }
        this._state = "active";
        this._abort(null);
    };
    // http://w3c.github.io/IndexedDB/#dom-idbtransaction-objectstore
    FDBTransaction.prototype.objectStore = function (name) {
        if (this._state !== "active") {
            throw new errors_1.InvalidStateError();
        }
        var objectStore = this._objectStoresCache.get(name);
        if (objectStore !== undefined) {
            return objectStore;
        }
        var rawObjectStore = this.db._rawDatabase.rawObjectStores.get(name);
        if (!this._scope.has(name) || rawObjectStore === undefined) {
            throw new errors_1.NotFoundError();
        }
        var objectStore2 = new FDBObjectStore_1.default(this, rawObjectStore);
        this._objectStoresCache.set(name, objectStore2);
        return objectStore2;
    };
    // http://www.w3.org/TR/2015/REC-IndexedDB-20150108/#dfn-steps-for-asynchronously-executing-a-request
    FDBTransaction.prototype._execRequestAsync = function (obj) {
        var source = obj.source;
        var operation = obj.operation;
        var request = obj.hasOwnProperty("request") ? obj.request : null;
        if (this._state !== "active") {
            throw new errors_1.TransactionInactiveError();
        }
        // Request should only be passed for cursors
        if (!request) {
            if (!source) {
                // Special requests like indexes that just need to run some code
                request = new FDBRequest_1.default();
            }
            else {
                request = new FDBRequest_1.default();
                request.source = source;
                request.transaction = source.transaction;
            }
        }
        this._requests.push({
            operation: operation,
            request: request,
        });
        return request;
    };
    FDBTransaction.prototype._start = function () {
        this._started = true;
        // Remove from request queue - cursor ones will be added back if necessary by cursor.continue and such
        var operation;
        var request;
        while (this._requests.length > 0) {
            var r = this._requests.shift();
            // This should only be false if transaction was aborted
            if (r && r.request.readyState !== "done") {
                request = r.request;
                operation = r.operation;
                break;
            }
        }
        if (request && operation) {
            if (!request.source) {
                // Special requests like indexes that just need to run some code, with error handling already built into
                // operation
                operation();
            }
            else {
                var defaultAction = void 0;
                var event_2;
                try {
                    var result = operation();
                    request.readyState = "done";
                    request.result = result;
                    request.error = undefined;
                    // http://www.w3.org/TR/2015/REC-IndexedDB-20150108/#dfn-fire-a-success-event
                    if (this._state === "inactive") {
                        this._state = "active";
                    }
                    event_2 = new FakeEvent_1.default("success", {
                        bubbles: false,
                        cancelable: false,
                    });
                }
                catch (err) {
                    request.readyState = "done";
                    request.result = undefined;
                    request.error = err;
                    // http://www.w3.org/TR/2015/REC-IndexedDB-20150108/#dfn-fire-an-error-event
                    if (this._state === "inactive") {
                        this._state = "active";
                    }
                    event_2 = new FakeEvent_1.default("error", {
                        bubbles: true,
                        cancelable: true,
                    });
                    defaultAction = this._abort.bind(this, err.name);
                }
                try {
                    event_2.eventPath = [this.db, this];
                    request.dispatchEvent(event_2);
                }
                catch (err) {
                    if (this._state !== "committing") {
                        this._abort("AbortError");
                    }
                    throw err;
                }
                // Default action of event
                if (!event_2.canceled) {
                    if (defaultAction) {
                        defaultAction();
                    }
                }
            }
            // On to the next one
            if (this._requests.length > 0) {
                this._start();
            }
            else {
                // Give it another chance for new handlers to be set before finishing
                setImmediate(this._start.bind(this));
            }
            return;
        }
        // Check if transaction complete event needs to be fired
        if (this._state !== "finished") {
            // Either aborted or committed already
            this._state = "finished";
            if (!this.error) {
                var event_3 = new FakeEvent_1.default("complete");
                this.dispatchEvent(event_3);
            }
        }
    };
    FDBTransaction.prototype.commit = function () {
        if (this._state !== "active") {
            throw new errors_1.InvalidStateError();
        }
        this._state = "committing";
    };
    FDBTransaction.prototype.toString = function () {
        return "[object IDBRequest]";
    };
    return FDBTransaction;
}(FakeEventTarget_1.default));
exports.default = FDBTransaction;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(23).setImmediate))

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var FDBCursor_1 = __webpack_require__(24);
var FDBCursorWithValue_1 = __webpack_require__(30);
var FDBKeyRange_1 = __webpack_require__(21);
var FDBRequest_1 = __webpack_require__(22);
var enforceRange_1 = __webpack_require__(32);
var errors_1 = __webpack_require__(18);
var fakeDOMStringList_1 = __webpack_require__(28);
var valueToKey_1 = __webpack_require__(19);
var valueToKeyRange_1 = __webpack_require__(39);
var confirmActiveTransaction = function (index) {
    if (index._rawIndex.deleted || index.objectStore._rawObjectStore.deleted) {
        throw new errors_1.InvalidStateError();
    }
    if (index.objectStore.transaction._state !== "active") {
        throw new errors_1.TransactionInactiveError();
    }
};
// http://www.w3.org/TR/2015/REC-IndexedDB-20150108/#idl-def-IDBIndex
var FDBIndex = /** @class */ (function () {
    function FDBIndex(objectStore, rawIndex) {
        this._rawIndex = rawIndex;
        this._name = rawIndex.name;
        this.objectStore = objectStore;
        this.keyPath = rawIndex.keyPath;
        this.multiEntry = rawIndex.multiEntry;
        this.unique = rawIndex.unique;
    }
    Object.defineProperty(FDBIndex.prototype, "name", {
        get: function () {
            return this._name;
        },
        // https://w3c.github.io/IndexedDB/#dom-idbindex-name
        set: function (name) {
            var _this = this;
            var transaction = this.objectStore.transaction;
            if (!transaction.db._runningVersionchangeTransaction) {
                throw new errors_1.InvalidStateError();
            }
            if (transaction._state !== "active") {
                throw new errors_1.TransactionInactiveError();
            }
            if (this._rawIndex.deleted ||
                this.objectStore._rawObjectStore.deleted) {
                throw new errors_1.InvalidStateError();
            }
            name = String(name);
            if (name === this._name) {
                return;
            }
            if (this.objectStore.indexNames.indexOf(name) >= 0) {
                throw new errors_1.ConstraintError();
            }
            var oldName = this._name;
            var oldIndexNames = this.objectStore.indexNames.slice();
            this._name = name;
            this._rawIndex.name = name;
            this.objectStore._indexesCache.delete(oldName);
            this.objectStore._indexesCache.set(name, this);
            this.objectStore._rawObjectStore.rawIndexes.delete(oldName);
            this.objectStore._rawObjectStore.rawIndexes.set(name, this._rawIndex);
            this.objectStore.indexNames = fakeDOMStringList_1.default(Array.from(this.objectStore._rawObjectStore.rawIndexes.keys()).filter(function (indexName) {
                var index = _this.objectStore._rawObjectStore.rawIndexes.get(indexName);
                return index && !index.deleted;
            })).sort();
            transaction._rollbackLog.push(function () {
                _this._name = oldName;
                _this._rawIndex.name = oldName;
                _this.objectStore._indexesCache.delete(name);
                _this.objectStore._indexesCache.set(oldName, _this);
                _this.objectStore._rawObjectStore.rawIndexes.delete(name);
                _this.objectStore._rawObjectStore.rawIndexes.set(oldName, _this._rawIndex);
                _this.objectStore.indexNames = fakeDOMStringList_1.default(oldIndexNames);
            });
        },
        enumerable: true,
        configurable: true
    });
    // tslint:disable-next-line max-line-length
    // http://www.w3.org/TR/2015/REC-IndexedDB-20150108/#widl-IDBIndex-openCursor-IDBRequest-any-range-IDBCursorDirection-direction
    FDBIndex.prototype.openCursor = function (range, direction) {
        confirmActiveTransaction(this);
        if (range === null) {
            range = undefined;
        }
        if (range !== undefined && !(range instanceof FDBKeyRange_1.default)) {
            range = FDBKeyRange_1.default.only(valueToKey_1.default(range));
        }
        var request = new FDBRequest_1.default();
        request.source = this;
        request.transaction = this.objectStore.transaction;
        var cursor = new FDBCursorWithValue_1.default(this, range, direction, request);
        return this.objectStore.transaction._execRequestAsync({
            operation: cursor._iterate.bind(cursor),
            request: request,
            source: this,
        });
    };
    // tslint:disable-next-line max-line-length
    // http://www.w3.org/TR/2015/REC-IndexedDB-20150108/#widl-IDBIndex-openKeyCursor-IDBRequest-any-range-IDBCursorDirection-direction
    FDBIndex.prototype.openKeyCursor = function (range, direction) {
        confirmActiveTransaction(this);
        if (range === null) {
            range = undefined;
        }
        if (range !== undefined && !(range instanceof FDBKeyRange_1.default)) {
            range = FDBKeyRange_1.default.only(valueToKey_1.default(range));
        }
        var request = new FDBRequest_1.default();
        request.source = this;
        request.transaction = this.objectStore.transaction;
        var cursor = new FDBCursor_1.default(this, range, direction, request, true);
        return this.objectStore.transaction._execRequestAsync({
            operation: cursor._iterate.bind(cursor),
            request: request,
            source: this,
        });
    };
    FDBIndex.prototype.get = function (key) {
        confirmActiveTransaction(this);
        if (!(key instanceof FDBKeyRange_1.default)) {
            key = valueToKey_1.default(key);
        }
        return this.objectStore.transaction._execRequestAsync({
            operation: this._rawIndex.getValue.bind(this._rawIndex, key),
            source: this,
        });
    };
    // http://w3c.github.io/IndexedDB/#dom-idbindex-getall
    FDBIndex.prototype.getAll = function (query, count) {
        if (arguments.length > 1 && count !== undefined) {
            count = enforceRange_1.default(count, "unsigned long");
        }
        confirmActiveTransaction(this);
        var range = valueToKeyRange_1.default(query);
        return this.objectStore.transaction._execRequestAsync({
            operation: this._rawIndex.getAllValues.bind(this._rawIndex, range, count),
            source: this,
        });
    };
    // http://www.w3.org/TR/2015/REC-IndexedDB-20150108/#widl-IDBIndex-getKey-IDBRequest-any-key
    FDBIndex.prototype.getKey = function (key) {
        confirmActiveTransaction(this);
        if (!(key instanceof FDBKeyRange_1.default)) {
            key = valueToKey_1.default(key);
        }
        return this.objectStore.transaction._execRequestAsync({
            operation: this._rawIndex.getKey.bind(this._rawIndex, key),
            source: this,
        });
    };
    // http://w3c.github.io/IndexedDB/#dom-idbindex-getallkeys
    FDBIndex.prototype.getAllKeys = function (query, count) {
        if (arguments.length > 1 && count !== undefined) {
            count = enforceRange_1.default(count, "unsigned long");
        }
        confirmActiveTransaction(this);
        var range = valueToKeyRange_1.default(query);
        return this.objectStore.transaction._execRequestAsync({
            operation: this._rawIndex.getAllKeys.bind(this._rawIndex, range, count),
            source: this,
        });
    };
    // http://www.w3.org/TR/2015/REC-IndexedDB-20150108/#widl-IDBIndex-count-IDBRequest-any-key
    FDBIndex.prototype.count = function (key) {
        var _this = this;
        confirmActiveTransaction(this);
        if (key === null) {
            key = undefined;
        }
        if (key !== undefined && !(key instanceof FDBKeyRange_1.default)) {
            key = FDBKeyRange_1.default.only(valueToKey_1.default(key));
        }
        return this.objectStore.transaction._execRequestAsync({
            operation: function () {
                var count = 0;
                var cursor = new FDBCursor_1.default(_this, key);
                while (cursor._iterate() !== null) {
                    count += 1;
                }
                return count;
            },
            source: this,
        });
    };
    FDBIndex.prototype.toString = function () {
        return "[object IDBIndex]";
    };
    return FDBIndex;
}());
exports.default = FDBIndex;


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var FDBKeyRange_1 = __webpack_require__(21);
var errors_1 = __webpack_require__(18);
var valueToKey_1 = __webpack_require__(19);
// http://w3c.github.io/IndexedDB/#convert-a-value-to-a-key-range
var valueToKeyRange = function (value, nullDisallowedFlag) {
    if (nullDisallowedFlag === void 0) { nullDisallowedFlag = false; }
    if (value instanceof FDBKeyRange_1.default) {
        return value;
    }
    if (value === null || value === undefined) {
        if (nullDisallowedFlag) {
            throw new errors_1.DataError();
        }
        return new FDBKeyRange_1.default(undefined, undefined, false, false);
    }
    var key = valueToKey_1.default(value);
    return FDBKeyRange_1.default.only(key);
};
exports.default = valueToKeyRange;


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var FDBKeyRange_1 = __webpack_require__(21);
var cmp_1 = __webpack_require__(25);
var RecordStore = /** @class */ (function () {
    function RecordStore() {
        this.records = [];
    }
    RecordStore.prototype.get = function (key) {
        if (key instanceof FDBKeyRange_1.default) {
            return this.records.find(function (record) {
                return key.includes(record.key);
            });
        }
        return this.records.find(function (record) {
            return cmp_1.default(record.key, key) === 0;
        });
    };
    RecordStore.prototype.add = function (newRecord) {
        // Find where to put it so it's sorted by key
        var i;
        if (this.records.length === 0) {
            i = 0;
        }
        else {
            i = this.records.findIndex(function (record) {
                // cmp will only return 0 for an index. For an object store, any matching key has already been deleted,
                // but we still need to look for cmp = 1 to find where to insert.
                return cmp_1.default(record.key, newRecord.key) >= 0;
            });
            if (i === -1) {
                // If no matching key, add to end
                i = this.records.length;
            }
            else {
                // If matching key, advance to appropriate position based on value (used in indexes)
                while (i < this.records.length &&
                    cmp_1.default(this.records[i].key, newRecord.key) === 0) {
                    if (cmp_1.default(this.records[i].value, newRecord.value) !== -1) {
                        // Record value >= newRecord value, so insert here
                        break;
                    }
                    i += 1; // Look at next record
                }
            }
        }
        this.records.splice(i, 0, newRecord);
    };
    RecordStore.prototype.delete = function (key) {
        var range = key instanceof FDBKeyRange_1.default ? key : FDBKeyRange_1.default.only(key);
        var deletedRecords = [];
        this.records = this.records.filter(function (record) {
            var shouldDelete = range.includes(record.key);
            if (shouldDelete) {
                deletedRecords.push(record);
            }
            return !shouldDelete;
        });
        return deletedRecords;
    };
    RecordStore.prototype.deleteByValue = function (key) {
        var range = key instanceof FDBKeyRange_1.default ? key : FDBKeyRange_1.default.only(key);
        var deletedRecords = [];
        this.records = this.records.filter(function (record) {
            var shouldDelete = range.includes(record.value);
            if (shouldDelete) {
                deletedRecords.push(record);
            }
            return !shouldDelete;
        });
        return deletedRecords;
    };
    RecordStore.prototype.clear = function () {
        var deletedRecords = this.records.slice();
        this.records = [];
        return deletedRecords;
    };
    RecordStore.prototype.values = function (range, direction) {
        var _a;
        var _this = this;
        if (direction === void 0) { direction = "next"; }
        return _a = {},
            _a[Symbol.iterator] = function () {
                var i;
                if (direction === "next") {
                    i = 0;
                    if (range !== undefined && range.lower !== undefined) {
                        while (_this.records[i] !== undefined) {
                            var cmpResult = cmp_1.default(_this.records[i].key, range.lower);
                            if (cmpResult === 1 ||
                                (cmpResult === 0 && !range.lowerOpen)) {
                                break;
                            }
                            i += 1;
                        }
                    }
                }
                else {
                    i = _this.records.length - 1;
                    if (range !== undefined && range.upper !== undefined) {
                        while (_this.records[i] !== undefined) {
                            var cmpResult = cmp_1.default(_this.records[i].key, range.upper);
                            if (cmpResult === -1 ||
                                (cmpResult === 0 && !range.upperOpen)) {
                                break;
                            }
                            i -= 1;
                        }
                    }
                }
                return {
                    next: function () {
                        var done;
                        var value;
                        if (direction === "next") {
                            value = _this.records[i];
                            done = i >= _this.records.length;
                            i += 1;
                            if (!done &&
                                range !== undefined &&
                                range.upper !== undefined) {
                                var cmpResult = cmp_1.default(value.key, range.upper);
                                done =
                                    cmpResult === 1 ||
                                        (cmpResult === 0 && range.upperOpen);
                                if (done) {
                                    value = undefined;
                                }
                            }
                        }
                        else {
                            value = _this.records[i];
                            done = i < 0;
                            i -= 1;
                            if (!done &&
                                range !== undefined &&
                                range.lower !== undefined) {
                                var cmpResult = cmp_1.default(value.key, range.lower);
                                done =
                                    cmpResult === -1 ||
                                        (cmpResult === 0 && range.lowerOpen);
                                if (done) {
                                    value = undefined;
                                }
                            }
                        }
                        // The weird "as IteratorResult<Record>" is needed because of
                        // https://github.com/Microsoft/TypeScript/issues/11375 and
                        // https://github.com/Microsoft/TypeScript/issues/2983
                        // tslint:disable-next-line no-object-literal-type-assertion
                        return {
                            done: done,
                            value: value,
                        };
                    },
                };
            },
            _a;
    };
    return RecordStore;
}());
exports.default = RecordStore;


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(exports, "__esModule", { value: true });
// http://www.w3.org/TR/2015/REC-IndexedDB-20150108/#dfn-valid-key-path
var validateKeyPath = function (keyPath, parent) {
    var e_1, _a, e_2, _b;
    // This doesn't make sense to me based on the spec, but it is needed to pass the W3C KeyPath tests (see same
    // comment in extractKey)
    if (keyPath !== undefined &&
        keyPath !== null &&
        typeof keyPath !== "string" &&
        keyPath.toString &&
        (parent === "array" || !Array.isArray(keyPath))) {
        keyPath = keyPath.toString();
    }
    if (typeof keyPath === "string") {
        if (keyPath === "" && parent !== "string") {
            return;
        }
        try {
            // https://mathiasbynens.be/demo/javascript-identifier-regex for ECMAScript 5.1 / Unicode v7.0.0, with
            // reserved words at beginning removed
            // tslint:disable-next-line max-line-length
            var validIdentifierRegex = /^(?:[\$A-Z_a-z\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0-\u08B2\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58\u0C59\u0C60\u0C61\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D60\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F4\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19C1-\u19C7\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FCC\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA78E\uA790-\uA7AD\uA7B0\uA7B1\uA7F7-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB5F\uAB64\uAB65\uABC0-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC])(?:[\$0-9A-Z_a-z\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0300-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u0483-\u0487\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u05D0-\u05EA\u05F0-\u05F2\u0610-\u061A\u0620-\u0669\u066E-\u06D3\u06D5-\u06DC\u06DF-\u06E8\u06EA-\u06FC\u06FF\u0710-\u074A\u074D-\u07B1\u07C0-\u07F5\u07FA\u0800-\u082D\u0840-\u085B\u08A0-\u08B2\u08E4-\u0963\u0966-\u096F\u0971-\u0983\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BC-\u09C4\u09C7\u09C8\u09CB-\u09CE\u09D7\u09DC\u09DD\u09DF-\u09E3\u09E6-\u09F1\u0A01-\u0A03\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A59-\u0A5C\u0A5E\u0A66-\u0A75\u0A81-\u0A83\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABC-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AD0\u0AE0-\u0AE3\u0AE6-\u0AEF\u0B01-\u0B03\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3C-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B5C\u0B5D\u0B5F-\u0B63\u0B66-\u0B6F\u0B71\u0B82\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD0\u0BD7\u0BE6-\u0BEF\u0C00-\u0C03\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C58\u0C59\u0C60-\u0C63\u0C66-\u0C6F\u0C81-\u0C83\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBC-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CDE\u0CE0-\u0CE3\u0CE6-\u0CEF\u0CF1\u0CF2\u0D01-\u0D03\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D-\u0D44\u0D46-\u0D48\u0D4A-\u0D4E\u0D57\u0D60-\u0D63\u0D66-\u0D6F\u0D7A-\u0D7F\u0D82\u0D83\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DE6-\u0DEF\u0DF2\u0DF3\u0E01-\u0E3A\u0E40-\u0E4E\u0E50-\u0E59\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB9\u0EBB-\u0EBD\u0EC0-\u0EC4\u0EC6\u0EC8-\u0ECD\u0ED0-\u0ED9\u0EDC-\u0EDF\u0F00\u0F18\u0F19\u0F20-\u0F29\u0F35\u0F37\u0F39\u0F3E-\u0F47\u0F49-\u0F6C\u0F71-\u0F84\u0F86-\u0F97\u0F99-\u0FBC\u0FC6\u1000-\u1049\u1050-\u109D\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u135D-\u135F\u1380-\u138F\u13A0-\u13F4\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1714\u1720-\u1734\u1740-\u1753\u1760-\u176C\u176E-\u1770\u1772\u1773\u1780-\u17D3\u17D7\u17DC\u17DD\u17E0-\u17E9\u180B-\u180D\u1810-\u1819\u1820-\u1877\u1880-\u18AA\u18B0-\u18F5\u1900-\u191E\u1920-\u192B\u1930-\u193B\u1946-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u19D0-\u19D9\u1A00-\u1A1B\u1A20-\u1A5E\u1A60-\u1A7C\u1A7F-\u1A89\u1A90-\u1A99\u1AA7\u1AB0-\u1ABD\u1B00-\u1B4B\u1B50-\u1B59\u1B6B-\u1B73\u1B80-\u1BF3\u1C00-\u1C37\u1C40-\u1C49\u1C4D-\u1C7D\u1CD0-\u1CD2\u1CD4-\u1CF6\u1CF8\u1CF9\u1D00-\u1DF5\u1DFC-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u200C\u200D\u203F\u2040\u2054\u2071\u207F\u2090-\u209C\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D7F-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2DE0-\u2DFF\u2E2F\u3005-\u3007\u3021-\u302F\u3031-\u3035\u3038-\u303C\u3041-\u3096\u3099\u309A\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FCC\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA62B\uA640-\uA66F\uA674-\uA67D\uA67F-\uA69D\uA69F-\uA6F1\uA717-\uA71F\uA722-\uA788\uA78B-\uA78E\uA790-\uA7AD\uA7B0\uA7B1\uA7F7-\uA827\uA840-\uA873\uA880-\uA8C4\uA8D0-\uA8D9\uA8E0-\uA8F7\uA8FB\uA900-\uA92D\uA930-\uA953\uA960-\uA97C\uA980-\uA9C0\uA9CF-\uA9D9\uA9E0-\uA9FE\uAA00-\uAA36\uAA40-\uAA4D\uAA50-\uAA59\uAA60-\uAA76\uAA7A-\uAAC2\uAADB-\uAADD\uAAE0-\uAAEF\uAAF2-\uAAF6\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB5F\uAB64\uAB65\uABC0-\uABEA\uABEC\uABED\uABF0-\uABF9\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE00-\uFE0F\uFE20-\uFE2D\uFE33\uFE34\uFE4D-\uFE4F\uFE70-\uFE74\uFE76-\uFEFC\uFF10-\uFF19\uFF21-\uFF3A\uFF3F\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC])*$/;
            if (keyPath.length >= 1 && validIdentifierRegex.test(keyPath)) {
                return;
            }
        }
        catch (err) {
            throw new SyntaxError(err.message);
        }
        if (keyPath.indexOf(" ") >= 0) {
            throw new SyntaxError("The keypath argument contains an invalid key path (no spaces allowed).");
        }
    }
    if (Array.isArray(keyPath) && keyPath.length > 0) {
        if (parent) {
            // No nested arrays
            throw new SyntaxError("The keypath argument contains an invalid key path (nested arrays).");
        }
        try {
            for (var keyPath_1 = __values(keyPath), keyPath_1_1 = keyPath_1.next(); !keyPath_1_1.done; keyPath_1_1 = keyPath_1.next()) {
                var part = keyPath_1_1.value;
                validateKeyPath(part, "array");
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (keyPath_1_1 && !keyPath_1_1.done && (_a = keyPath_1.return)) _a.call(keyPath_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return;
    }
    else if (typeof keyPath === "string" && keyPath.indexOf(".") >= 0) {
        keyPath = keyPath.split(".");
        try {
            for (var keyPath_2 = __values(keyPath), keyPath_2_1 = keyPath_2.next(); !keyPath_2_1.done; keyPath_2_1 = keyPath_2.next()) {
                var part = keyPath_2_1.value;
                validateKeyPath(part, "string");
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (keyPath_2_1 && !keyPath_2_1.done && (_b = keyPath_2.return)) _b.call(keyPath_2);
            }
            finally { if (e_2) throw e_2.error; }
        }
        return;
    }
    throw new SyntaxError();
};
exports.default = validateKeyPath;


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var FDBRequest_1 = __webpack_require__(22);
var FDBOpenDBRequest = /** @class */ (function (_super) {
    __extends(FDBOpenDBRequest, _super);
    function FDBOpenDBRequest() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onupgradeneeded = null;
        _this.onblocked = null;
        return _this;
    }
    FDBOpenDBRequest.prototype.toString = function () {
        return "[object IDBOpenDBRequest]";
    };
    return FDBOpenDBRequest;
}(FDBRequest_1.default));
exports.default = FDBOpenDBRequest;


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var FakeEvent_1 = __webpack_require__(33);
var FDBVersionChangeEvent = /** @class */ (function (_super) {
    __extends(FDBVersionChangeEvent, _super);
    function FDBVersionChangeEvent(type, parameters) {
        if (parameters === void 0) { parameters = {}; }
        var _this = _super.call(this, type) || this;
        _this.newVersion =
            parameters.newVersion !== undefined ? parameters.newVersion : null;
        _this.oldVersion =
            parameters.oldVersion !== undefined ? parameters.oldVersion : 0;
        return _this;
    }
    FDBVersionChangeEvent.prototype.toString = function () {
        return "[object IDBVersionChangeEvent]";
    };
    return FDBVersionChangeEvent;
}(FakeEvent_1.default));
exports.default = FDBVersionChangeEvent;


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var fakeIndexedDB = __webpack_require__(45).default;
var FDBCursor = __webpack_require__(24).default;
var FDBCursorWithValue = __webpack_require__(30).default;
var FDBDatabase = __webpack_require__(36).default;
var FDBFactory = __webpack_require__(34).default;
var FDBIndex = __webpack_require__(38).default;
var FDBKeyRange = __webpack_require__(21).default;
var FDBObjectStore = __webpack_require__(29).default;
var FDBOpenDBRequest = __webpack_require__(42).default;
var FDBRequest = __webpack_require__(22).default;
var FDBTransaction = __webpack_require__(37).default;
var FDBVersionChangeEvent = __webpack_require__(43).default;

// http://stackoverflow.com/a/33268326/786644 - works in browser, worker, and Node.js
var globalVar =
    typeof window !== "undefined"
        ? window
        : typeof WorkerGlobalScope !== "undefined"
        ? self
        : typeof global !== "undefined"
        ? global
        : Function("return this;")();

globalVar.indexedDB = fakeIndexedDB;
globalVar.IDBCursor = FDBCursor;
globalVar.IDBCursorWithValue = FDBCursorWithValue;
globalVar.IDBDatabase = FDBDatabase;
globalVar.IDBFactory = FDBFactory;
globalVar.IDBIndex = FDBIndex;
globalVar.IDBKeyRange = FDBKeyRange;
globalVar.IDBObjectStore = FDBObjectStore;
globalVar.IDBOpenDBRequest = FDBOpenDBRequest;
globalVar.IDBRequest = FDBRequest;
globalVar.IDBTransaction = FDBTransaction;
globalVar.IDBVersionChangeEvent = FDBVersionChangeEvent;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(20)))

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var FDBFactory_1 = __webpack_require__(34);
var fakeIndexedDB = new FDBFactory_1.default();
exports.default = fakeIndexedDB;


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, process) {(function (global, undefined) {
    "use strict";

    if (global.setImmediate) {
        return;
    }

    var nextHandle = 1; // Spec says greater than zero
    var tasksByHandle = {};
    var currentlyRunningATask = false;
    var doc = global.document;
    var registerImmediate;

    function setImmediate(callback) {
      // Callback can either be a function or a string
      if (typeof callback !== "function") {
        callback = new Function("" + callback);
      }
      // Copy function arguments
      var args = new Array(arguments.length - 1);
      for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i + 1];
      }
      // Store and register the task
      var task = { callback: callback, args: args };
      tasksByHandle[nextHandle] = task;
      registerImmediate(nextHandle);
      return nextHandle++;
    }

    function clearImmediate(handle) {
        delete tasksByHandle[handle];
    }

    function run(task) {
        var callback = task.callback;
        var args = task.args;
        switch (args.length) {
        case 0:
            callback();
            break;
        case 1:
            callback(args[0]);
            break;
        case 2:
            callback(args[0], args[1]);
            break;
        case 3:
            callback(args[0], args[1], args[2]);
            break;
        default:
            callback.apply(undefined, args);
            break;
        }
    }

    function runIfPresent(handle) {
        // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
        // So if we're currently running a task, we'll need to delay this invocation.
        if (currentlyRunningATask) {
            // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
            // "too much recursion" error.
            setTimeout(runIfPresent, 0, handle);
        } else {
            var task = tasksByHandle[handle];
            if (task) {
                currentlyRunningATask = true;
                try {
                    run(task);
                } finally {
                    clearImmediate(handle);
                    currentlyRunningATask = false;
                }
            }
        }
    }

    function installNextTickImplementation() {
        registerImmediate = function(handle) {
            process.nextTick(function () { runIfPresent(handle); });
        };
    }

    function canUsePostMessage() {
        // The test against `importScripts` prevents this implementation from being installed inside a web worker,
        // where `global.postMessage` means something completely different and can't be used for this purpose.
        if (global.postMessage && !global.importScripts) {
            var postMessageIsAsynchronous = true;
            var oldOnMessage = global.onmessage;
            global.onmessage = function() {
                postMessageIsAsynchronous = false;
            };
            global.postMessage("", "*");
            global.onmessage = oldOnMessage;
            return postMessageIsAsynchronous;
        }
    }

    function installPostMessageImplementation() {
        // Installs an event handler on `global` for the `message` event: see
        // * https://developer.mozilla.org/en/DOM/window.postMessage
        // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages

        var messagePrefix = "setImmediate$" + Math.random() + "$";
        var onGlobalMessage = function(event) {
            if (event.source === global &&
                typeof event.data === "string" &&
                event.data.indexOf(messagePrefix) === 0) {
                runIfPresent(+event.data.slice(messagePrefix.length));
            }
        };

        if (global.addEventListener) {
            global.addEventListener("message", onGlobalMessage, false);
        } else {
            global.attachEvent("onmessage", onGlobalMessage);
        }

        registerImmediate = function(handle) {
            global.postMessage(messagePrefix + handle, "*");
        };
    }

    function installMessageChannelImplementation() {
        var channel = new MessageChannel();
        channel.port1.onmessage = function(event) {
            var handle = event.data;
            runIfPresent(handle);
        };

        registerImmediate = function(handle) {
            channel.port2.postMessage(handle);
        };
    }

    function installReadyStateChangeImplementation() {
        var html = doc.documentElement;
        registerImmediate = function(handle) {
            // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
            // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
            var script = doc.createElement("script");
            script.onreadystatechange = function () {
                runIfPresent(handle);
                script.onreadystatechange = null;
                html.removeChild(script);
                script = null;
            };
            html.appendChild(script);
        };
    }

    function installSetTimeoutImplementation() {
        registerImmediate = function(handle) {
            setTimeout(runIfPresent, 0, handle);
        };
    }

    // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.
    var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
    attachTo = attachTo && attachTo.setTimeout ? attachTo : global;

    // Don't get fooled by e.g. browserify environments.
    if ({}.toString.call(global.process) === "[object process]") {
        // For Node.js before 0.9
        installNextTickImplementation();

    } else if (canUsePostMessage()) {
        // For non-IE10 modern browsers
        installPostMessageImplementation();

    } else if (global.MessageChannel) {
        // For web workers, where supported
        installMessageChannelImplementation();

    } else if (doc && "onreadystatechange" in doc.createElement("script")) {
        // For IE 6–8
        installReadyStateChangeImplementation();

    } else {
        // For older browsers
        installSetTimeoutImplementation();
    }

    attachTo.setImmediate = setImmediate;
    attachTo.clearImmediate = clearImmediate;
}(typeof self === "undefined" ? typeof global === "undefined" ? this : global : self));

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(20), __webpack_require__(35)))

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, process) {(function (global, undefined) {
    "use strict";

    if (global.setImmediate) {
        return;
    }

    var nextHandle = 1; // Spec says greater than zero
    var tasksByHandle = {};
    var currentlyRunningATask = false;
    var doc = global.document;
    var registerImmediate;

    function setImmediate(callback) {
      // Callback can either be a function or a string
      if (typeof callback !== "function") {
        callback = new Function("" + callback);
      }
      // Copy function arguments
      var args = new Array(arguments.length - 1);
      for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i + 1];
      }
      // Store and register the task
      var task = { callback: callback, args: args };
      tasksByHandle[nextHandle] = task;
      registerImmediate(nextHandle);
      return nextHandle++;
    }

    function clearImmediate(handle) {
        delete tasksByHandle[handle];
    }

    function run(task) {
        var callback = task.callback;
        var args = task.args;
        switch (args.length) {
        case 0:
            callback();
            break;
        case 1:
            callback(args[0]);
            break;
        case 2:
            callback(args[0], args[1]);
            break;
        case 3:
            callback(args[0], args[1], args[2]);
            break;
        default:
            callback.apply(undefined, args);
            break;
        }
    }

    function runIfPresent(handle) {
        // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
        // So if we're currently running a task, we'll need to delay this invocation.
        if (currentlyRunningATask) {
            // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
            // "too much recursion" error.
            setTimeout(runIfPresent, 0, handle);
        } else {
            var task = tasksByHandle[handle];
            if (task) {
                currentlyRunningATask = true;
                try {
                    run(task);
                } finally {
                    clearImmediate(handle);
                    currentlyRunningATask = false;
                }
            }
        }
    }

    function installNextTickImplementation() {
        registerImmediate = function(handle) {
            process.nextTick(function () { runIfPresent(handle); });
        };
    }

    function canUsePostMessage() {
        // The test against `importScripts` prevents this implementation from being installed inside a web worker,
        // where `global.postMessage` means something completely different and can't be used for this purpose.
        if (global.postMessage && !global.importScripts) {
            var postMessageIsAsynchronous = true;
            var oldOnMessage = global.onmessage;
            global.onmessage = function() {
                postMessageIsAsynchronous = false;
            };
            global.postMessage("", "*");
            global.onmessage = oldOnMessage;
            return postMessageIsAsynchronous;
        }
    }

    function installPostMessageImplementation() {
        // Installs an event handler on `global` for the `message` event: see
        // * https://developer.mozilla.org/en/DOM/window.postMessage
        // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages

        var messagePrefix = "setImmediate$" + Math.random() + "$";
        var onGlobalMessage = function(event) {
            if (event.source === global &&
                typeof event.data === "string" &&
                event.data.indexOf(messagePrefix) === 0) {
                runIfPresent(+event.data.slice(messagePrefix.length));
            }
        };

        if (global.addEventListener) {
            global.addEventListener("message", onGlobalMessage, false);
        } else {
            global.attachEvent("onmessage", onGlobalMessage);
        }

        registerImmediate = function(handle) {
            global.postMessage(messagePrefix + handle, "*");
        };
    }

    function installMessageChannelImplementation() {
        var channel = new MessageChannel();
        channel.port1.onmessage = function(event) {
            var handle = event.data;
            runIfPresent(handle);
        };

        registerImmediate = function(handle) {
            channel.port2.postMessage(handle);
        };
    }

    function installReadyStateChangeImplementation() {
        var html = doc.documentElement;
        registerImmediate = function(handle) {
            // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
            // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
            var script = doc.createElement("script");
            script.onreadystatechange = function () {
                runIfPresent(handle);
                script.onreadystatechange = null;
                html.removeChild(script);
                script = null;
            };
            html.appendChild(script);
        };
    }

    function installSetTimeoutImplementation() {
        registerImmediate = function(handle) {
            setTimeout(runIfPresent, 0, handle);
        };
    }

    // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.
    var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
    attachTo = attachTo && attachTo.setTimeout ? attachTo : global;

    // Don't get fooled by e.g. browserify environments.
    if ({}.toString.call(global.process) === "[object process]") {
        // For Node.js before 0.9
        installNextTickImplementation();

    } else if (canUsePostMessage()) {
        // For non-IE10 modern browsers
        installPostMessageImplementation();

    } else if (global.MessageChannel) {
        // For web workers, where supported
        installMessageChannelImplementation();

    } else if (doc && "onreadystatechange" in doc.createElement("script")) {
        // For IE 6–8
        installReadyStateChangeImplementation();

    } else {
        // For older browsers
        installSetTimeoutImplementation();
    }

    attachTo.setImmediate = setImmediate;
    attachTo.clearImmediate = clearImmediate;
}(typeof self === "undefined" ? typeof global === "undefined" ? this : global : self));

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(20), __webpack_require__(35)))

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, Buffer) {var require;var require;(function(f){if(true){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.realisticStructuredClone = f()}})(function(){var define,module,exports;return (function(){function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return require(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}return e})()({1:[function(_dereq_,module,exports){
'use strict';

_dereq_('core-js/fn/array/includes');
_dereq_('core-js/fn/object/values');
var DOMException = _dereq_('domexception');
var Typeson = _dereq_('typeson');
var structuredCloningThrowing = _dereq_('typeson-registry/dist/presets/structured-cloning-throwing');

// http://stackoverflow.com/a/33268326/786644 - works in browser, worker, and Node.js
var globalVar = typeof window !== 'undefined' ? window : typeof WorkerGlobalScope !== 'undefined' ? self : typeof global !== 'undefined' ? global : Function('return this;')();

if (!globalVar.DOMException) {
    globalVar.DOMException = DOMException;
}

var TSON = new Typeson().register(structuredCloningThrowing);

function realisticStructuredClone(obj) {
    return TSON.revive(TSON.encapsulate(obj));
}

module.exports = realisticStructuredClone;

},{"core-js/fn/array/includes":2,"core-js/fn/object/values":3,"domexception":44,"typeson":47,"typeson-registry/dist/presets/structured-cloning-throwing":46}],2:[function(_dereq_,module,exports){
'use strict';

_dereq_('../../modules/es7.array.includes');
module.exports = _dereq_('../../modules/_core').Array.includes;

},{"../../modules/_core":9,"../../modules/es7.array.includes":39}],3:[function(_dereq_,module,exports){
'use strict';

_dereq_('../../modules/es7.object.values');
module.exports = _dereq_('../../modules/_core').Object.values;

},{"../../modules/_core":9,"../../modules/es7.object.values":40}],4:[function(_dereq_,module,exports){
'use strict';

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};

},{}],5:[function(_dereq_,module,exports){
'use strict';

// 22.1.3.31 Array.prototype[@@unscopables]
var UNSCOPABLES = _dereq_('./_wks')('unscopables');
var ArrayProto = Array.prototype;
if (ArrayProto[UNSCOPABLES] == undefined) _dereq_('./_hide')(ArrayProto, UNSCOPABLES, {});
module.exports = function (key) {
  ArrayProto[UNSCOPABLES][key] = true;
};

},{"./_hide":19,"./_wks":38}],6:[function(_dereq_,module,exports){
'use strict';

var isObject = _dereq_('./_is-object');
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};

},{"./_is-object":22}],7:[function(_dereq_,module,exports){
'use strict';

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = _dereq_('./_to-iobject');
var toLength = _dereq_('./_to-length');
var toAbsoluteIndex = _dereq_('./_to-absolute-index');
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
      // Array#indexOf ignores holes, Array#includes - not
    } else for (; length > index; index++) {
      if (IS_INCLUDES || index in O) {
        if (O[index] === el) return IS_INCLUDES || index || 0;
      }
    }return !IS_INCLUDES && -1;
  };
};

},{"./_to-absolute-index":32,"./_to-iobject":34,"./_to-length":35}],8:[function(_dereq_,module,exports){
"use strict";

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};

},{}],9:[function(_dereq_,module,exports){
'use strict';

var core = module.exports = { version: '2.5.3' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef

},{}],10:[function(_dereq_,module,exports){
'use strict';

// optional / simple context binding
var aFunction = _dereq_('./_a-function');
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1:
      return function (a) {
        return fn.call(that, a);
      };
    case 2:
      return function (a, b) {
        return fn.call(that, a, b);
      };
    case 3:
      return function (a, b, c) {
        return fn.call(that, a, b, c);
      };
  }
  return function () /* ...args */{
    return fn.apply(that, arguments);
  };
};

},{"./_a-function":4}],11:[function(_dereq_,module,exports){
"use strict";

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};

},{}],12:[function(_dereq_,module,exports){
'use strict';

// Thank's IE8 for his funny defineProperty
module.exports = !_dereq_('./_fails')(function () {
  return Object.defineProperty({}, 'a', { get: function get() {
      return 7;
    } }).a != 7;
});

},{"./_fails":16}],13:[function(_dereq_,module,exports){
'use strict';

var isObject = _dereq_('./_is-object');
var document = _dereq_('./_global').document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};

},{"./_global":17,"./_is-object":22}],14:[function(_dereq_,module,exports){
'use strict';

// IE 8- don't enum bug keys
module.exports = 'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'.split(',');

},{}],15:[function(_dereq_,module,exports){
'use strict';

var global = _dereq_('./_global');
var core = _dereq_('./_core');
var hide = _dereq_('./_hide');
var redefine = _dereq_('./_redefine');
var ctx = _dereq_('./_ctx');
var PROTOTYPE = 'prototype';

var $export = function $export(type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] || (global[name] = {}) : (global[name] || {})[PROTOTYPE];
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE] || (exports[PROTOTYPE] = {});
  var key, own, out, exp;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    // export native or passed
    out = (own ? target : source)[key];
    // bind timers to global for call from export context
    exp = IS_BIND && own ? ctx(out, global) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // extend global
    if (target) redefine(target, key, out, type & $export.U);
    // export
    if (exports[key] != out) hide(exports, key, exp);
    if (IS_PROTO && expProto[key] != out) expProto[key] = out;
  }
};
global.core = core;
// type bitmap
$export.F = 1; // forced
$export.G = 2; // global
$export.S = 4; // static
$export.P = 8; // proto
$export.B = 16; // bind
$export.W = 32; // wrap
$export.U = 64; // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;

},{"./_core":9,"./_ctx":10,"./_global":17,"./_hide":19,"./_redefine":29}],16:[function(_dereq_,module,exports){
"use strict";

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};

},{}],17:[function(_dereq_,module,exports){
'use strict';

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math ? window : typeof self != 'undefined' && self.Math == Math ? self
// eslint-disable-next-line no-new-func
: Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef

},{}],18:[function(_dereq_,module,exports){
"use strict";

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};

},{}],19:[function(_dereq_,module,exports){
'use strict';

var dP = _dereq_('./_object-dp');
var createDesc = _dereq_('./_property-desc');
module.exports = _dereq_('./_descriptors') ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};

},{"./_descriptors":12,"./_object-dp":23,"./_property-desc":28}],20:[function(_dereq_,module,exports){
'use strict';

module.exports = !_dereq_('./_descriptors') && !_dereq_('./_fails')(function () {
  return Object.defineProperty(_dereq_('./_dom-create')('div'), 'a', { get: function get() {
      return 7;
    } }).a != 7;
});

},{"./_descriptors":12,"./_dom-create":13,"./_fails":16}],21:[function(_dereq_,module,exports){
'use strict';

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = _dereq_('./_cof');
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};

},{"./_cof":8}],22:[function(_dereq_,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

module.exports = function (it) {
  return (typeof it === 'undefined' ? 'undefined' : _typeof(it)) === 'object' ? it !== null : typeof it === 'function';
};

},{}],23:[function(_dereq_,module,exports){
'use strict';

var anObject = _dereq_('./_an-object');
var IE8_DOM_DEFINE = _dereq_('./_ie8-dom-define');
var toPrimitive = _dereq_('./_to-primitive');
var dP = Object.defineProperty;

exports.f = _dereq_('./_descriptors') ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) {/* empty */}
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};

},{"./_an-object":6,"./_descriptors":12,"./_ie8-dom-define":20,"./_to-primitive":36}],24:[function(_dereq_,module,exports){
'use strict';

var has = _dereq_('./_has');
var toIObject = _dereq_('./_to-iobject');
var arrayIndexOf = _dereq_('./_array-includes')(false);
var IE_PROTO = _dereq_('./_shared-key')('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) {
    if (key != IE_PROTO) has(O, key) && result.push(key);
  } // Don't enum bug & hidden keys
  while (names.length > i) {
    if (has(O, key = names[i++])) {
      ~arrayIndexOf(result, key) || result.push(key);
    }
  }return result;
};

},{"./_array-includes":7,"./_has":18,"./_shared-key":30,"./_to-iobject":34}],25:[function(_dereq_,module,exports){
'use strict';

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = _dereq_('./_object-keys-internal');
var enumBugKeys = _dereq_('./_enum-bug-keys');

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};

},{"./_enum-bug-keys":14,"./_object-keys-internal":24}],26:[function(_dereq_,module,exports){
"use strict";

exports.f = {}.propertyIsEnumerable;

},{}],27:[function(_dereq_,module,exports){
'use strict';

var getKeys = _dereq_('./_object-keys');
var toIObject = _dereq_('./_to-iobject');
var isEnum = _dereq_('./_object-pie').f;
module.exports = function (isEntries) {
  return function (it) {
    var O = toIObject(it);
    var keys = getKeys(O);
    var length = keys.length;
    var i = 0;
    var result = [];
    var key;
    while (length > i) {
      if (isEnum.call(O, key = keys[i++])) {
        result.push(isEntries ? [key, O[key]] : O[key]);
      }
    }return result;
  };
};

},{"./_object-keys":25,"./_object-pie":26,"./_to-iobject":34}],28:[function(_dereq_,module,exports){
"use strict";

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};

},{}],29:[function(_dereq_,module,exports){
'use strict';

var global = _dereq_('./_global');
var hide = _dereq_('./_hide');
var has = _dereq_('./_has');
var SRC = _dereq_('./_uid')('src');
var TO_STRING = 'toString';
var $toString = Function[TO_STRING];
var TPL = ('' + $toString).split(TO_STRING);

_dereq_('./_core').inspectSource = function (it) {
  return $toString.call(it);
};

(module.exports = function (O, key, val, safe) {
  var isFunction = typeof val == 'function';
  if (isFunction) has(val, 'name') || hide(val, 'name', key);
  if (O[key] === val) return;
  if (isFunction) has(val, SRC) || hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
  if (O === global) {
    O[key] = val;
  } else if (!safe) {
    delete O[key];
    hide(O, key, val);
  } else if (O[key]) {
    O[key] = val;
  } else {
    hide(O, key, val);
  }
  // add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, TO_STRING, function toString() {
  return typeof this == 'function' && this[SRC] || $toString.call(this);
});

},{"./_core":9,"./_global":17,"./_has":18,"./_hide":19,"./_uid":37}],30:[function(_dereq_,module,exports){
'use strict';

var shared = _dereq_('./_shared')('keys');
var uid = _dereq_('./_uid');
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};

},{"./_shared":31,"./_uid":37}],31:[function(_dereq_,module,exports){
'use strict';

var global = _dereq_('./_global');
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});
module.exports = function (key) {
  return store[key] || (store[key] = {});
};

},{"./_global":17}],32:[function(_dereq_,module,exports){
'use strict';

var toInteger = _dereq_('./_to-integer');
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};

},{"./_to-integer":33}],33:[function(_dereq_,module,exports){
"use strict";

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};

},{}],34:[function(_dereq_,module,exports){
'use strict';

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = _dereq_('./_iobject');
var defined = _dereq_('./_defined');
module.exports = function (it) {
  return IObject(defined(it));
};

},{"./_defined":11,"./_iobject":21}],35:[function(_dereq_,module,exports){
'use strict';

// 7.1.15 ToLength
var toInteger = _dereq_('./_to-integer');
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};

},{"./_to-integer":33}],36:[function(_dereq_,module,exports){
'use strict';

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = _dereq_('./_is-object');
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};

},{"./_is-object":22}],37:[function(_dereq_,module,exports){
'use strict';

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};

},{}],38:[function(_dereq_,module,exports){
'use strict';

var store = _dereq_('./_shared')('wks');
var uid = _dereq_('./_uid');
var _Symbol = _dereq_('./_global').Symbol;
var USE_SYMBOL = typeof _Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] = USE_SYMBOL && _Symbol[name] || (USE_SYMBOL ? _Symbol : uid)('Symbol.' + name));
};

$exports.store = store;

},{"./_global":17,"./_shared":31,"./_uid":37}],39:[function(_dereq_,module,exports){
'use strict';
// https://github.com/tc39/Array.prototype.includes

var $export = _dereq_('./_export');
var $includes = _dereq_('./_array-includes')(true);

$export($export.P, 'Array', {
  includes: function includes(el /* , fromIndex = 0 */) {
    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
  }
});

_dereq_('./_add-to-unscopables')('includes');

},{"./_add-to-unscopables":5,"./_array-includes":7,"./_export":15}],40:[function(_dereq_,module,exports){
'use strict';

// https://github.com/tc39/proposal-object-values-entries
var $export = _dereq_('./_export');
var $values = _dereq_('./_object-to-array')(false);

$export($export.S, 'Object', {
  values: function values(it) {
    return $values(it);
  }
});

},{"./_export":15,"./_object-to-array":27}],41:[function(_dereq_,module,exports){
"use strict";

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var legacyErrorCodes = _dereq_("./legacy-error-codes.json");
var idlUtils = _dereq_("./utils.js");

exports.implementation = function () {
  function DOMExceptionImpl(_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        message = _ref2[0],
        name = _ref2[1];

    _classCallCheck(this, DOMExceptionImpl);

    this.name = name;
    this.message = message;
  }

  _createClass(DOMExceptionImpl, [{
    key: "code",
    get: function get() {
      return legacyErrorCodes[this.name] || 0;
    }
  }]);

  return DOMExceptionImpl;
}();

// A proprietary V8 extension that causes the stack property to appear.
exports.init = function (impl) {
  if (Error.captureStackTrace) {
    var wrapper = idlUtils.wrapperForImpl(impl);
    Error.captureStackTrace(wrapper, wrapper.constructor);
  }
};

},{"./legacy-error-codes.json":43,"./utils.js":45}],42:[function(_dereq_,module,exports){
"use strict";

var conversions = _dereq_("webidl-conversions");
var utils = _dereq_("./utils.js");

var impl = utils.implSymbol;

function DOMException() {
  var args = [];
  for (var i = 0; i < arguments.length && i < 2; ++i) {
    args[i] = arguments[i];
  }

  if (args[0] !== undefined) {
    args[0] = conversions["DOMString"](args[0], { context: "Failed to construct 'DOMException': parameter 1" });
  } else {
    args[0] = "";
  }

  if (args[1] !== undefined) {
    args[1] = conversions["DOMString"](args[1], { context: "Failed to construct 'DOMException': parameter 2" });
  } else {
    args[1] = "Error";
  }

  iface.setup(this, args);
}

Object.defineProperty(DOMException, "prototype", {
  value: DOMException.prototype,
  writable: false,
  enumerable: false,
  configurable: false
});

Object.defineProperty(DOMException.prototype, "name", {
  get: function get() {
    return this[impl]["name"];
  },


  enumerable: true,
  configurable: true
});

Object.defineProperty(DOMException.prototype, "message", {
  get: function get() {
    return this[impl]["message"];
  },


  enumerable: true,
  configurable: true
});

Object.defineProperty(DOMException.prototype, "code", {
  get: function get() {
    return this[impl]["code"];
  },


  enumerable: true,
  configurable: true
});

Object.defineProperty(DOMException, "INDEX_SIZE_ERR", {
  value: 1,
  enumerable: true
});
Object.defineProperty(DOMException.prototype, "INDEX_SIZE_ERR", {
  value: 1,
  enumerable: true
});

Object.defineProperty(DOMException, "DOMSTRING_SIZE_ERR", {
  value: 2,
  enumerable: true
});
Object.defineProperty(DOMException.prototype, "DOMSTRING_SIZE_ERR", {
  value: 2,
  enumerable: true
});

Object.defineProperty(DOMException, "HIERARCHY_REQUEST_ERR", {
  value: 3,
  enumerable: true
});
Object.defineProperty(DOMException.prototype, "HIERARCHY_REQUEST_ERR", {
  value: 3,
  enumerable: true
});

Object.defineProperty(DOMException, "WRONG_DOCUMENT_ERR", {
  value: 4,
  enumerable: true
});
Object.defineProperty(DOMException.prototype, "WRONG_DOCUMENT_ERR", {
  value: 4,
  enumerable: true
});

Object.defineProperty(DOMException, "INVALID_CHARACTER_ERR", {
  value: 5,
  enumerable: true
});
Object.defineProperty(DOMException.prototype, "INVALID_CHARACTER_ERR", {
  value: 5,
  enumerable: true
});

Object.defineProperty(DOMException, "NO_DATA_ALLOWED_ERR", {
  value: 6,
  enumerable: true
});
Object.defineProperty(DOMException.prototype, "NO_DATA_ALLOWED_ERR", {
  value: 6,
  enumerable: true
});

Object.defineProperty(DOMException, "NO_MODIFICATION_ALLOWED_ERR", {
  value: 7,
  enumerable: true
});
Object.defineProperty(DOMException.prototype, "NO_MODIFICATION_ALLOWED_ERR", {
  value: 7,
  enumerable: true
});

Object.defineProperty(DOMException, "NOT_FOUND_ERR", {
  value: 8,
  enumerable: true
});
Object.defineProperty(DOMException.prototype, "NOT_FOUND_ERR", {
  value: 8,
  enumerable: true
});

Object.defineProperty(DOMException, "NOT_SUPPORTED_ERR", {
  value: 9,
  enumerable: true
});
Object.defineProperty(DOMException.prototype, "NOT_SUPPORTED_ERR", {
  value: 9,
  enumerable: true
});

Object.defineProperty(DOMException, "INUSE_ATTRIBUTE_ERR", {
  value: 10,
  enumerable: true
});
Object.defineProperty(DOMException.prototype, "INUSE_ATTRIBUTE_ERR", {
  value: 10,
  enumerable: true
});

Object.defineProperty(DOMException, "INVALID_STATE_ERR", {
  value: 11,
  enumerable: true
});
Object.defineProperty(DOMException.prototype, "INVALID_STATE_ERR", {
  value: 11,
  enumerable: true
});

Object.defineProperty(DOMException, "SYNTAX_ERR", {
  value: 12,
  enumerable: true
});
Object.defineProperty(DOMException.prototype, "SYNTAX_ERR", {
  value: 12,
  enumerable: true
});

Object.defineProperty(DOMException, "INVALID_MODIFICATION_ERR", {
  value: 13,
  enumerable: true
});
Object.defineProperty(DOMException.prototype, "INVALID_MODIFICATION_ERR", {
  value: 13,
  enumerable: true
});

Object.defineProperty(DOMException, "NAMESPACE_ERR", {
  value: 14,
  enumerable: true
});
Object.defineProperty(DOMException.prototype, "NAMESPACE_ERR", {
  value: 14,
  enumerable: true
});

Object.defineProperty(DOMException, "INVALID_ACCESS_ERR", {
  value: 15,
  enumerable: true
});
Object.defineProperty(DOMException.prototype, "INVALID_ACCESS_ERR", {
  value: 15,
  enumerable: true
});

Object.defineProperty(DOMException, "VALIDATION_ERR", {
  value: 16,
  enumerable: true
});
Object.defineProperty(DOMException.prototype, "VALIDATION_ERR", {
  value: 16,
  enumerable: true
});

Object.defineProperty(DOMException, "TYPE_MISMATCH_ERR", {
  value: 17,
  enumerable: true
});
Object.defineProperty(DOMException.prototype, "TYPE_MISMATCH_ERR", {
  value: 17,
  enumerable: true
});

Object.defineProperty(DOMException, "SECURITY_ERR", {
  value: 18,
  enumerable: true
});
Object.defineProperty(DOMException.prototype, "SECURITY_ERR", {
  value: 18,
  enumerable: true
});

Object.defineProperty(DOMException, "NETWORK_ERR", {
  value: 19,
  enumerable: true
});
Object.defineProperty(DOMException.prototype, "NETWORK_ERR", {
  value: 19,
  enumerable: true
});

Object.defineProperty(DOMException, "ABORT_ERR", {
  value: 20,
  enumerable: true
});
Object.defineProperty(DOMException.prototype, "ABORT_ERR", {
  value: 20,
  enumerable: true
});

Object.defineProperty(DOMException, "URL_MISMATCH_ERR", {
  value: 21,
  enumerable: true
});
Object.defineProperty(DOMException.prototype, "URL_MISMATCH_ERR", {
  value: 21,
  enumerable: true
});

Object.defineProperty(DOMException, "QUOTA_EXCEEDED_ERR", {
  value: 22,
  enumerable: true
});
Object.defineProperty(DOMException.prototype, "QUOTA_EXCEEDED_ERR", {
  value: 22,
  enumerable: true
});

Object.defineProperty(DOMException, "TIMEOUT_ERR", {
  value: 23,
  enumerable: true
});
Object.defineProperty(DOMException.prototype, "TIMEOUT_ERR", {
  value: 23,
  enumerable: true
});

Object.defineProperty(DOMException, "INVALID_NODE_TYPE_ERR", {
  value: 24,
  enumerable: true
});
Object.defineProperty(DOMException.prototype, "INVALID_NODE_TYPE_ERR", {
  value: 24,
  enumerable: true
});

Object.defineProperty(DOMException, "DATA_CLONE_ERR", {
  value: 25,
  enumerable: true
});
Object.defineProperty(DOMException.prototype, "DATA_CLONE_ERR", {
  value: 25,
  enumerable: true
});

Object.defineProperty(DOMException.prototype, Symbol.toStringTag, {
  value: "DOMException",
  writable: false,
  enumerable: false,
  configurable: true
});

var iface = {
  mixedInto: [],
  is: function is(obj) {
    if (obj) {
      if (obj[impl] instanceof Impl.implementation) {
        return true;
      }
      for (var i = 0; i < module.exports.mixedInto.length; ++i) {
        if (obj instanceof module.exports.mixedInto[i]) {
          return true;
        }
      }
    }
    return false;
  },
  isImpl: function isImpl(obj) {
    if (obj) {
      if (obj instanceof Impl.implementation) {
        return true;
      }

      var wrapper = utils.wrapperForImpl(obj);
      for (var i = 0; i < module.exports.mixedInto.length; ++i) {
        if (wrapper instanceof module.exports.mixedInto[i]) {
          return true;
        }
      }
    }
    return false;
  },
  convert: function convert(obj) {
    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref$context = _ref.context,
        context = _ref$context === undefined ? "The provided value" : _ref$context;

    if (module.exports.is(obj)) {
      return utils.implForWrapper(obj);
    }
    throw new TypeError(context + " is not of type 'DOMException'.");
  },
  create: function create(constructorArgs, privateData) {
    var obj = Object.create(DOMException.prototype);
    this.setup(obj, constructorArgs, privateData);
    return obj;
  },
  createImpl: function createImpl(constructorArgs, privateData) {
    var obj = Object.create(DOMException.prototype);
    this.setup(obj, constructorArgs, privateData);
    return utils.implForWrapper(obj);
  },
  _internalSetup: function _internalSetup(obj) {},
  setup: function setup(obj, constructorArgs, privateData) {
    if (!privateData) privateData = {};

    privateData.wrapper = obj;

    this._internalSetup(obj);
    Object.defineProperty(obj, impl, {
      value: new Impl.implementation(constructorArgs, privateData),
      writable: false,
      enumerable: false,
      configurable: true
    });
    obj[impl][utils.wrapperSymbol] = obj;
    if (Impl.init) {
      Impl.init(obj[impl], privateData);
    }
  },

  interface: DOMException,
  expose: {
    Window: { DOMException: DOMException },
    Worker: { DOMException: DOMException }
  }
}; // iface
module.exports = iface;

var Impl = _dereq_(".//DOMException-impl.js");

},{".//DOMException-impl.js":41,"./utils.js":45,"webidl-conversions":48}],43:[function(_dereq_,module,exports){
module.exports={
  "IndexSizeError": 1,
  "DOMStringSizeError": 2,
  "HierarchyRequestError": 3,
  "WrongDocumentError": 4,
  "InvalidCharacterError": 5,
  "NoDataAllowedError": 6,
  "NoModificationAllowedError": 7,
  "NotFoundError": 8,
  "NotSupportedError": 9,
  "InUseAttributeError": 10,
  "InvalidStateError": 11,
  "SyntaxError": 12,
  "InvalidModificationError": 13,
  "NamespaceError": 14,
  "InvalidAccessError": 15,
  "ValidationError": 16,
  "TypeMismatchError": 17,
  "SecurityError": 18,
  "NetworkError": 19,
  "AbortError": 20,
  "URLMismatchError": 21,
  "QuotaExceededError": 22,
  "TimeoutError": 23,
  "InvalidNodeTypeError": 24,
  "DataCloneError": 25
}

},{}],44:[function(_dereq_,module,exports){
"use strict";

module.exports = _dereq_("./DOMException").interface;

Object.setPrototypeOf(module.exports.prototype, Error.prototype);

},{"./DOMException":42}],45:[function(_dereq_,module,exports){
"use strict";

// Returns "Type(value) is Object" in ES terminology.

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function isObject(value) {
  return (typeof value === "undefined" ? "undefined" : _typeof(value)) === "object" && value !== null || typeof value === "function";
}

function getReferenceToBytes(bufferSource) {
  // Node.js' Buffer does not allow subclassing for now, so we can get away with a prototype object check for perf.
  if (Object.getPrototypeOf(bufferSource) === Buffer.prototype) {
    return bufferSource;
  }
  if (bufferSource instanceof ArrayBuffer) {
    return Buffer.from(bufferSource);
  }
  return Buffer.from(bufferSource.buffer, bufferSource.byteOffset, bufferSource.byteLength);
}

function getCopyToBytes(bufferSource) {
  return Buffer.from(getReferenceToBytes(bufferSource));
}

function mixin(target, source) {
  var keys = Object.getOwnPropertyNames(source);
  for (var i = 0; i < keys.length; ++i) {
    if (keys[i] in target) {
      continue;
    }

    Object.defineProperty(target, keys[i], Object.getOwnPropertyDescriptor(source, keys[i]));
  }
}

var wrapperSymbol = Symbol("wrapper");
var implSymbol = Symbol("impl");
var sameObjectCaches = Symbol("SameObject caches");

function getSameObject(wrapper, prop, creator) {
  if (!wrapper[sameObjectCaches]) {
    wrapper[sameObjectCaches] = Object.create(null);
  }

  if (prop in wrapper[sameObjectCaches]) {
    return wrapper[sameObjectCaches][prop];
  }

  wrapper[sameObjectCaches][prop] = creator();
  return wrapper[sameObjectCaches][prop];
}

function wrapperForImpl(impl) {
  return impl ? impl[wrapperSymbol] : null;
}

function implForWrapper(wrapper) {
  return wrapper ? wrapper[implSymbol] : null;
}

function tryWrapperForImpl(impl) {
  var wrapper = wrapperForImpl(impl);
  return wrapper ? wrapper : impl;
}

function tryImplForWrapper(wrapper) {
  var impl = implForWrapper(wrapper);
  return impl ? impl : wrapper;
}

var iterInternalSymbol = Symbol("internal");
var IteratorPrototype = Object.getPrototypeOf(Object.getPrototypeOf([][Symbol.iterator]()));

module.exports = exports = {
  isObject: isObject,
  getReferenceToBytes: getReferenceToBytes,
  getCopyToBytes: getCopyToBytes,
  mixin: mixin,
  wrapperSymbol: wrapperSymbol,
  implSymbol: implSymbol,
  getSameObject: getSameObject,
  wrapperForImpl: wrapperForImpl,
  implForWrapper: implForWrapper,
  tryWrapperForImpl: tryWrapperForImpl,
  tryImplForWrapper: tryImplForWrapper,
  iterInternalSymbol: iterInternalSymbol,
  IteratorPrototype: IteratorPrototype
};

},{}],46:[function(_dereq_,module,exports){
"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

!function (e, t) {
  "object" == (typeof exports === "undefined" ? "undefined" : _typeof(exports)) && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : (e.Typeson = e.Typeson || {}, e.Typeson.presets = e.Typeson.presets || {}, e.Typeson.presets.structuredCloningThrowing = t());
}(undefined, function () {
  "use strict";
  var e = "function" == typeof Symbol && "symbol" == _typeof(Symbol.iterator) ? function (e) {
    return typeof e === "undefined" ? "undefined" : _typeof(e);
  } : function (e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e === "undefined" ? "undefined" : _typeof(e);
  },
      t = function () {
    return function (e, t) {
      if (Array.isArray(e)) return e;if (Symbol.iterator in Object(e)) return function sliceIterator(e, t) {
        var n = [],
            r = !0,
            i = !1,
            o = void 0;try {
          for (var s, a = e[Symbol.iterator](); !(r = (s = a.next()).done) && (n.push(s.value), !t || n.length !== t); r = !0) {}
        } catch (e) {
          i = !0, o = e;
        } finally {
          try {
            !r && a.return && a.return();
          } finally {
            if (i) throw o;
          }
        }return n;
      }(e, t);throw new TypeError("Invalid attempt to destructure non-iterable instance");
    };
  }(),
      n = function n(e) {
    if (Array.isArray(e)) {
      for (var t = 0, n = Array(e.length); t < e.length; t++) {
        n[t] = e[t];
      }return n;
    }return Array.from(e);
  },
      r = Object.keys,
      i = Array.isArray,
      o = {}.toString,
      s = Object.getPrototypeOf,
      a = {}.hasOwnProperty,
      c = a.toString,
      u = ["type", "replaced", "iterateIn", "iterateUnsetNumeric"];function isThenable(e, t) {
    return Typeson.isObject(e) && "function" == typeof e.then && (!t || "function" == typeof e.catch);
  }function toStringTag(e) {
    return o.call(e).slice(8, -1);
  }function hasConstructorOf(t, n) {
    if (!t || "object" !== (void 0 === t ? "undefined" : e(t))) return !1;var r = s(t);if (!r) return !1;var i = a.call(r, "constructor") && r.constructor;return "function" != typeof i ? null === n : "function" == typeof i && null !== n && c.call(i) === c.call(n);
  }function isPlainObject(e) {
    return !(!e || "Object" !== toStringTag(e)) && (!s(e) || hasConstructorOf(e, Object));
  }function isObject(t) {
    return t && "object" === (void 0 === t ? "undefined" : e(t));
  }function Typeson(o) {
    var s = [],
        a = [],
        c = {},
        f = this.types = {},
        p = this.stringify = function (e, t, n, r) {
      r = Object.assign({}, o, r, { stringification: !0 });var s = y(e, null, r);return i(s) ? JSON.stringify(s[0], t, n) : s.then(function (e) {
        return JSON.stringify(e, t, n);
      });
    };this.stringifySync = function (e, t, n, r) {
      return p(e, t, n, Object.assign({}, { throwOnBadSyncType: !0 }, r, { sync: !0 }));
    }, this.stringifyAsync = function (e, t, n, r) {
      return p(e, t, n, Object.assign({}, { throwOnBadSyncType: !0 }, r, { sync: !1 }));
    };var l = this.parse = function (e, t, n) {
      return n = Object.assign({}, o, n, { parse: !0 }), v(JSON.parse(e, t), n);
    };this.parseSync = function (e, t, n) {
      return l(e, t, Object.assign({}, { throwOnBadSyncType: !0 }, n, { sync: !0 }));
    }, this.parseAsync = function (e, t, n) {
      return l(e, t, Object.assign({}, { throwOnBadSyncType: !0 }, n, { sync: !1 }));
    }, this.specialTypeNames = function (e, t) {
      var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};return n.returnTypeNames = !0, this.encapsulate(e, t, n);
    }, this.rootTypeName = function (e, t) {
      var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};return n.iterateNone = !0, this.encapsulate(e, t, n);
    };var y = this.encapsulate = function (f, p, l) {
      var y = (l = Object.assign({ sync: !0 }, o, l)).sync,
          v = {},
          d = [],
          h = [],
          b = [],
          g = !(l && "cyclic" in l) || l.cyclic,
          m = l.encapsulateObserver,
          T = _encapsulate("", f, g, p || {}, b);function finish(e) {
        var t = Object.values(v);if (l.iterateNone) return t.length ? t[0] : Typeson.getJSONType(e);if (t.length) {
          if (l.returnTypeNames) return [].concat(n(new Set(t)));e && isPlainObject(e) && !e.hasOwnProperty("$types") ? e.$types = v : e = { $: e, $types: { $: v } };
        } else isObject(e) && e.hasOwnProperty("$types") && (e = { $: e, $types: !0 });return !l.returnTypeNames && e;
      }return b.length ? y && l.throwOnBadSyncType ? function () {
        throw new TypeError("Sync method requested but async result obtained");
      }() : Promise.resolve(function checkPromises(e, n) {
        return Promise.all(n.map(function (e) {
          return e[1].p;
        })).then(function (r) {
          return Promise.all(r.map(function (r) {
            var i = [],
                o = n.splice(0, 1)[0],
                s = t(o, 7),
                a = s[0],
                c = s[2],
                u = s[3],
                f = s[4],
                p = s[5],
                l = s[6],
                y = _encapsulate(a, r, c, u, i, !0, l),
                v = hasConstructorOf(y, TypesonPromise);return a && v ? y.p.then(function (t) {
              return f[p] = t, checkPromises(e, i);
            }) : (a ? f[p] = y : e = v ? y.p : y, checkPromises(e, i));
          }));
        }).then(function () {
          return e;
        });
      }(T, b)).then(finish) : !y && l.throwOnBadSyncType ? function () {
        throw new TypeError("Async method requested but sync result obtained");
      }() : l.stringification && y ? [finish(T)] : y ? finish(T) : Promise.resolve(finish(T));function _adaptBuiltinStateObjectProperties(e, t, n) {
        Object.assign(e, t);var r = u.map(function (t) {
          var n = e[t];return delete e[t], n;
        });n(), u.forEach(function (t, n) {
          e[t] = r[n];
        });
      }function _encapsulate(t, n, o, a, c, u, f) {
        var p = void 0,
            y = {},
            b = void 0 === n ? "undefined" : e(n),
            g = m ? function (e) {
          var r = f || a.type || Typeson.getJSONType(n);m(Object.assign(e || y, { keypath: t, value: n, cyclic: o, stateObj: a, promisesData: c, resolvingTypesonPromise: u, awaitingTypesonPromise: hasConstructorOf(n, TypesonPromise) }, void 0 !== r ? { type: r } : {}));
        } : null;if (b in { string: 1, boolean: 1, number: 1, undefined: 1 }) return void 0 === n || "number" === b && (isNaN(n) || n === -1 / 0 || n === 1 / 0) ? (p = replace(t, n, a, c, !1, u, g)) !== n && (y = { replaced: p }) : p = n, g && g(), p;if (null === n) return g && g(), n;if (o && !a.iterateIn && !a.iterateUnsetNumeric) {
          var T = d.indexOf(n);if (!(T < 0)) return v[t] = "#", g && g({ cyclicKeypath: h[T] }), "#" + h[T];!0 === o && (d.push(n), h.push(t));
        }var O = isPlainObject(n),
            w = i(n),
            S = (O || w) && (!s.length || a.replaced) || a.iterateIn ? n : replace(t, n, a, c, O || w, null, g),
            P = void 0;if (S !== n ? (p = S, y = { replaced: S }) : w || "array" === a.iterateIn ? (P = new Array(n.length), y = { clone: P }) : O || "object" === a.iterateIn ? y = { clone: P = {} } : "" === t && hasConstructorOf(n, TypesonPromise) ? (c.push([t, n, o, a, void 0, void 0, a.type]), p = n) : p = n, g && g(), l.iterateNone) return P || p;if (!P) return p;if (a.iterateIn) {
          var j = function _loop(e) {
            var r = { ownKeys: n.hasOwnProperty(e) };_adaptBuiltinStateObjectProperties(a, r, function () {
              var r = t + (t ? "." : "") + escapeKeyPathComponent(e),
                  i = _encapsulate(r, n[e], !!o, a, c, u);hasConstructorOf(i, TypesonPromise) ? c.push([r, i, !!o, a, P, e, a.type]) : void 0 !== i && (P[e] = i);
            });
          };for (var A in n) {
            j(A);
          }g && g({ endIterateIn: !0, end: !0 });
        } else r(n).forEach(function (e) {
          var r = t + (t ? "." : "") + escapeKeyPathComponent(e);_adaptBuiltinStateObjectProperties(a, { ownKeys: !0 }, function () {
            var t = _encapsulate(r, n[e], !!o, a, c, u);hasConstructorOf(t, TypesonPromise) ? c.push([r, t, !!o, a, P, e, a.type]) : void 0 !== t && (P[e] = t);
          });
        }), g && g({ endIterateOwn: !0, end: !0 });if (a.iterateUnsetNumeric) {
          for (var C = n.length, N = function _loop2(e) {
            if (!(e in n)) {
              var r = t + (t ? "." : "") + e;_adaptBuiltinStateObjectProperties(a, { ownKeys: !1 }, function () {
                var t = _encapsulate(r, void 0, !!o, a, c, u);hasConstructorOf(t, TypesonPromise) ? c.push([r, t, !!o, a, P, e, a.type]) : void 0 !== t && (P[e] = t);
              });
            }
          }, B = 0; B < C; B++) {
            N(B);
          }g && g({ endIterateUnsetNumeric: !0, end: !0 });
        }return P;
      }function replace(e, t, n, r, i, o, u) {
        for (var f = i ? s : a, p = f.length; p--;) {
          var l = f[p];if (l.test(t, n)) {
            var d = l.type;if (c[d]) {
              var h = v[e];v[e] = h ? [d].concat(h) : d;
            }return Object.assign(n, { type: d, replaced: !0 }), !y && l.replaceAsync || l.replace ? (u && u({ replacing: !0 }), _encapsulate(e, l[y || !l.replaceAsync ? "replace" : "replaceAsync"](t, n), g && "readonly", n, r, o, d)) : (u && u({ typeDetected: !0 }), _encapsulate(e, t, g && "readonly", n, r, o, d));
          }
        }return t;
      }
    };this.encapsulateSync = function (e, t, n) {
      return y(e, t, Object.assign({}, { throwOnBadSyncType: !0 }, n, { sync: !0 }));
    }, this.encapsulateAsync = function (e, t, n) {
      return y(e, t, Object.assign({}, { throwOnBadSyncType: !0 }, n, { sync: !1 }));
    };var v = this.revive = function (e, n) {
      var s = (n = Object.assign({ sync: !0 }, o, n)).sync,
          a = e && e.$types,
          u = !0;if (!a) return e;if (!0 === a) return e.$;a.$ && isPlainObject(a.$) && (e = e.$, a = a.$, u = !1);var f = [],
          p = {},
          l = function _revive(e, n, o, s, l, y) {
        if (u && "$types" === e) return;var v = a[e];if (i(n) || isPlainObject(n)) {
          var d = i(n) ? new Array(n.length) : {};for (r(n).forEach(function (t) {
            var r = _revive(e + (e ? "." : "") + escapeKeyPathComponent(t), n[t], o || d, s, d, t);hasConstructorOf(r, Undefined) ? d[t] = void 0 : void 0 !== r && (d[t] = r);
          }), n = d; f.length;) {
            var h = t(f[0], 4),
                b = h[0],
                g = h[1],
                m = h[2],
                T = h[3],
                O = getByKeyPath(b, g);if (hasConstructorOf(O, Undefined)) m[T] = void 0;else {
              if (void 0 === O) break;m[T] = O;
            }f.splice(0, 1);
          }
        }if (!v) return n;if ("#" === v) {
          var w = getByKeyPath(o, n.substr(1));return void 0 === w && f.push([o, n.substr(1), l, y]), w;
        }var S = s.sync;return [].concat(v).reduce(function (e, t) {
          var n = c[t];if (!n) throw new Error("Unregistered type: " + t);return n[S && n.revive ? "revive" : !S && n.reviveAsync ? "reviveAsync" : "revive"](e, p);
        }, n);
      }("", e, null, n);return isThenable(l = hasConstructorOf(l, Undefined) ? void 0 : l) ? s && n.throwOnBadSyncType ? function () {
        throw new TypeError("Sync method requested but async result obtained");
      }() : l : !s && n.throwOnBadSyncType ? function () {
        throw new TypeError("Async method requested but sync result obtained");
      }() : s ? l : Promise.resolve(l);
    };this.reviveSync = function (e, t) {
      return v(e, Object.assign({}, { throwOnBadSyncType: !0 }, t, { sync: !0 }));
    }, this.reviveAsync = function (e, t) {
      return v(e, Object.assign({}, { throwOnBadSyncType: !0 }, t, { sync: !1 }));
    }, this.register = function (e, t) {
      return t = t || {}, [].concat(e).forEach(function R(e) {
        if (i(e)) return e.map(R);e && r(e).forEach(function (n) {
          if ("#" === n) throw new TypeError("# cannot be used as a type name as it is reserved for cyclic objects");if (Typeson.JSON_TYPES.includes(n)) throw new TypeError("Plain JSON object types are reserved as type names");var r = e[n],
              o = r.testPlainObjects ? s : a,
              u = o.filter(function (e) {
            return e.type === n;
          });if (u.length && (o.splice(o.indexOf(u[0]), 1), delete c[n], delete f[n]), r) {
            if ("function" == typeof r) {
              var p = r;r = { test: function test(e) {
                  return e && e.constructor === p;
                }, replace: function replace(e) {
                  return assign({}, e);
                }, revive: function revive(e) {
                  return assign(Object.create(p.prototype), e);
                } };
            } else i(r) && (r = { test: r[0], replace: r[1], revive: r[2] });var l = { type: n, test: r.test.bind(r) };r.replace && (l.replace = r.replace.bind(r)), r.replaceAsync && (l.replaceAsync = r.replaceAsync.bind(r));var y = "number" == typeof t.fallback ? t.fallback : t.fallback ? 0 : 1 / 0;if (r.testPlainObjects ? s.splice(y, 0, l) : a.splice(y, 0, l), r.revive || r.reviveAsync) {
              var v = {};r.revive && (v.revive = r.revive.bind(r)), r.reviveAsync && (v.reviveAsync = r.reviveAsync.bind(r)), c[n] = v;
            }f[n] = r;
          }
        });
      }), this;
    };
  }function assign(e, t) {
    return r(t).map(function (n) {
      e[n] = t[n];
    }), e;
  }function escapeKeyPathComponent(e) {
    return e.replace(/~/g, "~0").replace(/\./g, "~1");
  }function unescapeKeyPathComponent(e) {
    return e.replace(/~1/g, ".").replace(/~0/g, "~");
  }function getByKeyPath(e, t) {
    if ("" === t) return e;var n = t.indexOf(".");if (n > -1) {
      var r = e[unescapeKeyPathComponent(t.substr(0, n))];return void 0 === r ? void 0 : getByKeyPath(r, t.substr(n + 1));
    }return e[unescapeKeyPathComponent(t)];
  }function Undefined() {}function TypesonPromise(e) {
    this.p = new Promise(e);
  }TypesonPromise.prototype.then = function (e, t) {
    var n = this;return new TypesonPromise(function (r, i) {
      n.p.then(function (t) {
        r(e ? e(t) : t);
      }, function (e) {
        n.p.catch(function (e) {
          return t ? t(e) : Promise.reject(e);
        }).then(r, i);
      });
    });
  }, TypesonPromise.prototype.catch = function (e) {
    return this.then(null, e);
  }, TypesonPromise.resolve = function (e) {
    return new TypesonPromise(function (t) {
      t(e);
    });
  }, TypesonPromise.reject = function (e) {
    return new TypesonPromise(function (t, n) {
      n(e);
    });
  }, ["all", "race"].map(function (e) {
    TypesonPromise[e] = function (t) {
      return new TypesonPromise(function (n, r) {
        Promise[e](t.map(function (e) {
          return e.p;
        })).then(n, r);
      });
    };
  }), Typeson.Undefined = Undefined, Typeson.Promise = TypesonPromise, Typeson.isThenable = isThenable, Typeson.toStringTag = toStringTag, Typeson.hasConstructorOf = hasConstructorOf, Typeson.isObject = isObject, Typeson.isPlainObject = isPlainObject, Typeson.isUserObject = function isUserObject(e) {
    if (!e || "Object" !== toStringTag(e)) return !1;var t = s(e);return !t || hasConstructorOf(e, Object) || isUserObject(t);
  }, Typeson.escapeKeyPathComponent = escapeKeyPathComponent, Typeson.unescapeKeyPathComponent = unescapeKeyPathComponent, Typeson.getByKeyPath = getByKeyPath, Typeson.getJSONType = function (t) {
    return null === t ? "null" : i(t) ? "array" : void 0 === t ? "undefined" : e(t);
  }, Typeson.JSON_TYPES = ["null", "boolean", "number", "string", "array", "object"];for (var f = { userObject: { test: function test(e, t) {
        return Typeson.isUserObject(e);
      }, replace: function replace(e) {
        return Object.assign({}, e);
      }, revive: function revive(e) {
        return e;
      } } }, p = [[{ sparseArrays: { testPlainObjects: !0, test: function test(e) {
        return Array.isArray(e);
      }, replace: function replace(e, t) {
        return t.iterateUnsetNumeric = !0, e;
      } } }, { sparseUndefined: { test: function test(e, t) {
        return void 0 === e && !1 === t.ownKeys;
      }, replace: function replace(e) {
        return null;
      }, revive: function revive(e) {} } }], { undef: { test: function test(e, t) {
        return void 0 === e && (t.ownKeys || !("ownKeys" in t));
      }, replace: function replace(e) {
        return null;
      }, revive: function revive(e) {
        return new Typeson.Undefined();
      } } }], l = { StringObject: { test: function test(t) {
        return "String" === Typeson.toStringTag(t) && "object" === (void 0 === t ? "undefined" : e(t));
      }, replace: function replace(e) {
        return String(e);
      }, revive: function revive(e) {
        return new String(e);
      } }, BooleanObject: { test: function test(t) {
        return "Boolean" === Typeson.toStringTag(t) && "object" === (void 0 === t ? "undefined" : e(t));
      }, replace: function replace(e) {
        return Boolean(e);
      }, revive: function revive(e) {
        return new Boolean(e);
      } }, NumberObject: { test: function test(t) {
        return "Number" === Typeson.toStringTag(t) && "object" === (void 0 === t ? "undefined" : e(t));
      }, replace: function replace(e) {
        return Number(e);
      }, revive: function revive(e) {
        return new Number(e);
      } } }, y = [{ nan: { test: function test(e) {
        return "number" == typeof e && isNaN(e);
      }, replace: function replace(e) {
        return "NaN";
      }, revive: function revive(e) {
        return NaN;
      } } }, { infinity: { test: function test(e) {
        return e === 1 / 0;
      }, replace: function replace(e) {
        return "Infinity";
      }, revive: function revive(e) {
        return 1 / 0;
      } } }, { negativeInfinity: { test: function test(e) {
        return e === -1 / 0;
      }, replace: function replace(e) {
        return "-Infinity";
      }, revive: function revive(e) {
        return -1 / 0;
      } } }], v = { date: { test: function test(e) {
        return "Date" === Typeson.toStringTag(e);
      }, replace: function replace(e) {
        var t = e.getTime();return isNaN(t) ? "NaN" : t;
      }, revive: function revive(e) {
        return "NaN" === e ? new Date(NaN) : new Date(e);
      } } }, d = { regexp: { test: function test(e) {
        return "RegExp" === Typeson.toStringTag(e);
      }, replace: function replace(e) {
        return { source: e.source, flags: (e.global ? "g" : "") + (e.ignoreCase ? "i" : "") + (e.multiline ? "m" : "") + (e.sticky ? "y" : "") + (e.unicode ? "u" : "") };
      }, revive: function revive(e) {
        var t = e.source,
            n = e.flags;return new RegExp(t, n);
      } } }, h = { map: { test: function test(e) {
        return "Map" === Typeson.toStringTag(e);
      }, replace: function replace(e) {
        return Array.from(e.entries());
      }, revive: function revive(e) {
        return new Map(e);
      } } }, b = { set: { test: function test(e) {
        return "Set" === Typeson.toStringTag(e);
      }, replace: function replace(e) {
        return Array.from(e.values());
      }, revive: function revive(e) {
        return new Set(e);
      } } }, g = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", m = new Uint8Array(256), T = 0; T < g.length; T++) {
    m[g.charCodeAt(T)] = T;
  }var O = function encode(e, t, n) {
    for (var r = new Uint8Array(e, t, n), i = r.length, o = "", s = 0; s < i; s += 3) {
      o += g[r[s] >> 2], o += g[(3 & r[s]) << 4 | r[s + 1] >> 4], o += g[(15 & r[s + 1]) << 2 | r[s + 2] >> 6], o += g[63 & r[s + 2]];
    }return i % 3 == 2 ? o = o.substring(0, o.length - 1) + "=" : i % 3 == 1 && (o = o.substring(0, o.length - 2) + "=="), o;
  },
      w = function decode(e) {
    var t = e.length,
        n = .75 * e.length,
        r = 0,
        i = void 0,
        o = void 0,
        s = void 0,
        a = void 0;"=" === e[e.length - 1] && (n--, "=" === e[e.length - 2] && n--);for (var c = new ArrayBuffer(n), u = new Uint8Array(c), f = 0; f < t; f += 4) {
      i = m[e.charCodeAt(f)], o = m[e.charCodeAt(f + 1)], s = m[e.charCodeAt(f + 2)], a = m[e.charCodeAt(f + 3)], u[r++] = i << 2 | o >> 4, u[r++] = (15 & o) << 4 | s >> 2, u[r++] = (3 & s) << 6 | 63 & a;
    }return c;
  },
      S = { arraybuffer: { test: function test(e) {
        return "ArrayBuffer" === Typeson.toStringTag(e);
      }, replace: function replace(e, t) {
        t.buffers || (t.buffers = []);var n = t.buffers.indexOf(e);return n > -1 ? { index: n } : (t.buffers.push(e), O(e));
      }, revive: function revive(t, n) {
        if (n.buffers || (n.buffers = []), "object" === (void 0 === t ? "undefined" : e(t))) return n.buffers[t.index];var r = w(t);return n.buffers.push(r), r;
      } } },
      P = "undefined" == typeof self ? global : self,
      j = {};["Int8Array", "Uint8Array", "Uint8ClampedArray", "Int16Array", "Uint16Array", "Int32Array", "Uint32Array", "Float32Array", "Float64Array"].forEach(function (e) {
    var t = e,
        n = P[t];n && (j[e.toLowerCase()] = { test: function test(e) {
        return Typeson.toStringTag(e) === t;
      }, replace: function replace(e, t) {
        var n = e.buffer,
            r = e.byteOffset,
            i = e.length;t.buffers || (t.buffers = []);var o = t.buffers.indexOf(n);return o > -1 ? { index: o, byteOffset: r, length: i } : (t.buffers.push(n), { encoded: O(n), byteOffset: r, length: i });
      }, revive: function revive(e, t) {
        t.buffers || (t.buffers = []);var r = e.byteOffset,
            i = e.length,
            o = e.encoded,
            s = e.index,
            a = void 0;return "index" in e ? a = t.buffers[s] : (a = w(o), t.buffers.push(a)), new n(a, r, i);
      } });
  });var A = { dataview: { test: function test(e) {
        return "DataView" === Typeson.toStringTag(e);
      }, replace: function replace(e, t) {
        var n = e.buffer,
            r = e.byteOffset,
            i = e.byteLength;t.buffers || (t.buffers = []);var o = t.buffers.indexOf(n);return o > -1 ? { index: o, byteOffset: r, byteLength: i } : (t.buffers.push(n), { encoded: O(n), byteOffset: r, byteLength: i });
      }, revive: function revive(e, t) {
        t.buffers || (t.buffers = []);var n = e.byteOffset,
            r = e.byteLength,
            i = e.encoded,
            o = e.index,
            s = void 0;return "index" in e ? s = t.buffers[o] : (s = w(i), t.buffers.push(s)), new DataView(s, n, r);
      } } },
      C = { IntlCollator: { test: function test(e) {
        return Typeson.hasConstructorOf(e, Intl.Collator);
      }, replace: function replace(e) {
        return e.resolvedOptions();
      }, revive: function revive(e) {
        return new Intl.Collator(e.locale, e);
      } }, IntlDateTimeFormat: { test: function test(e) {
        return Typeson.hasConstructorOf(e, Intl.DateTimeFormat);
      }, replace: function replace(e) {
        return e.resolvedOptions();
      }, revive: function revive(e) {
        return new Intl.DateTimeFormat(e.locale, e);
      } }, IntlNumberFormat: { test: function test(e) {
        return Typeson.hasConstructorOf(e, Intl.NumberFormat);
      }, replace: function replace(e) {
        return e.resolvedOptions();
      }, revive: function revive(e) {
        return new Intl.NumberFormat(e.locale, e);
      } } },
      N = { file: { test: function test(e) {
        return "File" === Typeson.toStringTag(e);
      }, replace: function replace(e) {
        var t = new XMLHttpRequest();if (t.open("GET", URL.createObjectURL(e), !1), 200 !== t.status && 0 !== t.status) throw new Error("Bad Blob access: " + t.status);return t.send(), { type: e.type, stringContents: t.responseText, name: e.name, lastModified: e.lastModified };
      }, revive: function revive(e) {
        var t = e.name,
            n = e.type,
            r = e.stringContents,
            i = e.lastModified;return new File([r], t, { type: n, lastModified: i });
      }, replaceAsync: function replaceAsync(e) {
        return new Typeson.Promise(function (t, n) {
          if (e.isClosed) n(new Error("The File is closed"));else {
            var r = new FileReader();r.addEventListener("load", function () {
              t({ type: e.type, stringContents: r.result, name: e.name, lastModified: e.lastModified });
            }), r.addEventListener("error", function () {
              n(r.error);
            }), r.readAsText(e);
          }
        });
      } } };return [f, p, l, y, v, d, { imagedata: { test: function test(e) {
        return "ImageData" === Typeson.toStringTag(e);
      }, replace: function replace(e) {
        return { array: Array.from(e.data), width: e.width, height: e.height };
      }, revive: function revive(e) {
        return new ImageData(new Uint8ClampedArray(e.array), e.width, e.height);
      } } }, { imagebitmap: { test: function test(e) {
        return "ImageBitmap" === Typeson.toStringTag(e) || e && e.dataset && "ImageBitmap" === e.dataset.toStringTag;
      }, replace: function replace(e) {
        var t = document.createElement("canvas");return t.getContext("2d").drawImage(e, 0, 0), t.toDataURL();
      }, revive: function revive(e) {
        var t = document.createElement("canvas"),
            n = t.getContext("2d"),
            r = document.createElement("img");return r.onload = function () {
          n.drawImage(r, 0, 0);
        }, r.src = e, t;
      }, reviveAsync: function reviveAsync(e) {
        var t = document.createElement("canvas"),
            n = t.getContext("2d"),
            r = document.createElement("img");return r.onload = function () {
          n.drawImage(r, 0, 0);
        }, r.src = e, createImageBitmap(t);
      } } }, N, { file: N.file, filelist: { test: function test(e) {
        return "FileList" === Typeson.toStringTag(e);
      }, replace: function replace(e) {
        for (var t = [], n = 0; n < e.length; n++) {
          t[n] = e.item(n);
        }return t;
      }, revive: function revive(e) {
        function FileList() {
          this._files = arguments[0], this.length = this._files.length;
        }return FileList.prototype.item = function (e) {
          return this._files[e];
        }, FileList.prototype[Symbol.toStringTag] = "FileList", new FileList(e);
      } } }, { blob: { test: function test(e) {
        return "Blob" === Typeson.toStringTag(e);
      }, replace: function replace(e) {
        var t = new XMLHttpRequest();if (t.open("GET", URL.createObjectURL(e), !1), 200 !== t.status && 0 !== t.status) throw new Error("Bad Blob access: " + t.status);return t.send(), { type: e.type, stringContents: t.responseText };
      }, revive: function revive(e) {
        var t = e.type,
            n = e.stringContents;return new Blob([n], { type: t });
      }, replaceAsync: function replaceAsync(e) {
        return new Typeson.Promise(function (t, n) {
          if (e.isClosed) n(new Error("The Blob is closed"));else {
            var r = new FileReader();r.addEventListener("load", function () {
              t({ type: e.type, stringContents: r.result });
            }), r.addEventListener("error", function () {
              n(r.error);
            }), r.readAsText(e);
          }
        });
      } } }].concat("function" == typeof Map ? h : [], "function" == typeof Set ? b : [], "function" == typeof ArrayBuffer ? S : [], "function" == typeof Uint8Array ? j : [], "function" == typeof DataView ? A : [], "undefined" != typeof Intl ? C : []).concat({ checkDataCloneException: [function (t) {
      var n = {}.toString.call(t).slice(8, -1);if (["symbol", "function"].includes(void 0 === t ? "undefined" : e(t)) || ["Arguments", "Module", "Error", "Promise", "WeakMap", "WeakSet"].includes(n) || t === Object.prototype || ("Blob" === n || "File" === n) && t.isClosed || t && "object" === (void 0 === t ? "undefined" : e(t)) && "number" == typeof t.nodeType && "function" == typeof t.insertBefore) throw new DOMException("The object cannot be cloned.", "DataCloneError");return !1;
    }] });
});


},{}],47:[function(_dereq_,module,exports){
"use strict";

var _typeof2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _typeof = "function" == typeof Symbol && "symbol" == _typeof2(Symbol.iterator) ? function (e) {
  return typeof e === "undefined" ? "undefined" : _typeof2(e);
} : function (e) {
  return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e === "undefined" ? "undefined" : _typeof2(e);
},
    slicedToArray = function () {
  return function (e, n) {
    if (Array.isArray(e)) return e;if (Symbol.iterator in Object(e)) return function sliceIterator(e, n) {
      var t = [],
          r = !0,
          i = !1,
          o = void 0;try {
        for (var s, a = e[Symbol.iterator](); !(r = (s = a.next()).done) && (t.push(s.value), !n || t.length !== n); r = !0) {}
      } catch (e) {
        i = !0, o = e;
      } finally {
        try {
          !r && a.return && a.return();
        } finally {
          if (i) throw o;
        }
      }return t;
    }(e, n);throw new TypeError("Invalid attempt to destructure non-iterable instance");
  };
}(),
    toConsumableArray = function toConsumableArray(e) {
  if (Array.isArray(e)) {
    for (var n = 0, t = Array(e.length); n < e.length; n++) {
      t[n] = e[n];
    }return t;
  }return Array.from(e);
},
    keys = Object.keys,
    isArray = Array.isArray,
    toString = {}.toString,
    getProto = Object.getPrototypeOf,
    hasOwn = {}.hasOwnProperty,
    fnToString = hasOwn.toString,
    internalStateObjPropsToIgnore = ["type", "replaced", "iterateIn", "iterateUnsetNumeric"];function isThenable(e, n) {
  return Typeson.isObject(e) && "function" == typeof e.then && (!n || "function" == typeof e.catch);
}function toStringTag(e) {
  return toString.call(e).slice(8, -1);
}function hasConstructorOf(e, n) {
  if (!e || "object" !== (void 0 === e ? "undefined" : _typeof(e))) return !1;var t = getProto(e);if (!t) return !1;var r = hasOwn.call(t, "constructor") && t.constructor;return "function" != typeof r ? null === n : "function" == typeof r && null !== n && fnToString.call(r) === fnToString.call(n);
}function isPlainObject(e) {
  return !(!e || "Object" !== toStringTag(e)) && (!getProto(e) || hasConstructorOf(e, Object));
}function isUserObject(e) {
  if (!e || "Object" !== toStringTag(e)) return !1;var n = getProto(e);return !n || hasConstructorOf(e, Object) || isUserObject(n);
}function isObject(e) {
  return e && "object" === (void 0 === e ? "undefined" : _typeof(e));
}function Typeson(e) {
  var n = [],
      t = [],
      r = {},
      i = this.types = {},
      o = this.stringify = function (n, t, r, i) {
    i = Object.assign({}, e, i, { stringification: !0 });var o = a(n, null, i);return isArray(o) ? JSON.stringify(o[0], t, r) : o.then(function (e) {
      return JSON.stringify(e, t, r);
    });
  };this.stringifySync = function (e, n, t, r) {
    return o(e, n, t, Object.assign({}, { throwOnBadSyncType: !0 }, r, { sync: !0 }));
  }, this.stringifyAsync = function (e, n, t, r) {
    return o(e, n, t, Object.assign({}, { throwOnBadSyncType: !0 }, r, { sync: !1 }));
  };var s = this.parse = function (n, t, r) {
    return r = Object.assign({}, e, r, { parse: !0 }), c(JSON.parse(n, t), r);
  };this.parseSync = function (e, n, t) {
    return s(e, n, Object.assign({}, { throwOnBadSyncType: !0 }, t, { sync: !0 }));
  }, this.parseAsync = function (e, n, t) {
    return s(e, n, Object.assign({}, { throwOnBadSyncType: !0 }, t, { sync: !1 }));
  }, this.specialTypeNames = function (e, n) {
    var t = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};return t.returnTypeNames = !0, this.encapsulate(e, n, t);
  }, this.rootTypeName = function (e, n) {
    var t = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};return t.iterateNone = !0, this.encapsulate(e, n, t);
  };var a = this.encapsulate = function (i, o, s) {
    var a = (s = Object.assign({ sync: !0 }, e, s)).sync,
        c = {},
        u = [],
        y = [],
        p = [],
        f = !(s && "cyclic" in s) || s.cyclic,
        l = s.encapsulateObserver,
        h = _encapsulate("", i, f, o || {}, p);function finish(e) {
      var n = Object.values(c);if (s.iterateNone) return n.length ? n[0] : Typeson.getJSONType(e);if (n.length) {
        if (s.returnTypeNames) return [].concat(toConsumableArray(new Set(n)));e && isPlainObject(e) && !e.hasOwnProperty("$types") ? e.$types = c : e = { $: e, $types: { $: c } };
      } else isObject(e) && e.hasOwnProperty("$types") && (e = { $: e, $types: !0 });return !s.returnTypeNames && e;
    }return p.length ? a && s.throwOnBadSyncType ? function () {
      throw new TypeError("Sync method requested but async result obtained");
    }() : Promise.resolve(function checkPromises(e, n) {
      return Promise.all(n.map(function (e) {
        return e[1].p;
      })).then(function (t) {
        return Promise.all(t.map(function (t) {
          var r = [],
              i = n.splice(0, 1)[0],
              o = slicedToArray(i, 7),
              s = o[0],
              a = o[2],
              c = o[3],
              u = o[4],
              y = o[5],
              p = o[6],
              f = _encapsulate(s, t, a, c, r, !0, p),
              l = hasConstructorOf(f, TypesonPromise);return s && l ? f.p.then(function (n) {
            return u[y] = n, checkPromises(e, r);
          }) : (s ? u[y] = f : e = l ? f.p : f, checkPromises(e, r));
        }));
      }).then(function () {
        return e;
      });
    }(h, p)).then(finish) : !a && s.throwOnBadSyncType ? function () {
      throw new TypeError("Async method requested but sync result obtained");
    }() : s.stringification && a ? [finish(h)] : a ? finish(h) : Promise.resolve(finish(h));function _adaptBuiltinStateObjectProperties(e, n, t) {
      Object.assign(e, n);var r = internalStateObjPropsToIgnore.map(function (n) {
        var t = e[n];return delete e[n], t;
      });t(), internalStateObjPropsToIgnore.forEach(function (n, t) {
        e[n] = r[t];
      });
    }function _encapsulate(e, t, r, i, o, a, p) {
      var f = void 0,
          h = {},
          v = void 0 === t ? "undefined" : _typeof(t),
          d = l ? function (n) {
        var s = p || i.type || Typeson.getJSONType(t);l(Object.assign(n || h, { keypath: e, value: t, cyclic: r, stateObj: i, promisesData: o, resolvingTypesonPromise: a, awaitingTypesonPromise: hasConstructorOf(t, TypesonPromise) }, void 0 !== s ? { type: s } : {}));
      } : null;if (v in { string: 1, boolean: 1, number: 1, undefined: 1 }) return void 0 === t || "number" === v && (isNaN(t) || t === -1 / 0 || t === 1 / 0) ? (f = replace(e, t, i, o, !1, a, d)) !== t && (h = { replaced: f }) : f = t, d && d(), f;if (null === t) return d && d(), t;if (r && !i.iterateIn && !i.iterateUnsetNumeric) {
        var b = u.indexOf(t);if (!(b < 0)) return c[e] = "#", d && d({ cyclicKeypath: y[b] }), "#" + y[b];!0 === r && (u.push(t), y.push(e));
      }var O = isPlainObject(t),
          g = isArray(t),
          T = (O || g) && (!n.length || i.replaced) || i.iterateIn ? t : replace(e, t, i, o, O || g, null, d),
          m = void 0;if (T !== t ? (f = T, h = { replaced: T }) : g || "array" === i.iterateIn ? (m = new Array(t.length), h = { clone: m }) : O || "object" === i.iterateIn ? h = { clone: m = {} } : "" === e && hasConstructorOf(t, TypesonPromise) ? (o.push([e, t, r, i, void 0, void 0, i.type]), f = t) : f = t, d && d(), s.iterateNone) return m || f;if (!m) return f;if (i.iterateIn) {
        var P = function _loop(n) {
          var s = { ownKeys: t.hasOwnProperty(n) };_adaptBuiltinStateObjectProperties(i, s, function () {
            var s = e + (e ? "." : "") + escapeKeyPathComponent(n),
                c = _encapsulate(s, t[n], !!r, i, o, a);hasConstructorOf(c, TypesonPromise) ? o.push([s, c, !!r, i, m, n, i.type]) : void 0 !== c && (m[n] = c);
          });
        };for (var j in t) {
          P(j);
        }d && d({ endIterateIn: !0, end: !0 });
      } else keys(t).forEach(function (n) {
        var s = e + (e ? "." : "") + escapeKeyPathComponent(n);_adaptBuiltinStateObjectProperties(i, { ownKeys: !0 }, function () {
          var e = _encapsulate(s, t[n], !!r, i, o, a);hasConstructorOf(e, TypesonPromise) ? o.push([s, e, !!r, i, m, n, i.type]) : void 0 !== e && (m[n] = e);
        });
      }), d && d({ endIterateOwn: !0, end: !0 });if (i.iterateUnsetNumeric) {
        for (var S = t.length, w = function _loop2(n) {
          if (!(n in t)) {
            var s = e + (e ? "." : "") + n;_adaptBuiltinStateObjectProperties(i, { ownKeys: !1 }, function () {
              var e = _encapsulate(s, void 0, !!r, i, o, a);hasConstructorOf(e, TypesonPromise) ? o.push([s, e, !!r, i, m, n, i.type]) : void 0 !== e && (m[n] = e);
            });
          }
        }, A = 0; A < S; A++) {
          w(A);
        }d && d({ endIterateUnsetNumeric: !0, end: !0 });
      }return m;
    }function replace(e, i, o, s, u, y, p) {
      for (var l = u ? n : t, h = l.length; h--;) {
        var v = l[h];if (v.test(i, o)) {
          var d = v.type;if (r[d]) {
            var b = c[e];c[e] = b ? [d].concat(b) : d;
          }return Object.assign(o, { type: d, replaced: !0 }), !a && v.replaceAsync || v.replace ? (p && p({ replacing: !0 }), _encapsulate(e, v[a || !v.replaceAsync ? "replace" : "replaceAsync"](i, o), f && "readonly", o, s, y, d)) : (p && p({ typeDetected: !0 }), _encapsulate(e, i, f && "readonly", o, s, y, d));
        }
      }return i;
    }
  };this.encapsulateSync = function (e, n, t) {
    return a(e, n, Object.assign({}, { throwOnBadSyncType: !0 }, t, { sync: !0 }));
  }, this.encapsulateAsync = function (e, n, t) {
    return a(e, n, Object.assign({}, { throwOnBadSyncType: !0 }, t, { sync: !1 }));
  };var c = this.revive = function (n, t) {
    var i = (t = Object.assign({ sync: !0 }, e, t)).sync,
        o = n && n.$types,
        s = !0;if (!o) return n;if (!0 === o) return n.$;o.$ && isPlainObject(o.$) && (n = n.$, o = o.$, s = !1);var a = [],
        c = {},
        u = function _revive(e, n, t, i, u, y) {
      if (s && "$types" === e) return;var p = o[e];if (isArray(n) || isPlainObject(n)) {
        var f = isArray(n) ? new Array(n.length) : {};for (keys(n).forEach(function (r) {
          var o = _revive(e + (e ? "." : "") + escapeKeyPathComponent(r), n[r], t || f, i, f, r);hasConstructorOf(o, Undefined) ? f[r] = void 0 : void 0 !== o && (f[r] = o);
        }), n = f; a.length;) {
          var l = slicedToArray(a[0], 4),
              h = l[0],
              v = l[1],
              d = l[2],
              b = l[3],
              O = getByKeyPath(h, v);if (hasConstructorOf(O, Undefined)) d[b] = void 0;else {
            if (void 0 === O) break;d[b] = O;
          }a.splice(0, 1);
        }
      }if (!p) return n;if ("#" === p) {
        var g = getByKeyPath(t, n.substr(1));return void 0 === g && a.push([t, n.substr(1), u, y]), g;
      }var T = i.sync;return [].concat(p).reduce(function (e, n) {
        var t = r[n];if (!t) throw new Error("Unregistered type: " + n);return t[T && t.revive ? "revive" : !T && t.reviveAsync ? "reviveAsync" : "revive"](e, c);
      }, n);
    }("", n, null, t);return isThenable(u = hasConstructorOf(u, Undefined) ? void 0 : u) ? i && t.throwOnBadSyncType ? function () {
      throw new TypeError("Sync method requested but async result obtained");
    }() : u : !i && t.throwOnBadSyncType ? function () {
      throw new TypeError("Async method requested but sync result obtained");
    }() : i ? u : Promise.resolve(u);
  };this.reviveSync = function (e, n) {
    return c(e, Object.assign({}, { throwOnBadSyncType: !0 }, n, { sync: !0 }));
  }, this.reviveAsync = function (e, n) {
    return c(e, Object.assign({}, { throwOnBadSyncType: !0 }, n, { sync: !1 }));
  }, this.register = function (e, o) {
    return o = o || {}, [].concat(e).forEach(function R(e) {
      if (isArray(e)) return e.map(R);e && keys(e).forEach(function (s) {
        if ("#" === s) throw new TypeError("# cannot be used as a type name as it is reserved for cyclic objects");if (Typeson.JSON_TYPES.includes(s)) throw new TypeError("Plain JSON object types are reserved as type names");var a = e[s],
            c = a.testPlainObjects ? n : t,
            u = c.filter(function (e) {
          return e.type === s;
        });if (u.length && (c.splice(c.indexOf(u[0]), 1), delete r[s], delete i[s]), a) {
          if ("function" == typeof a) {
            var y = a;a = { test: function test(e) {
                return e && e.constructor === y;
              }, replace: function replace(e) {
                return assign({}, e);
              }, revive: function revive(e) {
                return assign(Object.create(y.prototype), e);
              } };
          } else isArray(a) && (a = { test: a[0], replace: a[1], revive: a[2] });var p = { type: s, test: a.test.bind(a) };a.replace && (p.replace = a.replace.bind(a)), a.replaceAsync && (p.replaceAsync = a.replaceAsync.bind(a));var f = "number" == typeof o.fallback ? o.fallback : o.fallback ? 0 : 1 / 0;if (a.testPlainObjects ? n.splice(f, 0, p) : t.splice(f, 0, p), a.revive || a.reviveAsync) {
            var l = {};a.revive && (l.revive = a.revive.bind(a)), a.reviveAsync && (l.reviveAsync = a.reviveAsync.bind(a)), r[s] = l;
          }i[s] = a;
        }
      });
    }), this;
  };
}function assign(e, n) {
  return keys(n).map(function (t) {
    e[t] = n[t];
  }), e;
}function escapeKeyPathComponent(e) {
  return e.replace(/~/g, "~0").replace(/\./g, "~1");
}function unescapeKeyPathComponent(e) {
  return e.replace(/~1/g, ".").replace(/~0/g, "~");
}function getByKeyPath(e, n) {
  if ("" === n) return e;var t = n.indexOf(".");if (t > -1) {
    var r = e[unescapeKeyPathComponent(n.substr(0, t))];return void 0 === r ? void 0 : getByKeyPath(r, n.substr(t + 1));
  }return e[unescapeKeyPathComponent(n)];
}function Undefined() {}function TypesonPromise(e) {
  this.p = new Promise(e);
}TypesonPromise.prototype.then = function (e, n) {
  var t = this;return new TypesonPromise(function (r, i) {
    t.p.then(function (n) {
      r(e ? e(n) : n);
    }, function (e) {
      t.p.catch(function (e) {
        return n ? n(e) : Promise.reject(e);
      }).then(r, i);
    });
  });
}, TypesonPromise.prototype.catch = function (e) {
  return this.then(null, e);
}, TypesonPromise.resolve = function (e) {
  return new TypesonPromise(function (n) {
    n(e);
  });
}, TypesonPromise.reject = function (e) {
  return new TypesonPromise(function (n, t) {
    t(e);
  });
}, ["all", "race"].map(function (e) {
  TypesonPromise[e] = function (n) {
    return new TypesonPromise(function (t, r) {
      Promise[e](n.map(function (e) {
        return e.p;
      })).then(t, r);
    });
  };
}), Typeson.Undefined = Undefined, Typeson.Promise = TypesonPromise, Typeson.isThenable = isThenable, Typeson.toStringTag = toStringTag, Typeson.hasConstructorOf = hasConstructorOf, Typeson.isObject = isObject, Typeson.isPlainObject = isPlainObject, Typeson.isUserObject = isUserObject, Typeson.escapeKeyPathComponent = escapeKeyPathComponent, Typeson.unescapeKeyPathComponent = unescapeKeyPathComponent, Typeson.getByKeyPath = getByKeyPath, Typeson.getJSONType = function (e) {
  return null === e ? "null" : isArray(e) ? "array" : void 0 === e ? "undefined" : _typeof(e);
}, Typeson.JSON_TYPES = ["null", "boolean", "number", "string", "array", "object"], module.exports = Typeson;

},{}],48:[function(_dereq_,module,exports){
"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _(message, opts) {
    return (opts && opts.context ? opts.context : "Value") + " " + message + ".";
}

function type(V) {
    if (V === null) {
        return "Null";
    }
    switch (typeof V === "undefined" ? "undefined" : _typeof(V)) {
        case "undefined":
            return "Undefined";
        case "boolean":
            return "Boolean";
        case "number":
            return "Number";
        case "string":
            return "String";
        case "symbol":
            return "Symbol";
        case "object":
        // Falls through
        case "function":
        // Falls through
        default:
            // Per ES spec, typeof returns an implemention-defined value that is not any of the existing ones for
            // uncallable non-standard exotic objects. Yet Type() which the Web IDL spec depends on returns Object for
            // such cases. So treat the default case as an object.
            return "Object";
    }
}

// Round x to the nearest integer, choosing the even integer if it lies halfway between two.
function evenRound(x) {
    // There are four cases for numbers with fractional part being .5:
    //
    // case |     x     | floor(x) | round(x) | expected | x <> 0 | x % 1 | x & 1 |   example
    //   1  |  2n + 0.5 |  2n      |  2n + 1  |  2n      |   >    |  0.5  |   0   |  0.5 ->  0
    //   2  |  2n + 1.5 |  2n + 1  |  2n + 2  |  2n + 2  |   >    |  0.5  |   1   |  1.5 ->  2
    //   3  | -2n - 0.5 | -2n - 1  | -2n      | -2n      |   <    | -0.5  |   0   | -0.5 ->  0
    //   4  | -2n - 1.5 | -2n - 2  | -2n - 1  | -2n - 2  |   <    | -0.5  |   1   | -1.5 -> -2
    // (where n is a non-negative integer)
    //
    // Branch here for cases 1 and 4
    if (x > 0 && x % 1 === +0.5 && (x & 1) === 0 || x < 0 && x % 1 === -0.5 && (x & 1) === 1) {
        return censorNegativeZero(Math.floor(x));
    }

    return censorNegativeZero(Math.round(x));
}

function integerPart(n) {
    return censorNegativeZero(Math.trunc(n));
}

function sign(x) {
    return x < 0 ? -1 : 1;
}

function modulo(x, y) {
    // https://tc39.github.io/ecma262/#eqn-modulo
    // Note that http://stackoverflow.com/a/4467559/3191 does NOT work for large modulos
    var signMightNotMatch = x % y;
    if (sign(y) !== sign(signMightNotMatch)) {
        return signMightNotMatch + y;
    }
    return signMightNotMatch;
}

function censorNegativeZero(x) {
    return x === 0 ? 0 : x;
}

function createIntegerConversion(bitLength, typeOpts) {
    var isSigned = !typeOpts.unsigned;

    var lowerBound = void 0;
    var upperBound = void 0;
    if (bitLength === 64) {
        upperBound = Math.pow(2, 53) - 1;
        lowerBound = !isSigned ? 0 : -Math.pow(2, 53) + 1;
    } else if (!isSigned) {
        lowerBound = 0;
        upperBound = Math.pow(2, bitLength) - 1;
    } else {
        lowerBound = -Math.pow(2, bitLength - 1);
        upperBound = Math.pow(2, bitLength - 1) - 1;
    }

    var twoToTheBitLength = Math.pow(2, bitLength);
    var twoToOneLessThanTheBitLength = Math.pow(2, bitLength - 1);

    return function (V, opts) {
        if (opts === undefined) {
            opts = {};
        }

        var x = +V;
        x = censorNegativeZero(x); // Spec discussion ongoing: https://github.com/heycam/webidl/issues/306

        if (opts.enforceRange) {
            if (!Number.isFinite(x)) {
                throw new TypeError(_("is not a finite number", opts));
            }

            x = integerPart(x);

            if (x < lowerBound || x > upperBound) {
                throw new TypeError(_("is outside the accepted range of " + lowerBound + " to " + upperBound + ", inclusive", opts));
            }

            return x;
        }

        if (!Number.isNaN(x) && opts.clamp) {
            x = Math.min(Math.max(x, lowerBound), upperBound);
            x = evenRound(x);
            return x;
        }

        if (!Number.isFinite(x) || x === 0) {
            return 0;
        }
        x = integerPart(x);

        // Math.pow(2, 64) is not accurately representable in JavaScript, so try to avoid these per-spec operations if
        // possible. Hopefully it's an optimization for the non-64-bitLength cases too.
        if (x >= lowerBound && x <= upperBound) {
            return x;
        }

        // These will not work great for bitLength of 64, but oh well. See the README for more details.
        x = modulo(x, twoToTheBitLength);
        if (isSigned && x >= twoToOneLessThanTheBitLength) {
            return x - twoToTheBitLength;
        }
        return x;
    };
}

exports.any = function (V) {
    return V;
};

exports.void = function () {
    return undefined;
};

exports.boolean = function (val) {
    return !!val;
};

exports.byte = createIntegerConversion(8, { unsigned: false });
exports.octet = createIntegerConversion(8, { unsigned: true });

exports.short = createIntegerConversion(16, { unsigned: false });
exports["unsigned short"] = createIntegerConversion(16, { unsigned: true });

exports.long = createIntegerConversion(32, { unsigned: false });
exports["unsigned long"] = createIntegerConversion(32, { unsigned: true });

exports["long long"] = createIntegerConversion(64, { unsigned: false });
exports["unsigned long long"] = createIntegerConversion(64, { unsigned: true });

exports.double = function (V, opts) {
    var x = +V;

    if (!Number.isFinite(x)) {
        throw new TypeError(_("is not a finite floating-point value", opts));
    }

    return x;
};

exports["unrestricted double"] = function (V) {
    var x = +V;

    return x;
};

exports.float = function (V, opts) {
    var x = +V;

    if (!Number.isFinite(x)) {
        throw new TypeError(_("is not a finite floating-point value", opts));
    }

    if (Object.is(x, -0)) {
        return x;
    }

    var y = Math.fround(x);

    if (!Number.isFinite(y)) {
        throw new TypeError(_("is outside the range of a single-precision floating-point value", opts));
    }

    return y;
};

exports["unrestricted float"] = function (V) {
    var x = +V;

    if (isNaN(x)) {
        return x;
    }

    if (Object.is(x, -0)) {
        return x;
    }

    return Math.fround(x);
};

exports.DOMString = function (V, opts) {
    if (opts === undefined) {
        opts = {};
    }

    if (opts.treatNullAsEmptyString && V === null) {
        return "";
    }

    if ((typeof V === "undefined" ? "undefined" : _typeof(V)) === "symbol") {
        throw new TypeError(_("is a symbol, which cannot be converted to a string", opts));
    }

    return String(V);
};

exports.ByteString = function (V, opts) {
    var x = exports.DOMString(V, opts);
    var c = void 0;
    for (var i = 0; (c = x.codePointAt(i)) !== undefined; ++i) {
        if (c > 255) {
            throw new TypeError(_("is not a valid ByteString", opts));
        }
    }

    return x;
};

exports.USVString = function (V, opts) {
    var S = exports.DOMString(V, opts);
    var n = S.length;
    var U = [];
    for (var i = 0; i < n; ++i) {
        var c = S.charCodeAt(i);
        if (c < 0xD800 || c > 0xDFFF) {
            U.push(String.fromCodePoint(c));
        } else if (0xDC00 <= c && c <= 0xDFFF) {
            U.push(String.fromCodePoint(0xFFFD));
        } else if (i === n - 1) {
            U.push(String.fromCodePoint(0xFFFD));
        } else {
            var d = S.charCodeAt(i + 1);
            if (0xDC00 <= d && d <= 0xDFFF) {
                var a = c & 0x3FF;
                var b = d & 0x3FF;
                U.push(String.fromCodePoint((2 << 15) + (2 << 9) * a + b));
                ++i;
            } else {
                U.push(String.fromCodePoint(0xFFFD));
            }
        }
    }

    return U.join("");
};

exports.object = function (V, opts) {
    if (type(V) !== "Object") {
        throw new TypeError(_("is not an object", opts));
    }

    return V;
};

// Not exported, but used in Function and VoidFunction.

// Neither Function nor VoidFunction is defined with [TreatNonObjectAsNull], so
// handling for that is omitted.
function convertCallbackFunction(V, opts) {
    if (typeof V !== "function") {
        throw new TypeError(_("is not a function", opts));
    }
    return V;
}

[Error, ArrayBuffer, // The IsDetachedBuffer abstract operation is not exposed in JS
DataView, Int8Array, Int16Array, Int32Array, Uint8Array, Uint16Array, Uint32Array, Uint8ClampedArray, Float32Array, Float64Array].forEach(function (func) {
    var name = func.name;
    var article = /^[AEIOU]/.test(name) ? "an" : "a";
    exports[name] = function (V, opts) {
        if (!(V instanceof func)) {
            throw new TypeError(_("is not " + article + " " + name + " object", opts));
        }

        return V;
    };
});

// Common definitions

exports.ArrayBufferView = function (V, opts) {
    if (!ArrayBuffer.isView(V)) {
        throw new TypeError(_("is not a view on an ArrayBuffer object", opts));
    }

    return V;
};

exports.BufferSource = function (V, opts) {
    if (!(ArrayBuffer.isView(V) || V instanceof ArrayBuffer)) {
        throw new TypeError(_("is not an ArrayBuffer object or a view on one", opts));
    }

    return V;
};

exports.DOMTimeStamp = exports["unsigned long long"];

exports.Function = convertCallbackFunction;

exports.VoidFunction = convertCallbackFunction;

},{}]},{},[1])(1)
});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(20), __webpack_require__(49).Buffer))

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */



var base64 = __webpack_require__(50)
var ieee754 = __webpack_require__(51)
var isArray = __webpack_require__(52)

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * Due to various browser bugs, sometimes the Object implementation will be used even
 * when the browser supports typed arrays.
 *
 * Note:
 *
 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
 *
 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
 *
 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
 *     incorrect length in some situations.

 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
 * get the Object implementation, which is slower but behaves correctly.
 */
Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined
  ? global.TYPED_ARRAY_SUPPORT
  : typedArraySupport()

/*
 * Export kMaxLength after typed array support is determined.
 */
exports.kMaxLength = kMaxLength()

function typedArraySupport () {
  try {
    var arr = new Uint8Array(1)
    arr.__proto__ = {__proto__: Uint8Array.prototype, foo: function () { return 42 }}
    return arr.foo() === 42 && // typed array instances can be augmented
        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
        arr.subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
  } catch (e) {
    return false
  }
}

function kMaxLength () {
  return Buffer.TYPED_ARRAY_SUPPORT
    ? 0x7fffffff
    : 0x3fffffff
}

function createBuffer (that, length) {
  if (kMaxLength() < length) {
    throw new RangeError('Invalid typed array length')
  }
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = new Uint8Array(length)
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    if (that === null) {
      that = new Buffer(length)
    }
    that.length = length
  }

  return that
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
    return new Buffer(arg, encodingOrOffset, length)
  }

  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new Error(
        'If encoding is specified then the first argument must be a string'
      )
    }
    return allocUnsafe(this, arg)
  }
  return from(this, arg, encodingOrOffset, length)
}

Buffer.poolSize = 8192 // not used by this implementation

// TODO: Legacy, not needed anymore. Remove in next major version.
Buffer._augment = function (arr) {
  arr.__proto__ = Buffer.prototype
  return arr
}

function from (that, value, encodingOrOffset, length) {
  if (typeof value === 'number') {
    throw new TypeError('"value" argument must not be a number')
  }

  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
    return fromArrayBuffer(that, value, encodingOrOffset, length)
  }

  if (typeof value === 'string') {
    return fromString(that, value, encodingOrOffset)
  }

  return fromObject(that, value)
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(null, value, encodingOrOffset, length)
}

if (Buffer.TYPED_ARRAY_SUPPORT) {
  Buffer.prototype.__proto__ = Uint8Array.prototype
  Buffer.__proto__ = Uint8Array
  if (typeof Symbol !== 'undefined' && Symbol.species &&
      Buffer[Symbol.species] === Buffer) {
    // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
    Object.defineProperty(Buffer, Symbol.species, {
      value: null,
      configurable: true
    })
  }
}

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be a number')
  } else if (size < 0) {
    throw new RangeError('"size" argument must not be negative')
  }
}

function alloc (that, size, fill, encoding) {
  assertSize(size)
  if (size <= 0) {
    return createBuffer(that, size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(that, size).fill(fill, encoding)
      : createBuffer(that, size).fill(fill)
  }
  return createBuffer(that, size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(null, size, fill, encoding)
}

function allocUnsafe (that, size) {
  assertSize(size)
  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) {
    for (var i = 0; i < size; ++i) {
      that[i] = 0
    }
  }
  return that
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(null, size)
}
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(null, size)
}

function fromString (that, string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8'
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('"encoding" must be a valid string encoding')
  }

  var length = byteLength(string, encoding) | 0
  that = createBuffer(that, length)

  var actual = that.write(string, encoding)

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    that = that.slice(0, actual)
  }

  return that
}

function fromArrayLike (that, array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0
  that = createBuffer(that, length)
  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255
  }
  return that
}

function fromArrayBuffer (that, array, byteOffset, length) {
  array.byteLength // this throws if `array` is not a valid ArrayBuffer

  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('\'offset\' is out of bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('\'length\' is out of bounds')
  }

  if (byteOffset === undefined && length === undefined) {
    array = new Uint8Array(array)
  } else if (length === undefined) {
    array = new Uint8Array(array, byteOffset)
  } else {
    array = new Uint8Array(array, byteOffset, length)
  }

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = array
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    that = fromArrayLike(that, array)
  }
  return that
}

function fromObject (that, obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0
    that = createBuffer(that, len)

    if (that.length === 0) {
      return that
    }

    obj.copy(that, 0, 0, len)
    return that
  }

  if (obj) {
    if ((typeof ArrayBuffer !== 'undefined' &&
        obj.buffer instanceof ArrayBuffer) || 'length' in obj) {
      if (typeof obj.length !== 'number' || isnan(obj.length)) {
        return createBuffer(that, 0)
      }
      return fromArrayLike(that, obj)
    }

    if (obj.type === 'Buffer' && isArray(obj.data)) {
      return fromArrayLike(that, obj.data)
    }
  }

  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
}

function checked (length) {
  // Note: cannot use `length < kMaxLength()` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= kMaxLength()) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0
  }
  return Buffer.alloc(+length)
}

Buffer.isBuffer = function isBuffer (b) {
  return !!(b != null && b._isBuffer)
}

Buffer.compare = function compare (a, b) {
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError('Arguments must be Buffers')
  }

  if (a === b) return 0

  var x = a.length
  var y = b.length

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i]
      y = b[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  var i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; ++i) {
      length += list[i].length
    }
  }

  var buffer = Buffer.allocUnsafe(length)
  var pos = 0
  for (i = 0; i < list.length; ++i) {
    var buf = list[i]
    if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    }
    buf.copy(buffer, pos)
    pos += buf.length
  }
  return buffer
}

function byteLength (string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length
  }
  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' &&
      (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    string = '' + string
  }

  var len = string.length
  if (len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
      case undefined:
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) return utf8ToBytes(string).length // assume utf8
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  var loweredCase = false

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length
  }

  if (end <= 0) {
    return ''
  }

  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0
  start >>>= 0

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8'

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
// Buffer instances.
Buffer.prototype._isBuffer = true

function swap (b, n, m) {
  var i = b[n]
  b[n] = b[m]
  b[m] = i
}

Buffer.prototype.swap16 = function swap16 () {
  var len = this.length
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1)
  }
  return this
}

Buffer.prototype.swap32 = function swap32 () {
  var len = this.length
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3)
    swap(this, i + 1, i + 2)
  }
  return this
}

Buffer.prototype.swap64 = function swap64 () {
  var len = this.length
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7)
    swap(this, i + 1, i + 6)
    swap(this, i + 2, i + 5)
    swap(this, i + 3, i + 4)
  }
  return this
}

Buffer.prototype.toString = function toString () {
  var length = this.length | 0
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  if (this.length > 0) {
    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
    if (this.length > max) str += ' ... '
  }
  return '<Buffer ' + str + '>'
}

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (!Buffer.isBuffer(target)) {
    throw new TypeError('Argument must be a Buffer')
  }

  if (start === undefined) {
    start = 0
  }
  if (end === undefined) {
    end = target ? target.length : 0
  }
  if (thisStart === undefined) {
    thisStart = 0
  }
  if (thisEnd === undefined) {
    thisEnd = this.length
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0
  end >>>= 0
  thisStart >>>= 0
  thisEnd >>>= 0

  if (this === target) return 0

  var x = thisEnd - thisStart
  var y = end - start
  var len = Math.min(x, y)

  var thisCopy = this.slice(thisStart, thisEnd)
  var targetCopy = target.slice(start, end)

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i]
      y = targetCopy[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset
    byteOffset = 0
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000
  }
  byteOffset = +byteOffset  // Coerce to Number.
  if (isNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1)
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding)
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF // Search for a byte value [0-255]
    if (Buffer.TYPED_ARRAY_SUPPORT &&
        typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  var indexSize = 1
  var arrLength = arr.length
  var valLength = val.length

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase()
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2
      arrLength /= 2
      valLength /= 2
      byteOffset /= 2
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  var i
  if (dir) {
    var foundIndex = -1
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex
        foundIndex = -1
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
    for (i = byteOffset; i >= 0; i--) {
      var found = true
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
}

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  // must be an even number of digits
  var strLen = string.length
  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16)
    if (isNaN(parsed)) return i
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function latin1Write (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset | 0
    if (isFinite(length)) {
      length = length | 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  // legacy write(string, encoding, offset, length) - remove in v0.13
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  var remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
        return asciiWrite(this, string, offset, length)

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  var res = []

  var i = start
  while (i < end) {
    var firstByte = buf[i]
    var codePoint = null
    var bytesPerSequence = (firstByte > 0xEF) ? 4
      : (firstByte > 0xDF) ? 3
      : (firstByte > 0xBF) ? 2
      : 1

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = ''
  var i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function latin1Slice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; ++i) {
    out += toHex(buf[i])
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  var newBuf
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    newBuf = this.subarray(start, end)
    newBuf.__proto__ = Buffer.prototype
  } else {
    var sliceLen = end - start
    newBuf = new Buffer(sliceLen, undefined)
    for (var i = 0; i < sliceLen; ++i) {
      newBuf[i] = this[i + start]
    }
  }

  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  var val = this[offset + --byteLength]
  var mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var i = byteLength
  var mul = 1
  var val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var mul = 1
  var i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var i = byteLength - 1
  var mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  this[offset] = (value & 0xff)
  return offset + 1
}

function objectWriteUInt16 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
      (littleEndian ? i : 1 - i) * 8
  }
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

function objectWriteUInt32 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffffffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
  }
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset + 3] = (value >>> 24)
    this[offset + 2] = (value >>> 16)
    this[offset + 1] = (value >>> 8)
    this[offset] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = 0
  var mul = 1
  var sub = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = byteLength - 1
  var mul = 1
  var sub = 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
    this[offset + 2] = (value >>> 16)
    this[offset + 3] = (value >>> 24)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  var len = end - start
  var i

  if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start]
    }
  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
    // ascending copy from start
    for (i = 0; i < len; ++i) {
      target[i + targetStart] = this[i + start]
    }
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, start + len),
      targetStart
    )
  }

  return len
}

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start
      start = 0
      end = this.length
    } else if (typeof end === 'string') {
      encoding = end
      end = this.length
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0)
      if (code < 256) {
        val = code
      }
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
  } else if (typeof val === 'number') {
    val = val & 255
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0
  end = end === undefined ? this.length : end >>> 0

  if (!val) val = 0

  var i
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val
    }
  } else {
    var bytes = Buffer.isBuffer(val)
      ? val
      : utf8ToBytes(new Buffer(val, encoding).toString())
    var len = bytes.length
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len]
    }
  }

  return this
}

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function stringtrim (str) {
  if (str.trim) return str.trim()
  return str.replace(/^\s+|\s+$/g, '')
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  var codePoint
  var length = string.length
  var leadSurrogate = null
  var bytes = []

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

function isnan (val) {
  return val !== val // eslint-disable-line no-self-compare
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(20)))

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.byteLength = byteLength
exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i]
  revLookup[code.charCodeAt(i)] = i
}

// Support decoding URL-safe base64 strings, as Node.js does.
// See: https://en.wikipedia.org/wiki/Base64#URL_applications
revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function getLens (b64) {
  var len = b64.length

  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // Trim off extra bytes after placeholder bytes are found
  // See: https://github.com/beatgammit/base64-js/issues/42
  var validLen = b64.indexOf('=')
  if (validLen === -1) validLen = len

  var placeHoldersLen = validLen === len
    ? 0
    : 4 - (validLen % 4)

  return [validLen, placeHoldersLen]
}

// base64 is 4/3 + up to two characters of the original data
function byteLength (b64) {
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function _byteLength (b64, validLen, placeHoldersLen) {
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function toByteArray (b64) {
  var tmp
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]

  var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen))

  var curByte = 0

  // if there are placeholders, only get up to the last complete 4 chars
  var len = placeHoldersLen > 0
    ? validLen - 4
    : validLen

  for (var i = 0; i < len; i += 4) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 18) |
      (revLookup[b64.charCodeAt(i + 1)] << 12) |
      (revLookup[b64.charCodeAt(i + 2)] << 6) |
      revLookup[b64.charCodeAt(i + 3)]
    arr[curByte++] = (tmp >> 16) & 0xFF
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 2) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 2) |
      (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 1) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 10) |
      (revLookup[b64.charCodeAt(i + 1)] << 4) |
      (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] +
    lookup[num >> 12 & 0x3F] +
    lookup[num >> 6 & 0x3F] +
    lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp =
      ((uint8[i] << 16) & 0xFF0000) +
      ((uint8[i + 1] << 8) & 0xFF00) +
      (uint8[i + 2] & 0xFF)
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(
      uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)
    ))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    parts.push(
      lookup[tmp >> 2] +
      lookup[(tmp << 4) & 0x3F] +
      '=='
    )
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + uint8[len - 1]
    parts.push(
      lookup[tmp >> 10] +
      lookup[(tmp >> 4) & 0x3F] +
      lookup[(tmp << 2) & 0x3F] +
      '='
    )
  }

  return parts.join('')
}


/***/ }),
/* 51 */
/***/ (function(module, exports) {

exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = (e * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = (m * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = ((value * c) - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}


/***/ }),
/* 52 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(exports, "__esModule", { value: true });
// http://w3c.github.io/IndexedDB/#check-that-a-key-could-be-injected-into-a-value
var canInjectKey = function (keyPath, value) {
    var e_1, _a;
    if (Array.isArray(keyPath)) {
        // tslint:disable-next-line max-line-length
        throw new Error("The key paths used in this section are always strings and never sequences, since it is not possible to create a object store which has a key generator and also has a key path that is a sequence.");
    }
    var identifiers = keyPath.split(".");
    if (identifiers.length === 0) {
        throw new Error("Assert: identifiers is not empty");
    }
    identifiers.pop();
    try {
        for (var identifiers_1 = __values(identifiers), identifiers_1_1 = identifiers_1.next(); !identifiers_1_1.done; identifiers_1_1 = identifiers_1.next()) {
            var identifier = identifiers_1_1.value;
            if (typeof value !== "object" && !Array.isArray(value)) {
                return false;
            }
            var hop = value.hasOwnProperty(identifier);
            if (!hop) {
                return true;
            }
            value = value[identifier];
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (identifiers_1_1 && !identifiers_1_1.done && (_a = identifiers_1.return)) _a.call(identifiers_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return typeof value === "object" || Array.isArray(value);
};
exports.default = canInjectKey;


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(exports, "__esModule", { value: true });
var errors_1 = __webpack_require__(18);
var extractKey_1 = __webpack_require__(26);
var RecordStore_1 = __webpack_require__(40);
var structuredClone_1 = __webpack_require__(27);
var valueToKey_1 = __webpack_require__(19);
// http://www.w3.org/TR/2015/REC-IndexedDB-20150108/#dfn-index
var Index = /** @class */ (function () {
    function Index(rawObjectStore, name, keyPath, multiEntry, unique) {
        this.deleted = false;
        // Initialized should be used to decide whether to throw an error or abort the versionchange transaction when there is a
        // constraint
        this.initialized = false;
        this.records = new RecordStore_1.default();
        this.rawObjectStore = rawObjectStore;
        this.name = name;
        this.keyPath = keyPath;
        this.multiEntry = multiEntry;
        this.unique = unique;
    }
    // http://www.w3.org/TR/2015/REC-IndexedDB-20150108/#dfn-steps-for-retrieving-a-value-from-an-index
    Index.prototype.getKey = function (key) {
        var record = this.records.get(key);
        return record !== undefined ? record.value : undefined;
    };
    // http://w3c.github.io/IndexedDB/#retrieve-multiple-referenced-values-from-an-index
    Index.prototype.getAllKeys = function (range, count) {
        var e_1, _a;
        if (count === undefined || count === 0) {
            count = Infinity;
        }
        var records = [];
        try {
            for (var _b = __values(this.records.values(range)), _c = _b.next(); !_c.done; _c = _b.next()) {
                var record = _c.value;
                records.push(structuredClone_1.default(record.value));
                if (records.length >= count) {
                    break;
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return records;
    };
    // http://www.w3.org/TR/2015/REC-IndexedDB-20150108/#index-referenced-value-retrieval-operation
    Index.prototype.getValue = function (key) {
        var record = this.records.get(key);
        return record !== undefined
            ? this.rawObjectStore.getValue(record.value)
            : undefined;
    };
    // http://w3c.github.io/IndexedDB/#retrieve-multiple-referenced-values-from-an-index
    Index.prototype.getAllValues = function (range, count) {
        var e_2, _a;
        if (count === undefined || count === 0) {
            count = Infinity;
        }
        var records = [];
        try {
            for (var _b = __values(this.records.values(range)), _c = _b.next(); !_c.done; _c = _b.next()) {
                var record = _c.value;
                records.push(this.rawObjectStore.getValue(record.value));
                if (records.length >= count) {
                    break;
                }
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_2) throw e_2.error; }
        }
        return records;
    };
    // http://www.w3.org/TR/2015/REC-IndexedDB-20150108/#dfn-steps-for-storing-a-record-into-an-object-store (step 7)
    Index.prototype.storeRecord = function (newRecord) {
        var e_3, _a, e_4, _b, e_5, _c;
        var indexKey;
        try {
            indexKey = extractKey_1.default(this.keyPath, newRecord.value);
        }
        catch (err) {
            if (err.name === "DataError") {
                // Invalid key is not an actual error, just means we do not store an entry in this index
                return;
            }
            throw err;
        }
        if (!this.multiEntry || !Array.isArray(indexKey)) {
            try {
                valueToKey_1.default(indexKey);
            }
            catch (e) {
                return;
            }
        }
        else {
            // remove any elements from index key that are not valid keys and remove any duplicate elements from index
            // key such that only one instance of the duplicate value remains.
            var keep = [];
            try {
                for (var indexKey_1 = __values(indexKey), indexKey_1_1 = indexKey_1.next(); !indexKey_1_1.done; indexKey_1_1 = indexKey_1.next()) {
                    var part = indexKey_1_1.value;
                    if (keep.indexOf(part) < 0) {
                        try {
                            keep.push(valueToKey_1.default(part));
                        }
                        catch (err) {
                            /* Do nothing */
                        }
                    }
                }
            }
            catch (e_3_1) { e_3 = { error: e_3_1 }; }
            finally {
                try {
                    if (indexKey_1_1 && !indexKey_1_1.done && (_a = indexKey_1.return)) _a.call(indexKey_1);
                }
                finally { if (e_3) throw e_3.error; }
            }
            indexKey = keep;
        }
        if (!this.multiEntry || !Array.isArray(indexKey)) {
            if (this.unique) {
                var existingRecord = this.records.get(indexKey);
                if (existingRecord) {
                    throw new errors_1.ConstraintError();
                }
            }
        }
        else {
            if (this.unique) {
                try {
                    for (var indexKey_2 = __values(indexKey), indexKey_2_1 = indexKey_2.next(); !indexKey_2_1.done; indexKey_2_1 = indexKey_2.next()) {
                        var individualIndexKey = indexKey_2_1.value;
                        var existingRecord = this.records.get(individualIndexKey);
                        if (existingRecord) {
                            throw new errors_1.ConstraintError();
                        }
                    }
                }
                catch (e_4_1) { e_4 = { error: e_4_1 }; }
                finally {
                    try {
                        if (indexKey_2_1 && !indexKey_2_1.done && (_b = indexKey_2.return)) _b.call(indexKey_2);
                    }
                    finally { if (e_4) throw e_4.error; }
                }
            }
        }
        if (!this.multiEntry || !Array.isArray(indexKey)) {
            this.records.add({
                key: indexKey,
                value: newRecord.key,
            });
        }
        else {
            try {
                for (var indexKey_3 = __values(indexKey), indexKey_3_1 = indexKey_3.next(); !indexKey_3_1.done; indexKey_3_1 = indexKey_3.next()) {
                    var individualIndexKey = indexKey_3_1.value;
                    this.records.add({
                        key: individualIndexKey,
                        value: newRecord.key,
                    });
                }
            }
            catch (e_5_1) { e_5 = { error: e_5_1 }; }
            finally {
                try {
                    if (indexKey_3_1 && !indexKey_3_1.done && (_c = indexKey_3.return)) _c.call(indexKey_3);
                }
                finally { if (e_5) throw e_5.error; }
            }
        }
    };
    Index.prototype.initialize = function (transaction) {
        var _this = this;
        if (this.initialized) {
            throw new Error("Index already initialized");
        }
        transaction._execRequestAsync({
            operation: function () {
                var e_6, _a;
                try {
                    try {
                        // Create index based on current value of objectstore
                        for (var _b = __values(_this.rawObjectStore.records.values()), _c = _b.next(); !_c.done; _c = _b.next()) {
                            var record = _c.value;
                            _this.storeRecord(record);
                        }
                    }
                    catch (e_6_1) { e_6 = { error: e_6_1 }; }
                    finally {
                        try {
                            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                        }
                        finally { if (e_6) throw e_6.error; }
                    }
                    _this.initialized = true;
                }
                catch (err) {
                    // console.error(err);
                    transaction._abort(err.name);
                }
            },
            source: null,
        });
    };
    return Index;
}());
exports.default = Index;


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(exports, "__esModule", { value: true });
var errors_1 = __webpack_require__(18);
var extractKey_1 = __webpack_require__(26);
var KeyGenerator_1 = __webpack_require__(56);
var RecordStore_1 = __webpack_require__(40);
var structuredClone_1 = __webpack_require__(27);
// http://www.w3.org/TR/2015/REC-IndexedDB-20150108/#dfn-object-store
var ObjectStore = /** @class */ (function () {
    function ObjectStore(rawDatabase, name, keyPath, autoIncrement) {
        this.deleted = false;
        this.records = new RecordStore_1.default();
        this.rawIndexes = new Map();
        this.rawDatabase = rawDatabase;
        this.keyGenerator = autoIncrement === true ? new KeyGenerator_1.default() : null;
        this.deleted = false;
        this.name = name;
        this.keyPath = keyPath;
        this.autoIncrement = autoIncrement;
    }
    // http://www.w3.org/TR/2015/REC-IndexedDB-20150108/#dfn-steps-for-retrieving-a-value-from-an-object-store
    ObjectStore.prototype.getKey = function (key) {
        var record = this.records.get(key);
        return record !== undefined ? structuredClone_1.default(record.key) : undefined;
    };
    // http://w3c.github.io/IndexedDB/#retrieve-multiple-keys-from-an-object-store
    ObjectStore.prototype.getAllKeys = function (range, count) {
        var e_1, _a;
        if (count === undefined || count === 0) {
            count = Infinity;
        }
        var records = [];
        try {
            for (var _b = __values(this.records.values(range)), _c = _b.next(); !_c.done; _c = _b.next()) {
                var record = _c.value;
                records.push(structuredClone_1.default(record.key));
                if (records.length >= count) {
                    break;
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return records;
    };
    // http://www.w3.org/TR/2015/REC-IndexedDB-20150108/#dfn-steps-for-retrieving-a-value-from-an-object-store
    ObjectStore.prototype.getValue = function (key) {
        var record = this.records.get(key);
        return record !== undefined ? structuredClone_1.default(record.value) : undefined;
    };
    // http://w3c.github.io/IndexedDB/#retrieve-multiple-values-from-an-object-store
    ObjectStore.prototype.getAllValues = function (range, count) {
        var e_2, _a;
        if (count === undefined || count === 0) {
            count = Infinity;
        }
        var records = [];
        try {
            for (var _b = __values(this.records.values(range)), _c = _b.next(); !_c.done; _c = _b.next()) {
                var record = _c.value;
                records.push(structuredClone_1.default(record.value));
                if (records.length >= count) {
                    break;
                }
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_2) throw e_2.error; }
        }
        return records;
    };
    // http://www.w3.org/TR/2015/REC-IndexedDB-20150108/#dfn-steps-for-storing-a-record-into-an-object-store
    ObjectStore.prototype.storeRecord = function (newRecord, noOverwrite, rollbackLog) {
        var e_3, _a;
        var _this = this;
        if (this.keyPath !== null) {
            var key = extractKey_1.default(this.keyPath, newRecord.value);
            if (key !== undefined) {
                newRecord.key = key;
            }
        }
        if (this.keyGenerator !== null && newRecord.key === undefined) {
            if (rollbackLog) {
                var keyGeneratorBefore_1 = this.keyGenerator.num;
                rollbackLog.push(function () {
                    if (_this.keyGenerator) {
                        _this.keyGenerator.num = keyGeneratorBefore_1;
                    }
                });
            }
            newRecord.key = this.keyGenerator.next();
            // Set in value if keyPath defiend but led to no key
            // http://www.w3.org/TR/2015/REC-IndexedDB-20150108/#dfn-steps-to-assign-a-key-to-a-value-using-a-key-path
            if (this.keyPath !== null) {
                if (Array.isArray(this.keyPath)) {
                    throw new Error("Cannot have an array key path in an object store with a key generator");
                }
                var remainingKeyPath = this.keyPath;
                var object = newRecord.value;
                var identifier = void 0;
                var i = 0; // Just to run the loop at least once
                while (i >= 0) {
                    if (typeof object !== "object") {
                        throw new errors_1.DataError();
                    }
                    i = remainingKeyPath.indexOf(".");
                    if (i >= 0) {
                        identifier = remainingKeyPath.slice(0, i);
                        remainingKeyPath = remainingKeyPath.slice(i + 1);
                        if (!object.hasOwnProperty(identifier)) {
                            object[identifier] = {};
                        }
                        object = object[identifier];
                    }
                }
                identifier = remainingKeyPath;
                object[identifier] = newRecord.key;
            }
        }
        else if (this.keyGenerator !== null &&
            typeof newRecord.key === "number") {
            this.keyGenerator.setIfLarger(newRecord.key);
        }
        var existingRecord = this.records.get(newRecord.key);
        if (existingRecord) {
            if (noOverwrite) {
                throw new errors_1.ConstraintError();
            }
            this.deleteRecord(newRecord.key, rollbackLog);
        }
        this.records.add(newRecord);
        try {
            // Update indexes
            for (var _b = __values(this.rawIndexes.values()), _c = _b.next(); !_c.done; _c = _b.next()) {
                var rawIndex = _c.value;
                if (rawIndex.initialized) {
                    rawIndex.storeRecord(newRecord);
                }
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_3) throw e_3.error; }
        }
        if (rollbackLog) {
            rollbackLog.push(function () {
                _this.deleteRecord(newRecord.key);
            });
        }
        return newRecord.key;
    };
    // http://www.w3.org/TR/2015/REC-IndexedDB-20150108/#dfn-steps-for-deleting-records-from-an-object-store
    ObjectStore.prototype.deleteRecord = function (key, rollbackLog) {
        var e_4, _a, e_5, _b;
        var _this = this;
        var deletedRecords = this.records.delete(key);
        if (rollbackLog) {
            var _loop_1 = function (record) {
                rollbackLog.push(function () {
                    _this.storeRecord(record, true);
                });
            };
            try {
                for (var deletedRecords_1 = __values(deletedRecords), deletedRecords_1_1 = deletedRecords_1.next(); !deletedRecords_1_1.done; deletedRecords_1_1 = deletedRecords_1.next()) {
                    var record = deletedRecords_1_1.value;
                    _loop_1(record);
                }
            }
            catch (e_4_1) { e_4 = { error: e_4_1 }; }
            finally {
                try {
                    if (deletedRecords_1_1 && !deletedRecords_1_1.done && (_a = deletedRecords_1.return)) _a.call(deletedRecords_1);
                }
                finally { if (e_4) throw e_4.error; }
            }
        }
        try {
            for (var _c = __values(this.rawIndexes.values()), _d = _c.next(); !_d.done; _d = _c.next()) {
                var rawIndex = _d.value;
                rawIndex.records.deleteByValue(key);
            }
        }
        catch (e_5_1) { e_5 = { error: e_5_1 }; }
        finally {
            try {
                if (_d && !_d.done && (_b = _c.return)) _b.call(_c);
            }
            finally { if (e_5) throw e_5.error; }
        }
    };
    // http://www.w3.org/TR/2015/REC-IndexedDB-20150108/#dfn-steps-for-clearing-an-object-store
    ObjectStore.prototype.clear = function (rollbackLog) {
        var e_6, _a, e_7, _b;
        var _this = this;
        var deletedRecords = this.records.clear();
        if (rollbackLog) {
            var _loop_2 = function (record) {
                rollbackLog.push(function () {
                    _this.storeRecord(record, true);
                });
            };
            try {
                for (var deletedRecords_2 = __values(deletedRecords), deletedRecords_2_1 = deletedRecords_2.next(); !deletedRecords_2_1.done; deletedRecords_2_1 = deletedRecords_2.next()) {
                    var record = deletedRecords_2_1.value;
                    _loop_2(record);
                }
            }
            catch (e_6_1) { e_6 = { error: e_6_1 }; }
            finally {
                try {
                    if (deletedRecords_2_1 && !deletedRecords_2_1.done && (_a = deletedRecords_2.return)) _a.call(deletedRecords_2);
                }
                finally { if (e_6) throw e_6.error; }
            }
        }
        try {
            for (var _c = __values(this.rawIndexes.values()), _d = _c.next(); !_d.done; _d = _c.next()) {
                var rawIndex = _d.value;
                rawIndex.records.clear();
            }
        }
        catch (e_7_1) { e_7 = { error: e_7_1 }; }
        finally {
            try {
                if (_d && !_d.done && (_b = _c.return)) _b.call(_c);
            }
            finally { if (e_7) throw e_7.error; }
        }
    };
    return ObjectStore;
}());
exports.default = ObjectStore;


/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var errors_1 = __webpack_require__(18);
var MAX_KEY = 9007199254740992;
var KeyGenerator = /** @class */ (function () {
    function KeyGenerator() {
        // This is kind of wrong. Should start at 1 and increment only after record is saved
        this.num = 0;
    }
    KeyGenerator.prototype.next = function () {
        if (this.num >= MAX_KEY) {
            throw new errors_1.ConstraintError();
        }
        this.num += 1;
        return this.num;
    };
    // https://w3c.github.io/IndexedDB/#possibly-update-the-key-generator
    KeyGenerator.prototype.setIfLarger = function (num) {
        var value = Math.floor(Math.min(num, MAX_KEY)) - 1;
        if (value >= this.num) {
            this.num = value + 1;
        }
    };
    return KeyGenerator;
}());
exports.default = KeyGenerator;


/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(setImmediate) {
Object.defineProperty(exports, "__esModule", { value: true });
// http://www.w3.org/TR/2015/REC-IndexedDB-20150108/#dfn-database
var Database = /** @class */ (function () {
    function Database(name, version) {
        this.deletePending = false;
        this.transactions = [];
        this.rawObjectStores = new Map();
        this.connections = [];
        this.name = name;
        this.version = version;
        this.processTransactions = this.processTransactions.bind(this);
    }
    Database.prototype.processTransactions = function () {
        var _this = this;
        setImmediate(function () {
            var anyRunning = _this.transactions.some(function (transaction) {
                return (transaction._started && transaction._state !== "finished");
            });
            if (!anyRunning) {
                var next = _this.transactions.find(function (transaction) {
                    return (!transaction._started &&
                        transaction._state !== "finished");
                });
                if (next) {
                    next._start();
                    next.addEventListener("complete", _this.processTransactions);
                    next.addEventListener("abort", _this.processTransactions);
                }
            }
        });
    };
    return Database;
}());
exports.default = Database;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(23).setImmediate))

/***/ })
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvbGliL2RiZnVuYy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdGVzdHMvZGJmdW5jLnRlc3QuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2Zha2UtaW5kZXhlZGRiL2J1aWxkL2xpYi9lcnJvcnMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2Zha2UtaW5kZXhlZGRiL2J1aWxkL2xpYi92YWx1ZVRvS2V5LmpzIiwid2VicGFjazovLy8od2VicGFjaykvYnVpbGRpbi9nbG9iYWwuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2Zha2UtaW5kZXhlZGRiL2J1aWxkL0ZEQktleVJhbmdlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9mYWtlLWluZGV4ZWRkYi9idWlsZC9GREJSZXF1ZXN0LmpzIiwid2VicGFjazovLy8od2VicGFjaykvbm9kZV9tb2R1bGVzL3RpbWVycy1icm93c2VyaWZ5L21haW4uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2Zha2UtaW5kZXhlZGRiL2J1aWxkL0ZEQkN1cnNvci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZmFrZS1pbmRleGVkZGIvYnVpbGQvbGliL2NtcC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZmFrZS1pbmRleGVkZGIvYnVpbGQvbGliL2V4dHJhY3RLZXkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2Zha2UtaW5kZXhlZGRiL2J1aWxkL2xpYi9zdHJ1Y3R1cmVkQ2xvbmUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2Zha2UtaW5kZXhlZGRiL2J1aWxkL2xpYi9mYWtlRE9NU3RyaW5nTGlzdC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZmFrZS1pbmRleGVkZGIvYnVpbGQvRkRCT2JqZWN0U3RvcmUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2Zha2UtaW5kZXhlZGRiL2J1aWxkL0ZEQkN1cnNvcldpdGhWYWx1ZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZmFrZS1pbmRleGVkZGIvYnVpbGQvbGliL0Zha2VFdmVudFRhcmdldC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZmFrZS1pbmRleGVkZGIvYnVpbGQvbGliL2VuZm9yY2VSYW5nZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZmFrZS1pbmRleGVkZGIvYnVpbGQvbGliL0Zha2VFdmVudC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZmFrZS1pbmRleGVkZGIvYnVpbGQvRkRCRmFjdG9yeS5qcyIsIndlYnBhY2s6Ly8vKHdlYnBhY2spL25vZGVfbW9kdWxlcy9wcm9jZXNzL2Jyb3dzZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2Zha2UtaW5kZXhlZGRiL2J1aWxkL0ZEQkRhdGFiYXNlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9mYWtlLWluZGV4ZWRkYi9idWlsZC9GREJUcmFuc2FjdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZmFrZS1pbmRleGVkZGIvYnVpbGQvRkRCSW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2Zha2UtaW5kZXhlZGRiL2J1aWxkL2xpYi92YWx1ZVRvS2V5UmFuZ2UuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2Zha2UtaW5kZXhlZGRiL2J1aWxkL2xpYi9SZWNvcmRTdG9yZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZmFrZS1pbmRleGVkZGIvYnVpbGQvbGliL3ZhbGlkYXRlS2V5UGF0aC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZmFrZS1pbmRleGVkZGIvYnVpbGQvRkRCT3BlbkRCUmVxdWVzdC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZmFrZS1pbmRleGVkZGIvYnVpbGQvRkRCVmVyc2lvbkNoYW5nZUV2ZW50LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9mYWtlLWluZGV4ZWRkYi9hdXRvLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9mYWtlLWluZGV4ZWRkYi9idWlsZC9mYWtlSW5kZXhlZERCLmpzIiwid2VicGFjazovLy8od2VicGFjaykvbm9kZV9tb2R1bGVzL3NldGltbWVkaWF0ZS9zZXRJbW1lZGlhdGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3NldGltbWVkaWF0ZS9zZXRJbW1lZGlhdGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JlYWxpc3RpYy1zdHJ1Y3R1cmVkLWNsb25lL2Rpc3QvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLyh3ZWJwYWNrKS9ub2RlX21vZHVsZXMvYnVmZmVyL2luZGV4LmpzIiwid2VicGFjazovLy8od2VicGFjaykvbm9kZV9tb2R1bGVzL2Jhc2U2NC1qcy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vKHdlYnBhY2spL25vZGVfbW9kdWxlcy9pZWVlNzU0L2luZGV4LmpzIiwid2VicGFjazovLy8od2VicGFjaykvbm9kZV9tb2R1bGVzL2lzYXJyYXkvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2Zha2UtaW5kZXhlZGRiL2J1aWxkL2xpYi9jYW5JbmplY3RLZXkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2Zha2UtaW5kZXhlZGRiL2J1aWxkL2xpYi9JbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZmFrZS1pbmRleGVkZGIvYnVpbGQvbGliL09iamVjdFN0b3JlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9mYWtlLWluZGV4ZWRkYi9idWlsZC9saWIvS2V5R2VuZXJhdG9yLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9mYWtlLWluZGV4ZWRkYi9idWlsZC9saWIvRGF0YWJhc2UuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQTtBQUFB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Q0EseUJBQXlCLDBCQUEwQjtBQUNuRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0JBQStCLFdBQVc7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7Ozs7Ozs7O0FDcGtCQTtBQUNBLDhDQUE4QyxjQUFjO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixjQUFjO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDL0VBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOENBQThDLGNBQWM7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtRkFBbUYsbUJBQW1CO0FBQ3RHO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixRQUFRLGdCQUFnQjtBQUMvQztBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQiwwQkFBMEI7QUFDL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQ2pFQTtBQUNBLDhDQUE4QyxjQUFjO0FBQzVELHVEQUFxRTtBQUNyRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUNaQTtBQUNBLDhDQUE4QyxjQUFjO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQ0FBaUMsaUNBQWlDLEVBQUU7QUFDcEUsS0FBSztBQUNMO0FBQ0E7QUFDQSw2QkFBNkIsZ0JBQWdCLEVBQUU7QUFDL0MsS0FBSztBQUNMO0FBQ0E7QUFDQTs7Ozs7Ozs7QUNmQTtBQUNBLDhDQUE4QyxjQUFjO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0Q0FBNEMseUJBQXlCO0FBQ3JFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkNBQTJDO0FBQzNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVCxnQ0FBZ0M7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7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Q0E7QUFDQSxDQUFDO0FBQ0Q7Ozs7Ozs7O0FDblVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsc0JBQXNCO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEOzs7Ozs7Ozs7QUNuUUE7QUFDQSw4Q0FBOEMsY0FBYztBQUM1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7Ozs7Ozs7O0FDL0xBO0FBQ0EsOENBQThDLGNBQWM7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdDQUF3Qyw0QkFBNEI7QUFDcEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDcEJBO0FBQ0EsOENBQThDLGNBQWM7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQkFBMkI7QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUNB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Q0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLHFDQUFxQztBQUMxRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHFCQUFxQixxQ0FBcUM7QUFDMUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EscUZBQXFGO0FBQ3JGO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0gsaURBQWlEO0FBQ2pEO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsYUFBYSw2QkFBNkI7QUFDMUMsYUFBYTtBQUNiO0FBQ0EsRUFBRTtBQUNGOztBQUVBOztBQUVBLENBQUMsRUFBRSxxRUFBcUU7QUFD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QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsVUFBVTtBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsWUFBWTtBQUM3QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsMEJBQTBCO0FBQzFCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBLHVDQUF1QyxTQUFTO0FBQ2hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsaUJBQWlCO0FBQ2hDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsYUFBYSxpQkFBaUI7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLFNBQVM7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQixTQUFTO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQixTQUFTO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0RBQWdELEVBQUU7QUFDbEQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsaUJBQWlCLFNBQVM7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlDQUF5QztBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLGVBQWU7QUFDdkM7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0Esd0JBQXdCLFFBQVE7QUFDaEM7QUFDQSxxQkFBcUIsZUFBZTtBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsWUFBWTtBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEscUJBQXFCLFNBQVM7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLHFCQUFxQixTQUFTO0FBQzlCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLHFCQUFxQixTQUFTO0FBQzlCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQixrQkFBa0I7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLG1CQUFtQixjQUFjO0FBQ2pDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1REFBdUQsT0FBTztBQUM5RDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdURBQXVELE9BQU87QUFDOUQ7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsa0JBQWtCO0FBQ2xCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EscUJBQXFCLFFBQVE7QUFDN0I7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLGVBQWUsU0FBUztBQUN4QjtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztB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QUEwQjtBQUM3STtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQixRQUFRLGdCQUFnQjtBQUNuRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QiwwQkFBMEI7QUFDbkQ7QUFDQTtBQUNBO0FBQ0EsNkVBQTZFLFVBQVU7QUFDdkY7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsUUFBUSxnQkFBZ0I7QUFDL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsMEJBQTBCO0FBQy9DO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDs7Ozs7Ozs7QUM5UEE7QUFDQSw4Q0FBOEMsY0FBYztBQUM1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDs7Ozs7Ozs7b0RDekJBO0FBQ0EsOENBQThDLGNBQWM7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxDQUFDO0FBQ0QiLCJmaWxlIjoiMC5idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEZpbGVuYW1lOiBkYmZ1bmMuanNcbiAqL1xuXG5jb25zdCBEQl9OQU1FID0gXCJncm9jZXJ5X2xpc3RcIjtcbmNvbnN0IERCX1ZFUlNJT04gPSAxO1xuLyoqXG4gKiBAcGFyYW0gbmFtZSBzdHJpbmdcbiAqIEBwYXJhbSB2ZXJzaW9uIGludFxuICovXG5jb25zdCBkYiA9IChuYW1lLCB2ZXJzaW9uKSA9PiB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgbGV0IHJlcSA9IGluZGV4ZWREQi5vcGVuKG5hbWUsIHZlcnNpb24pO1xuICAgIHJlcS5vbnVwZ3JhZGVuZWVkZWQgPSBldmVudCA9PiB7XG4gICAgICBsZXQgc3RvcmUgPSBldmVudC50YXJnZXQucmVzdWx0LmNyZWF0ZU9iamVjdFN0b3JlKG5hbWUsIHtcbiAgICAgICAgYXV0b0luY3JlbWVudDogZmFsc2UsXG4gICAgICAgIGtleVBhdGg6IFwiaWRcIlxuICAgICAgfSk7XG4gICAgICBzdG9yZS5jcmVhdGVJbmRleChcImlkXCIsIFwiaWRcIiwgeyB1bmlxdWU6IHRydWUgfSk7XG4gICAgfTtcbiAgICByZXEub25zdWNjZXNzID0gZXZlbnQgPT4gcmVzb2x2ZShldmVudC50YXJnZXQucmVzdWx0KTtcbiAgICByZXEub25lcnJvciA9IGV2ZW50ID0+IHJlamVjdChldmVudC50YXJnZXQpO1xuICB9KTtcbn07XG4vKipcbiAqIEBwYXJhbSBzY2hlbWEgc3RyaW5nXG4gKiBAcGFyYW0gb2JqIG9iamVjdCB8IGFycmF5XG4gKi9cbmNvbnN0IGFkZCA9IG9iaiA9PiB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgZGIoREJfTkFNRSwgREJfVkVSU0lPTikudGhlbihyZXMgPT4ge1xuICAgICAgbGV0IHRyYW5zID0gcmVzLnRyYW5zYWN0aW9uKFtEQl9OQU1FXSwgXCJyZWFkd3JpdGVcIik7XG4gICAgICBsZXQgc3RvcmUgPSB0cmFucy5vYmplY3RTdG9yZShEQl9OQU1FKTtcbiAgICAgIHN0b3JlLmFkZChvYmopO1xuICAgICAgdHJhbnMub25jb21wbGV0ZSA9IGV2ZW50ID0+IHJlc29sdmUoZXZlbnQudHlwZSk7XG4gICAgICB0cmFucy5vbmVycm9yID0gZXZlbnQgPT4gcmVqZWN0KGV2ZW50LnRhcmdldCk7XG4gICAgfSk7XG4gIH0pO1xufTtcbi8qKlxuICogQHBhcmFtIGtleSBzdHJpbmdcbiAqL1xuY29uc3QgcmVtb3ZlID0ga2V5ID0+IHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICBkYihEQl9OQU1FLCBEQl9WRVJTSU9OKS50aGVuKHJlcyA9PiB7XG4gICAgICBsZXQgdHJhbnMgPSByZXMudHJhbnNhY3Rpb24oW0RCX05BTUVdLCBcInJlYWR3cml0ZVwiKTtcbiAgICAgIGxldCBzdG9yZSA9IHRyYW5zLm9iamVjdFN0b3JlKERCX05BTUUpO1xuICAgICAgbGV0IHJlcSA9IHN0b3JlLmRlbGV0ZShrZXkpO1xuICAgICAgcmVxLm9uc3VjY2VzcyA9IGV2ZW50ID0+IHJlc29sdmUoZXZlbnQudGFyZ2V0LnJlc3VsdCk7XG4gICAgICByZXEub25lcnJvciA9IGV2ZW50ID0+IHJlamVjdChldmVudCk7XG4gICAgfSk7XG4gIH0pO1xufTtcbi8qKlxuICogQHBhcmFtIGtleSBzdHJpbmdcbiAqL1xuY29uc3QgZ2V0ID0ga2V5ID0+IHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICBkYihEQl9OQU1FLCBEQl9WRVJTSU9OKS50aGVuKHJlcyA9PiB7XG4gICAgICBsZXQgdHJhbnMgPSByZXMudHJhbnNhY3Rpb24oW0RCX05BTUVdLCBcInJlYWRvbmx5XCIpO1xuICAgICAgbGV0IHN0b3JlID0gdHJhbnMub2JqZWN0U3RvcmUoREJfTkFNRSk7XG4gICAgICBsZXQgcmVxID0gc3RvcmUuZ2V0KGtleSk7XG4gICAgICByZXEub25zdWNjZXNzID0gZXZlbnQgPT4gcmVzb2x2ZShldmVudC50YXJnZXQucmVzdWx0KTtcbiAgICAgIHJlcS5vbmVycm9yID0gZXZlbnQgPT4gcmVqZWN0KGV2ZW50KTtcbiAgICB9KTtcbiAgfSk7XG59O1xuLyoqXG4gKlxuICovXG5jb25zdCBnZXRBbGwgPSAoKSA9PiB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgZGIoREJfTkFNRSwgREJfVkVSU0lPTikudGhlbihyZXMgPT4ge1xuICAgICAgbGV0IHRyYW5zID0gcmVzLnRyYW5zYWN0aW9uKFtEQl9OQU1FXSwgXCJyZWFkb25seVwiKTtcbiAgICAgIGxldCBzdG9yZSA9IHRyYW5zLm9iamVjdFN0b3JlKERCX05BTUUpO1xuICAgICAgc3RvcmUuZ2V0QWxsKCkub25zdWNjZXNzID0gZXZlbnQgPT4gcmVzb2x2ZShldmVudC50YXJnZXQucmVzdWx0KTtcbiAgICB9KTtcbiAgfSk7XG59O1xuXG5leHBvcnQgeyBhZGQsIHJlbW92ZSwgZ2V0LCBnZXRBbGwgfTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2xpYi9kYmZ1bmMuanNcbi8vIG1vZHVsZSBpZCA9IDJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMyAxMyIsIi8qKlxuICogZGJmdW5jLnRlc3QuanNcbiAqIEFzeW5jIHdyaXRlL3JlYWQgdG8gaW5kZXhlZERCXG4gKi9cblxucmVxdWlyZShcImZha2UtaW5kZXhlZGRiL2F1dG9cIik7XG5cbmltcG9ydCB7IGFkZCwgcmVtb3ZlLCBnZXQsIGdldEFsbCB9IGZyb20gXCIuLy4uL2xpYi9kYmZ1bmMuanNcIjtcblxudGVzdChcInJlc29sdmVzIHdoZW4gb2JqZWN0IGlzIHN0b3JlZFwiLCAoKSA9PiB7XG4gIHJldHVybiBleHBlY3QoXG4gICAgYWRkKHtcbiAgICAgIG5hbWU6IFwiS2l0dHlcIixcbiAgICAgIGlkOiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBEYXRlLm5vdygpKVxuICAgIH0pXG4gICkucmVzb2x2ZXMudG9NYXRjaChcImNvbXBsZXRlXCIpO1xufSk7XG4vKlxudGVzdChcInJlc29sdmVzIHdoZW4gYXJyYXkgaXMgc3RvcmVkXCIsICgpID0+IHtcbiAgcmV0dXJuIGV4cGVjdChcbiAgICBhZGQoW1xuICAgICAgeyBuYW1lOiBcIkhlbGxvXCIsIGlkOiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBEYXRlLm5vdygpKSB9LFxuICAgICAgeyBuYW1lOiBcIktpdHR5XCIsIGlkOiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBEYXRlLm5vdygpKSB9XG4gICAgXSlcbiAgKS5yZXNvbHZlcy50b01hdGNoKFwiY29tcGxldGVcIik7XG59KTtcbiovXG50ZXN0KFwicmVzb2x2ZXMgb2JqZWN0IHdpdGgga2V5ID0ga2V5XCIsICgpID0+IHtcbiAgcmV0dXJuIGV4cGVjdChnZXQoMSkpLnJlc29sdmVzLnRvTWF0Y2hPYmplY3QoeyBuYW1lOiBcIktpdHR5XCIgfSk7XG59KTtcblxudGVzdChcInJlc29sdmVzIHdpdGggZXJyb3Igd2hlbiBrZXkgaXMgbm90IGZvdW5kXCIsICgpID0+IHtcbiAgcmV0dXJuIGV4cGVjdChnZXQoNDIpKS5yZXNvbHZlcy50b0JlVW5kZWZpbmVkKCk7XG59KTtcblxudGVzdChcInJlc29sdmVzIHdoZW4ga2V5IGlzIGRlbGV0ZWRcIiwgKCkgPT4ge1xuICByZXR1cm4gZXhwZWN0KHJlbW92ZSgxKSkucmVzb2x2ZXMudG9CZVVuZGVmaW5lZCgpO1xufSk7XG5cbnRlc3QoXCJyZXNvbHZlcyB3aGVuIGdldGFsbCBpcyBjYWxsZWRcIiwgKCkgPT4ge1xuICByZXR1cm4gZXhwZWN0KGdldEFsbCgpKS5yZXNvbHZlcy50b0JlKHRydWUpO1xufSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy90ZXN0cy9kYmZ1bmMudGVzdC5qc1xuLy8gbW9kdWxlIGlkID0gMTBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XG4vKiB0c2xpbnQ6ZGlzYWJsZTogbWF4LWNsYXNzZXMtcGVyLWZpbGUgbWF4LWxpbmUtbGVuZ3RoICovXG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XG4gICAgICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XG4gICAgICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcbiAgICAgICAgcmV0dXJuIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgfTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbiAgICB9O1xufSkoKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBtZXNzYWdlcyA9IHtcbiAgICBBYm9ydEVycm9yOiBcIkEgcmVxdWVzdCB3YXMgYWJvcnRlZCwgZm9yIGV4YW1wbGUgdGhyb3VnaCBhIGNhbGwgdG8gSURCVHJhbnNhY3Rpb24uYWJvcnQuXCIsXG4gICAgQ29uc3RyYWludEVycm9yOiBcIkEgbXV0YXRpb24gb3BlcmF0aW9uIGluIHRoZSB0cmFuc2FjdGlvbiBmYWlsZWQgYmVjYXVzZSBhIGNvbnN0cmFpbnQgd2FzIG5vdCBzYXRpc2ZpZWQuIEZvciBleGFtcGxlLCBhbiBvYmplY3Qgc3VjaCBhcyBhbiBvYmplY3Qgc3RvcmUgb3IgaW5kZXggYWxyZWFkeSBleGlzdHMgYW5kIGEgcmVxdWVzdCBhdHRlbXB0ZWQgdG8gY3JlYXRlIGEgbmV3IG9uZS5cIixcbiAgICBEYXRhQ2xvbmVFcnJvcjogXCJUaGUgZGF0YSBiZWluZyBzdG9yZWQgY291bGQgbm90IGJlIGNsb25lZCBieSB0aGUgaW50ZXJuYWwgc3RydWN0dXJlZCBjbG9uaW5nIGFsZ29yaXRobS5cIixcbiAgICBEYXRhRXJyb3I6IFwiRGF0YSBwcm92aWRlZCB0byBhbiBvcGVyYXRpb24gZG9lcyBub3QgbWVldCByZXF1aXJlbWVudHMuXCIsXG4gICAgSW52YWxpZEFjY2Vzc0Vycm9yOiBcIkFuIGludmFsaWQgb3BlcmF0aW9uIHdhcyBwZXJmb3JtZWQgb24gYW4gb2JqZWN0LiBGb3IgZXhhbXBsZSB0cmFuc2FjdGlvbiBjcmVhdGlvbiBhdHRlbXB0IHdhcyBtYWRlLCBidXQgYW4gZW1wdHkgc2NvcGUgd2FzIHByb3ZpZGVkLlwiLFxuICAgIEludmFsaWRTdGF0ZUVycm9yOiBcIkFuIG9wZXJhdGlvbiB3YXMgY2FsbGVkIG9uIGFuIG9iamVjdCBvbiB3aGljaCBpdCBpcyBub3QgYWxsb3dlZCBvciBhdCBhIHRpbWUgd2hlbiBpdCBpcyBub3QgYWxsb3dlZC4gQWxzbyBvY2N1cnMgaWYgYSByZXF1ZXN0IGlzIG1hZGUgb24gYSBzb3VyY2Ugb2JqZWN0IHRoYXQgaGFzIGJlZW4gZGVsZXRlZCBvciByZW1vdmVkLiBVc2UgVHJhbnNhY3Rpb25JbmFjdGl2ZUVycm9yIG9yIFJlYWRPbmx5RXJyb3Igd2hlbiBwb3NzaWJsZSwgYXMgdGhleSBhcmUgbW9yZSBzcGVjaWZpYyB2YXJpYXRpb25zIG9mIEludmFsaWRTdGF0ZUVycm9yLlwiLFxuICAgIE5vdEZvdW5kRXJyb3I6IFwiVGhlIG9wZXJhdGlvbiBmYWlsZWQgYmVjYXVzZSB0aGUgcmVxdWVzdGVkIGRhdGFiYXNlIG9iamVjdCBjb3VsZCBub3QgYmUgZm91bmQuIEZvciBleGFtcGxlLCBhbiBvYmplY3Qgc3RvcmUgZGlkIG5vdCBleGlzdCBidXQgd2FzIGJlaW5nIG9wZW5lZC5cIixcbiAgICBSZWFkT25seUVycm9yOiAnVGhlIG11dGF0aW5nIG9wZXJhdGlvbiB3YXMgYXR0ZW1wdGVkIGluIGEgXCJyZWFkb25seVwiIHRyYW5zYWN0aW9uLicsXG4gICAgVHJhbnNhY3Rpb25JbmFjdGl2ZUVycm9yOiBcIkEgcmVxdWVzdCB3YXMgcGxhY2VkIGFnYWluc3QgYSB0cmFuc2FjdGlvbiB3aGljaCBpcyBjdXJyZW50bHkgbm90IGFjdGl2ZSwgb3Igd2hpY2ggaXMgZmluaXNoZWQuXCIsXG4gICAgVmVyc2lvbkVycm9yOiBcIkFuIGF0dGVtcHQgd2FzIG1hZGUgdG8gb3BlbiBhIGRhdGFiYXNlIHVzaW5nIGEgbG93ZXIgdmVyc2lvbiB0aGFuIHRoZSBleGlzdGluZyB2ZXJzaW9uLlwiLFxufTtcbnZhciBBYm9ydEVycm9yID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhBYm9ydEVycm9yLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIEFib3J0RXJyb3IobWVzc2FnZSkge1xuICAgICAgICBpZiAobWVzc2FnZSA9PT0gdm9pZCAwKSB7IG1lc3NhZ2UgPSBtZXNzYWdlcy5BYm9ydEVycm9yOyB9XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMpIHx8IHRoaXM7XG4gICAgICAgIF90aGlzLm5hbWUgPSBcIkFib3J0RXJyb3JcIjtcbiAgICAgICAgX3RoaXMubWVzc2FnZSA9IG1lc3NhZ2U7XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgcmV0dXJuIEFib3J0RXJyb3I7XG59KEVycm9yKSk7XG5leHBvcnRzLkFib3J0RXJyb3IgPSBBYm9ydEVycm9yO1xudmFyIENvbnN0cmFpbnRFcnJvciA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoQ29uc3RyYWludEVycm9yLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIENvbnN0cmFpbnRFcnJvcihtZXNzYWdlKSB7XG4gICAgICAgIGlmIChtZXNzYWdlID09PSB2b2lkIDApIHsgbWVzc2FnZSA9IG1lc3NhZ2VzLkNvbnN0cmFpbnRFcnJvcjsgfVxuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzKSB8fCB0aGlzO1xuICAgICAgICBfdGhpcy5uYW1lID0gXCJDb25zdHJhaW50RXJyb3JcIjtcbiAgICAgICAgX3RoaXMubWVzc2FnZSA9IG1lc3NhZ2U7XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgcmV0dXJuIENvbnN0cmFpbnRFcnJvcjtcbn0oRXJyb3IpKTtcbmV4cG9ydHMuQ29uc3RyYWludEVycm9yID0gQ29uc3RyYWludEVycm9yO1xudmFyIERhdGFDbG9uZUVycm9yID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhEYXRhQ2xvbmVFcnJvciwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBEYXRhQ2xvbmVFcnJvcihtZXNzYWdlKSB7XG4gICAgICAgIGlmIChtZXNzYWdlID09PSB2b2lkIDApIHsgbWVzc2FnZSA9IG1lc3NhZ2VzLkRhdGFDbG9uZUVycm9yOyB9XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMpIHx8IHRoaXM7XG4gICAgICAgIF90aGlzLm5hbWUgPSBcIkRhdGFDbG9uZUVycm9yXCI7XG4gICAgICAgIF90aGlzLm1lc3NhZ2UgPSBtZXNzYWdlO1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIHJldHVybiBEYXRhQ2xvbmVFcnJvcjtcbn0oRXJyb3IpKTtcbmV4cG9ydHMuRGF0YUNsb25lRXJyb3IgPSBEYXRhQ2xvbmVFcnJvcjtcbnZhciBEYXRhRXJyb3IgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKERhdGFFcnJvciwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBEYXRhRXJyb3IobWVzc2FnZSkge1xuICAgICAgICBpZiAobWVzc2FnZSA9PT0gdm9pZCAwKSB7IG1lc3NhZ2UgPSBtZXNzYWdlcy5EYXRhRXJyb3I7IH1cbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcykgfHwgdGhpcztcbiAgICAgICAgX3RoaXMubmFtZSA9IFwiRGF0YUVycm9yXCI7XG4gICAgICAgIF90aGlzLm1lc3NhZ2UgPSBtZXNzYWdlO1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIHJldHVybiBEYXRhRXJyb3I7XG59KEVycm9yKSk7XG5leHBvcnRzLkRhdGFFcnJvciA9IERhdGFFcnJvcjtcbnZhciBJbnZhbGlkQWNjZXNzRXJyb3IgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKEludmFsaWRBY2Nlc3NFcnJvciwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBJbnZhbGlkQWNjZXNzRXJyb3IobWVzc2FnZSkge1xuICAgICAgICBpZiAobWVzc2FnZSA9PT0gdm9pZCAwKSB7IG1lc3NhZ2UgPSBtZXNzYWdlcy5JbnZhbGlkQWNjZXNzRXJyb3I7IH1cbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcykgfHwgdGhpcztcbiAgICAgICAgX3RoaXMubmFtZSA9IFwiSW52YWxpZEFjY2Vzc0Vycm9yXCI7XG4gICAgICAgIF90aGlzLm1lc3NhZ2UgPSBtZXNzYWdlO1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIHJldHVybiBJbnZhbGlkQWNjZXNzRXJyb3I7XG59KEVycm9yKSk7XG5leHBvcnRzLkludmFsaWRBY2Nlc3NFcnJvciA9IEludmFsaWRBY2Nlc3NFcnJvcjtcbnZhciBJbnZhbGlkU3RhdGVFcnJvciA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoSW52YWxpZFN0YXRlRXJyb3IsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gSW52YWxpZFN0YXRlRXJyb3IobWVzc2FnZSkge1xuICAgICAgICBpZiAobWVzc2FnZSA9PT0gdm9pZCAwKSB7IG1lc3NhZ2UgPSBtZXNzYWdlcy5JbnZhbGlkU3RhdGVFcnJvcjsgfVxuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzKSB8fCB0aGlzO1xuICAgICAgICBfdGhpcy5uYW1lID0gXCJJbnZhbGlkU3RhdGVFcnJvclwiO1xuICAgICAgICBfdGhpcy5tZXNzYWdlID0gbWVzc2FnZTtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICByZXR1cm4gSW52YWxpZFN0YXRlRXJyb3I7XG59KEVycm9yKSk7XG5leHBvcnRzLkludmFsaWRTdGF0ZUVycm9yID0gSW52YWxpZFN0YXRlRXJyb3I7XG52YXIgTm90Rm91bmRFcnJvciA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoTm90Rm91bmRFcnJvciwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBOb3RGb3VuZEVycm9yKG1lc3NhZ2UpIHtcbiAgICAgICAgaWYgKG1lc3NhZ2UgPT09IHZvaWQgMCkgeyBtZXNzYWdlID0gbWVzc2FnZXMuTm90Rm91bmRFcnJvcjsgfVxuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzKSB8fCB0aGlzO1xuICAgICAgICBfdGhpcy5uYW1lID0gXCJOb3RGb3VuZEVycm9yXCI7XG4gICAgICAgIF90aGlzLm1lc3NhZ2UgPSBtZXNzYWdlO1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIHJldHVybiBOb3RGb3VuZEVycm9yO1xufShFcnJvcikpO1xuZXhwb3J0cy5Ob3RGb3VuZEVycm9yID0gTm90Rm91bmRFcnJvcjtcbnZhciBSZWFkT25seUVycm9yID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhSZWFkT25seUVycm9yLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIFJlYWRPbmx5RXJyb3IobWVzc2FnZSkge1xuICAgICAgICBpZiAobWVzc2FnZSA9PT0gdm9pZCAwKSB7IG1lc3NhZ2UgPSBtZXNzYWdlcy5SZWFkT25seUVycm9yOyB9XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMpIHx8IHRoaXM7XG4gICAgICAgIF90aGlzLm5hbWUgPSBcIlJlYWRPbmx5RXJyb3JcIjtcbiAgICAgICAgX3RoaXMubWVzc2FnZSA9IG1lc3NhZ2U7XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgcmV0dXJuIFJlYWRPbmx5RXJyb3I7XG59KEVycm9yKSk7XG5leHBvcnRzLlJlYWRPbmx5RXJyb3IgPSBSZWFkT25seUVycm9yO1xudmFyIFRyYW5zYWN0aW9uSW5hY3RpdmVFcnJvciA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoVHJhbnNhY3Rpb25JbmFjdGl2ZUVycm9yLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIFRyYW5zYWN0aW9uSW5hY3RpdmVFcnJvcihtZXNzYWdlKSB7XG4gICAgICAgIGlmIChtZXNzYWdlID09PSB2b2lkIDApIHsgbWVzc2FnZSA9IG1lc3NhZ2VzLlRyYW5zYWN0aW9uSW5hY3RpdmVFcnJvcjsgfVxuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzKSB8fCB0aGlzO1xuICAgICAgICBfdGhpcy5uYW1lID0gXCJUcmFuc2FjdGlvbkluYWN0aXZlRXJyb3JcIjtcbiAgICAgICAgX3RoaXMubWVzc2FnZSA9IG1lc3NhZ2U7XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgcmV0dXJuIFRyYW5zYWN0aW9uSW5hY3RpdmVFcnJvcjtcbn0oRXJyb3IpKTtcbmV4cG9ydHMuVHJhbnNhY3Rpb25JbmFjdGl2ZUVycm9yID0gVHJhbnNhY3Rpb25JbmFjdGl2ZUVycm9yO1xudmFyIFZlcnNpb25FcnJvciA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoVmVyc2lvbkVycm9yLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIFZlcnNpb25FcnJvcihtZXNzYWdlKSB7XG4gICAgICAgIGlmIChtZXNzYWdlID09PSB2b2lkIDApIHsgbWVzc2FnZSA9IG1lc3NhZ2VzLlZlcnNpb25FcnJvcjsgfVxuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzKSB8fCB0aGlzO1xuICAgICAgICBfdGhpcy5uYW1lID0gXCJWZXJzaW9uRXJyb3JcIjtcbiAgICAgICAgX3RoaXMubWVzc2FnZSA9IG1lc3NhZ2U7XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgcmV0dXJuIFZlcnNpb25FcnJvcjtcbn0oRXJyb3IpKTtcbmV4cG9ydHMuVmVyc2lvbkVycm9yID0gVmVyc2lvbkVycm9yO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvZmFrZS1pbmRleGVkZGIvYnVpbGQvbGliL2Vycm9ycy5qc1xuLy8gbW9kdWxlIGlkID0gMThcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgZXJyb3JzXzEgPSByZXF1aXJlKFwiLi9lcnJvcnNcIik7XG4vLyBodHRwczovL3czYy5naXRodWIuaW8vSW5kZXhlZERCLyNjb252ZXJ0LWEtdmFsdWUtdG8tYS1pbnB1dFxudmFyIHZhbHVlVG9LZXkgPSBmdW5jdGlvbiAoaW5wdXQsIHNlZW4pIHtcbiAgICBpZiAodHlwZW9mIGlucHV0ID09PSBcIm51bWJlclwiKSB7XG4gICAgICAgIGlmIChpc05hTihpbnB1dCkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBlcnJvcnNfMS5EYXRhRXJyb3IoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gaW5wdXQ7XG4gICAgfVxuICAgIGVsc2UgaWYgKGlucHV0IGluc3RhbmNlb2YgRGF0ZSkge1xuICAgICAgICB2YXIgbXMgPSBpbnB1dC52YWx1ZU9mKCk7XG4gICAgICAgIGlmIChpc05hTihtcykpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBlcnJvcnNfMS5EYXRhRXJyb3IoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmV3IERhdGUobXMpO1xuICAgIH1cbiAgICBlbHNlIGlmICh0eXBlb2YgaW5wdXQgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgcmV0dXJuIGlucHV0O1xuICAgIH1cbiAgICBlbHNlIGlmIChpbnB1dCBpbnN0YW5jZW9mIEFycmF5QnVmZmVyIHx8XG4gICAgICAgICh0eXBlb2YgQXJyYXlCdWZmZXIgIT09IFwidW5kZWZpbmVkXCIgJiZcbiAgICAgICAgICAgIEFycmF5QnVmZmVyLmlzVmlldyAmJlxuICAgICAgICAgICAgQXJyYXlCdWZmZXIuaXNWaWV3KGlucHV0KSkpIHtcbiAgICAgICAgaWYgKGlucHV0IGluc3RhbmNlb2YgQXJyYXlCdWZmZXIpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgVWludDhBcnJheShpbnB1dCkuYnVmZmVyO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuZXcgVWludDhBcnJheShpbnB1dC5idWZmZXIpLmJ1ZmZlcjtcbiAgICB9XG4gICAgZWxzZSBpZiAoQXJyYXkuaXNBcnJheShpbnB1dCkpIHtcbiAgICAgICAgaWYgKHNlZW4gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgc2VlbiA9IG5ldyBTZXQoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChzZWVuLmhhcyhpbnB1dCkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBlcnJvcnNfMS5EYXRhRXJyb3IoKTtcbiAgICAgICAgfVxuICAgICAgICBzZWVuLmFkZChpbnB1dCk7XG4gICAgICAgIHZhciBrZXlzID0gW107XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgaW5wdXQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHZhciBob3AgPSBpbnB1dC5oYXNPd25Qcm9wZXJ0eShpKTtcbiAgICAgICAgICAgIGlmICghaG9wKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IGVycm9yc18xLkRhdGFFcnJvcigpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIGVudHJ5ID0gaW5wdXRbaV07XG4gICAgICAgICAgICB2YXIga2V5ID0gdmFsdWVUb0tleShlbnRyeSwgc2Vlbik7XG4gICAgICAgICAgICBrZXlzLnB1c2goa2V5KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4ga2V5cztcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHRocm93IG5ldyBlcnJvcnNfMS5EYXRhRXJyb3IoKTtcbiAgICB9XG59O1xuZXhwb3J0cy5kZWZhdWx0ID0gdmFsdWVUb0tleTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2Zha2UtaW5kZXhlZGRiL2J1aWxkL2xpYi92YWx1ZVRvS2V5LmpzXG4vLyBtb2R1bGUgaWQgPSAxOVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgZztcclxuXHJcbi8vIFRoaXMgd29ya3MgaW4gbm9uLXN0cmljdCBtb2RlXHJcbmcgPSAoZnVuY3Rpb24oKSB7XHJcblx0cmV0dXJuIHRoaXM7XHJcbn0pKCk7XHJcblxyXG50cnkge1xyXG5cdC8vIFRoaXMgd29ya3MgaWYgZXZhbCBpcyBhbGxvd2VkIChzZWUgQ1NQKVxyXG5cdGcgPSBnIHx8IEZ1bmN0aW9uKFwicmV0dXJuIHRoaXNcIikoKSB8fCAoMSxldmFsKShcInRoaXNcIik7XHJcbn0gY2F0Y2goZSkge1xyXG5cdC8vIFRoaXMgd29ya3MgaWYgdGhlIHdpbmRvdyByZWZlcmVuY2UgaXMgYXZhaWxhYmxlXHJcblx0aWYodHlwZW9mIHdpbmRvdyA9PT0gXCJvYmplY3RcIilcclxuXHRcdGcgPSB3aW5kb3c7XHJcbn1cclxuXHJcbi8vIGcgY2FuIHN0aWxsIGJlIHVuZGVmaW5lZCwgYnV0IG5vdGhpbmcgdG8gZG8gYWJvdXQgaXQuLi5cclxuLy8gV2UgcmV0dXJuIHVuZGVmaW5lZCwgaW5zdGVhZCBvZiBub3RoaW5nIGhlcmUsIHNvIGl0J3NcclxuLy8gZWFzaWVyIHRvIGhhbmRsZSB0aGlzIGNhc2UuIGlmKCFnbG9iYWwpIHsgLi4ufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBnO1xyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAod2VicGFjaykvYnVpbGRpbi9nbG9iYWwuanNcbi8vIG1vZHVsZSBpZCA9IDIwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIGNtcF8xID0gcmVxdWlyZShcIi4vbGliL2NtcFwiKTtcbnZhciBlcnJvcnNfMSA9IHJlcXVpcmUoXCIuL2xpYi9lcnJvcnNcIik7XG52YXIgdmFsdWVUb0tleV8xID0gcmVxdWlyZShcIi4vbGliL3ZhbHVlVG9LZXlcIik7XG4vLyBodHRwOi8vd3d3LnczLm9yZy9UUi8yMDE1L1JFQy1JbmRleGVkREItMjAxNTAxMDgvI3JhbmdlLWNvbmNlcHRcbnZhciBGREJLZXlSYW5nZSA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBGREJLZXlSYW5nZShsb3dlciwgdXBwZXIsIGxvd2VyT3BlbiwgdXBwZXJPcGVuKSB7XG4gICAgICAgIHRoaXMubG93ZXIgPSBsb3dlcjtcbiAgICAgICAgdGhpcy51cHBlciA9IHVwcGVyO1xuICAgICAgICB0aGlzLmxvd2VyT3BlbiA9IGxvd2VyT3BlbjtcbiAgICAgICAgdGhpcy51cHBlck9wZW4gPSB1cHBlck9wZW47XG4gICAgfVxuICAgIEZEQktleVJhbmdlLm9ubHkgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoKTtcbiAgICAgICAgfVxuICAgICAgICB2YWx1ZSA9IHZhbHVlVG9LZXlfMS5kZWZhdWx0KHZhbHVlKTtcbiAgICAgICAgcmV0dXJuIG5ldyBGREJLZXlSYW5nZSh2YWx1ZSwgdmFsdWUsIGZhbHNlLCBmYWxzZSk7XG4gICAgfTtcbiAgICBGREJLZXlSYW5nZS5sb3dlckJvdW5kID0gZnVuY3Rpb24gKGxvd2VyLCBvcGVuKSB7XG4gICAgICAgIGlmIChvcGVuID09PSB2b2lkIDApIHsgb3BlbiA9IGZhbHNlOyB9XG4gICAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCk7XG4gICAgICAgIH1cbiAgICAgICAgbG93ZXIgPSB2YWx1ZVRvS2V5XzEuZGVmYXVsdChsb3dlcik7XG4gICAgICAgIHJldHVybiBuZXcgRkRCS2V5UmFuZ2UobG93ZXIsIHVuZGVmaW5lZCwgb3BlbiwgdHJ1ZSk7XG4gICAgfTtcbiAgICBGREJLZXlSYW5nZS51cHBlckJvdW5kID0gZnVuY3Rpb24gKHVwcGVyLCBvcGVuKSB7XG4gICAgICAgIGlmIChvcGVuID09PSB2b2lkIDApIHsgb3BlbiA9IGZhbHNlOyB9XG4gICAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCk7XG4gICAgICAgIH1cbiAgICAgICAgdXBwZXIgPSB2YWx1ZVRvS2V5XzEuZGVmYXVsdCh1cHBlcik7XG4gICAgICAgIHJldHVybiBuZXcgRkRCS2V5UmFuZ2UodW5kZWZpbmVkLCB1cHBlciwgdHJ1ZSwgb3Blbik7XG4gICAgfTtcbiAgICBGREJLZXlSYW5nZS5ib3VuZCA9IGZ1bmN0aW9uIChsb3dlciwgdXBwZXIsIGxvd2VyT3BlbiwgdXBwZXJPcGVuKSB7XG4gICAgICAgIGlmIChsb3dlck9wZW4gPT09IHZvaWQgMCkgeyBsb3dlck9wZW4gPSBmYWxzZTsgfVxuICAgICAgICBpZiAodXBwZXJPcGVuID09PSB2b2lkIDApIHsgdXBwZXJPcGVuID0gZmFsc2U7IH1cbiAgICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPCAyKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGNtcFJlc3VsdCA9IGNtcF8xLmRlZmF1bHQobG93ZXIsIHVwcGVyKTtcbiAgICAgICAgaWYgKGNtcFJlc3VsdCA9PT0gMSB8fCAoY21wUmVzdWx0ID09PSAwICYmIChsb3dlck9wZW4gfHwgdXBwZXJPcGVuKSkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBlcnJvcnNfMS5EYXRhRXJyb3IoKTtcbiAgICAgICAgfVxuICAgICAgICBsb3dlciA9IHZhbHVlVG9LZXlfMS5kZWZhdWx0KGxvd2VyKTtcbiAgICAgICAgdXBwZXIgPSB2YWx1ZVRvS2V5XzEuZGVmYXVsdCh1cHBlcik7XG4gICAgICAgIHJldHVybiBuZXcgRkRCS2V5UmFuZ2UobG93ZXIsIHVwcGVyLCBsb3dlck9wZW4sIHVwcGVyT3Blbik7XG4gICAgfTtcbiAgICAvLyBodHRwczovL3czYy5naXRodWIuaW8vSW5kZXhlZERCLyNkb20taWRia2V5cmFuZ2UtaW5jbHVkZXNcbiAgICBGREJLZXlSYW5nZS5wcm90b3R5cGUuaW5jbHVkZXMgPSBmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCk7XG4gICAgICAgIH1cbiAgICAgICAga2V5ID0gdmFsdWVUb0tleV8xLmRlZmF1bHQoa2V5KTtcbiAgICAgICAgaWYgKHRoaXMubG93ZXIgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdmFyIGNtcFJlc3VsdCA9IGNtcF8xLmRlZmF1bHQodGhpcy5sb3dlciwga2V5KTtcbiAgICAgICAgICAgIGlmIChjbXBSZXN1bHQgPT09IDEgfHwgKGNtcFJlc3VsdCA9PT0gMCAmJiB0aGlzLmxvd2VyT3BlbikpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMudXBwZXIgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdmFyIGNtcFJlc3VsdCA9IGNtcF8xLmRlZmF1bHQodGhpcy51cHBlciwga2V5KTtcbiAgICAgICAgICAgIGlmIChjbXBSZXN1bHQgPT09IC0xIHx8IChjbXBSZXN1bHQgPT09IDAgJiYgdGhpcy51cHBlck9wZW4pKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH07XG4gICAgRkRCS2V5UmFuZ2UucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gXCJbb2JqZWN0IElEQktleVJhbmdlXVwiO1xuICAgIH07XG4gICAgcmV0dXJuIEZEQktleVJhbmdlO1xufSgpKTtcbmV4cG9ydHMuZGVmYXVsdCA9IEZEQktleVJhbmdlO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvZmFrZS1pbmRleGVkZGIvYnVpbGQvRkRCS2V5UmFuZ2UuanNcbi8vIG1vZHVsZSBpZCA9IDIxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBleHRlbmRTdGF0aWNzID0gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxuICAgICAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxuICAgICAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XG4gICAgICAgIHJldHVybiBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgIH07XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG4gICAgfTtcbn0pKCk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgZXJyb3JzXzEgPSByZXF1aXJlKFwiLi9saWIvZXJyb3JzXCIpO1xudmFyIEZha2VFdmVudFRhcmdldF8xID0gcmVxdWlyZShcIi4vbGliL0Zha2VFdmVudFRhcmdldFwiKTtcbnZhciBGREJSZXF1ZXN0ID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhGREJSZXF1ZXN0LCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIEZEQlJlcXVlc3QoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlciAhPT0gbnVsbCAmJiBfc3VwZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKSB8fCB0aGlzO1xuICAgICAgICBfdGhpcy5fcmVzdWx0ID0gbnVsbDtcbiAgICAgICAgX3RoaXMuX2Vycm9yID0gbnVsbDtcbiAgICAgICAgX3RoaXMuc291cmNlID0gbnVsbDtcbiAgICAgICAgX3RoaXMudHJhbnNhY3Rpb24gPSBudWxsO1xuICAgICAgICBfdGhpcy5yZWFkeVN0YXRlID0gXCJwZW5kaW5nXCI7XG4gICAgICAgIF90aGlzLm9uc3VjY2VzcyA9IG51bGw7XG4gICAgICAgIF90aGlzLm9uZXJyb3IgPSBudWxsO1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShGREJSZXF1ZXN0LnByb3RvdHlwZSwgXCJlcnJvclwiLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKHRoaXMucmVhZHlTdGF0ZSA9PT0gXCJwZW5kaW5nXCIpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgZXJyb3JzXzEuSW52YWxpZFN0YXRlRXJyb3IoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9lcnJvcjtcbiAgICAgICAgfSxcbiAgICAgICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuX2Vycm9yID0gdmFsdWU7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShGREJSZXF1ZXN0LnByb3RvdHlwZSwgXCJyZXN1bHRcIiwge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnJlYWR5U3RhdGUgPT09IFwicGVuZGluZ1wiKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IGVycm9yc18xLkludmFsaWRTdGF0ZUVycm9yKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fcmVzdWx0O1xuICAgICAgICB9LFxuICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5fcmVzdWx0ID0gdmFsdWU7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIEZEQlJlcXVlc3QucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gXCJbb2JqZWN0IElEQlJlcXVlc3RdXCI7XG4gICAgfTtcbiAgICByZXR1cm4gRkRCUmVxdWVzdDtcbn0oRmFrZUV2ZW50VGFyZ2V0XzEuZGVmYXVsdCkpO1xuZXhwb3J0cy5kZWZhdWx0ID0gRkRCUmVxdWVzdDtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2Zha2UtaW5kZXhlZGRiL2J1aWxkL0ZEQlJlcXVlc3QuanNcbi8vIG1vZHVsZSBpZCA9IDIyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBzY29wZSA9ICh0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiICYmIGdsb2JhbCkgfHxcbiAgICAgICAgICAgICh0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiAmJiBzZWxmKSB8fFxuICAgICAgICAgICAgd2luZG93O1xudmFyIGFwcGx5ID0gRnVuY3Rpb24ucHJvdG90eXBlLmFwcGx5O1xuXG4vLyBET00gQVBJcywgZm9yIGNvbXBsZXRlbmVzc1xuXG5leHBvcnRzLnNldFRpbWVvdXQgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIG5ldyBUaW1lb3V0KGFwcGx5LmNhbGwoc2V0VGltZW91dCwgc2NvcGUsIGFyZ3VtZW50cyksIGNsZWFyVGltZW91dCk7XG59O1xuZXhwb3J0cy5zZXRJbnRlcnZhbCA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gbmV3IFRpbWVvdXQoYXBwbHkuY2FsbChzZXRJbnRlcnZhbCwgc2NvcGUsIGFyZ3VtZW50cyksIGNsZWFySW50ZXJ2YWwpO1xufTtcbmV4cG9ydHMuY2xlYXJUaW1lb3V0ID1cbmV4cG9ydHMuY2xlYXJJbnRlcnZhbCA9IGZ1bmN0aW9uKHRpbWVvdXQpIHtcbiAgaWYgKHRpbWVvdXQpIHtcbiAgICB0aW1lb3V0LmNsb3NlKCk7XG4gIH1cbn07XG5cbmZ1bmN0aW9uIFRpbWVvdXQoaWQsIGNsZWFyRm4pIHtcbiAgdGhpcy5faWQgPSBpZDtcbiAgdGhpcy5fY2xlYXJGbiA9IGNsZWFyRm47XG59XG5UaW1lb3V0LnByb3RvdHlwZS51bnJlZiA9IFRpbWVvdXQucHJvdG90eXBlLnJlZiA9IGZ1bmN0aW9uKCkge307XG5UaW1lb3V0LnByb3RvdHlwZS5jbG9zZSA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLl9jbGVhckZuLmNhbGwoc2NvcGUsIHRoaXMuX2lkKTtcbn07XG5cbi8vIERvZXMgbm90IHN0YXJ0IHRoZSB0aW1lLCBqdXN0IHNldHMgdXAgdGhlIG1lbWJlcnMgbmVlZGVkLlxuZXhwb3J0cy5lbnJvbGwgPSBmdW5jdGlvbihpdGVtLCBtc2Vjcykge1xuICBjbGVhclRpbWVvdXQoaXRlbS5faWRsZVRpbWVvdXRJZCk7XG4gIGl0ZW0uX2lkbGVUaW1lb3V0ID0gbXNlY3M7XG59O1xuXG5leHBvcnRzLnVuZW5yb2xsID0gZnVuY3Rpb24oaXRlbSkge1xuICBjbGVhclRpbWVvdXQoaXRlbS5faWRsZVRpbWVvdXRJZCk7XG4gIGl0ZW0uX2lkbGVUaW1lb3V0ID0gLTE7XG59O1xuXG5leHBvcnRzLl91bnJlZkFjdGl2ZSA9IGV4cG9ydHMuYWN0aXZlID0gZnVuY3Rpb24oaXRlbSkge1xuICBjbGVhclRpbWVvdXQoaXRlbS5faWRsZVRpbWVvdXRJZCk7XG5cbiAgdmFyIG1zZWNzID0gaXRlbS5faWRsZVRpbWVvdXQ7XG4gIGlmIChtc2VjcyA+PSAwKSB7XG4gICAgaXRlbS5faWRsZVRpbWVvdXRJZCA9IHNldFRpbWVvdXQoZnVuY3Rpb24gb25UaW1lb3V0KCkge1xuICAgICAgaWYgKGl0ZW0uX29uVGltZW91dClcbiAgICAgICAgaXRlbS5fb25UaW1lb3V0KCk7XG4gICAgfSwgbXNlY3MpO1xuICB9XG59O1xuXG4vLyBzZXRpbW1lZGlhdGUgYXR0YWNoZXMgaXRzZWxmIHRvIHRoZSBnbG9iYWwgb2JqZWN0XG5yZXF1aXJlKFwic2V0aW1tZWRpYXRlXCIpO1xuLy8gT24gc29tZSBleG90aWMgZW52aXJvbm1lbnRzLCBpdCdzIG5vdCBjbGVhciB3aGljaCBvYmplY3QgYHNldGltbWVkaWF0ZWAgd2FzXG4vLyBhYmxlIHRvIGluc3RhbGwgb250by4gIFNlYXJjaCBlYWNoIHBvc3NpYmlsaXR5IGluIHRoZSBzYW1lIG9yZGVyIGFzIHRoZVxuLy8gYHNldGltbWVkaWF0ZWAgbGlicmFyeS5cbmV4cG9ydHMuc2V0SW1tZWRpYXRlID0gKHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiICYmIHNlbGYuc2V0SW1tZWRpYXRlKSB8fFxuICAgICAgICAgICAgICAgICAgICAgICAodHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiAmJiBnbG9iYWwuc2V0SW1tZWRpYXRlKSB8fFxuICAgICAgICAgICAgICAgICAgICAgICAodGhpcyAmJiB0aGlzLnNldEltbWVkaWF0ZSk7XG5leHBvcnRzLmNsZWFySW1tZWRpYXRlID0gKHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiICYmIHNlbGYuY2xlYXJJbW1lZGlhdGUpIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICAgKHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgJiYgZ2xvYmFsLmNsZWFySW1tZWRpYXRlKSB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgICh0aGlzICYmIHRoaXMuY2xlYXJJbW1lZGlhdGUpO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gKHdlYnBhY2spL25vZGVfbW9kdWxlcy90aW1lcnMtYnJvd3NlcmlmeS9tYWluLmpzXG4vLyBtb2R1bGUgaWQgPSAyM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX3ZhbHVlcyA9ICh0aGlzICYmIHRoaXMuX192YWx1ZXMpIHx8IGZ1bmN0aW9uKG8pIHtcbiAgICB2YXIgcyA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBTeW1ib2wuaXRlcmF0b3IsIG0gPSBzICYmIG9bc10sIGkgPSAwO1xuICAgIGlmIChtKSByZXR1cm4gbS5jYWxsKG8pO1xuICAgIGlmIChvICYmIHR5cGVvZiBvLmxlbmd0aCA9PT0gXCJudW1iZXJcIikgcmV0dXJuIHtcbiAgICAgICAgbmV4dDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKG8gJiYgaSA+PSBvLmxlbmd0aCkgbyA9IHZvaWQgMDtcbiAgICAgICAgICAgIHJldHVybiB7IHZhbHVlOiBvICYmIG9baSsrXSwgZG9uZTogIW8gfTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihzID8gXCJPYmplY3QgaXMgbm90IGl0ZXJhYmxlLlwiIDogXCJTeW1ib2wuaXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBGREJLZXlSYW5nZV8xID0gcmVxdWlyZShcIi4vRkRCS2V5UmFuZ2VcIik7XG52YXIgRkRCT2JqZWN0U3RvcmVfMSA9IHJlcXVpcmUoXCIuL0ZEQk9iamVjdFN0b3JlXCIpO1xudmFyIGNtcF8xID0gcmVxdWlyZShcIi4vbGliL2NtcFwiKTtcbnZhciBlcnJvcnNfMSA9IHJlcXVpcmUoXCIuL2xpYi9lcnJvcnNcIik7XG52YXIgZXh0cmFjdEtleV8xID0gcmVxdWlyZShcIi4vbGliL2V4dHJhY3RLZXlcIik7XG52YXIgc3RydWN0dXJlZENsb25lXzEgPSByZXF1aXJlKFwiLi9saWIvc3RydWN0dXJlZENsb25lXCIpO1xudmFyIHZhbHVlVG9LZXlfMSA9IHJlcXVpcmUoXCIuL2xpYi92YWx1ZVRvS2V5XCIpO1xudmFyIGdldEVmZmVjdGl2ZU9iamVjdFN0b3JlID0gZnVuY3Rpb24gKGN1cnNvcikge1xuICAgIGlmIChjdXJzb3Iuc291cmNlIGluc3RhbmNlb2YgRkRCT2JqZWN0U3RvcmVfMS5kZWZhdWx0KSB7XG4gICAgICAgIHJldHVybiBjdXJzb3Iuc291cmNlO1xuICAgIH1cbiAgICByZXR1cm4gY3Vyc29yLnNvdXJjZS5vYmplY3RTdG9yZTtcbn07XG4vLyBUaGlzIHRha2VzIGEga2V5IHJhbmdlLCBhIGxpc3Qgb2YgbG93ZXIgYm91bmRzLCBhbmQgYSBsaXN0IG9mIHVwcGVyIGJvdW5kcyBhbmQgY29tYmluZXMgdGhlbSBhbGwgaW50byBhIHNpbmdsZSBrZXlcbi8vIHJhbmdlLiBJdCBkb2VzIG5vdCBoYW5kbGUgZ3QvZ3RlIGRpc3RpbmN0aW9ucywgYmVjYXVzZSBpdCBkb2Vzbid0IHJlYWxseSBtYXR0ZXIgbXVjaCBhbnl3YXksIHNpbmNlIGZvciBuZXh0L3ByZXZcbi8vIGN1cnNvciBpdGVyYXRpb24gaXQnZCBhbHNvIGhhdmUgdG8gbG9vayBhdCB2YWx1ZXMgdG8gYmUgcHJlY2lzZSwgd2hpY2ggd291bGQgYmUgY29tcGxpY2F0ZWQuIFRoaXMgc2hvdWxkIGdldCB1cyA5OSVcbi8vIG9mIHRoZSB3YXkgdGhlcmUuXG52YXIgbWFrZUtleVJhbmdlID0gZnVuY3Rpb24gKHJhbmdlLCBsb3dlcnMsIHVwcGVycykge1xuICAgIHZhciBlXzEsIF9hLCBlXzIsIF9iO1xuICAgIC8vIFN0YXJ0IHdpdGggYm91bmRzIGZyb20gcmFuZ2VcbiAgICB2YXIgbG93ZXIgPSByYW5nZSAhPT0gdW5kZWZpbmVkID8gcmFuZ2UubG93ZXIgOiB1bmRlZmluZWQ7XG4gICAgdmFyIHVwcGVyID0gcmFuZ2UgIT09IHVuZGVmaW5lZCA/IHJhbmdlLnVwcGVyIDogdW5kZWZpbmVkO1xuICAgIHRyeSB7XG4gICAgICAgIC8vIEF1Z21lbnQgd2l0aCB2YWx1ZXMgZnJvbSBsb3dlcnMgYW5kIHVwcGVyc1xuICAgICAgICBmb3IgKHZhciBsb3dlcnNfMSA9IF9fdmFsdWVzKGxvd2VycyksIGxvd2Vyc18xXzEgPSBsb3dlcnNfMS5uZXh0KCk7ICFsb3dlcnNfMV8xLmRvbmU7IGxvd2Vyc18xXzEgPSBsb3dlcnNfMS5uZXh0KCkpIHtcbiAgICAgICAgICAgIHZhciBsb3dlclRlbXAgPSBsb3dlcnNfMV8xLnZhbHVlO1xuICAgICAgICAgICAgaWYgKGxvd2VyVGVtcCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAobG93ZXIgPT09IHVuZGVmaW5lZCB8fCBjbXBfMS5kZWZhdWx0KGxvd2VyLCBsb3dlclRlbXApID09PSAxKSB7XG4gICAgICAgICAgICAgICAgbG93ZXIgPSBsb3dlclRlbXA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgY2F0Y2ggKGVfMV8xKSB7IGVfMSA9IHsgZXJyb3I6IGVfMV8xIH07IH1cbiAgICBmaW5hbGx5IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGlmIChsb3dlcnNfMV8xICYmICFsb3dlcnNfMV8xLmRvbmUgJiYgKF9hID0gbG93ZXJzXzEucmV0dXJuKSkgX2EuY2FsbChsb3dlcnNfMSk7XG4gICAgICAgIH1cbiAgICAgICAgZmluYWxseSB7IGlmIChlXzEpIHRocm93IGVfMS5lcnJvcjsgfVxuICAgIH1cbiAgICB0cnkge1xuICAgICAgICBmb3IgKHZhciB1cHBlcnNfMSA9IF9fdmFsdWVzKHVwcGVycyksIHVwcGVyc18xXzEgPSB1cHBlcnNfMS5uZXh0KCk7ICF1cHBlcnNfMV8xLmRvbmU7IHVwcGVyc18xXzEgPSB1cHBlcnNfMS5uZXh0KCkpIHtcbiAgICAgICAgICAgIHZhciB1cHBlclRlbXAgPSB1cHBlcnNfMV8xLnZhbHVlO1xuICAgICAgICAgICAgaWYgKHVwcGVyVGVtcCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodXBwZXIgPT09IHVuZGVmaW5lZCB8fCBjbXBfMS5kZWZhdWx0KHVwcGVyLCB1cHBlclRlbXApID09PSAtMSkge1xuICAgICAgICAgICAgICAgIHVwcGVyID0gdXBwZXJUZW1wO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGNhdGNoIChlXzJfMSkgeyBlXzIgPSB7IGVycm9yOiBlXzJfMSB9OyB9XG4gICAgZmluYWxseSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBpZiAodXBwZXJzXzFfMSAmJiAhdXBwZXJzXzFfMS5kb25lICYmIChfYiA9IHVwcGVyc18xLnJldHVybikpIF9iLmNhbGwodXBwZXJzXzEpO1xuICAgICAgICB9XG4gICAgICAgIGZpbmFsbHkgeyBpZiAoZV8yKSB0aHJvdyBlXzIuZXJyb3I7IH1cbiAgICB9XG4gICAgaWYgKGxvd2VyICE9PSB1bmRlZmluZWQgJiYgdXBwZXIgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm4gRkRCS2V5UmFuZ2VfMS5kZWZhdWx0LmJvdW5kKGxvd2VyLCB1cHBlcik7XG4gICAgfVxuICAgIGlmIChsb3dlciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHVybiBGREJLZXlSYW5nZV8xLmRlZmF1bHQubG93ZXJCb3VuZChsb3dlcik7XG4gICAgfVxuICAgIGlmICh1cHBlciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHVybiBGREJLZXlSYW5nZV8xLmRlZmF1bHQudXBwZXJCb3VuZCh1cHBlcik7XG4gICAgfVxufTtcbi8vIGh0dHA6Ly93d3cudzMub3JnL1RSLzIwMTUvUkVDLUluZGV4ZWREQi0yMDE1MDEwOC8jY3Vyc29yXG52YXIgRkRCQ3Vyc29yID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIEZEQkN1cnNvcihzb3VyY2UsIHJhbmdlLCBkaXJlY3Rpb24sIHJlcXVlc3QsIGtleU9ubHkpIHtcbiAgICAgICAgaWYgKGRpcmVjdGlvbiA9PT0gdm9pZCAwKSB7IGRpcmVjdGlvbiA9IFwibmV4dFwiOyB9XG4gICAgICAgIGlmIChrZXlPbmx5ID09PSB2b2lkIDApIHsga2V5T25seSA9IGZhbHNlOyB9XG4gICAgICAgIHRoaXMuX2dvdFZhbHVlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX3Bvc2l0aW9uID0gdW5kZWZpbmVkOyAvLyBLZXkgb2YgcHJldmlvdXNseSByZXR1cm5lZCByZWNvcmRcbiAgICAgICAgdGhpcy5fb2JqZWN0U3RvcmVQb3NpdGlvbiA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5fa2V5T25seSA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9rZXkgPSB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMuX3ByaW1hcnlLZXkgPSB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMuX3JhbmdlID0gcmFuZ2U7XG4gICAgICAgIHRoaXMuX3NvdXJjZSA9IHNvdXJjZTtcbiAgICAgICAgdGhpcy5fZGlyZWN0aW9uID0gZGlyZWN0aW9uO1xuICAgICAgICB0aGlzLl9yZXF1ZXN0ID0gcmVxdWVzdDtcbiAgICAgICAgdGhpcy5fa2V5T25seSA9IGtleU9ubHk7XG4gICAgfVxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShGREJDdXJzb3IucHJvdG90eXBlLCBcInNvdXJjZVwiLCB7XG4gICAgICAgIC8vIFJlYWQgb25seSBwcm9wZXJ0aWVzXG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3NvdXJjZTtcbiAgICAgICAgfSxcbiAgICAgICAgc2V0OiBmdW5jdGlvbiAodmFsKSB7XG4gICAgICAgICAgICAvKiBGb3IgYmFiZWwgKi9cbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEZEQkN1cnNvci5wcm90b3R5cGUsIFwiZGlyZWN0aW9uXCIsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fZGlyZWN0aW9uO1xuICAgICAgICB9LFxuICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2YWwpIHtcbiAgICAgICAgICAgIC8qIEZvciBiYWJlbCAqL1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoRkRCQ3Vyc29yLnByb3RvdHlwZSwgXCJrZXlcIiwge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9rZXk7XG4gICAgICAgIH0sXG4gICAgICAgIHNldDogZnVuY3Rpb24gKHZhbCkge1xuICAgICAgICAgICAgLyogRm9yIGJhYmVsICovXG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShGREJDdXJzb3IucHJvdG90eXBlLCBcInByaW1hcnlLZXlcIiwge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9wcmltYXJ5S2V5O1xuICAgICAgICB9LFxuICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2YWwpIHtcbiAgICAgICAgICAgIC8qIEZvciBiYWJlbCAqL1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICAvLyBodHRwczovL3czYy5naXRodWIuaW8vSW5kZXhlZERCLyNpdGVyYXRlLWEtY3Vyc29yXG4gICAgRkRCQ3Vyc29yLnByb3RvdHlwZS5faXRlcmF0ZSA9IGZ1bmN0aW9uIChrZXksIHByaW1hcnlLZXkpIHtcbiAgICAgICAgdmFyIGVfMywgX2EsIGVfNCwgX2IsIGVfNSwgX2MsIGVfNiwgX2Q7XG4gICAgICAgIHZhciBzb3VyY2VJc09iamVjdFN0b3JlID0gdGhpcy5zb3VyY2UgaW5zdGFuY2VvZiBGREJPYmplY3RTdG9yZV8xLmRlZmF1bHQ7XG4gICAgICAgIC8vIENhbid0IHVzZSBzb3VyY2VJc09iamVjdFN0b3JlIGJlY2F1c2UgVHlwZVNjcmlwdFxuICAgICAgICB2YXIgcmVjb3JkcyA9IHRoaXMuc291cmNlIGluc3RhbmNlb2YgRkRCT2JqZWN0U3RvcmVfMS5kZWZhdWx0XG4gICAgICAgICAgICA/IHRoaXMuc291cmNlLl9yYXdPYmplY3RTdG9yZS5yZWNvcmRzXG4gICAgICAgICAgICA6IHRoaXMuc291cmNlLl9yYXdJbmRleC5yZWNvcmRzO1xuICAgICAgICB2YXIgZm91bmRSZWNvcmQ7XG4gICAgICAgIGlmICh0aGlzLmRpcmVjdGlvbiA9PT0gXCJuZXh0XCIpIHtcbiAgICAgICAgICAgIHZhciByYW5nZSA9IG1ha2VLZXlSYW5nZSh0aGlzLl9yYW5nZSwgW2tleSwgdGhpcy5fcG9zaXRpb25dLCBbXSk7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGZvciAodmFyIF9lID0gX192YWx1ZXMocmVjb3Jkcy52YWx1ZXMocmFuZ2UpKSwgX2YgPSBfZS5uZXh0KCk7ICFfZi5kb25lOyBfZiA9IF9lLm5leHQoKSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgcmVjb3JkID0gX2YudmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIHZhciBjbXBSZXN1bHRLZXkgPSBrZXkgIT09IHVuZGVmaW5lZCA/IGNtcF8xLmRlZmF1bHQocmVjb3JkLmtleSwga2V5KSA6IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGNtcFJlc3VsdFBvc2l0aW9uID0gdGhpcy5fcG9zaXRpb24gIT09IHVuZGVmaW5lZFxuICAgICAgICAgICAgICAgICAgICAgICAgPyBjbXBfMS5kZWZhdWx0KHJlY29yZC5rZXksIHRoaXMuX3Bvc2l0aW9uKVxuICAgICAgICAgICAgICAgICAgICAgICAgOiB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgICAgIGlmIChrZXkgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNtcFJlc3VsdEtleSA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAocHJpbWFyeUtleSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY21wUmVzdWx0S2V5ID09PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGNtcFJlc3VsdFByaW1hcnlLZXkgPSBjbXBfMS5kZWZhdWx0KHJlY29yZC52YWx1ZSwgcHJpbWFyeUtleSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY21wUmVzdWx0S2V5ID09PSAwICYmIGNtcFJlc3VsdFByaW1hcnlLZXkgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX3Bvc2l0aW9uICE9PSB1bmRlZmluZWQgJiYgc291cmNlSXNPYmplY3RTdG9yZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNtcFJlc3VsdFBvc2l0aW9uICE9PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX3Bvc2l0aW9uICE9PSB1bmRlZmluZWQgJiYgIXNvdXJjZUlzT2JqZWN0U3RvcmUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjbXBSZXN1bHRQb3NpdGlvbiA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjbXBSZXN1bHRQb3NpdGlvbiA9PT0gMCAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNtcF8xLmRlZmF1bHQocmVjb3JkLnZhbHVlLCB0aGlzLl9vYmplY3RTdG9yZVBvc2l0aW9uKSAhPT0gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9yYW5nZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuX3JhbmdlLmluY2x1ZGVzKHJlY29yZC5rZXkpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZm91bmRSZWNvcmQgPSByZWNvcmQ7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChlXzNfMSkgeyBlXzMgPSB7IGVycm9yOiBlXzNfMSB9OyB9XG4gICAgICAgICAgICBmaW5hbGx5IHtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoX2YgJiYgIV9mLmRvbmUgJiYgKF9hID0gX2UucmV0dXJuKSkgX2EuY2FsbChfZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGZpbmFsbHkgeyBpZiAoZV8zKSB0aHJvdyBlXzMuZXJyb3I7IH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0aGlzLmRpcmVjdGlvbiA9PT0gXCJuZXh0dW5pcXVlXCIpIHtcbiAgICAgICAgICAgIC8vIFRoaXMgY291bGQgYmUgZG9uZSB3aXRob3V0IGl0ZXJhdGluZywgaWYgdGhlIHJhbmdlIHdhcyBkZWZpbmVkIHNsaWdodGx5IGJldHRlciAodG8gaGFuZGxlIGd0L2d0ZSBjYXNlcykuXG4gICAgICAgICAgICAvLyBCdXQgdGhlIHBlcmZvcm1hbmNlIGRpZmZlcmVuY2Ugc2hvdWxkIGJlIHNtYWxsLCBhbmQgdGhhdCB3b3VsZG4ndCB3b3JrIGFueXdheSBmb3IgZGlyZWN0aW9ucyB3aGVyZSB0aGVcbiAgICAgICAgICAgIC8vIHZhbHVlIG5lZWRzIHRvIGJlIHVzZWQgKGxpa2UgbmV4dCBhbmQgcHJldikuXG4gICAgICAgICAgICB2YXIgcmFuZ2UgPSBtYWtlS2V5UmFuZ2UodGhpcy5fcmFuZ2UsIFtrZXksIHRoaXMuX3Bvc2l0aW9uXSwgW10pO1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBfZyA9IF9fdmFsdWVzKHJlY29yZHMudmFsdWVzKHJhbmdlKSksIF9oID0gX2cubmV4dCgpOyAhX2guZG9uZTsgX2ggPSBfZy5uZXh0KCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHJlY29yZCA9IF9oLnZhbHVlO1xuICAgICAgICAgICAgICAgICAgICBpZiAoa2V5ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjbXBfMS5kZWZhdWx0KHJlY29yZC5rZXksIGtleSkgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX3Bvc2l0aW9uICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjbXBfMS5kZWZhdWx0KHJlY29yZC5rZXksIHRoaXMuX3Bvc2l0aW9uKSAhPT0gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9yYW5nZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuX3JhbmdlLmluY2x1ZGVzKHJlY29yZC5rZXkpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZm91bmRSZWNvcmQgPSByZWNvcmQ7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChlXzRfMSkgeyBlXzQgPSB7IGVycm9yOiBlXzRfMSB9OyB9XG4gICAgICAgICAgICBmaW5hbGx5IHtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoX2ggJiYgIV9oLmRvbmUgJiYgKF9iID0gX2cucmV0dXJuKSkgX2IuY2FsbChfZyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGZpbmFsbHkgeyBpZiAoZV80KSB0aHJvdyBlXzQuZXJyb3I7IH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0aGlzLmRpcmVjdGlvbiA9PT0gXCJwcmV2XCIpIHtcbiAgICAgICAgICAgIHZhciByYW5nZSA9IG1ha2VLZXlSYW5nZSh0aGlzLl9yYW5nZSwgW10sIFtrZXksIHRoaXMuX3Bvc2l0aW9uXSk7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGZvciAodmFyIF9qID0gX192YWx1ZXMocmVjb3Jkcy52YWx1ZXMocmFuZ2UsIFwicHJldlwiKSksIF9rID0gX2oubmV4dCgpOyAhX2suZG9uZTsgX2sgPSBfai5uZXh0KCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHJlY29yZCA9IF9rLnZhbHVlO1xuICAgICAgICAgICAgICAgICAgICB2YXIgY21wUmVzdWx0S2V5ID0ga2V5ICE9PSB1bmRlZmluZWQgPyBjbXBfMS5kZWZhdWx0KHJlY29yZC5rZXksIGtleSkgOiB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgICAgIHZhciBjbXBSZXN1bHRQb3NpdGlvbiA9IHRoaXMuX3Bvc2l0aW9uICE9PSB1bmRlZmluZWRcbiAgICAgICAgICAgICAgICAgICAgICAgID8gY21wXzEuZGVmYXVsdChyZWNvcmQua2V5LCB0aGlzLl9wb3NpdGlvbilcbiAgICAgICAgICAgICAgICAgICAgICAgIDogdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgICAgICBpZiAoa2V5ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjbXBSZXN1bHRLZXkgPT09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAocHJpbWFyeUtleSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY21wUmVzdWx0S2V5ID09PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgY21wUmVzdWx0UHJpbWFyeUtleSA9IGNtcF8xLmRlZmF1bHQocmVjb3JkLnZhbHVlLCBwcmltYXJ5S2V5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjbXBSZXN1bHRLZXkgPT09IDAgJiYgY21wUmVzdWx0UHJpbWFyeUtleSA9PT0gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9wb3NpdGlvbiAhPT0gdW5kZWZpbmVkICYmIHNvdXJjZUlzT2JqZWN0U3RvcmUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjbXBSZXN1bHRQb3NpdGlvbiAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fcG9zaXRpb24gIT09IHVuZGVmaW5lZCAmJiAhc291cmNlSXNPYmplY3RTdG9yZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNtcFJlc3VsdFBvc2l0aW9uID09PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY21wUmVzdWx0UG9zaXRpb24gPT09IDAgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbXBfMS5kZWZhdWx0KHJlY29yZC52YWx1ZSwgdGhpcy5fb2JqZWN0U3RvcmVQb3NpdGlvbikgIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX3JhbmdlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5fcmFuZ2UuaW5jbHVkZXMocmVjb3JkLmtleSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBmb3VuZFJlY29yZCA9IHJlY29yZDtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGVfNV8xKSB7IGVfNSA9IHsgZXJyb3I6IGVfNV8xIH07IH1cbiAgICAgICAgICAgIGZpbmFsbHkge1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChfayAmJiAhX2suZG9uZSAmJiAoX2MgPSBfai5yZXR1cm4pKSBfYy5jYWxsKF9qKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZmluYWxseSB7IGlmIChlXzUpIHRocm93IGVfNS5lcnJvcjsgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRoaXMuZGlyZWN0aW9uID09PSBcInByZXZ1bmlxdWVcIikge1xuICAgICAgICAgICAgdmFyIHRlbXBSZWNvcmQgPSB2b2lkIDA7XG4gICAgICAgICAgICB2YXIgcmFuZ2UgPSBtYWtlS2V5UmFuZ2UodGhpcy5fcmFuZ2UsIFtdLCBba2V5LCB0aGlzLl9wb3NpdGlvbl0pO1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBfbCA9IF9fdmFsdWVzKHJlY29yZHMudmFsdWVzKHJhbmdlLCBcInByZXZcIikpLCBfbSA9IF9sLm5leHQoKTsgIV9tLmRvbmU7IF9tID0gX2wubmV4dCgpKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciByZWNvcmQgPSBfbS52YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGtleSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY21wXzEuZGVmYXVsdChyZWNvcmQua2V5LCBrZXkpID09PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX3Bvc2l0aW9uICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjbXBfMS5kZWZhdWx0KHJlY29yZC5rZXksIHRoaXMuX3Bvc2l0aW9uKSAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fcmFuZ2UgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLl9yYW5nZS5pbmNsdWRlcyhyZWNvcmQua2V5KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHRlbXBSZWNvcmQgPSByZWNvcmQ7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChlXzZfMSkgeyBlXzYgPSB7IGVycm9yOiBlXzZfMSB9OyB9XG4gICAgICAgICAgICBmaW5hbGx5IHtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoX20gJiYgIV9tLmRvbmUgJiYgKF9kID0gX2wucmV0dXJuKSkgX2QuY2FsbChfbCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGZpbmFsbHkgeyBpZiAoZV82KSB0aHJvdyBlXzYuZXJyb3I7IH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0ZW1wUmVjb3JkKSB7XG4gICAgICAgICAgICAgICAgZm91bmRSZWNvcmQgPSByZWNvcmRzLmdldCh0ZW1wUmVjb3JkLmtleSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHJlc3VsdDtcbiAgICAgICAgaWYgKCFmb3VuZFJlY29yZCkge1xuICAgICAgICAgICAgdGhpcy5fa2V5ID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgaWYgKCFzb3VyY2VJc09iamVjdFN0b3JlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fb2JqZWN0U3RvcmVQb3NpdGlvbiA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIFwidGhpcyBpbnN0YW5jZW9mIEZEQkN1cnNvcldpdGhWYWx1ZVwiIHdvdWxkIGJlIGJldHRlciBhbmQgbm90IHJlcXVpcmUgKHRoaXMgYXMgYW55KSwgYnV0IGNhdXNlcyBydW50aW1lXG4gICAgICAgICAgICAvLyBlcnJvciBkdWUgdG8gY2lyY3VsYXIgZGVwZW5kZW5jeS5cbiAgICAgICAgICAgIGlmICghdGhpcy5fa2V5T25seSAmJlxuICAgICAgICAgICAgICAgIHRoaXMuY29uc3RydWN0b3IubmFtZSA9PT0gXCJGREJDdXJzb3JXaXRoVmFsdWVcIikge1xuICAgICAgICAgICAgICAgIHRoaXMudmFsdWUgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXN1bHQgPSBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fcG9zaXRpb24gPSBmb3VuZFJlY29yZC5rZXk7XG4gICAgICAgICAgICBpZiAoIXNvdXJjZUlzT2JqZWN0U3RvcmUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9vYmplY3RTdG9yZVBvc2l0aW9uID0gZm91bmRSZWNvcmQudmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl9rZXkgPSBmb3VuZFJlY29yZC5rZXk7XG4gICAgICAgICAgICBpZiAoc291cmNlSXNPYmplY3RTdG9yZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX3ByaW1hcnlLZXkgPSBzdHJ1Y3R1cmVkQ2xvbmVfMS5kZWZhdWx0KGZvdW5kUmVjb3JkLmtleSk7XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLl9rZXlPbmx5ICYmXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29uc3RydWN0b3IubmFtZSA9PT0gXCJGREJDdXJzb3JXaXRoVmFsdWVcIikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnZhbHVlID0gc3RydWN0dXJlZENsb25lXzEuZGVmYXVsdChmb3VuZFJlY29yZC52YWx1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fcHJpbWFyeUtleSA9IHN0cnVjdHVyZWRDbG9uZV8xLmRlZmF1bHQoZm91bmRSZWNvcmQudmFsdWUpO1xuICAgICAgICAgICAgICAgIGlmICghdGhpcy5fa2V5T25seSAmJlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnN0cnVjdG9yLm5hbWUgPT09IFwiRkRCQ3Vyc29yV2l0aFZhbHVlXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc291cmNlIGluc3RhbmNlb2YgRkRCT2JqZWN0U3RvcmVfMS5kZWZhdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBDYW4ndCB1c2Ugc291cmNlSXNPYmplY3RTdG9yZSBiZWNhdXNlIFR5cGVTY3JpcHRcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlRoaXMgc2hvdWxkIG5ldmVyIGhhcHBlblwiKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB2YXIgdmFsdWUgPSB0aGlzLnNvdXJjZS5vYmplY3RTdG9yZS5fcmF3T2JqZWN0U3RvcmUuZ2V0VmFsdWUoZm91bmRSZWNvcmQudmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnZhbHVlID0gc3RydWN0dXJlZENsb25lXzEuZGVmYXVsdCh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fZ290VmFsdWUgPSB0cnVlO1xuICAgICAgICAgICAgcmVzdWx0ID0gdGhpcztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH07XG4gICAgLy8gaHR0cDovL3d3dy53My5vcmcvVFIvMjAxNS9SRUMtSW5kZXhlZERCLTIwMTUwMTA4LyN3aWRsLUlEQkN1cnNvci11cGRhdGUtSURCUmVxdWVzdC1hbnktdmFsdWVcbiAgICBGREJDdXJzb3IucHJvdG90eXBlLnVwZGF0ZSA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICBpZiAodmFsdWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcigpO1xuICAgICAgICB9XG4gICAgICAgIHZhciBlZmZlY3RpdmVPYmplY3RTdG9yZSA9IGdldEVmZmVjdGl2ZU9iamVjdFN0b3JlKHRoaXMpO1xuICAgICAgICB2YXIgZWZmZWN0aXZlS2V5ID0gdGhpcy5zb3VyY2UuaGFzT3duUHJvcGVydHkoXCJfcmF3SW5kZXhcIilcbiAgICAgICAgICAgID8gdGhpcy5wcmltYXJ5S2V5XG4gICAgICAgICAgICA6IHRoaXMuX3Bvc2l0aW9uO1xuICAgICAgICB2YXIgdHJhbnNhY3Rpb24gPSBlZmZlY3RpdmVPYmplY3RTdG9yZS50cmFuc2FjdGlvbjtcbiAgICAgICAgaWYgKHRyYW5zYWN0aW9uLl9zdGF0ZSAhPT0gXCJhY3RpdmVcIikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IGVycm9yc18xLlRyYW5zYWN0aW9uSW5hY3RpdmVFcnJvcigpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0cmFuc2FjdGlvbi5tb2RlID09PSBcInJlYWRvbmx5XCIpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBlcnJvcnNfMS5SZWFkT25seUVycm9yKCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGVmZmVjdGl2ZU9iamVjdFN0b3JlLl9yYXdPYmplY3RTdG9yZS5kZWxldGVkKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgZXJyb3JzXzEuSW52YWxpZFN0YXRlRXJyb3IoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoISh0aGlzLnNvdXJjZSBpbnN0YW5jZW9mIEZEQk9iamVjdFN0b3JlXzEuZGVmYXVsdCkgJiZcbiAgICAgICAgICAgIHRoaXMuc291cmNlLl9yYXdJbmRleC5kZWxldGVkKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgZXJyb3JzXzEuSW52YWxpZFN0YXRlRXJyb3IoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXRoaXMuX2dvdFZhbHVlIHx8ICF0aGlzLmhhc093blByb3BlcnR5KFwidmFsdWVcIikpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBlcnJvcnNfMS5JbnZhbGlkU3RhdGVFcnJvcigpO1xuICAgICAgICB9XG4gICAgICAgIHZhciBjbG9uZSA9IHN0cnVjdHVyZWRDbG9uZV8xLmRlZmF1bHQodmFsdWUpO1xuICAgICAgICBpZiAoZWZmZWN0aXZlT2JqZWN0U3RvcmUua2V5UGF0aCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgdmFyIHRlbXBLZXkgPSB2b2lkIDA7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHRlbXBLZXkgPSBleHRyYWN0S2V5XzEuZGVmYXVsdChlZmZlY3RpdmVPYmplY3RTdG9yZS5rZXlQYXRoLCBjbG9uZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICAgICAgLyogSGFuZGxlZCBpbW1lZGlhdGVseSBiZWxvdyAqL1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGNtcF8xLmRlZmF1bHQodGVtcEtleSwgZWZmZWN0aXZlS2V5KSAhPT0gMCkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBlcnJvcnNfMS5EYXRhRXJyb3IoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB2YXIgcmVjb3JkID0ge1xuICAgICAgICAgICAga2V5OiBlZmZlY3RpdmVLZXksXG4gICAgICAgICAgICB2YWx1ZTogY2xvbmUsXG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiB0cmFuc2FjdGlvbi5fZXhlY1JlcXVlc3RBc3luYyh7XG4gICAgICAgICAgICBvcGVyYXRpb246IGVmZmVjdGl2ZU9iamVjdFN0b3JlLl9yYXdPYmplY3RTdG9yZS5zdG9yZVJlY29yZC5iaW5kKGVmZmVjdGl2ZU9iamVjdFN0b3JlLl9yYXdPYmplY3RTdG9yZSwgcmVjb3JkLCBmYWxzZSwgdHJhbnNhY3Rpb24uX3JvbGxiYWNrTG9nKSxcbiAgICAgICAgICAgIHNvdXJjZTogdGhpcyxcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICAvLyBodHRwOi8vd3d3LnczLm9yZy9UUi8yMDE1L1JFQy1JbmRleGVkREItMjAxNTAxMDgvI3dpZGwtSURCQ3Vyc29yLWFkdmFuY2Utdm9pZC11bnNpZ25lZC1sb25nLWNvdW50XG4gICAgRkRCQ3Vyc29yLnByb3RvdHlwZS5hZHZhbmNlID0gZnVuY3Rpb24gKGNvdW50KSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIGlmICghTnVtYmVyLmlzSW50ZWdlcihjb3VudCkgfHwgY291bnQgPD0gMCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcigpO1xuICAgICAgICB9XG4gICAgICAgIHZhciBlZmZlY3RpdmVPYmplY3RTdG9yZSA9IGdldEVmZmVjdGl2ZU9iamVjdFN0b3JlKHRoaXMpO1xuICAgICAgICB2YXIgdHJhbnNhY3Rpb24gPSBlZmZlY3RpdmVPYmplY3RTdG9yZS50cmFuc2FjdGlvbjtcbiAgICAgICAgaWYgKHRyYW5zYWN0aW9uLl9zdGF0ZSAhPT0gXCJhY3RpdmVcIikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IGVycm9yc18xLlRyYW5zYWN0aW9uSW5hY3RpdmVFcnJvcigpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChlZmZlY3RpdmVPYmplY3RTdG9yZS5fcmF3T2JqZWN0U3RvcmUuZGVsZXRlZCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IGVycm9yc18xLkludmFsaWRTdGF0ZUVycm9yKCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCEodGhpcy5zb3VyY2UgaW5zdGFuY2VvZiBGREJPYmplY3RTdG9yZV8xLmRlZmF1bHQpICYmXG4gICAgICAgICAgICB0aGlzLnNvdXJjZS5fcmF3SW5kZXguZGVsZXRlZCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IGVycm9yc18xLkludmFsaWRTdGF0ZUVycm9yKCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCF0aGlzLl9nb3RWYWx1ZSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IGVycm9yc18xLkludmFsaWRTdGF0ZUVycm9yKCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuX3JlcXVlc3QpIHtcbiAgICAgICAgICAgIHRoaXMuX3JlcXVlc3QucmVhZHlTdGF0ZSA9IFwicGVuZGluZ1wiO1xuICAgICAgICB9XG4gICAgICAgIHRyYW5zYWN0aW9uLl9leGVjUmVxdWVzdEFzeW5jKHtcbiAgICAgICAgICAgIG9wZXJhdGlvbjogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHZhciByZXN1bHQ7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjb3VudDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IF90aGlzLl9pdGVyYXRlKCk7XG4gICAgICAgICAgICAgICAgICAgIC8vIE5vdCBzdXJlIHdoeSB0aGlzIGlzIG5lZWRlZFxuICAgICAgICAgICAgICAgICAgICBpZiAoIXJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICByZXF1ZXN0OiB0aGlzLl9yZXF1ZXN0LFxuICAgICAgICAgICAgc291cmNlOiB0aGlzLnNvdXJjZSxcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuX2dvdFZhbHVlID0gZmFsc2U7XG4gICAgfTtcbiAgICAvLyBodHRwOi8vd3d3LnczLm9yZy9UUi8yMDE1L1JFQy1JbmRleGVkREItMjAxNTAxMDgvI3dpZGwtSURCQ3Vyc29yLWNvbnRpbnVlLXZvaWQtYW55LWtleVxuICAgIEZEQkN1cnNvci5wcm90b3R5cGUuY29udGludWUgPSBmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgIHZhciBlZmZlY3RpdmVPYmplY3RTdG9yZSA9IGdldEVmZmVjdGl2ZU9iamVjdFN0b3JlKHRoaXMpO1xuICAgICAgICB2YXIgdHJhbnNhY3Rpb24gPSBlZmZlY3RpdmVPYmplY3RTdG9yZS50cmFuc2FjdGlvbjtcbiAgICAgICAgaWYgKHRyYW5zYWN0aW9uLl9zdGF0ZSAhPT0gXCJhY3RpdmVcIikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IGVycm9yc18xLlRyYW5zYWN0aW9uSW5hY3RpdmVFcnJvcigpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChlZmZlY3RpdmVPYmplY3RTdG9yZS5fcmF3T2JqZWN0U3RvcmUuZGVsZXRlZCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IGVycm9yc18xLkludmFsaWRTdGF0ZUVycm9yKCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCEodGhpcy5zb3VyY2UgaW5zdGFuY2VvZiBGREJPYmplY3RTdG9yZV8xLmRlZmF1bHQpICYmXG4gICAgICAgICAgICB0aGlzLnNvdXJjZS5fcmF3SW5kZXguZGVsZXRlZCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IGVycm9yc18xLkludmFsaWRTdGF0ZUVycm9yKCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCF0aGlzLl9nb3RWYWx1ZSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IGVycm9yc18xLkludmFsaWRTdGF0ZUVycm9yKCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGtleSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBrZXkgPSB2YWx1ZVRvS2V5XzEuZGVmYXVsdChrZXkpO1xuICAgICAgICAgICAgdmFyIGNtcFJlc3VsdCA9IGNtcF8xLmRlZmF1bHQoa2V5LCB0aGlzLl9wb3NpdGlvbik7XG4gICAgICAgICAgICBpZiAoKGNtcFJlc3VsdCA8PSAwICYmXG4gICAgICAgICAgICAgICAgKHRoaXMuZGlyZWN0aW9uID09PSBcIm5leHRcIiB8fFxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRpcmVjdGlvbiA9PT0gXCJuZXh0dW5pcXVlXCIpKSB8fFxuICAgICAgICAgICAgICAgIChjbXBSZXN1bHQgPj0gMCAmJlxuICAgICAgICAgICAgICAgICAgICAodGhpcy5kaXJlY3Rpb24gPT09IFwicHJldlwiIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRpcmVjdGlvbiA9PT0gXCJwcmV2dW5pcXVlXCIpKSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBlcnJvcnNfMS5EYXRhRXJyb3IoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5fcmVxdWVzdCkge1xuICAgICAgICAgICAgdGhpcy5fcmVxdWVzdC5yZWFkeVN0YXRlID0gXCJwZW5kaW5nXCI7XG4gICAgICAgIH1cbiAgICAgICAgdHJhbnNhY3Rpb24uX2V4ZWNSZXF1ZXN0QXN5bmMoe1xuICAgICAgICAgICAgb3BlcmF0aW9uOiB0aGlzLl9pdGVyYXRlLmJpbmQodGhpcywga2V5KSxcbiAgICAgICAgICAgIHJlcXVlc3Q6IHRoaXMuX3JlcXVlc3QsXG4gICAgICAgICAgICBzb3VyY2U6IHRoaXMuc291cmNlLFxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5fZ290VmFsdWUgPSBmYWxzZTtcbiAgICB9O1xuICAgIC8vIGh0aHR0cHM6Ly93M2MuZ2l0aHViLmlvL0luZGV4ZWREQi8jZG9tLWlkYmN1cnNvci1jb250aW51ZXByaW1hcnlrZXlcbiAgICBGREJDdXJzb3IucHJvdG90eXBlLmNvbnRpbnVlUHJpbWFyeUtleSA9IGZ1bmN0aW9uIChrZXksIHByaW1hcnlLZXkpIHtcbiAgICAgICAgdmFyIGVmZmVjdGl2ZU9iamVjdFN0b3JlID0gZ2V0RWZmZWN0aXZlT2JqZWN0U3RvcmUodGhpcyk7XG4gICAgICAgIHZhciB0cmFuc2FjdGlvbiA9IGVmZmVjdGl2ZU9iamVjdFN0b3JlLnRyYW5zYWN0aW9uO1xuICAgICAgICBpZiAodHJhbnNhY3Rpb24uX3N0YXRlICE9PSBcImFjdGl2ZVwiKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgZXJyb3JzXzEuVHJhbnNhY3Rpb25JbmFjdGl2ZUVycm9yKCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGVmZmVjdGl2ZU9iamVjdFN0b3JlLl9yYXdPYmplY3RTdG9yZS5kZWxldGVkKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgZXJyb3JzXzEuSW52YWxpZFN0YXRlRXJyb3IoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoISh0aGlzLnNvdXJjZSBpbnN0YW5jZW9mIEZEQk9iamVjdFN0b3JlXzEuZGVmYXVsdCkgJiZcbiAgICAgICAgICAgIHRoaXMuc291cmNlLl9yYXdJbmRleC5kZWxldGVkKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgZXJyb3JzXzEuSW52YWxpZFN0YXRlRXJyb3IoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5zb3VyY2UgaW5zdGFuY2VvZiBGREJPYmplY3RTdG9yZV8xLmRlZmF1bHQgfHxcbiAgICAgICAgICAgICh0aGlzLmRpcmVjdGlvbiAhPT0gXCJuZXh0XCIgJiYgdGhpcy5kaXJlY3Rpb24gIT09IFwicHJldlwiKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IGVycm9yc18xLkludmFsaWRBY2Nlc3NFcnJvcigpO1xuICAgICAgICB9XG4gICAgICAgIGlmICghdGhpcy5fZ290VmFsdWUpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBlcnJvcnNfMS5JbnZhbGlkU3RhdGVFcnJvcigpO1xuICAgICAgICB9XG4gICAgICAgIC8vIE5vdCBzdXJlIGFib3V0IHRoaXNcbiAgICAgICAgaWYgKGtleSA9PT0gdW5kZWZpbmVkIHx8IHByaW1hcnlLZXkgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IGVycm9yc18xLkRhdGFFcnJvcigpO1xuICAgICAgICB9XG4gICAgICAgIGtleSA9IHZhbHVlVG9LZXlfMS5kZWZhdWx0KGtleSk7XG4gICAgICAgIHZhciBjbXBSZXN1bHQgPSBjbXBfMS5kZWZhdWx0KGtleSwgdGhpcy5fcG9zaXRpb24pO1xuICAgICAgICBpZiAoKGNtcFJlc3VsdCA9PT0gLTEgJiYgdGhpcy5kaXJlY3Rpb24gPT09IFwibmV4dFwiKSB8fFxuICAgICAgICAgICAgKGNtcFJlc3VsdCA9PT0gMSAmJiB0aGlzLmRpcmVjdGlvbiA9PT0gXCJwcmV2XCIpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgZXJyb3JzXzEuRGF0YUVycm9yKCk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGNtcFJlc3VsdDIgPSBjbXBfMS5kZWZhdWx0KHByaW1hcnlLZXksIHRoaXMuX29iamVjdFN0b3JlUG9zaXRpb24pO1xuICAgICAgICBpZiAoY21wUmVzdWx0ID09PSAwKSB7XG4gICAgICAgICAgICBpZiAoKGNtcFJlc3VsdDIgPD0gMCAmJiB0aGlzLmRpcmVjdGlvbiA9PT0gXCJuZXh0XCIpIHx8XG4gICAgICAgICAgICAgICAgKGNtcFJlc3VsdDIgPj0gMCAmJiB0aGlzLmRpcmVjdGlvbiA9PT0gXCJwcmV2XCIpKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IGVycm9yc18xLkRhdGFFcnJvcigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLl9yZXF1ZXN0KSB7XG4gICAgICAgICAgICB0aGlzLl9yZXF1ZXN0LnJlYWR5U3RhdGUgPSBcInBlbmRpbmdcIjtcbiAgICAgICAgfVxuICAgICAgICB0cmFuc2FjdGlvbi5fZXhlY1JlcXVlc3RBc3luYyh7XG4gICAgICAgICAgICBvcGVyYXRpb246IHRoaXMuX2l0ZXJhdGUuYmluZCh0aGlzLCBrZXksIHByaW1hcnlLZXkpLFxuICAgICAgICAgICAgcmVxdWVzdDogdGhpcy5fcmVxdWVzdCxcbiAgICAgICAgICAgIHNvdXJjZTogdGhpcy5zb3VyY2UsXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLl9nb3RWYWx1ZSA9IGZhbHNlO1xuICAgIH07XG4gICAgRkRCQ3Vyc29yLnByb3RvdHlwZS5kZWxldGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBlZmZlY3RpdmVPYmplY3RTdG9yZSA9IGdldEVmZmVjdGl2ZU9iamVjdFN0b3JlKHRoaXMpO1xuICAgICAgICB2YXIgZWZmZWN0aXZlS2V5ID0gdGhpcy5zb3VyY2UuaGFzT3duUHJvcGVydHkoXCJfcmF3SW5kZXhcIilcbiAgICAgICAgICAgID8gdGhpcy5wcmltYXJ5S2V5XG4gICAgICAgICAgICA6IHRoaXMuX3Bvc2l0aW9uO1xuICAgICAgICB2YXIgdHJhbnNhY3Rpb24gPSBlZmZlY3RpdmVPYmplY3RTdG9yZS50cmFuc2FjdGlvbjtcbiAgICAgICAgaWYgKHRyYW5zYWN0aW9uLl9zdGF0ZSAhPT0gXCJhY3RpdmVcIikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IGVycm9yc18xLlRyYW5zYWN0aW9uSW5hY3RpdmVFcnJvcigpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0cmFuc2FjdGlvbi5tb2RlID09PSBcInJlYWRvbmx5XCIpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBlcnJvcnNfMS5SZWFkT25seUVycm9yKCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGVmZmVjdGl2ZU9iamVjdFN0b3JlLl9yYXdPYmplY3RTdG9yZS5kZWxldGVkKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgZXJyb3JzXzEuSW52YWxpZFN0YXRlRXJyb3IoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoISh0aGlzLnNvdXJjZSBpbnN0YW5jZW9mIEZEQk9iamVjdFN0b3JlXzEuZGVmYXVsdCkgJiZcbiAgICAgICAgICAgIHRoaXMuc291cmNlLl9yYXdJbmRleC5kZWxldGVkKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgZXJyb3JzXzEuSW52YWxpZFN0YXRlRXJyb3IoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXRoaXMuX2dvdFZhbHVlIHx8ICF0aGlzLmhhc093blByb3BlcnR5KFwidmFsdWVcIikpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBlcnJvcnNfMS5JbnZhbGlkU3RhdGVFcnJvcigpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cmFuc2FjdGlvbi5fZXhlY1JlcXVlc3RBc3luYyh7XG4gICAgICAgICAgICBvcGVyYXRpb246IGVmZmVjdGl2ZU9iamVjdFN0b3JlLl9yYXdPYmplY3RTdG9yZS5kZWxldGVSZWNvcmQuYmluZChlZmZlY3RpdmVPYmplY3RTdG9yZS5fcmF3T2JqZWN0U3RvcmUsIGVmZmVjdGl2ZUtleSwgdHJhbnNhY3Rpb24uX3JvbGxiYWNrTG9nKSxcbiAgICAgICAgICAgIHNvdXJjZTogdGhpcyxcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBGREJDdXJzb3IucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gXCJbb2JqZWN0IElEQkN1cnNvcl1cIjtcbiAgICB9O1xuICAgIHJldHVybiBGREJDdXJzb3I7XG59KCkpO1xuZXhwb3J0cy5kZWZhdWx0ID0gRkRCQ3Vyc29yO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvZmFrZS1pbmRleGVkZGIvYnVpbGQvRkRCQ3Vyc29yLmpzXG4vLyBtb2R1bGUgaWQgPSAyNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBlcnJvcnNfMSA9IHJlcXVpcmUoXCIuL2Vycm9yc1wiKTtcbnZhciB2YWx1ZVRvS2V5XzEgPSByZXF1aXJlKFwiLi92YWx1ZVRvS2V5XCIpO1xudmFyIGdldFR5cGUgPSBmdW5jdGlvbiAoeCkge1xuICAgIGlmICh0eXBlb2YgeCA9PT0gXCJudW1iZXJcIikge1xuICAgICAgICByZXR1cm4gXCJOdW1iZXJcIjtcbiAgICB9XG4gICAgaWYgKHggaW5zdGFuY2VvZiBEYXRlKSB7XG4gICAgICAgIHJldHVybiBcIkRhdGVcIjtcbiAgICB9XG4gICAgaWYgKEFycmF5LmlzQXJyYXkoeCkpIHtcbiAgICAgICAgcmV0dXJuIFwiQXJyYXlcIjtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiB4ID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgIHJldHVybiBcIlN0cmluZ1wiO1xuICAgIH1cbiAgICBpZiAoeCBpbnN0YW5jZW9mIEFycmF5QnVmZmVyKSB7XG4gICAgICAgIHJldHVybiBcIkJpbmFyeVwiO1xuICAgIH1cbiAgICB0aHJvdyBuZXcgZXJyb3JzXzEuRGF0YUVycm9yKCk7XG59O1xuLy8gaHR0cHM6Ly93M2MuZ2l0aHViLmlvL0luZGV4ZWREQi8jY29tcGFyZS10d28ta2V5c1xudmFyIGNtcCA9IGZ1bmN0aW9uIChmaXJzdCwgc2Vjb25kKSB7XG4gICAgaWYgKHNlY29uZCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoKTtcbiAgICB9XG4gICAgZmlyc3QgPSB2YWx1ZVRvS2V5XzEuZGVmYXVsdChmaXJzdCk7XG4gICAgc2Vjb25kID0gdmFsdWVUb0tleV8xLmRlZmF1bHQoc2Vjb25kKTtcbiAgICB2YXIgdDEgPSBnZXRUeXBlKGZpcnN0KTtcbiAgICB2YXIgdDIgPSBnZXRUeXBlKHNlY29uZCk7XG4gICAgaWYgKHQxICE9PSB0Mikge1xuICAgICAgICBpZiAodDEgPT09IFwiQXJyYXlcIikge1xuICAgICAgICAgICAgcmV0dXJuIDE7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHQxID09PSBcIkJpbmFyeVwiICYmXG4gICAgICAgICAgICAodDIgPT09IFwiU3RyaW5nXCIgfHwgdDIgPT09IFwiRGF0ZVwiIHx8IHQyID09PSBcIk51bWJlclwiKSkge1xuICAgICAgICAgICAgcmV0dXJuIDE7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHQxID09PSBcIlN0cmluZ1wiICYmICh0MiA9PT0gXCJEYXRlXCIgfHwgdDIgPT09IFwiTnVtYmVyXCIpKSB7XG4gICAgICAgICAgICByZXR1cm4gMTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodDEgPT09IFwiRGF0ZVwiICYmIHQyID09PSBcIk51bWJlclwiKSB7XG4gICAgICAgICAgICByZXR1cm4gMTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gLTE7XG4gICAgfVxuICAgIGlmICh0MSA9PT0gXCJCaW5hcnlcIikge1xuICAgICAgICBmaXJzdCA9IG5ldyBVaW50OEFycmF5KGZpcnN0KTtcbiAgICAgICAgc2Vjb25kID0gbmV3IFVpbnQ4QXJyYXkoc2Vjb25kKTtcbiAgICB9XG4gICAgaWYgKHQxID09PSBcIkFycmF5XCIgfHwgdDEgPT09IFwiQmluYXJ5XCIpIHtcbiAgICAgICAgdmFyIGxlbmd0aF8xID0gTWF0aC5taW4oZmlyc3QubGVuZ3RoLCBzZWNvbmQubGVuZ3RoKTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGhfMTsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgcmVzdWx0ID0gY21wKGZpcnN0W2ldLCBzZWNvbmRbaV0pO1xuICAgICAgICAgICAgaWYgKHJlc3VsdCAhPT0gMCkge1xuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGZpcnN0Lmxlbmd0aCA+IHNlY29uZC5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJldHVybiAxO1xuICAgICAgICB9XG4gICAgICAgIGlmIChmaXJzdC5sZW5ndGggPCBzZWNvbmQubGVuZ3RoKSB7XG4gICAgICAgICAgICByZXR1cm4gLTE7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIDA7XG4gICAgfVxuICAgIGlmICh0MSA9PT0gXCJEYXRlXCIpIHtcbiAgICAgICAgaWYgKGZpcnN0LmdldFRpbWUoKSA9PT0gc2Vjb25kLmdldFRpbWUoKSkge1xuICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGlmIChmaXJzdCA9PT0gc2Vjb25kKSB7XG4gICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZmlyc3QgPiBzZWNvbmQgPyAxIDogLTE7XG59O1xuZXhwb3J0cy5kZWZhdWx0ID0gY21wO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvZmFrZS1pbmRleGVkZGIvYnVpbGQvbGliL2NtcC5qc1xuLy8gbW9kdWxlIGlkID0gMjVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX192YWx1ZXMgPSAodGhpcyAmJiB0aGlzLl9fdmFsdWVzKSB8fCBmdW5jdGlvbihvKSB7XG4gICAgdmFyIHMgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgU3ltYm9sLml0ZXJhdG9yLCBtID0gcyAmJiBvW3NdLCBpID0gMDtcbiAgICBpZiAobSkgcmV0dXJuIG0uY2FsbChvKTtcbiAgICBpZiAobyAmJiB0eXBlb2Ygby5sZW5ndGggPT09IFwibnVtYmVyXCIpIHJldHVybiB7XG4gICAgICAgIG5leHQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmIChvICYmIGkgPj0gby5sZW5ndGgpIG8gPSB2b2lkIDA7XG4gICAgICAgICAgICByZXR1cm4geyB2YWx1ZTogbyAmJiBvW2krK10sIGRvbmU6ICFvIH07XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IocyA/IFwiT2JqZWN0IGlzIG5vdCBpdGVyYWJsZS5cIiA6IFwiU3ltYm9sLml0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgdmFsdWVUb0tleV8xID0gcmVxdWlyZShcIi4vdmFsdWVUb0tleVwiKTtcbi8vIGh0dHA6Ly93d3cudzMub3JnL1RSLzIwMTUvUkVDLUluZGV4ZWREQi0yMDE1MDEwOC8jZGZuLXN0ZXBzLWZvci1leHRyYWN0aW5nLWEta2V5LWZyb20tYS12YWx1ZS11c2luZy1hLWtleS1wYXRoXG52YXIgZXh0cmFjdEtleSA9IGZ1bmN0aW9uIChrZXlQYXRoLCB2YWx1ZSkge1xuICAgIHZhciBlXzEsIF9hO1xuICAgIGlmIChBcnJheS5pc0FycmF5KGtleVBhdGgpKSB7XG4gICAgICAgIHZhciByZXN1bHQgPSBbXTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGZvciAodmFyIGtleVBhdGhfMSA9IF9fdmFsdWVzKGtleVBhdGgpLCBrZXlQYXRoXzFfMSA9IGtleVBhdGhfMS5uZXh0KCk7ICFrZXlQYXRoXzFfMS5kb25lOyBrZXlQYXRoXzFfMSA9IGtleVBhdGhfMS5uZXh0KCkpIHtcbiAgICAgICAgICAgICAgICB2YXIgaXRlbSA9IGtleVBhdGhfMV8xLnZhbHVlO1xuICAgICAgICAgICAgICAgIC8vIFRoaXMgZG9lc24ndCBtYWtlIHNlbnNlIHRvIG1lIGJhc2VkIG9uIHRoZSBzcGVjLCBidXQgaXQgaXMgbmVlZGVkIHRvIHBhc3MgdGhlIFczQyBLZXlQYXRoIHRlc3RzIChzZWUgc2FtZVxuICAgICAgICAgICAgICAgIC8vIGNvbW1lbnQgaW4gdmFsaWRhdGVLZXlQYXRoKVxuICAgICAgICAgICAgICAgIGlmIChpdGVtICE9PSB1bmRlZmluZWQgJiZcbiAgICAgICAgICAgICAgICAgICAgaXRlbSAhPT0gbnVsbCAmJlxuICAgICAgICAgICAgICAgICAgICB0eXBlb2YgaXRlbSAhPT0gXCJzdHJpbmdcIiAmJlxuICAgICAgICAgICAgICAgICAgICBpdGVtLnRvU3RyaW5nKSB7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW0gPSBpdGVtLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKHZhbHVlVG9LZXlfMS5kZWZhdWx0KGV4dHJhY3RLZXkoaXRlbSwgdmFsdWUpKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVfMV8xKSB7IGVfMSA9IHsgZXJyb3I6IGVfMV8xIH07IH1cbiAgICAgICAgZmluYWxseSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGlmIChrZXlQYXRoXzFfMSAmJiAha2V5UGF0aF8xXzEuZG9uZSAmJiAoX2EgPSBrZXlQYXRoXzEucmV0dXJuKSkgX2EuY2FsbChrZXlQYXRoXzEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZmluYWxseSB7IGlmIChlXzEpIHRocm93IGVfMS5lcnJvcjsgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICAgIGlmIChrZXlQYXRoID09PSBcIlwiKSB7XG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG4gICAgdmFyIHJlbWFpbmluZ0tleVBhdGggPSBrZXlQYXRoO1xuICAgIHZhciBvYmplY3QgPSB2YWx1ZTtcbiAgICB3aGlsZSAocmVtYWluaW5nS2V5UGF0aCAhPT0gbnVsbCkge1xuICAgICAgICB2YXIgaWRlbnRpZmllciA9IHZvaWQgMDtcbiAgICAgICAgdmFyIGkgPSByZW1haW5pbmdLZXlQYXRoLmluZGV4T2YoXCIuXCIpO1xuICAgICAgICBpZiAoaSA+PSAwKSB7XG4gICAgICAgICAgICBpZGVudGlmaWVyID0gcmVtYWluaW5nS2V5UGF0aC5zbGljZSgwLCBpKTtcbiAgICAgICAgICAgIHJlbWFpbmluZ0tleVBhdGggPSByZW1haW5pbmdLZXlQYXRoLnNsaWNlKGkgKyAxKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGlkZW50aWZpZXIgPSByZW1haW5pbmdLZXlQYXRoO1xuICAgICAgICAgICAgcmVtYWluaW5nS2V5UGF0aCA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFvYmplY3QuaGFzT3duUHJvcGVydHkoaWRlbnRpZmllcikpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBvYmplY3QgPSBvYmplY3RbaWRlbnRpZmllcl07XG4gICAgfVxuICAgIHJldHVybiBvYmplY3Q7XG59O1xuZXhwb3J0cy5kZWZhdWx0ID0gZXh0cmFjdEtleTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2Zha2UtaW5kZXhlZGRiL2J1aWxkL2xpYi9leHRyYWN0S2V5LmpzXG4vLyBtb2R1bGUgaWQgPSAyNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciByZWFsaXN0aWNTdHJ1Y3R1cmVkQ2xvbmUgPSByZXF1aXJlKFwicmVhbGlzdGljLXN0cnVjdHVyZWQtY2xvbmVcIik7IC8vIHRzbGludDpkaXNhYmxlLWxpbmUgbm8tdmFyLXJlcXVpcmVzXG52YXIgZXJyb3JzXzEgPSByZXF1aXJlKFwiLi9lcnJvcnNcIik7XG52YXIgc3RydWN0dXJlZENsb25lID0gZnVuY3Rpb24gKGlucHV0KSB7XG4gICAgdHJ5IHtcbiAgICAgICAgcmV0dXJuIHJlYWxpc3RpY1N0cnVjdHVyZWRDbG9uZShpbnB1dCk7XG4gICAgfVxuICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgdGhyb3cgbmV3IGVycm9yc18xLkRhdGFDbG9uZUVycm9yKCk7XG4gICAgfVxufTtcbmV4cG9ydHMuZGVmYXVsdCA9IHN0cnVjdHVyZWRDbG9uZTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2Zha2UtaW5kZXhlZGRiL2J1aWxkL2xpYi9zdHJ1Y3R1cmVkQ2xvbmUuanNcbi8vIG1vZHVsZSBpZCA9IDI3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuLy8gV291bGQgYmUgbmljZXIgdG8gc3VibGNhc3MgQXJyYXksIGJ1dCBJJ2QgaGF2ZSB0byBzYWNyaWZpY2UgTm9kZSA0IHN1cHBvcnQgdG8gZG8gdGhhdC5cbnZhciBmYWtlRE9NU3RyaW5nTGlzdCA9IGZ1bmN0aW9uIChhcnIpIHtcbiAgICB2YXIgYXJyMiA9IGFyci5zbGljZSgpO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShhcnIyLCBcImNvbnRhaW5zXCIsIHtcbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lIG9iamVjdC1saXRlcmFsLXNob3J0aGFuZFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gKHZhbHVlKSB7IHJldHVybiBhcnIyLmluZGV4T2YodmFsdWUpID49IDA7IH0sXG4gICAgfSk7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGFycjIsIFwiaXRlbVwiLCB7XG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZSBvYmplY3QtbGl0ZXJhbC1zaG9ydGhhbmRcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIChpKSB7IHJldHVybiBhcnIyW2ldOyB9LFxuICAgIH0pO1xuICAgIHJldHVybiBhcnIyO1xufTtcbmV4cG9ydHMuZGVmYXVsdCA9IGZha2VET01TdHJpbmdMaXN0O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvZmFrZS1pbmRleGVkZGIvYnVpbGQvbGliL2Zha2VET01TdHJpbmdMaXN0LmpzXG4vLyBtb2R1bGUgaWQgPSAyOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBGREJDdXJzb3JfMSA9IHJlcXVpcmUoXCIuL0ZEQkN1cnNvclwiKTtcbnZhciBGREJDdXJzb3JXaXRoVmFsdWVfMSA9IHJlcXVpcmUoXCIuL0ZEQkN1cnNvcldpdGhWYWx1ZVwiKTtcbnZhciBGREJJbmRleF8xID0gcmVxdWlyZShcIi4vRkRCSW5kZXhcIik7XG52YXIgRkRCS2V5UmFuZ2VfMSA9IHJlcXVpcmUoXCIuL0ZEQktleVJhbmdlXCIpO1xudmFyIEZEQlJlcXVlc3RfMSA9IHJlcXVpcmUoXCIuL0ZEQlJlcXVlc3RcIik7XG52YXIgY2FuSW5qZWN0S2V5XzEgPSByZXF1aXJlKFwiLi9saWIvY2FuSW5qZWN0S2V5XCIpO1xudmFyIGVuZm9yY2VSYW5nZV8xID0gcmVxdWlyZShcIi4vbGliL2VuZm9yY2VSYW5nZVwiKTtcbnZhciBlcnJvcnNfMSA9IHJlcXVpcmUoXCIuL2xpYi9lcnJvcnNcIik7XG52YXIgZXh0cmFjdEtleV8xID0gcmVxdWlyZShcIi4vbGliL2V4dHJhY3RLZXlcIik7XG52YXIgZmFrZURPTVN0cmluZ0xpc3RfMSA9IHJlcXVpcmUoXCIuL2xpYi9mYWtlRE9NU3RyaW5nTGlzdFwiKTtcbnZhciBJbmRleF8xID0gcmVxdWlyZShcIi4vbGliL0luZGV4XCIpO1xudmFyIHN0cnVjdHVyZWRDbG9uZV8xID0gcmVxdWlyZShcIi4vbGliL3N0cnVjdHVyZWRDbG9uZVwiKTtcbnZhciB2YWxpZGF0ZUtleVBhdGhfMSA9IHJlcXVpcmUoXCIuL2xpYi92YWxpZGF0ZUtleVBhdGhcIik7XG52YXIgdmFsdWVUb0tleV8xID0gcmVxdWlyZShcIi4vbGliL3ZhbHVlVG9LZXlcIik7XG52YXIgdmFsdWVUb0tleVJhbmdlXzEgPSByZXF1aXJlKFwiLi9saWIvdmFsdWVUb0tleVJhbmdlXCIpO1xudmFyIGNvbmZpcm1BY3RpdmVUcmFuc2FjdGlvbiA9IGZ1bmN0aW9uIChvYmplY3RTdG9yZSkge1xuICAgIGlmIChvYmplY3RTdG9yZS5fcmF3T2JqZWN0U3RvcmUuZGVsZXRlZCkge1xuICAgICAgICB0aHJvdyBuZXcgZXJyb3JzXzEuSW52YWxpZFN0YXRlRXJyb3IoKTtcbiAgICB9XG4gICAgaWYgKG9iamVjdFN0b3JlLnRyYW5zYWN0aW9uLl9zdGF0ZSAhPT0gXCJhY3RpdmVcIikge1xuICAgICAgICB0aHJvdyBuZXcgZXJyb3JzXzEuVHJhbnNhY3Rpb25JbmFjdGl2ZUVycm9yKCk7XG4gICAgfVxufTtcbnZhciBidWlsZFJlY29yZEFkZFB1dCA9IGZ1bmN0aW9uIChvYmplY3RTdG9yZSwgdmFsdWUsIGtleSkge1xuICAgIGNvbmZpcm1BY3RpdmVUcmFuc2FjdGlvbihvYmplY3RTdG9yZSk7XG4gICAgaWYgKG9iamVjdFN0b3JlLnRyYW5zYWN0aW9uLm1vZGUgPT09IFwicmVhZG9ubHlcIikge1xuICAgICAgICB0aHJvdyBuZXcgZXJyb3JzXzEuUmVhZE9ubHlFcnJvcigpO1xuICAgIH1cbiAgICBpZiAob2JqZWN0U3RvcmUua2V5UGF0aCAhPT0gbnVsbCkge1xuICAgICAgICBpZiAoa2V5ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBlcnJvcnNfMS5EYXRhRXJyb3IoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICB2YXIgY2xvbmUgPSBzdHJ1Y3R1cmVkQ2xvbmVfMS5kZWZhdWx0KHZhbHVlKTtcbiAgICBpZiAob2JqZWN0U3RvcmUua2V5UGF0aCAhPT0gbnVsbCkge1xuICAgICAgICB2YXIgdGVtcEtleSA9IGV4dHJhY3RLZXlfMS5kZWZhdWx0KG9iamVjdFN0b3JlLmtleVBhdGgsIGNsb25lKTtcbiAgICAgICAgaWYgKHRlbXBLZXkgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdmFsdWVUb0tleV8xLmRlZmF1bHQodGVtcEtleSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBpZiAoIW9iamVjdFN0b3JlLl9yYXdPYmplY3RTdG9yZS5rZXlHZW5lcmF0b3IpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgZXJyb3JzXzEuRGF0YUVycm9yKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICghY2FuSW5qZWN0S2V5XzEuZGVmYXVsdChvYmplY3RTdG9yZS5rZXlQYXRoLCBjbG9uZSkpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgZXJyb3JzXzEuRGF0YUVycm9yKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYgKG9iamVjdFN0b3JlLmtleVBhdGggPT09IG51bGwgJiZcbiAgICAgICAgb2JqZWN0U3RvcmUuX3Jhd09iamVjdFN0b3JlLmtleUdlbmVyYXRvciA9PT0gbnVsbCAmJlxuICAgICAgICBrZXkgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICB0aHJvdyBuZXcgZXJyb3JzXzEuRGF0YUVycm9yKCk7XG4gICAgfVxuICAgIGlmIChrZXkgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBrZXkgPSB2YWx1ZVRvS2V5XzEuZGVmYXVsdChrZXkpO1xuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgICBrZXk6IGtleSxcbiAgICAgICAgdmFsdWU6IGNsb25lLFxuICAgIH07XG59O1xuLy8gaHR0cDovL3d3dy53My5vcmcvVFIvMjAxNS9SRUMtSW5kZXhlZERCLTIwMTUwMTA4LyNvYmplY3Qtc3RvcmVcbnZhciBGREJPYmplY3RTdG9yZSA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBGREJPYmplY3RTdG9yZSh0cmFuc2FjdGlvbiwgcmF3T2JqZWN0U3RvcmUpIHtcbiAgICAgICAgdGhpcy5faW5kZXhlc0NhY2hlID0gbmV3IE1hcCgpO1xuICAgICAgICB0aGlzLl9yYXdPYmplY3RTdG9yZSA9IHJhd09iamVjdFN0b3JlO1xuICAgICAgICB0aGlzLl9uYW1lID0gcmF3T2JqZWN0U3RvcmUubmFtZTtcbiAgICAgICAgdGhpcy5rZXlQYXRoID0gcmF3T2JqZWN0U3RvcmUua2V5UGF0aDtcbiAgICAgICAgdGhpcy5hdXRvSW5jcmVtZW50ID0gcmF3T2JqZWN0U3RvcmUuYXV0b0luY3JlbWVudDtcbiAgICAgICAgdGhpcy50cmFuc2FjdGlvbiA9IHRyYW5zYWN0aW9uO1xuICAgICAgICB0aGlzLmluZGV4TmFtZXMgPSBmYWtlRE9NU3RyaW5nTGlzdF8xLmRlZmF1bHQoQXJyYXkuZnJvbShyYXdPYmplY3RTdG9yZS5yYXdJbmRleGVzLmtleXMoKSkpLnNvcnQoKTtcbiAgICB9XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEZEQk9iamVjdFN0b3JlLnByb3RvdHlwZSwgXCJuYW1lXCIsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fbmFtZTtcbiAgICAgICAgfSxcbiAgICAgICAgLy8gaHR0cDovL3czYy5naXRodWIuaW8vSW5kZXhlZERCLyNkb20taWRib2JqZWN0c3RvcmUtbmFtZVxuICAgICAgICBzZXQ6IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICAgICAgdmFyIHRyYW5zYWN0aW9uID0gdGhpcy50cmFuc2FjdGlvbjtcbiAgICAgICAgICAgIGlmICghdHJhbnNhY3Rpb24uZGIuX3J1bm5pbmdWZXJzaW9uY2hhbmdlVHJhbnNhY3Rpb24pIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgZXJyb3JzXzEuSW52YWxpZFN0YXRlRXJyb3IoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbmZpcm1BY3RpdmVUcmFuc2FjdGlvbih0aGlzKTtcbiAgICAgICAgICAgIG5hbWUgPSBTdHJpbmcobmFtZSk7XG4gICAgICAgICAgICBpZiAobmFtZSA9PT0gdGhpcy5fbmFtZSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLl9yYXdPYmplY3RTdG9yZS5yYXdEYXRhYmFzZS5yYXdPYmplY3RTdG9yZXMuaGFzKG5hbWUpKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IGVycm9yc18xLkNvbnN0cmFpbnRFcnJvcigpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIG9sZE5hbWUgPSB0aGlzLl9uYW1lO1xuICAgICAgICAgICAgdmFyIG9sZE9iamVjdFN0b3JlTmFtZXMgPSB0cmFuc2FjdGlvbi5kYi5vYmplY3RTdG9yZU5hbWVzLnNsaWNlKCk7XG4gICAgICAgICAgICB0aGlzLl9uYW1lID0gbmFtZTtcbiAgICAgICAgICAgIHRoaXMuX3Jhd09iamVjdFN0b3JlLm5hbWUgPSBuYW1lO1xuICAgICAgICAgICAgdGhpcy50cmFuc2FjdGlvbi5fb2JqZWN0U3RvcmVzQ2FjaGUuZGVsZXRlKG9sZE5hbWUpO1xuICAgICAgICAgICAgdGhpcy50cmFuc2FjdGlvbi5fb2JqZWN0U3RvcmVzQ2FjaGUuc2V0KG5hbWUsIHRoaXMpO1xuICAgICAgICAgICAgdGhpcy5fcmF3T2JqZWN0U3RvcmUucmF3RGF0YWJhc2UucmF3T2JqZWN0U3RvcmVzLmRlbGV0ZShvbGROYW1lKTtcbiAgICAgICAgICAgIHRoaXMuX3Jhd09iamVjdFN0b3JlLnJhd0RhdGFiYXNlLnJhd09iamVjdFN0b3Jlcy5zZXQobmFtZSwgdGhpcy5fcmF3T2JqZWN0U3RvcmUpO1xuICAgICAgICAgICAgdHJhbnNhY3Rpb24uZGIub2JqZWN0U3RvcmVOYW1lcyA9IGZha2VET01TdHJpbmdMaXN0XzEuZGVmYXVsdChBcnJheS5mcm9tKHRoaXMuX3Jhd09iamVjdFN0b3JlLnJhd0RhdGFiYXNlLnJhd09iamVjdFN0b3Jlcy5rZXlzKCkpLmZpbHRlcihmdW5jdGlvbiAob2JqZWN0U3RvcmVOYW1lKSB7XG4gICAgICAgICAgICAgICAgdmFyIG9iamVjdFN0b3JlID0gX3RoaXMuX3Jhd09iamVjdFN0b3JlLnJhd0RhdGFiYXNlLnJhd09iamVjdFN0b3Jlcy5nZXQob2JqZWN0U3RvcmVOYW1lKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gb2JqZWN0U3RvcmUgJiYgIW9iamVjdFN0b3JlLmRlbGV0ZWQ7XG4gICAgICAgICAgICB9KSkuc29ydCgpO1xuICAgICAgICAgICAgdmFyIG9sZFNjb3BlID0gbmV3IFNldCh0cmFuc2FjdGlvbi5fc2NvcGUpO1xuICAgICAgICAgICAgdmFyIG9sZFRyYW5zYWN0aW9uT2JqZWN0U3RvcmVOYW1lcyA9IHRyYW5zYWN0aW9uLm9iamVjdFN0b3JlTmFtZXMuc2xpY2UoKTtcbiAgICAgICAgICAgIHRoaXMudHJhbnNhY3Rpb24uX3Njb3BlLmRlbGV0ZShvbGROYW1lKTtcbiAgICAgICAgICAgIHRyYW5zYWN0aW9uLl9zY29wZS5hZGQobmFtZSk7XG4gICAgICAgICAgICB0cmFuc2FjdGlvbi5vYmplY3RTdG9yZU5hbWVzID0gZmFrZURPTVN0cmluZ0xpc3RfMS5kZWZhdWx0KEFycmF5LmZyb20odHJhbnNhY3Rpb24uX3Njb3BlKS5zb3J0KCkpO1xuICAgICAgICAgICAgdHJhbnNhY3Rpb24uX3JvbGxiYWNrTG9nLnB1c2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIF90aGlzLl9uYW1lID0gb2xkTmFtZTtcbiAgICAgICAgICAgICAgICBfdGhpcy5fcmF3T2JqZWN0U3RvcmUubmFtZSA9IG9sZE5hbWU7XG4gICAgICAgICAgICAgICAgX3RoaXMudHJhbnNhY3Rpb24uX29iamVjdFN0b3Jlc0NhY2hlLmRlbGV0ZShuYW1lKTtcbiAgICAgICAgICAgICAgICBfdGhpcy50cmFuc2FjdGlvbi5fb2JqZWN0U3RvcmVzQ2FjaGUuc2V0KG9sZE5hbWUsIF90aGlzKTtcbiAgICAgICAgICAgICAgICBfdGhpcy5fcmF3T2JqZWN0U3RvcmUucmF3RGF0YWJhc2UucmF3T2JqZWN0U3RvcmVzLmRlbGV0ZShuYW1lKTtcbiAgICAgICAgICAgICAgICBfdGhpcy5fcmF3T2JqZWN0U3RvcmUucmF3RGF0YWJhc2UucmF3T2JqZWN0U3RvcmVzLnNldChvbGROYW1lLCBfdGhpcy5fcmF3T2JqZWN0U3RvcmUpO1xuICAgICAgICAgICAgICAgIHRyYW5zYWN0aW9uLmRiLm9iamVjdFN0b3JlTmFtZXMgPSBmYWtlRE9NU3RyaW5nTGlzdF8xLmRlZmF1bHQob2xkT2JqZWN0U3RvcmVOYW1lcyk7XG4gICAgICAgICAgICAgICAgdHJhbnNhY3Rpb24uX3Njb3BlID0gb2xkU2NvcGU7XG4gICAgICAgICAgICAgICAgdHJhbnNhY3Rpb24ub2JqZWN0U3RvcmVOYW1lcyA9IGZha2VET01TdHJpbmdMaXN0XzEuZGVmYXVsdChvbGRUcmFuc2FjdGlvbk9iamVjdFN0b3JlTmFtZXMpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIEZEQk9iamVjdFN0b3JlLnByb3RvdHlwZS5wdXQgPSBmdW5jdGlvbiAodmFsdWUsIGtleSkge1xuICAgICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcigpO1xuICAgICAgICB9XG4gICAgICAgIHZhciByZWNvcmQgPSBidWlsZFJlY29yZEFkZFB1dCh0aGlzLCB2YWx1ZSwga2V5KTtcbiAgICAgICAgcmV0dXJuIHRoaXMudHJhbnNhY3Rpb24uX2V4ZWNSZXF1ZXN0QXN5bmMoe1xuICAgICAgICAgICAgb3BlcmF0aW9uOiB0aGlzLl9yYXdPYmplY3RTdG9yZS5zdG9yZVJlY29yZC5iaW5kKHRoaXMuX3Jhd09iamVjdFN0b3JlLCByZWNvcmQsIGZhbHNlLCB0aGlzLnRyYW5zYWN0aW9uLl9yb2xsYmFja0xvZyksXG4gICAgICAgICAgICBzb3VyY2U6IHRoaXMsXG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgRkRCT2JqZWN0U3RvcmUucHJvdG90eXBlLmFkZCA9IGZ1bmN0aW9uICh2YWx1ZSwga2V5KSB7XG4gICAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHJlY29yZCA9IGJ1aWxkUmVjb3JkQWRkUHV0KHRoaXMsIHZhbHVlLCBrZXkpO1xuICAgICAgICByZXR1cm4gdGhpcy50cmFuc2FjdGlvbi5fZXhlY1JlcXVlc3RBc3luYyh7XG4gICAgICAgICAgICBvcGVyYXRpb246IHRoaXMuX3Jhd09iamVjdFN0b3JlLnN0b3JlUmVjb3JkLmJpbmQodGhpcy5fcmF3T2JqZWN0U3RvcmUsIHJlY29yZCwgdHJ1ZSwgdGhpcy50cmFuc2FjdGlvbi5fcm9sbGJhY2tMb2cpLFxuICAgICAgICAgICAgc291cmNlOiB0aGlzLFxuICAgICAgICB9KTtcbiAgICB9O1xuICAgIEZEQk9iamVjdFN0b3JlLnByb3RvdHlwZS5kZWxldGUgPSBmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCk7XG4gICAgICAgIH1cbiAgICAgICAgY29uZmlybUFjdGl2ZVRyYW5zYWN0aW9uKHRoaXMpO1xuICAgICAgICBpZiAodGhpcy50cmFuc2FjdGlvbi5tb2RlID09PSBcInJlYWRvbmx5XCIpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBlcnJvcnNfMS5SZWFkT25seUVycm9yKCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCEoa2V5IGluc3RhbmNlb2YgRkRCS2V5UmFuZ2VfMS5kZWZhdWx0KSkge1xuICAgICAgICAgICAga2V5ID0gdmFsdWVUb0tleV8xLmRlZmF1bHQoa2V5KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy50cmFuc2FjdGlvbi5fZXhlY1JlcXVlc3RBc3luYyh7XG4gICAgICAgICAgICBvcGVyYXRpb246IHRoaXMuX3Jhd09iamVjdFN0b3JlLmRlbGV0ZVJlY29yZC5iaW5kKHRoaXMuX3Jhd09iamVjdFN0b3JlLCBrZXksIHRoaXMudHJhbnNhY3Rpb24uX3JvbGxiYWNrTG9nKSxcbiAgICAgICAgICAgIHNvdXJjZTogdGhpcyxcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBGREJPYmplY3RTdG9yZS5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24gKGtleSkge1xuICAgICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcigpO1xuICAgICAgICB9XG4gICAgICAgIGNvbmZpcm1BY3RpdmVUcmFuc2FjdGlvbih0aGlzKTtcbiAgICAgICAgaWYgKCEoa2V5IGluc3RhbmNlb2YgRkRCS2V5UmFuZ2VfMS5kZWZhdWx0KSkge1xuICAgICAgICAgICAga2V5ID0gdmFsdWVUb0tleV8xLmRlZmF1bHQoa2V5KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy50cmFuc2FjdGlvbi5fZXhlY1JlcXVlc3RBc3luYyh7XG4gICAgICAgICAgICBvcGVyYXRpb246IHRoaXMuX3Jhd09iamVjdFN0b3JlLmdldFZhbHVlLmJpbmQodGhpcy5fcmF3T2JqZWN0U3RvcmUsIGtleSksXG4gICAgICAgICAgICBzb3VyY2U6IHRoaXMsXG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgLy8gaHR0cDovL3czYy5naXRodWIuaW8vSW5kZXhlZERCLyNkb20taWRib2JqZWN0c3RvcmUtZ2V0YWxsXG4gICAgRkRCT2JqZWN0U3RvcmUucHJvdG90eXBlLmdldEFsbCA9IGZ1bmN0aW9uIChxdWVyeSwgY291bnQpIHtcbiAgICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGNvdW50ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGNvdW50ID0gZW5mb3JjZVJhbmdlXzEuZGVmYXVsdChjb3VudCwgXCJ1bnNpZ25lZCBsb25nXCIpO1xuICAgICAgICB9XG4gICAgICAgIGNvbmZpcm1BY3RpdmVUcmFuc2FjdGlvbih0aGlzKTtcbiAgICAgICAgdmFyIHJhbmdlID0gdmFsdWVUb0tleVJhbmdlXzEuZGVmYXVsdChxdWVyeSk7XG4gICAgICAgIHJldHVybiB0aGlzLnRyYW5zYWN0aW9uLl9leGVjUmVxdWVzdEFzeW5jKHtcbiAgICAgICAgICAgIG9wZXJhdGlvbjogdGhpcy5fcmF3T2JqZWN0U3RvcmUuZ2V0QWxsVmFsdWVzLmJpbmQodGhpcy5fcmF3T2JqZWN0U3RvcmUsIHJhbmdlLCBjb3VudCksXG4gICAgICAgICAgICBzb3VyY2U6IHRoaXMsXG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgLy8gaHR0cDovL3czYy5naXRodWIuaW8vSW5kZXhlZERCLyNkb20taWRib2JqZWN0c3RvcmUtZ2V0a2V5XG4gICAgRkRCT2JqZWN0U3RvcmUucHJvdG90eXBlLmdldEtleSA9IGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoKTtcbiAgICAgICAgfVxuICAgICAgICBjb25maXJtQWN0aXZlVHJhbnNhY3Rpb24odGhpcyk7XG4gICAgICAgIGlmICghKGtleSBpbnN0YW5jZW9mIEZEQktleVJhbmdlXzEuZGVmYXVsdCkpIHtcbiAgICAgICAgICAgIGtleSA9IHZhbHVlVG9LZXlfMS5kZWZhdWx0KGtleSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMudHJhbnNhY3Rpb24uX2V4ZWNSZXF1ZXN0QXN5bmMoe1xuICAgICAgICAgICAgb3BlcmF0aW9uOiB0aGlzLl9yYXdPYmplY3RTdG9yZS5nZXRLZXkuYmluZCh0aGlzLl9yYXdPYmplY3RTdG9yZSwga2V5KSxcbiAgICAgICAgICAgIHNvdXJjZTogdGhpcyxcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICAvLyBodHRwOi8vdzNjLmdpdGh1Yi5pby9JbmRleGVkREIvI2RvbS1pZGJvYmplY3RzdG9yZS1nZXRhbGxrZXlzXG4gICAgRkRCT2JqZWN0U3RvcmUucHJvdG90eXBlLmdldEFsbEtleXMgPSBmdW5jdGlvbiAocXVlcnksIGNvdW50KSB7XG4gICAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSAmJiBjb3VudCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBjb3VudCA9IGVuZm9yY2VSYW5nZV8xLmRlZmF1bHQoY291bnQsIFwidW5zaWduZWQgbG9uZ1wiKTtcbiAgICAgICAgfVxuICAgICAgICBjb25maXJtQWN0aXZlVHJhbnNhY3Rpb24odGhpcyk7XG4gICAgICAgIHZhciByYW5nZSA9IHZhbHVlVG9LZXlSYW5nZV8xLmRlZmF1bHQocXVlcnkpO1xuICAgICAgICByZXR1cm4gdGhpcy50cmFuc2FjdGlvbi5fZXhlY1JlcXVlc3RBc3luYyh7XG4gICAgICAgICAgICBvcGVyYXRpb246IHRoaXMuX3Jhd09iamVjdFN0b3JlLmdldEFsbEtleXMuYmluZCh0aGlzLl9yYXdPYmplY3RTdG9yZSwgcmFuZ2UsIGNvdW50KSxcbiAgICAgICAgICAgIHNvdXJjZTogdGhpcyxcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBGREJPYmplY3RTdG9yZS5wcm90b3R5cGUuY2xlYXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNvbmZpcm1BY3RpdmVUcmFuc2FjdGlvbih0aGlzKTtcbiAgICAgICAgaWYgKHRoaXMudHJhbnNhY3Rpb24ubW9kZSA9PT0gXCJyZWFkb25seVwiKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgZXJyb3JzXzEuUmVhZE9ubHlFcnJvcigpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLnRyYW5zYWN0aW9uLl9leGVjUmVxdWVzdEFzeW5jKHtcbiAgICAgICAgICAgIG9wZXJhdGlvbjogdGhpcy5fcmF3T2JqZWN0U3RvcmUuY2xlYXIuYmluZCh0aGlzLl9yYXdPYmplY3RTdG9yZSwgdGhpcy50cmFuc2FjdGlvbi5fcm9sbGJhY2tMb2cpLFxuICAgICAgICAgICAgc291cmNlOiB0aGlzLFxuICAgICAgICB9KTtcbiAgICB9O1xuICAgIEZEQk9iamVjdFN0b3JlLnByb3RvdHlwZS5vcGVuQ3Vyc29yID0gZnVuY3Rpb24gKHJhbmdlLCBkaXJlY3Rpb24pIHtcbiAgICAgICAgY29uZmlybUFjdGl2ZVRyYW5zYWN0aW9uKHRoaXMpO1xuICAgICAgICBpZiAocmFuZ2UgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHJhbmdlID0gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICAgIGlmIChyYW5nZSAhPT0gdW5kZWZpbmVkICYmICEocmFuZ2UgaW5zdGFuY2VvZiBGREJLZXlSYW5nZV8xLmRlZmF1bHQpKSB7XG4gICAgICAgICAgICByYW5nZSA9IEZEQktleVJhbmdlXzEuZGVmYXVsdC5vbmx5KHZhbHVlVG9LZXlfMS5kZWZhdWx0KHJhbmdlKSk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHJlcXVlc3QgPSBuZXcgRkRCUmVxdWVzdF8xLmRlZmF1bHQoKTtcbiAgICAgICAgcmVxdWVzdC5zb3VyY2UgPSB0aGlzO1xuICAgICAgICByZXF1ZXN0LnRyYW5zYWN0aW9uID0gdGhpcy50cmFuc2FjdGlvbjtcbiAgICAgICAgdmFyIGN1cnNvciA9IG5ldyBGREJDdXJzb3JXaXRoVmFsdWVfMS5kZWZhdWx0KHRoaXMsIHJhbmdlLCBkaXJlY3Rpb24sIHJlcXVlc3QpO1xuICAgICAgICByZXR1cm4gdGhpcy50cmFuc2FjdGlvbi5fZXhlY1JlcXVlc3RBc3luYyh7XG4gICAgICAgICAgICBvcGVyYXRpb246IGN1cnNvci5faXRlcmF0ZS5iaW5kKGN1cnNvciksXG4gICAgICAgICAgICByZXF1ZXN0OiByZXF1ZXN0LFxuICAgICAgICAgICAgc291cmNlOiB0aGlzLFxuICAgICAgICB9KTtcbiAgICB9O1xuICAgIEZEQk9iamVjdFN0b3JlLnByb3RvdHlwZS5vcGVuS2V5Q3Vyc29yID0gZnVuY3Rpb24gKHJhbmdlLCBkaXJlY3Rpb24pIHtcbiAgICAgICAgY29uZmlybUFjdGl2ZVRyYW5zYWN0aW9uKHRoaXMpO1xuICAgICAgICBpZiAocmFuZ2UgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHJhbmdlID0gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICAgIGlmIChyYW5nZSAhPT0gdW5kZWZpbmVkICYmICEocmFuZ2UgaW5zdGFuY2VvZiBGREJLZXlSYW5nZV8xLmRlZmF1bHQpKSB7XG4gICAgICAgICAgICByYW5nZSA9IEZEQktleVJhbmdlXzEuZGVmYXVsdC5vbmx5KHZhbHVlVG9LZXlfMS5kZWZhdWx0KHJhbmdlKSk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHJlcXVlc3QgPSBuZXcgRkRCUmVxdWVzdF8xLmRlZmF1bHQoKTtcbiAgICAgICAgcmVxdWVzdC5zb3VyY2UgPSB0aGlzO1xuICAgICAgICByZXF1ZXN0LnRyYW5zYWN0aW9uID0gdGhpcy50cmFuc2FjdGlvbjtcbiAgICAgICAgdmFyIGN1cnNvciA9IG5ldyBGREJDdXJzb3JfMS5kZWZhdWx0KHRoaXMsIHJhbmdlLCBkaXJlY3Rpb24sIHJlcXVlc3QsIHRydWUpO1xuICAgICAgICByZXR1cm4gdGhpcy50cmFuc2FjdGlvbi5fZXhlY1JlcXVlc3RBc3luYyh7XG4gICAgICAgICAgICBvcGVyYXRpb246IGN1cnNvci5faXRlcmF0ZS5iaW5kKGN1cnNvciksXG4gICAgICAgICAgICByZXF1ZXN0OiByZXF1ZXN0LFxuICAgICAgICAgICAgc291cmNlOiB0aGlzLFxuICAgICAgICB9KTtcbiAgICB9O1xuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZSBtYXgtbGluZS1sZW5ndGhcbiAgICAvLyBodHRwOi8vd3d3LnczLm9yZy9UUi8yMDE1L1JFQy1JbmRleGVkREItMjAxNTAxMDgvI3dpZGwtSURCT2JqZWN0U3RvcmUtY3JlYXRlSW5kZXgtSURCSW5kZXgtRE9NU3RyaW5nLW5hbWUtRE9NU3RyaW5nLXNlcXVlbmNlLURPTVN0cmluZy0ta2V5UGF0aC1JREJJbmRleFBhcmFtZXRlcnMtb3B0aW9uYWxQYXJhbWV0ZXJzXG4gICAgRkRCT2JqZWN0U3RvcmUucHJvdG90eXBlLmNyZWF0ZUluZGV4ID0gZnVuY3Rpb24gKG5hbWUsIGtleVBhdGgsIG9wdGlvbmFsUGFyYW1ldGVycykge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICBpZiAob3B0aW9uYWxQYXJhbWV0ZXJzID09PSB2b2lkIDApIHsgb3B0aW9uYWxQYXJhbWV0ZXJzID0ge307IH1cbiAgICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPCAyKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIG11bHRpRW50cnkgPSBvcHRpb25hbFBhcmFtZXRlcnMubXVsdGlFbnRyeSAhPT0gdW5kZWZpbmVkXG4gICAgICAgICAgICA/IG9wdGlvbmFsUGFyYW1ldGVycy5tdWx0aUVudHJ5XG4gICAgICAgICAgICA6IGZhbHNlO1xuICAgICAgICB2YXIgdW5pcXVlID0gb3B0aW9uYWxQYXJhbWV0ZXJzLnVuaXF1ZSAhPT0gdW5kZWZpbmVkXG4gICAgICAgICAgICA/IG9wdGlvbmFsUGFyYW1ldGVycy51bmlxdWVcbiAgICAgICAgICAgIDogZmFsc2U7XG4gICAgICAgIGlmICh0aGlzLnRyYW5zYWN0aW9uLm1vZGUgIT09IFwidmVyc2lvbmNoYW5nZVwiKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgZXJyb3JzXzEuSW52YWxpZFN0YXRlRXJyb3IoKTtcbiAgICAgICAgfVxuICAgICAgICBjb25maXJtQWN0aXZlVHJhbnNhY3Rpb24odGhpcyk7XG4gICAgICAgIGlmICh0aGlzLmluZGV4TmFtZXMuaW5kZXhPZihuYW1lKSA+PSAwKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgZXJyb3JzXzEuQ29uc3RyYWludEVycm9yKCk7XG4gICAgICAgIH1cbiAgICAgICAgdmFsaWRhdGVLZXlQYXRoXzEuZGVmYXVsdChrZXlQYXRoKTtcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoa2V5UGF0aCkgJiYgbXVsdGlFbnRyeSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IGVycm9yc18xLkludmFsaWRBY2Nlc3NFcnJvcigpO1xuICAgICAgICB9XG4gICAgICAgIC8vIFRoZSBpbmRleCB0aGF0IGlzIHJlcXVlc3RlZCB0byBiZSBjcmVhdGVkIGNhbiBjb250YWluIGNvbnN0cmFpbnRzIG9uIHRoZSBkYXRhIGFsbG93ZWQgaW4gdGhlIGluZGV4J3NcbiAgICAgICAgLy8gcmVmZXJlbmNlZCBvYmplY3Qgc3RvcmUsIHN1Y2ggYXMgcmVxdWlyaW5nIHVuaXF1ZW5lc3Mgb2YgdGhlIHZhbHVlcyByZWZlcmVuY2VkIGJ5IHRoZSBpbmRleCdzIGtleVBhdGguIElmIHRoZVxuICAgICAgICAvLyByZWZlcmVuY2VkIG9iamVjdCBzdG9yZSBhbHJlYWR5IGNvbnRhaW5zIGRhdGEgd2hpY2ggdmlvbGF0ZXMgdGhlc2UgY29uc3RyYWludHMsIHRoaXMgTVVTVCBOT1QgY2F1c2UgdGhlXG4gICAgICAgIC8vIGltcGxlbWVudGF0aW9uIG9mIGNyZWF0ZUluZGV4IHRvIHRocm93IGFuIGV4Y2VwdGlvbiBvciBhZmZlY3Qgd2hhdCBpdCByZXR1cm5zLiBUaGUgaW1wbGVtZW50YXRpb24gTVVTVCBzdGlsbFxuICAgICAgICAvLyBjcmVhdGUgYW5kIHJldHVybiBhbiBJREJJbmRleCBvYmplY3QuIEluc3RlYWQgdGhlIGltcGxlbWVudGF0aW9uIG11c3QgcXVldWUgdXAgYW4gb3BlcmF0aW9uIHRvIGFib3J0IHRoZVxuICAgICAgICAvLyBcInZlcnNpb25jaGFuZ2VcIiB0cmFuc2FjdGlvbiB3aGljaCB3YXMgdXNlZCBmb3IgdGhlIGNyZWF0ZUluZGV4IGNhbGwuXG4gICAgICAgIHZhciBpbmRleE5hbWVzID0gdGhpcy5pbmRleE5hbWVzLnNsaWNlKCk7XG4gICAgICAgIHRoaXMudHJhbnNhY3Rpb24uX3JvbGxiYWNrTG9nLnB1c2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIGluZGV4MiA9IF90aGlzLl9yYXdPYmplY3RTdG9yZS5yYXdJbmRleGVzLmdldChuYW1lKTtcbiAgICAgICAgICAgIGlmIChpbmRleDIpIHtcbiAgICAgICAgICAgICAgICBpbmRleDIuZGVsZXRlZCA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBfdGhpcy5pbmRleE5hbWVzID0gZmFrZURPTVN0cmluZ0xpc3RfMS5kZWZhdWx0KGluZGV4TmFtZXMpO1xuICAgICAgICAgICAgX3RoaXMuX3Jhd09iamVjdFN0b3JlLnJhd0luZGV4ZXMuZGVsZXRlKG5hbWUpO1xuICAgICAgICB9KTtcbiAgICAgICAgdmFyIGluZGV4ID0gbmV3IEluZGV4XzEuZGVmYXVsdCh0aGlzLl9yYXdPYmplY3RTdG9yZSwgbmFtZSwga2V5UGF0aCwgbXVsdGlFbnRyeSwgdW5pcXVlKTtcbiAgICAgICAgdGhpcy5pbmRleE5hbWVzLnB1c2gobmFtZSk7XG4gICAgICAgIHRoaXMuaW5kZXhOYW1lcy5zb3J0KCk7XG4gICAgICAgIHRoaXMuX3Jhd09iamVjdFN0b3JlLnJhd0luZGV4ZXMuc2V0KG5hbWUsIGluZGV4KTtcbiAgICAgICAgaW5kZXguaW5pdGlhbGl6ZSh0aGlzLnRyYW5zYWN0aW9uKTsgLy8gVGhpcyBpcyBhc3luYyBieSBkZXNpZ25cbiAgICAgICAgcmV0dXJuIG5ldyBGREJJbmRleF8xLmRlZmF1bHQodGhpcywgaW5kZXgpO1xuICAgIH07XG4gICAgLy8gaHR0cHM6Ly93M2MuZ2l0aHViLmlvL0luZGV4ZWREQi8jZG9tLWlkYm9iamVjdHN0b3JlLWluZGV4XG4gICAgRkRCT2JqZWN0U3RvcmUucHJvdG90eXBlLmluZGV4ID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5fcmF3T2JqZWN0U3RvcmUuZGVsZXRlZCB8fFxuICAgICAgICAgICAgdGhpcy50cmFuc2FjdGlvbi5fc3RhdGUgPT09IFwiZmluaXNoZWRcIikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IGVycm9yc18xLkludmFsaWRTdGF0ZUVycm9yKCk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGluZGV4ID0gdGhpcy5faW5kZXhlc0NhY2hlLmdldChuYW1lKTtcbiAgICAgICAgaWYgKGluZGV4ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybiBpbmRleDtcbiAgICAgICAgfVxuICAgICAgICB2YXIgcmF3SW5kZXggPSB0aGlzLl9yYXdPYmplY3RTdG9yZS5yYXdJbmRleGVzLmdldChuYW1lKTtcbiAgICAgICAgaWYgKHRoaXMuaW5kZXhOYW1lcy5pbmRleE9mKG5hbWUpIDwgMCB8fCByYXdJbmRleCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgZXJyb3JzXzEuTm90Rm91bmRFcnJvcigpO1xuICAgICAgICB9XG4gICAgICAgIHZhciBpbmRleDIgPSBuZXcgRkRCSW5kZXhfMS5kZWZhdWx0KHRoaXMsIHJhd0luZGV4KTtcbiAgICAgICAgdGhpcy5faW5kZXhlc0NhY2hlLnNldChuYW1lLCBpbmRleDIpO1xuICAgICAgICByZXR1cm4gaW5kZXgyO1xuICAgIH07XG4gICAgRkRCT2JqZWN0U3RvcmUucHJvdG90eXBlLmRlbGV0ZUluZGV4ID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy50cmFuc2FjdGlvbi5tb2RlICE9PSBcInZlcnNpb25jaGFuZ2VcIikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IGVycm9yc18xLkludmFsaWRTdGF0ZUVycm9yKCk7XG4gICAgICAgIH1cbiAgICAgICAgY29uZmlybUFjdGl2ZVRyYW5zYWN0aW9uKHRoaXMpO1xuICAgICAgICB2YXIgcmF3SW5kZXggPSB0aGlzLl9yYXdPYmplY3RTdG9yZS5yYXdJbmRleGVzLmdldChuYW1lKTtcbiAgICAgICAgaWYgKHJhd0luZGV4ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBlcnJvcnNfMS5Ob3RGb3VuZEVycm9yKCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy50cmFuc2FjdGlvbi5fcm9sbGJhY2tMb2cucHVzaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByYXdJbmRleC5kZWxldGVkID0gZmFsc2U7XG4gICAgICAgICAgICBfdGhpcy5fcmF3T2JqZWN0U3RvcmUucmF3SW5kZXhlcy5zZXQobmFtZSwgcmF3SW5kZXgpO1xuICAgICAgICAgICAgX3RoaXMuaW5kZXhOYW1lcy5wdXNoKG5hbWUpO1xuICAgICAgICAgICAgX3RoaXMuaW5kZXhOYW1lcy5zb3J0KCk7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLmluZGV4TmFtZXMgPSBmYWtlRE9NU3RyaW5nTGlzdF8xLmRlZmF1bHQodGhpcy5pbmRleE5hbWVzLmZpbHRlcihmdW5jdGlvbiAoaW5kZXhOYW1lKSB7XG4gICAgICAgICAgICByZXR1cm4gaW5kZXhOYW1lICE9PSBuYW1lO1xuICAgICAgICB9KSk7XG4gICAgICAgIHJhd0luZGV4LmRlbGV0ZWQgPSB0cnVlOyAvLyBOb3Qgc3VyZSBpZiB0aGlzIGlzIHN1cHBvc2VkIHRvIGhhcHBlbiBzeW5jaHJvbm91c2x5XG4gICAgICAgIHRoaXMudHJhbnNhY3Rpb24uX2V4ZWNSZXF1ZXN0QXN5bmMoe1xuICAgICAgICAgICAgb3BlcmF0aW9uOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdmFyIHJhd0luZGV4MiA9IF90aGlzLl9yYXdPYmplY3RTdG9yZS5yYXdJbmRleGVzLmdldChuYW1lKTtcbiAgICAgICAgICAgICAgICAvLyBIYWNrIGluIGNhc2UgYW5vdGhlciBpbmRleCBpcyBnaXZlbiB0aGlzIG5hbWUgYmVmb3JlIHRoaXMgYXN5bmMgcmVxdWVzdCBpcyBwcm9jZXNzZWQuIEl0J2QgYmUgYmV0dGVyXG4gICAgICAgICAgICAgICAgLy8gdG8gaGF2ZSBhIHJlYWwgdW5pcXVlIElEIGZvciBlYWNoIGluZGV4LlxuICAgICAgICAgICAgICAgIGlmIChyYXdJbmRleCA9PT0gcmF3SW5kZXgyKSB7XG4gICAgICAgICAgICAgICAgICAgIF90aGlzLl9yYXdPYmplY3RTdG9yZS5yYXdJbmRleGVzLmRlbGV0ZShuYW1lKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc291cmNlOiB0aGlzLFxuICAgICAgICB9KTtcbiAgICB9O1xuICAgIC8vIGh0dHA6Ly93d3cudzMub3JnL1RSLzIwMTUvUkVDLUluZGV4ZWREQi0yMDE1MDEwOC8jd2lkbC1JREJPYmplY3RTdG9yZS1jb3VudC1JREJSZXF1ZXN0LWFueS1rZXlcbiAgICBGREJPYmplY3RTdG9yZS5wcm90b3R5cGUuY291bnQgPSBmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIGNvbmZpcm1BY3RpdmVUcmFuc2FjdGlvbih0aGlzKTtcbiAgICAgICAgaWYgKGtleSA9PT0gbnVsbCkge1xuICAgICAgICAgICAga2V5ID0gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICAgIGlmIChrZXkgIT09IHVuZGVmaW5lZCAmJiAhKGtleSBpbnN0YW5jZW9mIEZEQktleVJhbmdlXzEuZGVmYXVsdCkpIHtcbiAgICAgICAgICAgIGtleSA9IEZEQktleVJhbmdlXzEuZGVmYXVsdC5vbmx5KHZhbHVlVG9LZXlfMS5kZWZhdWx0KGtleSkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLnRyYW5zYWN0aW9uLl9leGVjUmVxdWVzdEFzeW5jKHtcbiAgICAgICAgICAgIG9wZXJhdGlvbjogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHZhciBjb3VudCA9IDA7XG4gICAgICAgICAgICAgICAgdmFyIGN1cnNvciA9IG5ldyBGREJDdXJzb3JfMS5kZWZhdWx0KF90aGlzLCBrZXkpO1xuICAgICAgICAgICAgICAgIHdoaWxlIChjdXJzb3IuX2l0ZXJhdGUoKSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICBjb3VudCArPSAxO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gY291bnQ7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc291cmNlOiB0aGlzLFxuICAgICAgICB9KTtcbiAgICB9O1xuICAgIEZEQk9iamVjdFN0b3JlLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIFwiW29iamVjdCBJREJPYmplY3RTdG9yZV1cIjtcbiAgICB9O1xuICAgIHJldHVybiBGREJPYmplY3RTdG9yZTtcbn0oKSk7XG5leHBvcnRzLmRlZmF1bHQgPSBGREJPYmplY3RTdG9yZTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2Zha2UtaW5kZXhlZGRiL2J1aWxkL0ZEQk9iamVjdFN0b3JlLmpzXG4vLyBtb2R1bGUgaWQgPSAyOVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcbiAgICAgICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcbiAgICAgICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xuICAgICAgICByZXR1cm4gZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICB9O1xuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xuICAgIH07XG59KSgpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIEZEQkN1cnNvcl8xID0gcmVxdWlyZShcIi4vRkRCQ3Vyc29yXCIpO1xudmFyIEZEQkN1cnNvcldpdGhWYWx1ZSA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoRkRCQ3Vyc29yV2l0aFZhbHVlLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIEZEQkN1cnNvcldpdGhWYWx1ZShzb3VyY2UsIHJhbmdlLCBkaXJlY3Rpb24sIHJlcXVlc3QpIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcywgc291cmNlLCByYW5nZSwgZGlyZWN0aW9uLCByZXF1ZXN0KSB8fCB0aGlzO1xuICAgICAgICBfdGhpcy52YWx1ZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICBGREJDdXJzb3JXaXRoVmFsdWUucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gXCJbb2JqZWN0IElEQkN1cnNvcldpdGhWYWx1ZV1cIjtcbiAgICB9O1xuICAgIHJldHVybiBGREJDdXJzb3JXaXRoVmFsdWU7XG59KEZEQkN1cnNvcl8xLmRlZmF1bHQpKTtcbmV4cG9ydHMuZGVmYXVsdCA9IEZEQkN1cnNvcldpdGhWYWx1ZTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2Zha2UtaW5kZXhlZGRiL2J1aWxkL0ZEQkN1cnNvcldpdGhWYWx1ZS5qc1xuLy8gbW9kdWxlIGlkID0gMzBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX192YWx1ZXMgPSAodGhpcyAmJiB0aGlzLl9fdmFsdWVzKSB8fCBmdW5jdGlvbihvKSB7XG4gICAgdmFyIHMgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgU3ltYm9sLml0ZXJhdG9yLCBtID0gcyAmJiBvW3NdLCBpID0gMDtcbiAgICBpZiAobSkgcmV0dXJuIG0uY2FsbChvKTtcbiAgICBpZiAobyAmJiB0eXBlb2Ygby5sZW5ndGggPT09IFwibnVtYmVyXCIpIHJldHVybiB7XG4gICAgICAgIG5leHQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmIChvICYmIGkgPj0gby5sZW5ndGgpIG8gPSB2b2lkIDA7XG4gICAgICAgICAgICByZXR1cm4geyB2YWx1ZTogbyAmJiBvW2krK10sIGRvbmU6ICFvIH07XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IocyA/IFwiT2JqZWN0IGlzIG5vdCBpdGVyYWJsZS5cIiA6IFwiU3ltYm9sLml0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgZXJyb3JzXzEgPSByZXF1aXJlKFwiLi9lcnJvcnNcIik7XG52YXIgc3RvcHBlZCA9IGZ1bmN0aW9uIChldmVudCwgbGlzdGVuZXIpIHtcbiAgICByZXR1cm4gKGV2ZW50LmltbWVkaWF0ZVByb3BhZ2F0aW9uU3RvcHBlZCB8fFxuICAgICAgICAoZXZlbnQuZXZlbnRQaGFzZSA9PT0gZXZlbnQuQ0FQVFVSSU5HX1BIQVNFICYmXG4gICAgICAgICAgICBsaXN0ZW5lci5jYXB0dXJlID09PSBmYWxzZSkgfHxcbiAgICAgICAgKGV2ZW50LmV2ZW50UGhhc2UgPT09IGV2ZW50LkJVQkJMSU5HX1BIQVNFICYmIGxpc3RlbmVyLmNhcHR1cmUgPT09IHRydWUpKTtcbn07XG4vLyBodHRwOi8vd3d3LnczLm9yZy9UUi9kb20vI2NvbmNlcHQtZXZlbnQtbGlzdGVuZXItaW52b2tlXG52YXIgaW52b2tlRXZlbnRMaXN0ZW5lcnMgPSBmdW5jdGlvbiAoZXZlbnQsIG9iaikge1xuICAgIHZhciBlXzEsIF9hO1xuICAgIGV2ZW50LmN1cnJlbnRUYXJnZXQgPSBvYmo7XG4gICAgdHJ5IHtcbiAgICAgICAgLy8gVGhlIGNhbGxiYWNrIG1pZ2h0IGNhdXNlIG9iai5saXN0ZW5lcnMgdG8gbXV0YXRlIGFzIHdlIHRyYXZlcnNlIGl0LlxuICAgICAgICAvLyBUYWtlIGEgY29weSBvZiB0aGUgYXJyYXkgc28gdGhhdCBub3RoaW5nIHNuZWFrcyBpbiBhbmQgd2UgZG9uJ3QgbG9zZVxuICAgICAgICAvLyBvdXIgcGxhY2UuXG4gICAgICAgIGZvciAodmFyIF9iID0gX192YWx1ZXMob2JqLmxpc3RlbmVycy5zbGljZSgpKSwgX2MgPSBfYi5uZXh0KCk7ICFfYy5kb25lOyBfYyA9IF9iLm5leHQoKSkge1xuICAgICAgICAgICAgdmFyIGxpc3RlbmVyID0gX2MudmFsdWU7XG4gICAgICAgICAgICBpZiAoZXZlbnQudHlwZSAhPT0gbGlzdGVuZXIudHlwZSB8fCBzdG9wcGVkKGV2ZW50LCBsaXN0ZW5lcikpIHtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgICAgIGxpc3RlbmVyLmNhbGxiYWNrLmNhbGwoZXZlbnQuY3VycmVudFRhcmdldCwgZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGNhdGNoIChlXzFfMSkgeyBlXzEgPSB7IGVycm9yOiBlXzFfMSB9OyB9XG4gICAgZmluYWxseSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBpZiAoX2MgJiYgIV9jLmRvbmUgJiYgKF9hID0gX2IucmV0dXJuKSkgX2EuY2FsbChfYik7XG4gICAgICAgIH1cbiAgICAgICAgZmluYWxseSB7IGlmIChlXzEpIHRocm93IGVfMS5lcnJvcjsgfVxuICAgIH1cbiAgICB2YXIgdHlwZVRvUHJvcCA9IHtcbiAgICAgICAgYWJvcnQ6IFwib25hYm9ydFwiLFxuICAgICAgICBibG9ja2VkOiBcIm9uYmxvY2tlZFwiLFxuICAgICAgICBjb21wbGV0ZTogXCJvbmNvbXBsZXRlXCIsXG4gICAgICAgIGVycm9yOiBcIm9uZXJyb3JcIixcbiAgICAgICAgc3VjY2VzczogXCJvbnN1Y2Nlc3NcIixcbiAgICAgICAgdXBncmFkZW5lZWRlZDogXCJvbnVwZ3JhZGVuZWVkZWRcIixcbiAgICAgICAgdmVyc2lvbmNoYW5nZTogXCJvbnZlcnNpb25jaGFuZ2VcIixcbiAgICB9O1xuICAgIHZhciBwcm9wID0gdHlwZVRvUHJvcFtldmVudC50eXBlXTtcbiAgICBpZiAocHJvcCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIlVua25vd24gZXZlbnQgdHlwZTogXFxcIlwiICsgZXZlbnQudHlwZSArIFwiXFxcIlwiKTtcbiAgICB9XG4gICAgdmFyIGNhbGxiYWNrID0gZXZlbnQuY3VycmVudFRhcmdldFtwcm9wXTtcbiAgICBpZiAoY2FsbGJhY2spIHtcbiAgICAgICAgdmFyIGxpc3RlbmVyID0ge1xuICAgICAgICAgICAgY2FsbGJhY2s6IGNhbGxiYWNrLFxuICAgICAgICAgICAgY2FwdHVyZTogZmFsc2UsXG4gICAgICAgICAgICB0eXBlOiBldmVudC50eXBlLFxuICAgICAgICB9O1xuICAgICAgICBpZiAoIXN0b3BwZWQoZXZlbnQsIGxpc3RlbmVyKSkge1xuICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICAgICAgbGlzdGVuZXIuY2FsbGJhY2suY2FsbChldmVudC5jdXJyZW50VGFyZ2V0LCBldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG59O1xudmFyIEZha2VFdmVudFRhcmdldCA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBGYWtlRXZlbnRUYXJnZXQoKSB7XG4gICAgICAgIHRoaXMubGlzdGVuZXJzID0gW107XG4gICAgfVxuICAgIEZha2VFdmVudFRhcmdldC5wcm90b3R5cGUuYWRkRXZlbnRMaXN0ZW5lciA9IGZ1bmN0aW9uICh0eXBlLCBjYWxsYmFjaywgY2FwdHVyZSkge1xuICAgICAgICBpZiAoY2FwdHVyZSA9PT0gdm9pZCAwKSB7IGNhcHR1cmUgPSBmYWxzZTsgfVxuICAgICAgICB0aGlzLmxpc3RlbmVycy5wdXNoKHtcbiAgICAgICAgICAgIGNhbGxiYWNrOiBjYWxsYmFjayxcbiAgICAgICAgICAgIGNhcHR1cmU6IGNhcHR1cmUsXG4gICAgICAgICAgICB0eXBlOiB0eXBlLFxuICAgICAgICB9KTtcbiAgICB9O1xuICAgIEZha2VFdmVudFRhcmdldC5wcm90b3R5cGUucmVtb3ZlRXZlbnRMaXN0ZW5lciA9IGZ1bmN0aW9uICh0eXBlLCBjYWxsYmFjaywgY2FwdHVyZSkge1xuICAgICAgICBpZiAoY2FwdHVyZSA9PT0gdm9pZCAwKSB7IGNhcHR1cmUgPSBmYWxzZTsgfVxuICAgICAgICB2YXIgaSA9IHRoaXMubGlzdGVuZXJzLmZpbmRJbmRleChmdW5jdGlvbiAobGlzdGVuZXIpIHtcbiAgICAgICAgICAgIHJldHVybiAobGlzdGVuZXIudHlwZSA9PT0gdHlwZSAmJlxuICAgICAgICAgICAgICAgIGxpc3RlbmVyLmNhbGxiYWNrID09PSBjYWxsYmFjayAmJlxuICAgICAgICAgICAgICAgIGxpc3RlbmVyLmNhcHR1cmUgPT09IGNhcHR1cmUpO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5saXN0ZW5lcnMuc3BsaWNlKGksIDEpO1xuICAgIH07XG4gICAgLy8gaHR0cDovL3d3dy53My5vcmcvVFIvZG9tLyNkaXNwYXRjaGluZy1ldmVudHNcbiAgICBGYWtlRXZlbnRUYXJnZXQucHJvdG90eXBlLmRpc3BhdGNoRXZlbnQgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgdmFyIGVfMiwgX2EsIGVfMywgX2I7XG4gICAgICAgIGlmIChldmVudC5kaXNwYXRjaGVkIHx8ICFldmVudC5pbml0aWFsaXplZCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IGVycm9yc18xLkludmFsaWRTdGF0ZUVycm9yKFwiVGhlIG9iamVjdCBpcyBpbiBhbiBpbnZhbGlkIHN0YXRlLlwiKTtcbiAgICAgICAgfVxuICAgICAgICBldmVudC5pc1RydXN0ZWQgPSBmYWxzZTtcbiAgICAgICAgZXZlbnQuZGlzcGF0Y2hlZCA9IHRydWU7XG4gICAgICAgIGV2ZW50LnRhcmdldCA9IHRoaXM7XG4gICAgICAgIC8vIE5PVCBTVVJFIFdIRU4gVEhJUyBTSE9VTEQgQkUgU0VUICAgICAgICBldmVudC5ldmVudFBhdGggPSBbXTtcbiAgICAgICAgZXZlbnQuZXZlbnRQaGFzZSA9IGV2ZW50LkNBUFRVUklOR19QSEFTRTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGZvciAodmFyIF9jID0gX192YWx1ZXMoZXZlbnQuZXZlbnRQYXRoKSwgX2QgPSBfYy5uZXh0KCk7ICFfZC5kb25lOyBfZCA9IF9jLm5leHQoKSkge1xuICAgICAgICAgICAgICAgIHZhciBvYmogPSBfZC52YWx1ZTtcbiAgICAgICAgICAgICAgICBpZiAoIWV2ZW50LnByb3BhZ2F0aW9uU3RvcHBlZCkge1xuICAgICAgICAgICAgICAgICAgICBpbnZva2VFdmVudExpc3RlbmVycyhldmVudCwgb2JqKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVfMl8xKSB7IGVfMiA9IHsgZXJyb3I6IGVfMl8xIH07IH1cbiAgICAgICAgZmluYWxseSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGlmIChfZCAmJiAhX2QuZG9uZSAmJiAoX2EgPSBfYy5yZXR1cm4pKSBfYS5jYWxsKF9jKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZpbmFsbHkgeyBpZiAoZV8yKSB0aHJvdyBlXzIuZXJyb3I7IH1cbiAgICAgICAgfVxuICAgICAgICBldmVudC5ldmVudFBoYXNlID0gZXZlbnQuQVRfVEFSR0VUO1xuICAgICAgICBpZiAoIWV2ZW50LnByb3BhZ2F0aW9uU3RvcHBlZCkge1xuICAgICAgICAgICAgaW52b2tlRXZlbnRMaXN0ZW5lcnMoZXZlbnQsIGV2ZW50LnRhcmdldCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGV2ZW50LmJ1YmJsZXMpIHtcbiAgICAgICAgICAgIGV2ZW50LmV2ZW50UGF0aC5yZXZlcnNlKCk7XG4gICAgICAgICAgICBldmVudC5ldmVudFBoYXNlID0gZXZlbnQuQlVCQkxJTkdfUEhBU0U7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGZvciAodmFyIF9lID0gX192YWx1ZXMoZXZlbnQuZXZlbnRQYXRoKSwgX2YgPSBfZS5uZXh0KCk7ICFfZi5kb25lOyBfZiA9IF9lLm5leHQoKSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgb2JqID0gX2YudmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIGlmICghZXZlbnQucHJvcGFnYXRpb25TdG9wcGVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpbnZva2VFdmVudExpc3RlbmVycyhldmVudCwgb2JqKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChlXzNfMSkgeyBlXzMgPSB7IGVycm9yOiBlXzNfMSB9OyB9XG4gICAgICAgICAgICBmaW5hbGx5IHtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoX2YgJiYgIV9mLmRvbmUgJiYgKF9iID0gX2UucmV0dXJuKSkgX2IuY2FsbChfZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGZpbmFsbHkgeyBpZiAoZV8zKSB0aHJvdyBlXzMuZXJyb3I7IH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBldmVudC5kaXNwYXRjaGVkID0gZmFsc2U7XG4gICAgICAgIGV2ZW50LmV2ZW50UGhhc2UgPSBldmVudC5OT05FO1xuICAgICAgICBldmVudC5jdXJyZW50VGFyZ2V0ID0gbnVsbDtcbiAgICAgICAgaWYgKGV2ZW50LmNhbmNlbGVkKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfTtcbiAgICByZXR1cm4gRmFrZUV2ZW50VGFyZ2V0O1xufSgpKTtcbmV4cG9ydHMuZGVmYXVsdCA9IEZha2VFdmVudFRhcmdldDtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2Zha2UtaW5kZXhlZGRiL2J1aWxkL2xpYi9GYWtlRXZlbnRUYXJnZXQuanNcbi8vIG1vZHVsZSBpZCA9IDMxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xuLy8gaHR0cHM6Ly9oZXljYW0uZ2l0aHViLmlvL3dlYmlkbC8jRW5mb3JjZVJhbmdlXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgZW5mb3JjZVJhbmdlID0gZnVuY3Rpb24gKG51bSwgdHlwZSkge1xuICAgIHZhciBtaW4gPSAwO1xuICAgIHZhciBtYXggPSB0eXBlID09PSBcInVuc2lnbmVkIGxvbmdcIiA/IDQyOTQ5NjcyOTUgOiA5MDA3MTk5MjU0NzQwOTkxO1xuICAgIGlmIChpc05hTihudW0pIHx8IG51bSA8IG1pbiB8fCBudW0gPiBtYXgpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcigpO1xuICAgIH1cbiAgICBpZiAobnVtID49IDApIHtcbiAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IobnVtKTtcbiAgICB9XG59O1xuZXhwb3J0cy5kZWZhdWx0ID0gZW5mb3JjZVJhbmdlO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvZmFrZS1pbmRleGVkZGIvYnVpbGQvbGliL2VuZm9yY2VSYW5nZS5qc1xuLy8gbW9kdWxlIGlkID0gMzJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgRXZlbnQgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gRXZlbnQodHlwZSwgZXZlbnRJbml0RGljdCkge1xuICAgICAgICBpZiAoZXZlbnRJbml0RGljdCA9PT0gdm9pZCAwKSB7IGV2ZW50SW5pdERpY3QgPSB7fTsgfVxuICAgICAgICB0aGlzLmV2ZW50UGF0aCA9IFtdO1xuICAgICAgICB0aGlzLk5PTkUgPSAwO1xuICAgICAgICB0aGlzLkNBUFRVUklOR19QSEFTRSA9IDE7XG4gICAgICAgIHRoaXMuQVRfVEFSR0VUID0gMjtcbiAgICAgICAgdGhpcy5CVUJCTElOR19QSEFTRSA9IDM7XG4gICAgICAgIC8vIEZsYWdzXG4gICAgICAgIHRoaXMucHJvcGFnYXRpb25TdG9wcGVkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuaW1tZWRpYXRlUHJvcGFnYXRpb25TdG9wcGVkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuY2FuY2VsZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5pbml0aWFsaXplZCA9IHRydWU7XG4gICAgICAgIHRoaXMuZGlzcGF0Y2hlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLnRhcmdldCA9IG51bGw7XG4gICAgICAgIHRoaXMuY3VycmVudFRhcmdldCA9IG51bGw7XG4gICAgICAgIHRoaXMuZXZlbnRQaGFzZSA9IDA7XG4gICAgICAgIHRoaXMuZGVmYXVsdFByZXZlbnRlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmlzVHJ1c3RlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLnRpbWVTdGFtcCA9IERhdGUubm93KCk7XG4gICAgICAgIHRoaXMudHlwZSA9IHR5cGU7XG4gICAgICAgIHRoaXMuYnViYmxlcyA9XG4gICAgICAgICAgICBldmVudEluaXREaWN0LmJ1YmJsZXMgIT09IHVuZGVmaW5lZCA/IGV2ZW50SW5pdERpY3QuYnViYmxlcyA6IGZhbHNlO1xuICAgICAgICB0aGlzLmNhbmNlbGFibGUgPVxuICAgICAgICAgICAgZXZlbnRJbml0RGljdC5jYW5jZWxhYmxlICE9PSB1bmRlZmluZWRcbiAgICAgICAgICAgICAgICA/IGV2ZW50SW5pdERpY3QuY2FuY2VsYWJsZVxuICAgICAgICAgICAgICAgIDogZmFsc2U7XG4gICAgfVxuICAgIEV2ZW50LnByb3RvdHlwZS5wcmV2ZW50RGVmYXVsdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHRoaXMuY2FuY2VsYWJsZSkge1xuICAgICAgICAgICAgdGhpcy5jYW5jZWxlZCA9IHRydWU7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIEV2ZW50LnByb3RvdHlwZS5zdG9wUHJvcGFnYXRpb24gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMucHJvcGFnYXRpb25TdG9wcGVkID0gdHJ1ZTtcbiAgICB9O1xuICAgIEV2ZW50LnByb3RvdHlwZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMucHJvcGFnYXRpb25TdG9wcGVkID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5pbW1lZGlhdGVQcm9wYWdhdGlvblN0b3BwZWQgPSB0cnVlO1xuICAgIH07XG4gICAgcmV0dXJuIEV2ZW50O1xufSgpKTtcbmV4cG9ydHMuZGVmYXVsdCA9IEV2ZW50O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvZmFrZS1pbmRleGVkZGIvYnVpbGQvbGliL0Zha2VFdmVudC5qc1xuLy8gbW9kdWxlIGlkID0gMzNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX192YWx1ZXMgPSAodGhpcyAmJiB0aGlzLl9fdmFsdWVzKSB8fCBmdW5jdGlvbihvKSB7XG4gICAgdmFyIHMgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgU3ltYm9sLml0ZXJhdG9yLCBtID0gcyAmJiBvW3NdLCBpID0gMDtcbiAgICBpZiAobSkgcmV0dXJuIG0uY2FsbChvKTtcbiAgICBpZiAobyAmJiB0eXBlb2Ygby5sZW5ndGggPT09IFwibnVtYmVyXCIpIHJldHVybiB7XG4gICAgICAgIG5leHQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmIChvICYmIGkgPj0gby5sZW5ndGgpIG8gPSB2b2lkIDA7XG4gICAgICAgICAgICByZXR1cm4geyB2YWx1ZTogbyAmJiBvW2krK10sIGRvbmU6ICFvIH07XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IocyA/IFwiT2JqZWN0IGlzIG5vdCBpdGVyYWJsZS5cIiA6IFwiU3ltYm9sLml0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcbn07XG52YXIgX19yZWFkID0gKHRoaXMgJiYgdGhpcy5fX3JlYWQpIHx8IGZ1bmN0aW9uIChvLCBuKSB7XG4gICAgdmFyIG0gPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdO1xuICAgIGlmICghbSkgcmV0dXJuIG87XG4gICAgdmFyIGkgPSBtLmNhbGwobyksIHIsIGFyID0gW10sIGU7XG4gICAgdHJ5IHtcbiAgICAgICAgd2hpbGUgKChuID09PSB2b2lkIDAgfHwgbi0tID4gMCkgJiYgIShyID0gaS5uZXh0KCkpLmRvbmUpIGFyLnB1c2goci52YWx1ZSk7XG4gICAgfVxuICAgIGNhdGNoIChlcnJvcikgeyBlID0geyBlcnJvcjogZXJyb3IgfTsgfVxuICAgIGZpbmFsbHkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgaWYgKHIgJiYgIXIuZG9uZSAmJiAobSA9IGlbXCJyZXR1cm5cIl0pKSBtLmNhbGwoaSk7XG4gICAgICAgIH1cbiAgICAgICAgZmluYWxseSB7IGlmIChlKSB0aHJvdyBlLmVycm9yOyB9XG4gICAgfVxuICAgIHJldHVybiBhcjtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5yZXF1aXJlKFwic2V0aW1tZWRpYXRlXCIpO1xudmFyIEZEQkRhdGFiYXNlXzEgPSByZXF1aXJlKFwiLi9GREJEYXRhYmFzZVwiKTtcbnZhciBGREJPcGVuREJSZXF1ZXN0XzEgPSByZXF1aXJlKFwiLi9GREJPcGVuREJSZXF1ZXN0XCIpO1xudmFyIEZEQlZlcnNpb25DaGFuZ2VFdmVudF8xID0gcmVxdWlyZShcIi4vRkRCVmVyc2lvbkNoYW5nZUV2ZW50XCIpO1xudmFyIGNtcF8xID0gcmVxdWlyZShcIi4vbGliL2NtcFwiKTtcbnZhciBEYXRhYmFzZV8xID0gcmVxdWlyZShcIi4vbGliL0RhdGFiYXNlXCIpO1xudmFyIGVuZm9yY2VSYW5nZV8xID0gcmVxdWlyZShcIi4vbGliL2VuZm9yY2VSYW5nZVwiKTtcbnZhciBlcnJvcnNfMSA9IHJlcXVpcmUoXCIuL2xpYi9lcnJvcnNcIik7XG52YXIgRmFrZUV2ZW50XzEgPSByZXF1aXJlKFwiLi9saWIvRmFrZUV2ZW50XCIpO1xudmFyIHdhaXRGb3JPdGhlcnNDbG9zZWREZWxldGUgPSBmdW5jdGlvbiAoZGF0YWJhc2VzLCBuYW1lLCBvcGVuRGF0YWJhc2VzLCBjYikge1xuICAgIHZhciBhbnlPcGVuID0gb3BlbkRhdGFiYXNlcy5zb21lKGZ1bmN0aW9uIChvcGVuRGF0YWJhc2UyKSB7XG4gICAgICAgIHJldHVybiAhb3BlbkRhdGFiYXNlMi5fY2xvc2VkICYmICFvcGVuRGF0YWJhc2UyLl9jbG9zZVBlbmRpbmc7XG4gICAgfSk7XG4gICAgaWYgKGFueU9wZW4pIHtcbiAgICAgICAgc2V0SW1tZWRpYXRlKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB3YWl0Rm9yT3RoZXJzQ2xvc2VkRGVsZXRlKGRhdGFiYXNlcywgbmFtZSwgb3BlbkRhdGFiYXNlcywgY2IpO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBkYXRhYmFzZXMuZGVsZXRlKG5hbWUpO1xuICAgIGNiKG51bGwpO1xufTtcbi8vIGh0dHA6Ly93d3cudzMub3JnL1RSLzIwMTUvUkVDLUluZGV4ZWREQi0yMDE1MDEwOC8jZGZuLXN0ZXBzLWZvci1kZWxldGluZy1hLWRhdGFiYXNlXG52YXIgZGVsZXRlRGF0YWJhc2UgPSBmdW5jdGlvbiAoZGF0YWJhc2VzLCBuYW1lLCByZXF1ZXN0LCBjYikge1xuICAgIHZhciBlXzEsIF9hO1xuICAgIHRyeSB7XG4gICAgICAgIHZhciBkYiA9IGRhdGFiYXNlcy5nZXQobmFtZSk7XG4gICAgICAgIGlmIChkYiA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBjYihudWxsKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBkYi5kZWxldGVQZW5kaW5nID0gdHJ1ZTtcbiAgICAgICAgdmFyIG9wZW5EYXRhYmFzZXMgPSBkYi5jb25uZWN0aW9ucy5maWx0ZXIoZnVuY3Rpb24gKGNvbm5lY3Rpb24pIHtcbiAgICAgICAgICAgIHJldHVybiAhY29ubmVjdGlvbi5fY2xvc2VkICYmICFjb25uZWN0aW9uLl9jbG9zZVBlbmRpbmc7XG4gICAgICAgIH0pO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgZm9yICh2YXIgb3BlbkRhdGFiYXNlc18xID0gX192YWx1ZXMob3BlbkRhdGFiYXNlcyksIG9wZW5EYXRhYmFzZXNfMV8xID0gb3BlbkRhdGFiYXNlc18xLm5leHQoKTsgIW9wZW5EYXRhYmFzZXNfMV8xLmRvbmU7IG9wZW5EYXRhYmFzZXNfMV8xID0gb3BlbkRhdGFiYXNlc18xLm5leHQoKSkge1xuICAgICAgICAgICAgICAgIHZhciBvcGVuRGF0YWJhc2UyID0gb3BlbkRhdGFiYXNlc18xXzEudmFsdWU7XG4gICAgICAgICAgICAgICAgaWYgKCFvcGVuRGF0YWJhc2UyLl9jbG9zZVBlbmRpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGV2ZW50XzEgPSBuZXcgRkRCVmVyc2lvbkNoYW5nZUV2ZW50XzEuZGVmYXVsdChcInZlcnNpb25jaGFuZ2VcIiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgbmV3VmVyc2lvbjogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgIG9sZFZlcnNpb246IGRiLnZlcnNpb24sXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBvcGVuRGF0YWJhc2UyLmRpc3BhdGNoRXZlbnQoZXZlbnRfMSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlXzFfMSkgeyBlXzEgPSB7IGVycm9yOiBlXzFfMSB9OyB9XG4gICAgICAgIGZpbmFsbHkge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBpZiAob3BlbkRhdGFiYXNlc18xXzEgJiYgIW9wZW5EYXRhYmFzZXNfMV8xLmRvbmUgJiYgKF9hID0gb3BlbkRhdGFiYXNlc18xLnJldHVybikpIF9hLmNhbGwob3BlbkRhdGFiYXNlc18xKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZpbmFsbHkgeyBpZiAoZV8xKSB0aHJvdyBlXzEuZXJyb3I7IH1cbiAgICAgICAgfVxuICAgICAgICB2YXIgYW55T3BlbiA9IG9wZW5EYXRhYmFzZXMuc29tZShmdW5jdGlvbiAob3BlbkRhdGFiYXNlMykge1xuICAgICAgICAgICAgcmV0dXJuICFvcGVuRGF0YWJhc2UzLl9jbG9zZWQgJiYgIW9wZW5EYXRhYmFzZTMuX2Nsb3NlUGVuZGluZztcbiAgICAgICAgfSk7XG4gICAgICAgIGlmIChyZXF1ZXN0ICYmIGFueU9wZW4pIHtcbiAgICAgICAgICAgIHZhciBldmVudF8yID0gbmV3IEZEQlZlcnNpb25DaGFuZ2VFdmVudF8xLmRlZmF1bHQoXCJibG9ja2VkXCIsIHtcbiAgICAgICAgICAgICAgICBuZXdWZXJzaW9uOiBudWxsLFxuICAgICAgICAgICAgICAgIG9sZFZlcnNpb246IGRiLnZlcnNpb24sXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJlcXVlc3QuZGlzcGF0Y2hFdmVudChldmVudF8yKTtcbiAgICAgICAgfVxuICAgICAgICB3YWl0Rm9yT3RoZXJzQ2xvc2VkRGVsZXRlKGRhdGFiYXNlcywgbmFtZSwgb3BlbkRhdGFiYXNlcywgY2IpO1xuICAgIH1cbiAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgIGNiKGVycik7XG4gICAgfVxufTtcbi8vIGh0dHA6Ly93d3cudzMub3JnL1RSLzIwMTUvUkVDLUluZGV4ZWREQi0yMDE1MDEwOC8jZGZuLXN0ZXBzLWZvci1ydW5uaW5nLWEtdmVyc2lvbmNoYW5nZS10cmFuc2FjdGlvblxudmFyIHJ1blZlcnNpb25jaGFuZ2VUcmFuc2FjdGlvbiA9IGZ1bmN0aW9uIChjb25uZWN0aW9uLCB2ZXJzaW9uLCByZXF1ZXN0LCBjYikge1xuICAgIHZhciBlXzIsIF9hO1xuICAgIGNvbm5lY3Rpb24uX3J1bm5pbmdWZXJzaW9uY2hhbmdlVHJhbnNhY3Rpb24gPSB0cnVlO1xuICAgIHZhciBvbGRWZXJzaW9uID0gY29ubmVjdGlvbi52ZXJzaW9uO1xuICAgIHZhciBvcGVuRGF0YWJhc2VzID0gY29ubmVjdGlvbi5fcmF3RGF0YWJhc2UuY29ubmVjdGlvbnMuZmlsdGVyKGZ1bmN0aW9uIChvdGhlckRhdGFiYXNlKSB7XG4gICAgICAgIHJldHVybiBjb25uZWN0aW9uICE9PSBvdGhlckRhdGFiYXNlO1xuICAgIH0pO1xuICAgIHRyeSB7XG4gICAgICAgIGZvciAodmFyIG9wZW5EYXRhYmFzZXNfMiA9IF9fdmFsdWVzKG9wZW5EYXRhYmFzZXMpLCBvcGVuRGF0YWJhc2VzXzJfMSA9IG9wZW5EYXRhYmFzZXNfMi5uZXh0KCk7ICFvcGVuRGF0YWJhc2VzXzJfMS5kb25lOyBvcGVuRGF0YWJhc2VzXzJfMSA9IG9wZW5EYXRhYmFzZXNfMi5uZXh0KCkpIHtcbiAgICAgICAgICAgIHZhciBvcGVuRGF0YWJhc2UyID0gb3BlbkRhdGFiYXNlc18yXzEudmFsdWU7XG4gICAgICAgICAgICBpZiAoIW9wZW5EYXRhYmFzZTIuX2Nsb3NlZCAmJiAhb3BlbkRhdGFiYXNlMi5fY2xvc2VQZW5kaW5nKSB7XG4gICAgICAgICAgICAgICAgdmFyIGV2ZW50XzMgPSBuZXcgRkRCVmVyc2lvbkNoYW5nZUV2ZW50XzEuZGVmYXVsdChcInZlcnNpb25jaGFuZ2VcIiwge1xuICAgICAgICAgICAgICAgICAgICBuZXdWZXJzaW9uOiB2ZXJzaW9uLFxuICAgICAgICAgICAgICAgICAgICBvbGRWZXJzaW9uOiBvbGRWZXJzaW9uLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIG9wZW5EYXRhYmFzZTIuZGlzcGF0Y2hFdmVudChldmVudF8zKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBjYXRjaCAoZV8yXzEpIHsgZV8yID0geyBlcnJvcjogZV8yXzEgfTsgfVxuICAgIGZpbmFsbHkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgaWYgKG9wZW5EYXRhYmFzZXNfMl8xICYmICFvcGVuRGF0YWJhc2VzXzJfMS5kb25lICYmIChfYSA9IG9wZW5EYXRhYmFzZXNfMi5yZXR1cm4pKSBfYS5jYWxsKG9wZW5EYXRhYmFzZXNfMik7XG4gICAgICAgIH1cbiAgICAgICAgZmluYWxseSB7IGlmIChlXzIpIHRocm93IGVfMi5lcnJvcjsgfVxuICAgIH1cbiAgICB2YXIgYW55T3BlbiA9IG9wZW5EYXRhYmFzZXMuc29tZShmdW5jdGlvbiAob3BlbkRhdGFiYXNlMykge1xuICAgICAgICByZXR1cm4gIW9wZW5EYXRhYmFzZTMuX2Nsb3NlZCAmJiAhb3BlbkRhdGFiYXNlMy5fY2xvc2VQZW5kaW5nO1xuICAgIH0pO1xuICAgIGlmIChhbnlPcGVuKSB7XG4gICAgICAgIHZhciBldmVudF80ID0gbmV3IEZEQlZlcnNpb25DaGFuZ2VFdmVudF8xLmRlZmF1bHQoXCJibG9ja2VkXCIsIHtcbiAgICAgICAgICAgIG5ld1ZlcnNpb246IHZlcnNpb24sXG4gICAgICAgICAgICBvbGRWZXJzaW9uOiBvbGRWZXJzaW9uLFxuICAgICAgICB9KTtcbiAgICAgICAgcmVxdWVzdC5kaXNwYXRjaEV2ZW50KGV2ZW50XzQpO1xuICAgIH1cbiAgICB2YXIgd2FpdEZvck90aGVyc0Nsb3NlZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGFueU9wZW4yID0gb3BlbkRhdGFiYXNlcy5zb21lKGZ1bmN0aW9uIChvcGVuRGF0YWJhc2UyKSB7XG4gICAgICAgICAgICByZXR1cm4gIW9wZW5EYXRhYmFzZTIuX2Nsb3NlZCAmJiAhb3BlbkRhdGFiYXNlMi5fY2xvc2VQZW5kaW5nO1xuICAgICAgICB9KTtcbiAgICAgICAgaWYgKGFueU9wZW4yKSB7XG4gICAgICAgICAgICBzZXRJbW1lZGlhdGUod2FpdEZvck90aGVyc0Nsb3NlZCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgLy8gU2V0IHRoZSB2ZXJzaW9uIG9mIGRhdGFiYXNlIHRvIHZlcnNpb24uIFRoaXMgY2hhbmdlIGlzIGNvbnNpZGVyZWQgcGFydCBvZiB0aGUgdHJhbnNhY3Rpb24sIGFuZCBzbyBpZiB0aGVcbiAgICAgICAgLy8gdHJhbnNhY3Rpb24gaXMgYWJvcnRlZCwgdGhpcyBjaGFuZ2UgaXMgcmV2ZXJ0ZWQuXG4gICAgICAgIGNvbm5lY3Rpb24uX3Jhd0RhdGFiYXNlLnZlcnNpb24gPSB2ZXJzaW9uO1xuICAgICAgICBjb25uZWN0aW9uLnZlcnNpb24gPSB2ZXJzaW9uO1xuICAgICAgICAvLyBHZXQgcmlkIG9mIHRoaXMgc2V0SW1tZWRpYXRlP1xuICAgICAgICB2YXIgdHJhbnNhY3Rpb24gPSBjb25uZWN0aW9uLnRyYW5zYWN0aW9uKGNvbm5lY3Rpb24ub2JqZWN0U3RvcmVOYW1lcywgXCJ2ZXJzaW9uY2hhbmdlXCIpO1xuICAgICAgICByZXF1ZXN0LnJlc3VsdCA9IGNvbm5lY3Rpb247XG4gICAgICAgIHJlcXVlc3QucmVhZHlTdGF0ZSA9IFwiZG9uZVwiO1xuICAgICAgICByZXF1ZXN0LnRyYW5zYWN0aW9uID0gdHJhbnNhY3Rpb247XG4gICAgICAgIHRyYW5zYWN0aW9uLl9yb2xsYmFja0xvZy5wdXNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGNvbm5lY3Rpb24uX3Jhd0RhdGFiYXNlLnZlcnNpb24gPSBvbGRWZXJzaW9uO1xuICAgICAgICAgICAgY29ubmVjdGlvbi52ZXJzaW9uID0gb2xkVmVyc2lvbjtcbiAgICAgICAgfSk7XG4gICAgICAgIHZhciBldmVudCA9IG5ldyBGREJWZXJzaW9uQ2hhbmdlRXZlbnRfMS5kZWZhdWx0KFwidXBncmFkZW5lZWRlZFwiLCB7XG4gICAgICAgICAgICBuZXdWZXJzaW9uOiB2ZXJzaW9uLFxuICAgICAgICAgICAgb2xkVmVyc2lvbjogb2xkVmVyc2lvbixcbiAgICAgICAgfSk7XG4gICAgICAgIHJlcXVlc3QuZGlzcGF0Y2hFdmVudChldmVudCk7XG4gICAgICAgIHRyYW5zYWN0aW9uLmFkZEV2ZW50TGlzdGVuZXIoXCJlcnJvclwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBjb25uZWN0aW9uLl9ydW5uaW5nVmVyc2lvbmNoYW5nZVRyYW5zYWN0aW9uID0gZmFsc2U7XG4gICAgICAgICAgICAvLyB0aHJvdyBhcmd1bWVudHNbMF0udGFyZ2V0LmVycm9yO1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJlcnJvciBpbiB2ZXJzaW9uY2hhbmdlIHRyYW5zYWN0aW9uIC0gbm90IHN1cmUgaWYgYW55dGhpbmcgbmVlZHMgdG8gYmUgZG9uZSBoZXJlXCIsIGUudGFyZ2V0LmVycm9yLm5hbWUpO1xuICAgICAgICB9KTtcbiAgICAgICAgdHJhbnNhY3Rpb24uYWRkRXZlbnRMaXN0ZW5lcihcImFib3J0XCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGNvbm5lY3Rpb24uX3J1bm5pbmdWZXJzaW9uY2hhbmdlVHJhbnNhY3Rpb24gPSBmYWxzZTtcbiAgICAgICAgICAgIHJlcXVlc3QudHJhbnNhY3Rpb24gPSBudWxsO1xuICAgICAgICAgICAgc2V0SW1tZWRpYXRlKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBjYihuZXcgZXJyb3JzXzEuQWJvcnRFcnJvcigpKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgdHJhbnNhY3Rpb24uYWRkRXZlbnRMaXN0ZW5lcihcImNvbXBsZXRlXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGNvbm5lY3Rpb24uX3J1bm5pbmdWZXJzaW9uY2hhbmdlVHJhbnNhY3Rpb24gPSBmYWxzZTtcbiAgICAgICAgICAgIHJlcXVlc3QudHJhbnNhY3Rpb24gPSBudWxsO1xuICAgICAgICAgICAgLy8gTGV0IG90aGVyIGNvbXBsZXRlIGV2ZW50IGhhbmRsZXJzIHJ1biBiZWZvcmUgY29udGludWluZ1xuICAgICAgICAgICAgc2V0SW1tZWRpYXRlKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBpZiAoY29ubmVjdGlvbi5fY2xvc2VQZW5kaW5nKSB7XG4gICAgICAgICAgICAgICAgICAgIGNiKG5ldyBlcnJvcnNfMS5BYm9ydEVycm9yKCkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgY2IobnVsbCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgd2FpdEZvck90aGVyc0Nsb3NlZCgpO1xufTtcbi8vIGh0dHA6Ly93d3cudzMub3JnL1RSLzIwMTUvUkVDLUluZGV4ZWREQi0yMDE1MDEwOC8jZGZuLXN0ZXBzLWZvci1vcGVuaW5nLWEtZGF0YWJhc2VcbnZhciBvcGVuRGF0YWJhc2UgPSBmdW5jdGlvbiAoZGF0YWJhc2VzLCBuYW1lLCB2ZXJzaW9uLCByZXF1ZXN0LCBjYikge1xuICAgIHZhciBkYiA9IGRhdGFiYXNlcy5nZXQobmFtZSk7XG4gICAgaWYgKGRiID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgZGIgPSBuZXcgRGF0YWJhc2VfMS5kZWZhdWx0KG5hbWUsIDApO1xuICAgICAgICBkYXRhYmFzZXMuc2V0KG5hbWUsIGRiKTtcbiAgICB9XG4gICAgaWYgKHZlcnNpb24gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICB2ZXJzaW9uID0gZGIudmVyc2lvbiAhPT0gMCA/IGRiLnZlcnNpb24gOiAxO1xuICAgIH1cbiAgICBpZiAoZGIudmVyc2lvbiA+IHZlcnNpb24pIHtcbiAgICAgICAgcmV0dXJuIGNiKG5ldyBlcnJvcnNfMS5WZXJzaW9uRXJyb3IoKSk7XG4gICAgfVxuICAgIHZhciBjb25uZWN0aW9uID0gbmV3IEZEQkRhdGFiYXNlXzEuZGVmYXVsdChkYik7XG4gICAgaWYgKGRiLnZlcnNpb24gPCB2ZXJzaW9uKSB7XG4gICAgICAgIHJ1blZlcnNpb25jaGFuZ2VUcmFuc2FjdGlvbihjb25uZWN0aW9uLCB2ZXJzaW9uLCByZXF1ZXN0LCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgLy8gRE8gVEhJUyBIRVJFOiBlbnN1cmUgdGhhdCBjb25uZWN0aW9uIGlzIGNsb3NlZCBieSBydW5uaW5nIHRoZSBzdGVwcyBmb3IgY2xvc2luZyBhIGRhdGFiYXNlIGNvbm5lY3Rpb24gYmVmb3JlIHRoZXNlXG4gICAgICAgICAgICAgICAgLy8gc3RlcHMgYXJlIGFib3J0ZWQuXG4gICAgICAgICAgICAgICAgcmV0dXJuIGNiKGVycik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYihudWxsLCBjb25uZWN0aW9uKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBjYihudWxsLCBjb25uZWN0aW9uKTtcbiAgICB9XG59O1xudmFyIEZEQkZhY3RvcnkgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gRkRCRmFjdG9yeSgpIHtcbiAgICAgICAgdGhpcy5jbXAgPSBjbXBfMS5kZWZhdWx0O1xuICAgICAgICB0aGlzLl9kYXRhYmFzZXMgPSBuZXcgTWFwKCk7XG4gICAgfVxuICAgIC8vIGh0dHA6Ly93d3cudzMub3JnL1RSLzIwMTUvUkVDLUluZGV4ZWREQi0yMDE1MDEwOC8jd2lkbC1JREJGYWN0b3J5LWRlbGV0ZURhdGFiYXNlLUlEQk9wZW5EQlJlcXVlc3QtRE9NU3RyaW5nLW5hbWVcbiAgICBGREJGYWN0b3J5LnByb3RvdHlwZS5kZWxldGVEYXRhYmFzZSA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHZhciByZXF1ZXN0ID0gbmV3IEZEQk9wZW5EQlJlcXVlc3RfMS5kZWZhdWx0KCk7XG4gICAgICAgIHJlcXVlc3Quc291cmNlID0gbnVsbDtcbiAgICAgICAgc2V0SW1tZWRpYXRlKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBkYiA9IF90aGlzLl9kYXRhYmFzZXMuZ2V0KG5hbWUpO1xuICAgICAgICAgICAgdmFyIG9sZFZlcnNpb24gPSBkYiAhPT0gdW5kZWZpbmVkID8gZGIudmVyc2lvbiA6IDA7XG4gICAgICAgICAgICBkZWxldGVEYXRhYmFzZShfdGhpcy5fZGF0YWJhc2VzLCBuYW1lLCByZXF1ZXN0LCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgICAgICByZXF1ZXN0LmVycm9yID0gbmV3IEVycm9yKCk7XG4gICAgICAgICAgICAgICAgICAgIHJlcXVlc3QuZXJyb3IubmFtZSA9IGVyci5uYW1lO1xuICAgICAgICAgICAgICAgICAgICByZXF1ZXN0LnJlYWR5U3RhdGUgPSBcImRvbmVcIjtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGV2ZW50XzUgPSBuZXcgRmFrZUV2ZW50XzEuZGVmYXVsdChcImVycm9yXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJ1YmJsZXM6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBjYW5jZWxhYmxlOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgZXZlbnRfNS5ldmVudFBhdGggPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgcmVxdWVzdC5kaXNwYXRjaEV2ZW50KGV2ZW50XzUpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJlcXVlc3QucmVzdWx0ID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgIHJlcXVlc3QucmVhZHlTdGF0ZSA9IFwiZG9uZVwiO1xuICAgICAgICAgICAgICAgIHZhciBldmVudDIgPSBuZXcgRkRCVmVyc2lvbkNoYW5nZUV2ZW50XzEuZGVmYXVsdChcInN1Y2Nlc3NcIiwge1xuICAgICAgICAgICAgICAgICAgICBuZXdWZXJzaW9uOiBudWxsLFxuICAgICAgICAgICAgICAgICAgICBvbGRWZXJzaW9uOiBvbGRWZXJzaW9uLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHJlcXVlc3QuZGlzcGF0Y2hFdmVudChldmVudDIpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gcmVxdWVzdDtcbiAgICB9O1xuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZSBtYXgtbGluZS1sZW5ndGhcbiAgICAvLyBodHRwOi8vd3d3LnczLm9yZy9UUi8yMDE1L1JFQy1JbmRleGVkREItMjAxNTAxMDgvI3dpZGwtSURCRmFjdG9yeS1vcGVuLUlEQk9wZW5EQlJlcXVlc3QtRE9NU3RyaW5nLW5hbWUtdW5zaWduZWQtbG9uZy1sb25nLXZlcnNpb25cbiAgICBGREJGYWN0b3J5LnByb3RvdHlwZS5vcGVuID0gZnVuY3Rpb24gKG5hbWUsIHZlcnNpb24pIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIHZlcnNpb24gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgLy8gQmFzZWQgb24gc3BlYywgbm90IHN1cmUgd2h5IFwiTUFYX1NBRkVfSU5URUdFUlwiIGluc3RlYWQgb2YgXCJ1bnNpZ25lZCBsb25nIGxvbmdcIiwgYnV0IGl0J3MgbmVlZGVkIHRvIHBhc3NcbiAgICAgICAgICAgIC8vIHRlc3RzXG4gICAgICAgICAgICB2ZXJzaW9uID0gZW5mb3JjZVJhbmdlXzEuZGVmYXVsdCh2ZXJzaW9uLCBcIk1BWF9TQUZFX0lOVEVHRVJcIik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHZlcnNpb24gPT09IDApIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgcmVxdWVzdCA9IG5ldyBGREJPcGVuREJSZXF1ZXN0XzEuZGVmYXVsdCgpO1xuICAgICAgICByZXF1ZXN0LnNvdXJjZSA9IG51bGw7XG4gICAgICAgIHNldEltbWVkaWF0ZShmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBvcGVuRGF0YWJhc2UoX3RoaXMuX2RhdGFiYXNlcywgbmFtZSwgdmVyc2lvbiwgcmVxdWVzdCwgZnVuY3Rpb24gKGVyciwgY29ubmVjdGlvbikge1xuICAgICAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVxdWVzdC5yZXN1bHQgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgICAgIHJlcXVlc3QucmVhZHlTdGF0ZSA9IFwiZG9uZVwiO1xuICAgICAgICAgICAgICAgICAgICByZXF1ZXN0LmVycm9yID0gbmV3IEVycm9yKCk7XG4gICAgICAgICAgICAgICAgICAgIHJlcXVlc3QuZXJyb3IubmFtZSA9IGVyci5uYW1lO1xuICAgICAgICAgICAgICAgICAgICB2YXIgZXZlbnRfNiA9IG5ldyBGYWtlRXZlbnRfMS5kZWZhdWx0KFwiZXJyb3JcIiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgYnViYmxlczogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhbmNlbGFibGU6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBldmVudF82LmV2ZW50UGF0aCA9IFtdO1xuICAgICAgICAgICAgICAgICAgICByZXF1ZXN0LmRpc3BhdGNoRXZlbnQoZXZlbnRfNik7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmVxdWVzdC5yZXN1bHQgPSBjb25uZWN0aW9uO1xuICAgICAgICAgICAgICAgIHJlcXVlc3QucmVhZHlTdGF0ZSA9IFwiZG9uZVwiO1xuICAgICAgICAgICAgICAgIHZhciBldmVudDIgPSBuZXcgRmFrZUV2ZW50XzEuZGVmYXVsdChcInN1Y2Nlc3NcIik7XG4gICAgICAgICAgICAgICAgZXZlbnQyLmV2ZW50UGF0aCA9IFtdO1xuICAgICAgICAgICAgICAgIHJlcXVlc3QuZGlzcGF0Y2hFdmVudChldmVudDIpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gcmVxdWVzdDtcbiAgICB9O1xuICAgIC8vIGh0dHBzOi8vdzNjLmdpdGh1Yi5pby9JbmRleGVkREIvI2RvbS1pZGJmYWN0b3J5LWRhdGFiYXNlc1xuICAgIEZEQkZhY3RvcnkucHJvdG90eXBlLmRhdGFiYXNlcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlKSB7XG4gICAgICAgICAgICB2YXIgZV8zLCBfYTtcbiAgICAgICAgICAgIHZhciByZXN1bHQgPSBbXTtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgX2IgPSBfX3ZhbHVlcyhfdGhpcy5fZGF0YWJhc2VzKSwgX2MgPSBfYi5uZXh0KCk7ICFfYy5kb25lOyBfYyA9IF9iLm5leHQoKSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgX2QgPSBfX3JlYWQoX2MudmFsdWUsIDIpLCBuYW1lXzEgPSBfZFswXSwgZGF0YWJhc2UgPSBfZFsxXTtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnB1c2goe1xuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogbmFtZV8xLFxuICAgICAgICAgICAgICAgICAgICAgICAgdmVyc2lvbjogZGF0YWJhc2UudmVyc2lvbixcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGVfM18xKSB7IGVfMyA9IHsgZXJyb3I6IGVfM18xIH07IH1cbiAgICAgICAgICAgIGZpbmFsbHkge1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChfYyAmJiAhX2MuZG9uZSAmJiAoX2EgPSBfYi5yZXR1cm4pKSBfYS5jYWxsKF9iKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZmluYWxseSB7IGlmIChlXzMpIHRocm93IGVfMy5lcnJvcjsgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmVzb2x2ZShyZXN1bHQpO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIEZEQkZhY3RvcnkucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gXCJbb2JqZWN0IElEQkZhY3RvcnldXCI7XG4gICAgfTtcbiAgICByZXR1cm4gRkRCRmFjdG9yeTtcbn0oKSk7XG5leHBvcnRzLmRlZmF1bHQgPSBGREJGYWN0b3J5O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvZmFrZS1pbmRleGVkZGIvYnVpbGQvRkRCRmFjdG9yeS5qc1xuLy8gbW9kdWxlIGlkID0gMzRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gc2hpbSBmb3IgdXNpbmcgcHJvY2VzcyBpbiBicm93c2VyXG52YXIgcHJvY2VzcyA9IG1vZHVsZS5leHBvcnRzID0ge307XG5cbi8vIGNhY2hlZCBmcm9tIHdoYXRldmVyIGdsb2JhbCBpcyBwcmVzZW50IHNvIHRoYXQgdGVzdCBydW5uZXJzIHRoYXQgc3R1YiBpdFxuLy8gZG9uJ3QgYnJlYWsgdGhpbmdzLiAgQnV0IHdlIG5lZWQgdG8gd3JhcCBpdCBpbiBhIHRyeSBjYXRjaCBpbiBjYXNlIGl0IGlzXG4vLyB3cmFwcGVkIGluIHN0cmljdCBtb2RlIGNvZGUgd2hpY2ggZG9lc24ndCBkZWZpbmUgYW55IGdsb2JhbHMuICBJdCdzIGluc2lkZSBhXG4vLyBmdW5jdGlvbiBiZWNhdXNlIHRyeS9jYXRjaGVzIGRlb3B0aW1pemUgaW4gY2VydGFpbiBlbmdpbmVzLlxuXG52YXIgY2FjaGVkU2V0VGltZW91dDtcbnZhciBjYWNoZWRDbGVhclRpbWVvdXQ7XG5cbmZ1bmN0aW9uIGRlZmF1bHRTZXRUaW1vdXQoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdzZXRUaW1lb3V0IGhhcyBub3QgYmVlbiBkZWZpbmVkJyk7XG59XG5mdW5jdGlvbiBkZWZhdWx0Q2xlYXJUaW1lb3V0ICgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2NsZWFyVGltZW91dCBoYXMgbm90IGJlZW4gZGVmaW5lZCcpO1xufVxuKGZ1bmN0aW9uICgpIHtcbiAgICB0cnkge1xuICAgICAgICBpZiAodHlwZW9mIHNldFRpbWVvdXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBzZXRUaW1lb3V0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IGRlZmF1bHRTZXRUaW1vdXQ7XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBkZWZhdWx0U2V0VGltb3V0O1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICBpZiAodHlwZW9mIGNsZWFyVGltZW91dCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gY2xlYXJUaW1lb3V0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gZGVmYXVsdENsZWFyVGltZW91dDtcbiAgICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gZGVmYXVsdENsZWFyVGltZW91dDtcbiAgICB9XG59ICgpKVxuZnVuY3Rpb24gcnVuVGltZW91dChmdW4pIHtcbiAgICBpZiAoY2FjaGVkU2V0VGltZW91dCA9PT0gc2V0VGltZW91dCkge1xuICAgICAgICAvL25vcm1hbCBlbnZpcm9tZW50cyBpbiBzYW5lIHNpdHVhdGlvbnNcbiAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9XG4gICAgLy8gaWYgc2V0VGltZW91dCB3YXNuJ3QgYXZhaWxhYmxlIGJ1dCB3YXMgbGF0dGVyIGRlZmluZWRcbiAgICBpZiAoKGNhY2hlZFNldFRpbWVvdXQgPT09IGRlZmF1bHRTZXRUaW1vdXQgfHwgIWNhY2hlZFNldFRpbWVvdXQpICYmIHNldFRpbWVvdXQpIHtcbiAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IHNldFRpbWVvdXQ7XG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIC8vIHdoZW4gd2hlbiBzb21lYm9keSBoYXMgc2NyZXdlZCB3aXRoIHNldFRpbWVvdXQgYnV0IG5vIEkuRS4gbWFkZG5lc3NcbiAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9IGNhdGNoKGUpe1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gV2hlbiB3ZSBhcmUgaW4gSS5FLiBidXQgdGhlIHNjcmlwdCBoYXMgYmVlbiBldmFsZWQgc28gSS5FLiBkb2Vzbid0IHRydXN0IHRoZSBnbG9iYWwgb2JqZWN0IHdoZW4gY2FsbGVkIG5vcm1hbGx5XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dC5jYWxsKG51bGwsIGZ1biwgMCk7XG4gICAgICAgIH0gY2F0Y2goZSl7XG4gICAgICAgICAgICAvLyBzYW1lIGFzIGFib3ZlIGJ1dCB3aGVuIGl0J3MgYSB2ZXJzaW9uIG9mIEkuRS4gdGhhdCBtdXN0IGhhdmUgdGhlIGdsb2JhbCBvYmplY3QgZm9yICd0aGlzJywgaG9wZnVsbHkgb3VyIGNvbnRleHQgY29ycmVjdCBvdGhlcndpc2UgaXQgd2lsbCB0aHJvdyBhIGdsb2JhbCBlcnJvclxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQuY2FsbCh0aGlzLCBmdW4sIDApO1xuICAgICAgICB9XG4gICAgfVxuXG5cbn1cbmZ1bmN0aW9uIHJ1bkNsZWFyVGltZW91dChtYXJrZXIpIHtcbiAgICBpZiAoY2FjaGVkQ2xlYXJUaW1lb3V0ID09PSBjbGVhclRpbWVvdXQpIHtcbiAgICAgICAgLy9ub3JtYWwgZW52aXJvbWVudHMgaW4gc2FuZSBzaXR1YXRpb25zXG4gICAgICAgIHJldHVybiBjbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9XG4gICAgLy8gaWYgY2xlYXJUaW1lb3V0IHdhc24ndCBhdmFpbGFibGUgYnV0IHdhcyBsYXR0ZXIgZGVmaW5lZFxuICAgIGlmICgoY2FjaGVkQ2xlYXJUaW1lb3V0ID09PSBkZWZhdWx0Q2xlYXJUaW1lb3V0IHx8ICFjYWNoZWRDbGVhclRpbWVvdXQpICYmIGNsZWFyVGltZW91dCkge1xuICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBjbGVhclRpbWVvdXQ7XG4gICAgICAgIHJldHVybiBjbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgLy8gd2hlbiB3aGVuIHNvbWVib2R5IGhhcyBzY3Jld2VkIHdpdGggc2V0VGltZW91dCBidXQgbm8gSS5FLiBtYWRkbmVzc1xuICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfSBjYXRjaCAoZSl7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBXaGVuIHdlIGFyZSBpbiBJLkUuIGJ1dCB0aGUgc2NyaXB0IGhhcyBiZWVuIGV2YWxlZCBzbyBJLkUuIGRvZXNuJ3QgIHRydXN0IHRoZSBnbG9iYWwgb2JqZWN0IHdoZW4gY2FsbGVkIG5vcm1hbGx5XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0LmNhbGwobnVsbCwgbWFya2VyKTtcbiAgICAgICAgfSBjYXRjaCAoZSl7XG4gICAgICAgICAgICAvLyBzYW1lIGFzIGFib3ZlIGJ1dCB3aGVuIGl0J3MgYSB2ZXJzaW9uIG9mIEkuRS4gdGhhdCBtdXN0IGhhdmUgdGhlIGdsb2JhbCBvYmplY3QgZm9yICd0aGlzJywgaG9wZnVsbHkgb3VyIGNvbnRleHQgY29ycmVjdCBvdGhlcndpc2UgaXQgd2lsbCB0aHJvdyBhIGdsb2JhbCBlcnJvci5cbiAgICAgICAgICAgIC8vIFNvbWUgdmVyc2lvbnMgb2YgSS5FLiBoYXZlIGRpZmZlcmVudCBydWxlcyBmb3IgY2xlYXJUaW1lb3V0IHZzIHNldFRpbWVvdXRcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQuY2FsbCh0aGlzLCBtYXJrZXIpO1xuICAgICAgICB9XG4gICAgfVxuXG5cblxufVxudmFyIHF1ZXVlID0gW107XG52YXIgZHJhaW5pbmcgPSBmYWxzZTtcbnZhciBjdXJyZW50UXVldWU7XG52YXIgcXVldWVJbmRleCA9IC0xO1xuXG5mdW5jdGlvbiBjbGVhblVwTmV4dFRpY2soKSB7XG4gICAgaWYgKCFkcmFpbmluZyB8fCAhY3VycmVudFF1ZXVlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBpZiAoY3VycmVudFF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBxdWV1ZSA9IGN1cnJlbnRRdWV1ZS5jb25jYXQocXVldWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICB9XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBkcmFpblF1ZXVlKCk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBkcmFpblF1ZXVlKCkge1xuICAgIGlmIChkcmFpbmluZykge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciB0aW1lb3V0ID0gcnVuVGltZW91dChjbGVhblVwTmV4dFRpY2spO1xuICAgIGRyYWluaW5nID0gdHJ1ZTtcblxuICAgIHZhciBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgd2hpbGUobGVuKSB7XG4gICAgICAgIGN1cnJlbnRRdWV1ZSA9IHF1ZXVlO1xuICAgICAgICBxdWV1ZSA9IFtdO1xuICAgICAgICB3aGlsZSAoKytxdWV1ZUluZGV4IDwgbGVuKSB7XG4gICAgICAgICAgICBpZiAoY3VycmVudFF1ZXVlKSB7XG4gICAgICAgICAgICAgICAgY3VycmVudFF1ZXVlW3F1ZXVlSW5kZXhdLnJ1bigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICAgICAgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIH1cbiAgICBjdXJyZW50UXVldWUgPSBudWxsO1xuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgcnVuQ2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xufVxuXG5wcm9jZXNzLm5leHRUaWNrID0gZnVuY3Rpb24gKGZ1bikge1xuICAgIHZhciBhcmdzID0gbmV3IEFycmF5KGFyZ3VtZW50cy5sZW5ndGggLSAxKTtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGFyZ3NbaSAtIDFdID0gYXJndW1lbnRzW2ldO1xuICAgICAgICB9XG4gICAgfVxuICAgIHF1ZXVlLnB1c2gobmV3IEl0ZW0oZnVuLCBhcmdzKSk7XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCA9PT0gMSAmJiAhZHJhaW5pbmcpIHtcbiAgICAgICAgcnVuVGltZW91dChkcmFpblF1ZXVlKTtcbiAgICB9XG59O1xuXG4vLyB2OCBsaWtlcyBwcmVkaWN0aWJsZSBvYmplY3RzXG5mdW5jdGlvbiBJdGVtKGZ1biwgYXJyYXkpIHtcbiAgICB0aGlzLmZ1biA9IGZ1bjtcbiAgICB0aGlzLmFycmF5ID0gYXJyYXk7XG59XG5JdGVtLnByb3RvdHlwZS5ydW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5mdW4uYXBwbHkobnVsbCwgdGhpcy5hcnJheSk7XG59O1xucHJvY2Vzcy50aXRsZSA9ICdicm93c2VyJztcbnByb2Nlc3MuYnJvd3NlciA9IHRydWU7XG5wcm9jZXNzLmVudiA9IHt9O1xucHJvY2Vzcy5hcmd2ID0gW107XG5wcm9jZXNzLnZlcnNpb24gPSAnJzsgLy8gZW1wdHkgc3RyaW5nIHRvIGF2b2lkIHJlZ2V4cCBpc3N1ZXNcbnByb2Nlc3MudmVyc2lvbnMgPSB7fTtcblxuZnVuY3Rpb24gbm9vcCgpIHt9XG5cbnByb2Nlc3Mub24gPSBub29wO1xucHJvY2Vzcy5hZGRMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLm9uY2UgPSBub29wO1xucHJvY2Vzcy5vZmYgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUFsbExpc3RlbmVycyA9IG5vb3A7XG5wcm9jZXNzLmVtaXQgPSBub29wO1xucHJvY2Vzcy5wcmVwZW5kTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5wcmVwZW5kT25jZUxpc3RlbmVyID0gbm9vcDtcblxucHJvY2Vzcy5saXN0ZW5lcnMgPSBmdW5jdGlvbiAobmFtZSkgeyByZXR1cm4gW10gfVxuXG5wcm9jZXNzLmJpbmRpbmcgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5iaW5kaW5nIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5cbnByb2Nlc3MuY3dkID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gJy8nIH07XG5wcm9jZXNzLmNoZGlyID0gZnVuY3Rpb24gKGRpcikge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5jaGRpciBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xucHJvY2Vzcy51bWFzayA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gMDsgfTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vICh3ZWJwYWNrKS9ub2RlX21vZHVsZXMvcHJvY2Vzcy9icm93c2VyLmpzXG4vLyBtb2R1bGUgaWQgPSAzNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcbiAgICAgICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcbiAgICAgICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xuICAgICAgICByZXR1cm4gZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICB9O1xuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xuICAgIH07XG59KSgpO1xudmFyIF9fdmFsdWVzID0gKHRoaXMgJiYgdGhpcy5fX3ZhbHVlcykgfHwgZnVuY3Rpb24obykge1xuICAgIHZhciBzID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIFN5bWJvbC5pdGVyYXRvciwgbSA9IHMgJiYgb1tzXSwgaSA9IDA7XG4gICAgaWYgKG0pIHJldHVybiBtLmNhbGwobyk7XG4gICAgaWYgKG8gJiYgdHlwZW9mIG8ubGVuZ3RoID09PSBcIm51bWJlclwiKSByZXR1cm4ge1xuICAgICAgICBuZXh0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAobyAmJiBpID49IG8ubGVuZ3RoKSBvID0gdm9pZCAwO1xuICAgICAgICAgICAgcmV0dXJuIHsgdmFsdWU6IG8gJiYgb1tpKytdLCBkb25lOiAhbyB9O1xuICAgICAgICB9XG4gICAgfTtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKHMgPyBcIk9iamVjdCBpcyBub3QgaXRlcmFibGUuXCIgOiBcIlN5bWJvbC5pdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIEZEQlRyYW5zYWN0aW9uXzEgPSByZXF1aXJlKFwiLi9GREJUcmFuc2FjdGlvblwiKTtcbnZhciBlcnJvcnNfMSA9IHJlcXVpcmUoXCIuL2xpYi9lcnJvcnNcIik7XG52YXIgZmFrZURPTVN0cmluZ0xpc3RfMSA9IHJlcXVpcmUoXCIuL2xpYi9mYWtlRE9NU3RyaW5nTGlzdFwiKTtcbnZhciBGYWtlRXZlbnRUYXJnZXRfMSA9IHJlcXVpcmUoXCIuL2xpYi9GYWtlRXZlbnRUYXJnZXRcIik7XG52YXIgT2JqZWN0U3RvcmVfMSA9IHJlcXVpcmUoXCIuL2xpYi9PYmplY3RTdG9yZVwiKTtcbnZhciB2YWxpZGF0ZUtleVBhdGhfMSA9IHJlcXVpcmUoXCIuL2xpYi92YWxpZGF0ZUtleVBhdGhcIik7XG52YXIgY29uZmlybUFjdGl2ZVZlcnNpb25jaGFuZ2VUcmFuc2FjdGlvbiA9IGZ1bmN0aW9uIChkYXRhYmFzZSkge1xuICAgIGlmICghZGF0YWJhc2UuX3J1bm5pbmdWZXJzaW9uY2hhbmdlVHJhbnNhY3Rpb24pIHtcbiAgICAgICAgdGhyb3cgbmV3IGVycm9yc18xLkludmFsaWRTdGF0ZUVycm9yKCk7XG4gICAgfVxuICAgIC8vIEZpbmQgdGhlIGxhdGVzdCB2ZXJzaW9uY2hhbmdlIHRyYW5zYWN0aW9uXG4gICAgdmFyIHRyYW5zYWN0aW9ucyA9IGRhdGFiYXNlLl9yYXdEYXRhYmFzZS50cmFuc2FjdGlvbnMuZmlsdGVyKGZ1bmN0aW9uICh0eCkge1xuICAgICAgICByZXR1cm4gdHgubW9kZSA9PT0gXCJ2ZXJzaW9uY2hhbmdlXCI7XG4gICAgfSk7XG4gICAgdmFyIHRyYW5zYWN0aW9uID0gdHJhbnNhY3Rpb25zW3RyYW5zYWN0aW9ucy5sZW5ndGggLSAxXTtcbiAgICBpZiAoIXRyYW5zYWN0aW9uIHx8IHRyYW5zYWN0aW9uLl9zdGF0ZSA9PT0gXCJmaW5pc2hlZFwiKSB7XG4gICAgICAgIHRocm93IG5ldyBlcnJvcnNfMS5JbnZhbGlkU3RhdGVFcnJvcigpO1xuICAgIH1cbiAgICBpZiAodHJhbnNhY3Rpb24uX3N0YXRlICE9PSBcImFjdGl2ZVwiKSB7XG4gICAgICAgIHRocm93IG5ldyBlcnJvcnNfMS5UcmFuc2FjdGlvbkluYWN0aXZlRXJyb3IoKTtcbiAgICB9XG4gICAgcmV0dXJuIHRyYW5zYWN0aW9uO1xufTtcbi8vIGh0dHA6Ly93d3cudzMub3JnL1RSLzIwMTUvUkVDLUluZGV4ZWREQi0yMDE1MDEwOC8jZGF0YWJhc2UtY2xvc2luZy1zdGVwc1xudmFyIGNsb3NlQ29ubmVjdGlvbiA9IGZ1bmN0aW9uIChjb25uZWN0aW9uKSB7XG4gICAgY29ubmVjdGlvbi5fY2xvc2VQZW5kaW5nID0gdHJ1ZTtcbiAgICB2YXIgdHJhbnNhY3Rpb25zQ29tcGxldGUgPSBjb25uZWN0aW9uLl9yYXdEYXRhYmFzZS50cmFuc2FjdGlvbnMuZXZlcnkoZnVuY3Rpb24gKHRyYW5zYWN0aW9uKSB7XG4gICAgICAgIHJldHVybiB0cmFuc2FjdGlvbi5fc3RhdGUgPT09IFwiZmluaXNoZWRcIjtcbiAgICB9KTtcbiAgICBpZiAodHJhbnNhY3Rpb25zQ29tcGxldGUpIHtcbiAgICAgICAgY29ubmVjdGlvbi5fY2xvc2VkID0gdHJ1ZTtcbiAgICAgICAgY29ubmVjdGlvbi5fcmF3RGF0YWJhc2UuY29ubmVjdGlvbnMgPSBjb25uZWN0aW9uLl9yYXdEYXRhYmFzZS5jb25uZWN0aW9ucy5maWx0ZXIoZnVuY3Rpb24gKG90aGVyQ29ubmVjdGlvbikge1xuICAgICAgICAgICAgcmV0dXJuIGNvbm5lY3Rpb24gIT09IG90aGVyQ29ubmVjdGlvbjtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBzZXRJbW1lZGlhdGUoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgY2xvc2VDb25uZWN0aW9uKGNvbm5lY3Rpb24pO1xuICAgICAgICB9KTtcbiAgICB9XG59O1xuLy8gaHR0cDovL3d3dy53My5vcmcvVFIvMjAxNS9SRUMtSW5kZXhlZERCLTIwMTUwMTA4LyNkYXRhYmFzZS1pbnRlcmZhY2VcbnZhciBGREJEYXRhYmFzZSA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoRkRCRGF0YWJhc2UsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gRkRCRGF0YWJhc2UocmF3RGF0YWJhc2UpIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcykgfHwgdGhpcztcbiAgICAgICAgX3RoaXMuX2Nsb3NlUGVuZGluZyA9IGZhbHNlO1xuICAgICAgICBfdGhpcy5fY2xvc2VkID0gZmFsc2U7XG4gICAgICAgIF90aGlzLl9ydW5uaW5nVmVyc2lvbmNoYW5nZVRyYW5zYWN0aW9uID0gZmFsc2U7XG4gICAgICAgIF90aGlzLl9yYXdEYXRhYmFzZSA9IHJhd0RhdGFiYXNlO1xuICAgICAgICBfdGhpcy5fcmF3RGF0YWJhc2UuY29ubmVjdGlvbnMucHVzaChfdGhpcyk7XG4gICAgICAgIF90aGlzLm5hbWUgPSByYXdEYXRhYmFzZS5uYW1lO1xuICAgICAgICBfdGhpcy52ZXJzaW9uID0gcmF3RGF0YWJhc2UudmVyc2lvbjtcbiAgICAgICAgX3RoaXMub2JqZWN0U3RvcmVOYW1lcyA9IGZha2VET01TdHJpbmdMaXN0XzEuZGVmYXVsdChBcnJheS5mcm9tKHJhd0RhdGFiYXNlLnJhd09iamVjdFN0b3Jlcy5rZXlzKCkpKS5zb3J0KCk7XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgLy8gaHR0cDovL3czYy5naXRodWIuaW8vSW5kZXhlZERCLyNkb20taWRiZGF0YWJhc2UtY3JlYXRlb2JqZWN0c3RvcmVcbiAgICBGREJEYXRhYmFzZS5wcm90b3R5cGUuY3JlYXRlT2JqZWN0U3RvcmUgPSBmdW5jdGlvbiAobmFtZSwgb3B0aW9ucykge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICBpZiAob3B0aW9ucyA9PT0gdm9pZCAwKSB7IG9wdGlvbnMgPSB7fTsgfVxuICAgICAgICBpZiAobmFtZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHRyYW5zYWN0aW9uID0gY29uZmlybUFjdGl2ZVZlcnNpb25jaGFuZ2VUcmFuc2FjdGlvbih0aGlzKTtcbiAgICAgICAgdmFyIGtleVBhdGggPSBvcHRpb25zICE9PSBudWxsICYmIG9wdGlvbnMua2V5UGF0aCAhPT0gdW5kZWZpbmVkXG4gICAgICAgICAgICA/IG9wdGlvbnMua2V5UGF0aFxuICAgICAgICAgICAgOiBudWxsO1xuICAgICAgICB2YXIgYXV0b0luY3JlbWVudCA9IG9wdGlvbnMgIT09IG51bGwgJiYgb3B0aW9ucy5hdXRvSW5jcmVtZW50ICE9PSB1bmRlZmluZWRcbiAgICAgICAgICAgID8gb3B0aW9ucy5hdXRvSW5jcmVtZW50XG4gICAgICAgICAgICA6IGZhbHNlO1xuICAgICAgICBpZiAoa2V5UGF0aCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgdmFsaWRhdGVLZXlQYXRoXzEuZGVmYXVsdChrZXlQYXRoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5fcmF3RGF0YWJhc2UucmF3T2JqZWN0U3RvcmVzLmhhcyhuYW1lKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IGVycm9yc18xLkNvbnN0cmFpbnRFcnJvcigpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChhdXRvSW5jcmVtZW50ICYmIChrZXlQYXRoID09PSBcIlwiIHx8IEFycmF5LmlzQXJyYXkoa2V5UGF0aCkpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgZXJyb3JzXzEuSW52YWxpZEFjY2Vzc0Vycm9yKCk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIG9iamVjdFN0b3JlTmFtZXMgPSB0aGlzLm9iamVjdFN0b3JlTmFtZXMuc2xpY2UoKTtcbiAgICAgICAgdHJhbnNhY3Rpb24uX3JvbGxiYWNrTG9nLnB1c2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIG9iamVjdFN0b3JlID0gX3RoaXMuX3Jhd0RhdGFiYXNlLnJhd09iamVjdFN0b3Jlcy5nZXQobmFtZSk7XG4gICAgICAgICAgICBpZiAob2JqZWN0U3RvcmUpIHtcbiAgICAgICAgICAgICAgICBvYmplY3RTdG9yZS5kZWxldGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF90aGlzLm9iamVjdFN0b3JlTmFtZXMgPSBmYWtlRE9NU3RyaW5nTGlzdF8xLmRlZmF1bHQob2JqZWN0U3RvcmVOYW1lcyk7XG4gICAgICAgICAgICB0cmFuc2FjdGlvbi5fc2NvcGUuZGVsZXRlKG5hbWUpO1xuICAgICAgICAgICAgX3RoaXMuX3Jhd0RhdGFiYXNlLnJhd09iamVjdFN0b3Jlcy5kZWxldGUobmFtZSk7XG4gICAgICAgIH0pO1xuICAgICAgICB2YXIgcmF3T2JqZWN0U3RvcmUgPSBuZXcgT2JqZWN0U3RvcmVfMS5kZWZhdWx0KHRoaXMuX3Jhd0RhdGFiYXNlLCBuYW1lLCBrZXlQYXRoLCBhdXRvSW5jcmVtZW50KTtcbiAgICAgICAgdGhpcy5vYmplY3RTdG9yZU5hbWVzLnB1c2gobmFtZSk7XG4gICAgICAgIHRoaXMub2JqZWN0U3RvcmVOYW1lcy5zb3J0KCk7XG4gICAgICAgIHRyYW5zYWN0aW9uLl9zY29wZS5hZGQobmFtZSk7XG4gICAgICAgIHRoaXMuX3Jhd0RhdGFiYXNlLnJhd09iamVjdFN0b3Jlcy5zZXQobmFtZSwgcmF3T2JqZWN0U3RvcmUpO1xuICAgICAgICB0cmFuc2FjdGlvbi5vYmplY3RTdG9yZU5hbWVzID0gZmFrZURPTVN0cmluZ0xpc3RfMS5kZWZhdWx0KHRoaXMub2JqZWN0U3RvcmVOYW1lcy5zbGljZSgpKTtcbiAgICAgICAgcmV0dXJuIHRyYW5zYWN0aW9uLm9iamVjdFN0b3JlKG5hbWUpO1xuICAgIH07XG4gICAgRkRCRGF0YWJhc2UucHJvdG90eXBlLmRlbGV0ZU9iamVjdFN0b3JlID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgaWYgKG5hbWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcigpO1xuICAgICAgICB9XG4gICAgICAgIHZhciB0cmFuc2FjdGlvbiA9IGNvbmZpcm1BY3RpdmVWZXJzaW9uY2hhbmdlVHJhbnNhY3Rpb24odGhpcyk7XG4gICAgICAgIHZhciBzdG9yZSA9IHRoaXMuX3Jhd0RhdGFiYXNlLnJhd09iamVjdFN0b3Jlcy5nZXQobmFtZSk7XG4gICAgICAgIGlmIChzdG9yZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgZXJyb3JzXzEuTm90Rm91bmRFcnJvcigpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMub2JqZWN0U3RvcmVOYW1lcyA9IGZha2VET01TdHJpbmdMaXN0XzEuZGVmYXVsdCh0aGlzLm9iamVjdFN0b3JlTmFtZXMuZmlsdGVyKGZ1bmN0aW9uIChvYmplY3RTdG9yZU5hbWUpIHtcbiAgICAgICAgICAgIHJldHVybiBvYmplY3RTdG9yZU5hbWUgIT09IG5hbWU7XG4gICAgICAgIH0pKTtcbiAgICAgICAgdHJhbnNhY3Rpb24ub2JqZWN0U3RvcmVOYW1lcyA9IGZha2VET01TdHJpbmdMaXN0XzEuZGVmYXVsdCh0aGlzLm9iamVjdFN0b3JlTmFtZXMuc2xpY2UoKSk7XG4gICAgICAgIHRyYW5zYWN0aW9uLl9yb2xsYmFja0xvZy5wdXNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHN0b3JlLmRlbGV0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIF90aGlzLl9yYXdEYXRhYmFzZS5yYXdPYmplY3RTdG9yZXMuc2V0KG5hbWUsIHN0b3JlKTtcbiAgICAgICAgICAgIF90aGlzLm9iamVjdFN0b3JlTmFtZXMucHVzaChuYW1lKTtcbiAgICAgICAgICAgIF90aGlzLm9iamVjdFN0b3JlTmFtZXMuc29ydCgpO1xuICAgICAgICB9KTtcbiAgICAgICAgc3RvcmUuZGVsZXRlZCA9IHRydWU7XG4gICAgICAgIHRoaXMuX3Jhd0RhdGFiYXNlLnJhd09iamVjdFN0b3Jlcy5kZWxldGUobmFtZSk7XG4gICAgICAgIHRyYW5zYWN0aW9uLl9vYmplY3RTdG9yZXNDYWNoZS5kZWxldGUobmFtZSk7XG4gICAgfTtcbiAgICBGREJEYXRhYmFzZS5wcm90b3R5cGUudHJhbnNhY3Rpb24gPSBmdW5jdGlvbiAoc3RvcmVOYW1lcywgbW9kZSkge1xuICAgICAgICB2YXIgZV8xLCBfYTtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgbW9kZSA9IG1vZGUgIT09IHVuZGVmaW5lZCA/IG1vZGUgOiBcInJlYWRvbmx5XCI7XG4gICAgICAgIGlmIChtb2RlICE9PSBcInJlYWRvbmx5XCIgJiZcbiAgICAgICAgICAgIG1vZGUgIT09IFwicmVhZHdyaXRlXCIgJiZcbiAgICAgICAgICAgIG1vZGUgIT09IFwidmVyc2lvbmNoYW5nZVwiKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiSW52YWxpZCBtb2RlOiBcIiArIG1vZGUpO1xuICAgICAgICB9XG4gICAgICAgIHZhciBoYXNBY3RpdmVWZXJzaW9uY2hhbmdlID0gdGhpcy5fcmF3RGF0YWJhc2UudHJhbnNhY3Rpb25zLnNvbWUoZnVuY3Rpb24gKHRyYW5zYWN0aW9uKSB7XG4gICAgICAgICAgICByZXR1cm4gKHRyYW5zYWN0aW9uLl9zdGF0ZSA9PT0gXCJhY3RpdmVcIiAmJlxuICAgICAgICAgICAgICAgIHRyYW5zYWN0aW9uLm1vZGUgPT09IFwidmVyc2lvbmNoYW5nZVwiICYmXG4gICAgICAgICAgICAgICAgdHJhbnNhY3Rpb24uZGIgPT09IF90aGlzKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGlmIChoYXNBY3RpdmVWZXJzaW9uY2hhbmdlKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgZXJyb3JzXzEuSW52YWxpZFN0YXRlRXJyb3IoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5fY2xvc2VQZW5kaW5nKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgZXJyb3JzXzEuSW52YWxpZFN0YXRlRXJyb3IoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIUFycmF5LmlzQXJyYXkoc3RvcmVOYW1lcykpIHtcbiAgICAgICAgICAgIHN0b3JlTmFtZXMgPSBbc3RvcmVOYW1lc107XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHN0b3JlTmFtZXMubGVuZ3RoID09PSAwICYmIG1vZGUgIT09IFwidmVyc2lvbmNoYW5nZVwiKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgZXJyb3JzXzEuSW52YWxpZEFjY2Vzc0Vycm9yKCk7XG4gICAgICAgIH1cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGZvciAodmFyIHN0b3JlTmFtZXNfMSA9IF9fdmFsdWVzKHN0b3JlTmFtZXMpLCBzdG9yZU5hbWVzXzFfMSA9IHN0b3JlTmFtZXNfMS5uZXh0KCk7ICFzdG9yZU5hbWVzXzFfMS5kb25lOyBzdG9yZU5hbWVzXzFfMSA9IHN0b3JlTmFtZXNfMS5uZXh0KCkpIHtcbiAgICAgICAgICAgICAgICB2YXIgc3RvcmVOYW1lID0gc3RvcmVOYW1lc18xXzEudmFsdWU7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMub2JqZWN0U3RvcmVOYW1lcy5pbmRleE9mKHN0b3JlTmFtZSkgPCAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBlcnJvcnNfMS5Ob3RGb3VuZEVycm9yKFwiTm8gb2JqZWN0U3RvcmUgbmFtZWQgXCIgKyBzdG9yZU5hbWUgKyBcIiBpbiB0aGlzIGRhdGFiYXNlXCIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZV8xXzEpIHsgZV8xID0geyBlcnJvcjogZV8xXzEgfTsgfVxuICAgICAgICBmaW5hbGx5IHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgaWYgKHN0b3JlTmFtZXNfMV8xICYmICFzdG9yZU5hbWVzXzFfMS5kb25lICYmIChfYSA9IHN0b3JlTmFtZXNfMS5yZXR1cm4pKSBfYS5jYWxsKHN0b3JlTmFtZXNfMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmaW5hbGx5IHsgaWYgKGVfMSkgdGhyb3cgZV8xLmVycm9yOyB9XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHR4ID0gbmV3IEZEQlRyYW5zYWN0aW9uXzEuZGVmYXVsdChzdG9yZU5hbWVzLCBtb2RlLCB0aGlzKTtcbiAgICAgICAgdGhpcy5fcmF3RGF0YWJhc2UudHJhbnNhY3Rpb25zLnB1c2godHgpO1xuICAgICAgICB0aGlzLl9yYXdEYXRhYmFzZS5wcm9jZXNzVHJhbnNhY3Rpb25zKCk7IC8vIFNlZSBpZiBjYW4gc3RhcnQgcmlnaHQgYXdheSAoYXN5bmMpXG4gICAgICAgIHJldHVybiB0eDtcbiAgICB9O1xuICAgIEZEQkRhdGFiYXNlLnByb3RvdHlwZS5jbG9zZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY2xvc2VDb25uZWN0aW9uKHRoaXMpO1xuICAgIH07XG4gICAgRkRCRGF0YWJhc2UucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gXCJbb2JqZWN0IElEQkRhdGFiYXNlXVwiO1xuICAgIH07XG4gICAgcmV0dXJuIEZEQkRhdGFiYXNlO1xufShGYWtlRXZlbnRUYXJnZXRfMS5kZWZhdWx0KSk7XG5leHBvcnRzLmRlZmF1bHQgPSBGREJEYXRhYmFzZTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2Zha2UtaW5kZXhlZGRiL2J1aWxkL0ZEQkRhdGFiYXNlLmpzXG4vLyBtb2R1bGUgaWQgPSAzNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcbiAgICAgICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcbiAgICAgICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xuICAgICAgICByZXR1cm4gZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICB9O1xuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xuICAgIH07XG59KSgpO1xudmFyIF9fdmFsdWVzID0gKHRoaXMgJiYgdGhpcy5fX3ZhbHVlcykgfHwgZnVuY3Rpb24obykge1xuICAgIHZhciBzID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIFN5bWJvbC5pdGVyYXRvciwgbSA9IHMgJiYgb1tzXSwgaSA9IDA7XG4gICAgaWYgKG0pIHJldHVybiBtLmNhbGwobyk7XG4gICAgaWYgKG8gJiYgdHlwZW9mIG8ubGVuZ3RoID09PSBcIm51bWJlclwiKSByZXR1cm4ge1xuICAgICAgICBuZXh0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAobyAmJiBpID49IG8ubGVuZ3RoKSBvID0gdm9pZCAwO1xuICAgICAgICAgICAgcmV0dXJuIHsgdmFsdWU6IG8gJiYgb1tpKytdLCBkb25lOiAhbyB9O1xuICAgICAgICB9XG4gICAgfTtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKHMgPyBcIk9iamVjdCBpcyBub3QgaXRlcmFibGUuXCIgOiBcIlN5bWJvbC5pdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIEZEQk9iamVjdFN0b3JlXzEgPSByZXF1aXJlKFwiLi9GREJPYmplY3RTdG9yZVwiKTtcbnZhciBGREJSZXF1ZXN0XzEgPSByZXF1aXJlKFwiLi9GREJSZXF1ZXN0XCIpO1xudmFyIGVycm9yc18xID0gcmVxdWlyZShcIi4vbGliL2Vycm9yc1wiKTtcbnZhciBmYWtlRE9NU3RyaW5nTGlzdF8xID0gcmVxdWlyZShcIi4vbGliL2Zha2VET01TdHJpbmdMaXN0XCIpO1xudmFyIEZha2VFdmVudF8xID0gcmVxdWlyZShcIi4vbGliL0Zha2VFdmVudFwiKTtcbnZhciBGYWtlRXZlbnRUYXJnZXRfMSA9IHJlcXVpcmUoXCIuL2xpYi9GYWtlRXZlbnRUYXJnZXRcIik7XG4vLyBodHRwOi8vd3d3LnczLm9yZy9UUi8yMDE1L1JFQy1JbmRleGVkREItMjAxNTAxMDgvI3RyYW5zYWN0aW9uXG52YXIgRkRCVHJhbnNhY3Rpb24gPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKEZEQlRyYW5zYWN0aW9uLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIEZEQlRyYW5zYWN0aW9uKHN0b3JlTmFtZXMsIG1vZGUsIGRiKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMpIHx8IHRoaXM7XG4gICAgICAgIF90aGlzLl9zdGF0ZSA9IFwiYWN0aXZlXCI7XG4gICAgICAgIF90aGlzLl9zdGFydGVkID0gZmFsc2U7XG4gICAgICAgIF90aGlzLl9yb2xsYmFja0xvZyA9IFtdO1xuICAgICAgICBfdGhpcy5fb2JqZWN0U3RvcmVzQ2FjaGUgPSBuZXcgTWFwKCk7XG4gICAgICAgIF90aGlzLmVycm9yID0gbnVsbDtcbiAgICAgICAgX3RoaXMub25hYm9ydCA9IG51bGw7XG4gICAgICAgIF90aGlzLm9uY29tcGxldGUgPSBudWxsO1xuICAgICAgICBfdGhpcy5vbmVycm9yID0gbnVsbDtcbiAgICAgICAgX3RoaXMuX3JlcXVlc3RzID0gW107XG4gICAgICAgIF90aGlzLl9zY29wZSA9IG5ldyBTZXQoc3RvcmVOYW1lcyk7XG4gICAgICAgIF90aGlzLm1vZGUgPSBtb2RlO1xuICAgICAgICBfdGhpcy5kYiA9IGRiO1xuICAgICAgICBfdGhpcy5vYmplY3RTdG9yZU5hbWVzID0gZmFrZURPTVN0cmluZ0xpc3RfMS5kZWZhdWx0KEFycmF5LmZyb20oX3RoaXMuX3Njb3BlKS5zb3J0KCkpO1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIC8vIGh0dHA6Ly93d3cudzMub3JnL1RSLzIwMTUvUkVDLUluZGV4ZWREQi0yMDE1MDEwOC8jZGZuLXN0ZXBzLWZvci1hYm9ydGluZy1hLXRyYW5zYWN0aW9uXG4gICAgRkRCVHJhbnNhY3Rpb24ucHJvdG90eXBlLl9hYm9ydCA9IGZ1bmN0aW9uIChlcnJOYW1lKSB7XG4gICAgICAgIHZhciBlXzEsIF9hLCBlXzIsIF9iO1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgZm9yICh2YXIgX2MgPSBfX3ZhbHVlcyh0aGlzLl9yb2xsYmFja0xvZy5yZXZlcnNlKCkpLCBfZCA9IF9jLm5leHQoKTsgIV9kLmRvbmU7IF9kID0gX2MubmV4dCgpKSB7XG4gICAgICAgICAgICAgICAgdmFyIGYgPSBfZC52YWx1ZTtcbiAgICAgICAgICAgICAgICBmKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVfMV8xKSB7IGVfMSA9IHsgZXJyb3I6IGVfMV8xIH07IH1cbiAgICAgICAgZmluYWxseSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGlmIChfZCAmJiAhX2QuZG9uZSAmJiAoX2EgPSBfYy5yZXR1cm4pKSBfYS5jYWxsKF9jKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZpbmFsbHkgeyBpZiAoZV8xKSB0aHJvdyBlXzEuZXJyb3I7IH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoZXJyTmFtZSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgdmFyIGUgPSBuZXcgRXJyb3IoKTtcbiAgICAgICAgICAgIGUubmFtZSA9IGVyck5hbWU7XG4gICAgICAgICAgICB0aGlzLmVycm9yID0gZTtcbiAgICAgICAgfVxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gU2hvdWxkIHRoaXMgZGlyZWN0bHkgcmVtb3ZlIGZyb20gX3JlcXVlc3RzP1xuICAgICAgICAgICAgZm9yICh2YXIgX2UgPSBfX3ZhbHVlcyh0aGlzLl9yZXF1ZXN0cyksIF9mID0gX2UubmV4dCgpOyAhX2YuZG9uZTsgX2YgPSBfZS5uZXh0KCkpIHtcbiAgICAgICAgICAgICAgICB2YXIgcmVxdWVzdCA9IF9mLnZhbHVlLnJlcXVlc3Q7XG4gICAgICAgICAgICAgICAgaWYgKHJlcXVlc3QucmVhZHlTdGF0ZSAhPT0gXCJkb25lXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVxdWVzdC5yZWFkeVN0YXRlID0gXCJkb25lXCI7IC8vIFRoaXMgd2lsbCBjYW5jZWwgZXhlY3V0aW9uIG9mIHRoaXMgcmVxdWVzdCdzIG9wZXJhdGlvblxuICAgICAgICAgICAgICAgICAgICBpZiAocmVxdWVzdC5zb3VyY2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcXVlc3QucmVzdWx0ID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVxdWVzdC5lcnJvciA9IG5ldyBlcnJvcnNfMS5BYm9ydEVycm9yKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZXZlbnRfMSA9IG5ldyBGYWtlRXZlbnRfMS5kZWZhdWx0KFwiZXJyb3JcIiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ1YmJsZXM6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FuY2VsYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnRfMS5ldmVudFBhdGggPSBbdGhpcy5kYiwgdGhpc107XG4gICAgICAgICAgICAgICAgICAgICAgICByZXF1ZXN0LmRpc3BhdGNoRXZlbnQoZXZlbnRfMSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVfMl8xKSB7IGVfMiA9IHsgZXJyb3I6IGVfMl8xIH07IH1cbiAgICAgICAgZmluYWxseSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGlmIChfZiAmJiAhX2YuZG9uZSAmJiAoX2IgPSBfZS5yZXR1cm4pKSBfYi5jYWxsKF9lKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZpbmFsbHkgeyBpZiAoZV8yKSB0aHJvdyBlXzIuZXJyb3I7IH1cbiAgICAgICAgfVxuICAgICAgICBzZXRJbW1lZGlhdGUoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIGV2ZW50ID0gbmV3IEZha2VFdmVudF8xLmRlZmF1bHQoXCJhYm9ydFwiLCB7XG4gICAgICAgICAgICAgICAgYnViYmxlczogdHJ1ZSxcbiAgICAgICAgICAgICAgICBjYW5jZWxhYmxlOiBmYWxzZSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgZXZlbnQuZXZlbnRQYXRoID0gW190aGlzLmRiXTtcbiAgICAgICAgICAgIF90aGlzLmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5fc3RhdGUgPSBcImZpbmlzaGVkXCI7XG4gICAgfTtcbiAgICBGREJUcmFuc2FjdGlvbi5wcm90b3R5cGUuYWJvcnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0aGlzLl9zdGF0ZSA9PT0gXCJjb21taXR0aW5nXCIgfHwgdGhpcy5fc3RhdGUgPT09IFwiZmluaXNoZWRcIikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IGVycm9yc18xLkludmFsaWRTdGF0ZUVycm9yKCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fc3RhdGUgPSBcImFjdGl2ZVwiO1xuICAgICAgICB0aGlzLl9hYm9ydChudWxsKTtcbiAgICB9O1xuICAgIC8vIGh0dHA6Ly93M2MuZ2l0aHViLmlvL0luZGV4ZWREQi8jZG9tLWlkYnRyYW5zYWN0aW9uLW9iamVjdHN0b3JlXG4gICAgRkRCVHJhbnNhY3Rpb24ucHJvdG90eXBlLm9iamVjdFN0b3JlID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICAgICAgaWYgKHRoaXMuX3N0YXRlICE9PSBcImFjdGl2ZVwiKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgZXJyb3JzXzEuSW52YWxpZFN0YXRlRXJyb3IoKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgb2JqZWN0U3RvcmUgPSB0aGlzLl9vYmplY3RTdG9yZXNDYWNoZS5nZXQobmFtZSk7XG4gICAgICAgIGlmIChvYmplY3RTdG9yZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm4gb2JqZWN0U3RvcmU7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHJhd09iamVjdFN0b3JlID0gdGhpcy5kYi5fcmF3RGF0YWJhc2UucmF3T2JqZWN0U3RvcmVzLmdldChuYW1lKTtcbiAgICAgICAgaWYgKCF0aGlzLl9zY29wZS5oYXMobmFtZSkgfHwgcmF3T2JqZWN0U3RvcmUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IGVycm9yc18xLk5vdEZvdW5kRXJyb3IoKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgb2JqZWN0U3RvcmUyID0gbmV3IEZEQk9iamVjdFN0b3JlXzEuZGVmYXVsdCh0aGlzLCByYXdPYmplY3RTdG9yZSk7XG4gICAgICAgIHRoaXMuX29iamVjdFN0b3Jlc0NhY2hlLnNldChuYW1lLCBvYmplY3RTdG9yZTIpO1xuICAgICAgICByZXR1cm4gb2JqZWN0U3RvcmUyO1xuICAgIH07XG4gICAgLy8gaHR0cDovL3d3dy53My5vcmcvVFIvMjAxNS9SRUMtSW5kZXhlZERCLTIwMTUwMTA4LyNkZm4tc3RlcHMtZm9yLWFzeW5jaHJvbm91c2x5LWV4ZWN1dGluZy1hLXJlcXVlc3RcbiAgICBGREJUcmFuc2FjdGlvbi5wcm90b3R5cGUuX2V4ZWNSZXF1ZXN0QXN5bmMgPSBmdW5jdGlvbiAob2JqKSB7XG4gICAgICAgIHZhciBzb3VyY2UgPSBvYmouc291cmNlO1xuICAgICAgICB2YXIgb3BlcmF0aW9uID0gb2JqLm9wZXJhdGlvbjtcbiAgICAgICAgdmFyIHJlcXVlc3QgPSBvYmouaGFzT3duUHJvcGVydHkoXCJyZXF1ZXN0XCIpID8gb2JqLnJlcXVlc3QgOiBudWxsO1xuICAgICAgICBpZiAodGhpcy5fc3RhdGUgIT09IFwiYWN0aXZlXCIpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBlcnJvcnNfMS5UcmFuc2FjdGlvbkluYWN0aXZlRXJyb3IoKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBSZXF1ZXN0IHNob3VsZCBvbmx5IGJlIHBhc3NlZCBmb3IgY3Vyc29yc1xuICAgICAgICBpZiAoIXJlcXVlc3QpIHtcbiAgICAgICAgICAgIGlmICghc291cmNlKSB7XG4gICAgICAgICAgICAgICAgLy8gU3BlY2lhbCByZXF1ZXN0cyBsaWtlIGluZGV4ZXMgdGhhdCBqdXN0IG5lZWQgdG8gcnVuIHNvbWUgY29kZVxuICAgICAgICAgICAgICAgIHJlcXVlc3QgPSBuZXcgRkRCUmVxdWVzdF8xLmRlZmF1bHQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHJlcXVlc3QgPSBuZXcgRkRCUmVxdWVzdF8xLmRlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICByZXF1ZXN0LnNvdXJjZSA9IHNvdXJjZTtcbiAgICAgICAgICAgICAgICByZXF1ZXN0LnRyYW5zYWN0aW9uID0gc291cmNlLnRyYW5zYWN0aW9uO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3JlcXVlc3RzLnB1c2goe1xuICAgICAgICAgICAgb3BlcmF0aW9uOiBvcGVyYXRpb24sXG4gICAgICAgICAgICByZXF1ZXN0OiByZXF1ZXN0LFxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHJlcXVlc3Q7XG4gICAgfTtcbiAgICBGREJUcmFuc2FjdGlvbi5wcm90b3R5cGUuX3N0YXJ0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLl9zdGFydGVkID0gdHJ1ZTtcbiAgICAgICAgLy8gUmVtb3ZlIGZyb20gcmVxdWVzdCBxdWV1ZSAtIGN1cnNvciBvbmVzIHdpbGwgYmUgYWRkZWQgYmFjayBpZiBuZWNlc3NhcnkgYnkgY3Vyc29yLmNvbnRpbnVlIGFuZCBzdWNoXG4gICAgICAgIHZhciBvcGVyYXRpb247XG4gICAgICAgIHZhciByZXF1ZXN0O1xuICAgICAgICB3aGlsZSAodGhpcy5fcmVxdWVzdHMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgdmFyIHIgPSB0aGlzLl9yZXF1ZXN0cy5zaGlmdCgpO1xuICAgICAgICAgICAgLy8gVGhpcyBzaG91bGQgb25seSBiZSBmYWxzZSBpZiB0cmFuc2FjdGlvbiB3YXMgYWJvcnRlZFxuICAgICAgICAgICAgaWYgKHIgJiYgci5yZXF1ZXN0LnJlYWR5U3RhdGUgIT09IFwiZG9uZVwiKSB7XG4gICAgICAgICAgICAgICAgcmVxdWVzdCA9IHIucmVxdWVzdDtcbiAgICAgICAgICAgICAgICBvcGVyYXRpb24gPSByLm9wZXJhdGlvbjtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAocmVxdWVzdCAmJiBvcGVyYXRpb24pIHtcbiAgICAgICAgICAgIGlmICghcmVxdWVzdC5zb3VyY2UpIHtcbiAgICAgICAgICAgICAgICAvLyBTcGVjaWFsIHJlcXVlc3RzIGxpa2UgaW5kZXhlcyB0aGF0IGp1c3QgbmVlZCB0byBydW4gc29tZSBjb2RlLCB3aXRoIGVycm9yIGhhbmRsaW5nIGFscmVhZHkgYnVpbHQgaW50b1xuICAgICAgICAgICAgICAgIC8vIG9wZXJhdGlvblxuICAgICAgICAgICAgICAgIG9wZXJhdGlvbigpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdmFyIGRlZmF1bHRBY3Rpb24gPSB2b2lkIDA7XG4gICAgICAgICAgICAgICAgdmFyIGV2ZW50XzI7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHJlc3VsdCA9IG9wZXJhdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICByZXF1ZXN0LnJlYWR5U3RhdGUgPSBcImRvbmVcIjtcbiAgICAgICAgICAgICAgICAgICAgcmVxdWVzdC5yZXN1bHQgPSByZXN1bHQ7XG4gICAgICAgICAgICAgICAgICAgIHJlcXVlc3QuZXJyb3IgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgICAgIC8vIGh0dHA6Ly93d3cudzMub3JnL1RSLzIwMTUvUkVDLUluZGV4ZWREQi0yMDE1MDEwOC8jZGZuLWZpcmUtYS1zdWNjZXNzLWV2ZW50XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9zdGF0ZSA9PT0gXCJpbmFjdGl2ZVwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9zdGF0ZSA9IFwiYWN0aXZlXCI7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZXZlbnRfMiA9IG5ldyBGYWtlRXZlbnRfMS5kZWZhdWx0KFwic3VjY2Vzc1wiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBidWJibGVzOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhbmNlbGFibGU6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgICAgICAgICByZXF1ZXN0LnJlYWR5U3RhdGUgPSBcImRvbmVcIjtcbiAgICAgICAgICAgICAgICAgICAgcmVxdWVzdC5yZXN1bHQgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgICAgIHJlcXVlc3QuZXJyb3IgPSBlcnI7XG4gICAgICAgICAgICAgICAgICAgIC8vIGh0dHA6Ly93d3cudzMub3JnL1RSLzIwMTUvUkVDLUluZGV4ZWREQi0yMDE1MDEwOC8jZGZuLWZpcmUtYW4tZXJyb3ItZXZlbnRcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX3N0YXRlID09PSBcImluYWN0aXZlXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3N0YXRlID0gXCJhY3RpdmVcIjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBldmVudF8yID0gbmV3IEZha2VFdmVudF8xLmRlZmF1bHQoXCJlcnJvclwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBidWJibGVzOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgY2FuY2VsYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHRBY3Rpb24gPSB0aGlzLl9hYm9ydC5iaW5kKHRoaXMsIGVyci5uYW1lKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgZXZlbnRfMi5ldmVudFBhdGggPSBbdGhpcy5kYiwgdGhpc107XG4gICAgICAgICAgICAgICAgICAgIHJlcXVlc3QuZGlzcGF0Y2hFdmVudChldmVudF8yKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fc3RhdGUgIT09IFwiY29tbWl0dGluZ1wiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9hYm9ydChcIkFib3J0RXJyb3JcIik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyBEZWZhdWx0IGFjdGlvbiBvZiBldmVudFxuICAgICAgICAgICAgICAgIGlmICghZXZlbnRfMi5jYW5jZWxlZCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZGVmYXVsdEFjdGlvbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdEFjdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gT24gdG8gdGhlIG5leHQgb25lXG4gICAgICAgICAgICBpZiAodGhpcy5fcmVxdWVzdHMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX3N0YXJ0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBHaXZlIGl0IGFub3RoZXIgY2hhbmNlIGZvciBuZXcgaGFuZGxlcnMgdG8gYmUgc2V0IGJlZm9yZSBmaW5pc2hpbmdcbiAgICAgICAgICAgICAgICBzZXRJbW1lZGlhdGUodGhpcy5fc3RhcnQuYmluZCh0aGlzKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgLy8gQ2hlY2sgaWYgdHJhbnNhY3Rpb24gY29tcGxldGUgZXZlbnQgbmVlZHMgdG8gYmUgZmlyZWRcbiAgICAgICAgaWYgKHRoaXMuX3N0YXRlICE9PSBcImZpbmlzaGVkXCIpIHtcbiAgICAgICAgICAgIC8vIEVpdGhlciBhYm9ydGVkIG9yIGNvbW1pdHRlZCBhbHJlYWR5XG4gICAgICAgICAgICB0aGlzLl9zdGF0ZSA9IFwiZmluaXNoZWRcIjtcbiAgICAgICAgICAgIGlmICghdGhpcy5lcnJvcikge1xuICAgICAgICAgICAgICAgIHZhciBldmVudF8zID0gbmV3IEZha2VFdmVudF8xLmRlZmF1bHQoXCJjb21wbGV0ZVwiKTtcbiAgICAgICAgICAgICAgICB0aGlzLmRpc3BhdGNoRXZlbnQoZXZlbnRfMyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuICAgIEZEQlRyYW5zYWN0aW9uLnByb3RvdHlwZS5jb21taXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0aGlzLl9zdGF0ZSAhPT0gXCJhY3RpdmVcIikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IGVycm9yc18xLkludmFsaWRTdGF0ZUVycm9yKCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fc3RhdGUgPSBcImNvbW1pdHRpbmdcIjtcbiAgICB9O1xuICAgIEZEQlRyYW5zYWN0aW9uLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIFwiW29iamVjdCBJREJSZXF1ZXN0XVwiO1xuICAgIH07XG4gICAgcmV0dXJuIEZEQlRyYW5zYWN0aW9uO1xufShGYWtlRXZlbnRUYXJnZXRfMS5kZWZhdWx0KSk7XG5leHBvcnRzLmRlZmF1bHQgPSBGREJUcmFuc2FjdGlvbjtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2Zha2UtaW5kZXhlZGRiL2J1aWxkL0ZEQlRyYW5zYWN0aW9uLmpzXG4vLyBtb2R1bGUgaWQgPSAzN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBGREJDdXJzb3JfMSA9IHJlcXVpcmUoXCIuL0ZEQkN1cnNvclwiKTtcbnZhciBGREJDdXJzb3JXaXRoVmFsdWVfMSA9IHJlcXVpcmUoXCIuL0ZEQkN1cnNvcldpdGhWYWx1ZVwiKTtcbnZhciBGREJLZXlSYW5nZV8xID0gcmVxdWlyZShcIi4vRkRCS2V5UmFuZ2VcIik7XG52YXIgRkRCUmVxdWVzdF8xID0gcmVxdWlyZShcIi4vRkRCUmVxdWVzdFwiKTtcbnZhciBlbmZvcmNlUmFuZ2VfMSA9IHJlcXVpcmUoXCIuL2xpYi9lbmZvcmNlUmFuZ2VcIik7XG52YXIgZXJyb3JzXzEgPSByZXF1aXJlKFwiLi9saWIvZXJyb3JzXCIpO1xudmFyIGZha2VET01TdHJpbmdMaXN0XzEgPSByZXF1aXJlKFwiLi9saWIvZmFrZURPTVN0cmluZ0xpc3RcIik7XG52YXIgdmFsdWVUb0tleV8xID0gcmVxdWlyZShcIi4vbGliL3ZhbHVlVG9LZXlcIik7XG52YXIgdmFsdWVUb0tleVJhbmdlXzEgPSByZXF1aXJlKFwiLi9saWIvdmFsdWVUb0tleVJhbmdlXCIpO1xudmFyIGNvbmZpcm1BY3RpdmVUcmFuc2FjdGlvbiA9IGZ1bmN0aW9uIChpbmRleCkge1xuICAgIGlmIChpbmRleC5fcmF3SW5kZXguZGVsZXRlZCB8fCBpbmRleC5vYmplY3RTdG9yZS5fcmF3T2JqZWN0U3RvcmUuZGVsZXRlZCkge1xuICAgICAgICB0aHJvdyBuZXcgZXJyb3JzXzEuSW52YWxpZFN0YXRlRXJyb3IoKTtcbiAgICB9XG4gICAgaWYgKGluZGV4Lm9iamVjdFN0b3JlLnRyYW5zYWN0aW9uLl9zdGF0ZSAhPT0gXCJhY3RpdmVcIikge1xuICAgICAgICB0aHJvdyBuZXcgZXJyb3JzXzEuVHJhbnNhY3Rpb25JbmFjdGl2ZUVycm9yKCk7XG4gICAgfVxufTtcbi8vIGh0dHA6Ly93d3cudzMub3JnL1RSLzIwMTUvUkVDLUluZGV4ZWREQi0yMDE1MDEwOC8jaWRsLWRlZi1JREJJbmRleFxudmFyIEZEQkluZGV4ID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIEZEQkluZGV4KG9iamVjdFN0b3JlLCByYXdJbmRleCkge1xuICAgICAgICB0aGlzLl9yYXdJbmRleCA9IHJhd0luZGV4O1xuICAgICAgICB0aGlzLl9uYW1lID0gcmF3SW5kZXgubmFtZTtcbiAgICAgICAgdGhpcy5vYmplY3RTdG9yZSA9IG9iamVjdFN0b3JlO1xuICAgICAgICB0aGlzLmtleVBhdGggPSByYXdJbmRleC5rZXlQYXRoO1xuICAgICAgICB0aGlzLm11bHRpRW50cnkgPSByYXdJbmRleC5tdWx0aUVudHJ5O1xuICAgICAgICB0aGlzLnVuaXF1ZSA9IHJhd0luZGV4LnVuaXF1ZTtcbiAgICB9XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEZEQkluZGV4LnByb3RvdHlwZSwgXCJuYW1lXCIsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fbmFtZTtcbiAgICAgICAgfSxcbiAgICAgICAgLy8gaHR0cHM6Ly93M2MuZ2l0aHViLmlvL0luZGV4ZWREQi8jZG9tLWlkYmluZGV4LW5hbWVcbiAgICAgICAgc2V0OiBmdW5jdGlvbiAobmFtZSkge1xuICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgICAgIHZhciB0cmFuc2FjdGlvbiA9IHRoaXMub2JqZWN0U3RvcmUudHJhbnNhY3Rpb247XG4gICAgICAgICAgICBpZiAoIXRyYW5zYWN0aW9uLmRiLl9ydW5uaW5nVmVyc2lvbmNoYW5nZVRyYW5zYWN0aW9uKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IGVycm9yc18xLkludmFsaWRTdGF0ZUVycm9yKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodHJhbnNhY3Rpb24uX3N0YXRlICE9PSBcImFjdGl2ZVwiKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IGVycm9yc18xLlRyYW5zYWN0aW9uSW5hY3RpdmVFcnJvcigpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMuX3Jhd0luZGV4LmRlbGV0ZWQgfHxcbiAgICAgICAgICAgICAgICB0aGlzLm9iamVjdFN0b3JlLl9yYXdPYmplY3RTdG9yZS5kZWxldGVkKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IGVycm9yc18xLkludmFsaWRTdGF0ZUVycm9yKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBuYW1lID0gU3RyaW5nKG5hbWUpO1xuICAgICAgICAgICAgaWYgKG5hbWUgPT09IHRoaXMuX25hbWUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5vYmplY3RTdG9yZS5pbmRleE5hbWVzLmluZGV4T2YobmFtZSkgPj0gMCkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBlcnJvcnNfMS5Db25zdHJhaW50RXJyb3IoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBvbGROYW1lID0gdGhpcy5fbmFtZTtcbiAgICAgICAgICAgIHZhciBvbGRJbmRleE5hbWVzID0gdGhpcy5vYmplY3RTdG9yZS5pbmRleE5hbWVzLnNsaWNlKCk7XG4gICAgICAgICAgICB0aGlzLl9uYW1lID0gbmFtZTtcbiAgICAgICAgICAgIHRoaXMuX3Jhd0luZGV4Lm5hbWUgPSBuYW1lO1xuICAgICAgICAgICAgdGhpcy5vYmplY3RTdG9yZS5faW5kZXhlc0NhY2hlLmRlbGV0ZShvbGROYW1lKTtcbiAgICAgICAgICAgIHRoaXMub2JqZWN0U3RvcmUuX2luZGV4ZXNDYWNoZS5zZXQobmFtZSwgdGhpcyk7XG4gICAgICAgICAgICB0aGlzLm9iamVjdFN0b3JlLl9yYXdPYmplY3RTdG9yZS5yYXdJbmRleGVzLmRlbGV0ZShvbGROYW1lKTtcbiAgICAgICAgICAgIHRoaXMub2JqZWN0U3RvcmUuX3Jhd09iamVjdFN0b3JlLnJhd0luZGV4ZXMuc2V0KG5hbWUsIHRoaXMuX3Jhd0luZGV4KTtcbiAgICAgICAgICAgIHRoaXMub2JqZWN0U3RvcmUuaW5kZXhOYW1lcyA9IGZha2VET01TdHJpbmdMaXN0XzEuZGVmYXVsdChBcnJheS5mcm9tKHRoaXMub2JqZWN0U3RvcmUuX3Jhd09iamVjdFN0b3JlLnJhd0luZGV4ZXMua2V5cygpKS5maWx0ZXIoZnVuY3Rpb24gKGluZGV4TmFtZSkge1xuICAgICAgICAgICAgICAgIHZhciBpbmRleCA9IF90aGlzLm9iamVjdFN0b3JlLl9yYXdPYmplY3RTdG9yZS5yYXdJbmRleGVzLmdldChpbmRleE5hbWUpO1xuICAgICAgICAgICAgICAgIHJldHVybiBpbmRleCAmJiAhaW5kZXguZGVsZXRlZDtcbiAgICAgICAgICAgIH0pKS5zb3J0KCk7XG4gICAgICAgICAgICB0cmFuc2FjdGlvbi5fcm9sbGJhY2tMb2cucHVzaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMuX25hbWUgPSBvbGROYW1lO1xuICAgICAgICAgICAgICAgIF90aGlzLl9yYXdJbmRleC5uYW1lID0gb2xkTmFtZTtcbiAgICAgICAgICAgICAgICBfdGhpcy5vYmplY3RTdG9yZS5faW5kZXhlc0NhY2hlLmRlbGV0ZShuYW1lKTtcbiAgICAgICAgICAgICAgICBfdGhpcy5vYmplY3RTdG9yZS5faW5kZXhlc0NhY2hlLnNldChvbGROYW1lLCBfdGhpcyk7XG4gICAgICAgICAgICAgICAgX3RoaXMub2JqZWN0U3RvcmUuX3Jhd09iamVjdFN0b3JlLnJhd0luZGV4ZXMuZGVsZXRlKG5hbWUpO1xuICAgICAgICAgICAgICAgIF90aGlzLm9iamVjdFN0b3JlLl9yYXdPYmplY3RTdG9yZS5yYXdJbmRleGVzLnNldChvbGROYW1lLCBfdGhpcy5fcmF3SW5kZXgpO1xuICAgICAgICAgICAgICAgIF90aGlzLm9iamVjdFN0b3JlLmluZGV4TmFtZXMgPSBmYWtlRE9NU3RyaW5nTGlzdF8xLmRlZmF1bHQob2xkSW5kZXhOYW1lcyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lIG1heC1saW5lLWxlbmd0aFxuICAgIC8vIGh0dHA6Ly93d3cudzMub3JnL1RSLzIwMTUvUkVDLUluZGV4ZWREQi0yMDE1MDEwOC8jd2lkbC1JREJJbmRleC1vcGVuQ3Vyc29yLUlEQlJlcXVlc3QtYW55LXJhbmdlLUlEQkN1cnNvckRpcmVjdGlvbi1kaXJlY3Rpb25cbiAgICBGREJJbmRleC5wcm90b3R5cGUub3BlbkN1cnNvciA9IGZ1bmN0aW9uIChyYW5nZSwgZGlyZWN0aW9uKSB7XG4gICAgICAgIGNvbmZpcm1BY3RpdmVUcmFuc2FjdGlvbih0aGlzKTtcbiAgICAgICAgaWYgKHJhbmdlID09PSBudWxsKSB7XG4gICAgICAgICAgICByYW5nZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgICAgICBpZiAocmFuZ2UgIT09IHVuZGVmaW5lZCAmJiAhKHJhbmdlIGluc3RhbmNlb2YgRkRCS2V5UmFuZ2VfMS5kZWZhdWx0KSkge1xuICAgICAgICAgICAgcmFuZ2UgPSBGREJLZXlSYW5nZV8xLmRlZmF1bHQub25seSh2YWx1ZVRvS2V5XzEuZGVmYXVsdChyYW5nZSkpO1xuICAgICAgICB9XG4gICAgICAgIHZhciByZXF1ZXN0ID0gbmV3IEZEQlJlcXVlc3RfMS5kZWZhdWx0KCk7XG4gICAgICAgIHJlcXVlc3Quc291cmNlID0gdGhpcztcbiAgICAgICAgcmVxdWVzdC50cmFuc2FjdGlvbiA9IHRoaXMub2JqZWN0U3RvcmUudHJhbnNhY3Rpb247XG4gICAgICAgIHZhciBjdXJzb3IgPSBuZXcgRkRCQ3Vyc29yV2l0aFZhbHVlXzEuZGVmYXVsdCh0aGlzLCByYW5nZSwgZGlyZWN0aW9uLCByZXF1ZXN0KTtcbiAgICAgICAgcmV0dXJuIHRoaXMub2JqZWN0U3RvcmUudHJhbnNhY3Rpb24uX2V4ZWNSZXF1ZXN0QXN5bmMoe1xuICAgICAgICAgICAgb3BlcmF0aW9uOiBjdXJzb3IuX2l0ZXJhdGUuYmluZChjdXJzb3IpLFxuICAgICAgICAgICAgcmVxdWVzdDogcmVxdWVzdCxcbiAgICAgICAgICAgIHNvdXJjZTogdGhpcyxcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmUgbWF4LWxpbmUtbGVuZ3RoXG4gICAgLy8gaHR0cDovL3d3dy53My5vcmcvVFIvMjAxNS9SRUMtSW5kZXhlZERCLTIwMTUwMTA4LyN3aWRsLUlEQkluZGV4LW9wZW5LZXlDdXJzb3ItSURCUmVxdWVzdC1hbnktcmFuZ2UtSURCQ3Vyc29yRGlyZWN0aW9uLWRpcmVjdGlvblxuICAgIEZEQkluZGV4LnByb3RvdHlwZS5vcGVuS2V5Q3Vyc29yID0gZnVuY3Rpb24gKHJhbmdlLCBkaXJlY3Rpb24pIHtcbiAgICAgICAgY29uZmlybUFjdGl2ZVRyYW5zYWN0aW9uKHRoaXMpO1xuICAgICAgICBpZiAocmFuZ2UgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHJhbmdlID0gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICAgIGlmIChyYW5nZSAhPT0gdW5kZWZpbmVkICYmICEocmFuZ2UgaW5zdGFuY2VvZiBGREJLZXlSYW5nZV8xLmRlZmF1bHQpKSB7XG4gICAgICAgICAgICByYW5nZSA9IEZEQktleVJhbmdlXzEuZGVmYXVsdC5vbmx5KHZhbHVlVG9LZXlfMS5kZWZhdWx0KHJhbmdlKSk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHJlcXVlc3QgPSBuZXcgRkRCUmVxdWVzdF8xLmRlZmF1bHQoKTtcbiAgICAgICAgcmVxdWVzdC5zb3VyY2UgPSB0aGlzO1xuICAgICAgICByZXF1ZXN0LnRyYW5zYWN0aW9uID0gdGhpcy5vYmplY3RTdG9yZS50cmFuc2FjdGlvbjtcbiAgICAgICAgdmFyIGN1cnNvciA9IG5ldyBGREJDdXJzb3JfMS5kZWZhdWx0KHRoaXMsIHJhbmdlLCBkaXJlY3Rpb24sIHJlcXVlc3QsIHRydWUpO1xuICAgICAgICByZXR1cm4gdGhpcy5vYmplY3RTdG9yZS50cmFuc2FjdGlvbi5fZXhlY1JlcXVlc3RBc3luYyh7XG4gICAgICAgICAgICBvcGVyYXRpb246IGN1cnNvci5faXRlcmF0ZS5iaW5kKGN1cnNvciksXG4gICAgICAgICAgICByZXF1ZXN0OiByZXF1ZXN0LFxuICAgICAgICAgICAgc291cmNlOiB0aGlzLFxuICAgICAgICB9KTtcbiAgICB9O1xuICAgIEZEQkluZGV4LnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgIGNvbmZpcm1BY3RpdmVUcmFuc2FjdGlvbih0aGlzKTtcbiAgICAgICAgaWYgKCEoa2V5IGluc3RhbmNlb2YgRkRCS2V5UmFuZ2VfMS5kZWZhdWx0KSkge1xuICAgICAgICAgICAga2V5ID0gdmFsdWVUb0tleV8xLmRlZmF1bHQoa2V5KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5vYmplY3RTdG9yZS50cmFuc2FjdGlvbi5fZXhlY1JlcXVlc3RBc3luYyh7XG4gICAgICAgICAgICBvcGVyYXRpb246IHRoaXMuX3Jhd0luZGV4LmdldFZhbHVlLmJpbmQodGhpcy5fcmF3SW5kZXgsIGtleSksXG4gICAgICAgICAgICBzb3VyY2U6IHRoaXMsXG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgLy8gaHR0cDovL3czYy5naXRodWIuaW8vSW5kZXhlZERCLyNkb20taWRiaW5kZXgtZ2V0YWxsXG4gICAgRkRCSW5kZXgucHJvdG90eXBlLmdldEFsbCA9IGZ1bmN0aW9uIChxdWVyeSwgY291bnQpIHtcbiAgICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGNvdW50ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGNvdW50ID0gZW5mb3JjZVJhbmdlXzEuZGVmYXVsdChjb3VudCwgXCJ1bnNpZ25lZCBsb25nXCIpO1xuICAgICAgICB9XG4gICAgICAgIGNvbmZpcm1BY3RpdmVUcmFuc2FjdGlvbih0aGlzKTtcbiAgICAgICAgdmFyIHJhbmdlID0gdmFsdWVUb0tleVJhbmdlXzEuZGVmYXVsdChxdWVyeSk7XG4gICAgICAgIHJldHVybiB0aGlzLm9iamVjdFN0b3JlLnRyYW5zYWN0aW9uLl9leGVjUmVxdWVzdEFzeW5jKHtcbiAgICAgICAgICAgIG9wZXJhdGlvbjogdGhpcy5fcmF3SW5kZXguZ2V0QWxsVmFsdWVzLmJpbmQodGhpcy5fcmF3SW5kZXgsIHJhbmdlLCBjb3VudCksXG4gICAgICAgICAgICBzb3VyY2U6IHRoaXMsXG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgLy8gaHR0cDovL3d3dy53My5vcmcvVFIvMjAxNS9SRUMtSW5kZXhlZERCLTIwMTUwMTA4LyN3aWRsLUlEQkluZGV4LWdldEtleS1JREJSZXF1ZXN0LWFueS1rZXlcbiAgICBGREJJbmRleC5wcm90b3R5cGUuZ2V0S2V5ID0gZnVuY3Rpb24gKGtleSkge1xuICAgICAgICBjb25maXJtQWN0aXZlVHJhbnNhY3Rpb24odGhpcyk7XG4gICAgICAgIGlmICghKGtleSBpbnN0YW5jZW9mIEZEQktleVJhbmdlXzEuZGVmYXVsdCkpIHtcbiAgICAgICAgICAgIGtleSA9IHZhbHVlVG9LZXlfMS5kZWZhdWx0KGtleSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMub2JqZWN0U3RvcmUudHJhbnNhY3Rpb24uX2V4ZWNSZXF1ZXN0QXN5bmMoe1xuICAgICAgICAgICAgb3BlcmF0aW9uOiB0aGlzLl9yYXdJbmRleC5nZXRLZXkuYmluZCh0aGlzLl9yYXdJbmRleCwga2V5KSxcbiAgICAgICAgICAgIHNvdXJjZTogdGhpcyxcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICAvLyBodHRwOi8vdzNjLmdpdGh1Yi5pby9JbmRleGVkREIvI2RvbS1pZGJpbmRleC1nZXRhbGxrZXlzXG4gICAgRkRCSW5kZXgucHJvdG90eXBlLmdldEFsbEtleXMgPSBmdW5jdGlvbiAocXVlcnksIGNvdW50KSB7XG4gICAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSAmJiBjb3VudCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBjb3VudCA9IGVuZm9yY2VSYW5nZV8xLmRlZmF1bHQoY291bnQsIFwidW5zaWduZWQgbG9uZ1wiKTtcbiAgICAgICAgfVxuICAgICAgICBjb25maXJtQWN0aXZlVHJhbnNhY3Rpb24odGhpcyk7XG4gICAgICAgIHZhciByYW5nZSA9IHZhbHVlVG9LZXlSYW5nZV8xLmRlZmF1bHQocXVlcnkpO1xuICAgICAgICByZXR1cm4gdGhpcy5vYmplY3RTdG9yZS50cmFuc2FjdGlvbi5fZXhlY1JlcXVlc3RBc3luYyh7XG4gICAgICAgICAgICBvcGVyYXRpb246IHRoaXMuX3Jhd0luZGV4LmdldEFsbEtleXMuYmluZCh0aGlzLl9yYXdJbmRleCwgcmFuZ2UsIGNvdW50KSxcbiAgICAgICAgICAgIHNvdXJjZTogdGhpcyxcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICAvLyBodHRwOi8vd3d3LnczLm9yZy9UUi8yMDE1L1JFQy1JbmRleGVkREItMjAxNTAxMDgvI3dpZGwtSURCSW5kZXgtY291bnQtSURCUmVxdWVzdC1hbnkta2V5XG4gICAgRkRCSW5kZXgucHJvdG90eXBlLmNvdW50ID0gZnVuY3Rpb24gKGtleSkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICBjb25maXJtQWN0aXZlVHJhbnNhY3Rpb24odGhpcyk7XG4gICAgICAgIGlmIChrZXkgPT09IG51bGwpIHtcbiAgICAgICAgICAgIGtleSA9IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoa2V5ICE9PSB1bmRlZmluZWQgJiYgIShrZXkgaW5zdGFuY2VvZiBGREJLZXlSYW5nZV8xLmRlZmF1bHQpKSB7XG4gICAgICAgICAgICBrZXkgPSBGREJLZXlSYW5nZV8xLmRlZmF1bHQub25seSh2YWx1ZVRvS2V5XzEuZGVmYXVsdChrZXkpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5vYmplY3RTdG9yZS50cmFuc2FjdGlvbi5fZXhlY1JlcXVlc3RBc3luYyh7XG4gICAgICAgICAgICBvcGVyYXRpb246IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB2YXIgY291bnQgPSAwO1xuICAgICAgICAgICAgICAgIHZhciBjdXJzb3IgPSBuZXcgRkRCQ3Vyc29yXzEuZGVmYXVsdChfdGhpcywga2V5KTtcbiAgICAgICAgICAgICAgICB3aGlsZSAoY3Vyc29yLl9pdGVyYXRlKCkgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgY291bnQgKz0gMTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvdW50O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNvdXJjZTogdGhpcyxcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBGREJJbmRleC5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBcIltvYmplY3QgSURCSW5kZXhdXCI7XG4gICAgfTtcbiAgICByZXR1cm4gRkRCSW5kZXg7XG59KCkpO1xuZXhwb3J0cy5kZWZhdWx0ID0gRkRCSW5kZXg7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9mYWtlLWluZGV4ZWRkYi9idWlsZC9GREJJbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gMzhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgRkRCS2V5UmFuZ2VfMSA9IHJlcXVpcmUoXCIuLi9GREJLZXlSYW5nZVwiKTtcbnZhciBlcnJvcnNfMSA9IHJlcXVpcmUoXCIuL2Vycm9yc1wiKTtcbnZhciB2YWx1ZVRvS2V5XzEgPSByZXF1aXJlKFwiLi92YWx1ZVRvS2V5XCIpO1xuLy8gaHR0cDovL3czYy5naXRodWIuaW8vSW5kZXhlZERCLyNjb252ZXJ0LWEtdmFsdWUtdG8tYS1rZXktcmFuZ2VcbnZhciB2YWx1ZVRvS2V5UmFuZ2UgPSBmdW5jdGlvbiAodmFsdWUsIG51bGxEaXNhbGxvd2VkRmxhZykge1xuICAgIGlmIChudWxsRGlzYWxsb3dlZEZsYWcgPT09IHZvaWQgMCkgeyBudWxsRGlzYWxsb3dlZEZsYWcgPSBmYWxzZTsgfVxuICAgIGlmICh2YWx1ZSBpbnN0YW5jZW9mIEZEQktleVJhbmdlXzEuZGVmYXVsdCkge1xuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuICAgIGlmICh2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGlmIChudWxsRGlzYWxsb3dlZEZsYWcpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBlcnJvcnNfMS5EYXRhRXJyb3IoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmV3IEZEQktleVJhbmdlXzEuZGVmYXVsdCh1bmRlZmluZWQsIHVuZGVmaW5lZCwgZmFsc2UsIGZhbHNlKTtcbiAgICB9XG4gICAgdmFyIGtleSA9IHZhbHVlVG9LZXlfMS5kZWZhdWx0KHZhbHVlKTtcbiAgICByZXR1cm4gRkRCS2V5UmFuZ2VfMS5kZWZhdWx0Lm9ubHkoa2V5KTtcbn07XG5leHBvcnRzLmRlZmF1bHQgPSB2YWx1ZVRvS2V5UmFuZ2U7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9mYWtlLWluZGV4ZWRkYi9idWlsZC9saWIvdmFsdWVUb0tleVJhbmdlLmpzXG4vLyBtb2R1bGUgaWQgPSAzOVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBGREJLZXlSYW5nZV8xID0gcmVxdWlyZShcIi4uL0ZEQktleVJhbmdlXCIpO1xudmFyIGNtcF8xID0gcmVxdWlyZShcIi4vY21wXCIpO1xudmFyIFJlY29yZFN0b3JlID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFJlY29yZFN0b3JlKCkge1xuICAgICAgICB0aGlzLnJlY29yZHMgPSBbXTtcbiAgICB9XG4gICAgUmVjb3JkU3RvcmUucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgICAgaWYgKGtleSBpbnN0YW5jZW9mIEZEQktleVJhbmdlXzEuZGVmYXVsdCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucmVjb3Jkcy5maW5kKGZ1bmN0aW9uIChyZWNvcmQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4ga2V5LmluY2x1ZGVzKHJlY29yZC5rZXkpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMucmVjb3Jkcy5maW5kKGZ1bmN0aW9uIChyZWNvcmQpIHtcbiAgICAgICAgICAgIHJldHVybiBjbXBfMS5kZWZhdWx0KHJlY29yZC5rZXksIGtleSkgPT09IDA7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgUmVjb3JkU3RvcmUucHJvdG90eXBlLmFkZCA9IGZ1bmN0aW9uIChuZXdSZWNvcmQpIHtcbiAgICAgICAgLy8gRmluZCB3aGVyZSB0byBwdXQgaXQgc28gaXQncyBzb3J0ZWQgYnkga2V5XG4gICAgICAgIHZhciBpO1xuICAgICAgICBpZiAodGhpcy5yZWNvcmRzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgaSA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBpID0gdGhpcy5yZWNvcmRzLmZpbmRJbmRleChmdW5jdGlvbiAocmVjb3JkKSB7XG4gICAgICAgICAgICAgICAgLy8gY21wIHdpbGwgb25seSByZXR1cm4gMCBmb3IgYW4gaW5kZXguIEZvciBhbiBvYmplY3Qgc3RvcmUsIGFueSBtYXRjaGluZyBrZXkgaGFzIGFscmVhZHkgYmVlbiBkZWxldGVkLFxuICAgICAgICAgICAgICAgIC8vIGJ1dCB3ZSBzdGlsbCBuZWVkIHRvIGxvb2sgZm9yIGNtcCA9IDEgdG8gZmluZCB3aGVyZSB0byBpbnNlcnQuXG4gICAgICAgICAgICAgICAgcmV0dXJuIGNtcF8xLmRlZmF1bHQocmVjb3JkLmtleSwgbmV3UmVjb3JkLmtleSkgPj0gMDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaWYgKGkgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgLy8gSWYgbm8gbWF0Y2hpbmcga2V5LCBhZGQgdG8gZW5kXG4gICAgICAgICAgICAgICAgaSA9IHRoaXMucmVjb3Jkcy5sZW5ndGg7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBJZiBtYXRjaGluZyBrZXksIGFkdmFuY2UgdG8gYXBwcm9wcmlhdGUgcG9zaXRpb24gYmFzZWQgb24gdmFsdWUgKHVzZWQgaW4gaW5kZXhlcylcbiAgICAgICAgICAgICAgICB3aGlsZSAoaSA8IHRoaXMucmVjb3Jkcy5sZW5ndGggJiZcbiAgICAgICAgICAgICAgICAgICAgY21wXzEuZGVmYXVsdCh0aGlzLnJlY29yZHNbaV0ua2V5LCBuZXdSZWNvcmQua2V5KSA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoY21wXzEuZGVmYXVsdCh0aGlzLnJlY29yZHNbaV0udmFsdWUsIG5ld1JlY29yZC52YWx1ZSkgIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBSZWNvcmQgdmFsdWUgPj0gbmV3UmVjb3JkIHZhbHVlLCBzbyBpbnNlcnQgaGVyZVxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaSArPSAxOyAvLyBMb29rIGF0IG5leHQgcmVjb3JkXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMucmVjb3Jkcy5zcGxpY2UoaSwgMCwgbmV3UmVjb3JkKTtcbiAgICB9O1xuICAgIFJlY29yZFN0b3JlLnByb3RvdHlwZS5kZWxldGUgPSBmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgIHZhciByYW5nZSA9IGtleSBpbnN0YW5jZW9mIEZEQktleVJhbmdlXzEuZGVmYXVsdCA/IGtleSA6IEZEQktleVJhbmdlXzEuZGVmYXVsdC5vbmx5KGtleSk7XG4gICAgICAgIHZhciBkZWxldGVkUmVjb3JkcyA9IFtdO1xuICAgICAgICB0aGlzLnJlY29yZHMgPSB0aGlzLnJlY29yZHMuZmlsdGVyKGZ1bmN0aW9uIChyZWNvcmQpIHtcbiAgICAgICAgICAgIHZhciBzaG91bGREZWxldGUgPSByYW5nZS5pbmNsdWRlcyhyZWNvcmQua2V5KTtcbiAgICAgICAgICAgIGlmIChzaG91bGREZWxldGUpIHtcbiAgICAgICAgICAgICAgICBkZWxldGVkUmVjb3Jkcy5wdXNoKHJlY29yZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gIXNob3VsZERlbGV0ZTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBkZWxldGVkUmVjb3JkcztcbiAgICB9O1xuICAgIFJlY29yZFN0b3JlLnByb3RvdHlwZS5kZWxldGVCeVZhbHVlID0gZnVuY3Rpb24gKGtleSkge1xuICAgICAgICB2YXIgcmFuZ2UgPSBrZXkgaW5zdGFuY2VvZiBGREJLZXlSYW5nZV8xLmRlZmF1bHQgPyBrZXkgOiBGREJLZXlSYW5nZV8xLmRlZmF1bHQub25seShrZXkpO1xuICAgICAgICB2YXIgZGVsZXRlZFJlY29yZHMgPSBbXTtcbiAgICAgICAgdGhpcy5yZWNvcmRzID0gdGhpcy5yZWNvcmRzLmZpbHRlcihmdW5jdGlvbiAocmVjb3JkKSB7XG4gICAgICAgICAgICB2YXIgc2hvdWxkRGVsZXRlID0gcmFuZ2UuaW5jbHVkZXMocmVjb3JkLnZhbHVlKTtcbiAgICAgICAgICAgIGlmIChzaG91bGREZWxldGUpIHtcbiAgICAgICAgICAgICAgICBkZWxldGVkUmVjb3Jkcy5wdXNoKHJlY29yZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gIXNob3VsZERlbGV0ZTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBkZWxldGVkUmVjb3JkcztcbiAgICB9O1xuICAgIFJlY29yZFN0b3JlLnByb3RvdHlwZS5jbGVhciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRlbGV0ZWRSZWNvcmRzID0gdGhpcy5yZWNvcmRzLnNsaWNlKCk7XG4gICAgICAgIHRoaXMucmVjb3JkcyA9IFtdO1xuICAgICAgICByZXR1cm4gZGVsZXRlZFJlY29yZHM7XG4gICAgfTtcbiAgICBSZWNvcmRTdG9yZS5wcm90b3R5cGUudmFsdWVzID0gZnVuY3Rpb24gKHJhbmdlLCBkaXJlY3Rpb24pIHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICBpZiAoZGlyZWN0aW9uID09PSB2b2lkIDApIHsgZGlyZWN0aW9uID0gXCJuZXh0XCI7IH1cbiAgICAgICAgcmV0dXJuIF9hID0ge30sXG4gICAgICAgICAgICBfYVtTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHZhciBpO1xuICAgICAgICAgICAgICAgIGlmIChkaXJlY3Rpb24gPT09IFwibmV4dFwiKSB7XG4gICAgICAgICAgICAgICAgICAgIGkgPSAwO1xuICAgICAgICAgICAgICAgICAgICBpZiAocmFuZ2UgIT09IHVuZGVmaW5lZCAmJiByYW5nZS5sb3dlciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB3aGlsZSAoX3RoaXMucmVjb3Jkc1tpXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGNtcFJlc3VsdCA9IGNtcF8xLmRlZmF1bHQoX3RoaXMucmVjb3Jkc1tpXS5rZXksIHJhbmdlLmxvd2VyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY21wUmVzdWx0ID09PSAxIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChjbXBSZXN1bHQgPT09IDAgJiYgIXJhbmdlLmxvd2VyT3BlbikpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGkgKz0gMTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaSA9IF90aGlzLnJlY29yZHMubGVuZ3RoIC0gMTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJhbmdlICE9PSB1bmRlZmluZWQgJiYgcmFuZ2UudXBwZXIgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgd2hpbGUgKF90aGlzLnJlY29yZHNbaV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjbXBSZXN1bHQgPSBjbXBfMS5kZWZhdWx0KF90aGlzLnJlY29yZHNbaV0ua2V5LCByYW5nZS51cHBlcik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNtcFJlc3VsdCA9PT0gLTEgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKGNtcFJlc3VsdCA9PT0gMCAmJiAhcmFuZ2UudXBwZXJPcGVuKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaSAtPSAxO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIG5leHQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBkb25lO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRpcmVjdGlvbiA9PT0gXCJuZXh0XCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IF90aGlzLnJlY29yZHNbaV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZG9uZSA9IGkgPj0gX3RoaXMucmVjb3Jkcy5sZW5ndGg7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaSArPSAxO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghZG9uZSAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByYW5nZSAhPT0gdW5kZWZpbmVkICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJhbmdlLnVwcGVyICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGNtcFJlc3VsdCA9IGNtcF8xLmRlZmF1bHQodmFsdWUua2V5LCByYW5nZS51cHBlcik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRvbmUgPVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY21wUmVzdWx0ID09PSAxIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKGNtcFJlc3VsdCA9PT0gMCAmJiByYW5nZS51cHBlck9wZW4pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZG9uZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IF90aGlzLnJlY29yZHNbaV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZG9uZSA9IGkgPCAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGkgLT0gMTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWRvbmUgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmFuZ2UgIT09IHVuZGVmaW5lZCAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByYW5nZS5sb3dlciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjbXBSZXN1bHQgPSBjbXBfMS5kZWZhdWx0KHZhbHVlLmtleSwgcmFuZ2UubG93ZXIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkb25lID1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNtcFJlc3VsdCA9PT0gLTEgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoY21wUmVzdWx0ID09PSAwICYmIHJhbmdlLmxvd2VyT3Blbik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkb25lKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFRoZSB3ZWlyZCBcImFzIEl0ZXJhdG9yUmVzdWx0PFJlY29yZD5cIiBpcyBuZWVkZWQgYmVjYXVzZSBvZlxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL01pY3Jvc29mdC9UeXBlU2NyaXB0L2lzc3Vlcy8xMTM3NSBhbmRcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9NaWNyb3NvZnQvVHlwZVNjcmlwdC9pc3N1ZXMvMjk4M1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lIG5vLW9iamVjdC1saXRlcmFsLXR5cGUtYXNzZXJ0aW9uXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRvbmU6IGRvbmUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF9hO1xuICAgIH07XG4gICAgcmV0dXJuIFJlY29yZFN0b3JlO1xufSgpKTtcbmV4cG9ydHMuZGVmYXVsdCA9IFJlY29yZFN0b3JlO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvZmFrZS1pbmRleGVkZGIvYnVpbGQvbGliL1JlY29yZFN0b3JlLmpzXG4vLyBtb2R1bGUgaWQgPSA0MFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX3ZhbHVlcyA9ICh0aGlzICYmIHRoaXMuX192YWx1ZXMpIHx8IGZ1bmN0aW9uKG8pIHtcbiAgICB2YXIgcyA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBTeW1ib2wuaXRlcmF0b3IsIG0gPSBzICYmIG9bc10sIGkgPSAwO1xuICAgIGlmIChtKSByZXR1cm4gbS5jYWxsKG8pO1xuICAgIGlmIChvICYmIHR5cGVvZiBvLmxlbmd0aCA9PT0gXCJudW1iZXJcIikgcmV0dXJuIHtcbiAgICAgICAgbmV4dDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKG8gJiYgaSA+PSBvLmxlbmd0aCkgbyA9IHZvaWQgMDtcbiAgICAgICAgICAgIHJldHVybiB7IHZhbHVlOiBvICYmIG9baSsrXSwgZG9uZTogIW8gfTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihzID8gXCJPYmplY3QgaXMgbm90IGl0ZXJhYmxlLlwiIDogXCJTeW1ib2wuaXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbi8vIGh0dHA6Ly93d3cudzMub3JnL1RSLzIwMTUvUkVDLUluZGV4ZWREQi0yMDE1MDEwOC8jZGZuLXZhbGlkLWtleS1wYXRoXG52YXIgdmFsaWRhdGVLZXlQYXRoID0gZnVuY3Rpb24gKGtleVBhdGgsIHBhcmVudCkge1xuICAgIHZhciBlXzEsIF9hLCBlXzIsIF9iO1xuICAgIC8vIFRoaXMgZG9lc24ndCBtYWtlIHNlbnNlIHRvIG1lIGJhc2VkIG9uIHRoZSBzcGVjLCBidXQgaXQgaXMgbmVlZGVkIHRvIHBhc3MgdGhlIFczQyBLZXlQYXRoIHRlc3RzIChzZWUgc2FtZVxuICAgIC8vIGNvbW1lbnQgaW4gZXh0cmFjdEtleSlcbiAgICBpZiAoa2V5UGF0aCAhPT0gdW5kZWZpbmVkICYmXG4gICAgICAgIGtleVBhdGggIT09IG51bGwgJiZcbiAgICAgICAgdHlwZW9mIGtleVBhdGggIT09IFwic3RyaW5nXCIgJiZcbiAgICAgICAga2V5UGF0aC50b1N0cmluZyAmJlxuICAgICAgICAocGFyZW50ID09PSBcImFycmF5XCIgfHwgIUFycmF5LmlzQXJyYXkoa2V5UGF0aCkpKSB7XG4gICAgICAgIGtleVBhdGggPSBrZXlQYXRoLnRvU3RyaW5nKCk7XG4gICAgfVxuICAgIGlmICh0eXBlb2Yga2V5UGF0aCA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICBpZiAoa2V5UGF0aCA9PT0gXCJcIiAmJiBwYXJlbnQgIT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gaHR0cHM6Ly9tYXRoaWFzYnluZW5zLmJlL2RlbW8vamF2YXNjcmlwdC1pZGVudGlmaWVyLXJlZ2V4IGZvciBFQ01BU2NyaXB0IDUuMSAvIFVuaWNvZGUgdjcuMC4wLCB3aXRoXG4gICAgICAgICAgICAvLyByZXNlcnZlZCB3b3JkcyBhdCBiZWdpbm5pbmcgcmVtb3ZlZFxuICAgICAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lIG1heC1saW5lLWxlbmd0aFxuICAgICAgICAgICAgdmFyIHZhbGlkSWRlbnRpZmllclJlZ2V4ID0gL14oPzpbXFwkQS1aX2EtelxceEFBXFx4QjVcXHhCQVxceEMwLVxceEQ2XFx4RDgtXFx4RjZcXHhGOC1cXHUwMkMxXFx1MDJDNi1cXHUwMkQxXFx1MDJFMC1cXHUwMkU0XFx1MDJFQ1xcdTAyRUVcXHUwMzcwLVxcdTAzNzRcXHUwMzc2XFx1MDM3N1xcdTAzN0EtXFx1MDM3RFxcdTAzN0ZcXHUwMzg2XFx1MDM4OC1cXHUwMzhBXFx1MDM4Q1xcdTAzOEUtXFx1MDNBMVxcdTAzQTMtXFx1MDNGNVxcdTAzRjctXFx1MDQ4MVxcdTA0OEEtXFx1MDUyRlxcdTA1MzEtXFx1MDU1NlxcdTA1NTlcXHUwNTYxLVxcdTA1ODdcXHUwNUQwLVxcdTA1RUFcXHUwNUYwLVxcdTA1RjJcXHUwNjIwLVxcdTA2NEFcXHUwNjZFXFx1MDY2RlxcdTA2NzEtXFx1MDZEM1xcdTA2RDVcXHUwNkU1XFx1MDZFNlxcdTA2RUVcXHUwNkVGXFx1MDZGQS1cXHUwNkZDXFx1MDZGRlxcdTA3MTBcXHUwNzEyLVxcdTA3MkZcXHUwNzRELVxcdTA3QTVcXHUwN0IxXFx1MDdDQS1cXHUwN0VBXFx1MDdGNFxcdTA3RjVcXHUwN0ZBXFx1MDgwMC1cXHUwODE1XFx1MDgxQVxcdTA4MjRcXHUwODI4XFx1MDg0MC1cXHUwODU4XFx1MDhBMC1cXHUwOEIyXFx1MDkwNC1cXHUwOTM5XFx1MDkzRFxcdTA5NTBcXHUwOTU4LVxcdTA5NjFcXHUwOTcxLVxcdTA5ODBcXHUwOTg1LVxcdTA5OENcXHUwOThGXFx1MDk5MFxcdTA5OTMtXFx1MDlBOFxcdTA5QUEtXFx1MDlCMFxcdTA5QjJcXHUwOUI2LVxcdTA5QjlcXHUwOUJEXFx1MDlDRVxcdTA5RENcXHUwOUREXFx1MDlERi1cXHUwOUUxXFx1MDlGMFxcdTA5RjFcXHUwQTA1LVxcdTBBMEFcXHUwQTBGXFx1MEExMFxcdTBBMTMtXFx1MEEyOFxcdTBBMkEtXFx1MEEzMFxcdTBBMzJcXHUwQTMzXFx1MEEzNVxcdTBBMzZcXHUwQTM4XFx1MEEzOVxcdTBBNTktXFx1MEE1Q1xcdTBBNUVcXHUwQTcyLVxcdTBBNzRcXHUwQTg1LVxcdTBBOERcXHUwQThGLVxcdTBBOTFcXHUwQTkzLVxcdTBBQThcXHUwQUFBLVxcdTBBQjBcXHUwQUIyXFx1MEFCM1xcdTBBQjUtXFx1MEFCOVxcdTBBQkRcXHUwQUQwXFx1MEFFMFxcdTBBRTFcXHUwQjA1LVxcdTBCMENcXHUwQjBGXFx1MEIxMFxcdTBCMTMtXFx1MEIyOFxcdTBCMkEtXFx1MEIzMFxcdTBCMzJcXHUwQjMzXFx1MEIzNS1cXHUwQjM5XFx1MEIzRFxcdTBCNUNcXHUwQjVEXFx1MEI1Ri1cXHUwQjYxXFx1MEI3MVxcdTBCODNcXHUwQjg1LVxcdTBCOEFcXHUwQjhFLVxcdTBCOTBcXHUwQjkyLVxcdTBCOTVcXHUwQjk5XFx1MEI5QVxcdTBCOUNcXHUwQjlFXFx1MEI5RlxcdTBCQTNcXHUwQkE0XFx1MEJBOC1cXHUwQkFBXFx1MEJBRS1cXHUwQkI5XFx1MEJEMFxcdTBDMDUtXFx1MEMwQ1xcdTBDMEUtXFx1MEMxMFxcdTBDMTItXFx1MEMyOFxcdTBDMkEtXFx1MEMzOVxcdTBDM0RcXHUwQzU4XFx1MEM1OVxcdTBDNjBcXHUwQzYxXFx1MEM4NS1cXHUwQzhDXFx1MEM4RS1cXHUwQzkwXFx1MEM5Mi1cXHUwQ0E4XFx1MENBQS1cXHUwQ0IzXFx1MENCNS1cXHUwQ0I5XFx1MENCRFxcdTBDREVcXHUwQ0UwXFx1MENFMVxcdTBDRjFcXHUwQ0YyXFx1MEQwNS1cXHUwRDBDXFx1MEQwRS1cXHUwRDEwXFx1MEQxMi1cXHUwRDNBXFx1MEQzRFxcdTBENEVcXHUwRDYwXFx1MEQ2MVxcdTBEN0EtXFx1MEQ3RlxcdTBEODUtXFx1MEQ5NlxcdTBEOUEtXFx1MERCMVxcdTBEQjMtXFx1MERCQlxcdTBEQkRcXHUwREMwLVxcdTBEQzZcXHUwRTAxLVxcdTBFMzBcXHUwRTMyXFx1MEUzM1xcdTBFNDAtXFx1MEU0NlxcdTBFODFcXHUwRTgyXFx1MEU4NFxcdTBFODdcXHUwRTg4XFx1MEU4QVxcdTBFOERcXHUwRTk0LVxcdTBFOTdcXHUwRTk5LVxcdTBFOUZcXHUwRUExLVxcdTBFQTNcXHUwRUE1XFx1MEVBN1xcdTBFQUFcXHUwRUFCXFx1MEVBRC1cXHUwRUIwXFx1MEVCMlxcdTBFQjNcXHUwRUJEXFx1MEVDMC1cXHUwRUM0XFx1MEVDNlxcdTBFREMtXFx1MEVERlxcdTBGMDBcXHUwRjQwLVxcdTBGNDdcXHUwRjQ5LVxcdTBGNkNcXHUwRjg4LVxcdTBGOENcXHUxMDAwLVxcdTEwMkFcXHUxMDNGXFx1MTA1MC1cXHUxMDU1XFx1MTA1QS1cXHUxMDVEXFx1MTA2MVxcdTEwNjVcXHUxMDY2XFx1MTA2RS1cXHUxMDcwXFx1MTA3NS1cXHUxMDgxXFx1MTA4RVxcdTEwQTAtXFx1MTBDNVxcdTEwQzdcXHUxMENEXFx1MTBEMC1cXHUxMEZBXFx1MTBGQy1cXHUxMjQ4XFx1MTI0QS1cXHUxMjREXFx1MTI1MC1cXHUxMjU2XFx1MTI1OFxcdTEyNUEtXFx1MTI1RFxcdTEyNjAtXFx1MTI4OFxcdTEyOEEtXFx1MTI4RFxcdTEyOTAtXFx1MTJCMFxcdTEyQjItXFx1MTJCNVxcdTEyQjgtXFx1MTJCRVxcdTEyQzBcXHUxMkMyLVxcdTEyQzVcXHUxMkM4LVxcdTEyRDZcXHUxMkQ4LVxcdTEzMTBcXHUxMzEyLVxcdTEzMTVcXHUxMzE4LVxcdTEzNUFcXHUxMzgwLVxcdTEzOEZcXHUxM0EwLVxcdTEzRjRcXHUxNDAxLVxcdTE2NkNcXHUxNjZGLVxcdTE2N0ZcXHUxNjgxLVxcdTE2OUFcXHUxNkEwLVxcdTE2RUFcXHUxNkVFLVxcdTE2RjhcXHUxNzAwLVxcdTE3MENcXHUxNzBFLVxcdTE3MTFcXHUxNzIwLVxcdTE3MzFcXHUxNzQwLVxcdTE3NTFcXHUxNzYwLVxcdTE3NkNcXHUxNzZFLVxcdTE3NzBcXHUxNzgwLVxcdTE3QjNcXHUxN0Q3XFx1MTdEQ1xcdTE4MjAtXFx1MTg3N1xcdTE4ODAtXFx1MThBOFxcdTE4QUFcXHUxOEIwLVxcdTE4RjVcXHUxOTAwLVxcdTE5MUVcXHUxOTUwLVxcdTE5NkRcXHUxOTcwLVxcdTE5NzRcXHUxOTgwLVxcdTE5QUJcXHUxOUMxLVxcdTE5QzdcXHUxQTAwLVxcdTFBMTZcXHUxQTIwLVxcdTFBNTRcXHUxQUE3XFx1MUIwNS1cXHUxQjMzXFx1MUI0NS1cXHUxQjRCXFx1MUI4My1cXHUxQkEwXFx1MUJBRVxcdTFCQUZcXHUxQkJBLVxcdTFCRTVcXHUxQzAwLVxcdTFDMjNcXHUxQzRELVxcdTFDNEZcXHUxQzVBLVxcdTFDN0RcXHUxQ0U5LVxcdTFDRUNcXHUxQ0VFLVxcdTFDRjFcXHUxQ0Y1XFx1MUNGNlxcdTFEMDAtXFx1MURCRlxcdTFFMDAtXFx1MUYxNVxcdTFGMTgtXFx1MUYxRFxcdTFGMjAtXFx1MUY0NVxcdTFGNDgtXFx1MUY0RFxcdTFGNTAtXFx1MUY1N1xcdTFGNTlcXHUxRjVCXFx1MUY1RFxcdTFGNUYtXFx1MUY3RFxcdTFGODAtXFx1MUZCNFxcdTFGQjYtXFx1MUZCQ1xcdTFGQkVcXHUxRkMyLVxcdTFGQzRcXHUxRkM2LVxcdTFGQ0NcXHUxRkQwLVxcdTFGRDNcXHUxRkQ2LVxcdTFGREJcXHUxRkUwLVxcdTFGRUNcXHUxRkYyLVxcdTFGRjRcXHUxRkY2LVxcdTFGRkNcXHUyMDcxXFx1MjA3RlxcdTIwOTAtXFx1MjA5Q1xcdTIxMDJcXHUyMTA3XFx1MjEwQS1cXHUyMTEzXFx1MjExNVxcdTIxMTktXFx1MjExRFxcdTIxMjRcXHUyMTI2XFx1MjEyOFxcdTIxMkEtXFx1MjEyRFxcdTIxMkYtXFx1MjEzOVxcdTIxM0MtXFx1MjEzRlxcdTIxNDUtXFx1MjE0OVxcdTIxNEVcXHUyMTYwLVxcdTIxODhcXHUyQzAwLVxcdTJDMkVcXHUyQzMwLVxcdTJDNUVcXHUyQzYwLVxcdTJDRTRcXHUyQ0VCLVxcdTJDRUVcXHUyQ0YyXFx1MkNGM1xcdTJEMDAtXFx1MkQyNVxcdTJEMjdcXHUyRDJEXFx1MkQzMC1cXHUyRDY3XFx1MkQ2RlxcdTJEODAtXFx1MkQ5NlxcdTJEQTAtXFx1MkRBNlxcdTJEQTgtXFx1MkRBRVxcdTJEQjAtXFx1MkRCNlxcdTJEQjgtXFx1MkRCRVxcdTJEQzAtXFx1MkRDNlxcdTJEQzgtXFx1MkRDRVxcdTJERDAtXFx1MkRENlxcdTJERDgtXFx1MkRERVxcdTJFMkZcXHUzMDA1LVxcdTMwMDdcXHUzMDIxLVxcdTMwMjlcXHUzMDMxLVxcdTMwMzVcXHUzMDM4LVxcdTMwM0NcXHUzMDQxLVxcdTMwOTZcXHUzMDlELVxcdTMwOUZcXHUzMEExLVxcdTMwRkFcXHUzMEZDLVxcdTMwRkZcXHUzMTA1LVxcdTMxMkRcXHUzMTMxLVxcdTMxOEVcXHUzMUEwLVxcdTMxQkFcXHUzMUYwLVxcdTMxRkZcXHUzNDAwLVxcdTREQjVcXHU0RTAwLVxcdTlGQ0NcXHVBMDAwLVxcdUE0OENcXHVBNEQwLVxcdUE0RkRcXHVBNTAwLVxcdUE2MENcXHVBNjEwLVxcdUE2MUZcXHVBNjJBXFx1QTYyQlxcdUE2NDAtXFx1QTY2RVxcdUE2N0YtXFx1QTY5RFxcdUE2QTAtXFx1QTZFRlxcdUE3MTctXFx1QTcxRlxcdUE3MjItXFx1QTc4OFxcdUE3OEItXFx1QTc4RVxcdUE3OTAtXFx1QTdBRFxcdUE3QjBcXHVBN0IxXFx1QTdGNy1cXHVBODAxXFx1QTgwMy1cXHVBODA1XFx1QTgwNy1cXHVBODBBXFx1QTgwQy1cXHVBODIyXFx1QTg0MC1cXHVBODczXFx1QTg4Mi1cXHVBOEIzXFx1QThGMi1cXHVBOEY3XFx1QThGQlxcdUE5MEEtXFx1QTkyNVxcdUE5MzAtXFx1QTk0NlxcdUE5NjAtXFx1QTk3Q1xcdUE5ODQtXFx1QTlCMlxcdUE5Q0ZcXHVBOUUwLVxcdUE5RTRcXHVBOUU2LVxcdUE5RUZcXHVBOUZBLVxcdUE5RkVcXHVBQTAwLVxcdUFBMjhcXHVBQTQwLVxcdUFBNDJcXHVBQTQ0LVxcdUFBNEJcXHVBQTYwLVxcdUFBNzZcXHVBQTdBXFx1QUE3RS1cXHVBQUFGXFx1QUFCMVxcdUFBQjVcXHVBQUI2XFx1QUFCOS1cXHVBQUJEXFx1QUFDMFxcdUFBQzJcXHVBQURCLVxcdUFBRERcXHVBQUUwLVxcdUFBRUFcXHVBQUYyLVxcdUFBRjRcXHVBQjAxLVxcdUFCMDZcXHVBQjA5LVxcdUFCMEVcXHVBQjExLVxcdUFCMTZcXHVBQjIwLVxcdUFCMjZcXHVBQjI4LVxcdUFCMkVcXHVBQjMwLVxcdUFCNUFcXHVBQjVDLVxcdUFCNUZcXHVBQjY0XFx1QUI2NVxcdUFCQzAtXFx1QUJFMlxcdUFDMDAtXFx1RDdBM1xcdUQ3QjAtXFx1RDdDNlxcdUQ3Q0ItXFx1RDdGQlxcdUY5MDAtXFx1RkE2RFxcdUZBNzAtXFx1RkFEOVxcdUZCMDAtXFx1RkIwNlxcdUZCMTMtXFx1RkIxN1xcdUZCMURcXHVGQjFGLVxcdUZCMjhcXHVGQjJBLVxcdUZCMzZcXHVGQjM4LVxcdUZCM0NcXHVGQjNFXFx1RkI0MFxcdUZCNDFcXHVGQjQzXFx1RkI0NFxcdUZCNDYtXFx1RkJCMVxcdUZCRDMtXFx1RkQzRFxcdUZENTAtXFx1RkQ4RlxcdUZEOTItXFx1RkRDN1xcdUZERjAtXFx1RkRGQlxcdUZFNzAtXFx1RkU3NFxcdUZFNzYtXFx1RkVGQ1xcdUZGMjEtXFx1RkYzQVxcdUZGNDEtXFx1RkY1QVxcdUZGNjYtXFx1RkZCRVxcdUZGQzItXFx1RkZDN1xcdUZGQ0EtXFx1RkZDRlxcdUZGRDItXFx1RkZEN1xcdUZGREEtXFx1RkZEQ10pKD86W1xcJDAtOUEtWl9hLXpcXHhBQVxceEI1XFx4QkFcXHhDMC1cXHhENlxceEQ4LVxceEY2XFx4RjgtXFx1MDJDMVxcdTAyQzYtXFx1MDJEMVxcdTAyRTAtXFx1MDJFNFxcdTAyRUNcXHUwMkVFXFx1MDMwMC1cXHUwMzc0XFx1MDM3NlxcdTAzNzdcXHUwMzdBLVxcdTAzN0RcXHUwMzdGXFx1MDM4NlxcdTAzODgtXFx1MDM4QVxcdTAzOENcXHUwMzhFLVxcdTAzQTFcXHUwM0EzLVxcdTAzRjVcXHUwM0Y3LVxcdTA0ODFcXHUwNDgzLVxcdTA0ODdcXHUwNDhBLVxcdTA1MkZcXHUwNTMxLVxcdTA1NTZcXHUwNTU5XFx1MDU2MS1cXHUwNTg3XFx1MDU5MS1cXHUwNUJEXFx1MDVCRlxcdTA1QzFcXHUwNUMyXFx1MDVDNFxcdTA1QzVcXHUwNUM3XFx1MDVEMC1cXHUwNUVBXFx1MDVGMC1cXHUwNUYyXFx1MDYxMC1cXHUwNjFBXFx1MDYyMC1cXHUwNjY5XFx1MDY2RS1cXHUwNkQzXFx1MDZENS1cXHUwNkRDXFx1MDZERi1cXHUwNkU4XFx1MDZFQS1cXHUwNkZDXFx1MDZGRlxcdTA3MTAtXFx1MDc0QVxcdTA3NEQtXFx1MDdCMVxcdTA3QzAtXFx1MDdGNVxcdTA3RkFcXHUwODAwLVxcdTA4MkRcXHUwODQwLVxcdTA4NUJcXHUwOEEwLVxcdTA4QjJcXHUwOEU0LVxcdTA5NjNcXHUwOTY2LVxcdTA5NkZcXHUwOTcxLVxcdTA5ODNcXHUwOTg1LVxcdTA5OENcXHUwOThGXFx1MDk5MFxcdTA5OTMtXFx1MDlBOFxcdTA5QUEtXFx1MDlCMFxcdTA5QjJcXHUwOUI2LVxcdTA5QjlcXHUwOUJDLVxcdTA5QzRcXHUwOUM3XFx1MDlDOFxcdTA5Q0ItXFx1MDlDRVxcdTA5RDdcXHUwOURDXFx1MDlERFxcdTA5REYtXFx1MDlFM1xcdTA5RTYtXFx1MDlGMVxcdTBBMDEtXFx1MEEwM1xcdTBBMDUtXFx1MEEwQVxcdTBBMEZcXHUwQTEwXFx1MEExMy1cXHUwQTI4XFx1MEEyQS1cXHUwQTMwXFx1MEEzMlxcdTBBMzNcXHUwQTM1XFx1MEEzNlxcdTBBMzhcXHUwQTM5XFx1MEEzQ1xcdTBBM0UtXFx1MEE0MlxcdTBBNDdcXHUwQTQ4XFx1MEE0Qi1cXHUwQTREXFx1MEE1MVxcdTBBNTktXFx1MEE1Q1xcdTBBNUVcXHUwQTY2LVxcdTBBNzVcXHUwQTgxLVxcdTBBODNcXHUwQTg1LVxcdTBBOERcXHUwQThGLVxcdTBBOTFcXHUwQTkzLVxcdTBBQThcXHUwQUFBLVxcdTBBQjBcXHUwQUIyXFx1MEFCM1xcdTBBQjUtXFx1MEFCOVxcdTBBQkMtXFx1MEFDNVxcdTBBQzctXFx1MEFDOVxcdTBBQ0ItXFx1MEFDRFxcdTBBRDBcXHUwQUUwLVxcdTBBRTNcXHUwQUU2LVxcdTBBRUZcXHUwQjAxLVxcdTBCMDNcXHUwQjA1LVxcdTBCMENcXHUwQjBGXFx1MEIxMFxcdTBCMTMtXFx1MEIyOFxcdTBCMkEtXFx1MEIzMFxcdTBCMzJcXHUwQjMzXFx1MEIzNS1cXHUwQjM5XFx1MEIzQy1cXHUwQjQ0XFx1MEI0N1xcdTBCNDhcXHUwQjRCLVxcdTBCNERcXHUwQjU2XFx1MEI1N1xcdTBCNUNcXHUwQjVEXFx1MEI1Ri1cXHUwQjYzXFx1MEI2Ni1cXHUwQjZGXFx1MEI3MVxcdTBCODJcXHUwQjgzXFx1MEI4NS1cXHUwQjhBXFx1MEI4RS1cXHUwQjkwXFx1MEI5Mi1cXHUwQjk1XFx1MEI5OVxcdTBCOUFcXHUwQjlDXFx1MEI5RVxcdTBCOUZcXHUwQkEzXFx1MEJBNFxcdTBCQTgtXFx1MEJBQVxcdTBCQUUtXFx1MEJCOVxcdTBCQkUtXFx1MEJDMlxcdTBCQzYtXFx1MEJDOFxcdTBCQ0EtXFx1MEJDRFxcdTBCRDBcXHUwQkQ3XFx1MEJFNi1cXHUwQkVGXFx1MEMwMC1cXHUwQzAzXFx1MEMwNS1cXHUwQzBDXFx1MEMwRS1cXHUwQzEwXFx1MEMxMi1cXHUwQzI4XFx1MEMyQS1cXHUwQzM5XFx1MEMzRC1cXHUwQzQ0XFx1MEM0Ni1cXHUwQzQ4XFx1MEM0QS1cXHUwQzREXFx1MEM1NVxcdTBDNTZcXHUwQzU4XFx1MEM1OVxcdTBDNjAtXFx1MEM2M1xcdTBDNjYtXFx1MEM2RlxcdTBDODEtXFx1MEM4M1xcdTBDODUtXFx1MEM4Q1xcdTBDOEUtXFx1MEM5MFxcdTBDOTItXFx1MENBOFxcdTBDQUEtXFx1MENCM1xcdTBDQjUtXFx1MENCOVxcdTBDQkMtXFx1MENDNFxcdTBDQzYtXFx1MENDOFxcdTBDQ0EtXFx1MENDRFxcdTBDRDVcXHUwQ0Q2XFx1MENERVxcdTBDRTAtXFx1MENFM1xcdTBDRTYtXFx1MENFRlxcdTBDRjFcXHUwQ0YyXFx1MEQwMS1cXHUwRDAzXFx1MEQwNS1cXHUwRDBDXFx1MEQwRS1cXHUwRDEwXFx1MEQxMi1cXHUwRDNBXFx1MEQzRC1cXHUwRDQ0XFx1MEQ0Ni1cXHUwRDQ4XFx1MEQ0QS1cXHUwRDRFXFx1MEQ1N1xcdTBENjAtXFx1MEQ2M1xcdTBENjYtXFx1MEQ2RlxcdTBEN0EtXFx1MEQ3RlxcdTBEODJcXHUwRDgzXFx1MEQ4NS1cXHUwRDk2XFx1MEQ5QS1cXHUwREIxXFx1MERCMy1cXHUwREJCXFx1MERCRFxcdTBEQzAtXFx1MERDNlxcdTBEQ0FcXHUwRENGLVxcdTBERDRcXHUwREQ2XFx1MEREOC1cXHUwRERGXFx1MERFNi1cXHUwREVGXFx1MERGMlxcdTBERjNcXHUwRTAxLVxcdTBFM0FcXHUwRTQwLVxcdTBFNEVcXHUwRTUwLVxcdTBFNTlcXHUwRTgxXFx1MEU4MlxcdTBFODRcXHUwRTg3XFx1MEU4OFxcdTBFOEFcXHUwRThEXFx1MEU5NC1cXHUwRTk3XFx1MEU5OS1cXHUwRTlGXFx1MEVBMS1cXHUwRUEzXFx1MEVBNVxcdTBFQTdcXHUwRUFBXFx1MEVBQlxcdTBFQUQtXFx1MEVCOVxcdTBFQkItXFx1MEVCRFxcdTBFQzAtXFx1MEVDNFxcdTBFQzZcXHUwRUM4LVxcdTBFQ0RcXHUwRUQwLVxcdTBFRDlcXHUwRURDLVxcdTBFREZcXHUwRjAwXFx1MEYxOFxcdTBGMTlcXHUwRjIwLVxcdTBGMjlcXHUwRjM1XFx1MEYzN1xcdTBGMzlcXHUwRjNFLVxcdTBGNDdcXHUwRjQ5LVxcdTBGNkNcXHUwRjcxLVxcdTBGODRcXHUwRjg2LVxcdTBGOTdcXHUwRjk5LVxcdTBGQkNcXHUwRkM2XFx1MTAwMC1cXHUxMDQ5XFx1MTA1MC1cXHUxMDlEXFx1MTBBMC1cXHUxMEM1XFx1MTBDN1xcdTEwQ0RcXHUxMEQwLVxcdTEwRkFcXHUxMEZDLVxcdTEyNDhcXHUxMjRBLVxcdTEyNERcXHUxMjUwLVxcdTEyNTZcXHUxMjU4XFx1MTI1QS1cXHUxMjVEXFx1MTI2MC1cXHUxMjg4XFx1MTI4QS1cXHUxMjhEXFx1MTI5MC1cXHUxMkIwXFx1MTJCMi1cXHUxMkI1XFx1MTJCOC1cXHUxMkJFXFx1MTJDMFxcdTEyQzItXFx1MTJDNVxcdTEyQzgtXFx1MTJENlxcdTEyRDgtXFx1MTMxMFxcdTEzMTItXFx1MTMxNVxcdTEzMTgtXFx1MTM1QVxcdTEzNUQtXFx1MTM1RlxcdTEzODAtXFx1MTM4RlxcdTEzQTAtXFx1MTNGNFxcdTE0MDEtXFx1MTY2Q1xcdTE2NkYtXFx1MTY3RlxcdTE2ODEtXFx1MTY5QVxcdTE2QTAtXFx1MTZFQVxcdTE2RUUtXFx1MTZGOFxcdTE3MDAtXFx1MTcwQ1xcdTE3MEUtXFx1MTcxNFxcdTE3MjAtXFx1MTczNFxcdTE3NDAtXFx1MTc1M1xcdTE3NjAtXFx1MTc2Q1xcdTE3NkUtXFx1MTc3MFxcdTE3NzJcXHUxNzczXFx1MTc4MC1cXHUxN0QzXFx1MTdEN1xcdTE3RENcXHUxN0REXFx1MTdFMC1cXHUxN0U5XFx1MTgwQi1cXHUxODBEXFx1MTgxMC1cXHUxODE5XFx1MTgyMC1cXHUxODc3XFx1MTg4MC1cXHUxOEFBXFx1MThCMC1cXHUxOEY1XFx1MTkwMC1cXHUxOTFFXFx1MTkyMC1cXHUxOTJCXFx1MTkzMC1cXHUxOTNCXFx1MTk0Ni1cXHUxOTZEXFx1MTk3MC1cXHUxOTc0XFx1MTk4MC1cXHUxOUFCXFx1MTlCMC1cXHUxOUM5XFx1MTlEMC1cXHUxOUQ5XFx1MUEwMC1cXHUxQTFCXFx1MUEyMC1cXHUxQTVFXFx1MUE2MC1cXHUxQTdDXFx1MUE3Ri1cXHUxQTg5XFx1MUE5MC1cXHUxQTk5XFx1MUFBN1xcdTFBQjAtXFx1MUFCRFxcdTFCMDAtXFx1MUI0QlxcdTFCNTAtXFx1MUI1OVxcdTFCNkItXFx1MUI3M1xcdTFCODAtXFx1MUJGM1xcdTFDMDAtXFx1MUMzN1xcdTFDNDAtXFx1MUM0OVxcdTFDNEQtXFx1MUM3RFxcdTFDRDAtXFx1MUNEMlxcdTFDRDQtXFx1MUNGNlxcdTFDRjhcXHUxQ0Y5XFx1MUQwMC1cXHUxREY1XFx1MURGQy1cXHUxRjE1XFx1MUYxOC1cXHUxRjFEXFx1MUYyMC1cXHUxRjQ1XFx1MUY0OC1cXHUxRjREXFx1MUY1MC1cXHUxRjU3XFx1MUY1OVxcdTFGNUJcXHUxRjVEXFx1MUY1Ri1cXHUxRjdEXFx1MUY4MC1cXHUxRkI0XFx1MUZCNi1cXHUxRkJDXFx1MUZCRVxcdTFGQzItXFx1MUZDNFxcdTFGQzYtXFx1MUZDQ1xcdTFGRDAtXFx1MUZEM1xcdTFGRDYtXFx1MUZEQlxcdTFGRTAtXFx1MUZFQ1xcdTFGRjItXFx1MUZGNFxcdTFGRjYtXFx1MUZGQ1xcdTIwMENcXHUyMDBEXFx1MjAzRlxcdTIwNDBcXHUyMDU0XFx1MjA3MVxcdTIwN0ZcXHUyMDkwLVxcdTIwOUNcXHUyMEQwLVxcdTIwRENcXHUyMEUxXFx1MjBFNS1cXHUyMEYwXFx1MjEwMlxcdTIxMDdcXHUyMTBBLVxcdTIxMTNcXHUyMTE1XFx1MjExOS1cXHUyMTFEXFx1MjEyNFxcdTIxMjZcXHUyMTI4XFx1MjEyQS1cXHUyMTJEXFx1MjEyRi1cXHUyMTM5XFx1MjEzQy1cXHUyMTNGXFx1MjE0NS1cXHUyMTQ5XFx1MjE0RVxcdTIxNjAtXFx1MjE4OFxcdTJDMDAtXFx1MkMyRVxcdTJDMzAtXFx1MkM1RVxcdTJDNjAtXFx1MkNFNFxcdTJDRUItXFx1MkNGM1xcdTJEMDAtXFx1MkQyNVxcdTJEMjdcXHUyRDJEXFx1MkQzMC1cXHUyRDY3XFx1MkQ2RlxcdTJEN0YtXFx1MkQ5NlxcdTJEQTAtXFx1MkRBNlxcdTJEQTgtXFx1MkRBRVxcdTJEQjAtXFx1MkRCNlxcdTJEQjgtXFx1MkRCRVxcdTJEQzAtXFx1MkRDNlxcdTJEQzgtXFx1MkRDRVxcdTJERDAtXFx1MkRENlxcdTJERDgtXFx1MkRERVxcdTJERTAtXFx1MkRGRlxcdTJFMkZcXHUzMDA1LVxcdTMwMDdcXHUzMDIxLVxcdTMwMkZcXHUzMDMxLVxcdTMwMzVcXHUzMDM4LVxcdTMwM0NcXHUzMDQxLVxcdTMwOTZcXHUzMDk5XFx1MzA5QVxcdTMwOUQtXFx1MzA5RlxcdTMwQTEtXFx1MzBGQVxcdTMwRkMtXFx1MzBGRlxcdTMxMDUtXFx1MzEyRFxcdTMxMzEtXFx1MzE4RVxcdTMxQTAtXFx1MzFCQVxcdTMxRjAtXFx1MzFGRlxcdTM0MDAtXFx1NERCNVxcdTRFMDAtXFx1OUZDQ1xcdUEwMDAtXFx1QTQ4Q1xcdUE0RDAtXFx1QTRGRFxcdUE1MDAtXFx1QTYwQ1xcdUE2MTAtXFx1QTYyQlxcdUE2NDAtXFx1QTY2RlxcdUE2NzQtXFx1QTY3RFxcdUE2N0YtXFx1QTY5RFxcdUE2OUYtXFx1QTZGMVxcdUE3MTctXFx1QTcxRlxcdUE3MjItXFx1QTc4OFxcdUE3OEItXFx1QTc4RVxcdUE3OTAtXFx1QTdBRFxcdUE3QjBcXHVBN0IxXFx1QTdGNy1cXHVBODI3XFx1QTg0MC1cXHVBODczXFx1QTg4MC1cXHVBOEM0XFx1QThEMC1cXHVBOEQ5XFx1QThFMC1cXHVBOEY3XFx1QThGQlxcdUE5MDAtXFx1QTkyRFxcdUE5MzAtXFx1QTk1M1xcdUE5NjAtXFx1QTk3Q1xcdUE5ODAtXFx1QTlDMFxcdUE5Q0YtXFx1QTlEOVxcdUE5RTAtXFx1QTlGRVxcdUFBMDAtXFx1QUEzNlxcdUFBNDAtXFx1QUE0RFxcdUFBNTAtXFx1QUE1OVxcdUFBNjAtXFx1QUE3NlxcdUFBN0EtXFx1QUFDMlxcdUFBREItXFx1QUFERFxcdUFBRTAtXFx1QUFFRlxcdUFBRjItXFx1QUFGNlxcdUFCMDEtXFx1QUIwNlxcdUFCMDktXFx1QUIwRVxcdUFCMTEtXFx1QUIxNlxcdUFCMjAtXFx1QUIyNlxcdUFCMjgtXFx1QUIyRVxcdUFCMzAtXFx1QUI1QVxcdUFCNUMtXFx1QUI1RlxcdUFCNjRcXHVBQjY1XFx1QUJDMC1cXHVBQkVBXFx1QUJFQ1xcdUFCRURcXHVBQkYwLVxcdUFCRjlcXHVBQzAwLVxcdUQ3QTNcXHVEN0IwLVxcdUQ3QzZcXHVEN0NCLVxcdUQ3RkJcXHVGOTAwLVxcdUZBNkRcXHVGQTcwLVxcdUZBRDlcXHVGQjAwLVxcdUZCMDZcXHVGQjEzLVxcdUZCMTdcXHVGQjFELVxcdUZCMjhcXHVGQjJBLVxcdUZCMzZcXHVGQjM4LVxcdUZCM0NcXHVGQjNFXFx1RkI0MFxcdUZCNDFcXHVGQjQzXFx1RkI0NFxcdUZCNDYtXFx1RkJCMVxcdUZCRDMtXFx1RkQzRFxcdUZENTAtXFx1RkQ4RlxcdUZEOTItXFx1RkRDN1xcdUZERjAtXFx1RkRGQlxcdUZFMDAtXFx1RkUwRlxcdUZFMjAtXFx1RkUyRFxcdUZFMzNcXHVGRTM0XFx1RkU0RC1cXHVGRTRGXFx1RkU3MC1cXHVGRTc0XFx1RkU3Ni1cXHVGRUZDXFx1RkYxMC1cXHVGRjE5XFx1RkYyMS1cXHVGRjNBXFx1RkYzRlxcdUZGNDEtXFx1RkY1QVxcdUZGNjYtXFx1RkZCRVxcdUZGQzItXFx1RkZDN1xcdUZGQ0EtXFx1RkZDRlxcdUZGRDItXFx1RkZEN1xcdUZGREEtXFx1RkZEQ10pKiQvO1xuICAgICAgICAgICAgaWYgKGtleVBhdGgubGVuZ3RoID49IDEgJiYgdmFsaWRJZGVudGlmaWVyUmVnZXgudGVzdChrZXlQYXRoKSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgU3ludGF4RXJyb3IoZXJyLm1lc3NhZ2UpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChrZXlQYXRoLmluZGV4T2YoXCIgXCIpID49IDApIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBTeW50YXhFcnJvcihcIlRoZSBrZXlwYXRoIGFyZ3VtZW50IGNvbnRhaW5zIGFuIGludmFsaWQga2V5IHBhdGggKG5vIHNwYWNlcyBhbGxvd2VkKS5cIik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYgKEFycmF5LmlzQXJyYXkoa2V5UGF0aCkgJiYga2V5UGF0aC5sZW5ndGggPiAwKSB7XG4gICAgICAgIGlmIChwYXJlbnQpIHtcbiAgICAgICAgICAgIC8vIE5vIG5lc3RlZCBhcnJheXNcbiAgICAgICAgICAgIHRocm93IG5ldyBTeW50YXhFcnJvcihcIlRoZSBrZXlwYXRoIGFyZ3VtZW50IGNvbnRhaW5zIGFuIGludmFsaWQga2V5IHBhdGggKG5lc3RlZCBhcnJheXMpLlwiKTtcbiAgICAgICAgfVxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgZm9yICh2YXIga2V5UGF0aF8xID0gX192YWx1ZXMoa2V5UGF0aCksIGtleVBhdGhfMV8xID0ga2V5UGF0aF8xLm5leHQoKTsgIWtleVBhdGhfMV8xLmRvbmU7IGtleVBhdGhfMV8xID0ga2V5UGF0aF8xLm5leHQoKSkge1xuICAgICAgICAgICAgICAgIHZhciBwYXJ0ID0ga2V5UGF0aF8xXzEudmFsdWU7XG4gICAgICAgICAgICAgICAgdmFsaWRhdGVLZXlQYXRoKHBhcnQsIFwiYXJyYXlcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVfMV8xKSB7IGVfMSA9IHsgZXJyb3I6IGVfMV8xIH07IH1cbiAgICAgICAgZmluYWxseSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGlmIChrZXlQYXRoXzFfMSAmJiAha2V5UGF0aF8xXzEuZG9uZSAmJiAoX2EgPSBrZXlQYXRoXzEucmV0dXJuKSkgX2EuY2FsbChrZXlQYXRoXzEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZmluYWxseSB7IGlmIChlXzEpIHRocm93IGVfMS5lcnJvcjsgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZWxzZSBpZiAodHlwZW9mIGtleVBhdGggPT09IFwic3RyaW5nXCIgJiYga2V5UGF0aC5pbmRleE9mKFwiLlwiKSA+PSAwKSB7XG4gICAgICAgIGtleVBhdGggPSBrZXlQYXRoLnNwbGl0KFwiLlwiKTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGZvciAodmFyIGtleVBhdGhfMiA9IF9fdmFsdWVzKGtleVBhdGgpLCBrZXlQYXRoXzJfMSA9IGtleVBhdGhfMi5uZXh0KCk7ICFrZXlQYXRoXzJfMS5kb25lOyBrZXlQYXRoXzJfMSA9IGtleVBhdGhfMi5uZXh0KCkpIHtcbiAgICAgICAgICAgICAgICB2YXIgcGFydCA9IGtleVBhdGhfMl8xLnZhbHVlO1xuICAgICAgICAgICAgICAgIHZhbGlkYXRlS2V5UGF0aChwYXJ0LCBcInN0cmluZ1wiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZV8yXzEpIHsgZV8yID0geyBlcnJvcjogZV8yXzEgfTsgfVxuICAgICAgICBmaW5hbGx5IHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgaWYgKGtleVBhdGhfMl8xICYmICFrZXlQYXRoXzJfMS5kb25lICYmIChfYiA9IGtleVBhdGhfMi5yZXR1cm4pKSBfYi5jYWxsKGtleVBhdGhfMik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmaW5hbGx5IHsgaWYgKGVfMikgdGhyb3cgZV8yLmVycm9yOyB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aHJvdyBuZXcgU3ludGF4RXJyb3IoKTtcbn07XG5leHBvcnRzLmRlZmF1bHQgPSB2YWxpZGF0ZUtleVBhdGg7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9mYWtlLWluZGV4ZWRkYi9idWlsZC9saWIvdmFsaWRhdGVLZXlQYXRoLmpzXG4vLyBtb2R1bGUgaWQgPSA0MVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcbiAgICAgICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcbiAgICAgICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xuICAgICAgICByZXR1cm4gZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICB9O1xuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xuICAgIH07XG59KSgpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIEZEQlJlcXVlc3RfMSA9IHJlcXVpcmUoXCIuL0ZEQlJlcXVlc3RcIik7XG52YXIgRkRCT3BlbkRCUmVxdWVzdCA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoRkRCT3BlbkRCUmVxdWVzdCwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBGREJPcGVuREJSZXF1ZXN0KCkge1xuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIgIT09IG51bGwgJiYgX3N1cGVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgfHwgdGhpcztcbiAgICAgICAgX3RoaXMub251cGdyYWRlbmVlZGVkID0gbnVsbDtcbiAgICAgICAgX3RoaXMub25ibG9ja2VkID0gbnVsbDtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICBGREJPcGVuREJSZXF1ZXN0LnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIFwiW29iamVjdCBJREJPcGVuREJSZXF1ZXN0XVwiO1xuICAgIH07XG4gICAgcmV0dXJuIEZEQk9wZW5EQlJlcXVlc3Q7XG59KEZEQlJlcXVlc3RfMS5kZWZhdWx0KSk7XG5leHBvcnRzLmRlZmF1bHQgPSBGREJPcGVuREJSZXF1ZXN0O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvZmFrZS1pbmRleGVkZGIvYnVpbGQvRkRCT3BlbkRCUmVxdWVzdC5qc1xuLy8gbW9kdWxlIGlkID0gNDJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XG4gICAgICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XG4gICAgICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcbiAgICAgICAgcmV0dXJuIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgfTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbiAgICB9O1xufSkoKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBGYWtlRXZlbnRfMSA9IHJlcXVpcmUoXCIuL2xpYi9GYWtlRXZlbnRcIik7XG52YXIgRkRCVmVyc2lvbkNoYW5nZUV2ZW50ID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhGREJWZXJzaW9uQ2hhbmdlRXZlbnQsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gRkRCVmVyc2lvbkNoYW5nZUV2ZW50KHR5cGUsIHBhcmFtZXRlcnMpIHtcbiAgICAgICAgaWYgKHBhcmFtZXRlcnMgPT09IHZvaWQgMCkgeyBwYXJhbWV0ZXJzID0ge307IH1cbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcywgdHlwZSkgfHwgdGhpcztcbiAgICAgICAgX3RoaXMubmV3VmVyc2lvbiA9XG4gICAgICAgICAgICBwYXJhbWV0ZXJzLm5ld1ZlcnNpb24gIT09IHVuZGVmaW5lZCA/IHBhcmFtZXRlcnMubmV3VmVyc2lvbiA6IG51bGw7XG4gICAgICAgIF90aGlzLm9sZFZlcnNpb24gPVxuICAgICAgICAgICAgcGFyYW1ldGVycy5vbGRWZXJzaW9uICE9PSB1bmRlZmluZWQgPyBwYXJhbWV0ZXJzLm9sZFZlcnNpb24gOiAwO1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIEZEQlZlcnNpb25DaGFuZ2VFdmVudC5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBcIltvYmplY3QgSURCVmVyc2lvbkNoYW5nZUV2ZW50XVwiO1xuICAgIH07XG4gICAgcmV0dXJuIEZEQlZlcnNpb25DaGFuZ2VFdmVudDtcbn0oRmFrZUV2ZW50XzEuZGVmYXVsdCkpO1xuZXhwb3J0cy5kZWZhdWx0ID0gRkRCVmVyc2lvbkNoYW5nZUV2ZW50O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvZmFrZS1pbmRleGVkZGIvYnVpbGQvRkRCVmVyc2lvbkNoYW5nZUV2ZW50LmpzXG4vLyBtb2R1bGUgaWQgPSA0M1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgZmFrZUluZGV4ZWREQiA9IHJlcXVpcmUoXCIuL2J1aWxkL2Zha2VJbmRleGVkREJcIikuZGVmYXVsdDtcbnZhciBGREJDdXJzb3IgPSByZXF1aXJlKFwiLi9idWlsZC9GREJDdXJzb3JcIikuZGVmYXVsdDtcbnZhciBGREJDdXJzb3JXaXRoVmFsdWUgPSByZXF1aXJlKFwiLi9idWlsZC9GREJDdXJzb3JXaXRoVmFsdWVcIikuZGVmYXVsdDtcbnZhciBGREJEYXRhYmFzZSA9IHJlcXVpcmUoXCIuL2J1aWxkL0ZEQkRhdGFiYXNlXCIpLmRlZmF1bHQ7XG52YXIgRkRCRmFjdG9yeSA9IHJlcXVpcmUoXCIuL2J1aWxkL0ZEQkZhY3RvcnlcIikuZGVmYXVsdDtcbnZhciBGREJJbmRleCA9IHJlcXVpcmUoXCIuL2J1aWxkL0ZEQkluZGV4XCIpLmRlZmF1bHQ7XG52YXIgRkRCS2V5UmFuZ2UgPSByZXF1aXJlKFwiLi9idWlsZC9GREJLZXlSYW5nZVwiKS5kZWZhdWx0O1xudmFyIEZEQk9iamVjdFN0b3JlID0gcmVxdWlyZShcIi4vYnVpbGQvRkRCT2JqZWN0U3RvcmVcIikuZGVmYXVsdDtcbnZhciBGREJPcGVuREJSZXF1ZXN0ID0gcmVxdWlyZShcIi4vYnVpbGQvRkRCT3BlbkRCUmVxdWVzdFwiKS5kZWZhdWx0O1xudmFyIEZEQlJlcXVlc3QgPSByZXF1aXJlKFwiLi9idWlsZC9GREJSZXF1ZXN0XCIpLmRlZmF1bHQ7XG52YXIgRkRCVHJhbnNhY3Rpb24gPSByZXF1aXJlKFwiLi9idWlsZC9GREJUcmFuc2FjdGlvblwiKS5kZWZhdWx0O1xudmFyIEZEQlZlcnNpb25DaGFuZ2VFdmVudCA9IHJlcXVpcmUoXCIuL2J1aWxkL0ZEQlZlcnNpb25DaGFuZ2VFdmVudFwiKS5kZWZhdWx0O1xuXG4vLyBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8zMzI2ODMyNi83ODY2NDQgLSB3b3JrcyBpbiBicm93c2VyLCB3b3JrZXIsIGFuZCBOb2RlLmpzXG52YXIgZ2xvYmFsVmFyID1cbiAgICB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiXG4gICAgICAgID8gd2luZG93XG4gICAgICAgIDogdHlwZW9mIFdvcmtlckdsb2JhbFNjb3BlICE9PSBcInVuZGVmaW5lZFwiXG4gICAgICAgID8gc2VsZlxuICAgICAgICA6IHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCJcbiAgICAgICAgPyBnbG9iYWxcbiAgICAgICAgOiBGdW5jdGlvbihcInJldHVybiB0aGlzO1wiKSgpO1xuXG5nbG9iYWxWYXIuaW5kZXhlZERCID0gZmFrZUluZGV4ZWREQjtcbmdsb2JhbFZhci5JREJDdXJzb3IgPSBGREJDdXJzb3I7XG5nbG9iYWxWYXIuSURCQ3Vyc29yV2l0aFZhbHVlID0gRkRCQ3Vyc29yV2l0aFZhbHVlO1xuZ2xvYmFsVmFyLklEQkRhdGFiYXNlID0gRkRCRGF0YWJhc2U7XG5nbG9iYWxWYXIuSURCRmFjdG9yeSA9IEZEQkZhY3Rvcnk7XG5nbG9iYWxWYXIuSURCSW5kZXggPSBGREJJbmRleDtcbmdsb2JhbFZhci5JREJLZXlSYW5nZSA9IEZEQktleVJhbmdlO1xuZ2xvYmFsVmFyLklEQk9iamVjdFN0b3JlID0gRkRCT2JqZWN0U3RvcmU7XG5nbG9iYWxWYXIuSURCT3BlbkRCUmVxdWVzdCA9IEZEQk9wZW5EQlJlcXVlc3Q7XG5nbG9iYWxWYXIuSURCUmVxdWVzdCA9IEZEQlJlcXVlc3Q7XG5nbG9iYWxWYXIuSURCVHJhbnNhY3Rpb24gPSBGREJUcmFuc2FjdGlvbjtcbmdsb2JhbFZhci5JREJWZXJzaW9uQ2hhbmdlRXZlbnQgPSBGREJWZXJzaW9uQ2hhbmdlRXZlbnQ7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9mYWtlLWluZGV4ZWRkYi9hdXRvLmpzXG4vLyBtb2R1bGUgaWQgPSA0NFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBGREJGYWN0b3J5XzEgPSByZXF1aXJlKFwiLi9GREJGYWN0b3J5XCIpO1xudmFyIGZha2VJbmRleGVkREIgPSBuZXcgRkRCRmFjdG9yeV8xLmRlZmF1bHQoKTtcbmV4cG9ydHMuZGVmYXVsdCA9IGZha2VJbmRleGVkREI7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9mYWtlLWluZGV4ZWRkYi9idWlsZC9mYWtlSW5kZXhlZERCLmpzXG4vLyBtb2R1bGUgaWQgPSA0NVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIoZnVuY3Rpb24gKGdsb2JhbCwgdW5kZWZpbmVkKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICBpZiAoZ2xvYmFsLnNldEltbWVkaWF0ZSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdmFyIG5leHRIYW5kbGUgPSAxOyAvLyBTcGVjIHNheXMgZ3JlYXRlciB0aGFuIHplcm9cbiAgICB2YXIgdGFza3NCeUhhbmRsZSA9IHt9O1xuICAgIHZhciBjdXJyZW50bHlSdW5uaW5nQVRhc2sgPSBmYWxzZTtcbiAgICB2YXIgZG9jID0gZ2xvYmFsLmRvY3VtZW50O1xuICAgIHZhciByZWdpc3RlckltbWVkaWF0ZTtcblxuICAgIGZ1bmN0aW9uIHNldEltbWVkaWF0ZShjYWxsYmFjaykge1xuICAgICAgLy8gQ2FsbGJhY2sgY2FuIGVpdGhlciBiZSBhIGZ1bmN0aW9uIG9yIGEgc3RyaW5nXG4gICAgICBpZiAodHlwZW9mIGNhbGxiYWNrICE9PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgY2FsbGJhY2sgPSBuZXcgRnVuY3Rpb24oXCJcIiArIGNhbGxiYWNrKTtcbiAgICAgIH1cbiAgICAgIC8vIENvcHkgZnVuY3Rpb24gYXJndW1lbnRzXG4gICAgICB2YXIgYXJncyA9IG5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoIC0gMSk7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyZ3MubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBhcmdzW2ldID0gYXJndW1lbnRzW2kgKyAxXTtcbiAgICAgIH1cbiAgICAgIC8vIFN0b3JlIGFuZCByZWdpc3RlciB0aGUgdGFza1xuICAgICAgdmFyIHRhc2sgPSB7IGNhbGxiYWNrOiBjYWxsYmFjaywgYXJnczogYXJncyB9O1xuICAgICAgdGFza3NCeUhhbmRsZVtuZXh0SGFuZGxlXSA9IHRhc2s7XG4gICAgICByZWdpc3RlckltbWVkaWF0ZShuZXh0SGFuZGxlKTtcbiAgICAgIHJldHVybiBuZXh0SGFuZGxlKys7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2xlYXJJbW1lZGlhdGUoaGFuZGxlKSB7XG4gICAgICAgIGRlbGV0ZSB0YXNrc0J5SGFuZGxlW2hhbmRsZV07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcnVuKHRhc2spIHtcbiAgICAgICAgdmFyIGNhbGxiYWNrID0gdGFzay5jYWxsYmFjaztcbiAgICAgICAgdmFyIGFyZ3MgPSB0YXNrLmFyZ3M7XG4gICAgICAgIHN3aXRjaCAoYXJncy5sZW5ndGgpIHtcbiAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgY2FsbGJhY2soKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICBjYWxsYmFjayhhcmdzWzBdKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICBjYWxsYmFjayhhcmdzWzBdLCBhcmdzWzFdKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICBjYWxsYmFjayhhcmdzWzBdLCBhcmdzWzFdLCBhcmdzWzJdKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgY2FsbGJhY2suYXBwbHkodW5kZWZpbmVkLCBhcmdzKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcnVuSWZQcmVzZW50KGhhbmRsZSkge1xuICAgICAgICAvLyBGcm9tIHRoZSBzcGVjOiBcIldhaXQgdW50aWwgYW55IGludm9jYXRpb25zIG9mIHRoaXMgYWxnb3JpdGhtIHN0YXJ0ZWQgYmVmb3JlIHRoaXMgb25lIGhhdmUgY29tcGxldGVkLlwiXG4gICAgICAgIC8vIFNvIGlmIHdlJ3JlIGN1cnJlbnRseSBydW5uaW5nIGEgdGFzaywgd2UnbGwgbmVlZCB0byBkZWxheSB0aGlzIGludm9jYXRpb24uXG4gICAgICAgIGlmIChjdXJyZW50bHlSdW5uaW5nQVRhc2spIHtcbiAgICAgICAgICAgIC8vIERlbGF5IGJ5IGRvaW5nIGEgc2V0VGltZW91dC4gc2V0SW1tZWRpYXRlIHdhcyB0cmllZCBpbnN0ZWFkLCBidXQgaW4gRmlyZWZveCA3IGl0IGdlbmVyYXRlZCBhXG4gICAgICAgICAgICAvLyBcInRvbyBtdWNoIHJlY3Vyc2lvblwiIGVycm9yLlxuICAgICAgICAgICAgc2V0VGltZW91dChydW5JZlByZXNlbnQsIDAsIGhhbmRsZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB2YXIgdGFzayA9IHRhc2tzQnlIYW5kbGVbaGFuZGxlXTtcbiAgICAgICAgICAgIGlmICh0YXNrKSB7XG4gICAgICAgICAgICAgICAgY3VycmVudGx5UnVubmluZ0FUYXNrID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICBydW4odGFzayk7XG4gICAgICAgICAgICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgICAgICAgICAgICAgY2xlYXJJbW1lZGlhdGUoaGFuZGxlKTtcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudGx5UnVubmluZ0FUYXNrID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaW5zdGFsbE5leHRUaWNrSW1wbGVtZW50YXRpb24oKSB7XG4gICAgICAgIHJlZ2lzdGVySW1tZWRpYXRlID0gZnVuY3Rpb24oaGFuZGxlKSB7XG4gICAgICAgICAgICBwcm9jZXNzLm5leHRUaWNrKGZ1bmN0aW9uICgpIHsgcnVuSWZQcmVzZW50KGhhbmRsZSk7IH0pO1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNhblVzZVBvc3RNZXNzYWdlKCkge1xuICAgICAgICAvLyBUaGUgdGVzdCBhZ2FpbnN0IGBpbXBvcnRTY3JpcHRzYCBwcmV2ZW50cyB0aGlzIGltcGxlbWVudGF0aW9uIGZyb20gYmVpbmcgaW5zdGFsbGVkIGluc2lkZSBhIHdlYiB3b3JrZXIsXG4gICAgICAgIC8vIHdoZXJlIGBnbG9iYWwucG9zdE1lc3NhZ2VgIG1lYW5zIHNvbWV0aGluZyBjb21wbGV0ZWx5IGRpZmZlcmVudCBhbmQgY2FuJ3QgYmUgdXNlZCBmb3IgdGhpcyBwdXJwb3NlLlxuICAgICAgICBpZiAoZ2xvYmFsLnBvc3RNZXNzYWdlICYmICFnbG9iYWwuaW1wb3J0U2NyaXB0cykge1xuICAgICAgICAgICAgdmFyIHBvc3RNZXNzYWdlSXNBc3luY2hyb25vdXMgPSB0cnVlO1xuICAgICAgICAgICAgdmFyIG9sZE9uTWVzc2FnZSA9IGdsb2JhbC5vbm1lc3NhZ2U7XG4gICAgICAgICAgICBnbG9iYWwub25tZXNzYWdlID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgcG9zdE1lc3NhZ2VJc0FzeW5jaHJvbm91cyA9IGZhbHNlO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGdsb2JhbC5wb3N0TWVzc2FnZShcIlwiLCBcIipcIik7XG4gICAgICAgICAgICBnbG9iYWwub25tZXNzYWdlID0gb2xkT25NZXNzYWdlO1xuICAgICAgICAgICAgcmV0dXJuIHBvc3RNZXNzYWdlSXNBc3luY2hyb25vdXM7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpbnN0YWxsUG9zdE1lc3NhZ2VJbXBsZW1lbnRhdGlvbigpIHtcbiAgICAgICAgLy8gSW5zdGFsbHMgYW4gZXZlbnQgaGFuZGxlciBvbiBgZ2xvYmFsYCBmb3IgdGhlIGBtZXNzYWdlYCBldmVudDogc2VlXG4gICAgICAgIC8vICogaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4vRE9NL3dpbmRvdy5wb3N0TWVzc2FnZVxuICAgICAgICAvLyAqIGh0dHA6Ly93d3cud2hhdHdnLm9yZy9zcGVjcy93ZWItYXBwcy9jdXJyZW50LXdvcmsvbXVsdGlwYWdlL2NvbW1zLmh0bWwjY3Jvc3NEb2N1bWVudE1lc3NhZ2VzXG5cbiAgICAgICAgdmFyIG1lc3NhZ2VQcmVmaXggPSBcInNldEltbWVkaWF0ZSRcIiArIE1hdGgucmFuZG9tKCkgKyBcIiRcIjtcbiAgICAgICAgdmFyIG9uR2xvYmFsTWVzc2FnZSA9IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgICBpZiAoZXZlbnQuc291cmNlID09PSBnbG9iYWwgJiZcbiAgICAgICAgICAgICAgICB0eXBlb2YgZXZlbnQuZGF0YSA9PT0gXCJzdHJpbmdcIiAmJlxuICAgICAgICAgICAgICAgIGV2ZW50LmRhdGEuaW5kZXhPZihtZXNzYWdlUHJlZml4KSA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHJ1bklmUHJlc2VudCgrZXZlbnQuZGF0YS5zbGljZShtZXNzYWdlUHJlZml4Lmxlbmd0aCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIGlmIChnbG9iYWwuYWRkRXZlbnRMaXN0ZW5lcikge1xuICAgICAgICAgICAgZ2xvYmFsLmFkZEV2ZW50TGlzdGVuZXIoXCJtZXNzYWdlXCIsIG9uR2xvYmFsTWVzc2FnZSwgZmFsc2UpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZ2xvYmFsLmF0dGFjaEV2ZW50KFwib25tZXNzYWdlXCIsIG9uR2xvYmFsTWVzc2FnZSk7XG4gICAgICAgIH1cblxuICAgICAgICByZWdpc3RlckltbWVkaWF0ZSA9IGZ1bmN0aW9uKGhhbmRsZSkge1xuICAgICAgICAgICAgZ2xvYmFsLnBvc3RNZXNzYWdlKG1lc3NhZ2VQcmVmaXggKyBoYW5kbGUsIFwiKlwiKTtcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpbnN0YWxsTWVzc2FnZUNoYW5uZWxJbXBsZW1lbnRhdGlvbigpIHtcbiAgICAgICAgdmFyIGNoYW5uZWwgPSBuZXcgTWVzc2FnZUNoYW5uZWwoKTtcbiAgICAgICAgY2hhbm5lbC5wb3J0MS5vbm1lc3NhZ2UgPSBmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgICAgdmFyIGhhbmRsZSA9IGV2ZW50LmRhdGE7XG4gICAgICAgICAgICBydW5JZlByZXNlbnQoaGFuZGxlKTtcbiAgICAgICAgfTtcblxuICAgICAgICByZWdpc3RlckltbWVkaWF0ZSA9IGZ1bmN0aW9uKGhhbmRsZSkge1xuICAgICAgICAgICAgY2hhbm5lbC5wb3J0Mi5wb3N0TWVzc2FnZShoYW5kbGUpO1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGluc3RhbGxSZWFkeVN0YXRlQ2hhbmdlSW1wbGVtZW50YXRpb24oKSB7XG4gICAgICAgIHZhciBodG1sID0gZG9jLmRvY3VtZW50RWxlbWVudDtcbiAgICAgICAgcmVnaXN0ZXJJbW1lZGlhdGUgPSBmdW5jdGlvbihoYW5kbGUpIHtcbiAgICAgICAgICAgIC8vIENyZWF0ZSBhIDxzY3JpcHQ+IGVsZW1lbnQ7IGl0cyByZWFkeXN0YXRlY2hhbmdlIGV2ZW50IHdpbGwgYmUgZmlyZWQgYXN5bmNocm9ub3VzbHkgb25jZSBpdCBpcyBpbnNlcnRlZFxuICAgICAgICAgICAgLy8gaW50byB0aGUgZG9jdW1lbnQuIERvIHNvLCB0aHVzIHF1ZXVpbmcgdXAgdGhlIHRhc2suIFJlbWVtYmVyIHRvIGNsZWFuIHVwIG9uY2UgaXQncyBiZWVuIGNhbGxlZC5cbiAgICAgICAgICAgIHZhciBzY3JpcHQgPSBkb2MuY3JlYXRlRWxlbWVudChcInNjcmlwdFwiKTtcbiAgICAgICAgICAgIHNjcmlwdC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcnVuSWZQcmVzZW50KGhhbmRsZSk7XG4gICAgICAgICAgICAgICAgc2NyaXB0Lm9ucmVhZHlzdGF0ZWNoYW5nZSA9IG51bGw7XG4gICAgICAgICAgICAgICAgaHRtbC5yZW1vdmVDaGlsZChzY3JpcHQpO1xuICAgICAgICAgICAgICAgIHNjcmlwdCA9IG51bGw7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgaHRtbC5hcHBlbmRDaGlsZChzY3JpcHQpO1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGluc3RhbGxTZXRUaW1lb3V0SW1wbGVtZW50YXRpb24oKSB7XG4gICAgICAgIHJlZ2lzdGVySW1tZWRpYXRlID0gZnVuY3Rpb24oaGFuZGxlKSB7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KHJ1bklmUHJlc2VudCwgMCwgaGFuZGxlKTtcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICAvLyBJZiBzdXBwb3J0ZWQsIHdlIHNob3VsZCBhdHRhY2ggdG8gdGhlIHByb3RvdHlwZSBvZiBnbG9iYWwsIHNpbmNlIHRoYXQgaXMgd2hlcmUgc2V0VGltZW91dCBldCBhbC4gbGl2ZS5cbiAgICB2YXIgYXR0YWNoVG8gPSBPYmplY3QuZ2V0UHJvdG90eXBlT2YgJiYgT2JqZWN0LmdldFByb3RvdHlwZU9mKGdsb2JhbCk7XG4gICAgYXR0YWNoVG8gPSBhdHRhY2hUbyAmJiBhdHRhY2hUby5zZXRUaW1lb3V0ID8gYXR0YWNoVG8gOiBnbG9iYWw7XG5cbiAgICAvLyBEb24ndCBnZXQgZm9vbGVkIGJ5IGUuZy4gYnJvd3NlcmlmeSBlbnZpcm9ubWVudHMuXG4gICAgaWYgKHt9LnRvU3RyaW5nLmNhbGwoZ2xvYmFsLnByb2Nlc3MpID09PSBcIltvYmplY3QgcHJvY2Vzc11cIikge1xuICAgICAgICAvLyBGb3IgTm9kZS5qcyBiZWZvcmUgMC45XG4gICAgICAgIGluc3RhbGxOZXh0VGlja0ltcGxlbWVudGF0aW9uKCk7XG5cbiAgICB9IGVsc2UgaWYgKGNhblVzZVBvc3RNZXNzYWdlKCkpIHtcbiAgICAgICAgLy8gRm9yIG5vbi1JRTEwIG1vZGVybiBicm93c2Vyc1xuICAgICAgICBpbnN0YWxsUG9zdE1lc3NhZ2VJbXBsZW1lbnRhdGlvbigpO1xuXG4gICAgfSBlbHNlIGlmIChnbG9iYWwuTWVzc2FnZUNoYW5uZWwpIHtcbiAgICAgICAgLy8gRm9yIHdlYiB3b3JrZXJzLCB3aGVyZSBzdXBwb3J0ZWRcbiAgICAgICAgaW5zdGFsbE1lc3NhZ2VDaGFubmVsSW1wbGVtZW50YXRpb24oKTtcblxuICAgIH0gZWxzZSBpZiAoZG9jICYmIFwib25yZWFkeXN0YXRlY2hhbmdlXCIgaW4gZG9jLmNyZWF0ZUVsZW1lbnQoXCJzY3JpcHRcIikpIHtcbiAgICAgICAgLy8gRm9yIElFIDbigJM4XG4gICAgICAgIGluc3RhbGxSZWFkeVN0YXRlQ2hhbmdlSW1wbGVtZW50YXRpb24oKTtcblxuICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIEZvciBvbGRlciBicm93c2Vyc1xuICAgICAgICBpbnN0YWxsU2V0VGltZW91dEltcGxlbWVudGF0aW9uKCk7XG4gICAgfVxuXG4gICAgYXR0YWNoVG8uc2V0SW1tZWRpYXRlID0gc2V0SW1tZWRpYXRlO1xuICAgIGF0dGFjaFRvLmNsZWFySW1tZWRpYXRlID0gY2xlYXJJbW1lZGlhdGU7XG59KHR5cGVvZiBzZWxmID09PSBcInVuZGVmaW5lZFwiID8gdHlwZW9mIGdsb2JhbCA9PT0gXCJ1bmRlZmluZWRcIiA/IHRoaXMgOiBnbG9iYWwgOiBzZWxmKSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAod2VicGFjaykvbm9kZV9tb2R1bGVzL3NldGltbWVkaWF0ZS9zZXRJbW1lZGlhdGUuanNcbi8vIG1vZHVsZSBpZCA9IDQ2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIihmdW5jdGlvbiAoZ2xvYmFsLCB1bmRlZmluZWQpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIGlmIChnbG9iYWwuc2V0SW1tZWRpYXRlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB2YXIgbmV4dEhhbmRsZSA9IDE7IC8vIFNwZWMgc2F5cyBncmVhdGVyIHRoYW4gemVyb1xuICAgIHZhciB0YXNrc0J5SGFuZGxlID0ge307XG4gICAgdmFyIGN1cnJlbnRseVJ1bm5pbmdBVGFzayA9IGZhbHNlO1xuICAgIHZhciBkb2MgPSBnbG9iYWwuZG9jdW1lbnQ7XG4gICAgdmFyIHJlZ2lzdGVySW1tZWRpYXRlO1xuXG4gICAgZnVuY3Rpb24gc2V0SW1tZWRpYXRlKGNhbGxiYWNrKSB7XG4gICAgICAvLyBDYWxsYmFjayBjYW4gZWl0aGVyIGJlIGEgZnVuY3Rpb24gb3IgYSBzdHJpbmdcbiAgICAgIGlmICh0eXBlb2YgY2FsbGJhY2sgIT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICBjYWxsYmFjayA9IG5ldyBGdW5jdGlvbihcIlwiICsgY2FsbGJhY2spO1xuICAgICAgfVxuICAgICAgLy8gQ29weSBmdW5jdGlvbiBhcmd1bWVudHNcbiAgICAgIHZhciBhcmdzID0gbmV3IEFycmF5KGFyZ3VtZW50cy5sZW5ndGggLSAxKTtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJncy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIGFyZ3NbaV0gPSBhcmd1bWVudHNbaSArIDFdO1xuICAgICAgfVxuICAgICAgLy8gU3RvcmUgYW5kIHJlZ2lzdGVyIHRoZSB0YXNrXG4gICAgICB2YXIgdGFzayA9IHsgY2FsbGJhY2s6IGNhbGxiYWNrLCBhcmdzOiBhcmdzIH07XG4gICAgICB0YXNrc0J5SGFuZGxlW25leHRIYW5kbGVdID0gdGFzaztcbiAgICAgIHJlZ2lzdGVySW1tZWRpYXRlKG5leHRIYW5kbGUpO1xuICAgICAgcmV0dXJuIG5leHRIYW5kbGUrKztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjbGVhckltbWVkaWF0ZShoYW5kbGUpIHtcbiAgICAgICAgZGVsZXRlIHRhc2tzQnlIYW5kbGVbaGFuZGxlXTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBydW4odGFzaykge1xuICAgICAgICB2YXIgY2FsbGJhY2sgPSB0YXNrLmNhbGxiYWNrO1xuICAgICAgICB2YXIgYXJncyA9IHRhc2suYXJncztcbiAgICAgICAgc3dpdGNoIChhcmdzLmxlbmd0aCkge1xuICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgIGNhbGxiYWNrKGFyZ3NbMF0pO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgIGNhbGxiYWNrKGFyZ3NbMF0sIGFyZ3NbMV0pO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgIGNhbGxiYWNrKGFyZ3NbMF0sIGFyZ3NbMV0sIGFyZ3NbMl0pO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICBjYWxsYmFjay5hcHBseSh1bmRlZmluZWQsIGFyZ3MpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBydW5JZlByZXNlbnQoaGFuZGxlKSB7XG4gICAgICAgIC8vIEZyb20gdGhlIHNwZWM6IFwiV2FpdCB1bnRpbCBhbnkgaW52b2NhdGlvbnMgb2YgdGhpcyBhbGdvcml0aG0gc3RhcnRlZCBiZWZvcmUgdGhpcyBvbmUgaGF2ZSBjb21wbGV0ZWQuXCJcbiAgICAgICAgLy8gU28gaWYgd2UncmUgY3VycmVudGx5IHJ1bm5pbmcgYSB0YXNrLCB3ZSdsbCBuZWVkIHRvIGRlbGF5IHRoaXMgaW52b2NhdGlvbi5cbiAgICAgICAgaWYgKGN1cnJlbnRseVJ1bm5pbmdBVGFzaykge1xuICAgICAgICAgICAgLy8gRGVsYXkgYnkgZG9pbmcgYSBzZXRUaW1lb3V0LiBzZXRJbW1lZGlhdGUgd2FzIHRyaWVkIGluc3RlYWQsIGJ1dCBpbiBGaXJlZm94IDcgaXQgZ2VuZXJhdGVkIGFcbiAgICAgICAgICAgIC8vIFwidG9vIG11Y2ggcmVjdXJzaW9uXCIgZXJyb3IuXG4gICAgICAgICAgICBzZXRUaW1lb3V0KHJ1bklmUHJlc2VudCwgMCwgaGFuZGxlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHZhciB0YXNrID0gdGFza3NCeUhhbmRsZVtoYW5kbGVdO1xuICAgICAgICAgICAgaWYgKHRhc2spIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50bHlSdW5uaW5nQVRhc2sgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIHJ1bih0YXNrKTtcbiAgICAgICAgICAgICAgICB9IGZpbmFsbHkge1xuICAgICAgICAgICAgICAgICAgICBjbGVhckltbWVkaWF0ZShoYW5kbGUpO1xuICAgICAgICAgICAgICAgICAgICBjdXJyZW50bHlSdW5uaW5nQVRhc2sgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpbnN0YWxsTmV4dFRpY2tJbXBsZW1lbnRhdGlvbigpIHtcbiAgICAgICAgcmVnaXN0ZXJJbW1lZGlhdGUgPSBmdW5jdGlvbihoYW5kbGUpIHtcbiAgICAgICAgICAgIHByb2Nlc3MubmV4dFRpY2soZnVuY3Rpb24gKCkgeyBydW5JZlByZXNlbnQoaGFuZGxlKTsgfSk7XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2FuVXNlUG9zdE1lc3NhZ2UoKSB7XG4gICAgICAgIC8vIFRoZSB0ZXN0IGFnYWluc3QgYGltcG9ydFNjcmlwdHNgIHByZXZlbnRzIHRoaXMgaW1wbGVtZW50YXRpb24gZnJvbSBiZWluZyBpbnN0YWxsZWQgaW5zaWRlIGEgd2ViIHdvcmtlcixcbiAgICAgICAgLy8gd2hlcmUgYGdsb2JhbC5wb3N0TWVzc2FnZWAgbWVhbnMgc29tZXRoaW5nIGNvbXBsZXRlbHkgZGlmZmVyZW50IGFuZCBjYW4ndCBiZSB1c2VkIGZvciB0aGlzIHB1cnBvc2UuXG4gICAgICAgIGlmIChnbG9iYWwucG9zdE1lc3NhZ2UgJiYgIWdsb2JhbC5pbXBvcnRTY3JpcHRzKSB7XG4gICAgICAgICAgICB2YXIgcG9zdE1lc3NhZ2VJc0FzeW5jaHJvbm91cyA9IHRydWU7XG4gICAgICAgICAgICB2YXIgb2xkT25NZXNzYWdlID0gZ2xvYmFsLm9ubWVzc2FnZTtcbiAgICAgICAgICAgIGdsb2JhbC5vbm1lc3NhZ2UgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBwb3N0TWVzc2FnZUlzQXN5bmNocm9ub3VzID0gZmFsc2U7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgZ2xvYmFsLnBvc3RNZXNzYWdlKFwiXCIsIFwiKlwiKTtcbiAgICAgICAgICAgIGdsb2JhbC5vbm1lc3NhZ2UgPSBvbGRPbk1lc3NhZ2U7XG4gICAgICAgICAgICByZXR1cm4gcG9zdE1lc3NhZ2VJc0FzeW5jaHJvbm91cztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGluc3RhbGxQb3N0TWVzc2FnZUltcGxlbWVudGF0aW9uKCkge1xuICAgICAgICAvLyBJbnN0YWxscyBhbiBldmVudCBoYW5kbGVyIG9uIGBnbG9iYWxgIGZvciB0aGUgYG1lc3NhZ2VgIGV2ZW50OiBzZWVcbiAgICAgICAgLy8gKiBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi9ET00vd2luZG93LnBvc3RNZXNzYWdlXG4gICAgICAgIC8vICogaHR0cDovL3d3dy53aGF0d2cub3JnL3NwZWNzL3dlYi1hcHBzL2N1cnJlbnQtd29yay9tdWx0aXBhZ2UvY29tbXMuaHRtbCNjcm9zc0RvY3VtZW50TWVzc2FnZXNcblxuICAgICAgICB2YXIgbWVzc2FnZVByZWZpeCA9IFwic2V0SW1tZWRpYXRlJFwiICsgTWF0aC5yYW5kb20oKSArIFwiJFwiO1xuICAgICAgICB2YXIgb25HbG9iYWxNZXNzYWdlID0gZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICAgIGlmIChldmVudC5zb3VyY2UgPT09IGdsb2JhbCAmJlxuICAgICAgICAgICAgICAgIHR5cGVvZiBldmVudC5kYXRhID09PSBcInN0cmluZ1wiICYmXG4gICAgICAgICAgICAgICAgZXZlbnQuZGF0YS5pbmRleE9mKG1lc3NhZ2VQcmVmaXgpID09PSAwKSB7XG4gICAgICAgICAgICAgICAgcnVuSWZQcmVzZW50KCtldmVudC5kYXRhLnNsaWNlKG1lc3NhZ2VQcmVmaXgubGVuZ3RoKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKGdsb2JhbC5hZGRFdmVudExpc3RlbmVyKSB7XG4gICAgICAgICAgICBnbG9iYWwuYWRkRXZlbnRMaXN0ZW5lcihcIm1lc3NhZ2VcIiwgb25HbG9iYWxNZXNzYWdlLCBmYWxzZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBnbG9iYWwuYXR0YWNoRXZlbnQoXCJvbm1lc3NhZ2VcIiwgb25HbG9iYWxNZXNzYWdlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJlZ2lzdGVySW1tZWRpYXRlID0gZnVuY3Rpb24oaGFuZGxlKSB7XG4gICAgICAgICAgICBnbG9iYWwucG9zdE1lc3NhZ2UobWVzc2FnZVByZWZpeCArIGhhbmRsZSwgXCIqXCIpO1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGluc3RhbGxNZXNzYWdlQ2hhbm5lbEltcGxlbWVudGF0aW9uKCkge1xuICAgICAgICB2YXIgY2hhbm5lbCA9IG5ldyBNZXNzYWdlQ2hhbm5lbCgpO1xuICAgICAgICBjaGFubmVsLnBvcnQxLm9ubWVzc2FnZSA9IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgICB2YXIgaGFuZGxlID0gZXZlbnQuZGF0YTtcbiAgICAgICAgICAgIHJ1bklmUHJlc2VudChoYW5kbGUpO1xuICAgICAgICB9O1xuXG4gICAgICAgIHJlZ2lzdGVySW1tZWRpYXRlID0gZnVuY3Rpb24oaGFuZGxlKSB7XG4gICAgICAgICAgICBjaGFubmVsLnBvcnQyLnBvc3RNZXNzYWdlKGhhbmRsZSk7XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaW5zdGFsbFJlYWR5U3RhdGVDaGFuZ2VJbXBsZW1lbnRhdGlvbigpIHtcbiAgICAgICAgdmFyIGh0bWwgPSBkb2MuZG9jdW1lbnRFbGVtZW50O1xuICAgICAgICByZWdpc3RlckltbWVkaWF0ZSA9IGZ1bmN0aW9uKGhhbmRsZSkge1xuICAgICAgICAgICAgLy8gQ3JlYXRlIGEgPHNjcmlwdD4gZWxlbWVudDsgaXRzIHJlYWR5c3RhdGVjaGFuZ2UgZXZlbnQgd2lsbCBiZSBmaXJlZCBhc3luY2hyb25vdXNseSBvbmNlIGl0IGlzIGluc2VydGVkXG4gICAgICAgICAgICAvLyBpbnRvIHRoZSBkb2N1bWVudC4gRG8gc28sIHRodXMgcXVldWluZyB1cCB0aGUgdGFzay4gUmVtZW1iZXIgdG8gY2xlYW4gdXAgb25jZSBpdCdzIGJlZW4gY2FsbGVkLlxuICAgICAgICAgICAgdmFyIHNjcmlwdCA9IGRvYy5jcmVhdGVFbGVtZW50KFwic2NyaXB0XCIpO1xuICAgICAgICAgICAgc2NyaXB0Lm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBydW5JZlByZXNlbnQoaGFuZGxlKTtcbiAgICAgICAgICAgICAgICBzY3JpcHQub25yZWFkeXN0YXRlY2hhbmdlID0gbnVsbDtcbiAgICAgICAgICAgICAgICBodG1sLnJlbW92ZUNoaWxkKHNjcmlwdCk7XG4gICAgICAgICAgICAgICAgc2NyaXB0ID0gbnVsbDtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBodG1sLmFwcGVuZENoaWxkKHNjcmlwdCk7XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaW5zdGFsbFNldFRpbWVvdXRJbXBsZW1lbnRhdGlvbigpIHtcbiAgICAgICAgcmVnaXN0ZXJJbW1lZGlhdGUgPSBmdW5jdGlvbihoYW5kbGUpIHtcbiAgICAgICAgICAgIHNldFRpbWVvdXQocnVuSWZQcmVzZW50LCAwLCBoYW5kbGUpO1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIC8vIElmIHN1cHBvcnRlZCwgd2Ugc2hvdWxkIGF0dGFjaCB0byB0aGUgcHJvdG90eXBlIG9mIGdsb2JhbCwgc2luY2UgdGhhdCBpcyB3aGVyZSBzZXRUaW1lb3V0IGV0IGFsLiBsaXZlLlxuICAgIHZhciBhdHRhY2hUbyA9IE9iamVjdC5nZXRQcm90b3R5cGVPZiAmJiBPYmplY3QuZ2V0UHJvdG90eXBlT2YoZ2xvYmFsKTtcbiAgICBhdHRhY2hUbyA9IGF0dGFjaFRvICYmIGF0dGFjaFRvLnNldFRpbWVvdXQgPyBhdHRhY2hUbyA6IGdsb2JhbDtcblxuICAgIC8vIERvbid0IGdldCBmb29sZWQgYnkgZS5nLiBicm93c2VyaWZ5IGVudmlyb25tZW50cy5cbiAgICBpZiAoe30udG9TdHJpbmcuY2FsbChnbG9iYWwucHJvY2VzcykgPT09IFwiW29iamVjdCBwcm9jZXNzXVwiKSB7XG4gICAgICAgIC8vIEZvciBOb2RlLmpzIGJlZm9yZSAwLjlcbiAgICAgICAgaW5zdGFsbE5leHRUaWNrSW1wbGVtZW50YXRpb24oKTtcblxuICAgIH0gZWxzZSBpZiAoY2FuVXNlUG9zdE1lc3NhZ2UoKSkge1xuICAgICAgICAvLyBGb3Igbm9uLUlFMTAgbW9kZXJuIGJyb3dzZXJzXG4gICAgICAgIGluc3RhbGxQb3N0TWVzc2FnZUltcGxlbWVudGF0aW9uKCk7XG5cbiAgICB9IGVsc2UgaWYgKGdsb2JhbC5NZXNzYWdlQ2hhbm5lbCkge1xuICAgICAgICAvLyBGb3Igd2ViIHdvcmtlcnMsIHdoZXJlIHN1cHBvcnRlZFxuICAgICAgICBpbnN0YWxsTWVzc2FnZUNoYW5uZWxJbXBsZW1lbnRhdGlvbigpO1xuXG4gICAgfSBlbHNlIGlmIChkb2MgJiYgXCJvbnJlYWR5c3RhdGVjaGFuZ2VcIiBpbiBkb2MuY3JlYXRlRWxlbWVudChcInNjcmlwdFwiKSkge1xuICAgICAgICAvLyBGb3IgSUUgNuKAkzhcbiAgICAgICAgaW5zdGFsbFJlYWR5U3RhdGVDaGFuZ2VJbXBsZW1lbnRhdGlvbigpO1xuXG4gICAgfSBlbHNlIHtcbiAgICAgICAgLy8gRm9yIG9sZGVyIGJyb3dzZXJzXG4gICAgICAgIGluc3RhbGxTZXRUaW1lb3V0SW1wbGVtZW50YXRpb24oKTtcbiAgICB9XG5cbiAgICBhdHRhY2hUby5zZXRJbW1lZGlhdGUgPSBzZXRJbW1lZGlhdGU7XG4gICAgYXR0YWNoVG8uY2xlYXJJbW1lZGlhdGUgPSBjbGVhckltbWVkaWF0ZTtcbn0odHlwZW9mIHNlbGYgPT09IFwidW5kZWZpbmVkXCIgPyB0eXBlb2YgZ2xvYmFsID09PSBcInVuZGVmaW5lZFwiID8gdGhpcyA6IGdsb2JhbCA6IHNlbGYpKTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3NldGltbWVkaWF0ZS9zZXRJbW1lZGlhdGUuanNcbi8vIG1vZHVsZSBpZCA9IDQ3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIihmdW5jdGlvbihmKXtpZih0eXBlb2YgZXhwb3J0cz09PVwib2JqZWN0XCImJnR5cGVvZiBtb2R1bGUhPT1cInVuZGVmaW5lZFwiKXttb2R1bGUuZXhwb3J0cz1mKCl9ZWxzZSBpZih0eXBlb2YgZGVmaW5lPT09XCJmdW5jdGlvblwiJiZkZWZpbmUuYW1kKXtkZWZpbmUoW10sZil9ZWxzZXt2YXIgZztpZih0eXBlb2Ygd2luZG93IT09XCJ1bmRlZmluZWRcIil7Zz13aW5kb3d9ZWxzZSBpZih0eXBlb2YgZ2xvYmFsIT09XCJ1bmRlZmluZWRcIil7Zz1nbG9iYWx9ZWxzZSBpZih0eXBlb2Ygc2VsZiE9PVwidW5kZWZpbmVkXCIpe2c9c2VsZn1lbHNle2c9dGhpc31nLnJlYWxpc3RpY1N0cnVjdHVyZWRDbG9uZSA9IGYoKX19KShmdW5jdGlvbigpe3ZhciBkZWZpbmUsbW9kdWxlLGV4cG9ydHM7cmV0dXJuIChmdW5jdGlvbigpe2Z1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfXJldHVybiBlfSkoKSh7MTpbZnVuY3Rpb24oX2RlcmVxXyxtb2R1bGUsZXhwb3J0cyl7XG4ndXNlIHN0cmljdCc7XG5cbl9kZXJlcV8oJ2NvcmUtanMvZm4vYXJyYXkvaW5jbHVkZXMnKTtcbl9kZXJlcV8oJ2NvcmUtanMvZm4vb2JqZWN0L3ZhbHVlcycpO1xudmFyIERPTUV4Y2VwdGlvbiA9IF9kZXJlcV8oJ2RvbWV4Y2VwdGlvbicpO1xudmFyIFR5cGVzb24gPSBfZGVyZXFfKCd0eXBlc29uJyk7XG52YXIgc3RydWN0dXJlZENsb25pbmdUaHJvd2luZyA9IF9kZXJlcV8oJ3R5cGVzb24tcmVnaXN0cnkvZGlzdC9wcmVzZXRzL3N0cnVjdHVyZWQtY2xvbmluZy10aHJvd2luZycpO1xuXG4vLyBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8zMzI2ODMyNi83ODY2NDQgLSB3b3JrcyBpbiBicm93c2VyLCB3b3JrZXIsIGFuZCBOb2RlLmpzXG52YXIgZ2xvYmFsVmFyID0gdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgPyB3aW5kb3cgOiB0eXBlb2YgV29ya2VyR2xvYmFsU2NvcGUgIT09ICd1bmRlZmluZWQnID8gc2VsZiA6IHR5cGVvZiBnbG9iYWwgIT09ICd1bmRlZmluZWQnID8gZ2xvYmFsIDogRnVuY3Rpb24oJ3JldHVybiB0aGlzOycpKCk7XG5cbmlmICghZ2xvYmFsVmFyLkRPTUV4Y2VwdGlvbikge1xuICAgIGdsb2JhbFZhci5ET01FeGNlcHRpb24gPSBET01FeGNlcHRpb247XG59XG5cbnZhciBUU09OID0gbmV3IFR5cGVzb24oKS5yZWdpc3RlcihzdHJ1Y3R1cmVkQ2xvbmluZ1Rocm93aW5nKTtcblxuZnVuY3Rpb24gcmVhbGlzdGljU3RydWN0dXJlZENsb25lKG9iaikge1xuICAgIHJldHVybiBUU09OLnJldml2ZShUU09OLmVuY2Fwc3VsYXRlKG9iaikpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHJlYWxpc3RpY1N0cnVjdHVyZWRDbG9uZTtcblxufSx7XCJjb3JlLWpzL2ZuL2FycmF5L2luY2x1ZGVzXCI6MixcImNvcmUtanMvZm4vb2JqZWN0L3ZhbHVlc1wiOjMsXCJkb21leGNlcHRpb25cIjo0NCxcInR5cGVzb25cIjo0NyxcInR5cGVzb24tcmVnaXN0cnkvZGlzdC9wcmVzZXRzL3N0cnVjdHVyZWQtY2xvbmluZy10aHJvd2luZ1wiOjQ2fV0sMjpbZnVuY3Rpb24oX2RlcmVxXyxtb2R1bGUsZXhwb3J0cyl7XG4ndXNlIHN0cmljdCc7XG5cbl9kZXJlcV8oJy4uLy4uL21vZHVsZXMvZXM3LmFycmF5LmluY2x1ZGVzJyk7XG5tb2R1bGUuZXhwb3J0cyA9IF9kZXJlcV8oJy4uLy4uL21vZHVsZXMvX2NvcmUnKS5BcnJheS5pbmNsdWRlcztcblxufSx7XCIuLi8uLi9tb2R1bGVzL19jb3JlXCI6OSxcIi4uLy4uL21vZHVsZXMvZXM3LmFycmF5LmluY2x1ZGVzXCI6Mzl9XSwzOltmdW5jdGlvbihfZGVyZXFfLG1vZHVsZSxleHBvcnRzKXtcbid1c2Ugc3RyaWN0JztcblxuX2RlcmVxXygnLi4vLi4vbW9kdWxlcy9lczcub2JqZWN0LnZhbHVlcycpO1xubW9kdWxlLmV4cG9ydHMgPSBfZGVyZXFfKCcuLi8uLi9tb2R1bGVzL19jb3JlJykuT2JqZWN0LnZhbHVlcztcblxufSx7XCIuLi8uLi9tb2R1bGVzL19jb3JlXCI6OSxcIi4uLy4uL21vZHVsZXMvZXM3Lm9iamVjdC52YWx1ZXNcIjo0MH1dLDQ6W2Z1bmN0aW9uKF9kZXJlcV8sbW9kdWxlLGV4cG9ydHMpe1xuJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICBpZiAodHlwZW9mIGl0ICE9ICdmdW5jdGlvbicpIHRocm93IFR5cGVFcnJvcihpdCArICcgaXMgbm90IGEgZnVuY3Rpb24hJyk7XG4gIHJldHVybiBpdDtcbn07XG5cbn0se31dLDU6W2Z1bmN0aW9uKF9kZXJlcV8sbW9kdWxlLGV4cG9ydHMpe1xuJ3VzZSBzdHJpY3QnO1xuXG4vLyAyMi4xLjMuMzEgQXJyYXkucHJvdG90eXBlW0BAdW5zY29wYWJsZXNdXG52YXIgVU5TQ09QQUJMRVMgPSBfZGVyZXFfKCcuL193a3MnKSgndW5zY29wYWJsZXMnKTtcbnZhciBBcnJheVByb3RvID0gQXJyYXkucHJvdG90eXBlO1xuaWYgKEFycmF5UHJvdG9bVU5TQ09QQUJMRVNdID09IHVuZGVmaW5lZCkgX2RlcmVxXygnLi9faGlkZScpKEFycmF5UHJvdG8sIFVOU0NPUEFCTEVTLCB7fSk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChrZXkpIHtcbiAgQXJyYXlQcm90b1tVTlNDT1BBQkxFU11ba2V5XSA9IHRydWU7XG59O1xuXG59LHtcIi4vX2hpZGVcIjoxOSxcIi4vX3drc1wiOjM4fV0sNjpbZnVuY3Rpb24oX2RlcmVxXyxtb2R1bGUsZXhwb3J0cyl7XG4ndXNlIHN0cmljdCc7XG5cbnZhciBpc09iamVjdCA9IF9kZXJlcV8oJy4vX2lzLW9iamVjdCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgaWYgKCFpc09iamVjdChpdCkpIHRocm93IFR5cGVFcnJvcihpdCArICcgaXMgbm90IGFuIG9iamVjdCEnKTtcbiAgcmV0dXJuIGl0O1xufTtcblxufSx7XCIuL19pcy1vYmplY3RcIjoyMn1dLDc6W2Z1bmN0aW9uKF9kZXJlcV8sbW9kdWxlLGV4cG9ydHMpe1xuJ3VzZSBzdHJpY3QnO1xuXG4vLyBmYWxzZSAtPiBBcnJheSNpbmRleE9mXG4vLyB0cnVlICAtPiBBcnJheSNpbmNsdWRlc1xudmFyIHRvSU9iamVjdCA9IF9kZXJlcV8oJy4vX3RvLWlvYmplY3QnKTtcbnZhciB0b0xlbmd0aCA9IF9kZXJlcV8oJy4vX3RvLWxlbmd0aCcpO1xudmFyIHRvQWJzb2x1dGVJbmRleCA9IF9kZXJlcV8oJy4vX3RvLWFic29sdXRlLWluZGV4Jyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChJU19JTkNMVURFUykge1xuICByZXR1cm4gZnVuY3Rpb24gKCR0aGlzLCBlbCwgZnJvbUluZGV4KSB7XG4gICAgdmFyIE8gPSB0b0lPYmplY3QoJHRoaXMpO1xuICAgIHZhciBsZW5ndGggPSB0b0xlbmd0aChPLmxlbmd0aCk7XG4gICAgdmFyIGluZGV4ID0gdG9BYnNvbHV0ZUluZGV4KGZyb21JbmRleCwgbGVuZ3RoKTtcbiAgICB2YXIgdmFsdWU7XG4gICAgLy8gQXJyYXkjaW5jbHVkZXMgdXNlcyBTYW1lVmFsdWVaZXJvIGVxdWFsaXR5IGFsZ29yaXRobVxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1zZWxmLWNvbXBhcmVcbiAgICBpZiAoSVNfSU5DTFVERVMgJiYgZWwgIT0gZWwpIHdoaWxlIChsZW5ndGggPiBpbmRleCkge1xuICAgICAgdmFsdWUgPSBPW2luZGV4KytdO1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXNlbGYtY29tcGFyZVxuICAgICAgaWYgKHZhbHVlICE9IHZhbHVlKSByZXR1cm4gdHJ1ZTtcbiAgICAgIC8vIEFycmF5I2luZGV4T2YgaWdub3JlcyBob2xlcywgQXJyYXkjaW5jbHVkZXMgLSBub3RcbiAgICB9IGVsc2UgZm9yICg7IGxlbmd0aCA+IGluZGV4OyBpbmRleCsrKSB7XG4gICAgICBpZiAoSVNfSU5DTFVERVMgfHwgaW5kZXggaW4gTykge1xuICAgICAgICBpZiAoT1tpbmRleF0gPT09IGVsKSByZXR1cm4gSVNfSU5DTFVERVMgfHwgaW5kZXggfHwgMDtcbiAgICAgIH1cbiAgICB9cmV0dXJuICFJU19JTkNMVURFUyAmJiAtMTtcbiAgfTtcbn07XG5cbn0se1wiLi9fdG8tYWJzb2x1dGUtaW5kZXhcIjozMixcIi4vX3RvLWlvYmplY3RcIjozNCxcIi4vX3RvLWxlbmd0aFwiOjM1fV0sODpbZnVuY3Rpb24oX2RlcmVxXyxtb2R1bGUsZXhwb3J0cyl7XG5cInVzZSBzdHJpY3RcIjtcblxudmFyIHRvU3RyaW5nID0ge30udG9TdHJpbmc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKGl0KS5zbGljZSg4LCAtMSk7XG59O1xuXG59LHt9XSw5OltmdW5jdGlvbihfZGVyZXFfLG1vZHVsZSxleHBvcnRzKXtcbid1c2Ugc3RyaWN0JztcblxudmFyIGNvcmUgPSBtb2R1bGUuZXhwb3J0cyA9IHsgdmVyc2lvbjogJzIuNS4zJyB9O1xuaWYgKHR5cGVvZiBfX2UgPT0gJ251bWJlcicpIF9fZSA9IGNvcmU7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW5kZWZcblxufSx7fV0sMTA6W2Z1bmN0aW9uKF9kZXJlcV8sbW9kdWxlLGV4cG9ydHMpe1xuJ3VzZSBzdHJpY3QnO1xuXG4vLyBvcHRpb25hbCAvIHNpbXBsZSBjb250ZXh0IGJpbmRpbmdcbnZhciBhRnVuY3Rpb24gPSBfZGVyZXFfKCcuL19hLWZ1bmN0aW9uJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChmbiwgdGhhdCwgbGVuZ3RoKSB7XG4gIGFGdW5jdGlvbihmbik7XG4gIGlmICh0aGF0ID09PSB1bmRlZmluZWQpIHJldHVybiBmbjtcbiAgc3dpdGNoIChsZW5ndGgpIHtcbiAgICBjYXNlIDE6XG4gICAgICByZXR1cm4gZnVuY3Rpb24gKGEpIHtcbiAgICAgICAgcmV0dXJuIGZuLmNhbGwodGhhdCwgYSk7XG4gICAgICB9O1xuICAgIGNhc2UgMjpcbiAgICAgIHJldHVybiBmdW5jdGlvbiAoYSwgYikge1xuICAgICAgICByZXR1cm4gZm4uY2FsbCh0aGF0LCBhLCBiKTtcbiAgICAgIH07XG4gICAgY2FzZSAzOlxuICAgICAgcmV0dXJuIGZ1bmN0aW9uIChhLCBiLCBjKSB7XG4gICAgICAgIHJldHVybiBmbi5jYWxsKHRoYXQsIGEsIGIsIGMpO1xuICAgICAgfTtcbiAgfVxuICByZXR1cm4gZnVuY3Rpb24gKCkgLyogLi4uYXJncyAqL3tcbiAgICByZXR1cm4gZm4uYXBwbHkodGhhdCwgYXJndW1lbnRzKTtcbiAgfTtcbn07XG5cbn0se1wiLi9fYS1mdW5jdGlvblwiOjR9XSwxMTpbZnVuY3Rpb24oX2RlcmVxXyxtb2R1bGUsZXhwb3J0cyl7XG5cInVzZSBzdHJpY3RcIjtcblxuLy8gNy4yLjEgUmVxdWlyZU9iamVjdENvZXJjaWJsZShhcmd1bWVudClcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIGlmIChpdCA9PSB1bmRlZmluZWQpIHRocm93IFR5cGVFcnJvcihcIkNhbid0IGNhbGwgbWV0aG9kIG9uICBcIiArIGl0KTtcbiAgcmV0dXJuIGl0O1xufTtcblxufSx7fV0sMTI6W2Z1bmN0aW9uKF9kZXJlcV8sbW9kdWxlLGV4cG9ydHMpe1xuJ3VzZSBzdHJpY3QnO1xuXG4vLyBUaGFuaydzIElFOCBmb3IgaGlzIGZ1bm55IGRlZmluZVByb3BlcnR5XG5tb2R1bGUuZXhwb3J0cyA9ICFfZGVyZXFfKCcuL19mYWlscycpKGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh7fSwgJ2EnLCB7IGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgcmV0dXJuIDc7XG4gICAgfSB9KS5hICE9IDc7XG59KTtcblxufSx7XCIuL19mYWlsc1wiOjE2fV0sMTM6W2Z1bmN0aW9uKF9kZXJlcV8sbW9kdWxlLGV4cG9ydHMpe1xuJ3VzZSBzdHJpY3QnO1xuXG52YXIgaXNPYmplY3QgPSBfZGVyZXFfKCcuL19pcy1vYmplY3QnKTtcbnZhciBkb2N1bWVudCA9IF9kZXJlcV8oJy4vX2dsb2JhbCcpLmRvY3VtZW50O1xuLy8gdHlwZW9mIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQgaXMgJ29iamVjdCcgaW4gb2xkIElFXG52YXIgaXMgPSBpc09iamVjdChkb2N1bWVudCkgJiYgaXNPYmplY3QoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gaXMgPyBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGl0KSA6IHt9O1xufTtcblxufSx7XCIuL19nbG9iYWxcIjoxNyxcIi4vX2lzLW9iamVjdFwiOjIyfV0sMTQ6W2Z1bmN0aW9uKF9kZXJlcV8sbW9kdWxlLGV4cG9ydHMpe1xuJ3VzZSBzdHJpY3QnO1xuXG4vLyBJRSA4LSBkb24ndCBlbnVtIGJ1ZyBrZXlzXG5tb2R1bGUuZXhwb3J0cyA9ICdjb25zdHJ1Y3RvcixoYXNPd25Qcm9wZXJ0eSxpc1Byb3RvdHlwZU9mLHByb3BlcnR5SXNFbnVtZXJhYmxlLHRvTG9jYWxlU3RyaW5nLHRvU3RyaW5nLHZhbHVlT2YnLnNwbGl0KCcsJyk7XG5cbn0se31dLDE1OltmdW5jdGlvbihfZGVyZXFfLG1vZHVsZSxleHBvcnRzKXtcbid1c2Ugc3RyaWN0JztcblxudmFyIGdsb2JhbCA9IF9kZXJlcV8oJy4vX2dsb2JhbCcpO1xudmFyIGNvcmUgPSBfZGVyZXFfKCcuL19jb3JlJyk7XG52YXIgaGlkZSA9IF9kZXJlcV8oJy4vX2hpZGUnKTtcbnZhciByZWRlZmluZSA9IF9kZXJlcV8oJy4vX3JlZGVmaW5lJyk7XG52YXIgY3R4ID0gX2RlcmVxXygnLi9fY3R4Jyk7XG52YXIgUFJPVE9UWVBFID0gJ3Byb3RvdHlwZSc7XG5cbnZhciAkZXhwb3J0ID0gZnVuY3Rpb24gJGV4cG9ydCh0eXBlLCBuYW1lLCBzb3VyY2UpIHtcbiAgdmFyIElTX0ZPUkNFRCA9IHR5cGUgJiAkZXhwb3J0LkY7XG4gIHZhciBJU19HTE9CQUwgPSB0eXBlICYgJGV4cG9ydC5HO1xuICB2YXIgSVNfU1RBVElDID0gdHlwZSAmICRleHBvcnQuUztcbiAgdmFyIElTX1BST1RPID0gdHlwZSAmICRleHBvcnQuUDtcbiAgdmFyIElTX0JJTkQgPSB0eXBlICYgJGV4cG9ydC5CO1xuICB2YXIgdGFyZ2V0ID0gSVNfR0xPQkFMID8gZ2xvYmFsIDogSVNfU1RBVElDID8gZ2xvYmFsW25hbWVdIHx8IChnbG9iYWxbbmFtZV0gPSB7fSkgOiAoZ2xvYmFsW25hbWVdIHx8IHt9KVtQUk9UT1RZUEVdO1xuICB2YXIgZXhwb3J0cyA9IElTX0dMT0JBTCA/IGNvcmUgOiBjb3JlW25hbWVdIHx8IChjb3JlW25hbWVdID0ge30pO1xuICB2YXIgZXhwUHJvdG8gPSBleHBvcnRzW1BST1RPVFlQRV0gfHwgKGV4cG9ydHNbUFJPVE9UWVBFXSA9IHt9KTtcbiAgdmFyIGtleSwgb3duLCBvdXQsIGV4cDtcbiAgaWYgKElTX0dMT0JBTCkgc291cmNlID0gbmFtZTtcbiAgZm9yIChrZXkgaW4gc291cmNlKSB7XG4gICAgLy8gY29udGFpbnMgaW4gbmF0aXZlXG4gICAgb3duID0gIUlTX0ZPUkNFRCAmJiB0YXJnZXQgJiYgdGFyZ2V0W2tleV0gIT09IHVuZGVmaW5lZDtcbiAgICAvLyBleHBvcnQgbmF0aXZlIG9yIHBhc3NlZFxuICAgIG91dCA9IChvd24gPyB0YXJnZXQgOiBzb3VyY2UpW2tleV07XG4gICAgLy8gYmluZCB0aW1lcnMgdG8gZ2xvYmFsIGZvciBjYWxsIGZyb20gZXhwb3J0IGNvbnRleHRcbiAgICBleHAgPSBJU19CSU5EICYmIG93biA/IGN0eChvdXQsIGdsb2JhbCkgOiBJU19QUk9UTyAmJiB0eXBlb2Ygb3V0ID09ICdmdW5jdGlvbicgPyBjdHgoRnVuY3Rpb24uY2FsbCwgb3V0KSA6IG91dDtcbiAgICAvLyBleHRlbmQgZ2xvYmFsXG4gICAgaWYgKHRhcmdldCkgcmVkZWZpbmUodGFyZ2V0LCBrZXksIG91dCwgdHlwZSAmICRleHBvcnQuVSk7XG4gICAgLy8gZXhwb3J0XG4gICAgaWYgKGV4cG9ydHNba2V5XSAhPSBvdXQpIGhpZGUoZXhwb3J0cywga2V5LCBleHApO1xuICAgIGlmIChJU19QUk9UTyAmJiBleHBQcm90b1trZXldICE9IG91dCkgZXhwUHJvdG9ba2V5XSA9IG91dDtcbiAgfVxufTtcbmdsb2JhbC5jb3JlID0gY29yZTtcbi8vIHR5cGUgYml0bWFwXG4kZXhwb3J0LkYgPSAxOyAvLyBmb3JjZWRcbiRleHBvcnQuRyA9IDI7IC8vIGdsb2JhbFxuJGV4cG9ydC5TID0gNDsgLy8gc3RhdGljXG4kZXhwb3J0LlAgPSA4OyAvLyBwcm90b1xuJGV4cG9ydC5CID0gMTY7IC8vIGJpbmRcbiRleHBvcnQuVyA9IDMyOyAvLyB3cmFwXG4kZXhwb3J0LlUgPSA2NDsgLy8gc2FmZVxuJGV4cG9ydC5SID0gMTI4OyAvLyByZWFsIHByb3RvIG1ldGhvZCBmb3IgYGxpYnJhcnlgXG5tb2R1bGUuZXhwb3J0cyA9ICRleHBvcnQ7XG5cbn0se1wiLi9fY29yZVwiOjksXCIuL19jdHhcIjoxMCxcIi4vX2dsb2JhbFwiOjE3LFwiLi9faGlkZVwiOjE5LFwiLi9fcmVkZWZpbmVcIjoyOX1dLDE2OltmdW5jdGlvbihfZGVyZXFfLG1vZHVsZSxleHBvcnRzKXtcblwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChleGVjKSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuICEhZXhlYygpO1xuICB9IGNhdGNoIChlKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbn07XG5cbn0se31dLDE3OltmdW5jdGlvbihfZGVyZXFfLG1vZHVsZSxleHBvcnRzKXtcbid1c2Ugc3RyaWN0JztcblxuLy8gaHR0cHM6Ly9naXRodWIuY29tL3psb2lyb2NrL2NvcmUtanMvaXNzdWVzLzg2I2lzc3VlY29tbWVudC0xMTU3NTkwMjhcbnZhciBnbG9iYWwgPSBtb2R1bGUuZXhwb3J0cyA9IHR5cGVvZiB3aW5kb3cgIT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93Lk1hdGggPT0gTWF0aCA/IHdpbmRvdyA6IHR5cGVvZiBzZWxmICE9ICd1bmRlZmluZWQnICYmIHNlbGYuTWF0aCA9PSBNYXRoID8gc2VsZlxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLW5ldy1mdW5jXG46IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5pZiAodHlwZW9mIF9fZyA9PSAnbnVtYmVyJykgX19nID0gZ2xvYmFsOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVuZGVmXG5cbn0se31dLDE4OltmdW5jdGlvbihfZGVyZXFfLG1vZHVsZSxleHBvcnRzKXtcblwidXNlIHN0cmljdFwiO1xuXG52YXIgaGFzT3duUHJvcGVydHkgPSB7fS5oYXNPd25Qcm9wZXJ0eTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0LCBrZXkpIHtcbiAgcmV0dXJuIGhhc093blByb3BlcnR5LmNhbGwoaXQsIGtleSk7XG59O1xuXG59LHt9XSwxOTpbZnVuY3Rpb24oX2RlcmVxXyxtb2R1bGUsZXhwb3J0cyl7XG4ndXNlIHN0cmljdCc7XG5cbnZhciBkUCA9IF9kZXJlcV8oJy4vX29iamVjdC1kcCcpO1xudmFyIGNyZWF0ZURlc2MgPSBfZGVyZXFfKCcuL19wcm9wZXJ0eS1kZXNjJyk7XG5tb2R1bGUuZXhwb3J0cyA9IF9kZXJlcV8oJy4vX2Rlc2NyaXB0b3JzJykgPyBmdW5jdGlvbiAob2JqZWN0LCBrZXksIHZhbHVlKSB7XG4gIHJldHVybiBkUC5mKG9iamVjdCwga2V5LCBjcmVhdGVEZXNjKDEsIHZhbHVlKSk7XG59IDogZnVuY3Rpb24gKG9iamVjdCwga2V5LCB2YWx1ZSkge1xuICBvYmplY3Rba2V5XSA9IHZhbHVlO1xuICByZXR1cm4gb2JqZWN0O1xufTtcblxufSx7XCIuL19kZXNjcmlwdG9yc1wiOjEyLFwiLi9fb2JqZWN0LWRwXCI6MjMsXCIuL19wcm9wZXJ0eS1kZXNjXCI6Mjh9XSwyMDpbZnVuY3Rpb24oX2RlcmVxXyxtb2R1bGUsZXhwb3J0cyl7XG4ndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gIV9kZXJlcV8oJy4vX2Rlc2NyaXB0b3JzJykgJiYgIV9kZXJlcV8oJy4vX2ZhaWxzJykoZnVuY3Rpb24gKCkge1xuICByZXR1cm4gT2JqZWN0LmRlZmluZVByb3BlcnR5KF9kZXJlcV8oJy4vX2RvbS1jcmVhdGUnKSgnZGl2JyksICdhJywgeyBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiA3O1xuICAgIH0gfSkuYSAhPSA3O1xufSk7XG5cbn0se1wiLi9fZGVzY3JpcHRvcnNcIjoxMixcIi4vX2RvbS1jcmVhdGVcIjoxMyxcIi4vX2ZhaWxzXCI6MTZ9XSwyMTpbZnVuY3Rpb24oX2RlcmVxXyxtb2R1bGUsZXhwb3J0cyl7XG4ndXNlIHN0cmljdCc7XG5cbi8vIGZhbGxiYWNrIGZvciBub24tYXJyYXktbGlrZSBFUzMgYW5kIG5vbi1lbnVtZXJhYmxlIG9sZCBWOCBzdHJpbmdzXG52YXIgY29mID0gX2RlcmVxXygnLi9fY29mJyk7XG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcHJvdG90eXBlLWJ1aWx0aW5zXG5tb2R1bGUuZXhwb3J0cyA9IE9iamVjdCgneicpLnByb3BlcnR5SXNFbnVtZXJhYmxlKDApID8gT2JqZWN0IDogZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBjb2YoaXQpID09ICdTdHJpbmcnID8gaXQuc3BsaXQoJycpIDogT2JqZWN0KGl0KTtcbn07XG5cbn0se1wiLi9fY29mXCI6OH1dLDIyOltmdW5jdGlvbihfZGVyZXFfLG1vZHVsZSxleHBvcnRzKXtcbid1c2Ugc3RyaWN0JztcblxudmFyIF90eXBlb2YgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgdHlwZW9mIFN5bWJvbC5pdGVyYXRvciA9PT0gXCJzeW1ib2xcIiA/IGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIHR5cGVvZiBvYmo7IH0gOiBmdW5jdGlvbiAob2JqKSB7IHJldHVybiBvYmogJiYgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sICYmIG9iaiAhPT0gU3ltYm9sLnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiB0eXBlb2Ygb2JqOyB9O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gKHR5cGVvZiBpdCA9PT0gJ3VuZGVmaW5lZCcgPyAndW5kZWZpbmVkJyA6IF90eXBlb2YoaXQpKSA9PT0gJ29iamVjdCcgPyBpdCAhPT0gbnVsbCA6IHR5cGVvZiBpdCA9PT0gJ2Z1bmN0aW9uJztcbn07XG5cbn0se31dLDIzOltmdW5jdGlvbihfZGVyZXFfLG1vZHVsZSxleHBvcnRzKXtcbid1c2Ugc3RyaWN0JztcblxudmFyIGFuT2JqZWN0ID0gX2RlcmVxXygnLi9fYW4tb2JqZWN0Jyk7XG52YXIgSUU4X0RPTV9ERUZJTkUgPSBfZGVyZXFfKCcuL19pZTgtZG9tLWRlZmluZScpO1xudmFyIHRvUHJpbWl0aXZlID0gX2RlcmVxXygnLi9fdG8tcHJpbWl0aXZlJyk7XG52YXIgZFAgPSBPYmplY3QuZGVmaW5lUHJvcGVydHk7XG5cbmV4cG9ydHMuZiA9IF9kZXJlcV8oJy4vX2Rlc2NyaXB0b3JzJykgPyBPYmplY3QuZGVmaW5lUHJvcGVydHkgOiBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0eShPLCBQLCBBdHRyaWJ1dGVzKSB7XG4gIGFuT2JqZWN0KE8pO1xuICBQID0gdG9QcmltaXRpdmUoUCwgdHJ1ZSk7XG4gIGFuT2JqZWN0KEF0dHJpYnV0ZXMpO1xuICBpZiAoSUU4X0RPTV9ERUZJTkUpIHRyeSB7XG4gICAgcmV0dXJuIGRQKE8sIFAsIEF0dHJpYnV0ZXMpO1xuICB9IGNhdGNoIChlKSB7LyogZW1wdHkgKi99XG4gIGlmICgnZ2V0JyBpbiBBdHRyaWJ1dGVzIHx8ICdzZXQnIGluIEF0dHJpYnV0ZXMpIHRocm93IFR5cGVFcnJvcignQWNjZXNzb3JzIG5vdCBzdXBwb3J0ZWQhJyk7XG4gIGlmICgndmFsdWUnIGluIEF0dHJpYnV0ZXMpIE9bUF0gPSBBdHRyaWJ1dGVzLnZhbHVlO1xuICByZXR1cm4gTztcbn07XG5cbn0se1wiLi9fYW4tb2JqZWN0XCI6NixcIi4vX2Rlc2NyaXB0b3JzXCI6MTIsXCIuL19pZTgtZG9tLWRlZmluZVwiOjIwLFwiLi9fdG8tcHJpbWl0aXZlXCI6MzZ9XSwyNDpbZnVuY3Rpb24oX2RlcmVxXyxtb2R1bGUsZXhwb3J0cyl7XG4ndXNlIHN0cmljdCc7XG5cbnZhciBoYXMgPSBfZGVyZXFfKCcuL19oYXMnKTtcbnZhciB0b0lPYmplY3QgPSBfZGVyZXFfKCcuL190by1pb2JqZWN0Jyk7XG52YXIgYXJyYXlJbmRleE9mID0gX2RlcmVxXygnLi9fYXJyYXktaW5jbHVkZXMnKShmYWxzZSk7XG52YXIgSUVfUFJPVE8gPSBfZGVyZXFfKCcuL19zaGFyZWQta2V5JykoJ0lFX1BST1RPJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG9iamVjdCwgbmFtZXMpIHtcbiAgdmFyIE8gPSB0b0lPYmplY3Qob2JqZWN0KTtcbiAgdmFyIGkgPSAwO1xuICB2YXIgcmVzdWx0ID0gW107XG4gIHZhciBrZXk7XG4gIGZvciAoa2V5IGluIE8pIHtcbiAgICBpZiAoa2V5ICE9IElFX1BST1RPKSBoYXMoTywga2V5KSAmJiByZXN1bHQucHVzaChrZXkpO1xuICB9IC8vIERvbid0IGVudW0gYnVnICYgaGlkZGVuIGtleXNcbiAgd2hpbGUgKG5hbWVzLmxlbmd0aCA+IGkpIHtcbiAgICBpZiAoaGFzKE8sIGtleSA9IG5hbWVzW2krK10pKSB7XG4gICAgICB+YXJyYXlJbmRleE9mKHJlc3VsdCwga2V5KSB8fCByZXN1bHQucHVzaChrZXkpO1xuICAgIH1cbiAgfXJldHVybiByZXN1bHQ7XG59O1xuXG59LHtcIi4vX2FycmF5LWluY2x1ZGVzXCI6NyxcIi4vX2hhc1wiOjE4LFwiLi9fc2hhcmVkLWtleVwiOjMwLFwiLi9fdG8taW9iamVjdFwiOjM0fV0sMjU6W2Z1bmN0aW9uKF9kZXJlcV8sbW9kdWxlLGV4cG9ydHMpe1xuJ3VzZSBzdHJpY3QnO1xuXG4vLyAxOS4xLjIuMTQgLyAxNS4yLjMuMTQgT2JqZWN0LmtleXMoTylcbnZhciAka2V5cyA9IF9kZXJlcV8oJy4vX29iamVjdC1rZXlzLWludGVybmFsJyk7XG52YXIgZW51bUJ1Z0tleXMgPSBfZGVyZXFfKCcuL19lbnVtLWJ1Zy1rZXlzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gT2JqZWN0LmtleXMgfHwgZnVuY3Rpb24ga2V5cyhPKSB7XG4gIHJldHVybiAka2V5cyhPLCBlbnVtQnVnS2V5cyk7XG59O1xuXG59LHtcIi4vX2VudW0tYnVnLWtleXNcIjoxNCxcIi4vX29iamVjdC1rZXlzLWludGVybmFsXCI6MjR9XSwyNjpbZnVuY3Rpb24oX2RlcmVxXyxtb2R1bGUsZXhwb3J0cyl7XG5cInVzZSBzdHJpY3RcIjtcblxuZXhwb3J0cy5mID0ge30ucHJvcGVydHlJc0VudW1lcmFibGU7XG5cbn0se31dLDI3OltmdW5jdGlvbihfZGVyZXFfLG1vZHVsZSxleHBvcnRzKXtcbid1c2Ugc3RyaWN0JztcblxudmFyIGdldEtleXMgPSBfZGVyZXFfKCcuL19vYmplY3Qta2V5cycpO1xudmFyIHRvSU9iamVjdCA9IF9kZXJlcV8oJy4vX3RvLWlvYmplY3QnKTtcbnZhciBpc0VudW0gPSBfZGVyZXFfKCcuL19vYmplY3QtcGllJykuZjtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGlzRW50cmllcykge1xuICByZXR1cm4gZnVuY3Rpb24gKGl0KSB7XG4gICAgdmFyIE8gPSB0b0lPYmplY3QoaXQpO1xuICAgIHZhciBrZXlzID0gZ2V0S2V5cyhPKTtcbiAgICB2YXIgbGVuZ3RoID0ga2V5cy5sZW5ndGg7XG4gICAgdmFyIGkgPSAwO1xuICAgIHZhciByZXN1bHQgPSBbXTtcbiAgICB2YXIga2V5O1xuICAgIHdoaWxlIChsZW5ndGggPiBpKSB7XG4gICAgICBpZiAoaXNFbnVtLmNhbGwoTywga2V5ID0ga2V5c1tpKytdKSkge1xuICAgICAgICByZXN1bHQucHVzaChpc0VudHJpZXMgPyBba2V5LCBPW2tleV1dIDogT1trZXldKTtcbiAgICAgIH1cbiAgICB9cmV0dXJuIHJlc3VsdDtcbiAgfTtcbn07XG5cbn0se1wiLi9fb2JqZWN0LWtleXNcIjoyNSxcIi4vX29iamVjdC1waWVcIjoyNixcIi4vX3RvLWlvYmplY3RcIjozNH1dLDI4OltmdW5jdGlvbihfZGVyZXFfLG1vZHVsZSxleHBvcnRzKXtcblwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChiaXRtYXAsIHZhbHVlKSB7XG4gIHJldHVybiB7XG4gICAgZW51bWVyYWJsZTogIShiaXRtYXAgJiAxKSxcbiAgICBjb25maWd1cmFibGU6ICEoYml0bWFwICYgMiksXG4gICAgd3JpdGFibGU6ICEoYml0bWFwICYgNCksXG4gICAgdmFsdWU6IHZhbHVlXG4gIH07XG59O1xuXG59LHt9XSwyOTpbZnVuY3Rpb24oX2RlcmVxXyxtb2R1bGUsZXhwb3J0cyl7XG4ndXNlIHN0cmljdCc7XG5cbnZhciBnbG9iYWwgPSBfZGVyZXFfKCcuL19nbG9iYWwnKTtcbnZhciBoaWRlID0gX2RlcmVxXygnLi9faGlkZScpO1xudmFyIGhhcyA9IF9kZXJlcV8oJy4vX2hhcycpO1xudmFyIFNSQyA9IF9kZXJlcV8oJy4vX3VpZCcpKCdzcmMnKTtcbnZhciBUT19TVFJJTkcgPSAndG9TdHJpbmcnO1xudmFyICR0b1N0cmluZyA9IEZ1bmN0aW9uW1RPX1NUUklOR107XG52YXIgVFBMID0gKCcnICsgJHRvU3RyaW5nKS5zcGxpdChUT19TVFJJTkcpO1xuXG5fZGVyZXFfKCcuL19jb3JlJykuaW5zcGVjdFNvdXJjZSA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gJHRvU3RyaW5nLmNhbGwoaXQpO1xufTtcblxuKG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKE8sIGtleSwgdmFsLCBzYWZlKSB7XG4gIHZhciBpc0Z1bmN0aW9uID0gdHlwZW9mIHZhbCA9PSAnZnVuY3Rpb24nO1xuICBpZiAoaXNGdW5jdGlvbikgaGFzKHZhbCwgJ25hbWUnKSB8fCBoaWRlKHZhbCwgJ25hbWUnLCBrZXkpO1xuICBpZiAoT1trZXldID09PSB2YWwpIHJldHVybjtcbiAgaWYgKGlzRnVuY3Rpb24pIGhhcyh2YWwsIFNSQykgfHwgaGlkZSh2YWwsIFNSQywgT1trZXldID8gJycgKyBPW2tleV0gOiBUUEwuam9pbihTdHJpbmcoa2V5KSkpO1xuICBpZiAoTyA9PT0gZ2xvYmFsKSB7XG4gICAgT1trZXldID0gdmFsO1xuICB9IGVsc2UgaWYgKCFzYWZlKSB7XG4gICAgZGVsZXRlIE9ba2V5XTtcbiAgICBoaWRlKE8sIGtleSwgdmFsKTtcbiAgfSBlbHNlIGlmIChPW2tleV0pIHtcbiAgICBPW2tleV0gPSB2YWw7XG4gIH0gZWxzZSB7XG4gICAgaGlkZShPLCBrZXksIHZhbCk7XG4gIH1cbiAgLy8gYWRkIGZha2UgRnVuY3Rpb24jdG9TdHJpbmcgZm9yIGNvcnJlY3Qgd29yayB3cmFwcGVkIG1ldGhvZHMgLyBjb25zdHJ1Y3RvcnMgd2l0aCBtZXRob2RzIGxpa2UgTG9EYXNoIGlzTmF0aXZlXG59KShGdW5jdGlvbi5wcm90b3R5cGUsIFRPX1NUUklORywgZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gIHJldHVybiB0eXBlb2YgdGhpcyA9PSAnZnVuY3Rpb24nICYmIHRoaXNbU1JDXSB8fCAkdG9TdHJpbmcuY2FsbCh0aGlzKTtcbn0pO1xuXG59LHtcIi4vX2NvcmVcIjo5LFwiLi9fZ2xvYmFsXCI6MTcsXCIuL19oYXNcIjoxOCxcIi4vX2hpZGVcIjoxOSxcIi4vX3VpZFwiOjM3fV0sMzA6W2Z1bmN0aW9uKF9kZXJlcV8sbW9kdWxlLGV4cG9ydHMpe1xuJ3VzZSBzdHJpY3QnO1xuXG52YXIgc2hhcmVkID0gX2RlcmVxXygnLi9fc2hhcmVkJykoJ2tleXMnKTtcbnZhciB1aWQgPSBfZGVyZXFfKCcuL191aWQnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGtleSkge1xuICByZXR1cm4gc2hhcmVkW2tleV0gfHwgKHNoYXJlZFtrZXldID0gdWlkKGtleSkpO1xufTtcblxufSx7XCIuL19zaGFyZWRcIjozMSxcIi4vX3VpZFwiOjM3fV0sMzE6W2Z1bmN0aW9uKF9kZXJlcV8sbW9kdWxlLGV4cG9ydHMpe1xuJ3VzZSBzdHJpY3QnO1xuXG52YXIgZ2xvYmFsID0gX2RlcmVxXygnLi9fZ2xvYmFsJyk7XG52YXIgU0hBUkVEID0gJ19fY29yZS1qc19zaGFyZWRfXyc7XG52YXIgc3RvcmUgPSBnbG9iYWxbU0hBUkVEXSB8fCAoZ2xvYmFsW1NIQVJFRF0gPSB7fSk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChrZXkpIHtcbiAgcmV0dXJuIHN0b3JlW2tleV0gfHwgKHN0b3JlW2tleV0gPSB7fSk7XG59O1xuXG59LHtcIi4vX2dsb2JhbFwiOjE3fV0sMzI6W2Z1bmN0aW9uKF9kZXJlcV8sbW9kdWxlLGV4cG9ydHMpe1xuJ3VzZSBzdHJpY3QnO1xuXG52YXIgdG9JbnRlZ2VyID0gX2RlcmVxXygnLi9fdG8taW50ZWdlcicpO1xudmFyIG1heCA9IE1hdGgubWF4O1xudmFyIG1pbiA9IE1hdGgubWluO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaW5kZXgsIGxlbmd0aCkge1xuICBpbmRleCA9IHRvSW50ZWdlcihpbmRleCk7XG4gIHJldHVybiBpbmRleCA8IDAgPyBtYXgoaW5kZXggKyBsZW5ndGgsIDApIDogbWluKGluZGV4LCBsZW5ndGgpO1xufTtcblxufSx7XCIuL190by1pbnRlZ2VyXCI6MzN9XSwzMzpbZnVuY3Rpb24oX2RlcmVxXyxtb2R1bGUsZXhwb3J0cyl7XG5cInVzZSBzdHJpY3RcIjtcblxuLy8gNy4xLjQgVG9JbnRlZ2VyXG52YXIgY2VpbCA9IE1hdGguY2VpbDtcbnZhciBmbG9vciA9IE1hdGguZmxvb3I7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gaXNOYU4oaXQgPSAraXQpID8gMCA6IChpdCA+IDAgPyBmbG9vciA6IGNlaWwpKGl0KTtcbn07XG5cbn0se31dLDM0OltmdW5jdGlvbihfZGVyZXFfLG1vZHVsZSxleHBvcnRzKXtcbid1c2Ugc3RyaWN0JztcblxuLy8gdG8gaW5kZXhlZCBvYmplY3QsIHRvT2JqZWN0IHdpdGggZmFsbGJhY2sgZm9yIG5vbi1hcnJheS1saWtlIEVTMyBzdHJpbmdzXG52YXIgSU9iamVjdCA9IF9kZXJlcV8oJy4vX2lvYmplY3QnKTtcbnZhciBkZWZpbmVkID0gX2RlcmVxXygnLi9fZGVmaW5lZCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIElPYmplY3QoZGVmaW5lZChpdCkpO1xufTtcblxufSx7XCIuL19kZWZpbmVkXCI6MTEsXCIuL19pb2JqZWN0XCI6MjF9XSwzNTpbZnVuY3Rpb24oX2RlcmVxXyxtb2R1bGUsZXhwb3J0cyl7XG4ndXNlIHN0cmljdCc7XG5cbi8vIDcuMS4xNSBUb0xlbmd0aFxudmFyIHRvSW50ZWdlciA9IF9kZXJlcV8oJy4vX3RvLWludGVnZXInKTtcbnZhciBtaW4gPSBNYXRoLm1pbjtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBpdCA+IDAgPyBtaW4odG9JbnRlZ2VyKGl0KSwgMHgxZmZmZmZmZmZmZmZmZikgOiAwOyAvLyBwb3coMiwgNTMpIC0gMSA9PSA5MDA3MTk5MjU0NzQwOTkxXG59O1xuXG59LHtcIi4vX3RvLWludGVnZXJcIjozM31dLDM2OltmdW5jdGlvbihfZGVyZXFfLG1vZHVsZSxleHBvcnRzKXtcbid1c2Ugc3RyaWN0JztcblxuLy8gNy4xLjEgVG9QcmltaXRpdmUoaW5wdXQgWywgUHJlZmVycmVkVHlwZV0pXG52YXIgaXNPYmplY3QgPSBfZGVyZXFfKCcuL19pcy1vYmplY3QnKTtcbi8vIGluc3RlYWQgb2YgdGhlIEVTNiBzcGVjIHZlcnNpb24sIHdlIGRpZG4ndCBpbXBsZW1lbnQgQEB0b1ByaW1pdGl2ZSBjYXNlXG4vLyBhbmQgdGhlIHNlY29uZCBhcmd1bWVudCAtIGZsYWcgLSBwcmVmZXJyZWQgdHlwZSBpcyBhIHN0cmluZ1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQsIFMpIHtcbiAgaWYgKCFpc09iamVjdChpdCkpIHJldHVybiBpdDtcbiAgdmFyIGZuLCB2YWw7XG4gIGlmIChTICYmIHR5cGVvZiAoZm4gPSBpdC50b1N0cmluZykgPT0gJ2Z1bmN0aW9uJyAmJiAhaXNPYmplY3QodmFsID0gZm4uY2FsbChpdCkpKSByZXR1cm4gdmFsO1xuICBpZiAodHlwZW9mIChmbiA9IGl0LnZhbHVlT2YpID09ICdmdW5jdGlvbicgJiYgIWlzT2JqZWN0KHZhbCA9IGZuLmNhbGwoaXQpKSkgcmV0dXJuIHZhbDtcbiAgaWYgKCFTICYmIHR5cGVvZiAoZm4gPSBpdC50b1N0cmluZykgPT0gJ2Z1bmN0aW9uJyAmJiAhaXNPYmplY3QodmFsID0gZm4uY2FsbChpdCkpKSByZXR1cm4gdmFsO1xuICB0aHJvdyBUeXBlRXJyb3IoXCJDYW4ndCBjb252ZXJ0IG9iamVjdCB0byBwcmltaXRpdmUgdmFsdWVcIik7XG59O1xuXG59LHtcIi4vX2lzLW9iamVjdFwiOjIyfV0sMzc6W2Z1bmN0aW9uKF9kZXJlcV8sbW9kdWxlLGV4cG9ydHMpe1xuJ3VzZSBzdHJpY3QnO1xuXG52YXIgaWQgPSAwO1xudmFyIHB4ID0gTWF0aC5yYW5kb20oKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGtleSkge1xuICByZXR1cm4gJ1N5bWJvbCgnLmNvbmNhdChrZXkgPT09IHVuZGVmaW5lZCA/ICcnIDoga2V5LCAnKV8nLCAoKytpZCArIHB4KS50b1N0cmluZygzNikpO1xufTtcblxufSx7fV0sMzg6W2Z1bmN0aW9uKF9kZXJlcV8sbW9kdWxlLGV4cG9ydHMpe1xuJ3VzZSBzdHJpY3QnO1xuXG52YXIgc3RvcmUgPSBfZGVyZXFfKCcuL19zaGFyZWQnKSgnd2tzJyk7XG52YXIgdWlkID0gX2RlcmVxXygnLi9fdWlkJyk7XG52YXIgX1N5bWJvbCA9IF9kZXJlcV8oJy4vX2dsb2JhbCcpLlN5bWJvbDtcbnZhciBVU0VfU1lNQk9MID0gdHlwZW9mIF9TeW1ib2wgPT0gJ2Z1bmN0aW9uJztcblxudmFyICRleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobmFtZSkge1xuICByZXR1cm4gc3RvcmVbbmFtZV0gfHwgKHN0b3JlW25hbWVdID0gVVNFX1NZTUJPTCAmJiBfU3ltYm9sW25hbWVdIHx8IChVU0VfU1lNQk9MID8gX1N5bWJvbCA6IHVpZCkoJ1N5bWJvbC4nICsgbmFtZSkpO1xufTtcblxuJGV4cG9ydHMuc3RvcmUgPSBzdG9yZTtcblxufSx7XCIuL19nbG9iYWxcIjoxNyxcIi4vX3NoYXJlZFwiOjMxLFwiLi9fdWlkXCI6Mzd9XSwzOTpbZnVuY3Rpb24oX2RlcmVxXyxtb2R1bGUsZXhwb3J0cyl7XG4ndXNlIHN0cmljdCc7XG4vLyBodHRwczovL2dpdGh1Yi5jb20vdGMzOS9BcnJheS5wcm90b3R5cGUuaW5jbHVkZXNcblxudmFyICRleHBvcnQgPSBfZGVyZXFfKCcuL19leHBvcnQnKTtcbnZhciAkaW5jbHVkZXMgPSBfZGVyZXFfKCcuL19hcnJheS1pbmNsdWRlcycpKHRydWUpO1xuXG4kZXhwb3J0KCRleHBvcnQuUCwgJ0FycmF5Jywge1xuICBpbmNsdWRlczogZnVuY3Rpb24gaW5jbHVkZXMoZWwgLyogLCBmcm9tSW5kZXggPSAwICovKSB7XG4gICAgcmV0dXJuICRpbmNsdWRlcyh0aGlzLCBlbCwgYXJndW1lbnRzLmxlbmd0aCA+IDEgPyBhcmd1bWVudHNbMV0gOiB1bmRlZmluZWQpO1xuICB9XG59KTtcblxuX2RlcmVxXygnLi9fYWRkLXRvLXVuc2NvcGFibGVzJykoJ2luY2x1ZGVzJyk7XG5cbn0se1wiLi9fYWRkLXRvLXVuc2NvcGFibGVzXCI6NSxcIi4vX2FycmF5LWluY2x1ZGVzXCI6NyxcIi4vX2V4cG9ydFwiOjE1fV0sNDA6W2Z1bmN0aW9uKF9kZXJlcV8sbW9kdWxlLGV4cG9ydHMpe1xuJ3VzZSBzdHJpY3QnO1xuXG4vLyBodHRwczovL2dpdGh1Yi5jb20vdGMzOS9wcm9wb3NhbC1vYmplY3QtdmFsdWVzLWVudHJpZXNcbnZhciAkZXhwb3J0ID0gX2RlcmVxXygnLi9fZXhwb3J0Jyk7XG52YXIgJHZhbHVlcyA9IF9kZXJlcV8oJy4vX29iamVjdC10by1hcnJheScpKGZhbHNlKTtcblxuJGV4cG9ydCgkZXhwb3J0LlMsICdPYmplY3QnLCB7XG4gIHZhbHVlczogZnVuY3Rpb24gdmFsdWVzKGl0KSB7XG4gICAgcmV0dXJuICR2YWx1ZXMoaXQpO1xuICB9XG59KTtcblxufSx7XCIuL19leHBvcnRcIjoxNSxcIi4vX29iamVjdC10by1hcnJheVwiOjI3fV0sNDE6W2Z1bmN0aW9uKF9kZXJlcV8sbW9kdWxlLGV4cG9ydHMpe1xuXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBfc2xpY2VkVG9BcnJheSA9IGZ1bmN0aW9uICgpIHsgZnVuY3Rpb24gc2xpY2VJdGVyYXRvcihhcnIsIGkpIHsgdmFyIF9hcnIgPSBbXTsgdmFyIF9uID0gdHJ1ZTsgdmFyIF9kID0gZmFsc2U7IHZhciBfZSA9IHVuZGVmaW5lZDsgdHJ5IHsgZm9yICh2YXIgX2kgPSBhcnJbU3ltYm9sLml0ZXJhdG9yXSgpLCBfczsgIShfbiA9IChfcyA9IF9pLm5leHQoKSkuZG9uZSk7IF9uID0gdHJ1ZSkgeyBfYXJyLnB1c2goX3MudmFsdWUpOyBpZiAoaSAmJiBfYXJyLmxlbmd0aCA9PT0gaSkgYnJlYWs7IH0gfSBjYXRjaCAoZXJyKSB7IF9kID0gdHJ1ZTsgX2UgPSBlcnI7IH0gZmluYWxseSB7IHRyeSB7IGlmICghX24gJiYgX2lbXCJyZXR1cm5cIl0pIF9pW1wicmV0dXJuXCJdKCk7IH0gZmluYWxseSB7IGlmIChfZCkgdGhyb3cgX2U7IH0gfSByZXR1cm4gX2FycjsgfSByZXR1cm4gZnVuY3Rpb24gKGFyciwgaSkgeyBpZiAoQXJyYXkuaXNBcnJheShhcnIpKSB7IHJldHVybiBhcnI7IH0gZWxzZSBpZiAoU3ltYm9sLml0ZXJhdG9yIGluIE9iamVjdChhcnIpKSB7IHJldHVybiBzbGljZUl0ZXJhdG9yKGFyciwgaSk7IH0gZWxzZSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJJbnZhbGlkIGF0dGVtcHQgdG8gZGVzdHJ1Y3R1cmUgbm9uLWl0ZXJhYmxlIGluc3RhbmNlXCIpOyB9IH07IH0oKTtcblxudmFyIF9jcmVhdGVDbGFzcyA9IGZ1bmN0aW9uICgpIHsgZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7IGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHsgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTsgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlOyBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7IGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTsgfSB9IHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7IGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyByZXR1cm4gQ29uc3RydWN0b3I7IH07IH0oKTtcblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxudmFyIGxlZ2FjeUVycm9yQ29kZXMgPSBfZGVyZXFfKFwiLi9sZWdhY3ktZXJyb3ItY29kZXMuanNvblwiKTtcbnZhciBpZGxVdGlscyA9IF9kZXJlcV8oXCIuL3V0aWxzLmpzXCIpO1xuXG5leHBvcnRzLmltcGxlbWVudGF0aW9uID0gZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBET01FeGNlcHRpb25JbXBsKF9yZWYpIHtcbiAgICB2YXIgX3JlZjIgPSBfc2xpY2VkVG9BcnJheShfcmVmLCAyKSxcbiAgICAgICAgbWVzc2FnZSA9IF9yZWYyWzBdLFxuICAgICAgICBuYW1lID0gX3JlZjJbMV07XG5cbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgRE9NRXhjZXB0aW9uSW1wbCk7XG5cbiAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgIHRoaXMubWVzc2FnZSA9IG1lc3NhZ2U7XG4gIH1cblxuICBfY3JlYXRlQ2xhc3MoRE9NRXhjZXB0aW9uSW1wbCwgW3tcbiAgICBrZXk6IFwiY29kZVwiLFxuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgcmV0dXJuIGxlZ2FjeUVycm9yQ29kZXNbdGhpcy5uYW1lXSB8fCAwO1xuICAgIH1cbiAgfV0pO1xuXG4gIHJldHVybiBET01FeGNlcHRpb25JbXBsO1xufSgpO1xuXG4vLyBBIHByb3ByaWV0YXJ5IFY4IGV4dGVuc2lvbiB0aGF0IGNhdXNlcyB0aGUgc3RhY2sgcHJvcGVydHkgdG8gYXBwZWFyLlxuZXhwb3J0cy5pbml0ID0gZnVuY3Rpb24gKGltcGwpIHtcbiAgaWYgKEVycm9yLmNhcHR1cmVTdGFja1RyYWNlKSB7XG4gICAgdmFyIHdyYXBwZXIgPSBpZGxVdGlscy53cmFwcGVyRm9ySW1wbChpbXBsKTtcbiAgICBFcnJvci5jYXB0dXJlU3RhY2tUcmFjZSh3cmFwcGVyLCB3cmFwcGVyLmNvbnN0cnVjdG9yKTtcbiAgfVxufTtcblxufSx7XCIuL2xlZ2FjeS1lcnJvci1jb2Rlcy5qc29uXCI6NDMsXCIuL3V0aWxzLmpzXCI6NDV9XSw0MjpbZnVuY3Rpb24oX2RlcmVxXyxtb2R1bGUsZXhwb3J0cyl7XG5cInVzZSBzdHJpY3RcIjtcblxudmFyIGNvbnZlcnNpb25zID0gX2RlcmVxXyhcIndlYmlkbC1jb252ZXJzaW9uc1wiKTtcbnZhciB1dGlscyA9IF9kZXJlcV8oXCIuL3V0aWxzLmpzXCIpO1xuXG52YXIgaW1wbCA9IHV0aWxzLmltcGxTeW1ib2w7XG5cbmZ1bmN0aW9uIERPTUV4Y2VwdGlvbigpIHtcbiAgdmFyIGFyZ3MgPSBbXTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoICYmIGkgPCAyOyArK2kpIHtcbiAgICBhcmdzW2ldID0gYXJndW1lbnRzW2ldO1xuICB9XG5cbiAgaWYgKGFyZ3NbMF0gIT09IHVuZGVmaW5lZCkge1xuICAgIGFyZ3NbMF0gPSBjb252ZXJzaW9uc1tcIkRPTVN0cmluZ1wiXShhcmdzWzBdLCB7IGNvbnRleHQ6IFwiRmFpbGVkIHRvIGNvbnN0cnVjdCAnRE9NRXhjZXB0aW9uJzogcGFyYW1ldGVyIDFcIiB9KTtcbiAgfSBlbHNlIHtcbiAgICBhcmdzWzBdID0gXCJcIjtcbiAgfVxuXG4gIGlmIChhcmdzWzFdICE9PSB1bmRlZmluZWQpIHtcbiAgICBhcmdzWzFdID0gY29udmVyc2lvbnNbXCJET01TdHJpbmdcIl0oYXJnc1sxXSwgeyBjb250ZXh0OiBcIkZhaWxlZCB0byBjb25zdHJ1Y3QgJ0RPTUV4Y2VwdGlvbic6IHBhcmFtZXRlciAyXCIgfSk7XG4gIH0gZWxzZSB7XG4gICAgYXJnc1sxXSA9IFwiRXJyb3JcIjtcbiAgfVxuXG4gIGlmYWNlLnNldHVwKHRoaXMsIGFyZ3MpO1xufVxuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoRE9NRXhjZXB0aW9uLCBcInByb3RvdHlwZVwiLCB7XG4gIHZhbHVlOiBET01FeGNlcHRpb24ucHJvdG90eXBlLFxuICB3cml0YWJsZTogZmFsc2UsXG4gIGVudW1lcmFibGU6IGZhbHNlLFxuICBjb25maWd1cmFibGU6IGZhbHNlXG59KTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KERPTUV4Y2VwdGlvbi5wcm90b3R5cGUsIFwibmFtZVwiLCB7XG4gIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgIHJldHVybiB0aGlzW2ltcGxdW1wibmFtZVwiXTtcbiAgfSxcblxuXG4gIGVudW1lcmFibGU6IHRydWUsXG4gIGNvbmZpZ3VyYWJsZTogdHJ1ZVxufSk7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShET01FeGNlcHRpb24ucHJvdG90eXBlLCBcIm1lc3NhZ2VcIiwge1xuICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICByZXR1cm4gdGhpc1tpbXBsXVtcIm1lc3NhZ2VcIl07XG4gIH0sXG5cblxuICBlbnVtZXJhYmxlOiB0cnVlLFxuICBjb25maWd1cmFibGU6IHRydWVcbn0pO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoRE9NRXhjZXB0aW9uLnByb3RvdHlwZSwgXCJjb2RlXCIsIHtcbiAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgcmV0dXJuIHRoaXNbaW1wbF1bXCJjb2RlXCJdO1xuICB9LFxuXG5cbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgY29uZmlndXJhYmxlOiB0cnVlXG59KTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KERPTUV4Y2VwdGlvbiwgXCJJTkRFWF9TSVpFX0VSUlwiLCB7XG4gIHZhbHVlOiAxLFxuICBlbnVtZXJhYmxlOiB0cnVlXG59KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShET01FeGNlcHRpb24ucHJvdG90eXBlLCBcIklOREVYX1NJWkVfRVJSXCIsIHtcbiAgdmFsdWU6IDEsXG4gIGVudW1lcmFibGU6IHRydWVcbn0pO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoRE9NRXhjZXB0aW9uLCBcIkRPTVNUUklOR19TSVpFX0VSUlwiLCB7XG4gIHZhbHVlOiAyLFxuICBlbnVtZXJhYmxlOiB0cnVlXG59KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShET01FeGNlcHRpb24ucHJvdG90eXBlLCBcIkRPTVNUUklOR19TSVpFX0VSUlwiLCB7XG4gIHZhbHVlOiAyLFxuICBlbnVtZXJhYmxlOiB0cnVlXG59KTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KERPTUV4Y2VwdGlvbiwgXCJISUVSQVJDSFlfUkVRVUVTVF9FUlJcIiwge1xuICB2YWx1ZTogMyxcbiAgZW51bWVyYWJsZTogdHJ1ZVxufSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoRE9NRXhjZXB0aW9uLnByb3RvdHlwZSwgXCJISUVSQVJDSFlfUkVRVUVTVF9FUlJcIiwge1xuICB2YWx1ZTogMyxcbiAgZW51bWVyYWJsZTogdHJ1ZVxufSk7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShET01FeGNlcHRpb24sIFwiV1JPTkdfRE9DVU1FTlRfRVJSXCIsIHtcbiAgdmFsdWU6IDQsXG4gIGVudW1lcmFibGU6IHRydWVcbn0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KERPTUV4Y2VwdGlvbi5wcm90b3R5cGUsIFwiV1JPTkdfRE9DVU1FTlRfRVJSXCIsIHtcbiAgdmFsdWU6IDQsXG4gIGVudW1lcmFibGU6IHRydWVcbn0pO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoRE9NRXhjZXB0aW9uLCBcIklOVkFMSURfQ0hBUkFDVEVSX0VSUlwiLCB7XG4gIHZhbHVlOiA1LFxuICBlbnVtZXJhYmxlOiB0cnVlXG59KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShET01FeGNlcHRpb24ucHJvdG90eXBlLCBcIklOVkFMSURfQ0hBUkFDVEVSX0VSUlwiLCB7XG4gIHZhbHVlOiA1LFxuICBlbnVtZXJhYmxlOiB0cnVlXG59KTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KERPTUV4Y2VwdGlvbiwgXCJOT19EQVRBX0FMTE9XRURfRVJSXCIsIHtcbiAgdmFsdWU6IDYsXG4gIGVudW1lcmFibGU6IHRydWVcbn0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KERPTUV4Y2VwdGlvbi5wcm90b3R5cGUsIFwiTk9fREFUQV9BTExPV0VEX0VSUlwiLCB7XG4gIHZhbHVlOiA2LFxuICBlbnVtZXJhYmxlOiB0cnVlXG59KTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KERPTUV4Y2VwdGlvbiwgXCJOT19NT0RJRklDQVRJT05fQUxMT1dFRF9FUlJcIiwge1xuICB2YWx1ZTogNyxcbiAgZW51bWVyYWJsZTogdHJ1ZVxufSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoRE9NRXhjZXB0aW9uLnByb3RvdHlwZSwgXCJOT19NT0RJRklDQVRJT05fQUxMT1dFRF9FUlJcIiwge1xuICB2YWx1ZTogNyxcbiAgZW51bWVyYWJsZTogdHJ1ZVxufSk7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShET01FeGNlcHRpb24sIFwiTk9UX0ZPVU5EX0VSUlwiLCB7XG4gIHZhbHVlOiA4LFxuICBlbnVtZXJhYmxlOiB0cnVlXG59KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShET01FeGNlcHRpb24ucHJvdG90eXBlLCBcIk5PVF9GT1VORF9FUlJcIiwge1xuICB2YWx1ZTogOCxcbiAgZW51bWVyYWJsZTogdHJ1ZVxufSk7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShET01FeGNlcHRpb24sIFwiTk9UX1NVUFBPUlRFRF9FUlJcIiwge1xuICB2YWx1ZTogOSxcbiAgZW51bWVyYWJsZTogdHJ1ZVxufSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoRE9NRXhjZXB0aW9uLnByb3RvdHlwZSwgXCJOT1RfU1VQUE9SVEVEX0VSUlwiLCB7XG4gIHZhbHVlOiA5LFxuICBlbnVtZXJhYmxlOiB0cnVlXG59KTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KERPTUV4Y2VwdGlvbiwgXCJJTlVTRV9BVFRSSUJVVEVfRVJSXCIsIHtcbiAgdmFsdWU6IDEwLFxuICBlbnVtZXJhYmxlOiB0cnVlXG59KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShET01FeGNlcHRpb24ucHJvdG90eXBlLCBcIklOVVNFX0FUVFJJQlVURV9FUlJcIiwge1xuICB2YWx1ZTogMTAsXG4gIGVudW1lcmFibGU6IHRydWVcbn0pO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoRE9NRXhjZXB0aW9uLCBcIklOVkFMSURfU1RBVEVfRVJSXCIsIHtcbiAgdmFsdWU6IDExLFxuICBlbnVtZXJhYmxlOiB0cnVlXG59KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShET01FeGNlcHRpb24ucHJvdG90eXBlLCBcIklOVkFMSURfU1RBVEVfRVJSXCIsIHtcbiAgdmFsdWU6IDExLFxuICBlbnVtZXJhYmxlOiB0cnVlXG59KTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KERPTUV4Y2VwdGlvbiwgXCJTWU5UQVhfRVJSXCIsIHtcbiAgdmFsdWU6IDEyLFxuICBlbnVtZXJhYmxlOiB0cnVlXG59KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShET01FeGNlcHRpb24ucHJvdG90eXBlLCBcIlNZTlRBWF9FUlJcIiwge1xuICB2YWx1ZTogMTIsXG4gIGVudW1lcmFibGU6IHRydWVcbn0pO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoRE9NRXhjZXB0aW9uLCBcIklOVkFMSURfTU9ESUZJQ0FUSU9OX0VSUlwiLCB7XG4gIHZhbHVlOiAxMyxcbiAgZW51bWVyYWJsZTogdHJ1ZVxufSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoRE9NRXhjZXB0aW9uLnByb3RvdHlwZSwgXCJJTlZBTElEX01PRElGSUNBVElPTl9FUlJcIiwge1xuICB2YWx1ZTogMTMsXG4gIGVudW1lcmFibGU6IHRydWVcbn0pO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoRE9NRXhjZXB0aW9uLCBcIk5BTUVTUEFDRV9FUlJcIiwge1xuICB2YWx1ZTogMTQsXG4gIGVudW1lcmFibGU6IHRydWVcbn0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KERPTUV4Y2VwdGlvbi5wcm90b3R5cGUsIFwiTkFNRVNQQUNFX0VSUlwiLCB7XG4gIHZhbHVlOiAxNCxcbiAgZW51bWVyYWJsZTogdHJ1ZVxufSk7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShET01FeGNlcHRpb24sIFwiSU5WQUxJRF9BQ0NFU1NfRVJSXCIsIHtcbiAgdmFsdWU6IDE1LFxuICBlbnVtZXJhYmxlOiB0cnVlXG59KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShET01FeGNlcHRpb24ucHJvdG90eXBlLCBcIklOVkFMSURfQUNDRVNTX0VSUlwiLCB7XG4gIHZhbHVlOiAxNSxcbiAgZW51bWVyYWJsZTogdHJ1ZVxufSk7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShET01FeGNlcHRpb24sIFwiVkFMSURBVElPTl9FUlJcIiwge1xuICB2YWx1ZTogMTYsXG4gIGVudW1lcmFibGU6IHRydWVcbn0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KERPTUV4Y2VwdGlvbi5wcm90b3R5cGUsIFwiVkFMSURBVElPTl9FUlJcIiwge1xuICB2YWx1ZTogMTYsXG4gIGVudW1lcmFibGU6IHRydWVcbn0pO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoRE9NRXhjZXB0aW9uLCBcIlRZUEVfTUlTTUFUQ0hfRVJSXCIsIHtcbiAgdmFsdWU6IDE3LFxuICBlbnVtZXJhYmxlOiB0cnVlXG59KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShET01FeGNlcHRpb24ucHJvdG90eXBlLCBcIlRZUEVfTUlTTUFUQ0hfRVJSXCIsIHtcbiAgdmFsdWU6IDE3LFxuICBlbnVtZXJhYmxlOiB0cnVlXG59KTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KERPTUV4Y2VwdGlvbiwgXCJTRUNVUklUWV9FUlJcIiwge1xuICB2YWx1ZTogMTgsXG4gIGVudW1lcmFibGU6IHRydWVcbn0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KERPTUV4Y2VwdGlvbi5wcm90b3R5cGUsIFwiU0VDVVJJVFlfRVJSXCIsIHtcbiAgdmFsdWU6IDE4LFxuICBlbnVtZXJhYmxlOiB0cnVlXG59KTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KERPTUV4Y2VwdGlvbiwgXCJORVRXT1JLX0VSUlwiLCB7XG4gIHZhbHVlOiAxOSxcbiAgZW51bWVyYWJsZTogdHJ1ZVxufSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoRE9NRXhjZXB0aW9uLnByb3RvdHlwZSwgXCJORVRXT1JLX0VSUlwiLCB7XG4gIHZhbHVlOiAxOSxcbiAgZW51bWVyYWJsZTogdHJ1ZVxufSk7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShET01FeGNlcHRpb24sIFwiQUJPUlRfRVJSXCIsIHtcbiAgdmFsdWU6IDIwLFxuICBlbnVtZXJhYmxlOiB0cnVlXG59KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShET01FeGNlcHRpb24ucHJvdG90eXBlLCBcIkFCT1JUX0VSUlwiLCB7XG4gIHZhbHVlOiAyMCxcbiAgZW51bWVyYWJsZTogdHJ1ZVxufSk7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShET01FeGNlcHRpb24sIFwiVVJMX01JU01BVENIX0VSUlwiLCB7XG4gIHZhbHVlOiAyMSxcbiAgZW51bWVyYWJsZTogdHJ1ZVxufSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoRE9NRXhjZXB0aW9uLnByb3RvdHlwZSwgXCJVUkxfTUlTTUFUQ0hfRVJSXCIsIHtcbiAgdmFsdWU6IDIxLFxuICBlbnVtZXJhYmxlOiB0cnVlXG59KTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KERPTUV4Y2VwdGlvbiwgXCJRVU9UQV9FWENFRURFRF9FUlJcIiwge1xuICB2YWx1ZTogMjIsXG4gIGVudW1lcmFibGU6IHRydWVcbn0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KERPTUV4Y2VwdGlvbi5wcm90b3R5cGUsIFwiUVVPVEFfRVhDRUVERURfRVJSXCIsIHtcbiAgdmFsdWU6IDIyLFxuICBlbnVtZXJhYmxlOiB0cnVlXG59KTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KERPTUV4Y2VwdGlvbiwgXCJUSU1FT1VUX0VSUlwiLCB7XG4gIHZhbHVlOiAyMyxcbiAgZW51bWVyYWJsZTogdHJ1ZVxufSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoRE9NRXhjZXB0aW9uLnByb3RvdHlwZSwgXCJUSU1FT1VUX0VSUlwiLCB7XG4gIHZhbHVlOiAyMyxcbiAgZW51bWVyYWJsZTogdHJ1ZVxufSk7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShET01FeGNlcHRpb24sIFwiSU5WQUxJRF9OT0RFX1RZUEVfRVJSXCIsIHtcbiAgdmFsdWU6IDI0LFxuICBlbnVtZXJhYmxlOiB0cnVlXG59KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShET01FeGNlcHRpb24ucHJvdG90eXBlLCBcIklOVkFMSURfTk9ERV9UWVBFX0VSUlwiLCB7XG4gIHZhbHVlOiAyNCxcbiAgZW51bWVyYWJsZTogdHJ1ZVxufSk7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShET01FeGNlcHRpb24sIFwiREFUQV9DTE9ORV9FUlJcIiwge1xuICB2YWx1ZTogMjUsXG4gIGVudW1lcmFibGU6IHRydWVcbn0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KERPTUV4Y2VwdGlvbi5wcm90b3R5cGUsIFwiREFUQV9DTE9ORV9FUlJcIiwge1xuICB2YWx1ZTogMjUsXG4gIGVudW1lcmFibGU6IHRydWVcbn0pO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoRE9NRXhjZXB0aW9uLnByb3RvdHlwZSwgU3ltYm9sLnRvU3RyaW5nVGFnLCB7XG4gIHZhbHVlOiBcIkRPTUV4Y2VwdGlvblwiLFxuICB3cml0YWJsZTogZmFsc2UsXG4gIGVudW1lcmFibGU6IGZhbHNlLFxuICBjb25maWd1cmFibGU6IHRydWVcbn0pO1xuXG52YXIgaWZhY2UgPSB7XG4gIG1peGVkSW50bzogW10sXG4gIGlzOiBmdW5jdGlvbiBpcyhvYmopIHtcbiAgICBpZiAob2JqKSB7XG4gICAgICBpZiAob2JqW2ltcGxdIGluc3RhbmNlb2YgSW1wbC5pbXBsZW1lbnRhdGlvbikge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbW9kdWxlLmV4cG9ydHMubWl4ZWRJbnRvLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIGlmIChvYmogaW5zdGFuY2VvZiBtb2R1bGUuZXhwb3J0cy5taXhlZEludG9baV0pIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH0sXG4gIGlzSW1wbDogZnVuY3Rpb24gaXNJbXBsKG9iaikge1xuICAgIGlmIChvYmopIHtcbiAgICAgIGlmIChvYmogaW5zdGFuY2VvZiBJbXBsLmltcGxlbWVudGF0aW9uKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuXG4gICAgICB2YXIgd3JhcHBlciA9IHV0aWxzLndyYXBwZXJGb3JJbXBsKG9iaik7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG1vZHVsZS5leHBvcnRzLm1peGVkSW50by5sZW5ndGg7ICsraSkge1xuICAgICAgICBpZiAod3JhcHBlciBpbnN0YW5jZW9mIG1vZHVsZS5leHBvcnRzLm1peGVkSW50b1tpXSkge1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfSxcbiAgY29udmVydDogZnVuY3Rpb24gY29udmVydChvYmopIHtcbiAgICB2YXIgX3JlZiA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDoge30sXG4gICAgICAgIF9yZWYkY29udGV4dCA9IF9yZWYuY29udGV4dCxcbiAgICAgICAgY29udGV4dCA9IF9yZWYkY29udGV4dCA9PT0gdW5kZWZpbmVkID8gXCJUaGUgcHJvdmlkZWQgdmFsdWVcIiA6IF9yZWYkY29udGV4dDtcblxuICAgIGlmIChtb2R1bGUuZXhwb3J0cy5pcyhvYmopKSB7XG4gICAgICByZXR1cm4gdXRpbHMuaW1wbEZvcldyYXBwZXIob2JqKTtcbiAgICB9XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihjb250ZXh0ICsgXCIgaXMgbm90IG9mIHR5cGUgJ0RPTUV4Y2VwdGlvbicuXCIpO1xuICB9LFxuICBjcmVhdGU6IGZ1bmN0aW9uIGNyZWF0ZShjb25zdHJ1Y3RvckFyZ3MsIHByaXZhdGVEYXRhKSB7XG4gICAgdmFyIG9iaiA9IE9iamVjdC5jcmVhdGUoRE9NRXhjZXB0aW9uLnByb3RvdHlwZSk7XG4gICAgdGhpcy5zZXR1cChvYmosIGNvbnN0cnVjdG9yQXJncywgcHJpdmF0ZURhdGEpO1xuICAgIHJldHVybiBvYmo7XG4gIH0sXG4gIGNyZWF0ZUltcGw6IGZ1bmN0aW9uIGNyZWF0ZUltcGwoY29uc3RydWN0b3JBcmdzLCBwcml2YXRlRGF0YSkge1xuICAgIHZhciBvYmogPSBPYmplY3QuY3JlYXRlKERPTUV4Y2VwdGlvbi5wcm90b3R5cGUpO1xuICAgIHRoaXMuc2V0dXAob2JqLCBjb25zdHJ1Y3RvckFyZ3MsIHByaXZhdGVEYXRhKTtcbiAgICByZXR1cm4gdXRpbHMuaW1wbEZvcldyYXBwZXIob2JqKTtcbiAgfSxcbiAgX2ludGVybmFsU2V0dXA6IGZ1bmN0aW9uIF9pbnRlcm5hbFNldHVwKG9iaikge30sXG4gIHNldHVwOiBmdW5jdGlvbiBzZXR1cChvYmosIGNvbnN0cnVjdG9yQXJncywgcHJpdmF0ZURhdGEpIHtcbiAgICBpZiAoIXByaXZhdGVEYXRhKSBwcml2YXRlRGF0YSA9IHt9O1xuXG4gICAgcHJpdmF0ZURhdGEud3JhcHBlciA9IG9iajtcblxuICAgIHRoaXMuX2ludGVybmFsU2V0dXAob2JqKTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBpbXBsLCB7XG4gICAgICB2YWx1ZTogbmV3IEltcGwuaW1wbGVtZW50YXRpb24oY29uc3RydWN0b3JBcmdzLCBwcml2YXRlRGF0YSksXG4gICAgICB3cml0YWJsZTogZmFsc2UsXG4gICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIG9ialtpbXBsXVt1dGlscy53cmFwcGVyU3ltYm9sXSA9IG9iajtcbiAgICBpZiAoSW1wbC5pbml0KSB7XG4gICAgICBJbXBsLmluaXQob2JqW2ltcGxdLCBwcml2YXRlRGF0YSk7XG4gICAgfVxuICB9LFxuXG4gIGludGVyZmFjZTogRE9NRXhjZXB0aW9uLFxuICBleHBvc2U6IHtcbiAgICBXaW5kb3c6IHsgRE9NRXhjZXB0aW9uOiBET01FeGNlcHRpb24gfSxcbiAgICBXb3JrZXI6IHsgRE9NRXhjZXB0aW9uOiBET01FeGNlcHRpb24gfVxuICB9XG59OyAvLyBpZmFjZVxubW9kdWxlLmV4cG9ydHMgPSBpZmFjZTtcblxudmFyIEltcGwgPSBfZGVyZXFfKFwiLi8vRE9NRXhjZXB0aW9uLWltcGwuanNcIik7XG5cbn0se1wiLi8vRE9NRXhjZXB0aW9uLWltcGwuanNcIjo0MSxcIi4vdXRpbHMuanNcIjo0NSxcIndlYmlkbC1jb252ZXJzaW9uc1wiOjQ4fV0sNDM6W2Z1bmN0aW9uKF9kZXJlcV8sbW9kdWxlLGV4cG9ydHMpe1xubW9kdWxlLmV4cG9ydHM9e1xuICBcIkluZGV4U2l6ZUVycm9yXCI6IDEsXG4gIFwiRE9NU3RyaW5nU2l6ZUVycm9yXCI6IDIsXG4gIFwiSGllcmFyY2h5UmVxdWVzdEVycm9yXCI6IDMsXG4gIFwiV3JvbmdEb2N1bWVudEVycm9yXCI6IDQsXG4gIFwiSW52YWxpZENoYXJhY3RlckVycm9yXCI6IDUsXG4gIFwiTm9EYXRhQWxsb3dlZEVycm9yXCI6IDYsXG4gIFwiTm9Nb2RpZmljYXRpb25BbGxvd2VkRXJyb3JcIjogNyxcbiAgXCJOb3RGb3VuZEVycm9yXCI6IDgsXG4gIFwiTm90U3VwcG9ydGVkRXJyb3JcIjogOSxcbiAgXCJJblVzZUF0dHJpYnV0ZUVycm9yXCI6IDEwLFxuICBcIkludmFsaWRTdGF0ZUVycm9yXCI6IDExLFxuICBcIlN5bnRheEVycm9yXCI6IDEyLFxuICBcIkludmFsaWRNb2RpZmljYXRpb25FcnJvclwiOiAxMyxcbiAgXCJOYW1lc3BhY2VFcnJvclwiOiAxNCxcbiAgXCJJbnZhbGlkQWNjZXNzRXJyb3JcIjogMTUsXG4gIFwiVmFsaWRhdGlvbkVycm9yXCI6IDE2LFxuICBcIlR5cGVNaXNtYXRjaEVycm9yXCI6IDE3LFxuICBcIlNlY3VyaXR5RXJyb3JcIjogMTgsXG4gIFwiTmV0d29ya0Vycm9yXCI6IDE5LFxuICBcIkFib3J0RXJyb3JcIjogMjAsXG4gIFwiVVJMTWlzbWF0Y2hFcnJvclwiOiAyMSxcbiAgXCJRdW90YUV4Y2VlZGVkRXJyb3JcIjogMjIsXG4gIFwiVGltZW91dEVycm9yXCI6IDIzLFxuICBcIkludmFsaWROb2RlVHlwZUVycm9yXCI6IDI0LFxuICBcIkRhdGFDbG9uZUVycm9yXCI6IDI1XG59XG5cbn0se31dLDQ0OltmdW5jdGlvbihfZGVyZXFfLG1vZHVsZSxleHBvcnRzKXtcblwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IF9kZXJlcV8oXCIuL0RPTUV4Y2VwdGlvblwiKS5pbnRlcmZhY2U7XG5cbk9iamVjdC5zZXRQcm90b3R5cGVPZihtb2R1bGUuZXhwb3J0cy5wcm90b3R5cGUsIEVycm9yLnByb3RvdHlwZSk7XG5cbn0se1wiLi9ET01FeGNlcHRpb25cIjo0Mn1dLDQ1OltmdW5jdGlvbihfZGVyZXFfLG1vZHVsZSxleHBvcnRzKXtcblwidXNlIHN0cmljdFwiO1xuXG4vLyBSZXR1cm5zIFwiVHlwZSh2YWx1ZSkgaXMgT2JqZWN0XCIgaW4gRVMgdGVybWlub2xvZ3kuXG5cbnZhciBfdHlwZW9mID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPT09IFwic3ltYm9sXCIgPyBmdW5jdGlvbiAob2JqKSB7IHJldHVybiB0eXBlb2Ygb2JqOyB9IDogZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gb2JqICYmIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvYmouY29uc3RydWN0b3IgPT09IFN5bWJvbCAmJiBvYmogIT09IFN5bWJvbC5wcm90b3R5cGUgPyBcInN5bWJvbFwiIDogdHlwZW9mIG9iajsgfTtcblxuZnVuY3Rpb24gaXNPYmplY3QodmFsdWUpIHtcbiAgcmV0dXJuICh0eXBlb2YgdmFsdWUgPT09IFwidW5kZWZpbmVkXCIgPyBcInVuZGVmaW5lZFwiIDogX3R5cGVvZih2YWx1ZSkpID09PSBcIm9iamVjdFwiICYmIHZhbHVlICE9PSBudWxsIHx8IHR5cGVvZiB2YWx1ZSA9PT0gXCJmdW5jdGlvblwiO1xufVxuXG5mdW5jdGlvbiBnZXRSZWZlcmVuY2VUb0J5dGVzKGJ1ZmZlclNvdXJjZSkge1xuICAvLyBOb2RlLmpzJyBCdWZmZXIgZG9lcyBub3QgYWxsb3cgc3ViY2xhc3NpbmcgZm9yIG5vdywgc28gd2UgY2FuIGdldCBhd2F5IHdpdGggYSBwcm90b3R5cGUgb2JqZWN0IGNoZWNrIGZvciBwZXJmLlxuICBpZiAoT2JqZWN0LmdldFByb3RvdHlwZU9mKGJ1ZmZlclNvdXJjZSkgPT09IEJ1ZmZlci5wcm90b3R5cGUpIHtcbiAgICByZXR1cm4gYnVmZmVyU291cmNlO1xuICB9XG4gIGlmIChidWZmZXJTb3VyY2UgaW5zdGFuY2VvZiBBcnJheUJ1ZmZlcikge1xuICAgIHJldHVybiBCdWZmZXIuZnJvbShidWZmZXJTb3VyY2UpO1xuICB9XG4gIHJldHVybiBCdWZmZXIuZnJvbShidWZmZXJTb3VyY2UuYnVmZmVyLCBidWZmZXJTb3VyY2UuYnl0ZU9mZnNldCwgYnVmZmVyU291cmNlLmJ5dGVMZW5ndGgpO1xufVxuXG5mdW5jdGlvbiBnZXRDb3B5VG9CeXRlcyhidWZmZXJTb3VyY2UpIHtcbiAgcmV0dXJuIEJ1ZmZlci5mcm9tKGdldFJlZmVyZW5jZVRvQnl0ZXMoYnVmZmVyU291cmNlKSk7XG59XG5cbmZ1bmN0aW9uIG1peGluKHRhcmdldCwgc291cmNlKSB7XG4gIHZhciBrZXlzID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoc291cmNlKTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgKytpKSB7XG4gICAgaWYgKGtleXNbaV0gaW4gdGFyZ2V0KSB7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXlzW2ldLCBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHNvdXJjZSwga2V5c1tpXSkpO1xuICB9XG59XG5cbnZhciB3cmFwcGVyU3ltYm9sID0gU3ltYm9sKFwid3JhcHBlclwiKTtcbnZhciBpbXBsU3ltYm9sID0gU3ltYm9sKFwiaW1wbFwiKTtcbnZhciBzYW1lT2JqZWN0Q2FjaGVzID0gU3ltYm9sKFwiU2FtZU9iamVjdCBjYWNoZXNcIik7XG5cbmZ1bmN0aW9uIGdldFNhbWVPYmplY3Qod3JhcHBlciwgcHJvcCwgY3JlYXRvcikge1xuICBpZiAoIXdyYXBwZXJbc2FtZU9iamVjdENhY2hlc10pIHtcbiAgICB3cmFwcGVyW3NhbWVPYmplY3RDYWNoZXNdID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgfVxuXG4gIGlmIChwcm9wIGluIHdyYXBwZXJbc2FtZU9iamVjdENhY2hlc10pIHtcbiAgICByZXR1cm4gd3JhcHBlcltzYW1lT2JqZWN0Q2FjaGVzXVtwcm9wXTtcbiAgfVxuXG4gIHdyYXBwZXJbc2FtZU9iamVjdENhY2hlc11bcHJvcF0gPSBjcmVhdG9yKCk7XG4gIHJldHVybiB3cmFwcGVyW3NhbWVPYmplY3RDYWNoZXNdW3Byb3BdO1xufVxuXG5mdW5jdGlvbiB3cmFwcGVyRm9ySW1wbChpbXBsKSB7XG4gIHJldHVybiBpbXBsID8gaW1wbFt3cmFwcGVyU3ltYm9sXSA6IG51bGw7XG59XG5cbmZ1bmN0aW9uIGltcGxGb3JXcmFwcGVyKHdyYXBwZXIpIHtcbiAgcmV0dXJuIHdyYXBwZXIgPyB3cmFwcGVyW2ltcGxTeW1ib2xdIDogbnVsbDtcbn1cblxuZnVuY3Rpb24gdHJ5V3JhcHBlckZvckltcGwoaW1wbCkge1xuICB2YXIgd3JhcHBlciA9IHdyYXBwZXJGb3JJbXBsKGltcGwpO1xuICByZXR1cm4gd3JhcHBlciA/IHdyYXBwZXIgOiBpbXBsO1xufVxuXG5mdW5jdGlvbiB0cnlJbXBsRm9yV3JhcHBlcih3cmFwcGVyKSB7XG4gIHZhciBpbXBsID0gaW1wbEZvcldyYXBwZXIod3JhcHBlcik7XG4gIHJldHVybiBpbXBsID8gaW1wbCA6IHdyYXBwZXI7XG59XG5cbnZhciBpdGVySW50ZXJuYWxTeW1ib2wgPSBTeW1ib2woXCJpbnRlcm5hbFwiKTtcbnZhciBJdGVyYXRvclByb3RvdHlwZSA9IE9iamVjdC5nZXRQcm90b3R5cGVPZihPYmplY3QuZ2V0UHJvdG90eXBlT2YoW11bU3ltYm9sLml0ZXJhdG9yXSgpKSk7XG5cbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0cyA9IHtcbiAgaXNPYmplY3Q6IGlzT2JqZWN0LFxuICBnZXRSZWZlcmVuY2VUb0J5dGVzOiBnZXRSZWZlcmVuY2VUb0J5dGVzLFxuICBnZXRDb3B5VG9CeXRlczogZ2V0Q29weVRvQnl0ZXMsXG4gIG1peGluOiBtaXhpbixcbiAgd3JhcHBlclN5bWJvbDogd3JhcHBlclN5bWJvbCxcbiAgaW1wbFN5bWJvbDogaW1wbFN5bWJvbCxcbiAgZ2V0U2FtZU9iamVjdDogZ2V0U2FtZU9iamVjdCxcbiAgd3JhcHBlckZvckltcGw6IHdyYXBwZXJGb3JJbXBsLFxuICBpbXBsRm9yV3JhcHBlcjogaW1wbEZvcldyYXBwZXIsXG4gIHRyeVdyYXBwZXJGb3JJbXBsOiB0cnlXcmFwcGVyRm9ySW1wbCxcbiAgdHJ5SW1wbEZvcldyYXBwZXI6IHRyeUltcGxGb3JXcmFwcGVyLFxuICBpdGVySW50ZXJuYWxTeW1ib2w6IGl0ZXJJbnRlcm5hbFN5bWJvbCxcbiAgSXRlcmF0b3JQcm90b3R5cGU6IEl0ZXJhdG9yUHJvdG90eXBlXG59O1xuXG59LHt9XSw0NjpbZnVuY3Rpb24oX2RlcmVxXyxtb2R1bGUsZXhwb3J0cyl7XG5cInVzZSBzdHJpY3RcIjtcblxudmFyIF90eXBlb2YgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgdHlwZW9mIFN5bWJvbC5pdGVyYXRvciA9PT0gXCJzeW1ib2xcIiA/IGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIHR5cGVvZiBvYmo7IH0gOiBmdW5jdGlvbiAob2JqKSB7IHJldHVybiBvYmogJiYgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sICYmIG9iaiAhPT0gU3ltYm9sLnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiB0eXBlb2Ygb2JqOyB9O1xuXG4hZnVuY3Rpb24gKGUsIHQpIHtcbiAgXCJvYmplY3RcIiA9PSAodHlwZW9mIGV4cG9ydHMgPT09IFwidW5kZWZpbmVkXCIgPyBcInVuZGVmaW5lZFwiIDogX3R5cGVvZihleHBvcnRzKSkgJiYgXCJ1bmRlZmluZWRcIiAhPSB0eXBlb2YgbW9kdWxlID8gbW9kdWxlLmV4cG9ydHMgPSB0KCkgOiBcImZ1bmN0aW9uXCIgPT0gdHlwZW9mIGRlZmluZSAmJiBkZWZpbmUuYW1kID8gZGVmaW5lKHQpIDogKGUuVHlwZXNvbiA9IGUuVHlwZXNvbiB8fCB7fSwgZS5UeXBlc29uLnByZXNldHMgPSBlLlR5cGVzb24ucHJlc2V0cyB8fCB7fSwgZS5UeXBlc29uLnByZXNldHMuc3RydWN0dXJlZENsb25pbmdUaHJvd2luZyA9IHQoKSk7XG59KHVuZGVmaW5lZCwgZnVuY3Rpb24gKCkge1xuICBcInVzZSBzdHJpY3RcIjtcbiAgdmFyIGUgPSBcImZ1bmN0aW9uXCIgPT0gdHlwZW9mIFN5bWJvbCAmJiBcInN5bWJvbFwiID09IF90eXBlb2YoU3ltYm9sLml0ZXJhdG9yKSA/IGZ1bmN0aW9uIChlKSB7XG4gICAgcmV0dXJuIHR5cGVvZiBlID09PSBcInVuZGVmaW5lZFwiID8gXCJ1bmRlZmluZWRcIiA6IF90eXBlb2YoZSk7XG4gIH0gOiBmdW5jdGlvbiAoZSkge1xuICAgIHJldHVybiBlICYmIFwiZnVuY3Rpb25cIiA9PSB0eXBlb2YgU3ltYm9sICYmIGUuY29uc3RydWN0b3IgPT09IFN5bWJvbCAmJiBlICE9PSBTeW1ib2wucHJvdG90eXBlID8gXCJzeW1ib2xcIiA6IHR5cGVvZiBlID09PSBcInVuZGVmaW5lZFwiID8gXCJ1bmRlZmluZWRcIiA6IF90eXBlb2YoZSk7XG4gIH0sXG4gICAgICB0ID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBmdW5jdGlvbiAoZSwgdCkge1xuICAgICAgaWYgKEFycmF5LmlzQXJyYXkoZSkpIHJldHVybiBlO2lmIChTeW1ib2wuaXRlcmF0b3IgaW4gT2JqZWN0KGUpKSByZXR1cm4gZnVuY3Rpb24gc2xpY2VJdGVyYXRvcihlLCB0KSB7XG4gICAgICAgIHZhciBuID0gW10sXG4gICAgICAgICAgICByID0gITAsXG4gICAgICAgICAgICBpID0gITEsXG4gICAgICAgICAgICBvID0gdm9pZCAwO3RyeSB7XG4gICAgICAgICAgZm9yICh2YXIgcywgYSA9IGVbU3ltYm9sLml0ZXJhdG9yXSgpOyAhKHIgPSAocyA9IGEubmV4dCgpKS5kb25lKSAmJiAobi5wdXNoKHMudmFsdWUpLCAhdCB8fCBuLmxlbmd0aCAhPT0gdCk7IHIgPSAhMCkge31cbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgIGkgPSAhMCwgbyA9IGU7XG4gICAgICAgIH0gZmluYWxseSB7XG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICFyICYmIGEucmV0dXJuICYmIGEucmV0dXJuKCk7XG4gICAgICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgICAgIGlmIChpKSB0aHJvdyBvO1xuICAgICAgICAgIH1cbiAgICAgICAgfXJldHVybiBuO1xuICAgICAgfShlLCB0KTt0aHJvdyBuZXcgVHlwZUVycm9yKFwiSW52YWxpZCBhdHRlbXB0IHRvIGRlc3RydWN0dXJlIG5vbi1pdGVyYWJsZSBpbnN0YW5jZVwiKTtcbiAgICB9O1xuICB9KCksXG4gICAgICBuID0gZnVuY3Rpb24gbihlKSB7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkoZSkpIHtcbiAgICAgIGZvciAodmFyIHQgPSAwLCBuID0gQXJyYXkoZS5sZW5ndGgpOyB0IDwgZS5sZW5ndGg7IHQrKykge1xuICAgICAgICBuW3RdID0gZVt0XTtcbiAgICAgIH1yZXR1cm4gbjtcbiAgICB9cmV0dXJuIEFycmF5LmZyb20oZSk7XG4gIH0sXG4gICAgICByID0gT2JqZWN0LmtleXMsXG4gICAgICBpID0gQXJyYXkuaXNBcnJheSxcbiAgICAgIG8gPSB7fS50b1N0cmluZyxcbiAgICAgIHMgPSBPYmplY3QuZ2V0UHJvdG90eXBlT2YsXG4gICAgICBhID0ge30uaGFzT3duUHJvcGVydHksXG4gICAgICBjID0gYS50b1N0cmluZyxcbiAgICAgIHUgPSBbXCJ0eXBlXCIsIFwicmVwbGFjZWRcIiwgXCJpdGVyYXRlSW5cIiwgXCJpdGVyYXRlVW5zZXROdW1lcmljXCJdO2Z1bmN0aW9uIGlzVGhlbmFibGUoZSwgdCkge1xuICAgIHJldHVybiBUeXBlc29uLmlzT2JqZWN0KGUpICYmIFwiZnVuY3Rpb25cIiA9PSB0eXBlb2YgZS50aGVuICYmICghdCB8fCBcImZ1bmN0aW9uXCIgPT0gdHlwZW9mIGUuY2F0Y2gpO1xuICB9ZnVuY3Rpb24gdG9TdHJpbmdUYWcoZSkge1xuICAgIHJldHVybiBvLmNhbGwoZSkuc2xpY2UoOCwgLTEpO1xuICB9ZnVuY3Rpb24gaGFzQ29uc3RydWN0b3JPZih0LCBuKSB7XG4gICAgaWYgKCF0IHx8IFwib2JqZWN0XCIgIT09ICh2b2lkIDAgPT09IHQgPyBcInVuZGVmaW5lZFwiIDogZSh0KSkpIHJldHVybiAhMTt2YXIgciA9IHModCk7aWYgKCFyKSByZXR1cm4gITE7dmFyIGkgPSBhLmNhbGwociwgXCJjb25zdHJ1Y3RvclwiKSAmJiByLmNvbnN0cnVjdG9yO3JldHVybiBcImZ1bmN0aW9uXCIgIT0gdHlwZW9mIGkgPyBudWxsID09PSBuIDogXCJmdW5jdGlvblwiID09IHR5cGVvZiBpICYmIG51bGwgIT09IG4gJiYgYy5jYWxsKGkpID09PSBjLmNhbGwobik7XG4gIH1mdW5jdGlvbiBpc1BsYWluT2JqZWN0KGUpIHtcbiAgICByZXR1cm4gISghZSB8fCBcIk9iamVjdFwiICE9PSB0b1N0cmluZ1RhZyhlKSkgJiYgKCFzKGUpIHx8IGhhc0NvbnN0cnVjdG9yT2YoZSwgT2JqZWN0KSk7XG4gIH1mdW5jdGlvbiBpc09iamVjdCh0KSB7XG4gICAgcmV0dXJuIHQgJiYgXCJvYmplY3RcIiA9PT0gKHZvaWQgMCA9PT0gdCA/IFwidW5kZWZpbmVkXCIgOiBlKHQpKTtcbiAgfWZ1bmN0aW9uIFR5cGVzb24obykge1xuICAgIHZhciBzID0gW10sXG4gICAgICAgIGEgPSBbXSxcbiAgICAgICAgYyA9IHt9LFxuICAgICAgICBmID0gdGhpcy50eXBlcyA9IHt9LFxuICAgICAgICBwID0gdGhpcy5zdHJpbmdpZnkgPSBmdW5jdGlvbiAoZSwgdCwgbiwgcikge1xuICAgICAgciA9IE9iamVjdC5hc3NpZ24oe30sIG8sIHIsIHsgc3RyaW5naWZpY2F0aW9uOiAhMCB9KTt2YXIgcyA9IHkoZSwgbnVsbCwgcik7cmV0dXJuIGkocykgPyBKU09OLnN0cmluZ2lmeShzWzBdLCB0LCBuKSA6IHMudGhlbihmdW5jdGlvbiAoZSkge1xuICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkoZSwgdCwgbik7XG4gICAgICB9KTtcbiAgICB9O3RoaXMuc3RyaW5naWZ5U3luYyA9IGZ1bmN0aW9uIChlLCB0LCBuLCByKSB7XG4gICAgICByZXR1cm4gcChlLCB0LCBuLCBPYmplY3QuYXNzaWduKHt9LCB7IHRocm93T25CYWRTeW5jVHlwZTogITAgfSwgciwgeyBzeW5jOiAhMCB9KSk7XG4gICAgfSwgdGhpcy5zdHJpbmdpZnlBc3luYyA9IGZ1bmN0aW9uIChlLCB0LCBuLCByKSB7XG4gICAgICByZXR1cm4gcChlLCB0LCBuLCBPYmplY3QuYXNzaWduKHt9LCB7IHRocm93T25CYWRTeW5jVHlwZTogITAgfSwgciwgeyBzeW5jOiAhMSB9KSk7XG4gICAgfTt2YXIgbCA9IHRoaXMucGFyc2UgPSBmdW5jdGlvbiAoZSwgdCwgbikge1xuICAgICAgcmV0dXJuIG4gPSBPYmplY3QuYXNzaWduKHt9LCBvLCBuLCB7IHBhcnNlOiAhMCB9KSwgdihKU09OLnBhcnNlKGUsIHQpLCBuKTtcbiAgICB9O3RoaXMucGFyc2VTeW5jID0gZnVuY3Rpb24gKGUsIHQsIG4pIHtcbiAgICAgIHJldHVybiBsKGUsIHQsIE9iamVjdC5hc3NpZ24oe30sIHsgdGhyb3dPbkJhZFN5bmNUeXBlOiAhMCB9LCBuLCB7IHN5bmM6ICEwIH0pKTtcbiAgICB9LCB0aGlzLnBhcnNlQXN5bmMgPSBmdW5jdGlvbiAoZSwgdCwgbikge1xuICAgICAgcmV0dXJuIGwoZSwgdCwgT2JqZWN0LmFzc2lnbih7fSwgeyB0aHJvd09uQmFkU3luY1R5cGU6ICEwIH0sIG4sIHsgc3luYzogITEgfSkpO1xuICAgIH0sIHRoaXMuc3BlY2lhbFR5cGVOYW1lcyA9IGZ1bmN0aW9uIChlLCB0KSB7XG4gICAgICB2YXIgbiA9IGFyZ3VtZW50cy5sZW5ndGggPiAyICYmIHZvaWQgMCAhPT0gYXJndW1lbnRzWzJdID8gYXJndW1lbnRzWzJdIDoge307cmV0dXJuIG4ucmV0dXJuVHlwZU5hbWVzID0gITAsIHRoaXMuZW5jYXBzdWxhdGUoZSwgdCwgbik7XG4gICAgfSwgdGhpcy5yb290VHlwZU5hbWUgPSBmdW5jdGlvbiAoZSwgdCkge1xuICAgICAgdmFyIG4gPSBhcmd1bWVudHMubGVuZ3RoID4gMiAmJiB2b2lkIDAgIT09IGFyZ3VtZW50c1syXSA/IGFyZ3VtZW50c1syXSA6IHt9O3JldHVybiBuLml0ZXJhdGVOb25lID0gITAsIHRoaXMuZW5jYXBzdWxhdGUoZSwgdCwgbik7XG4gICAgfTt2YXIgeSA9IHRoaXMuZW5jYXBzdWxhdGUgPSBmdW5jdGlvbiAoZiwgcCwgbCkge1xuICAgICAgdmFyIHkgPSAobCA9IE9iamVjdC5hc3NpZ24oeyBzeW5jOiAhMCB9LCBvLCBsKSkuc3luYyxcbiAgICAgICAgICB2ID0ge30sXG4gICAgICAgICAgZCA9IFtdLFxuICAgICAgICAgIGggPSBbXSxcbiAgICAgICAgICBiID0gW10sXG4gICAgICAgICAgZyA9ICEobCAmJiBcImN5Y2xpY1wiIGluIGwpIHx8IGwuY3ljbGljLFxuICAgICAgICAgIG0gPSBsLmVuY2Fwc3VsYXRlT2JzZXJ2ZXIsXG4gICAgICAgICAgVCA9IF9lbmNhcHN1bGF0ZShcIlwiLCBmLCBnLCBwIHx8IHt9LCBiKTtmdW5jdGlvbiBmaW5pc2goZSkge1xuICAgICAgICB2YXIgdCA9IE9iamVjdC52YWx1ZXModik7aWYgKGwuaXRlcmF0ZU5vbmUpIHJldHVybiB0Lmxlbmd0aCA/IHRbMF0gOiBUeXBlc29uLmdldEpTT05UeXBlKGUpO2lmICh0Lmxlbmd0aCkge1xuICAgICAgICAgIGlmIChsLnJldHVyblR5cGVOYW1lcykgcmV0dXJuIFtdLmNvbmNhdChuKG5ldyBTZXQodCkpKTtlICYmIGlzUGxhaW5PYmplY3QoZSkgJiYgIWUuaGFzT3duUHJvcGVydHkoXCIkdHlwZXNcIikgPyBlLiR0eXBlcyA9IHYgOiBlID0geyAkOiBlLCAkdHlwZXM6IHsgJDogdiB9IH07XG4gICAgICAgIH0gZWxzZSBpc09iamVjdChlKSAmJiBlLmhhc093blByb3BlcnR5KFwiJHR5cGVzXCIpICYmIChlID0geyAkOiBlLCAkdHlwZXM6ICEwIH0pO3JldHVybiAhbC5yZXR1cm5UeXBlTmFtZXMgJiYgZTtcbiAgICAgIH1yZXR1cm4gYi5sZW5ndGggPyB5ICYmIGwudGhyb3dPbkJhZFN5bmNUeXBlID8gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3luYyBtZXRob2QgcmVxdWVzdGVkIGJ1dCBhc3luYyByZXN1bHQgb2J0YWluZWRcIik7XG4gICAgICB9KCkgOiBQcm9taXNlLnJlc29sdmUoZnVuY3Rpb24gY2hlY2tQcm9taXNlcyhlLCBuKSB7XG4gICAgICAgIHJldHVybiBQcm9taXNlLmFsbChuLm1hcChmdW5jdGlvbiAoZSkge1xuICAgICAgICAgIHJldHVybiBlWzFdLnA7XG4gICAgICAgIH0pKS50aGVuKGZ1bmN0aW9uIChyKSB7XG4gICAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKHIubWFwKGZ1bmN0aW9uIChyKSB7XG4gICAgICAgICAgICB2YXIgaSA9IFtdLFxuICAgICAgICAgICAgICAgIG8gPSBuLnNwbGljZSgwLCAxKVswXSxcbiAgICAgICAgICAgICAgICBzID0gdChvLCA3KSxcbiAgICAgICAgICAgICAgICBhID0gc1swXSxcbiAgICAgICAgICAgICAgICBjID0gc1syXSxcbiAgICAgICAgICAgICAgICB1ID0gc1szXSxcbiAgICAgICAgICAgICAgICBmID0gc1s0XSxcbiAgICAgICAgICAgICAgICBwID0gc1s1XSxcbiAgICAgICAgICAgICAgICBsID0gc1s2XSxcbiAgICAgICAgICAgICAgICB5ID0gX2VuY2Fwc3VsYXRlKGEsIHIsIGMsIHUsIGksICEwLCBsKSxcbiAgICAgICAgICAgICAgICB2ID0gaGFzQ29uc3RydWN0b3JPZih5LCBUeXBlc29uUHJvbWlzZSk7cmV0dXJuIGEgJiYgdiA/IHkucC50aGVuKGZ1bmN0aW9uICh0KSB7XG4gICAgICAgICAgICAgIHJldHVybiBmW3BdID0gdCwgY2hlY2tQcm9taXNlcyhlLCBpKTtcbiAgICAgICAgICAgIH0pIDogKGEgPyBmW3BdID0geSA6IGUgPSB2ID8geS5wIDogeSwgY2hlY2tQcm9taXNlcyhlLCBpKSk7XG4gICAgICAgICAgfSkpO1xuICAgICAgICB9KS50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICByZXR1cm4gZTtcbiAgICAgICAgfSk7XG4gICAgICB9KFQsIGIpKS50aGVuKGZpbmlzaCkgOiAheSAmJiBsLnRocm93T25CYWRTeW5jVHlwZSA/IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkFzeW5jIG1ldGhvZCByZXF1ZXN0ZWQgYnV0IHN5bmMgcmVzdWx0IG9idGFpbmVkXCIpO1xuICAgICAgfSgpIDogbC5zdHJpbmdpZmljYXRpb24gJiYgeSA/IFtmaW5pc2goVCldIDogeSA/IGZpbmlzaChUKSA6IFByb21pc2UucmVzb2x2ZShmaW5pc2goVCkpO2Z1bmN0aW9uIF9hZGFwdEJ1aWx0aW5TdGF0ZU9iamVjdFByb3BlcnRpZXMoZSwgdCwgbikge1xuICAgICAgICBPYmplY3QuYXNzaWduKGUsIHQpO3ZhciByID0gdS5tYXAoZnVuY3Rpb24gKHQpIHtcbiAgICAgICAgICB2YXIgbiA9IGVbdF07cmV0dXJuIGRlbGV0ZSBlW3RdLCBuO1xuICAgICAgICB9KTtuKCksIHUuZm9yRWFjaChmdW5jdGlvbiAodCwgbikge1xuICAgICAgICAgIGVbdF0gPSByW25dO1xuICAgICAgICB9KTtcbiAgICAgIH1mdW5jdGlvbiBfZW5jYXBzdWxhdGUodCwgbiwgbywgYSwgYywgdSwgZikge1xuICAgICAgICB2YXIgcCA9IHZvaWQgMCxcbiAgICAgICAgICAgIHkgPSB7fSxcbiAgICAgICAgICAgIGIgPSB2b2lkIDAgPT09IG4gPyBcInVuZGVmaW5lZFwiIDogZShuKSxcbiAgICAgICAgICAgIGcgPSBtID8gZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICB2YXIgciA9IGYgfHwgYS50eXBlIHx8IFR5cGVzb24uZ2V0SlNPTlR5cGUobik7bShPYmplY3QuYXNzaWduKGUgfHwgeSwgeyBrZXlwYXRoOiB0LCB2YWx1ZTogbiwgY3ljbGljOiBvLCBzdGF0ZU9iajogYSwgcHJvbWlzZXNEYXRhOiBjLCByZXNvbHZpbmdUeXBlc29uUHJvbWlzZTogdSwgYXdhaXRpbmdUeXBlc29uUHJvbWlzZTogaGFzQ29uc3RydWN0b3JPZihuLCBUeXBlc29uUHJvbWlzZSkgfSwgdm9pZCAwICE9PSByID8geyB0eXBlOiByIH0gOiB7fSkpO1xuICAgICAgICB9IDogbnVsbDtpZiAoYiBpbiB7IHN0cmluZzogMSwgYm9vbGVhbjogMSwgbnVtYmVyOiAxLCB1bmRlZmluZWQ6IDEgfSkgcmV0dXJuIHZvaWQgMCA9PT0gbiB8fCBcIm51bWJlclwiID09PSBiICYmIChpc05hTihuKSB8fCBuID09PSAtMSAvIDAgfHwgbiA9PT0gMSAvIDApID8gKHAgPSByZXBsYWNlKHQsIG4sIGEsIGMsICExLCB1LCBnKSkgIT09IG4gJiYgKHkgPSB7IHJlcGxhY2VkOiBwIH0pIDogcCA9IG4sIGcgJiYgZygpLCBwO2lmIChudWxsID09PSBuKSByZXR1cm4gZyAmJiBnKCksIG47aWYgKG8gJiYgIWEuaXRlcmF0ZUluICYmICFhLml0ZXJhdGVVbnNldE51bWVyaWMpIHtcbiAgICAgICAgICB2YXIgVCA9IGQuaW5kZXhPZihuKTtpZiAoIShUIDwgMCkpIHJldHVybiB2W3RdID0gXCIjXCIsIGcgJiYgZyh7IGN5Y2xpY0tleXBhdGg6IGhbVF0gfSksIFwiI1wiICsgaFtUXTshMCA9PT0gbyAmJiAoZC5wdXNoKG4pLCBoLnB1c2godCkpO1xuICAgICAgICB9dmFyIE8gPSBpc1BsYWluT2JqZWN0KG4pLFxuICAgICAgICAgICAgdyA9IGkobiksXG4gICAgICAgICAgICBTID0gKE8gfHwgdykgJiYgKCFzLmxlbmd0aCB8fCBhLnJlcGxhY2VkKSB8fCBhLml0ZXJhdGVJbiA/IG4gOiByZXBsYWNlKHQsIG4sIGEsIGMsIE8gfHwgdywgbnVsbCwgZyksXG4gICAgICAgICAgICBQID0gdm9pZCAwO2lmIChTICE9PSBuID8gKHAgPSBTLCB5ID0geyByZXBsYWNlZDogUyB9KSA6IHcgfHwgXCJhcnJheVwiID09PSBhLml0ZXJhdGVJbiA/IChQID0gbmV3IEFycmF5KG4ubGVuZ3RoKSwgeSA9IHsgY2xvbmU6IFAgfSkgOiBPIHx8IFwib2JqZWN0XCIgPT09IGEuaXRlcmF0ZUluID8geSA9IHsgY2xvbmU6IFAgPSB7fSB9IDogXCJcIiA9PT0gdCAmJiBoYXNDb25zdHJ1Y3Rvck9mKG4sIFR5cGVzb25Qcm9taXNlKSA/IChjLnB1c2goW3QsIG4sIG8sIGEsIHZvaWQgMCwgdm9pZCAwLCBhLnR5cGVdKSwgcCA9IG4pIDogcCA9IG4sIGcgJiYgZygpLCBsLml0ZXJhdGVOb25lKSByZXR1cm4gUCB8fCBwO2lmICghUCkgcmV0dXJuIHA7aWYgKGEuaXRlcmF0ZUluKSB7XG4gICAgICAgICAgdmFyIGogPSBmdW5jdGlvbiBfbG9vcChlKSB7XG4gICAgICAgICAgICB2YXIgciA9IHsgb3duS2V5czogbi5oYXNPd25Qcm9wZXJ0eShlKSB9O19hZGFwdEJ1aWx0aW5TdGF0ZU9iamVjdFByb3BlcnRpZXMoYSwgciwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICB2YXIgciA9IHQgKyAodCA/IFwiLlwiIDogXCJcIikgKyBlc2NhcGVLZXlQYXRoQ29tcG9uZW50KGUpLFxuICAgICAgICAgICAgICAgICAgaSA9IF9lbmNhcHN1bGF0ZShyLCBuW2VdLCAhIW8sIGEsIGMsIHUpO2hhc0NvbnN0cnVjdG9yT2YoaSwgVHlwZXNvblByb21pc2UpID8gYy5wdXNoKFtyLCBpLCAhIW8sIGEsIFAsIGUsIGEudHlwZV0pIDogdm9pZCAwICE9PSBpICYmIChQW2VdID0gaSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9O2ZvciAodmFyIEEgaW4gbikge1xuICAgICAgICAgICAgaihBKTtcbiAgICAgICAgICB9ZyAmJiBnKHsgZW5kSXRlcmF0ZUluOiAhMCwgZW5kOiAhMCB9KTtcbiAgICAgICAgfSBlbHNlIHIobikuZm9yRWFjaChmdW5jdGlvbiAoZSkge1xuICAgICAgICAgIHZhciByID0gdCArICh0ID8gXCIuXCIgOiBcIlwiKSArIGVzY2FwZUtleVBhdGhDb21wb25lbnQoZSk7X2FkYXB0QnVpbHRpblN0YXRlT2JqZWN0UHJvcGVydGllcyhhLCB7IG93bktleXM6ICEwIH0sIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciB0ID0gX2VuY2Fwc3VsYXRlKHIsIG5bZV0sICEhbywgYSwgYywgdSk7aGFzQ29uc3RydWN0b3JPZih0LCBUeXBlc29uUHJvbWlzZSkgPyBjLnB1c2goW3IsIHQsICEhbywgYSwgUCwgZSwgYS50eXBlXSkgOiB2b2lkIDAgIT09IHQgJiYgKFBbZV0gPSB0KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSksIGcgJiYgZyh7IGVuZEl0ZXJhdGVPd246ICEwLCBlbmQ6ICEwIH0pO2lmIChhLml0ZXJhdGVVbnNldE51bWVyaWMpIHtcbiAgICAgICAgICBmb3IgKHZhciBDID0gbi5sZW5ndGgsIE4gPSBmdW5jdGlvbiBfbG9vcDIoZSkge1xuICAgICAgICAgICAgaWYgKCEoZSBpbiBuKSkge1xuICAgICAgICAgICAgICB2YXIgciA9IHQgKyAodCA/IFwiLlwiIDogXCJcIikgKyBlO19hZGFwdEJ1aWx0aW5TdGF0ZU9iamVjdFByb3BlcnRpZXMoYSwgeyBvd25LZXlzOiAhMSB9LCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdmFyIHQgPSBfZW5jYXBzdWxhdGUociwgdm9pZCAwLCAhIW8sIGEsIGMsIHUpO2hhc0NvbnN0cnVjdG9yT2YodCwgVHlwZXNvblByb21pc2UpID8gYy5wdXNoKFtyLCB0LCAhIW8sIGEsIFAsIGUsIGEudHlwZV0pIDogdm9pZCAwICE9PSB0ICYmIChQW2VdID0gdCk7XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sIEIgPSAwOyBCIDwgQzsgQisrKSB7XG4gICAgICAgICAgICBOKEIpO1xuICAgICAgICAgIH1nICYmIGcoeyBlbmRJdGVyYXRlVW5zZXROdW1lcmljOiAhMCwgZW5kOiAhMCB9KTtcbiAgICAgICAgfXJldHVybiBQO1xuICAgICAgfWZ1bmN0aW9uIHJlcGxhY2UoZSwgdCwgbiwgciwgaSwgbywgdSkge1xuICAgICAgICBmb3IgKHZhciBmID0gaSA/IHMgOiBhLCBwID0gZi5sZW5ndGg7IHAtLTspIHtcbiAgICAgICAgICB2YXIgbCA9IGZbcF07aWYgKGwudGVzdCh0LCBuKSkge1xuICAgICAgICAgICAgdmFyIGQgPSBsLnR5cGU7aWYgKGNbZF0pIHtcbiAgICAgICAgICAgICAgdmFyIGggPSB2W2VdO3ZbZV0gPSBoID8gW2RdLmNvbmNhdChoKSA6IGQ7XG4gICAgICAgICAgICB9cmV0dXJuIE9iamVjdC5hc3NpZ24obiwgeyB0eXBlOiBkLCByZXBsYWNlZDogITAgfSksICF5ICYmIGwucmVwbGFjZUFzeW5jIHx8IGwucmVwbGFjZSA/ICh1ICYmIHUoeyByZXBsYWNpbmc6ICEwIH0pLCBfZW5jYXBzdWxhdGUoZSwgbFt5IHx8ICFsLnJlcGxhY2VBc3luYyA/IFwicmVwbGFjZVwiIDogXCJyZXBsYWNlQXN5bmNcIl0odCwgbiksIGcgJiYgXCJyZWFkb25seVwiLCBuLCByLCBvLCBkKSkgOiAodSAmJiB1KHsgdHlwZURldGVjdGVkOiAhMCB9KSwgX2VuY2Fwc3VsYXRlKGUsIHQsIGcgJiYgXCJyZWFkb25seVwiLCBuLCByLCBvLCBkKSk7XG4gICAgICAgICAgfVxuICAgICAgICB9cmV0dXJuIHQ7XG4gICAgICB9XG4gICAgfTt0aGlzLmVuY2Fwc3VsYXRlU3luYyA9IGZ1bmN0aW9uIChlLCB0LCBuKSB7XG4gICAgICByZXR1cm4geShlLCB0LCBPYmplY3QuYXNzaWduKHt9LCB7IHRocm93T25CYWRTeW5jVHlwZTogITAgfSwgbiwgeyBzeW5jOiAhMCB9KSk7XG4gICAgfSwgdGhpcy5lbmNhcHN1bGF0ZUFzeW5jID0gZnVuY3Rpb24gKGUsIHQsIG4pIHtcbiAgICAgIHJldHVybiB5KGUsIHQsIE9iamVjdC5hc3NpZ24oe30sIHsgdGhyb3dPbkJhZFN5bmNUeXBlOiAhMCB9LCBuLCB7IHN5bmM6ICExIH0pKTtcbiAgICB9O3ZhciB2ID0gdGhpcy5yZXZpdmUgPSBmdW5jdGlvbiAoZSwgbikge1xuICAgICAgdmFyIHMgPSAobiA9IE9iamVjdC5hc3NpZ24oeyBzeW5jOiAhMCB9LCBvLCBuKSkuc3luYyxcbiAgICAgICAgICBhID0gZSAmJiBlLiR0eXBlcyxcbiAgICAgICAgICB1ID0gITA7aWYgKCFhKSByZXR1cm4gZTtpZiAoITAgPT09IGEpIHJldHVybiBlLiQ7YS4kICYmIGlzUGxhaW5PYmplY3QoYS4kKSAmJiAoZSA9IGUuJCwgYSA9IGEuJCwgdSA9ICExKTt2YXIgZiA9IFtdLFxuICAgICAgICAgIHAgPSB7fSxcbiAgICAgICAgICBsID0gZnVuY3Rpb24gX3Jldml2ZShlLCBuLCBvLCBzLCBsLCB5KSB7XG4gICAgICAgIGlmICh1ICYmIFwiJHR5cGVzXCIgPT09IGUpIHJldHVybjt2YXIgdiA9IGFbZV07aWYgKGkobikgfHwgaXNQbGFpbk9iamVjdChuKSkge1xuICAgICAgICAgIHZhciBkID0gaShuKSA/IG5ldyBBcnJheShuLmxlbmd0aCkgOiB7fTtmb3IgKHIobikuZm9yRWFjaChmdW5jdGlvbiAodCkge1xuICAgICAgICAgICAgdmFyIHIgPSBfcmV2aXZlKGUgKyAoZSA/IFwiLlwiIDogXCJcIikgKyBlc2NhcGVLZXlQYXRoQ29tcG9uZW50KHQpLCBuW3RdLCBvIHx8IGQsIHMsIGQsIHQpO2hhc0NvbnN0cnVjdG9yT2YociwgVW5kZWZpbmVkKSA/IGRbdF0gPSB2b2lkIDAgOiB2b2lkIDAgIT09IHIgJiYgKGRbdF0gPSByKTtcbiAgICAgICAgICB9KSwgbiA9IGQ7IGYubGVuZ3RoOykge1xuICAgICAgICAgICAgdmFyIGggPSB0KGZbMF0sIDQpLFxuICAgICAgICAgICAgICAgIGIgPSBoWzBdLFxuICAgICAgICAgICAgICAgIGcgPSBoWzFdLFxuICAgICAgICAgICAgICAgIG0gPSBoWzJdLFxuICAgICAgICAgICAgICAgIFQgPSBoWzNdLFxuICAgICAgICAgICAgICAgIE8gPSBnZXRCeUtleVBhdGgoYiwgZyk7aWYgKGhhc0NvbnN0cnVjdG9yT2YoTywgVW5kZWZpbmVkKSkgbVtUXSA9IHZvaWQgMDtlbHNlIHtcbiAgICAgICAgICAgICAgaWYgKHZvaWQgMCA9PT0gTykgYnJlYWs7bVtUXSA9IE87XG4gICAgICAgICAgICB9Zi5zcGxpY2UoMCwgMSk7XG4gICAgICAgICAgfVxuICAgICAgICB9aWYgKCF2KSByZXR1cm4gbjtpZiAoXCIjXCIgPT09IHYpIHtcbiAgICAgICAgICB2YXIgdyA9IGdldEJ5S2V5UGF0aChvLCBuLnN1YnN0cigxKSk7cmV0dXJuIHZvaWQgMCA9PT0gdyAmJiBmLnB1c2goW28sIG4uc3Vic3RyKDEpLCBsLCB5XSksIHc7XG4gICAgICAgIH12YXIgUyA9IHMuc3luYztyZXR1cm4gW10uY29uY2F0KHYpLnJlZHVjZShmdW5jdGlvbiAoZSwgdCkge1xuICAgICAgICAgIHZhciBuID0gY1t0XTtpZiAoIW4pIHRocm93IG5ldyBFcnJvcihcIlVucmVnaXN0ZXJlZCB0eXBlOiBcIiArIHQpO3JldHVybiBuW1MgJiYgbi5yZXZpdmUgPyBcInJldml2ZVwiIDogIVMgJiYgbi5yZXZpdmVBc3luYyA/IFwicmV2aXZlQXN5bmNcIiA6IFwicmV2aXZlXCJdKGUsIHApO1xuICAgICAgICB9LCBuKTtcbiAgICAgIH0oXCJcIiwgZSwgbnVsbCwgbik7cmV0dXJuIGlzVGhlbmFibGUobCA9IGhhc0NvbnN0cnVjdG9yT2YobCwgVW5kZWZpbmVkKSA/IHZvaWQgMCA6IGwpID8gcyAmJiBuLnRocm93T25CYWRTeW5jVHlwZSA/IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bmMgbWV0aG9kIHJlcXVlc3RlZCBidXQgYXN5bmMgcmVzdWx0IG9idGFpbmVkXCIpO1xuICAgICAgfSgpIDogbCA6ICFzICYmIG4udGhyb3dPbkJhZFN5bmNUeXBlID8gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQXN5bmMgbWV0aG9kIHJlcXVlc3RlZCBidXQgc3luYyByZXN1bHQgb2J0YWluZWRcIik7XG4gICAgICB9KCkgOiBzID8gbCA6IFByb21pc2UucmVzb2x2ZShsKTtcbiAgICB9O3RoaXMucmV2aXZlU3luYyA9IGZ1bmN0aW9uIChlLCB0KSB7XG4gICAgICByZXR1cm4gdihlLCBPYmplY3QuYXNzaWduKHt9LCB7IHRocm93T25CYWRTeW5jVHlwZTogITAgfSwgdCwgeyBzeW5jOiAhMCB9KSk7XG4gICAgfSwgdGhpcy5yZXZpdmVBc3luYyA9IGZ1bmN0aW9uIChlLCB0KSB7XG4gICAgICByZXR1cm4gdihlLCBPYmplY3QuYXNzaWduKHt9LCB7IHRocm93T25CYWRTeW5jVHlwZTogITAgfSwgdCwgeyBzeW5jOiAhMSB9KSk7XG4gICAgfSwgdGhpcy5yZWdpc3RlciA9IGZ1bmN0aW9uIChlLCB0KSB7XG4gICAgICByZXR1cm4gdCA9IHQgfHwge30sIFtdLmNvbmNhdChlKS5mb3JFYWNoKGZ1bmN0aW9uIFIoZSkge1xuICAgICAgICBpZiAoaShlKSkgcmV0dXJuIGUubWFwKFIpO2UgJiYgcihlKS5mb3JFYWNoKGZ1bmN0aW9uIChuKSB7XG4gICAgICAgICAgaWYgKFwiI1wiID09PSBuKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiIyBjYW5ub3QgYmUgdXNlZCBhcyBhIHR5cGUgbmFtZSBhcyBpdCBpcyByZXNlcnZlZCBmb3IgY3ljbGljIG9iamVjdHNcIik7aWYgKFR5cGVzb24uSlNPTl9UWVBFUy5pbmNsdWRlcyhuKSkgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlBsYWluIEpTT04gb2JqZWN0IHR5cGVzIGFyZSByZXNlcnZlZCBhcyB0eXBlIG5hbWVzXCIpO3ZhciByID0gZVtuXSxcbiAgICAgICAgICAgICAgbyA9IHIudGVzdFBsYWluT2JqZWN0cyA/IHMgOiBhLFxuICAgICAgICAgICAgICB1ID0gby5maWx0ZXIoZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIHJldHVybiBlLnR5cGUgPT09IG47XG4gICAgICAgICAgfSk7aWYgKHUubGVuZ3RoICYmIChvLnNwbGljZShvLmluZGV4T2YodVswXSksIDEpLCBkZWxldGUgY1tuXSwgZGVsZXRlIGZbbl0pLCByKSB7XG4gICAgICAgICAgICBpZiAoXCJmdW5jdGlvblwiID09IHR5cGVvZiByKSB7XG4gICAgICAgICAgICAgIHZhciBwID0gcjtyID0geyB0ZXN0OiBmdW5jdGlvbiB0ZXN0KGUpIHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiBlICYmIGUuY29uc3RydWN0b3IgPT09IHA7XG4gICAgICAgICAgICAgICAgfSwgcmVwbGFjZTogZnVuY3Rpb24gcmVwbGFjZShlKSB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gYXNzaWduKHt9LCBlKTtcbiAgICAgICAgICAgICAgICB9LCByZXZpdmU6IGZ1bmN0aW9uIHJldml2ZShlKSB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gYXNzaWduKE9iamVjdC5jcmVhdGUocC5wcm90b3R5cGUpLCBlKTtcbiAgICAgICAgICAgICAgICB9IH07XG4gICAgICAgICAgICB9IGVsc2UgaShyKSAmJiAociA9IHsgdGVzdDogclswXSwgcmVwbGFjZTogclsxXSwgcmV2aXZlOiByWzJdIH0pO3ZhciBsID0geyB0eXBlOiBuLCB0ZXN0OiByLnRlc3QuYmluZChyKSB9O3IucmVwbGFjZSAmJiAobC5yZXBsYWNlID0gci5yZXBsYWNlLmJpbmQocikpLCByLnJlcGxhY2VBc3luYyAmJiAobC5yZXBsYWNlQXN5bmMgPSByLnJlcGxhY2VBc3luYy5iaW5kKHIpKTt2YXIgeSA9IFwibnVtYmVyXCIgPT0gdHlwZW9mIHQuZmFsbGJhY2sgPyB0LmZhbGxiYWNrIDogdC5mYWxsYmFjayA/IDAgOiAxIC8gMDtpZiAoci50ZXN0UGxhaW5PYmplY3RzID8gcy5zcGxpY2UoeSwgMCwgbCkgOiBhLnNwbGljZSh5LCAwLCBsKSwgci5yZXZpdmUgfHwgci5yZXZpdmVBc3luYykge1xuICAgICAgICAgICAgICB2YXIgdiA9IHt9O3IucmV2aXZlICYmICh2LnJldml2ZSA9IHIucmV2aXZlLmJpbmQocikpLCByLnJldml2ZUFzeW5jICYmICh2LnJldml2ZUFzeW5jID0gci5yZXZpdmVBc3luYy5iaW5kKHIpKSwgY1tuXSA9IHY7XG4gICAgICAgICAgICB9ZltuXSA9IHI7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0pLCB0aGlzO1xuICAgIH07XG4gIH1mdW5jdGlvbiBhc3NpZ24oZSwgdCkge1xuICAgIHJldHVybiByKHQpLm1hcChmdW5jdGlvbiAobikge1xuICAgICAgZVtuXSA9IHRbbl07XG4gICAgfSksIGU7XG4gIH1mdW5jdGlvbiBlc2NhcGVLZXlQYXRoQ29tcG9uZW50KGUpIHtcbiAgICByZXR1cm4gZS5yZXBsYWNlKC9+L2csIFwifjBcIikucmVwbGFjZSgvXFwuL2csIFwifjFcIik7XG4gIH1mdW5jdGlvbiB1bmVzY2FwZUtleVBhdGhDb21wb25lbnQoZSkge1xuICAgIHJldHVybiBlLnJlcGxhY2UoL34xL2csIFwiLlwiKS5yZXBsYWNlKC9+MC9nLCBcIn5cIik7XG4gIH1mdW5jdGlvbiBnZXRCeUtleVBhdGgoZSwgdCkge1xuICAgIGlmIChcIlwiID09PSB0KSByZXR1cm4gZTt2YXIgbiA9IHQuaW5kZXhPZihcIi5cIik7aWYgKG4gPiAtMSkge1xuICAgICAgdmFyIHIgPSBlW3VuZXNjYXBlS2V5UGF0aENvbXBvbmVudCh0LnN1YnN0cigwLCBuKSldO3JldHVybiB2b2lkIDAgPT09IHIgPyB2b2lkIDAgOiBnZXRCeUtleVBhdGgociwgdC5zdWJzdHIobiArIDEpKTtcbiAgICB9cmV0dXJuIGVbdW5lc2NhcGVLZXlQYXRoQ29tcG9uZW50KHQpXTtcbiAgfWZ1bmN0aW9uIFVuZGVmaW5lZCgpIHt9ZnVuY3Rpb24gVHlwZXNvblByb21pc2UoZSkge1xuICAgIHRoaXMucCA9IG5ldyBQcm9taXNlKGUpO1xuICB9VHlwZXNvblByb21pc2UucHJvdG90eXBlLnRoZW4gPSBmdW5jdGlvbiAoZSwgdCkge1xuICAgIHZhciBuID0gdGhpcztyZXR1cm4gbmV3IFR5cGVzb25Qcm9taXNlKGZ1bmN0aW9uIChyLCBpKSB7XG4gICAgICBuLnAudGhlbihmdW5jdGlvbiAodCkge1xuICAgICAgICByKGUgPyBlKHQpIDogdCk7XG4gICAgICB9LCBmdW5jdGlvbiAoZSkge1xuICAgICAgICBuLnAuY2F0Y2goZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICByZXR1cm4gdCA/IHQoZSkgOiBQcm9taXNlLnJlamVjdChlKTtcbiAgICAgICAgfSkudGhlbihyLCBpKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9LCBUeXBlc29uUHJvbWlzZS5wcm90b3R5cGUuY2F0Y2ggPSBmdW5jdGlvbiAoZSkge1xuICAgIHJldHVybiB0aGlzLnRoZW4obnVsbCwgZSk7XG4gIH0sIFR5cGVzb25Qcm9taXNlLnJlc29sdmUgPSBmdW5jdGlvbiAoZSkge1xuICAgIHJldHVybiBuZXcgVHlwZXNvblByb21pc2UoZnVuY3Rpb24gKHQpIHtcbiAgICAgIHQoZSk7XG4gICAgfSk7XG4gIH0sIFR5cGVzb25Qcm9taXNlLnJlamVjdCA9IGZ1bmN0aW9uIChlKSB7XG4gICAgcmV0dXJuIG5ldyBUeXBlc29uUHJvbWlzZShmdW5jdGlvbiAodCwgbikge1xuICAgICAgbihlKTtcbiAgICB9KTtcbiAgfSwgW1wiYWxsXCIsIFwicmFjZVwiXS5tYXAoZnVuY3Rpb24gKGUpIHtcbiAgICBUeXBlc29uUHJvbWlzZVtlXSA9IGZ1bmN0aW9uICh0KSB7XG4gICAgICByZXR1cm4gbmV3IFR5cGVzb25Qcm9taXNlKGZ1bmN0aW9uIChuLCByKSB7XG4gICAgICAgIFByb21pc2VbZV0odC5tYXAoZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICByZXR1cm4gZS5wO1xuICAgICAgICB9KSkudGhlbihuLCByKTtcbiAgICAgIH0pO1xuICAgIH07XG4gIH0pLCBUeXBlc29uLlVuZGVmaW5lZCA9IFVuZGVmaW5lZCwgVHlwZXNvbi5Qcm9taXNlID0gVHlwZXNvblByb21pc2UsIFR5cGVzb24uaXNUaGVuYWJsZSA9IGlzVGhlbmFibGUsIFR5cGVzb24udG9TdHJpbmdUYWcgPSB0b1N0cmluZ1RhZywgVHlwZXNvbi5oYXNDb25zdHJ1Y3Rvck9mID0gaGFzQ29uc3RydWN0b3JPZiwgVHlwZXNvbi5pc09iamVjdCA9IGlzT2JqZWN0LCBUeXBlc29uLmlzUGxhaW5PYmplY3QgPSBpc1BsYWluT2JqZWN0LCBUeXBlc29uLmlzVXNlck9iamVjdCA9IGZ1bmN0aW9uIGlzVXNlck9iamVjdChlKSB7XG4gICAgaWYgKCFlIHx8IFwiT2JqZWN0XCIgIT09IHRvU3RyaW5nVGFnKGUpKSByZXR1cm4gITE7dmFyIHQgPSBzKGUpO3JldHVybiAhdCB8fCBoYXNDb25zdHJ1Y3Rvck9mKGUsIE9iamVjdCkgfHwgaXNVc2VyT2JqZWN0KHQpO1xuICB9LCBUeXBlc29uLmVzY2FwZUtleVBhdGhDb21wb25lbnQgPSBlc2NhcGVLZXlQYXRoQ29tcG9uZW50LCBUeXBlc29uLnVuZXNjYXBlS2V5UGF0aENvbXBvbmVudCA9IHVuZXNjYXBlS2V5UGF0aENvbXBvbmVudCwgVHlwZXNvbi5nZXRCeUtleVBhdGggPSBnZXRCeUtleVBhdGgsIFR5cGVzb24uZ2V0SlNPTlR5cGUgPSBmdW5jdGlvbiAodCkge1xuICAgIHJldHVybiBudWxsID09PSB0ID8gXCJudWxsXCIgOiBpKHQpID8gXCJhcnJheVwiIDogdm9pZCAwID09PSB0ID8gXCJ1bmRlZmluZWRcIiA6IGUodCk7XG4gIH0sIFR5cGVzb24uSlNPTl9UWVBFUyA9IFtcIm51bGxcIiwgXCJib29sZWFuXCIsIFwibnVtYmVyXCIsIFwic3RyaW5nXCIsIFwiYXJyYXlcIiwgXCJvYmplY3RcIl07Zm9yICh2YXIgZiA9IHsgdXNlck9iamVjdDogeyB0ZXN0OiBmdW5jdGlvbiB0ZXN0KGUsIHQpIHtcbiAgICAgICAgcmV0dXJuIFR5cGVzb24uaXNVc2VyT2JqZWN0KGUpO1xuICAgICAgfSwgcmVwbGFjZTogZnVuY3Rpb24gcmVwbGFjZShlKSB7XG4gICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBlKTtcbiAgICAgIH0sIHJldml2ZTogZnVuY3Rpb24gcmV2aXZlKGUpIHtcbiAgICAgICAgcmV0dXJuIGU7XG4gICAgICB9IH0gfSwgcCA9IFtbeyBzcGFyc2VBcnJheXM6IHsgdGVzdFBsYWluT2JqZWN0czogITAsIHRlc3Q6IGZ1bmN0aW9uIHRlc3QoZSkge1xuICAgICAgICByZXR1cm4gQXJyYXkuaXNBcnJheShlKTtcbiAgICAgIH0sIHJlcGxhY2U6IGZ1bmN0aW9uIHJlcGxhY2UoZSwgdCkge1xuICAgICAgICByZXR1cm4gdC5pdGVyYXRlVW5zZXROdW1lcmljID0gITAsIGU7XG4gICAgICB9IH0gfSwgeyBzcGFyc2VVbmRlZmluZWQ6IHsgdGVzdDogZnVuY3Rpb24gdGVzdChlLCB0KSB7XG4gICAgICAgIHJldHVybiB2b2lkIDAgPT09IGUgJiYgITEgPT09IHQub3duS2V5cztcbiAgICAgIH0sIHJlcGxhY2U6IGZ1bmN0aW9uIHJlcGxhY2UoZSkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH0sIHJldml2ZTogZnVuY3Rpb24gcmV2aXZlKGUpIHt9IH0gfV0sIHsgdW5kZWY6IHsgdGVzdDogZnVuY3Rpb24gdGVzdChlLCB0KSB7XG4gICAgICAgIHJldHVybiB2b2lkIDAgPT09IGUgJiYgKHQub3duS2V5cyB8fCAhKFwib3duS2V5c1wiIGluIHQpKTtcbiAgICAgIH0sIHJlcGxhY2U6IGZ1bmN0aW9uIHJlcGxhY2UoZSkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH0sIHJldml2ZTogZnVuY3Rpb24gcmV2aXZlKGUpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBUeXBlc29uLlVuZGVmaW5lZCgpO1xuICAgICAgfSB9IH1dLCBsID0geyBTdHJpbmdPYmplY3Q6IHsgdGVzdDogZnVuY3Rpb24gdGVzdCh0KSB7XG4gICAgICAgIHJldHVybiBcIlN0cmluZ1wiID09PSBUeXBlc29uLnRvU3RyaW5nVGFnKHQpICYmIFwib2JqZWN0XCIgPT09ICh2b2lkIDAgPT09IHQgPyBcInVuZGVmaW5lZFwiIDogZSh0KSk7XG4gICAgICB9LCByZXBsYWNlOiBmdW5jdGlvbiByZXBsYWNlKGUpIHtcbiAgICAgICAgcmV0dXJuIFN0cmluZyhlKTtcbiAgICAgIH0sIHJldml2ZTogZnVuY3Rpb24gcmV2aXZlKGUpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBTdHJpbmcoZSk7XG4gICAgICB9IH0sIEJvb2xlYW5PYmplY3Q6IHsgdGVzdDogZnVuY3Rpb24gdGVzdCh0KSB7XG4gICAgICAgIHJldHVybiBcIkJvb2xlYW5cIiA9PT0gVHlwZXNvbi50b1N0cmluZ1RhZyh0KSAmJiBcIm9iamVjdFwiID09PSAodm9pZCAwID09PSB0ID8gXCJ1bmRlZmluZWRcIiA6IGUodCkpO1xuICAgICAgfSwgcmVwbGFjZTogZnVuY3Rpb24gcmVwbGFjZShlKSB7XG4gICAgICAgIHJldHVybiBCb29sZWFuKGUpO1xuICAgICAgfSwgcmV2aXZlOiBmdW5jdGlvbiByZXZpdmUoZSkge1xuICAgICAgICByZXR1cm4gbmV3IEJvb2xlYW4oZSk7XG4gICAgICB9IH0sIE51bWJlck9iamVjdDogeyB0ZXN0OiBmdW5jdGlvbiB0ZXN0KHQpIHtcbiAgICAgICAgcmV0dXJuIFwiTnVtYmVyXCIgPT09IFR5cGVzb24udG9TdHJpbmdUYWcodCkgJiYgXCJvYmplY3RcIiA9PT0gKHZvaWQgMCA9PT0gdCA/IFwidW5kZWZpbmVkXCIgOiBlKHQpKTtcbiAgICAgIH0sIHJlcGxhY2U6IGZ1bmN0aW9uIHJlcGxhY2UoZSkge1xuICAgICAgICByZXR1cm4gTnVtYmVyKGUpO1xuICAgICAgfSwgcmV2aXZlOiBmdW5jdGlvbiByZXZpdmUoZSkge1xuICAgICAgICByZXR1cm4gbmV3IE51bWJlcihlKTtcbiAgICAgIH0gfSB9LCB5ID0gW3sgbmFuOiB7IHRlc3Q6IGZ1bmN0aW9uIHRlc3QoZSkge1xuICAgICAgICByZXR1cm4gXCJudW1iZXJcIiA9PSB0eXBlb2YgZSAmJiBpc05hTihlKTtcbiAgICAgIH0sIHJlcGxhY2U6IGZ1bmN0aW9uIHJlcGxhY2UoZSkge1xuICAgICAgICByZXR1cm4gXCJOYU5cIjtcbiAgICAgIH0sIHJldml2ZTogZnVuY3Rpb24gcmV2aXZlKGUpIHtcbiAgICAgICAgcmV0dXJuIE5hTjtcbiAgICAgIH0gfSB9LCB7IGluZmluaXR5OiB7IHRlc3Q6IGZ1bmN0aW9uIHRlc3QoZSkge1xuICAgICAgICByZXR1cm4gZSA9PT0gMSAvIDA7XG4gICAgICB9LCByZXBsYWNlOiBmdW5jdGlvbiByZXBsYWNlKGUpIHtcbiAgICAgICAgcmV0dXJuIFwiSW5maW5pdHlcIjtcbiAgICAgIH0sIHJldml2ZTogZnVuY3Rpb24gcmV2aXZlKGUpIHtcbiAgICAgICAgcmV0dXJuIDEgLyAwO1xuICAgICAgfSB9IH0sIHsgbmVnYXRpdmVJbmZpbml0eTogeyB0ZXN0OiBmdW5jdGlvbiB0ZXN0KGUpIHtcbiAgICAgICAgcmV0dXJuIGUgPT09IC0xIC8gMDtcbiAgICAgIH0sIHJlcGxhY2U6IGZ1bmN0aW9uIHJlcGxhY2UoZSkge1xuICAgICAgICByZXR1cm4gXCItSW5maW5pdHlcIjtcbiAgICAgIH0sIHJldml2ZTogZnVuY3Rpb24gcmV2aXZlKGUpIHtcbiAgICAgICAgcmV0dXJuIC0xIC8gMDtcbiAgICAgIH0gfSB9XSwgdiA9IHsgZGF0ZTogeyB0ZXN0OiBmdW5jdGlvbiB0ZXN0KGUpIHtcbiAgICAgICAgcmV0dXJuIFwiRGF0ZVwiID09PSBUeXBlc29uLnRvU3RyaW5nVGFnKGUpO1xuICAgICAgfSwgcmVwbGFjZTogZnVuY3Rpb24gcmVwbGFjZShlKSB7XG4gICAgICAgIHZhciB0ID0gZS5nZXRUaW1lKCk7cmV0dXJuIGlzTmFOKHQpID8gXCJOYU5cIiA6IHQ7XG4gICAgICB9LCByZXZpdmU6IGZ1bmN0aW9uIHJldml2ZShlKSB7XG4gICAgICAgIHJldHVybiBcIk5hTlwiID09PSBlID8gbmV3IERhdGUoTmFOKSA6IG5ldyBEYXRlKGUpO1xuICAgICAgfSB9IH0sIGQgPSB7IHJlZ2V4cDogeyB0ZXN0OiBmdW5jdGlvbiB0ZXN0KGUpIHtcbiAgICAgICAgcmV0dXJuIFwiUmVnRXhwXCIgPT09IFR5cGVzb24udG9TdHJpbmdUYWcoZSk7XG4gICAgICB9LCByZXBsYWNlOiBmdW5jdGlvbiByZXBsYWNlKGUpIHtcbiAgICAgICAgcmV0dXJuIHsgc291cmNlOiBlLnNvdXJjZSwgZmxhZ3M6IChlLmdsb2JhbCA/IFwiZ1wiIDogXCJcIikgKyAoZS5pZ25vcmVDYXNlID8gXCJpXCIgOiBcIlwiKSArIChlLm11bHRpbGluZSA/IFwibVwiIDogXCJcIikgKyAoZS5zdGlja3kgPyBcInlcIiA6IFwiXCIpICsgKGUudW5pY29kZSA/IFwidVwiIDogXCJcIikgfTtcbiAgICAgIH0sIHJldml2ZTogZnVuY3Rpb24gcmV2aXZlKGUpIHtcbiAgICAgICAgdmFyIHQgPSBlLnNvdXJjZSxcbiAgICAgICAgICAgIG4gPSBlLmZsYWdzO3JldHVybiBuZXcgUmVnRXhwKHQsIG4pO1xuICAgICAgfSB9IH0sIGggPSB7IG1hcDogeyB0ZXN0OiBmdW5jdGlvbiB0ZXN0KGUpIHtcbiAgICAgICAgcmV0dXJuIFwiTWFwXCIgPT09IFR5cGVzb24udG9TdHJpbmdUYWcoZSk7XG4gICAgICB9LCByZXBsYWNlOiBmdW5jdGlvbiByZXBsYWNlKGUpIHtcbiAgICAgICAgcmV0dXJuIEFycmF5LmZyb20oZS5lbnRyaWVzKCkpO1xuICAgICAgfSwgcmV2aXZlOiBmdW5jdGlvbiByZXZpdmUoZSkge1xuICAgICAgICByZXR1cm4gbmV3IE1hcChlKTtcbiAgICAgIH0gfSB9LCBiID0geyBzZXQ6IHsgdGVzdDogZnVuY3Rpb24gdGVzdChlKSB7XG4gICAgICAgIHJldHVybiBcIlNldFwiID09PSBUeXBlc29uLnRvU3RyaW5nVGFnKGUpO1xuICAgICAgfSwgcmVwbGFjZTogZnVuY3Rpb24gcmVwbGFjZShlKSB7XG4gICAgICAgIHJldHVybiBBcnJheS5mcm9tKGUudmFsdWVzKCkpO1xuICAgICAgfSwgcmV2aXZlOiBmdW5jdGlvbiByZXZpdmUoZSkge1xuICAgICAgICByZXR1cm4gbmV3IFNldChlKTtcbiAgICAgIH0gfSB9LCBnID0gXCJBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6MDEyMzQ1Njc4OSsvXCIsIG0gPSBuZXcgVWludDhBcnJheSgyNTYpLCBUID0gMDsgVCA8IGcubGVuZ3RoOyBUKyspIHtcbiAgICBtW2cuY2hhckNvZGVBdChUKV0gPSBUO1xuICB9dmFyIE8gPSBmdW5jdGlvbiBlbmNvZGUoZSwgdCwgbikge1xuICAgIGZvciAodmFyIHIgPSBuZXcgVWludDhBcnJheShlLCB0LCBuKSwgaSA9IHIubGVuZ3RoLCBvID0gXCJcIiwgcyA9IDA7IHMgPCBpOyBzICs9IDMpIHtcbiAgICAgIG8gKz0gZ1tyW3NdID4+IDJdLCBvICs9IGdbKDMgJiByW3NdKSA8PCA0IHwgcltzICsgMV0gPj4gNF0sIG8gKz0gZ1soMTUgJiByW3MgKyAxXSkgPDwgMiB8IHJbcyArIDJdID4+IDZdLCBvICs9IGdbNjMgJiByW3MgKyAyXV07XG4gICAgfXJldHVybiBpICUgMyA9PSAyID8gbyA9IG8uc3Vic3RyaW5nKDAsIG8ubGVuZ3RoIC0gMSkgKyBcIj1cIiA6IGkgJSAzID09IDEgJiYgKG8gPSBvLnN1YnN0cmluZygwLCBvLmxlbmd0aCAtIDIpICsgXCI9PVwiKSwgbztcbiAgfSxcbiAgICAgIHcgPSBmdW5jdGlvbiBkZWNvZGUoZSkge1xuICAgIHZhciB0ID0gZS5sZW5ndGgsXG4gICAgICAgIG4gPSAuNzUgKiBlLmxlbmd0aCxcbiAgICAgICAgciA9IDAsXG4gICAgICAgIGkgPSB2b2lkIDAsXG4gICAgICAgIG8gPSB2b2lkIDAsXG4gICAgICAgIHMgPSB2b2lkIDAsXG4gICAgICAgIGEgPSB2b2lkIDA7XCI9XCIgPT09IGVbZS5sZW5ndGggLSAxXSAmJiAobi0tLCBcIj1cIiA9PT0gZVtlLmxlbmd0aCAtIDJdICYmIG4tLSk7Zm9yICh2YXIgYyA9IG5ldyBBcnJheUJ1ZmZlcihuKSwgdSA9IG5ldyBVaW50OEFycmF5KGMpLCBmID0gMDsgZiA8IHQ7IGYgKz0gNCkge1xuICAgICAgaSA9IG1bZS5jaGFyQ29kZUF0KGYpXSwgbyA9IG1bZS5jaGFyQ29kZUF0KGYgKyAxKV0sIHMgPSBtW2UuY2hhckNvZGVBdChmICsgMildLCBhID0gbVtlLmNoYXJDb2RlQXQoZiArIDMpXSwgdVtyKytdID0gaSA8PCAyIHwgbyA+PiA0LCB1W3IrK10gPSAoMTUgJiBvKSA8PCA0IHwgcyA+PiAyLCB1W3IrK10gPSAoMyAmIHMpIDw8IDYgfCA2MyAmIGE7XG4gICAgfXJldHVybiBjO1xuICB9LFxuICAgICAgUyA9IHsgYXJyYXlidWZmZXI6IHsgdGVzdDogZnVuY3Rpb24gdGVzdChlKSB7XG4gICAgICAgIHJldHVybiBcIkFycmF5QnVmZmVyXCIgPT09IFR5cGVzb24udG9TdHJpbmdUYWcoZSk7XG4gICAgICB9LCByZXBsYWNlOiBmdW5jdGlvbiByZXBsYWNlKGUsIHQpIHtcbiAgICAgICAgdC5idWZmZXJzIHx8ICh0LmJ1ZmZlcnMgPSBbXSk7dmFyIG4gPSB0LmJ1ZmZlcnMuaW5kZXhPZihlKTtyZXR1cm4gbiA+IC0xID8geyBpbmRleDogbiB9IDogKHQuYnVmZmVycy5wdXNoKGUpLCBPKGUpKTtcbiAgICAgIH0sIHJldml2ZTogZnVuY3Rpb24gcmV2aXZlKHQsIG4pIHtcbiAgICAgICAgaWYgKG4uYnVmZmVycyB8fCAobi5idWZmZXJzID0gW10pLCBcIm9iamVjdFwiID09PSAodm9pZCAwID09PSB0ID8gXCJ1bmRlZmluZWRcIiA6IGUodCkpKSByZXR1cm4gbi5idWZmZXJzW3QuaW5kZXhdO3ZhciByID0gdyh0KTtyZXR1cm4gbi5idWZmZXJzLnB1c2gociksIHI7XG4gICAgICB9IH0gfSxcbiAgICAgIFAgPSBcInVuZGVmaW5lZFwiID09IHR5cGVvZiBzZWxmID8gZ2xvYmFsIDogc2VsZixcbiAgICAgIGogPSB7fTtbXCJJbnQ4QXJyYXlcIiwgXCJVaW50OEFycmF5XCIsIFwiVWludDhDbGFtcGVkQXJyYXlcIiwgXCJJbnQxNkFycmF5XCIsIFwiVWludDE2QXJyYXlcIiwgXCJJbnQzMkFycmF5XCIsIFwiVWludDMyQXJyYXlcIiwgXCJGbG9hdDMyQXJyYXlcIiwgXCJGbG9hdDY0QXJyYXlcIl0uZm9yRWFjaChmdW5jdGlvbiAoZSkge1xuICAgIHZhciB0ID0gZSxcbiAgICAgICAgbiA9IFBbdF07biAmJiAoaltlLnRvTG93ZXJDYXNlKCldID0geyB0ZXN0OiBmdW5jdGlvbiB0ZXN0KGUpIHtcbiAgICAgICAgcmV0dXJuIFR5cGVzb24udG9TdHJpbmdUYWcoZSkgPT09IHQ7XG4gICAgICB9LCByZXBsYWNlOiBmdW5jdGlvbiByZXBsYWNlKGUsIHQpIHtcbiAgICAgICAgdmFyIG4gPSBlLmJ1ZmZlcixcbiAgICAgICAgICAgIHIgPSBlLmJ5dGVPZmZzZXQsXG4gICAgICAgICAgICBpID0gZS5sZW5ndGg7dC5idWZmZXJzIHx8ICh0LmJ1ZmZlcnMgPSBbXSk7dmFyIG8gPSB0LmJ1ZmZlcnMuaW5kZXhPZihuKTtyZXR1cm4gbyA+IC0xID8geyBpbmRleDogbywgYnl0ZU9mZnNldDogciwgbGVuZ3RoOiBpIH0gOiAodC5idWZmZXJzLnB1c2gobiksIHsgZW5jb2RlZDogTyhuKSwgYnl0ZU9mZnNldDogciwgbGVuZ3RoOiBpIH0pO1xuICAgICAgfSwgcmV2aXZlOiBmdW5jdGlvbiByZXZpdmUoZSwgdCkge1xuICAgICAgICB0LmJ1ZmZlcnMgfHwgKHQuYnVmZmVycyA9IFtdKTt2YXIgciA9IGUuYnl0ZU9mZnNldCxcbiAgICAgICAgICAgIGkgPSBlLmxlbmd0aCxcbiAgICAgICAgICAgIG8gPSBlLmVuY29kZWQsXG4gICAgICAgICAgICBzID0gZS5pbmRleCxcbiAgICAgICAgICAgIGEgPSB2b2lkIDA7cmV0dXJuIFwiaW5kZXhcIiBpbiBlID8gYSA9IHQuYnVmZmVyc1tzXSA6IChhID0gdyhvKSwgdC5idWZmZXJzLnB1c2goYSkpLCBuZXcgbihhLCByLCBpKTtcbiAgICAgIH0gfSk7XG4gIH0pO3ZhciBBID0geyBkYXRhdmlldzogeyB0ZXN0OiBmdW5jdGlvbiB0ZXN0KGUpIHtcbiAgICAgICAgcmV0dXJuIFwiRGF0YVZpZXdcIiA9PT0gVHlwZXNvbi50b1N0cmluZ1RhZyhlKTtcbiAgICAgIH0sIHJlcGxhY2U6IGZ1bmN0aW9uIHJlcGxhY2UoZSwgdCkge1xuICAgICAgICB2YXIgbiA9IGUuYnVmZmVyLFxuICAgICAgICAgICAgciA9IGUuYnl0ZU9mZnNldCxcbiAgICAgICAgICAgIGkgPSBlLmJ5dGVMZW5ndGg7dC5idWZmZXJzIHx8ICh0LmJ1ZmZlcnMgPSBbXSk7dmFyIG8gPSB0LmJ1ZmZlcnMuaW5kZXhPZihuKTtyZXR1cm4gbyA+IC0xID8geyBpbmRleDogbywgYnl0ZU9mZnNldDogciwgYnl0ZUxlbmd0aDogaSB9IDogKHQuYnVmZmVycy5wdXNoKG4pLCB7IGVuY29kZWQ6IE8obiksIGJ5dGVPZmZzZXQ6IHIsIGJ5dGVMZW5ndGg6IGkgfSk7XG4gICAgICB9LCByZXZpdmU6IGZ1bmN0aW9uIHJldml2ZShlLCB0KSB7XG4gICAgICAgIHQuYnVmZmVycyB8fCAodC5idWZmZXJzID0gW10pO3ZhciBuID0gZS5ieXRlT2Zmc2V0LFxuICAgICAgICAgICAgciA9IGUuYnl0ZUxlbmd0aCxcbiAgICAgICAgICAgIGkgPSBlLmVuY29kZWQsXG4gICAgICAgICAgICBvID0gZS5pbmRleCxcbiAgICAgICAgICAgIHMgPSB2b2lkIDA7cmV0dXJuIFwiaW5kZXhcIiBpbiBlID8gcyA9IHQuYnVmZmVyc1tvXSA6IChzID0gdyhpKSwgdC5idWZmZXJzLnB1c2gocykpLCBuZXcgRGF0YVZpZXcocywgbiwgcik7XG4gICAgICB9IH0gfSxcbiAgICAgIEMgPSB7IEludGxDb2xsYXRvcjogeyB0ZXN0OiBmdW5jdGlvbiB0ZXN0KGUpIHtcbiAgICAgICAgcmV0dXJuIFR5cGVzb24uaGFzQ29uc3RydWN0b3JPZihlLCBJbnRsLkNvbGxhdG9yKTtcbiAgICAgIH0sIHJlcGxhY2U6IGZ1bmN0aW9uIHJlcGxhY2UoZSkge1xuICAgICAgICByZXR1cm4gZS5yZXNvbHZlZE9wdGlvbnMoKTtcbiAgICAgIH0sIHJldml2ZTogZnVuY3Rpb24gcmV2aXZlKGUpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBJbnRsLkNvbGxhdG9yKGUubG9jYWxlLCBlKTtcbiAgICAgIH0gfSwgSW50bERhdGVUaW1lRm9ybWF0OiB7IHRlc3Q6IGZ1bmN0aW9uIHRlc3QoZSkge1xuICAgICAgICByZXR1cm4gVHlwZXNvbi5oYXNDb25zdHJ1Y3Rvck9mKGUsIEludGwuRGF0ZVRpbWVGb3JtYXQpO1xuICAgICAgfSwgcmVwbGFjZTogZnVuY3Rpb24gcmVwbGFjZShlKSB7XG4gICAgICAgIHJldHVybiBlLnJlc29sdmVkT3B0aW9ucygpO1xuICAgICAgfSwgcmV2aXZlOiBmdW5jdGlvbiByZXZpdmUoZSkge1xuICAgICAgICByZXR1cm4gbmV3IEludGwuRGF0ZVRpbWVGb3JtYXQoZS5sb2NhbGUsIGUpO1xuICAgICAgfSB9LCBJbnRsTnVtYmVyRm9ybWF0OiB7IHRlc3Q6IGZ1bmN0aW9uIHRlc3QoZSkge1xuICAgICAgICByZXR1cm4gVHlwZXNvbi5oYXNDb25zdHJ1Y3Rvck9mKGUsIEludGwuTnVtYmVyRm9ybWF0KTtcbiAgICAgIH0sIHJlcGxhY2U6IGZ1bmN0aW9uIHJlcGxhY2UoZSkge1xuICAgICAgICByZXR1cm4gZS5yZXNvbHZlZE9wdGlvbnMoKTtcbiAgICAgIH0sIHJldml2ZTogZnVuY3Rpb24gcmV2aXZlKGUpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBJbnRsLk51bWJlckZvcm1hdChlLmxvY2FsZSwgZSk7XG4gICAgICB9IH0gfSxcbiAgICAgIE4gPSB7IGZpbGU6IHsgdGVzdDogZnVuY3Rpb24gdGVzdChlKSB7XG4gICAgICAgIHJldHVybiBcIkZpbGVcIiA9PT0gVHlwZXNvbi50b1N0cmluZ1RhZyhlKTtcbiAgICAgIH0sIHJlcGxhY2U6IGZ1bmN0aW9uIHJlcGxhY2UoZSkge1xuICAgICAgICB2YXIgdCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO2lmICh0Lm9wZW4oXCJHRVRcIiwgVVJMLmNyZWF0ZU9iamVjdFVSTChlKSwgITEpLCAyMDAgIT09IHQuc3RhdHVzICYmIDAgIT09IHQuc3RhdHVzKSB0aHJvdyBuZXcgRXJyb3IoXCJCYWQgQmxvYiBhY2Nlc3M6IFwiICsgdC5zdGF0dXMpO3JldHVybiB0LnNlbmQoKSwgeyB0eXBlOiBlLnR5cGUsIHN0cmluZ0NvbnRlbnRzOiB0LnJlc3BvbnNlVGV4dCwgbmFtZTogZS5uYW1lLCBsYXN0TW9kaWZpZWQ6IGUubGFzdE1vZGlmaWVkIH07XG4gICAgICB9LCByZXZpdmU6IGZ1bmN0aW9uIHJldml2ZShlKSB7XG4gICAgICAgIHZhciB0ID0gZS5uYW1lLFxuICAgICAgICAgICAgbiA9IGUudHlwZSxcbiAgICAgICAgICAgIHIgPSBlLnN0cmluZ0NvbnRlbnRzLFxuICAgICAgICAgICAgaSA9IGUubGFzdE1vZGlmaWVkO3JldHVybiBuZXcgRmlsZShbcl0sIHQsIHsgdHlwZTogbiwgbGFzdE1vZGlmaWVkOiBpIH0pO1xuICAgICAgfSwgcmVwbGFjZUFzeW5jOiBmdW5jdGlvbiByZXBsYWNlQXN5bmMoZSkge1xuICAgICAgICByZXR1cm4gbmV3IFR5cGVzb24uUHJvbWlzZShmdW5jdGlvbiAodCwgbikge1xuICAgICAgICAgIGlmIChlLmlzQ2xvc2VkKSBuKG5ldyBFcnJvcihcIlRoZSBGaWxlIGlzIGNsb3NlZFwiKSk7ZWxzZSB7XG4gICAgICAgICAgICB2YXIgciA9IG5ldyBGaWxlUmVhZGVyKCk7ci5hZGRFdmVudExpc3RlbmVyKFwibG9hZFwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgIHQoeyB0eXBlOiBlLnR5cGUsIHN0cmluZ0NvbnRlbnRzOiByLnJlc3VsdCwgbmFtZTogZS5uYW1lLCBsYXN0TW9kaWZpZWQ6IGUubGFzdE1vZGlmaWVkIH0pO1xuICAgICAgICAgICAgfSksIHIuYWRkRXZlbnRMaXN0ZW5lcihcImVycm9yXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgbihyLmVycm9yKTtcbiAgICAgICAgICAgIH0pLCByLnJlYWRBc1RleHQoZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0gfSB9O3JldHVybiBbZiwgcCwgbCwgeSwgdiwgZCwgeyBpbWFnZWRhdGE6IHsgdGVzdDogZnVuY3Rpb24gdGVzdChlKSB7XG4gICAgICAgIHJldHVybiBcIkltYWdlRGF0YVwiID09PSBUeXBlc29uLnRvU3RyaW5nVGFnKGUpO1xuICAgICAgfSwgcmVwbGFjZTogZnVuY3Rpb24gcmVwbGFjZShlKSB7XG4gICAgICAgIHJldHVybiB7IGFycmF5OiBBcnJheS5mcm9tKGUuZGF0YSksIHdpZHRoOiBlLndpZHRoLCBoZWlnaHQ6IGUuaGVpZ2h0IH07XG4gICAgICB9LCByZXZpdmU6IGZ1bmN0aW9uIHJldml2ZShlKSB7XG4gICAgICAgIHJldHVybiBuZXcgSW1hZ2VEYXRhKG5ldyBVaW50OENsYW1wZWRBcnJheShlLmFycmF5KSwgZS53aWR0aCwgZS5oZWlnaHQpO1xuICAgICAgfSB9IH0sIHsgaW1hZ2ViaXRtYXA6IHsgdGVzdDogZnVuY3Rpb24gdGVzdChlKSB7XG4gICAgICAgIHJldHVybiBcIkltYWdlQml0bWFwXCIgPT09IFR5cGVzb24udG9TdHJpbmdUYWcoZSkgfHwgZSAmJiBlLmRhdGFzZXQgJiYgXCJJbWFnZUJpdG1hcFwiID09PSBlLmRhdGFzZXQudG9TdHJpbmdUYWc7XG4gICAgICB9LCByZXBsYWNlOiBmdW5jdGlvbiByZXBsYWNlKGUpIHtcbiAgICAgICAgdmFyIHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiY2FudmFzXCIpO3JldHVybiB0LmdldENvbnRleHQoXCIyZFwiKS5kcmF3SW1hZ2UoZSwgMCwgMCksIHQudG9EYXRhVVJMKCk7XG4gICAgICB9LCByZXZpdmU6IGZ1bmN0aW9uIHJldml2ZShlKSB7XG4gICAgICAgIHZhciB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKSxcbiAgICAgICAgICAgIG4gPSB0LmdldENvbnRleHQoXCIyZFwiKSxcbiAgICAgICAgICAgIHIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW1nXCIpO3JldHVybiByLm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBuLmRyYXdJbWFnZShyLCAwLCAwKTtcbiAgICAgICAgfSwgci5zcmMgPSBlLCB0O1xuICAgICAgfSwgcmV2aXZlQXN5bmM6IGZ1bmN0aW9uIHJldml2ZUFzeW5jKGUpIHtcbiAgICAgICAgdmFyIHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiY2FudmFzXCIpLFxuICAgICAgICAgICAgbiA9IHQuZ2V0Q29udGV4dChcIjJkXCIpLFxuICAgICAgICAgICAgciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbWdcIik7cmV0dXJuIHIub25sb2FkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgIG4uZHJhd0ltYWdlKHIsIDAsIDApO1xuICAgICAgICB9LCByLnNyYyA9IGUsIGNyZWF0ZUltYWdlQml0bWFwKHQpO1xuICAgICAgfSB9IH0sIE4sIHsgZmlsZTogTi5maWxlLCBmaWxlbGlzdDogeyB0ZXN0OiBmdW5jdGlvbiB0ZXN0KGUpIHtcbiAgICAgICAgcmV0dXJuIFwiRmlsZUxpc3RcIiA9PT0gVHlwZXNvbi50b1N0cmluZ1RhZyhlKTtcbiAgICAgIH0sIHJlcGxhY2U6IGZ1bmN0aW9uIHJlcGxhY2UoZSkge1xuICAgICAgICBmb3IgKHZhciB0ID0gW10sIG4gPSAwOyBuIDwgZS5sZW5ndGg7IG4rKykge1xuICAgICAgICAgIHRbbl0gPSBlLml0ZW0obik7XG4gICAgICAgIH1yZXR1cm4gdDtcbiAgICAgIH0sIHJldml2ZTogZnVuY3Rpb24gcmV2aXZlKGUpIHtcbiAgICAgICAgZnVuY3Rpb24gRmlsZUxpc3QoKSB7XG4gICAgICAgICAgdGhpcy5fZmlsZXMgPSBhcmd1bWVudHNbMF0sIHRoaXMubGVuZ3RoID0gdGhpcy5fZmlsZXMubGVuZ3RoO1xuICAgICAgICB9cmV0dXJuIEZpbGVMaXN0LnByb3RvdHlwZS5pdGVtID0gZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5fZmlsZXNbZV07XG4gICAgICAgIH0sIEZpbGVMaXN0LnByb3RvdHlwZVtTeW1ib2wudG9TdHJpbmdUYWddID0gXCJGaWxlTGlzdFwiLCBuZXcgRmlsZUxpc3QoZSk7XG4gICAgICB9IH0gfSwgeyBibG9iOiB7IHRlc3Q6IGZ1bmN0aW9uIHRlc3QoZSkge1xuICAgICAgICByZXR1cm4gXCJCbG9iXCIgPT09IFR5cGVzb24udG9TdHJpbmdUYWcoZSk7XG4gICAgICB9LCByZXBsYWNlOiBmdW5jdGlvbiByZXBsYWNlKGUpIHtcbiAgICAgICAgdmFyIHQgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtpZiAodC5vcGVuKFwiR0VUXCIsIFVSTC5jcmVhdGVPYmplY3RVUkwoZSksICExKSwgMjAwICE9PSB0LnN0YXR1cyAmJiAwICE9PSB0LnN0YXR1cykgdGhyb3cgbmV3IEVycm9yKFwiQmFkIEJsb2IgYWNjZXNzOiBcIiArIHQuc3RhdHVzKTtyZXR1cm4gdC5zZW5kKCksIHsgdHlwZTogZS50eXBlLCBzdHJpbmdDb250ZW50czogdC5yZXNwb25zZVRleHQgfTtcbiAgICAgIH0sIHJldml2ZTogZnVuY3Rpb24gcmV2aXZlKGUpIHtcbiAgICAgICAgdmFyIHQgPSBlLnR5cGUsXG4gICAgICAgICAgICBuID0gZS5zdHJpbmdDb250ZW50cztyZXR1cm4gbmV3IEJsb2IoW25dLCB7IHR5cGU6IHQgfSk7XG4gICAgICB9LCByZXBsYWNlQXN5bmM6IGZ1bmN0aW9uIHJlcGxhY2VBc3luYyhlKSB7XG4gICAgICAgIHJldHVybiBuZXcgVHlwZXNvbi5Qcm9taXNlKGZ1bmN0aW9uICh0LCBuKSB7XG4gICAgICAgICAgaWYgKGUuaXNDbG9zZWQpIG4obmV3IEVycm9yKFwiVGhlIEJsb2IgaXMgY2xvc2VkXCIpKTtlbHNlIHtcbiAgICAgICAgICAgIHZhciByID0gbmV3IEZpbGVSZWFkZXIoKTtyLmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgdCh7IHR5cGU6IGUudHlwZSwgc3RyaW5nQ29udGVudHM6IHIucmVzdWx0IH0pO1xuICAgICAgICAgICAgfSksIHIuYWRkRXZlbnRMaXN0ZW5lcihcImVycm9yXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgbihyLmVycm9yKTtcbiAgICAgICAgICAgIH0pLCByLnJlYWRBc1RleHQoZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0gfSB9XS5jb25jYXQoXCJmdW5jdGlvblwiID09IHR5cGVvZiBNYXAgPyBoIDogW10sIFwiZnVuY3Rpb25cIiA9PSB0eXBlb2YgU2V0ID8gYiA6IFtdLCBcImZ1bmN0aW9uXCIgPT0gdHlwZW9mIEFycmF5QnVmZmVyID8gUyA6IFtdLCBcImZ1bmN0aW9uXCIgPT0gdHlwZW9mIFVpbnQ4QXJyYXkgPyBqIDogW10sIFwiZnVuY3Rpb25cIiA9PSB0eXBlb2YgRGF0YVZpZXcgPyBBIDogW10sIFwidW5kZWZpbmVkXCIgIT0gdHlwZW9mIEludGwgPyBDIDogW10pLmNvbmNhdCh7IGNoZWNrRGF0YUNsb25lRXhjZXB0aW9uOiBbZnVuY3Rpb24gKHQpIHtcbiAgICAgIHZhciBuID0ge30udG9TdHJpbmcuY2FsbCh0KS5zbGljZSg4LCAtMSk7aWYgKFtcInN5bWJvbFwiLCBcImZ1bmN0aW9uXCJdLmluY2x1ZGVzKHZvaWQgMCA9PT0gdCA/IFwidW5kZWZpbmVkXCIgOiBlKHQpKSB8fCBbXCJBcmd1bWVudHNcIiwgXCJNb2R1bGVcIiwgXCJFcnJvclwiLCBcIlByb21pc2VcIiwgXCJXZWFrTWFwXCIsIFwiV2Vha1NldFwiXS5pbmNsdWRlcyhuKSB8fCB0ID09PSBPYmplY3QucHJvdG90eXBlIHx8IChcIkJsb2JcIiA9PT0gbiB8fCBcIkZpbGVcIiA9PT0gbikgJiYgdC5pc0Nsb3NlZCB8fCB0ICYmIFwib2JqZWN0XCIgPT09ICh2b2lkIDAgPT09IHQgPyBcInVuZGVmaW5lZFwiIDogZSh0KSkgJiYgXCJudW1iZXJcIiA9PSB0eXBlb2YgdC5ub2RlVHlwZSAmJiBcImZ1bmN0aW9uXCIgPT0gdHlwZW9mIHQuaW5zZXJ0QmVmb3JlKSB0aHJvdyBuZXcgRE9NRXhjZXB0aW9uKFwiVGhlIG9iamVjdCBjYW5ub3QgYmUgY2xvbmVkLlwiLCBcIkRhdGFDbG9uZUVycm9yXCIpO3JldHVybiAhMTtcbiAgICB9XSB9KTtcbn0pO1xuXG5cbn0se31dLDQ3OltmdW5jdGlvbihfZGVyZXFfLG1vZHVsZSxleHBvcnRzKXtcblwidXNlIHN0cmljdFwiO1xuXG52YXIgX3R5cGVvZjIgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgdHlwZW9mIFN5bWJvbC5pdGVyYXRvciA9PT0gXCJzeW1ib2xcIiA/IGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIHR5cGVvZiBvYmo7IH0gOiBmdW5jdGlvbiAob2JqKSB7IHJldHVybiBvYmogJiYgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sICYmIG9iaiAhPT0gU3ltYm9sLnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiB0eXBlb2Ygb2JqOyB9O1xuXG52YXIgX3R5cGVvZiA9IFwiZnVuY3Rpb25cIiA9PSB0eXBlb2YgU3ltYm9sICYmIFwic3ltYm9sXCIgPT0gX3R5cGVvZjIoU3ltYm9sLml0ZXJhdG9yKSA/IGZ1bmN0aW9uIChlKSB7XG4gIHJldHVybiB0eXBlb2YgZSA9PT0gXCJ1bmRlZmluZWRcIiA/IFwidW5kZWZpbmVkXCIgOiBfdHlwZW9mMihlKTtcbn0gOiBmdW5jdGlvbiAoZSkge1xuICByZXR1cm4gZSAmJiBcImZ1bmN0aW9uXCIgPT0gdHlwZW9mIFN5bWJvbCAmJiBlLmNvbnN0cnVjdG9yID09PSBTeW1ib2wgJiYgZSAhPT0gU3ltYm9sLnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiB0eXBlb2YgZSA9PT0gXCJ1bmRlZmluZWRcIiA/IFwidW5kZWZpbmVkXCIgOiBfdHlwZW9mMihlKTtcbn0sXG4gICAgc2xpY2VkVG9BcnJheSA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIChlLCBuKSB7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkoZSkpIHJldHVybiBlO2lmIChTeW1ib2wuaXRlcmF0b3IgaW4gT2JqZWN0KGUpKSByZXR1cm4gZnVuY3Rpb24gc2xpY2VJdGVyYXRvcihlLCBuKSB7XG4gICAgICB2YXIgdCA9IFtdLFxuICAgICAgICAgIHIgPSAhMCxcbiAgICAgICAgICBpID0gITEsXG4gICAgICAgICAgbyA9IHZvaWQgMDt0cnkge1xuICAgICAgICBmb3IgKHZhciBzLCBhID0gZVtTeW1ib2wuaXRlcmF0b3JdKCk7ICEociA9IChzID0gYS5uZXh0KCkpLmRvbmUpICYmICh0LnB1c2gocy52YWx1ZSksICFuIHx8IHQubGVuZ3RoICE9PSBuKTsgciA9ICEwKSB7fVxuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBpID0gITAsIG8gPSBlO1xuICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAhciAmJiBhLnJldHVybiAmJiBhLnJldHVybigpO1xuICAgICAgICB9IGZpbmFsbHkge1xuICAgICAgICAgIGlmIChpKSB0aHJvdyBvO1xuICAgICAgICB9XG4gICAgICB9cmV0dXJuIHQ7XG4gICAgfShlLCBuKTt0aHJvdyBuZXcgVHlwZUVycm9yKFwiSW52YWxpZCBhdHRlbXB0IHRvIGRlc3RydWN0dXJlIG5vbi1pdGVyYWJsZSBpbnN0YW5jZVwiKTtcbiAgfTtcbn0oKSxcbiAgICB0b0NvbnN1bWFibGVBcnJheSA9IGZ1bmN0aW9uIHRvQ29uc3VtYWJsZUFycmF5KGUpIHtcbiAgaWYgKEFycmF5LmlzQXJyYXkoZSkpIHtcbiAgICBmb3IgKHZhciBuID0gMCwgdCA9IEFycmF5KGUubGVuZ3RoKTsgbiA8IGUubGVuZ3RoOyBuKyspIHtcbiAgICAgIHRbbl0gPSBlW25dO1xuICAgIH1yZXR1cm4gdDtcbiAgfXJldHVybiBBcnJheS5mcm9tKGUpO1xufSxcbiAgICBrZXlzID0gT2JqZWN0LmtleXMsXG4gICAgaXNBcnJheSA9IEFycmF5LmlzQXJyYXksXG4gICAgdG9TdHJpbmcgPSB7fS50b1N0cmluZyxcbiAgICBnZXRQcm90byA9IE9iamVjdC5nZXRQcm90b3R5cGVPZixcbiAgICBoYXNPd24gPSB7fS5oYXNPd25Qcm9wZXJ0eSxcbiAgICBmblRvU3RyaW5nID0gaGFzT3duLnRvU3RyaW5nLFxuICAgIGludGVybmFsU3RhdGVPYmpQcm9wc1RvSWdub3JlID0gW1widHlwZVwiLCBcInJlcGxhY2VkXCIsIFwiaXRlcmF0ZUluXCIsIFwiaXRlcmF0ZVVuc2V0TnVtZXJpY1wiXTtmdW5jdGlvbiBpc1RoZW5hYmxlKGUsIG4pIHtcbiAgcmV0dXJuIFR5cGVzb24uaXNPYmplY3QoZSkgJiYgXCJmdW5jdGlvblwiID09IHR5cGVvZiBlLnRoZW4gJiYgKCFuIHx8IFwiZnVuY3Rpb25cIiA9PSB0eXBlb2YgZS5jYXRjaCk7XG59ZnVuY3Rpb24gdG9TdHJpbmdUYWcoZSkge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbChlKS5zbGljZSg4LCAtMSk7XG59ZnVuY3Rpb24gaGFzQ29uc3RydWN0b3JPZihlLCBuKSB7XG4gIGlmICghZSB8fCBcIm9iamVjdFwiICE9PSAodm9pZCAwID09PSBlID8gXCJ1bmRlZmluZWRcIiA6IF90eXBlb2YoZSkpKSByZXR1cm4gITE7dmFyIHQgPSBnZXRQcm90byhlKTtpZiAoIXQpIHJldHVybiAhMTt2YXIgciA9IGhhc093bi5jYWxsKHQsIFwiY29uc3RydWN0b3JcIikgJiYgdC5jb25zdHJ1Y3RvcjtyZXR1cm4gXCJmdW5jdGlvblwiICE9IHR5cGVvZiByID8gbnVsbCA9PT0gbiA6IFwiZnVuY3Rpb25cIiA9PSB0eXBlb2YgciAmJiBudWxsICE9PSBuICYmIGZuVG9TdHJpbmcuY2FsbChyKSA9PT0gZm5Ub1N0cmluZy5jYWxsKG4pO1xufWZ1bmN0aW9uIGlzUGxhaW5PYmplY3QoZSkge1xuICByZXR1cm4gISghZSB8fCBcIk9iamVjdFwiICE9PSB0b1N0cmluZ1RhZyhlKSkgJiYgKCFnZXRQcm90byhlKSB8fCBoYXNDb25zdHJ1Y3Rvck9mKGUsIE9iamVjdCkpO1xufWZ1bmN0aW9uIGlzVXNlck9iamVjdChlKSB7XG4gIGlmICghZSB8fCBcIk9iamVjdFwiICE9PSB0b1N0cmluZ1RhZyhlKSkgcmV0dXJuICExO3ZhciBuID0gZ2V0UHJvdG8oZSk7cmV0dXJuICFuIHx8IGhhc0NvbnN0cnVjdG9yT2YoZSwgT2JqZWN0KSB8fCBpc1VzZXJPYmplY3Qobik7XG59ZnVuY3Rpb24gaXNPYmplY3QoZSkge1xuICByZXR1cm4gZSAmJiBcIm9iamVjdFwiID09PSAodm9pZCAwID09PSBlID8gXCJ1bmRlZmluZWRcIiA6IF90eXBlb2YoZSkpO1xufWZ1bmN0aW9uIFR5cGVzb24oZSkge1xuICB2YXIgbiA9IFtdLFxuICAgICAgdCA9IFtdLFxuICAgICAgciA9IHt9LFxuICAgICAgaSA9IHRoaXMudHlwZXMgPSB7fSxcbiAgICAgIG8gPSB0aGlzLnN0cmluZ2lmeSA9IGZ1bmN0aW9uIChuLCB0LCByLCBpKSB7XG4gICAgaSA9IE9iamVjdC5hc3NpZ24oe30sIGUsIGksIHsgc3RyaW5naWZpY2F0aW9uOiAhMCB9KTt2YXIgbyA9IGEobiwgbnVsbCwgaSk7cmV0dXJuIGlzQXJyYXkobykgPyBKU09OLnN0cmluZ2lmeShvWzBdLCB0LCByKSA6IG8udGhlbihmdW5jdGlvbiAoZSkge1xuICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KGUsIHQsIHIpO1xuICAgIH0pO1xuICB9O3RoaXMuc3RyaW5naWZ5U3luYyA9IGZ1bmN0aW9uIChlLCBuLCB0LCByKSB7XG4gICAgcmV0dXJuIG8oZSwgbiwgdCwgT2JqZWN0LmFzc2lnbih7fSwgeyB0aHJvd09uQmFkU3luY1R5cGU6ICEwIH0sIHIsIHsgc3luYzogITAgfSkpO1xuICB9LCB0aGlzLnN0cmluZ2lmeUFzeW5jID0gZnVuY3Rpb24gKGUsIG4sIHQsIHIpIHtcbiAgICByZXR1cm4gbyhlLCBuLCB0LCBPYmplY3QuYXNzaWduKHt9LCB7IHRocm93T25CYWRTeW5jVHlwZTogITAgfSwgciwgeyBzeW5jOiAhMSB9KSk7XG4gIH07dmFyIHMgPSB0aGlzLnBhcnNlID0gZnVuY3Rpb24gKG4sIHQsIHIpIHtcbiAgICByZXR1cm4gciA9IE9iamVjdC5hc3NpZ24oe30sIGUsIHIsIHsgcGFyc2U6ICEwIH0pLCBjKEpTT04ucGFyc2UobiwgdCksIHIpO1xuICB9O3RoaXMucGFyc2VTeW5jID0gZnVuY3Rpb24gKGUsIG4sIHQpIHtcbiAgICByZXR1cm4gcyhlLCBuLCBPYmplY3QuYXNzaWduKHt9LCB7IHRocm93T25CYWRTeW5jVHlwZTogITAgfSwgdCwgeyBzeW5jOiAhMCB9KSk7XG4gIH0sIHRoaXMucGFyc2VBc3luYyA9IGZ1bmN0aW9uIChlLCBuLCB0KSB7XG4gICAgcmV0dXJuIHMoZSwgbiwgT2JqZWN0LmFzc2lnbih7fSwgeyB0aHJvd09uQmFkU3luY1R5cGU6ICEwIH0sIHQsIHsgc3luYzogITEgfSkpO1xuICB9LCB0aGlzLnNwZWNpYWxUeXBlTmFtZXMgPSBmdW5jdGlvbiAoZSwgbikge1xuICAgIHZhciB0ID0gYXJndW1lbnRzLmxlbmd0aCA+IDIgJiYgdm9pZCAwICE9PSBhcmd1bWVudHNbMl0gPyBhcmd1bWVudHNbMl0gOiB7fTtyZXR1cm4gdC5yZXR1cm5UeXBlTmFtZXMgPSAhMCwgdGhpcy5lbmNhcHN1bGF0ZShlLCBuLCB0KTtcbiAgfSwgdGhpcy5yb290VHlwZU5hbWUgPSBmdW5jdGlvbiAoZSwgbikge1xuICAgIHZhciB0ID0gYXJndW1lbnRzLmxlbmd0aCA+IDIgJiYgdm9pZCAwICE9PSBhcmd1bWVudHNbMl0gPyBhcmd1bWVudHNbMl0gOiB7fTtyZXR1cm4gdC5pdGVyYXRlTm9uZSA9ICEwLCB0aGlzLmVuY2Fwc3VsYXRlKGUsIG4sIHQpO1xuICB9O3ZhciBhID0gdGhpcy5lbmNhcHN1bGF0ZSA9IGZ1bmN0aW9uIChpLCBvLCBzKSB7XG4gICAgdmFyIGEgPSAocyA9IE9iamVjdC5hc3NpZ24oeyBzeW5jOiAhMCB9LCBlLCBzKSkuc3luYyxcbiAgICAgICAgYyA9IHt9LFxuICAgICAgICB1ID0gW10sXG4gICAgICAgIHkgPSBbXSxcbiAgICAgICAgcCA9IFtdLFxuICAgICAgICBmID0gIShzICYmIFwiY3ljbGljXCIgaW4gcykgfHwgcy5jeWNsaWMsXG4gICAgICAgIGwgPSBzLmVuY2Fwc3VsYXRlT2JzZXJ2ZXIsXG4gICAgICAgIGggPSBfZW5jYXBzdWxhdGUoXCJcIiwgaSwgZiwgbyB8fCB7fSwgcCk7ZnVuY3Rpb24gZmluaXNoKGUpIHtcbiAgICAgIHZhciBuID0gT2JqZWN0LnZhbHVlcyhjKTtpZiAocy5pdGVyYXRlTm9uZSkgcmV0dXJuIG4ubGVuZ3RoID8gblswXSA6IFR5cGVzb24uZ2V0SlNPTlR5cGUoZSk7aWYgKG4ubGVuZ3RoKSB7XG4gICAgICAgIGlmIChzLnJldHVyblR5cGVOYW1lcykgcmV0dXJuIFtdLmNvbmNhdCh0b0NvbnN1bWFibGVBcnJheShuZXcgU2V0KG4pKSk7ZSAmJiBpc1BsYWluT2JqZWN0KGUpICYmICFlLmhhc093blByb3BlcnR5KFwiJHR5cGVzXCIpID8gZS4kdHlwZXMgPSBjIDogZSA9IHsgJDogZSwgJHR5cGVzOiB7ICQ6IGMgfSB9O1xuICAgICAgfSBlbHNlIGlzT2JqZWN0KGUpICYmIGUuaGFzT3duUHJvcGVydHkoXCIkdHlwZXNcIikgJiYgKGUgPSB7ICQ6IGUsICR0eXBlczogITAgfSk7cmV0dXJuICFzLnJldHVyblR5cGVOYW1lcyAmJiBlO1xuICAgIH1yZXR1cm4gcC5sZW5ndGggPyBhICYmIHMudGhyb3dPbkJhZFN5bmNUeXBlID8gZnVuY3Rpb24gKCkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bmMgbWV0aG9kIHJlcXVlc3RlZCBidXQgYXN5bmMgcmVzdWx0IG9idGFpbmVkXCIpO1xuICAgIH0oKSA6IFByb21pc2UucmVzb2x2ZShmdW5jdGlvbiBjaGVja1Byb21pc2VzKGUsIG4pIHtcbiAgICAgIHJldHVybiBQcm9taXNlLmFsbChuLm1hcChmdW5jdGlvbiAoZSkge1xuICAgICAgICByZXR1cm4gZVsxXS5wO1xuICAgICAgfSkpLnRoZW4oZnVuY3Rpb24gKHQpIHtcbiAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKHQubWFwKGZ1bmN0aW9uICh0KSB7XG4gICAgICAgICAgdmFyIHIgPSBbXSxcbiAgICAgICAgICAgICAgaSA9IG4uc3BsaWNlKDAsIDEpWzBdLFxuICAgICAgICAgICAgICBvID0gc2xpY2VkVG9BcnJheShpLCA3KSxcbiAgICAgICAgICAgICAgcyA9IG9bMF0sXG4gICAgICAgICAgICAgIGEgPSBvWzJdLFxuICAgICAgICAgICAgICBjID0gb1szXSxcbiAgICAgICAgICAgICAgdSA9IG9bNF0sXG4gICAgICAgICAgICAgIHkgPSBvWzVdLFxuICAgICAgICAgICAgICBwID0gb1s2XSxcbiAgICAgICAgICAgICAgZiA9IF9lbmNhcHN1bGF0ZShzLCB0LCBhLCBjLCByLCAhMCwgcCksXG4gICAgICAgICAgICAgIGwgPSBoYXNDb25zdHJ1Y3Rvck9mKGYsIFR5cGVzb25Qcm9taXNlKTtyZXR1cm4gcyAmJiBsID8gZi5wLnRoZW4oZnVuY3Rpb24gKG4pIHtcbiAgICAgICAgICAgIHJldHVybiB1W3ldID0gbiwgY2hlY2tQcm9taXNlcyhlLCByKTtcbiAgICAgICAgICB9KSA6IChzID8gdVt5XSA9IGYgOiBlID0gbCA/IGYucCA6IGYsIGNoZWNrUHJvbWlzZXMoZSwgcikpO1xuICAgICAgICB9KSk7XG4gICAgICB9KS50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIGU7XG4gICAgICB9KTtcbiAgICB9KGgsIHApKS50aGVuKGZpbmlzaCkgOiAhYSAmJiBzLnRocm93T25CYWRTeW5jVHlwZSA/IGZ1bmN0aW9uICgpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJBc3luYyBtZXRob2QgcmVxdWVzdGVkIGJ1dCBzeW5jIHJlc3VsdCBvYnRhaW5lZFwiKTtcbiAgICB9KCkgOiBzLnN0cmluZ2lmaWNhdGlvbiAmJiBhID8gW2ZpbmlzaChoKV0gOiBhID8gZmluaXNoKGgpIDogUHJvbWlzZS5yZXNvbHZlKGZpbmlzaChoKSk7ZnVuY3Rpb24gX2FkYXB0QnVpbHRpblN0YXRlT2JqZWN0UHJvcGVydGllcyhlLCBuLCB0KSB7XG4gICAgICBPYmplY3QuYXNzaWduKGUsIG4pO3ZhciByID0gaW50ZXJuYWxTdGF0ZU9ialByb3BzVG9JZ25vcmUubWFwKGZ1bmN0aW9uIChuKSB7XG4gICAgICAgIHZhciB0ID0gZVtuXTtyZXR1cm4gZGVsZXRlIGVbbl0sIHQ7XG4gICAgICB9KTt0KCksIGludGVybmFsU3RhdGVPYmpQcm9wc1RvSWdub3JlLmZvckVhY2goZnVuY3Rpb24gKG4sIHQpIHtcbiAgICAgICAgZVtuXSA9IHJbdF07XG4gICAgICB9KTtcbiAgICB9ZnVuY3Rpb24gX2VuY2Fwc3VsYXRlKGUsIHQsIHIsIGksIG8sIGEsIHApIHtcbiAgICAgIHZhciBmID0gdm9pZCAwLFxuICAgICAgICAgIGggPSB7fSxcbiAgICAgICAgICB2ID0gdm9pZCAwID09PSB0ID8gXCJ1bmRlZmluZWRcIiA6IF90eXBlb2YodCksXG4gICAgICAgICAgZCA9IGwgPyBmdW5jdGlvbiAobikge1xuICAgICAgICB2YXIgcyA9IHAgfHwgaS50eXBlIHx8IFR5cGVzb24uZ2V0SlNPTlR5cGUodCk7bChPYmplY3QuYXNzaWduKG4gfHwgaCwgeyBrZXlwYXRoOiBlLCB2YWx1ZTogdCwgY3ljbGljOiByLCBzdGF0ZU9iajogaSwgcHJvbWlzZXNEYXRhOiBvLCByZXNvbHZpbmdUeXBlc29uUHJvbWlzZTogYSwgYXdhaXRpbmdUeXBlc29uUHJvbWlzZTogaGFzQ29uc3RydWN0b3JPZih0LCBUeXBlc29uUHJvbWlzZSkgfSwgdm9pZCAwICE9PSBzID8geyB0eXBlOiBzIH0gOiB7fSkpO1xuICAgICAgfSA6IG51bGw7aWYgKHYgaW4geyBzdHJpbmc6IDEsIGJvb2xlYW46IDEsIG51bWJlcjogMSwgdW5kZWZpbmVkOiAxIH0pIHJldHVybiB2b2lkIDAgPT09IHQgfHwgXCJudW1iZXJcIiA9PT0gdiAmJiAoaXNOYU4odCkgfHwgdCA9PT0gLTEgLyAwIHx8IHQgPT09IDEgLyAwKSA/IChmID0gcmVwbGFjZShlLCB0LCBpLCBvLCAhMSwgYSwgZCkpICE9PSB0ICYmIChoID0geyByZXBsYWNlZDogZiB9KSA6IGYgPSB0LCBkICYmIGQoKSwgZjtpZiAobnVsbCA9PT0gdCkgcmV0dXJuIGQgJiYgZCgpLCB0O2lmIChyICYmICFpLml0ZXJhdGVJbiAmJiAhaS5pdGVyYXRlVW5zZXROdW1lcmljKSB7XG4gICAgICAgIHZhciBiID0gdS5pbmRleE9mKHQpO2lmICghKGIgPCAwKSkgcmV0dXJuIGNbZV0gPSBcIiNcIiwgZCAmJiBkKHsgY3ljbGljS2V5cGF0aDogeVtiXSB9KSwgXCIjXCIgKyB5W2JdOyEwID09PSByICYmICh1LnB1c2godCksIHkucHVzaChlKSk7XG4gICAgICB9dmFyIE8gPSBpc1BsYWluT2JqZWN0KHQpLFxuICAgICAgICAgIGcgPSBpc0FycmF5KHQpLFxuICAgICAgICAgIFQgPSAoTyB8fCBnKSAmJiAoIW4ubGVuZ3RoIHx8IGkucmVwbGFjZWQpIHx8IGkuaXRlcmF0ZUluID8gdCA6IHJlcGxhY2UoZSwgdCwgaSwgbywgTyB8fCBnLCBudWxsLCBkKSxcbiAgICAgICAgICBtID0gdm9pZCAwO2lmIChUICE9PSB0ID8gKGYgPSBULCBoID0geyByZXBsYWNlZDogVCB9KSA6IGcgfHwgXCJhcnJheVwiID09PSBpLml0ZXJhdGVJbiA/IChtID0gbmV3IEFycmF5KHQubGVuZ3RoKSwgaCA9IHsgY2xvbmU6IG0gfSkgOiBPIHx8IFwib2JqZWN0XCIgPT09IGkuaXRlcmF0ZUluID8gaCA9IHsgY2xvbmU6IG0gPSB7fSB9IDogXCJcIiA9PT0gZSAmJiBoYXNDb25zdHJ1Y3Rvck9mKHQsIFR5cGVzb25Qcm9taXNlKSA/IChvLnB1c2goW2UsIHQsIHIsIGksIHZvaWQgMCwgdm9pZCAwLCBpLnR5cGVdKSwgZiA9IHQpIDogZiA9IHQsIGQgJiYgZCgpLCBzLml0ZXJhdGVOb25lKSByZXR1cm4gbSB8fCBmO2lmICghbSkgcmV0dXJuIGY7aWYgKGkuaXRlcmF0ZUluKSB7XG4gICAgICAgIHZhciBQID0gZnVuY3Rpb24gX2xvb3Aobikge1xuICAgICAgICAgIHZhciBzID0geyBvd25LZXlzOiB0Lmhhc093blByb3BlcnR5KG4pIH07X2FkYXB0QnVpbHRpblN0YXRlT2JqZWN0UHJvcGVydGllcyhpLCBzLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgcyA9IGUgKyAoZSA/IFwiLlwiIDogXCJcIikgKyBlc2NhcGVLZXlQYXRoQ29tcG9uZW50KG4pLFxuICAgICAgICAgICAgICAgIGMgPSBfZW5jYXBzdWxhdGUocywgdFtuXSwgISFyLCBpLCBvLCBhKTtoYXNDb25zdHJ1Y3Rvck9mKGMsIFR5cGVzb25Qcm9taXNlKSA/IG8ucHVzaChbcywgYywgISFyLCBpLCBtLCBuLCBpLnR5cGVdKSA6IHZvaWQgMCAhPT0gYyAmJiAobVtuXSA9IGMpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9O2ZvciAodmFyIGogaW4gdCkge1xuICAgICAgICAgIFAoaik7XG4gICAgICAgIH1kICYmIGQoeyBlbmRJdGVyYXRlSW46ICEwLCBlbmQ6ICEwIH0pO1xuICAgICAgfSBlbHNlIGtleXModCkuZm9yRWFjaChmdW5jdGlvbiAobikge1xuICAgICAgICB2YXIgcyA9IGUgKyAoZSA/IFwiLlwiIDogXCJcIikgKyBlc2NhcGVLZXlQYXRoQ29tcG9uZW50KG4pO19hZGFwdEJ1aWx0aW5TdGF0ZU9iamVjdFByb3BlcnRpZXMoaSwgeyBvd25LZXlzOiAhMCB9LCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgdmFyIGUgPSBfZW5jYXBzdWxhdGUocywgdFtuXSwgISFyLCBpLCBvLCBhKTtoYXNDb25zdHJ1Y3Rvck9mKGUsIFR5cGVzb25Qcm9taXNlKSA/IG8ucHVzaChbcywgZSwgISFyLCBpLCBtLCBuLCBpLnR5cGVdKSA6IHZvaWQgMCAhPT0gZSAmJiAobVtuXSA9IGUpO1xuICAgICAgICB9KTtcbiAgICAgIH0pLCBkICYmIGQoeyBlbmRJdGVyYXRlT3duOiAhMCwgZW5kOiAhMCB9KTtpZiAoaS5pdGVyYXRlVW5zZXROdW1lcmljKSB7XG4gICAgICAgIGZvciAodmFyIFMgPSB0Lmxlbmd0aCwgdyA9IGZ1bmN0aW9uIF9sb29wMihuKSB7XG4gICAgICAgICAgaWYgKCEobiBpbiB0KSkge1xuICAgICAgICAgICAgdmFyIHMgPSBlICsgKGUgPyBcIi5cIiA6IFwiXCIpICsgbjtfYWRhcHRCdWlsdGluU3RhdGVPYmplY3RQcm9wZXJ0aWVzKGksIHsgb3duS2V5czogITEgfSwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICB2YXIgZSA9IF9lbmNhcHN1bGF0ZShzLCB2b2lkIDAsICEhciwgaSwgbywgYSk7aGFzQ29uc3RydWN0b3JPZihlLCBUeXBlc29uUHJvbWlzZSkgPyBvLnB1c2goW3MsIGUsICEhciwgaSwgbSwgbiwgaS50eXBlXSkgOiB2b2lkIDAgIT09IGUgJiYgKG1bbl0gPSBlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSwgQSA9IDA7IEEgPCBTOyBBKyspIHtcbiAgICAgICAgICB3KEEpO1xuICAgICAgICB9ZCAmJiBkKHsgZW5kSXRlcmF0ZVVuc2V0TnVtZXJpYzogITAsIGVuZDogITAgfSk7XG4gICAgICB9cmV0dXJuIG07XG4gICAgfWZ1bmN0aW9uIHJlcGxhY2UoZSwgaSwgbywgcywgdSwgeSwgcCkge1xuICAgICAgZm9yICh2YXIgbCA9IHUgPyBuIDogdCwgaCA9IGwubGVuZ3RoOyBoLS07KSB7XG4gICAgICAgIHZhciB2ID0gbFtoXTtpZiAodi50ZXN0KGksIG8pKSB7XG4gICAgICAgICAgdmFyIGQgPSB2LnR5cGU7aWYgKHJbZF0pIHtcbiAgICAgICAgICAgIHZhciBiID0gY1tlXTtjW2VdID0gYiA/IFtkXS5jb25jYXQoYikgOiBkO1xuICAgICAgICAgIH1yZXR1cm4gT2JqZWN0LmFzc2lnbihvLCB7IHR5cGU6IGQsIHJlcGxhY2VkOiAhMCB9KSwgIWEgJiYgdi5yZXBsYWNlQXN5bmMgfHwgdi5yZXBsYWNlID8gKHAgJiYgcCh7IHJlcGxhY2luZzogITAgfSksIF9lbmNhcHN1bGF0ZShlLCB2W2EgfHwgIXYucmVwbGFjZUFzeW5jID8gXCJyZXBsYWNlXCIgOiBcInJlcGxhY2VBc3luY1wiXShpLCBvKSwgZiAmJiBcInJlYWRvbmx5XCIsIG8sIHMsIHksIGQpKSA6IChwICYmIHAoeyB0eXBlRGV0ZWN0ZWQ6ICEwIH0pLCBfZW5jYXBzdWxhdGUoZSwgaSwgZiAmJiBcInJlYWRvbmx5XCIsIG8sIHMsIHksIGQpKTtcbiAgICAgICAgfVxuICAgICAgfXJldHVybiBpO1xuICAgIH1cbiAgfTt0aGlzLmVuY2Fwc3VsYXRlU3luYyA9IGZ1bmN0aW9uIChlLCBuLCB0KSB7XG4gICAgcmV0dXJuIGEoZSwgbiwgT2JqZWN0LmFzc2lnbih7fSwgeyB0aHJvd09uQmFkU3luY1R5cGU6ICEwIH0sIHQsIHsgc3luYzogITAgfSkpO1xuICB9LCB0aGlzLmVuY2Fwc3VsYXRlQXN5bmMgPSBmdW5jdGlvbiAoZSwgbiwgdCkge1xuICAgIHJldHVybiBhKGUsIG4sIE9iamVjdC5hc3NpZ24oe30sIHsgdGhyb3dPbkJhZFN5bmNUeXBlOiAhMCB9LCB0LCB7IHN5bmM6ICExIH0pKTtcbiAgfTt2YXIgYyA9IHRoaXMucmV2aXZlID0gZnVuY3Rpb24gKG4sIHQpIHtcbiAgICB2YXIgaSA9ICh0ID0gT2JqZWN0LmFzc2lnbih7IHN5bmM6ICEwIH0sIGUsIHQpKS5zeW5jLFxuICAgICAgICBvID0gbiAmJiBuLiR0eXBlcyxcbiAgICAgICAgcyA9ICEwO2lmICghbykgcmV0dXJuIG47aWYgKCEwID09PSBvKSByZXR1cm4gbi4kO28uJCAmJiBpc1BsYWluT2JqZWN0KG8uJCkgJiYgKG4gPSBuLiQsIG8gPSBvLiQsIHMgPSAhMSk7dmFyIGEgPSBbXSxcbiAgICAgICAgYyA9IHt9LFxuICAgICAgICB1ID0gZnVuY3Rpb24gX3Jldml2ZShlLCBuLCB0LCBpLCB1LCB5KSB7XG4gICAgICBpZiAocyAmJiBcIiR0eXBlc1wiID09PSBlKSByZXR1cm47dmFyIHAgPSBvW2VdO2lmIChpc0FycmF5KG4pIHx8IGlzUGxhaW5PYmplY3QobikpIHtcbiAgICAgICAgdmFyIGYgPSBpc0FycmF5KG4pID8gbmV3IEFycmF5KG4ubGVuZ3RoKSA6IHt9O2ZvciAoa2V5cyhuKS5mb3JFYWNoKGZ1bmN0aW9uIChyKSB7XG4gICAgICAgICAgdmFyIG8gPSBfcmV2aXZlKGUgKyAoZSA/IFwiLlwiIDogXCJcIikgKyBlc2NhcGVLZXlQYXRoQ29tcG9uZW50KHIpLCBuW3JdLCB0IHx8IGYsIGksIGYsIHIpO2hhc0NvbnN0cnVjdG9yT2YobywgVW5kZWZpbmVkKSA/IGZbcl0gPSB2b2lkIDAgOiB2b2lkIDAgIT09IG8gJiYgKGZbcl0gPSBvKTtcbiAgICAgICAgfSksIG4gPSBmOyBhLmxlbmd0aDspIHtcbiAgICAgICAgICB2YXIgbCA9IHNsaWNlZFRvQXJyYXkoYVswXSwgNCksXG4gICAgICAgICAgICAgIGggPSBsWzBdLFxuICAgICAgICAgICAgICB2ID0gbFsxXSxcbiAgICAgICAgICAgICAgZCA9IGxbMl0sXG4gICAgICAgICAgICAgIGIgPSBsWzNdLFxuICAgICAgICAgICAgICBPID0gZ2V0QnlLZXlQYXRoKGgsIHYpO2lmIChoYXNDb25zdHJ1Y3Rvck9mKE8sIFVuZGVmaW5lZCkpIGRbYl0gPSB2b2lkIDA7ZWxzZSB7XG4gICAgICAgICAgICBpZiAodm9pZCAwID09PSBPKSBicmVhaztkW2JdID0gTztcbiAgICAgICAgICB9YS5zcGxpY2UoMCwgMSk7XG4gICAgICAgIH1cbiAgICAgIH1pZiAoIXApIHJldHVybiBuO2lmIChcIiNcIiA9PT0gcCkge1xuICAgICAgICB2YXIgZyA9IGdldEJ5S2V5UGF0aCh0LCBuLnN1YnN0cigxKSk7cmV0dXJuIHZvaWQgMCA9PT0gZyAmJiBhLnB1c2goW3QsIG4uc3Vic3RyKDEpLCB1LCB5XSksIGc7XG4gICAgICB9dmFyIFQgPSBpLnN5bmM7cmV0dXJuIFtdLmNvbmNhdChwKS5yZWR1Y2UoZnVuY3Rpb24gKGUsIG4pIHtcbiAgICAgICAgdmFyIHQgPSByW25dO2lmICghdCkgdGhyb3cgbmV3IEVycm9yKFwiVW5yZWdpc3RlcmVkIHR5cGU6IFwiICsgbik7cmV0dXJuIHRbVCAmJiB0LnJldml2ZSA/IFwicmV2aXZlXCIgOiAhVCAmJiB0LnJldml2ZUFzeW5jID8gXCJyZXZpdmVBc3luY1wiIDogXCJyZXZpdmVcIl0oZSwgYyk7XG4gICAgICB9LCBuKTtcbiAgICB9KFwiXCIsIG4sIG51bGwsIHQpO3JldHVybiBpc1RoZW5hYmxlKHUgPSBoYXNDb25zdHJ1Y3Rvck9mKHUsIFVuZGVmaW5lZCkgPyB2b2lkIDAgOiB1KSA/IGkgJiYgdC50aHJvd09uQmFkU3luY1R5cGUgPyBmdW5jdGlvbiAoKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3luYyBtZXRob2QgcmVxdWVzdGVkIGJ1dCBhc3luYyByZXN1bHQgb2J0YWluZWRcIik7XG4gICAgfSgpIDogdSA6ICFpICYmIHQudGhyb3dPbkJhZFN5bmNUeXBlID8gZnVuY3Rpb24gKCkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkFzeW5jIG1ldGhvZCByZXF1ZXN0ZWQgYnV0IHN5bmMgcmVzdWx0IG9idGFpbmVkXCIpO1xuICAgIH0oKSA6IGkgPyB1IDogUHJvbWlzZS5yZXNvbHZlKHUpO1xuICB9O3RoaXMucmV2aXZlU3luYyA9IGZ1bmN0aW9uIChlLCBuKSB7XG4gICAgcmV0dXJuIGMoZSwgT2JqZWN0LmFzc2lnbih7fSwgeyB0aHJvd09uQmFkU3luY1R5cGU6ICEwIH0sIG4sIHsgc3luYzogITAgfSkpO1xuICB9LCB0aGlzLnJldml2ZUFzeW5jID0gZnVuY3Rpb24gKGUsIG4pIHtcbiAgICByZXR1cm4gYyhlLCBPYmplY3QuYXNzaWduKHt9LCB7IHRocm93T25CYWRTeW5jVHlwZTogITAgfSwgbiwgeyBzeW5jOiAhMSB9KSk7XG4gIH0sIHRoaXMucmVnaXN0ZXIgPSBmdW5jdGlvbiAoZSwgbykge1xuICAgIHJldHVybiBvID0gbyB8fCB7fSwgW10uY29uY2F0KGUpLmZvckVhY2goZnVuY3Rpb24gUihlKSB7XG4gICAgICBpZiAoaXNBcnJheShlKSkgcmV0dXJuIGUubWFwKFIpO2UgJiYga2V5cyhlKS5mb3JFYWNoKGZ1bmN0aW9uIChzKSB7XG4gICAgICAgIGlmIChcIiNcIiA9PT0gcykgdGhyb3cgbmV3IFR5cGVFcnJvcihcIiMgY2Fubm90IGJlIHVzZWQgYXMgYSB0eXBlIG5hbWUgYXMgaXQgaXMgcmVzZXJ2ZWQgZm9yIGN5Y2xpYyBvYmplY3RzXCIpO2lmIChUeXBlc29uLkpTT05fVFlQRVMuaW5jbHVkZXMocykpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJQbGFpbiBKU09OIG9iamVjdCB0eXBlcyBhcmUgcmVzZXJ2ZWQgYXMgdHlwZSBuYW1lc1wiKTt2YXIgYSA9IGVbc10sXG4gICAgICAgICAgICBjID0gYS50ZXN0UGxhaW5PYmplY3RzID8gbiA6IHQsXG4gICAgICAgICAgICB1ID0gYy5maWx0ZXIoZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICByZXR1cm4gZS50eXBlID09PSBzO1xuICAgICAgICB9KTtpZiAodS5sZW5ndGggJiYgKGMuc3BsaWNlKGMuaW5kZXhPZih1WzBdKSwgMSksIGRlbGV0ZSByW3NdLCBkZWxldGUgaVtzXSksIGEpIHtcbiAgICAgICAgICBpZiAoXCJmdW5jdGlvblwiID09IHR5cGVvZiBhKSB7XG4gICAgICAgICAgICB2YXIgeSA9IGE7YSA9IHsgdGVzdDogZnVuY3Rpb24gdGVzdChlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGUgJiYgZS5jb25zdHJ1Y3RvciA9PT0geTtcbiAgICAgICAgICAgICAgfSwgcmVwbGFjZTogZnVuY3Rpb24gcmVwbGFjZShlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGFzc2lnbih7fSwgZSk7XG4gICAgICAgICAgICAgIH0sIHJldml2ZTogZnVuY3Rpb24gcmV2aXZlKGUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gYXNzaWduKE9iamVjdC5jcmVhdGUoeS5wcm90b3R5cGUpLCBlKTtcbiAgICAgICAgICAgICAgfSB9O1xuICAgICAgICAgIH0gZWxzZSBpc0FycmF5KGEpICYmIChhID0geyB0ZXN0OiBhWzBdLCByZXBsYWNlOiBhWzFdLCByZXZpdmU6IGFbMl0gfSk7dmFyIHAgPSB7IHR5cGU6IHMsIHRlc3Q6IGEudGVzdC5iaW5kKGEpIH07YS5yZXBsYWNlICYmIChwLnJlcGxhY2UgPSBhLnJlcGxhY2UuYmluZChhKSksIGEucmVwbGFjZUFzeW5jICYmIChwLnJlcGxhY2VBc3luYyA9IGEucmVwbGFjZUFzeW5jLmJpbmQoYSkpO3ZhciBmID0gXCJudW1iZXJcIiA9PSB0eXBlb2Ygby5mYWxsYmFjayA/IG8uZmFsbGJhY2sgOiBvLmZhbGxiYWNrID8gMCA6IDEgLyAwO2lmIChhLnRlc3RQbGFpbk9iamVjdHMgPyBuLnNwbGljZShmLCAwLCBwKSA6IHQuc3BsaWNlKGYsIDAsIHApLCBhLnJldml2ZSB8fCBhLnJldml2ZUFzeW5jKSB7XG4gICAgICAgICAgICB2YXIgbCA9IHt9O2EucmV2aXZlICYmIChsLnJldml2ZSA9IGEucmV2aXZlLmJpbmQoYSkpLCBhLnJldml2ZUFzeW5jICYmIChsLnJldml2ZUFzeW5jID0gYS5yZXZpdmVBc3luYy5iaW5kKGEpKSwgcltzXSA9IGw7XG4gICAgICAgICAgfWlbc10gPSBhO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KSwgdGhpcztcbiAgfTtcbn1mdW5jdGlvbiBhc3NpZ24oZSwgbikge1xuICByZXR1cm4ga2V5cyhuKS5tYXAoZnVuY3Rpb24gKHQpIHtcbiAgICBlW3RdID0gblt0XTtcbiAgfSksIGU7XG59ZnVuY3Rpb24gZXNjYXBlS2V5UGF0aENvbXBvbmVudChlKSB7XG4gIHJldHVybiBlLnJlcGxhY2UoL34vZywgXCJ+MFwiKS5yZXBsYWNlKC9cXC4vZywgXCJ+MVwiKTtcbn1mdW5jdGlvbiB1bmVzY2FwZUtleVBhdGhDb21wb25lbnQoZSkge1xuICByZXR1cm4gZS5yZXBsYWNlKC9+MS9nLCBcIi5cIikucmVwbGFjZSgvfjAvZywgXCJ+XCIpO1xufWZ1bmN0aW9uIGdldEJ5S2V5UGF0aChlLCBuKSB7XG4gIGlmIChcIlwiID09PSBuKSByZXR1cm4gZTt2YXIgdCA9IG4uaW5kZXhPZihcIi5cIik7aWYgKHQgPiAtMSkge1xuICAgIHZhciByID0gZVt1bmVzY2FwZUtleVBhdGhDb21wb25lbnQobi5zdWJzdHIoMCwgdCkpXTtyZXR1cm4gdm9pZCAwID09PSByID8gdm9pZCAwIDogZ2V0QnlLZXlQYXRoKHIsIG4uc3Vic3RyKHQgKyAxKSk7XG4gIH1yZXR1cm4gZVt1bmVzY2FwZUtleVBhdGhDb21wb25lbnQobildO1xufWZ1bmN0aW9uIFVuZGVmaW5lZCgpIHt9ZnVuY3Rpb24gVHlwZXNvblByb21pc2UoZSkge1xuICB0aGlzLnAgPSBuZXcgUHJvbWlzZShlKTtcbn1UeXBlc29uUHJvbWlzZS5wcm90b3R5cGUudGhlbiA9IGZ1bmN0aW9uIChlLCBuKSB7XG4gIHZhciB0ID0gdGhpcztyZXR1cm4gbmV3IFR5cGVzb25Qcm9taXNlKGZ1bmN0aW9uIChyLCBpKSB7XG4gICAgdC5wLnRoZW4oZnVuY3Rpb24gKG4pIHtcbiAgICAgIHIoZSA/IGUobikgOiBuKTtcbiAgICB9LCBmdW5jdGlvbiAoZSkge1xuICAgICAgdC5wLmNhdGNoKGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIHJldHVybiBuID8gbihlKSA6IFByb21pc2UucmVqZWN0KGUpO1xuICAgICAgfSkudGhlbihyLCBpKTtcbiAgICB9KTtcbiAgfSk7XG59LCBUeXBlc29uUHJvbWlzZS5wcm90b3R5cGUuY2F0Y2ggPSBmdW5jdGlvbiAoZSkge1xuICByZXR1cm4gdGhpcy50aGVuKG51bGwsIGUpO1xufSwgVHlwZXNvblByb21pc2UucmVzb2x2ZSA9IGZ1bmN0aW9uIChlKSB7XG4gIHJldHVybiBuZXcgVHlwZXNvblByb21pc2UoZnVuY3Rpb24gKG4pIHtcbiAgICBuKGUpO1xuICB9KTtcbn0sIFR5cGVzb25Qcm9taXNlLnJlamVjdCA9IGZ1bmN0aW9uIChlKSB7XG4gIHJldHVybiBuZXcgVHlwZXNvblByb21pc2UoZnVuY3Rpb24gKG4sIHQpIHtcbiAgICB0KGUpO1xuICB9KTtcbn0sIFtcImFsbFwiLCBcInJhY2VcIl0ubWFwKGZ1bmN0aW9uIChlKSB7XG4gIFR5cGVzb25Qcm9taXNlW2VdID0gZnVuY3Rpb24gKG4pIHtcbiAgICByZXR1cm4gbmV3IFR5cGVzb25Qcm9taXNlKGZ1bmN0aW9uICh0LCByKSB7XG4gICAgICBQcm9taXNlW2VdKG4ubWFwKGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIHJldHVybiBlLnA7XG4gICAgICB9KSkudGhlbih0LCByKTtcbiAgICB9KTtcbiAgfTtcbn0pLCBUeXBlc29uLlVuZGVmaW5lZCA9IFVuZGVmaW5lZCwgVHlwZXNvbi5Qcm9taXNlID0gVHlwZXNvblByb21pc2UsIFR5cGVzb24uaXNUaGVuYWJsZSA9IGlzVGhlbmFibGUsIFR5cGVzb24udG9TdHJpbmdUYWcgPSB0b1N0cmluZ1RhZywgVHlwZXNvbi5oYXNDb25zdHJ1Y3Rvck9mID0gaGFzQ29uc3RydWN0b3JPZiwgVHlwZXNvbi5pc09iamVjdCA9IGlzT2JqZWN0LCBUeXBlc29uLmlzUGxhaW5PYmplY3QgPSBpc1BsYWluT2JqZWN0LCBUeXBlc29uLmlzVXNlck9iamVjdCA9IGlzVXNlck9iamVjdCwgVHlwZXNvbi5lc2NhcGVLZXlQYXRoQ29tcG9uZW50ID0gZXNjYXBlS2V5UGF0aENvbXBvbmVudCwgVHlwZXNvbi51bmVzY2FwZUtleVBhdGhDb21wb25lbnQgPSB1bmVzY2FwZUtleVBhdGhDb21wb25lbnQsIFR5cGVzb24uZ2V0QnlLZXlQYXRoID0gZ2V0QnlLZXlQYXRoLCBUeXBlc29uLmdldEpTT05UeXBlID0gZnVuY3Rpb24gKGUpIHtcbiAgcmV0dXJuIG51bGwgPT09IGUgPyBcIm51bGxcIiA6IGlzQXJyYXkoZSkgPyBcImFycmF5XCIgOiB2b2lkIDAgPT09IGUgPyBcInVuZGVmaW5lZFwiIDogX3R5cGVvZihlKTtcbn0sIFR5cGVzb24uSlNPTl9UWVBFUyA9IFtcIm51bGxcIiwgXCJib29sZWFuXCIsIFwibnVtYmVyXCIsIFwic3RyaW5nXCIsIFwiYXJyYXlcIiwgXCJvYmplY3RcIl0sIG1vZHVsZS5leHBvcnRzID0gVHlwZXNvbjtcblxufSx7fV0sNDg6W2Z1bmN0aW9uKF9kZXJlcV8sbW9kdWxlLGV4cG9ydHMpe1xuXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBfdHlwZW9mID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPT09IFwic3ltYm9sXCIgPyBmdW5jdGlvbiAob2JqKSB7IHJldHVybiB0eXBlb2Ygb2JqOyB9IDogZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gb2JqICYmIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvYmouY29uc3RydWN0b3IgPT09IFN5bWJvbCAmJiBvYmogIT09IFN5bWJvbC5wcm90b3R5cGUgPyBcInN5bWJvbFwiIDogdHlwZW9mIG9iajsgfTtcblxuZnVuY3Rpb24gXyhtZXNzYWdlLCBvcHRzKSB7XG4gICAgcmV0dXJuIChvcHRzICYmIG9wdHMuY29udGV4dCA/IG9wdHMuY29udGV4dCA6IFwiVmFsdWVcIikgKyBcIiBcIiArIG1lc3NhZ2UgKyBcIi5cIjtcbn1cblxuZnVuY3Rpb24gdHlwZShWKSB7XG4gICAgaWYgKFYgPT09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIFwiTnVsbFwiO1xuICAgIH1cbiAgICBzd2l0Y2ggKHR5cGVvZiBWID09PSBcInVuZGVmaW5lZFwiID8gXCJ1bmRlZmluZWRcIiA6IF90eXBlb2YoVikpIHtcbiAgICAgICAgY2FzZSBcInVuZGVmaW5lZFwiOlxuICAgICAgICAgICAgcmV0dXJuIFwiVW5kZWZpbmVkXCI7XG4gICAgICAgIGNhc2UgXCJib29sZWFuXCI6XG4gICAgICAgICAgICByZXR1cm4gXCJCb29sZWFuXCI7XG4gICAgICAgIGNhc2UgXCJudW1iZXJcIjpcbiAgICAgICAgICAgIHJldHVybiBcIk51bWJlclwiO1xuICAgICAgICBjYXNlIFwic3RyaW5nXCI6XG4gICAgICAgICAgICByZXR1cm4gXCJTdHJpbmdcIjtcbiAgICAgICAgY2FzZSBcInN5bWJvbFwiOlxuICAgICAgICAgICAgcmV0dXJuIFwiU3ltYm9sXCI7XG4gICAgICAgIGNhc2UgXCJvYmplY3RcIjpcbiAgICAgICAgLy8gRmFsbHMgdGhyb3VnaFxuICAgICAgICBjYXNlIFwiZnVuY3Rpb25cIjpcbiAgICAgICAgLy8gRmFsbHMgdGhyb3VnaFxuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgLy8gUGVyIEVTIHNwZWMsIHR5cGVvZiByZXR1cm5zIGFuIGltcGxlbWVudGlvbi1kZWZpbmVkIHZhbHVlIHRoYXQgaXMgbm90IGFueSBvZiB0aGUgZXhpc3Rpbmcgb25lcyBmb3JcbiAgICAgICAgICAgIC8vIHVuY2FsbGFibGUgbm9uLXN0YW5kYXJkIGV4b3RpYyBvYmplY3RzLiBZZXQgVHlwZSgpIHdoaWNoIHRoZSBXZWIgSURMIHNwZWMgZGVwZW5kcyBvbiByZXR1cm5zIE9iamVjdCBmb3JcbiAgICAgICAgICAgIC8vIHN1Y2ggY2FzZXMuIFNvIHRyZWF0IHRoZSBkZWZhdWx0IGNhc2UgYXMgYW4gb2JqZWN0LlxuICAgICAgICAgICAgcmV0dXJuIFwiT2JqZWN0XCI7XG4gICAgfVxufVxuXG4vLyBSb3VuZCB4IHRvIHRoZSBuZWFyZXN0IGludGVnZXIsIGNob29zaW5nIHRoZSBldmVuIGludGVnZXIgaWYgaXQgbGllcyBoYWxmd2F5IGJldHdlZW4gdHdvLlxuZnVuY3Rpb24gZXZlblJvdW5kKHgpIHtcbiAgICAvLyBUaGVyZSBhcmUgZm91ciBjYXNlcyBmb3IgbnVtYmVycyB3aXRoIGZyYWN0aW9uYWwgcGFydCBiZWluZyAuNTpcbiAgICAvL1xuICAgIC8vIGNhc2UgfCAgICAgeCAgICAgfCBmbG9vcih4KSB8IHJvdW5kKHgpIHwgZXhwZWN0ZWQgfCB4IDw+IDAgfCB4ICUgMSB8IHggJiAxIHwgICBleGFtcGxlXG4gICAgLy8gICAxICB8ICAybiArIDAuNSB8ICAybiAgICAgIHwgIDJuICsgMSAgfCAgMm4gICAgICB8ICAgPiAgICB8ICAwLjUgIHwgICAwICAgfCAgMC41IC0+ICAwXG4gICAgLy8gICAyICB8ICAybiArIDEuNSB8ICAybiArIDEgIHwgIDJuICsgMiAgfCAgMm4gKyAyICB8ICAgPiAgICB8ICAwLjUgIHwgICAxICAgfCAgMS41IC0+ICAyXG4gICAgLy8gICAzICB8IC0ybiAtIDAuNSB8IC0ybiAtIDEgIHwgLTJuICAgICAgfCAtMm4gICAgICB8ICAgPCAgICB8IC0wLjUgIHwgICAwICAgfCAtMC41IC0+ICAwXG4gICAgLy8gICA0ICB8IC0ybiAtIDEuNSB8IC0ybiAtIDIgIHwgLTJuIC0gMSAgfCAtMm4gLSAyICB8ICAgPCAgICB8IC0wLjUgIHwgICAxICAgfCAtMS41IC0+IC0yXG4gICAgLy8gKHdoZXJlIG4gaXMgYSBub24tbmVnYXRpdmUgaW50ZWdlcilcbiAgICAvL1xuICAgIC8vIEJyYW5jaCBoZXJlIGZvciBjYXNlcyAxIGFuZCA0XG4gICAgaWYgKHggPiAwICYmIHggJSAxID09PSArMC41ICYmICh4ICYgMSkgPT09IDAgfHwgeCA8IDAgJiYgeCAlIDEgPT09IC0wLjUgJiYgKHggJiAxKSA9PT0gMSkge1xuICAgICAgICByZXR1cm4gY2Vuc29yTmVnYXRpdmVaZXJvKE1hdGguZmxvb3IoeCkpO1xuICAgIH1cblxuICAgIHJldHVybiBjZW5zb3JOZWdhdGl2ZVplcm8oTWF0aC5yb3VuZCh4KSk7XG59XG5cbmZ1bmN0aW9uIGludGVnZXJQYXJ0KG4pIHtcbiAgICByZXR1cm4gY2Vuc29yTmVnYXRpdmVaZXJvKE1hdGgudHJ1bmMobikpO1xufVxuXG5mdW5jdGlvbiBzaWduKHgpIHtcbiAgICByZXR1cm4geCA8IDAgPyAtMSA6IDE7XG59XG5cbmZ1bmN0aW9uIG1vZHVsbyh4LCB5KSB7XG4gICAgLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNlcW4tbW9kdWxvXG4gICAgLy8gTm90ZSB0aGF0IGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzQ0Njc1NTkvMzE5MSBkb2VzIE5PVCB3b3JrIGZvciBsYXJnZSBtb2R1bG9zXG4gICAgdmFyIHNpZ25NaWdodE5vdE1hdGNoID0geCAlIHk7XG4gICAgaWYgKHNpZ24oeSkgIT09IHNpZ24oc2lnbk1pZ2h0Tm90TWF0Y2gpKSB7XG4gICAgICAgIHJldHVybiBzaWduTWlnaHROb3RNYXRjaCArIHk7XG4gICAgfVxuICAgIHJldHVybiBzaWduTWlnaHROb3RNYXRjaDtcbn1cblxuZnVuY3Rpb24gY2Vuc29yTmVnYXRpdmVaZXJvKHgpIHtcbiAgICByZXR1cm4geCA9PT0gMCA/IDAgOiB4O1xufVxuXG5mdW5jdGlvbiBjcmVhdGVJbnRlZ2VyQ29udmVyc2lvbihiaXRMZW5ndGgsIHR5cGVPcHRzKSB7XG4gICAgdmFyIGlzU2lnbmVkID0gIXR5cGVPcHRzLnVuc2lnbmVkO1xuXG4gICAgdmFyIGxvd2VyQm91bmQgPSB2b2lkIDA7XG4gICAgdmFyIHVwcGVyQm91bmQgPSB2b2lkIDA7XG4gICAgaWYgKGJpdExlbmd0aCA9PT0gNjQpIHtcbiAgICAgICAgdXBwZXJCb3VuZCA9IE1hdGgucG93KDIsIDUzKSAtIDE7XG4gICAgICAgIGxvd2VyQm91bmQgPSAhaXNTaWduZWQgPyAwIDogLU1hdGgucG93KDIsIDUzKSArIDE7XG4gICAgfSBlbHNlIGlmICghaXNTaWduZWQpIHtcbiAgICAgICAgbG93ZXJCb3VuZCA9IDA7XG4gICAgICAgIHVwcGVyQm91bmQgPSBNYXRoLnBvdygyLCBiaXRMZW5ndGgpIC0gMTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBsb3dlckJvdW5kID0gLU1hdGgucG93KDIsIGJpdExlbmd0aCAtIDEpO1xuICAgICAgICB1cHBlckJvdW5kID0gTWF0aC5wb3coMiwgYml0TGVuZ3RoIC0gMSkgLSAxO1xuICAgIH1cblxuICAgIHZhciB0d29Ub1RoZUJpdExlbmd0aCA9IE1hdGgucG93KDIsIGJpdExlbmd0aCk7XG4gICAgdmFyIHR3b1RvT25lTGVzc1RoYW5UaGVCaXRMZW5ndGggPSBNYXRoLnBvdygyLCBiaXRMZW5ndGggLSAxKTtcblxuICAgIHJldHVybiBmdW5jdGlvbiAoViwgb3B0cykge1xuICAgICAgICBpZiAob3B0cyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBvcHRzID0ge307XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgeCA9ICtWO1xuICAgICAgICB4ID0gY2Vuc29yTmVnYXRpdmVaZXJvKHgpOyAvLyBTcGVjIGRpc2N1c3Npb24gb25nb2luZzogaHR0cHM6Ly9naXRodWIuY29tL2hleWNhbS93ZWJpZGwvaXNzdWVzLzMwNlxuXG4gICAgICAgIGlmIChvcHRzLmVuZm9yY2VSYW5nZSkge1xuICAgICAgICAgICAgaWYgKCFOdW1iZXIuaXNGaW5pdGUoeCkpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKF8oXCJpcyBub3QgYSBmaW5pdGUgbnVtYmVyXCIsIG9wdHMpKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgeCA9IGludGVnZXJQYXJ0KHgpO1xuXG4gICAgICAgICAgICBpZiAoeCA8IGxvd2VyQm91bmQgfHwgeCA+IHVwcGVyQm91bmQpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKF8oXCJpcyBvdXRzaWRlIHRoZSBhY2NlcHRlZCByYW5nZSBvZiBcIiArIGxvd2VyQm91bmQgKyBcIiB0byBcIiArIHVwcGVyQm91bmQgKyBcIiwgaW5jbHVzaXZlXCIsIG9wdHMpKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHg7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIU51bWJlci5pc05hTih4KSAmJiBvcHRzLmNsYW1wKSB7XG4gICAgICAgICAgICB4ID0gTWF0aC5taW4oTWF0aC5tYXgoeCwgbG93ZXJCb3VuZCksIHVwcGVyQm91bmQpO1xuICAgICAgICAgICAgeCA9IGV2ZW5Sb3VuZCh4KTtcbiAgICAgICAgICAgIHJldHVybiB4O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFOdW1iZXIuaXNGaW5pdGUoeCkgfHwgeCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgIH1cbiAgICAgICAgeCA9IGludGVnZXJQYXJ0KHgpO1xuXG4gICAgICAgIC8vIE1hdGgucG93KDIsIDY0KSBpcyBub3QgYWNjdXJhdGVseSByZXByZXNlbnRhYmxlIGluIEphdmFTY3JpcHQsIHNvIHRyeSB0byBhdm9pZCB0aGVzZSBwZXItc3BlYyBvcGVyYXRpb25zIGlmXG4gICAgICAgIC8vIHBvc3NpYmxlLiBIb3BlZnVsbHkgaXQncyBhbiBvcHRpbWl6YXRpb24gZm9yIHRoZSBub24tNjQtYml0TGVuZ3RoIGNhc2VzIHRvby5cbiAgICAgICAgaWYgKHggPj0gbG93ZXJCb3VuZCAmJiB4IDw9IHVwcGVyQm91bmQpIHtcbiAgICAgICAgICAgIHJldHVybiB4O1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gVGhlc2Ugd2lsbCBub3Qgd29yayBncmVhdCBmb3IgYml0TGVuZ3RoIG9mIDY0LCBidXQgb2ggd2VsbC4gU2VlIHRoZSBSRUFETUUgZm9yIG1vcmUgZGV0YWlscy5cbiAgICAgICAgeCA9IG1vZHVsbyh4LCB0d29Ub1RoZUJpdExlbmd0aCk7XG4gICAgICAgIGlmIChpc1NpZ25lZCAmJiB4ID49IHR3b1RvT25lTGVzc1RoYW5UaGVCaXRMZW5ndGgpIHtcbiAgICAgICAgICAgIHJldHVybiB4IC0gdHdvVG9UaGVCaXRMZW5ndGg7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHg7XG4gICAgfTtcbn1cblxuZXhwb3J0cy5hbnkgPSBmdW5jdGlvbiAoVikge1xuICAgIHJldHVybiBWO1xufTtcblxuZXhwb3J0cy52b2lkID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB1bmRlZmluZWQ7XG59O1xuXG5leHBvcnRzLmJvb2xlYW4gPSBmdW5jdGlvbiAodmFsKSB7XG4gICAgcmV0dXJuICEhdmFsO1xufTtcblxuZXhwb3J0cy5ieXRlID0gY3JlYXRlSW50ZWdlckNvbnZlcnNpb24oOCwgeyB1bnNpZ25lZDogZmFsc2UgfSk7XG5leHBvcnRzLm9jdGV0ID0gY3JlYXRlSW50ZWdlckNvbnZlcnNpb24oOCwgeyB1bnNpZ25lZDogdHJ1ZSB9KTtcblxuZXhwb3J0cy5zaG9ydCA9IGNyZWF0ZUludGVnZXJDb252ZXJzaW9uKDE2LCB7IHVuc2lnbmVkOiBmYWxzZSB9KTtcbmV4cG9ydHNbXCJ1bnNpZ25lZCBzaG9ydFwiXSA9IGNyZWF0ZUludGVnZXJDb252ZXJzaW9uKDE2LCB7IHVuc2lnbmVkOiB0cnVlIH0pO1xuXG5leHBvcnRzLmxvbmcgPSBjcmVhdGVJbnRlZ2VyQ29udmVyc2lvbigzMiwgeyB1bnNpZ25lZDogZmFsc2UgfSk7XG5leHBvcnRzW1widW5zaWduZWQgbG9uZ1wiXSA9IGNyZWF0ZUludGVnZXJDb252ZXJzaW9uKDMyLCB7IHVuc2lnbmVkOiB0cnVlIH0pO1xuXG5leHBvcnRzW1wibG9uZyBsb25nXCJdID0gY3JlYXRlSW50ZWdlckNvbnZlcnNpb24oNjQsIHsgdW5zaWduZWQ6IGZhbHNlIH0pO1xuZXhwb3J0c1tcInVuc2lnbmVkIGxvbmcgbG9uZ1wiXSA9IGNyZWF0ZUludGVnZXJDb252ZXJzaW9uKDY0LCB7IHVuc2lnbmVkOiB0cnVlIH0pO1xuXG5leHBvcnRzLmRvdWJsZSA9IGZ1bmN0aW9uIChWLCBvcHRzKSB7XG4gICAgdmFyIHggPSArVjtcblxuICAgIGlmICghTnVtYmVyLmlzRmluaXRlKHgpKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXyhcImlzIG5vdCBhIGZpbml0ZSBmbG9hdGluZy1wb2ludCB2YWx1ZVwiLCBvcHRzKSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHg7XG59O1xuXG5leHBvcnRzW1widW5yZXN0cmljdGVkIGRvdWJsZVwiXSA9IGZ1bmN0aW9uIChWKSB7XG4gICAgdmFyIHggPSArVjtcblxuICAgIHJldHVybiB4O1xufTtcblxuZXhwb3J0cy5mbG9hdCA9IGZ1bmN0aW9uIChWLCBvcHRzKSB7XG4gICAgdmFyIHggPSArVjtcblxuICAgIGlmICghTnVtYmVyLmlzRmluaXRlKHgpKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXyhcImlzIG5vdCBhIGZpbml0ZSBmbG9hdGluZy1wb2ludCB2YWx1ZVwiLCBvcHRzKSk7XG4gICAgfVxuXG4gICAgaWYgKE9iamVjdC5pcyh4LCAtMCkpIHtcbiAgICAgICAgcmV0dXJuIHg7XG4gICAgfVxuXG4gICAgdmFyIHkgPSBNYXRoLmZyb3VuZCh4KTtcblxuICAgIGlmICghTnVtYmVyLmlzRmluaXRlKHkpKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXyhcImlzIG91dHNpZGUgdGhlIHJhbmdlIG9mIGEgc2luZ2xlLXByZWNpc2lvbiBmbG9hdGluZy1wb2ludCB2YWx1ZVwiLCBvcHRzKSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHk7XG59O1xuXG5leHBvcnRzW1widW5yZXN0cmljdGVkIGZsb2F0XCJdID0gZnVuY3Rpb24gKFYpIHtcbiAgICB2YXIgeCA9ICtWO1xuXG4gICAgaWYgKGlzTmFOKHgpKSB7XG4gICAgICAgIHJldHVybiB4O1xuICAgIH1cblxuICAgIGlmIChPYmplY3QuaXMoeCwgLTApKSB7XG4gICAgICAgIHJldHVybiB4O1xuICAgIH1cblxuICAgIHJldHVybiBNYXRoLmZyb3VuZCh4KTtcbn07XG5cbmV4cG9ydHMuRE9NU3RyaW5nID0gZnVuY3Rpb24gKFYsIG9wdHMpIHtcbiAgICBpZiAob3B0cyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIG9wdHMgPSB7fTtcbiAgICB9XG5cbiAgICBpZiAob3B0cy50cmVhdE51bGxBc0VtcHR5U3RyaW5nICYmIFYgPT09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIFwiXCI7XG4gICAgfVxuXG4gICAgaWYgKCh0eXBlb2YgViA9PT0gXCJ1bmRlZmluZWRcIiA/IFwidW5kZWZpbmVkXCIgOiBfdHlwZW9mKFYpKSA9PT0gXCJzeW1ib2xcIikge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKF8oXCJpcyBhIHN5bWJvbCwgd2hpY2ggY2Fubm90IGJlIGNvbnZlcnRlZCB0byBhIHN0cmluZ1wiLCBvcHRzKSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIFN0cmluZyhWKTtcbn07XG5cbmV4cG9ydHMuQnl0ZVN0cmluZyA9IGZ1bmN0aW9uIChWLCBvcHRzKSB7XG4gICAgdmFyIHggPSBleHBvcnRzLkRPTVN0cmluZyhWLCBvcHRzKTtcbiAgICB2YXIgYyA9IHZvaWQgMDtcbiAgICBmb3IgKHZhciBpID0gMDsgKGMgPSB4LmNvZGVQb2ludEF0KGkpKSAhPT0gdW5kZWZpbmVkOyArK2kpIHtcbiAgICAgICAgaWYgKGMgPiAyNTUpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXyhcImlzIG5vdCBhIHZhbGlkIEJ5dGVTdHJpbmdcIiwgb3B0cykpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHg7XG59O1xuXG5leHBvcnRzLlVTVlN0cmluZyA9IGZ1bmN0aW9uIChWLCBvcHRzKSB7XG4gICAgdmFyIFMgPSBleHBvcnRzLkRPTVN0cmluZyhWLCBvcHRzKTtcbiAgICB2YXIgbiA9IFMubGVuZ3RoO1xuICAgIHZhciBVID0gW107XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBuOyArK2kpIHtcbiAgICAgICAgdmFyIGMgPSBTLmNoYXJDb2RlQXQoaSk7XG4gICAgICAgIGlmIChjIDwgMHhEODAwIHx8IGMgPiAweERGRkYpIHtcbiAgICAgICAgICAgIFUucHVzaChTdHJpbmcuZnJvbUNvZGVQb2ludChjKSk7XG4gICAgICAgIH0gZWxzZSBpZiAoMHhEQzAwIDw9IGMgJiYgYyA8PSAweERGRkYpIHtcbiAgICAgICAgICAgIFUucHVzaChTdHJpbmcuZnJvbUNvZGVQb2ludCgweEZGRkQpKTtcbiAgICAgICAgfSBlbHNlIGlmIChpID09PSBuIC0gMSkge1xuICAgICAgICAgICAgVS5wdXNoKFN0cmluZy5mcm9tQ29kZVBvaW50KDB4RkZGRCkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdmFyIGQgPSBTLmNoYXJDb2RlQXQoaSArIDEpO1xuICAgICAgICAgICAgaWYgKDB4REMwMCA8PSBkICYmIGQgPD0gMHhERkZGKSB7XG4gICAgICAgICAgICAgICAgdmFyIGEgPSBjICYgMHgzRkY7XG4gICAgICAgICAgICAgICAgdmFyIGIgPSBkICYgMHgzRkY7XG4gICAgICAgICAgICAgICAgVS5wdXNoKFN0cmluZy5mcm9tQ29kZVBvaW50KCgyIDw8IDE1KSArICgyIDw8IDkpICogYSArIGIpKTtcbiAgICAgICAgICAgICAgICArK2k7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIFUucHVzaChTdHJpbmcuZnJvbUNvZGVQb2ludCgweEZGRkQpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBVLmpvaW4oXCJcIik7XG59O1xuXG5leHBvcnRzLm9iamVjdCA9IGZ1bmN0aW9uIChWLCBvcHRzKSB7XG4gICAgaWYgKHR5cGUoVikgIT09IFwiT2JqZWN0XCIpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihfKFwiaXMgbm90IGFuIG9iamVjdFwiLCBvcHRzKSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIFY7XG59O1xuXG4vLyBOb3QgZXhwb3J0ZWQsIGJ1dCB1c2VkIGluIEZ1bmN0aW9uIGFuZCBWb2lkRnVuY3Rpb24uXG5cbi8vIE5laXRoZXIgRnVuY3Rpb24gbm9yIFZvaWRGdW5jdGlvbiBpcyBkZWZpbmVkIHdpdGggW1RyZWF0Tm9uT2JqZWN0QXNOdWxsXSwgc29cbi8vIGhhbmRsaW5nIGZvciB0aGF0IGlzIG9taXR0ZWQuXG5mdW5jdGlvbiBjb252ZXJ0Q2FsbGJhY2tGdW5jdGlvbihWLCBvcHRzKSB7XG4gICAgaWYgKHR5cGVvZiBWICE9PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihfKFwiaXMgbm90IGEgZnVuY3Rpb25cIiwgb3B0cykpO1xuICAgIH1cbiAgICByZXR1cm4gVjtcbn1cblxuW0Vycm9yLCBBcnJheUJ1ZmZlciwgLy8gVGhlIElzRGV0YWNoZWRCdWZmZXIgYWJzdHJhY3Qgb3BlcmF0aW9uIGlzIG5vdCBleHBvc2VkIGluIEpTXG5EYXRhVmlldywgSW50OEFycmF5LCBJbnQxNkFycmF5LCBJbnQzMkFycmF5LCBVaW50OEFycmF5LCBVaW50MTZBcnJheSwgVWludDMyQXJyYXksIFVpbnQ4Q2xhbXBlZEFycmF5LCBGbG9hdDMyQXJyYXksIEZsb2F0NjRBcnJheV0uZm9yRWFjaChmdW5jdGlvbiAoZnVuYykge1xuICAgIHZhciBuYW1lID0gZnVuYy5uYW1lO1xuICAgIHZhciBhcnRpY2xlID0gL15bQUVJT1VdLy50ZXN0KG5hbWUpID8gXCJhblwiIDogXCJhXCI7XG4gICAgZXhwb3J0c1tuYW1lXSA9IGZ1bmN0aW9uIChWLCBvcHRzKSB7XG4gICAgICAgIGlmICghKFYgaW5zdGFuY2VvZiBmdW5jKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihfKFwiaXMgbm90IFwiICsgYXJ0aWNsZSArIFwiIFwiICsgbmFtZSArIFwiIG9iamVjdFwiLCBvcHRzKSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gVjtcbiAgICB9O1xufSk7XG5cbi8vIENvbW1vbiBkZWZpbml0aW9uc1xuXG5leHBvcnRzLkFycmF5QnVmZmVyVmlldyA9IGZ1bmN0aW9uIChWLCBvcHRzKSB7XG4gICAgaWYgKCFBcnJheUJ1ZmZlci5pc1ZpZXcoVikpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihfKFwiaXMgbm90IGEgdmlldyBvbiBhbiBBcnJheUJ1ZmZlciBvYmplY3RcIiwgb3B0cykpO1xuICAgIH1cblxuICAgIHJldHVybiBWO1xufTtcblxuZXhwb3J0cy5CdWZmZXJTb3VyY2UgPSBmdW5jdGlvbiAoViwgb3B0cykge1xuICAgIGlmICghKEFycmF5QnVmZmVyLmlzVmlldyhWKSB8fCBWIGluc3RhbmNlb2YgQXJyYXlCdWZmZXIpKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXyhcImlzIG5vdCBhbiBBcnJheUJ1ZmZlciBvYmplY3Qgb3IgYSB2aWV3IG9uIG9uZVwiLCBvcHRzKSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIFY7XG59O1xuXG5leHBvcnRzLkRPTVRpbWVTdGFtcCA9IGV4cG9ydHNbXCJ1bnNpZ25lZCBsb25nIGxvbmdcIl07XG5cbmV4cG9ydHMuRnVuY3Rpb24gPSBjb252ZXJ0Q2FsbGJhY2tGdW5jdGlvbjtcblxuZXhwb3J0cy5Wb2lkRnVuY3Rpb24gPSBjb252ZXJ0Q2FsbGJhY2tGdW5jdGlvbjtcblxufSx7fV19LHt9LFsxXSkoMSlcbn0pO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3JlYWxpc3RpYy1zdHJ1Y3R1cmVkLWNsb25lL2Rpc3QvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDQ4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qIVxuICogVGhlIGJ1ZmZlciBtb2R1bGUgZnJvbSBub2RlLmpzLCBmb3IgdGhlIGJyb3dzZXIuXG4gKlxuICogQGF1dGhvciAgIEZlcm9zcyBBYm91a2hhZGlqZWggPGZlcm9zc0BmZXJvc3Mub3JnPiA8aHR0cDovL2Zlcm9zcy5vcmc+XG4gKiBAbGljZW5zZSAgTUlUXG4gKi9cbi8qIGVzbGludC1kaXNhYmxlIG5vLXByb3RvICovXG5cbid1c2Ugc3RyaWN0J1xuXG52YXIgYmFzZTY0ID0gcmVxdWlyZSgnYmFzZTY0LWpzJylcbnZhciBpZWVlNzU0ID0gcmVxdWlyZSgnaWVlZTc1NCcpXG52YXIgaXNBcnJheSA9IHJlcXVpcmUoJ2lzYXJyYXknKVxuXG5leHBvcnRzLkJ1ZmZlciA9IEJ1ZmZlclxuZXhwb3J0cy5TbG93QnVmZmVyID0gU2xvd0J1ZmZlclxuZXhwb3J0cy5JTlNQRUNUX01BWF9CWVRFUyA9IDUwXG5cbi8qKlxuICogSWYgYEJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUYDpcbiAqICAgPT09IHRydWUgICAgVXNlIFVpbnQ4QXJyYXkgaW1wbGVtZW50YXRpb24gKGZhc3Rlc3QpXG4gKiAgID09PSBmYWxzZSAgIFVzZSBPYmplY3QgaW1wbGVtZW50YXRpb24gKG1vc3QgY29tcGF0aWJsZSwgZXZlbiBJRTYpXG4gKlxuICogQnJvd3NlcnMgdGhhdCBzdXBwb3J0IHR5cGVkIGFycmF5cyBhcmUgSUUgMTArLCBGaXJlZm94IDQrLCBDaHJvbWUgNyssIFNhZmFyaSA1LjErLFxuICogT3BlcmEgMTEuNissIGlPUyA0LjIrLlxuICpcbiAqIER1ZSB0byB2YXJpb3VzIGJyb3dzZXIgYnVncywgc29tZXRpbWVzIHRoZSBPYmplY3QgaW1wbGVtZW50YXRpb24gd2lsbCBiZSB1c2VkIGV2ZW5cbiAqIHdoZW4gdGhlIGJyb3dzZXIgc3VwcG9ydHMgdHlwZWQgYXJyYXlzLlxuICpcbiAqIE5vdGU6XG4gKlxuICogICAtIEZpcmVmb3ggNC0yOSBsYWNrcyBzdXBwb3J0IGZvciBhZGRpbmcgbmV3IHByb3BlcnRpZXMgdG8gYFVpbnQ4QXJyYXlgIGluc3RhbmNlcyxcbiAqICAgICBTZWU6IGh0dHBzOi8vYnVnemlsbGEubW96aWxsYS5vcmcvc2hvd19idWcuY2dpP2lkPTY5NTQzOC5cbiAqXG4gKiAgIC0gQ2hyb21lIDktMTAgaXMgbWlzc2luZyB0aGUgYFR5cGVkQXJyYXkucHJvdG90eXBlLnN1YmFycmF5YCBmdW5jdGlvbi5cbiAqXG4gKiAgIC0gSUUxMCBoYXMgYSBicm9rZW4gYFR5cGVkQXJyYXkucHJvdG90eXBlLnN1YmFycmF5YCBmdW5jdGlvbiB3aGljaCByZXR1cm5zIGFycmF5cyBvZlxuICogICAgIGluY29ycmVjdCBsZW5ndGggaW4gc29tZSBzaXR1YXRpb25zLlxuXG4gKiBXZSBkZXRlY3QgdGhlc2UgYnVnZ3kgYnJvd3NlcnMgYW5kIHNldCBgQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlRgIHRvIGBmYWxzZWAgc28gdGhleVxuICogZ2V0IHRoZSBPYmplY3QgaW1wbGVtZW50YXRpb24sIHdoaWNoIGlzIHNsb3dlciBidXQgYmVoYXZlcyBjb3JyZWN0bHkuXG4gKi9cbkJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUID0gZ2xvYmFsLlRZUEVEX0FSUkFZX1NVUFBPUlQgIT09IHVuZGVmaW5lZFxuICA/IGdsb2JhbC5UWVBFRF9BUlJBWV9TVVBQT1JUXG4gIDogdHlwZWRBcnJheVN1cHBvcnQoKVxuXG4vKlxuICogRXhwb3J0IGtNYXhMZW5ndGggYWZ0ZXIgdHlwZWQgYXJyYXkgc3VwcG9ydCBpcyBkZXRlcm1pbmVkLlxuICovXG5leHBvcnRzLmtNYXhMZW5ndGggPSBrTWF4TGVuZ3RoKClcblxuZnVuY3Rpb24gdHlwZWRBcnJheVN1cHBvcnQgKCkge1xuICB0cnkge1xuICAgIHZhciBhcnIgPSBuZXcgVWludDhBcnJheSgxKVxuICAgIGFyci5fX3Byb3RvX18gPSB7X19wcm90b19fOiBVaW50OEFycmF5LnByb3RvdHlwZSwgZm9vOiBmdW5jdGlvbiAoKSB7IHJldHVybiA0MiB9fVxuICAgIHJldHVybiBhcnIuZm9vKCkgPT09IDQyICYmIC8vIHR5cGVkIGFycmF5IGluc3RhbmNlcyBjYW4gYmUgYXVnbWVudGVkXG4gICAgICAgIHR5cGVvZiBhcnIuc3ViYXJyYXkgPT09ICdmdW5jdGlvbicgJiYgLy8gY2hyb21lIDktMTAgbGFjayBgc3ViYXJyYXlgXG4gICAgICAgIGFyci5zdWJhcnJheSgxLCAxKS5ieXRlTGVuZ3RoID09PSAwIC8vIGllMTAgaGFzIGJyb2tlbiBgc3ViYXJyYXlgXG4gIH0gY2F0Y2ggKGUpIHtcbiAgICByZXR1cm4gZmFsc2VcbiAgfVxufVxuXG5mdW5jdGlvbiBrTWF4TGVuZ3RoICgpIHtcbiAgcmV0dXJuIEJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUXG4gICAgPyAweDdmZmZmZmZmXG4gICAgOiAweDNmZmZmZmZmXG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUJ1ZmZlciAodGhhdCwgbGVuZ3RoKSB7XG4gIGlmIChrTWF4TGVuZ3RoKCkgPCBsZW5ndGgpIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignSW52YWxpZCB0eXBlZCBhcnJheSBsZW5ndGgnKVxuICB9XG4gIGlmIChCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCkge1xuICAgIC8vIFJldHVybiBhbiBhdWdtZW50ZWQgYFVpbnQ4QXJyYXlgIGluc3RhbmNlLCBmb3IgYmVzdCBwZXJmb3JtYW5jZVxuICAgIHRoYXQgPSBuZXcgVWludDhBcnJheShsZW5ndGgpXG4gICAgdGhhdC5fX3Byb3RvX18gPSBCdWZmZXIucHJvdG90eXBlXG4gIH0gZWxzZSB7XG4gICAgLy8gRmFsbGJhY2s6IFJldHVybiBhbiBvYmplY3QgaW5zdGFuY2Ugb2YgdGhlIEJ1ZmZlciBjbGFzc1xuICAgIGlmICh0aGF0ID09PSBudWxsKSB7XG4gICAgICB0aGF0ID0gbmV3IEJ1ZmZlcihsZW5ndGgpXG4gICAgfVxuICAgIHRoYXQubGVuZ3RoID0gbGVuZ3RoXG4gIH1cblxuICByZXR1cm4gdGhhdFxufVxuXG4vKipcbiAqIFRoZSBCdWZmZXIgY29uc3RydWN0b3IgcmV0dXJucyBpbnN0YW5jZXMgb2YgYFVpbnQ4QXJyYXlgIHRoYXQgaGF2ZSB0aGVpclxuICogcHJvdG90eXBlIGNoYW5nZWQgdG8gYEJ1ZmZlci5wcm90b3R5cGVgLiBGdXJ0aGVybW9yZSwgYEJ1ZmZlcmAgaXMgYSBzdWJjbGFzcyBvZlxuICogYFVpbnQ4QXJyYXlgLCBzbyB0aGUgcmV0dXJuZWQgaW5zdGFuY2VzIHdpbGwgaGF2ZSBhbGwgdGhlIG5vZGUgYEJ1ZmZlcmAgbWV0aG9kc1xuICogYW5kIHRoZSBgVWludDhBcnJheWAgbWV0aG9kcy4gU3F1YXJlIGJyYWNrZXQgbm90YXRpb24gd29ya3MgYXMgZXhwZWN0ZWQgLS0gaXRcbiAqIHJldHVybnMgYSBzaW5nbGUgb2N0ZXQuXG4gKlxuICogVGhlIGBVaW50OEFycmF5YCBwcm90b3R5cGUgcmVtYWlucyB1bm1vZGlmaWVkLlxuICovXG5cbmZ1bmN0aW9uIEJ1ZmZlciAoYXJnLCBlbmNvZGluZ09yT2Zmc2V0LCBsZW5ndGgpIHtcbiAgaWYgKCFCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCAmJiAhKHRoaXMgaW5zdGFuY2VvZiBCdWZmZXIpKSB7XG4gICAgcmV0dXJuIG5ldyBCdWZmZXIoYXJnLCBlbmNvZGluZ09yT2Zmc2V0LCBsZW5ndGgpXG4gIH1cblxuICAvLyBDb21tb24gY2FzZS5cbiAgaWYgKHR5cGVvZiBhcmcgPT09ICdudW1iZXInKSB7XG4gICAgaWYgKHR5cGVvZiBlbmNvZGluZ09yT2Zmc2V0ID09PSAnc3RyaW5nJykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAnSWYgZW5jb2RpbmcgaXMgc3BlY2lmaWVkIHRoZW4gdGhlIGZpcnN0IGFyZ3VtZW50IG11c3QgYmUgYSBzdHJpbmcnXG4gICAgICApXG4gICAgfVxuICAgIHJldHVybiBhbGxvY1Vuc2FmZSh0aGlzLCBhcmcpXG4gIH1cbiAgcmV0dXJuIGZyb20odGhpcywgYXJnLCBlbmNvZGluZ09yT2Zmc2V0LCBsZW5ndGgpXG59XG5cbkJ1ZmZlci5wb29sU2l6ZSA9IDgxOTIgLy8gbm90IHVzZWQgYnkgdGhpcyBpbXBsZW1lbnRhdGlvblxuXG4vLyBUT0RPOiBMZWdhY3ksIG5vdCBuZWVkZWQgYW55bW9yZS4gUmVtb3ZlIGluIG5leHQgbWFqb3IgdmVyc2lvbi5cbkJ1ZmZlci5fYXVnbWVudCA9IGZ1bmN0aW9uIChhcnIpIHtcbiAgYXJyLl9fcHJvdG9fXyA9IEJ1ZmZlci5wcm90b3R5cGVcbiAgcmV0dXJuIGFyclxufVxuXG5mdW5jdGlvbiBmcm9tICh0aGF0LCB2YWx1ZSwgZW5jb2RpbmdPck9mZnNldCwgbGVuZ3RoKSB7XG4gIGlmICh0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignXCJ2YWx1ZVwiIGFyZ3VtZW50IG11c3Qgbm90IGJlIGEgbnVtYmVyJylcbiAgfVxuXG4gIGlmICh0eXBlb2YgQXJyYXlCdWZmZXIgIT09ICd1bmRlZmluZWQnICYmIHZhbHVlIGluc3RhbmNlb2YgQXJyYXlCdWZmZXIpIHtcbiAgICByZXR1cm4gZnJvbUFycmF5QnVmZmVyKHRoYXQsIHZhbHVlLCBlbmNvZGluZ09yT2Zmc2V0LCBsZW5ndGgpXG4gIH1cblxuICBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xuICAgIHJldHVybiBmcm9tU3RyaW5nKHRoYXQsIHZhbHVlLCBlbmNvZGluZ09yT2Zmc2V0KVxuICB9XG5cbiAgcmV0dXJuIGZyb21PYmplY3QodGhhdCwgdmFsdWUpXG59XG5cbi8qKlxuICogRnVuY3Rpb25hbGx5IGVxdWl2YWxlbnQgdG8gQnVmZmVyKGFyZywgZW5jb2RpbmcpIGJ1dCB0aHJvd3MgYSBUeXBlRXJyb3JcbiAqIGlmIHZhbHVlIGlzIGEgbnVtYmVyLlxuICogQnVmZmVyLmZyb20oc3RyWywgZW5jb2RpbmddKVxuICogQnVmZmVyLmZyb20oYXJyYXkpXG4gKiBCdWZmZXIuZnJvbShidWZmZXIpXG4gKiBCdWZmZXIuZnJvbShhcnJheUJ1ZmZlclssIGJ5dGVPZmZzZXRbLCBsZW5ndGhdXSlcbiAqKi9cbkJ1ZmZlci5mcm9tID0gZnVuY3Rpb24gKHZhbHVlLCBlbmNvZGluZ09yT2Zmc2V0LCBsZW5ndGgpIHtcbiAgcmV0dXJuIGZyb20obnVsbCwgdmFsdWUsIGVuY29kaW5nT3JPZmZzZXQsIGxlbmd0aClcbn1cblxuaWYgKEJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUKSB7XG4gIEJ1ZmZlci5wcm90b3R5cGUuX19wcm90b19fID0gVWludDhBcnJheS5wcm90b3R5cGVcbiAgQnVmZmVyLl9fcHJvdG9fXyA9IFVpbnQ4QXJyYXlcbiAgaWYgKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC5zcGVjaWVzICYmXG4gICAgICBCdWZmZXJbU3ltYm9sLnNwZWNpZXNdID09PSBCdWZmZXIpIHtcbiAgICAvLyBGaXggc3ViYXJyYXkoKSBpbiBFUzIwMTYuIFNlZTogaHR0cHM6Ly9naXRodWIuY29tL2Zlcm9zcy9idWZmZXIvcHVsbC85N1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShCdWZmZXIsIFN5bWJvbC5zcGVjaWVzLCB7XG4gICAgICB2YWx1ZTogbnVsbCxcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pXG4gIH1cbn1cblxuZnVuY3Rpb24gYXNzZXJ0U2l6ZSAoc2l6ZSkge1xuICBpZiAodHlwZW9mIHNpemUgIT09ICdudW1iZXInKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignXCJzaXplXCIgYXJndW1lbnQgbXVzdCBiZSBhIG51bWJlcicpXG4gIH0gZWxzZSBpZiAoc2l6ZSA8IDApIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignXCJzaXplXCIgYXJndW1lbnQgbXVzdCBub3QgYmUgbmVnYXRpdmUnKVxuICB9XG59XG5cbmZ1bmN0aW9uIGFsbG9jICh0aGF0LCBzaXplLCBmaWxsLCBlbmNvZGluZykge1xuICBhc3NlcnRTaXplKHNpemUpXG4gIGlmIChzaXplIDw9IDApIHtcbiAgICByZXR1cm4gY3JlYXRlQnVmZmVyKHRoYXQsIHNpemUpXG4gIH1cbiAgaWYgKGZpbGwgIT09IHVuZGVmaW5lZCkge1xuICAgIC8vIE9ubHkgcGF5IGF0dGVudGlvbiB0byBlbmNvZGluZyBpZiBpdCdzIGEgc3RyaW5nLiBUaGlzXG4gICAgLy8gcHJldmVudHMgYWNjaWRlbnRhbGx5IHNlbmRpbmcgaW4gYSBudW1iZXIgdGhhdCB3b3VsZFxuICAgIC8vIGJlIGludGVycHJldHRlZCBhcyBhIHN0YXJ0IG9mZnNldC5cbiAgICByZXR1cm4gdHlwZW9mIGVuY29kaW5nID09PSAnc3RyaW5nJ1xuICAgICAgPyBjcmVhdGVCdWZmZXIodGhhdCwgc2l6ZSkuZmlsbChmaWxsLCBlbmNvZGluZylcbiAgICAgIDogY3JlYXRlQnVmZmVyKHRoYXQsIHNpemUpLmZpbGwoZmlsbClcbiAgfVxuICByZXR1cm4gY3JlYXRlQnVmZmVyKHRoYXQsIHNpemUpXG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIG5ldyBmaWxsZWQgQnVmZmVyIGluc3RhbmNlLlxuICogYWxsb2Moc2l6ZVssIGZpbGxbLCBlbmNvZGluZ11dKVxuICoqL1xuQnVmZmVyLmFsbG9jID0gZnVuY3Rpb24gKHNpemUsIGZpbGwsIGVuY29kaW5nKSB7XG4gIHJldHVybiBhbGxvYyhudWxsLCBzaXplLCBmaWxsLCBlbmNvZGluZylcbn1cblxuZnVuY3Rpb24gYWxsb2NVbnNhZmUgKHRoYXQsIHNpemUpIHtcbiAgYXNzZXJ0U2l6ZShzaXplKVxuICB0aGF0ID0gY3JlYXRlQnVmZmVyKHRoYXQsIHNpemUgPCAwID8gMCA6IGNoZWNrZWQoc2l6ZSkgfCAwKVxuICBpZiAoIUJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUKSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzaXplOyArK2kpIHtcbiAgICAgIHRoYXRbaV0gPSAwXG4gICAgfVxuICB9XG4gIHJldHVybiB0aGF0XG59XG5cbi8qKlxuICogRXF1aXZhbGVudCB0byBCdWZmZXIobnVtKSwgYnkgZGVmYXVsdCBjcmVhdGVzIGEgbm9uLXplcm8tZmlsbGVkIEJ1ZmZlciBpbnN0YW5jZS5cbiAqICovXG5CdWZmZXIuYWxsb2NVbnNhZmUgPSBmdW5jdGlvbiAoc2l6ZSkge1xuICByZXR1cm4gYWxsb2NVbnNhZmUobnVsbCwgc2l6ZSlcbn1cbi8qKlxuICogRXF1aXZhbGVudCB0byBTbG93QnVmZmVyKG51bSksIGJ5IGRlZmF1bHQgY3JlYXRlcyBhIG5vbi16ZXJvLWZpbGxlZCBCdWZmZXIgaW5zdGFuY2UuXG4gKi9cbkJ1ZmZlci5hbGxvY1Vuc2FmZVNsb3cgPSBmdW5jdGlvbiAoc2l6ZSkge1xuICByZXR1cm4gYWxsb2NVbnNhZmUobnVsbCwgc2l6ZSlcbn1cblxuZnVuY3Rpb24gZnJvbVN0cmluZyAodGhhdCwgc3RyaW5nLCBlbmNvZGluZykge1xuICBpZiAodHlwZW9mIGVuY29kaW5nICE9PSAnc3RyaW5nJyB8fCBlbmNvZGluZyA9PT0gJycpIHtcbiAgICBlbmNvZGluZyA9ICd1dGY4J1xuICB9XG5cbiAgaWYgKCFCdWZmZXIuaXNFbmNvZGluZyhlbmNvZGluZykpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdcImVuY29kaW5nXCIgbXVzdCBiZSBhIHZhbGlkIHN0cmluZyBlbmNvZGluZycpXG4gIH1cblxuICB2YXIgbGVuZ3RoID0gYnl0ZUxlbmd0aChzdHJpbmcsIGVuY29kaW5nKSB8IDBcbiAgdGhhdCA9IGNyZWF0ZUJ1ZmZlcih0aGF0LCBsZW5ndGgpXG5cbiAgdmFyIGFjdHVhbCA9IHRoYXQud3JpdGUoc3RyaW5nLCBlbmNvZGluZylcblxuICBpZiAoYWN0dWFsICE9PSBsZW5ndGgpIHtcbiAgICAvLyBXcml0aW5nIGEgaGV4IHN0cmluZywgZm9yIGV4YW1wbGUsIHRoYXQgY29udGFpbnMgaW52YWxpZCBjaGFyYWN0ZXJzIHdpbGxcbiAgICAvLyBjYXVzZSBldmVyeXRoaW5nIGFmdGVyIHRoZSBmaXJzdCBpbnZhbGlkIGNoYXJhY3RlciB0byBiZSBpZ25vcmVkLiAoZS5nLlxuICAgIC8vICdhYnh4Y2QnIHdpbGwgYmUgdHJlYXRlZCBhcyAnYWInKVxuICAgIHRoYXQgPSB0aGF0LnNsaWNlKDAsIGFjdHVhbClcbiAgfVxuXG4gIHJldHVybiB0aGF0XG59XG5cbmZ1bmN0aW9uIGZyb21BcnJheUxpa2UgKHRoYXQsIGFycmF5KSB7XG4gIHZhciBsZW5ndGggPSBhcnJheS5sZW5ndGggPCAwID8gMCA6IGNoZWNrZWQoYXJyYXkubGVuZ3RoKSB8IDBcbiAgdGhhdCA9IGNyZWF0ZUJ1ZmZlcih0aGF0LCBsZW5ndGgpXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyBpICs9IDEpIHtcbiAgICB0aGF0W2ldID0gYXJyYXlbaV0gJiAyNTVcbiAgfVxuICByZXR1cm4gdGhhdFxufVxuXG5mdW5jdGlvbiBmcm9tQXJyYXlCdWZmZXIgKHRoYXQsIGFycmF5LCBieXRlT2Zmc2V0LCBsZW5ndGgpIHtcbiAgYXJyYXkuYnl0ZUxlbmd0aCAvLyB0aGlzIHRocm93cyBpZiBgYXJyYXlgIGlzIG5vdCBhIHZhbGlkIEFycmF5QnVmZmVyXG5cbiAgaWYgKGJ5dGVPZmZzZXQgPCAwIHx8IGFycmF5LmJ5dGVMZW5ndGggPCBieXRlT2Zmc2V0KSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ1xcJ29mZnNldFxcJyBpcyBvdXQgb2YgYm91bmRzJylcbiAgfVxuXG4gIGlmIChhcnJheS5ieXRlTGVuZ3RoIDwgYnl0ZU9mZnNldCArIChsZW5ndGggfHwgMCkpIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignXFwnbGVuZ3RoXFwnIGlzIG91dCBvZiBib3VuZHMnKVxuICB9XG5cbiAgaWYgKGJ5dGVPZmZzZXQgPT09IHVuZGVmaW5lZCAmJiBsZW5ndGggPT09IHVuZGVmaW5lZCkge1xuICAgIGFycmF5ID0gbmV3IFVpbnQ4QXJyYXkoYXJyYXkpXG4gIH0gZWxzZSBpZiAobGVuZ3RoID09PSB1bmRlZmluZWQpIHtcbiAgICBhcnJheSA9IG5ldyBVaW50OEFycmF5KGFycmF5LCBieXRlT2Zmc2V0KVxuICB9IGVsc2Uge1xuICAgIGFycmF5ID0gbmV3IFVpbnQ4QXJyYXkoYXJyYXksIGJ5dGVPZmZzZXQsIGxlbmd0aClcbiAgfVxuXG4gIGlmIChCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCkge1xuICAgIC8vIFJldHVybiBhbiBhdWdtZW50ZWQgYFVpbnQ4QXJyYXlgIGluc3RhbmNlLCBmb3IgYmVzdCBwZXJmb3JtYW5jZVxuICAgIHRoYXQgPSBhcnJheVxuICAgIHRoYXQuX19wcm90b19fID0gQnVmZmVyLnByb3RvdHlwZVxuICB9IGVsc2Uge1xuICAgIC8vIEZhbGxiYWNrOiBSZXR1cm4gYW4gb2JqZWN0IGluc3RhbmNlIG9mIHRoZSBCdWZmZXIgY2xhc3NcbiAgICB0aGF0ID0gZnJvbUFycmF5TGlrZSh0aGF0LCBhcnJheSlcbiAgfVxuICByZXR1cm4gdGhhdFxufVxuXG5mdW5jdGlvbiBmcm9tT2JqZWN0ICh0aGF0LCBvYmopIHtcbiAgaWYgKEJ1ZmZlci5pc0J1ZmZlcihvYmopKSB7XG4gICAgdmFyIGxlbiA9IGNoZWNrZWQob2JqLmxlbmd0aCkgfCAwXG4gICAgdGhhdCA9IGNyZWF0ZUJ1ZmZlcih0aGF0LCBsZW4pXG5cbiAgICBpZiAodGhhdC5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybiB0aGF0XG4gICAgfVxuXG4gICAgb2JqLmNvcHkodGhhdCwgMCwgMCwgbGVuKVxuICAgIHJldHVybiB0aGF0XG4gIH1cblxuICBpZiAob2JqKSB7XG4gICAgaWYgKCh0eXBlb2YgQXJyYXlCdWZmZXIgIT09ICd1bmRlZmluZWQnICYmXG4gICAgICAgIG9iai5idWZmZXIgaW5zdGFuY2VvZiBBcnJheUJ1ZmZlcikgfHwgJ2xlbmd0aCcgaW4gb2JqKSB7XG4gICAgICBpZiAodHlwZW9mIG9iai5sZW5ndGggIT09ICdudW1iZXInIHx8IGlzbmFuKG9iai5sZW5ndGgpKSB7XG4gICAgICAgIHJldHVybiBjcmVhdGVCdWZmZXIodGhhdCwgMClcbiAgICAgIH1cbiAgICAgIHJldHVybiBmcm9tQXJyYXlMaWtlKHRoYXQsIG9iailcbiAgICB9XG5cbiAgICBpZiAob2JqLnR5cGUgPT09ICdCdWZmZXInICYmIGlzQXJyYXkob2JqLmRhdGEpKSB7XG4gICAgICByZXR1cm4gZnJvbUFycmF5TGlrZSh0aGF0LCBvYmouZGF0YSlcbiAgICB9XG4gIH1cblxuICB0aHJvdyBuZXcgVHlwZUVycm9yKCdGaXJzdCBhcmd1bWVudCBtdXN0IGJlIGEgc3RyaW5nLCBCdWZmZXIsIEFycmF5QnVmZmVyLCBBcnJheSwgb3IgYXJyYXktbGlrZSBvYmplY3QuJylcbn1cblxuZnVuY3Rpb24gY2hlY2tlZCAobGVuZ3RoKSB7XG4gIC8vIE5vdGU6IGNhbm5vdCB1c2UgYGxlbmd0aCA8IGtNYXhMZW5ndGgoKWAgaGVyZSBiZWNhdXNlIHRoYXQgZmFpbHMgd2hlblxuICAvLyBsZW5ndGggaXMgTmFOICh3aGljaCBpcyBvdGhlcndpc2UgY29lcmNlZCB0byB6ZXJvLilcbiAgaWYgKGxlbmd0aCA+PSBrTWF4TGVuZ3RoKCkpIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignQXR0ZW1wdCB0byBhbGxvY2F0ZSBCdWZmZXIgbGFyZ2VyIHRoYW4gbWF4aW11bSAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAnc2l6ZTogMHgnICsga01heExlbmd0aCgpLnRvU3RyaW5nKDE2KSArICcgYnl0ZXMnKVxuICB9XG4gIHJldHVybiBsZW5ndGggfCAwXG59XG5cbmZ1bmN0aW9uIFNsb3dCdWZmZXIgKGxlbmd0aCkge1xuICBpZiAoK2xlbmd0aCAhPSBsZW5ndGgpIHsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBlcWVxZXFcbiAgICBsZW5ndGggPSAwXG4gIH1cbiAgcmV0dXJuIEJ1ZmZlci5hbGxvYygrbGVuZ3RoKVxufVxuXG5CdWZmZXIuaXNCdWZmZXIgPSBmdW5jdGlvbiBpc0J1ZmZlciAoYikge1xuICByZXR1cm4gISEoYiAhPSBudWxsICYmIGIuX2lzQnVmZmVyKVxufVxuXG5CdWZmZXIuY29tcGFyZSA9IGZ1bmN0aW9uIGNvbXBhcmUgKGEsIGIpIHtcbiAgaWYgKCFCdWZmZXIuaXNCdWZmZXIoYSkgfHwgIUJ1ZmZlci5pc0J1ZmZlcihiKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0FyZ3VtZW50cyBtdXN0IGJlIEJ1ZmZlcnMnKVxuICB9XG5cbiAgaWYgKGEgPT09IGIpIHJldHVybiAwXG5cbiAgdmFyIHggPSBhLmxlbmd0aFxuICB2YXIgeSA9IGIubGVuZ3RoXG5cbiAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IE1hdGgubWluKHgsIHkpOyBpIDwgbGVuOyArK2kpIHtcbiAgICBpZiAoYVtpXSAhPT0gYltpXSkge1xuICAgICAgeCA9IGFbaV1cbiAgICAgIHkgPSBiW2ldXG4gICAgICBicmVha1xuICAgIH1cbiAgfVxuXG4gIGlmICh4IDwgeSkgcmV0dXJuIC0xXG4gIGlmICh5IDwgeCkgcmV0dXJuIDFcbiAgcmV0dXJuIDBcbn1cblxuQnVmZmVyLmlzRW5jb2RpbmcgPSBmdW5jdGlvbiBpc0VuY29kaW5nIChlbmNvZGluZykge1xuICBzd2l0Y2ggKFN0cmluZyhlbmNvZGluZykudG9Mb3dlckNhc2UoKSkge1xuICAgIGNhc2UgJ2hleCc6XG4gICAgY2FzZSAndXRmOCc6XG4gICAgY2FzZSAndXRmLTgnOlxuICAgIGNhc2UgJ2FzY2lpJzpcbiAgICBjYXNlICdsYXRpbjEnOlxuICAgIGNhc2UgJ2JpbmFyeSc6XG4gICAgY2FzZSAnYmFzZTY0JzpcbiAgICBjYXNlICd1Y3MyJzpcbiAgICBjYXNlICd1Y3MtMic6XG4gICAgY2FzZSAndXRmMTZsZSc6XG4gICAgY2FzZSAndXRmLTE2bGUnOlxuICAgICAgcmV0dXJuIHRydWVcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIGZhbHNlXG4gIH1cbn1cblxuQnVmZmVyLmNvbmNhdCA9IGZ1bmN0aW9uIGNvbmNhdCAobGlzdCwgbGVuZ3RoKSB7XG4gIGlmICghaXNBcnJheShsaXN0KSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1wibGlzdFwiIGFyZ3VtZW50IG11c3QgYmUgYW4gQXJyYXkgb2YgQnVmZmVycycpXG4gIH1cblxuICBpZiAobGlzdC5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gQnVmZmVyLmFsbG9jKDApXG4gIH1cblxuICB2YXIgaVxuICBpZiAobGVuZ3RoID09PSB1bmRlZmluZWQpIHtcbiAgICBsZW5ndGggPSAwXG4gICAgZm9yIChpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyArK2kpIHtcbiAgICAgIGxlbmd0aCArPSBsaXN0W2ldLmxlbmd0aFxuICAgIH1cbiAgfVxuXG4gIHZhciBidWZmZXIgPSBCdWZmZXIuYWxsb2NVbnNhZmUobGVuZ3RoKVxuICB2YXIgcG9zID0gMFxuICBmb3IgKGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7ICsraSkge1xuICAgIHZhciBidWYgPSBsaXN0W2ldXG4gICAgaWYgKCFCdWZmZXIuaXNCdWZmZXIoYnVmKSkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignXCJsaXN0XCIgYXJndW1lbnQgbXVzdCBiZSBhbiBBcnJheSBvZiBCdWZmZXJzJylcbiAgICB9XG4gICAgYnVmLmNvcHkoYnVmZmVyLCBwb3MpXG4gICAgcG9zICs9IGJ1Zi5sZW5ndGhcbiAgfVxuICByZXR1cm4gYnVmZmVyXG59XG5cbmZ1bmN0aW9uIGJ5dGVMZW5ndGggKHN0cmluZywgZW5jb2RpbmcpIHtcbiAgaWYgKEJ1ZmZlci5pc0J1ZmZlcihzdHJpbmcpKSB7XG4gICAgcmV0dXJuIHN0cmluZy5sZW5ndGhcbiAgfVxuICBpZiAodHlwZW9mIEFycmF5QnVmZmVyICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgQXJyYXlCdWZmZXIuaXNWaWV3ID09PSAnZnVuY3Rpb24nICYmXG4gICAgICAoQXJyYXlCdWZmZXIuaXNWaWV3KHN0cmluZykgfHwgc3RyaW5nIGluc3RhbmNlb2YgQXJyYXlCdWZmZXIpKSB7XG4gICAgcmV0dXJuIHN0cmluZy5ieXRlTGVuZ3RoXG4gIH1cbiAgaWYgKHR5cGVvZiBzdHJpbmcgIT09ICdzdHJpbmcnKSB7XG4gICAgc3RyaW5nID0gJycgKyBzdHJpbmdcbiAgfVxuXG4gIHZhciBsZW4gPSBzdHJpbmcubGVuZ3RoXG4gIGlmIChsZW4gPT09IDApIHJldHVybiAwXG5cbiAgLy8gVXNlIGEgZm9yIGxvb3AgdG8gYXZvaWQgcmVjdXJzaW9uXG4gIHZhciBsb3dlcmVkQ2FzZSA9IGZhbHNlXG4gIGZvciAoOzspIHtcbiAgICBzd2l0Y2ggKGVuY29kaW5nKSB7XG4gICAgICBjYXNlICdhc2NpaSc6XG4gICAgICBjYXNlICdsYXRpbjEnOlxuICAgICAgY2FzZSAnYmluYXJ5JzpcbiAgICAgICAgcmV0dXJuIGxlblxuICAgICAgY2FzZSAndXRmOCc6XG4gICAgICBjYXNlICd1dGYtOCc6XG4gICAgICBjYXNlIHVuZGVmaW5lZDpcbiAgICAgICAgcmV0dXJuIHV0ZjhUb0J5dGVzKHN0cmluZykubGVuZ3RoXG4gICAgICBjYXNlICd1Y3MyJzpcbiAgICAgIGNhc2UgJ3Vjcy0yJzpcbiAgICAgIGNhc2UgJ3V0ZjE2bGUnOlxuICAgICAgY2FzZSAndXRmLTE2bGUnOlxuICAgICAgICByZXR1cm4gbGVuICogMlxuICAgICAgY2FzZSAnaGV4JzpcbiAgICAgICAgcmV0dXJuIGxlbiA+Pj4gMVxuICAgICAgY2FzZSAnYmFzZTY0JzpcbiAgICAgICAgcmV0dXJuIGJhc2U2NFRvQnl0ZXMoc3RyaW5nKS5sZW5ndGhcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGlmIChsb3dlcmVkQ2FzZSkgcmV0dXJuIHV0ZjhUb0J5dGVzKHN0cmluZykubGVuZ3RoIC8vIGFzc3VtZSB1dGY4XG4gICAgICAgIGVuY29kaW5nID0gKCcnICsgZW5jb2RpbmcpLnRvTG93ZXJDYXNlKClcbiAgICAgICAgbG93ZXJlZENhc2UgPSB0cnVlXG4gICAgfVxuICB9XG59XG5CdWZmZXIuYnl0ZUxlbmd0aCA9IGJ5dGVMZW5ndGhcblxuZnVuY3Rpb24gc2xvd1RvU3RyaW5nIChlbmNvZGluZywgc3RhcnQsIGVuZCkge1xuICB2YXIgbG93ZXJlZENhc2UgPSBmYWxzZVxuXG4gIC8vIE5vIG5lZWQgdG8gdmVyaWZ5IHRoYXQgXCJ0aGlzLmxlbmd0aCA8PSBNQVhfVUlOVDMyXCIgc2luY2UgaXQncyBhIHJlYWQtb25seVxuICAvLyBwcm9wZXJ0eSBvZiBhIHR5cGVkIGFycmF5LlxuXG4gIC8vIFRoaXMgYmVoYXZlcyBuZWl0aGVyIGxpa2UgU3RyaW5nIG5vciBVaW50OEFycmF5IGluIHRoYXQgd2Ugc2V0IHN0YXJ0L2VuZFxuICAvLyB0byB0aGVpciB1cHBlci9sb3dlciBib3VuZHMgaWYgdGhlIHZhbHVlIHBhc3NlZCBpcyBvdXQgb2YgcmFuZ2UuXG4gIC8vIHVuZGVmaW5lZCBpcyBoYW5kbGVkIHNwZWNpYWxseSBhcyBwZXIgRUNNQS0yNjIgNnRoIEVkaXRpb24sXG4gIC8vIFNlY3Rpb24gMTMuMy4zLjcgUnVudGltZSBTZW1hbnRpY3M6IEtleWVkQmluZGluZ0luaXRpYWxpemF0aW9uLlxuICBpZiAoc3RhcnQgPT09IHVuZGVmaW5lZCB8fCBzdGFydCA8IDApIHtcbiAgICBzdGFydCA9IDBcbiAgfVxuICAvLyBSZXR1cm4gZWFybHkgaWYgc3RhcnQgPiB0aGlzLmxlbmd0aC4gRG9uZSBoZXJlIHRvIHByZXZlbnQgcG90ZW50aWFsIHVpbnQzMlxuICAvLyBjb2VyY2lvbiBmYWlsIGJlbG93LlxuICBpZiAoc3RhcnQgPiB0aGlzLmxlbmd0aCkge1xuICAgIHJldHVybiAnJ1xuICB9XG5cbiAgaWYgKGVuZCA9PT0gdW5kZWZpbmVkIHx8IGVuZCA+IHRoaXMubGVuZ3RoKSB7XG4gICAgZW5kID0gdGhpcy5sZW5ndGhcbiAgfVxuXG4gIGlmIChlbmQgPD0gMCkge1xuICAgIHJldHVybiAnJ1xuICB9XG5cbiAgLy8gRm9yY2UgY29lcnNpb24gdG8gdWludDMyLiBUaGlzIHdpbGwgYWxzbyBjb2VyY2UgZmFsc2V5L05hTiB2YWx1ZXMgdG8gMC5cbiAgZW5kID4+Pj0gMFxuICBzdGFydCA+Pj49IDBcblxuICBpZiAoZW5kIDw9IHN0YXJ0KSB7XG4gICAgcmV0dXJuICcnXG4gIH1cblxuICBpZiAoIWVuY29kaW5nKSBlbmNvZGluZyA9ICd1dGY4J1xuXG4gIHdoaWxlICh0cnVlKSB7XG4gICAgc3dpdGNoIChlbmNvZGluZykge1xuICAgICAgY2FzZSAnaGV4JzpcbiAgICAgICAgcmV0dXJuIGhleFNsaWNlKHRoaXMsIHN0YXJ0LCBlbmQpXG5cbiAgICAgIGNhc2UgJ3V0ZjgnOlxuICAgICAgY2FzZSAndXRmLTgnOlxuICAgICAgICByZXR1cm4gdXRmOFNsaWNlKHRoaXMsIHN0YXJ0LCBlbmQpXG5cbiAgICAgIGNhc2UgJ2FzY2lpJzpcbiAgICAgICAgcmV0dXJuIGFzY2lpU2xpY2UodGhpcywgc3RhcnQsIGVuZClcblxuICAgICAgY2FzZSAnbGF0aW4xJzpcbiAgICAgIGNhc2UgJ2JpbmFyeSc6XG4gICAgICAgIHJldHVybiBsYXRpbjFTbGljZSh0aGlzLCBzdGFydCwgZW5kKVxuXG4gICAgICBjYXNlICdiYXNlNjQnOlxuICAgICAgICByZXR1cm4gYmFzZTY0U2xpY2UodGhpcywgc3RhcnQsIGVuZClcblxuICAgICAgY2FzZSAndWNzMic6XG4gICAgICBjYXNlICd1Y3MtMic6XG4gICAgICBjYXNlICd1dGYxNmxlJzpcbiAgICAgIGNhc2UgJ3V0Zi0xNmxlJzpcbiAgICAgICAgcmV0dXJuIHV0ZjE2bGVTbGljZSh0aGlzLCBzdGFydCwgZW5kKVxuXG4gICAgICBkZWZhdWx0OlxuICAgICAgICBpZiAobG93ZXJlZENhc2UpIHRocm93IG5ldyBUeXBlRXJyb3IoJ1Vua25vd24gZW5jb2Rpbmc6ICcgKyBlbmNvZGluZylcbiAgICAgICAgZW5jb2RpbmcgPSAoZW5jb2RpbmcgKyAnJykudG9Mb3dlckNhc2UoKVxuICAgICAgICBsb3dlcmVkQ2FzZSA9IHRydWVcbiAgICB9XG4gIH1cbn1cblxuLy8gVGhlIHByb3BlcnR5IGlzIHVzZWQgYnkgYEJ1ZmZlci5pc0J1ZmZlcmAgYW5kIGBpcy1idWZmZXJgIChpbiBTYWZhcmkgNS03KSB0byBkZXRlY3Rcbi8vIEJ1ZmZlciBpbnN0YW5jZXMuXG5CdWZmZXIucHJvdG90eXBlLl9pc0J1ZmZlciA9IHRydWVcblxuZnVuY3Rpb24gc3dhcCAoYiwgbiwgbSkge1xuICB2YXIgaSA9IGJbbl1cbiAgYltuXSA9IGJbbV1cbiAgYlttXSA9IGlcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5zd2FwMTYgPSBmdW5jdGlvbiBzd2FwMTYgKCkge1xuICB2YXIgbGVuID0gdGhpcy5sZW5ndGhcbiAgaWYgKGxlbiAlIDIgIT09IDApIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignQnVmZmVyIHNpemUgbXVzdCBiZSBhIG11bHRpcGxlIG9mIDE2LWJpdHMnKVxuICB9XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyBpICs9IDIpIHtcbiAgICBzd2FwKHRoaXMsIGksIGkgKyAxKVxuICB9XG4gIHJldHVybiB0aGlzXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUuc3dhcDMyID0gZnVuY3Rpb24gc3dhcDMyICgpIHtcbiAgdmFyIGxlbiA9IHRoaXMubGVuZ3RoXG4gIGlmIChsZW4gJSA0ICE9PSAwKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ0J1ZmZlciBzaXplIG11c3QgYmUgYSBtdWx0aXBsZSBvZiAzMi1iaXRzJylcbiAgfVxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgaSArPSA0KSB7XG4gICAgc3dhcCh0aGlzLCBpLCBpICsgMylcbiAgICBzd2FwKHRoaXMsIGkgKyAxLCBpICsgMilcbiAgfVxuICByZXR1cm4gdGhpc1xufVxuXG5CdWZmZXIucHJvdG90eXBlLnN3YXA2NCA9IGZ1bmN0aW9uIHN3YXA2NCAoKSB7XG4gIHZhciBsZW4gPSB0aGlzLmxlbmd0aFxuICBpZiAobGVuICUgOCAhPT0gMCkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdCdWZmZXIgc2l6ZSBtdXN0IGJlIGEgbXVsdGlwbGUgb2YgNjQtYml0cycpXG4gIH1cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47IGkgKz0gOCkge1xuICAgIHN3YXAodGhpcywgaSwgaSArIDcpXG4gICAgc3dhcCh0aGlzLCBpICsgMSwgaSArIDYpXG4gICAgc3dhcCh0aGlzLCBpICsgMiwgaSArIDUpXG4gICAgc3dhcCh0aGlzLCBpICsgMywgaSArIDQpXG4gIH1cbiAgcmV0dXJuIHRoaXNcbn1cblxuQnVmZmVyLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nICgpIHtcbiAgdmFyIGxlbmd0aCA9IHRoaXMubGVuZ3RoIHwgMFxuICBpZiAobGVuZ3RoID09PSAwKSByZXR1cm4gJydcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDApIHJldHVybiB1dGY4U2xpY2UodGhpcywgMCwgbGVuZ3RoKVxuICByZXR1cm4gc2xvd1RvU3RyaW5nLmFwcGx5KHRoaXMsIGFyZ3VtZW50cylcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5lcXVhbHMgPSBmdW5jdGlvbiBlcXVhbHMgKGIpIHtcbiAgaWYgKCFCdWZmZXIuaXNCdWZmZXIoYikpIHRocm93IG5ldyBUeXBlRXJyb3IoJ0FyZ3VtZW50IG11c3QgYmUgYSBCdWZmZXInKVxuICBpZiAodGhpcyA9PT0gYikgcmV0dXJuIHRydWVcbiAgcmV0dXJuIEJ1ZmZlci5jb21wYXJlKHRoaXMsIGIpID09PSAwXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUuaW5zcGVjdCA9IGZ1bmN0aW9uIGluc3BlY3QgKCkge1xuICB2YXIgc3RyID0gJydcbiAgdmFyIG1heCA9IGV4cG9ydHMuSU5TUEVDVF9NQVhfQllURVNcbiAgaWYgKHRoaXMubGVuZ3RoID4gMCkge1xuICAgIHN0ciA9IHRoaXMudG9TdHJpbmcoJ2hleCcsIDAsIG1heCkubWF0Y2goLy57Mn0vZykuam9pbignICcpXG4gICAgaWYgKHRoaXMubGVuZ3RoID4gbWF4KSBzdHIgKz0gJyAuLi4gJ1xuICB9XG4gIHJldHVybiAnPEJ1ZmZlciAnICsgc3RyICsgJz4nXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUuY29tcGFyZSA9IGZ1bmN0aW9uIGNvbXBhcmUgKHRhcmdldCwgc3RhcnQsIGVuZCwgdGhpc1N0YXJ0LCB0aGlzRW5kKSB7XG4gIGlmICghQnVmZmVyLmlzQnVmZmVyKHRhcmdldCkpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdBcmd1bWVudCBtdXN0IGJlIGEgQnVmZmVyJylcbiAgfVxuXG4gIGlmIChzdGFydCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgc3RhcnQgPSAwXG4gIH1cbiAgaWYgKGVuZCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgZW5kID0gdGFyZ2V0ID8gdGFyZ2V0Lmxlbmd0aCA6IDBcbiAgfVxuICBpZiAodGhpc1N0YXJ0ID09PSB1bmRlZmluZWQpIHtcbiAgICB0aGlzU3RhcnQgPSAwXG4gIH1cbiAgaWYgKHRoaXNFbmQgPT09IHVuZGVmaW5lZCkge1xuICAgIHRoaXNFbmQgPSB0aGlzLmxlbmd0aFxuICB9XG5cbiAgaWYgKHN0YXJ0IDwgMCB8fCBlbmQgPiB0YXJnZXQubGVuZ3RoIHx8IHRoaXNTdGFydCA8IDAgfHwgdGhpc0VuZCA+IHRoaXMubGVuZ3RoKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ291dCBvZiByYW5nZSBpbmRleCcpXG4gIH1cblxuICBpZiAodGhpc1N0YXJ0ID49IHRoaXNFbmQgJiYgc3RhcnQgPj0gZW5kKSB7XG4gICAgcmV0dXJuIDBcbiAgfVxuICBpZiAodGhpc1N0YXJ0ID49IHRoaXNFbmQpIHtcbiAgICByZXR1cm4gLTFcbiAgfVxuICBpZiAoc3RhcnQgPj0gZW5kKSB7XG4gICAgcmV0dXJuIDFcbiAgfVxuXG4gIHN0YXJ0ID4+Pj0gMFxuICBlbmQgPj4+PSAwXG4gIHRoaXNTdGFydCA+Pj49IDBcbiAgdGhpc0VuZCA+Pj49IDBcblxuICBpZiAodGhpcyA9PT0gdGFyZ2V0KSByZXR1cm4gMFxuXG4gIHZhciB4ID0gdGhpc0VuZCAtIHRoaXNTdGFydFxuICB2YXIgeSA9IGVuZCAtIHN0YXJ0XG4gIHZhciBsZW4gPSBNYXRoLm1pbih4LCB5KVxuXG4gIHZhciB0aGlzQ29weSA9IHRoaXMuc2xpY2UodGhpc1N0YXJ0LCB0aGlzRW5kKVxuICB2YXIgdGFyZ2V0Q29weSA9IHRhcmdldC5zbGljZShzdGFydCwgZW5kKVxuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyArK2kpIHtcbiAgICBpZiAodGhpc0NvcHlbaV0gIT09IHRhcmdldENvcHlbaV0pIHtcbiAgICAgIHggPSB0aGlzQ29weVtpXVxuICAgICAgeSA9IHRhcmdldENvcHlbaV1cbiAgICAgIGJyZWFrXG4gICAgfVxuICB9XG5cbiAgaWYgKHggPCB5KSByZXR1cm4gLTFcbiAgaWYgKHkgPCB4KSByZXR1cm4gMVxuICByZXR1cm4gMFxufVxuXG4vLyBGaW5kcyBlaXRoZXIgdGhlIGZpcnN0IGluZGV4IG9mIGB2YWxgIGluIGBidWZmZXJgIGF0IG9mZnNldCA+PSBgYnl0ZU9mZnNldGAsXG4vLyBPUiB0aGUgbGFzdCBpbmRleCBvZiBgdmFsYCBpbiBgYnVmZmVyYCBhdCBvZmZzZXQgPD0gYGJ5dGVPZmZzZXRgLlxuLy9cbi8vIEFyZ3VtZW50czpcbi8vIC0gYnVmZmVyIC0gYSBCdWZmZXIgdG8gc2VhcmNoXG4vLyAtIHZhbCAtIGEgc3RyaW5nLCBCdWZmZXIsIG9yIG51bWJlclxuLy8gLSBieXRlT2Zmc2V0IC0gYW4gaW5kZXggaW50byBgYnVmZmVyYDsgd2lsbCBiZSBjbGFtcGVkIHRvIGFuIGludDMyXG4vLyAtIGVuY29kaW5nIC0gYW4gb3B0aW9uYWwgZW5jb2RpbmcsIHJlbGV2YW50IGlzIHZhbCBpcyBhIHN0cmluZ1xuLy8gLSBkaXIgLSB0cnVlIGZvciBpbmRleE9mLCBmYWxzZSBmb3IgbGFzdEluZGV4T2ZcbmZ1bmN0aW9uIGJpZGlyZWN0aW9uYWxJbmRleE9mIChidWZmZXIsIHZhbCwgYnl0ZU9mZnNldCwgZW5jb2RpbmcsIGRpcikge1xuICAvLyBFbXB0eSBidWZmZXIgbWVhbnMgbm8gbWF0Y2hcbiAgaWYgKGJ1ZmZlci5sZW5ndGggPT09IDApIHJldHVybiAtMVxuXG4gIC8vIE5vcm1hbGl6ZSBieXRlT2Zmc2V0XG4gIGlmICh0eXBlb2YgYnl0ZU9mZnNldCA9PT0gJ3N0cmluZycpIHtcbiAgICBlbmNvZGluZyA9IGJ5dGVPZmZzZXRcbiAgICBieXRlT2Zmc2V0ID0gMFxuICB9IGVsc2UgaWYgKGJ5dGVPZmZzZXQgPiAweDdmZmZmZmZmKSB7XG4gICAgYnl0ZU9mZnNldCA9IDB4N2ZmZmZmZmZcbiAgfSBlbHNlIGlmIChieXRlT2Zmc2V0IDwgLTB4ODAwMDAwMDApIHtcbiAgICBieXRlT2Zmc2V0ID0gLTB4ODAwMDAwMDBcbiAgfVxuICBieXRlT2Zmc2V0ID0gK2J5dGVPZmZzZXQgIC8vIENvZXJjZSB0byBOdW1iZXIuXG4gIGlmIChpc05hTihieXRlT2Zmc2V0KSkge1xuICAgIC8vIGJ5dGVPZmZzZXQ6IGl0IGl0J3MgdW5kZWZpbmVkLCBudWxsLCBOYU4sIFwiZm9vXCIsIGV0Yywgc2VhcmNoIHdob2xlIGJ1ZmZlclxuICAgIGJ5dGVPZmZzZXQgPSBkaXIgPyAwIDogKGJ1ZmZlci5sZW5ndGggLSAxKVxuICB9XG5cbiAgLy8gTm9ybWFsaXplIGJ5dGVPZmZzZXQ6IG5lZ2F0aXZlIG9mZnNldHMgc3RhcnQgZnJvbSB0aGUgZW5kIG9mIHRoZSBidWZmZXJcbiAgaWYgKGJ5dGVPZmZzZXQgPCAwKSBieXRlT2Zmc2V0ID0gYnVmZmVyLmxlbmd0aCArIGJ5dGVPZmZzZXRcbiAgaWYgKGJ5dGVPZmZzZXQgPj0gYnVmZmVyLmxlbmd0aCkge1xuICAgIGlmIChkaXIpIHJldHVybiAtMVxuICAgIGVsc2UgYnl0ZU9mZnNldCA9IGJ1ZmZlci5sZW5ndGggLSAxXG4gIH0gZWxzZSBpZiAoYnl0ZU9mZnNldCA8IDApIHtcbiAgICBpZiAoZGlyKSBieXRlT2Zmc2V0ID0gMFxuICAgIGVsc2UgcmV0dXJuIC0xXG4gIH1cblxuICAvLyBOb3JtYWxpemUgdmFsXG4gIGlmICh0eXBlb2YgdmFsID09PSAnc3RyaW5nJykge1xuICAgIHZhbCA9IEJ1ZmZlci5mcm9tKHZhbCwgZW5jb2RpbmcpXG4gIH1cblxuICAvLyBGaW5hbGx5LCBzZWFyY2ggZWl0aGVyIGluZGV4T2YgKGlmIGRpciBpcyB0cnVlKSBvciBsYXN0SW5kZXhPZlxuICBpZiAoQnVmZmVyLmlzQnVmZmVyKHZhbCkpIHtcbiAgICAvLyBTcGVjaWFsIGNhc2U6IGxvb2tpbmcgZm9yIGVtcHR5IHN0cmluZy9idWZmZXIgYWx3YXlzIGZhaWxzXG4gICAgaWYgKHZhbC5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybiAtMVxuICAgIH1cbiAgICByZXR1cm4gYXJyYXlJbmRleE9mKGJ1ZmZlciwgdmFsLCBieXRlT2Zmc2V0LCBlbmNvZGluZywgZGlyKVxuICB9IGVsc2UgaWYgKHR5cGVvZiB2YWwgPT09ICdudW1iZXInKSB7XG4gICAgdmFsID0gdmFsICYgMHhGRiAvLyBTZWFyY2ggZm9yIGEgYnl0ZSB2YWx1ZSBbMC0yNTVdXG4gICAgaWYgKEJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUICYmXG4gICAgICAgIHR5cGVvZiBVaW50OEFycmF5LnByb3RvdHlwZS5pbmRleE9mID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBpZiAoZGlyKSB7XG4gICAgICAgIHJldHVybiBVaW50OEFycmF5LnByb3RvdHlwZS5pbmRleE9mLmNhbGwoYnVmZmVyLCB2YWwsIGJ5dGVPZmZzZXQpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gVWludDhBcnJheS5wcm90b3R5cGUubGFzdEluZGV4T2YuY2FsbChidWZmZXIsIHZhbCwgYnl0ZU9mZnNldClcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGFycmF5SW5kZXhPZihidWZmZXIsIFsgdmFsIF0sIGJ5dGVPZmZzZXQsIGVuY29kaW5nLCBkaXIpXG4gIH1cblxuICB0aHJvdyBuZXcgVHlwZUVycm9yKCd2YWwgbXVzdCBiZSBzdHJpbmcsIG51bWJlciBvciBCdWZmZXInKVxufVxuXG5mdW5jdGlvbiBhcnJheUluZGV4T2YgKGFyciwgdmFsLCBieXRlT2Zmc2V0LCBlbmNvZGluZywgZGlyKSB7XG4gIHZhciBpbmRleFNpemUgPSAxXG4gIHZhciBhcnJMZW5ndGggPSBhcnIubGVuZ3RoXG4gIHZhciB2YWxMZW5ndGggPSB2YWwubGVuZ3RoXG5cbiAgaWYgKGVuY29kaW5nICE9PSB1bmRlZmluZWQpIHtcbiAgICBlbmNvZGluZyA9IFN0cmluZyhlbmNvZGluZykudG9Mb3dlckNhc2UoKVxuICAgIGlmIChlbmNvZGluZyA9PT0gJ3VjczInIHx8IGVuY29kaW5nID09PSAndWNzLTInIHx8XG4gICAgICAgIGVuY29kaW5nID09PSAndXRmMTZsZScgfHwgZW5jb2RpbmcgPT09ICd1dGYtMTZsZScpIHtcbiAgICAgIGlmIChhcnIubGVuZ3RoIDwgMiB8fCB2YWwubGVuZ3RoIDwgMikge1xuICAgICAgICByZXR1cm4gLTFcbiAgICAgIH1cbiAgICAgIGluZGV4U2l6ZSA9IDJcbiAgICAgIGFyckxlbmd0aCAvPSAyXG4gICAgICB2YWxMZW5ndGggLz0gMlxuICAgICAgYnl0ZU9mZnNldCAvPSAyXG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gcmVhZCAoYnVmLCBpKSB7XG4gICAgaWYgKGluZGV4U2l6ZSA9PT0gMSkge1xuICAgICAgcmV0dXJuIGJ1ZltpXVxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gYnVmLnJlYWRVSW50MTZCRShpICogaW5kZXhTaXplKVxuICAgIH1cbiAgfVxuXG4gIHZhciBpXG4gIGlmIChkaXIpIHtcbiAgICB2YXIgZm91bmRJbmRleCA9IC0xXG4gICAgZm9yIChpID0gYnl0ZU9mZnNldDsgaSA8IGFyckxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAocmVhZChhcnIsIGkpID09PSByZWFkKHZhbCwgZm91bmRJbmRleCA9PT0gLTEgPyAwIDogaSAtIGZvdW5kSW5kZXgpKSB7XG4gICAgICAgIGlmIChmb3VuZEluZGV4ID09PSAtMSkgZm91bmRJbmRleCA9IGlcbiAgICAgICAgaWYgKGkgLSBmb3VuZEluZGV4ICsgMSA9PT0gdmFsTGVuZ3RoKSByZXR1cm4gZm91bmRJbmRleCAqIGluZGV4U2l6ZVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKGZvdW5kSW5kZXggIT09IC0xKSBpIC09IGkgLSBmb3VuZEluZGV4XG4gICAgICAgIGZvdW5kSW5kZXggPSAtMVxuICAgICAgfVxuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBpZiAoYnl0ZU9mZnNldCArIHZhbExlbmd0aCA+IGFyckxlbmd0aCkgYnl0ZU9mZnNldCA9IGFyckxlbmd0aCAtIHZhbExlbmd0aFxuICAgIGZvciAoaSA9IGJ5dGVPZmZzZXQ7IGkgPj0gMDsgaS0tKSB7XG4gICAgICB2YXIgZm91bmQgPSB0cnVlXG4gICAgICBmb3IgKHZhciBqID0gMDsgaiA8IHZhbExlbmd0aDsgaisrKSB7XG4gICAgICAgIGlmIChyZWFkKGFyciwgaSArIGopICE9PSByZWFkKHZhbCwgaikpIHtcbiAgICAgICAgICBmb3VuZCA9IGZhbHNlXG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKGZvdW5kKSByZXR1cm4gaVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiAtMVxufVxuXG5CdWZmZXIucHJvdG90eXBlLmluY2x1ZGVzID0gZnVuY3Rpb24gaW5jbHVkZXMgKHZhbCwgYnl0ZU9mZnNldCwgZW5jb2RpbmcpIHtcbiAgcmV0dXJuIHRoaXMuaW5kZXhPZih2YWwsIGJ5dGVPZmZzZXQsIGVuY29kaW5nKSAhPT0gLTFcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5pbmRleE9mID0gZnVuY3Rpb24gaW5kZXhPZiAodmFsLCBieXRlT2Zmc2V0LCBlbmNvZGluZykge1xuICByZXR1cm4gYmlkaXJlY3Rpb25hbEluZGV4T2YodGhpcywgdmFsLCBieXRlT2Zmc2V0LCBlbmNvZGluZywgdHJ1ZSlcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5sYXN0SW5kZXhPZiA9IGZ1bmN0aW9uIGxhc3RJbmRleE9mICh2YWwsIGJ5dGVPZmZzZXQsIGVuY29kaW5nKSB7XG4gIHJldHVybiBiaWRpcmVjdGlvbmFsSW5kZXhPZih0aGlzLCB2YWwsIGJ5dGVPZmZzZXQsIGVuY29kaW5nLCBmYWxzZSlcbn1cblxuZnVuY3Rpb24gaGV4V3JpdGUgKGJ1Ziwgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aCkge1xuICBvZmZzZXQgPSBOdW1iZXIob2Zmc2V0KSB8fCAwXG4gIHZhciByZW1haW5pbmcgPSBidWYubGVuZ3RoIC0gb2Zmc2V0XG4gIGlmICghbGVuZ3RoKSB7XG4gICAgbGVuZ3RoID0gcmVtYWluaW5nXG4gIH0gZWxzZSB7XG4gICAgbGVuZ3RoID0gTnVtYmVyKGxlbmd0aClcbiAgICBpZiAobGVuZ3RoID4gcmVtYWluaW5nKSB7XG4gICAgICBsZW5ndGggPSByZW1haW5pbmdcbiAgICB9XG4gIH1cblxuICAvLyBtdXN0IGJlIGFuIGV2ZW4gbnVtYmVyIG9mIGRpZ2l0c1xuICB2YXIgc3RyTGVuID0gc3RyaW5nLmxlbmd0aFxuICBpZiAoc3RyTGVuICUgMiAhPT0gMCkgdGhyb3cgbmV3IFR5cGVFcnJvcignSW52YWxpZCBoZXggc3RyaW5nJylcblxuICBpZiAobGVuZ3RoID4gc3RyTGVuIC8gMikge1xuICAgIGxlbmd0aCA9IHN0ckxlbiAvIDJcbiAgfVxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgKytpKSB7XG4gICAgdmFyIHBhcnNlZCA9IHBhcnNlSW50KHN0cmluZy5zdWJzdHIoaSAqIDIsIDIpLCAxNilcbiAgICBpZiAoaXNOYU4ocGFyc2VkKSkgcmV0dXJuIGlcbiAgICBidWZbb2Zmc2V0ICsgaV0gPSBwYXJzZWRcbiAgfVxuICByZXR1cm4gaVxufVxuXG5mdW5jdGlvbiB1dGY4V3JpdGUgKGJ1Ziwgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aCkge1xuICByZXR1cm4gYmxpdEJ1ZmZlcih1dGY4VG9CeXRlcyhzdHJpbmcsIGJ1Zi5sZW5ndGggLSBvZmZzZXQpLCBidWYsIG9mZnNldCwgbGVuZ3RoKVxufVxuXG5mdW5jdGlvbiBhc2NpaVdyaXRlIChidWYsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpIHtcbiAgcmV0dXJuIGJsaXRCdWZmZXIoYXNjaWlUb0J5dGVzKHN0cmluZyksIGJ1Ziwgb2Zmc2V0LCBsZW5ndGgpXG59XG5cbmZ1bmN0aW9uIGxhdGluMVdyaXRlIChidWYsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpIHtcbiAgcmV0dXJuIGFzY2lpV3JpdGUoYnVmLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKVxufVxuXG5mdW5jdGlvbiBiYXNlNjRXcml0ZSAoYnVmLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKSB7XG4gIHJldHVybiBibGl0QnVmZmVyKGJhc2U2NFRvQnl0ZXMoc3RyaW5nKSwgYnVmLCBvZmZzZXQsIGxlbmd0aClcbn1cblxuZnVuY3Rpb24gdWNzMldyaXRlIChidWYsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpIHtcbiAgcmV0dXJuIGJsaXRCdWZmZXIodXRmMTZsZVRvQnl0ZXMoc3RyaW5nLCBidWYubGVuZ3RoIC0gb2Zmc2V0KSwgYnVmLCBvZmZzZXQsIGxlbmd0aClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZSA9IGZ1bmN0aW9uIHdyaXRlIChzdHJpbmcsIG9mZnNldCwgbGVuZ3RoLCBlbmNvZGluZykge1xuICAvLyBCdWZmZXIjd3JpdGUoc3RyaW5nKVxuICBpZiAob2Zmc2V0ID09PSB1bmRlZmluZWQpIHtcbiAgICBlbmNvZGluZyA9ICd1dGY4J1xuICAgIGxlbmd0aCA9IHRoaXMubGVuZ3RoXG4gICAgb2Zmc2V0ID0gMFxuICAvLyBCdWZmZXIjd3JpdGUoc3RyaW5nLCBlbmNvZGluZylcbiAgfSBlbHNlIGlmIChsZW5ndGggPT09IHVuZGVmaW5lZCAmJiB0eXBlb2Ygb2Zmc2V0ID09PSAnc3RyaW5nJykge1xuICAgIGVuY29kaW5nID0gb2Zmc2V0XG4gICAgbGVuZ3RoID0gdGhpcy5sZW5ndGhcbiAgICBvZmZzZXQgPSAwXG4gIC8vIEJ1ZmZlciN3cml0ZShzdHJpbmcsIG9mZnNldFssIGxlbmd0aF1bLCBlbmNvZGluZ10pXG4gIH0gZWxzZSBpZiAoaXNGaW5pdGUob2Zmc2V0KSkge1xuICAgIG9mZnNldCA9IG9mZnNldCB8IDBcbiAgICBpZiAoaXNGaW5pdGUobGVuZ3RoKSkge1xuICAgICAgbGVuZ3RoID0gbGVuZ3RoIHwgMFxuICAgICAgaWYgKGVuY29kaW5nID09PSB1bmRlZmluZWQpIGVuY29kaW5nID0gJ3V0ZjgnXG4gICAgfSBlbHNlIHtcbiAgICAgIGVuY29kaW5nID0gbGVuZ3RoXG4gICAgICBsZW5ndGggPSB1bmRlZmluZWRcbiAgICB9XG4gIC8vIGxlZ2FjeSB3cml0ZShzdHJpbmcsIGVuY29kaW5nLCBvZmZzZXQsIGxlbmd0aCkgLSByZW1vdmUgaW4gdjAuMTNcbiAgfSBlbHNlIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAnQnVmZmVyLndyaXRlKHN0cmluZywgZW5jb2RpbmcsIG9mZnNldFssIGxlbmd0aF0pIGlzIG5vIGxvbmdlciBzdXBwb3J0ZWQnXG4gICAgKVxuICB9XG5cbiAgdmFyIHJlbWFpbmluZyA9IHRoaXMubGVuZ3RoIC0gb2Zmc2V0XG4gIGlmIChsZW5ndGggPT09IHVuZGVmaW5lZCB8fCBsZW5ndGggPiByZW1haW5pbmcpIGxlbmd0aCA9IHJlbWFpbmluZ1xuXG4gIGlmICgoc3RyaW5nLmxlbmd0aCA+IDAgJiYgKGxlbmd0aCA8IDAgfHwgb2Zmc2V0IDwgMCkpIHx8IG9mZnNldCA+IHRoaXMubGVuZ3RoKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ0F0dGVtcHQgdG8gd3JpdGUgb3V0c2lkZSBidWZmZXIgYm91bmRzJylcbiAgfVxuXG4gIGlmICghZW5jb2RpbmcpIGVuY29kaW5nID0gJ3V0ZjgnXG5cbiAgdmFyIGxvd2VyZWRDYXNlID0gZmFsc2VcbiAgZm9yICg7Oykge1xuICAgIHN3aXRjaCAoZW5jb2RpbmcpIHtcbiAgICAgIGNhc2UgJ2hleCc6XG4gICAgICAgIHJldHVybiBoZXhXcml0ZSh0aGlzLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKVxuXG4gICAgICBjYXNlICd1dGY4JzpcbiAgICAgIGNhc2UgJ3V0Zi04JzpcbiAgICAgICAgcmV0dXJuIHV0ZjhXcml0ZSh0aGlzLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKVxuXG4gICAgICBjYXNlICdhc2NpaSc6XG4gICAgICAgIHJldHVybiBhc2NpaVdyaXRlKHRoaXMsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpXG5cbiAgICAgIGNhc2UgJ2xhdGluMSc6XG4gICAgICBjYXNlICdiaW5hcnknOlxuICAgICAgICByZXR1cm4gbGF0aW4xV3JpdGUodGhpcywgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aClcblxuICAgICAgY2FzZSAnYmFzZTY0JzpcbiAgICAgICAgLy8gV2FybmluZzogbWF4TGVuZ3RoIG5vdCB0YWtlbiBpbnRvIGFjY291bnQgaW4gYmFzZTY0V3JpdGVcbiAgICAgICAgcmV0dXJuIGJhc2U2NFdyaXRlKHRoaXMsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpXG5cbiAgICAgIGNhc2UgJ3VjczInOlxuICAgICAgY2FzZSAndWNzLTInOlxuICAgICAgY2FzZSAndXRmMTZsZSc6XG4gICAgICBjYXNlICd1dGYtMTZsZSc6XG4gICAgICAgIHJldHVybiB1Y3MyV3JpdGUodGhpcywgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aClcblxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgaWYgKGxvd2VyZWRDYXNlKSB0aHJvdyBuZXcgVHlwZUVycm9yKCdVbmtub3duIGVuY29kaW5nOiAnICsgZW5jb2RpbmcpXG4gICAgICAgIGVuY29kaW5nID0gKCcnICsgZW5jb2RpbmcpLnRvTG93ZXJDYXNlKClcbiAgICAgICAgbG93ZXJlZENhc2UgPSB0cnVlXG4gICAgfVxuICB9XG59XG5cbkJ1ZmZlci5wcm90b3R5cGUudG9KU09OID0gZnVuY3Rpb24gdG9KU09OICgpIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiAnQnVmZmVyJyxcbiAgICBkYXRhOiBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbCh0aGlzLl9hcnIgfHwgdGhpcywgMClcbiAgfVxufVxuXG5mdW5jdGlvbiBiYXNlNjRTbGljZSAoYnVmLCBzdGFydCwgZW5kKSB7XG4gIGlmIChzdGFydCA9PT0gMCAmJiBlbmQgPT09IGJ1Zi5sZW5ndGgpIHtcbiAgICByZXR1cm4gYmFzZTY0LmZyb21CeXRlQXJyYXkoYnVmKVxuICB9IGVsc2Uge1xuICAgIHJldHVybiBiYXNlNjQuZnJvbUJ5dGVBcnJheShidWYuc2xpY2Uoc3RhcnQsIGVuZCkpXG4gIH1cbn1cblxuZnVuY3Rpb24gdXRmOFNsaWNlIChidWYsIHN0YXJ0LCBlbmQpIHtcbiAgZW5kID0gTWF0aC5taW4oYnVmLmxlbmd0aCwgZW5kKVxuICB2YXIgcmVzID0gW11cblxuICB2YXIgaSA9IHN0YXJ0XG4gIHdoaWxlIChpIDwgZW5kKSB7XG4gICAgdmFyIGZpcnN0Qnl0ZSA9IGJ1ZltpXVxuICAgIHZhciBjb2RlUG9pbnQgPSBudWxsXG4gICAgdmFyIGJ5dGVzUGVyU2VxdWVuY2UgPSAoZmlyc3RCeXRlID4gMHhFRikgPyA0XG4gICAgICA6IChmaXJzdEJ5dGUgPiAweERGKSA/IDNcbiAgICAgIDogKGZpcnN0Qnl0ZSA+IDB4QkYpID8gMlxuICAgICAgOiAxXG5cbiAgICBpZiAoaSArIGJ5dGVzUGVyU2VxdWVuY2UgPD0gZW5kKSB7XG4gICAgICB2YXIgc2Vjb25kQnl0ZSwgdGhpcmRCeXRlLCBmb3VydGhCeXRlLCB0ZW1wQ29kZVBvaW50XG5cbiAgICAgIHN3aXRjaCAoYnl0ZXNQZXJTZXF1ZW5jZSkge1xuICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgaWYgKGZpcnN0Qnl0ZSA8IDB4ODApIHtcbiAgICAgICAgICAgIGNvZGVQb2ludCA9IGZpcnN0Qnl0ZVxuICAgICAgICAgIH1cbiAgICAgICAgICBicmVha1xuICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgc2Vjb25kQnl0ZSA9IGJ1ZltpICsgMV1cbiAgICAgICAgICBpZiAoKHNlY29uZEJ5dGUgJiAweEMwKSA9PT0gMHg4MCkge1xuICAgICAgICAgICAgdGVtcENvZGVQb2ludCA9IChmaXJzdEJ5dGUgJiAweDFGKSA8PCAweDYgfCAoc2Vjb25kQnl0ZSAmIDB4M0YpXG4gICAgICAgICAgICBpZiAodGVtcENvZGVQb2ludCA+IDB4N0YpIHtcbiAgICAgICAgICAgICAgY29kZVBvaW50ID0gdGVtcENvZGVQb2ludFxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBicmVha1xuICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgc2Vjb25kQnl0ZSA9IGJ1ZltpICsgMV1cbiAgICAgICAgICB0aGlyZEJ5dGUgPSBidWZbaSArIDJdXG4gICAgICAgICAgaWYgKChzZWNvbmRCeXRlICYgMHhDMCkgPT09IDB4ODAgJiYgKHRoaXJkQnl0ZSAmIDB4QzApID09PSAweDgwKSB7XG4gICAgICAgICAgICB0ZW1wQ29kZVBvaW50ID0gKGZpcnN0Qnl0ZSAmIDB4RikgPDwgMHhDIHwgKHNlY29uZEJ5dGUgJiAweDNGKSA8PCAweDYgfCAodGhpcmRCeXRlICYgMHgzRilcbiAgICAgICAgICAgIGlmICh0ZW1wQ29kZVBvaW50ID4gMHg3RkYgJiYgKHRlbXBDb2RlUG9pbnQgPCAweEQ4MDAgfHwgdGVtcENvZGVQb2ludCA+IDB4REZGRikpIHtcbiAgICAgICAgICAgICAgY29kZVBvaW50ID0gdGVtcENvZGVQb2ludFxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBicmVha1xuICAgICAgICBjYXNlIDQ6XG4gICAgICAgICAgc2Vjb25kQnl0ZSA9IGJ1ZltpICsgMV1cbiAgICAgICAgICB0aGlyZEJ5dGUgPSBidWZbaSArIDJdXG4gICAgICAgICAgZm91cnRoQnl0ZSA9IGJ1ZltpICsgM11cbiAgICAgICAgICBpZiAoKHNlY29uZEJ5dGUgJiAweEMwKSA9PT0gMHg4MCAmJiAodGhpcmRCeXRlICYgMHhDMCkgPT09IDB4ODAgJiYgKGZvdXJ0aEJ5dGUgJiAweEMwKSA9PT0gMHg4MCkge1xuICAgICAgICAgICAgdGVtcENvZGVQb2ludCA9IChmaXJzdEJ5dGUgJiAweEYpIDw8IDB4MTIgfCAoc2Vjb25kQnl0ZSAmIDB4M0YpIDw8IDB4QyB8ICh0aGlyZEJ5dGUgJiAweDNGKSA8PCAweDYgfCAoZm91cnRoQnl0ZSAmIDB4M0YpXG4gICAgICAgICAgICBpZiAodGVtcENvZGVQb2ludCA+IDB4RkZGRiAmJiB0ZW1wQ29kZVBvaW50IDwgMHgxMTAwMDApIHtcbiAgICAgICAgICAgICAgY29kZVBvaW50ID0gdGVtcENvZGVQb2ludFxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoY29kZVBvaW50ID09PSBudWxsKSB7XG4gICAgICAvLyB3ZSBkaWQgbm90IGdlbmVyYXRlIGEgdmFsaWQgY29kZVBvaW50IHNvIGluc2VydCBhXG4gICAgICAvLyByZXBsYWNlbWVudCBjaGFyIChVK0ZGRkQpIGFuZCBhZHZhbmNlIG9ubHkgMSBieXRlXG4gICAgICBjb2RlUG9pbnQgPSAweEZGRkRcbiAgICAgIGJ5dGVzUGVyU2VxdWVuY2UgPSAxXG4gICAgfSBlbHNlIGlmIChjb2RlUG9pbnQgPiAweEZGRkYpIHtcbiAgICAgIC8vIGVuY29kZSB0byB1dGYxNiAoc3Vycm9nYXRlIHBhaXIgZGFuY2UpXG4gICAgICBjb2RlUG9pbnQgLT0gMHgxMDAwMFxuICAgICAgcmVzLnB1c2goY29kZVBvaW50ID4+PiAxMCAmIDB4M0ZGIHwgMHhEODAwKVxuICAgICAgY29kZVBvaW50ID0gMHhEQzAwIHwgY29kZVBvaW50ICYgMHgzRkZcbiAgICB9XG5cbiAgICByZXMucHVzaChjb2RlUG9pbnQpXG4gICAgaSArPSBieXRlc1BlclNlcXVlbmNlXG4gIH1cblxuICByZXR1cm4gZGVjb2RlQ29kZVBvaW50c0FycmF5KHJlcylcbn1cblxuLy8gQmFzZWQgb24gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMjI3NDcyNzIvNjgwNzQyLCB0aGUgYnJvd3NlciB3aXRoXG4vLyB0aGUgbG93ZXN0IGxpbWl0IGlzIENocm9tZSwgd2l0aCAweDEwMDAwIGFyZ3MuXG4vLyBXZSBnbyAxIG1hZ25pdHVkZSBsZXNzLCBmb3Igc2FmZXR5XG52YXIgTUFYX0FSR1VNRU5UU19MRU5HVEggPSAweDEwMDBcblxuZnVuY3Rpb24gZGVjb2RlQ29kZVBvaW50c0FycmF5IChjb2RlUG9pbnRzKSB7XG4gIHZhciBsZW4gPSBjb2RlUG9pbnRzLmxlbmd0aFxuICBpZiAobGVuIDw9IE1BWF9BUkdVTUVOVFNfTEVOR1RIKSB7XG4gICAgcmV0dXJuIFN0cmluZy5mcm9tQ2hhckNvZGUuYXBwbHkoU3RyaW5nLCBjb2RlUG9pbnRzKSAvLyBhdm9pZCBleHRyYSBzbGljZSgpXG4gIH1cblxuICAvLyBEZWNvZGUgaW4gY2h1bmtzIHRvIGF2b2lkIFwiY2FsbCBzdGFjayBzaXplIGV4Y2VlZGVkXCIuXG4gIHZhciByZXMgPSAnJ1xuICB2YXIgaSA9IDBcbiAgd2hpbGUgKGkgPCBsZW4pIHtcbiAgICByZXMgKz0gU3RyaW5nLmZyb21DaGFyQ29kZS5hcHBseShcbiAgICAgIFN0cmluZyxcbiAgICAgIGNvZGVQb2ludHMuc2xpY2UoaSwgaSArPSBNQVhfQVJHVU1FTlRTX0xFTkdUSClcbiAgICApXG4gIH1cbiAgcmV0dXJuIHJlc1xufVxuXG5mdW5jdGlvbiBhc2NpaVNsaWNlIChidWYsIHN0YXJ0LCBlbmQpIHtcbiAgdmFyIHJldCA9ICcnXG4gIGVuZCA9IE1hdGgubWluKGJ1Zi5sZW5ndGgsIGVuZClcblxuICBmb3IgKHZhciBpID0gc3RhcnQ7IGkgPCBlbmQ7ICsraSkge1xuICAgIHJldCArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGJ1ZltpXSAmIDB4N0YpXG4gIH1cbiAgcmV0dXJuIHJldFxufVxuXG5mdW5jdGlvbiBsYXRpbjFTbGljZSAoYnVmLCBzdGFydCwgZW5kKSB7XG4gIHZhciByZXQgPSAnJ1xuICBlbmQgPSBNYXRoLm1pbihidWYubGVuZ3RoLCBlbmQpXG5cbiAgZm9yICh2YXIgaSA9IHN0YXJ0OyBpIDwgZW5kOyArK2kpIHtcbiAgICByZXQgKz0gU3RyaW5nLmZyb21DaGFyQ29kZShidWZbaV0pXG4gIH1cbiAgcmV0dXJuIHJldFxufVxuXG5mdW5jdGlvbiBoZXhTbGljZSAoYnVmLCBzdGFydCwgZW5kKSB7XG4gIHZhciBsZW4gPSBidWYubGVuZ3RoXG5cbiAgaWYgKCFzdGFydCB8fCBzdGFydCA8IDApIHN0YXJ0ID0gMFxuICBpZiAoIWVuZCB8fCBlbmQgPCAwIHx8IGVuZCA+IGxlbikgZW5kID0gbGVuXG5cbiAgdmFyIG91dCA9ICcnXG4gIGZvciAodmFyIGkgPSBzdGFydDsgaSA8IGVuZDsgKytpKSB7XG4gICAgb3V0ICs9IHRvSGV4KGJ1ZltpXSlcbiAgfVxuICByZXR1cm4gb3V0XG59XG5cbmZ1bmN0aW9uIHV0ZjE2bGVTbGljZSAoYnVmLCBzdGFydCwgZW5kKSB7XG4gIHZhciBieXRlcyA9IGJ1Zi5zbGljZShzdGFydCwgZW5kKVxuICB2YXIgcmVzID0gJydcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBieXRlcy5sZW5ndGg7IGkgKz0gMikge1xuICAgIHJlcyArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGJ5dGVzW2ldICsgYnl0ZXNbaSArIDFdICogMjU2KVxuICB9XG4gIHJldHVybiByZXNcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5zbGljZSA9IGZ1bmN0aW9uIHNsaWNlIChzdGFydCwgZW5kKSB7XG4gIHZhciBsZW4gPSB0aGlzLmxlbmd0aFxuICBzdGFydCA9IH5+c3RhcnRcbiAgZW5kID0gZW5kID09PSB1bmRlZmluZWQgPyBsZW4gOiB+fmVuZFxuXG4gIGlmIChzdGFydCA8IDApIHtcbiAgICBzdGFydCArPSBsZW5cbiAgICBpZiAoc3RhcnQgPCAwKSBzdGFydCA9IDBcbiAgfSBlbHNlIGlmIChzdGFydCA+IGxlbikge1xuICAgIHN0YXJ0ID0gbGVuXG4gIH1cblxuICBpZiAoZW5kIDwgMCkge1xuICAgIGVuZCArPSBsZW5cbiAgICBpZiAoZW5kIDwgMCkgZW5kID0gMFxuICB9IGVsc2UgaWYgKGVuZCA+IGxlbikge1xuICAgIGVuZCA9IGxlblxuICB9XG5cbiAgaWYgKGVuZCA8IHN0YXJ0KSBlbmQgPSBzdGFydFxuXG4gIHZhciBuZXdCdWZcbiAgaWYgKEJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUKSB7XG4gICAgbmV3QnVmID0gdGhpcy5zdWJhcnJheShzdGFydCwgZW5kKVxuICAgIG5ld0J1Zi5fX3Byb3RvX18gPSBCdWZmZXIucHJvdG90eXBlXG4gIH0gZWxzZSB7XG4gICAgdmFyIHNsaWNlTGVuID0gZW5kIC0gc3RhcnRcbiAgICBuZXdCdWYgPSBuZXcgQnVmZmVyKHNsaWNlTGVuLCB1bmRlZmluZWQpXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzbGljZUxlbjsgKytpKSB7XG4gICAgICBuZXdCdWZbaV0gPSB0aGlzW2kgKyBzdGFydF1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gbmV3QnVmXG59XG5cbi8qXG4gKiBOZWVkIHRvIG1ha2Ugc3VyZSB0aGF0IGJ1ZmZlciBpc24ndCB0cnlpbmcgdG8gd3JpdGUgb3V0IG9mIGJvdW5kcy5cbiAqL1xuZnVuY3Rpb24gY2hlY2tPZmZzZXQgKG9mZnNldCwgZXh0LCBsZW5ndGgpIHtcbiAgaWYgKChvZmZzZXQgJSAxKSAhPT0gMCB8fCBvZmZzZXQgPCAwKSB0aHJvdyBuZXcgUmFuZ2VFcnJvcignb2Zmc2V0IGlzIG5vdCB1aW50JylcbiAgaWYgKG9mZnNldCArIGV4dCA+IGxlbmd0aCkgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ1RyeWluZyB0byBhY2Nlc3MgYmV5b25kIGJ1ZmZlciBsZW5ndGgnKVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRVSW50TEUgPSBmdW5jdGlvbiByZWFkVUludExFIChvZmZzZXQsIGJ5dGVMZW5ndGgsIG5vQXNzZXJ0KSB7XG4gIG9mZnNldCA9IG9mZnNldCB8IDBcbiAgYnl0ZUxlbmd0aCA9IGJ5dGVMZW5ndGggfCAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgYnl0ZUxlbmd0aCwgdGhpcy5sZW5ndGgpXG5cbiAgdmFyIHZhbCA9IHRoaXNbb2Zmc2V0XVxuICB2YXIgbXVsID0gMVxuICB2YXIgaSA9IDBcbiAgd2hpbGUgKCsraSA8IGJ5dGVMZW5ndGggJiYgKG11bCAqPSAweDEwMCkpIHtcbiAgICB2YWwgKz0gdGhpc1tvZmZzZXQgKyBpXSAqIG11bFxuICB9XG5cbiAgcmV0dXJuIHZhbFxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRVSW50QkUgPSBmdW5jdGlvbiByZWFkVUludEJFIChvZmZzZXQsIGJ5dGVMZW5ndGgsIG5vQXNzZXJ0KSB7XG4gIG9mZnNldCA9IG9mZnNldCB8IDBcbiAgYnl0ZUxlbmd0aCA9IGJ5dGVMZW5ndGggfCAwXG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICBjaGVja09mZnNldChvZmZzZXQsIGJ5dGVMZW5ndGgsIHRoaXMubGVuZ3RoKVxuICB9XG5cbiAgdmFyIHZhbCA9IHRoaXNbb2Zmc2V0ICsgLS1ieXRlTGVuZ3RoXVxuICB2YXIgbXVsID0gMVxuICB3aGlsZSAoYnl0ZUxlbmd0aCA+IDAgJiYgKG11bCAqPSAweDEwMCkpIHtcbiAgICB2YWwgKz0gdGhpc1tvZmZzZXQgKyAtLWJ5dGVMZW5ndGhdICogbXVsXG4gIH1cblxuICByZXR1cm4gdmFsXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZFVJbnQ4ID0gZnVuY3Rpb24gcmVhZFVJbnQ4IChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgMSwgdGhpcy5sZW5ndGgpXG4gIHJldHVybiB0aGlzW29mZnNldF1cbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkVUludDE2TEUgPSBmdW5jdGlvbiByZWFkVUludDE2TEUgKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCAyLCB0aGlzLmxlbmd0aClcbiAgcmV0dXJuIHRoaXNbb2Zmc2V0XSB8ICh0aGlzW29mZnNldCArIDFdIDw8IDgpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZFVJbnQxNkJFID0gZnVuY3Rpb24gcmVhZFVJbnQxNkJFIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgMiwgdGhpcy5sZW5ndGgpXG4gIHJldHVybiAodGhpc1tvZmZzZXRdIDw8IDgpIHwgdGhpc1tvZmZzZXQgKyAxXVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRVSW50MzJMRSA9IGZ1bmN0aW9uIHJlYWRVSW50MzJMRSAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDQsIHRoaXMubGVuZ3RoKVxuXG4gIHJldHVybiAoKHRoaXNbb2Zmc2V0XSkgfFxuICAgICAgKHRoaXNbb2Zmc2V0ICsgMV0gPDwgOCkgfFxuICAgICAgKHRoaXNbb2Zmc2V0ICsgMl0gPDwgMTYpKSArXG4gICAgICAodGhpc1tvZmZzZXQgKyAzXSAqIDB4MTAwMDAwMClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkVUludDMyQkUgPSBmdW5jdGlvbiByZWFkVUludDMyQkUgKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCA0LCB0aGlzLmxlbmd0aClcblxuICByZXR1cm4gKHRoaXNbb2Zmc2V0XSAqIDB4MTAwMDAwMCkgK1xuICAgICgodGhpc1tvZmZzZXQgKyAxXSA8PCAxNikgfFxuICAgICh0aGlzW29mZnNldCArIDJdIDw8IDgpIHxcbiAgICB0aGlzW29mZnNldCArIDNdKVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRJbnRMRSA9IGZ1bmN0aW9uIHJlYWRJbnRMRSAob2Zmc2V0LCBieXRlTGVuZ3RoLCBub0Fzc2VydCkge1xuICBvZmZzZXQgPSBvZmZzZXQgfCAwXG4gIGJ5dGVMZW5ndGggPSBieXRlTGVuZ3RoIHwgMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIGJ5dGVMZW5ndGgsIHRoaXMubGVuZ3RoKVxuXG4gIHZhciB2YWwgPSB0aGlzW29mZnNldF1cbiAgdmFyIG11bCA9IDFcbiAgdmFyIGkgPSAwXG4gIHdoaWxlICgrK2kgPCBieXRlTGVuZ3RoICYmIChtdWwgKj0gMHgxMDApKSB7XG4gICAgdmFsICs9IHRoaXNbb2Zmc2V0ICsgaV0gKiBtdWxcbiAgfVxuICBtdWwgKj0gMHg4MFxuXG4gIGlmICh2YWwgPj0gbXVsKSB2YWwgLT0gTWF0aC5wb3coMiwgOCAqIGJ5dGVMZW5ndGgpXG5cbiAgcmV0dXJuIHZhbFxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRJbnRCRSA9IGZ1bmN0aW9uIHJlYWRJbnRCRSAob2Zmc2V0LCBieXRlTGVuZ3RoLCBub0Fzc2VydCkge1xuICBvZmZzZXQgPSBvZmZzZXQgfCAwXG4gIGJ5dGVMZW5ndGggPSBieXRlTGVuZ3RoIHwgMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIGJ5dGVMZW5ndGgsIHRoaXMubGVuZ3RoKVxuXG4gIHZhciBpID0gYnl0ZUxlbmd0aFxuICB2YXIgbXVsID0gMVxuICB2YXIgdmFsID0gdGhpc1tvZmZzZXQgKyAtLWldXG4gIHdoaWxlIChpID4gMCAmJiAobXVsICo9IDB4MTAwKSkge1xuICAgIHZhbCArPSB0aGlzW29mZnNldCArIC0taV0gKiBtdWxcbiAgfVxuICBtdWwgKj0gMHg4MFxuXG4gIGlmICh2YWwgPj0gbXVsKSB2YWwgLT0gTWF0aC5wb3coMiwgOCAqIGJ5dGVMZW5ndGgpXG5cbiAgcmV0dXJuIHZhbFxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRJbnQ4ID0gZnVuY3Rpb24gcmVhZEludDggKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCAxLCB0aGlzLmxlbmd0aClcbiAgaWYgKCEodGhpc1tvZmZzZXRdICYgMHg4MCkpIHJldHVybiAodGhpc1tvZmZzZXRdKVxuICByZXR1cm4gKCgweGZmIC0gdGhpc1tvZmZzZXRdICsgMSkgKiAtMSlcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkSW50MTZMRSA9IGZ1bmN0aW9uIHJlYWRJbnQxNkxFIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgMiwgdGhpcy5sZW5ndGgpXG4gIHZhciB2YWwgPSB0aGlzW29mZnNldF0gfCAodGhpc1tvZmZzZXQgKyAxXSA8PCA4KVxuICByZXR1cm4gKHZhbCAmIDB4ODAwMCkgPyB2YWwgfCAweEZGRkYwMDAwIDogdmFsXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEludDE2QkUgPSBmdW5jdGlvbiByZWFkSW50MTZCRSAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDIsIHRoaXMubGVuZ3RoKVxuICB2YXIgdmFsID0gdGhpc1tvZmZzZXQgKyAxXSB8ICh0aGlzW29mZnNldF0gPDwgOClcbiAgcmV0dXJuICh2YWwgJiAweDgwMDApID8gdmFsIHwgMHhGRkZGMDAwMCA6IHZhbFxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRJbnQzMkxFID0gZnVuY3Rpb24gcmVhZEludDMyTEUgKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCA0LCB0aGlzLmxlbmd0aClcblxuICByZXR1cm4gKHRoaXNbb2Zmc2V0XSkgfFxuICAgICh0aGlzW29mZnNldCArIDFdIDw8IDgpIHxcbiAgICAodGhpc1tvZmZzZXQgKyAyXSA8PCAxNikgfFxuICAgICh0aGlzW29mZnNldCArIDNdIDw8IDI0KVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRJbnQzMkJFID0gZnVuY3Rpb24gcmVhZEludDMyQkUgKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCA0LCB0aGlzLmxlbmd0aClcblxuICByZXR1cm4gKHRoaXNbb2Zmc2V0XSA8PCAyNCkgfFxuICAgICh0aGlzW29mZnNldCArIDFdIDw8IDE2KSB8XG4gICAgKHRoaXNbb2Zmc2V0ICsgMl0gPDwgOCkgfFxuICAgICh0aGlzW29mZnNldCArIDNdKVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRGbG9hdExFID0gZnVuY3Rpb24gcmVhZEZsb2F0TEUgKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCA0LCB0aGlzLmxlbmd0aClcbiAgcmV0dXJuIGllZWU3NTQucmVhZCh0aGlzLCBvZmZzZXQsIHRydWUsIDIzLCA0KVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRGbG9hdEJFID0gZnVuY3Rpb24gcmVhZEZsb2F0QkUgKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCA0LCB0aGlzLmxlbmd0aClcbiAgcmV0dXJuIGllZWU3NTQucmVhZCh0aGlzLCBvZmZzZXQsIGZhbHNlLCAyMywgNClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkRG91YmxlTEUgPSBmdW5jdGlvbiByZWFkRG91YmxlTEUgKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCA4LCB0aGlzLmxlbmd0aClcbiAgcmV0dXJuIGllZWU3NTQucmVhZCh0aGlzLCBvZmZzZXQsIHRydWUsIDUyLCA4KVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWREb3VibGVCRSA9IGZ1bmN0aW9uIHJlYWREb3VibGVCRSAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDgsIHRoaXMubGVuZ3RoKVxuICByZXR1cm4gaWVlZTc1NC5yZWFkKHRoaXMsIG9mZnNldCwgZmFsc2UsIDUyLCA4KVxufVxuXG5mdW5jdGlvbiBjaGVja0ludCAoYnVmLCB2YWx1ZSwgb2Zmc2V0LCBleHQsIG1heCwgbWluKSB7XG4gIGlmICghQnVmZmVyLmlzQnVmZmVyKGJ1ZikpIHRocm93IG5ldyBUeXBlRXJyb3IoJ1wiYnVmZmVyXCIgYXJndW1lbnQgbXVzdCBiZSBhIEJ1ZmZlciBpbnN0YW5jZScpXG4gIGlmICh2YWx1ZSA+IG1heCB8fCB2YWx1ZSA8IG1pbikgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ1widmFsdWVcIiBhcmd1bWVudCBpcyBvdXQgb2YgYm91bmRzJylcbiAgaWYgKG9mZnNldCArIGV4dCA+IGJ1Zi5sZW5ndGgpIHRocm93IG5ldyBSYW5nZUVycm9yKCdJbmRleCBvdXQgb2YgcmFuZ2UnKVxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlVUludExFID0gZnVuY3Rpb24gd3JpdGVVSW50TEUgKHZhbHVlLCBvZmZzZXQsIGJ5dGVMZW5ndGgsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCB8IDBcbiAgYnl0ZUxlbmd0aCA9IGJ5dGVMZW5ndGggfCAwXG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICB2YXIgbWF4Qnl0ZXMgPSBNYXRoLnBvdygyLCA4ICogYnl0ZUxlbmd0aCkgLSAxXG4gICAgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgYnl0ZUxlbmd0aCwgbWF4Qnl0ZXMsIDApXG4gIH1cblxuICB2YXIgbXVsID0gMVxuICB2YXIgaSA9IDBcbiAgdGhpc1tvZmZzZXRdID0gdmFsdWUgJiAweEZGXG4gIHdoaWxlICgrK2kgPCBieXRlTGVuZ3RoICYmIChtdWwgKj0gMHgxMDApKSB7XG4gICAgdGhpc1tvZmZzZXQgKyBpXSA9ICh2YWx1ZSAvIG11bCkgJiAweEZGXG4gIH1cblxuICByZXR1cm4gb2Zmc2V0ICsgYnl0ZUxlbmd0aFxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlVUludEJFID0gZnVuY3Rpb24gd3JpdGVVSW50QkUgKHZhbHVlLCBvZmZzZXQsIGJ5dGVMZW5ndGgsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCB8IDBcbiAgYnl0ZUxlbmd0aCA9IGJ5dGVMZW5ndGggfCAwXG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICB2YXIgbWF4Qnl0ZXMgPSBNYXRoLnBvdygyLCA4ICogYnl0ZUxlbmd0aCkgLSAxXG4gICAgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgYnl0ZUxlbmd0aCwgbWF4Qnl0ZXMsIDApXG4gIH1cblxuICB2YXIgaSA9IGJ5dGVMZW5ndGggLSAxXG4gIHZhciBtdWwgPSAxXG4gIHRoaXNbb2Zmc2V0ICsgaV0gPSB2YWx1ZSAmIDB4RkZcbiAgd2hpbGUgKC0taSA+PSAwICYmIChtdWwgKj0gMHgxMDApKSB7XG4gICAgdGhpc1tvZmZzZXQgKyBpXSA9ICh2YWx1ZSAvIG11bCkgJiAweEZGXG4gIH1cblxuICByZXR1cm4gb2Zmc2V0ICsgYnl0ZUxlbmd0aFxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlVUludDggPSBmdW5jdGlvbiB3cml0ZVVJbnQ4ICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgfCAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIDEsIDB4ZmYsIDApXG4gIGlmICghQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQpIHZhbHVlID0gTWF0aC5mbG9vcih2YWx1ZSlcbiAgdGhpc1tvZmZzZXRdID0gKHZhbHVlICYgMHhmZilcbiAgcmV0dXJuIG9mZnNldCArIDFcbn1cblxuZnVuY3Rpb24gb2JqZWN0V3JpdGVVSW50MTYgKGJ1ZiwgdmFsdWUsIG9mZnNldCwgbGl0dGxlRW5kaWFuKSB7XG4gIGlmICh2YWx1ZSA8IDApIHZhbHVlID0gMHhmZmZmICsgdmFsdWUgKyAxXG4gIGZvciAodmFyIGkgPSAwLCBqID0gTWF0aC5taW4oYnVmLmxlbmd0aCAtIG9mZnNldCwgMik7IGkgPCBqOyArK2kpIHtcbiAgICBidWZbb2Zmc2V0ICsgaV0gPSAodmFsdWUgJiAoMHhmZiA8PCAoOCAqIChsaXR0bGVFbmRpYW4gPyBpIDogMSAtIGkpKSkpID4+PlxuICAgICAgKGxpdHRsZUVuZGlhbiA/IGkgOiAxIC0gaSkgKiA4XG4gIH1cbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZVVJbnQxNkxFID0gZnVuY3Rpb24gd3JpdGVVSW50MTZMRSAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0IHwgMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCAyLCAweGZmZmYsIDApXG4gIGlmIChCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCkge1xuICAgIHRoaXNbb2Zmc2V0XSA9ICh2YWx1ZSAmIDB4ZmYpXG4gICAgdGhpc1tvZmZzZXQgKyAxXSA9ICh2YWx1ZSA+Pj4gOClcbiAgfSBlbHNlIHtcbiAgICBvYmplY3RXcml0ZVVJbnQxNih0aGlzLCB2YWx1ZSwgb2Zmc2V0LCB0cnVlKVxuICB9XG4gIHJldHVybiBvZmZzZXQgKyAyXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVVSW50MTZCRSA9IGZ1bmN0aW9uIHdyaXRlVUludDE2QkUgKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCB8IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgMiwgMHhmZmZmLCAwKVxuICBpZiAoQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQpIHtcbiAgICB0aGlzW29mZnNldF0gPSAodmFsdWUgPj4+IDgpXG4gICAgdGhpc1tvZmZzZXQgKyAxXSA9ICh2YWx1ZSAmIDB4ZmYpXG4gIH0gZWxzZSB7XG4gICAgb2JqZWN0V3JpdGVVSW50MTYodGhpcywgdmFsdWUsIG9mZnNldCwgZmFsc2UpXG4gIH1cbiAgcmV0dXJuIG9mZnNldCArIDJcbn1cblxuZnVuY3Rpb24gb2JqZWN0V3JpdGVVSW50MzIgKGJ1ZiwgdmFsdWUsIG9mZnNldCwgbGl0dGxlRW5kaWFuKSB7XG4gIGlmICh2YWx1ZSA8IDApIHZhbHVlID0gMHhmZmZmZmZmZiArIHZhbHVlICsgMVxuICBmb3IgKHZhciBpID0gMCwgaiA9IE1hdGgubWluKGJ1Zi5sZW5ndGggLSBvZmZzZXQsIDQpOyBpIDwgajsgKytpKSB7XG4gICAgYnVmW29mZnNldCArIGldID0gKHZhbHVlID4+PiAobGl0dGxlRW5kaWFuID8gaSA6IDMgLSBpKSAqIDgpICYgMHhmZlxuICB9XG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVVSW50MzJMRSA9IGZ1bmN0aW9uIHdyaXRlVUludDMyTEUgKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCB8IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgNCwgMHhmZmZmZmZmZiwgMClcbiAgaWYgKEJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUKSB7XG4gICAgdGhpc1tvZmZzZXQgKyAzXSA9ICh2YWx1ZSA+Pj4gMjQpXG4gICAgdGhpc1tvZmZzZXQgKyAyXSA9ICh2YWx1ZSA+Pj4gMTYpXG4gICAgdGhpc1tvZmZzZXQgKyAxXSA9ICh2YWx1ZSA+Pj4gOClcbiAgICB0aGlzW29mZnNldF0gPSAodmFsdWUgJiAweGZmKVxuICB9IGVsc2Uge1xuICAgIG9iamVjdFdyaXRlVUludDMyKHRoaXMsIHZhbHVlLCBvZmZzZXQsIHRydWUpXG4gIH1cbiAgcmV0dXJuIG9mZnNldCArIDRcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZVVJbnQzMkJFID0gZnVuY3Rpb24gd3JpdGVVSW50MzJCRSAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0IHwgMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCA0LCAweGZmZmZmZmZmLCAwKVxuICBpZiAoQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQpIHtcbiAgICB0aGlzW29mZnNldF0gPSAodmFsdWUgPj4+IDI0KVxuICAgIHRoaXNbb2Zmc2V0ICsgMV0gPSAodmFsdWUgPj4+IDE2KVxuICAgIHRoaXNbb2Zmc2V0ICsgMl0gPSAodmFsdWUgPj4+IDgpXG4gICAgdGhpc1tvZmZzZXQgKyAzXSA9ICh2YWx1ZSAmIDB4ZmYpXG4gIH0gZWxzZSB7XG4gICAgb2JqZWN0V3JpdGVVSW50MzIodGhpcywgdmFsdWUsIG9mZnNldCwgZmFsc2UpXG4gIH1cbiAgcmV0dXJuIG9mZnNldCArIDRcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZUludExFID0gZnVuY3Rpb24gd3JpdGVJbnRMRSAodmFsdWUsIG9mZnNldCwgYnl0ZUxlbmd0aCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0IHwgMFxuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgdmFyIGxpbWl0ID0gTWF0aC5wb3coMiwgOCAqIGJ5dGVMZW5ndGggLSAxKVxuXG4gICAgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgYnl0ZUxlbmd0aCwgbGltaXQgLSAxLCAtbGltaXQpXG4gIH1cblxuICB2YXIgaSA9IDBcbiAgdmFyIG11bCA9IDFcbiAgdmFyIHN1YiA9IDBcbiAgdGhpc1tvZmZzZXRdID0gdmFsdWUgJiAweEZGXG4gIHdoaWxlICgrK2kgPCBieXRlTGVuZ3RoICYmIChtdWwgKj0gMHgxMDApKSB7XG4gICAgaWYgKHZhbHVlIDwgMCAmJiBzdWIgPT09IDAgJiYgdGhpc1tvZmZzZXQgKyBpIC0gMV0gIT09IDApIHtcbiAgICAgIHN1YiA9IDFcbiAgICB9XG4gICAgdGhpc1tvZmZzZXQgKyBpXSA9ICgodmFsdWUgLyBtdWwpID4+IDApIC0gc3ViICYgMHhGRlxuICB9XG5cbiAgcmV0dXJuIG9mZnNldCArIGJ5dGVMZW5ndGhcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZUludEJFID0gZnVuY3Rpb24gd3JpdGVJbnRCRSAodmFsdWUsIG9mZnNldCwgYnl0ZUxlbmd0aCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0IHwgMFxuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgdmFyIGxpbWl0ID0gTWF0aC5wb3coMiwgOCAqIGJ5dGVMZW5ndGggLSAxKVxuXG4gICAgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgYnl0ZUxlbmd0aCwgbGltaXQgLSAxLCAtbGltaXQpXG4gIH1cblxuICB2YXIgaSA9IGJ5dGVMZW5ndGggLSAxXG4gIHZhciBtdWwgPSAxXG4gIHZhciBzdWIgPSAwXG4gIHRoaXNbb2Zmc2V0ICsgaV0gPSB2YWx1ZSAmIDB4RkZcbiAgd2hpbGUgKC0taSA+PSAwICYmIChtdWwgKj0gMHgxMDApKSB7XG4gICAgaWYgKHZhbHVlIDwgMCAmJiBzdWIgPT09IDAgJiYgdGhpc1tvZmZzZXQgKyBpICsgMV0gIT09IDApIHtcbiAgICAgIHN1YiA9IDFcbiAgICB9XG4gICAgdGhpc1tvZmZzZXQgKyBpXSA9ICgodmFsdWUgLyBtdWwpID4+IDApIC0gc3ViICYgMHhGRlxuICB9XG5cbiAgcmV0dXJuIG9mZnNldCArIGJ5dGVMZW5ndGhcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZUludDggPSBmdW5jdGlvbiB3cml0ZUludDggKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCB8IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgMSwgMHg3ZiwgLTB4ODApXG4gIGlmICghQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQpIHZhbHVlID0gTWF0aC5mbG9vcih2YWx1ZSlcbiAgaWYgKHZhbHVlIDwgMCkgdmFsdWUgPSAweGZmICsgdmFsdWUgKyAxXG4gIHRoaXNbb2Zmc2V0XSA9ICh2YWx1ZSAmIDB4ZmYpXG4gIHJldHVybiBvZmZzZXQgKyAxXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVJbnQxNkxFID0gZnVuY3Rpb24gd3JpdGVJbnQxNkxFICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgfCAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIDIsIDB4N2ZmZiwgLTB4ODAwMClcbiAgaWYgKEJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUKSB7XG4gICAgdGhpc1tvZmZzZXRdID0gKHZhbHVlICYgMHhmZilcbiAgICB0aGlzW29mZnNldCArIDFdID0gKHZhbHVlID4+PiA4KVxuICB9IGVsc2Uge1xuICAgIG9iamVjdFdyaXRlVUludDE2KHRoaXMsIHZhbHVlLCBvZmZzZXQsIHRydWUpXG4gIH1cbiAgcmV0dXJuIG9mZnNldCArIDJcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZUludDE2QkUgPSBmdW5jdGlvbiB3cml0ZUludDE2QkUgKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCB8IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgMiwgMHg3ZmZmLCAtMHg4MDAwKVxuICBpZiAoQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQpIHtcbiAgICB0aGlzW29mZnNldF0gPSAodmFsdWUgPj4+IDgpXG4gICAgdGhpc1tvZmZzZXQgKyAxXSA9ICh2YWx1ZSAmIDB4ZmYpXG4gIH0gZWxzZSB7XG4gICAgb2JqZWN0V3JpdGVVSW50MTYodGhpcywgdmFsdWUsIG9mZnNldCwgZmFsc2UpXG4gIH1cbiAgcmV0dXJuIG9mZnNldCArIDJcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZUludDMyTEUgPSBmdW5jdGlvbiB3cml0ZUludDMyTEUgKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCB8IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgNCwgMHg3ZmZmZmZmZiwgLTB4ODAwMDAwMDApXG4gIGlmIChCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCkge1xuICAgIHRoaXNbb2Zmc2V0XSA9ICh2YWx1ZSAmIDB4ZmYpXG4gICAgdGhpc1tvZmZzZXQgKyAxXSA9ICh2YWx1ZSA+Pj4gOClcbiAgICB0aGlzW29mZnNldCArIDJdID0gKHZhbHVlID4+PiAxNilcbiAgICB0aGlzW29mZnNldCArIDNdID0gKHZhbHVlID4+PiAyNClcbiAgfSBlbHNlIHtcbiAgICBvYmplY3RXcml0ZVVJbnQzMih0aGlzLCB2YWx1ZSwgb2Zmc2V0LCB0cnVlKVxuICB9XG4gIHJldHVybiBvZmZzZXQgKyA0XG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVJbnQzMkJFID0gZnVuY3Rpb24gd3JpdGVJbnQzMkJFICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgfCAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIDQsIDB4N2ZmZmZmZmYsIC0weDgwMDAwMDAwKVxuICBpZiAodmFsdWUgPCAwKSB2YWx1ZSA9IDB4ZmZmZmZmZmYgKyB2YWx1ZSArIDFcbiAgaWYgKEJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUKSB7XG4gICAgdGhpc1tvZmZzZXRdID0gKHZhbHVlID4+PiAyNClcbiAgICB0aGlzW29mZnNldCArIDFdID0gKHZhbHVlID4+PiAxNilcbiAgICB0aGlzW29mZnNldCArIDJdID0gKHZhbHVlID4+PiA4KVxuICAgIHRoaXNbb2Zmc2V0ICsgM10gPSAodmFsdWUgJiAweGZmKVxuICB9IGVsc2Uge1xuICAgIG9iamVjdFdyaXRlVUludDMyKHRoaXMsIHZhbHVlLCBvZmZzZXQsIGZhbHNlKVxuICB9XG4gIHJldHVybiBvZmZzZXQgKyA0XG59XG5cbmZ1bmN0aW9uIGNoZWNrSUVFRTc1NCAoYnVmLCB2YWx1ZSwgb2Zmc2V0LCBleHQsIG1heCwgbWluKSB7XG4gIGlmIChvZmZzZXQgKyBleHQgPiBidWYubGVuZ3RoKSB0aHJvdyBuZXcgUmFuZ2VFcnJvcignSW5kZXggb3V0IG9mIHJhbmdlJylcbiAgaWYgKG9mZnNldCA8IDApIHRocm93IG5ldyBSYW5nZUVycm9yKCdJbmRleCBvdXQgb2YgcmFuZ2UnKVxufVxuXG5mdW5jdGlvbiB3cml0ZUZsb2F0IChidWYsIHZhbHVlLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIGNoZWNrSUVFRTc1NChidWYsIHZhbHVlLCBvZmZzZXQsIDQsIDMuNDAyODIzNDY2Mzg1Mjg4NmUrMzgsIC0zLjQwMjgyMzQ2NjM4NTI4ODZlKzM4KVxuICB9XG4gIGllZWU3NTQud3JpdGUoYnVmLCB2YWx1ZSwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIDIzLCA0KVxuICByZXR1cm4gb2Zmc2V0ICsgNFxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlRmxvYXRMRSA9IGZ1bmN0aW9uIHdyaXRlRmxvYXRMRSAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgcmV0dXJuIHdyaXRlRmxvYXQodGhpcywgdmFsdWUsIG9mZnNldCwgdHJ1ZSwgbm9Bc3NlcnQpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVGbG9hdEJFID0gZnVuY3Rpb24gd3JpdGVGbG9hdEJFICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICByZXR1cm4gd3JpdGVGbG9hdCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCBmYWxzZSwgbm9Bc3NlcnQpXG59XG5cbmZ1bmN0aW9uIHdyaXRlRG91YmxlIChidWYsIHZhbHVlLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIGNoZWNrSUVFRTc1NChidWYsIHZhbHVlLCBvZmZzZXQsIDgsIDEuNzk3NjkzMTM0ODYyMzE1N0UrMzA4LCAtMS43OTc2OTMxMzQ4NjIzMTU3RSszMDgpXG4gIH1cbiAgaWVlZTc1NC53cml0ZShidWYsIHZhbHVlLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgNTIsIDgpXG4gIHJldHVybiBvZmZzZXQgKyA4XG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVEb3VibGVMRSA9IGZ1bmN0aW9uIHdyaXRlRG91YmxlTEUgKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHJldHVybiB3cml0ZURvdWJsZSh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCB0cnVlLCBub0Fzc2VydClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZURvdWJsZUJFID0gZnVuY3Rpb24gd3JpdGVEb3VibGVCRSAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgcmV0dXJuIHdyaXRlRG91YmxlKHRoaXMsIHZhbHVlLCBvZmZzZXQsIGZhbHNlLCBub0Fzc2VydClcbn1cblxuLy8gY29weSh0YXJnZXRCdWZmZXIsIHRhcmdldFN0YXJ0PTAsIHNvdXJjZVN0YXJ0PTAsIHNvdXJjZUVuZD1idWZmZXIubGVuZ3RoKVxuQnVmZmVyLnByb3RvdHlwZS5jb3B5ID0gZnVuY3Rpb24gY29weSAodGFyZ2V0LCB0YXJnZXRTdGFydCwgc3RhcnQsIGVuZCkge1xuICBpZiAoIXN0YXJ0KSBzdGFydCA9IDBcbiAgaWYgKCFlbmQgJiYgZW5kICE9PSAwKSBlbmQgPSB0aGlzLmxlbmd0aFxuICBpZiAodGFyZ2V0U3RhcnQgPj0gdGFyZ2V0Lmxlbmd0aCkgdGFyZ2V0U3RhcnQgPSB0YXJnZXQubGVuZ3RoXG4gIGlmICghdGFyZ2V0U3RhcnQpIHRhcmdldFN0YXJ0ID0gMFxuICBpZiAoZW5kID4gMCAmJiBlbmQgPCBzdGFydCkgZW5kID0gc3RhcnRcblxuICAvLyBDb3B5IDAgYnl0ZXM7IHdlJ3JlIGRvbmVcbiAgaWYgKGVuZCA9PT0gc3RhcnQpIHJldHVybiAwXG4gIGlmICh0YXJnZXQubGVuZ3RoID09PSAwIHx8IHRoaXMubGVuZ3RoID09PSAwKSByZXR1cm4gMFxuXG4gIC8vIEZhdGFsIGVycm9yIGNvbmRpdGlvbnNcbiAgaWYgKHRhcmdldFN0YXJ0IDwgMCkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCd0YXJnZXRTdGFydCBvdXQgb2YgYm91bmRzJylcbiAgfVxuICBpZiAoc3RhcnQgPCAwIHx8IHN0YXJ0ID49IHRoaXMubGVuZ3RoKSB0aHJvdyBuZXcgUmFuZ2VFcnJvcignc291cmNlU3RhcnQgb3V0IG9mIGJvdW5kcycpXG4gIGlmIChlbmQgPCAwKSB0aHJvdyBuZXcgUmFuZ2VFcnJvcignc291cmNlRW5kIG91dCBvZiBib3VuZHMnKVxuXG4gIC8vIEFyZSB3ZSBvb2I/XG4gIGlmIChlbmQgPiB0aGlzLmxlbmd0aCkgZW5kID0gdGhpcy5sZW5ndGhcbiAgaWYgKHRhcmdldC5sZW5ndGggLSB0YXJnZXRTdGFydCA8IGVuZCAtIHN0YXJ0KSB7XG4gICAgZW5kID0gdGFyZ2V0Lmxlbmd0aCAtIHRhcmdldFN0YXJ0ICsgc3RhcnRcbiAgfVxuXG4gIHZhciBsZW4gPSBlbmQgLSBzdGFydFxuICB2YXIgaVxuXG4gIGlmICh0aGlzID09PSB0YXJnZXQgJiYgc3RhcnQgPCB0YXJnZXRTdGFydCAmJiB0YXJnZXRTdGFydCA8IGVuZCkge1xuICAgIC8vIGRlc2NlbmRpbmcgY29weSBmcm9tIGVuZFxuICAgIGZvciAoaSA9IGxlbiAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICB0YXJnZXRbaSArIHRhcmdldFN0YXJ0XSA9IHRoaXNbaSArIHN0YXJ0XVxuICAgIH1cbiAgfSBlbHNlIGlmIChsZW4gPCAxMDAwIHx8ICFCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCkge1xuICAgIC8vIGFzY2VuZGluZyBjb3B5IGZyb20gc3RhcnRcbiAgICBmb3IgKGkgPSAwOyBpIDwgbGVuOyArK2kpIHtcbiAgICAgIHRhcmdldFtpICsgdGFyZ2V0U3RhcnRdID0gdGhpc1tpICsgc3RhcnRdXG4gICAgfVxuICB9IGVsc2Uge1xuICAgIFVpbnQ4QXJyYXkucHJvdG90eXBlLnNldC5jYWxsKFxuICAgICAgdGFyZ2V0LFxuICAgICAgdGhpcy5zdWJhcnJheShzdGFydCwgc3RhcnQgKyBsZW4pLFxuICAgICAgdGFyZ2V0U3RhcnRcbiAgICApXG4gIH1cblxuICByZXR1cm4gbGVuXG59XG5cbi8vIFVzYWdlOlxuLy8gICAgYnVmZmVyLmZpbGwobnVtYmVyWywgb2Zmc2V0WywgZW5kXV0pXG4vLyAgICBidWZmZXIuZmlsbChidWZmZXJbLCBvZmZzZXRbLCBlbmRdXSlcbi8vICAgIGJ1ZmZlci5maWxsKHN0cmluZ1ssIG9mZnNldFssIGVuZF1dWywgZW5jb2RpbmddKVxuQnVmZmVyLnByb3RvdHlwZS5maWxsID0gZnVuY3Rpb24gZmlsbCAodmFsLCBzdGFydCwgZW5kLCBlbmNvZGluZykge1xuICAvLyBIYW5kbGUgc3RyaW5nIGNhc2VzOlxuICBpZiAodHlwZW9mIHZhbCA9PT0gJ3N0cmluZycpIHtcbiAgICBpZiAodHlwZW9mIHN0YXJ0ID09PSAnc3RyaW5nJykge1xuICAgICAgZW5jb2RpbmcgPSBzdGFydFxuICAgICAgc3RhcnQgPSAwXG4gICAgICBlbmQgPSB0aGlzLmxlbmd0aFxuICAgIH0gZWxzZSBpZiAodHlwZW9mIGVuZCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGVuY29kaW5nID0gZW5kXG4gICAgICBlbmQgPSB0aGlzLmxlbmd0aFxuICAgIH1cbiAgICBpZiAodmFsLmxlbmd0aCA9PT0gMSkge1xuICAgICAgdmFyIGNvZGUgPSB2YWwuY2hhckNvZGVBdCgwKVxuICAgICAgaWYgKGNvZGUgPCAyNTYpIHtcbiAgICAgICAgdmFsID0gY29kZVxuICAgICAgfVxuICAgIH1cbiAgICBpZiAoZW5jb2RpbmcgIT09IHVuZGVmaW5lZCAmJiB0eXBlb2YgZW5jb2RpbmcgIT09ICdzdHJpbmcnKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdlbmNvZGluZyBtdXN0IGJlIGEgc3RyaW5nJylcbiAgICB9XG4gICAgaWYgKHR5cGVvZiBlbmNvZGluZyA9PT0gJ3N0cmluZycgJiYgIUJ1ZmZlci5pc0VuY29kaW5nKGVuY29kaW5nKSkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVW5rbm93biBlbmNvZGluZzogJyArIGVuY29kaW5nKVxuICAgIH1cbiAgfSBlbHNlIGlmICh0eXBlb2YgdmFsID09PSAnbnVtYmVyJykge1xuICAgIHZhbCA9IHZhbCAmIDI1NVxuICB9XG5cbiAgLy8gSW52YWxpZCByYW5nZXMgYXJlIG5vdCBzZXQgdG8gYSBkZWZhdWx0LCBzbyBjYW4gcmFuZ2UgY2hlY2sgZWFybHkuXG4gIGlmIChzdGFydCA8IDAgfHwgdGhpcy5sZW5ndGggPCBzdGFydCB8fCB0aGlzLmxlbmd0aCA8IGVuZCkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdPdXQgb2YgcmFuZ2UgaW5kZXgnKVxuICB9XG5cbiAgaWYgKGVuZCA8PSBzdGFydCkge1xuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICBzdGFydCA9IHN0YXJ0ID4+PiAwXG4gIGVuZCA9IGVuZCA9PT0gdW5kZWZpbmVkID8gdGhpcy5sZW5ndGggOiBlbmQgPj4+IDBcblxuICBpZiAoIXZhbCkgdmFsID0gMFxuXG4gIHZhciBpXG4gIGlmICh0eXBlb2YgdmFsID09PSAnbnVtYmVyJykge1xuICAgIGZvciAoaSA9IHN0YXJ0OyBpIDwgZW5kOyArK2kpIHtcbiAgICAgIHRoaXNbaV0gPSB2YWxcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgdmFyIGJ5dGVzID0gQnVmZmVyLmlzQnVmZmVyKHZhbClcbiAgICAgID8gdmFsXG4gICAgICA6IHV0ZjhUb0J5dGVzKG5ldyBCdWZmZXIodmFsLCBlbmNvZGluZykudG9TdHJpbmcoKSlcbiAgICB2YXIgbGVuID0gYnl0ZXMubGVuZ3RoXG4gICAgZm9yIChpID0gMDsgaSA8IGVuZCAtIHN0YXJ0OyArK2kpIHtcbiAgICAgIHRoaXNbaSArIHN0YXJ0XSA9IGJ5dGVzW2kgJSBsZW5dXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRoaXNcbn1cblxuLy8gSEVMUEVSIEZVTkNUSU9OU1xuLy8gPT09PT09PT09PT09PT09PVxuXG52YXIgSU5WQUxJRF9CQVNFNjRfUkUgPSAvW14rXFwvMC05QS1aYS16LV9dL2dcblxuZnVuY3Rpb24gYmFzZTY0Y2xlYW4gKHN0cikge1xuICAvLyBOb2RlIHN0cmlwcyBvdXQgaW52YWxpZCBjaGFyYWN0ZXJzIGxpa2UgXFxuIGFuZCBcXHQgZnJvbSB0aGUgc3RyaW5nLCBiYXNlNjQtanMgZG9lcyBub3RcbiAgc3RyID0gc3RyaW5ndHJpbShzdHIpLnJlcGxhY2UoSU5WQUxJRF9CQVNFNjRfUkUsICcnKVxuICAvLyBOb2RlIGNvbnZlcnRzIHN0cmluZ3Mgd2l0aCBsZW5ndGggPCAyIHRvICcnXG4gIGlmIChzdHIubGVuZ3RoIDwgMikgcmV0dXJuICcnXG4gIC8vIE5vZGUgYWxsb3dzIGZvciBub24tcGFkZGVkIGJhc2U2NCBzdHJpbmdzIChtaXNzaW5nIHRyYWlsaW5nID09PSksIGJhc2U2NC1qcyBkb2VzIG5vdFxuICB3aGlsZSAoc3RyLmxlbmd0aCAlIDQgIT09IDApIHtcbiAgICBzdHIgPSBzdHIgKyAnPSdcbiAgfVxuICByZXR1cm4gc3RyXG59XG5cbmZ1bmN0aW9uIHN0cmluZ3RyaW0gKHN0cikge1xuICBpZiAoc3RyLnRyaW0pIHJldHVybiBzdHIudHJpbSgpXG4gIHJldHVybiBzdHIucmVwbGFjZSgvXlxccyt8XFxzKyQvZywgJycpXG59XG5cbmZ1bmN0aW9uIHRvSGV4IChuKSB7XG4gIGlmIChuIDwgMTYpIHJldHVybiAnMCcgKyBuLnRvU3RyaW5nKDE2KVxuICByZXR1cm4gbi50b1N0cmluZygxNilcbn1cblxuZnVuY3Rpb24gdXRmOFRvQnl0ZXMgKHN0cmluZywgdW5pdHMpIHtcbiAgdW5pdHMgPSB1bml0cyB8fCBJbmZpbml0eVxuICB2YXIgY29kZVBvaW50XG4gIHZhciBsZW5ndGggPSBzdHJpbmcubGVuZ3RoXG4gIHZhciBsZWFkU3Vycm9nYXRlID0gbnVsbFxuICB2YXIgYnl0ZXMgPSBbXVxuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyArK2kpIHtcbiAgICBjb2RlUG9pbnQgPSBzdHJpbmcuY2hhckNvZGVBdChpKVxuXG4gICAgLy8gaXMgc3Vycm9nYXRlIGNvbXBvbmVudFxuICAgIGlmIChjb2RlUG9pbnQgPiAweEQ3RkYgJiYgY29kZVBvaW50IDwgMHhFMDAwKSB7XG4gICAgICAvLyBsYXN0IGNoYXIgd2FzIGEgbGVhZFxuICAgICAgaWYgKCFsZWFkU3Vycm9nYXRlKSB7XG4gICAgICAgIC8vIG5vIGxlYWQgeWV0XG4gICAgICAgIGlmIChjb2RlUG9pbnQgPiAweERCRkYpIHtcbiAgICAgICAgICAvLyB1bmV4cGVjdGVkIHRyYWlsXG4gICAgICAgICAgaWYgKCh1bml0cyAtPSAzKSA+IC0xKSBieXRlcy5wdXNoKDB4RUYsIDB4QkYsIDB4QkQpXG4gICAgICAgICAgY29udGludWVcbiAgICAgICAgfSBlbHNlIGlmIChpICsgMSA9PT0gbGVuZ3RoKSB7XG4gICAgICAgICAgLy8gdW5wYWlyZWQgbGVhZFxuICAgICAgICAgIGlmICgodW5pdHMgLT0gMykgPiAtMSkgYnl0ZXMucHVzaCgweEVGLCAweEJGLCAweEJEKVxuICAgICAgICAgIGNvbnRpbnVlXG4gICAgICAgIH1cblxuICAgICAgICAvLyB2YWxpZCBsZWFkXG4gICAgICAgIGxlYWRTdXJyb2dhdGUgPSBjb2RlUG9pbnRcblxuICAgICAgICBjb250aW51ZVxuICAgICAgfVxuXG4gICAgICAvLyAyIGxlYWRzIGluIGEgcm93XG4gICAgICBpZiAoY29kZVBvaW50IDwgMHhEQzAwKSB7XG4gICAgICAgIGlmICgodW5pdHMgLT0gMykgPiAtMSkgYnl0ZXMucHVzaCgweEVGLCAweEJGLCAweEJEKVxuICAgICAgICBsZWFkU3Vycm9nYXRlID0gY29kZVBvaW50XG4gICAgICAgIGNvbnRpbnVlXG4gICAgICB9XG5cbiAgICAgIC8vIHZhbGlkIHN1cnJvZ2F0ZSBwYWlyXG4gICAgICBjb2RlUG9pbnQgPSAobGVhZFN1cnJvZ2F0ZSAtIDB4RDgwMCA8PCAxMCB8IGNvZGVQb2ludCAtIDB4REMwMCkgKyAweDEwMDAwXG4gICAgfSBlbHNlIGlmIChsZWFkU3Vycm9nYXRlKSB7XG4gICAgICAvLyB2YWxpZCBibXAgY2hhciwgYnV0IGxhc3QgY2hhciB3YXMgYSBsZWFkXG4gICAgICBpZiAoKHVuaXRzIC09IDMpID4gLTEpIGJ5dGVzLnB1c2goMHhFRiwgMHhCRiwgMHhCRClcbiAgICB9XG5cbiAgICBsZWFkU3Vycm9nYXRlID0gbnVsbFxuXG4gICAgLy8gZW5jb2RlIHV0ZjhcbiAgICBpZiAoY29kZVBvaW50IDwgMHg4MCkge1xuICAgICAgaWYgKCh1bml0cyAtPSAxKSA8IDApIGJyZWFrXG4gICAgICBieXRlcy5wdXNoKGNvZGVQb2ludClcbiAgICB9IGVsc2UgaWYgKGNvZGVQb2ludCA8IDB4ODAwKSB7XG4gICAgICBpZiAoKHVuaXRzIC09IDIpIDwgMCkgYnJlYWtcbiAgICAgIGJ5dGVzLnB1c2goXG4gICAgICAgIGNvZGVQb2ludCA+PiAweDYgfCAweEMwLFxuICAgICAgICBjb2RlUG9pbnQgJiAweDNGIHwgMHg4MFxuICAgICAgKVxuICAgIH0gZWxzZSBpZiAoY29kZVBvaW50IDwgMHgxMDAwMCkge1xuICAgICAgaWYgKCh1bml0cyAtPSAzKSA8IDApIGJyZWFrXG4gICAgICBieXRlcy5wdXNoKFxuICAgICAgICBjb2RlUG9pbnQgPj4gMHhDIHwgMHhFMCxcbiAgICAgICAgY29kZVBvaW50ID4+IDB4NiAmIDB4M0YgfCAweDgwLFxuICAgICAgICBjb2RlUG9pbnQgJiAweDNGIHwgMHg4MFxuICAgICAgKVxuICAgIH0gZWxzZSBpZiAoY29kZVBvaW50IDwgMHgxMTAwMDApIHtcbiAgICAgIGlmICgodW5pdHMgLT0gNCkgPCAwKSBicmVha1xuICAgICAgYnl0ZXMucHVzaChcbiAgICAgICAgY29kZVBvaW50ID4+IDB4MTIgfCAweEYwLFxuICAgICAgICBjb2RlUG9pbnQgPj4gMHhDICYgMHgzRiB8IDB4ODAsXG4gICAgICAgIGNvZGVQb2ludCA+PiAweDYgJiAweDNGIHwgMHg4MCxcbiAgICAgICAgY29kZVBvaW50ICYgMHgzRiB8IDB4ODBcbiAgICAgIClcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIGNvZGUgcG9pbnQnKVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBieXRlc1xufVxuXG5mdW5jdGlvbiBhc2NpaVRvQnl0ZXMgKHN0cikge1xuICB2YXIgYnl0ZUFycmF5ID0gW11cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHIubGVuZ3RoOyArK2kpIHtcbiAgICAvLyBOb2RlJ3MgY29kZSBzZWVtcyB0byBiZSBkb2luZyB0aGlzIGFuZCBub3QgJiAweDdGLi5cbiAgICBieXRlQXJyYXkucHVzaChzdHIuY2hhckNvZGVBdChpKSAmIDB4RkYpXG4gIH1cbiAgcmV0dXJuIGJ5dGVBcnJheVxufVxuXG5mdW5jdGlvbiB1dGYxNmxlVG9CeXRlcyAoc3RyLCB1bml0cykge1xuICB2YXIgYywgaGksIGxvXG4gIHZhciBieXRlQXJyYXkgPSBbXVxuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0ci5sZW5ndGg7ICsraSkge1xuICAgIGlmICgodW5pdHMgLT0gMikgPCAwKSBicmVha1xuXG4gICAgYyA9IHN0ci5jaGFyQ29kZUF0KGkpXG4gICAgaGkgPSBjID4+IDhcbiAgICBsbyA9IGMgJSAyNTZcbiAgICBieXRlQXJyYXkucHVzaChsbylcbiAgICBieXRlQXJyYXkucHVzaChoaSlcbiAgfVxuXG4gIHJldHVybiBieXRlQXJyYXlcbn1cblxuZnVuY3Rpb24gYmFzZTY0VG9CeXRlcyAoc3RyKSB7XG4gIHJldHVybiBiYXNlNjQudG9CeXRlQXJyYXkoYmFzZTY0Y2xlYW4oc3RyKSlcbn1cblxuZnVuY3Rpb24gYmxpdEJ1ZmZlciAoc3JjLCBkc3QsIG9mZnNldCwgbGVuZ3RoKSB7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyArK2kpIHtcbiAgICBpZiAoKGkgKyBvZmZzZXQgPj0gZHN0Lmxlbmd0aCkgfHwgKGkgPj0gc3JjLmxlbmd0aCkpIGJyZWFrXG4gICAgZHN0W2kgKyBvZmZzZXRdID0gc3JjW2ldXG4gIH1cbiAgcmV0dXJuIGlcbn1cblxuZnVuY3Rpb24gaXNuYW4gKHZhbCkge1xuICByZXR1cm4gdmFsICE9PSB2YWwgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1zZWxmLWNvbXBhcmVcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vICh3ZWJwYWNrKS9ub2RlX21vZHVsZXMvYnVmZmVyL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSA0OVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCdcblxuZXhwb3J0cy5ieXRlTGVuZ3RoID0gYnl0ZUxlbmd0aFxuZXhwb3J0cy50b0J5dGVBcnJheSA9IHRvQnl0ZUFycmF5XG5leHBvcnRzLmZyb21CeXRlQXJyYXkgPSBmcm9tQnl0ZUFycmF5XG5cbnZhciBsb29rdXAgPSBbXVxudmFyIHJldkxvb2t1cCA9IFtdXG52YXIgQXJyID0gdHlwZW9mIFVpbnQ4QXJyYXkgIT09ICd1bmRlZmluZWQnID8gVWludDhBcnJheSA6IEFycmF5XG5cbnZhciBjb2RlID0gJ0FCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXowMTIzNDU2Nzg5Ky8nXG5mb3IgKHZhciBpID0gMCwgbGVuID0gY29kZS5sZW5ndGg7IGkgPCBsZW47ICsraSkge1xuICBsb29rdXBbaV0gPSBjb2RlW2ldXG4gIHJldkxvb2t1cFtjb2RlLmNoYXJDb2RlQXQoaSldID0gaVxufVxuXG4vLyBTdXBwb3J0IGRlY29kaW5nIFVSTC1zYWZlIGJhc2U2NCBzdHJpbmdzLCBhcyBOb2RlLmpzIGRvZXMuXG4vLyBTZWU6IGh0dHBzOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0Jhc2U2NCNVUkxfYXBwbGljYXRpb25zXG5yZXZMb29rdXBbJy0nLmNoYXJDb2RlQXQoMCldID0gNjJcbnJldkxvb2t1cFsnXycuY2hhckNvZGVBdCgwKV0gPSA2M1xuXG5mdW5jdGlvbiBnZXRMZW5zIChiNjQpIHtcbiAgdmFyIGxlbiA9IGI2NC5sZW5ndGhcblxuICBpZiAobGVuICUgNCA+IDApIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgc3RyaW5nLiBMZW5ndGggbXVzdCBiZSBhIG11bHRpcGxlIG9mIDQnKVxuICB9XG5cbiAgLy8gVHJpbSBvZmYgZXh0cmEgYnl0ZXMgYWZ0ZXIgcGxhY2Vob2xkZXIgYnl0ZXMgYXJlIGZvdW5kXG4gIC8vIFNlZTogaHR0cHM6Ly9naXRodWIuY29tL2JlYXRnYW1taXQvYmFzZTY0LWpzL2lzc3Vlcy80MlxuICB2YXIgdmFsaWRMZW4gPSBiNjQuaW5kZXhPZignPScpXG4gIGlmICh2YWxpZExlbiA9PT0gLTEpIHZhbGlkTGVuID0gbGVuXG5cbiAgdmFyIHBsYWNlSG9sZGVyc0xlbiA9IHZhbGlkTGVuID09PSBsZW5cbiAgICA/IDBcbiAgICA6IDQgLSAodmFsaWRMZW4gJSA0KVxuXG4gIHJldHVybiBbdmFsaWRMZW4sIHBsYWNlSG9sZGVyc0xlbl1cbn1cblxuLy8gYmFzZTY0IGlzIDQvMyArIHVwIHRvIHR3byBjaGFyYWN0ZXJzIG9mIHRoZSBvcmlnaW5hbCBkYXRhXG5mdW5jdGlvbiBieXRlTGVuZ3RoIChiNjQpIHtcbiAgdmFyIGxlbnMgPSBnZXRMZW5zKGI2NClcbiAgdmFyIHZhbGlkTGVuID0gbGVuc1swXVxuICB2YXIgcGxhY2VIb2xkZXJzTGVuID0gbGVuc1sxXVxuICByZXR1cm4gKCh2YWxpZExlbiArIHBsYWNlSG9sZGVyc0xlbikgKiAzIC8gNCkgLSBwbGFjZUhvbGRlcnNMZW5cbn1cblxuZnVuY3Rpb24gX2J5dGVMZW5ndGggKGI2NCwgdmFsaWRMZW4sIHBsYWNlSG9sZGVyc0xlbikge1xuICByZXR1cm4gKCh2YWxpZExlbiArIHBsYWNlSG9sZGVyc0xlbikgKiAzIC8gNCkgLSBwbGFjZUhvbGRlcnNMZW5cbn1cblxuZnVuY3Rpb24gdG9CeXRlQXJyYXkgKGI2NCkge1xuICB2YXIgdG1wXG4gIHZhciBsZW5zID0gZ2V0TGVucyhiNjQpXG4gIHZhciB2YWxpZExlbiA9IGxlbnNbMF1cbiAgdmFyIHBsYWNlSG9sZGVyc0xlbiA9IGxlbnNbMV1cblxuICB2YXIgYXJyID0gbmV3IEFycihfYnl0ZUxlbmd0aChiNjQsIHZhbGlkTGVuLCBwbGFjZUhvbGRlcnNMZW4pKVxuXG4gIHZhciBjdXJCeXRlID0gMFxuXG4gIC8vIGlmIHRoZXJlIGFyZSBwbGFjZWhvbGRlcnMsIG9ubHkgZ2V0IHVwIHRvIHRoZSBsYXN0IGNvbXBsZXRlIDQgY2hhcnNcbiAgdmFyIGxlbiA9IHBsYWNlSG9sZGVyc0xlbiA+IDBcbiAgICA/IHZhbGlkTGVuIC0gNFxuICAgIDogdmFsaWRMZW5cblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgaSArPSA0KSB7XG4gICAgdG1wID1cbiAgICAgIChyZXZMb29rdXBbYjY0LmNoYXJDb2RlQXQoaSldIDw8IDE4KSB8XG4gICAgICAocmV2TG9va3VwW2I2NC5jaGFyQ29kZUF0KGkgKyAxKV0gPDwgMTIpIHxcbiAgICAgIChyZXZMb29rdXBbYjY0LmNoYXJDb2RlQXQoaSArIDIpXSA8PCA2KSB8XG4gICAgICByZXZMb29rdXBbYjY0LmNoYXJDb2RlQXQoaSArIDMpXVxuICAgIGFycltjdXJCeXRlKytdID0gKHRtcCA+PiAxNikgJiAweEZGXG4gICAgYXJyW2N1ckJ5dGUrK10gPSAodG1wID4+IDgpICYgMHhGRlxuICAgIGFycltjdXJCeXRlKytdID0gdG1wICYgMHhGRlxuICB9XG5cbiAgaWYgKHBsYWNlSG9sZGVyc0xlbiA9PT0gMikge1xuICAgIHRtcCA9XG4gICAgICAocmV2TG9va3VwW2I2NC5jaGFyQ29kZUF0KGkpXSA8PCAyKSB8XG4gICAgICAocmV2TG9va3VwW2I2NC5jaGFyQ29kZUF0KGkgKyAxKV0gPj4gNClcbiAgICBhcnJbY3VyQnl0ZSsrXSA9IHRtcCAmIDB4RkZcbiAgfVxuXG4gIGlmIChwbGFjZUhvbGRlcnNMZW4gPT09IDEpIHtcbiAgICB0bXAgPVxuICAgICAgKHJldkxvb2t1cFtiNjQuY2hhckNvZGVBdChpKV0gPDwgMTApIHxcbiAgICAgIChyZXZMb29rdXBbYjY0LmNoYXJDb2RlQXQoaSArIDEpXSA8PCA0KSB8XG4gICAgICAocmV2TG9va3VwW2I2NC5jaGFyQ29kZUF0KGkgKyAyKV0gPj4gMilcbiAgICBhcnJbY3VyQnl0ZSsrXSA9ICh0bXAgPj4gOCkgJiAweEZGXG4gICAgYXJyW2N1ckJ5dGUrK10gPSB0bXAgJiAweEZGXG4gIH1cblxuICByZXR1cm4gYXJyXG59XG5cbmZ1bmN0aW9uIHRyaXBsZXRUb0Jhc2U2NCAobnVtKSB7XG4gIHJldHVybiBsb29rdXBbbnVtID4+IDE4ICYgMHgzRl0gK1xuICAgIGxvb2t1cFtudW0gPj4gMTIgJiAweDNGXSArXG4gICAgbG9va3VwW251bSA+PiA2ICYgMHgzRl0gK1xuICAgIGxvb2t1cFtudW0gJiAweDNGXVxufVxuXG5mdW5jdGlvbiBlbmNvZGVDaHVuayAodWludDgsIHN0YXJ0LCBlbmQpIHtcbiAgdmFyIHRtcFxuICB2YXIgb3V0cHV0ID0gW11cbiAgZm9yICh2YXIgaSA9IHN0YXJ0OyBpIDwgZW5kOyBpICs9IDMpIHtcbiAgICB0bXAgPVxuICAgICAgKCh1aW50OFtpXSA8PCAxNikgJiAweEZGMDAwMCkgK1xuICAgICAgKCh1aW50OFtpICsgMV0gPDwgOCkgJiAweEZGMDApICtcbiAgICAgICh1aW50OFtpICsgMl0gJiAweEZGKVxuICAgIG91dHB1dC5wdXNoKHRyaXBsZXRUb0Jhc2U2NCh0bXApKVxuICB9XG4gIHJldHVybiBvdXRwdXQuam9pbignJylcbn1cblxuZnVuY3Rpb24gZnJvbUJ5dGVBcnJheSAodWludDgpIHtcbiAgdmFyIHRtcFxuICB2YXIgbGVuID0gdWludDgubGVuZ3RoXG4gIHZhciBleHRyYUJ5dGVzID0gbGVuICUgMyAvLyBpZiB3ZSBoYXZlIDEgYnl0ZSBsZWZ0LCBwYWQgMiBieXRlc1xuICB2YXIgcGFydHMgPSBbXVxuICB2YXIgbWF4Q2h1bmtMZW5ndGggPSAxNjM4MyAvLyBtdXN0IGJlIG11bHRpcGxlIG9mIDNcblxuICAvLyBnbyB0aHJvdWdoIHRoZSBhcnJheSBldmVyeSB0aHJlZSBieXRlcywgd2UnbGwgZGVhbCB3aXRoIHRyYWlsaW5nIHN0dWZmIGxhdGVyXG4gIGZvciAodmFyIGkgPSAwLCBsZW4yID0gbGVuIC0gZXh0cmFCeXRlczsgaSA8IGxlbjI7IGkgKz0gbWF4Q2h1bmtMZW5ndGgpIHtcbiAgICBwYXJ0cy5wdXNoKGVuY29kZUNodW5rKFxuICAgICAgdWludDgsIGksIChpICsgbWF4Q2h1bmtMZW5ndGgpID4gbGVuMiA/IGxlbjIgOiAoaSArIG1heENodW5rTGVuZ3RoKVxuICAgICkpXG4gIH1cblxuICAvLyBwYWQgdGhlIGVuZCB3aXRoIHplcm9zLCBidXQgbWFrZSBzdXJlIHRvIG5vdCBmb3JnZXQgdGhlIGV4dHJhIGJ5dGVzXG4gIGlmIChleHRyYUJ5dGVzID09PSAxKSB7XG4gICAgdG1wID0gdWludDhbbGVuIC0gMV1cbiAgICBwYXJ0cy5wdXNoKFxuICAgICAgbG9va3VwW3RtcCA+PiAyXSArXG4gICAgICBsb29rdXBbKHRtcCA8PCA0KSAmIDB4M0ZdICtcbiAgICAgICc9PSdcbiAgICApXG4gIH0gZWxzZSBpZiAoZXh0cmFCeXRlcyA9PT0gMikge1xuICAgIHRtcCA9ICh1aW50OFtsZW4gLSAyXSA8PCA4KSArIHVpbnQ4W2xlbiAtIDFdXG4gICAgcGFydHMucHVzaChcbiAgICAgIGxvb2t1cFt0bXAgPj4gMTBdICtcbiAgICAgIGxvb2t1cFsodG1wID4+IDQpICYgMHgzRl0gK1xuICAgICAgbG9va3VwWyh0bXAgPDwgMikgJiAweDNGXSArXG4gICAgICAnPSdcbiAgICApXG4gIH1cblxuICByZXR1cm4gcGFydHMuam9pbignJylcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vICh3ZWJwYWNrKS9ub2RlX21vZHVsZXMvYmFzZTY0LWpzL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSA1MFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJleHBvcnRzLnJlYWQgPSBmdW5jdGlvbiAoYnVmZmVyLCBvZmZzZXQsIGlzTEUsIG1MZW4sIG5CeXRlcykge1xuICB2YXIgZSwgbVxuICB2YXIgZUxlbiA9IChuQnl0ZXMgKiA4KSAtIG1MZW4gLSAxXG4gIHZhciBlTWF4ID0gKDEgPDwgZUxlbikgLSAxXG4gIHZhciBlQmlhcyA9IGVNYXggPj4gMVxuICB2YXIgbkJpdHMgPSAtN1xuICB2YXIgaSA9IGlzTEUgPyAobkJ5dGVzIC0gMSkgOiAwXG4gIHZhciBkID0gaXNMRSA/IC0xIDogMVxuICB2YXIgcyA9IGJ1ZmZlcltvZmZzZXQgKyBpXVxuXG4gIGkgKz0gZFxuXG4gIGUgPSBzICYgKCgxIDw8ICgtbkJpdHMpKSAtIDEpXG4gIHMgPj49ICgtbkJpdHMpXG4gIG5CaXRzICs9IGVMZW5cbiAgZm9yICg7IG5CaXRzID4gMDsgZSA9IChlICogMjU2KSArIGJ1ZmZlcltvZmZzZXQgKyBpXSwgaSArPSBkLCBuQml0cyAtPSA4KSB7fVxuXG4gIG0gPSBlICYgKCgxIDw8ICgtbkJpdHMpKSAtIDEpXG4gIGUgPj49ICgtbkJpdHMpXG4gIG5CaXRzICs9IG1MZW5cbiAgZm9yICg7IG5CaXRzID4gMDsgbSA9IChtICogMjU2KSArIGJ1ZmZlcltvZmZzZXQgKyBpXSwgaSArPSBkLCBuQml0cyAtPSA4KSB7fVxuXG4gIGlmIChlID09PSAwKSB7XG4gICAgZSA9IDEgLSBlQmlhc1xuICB9IGVsc2UgaWYgKGUgPT09IGVNYXgpIHtcbiAgICByZXR1cm4gbSA/IE5hTiA6ICgocyA/IC0xIDogMSkgKiBJbmZpbml0eSlcbiAgfSBlbHNlIHtcbiAgICBtID0gbSArIE1hdGgucG93KDIsIG1MZW4pXG4gICAgZSA9IGUgLSBlQmlhc1xuICB9XG4gIHJldHVybiAocyA/IC0xIDogMSkgKiBtICogTWF0aC5wb3coMiwgZSAtIG1MZW4pXG59XG5cbmV4cG9ydHMud3JpdGUgPSBmdW5jdGlvbiAoYnVmZmVyLCB2YWx1ZSwgb2Zmc2V0LCBpc0xFLCBtTGVuLCBuQnl0ZXMpIHtcbiAgdmFyIGUsIG0sIGNcbiAgdmFyIGVMZW4gPSAobkJ5dGVzICogOCkgLSBtTGVuIC0gMVxuICB2YXIgZU1heCA9ICgxIDw8IGVMZW4pIC0gMVxuICB2YXIgZUJpYXMgPSBlTWF4ID4+IDFcbiAgdmFyIHJ0ID0gKG1MZW4gPT09IDIzID8gTWF0aC5wb3coMiwgLTI0KSAtIE1hdGgucG93KDIsIC03NykgOiAwKVxuICB2YXIgaSA9IGlzTEUgPyAwIDogKG5CeXRlcyAtIDEpXG4gIHZhciBkID0gaXNMRSA/IDEgOiAtMVxuICB2YXIgcyA9IHZhbHVlIDwgMCB8fCAodmFsdWUgPT09IDAgJiYgMSAvIHZhbHVlIDwgMCkgPyAxIDogMFxuXG4gIHZhbHVlID0gTWF0aC5hYnModmFsdWUpXG5cbiAgaWYgKGlzTmFOKHZhbHVlKSB8fCB2YWx1ZSA9PT0gSW5maW5pdHkpIHtcbiAgICBtID0gaXNOYU4odmFsdWUpID8gMSA6IDBcbiAgICBlID0gZU1heFxuICB9IGVsc2Uge1xuICAgIGUgPSBNYXRoLmZsb29yKE1hdGgubG9nKHZhbHVlKSAvIE1hdGguTE4yKVxuICAgIGlmICh2YWx1ZSAqIChjID0gTWF0aC5wb3coMiwgLWUpKSA8IDEpIHtcbiAgICAgIGUtLVxuICAgICAgYyAqPSAyXG4gICAgfVxuICAgIGlmIChlICsgZUJpYXMgPj0gMSkge1xuICAgICAgdmFsdWUgKz0gcnQgLyBjXG4gICAgfSBlbHNlIHtcbiAgICAgIHZhbHVlICs9IHJ0ICogTWF0aC5wb3coMiwgMSAtIGVCaWFzKVxuICAgIH1cbiAgICBpZiAodmFsdWUgKiBjID49IDIpIHtcbiAgICAgIGUrK1xuICAgICAgYyAvPSAyXG4gICAgfVxuXG4gICAgaWYgKGUgKyBlQmlhcyA+PSBlTWF4KSB7XG4gICAgICBtID0gMFxuICAgICAgZSA9IGVNYXhcbiAgICB9IGVsc2UgaWYgKGUgKyBlQmlhcyA+PSAxKSB7XG4gICAgICBtID0gKCh2YWx1ZSAqIGMpIC0gMSkgKiBNYXRoLnBvdygyLCBtTGVuKVxuICAgICAgZSA9IGUgKyBlQmlhc1xuICAgIH0gZWxzZSB7XG4gICAgICBtID0gdmFsdWUgKiBNYXRoLnBvdygyLCBlQmlhcyAtIDEpICogTWF0aC5wb3coMiwgbUxlbilcbiAgICAgIGUgPSAwXG4gICAgfVxuICB9XG5cbiAgZm9yICg7IG1MZW4gPj0gODsgYnVmZmVyW29mZnNldCArIGldID0gbSAmIDB4ZmYsIGkgKz0gZCwgbSAvPSAyNTYsIG1MZW4gLT0gOCkge31cblxuICBlID0gKGUgPDwgbUxlbikgfCBtXG4gIGVMZW4gKz0gbUxlblxuICBmb3IgKDsgZUxlbiA+IDA7IGJ1ZmZlcltvZmZzZXQgKyBpXSA9IGUgJiAweGZmLCBpICs9IGQsIGUgLz0gMjU2LCBlTGVuIC09IDgpIHt9XG5cbiAgYnVmZmVyW29mZnNldCArIGkgLSBkXSB8PSBzICogMTI4XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAod2VicGFjaykvbm9kZV9tb2R1bGVzL2llZWU3NTQvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDUxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciB0b1N0cmluZyA9IHt9LnRvU3RyaW5nO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEFycmF5LmlzQXJyYXkgfHwgZnVuY3Rpb24gKGFycikge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbChhcnIpID09ICdbb2JqZWN0IEFycmF5XSc7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gKHdlYnBhY2spL25vZGVfbW9kdWxlcy9pc2FycmF5L2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSA1MlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX3ZhbHVlcyA9ICh0aGlzICYmIHRoaXMuX192YWx1ZXMpIHx8IGZ1bmN0aW9uKG8pIHtcbiAgICB2YXIgcyA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBTeW1ib2wuaXRlcmF0b3IsIG0gPSBzICYmIG9bc10sIGkgPSAwO1xuICAgIGlmIChtKSByZXR1cm4gbS5jYWxsKG8pO1xuICAgIGlmIChvICYmIHR5cGVvZiBvLmxlbmd0aCA9PT0gXCJudW1iZXJcIikgcmV0dXJuIHtcbiAgICAgICAgbmV4dDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKG8gJiYgaSA+PSBvLmxlbmd0aCkgbyA9IHZvaWQgMDtcbiAgICAgICAgICAgIHJldHVybiB7IHZhbHVlOiBvICYmIG9baSsrXSwgZG9uZTogIW8gfTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihzID8gXCJPYmplY3QgaXMgbm90IGl0ZXJhYmxlLlwiIDogXCJTeW1ib2wuaXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbi8vIGh0dHA6Ly93M2MuZ2l0aHViLmlvL0luZGV4ZWREQi8jY2hlY2stdGhhdC1hLWtleS1jb3VsZC1iZS1pbmplY3RlZC1pbnRvLWEtdmFsdWVcbnZhciBjYW5JbmplY3RLZXkgPSBmdW5jdGlvbiAoa2V5UGF0aCwgdmFsdWUpIHtcbiAgICB2YXIgZV8xLCBfYTtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShrZXlQYXRoKSkge1xuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmUgbWF4LWxpbmUtbGVuZ3RoXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIlRoZSBrZXkgcGF0aHMgdXNlZCBpbiB0aGlzIHNlY3Rpb24gYXJlIGFsd2F5cyBzdHJpbmdzIGFuZCBuZXZlciBzZXF1ZW5jZXMsIHNpbmNlIGl0IGlzIG5vdCBwb3NzaWJsZSB0byBjcmVhdGUgYSBvYmplY3Qgc3RvcmUgd2hpY2ggaGFzIGEga2V5IGdlbmVyYXRvciBhbmQgYWxzbyBoYXMgYSBrZXkgcGF0aCB0aGF0IGlzIGEgc2VxdWVuY2UuXCIpO1xuICAgIH1cbiAgICB2YXIgaWRlbnRpZmllcnMgPSBrZXlQYXRoLnNwbGl0KFwiLlwiKTtcbiAgICBpZiAoaWRlbnRpZmllcnMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIkFzc2VydDogaWRlbnRpZmllcnMgaXMgbm90IGVtcHR5XCIpO1xuICAgIH1cbiAgICBpZGVudGlmaWVycy5wb3AoKTtcbiAgICB0cnkge1xuICAgICAgICBmb3IgKHZhciBpZGVudGlmaWVyc18xID0gX192YWx1ZXMoaWRlbnRpZmllcnMpLCBpZGVudGlmaWVyc18xXzEgPSBpZGVudGlmaWVyc18xLm5leHQoKTsgIWlkZW50aWZpZXJzXzFfMS5kb25lOyBpZGVudGlmaWVyc18xXzEgPSBpZGVudGlmaWVyc18xLm5leHQoKSkge1xuICAgICAgICAgICAgdmFyIGlkZW50aWZpZXIgPSBpZGVudGlmaWVyc18xXzEudmFsdWU7XG4gICAgICAgICAgICBpZiAodHlwZW9mIHZhbHVlICE9PSBcIm9iamVjdFwiICYmICFBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBob3AgPSB2YWx1ZS5oYXNPd25Qcm9wZXJ0eShpZGVudGlmaWVyKTtcbiAgICAgICAgICAgIGlmICghaG9wKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YWx1ZSA9IHZhbHVlW2lkZW50aWZpZXJdO1xuICAgICAgICB9XG4gICAgfVxuICAgIGNhdGNoIChlXzFfMSkgeyBlXzEgPSB7IGVycm9yOiBlXzFfMSB9OyB9XG4gICAgZmluYWxseSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBpZiAoaWRlbnRpZmllcnNfMV8xICYmICFpZGVudGlmaWVyc18xXzEuZG9uZSAmJiAoX2EgPSBpZGVudGlmaWVyc18xLnJldHVybikpIF9hLmNhbGwoaWRlbnRpZmllcnNfMSk7XG4gICAgICAgIH1cbiAgICAgICAgZmluYWxseSB7IGlmIChlXzEpIHRocm93IGVfMS5lcnJvcjsgfVxuICAgIH1cbiAgICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSBcIm9iamVjdFwiIHx8IEFycmF5LmlzQXJyYXkodmFsdWUpO1xufTtcbmV4cG9ydHMuZGVmYXVsdCA9IGNhbkluamVjdEtleTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2Zha2UtaW5kZXhlZGRiL2J1aWxkL2xpYi9jYW5JbmplY3RLZXkuanNcbi8vIG1vZHVsZSBpZCA9IDUzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fdmFsdWVzID0gKHRoaXMgJiYgdGhpcy5fX3ZhbHVlcykgfHwgZnVuY3Rpb24obykge1xuICAgIHZhciBzID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIFN5bWJvbC5pdGVyYXRvciwgbSA9IHMgJiYgb1tzXSwgaSA9IDA7XG4gICAgaWYgKG0pIHJldHVybiBtLmNhbGwobyk7XG4gICAgaWYgKG8gJiYgdHlwZW9mIG8ubGVuZ3RoID09PSBcIm51bWJlclwiKSByZXR1cm4ge1xuICAgICAgICBuZXh0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAobyAmJiBpID49IG8ubGVuZ3RoKSBvID0gdm9pZCAwO1xuICAgICAgICAgICAgcmV0dXJuIHsgdmFsdWU6IG8gJiYgb1tpKytdLCBkb25lOiAhbyB9O1xuICAgICAgICB9XG4gICAgfTtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKHMgPyBcIk9iamVjdCBpcyBub3QgaXRlcmFibGUuXCIgOiBcIlN5bWJvbC5pdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIGVycm9yc18xID0gcmVxdWlyZShcIi4vZXJyb3JzXCIpO1xudmFyIGV4dHJhY3RLZXlfMSA9IHJlcXVpcmUoXCIuL2V4dHJhY3RLZXlcIik7XG52YXIgUmVjb3JkU3RvcmVfMSA9IHJlcXVpcmUoXCIuL1JlY29yZFN0b3JlXCIpO1xudmFyIHN0cnVjdHVyZWRDbG9uZV8xID0gcmVxdWlyZShcIi4vc3RydWN0dXJlZENsb25lXCIpO1xudmFyIHZhbHVlVG9LZXlfMSA9IHJlcXVpcmUoXCIuL3ZhbHVlVG9LZXlcIik7XG4vLyBodHRwOi8vd3d3LnczLm9yZy9UUi8yMDE1L1JFQy1JbmRleGVkREItMjAxNTAxMDgvI2Rmbi1pbmRleFxudmFyIEluZGV4ID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIEluZGV4KHJhd09iamVjdFN0b3JlLCBuYW1lLCBrZXlQYXRoLCBtdWx0aUVudHJ5LCB1bmlxdWUpIHtcbiAgICAgICAgdGhpcy5kZWxldGVkID0gZmFsc2U7XG4gICAgICAgIC8vIEluaXRpYWxpemVkIHNob3VsZCBiZSB1c2VkIHRvIGRlY2lkZSB3aGV0aGVyIHRvIHRocm93IGFuIGVycm9yIG9yIGFib3J0IHRoZSB2ZXJzaW9uY2hhbmdlIHRyYW5zYWN0aW9uIHdoZW4gdGhlcmUgaXMgYVxuICAgICAgICAvLyBjb25zdHJhaW50XG4gICAgICAgIHRoaXMuaW5pdGlhbGl6ZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5yZWNvcmRzID0gbmV3IFJlY29yZFN0b3JlXzEuZGVmYXVsdCgpO1xuICAgICAgICB0aGlzLnJhd09iamVjdFN0b3JlID0gcmF3T2JqZWN0U3RvcmU7XG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgICAgIHRoaXMua2V5UGF0aCA9IGtleVBhdGg7XG4gICAgICAgIHRoaXMubXVsdGlFbnRyeSA9IG11bHRpRW50cnk7XG4gICAgICAgIHRoaXMudW5pcXVlID0gdW5pcXVlO1xuICAgIH1cbiAgICAvLyBodHRwOi8vd3d3LnczLm9yZy9UUi8yMDE1L1JFQy1JbmRleGVkREItMjAxNTAxMDgvI2Rmbi1zdGVwcy1mb3ItcmV0cmlldmluZy1hLXZhbHVlLWZyb20tYW4taW5kZXhcbiAgICBJbmRleC5wcm90b3R5cGUuZ2V0S2V5ID0gZnVuY3Rpb24gKGtleSkge1xuICAgICAgICB2YXIgcmVjb3JkID0gdGhpcy5yZWNvcmRzLmdldChrZXkpO1xuICAgICAgICByZXR1cm4gcmVjb3JkICE9PSB1bmRlZmluZWQgPyByZWNvcmQudmFsdWUgOiB1bmRlZmluZWQ7XG4gICAgfTtcbiAgICAvLyBodHRwOi8vdzNjLmdpdGh1Yi5pby9JbmRleGVkREIvI3JldHJpZXZlLW11bHRpcGxlLXJlZmVyZW5jZWQtdmFsdWVzLWZyb20tYW4taW5kZXhcbiAgICBJbmRleC5wcm90b3R5cGUuZ2V0QWxsS2V5cyA9IGZ1bmN0aW9uIChyYW5nZSwgY291bnQpIHtcbiAgICAgICAgdmFyIGVfMSwgX2E7XG4gICAgICAgIGlmIChjb3VudCA9PT0gdW5kZWZpbmVkIHx8IGNvdW50ID09PSAwKSB7XG4gICAgICAgICAgICBjb3VudCA9IEluZmluaXR5O1xuICAgICAgICB9XG4gICAgICAgIHZhciByZWNvcmRzID0gW107XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBmb3IgKHZhciBfYiA9IF9fdmFsdWVzKHRoaXMucmVjb3Jkcy52YWx1ZXMocmFuZ2UpKSwgX2MgPSBfYi5uZXh0KCk7ICFfYy5kb25lOyBfYyA9IF9iLm5leHQoKSkge1xuICAgICAgICAgICAgICAgIHZhciByZWNvcmQgPSBfYy52YWx1ZTtcbiAgICAgICAgICAgICAgICByZWNvcmRzLnB1c2goc3RydWN0dXJlZENsb25lXzEuZGVmYXVsdChyZWNvcmQudmFsdWUpKTtcbiAgICAgICAgICAgICAgICBpZiAocmVjb3Jkcy5sZW5ndGggPj0gY291bnQpIHtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlXzFfMSkgeyBlXzEgPSB7IGVycm9yOiBlXzFfMSB9OyB9XG4gICAgICAgIGZpbmFsbHkge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBpZiAoX2MgJiYgIV9jLmRvbmUgJiYgKF9hID0gX2IucmV0dXJuKSkgX2EuY2FsbChfYik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmaW5hbGx5IHsgaWYgKGVfMSkgdGhyb3cgZV8xLmVycm9yOyB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlY29yZHM7XG4gICAgfTtcbiAgICAvLyBodHRwOi8vd3d3LnczLm9yZy9UUi8yMDE1L1JFQy1JbmRleGVkREItMjAxNTAxMDgvI2luZGV4LXJlZmVyZW5jZWQtdmFsdWUtcmV0cmlldmFsLW9wZXJhdGlvblxuICAgIEluZGV4LnByb3RvdHlwZS5nZXRWYWx1ZSA9IGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgICAgdmFyIHJlY29yZCA9IHRoaXMucmVjb3Jkcy5nZXQoa2V5KTtcbiAgICAgICAgcmV0dXJuIHJlY29yZCAhPT0gdW5kZWZpbmVkXG4gICAgICAgICAgICA/IHRoaXMucmF3T2JqZWN0U3RvcmUuZ2V0VmFsdWUocmVjb3JkLnZhbHVlKVxuICAgICAgICAgICAgOiB1bmRlZmluZWQ7XG4gICAgfTtcbiAgICAvLyBodHRwOi8vdzNjLmdpdGh1Yi5pby9JbmRleGVkREIvI3JldHJpZXZlLW11bHRpcGxlLXJlZmVyZW5jZWQtdmFsdWVzLWZyb20tYW4taW5kZXhcbiAgICBJbmRleC5wcm90b3R5cGUuZ2V0QWxsVmFsdWVzID0gZnVuY3Rpb24gKHJhbmdlLCBjb3VudCkge1xuICAgICAgICB2YXIgZV8yLCBfYTtcbiAgICAgICAgaWYgKGNvdW50ID09PSB1bmRlZmluZWQgfHwgY291bnQgPT09IDApIHtcbiAgICAgICAgICAgIGNvdW50ID0gSW5maW5pdHk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHJlY29yZHMgPSBbXTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGZvciAodmFyIF9iID0gX192YWx1ZXModGhpcy5yZWNvcmRzLnZhbHVlcyhyYW5nZSkpLCBfYyA9IF9iLm5leHQoKTsgIV9jLmRvbmU7IF9jID0gX2IubmV4dCgpKSB7XG4gICAgICAgICAgICAgICAgdmFyIHJlY29yZCA9IF9jLnZhbHVlO1xuICAgICAgICAgICAgICAgIHJlY29yZHMucHVzaCh0aGlzLnJhd09iamVjdFN0b3JlLmdldFZhbHVlKHJlY29yZC52YWx1ZSkpO1xuICAgICAgICAgICAgICAgIGlmIChyZWNvcmRzLmxlbmd0aCA+PSBjb3VudCkge1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVfMl8xKSB7IGVfMiA9IHsgZXJyb3I6IGVfMl8xIH07IH1cbiAgICAgICAgZmluYWxseSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGlmIChfYyAmJiAhX2MuZG9uZSAmJiAoX2EgPSBfYi5yZXR1cm4pKSBfYS5jYWxsKF9iKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZpbmFsbHkgeyBpZiAoZV8yKSB0aHJvdyBlXzIuZXJyb3I7IH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVjb3JkcztcbiAgICB9O1xuICAgIC8vIGh0dHA6Ly93d3cudzMub3JnL1RSLzIwMTUvUkVDLUluZGV4ZWREQi0yMDE1MDEwOC8jZGZuLXN0ZXBzLWZvci1zdG9yaW5nLWEtcmVjb3JkLWludG8tYW4tb2JqZWN0LXN0b3JlIChzdGVwIDcpXG4gICAgSW5kZXgucHJvdG90eXBlLnN0b3JlUmVjb3JkID0gZnVuY3Rpb24gKG5ld1JlY29yZCkge1xuICAgICAgICB2YXIgZV8zLCBfYSwgZV80LCBfYiwgZV81LCBfYztcbiAgICAgICAgdmFyIGluZGV4S2V5O1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgaW5kZXhLZXkgPSBleHRyYWN0S2V5XzEuZGVmYXVsdCh0aGlzLmtleVBhdGgsIG5ld1JlY29yZC52YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgaWYgKGVyci5uYW1lID09PSBcIkRhdGFFcnJvclwiKSB7XG4gICAgICAgICAgICAgICAgLy8gSW52YWxpZCBrZXkgaXMgbm90IGFuIGFjdHVhbCBlcnJvciwganVzdCBtZWFucyB3ZSBkbyBub3Qgc3RvcmUgYW4gZW50cnkgaW4gdGhpcyBpbmRleFxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRocm93IGVycjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXRoaXMubXVsdGlFbnRyeSB8fCAhQXJyYXkuaXNBcnJheShpbmRleEtleSkpIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgdmFsdWVUb0tleV8xLmRlZmF1bHQoaW5kZXhLZXkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAvLyByZW1vdmUgYW55IGVsZW1lbnRzIGZyb20gaW5kZXgga2V5IHRoYXQgYXJlIG5vdCB2YWxpZCBrZXlzIGFuZCByZW1vdmUgYW55IGR1cGxpY2F0ZSBlbGVtZW50cyBmcm9tIGluZGV4XG4gICAgICAgICAgICAvLyBrZXkgc3VjaCB0aGF0IG9ubHkgb25lIGluc3RhbmNlIG9mIHRoZSBkdXBsaWNhdGUgdmFsdWUgcmVtYWlucy5cbiAgICAgICAgICAgIHZhciBrZWVwID0gW107XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGluZGV4S2V5XzEgPSBfX3ZhbHVlcyhpbmRleEtleSksIGluZGV4S2V5XzFfMSA9IGluZGV4S2V5XzEubmV4dCgpOyAhaW5kZXhLZXlfMV8xLmRvbmU7IGluZGV4S2V5XzFfMSA9IGluZGV4S2V5XzEubmV4dCgpKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBwYXJ0ID0gaW5kZXhLZXlfMV8xLnZhbHVlO1xuICAgICAgICAgICAgICAgICAgICBpZiAoa2VlcC5pbmRleE9mKHBhcnQpIDwgMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZWVwLnB1c2godmFsdWVUb0tleV8xLmRlZmF1bHQocGFydCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8qIERvIG5vdGhpbmcgKi9cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChlXzNfMSkgeyBlXzMgPSB7IGVycm9yOiBlXzNfMSB9OyB9XG4gICAgICAgICAgICBmaW5hbGx5IHtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoaW5kZXhLZXlfMV8xICYmICFpbmRleEtleV8xXzEuZG9uZSAmJiAoX2EgPSBpbmRleEtleV8xLnJldHVybikpIF9hLmNhbGwoaW5kZXhLZXlfMSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGZpbmFsbHkgeyBpZiAoZV8zKSB0aHJvdyBlXzMuZXJyb3I7IH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGluZGV4S2V5ID0ga2VlcDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXRoaXMubXVsdGlFbnRyeSB8fCAhQXJyYXkuaXNBcnJheShpbmRleEtleSkpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnVuaXF1ZSkge1xuICAgICAgICAgICAgICAgIHZhciBleGlzdGluZ1JlY29yZCA9IHRoaXMucmVjb3Jkcy5nZXQoaW5kZXhLZXkpO1xuICAgICAgICAgICAgICAgIGlmIChleGlzdGluZ1JlY29yZCkge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgZXJyb3JzXzEuQ29uc3RyYWludEVycm9yKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgaWYgKHRoaXMudW5pcXVlKSB7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaW5kZXhLZXlfMiA9IF9fdmFsdWVzKGluZGV4S2V5KSwgaW5kZXhLZXlfMl8xID0gaW5kZXhLZXlfMi5uZXh0KCk7ICFpbmRleEtleV8yXzEuZG9uZTsgaW5kZXhLZXlfMl8xID0gaW5kZXhLZXlfMi5uZXh0KCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpbmRpdmlkdWFsSW5kZXhLZXkgPSBpbmRleEtleV8yXzEudmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZXhpc3RpbmdSZWNvcmQgPSB0aGlzLnJlY29yZHMuZ2V0KGluZGl2aWR1YWxJbmRleEtleSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZXhpc3RpbmdSZWNvcmQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgZXJyb3JzXzEuQ29uc3RyYWludEVycm9yKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2F0Y2ggKGVfNF8xKSB7IGVfNCA9IHsgZXJyb3I6IGVfNF8xIH07IH1cbiAgICAgICAgICAgICAgICBmaW5hbGx5IHtcbiAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpbmRleEtleV8yXzEgJiYgIWluZGV4S2V5XzJfMS5kb25lICYmIChfYiA9IGluZGV4S2V5XzIucmV0dXJuKSkgX2IuY2FsbChpbmRleEtleV8yKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBmaW5hbGx5IHsgaWYgKGVfNCkgdGhyb3cgZV80LmVycm9yOyB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICghdGhpcy5tdWx0aUVudHJ5IHx8ICFBcnJheS5pc0FycmF5KGluZGV4S2V5KSkge1xuICAgICAgICAgICAgdGhpcy5yZWNvcmRzLmFkZCh7XG4gICAgICAgICAgICAgICAga2V5OiBpbmRleEtleSxcbiAgICAgICAgICAgICAgICB2YWx1ZTogbmV3UmVjb3JkLmtleSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpbmRleEtleV8zID0gX192YWx1ZXMoaW5kZXhLZXkpLCBpbmRleEtleV8zXzEgPSBpbmRleEtleV8zLm5leHQoKTsgIWluZGV4S2V5XzNfMS5kb25lOyBpbmRleEtleV8zXzEgPSBpbmRleEtleV8zLm5leHQoKSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgaW5kaXZpZHVhbEluZGV4S2V5ID0gaW5kZXhLZXlfM18xLnZhbHVlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlY29yZHMuYWRkKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGtleTogaW5kaXZpZHVhbEluZGV4S2V5LFxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IG5ld1JlY29yZC5rZXksXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChlXzVfMSkgeyBlXzUgPSB7IGVycm9yOiBlXzVfMSB9OyB9XG4gICAgICAgICAgICBmaW5hbGx5IHtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoaW5kZXhLZXlfM18xICYmICFpbmRleEtleV8zXzEuZG9uZSAmJiAoX2MgPSBpbmRleEtleV8zLnJldHVybikpIF9jLmNhbGwoaW5kZXhLZXlfMyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGZpbmFsbHkgeyBpZiAoZV81KSB0aHJvdyBlXzUuZXJyb3I7IH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG4gICAgSW5kZXgucHJvdG90eXBlLmluaXRpYWxpemUgPSBmdW5jdGlvbiAodHJhbnNhY3Rpb24pIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgaWYgKHRoaXMuaW5pdGlhbGl6ZWQpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkluZGV4IGFscmVhZHkgaW5pdGlhbGl6ZWRcIik7XG4gICAgICAgIH1cbiAgICAgICAgdHJhbnNhY3Rpb24uX2V4ZWNSZXF1ZXN0QXN5bmMoe1xuICAgICAgICAgICAgb3BlcmF0aW9uOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdmFyIGVfNiwgX2E7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIENyZWF0ZSBpbmRleCBiYXNlZCBvbiBjdXJyZW50IHZhbHVlIG9mIG9iamVjdHN0b3JlXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBfYiA9IF9fdmFsdWVzKF90aGlzLnJhd09iamVjdFN0b3JlLnJlY29yZHMudmFsdWVzKCkpLCBfYyA9IF9iLm5leHQoKTsgIV9jLmRvbmU7IF9jID0gX2IubmV4dCgpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJlY29yZCA9IF9jLnZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLnN0b3JlUmVjb3JkKHJlY29yZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgY2F0Y2ggKGVfNl8xKSB7IGVfNiA9IHsgZXJyb3I6IGVfNl8xIH07IH1cbiAgICAgICAgICAgICAgICAgICAgZmluYWxseSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChfYyAmJiAhX2MuZG9uZSAmJiAoX2EgPSBfYi5yZXR1cm4pKSBfYS5jYWxsKF9iKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbmFsbHkgeyBpZiAoZV82KSB0aHJvdyBlXzYuZXJyb3I7IH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBfdGhpcy5pbml0aWFsaXplZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5lcnJvcihlcnIpO1xuICAgICAgICAgICAgICAgICAgICB0cmFuc2FjdGlvbi5fYWJvcnQoZXJyLm5hbWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzb3VyY2U6IG51bGwsXG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgcmV0dXJuIEluZGV4O1xufSgpKTtcbmV4cG9ydHMuZGVmYXVsdCA9IEluZGV4O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvZmFrZS1pbmRleGVkZGIvYnVpbGQvbGliL0luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSA1NFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX3ZhbHVlcyA9ICh0aGlzICYmIHRoaXMuX192YWx1ZXMpIHx8IGZ1bmN0aW9uKG8pIHtcbiAgICB2YXIgcyA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBTeW1ib2wuaXRlcmF0b3IsIG0gPSBzICYmIG9bc10sIGkgPSAwO1xuICAgIGlmIChtKSByZXR1cm4gbS5jYWxsKG8pO1xuICAgIGlmIChvICYmIHR5cGVvZiBvLmxlbmd0aCA9PT0gXCJudW1iZXJcIikgcmV0dXJuIHtcbiAgICAgICAgbmV4dDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKG8gJiYgaSA+PSBvLmxlbmd0aCkgbyA9IHZvaWQgMDtcbiAgICAgICAgICAgIHJldHVybiB7IHZhbHVlOiBvICYmIG9baSsrXSwgZG9uZTogIW8gfTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihzID8gXCJPYmplY3QgaXMgbm90IGl0ZXJhYmxlLlwiIDogXCJTeW1ib2wuaXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBlcnJvcnNfMSA9IHJlcXVpcmUoXCIuL2Vycm9yc1wiKTtcbnZhciBleHRyYWN0S2V5XzEgPSByZXF1aXJlKFwiLi9leHRyYWN0S2V5XCIpO1xudmFyIEtleUdlbmVyYXRvcl8xID0gcmVxdWlyZShcIi4vS2V5R2VuZXJhdG9yXCIpO1xudmFyIFJlY29yZFN0b3JlXzEgPSByZXF1aXJlKFwiLi9SZWNvcmRTdG9yZVwiKTtcbnZhciBzdHJ1Y3R1cmVkQ2xvbmVfMSA9IHJlcXVpcmUoXCIuL3N0cnVjdHVyZWRDbG9uZVwiKTtcbi8vIGh0dHA6Ly93d3cudzMub3JnL1RSLzIwMTUvUkVDLUluZGV4ZWREQi0yMDE1MDEwOC8jZGZuLW9iamVjdC1zdG9yZVxudmFyIE9iamVjdFN0b3JlID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIE9iamVjdFN0b3JlKHJhd0RhdGFiYXNlLCBuYW1lLCBrZXlQYXRoLCBhdXRvSW5jcmVtZW50KSB7XG4gICAgICAgIHRoaXMuZGVsZXRlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLnJlY29yZHMgPSBuZXcgUmVjb3JkU3RvcmVfMS5kZWZhdWx0KCk7XG4gICAgICAgIHRoaXMucmF3SW5kZXhlcyA9IG5ldyBNYXAoKTtcbiAgICAgICAgdGhpcy5yYXdEYXRhYmFzZSA9IHJhd0RhdGFiYXNlO1xuICAgICAgICB0aGlzLmtleUdlbmVyYXRvciA9IGF1dG9JbmNyZW1lbnQgPT09IHRydWUgPyBuZXcgS2V5R2VuZXJhdG9yXzEuZGVmYXVsdCgpIDogbnVsbDtcbiAgICAgICAgdGhpcy5kZWxldGVkID0gZmFsc2U7XG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgICAgIHRoaXMua2V5UGF0aCA9IGtleVBhdGg7XG4gICAgICAgIHRoaXMuYXV0b0luY3JlbWVudCA9IGF1dG9JbmNyZW1lbnQ7XG4gICAgfVxuICAgIC8vIGh0dHA6Ly93d3cudzMub3JnL1RSLzIwMTUvUkVDLUluZGV4ZWREQi0yMDE1MDEwOC8jZGZuLXN0ZXBzLWZvci1yZXRyaWV2aW5nLWEtdmFsdWUtZnJvbS1hbi1vYmplY3Qtc3RvcmVcbiAgICBPYmplY3RTdG9yZS5wcm90b3R5cGUuZ2V0S2V5ID0gZnVuY3Rpb24gKGtleSkge1xuICAgICAgICB2YXIgcmVjb3JkID0gdGhpcy5yZWNvcmRzLmdldChrZXkpO1xuICAgICAgICByZXR1cm4gcmVjb3JkICE9PSB1bmRlZmluZWQgPyBzdHJ1Y3R1cmVkQ2xvbmVfMS5kZWZhdWx0KHJlY29yZC5rZXkpIDogdW5kZWZpbmVkO1xuICAgIH07XG4gICAgLy8gaHR0cDovL3czYy5naXRodWIuaW8vSW5kZXhlZERCLyNyZXRyaWV2ZS1tdWx0aXBsZS1rZXlzLWZyb20tYW4tb2JqZWN0LXN0b3JlXG4gICAgT2JqZWN0U3RvcmUucHJvdG90eXBlLmdldEFsbEtleXMgPSBmdW5jdGlvbiAocmFuZ2UsIGNvdW50KSB7XG4gICAgICAgIHZhciBlXzEsIF9hO1xuICAgICAgICBpZiAoY291bnQgPT09IHVuZGVmaW5lZCB8fCBjb3VudCA9PT0gMCkge1xuICAgICAgICAgICAgY291bnQgPSBJbmZpbml0eTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgcmVjb3JkcyA9IFtdO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgZm9yICh2YXIgX2IgPSBfX3ZhbHVlcyh0aGlzLnJlY29yZHMudmFsdWVzKHJhbmdlKSksIF9jID0gX2IubmV4dCgpOyAhX2MuZG9uZTsgX2MgPSBfYi5uZXh0KCkpIHtcbiAgICAgICAgICAgICAgICB2YXIgcmVjb3JkID0gX2MudmFsdWU7XG4gICAgICAgICAgICAgICAgcmVjb3Jkcy5wdXNoKHN0cnVjdHVyZWRDbG9uZV8xLmRlZmF1bHQocmVjb3JkLmtleSkpO1xuICAgICAgICAgICAgICAgIGlmIChyZWNvcmRzLmxlbmd0aCA+PSBjb3VudCkge1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVfMV8xKSB7IGVfMSA9IHsgZXJyb3I6IGVfMV8xIH07IH1cbiAgICAgICAgZmluYWxseSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGlmIChfYyAmJiAhX2MuZG9uZSAmJiAoX2EgPSBfYi5yZXR1cm4pKSBfYS5jYWxsKF9iKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZpbmFsbHkgeyBpZiAoZV8xKSB0aHJvdyBlXzEuZXJyb3I7IH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVjb3JkcztcbiAgICB9O1xuICAgIC8vIGh0dHA6Ly93d3cudzMub3JnL1RSLzIwMTUvUkVDLUluZGV4ZWREQi0yMDE1MDEwOC8jZGZuLXN0ZXBzLWZvci1yZXRyaWV2aW5nLWEtdmFsdWUtZnJvbS1hbi1vYmplY3Qtc3RvcmVcbiAgICBPYmplY3RTdG9yZS5wcm90b3R5cGUuZ2V0VmFsdWUgPSBmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgIHZhciByZWNvcmQgPSB0aGlzLnJlY29yZHMuZ2V0KGtleSk7XG4gICAgICAgIHJldHVybiByZWNvcmQgIT09IHVuZGVmaW5lZCA/IHN0cnVjdHVyZWRDbG9uZV8xLmRlZmF1bHQocmVjb3JkLnZhbHVlKSA6IHVuZGVmaW5lZDtcbiAgICB9O1xuICAgIC8vIGh0dHA6Ly93M2MuZ2l0aHViLmlvL0luZGV4ZWREQi8jcmV0cmlldmUtbXVsdGlwbGUtdmFsdWVzLWZyb20tYW4tb2JqZWN0LXN0b3JlXG4gICAgT2JqZWN0U3RvcmUucHJvdG90eXBlLmdldEFsbFZhbHVlcyA9IGZ1bmN0aW9uIChyYW5nZSwgY291bnQpIHtcbiAgICAgICAgdmFyIGVfMiwgX2E7XG4gICAgICAgIGlmIChjb3VudCA9PT0gdW5kZWZpbmVkIHx8IGNvdW50ID09PSAwKSB7XG4gICAgICAgICAgICBjb3VudCA9IEluZmluaXR5O1xuICAgICAgICB9XG4gICAgICAgIHZhciByZWNvcmRzID0gW107XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBmb3IgKHZhciBfYiA9IF9fdmFsdWVzKHRoaXMucmVjb3Jkcy52YWx1ZXMocmFuZ2UpKSwgX2MgPSBfYi5uZXh0KCk7ICFfYy5kb25lOyBfYyA9IF9iLm5leHQoKSkge1xuICAgICAgICAgICAgICAgIHZhciByZWNvcmQgPSBfYy52YWx1ZTtcbiAgICAgICAgICAgICAgICByZWNvcmRzLnB1c2goc3RydWN0dXJlZENsb25lXzEuZGVmYXVsdChyZWNvcmQudmFsdWUpKTtcbiAgICAgICAgICAgICAgICBpZiAocmVjb3Jkcy5sZW5ndGggPj0gY291bnQpIHtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlXzJfMSkgeyBlXzIgPSB7IGVycm9yOiBlXzJfMSB9OyB9XG4gICAgICAgIGZpbmFsbHkge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBpZiAoX2MgJiYgIV9jLmRvbmUgJiYgKF9hID0gX2IucmV0dXJuKSkgX2EuY2FsbChfYik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmaW5hbGx5IHsgaWYgKGVfMikgdGhyb3cgZV8yLmVycm9yOyB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlY29yZHM7XG4gICAgfTtcbiAgICAvLyBodHRwOi8vd3d3LnczLm9yZy9UUi8yMDE1L1JFQy1JbmRleGVkREItMjAxNTAxMDgvI2Rmbi1zdGVwcy1mb3Itc3RvcmluZy1hLXJlY29yZC1pbnRvLWFuLW9iamVjdC1zdG9yZVxuICAgIE9iamVjdFN0b3JlLnByb3RvdHlwZS5zdG9yZVJlY29yZCA9IGZ1bmN0aW9uIChuZXdSZWNvcmQsIG5vT3ZlcndyaXRlLCByb2xsYmFja0xvZykge1xuICAgICAgICB2YXIgZV8zLCBfYTtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgaWYgKHRoaXMua2V5UGF0aCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgdmFyIGtleSA9IGV4dHJhY3RLZXlfMS5kZWZhdWx0KHRoaXMua2V5UGF0aCwgbmV3UmVjb3JkLnZhbHVlKTtcbiAgICAgICAgICAgIGlmIChrZXkgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIG5ld1JlY29yZC5rZXkgPSBrZXk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMua2V5R2VuZXJhdG9yICE9PSBudWxsICYmIG5ld1JlY29yZC5rZXkgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgaWYgKHJvbGxiYWNrTG9nKSB7XG4gICAgICAgICAgICAgICAgdmFyIGtleUdlbmVyYXRvckJlZm9yZV8xID0gdGhpcy5rZXlHZW5lcmF0b3IubnVtO1xuICAgICAgICAgICAgICAgIHJvbGxiYWNrTG9nLnB1c2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoX3RoaXMua2V5R2VuZXJhdG9yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5rZXlHZW5lcmF0b3IubnVtID0ga2V5R2VuZXJhdG9yQmVmb3JlXzE7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG5ld1JlY29yZC5rZXkgPSB0aGlzLmtleUdlbmVyYXRvci5uZXh0KCk7XG4gICAgICAgICAgICAvLyBTZXQgaW4gdmFsdWUgaWYga2V5UGF0aCBkZWZpZW5kIGJ1dCBsZWQgdG8gbm8ga2V5XG4gICAgICAgICAgICAvLyBodHRwOi8vd3d3LnczLm9yZy9UUi8yMDE1L1JFQy1JbmRleGVkREItMjAxNTAxMDgvI2Rmbi1zdGVwcy10by1hc3NpZ24tYS1rZXktdG8tYS12YWx1ZS11c2luZy1hLWtleS1wYXRoXG4gICAgICAgICAgICBpZiAodGhpcy5rZXlQYXRoICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkodGhpcy5rZXlQYXRoKSkge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgaGF2ZSBhbiBhcnJheSBrZXkgcGF0aCBpbiBhbiBvYmplY3Qgc3RvcmUgd2l0aCBhIGtleSBnZW5lcmF0b3JcIik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHZhciByZW1haW5pbmdLZXlQYXRoID0gdGhpcy5rZXlQYXRoO1xuICAgICAgICAgICAgICAgIHZhciBvYmplY3QgPSBuZXdSZWNvcmQudmFsdWU7XG4gICAgICAgICAgICAgICAgdmFyIGlkZW50aWZpZXIgPSB2b2lkIDA7XG4gICAgICAgICAgICAgICAgdmFyIGkgPSAwOyAvLyBKdXN0IHRvIHJ1biB0aGUgbG9vcCBhdCBsZWFzdCBvbmNlXG4gICAgICAgICAgICAgICAgd2hpbGUgKGkgPj0gMCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIG9iamVjdCAhPT0gXCJvYmplY3RcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IGVycm9yc18xLkRhdGFFcnJvcigpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGkgPSByZW1haW5pbmdLZXlQYXRoLmluZGV4T2YoXCIuXCIpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoaSA+PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZGVudGlmaWVyID0gcmVtYWluaW5nS2V5UGF0aC5zbGljZSgwLCBpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlbWFpbmluZ0tleVBhdGggPSByZW1haW5pbmdLZXlQYXRoLnNsaWNlKGkgKyAxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghb2JqZWN0Lmhhc093blByb3BlcnR5KGlkZW50aWZpZXIpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JqZWN0W2lkZW50aWZpZXJdID0ge307XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBvYmplY3QgPSBvYmplY3RbaWRlbnRpZmllcl07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWRlbnRpZmllciA9IHJlbWFpbmluZ0tleVBhdGg7XG4gICAgICAgICAgICAgICAgb2JqZWN0W2lkZW50aWZpZXJdID0gbmV3UmVjb3JkLmtleTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0aGlzLmtleUdlbmVyYXRvciAhPT0gbnVsbCAmJlxuICAgICAgICAgICAgdHlwZW9mIG5ld1JlY29yZC5rZXkgPT09IFwibnVtYmVyXCIpIHtcbiAgICAgICAgICAgIHRoaXMua2V5R2VuZXJhdG9yLnNldElmTGFyZ2VyKG5ld1JlY29yZC5rZXkpO1xuICAgICAgICB9XG4gICAgICAgIHZhciBleGlzdGluZ1JlY29yZCA9IHRoaXMucmVjb3Jkcy5nZXQobmV3UmVjb3JkLmtleSk7XG4gICAgICAgIGlmIChleGlzdGluZ1JlY29yZCkge1xuICAgICAgICAgICAgaWYgKG5vT3ZlcndyaXRlKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IGVycm9yc18xLkNvbnN0cmFpbnRFcnJvcigpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5kZWxldGVSZWNvcmQobmV3UmVjb3JkLmtleSwgcm9sbGJhY2tMb2cpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucmVjb3Jkcy5hZGQobmV3UmVjb3JkKTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIFVwZGF0ZSBpbmRleGVzXG4gICAgICAgICAgICBmb3IgKHZhciBfYiA9IF9fdmFsdWVzKHRoaXMucmF3SW5kZXhlcy52YWx1ZXMoKSksIF9jID0gX2IubmV4dCgpOyAhX2MuZG9uZTsgX2MgPSBfYi5uZXh0KCkpIHtcbiAgICAgICAgICAgICAgICB2YXIgcmF3SW5kZXggPSBfYy52YWx1ZTtcbiAgICAgICAgICAgICAgICBpZiAocmF3SW5kZXguaW5pdGlhbGl6ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmF3SW5kZXguc3RvcmVSZWNvcmQobmV3UmVjb3JkKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVfM18xKSB7IGVfMyA9IHsgZXJyb3I6IGVfM18xIH07IH1cbiAgICAgICAgZmluYWxseSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGlmIChfYyAmJiAhX2MuZG9uZSAmJiAoX2EgPSBfYi5yZXR1cm4pKSBfYS5jYWxsKF9iKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZpbmFsbHkgeyBpZiAoZV8zKSB0aHJvdyBlXzMuZXJyb3I7IH1cbiAgICAgICAgfVxuICAgICAgICBpZiAocm9sbGJhY2tMb2cpIHtcbiAgICAgICAgICAgIHJvbGxiYWNrTG9nLnB1c2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIF90aGlzLmRlbGV0ZVJlY29yZChuZXdSZWNvcmQua2V5KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuZXdSZWNvcmQua2V5O1xuICAgIH07XG4gICAgLy8gaHR0cDovL3d3dy53My5vcmcvVFIvMjAxNS9SRUMtSW5kZXhlZERCLTIwMTUwMTA4LyNkZm4tc3RlcHMtZm9yLWRlbGV0aW5nLXJlY29yZHMtZnJvbS1hbi1vYmplY3Qtc3RvcmVcbiAgICBPYmplY3RTdG9yZS5wcm90b3R5cGUuZGVsZXRlUmVjb3JkID0gZnVuY3Rpb24gKGtleSwgcm9sbGJhY2tMb2cpIHtcbiAgICAgICAgdmFyIGVfNCwgX2EsIGVfNSwgX2I7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHZhciBkZWxldGVkUmVjb3JkcyA9IHRoaXMucmVjb3Jkcy5kZWxldGUoa2V5KTtcbiAgICAgICAgaWYgKHJvbGxiYWNrTG9nKSB7XG4gICAgICAgICAgICB2YXIgX2xvb3BfMSA9IGZ1bmN0aW9uIChyZWNvcmQpIHtcbiAgICAgICAgICAgICAgICByb2xsYmFja0xvZy5wdXNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuc3RvcmVSZWNvcmQocmVjb3JkLCB0cnVlKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGRlbGV0ZWRSZWNvcmRzXzEgPSBfX3ZhbHVlcyhkZWxldGVkUmVjb3JkcyksIGRlbGV0ZWRSZWNvcmRzXzFfMSA9IGRlbGV0ZWRSZWNvcmRzXzEubmV4dCgpOyAhZGVsZXRlZFJlY29yZHNfMV8xLmRvbmU7IGRlbGV0ZWRSZWNvcmRzXzFfMSA9IGRlbGV0ZWRSZWNvcmRzXzEubmV4dCgpKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciByZWNvcmQgPSBkZWxldGVkUmVjb3Jkc18xXzEudmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIF9sb29wXzEocmVjb3JkKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoZV80XzEpIHsgZV80ID0geyBlcnJvcjogZV80XzEgfTsgfVxuICAgICAgICAgICAgZmluYWxseSB7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRlbGV0ZWRSZWNvcmRzXzFfMSAmJiAhZGVsZXRlZFJlY29yZHNfMV8xLmRvbmUgJiYgKF9hID0gZGVsZXRlZFJlY29yZHNfMS5yZXR1cm4pKSBfYS5jYWxsKGRlbGV0ZWRSZWNvcmRzXzEpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBmaW5hbGx5IHsgaWYgKGVfNCkgdGhyb3cgZV80LmVycm9yOyB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGZvciAodmFyIF9jID0gX192YWx1ZXModGhpcy5yYXdJbmRleGVzLnZhbHVlcygpKSwgX2QgPSBfYy5uZXh0KCk7ICFfZC5kb25lOyBfZCA9IF9jLm5leHQoKSkge1xuICAgICAgICAgICAgICAgIHZhciByYXdJbmRleCA9IF9kLnZhbHVlO1xuICAgICAgICAgICAgICAgIHJhd0luZGV4LnJlY29yZHMuZGVsZXRlQnlWYWx1ZShrZXkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlXzVfMSkgeyBlXzUgPSB7IGVycm9yOiBlXzVfMSB9OyB9XG4gICAgICAgIGZpbmFsbHkge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBpZiAoX2QgJiYgIV9kLmRvbmUgJiYgKF9iID0gX2MucmV0dXJuKSkgX2IuY2FsbChfYyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmaW5hbGx5IHsgaWYgKGVfNSkgdGhyb3cgZV81LmVycm9yOyB9XG4gICAgICAgIH1cbiAgICB9O1xuICAgIC8vIGh0dHA6Ly93d3cudzMub3JnL1RSLzIwMTUvUkVDLUluZGV4ZWREQi0yMDE1MDEwOC8jZGZuLXN0ZXBzLWZvci1jbGVhcmluZy1hbi1vYmplY3Qtc3RvcmVcbiAgICBPYmplY3RTdG9yZS5wcm90b3R5cGUuY2xlYXIgPSBmdW5jdGlvbiAocm9sbGJhY2tMb2cpIHtcbiAgICAgICAgdmFyIGVfNiwgX2EsIGVfNywgX2I7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHZhciBkZWxldGVkUmVjb3JkcyA9IHRoaXMucmVjb3Jkcy5jbGVhcigpO1xuICAgICAgICBpZiAocm9sbGJhY2tMb2cpIHtcbiAgICAgICAgICAgIHZhciBfbG9vcF8yID0gZnVuY3Rpb24gKHJlY29yZCkge1xuICAgICAgICAgICAgICAgIHJvbGxiYWNrTG9nLnB1c2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICBfdGhpcy5zdG9yZVJlY29yZChyZWNvcmQsIHRydWUpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgZGVsZXRlZFJlY29yZHNfMiA9IF9fdmFsdWVzKGRlbGV0ZWRSZWNvcmRzKSwgZGVsZXRlZFJlY29yZHNfMl8xID0gZGVsZXRlZFJlY29yZHNfMi5uZXh0KCk7ICFkZWxldGVkUmVjb3Jkc18yXzEuZG9uZTsgZGVsZXRlZFJlY29yZHNfMl8xID0gZGVsZXRlZFJlY29yZHNfMi5uZXh0KCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHJlY29yZCA9IGRlbGV0ZWRSZWNvcmRzXzJfMS52YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgX2xvb3BfMihyZWNvcmQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChlXzZfMSkgeyBlXzYgPSB7IGVycm9yOiBlXzZfMSB9OyB9XG4gICAgICAgICAgICBmaW5hbGx5IHtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZGVsZXRlZFJlY29yZHNfMl8xICYmICFkZWxldGVkUmVjb3Jkc18yXzEuZG9uZSAmJiAoX2EgPSBkZWxldGVkUmVjb3Jkc18yLnJldHVybikpIF9hLmNhbGwoZGVsZXRlZFJlY29yZHNfMik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGZpbmFsbHkgeyBpZiAoZV82KSB0aHJvdyBlXzYuZXJyb3I7IH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgZm9yICh2YXIgX2MgPSBfX3ZhbHVlcyh0aGlzLnJhd0luZGV4ZXMudmFsdWVzKCkpLCBfZCA9IF9jLm5leHQoKTsgIV9kLmRvbmU7IF9kID0gX2MubmV4dCgpKSB7XG4gICAgICAgICAgICAgICAgdmFyIHJhd0luZGV4ID0gX2QudmFsdWU7XG4gICAgICAgICAgICAgICAgcmF3SW5kZXgucmVjb3Jkcy5jbGVhcigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlXzdfMSkgeyBlXzcgPSB7IGVycm9yOiBlXzdfMSB9OyB9XG4gICAgICAgIGZpbmFsbHkge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBpZiAoX2QgJiYgIV9kLmRvbmUgJiYgKF9iID0gX2MucmV0dXJuKSkgX2IuY2FsbChfYyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmaW5hbGx5IHsgaWYgKGVfNykgdGhyb3cgZV83LmVycm9yOyB9XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiBPYmplY3RTdG9yZTtcbn0oKSk7XG5leHBvcnRzLmRlZmF1bHQgPSBPYmplY3RTdG9yZTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2Zha2UtaW5kZXhlZGRiL2J1aWxkL2xpYi9PYmplY3RTdG9yZS5qc1xuLy8gbW9kdWxlIGlkID0gNTVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgZXJyb3JzXzEgPSByZXF1aXJlKFwiLi9lcnJvcnNcIik7XG52YXIgTUFYX0tFWSA9IDkwMDcxOTkyNTQ3NDA5OTI7XG52YXIgS2V5R2VuZXJhdG9yID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIEtleUdlbmVyYXRvcigpIHtcbiAgICAgICAgLy8gVGhpcyBpcyBraW5kIG9mIHdyb25nLiBTaG91bGQgc3RhcnQgYXQgMSBhbmQgaW5jcmVtZW50IG9ubHkgYWZ0ZXIgcmVjb3JkIGlzIHNhdmVkXG4gICAgICAgIHRoaXMubnVtID0gMDtcbiAgICB9XG4gICAgS2V5R2VuZXJhdG9yLnByb3RvdHlwZS5uZXh0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodGhpcy5udW0gPj0gTUFYX0tFWSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IGVycm9yc18xLkNvbnN0cmFpbnRFcnJvcigpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMubnVtICs9IDE7XG4gICAgICAgIHJldHVybiB0aGlzLm51bTtcbiAgICB9O1xuICAgIC8vIGh0dHBzOi8vdzNjLmdpdGh1Yi5pby9JbmRleGVkREIvI3Bvc3NpYmx5LXVwZGF0ZS10aGUta2V5LWdlbmVyYXRvclxuICAgIEtleUdlbmVyYXRvci5wcm90b3R5cGUuc2V0SWZMYXJnZXIgPSBmdW5jdGlvbiAobnVtKSB7XG4gICAgICAgIHZhciB2YWx1ZSA9IE1hdGguZmxvb3IoTWF0aC5taW4obnVtLCBNQVhfS0VZKSkgLSAxO1xuICAgICAgICBpZiAodmFsdWUgPj0gdGhpcy5udW0pIHtcbiAgICAgICAgICAgIHRoaXMubnVtID0gdmFsdWUgKyAxO1xuICAgICAgICB9XG4gICAgfTtcbiAgICByZXR1cm4gS2V5R2VuZXJhdG9yO1xufSgpKTtcbmV4cG9ydHMuZGVmYXVsdCA9IEtleUdlbmVyYXRvcjtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2Zha2UtaW5kZXhlZGRiL2J1aWxkL2xpYi9LZXlHZW5lcmF0b3IuanNcbi8vIG1vZHVsZSBpZCA9IDU2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuLy8gaHR0cDovL3d3dy53My5vcmcvVFIvMjAxNS9SRUMtSW5kZXhlZERCLTIwMTUwMTA4LyNkZm4tZGF0YWJhc2VcbnZhciBEYXRhYmFzZSA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBEYXRhYmFzZShuYW1lLCB2ZXJzaW9uKSB7XG4gICAgICAgIHRoaXMuZGVsZXRlUGVuZGluZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLnRyYW5zYWN0aW9ucyA9IFtdO1xuICAgICAgICB0aGlzLnJhd09iamVjdFN0b3JlcyA9IG5ldyBNYXAoKTtcbiAgICAgICAgdGhpcy5jb25uZWN0aW9ucyA9IFtdO1xuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgICAgICB0aGlzLnZlcnNpb24gPSB2ZXJzaW9uO1xuICAgICAgICB0aGlzLnByb2Nlc3NUcmFuc2FjdGlvbnMgPSB0aGlzLnByb2Nlc3NUcmFuc2FjdGlvbnMuYmluZCh0aGlzKTtcbiAgICB9XG4gICAgRGF0YWJhc2UucHJvdG90eXBlLnByb2Nlc3NUcmFuc2FjdGlvbnMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHNldEltbWVkaWF0ZShmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgYW55UnVubmluZyA9IF90aGlzLnRyYW5zYWN0aW9ucy5zb21lKGZ1bmN0aW9uICh0cmFuc2FjdGlvbikge1xuICAgICAgICAgICAgICAgIHJldHVybiAodHJhbnNhY3Rpb24uX3N0YXJ0ZWQgJiYgdHJhbnNhY3Rpb24uX3N0YXRlICE9PSBcImZpbmlzaGVkXCIpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpZiAoIWFueVJ1bm5pbmcpIHtcbiAgICAgICAgICAgICAgICB2YXIgbmV4dCA9IF90aGlzLnRyYW5zYWN0aW9ucy5maW5kKGZ1bmN0aW9uICh0cmFuc2FjdGlvbikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gKCF0cmFuc2FjdGlvbi5fc3RhcnRlZCAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNhY3Rpb24uX3N0YXRlICE9PSBcImZpbmlzaGVkXCIpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGlmIChuZXh0KSB7XG4gICAgICAgICAgICAgICAgICAgIG5leHQuX3N0YXJ0KCk7XG4gICAgICAgICAgICAgICAgICAgIG5leHQuYWRkRXZlbnRMaXN0ZW5lcihcImNvbXBsZXRlXCIsIF90aGlzLnByb2Nlc3NUcmFuc2FjdGlvbnMpO1xuICAgICAgICAgICAgICAgICAgICBuZXh0LmFkZEV2ZW50TGlzdGVuZXIoXCJhYm9ydFwiLCBfdGhpcy5wcm9jZXNzVHJhbnNhY3Rpb25zKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgcmV0dXJuIERhdGFiYXNlO1xufSgpKTtcbmV4cG9ydHMuZGVmYXVsdCA9IERhdGFiYXNlO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvZmFrZS1pbmRleGVkZGIvYnVpbGQvbGliL0RhdGFiYXNlLmpzXG4vLyBtb2R1bGUgaWQgPSA1N1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwic291cmNlUm9vdCI6IiJ9
"use strict";
let $rt_seed = 2463534242,
$rt_nextId = () => {
    let x = $rt_seed;
    x ^= x << 13;
    x ^= x >>> 17;
    x ^= x << 5;
    $rt_seed = x;
    return x;
},
$rt_wrapFunction0 = f => function() {
    return f(this);
},
$rt_wrapFunction1 = f => function(p1) {
    return f(this, p1);
},
$rt_wrapFunction2 = f => function(p1, p2) {
    return f(this, p1, p2);
},
$rt_wrapFunction3 = f => function(p1, p2, p3) {
    return f(this, p1, p2, p3);
},
$rt_wrapFunction4 = f => function(p1, p2, p3, p4) {
    return f(this, p1, p2, p3, p4);
},
$rt_eraseClinit = target => target.$clinit = () => {
},
$dbg_class = obj => {
    let cls = obj.constructor;
    let arrayDegree = 0;
    while (cls[$rt_meta] && cls[$rt_meta].item) {
        ++arrayDegree;
        cls = cls[$rt_meta].item;
    }
    let clsName = "";
    if (cls[$rt_meta].primitiveKind !== 0) {
        clsName = cls[$rt_meta].name;
    } else {
        clsName = cls[$rt_meta] ? cls[$rt_meta].name || "a/" + cls.name : "@" + cls.name;
    }
    while (arrayDegree-- > 0) {
        clsName += "[]";
    }
    return clsName;
},
$rt_classWithoutFields = superclass => {
    if (superclass === 0) {
        return function() {
        };
    }
    if (superclass === void 0) {
        superclass = $rt_objcls();
    }
    return function() {
        superclass.call(this);
    };
},
$rt_meta = Symbol("teavm_meta"),
$rt_cls = cls => {
    if (cls[$rt_meta].classObject === null) {
        cls[$rt_meta].classObject = jl_Class_createClass(cls);
    }
    return cls[$rt_meta].classObject;
},
$rt_objcls = () => jl_Object,
$rt_newClassMetadata = source => {
    return Object.assign({ name: null, binaryName: null, parent: null, superinterfaces: [], modifiers: 0, primitiveKind: 0, itemType: null, arrayType: null, enclosingClass: null, declaringClass: null, simpleName: null, clinit: () => {
    }, constructor: null, enumConstants: () => null, resolvedEnumConstants: null, reflection: null, classObject: null, assignableCache: null, valueToObject: o => o, objectToValue: o => o }, source || {  });
},
$rt_createPrimitiveCls = (name, binaryName, kind, config) => {
    let cls = () => {
    };
    let meta = $rt_newClassMetadata({ name: name, binaryName: binaryName, modifiers: 1 | 1 << 4, primitiveKind: kind });
    cls[$rt_meta] = meta;
    if (typeof config === 'function') {
        config(meta);
    }
    return cls;
},
$rt_booleancls = $rt_createPrimitiveCls("boolean", "Z", 1, meta => {
    {
        meta.valueToObject = o => jl_Boolean_valueOf(o);
    }
}),
$rt_bytecls = $rt_createPrimitiveCls("byte", "B", 2, meta => {
}),
$rt_charcls = $rt_createPrimitiveCls("char", "C", 4, meta => {
}),
$rt_intcls = $rt_createPrimitiveCls("int", "I", 5, meta => {
    {
        meta.valueToObject = o => jl_Integer_valueOf(o);
    }
}),
$rt_voidcls = $rt_createPrimitiveCls("void", "V", 9, meta => {
    meta.valueToObject = () => null;
}),
$rt_compare = (a, b) => a === b ? 0 : a < b ?  -1 : 1,
$rt_imul = Math.imul || function(a, b) {
    let ah = a >>> 16 & 0xFFFF;
    let al = a & 0xFFFF;
    let bh = b >>> 16 & 0xFFFF;
    let bl = b & 0xFFFF;
    return al * bl + (ah * bl + al * bh << 16 >>> 0) | 0;
},
$rt_udiv = (a, b) => (a >>> 0) / (b >>> 0) >>> 0,
$rt_umod = (a, b) => (a >>> 0) % (b >>> 0) >>> 0,
$rt_ucmp = (a, b) => {
    a >>>= 0;
    b >>>= 0;
    return a < b ?  -1 : a > b ? 1 : 0;
},
Long_ZERO = BigInt(0),
Long_create = (lo, hi) => BigInt.asIntN(64, BigInt.asUintN(64, BigInt(lo)) | BigInt.asUintN(64, BigInt(hi) << BigInt(32))),
Long_fromInt = val => BigInt.asIntN(64, BigInt(val | 0)),
Long_fromNumber = val => BigInt.asIntN(64, BigInt(val >= 0 ? Math.floor(val) : Math.ceil(val))),
Long_lo = val => Number(BigInt.asIntN(32, val)) | 0,
Long_eq = (a, b) => a === b,
Long_ne = (a, b) => a !== b,
Long_ge = (a, b) => a >= b,
Long_lt = (a, b) => a < b,
Long_le = (a, b) => a <= b,
Long_add = (a, b) => BigInt.asIntN(64, a + b),
Long_sub = (a, b) => BigInt.asIntN(64, a - b),
Long_mul = (a, b) => BigInt.asIntN(64, a * b),
Long_div = (a, b) => BigInt.asIntN(64, a / b),
Long_rem = (a, b) => BigInt.asIntN(64, a % b),
Long_and = (a, b) => BigInt.asIntN(64, a & b),
Long_or = (a, b) => BigInt.asIntN(64, a | b),
Long_xor = (a, b) => BigInt.asIntN(64, a ^ b),
Long_shr = (a, b) => BigInt.asIntN(64, a >> BigInt(b & 63)),
$rt_createArray = (cls, sz) => {
    let data = new Array(sz);
    data.fill(null);
    return new ($rt_arraycls(cls))(data);
},
$rt_createCharArray = sz => new $rt_charArrayCls(new Uint16Array(sz)),
$rt_createCharArrayFromData = data => {
    let buffer = new Uint16Array(data.length);
    buffer.set(data);
    return new $rt_charArrayCls(buffer);
},
$rt_createByteArray = sz => new $rt_byteArrayCls(new Int8Array(sz)),
$rt_createIntArray = sz => new $rt_intArrayCls(new Int32Array(sz)),
$rt_createIntArrayFromData = data => {
    let buffer = new Int32Array(data.length);
    buffer.set(data);
    return new $rt_intArrayCls(buffer);
};
let $rt_createBooleanArray = sz => new $rt_booleanArrayCls(new Int8Array(sz)),
$rt_arraycls = cls => {
    let result = cls[$rt_meta].arrayType;
    if (result === null) {
        function JavaArray(data) {
            ($rt_objcls()).call(this);
            this.data = data;
        }
        JavaArray.prototype = Object.create(($rt_objcls()).prototype);
        JavaArray.prototype.type = cls;
        JavaArray.prototype.constructor = JavaArray;
        JavaArray.prototype.toString = function() {
            let str = "[";
            for (let i = 0;i < this.data.length;++i) {
                if (i > 0) {
                    str += ", ";
                }
                str += this.data[i].toString();
            }
            str += "]";
            return str;
        };
        JavaArray.prototype.$clone0 = function() {
            let dataCopy;
            if ('slice' in this.data) {
                dataCopy = this.data.slice();
            } else {
                dataCopy = new this.data.constructor(this.data.length);
                for (let i = 0;i < dataCopy.length;++i) {
                    dataCopy[i] = this.data[i];
                }
            }
            return new ($rt_arraycls(this.type))(dataCopy);
        };
        let name = "[" + cls[$rt_meta].binaryName;
        JavaArray[$rt_meta] = $rt_newClassMetadata({ name: name, binaryName: name, parent: $rt_objcls(), itemType: cls });
        result = JavaArray;
        cls[$rt_meta].arrayType = JavaArray;
    }
    return result;
};
function $rt_arrayLength(array) {
    return array.data.length;
}
let $rt_stringPool_instance,
$rt_stringPool = strings => {
    $rt_stringClassInit();
    $rt_stringPool_instance = new Array(strings.length);
    for (let i = 0;i < strings.length;++i) {
        $rt_stringPool_instance[i] = $rt_intern($rt_str(strings[i]));
    }
},
$rt_s = index => $rt_stringPool_instance[index],
$rt_charArrayToString = (array, offset, count) => {
    let result = "";
    let limit = offset + count;
    if (count <= 16) {
        for (let i = offset;i < limit;i = i + 1 | 0) {
            result += String.fromCharCode(array[i]);
        }
    } else {
        for (let i = offset;i < limit;i = i + 1024 | 0) {
            let next = Math.min(limit, i + 1024 | 0);
            result += String.fromCharCode.apply(null, array.subarray(i, next));
        }
    }
    return result;
},
$rt_fullArrayToString = array => $rt_charArrayToString(array, 0, array.length),
$rt_str = str => str === null ? null : jl_String__init_2(str),
$rt_ustr = str => str === null ? null : str.$nativeString,
$rt_stringClassInit = () => jl_String_$callClinit(),
$rt_intern;
{
    $rt_intern = str => str;
}
let $rt_enumConstants = cls => {
    let meta = cls[$rt_meta];
    if (meta.resolvedEnumConstants === null) {
        let result = meta.enumConstants();
        meta.resolvedEnumConstants = result !== null ? result : [];
    }
    return meta.resolvedEnumConstants;
},
$rt_isInstance = (obj, cls) => obj instanceof $rt_objcls() && !!obj.constructor[$rt_meta] && $rt_isAssignable(obj.constructor, cls),
$rt_isAssignable = (from, to) => {
    if (to === $rt_objcls()) {
        return from[$rt_meta].primitiveKind === 0;
    }
    if (from === to) {
        return true;
    }
    let map = from[$rt_meta].assignableCache;
    if (map === null) {
        map = new Map();
        from[$rt_meta].assignableCache = map;
    }
    let cachedResult = map.get(to);
    if (typeof cachedResult !== 'undefined') {
        return cachedResult;
    }
    if (to[$rt_meta].itemType !== null) {
        let result = from[$rt_meta].itemType !== null && $rt_isAssignable(from[$rt_meta].itemType, to[$rt_meta].itemType);
        map.set(to, result);
        return result;
    }
    let parent = from[$rt_meta].parent;
    if (parent !== null && parent !== from) {
        if ($rt_isAssignable(parent, to)) {
            map.set(to, true);
            return true;
        }
    }
    let superinterfaces = from[$rt_meta].superinterfaces;
    for (let i = 0;i < superinterfaces.length;i = i + 1 | 0) {
        if ($rt_isAssignable(superinterfaces[i], to)) {
            map.set(to, true);
            return true;
        }
    }
    map.set(to, false);
    return false;
},
$rt_throw = ex => {
    throw $rt_exception(ex);
},
$rt_javaExceptionProp = Symbol("javaException"),
$rt_exception = ex => {
    if (!ex.$jsException) {
        $rt_fillNativeException(ex);
    }
    return ex.$jsException;
},
$rt_fillNativeException = ex => {
    let javaCause = $rt_throwableCause(ex);
    let jsCause = javaCause !== null ? javaCause.$jsException : void 0;
    let cause = typeof jsCause === "object" ? { cause: jsCause } : void 0;
    let err = new JavaError("Java exception thrown", cause);
    if (typeof Error.captureStackTrace === "function") {
        Error.captureStackTrace(err);
    }
    err[$rt_javaExceptionProp] = ex;
    ex.$jsException = err;
    $rt_fillStack(err, ex);
},
$rt_fillStack = (err, ex) => {
    if (typeof $rt_decodeStack === "function" && err.stack) {
        let stack = $rt_decodeStack(err.stack);
        let javaStack = $rt_createArray($rt_stecls(), stack.length);
        let elem;
        let noStack = false;
        for (let i = 0;i < stack.length;++i) {
            let element = stack[i];
            elem = $rt_createStackElement($rt_str(element.className), $rt_str(element.methodName), $rt_str(element.fileName), element.lineNumber);
            if (elem == null) {
                noStack = true;
                break;
            }
            javaStack.data[i] = elem;
        }
        if (!noStack) {
            $rt_setStack(ex, javaStack);
        }
    }
},
JavaError;
if (typeof Reflect === 'object') {
    let defaultMessage = Symbol("defaultMessage");
    JavaError = function JavaError(message, cause) {
        let self = Reflect.construct(Error, [void 0, cause], JavaError);
        Object.setPrototypeOf(self, JavaError.prototype);
        self[defaultMessage] = message;
        return self;
    }
    ;
    JavaError.prototype = Object.create(Error.prototype, { constructor: { configurable: true, writable: true, value: JavaError }, message: { get() {
        try {
            let javaException = this[$rt_javaExceptionProp];
            if (typeof javaException === 'object') {
                let javaMessage = $rt_throwableMessage(javaException);
                if (typeof javaMessage === "object") {
                    return javaMessage !== null ? javaMessage.toString() : null;
                }
            }
            return this[defaultMessage];
        } catch (e){
            return "Exception occurred trying to extract Java exception message: " + e;
        }
    } } });
} else {
    JavaError = Error;
}
let $rt_wrapException = err => {
    let ex = err[$rt_javaExceptionProp];
    if (!ex) {
        ex = $rt_createException($rt_str("(JavaScript) " + err.toString()));
        err[$rt_javaExceptionProp] = ex;
        ex.$jsException = err;
        $rt_fillStack(err, ex);
    }
    return ex;
},
$rt_createException = message => jl_RuntimeException__init_(message),
$rt_throwableMessage = t => jl_Throwable_getMessage(t),
$rt_throwableCause = t => jl_Throwable_getCause(t),
$rt_stecls = () => $rt_objcls(),
$rt_createStackElement = (className, methodName, fileName, lineNumber) => {
    {
        return null;
    }
},
$rt_setStack = (e, stack) => {
},
$rt_packageData = null,
$rt_packages = data => {
    let i = 0;
    let packages = new Array(data.length);
    for (let j = 0;j < data.length;++j) {
        let prefixIndex = data[i++];
        let prefix = prefixIndex >= 0 ? packages[prefixIndex] : "";
        packages[j] = prefix + data[i++] + ".";
    }
    $rt_packageData = packages;
},
$rt_allClasses = [],
$rt_metadata = data => {
    let packages = $rt_packageData;
    let i = 0;
    while (i < data.length) {
        let cls = data[i++];
        $rt_allClasses.push(cls);
        let m = $rt_newClassMetadata();
        cls[$rt_meta] = m;
        let className = data[i++];
        m.name = className !== 0 ? className : null;
        if (m.name !== null) {
            let packageIndex = data[i++];
            if (packageIndex >= 0) {
                m.name = packages[packageIndex] + m.name;
            }
        }
        m.binaryName = "L" + m.name + ";";
        let superclass = data[i++];
        m.parent = superclass !== 0 ? superclass : null;
        m.superinterfaces = data[i++];
        if (m.parent) {
            cls.prototype = Object.create(m.parent.prototype);
        } else {
            cls.prototype = {  };
        }
        cls.prototype.constructor = cls;
        m.modifiers = data[i++];
        m.primitiveKind = 0;
        if ((m.modifiers & 1 << 9) !== 0) {
            m.parent = null;
        }
        let innerClassInfo = data[i++];
        if (innerClassInfo !== 0) {
            let enclosingClass = innerClassInfo[0];
            m.enclosingClass = enclosingClass !== 0 ? enclosingClass : null;
            let declaringClass = innerClassInfo[1];
            m.declaringClass = declaringClass !== 0 ? declaringClass : null;
            let simpleName = innerClassInfo[2];
            m.simpleName = simpleName !== 0 ? simpleName : null;
        }
        let clinit = data[i++];
        m.clinit = clinit !== 0 ? () => {
            m.clinit = () => {
            };
            clinit();
        } : () => {
        };
        let virtualMethods = data[i++];
        if (virtualMethods !== 0) {
            for (let j = 0;j < virtualMethods.length;j += 2) {
                let name = virtualMethods[j];
                let func = virtualMethods[j + 1];
                if (typeof name === 'string') {
                    name = [name];
                }
                for (let k = 0;k < name.length;++k) {
                    cls.prototype[name[k]] = func;
                }
            }
        }
    }
},
$rt_enumConstantsMetadata = data => {
    let i = 0;
    while (i < data.length) {
        let cls = data[i++];
        cls[$rt_meta].enumConstants = data[i++];
    }
};
function jl_Object() {
    this.$id$ = 0;
}
let jl_Object_getClass = $this => {
    return $rt_cls(jl_Object_getObjectClassInfo($this));
},
jl_Object_getObjectClassInfo = var$1 => {
    return var$1.constructor;
},
jl_Object_hashCode = $this => {
    return jl_Object_identity($this);
},
jl_Object_equals = ($this, $other) => {
    return $this !== $other ? 0 : 1;
},
jl_Object_toString = $this => {
    let var$1, var$2, var$3;
    var$1 = jl_Class_getName(jl_Object_getClass($this));
    var$2 = jl_Integer_toHexString(jl_Object_identity($this));
    var$3 = new jl_StringBuilder;
    jl_AbstractStringBuilder__init_(var$3);
    var$1 = jl_StringBuilder_append(var$3, var$1);
    jl_AbstractStringBuilder_append(var$1, 64);
    jl_StringBuilder_append(var$1, var$2);
    return jl_AbstractStringBuilder_toString(var$3);
},
jl_Object_identity = $this => {
    let $platformThis;
    $platformThis = $this;
    if (!$platformThis.$id$)
        $platformThis.$id$ = $rt_nextId();
    return $this.$id$;
},
jl_Object_clone = $this => {
    let $cls, $result, var$3;
    $cls = (jl_Object_getClass($this)).$classInfo;
    if (!$rt_isInstance($this, jl_Cloneable) && $cls[$rt_meta].itemType === null) {
        $cls = new jl_CloneNotSupportedException;
        jl_Throwable__init_0($cls);
        $rt_throw($cls);
    }
    $result = otp_Platform_clone($this);
    $cls = $result;
    var$3 = $rt_nextId();
    $cls.$id$ = var$3;
    return $result;
},
ji_Serializable = $rt_classWithoutFields(0),
jl_Comparable = $rt_classWithoutFields(0),
jl_CharSequence = $rt_classWithoutFields(0);
function jl_String() {
    jl_Object.call(this);
    this.$hashCode1 = 0;
}
let jl_String_EMPTY_CHARS = null,
jl_String_EMPTY = null,
jl_String_CASE_INSENSITIVE_ORDER = null,
jl_String_$callClinit = () => {
    jl_String_$callClinit = $rt_eraseClinit(jl_String);
    jl_String__clinit_();
},
jl_String__init_4 = $this => {
    jl_String_$callClinit();
    $this.$nativeString = "";
},
jl_String__init_3 = () => {
    let var_0 = new jl_String();
    jl_String__init_4(var_0);
    return var_0;
},
jl_String__init_1 = ($this, $characters) => {
    jl_String_$callClinit();
    $this.$nativeString = $rt_charArrayToString($characters.data, 0, $characters.data.length);
},
jl_String__init_ = var_0 => {
    let var_1 = new jl_String();
    jl_String__init_1(var_1, var_0);
    return var_1;
},
jl_String__init_5 = (var$0, var$1) => {
    var$0.$nativeString = var$1;
},
jl_String__init_2 = var_0 => {
    let var_1 = new jl_String();
    jl_String__init_5(var_1, var_0);
    return var_1;
},
jl_String__init_6 = (var$0, var$1, $offset, $count) => {
    let var$4, var$5;
    jl_String_$callClinit();
    var$4 = var$1.data.length;
    if ($offset >= 0 && $count >= 0 && $count <= (var$4 - $offset | 0)) {
        var$0.$nativeString = $rt_charArrayToString(var$1.data, $offset, $count);
        return;
    }
    var$5 = new jl_IndexOutOfBoundsException;
    jl_Throwable__init_0(var$5);
    $rt_throw(var$5);
},
jl_String__init_0 = (var_0, var_1, var_2) => {
    let var_3 = new jl_String();
    jl_String__init_6(var_3, var_0, var_1, var_2);
    return var_3;
},
jl_String_charAt = ($this, $index) => {
    let var$2;
    if ($index >= 0 && $index < $this.$nativeString.length)
        return $this.$nativeString.charCodeAt($index);
    var$2 = new jl_StringIndexOutOfBoundsException;
    jl_Throwable__init_0(var$2);
    $rt_throw(var$2);
},
jl_String_isEmpty = $this => {
    return $this.$nativeString.length ? 0 : 1;
},
jl_String_startsWith = ($this, $prefix, $toffset) => {
    let $i, var$4, var$5;
    if (($toffset + $prefix.$nativeString.length | 0) <= $this.$nativeString.length) {
        $i = 0;
        while ($i < $prefix.$nativeString.length) {
            var$4 = $prefix.$nativeString.charCodeAt($i);
            var$5 = $toffset + 1 | 0;
            if (var$4 != $this.$nativeString.charCodeAt($toffset))
                return 0;
            $i = $i + 1 | 0;
            $toffset = var$5;
        }
        return 1;
    }
    return 0;
},
jl_String_startsWith0 = ($this, $prefix) => {
    if ($this !== $prefix)
        return jl_String_startsWith($this, $prefix, 0);
    return 1;
},
jl_String_indexOf = ($this, $ch, $fromIndex) => {
    let $i, $hi, $lo, $bmpChar;
    $i = jl_Math_max(0, $fromIndex);
    if ($ch >= 65536) {
        $hi = jl_Character_highSurrogate($ch);
        $lo = jl_Character_lowSurrogate($ch);
        while (true) {
            if ($i >= ($this.$nativeString.length - 1 | 0))
                return (-1);
            if ($this.$nativeString.charCodeAt($i) == $hi && $this.$nativeString.charCodeAt(($i + 1 | 0)) == $lo)
                break;
            $i = $i + 1 | 0;
        }
        return $i;
    }
    $bmpChar = $ch & 65535;
    while (true) {
        if ($i >= $this.$nativeString.length)
            return (-1);
        if ($this.$nativeString.charCodeAt($i) == $bmpChar)
            break;
        $i = $i + 1 | 0;
    }
    return $i;
},
jl_String_lastIndexOf = ($this, $ch, $fromIndex) => {
    let $i, $hi, $lo, $bmpChar;
    $i = jl_Math_min($fromIndex, $this.$nativeString.length - 1 | 0);
    if ($ch >= 65536) {
        $hi = jl_Character_highSurrogate($ch);
        $lo = jl_Character_lowSurrogate($ch);
        while (true) {
            if ($i < 1)
                return (-1);
            if ($this.$nativeString.charCodeAt($i) == $lo) {
                $fromIndex = $i - 1 | 0;
                if ($this.$nativeString.charCodeAt($fromIndex) == $hi)
                    break;
            }
            $i = $i + (-1) | 0;
        }
        return $fromIndex;
    }
    $bmpChar = $ch & 65535;
    while (true) {
        if ($i < 0)
            return (-1);
        if ($this.$nativeString.charCodeAt($i) == $bmpChar)
            break;
        $i = $i + (-1) | 0;
    }
    return $i;
},
jl_String_lastIndexOf0 = ($this, $ch) => {
    return jl_String_lastIndexOf($this, $ch, $this.$nativeString.length - 1 | 0);
},
jl_String_indexOf0 = ($this, $str, $fromIndex) => {
    let $i, $toIndex, $j;
    $i = jl_Math_max(0, $fromIndex);
    $toIndex = $this.$nativeString.length - $str.$nativeString.length | 0;
    a: while (true) {
        if ($i > $toIndex)
            return (-1);
        $j = 0;
        while (true) {
            if ($j >= $str.$nativeString.length)
                break a;
            if ($this.$nativeString.charCodeAt(($i + $j | 0)) != $str.$nativeString.charCodeAt($j))
                break;
            $j = $j + 1 | 0;
        }
        $i = $i + 1 | 0;
    }
    return $i;
},
jl_String_substring = ($this, $beginIndex, $endIndex) => {
    let $length, var$4, var$5;
    $length = $this.$nativeString.length;
    var$4 = $rt_compare($beginIndex, $endIndex);
    if (var$4) {
        if (!$beginIndex && $endIndex == $length)
            return $this;
        if ($beginIndex >= 0 && var$4 <= 0 && $endIndex <= $length)
            return jl_String__init_2($this.$nativeString.substring($beginIndex, $endIndex));
        var$5 = new jl_StringIndexOutOfBoundsException;
        jl_Throwable__init_0(var$5);
        $rt_throw(var$5);
    }
    return jl_String_EMPTY;
},
jl_String_substring0 = ($this, $beginIndex) => {
    return jl_String_substring($this, $beginIndex, $this.$nativeString.length);
},
jl_String_toString = $this => {
    return $this;
},
jl_String_toCharArray = $this => {
    let $array, var$2, $i, var$4;
    $array = $rt_createCharArray($this.$nativeString.length);
    var$2 = $array.data;
    $i = 0;
    var$4 = var$2.length;
    while ($i < var$4) {
        var$2[$i] = $this.$nativeString.charCodeAt($i);
        $i = $i + 1 | 0;
    }
    return $array;
},
jl_String_valueOf = $obj => {
    jl_String_$callClinit();
    return $obj === null ? $rt_s(0) : $obj.$toString();
},
jl_String_valueOf0 = $i => {
    let var$2;
    jl_String_$callClinit();
    var$2 = new jl_StringBuilder;
    jl_AbstractStringBuilder__init_(var$2);
    return jl_AbstractStringBuilder_toString(jl_StringBuilder_append0(var$2, $i));
},
jl_String_equals = ($this, $other) => {
    let $str;
    if ($this !== $other) {
        if ($other instanceof jl_String) {
            $str = $other;
            return $this.$nativeString !== $str.$nativeString ? 0 : 1;
        }
        return 0;
    }
    return 1;
},
jl_String_hashCode = $this => {
    let $i;
    a: {
        if (!$this.$hashCode1) {
            $i = 0;
            while (true) {
                if ($i >= $this.$nativeString.length)
                    break a;
                $this.$hashCode1 = (31 * $this.$hashCode1 | 0) + $this.$nativeString.charCodeAt($i) | 0;
                $i = $i + 1 | 0;
            }
        }
    }
    return $this.$hashCode1;
},
jl_String_compareTo = ($this, var$1) => {
    let var$2, var$3, var$4;
    a: {
        var$1 = var$1;
        if ($this === var$1)
            var$2 = 0;
        else {
            var$3 = jl_Math_min($this.$nativeString.length, var$1.$nativeString.length);
            var$4 = 0;
            b: {
                while (true) {
                    if (var$4 >= var$3)
                        break b;
                    var$2 = $this.$nativeString.charCodeAt(var$4) - var$1.$nativeString.charCodeAt(var$4) | 0;
                    if (var$2)
                        break;
                    var$4 = var$4 + 1 | 0;
                }
                break a;
            }
            var$2 = $this.$nativeString.length - var$1.$nativeString.length | 0;
        }
    }
    return var$2;
},
jl_String__clinit_ = () => {
    jl_String_EMPTY_CHARS = $rt_createCharArray(0);
    jl_String_EMPTY = jl_String__init_3();
    jl_String_CASE_INSENSITIVE_ORDER = new jl_String$_clinit_$lambda$_118_0;
},
jlr_AnnotatedElement = $rt_classWithoutFields(0),
jlr_GenericDeclaration = $rt_classWithoutFields(0),
jlr_Type = $rt_classWithoutFields(0);
function jl_Class() {
    let a = this; jl_Object.call(a);
    a.$flags1 = 0;
    a.$classInfo = null;
    a.$name3 = null;
    a.$simpleName = null;
    a.$enumConstantsCache = null;
}
let jl_Class_createClass = $classInfo => {
    let var$2;
    var$2 = new jl_Class;
    var$2.$classInfo = $classInfo;
    return var$2;
},
jl_Class_toString = $this => {
    let var$1, var$2, var$3;
    var$1 = (!($this.$classInfo[$rt_meta].modifiers & 512) ? 0 : 1) ? $rt_s(1) : !jl_Class_isPrimitive($this) ? $rt_s(2) : $rt_s(3);
    var$2 = jl_Class_getName($this);
    var$3 = new jl_StringBuilder;
    jl_AbstractStringBuilder__init_(var$3);
    jl_StringBuilder_append(jl_StringBuilder_append(var$3, var$1), var$2);
    return jl_AbstractStringBuilder_toString(var$3);
},
jl_Class_isInstance = ($this, $obj) => {
    return !($obj !== null && jl_Class_isAssignableFrom($this, jl_Object_getClass($obj))) ? 0 : 1;
},
jl_Class_isAssignableFrom = ($this, $obj) => {
    return $rt_isAssignable($obj.$classInfo, $this.$classInfo);
},
jl_Class_getName = $this => {
    let var$1, $metadataName, $result, $itemType, $itemName;
    var$1 = $this.$flags1;
    if (!(var$1 & 1)) {
        $this.$flags1 = var$1 | 1;
        $metadataName = $this.$classInfo[$rt_meta].name;
        $result = $metadataName === null ? null : $rt_str($metadataName);
        if ($result === null) {
            $itemType = $this.$classInfo[$rt_meta].itemType;
            if ($itemType !== null) {
                $itemName = jl_Class_getName($rt_cls($itemType));
                if ($itemName !== null) {
                    if ($itemType[$rt_meta].itemType !== null) {
                        $metadataName = new jl_StringBuilder;
                        jl_AbstractStringBuilder__init_($metadataName);
                        jl_AbstractStringBuilder_append($metadataName, 91);
                        jl_StringBuilder_append($metadataName, $itemName);
                        $result = jl_AbstractStringBuilder_toString($metadataName);
                    } else {
                        $metadataName = new jl_StringBuilder;
                        jl_AbstractStringBuilder__init_($metadataName);
                        jl_AbstractStringBuilder_append(jl_StringBuilder_append(jl_StringBuilder_append($metadataName, $rt_s(4)), $itemName), 59);
                        $result = jl_AbstractStringBuilder_toString($metadataName);
                    }
                }
            }
        }
        $this.$name3 = $result;
    }
    return $this.$name3;
},
jl_Class_getSimpleName = $this => {
    let $lastDot, $metadataName, $result, $lastDollar;
    $lastDot = $this.$flags1;
    if (!($lastDot & 2)) {
        $this.$flags1 = $lastDot | 2;
        $metadataName = $this.$classInfo[$rt_meta].simpleName;
        $result = $metadataName === null ? null : $rt_str($metadataName);
        if ($result === null) {
            if ($this.$classInfo[$rt_meta].itemType !== null) {
                $metadataName = jl_Class_getSimpleName($rt_cls($this.$classInfo[$rt_meta].itemType));
                $result = new jl_StringBuilder;
                jl_AbstractStringBuilder__init_($result);
                jl_StringBuilder_append(jl_StringBuilder_append($result, $metadataName), $rt_s(5));
                $result = jl_AbstractStringBuilder_toString($result);
            } else {
                $metadataName = $this.$classInfo[$rt_meta].enclosingClass;
                if (($metadataName === null ? null : $rt_cls($metadataName)) !== null)
                    $result = $rt_s(3);
                else {
                    $result = jl_Class_getName($this);
                    $lastDollar = jl_String_lastIndexOf0($result, 36);
                    if ($lastDollar == (-1)) {
                        $lastDot = jl_String_lastIndexOf0($result, 46);
                        if ($lastDot != (-1))
                            $result = jl_String_substring0($result, $lastDot + 1 | 0);
                    } else {
                        $result = jl_String_substring0($result, $lastDollar + 1 | 0);
                        if (jl_String_charAt($result, 0) >= 48 && jl_String_charAt($result, 0) <= 57)
                            $result = $rt_s(3);
                    }
                }
            }
        }
        $this.$simpleName = $result;
    }
    return $this.$simpleName;
},
jl_Class_isPrimitive = $this => {
    return !$this.$classInfo[$rt_meta].primitiveKind ? 0 : 1;
},
jl_Class_getComponentType = $this => {
    let $itemTypeInfo;
    $itemTypeInfo = $this.$classInfo[$rt_meta].itemType;
    return $itemTypeInfo === null ? null : $rt_cls($itemTypeInfo);
},
jl_Class_getSuperclass = $this => {
    return $this.$classInfo[$rt_meta].parent === null ? null : $rt_cls($this.$classInfo[$rt_meta].parent);
},
jl_Class_getEnumConstantsFast = $this => {
    let $data, $count, $i;
    if (!($this.$classInfo[$rt_meta].modifiers & 65536) ? 0 : 1) {
        $data = $this.$enumConstantsCache;
        if ($data === null) {
            $this.$classInfo[$rt_meta].clinit();
            $count = $rt_enumConstants($this.$classInfo).length;
            $data = otrr_ClassInfo_newArrayInstance($this.$classInfo, $count);
            $i = 0;
            while ($i < $count) {
                $data.data[$i] = $rt_enumConstants($this.$classInfo)[$i];
                $i = $i + 1 | 0;
            }
            $this.$enumConstantsCache = $data;
        }
        return $data;
    }
    return null;
},
jl_Class_cast = ($this, $obj) => {
    let var$2, var$3, var$4;
    if ($obj !== null && !jl_Class_isAssignableFrom($this, jl_Object_getClass($obj))) {
        var$2 = new jl_ClassCastException;
        $obj = jl_Class_getName(jl_Object_getClass($obj));
        var$3 = jl_Class_getName($this);
        var$4 = new jl_StringBuilder;
        jl_AbstractStringBuilder__init_(var$4);
        jl_StringBuilder_append(jl_StringBuilder_append(jl_StringBuilder_append(var$4, $obj), $rt_s(6)), var$3);
        jl_Throwable__init_(var$2, jl_AbstractStringBuilder_toString(var$4));
        $rt_throw(var$2);
    }
    return $obj;
},
jl_Number = $rt_classWithoutFields();
function jl_Integer() {
    jl_Number.call(this);
    this.$value1 = 0;
}
let jl_Integer_TYPE = null,
jl_Integer_integerCache = null,
jl_Integer_$callClinit = () => {
    jl_Integer_$callClinit = $rt_eraseClinit(jl_Integer);
    jl_Integer__clinit_();
},
jl_Integer__init_0 = ($this, $value) => {
    jl_Integer_$callClinit();
    $this.$value1 = $value;
},
jl_Integer__init_ = var_0 => {
    let var_1 = new jl_Integer();
    jl_Integer__init_0(var_1, var_0);
    return var_1;
},
jl_Integer_toString0 = ($i, $radix) => {
    jl_Integer_$callClinit();
    if (!($radix >= 2 && $radix <= 36))
        $radix = 10;
    return (jl_AbstractStringBuilder_append1(jl_AbstractStringBuilder__init_1(20), $i, $radix)).$toString();
},
jl_Integer_toHexString = $i => {
    let var$2, var$3, var$4, var$5, var$6, var$7;
    jl_Integer_$callClinit();
    if (!$i)
        var$2 = $rt_s(7);
    else {
        var$3 = (((32 - jl_Integer_numberOfLeadingZeros($i) | 0) + 4 | 0) - 1 | 0) / 4 | 0;
        var$4 = $rt_createCharArray(var$3);
        var$5 = var$4.data;
        var$6 = (var$3 - 1 | 0) * 4 | 0;
        var$3 = 0;
        while (var$6 >= 0) {
            var$7 = var$3 + 1 | 0;
            var$5[var$3] = jl_Character_forDigit(($i >>> var$6 | 0) & 15, 16);
            var$6 = var$6 - 4 | 0;
            var$3 = var$7;
        }
        var$2 = jl_String__init_(var$4);
    }
    return var$2;
},
jl_Integer_toString = $i => {
    jl_Integer_$callClinit();
    return jl_Integer_toString0($i, 10);
},
jl_Integer_parseInt = ($s, $radix) => {
    jl_Integer_$callClinit();
    if ($s === null) {
        $s = new jl_NumberFormatException;
        jl_Throwable__init_($s, $rt_s(8));
        $rt_throw($s);
    }
    return jl_Integer_parseIntImpl($s, 0, $s.$nativeString.length, $radix);
},
jl_Integer_parseIntImpl = ($s, $beginIndex, $endIndex, $radix) => {
    let $negative, var$6, $value, $maxValue, var$9, $digit, var$11, var$12;
    jl_Integer_$callClinit();
    if ($beginIndex != $endIndex) {
        if ($radix >= 2 && $radix <= 36) {
            a: {
                b: {
                    c: {
                        $negative = 0;
                        $s = $s;
                        switch (jl_String_charAt($s, $beginIndex)) {
                            case 43:
                                break c;
                            case 45:
                                break b;
                            default:
                        }
                        var$6 = $beginIndex;
                        break a;
                    }
                    var$6 = $beginIndex + 1 | 0;
                    break a;
                }
                $negative = 1;
                var$6 = $beginIndex + 1 | 0;
            }
            $value = 0;
            $maxValue = 1 + (2147483647 / $radix | 0) | 0;
            if (var$6 != $endIndex) {
                while (var$6 < $endIndex) {
                    var$9 = var$6 + 1 | 0;
                    $digit = jl_String_charAt($s, var$6);
                    $digit = $digit >= 48 && $digit <= 57 ? $digit - 48 | 0 : $digit >= 97 && $digit <= 122 ? ($digit - 97 | 0) + 10 | 0 : !($digit >= 65 && $digit <= 90) ? (-1) : ($digit - 65 | 0) + 10 | 0;
                    if ($digit < 0) {
                        var$11 = new jl_NumberFormatException;
                        $s = jl_String_valueOf(jl_String_substring($s, $beginIndex, $endIndex));
                        var$12 = new jl_StringBuilder;
                        jl_AbstractStringBuilder__init_(var$12);
                        jl_StringBuilder_append(jl_StringBuilder_append(var$12, $rt_s(9)), $s);
                        jl_Throwable__init_(var$11, jl_AbstractStringBuilder_toString(var$12));
                        $rt_throw(var$11);
                    }
                    if ($digit >= $radix) {
                        var$11 = new jl_NumberFormatException;
                        $s = jl_String_valueOf(jl_String_substring($s, $beginIndex, $endIndex));
                        var$12 = new jl_StringBuilder;
                        jl_AbstractStringBuilder__init_(var$12);
                        jl_StringBuilder_append(jl_StringBuilder_append(jl_StringBuilder_append0(jl_StringBuilder_append(var$12, $rt_s(10)), $radix), $rt_s(11)), $s);
                        jl_Throwable__init_(var$11, jl_AbstractStringBuilder_toString(var$12));
                        $rt_throw(var$11);
                    }
                    if ($value > $maxValue) {
                        $s = new jl_NumberFormatException;
                        jl_Throwable__init_($s, $rt_s(12));
                        $rt_throw($s);
                    }
                    $value = $rt_imul($radix, $value) + $digit | 0;
                    if ($value < 0) {
                        if (var$9 == $endIndex && $value == (-2147483648) && $negative)
                            return (-2147483648);
                        var$11 = new jl_NumberFormatException;
                        $s = jl_String_valueOf(jl_String_substring($s, $beginIndex, $endIndex));
                        var$12 = new jl_StringBuilder;
                        jl_AbstractStringBuilder__init_(var$12);
                        jl_StringBuilder_append(jl_StringBuilder_append(var$12, $rt_s(13)), $s);
                        jl_Throwable__init_(var$11, jl_AbstractStringBuilder_toString(var$12));
                        $rt_throw(var$11);
                    }
                    var$6 = var$9;
                }
                if ($negative)
                    $value =  -$value | 0;
                return $value;
            }
            $s = new jl_NumberFormatException;
            jl_Throwable__init_0($s);
            $rt_throw($s);
        }
        $s = new jl_NumberFormatException;
        var$11 = new jl_StringBuilder;
        jl_AbstractStringBuilder__init_(var$11);
        jl_StringBuilder_append0(jl_StringBuilder_append(var$11, $rt_s(14)), $radix);
        jl_Throwable__init_($s, jl_AbstractStringBuilder_toString(var$11));
        $rt_throw($s);
    }
    $s = new jl_NumberFormatException;
    jl_Throwable__init_($s, $rt_s(15));
    $rt_throw($s);
},
jl_Integer_valueOf = $i => {
    let var$2, var$3;
    jl_Integer_$callClinit();
    if ($i >= (-128) && $i <= 127) {
        a: {
            if (jl_Integer_integerCache === null) {
                jl_Integer_integerCache = $rt_createArray(jl_Integer, 256);
                var$2 = 0;
                while (true) {
                    var$3 = jl_Integer_integerCache.data;
                    if (var$2 >= var$3.length)
                        break a;
                    var$3[var$2] = jl_Integer__init_(var$2 - 128 | 0);
                    var$2 = var$2 + 1 | 0;
                }
            }
        }
        return jl_Integer_integerCache.data[$i + 128 | 0];
    }
    return jl_Integer__init_($i);
},
jl_Integer_toString1 = $this => {
    return jl_Integer_toString($this.$value1);
},
jl_Integer_hashCode = $this => {
    let var$1;
    var$1 = $this.$value1;
    jl_Integer_$callClinit();
    return var$1;
},
jl_Integer_equals = ($this, $other) => {
    if ($this !== $other)
        return !($other instanceof jl_Integer && $other.$value1 == $this.$value1) ? 0 : 1;
    return 1;
},
jl_Integer_compare = (var$1, var$2) => {
    jl_Integer_$callClinit();
    return $rt_compare(var$1, var$2);
},
jl_Integer_numberOfLeadingZeros = $i => {
    let $n, var$3;
    jl_Integer_$callClinit();
    if ($i) {
        $n = 0;
        var$3 = $i >>> 16 | 0;
        if (var$3)
            $n = 16;
        else
            var$3 = $i;
        $i = var$3 >>> 8 | 0;
        if (!$i)
            $i = var$3;
        else
            $n = $n | 8;
        var$3 = $i >>> 4 | 0;
        if (!var$3)
            var$3 = $i;
        else
            $n = $n | 4;
        $i = var$3 >>> 2 | 0;
        if (!$i)
            $i = var$3;
        else
            $n = $n | 2;
        if ($i >>> 1 | 0)
            $n = $n | 1;
        return (32 - $n | 0) - 1 | 0;
    }
    return 32;
},
jl_Integer_numberOfTrailingZeros = $i => {
    let $n, var$3;
    jl_Integer_$callClinit();
    if ($i) {
        $n = 0;
        var$3 = $i << 16;
        if (var$3)
            $n = 16;
        else
            var$3 = $i;
        $i = var$3 << 8;
        if (!$i)
            $i = var$3;
        else
            $n = $n | 8;
        var$3 = $i << 4;
        if (!var$3)
            var$3 = $i;
        else
            $n = $n | 4;
        $i = var$3 << 2;
        if (!$i)
            $i = var$3;
        else
            $n = $n | 2;
        if ($i << 1)
            $n = $n | 1;
        return (32 - $n | 0) - 1 | 0;
    }
    return 32;
},
jl_Integer_compareTo = ($this, var$1) => {
    return jl_Integer_compare($this.$value1, var$1.$value1);
},
jl_Integer__clinit_ = () => {
    jl_Integer_TYPE = $rt_cls($rt_intcls);
};
function jl_AbstractStringBuilder() {
    let a = this; jl_Object.call(a);
    a.$buffer = null;
    a.$length0 = 0;
}
let jl_AbstractStringBuilder__init_ = $this => {
    jl_AbstractStringBuilder__init_0($this, 16);
},
jl_AbstractStringBuilder__init_2 = () => {
    let var_0 = new jl_AbstractStringBuilder();
    jl_AbstractStringBuilder__init_(var_0);
    return var_0;
},
jl_AbstractStringBuilder__init_0 = ($this, $capacity) => {
    $this.$buffer = $rt_createCharArray($capacity);
},
jl_AbstractStringBuilder__init_1 = var_0 => {
    let var_1 = new jl_AbstractStringBuilder();
    jl_AbstractStringBuilder__init_0(var_1, var_0);
    return var_1;
},
jl_AbstractStringBuilder_append1 = ($this, $value, $radix) => {
    return jl_AbstractStringBuilder_insert1($this, $this.$length0, $value, $radix);
},
jl_AbstractStringBuilder_insert1 = ($this, $target, $value, $radix) => {
    let $positive, var$5, var$6, $pos, $sz, $posLimit, var$10;
    $positive = 1;
    if ($value < 0) {
        $positive = 0;
        $value =  -$value | 0;
    }
    a: {
        if ($rt_ucmp($value, $radix) < 0) {
            if ($positive)
                jl_AbstractStringBuilder_insertSpace($this, $target, $target + 1 | 0);
            else {
                jl_AbstractStringBuilder_insertSpace($this, $target, $target + 2 | 0);
                var$5 = $this.$buffer.data;
                var$6 = $target + 1 | 0;
                var$5[$target] = 45;
                $target = var$6;
            }
            $this.$buffer.data[$target] = jl_Character_forDigit($value, $radix);
        } else {
            $pos = 1;
            $sz = 1;
            $posLimit = $rt_udiv((-1), $radix);
            b: {
                c: {
                    while (true) {
                        var$10 = $rt_imul($pos, $radix);
                        if ($rt_ucmp(var$10, $value) > 0)
                            break c;
                        $sz = $sz + 1 | 0;
                        if ($rt_ucmp(var$10, $posLimit) > 0)
                            break;
                        $pos = var$10;
                    }
                    break b;
                }
                var$10 = $pos;
            }
            if (!$positive)
                $sz = $sz + 1 | 0;
            jl_AbstractStringBuilder_insertSpace($this, $target, $target + $sz | 0);
            if ($positive)
                $positive = $target;
            else {
                var$5 = $this.$buffer.data;
                $positive = $target + 1 | 0;
                var$5[$target] = 45;
            }
            while (true) {
                if (!var$10)
                    break a;
                var$5 = $this.$buffer.data;
                $target = $positive + 1 | 0;
                var$5[$positive] = jl_Character_forDigit($rt_udiv($value, var$10), $radix);
                $value = $rt_umod($value, var$10);
                var$10 = $rt_udiv(var$10, $radix);
                $positive = $target;
            }
        }
    }
    return $this;
},
jl_AbstractStringBuilder_append = ($this, $c) => {
    return $this.$insert0($this.$length0, $c);
},
jl_AbstractStringBuilder_insert0 = ($this, $index, $c) => {
    jl_AbstractStringBuilder_insertSpace($this, $index, $index + 1 | 0);
    $this.$buffer.data[$index] = $c;
    return $this;
},
jl_AbstractStringBuilder_ensureCapacity = ($this, $capacity) => {
    let var$2, $newLength, var$4, var$5, var$6;
    var$2 = $this.$buffer.data.length;
    if (var$2 < $capacity) {
        $newLength = var$2 >= 1073741823 ? 2147483647 : jl_Math_max($capacity, jl_Math_max(var$2 * 2 | 0, 5));
        var$4 = $this.$buffer.data;
        var$5 = $rt_createCharArray($newLength);
        var$6 = var$5.data;
        $capacity = jl_Math_min($newLength, var$4.length);
        var$2 = 0;
        while (var$2 < $capacity) {
            var$6[var$2] = var$4[var$2];
            var$2 = var$2 + 1 | 0;
        }
        $this.$buffer = var$5;
        return;
    }
},
jl_AbstractStringBuilder_toString = $this => {
    return jl_String__init_0($this.$buffer, 0, $this.$length0);
},
jl_AbstractStringBuilder_append2 = ($this, $chars, $offset, $len) => {
    return $this.$insert1($this.$length0, $chars, $offset, $len);
},
jl_AbstractStringBuilder_insert = ($this, $index, $chars, $offset, $len) => {
    let var$5, var$6, var$7, var$8;
    jl_AbstractStringBuilder_insertSpace($this, $index, $index + $len | 0);
    var$5 = $len + $offset | 0;
    while ($offset < var$5) {
        var$6 = $chars.data;
        var$7 = $this.$buffer.data;
        $len = $index + 1 | 0;
        var$8 = $offset + 1 | 0;
        var$7[$index] = var$6[$offset];
        $index = $len;
        $offset = var$8;
    }
    return $this;
},
jl_AbstractStringBuilder_append0 = ($this, $chars) => {
    return $this.$append3($chars, 0, $chars.data.length);
},
jl_AbstractStringBuilder_insertSpace = ($this, $start, $end) => {
    let var$3, $sz, $i, var$6;
    var$3 = $this.$length0;
    $sz = var$3 - $start | 0;
    $this.$ensureCapacity((var$3 + $end | 0) - $start | 0);
    $i = $sz - 1 | 0;
    while ($i >= 0) {
        var$6 = $this.$buffer.data;
        var$6[$end + $i | 0] = var$6[$start + $i | 0];
        $i = $i + (-1) | 0;
    }
    $this.$length0 = $this.$length0 + ($end - $start | 0) | 0;
},
jl_Appendable = $rt_classWithoutFields(0),
jl_StringBuilder = $rt_classWithoutFields(jl_AbstractStringBuilder),
jl_StringBuilder__init_2 = $this => {
    jl_AbstractStringBuilder__init_($this);
},
jl_StringBuilder__init_ = () => {
    let var_0 = new jl_StringBuilder();
    jl_StringBuilder__init_2(var_0);
    return var_0;
},
jl_StringBuilder__init_1 = ($this, $value) => {
    let var$2, var$3;
    $value = $value;
    $this.$buffer = $rt_createCharArray($value.$nativeString.length);
    var$2 = 0;
    while (true) {
        var$3 = $this.$buffer.data;
        if (var$2 >= var$3.length)
            break;
        var$3[var$2] = jl_String_charAt($value, var$2);
        var$2 = var$2 + 1 | 0;
    }
    $this.$length0 = $value.$nativeString.length;
},
jl_StringBuilder__init_0 = var_0 => {
    let var_1 = new jl_StringBuilder();
    jl_StringBuilder__init_1(var_1, var_0);
    return var_1;
},
jl_StringBuilder_append = ($this, $obj) => {
    let var$2, var$3;
    var$2 = $this.$length0;
    var$3 = $this;
    $obj = $obj === null ? $rt_s(0) : $obj.$toString();
    jl_StringBuilder_insert(var$3, var$2, $obj);
    return $this;
},
jl_StringBuilder_append1 = ($this, $string) => {
    let var$2;
    var$2 = $this.$length0;
    jl_StringBuilder_insert($this, var$2, $string);
    return $this;
},
jl_StringBuilder_append0 = ($this, $value) => {
    jl_AbstractStringBuilder_append1($this, $value, 10);
    return $this;
},
jl_StringBuilder_append2 = ($this, $c) => {
    jl_AbstractStringBuilder_append($this, $c);
    return $this;
},
jl_StringBuilder_delete = ($this, $start, $end) => {
    let var$3, var$4, var$5, var$6, var$7, var$8;
    if ($start >= 0) {
        var$3 = $rt_compare($start, $end);
        if (var$3 <= 0) {
            var$4 = $this.$length0;
            if ($start <= var$4) {
                if (var$3) {
                    if ($end > var$4)
                        $end = var$4;
                    var$5 = var$4 - $end | 0;
                    $this.$length0 = var$4 - ($end - $start | 0) | 0;
                    var$4 = 0;
                    while (var$4 < var$5) {
                        var$6 = $this.$buffer.data;
                        var$3 = $start + 1 | 0;
                        var$7 = $end + 1 | 0;
                        var$6[$start] = var$6[$end];
                        var$4 = var$4 + 1 | 0;
                        $start = var$3;
                        $end = var$7;
                    }
                }
                return $this;
            }
        }
    }
    var$8 = new jl_StringIndexOutOfBoundsException;
    jl_Throwable__init_0(var$8);
    $rt_throw(var$8);
},
jl_StringBuilder_deleteCharAt = ($this, $index) => {
    let var$2, var$3, var$4, var$5;
    if ($index >= 0) {
        var$2 = $this.$length0;
        if ($index < var$2) {
            var$2 = var$2 - 1 | 0;
            $this.$length0 = var$2;
            while ($index < var$2) {
                var$3 = $this.$buffer.data;
                var$4 = $index + 1 | 0;
                var$3[$index] = var$3[var$4];
                $index = var$4;
            }
            return $this;
        }
    }
    var$5 = new jl_StringIndexOutOfBoundsException;
    jl_Throwable__init_0(var$5);
    $rt_throw(var$5);
},
jl_StringBuilder_insert1 = ($this, var$1, var$2, var$3, var$4) => {
    jl_AbstractStringBuilder_insert($this, var$1, var$2, var$3, var$4);
    return $this;
},
jl_StringBuilder_append3 = ($this, var$1, var$2, var$3) => {
    jl_AbstractStringBuilder_append2($this, var$1, var$2, var$3);
    return $this;
},
jl_StringBuilder_length = $this => {
    return $this.$length0;
},
jl_StringBuilder_toString = $this => {
    return jl_AbstractStringBuilder_toString($this);
},
jl_StringBuilder_ensureCapacity = ($this, var$1) => {
    jl_AbstractStringBuilder_ensureCapacity($this, var$1);
},
jl_StringBuilder_insert0 = ($this, var$1, var$2) => {
    jl_AbstractStringBuilder_insert0($this, var$1, var$2);
    return $this;
},
jl_StringBuilder_insert = ($this, var$1, var$2) => {
    let var$3, var$4, var$5, var$6;
    if (var$1 >= 0 && var$1 <= $this.$length0) {
        a: {
            if (var$2 === null)
                var$2 = $rt_s(0);
            else if (jl_String_isEmpty(var$2))
                break a;
            var$3 = $this.$length0 + var$2.$nativeString.length | 0;
            jl_AbstractStringBuilder_ensureCapacity($this, var$3);
            var$4 = $this.$length0 - 1 | 0;
            while (var$4 >= var$1) {
                $this.$buffer.data[var$4 + var$2.$nativeString.length | 0] = $this.$buffer.data[var$4];
                var$4 = var$4 + (-1) | 0;
            }
            $this.$length0 = $this.$length0 + var$2.$nativeString.length | 0;
            var$3 = 0;
            while (var$3 < var$2.$nativeString.length) {
                var$5 = $this.$buffer.data;
                var$6 = var$1 + 1 | 0;
                var$5[var$1] = jl_String_charAt(var$2, var$3);
                var$3 = var$3 + 1 | 0;
                var$1 = var$6;
            }
        }
        return $this;
    }
    var$2 = new jl_StringIndexOutOfBoundsException;
    jl_Throwable__init_0(var$2);
    $rt_throw(var$2);
};
function jl_Throwable() {
    let a = this; jl_Object.call(a);
    a.$message2 = null;
    a.$cause = null;
    a.$suppressionEnabled = 0;
    a.$writableStackTrace = 0;
    a.$suppressed = null;
}
let jl_Throwable__init_0 = $this => {
    $this.$suppressed = $rt_createArray(jl_Throwable, 0);
    jl_Throwable_initNativeException($this);
    $this.$suppressionEnabled = 1;
    $this.$writableStackTrace = 1;
},
jl_Throwable__init_2 = () => {
    let var_0 = new jl_Throwable();
    jl_Throwable__init_0(var_0);
    return var_0;
},
jl_Throwable__init_ = ($this, $message) => {
    $this.$suppressed = $rt_createArray(jl_Throwable, 0);
    jl_Throwable_initNativeException($this);
    $this.$suppressionEnabled = 1;
    $this.$writableStackTrace = 1;
    $this.$message2 = $message;
},
jl_Throwable__init_1 = var_0 => {
    let var_1 = new jl_Throwable();
    jl_Throwable__init_(var_1, var_0);
    return var_1;
},
jl_Throwable_fillInStackTrace = $this => {
    return $this;
},
jl_Throwable_initNativeException = $this => {
    $rt_fillNativeException($this);
},
jl_Throwable_getMessage = $this => {
    return $this.$message2;
},
jl_Throwable_getCause = $this => {
    let var$1;
    var$1 = $this.$cause;
    if (var$1 === $this)
        var$1 = null;
    return var$1;
},
jl_Exception = $rt_classWithoutFields(jl_Throwable),
jl_RuntimeException = $rt_classWithoutFields(jl_Exception),
jl_RuntimeException__init_0 = ($this, $message) => {
    jl_Throwable__init_($this, $message);
},
jl_RuntimeException__init_ = var_0 => {
    let var_1 = new jl_RuntimeException();
    jl_RuntimeException__init_0(var_1, var_0);
    return var_1;
},
otrr_ReflectionInfo = $rt_classWithoutFields(),
otrr_ClassInfo = $rt_classWithoutFields(otrr_ReflectionInfo),
otrr_ClassInfo_newArrayInstance = (var$0, var$1) => {
    switch (var$0.primitiveKind) {
        default: return $rt_createArray(var$0, var$1);
    }
},
otr_StringInfo = $rt_classWithoutFields(otrr_ReflectionInfo),
cgmv_GameView = $rt_classWithoutFields(0);
function w_DealBrowser() {
    let a = this; jl_Object.call(a);
    a.$payments = null;
    a.$controller = null;
    a.$choice = null;
    a.$notice = null;
}
let w_DealBrowser_match = null,
w_DealBrowser_$callClinit = () => {
    w_DealBrowser_$callClinit = $rt_eraseClinit(w_DealBrowser);
    w_DealBrowser__clinit_();
},
w_DealBrowser_run = (var$0, var$1) => {
    let $error, $$je;
    var$0.$notice = $rt_s(3);
    a: {
        b: {
            try {
                if (var$0.$choice === null)
                    var$1.$run();
                w_DealBrowser_settlePayments(var$0);
                break a;
            } catch ($$e) {
                $$je = $rt_wrapException($$e);
                if ($$je instanceof jl_RuntimeException) {
                    $error = $$je;
                    break b;
                } else {
                    throw $$e;
                }
            }
        }
        var$0.$notice = $error.$getMessage() !== null ? $error.$getMessage() : $rt_s(16);
    }
    return w_DealBrowser_state(var$0);
},
w_DealBrowser_human = $this => {
    return ju_Collections$9_get((cgmc_GameController_getSnapshot($this.$controller)).$players, 0);
},
w_DealBrowser_bot = $this => {
    return ju_Collections$9_get((cgmc_GameController_getSnapshot($this.$controller)).$players, 1);
},
w_DealBrowser_requireHumanPlay = $this => {
    let $snapshot, var$2;
    $snapshot = cgmc_GameController_getSnapshot($this.$controller);
    if (cgmmg_Player_equals(w_DealBrowser_human($this), $snapshot.$currentPlayer)) {
        var$2 = $snapshot.$turnState0;
        cgmmg_TurnState_$callClinit();
        if (var$2 === cgmmg_TurnState_PLAYING_CARDS)
            return;
    }
    var$2 = new jl_IllegalStateException;
    jl_Throwable__init_(var$2, $rt_s(17));
    $rt_throw(var$2);
},
w_DealBrowser_find = ($cards, $id) => {
    let var$3;
    w_DealBrowser_$callClinit();
    $cards = ju_Collection_stream($cards);
    var$3 = new w_DealBrowser$find$lambda$_12_0;
    var$3.$_046 = $id;
    return ju_Optional_orElseThrow(jusi_SimpleStreamImpl_findFirst(jusi_SimpleStreamImpl_filter($cards, var$3)), new w_DealBrowser$find$lambda$_12_1);
},
w_DealBrowser_settlePayments = $this => {
    let $request, var$2, var$3, var$4, var$5, $checked, var$7, var$8, var$9, var$10, var$11, var$12, var$13, var$14, var$15, var$16, var$17, var$18;
    while ($this.$choice === null && !ju_ArrayDeque_isEmpty($this.$payments)) {
        $request = ju_ArrayDeque_removeFirst($this.$payments);
        var$2 = $this.$controller.$paymentFlow;
        cgmcf_ControllerState_requireGame(var$2.$state3);
        if ($request.$justSayNoChecked)
            var$3 = 0;
        else {
            var$4 = $request.$payer;
            var$5 = $request.$payee;
            if (!cgmcf_ReactionFlowService_resolveJustSayNoChain(var$2.$reactionFlow, var$5, var$4, cgmcf_PaymentFlowService_describePayment(var$2, $request)))
                var$3 = 0;
            else {
                $checked = var$2.$state3.$view0;
                var$7 = var$4.$name;
                var$8 = new jl_StringBuilder;
                jl_AbstractStringBuilder__init_(var$8);
                jl_StringBuilder_append(jl_StringBuilder_append(var$8, var$7), $rt_s(18));
                $checked.$notice = jl_AbstractStringBuilder_toString(var$8);
                cgmcf_ControllerState_refresh(var$2.$state3);
                var$3 = 1;
            }
        }
        if (var$3)
            continue;
        $checked = cgmep_PaymentRequest__init_0($request.$payer, $request.$payee, $request.$amount, $request.$selectedCards2, $request.$reason, 1);
        $request = $this.$controller;
        var$8 = $checked.$payer;
        $request = $request.$paymentFlow;
        cgmcf_ControllerState_requireGame($request.$state3);
        var$8 = cgmep_PaymentService_getPaymentCandidates($request.$state3.$paymentService, var$8);
        if (ju_AbstractCollection_isEmpty(var$8))
            cgmc_GameController_makePayment($this.$controller, cgmep_PaymentRequest_withSelectedCards($checked, ju_List_of()));
        else {
            var$2 = $checked.$payer.$type;
            cgmmg_PlayerType_$callClinit();
            if (var$2 !== cgmmg_PlayerType_COMPUTER) {
                var$3 = $checked.$amount;
                var$2 = new jl_StringBuilder;
                jl_AbstractStringBuilder__init_(var$2);
                jl_StringBuilder_append(jl_StringBuilder_append0(jl_StringBuilder_append(var$2, $rt_s(19)), var$3), $rt_s(20));
                var$5 = jl_AbstractStringBuilder_toString(var$2);
                var$2 = ju_Collection_stream(var$8);
                var$7 = new w_DealBrowser$settlePayments$lambda$_16_0;
                var$7.$_04 = $checked;
                var$2 = jus_Stream_toList(jusi_SimpleStreamImpl_map(var$2, var$7));
                var$9 = ju_TemplateCollections$ImmutableArrayList_size(var$8);
                var$10 = $checked.$amount;
                var$7 = new w_DealBrowser$settlePayments$lambda$_16_1;
                var$7.$_056 = $this;
                var$7.$_120 = var$8;
                var$7.$_27 = $checked;
                w_DealBrowser_showChoices($this, $rt_s(21), var$5, var$2, 1, var$9, 1, var$10, var$7);
            } else {
                $request = $this.$controller;
                var$11 = $checked.$amount;
                var$7 = ju_ArrayList__init_0(var$8);
                var$2 = ju_Comparator_comparingInt(new w_BotPayment$findBestPayment$lambda$_1_0);
                var$8 = new ju_Comparator$reversed$lambda$_1_0;
                var$8.$_071 = var$2;
                var$5 = var$7;
                var$12 = var$5.$array;
                var$10 = var$5.$size0;
                if (0 > var$10) {
                    $request = new jl_IllegalArgumentException;
                    jl_Throwable__init_0($request);
                    $rt_throw($request);
                }
                var$13 = $rt_createArray(jl_Object, var$10 - 0 | 0);
                var$14 = var$13.data;
                var$15 = 0;
                while (var$15 < var$10) {
                    var$14[var$15 - 0 | 0] = var$12.data[var$15];
                    var$15 = var$15 + 1 | 0;
                }
                ju_Arrays_sort(var$13, var$8);
                var$3 = 0;
                while (var$3 < var$10) {
                    var$12.data[var$3] = var$14[var$3 - 0 | 0];
                    var$3 = var$3 + 1 | 0;
                }
                var$5.$modCount = var$5.$modCount + 1 | 0;
                var$4 = ju_ArrayList__init_();
                var$3 = 0;
                var$9 = 0;
                var$15 = 0;
                a: {
                    b: {
                        while (true) {
                            if (var$15 >= var$5.$size0)
                                break b;
                            var$2 = ju_ArrayList_get(var$5, var$15);
                            ju_ArrayList_add(var$4, var$2);
                            var$3 = var$3 + var$2.$value | 0;
                            var$15 = var$15 + 1 | 0;
                            if (var$3 >= var$11)
                                break;
                            var$9 = var$15;
                        }
                        break a;
                    }
                    var$15 = var$9;
                }
                if (var$3 < var$11)
                    var$2 = ju_ArrayList__init_0(var$7);
                else {
                    var$2 = ju_ArrayList__init_0(var$4);
                    var$9 = var$4.$size0 - 1 | 0;
                    var$10 = var$3;
                    while (var$9 >= 0) {
                        var$16 = var$3 - (ju_ArrayList_get(var$4, var$9)).$value | 0;
                        var$8 = ju_ArrayList__init_0(var$4);
                        ju_ArrayList_remove(var$8, var$9);
                        if (var$16 >= var$11) {
                            var$2 = ju_ArrayList__init_0(var$8);
                            var$4 = ju_ArrayList__init_0(var$8);
                            var$10 = var$16;
                        } else {
                            var$17 = var$15;
                            while (var$17 < var$5.$size0) {
                                var$7 = ju_ArrayList_get(var$5, var$17);
                                var$18 = var$16 + var$7.$value | 0;
                                if (var$18 >= var$11 && var$18 < var$10) {
                                    var$2 = ju_ArrayList__init_0(var$8);
                                    ju_ArrayList_add(var$2, var$7);
                                    var$10 = var$18;
                                }
                                var$17 = var$17 + 1 | 0;
                            }
                            var$16 = var$3;
                        }
                        var$9 = var$9 + (-1) | 0;
                        var$3 = var$16;
                    }
                }
                cgmc_GameController_makePayment($request, cgmep_PaymentRequest_withSelectedCards($checked, var$2));
            }
        }
    }
},
w_DealBrowser_showChoices = ($this, $title, $help, $options, $min, $max, $required, $amount, $onSelected) => {
    let var$9;
    if ($options.$size() >= $min) {
        var$9 = new w_DealBrowser$Choice;
        var$9.$title = $title;
        var$9.$help = $help;
        var$9.$options = $options;
        var$9.$min1 = $min;
        var$9.$max2 = $max;
        var$9.$required = $required;
        var$9.$amount0 = $amount;
        var$9.$onSelected = $onSelected;
        $this.$choice = var$9;
        return;
    }
    $title = new jl_IllegalArgumentException;
    jl_Throwable__init_($title, $rt_s(22));
    $rt_throw($title);
},
w_DealBrowser_showMessage = ($this, $message) => {
    $this.$notice = $message;
},
w_DealBrowser_promptDiscard = ($this, $player, $count) => {
    let $cards, var$4, var$5, var$6;
    $cards = cgmmc_AbstractCardCollection_getCards($player.$hand);
    var$4 = new jl_StringBuilder;
    jl_AbstractStringBuilder__init_(var$4);
    jl_StringBuilder_append(jl_StringBuilder_append0(jl_StringBuilder_append(var$4, $rt_s(23)), $count), $rt_s(24));
    var$5 = jl_AbstractStringBuilder_toString(var$4);
    var$6 = ju_Collection_stream($cards);
    var$4 = new w_DealBrowser$promptDiscard$lambda$_24_0;
    var$4 = jus_Stream_toList(jusi_SimpleStreamImpl_map(var$6, var$4));
    var$6 = new w_DealBrowser$promptDiscard$lambda$_24_1;
    var$6.$_051 = $this;
    var$6.$_117 = $player;
    var$6.$_26 = $cards;
    w_DealBrowser_showChoices($this, $rt_s(25), var$5, var$4, $count, $count, 1, 0, var$6);
},
w_DealBrowser_promptColorSelection = ($this, $active, $title, $message, $colors, $onSelected) => {
    $active = ju_Collection_stream($colors);
    $colors = new w_DealBrowser$promptColorSelection$lambda$_26_0;
    $active = jus_Stream_toList(jusi_SimpleStreamImpl_map($active, $colors));
    $colors = new w_DealBrowser$promptColorSelection$lambda$_26_1;
    $colors.$_035 = $onSelected;
    w_DealBrowser_showChoices($this, $title, $message, $active, 1, 1, 0, 0, $colors);
},
w_DealBrowser_promptCardSelection = ($this, $active, $owner, $title, $message, $cards, $min, $max, $onSelected) => {
    $owner = ju_Collection_stream($cards);
    $active = new w_DealBrowser$promptCardSelection$lambda$_27_0;
    $owner = jus_Stream_toList(jusi_SimpleStreamImpl_map($owner, $active));
    $active = new w_DealBrowser$promptCardSelection$lambda$_27_1;
    $active.$_048 = $onSelected;
    $active.$_115 = $cards;
    w_DealBrowser_showChoices($this, $title, $message, $owner, $min, $max, 0, 0, $active);
},
w_DealBrowser_state = $this => {
    let $snapshot, var$2, var$3, var$4, var$5, var$6, var$7;
    $snapshot = cgmc_GameController_getSnapshot($this.$controller);
    var$2 = $rt_createArray(jl_Object, 20);
    var$3 = var$2.data;
    var$3[0] = $rt_s(26);
    var$3[1] = ju_List_of1(w_DealBrowser_playerData($this, w_DealBrowser_human($this), 1), w_DealBrowser_playerData($this, w_DealBrowser_bot($this), 0));
    var$3[2] = $rt_s(27);
    var$3[3] = jl_Integer_valueOf($snapshot.$currentPlayerIndex0);
    var$3[4] = $rt_s(28);
    var$3[5] = $snapshot.$turnState0.$name1;
    var$3[6] = $rt_s(29);
    var$3[7] = jl_Integer_valueOf($snapshot.$deckSize);
    var$3[8] = $rt_s(30);
    var$3[9] = jl_Integer_valueOf($snapshot.$discardSize);
    var$3[10] = $rt_s(31);
    var$3[11] = jl_Integer_valueOf($snapshot.$remainingPlays);
    var$3[12] = $rt_s(32);
    var$4 = $snapshot.$winner;
    var$3[13] = var$4 === null ? null : var$4.$name;
    var$3[14] = $rt_s(33);
    var$5 = $this.$choice;
    if (var$5 === null)
        var$4 = null;
    else {
        var$6 = $rt_createArray(jl_Object, 14);
        var$7 = var$6.data;
        var$7[0] = $rt_s(34);
        var$7[1] = var$5.$title;
        var$7[2] = $rt_s(35);
        var$7[3] = var$5.$help;
        var$7[4] = $rt_s(36);
        $snapshot = ju_Collection_stream(var$5.$options);
        var$4 = new w_DealBrowser$Choice$data$lambda$_1_0;
        var$7[5] = jus_Stream_toList(jusi_SimpleStreamImpl_map($snapshot, var$4));
        var$7[6] = $rt_s(37);
        var$7[7] = jl_Integer_valueOf(var$5.$min1);
        var$7[8] = $rt_s(38);
        var$7[9] = jl_Integer_valueOf(var$5.$max2);
        var$7[10] = $rt_s(39);
        var$7[11] = jl_Boolean_valueOf(var$5.$required);
        var$7[12] = $rt_s(40);
        var$7[13] = jl_Integer_valueOf(var$5.$amount0);
        var$4 = w_Wire_object(var$6);
    }
    var$3[15] = var$4;
    var$3[16] = $rt_s(41);
    var$3[17] = $this.$notice;
    var$3[18] = $rt_s(42);
    var$3[19] = jl_AbstractStringBuilder_toString($this.$controller.$state2.$actionLog);
    return w_Wire_encode(w_Wire_object(var$2));
},
w_DealBrowser_playerData = ($this, $player, $own) => {
    let $bank, $sets, var$5, var$6, var$7, var$8;
    $bank = cgmmc_AbstractCardCollection_getCards($player.$bank);
    $sets = cgmmc_PropertyCollection_getSets($player.$properties);
    var$5 = $rt_createArray(jl_Object, 14);
    var$6 = var$5.data;
    var$6[0] = $rt_s(43);
    var$6[1] = $player.$name;
    var$6[2] = $rt_s(44);
    var$6[3] = jl_Integer_valueOf(cgmmc_AbstractCardCollection_size($player.$hand));
    var$6[4] = $rt_s(45);
    if (!$own)
        var$7 = ju_List_of();
    else {
        var$8 = ju_Collection_stream(cgmmc_AbstractCardCollection_getCards($player.$hand));
        var$7 = new w_DealBrowser$playerData$lambda$_32_0;
        var$7 = jus_Stream_toList(jusi_SimpleStreamImpl_map(var$8, var$7));
    }
    var$6[5] = var$7;
    var$6[6] = $rt_s(46);
    $bank = $bank;
    var$8 = ju_Collection_stream($bank);
    var$7 = new w_DealBrowser$playerData$lambda$_32_1;
    var$6[7] = jus_Stream_toList(jusi_SimpleStreamImpl_map(var$8, var$7));
    var$6[8] = $rt_s(47);
    $bank = ju_Collection_stream($bank);
    var$7 = new w_DealBrowser$playerData$lambda$_32_2;
    var$6[9] = jl_Integer_valueOf(jusi_SimpleIntStreamImpl_sum(jusi_SimpleStreamImpl_mapToInt($bank, var$7)));
    var$6[10] = $rt_s(48);
    var$6[11] = jl_Integer_valueOf(ju_TemplateCollections$ImmutableArrayList_size(cgmmc_PropertyCollection_getCompletedSets($player.$properties)));
    var$6[12] = $rt_s(49);
    $player = ju_Collection_stream($sets);
    var$7 = new w_DealBrowser$playerData$lambda$_32_3;
    var$6[13] = jus_Stream_toList(jusi_SimpleStreamImpl_map($player, var$7));
    return w_Wire_object(var$5);
},
w_DealBrowser_option = ($card, $zone) => {
    w_DealBrowser_$callClinit();
    return w_DealBrowser$Option__init_0($card.$id.$value4, $card.$name0, $zone, $card.$value);
},
w_DealBrowser_cardData = $card => {
    let var$2, var$3;
    w_DealBrowser_$callClinit();
    var$2 = $rt_createArray(jl_Object, 12);
    var$3 = var$2.data;
    var$3[0] = $rt_s(50);
    var$3[1] = $card.$id.$value4;
    var$3[2] = $rt_s(43);
    var$3[3] = $card.$name0;
    var$3[4] = $rt_s(51);
    var$3[5] = jl_Integer_valueOf($card.$value);
    var$3[6] = $rt_s(52);
    var$3[7] = $card.$type1.$name1;
    var$3[8] = $rt_s(53);
    var$3[9] = $card.$description;
    var$3[10] = $rt_s(54);
    var$3[11] = jl_Boolean_valueOf($card.$canBeBanked());
    return w_Wire_object(var$2);
},
w_DealBrowser_start$exported$0 = () => {
    let var$1, var$2, var$3, var$4, var$5, var$6, var$7, var$8, var$9;
    w_DealBrowser_$callClinit();
    var$1 = new w_DealBrowser;
    var$1.$payments = ju_ArrayDeque__init_();
    var$1.$notice = $rt_s(3);
    w_DealBrowser_match = var$1;
    var$2 = new cgmc_GameController;
    var$3 = new cgmcf_ControllerState;
    var$3.$paymentService = new cgmep_PaymentService;
    var$3.$winCondition = new cgme_StandardWinCondition;
    var$4 = new cgmea_ActionCardExecutor;
    var$5 = new cgme_StandardRentCalculator;
    var$6 = ju_EnumMap__init_($rt_cls(cgmmc_ActionType));
    var$4.$effects = var$6;
    cgmmc_ActionType_$callClinit();
    var$7 = cgmmc_ActionType_SLY_DEAL;
    var$8 = new cgmea_SlyDealEffect;
    ju_EnumMap_put(var$6, var$7, var$8);
    var$6 = var$4.$effects;
    var$7 = cgmmc_ActionType_FORCED_DEAL;
    var$8 = new cgmea_ForcedDealEffect;
    ju_EnumMap_put(var$6, var$7, var$8);
    var$6 = var$4.$effects;
    var$7 = cgmmc_ActionType_DEBT_COLLECTOR;
    var$8 = new cgmea_DebtCollectorEffect;
    ju_EnumMap_put(var$6, var$7, var$8);
    var$6 = var$4.$effects;
    var$7 = cgmmc_ActionType_ITS_MY_BIRTHDAY;
    var$8 = new cgmea_BirthdayEffect;
    ju_EnumMap_put(var$6, var$7, var$8);
    var$6 = var$4.$effects;
    var$7 = cgmmc_ActionType_RENT;
    var$8 = cgmea_RentEffect__init_(var$5);
    ju_EnumMap_put(var$6, var$7, var$8);
    var$6 = var$4.$effects;
    var$7 = cgmmc_ActionType_MULTI_COLOUR_RENT;
    var$8 = cgmea_RentEffect__init_(var$5);
    ju_EnumMap_put(var$6, var$7, var$8);
    var$5 = var$4.$effects;
    var$6 = cgmmc_ActionType_DOUBLE_THE_RENT;
    var$7 = new cgmea_DoubleRentEffect;
    ju_EnumMap_put(var$5, var$6, var$7);
    var$5 = var$4.$effects;
    var$6 = cgmmc_ActionType_PASS_GO;
    var$7 = new cgmea_PassGoEffect;
    ju_EnumMap_put(var$5, var$6, var$7);
    var$5 = var$4.$effects;
    var$6 = cgmmc_ActionType_JUST_SAY_NO;
    var$7 = new cgmea_JustSayNoEffect;
    ju_EnumMap_put(var$5, var$6, var$7);
    var$5 = var$4.$effects;
    var$6 = cgmmc_ActionType_HOUSE;
    var$7 = new cgmea_BuildingEffect;
    ju_EnumMap_put(var$5, var$6, var$7);
    var$5 = var$4.$effects;
    var$6 = cgmmc_ActionType_HOTEL;
    var$7 = new cgmea_BuildingEffect;
    ju_EnumMap_put(var$5, var$6, var$7);
    var$5 = var$4.$effects;
    var$6 = cgmmc_ActionType_DEAL_BREAKER;
    var$7 = new cgmea_DealBreakerEffect;
    ju_EnumMap_put(var$5, var$6, var$7);
    var$3.$actionExecutor0 = var$4;
    var$5 = new cgme_EventBus;
    var$5.$listeners = ju_ArrayList__init_();
    var$3.$eventBus = var$5;
    var$5 = new jl_StringBuilder;
    jl_AbstractStringBuilder__init_(var$5);
    var$3.$actionLog = var$5;
    var$3.$view0 = var$1;
    var$2.$state2 = var$3;
    var$5 = new cgmcf_ReactionFlowService;
    var$5.$state5 = var$3;
    var$4 = new cgmcf_TurnFlowService;
    var$4.$state1 = var$3;
    var$2.$turnFlow = var$4;
    var$4 = new cgmcf_PaymentFlowService;
    var$4.$state3 = var$3;
    var$4.$reactionFlow = var$5;
    var$2.$paymentFlow = var$4;
    var$4 = new cgmcf_CardPlayFlowService;
    var$4.$state0 = var$3;
    var$4.$reactionFlow0 = var$5;
    var$2.$cardPlayFlow = var$4;
    var$1.$controller = var$2;
    var$1 = w_DealBrowser_match.$controller;
    var$2 = ju_List_of0($rt_s(55));
    var$3 = ju_List_of0($rt_s(56));
    var$5 = new cgme_GameInitializer;
    var$4 = new cgme_CardFactory;
    cgme_CardFactory_$callClinit();
    var$5.$cardFactory = var$4;
    var$4 = ju_ArrayList__init_0(var$2);
    ju_AbstractCollection_addAll(var$4, var$3);
    var$3 = new cgmmg_Game;
    var$3.$players0 = ju_ArrayList__init_();
    var$2 = new cgmmg_GameRules;
    var$2.$initialHandSize = 5;
    var$2.$normalDrawCount = 2;
    var$2.$emptyHandDrawCount = 5;
    var$2.$maxCardsPlayedPerTurn = 3;
    var$2.$maxHandSizeAtTurnEnd = 7;
    var$2.$requiredCompleteSetsToWin = 3;
    var$3.$rules = var$2;
    var$2 = new cgmmc_Deck;
    var$2.$drawPile = ju_ArrayDeque__init_();
    var$3.$deck = var$2;
    var$2 = new cgmmc_DiscardPile;
    cgmmc_AbstractCardCollection__init_(var$2);
    var$3.$discardPile = var$2;
    cgmmg_TurnState_$callClinit();
    var$3.$turnState = cgmmg_TurnState_NOT_STARTED;
    var$2 = ju_ArrayList__init_();
    var$9 = 0;
    var$8 = var$4;
    while (var$9 < ju_ArrayList_size(var$8)) {
        if (var$9 >= 1) {
            cgmmg_PlayerType_$callClinit();
            var$4 = cgmmg_PlayerType_COMPUTER;
        } else {
            cgmmg_PlayerType_$callClinit();
            var$4 = cgmmg_PlayerType_HUMAN;
        }
        var$6 = cgmmg_Player__init_(ju_ArrayList_get(var$8, var$9), var$4);
        ju_ArrayList_add(var$2, var$6);
        var$9 = var$9 + 1 | 0;
    }
    var$4 = var$5.$cardFactory;
    var$6 = ju_ArrayList__init_();
    cgme_CardFactory_addCopies(var$4, var$6, 6, new cgme_CardFactory$addMoneyCards$lambda$_3_0);
    cgme_CardFactory_addCopies(var$4, var$6, 5, new cgme_CardFactory$addMoneyCards$lambda$_3_1);
    cgme_CardFactory_addCopies(var$4, var$6, 3, new cgme_CardFactory$addMoneyCards$lambda$_3_2);
    cgme_CardFactory_addCopies(var$4, var$6, 3, new cgme_CardFactory$addMoneyCards$lambda$_3_3);
    cgme_CardFactory_addCopies(var$4, var$6, 2, new cgme_CardFactory$addMoneyCards$lambda$_3_4);
    cgme_CardFactory_addCopies(var$4, var$6, 1, new cgme_CardFactory$addMoneyCards$lambda$_3_5);
    cgme_CardFactory_addPropertyCards(var$4, var$6);
    cgme_CardFactory_addWildcardCards(var$4, var$6);
    cgme_CardFactory_addActionCards(var$4, var$6);
    cgme_CardFactory_addRentCards0(var$4, var$6);
    cgme_GameInitializer_initializeGame(var$5, var$3, var$2, var$6, 0);
    cgmc_GameController_startGame(var$1, var$3, $rt_s(57));
    cgmcf_ControllerState_setBotStrategy(var$1.$state2, cgma_SimpleBotStrategy__init_0(var$1));
    var$1 = w_DealBrowser_match;
    var$1.$notice = $rt_s(58);
    return $rt_ustr(w_DealBrowser_state(var$1));
},
w_DealBrowser_play$exported$1 = (var$1, var$2) => {
    let var$3, var$4;
    w_DealBrowser_$callClinit();
    var$1 = $rt_str(var$1);
    var$3 = var$2 ? 1 : 0;
    var$2 = w_DealBrowser_match;
    var$4 = new w_DealBrowser$play$lambda$_2_0;
    var$4.$_061 = var$1;
    var$4.$_121 = var$3;
    return $rt_ustr(w_DealBrowser_run(var$2, var$4));
},
w_DealBrowser_moveWildcard$exported$2 = var$1 => {
    let var$2, var$3;
    w_DealBrowser_$callClinit();
    var$1 = $rt_str(var$1);
    var$2 = w_DealBrowser_match;
    var$3 = new w_DealBrowser$moveWildcard$lambda$_3_0;
    var$3.$_026 = var$1;
    return $rt_ustr(w_DealBrowser_run(var$2, var$3));
},
w_DealBrowser_endTurn$exported$3 = () => {
    w_DealBrowser_$callClinit();
    return $rt_ustr(w_DealBrowser_run(w_DealBrowser_match, new w_DealBrowser$endTurn$lambda$_4_0));
},
w_DealBrowser_stepBot$exported$4 = () => {
    w_DealBrowser_$callClinit();
    return $rt_ustr(w_DealBrowser_run(w_DealBrowser_match, new w_DealBrowser$stepBot$lambda$_5_0));
},
w_DealBrowser_submit$exported$5 = var$1 => {
    let var$2, var$3, var$4, var$5, var$6, var$7, var$8, var$9;
    w_DealBrowser_$callClinit();
    var$1 = $rt_str(var$1);
    a: {
        var$2 = w_DealBrowser_match;
        var$3 = var$2.$choice;
        if (var$3 === null)
            var$1 = w_DealBrowser_state(var$2);
        else {
            if (jl_String_isEmpty(var$1))
                var$1 = ju_List_of();
            else {
                jur_AbstractSet_$callClinit();
                jur_AbstractSet_counter = 1;
                var$4 = new jur_Pattern;
                var$4.$backRefs = $rt_createArray(jur_FSet, 10);
                var$4.$globalGroupIndex = (-1);
                var$4.$compCount = (-1);
                var$4.$consCount = (-1);
                var$5 = new jur_Lexer;
                var$5.$mode = 1;
                var$5.$orig = $rt_s(59);
                var$5.$pattern0 = $rt_createCharArray($rt_s(59).$nativeString.length + 2 | 0);
                jl_System_fastArraycopy(jl_String_toCharArray($rt_s(59)), 0, var$5.$pattern0, 0, $rt_s(59).$nativeString.length);
                var$6 = var$5.$pattern0.data;
                var$7 = var$6.length;
                var$6[var$7 - 1 | 0] = 0;
                var$6[var$7 - 2 | 0] = 0;
                var$5.$patternFullLength = var$7;
                var$5.$flags0 = 0;
                jur_Lexer_movePointer(var$5);
                jur_Lexer_movePointer(var$5);
                var$4.$lexemes = var$5;
                var$4.$flags = 0;
                var$4.$start0 = jur_Pattern_processExpression(var$4, (-1), 0, null);
                if (jur_Lexer_isEmpty(var$4.$lexemes)) {
                    if (var$4.$needsBackRefReplacement)
                        var$4.$start0.$processSecondPass();
                    var$2 = var$4.$namedGroups;
                    if (var$2 !== null)
                        var$4.$namedGroups = ju_Collections_unmodifiableMap(var$2);
                    else {
                        ju_Collections_$callClinit();
                        var$4.$namedGroups = ju_Collections_EMPTY_MAP;
                    }
                    var$2 = var$1;
                    var$1 = ju_ArrayList__init_();
                    var$5 = jur_Matcher__init_0(var$4, var$2);
                    var$7 = 0;
                    var$8 = 0;
                    var$2 = var$2;
                    if (!var$2.$nativeString.length) {
                        var$6 = $rt_createArray(jl_String, 1);
                        var$6.data[0] = $rt_s(3);
                    } else {
                        while (jur_Matcher_find0(var$5)) {
                            var$7 = var$7 + 1 | 0;
                            ju_ArrayList_add(var$1, jl_String_substring(var$2, var$8, jur_MatchResultImpl_start(var$5.$matchResult, 0)));
                            var$8 = jur_MatchResultImpl_end0(var$5.$matchResult, 0);
                        }
                        ju_ArrayList_add(var$1, jl_String_substring(var$2, var$8, var$2.$nativeString.length));
                        var$9 = var$7 + 1 | 0;
                        while (true) {
                            var$9 = var$9 + (-1) | 0;
                            if (var$9 < 0)
                                break;
                            if ((ju_ArrayList_get(var$1, var$9)).$nativeString.length)
                                break;
                            ju_ArrayList_remove(var$1, var$9);
                        }
                        if (var$9 < 0)
                            var$9 = 0;
                        var$6 = $rt_createArray(jl_String, var$9);
                        var$6 = ju_AbstractCollection_toArray(var$1, var$6);
                    }
                    var$1 = ju_Arrays_asList(var$6);
                } else {
                    var$1 = new jur_PatternSyntaxException;
                    var$3 = var$4.$lexemes;
                    jur_PatternSyntaxException__init_0(var$1, $rt_s(3), var$3.$orig, var$3.$curToc);
                    $rt_throw(var$1);
                }
            }
            b: {
                if (var$1.$size() >= var$3.$min1 && var$1.$size() <= var$3.$max2) {
                    var$4 = var$1;
                    if (Long_eq(jusi_SimpleStreamImpl_count(jusi_DistinctStreamImpl__init_0(ju_Collection_stream(var$4))), Long_fromInt(var$1.$size()))) {
                        var$2 = ju_Collection_stream(var$4);
                        var$4 = w_DealBrowser$submit$lambda$_6_0__init_0(var$3);
                        if (!jusi_SimpleStreamImpl_anyMatch(var$2, var$4))
                            break b;
                    }
                }
                var$1 = w_DealBrowser_match;
                var$1.$notice = $rt_s(60);
                var$1 = w_DealBrowser_state(var$1);
                break a;
            }
            var$2 = w_DealBrowser_match;
            var$2.$choice = null;
            var$1 = w_DealBrowser_run(var$2, w_DealBrowser$submit$lambda$_6_1__init_0(var$3, var$1));
        }
    }
    return $rt_ustr(var$1);
},
w_DealBrowser_cancel$exported$6 = () => {
    let var$1, var$2;
    w_DealBrowser_$callClinit();
    var$1 = w_DealBrowser_match;
    var$2 = var$1.$choice;
    if (var$2 !== null && !var$2.$required)
        var$1.$choice = null;
    return $rt_ustr(w_DealBrowser_state(var$1));
},
w_DealBrowser__clinit_ = () => {
    return;
},
jl_ClassCastException = $rt_classWithoutFields(jl_RuntimeException),
otp_Platform = $rt_classWithoutFields(),
otp_Platform_clone = var$1 => {
    let copy = new var$1.constructor();
    for (let field in var$1) {
        if (var$1.hasOwnProperty(field)) {
            copy[field] = var$1[field];
        }
    }
    return copy;
},
otji_JS = $rt_classWithoutFields(),
otci_IntegerUtil = $rt_classWithoutFields(),
ju_Comparator = $rt_classWithoutFields(0),
ju_Comparator_thenComparingInt = ($this, var$1) => {
    let var$2;
    var$2 = new ju_Comparator$thenComparingInt$lambda$_5_0;
    var$2.$_040 = $this;
    var$2.$_112 = var$1;
    return var$2;
},
ju_Comparator_comparingInt = $keyExtractor => {
    let var$2;
    var$2 = new ju_Comparator$comparingInt$lambda$_14_0;
    var$2.$_049 = $keyExtractor;
    return var$2;
},
jl_String$_clinit_$lambda$_118_0 = $rt_classWithoutFields(),
jl_Character = $rt_classWithoutFields(),
jl_Character_TYPE = null,
jl_Character_digitMapping = null,
jl_Character_upperCaseMapping = null,
jl_Character_lowerCaseMapping = null,
jl_Character_classMapping = null,
jl_Character_characterCache = null,
jl_Character_$$metadata$$0 = null,
jl_Character_$$metadata$$1 = null,
jl_Character_$$metadata$$3 = null,
jl_Character_$$metadata$$4 = null,
jl_Character_$callClinit = () => {
    jl_Character_$callClinit = $rt_eraseClinit(jl_Character);
    jl_Character__clinit_();
},
jl_Character_toString = $c => {
    let var$2, var$3;
    jl_Character_$callClinit();
    var$2 = new jl_String;
    var$3 = $rt_createCharArray(1);
    var$3.data[0] = $c;
    jl_String__init_1(var$2, var$3);
    return var$2;
},
jl_Character_isSupplementaryCodePoint = $codePoint => {
    jl_Character_$callClinit();
    return !($codePoint >= 65536 && $codePoint <= 1114111) ? 0 : 1;
},
jl_Character_isHighSurrogate = $ch => {
    jl_Character_$callClinit();
    return ($ch & 64512) != 55296 ? 0 : 1;
},
jl_Character_isLowSurrogate = $ch => {
    jl_Character_$callClinit();
    return ($ch & 64512) != 56320 ? 0 : 1;
};
let jl_Character_isSurrogatePair = ($high, $low) => {
    jl_Character_$callClinit();
    return !(jl_Character_isHighSurrogate($high) && jl_Character_isLowSurrogate($low)) ? 0 : 1;
},
jl_Character_toCodePoint = ($high, $low) => {
    jl_Character_$callClinit();
    return (($high & 1023) << 10 | $low & 1023) + 65536 | 0;
},
jl_Character_highSurrogate = $codePoint => {
    jl_Character_$callClinit();
    return (55296 | ($codePoint - 65536 | 0) >> 10 & 1023) & 65535;
},
jl_Character_lowSurrogate = $codePoint => {
    jl_Character_$callClinit();
    return (56320 | $codePoint & 1023) & 65535;
},
jl_Character_toLowerCase = $ch => {
    jl_Character_$callClinit();
    return jl_Character_toLowerCase0($ch) & 65535;
},
jl_Character_toLowerCase0 = $ch => {
    jl_Character_$callClinit();
    if (jl_Character_lowerCaseMapping === null) {
        if (jl_Character_$$metadata$$0 === null)
            jl_Character_$$metadata$$0 = jl_Character_acquireLowerCaseMapping$$create();
        jl_Character_lowerCaseMapping = otciu_UnicodeHelper_createCharMapping(otciu_UnicodeHelper_decodeCaseMapping((jl_Character_$$metadata$$0.value !== null ? $rt_str(jl_Character_$$metadata$$0.value) : null)));
    }
    return jl_Character_mapChar(jl_Character_lowerCaseMapping, $ch);
},
jl_Character_toUpperCase = $ch => {
    jl_Character_$callClinit();
    return jl_Character_toUpperCase0($ch) & 65535;
},
jl_Character_toUpperCase0 = $codePoint => {
    jl_Character_$callClinit();
    if (jl_Character_upperCaseMapping === null) {
        if (jl_Character_$$metadata$$1 === null)
            jl_Character_$$metadata$$1 = jl_Character_acquireUpperCaseMapping$$create();
        jl_Character_upperCaseMapping = otciu_UnicodeHelper_createCharMapping(otciu_UnicodeHelper_decodeCaseMapping((jl_Character_$$metadata$$1.value !== null ? $rt_str(jl_Character_$$metadata$$1.value) : null)));
    }
    return jl_Character_mapChar(jl_Character_upperCaseMapping, $codePoint);
},
jl_Character_mapChar = ($table, $codePoint) => {
    let $binSearchTable, var$4, var$5, var$6, $index, var$8;
    jl_Character_$callClinit();
    $binSearchTable = $table.$fastTable.data;
    if ($codePoint >= $binSearchTable.length) {
        $binSearchTable = $table.$binarySearchTable.data;
        var$4 = 0;
        var$5 = $binSearchTable.length;
        var$6 = (var$5 / 2 | 0) - 1 | 0;
        a: {
            b: {
                c: {
                    while (true) {
                        $index = (var$4 + var$6 | 0) / 2 | 0;
                        var$8 = $rt_compare($binSearchTable[$index * 2 | 0], $codePoint);
                        if (!var$8)
                            break;
                        if (var$8 <= 0) {
                            var$4 = $index + 1 | 0;
                            if (var$4 > var$6)
                                break b;
                        } else {
                            $index = $index - 1 | 0;
                            if ($index < var$4)
                                break c;
                            var$6 = $index;
                        }
                    }
                    break a;
                }
                break a;
            }
        }
        if ($index >= 0) {
            $index = $index * 2 | 0;
            if ($index < var$5)
                return $codePoint + $binSearchTable[$index + 1 | 0] | 0;
        }
        return 0;
    }
    return $codePoint + $binSearchTable[$codePoint] | 0;
},
jl_Character_digit = ($ch, $radix) => {
    let var$3, var$4, var$5, var$6, var$7, var$8, var$9, var$10, var$11, var$12;
    jl_Character_$callClinit();
    if (!($radix >= 2 && $radix <= 36))
        $ch = (-1);
    else {
        if (jl_Character_digitMapping === null) {
            if (jl_Character_$$metadata$$3 === null)
                jl_Character_$$metadata$$3 = jl_Character_obtainDigitMapping$$create();
            var$3 = (jl_Character_$$metadata$$3.value !== null ? $rt_str(jl_Character_$$metadata$$3.value) : null);
            var$4 = otci_CharFlow__init_(jl_String_toCharArray(var$3));
            var$5 = otci_Base46_decodeUnsigned(var$4);
            var$6 = $rt_createIntArray(var$5 * 2 | 0);
            var$7 = var$6.data;
            var$8 = 0;
            var$9 = 0;
            var$10 = 0;
            var$11 = 0;
            while (var$11 < var$5) {
                var$9 = var$9 + otci_Base46_decode(var$4) | 0;
                var$10 = var$10 + otci_Base46_decode(var$4) | 0;
                var$12 = var$8 + 1 | 0;
                var$7[var$8] = var$9;
                var$8 = var$12 + 1 | 0;
                var$7[var$12] = var$10;
                var$11 = var$11 + 1 | 0;
            }
            jl_Character_digitMapping = var$6;
        }
        var$6 = jl_Character_digitMapping.data;
        var$8 = 0;
        var$9 = (var$6.length / 2 | 0) - 1 | 0;
        a: {
            b: {
                while (var$9 >= var$8) {
                    var$10 = (var$8 + var$9 | 0) / 2 | 0;
                    var$11 = var$10 * 2 | 0;
                    var$5 = $rt_compare($ch, var$6[var$11]);
                    if (var$5 > 0)
                        var$8 = var$10 + 1 | 0;
                    else {
                        if (var$5 >= 0)
                            break b;
                        var$9 = var$10 - 1 | 0;
                    }
                }
                $ch = (-1);
                break a;
            }
            $ch = var$6[var$11 + 1 | 0];
        }
        if ($ch >= $radix)
            $ch = (-1);
    }
    return $ch;
},
jl_Character_forDigit = ($digit, $radix) => {
    jl_Character_$callClinit();
    if ($radix >= 2 && $radix <= 36 && $digit >= 0 && $digit < $radix)
        return $digit < 10 ? (48 + $digit | 0) & 65535 : ((97 + $digit | 0) - 10 | 0) & 65535;
    return 0;
},
jl_Character_toChars = $codePoint => {
    let var$2, var$3;
    jl_Character_$callClinit();
    if (!($codePoint >= 0 && $codePoint <= 1114111) ? 0 : 1) {
        if ($codePoint >= 65536)
            return $rt_createCharArrayFromData([jl_Character_highSurrogate($codePoint), jl_Character_lowSurrogate($codePoint)]);
        var$2 = $rt_createCharArray(1);
        var$2.data[0] = $codePoint & 65535;
        return var$2;
    }
    var$3 = new jl_IllegalArgumentException;
    jl_Throwable__init_0(var$3);
    $rt_throw(var$3);
},
jl_Character_getType0 = $c => {
    jl_Character_$callClinit();
    return jl_Character_getType($c);
},
jl_Character_getType = $codePoint => {
    let $u, $classes, $l, $i, $range;
    jl_Character_$callClinit();
    if (!($codePoint > 0 && $codePoint <= 65535) ? 0 : 1) {
        $u = $codePoint & 65535;
        if (!(!jl_Character_isHighSurrogate($u) && !jl_Character_isLowSurrogate($u)) ? 1 : 0)
            return 19;
    }
    if (jl_Character_classMapping === null) {
        if (jl_Character_$$metadata$$4 === null)
            jl_Character_$$metadata$$4 = jl_Character_obtainClasses$$create();
        jl_Character_classMapping = otciu_UnicodeHelper_extractRle((jl_Character_$$metadata$$4.value !== null ? $rt_str(jl_Character_$$metadata$$4.value) : null));
    }
    $classes = jl_Character_classMapping.data;
    $l = 0;
    $u = $classes.length - 1 | 0;
    while ($l <= $u) {
        $i = ($l + $u | 0) / 2 | 0;
        $range = $classes[$i];
        if ($codePoint >= $range.$end1)
            $l = $i + 1 | 0;
        else {
            $u = $range.$start2;
            if ($codePoint >= $u)
                return $range.$data2.data[$codePoint - $u | 0];
            $u = $i - 1 | 0;
        }
    }
    return 0;
},
jl_Character_isLetterOrDigit0 = $ch => {
    jl_Character_$callClinit();
    return jl_Character_isLetterOrDigit($ch);
},
jl_Character_isLetterOrDigit = $codePoint => {
    jl_Character_$callClinit();
    a: {
        switch (jl_Character_getType($codePoint)) {
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
            case 9:
                break;
            case 6:
            case 7:
            case 8:
                break a;
            default:
                break a;
        }
        return 1;
    }
    return 0;
},
jl_Character_isIdentifierIgnorable = $codePoint => {
    jl_Character_$callClinit();
    a: {
        if (!($codePoint >= 0 && $codePoint <= 8) && !($codePoint >= 14 && $codePoint <= 27)) {
            if ($codePoint < 127)
                break a;
            if ($codePoint > 159)
                break a;
        }
        return 1;
    }
    return jl_Character_getType($codePoint) != 16 ? 0 : 1;
},
jl_Character_isSpaceChar = $codePoint => {
    jl_Character_$callClinit();
    switch (jl_Character_getType($codePoint)) {
        case 12:
        case 13:
        case 14:
            break;
        default:
            return 0;
    }
    return 1;
},
jl_Character_isWhitespace = $codePoint => {
    jl_Character_$callClinit();
    switch ($codePoint) {
        case 9:
        case 10:
        case 11:
        case 12:
        case 13:
        case 28:
        case 29:
        case 30:
        case 31:
            break;
        case 160:
        case 8199:
        case 8239:
            return 0;
        default:
            return jl_Character_isSpaceChar($codePoint);
    }
    return 1;
},
jl_Character__clinit_ = () => {
    jl_Character_TYPE = $rt_cls($rt_charcls);
    jl_Character_characterCache = $rt_createArray(jl_Character, 128);
},
jl_Character_acquireLowerCaseMapping$$create = () => {
    return {"value" : "NY  H#F#U 4%F#O #F#/ d%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #a1# #%# #%# #%# %%# #%# #%# #%# #%# #%# #%# #%# %%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #<+#%# #%# #%# \'.3#%# #%# #{1#%# #w1%%# %J\'#k1#o1#%# #w1#!3# #23#*3#%# \'23#:3# #>3#%# #%# #%# #N3#%# #N3# %%# #N3#%# #J3%%# #%# #R3#%# \'%# /)#%# #)#%# #)#%# #%# #%# #%# #%# #%# #%# #%# #%# %%# #%# #%# #%# #%# #%# #%# #%# #%# %)#%# #%# #8)#L%#%# #%# #%# #"
    + "%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #a+# #%# #%# #%# #%# #%# #%# #%# #%# #%# /B45#%# #,/#645# %%# #P1#!\'#*\'#%# #%# #%# #%# #%# <-%# #%# \'%# 1&++ %_## #Z#)k%%g%% #F#W hA# 1%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# +]%# %%# #?#%# %a+\'N\'AF#b &#%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# 3%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #^#%# #%# #%# #%# #%# #%# #%# %%# #%# #%# #%# #%# #%# #%# #%"
    + "# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# %*%p kB#oq-&# _?gejg#A1 a$#%# -mo%&# {-%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# 3,4/# #%# #%"
    + "# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# 3C1 1C1 1C1 1C1 1C1 3C/ 1C1 QC1 1C1 1C1 1C%8\'%G# 7i\')G# 7C%D)\' 7C%u)%?# 7X+%P+%G# L-q*/# \'Pw/#8m/# -6## |bA G%# kC.#U !r*%&# &#%# #,05#qX\'#H.5# %%# #%# #%# #e25#D05#q25#m25# #%# %%# 1865%%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# "
    + "#%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# 1%# #%# )%# (a=%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# G%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# y%%# #%# #%# #%# #%# #%# #%# \'%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# 5%# #%# #4Fd#%# #%# #%# #%# #%# )%# #<{p# %%# #%# \'%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #P}p#}}p#m}p#D}p#P}p# #@yp#D{p#Lyp#Br#%# #%# #%"
    + "# #%# #%# #%# #%# #%# #,%#L}p#LJd#%# #%# #$$r#%# #%# #%# #%# #%# #%# #%# #%# #P6r#}!rI )%# :GL#) i,5F#U TUg#r {%g#r >\'c#p Lnk%F# .\'F#S HB#F#b o@5F#b F#2#W 4Z;%# /%# #%# %%# \'%# M%# #%# #%# #%# \'%# #%# #%# #%# #%# #%# #%# u.#N#f "};
},
jl_Character_acquireUpperCaseMapping$$create = () => {
    return {"value" : "L[  ,%H#U :#>b# vH#O #H#/:+# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #,5# #\'# #\'# #\'# %\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# %\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# %\'# #\'# #\'#(;#N1# %\'# #\'# %\'# \'\'# +\'# %6)# \'\'#*/#N6r# %_+# %\'# #\'# #\'# %\'# )\'# %\'# \'\'# #\'# %\'# \'\'# #J%# +\'#+# #\'#+# #\'#+# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'#L\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# %\'#+# #\'# \'\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'#"
    + " #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# \'\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# 1\'# %665% #\'# )\'# #\'# #\'# #\'# #\'#o25#c25#k25#03#}1# #y1% #m1# #q1#{}p# \'y1#k}p# #$3#!$r#:{p#N}p# #,3#43#N}p#*05#B}p# %43# #B05#<3# %@3# #{!r# ){!r#F.5# %P3# #J}p#P3# \'B{p#P3#$\'#L3%,\'# +T3# 5Jyp#>yp# Z\'_\'# x\'# #\'# \'\'\' #_+\' !#a##]#\' #H#CD##H#3m%#i%% #e%#P%# \'(%#D%#C# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'#i\'#P\'#=#(+# #4)# %\'# %\'# .#H#bP\'A #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# 3\'# #\'# #\'# #\'# #\'# #\'# "
    + "#\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# %\'# #\'# #\'# #\'# #\'# #\'# #\'#`# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'% &#,%n mB#ko%x %ko%\' RAC1 >$#yu+#uu+#Pu+#Hu+%Lu+#0u+#io+#>@d# #\'- (+2Fd# \'oX\'# AJJd# N%\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #"
    + "\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# +X%# +\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'#A1 1A1 1A1 1A1 1A1 3A# #A# #A# #A% /A1 16\'%g\')B)%V+%s)%N+)A1 1A1 1A1 1A% #E# 5<m-# )E# 9A% =A% \'=# ;E# R/8## ddA )\'# @E0#U Nr,%&# #\'# \'D4"
    + "5#845# #\'# #\'# #\'# -\'# %\'# 5\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# 1\'# #\'# )\'- /qq-&# i]=\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# G\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# y%\'# #\'# #\'# #\'# #\'# #\'# #\'# \'\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'#"
    + " #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# 5\'# #\'# %\'# #\'# #\'# #\'# #\'# )\'# )\'# #\'#*%# %\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# 7\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# )\'# #\'# %\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# U\'# REJ#% -Dr# Yiejg# e*5H#U eUi#r {%i#r <\'e#t {nm%:# V%H#^ >B#H#b o@5H#b <#4#P# eV;\'# /\'# #\'# %\'# \'\'# M\'# #\'# #\'# #\'# \'\'# #\'# #\'# #\'# #\'# #\'# #\'# Z0#P#f "};
},
jl_Character_obtainDigitMapping$$create = () => {
    return {"value" : "6G*% %%%%%%%%%%%%%%%%%%A%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%=,#%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%_H#T#%%%%%%%%%%%%%%%%%%s+G%%%%%%%%%%%%%%%%%%_1G%%%%%%%%%%%%%%%%%%{CG%%%%%%%%%%%%%%%%%%2+G%%%%%%%%%%%%%%%%%%2+G%%%%%%%%%%%%%%%%%%2+G%%%%%%%%%%%%%%%%%%2+G%%%%%%%%%%%%%%%%%%2+G%%%%%%%%%%%%%%%%%%2+G%%%%%%%%%%%%%%%%%%2+G%%%%%%%%%%%%%%%%%%2+G%%%%%%%%%%%%%%%%%%2+G%%%%%%%%%%%%%%%%%%6)G%%%%%%%%%%%%%%%%%%2+G%%%%%%%%%%%%%%%%%%*\'G%%%%%%%%%%%%%%%%%%.9G%%%%%%%%%%%%%%%%%%*\'G%%%%%%%%%%%%%%%%%%!i#G"
    + "%%%%%%%%%%%%%%%%%%c#G%%%%%%%%%%%%%%%%%%*;G%%%%%%%%%%%%%%%%%%Z+G%%%%%%%%%%%%%%%%%%:/G%%%%%%%%%%%%%%%%%%=G%%%%%%%%%%%%%%%%%%{/G%%%%%%%%%%%%%%%%%%k\'G%%%%%%%%%%%%%%%%%%s+G%%%%%%%%%%%%%%%%%%=G%%%%%%%%%%%%%%%%%%R@dG%%%%%%%%%%%%%%%%%%R[G%%%%%%%%%%%%%%%%%%c#G%%%%%%%%%%%%%%%%%%_1G%%%%%%%%%%%%%%%%%%!#G%%%%%%%%%%%%%%%%%%k\'G%%%%%%%%%%%%%%%%%%cCG%%%%%%%%%%%%%%%%%%o*IG%%%%%%%%%%%%%%%%%%A%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%=,#%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%c:#T#%%%%%%%%%%%%%%%%%%w&%G%%%%%"
    + "%%%%%%%%%%%%%=G%%%%%%%%%%%%%%%%%%_fG%%%%%%%%%%%%%%%%%%Z+G%%%%%%%%%%%%%%%%%%_%G%%%%%%%%%%%%%%%%%%>-G%%%%%%%%%%%%%%%%%%.9G%%%%%%%%%%%%%%%%%%w=G%%%%%%%%%%%%%%%%%%2+G%%%%%%%%%%%%%%%%%%>AG%%%%%%%%%%%%%%%%%%N)G%%%%%%%%%%%%%%%%%%=G%%%%%%%%%%%%%%%%%%%G%%%%%%%%%%%%%%%%%%B\'G%%%%%%%%%%%%%%%%%%FEG%%%%%%%%%%%%%%%%%%N)G%%%%%%%%%%%%%%%%%%oYG%%%%%%%%%%%%%%%%%%k\'G%%%%%%%%%%%%%%%%%%g5G%%%%%%%%%%%%%%%%%%*\'G%%%%%%%%%%%%%%%%%%F%G%%%%%%%%%%%%%%%%%%Z?G%%%%%%%%%%%%%%%%%%ow?G%%%%%%%%%%%%%%%%%%s4%G%%%%%%%%%%%%%%%%%%k\'G%%%%%%%%%%%%%%"
    + "%%%%s+G%%%%%%%%%%%%%%%%%%:OG%%%%%%%%%%%%%%%%%%c#G%%%%%%%%%%%%%%%%%%N&OG%%%%%%%%%%%%%%%%%%VZ%G%%%%%%%%%%%%%%%%%%%G%%%%%%%%%%%%%%%%%%%G%%%%%%%%%%%%%%%%%%%G%%%%%%%%%%%%%%%%%%%G%%%%%%%%%%%%%%%%%%!8%G%%%%%%%%%%%%%%%%%%FEG%%%%%%%%%%%%%%%%%%sKG%%%%%%%%%%%%%%%%%%k5G%%%%%%%%%%%%%%%%%%.lG%%%%%%%%%%%%%%%%%%wN)G%%%%%%%%%%%%%%%%%%"};
},
jl_Character_obtainClasses$$create = () => {
    return {"value" : "PA-Y$;Y$679:95Y#J+Y#Z$Y#B;697<8<C;6:7:PB-9[%=9<=&>:1=<=:L#<#Y#<,&?L$9B8:B(C9:C)!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!C#!#!#!#!#!#!#!#!C#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#B##!#!C$B##!#B##B$C#B%#B##B$C$B##B##!#!#B##!C#!#B##B$#!#B#C#&!C$F%!$#!$#!$#!#!#!#!#!#!#!#!C#!#!#!#!#!#!#!#!#!C#!$#!#B$#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!C(B##B#C#!#B%#!#!#!#!CgF#C;E3]%E-]/E&](%<%]2b\'Q! !#!#%<!#A#%C$9!A%]#!9B$ ! B##B2 B*CD!C#B$C$!#!#!#!#!#!#!#!#!#!#!#!C&!#:!#B#C#BTCQ!#!#!#!"
    + "#!#!#!#!#!#!#!#!#!#!#!#!#!#=G&H#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#B##!#!#!#!#!#!C#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!# BG E#Y\'CJ95E#^#; GN5\'9G#9G#9G$A\'F<A%F%Y#A,Q\'Z$Y#;Y#^#G,91Y$FA%F+G6J+Y%F#\'b&D! 9&G(1=G\'E#G#=G%F#J+F$^#&Y/ 1&\'F?G<A#b&:! G,&A/J+FBG*E#=Y$%A#\'[#F7G%%G*%G$%G&A#Y0 F:G$A#9 F,A&F9<F(Q#A&G*FJ%G91GA)FW\')\'&I$G)I%\'I#&G(F+G#Y#J+9%F0\'I#\'F)A#F#A#F7 F( &A$F%A#\'&I$G%A#I#A#I#\'&A))A%F# F$G#A#J+F#[#L\'=;&9\'& G#) F\'A%F#A#F7 F( F# F"
    + "# F#A#\' I$G#A%G#A#G$A$\'A(F% &A(J+G#F$\'9A+G#) F* F$ F7 F( F# F&A#\'&I$G& G#) I#\'A#&A0F#G#A#J+9;A(&G\' \'I# F)A#F#A#F7 F( F# F&A#\'&)\')G%A#I#A#I#\'A&G%)A%F# F$G#A#J+=&L\'A+\'& F\'A$F$ F%A$F# & F#A$F#A$F$A$F-A%I#\'I#A$I$ I$\'A#&A\')A/J+L$^\';=A&\'I$\'F) F$ F8 F1A#\'&G$I% G$ G%A(G# F$ F#A#F#G#A#J+A(9L(=&\'I#9F) F$ F8 F+ F&A#\'&)\'I& \'I# I#G#A(I#A&F$ F#G#A#J+ F#)A-G#I#F* F$ FJG#&I$G% I$ I$\'&=A%F$)L(F$G#A#J+L*=F\' \'I# F3A$F9 F* &A#F(A$\'A%I$G$ \' I)A\'J+A#I#9A-FQ\'F#G(A%;F\'%G)9J+Y#AFF# & F& F9 & F+\'F#G*&A#F& % G( J+A#F%AA&^$Y0=9^$G#^\'J"
    + "+L+=\'=\'=\'6767I#F) FEA%G/)G&9G#F&G, GE ^)\'^\' ^#Y&^%Y#AFFLI#G%)G\')G#I#G#&J+Y\'F\'I#G#F%G$&I$F#I(F$G%F.\'I#G#I\'\'&)J+I$\'^#BG !A&!A#CL9%C$b&*&  F%A#F( & F%A#FJ F%A#FB F%A#F( & F%A#F0 FZ F%A#FeA#G$Y*L5A$F1^+A\'b!7! A#C\'A#5b&M* =9F2-F;67A$FmY$K$F)A(F3G$)A*F4G#)Y#A*F3G#A-F. F$ G#A-FUG#)G(I)\'I#G,Y$%Y$;&\'A#J+A\'L+A\'Y\'5Y%G$1\'J+A\'FD%FWA\'F&G#FC\'&A&FhA+F@ G$I%G#I$A%I#\'I\'G$A%=A$Y#J+F?A#F&A,FMA%F;A\'J+,A$^CF8G#I#\'A#Y#FV)\')G( \')\'I#G)I\'G+A#\'J+A\'J+A\'Y(%Y\'A#G/(GSA0G%)FP\')G&)\'I&\'I#F) Y#J+Y(^+G*^*Y$G#)F?)G%I#G#)G$F#J+FM\')G#I$\')G$I#A)Y"
    + "%FEI)G)I#G#A$Y&J+A$F$J+F?E\'Y#C*!#A&BLA#B$Y)A)G$9G.)G(F%\'F\'\'F#)G#&A&CMEaC.%CCEFGb!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!C*!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!C*B)C\'A#B\'A#C)B)C)B)C\'A#B\'A#C) ! ! ! !C)B)C/A#C)D)C)D)C)D)C& C#B%$<#]$C$ C#B%$]$C%A#C#B% ]$C)B&]$A#C$ C#B%$]# M,Q&U\'Y#>?6_#?6>Y)./Q&-Y*>?Y%X#Y$:67Y,:98Y+-Q& Q+,%A#L\'Z$67%L+Z$67E2[FA,G."
    + "H%\'H$G-A0^#!^%!^##B$C#B$#=!^#:B&^\'!=!=!=B%=#B%#F%#^#C#B#Z&!C%=:^##=L1KD!#K%,^#A%Z&^&Z#^%:^#:^#:^(:^@Z#^#:=:^@b:-% ^)6767^5Z#^(67b=2! :^?Z:^IZ\'^jA7^,A6L^^pL7b=X# :^*:^WZ)b=P! :b=Y$ 67676767676767L?^MZ&67Z@6767676767Z1b= % b:$# 6767676767676767676767Za6767ZA67b:#% ^QZ6^#Z\'^HA#b=+# BQCQ!#B$C#!#!#!#B%#!C#!C\'E#B$#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!C#^\'!#!#G$!#A&Y%,Y#CG #A&#A#FYA(%9A/\'F8A*F( F( F( F( F( F( F( F( GAY#>?>?Y$>?9>?Y*5Y#59>?Y#>?67676767Y&%Y"
    + "+U#Y%596Y.^#Y$676767675A#Y#67A=^; b=:! A-b=7$ A;^1-Y$=%&+6767676767^#6767676756W#=K*G%I#5E&^#K$%&9^# b&7! A#G#]#E#&5b&;! 9E$&A&FL b&?!  ^#L%^+FA^GA*=F1^@ L+^?L)=L0^AL+^HL0b= & b& H!^bb&  %b&6)!%b&X2 A$^XA*FIE\'Y#b&-% %Y$F1J+F#A5!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#&\'H$9G+9%!#!#!#!#!#!#!#!#!#!#!#!#!#!#E#G#FhK+G#Y\'A)]8E*]#!#!#!#!#!#!#!C$!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#%C)!#!#B##!#!#!#!#%]#!#!#&!#!C$!#!#!#!#!#!#!#!#!#!#B&#B&#!#!#!#!#!#!#!#B%#!#B##!#!#!#!#!#!#!#B#A%!A/E%!#&"
    + "E##F(\'F$\'F%\'F8I#G#)^%\'A$L\'^#;=A\'FUY%A)I#FSI1G#A)Y#J+A\'G3F\'Y$&9F#\'J+F=G)Y#F8G,I#A,9F>A$G$)FP\'I#G%I#G#I$Y. %J+A%Y#F&\'%F*J+F& FJG\'I#G#I#G#A*F$\'F)\')A#J+A#Y%F1%F\'^$&)\')FS\'&G$F#G#F&G#&\'&A9F#%Y#F,)G#I#Y#&E#)\'A+F\'A#F\'A#F\'A*F( F( CL<E%C*%]#B#A#b#1! FDI#\'I#\'I#9)\'A#J+A\'b&EO#A-F8A%FRA%b4 A b3 E!b&O& A#b&K! AGC(A-C&A&&\'F+:F. F& & F# F# b&M! ]2^1b&L& 76^1Fb^#FW^)AAF-;^$G1Y(679A\'G19U#X#6767676767676767Y#67Y%X$Y$ Y%5676767Y$:5Z$ 9;Y#A%F& b&(# A#1 Y$;Y$679:95Y#J+Y#Z$Y#B;697<8<C;6:7:67967Y#F+%FNE#F@A$F\'A#F\'A#F\'A#F$A$[#:<=[# "
    + "=Z%^#A+Q$^#A#F- F; F4 F# F0A#F/ACb&]! A&Y$A%LNA$^*KVL%^2L#^$ ^.A$=AP^N\'b ## F>A$FRA0\'L<A%FAL%A*F5+F)+A&FGG&A&F? 9FEA%F)9K&AKBICIFpA#J+A\'BEA%CEA%FIA)FUA,9B, B0 B( B# C, C0 C( C#A$FUA-b&X% A*F7A+F)A9E\' EK E/AbF\'A#& FM F#A$&A#F8 9L)F8^#L(F@A)L*AQF4 F#A&L&F7L\'A$9F;A&9F;AGFYA%L#F#L1A#LO&G$ G#A&G%F% F$ F>A#G$A%\'L*A(Y*A(F>L#9F>L$AAF)=F=G#A%L&Y(A*FWA$Y(F7A#L)F4A&L)F3A(Y%A-L(b 1! FkAXBTA.CTA(L\'FEG%A)J+A\'J+F%%&B7A$G&5%C7A)Z#b 1$ L@ FK G#5A#F#A1F$%F# ]#G&9^)F7 G1F>L+&A)F7G,L%Y&A7F3G%Y%AGF6L(A5F8A*)\')FVG0Y(A%L5J+\'F#G#&"
    + "A*G$)FNI$G%I#G#Y#1Y%\'A+1A#F:A(J+A\'G$FEG&)G) J+Y%&I#&A)FD\'Y#&A*G#)FQI$G*I#F%Y%G%9)\'J+&9&Y$ L5A,F3 F:I$G$I#\')G#Y\'\'F#\'A`F( & F% F0 F+9A\'FP\'I$G)A&J+A\'G#I# F)A#F#A#F7 F( F# F& G#&I#\'I%A#I#A#I$A#&A\')A&F&I#A#G(A$G&A,F+ &A#& FG &I$G\' )A#) I% I#\')\'&\'&Y# Y#A)G#A>FVI$G)I#G$)\'F%Y&J+Y# 9\'F$A?FQI$G\')\'I%G#)G#F#9&A)J+b G# FPI$G%A#I%G#)G#Y8F%G#ACFQI$G)I#\')G#Y$&A,J+A\'Y.A4FL\')\'I#G\')\'&9A\'J+A\'J5A=F<A#\')\'I#G%)G&A%J+L#Y$=F(b Z# FMI$G*)G#9b E! BACAJ+L*A-F)A#&A#F) F# F9I\' I#A#G#)\'&)&)\'Y$A*J+AhF)A#FHI$G%A#G#I%\'&9&)A<&G+FIG\')&G%Y)\'A)"
    + "&G\'I#G$FOG.)G#Y$&Y&A.FkA(Y+&b 6! \')G$)\')b 9! FB9A/J+A\'F* FF)G( G\')\'&Y&A+J+L4A$Y#F?A#G7 )G()G#)G#AkF( F# FGG\'A$\' G# G(&\'A)J+A\'F\' F# FAI& G# I#\')\'&A(J+A\'FJ%F#A%J+b W$ F4G#I#Y#A(G#&)F. FCI#G&A$I#\')\'Y.J+\'b 6! &A0L6^)[%^2A.9b&;/ b G! b+Q! Y&K,b&%$ A-b+X% b *E b&B! Y#A.b&Q1 Q1\'F\'G0A+b&<` A&b&(* b ZK!F?G-I$G$J+b \'< b&Z) A(F@ J+A%Y#Fq J+A\'F?A#G&9A+FQG(Y&^%E%9=A+J+ L( F6A&F4b Q\' E$FIE#Y$J+A\'F9\'F%\'A#J+b 7# BACAL8Y%A&B:A#C:AMFmA%\'&IXA(G%E.AbE#9%\'A,I#E#K$A*b&<T!AEFCb @! b&T! A.b&3/ A/FTb >Y!E% E( E# b&J% A*&A>F$A#&A/F&"
    + "A(b&-\' b %E b&L! A&F.A$F*A(F+A#=G#9Q%b =_ b=Q$ J+^$A$b=U\' A\'^8 ^$A)Z$^1Z/A#GOA#G8A*b=U! A^b=W$ A+^HG#^^I#G$^$I\'Q)G)^#G(^?G%b=5# G$=A+I$^)G#^#)^AI#A`L5A-L5A-b=8! A*L:b (# B;C;B;C( C3B;C;! B#A#!A#B#A#B% B)C% # C( C,B;C;B# B%A#B) B( C;B# B% B& !A$B( C;B;C;B;C;B;C;B;C;B;C;B;C> B::C::C\'B::C::C\'B::C::C\'B::C::C\'B::C::C\'!#A#JSb= ) GX^%GS^)\'^/\'^#Y&A0G& G0b 1! Z>b D0 C+&CV!C(!#!C#!C$!C7!#!#!#!C$!#!#!#!#!#!#!#F#A/C(AWETG( G2A#G( G# G&A&E`AB\'b Q! FNA$G(E(A#J+A%&=b  & F?\'A2FMG%J+A&;b 1( F<%G%J+b 7$ F?G#&J+A%9b  $ F@ F$\'"
    + "F#\'F(G#F&\'A)&%b A$ F( F% F# F0 b&&$ A#L*G(AJBCCCG(%A%J+A%Y#b 2- L]=L$;L%AnLN=L0b #$ F% F< F# &A#& F+ F% & &A\'&A%& & & F$ F# &A#& & & & & F# &A#F% F( F% F% & F+ F2A&F$ F& F2AUZ#b /% ^MA%b=E! A-^0A#^0 ^0 ^FA+L.b=C# AX^>A.^MA%^*A(^#A/^\'b ;# b=]$ ]&b=;, A#^2A$^.A$b==$ A%^-A%^=A%^YA)^+A\'^IA)^?A#^-A%^#A/Z*AHb=9& A)^/A#^.A$^i =A$^3 ^.A$^-A&b=4#  b==! J+=b &1 b&  %b&  %b&A<#AAb&@%! b&/;!A#b&RU!A0b&O* b CG b&?) b C8 b&,.!A&b&K%#b   %b   %b \'O!b& R#b   %b   %b   %b   %b   %b   %b   %b   %b   %b   %b   %b   %b   %b   "
    + "%b   %b   %b   %b   %b   %b   %b   %b   %b   %b   %b   %b   %b   %b   %b   %b   %b   %b   %b   %b   %b   %b   %b   %b   %b   %b   %b !0 1A?b1A! b  # b\'Q$ b   %b   %b   %b 1Y$b3  %b3  %b3  %b3`a$A#b3  %b3  %b3  %b3`a$"};
},
ju_Objects = $rt_classWithoutFields(),
ju_Objects_equals = ($a, $b) => {
    if ($a !== $b)
        return $a !== null ? $a.$equals($b) : $b !== null ? 0 : 1;
    return 1;
},
ju_Objects_hashCode = $o => {
    return $o !== null ? $o.$hashCode() : 0;
},
ju_Objects_requireNonNull = $obj => {
    return ju_Objects_requireNonNull0($obj, $rt_s(3));
},
ju_Objects_requireNonNull0 = ($obj, $message) => {
    if ($obj === null) {
        $obj = new jl_NullPointerException;
        jl_Throwable__init_($obj, $message);
        $rt_throw($obj);
    }
    return $obj;
},
otji_JSWrapper = $rt_classWithoutFields();
function cgmc_GameController() {
    let a = this; jl_Object.call(a);
    a.$state2 = null;
    a.$turnFlow = null;
    a.$cardPlayFlow = null;
    a.$paymentFlow = null;
}
let cgmc_GameController_isCurrentPlayerBot = $this => {
    let var$1, var$2, var$3;
    var$1 = $this.$state2;
    var$2 = var$1.$game1 === null ? 0 : 1;
    a: {
        b: {
            if (var$2 && ju_Optional_isEmpty(cgmmg_Game_getWinner(cgmcf_ControllerState_game(var$1)))) {
                var$3 = (cgmmg_Game_getCurrentPlayer(cgmcf_ControllerState_game($this.$state2))).$type;
                cgmmg_PlayerType_$callClinit();
                if (var$3 === cgmmg_PlayerType_COMPUTER)
                    break b;
            }
            var$2 = 0;
            break a;
        }
        var$2 = 1;
    }
    return var$2;
},
cgmc_GameController_stepBotTurn = $this => {
    let $cmd, $snap, $me, var$4, var$5, $discards, var$7, $ex, $$je;
    cgmcf_ControllerState_requireGame($this.$state2);
    if (cgmc_GameController_isCurrentPlayerBot($this)) {
        $cmd = (cgmcf_ControllerState_game($this.$state2)).$turnState;
        cgmmg_TurnState_$callClinit();
        if ($cmd !== cgmmg_TurnState_GAME_OVER) {
            $snap = cgmc_GameController_getSnapshot($this);
            if ($snap.$turnState0 !== cgmmg_TurnState_PLAYING_CARDS && cgmmg_GameSnapshot_getTurnState($snap) !== cgmmg_TurnState_DISCARDING) {
                $cmd = $this.$state2;
                $snap = jl_String_valueOf(cgmmg_GameSnapshot_getTurnState($snap));
                $me = jl_StringBuilder__init_();
                jl_StringBuilder_append(jl_StringBuilder_append($me, $rt_s(61)), $snap);
                cgmcf_ControllerState_log($cmd, jl_StringBuilder_toString($me));
                return ju_Optional_empty();
            }
            $me = $this.$state2.$botStrategy;
            var$4 = $snap.$currentPlayer;
            if ($snap.$turnState0 === cgmmg_TurnState_DISCARDING) {
                var$5 = jl_Math_max(0, cgmmc_AbstractCardCollection_size(var$4.$hand) - 7 | 0);
                if (var$5 <= 0)
                    $cmd = ju_Optional_of(cgmc_EndTurnCommand__init_($me.$ctrl, var$4, ju_List_of()));
                else {
                    $cmd = ju_Collection_stream(cgmmc_AbstractCardCollection_getCards(var$4.$hand));
                    $discards = new cgma_SimpleBotStrategy$chooseDiscards$lambda$_19_0;
                    $discards.$_075 = $me;
                    $discards = ju_Comparator_thenComparingInt(ju_Comparator_comparingInt($discards), new cgma_SimpleBotStrategy$chooseDiscards$lambda$_19_1);
                    $cmd = jusi_SimpleStreamImpl_sorted($cmd, $discards);
                    var$7 = Long_fromInt(var$5);
                    $cmd = jus_Stream_toList(jusi_SimpleStreamImpl_limit($cmd, var$7));
                    $cmd = ju_Optional_of(cgmc_EndTurnCommand__init_($me.$ctrl, var$4, $cmd));
                }
            } else if ($snap.$remainingPlays <= 0)
                $cmd = ju_Optional_of(cgmc_EndTurnCommand__init_($me.$ctrl, var$4, ju_List_of()));
            else {
                $cmd = ju_Collection_stream(cgmmc_AbstractCardCollection_getCards(var$4.$hand));
                $discards = new cgma_SimpleBotStrategy$playMoney$lambda$_2_0;
                $cmd = jusi_SimpleStreamImpl_filter($cmd, $discards);
                $discards = ju_Comparator_comparingInt(new cgma_SimpleBotStrategy$playMoney$lambda$_2_1);
                $cmd = jusi_SimpleStreamImpl_max($cmd, $discards);
                $discards = new cgma_SimpleBotStrategy$playMoney$lambda$_2_2;
                $discards.$_055 = $me;
                $discards.$_119 = var$4;
                $cmd = ju_Optional_map($cmd, $discards);
                if (!ju_Optional_isPresent($cmd)) {
                    $cmd = ju_Collection_stream(cgmmc_AbstractCardCollection_getCards(var$4.$hand));
                    $discards = new cgma_SimpleBotStrategy$playProperty$lambda$_4_0;
                    $cmd = jusi_SimpleStreamImpl_findFirst(jusi_SimpleStreamImpl_filter($cmd, $discards));
                    if (ju_Optional_isPresent($cmd))
                        $cmd = ju_Optional_of(cgmc_PlayCardCommand__init_($me.$ctrl, var$4, ju_Optional_get($cmd), cgmc_GameController$PlayCardRequest_defaultPlay()));
                    else {
                        $cmd = ju_Collection_stream(cgmmc_AbstractCardCollection_getCards(var$4.$hand));
                        $discards = new cgma_SimpleBotStrategy$playProperty$lambda$_4_1;
                        $cmd = jusi_SimpleStreamImpl_findFirst(jusi_SimpleStreamImpl_filter($cmd, $discards));
                        if (!ju_Optional_isPresent($cmd))
                            $cmd = ju_Optional_empty();
                        else {
                            $discards = ju_Optional_get($cmd);
                            $ex = cgma_SimpleBotStrategy_pickBestWildcardColor($me, var$4, $discards);
                            $cmd = ju_Optional_of(cgmc_PlayCardCommand__init_($me.$ctrl, var$4, $discards, cgmc_GameController$PlayCardRequest_withChosenColor(cgmc_GameController$PlayCardRequest_defaultPlay(), $ex)));
                        }
                    }
                    if (!ju_Optional_isPresent($cmd)) {
                        $cmd = cgma_SimpleBotStrategy_playBuilding($me, var$4);
                        if (!ju_Optional_isPresent($cmd)) {
                            $cmd = cgma_SimpleBotStrategy_playAction($me, $snap, var$4);
                            if (!ju_Optional_isPresent($cmd))
                                $cmd = ju_Optional_of(cgmc_EndTurnCommand__init_($me.$ctrl, var$4, ju_List_of()));
                        }
                    }
                }
            }
            a: {
                if (ju_Optional_isPresent($cmd)) {
                    b: {
                        try {
                            (ju_Optional_get($cmd)).$execute();
                            cgmcf_ControllerState_refresh($this.$state2);
                            break a;
                        } catch ($$e) {
                            $$je = $rt_wrapException($$e);
                            if ($$je instanceof jl_RuntimeException) {
                                $ex = $$je;
                                break b;
                            } else {
                                throw $$e;
                            }
                        }
                    }
                    $snap = $this.$state2;
                    $me = $ex.$getMessage();
                    $discards = jl_StringBuilder__init_();
                    jl_StringBuilder_append(jl_StringBuilder_append($discards, $rt_s(62)), $me);
                    cgmcf_ControllerState_log($snap, jl_StringBuilder_toString($discards));
                    $snap = cgmcf_ControllerState_view($this.$state2);
                    $me = $ex.$getMessage();
                    $discards = jl_StringBuilder__init_();
                    jl_StringBuilder_append(jl_StringBuilder_append($discards, $rt_s(63)), $me);
                    $me = jl_StringBuilder_toString($discards);
                    w_DealBrowser_showMessage($snap, $me);
                    cgmcf_ControllerState_refresh($this.$state2);
                } else {
                    $me = cgmmg_Game_getCurrentPlayer(cgmcf_ControllerState_game($this.$state2));
                    c: {
                        try {
                            if (cgmmg_GameSnapshot_getTurnState($snap) !== cgmmg_TurnState_DISCARDING)
                                cgmc_GameController_endTurn($this, $me, ju_List_of());
                            else {
                                $snap = ju_Collection_stream(cgmmc_AbstractCardCollection_getCards(cgmmg_Player_getHand($me)));
                                $discards = ju_Comparator_comparingInt(cgmc_GameController$stepBotTurn$lambda$_7_1__init_0());
                                $snap = jusi_SimpleStreamImpl_sorted($snap, $discards);
                                var$7 = Long_fromInt(jl_Math_max(0, cgmmc_AbstractCardCollection_size(cgmmg_Player_getHand($me)) - 7 | 0));
                                cgmc_GameController_endTurn($this, $me, jus_Stream_toList(jusi_SimpleStreamImpl_limit($snap, var$7)));
                            }
                            cgmcf_ControllerState_refresh($this.$state2);
                            break a;
                        } catch ($$e) {
                            $$je = $rt_wrapException($$e);
                            if ($$je instanceof jl_RuntimeException) {
                                $ex = $$je;
                                break c;
                            } else {
                                throw $$e;
                            }
                        }
                    }
                    $snap = $this.$state2;
                    $me = $ex.$getMessage();
                    $discards = jl_StringBuilder__init_();
                    jl_StringBuilder_append(jl_StringBuilder_append($discards, $rt_s(64)), $me);
                    cgmcf_ControllerState_log($snap, jl_StringBuilder_toString($discards));
                    $snap = cgmcf_ControllerState_view($this.$state2);
                    $me = $ex.$getMessage();
                    $discards = jl_StringBuilder__init_();
                    jl_StringBuilder_append(jl_StringBuilder_append($discards, $rt_s(65)), $me);
                    $me = jl_StringBuilder_toString($discards);
                    w_DealBrowser_showMessage($snap, $me);
                    cgmcf_ControllerState_refresh($this.$state2);
                }
            }
            return ju_Optional_map($cmd, cgmc_GameController$stepBotTurn$lambda$_7_0__init_0());
        }
        return ju_Optional_empty();
    }
    $snap = $this.$state2;
    $cmd = jl_String_valueOf((cgmcf_ControllerState_game($snap)).$turnState);
    $me = new jl_StringBuilder;
    jl_AbstractStringBuilder__init_($me);
    jl_AbstractStringBuilder_append(jl_StringBuilder_append(jl_StringBuilder_append($me, $rt_s(66)), $cmd), 41);
    cgmcf_ControllerState_log($snap, jl_AbstractStringBuilder_toString($me));
    return ju_Optional_empty();
},
cgmc_GameController_playCard = ($this, $player, $card, $request) => {
    cgmcf_CardPlayFlowService_playCard($this.$cardPlayFlow, $player, $card, $request);
},
cgmc_GameController_makePayment = ($this, $request) => {
    let var$2, var$3, var$4, var$5, var$6, var$7, var$8, var$9, var$10, var$11, var$12;
    var$2 = $this.$paymentFlow;
    cgmcf_ControllerState_requireGame(var$2.$state3);
    var$3 = $request.$payer;
    var$4 = $request.$payee;
    if (!$request.$justSayNoChecked && cgmcf_ReactionFlowService_resolveJustSayNoChain(var$2.$reactionFlow, var$4, var$3, cgmcf_PaymentFlowService_describePayment(var$2, $request))) {
        var$5 = var$2.$state3.$view0;
        var$6 = var$3.$name;
        $request = new jl_StringBuilder;
        jl_AbstractStringBuilder__init_($request);
        jl_StringBuilder_append(jl_StringBuilder_append($request, var$6), $rt_s(18));
        var$5.$notice = jl_AbstractStringBuilder_toString($request);
        cgmcf_ControllerState_refresh(var$2.$state3);
        var$6 = cgmep_PaymentResult__init_(1, 0, ju_List_of());
    } else {
        var$7 = var$2.$state3.$paymentService;
        var$8 = $request.$amount;
        var$6 = cgmep_PaymentService_getPaymentCandidates(var$7, var$3);
        var$9 = ju_Collection_stream(var$6);
        var$5 = new cgmep_PaymentService$processPayment$lambda$_1_0;
        var$10 = jusi_SimpleIntStreamImpl_sum(jusi_SimpleStreamImpl_mapToInt(var$9, var$5));
        var$9 = ju_ArrayList__init_();
        var$5 = $request.$selectedCards2;
        if (var$8 >= 0) {
            a: {
                if (var$10) {
                    var$6 = cgmep_PaymentService_validateSelection(var$7, var$5, var$6, var$8, var$10);
                    var$10 = 0;
                    var$7 = ju_AbstractList_iterator(var$6);
                    while (true) {
                        if (!ju_AbstractList$1_hasNext(var$7)) {
                            var$5 = var$3.$bank;
                            var$6 = cgmmc_PropertyCollection_releaseBuildingsFromBrokenSets(var$3.$properties);
                            cgmmc_AbstractCardCollection_addAll(var$5, var$6);
                            var$5 = var$4.$bank;
                            var$6 = cgmmc_PropertyCollection_releaseBuildingsFromBrokenSets(var$4.$properties);
                            cgmmc_AbstractCardCollection_addAll(var$5, var$6);
                            var$6 = cgmep_PaymentResult__init_(var$10 < var$8 ? 0 : 1, var$10, var$9);
                            break a;
                        }
                        var$6 = ju_AbstractList$1_next(var$7);
                        if (ju_AbstractCollection_contains(cgmmc_AbstractCardCollection_getCards(var$3.$bank), var$6)) {
                            cgmmc_AbstractCardCollection_remove(var$3.$bank, var$6);
                            cgmmc_Bank_add(var$4.$bank, var$6);
                        } else {
                            if (!ju_Optional_isPresent(cgmmc_PropertyCollection_removeCard(var$3.$properties, var$6)))
                                break;
                            cgmmc_PropertyCollection_addToBestSet(var$4.$properties, var$6);
                        }
                        ju_ArrayList_add(var$9, var$6);
                        var$10 = var$10 + var$6.$value | 0;
                    }
                    $request = new cgme_InvalidMoveException;
                    jl_Throwable__init_($request, $rt_s(67));
                    $rt_throw($request);
                }
                if (var$5 !== null && !var$5.$isEmpty())
                    cgmep_PaymentService_validateSelection(var$7, var$5, var$6, var$8, var$10);
                var$6 = cgmep_PaymentResult__init_(var$8 ? 0 : 1, 0, var$9);
            }
            cgmcf_ControllerState_bankReleasedBuildings(var$2.$state3, var$3);
            cgmcf_ControllerState_bankReleasedBuildings(var$2.$state3, var$4);
            if (cgmmg_Player_equals(var$4, cgmmg_Game_getCurrentPlayer(cgmcf_ControllerState_game(var$2.$state3))))
                cgmcf_ControllerState_checkWinAfterOwnTurnOperation(var$2.$state3, var$4);
            var$9 = var$2.$state3;
            var$5 = var$3.$name;
            var$10 = var$6.$amountPaid;
            var$7 = var$4.$name;
            var$11 = jl_String_valueOf($request.$reason);
            var$12 = new jl_StringBuilder;
            jl_AbstractStringBuilder__init_(var$12);
            jl_AbstractStringBuilder_append(jl_StringBuilder_append(jl_StringBuilder_append(jl_StringBuilder_append(jl_StringBuilder_append(jl_StringBuilder_append0(jl_StringBuilder_append(jl_StringBuilder_append(var$12, var$5), $rt_s(68)), var$10), $rt_s(69)), var$7), $rt_s(70)), var$11), 41);
            cgmcf_ControllerState_log(var$9, jl_AbstractStringBuilder_toString(var$12));
            $request = var$2.$state3.$view0;
            var$5 = var$4.$name;
            var$10 = var$6.$amountPaid;
            var$4 = var$3.$name;
            var$9 = new jl_StringBuilder;
            jl_AbstractStringBuilder__init_(var$9);
            jl_StringBuilder_append(jl_StringBuilder_append(jl_StringBuilder_append0(jl_StringBuilder_append(jl_StringBuilder_append(var$9, var$5), $rt_s(71)), var$10), $rt_s(72)), var$4);
            $request.$notice = jl_AbstractStringBuilder_toString(var$9);
            cgmcf_ControllerState_refresh(var$2.$state3);
        } else {
            $request = new cgme_InvalidMoveException;
            jl_Throwable__init_($request, $rt_s(73));
            $rt_throw($request);
        }
    }
    return var$6;
},
cgmc_GameController_endTurn = ($this, $player, $discards) => {
    let var$3, var$4, var$5, var$6, var$7, var$8;
    var$3 = $this.$turnFlow;
    cgmcf_ControllerState_requireGame(var$3.$state1);
    cgmcf_ControllerState_requireCurrentPlayer(var$3.$state1, $player);
    if (ju_Optional_isPresent(cgmcf_ControllerState_checkWinAfterOwnTurnOperation(var$3.$state1, $player)))
        cgmcf_ControllerState_refresh(var$3.$state1);
    else {
        var$4 = cgmcf_ControllerState_game(var$3.$state1);
        var$5 = var$4.$turnState;
        cgmmg_TurnState_$callClinit();
        if (var$5 !== cgmmg_TurnState_DISCARDING) {
            var$6 = cgme_TurnManager_requiredDiscards(cgmcf_ControllerState_turnManager(var$3.$state1), $player);
            if (var$6 > 0) {
                var$4.$turnState = cgmmg_TurnState_DISCARDING;
                var$4 = $player.$type;
                cgmmg_PlayerType_$callClinit();
                if (var$4 === cgmmg_PlayerType_COMPUTER)
                    cgmcf_ControllerState_refresh(var$3.$state1);
                else {
                    w_DealBrowser_promptDiscard(var$3.$state1.$view0, $player, var$6);
                    cgmcf_ControllerState_refresh(var$3.$state1);
                }
            } else {
                $discards = cgmcf_ControllerState_turnManager(var$3.$state1);
                if (cgme_TurnManager_requiredDiscards($discards, $player) > 0)
                    $discards.$game0.$turnState = cgmmg_TurnState_DISCARDING;
                else {
                    $discards = $discards.$game0;
                    $discards.$turnState = cgmmg_TurnState_TURN_END;
                    cgmmg_Game_advanceToNextPlayer($discards);
                }
                cgmcf_TurnFlowService_finishTurn(var$3, $player);
            }
        } else {
            var$6 = cgme_TurnManager_requiredDiscards(cgmcf_ControllerState_turnManager(var$3.$state1), $player);
            if (var$6 > 0 && !($discards !== null && !$discards.$isEmpty())) {
                var$4 = $player.$type;
                cgmmg_PlayerType_$callClinit();
                if (var$4 !== cgmmg_PlayerType_COMPUTER)
                    w_DealBrowser_promptDiscard(var$3.$state1.$view0, $player, var$6);
                cgmcf_ControllerState_refresh(var$3.$state1);
            } else {
                var$4 = cgmcf_ControllerState_turnManager(var$3.$state1);
                var$5 = $discards !== null ? ju_List_copyOf($discards) : ju_List_of();
                if (var$4.$game0.$turnState === cgmmg_TurnState_DISCARDING) {
                    a: {
                        var$6 = cgme_TurnManager_requiredDiscards(var$4, $player);
                        if (!var$6) {
                            $discards = var$4.$game0;
                            $discards.$turnState = cgmmg_TurnState_TURN_END;
                            cgmmg_Game_advanceToNextPlayer($discards);
                        } else {
                            if (var$5 !== null && var$5.$size() == var$6) {
                                var$7 = ju_HashSet__init_(ju_HashMap__init_2(var$5.$size() < 6 ? 11 : var$5.$size() * 2 | 0));
                                $discards = var$5.$iterator();
                                while ($discards.$hasNext()) {
                                    ju_HashSet_add(var$7, $discards.$next());
                                }
                                if (ju_HashSet_size(var$7) == var$5.$size()) {
                                    $discards = var$5.$iterator();
                                    while (true) {
                                        if (!$discards.$hasNext()) {
                                            $discards = var$5.$iterator();
                                            while ($discards.$hasNext()) {
                                                var$8 = $discards.$next();
                                                cgmmc_AbstractCardCollection_remove($player.$hand, var$8);
                                                cgmmc_AbstractCardCollection_add(var$4.$game0.$discardPile, var$8);
                                            }
                                            if (cgme_TurnManager_requiredDiscards(var$4, $player) <= 0) {
                                                $discards = var$4.$game0;
                                                $discards.$turnState = cgmmg_TurnState_TURN_END;
                                                cgmmg_Game_advanceToNextPlayer($discards);
                                                break a;
                                            }
                                            $player = new cgme_InvalidMoveException;
                                            jl_Throwable__init_($player, $rt_s(74));
                                            $rt_throw($player);
                                        }
                                        var$8 = $discards.$next();
                                        if (!ju_AbstractCollection_contains(cgmmc_AbstractCardCollection_getCards($player.$hand), var$8))
                                            break;
                                    }
                                    $player = new cgme_InvalidMoveException;
                                    jl_Throwable__init_($player, $rt_s(75));
                                    $rt_throw($player);
                                }
                                $player = new cgme_InvalidMoveException;
                                jl_Throwable__init_($player, $rt_s(76));
                                $rt_throw($player);
                            }
                            $player = new cgme_InvalidMoveException;
                            $discards = new jl_StringBuilder;
                            jl_AbstractStringBuilder__init_($discards);
                            jl_StringBuilder_append(jl_StringBuilder_append0(jl_StringBuilder_append($discards, $rt_s(77)), var$6), $rt_s(78));
                            jl_Throwable__init_($player, jl_AbstractStringBuilder_toString($discards));
                            $rt_throw($player);
                        }
                    }
                    cgmcf_TurnFlowService_finishTurn(var$3, $player);
                } else {
                    $player = new cgme_InvalidMoveException;
                    jl_Throwable__init_($player, $rt_s(79));
                    $rt_throw($player);
                }
            }
        }
    }
},
cgmc_GameController_getSnapshot = $this => {
    let var$1;
    var$1 = $this.$state2;
    cgmcf_ControllerState_requireGame(var$1);
    return cgmmg_GameSnapshot_from(var$1.$game1);
},
cgmc_GameController_startGame = ($this, $game, $eventMessage) => {
    let var$3, var$4, var$5, var$6;
    var$3 = $this.$state2;
    var$3.$game1 = $game;
    var$4 = new cgme_TurnManager;
    var$4.$cardsPlayedThisTurn0 = 0;
    var$4.$game0 = $game;
    var$3.$turnManager0 = var$4;
    var$5 = var$3.$eventBus;
    var$3 = new cgme_GameEvent;
    jt_Instant_$callClinit();
    jt_ZoneOffset_$callClinit();
    var$6 = jl_System_currentTimeMillis();
    var$3.$time = jt_Instant_create(jl_Math_floorDiv(var$6, 1000), $rt_imul(jl_Math_floorMod(var$6, 1000), 1000000));
    var$3.$type2 = $rt_s(80);
    var$3.$message3 = $eventMessage;
    $game = ju_List_copyOf(var$5.$listeners);
    $eventMessage = new cgme_EventBus$publish$lambda$_3_0;
    $eventMessage.$_029 = var$3;
    jl_Iterable_forEach($game, $eventMessage);
    cgmcf_TurnFlowService_beginTurn($this.$turnFlow);
    cgmcf_ControllerState_refresh($this.$state2);
},
jl_Iterable = $rt_classWithoutFields(0),
jl_Iterable_forEach = ($this, $action) => {
    let $itr;
    $itr = $this.$iterator();
    while ($itr.$hasNext()) {
        $action.$accept($itr.$next());
    }
},
ju_Collection = $rt_classWithoutFields(0),
ju_Collection_spliterator = $this => {
    let var$1;
    var$1 = new jusi_SpliteratorOverCollection;
    var$1.$collection = $this;
    return var$1;
},
ju_Collection_stream = $this => {
    let var$1;
    var$1 = new jusi_StreamOverSpliterator;
    var$1.$spliterator0 = ju_Collection_spliterator($this);
    return var$1;
},
ju_SequencedCollection = $rt_classWithoutFields(0),
ju_List = $rt_classWithoutFields(0),
ju_List_of = () => {
    ju_Collections_$callClinit();
    return ju_Collections_EMPTY_LIST;
},
ju_List_of0 = $e => {
    let var$2;
    ju_Collections_$callClinit();
    var$2 = new ju_TemplateCollections$SingleElementList;
    var$2.$value7 = $e;
    return var$2;
},
ju_List_of1 = ($e1, $e2) => {
    let var$3;
    ju_Objects_requireNonNull($e1);
    ju_Objects_requireNonNull($e2);
    var$3 = new ju_TemplateCollections$TwoElementsList;
    var$3.$first0 = $e1;
    var$3.$second = $e2;
    return var$3;
},
ju_List_copyOf = $collection => {
    let var$2, var$3, var$4, var$5, var$6, var$7;
    var$2 = new ju_TemplateCollections$ImmutableArrayList;
    var$3 = $rt_createArray(jl_Object, $collection.$size());
    var$4 = var$3.data;
    $collection = $collection.$iterator();
    var$5 = 0;
    while ($collection.$hasNext()) {
        var$6 = $collection.$next();
        if (var$6 === null) {
            $collection = new jl_NullPointerException;
            jl_Throwable__init_0($collection);
            $rt_throw($collection);
        }
        var$7 = var$5 + 1 | 0;
        var$4[var$5] = var$6;
        var$5 = var$7;
    }
    var$2.$list = var$3;
    return var$2;
},
jl_Runnable = $rt_classWithoutFields(0);
function w_DealBrowser$play$lambda$_2_0() {
    let a = this; jl_Object.call(a);
    a.$_061 = null;
    a.$_121 = 0;
}
let w_DealBrowser$play$lambda$_2_0_run = var$0 => {
    let var$1, var$2, var$3, var$4, var$5, var$6, var$7, var$8, var$9, var$10, var$11, var$12;
    var$1 = var$0.$_061;
    var$2 = var$0.$_121;
    w_DealBrowser_$callClinit();
    w_DealBrowser_requireHumanPlay(w_DealBrowser_match);
    var$3 = w_DealBrowser_human(w_DealBrowser_match);
    var$1 = w_DealBrowser_find(cgmmc_AbstractCardCollection_getCards(var$3.$hand), var$1);
    if (var$2)
        cgmc_GameController_playCard(w_DealBrowser_match.$controller, var$3, var$1, cgmc_GameController$PlayCardRequest_toBank());
    else {
        var$4 = w_DealBrowser_match;
        var$5 = cgmc_GameController$PlayCardRequest_defaultPlay();
        if (var$1 instanceof cgmmc_WildcardCard) {
            var$6 = var$1;
            var$7 = ju_ArrayList__init_0(cgmmc_WildcardCard_getAllowedColors(var$6));
            var$6 = new w_DealBrowser$choosePlay$lambda$_13_0;
            var$6.$_01 = var$4;
            var$6.$_10 = var$3;
            var$6.$_20 = var$1;
            var$6.$_30 = var$5;
            w_DealBrowser_promptColorSelection(var$4, var$3, $rt_s(81), $rt_s(82), var$7, var$6);
        } else if (var$1 instanceof cgmmc_BuildingCard) {
            var$6 = var$1;
            var$8 = ju_Collection_stream(cgmmc_PropertyCollection_getCompletedSets(var$3.$properties));
            var$9 = new w_DealBrowser$choosePlay$lambda$_13_1;
            var$9.$_020 = var$6;
            var$6 = jusi_SimpleStreamImpl_filter(var$8, var$9);
            var$8 = new w_DealBrowser$choosePlay$lambda$_13_2;
            var$6 = jus_Stream_toList(jusi_SimpleStreamImpl_map(var$6, var$8));
            var$7 = var$1.$name0;
            var$9 = new w_DealBrowser$choosePlay$lambda$_13_3;
            var$9.$_062 = var$4;
            var$9.$_122 = var$3;
            var$9.$_28 = var$1;
            var$9.$_35 = var$5;
            w_DealBrowser_promptColorSelection(var$4, var$3, var$7, $rt_s(83), var$6, var$9);
        } else if (!(var$1 instanceof cgmmc_ActionCard))
            cgmc_GameController_playCard(var$4.$controller, var$3, var$1, var$5);
        else
            a: {
                b: {
                    c: {
                        d: {
                            e: {
                                f: {
                                    var$1 = var$1;
                                    var$6 = w_DealBrowser_bot(var$4);
                                    var$10 = cgmc_GameController$PlayCardRequest__init_(var$5.$playToBank, var$6, var$5.$selectedCards0, var$5.$chosenColor0, var$5.$doubleRentCount0);
                                    w_DealBrowser$1_$callClinit();
                                    var$11 = w_DealBrowser$1_$SwitchMap$com$group4$monopolydeal$model$card$ActionType.data;
                                    var$8 = var$1.$actionType;
                                    switch (var$11[var$8.$ordinal]) {
                                        case 1:
                                            break;
                                        case 2:
                                            break e;
                                        case 3:
                                            break c;
                                        case 4:
                                            break d;
                                        case 5:
                                        case 6:
                                            break b;
                                        default:
                                            break f;
                                    }
                                    cgmc_GameController_playCard(var$4.$controller, var$3, var$1, var$10);
                                    break a;
                                }
                                cgmc_GameController_playCard(var$4.$controller, var$3, var$1, var$5);
                                break a;
                            }
                            var$8 = var$1.$name0;
                            var$5 = cgmmc_PropertyCollection_getStealableProperties(var$6.$properties);
                            var$7 = new w_DealBrowser$chooseAction$lambda$_14_0;
                            var$7.$_025 = var$4;
                            var$7.$_18 = var$3;
                            var$7.$_25 = var$1;
                            var$7.$_34 = var$10;
                            w_DealBrowser_promptCardSelection(var$4, var$3, var$6, var$8, $rt_s(84), var$5, 1, 1, var$7);
                            break a;
                        }
                        var$8 = var$1.$name0;
                        var$5 = ju_Collection_stream(cgmmc_PropertyCollection_getCompletedSets(var$6.$properties));
                        var$6 = new w_DealBrowser$chooseAction$lambda$_14_1;
                        var$5 = jus_Stream_toList(jusi_SimpleStreamImpl_map(var$5, var$6));
                        var$6 = new w_DealBrowser$chooseAction$lambda$_14_2;
                        var$6.$_070 = var$4;
                        var$6.$_125 = var$3;
                        var$6.$_211 = var$1;
                        var$6.$_38 = var$10;
                        w_DealBrowser_promptColorSelection(var$4, var$3, var$8, $rt_s(85), var$5, var$6);
                        break a;
                    }
                    var$9 = cgmmc_PropertyCollection_getStealableProperties(var$6.$properties);
                    if (!ju_AbstractCollection_isEmpty(var$9)) {
                        var$8 = var$1.$name0;
                        var$5 = cgmmc_PropertyCollection_getStealableProperties(var$3.$properties);
                        var$12 = new w_DealBrowser$chooseAction$lambda$_14_7;
                        var$12.$_022 = var$4;
                        var$12.$_17 = var$3;
                        var$12.$_24 = var$6;
                        var$12.$_33 = var$1;
                        var$12.$_41 = var$9;
                        var$12.$_50 = var$10;
                        w_DealBrowser_promptCardSelection(var$4, var$3, var$3, var$8, $rt_s(86), var$5, 1, 1, var$12);
                        break a;
                    }
                    var$1 = new jl_IllegalArgumentException;
                    jl_Throwable__init_(var$1, $rt_s(87));
                    $rt_throw(var$1);
                }
                cgmmc_ActionType_$callClinit();
                var$2 = var$8 !== cgmmc_ActionType_MULTI_COLOUR_RENT ? 0 : 1;
                var$6 = ju_Collection_stream(cgmmc_PropertyCollection_getSets(var$3.$properties));
                var$8 = new w_DealBrowser$chooseAction$lambda$_14_3;
                var$6 = jusi_SimpleStreamImpl_filter(var$6, var$8);
                var$8 = new w_DealBrowser$chooseAction$lambda$_14_4;
                var$6 = jusi_SimpleStreamImpl_map(var$6, var$8);
                var$8 = new w_DealBrowser$chooseAction$lambda$_14_5;
                var$8.$_050 = var$2;
                var$8.$_116 = var$1;
                var$6 = jus_Stream_toList(jusi_SimpleStreamImpl_filter(var$6, var$8));
                var$7 = var$1.$name0;
                var$9 = new w_DealBrowser$chooseAction$lambda$_14_6;
                var$9.$_0 = var$4;
                var$9.$_1 = var$3;
                var$9.$_2 = var$1;
                var$9.$_3 = var$2;
                var$9.$_4 = var$10;
                var$9.$_5 = var$5;
                w_DealBrowser_promptColorSelection(var$4, var$3, var$7, $rt_s(88), var$6, var$9);
            }
    }
};
function w_DealBrowser$moveWildcard$lambda$_3_0() {
    jl_Object.call(this);
    this.$_026 = null;
}
let w_DealBrowser$moveWildcard$lambda$_3_0_run = var$0 => {
    let var$1, var$2, var$3, var$4, var$5, var$6, var$7;
    var$1 = var$0.$_026;
    w_DealBrowser_$callClinit();
    w_DealBrowser_requireHumanPlay(w_DealBrowser_match);
    var$2 = w_DealBrowser_human(w_DealBrowser_match);
    var$3 = ju_Collection_stream(cgmmc_PropertyCollection_getSets(var$2.$properties));
    var$4 = new w_DealBrowser$lambda$moveWildcard$4$lambda$_70_0;
    var$3 = var$3;
    var$5 = new jusi_FlatMappingStreamImpl;
    var$5.$sourceStream2 = var$3;
    var$5.$mapper1 = var$4;
    var$3 = new w_DealBrowser$lambda$moveWildcard$4$lambda$_70_1;
    var$5 = w_DealBrowser_find(jus_Stream_toList(jusi_SimpleStreamImpl_map(var$5, var$3)), var$1);
    var$6 = w_DealBrowser_match;
    var$4 = ju_ArrayList__init_0(cgmmc_WildcardCard_getAllowedColors(var$5));
    var$7 = new w_DealBrowser$lambda$moveWildcard$4$lambda$_70_2;
    var$7.$_037 = var$2;
    var$7.$_110 = var$5;
    w_DealBrowser_promptColorSelection(var$6, var$2, $rt_s(89), $rt_s(90), var$4, var$7);
},
w_DealBrowser$endTurn$lambda$_4_0 = $rt_classWithoutFields(),
w_DealBrowser$endTurn$lambda$_4_0_run = var$0 => {
    let var$1;
    w_DealBrowser_$callClinit();
    w_DealBrowser_requireHumanPlay(w_DealBrowser_match);
    var$1 = w_DealBrowser_match;
    cgmc_GameController_endTurn(var$1.$controller, w_DealBrowser_human(var$1), ju_List_of());
},
w_DealBrowser$stepBot$lambda$_5_0 = $rt_classWithoutFields(),
w_DealBrowser$stepBot$lambda$_5_0_run = var$0 => {
    w_DealBrowser_$callClinit();
    if (cgmc_GameController_isCurrentPlayerBot(w_DealBrowser_match.$controller))
        cgmc_GameController_stepBotTurn(w_DealBrowser_match.$controller);
},
ju_Arrays = $rt_classWithoutFields(),
ju_Arrays_copyOf = ($array, $length) => {
    let $result, var$4, $sz, $i;
    $array = $array.data;
    $result = $rt_createByteArray($length);
    var$4 = $result.data;
    $sz = jl_Math_min($length, $array.length);
    $i = 0;
    while ($i < $sz) {
        var$4[$i] = $array[$i];
        $i = $i + 1 | 0;
    }
    return $result;
},
ju_Arrays_copyOf0 = ($original, $newLength) => {
    let var$3, $result, $sz, $i;
    var$3 = $original.data;
    $result = jlr_Array_newInstance(jl_Class_getComponentType(jl_Object_getClass($original)), $newLength);
    $sz = jl_Math_min($newLength, var$3.length);
    $i = 0;
    while ($i < $sz) {
        $result.data[$i] = var$3[$i];
        $i = $i + 1 | 0;
    }
    return $result;
},
ju_Arrays_fill1 = ($a, $fromIndex, $toIndex, $val) => {
    let var$5, var$6, var$7;
    if ($fromIndex <= $toIndex) {
        while ($fromIndex < $toIndex) {
            var$5 = $a.data;
            var$6 = $fromIndex + 1 | 0;
            var$5[$fromIndex] = $val;
            $fromIndex = var$6;
        }
        return;
    }
    var$7 = new jl_IllegalArgumentException;
    jl_Throwable__init_0(var$7);
    $rt_throw(var$7);
},
ju_Arrays_fill = ($a, $val) => {
    ju_Arrays_fill1($a, 0, $a.data.length, $val);
},
ju_Arrays_fill0 = ($a, $fromIndex, $toIndex, $val) => {
    let var$5, var$6;
    if ($fromIndex <= $toIndex) {
        while ($fromIndex < $toIndex) {
            var$5 = $a.data;
            var$6 = $fromIndex + 1 | 0;
            var$5[$fromIndex] = $val;
            $fromIndex = var$6;
        }
        return;
    }
    $val = new jl_IllegalArgumentException;
    jl_Throwable__init_0($val);
    $rt_throw($val);
},
ju_Arrays_fill2 = ($a, $val) => {
    ju_Arrays_fill0($a, 0, $a.data.length, $val);
},
ju_Arrays_sort = ($a, $c) => {
    let var$3, $second, $chunkSize, var$6, $i, var$8, var$9, var$10, $i_0, var$12, $i_1, var$14, var$15, var$16, var$17;
    var$3 = $a.data.length;
    if (var$3) {
        if ($c === null)
            $c = ju_Comparator$NaturalOrder_instance();
        $second = $rt_createArray(jl_Object, var$3);
        $chunkSize = 1;
        var$6 = $a;
        while ($chunkSize < var$3) {
            $i = 0;
            while (true) {
                var$8 = var$6.data;
                var$9 = var$8.length;
                if ($i >= var$9)
                    break;
                var$10 = jl_Math_min(var$9, $i + $chunkSize | 0);
                $i_0 = $i + (2 * $chunkSize | 0) | 0;
                var$12 = jl_Math_min(var$9, $i_0);
                $i_1 = $i;
                var$9 = var$10;
                a: {
                    b: {
                        while ($i != var$10) {
                            if (var$9 == var$12)
                                break b;
                            var$14 = var$8[$i];
                            var$15 = var$8[var$9];
                            if ($c.$compare0(var$14, var$15) > 0) {
                                var$16 = $second.data;
                                var$17 = $i_1 + 1 | 0;
                                var$16[$i_1] = var$15;
                                var$9 = var$9 + 1 | 0;
                            } else {
                                var$16 = $second.data;
                                var$17 = $i_1 + 1 | 0;
                                var$16[$i_1] = var$14;
                                $i = $i + 1 | 0;
                            }
                            $i_1 = var$17;
                        }
                        while (true) {
                            if (var$9 >= var$12)
                                break a;
                            var$16 = $second.data;
                            $i = $i_1 + 1 | 0;
                            var$17 = var$9 + 1 | 0;
                            var$16[$i_1] = var$8[var$9];
                            $i_1 = $i;
                            var$9 = var$17;
                        }
                    }
                    while (true) {
                        if ($i >= var$10)
                            break a;
                        var$16 = $second.data;
                        var$9 = $i_1 + 1 | 0;
                        var$17 = $i + 1 | 0;
                        var$16[$i_1] = var$8[$i];
                        $i_1 = var$9;
                        $i = var$17;
                    }
                }
                $i = $i_0;
            }
            $chunkSize = $chunkSize * 2 | 0;
            var$8 = var$6;
            var$6 = $second;
            $second = var$8;
        }
        c: {
            if (var$6 !== $a) {
                $i_1 = 0;
                while (true) {
                    $a = var$6.data;
                    if ($i_1 >= $a.length)
                        break c;
                    $second.data[$i_1] = $a[$i_1];
                    $i_1 = $i_1 + 1 | 0;
                }
            }
        }
        return;
    }
},
ju_Arrays_asList = $a => {
    let var$2;
    ju_Objects_requireNonNull($a);
    var$2 = new ju_Arrays$ArrayAsList;
    var$2.$array1 = $a;
    return var$2;
},
jl_Record = $rt_classWithoutFields();
function w_DealBrowser$Choice() {
    let a = this; jl_Record.call(a);
    a.$title = null;
    a.$help = null;
    a.$options = null;
    a.$min1 = 0;
    a.$max2 = 0;
    a.$required = 0;
    a.$amount0 = 0;
    a.$onSelected = null;
}
let juf_Predicate = $rt_classWithoutFields(0);
function w_DealBrowser$submit$lambda$_6_0() {
    jl_Object.call(this);
    this.$_067 = null;
}
let w_DealBrowser$submit$lambda$_6_0__init_ = (var$0, var$1) => {
    var$0.$_067 = var$1;
},
w_DealBrowser$submit$lambda$_6_0__init_0 = var_0 => {
    let var_1 = new w_DealBrowser$submit$lambda$_6_0();
    w_DealBrowser$submit$lambda$_6_0__init_(var_1, var_0);
    return var_1;
},
w_DealBrowser$submit$lambda$_6_0_test = (var$0, var$1) => {
    let var$2, var$3;
    var$1 = var$1;
    var$2 = var$0.$_067;
    w_DealBrowser_$callClinit();
    var$2 = ju_Collection_stream(var$2.$options);
    var$3 = new w_DealBrowser$lambda$submit$8$lambda$_66_0;
    var$3.$_058 = var$1;
    return jusi_SimpleStreamImpl_anyMatch(var$2, var$3) ? 0 : 1;
};
function w_DealBrowser$submit$lambda$_6_1() {
    let a = this; jl_Object.call(a);
    a.$_06 = null;
    a.$_12 = null;
}
let w_DealBrowser$submit$lambda$_6_1__init_ = (var$0, var$1, var$2) => {
    var$0.$_06 = var$1;
    var$0.$_12 = var$2;
},
w_DealBrowser$submit$lambda$_6_1__init_0 = (var_0, var_1) => {
    let var_2 = new w_DealBrowser$submit$lambda$_6_1();
    w_DealBrowser$submit$lambda$_6_1__init_(var_2, var_0, var_1);
    return var_2;
},
w_DealBrowser$submit$lambda$_6_1_run = var$0 => {
    let var$1, var$2, var$3, $$je;
    var$1 = var$0.$_06;
    var$2 = var$0.$_12;
    w_DealBrowser_$callClinit();
    try {
        var$1.$onSelected.$accept(var$2);
    } catch ($$e) {
        $$je = $rt_wrapException($$e);
        if ($$je instanceof jl_RuntimeException) {
            var$2 = $$je;
            if (var$1.$required) {
                var$3 = w_DealBrowser_match;
                if (var$3.$choice === null)
                    var$3.$choice = var$1;
            }
            $rt_throw(var$2);
        } else {
            throw $$e;
        }
    }
},
jl_IndexOutOfBoundsException = $rt_classWithoutFields(jl_RuntimeException),
ju_AbstractCollection = $rt_classWithoutFields(),
ju_AbstractCollection_isEmpty = $this => {
    return $this.$size() ? 0 : 1;
},
ju_AbstractCollection_contains = ($this, $o) => {
    let $iter;
    $iter = ju_AbstractList_iterator($this);
    while (ju_AbstractList$1_hasNext($iter)) {
        if (ju_Objects_equals(ju_AbstractList$1_next($iter), $o))
            return 1;
    }
    return 0;
},
ju_AbstractCollection_toArray = ($this, $a) => {
    let var$2, $i, $i_0, var$5, var$6;
    var$2 = $a.data;
    $i = $this.$size0;
    $i_0 = var$2.length;
    if ($i_0 < $i)
        $a = jlr_Array_newInstance(jl_Class_getComponentType(jl_Object_getClass($a)), $i);
    else
        while ($i < $i_0) {
            var$2[$i] = null;
            $i = $i + 1 | 0;
        }
    $i_0 = 0;
    var$5 = ju_AbstractList_iterator($this);
    while (ju_AbstractList$1_hasNext(var$5)) {
        var$2 = $a.data;
        var$6 = $i_0 + 1 | 0;
        var$2[$i_0] = ju_AbstractList$1_next(var$5);
        $i_0 = var$6;
    }
    return $a;
},
ju_AbstractCollection_addAll = ($this, $c) => {
    let $changed, $iter;
    $changed = 0;
    $iter = $c.$iterator();
    while ($iter.$hasNext()) {
        if (!$this.$add($iter.$next()))
            continue;
        $changed = 1;
    }
    return $changed;
},
ju_AbstractCollection_toString = $this => {
    let $sb, $iter, $e, var$4;
    $sb = new jl_StringBuilder;
    jl_AbstractStringBuilder__init_($sb);
    jl_AbstractStringBuilder_append($sb, 91);
    $iter = $this.$iterator();
    if ($iter.$hasNext()) {
        $e = $iter.$next();
        if ($e === $this)
            $e = $rt_s(91);
        jl_StringBuilder_append($sb, $e);
    }
    while ($iter.$hasNext()) {
        $e = $iter.$next();
        var$4 = jl_StringBuilder_append1($sb, $rt_s(92));
        if ($e === $this)
            $e = $rt_s(91);
        jl_StringBuilder_append(var$4, $e);
    }
    jl_AbstractStringBuilder_append($sb, 93);
    return jl_AbstractStringBuilder_toString($sb);
},
ju_Queue = $rt_classWithoutFields(0),
ju_Deque = $rt_classWithoutFields(0),
jl_Cloneable = $rt_classWithoutFields(0);
function ju_ArrayDeque() {
    let a = this; ju_AbstractCollection.call(a);
    a.$version = 0;
    a.$array0 = null;
    a.$head0 = 0;
    a.$tail = 0;
}
let ju_ArrayDeque__init_0 = $this => {
    $this.$array0 = $rt_createArray(jl_Object, 9);
},
ju_ArrayDeque__init_ = () => {
    let var_0 = new ju_ArrayDeque();
    ju_ArrayDeque__init_0(var_0);
    return var_0;
},
ju_ArrayDeque_addLast = ($this, $e) => {
    let var$2, var$3, var$4, var$5, var$6, var$7, var$8, var$9;
    ju_Objects_requireNonNull($e);
    var$2 = ju_ArrayDeque_size($this) + 1 | 0;
    var$3 = $this.$array0.data.length;
    if (var$2 >= var$3) {
        var$2 = jl_Math_max(var$3 * 2 | 0, ((var$2 * 3 | 0) / 2 | 0) + 1 | 0);
        if (var$2 < 1)
            var$2 = 2147483647;
        var$4 = $rt_createArray(jl_Object, var$2);
        var$5 = 0;
        var$6 = $this.$head0;
        var$7 = $this.$tail;
        if (var$6 <= var$7) {
            var$8 = var$4.data;
            while (var$6 < var$7) {
                var$2 = var$5 + 1 | 0;
                var$8[var$5] = $this.$array0.data[var$6];
                var$6 = var$6 + 1 | 0;
                var$5 = var$2;
            }
        } else {
            var$9 = var$4.data;
            while (true) {
                var$8 = $this.$array0.data;
                if (var$6 >= var$8.length)
                    break;
                var$2 = var$5 + 1 | 0;
                var$9[var$5] = var$8[var$6];
                var$6 = var$6 + 1 | 0;
                var$5 = var$2;
            }
            var$3 = 0;
            while (var$3 < var$7) {
                var$6 = var$5 + 1 | 0;
                var$9[var$5] = var$8[var$3];
                var$3 = var$3 + 1 | 0;
                var$5 = var$6;
            }
        }
        $this.$head0 = 0;
        $this.$tail = var$5;
        $this.$array0 = var$4;
    }
    var$4 = $this.$array0.data;
    var$2 = $this.$tail;
    var$4[var$2] = $e;
    $this.$tail = ju_ArrayDeque_modInc(var$2, var$4.length);
    $this.$version = $this.$version + 1 | 0;
},
ju_ArrayDeque_removeFirst = $this => {
    let var$1, $value, var$3;
    var$1 = $this.$head0;
    if (var$1 == $this.$tail)
        $value = null;
    else {
        var$3 = $this.$array0.data;
        $value = var$3[var$1];
        var$3[var$1] = null;
        $this.$head0 = ju_ArrayDeque_modInc(var$1, var$3.length);
        $this.$version = $this.$version + 1 | 0;
    }
    if ($value === null) {
        $value = new ju_NoSuchElementException;
        jl_Throwable__init_0($value);
        $rt_throw($value);
    }
    return $value;
},
ju_ArrayDeque_add = ($this, $e) => {
    ju_ArrayDeque_addLast($this, $e);
    return 1;
},
ju_ArrayDeque_size = $this => {
    let var$1, var$2;
    var$1 = $this.$tail;
    var$2 = $this.$head0;
    return var$1 >= var$2 ? var$1 - var$2 | 0 : ($this.$array0.data.length - var$2 | 0) + var$1 | 0;
},
ju_ArrayDeque_isEmpty = $this => {
    return $this.$head0 != $this.$tail ? 0 : 1;
},
ju_ArrayDeque_modInc = ($i, $mod) => {
    $i = $i + 1 | 0;
    if ($i == $mod)
        $i = 0;
    return $i;
},
ju_ArrayDeque_iterator = $this => {
    let var$1;
    var$1 = new ju_ArrayDeque$1;
    var$1.$this$09 = $this;
    var$1.$refVersion = $this.$version;
    var$1.$index4 = $this.$head0;
    var$1.$lastIndex = (-1);
    var$1.$left = ju_ArrayDeque_size($this);
    return var$1;
},
ju_ArrayDeque_clear = $this => {
    ju_Arrays_fill2($this.$array0, null);
    $this.$head0 = $this.$tail;
};
function cgmcf_ControllerState() {
    let a = this; jl_Object.call(a);
    a.$view0 = null;
    a.$paymentService = null;
    a.$winCondition = null;
    a.$actionExecutor0 = null;
    a.$eventBus = null;
    a.$actionLog = null;
    a.$game1 = null;
    a.$turnManager0 = null;
    a.$botStrategy = null;
    a.$turnCount = 0;
}
let cgmcf_ControllerState_view = $this => {
    return $this.$view0;
},
cgmcf_ControllerState_actionExecutor = $this => {
    return $this.$actionExecutor0;
},
cgmcf_ControllerState_game = $this => {
    cgmcf_ControllerState_requireGame($this);
    return $this.$game1;
},
cgmcf_ControllerState_turnManager = $this => {
    let var$1, var$2;
    var$1 = $this.$turnManager0;
    if (var$1 === null) {
        var$2 = new cgme_InvalidMoveException;
        jl_Throwable__init_(var$2, $rt_s(93));
        $rt_throw(var$2);
    }
    return var$1;
},
cgmcf_ControllerState_setBotStrategy = ($this, $botStrategy) => {
    $this.$botStrategy = $botStrategy;
},
cgmcf_ControllerState_log = ($this, $entry) => {
    jl_StringBuilder_append1(jl_StringBuilder_append1($this.$actionLog, $entry), $rt_s(94));
},
cgmcf_ControllerState_refresh = $this => {
    let var$1;
    var$1 = $this.$game1;
    if (var$1 !== null)
        cgmmg_GameSnapshot_from(var$1);
},
cgmcf_ControllerState_requireGame = $this => {
    let var$1;
    if ($this.$game1 === null) {
        var$1 = new cgme_InvalidMoveException;
        jl_Throwable__init_(var$1, $rt_s(93));
        $rt_throw(var$1);
    }
},
cgmcf_ControllerState_requireCurrentPlayer = ($this, $player) => {
    let var$2;
    if (!cgmmg_Player_equals($player, cgmmg_Game_getCurrentPlayer(cgmcf_ControllerState_game($this)))) {
        var$2 = new cgme_InvalidMoveException;
        jl_Throwable__init_(var$2, $rt_s(95));
        $rt_throw(var$2);
    }
},
cgmcf_ControllerState_requirePlayPhase = $this => {
    let var$1;
    var$1 = (cgmcf_ControllerState_game($this)).$turnState;
    cgmmg_TurnState_$callClinit();
    if (var$1 !== cgmmg_TurnState_PLAYING_CARDS) {
        var$1 = new cgme_InvalidMoveException;
        jl_Throwable__init_(var$1, $rt_s(96));
        $rt_throw(var$1);
    }
},
cgmcf_ControllerState_ensureEnoughPlays = ($this, $playsToConsume) => {
    let $currentGame, var$3;
    $currentGame = cgmcf_ControllerState_game($this);
    if (($currentGame.$cardsPlayedThisTurn + $playsToConsume | 0) > $currentGame.$rules.$maxCardsPlayedPerTurn) {
        var$3 = new cgme_InvalidMoveException;
        jl_Throwable__init_(var$3, $rt_s(97));
        $rt_throw(var$3);
    }
},
cgmcf_ControllerState_removeCardFromHand = ($this, $player, $card) => {
    if (!cgmmc_AbstractCardCollection_remove($player.$hand, $card)) {
        $card = new cgme_InvalidMoveException;
        jl_Throwable__init_($card, $rt_s(98));
        $rt_throw($card);
    }
},
cgmcf_ControllerState_bankReleasedBuildings = ($this, $player) => {
    let var$2;
    var$2 = $player.$bank;
    $player = cgmmc_PropertyCollection_releaseBuildingsFromBrokenSets($player.$properties);
    cgmmc_AbstractCardCollection_addAll(var$2, $player);
},
cgmcf_ControllerState_checkWinAfterOwnTurnOperation = ($this, $player) => {
    let $currentGame, $winner;
    $currentGame = cgmcf_ControllerState_game($this);
    $winner = !cgmmg_Player_equals(cgmmg_Game_getCurrentPlayer($currentGame), $player) ? ju_Optional_empty() : !(ju_TemplateCollections$ImmutableArrayList_size(cgmmc_PropertyCollection_getCompletedSets($player.$properties)) < $currentGame.$rules.$requiredCompleteSetsToWin ? 0 : 1) ? ju_Optional_empty() : ju_Optional_of($player);
    $player = new cgmcf_ControllerState$checkWinAfterOwnTurnOperation$lambda$_26_0;
    $player.$_052 = $this;
    $player.$_118 = $currentGame;
    ju_Optional_ifPresent($winner, $player);
    return $winner;
},
cgmcf_ControllerState_afterSuccessfulPlay = ($this, $player, $playsConsumed) => {
    cgmmg_Game_incrementCardsPlayedThisTurn(cgmcf_ControllerState_game($this), $playsConsumed);
    cgmcf_ControllerState_checkWinAfterOwnTurnOperation($this, $player);
    cgmcf_ControllerState_refresh($this);
};
function cgmcf_ReactionFlowService() {
    jl_Object.call(this);
    this.$state5 = null;
}
let cgmcf_ReactionFlowService_resolveJustSayNoChain = ($this, $originalActor, $challengedPlayer, $effectName) => {
    let $cancelled, var$5, var$6, $justSayNoCard, $message, $useJustSayNo, var$10;
    $cancelled = 0;
    while (true) {
        cgmmc_ActionType_$callClinit();
        var$5 = cgmmc_ActionType_JUST_SAY_NO;
        var$6 = ju_Collection_stream(cgmmc_AbstractCardCollection_getCards($challengedPlayer.$hand));
        ju_Objects_requireNonNull($rt_cls(cgmmc_ActionCard));
        $justSayNoCard = new cgmcf_ReactionFlowService$findReactionCard$lambda$_2_0;
        $justSayNoCard.$_041 = $rt_cls(cgmmc_ActionCard);
        $message = jusi_SimpleStreamImpl_filter(var$6, $justSayNoCard);
        ju_Objects_requireNonNull($rt_cls(cgmmc_ActionCard));
        var$6 = new cgmcf_ReactionFlowService$findReactionCard$lambda$_2_1;
        var$6.$_05 = $rt_cls(cgmmc_ActionCard);
        $message = jusi_SimpleStreamImpl_map($message, var$6);
        var$6 = new cgmcf_ReactionFlowService$findReactionCard$lambda$_2_2;
        var$6.$_028 = var$5;
        $justSayNoCard = ju_Optional_orElse(jusi_SimpleStreamImpl_findFirst(jusi_SimpleStreamImpl_filter($message, var$6)), null);
        if ($justSayNoCard === null)
            break;
        $useJustSayNo = new juca_AtomicBoolean;
        $useJustSayNo.$value6 = 0;
        if ($cancelled)
            $message = $rt_s(99);
        else {
            $message = new jl_StringBuilder;
            jl_AbstractStringBuilder__init_($message);
            jl_AbstractStringBuilder_append(jl_StringBuilder_append(jl_StringBuilder_append($message, $rt_s(100)), $effectName), 63);
            $message = jl_AbstractStringBuilder_toString($message);
        }
        ju_Objects_requireNonNull($useJustSayNo);
        var$10 = new cgmcf_ReactionFlowService$resolveJustSayNoChain$lambda$_1_0;
        var$10.$_059 = $useJustSayNo;
        var$6 = $challengedPlayer.$type;
        cgmmg_PlayerType_$callClinit();
        $message = jl_Boolean_valueOf(!(var$6 !== cgmmg_PlayerType_COMPUTER && (typeof globalThis.confirm === 'function' && globalThis.confirm($rt_ustr($message)) ? 1 : 0)) ? 0 : 1);
        var$10.$_059.$value6 = $message.$value2;
        if (!$useJustSayNo.$value6)
            return $cancelled;
        cgmmc_AbstractCardCollection_remove($challengedPlayer.$hand, $justSayNoCard);
        cgmmc_AbstractCardCollection_add((cgmcf_ControllerState_game($this.$state5)).$discardPile, $justSayNoCard);
        $cancelled = $cancelled ? 0 : 1;
        $message = $originalActor;
        $originalActor = $challengedPlayer;
        $challengedPlayer = $message;
    }
    return $cancelled;
};
function cgmcf_TurnFlowService() {
    jl_Object.call(this);
    this.$state1 = null;
}
let cgmcf_TurnFlowService_beginTurn = $this => {
    let $game, var$2, var$3, var$4, var$5, var$6, var$7, var$8;
    cgmcf_ControllerState_requireGame($this.$state1);
    $game = cgmcf_ControllerState_game($this.$state1);
    var$2 = cgmcf_ControllerState_turnManager($this.$state1);
    var$3 = cgmmg_Game_getCurrentPlayer($game);
    var$2.$cardsPlayedThisTurn0 = 0;
    var$4 = var$2.$game0;
    var$4.$cardsPlayedThisTurn = 0;
    cgmmg_TurnState_$callClinit();
    var$4.$turnState = cgmmg_TurnState_START_OF_TURN;
    var$5 = cgmmc_AbstractCardCollection_size(var$3.$hand) ? var$2.$game0.$rules.$normalDrawCount : var$2.$game0.$rules.$emptyHandDrawCount;
    var$6 = 0;
    while (var$6 < var$5) {
        var$4 = var$2.$game0;
        var$7 = cgmmc_Deck_draw(var$4.$deck, 1, var$4.$discardPile);
        if (ju_AbstractCollection_isEmpty(var$7)) {
            var$4 = var$2.$game0;
            cgmmc_Deck_reshuffleFromDiscard(var$4.$deck, var$4.$discardPile);
            var$4 = var$2.$game0;
            var$7 = cgmmc_Deck_draw(var$4.$deck, 1, var$4.$discardPile);
        }
        if (!ju_AbstractCollection_isEmpty(var$7)) {
            var$8 = var$3.$hand;
            var$7 = ju_ArrayList_get(var$7, 0);
            cgmmc_AbstractCardCollection_add(var$8, var$7);
        }
        var$6 = var$6 + 1 | 0;
    }
    var$2.$game0.$turnState = cgmmg_TurnState_PLAYING_CARDS;
    var$2 = $this.$state1;
    var$5 = var$2.$turnCount + 1 | 0;
    var$2.$turnCount = var$5;
    var$3 = (cgmmg_Game_getCurrentPlayer($game)).$name;
    $game = new jl_StringBuilder;
    jl_AbstractStringBuilder__init_($game);
    jl_StringBuilder_append(jl_StringBuilder_append(jl_StringBuilder_append(jl_StringBuilder_append0(jl_StringBuilder_append($game, $rt_s(101)), var$5), $rt_s(11)), var$3), $rt_s(102));
    cgmcf_ControllerState_log(var$2, jl_AbstractStringBuilder_toString($game));
    cgmcf_ControllerState_refresh($this.$state1);
},
cgmcf_TurnFlowService_finishTurn = ($this, $player) => {
    let var$2, var$3, var$4, var$5;
    var$2 = $this.$state1;
    var$3 = $player.$name;
    var$4 = cgmmc_AbstractCardCollection_size($player.$hand);
    var$5 = new jl_StringBuilder;
    jl_AbstractStringBuilder__init_(var$5);
    jl_AbstractStringBuilder_append(jl_StringBuilder_append0(jl_StringBuilder_append(jl_StringBuilder_append(var$5, var$3), $rt_s(103)), var$4), 41);
    cgmcf_ControllerState_log(var$2, jl_AbstractStringBuilder_toString(var$5));
    cgmcf_ControllerState_checkWinAfterOwnTurnOperation($this.$state1, $player);
    if (ju_Optional_isEmpty(cgmmg_Game_getWinner(cgmcf_ControllerState_game($this.$state1))))
        cgmcf_TurnFlowService_beginTurn($this);
    else
        cgmcf_ControllerState_refresh($this.$state1);
};
function cgmcf_PaymentFlowService() {
    let a = this; jl_Object.call(a);
    a.$state3 = null;
    a.$reactionFlow = null;
}
let cgmcf_PaymentFlowService_describePayment = ($this, $request) => {
    a: {
        b: {
            c: {
                cgmcf_PaymentFlowService$1_$callClinit();
                switch (cgmcf_PaymentFlowService$1_$SwitchMap$com$group4$monopolydeal$engine$payment$PaymentReason.data[$request.$reason.$ordinal]) {
                    case 1:
                        break;
                    case 2:
                        break c;
                    case 3:
                        break b;
                    default:
                        $request = new jl_IncompatibleClassChangeError;
                        jl_Throwable__init_0($request);
                        $rt_throw($request);
                }
                $request = $rt_s(104);
                break a;
            }
            $request = $rt_s(105);
            break a;
        }
        $request = $rt_s(106);
    }
    return $request;
};
function cgmcf_CardPlayFlowService() {
    let a = this; jl_Object.call(a);
    a.$state0 = null;
    a.$reactionFlow0 = null;
}
let cgmcf_CardPlayFlowService_playCard = ($this, $player, $card, $resolvedRequest) => {
    let $actionCard, $buildingCard, $wildcard, $propertyCard, var$8;
    cgmcf_ControllerState_requireGame($this.$state0);
    cgmcf_ControllerState_requireCurrentPlayer($this.$state0, $player);
    cgmcf_ControllerState_requirePlayPhase($this.$state0);
    $actionCard = cgmcf_ControllerState_game($this.$state0);
    if ($actionCard.$cardsPlayedThisTurn < $actionCard.$rules.$maxCardsPlayedPerTurn) {
        if (ju_AbstractCollection_contains(cgmmc_AbstractCardCollection_getCards($player.$hand), $card)) {
            if ($resolvedRequest === null)
                $resolvedRequest = cgmc_GameController$PlayCardRequest_defaultPlay();
            if (!$resolvedRequest.$playToBank) {
                if (!($card instanceof cgmmc_PropertyCard)) {
                    if (!($card instanceof cgmmc_WildcardCard)) {
                        if (!($card instanceof cgmmc_MoneyCard)) {
                            if ($card instanceof cgmmc_BuildingCard) {
                                $buildingCard = $card;
                                $card = ju_Collection_stream(cgmmc_PropertyCollection_getCompletedSets($player.$properties));
                                $actionCard = new cgmcf_CardPlayFlowService$playBuilding$lambda$_5_0;
                                $actionCard.$_024 = $buildingCard;
                                $card = jusi_SimpleStreamImpl_filter($card, $actionCard);
                                $actionCard = new cgmcf_CardPlayFlowService$playBuilding$lambda$_5_1;
                                $wildcard = jus_Stream_toList(jusi_SimpleStreamImpl_map($card, $actionCard));
                                if (!ju_AbstractCollection_isEmpty($wildcard)) {
                                    $card = $resolvedRequest.$chosenColor0;
                                    if ($card !== null) {
                                        cgmmc_PropertyCollection_attachBuilding($player.$properties, $buildingCard, $card);
                                        cgmcf_ControllerState_removeCardFromHand($this.$state0, $player, $buildingCard);
                                        cgmcf_ControllerState_afterSuccessfulPlay($this.$state0, $player, 1);
                                    } else {
                                        $propertyCard = cgmcf_ControllerState_view($this.$state0);
                                        var$8 = cgmmc_Card_getName($buildingCard);
                                        $card = cgmcf_CardPlayFlowService$playBuilding$lambda$_5_2__init_0($this, $player, $buildingCard, $resolvedRequest);
                                        w_DealBrowser_promptColorSelection($propertyCard, $player, var$8, $rt_s(107), $wildcard, $card);
                                    }
                                    $card = $this.$state0;
                                    $player = cgmmg_Player_getName($player);
                                    $actionCard = cgmmc_Card_getName($buildingCard);
                                    $resolvedRequest = jl_String_valueOf(cgmc_GameController$PlayCardRequest_chosenColor($resolvedRequest));
                                    $buildingCard = jl_StringBuilder__init_();
                                    jl_StringBuilder_append(jl_StringBuilder_append(jl_StringBuilder_append(jl_StringBuilder_append(jl_StringBuilder_append($buildingCard, $player), $rt_s(108)), $actionCard), $rt_s(109)), $resolvedRequest);
                                    cgmcf_ControllerState_log($card, jl_StringBuilder_toString($buildingCard));
                                    return;
                                }
                                $player = new cgme_InvalidMoveException;
                                jl_Throwable__init_($player, $rt_s(110));
                                $rt_throw($player);
                            }
                            if ($card instanceof cgmmc_ActionCard) {
                                $actionCard = $card;
                                cgmcf_CardPlayFlowService_playActionCard($this, $player, $actionCard, $resolvedRequest);
                                $card = $this.$state0;
                                $player = cgmmg_Player_getName($player);
                                $resolvedRequest = cgmmc_Card_getName($actionCard);
                                $actionCard = jl_StringBuilder__init_();
                                jl_StringBuilder_append(jl_StringBuilder_append(jl_StringBuilder_append($actionCard, $player), $rt_s(111)), $resolvedRequest);
                                cgmcf_ControllerState_log($card, jl_StringBuilder_toString($actionCard));
                                return;
                            }
                            $rt_throw(cgme_InvalidMoveException__init_($rt_s(112)));
                        }
                        cgmcf_ControllerState_removeCardFromHand($this.$state0, $player, $card);
                        cgmmc_Bank_add($player.$bank, $card);
                        cgmcf_ControllerState_afterSuccessfulPlay($this.$state0, $player, 1);
                        $resolvedRequest = $this.$state0;
                        $actionCard = $player.$name;
                        $player = jl_String_valueOf($card);
                        $card = new jl_StringBuilder;
                        jl_AbstractStringBuilder__init_($card);
                        jl_StringBuilder_append(jl_StringBuilder_append(jl_StringBuilder_append($card, $actionCard), $rt_s(113)), $player);
                        cgmcf_ControllerState_log($resolvedRequest, jl_AbstractStringBuilder_toString($card));
                        return;
                    }
                    $wildcard = $card;
                    $actionCard = $resolvedRequest.$chosenColor0;
                    if ($actionCard === null) {
                        $actionCard = $this.$state0.$view0;
                        $buildingCard = ju_ArrayList__init_0(cgmmc_WildcardCard_getAllowedColors($wildcard));
                        $card = new cgmcf_CardPlayFlowService$playWildcard$lambda$_4_0;
                        $card.$_012 = $this;
                        $card.$_14 = $player;
                        $card.$_22 = $wildcard;
                        $card.$_32 = $resolvedRequest;
                        w_DealBrowser_promptColorSelection($actionCard, $player, $rt_s(114), $rt_s(115), $buildingCard, $card);
                    } else {
                        cgmmc_PropertyColor_$callClinit();
                        if ($actionCard !== cgmmc_PropertyColor_ANY) {
                            cgmmc_PropertyCollection_addWildcard($player.$properties, $wildcard, $actionCard);
                            cgmcf_ControllerState_removeCardFromHand($this.$state0, $player, $wildcard);
                            $actionCard = $this.$state0;
                            $card = $player.$name;
                            $wildcard = $wildcard.$name0;
                            $resolvedRequest = jl_String_valueOf($resolvedRequest.$chosenColor0);
                            $buildingCard = new jl_StringBuilder;
                            jl_AbstractStringBuilder__init_($buildingCard);
                            jl_StringBuilder_append(jl_StringBuilder_append(jl_StringBuilder_append(jl_StringBuilder_append(jl_StringBuilder_append($buildingCard, $card), $rt_s(111)), $wildcard), $rt_s(109)), $resolvedRequest);
                            cgmcf_ControllerState_log($actionCard, jl_AbstractStringBuilder_toString($buildingCard));
                            cgmcf_ControllerState_afterSuccessfulPlay($this.$state0, $player, 1);
                        } else {
                            $player = new cgme_InvalidMoveException;
                            jl_Throwable__init_($player, $rt_s(116));
                            $rt_throw($player);
                        }
                    }
                    return;
                }
                $propertyCard = $card;
                cgmmc_PropertyCollection_addProperty($player.$properties, $propertyCard, $propertyCard.$color0);
                cgmcf_ControllerState_removeCardFromHand($this.$state0, $player, $card);
                cgmcf_ControllerState_afterSuccessfulPlay($this.$state0, $player, 1);
                $resolvedRequest = $this.$state0;
                $actionCard = $player.$name;
                $player = jl_String_valueOf($card);
                $card = jl_String_valueOf($propertyCard.$color0);
                $buildingCard = new jl_StringBuilder;
                jl_AbstractStringBuilder__init_($buildingCard);
                jl_StringBuilder_append(jl_StringBuilder_append(jl_StringBuilder_append(jl_StringBuilder_append(jl_StringBuilder_append($buildingCard, $actionCard), $rt_s(111)), $player), $rt_s(109)), $card);
                cgmcf_ControllerState_log($resolvedRequest, jl_AbstractStringBuilder_toString($buildingCard));
                return;
            }
            if ($card.$canBeBanked()) {
                cgmcf_ControllerState_removeCardFromHand($this.$state0, $player, $card);
                cgmmc_Bank_add($player.$bank, $card);
                cgmcf_ControllerState_afterSuccessfulPlay($this.$state0, $player, 1);
                $resolvedRequest = $this.$state0;
                $actionCard = $player.$name;
                $player = jl_String_valueOf($card);
                $card = new jl_StringBuilder;
                jl_AbstractStringBuilder__init_($card);
                jl_StringBuilder_append(jl_StringBuilder_append(jl_StringBuilder_append($card, $actionCard), $rt_s(113)), $player);
                cgmcf_ControllerState_log($resolvedRequest, jl_AbstractStringBuilder_toString($card));
                return;
            }
            $player = new cgme_InvalidMoveException;
            jl_Throwable__init_($player, $rt_s(117));
            $rt_throw($player);
        }
        $card = new cgme_InvalidMoveException;
        jl_Throwable__init_($card, $rt_s(118));
        $rt_throw($card);
    }
    $card = new cgme_InvalidMoveException;
    jl_Throwable__init_($card, $rt_s(119));
    $rt_throw($card);
},
cgmcf_CardPlayFlowService_playActionCard = ($this, $player, $actionCard, $request) => {
    let $context, $doubleRentCards, var$6, $result, var$8, var$9, $playsConsumed;
    $context = $actionCard.$actionType;
    cgmmc_ActionType_$callClinit();
    if ($context !== cgmmc_ActionType_JUST_SAY_NO && $context !== cgmmc_ActionType_DOUBLE_THE_RENT) {
        a: {
            cgmcf_CardPlayFlowService$1_$callClinit();
            switch (cgmcf_CardPlayFlowService$1_$SwitchMap$com$group4$monopolydeal$model$card$ActionType.data[$context.$ordinal]) {
                case 1:
                case 2:
                    if (!$request.$doubleRentCount0)
                        break a;
                    $actionCard = new cgme_InvalidMoveException;
                    jl_Throwable__init_($actionCard, $rt_s(120));
                    $rt_throw($actionCard);
                case 3:
                    cgmcf_CardPlayFlowService_requireTargetOpponent($this, $player, $request.$targetPlayer1, $context);
                    if (!$request.$doubleRentCount0)
                        break a;
                    $player = new cgme_InvalidMoveException;
                    jl_Throwable__init_($player, $rt_s(120));
                    $rt_throw($player);
                case 4:
                    cgmcf_CardPlayFlowService_requireTargetOpponent($this, $player, $request.$targetPlayer1, $context);
                    if ($request.$selectedCards0.$size() == 1)
                        break a;
                    $player = new cgme_InvalidMoveException;
                    jl_Throwable__init_($player, $rt_s(121));
                    $rt_throw($player);
                case 5:
                    cgmcf_CardPlayFlowService_requireTargetOpponent($this, $player, $request.$targetPlayer1, $context);
                    if ($request.$selectedCards0.$size() == 2)
                        break a;
                    $player = new cgme_InvalidMoveException;
                    jl_Throwable__init_($player, $rt_s(122));
                    $rt_throw($player);
                case 6:
                    cgmcf_CardPlayFlowService_requireTargetOpponent($this, $player, $request.$targetPlayer1, $context);
                    if ($request.$chosenColor0 !== null)
                        break a;
                    $player = new cgme_InvalidMoveException;
                    jl_Throwable__init_($player, $rt_s(123));
                    $rt_throw($player);
                case 7:
                    cgmcf_ControllerState_ensureEnoughPlays($this.$state0, 1 + $request.$doubleRentCount0 | 0);
                    if ($request.$chosenColor0 !== null) {
                        $doubleRentCards = cgmmc_ActionCard_getRentColors($actionCard);
                        $context = $request.$chosenColor0;
                        if (ju_TemplateCollections$NElementSet_contains($doubleRentCards, $context)) {
                            if ($request.$targetPlayer1 === null)
                                break a;
                            $player = new cgme_InvalidMoveException;
                            jl_Throwable__init_($player, $rt_s(124));
                            $rt_throw($player);
                        }
                    }
                    $player = new cgme_InvalidMoveException;
                    jl_Throwable__init_($player, $rt_s(125));
                    $rt_throw($player);
                case 8:
                    cgmcf_ControllerState_ensureEnoughPlays($this.$state0, 1 + $request.$doubleRentCount0 | 0);
                    cgmcf_CardPlayFlowService_requireTargetOpponent($this, $player, $request.$targetPlayer1, $context);
                    if ($request.$chosenColor0 !== null)
                        break a;
                    $player = new cgme_InvalidMoveException;
                    jl_Throwable__init_($player, $rt_s(126));
                    $rt_throw($player);
                default:
            }
            $player = new cgme_InvalidMoveException;
            $actionCard = jl_String_valueOf($context);
            $request = new jl_StringBuilder;
            jl_AbstractStringBuilder__init_($request);
            jl_StringBuilder_append(jl_StringBuilder_append($request, $rt_s(127)), $actionCard);
            jl_Throwable__init_($player, jl_AbstractStringBuilder_toString($request));
            $rt_throw($player);
        }
        var$6 = $request.$doubleRentCount0;
        if (!var$6)
            $doubleRentCards = ju_List_of();
        else {
            if ($actionCard.$actionType !== cgmmc_ActionType_RENT && cgmmc_ActionCard_getActionType($actionCard) !== cgmmc_ActionType_MULTI_COLOUR_RENT)
                $rt_throw(cgme_InvalidMoveException__init_($rt_s(128)));
            $doubleRentCards = ju_Collection_stream(cgmmc_AbstractCardCollection_getCards($player.$hand));
            ju_Objects_requireNonNull($rt_cls(cgmmc_ActionCard));
            $result = cgmcf_CardPlayFlowService$resolveDoubleRentCards$lambda$_10_0__init_($rt_cls(cgmmc_ActionCard));
            $doubleRentCards = jusi_SimpleStreamImpl_filter($doubleRentCards, $result);
            ju_Objects_requireNonNull($rt_cls(cgmmc_ActionCard));
            $result = cgmcf_CardPlayFlowService$resolveDoubleRentCards$lambda$_10_1__init_0($rt_cls(cgmmc_ActionCard));
            $doubleRentCards = jusi_SimpleStreamImpl_map($doubleRentCards, $result);
            $context = cgmcf_CardPlayFlowService$resolveDoubleRentCards$lambda$_10_2__init_($actionCard);
            $doubleRentCards = jusi_SimpleStreamImpl_filter($doubleRentCards, $context);
            $context = new cgmcf_CardPlayFlowService$resolveDoubleRentCards$lambda$_10_3;
            $doubleRentCards = jusi_SimpleStreamImpl_filter($doubleRentCards, $context);
            var$8 = Long_fromInt(var$6);
            $doubleRentCards = jus_Stream_toList(jusi_SimpleStreamImpl_limit($doubleRentCards, var$8));
            if (ju_TemplateCollections$ImmutableArrayList_size($doubleRentCards) == var$6)
                $doubleRentCards = ju_List_copyOf($doubleRentCards);
            else
                $rt_throw(cgme_InvalidMoveException__init_($rt_s(129)));
        }
        if (cgmcf_CardPlayFlowService_needsPreResolutionJustSayNo($this, $actionCard) && cgmc_GameController$PlayCardRequest_targetPlayer($request) !== null) {
            $context = $this.$reactionFlow0;
            $result = cgmc_GameController$PlayCardRequest_targetPlayer($request);
            var$9 = $actionCard;
            if (cgmcf_ReactionFlowService_resolveJustSayNoChain($context, $player, $result, cgmmc_Card_getName(var$9))) {
                cgmcf_CardPlayFlowService_consumeActionCards($this, $player, $actionCard, ju_List_of());
                cgmmg_Game_incrementCardsPlayedThisTurn(cgmcf_ControllerState_game($this.$state0), 1);
                $player = cgmcf_ControllerState_view($this.$state0);
                $actionCard = cgmmc_Card_getName(var$9);
                $request = jl_StringBuilder__init_();
                jl_StringBuilder_append(jl_StringBuilder_append($request, $actionCard), $rt_s(130));
                $actionCard = jl_StringBuilder_toString($request);
                w_DealBrowser_showMessage($player, $actionCard);
                cgmcf_ControllerState_refresh($this.$state0);
                return;
            }
        }
        $context = cgmea_ActionContext__init_0(cgmcf_ControllerState_game($this.$state0), $player, $actionCard, cgmc_GameController$PlayCardRequest_targetPlayer($request), cgmc_GameController$PlayCardRequest_selectedCards($request), cgmc_GameController$PlayCardRequest_chosenColor($request), cgmc_GameController$PlayCardRequest_doubleRentCount($request));
        $result = cgmea_ActionCardExecutor_execute(cgmcf_ControllerState_actionExecutor($this.$state0), $context);
        $request = cgmcf_ControllerState_view($this.$state0);
        $context = cgmea_ActionResult_message0($result);
        w_DealBrowser_showMessage($request, $context);
        $request = cgmea_ActionResult_paymentRequests($result);
        $context = cgmcf_ControllerState_view($this.$state0);
        ju_Objects_requireNonNull($context);
        $result = cgmcf_CardPlayFlowService$playActionCard$lambda$_6_0__init_0($context);
        jl_Iterable_forEach($request, $result);
        cgmcf_CardPlayFlowService_consumeActionCards($this, $player, $actionCard, $doubleRentCards);
        $playsConsumed = 1 + $doubleRentCards.$size() | 0;
        cgmmg_Game_incrementCardsPlayedThisTurn(cgmcf_ControllerState_game($this.$state0), $playsConsumed);
        cgmcf_ControllerState_checkWinAfterOwnTurnOperation($this.$state0, $player);
        cgmcf_ControllerState_refresh($this.$state0);
        return;
    }
    $player = new cgme_InvalidMoveException;
    $request = $actionCard.$name0;
    $actionCard = new jl_StringBuilder;
    jl_AbstractStringBuilder__init_($actionCard);
    jl_StringBuilder_append(jl_StringBuilder_append($actionCard, $request), $rt_s(131));
    jl_Throwable__init_($player, jl_AbstractStringBuilder_toString($actionCard));
    $rt_throw($player);
},
cgmcf_CardPlayFlowService_requireTargetOpponent = ($this, $player, $target, $type) => {
    if ($target === null) {
        $player = new cgme_InvalidMoveException;
        $target = jl_String_valueOf($type);
        $type = new jl_StringBuilder;
        jl_AbstractStringBuilder__init_($type);
        jl_StringBuilder_append(jl_StringBuilder_append($type, $target), $rt_s(132));
        jl_Throwable__init_($player, jl_AbstractStringBuilder_toString($type));
        $rt_throw($player);
    }
    if (cgmmg_Player_equals($target, $player)) {
        $target = new cgme_InvalidMoveException;
        jl_Throwable__init_($target, $rt_s(133));
        $rt_throw($target);
    }
},
cgmcf_CardPlayFlowService_needsPreResolutionJustSayNo = ($this, $actionCard) => {
    let var$2;
    a: {
        b: {
            cgmcf_CardPlayFlowService$1_$callClinit();
            switch (cgmcf_CardPlayFlowService$1_$SwitchMap$com$group4$monopolydeal$model$card$ActionType.data[$actionCard.$actionType.$ordinal]) {
                case 4:
                case 5:
                case 6:
                    break;
                default:
                    break b;
            }
            var$2 = 1;
            break a;
        }
        var$2 = 0;
    }
    return var$2;
},
cgmcf_CardPlayFlowService_consumeActionCards = ($this, $player, $primaryCard, $extraCards) => {
    let $extraCard;
    cgmcf_ControllerState_removeCardFromHand($this.$state0, $player, $primaryCard);
    cgmmc_AbstractCardCollection_add((cgmcf_ControllerState_game($this.$state0)).$discardPile, $primaryCard);
    $primaryCard = $extraCards.$iterator();
    while ($primaryCard.$hasNext()) {
        $extraCard = $primaryCard.$next();
        cgmcf_ControllerState_removeCardFromHand($this.$state0, $player, $extraCard);
        cgmmc_AbstractCardCollection_add((cgmcf_ControllerState_game($this.$state0)).$discardPile, $extraCard);
    }
},
ju_Collections = $rt_classWithoutFields(),
ju_Collections_EMPTY_SET = null,
ju_Collections_EMPTY_MAP = null,
ju_Collections_EMPTY_LIST = null,
ju_Collections_EMPTY_ITERATOR = null,
ju_Collections_EMPTY_LIST_ITERATOR = null,
ju_Collections_reverseOrder = null,
ju_Collections_$callClinit = () => {
    ju_Collections_$callClinit = $rt_eraseClinit(ju_Collections);
    ju_Collections__clinit_();
},
ju_Collections_emptyIterator = () => {
    ju_Collections_$callClinit();
    return ju_Collections_EMPTY_ITERATOR;
},
ju_Collections_shuffle = $list => {
    let var$2, var$3;
    ju_Collections_$callClinit();
    var$2 = ju_Random__init_();
    if ($rt_isInstance($list, ju_RandomAccess))
        ju_Collections_shuffleRandomAccess($list, var$2);
    else {
        var$3 = ju_ArrayList__init_0($list);
        ju_Collections_shuffleRandomAccess(var$3, var$2);
        ju_ArrayList_clear($list);
        ju_AbstractCollection_addAll($list, var$3);
    }
},
ju_Collections_shuffleRandomAccess = ($list, $rnd) => {
    let $i, $j, var$5;
    ju_Collections_$callClinit();
    $list = $list;
    $i = $list.$size0 - 1 | 0;
    while ($i > 0) {
        $j = jur_RandomGenerator_nextInt($rnd, $i + 1 | 0);
        var$5 = ju_ArrayList_get($list, $i);
        ju_ArrayList_set($list, $i, ju_ArrayList_get($list, $j));
        ju_ArrayList_set($list, $j, var$5);
        $i = $i + (-1) | 0;
    }
},
ju_Collections_unmodifiableList = $list => {
    let var$2;
    ju_Collections_$callClinit();
    ju_Objects_requireNonNull($list);
    var$2 = new ju_Collections$9;
    var$2.$val$list = $list;
    return var$2;
},
ju_Collections_unmodifiableMap = $m => {
    let var$2;
    ju_Collections_$callClinit();
    ju_Objects_requireNonNull($m);
    var$2 = new ju_Collections$13;
    var$2.$val$m = $m;
    return var$2;
},
ju_Collections__clinit_ = () => {
    ju_Collections_EMPTY_SET = new ju_Collections$1;
    ju_Collections_EMPTY_MAP = new ju_Collections$2;
    ju_Collections_EMPTY_LIST = new ju_Collections$3;
    ju_Collections_EMPTY_ITERATOR = new ju_Collections$4;
    ju_Collections_EMPTY_LIST_ITERATOR = new ju_Collections$5;
    ju_Collections_reverseOrder = new ju_Collections$_clinit_$lambda$_59_0;
};
function jl_Enum() {
    let a = this; jl_Object.call(a);
    a.$name1 = null;
    a.$ordinal = 0;
}
let jl_Enum__init_ = ($this, $name, $ordinal) => {
    $this.$name1 = $name;
    $this.$ordinal = $ordinal;
},
jl_Enum_toString = $this => {
    return $this.$name1;
},
jl_Enum_equals = ($this, $other) => {
    return $this !== $other ? 0 : 1;
},
jl_Enum_hashCode = $this => {
    return jl_Object_identity($this);
},
jl_Enum_getDeclaringClass = $this => {
    let $result;
    $result = jl_Object_getClass($this);
    if (!jl_Object_equals(jl_Class_getSuperclass($result), $rt_cls(jl_Enum)))
        $result = jl_Class_getSuperclass($result);
    return $result;
},
jl_Enum_compareTo = ($this, var$1) => {
    let var$2, var$3, var$4;
    var$1 = var$1;
    if (jl_Enum_getDeclaringClass(var$1) !== jl_Enum_getDeclaringClass($this)) {
        var$2 = new jl_IllegalArgumentException;
        var$3 = jl_String_valueOf(jl_Enum_getDeclaringClass($this));
        var$1 = jl_String_valueOf(jl_Enum_getDeclaringClass(var$1));
        var$4 = new jl_StringBuilder;
        jl_AbstractStringBuilder__init_(var$4);
        jl_StringBuilder_append(jl_StringBuilder_append(jl_StringBuilder_append(jl_StringBuilder_append(var$4, $rt_s(134)), var$3), $rt_s(109)), var$1);
        jl_Throwable__init_(var$2, jl_AbstractStringBuilder_toString(var$4));
        $rt_throw(var$2);
    }
    return jl_Integer_compare($this.$ordinal, var$1.$ordinal);
},
w_Wire = $rt_classWithoutFields(),
w_Wire_object = $pairs => {
    let $fields, $i, var$4, var$5, var$6;
    $fields = ju_LinkedHashMap__init_();
    $i = 0;
    while (true) {
        var$4 = $pairs.data;
        if ($i >= var$4.length)
            break;
        var$5 = var$4[$i];
        var$6 = var$4[$i + 1 | 0];
        ju_LinkedHashMap_put($fields, var$5, var$6);
        $i = $i + 2 | 0;
    }
    return $fields;
},
w_Wire_encode = $value => {
    let $fields, $out, $field, $item, $items;
    if ($value !== null) {
        if (!($value instanceof jl_String)) {
            if (!($value instanceof jl_Number) && !($value instanceof jl_Boolean)) {
                if ($rt_isInstance($value, ju_Map)) {
                    $fields = $value;
                    $out = jl_StringBuilder__init_0($rt_s(135));
                    $value = ju_LinkedHashMapEntrySet_iterator(ju_LinkedHashMap_entrySet($fields));
                    $fields = $value;
                    while (ju_LinkedHashMapIterator_hasNext($fields)) {
                        $field = ju_LinkedHashMapIterator$EntryIterator_next($value);
                        if ($out.$length0 > 1)
                            jl_AbstractStringBuilder_append($out, 44);
                        $item = $field;
                        $items = jl_StringBuilder_append1($out, w_Wire_quote($item.$key));
                        jl_AbstractStringBuilder_append($items, 58);
                        jl_StringBuilder_append1($items, w_Wire_encode($item.$value0));
                    }
                    jl_AbstractStringBuilder_append($out, 125);
                    return jl_AbstractStringBuilder_toString($out);
                }
                if ($rt_isInstance($value, ju_List)) {
                    $items = $value;
                    $out = jl_StringBuilder__init_0($rt_s(136));
                    $value = $items.$iterator();
                    while ($value.$hasNext()) {
                        $item = $value.$next();
                        if ($out.$length0 > 1)
                            jl_AbstractStringBuilder_append($out, 44);
                        jl_StringBuilder_append1($out, w_Wire_encode($item));
                    }
                    jl_AbstractStringBuilder_append($out, 93);
                    return jl_AbstractStringBuilder_toString($out);
                }
                $items = new jl_IllegalArgumentException;
                jl_Throwable__init_($items, $rt_s(137));
                $rt_throw($items);
            }
            return $value.$toString();
        }
        return w_Wire_quote($value);
    }
    return $rt_s(0);
},
w_Wire_quote = $text => {
    let $out, $i, $c, $hex;
    $out = jl_StringBuilder__init_0($rt_s(138));
    $i = 0;
    while ($i < $text.$nativeString.length) {
        $c = jl_String_charAt($text, $i);
        if (!($c != 34 && $c != 92)) {
            jl_AbstractStringBuilder_append($out, 92);
            jl_AbstractStringBuilder_append($out, $c);
        } else if ($c >= 32)
            jl_AbstractStringBuilder_append($out, $c);
        else {
            $hex = jl_Integer_toHexString($c);
            jl_StringBuilder_append1(jl_StringBuilder_append1(jl_StringBuilder_append1($out, $rt_s(139)), $hex.$nativeString.length != 1 ? $rt_s(3) : $rt_s(7)), $hex);
        }
        $i = $i + 1 | 0;
    }
    jl_AbstractStringBuilder_append($out, 34);
    return jl_AbstractStringBuilder_toString($out);
};
function jur_Pattern() {
    let a = this; jl_Object.call(a);
    a.$lexemes = null;
    a.$flags = 0;
    a.$backRefs = null;
    a.$needsBackRefReplacement = 0;
    a.$globalGroupIndex = 0;
    a.$compCount = 0;
    a.$consCount = 0;
    a.$start0 = null;
    a.$namedGroups = null;
}
let jur_Pattern_pattern = $this => {
    return $this.$lexemes.$orig;
},
jur_Pattern_processExpression = ($this, $ch, $newFlags, $last) => {
    let $children, $saveFlags, $saveChangedFlags, $fSet, var$8, $child;
    $children = ju_ArrayList__init_();
    $saveFlags = $this.$flags;
    $saveChangedFlags = 0;
    if ($newFlags != $saveFlags)
        $this.$flags = $newFlags;
    a: {
        b: {
            c: {
                d: {
                    e: {
                        switch ($ch) {
                            case -1073741784:
                                break e;
                            case -536870872:
                            case -268435416:
                                break;
                            case -134217688:
                            case -67108824:
                                break d;
                            case -33554392:
                                break c;
                            default:
                                break b;
                        }
                        $fSet = new jur_AheadFSet;
                        jur_FSet__init_($fSet, (-1));
                        break a;
                    }
                    $fSet = new jur_NonCapFSet;
                    $newFlags = $this.$consCount + 1 | 0;
                    $this.$consCount = $newFlags;
                    jur_FSet__init_($fSet, $newFlags);
                    break a;
                }
                $fSet = new jur_BehindFSet;
                $newFlags = $this.$consCount + 1 | 0;
                $this.$consCount = $newFlags;
                jur_FSet__init_($fSet, $newFlags);
                break a;
            }
            $fSet = new jur_AtomicFSet;
            $newFlags = $this.$consCount + 1 | 0;
            $this.$consCount = $newFlags;
            jur_FSet__init_($fSet, $newFlags);
            break a;
        }
        $newFlags = $this.$globalGroupIndex + 1 | 0;
        $this.$globalGroupIndex = $newFlags;
        if ($last === null) {
            $fSet = new jur_FinalSet;
            jur_FSet__init_($fSet, 0);
            $saveChangedFlags = 1;
        } else {
            $fSet = jur_FSet__init_0($newFlags);
            if ($ch == (-2130706392)) {
                if ($this.$namedGroups === null)
                    $this.$namedGroups = ju_LinkedHashMap__init_();
                $this.$namedGroups.$put($this.$lexemes.$groupName, jl_Integer_valueOf($this.$globalGroupIndex));
            }
        }
        var$8 = $this.$globalGroupIndex;
        if (var$8 > (-1) && var$8 < 10)
            $this.$backRefs.data[var$8] = $fSet;
    }
    while (true) {
        if (!(jur_Lexer_isLetter($this.$lexemes) && $this.$lexemes.$lookAhead == (-536870788))) {
            if ($this.$lexemes.$ch == (-536870788)) {
                $child = jur_EmptySet__init_($fSet);
                jur_Lexer_next($this.$lexemes);
            } else {
                $child = jur_Pattern_processSubExpression($this, $fSet);
                $last = $this.$lexemes;
                if ($last.$ch == (-536870788))
                    jur_Lexer_next($last);
            }
        } else {
            $last = jur_CharClass__init_0(jur_Pattern_hasFlag($this, 2), jur_Pattern_hasFlag($this, 64));
            while (!jur_Lexer_isEmpty($this.$lexemes) && jur_Lexer_isLetter($this.$lexemes)) {
                $child = $this.$lexemes;
                var$8 = $child.$lookAhead;
                if (var$8 && var$8 != (-536870788) && var$8 != (-536870871))
                    break;
                jur_CharClass_add0($last, jur_Lexer_next($child));
                $child = $this.$lexemes;
                if ($child.$ch != (-536870788))
                    continue;
                jur_Lexer_next($child);
            }
            $child = jur_Pattern_processRangeSet($this, $last);
            $child.$setNext($fSet);
        }
        if ($child !== null)
            ju_ArrayList_add($children, $child);
        if (jur_Lexer_isEmpty($this.$lexemes))
            break;
        if ($this.$lexemes.$ch == (-536870871))
            break;
    }
    if ($this.$lexemes.$lookBack == (-536870788))
        ju_ArrayList_add($children, jur_EmptySet__init_($fSet));
    if ($this.$flags != $saveFlags && !$saveChangedFlags) {
        $this.$flags = $saveFlags;
        $last = $this.$lexemes;
        $last.$flags0 = $saveFlags;
        $last.$lookAhead = $last.$ch;
        $last.$lookAheadST = $last.$curST;
        var$8 = $last.$curToc;
        $last.$index = var$8 + 1 | 0;
        $last.$lookAheadToc = var$8;
        jur_Lexer_movePointer($last);
    }
    switch ($ch) {
        case -1073741784:
            break;
        case -536870872:
            $last = new jur_PositiveLookAhead;
            jur_JointSet__init_($last, $children, $fSet);
            return $last;
        case -268435416:
            $last = new jur_NegativeLookAhead;
            jur_JointSet__init_($last, $children, $fSet);
            return $last;
        case -134217688:
            $last = new jur_PositiveLookBehind;
            jur_JointSet__init_($last, $children, $fSet);
            return $last;
        case -67108824:
            $last = new jur_NegativeLookBehind;
            jur_JointSet__init_($last, $children, $fSet);
            return $last;
        case -33554392:
            $last = new jur_AtomicJointSet;
            jur_JointSet__init_($last, $children, $fSet);
            return $last;
        default:
            switch ($children.$size0) {
                case 0:
                    break;
                case 1:
                    return jur_SingleSet__init_0(ju_ArrayList_get($children, 0), $fSet);
                default:
                    return jur_JointSet__init_0($children, $fSet);
            }
            return jur_EmptySet__init_($fSet);
    }
    $last = new jur_NonCapJointSet;
    jur_JointSet__init_($last, $children, $fSet);
    return $last;
},
jur_Pattern_processDecomposedChar = $this => {
    let $codePoints, $curSymb, $curSymbIndex, $codePointsHangul, var$5, var$6, $readCodePoints;
    $codePoints = $rt_createIntArray(4);
    $curSymb = (-1);
    $curSymbIndex = (-1);
    if (!jur_Lexer_isEmpty($this.$lexemes) && jur_Lexer_isLetter($this.$lexemes)) {
        $codePointsHangul = $codePoints.data;
        $curSymb = jur_Lexer_next($this.$lexemes);
        $codePointsHangul[0] = $curSymb;
        $curSymbIndex = $curSymb - 4352 | 0;
    }
    if ($curSymbIndex >= 0 && $curSymbIndex < 19) {
        $codePointsHangul = $rt_createCharArray(3);
        $codePoints = $codePointsHangul.data;
        $codePoints[0] = $curSymb & 65535;
        var$5 = $this.$lexemes;
        var$6 = var$5.$ch;
        $readCodePoints = var$6 - 4449 | 0;
        if ($readCodePoints >= 0 && $readCodePoints < 21) {
            $codePoints[1] = var$6 & 65535;
            jur_Lexer_next(var$5);
            var$5 = $this.$lexemes;
            var$6 = var$5.$ch;
            $curSymb = var$6 - 4519 | 0;
            if ($curSymb >= 0 && $curSymb < 28) {
                $codePoints[2] = var$6 & 65535;
                jur_Lexer_next(var$5);
                return jur_HangulDecomposedCharSet__init_($codePointsHangul, 3);
            }
            return jur_HangulDecomposedCharSet__init_($codePointsHangul, 2);
        }
        if (jur_Pattern_hasFlag($this, 2)) {
            if (!jur_Pattern_hasFlag($this, 64))
                return jur_CICharSet__init_($codePoints[0]);
            return jur_UCICharSet__init_($codePoints[0]);
        }
        return jur_CharSet__init_($codePoints[0]);
    }
    $codePointsHangul = $codePoints.data;
    $curSymb = 1;
    while ($curSymb < 4 && !jur_Lexer_isEmpty($this.$lexemes) && jur_Lexer_isLetter($this.$lexemes)) {
        $readCodePoints = $curSymb + 1 | 0;
        $codePointsHangul[$curSymb] = jur_Lexer_next($this.$lexemes);
        $curSymb = $readCodePoints;
    }
    if ($curSymb == 1) {
        $readCodePoints = $codePointsHangul[0];
        if (!(jur_Lexer_singleDecompTable.$get1($readCodePoints) == jur_Lexer_singleDecompTableSize ? 0 : 1))
            return jur_Pattern_processCharSet($this, $codePointsHangul[0]);
    }
    if (jur_Pattern_hasFlag($this, 2)) {
        if (!jur_Pattern_hasFlag($this, 64)) {
            var$5 = new jur_CIDecomposedCharSet;
            jur_DecomposedCharSet__init_(var$5, $codePoints, $curSymb);
            return var$5;
        }
        var$5 = new jur_UCIDecomposedCharSet;
        jur_DecomposedCharSet__init_(var$5, $codePoints, $curSymb);
        return var$5;
    }
    return jur_DecomposedCharSet__init_0($codePoints, $curSymb);
},
jur_Pattern_processSubExpression = ($this, $last) => {
    let $term, $cur, var$4, var$5, var$6, $next, var$8;
    a: {
        if (!(jur_Lexer_isLetter($this.$lexemes) && !jur_Lexer_isNextSpecial($this.$lexemes) && jur_Lexer_isLetter0($this.$lexemes.$lookAhead))) {
            $term = $this.$lexemes;
            if ($term.$ch != (-536870871)) {
                $cur = jur_Pattern_processQuantifier($this, $last, jur_Pattern_processTerminal($this, $last));
                break a;
            }
            if (!($last instanceof jur_FinalSet)) {
                $cur = jur_EmptySet__init_($last);
                break a;
            }
            $rt_throw(jur_PatternSyntaxException__init_($rt_s(3), $term.$orig, $term.$curToc));
        }
        if (jur_Pattern_hasFlag($this, 128)) {
            $cur = jur_Pattern_processDecomposedChar($this);
            if (!jur_Lexer_isEmpty($this.$lexemes)) {
                $term = $this.$lexemes;
                var$4 = $term.$ch;
                if (!(var$4 == (-536870871) && !($last instanceof jur_FinalSet)) && var$4 != (-536870788) && !jur_Lexer_isLetter($term))
                    $cur = jur_Pattern_processQuantifier($this, $last, $cur);
            }
        } else if (!(!jur_Lexer_isHighSurrogate0($this.$lexemes) && !jur_Lexer_isLowSurrogate0($this.$lexemes)))
            $cur = jur_Pattern_processQuantifier($this, $last, jur_Pattern_processTerminal($this, $last));
        else {
            $term = new jl_StringBuffer;
            jl_AbstractStringBuilder__init_($term);
            while (!jur_Lexer_isEmpty($this.$lexemes) && jur_Lexer_isLetter($this.$lexemes) && !jur_Lexer_isHighSurrogate0($this.$lexemes) && !jur_Lexer_isLowSurrogate0($this.$lexemes)) {
                if (!(!jur_Lexer_isNextSpecial($this.$lexemes) && !$this.$lexemes.$lookAhead) && !(!jur_Lexer_isNextSpecial($this.$lexemes) && jur_Lexer_isLetter0($this.$lexemes.$lookAhead))) {
                    var$5 = $this.$lexemes.$lookAhead;
                    if (var$5 != (-536870871) && (var$5 & (-2147418113)) != (-2147483608) && var$5 != (-536870788) && var$5 != (-536870876))
                        break;
                }
                var$4 = jur_Lexer_next($this.$lexemes);
                if (!jl_Character_isSupplementaryCodePoint(var$4))
                    jl_AbstractStringBuilder_append($term, var$4 & 65535);
                else
                    jl_AbstractStringBuilder_append0($term, jl_Character_toChars(var$4));
            }
            if (!jur_Pattern_hasFlag($this, 2)) {
                $cur = new jur_SequenceSet;
                jur_LeafSet__init_($cur);
                $cur.$string = jl_AbstractStringBuilder_toString($term);
                var$4 = $term.$length0;
                $cur.$charCount0 = var$4;
                $cur.$leftToRight = jur_SequenceSet$IntHash__init_(var$4);
                $cur.$rightToLeft = jur_SequenceSet$IntHash__init_($cur.$charCount0);
                var$6 = 0;
                while (var$6 < ($cur.$charCount0 - 1 | 0)) {
                    jur_SequenceSet$IntHash_put($cur.$leftToRight, jl_String_charAt($cur.$string, var$6), ($cur.$charCount0 - var$6 | 0) - 1 | 0);
                    jur_SequenceSet$IntHash_put($cur.$rightToLeft, jl_String_charAt($cur.$string, ($cur.$charCount0 - var$6 | 0) - 1 | 0), ($cur.$charCount0 - var$6 | 0) - 1 | 0);
                    var$6 = var$6 + 1 | 0;
                }
            } else
                $cur = jur_Pattern_hasFlag($this, 64) ? jur_UCISequenceSet__init_0($term) : jur_CISequenceSet__init_0($term);
        }
    }
    b: {
        c: {
            if (!jur_Lexer_isEmpty($this.$lexemes)) {
                var$4 = $this.$lexemes.$ch;
                if (!(var$4 == (-536870871) && !($last instanceof jur_FinalSet)) && var$4 != (-536870788))
                    break c;
            }
            if ($cur !== null) {
                $cur.$setNext($last);
                break b;
            }
            return null;
        }
        $next = jur_Pattern_processSubExpression($this, $last);
        if ($cur instanceof jur_LeafQuantifierSet && !($cur instanceof jur_CompositeQuantifierSet) && !($cur instanceof jur_GroupQuantifierSet) && !($cur instanceof jur_AltQuantifierSet)) {
            var$8 = $cur;
            $term = var$8;
            if (!$next.$first($term.$innerSet)) {
                $cur = new jur_UnifiedQuantifierSet;
                $term = $term.$innerSet;
                var$8 = var$8;
                jur_LeafQuantifierSet__init_($cur, $term, var$8.$next2, var$8.$type0);
                $cur.$innerSet.$setNext($cur);
            }
        }
        if (($next.$getType0() & 65535) != 43)
            $cur.$setNext($next);
        else
            $cur.$setNext($next.$innerSet);
    }
    if (($cur.$getType0() & 65535) == 43)
        return $cur.$innerSet;
    return $cur;
},
jur_Pattern_processQuantifier = ($this, $last, $term) => {
    let $q, $quant, $q_0, var$6, $leaf;
    $q = $this.$lexemes;
    $quant = $q.$ch;
    if ($term !== null && !($term instanceof jur_LeafSet)) {
        switch ($quant) {
            case -2147483606:
                jur_Lexer_next($q);
                $q = new jur_PossessiveGroupQuantifierSet;
                jur_QuantifierSet__init_($q, $term, $last, $quant);
                jur_FSet_$callClinit();
                $term.$setNext(jur_FSet_posFSet);
                return $q;
            case -2147483605:
                jur_Lexer_next($q);
                $q = new jur_PosPlusGroupQuantifierSet;
                jur_QuantifierSet__init_($q, $term, $last, (-2147483606));
                jur_FSet_$callClinit();
                $term.$setNext(jur_FSet_posFSet);
                return $q;
            case -2147483585:
                jur_Lexer_next($q);
                $q = new jur_PosAltGroupQuantifierSet;
                jur_QuantifierSet__init_($q, $term, $last, (-536870849));
                jur_FSet_$callClinit();
                $term.$setNext(jur_FSet_posFSet);
                return $q;
            case -2147483525:
                $q_0 = new jur_PosCompositeGroupQuantifierSet;
                $q = jur_Lexer_nextSpecial($q);
                var$6 = $this.$compCount + 1 | 0;
                $this.$compCount = var$6;
                jur_CompositeGroupQuantifierSet__init_($q_0, $q, $term, $last, (-536870849), var$6);
                jur_FSet_$callClinit();
                $term.$setNext(jur_FSet_posFSet);
                return $q_0;
            case -1073741782:
            case -1073741781:
                jur_Lexer_next($q);
                $q = new jur_ReluctantGroupQuantifierSet;
                jur_QuantifierSet__init_($q, $term, $last, $quant);
                $term.$setNext($q);
                return $q;
            case -1073741761:
                jur_Lexer_next($q);
                $q = new jur_RelAltGroupQuantifierSet;
                jur_QuantifierSet__init_($q, $term, $last, (-536870849));
                $term.$setNext($last);
                return $q;
            case -1073741701:
                $q_0 = new jur_RelCompositeGroupQuantifierSet;
                $q = jur_Lexer_nextSpecial($q);
                $quant = $this.$compCount + 1 | 0;
                $this.$compCount = $quant;
                jur_CompositeGroupQuantifierSet__init_($q_0, $q, $term, $last, (-536870849), $quant);
                $term.$setNext($q_0);
                return $q_0;
            case -536870870:
            case -536870869:
                jur_Lexer_next($q);
                if ($term.$getType0() != (-2147483602)) {
                    $q = new jur_GroupQuantifierSet;
                    jur_QuantifierSet__init_($q, $term, $last, $quant);
                } else if (jur_Pattern_hasFlag($this, 32)) {
                    $q = new jur_DotAllQuantifierSet;
                    jur_QuantifierSet__init_($q, $term, $last, $quant);
                } else {
                    $q = new jur_DotQuantifierSet;
                    $q_0 = jur_AbstractLineTerminator_getInstance($this.$flags);
                    jur_QuantifierSet__init_($q, $term, $last, $quant);
                    $q.$lt = $q_0;
                }
                $term.$setNext($q);
                return $q;
            case -536870849:
                jur_Lexer_next($q);
                $q = new jur_AltGroupQuantifierSet;
                jur_QuantifierSet__init_($q, $term, $last, (-536870849));
                $term.$setNext($last);
                return $q;
            case -536870789:
                $q_0 = new jur_CompositeGroupQuantifierSet;
                $q = jur_Lexer_nextSpecial($q);
                $quant = $this.$compCount + 1 | 0;
                $this.$compCount = $quant;
                jur_CompositeGroupQuantifierSet__init_($q_0, $q, $term, $last, (-536870849), $quant);
                $term.$setNext($q_0);
                return $q_0;
            default:
        }
        return $term;
    }
    $leaf = null;
    if ($term !== null)
        $leaf = $term;
    switch ($quant) {
        case -2147483606:
        case -2147483605:
            jur_Lexer_next($q);
            $q = new jur_PossessiveQuantifierSet;
            jur_LeafQuantifierSet__init_($q, $leaf, $last, $quant);
            $leaf.$next2 = $q;
            return $q;
        case -2147483585:
            jur_Lexer_next($q);
            $term = new jur_PossessiveAltQuantifierSet;
            jur_LeafQuantifierSet__init_($term, $leaf, $last, (-2147483585));
            return $term;
        case -2147483525:
            $term = new jur_PossessiveCompositeQuantifierSet;
            jur_CompositeQuantifierSet__init_($term, jur_Lexer_nextSpecial($q), $leaf, $last, (-2147483525));
            return $term;
        case -1073741782:
        case -1073741781:
            jur_Lexer_next($q);
            $q = new jur_ReluctantQuantifierSet;
            jur_LeafQuantifierSet__init_($q, $leaf, $last, $quant);
            $leaf.$next2 = $q;
            return $q;
        case -1073741761:
            jur_Lexer_next($q);
            $term = new jur_ReluctantAltQuantifierSet;
            jur_LeafQuantifierSet__init_($term, $leaf, $last, (-1073741761));
            return $term;
        case -1073741701:
            $term = new jur_ReluctantCompositeQuantifierSet;
            jur_CompositeQuantifierSet__init_($term, jur_Lexer_nextSpecial($q), $leaf, $last, (-1073741701));
            return $term;
        case -536870870:
        case -536870869:
            jur_Lexer_next($q);
            $q = jur_LeafQuantifierSet__init_0($leaf, $last, $quant);
            $leaf.$next2 = $q;
            return $q;
        case -536870849:
            jur_Lexer_next($q);
            $term = new jur_AltQuantifierSet;
            jur_LeafQuantifierSet__init_($term, $leaf, $last, (-536870849));
            return $term;
        case -536870789:
            return jur_CompositeQuantifierSet__init_0(jur_Lexer_nextSpecial($q), $leaf, $last, (-536870789));
        default:
    }
    return $term;
},
jur_Pattern_processTerminal = ($this, $last) => {
    let $term, var$3, var$4, $ch, $newFlags, $number, $cc, $negative;
    $term = null;
    var$3 = $last instanceof jur_FinalSet;
    while (true) {
        a: {
            var$4 = $this.$lexemes;
            $ch = var$4.$ch;
            if (($ch & (-2147418113)) == (-2147483608)) {
                jur_Lexer_next(var$4);
                $newFlags = ($ch & 16711680) >> 16;
                $ch = $ch & (-16711681);
                if ($ch == (-16777176))
                    $this.$flags = $newFlags;
                else {
                    if ($ch != (-1073741784))
                        $newFlags = $this.$flags;
                    $term = jur_Pattern_processExpression($this, $ch, $newFlags, $last);
                    var$4 = $this.$lexemes;
                    if (var$4.$ch != (-536870871))
                        $rt_throw(jur_PatternSyntaxException__init_($rt_s(3), var$4.$orig, var$4.$curToc));
                    jur_Lexer_next(var$4);
                }
            } else {
                b: {
                    c: {
                        d: {
                            e: {
                                f: {
                                    g: {
                                        h: {
                                            i: {
                                                j: {
                                                    k: {
                                                        l: {
                                                            m: {
                                                                switch ($ch) {
                                                                    case -2147483599:
                                                                    case -2147483598:
                                                                    case -2147483597:
                                                                    case -2147483596:
                                                                    case -2147483595:
                                                                    case -2147483594:
                                                                    case -2147483593:
                                                                    case -2147483592:
                                                                    case -2147483591:
                                                                        break c;
                                                                    case -2147483583:
                                                                        break;
                                                                    case -2147483582:
                                                                        break m;
                                                                    case -2147483577:
                                                                        break l;
                                                                    case -2147483558:
                                                                        break i;
                                                                    case -2147483550:
                                                                        break k;
                                                                    case -2147483526:
                                                                        break j;
                                                                    case -536870876:
                                                                        break e;
                                                                    case -536870866:
                                                                        break h;
                                                                    case -536870821:
                                                                        break d;
                                                                    case -536870818:
                                                                        break g;
                                                                    case 0:
                                                                        break f;
                                                                    default:
                                                                        break b;
                                                                }
                                                                jur_Lexer_next(var$4);
                                                                $term = new jur_SOLSet;
                                                                jur_AbstractSet__init_($term);
                                                                break a;
                                                            }
                                                            jur_Lexer_next(var$4);
                                                            $term = jur_WordBoundary__init_(0);
                                                            break a;
                                                        }
                                                        jur_Lexer_next(var$4);
                                                        $term = new jur_PreviousMatch;
                                                        jur_AbstractSet__init_($term);
                                                        break a;
                                                    }
                                                    jur_Lexer_next(var$4);
                                                    $term = jur_WordBoundary__init_(1);
                                                    break a;
                                                }
                                                jur_Lexer_next(var$4);
                                                $term = new jur_EOISet;
                                                jur_AbstractSet__init_($term);
                                                break a;
                                            }
                                            jur_Lexer_next(var$4);
                                            $term = new jur_EOLSet;
                                            $number = $this.$consCount + 1 | 0;
                                            $this.$consCount = $number;
                                            jur_EOLSet__init_($term, $number);
                                            break a;
                                        }
                                        jur_Lexer_next(var$4);
                                        if (jur_Pattern_hasFlag($this, 32)) {
                                            $term = jur_DotAllSet__init_0();
                                            break a;
                                        }
                                        $term = jur_DotSet__init_0(jur_AbstractLineTerminator_getInstance($this.$flags));
                                        break a;
                                    }
                                    jur_Lexer_next(var$4);
                                    $this.$consCount = $this.$consCount + 1 | 0;
                                    if (!jur_Pattern_hasFlag($this, 8)) {
                                        $term = new jur_SOLSet;
                                        jur_AbstractSet__init_($term);
                                        break a;
                                    }
                                    $term = new jur_MultiLineSOLSet;
                                    var$4 = jur_AbstractLineTerminator_getInstance($this.$flags);
                                    jur_AbstractSet__init_($term);
                                    $term.$lt1 = var$4;
                                    break a;
                                }
                                $cc = var$4.$curST;
                                if ($cc !== null)
                                    $term = jur_Pattern_processRangeSet($this, $cc);
                                else {
                                    if (jur_Lexer_isEmpty(var$4)) {
                                        $term = jur_EmptySet__init_($last);
                                        break a;
                                    }
                                    $term = jur_CharSet__init_($ch & 65535);
                                }
                                jur_Lexer_next($this.$lexemes);
                                break a;
                            }
                            jur_Lexer_next(var$4);
                            $this.$consCount = $this.$consCount + 1 | 0;
                            if (jur_Pattern_hasFlag($this, 8)) {
                                if (jur_Pattern_hasFlag($this, 1)) {
                                    $term = jur_UMultiLineEOLSet__init_0($this.$consCount);
                                    break a;
                                }
                                $term = jur_MultiLineEOLSet__init_($this.$consCount);
                                break a;
                            }
                            if (jur_Pattern_hasFlag($this, 1)) {
                                $term = jur_UEOLSet__init_($this.$consCount);
                                break a;
                            }
                            $term = jur_EOLSet__init_0($this.$consCount);
                            break a;
                        }
                        jur_Lexer_next(var$4);
                        $negative = 0;
                        $term = $this.$lexemes;
                        if ($term.$ch == (-536870818)) {
                            $negative = 1;
                            jur_Lexer_next($term);
                        }
                        $term = jur_Pattern_processRangeSet($this, jur_Pattern_processRangeExpression($this, $negative));
                        $term.$setNext($last);
                        var$4 = $this.$lexemes;
                        if (var$4.$ch != (-536870819))
                            $rt_throw(jur_PatternSyntaxException__init_($rt_s(3), var$4.$orig, var$4.$curToc));
                        jur_Lexer_setMode(var$4, 1);
                        jur_Lexer_next($this.$lexemes);
                        break a;
                    }
                    $number = ($ch & 2147483647) - 48 | 0;
                    if ($this.$globalGroupIndex < $number)
                        $rt_throw(jur_PatternSyntaxException__init_($rt_s(3), jur_Lexer_toString(var$4), jur_Lexer_getIndex($this.$lexemes)));
                    jur_Lexer_next(var$4);
                    $this.$consCount = $this.$consCount + 1 | 0;
                    $term = !jur_Pattern_hasFlag($this, 2) ? jur_BackReferenceSet__init_($number, $this.$consCount) : jur_Pattern_hasFlag($this, 64) ? jur_UCIBackReferenceSet__init_0($number, $this.$consCount) : jur_CIBackReferenceSet__init_0($number, $this.$consCount);
                    $this.$backRefs.data[$number].$isBackReferenced = 1;
                    $this.$needsBackRefReplacement = 1;
                    break a;
                }
                if ($ch >= 0 && !jur_Lexer_isSpecial(var$4)) {
                    $term = jur_Pattern_processCharSet($this, $ch);
                    jur_Lexer_next($this.$lexemes);
                } else if ($ch == (-536870788))
                    $term = jur_EmptySet__init_($last);
                else {
                    if ($ch != (-536870871)) {
                        $last = new jur_PatternSyntaxException;
                        $term = !jur_Lexer_isSpecial($this.$lexemes) ? jl_Character_toString($ch & 65535) : $this.$lexemes.$curST.$toString();
                        var$4 = $this.$lexemes;
                        jur_PatternSyntaxException__init_0($last, $term, var$4.$orig, var$4.$curToc);
                        $rt_throw($last);
                    }
                    if (var$3) {
                        $last = new jur_PatternSyntaxException;
                        var$4 = $this.$lexemes;
                        jur_PatternSyntaxException__init_0($last, $rt_s(3), var$4.$orig, var$4.$curToc);
                        $rt_throw($last);
                    }
                    $term = jur_EmptySet__init_($last);
                }
            }
        }
        if ($ch != (-16777176))
            break;
    }
    return $term;
},
jur_Pattern_processRangeExpression = ($this, $alt) => {
    let $res, $buffer, $intersection, $notClosed, $firstInClass, $cs, $negative, $cur, $$je;
    $res = jur_CharClass__init_0(jur_Pattern_hasFlag($this, 2), jur_Pattern_hasFlag($this, 64));
    jur_AbstractCharClass_setNegative($res, $alt);
    $buffer = (-1);
    $intersection = 0;
    $notClosed = 0;
    $firstInClass = 1;
    a: {
        b: {
            c: {
                d: while (true) {
                    if (jur_Lexer_isEmpty($this.$lexemes))
                        break a;
                    $cs = $this.$lexemes;
                    $alt = $cs.$ch;
                    $notClosed = !($alt == (-536870819) && !$firstInClass) ? 1 : 0;
                    if (!$notClosed)
                        break b;
                    e: {
                        f: {
                            g: {
                                h: {
                                    i: {
                                        j: {
                                            k: {
                                                switch ($alt) {
                                                    case -536870874:
                                                        break h;
                                                    case -536870867:
                                                        break f;
                                                    case -536870821:
                                                        break g;
                                                    case -536870819:
                                                        break k;
                                                    case -536870818:
                                                        break j;
                                                    case 0:
                                                        break i;
                                                    default:
                                                }
                                                if ($buffer >= 0)
                                                    jur_CharClass_add0($res, $buffer);
                                                $buffer = jur_Lexer_next($this.$lexemes);
                                                break e;
                                            }
                                            if ($buffer >= 0)
                                                jur_CharClass_add0($res, $buffer);
                                            $buffer = 93;
                                            jur_Lexer_next($this.$lexemes);
                                            break e;
                                        }
                                        if ($buffer >= 0)
                                            jur_CharClass_add0($res, $buffer);
                                        $buffer = 94;
                                        jur_Lexer_next($this.$lexemes);
                                        break e;
                                    }
                                    if ($buffer >= 0)
                                        jur_CharClass_add0($res, $buffer);
                                    $cs = $this.$lexemes.$curST;
                                    if ($cs === null)
                                        $buffer = 0;
                                    else {
                                        jur_CharClass_add1($res, $cs);
                                        $buffer = (-1);
                                    }
                                    jur_Lexer_next($this.$lexemes);
                                    break e;
                                }
                                if ($buffer >= 0)
                                    jur_CharClass_add0($res, $buffer);
                                $buffer = jur_Lexer_next($this.$lexemes);
                                $cs = $this.$lexemes;
                                if ($cs.$ch != (-536870874)) {
                                    $buffer = 38;
                                    break e;
                                }
                                if ($cs.$lookAhead == (-536870821)) {
                                    jur_Lexer_next($cs);
                                    $intersection = 1;
                                    $buffer = (-1);
                                    break e;
                                }
                                jur_Lexer_next($cs);
                                if ($firstInClass) {
                                    $res = jur_Pattern_processRangeExpression($this, 0);
                                    break e;
                                }
                                if ($this.$lexemes.$ch == (-536870819))
                                    break e;
                                jur_CharClass_intersection($res, jur_Pattern_processRangeExpression($this, 0));
                                break e;
                            }
                            if ($buffer >= 0) {
                                jur_CharClass_add0($res, $buffer);
                                $buffer = (-1);
                            }
                            jur_Lexer_next($this.$lexemes);
                            $negative = 0;
                            $cs = $this.$lexemes;
                            if ($cs.$ch == (-536870818)) {
                                jur_Lexer_next($cs);
                                $negative = 1;
                            }
                            if (!$intersection)
                                jur_CharClass_union($res, jur_Pattern_processRangeExpression($this, $negative));
                            else
                                jur_CharClass_intersection($res, jur_Pattern_processRangeExpression($this, $negative));
                            $intersection = 0;
                            jur_Lexer_next($this.$lexemes);
                            break e;
                        }
                        l: {
                            if (!$firstInClass) {
                                $alt = $cs.$lookAhead;
                                if ($alt != (-536870819) && $alt != (-536870821) && $buffer >= 0)
                                    break l;
                            }
                            if ($buffer >= 0)
                                jur_CharClass_add0($res, $buffer);
                            $buffer = 45;
                            jur_Lexer_next($this.$lexemes);
                            break e;
                        }
                        jur_Lexer_next($cs);
                        $cs = $this.$lexemes;
                        $cur = $cs.$ch;
                        if (jur_Lexer_isSpecial($cs))
                            break d;
                        if ($cur < 0) {
                            $negative = $this.$lexemes.$lookAhead;
                            if ($negative != (-536870819) && $negative != (-536870821) && $buffer >= 0)
                                break d;
                        }
                        m: {
                            try {
                                if (jur_Lexer_isLetter0($cur))
                                    break m;
                                $cur = $cur & 65535;
                                break m;
                            } catch ($$e) {
                                $$je = $rt_wrapException($$e);
                                if ($$je instanceof jl_Exception) {
                                    break c;
                                } else {
                                    throw $$e;
                                }
                            }
                        }
                        try {
                            jur_CharClass_add($res, $buffer, $cur);
                        } catch ($$e) {
                            $$je = $rt_wrapException($$e);
                            if ($$je instanceof jl_Exception) {
                                break c;
                            } else {
                                throw $$e;
                            }
                        }
                        jur_Lexer_next($this.$lexemes);
                        $buffer = (-1);
                    }
                    $firstInClass = 0;
                }
                $rt_throw(jur_PatternSyntaxException__init_($rt_s(3), jur_Pattern_pattern($this), $this.$lexemes.$curToc));
            }
            $rt_throw(jur_PatternSyntaxException__init_($rt_s(3), jur_Pattern_pattern($this), $this.$lexemes.$curToc));
        }
    }
    if ($notClosed)
        $rt_throw(jur_PatternSyntaxException__init_($rt_s(3), jur_Pattern_pattern($this), $this.$lexemes.$curToc - 1 | 0));
    if ($buffer >= 0)
        jur_CharClass_add0($res, $buffer);
    return $res;
},
jur_Pattern_processCharSet = ($this, $ch) => {
    let $isSupplCodePoint, var$3, var$4;
    $isSupplCodePoint = jl_Character_isSupplementaryCodePoint($ch);
    if (jur_Pattern_hasFlag($this, 2)) {
        a: {
            if (!($ch >= 97 && $ch <= 122)) {
                if ($ch < 65)
                    break a;
                if ($ch > 90)
                    break a;
            }
            return jur_CICharSet__init_($ch & 65535);
        }
        if (jur_Pattern_hasFlag($this, 64) && $ch > 128) {
            if (!$isSupplCodePoint) {
                if (!jur_Lexer_isLowSurrogate($ch)) {
                    if (jur_Lexer_isHighSurrogate($ch))
                        return jur_HighSurrogateCharSet__init_($ch & 65535);
                    return jur_UCICharSet__init_($ch & 65535);
                }
                return jur_LowSurrogateCharSet__init_($ch & 65535);
            }
            var$3 = new jur_UCISupplCharSet;
            jur_LeafSet__init_(var$3);
            var$3.$charCount0 = 2;
            var$3.$ch4 = jl_Character_toLowerCase0(jl_Character_toUpperCase0($ch));
            return var$3;
        }
    }
    if ($isSupplCodePoint) {
        var$3 = new jur_SupplCharSet;
        jur_LeafSet__init_(var$3);
        var$3.$charCount0 = 2;
        var$3.$ch1 = $ch;
        var$4 = (jl_Character_toChars($ch)).data;
        var$3.$high0 = var$4[0];
        var$3.$low0 = var$4[1];
        return var$3;
    }
    if (!jur_Lexer_isLowSurrogate($ch)) {
        if (jur_Lexer_isHighSurrogate($ch))
            return jur_HighSurrogateCharSet__init_($ch & 65535);
        return jur_CharSet__init_($ch & 65535);
    }
    return jur_LowSurrogateCharSet__init_($ch & 65535);
},
jur_Pattern_processRangeSet = ($this, $charClass) => {
    let $surrogates, $lowHighSurrRangeSet, var$4;
    if (jur_AbstractCharClass_hasLowHighSurrogates($charClass)) {
        $surrogates = jur_AbstractCharClass_getSurrogates($charClass);
        $lowHighSurrRangeSet = new jur_LowHighSurrogateRangeSet;
        jur_AbstractSet__init_($lowHighSurrRangeSet);
        $lowHighSurrRangeSet.$surrChars = $surrogates;
        $lowHighSurrRangeSet.$alt1 = $surrogates.$alt;
        if ($charClass.$mayContainSupplCodepoints) {
            if ($charClass.$hasUCI()) {
                $surrogates = new jur_CompositeRangeSet;
                var$4 = new jur_UCISupplRangeSet;
                jur_SupplRangeSet__init_(var$4, jur_AbstractCharClass_getWithoutSurrogates($charClass));
                jur_CompositeRangeSet__init_0($surrogates, var$4, $lowHighSurrRangeSet);
                return $surrogates;
            }
            return jur_CompositeRangeSet__init_(jur_SupplRangeSet__init_0(jur_AbstractCharClass_getWithoutSurrogates($charClass)), $lowHighSurrRangeSet);
        }
        if (!$charClass.$hasUCI())
            return jur_CompositeRangeSet__init_(jur_RangeSet__init_(jur_AbstractCharClass_getWithoutSurrogates($charClass)), $lowHighSurrRangeSet);
        return jur_CompositeRangeSet__init_(jur_UCIRangeSet__init_(jur_AbstractCharClass_getWithoutSurrogates($charClass)), $lowHighSurrRangeSet);
    }
    if ($charClass.$mayContainSupplCodepoints) {
        if ($charClass.$hasUCI()) {
            $surrogates = new jur_UCISupplRangeSet;
            jur_SupplRangeSet__init_($surrogates, $charClass);
            return $surrogates;
        }
        return jur_SupplRangeSet__init_0($charClass);
    }
    if (!$charClass.$hasUCI())
        return jur_RangeSet__init_($charClass);
    return jur_UCIRangeSet__init_($charClass);
},
jur_Pattern_getSupplement = $ch => {
    if ($ch >= 97 && $ch <= 122)
        $ch = ($ch - 32 | 0) & 65535;
    else if ($ch >= 65 && $ch <= 90)
        $ch = ($ch + 32 | 0) & 65535;
    return $ch;
},
jur_Pattern_hasFlag = ($this, $flag) => {
    return ($this.$flags & $flag) != $flag ? 0 : 1;
};
function ju_AbstractList() {
    ju_AbstractCollection.call(this);
    this.$modCount = 0;
}
let ju_AbstractList_iterator = $this => {
    let var$1;
    var$1 = new ju_AbstractList$1;
    var$1.$this$00 = $this;
    var$1.$modCount1 = $this.$modCount;
    var$1.$size2 = $this.$size();
    var$1.$removeIndex = (-1);
    return var$1;
},
ju_AbstractList_remove = ($this, $index) => {
    let var$2;
    var$2 = new jl_UnsupportedOperationException;
    jl_Throwable__init_0(var$2);
    $rt_throw(var$2);
},
ju_AbstractList_hashCode = $this => {
    let $hashCode, $iter, $elem;
    $hashCode = 1;
    $iter = $this.$iterator();
    while ($iter.$hasNext()) {
        $elem = $iter.$next();
        $hashCode = (31 * $hashCode | 0) + ju_Objects_hashCode($elem) | 0;
    }
    return $hashCode;
},
ju_AbstractList_equals = ($this, $other) => {
    let $list, $i;
    if ($rt_isInstance($other, ju_List)) {
        $list = $other;
        if ($this.$size() == $list.$size()) {
            $i = 0;
            while ($i < $list.$size()) {
                if (!ju_Objects_equals($this.$get($i), $list.$get($i)))
                    return 0;
                $i = $i + 1 | 0;
            }
            return 1;
        }
        return 0;
    }
    return 0;
},
ju_RandomAccess = $rt_classWithoutFields(0);
function ju_Arrays$ArrayAsList() {
    ju_AbstractList.call(this);
    this.$array1 = null;
}
let ju_Arrays$ArrayAsList_get = ($this, $index) => {
    return $this.$array1.data[$index];
},
ju_Arrays$ArrayAsList_size = $this => {
    return $this.$array1.data.length;
},
cgmep_PaymentService = $rt_classWithoutFields(),
cgmep_PaymentService_getPaymentCandidates = ($this, $payer) => {
    let $candidates, var$3, var$4, var$5, var$6, var$7;
    $candidates = ju_ArrayList__init_();
    var$3 = cgmmc_AbstractCardCollection_getCards($payer.$bank);
    var$4 = $candidates;
    ju_AbstractCollection_addAll(var$4, var$3);
    var$3 = $payer.$properties;
    $payer = ju_ArrayList__init_();
    var$5 = ju_EnumMap$2_iterator(ju_EnumMap_values(var$3.$sets));
    while (ju_EnumMap$2$1_hasNext(var$5)) {
        var$6 = ju_AbstractList_iterator(cgmmc_PropertySet_getAllCards(ju_EnumMap$2$1_next(var$5)));
        while (ju_AbstractList$1_hasNext(var$6)) {
            var$7 = ju_AbstractList$1_next(var$6);
            if (!(!(var$7 instanceof cgmmc_PropertyCard) && !(var$7 instanceof cgmmc_WildcardCard)) && var$7.$canPayFromTable())
                ju_ArrayList_add($payer, var$7);
        }
    }
    ju_AbstractCollection_addAll(var$4, ju_List_copyOf($payer));
    return ju_List_copyOf($candidates);
},
cgmep_PaymentService_validateSelection = ($this, $selectedCards, $availableCards, $amountNeeded, $totalAvailableValue) => {
    let $selection, $uniqueSelection, $card, $selectedValue;
    $selection = $selectedCards !== null ? ju_List_copyOf($selectedCards) : ju_List_of();
    $uniqueSelection = new ju_LinkedHashSet;
    $selectedCards = new ju_LinkedHashMap;
    ju_HashMap__init_0($selectedCards, $selection.$size() < 6 ? 11 : $selection.$size() * 2 | 0);
    $selectedCards.$accessOrder = 0;
    $selectedCards.$head = null;
    ju_HashSet__init_0($uniqueSelection, $selectedCards);
    $selectedCards = $selection.$iterator();
    while ($selectedCards.$hasNext()) {
        $card = $selectedCards.$next();
        ju_HashSet_add($uniqueSelection, $card);
    }
    if (ju_HashSet_size($uniqueSelection) == $selection.$size()) {
        $selectedCards = $availableCards;
        $availableCards = $selection.$iterator();
        a: {
            b: {
                while ($availableCards.$hasNext()) {
                    if (ju_AbstractCollection_contains($selectedCards, $availableCards.$next()))
                        continue;
                    else
                        break b;
                }
                $selectedValue = 1;
                break a;
            }
            $selectedValue = 0;
        }
        if ($selectedValue) {
            $selectedCards = $selection.$iterator();
            while (true) {
                if (!$selectedCards.$hasNext()) {
                    $selectedCards = ju_Collection_stream($selection);
                    $availableCards = new cgmep_PaymentService$validateSelection$lambda$_3_0;
                    $selectedValue = jusi_SimpleIntStreamImpl_sum(jusi_SimpleStreamImpl_mapToInt($selectedCards, $availableCards));
                    if ($selection.$isEmpty() && $totalAvailableValue > 0) {
                        $selectedCards = new cgme_InvalidMoveException;
                        jl_Throwable__init_($selectedCards, $rt_s(140));
                        $rt_throw($selectedCards);
                    }
                    if ($selectedValue < $amountNeeded) {
                        if ($selectedValue != $totalAvailableValue) {
                            $selectedCards = new cgme_InvalidMoveException;
                            jl_Throwable__init_($selectedCards, $rt_s(141));
                            $rt_throw($selectedCards);
                        }
                        return ju_List_copyOf($selection);
                    }
                    return ju_List_copyOf($selection);
                }
                $card = $selectedCards.$next();
                if ($card instanceof cgmmc_WildcardCard && $card.$multiColourUniversal)
                    break;
            }
            $selectedCards = new cgme_InvalidMoveException;
            jl_Throwable__init_($selectedCards, $rt_s(142));
            $rt_throw($selectedCards);
        }
        $selectedCards = new cgme_InvalidMoveException;
        jl_Throwable__init_($selectedCards, $rt_s(143));
        $rt_throw($selectedCards);
    }
    $selectedCards = new cgme_InvalidMoveException;
    jl_Throwable__init_($selectedCards, $rt_s(144));
    $rt_throw($selectedCards);
},
cgme_WinCondition = $rt_classWithoutFields(0),
cgme_StandardWinCondition = $rt_classWithoutFields();
function cgmea_ActionCardExecutor() {
    jl_Object.call(this);
    this.$effects = null;
}
let cgmea_ActionCardExecutor_execute = ($this, $c) => {
    let $e, var$3;
    $e = $this.$effects;
    var$3 = $c.$card.$actionType;
    $e = ju_EnumMap_get($e, var$3);
    if ($e === null) {
        $e = new cgme_InvalidMoveException;
        $c = jl_String_valueOf($c.$card.$actionType);
        var$3 = new jl_StringBuilder;
        jl_AbstractStringBuilder__init_(var$3);
        jl_StringBuilder_append(jl_StringBuilder_append(var$3, $rt_s(145)), $c);
        jl_Throwable__init_($e, jl_AbstractStringBuilder_toString(var$3));
        $rt_throw($e);
    }
    return $e.$execute0($c);
},
cgme_RentCalculator = $rt_classWithoutFields(0),
cgme_StandardRentCalculator = $rt_classWithoutFields();
function cgme_EventBus() {
    jl_Object.call(this);
    this.$listeners = null;
}
let ju_TemplateCollections$AbstractImmutableList = $rt_classWithoutFields(ju_AbstractList),
ju_TemplateCollections$AbstractImmutableList_remove = ($this, $index) => {
    let var$2;
    var$2 = new jl_UnsupportedOperationException;
    jl_Throwable__init_0(var$2);
    $rt_throw(var$2);
};
function ju_TemplateCollections$SingleElementList() {
    ju_TemplateCollections$AbstractImmutableList.call(this);
    this.$value7 = null;
}
let ju_TemplateCollections$SingleElementList_size = $this => {
    return 1;
},
ju_TemplateCollections$SingleElementList_get = ($this, $index) => {
    let var$2;
    if ($index) {
        var$2 = new jl_IndexOutOfBoundsException;
        jl_Throwable__init_0(var$2);
        $rt_throw(var$2);
    }
    return $this.$value7;
};
function cgmmg_Player() {
    let a = this; jl_Object.call(a);
    a.$id1 = null;
    a.$name = null;
    a.$type = null;
    a.$hand = null;
    a.$bank = null;
    a.$properties = null;
}
let cgmmg_Player__init_0 = ($this, $name, $type) => {
    let var$3;
    $this.$id1 = ju_UUID_randomUUID();
    var$3 = new cgmmc_Hand;
    cgmmc_AbstractCardCollection__init_(var$3);
    $this.$hand = var$3;
    var$3 = new cgmmc_Bank;
    cgmmc_AbstractCardCollection__init_(var$3);
    $this.$bank = var$3;
    var$3 = new cgmmc_PropertyCollection;
    var$3.$sets = ju_EnumMap__init_($rt_cls(cgmmc_PropertyColor));
    $this.$properties = var$3;
    $this.$name = ju_Objects_requireNonNull($name);
    $this.$type = ju_Objects_requireNonNull($type);
},
cgmmg_Player__init_ = (var_0, var_1) => {
    let var_2 = new cgmmg_Player();
    cgmmg_Player__init_0(var_2, var_0, var_1);
    return var_2;
},
cgmmg_Player_getName = $this => {
    return $this.$name;
},
cgmmg_Player_getHand = $this => {
    return $this.$hand;
},
cgmmg_Player_equals = ($this, $o) => {
    let $p, var$3;
    a: {
        b: {
            if ($o instanceof cgmmg_Player) {
                $p = $o;
                if (ju_UUID_equals($this.$id1, $p.$id1))
                    break b;
            }
            var$3 = 0;
            break a;
        }
        var$3 = 1;
    }
    return var$3;
},
cgmmg_Player_hashCode = $this => {
    return jl_String_hashCode($this.$id1.$value4);
},
cgmmg_Player_toString = $this => {
    return $this.$name;
},
juf_Function = $rt_classWithoutFields(0),
w_DealBrowser$playerData$lambda$_32_0 = $rt_classWithoutFields(),
w_DealBrowser$playerData$lambda$_32_0_apply = (var$0, var$1) => {
    return w_DealBrowser_cardData(var$1);
},
w_DealBrowser$playerData$lambda$_32_1 = $rt_classWithoutFields(),
w_DealBrowser$playerData$lambda$_32_1_apply = (var$0, var$1) => {
    return w_DealBrowser_cardData(var$1);
},
juf_ToIntFunction = $rt_classWithoutFields(0),
w_DealBrowser$playerData$lambda$_32_2 = $rt_classWithoutFields(),
w_DealBrowser$playerData$lambda$_32_2_applyAsInt = (var$0, var$1) => {
    return var$1.$value;
},
w_DealBrowser$playerData$lambda$_32_3 = $rt_classWithoutFields(),
w_DealBrowser$playerData$lambda$_32_3_apply = (var$0, var$1) => {
    let var$2, var$3, var$4;
    var$1 = var$1;
    w_DealBrowser_$callClinit();
    var$2 = $rt_createArray(jl_Object, 8);
    var$3 = var$2.data;
    var$3[0] = $rt_s(146);
    var$3[1] = var$1.$color.$name1;
    var$3[2] = $rt_s(147);
    var$3[3] = jl_Integer_valueOf(cgmmc_PropertySet_propertyCount(var$1));
    var$3[4] = $rt_s(148);
    var$3[5] = jl_Integer_valueOf(var$1.$color.$fullSetSize);
    var$3[6] = $rt_s(149);
    var$1 = ju_Collection_stream(cgmmc_PropertySet_getAllCards(var$1));
    var$4 = new w_DealBrowser$lambda$playerData$39$lambda$_35_0;
    var$3[7] = jus_Stream_toList(jusi_SimpleStreamImpl_map(var$1, var$4));
    return w_Wire_object(var$2);
};
function ju_TemplateCollections$TwoElementsList() {
    let a = this; ju_TemplateCollections$AbstractImmutableList.call(a);
    a.$first0 = null;
    a.$second = null;
}
let ju_TemplateCollections$TwoElementsList_size = $this => {
    return 2;
},
ju_TemplateCollections$TwoElementsList_get = ($this, $index) => {
    let var$2;
    if ($index) {
        if ($index != 1) {
            var$2 = new jl_IndexOutOfBoundsException;
            jl_Throwable__init_0(var$2);
            $rt_throw(var$2);
        }
        return $this.$second;
    }
    return $this.$first0;
};
function cgmmg_GameSnapshot() {
    let a = this; jl_Object.call(a);
    a.$players = null;
    a.$currentPlayer = null;
    a.$winner = null;
    a.$turnState0 = null;
    a.$currentPlayerIndex0 = 0;
    a.$deckSize = 0;
    a.$discardSize = 0;
    a.$discardCards = null;
    a.$cardsPlayedThisTurn1 = 0;
    a.$remainingPlays = 0;
}
let cgmmg_GameSnapshot_from = $game => {
    let var$2, var$3;
    var$2 = new cgmmg_GameSnapshot;
    var$2.$players = cgmmg_Game_getPlayers($game);
    var$2.$currentPlayer = cgmmg_Game_getCurrentPlayer($game);
    var$2.$winner = ju_Optional_orElse(cgmmg_Game_getWinner($game), null);
    var$2.$turnState0 = $game.$turnState;
    var$2.$currentPlayerIndex0 = $game.$currentPlayerIndex;
    var$2.$deckSize = ju_ArrayDeque_size($game.$deck.$drawPile);
    var$2.$discardSize = cgmmc_AbstractCardCollection_size($game.$discardPile);
    var$2.$discardCards = ju_List_copyOf(cgmmc_AbstractCardCollection_getCards($game.$discardPile));
    var$3 = $game.$cardsPlayedThisTurn;
    var$2.$cardsPlayedThisTurn1 = var$3;
    var$2.$remainingPlays = jl_Math_max(0, $game.$rules.$maxCardsPlayedPerTurn - var$3 | 0);
    return var$2;
},
cgmmg_GameSnapshot_getTurnState = $this => {
    return $this.$turnState0;
},
w_DealBrowser$Choice$data$lambda$_1_0 = $rt_classWithoutFields(),
w_DealBrowser$Choice$data$lambda$_1_0_apply = (var$0, var$1) => {
    let var$2, var$3;
    var$1 = var$1;
    var$2 = $rt_createArray(jl_Object, 8);
    var$3 = var$2.data;
    var$3[0] = $rt_s(50);
    var$3[1] = var$1.$id0;
    var$3[2] = $rt_s(43);
    var$3[3] = var$1.$name2;
    var$3[4] = $rt_s(150);
    var$3[5] = var$1.$detail;
    var$3[6] = $rt_s(51);
    var$3[7] = jl_Integer_valueOf(var$1.$value5);
    return w_Wire_object(var$2);
};
function jl_Boolean() {
    jl_Object.call(this);
    this.$value2 = 0;
}
let jl_Boolean_TRUE = null,
jl_Boolean_FALSE = null,
jl_Boolean_TYPE = null,
jl_Boolean_$callClinit = () => {
    jl_Boolean_$callClinit = $rt_eraseClinit(jl_Boolean);
    jl_Boolean__clinit_();
},
jl_Boolean__init_0 = ($this, $value) => {
    jl_Boolean_$callClinit();
    $this.$value2 = $value;
},
jl_Boolean__init_ = var_0 => {
    let var_1 = new jl_Boolean();
    jl_Boolean__init_0(var_1, var_0);
    return var_1;
},
jl_Boolean_valueOf = $value => {
    jl_Boolean_$callClinit();
    return !$value ? jl_Boolean_FALSE : jl_Boolean_TRUE;
},
jl_Boolean_toString = $this => {
    let var$1;
    var$1 = $this.$value2;
    jl_Boolean_$callClinit();
    return !var$1 ? $rt_s(151) : $rt_s(152);
},
jl_Boolean_hashCode = $this => {
    let var$1;
    var$1 = $this.$value2;
    jl_Boolean_$callClinit();
    return !var$1 ? 1237 : 1231;
},
jl_Boolean_equals = ($this, $obj) => {
    if ($this !== $obj)
        return !($obj instanceof jl_Boolean && $obj.$value2 == $this.$value2) ? 0 : 1;
    return 1;
},
jl_Boolean__clinit_ = () => {
    jl_Boolean_TRUE = jl_Boolean__init_(1);
    jl_Boolean_FALSE = jl_Boolean__init_(0);
    jl_Boolean_TYPE = $rt_cls($rt_booleancls);
},
ju_Map = $rt_classWithoutFields(0),
ju_Map_putIfAbsent = ($this, $key, $value) => {
    let var$3, $v;
    var$3 = $this;
    $v = ju_HashMap_get(var$3, $key);
    if ($v === null)
        $v = ju_HashMap_put(var$3, $key, $value);
    return $v;
};
function ju_AbstractMap() {
    let a = this; jl_Object.call(a);
    a.$cachedKeySet = null;
    a.$cachedValues = null;
}
let ju_AbstractMap_put = ($this, $key, $value) => {
    $key = new jl_UnsupportedOperationException;
    jl_Throwable__init_0($key);
    $rt_throw($key);
},
ju_AbstractMap_equals = ($this, $obj) => {
    let $other, var$3, $it, var$5, var$6, $entry, $$je;
    if ($this !== $obj) {
        if ($rt_isInstance($obj, ju_Map)) {
            $other = $obj;
            var$3 = $this.$elementCount;
            $obj = $other;
            if (var$3 == $obj.$elementCount) {
                a: {
                    try {
                        $it = ju_LinkedHashMapEntrySet_iterator(ju_LinkedHashMap_entrySet($this));
                    } catch ($$e) {
                        $$je = $rt_wrapException($$e);
                        if ($$je instanceof jl_ClassCastException) {
                            break a;
                        } else if ($$je instanceof jl_NullPointerException) {
                            break a;
                        } else {
                            throw $$e;
                        }
                    }
                    var$5 = $it;
                    b: {
                        c: {
                            try {
                                while (ju_LinkedHashMapIterator_hasNext(var$5)) {
                                    var$6 = ju_LinkedHashMapIterator$EntryIterator_next($it);
                                    if (!ju_HashMap_containsKey($obj, ju_MapEntry_getKey(var$6)))
                                        break b;
                                    $entry = ju_MapEntry_getValue(var$6);
                                    var$6 = ju_MapEntry_getKey(var$6);
                                    if (!ju_Objects_equals($entry, ju_LinkedHashMap_get($other, var$6)))
                                        break c;
                                }
                            } catch ($$e) {
                                $$je = $rt_wrapException($$e);
                                if ($$je instanceof jl_ClassCastException) {
                                    break a;
                                } else if ($$je instanceof jl_NullPointerException) {
                                    break a;
                                } else {
                                    throw $$e;
                                }
                            }
                            return 1;
                        }
                        try {
                        } catch ($$e) {
                            $$je = $rt_wrapException($$e);
                            if ($$je instanceof jl_ClassCastException) {
                                break a;
                            } else if ($$je instanceof jl_NullPointerException) {
                                break a;
                            } else {
                                throw $$e;
                            }
                        }
                        return 0;
                    }
                    try {
                    } catch ($$e) {
                        $$je = $rt_wrapException($$e);
                        if ($$je instanceof jl_ClassCastException) {
                            break a;
                        } else if ($$je instanceof jl_NullPointerException) {
                            break a;
                        } else {
                            throw $$e;
                        }
                    }
                    return 0;
                }
                return 0;
            }
            return 0;
        }
        return 0;
    }
    return 1;
},
ju_AbstractMap_hashCode = $this => {
    let $result, $iter, var$3, $entry;
    $result = 0;
    $iter = ju_LinkedHashMapEntrySet_iterator(ju_LinkedHashMap_entrySet($this));
    var$3 = $iter;
    while (ju_LinkedHashMapIterator_hasNext(var$3)) {
        $entry = ju_LinkedHashMapIterator$EntryIterator_next($iter);
        $result = $result + (ju_Objects_hashCode($entry.$key) ^ ju_Objects_hashCode($entry.$value0)) | 0;
    }
    return $result;
},
ju_AbstractMap_toString = $this => {
    let $sb, $iter, var$3, var$4, $e;
    $sb = new jl_StringBuilder;
    jl_AbstractStringBuilder__init_($sb);
    jl_AbstractStringBuilder_append($sb, 123);
    $iter = ju_LinkedHashMapEntrySet_iterator(ju_LinkedHashMap_entrySet($this));
    var$3 = $iter;
    if (ju_LinkedHashMapIterator_hasNext(var$3)) {
        var$4 = ju_LinkedHashMapIterator$EntryIterator_next($iter);
        $e = var$4.$key;
        if ($e === $this)
            $e = $rt_s(153);
        jl_StringBuilder_append($sb, $e);
        jl_AbstractStringBuilder_append($sb, 61);
        $e = var$4.$value0;
        if ($e === $this)
            $e = $rt_s(153);
        jl_StringBuilder_append($sb, $e);
    }
    while (ju_LinkedHashMapIterator_hasNext(var$3)) {
        jl_StringBuilder_append1($sb, $rt_s(92));
        $e = ju_LinkedHashMapIterator$EntryIterator_next($iter);
        var$4 = $e.$key;
        if (var$4 === $this)
            var$4 = $rt_s(153);
        jl_StringBuilder_append($sb, var$4);
        jl_AbstractStringBuilder_append($sb, 61);
        $e = $e.$value0;
        if ($e === $this)
            $e = $rt_s(153);
        jl_StringBuilder_append($sb, $e);
    }
    jl_AbstractStringBuilder_append($sb, 125);
    return jl_AbstractStringBuilder_toString($sb);
};
function ju_HashMap() {
    let a = this; ju_AbstractMap.call(a);
    a.$elementCount = 0;
    a.$elementData = null;
    a.$modCount0 = 0;
    a.$loadFactor = 0.0;
    a.$threshold = 0;
}
let ju_HashMap_newElementArray = ($this, $s) => {
    return $rt_createArray(ju_HashMap$HashEntry, $s);
},
ju_HashMap__init_1 = $this => {
    ju_HashMap__init_0($this, 16);
},
ju_HashMap__init_ = () => {
    let var_0 = new ju_HashMap();
    ju_HashMap__init_1(var_0);
    return var_0;
},
ju_HashMap__init_0 = ($this, $capacity) => {
    let var$2;
    if ($capacity >= 0) {
        $capacity = ju_HashMap_calculateCapacity($capacity);
        $this.$elementCount = 0;
        $this.$elementData = $this.$newElementArray($capacity);
        $this.$loadFactor = 0.75;
        ju_HashMap_computeThreshold($this);
        return;
    }
    var$2 = new jl_IllegalArgumentException;
    jl_Throwable__init_0(var$2);
    $rt_throw(var$2);
},
ju_HashMap__init_2 = var_0 => {
    let var_1 = new ju_HashMap();
    ju_HashMap__init_0(var_1, var_0);
    return var_1;
},
ju_HashMap_calculateCapacity = $x => {
    let var$2;
    if ($x < 1073741824) {
        if ($x) {
            var$2 = $x - 1 | 0;
            $x = var$2 | var$2 >> 1;
            $x = $x | $x >> 2;
            $x = $x | $x >> 4;
            $x = $x | $x >> 8;
            return ($x | $x >> 16) + 1 | 0;
        }
        return 16;
    }
    return 1073741824;
},
ju_HashMap_computeThreshold = $this => {
    $this.$threshold = $this.$elementData.data.length * $this.$loadFactor | 0;
},
ju_HashMap_containsKey = ($this, $key) => {
    return ju_HashMap_entryByKey($this, $key) === null ? 0 : 1;
},
ju_HashMap_get = ($this, $key) => {
    let $m;
    $m = ju_HashMap_entryByKey($this, $key);
    if ($m !== null)
        return $m.$value0;
    return null;
},
ju_HashMap_entryByKey = ($this, $key) => {
    let $m, $hash;
    if ($key === null)
        $m = ju_HashMap_findNullKeyEntry($this);
    else {
        $hash = $key.$hashCode();
        $m = ju_HashMap_findNonNullKeyEntry($this, $key, $hash & ($this.$elementData.data.length - 1 | 0), $hash);
    }
    return $m;
},
ju_HashMap_findNonNullKeyEntry = ($this, $key, $index, $keyHash) => {
    let $m, var$5;
    $m = $this.$elementData.data[$index];
    while ($m !== null) {
        if ($m.$origKeyHash == $keyHash) {
            var$5 = $m.$key;
            if (!($key !== var$5 && !$key.$equals(var$5)) ? 1 : 0)
                break;
        }
        $m = $m.$next3;
    }
    return $m;
},
ju_HashMap_findNullKeyEntry = $this => {
    let $m;
    $m = $this.$elementData.data[0];
    while ($m !== null && $m.$key !== null) {
        $m = $m.$next3;
    }
    return $m;
},
ju_HashMap_keySet = $this => {
    let var$1;
    if ($this.$cachedKeySet === null) {
        var$1 = new ju_HashMap$1;
        var$1.$this$08 = $this;
        $this.$cachedKeySet = var$1;
    }
    return $this.$cachedKeySet;
},
ju_HashMap_put = ($this, $key, $value) => {
    let var$3, var$4, var$5;
    if ($key === null) {
        var$3 = ju_HashMap_findNullKeyEntry($this);
        if (var$3 === null) {
            $this.$modCount0 = $this.$modCount0 + 1 | 0;
            var$3 = ju_HashMap_createHashedEntry($this, null, 0, 0);
            var$4 = $this.$elementCount + 1 | 0;
            $this.$elementCount = var$4;
            if (var$4 > $this.$threshold)
                ju_HashMap_rehash($this);
        }
    } else {
        var$4 = $key.$hashCode();
        var$5 = var$4 & ($this.$elementData.data.length - 1 | 0);
        var$3 = ju_HashMap_findNonNullKeyEntry($this, $key, var$5, var$4);
        if (var$3 === null) {
            $this.$modCount0 = $this.$modCount0 + 1 | 0;
            var$3 = ju_HashMap_createHashedEntry($this, $key, var$5, var$4);
            var$4 = $this.$elementCount + 1 | 0;
            $this.$elementCount = var$4;
            if (var$4 > $this.$threshold)
                ju_HashMap_rehash($this);
        }
    }
    $key = var$3.$value0;
    var$3.$value0 = $value;
    return $key;
},
ju_HashMap_createHashedEntry = ($this, $key, $index, $hash) => {
    let $entry, var$5;
    $entry = ju_HashMap$HashEntry__init_0($key, $hash);
    var$5 = $this.$elementData.data;
    $entry.$next3 = var$5[$index];
    var$5[$index] = $entry;
    return $entry;
},
ju_HashMap_rehash0 = ($this, $capacity) => {
    let $length, $newData, $i, var$5, $entry, $index, $next;
    $length = ju_HashMap_calculateCapacity(!$capacity ? 1 : $capacity << 1);
    $newData = $this.$newElementArray($length);
    $i = 0;
    $length = $length - 1 | 0;
    while (true) {
        var$5 = $this.$elementData.data;
        if ($i >= var$5.length)
            break;
        $entry = var$5[$i];
        var$5[$i] = null;
        while ($entry !== null) {
            var$5 = $newData.data;
            $index = $entry.$origKeyHash & $length;
            $next = $entry.$next3;
            $entry.$next3 = var$5[$index];
            var$5[$index] = $entry;
            $entry = $next;
        }
        $i = $i + 1 | 0;
    }
    $this.$elementData = $newData;
    ju_HashMap_computeThreshold($this);
},
ju_HashMap_rehash = $this => {
    ju_HashMap_rehash0($this, $this.$elementData.data.length);
},
ju_HashMap_size = $this => {
    return $this.$elementCount;
},
ju_SequencedMap = $rt_classWithoutFields(0);
function ju_LinkedHashMap() {
    let a = this; ju_HashMap.call(a);
    a.$accessOrder = 0;
    a.$head = null;
    a.$tail0 = null;
}
let ju_LinkedHashMap__init_0 = $this => {
    ju_HashMap__init_1($this);
    $this.$accessOrder = 0;
    $this.$head = null;
},
ju_LinkedHashMap__init_ = () => {
    let var_0 = new ju_LinkedHashMap();
    ju_LinkedHashMap__init_0(var_0);
    return var_0;
},
ju_LinkedHashMap_newElementArray = ($this, $s) => {
    return $rt_createArray(ju_LinkedHashMap$LinkedHashMapEntry, $s);
},
ju_LinkedHashMap_get = ($this, $key) => {
    let var$2, var$3;
    var$2 = null;
    if ($key === null)
        $key = ju_HashMap_findNullKeyEntry($this);
    else {
        var$3 = $key.$hashCode();
        $key = ju_HashMap_findNonNullKeyEntry($this, $key, (var$3 & 2147483647) % $this.$elementData.data.length | 0, var$3);
    }
    if ($key !== null) {
        if ($this.$accessOrder)
            ju_LinkedHashMap_linkEntry($this, $key, 0);
        var$2 = $key.$value0;
    }
    return var$2;
},
ju_LinkedHashMap_put = ($this, $key, $value) => {
    let var$3, $oldSize, var$5, var$6, var$7, var$8, var$9, var$10, $existing, var$12;
    var$3 = $this;
    $oldSize = var$3.$elementCount;
    var$5 = $this.$accessOrder;
    if (!$this.$elementCount) {
        $this.$head = null;
        $this.$tail0 = null;
    }
    var$6 = ju_Objects_hashCode($key);
    var$7 = var$6 & 2147483647;
    var$8 = var$7 % $this.$elementData.data.length | 0;
    var$9 = $key === null ? ju_HashMap_findNullKeyEntry($this) : ju_HashMap_findNonNullKeyEntry($this, $key, var$8, var$6);
    if (var$9 === null) {
        $this.$modCount0 = $this.$modCount0 + 1 | 0;
        var$10 = $this.$elementCount + 1 | 0;
        $this.$elementCount = var$10;
        if (var$10 > $this.$threshold) {
            ju_HashMap_rehash(var$3);
            var$8 = var$7 % $this.$elementData.data.length | 0;
        }
        $existing = new ju_LinkedHashMap$LinkedHashMapEntry;
        ju_HashMap$HashEntry__init_($existing, $key, var$6);
        $existing.$chainForward = null;
        $existing.$chainBackward = null;
        var$12 = $this.$elementData.data;
        $existing.$next3 = var$12[var$8];
        var$12[var$8] = $existing;
        $key = $this.$tail0;
        if ($key === null)
            $this.$head = $existing;
        else
            $key.$chainForward = $existing;
        $existing.$chainBackward = $key;
        $this.$tail0 = $existing;
        var$9 = $existing;
    } else if (var$5)
        ju_LinkedHashMap_linkEntry($this, var$9, 0);
    $existing = var$9.$value0;
    var$9.$value0 = $value;
    return $existing;
},
ju_LinkedHashMap_linkEntry = ($this, $entry, $first) => {
    let $n, $p;
    a: {
        if (!$first) {
            $n = $entry.$chainForward;
            if ($n !== null) {
                $p = $entry.$chainBackward;
                if ($p === null)
                    $this.$head = $n;
                else
                    $p.$chainForward = $n;
                $n.$chainBackward = $p;
                $n = $this.$tail0;
                if ($n !== null)
                    $n.$chainForward = $entry;
                $entry.$chainBackward = $n;
                $entry.$chainForward = null;
                $this.$tail0 = $entry;
                break a;
            }
            return;
        }
        $p = $entry.$chainBackward;
        if ($p !== null) {
            $n = $entry.$chainForward;
            if ($n === null)
                $this.$tail0 = $p;
            else
                $n.$chainBackward = $p;
            $p.$chainForward = $n;
            $n = $this.$head;
            if ($n !== null)
                $n.$chainBackward = $entry;
            $entry.$chainForward = $n;
            $entry.$chainBackward = null;
            $this.$head = $entry;
        } else
            return;
    }
},
ju_LinkedHashMap_entrySet = $this => {
    let var$1;
    var$1 = new ju_LinkedHashMapEntrySet;
    var$1.$base1 = $this;
    var$1.$reversed = 0;
    return var$1;
},
ju_LinkedHashMap_keySet = $this => {
    let var$1;
    if ($this.$cachedKeySet === null) {
        var$1 = new ju_LinkedHashMapKeySet;
        var$1.$base0 = $this;
        var$1.$reversed0 = 0;
        $this.$cachedKeySet = var$1;
    }
    return $this.$cachedKeySet;
},
ju_Map$Entry = $rt_classWithoutFields(0),
jl_IllegalArgumentException = $rt_classWithoutFields(jl_RuntimeException);
function cgmep_PaymentRequest() {
    let a = this; jl_Object.call(a);
    a.$payer = null;
    a.$payee = null;
    a.$amount = 0;
    a.$selectedCards2 = null;
    a.$reason = null;
    a.$justSayNoChecked = 0;
}
let cgmep_PaymentRequest__init_ = ($this, $payer, $payee, $amount, $selectedCards, $reason) => {
    cgmep_PaymentRequest__init_1($this, $payer, $payee, $amount, $selectedCards, $reason, 0);
},
cgmep_PaymentRequest__init_2 = (var_0, var_1, var_2, var_3, var_4) => {
    let var_5 = new cgmep_PaymentRequest();
    cgmep_PaymentRequest__init_(var_5, var_0, var_1, var_2, var_3, var_4);
    return var_5;
},
cgmep_PaymentRequest__init_1 = ($this, $payer, $payee, $amount, $selectedCards, $reason, $justSayNoChecked) => {
    $this.$payer = $payer;
    $this.$payee = $payee;
    $this.$amount = $amount;
    $this.$selectedCards2 = $selectedCards !== null ? ju_List_copyOf($selectedCards) : ju_List_of();
    $this.$reason = $reason;
    $this.$justSayNoChecked = $justSayNoChecked;
},
cgmep_PaymentRequest__init_0 = (var_0, var_1, var_2, var_3, var_4, var_5) => {
    let var_6 = new cgmep_PaymentRequest();
    cgmep_PaymentRequest__init_1(var_6, var_0, var_1, var_2, var_3, var_4, var_5);
    return var_6;
},
cgmep_PaymentRequest_withSelectedCards = ($this, $cards) => {
    return cgmep_PaymentRequest__init_0($this.$payer, $this.$payee, $this.$amount, $cards, $this.$reason, $this.$justSayNoChecked);
},
cgmmg_PlayerType = $rt_classWithoutFields(jl_Enum),
cgmmg_PlayerType_HUMAN = null,
cgmmg_PlayerType_COMPUTER = null,
cgmmg_PlayerType_$VALUES = null,
cgmmg_PlayerType_$callClinit = () => {
    cgmmg_PlayerType_$callClinit = $rt_eraseClinit(cgmmg_PlayerType);
    cgmmg_PlayerType__clinit_();
},
cgmmg_PlayerType__init_0 = ($this, var$1, var$2) => {
    cgmmg_PlayerType_$callClinit();
    jl_Enum__init_($this, var$1, var$2);
},
cgmmg_PlayerType__init_ = (var_0, var_1) => {
    let var_2 = new cgmmg_PlayerType();
    cgmmg_PlayerType__init_0(var_2, var_0, var_1);
    return var_2;
},
cgmmg_PlayerType__clinit_ = () => {
    let var$1, var$2, var$3;
    cgmmg_PlayerType_HUMAN = cgmmg_PlayerType__init_($rt_s(154), 0);
    var$1 = cgmmg_PlayerType__init_($rt_s(155), 1);
    cgmmg_PlayerType_COMPUTER = var$1;
    var$2 = $rt_createArray(cgmmg_PlayerType, 2);
    var$3 = var$2.data;
    var$3[0] = cgmmg_PlayerType_HUMAN;
    var$3[1] = var$1;
    cgmmg_PlayerType_$VALUES = var$2;
};
function w_DealBrowser$settlePayments$lambda$_16_0() {
    jl_Object.call(this);
    this.$_04 = null;
}
let w_DealBrowser$settlePayments$lambda$_16_0_apply = (var$0, var$1) => {
    let var$2;
    var$1 = var$1;
    var$2 = var$0.$_04;
    w_DealBrowser_$callClinit();
    return w_DealBrowser_option(var$1, !ju_AbstractCollection_contains(cgmmc_AbstractCardCollection_getCards(var$2.$payer.$bank), var$1) ? $rt_s(156) : $rt_s(157));
},
juf_Consumer = $rt_classWithoutFields(0);
function w_DealBrowser$settlePayments$lambda$_16_1() {
    let a = this; jl_Object.call(a);
    a.$_056 = null;
    a.$_120 = null;
    a.$_27 = null;
}
let w_DealBrowser$settlePayments$lambda$_16_1_accept = (var$0, var$1) => {
    let var$2, var$3, var$4, var$5;
    var$1 = var$1;
    var$2 = var$0.$_056;
    var$3 = var$0.$_120;
    var$4 = var$0.$_27;
    var$1 = ju_Collection_stream(var$1);
    var$5 = new w_DealBrowser$lambda$settlePayments$26$lambda$_48_0;
    var$5.$_027 = var$3;
    var$1 = jus_Stream_toList(jusi_SimpleStreamImpl_map(var$1, var$5));
    cgmc_GameController_makePayment(var$2.$controller, cgmep_PaymentRequest_withSelectedCards(var$4, var$1));
},
w_BotPayment = $rt_classWithoutFields();
function ju_EnumMap() {
    let a = this; ju_AbstractMap.call(a);
    a.$keyType = null;
    a.$data1 = null;
    a.$provided = null;
    a.$size1 = 0;
    a.$entrySet0 = null;
}
let ju_EnumMap__init_0 = ($this, $keyType) => {
    let var$2, var$3;
    $this.$keyType = $keyType;
    var$2 = $rt_createArray(jl_Object, (ju_GenericEnumSet_getConstants($keyType)).data.length);
    var$3 = var$2.data;
    $this.$data1 = var$2;
    $this.$provided = $rt_createBooleanArray(var$3.length);
},
ju_EnumMap__init_ = var_0 => {
    let var_1 = new ju_EnumMap();
    ju_EnumMap__init_0(var_1, var_0);
    return var_1;
},
ju_EnumMap_get = ($this, $key) => {
    let $index;
    if (jl_Class_isInstance($this.$keyType, $key)) {
        $index = $key.$ordinal;
        return $this.$data1.data[$index];
    }
    return null;
},
ju_EnumMap_values = $this => {
    let var$1;
    if ($this.$cachedValues === null) {
        var$1 = new ju_EnumMap$2;
        var$1.$this$03 = $this;
        $this.$cachedValues = var$1;
    }
    return $this.$cachedValues;
},
ju_EnumMap_put = ($this, var$1, var$2) => {
    let var$3, var$4, var$5, var$6;
    var$1 = var$1;
    var$3 = jl_Object_getClass(var$1);
    if (var$3 !== $this.$keyType && jl_Class_getSuperclass(var$3) !== $this.$keyType) {
        var$1 = new jl_ClassCastException;
        jl_Throwable__init_0(var$1);
        $rt_throw(var$1);
    }
    var$4 = var$1.$ordinal;
    var$5 = $this.$data1.data;
    var$1 = var$5[var$4];
    var$6 = $this.$provided.data;
    if (!var$6[var$4]) {
        var$6[var$4] = 1;
        $this.$size1 = $this.$size1 + 1 | 0;
    }
    var$5[var$4] = var$2;
    return var$1;
},
cgmmc_ActionType = $rt_classWithoutFields(jl_Enum),
cgmmc_ActionType_SLY_DEAL = null,
cgmmc_ActionType_FORCED_DEAL = null,
cgmmc_ActionType_DEAL_BREAKER = null,
cgmmc_ActionType_DEBT_COLLECTOR = null,
cgmmc_ActionType_ITS_MY_BIRTHDAY = null,
cgmmc_ActionType_RENT = null,
cgmmc_ActionType_MULTI_COLOUR_RENT = null,
cgmmc_ActionType_DOUBLE_THE_RENT = null,
cgmmc_ActionType_PASS_GO = null,
cgmmc_ActionType_JUST_SAY_NO = null,
cgmmc_ActionType_HOUSE = null,
cgmmc_ActionType_HOTEL = null,
cgmmc_ActionType_$VALUES = null,
cgmmc_ActionType_$callClinit = () => {
    cgmmc_ActionType_$callClinit = $rt_eraseClinit(cgmmc_ActionType);
    cgmmc_ActionType__clinit_();
},
cgmmc_ActionType_values = () => {
    cgmmc_ActionType_$callClinit();
    return cgmmc_ActionType_$VALUES.$clone0();
},
cgmmc_ActionType__init_0 = ($this, var$1, var$2) => {
    cgmmc_ActionType_$callClinit();
    jl_Enum__init_($this, var$1, var$2);
},
cgmmc_ActionType__init_ = (var_0, var_1) => {
    let var_2 = new cgmmc_ActionType();
    cgmmc_ActionType__init_0(var_2, var_0, var_1);
    return var_2;
},
cgmmc_ActionType__clinit_ = () => {
    let var$1, var$2, var$3;
    cgmmc_ActionType_SLY_DEAL = cgmmc_ActionType__init_($rt_s(158), 0);
    cgmmc_ActionType_FORCED_DEAL = cgmmc_ActionType__init_($rt_s(159), 1);
    cgmmc_ActionType_DEAL_BREAKER = cgmmc_ActionType__init_($rt_s(160), 2);
    cgmmc_ActionType_DEBT_COLLECTOR = cgmmc_ActionType__init_($rt_s(161), 3);
    cgmmc_ActionType_ITS_MY_BIRTHDAY = cgmmc_ActionType__init_($rt_s(162), 4);
    cgmmc_ActionType_RENT = cgmmc_ActionType__init_($rt_s(163), 5);
    cgmmc_ActionType_MULTI_COLOUR_RENT = cgmmc_ActionType__init_($rt_s(164), 6);
    cgmmc_ActionType_DOUBLE_THE_RENT = cgmmc_ActionType__init_($rt_s(165), 7);
    cgmmc_ActionType_PASS_GO = cgmmc_ActionType__init_($rt_s(166), 8);
    cgmmc_ActionType_JUST_SAY_NO = cgmmc_ActionType__init_($rt_s(167), 9);
    cgmmc_ActionType_HOUSE = cgmmc_ActionType__init_($rt_s(168), 10);
    var$1 = cgmmc_ActionType__init_($rt_s(169), 11);
    cgmmc_ActionType_HOTEL = var$1;
    var$2 = $rt_createArray(cgmmc_ActionType, 12);
    var$3 = var$2.data;
    var$3[0] = cgmmc_ActionType_SLY_DEAL;
    var$3[1] = cgmmc_ActionType_FORCED_DEAL;
    var$3[2] = cgmmc_ActionType_DEAL_BREAKER;
    var$3[3] = cgmmc_ActionType_DEBT_COLLECTOR;
    var$3[4] = cgmmc_ActionType_ITS_MY_BIRTHDAY;
    var$3[5] = cgmmc_ActionType_RENT;
    var$3[6] = cgmmc_ActionType_MULTI_COLOUR_RENT;
    var$3[7] = cgmmc_ActionType_DOUBLE_THE_RENT;
    var$3[8] = cgmmc_ActionType_PASS_GO;
    var$3[9] = cgmmc_ActionType_JUST_SAY_NO;
    var$3[10] = cgmmc_ActionType_HOUSE;
    var$3[11] = var$1;
    cgmmc_ActionType_$VALUES = var$2;
},
cgmea_ActionEffect = $rt_classWithoutFields(0),
cgmea_SlyDealEffect = $rt_classWithoutFields(),
cgmea_SlyDealEffect_execute = ($this, $c) => {
    let $selected, var$3, var$4;
    if ($c.$targetPlayer0 !== null && $c.$selectedCards1.$size() == 1) {
        $selected = $c.$selectedCards1.$get(0);
        if (ju_AbstractCollection_contains(cgmmc_PropertyCollection_getStealableProperties($c.$targetPlayer0.$properties), $selected)) {
            var$3 = cgmmc_PropertyCollection_removeCard($c.$targetPlayer0.$properties, $selected);
            var$4 = new cgmea_SlyDealEffect$execute$lambda$_1_0;
            var$4.$_063 = $c;
            ju_Optional_ifPresent(var$3, var$4);
            var$3 = $selected.$name0;
            $c = new jl_StringBuilder;
            jl_AbstractStringBuilder__init_($c);
            jl_StringBuilder_append(jl_StringBuilder_append($c, $rt_s(170)), var$3);
            return cgmea_ActionResult_message(jl_AbstractStringBuilder_toString($c));
        }
        $c = new cgme_InvalidMoveException;
        jl_Throwable__init_($c, $rt_s(171));
        $rt_throw($c);
    }
    $selected = new cgme_InvalidMoveException;
    jl_Throwable__init_($selected, $rt_s(172));
    $rt_throw($selected);
},
cgmea_ForcedDealEffect = $rt_classWithoutFields(),
cgmea_ForcedDealEffect_execute = ($this, $c) => {
    let $give, $take, var$4;
    if ($c.$targetPlayer0 !== null && $c.$selectedCards1.$size() == 2) {
        $give = $c.$selectedCards1.$get(0);
        $take = $c.$selectedCards1.$get(1);
        if (ju_AbstractCollection_contains(cgmmc_PropertyCollection_getStealableProperties($c.$actor.$properties), $give)) {
            if (ju_AbstractCollection_contains(cgmmc_PropertyCollection_getStealableProperties($c.$targetPlayer0.$properties), $take)) {
                $give = cgmmc_PropertyCollection_removeCard($c.$actor.$properties, $give);
                var$4 = new cgmea_ForcedDealEffect$execute$lambda$_1_0;
                var$4.$_045 = $c;
                ju_Optional_ifPresent($give, var$4);
                $give = cgmmc_PropertyCollection_removeCard($c.$targetPlayer0.$properties, $take);
                $take = new cgmea_ForcedDealEffect$execute$lambda$_1_1;
                $take.$_02 = $c;
                ju_Optional_ifPresent($give, $take);
                return cgmea_ActionResult_message($rt_s(173));
            }
            $c = new cgme_InvalidMoveException;
            jl_Throwable__init_($c, $rt_s(174));
            $rt_throw($c);
        }
        $c = new cgme_InvalidMoveException;
        jl_Throwable__init_($c, $rt_s(175));
        $rt_throw($c);
    }
    $give = new cgme_InvalidMoveException;
    jl_Throwable__init_($give, $rt_s(176));
    $rt_throw($give);
},
cgmea_DebtCollectorEffect = $rt_classWithoutFields(),
cgmea_DebtCollectorEffect_execute = ($this, $c) => {
    let var$2, $request, var$4, var$5, var$6;
    var$2 = $c.$targetPlayer0;
    if (var$2 !== null) {
        $request = new cgmep_PaymentRequest;
        var$4 = $c.$actor;
        var$5 = ju_List_of();
        cgmep_PaymentReason_$callClinit();
        cgmep_PaymentRequest__init_($request, var$2, var$4, 5, var$5, cgmep_PaymentReason_DEBT_COLLECTOR);
        var$6 = $c.$targetPlayer0.$name;
        $c = new jl_StringBuilder;
        jl_AbstractStringBuilder__init_($c);
        jl_StringBuilder_append(jl_StringBuilder_append(jl_StringBuilder_append($c, $rt_s(177)), var$6), $rt_s(178));
        return cgmea_ActionResult_withPayments(jl_AbstractStringBuilder_toString($c), ju_List_of0($request));
    }
    $c = new cgme_InvalidMoveException;
    jl_Throwable__init_($c, $rt_s(179));
    $rt_throw($c);
},
cgmea_BirthdayEffect = $rt_classWithoutFields(),
cgmea_BirthdayEffect_execute = ($this, $c) => {
    let $requests, var$3;
    $requests = ju_Collection_stream(cgmmg_Game_getPlayers($c.$game2));
    var$3 = new cgmea_BirthdayEffect$execute$lambda$_1_0;
    var$3.$_09 = $c;
    $requests = jusi_SimpleStreamImpl_filter($requests, var$3);
    var$3 = new cgmea_BirthdayEffect$execute$lambda$_1_1;
    var$3.$_032 = $c;
    return cgmea_ActionResult_withPayments($rt_s(180), jus_Stream_toList(jusi_SimpleStreamImpl_map($requests, var$3)));
};
function cgmea_RentEffect() {
    jl_Object.call(this);
    this.$rentCalculator = null;
}
let cgmea_RentEffect__init_0 = ($this, $rc) => {
    $this.$rentCalculator = $rc;
},
cgmea_RentEffect__init_ = var_0 => {
    let var_1 = new cgmea_RentEffect();
    cgmea_RentEffect__init_0(var_1, var_0);
    return var_1;
},
cgmea_RentEffect_execute = ($this, $c) => {
    let $color, $targets, var$4, $requests, $amount;
    $color = $c.$chosenColor1;
    if ($color !== null) {
        $targets = $c.$actor;
        var$4 = $c.$doubleRentCount1;
        $targets = cgmmc_PropertyCollection_findSet($targets.$properties, $color);
        $requests = new cgme_StandardRentCalculator$calculateRent$lambda$_1_0;
        $requests.$_011 = $color;
        $targets = ju_Optional_orElseThrow($targets, $requests);
        if (cgmmc_PropertySet_propertyCount($targets)) {
            $amount = cgmmc_PropertySet_calculateBaseRent($targets) + cgmmc_PropertySet_buildingBonus($targets) | 0;
            if (var$4 >= 0 && var$4 <= 2) {
                $amount = $rt_imul($amount, 1 << var$4);
                if ($amount) {
                    $requests = $c.$card.$actionType;
                    cgmmc_ActionType_$callClinit();
                    if ($requests !== cgmmc_ActionType_MULTI_COLOUR_RENT) {
                        $targets = ju_Collection_stream(cgmmg_Game_getPlayers($c.$game2));
                        $requests = new cgmea_RentEffect$execute$lambda$_1_0;
                        $requests.$_066 = $c;
                        $targets = jus_Stream_toList(jusi_SimpleStreamImpl_filter($targets, $requests));
                    } else {
                        $targets = $c.$targetPlayer0;
                        if ($targets !== null)
                            $targets = ju_List_of0($targets);
                        else {
                            $c = new cgme_InvalidMoveException;
                            jl_Throwable__init_($c, $rt_s(181));
                            $rt_throw($c);
                        }
                    }
                    $targets = ju_Collection_stream($targets);
                    $requests = new cgmea_RentEffect$execute$lambda$_1_1;
                    $requests.$_016 = $c;
                    $requests.$_15 = $amount;
                    $requests = jus_Stream_toList(jusi_SimpleStreamImpl_map($targets, $requests));
                    $c = new jl_StringBuilder;
                    jl_AbstractStringBuilder__init_($c);
                    jl_AbstractStringBuilder_append(jl_StringBuilder_append0(jl_StringBuilder_append($c, $rt_s(182)), $amount), 77);
                    return cgmea_ActionResult_withPayments(jl_AbstractStringBuilder_toString($c), $requests);
                }
                $c = new cgme_InvalidMoveException;
                jl_Throwable__init_($c, $rt_s(183));
                $rt_throw($c);
            }
            $targets = new cgme_InvalidMoveException;
            jl_Throwable__init_($targets, $rt_s(184));
            $rt_throw($targets);
        }
        $c = new cgme_InvalidMoveException;
        jl_Throwable__init_($c, $rt_s(185));
        $rt_throw($c);
    }
    $c = new cgme_InvalidMoveException;
    jl_Throwable__init_($c, $rt_s(186));
    $rt_throw($c);
},
cgmea_DoubleRentEffect = $rt_classWithoutFields(),
cgmea_DoubleRentEffect_execute = ($this, $c) => {
    return cgmea_ActionResult_cancelled($rt_s(187));
},
cgmea_PassGoEffect = $rt_classWithoutFields(),
cgmea_PassGoEffect_execute = ($this, $c) => {
    let var$2;
    var$2 = $c.$actor.$hand;
    $c = $c.$game2;
    $c = cgmmc_Deck_draw($c.$deck, 2, $c.$discardPile);
    cgmmc_AbstractCardCollection_addAll(var$2, $c);
    return cgmea_ActionResult_message($rt_s(188));
},
cgmea_JustSayNoEffect = $rt_classWithoutFields(),
cgmea_JustSayNoEffect_execute = ($this, $c) => {
    return cgmea_ActionResult_cancelled($rt_s(189));
},
cgmea_BuildingEffect = $rt_classWithoutFields(),
cgmea_BuildingEffect_execute = ($this, $c) => {
    let var$2, var$3;
    var$2 = $c.$chosenColor1;
    if (var$2 !== null) {
        if ((ju_Optional_orElse(ju_Optional_map(cgmmc_PropertyCollection_findSet($c.$actor.$properties, var$2), new cgmea_BuildingEffect$execute$lambda$_1_0), jl_Boolean_valueOf(0))).$value2) {
            $c = jl_String_valueOf($c.$chosenColor1);
            var$3 = new jl_StringBuilder;
            jl_AbstractStringBuilder__init_(var$3);
            jl_StringBuilder_append(jl_StringBuilder_append(jl_StringBuilder_append(var$3, $rt_s(190)), $c), $rt_s(191));
            return cgmea_ActionResult_message(jl_AbstractStringBuilder_toString(var$3));
        }
        var$3 = new cgme_InvalidMoveException;
        jl_Throwable__init_(var$3, $rt_s(192));
        $rt_throw(var$3);
    }
    $c = new cgme_InvalidMoveException;
    jl_Throwable__init_($c, $rt_s(193));
    $rt_throw($c);
},
cgmea_DealBreakerEffect = $rt_classWithoutFields(),
cgmea_DealBreakerEffect_execute = ($this, $c) => {
    let $targetSet, $cardsToSteal, $nonBuildings, $buildings, $card, $buildingCard, var$8, var$9, var$10;
    $targetSet = $c.$targetPlayer0;
    if ($targetSet !== null) {
        $cardsToSteal = $c.$chosenColor1;
        if ($cardsToSteal !== null) {
            $targetSet = cgmmc_PropertyCollection_findSet($targetSet.$properties, $cardsToSteal);
            $cardsToSteal = new cgmea_DealBreakerEffect$execute$lambda$_1_0;
            $cardsToSteal.$_054 = $c;
            $targetSet = ju_Optional_orElseThrow($targetSet, $cardsToSteal);
            if (cgmmc_PropertySet_isComplete($targetSet)) {
                $cardsToSteal = ju_List_copyOf(cgmmc_PropertySet_getAllCards($targetSet));
                $nonBuildings = ju_ArrayList__init_();
                $buildings = ju_ArrayList__init_();
                $cardsToSteal = ju_AbstractList_iterator($cardsToSteal);
                while (ju_AbstractList$1_hasNext($cardsToSteal)) {
                    $card = ju_AbstractList$1_next($cardsToSteal);
                    if (!($card instanceof cgmmc_BuildingCard))
                        ju_ArrayList_add($nonBuildings, $card);
                    else {
                        $buildingCard = $card;
                        ju_ArrayList_add($buildings, $buildingCard);
                    }
                }
                cgmea_DealBreakerEffect_validateReceiverCanTakeSet($this, $c, $nonBuildings, $buildings);
                $targetSet = $c.$targetPlayer0.$properties;
                $card = $c.$chosenColor1;
                $cardsToSteal = $targetSet.$sets;
                if (!jl_Class_isInstance($cardsToSteal.$keyType, $card))
                    $targetSet = null;
                else {
                    var$8 = $card.$ordinal;
                    var$9 = $cardsToSteal.$data1.data;
                    $targetSet = var$9[var$8];
                    var$10 = $cardsToSteal.$provided.data;
                    if (var$10[var$8]) {
                        var$10[var$8] = 0;
                        var$9[var$8] = null;
                        $cardsToSteal.$size1 = $cardsToSteal.$size1 - 1 | 0;
                    }
                }
                $cardsToSteal = ju_Optional_ofNullable($targetSet);
                $targetSet = new cgmea_DealBreakerEffect$execute$lambda$_1_1;
                $targetSet.$_036 = $c;
                ju_Optional_orElseThrow($cardsToSteal, $targetSet);
                $cardsToSteal = ju_AbstractList_iterator($nonBuildings);
                while (ju_AbstractList$1_hasNext($cardsToSteal)) {
                    $card = ju_AbstractList$1_next($cardsToSteal);
                    cgmmc_PropertyCollection_addToBestSet($c.$actor.$properties, $card);
                }
                $targetSet = ju_Collection_stream($buildings);
                $cardsToSteal = new cgmea_DealBreakerEffect$execute$lambda$_1_2;
                $nonBuildings = new ju_Comparator$comparing$lambda$_9_0;
                $nonBuildings.$_014 = $cardsToSteal;
                $targetSet = jusi_SimpleStreamImpl_sorted($targetSet, $nonBuildings);
                $cardsToSteal = new cgmea_DealBreakerEffect$execute$lambda$_1_3;
                $cardsToSteal.$_065 = $c;
                $nonBuildings = $targetSet;
                while (true) {
                    $targetSet = new jusi_SimpleStreamImpl$forEachOrdered$lambda$_19_0;
                    $targetSet.$_068 = $cardsToSteal;
                    if (!jusi_SortedStreamImpl_next($nonBuildings, $targetSet))
                        break;
                }
                $targetSet = jl_String_valueOf($c.$chosenColor1);
                $nonBuildings = $c.$targetPlayer0.$name;
                $c = new jl_StringBuilder;
                jl_AbstractStringBuilder__init_($c);
                jl_StringBuilder_append(jl_StringBuilder_append(jl_StringBuilder_append(jl_StringBuilder_append($c, $rt_s(194)), $targetSet), $rt_s(195)), $nonBuildings);
                return cgmea_ActionResult_message(jl_AbstractStringBuilder_toString($c));
            }
            $targetSet = new cgme_InvalidMoveException;
            $c = jl_String_valueOf($c.$chosenColor1);
            $cardsToSteal = new jl_StringBuilder;
            jl_AbstractStringBuilder__init_($cardsToSteal);
            jl_StringBuilder_append(jl_StringBuilder_append($cardsToSteal, $rt_s(196)), $c);
            jl_Throwable__init_($targetSet, jl_AbstractStringBuilder_toString($cardsToSteal));
            $rt_throw($targetSet);
        }
    }
    $targetSet = new cgme_InvalidMoveException;
    jl_Throwable__init_($targetSet, $rt_s(197));
    $rt_throw($targetSet);
},
cgmea_DealBreakerEffect_validateReceiverCanTakeSet = ($this, $c, $nonBuildings, $buildings) => {
    let $color, $receiverSet, $receiverHasHouse, $receiverHasHotel, $card, $stolenHasHouse, $stolenHasHotel, $receiverPropertyCount, $receiverHasRealProperty;
    if (!ju_AbstractCollection_isEmpty($buildings)) {
        $color = $c.$chosenColor1;
        cgmmc_PropertyColor_$callClinit();
        if ($color !== cgmmc_PropertyColor_RAILROAD && $color !== cgmmc_PropertyColor_UTILITY && $color !== cgmmc_PropertyColor_ANY) {
            $receiverSet = ju_Optional_orElse(cgmmc_PropertyCollection_findSet($c.$actor.$properties, $color), null);
            $receiverHasHouse = !($receiverSet !== null && ($receiverSet.$house === null ? 0 : 1)) ? 0 : 1;
            $receiverHasHotel = !($receiverSet !== null && ($receiverSet.$hotel === null ? 0 : 1)) ? 0 : 1;
            $card = $buildings;
            $c = ju_Collection_stream($card);
            $buildings = new cgmea_DealBreakerEffect$validateReceiverCanTakeSet$lambda$_2_0;
            $stolenHasHouse = jusi_SimpleStreamImpl_anyMatch($c, $buildings);
            $c = ju_Collection_stream($card);
            $buildings = new cgmea_DealBreakerEffect$validateReceiverCanTakeSet$lambda$_2_1;
            $stolenHasHotel = jusi_SimpleStreamImpl_anyMatch($c, $buildings);
            if ($stolenHasHouse && $receiverHasHouse) {
                $c = new cgme_InvalidMoveException;
                $nonBuildings = jl_String_valueOf($color);
                $buildings = new jl_StringBuilder;
                jl_AbstractStringBuilder__init_($buildings);
                jl_StringBuilder_append(jl_StringBuilder_append(jl_StringBuilder_append($buildings, $rt_s(198)), $nonBuildings), $rt_s(199));
                jl_Throwable__init_($c, jl_AbstractStringBuilder_toString($buildings));
                $rt_throw($c);
            }
            if ($stolenHasHotel && $receiverHasHotel) {
                $c = new cgme_InvalidMoveException;
                $nonBuildings = jl_String_valueOf($color);
                $buildings = new jl_StringBuilder;
                jl_AbstractStringBuilder__init_($buildings);
                jl_StringBuilder_append(jl_StringBuilder_append(jl_StringBuilder_append($buildings, $rt_s(198)), $nonBuildings), $rt_s(200));
                jl_Throwable__init_($c, jl_AbstractStringBuilder_toString($buildings));
                $rt_throw($c);
            }
            if ($stolenHasHotel && !$stolenHasHouse && !$receiverHasHouse) {
                $c = new cgme_InvalidMoveException;
                jl_Throwable__init_($c, $rt_s(201));
                $rt_throw($c);
            }
            $receiverPropertyCount = $receiverSet !== null ? cgmmc_PropertySet_propertyCount($receiverSet) : 0;
            $receiverHasRealProperty = !($receiverSet !== null && cgmmc_PropertySet_hasRealProperty($receiverSet)) ? 0 : 1;
            $nonBuildings = ju_AbstractList_iterator($nonBuildings);
            while (ju_AbstractList$1_hasNext($nonBuildings)) {
                $card = ju_AbstractList$1_next($nonBuildings);
                if ($card instanceof cgmmc_PropertyCard) {
                    $receiverPropertyCount = $receiverPropertyCount + 1 | 0;
                    $receiverHasRealProperty = 1;
                } else if ($card instanceof cgmmc_WildcardCard)
                    $receiverPropertyCount = $receiverPropertyCount + 1 | 0;
            }
            if ($receiverHasRealProperty && $receiverPropertyCount >= $color.$fullSetSize)
                return;
            $c = new cgme_InvalidMoveException;
            $nonBuildings = jl_String_valueOf($color);
            $buildings = new jl_StringBuilder;
            jl_AbstractStringBuilder__init_($buildings);
            jl_StringBuilder_append(jl_StringBuilder_append(jl_StringBuilder_append($buildings, $rt_s(202)), $nonBuildings), $rt_s(191));
            jl_Throwable__init_($c, jl_AbstractStringBuilder_toString($buildings));
            $rt_throw($c);
        }
        $c = new cgme_InvalidMoveException;
        $nonBuildings = jl_String_valueOf($color);
        $buildings = new jl_StringBuilder;
        jl_AbstractStringBuilder__init_($buildings);
        jl_StringBuilder_append(jl_StringBuilder_append($buildings, $rt_s(203)), $nonBuildings);
        jl_Throwable__init_($c, jl_AbstractStringBuilder_toString($buildings));
        $rt_throw($c);
    }
};
function ju_ArrayList() {
    let a = this; ju_AbstractList.call(a);
    a.$array = null;
    a.$size0 = 0;
}
let ju_ArrayList__init_3 = $this => {
    ju_ArrayList__init_1($this, 10);
},
ju_ArrayList__init_ = () => {
    let var_0 = new ju_ArrayList();
    ju_ArrayList__init_3(var_0);
    return var_0;
},
ju_ArrayList__init_1 = ($this, $initialCapacity) => {
    let var$2;
    if ($initialCapacity < 0) {
        var$2 = new jl_IllegalArgumentException;
        jl_Throwable__init_0(var$2);
        $rt_throw(var$2);
    }
    $this.$array = $rt_createArray(jl_Object, $initialCapacity);
},
ju_ArrayList__init_4 = var_0 => {
    let var_1 = new ju_ArrayList();
    ju_ArrayList__init_1(var_1, var_0);
    return var_1;
},
ju_ArrayList__init_2 = ($this, $c) => {
    let $iter, $i, var$4, var$5;
    ju_ArrayList__init_1($this, $c.$size());
    $iter = $c.$iterator();
    $i = 0;
    while (true) {
        var$4 = $this.$array.data;
        var$5 = var$4.length;
        if ($i >= var$5)
            break;
        var$4[$i] = $iter.$next();
        $i = $i + 1 | 0;
    }
    $this.$size0 = var$5;
},
ju_ArrayList__init_0 = var_0 => {
    let var_1 = new ju_ArrayList();
    ju_ArrayList__init_2(var_1, var_0);
    return var_1;
},
ju_ArrayList_ensureCapacity = ($this, $minCapacity) => {
    let var$2, $newLength;
    var$2 = $this.$array.data.length;
    if (var$2 < $minCapacity) {
        $newLength = var$2 >= 1073741823 ? 2147483647 : jl_Math_max($minCapacity, jl_Math_max(var$2 * 2 | 0, 5));
        $this.$array = ju_Arrays_copyOf0($this.$array, $newLength);
    }
},
ju_ArrayList_get = ($this, $index) => {
    ju_ArrayList_checkIndex($this, $index);
    return $this.$array.data[$index];
},
ju_ArrayList_size = $this => {
    return $this.$size0;
},
ju_ArrayList_set = ($this, $index, $element) => {
    let var$3, $old;
    ju_ArrayList_checkIndex($this, $index);
    var$3 = $this.$array.data;
    $old = var$3[$index];
    var$3[$index] = $element;
    return $old;
},
ju_ArrayList_add = ($this, $element) => {
    let var$2, var$3;
    ju_ArrayList_ensureCapacity($this, $this.$size0 + 1 | 0);
    var$2 = $this.$array.data;
    var$3 = $this.$size0;
    $this.$size0 = var$3 + 1 | 0;
    var$2[var$3] = $element;
    $this.$modCount = $this.$modCount + 1 | 0;
    return 1;
},
ju_ArrayList_remove = ($this, $i) => {
    let var$2, $old, var$4, $i_0;
    ju_ArrayList_checkIndex($this, $i);
    var$2 = $this.$array.data;
    $old = var$2[$i];
    var$4 = $this.$size0 - 1 | 0;
    $this.$size0 = var$4;
    while ($i < var$4) {
        $i_0 = $i + 1 | 0;
        var$2[$i] = var$2[$i_0];
        $i = $i_0;
    }
    var$2[var$4] = null;
    $this.$modCount = $this.$modCount + 1 | 0;
    return $old;
},
ju_ArrayList_clear = $this => {
    ju_Arrays_fill0($this.$array, 0, $this.$size0, null);
    $this.$size0 = 0;
    $this.$modCount = $this.$modCount + 1 | 0;
},
ju_ArrayList_checkIndex = ($this, $index) => {
    let var$2;
    if ($index >= 0 && $index < $this.$size0)
        return;
    var$2 = new jl_IndexOutOfBoundsException;
    jl_Throwable__init_0(var$2);
    $rt_throw(var$2);
},
ju_ArrayList_forEach = ($this, $action) => {
    let $i, var$3;
    $i = 0;
    while ($i < $this.$size0) {
        var$3 = $this.$array.data[$i];
        cgmmc_AbstractCardCollection$addAll$lambda$_4_0_accept($action, var$3);
        $i = $i + 1 | 0;
    }
},
ju_Set = $rt_classWithoutFields(0),
ju_Set_copyOf = $collection => {
    let var$2, var$3, var$4, var$5, var$6, var$7, var$8, var$9, var$10, var$11;
    var$2 = new ju_TemplateCollections$NElementSet;
    var$3 = $rt_createArray(jl_Object, ju_GenericEnumSet_size($collection));
    var$4 = 0;
    $collection = $collection;
    var$5 = $rt_createArray(jl_Object, ju_GenericEnumSet_size($collection)).data;
    var$6 = 0;
    var$7 = ju_GenericEnumSet_iterator($collection);
    while (ju_GenericEnumSet$1_hasNext(var$7)) {
        var$8 = var$6 + 1 | 0;
        var$5[var$6] = ju_GenericEnumSet$1_next(var$7);
        var$6 = var$8;
    }
    var$3 = var$3.data;
    var$8 = var$5.length;
    var$9 = 0;
    while (var$9 < var$8) {
        var$7 = var$5[var$9];
        ju_Objects_requireNonNull(var$7);
        var$10 = jl_Math_abs(jl_Object_identity(var$7));
        var$6 = var$3.length;
        var$10 = var$10 % var$6 | 0;
        a: {
            b: {
                while (true) {
                    if (var$3[var$10] === null)
                        break b;
                    if (jl_Enum_equals(var$3[var$10], var$7))
                        break;
                    var$10 = (var$10 + 1 | 0) % var$6 | 0;
                }
                break a;
            }
            var$3[var$10] = var$7;
            var$4 = var$4 + 1 | 0;
        }
        var$9 = var$9 + 1 | 0;
    }
    var$5 = $rt_createArray(jl_Object, var$4);
    var$11 = var$5.data;
    var$8 = 0;
    var$6 = var$3.length;
    var$10 = 0;
    while (var$10 < var$6) {
        $collection = var$3[var$10];
        if ($collection !== null) {
            var$4 = var$8 + 1 | 0;
            var$11[var$8] = $collection;
            var$8 = var$4;
        }
        var$10 = var$10 + 1 | 0;
    }
    var$2.$data0 = var$5;
    return var$2;
},
ju_AbstractSet = $rt_classWithoutFields(ju_AbstractCollection),
ju_AbstractSet_equals = ($this, $obj) => {
    let $other, $iter;
    if ($this !== $obj) {
        if ($rt_isInstance($obj, ju_Set)) {
            $other = $obj;
            if ($this.$size() == $other.$size()) {
                $iter = $other.$iterator();
                while ($iter.$hasNext()) {
                    if ($this.$contains($iter.$next()))
                        continue;
                    else
                        return 0;
                }
                return 1;
            }
            return 0;
        }
        return 0;
    }
    return 1;
},
ju_AbstractSet_hashCode = $this => {
    let $result, $iter, $e;
    $result = 0;
    $iter = $this.$iterator();
    while ($iter.$hasNext()) {
        $e = $iter.$next();
        if ($e !== null)
            $result = $result + $e.$hashCode() | 0;
    }
    return $result;
},
ju_TemplateCollections$AbstractImmutableSet = $rt_classWithoutFields(ju_AbstractSet),
ju_Collections$1 = $rt_classWithoutFields(ju_TemplateCollections$AbstractImmutableSet),
ju_Collections$1_size = $this => {
    return 0;
},
ju_Collections$1_iterator = $this => {
    return ju_Collections_emptyIterator();
},
ju_Collections$1_isEmpty = $this => {
    return 1;
},
ju_TemplateCollections$AbstractImmutableMap = $rt_classWithoutFields(ju_AbstractMap),
ju_TemplateCollections$AbstractImmutableMap_put = ($this, $key, $value) => {
    $key = new jl_UnsupportedOperationException;
    jl_Throwable__init_0($key);
    $rt_throw($key);
},
ju_Collections$2 = $rt_classWithoutFields(ju_TemplateCollections$AbstractImmutableMap),
ju_Collections$3 = $rt_classWithoutFields(ju_TemplateCollections$AbstractImmutableList),
ju_Collections$3_get = ($this, $index) => {
    let var$2;
    var$2 = new jl_IndexOutOfBoundsException;
    jl_Throwable__init_0(var$2);
    $rt_throw(var$2);
},
ju_Collections$3_size = $this => {
    return 0;
},
ju_Collections$3_iterator = $this => {
    return ju_Collections_emptyIterator();
},
ju_Collections$3_isEmpty = $this => {
    return 1;
},
ju_Iterator = $rt_classWithoutFields(0),
ju_Collections$4 = $rt_classWithoutFields(),
ju_Collections$4_hasNext = $this => {
    return 0;
},
ju_Collections$4_next = $this => {
    let var$1;
    var$1 = new ju_NoSuchElementException;
    jl_Throwable__init_0(var$1);
    $rt_throw(var$1);
},
ju_ListIterator = $rt_classWithoutFields(0),
ju_Collections$5 = $rt_classWithoutFields(),
ju_Collections$_clinit_$lambda$_59_0 = $rt_classWithoutFields(),
cgmmc_CardCollection = $rt_classWithoutFields(0);
function cgmmc_AbstractCardCollection() {
    jl_Object.call(this);
    this.$cards = null;
}
let cgmmc_AbstractCardCollection__init_ = $this => {
    $this.$cards = ju_ArrayList__init_();
},
cgmmc_AbstractCardCollection_getCards = $this => {
    return ju_Collections_unmodifiableList($this.$cards);
},
cgmmc_AbstractCardCollection_add = ($this, $card) => {
    let var$2;
    var$2 = $this.$cards;
    $card = ju_Objects_requireNonNull($card);
    ju_ArrayList_add(var$2, $card);
},
cgmmc_AbstractCardCollection_addAll = ($this, $cs) => {
    let var$2;
    var$2 = new cgmmc_AbstractCardCollection$addAll$lambda$_4_0;
    var$2.$_053 = $this;
    $cs.$forEach(var$2);
},
cgmmc_AbstractCardCollection_remove = ($this, $card) => {
    let var$2, var$3, var$4, var$5;
    var$2 = $this.$cards;
    var$3 = var$2;
    var$4 = var$3.$size0;
    var$5 = 0;
    a: {
        b: {
            while (true) {
                if (var$5 >= var$4)
                    break b;
                if (ju_Objects_equals($card, ju_ArrayList_get(var$3, var$5)))
                    break;
                var$5 = var$5 + 1 | 0;
            }
            break a;
        }
        var$5 = (-1);
    }
    if (var$5 < 0)
        var$5 = 0;
    else {
        ju_ArrayList_remove(var$2, var$5);
        var$5 = 1;
    }
    return var$5;
},
cgmmc_AbstractCardCollection_size = $this => {
    return $this.$cards.$size0;
};
function cgmmc_PropertyCollection() {
    jl_Object.call(this);
    this.$sets = null;
}
let cgmmc_PropertyCollection_addProperty = ($this, $card, $color) => {
    if ($color === $card.$color0) {
        $color = cgmmc_PropertyCollection_set($this, $color);
        if ($card.$color0 !== $color.$color) {
            $color = new cgme_InvalidMoveException;
            jl_Throwable__init_($color, $rt_s(204));
            $rt_throw($color);
        }
        ju_ArrayList_add($color.$properties0, $card);
        return;
    }
    $color = new cgme_InvalidMoveException;
    jl_Throwable__init_($color, $rt_s(205));
    $rt_throw($color);
},
cgmmc_PropertyCollection_addWildcard = ($this, $c, $color) => {
    let var$3, var$4;
    $color = cgmmc_PropertyCollection_set($this, $color);
    var$3 = cgmmc_WildcardCard_getAllowedColors($c);
    var$4 = $color.$color;
    if (ju_TemplateCollections$NElementSet_contains(var$3, var$4)) {
        var$3 = $color.$color;
        if (!ju_GenericEnumSet_contains($c.$allowedColors, var$3)) {
            $c = new cgme_InvalidMoveException;
            $color = jl_String_valueOf(var$3);
            var$3 = new jl_StringBuilder;
            jl_AbstractStringBuilder__init_(var$3);
            jl_StringBuilder_append(jl_StringBuilder_append(var$3, $rt_s(206)), $color);
            jl_Throwable__init_($c, jl_AbstractStringBuilder_toString(var$3));
            $rt_throw($c);
        }
        $c.$activeColor = var$3;
        ju_ArrayList_add($color.$wildcards, $c);
        return;
    }
    $c = new cgme_InvalidMoveException;
    $color = jl_String_valueOf($color.$color);
    var$3 = new jl_StringBuilder;
    jl_AbstractStringBuilder__init_(var$3);
    jl_StringBuilder_append(jl_StringBuilder_append(var$3, $rt_s(207)), $color);
    jl_Throwable__init_($c, jl_AbstractStringBuilder_toString(var$3));
    $rt_throw($c);
},
cgmmc_PropertyCollection_addToBestSet = ($this, $card) => {
    let $propertyCard, $wildcardCard;
    if ($card instanceof cgmmc_PropertyCard) {
        $propertyCard = $card;
        cgmmc_PropertyCollection_addProperty($this, $propertyCard, $propertyCard.$color0);
    } else if ($card instanceof cgmmc_WildcardCard) {
        $wildcardCard = $card;
        cgmmc_PropertyCollection_addWildcard($this, $wildcardCard, $wildcardCard.$activeColor);
    } else if ($card instanceof cgmmc_BuildingCard) {
        $wildcardCard = new cgme_InvalidMoveException;
        jl_Throwable__init_($wildcardCard, $rt_s(208));
        $rt_throw($wildcardCard);
    }
},
cgmmc_PropertyCollection_removeCard = ($this, $card) => {
    let var$2, var$3, var$4, var$5, $set, var$7, var$8, $removed;
    var$2 = ju_EnumMap$2_iterator(ju_EnumMap_values($this.$sets));
    var$3 = $card instanceof cgmmc_PropertyCard;
    var$4 = $card instanceof cgmmc_WildcardCard;
    var$5 = $card instanceof cgmmc_BuildingCard;
    while (true) {
        if (!ju_EnumMap$2$1_hasNext(var$2))
            return ju_Optional_empty();
        $set = ju_EnumMap$2$1_next(var$2);
        if (var$3) {
            var$7 = $card.$id;
            var$8 = ju_AbstractList_iterator($set.$properties0);
            a: {
                b: {
                    while (ju_AbstractList$1_hasNext(var$8)) {
                        $set = ju_AbstractList$1_next(var$8);
                        if (ju_UUID_equals($set.$id, var$7))
                            break b;
                    }
                    $set = ju_Optional_empty();
                    break a;
                }
                ju_AbstractList$1_remove(var$8);
                $set = ju_Optional_of($set);
            }
            $removed = ju_Optional_map($set, new cgmmc_PropertySet$removeCard$lambda$_4_0);
        } else if (var$4) {
            $removed = $card.$id;
            var$7 = ju_AbstractList_iterator($set.$wildcards);
            c: {
                d: {
                    while (ju_AbstractList$1_hasNext(var$7)) {
                        var$8 = ju_AbstractList$1_next(var$7);
                        if (ju_UUID_equals(var$8.$id, $removed))
                            break d;
                    }
                    $set = ju_Optional_empty();
                    break c;
                }
                ju_AbstractList$1_remove(var$7);
                $set = ju_Optional_of(var$8);
            }
            $removed = ju_Optional_map($set, new cgmmc_PropertySet$removeCard$lambda$_4_1);
        } else if (!var$5)
            $removed = ju_Optional_empty();
        else {
            $removed = $card;
            var$8 = $set.$hotel;
            if (var$8 !== null && ju_UUID_equals(var$8.$id, $removed.$id)) {
                $removed = $set.$hotel;
                $set.$hotel = null;
                $set = ju_Optional_of($removed);
            } else {
                var$8 = $set.$house;
                if (!(var$8 !== null && ju_UUID_equals(var$8.$id, $removed.$id)))
                    $set = ju_Optional_empty();
                else {
                    if ($set.$hotel !== null) {
                        $set = new cgme_InvalidMoveException;
                        jl_Throwable__init_($set, $rt_s(209));
                        $rt_throw($set);
                    }
                    $removed = $set.$house;
                    $set.$house = null;
                    $set = ju_Optional_of($removed);
                }
            }
            $removed = ju_Optional_map($set, new cgmmc_PropertySet$removeCard$lambda$_4_2);
        }
        if (ju_Optional_isPresent($removed))
            break;
    }
    return $removed;
},
cgmmc_PropertyCollection_attachBuilding = ($this, $building, $color) => {
    let $targetSet, var$4;
    $targetSet = ju_EnumMap_get($this.$sets, $color);
    if ($targetSet !== null) {
        if (!cgmmc_PropertySet_canAttach($targetSet, $building.$buildingType)) {
            $color = new cgme_InvalidMoveException;
            $building = jl_String_valueOf($building.$buildingType);
            $targetSet = new jl_StringBuilder;
            jl_AbstractStringBuilder__init_($targetSet);
            jl_StringBuilder_append(jl_StringBuilder_append($targetSet, $rt_s(210)), $building);
            jl_Throwable__init_($color, jl_AbstractStringBuilder_toString($targetSet));
            $rt_throw($color);
        }
        var$4 = $building.$buildingType;
        cgmmc_BuildingType_$callClinit();
        if (var$4 !== cgmmc_BuildingType_HOUSE)
            $targetSet.$hotel = $building;
        else
            $targetSet.$house = $building;
        return;
    }
    $building = new cgme_InvalidMoveException;
    $color = jl_String_valueOf($color);
    $targetSet = new jl_StringBuilder;
    jl_AbstractStringBuilder__init_($targetSet);
    jl_StringBuilder_append(jl_StringBuilder_append($targetSet, $rt_s(211)), $color);
    jl_Throwable__init_($building, jl_AbstractStringBuilder_toString($targetSet));
    $rt_throw($building);
},
cgmmc_PropertyCollection_getSets = $this => {
    return ju_List_copyOf(ju_EnumMap_values($this.$sets));
},
cgmmc_PropertyCollection_getCompletedSets = $this => {
    let var$1, var$2;
    var$1 = ju_Collection_stream(ju_EnumMap_values($this.$sets));
    var$2 = new cgmmc_PropertyCollection$getCompletedSets$lambda$_9_0;
    return jus_Stream_toList(jusi_SimpleStreamImpl_filter(var$1, var$2));
},
cgmmc_PropertyCollection_getStealableProperties = $this => {
    let $result, var$2, $set, var$4, $card;
    $result = ju_ArrayList__init_();
    var$2 = ju_EnumMap$2_iterator(ju_EnumMap_values($this.$sets));
    while (ju_EnumMap$2$1_hasNext(var$2)) {
        a: {
            $set = ju_EnumMap$2$1_next(var$2);
            if (!cgmmc_PropertySet_isComplete($set)) {
                var$4 = ju_AbstractList_iterator(cgmmc_PropertySet_getAllCards($set));
                while (true) {
                    if (!ju_AbstractList$1_hasNext(var$4))
                        break a;
                    $card = ju_AbstractList$1_next(var$4);
                    if (!(!($card instanceof cgmmc_PropertyCard) && !($card instanceof cgmmc_WildcardCard)))
                        ju_ArrayList_add($result, $card);
                }
            }
        }
    }
    return ju_List_copyOf($result);
},
cgmmc_PropertyCollection_findSet = ($this, $color) => {
    return ju_Optional_ofNullable(ju_EnumMap_get($this.$sets, $color));
},
cgmmc_PropertyCollection_releaseBuildingsFromBrokenSets = $this => {
    let $released, var$2, $set, var$4, var$5;
    $released = ju_ArrayList__init_();
    var$2 = ju_EnumMap$2_iterator(ju_EnumMap_values($this.$sets));
    while (ju_EnumMap$2$1_hasNext(var$2)) {
        $set = ju_EnumMap$2$1_next(var$2);
        if (cgmmc_PropertySet_isComplete($set))
            $set = ju_List_of();
        else {
            var$4 = ju_ArrayList__init_();
            var$5 = $set.$hotel;
            if (var$5 !== null) {
                ju_ArrayList_add(var$4, var$5);
                $set.$hotel = null;
            }
            var$5 = $set.$house;
            if (var$5 !== null) {
                ju_ArrayList_add(var$4, var$5);
                $set.$house = null;
            }
            $set = ju_List_copyOf(var$4);
        }
        ju_AbstractCollection_addAll($released, $set);
    }
    return ju_List_copyOf($released);
},
cgmmc_PropertyCollection_set = ($this, $color) => {
    let var$2, var$3, var$4;
    cgmmc_PropertyColor_$callClinit();
    if ($color !== cgmmc_PropertyColor_ANY) {
        var$2 = $this.$sets;
        ju_Objects_requireNonNull(new cgmmc_PropertyCollection$set$lambda$_16_0);
        var$3 = var$2;
        var$2 = ju_EnumMap_get(var$3, $color);
        if (var$2 === null) {
            var$4 = $color;
            var$2 = new cgmmc_PropertySet;
            var$2.$properties0 = ju_ArrayList__init_();
            var$2.$wildcards = ju_ArrayList__init_();
            if (var$4 === cgmmc_PropertyColor_ANY) {
                $color = new cgme_InvalidMoveException;
                jl_Throwable__init_($color, $rt_s(212));
                $rt_throw($color);
            }
            var$2.$color = var$4;
            ju_EnumMap_put(var$3, $color, var$2);
        }
        return var$2;
    }
    $color = new cgme_InvalidMoveException;
    jl_Throwable__init_($color, $rt_s(213));
    $rt_throw($color);
},
jl_AutoCloseable = $rt_classWithoutFields(0),
jus_BaseStream = $rt_classWithoutFields(0),
jus_Stream = $rt_classWithoutFields(0),
jus_Stream_toList = $this => {
    let var$1;
    var$1 = new ju_TemplateCollections$ImmutableArrayList;
    var$1.$list = jusi_SimpleStreamImpl_toArray0($this);
    return var$1;
},
w_BotPayment$findBestPayment$lambda$_1_0 = $rt_classWithoutFields(),
w_BotPayment$findBestPayment$lambda$_1_0_applyAsInt = (var$0, var$1) => {
    return var$1.$value;
},
cgmmc_Payable = $rt_classWithoutFields(0);
function cgmmc_Card() {
    let a = this; jl_Object.call(a);
    a.$id = null;
    a.$name0 = null;
    a.$value = 0;
    a.$type1 = null;
    a.$description = null;
}
let cgmmc_Card__init_ = ($this, $name, $value, $type, $description) => {
    let var$5, var$6;
    $this.$id = ju_UUID_randomUUID();
    if ($name !== null) {
        var$5 = 0;
        a: {
            b: {
                while (var$5 < $name.$nativeString.length) {
                    if ($name.$nativeString.charCodeAt(var$5) != 32)
                        break b;
                    var$5 = var$5 + 1 | 0;
                }
                var$6 = 1;
                break a;
            }
            var$6 = 0;
        }
        if (!var$6) {
            if ($value >= 0) {
                $this.$name0 = $name;
                $this.$value = $value;
                $this.$type1 = ju_Objects_requireNonNull($type);
                if ($description === null)
                    $description = $rt_s(3);
                $this.$description = $description;
                return;
            }
            $name = new jl_IllegalArgumentException;
            jl_Throwable__init_($name, $rt_s(214));
            $rt_throw($name);
        }
    }
    $type = new jl_IllegalArgumentException;
    jl_Throwable__init_($type, $rt_s(215));
    $rt_throw($type);
},
cgmmc_Card_getId = $this => {
    return $this.$id;
},
cgmmc_Card_getName = $this => {
    return $this.$name0;
},
cgmmc_Card_getMoneyValue = $this => {
    return $this.$value;
},
cgmmc_Card_getType = $this => {
    return $this.$type1;
},
cgmmc_Card_getDescription = $this => {
    return $this.$description;
},
cgmmc_Card_canBeBanked = $this => {
    let var$1, var$2;
    a: {
        b: {
            if ($this.$value > 0) {
                var$1 = $this.$type1;
                cgmmc_CardType_$callClinit();
                if (var$1 !== cgmmc_CardType_PROPERTY && var$1 !== cgmmc_CardType_WILDCARD)
                    break b;
            }
            var$2 = 0;
            break a;
        }
        var$2 = 1;
    }
    return var$2;
},
cgmmc_Card_canPayFromTable = $this => {
    return $this.$value <= 0 ? 0 : 1;
},
cgmmc_Card_toString = $this => {
    let var$1, var$2, var$3;
    var$1 = $this.$name0;
    var$2 = $this.$value;
    var$3 = new jl_StringBuilder;
    jl_AbstractStringBuilder__init_(var$3);
    var$1 = jl_StringBuilder_append(var$3, var$1);
    jl_AbstractStringBuilder_append(var$1, 40);
    jl_StringBuilder_append(jl_StringBuilder_append0(var$1, var$2), $rt_s(216));
    return jl_AbstractStringBuilder_toString(var$3);
},
jl_NullPointerException = $rt_classWithoutFields(jl_RuntimeException);
function jur_AbstractSet() {
    let a = this; jl_Object.call(a);
    a.$next2 = null;
    a.$isSecondPassVisited = 0;
    a.$index6 = null;
    a.$type0 = 0;
}
let jur_AbstractSet_counter = 0,
jur_AbstractSet_$callClinit = () => {
    jur_AbstractSet_$callClinit = $rt_eraseClinit(jur_AbstractSet);
    jur_AbstractSet__clinit_();
},
jur_AbstractSet__init_ = $this => {
    let var$1;
    jur_AbstractSet_$callClinit();
    var$1 = jur_AbstractSet_counter;
    jur_AbstractSet_counter = var$1 + 1 | 0;
    $this.$index6 = jl_Integer_toString(var$1);
},
jur_AbstractSet__init_0 = ($this, $n) => {
    let var$2;
    jur_AbstractSet_$callClinit();
    var$2 = jur_AbstractSet_counter;
    jur_AbstractSet_counter = var$2 + 1 | 0;
    $this.$index6 = jl_Integer_toString(var$2);
    $this.$next2 = $n;
},
jur_AbstractSet_find = ($this, $stringIndex, $testString, $matchResult) => {
    let $length;
    $length = $matchResult.$rightBound;
    while (true) {
        if ($stringIndex > $length)
            return (-1);
        if ($this.$matches($stringIndex, $testString, $matchResult) >= 0)
            break;
        $stringIndex = $stringIndex + 1 | 0;
    }
    return $stringIndex;
},
jur_AbstractSet_findBack = ($this, $stringIndex, $startSearch, $testString, $matchResult) => {
    while (true) {
        if ($startSearch < $stringIndex)
            return (-1);
        if ($this.$matches($startSearch, $testString, $matchResult) >= 0)
            break;
        $startSearch = $startSearch + (-1) | 0;
    }
    return $startSearch;
},
jur_AbstractSet_setType = ($this, $type) => {
    $this.$type0 = $type;
},
jur_AbstractSet_getType = $this => {
    return $this.$type0;
},
jur_AbstractSet_getQualifiedName = $this => {
    let var$1, var$2, var$3;
    var$1 = $this.$index6;
    var$2 = $this.$getName();
    var$3 = new jl_StringBuilder;
    jl_AbstractStringBuilder__init_(var$3);
    jl_AbstractStringBuilder_append(var$3, 60);
    var$1 = jl_StringBuilder_append(var$3, var$1);
    jl_AbstractStringBuilder_append(var$1, 58);
    jl_AbstractStringBuilder_append(jl_StringBuilder_append(var$1, var$2), 62);
    return jl_AbstractStringBuilder_toString(var$3);
},
jur_AbstractSet_toString = $this => {
    return jur_AbstractSet_getQualifiedName($this);
},
jur_AbstractSet_getNext = $this => {
    return $this.$next2;
},
jur_AbstractSet_setNext = ($this, $next) => {
    $this.$next2 = $next;
},
jur_AbstractSet_first = ($this, $set) => {
    return 1;
},
jur_AbstractSet_processBackRefReplacement = $this => {
    return null;
},
jur_AbstractSet_processSecondPass = $this => {
    let $set;
    $this.$isSecondPassVisited = 1;
    $set = $this.$next2;
    if ($set !== null) {
        if (!$set.$isSecondPassVisited) {
            $set = $set.$processBackRefReplacement();
            if ($set !== null) {
                $this.$next2.$isSecondPassVisited = 1;
                $this.$next2 = $set;
            }
            $this.$next2.$processSecondPass();
        } else if ($set instanceof jur_SingleSet && $set.$fSet.$isBackReferenced)
            $this.$next2 = $set.$next2;
    }
},
jur_AbstractSet__clinit_ = () => {
    jur_AbstractSet_counter = 1;
},
jur_MatchResult = $rt_classWithoutFields(0);
function jur_Matcher() {
    let a = this; jl_Object.call(a);
    a.$pat = null;
    a.$start1 = null;
    a.$string2 = null;
    a.$matchResult = null;
    a.$leftBound0 = 0;
    a.$rightBound0 = 0;
}
let jur_Matcher_find = ($this, $start) => {
    let $stringLength, var$3, var$4;
    $stringLength = $this.$string2.$nativeString.length;
    if ($start >= 0 && $start <= $stringLength) {
        jur_MatchResultImpl_reset($this.$matchResult, null, (-1), (-1));
        var$3 = $this.$matchResult;
        var$3.$mode0 = 1;
        var$3.$startIndex = $start;
        $stringLength = var$3.$previousMatch;
        if ($stringLength < 0)
            $stringLength = $start;
        var$3.$previousMatch = $stringLength;
        $start = $this.$start1.$find1($start, $this.$string2, var$3);
        if ($start == (-1))
            $this.$matchResult.$hitEnd = 1;
        if ($start >= 0) {
            var$3 = $this.$matchResult;
            if (var$3.$valid) {
                var$4 = var$3.$groupBounds.data;
                if (var$4[0] == (-1)) {
                    $stringLength = var$3.$startIndex;
                    var$4[0] = $stringLength;
                    var$4[1] = $stringLength;
                }
                var$3.$previousMatch = jur_MatchResultImpl_end(var$3);
                return 1;
            }
        }
        $this.$matchResult.$startIndex = (-1);
        return 0;
    }
    var$3 = new jl_IndexOutOfBoundsException;
    jl_Throwable__init_(var$3, jl_String_valueOf0($start));
    $rt_throw(var$3);
},
jur_Matcher_find0 = $this => {
    let $length, var$2, var$3;
    $length = $this.$string2.$nativeString.length;
    var$2 = $this.$matchResult;
    if (!var$2.$transparentBounds)
        $length = $this.$rightBound0;
    if (var$2.$startIndex >= 0 && var$2.$mode0 == 1) {
        var$2.$startIndex = jur_MatchResultImpl_end(var$2);
        if (jur_MatchResultImpl_end($this.$matchResult) == jur_MatchResultImpl_start($this.$matchResult, 0)) {
            var$2 = $this.$matchResult;
            var$2.$startIndex = var$2.$startIndex + 1 | 0;
        }
        var$3 = $this.$matchResult.$startIndex;
        return !(var$3 <= $length && jur_Matcher_find($this, var$3)) ? 0 : 1;
    }
    return jur_Matcher_find($this, $this.$leftBound0);
},
jur_Matcher__init_ = ($this, $pat, $cs) => {
    let var$3, var$4, var$5, var$6, var$7, var$8, var$9;
    $this.$leftBound0 = (-1);
    $this.$rightBound0 = (-1);
    $this.$pat = $pat;
    $this.$start1 = $pat.$start0;
    $this.$string2 = $cs;
    $this.$leftBound0 = 0;
    var$3 = $cs.$nativeString.length;
    $this.$rightBound0 = var$3;
    var$4 = new jur_MatchResultImpl;
    var$5 = $this.$leftBound0;
    var$6 = $pat.$globalGroupIndex;
    var$7 = $pat.$compCount + 1 | 0;
    var$8 = $pat.$consCount + 1 | 0;
    $pat = $pat.$namedGroups;
    var$4.$previousMatch = (-1);
    var$6 = var$6 + 1 | 0;
    var$4.$groupCount = var$6;
    var$4.$groupBounds = $rt_createIntArray(var$6 * 2 | 0);
    var$4.$namedGroups0 = $pat;
    var$9 = $rt_createIntArray(var$8);
    var$4.$consumers = var$9;
    ju_Arrays_fill(var$9, (-1));
    if (var$7 > 0)
        var$4.$compQuantCounters = $rt_createIntArray(var$7);
    ju_Arrays_fill(var$4.$groupBounds, (-1));
    jur_MatchResultImpl_reset(var$4, $cs, var$5, var$3);
    $this.$matchResult = var$4;
    var$4.$anchoringBounds = 1;
},
jur_Matcher__init_0 = (var_0, var_1) => {
    let var_2 = new jur_Matcher();
    jur_Matcher__init_(var_2, var_0, var_1);
    return var_2;
},
jl_StringIndexOutOfBoundsException = $rt_classWithoutFields(jl_IndexOutOfBoundsException);
function ju_Comparator$comparingInt$lambda$_14_0() {
    jl_Object.call(this);
    this.$_049 = null;
}
let ju_Comparator$comparingInt$lambda$_14_0_compare = (var$0, var$1, var$2) => {
    let var$3;
    var$3 = var$0.$_049;
    return jl_Integer_compare(var$3.$applyAsInt(var$1), var$3.$applyAsInt(var$2));
};
function jur_FSet() {
    let a = this; jur_AbstractSet.call(a);
    a.$isBackReferenced = 0;
    a.$groupIndex0 = 0;
}
let jur_FSet_posFSet = null,
jur_FSet_$callClinit = () => {
    jur_FSet_$callClinit = $rt_eraseClinit(jur_FSet);
    jur_FSet__clinit_();
},
jur_FSet__init_ = ($this, $groupIndex) => {
    jur_FSet_$callClinit();
    jur_AbstractSet__init_($this);
    $this.$groupIndex0 = $groupIndex;
},
jur_FSet__init_0 = var_0 => {
    let var_1 = new jur_FSet();
    jur_FSet__init_(var_1, var_0);
    return var_1;
},
jur_FSet_matches = ($this, $stringIndex, $testString, $matchResult) => {
    let $end, $shift;
    $end = jur_MatchResultImpl_getEnd($matchResult, $this.$groupIndex0);
    jur_MatchResultImpl_setEnd($matchResult, $this.$groupIndex0, $stringIndex);
    $shift = $this.$next2.$matches($stringIndex, $testString, $matchResult);
    if ($shift < 0)
        jur_MatchResultImpl_setEnd($matchResult, $this.$groupIndex0, $end);
    return $shift;
},
jur_FSet_getGroupIndex = $this => {
    return $this.$groupIndex0;
},
jur_FSet_getName = $this => {
    return $rt_s(217);
},
jur_FSet_hasConsumed = ($this, $mr) => {
    return 0;
},
jur_FSet__clinit_ = () => {
    let var$1;
    var$1 = new jur_FSet$PossessiveFSet;
    jur_AbstractSet__init_(var$1);
    jur_FSet_posFSet = var$1;
};
function jur_Lexer() {
    let a = this; jl_Object.call(a);
    a.$pattern0 = null;
    a.$flags0 = 0;
    a.$mode = 0;
    a.$savedMode = 0;
    a.$lookBack = 0;
    a.$ch = 0;
    a.$lookAhead = 0;
    a.$groupName = null;
    a.$patternFullLength = 0;
    a.$curST = null;
    a.$lookAheadST = null;
    a.$index = 0;
    a.$prevNW = 0;
    a.$curToc = 0;
    a.$lookAheadToc = 0;
    a.$orig = null;
}
let jur_Lexer_decompTable = null,
jur_Lexer_singleDecompTable = null,
jur_Lexer_singleDecompTableSize = 0,
jur_Lexer_setMode = ($this, $mode) => {
    if ($mode > 0 && $mode < 3)
        $this.$mode = $mode;
    if ($mode == 1) {
        $this.$lookAhead = $this.$ch;
        $this.$lookAheadST = $this.$curST;
        $this.$index = $this.$lookAheadToc;
        $this.$lookAheadToc = $this.$curToc;
        jur_Lexer_movePointer($this);
    }
},
jur_Lexer_isSpecial = $this => {
    return $this.$curST === null ? 0 : 1;
},
jur_Lexer_isNextSpecial = $this => {
    return $this.$lookAheadST === null ? 0 : 1;
},
jur_Lexer_next = $this => {
    jur_Lexer_movePointer($this);
    return $this.$lookBack;
},
jur_Lexer_nextSpecial = $this => {
    let $res;
    $res = $this.$curST;
    jur_Lexer_movePointer($this);
    return $res;
},
jur_Lexer_movePointer = $this => {
    let $reread, $nonCap, var$3, $cs, $negative, $behindOrNamed, $mod, $nameBuilder, $$je;
    $this.$lookBack = $this.$ch;
    $this.$ch = $this.$lookAhead;
    $this.$curST = $this.$lookAheadST;
    $this.$curToc = $this.$lookAheadToc;
    $this.$lookAheadToc = $this.$index;
    a: {
        while (true) {
            $reread = 0;
            $nonCap = $this.$index >= $this.$pattern0.data.length ? 0 : jur_Lexer_nextCodePoint($this);
            $this.$lookAhead = $nonCap;
            $this.$lookAheadST = null;
            if ($this.$mode == 4) {
                if ($nonCap != 92)
                    return;
                $nonCap = $this.$index;
                var$3 = $this.$pattern0.data;
                $nonCap = $nonCap >= var$3.length ? 0 : var$3[jur_Lexer_nextIndex($this)];
                $this.$lookAhead = $nonCap;
                switch ($nonCap) {
                    case 69:
                        break;
                    default:
                        $this.$lookAhead = 92;
                        $this.$index = $this.$prevNW;
                        return;
                }
                $this.$mode = $this.$savedMode;
                $this.$lookAhead = $this.$index > ($this.$pattern0.data.length - 2 | 0) ? 0 : jur_Lexer_nextCodePoint($this);
            }
            b: {
                $nonCap = $this.$lookAhead;
                if ($nonCap == 92) {
                    $nonCap = $this.$index >= ($this.$pattern0.data.length - 2 | 0) ? (-1) : jur_Lexer_nextCodePoint($this);
                    c: {
                        d: {
                            e: {
                                f: {
                                    g: {
                                        h: {
                                            i: {
                                                j: {
                                                    k: {
                                                        l: {
                                                            m: {
                                                                n: {
                                                                    o: {
                                                                        p: {
                                                                            q: {
                                                                                r: {
                                                                                    s: {
                                                                                        t: {
                                                                                            u: {
                                                                                                v: {
                                                                                                    $this.$lookAhead = $nonCap;
                                                                                                    switch ($nonCap) {
                                                                                                        case -1:
                                                                                                            $rt_throw(jur_PatternSyntaxException__init_($rt_s(3), jur_Lexer_toString($this), $this.$index));
                                                                                                        case 0:
                                                                                                        case 1:
                                                                                                        case 2:
                                                                                                        case 3:
                                                                                                        case 4:
                                                                                                        case 5:
                                                                                                        case 6:
                                                                                                        case 7:
                                                                                                        case 8:
                                                                                                        case 9:
                                                                                                        case 10:
                                                                                                        case 11:
                                                                                                        case 12:
                                                                                                        case 13:
                                                                                                        case 14:
                                                                                                        case 15:
                                                                                                        case 16:
                                                                                                        case 17:
                                                                                                        case 18:
                                                                                                        case 19:
                                                                                                        case 20:
                                                                                                        case 21:
                                                                                                        case 22:
                                                                                                        case 23:
                                                                                                        case 24:
                                                                                                        case 25:
                                                                                                        case 26:
                                                                                                        case 27:
                                                                                                        case 28:
                                                                                                        case 29:
                                                                                                        case 30:
                                                                                                        case 31:
                                                                                                        case 32:
                                                                                                        case 33:
                                                                                                        case 34:
                                                                                                        case 35:
                                                                                                        case 36:
                                                                                                        case 37:
                                                                                                        case 38:
                                                                                                        case 39:
                                                                                                        case 40:
                                                                                                        case 41:
                                                                                                        case 42:
                                                                                                        case 43:
                                                                                                        case 44:
                                                                                                        case 45:
                                                                                                        case 46:
                                                                                                        case 47:
                                                                                                        case 58:
                                                                                                        case 59:
                                                                                                        case 60:
                                                                                                        case 61:
                                                                                                        case 62:
                                                                                                        case 63:
                                                                                                        case 64:
                                                                                                        case 91:
                                                                                                        case 92:
                                                                                                        case 93:
                                                                                                        case 94:
                                                                                                        case 95:
                                                                                                        case 96:
                                                                                                        case 118:
                                                                                                            break;
                                                                                                        case 48:
                                                                                                            break v;
                                                                                                        case 49:
                                                                                                        case 50:
                                                                                                        case 51:
                                                                                                        case 52:
                                                                                                        case 53:
                                                                                                        case 54:
                                                                                                        case 55:
                                                                                                        case 56:
                                                                                                        case 57:
                                                                                                            break f;
                                                                                                        case 65:
                                                                                                            break u;
                                                                                                        case 66:
                                                                                                            break t;
                                                                                                        case 67:
                                                                                                        case 69:
                                                                                                        case 70:
                                                                                                        case 72:
                                                                                                        case 73:
                                                                                                        case 74:
                                                                                                        case 75:
                                                                                                        case 76:
                                                                                                        case 77:
                                                                                                        case 78:
                                                                                                        case 79:
                                                                                                        case 82:
                                                                                                        case 84:
                                                                                                        case 85:
                                                                                                        case 86:
                                                                                                        case 88:
                                                                                                        case 89:
                                                                                                        case 103:
                                                                                                        case 104:
                                                                                                        case 105:
                                                                                                        case 106:
                                                                                                        case 107:
                                                                                                        case 108:
                                                                                                        case 109:
                                                                                                        case 111:
                                                                                                        case 113:
                                                                                                        case 121:
                                                                                                            $rt_throw(jur_PatternSyntaxException__init_($rt_s(3), jur_Lexer_toString($this), $this.$index));
                                                                                                        case 68:
                                                                                                        case 83:
                                                                                                        case 87:
                                                                                                        case 100:
                                                                                                        case 115:
                                                                                                        case 119:
                                                                                                            break e;
                                                                                                        case 71:
                                                                                                            break s;
                                                                                                        case 80:
                                                                                                        case 112:
                                                                                                            break c;
                                                                                                        case 81:
                                                                                                            break g;
                                                                                                        case 90:
                                                                                                            break r;
                                                                                                        case 97:
                                                                                                            break q;
                                                                                                        case 98:
                                                                                                            break p;
                                                                                                        case 99:
                                                                                                            break d;
                                                                                                        case 101:
                                                                                                            break o;
                                                                                                        case 102:
                                                                                                            break n;
                                                                                                        case 110:
                                                                                                            break m;
                                                                                                        case 114:
                                                                                                            break l;
                                                                                                        case 116:
                                                                                                            break k;
                                                                                                        case 117:
                                                                                                            break i;
                                                                                                        case 120:
                                                                                                            break h;
                                                                                                        case 122:
                                                                                                            break j;
                                                                                                        default:
                                                                                                    }
                                                                                                    break b;
                                                                                                }
                                                                                                $this.$lookAhead = jur_Lexer_readOctals($this);
                                                                                                break b;
                                                                                            }
                                                                                            $this.$lookAhead = (-2147483583);
                                                                                            break b;
                                                                                        }
                                                                                        $this.$lookAhead = (-2147483582);
                                                                                        break b;
                                                                                    }
                                                                                    $this.$lookAhead = (-2147483577);
                                                                                    break b;
                                                                                }
                                                                                $this.$lookAhead = (-2147483558);
                                                                                break b;
                                                                            }
                                                                            $this.$lookAhead = 7;
                                                                            break b;
                                                                        }
                                                                        $this.$lookAhead = (-2147483550);
                                                                        break b;
                                                                    }
                                                                    $this.$lookAhead = 27;
                                                                    break b;
                                                                }
                                                                $this.$lookAhead = 12;
                                                                break b;
                                                            }
                                                            $this.$lookAhead = 10;
                                                            break b;
                                                        }
                                                        $this.$lookAhead = 13;
                                                        break b;
                                                    }
                                                    $this.$lookAhead = 9;
                                                    break b;
                                                }
                                                $this.$lookAhead = (-2147483526);
                                                break b;
                                            }
                                            $this.$lookAhead = jur_Lexer_readHex($this, 4);
                                            break b;
                                        }
                                        $this.$lookAhead = jur_Lexer_readHex($this, 2);
                                        break b;
                                    }
                                    $this.$savedMode = $this.$mode;
                                    $this.$mode = 4;
                                    $reread = 1;
                                    break b;
                                }
                                if ($this.$mode != 1)
                                    break b;
                                $this.$lookAhead = (-2147483648) | $nonCap;
                                break b;
                            }
                            $this.$lookAheadST = jur_AbstractCharClass_getPredefinedClass(jl_String__init_0($this.$pattern0, $this.$prevNW, 1), 0);
                            $this.$lookAhead = 0;
                            break b;
                        }
                        $nonCap = $this.$index;
                        var$3 = $this.$pattern0.data;
                        if ($nonCap >= (var$3.length - 2 | 0))
                            $rt_throw(jur_PatternSyntaxException__init_($rt_s(3), jur_Lexer_toString($this), $this.$index));
                        $this.$lookAhead = var$3[jur_Lexer_nextIndex($this)] & 31;
                        break b;
                    }
                    $cs = jur_Lexer_parseCharClassName($this);
                    $negative = 0;
                    if ($this.$lookAhead == 80)
                        $negative = 1;
                    try {
                        $this.$lookAheadST = jur_AbstractCharClass_getPredefinedClass($cs, $negative);
                    } catch ($$e) {
                        $$je = $rt_wrapException($$e);
                        if ($$je instanceof ju_MissingResourceException) {
                            $rt_throw(jur_PatternSyntaxException__init_($rt_s(3), jur_Lexer_toString($this), $this.$index));
                        } else {
                            throw $$e;
                        }
                    }
                    $this.$lookAhead = 0;
                } else {
                    $behindOrNamed = $this.$mode;
                    if ($behindOrNamed == 1) {
                        w: {
                            x: {
                                y: {
                                    z: {
                                        ba: {
                                            bb: {
                                                bc: {
                                                    bd: {
                                                        be: {
                                                            bf: {
                                                                switch ($nonCap) {
                                                                    case 36:
                                                                        break bf;
                                                                    case 40:
                                                                        break w;
                                                                    case 41:
                                                                        break be;
                                                                    case 42:
                                                                    case 43:
                                                                    case 63:
                                                                        break x;
                                                                    case 46:
                                                                        break bd;
                                                                    case 91:
                                                                        break z;
                                                                    case 93:
                                                                        break y;
                                                                    case 94:
                                                                        break bc;
                                                                    case 123:
                                                                        break bb;
                                                                    case 124:
                                                                        break ba;
                                                                    default:
                                                                }
                                                                break b;
                                                            }
                                                            $this.$lookAhead = (-536870876);
                                                            break b;
                                                        }
                                                        $this.$lookAhead = (-536870871);
                                                        break b;
                                                    }
                                                    $this.$lookAhead = (-536870866);
                                                    break b;
                                                }
                                                $this.$lookAhead = (-536870818);
                                                break b;
                                            }
                                            $this.$lookAheadST = jur_Lexer_processQuantifier($this, $nonCap);
                                            break b;
                                        }
                                        $this.$lookAhead = (-536870788);
                                        break b;
                                    }
                                    $this.$lookAhead = (-536870821);
                                    jur_Lexer_setMode($this, 2);
                                    break b;
                                }
                                if ($behindOrNamed != 2)
                                    break b;
                                $this.$lookAhead = (-536870819);
                                break b;
                            }
                            $behindOrNamed = $this.$index;
                            var$3 = $this.$pattern0.data;
                            $mod = $behindOrNamed >= var$3.length ? 42 : var$3[$behindOrNamed];
                            bg: {
                                bh: {
                                    switch ($mod) {
                                        case 43:
                                            break bh;
                                        case 63:
                                            break bg;
                                        default:
                                    }
                                    $this.$lookAhead = $nonCap | (-536870912);
                                    break b;
                                }
                                $this.$lookAhead = $nonCap | (-2147483648);
                                jur_Lexer_nextIndex($this);
                                break b;
                            }
                            $this.$lookAhead = $nonCap | (-1073741824);
                            jur_Lexer_nextIndex($this);
                            break b;
                        }
                        if ($this.$pattern0.data[$this.$index] != 63)
                            $this.$lookAhead = (-2147483608);
                        else {
                            jur_Lexer_nextIndex($this);
                            $nonCap = $this.$pattern0.data[$this.$index];
                            $behindOrNamed = 0;
                            $nameBuilder = null;
                            while (true) {
                                bi: {
                                    if (!$behindOrNamed) {
                                        bj: {
                                            bk: {
                                                bl: {
                                                    bm: {
                                                        switch ($nonCap) {
                                                            case 33:
                                                                break;
                                                            case 60:
                                                                break bk;
                                                            case 61:
                                                                break bm;
                                                            case 62:
                                                                break bl;
                                                            default:
                                                                break bj;
                                                        }
                                                        $this.$lookAhead = (-268435416);
                                                        jur_Lexer_nextIndex($this);
                                                        break bi;
                                                    }
                                                    $this.$lookAhead = (-536870872);
                                                    jur_Lexer_nextIndex($this);
                                                    break bi;
                                                }
                                                $this.$lookAhead = (-33554392);
                                                jur_Lexer_nextIndex($this);
                                                break bi;
                                            }
                                            jur_Lexer_nextIndex($this);
                                            $nonCap = $this.$pattern0.data[$this.$index];
                                            $behindOrNamed = 1;
                                            break bi;
                                        }
                                        $mod = jur_Lexer_readFlags($this);
                                        $this.$lookAhead = $mod;
                                        if ($mod < 256) {
                                            $this.$flags0 = $mod;
                                            $mod = $mod << 16;
                                            $this.$lookAhead = $mod;
                                            $this.$lookAhead = (-1073741784) | $mod;
                                        } else {
                                            $mod = $mod & 255;
                                            $this.$lookAhead = $mod;
                                            $this.$flags0 = $mod;
                                            $mod = $mod << 16;
                                            $this.$lookAhead = $mod;
                                            $this.$lookAhead = (-16777176) | $mod;
                                        }
                                    } else {
                                        bn: {
                                            bo: {
                                                bp: {
                                                    switch ($nonCap) {
                                                        case 33:
                                                            break;
                                                        case 61:
                                                            break bp;
                                                        case 62:
                                                            break bo;
                                                        default:
                                                            break bn;
                                                    }
                                                    $behindOrNamed = 0;
                                                    $this.$lookAhead = (-67108824);
                                                    jur_Lexer_nextIndex($this);
                                                    break bi;
                                                }
                                                $behindOrNamed = 0;
                                                $this.$lookAhead = (-134217688);
                                                jur_Lexer_nextIndex($this);
                                                break bi;
                                            }
                                            if ($nameBuilder === null)
                                                $rt_throw(jur_PatternSyntaxException__init_($rt_s(3), jur_Lexer_toString($this), $this.$index));
                                            $this.$groupName = jl_StringBuilder_toString($nameBuilder);
                                            jur_Lexer_nextIndex($this);
                                            $nameBuilder = null;
                                            $behindOrNamed = 0;
                                            $this.$lookAhead = (-2130706392);
                                            break bi;
                                        }
                                        bq: {
                                            if (!($nonCap >= 65 && $nonCap <= 90)) {
                                                if ($nonCap < 97)
                                                    break bq;
                                                if ($nonCap > 122)
                                                    break bq;
                                            }
                                            if ($nameBuilder === null)
                                                $nameBuilder = jl_StringBuilder__init_();
                                            jl_StringBuilder_append2($nameBuilder, $nonCap);
                                            jur_Lexer_nextIndex($this);
                                            $nonCap = $this.$pattern0.data[$this.$index];
                                            break bi;
                                        }
                                        if ($nonCap < 48)
                                            break a;
                                        if ($nonCap > 57)
                                            break a;
                                        if ($nameBuilder === null)
                                            $rt_throw(jur_PatternSyntaxException__init_($rt_s(218), jur_Lexer_toString($this), $this.$index));
                                        jl_StringBuilder_append2($nameBuilder, $nonCap);
                                        jur_Lexer_nextIndex($this);
                                        $nonCap = $this.$pattern0.data[$this.$index];
                                    }
                                }
                                if (!$behindOrNamed)
                                    break;
                            }
                        }
                    } else if ($behindOrNamed == 2) {
                        br: {
                            bs: {
                                bt: {
                                    bu: {
                                        bv: {
                                            switch ($nonCap) {
                                                case 38:
                                                    break bv;
                                                case 45:
                                                    break bu;
                                                case 91:
                                                    break bt;
                                                case 93:
                                                    break bs;
                                                case 94:
                                                    break br;
                                                default:
                                            }
                                            break b;
                                        }
                                        $this.$lookAhead = (-536870874);
                                        break b;
                                    }
                                    $this.$lookAhead = (-536870867);
                                    break b;
                                }
                                $this.$lookAhead = (-536870821);
                                break b;
                            }
                            $this.$lookAhead = (-536870819);
                            break b;
                        }
                        $this.$lookAhead = (-536870818);
                    }
                }
            }
            if ($reread)
                continue;
            else
                break;
        }
        return;
    }
    $rt_throw(jur_PatternSyntaxException__init_($rt_s(3), jur_Lexer_toString($this), $this.$index));
},
jur_Lexer_parseCharClassName = $this => {
    let $sb, $ch, var$3, var$4, var$5, $res;
    a: {
        $sb = new jl_StringBuilder;
        jl_AbstractStringBuilder__init_0($sb, 10);
        $ch = $this.$index;
        var$3 = $this.$pattern0;
        var$4 = var$3.data;
        if ($ch < (var$4.length - 2 | 0)) {
            if (var$4[$ch] == 123) {
                jur_Lexer_nextIndex($this);
                $ch = 0;
                b: {
                    c: {
                        while (true) {
                            var$5 = $this.$index;
                            var$3 = $this.$pattern0.data;
                            if (var$5 >= (var$3.length - 2 | 0))
                                break;
                            $ch = var$3[jur_Lexer_nextIndex($this)];
                            if ($ch == 125)
                                break c;
                            jl_AbstractStringBuilder_append($sb, $ch);
                        }
                        break b;
                    }
                }
                if ($ch == 125)
                    break a;
                $rt_throw(jur_PatternSyntaxException__init_($rt_s(3), $this.$orig, $this.$index));
            }
            $sb = jl_String__init_0(var$3, jur_Lexer_nextIndex($this), 1);
            $res = new jl_StringBuilder;
            jl_AbstractStringBuilder__init_($res);
            jl_StringBuilder_append(jl_StringBuilder_append($res, $rt_s(219)), $sb);
            return jl_AbstractStringBuilder_toString($res);
        }
    }
    if ($sb.$length0) {
        $res = jl_AbstractStringBuilder_toString($sb);
        if ($res.$nativeString.length != 1) {
            d: {
                e: {
                    if ($res.$nativeString.length > 3) {
                        if (jl_String_startsWith0($res, $rt_s(219)))
                            break e;
                        if (jl_String_startsWith0($res, $rt_s(220)))
                            break e;
                    }
                    break d;
                }
                $res = jl_String_substring0($res, 2);
            }
            return $res;
        }
        $sb = new jl_StringBuilder;
        jl_AbstractStringBuilder__init_($sb);
        jl_StringBuilder_append(jl_StringBuilder_append($sb, $rt_s(219)), $res);
        return jl_AbstractStringBuilder_toString($sb);
    }
    $rt_throw(jur_PatternSyntaxException__init_($rt_s(3), $this.$orig, $this.$index));
},
jur_Lexer_processQuantifier = ($this, $ch) => {
    let $sb, $min, $max, $mod, var$6, $$je;
    $sb = new jl_StringBuilder;
    jl_AbstractStringBuilder__init_0($sb, 4);
    $min = (-1);
    $max = 2147483647;
    a: {
        b: {
            while (true) {
                $mod = $this.$index;
                var$6 = $this.$pattern0.data;
                if ($mod >= var$6.length)
                    break a;
                $ch = var$6[jur_Lexer_nextIndex($this)];
                if ($ch == 125)
                    break b;
                if (!($ch == 44 && $min < 0)) {
                    jl_AbstractStringBuilder_append($sb, $ch & 65535);
                    continue;
                }
                try {
                    $min = jl_Integer_parseInt(jl_StringBuilder_toString($sb), 10);
                    jl_StringBuilder_delete($sb, 0, jl_StringBuilder_length($sb));
                    continue;
                } catch ($$e) {
                    $$je = $rt_wrapException($$e);
                    if ($$je instanceof jl_NumberFormatException) {
                        break;
                    } else {
                        throw $$e;
                    }
                }
            }
            $rt_throw(jur_PatternSyntaxException__init_($rt_s(3), $this.$orig, $this.$index));
        }
    }
    if ($ch == 125) {
        c: {
            if ($sb.$length0 <= 0) {
                if ($min >= 0)
                    break c;
                $rt_throw(jur_PatternSyntaxException__init_($rt_s(3), $this.$orig, $this.$index));
            }
            d: {
                e: {
                    try {
                        $max = jl_Integer_parseInt(jl_StringBuilder_toString($sb), 10);
                        if ($min >= 0)
                            break d;
                        $min = $max;
                        break d;
                    } catch ($$e) {
                        $$je = $rt_wrapException($$e);
                        if ($$je instanceof jl_NumberFormatException) {
                            break e;
                        } else {
                            throw $$e;
                        }
                    }
                }
                $rt_throw(jur_PatternSyntaxException__init_($rt_s(3), $this.$orig, $this.$index));
            }
        }
        if (($min | $max | ($max - $min | 0)) >= 0) {
            $ch = $this.$index;
            var$6 = $this.$pattern0.data;
            $mod = $ch >= var$6.length ? 42 : var$6[$ch];
            f: {
                g: {
                    h: {
                        switch ($mod) {
                            case 43:
                                break h;
                            case 63:
                                break g;
                            default:
                        }
                        $this.$lookAhead = (-536870789);
                        break f;
                    }
                    $this.$lookAhead = (-2147483525);
                    jur_Lexer_nextIndex($this);
                    break f;
                }
                $this.$lookAhead = (-1073741701);
                jur_Lexer_nextIndex($this);
            }
            $sb = new jur_Quantifier;
            $sb.$min0 = $min;
            $sb.$max1 = $max;
            return $sb;
        }
        $rt_throw(jur_PatternSyntaxException__init_($rt_s(3), $this.$orig, $this.$index));
    }
    $rt_throw(jur_PatternSyntaxException__init_($rt_s(3), $this.$orig, $this.$index));
},
jur_Lexer_toString = $this => {
    return $this.$orig;
},
jur_Lexer_isEmpty = $this => {
    return !(!$this.$ch && !$this.$lookAhead && $this.$index == $this.$patternFullLength && !jur_Lexer_isSpecial($this)) ? 0 : 1;
},
jur_Lexer_isLetter0 = $ch => {
    return $ch < 0 ? 0 : 1;
},
jur_Lexer_isLetter = $this => {
    return !(!jur_Lexer_isEmpty($this) && !jur_Lexer_isSpecial($this) && jur_Lexer_isLetter0($this.$ch)) ? 0 : 1;
},
jur_Lexer_isHighSurrogate0 = $this => {
    let var$1;
    var$1 = $this.$ch;
    return !(var$1 <= 56319 && var$1 >= 55296) ? 0 : 1;
},
jur_Lexer_isLowSurrogate0 = $this => {
    let var$1;
    var$1 = $this.$ch;
    return !(var$1 <= 57343 && var$1 >= 56320) ? 0 : 1;
},
jur_Lexer_isHighSurrogate = $ch => {
    return !($ch <= 56319 && $ch >= 55296) ? 0 : 1;
},
jur_Lexer_isLowSurrogate = $ch => {
    return !($ch <= 57343 && $ch >= 56320) ? 0 : 1;
},
jur_Lexer_readHex = ($this, $max) => {
    let $st, $length, $i, var$5, $$je;
    $st = new jl_StringBuilder;
    jl_AbstractStringBuilder__init_0($st, $max);
    $length = $this.$pattern0.data.length - 2 | 0;
    $i = 0;
    while (true) {
        var$5 = $rt_compare($i, $max);
        if (var$5 >= 0)
            break;
        if ($this.$index >= $length)
            break;
        jl_AbstractStringBuilder_append($st, $this.$pattern0.data[jur_Lexer_nextIndex($this)]);
        $i = $i + 1 | 0;
    }
    a: {
        if (!var$5) {
            try {
                $max = jl_Integer_parseInt(jl_StringBuilder_toString($st), 16);
            } catch ($$e) {
                $$je = $rt_wrapException($$e);
                if ($$je instanceof jl_NumberFormatException) {
                    break a;
                } else {
                    throw $$e;
                }
            }
            return $max;
        }
    }
    $rt_throw(jur_PatternSyntaxException__init_($rt_s(3), $this.$orig, $this.$index));
},
jur_Lexer_readOctals = $this => {
    let $max, $i, var$3, $length, $res, var$6;
    $max = 3;
    $i = 1;
    var$3 = $this.$pattern0.data;
    $length = var$3.length - 2 | 0;
    $res = jl_Character_digit(var$3[$this.$index], 8);
    switch ($res) {
        case -1:
            break;
        default:
            if ($res > 3)
                $max = 2;
            jur_Lexer_nextIndex($this);
            a: {
                while (true) {
                    if ($i >= $max)
                        break a;
                    var$6 = $this.$index;
                    if (var$6 >= $length)
                        break a;
                    var$6 = jl_Character_digit($this.$pattern0.data[var$6], 8);
                    if (var$6 < 0)
                        break;
                    $res = ($res * 8 | 0) + var$6 | 0;
                    jur_Lexer_nextIndex($this);
                    $i = $i + 1 | 0;
                }
            }
            return $res;
    }
    $rt_throw(jur_PatternSyntaxException__init_($rt_s(3), $this.$orig, $this.$index));
},
jur_Lexer_readFlags = $this => {
    let $pos, $res, var$3, var$4;
    $pos = 1;
    $res = $this.$flags0;
    a: while (true) {
        var$3 = $this.$index;
        var$4 = $this.$pattern0.data;
        if (var$3 >= var$4.length)
            $rt_throw(jur_PatternSyntaxException__init_($rt_s(3), $this.$orig, var$3));
        b: {
            c: {
                d: {
                    e: {
                        f: {
                            g: {
                                h: {
                                    i: {
                                        switch (var$4[var$3]) {
                                            case 41:
                                                jur_Lexer_nextIndex($this);
                                                return $res | 256;
                                            case 45:
                                                break i;
                                            case 58:
                                                break a;
                                            case 100:
                                                break h;
                                            case 105:
                                                break g;
                                            case 109:
                                                break f;
                                            case 115:
                                                break e;
                                            case 117:
                                                break d;
                                            case 120:
                                                break c;
                                            default:
                                        }
                                        break b;
                                    }
                                    if (!$pos)
                                        $rt_throw(jur_PatternSyntaxException__init_($rt_s(3), $this.$orig, var$3));
                                    $pos = 0;
                                    break b;
                                }
                                $res = $pos ? $res | 1 : ($res ^ 1) & $res;
                                break b;
                            }
                            $res = $pos ? $res | 2 : ($res ^ 2) & $res;
                            break b;
                        }
                        $res = $pos ? $res | 8 : ($res ^ 8) & $res;
                        break b;
                    }
                    $res = $pos ? $res | 32 : ($res ^ 32) & $res;
                    break b;
                }
                $res = $pos ? $res | 64 : ($res ^ 64) & $res;
                break b;
            }
            $res = $pos ? $res | 4 : ($res ^ 4) & $res;
        }
        jur_Lexer_nextIndex($this);
    }
    jur_Lexer_nextIndex($this);
    return $res;
},
jur_Lexer_nextIndex = $this => {
    let var$1, var$2, var$3, var$4, var$5;
    var$1 = $this.$index;
    $this.$prevNW = var$1;
    if (!($this.$flags0 & 4))
        $this.$index = var$1 + 1 | 0;
    else {
        var$2 = $this.$pattern0.data.length - 2 | 0;
        $this.$index = var$1 + 1 | 0;
        a: while (true) {
            var$3 = $this.$index;
            if (var$3 < var$2) {
                var$3 = $this.$pattern0.data[var$3];
                jl_Character_$callClinit();
                if (jl_Character_isWhitespace(var$3)) {
                    $this.$index = $this.$index + 1 | 0;
                    continue;
                }
            }
            var$3 = $this.$index;
            if (var$3 >= var$2)
                break;
            var$4 = $this.$pattern0.data;
            if (var$4[var$3] != 35)
                break;
            $this.$index = var$3 + 1 | 0;
            while (true) {
                var$5 = $this.$index;
                if (var$5 >= var$2)
                    continue a;
                var$1 = var$4[var$5];
                if (!(var$1 != 10 && var$1 != 13 && var$1 != 133 && (var$1 | 1) != 8233) ? 1 : 0)
                    continue a;
                $this.$index = var$5 + 1 | 0;
            }
        }
    }
    return $this.$prevNW;
},
jur_Lexer_getDecomposition = $ch => {
    return jur_Lexer_decompTable.$get3($ch);
},
jur_Lexer_nextCodePoint = $this => {
    let $high, $lowExpectedIndex, var$3, $low;
    $high = $this.$pattern0.data[jur_Lexer_nextIndex($this)];
    if (jl_Character_isHighSurrogate($high)) {
        $lowExpectedIndex = $this.$prevNW + 1 | 0;
        var$3 = $this.$pattern0.data;
        if ($lowExpectedIndex < var$3.length) {
            $low = var$3[$lowExpectedIndex];
            if (jl_Character_isLowSurrogate($low)) {
                jur_Lexer_nextIndex($this);
                return jl_Character_toCodePoint($high, $low);
            }
        }
    }
    return $high;
},
jur_Lexer_getIndex = $this => {
    return $this.$curToc;
};
function jur_PatternSyntaxException() {
    let a = this; jl_IllegalArgumentException.call(a);
    a.$desc = null;
    a.$pattern1 = null;
    a.$index3 = 0;
}
let jur_PatternSyntaxException__init_0 = ($this, $description, $pattern, $index) => {
    jl_Throwable__init_0($this);
    $this.$index3 = (-1);
    $this.$desc = $description;
    $this.$pattern1 = $pattern;
    $this.$index3 = $index;
},
jur_PatternSyntaxException__init_ = (var_0, var_1, var_2) => {
    let var_3 = new jur_PatternSyntaxException();
    jur_PatternSyntaxException__init_0(var_3, var_0, var_1, var_2);
    return var_3;
},
jur_PatternSyntaxException_getMessage = $this => {
    let $filler, var$2, $temp, var$4, var$5, var$6, var$7, var$8, var$9, var$10;
    $filler = $rt_s(3);
    var$2 = $this.$index3;
    if (var$2 >= 1) {
        $temp = $rt_createCharArray(var$2);
        var$4 = $temp.data;
        var$2 = 0;
        var$5 = var$4.length;
        if (var$2 <= var$5) {
            while (var$2 < var$5) {
                var$6 = var$2 + 1 | 0;
                var$4[var$2] = 32;
                var$2 = var$6;
            }
            $filler = jl_String__init_($temp);
        } else {
            $filler = new jl_IllegalArgumentException;
            jl_Throwable__init_0($filler);
            $rt_throw($filler);
        }
    }
    var$7 = $this.$desc;
    var$8 = $this.$pattern1;
    if (!(var$8 !== null && var$8.$nativeString.length))
        $filler = $rt_s(3);
    else {
        var$9 = $this.$index3;
        var$8 = $this.$pattern1;
        var$10 = new jl_StringBuilder;
        jl_AbstractStringBuilder__init_(var$10);
        jl_StringBuilder_append(jl_StringBuilder_append(jl_StringBuilder_append(jl_StringBuilder_append(jl_StringBuilder_append0(var$10, var$9), $rt_s(92)), var$8), $rt_s(92)), $filler);
        $filler = jl_AbstractStringBuilder_toString(var$10);
    }
    var$8 = new jl_StringBuilder;
    jl_AbstractStringBuilder__init_(var$8);
    jl_StringBuilder_append(jl_StringBuilder_append(var$8, var$7), $filler);
    return jl_AbstractStringBuilder_toString(var$8);
};
function jur_MatchResultImpl() {
    let a = this; jl_Object.call(a);
    a.$groupBounds = null;
    a.$consumers = null;
    a.$compQuantCounters = null;
    a.$string3 = null;
    a.$groupCount = 0;
    a.$valid = 0;
    a.$leftBound = 0;
    a.$rightBound = 0;
    a.$startIndex = 0;
    a.$transparentBounds = 0;
    a.$anchoringBounds = 0;
    a.$hitEnd = 0;
    a.$requireEnd = 0;
    a.$previousMatch = 0;
    a.$mode0 = 0;
    a.$namedGroups0 = null;
}
let jur_MatchResultImpl_setConsumed = ($this, $counter, $value) => {
    $this.$consumers.data[$counter] = $value;
},
jur_MatchResultImpl_getConsumed = ($this, $counter) => {
    return $this.$consumers.data[$counter];
},
jur_MatchResultImpl_end = $this => {
    return jur_MatchResultImpl_end0($this, 0);
},
jur_MatchResultImpl_end0 = ($this, $group) => {
    jur_MatchResultImpl_checkGroup($this, $group);
    return $this.$groupBounds.data[($group * 2 | 0) + 1 | 0];
},
jur_MatchResultImpl_setStart = ($this, $group, $offset) => {
    $this.$groupBounds.data[$group * 2 | 0] = $offset;
},
jur_MatchResultImpl_setEnd = ($this, $group, $offset) => {
    $this.$groupBounds.data[($group * 2 | 0) + 1 | 0] = $offset;
},
jur_MatchResultImpl_getStart = ($this, $group) => {
    return $this.$groupBounds.data[$group * 2 | 0];
},
jur_MatchResultImpl_getEnd = ($this, $group) => {
    return $this.$groupBounds.data[($group * 2 | 0) + 1 | 0];
},
jur_MatchResultImpl_start = ($this, $group) => {
    jur_MatchResultImpl_checkGroup($this, $group);
    return $this.$groupBounds.data[$group * 2 | 0];
},
jur_MatchResultImpl_getEnterCounter = ($this, $setCounter) => {
    return $this.$compQuantCounters.data[$setCounter];
},
jur_MatchResultImpl_setEnterCounter = ($this, $setCounter, $value) => {
    $this.$compQuantCounters.data[$setCounter] = $value;
},
jur_MatchResultImpl_checkGroup = ($this, $group) => {
    let var$2;
    if ($this.$valid) {
        if ($group >= 0 && $group < $this.$groupCount)
            return;
        var$2 = new jl_IndexOutOfBoundsException;
        jl_Throwable__init_(var$2, jl_String_valueOf0($group));
        $rt_throw(var$2);
    }
    var$2 = new jl_IllegalStateException;
    jl_Throwable__init_0(var$2);
    $rt_throw(var$2);
},
jur_MatchResultImpl_reset = ($this, $newSequence, $leftBound, $rightBound) => {
    $this.$valid = 0;
    $this.$mode0 = 2;
    ju_Arrays_fill($this.$groupBounds, (-1));
    ju_Arrays_fill($this.$consumers, (-1));
    if ($newSequence !== null)
        $this.$string3 = $newSequence;
    if ($leftBound >= 0) {
        $this.$leftBound = $leftBound;
        $this.$rightBound = $rightBound;
    }
    $this.$startIndex = $this.$leftBound;
},
ju_EnumSet = $rt_classWithoutFields(ju_AbstractSet),
ju_EnumSet_noneOf = $elementType => {
    let var$2, var$3, var$4;
    var$2 = new ju_GenericEnumSet;
    var$2.$cls = $elementType;
    var$3 = ju_GenericEnumSet_getConstants($elementType);
    if (var$3 !== null) {
        var$4 = var$3.data.length;
        var$2.$bits0 = $rt_createIntArray(!var$4 ? 0 : ((var$4 - 1 | 0) / 32 | 0) + 1 | 0);
        return var$2;
    }
    $elementType = new jl_ClassCastException;
    jl_Throwable__init_0($elementType);
    $rt_throw($elementType);
},
ju_EnumSet_copyOf = $c => {
    let $iter, $first, $result, var$5, var$6;
    if (!($c instanceof ju_EnumSet)) {
        $iter = $c.$iterator();
        if ($iter.$hasNext()) {
            $first = $iter.$next();
            $result = ju_EnumSet_noneOf(jl_Enum_getDeclaringClass($first));
            var$5 = $result;
            ju_GenericEnumSet_add(var$5, $first);
            while ($iter.$hasNext()) {
                ju_GenericEnumSet_add(var$5, $iter.$next());
            }
            return $result;
        }
        $c = new jl_IllegalArgumentException;
        jl_Throwable__init_0($c);
        $rt_throw($c);
    }
    $c = $c;
    $iter = new ju_GenericEnumSet;
    $first = $c.$cls;
    var$6 = $c.$bits0.$clone0();
    $iter.$cls = $first;
    $iter.$bits0 = var$6;
    return $iter;
},
ju_EnumSet_of = ($e1, $e2) => {
    let $result;
    $result = ju_EnumSet_noneOf(jl_Enum_getDeclaringClass($e1));
    ju_EnumSet_fastAdd($result, $e1);
    ju_EnumSet_fastAdd($result, $e2);
    return $result;
},
ju_EnumSet_fastAdd = ($this, $t) => {
    let var$2, var$3, var$4;
    var$2 = $t.$ordinal;
    $t = $this;
    var$3 = var$2 / 32 | 0;
    var$4 = $t.$bits0.data;
    var$4[var$3] = var$4[var$3] | 1 << (var$2 % 32 | 0);
};
function ju_GenericEnumSet() {
    let a = this; ju_EnumSet.call(a);
    a.$cls = null;
    a.$bits0 = null;
}
let ju_GenericEnumSet_getConstants = $cls => {
    return jl_Class_getEnumConstantsFast($cls);
},
ju_GenericEnumSet_iterator = $this => {
    let var$1;
    var$1 = new ju_GenericEnumSet$1;
    var$1.$this$0 = $this;
    var$1.$index0 = ju_GenericEnumSet$1_find(var$1);
    var$1.$indexToRemove = (-1);
    return var$1;
},
ju_GenericEnumSet_size = $this => {
    let $result, var$2, var$3, var$4, $bit;
    $result = 0;
    var$2 = $this.$bits0.data;
    var$3 = var$2.length;
    var$4 = 0;
    while (var$4 < var$3) {
        $bit = var$2[var$4];
        jl_Integer_$callClinit();
        $bit = (($bit & (-1431655766)) >>> 1 | 0) + ($bit & 1431655765) | 0;
        $bit = (($bit & (-858993460)) >>> 2 | 0) + ($bit & 858993459) | 0;
        $bit = (($bit & 1886417008) >>> 4 | 0) + ($bit & 117901063) | 0;
        $bit = (($bit & 251662080) >>> 8 | 0) + ($bit & 983055) | 0;
        $result = $result + ((($bit & 2031616) >>> 16 | 0) + ($bit & 31) | 0) | 0;
        var$4 = var$4 + 1 | 0;
    }
    return $result;
},
ju_GenericEnumSet_contains = ($this, $o) => {
    let $n, $bitNumber, $bit;
    if (jl_Class_isInstance($this.$cls, $o)) {
        $n = $o.$ordinal;
        $bitNumber = $n / 32 | 0;
        $bit = 1 << ($n % 32 | 0);
        return !($this.$bits0.data[$bitNumber] & $bit) ? 0 : 1;
    }
    return 0;
},
ju_GenericEnumSet_add = ($this, var$1) => {
    let var$2, var$3, var$4, var$5, var$6;
    var$1 = var$1;
    var$2 = jl_Object_getClass(var$1);
    if (var$2 !== $this.$cls && jl_Class_getSuperclass(var$2) !== $this.$cls) {
        var$1 = new jl_ClassCastException;
        jl_Throwable__init_0(var$1);
        $rt_throw(var$1);
    }
    var$3 = var$1.$ordinal;
    var$4 = var$3 / 32 | 0;
    var$5 = 1 << (var$3 % 32 | 0);
    var$6 = $this.$bits0.data;
    if (var$6[var$4] & var$5)
        var$5 = 0;
    else {
        var$6[var$4] = var$6[var$4] | var$5;
        var$5 = 1;
    }
    return var$5;
},
jl_System = $rt_classWithoutFields(),
jl_System_arraycopy = ($src, $srcPos, $dest, $destPos, $length) => {
    let $srcType, $targetType, $srcArray, $i, var$10, var$11, var$12;
    if ($src !== null && $dest !== null) {
        if ($srcPos >= 0 && $destPos >= 0 && $length >= 0 && ($srcPos + $length | 0) <= jlr_Array_getLength($src) && ($destPos + $length | 0) <= jlr_Array_getLength($dest)) {
            a: {
                b: {
                    if ($src !== $dest) {
                        $srcType = jl_Class_getComponentType(jl_Object_getClass($src));
                        $targetType = jl_Class_getComponentType(jl_Object_getClass($dest));
                        if ($srcType !== null && $targetType !== null) {
                            if ($srcType === $targetType)
                                break b;
                            if (!jl_Class_isPrimitive($srcType) && !jl_Class_isPrimitive($targetType)) {
                                $srcArray = $src;
                                $i = 0;
                                var$10 = $srcPos;
                                while ($i < $length) {
                                    var$11 = $srcArray.data;
                                    var$12 = var$10 + 1 | 0;
                                    if (!jl_Class_isInstance($targetType, var$11[var$10])) {
                                        jl_System_doArrayCopy($src, $srcPos, $dest, $destPos, $i);
                                        $src = new jl_ArrayStoreException;
                                        jl_Throwable__init_0($src);
                                        $rt_throw($src);
                                    }
                                    $i = $i + 1 | 0;
                                    var$10 = var$12;
                                }
                                jl_System_doArrayCopy($src, $srcPos, $dest, $destPos, $length);
                                return;
                            }
                            if (!jl_Class_isPrimitive($srcType))
                                break a;
                            if (jl_Class_isPrimitive($targetType))
                                break b;
                            else
                                break a;
                        }
                        $src = new jl_ArrayStoreException;
                        jl_Throwable__init_0($src);
                        $rt_throw($src);
                    }
                }
                jl_System_doArrayCopy($src, $srcPos, $dest, $destPos, $length);
                return;
            }
            $src = new jl_ArrayStoreException;
            jl_Throwable__init_0($src);
            $rt_throw($src);
        }
        $src = new jl_IndexOutOfBoundsException;
        jl_Throwable__init_0($src);
        $rt_throw($src);
    }
    $dest = new jl_NullPointerException;
    jl_Throwable__init_($dest, $rt_s(221));
    $rt_throw($dest);
},
jl_System_fastArraycopy = ($src, $srcPos, $dest, $destPos, $length) => {
    if ($srcPos >= 0 && $destPos >= 0 && $length >= 0 && ($srcPos + $length | 0) <= jl_System_fastArrayLength($src) && ($destPos + $length | 0) <= jl_System_fastArrayLength($dest)) {
        jl_System_doArrayCopy($src, $srcPos, $dest, $destPos, $length);
        return;
    }
    $src = new jl_IndexOutOfBoundsException;
    jl_Throwable__init_0($src);
    $rt_throw($src);
},
jl_System_fastArrayLength = $obj => {
    return $rt_arrayLength($obj);
},
jl_System_doArrayCopy = (var$1, var$2, var$3, var$4, var$5) => {
    if (var$5 !== 0) {
        if (typeof var$1.data.buffer !== 'undefined') {
            var$3.data.set(var$1.data.subarray(var$2, var$2 + var$5), var$4);
        } else if (var$1 !== var$3 || var$4 < var$2) {
            for (let i = 0;i < var$5;i = i + 1 | 0) {
                var$3.data[var$4++] = var$1.data[var$2++];
            }
        } else {
            var$2 = var$2 + var$5 | 0;
            var$4 = var$4 + var$5 | 0;
            for (let i = 0;i < var$5;i = i + 1 | 0) {
                var$3.data[ --var$4] = var$1.data[ --var$2];
            }
        }
    }
},
jl_System_currentTimeMillis = () => {
    return Long_fromNumber((new Date()).getTime());
},
jur_NonCapFSet = $rt_classWithoutFields(jur_FSet),
jur_NonCapFSet_matches = ($this, var$1, var$2, var$3) => {
    let var$4;
    var$4 = $this.$groupIndex0;
    jur_MatchResultImpl_setConsumed(var$3, var$4, var$1 - jur_MatchResultImpl_getConsumed(var$3, var$4) | 0);
    return $this.$next2.$matches(var$1, var$2, var$3);
},
jur_NonCapFSet_getName = $this => {
    return $rt_s(222);
},
jur_NonCapFSet_hasConsumed = ($this, $mr) => {
    return 0;
},
jur_AheadFSet = $rt_classWithoutFields(jur_FSet),
jur_AheadFSet_matches = ($this, $stringIndex, $testString, $matchResult) => {
    return $stringIndex;
},
jur_AheadFSet_getName = $this => {
    return $rt_s(223);
},
jur_BehindFSet = $rt_classWithoutFields(jur_FSet),
jur_BehindFSet_matches = ($this, $stringIndex, $testString, $matchResult) => {
    if (jur_MatchResultImpl_getConsumed($matchResult, $this.$groupIndex0) != $stringIndex)
        $stringIndex = (-1);
    return $stringIndex;
},
jur_BehindFSet_getName = $this => {
    return $rt_s(224);
};
function jur_AtomicFSet() {
    jur_FSet.call(this);
    this.$index9 = 0;
}
let jur_AtomicFSet_matches = ($this, $stringIndex, $testString, $matchResult) => {
    let $gr;
    $gr = $this.$groupIndex0;
    jur_MatchResultImpl_setConsumed($matchResult, $gr, $stringIndex - jur_MatchResultImpl_getConsumed($matchResult, $gr) | 0);
    $this.$index9 = $stringIndex;
    return $stringIndex;
},
jur_AtomicFSet_getName = $this => {
    return $rt_s(225);
},
jur_AtomicFSet_hasConsumed = ($this, $mr) => {
    return 0;
},
jur_FinalSet = $rt_classWithoutFields(jur_FSet),
jur_FinalSet_matches = ($this, $stringIndex, $testString, $matchResult) => {
    if ($matchResult.$mode0 != 1 && $stringIndex != $matchResult.$rightBound)
        return (-1);
    $matchResult.$valid = 1;
    jur_MatchResultImpl_setEnd($matchResult, 0, $stringIndex);
    return $stringIndex;
},
jur_FinalSet_getName = $this => {
    return $rt_s(226);
};
function jur_LeafSet() {
    jur_AbstractSet.call(this);
    this.$charCount0 = 0;
}
let jur_LeafSet__init_ = $this => {
    jur_AbstractSet__init_($this);
    $this.$charCount0 = 1;
},
jur_LeafSet_matches = ($this, $stringIndex, $testString, $matchResult) => {
    let $shift;
    if (($stringIndex + $this.$charCount() | 0) <= $matchResult.$rightBound) {
        $shift = $this.$accepts($stringIndex, $testString);
        if ($shift >= 0)
            return $this.$next2.$matches($stringIndex + $shift | 0, $testString, $matchResult);
        return (-1);
    }
    $matchResult.$hitEnd = 1;
    return (-1);
},
jur_LeafSet_charCount = $this => {
    return $this.$charCount0;
},
jur_LeafSet_hasConsumed = ($this, $mr) => {
    return 1;
},
jur_EmptySet = $rt_classWithoutFields(jur_LeafSet),
jur_EmptySet__init_0 = ($this, $next) => {
    jur_AbstractSet__init_0($this, $next);
    $this.$charCount0 = 1;
    $this.$type0 = 1;
    $this.$charCount0 = 0;
},
jur_EmptySet__init_ = var_0 => {
    let var_1 = new jur_EmptySet();
    jur_EmptySet__init_0(var_1, var_0);
    return var_1;
},
jur_EmptySet_accepts = ($this, $stringIndex, $testString) => {
    return 0;
},
jur_EmptySet_find = ($this, $stringIndex, $testString, $matchResult) => {
    let $strLength, $startStr, $high, var$7;
    $strLength = $matchResult.$rightBound;
    $startStr = $matchResult.$leftBound;
    while (true) {
        $high = $rt_compare($stringIndex, $strLength);
        if ($high > 0)
            return (-1);
        if ($high < 0) {
            var$7 = $testString;
            if (jl_Character_isLowSurrogate(jl_String_charAt(var$7, $stringIndex)) && $stringIndex > $startStr && jl_Character_isHighSurrogate(jl_String_charAt(var$7, $stringIndex - 1 | 0))) {
                $stringIndex = $stringIndex + 1 | 0;
                continue;
            }
        }
        if ($this.$next2.$matches($stringIndex, $testString, $matchResult) >= 0)
            break;
        $stringIndex = $stringIndex + 1 | 0;
    }
    return $stringIndex;
},
jur_EmptySet_findBack = ($this, $stringIndex, $startSearch, $testString, $matchResult) => {
    let $strLength, $startStr, var$7;
    $strLength = $matchResult.$rightBound;
    $startStr = $matchResult.$leftBound;
    while (true) {
        if ($startSearch < $stringIndex)
            return (-1);
        if ($startSearch < $strLength) {
            var$7 = $testString;
            if (jl_Character_isLowSurrogate(jl_String_charAt(var$7, $startSearch)) && $startSearch > $startStr && jl_Character_isHighSurrogate(jl_String_charAt(var$7, $startSearch - 1 | 0))) {
                $startSearch = $startSearch + (-1) | 0;
                continue;
            }
        }
        if ($this.$next2.$matches($startSearch, $testString, $matchResult) >= 0)
            break;
        $startSearch = $startSearch + (-1) | 0;
    }
    return $startSearch;
},
jur_EmptySet_getName = $this => {
    return $rt_s(227);
},
jur_EmptySet_hasConsumed = ($this, $mr) => {
    return 0;
};
function jur_JointSet() {
    let a = this; jur_AbstractSet.call(a);
    a.$children = null;
    a.$fSet = null;
    a.$groupIndex = 0;
}
let jur_JointSet__init_ = ($this, $children, $fSet) => {
    jur_AbstractSet__init_($this);
    $this.$children = $children;
    $this.$fSet = $fSet;
    $this.$groupIndex = $fSet.$groupIndex0;
},
jur_JointSet__init_0 = (var_0, var_1) => {
    let var_2 = new jur_JointSet();
    jur_JointSet__init_(var_2, var_0, var_1);
    return var_2;
},
jur_JointSet_matches = ($this, $stringIndex, $testString, $matchResult) => {
    let $start, $size, $i, $shift;
    if ($this.$children !== null) {
        $start = jur_MatchResultImpl_getStart($matchResult, $this.$groupIndex);
        jur_MatchResultImpl_setStart($matchResult, $this.$groupIndex, $stringIndex);
        $size = $this.$children.$size0;
        $i = 0;
        while (true) {
            if ($i >= $size) {
                jur_MatchResultImpl_setStart($matchResult, $this.$groupIndex, $start);
                return (-1);
            }
            $shift = (ju_ArrayList_get($this.$children, $i)).$matches($stringIndex, $testString, $matchResult);
            if ($shift >= 0)
                break;
            $i = $i + 1 | 0;
        }
        return $shift;
    }
    return (-1);
},
jur_JointSet_setNext = ($this, $next) => {
    $this.$fSet.$next2 = $next;
},
jur_JointSet_getName = $this => {
    return $rt_s(228);
},
jur_JointSet_first = ($this, $set) => {
    let $i, var$3;
    a: {
        $i = $this.$children;
        if ($i !== null) {
            var$3 = ju_AbstractList_iterator($i);
            while (true) {
                if (!ju_AbstractList$1_hasNext(var$3))
                    break a;
                if (!(ju_AbstractList$1_next(var$3)).$first($set))
                    continue;
                else
                    return 1;
            }
        }
    }
    return 0;
},
jur_JointSet_hasConsumed = ($this, $matchResult) => {
    return !(jur_MatchResultImpl_getEnd($matchResult, $this.$groupIndex) >= 0 && jur_MatchResultImpl_getStart($matchResult, $this.$groupIndex) == jur_MatchResultImpl_getEnd($matchResult, $this.$groupIndex)) ? 1 : 0;
},
jur_JointSet_processSecondPass = $this => {
    let $child, $childrenSize, $i, $set, var$5, var$6, var$7, var$8, var$9;
    $this.$isSecondPassVisited = 1;
    $child = $this.$fSet;
    if ($child !== null && !$child.$isSecondPassVisited)
        jur_AbstractSet_processSecondPass($child);
    a: {
        b: {
            $child = $this.$children;
            if ($child !== null) {
                $childrenSize = $child.$size0;
                $i = 0;
                while (true) {
                    if ($i >= $childrenSize)
                        break b;
                    $child = ju_ArrayList_get($this.$children, $i);
                    $set = $child.$processBackRefReplacement();
                    if ($set === null)
                        $set = $child;
                    else {
                        $child.$isSecondPassVisited = 1;
                        ju_ArrayList_remove($this.$children, $i);
                        var$5 = $this.$children;
                        if ($i < 0)
                            break a;
                        var$6 = var$5.$size0;
                        if ($i > var$6)
                            break a;
                        ju_ArrayList_ensureCapacity(var$5, var$6 + 1 | 0);
                        var$7 = var$5.$size0;
                        var$8 = var$7;
                        while (var$8 > $i) {
                            var$9 = var$5.$array.data;
                            var$9[var$8] = var$9[var$8 - 1 | 0];
                            var$8 = var$8 + (-1) | 0;
                        }
                        var$5.$array.data[$i] = $set;
                        var$5.$size0 = var$7 + 1 | 0;
                        var$5.$modCount = var$5.$modCount + 1 | 0;
                    }
                    if (!$set.$isSecondPassVisited)
                        $set.$processSecondPass();
                    $i = $i + 1 | 0;
                }
            }
        }
        if ($this.$next2 !== null)
            jur_AbstractSet_processSecondPass($this);
        return;
    }
    $child = new jl_IndexOutOfBoundsException;
    jl_Throwable__init_0($child);
    $rt_throw($child);
},
jur_NonCapJointSet = $rt_classWithoutFields(jur_JointSet),
jur_NonCapJointSet_matches = ($this, $stringIndex, $testString, $matchResult) => {
    let $start, $size, $i, $shift;
    $start = jur_MatchResultImpl_getConsumed($matchResult, $this.$groupIndex);
    jur_MatchResultImpl_setConsumed($matchResult, $this.$groupIndex, $stringIndex);
    $size = $this.$children.$size0;
    $i = 0;
    while (true) {
        if ($i >= $size) {
            jur_MatchResultImpl_setConsumed($matchResult, $this.$groupIndex, $start);
            return (-1);
        }
        $shift = (ju_ArrayList_get($this.$children, $i)).$matches($stringIndex, $testString, $matchResult);
        if ($shift >= 0)
            break;
        $i = $i + 1 | 0;
    }
    return $shift;
},
jur_NonCapJointSet_getName = $this => {
    return $rt_s(229);
},
jur_NonCapJointSet_hasConsumed = ($this, $matchResult) => {
    return !jur_MatchResultImpl_getConsumed($matchResult, $this.$groupIndex) ? 0 : 1;
},
jur_AtomicJointSet = $rt_classWithoutFields(jur_NonCapJointSet),
jur_AtomicJointSet_matches = ($this, $stringIndex, $testString, $matchResult) => {
    let $start, $size, $i;
    $start = jur_MatchResultImpl_getConsumed($matchResult, $this.$groupIndex);
    jur_MatchResultImpl_setConsumed($matchResult, $this.$groupIndex, $stringIndex);
    $size = $this.$children.$size0;
    $i = 0;
    while ($i < $size) {
        if ((ju_ArrayList_get($this.$children, $i)).$matches($stringIndex, $testString, $matchResult) >= 0)
            return $this.$next2.$matches($this.$fSet.$index9, $testString, $matchResult);
        $i = $i + 1 | 0;
    }
    jur_MatchResultImpl_setConsumed($matchResult, $this.$groupIndex, $start);
    return (-1);
},
jur_AtomicJointSet_setNext = ($this, $next) => {
    $this.$next2 = $next;
},
jur_AtomicJointSet_getName = $this => {
    return $rt_s(229);
},
jur_PositiveLookAhead = $rt_classWithoutFields(jur_AtomicJointSet),
jur_PositiveLookAhead_matches = ($this, $stringIndex, $testString, $matchResult) => {
    let $size, $i;
    $size = $this.$children.$size0;
    $i = 0;
    while ($i < $size) {
        if ((ju_ArrayList_get($this.$children, $i)).$matches($stringIndex, $testString, $matchResult) >= 0)
            return $this.$next2.$matches($stringIndex, $testString, $matchResult);
        $i = $i + 1 | 0;
    }
    return (-1);
},
jur_PositiveLookAhead_hasConsumed = ($this, $matchResult) => {
    return 0;
},
jur_PositiveLookAhead_getName = $this => {
    return $rt_s(230);
},
jur_NegativeLookAhead = $rt_classWithoutFields(jur_AtomicJointSet),
jur_NegativeLookAhead_matches = ($this, $stringIndex, $testString, $matchResult) => {
    let $size, $i;
    $size = $this.$children.$size0;
    $i = 0;
    while (true) {
        if ($i >= $size)
            return $this.$next2.$matches($stringIndex, $testString, $matchResult);
        if ((ju_ArrayList_get($this.$children, $i)).$matches($stringIndex, $testString, $matchResult) >= 0)
            break;
        $i = $i + 1 | 0;
    }
    return (-1);
},
jur_NegativeLookAhead_hasConsumed = ($this, $matchResult) => {
    return 0;
},
jur_NegativeLookAhead_getName = $this => {
    return $rt_s(231);
},
jur_PositiveLookBehind = $rt_classWithoutFields(jur_AtomicJointSet),
jur_PositiveLookBehind_matches = ($this, $stringIndex, $testString, $matchResult) => {
    let $size, $leftBound, $shift, $i;
    $size = $this.$children.$size0;
    $leftBound = $matchResult.$transparentBounds ? 0 : $matchResult.$leftBound;
    a: {
        $shift = $this.$next2.$matches($stringIndex, $testString, $matchResult);
        if ($shift >= 0) {
            jur_MatchResultImpl_setConsumed($matchResult, $this.$groupIndex, $stringIndex);
            $i = 0;
            while (true) {
                if ($i >= $size)
                    break a;
                if ((ju_ArrayList_get($this.$children, $i)).$findBack($leftBound, $stringIndex, $testString, $matchResult) >= 0) {
                    jur_MatchResultImpl_setConsumed($matchResult, $this.$groupIndex, (-1));
                    return $shift;
                }
                $i = $i + 1 | 0;
            }
        }
    }
    return (-1);
},
jur_PositiveLookBehind_hasConsumed = ($this, $matchResult) => {
    return 0;
},
jur_PositiveLookBehind_getName = $this => {
    return $rt_s(232);
},
jur_NegativeLookBehind = $rt_classWithoutFields(jur_AtomicJointSet),
jur_NegativeLookBehind_matches = ($this, $stringIndex, $testString, $matchResult) => {
    let $size, $i;
    $size = $this.$children.$size0;
    jur_MatchResultImpl_setConsumed($matchResult, $this.$groupIndex, $stringIndex);
    $i = 0;
    while (true) {
        if ($i >= $size)
            return $this.$next2.$matches($stringIndex, $testString, $matchResult);
        if ((ju_ArrayList_get($this.$children, $i)).$findBack(0, $stringIndex, $testString, $matchResult) >= 0)
            break;
        $i = $i + 1 | 0;
    }
    return (-1);
},
jur_NegativeLookBehind_hasConsumed = ($this, $matchResult) => {
    return 0;
},
jur_NegativeLookBehind_getName = $this => {
    return $rt_s(233);
};
function jur_SingleSet() {
    jur_JointSet.call(this);
    this.$kid = null;
}
let jur_SingleSet__init_ = ($this, $child, $fSet) => {
    jur_AbstractSet__init_($this);
    $this.$kid = $child;
    $this.$fSet = $fSet;
    $this.$groupIndex = $fSet.$groupIndex0;
},
jur_SingleSet__init_0 = (var_0, var_1) => {
    let var_2 = new jur_SingleSet();
    jur_SingleSet__init_(var_2, var_0, var_1);
    return var_2;
},
jur_SingleSet_matches = ($this, $stringIndex, $testString, $matchResult) => {
    let $start, $shift;
    $start = jur_MatchResultImpl_getStart($matchResult, $this.$groupIndex);
    jur_MatchResultImpl_setStart($matchResult, $this.$groupIndex, $stringIndex);
    $shift = $this.$kid.$matches($stringIndex, $testString, $matchResult);
    if ($shift < 0) {
        jur_MatchResultImpl_setStart($matchResult, $this.$groupIndex, $start);
        return (-1);
    }
    return $shift;
},
jur_SingleSet_find = ($this, $stringIndex, $testString, $matchResult) => {
    let $res;
    $res = $this.$kid.$find1($stringIndex, $testString, $matchResult);
    if ($res >= 0)
        jur_MatchResultImpl_setStart($matchResult, $this.$groupIndex, $res);
    return $res;
},
jur_SingleSet_findBack = ($this, $stringIndex, $lastIndex, $testString, $matchResult) => {
    let $res;
    $res = $this.$kid.$findBack($stringIndex, $lastIndex, $testString, $matchResult);
    if ($res >= 0)
        jur_MatchResultImpl_setStart($matchResult, $this.$groupIndex, $res);
    return $res;
},
jur_SingleSet_first = ($this, $set) => {
    return $this.$kid.$first($set);
},
jur_SingleSet_processBackRefReplacement = $this => {
    let $set;
    $set = new jur_BackReferencedSingleSet;
    jur_SingleSet__init_($set, $this.$kid, $this.$fSet);
    $this.$next2 = $set;
    return $set;
},
jur_SingleSet_processSecondPass = $this => {
    let $set;
    $this.$isSecondPassVisited = 1;
    $set = $this.$fSet;
    if ($set !== null && !$set.$isSecondPassVisited)
        jur_AbstractSet_processSecondPass($set);
    $set = $this.$kid;
    if ($set !== null && !$set.$isSecondPassVisited) {
        $set = $set.$processBackRefReplacement();
        if ($set !== null) {
            $this.$kid.$isSecondPassVisited = 1;
            $this.$kid = $set;
        }
        $this.$kid.$processSecondPass();
    }
},
jlr_Array = $rt_classWithoutFields(),
jlr_Array_getLength = $array => {
    let $cls;
    $cls = (jl_Object_getClass($array)).$classInfo;
    if ($cls[$rt_meta].itemType === null) {
        $array = new jl_IllegalArgumentException;
        jl_Throwable__init_0($array);
        $rt_throw($array);
    }
    return $rt_arrayLength($array);
},
jlr_Array_newInstance = ($componentType, $length) => {
    if ($componentType !== null) {
        if ($componentType !== $rt_cls($rt_voidcls)) {
            if ($length < 0) {
                $componentType = new jl_NegativeArraySizeException;
                jl_Throwable__init_0($componentType);
                $rt_throw($componentType);
            }
            return otrr_ClassInfo_newArrayInstance($componentType.$classInfo, $length);
        }
        $componentType = new jl_IllegalArgumentException;
        jl_Throwable__init_0($componentType);
        $rt_throw($componentType);
    }
    $componentType = new jl_NullPointerException;
    jl_Throwable__init_0($componentType);
    $rt_throw($componentType);
},
jl_ArrayStoreException = $rt_classWithoutFields(jl_RuntimeException),
jur_SpecialToken = $rt_classWithoutFields();
function jur_AbstractCharClass() {
    let a = this; jur_SpecialToken.call(a);
    a.$alt = 0;
    a.$altSurrogates = 0;
    a.$lowHighSurrogates = null;
    a.$charClassWithoutSurrogates = null;
    a.$charClassWithSurrogates = null;
    a.$mayContainSupplCodepoints = 0;
}
let jur_AbstractCharClass_charClasses = null,
jur_AbstractCharClass_$callClinit = () => {
    jur_AbstractCharClass_$callClinit = $rt_eraseClinit(jur_AbstractCharClass);
    jur_AbstractCharClass__clinit_();
},
jur_AbstractCharClass__init_ = $this => {
    let var$1;
    jur_AbstractCharClass_$callClinit();
    var$1 = new ju_BitSet;
    var$1.$data = $rt_createIntArray(64);
    $this.$lowHighSurrogates = var$1;
},
jur_AbstractCharClass_getBits = $this => {
    return null;
},
jur_AbstractCharClass_getLowHighSurrogates = $this => {
    return $this.$lowHighSurrogates;
},
jur_AbstractCharClass_hasLowHighSurrogates = $this => {
    let var$1, var$2, var$3, var$4, var$5;
    if (!$this.$altSurrogates)
        var$1 = ju_BitSet_nextSetBit($this.$lowHighSurrogates, 0) >= 2048 ? 0 : 1;
    else {
        a: {
            var$2 = $this.$lowHighSurrogates;
            var$1 = 0;
            var$3 = var$2.$length1;
            if (var$1 < var$3) {
                var$4 = var$2.$data.data;
                var$5 = (var$4[0] ^ (-1)) >>> 0 | 0;
                if (var$5)
                    var$1 = jl_Integer_numberOfTrailingZeros(var$5) + var$1 | 0;
                else {
                    var$1 = (var$3 + 31 | 0) / 32 | 0;
                    var$5 = 1;
                    b: {
                        while (var$5 < var$1) {
                            if (var$4[var$5] != (-1))
                                break b;
                            var$5 = var$5 + 1 | 0;
                        }
                        var$1 = var$3;
                        break a;
                    }
                    var$1 = (var$5 * 32 | 0) + jl_Integer_numberOfTrailingZeros(var$4[var$5] ^ (-1)) | 0;
                }
            }
        }
        var$1 = var$1 >= 2048 ? 0 : 1;
    }
    return var$1;
},
jur_AbstractCharClass_mayContainSupplCodepoints = $this => {
    return $this.$mayContainSupplCodepoints;
},
jur_AbstractCharClass_getInstance = $this => {
    return $this;
},
jur_AbstractCharClass_getSurrogates = $this => {
    let $lHS, var$2;
    if ($this.$charClassWithSurrogates === null) {
        $lHS = $this.$getLowHighSurrogates();
        var$2 = new jur_AbstractCharClass$1;
        var$2.$this$031 = $this;
        var$2.$val$lHS = $lHS;
        jur_AbstractCharClass__init_(var$2);
        $this.$charClassWithSurrogates = var$2;
        jur_AbstractCharClass_setNegative(var$2, $this.$altSurrogates);
    }
    return $this.$charClassWithSurrogates;
},
jur_AbstractCharClass_getWithoutSurrogates = $this => {
    let $lHS, var$2;
    if ($this.$charClassWithoutSurrogates === null) {
        $lHS = $this.$getLowHighSurrogates();
        var$2 = new jur_AbstractCharClass$2;
        var$2.$this$022 = $this;
        var$2.$val$lHS0 = $lHS;
        var$2.$val$thisClass = $this;
        jur_AbstractCharClass__init_(var$2);
        $this.$charClassWithoutSurrogates = var$2;
        jur_AbstractCharClass_setNegative(var$2, $this.$alt);
        $this.$charClassWithoutSurrogates.$mayContainSupplCodepoints = $this.$mayContainSupplCodepoints;
    }
    return $this.$charClassWithoutSurrogates;
},
jur_AbstractCharClass_hasUCI = $this => {
    return 0;
},
jur_AbstractCharClass_setNegative = ($this, $value) => {
    let var$2;
    var$2 = $this.$alt;
    if (var$2 ^ $value) {
        $this.$alt = var$2 ? 0 : 1;
        $this.$altSurrogates = $this.$altSurrogates ? 0 : 1;
    }
    if (!$this.$mayContainSupplCodepoints)
        $this.$mayContainSupplCodepoints = 1;
    return $this;
},
jur_AbstractCharClass_isNegative = $this => {
    return $this.$alt;
},
jur_AbstractCharClass_intersects0 = ($cc, $ch) => {
    jur_AbstractCharClass_$callClinit();
    return $cc.$contains0($ch);
},
jur_AbstractCharClass_intersects = ($cc1, $cc2) => {
    let var$3, var$4;
    jur_AbstractCharClass_$callClinit();
    if ($cc1.$getBits() !== null && $cc2.$getBits() !== null) {
        $cc1 = $cc1.$getBits();
        $cc2 = $cc2.$getBits();
        var$3 = jl_Math_min($cc1.$data.data.length, $cc2.$data.data.length);
        var$4 = 0;
        a: {
            b: {
                while (var$4 < var$3) {
                    if ($cc1.$data.data[var$4] & $cc2.$data.data[var$4])
                        break b;
                    var$4 = var$4 + 1 | 0;
                }
                var$3 = 0;
                break a;
            }
            var$3 = 1;
        }
        return var$3;
    }
    return 1;
},
jur_AbstractCharClass_getPredefinedClass = ($name, $negative) => {
    let var$3, var$4, var$5;
    jur_AbstractCharClass_$callClinit();
    var$3 = 0;
    while (true) {
        jur_AbstractCharClass$PredefinedCharacterClasses_$callClinit();
        var$4 = jur_AbstractCharClass$PredefinedCharacterClasses_contents.data;
        if (var$3 >= var$4.length) {
            var$5 = new ju_MissingResourceException;
            jl_Throwable__init_(var$5, $rt_s(3));
            var$5.$className = $rt_s(3);
            var$5.$key0 = $name;
            $rt_throw(var$5);
        }
        var$4 = var$4[var$3].data;
        if (jl_String_equals($name, var$4[0]))
            break;
        var$3 = var$3 + 1 | 0;
    }
    return jur_AbstractCharClass$LazyCharClass_getValue(var$4[1], $negative);
},
jur_AbstractCharClass__clinit_ = () => {
    let var$1;
    var$1 = new jur_AbstractCharClass$PredefinedCharacterClasses;
    jur_AbstractCharClass$PredefinedCharacterClasses_$callClinit();
    jur_AbstractCharClass_charClasses = var$1;
};
function ju_MissingResourceException() {
    let a = this; jl_RuntimeException.call(a);
    a.$className = null;
    a.$key0 = null;
}
function jur_CharClass() {
    let a = this; jur_AbstractCharClass.call(a);
    a.$ci = 0;
    a.$uci = 0;
    a.$hasUCI0 = 0;
    a.$invertedSurrogates = 0;
    a.$inverted = 0;
    a.$hideBits = 0;
    a.$bits = null;
    a.$nonBitSet = null;
}
let jur_CharClass__init_2 = $this => {
    jur_AbstractCharClass__init_($this);
    $this.$bits = ju_BitSet__init_();
},
jur_CharClass__init_ = () => {
    let var_0 = new jur_CharClass();
    jur_CharClass__init_2(var_0);
    return var_0;
},
jur_CharClass__init_1 = ($this, $ci, $uci) => {
    jur_AbstractCharClass__init_($this);
    $this.$bits = ju_BitSet__init_();
    $this.$ci = $ci;
    $this.$uci = $uci;
},
jur_CharClass__init_0 = (var_0, var_1) => {
    let var_2 = new jur_CharClass();
    jur_CharClass__init_1(var_2, var_0, var_1);
    return var_2;
},
jur_CharClass_add0 = ($this, $ch) => {
    a: {
        if ($this.$ci) {
            b: {
                if (!($ch >= 97 && $ch <= 122)) {
                    if ($ch < 65)
                        break b;
                    if ($ch > 90)
                        break b;
                }
                if ($this.$inverted) {
                    ju_BitSet_clear($this.$bits, jur_Pattern_getSupplement($ch & 65535));
                    break a;
                }
                ju_BitSet_set0($this.$bits, jur_Pattern_getSupplement($ch & 65535));
                break a;
            }
            if ($this.$uci && $ch > 128) {
                $this.$hasUCI0 = 1;
                $ch = jl_Character_toLowerCase0(jl_Character_toUpperCase0($ch));
            }
        }
    }
    if (!(!jur_Lexer_isHighSurrogate($ch) && !jur_Lexer_isLowSurrogate($ch))) {
        if ($this.$invertedSurrogates)
            ju_BitSet_clear($this.$lowHighSurrogates, $ch - 55296 | 0);
        else
            ju_BitSet_set0($this.$lowHighSurrogates, $ch - 55296 | 0);
    }
    if ($this.$inverted)
        ju_BitSet_clear($this.$bits, $ch);
    else
        ju_BitSet_set0($this.$bits, $ch);
    if (!$this.$mayContainSupplCodepoints && jl_Character_isSupplementaryCodePoint($ch))
        $this.$mayContainSupplCodepoints = 1;
    return $this;
},
jur_CharClass_add1 = ($this, $cc) => {
    let $curAlt, $nb, var$4;
    if (!$this.$mayContainSupplCodepoints && $cc.$mayContainSupplCodepoints)
        $this.$mayContainSupplCodepoints = 1;
    if ($this.$invertedSurrogates) {
        if (!$cc.$altSurrogates)
            ju_BitSet_andNot($this.$lowHighSurrogates, $cc.$getLowHighSurrogates());
        else
            ju_BitSet_and($this.$lowHighSurrogates, $cc.$getLowHighSurrogates());
    } else if (!$cc.$altSurrogates)
        ju_BitSet_or($this.$lowHighSurrogates, $cc.$getLowHighSurrogates());
    else {
        ju_BitSet_xor($this.$lowHighSurrogates, $cc.$getLowHighSurrogates());
        ju_BitSet_and($this.$lowHighSurrogates, $cc.$getLowHighSurrogates());
        $this.$altSurrogates = $this.$altSurrogates ? 0 : 1;
        $this.$invertedSurrogates = 1;
    }
    if (!$this.$hideBits && $cc.$getBits() !== null) {
        if ($this.$inverted) {
            if (!$cc.$alt)
                ju_BitSet_andNot($this.$bits, $cc.$getBits());
            else
                ju_BitSet_and($this.$bits, $cc.$getBits());
        } else if (!$cc.$alt)
            ju_BitSet_or($this.$bits, $cc.$getBits());
        else {
            ju_BitSet_xor($this.$bits, $cc.$getBits());
            ju_BitSet_and($this.$bits, $cc.$getBits());
            $this.$alt = $this.$alt ? 0 : 1;
            $this.$inverted = 1;
        }
    } else {
        $curAlt = $this.$alt;
        $nb = $this.$nonBitSet;
        if ($nb !== null) {
            if (!$curAlt) {
                var$4 = new jur_CharClass$5;
                var$4.$this$023 = $this;
                var$4.$val$curAlt7 = $curAlt;
                var$4.$val$nb3 = $nb;
                var$4.$val$cc0 = $cc;
                jur_AbstractCharClass__init_(var$4);
                $this.$nonBitSet = var$4;
            } else {
                var$4 = new jur_CharClass$4;
                var$4.$this$037 = $this;
                var$4.$val$curAlt9 = $curAlt;
                var$4.$val$nb4 = $nb;
                var$4.$val$cc2 = $cc;
                jur_AbstractCharClass__init_(var$4);
                $this.$nonBitSet = var$4;
            }
        } else {
            if ($curAlt && !$this.$inverted && ju_BitSet_isEmpty($this.$bits)) {
                $nb = new jur_CharClass$1;
                $nb.$this$013 = $this;
                $nb.$val$cc3 = $cc;
                jur_AbstractCharClass__init_($nb);
                $this.$nonBitSet = $nb;
            } else if (!$curAlt) {
                $nb = new jur_CharClass$3;
                $nb.$this$05 = $this;
                $nb.$val$curAlt = $curAlt;
                $nb.$val$cc = $cc;
                jur_AbstractCharClass__init_($nb);
                $this.$nonBitSet = $nb;
            } else {
                $nb = new jur_CharClass$2;
                $nb.$this$02 = $this;
                $nb.$val$curAlt0 = $curAlt;
                $nb.$val$cc1 = $cc;
                jur_AbstractCharClass__init_($nb);
                $this.$nonBitSet = $nb;
            }
            $this.$hideBits = 1;
        }
    }
    return $this;
},
jur_CharClass_add = ($this, $i, $end) => {
    let var$3, var$4, var$5, var$6, var$7;
    if ($i <= $end) {
        a: {
            b: {
                if (!$this.$ci) {
                    if ($end < 55296)
                        break b;
                    if ($i > 57343)
                        break b;
                }
                $end = $end + 1 | 0;
                while (true) {
                    if ($i >= $end)
                        break a;
                    jur_CharClass_add0($this, $i);
                    $i = $i + 1 | 0;
                }
            }
            if (!$this.$inverted)
                ju_BitSet_set($this.$bits, $i, $end + 1 | 0);
            else {
                var$3 = $this.$bits;
                $end = $end + 1 | 0;
                if ($i >= 0 && $i <= $end) {
                    var$4 = var$3.$length1;
                    if ($i < var$4) {
                        var$5 = jl_Math_min(var$4, $end);
                        if ($i != var$5) {
                            var$6 = $i / 32 | 0;
                            $end = var$5 / 32 | 0;
                            if (var$6 == $end) {
                                var$7 = var$3.$data.data;
                                var$7[var$6] = var$7[var$6] & (ju_BitSet_trailingOneBits(var$3, $i) | ju_BitSet_trailingZeroBits(var$3, var$5));
                            } else {
                                var$7 = var$3.$data.data;
                                var$7[var$6] = var$7[var$6] & ju_BitSet_trailingOneBits(var$3, $i);
                                var$4 = var$6 + 1 | 0;
                                while (var$4 < $end) {
                                    var$3.$data.data[var$4] = 0;
                                    var$4 = var$4 + 1 | 0;
                                }
                                if (var$5 & 31) {
                                    var$7 = var$3.$data.data;
                                    var$7[$end] = var$7[$end] & ju_BitSet_trailingZeroBits(var$3, var$5);
                                }
                            }
                            ju_BitSet_recalculateLength(var$3);
                        }
                    }
                } else {
                    var$3 = new jl_IndexOutOfBoundsException;
                    jl_Throwable__init_0(var$3);
                    $rt_throw(var$3);
                }
            }
        }
        return $this;
    }
    var$3 = new jl_IllegalArgumentException;
    jl_Throwable__init_0(var$3);
    $rt_throw(var$3);
},
jur_CharClass_union = ($this, $clazz) => {
    let var$2, $curAlt, $nb;
    if (!$this.$mayContainSupplCodepoints && $clazz.$mayContainSupplCodepoints)
        $this.$mayContainSupplCodepoints = 1;
    var$2 = $clazz;
    if (var$2.$hasUCI0)
        $this.$hasUCI0 = 1;
    $curAlt = $this.$altSurrogates;
    if (!($curAlt ^ $clazz.$altSurrogates)) {
        if (!$curAlt)
            ju_BitSet_or($this.$lowHighSurrogates, var$2.$lowHighSurrogates);
        else
            ju_BitSet_and($this.$lowHighSurrogates, var$2.$lowHighSurrogates);
    } else if ($curAlt)
        ju_BitSet_andNot($this.$lowHighSurrogates, var$2.$lowHighSurrogates);
    else {
        ju_BitSet_xor($this.$lowHighSurrogates, var$2.$lowHighSurrogates);
        ju_BitSet_and($this.$lowHighSurrogates, var$2.$lowHighSurrogates);
        $this.$altSurrogates = 1;
    }
    if (!$this.$hideBits && jur_CharClass_getBits(var$2) !== null) {
        $curAlt = $this.$alt;
        if (!($curAlt ^ $clazz.$alt)) {
            if (!$curAlt)
                ju_BitSet_or($this.$bits, jur_CharClass_getBits(var$2));
            else
                ju_BitSet_and($this.$bits, jur_CharClass_getBits(var$2));
        } else if ($curAlt)
            ju_BitSet_andNot($this.$bits, jur_CharClass_getBits(var$2));
        else {
            ju_BitSet_xor($this.$bits, jur_CharClass_getBits(var$2));
            ju_BitSet_and($this.$bits, jur_CharClass_getBits(var$2));
            $this.$alt = 1;
        }
    } else {
        $curAlt = $this.$alt;
        $nb = $this.$nonBitSet;
        if ($nb !== null) {
            if (!$curAlt) {
                var$2 = new jur_CharClass$11;
                var$2.$this$017 = $this;
                var$2.$val$curAlt4 = $curAlt;
                var$2.$val$nb2 = $nb;
                var$2.$val$clazz8 = $clazz;
                jur_AbstractCharClass__init_(var$2);
                $this.$nonBitSet = var$2;
            } else {
                var$2 = new jur_CharClass$10;
                var$2.$this$024 = $this;
                var$2.$val$curAlt6 = $curAlt;
                var$2.$val$nb0 = $nb;
                var$2.$val$clazz0 = $clazz;
                jur_AbstractCharClass__init_(var$2);
                $this.$nonBitSet = var$2;
            }
        } else {
            if (!$this.$inverted && ju_BitSet_isEmpty($this.$bits)) {
                if (!$curAlt) {
                    $nb = new jur_CharClass$7;
                    $nb.$this$038 = $this;
                    $nb.$val$clazz7 = $clazz;
                    jur_AbstractCharClass__init_($nb);
                    $this.$nonBitSet = $nb;
                } else {
                    $nb = new jur_CharClass$6;
                    $nb.$this$025 = $this;
                    $nb.$val$clazz6 = $clazz;
                    jur_AbstractCharClass__init_($nb);
                    $this.$nonBitSet = $nb;
                }
            } else if (!$curAlt) {
                $nb = new jur_CharClass$9;
                $nb.$this$010 = $this;
                $nb.$val$clazz = $clazz;
                $nb.$val$curAlt8 = $curAlt;
                jur_AbstractCharClass__init_($nb);
                $this.$nonBitSet = $nb;
            } else {
                $nb = new jur_CharClass$8;
                $nb.$this$06 = $this;
                $nb.$val$clazz1 = $clazz;
                $nb.$val$curAlt2 = $curAlt;
                jur_AbstractCharClass__init_($nb);
                $this.$nonBitSet = $nb;
            }
            $this.$hideBits = 1;
        }
    }
},
jur_CharClass_intersection = ($this, $clazz) => {
    let var$2, $curAlt, $nb;
    if (!$this.$mayContainSupplCodepoints && $clazz.$mayContainSupplCodepoints)
        $this.$mayContainSupplCodepoints = 1;
    var$2 = $clazz;
    if (var$2.$hasUCI0)
        $this.$hasUCI0 = 1;
    $curAlt = $this.$altSurrogates;
    if (!($curAlt ^ $clazz.$altSurrogates)) {
        if (!$curAlt)
            ju_BitSet_and($this.$lowHighSurrogates, var$2.$lowHighSurrogates);
        else
            ju_BitSet_or($this.$lowHighSurrogates, var$2.$lowHighSurrogates);
    } else if (!$curAlt)
        ju_BitSet_andNot($this.$lowHighSurrogates, var$2.$lowHighSurrogates);
    else {
        ju_BitSet_xor($this.$lowHighSurrogates, var$2.$lowHighSurrogates);
        ju_BitSet_and($this.$lowHighSurrogates, var$2.$lowHighSurrogates);
        $this.$altSurrogates = 0;
    }
    if (!$this.$hideBits && jur_CharClass_getBits(var$2) !== null) {
        $curAlt = $this.$alt;
        if (!($curAlt ^ $clazz.$alt)) {
            if (!$curAlt)
                ju_BitSet_and($this.$bits, jur_CharClass_getBits(var$2));
            else
                ju_BitSet_or($this.$bits, jur_CharClass_getBits(var$2));
        } else if (!$curAlt)
            ju_BitSet_andNot($this.$bits, jur_CharClass_getBits(var$2));
        else {
            ju_BitSet_xor($this.$bits, jur_CharClass_getBits(var$2));
            ju_BitSet_and($this.$bits, jur_CharClass_getBits(var$2));
            $this.$alt = 0;
        }
    } else {
        $curAlt = $this.$alt;
        $nb = $this.$nonBitSet;
        if ($nb !== null) {
            if (!$curAlt) {
                var$2 = new jur_CharClass$17;
                var$2.$this$021 = $this;
                var$2.$val$curAlt5 = $curAlt;
                var$2.$val$nb1 = $nb;
                var$2.$val$clazz10 = $clazz;
                jur_AbstractCharClass__init_(var$2);
                $this.$nonBitSet = var$2;
            } else {
                var$2 = new jur_CharClass$16;
                var$2.$this$028 = $this;
                var$2.$val$curAlt3 = $curAlt;
                var$2.$val$nb = $nb;
                var$2.$val$clazz3 = $clazz;
                jur_AbstractCharClass__init_(var$2);
                $this.$nonBitSet = var$2;
            }
        } else {
            if (!$this.$inverted && ju_BitSet_isEmpty($this.$bits)) {
                if (!$curAlt) {
                    $nb = new jur_CharClass$13;
                    $nb.$this$026 = $this;
                    $nb.$val$clazz4 = $clazz;
                    jur_AbstractCharClass__init_($nb);
                    $this.$nonBitSet = $nb;
                } else {
                    $nb = new jur_CharClass$12;
                    $nb.$this$036 = $this;
                    $nb.$val$clazz5 = $clazz;
                    jur_AbstractCharClass__init_($nb);
                    $this.$nonBitSet = $nb;
                }
            } else if (!$curAlt) {
                $nb = new jur_CharClass$15;
                $nb.$this$011 = $this;
                $nb.$val$clazz9 = $clazz;
                $nb.$val$curAlt1 = $curAlt;
                jur_AbstractCharClass__init_($nb);
                $this.$nonBitSet = $nb;
            } else {
                $nb = new jur_CharClass$14;
                $nb.$this$07 = $this;
                $nb.$val$clazz2 = $clazz;
                $nb.$val$curAlt10 = $curAlt;
                jur_AbstractCharClass__init_($nb);
                $this.$nonBitSet = $nb;
            }
            $this.$hideBits = 1;
        }
    }
},
jur_CharClass_contains = ($this, $ch) => {
    let var$2;
    var$2 = $this.$nonBitSet;
    if (var$2 === null)
        return $this.$alt ^ ju_BitSet_get($this.$bits, $ch);
    return $this.$alt ^ var$2.$contains0($ch);
},
jur_CharClass_getBits = $this => {
    if ($this.$hideBits)
        return null;
    return $this.$bits;
},
jur_CharClass_getLowHighSurrogates = $this => {
    return $this.$lowHighSurrogates;
},
jur_CharClass_getInstance = $this => {
    let $bs, $res;
    if ($this.$nonBitSet === null) {
        $bs = jur_CharClass_getBits($this);
        $res = new jur_CharClass$18;
        $res.$this$016 = $this;
        $res.$val$bs = $bs;
        jur_AbstractCharClass__init_($res);
        return jur_AbstractCharClass_setNegative($res, $this.$alt);
    }
    return $this;
},
jur_CharClass_toString = $this => {
    let $temp, $i, var$3;
    $temp = new jl_StringBuilder;
    jl_AbstractStringBuilder__init_($temp);
    $i = ju_BitSet_nextSetBit($this.$bits, 0);
    while ($i >= 0) {
        jl_AbstractStringBuilder_append0($temp, jl_Character_toChars($i));
        jl_AbstractStringBuilder_append($temp, 124);
        $i = ju_BitSet_nextSetBit($this.$bits, $i + 1 | 0);
    }
    var$3 = $temp.$length0;
    if (var$3 > 0)
        jl_StringBuilder_deleteCharAt($temp, var$3 - 1 | 0);
    return jl_AbstractStringBuilder_toString($temp);
},
jur_CharClass_hasUCI = $this => {
    return $this.$hasUCI0;
};
function jur_QuantifierSet() {
    jur_AbstractSet.call(this);
    this.$innerSet = null;
}
let jur_QuantifierSet__init_ = ($this, $innerSet, $next, $type) => {
    jur_AbstractSet__init_0($this, $next);
    $this.$innerSet = $innerSet;
    $this.$type0 = $type;
},
jur_QuantifierSet_getInnerSet = $this => {
    return $this.$innerSet;
},
jur_QuantifierSet_first = ($this, $set) => {
    return !(!$this.$innerSet.$first($set) && !$this.$next2.$first($set)) ? 1 : 0;
},
jur_QuantifierSet_hasConsumed = ($this, $mr) => {
    return 1;
},
jur_QuantifierSet_processSecondPass = $this => {
    let $set;
    $this.$isSecondPassVisited = 1;
    $set = $this.$next2;
    if ($set !== null && !$set.$isSecondPassVisited) {
        $set = $set.$processBackRefReplacement();
        if ($set !== null) {
            $this.$next2.$isSecondPassVisited = 1;
            $this.$next2 = $set;
        }
        $this.$next2.$processSecondPass();
    }
    $set = $this.$innerSet;
    if ($set !== null) {
        if (!$set.$isSecondPassVisited) {
            $set = $set.$processBackRefReplacement();
            if ($set !== null) {
                $this.$innerSet.$isSecondPassVisited = 1;
                $this.$innerSet = $set;
            }
            $this.$innerSet.$processSecondPass();
        } else if ($set instanceof jur_SingleSet && $set.$fSet.$isBackReferenced)
            $this.$innerSet = $set.$next2;
    }
};
function jur_LeafQuantifierSet() {
    jur_QuantifierSet.call(this);
    this.$leaf = null;
}
let jur_LeafQuantifierSet__init_ = ($this, $innerSet, $next, $type) => {
    jur_QuantifierSet__init_($this, $innerSet, $next, $type);
    $this.$leaf = $innerSet;
},
jur_LeafQuantifierSet__init_0 = (var_0, var_1, var_2) => {
    let var_3 = new jur_LeafQuantifierSet();
    jur_LeafQuantifierSet__init_(var_3, var_0, var_1, var_2);
    return var_3;
},
jur_LeafQuantifierSet_matches = ($this, $stringIndex, $testString, $matchResult) => {
    let $i, var$5;
    $i = 0;
    a: {
        b: {
            while (($stringIndex + $this.$leaf.$charCount() | 0) <= $matchResult.$rightBound) {
                var$5 = $this.$leaf.$accepts($stringIndex, $testString);
                if (var$5 <= 0)
                    break b;
                $stringIndex = $stringIndex + var$5 | 0;
                $i = $i + 1 | 0;
            }
            break a;
        }
    }
    while (true) {
        if ($i < 0)
            return (-1);
        var$5 = $this.$next2.$matches($stringIndex, $testString, $matchResult);
        if (var$5 >= 0)
            break;
        $stringIndex = $stringIndex - $this.$leaf.$charCount() | 0;
        $i = $i + (-1) | 0;
    }
    return var$5;
},
jur_LeafQuantifierSet_getName = $this => {
    return $rt_s(234);
};
function jur_CompositeQuantifierSet() {
    jur_LeafQuantifierSet.call(this);
    this.$quantifier0 = null;
}
let jur_CompositeQuantifierSet__init_ = ($this, $quant, $innerSet, $next, $type) => {
    jur_LeafQuantifierSet__init_($this, $innerSet, $next, $type);
    $this.$quantifier0 = $quant;
},
jur_CompositeQuantifierSet__init_0 = (var_0, var_1, var_2, var_3) => {
    let var_4 = new jur_CompositeQuantifierSet();
    jur_CompositeQuantifierSet__init_(var_4, var_0, var_1, var_2, var_3);
    return var_4;
},
jur_CompositeQuantifierSet_matches = ($this, $stringIndex, $testString, $matchResult) => {
    let var$4, $min, $max, $i, $shift;
    var$4 = $this.$quantifier0;
    $min = var$4.$min0;
    $max = var$4.$max1;
    $i = 0;
    while (true) {
        if ($i >= $min) {
            a: {
                b: {
                    c: {
                        while ($i < $max) {
                            if (($stringIndex + $this.$leaf.$charCount() | 0) > $matchResult.$rightBound)
                                break b;
                            $shift = $this.$leaf.$accepts($stringIndex, $testString);
                            if ($shift < 1)
                                break c;
                            $stringIndex = $stringIndex + $shift | 0;
                            $i = $i + 1 | 0;
                        }
                        break a;
                    }
                    break a;
                }
            }
            while (true) {
                if ($i < $min)
                    return (-1);
                $shift = $this.$next2.$matches($stringIndex, $testString, $matchResult);
                if ($shift >= 0)
                    break;
                $stringIndex = $stringIndex - $this.$leaf.$charCount() | 0;
                $i = $i + (-1) | 0;
            }
            return $shift;
        }
        if (($stringIndex + $this.$leaf.$charCount() | 0) > $matchResult.$rightBound) {
            $matchResult.$hitEnd = 1;
            return (-1);
        }
        $shift = $this.$leaf.$accepts($stringIndex, $testString);
        if ($shift < 1)
            break;
        $stringIndex = $stringIndex + $shift | 0;
        $i = $i + 1 | 0;
    }
    return (-1);
},
jur_CompositeQuantifierSet_getName = $this => {
    return jur_Quantifier_toString($this.$quantifier0);
},
jur_GroupQuantifierSet = $rt_classWithoutFields(jur_QuantifierSet),
jur_GroupQuantifierSet_matches = ($this, $stringIndex, $testString, $matchResult) => {
    let $nextIndex;
    if ($this.$innerSet.$hasConsumed($matchResult)) {
        $nextIndex = $this.$innerSet.$matches($stringIndex, $testString, $matchResult);
        if ($nextIndex < 0)
            return $this.$next2.$matches($stringIndex, $testString, $matchResult);
        return $nextIndex;
    }
    return $this.$next2.$matches($stringIndex, $testString, $matchResult);
},
jur_GroupQuantifierSet_getName = $this => {
    return $rt_s(235);
},
jur_AltQuantifierSet = $rt_classWithoutFields(jur_LeafQuantifierSet),
jur_AltQuantifierSet_matches = ($this, $stringIndex, $testString, $matchResult) => {
    let $shift;
    $shift = $this.$innerSet.$matches($stringIndex, $testString, $matchResult);
    if ($shift < 0)
        $shift = $this.$next2.$matches($stringIndex, $testString, $matchResult);
    return $shift;
},
jur_AltQuantifierSet_setNext = ($this, $next) => {
    $this.$next2 = $next;
    $this.$innerSet.$setNext($next);
},
jur_UnifiedQuantifierSet = $rt_classWithoutFields(jur_LeafQuantifierSet),
jur_UnifiedQuantifierSet_matches = ($this, $stringIndex, $testString, $matchResult) => {
    while (($stringIndex + $this.$leaf.$charCount() | 0) <= $matchResult.$rightBound && $this.$leaf.$accepts($stringIndex, $testString) > 0) {
        $stringIndex = $stringIndex + $this.$leaf.$charCount() | 0;
    }
    return $this.$next2.$matches($stringIndex, $testString, $matchResult);
},
jur_UnifiedQuantifierSet_find = ($this, $stringIndex, $testString, $matchResult) => {
    let $startSearch, $newSearch, $newSearch_0;
    $startSearch = $this.$next2.$find1($stringIndex, $testString, $matchResult);
    if ($startSearch >= 0) {
        $newSearch = $startSearch - $this.$leaf.$charCount() | 0;
        while ($newSearch >= $stringIndex && $this.$leaf.$accepts($newSearch, $testString) > 0) {
            $newSearch_0 = $newSearch - $this.$leaf.$charCount() | 0;
            $startSearch = $newSearch;
            $newSearch = $newSearch_0;
        }
        return $startSearch;
    }
    return (-1);
};
function ju_Collections$13() {
    ju_AbstractMap.call(this);
    this.$val$m = null;
}
let jl_Math = $rt_classWithoutFields(),
jl_Math_floor = var$1 => {
    return Math.floor(var$1);
},
jl_Math_floorDiv = (var$1, $b) => {
    let var$3, var$4;
    var$3 = Long_fromInt($b);
    var$4 = Long_div(var$1, var$3);
    if (Long_lt(Long_xor(var$1, var$3), Long_ZERO) && Long_ne(Long_mul(var$4, var$3), var$1))
        var$4 = Long_sub(var$4, Long_fromInt(1));
    return var$4;
},
jl_Math_floorMod = ($a, $b) => {
    let var$3, var$4;
    var$3 = Long_fromInt($b);
    var$4 = Long_rem($a, var$3);
    if (Long_lt(Long_xor($a, var$3), Long_ZERO) && Long_ne(var$4, Long_ZERO))
        var$4 = Long_add(var$4, var$3);
    return Long_lo(var$4);
},
jl_Math_random = () => {
    return jl_Math_randomImpl();
},
jl_Math_randomImpl = () => {
    return Math.random();
},
jl_Math_min = ($a, $b) => {
    if ($a < $b)
        $b = $a;
    return $b;
},
jl_Math_max = ($a, $b) => {
    if ($a > $b)
        $b = $a;
    return $b;
},
jl_Math_abs = $n => {
    if ($n < 0)
        $n =  -$n | 0;
    return $n;
},
jur_AbstractCharClass$PredefinedCharacterClasses = $rt_classWithoutFields(),
jur_AbstractCharClass$PredefinedCharacterClasses_space = null,
jur_AbstractCharClass$PredefinedCharacterClasses_digit = null,
jur_AbstractCharClass$PredefinedCharacterClasses_contents = null,
jur_AbstractCharClass$PredefinedCharacterClasses_$callClinit = () => {
    jur_AbstractCharClass$PredefinedCharacterClasses_$callClinit = $rt_eraseClinit(jur_AbstractCharClass$PredefinedCharacterClasses);
    jur_AbstractCharClass$PredefinedCharacterClasses__clinit_();
},
jur_AbstractCharClass$PredefinedCharacterClasses__clinit_ = () => {
    let var$1, var$2, var$3, var$4;
    jur_AbstractCharClass$PredefinedCharacterClasses_space = jur_AbstractCharClass$LazySpace__init_();
    jur_AbstractCharClass$PredefinedCharacterClasses_digit = jur_AbstractCharClass$LazyDigit__init_0();
    var$1 = $rt_createArray($rt_arraycls(jl_Object), 194);
    var$2 = var$1.data;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(236);
    var$4[1] = jur_AbstractCharClass$LazyLower__init_0();
    var$2[0] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(237);
    var$4[1] = jur_AbstractCharClass$LazyUpper__init_();
    var$2[1] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(238);
    var$4[1] = jur_AbstractCharClass$LazyASCII__init_0();
    var$2[2] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(239);
    var$4[1] = jur_AbstractCharClass$LazyAlpha__init_0();
    var$2[3] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(240);
    var$4[1] = jur_AbstractCharClass$PredefinedCharacterClasses_digit;
    var$2[4] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(241);
    var$4[1] = jur_AbstractCharClass$LazyAlnum__init_();
    var$2[5] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(242);
    var$4[1] = jur_AbstractCharClass$LazyPunct__init_0();
    var$2[6] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(243);
    var$4[1] = jur_AbstractCharClass$LazyGraph__init_();
    var$2[7] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(244);
    var$4[1] = jur_AbstractCharClass$LazyPrint__init_();
    var$2[8] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(245);
    var$4[1] = jur_AbstractCharClass$LazyBlank__init_();
    var$2[9] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(246);
    var$4[1] = jur_AbstractCharClass$LazyCntrl__init_();
    var$2[10] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(247);
    var$4[1] = jur_AbstractCharClass$LazyXDigit__init_();
    var$2[11] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(248);
    var$4[1] = jur_AbstractCharClass$LazyJavaLowerCase__init_0();
    var$2[12] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(249);
    var$4[1] = jur_AbstractCharClass$LazyJavaUpperCase__init_();
    var$2[13] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(250);
    var$4[1] = jur_AbstractCharClass$LazyJavaWhitespace__init_0();
    var$2[14] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(251);
    var$4[1] = jur_AbstractCharClass$LazyJavaMirrored__init_0();
    var$2[15] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(252);
    var$4[1] = jur_AbstractCharClass$LazyJavaDefined__init_();
    var$2[16] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(253);
    var$4[1] = jur_AbstractCharClass$LazyJavaDigit__init_0();
    var$2[17] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(254);
    var$4[1] = jur_AbstractCharClass$LazyJavaIdentifierIgnorable__init_0();
    var$2[18] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(255);
    var$4[1] = jur_AbstractCharClass$LazyJavaISOControl__init_0();
    var$2[19] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(256);
    var$4[1] = jur_AbstractCharClass$LazyJavaJavaIdentifierPart__init_0();
    var$2[20] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(257);
    var$4[1] = jur_AbstractCharClass$LazyJavaJavaIdentifierStart__init_0();
    var$2[21] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(258);
    var$4[1] = jur_AbstractCharClass$LazyJavaLetter__init_();
    var$2[22] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(259);
    var$4[1] = jur_AbstractCharClass$LazyJavaLetterOrDigit__init_();
    var$2[23] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(260);
    var$4[1] = jur_AbstractCharClass$LazyJavaSpaceChar__init_0();
    var$2[24] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(261);
    var$4[1] = jur_AbstractCharClass$LazyJavaTitleCase__init_0();
    var$2[25] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(262);
    var$4[1] = jur_AbstractCharClass$LazyJavaUnicodeIdentifierPart__init_();
    var$2[26] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(263);
    var$4[1] = jur_AbstractCharClass$LazyJavaUnicodeIdentifierStart__init_();
    var$2[27] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(264);
    var$4[1] = jur_AbstractCharClass$PredefinedCharacterClasses_space;
    var$2[28] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(265);
    var$4[1] = jur_AbstractCharClass$LazyWord__init_();
    var$2[29] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(266);
    var$4[1] = jur_AbstractCharClass$LazyNonWord__init_();
    var$2[30] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(267);
    var$4[1] = jur_AbstractCharClass$PredefinedCharacterClasses_space;
    var$2[31] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(268);
    var$4[1] = jur_AbstractCharClass$LazyNonSpace__init_();
    var$2[32] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(269);
    var$4[1] = jur_AbstractCharClass$PredefinedCharacterClasses_digit;
    var$2[33] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(270);
    var$4[1] = jur_AbstractCharClass$LazyNonDigit__init_();
    var$2[34] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(271);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(0, 127);
    var$2[35] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(272);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(128, 255);
    var$2[36] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(273);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(256, 383);
    var$2[37] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(274);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(384, 591);
    var$2[38] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(275);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(592, 687);
    var$2[39] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(276);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(688, 767);
    var$2[40] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(277);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(768, 879);
    var$2[41] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(278);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(880, 1023);
    var$2[42] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(279);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(1024, 1279);
    var$2[43] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(280);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(1280, 1327);
    var$2[44] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(281);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(1328, 1423);
    var$2[45] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(282);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(1424, 1535);
    var$2[46] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(283);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(1536, 1791);
    var$2[47] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(284);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(1792, 1871);
    var$2[48] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(285);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(1872, 1919);
    var$2[49] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(286);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(1920, 1983);
    var$2[50] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(287);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(2304, 2431);
    var$2[51] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(288);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(2432, 2559);
    var$2[52] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(289);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(2560, 2687);
    var$2[53] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(290);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(2688, 2815);
    var$2[54] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(291);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(2816, 2943);
    var$2[55] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(292);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(2944, 3071);
    var$2[56] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(293);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(3072, 3199);
    var$2[57] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(294);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(3200, 3327);
    var$2[58] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(295);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(3328, 3455);
    var$2[59] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(296);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(3456, 3583);
    var$2[60] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(297);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(3584, 3711);
    var$2[61] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(298);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(3712, 3839);
    var$2[62] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(299);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(3840, 4095);
    var$2[63] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(300);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(4096, 4255);
    var$2[64] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(301);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(4256, 4351);
    var$2[65] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(302);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(4352, 4607);
    var$2[66] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(303);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(4608, 4991);
    var$2[67] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(304);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(4992, 5023);
    var$2[68] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(305);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(5024, 5119);
    var$2[69] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(306);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(5120, 5759);
    var$2[70] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(307);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(5760, 5791);
    var$2[71] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(308);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(5792, 5887);
    var$2[72] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(309);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(5888, 5919);
    var$2[73] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(310);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(5920, 5951);
    var$2[74] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(311);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(5952, 5983);
    var$2[75] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(312);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(5984, 6015);
    var$2[76] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(313);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(6016, 6143);
    var$2[77] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(314);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(6144, 6319);
    var$2[78] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(315);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(6400, 6479);
    var$2[79] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(316);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(6480, 6527);
    var$2[80] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(317);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(6528, 6623);
    var$2[81] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(318);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(6624, 6655);
    var$2[82] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(319);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(6656, 6687);
    var$2[83] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(320);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(7424, 7551);
    var$2[84] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(321);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(7552, 7615);
    var$2[85] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(322);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(7616, 7679);
    var$2[86] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(323);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(7680, 7935);
    var$2[87] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(324);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(7936, 8191);
    var$2[88] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(325);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(8192, 8303);
    var$2[89] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(326);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(8304, 8351);
    var$2[90] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(327);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(8352, 8399);
    var$2[91] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(328);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(8400, 8447);
    var$2[92] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(329);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(8448, 8527);
    var$2[93] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(330);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(8528, 8591);
    var$2[94] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(331);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(8592, 8703);
    var$2[95] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(332);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(8704, 8959);
    var$2[96] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(333);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(8960, 9215);
    var$2[97] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(334);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(9216, 9279);
    var$2[98] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(335);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(9280, 9311);
    var$2[99] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(336);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(9312, 9471);
    var$2[100] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(337);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(9472, 9599);
    var$2[101] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(338);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(9600, 9631);
    var$2[102] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(339);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(9632, 9727);
    var$2[103] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(340);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(9728, 9983);
    var$2[104] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(341);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(9984, 10175);
    var$2[105] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(342);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(10176, 10223);
    var$2[106] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(343);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(10224, 10239);
    var$2[107] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(344);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(10240, 10495);
    var$2[108] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(345);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(10496, 10623);
    var$2[109] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(346);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(10624, 10751);
    var$2[110] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(347);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(10752, 11007);
    var$2[111] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(348);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(11008, 11263);
    var$2[112] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(349);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(11264, 11359);
    var$2[113] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(350);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(11392, 11519);
    var$2[114] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(351);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(11520, 11567);
    var$2[115] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(352);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(11568, 11647);
    var$2[116] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(353);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(11648, 11743);
    var$2[117] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(354);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(11776, 11903);
    var$2[118] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(355);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(11904, 12031);
    var$2[119] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(356);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(12032, 12255);
    var$2[120] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(357);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(12272, 12287);
    var$2[121] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(358);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(12288, 12351);
    var$2[122] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(359);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(12352, 12447);
    var$2[123] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(360);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(12448, 12543);
    var$2[124] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(361);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(12544, 12591);
    var$2[125] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(362);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(12592, 12687);
    var$2[126] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(363);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(12688, 12703);
    var$2[127] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(364);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(12704, 12735);
    var$2[128] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(365);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(12736, 12783);
    var$2[129] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(366);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(12784, 12799);
    var$2[130] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(367);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(12800, 13055);
    var$2[131] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(368);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(13056, 13311);
    var$2[132] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(369);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(13312, 19893);
    var$2[133] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(370);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(19904, 19967);
    var$2[134] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(371);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(19968, 40959);
    var$2[135] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(372);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(40960, 42127);
    var$2[136] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(373);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(42128, 42191);
    var$2[137] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(374);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(42752, 42783);
    var$2[138] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(375);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(43008, 43055);
    var$2[139] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(376);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(44032, 55203);
    var$2[140] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(377);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(55296, 56191);
    var$2[141] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(378);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(56192, 56319);
    var$2[142] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(379);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(56320, 57343);
    var$2[143] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(380);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(57344, 63743);
    var$2[144] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(381);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(63744, 64255);
    var$2[145] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(382);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(64256, 64335);
    var$2[146] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(383);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(64336, 65023);
    var$2[147] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(384);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(65024, 65039);
    var$2[148] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(385);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(65040, 65055);
    var$2[149] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(386);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(65056, 65071);
    var$2[150] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(387);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(65072, 65103);
    var$2[151] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(388);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(65104, 65135);
    var$2[152] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(389);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(65136, 65279);
    var$2[153] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(390);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(65280, 65519);
    var$2[154] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(391);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(0, 1114111);
    var$2[155] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(392);
    var$4[1] = jur_AbstractCharClass$LazySpecialsBlock__init_();
    var$2[156] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(393);
    var$4[1] = jur_AbstractCharClass$LazyCategory__init_(0, 1);
    var$2[157] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(394);
    var$4[1] = jur_AbstractCharClass$LazyCategoryScope__init_(62, 1);
    var$2[158] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(395);
    var$4[1] = jur_AbstractCharClass$LazyCategory__init_(1, 1);
    var$2[159] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(396);
    var$4[1] = jur_AbstractCharClass$LazyCategory__init_(2, 1);
    var$2[160] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(397);
    var$4[1] = jur_AbstractCharClass$LazyCategory__init_(3, 0);
    var$2[161] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(398);
    var$4[1] = jur_AbstractCharClass$LazyCategory__init_(4, 0);
    var$2[162] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(399);
    var$4[1] = jur_AbstractCharClass$LazyCategory__init_(5, 1);
    var$2[163] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(400);
    var$4[1] = jur_AbstractCharClass$LazyCategoryScope__init_(448, 1);
    var$2[164] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(401);
    var$4[1] = jur_AbstractCharClass$LazyCategory__init_(6, 1);
    var$2[165] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(402);
    var$4[1] = jur_AbstractCharClass$LazyCategory__init_(7, 0);
    var$2[166] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(403);
    var$4[1] = jur_AbstractCharClass$LazyCategory__init_(8, 1);
    var$2[167] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(404);
    var$4[1] = jur_AbstractCharClass$LazyCategoryScope__init_(3584, 1);
    var$2[168] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(405);
    var$4[1] = jur_AbstractCharClass$LazyCategory__init_(9, 1);
    var$2[169] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(406);
    var$4[1] = jur_AbstractCharClass$LazyCategory__init_(10, 1);
    var$2[170] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(407);
    var$4[1] = jur_AbstractCharClass$LazyCategory__init_(11, 1);
    var$2[171] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(408);
    var$4[1] = jur_AbstractCharClass$LazyCategoryScope__init_(28672, 0);
    var$2[172] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(409);
    var$4[1] = jur_AbstractCharClass$LazyCategory__init_(12, 0);
    var$2[173] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(410);
    var$4[1] = jur_AbstractCharClass$LazyCategory__init_(13, 0);
    var$2[174] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(411);
    var$4[1] = jur_AbstractCharClass$LazyCategory__init_(14, 0);
    var$2[175] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(412);
    var$4[1] = jur_AbstractCharClass$LazyCategoryScope__init_2(983040, 1, 1);
    var$2[176] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(413);
    var$4[1] = jur_AbstractCharClass$LazyCategory__init_(15, 0);
    var$2[177] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(414);
    var$4[1] = jur_AbstractCharClass$LazyCategory__init_(16, 1);
    var$2[178] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(415);
    var$4[1] = jur_AbstractCharClass$LazyCategory__init_(18, 1);
    var$2[179] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(416);
    var$4[1] = jur_AbstractCharClass$LazyCategory__init_2(19, 0, 1);
    var$2[180] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(417);
    var$4[1] = jur_AbstractCharClass$LazyCategoryScope__init_(1643118592, 1);
    var$2[181] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(418);
    var$4[1] = jur_AbstractCharClass$LazyCategory__init_(20, 0);
    var$2[182] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(419);
    var$4[1] = jur_AbstractCharClass$LazyCategory__init_(21, 0);
    var$2[183] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(420);
    var$4[1] = jur_AbstractCharClass$LazyCategory__init_(22, 0);
    var$2[184] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(421);
    var$4[1] = jur_AbstractCharClass$LazyCategory__init_(23, 0);
    var$2[185] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(422);
    var$4[1] = jur_AbstractCharClass$LazyCategory__init_(24, 1);
    var$2[186] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(423);
    var$4[1] = jur_AbstractCharClass$LazyCategoryScope__init_(2113929216, 1);
    var$2[187] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(424);
    var$4[1] = jur_AbstractCharClass$LazyCategory__init_(25, 1);
    var$2[188] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(425);
    var$4[1] = jur_AbstractCharClass$LazyCategory__init_(26, 0);
    var$2[189] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(426);
    var$4[1] = jur_AbstractCharClass$LazyCategory__init_(27, 0);
    var$2[190] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(427);
    var$4[1] = jur_AbstractCharClass$LazyCategory__init_(28, 1);
    var$2[191] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(428);
    var$4[1] = jur_AbstractCharClass$LazyCategory__init_(29, 0);
    var$2[192] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(429);
    var$4[1] = jur_AbstractCharClass$LazyCategory__init_(30, 0);
    var$2[193] = var$3;
    jur_AbstractCharClass$PredefinedCharacterClasses_contents = var$1;
};
function jur_AbstractCharClass$LazyCharClass() {
    let a = this; jl_Object.call(a);
    a.$posValue = null;
    a.$negValue = null;
}
let jur_AbstractCharClass$LazyCharClass_getValue = ($this, $negative) => {
    if (!$negative && $this.$posValue === null)
        $this.$posValue = $this.$computeValue();
    else if ($negative && $this.$negValue === null)
        $this.$negValue = jur_AbstractCharClass_setNegative($this.$computeValue(), 1);
    if (!$negative)
        return $this.$posValue;
    return $this.$negValue;
},
jl_NumberFormatException = $rt_classWithoutFields(jl_IllegalArgumentException);
function jur_Quantifier() {
    let a = this; jur_SpecialToken.call(a);
    a.$min0 = 0;
    a.$max1 = 0;
}
let jur_Quantifier_toString = $this => {
    let var$1, var$2, var$3, var$4, var$5;
    var$1 = $this.$min0;
    var$2 = $this.$max1;
    var$3 = var$2 != 2147483647 ? jl_Integer_toString(var$2) : $rt_s(3);
    var$4 = new jl_StringBuilder;
    jl_AbstractStringBuilder__init_(var$4);
    jl_AbstractStringBuilder_append(var$4, 123);
    var$5 = jl_StringBuilder_append0(var$4, var$1);
    jl_AbstractStringBuilder_append(var$5, 44);
    jl_AbstractStringBuilder_append(jl_StringBuilder_append(var$5, var$3), 125);
    return jl_AbstractStringBuilder_toString(var$4);
},
jur_FSet$PossessiveFSet = $rt_classWithoutFields(jur_AbstractSet),
jur_FSet$PossessiveFSet_matches = ($this, $stringIndex, $testString, $matchResult) => {
    return $stringIndex;
},
jur_FSet$PossessiveFSet_getName = $this => {
    return $rt_s(430);
},
jur_FSet$PossessiveFSet_hasConsumed = ($this, $mr) => {
    return 0;
};
function ju_BitSet() {
    let a = this; jl_Object.call(a);
    a.$data = null;
    a.$length1 = 0;
}
let ju_BitSet__init_0 = $this => {
    $this.$data = $rt_createIntArray(2);
},
ju_BitSet__init_ = () => {
    let var_0 = new ju_BitSet();
    ju_BitSet__init_0(var_0);
    return var_0;
},
ju_BitSet_set0 = ($this, $bitIndex) => {
    let $index, var$3, var$4;
    if ($bitIndex >= 0) {
        $index = $bitIndex / 32 | 0;
        if ($bitIndex >= $this.$length1) {
            ju_BitSet_ensureCapacity($this, $index + 1 | 0);
            $this.$length1 = $bitIndex + 1 | 0;
        }
        var$3 = $this.$data.data;
        var$3[$index] = var$3[$index] | 1 << ($bitIndex % 32 | 0);
        return;
    }
    var$4 = new jl_IndexOutOfBoundsException;
    jl_Throwable__init_0(var$4);
    $rt_throw(var$4);
},
ju_BitSet_set = ($this, $fromIndex, $toIndex) => {
    let $fromDataIndex, $toDataIndex, var$5, $i, var$7;
    if ($fromIndex >= 0) {
        $fromDataIndex = $rt_compare($fromIndex, $toIndex);
        if ($fromDataIndex <= 0) {
            if ($fromDataIndex) {
                $fromDataIndex = $fromIndex / 32 | 0;
                $toDataIndex = $toIndex / 32 | 0;
                if ($toIndex > $this.$length1) {
                    ju_BitSet_ensureCapacity($this, $toDataIndex + 1 | 0);
                    $this.$length1 = $toIndex;
                }
                if ($fromDataIndex == $toDataIndex) {
                    var$5 = $this.$data.data;
                    var$5[$fromDataIndex] = var$5[$fromDataIndex] | ju_BitSet_trailingZeroBits($this, $fromIndex) & ju_BitSet_trailingOneBits($this, $toIndex);
                } else {
                    var$5 = $this.$data.data;
                    var$5[$fromDataIndex] = var$5[$fromDataIndex] | ju_BitSet_trailingZeroBits($this, $fromIndex);
                    $i = $fromDataIndex + 1 | 0;
                    while ($i < $toDataIndex) {
                        $this.$data.data[$i] = (-1);
                        $i = $i + 1 | 0;
                    }
                    if ($toIndex & 31) {
                        var$5 = $this.$data.data;
                        var$5[$toDataIndex] = var$5[$toDataIndex] | ju_BitSet_trailingOneBits($this, $toIndex);
                    }
                }
                return;
            }
            return;
        }
    }
    var$7 = new jl_IndexOutOfBoundsException;
    jl_Throwable__init_0(var$7);
    $rt_throw(var$7);
},
ju_BitSet_trailingZeroBits = ($this, $num) => {
    return (-1) << ($num % 32 | 0);
},
ju_BitSet_trailingOneBits = ($this, $num) => {
    $num = $num % 32 | 0;
    return !$num ? 0 : (-1) >>> (32 - $num | 0) | 0;
},
ju_BitSet_clear = ($this, $bitIndex) => {
    let $index, var$3, var$4, var$5, var$6, var$7;
    if ($bitIndex >= 0) {
        $index = $bitIndex / 32 | 0;
        var$3 = $this.$data.data;
        if ($index < var$3.length) {
            var$4 = var$3[$index];
            var$5 = $bitIndex % 32 | 0;
            jl_Integer_$callClinit();
            var$6 = var$5 & 31;
            var$3[$index] = var$4 & ((-2) << var$6 | ((-2) >>> (32 - var$6 | 0) | 0));
            if ($bitIndex == ($this.$length1 - 1 | 0))
                ju_BitSet_recalculateLength($this);
        }
        return;
    }
    var$7 = new jl_IndexOutOfBoundsException;
    jl_Throwable__init_0(var$7);
    $rt_throw(var$7);
},
ju_BitSet_get = ($this, $bitIndex) => {
    let $index, var$3, var$4;
    if ($bitIndex >= 0) {
        $index = $bitIndex / 32 | 0;
        var$3 = $this.$data.data;
        return !($index < var$3.length && var$3[$index] & 1 << ($bitIndex % 32 | 0)) ? 0 : 1;
    }
    var$4 = new jl_IndexOutOfBoundsException;
    jl_Throwable__init_0(var$4);
    $rt_throw(var$4);
},
ju_BitSet_nextSetBit = ($this, $fromIndex) => {
    let $top, $index, var$4, $i, var$6;
    if ($fromIndex >= 0) {
        $top = $this.$length1;
        if ($fromIndex < $top) {
            $index = $fromIndex / 32 | 0;
            var$4 = $this.$data.data;
            $i = var$4[$index] >>> ($fromIndex % 32 | 0) | 0;
            if (!$i) {
                $top = ($top + 31 | 0) / 32 | 0;
                $i = $index + 1 | 0;
                while ($i < $top) {
                    if (var$4[$i])
                        return ($i * 32 | 0) + jl_Integer_numberOfTrailingZeros(var$4[$i]) | 0;
                    $i = $i + 1 | 0;
                }
                return (-1);
            }
            return jl_Integer_numberOfTrailingZeros($i) + $fromIndex | 0;
        }
        return (-1);
    }
    var$6 = new jl_IndexOutOfBoundsException;
    jl_Throwable__init_0(var$6);
    $rt_throw(var$6);
},
ju_BitSet_ensureCapacity = ($this, $capacity) => {
    let $newArrayLength, var$3, var$4, var$5;
    $newArrayLength = $this.$data.data.length;
    if ($newArrayLength < $capacity) {
        $newArrayLength = jl_Math_max(($capacity * 3 | 0) / 2 | 0, ($newArrayLength * 2 | 0) + 1 | 0);
        var$3 = $this.$data.data;
        var$4 = $rt_createIntArray($newArrayLength);
        var$5 = var$4.data;
        $capacity = jl_Math_min($newArrayLength, var$3.length);
        $newArrayLength = 0;
        while ($newArrayLength < $capacity) {
            var$5[$newArrayLength] = var$3[$newArrayLength];
            $newArrayLength = $newArrayLength + 1 | 0;
        }
        $this.$data = var$4;
        return;
    }
},
ju_BitSet_recalculateLength = $this => {
    let $top, $i, $sz;
    $top = ($this.$length1 + 31 | 0) / 32 | 0;
    $this.$length1 = $top * 32 | 0;
    $i = $top - 1 | 0;
    a: {
        while (true) {
            if ($i < 0)
                break a;
            $sz = jl_Integer_numberOfLeadingZeros($this.$data.data[$i]);
            if ($sz < 32)
                break;
            $i = $i + (-1) | 0;
            $this.$length1 = $this.$length1 - 32 | 0;
        }
        $this.$length1 = $this.$length1 - $sz | 0;
    }
},
ju_BitSet_and = ($this, $set) => {
    let $i, $i_0, var$4, var$5;
    $i = jl_Math_min($this.$data.data.length, $set.$data.data.length);
    $i_0 = 0;
    while ($i_0 < $i) {
        var$4 = $this.$data.data;
        var$4[$i_0] = var$4[$i_0] & $set.$data.data[$i_0];
        $i_0 = $i_0 + 1 | 0;
    }
    while (true) {
        var$5 = $this.$data.data;
        if ($i >= var$5.length)
            break;
        var$5[$i] = 0;
        $i = $i + 1 | 0;
    }
    $this.$length1 = jl_Math_min($this.$length1, $set.$length1);
    ju_BitSet_recalculateLength($this);
},
ju_BitSet_andNot = ($this, $set) => {
    let $sz, $i, var$4;
    $sz = jl_Math_min($this.$data.data.length, $set.$data.data.length);
    $i = 0;
    while ($i < $sz) {
        var$4 = $this.$data.data;
        var$4[$i] = var$4[$i] & ($set.$data.data[$i] ^ (-1));
        $i = $i + 1 | 0;
    }
    ju_BitSet_recalculateLength($this);
},
ju_BitSet_or = ($this, $set) => {
    let $sz, $i, var$4;
    $sz = jl_Math_max($this.$length1, $set.$length1);
    $this.$length1 = $sz;
    ju_BitSet_ensureCapacity($this, ($sz + 31 | 0) / 32 | 0);
    $sz = jl_Math_min($this.$data.data.length, $set.$data.data.length);
    $i = 0;
    while ($i < $sz) {
        var$4 = $this.$data.data;
        var$4[$i] = var$4[$i] | $set.$data.data[$i];
        $i = $i + 1 | 0;
    }
},
ju_BitSet_xor = ($this, $set) => {
    let $sz, $i, var$4;
    $sz = jl_Math_max($this.$length1, $set.$length1);
    $this.$length1 = $sz;
    ju_BitSet_ensureCapacity($this, ($sz + 31 | 0) / 32 | 0);
    $sz = jl_Math_min($this.$data.data.length, $set.$data.data.length);
    $i = 0;
    while ($i < $sz) {
        var$4 = $this.$data.data;
        var$4[$i] = var$4[$i] ^ $set.$data.data[$i];
        $i = $i + 1 | 0;
    }
    ju_BitSet_recalculateLength($this);
},
ju_BitSet_isEmpty = $this => {
    return $this.$length1 ? 0 : 1;
};
function jur_LowHighSurrogateRangeSet() {
    let a = this; jur_JointSet.call(a);
    a.$surrChars = null;
    a.$alt1 = 0;
}
let jur_LowHighSurrogateRangeSet_getName = $this => {
    let var$1, var$2, var$3;
    var$1 = !$this.$alt1 ? $rt_s(431) : $rt_s(432);
    var$2 = $this.$surrChars.$toString();
    var$3 = new jl_StringBuilder;
    jl_AbstractStringBuilder__init_(var$3);
    jl_StringBuilder_append(jl_StringBuilder_append(jl_StringBuilder_append(var$3, $rt_s(433)), var$1), var$2);
    return jl_AbstractStringBuilder_toString(var$3);
};
function jur_CompositeRangeSet() {
    let a = this; jur_JointSet.call(a);
    a.$withoutSurrogates = null;
    a.$withSurrogates = null;
}
let jur_CompositeRangeSet__init_0 = ($this, $withoutSurrogates, $withSurrogates) => {
    jur_AbstractSet__init_($this);
    $this.$withoutSurrogates = $withoutSurrogates;
    $this.$withSurrogates = $withSurrogates;
},
jur_CompositeRangeSet__init_ = (var_0, var_1) => {
    let var_2 = new jur_CompositeRangeSet();
    jur_CompositeRangeSet__init_0(var_2, var_0, var_1);
    return var_2;
},
jur_CompositeRangeSet_matches = ($this, $stringIndex, $testString, $matchResult) => {
    let $shift, var$5, var$6, var$7, var$8, var$9;
    $shift = $this.$withoutSurrogates.$matches($stringIndex, $testString, $matchResult);
    if ($shift < 0)
        a: {
            var$5 = $this.$withSurrogates;
            var$6 = $matchResult.$leftBound;
            $shift = $matchResult.$rightBound;
            var$7 = $stringIndex + 1 | 0;
            $shift = $rt_compare(var$7, $shift);
            if ($shift > 0) {
                $matchResult.$hitEnd = 1;
                $shift = (-1);
            } else {
                var$8 = $testString;
                var$9 = jl_String_charAt(var$8, $stringIndex);
                if (!var$5.$surrChars.$contains0(var$9))
                    $shift = (-1);
                else {
                    if (jl_Character_isHighSurrogate(var$9)) {
                        if ($shift < 0 && jl_Character_isLowSurrogate(jl_String_charAt(var$8, var$7))) {
                            $shift = (-1);
                            break a;
                        }
                    } else if (jl_Character_isLowSurrogate(var$9) && $stringIndex > var$6 && jl_Character_isHighSurrogate(jl_String_charAt(var$8, $stringIndex - 1 | 0))) {
                        $shift = (-1);
                        break a;
                    }
                    $shift = var$5.$next2.$matches(var$7, $testString, $matchResult);
                }
            }
        }
    if ($shift < 0)
        return (-1);
    return $shift;
},
jur_CompositeRangeSet_setNext = ($this, $next) => {
    $this.$next2 = $next;
    $this.$withSurrogates.$next2 = $next;
    $this.$withoutSurrogates.$setNext($next);
},
jur_CompositeRangeSet_getName = $this => {
    let var$1, var$2, var$3;
    var$1 = jl_String_valueOf($this.$withoutSurrogates);
    var$2 = jl_String_valueOf($this.$withSurrogates);
    var$3 = new jl_StringBuilder;
    jl_AbstractStringBuilder__init_(var$3);
    jl_StringBuilder_append(jl_StringBuilder_append(jl_StringBuilder_append(jl_StringBuilder_append(var$3, $rt_s(434)), var$1), $rt_s(435)), var$2);
    return jl_AbstractStringBuilder_toString(var$3);
},
jur_CompositeRangeSet_hasConsumed = ($this, $matchResult) => {
    return 1;
},
jur_CompositeRangeSet_first = ($this, $set) => {
    return 1;
};
function jur_SupplRangeSet() {
    let a = this; jur_JointSet.call(a);
    a.$chars = null;
    a.$alt0 = 0;
}
let jur_SupplRangeSet__init_ = ($this, $cc) => {
    jur_AbstractSet__init_($this);
    $this.$chars = $cc.$getInstance0();
    $this.$alt0 = $cc.$alt;
},
jur_SupplRangeSet__init_0 = var_0 => {
    let var_1 = new jur_SupplRangeSet();
    jur_SupplRangeSet__init_(var_1, var_0);
    return var_1;
},
jur_SupplRangeSet_matches = ($this, $stringIndex, $testString, $matchResult) => {
    let $strLength, $low, var$6, $high, $offset;
    $strLength = $matchResult.$rightBound;
    if ($stringIndex < $strLength) {
        $low = $stringIndex + 1 | 0;
        var$6 = $testString;
        $high = jl_String_charAt(var$6, $stringIndex);
        if ($this.$contains0($high)) {
            $offset = $this.$next2.$matches($low, $testString, $matchResult);
            if ($offset > 0)
                return $offset;
        }
        if ($low < $strLength) {
            $stringIndex = $low + 1 | 0;
            $low = jl_String_charAt(var$6, $low);
            if (jl_Character_isSurrogatePair($high, $low) && $this.$contains0(jl_Character_toCodePoint($high, $low)))
                return $this.$next2.$matches($stringIndex, $testString, $matchResult);
        }
    }
    return (-1);
},
jur_SupplRangeSet_getName = $this => {
    let var$1, var$2, var$3;
    var$1 = !$this.$alt0 ? $rt_s(431) : $rt_s(432);
    var$2 = $this.$chars.$toString();
    var$3 = new jl_StringBuilder;
    jl_AbstractStringBuilder__init_(var$3);
    jl_StringBuilder_append(jl_StringBuilder_append(jl_StringBuilder_append(var$3, $rt_s(433)), var$1), var$2);
    return jl_AbstractStringBuilder_toString(var$3);
},
jur_SupplRangeSet_contains = ($this, $ch) => {
    return $this.$chars.$contains0($ch);
},
jur_SupplRangeSet_first = ($this, $set) => {
    if (!($set instanceof jur_SupplCharSet)) {
        if (!($set instanceof jur_CharSet)) {
            if (!($set instanceof jur_SupplRangeSet)) {
                if ($set instanceof jur_RangeSet)
                    return jur_AbstractCharClass_intersects($this.$chars, $set.$chars0);
                return 1;
            }
            return jur_AbstractCharClass_intersects($this.$chars, $set.$chars);
        }
        return jur_AbstractCharClass_intersects0($this.$chars, $set.$ch0);
    }
    return jur_AbstractCharClass_intersects0($this.$chars, $set.$ch1);
},
jur_SupplRangeSet_getChars = $this => {
    return $this.$chars;
},
jur_SupplRangeSet_setNext = ($this, $next) => {
    $this.$next2 = $next;
},
jur_SupplRangeSet_hasConsumed = ($this, $mr) => {
    return 1;
},
jur_UCISupplRangeSet = $rt_classWithoutFields(jur_SupplRangeSet),
jur_UCISupplRangeSet_contains = ($this, $ch) => {
    return $this.$chars.$contains0(jl_Character_toLowerCase0(jl_Character_toUpperCase0($ch)));
},
jur_UCISupplRangeSet_getName = $this => {
    let var$1, var$2, var$3;
    var$1 = !$this.$alt0 ? $rt_s(431) : $rt_s(432);
    var$2 = $this.$chars.$toString();
    var$3 = new jl_StringBuilder;
    jl_AbstractStringBuilder__init_(var$3);
    jl_StringBuilder_append(jl_StringBuilder_append(jl_StringBuilder_append(var$3, $rt_s(436)), var$1), var$2);
    return jl_AbstractStringBuilder_toString(var$3);
};
function jur_UCIRangeSet() {
    let a = this; jur_LeafSet.call(a);
    a.$chars1 = null;
    a.$alt3 = 0;
}
let jur_UCIRangeSet__init_0 = ($this, $cc) => {
    jur_LeafSet__init_($this);
    $this.$chars1 = $cc.$getInstance0();
    $this.$alt3 = $cc.$alt;
},
jur_UCIRangeSet__init_ = var_0 => {
    let var_1 = new jur_UCIRangeSet();
    jur_UCIRangeSet__init_0(var_1, var_0);
    return var_1;
},
jur_UCIRangeSet_accepts = ($this, $strIndex, $testString) => {
    return !$this.$chars1.$contains0(jl_Character_toLowerCase(jl_Character_toUpperCase(jl_String_charAt($testString, $strIndex)))) ? (-1) : 1;
},
jur_UCIRangeSet_getName = $this => {
    let var$1, var$2, var$3;
    var$1 = !$this.$alt3 ? $rt_s(431) : $rt_s(432);
    var$2 = $this.$chars1.$toString();
    var$3 = new jl_StringBuilder;
    jl_AbstractStringBuilder__init_(var$3);
    jl_StringBuilder_append(jl_StringBuilder_append(jl_StringBuilder_append(var$3, $rt_s(436)), var$1), var$2);
    return jl_AbstractStringBuilder_toString(var$3);
};
function jur_RangeSet() {
    let a = this; jur_LeafSet.call(a);
    a.$chars0 = null;
    a.$alt2 = 0;
}
let jur_RangeSet__init_0 = ($this, $cc) => {
    jur_LeafSet__init_($this);
    $this.$chars0 = $cc.$getInstance0();
    $this.$alt2 = $cc.$alt;
},
jur_RangeSet__init_ = var_0 => {
    let var_1 = new jur_RangeSet();
    jur_RangeSet__init_0(var_1, var_0);
    return var_1;
},
jur_RangeSet_accepts = ($this, $strIndex, $testString) => {
    return !$this.$chars0.$contains0(jl_String_charAt($testString, $strIndex)) ? (-1) : 1;
},
jur_RangeSet_getName = $this => {
    let var$1, var$2, var$3;
    var$1 = !$this.$alt2 ? $rt_s(431) : $rt_s(432);
    var$2 = $this.$chars0.$toString();
    var$3 = new jl_StringBuilder;
    jl_AbstractStringBuilder__init_(var$3);
    jl_StringBuilder_append(jl_StringBuilder_append(jl_StringBuilder_append(var$3, $rt_s(433)), var$1), var$2);
    return jl_AbstractStringBuilder_toString(var$3);
},
jur_RangeSet_first = ($this, $set) => {
    if (!($set instanceof jur_CharSet)) {
        if (!($set instanceof jur_RangeSet)) {
            if ($set instanceof jur_SupplRangeSet)
                return jur_AbstractCharClass_intersects($this.$chars0, $set.$chars);
            if ($set instanceof jur_SupplCharSet)
                return 0;
            return 1;
        }
        return jur_AbstractCharClass_intersects($this.$chars0, $set.$chars0);
    }
    return jur_AbstractCharClass_intersects0($this.$chars0, $set.$ch0);
};
function jur_HangulDecomposedCharSet() {
    let a = this; jur_JointSet.call(a);
    a.$decomposedChar = null;
    a.$decomposedCharUTF16 = null;
    a.$decomposedCharLength = 0;
}
let jur_HangulDecomposedCharSet__init_0 = ($this, $decomposedChar, $decomposedCharLength) => {
    jur_AbstractSet__init_($this);
    $this.$decomposedChar = $decomposedChar;
    $this.$decomposedCharLength = $decomposedCharLength;
},
jur_HangulDecomposedCharSet__init_ = (var_0, var_1) => {
    let var_2 = new jur_HangulDecomposedCharSet();
    jur_HangulDecomposedCharSet__init_0(var_2, var_0, var_1);
    return var_2;
},
jur_HangulDecomposedCharSet_setNext = ($this, $next) => {
    $this.$next2 = $next;
},
jur_HangulDecomposedCharSet_getDecomposedChar = $this => {
    if ($this.$decomposedCharUTF16 === null)
        $this.$decomposedCharUTF16 = jl_String__init_($this.$decomposedChar);
    return $this.$decomposedCharUTF16;
},
jur_HangulDecomposedCharSet_getName = $this => {
    let var$1, var$2;
    var$1 = jur_HangulDecomposedCharSet_getDecomposedChar($this);
    var$2 = new jl_StringBuilder;
    jl_AbstractStringBuilder__init_(var$2);
    jl_StringBuilder_append(jl_StringBuilder_append(var$2, $rt_s(437)), var$1);
    return jl_AbstractStringBuilder_toString(var$2);
},
jur_HangulDecomposedCharSet_matches = ($this, $strIndex, $testString, $matchResult) => {
    let $rightBound, $decompSyllable, $vIndex, $tIndex, var$8, var$9, $curSymb, $i, $decompCurSymb, var$13, $lIndex, var$15, $syllIndex;
    $rightBound = $matchResult.$rightBound;
    $decompSyllable = $rt_createIntArray(3);
    $vIndex = (-1);
    $tIndex = (-1);
    if ($strIndex < $rightBound) {
        var$8 = $strIndex + 1 | 0;
        var$9 = $testString;
        $curSymb = jl_String_charAt(var$9, $strIndex);
        $i = $curSymb - 44032 | 0;
        if (!($i >= 0 && $i < 11172))
            $decompCurSymb = null;
        else {
            var$13 = 4352 + ($i / 588 | 0) | 0;
            $lIndex = 4449 + (($i % 588 | 0) / 28 | 0) | 0;
            $strIndex = $i % 28 | 0;
            $decompCurSymb = !$strIndex ? $rt_createIntArrayFromData([var$13, $lIndex]) : $rt_createIntArrayFromData([var$13, $lIndex, 4519 + $strIndex | 0]);
        }
        if ($decompCurSymb === null) {
            $decompSyllable = $decompSyllable.data;
            $decompSyllable[0] = $curSymb;
            $lIndex = $curSymb - 4352 | 0;
            if ($lIndex >= 0 && $lIndex < 19) {
                if (var$8 < $rightBound) {
                    $curSymb = jl_String_charAt(var$9, var$8);
                    $vIndex = $curSymb - 4449 | 0;
                }
                if ($vIndex >= 0 && $vIndex < 21) {
                    $lIndex = var$8 + 1 | 0;
                    $decompSyllable[1] = $curSymb;
                    if ($lIndex < $rightBound) {
                        $curSymb = jl_String_charAt(var$9, $lIndex);
                        $tIndex = $curSymb - 4519 | 0;
                    }
                    if ($tIndex >= 0 && $tIndex < 28) {
                        a: {
                            b: {
                                $strIndex = $lIndex + 1 | 0;
                                $decompSyllable[2] = $curSymb;
                                if ($this.$decomposedCharLength == 3) {
                                    $lIndex = $decompSyllable[0];
                                    var$15 = $this.$decomposedChar.data;
                                    if ($lIndex == var$15[0] && $decompSyllable[1] == var$15[1] && $decompSyllable[2] == var$15[2])
                                        break b;
                                }
                                $strIndex = (-1);
                                break a;
                            }
                            $strIndex = $this.$next2.$matches($strIndex, $testString, $matchResult);
                        }
                        return $strIndex;
                    }
                    c: {
                        d: {
                            if ($this.$decomposedCharLength == 2) {
                                $syllIndex = $decompSyllable[0];
                                var$15 = $this.$decomposedChar.data;
                                if ($syllIndex == var$15[0] && $decompSyllable[1] == var$15[1])
                                    break d;
                            }
                            $strIndex = (-1);
                            break c;
                        }
                        $strIndex = $this.$next2.$matches($lIndex, $testString, $matchResult);
                    }
                    return $strIndex;
                }
                return (-1);
            }
            return (-1);
        }
        var$15 = $decompCurSymb.data;
        $i = 0;
        $strIndex = var$15.length;
        $syllIndex = $this.$decomposedCharLength;
        if ($strIndex == $syllIndex) {
            while (true) {
                if ($i >= $syllIndex)
                    return $this.$next2.$matches(var$8, $testString, $matchResult);
                if (var$15[$i] != $this.$decomposedChar.data[$i])
                    break;
                $i = $i + 1 | 0;
            }
            return (-1);
        }
        return (-1);
    }
    return (-1);
},
jur_HangulDecomposedCharSet_first = ($this, $set) => {
    return !($set instanceof jur_HangulDecomposedCharSet && !jl_String_equals(jur_HangulDecomposedCharSet_getDecomposedChar($set), jur_HangulDecomposedCharSet_getDecomposedChar($this))) ? 1 : 0;
},
jur_HangulDecomposedCharSet_hasConsumed = ($this, $matchResult) => {
    return 1;
};
function jur_CharSet() {
    jur_LeafSet.call(this);
    this.$ch0 = 0;
}
let jur_CharSet__init_0 = ($this, $ch) => {
    jur_LeafSet__init_($this);
    $this.$ch0 = $ch;
},
jur_CharSet__init_ = var_0 => {
    let var_1 = new jur_CharSet();
    jur_CharSet__init_0(var_1, var_0);
    return var_1;
},
jur_CharSet_charCount = $this => {
    return 1;
},
jur_CharSet_accepts = ($this, $strIndex, $testString) => {
    return $this.$ch0 != jl_String_charAt($testString, $strIndex) ? (-1) : 1;
},
jur_CharSet_find = ($this, $strIndex, $testString, $matchResult) => {
    let $testStr, $strLength, var$6, var$7;
    if ($testString instanceof jl_String) {
        $testStr = $testString;
        $strLength = $matchResult.$rightBound;
        while (true) {
            if ($strIndex >= $strLength)
                return (-1);
            var$6 = jl_String_indexOf($testStr, $this.$ch0, $strIndex);
            if (var$6 < 0)
                return (-1);
            var$7 = $this.$next2;
            $strIndex = var$6 + 1 | 0;
            if (var$7.$matches($strIndex, $testString, $matchResult) >= 0)
                break;
        }
        return var$6;
    }
    return jur_AbstractSet_find($this, $strIndex, $testString, $matchResult);
},
jur_CharSet_findBack = ($this, $strIndex, $lastIndex, $testString, $matchResult) => {
    let $testStr, var$6;
    if ($testString instanceof jl_String) {
        $testStr = $testString;
        a: {
            while (true) {
                if ($lastIndex < $strIndex)
                    return (-1);
                var$6 = jl_String_lastIndexOf($testStr, $this.$ch0, $lastIndex);
                if (var$6 < 0)
                    break a;
                if (var$6 < $strIndex)
                    break a;
                if ($this.$next2.$matches(var$6 + 1 | 0, $testString, $matchResult) >= 0)
                    break;
                $lastIndex = var$6 + (-1) | 0;
            }
            return var$6;
        }
        return (-1);
    }
    return jur_AbstractSet_findBack($this, $strIndex, $lastIndex, $testString, $matchResult);
},
jur_CharSet_getName = $this => {
    let var$1, var$2;
    var$1 = $this.$ch0;
    var$2 = new jl_StringBuilder;
    jl_AbstractStringBuilder__init_(var$2);
    jl_AbstractStringBuilder_append(var$2, var$1);
    return jl_AbstractStringBuilder_toString(var$2);
},
jur_CharSet_first = ($this, $set) => {
    if (!($set instanceof jur_CharSet)) {
        if ($set instanceof jur_RangeSet)
            return jur_RangeSet_accepts($set, 0, jl_Character_toString($this.$ch0)) <= 0 ? 0 : 1;
        if (!($set instanceof jur_SupplRangeSet)) {
            if ($set instanceof jur_SupplCharSet)
                return 0;
            return 1;
        }
        return $set.$contains0($this.$ch0);
    }
    return $set.$ch0 != $this.$ch0 ? 0 : 1;
};
function jur_UCICharSet() {
    jur_LeafSet.call(this);
    this.$ch2 = 0;
}
let jur_UCICharSet__init_0 = ($this, $ch) => {
    jur_LeafSet__init_($this);
    $this.$ch2 = jl_Character_toLowerCase(jl_Character_toUpperCase($ch));
},
jur_UCICharSet__init_ = var_0 => {
    let var_1 = new jur_UCICharSet();
    jur_UCICharSet__init_0(var_1, var_0);
    return var_1;
},
jur_UCICharSet_accepts = ($this, $strIndex, $testString) => {
    return $this.$ch2 != jl_Character_toLowerCase(jl_Character_toUpperCase(jl_String_charAt($testString, $strIndex))) ? (-1) : 1;
},
jur_UCICharSet_getName = $this => {
    let var$1, var$2;
    var$1 = $this.$ch2;
    var$2 = new jl_StringBuilder;
    jl_AbstractStringBuilder__init_(var$2);
    jl_AbstractStringBuilder_append(jl_StringBuilder_append(var$2, $rt_s(438)), var$1);
    return jl_AbstractStringBuilder_toString(var$2);
};
function jur_CICharSet() {
    let a = this; jur_LeafSet.call(a);
    a.$ch3 = 0;
    a.$supplement = 0;
}
let jur_CICharSet__init_0 = ($this, $ch) => {
    jur_LeafSet__init_($this);
    $this.$ch3 = $ch;
    $this.$supplement = jur_Pattern_getSupplement($ch);
},
jur_CICharSet__init_ = var_0 => {
    let var_1 = new jur_CICharSet();
    jur_CICharSet__init_0(var_1, var_0);
    return var_1;
},
jur_CICharSet_accepts = ($this, $strIndex, $testString) => {
    let var$3;
    var$3 = $this.$ch3;
    $testString = $testString;
    return !(var$3 != jl_String_charAt($testString, $strIndex) && $this.$supplement != jl_String_charAt($testString, $strIndex)) ? 1 : (-1);
},
jur_CICharSet_getName = $this => {
    let var$1, var$2;
    var$1 = $this.$ch3;
    var$2 = new jl_StringBuilder;
    jl_AbstractStringBuilder__init_(var$2);
    jl_AbstractStringBuilder_append(jl_StringBuilder_append(var$2, $rt_s(439)), var$1);
    return jl_AbstractStringBuilder_toString(var$2);
};
function jur_DecomposedCharSet() {
    let a = this; jur_JointSet.call(a);
    a.$readCharsForCodePoint = 0;
    a.$decomposedCharUTF160 = null;
    a.$decomposedChar0 = null;
    a.$decomposedCharLength0 = 0;
}
let jur_DecomposedCharSet__init_ = ($this, $decomposedChar, $decomposedCharLength) => {
    jur_AbstractSet__init_($this);
    $this.$readCharsForCodePoint = 1;
    $this.$decomposedChar0 = $decomposedChar;
    $this.$decomposedCharLength0 = $decomposedCharLength;
},
jur_DecomposedCharSet__init_0 = (var_0, var_1) => {
    let var_2 = new jur_DecomposedCharSet();
    jur_DecomposedCharSet__init_(var_2, var_0, var_1);
    return var_2;
},
jur_DecomposedCharSet_setNext = ($this, $next) => {
    $this.$next2 = $next;
},
jur_DecomposedCharSet_matches = ($this, $strIndex, $testString, $matchResult) => {
    let $decCodePoint, $rightBound, $curChar, var$7, $decCurCodePoint, var$9, var$10, $readCodePoints;
    $decCodePoint = $rt_createIntArray(4);
    $rightBound = $matchResult.$rightBound;
    if ($strIndex < $rightBound) {
        $curChar = jur_DecomposedCharSet_codePointAt($this, $strIndex, $testString, $rightBound);
        var$7 = $strIndex + $this.$readCharsForCodePoint | 0;
        $decCurCodePoint = jur_Lexer_getDecomposition($curChar);
        if ($decCurCodePoint === null) {
            $decCurCodePoint = $decCodePoint.data;
            $strIndex = 1;
            $decCurCodePoint[0] = $curChar;
        } else {
            $strIndex = $decCurCodePoint.data.length;
            jl_System_fastArraycopy($decCurCodePoint, 0, $decCodePoint, 0, $strIndex);
            $strIndex = 0 + $strIndex | 0;
        }
        a: {
            if (var$7 < $rightBound) {
                var$9 = $decCodePoint.data;
                $curChar = jur_DecomposedCharSet_codePointAt($this, var$7, $testString, $rightBound);
                b: {
                    while ($strIndex < 4) {
                        if (!(($curChar != 832 ? 0 : 1) | ($curChar != 833 ? 0 : 1) | ($curChar != 835 ? 0 : 1) | ($curChar != 836 ? 0 : 1))) {
                            var$10 = $strIndex + 1 | 0;
                            var$9[$strIndex] = $curChar;
                        } else {
                            $decCurCodePoint = (jur_Lexer_getDecomposition($curChar)).data;
                            if ($decCurCodePoint.length != 2) {
                                var$10 = $strIndex + 1 | 0;
                                var$9[$strIndex] = $decCurCodePoint[0];
                            } else {
                                $readCodePoints = $strIndex + 1 | 0;
                                var$9[$strIndex] = $decCurCodePoint[0];
                                var$10 = $readCodePoints + 1 | 0;
                                var$9[$readCodePoints] = $decCurCodePoint[1];
                            }
                        }
                        var$7 = var$7 + $this.$readCharsForCodePoint | 0;
                        if (var$7 >= $rightBound)
                            break b;
                        $curChar = jur_DecomposedCharSet_codePointAt($this, var$7, $testString, $rightBound);
                        $strIndex = var$10;
                    }
                    break a;
                }
                $strIndex = var$10;
            }
        }
        if ($strIndex == $this.$decomposedCharLength0) {
            $decCurCodePoint = $decCodePoint.data;
            $curChar = 0;
            while (true) {
                if ($curChar >= $strIndex)
                    return $this.$next2.$matches(var$7, $testString, $matchResult);
                if ($decCurCodePoint[$curChar] != $this.$decomposedChar0.data[$curChar])
                    break;
                $curChar = $curChar + 1 | 0;
            }
            return (-1);
        }
        return (-1);
    }
    return (-1);
},
jur_DecomposedCharSet_getDecomposedChar = $this => {
    let $strBuff, $i;
    if ($this.$decomposedCharUTF160 === null) {
        $strBuff = new jl_StringBuilder;
        jl_AbstractStringBuilder__init_($strBuff);
        $i = 0;
        while ($i < $this.$decomposedCharLength0) {
            jl_AbstractStringBuilder_append0($strBuff, jl_Character_toChars($this.$decomposedChar0.data[$i]));
            $i = $i + 1 | 0;
        }
        $this.$decomposedCharUTF160 = jl_AbstractStringBuilder_toString($strBuff);
    }
    return $this.$decomposedCharUTF160;
},
jur_DecomposedCharSet_getName = $this => {
    let var$1, var$2;
    var$1 = jur_DecomposedCharSet_getDecomposedChar($this);
    var$2 = new jl_StringBuilder;
    jl_AbstractStringBuilder__init_(var$2);
    jl_StringBuilder_append(jl_StringBuilder_append(var$2, $rt_s(440)), var$1);
    return jl_AbstractStringBuilder_toString(var$2);
},
jur_DecomposedCharSet_codePointAt = ($this, $strIndex, $testString, $rightBound) => {
    let $curChar, $low, $curCodePointUTF16;
    $this.$readCharsForCodePoint = 1;
    if ($strIndex >= ($rightBound - 1 | 0))
        $curChar = jl_String_charAt($testString, $strIndex);
    else {
        $rightBound = $strIndex + 1 | 0;
        $testString = $testString;
        $curChar = jl_String_charAt($testString, $strIndex);
        $low = jl_String_charAt($testString, $rightBound);
        if (jl_Character_isSurrogatePair($curChar, $low)) {
            $curCodePointUTF16 = $rt_createCharArray(2).data;
            $curCodePointUTF16[0] = $curChar;
            $curCodePointUTF16[1] = $low;
            $rightBound = $curCodePointUTF16.length;
            if (0 < $rightBound && $rightBound <= $rightBound) {
                $curChar = !(0 < ($rightBound - 1 | 0) && jl_Character_isHighSurrogate($curCodePointUTF16[0]) && jl_Character_isLowSurrogate($curCodePointUTF16[1])) ? $curCodePointUTF16[0] : jl_Character_toCodePoint($curCodePointUTF16[0], $curCodePointUTF16[1]);
                $this.$readCharsForCodePoint = 2;
            } else {
                $testString = new jl_IndexOutOfBoundsException;
                jl_Throwable__init_0($testString);
                $rt_throw($testString);
            }
        }
    }
    return $curChar;
},
jur_DecomposedCharSet_first = ($this, $set) => {
    return !($set instanceof jur_DecomposedCharSet && !jl_String_equals(jur_DecomposedCharSet_getDecomposedChar($set), jur_DecomposedCharSet_getDecomposedChar($this))) ? 1 : 0;
},
jur_DecomposedCharSet_hasConsumed = ($this, $matchResult) => {
    return 1;
},
jur_UCIDecomposedCharSet = $rt_classWithoutFields(jur_DecomposedCharSet),
jur_CIDecomposedCharSet = $rt_classWithoutFields(jur_DecomposedCharSet),
jur_PossessiveGroupQuantifierSet = $rt_classWithoutFields(jur_GroupQuantifierSet),
jur_PossessiveGroupQuantifierSet_matches = ($this, $stringIndex, $testString, $matchResult) => {
    let $stringIndex_0;
    while (true) {
        $stringIndex_0 = $this.$innerSet.$matches($stringIndex, $testString, $matchResult);
        if ($stringIndex_0 <= 0)
            break;
        $stringIndex = $stringIndex_0;
    }
    return $this.$next2.$matches($stringIndex, $testString, $matchResult);
},
jur_PosPlusGroupQuantifierSet = $rt_classWithoutFields(jur_GroupQuantifierSet),
jur_PosPlusGroupQuantifierSet_matches = ($this, $stringIndex, $testString, $matchResult) => {
    let $nextIndex;
    $nextIndex = $this.$innerSet.$matches($stringIndex, $testString, $matchResult);
    if ($nextIndex >= 0) {
        if ($nextIndex > $stringIndex) {
            while (true) {
                $stringIndex = $this.$innerSet.$matches($nextIndex, $testString, $matchResult);
                if ($stringIndex <= $nextIndex)
                    break;
                $nextIndex = $stringIndex;
            }
            $stringIndex = $nextIndex;
        }
        return $this.$next2.$matches($stringIndex, $testString, $matchResult);
    }
    return (-1);
},
jur_AltGroupQuantifierSet = $rt_classWithoutFields(jur_GroupQuantifierSet),
jur_AltGroupQuantifierSet_matches = ($this, $stringIndex, $testString, $matchResult) => {
    let $nextIndex;
    if ($this.$innerSet.$hasConsumed($matchResult)) {
        $nextIndex = $this.$innerSet.$matches($stringIndex, $testString, $matchResult);
        if ($nextIndex < 0)
            return $this.$next2.$matches($stringIndex, $testString, $matchResult);
        return $nextIndex;
    }
    return $this.$next2.$matches($stringIndex, $testString, $matchResult);
},
jur_AltGroupQuantifierSet_setNext = ($this, $next) => {
    $this.$next2 = $next;
    $this.$innerSet.$setNext($next);
},
jur_PosAltGroupQuantifierSet = $rt_classWithoutFields(jur_AltGroupQuantifierSet),
jur_PosAltGroupQuantifierSet_matches = ($this, $stringIndex, $testString, $matchResult) => {
    let $nextIndex;
    $nextIndex = $this.$innerSet.$matches($stringIndex, $testString, $matchResult);
    if ($nextIndex <= 0)
        $nextIndex = $stringIndex;
    return $this.$next2.$matches($nextIndex, $testString, $matchResult);
},
jur_PosAltGroupQuantifierSet_setNext = ($this, $next) => {
    $this.$next2 = $next;
};
function jur_CompositeGroupQuantifierSet() {
    let a = this; jur_GroupQuantifierSet.call(a);
    a.$quantifier = null;
    a.$setCounter = 0;
}
let jur_CompositeGroupQuantifierSet__init_ = ($this, $quant, $innerSet, $next, $type, $setCounter) => {
    jur_QuantifierSet__init_($this, $innerSet, $next, $type);
    $this.$quantifier = $quant;
    $this.$setCounter = $setCounter;
},
jur_CompositeGroupQuantifierSet__init_0 = (var_0, var_1, var_2, var_3, var_4) => {
    let var_5 = new jur_CompositeGroupQuantifierSet();
    jur_CompositeGroupQuantifierSet__init_(var_5, var_0, var_1, var_2, var_3, var_4);
    return var_5;
},
jur_CompositeGroupQuantifierSet_matches = ($this, $stringIndex, $testString, $matchResult) => {
    let $enterCounter, $nextIndex;
    $enterCounter = jur_MatchResultImpl_getEnterCounter($matchResult, $this.$setCounter);
    if ($this.$innerSet.$hasConsumed($matchResult)) {
        if ($enterCounter < $this.$quantifier.$max1) {
            $nextIndex = $this.$setCounter;
            $enterCounter = $enterCounter + 1 | 0;
            jur_MatchResultImpl_setEnterCounter($matchResult, $nextIndex, $enterCounter);
            $nextIndex = $this.$innerSet.$matches($stringIndex, $testString, $matchResult);
            if ($nextIndex < 0) {
                $nextIndex = $this.$setCounter;
                $enterCounter = $enterCounter + (-1) | 0;
                jur_MatchResultImpl_setEnterCounter($matchResult, $nextIndex, $enterCounter);
                if ($enterCounter < $this.$quantifier.$min0) {
                    jur_MatchResultImpl_setEnterCounter($matchResult, $this.$setCounter, 0);
                    return (-1);
                }
                return $this.$next2.$matches($stringIndex, $testString, $matchResult);
            }
            jur_MatchResultImpl_setEnterCounter($matchResult, $this.$setCounter, 0);
            return $nextIndex;
        }
        return $this.$next2.$matches($stringIndex, $testString, $matchResult);
    }
    return $this.$next2.$matches($stringIndex, $testString, $matchResult);
},
jur_CompositeGroupQuantifierSet_getName = $this => {
    return jur_Quantifier_toString($this.$quantifier);
},
jur_PosCompositeGroupQuantifierSet = $rt_classWithoutFields(jur_CompositeGroupQuantifierSet),
jur_PosCompositeGroupQuantifierSet_matches = ($this, $stringIndex, $testString, $matchResult) => {
    let $counter, $max, $nextIndex;
    $counter = 0;
    $max = $this.$quantifier.$max1;
    a: {
        while (true) {
            $nextIndex = $this.$innerSet.$matches($stringIndex, $testString, $matchResult);
            if ($nextIndex <= $stringIndex)
                break a;
            if ($counter >= $max)
                break;
            $counter = $counter + 1 | 0;
            $stringIndex = $nextIndex;
        }
    }
    if ($nextIndex < 0 && $counter < $this.$quantifier.$min0)
        return (-1);
    return $this.$next2.$matches($stringIndex, $testString, $matchResult);
},
jur_ReluctantGroupQuantifierSet = $rt_classWithoutFields(jur_GroupQuantifierSet),
jur_ReluctantGroupQuantifierSet_matches = ($this, $stringIndex, $testString, $matchResult) => {
    let $res;
    if ($this.$innerSet.$hasConsumed($matchResult)) {
        $res = $this.$next2.$matches($stringIndex, $testString, $matchResult);
        if ($res < 0)
            return $this.$innerSet.$matches($stringIndex, $testString, $matchResult);
        return $res;
    }
    return $this.$next2.$matches($stringIndex, $testString, $matchResult);
},
jur_RelAltGroupQuantifierSet = $rt_classWithoutFields(jur_AltGroupQuantifierSet),
jur_RelAltGroupQuantifierSet_matches = ($this, $stringIndex, $testString, $matchResult) => {
    let $nextIndex;
    if ($this.$innerSet.$hasConsumed($matchResult)) {
        $nextIndex = $this.$next2.$matches($stringIndex, $testString, $matchResult);
        if ($nextIndex < 0)
            $nextIndex = $this.$innerSet.$matches($stringIndex, $testString, $matchResult);
        return $nextIndex;
    }
    return $this.$next2.$matches($stringIndex, $testString, $matchResult);
},
jur_RelCompositeGroupQuantifierSet = $rt_classWithoutFields(jur_CompositeGroupQuantifierSet),
jur_RelCompositeGroupQuantifierSet_matches = ($this, $stringIndex, $testString, $matchResult) => {
    let $enterCounter, var$5, $nextIndex;
    $enterCounter = jur_MatchResultImpl_getEnterCounter($matchResult, $this.$setCounter);
    if ($this.$innerSet.$hasConsumed($matchResult)) {
        var$5 = $this.$quantifier;
        if ($enterCounter < var$5.$max1) {
            if ($enterCounter < var$5.$min0) {
                jur_MatchResultImpl_setEnterCounter($matchResult, $this.$setCounter, $enterCounter + 1 | 0);
                $nextIndex = $this.$innerSet.$matches($stringIndex, $testString, $matchResult);
            } else {
                $nextIndex = $this.$next2.$matches($stringIndex, $testString, $matchResult);
                if ($nextIndex < 0) {
                    jur_MatchResultImpl_setEnterCounter($matchResult, $this.$setCounter, $enterCounter + 1 | 0);
                    $nextIndex = $this.$innerSet.$matches($stringIndex, $testString, $matchResult);
                } else {
                    jur_MatchResultImpl_setEnterCounter($matchResult, $this.$setCounter, 0);
                    return $nextIndex;
                }
            }
            return $nextIndex;
        }
        jur_MatchResultImpl_setEnterCounter($matchResult, $this.$setCounter, 0);
        return $this.$next2.$matches($stringIndex, $testString, $matchResult);
    }
    return $this.$next2.$matches($stringIndex, $testString, $matchResult);
},
jur_DotAllQuantifierSet = $rt_classWithoutFields(jur_QuantifierSet),
jur_DotAllQuantifierSet_matches = ($this, $stringIndex, $testString, $matchResult) => {
    let $strLength;
    $strLength = $matchResult.$rightBound;
    if ($strLength <= $stringIndex)
        return $this.$next2.$matches($stringIndex, $testString, $matchResult);
    return $this.$next2.$findBack($stringIndex, $strLength, $testString, $matchResult);
},
jur_DotAllQuantifierSet_find = ($this, $stringIndex, $testString, $matchResult) => {
    let $strLength;
    $strLength = $matchResult.$rightBound;
    if ($this.$next2.$findBack($stringIndex, $strLength, $testString, $matchResult) < 0)
        return (-1);
    return $stringIndex;
},
jur_DotAllQuantifierSet_getName = $this => {
    return $rt_s(441);
};
function jur_DotQuantifierSet() {
    jur_QuantifierSet.call(this);
    this.$lt = null;
}
let jur_DotQuantifierSet_matches = ($this, $stringIndex, $testString, $matchResult) => {
    let $strLength, $startSearch;
    $strLength = $matchResult.$rightBound;
    $startSearch = jur_DotQuantifierSet_findLineTerminator($this, $stringIndex, $strLength, $testString);
    if ($startSearch >= 0)
        $strLength = $startSearch;
    if ($strLength <= $stringIndex)
        return $this.$next2.$matches($stringIndex, $testString, $matchResult);
    return $this.$next2.$findBack($stringIndex, $strLength, $testString, $matchResult);
},
jur_DotQuantifierSet_find = ($this, $stringIndex, $testString, $matchResult) => {
    let $strLength, $res, $nextSearch, $leftBound;
    $strLength = $matchResult.$rightBound;
    $res = $this.$next2.$find1($stringIndex, $testString, $matchResult);
    if ($res >= 0) {
        $nextSearch = jur_DotQuantifierSet_findLineTerminator($this, $res, $strLength, $testString);
        if ($nextSearch >= 0)
            $strLength = $nextSearch;
        $nextSearch = jl_Math_max($res, $this.$next2.$findBack($res, $strLength, $testString, $matchResult));
        if ($nextSearch <= 0)
            $leftBound = $nextSearch ? (-1) : 0;
        else {
            $leftBound = $nextSearch - 1 | 0;
            a: {
                b: {
                    while (true) {
                        if ($leftBound < $stringIndex)
                            break b;
                        if ($this.$lt.$isLineTerminator(jl_String_charAt($testString, $leftBound)))
                            break;
                        $leftBound = $leftBound + (-1) | 0;
                    }
                    break a;
                }
                $leftBound = (-1);
            }
        }
        if ($leftBound >= $stringIndex)
            $stringIndex = $leftBound >= $nextSearch ? $leftBound : $leftBound + 1 | 0;
        return $stringIndex;
    }
    return (-1);
},
jur_DotQuantifierSet_findLineTerminator = ($this, $i, $to, $testString) => {
    while (true) {
        if ($i >= $to)
            return (-1);
        if ($this.$lt.$isLineTerminator(jl_String_charAt($testString, $i)))
            break;
        $i = $i + 1 | 0;
    }
    return $i;
},
jur_DotQuantifierSet_getName = $this => {
    return $rt_s(442);
},
jur_AbstractLineTerminator = $rt_classWithoutFields(),
jur_AbstractLineTerminator_unixLT = null,
jur_AbstractLineTerminator_unicodeLT = null,
jur_AbstractLineTerminator_getInstance = $flag => {
    let var$2;
    if ($flag & 1) {
        var$2 = jur_AbstractLineTerminator_unixLT;
        if (var$2 === null) {
            var$2 = new jur_AbstractLineTerminator$1;
            jur_AbstractLineTerminator_unixLT = var$2;
            return var$2;
        }
        return var$2;
    }
    var$2 = jur_AbstractLineTerminator_unicodeLT;
    if (var$2 === null) {
        var$2 = new jur_AbstractLineTerminator$2;
        jur_AbstractLineTerminator_unicodeLT = var$2;
        return var$2;
    }
    return var$2;
},
jur_PossessiveQuantifierSet = $rt_classWithoutFields(jur_LeafQuantifierSet),
jur_PossessiveQuantifierSet_matches = ($this, $stringIndex, $testString, $matchResult) => {
    let var$4;
    a: {
        while (true) {
            if (($stringIndex + $this.$leaf.$charCount() | 0) > $matchResult.$rightBound)
                break a;
            var$4 = $this.$leaf.$accepts($stringIndex, $testString);
            if (var$4 < 1)
                break;
            $stringIndex = $stringIndex + var$4 | 0;
        }
    }
    return $this.$next2.$matches($stringIndex, $testString, $matchResult);
},
jur_PossessiveAltQuantifierSet = $rt_classWithoutFields(jur_AltQuantifierSet),
jur_PossessiveAltQuantifierSet_matches = ($this, $stringIndex, $testString, $matchResult) => {
    let var$4;
    if (($stringIndex + $this.$leaf.$charCount() | 0) <= $matchResult.$rightBound) {
        var$4 = $this.$leaf.$accepts($stringIndex, $testString);
        if (var$4 >= 1)
            $stringIndex = $stringIndex + var$4 | 0;
    }
    return $this.$next2.$matches($stringIndex, $testString, $matchResult);
},
jur_PossessiveCompositeQuantifierSet = $rt_classWithoutFields(jur_CompositeQuantifierSet),
jur_PossessiveCompositeQuantifierSet_matches = ($this, $stringIndex, $testString, $matchResult) => {
    let var$4, $min, $max, $i, $shift;
    var$4 = $this.$quantifier0;
    $min = var$4.$min0;
    $max = var$4.$max1;
    $i = 0;
    while (true) {
        if ($i >= $min) {
            a: {
                b: {
                    while (true) {
                        if ($i >= $max)
                            break a;
                        if (($stringIndex + $this.$leaf.$charCount() | 0) > $matchResult.$rightBound)
                            break b;
                        $shift = $this.$leaf.$accepts($stringIndex, $testString);
                        if ($shift < 1)
                            break;
                        $stringIndex = $stringIndex + $shift | 0;
                        $i = $i + 1 | 0;
                    }
                    break a;
                }
            }
            return $this.$next2.$matches($stringIndex, $testString, $matchResult);
        }
        if (($stringIndex + $this.$leaf.$charCount() | 0) > $matchResult.$rightBound) {
            $matchResult.$hitEnd = 1;
            return (-1);
        }
        $shift = $this.$leaf.$accepts($stringIndex, $testString);
        if ($shift < 1)
            break;
        $stringIndex = $stringIndex + $shift | 0;
        $i = $i + 1 | 0;
    }
    return (-1);
},
jur_ReluctantQuantifierSet = $rt_classWithoutFields(jur_LeafQuantifierSet),
jur_ReluctantQuantifierSet_matches = ($this, $stringIndex, $testString, $matchResult) => {
    let var$4;
    while (true) {
        var$4 = $this.$next2.$matches($stringIndex, $testString, $matchResult);
        if (var$4 >= 0)
            break;
        if (($stringIndex + $this.$leaf.$charCount() | 0) <= $matchResult.$rightBound) {
            var$4 = $this.$leaf.$accepts($stringIndex, $testString);
            $stringIndex = $stringIndex + var$4 | 0;
        }
        if (var$4 < 1)
            return (-1);
    }
    return var$4;
},
jur_ReluctantAltQuantifierSet = $rt_classWithoutFields(jur_AltQuantifierSet),
jur_ReluctantAltQuantifierSet_matches = ($this, $stringIndex, $testString, $matchResult) => {
    let $shift;
    $shift = $this.$next2.$matches($stringIndex, $testString, $matchResult);
    if ($shift < 0)
        return $this.$innerSet.$matches($stringIndex, $testString, $matchResult);
    return $shift;
},
jur_ReluctantCompositeQuantifierSet = $rt_classWithoutFields(jur_CompositeQuantifierSet),
jur_ReluctantCompositeQuantifierSet_matches = ($this, $stringIndex, $testString, $matchResult) => {
    let var$4, $min, $max, $i, var$8, var$9;
    var$4 = $this.$quantifier0;
    $min = var$4.$min0;
    $max = var$4.$max1;
    $i = 0;
    while (true) {
        if ($i >= $min) {
            a: {
                while (true) {
                    var$8 = $this.$next2.$matches($stringIndex, $testString, $matchResult);
                    if (var$8 >= 0)
                        break;
                    if (($stringIndex + $this.$leaf.$charCount() | 0) <= $matchResult.$rightBound) {
                        var$8 = $this.$leaf.$accepts($stringIndex, $testString);
                        $stringIndex = $stringIndex + var$8 | 0;
                        $i = $i + 1 | 0;
                    }
                    if (var$8 < 1)
                        break a;
                    if ($i > $max)
                        break a;
                }
                return var$8;
            }
            return (-1);
        }
        if (($stringIndex + $this.$leaf.$charCount() | 0) > $matchResult.$rightBound) {
            $matchResult.$hitEnd = 1;
            return (-1);
        }
        var$9 = $this.$leaf.$accepts($stringIndex, $testString);
        if (var$9 < 1)
            break;
        $stringIndex = $stringIndex + var$9 | 0;
        $i = $i + 1 | 0;
    }
    return (-1);
},
jur_SOLSet = $rt_classWithoutFields(jur_AbstractSet),
jur_SOLSet_matches = ($this, $strIndex, $testString, $matchResult) => {
    if ($strIndex && !($matchResult.$anchoringBounds && $strIndex == $matchResult.$leftBound))
        return (-1);
    return $this.$next2.$matches($strIndex, $testString, $matchResult);
},
jur_SOLSet_hasConsumed = ($this, $matchResult) => {
    return 0;
},
jur_SOLSet_getName = $this => {
    return $rt_s(443);
};
function jur_WordBoundary() {
    jur_AbstractSet.call(this);
    this.$positive = 0;
}
let jur_WordBoundary__init_0 = ($this, $positive) => {
    jur_AbstractSet__init_($this);
    $this.$positive = $positive;
},
jur_WordBoundary__init_ = var_0 => {
    let var_1 = new jur_WordBoundary();
    jur_WordBoundary__init_0(var_1, var_0);
    return var_1;
},
jur_WordBoundary_matches = ($this, $stringIndex, $testString, $matchResult) => {
    let $ch1, $ch2, $left, $leftBound;
    $ch1 = $stringIndex >= $matchResult.$rightBound ? 32 : jl_String_charAt($testString, $stringIndex);
    if (!$stringIndex)
        $ch2 = 32;
    else {
        $left = $stringIndex - 1 | 0;
        $ch2 = jl_String_charAt($testString, $left);
    }
    $leftBound = $matchResult.$transparentBounds ? 0 : $matchResult.$leftBound;
    return (!($ch1 != 32 && !jur_WordBoundary_isSpace($this, $ch1, $stringIndex, $leftBound, $testString)) ? 1 : 0) ^ (!($ch2 != 32 && !jur_WordBoundary_isSpace($this, $ch2, $stringIndex - 1 | 0, $leftBound, $testString)) ? 1 : 0) ^ $this.$positive ? (-1) : $this.$next2.$matches($stringIndex, $testString, $matchResult);
},
jur_WordBoundary_hasConsumed = ($this, $matchResult) => {
    return 0;
},
jur_WordBoundary_getName = $this => {
    return $rt_s(444);
},
jur_WordBoundary_isSpace = ($this, $ch, $index, $leftBound, $testString) => {
    let var$5;
    if (!jl_Character_isLetterOrDigit0($ch) && $ch != 95) {
        a: {
            if (jl_Character_getType0($ch) == 6)
                while (true) {
                    $index = $index + (-1) | 0;
                    if ($index < $leftBound)
                        break a;
                    var$5 = jl_String_charAt($testString, $index);
                    if (jl_Character_isLetterOrDigit0(var$5))
                        return 0;
                    if (jl_Character_getType0(var$5) != 6)
                        return 1;
                }
        }
        return 1;
    }
    return 0;
},
jur_PreviousMatch = $rt_classWithoutFields(jur_AbstractSet),
jur_PreviousMatch_matches = ($this, $stringIndex, $testString, $matchResult) => {
    if ($stringIndex == $matchResult.$previousMatch)
        return $this.$next2.$matches($stringIndex, $testString, $matchResult);
    return (-1);
},
jur_PreviousMatch_hasConsumed = ($this, $matchResult) => {
    return 0;
},
jur_PreviousMatch_getName = $this => {
    return $rt_s(445);
};
function jur_EOLSet() {
    jur_AbstractSet.call(this);
    this.$consCounter0 = 0;
}
let jur_EOLSet__init_ = ($this, $counter) => {
    jur_AbstractSet__init_($this);
    $this.$consCounter0 = $counter;
},
jur_EOLSet__init_0 = var_0 => {
    let var_1 = new jur_EOLSet();
    jur_EOLSet__init_(var_1, var_0);
    return var_1;
},
jur_EOLSet_matches = ($this, $strIndex, $testString, $matchResult) => {
    let $rightBound, var$5, var$6, $ch;
    $rightBound = $matchResult.$anchoringBounds ? $matchResult.$rightBound : $testString.$nativeString.length;
    if ($strIndex < $rightBound) {
        var$5 = $rightBound - $strIndex | 0;
        if (var$5 == 2) {
            var$6 = $testString;
            if (jl_String_charAt(var$6, $strIndex) == 13 && jl_String_charAt(var$6, $strIndex + 1 | 0) == 10) {
                jur_MatchResultImpl_setConsumed($matchResult, $this.$consCounter0, 0);
                return $this.$next2.$matches($strIndex, $testString, $matchResult);
            }
        }
        a: {
            if (var$5 == 1) {
                $ch = jl_String_charAt($testString, $strIndex);
                if ($ch == 10)
                    break a;
                if ($ch == 13)
                    break a;
                if ($ch == 133)
                    break a;
                if (($ch | 1) == 8233)
                    break a;
            }
            return (-1);
        }
        jur_MatchResultImpl_setConsumed($matchResult, $this.$consCounter0, 0);
        return $this.$next2.$matches($strIndex, $testString, $matchResult);
    }
    jur_MatchResultImpl_setConsumed($matchResult, $this.$consCounter0, 0);
    return $this.$next2.$matches($strIndex, $testString, $matchResult);
},
jur_EOLSet_hasConsumed = ($this, $matchResult) => {
    let $res;
    $res = !jur_MatchResultImpl_getConsumed($matchResult, $this.$consCounter0) ? 0 : 1;
    jur_MatchResultImpl_setConsumed($matchResult, $this.$consCounter0, (-1));
    return $res;
},
jur_EOLSet_getName = $this => {
    return $rt_s(446);
},
jur_EOISet = $rt_classWithoutFields(jur_AbstractSet),
jur_EOISet_matches = ($this, $stringIndex, $testString, $matchResult) => {
    if ($stringIndex >= (!$matchResult.$transparentBounds ? $matchResult.$rightBound : $testString.$nativeString.length)) {
        $matchResult.$hitEnd = 1;
        $matchResult.$requireEnd = 1;
        return $this.$next2.$matches($stringIndex, $testString, $matchResult);
    }
    return (-1);
},
jur_EOISet_hasConsumed = ($this, $matchResult) => {
    return 0;
},
jur_EOISet_getName = $this => {
    return $rt_s(447);
};
function jur_MultiLineSOLSet() {
    jur_AbstractSet.call(this);
    this.$lt1 = null;
}
let jur_MultiLineSOLSet_matches = ($this, $strIndex, $testString, $matchResult) => {
    let var$4, var$5, var$6;
    a: {
        if ($strIndex != $matchResult.$rightBound) {
            if (!$strIndex)
                break a;
            if ($matchResult.$anchoringBounds && $strIndex == $matchResult.$leftBound)
                break a;
            var$4 = $this.$lt1;
            var$5 = $strIndex - 1 | 0;
            var$6 = $testString;
            if (var$4.$isAfterLineTerminator(jl_String_charAt(var$6, var$5), jl_String_charAt(var$6, $strIndex)))
                break a;
        }
        return (-1);
    }
    return $this.$next2.$matches($strIndex, $testString, $matchResult);
},
jur_MultiLineSOLSet_hasConsumed = ($this, $matchResult) => {
    return 0;
},
jur_MultiLineSOLSet_getName = $this => {
    return $rt_s(448);
},
jur_DotAllSet = $rt_classWithoutFields(jur_JointSet),
jur_DotAllSet__init_ = $this => {
    jur_AbstractSet__init_($this);
},
jur_DotAllSet__init_0 = () => {
    let var_0 = new jur_DotAllSet();
    jur_DotAllSet__init_(var_0);
    return var_0;
},
jur_DotAllSet_matches = ($this, $stringIndex, $testString, $matchResult) => {
    let $strLength, var$5, var$6, $high;
    $strLength = $matchResult.$rightBound;
    var$5 = $stringIndex + 1 | 0;
    if (var$5 <= $strLength) {
        var$6 = $testString;
        $high = jl_String_charAt(var$6, $stringIndex);
        if (jl_Character_isHighSurrogate($high)) {
            $stringIndex = $stringIndex + 2 | 0;
            if ($stringIndex <= $strLength && jl_Character_isSurrogatePair($high, jl_String_charAt(var$6, var$5)))
                return $this.$next2.$matches($stringIndex, $testString, $matchResult);
        }
        return $this.$next2.$matches(var$5, $testString, $matchResult);
    }
    $matchResult.$hitEnd = 1;
    return (-1);
},
jur_DotAllSet_getName = $this => {
    return $rt_s(449);
},
jur_DotAllSet_setNext = ($this, $next) => {
    $this.$next2 = $next;
},
jur_DotAllSet_getType = $this => {
    return (-2147483602);
},
jur_DotAllSet_hasConsumed = ($this, $matchResult) => {
    return 1;
};
function jur_DotSet() {
    jur_JointSet.call(this);
    this.$lt0 = null;
}
let jur_DotSet__init_ = ($this, $lt) => {
    jur_AbstractSet__init_($this);
    $this.$lt0 = $lt;
},
jur_DotSet__init_0 = var_0 => {
    let var_1 = new jur_DotSet();
    jur_DotSet__init_(var_1, var_0);
    return var_1;
},
jur_DotSet_matches = ($this, $stringIndex, $testString, $matchResult) => {
    let $strLength, var$5, var$6, $high, $low;
    $strLength = $matchResult.$rightBound;
    var$5 = $stringIndex + 1 | 0;
    if (var$5 <= $strLength) {
        var$6 = $testString;
        $high = jl_String_charAt(var$6, $stringIndex);
        if (jl_Character_isHighSurrogate($high)) {
            $stringIndex = $stringIndex + 2 | 0;
            if ($stringIndex <= $strLength) {
                $low = jl_String_charAt(var$6, var$5);
                if (jl_Character_isSurrogatePair($high, $low))
                    return $this.$lt0.$isLineTerminator(jl_Character_toCodePoint($high, $low)) ? (-1) : $this.$next2.$matches($stringIndex, $testString, $matchResult);
            }
        }
        return $this.$lt0.$isLineTerminator($high) ? (-1) : $this.$next2.$matches(var$5, $testString, $matchResult);
    }
    $matchResult.$hitEnd = 1;
    return (-1);
},
jur_DotSet_getName = $this => {
    return $rt_s(450);
},
jur_DotSet_setNext = ($this, $next) => {
    $this.$next2 = $next;
},
jur_DotSet_getType = $this => {
    return (-2147483602);
},
jur_DotSet_hasConsumed = ($this, $matchResult) => {
    return 1;
};
function jur_UEOLSet() {
    jur_AbstractSet.call(this);
    this.$consCounter3 = 0;
}
let jur_UEOLSet__init_0 = ($this, $counter) => {
    jur_AbstractSet__init_($this);
    $this.$consCounter3 = $counter;
},
jur_UEOLSet__init_ = var_0 => {
    let var_1 = new jur_UEOLSet();
    jur_UEOLSet__init_0(var_1, var_0);
    return var_1;
},
jur_UEOLSet_matches = ($this, $strIndex, $testString, $matchResult) => {
    let $rightBound;
    $rightBound = $matchResult.$anchoringBounds ? $matchResult.$rightBound : $testString.$nativeString.length;
    if ($strIndex < $rightBound) {
        if (($rightBound - $strIndex | 0) == 1 && jl_String_charAt($testString, $strIndex) == 10) {
            jur_MatchResultImpl_setConsumed($matchResult, $this.$consCounter3, 1);
            return $this.$next2.$matches($strIndex + 1 | 0, $testString, $matchResult);
        }
        return (-1);
    }
    jur_MatchResultImpl_setConsumed($matchResult, $this.$consCounter3, 0);
    return $this.$next2.$matches($strIndex, $testString, $matchResult);
},
jur_UEOLSet_hasConsumed = ($this, $matchResult) => {
    let $res;
    $res = !jur_MatchResultImpl_getConsumed($matchResult, $this.$consCounter3) ? 0 : 1;
    jur_MatchResultImpl_setConsumed($matchResult, $this.$consCounter3, (-1));
    return $res;
},
jur_UEOLSet_getName = $this => {
    return $rt_s(446);
};
function jur_UMultiLineEOLSet() {
    jur_AbstractSet.call(this);
    this.$consCounter2 = 0;
}
let jur_UMultiLineEOLSet__init_ = ($this, $counter) => {
    jur_AbstractSet__init_($this);
    $this.$consCounter2 = $counter;
},
jur_UMultiLineEOLSet__init_0 = var_0 => {
    let var_1 = new jur_UMultiLineEOLSet();
    jur_UMultiLineEOLSet__init_(var_1, var_0);
    return var_1;
},
jur_UMultiLineEOLSet_matches = ($this, $strIndex, $testString, $matchResult) => {
    if (($matchResult.$anchoringBounds ? $matchResult.$rightBound - $strIndex | 0 : $testString.$nativeString.length - $strIndex | 0) > 0) {
        if (jl_String_charAt($testString, $strIndex) == 10) {
            jur_MatchResultImpl_setConsumed($matchResult, $this.$consCounter2, 1);
            return $this.$next2.$matches($strIndex + 1 | 0, $testString, $matchResult);
        }
        return (-1);
    }
    jur_MatchResultImpl_setConsumed($matchResult, $this.$consCounter2, 0);
    return $this.$next2.$matches($strIndex, $testString, $matchResult);
},
jur_UMultiLineEOLSet_hasConsumed = ($this, $matchResult) => {
    let $res;
    $res = !jur_MatchResultImpl_getConsumed($matchResult, $this.$consCounter2) ? 0 : 1;
    jur_MatchResultImpl_setConsumed($matchResult, $this.$consCounter2, (-1));
    return $res;
},
jur_UMultiLineEOLSet_getName = $this => {
    return $rt_s(451);
};
function jur_MultiLineEOLSet() {
    jur_AbstractSet.call(this);
    this.$consCounter = 0;
}
let jur_MultiLineEOLSet__init_0 = ($this, $counter) => {
    jur_AbstractSet__init_($this);
    $this.$consCounter = $counter;
},
jur_MultiLineEOLSet__init_ = var_0 => {
    let var_1 = new jur_MultiLineEOLSet();
    jur_MultiLineEOLSet__init_0(var_1, var_0);
    return var_1;
},
jur_MultiLineEOLSet_matches = ($this, $strIndex, $testString, $matchResult) => {
    let $strDif, $ch1, $ch2, var$7;
    $strDif = $matchResult.$anchoringBounds ? $matchResult.$rightBound - $strIndex | 0 : $testString.$nativeString.length - $strIndex | 0;
    if ($strDif) {
        if ($strDif < 2) {
            $ch1 = jl_String_charAt($testString, $strIndex);
            $ch2 = 97;
        } else {
            var$7 = $testString;
            $ch1 = jl_String_charAt(var$7, $strIndex);
            $ch2 = jl_String_charAt(var$7, $strIndex + 1 | 0);
        }
        switch ($ch1) {
            case 10:
            case 133:
            case 8232:
            case 8233:
                jur_MatchResultImpl_setConsumed($matchResult, $this.$consCounter, 0);
                return $this.$next2.$matches($strIndex, $testString, $matchResult);
            case 13:
                if ($ch2 == 10) {
                    jur_MatchResultImpl_setConsumed($matchResult, $this.$consCounter, 0);
                    return $this.$next2.$matches($strIndex, $testString, $matchResult);
                }
                jur_MatchResultImpl_setConsumed($matchResult, $this.$consCounter, 0);
                return $this.$next2.$matches($strIndex, $testString, $matchResult);
            default:
        }
        return (-1);
    }
    jur_MatchResultImpl_setConsumed($matchResult, $this.$consCounter, 0);
    return $this.$next2.$matches($strIndex, $testString, $matchResult);
},
jur_MultiLineEOLSet_hasConsumed = ($this, $matchResult) => {
    let $res;
    $res = !jur_MatchResultImpl_getConsumed($matchResult, $this.$consCounter) ? 0 : 1;
    jur_MatchResultImpl_setConsumed($matchResult, $this.$consCounter, (-1));
    return $res;
},
jur_MultiLineEOLSet_getName = $this => {
    return $rt_s(452);
};
function jur_CIBackReferenceSet() {
    let a = this; jur_JointSet.call(a);
    a.$referencedGroup = 0;
    a.$consCounter1 = 0;
}
let jur_CIBackReferenceSet__init_ = ($this, $groupIndex, $consCounter) => {
    jur_AbstractSet__init_($this);
    $this.$referencedGroup = $groupIndex;
    $this.$consCounter1 = $consCounter;
},
jur_CIBackReferenceSet__init_0 = (var_0, var_1) => {
    let var_2 = new jur_CIBackReferenceSet();
    jur_CIBackReferenceSet__init_(var_2, var_0, var_1);
    return var_2;
},
jur_CIBackReferenceSet_matches = ($this, $stringIndex, $testString, $matchResult) => {
    let $group, $i, var$6, var$7, var$8;
    $group = jur_CIBackReferenceSet_getString($this, $matchResult);
    if ($group !== null && ($stringIndex + $group.$nativeString.length | 0) <= $matchResult.$rightBound) {
        $i = 0;
        while (true) {
            if ($i >= $group.$nativeString.length) {
                jur_MatchResultImpl_setConsumed($matchResult, $this.$consCounter1, $group.$nativeString.length);
                return $this.$next2.$matches($stringIndex + $group.$nativeString.length | 0, $testString, $matchResult);
            }
            var$6 = jl_String_charAt($group, $i);
            var$7 = $stringIndex + $i | 0;
            var$8 = $testString;
            if (var$6 != jl_String_charAt(var$8, var$7) && jur_Pattern_getSupplement(jl_String_charAt($group, $i)) != jl_String_charAt(var$8, var$7))
                break;
            $i = $i + 1 | 0;
        }
        return (-1);
    }
    return (-1);
},
jur_CIBackReferenceSet_setNext = ($this, $next) => {
    $this.$next2 = $next;
},
jur_CIBackReferenceSet_getString = ($this, $matchResult) => {
    let var$2, var$3;
    var$2 = $this.$referencedGroup;
    var$3 = jur_MatchResultImpl_getStart($matchResult, var$2);
    var$2 = jur_MatchResultImpl_getEnd($matchResult, var$2);
    return !((var$2 | var$3 | (var$2 - var$3 | 0)) >= 0 && var$2 <= $matchResult.$string3.$nativeString.length) ? null : jl_String_substring($matchResult.$string3, var$3, var$2);
},
jur_CIBackReferenceSet_getName = $this => {
    let var$1, var$2;
    var$1 = $this.$groupIndex;
    var$2 = new jl_StringBuilder;
    jl_AbstractStringBuilder__init_(var$2);
    jl_StringBuilder_append0(jl_StringBuilder_append(var$2, $rt_s(453)), var$1);
    return jl_AbstractStringBuilder_toString(var$2);
},
jur_CIBackReferenceSet_hasConsumed = ($this, $matchResult) => {
    let $res;
    $res = !jur_MatchResultImpl_getConsumed($matchResult, $this.$consCounter1) ? 0 : 1;
    jur_MatchResultImpl_setConsumed($matchResult, $this.$consCounter1, (-1));
    return $res;
},
jur_BackReferenceSet = $rt_classWithoutFields(jur_CIBackReferenceSet),
jur_BackReferenceSet__init_0 = ($this, $groupIndex, $consCounter) => {
    jur_CIBackReferenceSet__init_($this, $groupIndex, $consCounter);
},
jur_BackReferenceSet__init_ = (var_0, var_1) => {
    let var_2 = new jur_BackReferenceSet();
    jur_BackReferenceSet__init_0(var_2, var_0, var_1);
    return var_2;
},
jur_BackReferenceSet_matches = ($this, $stringIndex, $testString, $matchResult) => {
    let $group, $shift;
    $group = jur_CIBackReferenceSet_getString($this, $matchResult);
    if ($group !== null && ($stringIndex + $group.$nativeString.length | 0) <= $matchResult.$rightBound) {
        $shift = !jl_String_startsWith($testString, $group, $stringIndex) ? (-1) : $group.$nativeString.length;
        if ($shift >= 0) {
            jur_MatchResultImpl_setConsumed($matchResult, $this.$consCounter1, $shift);
            return $this.$next2.$matches($stringIndex + $shift | 0, $testString, $matchResult);
        }
        return (-1);
    }
    return (-1);
},
jur_BackReferenceSet_find = ($this, $strIndex, $testString, $matchResult) => {
    let $group, $strLength, $testStr;
    $group = jur_CIBackReferenceSet_getString($this, $matchResult);
    $strLength = $matchResult.$leftBound;
    if ($group !== null && ($strIndex + $group.$nativeString.length | 0) <= $strLength) {
        $testStr = $testString;
        while (true) {
            if ($strIndex > $strLength)
                return (-1);
            $strIndex = jl_String_indexOf0($testStr, $group, $strIndex);
            if ($strIndex < 0)
                return (-1);
            if ($this.$next2.$matches($strIndex + $group.$nativeString.length | 0, $testString, $matchResult) >= 0)
                break;
            $strIndex = $strIndex + 1 | 0;
        }
        return $strIndex;
    }
    return (-1);
},
jur_BackReferenceSet_findBack = ($this, $strIndex, $lastIndex, $testString, $matchResult) => {
    let $group, $testStr, var$7;
    $group = jur_CIBackReferenceSet_getString($this, $matchResult);
    if ($group !== null) {
        $testStr = $testString;
        a: {
            while (true) {
                if ($lastIndex < $strIndex)
                    return (-1);
                $lastIndex = jl_Math_min($lastIndex, $testStr.$nativeString.length - $group.$nativeString.length | 0);
                b: {
                    c: {
                        d: while (true) {
                            if ($lastIndex < 0)
                                break c;
                            var$7 = 0;
                            while (true) {
                                if (var$7 >= $group.$nativeString.length)
                                    break d;
                                if ($testStr.$nativeString.charCodeAt(($lastIndex + var$7 | 0)) != $group.$nativeString.charCodeAt(var$7))
                                    break;
                                var$7 = var$7 + 1 | 0;
                            }
                            $lastIndex = $lastIndex + (-1) | 0;
                        }
                        break b;
                    }
                    $lastIndex = (-1);
                }
                if ($lastIndex < 0)
                    break a;
                if ($lastIndex < $strIndex)
                    break a;
                if ($this.$next2.$matches($lastIndex + $group.$nativeString.length | 0, $testString, $matchResult) >= 0)
                    break;
                $lastIndex = $lastIndex + (-1) | 0;
            }
            return $lastIndex;
        }
        return (-1);
    }
    return (-1);
},
jur_BackReferenceSet_first = ($this, $set) => {
    return 1;
},
jur_BackReferenceSet_getName = $this => {
    let var$1, var$2;
    var$1 = $this.$groupIndex;
    var$2 = new jl_StringBuilder;
    jl_AbstractStringBuilder__init_(var$2);
    jl_StringBuilder_append0(jl_StringBuilder_append(var$2, $rt_s(454)), var$1);
    return jl_AbstractStringBuilder_toString(var$2);
};
function jur_UCIBackReferenceSet() {
    jur_CIBackReferenceSet.call(this);
    this.$groupIndex1 = 0;
}
let jur_UCIBackReferenceSet__init_ = ($this, $groupIndex, $consCounter) => {
    jur_CIBackReferenceSet__init_($this, $groupIndex, $consCounter);
},
jur_UCIBackReferenceSet__init_0 = (var_0, var_1) => {
    let var_2 = new jur_UCIBackReferenceSet();
    jur_UCIBackReferenceSet__init_(var_2, var_0, var_1);
    return var_2;
},
jur_UCIBackReferenceSet_matches = ($this, $stringIndex, $testString, $matchResult) => {
    let $group, $i, var$6, var$7;
    $group = jur_CIBackReferenceSet_getString($this, $matchResult);
    if ($group !== null && ($stringIndex + $group.$nativeString.length | 0) <= $matchResult.$rightBound) {
        $i = 0;
        while (true) {
            if ($i >= $group.$nativeString.length) {
                jur_MatchResultImpl_setConsumed($matchResult, $this.$consCounter1, $group.$nativeString.length);
                return $this.$next2.$matches($stringIndex + $group.$nativeString.length | 0, $testString, $matchResult);
            }
            var$6 = jl_Character_toLowerCase(jl_Character_toUpperCase(jl_String_charAt($group, $i)));
            var$7 = $stringIndex + $i | 0;
            if (var$6 != jl_Character_toLowerCase(jl_Character_toUpperCase(jl_String_charAt($testString, var$7))))
                break;
            $i = $i + 1 | 0;
        }
        return (-1);
    }
    return (-1);
},
jur_UCIBackReferenceSet_getName = $this => {
    let var$1, var$2;
    var$1 = $this.$groupIndex1;
    var$2 = new jl_StringBuilder;
    jl_AbstractStringBuilder__init_(var$2);
    jl_StringBuilder_append0(jl_StringBuilder_append(var$2, $rt_s(455)), var$1);
    return jl_AbstractStringBuilder_toString(var$2);
},
jl_StringBuffer = $rt_classWithoutFields(jl_AbstractStringBuilder),
jl_StringBuffer_insert0 = ($this, var$1, var$2, var$3, var$4) => {
    jl_AbstractStringBuilder_insert($this, var$1, var$2, var$3, var$4);
    return $this;
},
jl_StringBuffer_append = ($this, var$1, var$2, var$3) => {
    jl_AbstractStringBuilder_append2($this, var$1, var$2, var$3);
    return $this;
},
jl_StringBuffer_ensureCapacity = ($this, var$1) => {
    jl_AbstractStringBuilder_ensureCapacity($this, var$1);
},
jl_StringBuffer_insert = ($this, var$1, var$2) => {
    jl_AbstractStringBuilder_insert0($this, var$1, var$2);
    return $this;
};
function jur_SequenceSet() {
    let a = this; jur_LeafSet.call(a);
    a.$string = null;
    a.$leftToRight = null;
    a.$rightToLeft = null;
}
let jur_SequenceSet_accepts = ($this, $strIndex, $testString) => {
    return !jur_SequenceSet_startsWith($this, $testString, $strIndex) ? (-1) : $this.$charCount0;
},
jur_SequenceSet_find = ($this, $strIndex, $testString, $matchResult) => {
    let $strLength, var$5, var$6;
    $strLength = $matchResult.$rightBound;
    while (true) {
        if ($strIndex > $strLength)
            return (-1);
        var$5 = jl_String_charAt($this.$string, $this.$charCount0 - 1 | 0);
        a: {
            b: {
                while (true) {
                    var$6 = $this.$charCount0;
                    if ($strIndex > ($strLength - var$6 | 0))
                        break b;
                    var$6 = ($strIndex + var$6 | 0) - 1 | 0;
                    var$6 = jl_String_charAt($testString, var$6);
                    if (var$6 == var$5 && jur_SequenceSet_startsWith($this, $testString, $strIndex))
                        break;
                    $strIndex = $strIndex + jur_SequenceSet$IntHash_get($this.$leftToRight, var$6) | 0;
                }
                break a;
            }
            $strIndex = (-1);
        }
        if ($strIndex < 0)
            return (-1);
        if ($this.$next2.$matches($strIndex + $this.$charCount0 | 0, $testString, $matchResult) >= 0)
            break;
        $strIndex = $strIndex + 1 | 0;
    }
    return $strIndex;
},
jur_SequenceSet_findBack = ($this, $strIndex, $lastIndex, $testString, $matchResult) => {
    let var$5, var$6, var$7;
    while (true) {
        if ($lastIndex < $strIndex)
            return (-1);
        var$5 = jl_String_charAt($this.$string, 0);
        var$6 = $testString;
        var$7 = (var$6.$nativeString.length - $lastIndex | 0) - $this.$charCount0 | 0;
        if (var$7 <= 0)
            $lastIndex = $lastIndex + var$7 | 0;
        a: {
            b: {
                while (true) {
                    if ($lastIndex < $strIndex)
                        break b;
                    var$7 = jl_String_charAt(var$6, $lastIndex);
                    if (var$7 == var$5 && jur_SequenceSet_startsWith($this, $testString, $lastIndex))
                        break;
                    $lastIndex = $lastIndex - jur_SequenceSet$IntHash_get($this.$rightToLeft, var$7) | 0;
                }
                break a;
            }
            $lastIndex = (-1);
        }
        if ($lastIndex < 0)
            return (-1);
        if ($this.$next2.$matches($lastIndex + $this.$charCount0 | 0, $testString, $matchResult) >= 0)
            break;
        $lastIndex = $lastIndex + (-1) | 0;
    }
    return $lastIndex;
},
jur_SequenceSet_getName = $this => {
    let var$1, var$2;
    var$1 = $this.$string;
    var$2 = new jl_StringBuilder;
    jl_AbstractStringBuilder__init_(var$2);
    jl_StringBuilder_append(jl_StringBuilder_append(var$2, $rt_s(456)), var$1);
    return jl_AbstractStringBuilder_toString(var$2);
},
jur_SequenceSet_first = ($this, $set) => {
    let var$2;
    if (!($set instanceof jur_CharSet)) {
        if (!($set instanceof jur_RangeSet)) {
            if ($set instanceof jur_SupplRangeSet) {
                a: {
                    b: {
                        $set = $set;
                        if (!$set.$contains0(jl_String_charAt($this.$string, 0))) {
                            if ($this.$string.$nativeString.length <= 1)
                                break b;
                            if (!$set.$contains0(jl_Character_toCodePoint(jl_String_charAt($this.$string, 0), jl_String_charAt($this.$string, 1))))
                                break b;
                        }
                        var$2 = 1;
                        break a;
                    }
                    var$2 = 0;
                }
                return var$2;
            }
            if ($set instanceof jur_SupplCharSet)
                return !($this.$string.$nativeString.length > 1 && $set.$ch1 == jl_Character_toCodePoint(jl_String_charAt($this.$string, 0), jl_String_charAt($this.$string, 1))) ? 0 : 1;
            return 1;
        }
        return jur_RangeSet_accepts($set, 0, jl_String_substring($this.$string, 0, 1)) <= 0 ? 0 : 1;
    }
    return $set.$ch0 != jl_String_charAt($this.$string, 0) ? 0 : 1;
},
jur_SequenceSet_startsWith = ($this, $str, $from) => {
    let $i, var$4;
    $i = 0;
    while ($i < $this.$charCount0) {
        var$4 = $i + $from | 0;
        if (jl_String_charAt($str, var$4) != jl_String_charAt($this.$string, $i))
            return 0;
        $i = $i + 1 | 0;
    }
    return 1;
};
function jur_UCISequenceSet() {
    jur_LeafSet.call(this);
    this.$string1 = null;
}
let jur_UCISequenceSet__init_ = ($this, $substring) => {
    let $res, $i, var$4;
    jur_LeafSet__init_($this);
    $res = new jl_StringBuilder;
    jl_AbstractStringBuilder__init_($res);
    $i = 0;
    while (true) {
        var$4 = $rt_compare($i, $substring.$length0);
        if (var$4 >= 0) {
            $this.$string1 = jl_AbstractStringBuilder_toString($res);
            $this.$charCount0 = $res.$length0;
            return;
        }
        if ($i < 0)
            break;
        if (var$4 >= 0)
            break;
        jl_AbstractStringBuilder_append($res, jl_Character_toLowerCase(jl_Character_toUpperCase($substring.$buffer.data[$i])));
        $i = $i + 1 | 0;
    }
    $substring = new jl_IndexOutOfBoundsException;
    jl_Throwable__init_0($substring);
    $rt_throw($substring);
},
jur_UCISequenceSet__init_0 = var_0 => {
    let var_1 = new jur_UCISequenceSet();
    jur_UCISequenceSet__init_(var_1, var_0);
    return var_1;
},
jur_UCISequenceSet_accepts = ($this, $strIndex, $testString) => {
    let $i, var$4, var$5;
    $i = 0;
    while (true) {
        if ($i >= $this.$string1.$nativeString.length)
            return $this.$string1.$nativeString.length;
        var$4 = jl_String_charAt($this.$string1, $i);
        var$5 = $strIndex + $i | 0;
        if (var$4 != jl_Character_toLowerCase(jl_Character_toUpperCase(jl_String_charAt($testString, var$5))))
            break;
        $i = $i + 1 | 0;
    }
    return (-1);
},
jur_UCISequenceSet_getName = $this => {
    let var$1, var$2;
    var$1 = $this.$string1;
    var$2 = new jl_StringBuilder;
    jl_AbstractStringBuilder__init_(var$2);
    jl_StringBuilder_append(jl_StringBuilder_append(var$2, $rt_s(457)), var$1);
    return jl_AbstractStringBuilder_toString(var$2);
};
function jur_CISequenceSet() {
    jur_LeafSet.call(this);
    this.$string0 = null;
}
let jur_CISequenceSet__init_ = ($this, $substring) => {
    jur_LeafSet__init_($this);
    $this.$string0 = jl_AbstractStringBuilder_toString($substring);
    $this.$charCount0 = $substring.$length0;
},
jur_CISequenceSet__init_0 = var_0 => {
    let var_1 = new jur_CISequenceSet();
    jur_CISequenceSet__init_(var_1, var_0);
    return var_1;
},
jur_CISequenceSet_accepts = ($this, $strIndex, $testString) => {
    let $i, var$4, var$5, var$6;
    $i = 0;
    while (true) {
        if ($i >= $this.$string0.$nativeString.length)
            return $this.$string0.$nativeString.length;
        var$4 = jl_String_charAt($this.$string0, $i);
        var$5 = $strIndex + $i | 0;
        var$6 = $testString;
        if (var$4 != jl_String_charAt(var$6, var$5) && jur_Pattern_getSupplement(jl_String_charAt($this.$string0, $i)) != jl_String_charAt(var$6, var$5))
            break;
        $i = $i + 1 | 0;
    }
    return (-1);
},
jur_CISequenceSet_getName = $this => {
    let var$1, var$2;
    var$1 = $this.$string0;
    var$2 = new jl_StringBuilder;
    jl_AbstractStringBuilder__init_(var$2);
    jl_StringBuilder_append(jl_StringBuilder_append(var$2, $rt_s(458)), var$1);
    return jl_AbstractStringBuilder_toString(var$2);
};
function jur_UCISupplCharSet() {
    jur_LeafSet.call(this);
    this.$ch4 = 0;
}
let jur_UCISupplCharSet_accepts = ($this, $strIndex, $testString) => {
    let $low, $high;
    $low = $strIndex + 1 | 0;
    $testString = $testString;
    $high = jl_String_charAt($testString, $strIndex);
    $low = jl_String_charAt($testString, $low);
    return $this.$ch4 != jl_Character_toLowerCase0(jl_Character_toUpperCase0(jl_Character_toCodePoint($high, $low))) ? (-1) : 2;
},
jur_UCISupplCharSet_getName = $this => {
    let var$1, var$2;
    var$1 = jl_String__init_(jl_Character_toChars($this.$ch4));
    var$2 = new jl_StringBuilder;
    jl_AbstractStringBuilder__init_(var$2);
    jl_StringBuilder_append(jl_StringBuilder_append(var$2, $rt_s(438)), var$1);
    return jl_AbstractStringBuilder_toString(var$2);
};
function jur_LowSurrogateCharSet() {
    jur_JointSet.call(this);
    this.$low = 0;
}
let jur_LowSurrogateCharSet__init_0 = ($this, $low) => {
    jur_AbstractSet__init_($this);
    $this.$low = $low;
},
jur_LowSurrogateCharSet__init_ = var_0 => {
    let var_1 = new jur_LowSurrogateCharSet();
    jur_LowSurrogateCharSet__init_0(var_1, var_0);
    return var_1;
},
jur_LowSurrogateCharSet_setNext = ($this, $next) => {
    $this.$next2 = $next;
},
jur_LowSurrogateCharSet_matches = ($this, $stringIndex, $testString, $matchResult) => {
    let var$4, var$5, $low;
    var$4 = $stringIndex + 1 | 0;
    if (var$4 <= $matchResult.$rightBound) {
        var$5 = $testString;
        $low = jl_String_charAt(var$5, $stringIndex);
        if ($stringIndex > $matchResult.$leftBound && jl_Character_isHighSurrogate(jl_String_charAt(var$5, $stringIndex - 1 | 0)))
            return (-1);
        if ($this.$low == $low)
            return $this.$next2.$matches(var$4, $testString, $matchResult);
        return (-1);
    }
    $matchResult.$hitEnd = 1;
    return (-1);
},
jur_LowSurrogateCharSet_find = ($this, $strIndex, $testString, $matchResult) => {
    let $testStr, $startStr, $strLength, var$7, var$8;
    if ($testString instanceof jl_String) {
        $testStr = $testString;
        $startStr = $matchResult.$leftBound;
        $strLength = $matchResult.$rightBound;
        while (true) {
            if ($strIndex >= $strLength)
                return (-1);
            var$7 = jl_String_indexOf($testStr, $this.$low, $strIndex);
            if (var$7 < 0)
                return (-1);
            if (var$7 > $startStr && jl_Character_isHighSurrogate(jl_String_charAt($testStr, var$7 - 1 | 0))) {
                $strIndex = var$7 + 1 | 0;
                continue;
            }
            var$8 = $this.$next2;
            $strIndex = var$7 + 1 | 0;
            if (var$8.$matches($strIndex, $testString, $matchResult) >= 0)
                break;
        }
        return var$7;
    }
    return jur_AbstractSet_find($this, $strIndex, $testString, $matchResult);
},
jur_LowSurrogateCharSet_findBack = ($this, $strIndex, $lastIndex, $testString, $matchResult) => {
    let $startStr, $testStr;
    if ($testString instanceof jl_String) {
        $startStr = $matchResult.$leftBound;
        $testStr = $testString;
        a: {
            while (true) {
                if ($lastIndex < $strIndex)
                    return (-1);
                $lastIndex = jl_String_lastIndexOf($testStr, $this.$low, $lastIndex);
                if ($lastIndex < 0)
                    break a;
                if ($lastIndex < $strIndex)
                    break a;
                if ($lastIndex > $startStr && jl_Character_isHighSurrogate(jl_String_charAt($testStr, $lastIndex - 1 | 0))) {
                    $lastIndex = $lastIndex + (-2) | 0;
                    continue;
                }
                if ($this.$next2.$matches($lastIndex + 1 | 0, $testString, $matchResult) >= 0)
                    break;
                $lastIndex = $lastIndex + (-1) | 0;
            }
            return $lastIndex;
        }
        return (-1);
    }
    return jur_AbstractSet_findBack($this, $strIndex, $lastIndex, $testString, $matchResult);
},
jur_LowSurrogateCharSet_getName = $this => {
    let var$1, var$2;
    var$1 = $this.$low;
    var$2 = new jl_StringBuilder;
    jl_AbstractStringBuilder__init_(var$2);
    jl_AbstractStringBuilder_append(var$2, var$1);
    return jl_AbstractStringBuilder_toString(var$2);
},
jur_LowSurrogateCharSet_first = ($this, $set) => {
    if (!($set instanceof jur_CharSet)) {
        if (!($set instanceof jur_RangeSet)) {
            if (!($set instanceof jur_SupplRangeSet)) {
                if (!($set instanceof jur_SupplCharSet)) {
                    if (!($set instanceof jur_HighSurrogateCharSet)) {
                        if ($set instanceof jur_LowSurrogateCharSet)
                            return $set.$low != $this.$low ? 0 : 1;
                        return 1;
                    }
                    return 0;
                }
                return 0;
            }
            return 0;
        }
        return 0;
    }
    return 0;
},
jur_LowSurrogateCharSet_hasConsumed = ($this, $matchResult) => {
    return 1;
};
function jur_HighSurrogateCharSet() {
    jur_JointSet.call(this);
    this.$high = 0;
}
let jur_HighSurrogateCharSet__init_0 = ($this, $high) => {
    jur_AbstractSet__init_($this);
    $this.$high = $high;
},
jur_HighSurrogateCharSet__init_ = var_0 => {
    let var_1 = new jur_HighSurrogateCharSet();
    jur_HighSurrogateCharSet__init_0(var_1, var_0);
    return var_1;
},
jur_HighSurrogateCharSet_setNext = ($this, $next) => {
    $this.$next2 = $next;
},
jur_HighSurrogateCharSet_matches = ($this, $stringIndex, $testString, $matchResult) => {
    let $strLength, var$5, $low, var$7, $high;
    $strLength = $matchResult.$rightBound;
    var$5 = $stringIndex + 1 | 0;
    $low = $rt_compare(var$5, $strLength);
    if ($low <= 0) {
        var$7 = $testString;
        $high = jl_String_charAt(var$7, $stringIndex);
        if ($low < 0 && jl_Character_isLowSurrogate(jl_String_charAt(var$7, var$5)))
            return (-1);
        if ($this.$high == $high)
            return $this.$next2.$matches(var$5, $testString, $matchResult);
        return (-1);
    }
    $matchResult.$hitEnd = 1;
    return (-1);
},
jur_HighSurrogateCharSet_find = ($this, $strIndex, $testString, $matchResult) => {
    let $testStr, $strLength, var$6;
    if ($testString instanceof jl_String) {
        $testStr = $testString;
        $strLength = $matchResult.$rightBound;
        while (true) {
            if ($strIndex >= $strLength)
                return (-1);
            var$6 = jl_String_indexOf($testStr, $this.$high, $strIndex);
            if (var$6 < 0)
                return (-1);
            $strIndex = var$6 + 1 | 0;
            if ($strIndex < $strLength && jl_Character_isLowSurrogate(jl_String_charAt($testStr, $strIndex))) {
                $strIndex = var$6 + 2 | 0;
                continue;
            }
            if ($this.$next2.$matches($strIndex, $testString, $matchResult) >= 0)
                break;
        }
        return var$6;
    }
    return jur_AbstractSet_find($this, $strIndex, $testString, $matchResult);
},
jur_HighSurrogateCharSet_findBack = ($this, $strIndex, $lastIndex, $testString, $matchResult) => {
    let $testStr, $strLength, var$7;
    if ($testString instanceof jl_String) {
        $testStr = $testString;
        $strLength = $matchResult.$rightBound;
        a: {
            while (true) {
                if ($lastIndex < $strIndex)
                    return (-1);
                $lastIndex = jl_String_lastIndexOf($testStr, $this.$high, $lastIndex);
                if ($lastIndex < 0)
                    break a;
                if ($lastIndex < $strIndex)
                    break a;
                var$7 = $lastIndex + 1 | 0;
                if (var$7 < $strLength && jl_Character_isLowSurrogate(jl_String_charAt($testStr, var$7))) {
                    $lastIndex = $lastIndex + (-1) | 0;
                    continue;
                }
                if ($this.$next2.$matches(var$7, $testString, $matchResult) >= 0)
                    break;
                $lastIndex = $lastIndex + (-1) | 0;
            }
            return $lastIndex;
        }
        return (-1);
    }
    return jur_AbstractSet_findBack($this, $strIndex, $lastIndex, $testString, $matchResult);
},
jur_HighSurrogateCharSet_getName = $this => {
    let var$1, var$2;
    var$1 = $this.$high;
    var$2 = new jl_StringBuilder;
    jl_AbstractStringBuilder__init_(var$2);
    jl_AbstractStringBuilder_append(var$2, var$1);
    return jl_AbstractStringBuilder_toString(var$2);
},
jur_HighSurrogateCharSet_first = ($this, $set) => {
    if (!($set instanceof jur_CharSet)) {
        if (!($set instanceof jur_RangeSet)) {
            if (!($set instanceof jur_SupplRangeSet)) {
                if (!($set instanceof jur_SupplCharSet)) {
                    if (!($set instanceof jur_LowSurrogateCharSet)) {
                        if ($set instanceof jur_HighSurrogateCharSet)
                            return $set.$high != $this.$high ? 0 : 1;
                        return 1;
                    }
                    return 0;
                }
                return 0;
            }
            return 0;
        }
        return 0;
    }
    return 0;
},
jur_HighSurrogateCharSet_hasConsumed = ($this, $matchResult) => {
    return 1;
};
function jur_SupplCharSet() {
    let a = this; jur_LeafSet.call(a);
    a.$high0 = 0;
    a.$low0 = 0;
    a.$ch1 = 0;
}
let jur_SupplCharSet_accepts = ($this, $strIndex, $testString) => {
    let $low, $high;
    $low = $strIndex + 1 | 0;
    $testString = $testString;
    $high = jl_String_charAt($testString, $strIndex);
    $low = jl_String_charAt($testString, $low);
    return !($this.$high0 == $high && $this.$low0 == $low) ? (-1) : 2;
},
jur_SupplCharSet_find = ($this, $strIndex, $testString, $matchResult) => {
    let $testStr, $strLength, $ch;
    if ($testString instanceof jl_String) {
        $testStr = $testString;
        $strLength = $matchResult.$rightBound;
        while ($strIndex < $strLength) {
            $strIndex = jl_String_indexOf($testStr, $this.$high0, $strIndex);
            if ($strIndex < 0)
                return (-1);
            $strIndex = $strIndex + 1 | 0;
            if ($strIndex >= $strLength)
                continue;
            $ch = jl_String_charAt($testStr, $strIndex);
            if ($this.$low0 == $ch && $this.$next2.$matches($strIndex + 1 | 0, $testString, $matchResult) >= 0)
                return $strIndex + (-1) | 0;
            $strIndex = $strIndex + 1 | 0;
        }
        return (-1);
    }
    return jur_AbstractSet_find($this, $strIndex, $testString, $matchResult);
},
jur_SupplCharSet_findBack = ($this, $strIndex, $lastIndex, $testString, $matchResult) => {
    let $testStr;
    if ($testString instanceof jl_String) {
        $testStr = $testString;
        a: {
            while (true) {
                if ($lastIndex < $strIndex)
                    return (-1);
                $lastIndex = jl_String_lastIndexOf($testStr, $this.$low0, $lastIndex) + (-1) | 0;
                if ($lastIndex < 0)
                    break a;
                if ($lastIndex < $strIndex)
                    break a;
                if ($this.$high0 == jl_String_charAt($testStr, $lastIndex) && $this.$next2.$matches($lastIndex + 2 | 0, $testString, $matchResult) >= 0)
                    break;
                $lastIndex = $lastIndex + (-1) | 0;
            }
            return $lastIndex;
        }
        return (-1);
    }
    return jur_AbstractSet_findBack($this, $strIndex, $lastIndex, $testString, $matchResult);
},
jur_SupplCharSet_getName = $this => {
    let var$1, var$2, var$3;
    var$1 = $this.$high0;
    var$2 = $this.$low0;
    var$3 = new jl_StringBuilder;
    jl_AbstractStringBuilder__init_(var$3);
    jl_AbstractStringBuilder_append(var$3, var$1);
    jl_AbstractStringBuilder_append(var$3, var$2);
    return jl_AbstractStringBuilder_toString(var$3);
},
jur_SupplCharSet_first = ($this, $set) => {
    if (!($set instanceof jur_SupplCharSet)) {
        if (!($set instanceof jur_SupplRangeSet)) {
            if (!($set instanceof jur_CharSet)) {
                if ($set instanceof jur_RangeSet)
                    return 0;
                return 1;
            }
            return 0;
        }
        return $set.$contains0($this.$ch1);
    }
    return $set.$ch1 != $this.$ch1 ? 0 : 1;
},
jur_AbstractLineTerminator$1 = $rt_classWithoutFields(jur_AbstractLineTerminator),
jur_AbstractLineTerminator$1_isLineTerminator = ($this, $ch) => {
    return $ch != 10 ? 0 : 1;
},
jur_AbstractLineTerminator$1_isAfterLineTerminator = ($this, $ch, $ch2) => {
    return $ch != 10 ? 0 : 1;
},
jur_AbstractLineTerminator$2 = $rt_classWithoutFields(jur_AbstractLineTerminator),
jur_AbstractLineTerminator$2_isLineTerminator = ($this, $ch) => {
    return !($ch != 10 && $ch != 13 && $ch != 133 && ($ch | 1) != 8233) ? 1 : 0;
},
jur_AbstractLineTerminator$2_isAfterLineTerminator = ($this, $ch, $ch2) => {
    a: {
        b: {
            if ($ch != 10 && $ch != 133 && ($ch | 1) != 8233) {
                if ($ch != 13)
                    break b;
                if ($ch2 == 10)
                    break b;
            }
            $ch = 1;
            break a;
        }
        $ch = 0;
    }
    return $ch;
};
function jur_SequenceSet$IntHash() {
    let a = this; jl_Object.call(a);
    a.$table = null;
    a.$values1 = null;
    a.$mask = 0;
    a.$size3 = 0;
}
let jur_SequenceSet$IntHash__init_0 = ($this, $size) => {
    let var$2, var$3;
    while (true) {
        var$2 = $this.$mask;
        if ($size < var$2)
            break;
        $this.$mask = var$2 << 1 | 1;
    }
    var$3 = var$2 << 1 | 1;
    $this.$mask = var$3;
    var$3 = var$3 + 1 | 0;
    $this.$table = $rt_createIntArray(var$3);
    $this.$values1 = $rt_createIntArray(var$3);
    $this.$size3 = $size;
},
jur_SequenceSet$IntHash__init_ = var_0 => {
    let var_1 = new jur_SequenceSet$IntHash();
    jur_SequenceSet$IntHash__init_0(var_1, var_0);
    return var_1;
},
jur_SequenceSet$IntHash_put = ($this, $key, $value) => {
    let $i, var$4, $hashCode, var$6;
    $i = 0;
    var$4 = $this.$mask;
    $hashCode = $key & var$4;
    while (true) {
        var$6 = $this.$table.data;
        if (!var$6[$hashCode])
            break;
        if (var$6[$hashCode] == $key)
            break;
        $i = ($i + 1 | 0) & var$4;
        $hashCode = ($hashCode + $i | 0) & var$4;
    }
    var$6[$hashCode] = $key;
    $this.$values1.data[$hashCode] = $value;
},
jur_SequenceSet$IntHash_get = ($this, $key) => {
    let var$2, $hashCode, $i, $storedKey;
    var$2 = $this.$mask;
    $hashCode = $key & var$2;
    $i = 0;
    while (true) {
        $storedKey = $this.$table.data[$hashCode];
        if (!$storedKey)
            break;
        if ($storedKey == $key)
            return $this.$values1.data[$hashCode];
        $i = ($i + 1 | 0) & var$2;
        $hashCode = ($hashCode + $i | 0) & var$2;
    }
    return $this.$size3;
},
jur_AbstractCharClass$LazySpace = $rt_classWithoutFields(jur_AbstractCharClass$LazyCharClass),
jur_AbstractCharClass$LazySpace__init_0 = $this => {
    return;
},
jur_AbstractCharClass$LazySpace__init_ = () => {
    let var_0 = new jur_AbstractCharClass$LazySpace();
    jur_AbstractCharClass$LazySpace__init_0(var_0);
    return var_0;
},
jur_AbstractCharClass$LazySpace_computeValue = $this => {
    return jur_CharClass_add0(jur_CharClass_add(jur_CharClass__init_(), 9, 13), 32);
},
jur_AbstractCharClass$LazyDigit = $rt_classWithoutFields(jur_AbstractCharClass$LazyCharClass),
jur_AbstractCharClass$LazyDigit__init_ = $this => {
    return;
},
jur_AbstractCharClass$LazyDigit__init_0 = () => {
    let var_0 = new jur_AbstractCharClass$LazyDigit();
    jur_AbstractCharClass$LazyDigit__init_(var_0);
    return var_0;
},
jur_AbstractCharClass$LazyDigit_computeValue = $this => {
    return jur_CharClass_add(jur_CharClass__init_(), 48, 57);
},
jur_AbstractCharClass$LazyLower = $rt_classWithoutFields(jur_AbstractCharClass$LazyCharClass),
jur_AbstractCharClass$LazyLower__init_ = $this => {
    return;
},
jur_AbstractCharClass$LazyLower__init_0 = () => {
    let var_0 = new jur_AbstractCharClass$LazyLower();
    jur_AbstractCharClass$LazyLower__init_(var_0);
    return var_0;
},
jur_AbstractCharClass$LazyLower_computeValue = $this => {
    return jur_CharClass_add(jur_CharClass__init_(), 97, 122);
},
jur_AbstractCharClass$LazyUpper = $rt_classWithoutFields(jur_AbstractCharClass$LazyCharClass),
jur_AbstractCharClass$LazyUpper__init_0 = $this => {
    return;
},
jur_AbstractCharClass$LazyUpper__init_ = () => {
    let var_0 = new jur_AbstractCharClass$LazyUpper();
    jur_AbstractCharClass$LazyUpper__init_0(var_0);
    return var_0;
},
jur_AbstractCharClass$LazyUpper_computeValue = $this => {
    return jur_CharClass_add(jur_CharClass__init_(), 65, 90);
},
jur_AbstractCharClass$LazyASCII = $rt_classWithoutFields(jur_AbstractCharClass$LazyCharClass),
jur_AbstractCharClass$LazyASCII__init_ = $this => {
    return;
},
jur_AbstractCharClass$LazyASCII__init_0 = () => {
    let var_0 = new jur_AbstractCharClass$LazyASCII();
    jur_AbstractCharClass$LazyASCII__init_(var_0);
    return var_0;
},
jur_AbstractCharClass$LazyASCII_computeValue = $this => {
    return jur_CharClass_add(jur_CharClass__init_(), 0, 127);
},
jur_AbstractCharClass$LazyAlpha = $rt_classWithoutFields(jur_AbstractCharClass$LazyCharClass),
jur_AbstractCharClass$LazyAlpha__init_ = $this => {
    return;
},
jur_AbstractCharClass$LazyAlpha__init_0 = () => {
    let var_0 = new jur_AbstractCharClass$LazyAlpha();
    jur_AbstractCharClass$LazyAlpha__init_(var_0);
    return var_0;
},
jur_AbstractCharClass$LazyAlpha_computeValue = $this => {
    return jur_CharClass_add(jur_CharClass_add(jur_CharClass__init_(), 97, 122), 65, 90);
},
jur_AbstractCharClass$LazyAlnum = $rt_classWithoutFields(jur_AbstractCharClass$LazyAlpha),
jur_AbstractCharClass$LazyAlnum__init_0 = $this => {
    return;
},
jur_AbstractCharClass$LazyAlnum__init_ = () => {
    let var_0 = new jur_AbstractCharClass$LazyAlnum();
    jur_AbstractCharClass$LazyAlnum__init_0(var_0);
    return var_0;
},
jur_AbstractCharClass$LazyAlnum_computeValue = $this => {
    return jur_CharClass_add(jur_AbstractCharClass$LazyAlpha_computeValue($this), 48, 57);
},
jur_AbstractCharClass$LazyPunct = $rt_classWithoutFields(jur_AbstractCharClass$LazyCharClass),
jur_AbstractCharClass$LazyPunct__init_ = $this => {
    return;
},
jur_AbstractCharClass$LazyPunct__init_0 = () => {
    let var_0 = new jur_AbstractCharClass$LazyPunct();
    jur_AbstractCharClass$LazyPunct__init_(var_0);
    return var_0;
},
jur_AbstractCharClass$LazyPunct_computeValue = $this => {
    return jur_CharClass_add(jur_CharClass_add(jur_CharClass_add(jur_CharClass__init_(), 33, 64), 91, 96), 123, 126);
},
jur_AbstractCharClass$LazyGraph = $rt_classWithoutFields(jur_AbstractCharClass$LazyAlnum),
jur_AbstractCharClass$LazyGraph__init_0 = $this => {
    return;
},
jur_AbstractCharClass$LazyGraph__init_ = () => {
    let var_0 = new jur_AbstractCharClass$LazyGraph();
    jur_AbstractCharClass$LazyGraph__init_0(var_0);
    return var_0;
},
jur_AbstractCharClass$LazyGraph_computeValue = $this => {
    return jur_CharClass_add(jur_CharClass_add(jur_CharClass_add(jur_AbstractCharClass$LazyAlnum_computeValue($this), 33, 64), 91, 96), 123, 126);
},
jur_AbstractCharClass$LazyPrint = $rt_classWithoutFields(jur_AbstractCharClass$LazyGraph),
jur_AbstractCharClass$LazyPrint__init_0 = $this => {
    return;
},
jur_AbstractCharClass$LazyPrint__init_ = () => {
    let var_0 = new jur_AbstractCharClass$LazyPrint();
    jur_AbstractCharClass$LazyPrint__init_0(var_0);
    return var_0;
},
jur_AbstractCharClass$LazyPrint_computeValue = $this => {
    return jur_CharClass_add0(jur_AbstractCharClass$LazyGraph_computeValue($this), 32);
},
jur_AbstractCharClass$LazyBlank = $rt_classWithoutFields(jur_AbstractCharClass$LazyCharClass),
jur_AbstractCharClass$LazyBlank__init_0 = $this => {
    return;
},
jur_AbstractCharClass$LazyBlank__init_ = () => {
    let var_0 = new jur_AbstractCharClass$LazyBlank();
    jur_AbstractCharClass$LazyBlank__init_0(var_0);
    return var_0;
},
jur_AbstractCharClass$LazyBlank_computeValue = $this => {
    return jur_CharClass_add0(jur_CharClass_add0(jur_CharClass__init_(), 32), 9);
},
jur_AbstractCharClass$LazyCntrl = $rt_classWithoutFields(jur_AbstractCharClass$LazyCharClass),
jur_AbstractCharClass$LazyCntrl__init_0 = $this => {
    return;
};
let jur_AbstractCharClass$LazyCntrl__init_ = () => {
    let var_0 = new jur_AbstractCharClass$LazyCntrl();
    jur_AbstractCharClass$LazyCntrl__init_0(var_0);
    return var_0;
},
jur_AbstractCharClass$LazyCntrl_computeValue = $this => {
    return jur_CharClass_add0(jur_CharClass_add(jur_CharClass__init_(), 0, 31), 127);
},
jur_AbstractCharClass$LazyXDigit = $rt_classWithoutFields(jur_AbstractCharClass$LazyCharClass),
jur_AbstractCharClass$LazyXDigit__init_0 = $this => {
    return;
},
jur_AbstractCharClass$LazyXDigit__init_ = () => {
    let var_0 = new jur_AbstractCharClass$LazyXDigit();
    jur_AbstractCharClass$LazyXDigit__init_0(var_0);
    return var_0;
},
jur_AbstractCharClass$LazyXDigit_computeValue = $this => {
    return jur_CharClass_add(jur_CharClass_add(jur_CharClass_add(jur_CharClass__init_(), 48, 57), 97, 102), 65, 70);
},
jur_AbstractCharClass$LazyJavaLowerCase = $rt_classWithoutFields(jur_AbstractCharClass$LazyCharClass),
jur_AbstractCharClass$LazyJavaLowerCase__init_ = $this => {
    return;
},
jur_AbstractCharClass$LazyJavaLowerCase__init_0 = () => {
    let var_0 = new jur_AbstractCharClass$LazyJavaLowerCase();
    jur_AbstractCharClass$LazyJavaLowerCase__init_(var_0);
    return var_0;
},
jur_AbstractCharClass$LazyJavaLowerCase_computeValue = $this => {
    let $chCl;
    $chCl = new jur_AbstractCharClass$LazyJavaLowerCase$1;
    $chCl.$this$040 = $this;
    jur_AbstractCharClass__init_($chCl);
    $chCl.$mayContainSupplCodepoints = 1;
    return $chCl;
},
jur_AbstractCharClass$LazyJavaUpperCase = $rt_classWithoutFields(jur_AbstractCharClass$LazyCharClass),
jur_AbstractCharClass$LazyJavaUpperCase__init_0 = $this => {
    return;
},
jur_AbstractCharClass$LazyJavaUpperCase__init_ = () => {
    let var_0 = new jur_AbstractCharClass$LazyJavaUpperCase();
    jur_AbstractCharClass$LazyJavaUpperCase__init_0(var_0);
    return var_0;
},
jur_AbstractCharClass$LazyJavaUpperCase_computeValue = $this => {
    let $chCl;
    $chCl = new jur_AbstractCharClass$LazyJavaUpperCase$1;
    $chCl.$this$015 = $this;
    jur_AbstractCharClass__init_($chCl);
    $chCl.$mayContainSupplCodepoints = 1;
    return $chCl;
},
jur_AbstractCharClass$LazyJavaWhitespace = $rt_classWithoutFields(jur_AbstractCharClass$LazyCharClass),
jur_AbstractCharClass$LazyJavaWhitespace__init_ = $this => {
    return;
},
jur_AbstractCharClass$LazyJavaWhitespace__init_0 = () => {
    let var_0 = new jur_AbstractCharClass$LazyJavaWhitespace();
    jur_AbstractCharClass$LazyJavaWhitespace__init_(var_0);
    return var_0;
},
jur_AbstractCharClass$LazyJavaWhitespace_computeValue = $this => {
    let var$1;
    var$1 = new jur_AbstractCharClass$LazyJavaWhitespace$1;
    var$1.$this$032 = $this;
    jur_AbstractCharClass__init_(var$1);
    return var$1;
},
jur_AbstractCharClass$LazyJavaMirrored = $rt_classWithoutFields(jur_AbstractCharClass$LazyCharClass),
jur_AbstractCharClass$LazyJavaMirrored__init_ = $this => {
    return;
},
jur_AbstractCharClass$LazyJavaMirrored__init_0 = () => {
    let var_0 = new jur_AbstractCharClass$LazyJavaMirrored();
    jur_AbstractCharClass$LazyJavaMirrored__init_(var_0);
    return var_0;
},
jur_AbstractCharClass$LazyJavaMirrored_computeValue = $this => {
    let var$1;
    var$1 = new jur_AbstractCharClass$LazyJavaMirrored$1;
    var$1.$this$027 = $this;
    jur_AbstractCharClass__init_(var$1);
    return var$1;
},
jur_AbstractCharClass$LazyJavaDefined = $rt_classWithoutFields(jur_AbstractCharClass$LazyCharClass),
jur_AbstractCharClass$LazyJavaDefined__init_0 = $this => {
    return;
},
jur_AbstractCharClass$LazyJavaDefined__init_ = () => {
    let var_0 = new jur_AbstractCharClass$LazyJavaDefined();
    jur_AbstractCharClass$LazyJavaDefined__init_0(var_0);
    return var_0;
},
jur_AbstractCharClass$LazyJavaDefined_computeValue = $this => {
    let $chCl;
    $chCl = new jur_AbstractCharClass$LazyJavaDefined$1;
    $chCl.$this$030 = $this;
    jur_AbstractCharClass__init_($chCl);
    ju_BitSet_set($chCl.$lowHighSurrogates, 0, 2048);
    $chCl.$mayContainSupplCodepoints = 1;
    return $chCl;
},
jur_AbstractCharClass$LazyJavaDigit = $rt_classWithoutFields(jur_AbstractCharClass$LazyCharClass),
jur_AbstractCharClass$LazyJavaDigit__init_ = $this => {
    return;
},
jur_AbstractCharClass$LazyJavaDigit__init_0 = () => {
    let var_0 = new jur_AbstractCharClass$LazyJavaDigit();
    jur_AbstractCharClass$LazyJavaDigit__init_(var_0);
    return var_0;
},
jur_AbstractCharClass$LazyJavaDigit_computeValue = $this => {
    let $chCl;
    $chCl = new jur_AbstractCharClass$LazyJavaDigit$1;
    $chCl.$this$018 = $this;
    jur_AbstractCharClass__init_($chCl);
    $chCl.$mayContainSupplCodepoints = 1;
    return $chCl;
},
jur_AbstractCharClass$LazyJavaIdentifierIgnorable = $rt_classWithoutFields(jur_AbstractCharClass$LazyCharClass),
jur_AbstractCharClass$LazyJavaIdentifierIgnorable__init_ = $this => {
    return;
},
jur_AbstractCharClass$LazyJavaIdentifierIgnorable__init_0 = () => {
    let var_0 = new jur_AbstractCharClass$LazyJavaIdentifierIgnorable();
    jur_AbstractCharClass$LazyJavaIdentifierIgnorable__init_(var_0);
    return var_0;
},
jur_AbstractCharClass$LazyJavaIdentifierIgnorable_computeValue = $this => {
    let $chCl;
    $chCl = new jur_AbstractCharClass$LazyJavaIdentifierIgnorable$1;
    $chCl.$this$035 = $this;
    jur_AbstractCharClass__init_($chCl);
    $chCl.$mayContainSupplCodepoints = 1;
    return $chCl;
},
jur_AbstractCharClass$LazyJavaISOControl = $rt_classWithoutFields(jur_AbstractCharClass$LazyCharClass),
jur_AbstractCharClass$LazyJavaISOControl__init_ = $this => {
    return;
},
jur_AbstractCharClass$LazyJavaISOControl__init_0 = () => {
    let var_0 = new jur_AbstractCharClass$LazyJavaISOControl();
    jur_AbstractCharClass$LazyJavaISOControl__init_(var_0);
    return var_0;
},
jur_AbstractCharClass$LazyJavaISOControl_computeValue = $this => {
    let var$1;
    var$1 = new jur_AbstractCharClass$LazyJavaISOControl$1;
    var$1.$this$041 = $this;
    jur_AbstractCharClass__init_(var$1);
    return var$1;
},
jur_AbstractCharClass$LazyJavaJavaIdentifierPart = $rt_classWithoutFields(jur_AbstractCharClass$LazyCharClass),
jur_AbstractCharClass$LazyJavaJavaIdentifierPart__init_ = $this => {
    return;
},
jur_AbstractCharClass$LazyJavaJavaIdentifierPart__init_0 = () => {
    let var_0 = new jur_AbstractCharClass$LazyJavaJavaIdentifierPart();
    jur_AbstractCharClass$LazyJavaJavaIdentifierPart__init_(var_0);
    return var_0;
},
jur_AbstractCharClass$LazyJavaJavaIdentifierPart_computeValue = $this => {
    let $chCl;
    $chCl = new jur_AbstractCharClass$LazyJavaJavaIdentifierPart$1;
    $chCl.$this$012 = $this;
    jur_AbstractCharClass__init_($chCl);
    $chCl.$mayContainSupplCodepoints = 1;
    return $chCl;
},
jur_AbstractCharClass$LazyJavaJavaIdentifierStart = $rt_classWithoutFields(jur_AbstractCharClass$LazyCharClass),
jur_AbstractCharClass$LazyJavaJavaIdentifierStart__init_ = $this => {
    return;
},
jur_AbstractCharClass$LazyJavaJavaIdentifierStart__init_0 = () => {
    let var_0 = new jur_AbstractCharClass$LazyJavaJavaIdentifierStart();
    jur_AbstractCharClass$LazyJavaJavaIdentifierStart__init_(var_0);
    return var_0;
},
jur_AbstractCharClass$LazyJavaJavaIdentifierStart_computeValue = $this => {
    let $chCl;
    $chCl = new jur_AbstractCharClass$LazyJavaJavaIdentifierStart$1;
    $chCl.$this$019 = $this;
    jur_AbstractCharClass__init_($chCl);
    $chCl.$mayContainSupplCodepoints = 1;
    return $chCl;
},
jur_AbstractCharClass$LazyJavaLetter = $rt_classWithoutFields(jur_AbstractCharClass$LazyCharClass),
jur_AbstractCharClass$LazyJavaLetter__init_0 = $this => {
    return;
},
jur_AbstractCharClass$LazyJavaLetter__init_ = () => {
    let var_0 = new jur_AbstractCharClass$LazyJavaLetter();
    jur_AbstractCharClass$LazyJavaLetter__init_0(var_0);
    return var_0;
},
jur_AbstractCharClass$LazyJavaLetter_computeValue = $this => {
    let $chCl;
    $chCl = new jur_AbstractCharClass$LazyJavaLetter$1;
    $chCl.$this$029 = $this;
    jur_AbstractCharClass__init_($chCl);
    $chCl.$mayContainSupplCodepoints = 1;
    return $chCl;
};
let jur_AbstractCharClass$LazyJavaLetterOrDigit = $rt_classWithoutFields(jur_AbstractCharClass$LazyCharClass),
jur_AbstractCharClass$LazyJavaLetterOrDigit__init_0 = $this => {
    return;
},
jur_AbstractCharClass$LazyJavaLetterOrDigit__init_ = () => {
    let var_0 = new jur_AbstractCharClass$LazyJavaLetterOrDigit();
    jur_AbstractCharClass$LazyJavaLetterOrDigit__init_0(var_0);
    return var_0;
},
jur_AbstractCharClass$LazyJavaLetterOrDigit_computeValue = $this => {
    let $chCl;
    $chCl = new jur_AbstractCharClass$LazyJavaLetterOrDigit$1;
    $chCl.$this$033 = $this;
    jur_AbstractCharClass__init_($chCl);
    $chCl.$mayContainSupplCodepoints = 1;
    return $chCl;
},
jur_AbstractCharClass$LazyJavaSpaceChar = $rt_classWithoutFields(jur_AbstractCharClass$LazyCharClass),
jur_AbstractCharClass$LazyJavaSpaceChar__init_ = $this => {
    return;
},
jur_AbstractCharClass$LazyJavaSpaceChar__init_0 = () => {
    let var_0 = new jur_AbstractCharClass$LazyJavaSpaceChar();
    jur_AbstractCharClass$LazyJavaSpaceChar__init_(var_0);
    return var_0;
},
jur_AbstractCharClass$LazyJavaSpaceChar_computeValue = $this => {
    let var$1;
    var$1 = new jur_AbstractCharClass$LazyJavaSpaceChar$1;
    var$1.$this$034 = $this;
    jur_AbstractCharClass__init_(var$1);
    return var$1;
},
jur_AbstractCharClass$LazyJavaTitleCase = $rt_classWithoutFields(jur_AbstractCharClass$LazyCharClass),
jur_AbstractCharClass$LazyJavaTitleCase__init_ = $this => {
    return;
},
jur_AbstractCharClass$LazyJavaTitleCase__init_0 = () => {
    let var_0 = new jur_AbstractCharClass$LazyJavaTitleCase();
    jur_AbstractCharClass$LazyJavaTitleCase__init_(var_0);
    return var_0;
},
jur_AbstractCharClass$LazyJavaTitleCase_computeValue = $this => {
    let var$1;
    var$1 = new jur_AbstractCharClass$LazyJavaTitleCase$1;
    var$1.$this$020 = $this;
    jur_AbstractCharClass__init_(var$1);
    return var$1;
},
jur_AbstractCharClass$LazyJavaUnicodeIdentifierPart = $rt_classWithoutFields(jur_AbstractCharClass$LazyCharClass),
jur_AbstractCharClass$LazyJavaUnicodeIdentifierPart__init_0 = $this => {
    return;
},
jur_AbstractCharClass$LazyJavaUnicodeIdentifierPart__init_ = () => {
    let var_0 = new jur_AbstractCharClass$LazyJavaUnicodeIdentifierPart();
    jur_AbstractCharClass$LazyJavaUnicodeIdentifierPart__init_0(var_0);
    return var_0;
},
jur_AbstractCharClass$LazyJavaUnicodeIdentifierPart_computeValue = $this => {
    let $chCl;
    $chCl = new jur_AbstractCharClass$LazyJavaUnicodeIdentifierPart$1;
    $chCl.$this$014 = $this;
    jur_AbstractCharClass__init_($chCl);
    $chCl.$mayContainSupplCodepoints = 1;
    return $chCl;
},
jur_AbstractCharClass$LazyJavaUnicodeIdentifierStart = $rt_classWithoutFields(jur_AbstractCharClass$LazyCharClass),
jur_AbstractCharClass$LazyJavaUnicodeIdentifierStart__init_0 = $this => {
    return;
},
jur_AbstractCharClass$LazyJavaUnicodeIdentifierStart__init_ = () => {
    let var_0 = new jur_AbstractCharClass$LazyJavaUnicodeIdentifierStart();
    jur_AbstractCharClass$LazyJavaUnicodeIdentifierStart__init_0(var_0);
    return var_0;
},
jur_AbstractCharClass$LazyJavaUnicodeIdentifierStart_computeValue = $this => {
    let $chCl;
    $chCl = new jur_AbstractCharClass$LazyJavaUnicodeIdentifierStart$1;
    $chCl.$this$039 = $this;
    jur_AbstractCharClass__init_($chCl);
    $chCl.$mayContainSupplCodepoints = 1;
    return $chCl;
},
jur_AbstractCharClass$LazyWord = $rt_classWithoutFields(jur_AbstractCharClass$LazyCharClass),
jur_AbstractCharClass$LazyWord__init_0 = $this => {
    return;
},
jur_AbstractCharClass$LazyWord__init_ = () => {
    let var_0 = new jur_AbstractCharClass$LazyWord();
    jur_AbstractCharClass$LazyWord__init_0(var_0);
    return var_0;
},
jur_AbstractCharClass$LazyWord_computeValue = $this => {
    return jur_CharClass_add0(jur_CharClass_add(jur_CharClass_add(jur_CharClass_add(jur_CharClass__init_(), 97, 122), 65, 90), 48, 57), 95);
},
jur_AbstractCharClass$LazyNonWord = $rt_classWithoutFields(jur_AbstractCharClass$LazyWord),
jur_AbstractCharClass$LazyNonWord__init_0 = $this => {
    return;
},
jur_AbstractCharClass$LazyNonWord__init_ = () => {
    let var_0 = new jur_AbstractCharClass$LazyNonWord();
    jur_AbstractCharClass$LazyNonWord__init_0(var_0);
    return var_0;
},
jur_AbstractCharClass$LazyNonWord_computeValue = $this => {
    let $chCl;
    $chCl = jur_AbstractCharClass_setNegative(jur_AbstractCharClass$LazyWord_computeValue($this), 1);
    $chCl.$mayContainSupplCodepoints = 1;
    return $chCl;
},
jur_AbstractCharClass$LazyNonSpace = $rt_classWithoutFields(jur_AbstractCharClass$LazySpace),
jur_AbstractCharClass$LazyNonSpace__init_0 = $this => {
    return;
},
jur_AbstractCharClass$LazyNonSpace__init_ = () => {
    let var_0 = new jur_AbstractCharClass$LazyNonSpace();
    jur_AbstractCharClass$LazyNonSpace__init_0(var_0);
    return var_0;
},
jur_AbstractCharClass$LazyNonSpace_computeValue = $this => {
    let $chCl;
    $chCl = jur_AbstractCharClass_setNegative(jur_AbstractCharClass$LazySpace_computeValue($this), 1);
    $chCl.$mayContainSupplCodepoints = 1;
    return $chCl;
},
jur_AbstractCharClass$LazyNonDigit = $rt_classWithoutFields(jur_AbstractCharClass$LazyDigit),
jur_AbstractCharClass$LazyNonDigit__init_0 = $this => {
    return;
},
jur_AbstractCharClass$LazyNonDigit__init_ = () => {
    let var_0 = new jur_AbstractCharClass$LazyNonDigit();
    jur_AbstractCharClass$LazyNonDigit__init_0(var_0);
    return var_0;
},
jur_AbstractCharClass$LazyNonDigit_computeValue = $this => {
    let $chCl;
    $chCl = jur_AbstractCharClass_setNegative(jur_AbstractCharClass$LazyDigit_computeValue($this), 1);
    $chCl.$mayContainSupplCodepoints = 1;
    return $chCl;
};
function jur_AbstractCharClass$LazyRange() {
    let a = this; jur_AbstractCharClass$LazyCharClass.call(a);
    a.$start3 = 0;
    a.$end2 = 0;
}
let jur_AbstractCharClass$LazyRange__init_0 = ($this, $start, $end) => {
    $this.$start3 = $start;
    $this.$end2 = $end;
},
jur_AbstractCharClass$LazyRange__init_ = (var_0, var_1) => {
    let var_2 = new jur_AbstractCharClass$LazyRange();
    jur_AbstractCharClass$LazyRange__init_0(var_2, var_0, var_1);
    return var_2;
},
jur_AbstractCharClass$LazyRange_computeValue = $this => {
    return jur_CharClass_add(jur_CharClass__init_(), $this.$start3, $this.$end2);
},
jur_AbstractCharClass$LazySpecialsBlock = $rt_classWithoutFields(jur_AbstractCharClass$LazyCharClass),
jur_AbstractCharClass$LazySpecialsBlock__init_0 = $this => {
    return;
},
jur_AbstractCharClass$LazySpecialsBlock__init_ = () => {
    let var_0 = new jur_AbstractCharClass$LazySpecialsBlock();
    jur_AbstractCharClass$LazySpecialsBlock__init_0(var_0);
    return var_0;
},
jur_AbstractCharClass$LazySpecialsBlock_computeValue = $this => {
    return jur_CharClass_add(jur_CharClass_add(jur_CharClass__init_(), 65279, 65279), 65520, 65533);
};
function jur_AbstractCharClass$LazyCategory() {
    let a = this; jur_AbstractCharClass$LazyCharClass.call(a);
    a.$category1 = 0;
    a.$mayContainSupplCodepoints0 = 0;
    a.$containsAllSurrogates0 = 0;
}
let jur_AbstractCharClass$LazyCategory__init_0 = ($this, $cat, $mayContainSupplCodepoints) => {
    $this.$mayContainSupplCodepoints0 = $mayContainSupplCodepoints;
    $this.$category1 = $cat;
},
jur_AbstractCharClass$LazyCategory__init_ = (var_0, var_1) => {
    let var_2 = new jur_AbstractCharClass$LazyCategory();
    jur_AbstractCharClass$LazyCategory__init_0(var_2, var_0, var_1);
    return var_2;
},
jur_AbstractCharClass$LazyCategory__init_1 = ($this, $cat, $mayContainSupplCodepoints, $containsAllSurrogates) => {
    $this.$containsAllSurrogates0 = $containsAllSurrogates;
    $this.$mayContainSupplCodepoints0 = $mayContainSupplCodepoints;
    $this.$category1 = $cat;
},
jur_AbstractCharClass$LazyCategory__init_2 = (var_0, var_1, var_2) => {
    let var_3 = new jur_AbstractCharClass$LazyCategory();
    jur_AbstractCharClass$LazyCategory__init_1(var_3, var_0, var_1, var_2);
    return var_3;
},
jur_AbstractCharClass$LazyCategory_computeValue = $this => {
    let $chCl;
    $chCl = jur_UnicodeCategory__init_0($this.$category1);
    if ($this.$containsAllSurrogates0)
        ju_BitSet_set($chCl.$lowHighSurrogates, 0, 2048);
    $chCl.$mayContainSupplCodepoints = $this.$mayContainSupplCodepoints0;
    return $chCl;
};
function jur_AbstractCharClass$LazyCategoryScope() {
    let a = this; jur_AbstractCharClass$LazyCharClass.call(a);
    a.$category0 = 0;
    a.$mayContainSupplCodepoints1 = 0;
    a.$containsAllSurrogates = 0;
}
let jur_AbstractCharClass$LazyCategoryScope__init_1 = ($this, $cat, $mayContainSupplCodepoints) => {
    $this.$mayContainSupplCodepoints1 = $mayContainSupplCodepoints;
    $this.$category0 = $cat;
},
jur_AbstractCharClass$LazyCategoryScope__init_ = (var_0, var_1) => {
    let var_2 = new jur_AbstractCharClass$LazyCategoryScope();
    jur_AbstractCharClass$LazyCategoryScope__init_1(var_2, var_0, var_1);
    return var_2;
},
jur_AbstractCharClass$LazyCategoryScope__init_0 = ($this, $cat, $mayContainSupplCodepoints, $containsAllSurrogates) => {
    $this.$containsAllSurrogates = $containsAllSurrogates;
    $this.$mayContainSupplCodepoints1 = $mayContainSupplCodepoints;
    $this.$category0 = $cat;
},
jur_AbstractCharClass$LazyCategoryScope__init_2 = (var_0, var_1, var_2) => {
    let var_3 = new jur_AbstractCharClass$LazyCategoryScope();
    jur_AbstractCharClass$LazyCategoryScope__init_0(var_3, var_0, var_1, var_2);
    return var_3;
},
jur_AbstractCharClass$LazyCategoryScope_computeValue = $this => {
    let $chCl;
    $chCl = new jur_UnicodeCategoryScope;
    jur_UnicodeCategory__init_($chCl, $this.$category0);
    if ($this.$containsAllSurrogates)
        ju_BitSet_set($chCl.$lowHighSurrogates, 0, 2048);
    $chCl.$mayContainSupplCodepoints = $this.$mayContainSupplCodepoints1;
    return $chCl;
},
jl_NegativeArraySizeException = $rt_classWithoutFields(jl_RuntimeException),
jur_IntHash = $rt_classWithoutFields(),
otpp_ResourceAccessor = $rt_classWithoutFields(),
otciu_UnicodeHelper = $rt_classWithoutFields(),
otciu_UnicodeHelper_decodeCaseMapping = $text => {
    let $flow, $sz, $data, var$5, $last, $i, var$8;
    $flow = otci_CharFlow__init_(jl_String_toCharArray($text));
    $sz = otci_Base46_decodeUnsigned($flow);
    $data = $rt_createIntArray($sz * 2 | 0);
    var$5 = $data.data;
    $last = 0;
    $i = 0;
    while ($i < $sz) {
        $last = $last + otci_Base46_decodeUnsigned($flow) | 0;
        var$8 = $i * 2 | 0;
        var$5[var$8] = $last;
        var$5[var$8 + 1 | 0] = otci_Base46_decode($flow);
        $i = $i + 1 | 0;
    }
    return $data;
},
otciu_UnicodeHelper_createCharMapping = $data => {
    let $result, var$3, $last, $lastValue, $i, var$7, $key, $value, var$10, var$11;
    $result = $rt_createIntArray(65536);
    var$3 = $result.data;
    $last = 0;
    $lastValue = 0;
    $i = 0;
    a: {
        while (true) {
            var$7 = $data.data;
            if ($i >= var$7.length)
                break a;
            $key = var$7[$i];
            $value = var$7[$i + 1 | 0];
            var$10 = var$3.length;
            if ($key < var$10)
                var$10 = $key;
            else if ($key == $last)
                break;
            ju_Arrays_fill1($result, $last, var$10, $lastValue);
            $i = $i + 2 | 0;
            $last = var$10;
            $lastValue = $value;
        }
    }
    var$11 = new otciu_CharMapping;
    var$11.$binarySearchTable = $data;
    var$11.$fastTable = $result;
    return var$11;
},
otciu_UnicodeHelper_decodeByte = $c => {
    if ($c <= 92) {
        if ($c > 34)
            return (($c - 32 | 0) - 1 | 0) << 24 >> 24;
        return ($c - 32 | 0) << 24 >> 24;
    }
    return (($c - 32 | 0) - 2 | 0) << 24 >> 24;
},
otciu_UnicodeHelper_extractRle = $encoded => {
    let $ranges, var$3, $buffer, var$5, $index, $rangeIndex, $codePoint, $i, $pos, $b, $count, $j, $digit, var$15, $chunk;
    $ranges = $rt_createArray(otciu_UnicodeHelper$Range, 16384);
    var$3 = $ranges.data;
    $buffer = $rt_createByteArray(16384);
    var$5 = $buffer.data;
    $index = 0;
    $rangeIndex = 0;
    $codePoint = 0;
    $i = 0;
    a: while (true) {
        if ($i >= $encoded.$nativeString.length) {
            if ($index <= 0)
                $pos = $rangeIndex;
            else {
                $pos = $rangeIndex + 1 | 0;
                var$3[$rangeIndex] = otciu_UnicodeHelper$Range__init_0($codePoint, $codePoint + $index | 0, ju_Arrays_copyOf($buffer, $index));
            }
            return ju_Arrays_copyOf0($ranges, $pos);
        }
        $b = otciu_UnicodeHelper_decodeByte(jl_String_charAt($encoded, $i));
        if ($b == 64) {
            $i = $i + 1 | 0;
            $b = otciu_UnicodeHelper_decodeByte(jl_String_charAt($encoded, $i));
            $count = 0;
            $pos = 1;
            $j = 0;
            while ($j < 3) {
                $i = $i + 1 | 0;
                $count = $count | $rt_imul($pos, otciu_UnicodeHelper_decodeByte(jl_String_charAt($encoded, $i)));
                $pos = $pos * 64 | 0;
                $j = $j + 1 | 0;
            }
        } else if ($b < 32)
            $count = 1;
        else {
            $b = ($b - 32 | 0) << 24 >> 24;
            $i = $i + 1 | 0;
            $count = otciu_UnicodeHelper_decodeByte(jl_String_charAt($encoded, $i));
        }
        if (!$b && $count >= 128) {
            if ($index > 0) {
                $pos = $rangeIndex + 1 | 0;
                var$3[$rangeIndex] = otciu_UnicodeHelper$Range__init_0($codePoint, $codePoint + $index | 0, ju_Arrays_copyOf($buffer, $index));
                $rangeIndex = $pos;
            }
            $codePoint = $codePoint + ($index + $count | 0) | 0;
            $index = 0;
        } else
            while ($count > 0) {
                $pos = var$5.length;
                if ($index != $pos) {
                    $j = $rangeIndex;
                    $digit = $codePoint;
                    $codePoint = $index;
                } else {
                    $j = $rangeIndex + 1 | 0;
                    var$15 = new otciu_UnicodeHelper$Range;
                    $digit = $codePoint + $index | 0;
                    otciu_UnicodeHelper$Range__init_(var$15, $codePoint, $digit, ju_Arrays_copyOf($buffer, $index));
                    var$3[$rangeIndex] = var$15;
                    $codePoint = 0;
                }
                $chunk = jl_Math_min($count, $pos - $codePoint | 0);
                $index = $codePoint + $chunk | 0;
                if ($codePoint > $index)
                    break a;
                while ($codePoint < $index) {
                    $pos = $codePoint + 1 | 0;
                    var$5[$codePoint] = $b;
                    $codePoint = $pos;
                }
                $count = $count - $chunk | 0;
                $rangeIndex = $j;
                $codePoint = $digit;
            }
        $i = $i + 1 | 0;
    }
    $encoded = new jl_IllegalArgumentException;
    jl_Throwable__init_0($encoded);
    $rt_throw($encoded);
};
function otciu_CharMapping() {
    let a = this; jl_Object.call(a);
    a.$binarySearchTable = null;
    a.$fastTable = null;
}
function otciu_UnicodeHelper$Range() {
    let a = this; jl_Object.call(a);
    a.$start2 = 0;
    a.$end1 = 0;
    a.$data2 = null;
}
let otciu_UnicodeHelper$Range__init_ = ($this, $start, $end, $data) => {
    $this.$start2 = $start;
    $this.$end1 = $end;
    $this.$data2 = $data;
},
otciu_UnicodeHelper$Range__init_0 = (var_0, var_1, var_2) => {
    let var_3 = new otciu_UnicodeHelper$Range();
    otciu_UnicodeHelper$Range__init_(var_3, var_0, var_1, var_2);
    return var_3;
};
function otci_CharFlow() {
    let a = this; jl_Object.call(a);
    a.$characters = null;
    a.$pointer = 0;
}
let otci_CharFlow__init_0 = ($this, $characters) => {
    $this.$characters = $characters;
},
otci_CharFlow__init_ = var_0 => {
    let var_1 = new otci_CharFlow();
    otci_CharFlow__init_0(var_1, var_0);
    return var_1;
},
otci_Base46 = $rt_classWithoutFields(),
otci_Base46_decodeUnsigned = $seq => {
    let $number, $pos, var$4, $hasMore, $digit;
    $number = 0;
    $pos = 1;
    while (true) {
        var$4 = $seq.$characters.data;
        $hasMore = $seq.$pointer;
        $seq.$pointer = $hasMore + 1 | 0;
        $digit = var$4[$hasMore];
        $digit = $digit < 34 ? $digit - 32 | 0 : $digit >= 92 ? ($digit - 32 | 0) - 2 | 0 : ($digit - 32 | 0) - 1 | 0;
        $hasMore = ($digit % 2 | 0) != 1 ? 0 : 1;
        $number = $number + $rt_imul($pos, $digit / 2 | 0) | 0;
        $pos = $pos * 46 | 0;
        if (!$hasMore)
            break;
    }
    return $number;
},
otci_Base46_decode = $seq => {
    let $number, $result;
    $number = otci_Base46_decodeUnsigned($seq);
    $result = $number / 2 | 0;
    if ($number % 2 | 0)
        $result =  -$result | 0;
    return $result;
};
function cgme_GameInitializer() {
    jl_Object.call(this);
    this.$cardFactory = null;
}
let cgme_GameInitializer_initializeGame = ($this, $game, $players, $allCards, $shufflePlayerOrder) => {
    let var$5, $drawn, $player, $p, $i;
    if ($players !== null) {
        var$5 = $players.$size0;
        if (var$5 >= 2 && var$5 <= 5) {
            $drawn = $game.$deck;
            ju_ArrayDeque_clear($drawn.$drawPile);
            ju_AbstractCollection_addAll($drawn.$drawPile, $allCards);
            $drawn = $game.$deck;
            $allCards = ju_ArrayList__init_0($drawn.$drawPile);
            ju_Collections_shuffle($allCards);
            ju_ArrayDeque_clear($drawn.$drawPile);
            ju_AbstractCollection_addAll($drawn.$drawPile, $allCards);
            if ($shufflePlayerOrder)
                ju_Collections_shuffle($players);
            $player = $players;
            $players = ju_AbstractList_iterator($player);
            while (ju_AbstractList$1_hasNext($players)) {
                $p = ju_AbstractList$1_next($players);
                ju_ArrayList_add($game.$players0, $p);
            }
            $game.$currentPlayerIndex = 0;
            $p = ju_AbstractList_iterator($player);
            while (ju_AbstractList$1_hasNext($p)) {
                $player = ju_AbstractList$1_next($p);
                $i = 0;
                while ($i < $game.$rules.$initialHandSize) {
                    $drawn = cgmmc_Deck_draw($game.$deck, 1, $game.$discardPile);
                    if (!ju_AbstractCollection_isEmpty($drawn)) {
                        $players = $player.$hand;
                        $allCards = ju_ArrayList_get($drawn, 0);
                        cgmmc_AbstractCardCollection_add($players, $allCards);
                    }
                    $i = $i + 1 | 0;
                }
            }
            return;
        }
    }
    $players = new jl_IllegalArgumentException;
    jl_Throwable__init_($players, $rt_s(459));
    $rt_throw($players);
},
cgme_CardFactory = $rt_classWithoutFields(),
cgme_CardFactory_ALL_PROPERTY_COLORS = null,
cgme_CardFactory_$callClinit = () => {
    cgme_CardFactory_$callClinit = $rt_eraseClinit(cgme_CardFactory);
    cgme_CardFactory__clinit_();
},
cgme_CardFactory_addPropertyCards = ($this, $cards) => {
    cgmmc_PropertyColor_$callClinit();
    cgme_CardFactory_addProps($this, $cards, cgmmc_PropertyColor_BROWN, 2, 1);
    cgme_CardFactory_addProps($this, $cards, cgmmc_PropertyColor_LIGHT_BLUE, 3, 1);
    cgme_CardFactory_addProps($this, $cards, cgmmc_PropertyColor_PINK, 3, 2);
    cgme_CardFactory_addProps($this, $cards, cgmmc_PropertyColor_ORANGE, 3, 2);
    cgme_CardFactory_addProps($this, $cards, cgmmc_PropertyColor_RED, 3, 3);
    cgme_CardFactory_addProps($this, $cards, cgmmc_PropertyColor_YELLOW, 3, 3);
    cgme_CardFactory_addProps($this, $cards, cgmmc_PropertyColor_GREEN, 3, 4);
    cgme_CardFactory_addProps($this, $cards, cgmmc_PropertyColor_DARK_BLUE, 2, 4);
    cgme_CardFactory_addProps($this, $cards, cgmmc_PropertyColor_RAILROAD, 4, 2);
    cgme_CardFactory_addProps($this, $cards, cgmmc_PropertyColor_UTILITY, 2, 2);
},
cgme_CardFactory_addWildcardCards = ($this, $cards) => {
    let var$2, var$3;
    var$2 = new cgmmc_WildcardCard;
    cgmmc_PropertyColor_$callClinit();
    cgmmc_WildcardCard__init_0(var$2, $rt_s(460), 1, ju_EnumSet_of(cgmmc_PropertyColor_BROWN, cgmmc_PropertyColor_LIGHT_BLUE), 0);
    var$3 = $cards;
    ju_ArrayList_add(var$3, var$2);
    ju_ArrayList_add(var$3, cgmmc_WildcardCard__init_($rt_s(461), 4, ju_EnumSet_of(cgmmc_PropertyColor_LIGHT_BLUE, cgmmc_PropertyColor_RAILROAD), 0));
    cgme_CardFactory_addCopies($this, $cards, 2, new cgme_CardFactory$addWildcardCards$lambda$_5_0);
    cgme_CardFactory_addCopies($this, $cards, 2, new cgme_CardFactory$addWildcardCards$lambda$_5_1);
    ju_ArrayList_add(var$3, cgmmc_WildcardCard__init_($rt_s(462), 4, ju_EnumSet_of(cgmmc_PropertyColor_GREEN, cgmmc_PropertyColor_DARK_BLUE), 0));
    ju_ArrayList_add(var$3, cgmmc_WildcardCard__init_($rt_s(463), 4, ju_EnumSet_of(cgmmc_PropertyColor_GREEN, cgmmc_PropertyColor_RAILROAD), 0));
    ju_ArrayList_add(var$3, cgmmc_WildcardCard__init_($rt_s(464), 2, ju_EnumSet_of(cgmmc_PropertyColor_RAILROAD, cgmmc_PropertyColor_UTILITY), 0));
    cgme_CardFactory_addCopies($this, $cards, 2, new cgme_CardFactory$addWildcardCards$lambda$_5_2);
},
cgme_CardFactory_addActionCards = ($this, $cards) => {
    cgme_CardFactory_addCopies($this, $cards, 2, new cgme_CardFactory$addActionCards$lambda$_6_0);
    cgme_CardFactory_addCopies($this, $cards, 3, new cgme_CardFactory$addActionCards$lambda$_6_1);
    cgme_CardFactory_addCopies($this, $cards, 3, new cgme_CardFactory$addActionCards$lambda$_6_2);
    cgme_CardFactory_addCopies($this, $cards, 3, new cgme_CardFactory$addActionCards$lambda$_6_3);
    cgme_CardFactory_addCopies($this, $cards, 3, new cgme_CardFactory$addActionCards$lambda$_6_4);
    cgme_CardFactory_addCopies($this, $cards, 3, new cgme_CardFactory$addActionCards$lambda$_6_5);
    cgme_CardFactory_addCopies($this, $cards, 2, new cgme_CardFactory$addActionCards$lambda$_6_6);
    cgme_CardFactory_addCopies($this, $cards, 10, new cgme_CardFactory$addActionCards$lambda$_6_7);
    cgme_CardFactory_addCopies($this, $cards, 3, new cgme_CardFactory$addActionCards$lambda$_6_8);
    cgme_CardFactory_addCopies($this, $cards, 2, new cgme_CardFactory$addActionCards$lambda$_6_9);
},
cgme_CardFactory_addRentCards0 = ($this, $cards) => {
    cgmmc_PropertyColor_$callClinit();
    cgme_CardFactory_addRentCards($this, $cards, $rt_s(465), cgmmc_PropertyColor_BROWN, cgmmc_PropertyColor_LIGHT_BLUE);
    cgme_CardFactory_addRentCards($this, $cards, $rt_s(466), cgmmc_PropertyColor_PINK, cgmmc_PropertyColor_ORANGE);
    cgme_CardFactory_addRentCards($this, $cards, $rt_s(467), cgmmc_PropertyColor_RED, cgmmc_PropertyColor_YELLOW);
    cgme_CardFactory_addRentCards($this, $cards, $rt_s(468), cgmmc_PropertyColor_GREEN, cgmmc_PropertyColor_DARK_BLUE);
    cgme_CardFactory_addRentCards($this, $cards, $rt_s(469), cgmmc_PropertyColor_RAILROAD, cgmmc_PropertyColor_UTILITY);
    cgme_CardFactory_addCopies($this, $cards, 3, new cgme_CardFactory$addRentCards$lambda$_7_0);
},
cgme_CardFactory_addRentCards = ($this, $cards, $name, $firstColor, $secondColor) => {
    let var$5;
    var$5 = new cgme_CardFactory$addRentCards$lambda$_8_0;
    var$5.$_021 = $name;
    var$5.$_16 = $firstColor;
    var$5.$_23 = $secondColor;
    cgme_CardFactory_addCopies($this, $cards, 2, var$5);
},
cgme_CardFactory_addProps = ($this, $cards, $color, $count, $value) => {
    let $i, var$6, var$7, var$8, var$9, var$10;
    $i = 1;
    while ($i <= $count) {
        var$6 = new cgmmc_PropertyCard;
        var$7 = jl_String_valueOf($color);
        var$8 = new jl_StringBuilder;
        jl_AbstractStringBuilder__init_(var$8);
        jl_StringBuilder_append0(jl_StringBuilder_append(jl_StringBuilder_append(var$8, var$7), $rt_s(470)), $i);
        var$9 = jl_AbstractStringBuilder_toString(var$8);
        cgmmc_CardType_$callClinit();
        var$7 = cgmmc_CardType_PROPERTY;
        var$8 = jl_String_valueOf($color);
        var$10 = new jl_StringBuilder;
        jl_AbstractStringBuilder__init_(var$10);
        jl_StringBuilder_append(jl_StringBuilder_append(var$10, $rt_s(471)), var$8);
        cgmmc_Card__init_(var$6, var$9, $value, var$7, jl_AbstractStringBuilder_toString(var$10));
        var$6.$color0 = $color;
        ju_ArrayList_add($cards, var$6);
        $i = $i + 1 | 0;
    }
},
cgme_CardFactory_addCopies = ($this, $cards, $count, $cardSupplier) => {
    let $i, var$5;
    $i = 0;
    while ($i < $count) {
        var$5 = $cardSupplier.$get0();
        ju_ArrayList_add($cards, var$5);
        $i = $i + 1 | 0;
    }
},
cgme_CardFactory__clinit_ = () => {
    let var$1, var$2, var$3, var$4, var$5;
    cgmmc_PropertyColor_$callClinit();
    var$1 = cgmmc_PropertyColor_BROWN;
    var$2 = $rt_createArray(cgmmc_PropertyColor, 9).data;
    var$2[0] = cgmmc_PropertyColor_LIGHT_BLUE;
    var$2[1] = cgmmc_PropertyColor_PINK;
    var$2[2] = cgmmc_PropertyColor_ORANGE;
    var$2[3] = cgmmc_PropertyColor_RED;
    var$2[4] = cgmmc_PropertyColor_YELLOW;
    var$2[5] = cgmmc_PropertyColor_GREEN;
    var$2[6] = cgmmc_PropertyColor_DARK_BLUE;
    var$2[7] = cgmmc_PropertyColor_RAILROAD;
    var$2[8] = cgmmc_PropertyColor_UTILITY;
    var$3 = ju_EnumSet_noneOf(jl_Enum_getDeclaringClass(var$1));
    ju_EnumSet_fastAdd(var$3, var$1);
    var$4 = var$2.length;
    var$5 = 0;
    while (var$5 < var$4) {
        ju_EnumSet_fastAdd(var$3, var$2[var$5]);
        var$5 = var$5 + 1 | 0;
    }
    cgme_CardFactory_ALL_PROPERTY_COLORS = var$3;
},
cgma_BotStrategy = $rt_classWithoutFields(0);
function cgma_SimpleBotStrategy() {
    let a = this; jl_Object.call(a);
    a.$ctrl = null;
    a.$rng = null;
}
let cgma_SimpleBotStrategy__init_ = ($this, $ctrl) => {
    $this.$rng = ju_Random__init_();
    $this.$ctrl = $ctrl;
},
cgma_SimpleBotStrategy__init_0 = var_0 => {
    let var_1 = new cgma_SimpleBotStrategy();
    cgma_SimpleBotStrategy__init_(var_1, var_0);
    return var_1;
},
cgma_SimpleBotStrategy_playBuilding = ($this, $me) => {
    let $buildings, $bc, var$4, $target;
    $buildings = ju_Collection_stream(cgmmc_AbstractCardCollection_getCards($me.$hand));
    $bc = new cgma_SimpleBotStrategy$playBuilding$lambda$_3_0;
    $buildings = jusi_SimpleStreamImpl_filter($buildings, $bc);
    $bc = new cgma_SimpleBotStrategy$playBuilding$lambda$_3_1;
    var$4 = ju_AbstractList_iterator(jus_Stream_toList(jusi_SimpleStreamImpl_map($buildings, $bc)));
    while (ju_AbstractList$1_hasNext(var$4)) {
        $bc = ju_AbstractList$1_next(var$4);
        $buildings = ju_Collection_stream(cgmmc_PropertyCollection_getCompletedSets($me.$properties));
        $target = new cgma_SimpleBotStrategy$playBuilding$lambda$_3_2;
        $target.$_047 = $bc;
        $target = jusi_SimpleStreamImpl_findFirst(jusi_SimpleStreamImpl_filter($buildings, $target));
        if (ju_Optional_isPresent($target))
            return ju_Optional_of(cgmc_PlayCardCommand__init_($this.$ctrl, $me, $bc, cgmc_GameController$PlayCardRequest_withChosenColor(cgmc_GameController$PlayCardRequest_defaultPlay(), (ju_Optional_get($target)).$color)));
    }
    return ju_Optional_empty();
},
cgma_SimpleBotStrategy_pickBestWildcardColor = ($this, $me, $wc) => {
    let $allowed, var$4, var$5;
    $wc = ju_Collection_stream(cgmmc_WildcardCard_getAllowedColors($wc));
    $allowed = new cgma_SimpleBotStrategy$pickBestWildcardColor$lambda$_5_0;
    $allowed = jus_Stream_toList(jusi_SimpleStreamImpl_filter($wc, $allowed));
    if (!ju_AbstractCollection_isEmpty($allowed)) {
        $wc = ju_Collection_stream($allowed);
        var$4 = new cgma_SimpleBotStrategy$pickBestWildcardColor$lambda$_5_1;
        var$4.$_07 = $me;
        var$4 = ju_Comparator_comparingInt(var$4);
        var$5 = new cgma_SimpleBotStrategy$pickBestWildcardColor$lambda$_5_2;
        var$5.$_030 = $me;
        var$4 = ju_Comparator_thenComparingInt(var$4, var$5);
        var$5 = new cgma_SimpleBotStrategy$pickBestWildcardColor$lambda$_5_3;
        var$5.$_033 = $me;
        $me = ju_Comparator_thenComparingInt(var$4, var$5);
        return ju_Optional_orElse(jusi_SimpleStreamImpl_max($wc, $me), ju_TemplateCollections$ImmutableArrayList_get($allowed, 0));
    }
    cgmmc_PropertyColor_$callClinit();
    return cgmmc_PropertyColor_BROWN;
},
cgma_SimpleBotStrategy_playAction = ($this, $snap, $me) => {
    let $action, $playable, var$5, $cmd, var$7, var$8, var$9, var$10, var$11;
    $action = ju_Collection_stream(cgmmc_AbstractCardCollection_getCards($me.$hand));
    $playable = new cgma_SimpleBotStrategy$playAction$lambda$_6_0;
    $action = jusi_SimpleStreamImpl_filter($action, $playable);
    $playable = new cgma_SimpleBotStrategy$playAction$lambda$_6_1;
    $action = jusi_SimpleStreamImpl_map($action, $playable);
    $playable = new cgma_SimpleBotStrategy$playAction$lambda$_6_2;
    $action = jusi_SimpleStreamImpl_filter($action, $playable);
    $playable = new cgma_SimpleBotStrategy$playAction$lambda$_6_3;
    $playable.$_076 = $this;
    var$5 = ju_Comparator_comparingInt($playable);
    var$5 = ju_AbstractList_iterator(jus_Stream_toList(jusi_SimpleStreamImpl_sorted($action, var$5)));
    while (true) {
        if (!ju_AbstractList$1_hasNext(var$5))
            return ju_Optional_empty();
        a: {
            b: {
                c: {
                    d: {
                        e: {
                            f: {
                                g: {
                                    h: {
                                        $action = ju_AbstractList$1_next(var$5);
                                        cgma_SimpleBotStrategy$1_$callClinit();
                                        switch (cgma_SimpleBotStrategy$1_$SwitchMap$com$group4$monopolydeal$model$card$ActionType.data[$action.$actionType.$ordinal]) {
                                            case 1:
                                            case 2:
                                                break h;
                                            case 3:
                                                break g;
                                            case 4:
                                                break e;
                                            case 5:
                                                break f;
                                            case 6:
                                                break c;
                                            case 7:
                                                break d;
                                            case 8:
                                                break b;
                                            default:
                                        }
                                        $cmd = ju_Optional_empty();
                                        break a;
                                    }
                                    $cmd = ju_Optional_of(cgmc_PlayCardCommand__init_($this.$ctrl, $me, $action, cgmc_GameController$PlayCardRequest_defaultPlay()));
                                    break a;
                                }
                                $playable = cgma_SimpleBotStrategy_pickRichestOpponent($this, $snap, $me);
                                $cmd = $playable === null ? ju_Optional_empty() : ju_Optional_of(cgmc_PlayCardCommand__init_($this.$ctrl, $me, $action, cgmc_GameController$PlayCardRequest_withTarget($playable)));
                                break a;
                            }
                            $cmd = cgma_SimpleBotStrategy_pickBestRentColor($this, $me, cgmmc_ActionCard_getRentColors($action));
                            if ($cmd === null)
                                $cmd = ju_Optional_empty();
                            else {
                                var$7 = cgma_SimpleBotStrategy_countDoubleRentCards($this, $me, $snap.$remainingPlays - 1 | 0);
                                $cmd = ju_Optional_of(cgmc_PlayCardCommand__init_($this.$ctrl, $me, $action, cgmc_GameController$PlayCardRequest_withDoubleRentCount(cgmc_GameController$PlayCardRequest_withChosenColor(cgmc_GameController$PlayCardRequest_defaultPlay(), $cmd), var$7)));
                            }
                            break a;
                        }
                        var$8 = ju_AbstractList_iterator($snap.$players);
                        i: {
                            j: {
                                while (ju_AbstractList$1_hasNext(var$8)) {
                                    $playable = ju_AbstractList$1_next(var$8);
                                    if (cgmmg_Player_equals($playable, $me))
                                        continue;
                                    $cmd = jusi_SimpleStreamImpl_findFirst(ju_Collection_stream(cgmmc_PropertyCollection_getCompletedSets($playable.$properties)));
                                    if (ju_Optional_isPresent($cmd))
                                        break j;
                                }
                                $cmd = ju_Optional_empty();
                                break i;
                            }
                            $cmd = ju_Optional_of(cgmc_PlayCardCommand__init_($this.$ctrl, $me, $action, cgmc_GameController$PlayCardRequest_withChosenColor(cgmc_GameController$PlayCardRequest_withTarget($playable), (ju_Optional_get($cmd)).$color)));
                        }
                        break a;
                    }
                    var$9 = ju_AbstractList_iterator($snap.$players);
                    k: {
                        l: {
                            while (ju_AbstractList$1_hasNext(var$9)) {
                                $playable = ju_AbstractList$1_next(var$9);
                                if (cgmmg_Player_equals($playable, $me))
                                    continue;
                                $cmd = cgmmc_PropertyCollection_getStealableProperties($playable.$properties);
                                if (!ju_AbstractCollection_isEmpty($cmd))
                                    break l;
                            }
                            $cmd = ju_Optional_empty();
                            break k;
                        }
                        var$8 = new cgmc_PlayCardCommand;
                        var$9 = $this.$ctrl;
                        $playable = cgmc_GameController$PlayCardRequest_withTarget($playable);
                        var$10 = $this.$rng;
                        $cmd = $cmd;
                        var$7 = ju_TemplateCollections$ImmutableArrayList_size($cmd);
                        cgmc_PlayCardCommand__init_0(var$8, var$9, $me, $action, cgmc_GameController$PlayCardRequest_withSelectedCards($playable, ju_List_of0(ju_TemplateCollections$ImmutableArrayList_get($cmd, jur_RandomGenerator_nextInt(var$10, var$7)))));
                        $cmd = ju_Optional_of(var$8);
                    }
                    break a;
                }
                $playable = ju_Collection_stream($snap.$players);
                $cmd = new cgma_SimpleBotStrategy$playMultiRent$lambda$_11_0;
                $cmd.$_034 = $me;
                if (ju_AbstractCollection_isEmpty(jus_Stream_toList(jusi_SimpleStreamImpl_filter($playable, $cmd))))
                    $cmd = ju_Optional_empty();
                else {
                    $playable = cgma_SimpleBotStrategy_pickRichestOpponent($this, $snap, $me);
                    if ($playable === null)
                        $cmd = ju_Optional_empty();
                    else {
                        $cmd = cgma_SimpleBotStrategy_pickBestRentColor($this, $me, cgmmc_ActionCard_getRentColors($action));
                        if ($cmd === null)
                            $cmd = ju_Optional_empty();
                        else {
                            var$7 = cgma_SimpleBotStrategy_countDoubleRentCards($this, $me, $snap.$remainingPlays - 1 | 0);
                            $cmd = ju_Optional_of(cgmc_PlayCardCommand__init_($this.$ctrl, $me, $action, cgmc_GameController$PlayCardRequest_withDoubleRentCount(cgmc_GameController$PlayCardRequest_withChosenColor(cgmc_GameController$PlayCardRequest_withTarget($playable), $cmd), var$7)));
                        }
                    }
                }
                break a;
            }
            m: {
                var$8 = cgmmc_PropertyCollection_getStealableProperties($me.$properties);
                if (ju_AbstractCollection_isEmpty(var$8))
                    $cmd = ju_Optional_empty();
                else {
                    var$9 = ju_AbstractList_iterator($snap.$players);
                    n: {
                        while (ju_AbstractList$1_hasNext(var$9)) {
                            $cmd = ju_AbstractList$1_next(var$9);
                            if (cgmmg_Player_equals($cmd, $me))
                                continue;
                            var$10 = cgmmc_PropertyCollection_getStealableProperties($cmd.$properties);
                            if (!ju_AbstractCollection_isEmpty(var$10))
                                break n;
                        }
                        $cmd = ju_Optional_empty();
                        break m;
                    }
                    $playable = ju_Collection_stream(var$8);
                    var$9 = ju_Comparator_comparingInt(new cgma_SimpleBotStrategy$playForcedDeal$lambda$_14_0);
                    var$11 = $playable;
                    $playable = new jusi_SimpleStreamImpl$min$lambda$_27_0;
                    $playable.$_017 = var$9;
                    var$8 = ju_Optional_orElse(jusi_SimpleStreamImpl_reduce(var$11, $playable), ju_TemplateCollections$ImmutableArrayList_get(var$8, 0));
                    $playable = ju_Collection_stream(var$10);
                    var$9 = ju_Comparator_comparingInt(new cgma_SimpleBotStrategy$playForcedDeal$lambda$_14_1);
                    $playable = ju_Optional_orElse(jusi_SimpleStreamImpl_max($playable, var$9), ju_TemplateCollections$ImmutableArrayList_get(var$10, 0));
                    $cmd = ju_Optional_of(cgmc_PlayCardCommand__init_($this.$ctrl, $me, $action, cgmc_GameController$PlayCardRequest_withSelectedCards(cgmc_GameController$PlayCardRequest_withTarget($cmd), ju_List_of1(var$8, $playable))));
                }
            }
        }
        if (ju_Optional_isPresent($cmd))
            break;
    }
    return $cmd;
},
cgma_SimpleBotStrategy_pickBestRentColor = ($this, $me, $rentColors) => {
    let var$3;
    $me = ju_Collection_stream(cgmmc_PropertyCollection_getSets($me.$properties));
    var$3 = new cgma_SimpleBotStrategy$pickBestRentColor$lambda$_15_0;
    $me = jusi_SimpleStreamImpl_filter($me, var$3);
    var$3 = new cgma_SimpleBotStrategy$pickBestRentColor$lambda$_15_1;
    var$3.$_00 = $rentColors;
    $me = jusi_SimpleStreamImpl_filter($me, var$3);
    $rentColors = ju_Comparator_comparingInt(new cgma_SimpleBotStrategy$pickBestRentColor$lambda$_15_2);
    return ju_Optional_orElse(ju_Optional_map(jusi_SimpleStreamImpl_max($me, $rentColors), new cgma_SimpleBotStrategy$pickBestRentColor$lambda$_15_3), null);
},
cgma_SimpleBotStrategy_countDoubleRentCards = ($this, $me, $maxByPlays) => {
    let var$3, $available, var$5;
    $me = ju_Collection_stream(cgmmc_AbstractCardCollection_getCards($me.$hand));
    var$3 = new cgma_SimpleBotStrategy$countDoubleRentCards$lambda$_16_0;
    $me = jusi_SimpleStreamImpl_filter($me, var$3);
    var$3 = new cgma_SimpleBotStrategy$countDoubleRentCards$lambda$_16_1;
    $me = jusi_SimpleStreamImpl_map($me, var$3);
    var$3 = new cgma_SimpleBotStrategy$countDoubleRentCards$lambda$_16_2;
    $available = jusi_SimpleStreamImpl_count(jusi_SimpleStreamImpl_filter($me, var$3));
    var$5 = Long_fromInt(jl_Math_max(0, $maxByPlays));
    if (Long_lt($available, var$5))
        var$5 = $available;
    return jl_Math_min(2, Long_lo(var$5));
},
cgma_SimpleBotStrategy_pickRichestOpponent = ($this, $snap, $me) => {
    let var$3;
    $snap = ju_Collection_stream($snap.$players);
    var$3 = new cgma_SimpleBotStrategy$pickRichestOpponent$lambda$_17_0;
    var$3.$_073 = $me;
    $snap = jusi_SimpleStreamImpl_filter($snap, var$3);
    $me = ju_Comparator_comparingInt(new cgma_SimpleBotStrategy$pickRichestOpponent$lambda$_17_1);
    return ju_Optional_orElse(jusi_SimpleStreamImpl_max($snap, $me), null);
},
jusi_SimpleStreamImpl = $rt_classWithoutFields(),
jusi_SimpleStreamImpl_filter = ($this, $predicate) => {
    let var$2;
    var$2 = new jusi_FilteringStreamImpl;
    jusi_WrappingStreamImpl__init_(var$2, $this);
    var$2.$filter0 = $predicate;
    return var$2;
},
jusi_SimpleStreamImpl_map = ($this, $mapper) => {
    let var$2;
    var$2 = new jusi_MappingStreamImpl;
    jusi_WrappingStreamImpl__init_(var$2, $this);
    var$2.$mapper0 = $mapper;
    return var$2;
},
jusi_SimpleStreamImpl_mapToInt = ($this, $mapper) => {
    let var$2;
    var$2 = new jusi_MappingToIntStreamImpl;
    var$2.$source = $this;
    var$2.$mapper = $mapper;
    return var$2;
},
jusi_SimpleStreamImpl_sorted = ($this, $comparator) => {
    let var$2, var$3;
    var$2 = new jusi_SortedStreamImpl;
    var$2.$sourceStream1 = $this;
    var$3 = jusi_SimpleStreamImpl_toArray($this, new jusi_SortedStreamImpl$_init_$lambda$_0_0);
    var$2.$array2 = var$3;
    ju_Arrays_sort(var$3, $comparator);
    return var$2;
},
jusi_SimpleStreamImpl_limit = ($this, $maxSize) => {
    let var$2, var$3;
    var$2 = new jusi_LimitingStreamImpl;
    var$3 = Long_lo($maxSize);
    var$2.$sourceStream = $this;
    var$2.$limit0 = var$3;
    var$2.$remaining = var$3;
    return var$2;
},
jusi_SimpleStreamImpl_toArray0 = $this => {
    return jusi_SimpleStreamImpl_toArray($this, new jusi_SimpleStreamImpl$toArray$lambda$_20_0);
},
jusi_SimpleStreamImpl_toArray = ($this, $generator) => {
    let $estimatedSize, $list, $consumer, $array, $i, var$7;
    $estimatedSize = $this.$estimateSize();
    if ($estimatedSize < 0) {
        $list = ju_ArrayList__init_();
        while (true) {
            ju_Objects_requireNonNull($list);
            $consumer = new jusi_SimpleStreamImpl$toArray$lambda$_21_0;
            $consumer.$_060 = $list;
            if (!$this.$next1($consumer))
                break;
        }
        $consumer = $list;
        $array = $generator.$apply($consumer.$size0);
        $i = 0;
        while (true) {
            var$7 = $array.data;
            if ($i >= var$7.length)
                break;
            var$7[$i] = ju_ArrayList_get($consumer, $i);
            $i = $i + 1 | 0;
        }
        return $array;
    }
    $array = $generator.$apply($estimatedSize);
    $consumer = new jusi_SimpleStreamImpl$ArrayFillingConsumer;
    $consumer.$array3 = $array;
    while ($this.$next1($consumer)) {
    }
    var$7 = $array.data;
    $estimatedSize = $consumer.$index7;
    if ($estimatedSize < var$7.length)
        $array = ju_Arrays_copyOf0($array, $estimatedSize);
    return $array;
},
jusi_SimpleStreamImpl_reduce = ($this, $accumulator) => {
    let $consumer, var$3;
    $consumer = new jusi_ReducingConsumer;
    var$3 = null;
    $consumer.$accumulator = $accumulator;
    $consumer.$result = var$3;
    $consumer.$initialized = 0;
    while ($this.$next1($consumer)) {
    }
    return ju_Optional_ofNullable($consumer.$result);
},
jusi_SimpleStreamImpl_max = ($this, $comparator) => {
    let var$2;
    var$2 = new jusi_SimpleStreamImpl$max$lambda$_28_0;
    var$2.$_010 = $comparator;
    return jusi_SimpleStreamImpl_reduce($this, var$2);
},
jusi_SimpleStreamImpl_count = $this => {
    let $consumer, var$2;
    $consumer = new jusi_CountingConsumer;
    var$2 = $this;
    while (jusi_WrappingStreamImpl_next(var$2, $consumer)) {
    }
    return Long_fromInt($consumer.$count0);
},
jusi_SimpleStreamImpl_anyMatch = ($this, $predicate) => {
    let $consumer;
    $consumer = new jusi_AnyMatchConsumer;
    $consumer.$predicate = $predicate;
    while (!$consumer.$matched && jusi_StreamOverSpliterator_next($this, $consumer)) {
    }
    return $consumer.$matched;
},
jusi_SimpleStreamImpl_findFirst = $this => {
    let $consumer;
    $consumer = new jusi_FindFirstConsumer;
    while ($consumer.$result0 === null && $this.$next1($consumer)) {
    }
    return ju_Optional_ofNullable($consumer.$result0);
},
jusi_SimpleStreamImpl_estimateSize = $this => {
    return (-1);
};
function jusi_StreamOverSpliterator() {
    jusi_SimpleStreamImpl.call(this);
    this.$spliterator0 = null;
}
let jusi_StreamOverSpliterator_next = ($this, $consumer) => {
    let $action, var$3, var$4;
    $action = new jusi_StreamOverSpliterator$AdapterAction;
    $action.$consumer = $consumer;
    while (true) {
        $consumer = $this.$spliterator0;
        if ($consumer.$iterator0 === null)
            $consumer.$iterator0 = $consumer.$collection.$iterator();
        if (!$consumer.$iterator0.$hasNext())
            var$3 = 0;
        else {
            $consumer = $consumer.$iterator0.$next();
            var$4 = $action;
            var$4.$wantsMore = var$4.$consumer.$test($consumer);
            var$3 = 1;
        }
        if (!var$3)
            return 0;
        if ($action.$wantsMore)
            continue;
        else
            break;
    }
    return 1;
},
jusi_StreamOverSpliterator_estimateSize = $this => {
    return Long_lo(Long_fromInt($this.$spliterator0.$collection.$size()));
},
ju_SequencedSet = $rt_classWithoutFields(0);
function ju_LinkedHashMapEntrySet() {
    let a = this; ju_AbstractSet.call(a);
    a.$base1 = null;
    a.$reversed = 0;
}
let ju_LinkedHashMapEntrySet_iterator = $this => {
    let var$1;
    var$1 = new ju_LinkedHashMapIterator$EntryIterator;
    ju_LinkedHashMapIterator__init_(var$1, $this.$base1, $this.$reversed);
    return var$1;
};
function ju_Comparator$reversed$lambda$_1_0() {
    jl_Object.call(this);
    this.$_071 = null;
}
let ju_Comparator$reversed$lambda$_1_0_compare = (var$0, var$1, var$2) => {
    return ju_Comparator$comparingInt$lambda$_14_0_compare(var$0.$_071, var$2, var$1);
},
jl_UnsupportedOperationException = $rt_classWithoutFields(jl_RuntimeException),
ju_NoSuchElementException = $rt_classWithoutFields(jl_RuntimeException);
function ju_AbstractList$1() {
    let a = this; jl_Object.call(a);
    a.$index2 = 0;
    a.$modCount1 = 0;
    a.$size2 = 0;
    a.$removeIndex = 0;
    a.$this$00 = null;
}
let ju_AbstractList$1_hasNext = $this => {
    return $this.$index2 >= $this.$size2 ? 0 : 1;
},
ju_AbstractList$1_next = $this => {
    let var$1, var$2;
    ju_AbstractList$1_checkConcurrentModification($this);
    var$1 = $this.$index2;
    $this.$removeIndex = var$1;
    var$2 = $this.$this$00;
    $this.$index2 = var$1 + 1 | 0;
    return var$2.$get(var$1);
},
ju_AbstractList$1_remove = $this => {
    let var$1, var$2, var$3;
    if ($this.$removeIndex >= 0) {
        ju_AbstractList$1_checkConcurrentModification($this);
        $this.$this$00.$remove($this.$removeIndex);
        $this.$modCount1 = $this.$this$00.$modCount;
        var$1 = $this.$removeIndex;
        var$2 = $this.$index2;
        if (var$1 < var$2)
            $this.$index2 = var$2 - 1 | 0;
        $this.$size2 = $this.$size2 - 1 | 0;
        $this.$removeIndex = (-1);
        return;
    }
    var$3 = new jl_IllegalStateException;
    jl_Throwable__init_0(var$3);
    $rt_throw(var$3);
},
ju_AbstractList$1_checkConcurrentModification = $this => {
    let var$1;
    if ($this.$modCount1 != $this.$this$00.$modCount) {
        var$1 = new ju_ConcurrentModificationException;
        jl_Throwable__init_0(var$1);
        $rt_throw(var$1);
    }
};
function ju_MapEntry() {
    let a = this; jl_Object.call(a);
    a.$key = null;
    a.$value0 = null;
}
let ju_MapEntry_getKey = $this => {
    return $this.$key;
},
ju_MapEntry_getValue = $this => {
    return $this.$value0;
};
function ju_HashMap$HashEntry() {
    let a = this; ju_MapEntry.call(a);
    a.$origKeyHash = 0;
    a.$next3 = null;
}
let ju_HashMap$HashEntry__init_ = ($this, $theKey, $hash) => {
    let var$3;
    var$3 = null;
    $this.$key = $theKey;
    $this.$value0 = var$3;
    $this.$origKeyHash = $hash;
},
ju_HashMap$HashEntry__init_0 = (var_0, var_1) => {
    let var_2 = new ju_HashMap$HashEntry();
    ju_HashMap$HashEntry__init_(var_2, var_0, var_1);
    return var_2;
};
function ju_LinkedHashMap$LinkedHashMapEntry() {
    let a = this; ju_HashMap$HashEntry.call(a);
    a.$chainForward = null;
    a.$chainBackward = null;
}
function jur_AbstractCharClass$1() {
    let a = this; jur_AbstractCharClass.call(a);
    a.$val$lHS = null;
    a.$this$031 = null;
}
let jur_AbstractCharClass$1_contains = ($this, $ch) => {
    let $index;
    $index = $ch - 55296 | 0;
    return !($index >= 0 && $index < 2048) ? 0 : $this.$altSurrogates ^ ju_BitSet_get($this.$val$lHS, $index);
};
function jur_AbstractCharClass$2() {
    let a = this; jur_AbstractCharClass.call(a);
    a.$val$lHS0 = null;
    a.$val$thisClass = null;
    a.$this$022 = null;
}
let jur_AbstractCharClass$2_contains = ($this, $ch) => {
    let $index, $containslHS;
    $index = $ch - 55296 | 0;
    $containslHS = !($index >= 0 && $index < 2048) ? 0 : $this.$altSurrogates ^ ju_BitSet_get($this.$val$lHS0, $index);
    return !($this.$val$thisClass.$contains0($ch) && !$containslHS) ? 0 : 1;
};
function jur_CharClass$18() {
    let a = this; jur_AbstractCharClass.call(a);
    a.$val$bs = null;
    a.$this$016 = null;
}
let jur_CharClass$18_contains = ($this, $ch) => {
    return $this.$alt ^ ju_BitSet_get($this.$val$bs, $ch);
},
jur_CharClass$18_toString = $this => {
    let $temp, $i, var$3;
    $temp = new jl_StringBuilder;
    jl_AbstractStringBuilder__init_($temp);
    $i = ju_BitSet_nextSetBit($this.$val$bs, 0);
    while ($i >= 0) {
        jl_AbstractStringBuilder_append0($temp, jl_Character_toChars($i));
        jl_AbstractStringBuilder_append($temp, 124);
        $i = ju_BitSet_nextSetBit($this.$val$bs, $i + 1 | 0);
    }
    var$3 = $temp.$length0;
    if (var$3 > 0)
        jl_StringBuilder_deleteCharAt($temp, var$3 - 1 | 0);
    return jl_AbstractStringBuilder_toString($temp);
};
function jur_CharClass$1() {
    let a = this; jur_AbstractCharClass.call(a);
    a.$val$cc3 = null;
    a.$this$013 = null;
}
let jur_CharClass$1_contains = ($this, $ch) => {
    return $this.$val$cc3.$contains0($ch);
};
function jur_CharClass$3() {
    let a = this; jur_AbstractCharClass.call(a);
    a.$val$curAlt = 0;
    a.$val$cc = null;
    a.$this$05 = null;
}
let jur_CharClass$3_contains = ($this, $ch) => {
    return !(!($this.$val$curAlt ^ ju_BitSet_get($this.$this$05.$bits, $ch)) && !($this.$val$curAlt ^ $this.$this$05.$inverted ^ $this.$val$cc.$contains0($ch))) ? 1 : 0;
};
function jur_CharClass$2() {
    let a = this; jur_AbstractCharClass.call(a);
    a.$val$curAlt0 = 0;
    a.$val$cc1 = null;
    a.$this$02 = null;
}
let jur_CharClass$2_contains = ($this, $ch) => {
    return !(!($this.$val$curAlt0 ^ ju_BitSet_get($this.$this$02.$bits, $ch)) && !($this.$val$curAlt0 ^ $this.$this$02.$inverted ^ $this.$val$cc1.$contains0($ch))) ? 0 : 1;
};
function jur_CharClass$5() {
    let a = this; jur_AbstractCharClass.call(a);
    a.$val$curAlt7 = 0;
    a.$val$nb3 = null;
    a.$val$cc0 = null;
    a.$this$023 = null;
}
let jur_CharClass$5_contains = ($this, $ch) => {
    return $this.$val$curAlt7 ^ (!(!$this.$val$nb3.$contains0($ch) && !$this.$val$cc0.$contains0($ch)) ? 1 : 0);
};
function jur_CharClass$4() {
    let a = this; jur_AbstractCharClass.call(a);
    a.$val$curAlt9 = 0;
    a.$val$nb4 = null;
    a.$val$cc2 = null;
    a.$this$037 = null;
}
let jur_CharClass$4_contains = ($this, $ch) => {
    return $this.$val$curAlt9 ^ (!(!$this.$val$nb4.$contains0($ch) && !$this.$val$cc2.$contains0($ch)) ? 1 : 0) ? 0 : 1;
};
function jur_CharClass$7() {
    let a = this; jur_AbstractCharClass.call(a);
    a.$val$clazz7 = null;
    a.$this$038 = null;
}
let jur_CharClass$7_contains = ($this, $ch) => {
    return jur_CharClass_contains($this.$val$clazz7, $ch);
};
function jur_CharClass$6() {
    let a = this; jur_AbstractCharClass.call(a);
    a.$val$clazz6 = null;
    a.$this$025 = null;
}
let jur_CharClass$6_contains = ($this, $ch) => {
    return jur_CharClass_contains($this.$val$clazz6, $ch) ? 0 : 1;
};
function jur_CharClass$9() {
    let a = this; jur_AbstractCharClass.call(a);
    a.$val$clazz = null;
    a.$val$curAlt8 = 0;
    a.$this$010 = null;
}
let jur_CharClass$9_contains = ($this, $ch) => {
    return !(!jur_CharClass_contains($this.$val$clazz, $ch) && !($this.$val$curAlt8 ^ ju_BitSet_get($this.$this$010.$bits, $ch))) ? 1 : 0;
};
function jur_CharClass$8() {
    let a = this; jur_AbstractCharClass.call(a);
    a.$val$clazz1 = null;
    a.$val$curAlt2 = 0;
    a.$this$06 = null;
}
let jur_CharClass$8_contains = ($this, $ch) => {
    return !(!jur_CharClass_contains($this.$val$clazz1, $ch) && !($this.$val$curAlt2 ^ ju_BitSet_get($this.$this$06.$bits, $ch))) ? 0 : 1;
};
function jur_CharClass$11() {
    let a = this; jur_AbstractCharClass.call(a);
    a.$val$curAlt4 = 0;
    a.$val$nb2 = null;
    a.$val$clazz8 = null;
    a.$this$017 = null;
}
let jur_CharClass$11_contains = ($this, $ch) => {
    return !(!($this.$val$curAlt4 ^ $this.$val$nb2.$contains0($ch)) && !jur_CharClass_contains($this.$val$clazz8, $ch)) ? 1 : 0;
};
function jur_CharClass$10() {
    let a = this; jur_AbstractCharClass.call(a);
    a.$val$curAlt6 = 0;
    a.$val$nb0 = null;
    a.$val$clazz0 = null;
    a.$this$024 = null;
}
let jur_CharClass$10_contains = ($this, $ch) => {
    return !(!($this.$val$curAlt6 ^ $this.$val$nb0.$contains0($ch)) && !jur_CharClass_contains($this.$val$clazz0, $ch)) ? 0 : 1;
};
function jur_CharClass$13() {
    let a = this; jur_AbstractCharClass.call(a);
    a.$val$clazz4 = null;
    a.$this$026 = null;
}
let jur_CharClass$13_contains = ($this, $ch) => {
    return jur_CharClass_contains($this.$val$clazz4, $ch);
};
function jur_CharClass$12() {
    let a = this; jur_AbstractCharClass.call(a);
    a.$val$clazz5 = null;
    a.$this$036 = null;
}
let jur_CharClass$12_contains = ($this, $ch) => {
    return jur_CharClass_contains($this.$val$clazz5, $ch) ? 0 : 1;
};
function jur_CharClass$15() {
    let a = this; jur_AbstractCharClass.call(a);
    a.$val$clazz9 = null;
    a.$val$curAlt1 = 0;
    a.$this$011 = null;
}
let jur_CharClass$15_contains = ($this, $ch) => {
    return !(jur_CharClass_contains($this.$val$clazz9, $ch) && $this.$val$curAlt1 ^ ju_BitSet_get($this.$this$011.$bits, $ch)) ? 0 : 1;
};
function jur_CharClass$14() {
    let a = this; jur_AbstractCharClass.call(a);
    a.$val$clazz2 = null;
    a.$val$curAlt10 = 0;
    a.$this$07 = null;
}
let jur_CharClass$14_contains = ($this, $ch) => {
    return !(jur_CharClass_contains($this.$val$clazz2, $ch) && $this.$val$curAlt10 ^ ju_BitSet_get($this.$this$07.$bits, $ch)) ? 1 : 0;
};
function jur_CharClass$17() {
    let a = this; jur_AbstractCharClass.call(a);
    a.$val$curAlt5 = 0;
    a.$val$nb1 = null;
    a.$val$clazz10 = null;
    a.$this$021 = null;
}
let jur_CharClass$17_contains = ($this, $ch) => {
    return !($this.$val$curAlt5 ^ $this.$val$nb1.$contains0($ch) && jur_CharClass_contains($this.$val$clazz10, $ch)) ? 0 : 1;
};
function jur_CharClass$16() {
    let a = this; jur_AbstractCharClass.call(a);
    a.$val$curAlt3 = 0;
    a.$val$nb = null;
    a.$val$clazz3 = null;
    a.$this$028 = null;
}
let jur_CharClass$16_contains = ($this, $ch) => {
    return !($this.$val$curAlt3 ^ $this.$val$nb.$contains0($ch) && jur_CharClass_contains($this.$val$clazz3, $ch)) ? 1 : 0;
},
w_DealBrowser$lambda$moveWildcard$4$lambda$_70_0 = $rt_classWithoutFields(),
w_DealBrowser$lambda$moveWildcard$4$lambda$_70_1 = $rt_classWithoutFields(),
w_DealBrowser$lambda$moveWildcard$4$lambda$_70_1_apply = (var$0, var$1) => {
    var$1 = var$1;
    w_DealBrowser_$callClinit();
    return var$1;
};
function cgmmc_WildcardCard() {
    let a = this; cgmmc_Card.call(a);
    a.$allowedColors = null;
    a.$activeColor = null;
    a.$multiColourUniversal = 0;
}
let cgmmc_WildcardCard__init_0 = ($this, $name, $value, $allowedColors, $multiColourUniversal) => {
    cgmmc_CardType_$callClinit();
    cgmmc_Card__init_($this, $name, $value, cgmmc_CardType_WILDCARD, $rt_s(472));
    $name = ju_EnumSet_copyOf($allowedColors);
    $this.$allowedColors = $name;
    $this.$activeColor = ju_GenericEnumSet$1_next(ju_GenericEnumSet_iterator($name));
    $this.$multiColourUniversal = $multiColourUniversal;
},
cgmmc_WildcardCard__init_ = (var_0, var_1, var_2, var_3) => {
    let var_4 = new cgmmc_WildcardCard();
    cgmmc_WildcardCard__init_0(var_4, var_0, var_1, var_2, var_3);
    return var_4;
},
cgmmc_WildcardCard_getAllowedColors = $this => {
    return ju_Set_copyOf($this.$allowedColors);
},
cgmmc_WildcardCard_canBeBanked = $this => {
    return 0;
},
cgmmc_WildcardCard_canPayFromTable = $this => {
    return !($this.$value > 0 && !$this.$multiColourUniversal) ? 0 : 1;
};
function w_DealBrowser$lambda$moveWildcard$4$lambda$_70_2() {
    let a = this; jl_Object.call(a);
    a.$_037 = null;
    a.$_110 = null;
}
let w_DealBrowser$lambda$moveWildcard$4$lambda$_70_2_accept = (var$0, var$1) => {
    let var$2, var$3, var$4, var$5, var$6;
    var$1 = var$1;
    var$2 = var$0.$_037;
    var$3 = var$0.$_110;
    w_DealBrowser_$callClinit();
    var$4 = w_DealBrowser_match.$controller.$cardPlayFlow;
    cgmcf_ControllerState_requireGame(var$4.$state0);
    cgmcf_ControllerState_requireCurrentPlayer(var$4.$state0, var$2);
    cgmcf_ControllerState_requirePlayPhase(var$4.$state0);
    var$5 = ju_Collection_stream(ju_EnumMap_values(var$2.$properties.$sets));
    var$6 = new cgmmc_PropertyCollection$findSetContaining$lambda$_7_0;
    var$6.$_039 = var$3;
    var$5 = ju_Optional_orElseThrow(jusi_SimpleStreamImpl_findFirst(jusi_SimpleStreamImpl_filter(var$5, var$6)), new cgmcf_CardPlayFlowService$changeWildcardColor$lambda$_2_0);
    if (ju_TemplateCollections$NElementSet_contains(cgmmc_WildcardCard_getAllowedColors(var$3), var$1)) {
        if (var$5.$color !== var$1) {
            ju_Optional_orElseThrow(cgmmc_PropertyCollection_removeCard(var$2.$properties, var$3), new cgmcf_CardPlayFlowService$changeWildcardColor$lambda$_2_1);
            cgmmc_PropertyCollection_addWildcard(var$2.$properties, var$3, var$1);
            cgmcf_ControllerState_bankReleasedBuildings(var$4.$state0, var$2);
            cgmcf_ControllerState_checkWinAfterOwnTurnOperation(var$4.$state0, var$2);
            cgmcf_ControllerState_refresh(var$4.$state0);
        }
        return;
    }
    var$2 = new cgme_InvalidMoveException;
    var$1 = jl_String_valueOf(var$1);
    var$3 = new jl_StringBuilder;
    jl_AbstractStringBuilder__init_(var$3);
    jl_StringBuilder_append(jl_StringBuilder_append(var$3, $rt_s(473)), var$1);
    jl_Throwable__init_(var$2, jl_AbstractStringBuilder_toString(var$3));
    $rt_throw(var$2);
};
function cgme_TurnManager() {
    let a = this; jl_Object.call(a);
    a.$game0 = null;
    a.$cardsPlayedThisTurn0 = 0;
}
let cgme_TurnManager_requiredDiscards = ($this, $player) => {
    return jl_Math_max(0, cgmmc_AbstractCardCollection_size($player.$hand) - $this.$game0.$rules.$maxHandSizeAtTurnEnd | 0);
};
function cgme_GameEvent() {
    let a = this; jl_Record.call(a);
    a.$time = null;
    a.$type2 = null;
    a.$message3 = null;
}
let jur_RandomGenerator = $rt_classWithoutFields(0),
jur_RandomGenerator_nextInt = ($this, $bound) => {
    let $mask, var$3, var$4, $res;
    if ($bound > 0) {
        jl_Integer_$callClinit();
        $mask = (($bound & ((-2147483648) >>> jl_Integer_numberOfLeadingZeros($bound) | 0)) << 1) - 1 | 0;
        var$3 = $this;
        while (true) {
            var$4 = Long_and(Long_add(Long_mul(var$3.$seed, Long_create(3740067437, 5)), Long_fromInt(11)), Long_create(4294967295, 65535));
            var$3.$seed = var$4;
            $res = Long_lo(Long_shr(var$4, 16)) & $mask;
            if ($res < $bound)
                break;
        }
        return $res;
    }
    var$3 = new jl_IllegalArgumentException;
    jl_Throwable__init_0(var$3);
    $rt_throw(var$3);
};
function ju_Random() {
    jl_Object.call(this);
    this.$seed = Long_ZERO;
}
let ju_Random__init_0 = $this => {
    $this.$seed = Long_and(Long_xor(Long_fromNumber(jl_Math_random() * 2.81474976710656E14 - 1.0), Long_create(3740067437, 5)), Long_create(4294967295, 65535));
},
ju_Random__init_ = () => {
    let var_0 = new ju_Random();
    ju_Random__init_0(var_0);
    return var_0;
};
function cgmc_GameController$PlayCardRequest() {
    let a = this; jl_Record.call(a);
    a.$playToBank = 0;
    a.$targetPlayer1 = null;
    a.$selectedCards0 = null;
    a.$chosenColor0 = null;
    a.$doubleRentCount0 = 0;
}
let cgmc_GameController$PlayCardRequest__init_0 = ($this, $playToBank, $targetPlayer, $selectedCards, $chosenColor, $doubleRentCount) => {
    $selectedCards = $selectedCards !== null ? ju_List_copyOf($selectedCards) : ju_List_of();
    if ($doubleRentCount >= 0 && $doubleRentCount <= 2) {
        $this.$playToBank = $playToBank;
        $this.$targetPlayer1 = $targetPlayer;
        $this.$selectedCards0 = $selectedCards;
        $this.$chosenColor0 = $chosenColor;
        $this.$doubleRentCount0 = $doubleRentCount;
        return;
    }
    $selectedCards = new jl_IllegalArgumentException;
    jl_Throwable__init_($selectedCards, $rt_s(474));
    $rt_throw($selectedCards);
},
cgmc_GameController$PlayCardRequest__init_ = (var_0, var_1, var_2, var_3, var_4) => {
    let var_5 = new cgmc_GameController$PlayCardRequest();
    cgmc_GameController$PlayCardRequest__init_0(var_5, var_0, var_1, var_2, var_3, var_4);
    return var_5;
},
cgmc_GameController$PlayCardRequest_toBank = () => {
    return cgmc_GameController$PlayCardRequest__init_(1, null, ju_List_of(), null, 0);
},
cgmc_GameController$PlayCardRequest_defaultPlay = () => {
    return cgmc_GameController$PlayCardRequest__init_(0, null, ju_List_of(), null, 0);
},
cgmc_GameController$PlayCardRequest_withTarget = $target => {
    return cgmc_GameController$PlayCardRequest__init_(0, $target, ju_List_of(), null, 0);
},
cgmc_GameController$PlayCardRequest_withSelectedCards = ($this, $cards) => {
    return cgmc_GameController$PlayCardRequest__init_($this.$playToBank, $this.$targetPlayer1, $cards, $this.$chosenColor0, $this.$doubleRentCount0);
},
cgmc_GameController$PlayCardRequest_withChosenColor = ($this, $color) => {
    return cgmc_GameController$PlayCardRequest__init_($this.$playToBank, $this.$targetPlayer1, $this.$selectedCards0, $color, $this.$doubleRentCount0);
},
cgmc_GameController$PlayCardRequest_withDoubleRentCount = ($this, $count) => {
    return cgmc_GameController$PlayCardRequest__init_($this.$playToBank, $this.$targetPlayer1, $this.$selectedCards0, $this.$chosenColor0, $count);
},
cgmc_GameController$PlayCardRequest_targetPlayer = $this => {
    return $this.$targetPlayer1;
},
cgmc_GameController$PlayCardRequest_selectedCards = $this => {
    return $this.$selectedCards0;
},
cgmc_GameController$PlayCardRequest_chosenColor = $this => {
    return $this.$chosenColor0;
},
cgmc_GameController$PlayCardRequest_doubleRentCount = $this => {
    return $this.$doubleRentCount0;
};
function cgmep_PaymentResult() {
    let a = this; jl_Object.call(a);
    a.$fullyPaid = 0;
    a.$amountPaid = 0;
    a.$transferredCards = null;
}
let cgmep_PaymentResult__init_0 = ($this, $fullyPaid, $amountPaid, $transferredCards) => {
    $this.$fullyPaid = $fullyPaid;
    $this.$amountPaid = $amountPaid;
    $this.$transferredCards = $transferredCards;
},
cgmep_PaymentResult__init_ = (var_0, var_1, var_2) => {
    let var_3 = new cgmep_PaymentResult();
    cgmep_PaymentResult__init_0(var_3, var_0, var_1, var_2);
    return var_3;
},
ju_Comparator$NaturalOrder = $rt_classWithoutFields(),
ju_Comparator$NaturalOrder_INSTANCE = null,
ju_Comparator$NaturalOrder_$callClinit = () => {
    ju_Comparator$NaturalOrder_$callClinit = $rt_eraseClinit(ju_Comparator$NaturalOrder);
    ju_Comparator$NaturalOrder__clinit_();
},
ju_Comparator$NaturalOrder_compare = ($this, $o1, $o2) => {
    return $o1.$compareTo($o2);
},
ju_Comparator$NaturalOrder_instance = () => {
    ju_Comparator$NaturalOrder_$callClinit();
    return ju_Comparator$NaturalOrder_INSTANCE;
},
ju_Comparator$NaturalOrder__clinit_ = () => {
    let var$1;
    var$1 = new ju_Comparator$NaturalOrder;
    ju_Comparator$NaturalOrder_$callClinit();
    ju_Comparator$NaturalOrder_INSTANCE = var$1;
},
jl_IllegalStateException = $rt_classWithoutFields(jl_RuntimeException),
cgmmg_TurnState = $rt_classWithoutFields(jl_Enum),
cgmmg_TurnState_NOT_STARTED = null,
cgmmg_TurnState_START_OF_TURN = null,
cgmmg_TurnState_PLAYING_CARDS = null,
cgmmg_TurnState_AWAITING_TARGET = null,
cgmmg_TurnState_AWAITING_PAYMENT = null,
cgmmg_TurnState_DISCARDING = null,
cgmmg_TurnState_TURN_END = null,
cgmmg_TurnState_GAME_OVER = null,
cgmmg_TurnState_$VALUES = null,
cgmmg_TurnState_$callClinit = () => {
    cgmmg_TurnState_$callClinit = $rt_eraseClinit(cgmmg_TurnState);
    cgmmg_TurnState__clinit_();
},
cgmmg_TurnState__init_0 = ($this, var$1, var$2) => {
    cgmmg_TurnState_$callClinit();
    jl_Enum__init_($this, var$1, var$2);
},
cgmmg_TurnState__init_ = (var_0, var_1) => {
    let var_2 = new cgmmg_TurnState();
    cgmmg_TurnState__init_0(var_2, var_0, var_1);
    return var_2;
},
cgmmg_TurnState__clinit_ = () => {
    let var$1, var$2, var$3;
    cgmmg_TurnState_NOT_STARTED = cgmmg_TurnState__init_($rt_s(475), 0);
    cgmmg_TurnState_START_OF_TURN = cgmmg_TurnState__init_($rt_s(476), 1);
    cgmmg_TurnState_PLAYING_CARDS = cgmmg_TurnState__init_($rt_s(477), 2);
    cgmmg_TurnState_AWAITING_TARGET = cgmmg_TurnState__init_($rt_s(478), 3);
    cgmmg_TurnState_AWAITING_PAYMENT = cgmmg_TurnState__init_($rt_s(479), 4);
    cgmmg_TurnState_DISCARDING = cgmmg_TurnState__init_($rt_s(480), 5);
    cgmmg_TurnState_TURN_END = cgmmg_TurnState__init_($rt_s(481), 6);
    var$1 = cgmmg_TurnState__init_($rt_s(482), 7);
    cgmmg_TurnState_GAME_OVER = var$1;
    var$2 = $rt_createArray(cgmmg_TurnState, 8);
    var$3 = var$2.data;
    var$3[0] = cgmmg_TurnState_NOT_STARTED;
    var$3[1] = cgmmg_TurnState_START_OF_TURN;
    var$3[2] = cgmmg_TurnState_PLAYING_CARDS;
    var$3[3] = cgmmg_TurnState_AWAITING_TARGET;
    var$3[4] = cgmmg_TurnState_AWAITING_PAYMENT;
    var$3[5] = cgmmg_TurnState_DISCARDING;
    var$3[6] = cgmmg_TurnState_TURN_END;
    var$3[7] = var$1;
    cgmmg_TurnState_$VALUES = var$2;
};
function w_DealBrowser$find$lambda$_12_0() {
    jl_Object.call(this);
    this.$_046 = null;
}
let w_DealBrowser$find$lambda$_12_0_test = (var$0, var$1) => {
    let var$2;
    var$1 = var$1;
    var$2 = var$0.$_046;
    w_DealBrowser_$callClinit();
    return jl_String_equals(var$1.$id.$value4, var$2);
},
juf_Supplier = $rt_classWithoutFields(0),
w_DealBrowser$find$lambda$_12_1 = $rt_classWithoutFields(),
w_DealBrowser$find$lambda$_12_1_get = var$0 => {
    let var$1;
    w_DealBrowser_$callClinit();
    var$1 = new jl_IllegalArgumentException;
    jl_Throwable__init_(var$1, $rt_s(483));
    return var$1;
};
function ju_Optional() {
    jl_Object.call(this);
    this.$value3 = null;
}
let ju_Optional_emptyInstance = null,
ju_Optional__init_0 = ($this, $value) => {
    $this.$value3 = $value;
},
ju_Optional__init_ = var_0 => {
    let var_1 = new ju_Optional();
    ju_Optional__init_0(var_1, var_0);
    return var_1;
},
ju_Optional_empty = () => {
    if (ju_Optional_emptyInstance === null)
        ju_Optional_emptyInstance = ju_Optional__init_(null);
    return ju_Optional_emptyInstance;
},
ju_Optional_of = $value => {
    return ju_Optional__init_(ju_Objects_requireNonNull($value));
},
ju_Optional_ofNullable = $value => {
    return $value === null ? ju_Optional_empty() : ju_Optional_of($value);
},
ju_Optional_get = $this => {
    let var$1;
    var$1 = $this.$value3;
    if (var$1 === null) {
        var$1 = new ju_NoSuchElementException;
        jl_Throwable__init_0(var$1);
        $rt_throw(var$1);
    }
    return var$1;
},
ju_Optional_isPresent = $this => {
    return $this.$value3 === null ? 0 : 1;
},
ju_Optional_isEmpty = $this => {
    return $this.$value3 !== null ? 0 : 1;
},
ju_Optional_ifPresent = ($this, $consumer) => {
    let var$2;
    var$2 = $this.$value3;
    if (var$2 !== null)
        $consumer.$accept(var$2);
},
ju_Optional_map = ($this, $mapper) => {
    let var$2;
    var$2 = $this.$value3;
    if (var$2 !== null)
        $this = ju_Optional_ofNullable($mapper.$apply0(var$2));
    return $this;
},
ju_Optional_orElse = ($this, $other) => {
    let var$2;
    var$2 = $this.$value3;
    if (var$2 !== null)
        $other = var$2;
    return $other;
},
ju_Optional_orElseThrow = ($this, $exceptionSupplier) => {
    let var$2;
    var$2 = $this.$value3;
    if (var$2 === null)
        $rt_throw($exceptionSupplier.$get0());
    return var$2;
},
w_DealBrowser$promptColorSelection$lambda$_26_0 = $rt_classWithoutFields(),
w_DealBrowser$promptColorSelection$lambda$_26_0_apply = (var$0, var$1) => {
    let var$2, var$3, var$4, var$5, var$6, var$7;
    var$1 = var$1;
    w_DealBrowser_$callClinit();
    var$2 = new w_DealBrowser$Option;
    var$1 = var$1.$name1;
    var$3 = 0;
    a: {
        b: {
            while (var$3 < var$1.$nativeString.length) {
                if (var$1.$nativeString.charCodeAt(var$3) == 95)
                    break b;
                var$3 = var$3 + 1 | 0;
            }
            var$4 = var$1;
            break a;
        }
        var$5 = $rt_createCharArray(var$1.$nativeString.length);
        var$6 = var$5.data;
        var$7 = 0;
        while (var$7 < var$3) {
            var$6[var$7] = var$1.$nativeString.charCodeAt(var$7);
            var$7 = var$7 + 1 | 0;
        }
        var$7 = var$3 + 1 | 0;
        var$6[var$3] = 32;
        while (var$7 < var$1.$nativeString.length) {
            var$3 = var$1.$nativeString.charCodeAt(var$7);
            if (var$3 == 95)
                var$3 = 32;
            var$6[var$7] = var$3;
            var$7 = var$7 + 1 | 0;
        }
        var$4 = jl_String__init_3();
        var$4.$nativeString = $rt_fullArrayToString(var$5.data);
    }
    w_DealBrowser$Option__init_(var$2, var$1, var$4, $rt_s(3), 0);
    return var$2;
};
function w_DealBrowser$promptColorSelection$lambda$_26_1() {
    jl_Object.call(this);
    this.$_035 = null;
}
let w_DealBrowser$promptColorSelection$lambda$_26_1_accept = (var$0, var$1) => {
    let var$2, var$3, var$4, var$5, var$6, var$7;
    var$1 = var$1;
    var$2 = var$0.$_035;
    w_DealBrowser_$callClinit();
    var$1 = var$1.$get(0);
    cgmmc_PropertyColor_$callClinit();
    var$3 = jl_Class_getEnumConstantsFast($rt_cls(cgmmc_PropertyColor));
    var$3 = var$3 === null ? null : var$3.$clone0();
    if (var$3 !== null) {
        var$3 = var$3.data;
        var$4 = var$3.length;
        var$5 = 0;
        while (true) {
            if (var$5 >= var$4) {
                var$2 = new jl_IllegalArgumentException;
                var$6 = jl_String_valueOf($rt_cls(cgmmc_PropertyColor));
                var$1 = jl_String_valueOf(var$1);
                var$7 = new jl_StringBuilder;
                jl_AbstractStringBuilder__init_(var$7);
                jl_StringBuilder_append(jl_StringBuilder_append(jl_StringBuilder_append(jl_StringBuilder_append(jl_StringBuilder_append(var$7, $rt_s(484)), var$6), $rt_s(485)), var$1), $rt_s(486));
                jl_Throwable__init_(var$2, jl_AbstractStringBuilder_toString(var$7));
                $rt_throw(var$2);
            }
            var$7 = var$3[var$5];
            if (jl_String_equals(var$7.$name1, var$1))
                break;
            var$5 = var$5 + 1 | 0;
        }
        var$2.$accept(var$7);
        return;
    }
    var$1 = new jl_IllegalArgumentException;
    jl_Throwable__init_(var$1, $rt_s(487));
    $rt_throw(var$1);
};
function cgmmc_PropertyColor() {
    let a = this; jl_Enum.call(a);
    a.$fullSetSize = 0;
    a.$rent = null;
}
let cgmmc_PropertyColor_BROWN = null,
cgmmc_PropertyColor_LIGHT_BLUE = null,
cgmmc_PropertyColor_PINK = null,
cgmmc_PropertyColor_ORANGE = null,
cgmmc_PropertyColor_RED = null,
cgmmc_PropertyColor_YELLOW = null,
cgmmc_PropertyColor_GREEN = null,
cgmmc_PropertyColor_DARK_BLUE = null,
cgmmc_PropertyColor_RAILROAD = null,
cgmmc_PropertyColor_UTILITY = null,
cgmmc_PropertyColor_ANY = null,
cgmmc_PropertyColor_$VALUES = null,
cgmmc_PropertyColor_$callClinit = () => {
    cgmmc_PropertyColor_$callClinit = $rt_eraseClinit(cgmmc_PropertyColor);
    cgmmc_PropertyColor__clinit_();
},
cgmmc_PropertyColor__init_0 = ($this, var$1, var$2, $n, $r) => {
    cgmmc_PropertyColor_$callClinit();
    jl_Enum__init_($this, var$1, var$2);
    $this.$fullSetSize = $n;
    $this.$rent = $r;
},
cgmmc_PropertyColor__init_ = (var_0, var_1, var_2, var_3) => {
    let var_4 = new cgmmc_PropertyColor();
    cgmmc_PropertyColor__init_0(var_4, var_0, var_1, var_2, var_3);
    return var_4;
},
cgmmc_PropertyColor__clinit_ = () => {
    let var$1, var$2, var$3;
    cgmmc_PropertyColor_BROWN = cgmmc_PropertyColor__init_($rt_s(488), 0, 2, $rt_createIntArrayFromData([1, 2]));
    cgmmc_PropertyColor_LIGHT_BLUE = cgmmc_PropertyColor__init_($rt_s(489), 1, 3, $rt_createIntArrayFromData([1, 2, 3]));
    cgmmc_PropertyColor_PINK = cgmmc_PropertyColor__init_($rt_s(490), 2, 3, $rt_createIntArrayFromData([1, 2, 4]));
    cgmmc_PropertyColor_ORANGE = cgmmc_PropertyColor__init_($rt_s(491), 3, 3, $rt_createIntArrayFromData([1, 3, 5]));
    cgmmc_PropertyColor_RED = cgmmc_PropertyColor__init_($rt_s(492), 4, 3, $rt_createIntArrayFromData([2, 3, 6]));
    cgmmc_PropertyColor_YELLOW = cgmmc_PropertyColor__init_($rt_s(493), 5, 3, $rt_createIntArrayFromData([2, 4, 6]));
    cgmmc_PropertyColor_GREEN = cgmmc_PropertyColor__init_($rt_s(494), 6, 3, $rt_createIntArrayFromData([2, 4, 7]));
    cgmmc_PropertyColor_DARK_BLUE = cgmmc_PropertyColor__init_($rt_s(495), 7, 2, $rt_createIntArrayFromData([3, 8]));
    cgmmc_PropertyColor_RAILROAD = cgmmc_PropertyColor__init_($rt_s(496), 8, 4, $rt_createIntArrayFromData([1, 2, 3, 4]));
    cgmmc_PropertyColor_UTILITY = cgmmc_PropertyColor__init_($rt_s(497), 9, 2, $rt_createIntArrayFromData([1, 2]));
    var$1 = cgmmc_PropertyColor__init_($rt_s(498), 10, 0, $rt_createIntArray(0));
    cgmmc_PropertyColor_ANY = var$1;
    var$2 = $rt_createArray(cgmmc_PropertyColor, 11);
    var$3 = var$2.data;
    var$3[0] = cgmmc_PropertyColor_BROWN;
    var$3[1] = cgmmc_PropertyColor_LIGHT_BLUE;
    var$3[2] = cgmmc_PropertyColor_PINK;
    var$3[3] = cgmmc_PropertyColor_ORANGE;
    var$3[4] = cgmmc_PropertyColor_RED;
    var$3[5] = cgmmc_PropertyColor_YELLOW;
    var$3[6] = cgmmc_PropertyColor_GREEN;
    var$3[7] = cgmmc_PropertyColor_DARK_BLUE;
    var$3[8] = cgmmc_PropertyColor_RAILROAD;
    var$3[9] = cgmmc_PropertyColor_UTILITY;
    var$3[10] = var$1;
    cgmmc_PropertyColor_$VALUES = var$2;
},
jtt_TemporalAccessor = $rt_classWithoutFields(0),
jtt_Temporal = $rt_classWithoutFields(0),
jtt_TemporalAdjuster = $rt_classWithoutFields(0);
function jt_Instant() {
    let a = this; jl_Object.call(a);
    a.$seconds = Long_ZERO;
    a.$nanos = 0;
}
let jt_Instant_EPOCH = null,
jt_Instant_MIN = null,
jt_Instant_MAX = null,
jt_Instant_FROM = null,
jt_Instant_$callClinit = () => {
    jt_Instant_$callClinit = $rt_eraseClinit(jt_Instant);
    jt_Instant__clinit_();
},
jt_Instant_ofEpochSecond = ($epochSecond, $nanoAdjustment) => {
    let var$3, $secs, var$5;
    jt_Instant_$callClinit();
    var$3 = jl_Math_floorDiv($nanoAdjustment, 1000000000);
    $secs = Long_add($epochSecond, var$3);
    if (Long_lt(Long_xor($epochSecond, $secs), Long_ZERO) && Long_ge(Long_xor($epochSecond, var$3), Long_ZERO)) {
        var$5 = new jl_ArithmeticException;
        jl_Throwable__init_0(var$5);
        $rt_throw(var$5);
    }
    return jt_Instant_create($secs, jl_Math_floorMod($nanoAdjustment, 1000000000));
},
jt_Instant_create = ($seconds, $nanoOfSecond) => {
    let var$3;
    jt_Instant_$callClinit();
    if (Long_ne(Long_or($seconds, Long_fromInt($nanoOfSecond)), Long_ZERO)) {
        if (Long_ge($seconds, Long_create(342103040, 4287619856)) && Long_le($seconds, Long_create(4204099839, 7347410)))
            return jt_Instant__init_($seconds, $nanoOfSecond);
        var$3 = new jt_DateTimeException;
        jl_Throwable__init_(var$3, $rt_s(499));
        $rt_throw(var$3);
    }
    return jt_Instant_EPOCH;
},
jt_Instant__init_0 = ($this, $epochSecond, $nanos) => {
    jt_Instant_$callClinit();
    $this.$seconds = $epochSecond;
    $this.$nanos = $nanos;
},
jt_Instant__init_ = (var_0, var_1) => {
    let var_2 = new jt_Instant();
    jt_Instant__init_0(var_2, var_0, var_1);
    return var_2;
},
jt_Instant__clinit_ = () => {
    jt_Instant_EPOCH = jt_Instant__init_(Long_ZERO, 0);
    jt_Instant_MIN = jt_Instant_ofEpochSecond(Long_create(342103040, 4287619856), Long_ZERO);
    jt_Instant_MAX = jt_Instant_ofEpochSecond(Long_create(4204099839, 7347410), Long_fromInt(999999999));
    jt_Instant_FROM = new jt_Instant$1;
},
cgme_InvalidMoveException = $rt_classWithoutFields(jl_RuntimeException),
cgme_InvalidMoveException__init_0 = ($this, $message) => {
    jl_Throwable__init_($this, $message);
},
cgme_InvalidMoveException__init_ = var_0 => {
    let var_1 = new cgme_InvalidMoveException();
    cgme_InvalidMoveException__init_0(var_1, var_0);
    return var_1;
};
function cgmmc_BuildingCard() {
    cgmmc_Card.call(this);
    this.$buildingType = null;
}
let cgmmc_BuildingCard__init_ = ($this, $buildingType) => {
    let var$2, var$3, var$4;
    cgmmc_BuildingType_$callClinit();
    var$2 = cgmmc_BuildingType_HOUSE;
    var$3 = $buildingType !== var$2 ? $rt_s(500) : $rt_s(501);
    var$4 = $buildingType !== var$2 ? 4 : 3;
    cgmmc_CardType_$callClinit();
    cgmmc_Card__init_($this, var$3, var$4, cgmmc_CardType_BUILDING, $buildingType !== var$2 ? $rt_s(502) : $rt_s(503));
    $this.$buildingType = ju_Objects_requireNonNull0($buildingType, $rt_s(504));
},
cgmmc_BuildingCard__init_0 = var_0 => {
    let var_1 = new cgmmc_BuildingCard();
    cgmmc_BuildingCard__init_(var_1, var_0);
    return var_1;
},
cgmmc_BuildingCard_isHotel = $this => {
    let var$1;
    var$1 = $this.$buildingType;
    cgmmc_BuildingType_$callClinit();
    return var$1 !== cgmmc_BuildingType_HOTEL ? 0 : 1;
};
function w_DealBrowser$choosePlay$lambda$_13_0() {
    let a = this; jl_Object.call(a);
    a.$_01 = null;
    a.$_10 = null;
    a.$_20 = null;
    a.$_30 = null;
}
let w_DealBrowser$choosePlay$lambda$_13_0_accept = (var$0, var$1) => {
    let var$2, var$3, var$4, var$5;
    var$1 = var$1;
    var$2 = var$0.$_01;
    var$3 = var$0.$_10;
    var$4 = var$0.$_20;
    var$5 = var$0.$_30;
    cgmc_GameController_playCard(var$2.$controller, var$3, var$4, cgmc_GameController$PlayCardRequest_withChosenColor(var$5, var$1));
};
function cgmmc_ActionCard() {
    let a = this; cgmmc_Card.call(a);
    a.$actionType = null;
    a.$rentColors = null;
}
let cgmmc_ActionCard__init_ = ($this, $name, $value, $actionType, $description) => {
    ju_Collections_$callClinit();
    cgmmc_ActionCard__init_0($this, $name, $value, $actionType, $description, ju_Collections_EMPTY_SET);
},
cgmmc_ActionCard__init_1 = (var_0, var_1, var_2, var_3) => {
    let var_4 = new cgmmc_ActionCard();
    cgmmc_ActionCard__init_(var_4, var_0, var_1, var_2, var_3);
    return var_4;
},
cgmmc_ActionCard__init_0 = ($this, $name, $value, $actionType, $description, $rentColors) => {
    cgmmc_CardType_$callClinit();
    cgmmc_Card__init_($this, $name, $value, cgmmc_CardType_ACTION, $description);
    $this.$actionType = $actionType;
    $this.$rentColors = $rentColors !== null && !$rentColors.$isEmpty() ? ju_EnumSet_copyOf($rentColors) : ju_EnumSet_noneOf($rt_cls(cgmmc_PropertyColor));
},
cgmmc_ActionCard__init_2 = (var_0, var_1, var_2, var_3, var_4) => {
    let var_5 = new cgmmc_ActionCard();
    cgmmc_ActionCard__init_0(var_5, var_0, var_1, var_2, var_3, var_4);
    return var_5;
},
cgmmc_ActionCard_getActionType = $this => {
    return $this.$actionType;
},
cgmmc_ActionCard_getRentColors = $this => {
    return ju_Set_copyOf($this.$rentColors);
},
cgmmc_ActionCard_canBeBanked = $this => {
    return 1;
},
cgmmc_ActionCard_toString = $this => {
    let var$1, var$2, var$3, var$4;
    var$1 = $this;
    var$2 = var$1.$name0;
    var$3 = jl_String_valueOf($this.$actionType);
    var$4 = var$1.$value;
    var$1 = new jl_StringBuilder;
    jl_AbstractStringBuilder__init_(var$1);
    jl_StringBuilder_append(jl_StringBuilder_append0(jl_StringBuilder_append(jl_StringBuilder_append(jl_StringBuilder_append(jl_StringBuilder_append(var$1, var$2), $rt_s(70)), var$3), $rt_s(92)), var$4), $rt_s(216));
    return jl_AbstractStringBuilder_toString(var$1);
},
cgmmc_ActionCard_equals = ($this, $obj) => {
    let $other, var$3, var$4, var$5, var$6, var$7;
    if ($this !== $obj) {
        if ($obj instanceof cgmmc_ActionCard) {
            a: {
                b: {
                    $other = $obj;
                    if (jl_Object_equals($this, $obj) && $this.$actionType === $other.$actionType) {
                        $obj = $this.$rentColors;
                        $other = $other.$rentColors;
                        $obj = $obj;
                        if ($other === $obj)
                            var$3 = 1;
                        else if (!($other instanceof ju_GenericEnumSet))
                            var$3 = ju_AbstractSet_equals($obj, $other);
                        else {
                            $other = $other;
                            if ($obj.$cls !== $other.$cls)
                                var$3 = !(!ju_GenericEnumSet_size($obj) && !ju_GenericEnumSet_size($other)) ? 0 : 1;
                            else
                                c: {
                                    var$4 = $obj.$bits0;
                                    var$5 = $other.$bits0;
                                    if (var$4 === var$5)
                                        var$3 = 1;
                                    else {
                                        d: {
                                            if (var$4 !== null && var$5 !== null) {
                                                var$4 = var$4.data;
                                                var$5 = var$5.data;
                                                var$3 = var$4.length;
                                                if (var$3 == var$5.length)
                                                    break d;
                                            }
                                            var$3 = 0;
                                            break c;
                                        }
                                        var$6 = 0;
                                        e: {
                                            f: {
                                                while (true) {
                                                    if (var$6 >= var$3)
                                                        break f;
                                                    var$7 = var$6 + 0 | 0;
                                                    if (var$4[var$7] != var$5[var$7])
                                                        break;
                                                    var$6 = var$6 + 1 | 0;
                                                }
                                                break e;
                                            }
                                            var$6 = (-1);
                                        }
                                        var$3 = var$6 >= 0 ? 0 : 1;
                                    }
                                }
                        }
                        if (var$3)
                            break b;
                    }
                    var$3 = 0;
                    break a;
                }
                var$3 = 1;
            }
            return var$3;
        }
        return 0;
    }
    return 1;
},
cgmmc_ActionCard_hashCode = $this => {
    let var$1, var$2, var$3;
    var$1 = $rt_createArray(jl_Object, 3).data;
    var$1[0] = jl_Integer_valueOf(jl_Object_identity($this));
    var$1[1] = $this.$actionType;
    var$1[2] = $this.$rentColors;
    var$2 = 1;
    var$3 = 0;
    while (var$3 < var$1.length) {
        var$2 = (31 * var$2 | 0) + ju_Objects_hashCode(var$1[var$3]) | 0;
        var$3 = var$3 + 1 | 0;
    }
    return var$2;
};
function w_DealBrowser$choosePlay$lambda$_13_1() {
    jl_Object.call(this);
    this.$_020 = null;
}
let w_DealBrowser$choosePlay$lambda$_13_1_test = (var$0, var$1) => {
    let var$2;
    var$1 = var$1;
    var$2 = var$0.$_020;
    w_DealBrowser_$callClinit();
    return cgmmc_PropertySet_canAttach(var$1, var$2.$buildingType);
},
w_DealBrowser$choosePlay$lambda$_13_2 = $rt_classWithoutFields(),
w_DealBrowser$choosePlay$lambda$_13_2_apply = (var$0, var$1) => {
    return var$1.$color;
};
function w_DealBrowser$choosePlay$lambda$_13_3() {
    let a = this; jl_Object.call(a);
    a.$_062 = null;
    a.$_122 = null;
    a.$_28 = null;
    a.$_35 = null;
}
let w_DealBrowser$choosePlay$lambda$_13_3_accept = (var$0, var$1) => {
    let var$2, var$3, var$4, var$5;
    var$1 = var$1;
    var$2 = var$0.$_062;
    var$3 = var$0.$_122;
    var$4 = var$0.$_28;
    var$5 = var$0.$_35;
    cgmc_GameController_playCard(var$2.$controller, var$3, var$4, cgmc_GameController$PlayCardRequest_withChosenColor(var$5, var$1));
},
cgmcf_PaymentFlowService$1 = $rt_classWithoutFields(),
cgmcf_PaymentFlowService$1_$SwitchMap$com$group4$monopolydeal$engine$payment$PaymentReason = null,
cgmcf_PaymentFlowService$1_$callClinit = () => {
    cgmcf_PaymentFlowService$1_$callClinit = $rt_eraseClinit(cgmcf_PaymentFlowService$1);
    cgmcf_PaymentFlowService$1__clinit_();
},
cgmcf_PaymentFlowService$1__clinit_ = () => {
    let var$1, var$2;
    cgmep_PaymentReason_$callClinit();
    var$1 = $rt_createIntArray((cgmep_PaymentReason_$VALUES.$clone0()).data.length);
    var$2 = var$1.data;
    cgmcf_PaymentFlowService$1_$SwitchMap$com$group4$monopolydeal$engine$payment$PaymentReason = var$1;
    var$2[cgmep_PaymentReason_RENT.$ordinal] = 1;
    var$2[cgmep_PaymentReason_DEBT_COLLECTOR.$ordinal] = 2;
    var$2[cgmep_PaymentReason_BIRTHDAY.$ordinal] = 3;
},
jl_Error = $rt_classWithoutFields(jl_Throwable),
jl_LinkageError = $rt_classWithoutFields(jl_Error),
jl_IncompatibleClassChangeError = $rt_classWithoutFields(jl_LinkageError);
function juca_AtomicBoolean() {
    jl_Object.call(this);
    this.$value6 = 0;
}
function cgmcf_ReactionFlowService$resolveJustSayNoChain$lambda$_1_0() {
    jl_Object.call(this);
    this.$_059 = null;
}
function cgmmg_Game() {
    let a = this; jl_Object.call(a);
    a.$players0 = null;
    a.$rules = null;
    a.$deck = null;
    a.$discardPile = null;
    a.$currentPlayerIndex = 0;
    a.$cardsPlayedThisTurn = 0;
    a.$turnState = null;
    a.$winner0 = null;
}
let cgmmg_Game_getPlayers = $this => {
    return ju_Collections_unmodifiableList($this.$players0);
},
cgmmg_Game_getCurrentPlayer = $this => {
    let var$1, var$2;
    var$1 = $this.$players0;
    var$2 = $this.$currentPlayerIndex;
    return ju_ArrayList_get(var$1, var$2);
},
cgmmg_Game_advanceToNextPlayer = $this => {
    $this.$currentPlayerIndex = ($this.$currentPlayerIndex + 1 | 0) % $this.$players0.$size0 | 0;
    $this.$cardsPlayedThisTurn = 0;
},
cgmmg_Game_incrementCardsPlayedThisTurn = ($this, $amount) => {
    let var$2;
    if ($amount < 0) {
        var$2 = new jl_IllegalArgumentException;
        jl_Throwable__init_(var$2, $rt_s(505));
        $rt_throw(var$2);
    }
    $this.$cardsPlayedThisTurn = $this.$cardsPlayedThisTurn + $amount | 0;
},
cgmmg_Game_getWinner = $this => {
    return ju_Optional_ofNullable($this.$winner0);
};
function cgmcf_ControllerState$checkWinAfterOwnTurnOperation$lambda$_26_0() {
    let a = this; jl_Object.call(a);
    a.$_052 = null;
    a.$_118 = null;
}
let cgmcf_ControllerState$checkWinAfterOwnTurnOperation$lambda$_26_0_accept = (var$0, var$1) => {
    let var$2, var$3, var$4, var$5;
    var$1 = var$1;
    var$2 = var$0.$_052;
    var$3 = var$0.$_118;
    var$4 = var$1.$name;
    var$5 = new jl_StringBuilder;
    jl_AbstractStringBuilder__init_(var$5);
    jl_StringBuilder_append(jl_StringBuilder_append(jl_StringBuilder_append(var$5, $rt_s(506)), var$4), $rt_s(507));
    cgmcf_ControllerState_log(var$2, jl_AbstractStringBuilder_toString(var$5));
    var$3.$winner0 = var$1;
    cgmmg_TurnState_$callClinit();
    var$3.$turnState = cgmmg_TurnState_GAME_OVER;
    var$2 = var$2.$view0;
    var$3 = var$1.$name;
    var$1 = new jl_StringBuilder;
    jl_AbstractStringBuilder__init_(var$1);
    jl_StringBuilder_append(jl_StringBuilder_append(var$1, var$3), $rt_s(508));
    var$2.$notice = jl_AbstractStringBuilder_toString(var$1);
},
jt_Clock = $rt_classWithoutFields(),
w_DealBrowser$1 = $rt_classWithoutFields(),
w_DealBrowser$1_$SwitchMap$com$group4$monopolydeal$model$card$ActionType = null,
w_DealBrowser$1_$callClinit = () => {
    w_DealBrowser$1_$callClinit = $rt_eraseClinit(w_DealBrowser$1);
    w_DealBrowser$1__clinit_();
},
w_DealBrowser$1__clinit_ = () => {
    let var$1, var$2;
    var$1 = $rt_createIntArray((cgmmc_ActionType_values()).data.length);
    var$2 = var$1.data;
    w_DealBrowser$1_$SwitchMap$com$group4$monopolydeal$model$card$ActionType = var$1;
    var$2[cgmmc_ActionType_DEBT_COLLECTOR.$ordinal] = 1;
    var$2[cgmmc_ActionType_SLY_DEAL.$ordinal] = 2;
    var$2[cgmmc_ActionType_FORCED_DEAL.$ordinal] = 3;
    var$2[cgmmc_ActionType_DEAL_BREAKER.$ordinal] = 4;
    var$2[cgmmc_ActionType_RENT.$ordinal] = 5;
    var$2[cgmmc_ActionType_MULTI_COLOUR_RENT.$ordinal] = 6;
};
function w_DealBrowser$chooseAction$lambda$_14_0() {
    let a = this; jl_Object.call(a);
    a.$_025 = null;
    a.$_18 = null;
    a.$_25 = null;
    a.$_34 = null;
}
let w_DealBrowser$chooseAction$lambda$_14_0_accept = (var$0, var$1) => {
    let var$2, var$3, var$4, var$5;
    var$1 = var$1;
    var$2 = var$0.$_025;
    var$3 = var$0.$_18;
    var$4 = var$0.$_25;
    var$5 = var$0.$_34;
    cgmc_GameController_playCard(var$2.$controller, var$3, var$4, cgmc_GameController$PlayCardRequest_withSelectedCards(var$5, var$1));
},
w_DealBrowser$chooseAction$lambda$_14_1 = $rt_classWithoutFields(),
w_DealBrowser$chooseAction$lambda$_14_1_apply = (var$0, var$1) => {
    return var$1.$color;
};
function w_DealBrowser$chooseAction$lambda$_14_2() {
    let a = this; jl_Object.call(a);
    a.$_070 = null;
    a.$_125 = null;
    a.$_211 = null;
    a.$_38 = null;
}
let w_DealBrowser$chooseAction$lambda$_14_2_accept = (var$0, var$1) => {
    let var$2, var$3, var$4, var$5;
    var$1 = var$1;
    var$2 = var$0.$_070;
    var$3 = var$0.$_125;
    var$4 = var$0.$_211;
    var$5 = var$0.$_38;
    cgmc_GameController_playCard(var$2.$controller, var$3, var$4, cgmc_GameController$PlayCardRequest_withChosenColor(var$5, var$1));
},
w_DealBrowser$chooseAction$lambda$_14_3 = $rt_classWithoutFields(),
w_DealBrowser$chooseAction$lambda$_14_3_test = (var$0, var$1) => {
    var$1 = var$1;
    w_DealBrowser_$callClinit();
    return cgmmc_PropertySet_propertyCount(var$1) <= 0 ? 0 : 1;
},
w_DealBrowser$chooseAction$lambda$_14_4 = $rt_classWithoutFields(),
w_DealBrowser$chooseAction$lambda$_14_4_apply = (var$0, var$1) => {
    return var$1.$color;
};
function w_DealBrowser$chooseAction$lambda$_14_5() {
    let a = this; jl_Object.call(a);
    a.$_050 = 0;
    a.$_116 = null;
}
let w_DealBrowser$chooseAction$lambda$_14_5_test = (var$0, var$1) => {
    let var$2, var$3;
    var$1 = var$1;
    var$2 = var$0.$_050;
    var$3 = var$0.$_116;
    w_DealBrowser_$callClinit();
    return !(!var$2 && !ju_TemplateCollections$NElementSet_contains(cgmmc_ActionCard_getRentColors(var$3), var$1)) ? 1 : 0;
};
function w_DealBrowser$chooseAction$lambda$_14_6() {
    let a = this; jl_Object.call(a);
    a.$_0 = null;
    a.$_1 = null;
    a.$_2 = null;
    a.$_3 = 0;
    a.$_4 = null;
    a.$_5 = null;
}
let w_DealBrowser$chooseAction$lambda$_14_6_accept = (var$0, var$1) => {
    let var$2, var$3, var$4, var$5, var$6, var$7, var$8;
    var$1 = var$1;
    var$2 = var$0.$_0;
    var$3 = var$0.$_1;
    var$4 = var$0.$_2;
    var$5 = var$0.$_3;
    var$6 = var$0.$_4;
    var$7 = var$0.$_5;
    if (var$5)
        var$7 = var$6;
    var$6 = cgmc_GameController$PlayCardRequest_withChosenColor(var$7, var$1);
    var$1 = ju_Collection_stream(cgmmc_AbstractCardCollection_getCards(var$3.$hand));
    var$7 = new w_DealBrowser$chooseRentMultiplier$lambda$_15_0;
    var$5 = jl_Math_min(2, jl_Math_min(Long_lo((jusi_SimpleStreamImpl_count(jusi_SimpleStreamImpl_filter(var$1, var$7)))), (cgmc_GameController_getSnapshot(var$2.$controller)).$remainingPlays - 1 | 0));
    if (var$5 <= 0)
        cgmc_GameController_playCard(var$2.$controller, var$3, var$4, var$6);
    else {
        var$1 = new w_DealBrowser$chooseRentMultiplier$lambda$_15_1;
        var$1.$_064 = var$2;
        var$1.$_123 = var$3;
        var$1.$_29 = var$4;
        var$1.$_36 = var$6;
        var$3 = ju_ArrayList__init_();
        var$8 = 0;
        while (var$8 <= var$5) {
            var$4 = new w_DealBrowser$Option;
            var$6 = jl_Integer_toString(var$8);
            var$7 = new jl_StringBuilder;
            jl_AbstractStringBuilder__init_(var$7);
            jl_StringBuilder_append(jl_StringBuilder_append0(var$7, var$8), $rt_s(509));
            w_DealBrowser$Option__init_(var$4, var$6, jl_AbstractStringBuilder_toString(var$7), $rt_s(3), 0);
            ju_ArrayList_add(var$3, var$4);
            var$8 = var$8 + 1 | 0;
        }
        var$7 = new w_DealBrowser$promptDoubleRentSelection$lambda$_28_0;
        var$7.$_044 = var$1;
        w_DealBrowser_showChoices(var$2, $rt_s(510), $rt_s(511), var$3, 1, 1, 0, 0, var$7);
    }
};
function w_DealBrowser$chooseAction$lambda$_14_7() {
    let a = this; jl_Object.call(a);
    a.$_022 = null;
    a.$_17 = null;
    a.$_24 = null;
    a.$_33 = null;
    a.$_41 = null;
    a.$_50 = null;
}
let w_DealBrowser$chooseAction$lambda$_14_7_accept = (var$0, var$1) => {
    let var$2, var$3, var$4, var$5, var$6, var$7, var$8, var$9;
    var$1 = var$1;
    var$2 = var$0.$_022;
    var$3 = var$0.$_17;
    var$4 = var$0.$_24;
    var$5 = var$0.$_33;
    var$6 = var$0.$_41;
    var$7 = var$0.$_50;
    var$8 = var$5.$name0;
    var$9 = new w_DealBrowser$lambda$chooseAction$17$lambda$_57_0;
    var$9.$_08 = var$2;
    var$9.$_13 = var$3;
    var$9.$_21 = var$5;
    var$9.$_31 = var$7;
    var$9.$_40 = var$1;
    w_DealBrowser_promptCardSelection(var$2, var$3, var$4, var$8, $rt_s(512), var$6, 1, 1, var$9);
};
function cgmcf_ReactionFlowService$findReactionCard$lambda$_2_0() {
    jl_Object.call(this);
    this.$_041 = null;
}
let cgmcf_ReactionFlowService$findReactionCard$lambda$_2_0_test = (var$0, var$1) => {
    var$1 = var$1;
    return jl_Class_isInstance(var$0.$_041, var$1);
};
function cgmcf_ReactionFlowService$findReactionCard$lambda$_2_1() {
    jl_Object.call(this);
    this.$_05 = null;
}
let cgmcf_ReactionFlowService$findReactionCard$lambda$_2_1_apply = (var$0, var$1) => {
    var$1 = var$1;
    return jl_Class_cast(var$0.$_05, var$1);
};
function cgmcf_ReactionFlowService$findReactionCard$lambda$_2_2() {
    jl_Object.call(this);
    this.$_028 = null;
}
let cgmcf_ReactionFlowService$findReactionCard$lambda$_2_2_test = (var$0, var$1) => {
    let var$2;
    var$1 = var$1;
    var$2 = var$0.$_028;
    return var$1.$actionType !== var$2 ? 0 : 1;
},
jtt_TemporalQuery = $rt_classWithoutFields(0),
jt_Instant$1 = $rt_classWithoutFields();
function jt_Clock$SystemClock() {
    jt_Clock.call(this);
    this.$zone = null;
}
let jt_ZoneId = $rt_classWithoutFields(),
jt_ZoneId_FROM = null,
jt_ZoneId_SHORT_IDS = null,
jt_ZoneId_$callClinit = () => {
    jt_ZoneId_$callClinit = $rt_eraseClinit(jt_ZoneId);
    jt_ZoneId__clinit_();
},
jt_ZoneId__clinit_ = () => {
    let $base, var$2;
    jt_ZoneId_FROM = new jt_ZoneId$1;
    $base = ju_HashMap__init_();
    var$2 = $base;
    ju_HashMap_put(var$2, $rt_s(513), $rt_s(514));
    ju_HashMap_put(var$2, $rt_s(515), $rt_s(516));
    ju_HashMap_put(var$2, $rt_s(517), $rt_s(518));
    ju_HashMap_put(var$2, $rt_s(519), $rt_s(520));
    ju_HashMap_put(var$2, $rt_s(521), $rt_s(522));
    ju_HashMap_put(var$2, $rt_s(523), $rt_s(524));
    ju_HashMap_put(var$2, $rt_s(525), $rt_s(526));
    ju_HashMap_put(var$2, $rt_s(527), $rt_s(528));
    ju_HashMap_put(var$2, $rt_s(529), $rt_s(530));
    ju_HashMap_put(var$2, $rt_s(531), $rt_s(532));
    ju_HashMap_put(var$2, $rt_s(533), $rt_s(534));
    ju_HashMap_put(var$2, $rt_s(535), $rt_s(536));
    ju_HashMap_put(var$2, $rt_s(537), $rt_s(538));
    ju_HashMap_put(var$2, $rt_s(539), $rt_s(540));
    ju_HashMap_put(var$2, $rt_s(541), $rt_s(542));
    ju_HashMap_put(var$2, $rt_s(543), $rt_s(544));
    ju_HashMap_put(var$2, $rt_s(545), $rt_s(546));
    ju_HashMap_put(var$2, $rt_s(547), $rt_s(548));
    ju_HashMap_put(var$2, $rt_s(549), $rt_s(550));
    ju_HashMap_put(var$2, $rt_s(551), $rt_s(552));
    ju_HashMap_put(var$2, $rt_s(553), $rt_s(554));
    ju_HashMap_put(var$2, $rt_s(555), $rt_s(556));
    ju_HashMap_put(var$2, $rt_s(557), $rt_s(558));
    ju_HashMap_put(var$2, $rt_s(559), $rt_s(560));
    ju_HashMap_put(var$2, $rt_s(561), $rt_s(562));
    ju_HashMap_put(var$2, $rt_s(563), $rt_s(564));
    ju_HashMap_put(var$2, $rt_s(565), $rt_s(566));
    ju_HashMap_put(var$2, $rt_s(567), $rt_s(568));
    jt_ZoneId_SHORT_IDS = ju_Collections_unmodifiableMap($base);
};
function jt_ZoneOffset() {
    let a = this; jt_ZoneId.call(a);
    a.$totalSeconds = 0;
    a.$id2 = null;
}
let jt_ZoneOffset_SECONDS_CACHE = null,
jt_ZoneOffset_ID_CACHE = null,
jt_ZoneOffset_UTC = null,
jt_ZoneOffset_MIN = null,
jt_ZoneOffset_MAX = null,
jt_ZoneOffset_$callClinit = () => {
    jt_ZoneOffset_$callClinit = $rt_eraseClinit(jt_ZoneOffset);
    jt_ZoneOffset__clinit_();
},
jt_ZoneOffset_ofTotalSeconds = $totalSeconds => {
    let $totalSecs, $result;
    jt_ZoneOffset_$callClinit();
    if (jl_Math_abs($totalSeconds) <= 64800) {
        if (!($totalSeconds % 900 | 0)) {
            $totalSecs = jl_Integer_valueOf($totalSeconds);
            $result = ju_HashMap_get(jt_ZoneOffset_SECONDS_CACHE, $totalSecs);
            if ($result === null) {
                $result = jt_ZoneOffset__init_($totalSeconds);
                ju_Map_putIfAbsent(jt_ZoneOffset_SECONDS_CACHE, $totalSecs, $result);
                $result = ju_HashMap_get(jt_ZoneOffset_SECONDS_CACHE, $totalSecs);
                ju_Map_putIfAbsent(jt_ZoneOffset_ID_CACHE, $result.$id2, $result);
            }
            return $result;
        }
        return jt_ZoneOffset__init_($totalSeconds);
    }
    $totalSecs = new jt_DateTimeException;
    jl_Throwable__init_($totalSecs, $rt_s(569));
    $rt_throw($totalSecs);
},
jt_ZoneOffset__init_0 = ($this, $totalSeconds) => {
    let var$2, var$3, var$4, var$5, var$6, var$7;
    jt_ZoneOffset_$callClinit();
    jt_ZoneId_$callClinit();
    if (jl_Object_getClass($this) !== $rt_cls(jt_ZoneOffset) && jl_Object_getClass($this) !== $rt_cls(jt_ZoneRegion)) {
        var$2 = new jl_AssertionError;
        jl_Throwable__init_(var$2, jl_String_valueOf($rt_s(570)));
        $rt_throw(var$2);
    }
    $this.$totalSeconds = $totalSeconds;
    if (!$totalSeconds)
        var$3 = $rt_s(571);
    else {
        var$4 = jl_Math_abs($totalSeconds);
        var$3 = new jl_StringBuilder;
        jl_AbstractStringBuilder__init_(var$3);
        var$5 = var$4 / 3600 | 0;
        var$6 = (var$4 / 60 | 0) % 60 | 0;
        var$7 = jl_StringBuilder_append1(var$3, $totalSeconds >= 0 ? $rt_s(572) : $rt_s(573));
        var$2 = var$5 >= 10 ? $rt_s(3) : $rt_s(7);
        var$2 = jl_StringBuilder_append0(jl_StringBuilder_append1(var$7, var$2), var$5);
        var$7 = var$6 >= 10 ? $rt_s(574) : $rt_s(575);
        jl_StringBuilder_append0(jl_StringBuilder_append1(var$2, var$7), var$6);
        $totalSeconds = var$4 % 60 | 0;
        if ($totalSeconds)
            jl_StringBuilder_append0(jl_StringBuilder_append1(var$3, $totalSeconds >= 10 ? $rt_s(574) : $rt_s(575)), $totalSeconds);
        var$3 = jl_AbstractStringBuilder_toString(var$3);
    }
    $this.$id2 = var$3;
},
jt_ZoneOffset__init_ = var_0 => {
    let var_1 = new jt_ZoneOffset();
    jt_ZoneOffset__init_0(var_1, var_0);
    return var_1;
},
jt_ZoneOffset_equals = ($this, $obj) => {
    if ($this !== $obj) {
        if ($obj instanceof jt_ZoneOffset)
            return $this.$totalSeconds != $obj.$totalSeconds ? 0 : 1;
        return 0;
    }
    return 1;
},
jt_ZoneOffset_hashCode = $this => {
    return $this.$totalSeconds;
},
jt_ZoneOffset_toString = $this => {
    return $this.$id2;
},
jt_ZoneOffset__clinit_ = () => {
    jt_ZoneOffset_SECONDS_CACHE = ju_HashMap__init_();
    jt_ZoneOffset_ID_CACHE = ju_HashMap__init_();
    jt_ZoneOffset_UTC = jt_ZoneOffset_ofTotalSeconds(0);
    jt_ZoneOffset_MIN = jt_ZoneOffset_ofTotalSeconds((-64800));
    jt_ZoneOffset_MAX = jt_ZoneOffset_ofTotalSeconds(64800);
};
function cgmmc_Deck() {
    jl_Object.call(this);
    this.$drawPile = null;
}
let cgmmc_Deck_draw = ($this, $count, $discardPile) => {
    let $out, $i, var$5;
    $out = ju_ArrayList__init_();
    $i = 0;
    a: {
        while (true) {
            if ($i >= $count)
                break a;
            if (ju_ArrayDeque_isEmpty($this.$drawPile))
                cgmmc_Deck_reshuffleFromDiscard($this, $discardPile);
            if (ju_ArrayDeque_isEmpty($this.$drawPile))
                break;
            var$5 = ju_ArrayDeque_removeFirst($this.$drawPile);
            ju_ArrayList_add($out, var$5);
            $i = $i + 1 | 0;
        }
    }
    return $out;
},
cgmmc_Deck_reshuffleFromDiscard = ($this, $discardPile) => {
    let var$2;
    $discardPile = $discardPile;
    var$2 = ju_ArrayList__init_0($discardPile.$cards);
    ju_ArrayList_clear($discardPile.$cards);
    ju_Collections_shuffle(var$2);
    ju_AbstractCollection_addAll($this.$drawPile, var$2);
};
function ju_TemplateCollections$ImmutableArrayList() {
    ju_TemplateCollections$AbstractImmutableList.call(this);
    this.$list = null;
}
let ju_TemplateCollections$ImmutableArrayList_get = ($this, $index) => {
    return $this.$list.data[$index];
},
ju_TemplateCollections$ImmutableArrayList_size = $this => {
    return $this.$list.data.length;
},
ju_TemplateCollections$ImmutableArrayList_remove = ($this, var$1) => {
    return ju_TemplateCollections$AbstractImmutableList_remove($this, var$1);
};
function cgmmg_GameRules() {
    let a = this; jl_Object.call(a);
    a.$initialHandSize = 0;
    a.$normalDrawCount = 0;
    a.$emptyHandDrawCount = 0;
    a.$maxCardsPlayedPerTurn = 0;
    a.$maxHandSizeAtTurnEnd = 0;
    a.$requiredCompleteSetsToWin = 0;
}
let w_DealBrowser$promptCardSelection$lambda$_27_0 = $rt_classWithoutFields(),
w_DealBrowser$promptCardSelection$lambda$_27_0_apply = (var$0, var$1) => {
    var$1 = var$1;
    w_DealBrowser_$callClinit();
    return w_DealBrowser_option(var$1, $rt_s(3));
};
function w_DealBrowser$promptCardSelection$lambda$_27_1() {
    let a = this; jl_Object.call(a);
    a.$_048 = null;
    a.$_115 = null;
}
let w_DealBrowser$promptCardSelection$lambda$_27_1_accept = (var$0, var$1) => {
    let var$2, var$3, var$4;
    var$1 = var$1;
    var$2 = var$0.$_048;
    var$3 = var$0.$_115;
    w_DealBrowser_$callClinit();
    var$1 = ju_Collection_stream(var$1);
    var$4 = new w_DealBrowser$lambda$promptCardSelection$37$lambda$_37_0;
    var$4.$_057 = var$3;
    var$2.$accept(jus_Stream_toList(jusi_SimpleStreamImpl_map(var$1, var$4)));
},
cgmep_PaymentReason = $rt_classWithoutFields(jl_Enum),
cgmep_PaymentReason_RENT = null,
cgmep_PaymentReason_DEBT_COLLECTOR = null,
cgmep_PaymentReason_BIRTHDAY = null,
cgmep_PaymentReason_$VALUES = null,
cgmep_PaymentReason_$callClinit = () => {
    cgmep_PaymentReason_$callClinit = $rt_eraseClinit(cgmep_PaymentReason);
    cgmep_PaymentReason__clinit_();
},
cgmep_PaymentReason__init_0 = ($this, var$1, var$2) => {
    cgmep_PaymentReason_$callClinit();
    jl_Enum__init_($this, var$1, var$2);
},
cgmep_PaymentReason__init_ = (var_0, var_1) => {
    let var_2 = new cgmep_PaymentReason();
    cgmep_PaymentReason__init_0(var_2, var_0, var_1);
    return var_2;
},
cgmep_PaymentReason__clinit_ = () => {
    let var$1, var$2, var$3;
    cgmep_PaymentReason_RENT = cgmep_PaymentReason__init_($rt_s(163), 0);
    cgmep_PaymentReason_DEBT_COLLECTOR = cgmep_PaymentReason__init_($rt_s(161), 1);
    var$1 = cgmep_PaymentReason__init_($rt_s(576), 2);
    cgmep_PaymentReason_BIRTHDAY = var$1;
    var$2 = $rt_createArray(cgmep_PaymentReason, 3);
    var$3 = var$2.data;
    var$3[0] = cgmep_PaymentReason_RENT;
    var$3[1] = cgmep_PaymentReason_DEBT_COLLECTOR;
    var$3[2] = var$1;
    cgmep_PaymentReason_$VALUES = var$2;
},
jl_ArithmeticException = $rt_classWithoutFields(jl_RuntimeException),
jt_DateTimeException = $rt_classWithoutFields(jl_RuntimeException),
jl_CloneNotSupportedException = $rt_classWithoutFields(jl_Exception),
jt_ZoneRegion = $rt_classWithoutFields(jt_ZoneId),
jl_AssertionError = $rt_classWithoutFields(jl_Error),
jt_ZoneId$1 = $rt_classWithoutFields();
function jusi_WrappingStreamImpl() {
    jusi_SimpleStreamImpl.call(this);
    this.$sourceStream0 = null;
}
let jusi_WrappingStreamImpl__init_ = ($this, $sourceStream) => {
    $this.$sourceStream0 = $sourceStream;
},
jusi_WrappingStreamImpl_next = ($this, $consumer) => {
    return $this.$sourceStream0.$next1($this.$wrap($consumer));
},
jusi_WrappingStreamImpl_estimateSize = $this => {
    return $this.$sourceStream0.$estimateSize();
},
jusi_DistinctStreamImpl = $rt_classWithoutFields(jusi_WrappingStreamImpl),
jusi_DistinctStreamImpl__init_ = ($this, $innerStream) => {
    jusi_WrappingStreamImpl__init_($this, $innerStream);
},
jusi_DistinctStreamImpl__init_0 = var_0 => {
    let var_1 = new jusi_DistinctStreamImpl();
    jusi_DistinctStreamImpl__init_(var_1, var_0);
    return var_1;
},
jusi_DistinctStreamImpl_wrap = ($this, $consumer) => {
    let $visited, var$3;
    $visited = ju_HashSet__init_(ju_HashMap__init_());
    var$3 = new jusi_DistinctStreamImpl$wrap$lambda$_1_0;
    var$3.$_03 = $visited;
    var$3.$_11 = $consumer;
    return var$3;
};
function jusi_AnyMatchConsumer() {
    let a = this; jl_Object.call(a);
    a.$matched = 0;
    a.$predicate = null;
}
let jusi_AnyMatchConsumer_test = ($this, $t) => {
    let var$2;
    var$2 = $this.$predicate.$test($t);
    $this.$matched = var$2;
    return var$2 ? 0 : 1;
};
function ju_LinkedHashMapIterator() {
    let a = this; jl_Object.call(a);
    a.$base = null;
    a.$reversed1 = 0;
    a.$expectedModCount0 = 0;
    a.$futureEntry0 = null;
    a.$currentEntry0 = null;
}
let ju_LinkedHashMapIterator__init_ = ($this, $base, $reversed) => {
    $this.$base = $base;
    $this.$reversed1 = $reversed;
    $this.$expectedModCount0 = $base.$modCount0;
    $this.$futureEntry0 = !$reversed ? $base.$head : $base.$tail0;
},
ju_LinkedHashMapIterator__init_0 = (var_0, var_1) => {
    let var_2 = new ju_LinkedHashMapIterator();
    ju_LinkedHashMapIterator__init_(var_2, var_0, var_1);
    return var_2;
},
ju_LinkedHashMapIterator_hasNext = $this => {
    return $this.$futureEntry0 === null ? 0 : 1;
},
ju_LinkedHashMapIterator_makeNext = $this => {
    let var$1;
    if ($this.$expectedModCount0 == $this.$base.$modCount0) {
        if (ju_LinkedHashMapIterator_hasNext($this)) {
            var$1 = $this.$futureEntry0;
            $this.$currentEntry0 = var$1;
            $this.$futureEntry0 = !$this.$reversed1 ? var$1.$chainForward : var$1.$chainBackward;
            return;
        }
        var$1 = new ju_NoSuchElementException;
        jl_Throwable__init_0(var$1);
        $rt_throw(var$1);
    }
    var$1 = new ju_ConcurrentModificationException;
    jl_Throwable__init_0(var$1);
    $rt_throw(var$1);
},
ju_LinkedHashMapIterator$EntryIterator = $rt_classWithoutFields(ju_LinkedHashMapIterator),
ju_LinkedHashMapIterator$EntryIterator_next = $this => {
    ju_LinkedHashMapIterator_makeNext($this);
    return $this.$currentEntry0;
},
jur_BackReferencedSingleSet = $rt_classWithoutFields(jur_SingleSet),
jur_BackReferencedSingleSet_find = ($this, $startSearch, $testString, $matchResult) => {
    let $res, $lastIndex, $saveStart;
    $res = 0;
    $lastIndex = $matchResult.$rightBound;
    a: {
        b: {
            while (true) {
                if ($startSearch > $lastIndex)
                    break b;
                $saveStart = jur_MatchResultImpl_getStart($matchResult, $this.$groupIndex);
                jur_MatchResultImpl_setStart($matchResult, $this.$groupIndex, $startSearch);
                $res = $this.$kid.$matches($startSearch, $testString, $matchResult);
                if ($res >= 0)
                    break;
                jur_MatchResultImpl_setStart($matchResult, $this.$groupIndex, $saveStart);
                $startSearch = $startSearch + 1 | 0;
            }
            break a;
        }
        $startSearch = $res;
    }
    return $startSearch;
},
jur_BackReferencedSingleSet_findBack = ($this, $stringIndex, $startSearch, $testString, $matchResult) => {
    let $res, $saveStart;
    $res = 0;
    a: {
        b: {
            while (true) {
                if ($startSearch < $stringIndex)
                    break b;
                $saveStart = jur_MatchResultImpl_getStart($matchResult, $this.$groupIndex);
                jur_MatchResultImpl_setStart($matchResult, $this.$groupIndex, $startSearch);
                $res = $this.$kid.$matches($startSearch, $testString, $matchResult);
                if ($res >= 0)
                    break;
                jur_MatchResultImpl_setStart($matchResult, $this.$groupIndex, $saveStart);
                $startSearch = $startSearch + (-1) | 0;
            }
            break a;
        }
        $startSearch = $res;
    }
    return $startSearch;
},
jur_BackReferencedSingleSet_processBackRefReplacement = $this => {
    return null;
};
function cgme_EventBus$publish$lambda$_3_0() {
    jl_Object.call(this);
    this.$_029 = null;
}
let cgme_EventBus$publish$lambda$_3_0_accept = (var$0, var$1) => {
    var$1.$onEvent(var$0.$_029);
},
cgmep_PaymentService$processPayment$lambda$_1_0 = $rt_classWithoutFields(),
cgmep_PaymentService$processPayment$lambda$_1_0_applyAsInt = (var$0, var$1) => {
    return var$1.$value;
},
ju_Spliterator = $rt_classWithoutFields(0);
function jusi_SpliteratorOverCollection() {
    let a = this; jl_Object.call(a);
    a.$collection = null;
    a.$iterator0 = null;
}
function jur_AbstractCharClass$LazyJavaLowerCase$1() {
    jur_AbstractCharClass.call(this);
    this.$this$040 = null;
}
let jur_AbstractCharClass$LazyJavaLowerCase$1_contains = ($this, $ch) => {
    jl_Character_$callClinit();
    return jl_Character_getType($ch) != 2 ? 0 : 1;
};
function jur_AbstractCharClass$LazyJavaUpperCase$1() {
    jur_AbstractCharClass.call(this);
    this.$this$015 = null;
}
let jur_AbstractCharClass$LazyJavaUpperCase$1_contains = ($this, $ch) => {
    jl_Character_$callClinit();
    return jl_Character_getType($ch) != 1 ? 0 : 1;
};
function jur_AbstractCharClass$LazyJavaWhitespace$1() {
    jur_AbstractCharClass.call(this);
    this.$this$032 = null;
}
let jur_AbstractCharClass$LazyJavaWhitespace$1_contains = ($this, $ch) => {
    return jl_Character_isWhitespace($ch);
};
function jur_AbstractCharClass$LazyJavaMirrored$1() {
    jur_AbstractCharClass.call(this);
    this.$this$027 = null;
}
let jur_AbstractCharClass$LazyJavaMirrored$1_contains = ($this, $ch) => {
    return 0;
};
function jur_AbstractCharClass$LazyJavaDefined$1() {
    jur_AbstractCharClass.call(this);
    this.$this$030 = null;
}
let jur_AbstractCharClass$LazyJavaDefined$1_contains = ($this, $ch) => {
    jl_Character_$callClinit();
    return !jl_Character_getType($ch) ? 0 : 1;
};
function jur_AbstractCharClass$LazyJavaDigit$1() {
    jur_AbstractCharClass.call(this);
    this.$this$018 = null;
}
let jur_AbstractCharClass$LazyJavaDigit$1_contains = ($this, $ch) => {
    jl_Character_$callClinit();
    return jl_Character_getType($ch) != 9 ? 0 : 1;
};
function jur_AbstractCharClass$LazyJavaIdentifierIgnorable$1() {
    jur_AbstractCharClass.call(this);
    this.$this$035 = null;
}
let jur_AbstractCharClass$LazyJavaIdentifierIgnorable$1_contains = ($this, $ch) => {
    return jl_Character_isIdentifierIgnorable($ch);
};
function jur_AbstractCharClass$LazyJavaISOControl$1() {
    jur_AbstractCharClass.call(this);
    this.$this$041 = null;
}
let jur_AbstractCharClass$LazyJavaISOControl$1_contains = ($this, $ch) => {
    a: {
        b: {
            jl_Character_$callClinit();
            if (!($ch >= 0 && $ch <= 31)) {
                if ($ch < 127)
                    break b;
                if ($ch > 159)
                    break b;
            }
            $ch = 1;
            break a;
        }
        $ch = 0;
    }
    return $ch;
};
function jur_AbstractCharClass$LazyJavaJavaIdentifierPart$1() {
    jur_AbstractCharClass.call(this);
    this.$this$012 = null;
}
let jur_AbstractCharClass$LazyJavaJavaIdentifierPart$1_contains = ($this, $ch) => {
    a: {
        b: {
            jl_Character_$callClinit();
            switch (jl_Character_getType($ch)) {
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                case 6:
                case 8:
                case 9:
                case 10:
                case 23:
                case 26:
                    break;
                case 7:
                case 11:
                case 12:
                case 13:
                case 14:
                case 15:
                case 16:
                case 17:
                case 18:
                case 19:
                case 20:
                case 21:
                case 22:
                case 24:
                case 25:
                    break b;
                default:
                    break b;
            }
            $ch = 1;
            break a;
        }
        $ch = jl_Character_isIdentifierIgnorable($ch);
    }
    return $ch;
};
function jur_AbstractCharClass$LazyJavaJavaIdentifierStart$1() {
    jur_AbstractCharClass.call(this);
    this.$this$019 = null;
}
let jur_AbstractCharClass$LazyJavaJavaIdentifierStart$1_contains = ($this, $ch) => {
    a: {
        b: {
            jl_Character_$callClinit();
            switch (jl_Character_getType($ch)) {
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                case 10:
                case 23:
                case 26:
                    break;
                case 6:
                case 7:
                case 8:
                case 9:
                case 11:
                case 12:
                case 13:
                case 14:
                case 15:
                case 16:
                case 17:
                case 18:
                case 19:
                case 20:
                case 21:
                case 22:
                case 24:
                case 25:
                    break b;
                default:
                    break b;
            }
            $ch = 1;
            break a;
        }
        $ch = jl_Character_isIdentifierIgnorable($ch);
    }
    return $ch;
};
function jur_AbstractCharClass$LazyJavaLetter$1() {
    jur_AbstractCharClass.call(this);
    this.$this$029 = null;
}
let jur_AbstractCharClass$LazyJavaLetter$1_contains = ($this, $ch) => {
    a: {
        b: {
            jl_Character_$callClinit();
            switch (jl_Character_getType($ch)) {
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                    break;
                default:
                    break b;
            }
            $ch = 1;
            break a;
        }
        $ch = 0;
    }
    return $ch;
};
function jur_AbstractCharClass$LazyJavaLetterOrDigit$1() {
    jur_AbstractCharClass.call(this);
    this.$this$033 = null;
}
let jur_AbstractCharClass$LazyJavaLetterOrDigit$1_contains = ($this, $ch) => {
    return jl_Character_isLetterOrDigit($ch);
};
function jur_AbstractCharClass$LazyJavaSpaceChar$1() {
    jur_AbstractCharClass.call(this);
    this.$this$034 = null;
}
let jur_AbstractCharClass$LazyJavaSpaceChar$1_contains = ($this, $ch) => {
    return jl_Character_isSpaceChar($ch);
};
function jur_AbstractCharClass$LazyJavaTitleCase$1() {
    jur_AbstractCharClass.call(this);
    this.$this$020 = null;
}
let jur_AbstractCharClass$LazyJavaTitleCase$1_contains = ($this, $ch) => {
    jl_Character_$callClinit();
    return jl_Character_getType($ch) != 3 ? 0 : 1;
};
function jur_AbstractCharClass$LazyJavaUnicodeIdentifierPart$1() {
    jur_AbstractCharClass.call(this);
    this.$this$014 = null;
}
let jur_AbstractCharClass$LazyJavaUnicodeIdentifierPart$1_contains = ($this, $ch) => {
    a: {
        b: {
            jl_Character_$callClinit();
            switch (jl_Character_getType($ch)) {
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                case 6:
                case 8:
                case 9:
                case 10:
                case 23:
                    break;
                case 7:
                case 11:
                case 12:
                case 13:
                case 14:
                case 15:
                case 16:
                case 17:
                case 18:
                case 19:
                case 20:
                case 21:
                case 22:
                    break b;
                default:
                    break b;
            }
            $ch = 1;
            break a;
        }
        $ch = jl_Character_isIdentifierIgnorable($ch);
    }
    return $ch;
};
function jur_AbstractCharClass$LazyJavaUnicodeIdentifierStart$1() {
    jur_AbstractCharClass.call(this);
    this.$this$039 = null;
}
let jur_AbstractCharClass$LazyJavaUnicodeIdentifierStart$1_contains = ($this, $ch) => {
    a: {
        b: {
            jl_Character_$callClinit();
            switch (jl_Character_getType($ch)) {
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                case 10:
                    break;
                case 6:
                case 7:
                case 8:
                case 9:
                    break b;
                default:
                    break b;
            }
            $ch = 1;
            break a;
        }
        $ch = jl_Character_isIdentifierIgnorable($ch);
    }
    return $ch;
};
function jur_UnicodeCategory() {
    jur_AbstractCharClass.call(this);
    this.$category = 0;
}
let jur_UnicodeCategory__init_ = ($this, $category) => {
    jur_AbstractCharClass__init_($this);
    $this.$category = $category;
},
jur_UnicodeCategory__init_0 = var_0 => {
    let var_1 = new jur_UnicodeCategory();
    jur_UnicodeCategory__init_(var_1, var_0);
    return var_1;
},
jur_UnicodeCategory_contains = ($this, $ch) => {
    return $this.$alt ^ ($this.$category != jl_Character_getType0($ch & 65535) ? 0 : 1);
},
jur_UnicodeCategoryScope = $rt_classWithoutFields(jur_UnicodeCategory),
jur_UnicodeCategoryScope_contains = ($this, $ch) => {
    return $this.$alt ^ (!($this.$category >> jl_Character_getType0($ch & 65535) & 1) ? 0 : 1);
},
cgmc_GameCommand = $rt_classWithoutFields(0),
cgmc_GameController$stepBotTurn$lambda$_7_0 = $rt_classWithoutFields(),
cgmc_GameController$stepBotTurn$lambda$_7_0__init_ = var$0 => {
    return;
},
cgmc_GameController$stepBotTurn$lambda$_7_0__init_0 = () => {
    let var_0 = new cgmc_GameController$stepBotTurn$lambda$_7_0();
    cgmc_GameController$stepBotTurn$lambda$_7_0__init_(var_0);
    return var_0;
},
cgmc_GameController$stepBotTurn$lambda$_7_0_apply = (var$0, var$1) => {
    return jl_Class_getSimpleName(jl_Object_getClass(var$1));
},
cgmc_GameController$stepBotTurn$lambda$_7_1 = $rt_classWithoutFields(),
cgmc_GameController$stepBotTurn$lambda$_7_1__init_ = var$0 => {
    return;
},
cgmc_GameController$stepBotTurn$lambda$_7_1__init_0 = () => {
    let var_0 = new cgmc_GameController$stepBotTurn$lambda$_7_1();
    cgmc_GameController$stepBotTurn$lambda$_7_1__init_(var_0);
    return var_0;
},
cgmc_GameController$stepBotTurn$lambda$_7_1_applyAsInt = (var$0, var$1) => {
    return var$1.$value;
};
function jusi_MappingStreamImpl() {
    jusi_WrappingStreamImpl.call(this);
    this.$mapper0 = null;
}
let jusi_MappingStreamImpl_wrap = ($this, $consumer) => {
    let var$2;
    var$2 = new jusi_MappingStreamImpl$wrap$lambda$_1_0;
    var$2.$_038 = $this;
    var$2.$_111 = $consumer;
    return var$2;
},
ju_ConcurrentModificationException = $rt_classWithoutFields(jl_RuntimeException);
function ju_HashSet() {
    ju_AbstractSet.call(this);
    this.$backingMap = null;
}
let ju_HashSet__init_0 = ($this, $backingMap) => {
    $this.$backingMap = $backingMap;
},
ju_HashSet__init_ = var_0 => {
    let var_1 = new ju_HashSet();
    ju_HashSet__init_0(var_1, var_0);
    return var_1;
},
ju_HashSet_add = ($this, $object) => {
    return $this.$backingMap.$put($object, $this) !== null ? 0 : 1;
},
ju_HashSet_contains = ($this, $object) => {
    return ju_HashMap_containsKey($this.$backingMap, $object);
},
ju_HashSet_iterator = $this => {
    return ($this.$backingMap.$keySet()).$iterator();
},
ju_HashSet_size = $this => {
    return $this.$backingMap.$elementCount;
},
ju_LinkedHashSet = $rt_classWithoutFields(ju_HashSet),
cgmep_PaymentService$validateSelection$lambda$_3_0 = $rt_classWithoutFields(),
cgmep_PaymentService$validateSelection$lambda$_3_0_applyAsInt = (var$0, var$1) => {
    return var$1.$value;
},
cgmmc_Bank = $rt_classWithoutFields(cgmmc_AbstractCardCollection),
cgmmc_Bank_add = ($this, $card) => {
    let var$2, var$3;
    if (!$card.$canBeBanked()) {
        var$2 = new cgme_InvalidMoveException;
        var$3 = $card.$name0;
        $card = new jl_StringBuilder;
        jl_AbstractStringBuilder__init_($card);
        jl_StringBuilder_append(jl_StringBuilder_append($card, $rt_s(577)), var$3);
        jl_Throwable__init_(var$2, jl_AbstractStringBuilder_toString($card));
        $rt_throw(var$2);
    }
    cgmmc_AbstractCardCollection_add($this, $card);
},
cgmmc_DiscardPile = $rt_classWithoutFields(cgmmc_AbstractCardCollection);
function ju_UUID() {
    jl_Object.call(this);
    this.$value4 = null;
}
let ju_UUID__init_0 = ($this, $value) => {
    $this.$value4 = $value;
},
ju_UUID__init_ = var_0 => {
    let var_1 = new ju_UUID();
    ju_UUID__init_0(var_1, var_0);
    return var_1;
},
ju_UUID_equals = ($this, $o) => {
    let $other;
    if ($o instanceof ju_UUID) {
        $other = $o;
        return jl_String_equals($this.$value4, $other.$value4);
    }
    return 0;
},
ju_UUID_randomUUID = () => {
    let var$1, var$2, $value, var$4, var$5, var$6, var$7, var$8, var$9;
    if (!(crypto != null ? 1 : 0)) {
        var$1 = ju_UUID_s4();
        var$2 = ju_UUID_s4();
        $value = ju_UUID_s4();
        var$4 = ju_UUID_s4();
        var$5 = ju_UUID_s4();
        var$6 = ju_UUID_s4();
        var$7 = ju_UUID_s4();
        var$8 = ju_UUID_s4();
        var$9 = new jl_StringBuilder;
        jl_AbstractStringBuilder__init_(var$9);
        var$2 = jl_StringBuilder_append(jl_StringBuilder_append(var$9, var$1), var$2);
        jl_AbstractStringBuilder_append(var$2, 45);
        var$2 = jl_StringBuilder_append(var$2, $value);
        jl_AbstractStringBuilder_append(var$2, 45);
        var$2 = jl_StringBuilder_append(var$2, var$4);
        jl_AbstractStringBuilder_append(var$2, 45);
        var$2 = jl_StringBuilder_append(var$2, var$5);
        jl_AbstractStringBuilder_append(var$2, 45);
        jl_StringBuilder_append(jl_StringBuilder_append(jl_StringBuilder_append(var$2, var$6), var$7), var$8);
        return ju_UUID__init_(jl_AbstractStringBuilder_toString(var$9));
    }
    return ju_UUID__init_($rt_str(crypto.randomUUID()));
},
ju_UUID_s4 = () => {
    return jl_String_substring0(jl_Integer_toString0(jl_Math_floor((1.0 + jl_Math_random()) * 65536.0) | 0, 16), 1);
},
cgmmc_Hand = $rt_classWithoutFields(cgmmc_AbstractCardCollection);
function cgmmc_PropertyCard() {
    cgmmc_Card.call(this);
    this.$color0 = null;
}
let cgmmc_PropertyCard_canBeBanked = $this => {
    return 0;
},
cgmmc_MoneyCard = $rt_classWithoutFields(cgmmc_Card),
cgmmc_MoneyCard_VALID_VALUES = null,
cgmmc_MoneyCard_$callClinit = () => {
    cgmmc_MoneyCard_$callClinit = $rt_eraseClinit(cgmmc_MoneyCard);
    cgmmc_MoneyCard__clinit_();
},
cgmmc_MoneyCard__init_0 = ($this, $value) => {
    let var$2, var$3, var$4;
    cgmmc_MoneyCard_$callClinit();
    var$2 = new jl_StringBuilder;
    jl_AbstractStringBuilder__init_(var$2);
    jl_AbstractStringBuilder_append(jl_StringBuilder_append0(var$2, $value), 77);
    var$3 = jl_AbstractStringBuilder_toString(var$2);
    var$2 = cgmmc_MoneyCard_VALID_VALUES;
    var$4 = jl_Integer_valueOf($value);
    if (!ju_TemplateCollections$NElementSet_contains(var$2, var$4)) {
        var$2 = new jl_IllegalArgumentException;
        var$4 = new jl_StringBuilder;
        jl_AbstractStringBuilder__init_(var$4);
        jl_StringBuilder_append0(jl_StringBuilder_append(var$4, $rt_s(578)), $value);
        jl_Throwable__init_(var$2, jl_AbstractStringBuilder_toString(var$4));
        $rt_throw(var$2);
    }
    cgmmc_CardType_$callClinit();
    cgmmc_Card__init_($this, var$3, $value, cgmmc_CardType_MONEY, $rt_s(579));
},
cgmmc_MoneyCard__init_ = var_0 => {
    let var_1 = new cgmmc_MoneyCard();
    cgmmc_MoneyCard__init_0(var_1, var_0);
    return var_1;
},
cgmmc_MoneyCard_canBeBanked = $this => {
    return 1;
},
cgmmc_MoneyCard__clinit_ = () => {
    let var$1, var$2, var$3, var$4, var$5, var$6, var$7, var$8, var$9, var$10, var$11, var$12, var$13, var$14;
    var$1 = jl_Integer_valueOf(1);
    var$2 = jl_Integer_valueOf(2);
    var$3 = jl_Integer_valueOf(3);
    var$4 = jl_Integer_valueOf(4);
    var$5 = jl_Integer_valueOf(5);
    var$6 = jl_Integer_valueOf(10);
    var$7 = new ju_TemplateCollections$NElementSet;
    var$8 = $rt_createArray(jl_Object, 6);
    var$9 = var$8.data;
    var$9[0] = var$1;
    var$9[1] = var$2;
    var$9[2] = var$3;
    var$9[3] = var$4;
    var$9[4] = var$5;
    var$9[5] = var$6;
    var$8 = var$8.$clone0();
    ju_Arrays_fill2(var$8, null);
    var$10 = var$9.length;
    var$11 = 0;
    while (var$11 < var$10) {
        var$1 = var$9[var$11];
        ju_Objects_requireNonNull(var$1);
        var$12 = jl_Math_abs(var$1.$hashCode()) % var$10 | 0;
        var$13 = 0;
        var$14 = var$12;
        a: {
            b: {
                while (var$14 < var$10) {
                    var$2 = var$8.data[var$14];
                    if (var$2 === null)
                        break b;
                    if (var$2.$equals(var$1)) {
                        var$1 = new jl_IllegalArgumentException;
                        jl_Throwable__init_0(var$1);
                        $rt_throw(var$1);
                    }
                    var$14 = var$14 + 1 | 0;
                }
                break a;
            }
            var$13 = 1;
        }
        c: {
            if (!var$13) {
                var$14 = 0;
                d: {
                    while (var$14 < var$12) {
                        var$2 = var$8.data[var$14];
                        if (var$2 === null)
                            break d;
                        if (var$2.$equals(var$1)) {
                            var$1 = new jl_IllegalArgumentException;
                            jl_Throwable__init_0(var$1);
                            $rt_throw(var$1);
                        }
                        var$14 = var$14 + 1 | 0;
                    }
                    break c;
                }
            }
        }
        var$8.data[var$14] = var$1;
        var$11 = var$11 + 1 | 0;
    }
    var$7.$data0 = var$8;
    cgmmc_MoneyCard_VALID_VALUES = var$7;
},
jur_IntArrHash = $rt_classWithoutFields();
function w_DealBrowser$lambda$promptCardSelection$37$lambda$_37_0() {
    jl_Object.call(this);
    this.$_057 = null;
}
let w_DealBrowser$lambda$promptCardSelection$37$lambda$_37_0_apply = (var$0, var$1) => {
    let var$2;
    var$1 = var$1;
    var$2 = var$0.$_057;
    w_DealBrowser_$callClinit();
    return w_DealBrowser_find(var$2, var$1);
},
otj_JSObject = $rt_classWithoutFields(0),
otjc_Crypto = $rt_classWithoutFields();
function w_DealBrowser$lambda$settlePayments$26$lambda$_48_0() {
    jl_Object.call(this);
    this.$_027 = null;
}
let w_DealBrowser$lambda$settlePayments$26$lambda$_48_0_apply = (var$0, var$1) => {
    let var$2;
    var$1 = var$1;
    var$2 = var$0.$_027;
    w_DealBrowser_$callClinit();
    return w_DealBrowser_find(var$2, var$1);
};
function cgmcf_CardPlayFlowService$playWildcard$lambda$_4_0() {
    let a = this; jl_Object.call(a);
    a.$_012 = null;
    a.$_14 = null;
    a.$_22 = null;
    a.$_32 = null;
}
let cgmcf_CardPlayFlowService$playWildcard$lambda$_4_0_accept = (var$0, var$1) => {
    var$1 = var$1;
    cgmcf_CardPlayFlowService_playCard(var$0.$_012, var$0.$_14, var$0.$_22, cgmc_GameController$PlayCardRequest_withChosenColor(var$0.$_32, var$1));
};
function cgmcf_CardPlayFlowService$playBuilding$lambda$_5_0() {
    jl_Object.call(this);
    this.$_024 = null;
}
let cgmcf_CardPlayFlowService$playBuilding$lambda$_5_0_test = (var$0, var$1) => {
    return cgmmc_PropertySet_canAttach(var$1, var$0.$_024.$buildingType);
},
cgmcf_CardPlayFlowService$playBuilding$lambda$_5_1 = $rt_classWithoutFields(),
cgmcf_CardPlayFlowService$playBuilding$lambda$_5_1_apply = (var$0, var$1) => {
    return var$1.$color;
};
function cgmcf_CardPlayFlowService$playBuilding$lambda$_5_2() {
    let a = this; jl_Object.call(a);
    a.$_069 = null;
    a.$_124 = null;
    a.$_210 = null;
    a.$_37 = null;
}
let cgmcf_CardPlayFlowService$playBuilding$lambda$_5_2__init_ = (var$0, var$1, var$2, var$3, var$4) => {
    var$0.$_069 = var$1;
    var$0.$_124 = var$2;
    var$0.$_210 = var$3;
    var$0.$_37 = var$4;
},
cgmcf_CardPlayFlowService$playBuilding$lambda$_5_2__init_0 = (var_0, var_1, var_2, var_3) => {
    let var_4 = new cgmcf_CardPlayFlowService$playBuilding$lambda$_5_2();
    cgmcf_CardPlayFlowService$playBuilding$lambda$_5_2__init_(var_4, var_0, var_1, var_2, var_3);
    return var_4;
},
cgmcf_CardPlayFlowService$playBuilding$lambda$_5_2_accept = (var$0, var$1) => {
    var$1 = var$1;
    cgmcf_CardPlayFlowService_playCard(var$0.$_069, var$0.$_124, var$0.$_210, cgmc_GameController$PlayCardRequest_withChosenColor(var$0.$_37, var$1));
};
function cgmea_ActionContext() {
    let a = this; jl_Record.call(a);
    a.$game2 = null;
    a.$actor = null;
    a.$card = null;
    a.$targetPlayer0 = null;
    a.$selectedCards1 = null;
    a.$chosenColor1 = null;
    a.$doubleRentCount1 = 0;
}
let cgmea_ActionContext__init_ = ($this, $game, $actor, $card, $targetPlayer, $selectedCards, $chosenColor, $doubleRentCount) => {
    $selectedCards = $selectedCards !== null ? ju_List_copyOf($selectedCards) : ju_List_of();
    if ($doubleRentCount >= 0 && $doubleRentCount <= 2) {
        $this.$game2 = $game;
        $this.$actor = $actor;
        $this.$card = $card;
        $this.$targetPlayer0 = $targetPlayer;
        $this.$selectedCards1 = $selectedCards;
        $this.$chosenColor1 = $chosenColor;
        $this.$doubleRentCount1 = $doubleRentCount;
        return;
    }
    $actor = new jl_IllegalArgumentException;
    jl_Throwable__init_($actor, $rt_s(474));
    $rt_throw($actor);
},
cgmea_ActionContext__init_0 = (var_0, var_1, var_2, var_3, var_4, var_5, var_6) => {
    let var_7 = new cgmea_ActionContext();
    cgmea_ActionContext__init_(var_7, var_0, var_1, var_2, var_3, var_4, var_5, var_6);
    return var_7;
};
function cgmea_ActionResult() {
    let a = this; jl_Record.call(a);
    a.$message1 = null;
    a.$paymentRequests0 = null;
    a.$cancelled0 = 0;
}
let cgmea_ActionResult__init_0 = ($this, $message, $paymentRequests, $cancelled) => {
    $this.$message1 = $message;
    $this.$paymentRequests0 = $paymentRequests;
    $this.$cancelled0 = $cancelled;
},
cgmea_ActionResult__init_ = (var_0, var_1, var_2) => {
    let var_3 = new cgmea_ActionResult();
    cgmea_ActionResult__init_0(var_3, var_0, var_1, var_2);
    return var_3;
},
cgmea_ActionResult_message = $m => {
    return cgmea_ActionResult__init_($m, ju_List_of(), 0);
},
cgmea_ActionResult_withPayments = ($m, $p) => {
    return cgmea_ActionResult__init_($m, ju_List_copyOf($p), 0);
},
cgmea_ActionResult_cancelled = $m => {
    return cgmea_ActionResult__init_($m, ju_List_of(), 1);
},
cgmea_ActionResult_message0 = $this => {
    return $this.$message1;
},
cgmea_ActionResult_paymentRequests = $this => {
    return $this.$paymentRequests0;
};
function cgmcf_CardPlayFlowService$playActionCard$lambda$_6_0() {
    jl_Object.call(this);
    this.$_019 = null;
}
let cgmcf_CardPlayFlowService$playActionCard$lambda$_6_0__init_ = (var$0, var$1) => {
    var$0.$_019 = var$1;
},
cgmcf_CardPlayFlowService$playActionCard$lambda$_6_0__init_0 = var_0 => {
    let var_1 = new cgmcf_CardPlayFlowService$playActionCard$lambda$_6_0();
    cgmcf_CardPlayFlowService$playActionCard$lambda$_6_0__init_(var_1, var_0);
    return var_1;
},
cgmcf_CardPlayFlowService$playActionCard$lambda$_6_0_accept = (var$0, var$1) => {
    var$1 = var$1;
    ju_ArrayDeque_addLast(var$0.$_019.$payments, var$1);
},
cgmcf_CardPlayFlowService$1 = $rt_classWithoutFields(),
cgmcf_CardPlayFlowService$1_$SwitchMap$com$group4$monopolydeal$model$card$ActionType = null,
cgmcf_CardPlayFlowService$1_$callClinit = () => {
    cgmcf_CardPlayFlowService$1_$callClinit = $rt_eraseClinit(cgmcf_CardPlayFlowService$1);
    cgmcf_CardPlayFlowService$1__clinit_();
},
cgmcf_CardPlayFlowService$1__clinit_ = () => {
    let var$1, var$2;
    var$1 = $rt_createIntArray((cgmmc_ActionType_values()).data.length);
    var$2 = var$1.data;
    cgmcf_CardPlayFlowService$1_$SwitchMap$com$group4$monopolydeal$model$card$ActionType = var$1;
    var$2[cgmmc_ActionType_PASS_GO.$ordinal] = 1;
    var$2[cgmmc_ActionType_ITS_MY_BIRTHDAY.$ordinal] = 2;
    var$2[cgmmc_ActionType_DEBT_COLLECTOR.$ordinal] = 3;
    var$2[cgmmc_ActionType_SLY_DEAL.$ordinal] = 4;
    var$2[cgmmc_ActionType_FORCED_DEAL.$ordinal] = 5;
    var$2[cgmmc_ActionType_DEAL_BREAKER.$ordinal] = 6;
    var$2[cgmmc_ActionType_RENT.$ordinal] = 7;
    var$2[cgmmc_ActionType_MULTI_COLOUR_RENT.$ordinal] = 8;
};
function cgmcf_CardPlayFlowService$resolveDoubleRentCards$lambda$_10_0() {
    jl_Object.call(this);
    this.$_015 = null;
}
let cgmcf_CardPlayFlowService$resolveDoubleRentCards$lambda$_10_0__init_0 = (var$0, var$1) => {
    var$0.$_015 = var$1;
},
cgmcf_CardPlayFlowService$resolveDoubleRentCards$lambda$_10_0__init_ = var_0 => {
    let var_1 = new cgmcf_CardPlayFlowService$resolveDoubleRentCards$lambda$_10_0();
    cgmcf_CardPlayFlowService$resolveDoubleRentCards$lambda$_10_0__init_0(var_1, var_0);
    return var_1;
},
cgmcf_CardPlayFlowService$resolveDoubleRentCards$lambda$_10_0_test = (var$0, var$1) => {
    var$1 = var$1;
    return jl_Class_isInstance(var$0.$_015, var$1);
};
function cgmcf_CardPlayFlowService$resolveDoubleRentCards$lambda$_10_1() {
    jl_Object.call(this);
    this.$_074 = null;
}
let cgmcf_CardPlayFlowService$resolveDoubleRentCards$lambda$_10_1__init_ = (var$0, var$1) => {
    var$0.$_074 = var$1;
},
cgmcf_CardPlayFlowService$resolveDoubleRentCards$lambda$_10_1__init_0 = var_0 => {
    let var_1 = new cgmcf_CardPlayFlowService$resolveDoubleRentCards$lambda$_10_1();
    cgmcf_CardPlayFlowService$resolveDoubleRentCards$lambda$_10_1__init_(var_1, var_0);
    return var_1;
},
cgmcf_CardPlayFlowService$resolveDoubleRentCards$lambda$_10_1_apply = (var$0, var$1) => {
    var$1 = var$1;
    return jl_Class_cast(var$0.$_074, var$1);
};
function cgmcf_CardPlayFlowService$resolveDoubleRentCards$lambda$_10_2() {
    jl_Object.call(this);
    this.$_018 = null;
}
let cgmcf_CardPlayFlowService$resolveDoubleRentCards$lambda$_10_2__init_0 = (var$0, var$1) => {
    var$0.$_018 = var$1;
},
cgmcf_CardPlayFlowService$resolveDoubleRentCards$lambda$_10_2__init_ = var_0 => {
    let var_1 = new cgmcf_CardPlayFlowService$resolveDoubleRentCards$lambda$_10_2();
    cgmcf_CardPlayFlowService$resolveDoubleRentCards$lambda$_10_2__init_0(var_1, var_0);
    return var_1;
},
cgmcf_CardPlayFlowService$resolveDoubleRentCards$lambda$_10_2_test = (var$0, var$1) => {
    return var$1 === var$0.$_018 ? 0 : 1;
},
cgmcf_CardPlayFlowService$resolveDoubleRentCards$lambda$_10_3 = $rt_classWithoutFields(),
cgmcf_CardPlayFlowService$resolveDoubleRentCards$lambda$_10_3_test = (var$0, var$1) => {
    let var$2;
    var$2 = var$1.$actionType;
    cgmmc_ActionType_$callClinit();
    return var$2 !== cgmmc_ActionType_DOUBLE_THE_RENT ? 0 : 1;
};
function jusi_CountingConsumer() {
    jl_Object.call(this);
    this.$count0 = 0;
}
let jusi_CountingConsumer_test = ($this, $t) => {
    $this.$count0 = $this.$count0 + 1 | 0;
    return 1;
},
jus_IntStream = $rt_classWithoutFields(0),
jusi_SimpleIntStreamImpl = $rt_classWithoutFields(),
jusi_SimpleIntStreamImpl_sum = $this => {
    let $consumer, var$2, var$3, var$4;
    $consumer = new jusi_SumIntConsumer;
    var$2 = $this;
    while (true) {
        var$3 = var$2.$source;
        var$4 = new jusi_MappingToIntStreamImpl$next$lambda$_1_0;
        var$4.$_043 = var$2;
        var$4.$_114 = $consumer;
        if (!jusi_StreamOverSpliterator_next(var$3, var$4))
            break;
    }
    return $consumer.$sum0;
};
function jusi_MappingToIntStreamImpl() {
    let a = this; jusi_SimpleIntStreamImpl.call(a);
    a.$source = null;
    a.$mapper = null;
}
function cgmc_EndTurnCommand() {
    let a = this; jl_Object.call(a);
    a.$c0 = null;
    a.$p0 = null;
    a.$d = null;
}
let cgmc_EndTurnCommand__init_0 = ($this, $c, $p, $d) => {
    $this.$c0 = $c;
    $this.$p0 = $p;
    $this.$d = $d;
},
cgmc_EndTurnCommand__init_ = (var_0, var_1, var_2) => {
    let var_3 = new cgmc_EndTurnCommand();
    cgmc_EndTurnCommand__init_0(var_3, var_0, var_1, var_2);
    return var_3;
},
cgmc_EndTurnCommand_execute = $this => {
    cgmc_GameController_endTurn($this.$c0, $this.$p0, $this.$d);
};
function jusi_StreamOverSpliterator$AdapterAction() {
    let a = this; jl_Object.call(a);
    a.$consumer = null;
    a.$wantsMore = 0;
}
let w_DealBrowser$promptDiscard$lambda$_24_0 = $rt_classWithoutFields(),
w_DealBrowser$promptDiscard$lambda$_24_0_apply = (var$0, var$1) => {
    var$1 = var$1;
    w_DealBrowser_$callClinit();
    return w_DealBrowser_option(var$1, $rt_s(3));
};
function w_DealBrowser$promptDiscard$lambda$_24_1() {
    let a = this; jl_Object.call(a);
    a.$_051 = null;
    a.$_117 = null;
    a.$_26 = null;
}
let w_DealBrowser$promptDiscard$lambda$_24_1_accept = (var$0, var$1) => {
    let var$2, var$3, var$4, var$5;
    var$1 = var$1;
    var$2 = var$0.$_051;
    var$3 = var$0.$_117;
    var$4 = var$0.$_26;
    var$2 = var$2.$controller;
    var$1 = ju_Collection_stream(var$1);
    var$5 = new w_DealBrowser$lambda$promptDiscard$29$lambda$_45_0;
    var$5.$_072 = var$4;
    cgmc_GameController_endTurn(var$2, var$3, jus_Stream_toList(jusi_SimpleStreamImpl_map(var$1, var$5)));
};
function ju_Collections$9() {
    ju_AbstractList.call(this);
    this.$val$list = null;
}
let ju_Collections$9_get = ($this, $index) => {
    return ju_ArrayList_get($this.$val$list, $index);
},
ju_Collections$9_size = $this => {
    return $this.$val$list.$size0;
};
function cgma_SimpleBotStrategy$chooseDiscards$lambda$_19_0() {
    jl_Object.call(this);
    this.$_075 = null;
}
let cgma_SimpleBotStrategy$chooseDiscards$lambda$_19_0_applyAsInt = (var$0, var$1) => {
    let var$2, var$3;
    a: {
        var$1 = var$1;
        if (!(!(var$1 instanceof cgmmc_PropertyCard) && !(var$1 instanceof cgmmc_WildcardCard)))
            var$2 = 2;
        else {
            b: {
                if (var$1 instanceof cgmmc_ActionCard) {
                    var$3 = var$1.$actionType;
                    cgmmc_ActionType_$callClinit();
                    if (var$3 !== cgmmc_ActionType_PASS_GO)
                        break b;
                }
                var$2 = 0;
                break a;
            }
            var$2 = 1;
        }
    }
    return var$2;
},
cgma_SimpleBotStrategy$chooseDiscards$lambda$_19_1 = $rt_classWithoutFields(),
cgma_SimpleBotStrategy$chooseDiscards$lambda$_19_1_applyAsInt = (var$0, var$1) => {
    return var$1.$value;
},
cgma_SimpleBotStrategy$playMoney$lambda$_2_0 = $rt_classWithoutFields(),
cgma_SimpleBotStrategy$playMoney$lambda$_2_0_test = (var$0, var$1) => {
    return var$1 instanceof cgmmc_MoneyCard;
},
cgma_SimpleBotStrategy$playMoney$lambda$_2_1 = $rt_classWithoutFields(),
cgma_SimpleBotStrategy$playMoney$lambda$_2_1_applyAsInt = (var$0, var$1) => {
    return var$1.$value;
};
function cgma_SimpleBotStrategy$playMoney$lambda$_2_2() {
    let a = this; jl_Object.call(a);
    a.$_055 = null;
    a.$_119 = null;
}
let cgma_SimpleBotStrategy$playMoney$lambda$_2_2_apply = (var$0, var$1) => {
    let var$2, var$3;
    var$1 = var$1;
    var$2 = var$0.$_055;
    var$3 = var$0.$_119;
    return cgmc_PlayCardCommand__init_(var$2.$ctrl, var$3, var$1, cgmc_GameController$PlayCardRequest_toBank());
},
cgma_SimpleBotStrategy$playProperty$lambda$_4_0 = $rt_classWithoutFields(),
cgma_SimpleBotStrategy$playProperty$lambda$_4_0_test = (var$0, var$1) => {
    return var$1 instanceof cgmmc_PropertyCard;
},
cgma_SimpleBotStrategy$playProperty$lambda$_4_1 = $rt_classWithoutFields(),
cgma_SimpleBotStrategy$playProperty$lambda$_4_1_test = (var$0, var$1) => {
    return var$1 instanceof cgmmc_WildcardCard;
};
function cgmc_PlayCardCommand() {
    let a = this; jl_Object.call(a);
    a.$c = null;
    a.$p = null;
    a.$card0 = null;
    a.$r = null;
}
let cgmc_PlayCardCommand__init_0 = ($this, $c, $p, $card, $r) => {
    $this.$c = $c;
    $this.$p = $p;
    $this.$card0 = $card;
    $this.$r = $r;
},
cgmc_PlayCardCommand__init_ = (var_0, var_1, var_2, var_3) => {
    let var_4 = new cgmc_PlayCardCommand();
    cgmc_PlayCardCommand__init_0(var_4, var_0, var_1, var_2, var_3);
    return var_4;
},
cgmc_PlayCardCommand_execute = $this => {
    cgmc_GameController_playCard($this.$c, $this.$p, $this.$card0, $this.$r);
},
cgma_SimpleBotStrategy$playBuilding$lambda$_3_0 = $rt_classWithoutFields(),
cgma_SimpleBotStrategy$playBuilding$lambda$_3_0_test = (var$0, var$1) => {
    return var$1 instanceof cgmmc_BuildingCard;
},
cgma_SimpleBotStrategy$playBuilding$lambda$_3_1 = $rt_classWithoutFields(),
cgma_SimpleBotStrategy$playBuilding$lambda$_3_1_apply = (var$0, var$1) => {
    return var$1;
};
function cgma_SimpleBotStrategy$playBuilding$lambda$_3_2() {
    jl_Object.call(this);
    this.$_047 = null;
}
let cgma_SimpleBotStrategy$playBuilding$lambda$_3_2_test = (var$0, var$1) => {
    return cgmmc_PropertySet_canAttach(var$1, var$0.$_047.$buildingType);
};
function cgmmc_PropertySet() {
    let a = this; jl_Object.call(a);
    a.$color = null;
    a.$properties0 = null;
    a.$wildcards = null;
    a.$house = null;
    a.$hotel = null;
}
let cgmmc_PropertySet_getAllCards = $this => {
    let $all, var$2, var$3;
    $all = ju_ArrayList__init_();
    var$2 = $this.$properties0;
    var$3 = $all;
    ju_AbstractCollection_addAll(var$3, var$2);
    ju_AbstractCollection_addAll(var$3, $this.$wildcards);
    var$2 = $this.$house;
    if (var$2 !== null)
        ju_ArrayList_add($all, var$2);
    var$2 = $this.$hotel;
    if (var$2 !== null)
        ju_ArrayList_add($all, var$2);
    return $all;
},
cgmmc_PropertySet_propertyCount = $this => {
    return $this.$properties0.$size0 + $this.$wildcards.$size0 | 0;
},
cgmmc_PropertySet_hasRealProperty = $this => {
    return ju_AbstractCollection_isEmpty($this.$properties0) ? 0 : 1;
},
cgmmc_PropertySet_isComplete = $this => {
    return !($this.$color.$fullSetSize > 0 && cgmmc_PropertySet_hasRealProperty($this) && cgmmc_PropertySet_propertyCount($this) >= $this.$color.$fullSetSize) ? 0 : 1;
},
cgmmc_PropertySet_canAttach = ($this, $type) => {
    let var$2;
    if (cgmmc_PropertySet_isComplete($this)) {
        var$2 = $this.$color;
        cgmmc_PropertyColor_$callClinit();
        if (var$2 !== cgmmc_PropertyColor_RAILROAD && var$2 !== cgmmc_PropertyColor_UTILITY) {
            cgmmc_BuildingType_$callClinit();
            if ($type !== cgmmc_BuildingType_HOUSE) {
                if ($type === cgmmc_BuildingType_HOTEL)
                    return !($this.$house !== null && $this.$hotel === null) ? 0 : 1;
                return 0;
            }
            return $this.$house !== null ? 0 : 1;
        }
        return 0;
    }
    return 0;
},
cgmmc_PropertySet_calculateBaseRent = $this => {
    let var$1, var$2, var$3, var$4;
    a: {
        b: {
            var$1 = $this.$color;
            var$2 = cgmmc_PropertySet_propertyCount($this);
            if (var$2 > 0) {
                var$3 = var$1.$rent.data;
                var$4 = var$3.length;
                if (var$4)
                    break b;
            }
            var$2 = 0;
            break a;
        }
        var$2 = var$3[jl_Math_min(var$2, var$4) - 1 | 0];
    }
    return var$2;
},
cgmmc_PropertySet_buildingBonus = $this => {
    let $bonus;
    $bonus = 0;
    if ($this.$house !== null)
        $bonus = 3;
    if ($this.$hotel !== null)
        $bonus = $bonus + 4 | 0;
    return $bonus;
},
cgma_SimpleBotStrategy$playAction$lambda$_6_0 = $rt_classWithoutFields(),
cgma_SimpleBotStrategy$playAction$lambda$_6_0_test = (var$0, var$1) => {
    return var$1 instanceof cgmmc_ActionCard;
},
cgma_SimpleBotStrategy$playAction$lambda$_6_1 = $rt_classWithoutFields(),
cgma_SimpleBotStrategy$playAction$lambda$_6_1_apply = (var$0, var$1) => {
    return var$1;
},
cgma_SimpleBotStrategy$playAction$lambda$_6_2 = $rt_classWithoutFields(),
cgma_SimpleBotStrategy$playAction$lambda$_6_2_test = (var$0, var$1) => {
    let var$2;
    var$2 = var$1.$actionType;
    cgmmc_ActionType_$callClinit();
    return !(var$2 !== cgmmc_ActionType_JUST_SAY_NO && var$2 !== cgmmc_ActionType_DOUBLE_THE_RENT) ? 0 : 1;
};
function cgma_SimpleBotStrategy$playAction$lambda$_6_3() {
    jl_Object.call(this);
    this.$_076 = null;
}
let cgma_SimpleBotStrategy$playAction$lambda$_6_3_applyAsInt = (var$0, var$1) => {
    let var$2;
    a: {
        b: {
            c: {
                d: {
                    e: {
                        f: {
                            g: {
                                h: {
                                    var$1 = var$1;
                                    cgma_SimpleBotStrategy$1_$callClinit();
                                    switch (cgma_SimpleBotStrategy$1_$SwitchMap$com$group4$monopolydeal$model$card$ActionType.data[var$1.$actionType.$ordinal]) {
                                        case 1:
                                            break;
                                        case 2:
                                            break h;
                                        case 3:
                                            break g;
                                        case 4:
                                            break f;
                                        case 5:
                                        case 6:
                                            break e;
                                        case 7:
                                            break d;
                                        case 8:
                                            break c;
                                        default:
                                            break b;
                                    }
                                    var$2 = 1;
                                    break a;
                                }
                                var$2 = 2;
                                break a;
                            }
                            var$2 = 3;
                            break a;
                        }
                        var$2 = 4;
                        break a;
                    }
                    var$2 = 5;
                    break a;
                }
                var$2 = 6;
                break a;
            }
            var$2 = 7;
            break a;
        }
        var$2 = 10;
    }
    return var$2;
},
cgme_CardFactory$addMoneyCards$lambda$_3_0 = $rt_classWithoutFields(),
cgme_CardFactory$addMoneyCards$lambda$_3_0_get = var$0 => {
    cgme_CardFactory_$callClinit();
    return cgmmc_MoneyCard__init_(1);
},
cgme_CardFactory$addMoneyCards$lambda$_3_1 = $rt_classWithoutFields(),
cgme_CardFactory$addMoneyCards$lambda$_3_1_get = var$0 => {
    cgme_CardFactory_$callClinit();
    return cgmmc_MoneyCard__init_(2);
},
cgme_CardFactory$addMoneyCards$lambda$_3_2 = $rt_classWithoutFields(),
cgme_CardFactory$addMoneyCards$lambda$_3_2_get = var$0 => {
    cgme_CardFactory_$callClinit();
    return cgmmc_MoneyCard__init_(3);
},
cgme_CardFactory$addMoneyCards$lambda$_3_3 = $rt_classWithoutFields(),
cgme_CardFactory$addMoneyCards$lambda$_3_3_get = var$0 => {
    cgme_CardFactory_$callClinit();
    return cgmmc_MoneyCard__init_(4);
},
cgme_CardFactory$addMoneyCards$lambda$_3_4 = $rt_classWithoutFields(),
cgme_CardFactory$addMoneyCards$lambda$_3_4_get = var$0 => {
    cgme_CardFactory_$callClinit();
    return cgmmc_MoneyCard__init_(5);
},
cgme_CardFactory$addMoneyCards$lambda$_3_5 = $rt_classWithoutFields(),
cgme_CardFactory$addMoneyCards$lambda$_3_5_get = var$0 => {
    cgme_CardFactory_$callClinit();
    return cgmmc_MoneyCard__init_(10);
},
cgme_CardFactory$addWildcardCards$lambda$_5_0 = $rt_classWithoutFields(),
cgme_CardFactory$addWildcardCards$lambda$_5_0_get = var$0 => {
    let var$1;
    cgme_CardFactory_$callClinit();
    var$1 = new cgmmc_WildcardCard;
    cgmmc_PropertyColor_$callClinit();
    cgmmc_WildcardCard__init_0(var$1, $rt_s(580), 2, ju_EnumSet_of(cgmmc_PropertyColor_PINK, cgmmc_PropertyColor_ORANGE), 0);
    return var$1;
},
cgme_CardFactory$addWildcardCards$lambda$_5_1 = $rt_classWithoutFields(),
cgme_CardFactory$addWildcardCards$lambda$_5_1_get = var$0 => {
    let var$1;
    cgme_CardFactory_$callClinit();
    var$1 = new cgmmc_WildcardCard;
    cgmmc_PropertyColor_$callClinit();
    cgmmc_WildcardCard__init_0(var$1, $rt_s(581), 3, ju_EnumSet_of(cgmmc_PropertyColor_RED, cgmmc_PropertyColor_YELLOW), 0);
    return var$1;
},
cgme_CardFactory$addWildcardCards$lambda$_5_2 = $rt_classWithoutFields(),
cgme_CardFactory$addWildcardCards$lambda$_5_2_get = var$0 => {
    cgme_CardFactory_$callClinit();
    return cgmmc_WildcardCard__init_($rt_s(582), 0, cgme_CardFactory_ALL_PROPERTY_COLORS, 1);
},
cgme_CardFactory$addActionCards$lambda$_6_0 = $rt_classWithoutFields(),
cgme_CardFactory$addActionCards$lambda$_6_0_get = var$0 => {
    let var$1;
    cgme_CardFactory_$callClinit();
    var$1 = new cgmmc_ActionCard;
    cgmmc_ActionType_$callClinit();
    cgmmc_ActionCard__init_(var$1, $rt_s(583), 5, cgmmc_ActionType_DEAL_BREAKER, $rt_s(584));
    return var$1;
},
cgme_CardFactory$addActionCards$lambda$_6_1 = $rt_classWithoutFields(),
cgme_CardFactory$addActionCards$lambda$_6_1_get = var$0 => {
    let var$1;
    cgme_CardFactory_$callClinit();
    var$1 = new cgmmc_ActionCard;
    cgmmc_ActionType_$callClinit();
    cgmmc_ActionCard__init_(var$1, $rt_s(585), 3, cgmmc_ActionType_FORCED_DEAL, $rt_s(586));
    return var$1;
},
cgme_CardFactory$addActionCards$lambda$_6_2 = $rt_classWithoutFields(),
cgme_CardFactory$addActionCards$lambda$_6_2_get = var$0 => {
    let var$1;
    cgme_CardFactory_$callClinit();
    var$1 = new cgmmc_ActionCard;
    cgmmc_ActionType_$callClinit();
    cgmmc_ActionCard__init_(var$1, $rt_s(587), 3, cgmmc_ActionType_SLY_DEAL, $rt_s(588));
    return var$1;
},
cgme_CardFactory$addActionCards$lambda$_6_3 = $rt_classWithoutFields(),
cgme_CardFactory$addActionCards$lambda$_6_3_get = var$0 => {
    let var$1;
    cgme_CardFactory_$callClinit();
    var$1 = new cgmmc_ActionCard;
    cgmmc_ActionType_$callClinit();
    cgmmc_ActionCard__init_(var$1, $rt_s(589), 4, cgmmc_ActionType_JUST_SAY_NO, $rt_s(590));
    return var$1;
},
cgme_CardFactory$addActionCards$lambda$_6_4 = $rt_classWithoutFields(),
cgme_CardFactory$addActionCards$lambda$_6_4_get = var$0 => {
    let var$1;
    cgme_CardFactory_$callClinit();
    var$1 = new cgmmc_ActionCard;
    cgmmc_ActionType_$callClinit();
    cgmmc_ActionCard__init_(var$1, $rt_s(105), 3, cgmmc_ActionType_DEBT_COLLECTOR, $rt_s(591));
    return var$1;
},
cgme_CardFactory$addActionCards$lambda$_6_5 = $rt_classWithoutFields(),
cgme_CardFactory$addActionCards$lambda$_6_5_get = var$0 => {
    let var$1;
    cgme_CardFactory_$callClinit();
    var$1 = new cgmmc_ActionCard;
    cgmmc_ActionType_$callClinit();
    cgmmc_ActionCard__init_(var$1, $rt_s(106), 2, cgmmc_ActionType_ITS_MY_BIRTHDAY, $rt_s(592));
    return var$1;
},
cgme_CardFactory$addActionCards$lambda$_6_6 = $rt_classWithoutFields(),
cgme_CardFactory$addActionCards$lambda$_6_6_get = var$0 => {
    let var$1;
    cgme_CardFactory_$callClinit();
    var$1 = new cgmmc_ActionCard;
    cgmmc_ActionType_$callClinit();
    cgmmc_ActionCard__init_(var$1, $rt_s(593), 1, cgmmc_ActionType_DOUBLE_THE_RENT, $rt_s(594));
    return var$1;
},
cgme_CardFactory$addActionCards$lambda$_6_7 = $rt_classWithoutFields(),
cgme_CardFactory$addActionCards$lambda$_6_7_get = var$0 => {
    let var$1;
    cgme_CardFactory_$callClinit();
    var$1 = new cgmmc_ActionCard;
    cgmmc_ActionType_$callClinit();
    cgmmc_ActionCard__init_(var$1, $rt_s(595), 1, cgmmc_ActionType_PASS_GO, $rt_s(596));
    return var$1;
},
cgme_CardFactory$addActionCards$lambda$_6_8 = $rt_classWithoutFields(),
cgme_CardFactory$addActionCards$lambda$_6_8_get = var$0 => {
    let var$1;
    cgme_CardFactory_$callClinit();
    var$1 = new cgmmc_BuildingCard;
    cgmmc_BuildingType_$callClinit();
    cgmmc_BuildingCard__init_(var$1, cgmmc_BuildingType_HOUSE);
    return var$1;
},
cgme_CardFactory$addActionCards$lambda$_6_9 = $rt_classWithoutFields(),
cgme_CardFactory$addActionCards$lambda$_6_9_get = var$0 => {
    let var$1;
    cgme_CardFactory_$callClinit();
    var$1 = new cgmmc_BuildingCard;
    cgmmc_BuildingType_$callClinit();
    cgmmc_BuildingCard__init_(var$1, cgmmc_BuildingType_HOTEL);
    return var$1;
},
cgme_CardFactory$addRentCards$lambda$_7_0 = $rt_classWithoutFields(),
cgme_CardFactory$addRentCards$lambda$_7_0_get = var$0 => {
    let var$1;
    cgme_CardFactory_$callClinit();
    var$1 = new cgmmc_ActionCard;
    cgmmc_ActionType_$callClinit();
    cgmmc_ActionCard__init_0(var$1, $rt_s(597), 3, cgmmc_ActionType_MULTI_COLOUR_RENT, $rt_s(598), cgme_CardFactory_ALL_PROPERTY_COLORS);
    return var$1;
},
cgma_SimpleBotStrategy$pickBestWildcardColor$lambda$_5_0 = $rt_classWithoutFields(),
cgma_SimpleBotStrategy$pickBestWildcardColor$lambda$_5_0_test = (var$0, var$1) => {
    var$1 = var$1;
    cgmmc_PropertyColor_$callClinit();
    return var$1 === cgmmc_PropertyColor_ANY ? 0 : 1;
};
function cgma_SimpleBotStrategy$pickBestWildcardColor$lambda$_5_1() {
    jl_Object.call(this);
    this.$_07 = null;
}
let cgma_SimpleBotStrategy$pickBestWildcardColor$lambda$_5_1_applyAsInt = (var$0, var$1) => {
    var$1 = var$1;
    return (ju_Optional_orElse(ju_Optional_map(cgmmc_PropertyCollection_findSet(var$0.$_07.$properties, var$1), new cgma_SimpleBotStrategy$lambda$pickBestWildcardColor$9$lambda$_39_0), jl_Integer_valueOf(0))).$value1;
};
function cgma_SimpleBotStrategy$pickBestWildcardColor$lambda$_5_2() {
    jl_Object.call(this);
    this.$_030 = null;
}
let cgma_SimpleBotStrategy$pickBestWildcardColor$lambda$_5_2_applyAsInt = (var$0, var$1) => {
    var$1 = var$1;
    return (ju_Optional_orElse(ju_Optional_map(cgmmc_PropertyCollection_findSet(var$0.$_030.$properties, var$1), new cgma_SimpleBotStrategy$lambda$pickBestWildcardColor$11$lambda$_37_0), jl_Integer_valueOf(0))).$value1;
};
function cgma_SimpleBotStrategy$pickBestWildcardColor$lambda$_5_3() {
    jl_Object.call(this);
    this.$_033 = null;
}
let cgma_SimpleBotStrategy$pickBestWildcardColor$lambda$_5_3_applyAsInt = (var$0, var$1) => {
    let var$2;
    var$1 = var$1;
    var$2 = (ju_Optional_orElse(ju_Optional_map(cgmmc_PropertyCollection_findSet(var$0.$_033.$properties, var$1), new cgma_SimpleBotStrategy$lambda$pickBestWildcardColor$13$lambda$_35_0), jl_Integer_valueOf(0))).$value1;
    return  -(var$1.$fullSetSize - var$2 | 0) | 0;
},
cgma_SimpleBotStrategy$1 = $rt_classWithoutFields(),
cgma_SimpleBotStrategy$1_$SwitchMap$com$group4$monopolydeal$model$card$ActionType = null,
cgma_SimpleBotStrategy$1_$callClinit = () => {
    cgma_SimpleBotStrategy$1_$callClinit = $rt_eraseClinit(cgma_SimpleBotStrategy$1);
    cgma_SimpleBotStrategy$1__clinit_();
},
cgma_SimpleBotStrategy$1__clinit_ = () => {
    let var$1, var$2;
    var$1 = $rt_createIntArray((cgmmc_ActionType_values()).data.length);
    var$2 = var$1.data;
    cgma_SimpleBotStrategy$1_$SwitchMap$com$group4$monopolydeal$model$card$ActionType = var$1;
    var$2[cgmmc_ActionType_ITS_MY_BIRTHDAY.$ordinal] = 1;
    var$2[cgmmc_ActionType_PASS_GO.$ordinal] = 2;
    var$2[cgmmc_ActionType_DEBT_COLLECTOR.$ordinal] = 3;
    var$2[cgmmc_ActionType_DEAL_BREAKER.$ordinal] = 4;
    var$2[cgmmc_ActionType_RENT.$ordinal] = 5;
    var$2[cgmmc_ActionType_MULTI_COLOUR_RENT.$ordinal] = 6;
    var$2[cgmmc_ActionType_SLY_DEAL.$ordinal] = 7;
    var$2[cgmmc_ActionType_FORCED_DEAL.$ordinal] = 8;
},
cgmmc_CardType = $rt_classWithoutFields(jl_Enum),
cgmmc_CardType_PROPERTY = null,
cgmmc_CardType_MONEY = null,
cgmmc_CardType_ACTION = null,
cgmmc_CardType_WILDCARD = null,
cgmmc_CardType_BUILDING = null,
cgmmc_CardType_$VALUES = null,
cgmmc_CardType_$callClinit = () => {
    cgmmc_CardType_$callClinit = $rt_eraseClinit(cgmmc_CardType);
    cgmmc_CardType__clinit_();
},
cgmmc_CardType__init_0 = ($this, var$1, var$2) => {
    cgmmc_CardType_$callClinit();
    jl_Enum__init_($this, var$1, var$2);
},
cgmmc_CardType__init_ = (var_0, var_1) => {
    let var_2 = new cgmmc_CardType();
    cgmmc_CardType__init_0(var_2, var_0, var_1);
    return var_2;
},
cgmmc_CardType__clinit_ = () => {
    let var$1, var$2, var$3;
    cgmmc_CardType_PROPERTY = cgmmc_CardType__init_($rt_s(599), 0);
    cgmmc_CardType_MONEY = cgmmc_CardType__init_($rt_s(600), 1);
    cgmmc_CardType_ACTION = cgmmc_CardType__init_($rt_s(601), 2);
    cgmmc_CardType_WILDCARD = cgmmc_CardType__init_($rt_s(602), 3);
    var$1 = cgmmc_CardType__init_($rt_s(603), 4);
    cgmmc_CardType_BUILDING = var$1;
    var$2 = $rt_createArray(cgmmc_CardType, 5);
    var$3 = var$2.data;
    var$3[0] = cgmmc_CardType_PROPERTY;
    var$3[1] = cgmmc_CardType_MONEY;
    var$3[2] = cgmmc_CardType_ACTION;
    var$3[3] = cgmmc_CardType_WILDCARD;
    var$3[4] = var$1;
    cgmmc_CardType_$VALUES = var$2;
};
function cgme_CardFactory$addRentCards$lambda$_8_0() {
    let a = this; jl_Object.call(a);
    a.$_021 = null;
    a.$_16 = null;
    a.$_23 = null;
}
let cgme_CardFactory$addRentCards$lambda$_8_0_get = var$0 => {
    let var$1, var$2, var$3, var$4, var$5, var$6, var$7, var$8;
    var$1 = var$0.$_021;
    var$2 = var$0.$_16;
    var$3 = var$0.$_23;
    cgme_CardFactory_$callClinit();
    var$4 = new cgmmc_ActionCard;
    cgmmc_ActionType_$callClinit();
    var$5 = cgmmc_ActionType_RENT;
    var$6 = jl_String_valueOf(var$2);
    var$7 = jl_String_valueOf(var$3);
    var$8 = new jl_StringBuilder;
    jl_AbstractStringBuilder__init_(var$8);
    jl_StringBuilder_append(jl_StringBuilder_append(jl_StringBuilder_append(jl_StringBuilder_append(var$8, $rt_s(604)), var$6), $rt_s(605)), var$7);
    cgmmc_ActionCard__init_0(var$4, var$1, 1, var$5, jl_AbstractStringBuilder_toString(var$8), ju_EnumSet_of(var$2, var$3));
    return var$4;
};
function w_DealBrowser$lambda$chooseAction$17$lambda$_57_0() {
    let a = this; jl_Object.call(a);
    a.$_08 = null;
    a.$_13 = null;
    a.$_21 = null;
    a.$_31 = null;
    a.$_40 = null;
}
let w_DealBrowser$lambda$chooseAction$17$lambda$_57_0_accept = (var$0, var$1) => {
    let var$2, var$3, var$4, var$5, var$6;
    var$1 = var$1;
    var$2 = var$0.$_08;
    var$3 = var$0.$_13;
    var$4 = var$0.$_21;
    var$5 = var$0.$_31;
    var$6 = var$0.$_40;
    cgmc_GameController_playCard(var$2.$controller, var$3, var$4, cgmc_GameController$PlayCardRequest_withSelectedCards(var$5, ju_List_of1(ju_TemplateCollections$ImmutableArrayList_get(var$6, 0), ju_TemplateCollections$ImmutableArrayList_get(var$1, 0))));
};
function cgma_SimpleBotStrategy$playMultiRent$lambda$_11_0() {
    jl_Object.call(this);
    this.$_034 = null;
}
let cgma_SimpleBotStrategy$playMultiRent$lambda$_11_0_test = (var$0, var$1) => {
    return cgmmg_Player_equals(var$1, var$0.$_034) ? 0 : 1;
},
cgma_SimpleBotStrategy$playForcedDeal$lambda$_14_0 = $rt_classWithoutFields(),
cgma_SimpleBotStrategy$playForcedDeal$lambda$_14_0_applyAsInt = (var$0, var$1) => {
    return var$1.$value;
},
cgma_SimpleBotStrategy$playForcedDeal$lambda$_14_1 = $rt_classWithoutFields(),
cgma_SimpleBotStrategy$playForcedDeal$lambda$_14_1_applyAsInt = (var$0, var$1) => {
    return var$1.$value;
},
w_DealBrowser$chooseRentMultiplier$lambda$_15_0 = $rt_classWithoutFields(),
w_DealBrowser$chooseRentMultiplier$lambda$_15_0_test = (var$0, var$1) => {
    let var$2, var$3;
    a: {
        b: {
            var$1 = var$1;
            w_DealBrowser_$callClinit();
            if (var$1 instanceof cgmmc_ActionCard) {
                var$2 = var$1.$actionType;
                cgmmc_ActionType_$callClinit();
                if (var$2 === cgmmc_ActionType_DOUBLE_THE_RENT)
                    break b;
            }
            var$3 = 0;
            break a;
        }
        var$3 = 1;
    }
    return var$3;
};
function w_DealBrowser$chooseRentMultiplier$lambda$_15_1() {
    let a = this; jl_Object.call(a);
    a.$_064 = null;
    a.$_123 = null;
    a.$_29 = null;
    a.$_36 = null;
}
function cgma_SimpleBotStrategy$pickRichestOpponent$lambda$_17_0() {
    jl_Object.call(this);
    this.$_073 = null;
}
let cgma_SimpleBotStrategy$pickRichestOpponent$lambda$_17_0_test = (var$0, var$1) => {
    return cgmmg_Player_equals(var$1, var$0.$_073) ? 0 : 1;
},
cgma_SimpleBotStrategy$pickRichestOpponent$lambda$_17_1 = $rt_classWithoutFields(),
cgma_SimpleBotStrategy$pickRichestOpponent$lambda$_17_1_applyAsInt = (var$0, var$1) => {
    let var$2, var$3, var$4;
    var$1 = var$1;
    var$2 = ju_Collection_stream(var$1.$bank.$cards);
    var$3 = new cgmmc_Bank$totalValue$lambda$_2_0;
    var$4 = jusi_SimpleIntStreamImpl_sum(jusi_SimpleStreamImpl_mapToInt(var$2, var$3));
    var$1 = ju_Collection_stream(cgmmc_AbstractCardCollection_getCards(var$1.$hand));
    var$2 = new cgma_SimpleBotStrategy$lambda$pickRichestOpponent$25$lambda$_23_0;
    return var$4 + jusi_SimpleIntStreamImpl_sum(jusi_SimpleStreamImpl_mapToInt(var$1, var$2)) | 0;
},
cgma_SimpleBotStrategy$pickBestRentColor$lambda$_15_0 = $rt_classWithoutFields(),
cgma_SimpleBotStrategy$pickBestRentColor$lambda$_15_0_test = (var$0, var$1) => {
    return cgmmc_PropertySet_propertyCount(var$1) <= 0 ? 0 : 1;
};
function cgma_SimpleBotStrategy$pickBestRentColor$lambda$_15_1() {
    jl_Object.call(this);
    this.$_00 = null;
}
let cgma_SimpleBotStrategy$pickBestRentColor$lambda$_15_1_test = (var$0, var$1) => {
    let var$2, var$3;
    var$1 = var$1;
    var$2 = var$0.$_00;
    var$3 = var$1.$color;
    return ju_TemplateCollections$NElementSet_contains(var$2, var$3);
},
cgma_SimpleBotStrategy$pickBestRentColor$lambda$_15_2 = $rt_classWithoutFields(),
cgma_SimpleBotStrategy$pickBestRentColor$lambda$_15_2_applyAsInt = (var$0, var$1) => {
    var$1 = var$1;
    return cgmmc_PropertySet_calculateBaseRent(var$1) + cgmmc_PropertySet_buildingBonus(var$1) | 0;
},
cgma_SimpleBotStrategy$pickBestRentColor$lambda$_15_3 = $rt_classWithoutFields(),
cgma_SimpleBotStrategy$pickBestRentColor$lambda$_15_3_apply = (var$0, var$1) => {
    return var$1.$color;
},
cgma_SimpleBotStrategy$countDoubleRentCards$lambda$_16_0 = $rt_classWithoutFields(),
cgma_SimpleBotStrategy$countDoubleRentCards$lambda$_16_0_test = (var$0, var$1) => {
    return var$1 instanceof cgmmc_ActionCard;
},
cgma_SimpleBotStrategy$countDoubleRentCards$lambda$_16_1 = $rt_classWithoutFields(),
cgma_SimpleBotStrategy$countDoubleRentCards$lambda$_16_1_apply = (var$0, var$1) => {
    return var$1;
},
cgma_SimpleBotStrategy$countDoubleRentCards$lambda$_16_2 = $rt_classWithoutFields(),
cgma_SimpleBotStrategy$countDoubleRentCards$lambda$_16_2_test = (var$0, var$1) => {
    let var$2;
    var$2 = var$1.$actionType;
    cgmmc_ActionType_$callClinit();
    return var$2 !== cgmmc_ActionType_DOUBLE_THE_RENT ? 0 : 1;
};
function w_DealBrowser$promptDoubleRentSelection$lambda$_28_0() {
    jl_Object.call(this);
    this.$_044 = null;
}
let w_DealBrowser$promptDoubleRentSelection$lambda$_28_0_accept = (var$0, var$1) => {
    let var$2, var$3, var$4, var$5;
    var$1 = var$1;
    var$2 = var$0.$_044;
    w_DealBrowser_$callClinit();
    var$1 = var$1.$get(0);
    jl_Integer_$callClinit();
    var$1 = jl_Integer_valueOf(jl_Integer_parseInt(var$1, 10));
    var$2 = var$2;
    var$1 = var$1;
    var$3 = var$2.$_064;
    var$4 = var$2.$_123;
    var$5 = var$2.$_29;
    var$2 = var$2.$_36;
    cgmc_GameController_playCard(var$3.$controller, var$4, var$5, cgmc_GameController$PlayCardRequest_withDoubleRentCount(var$2, var$1.$value1));
};
function w_DealBrowser$Option() {
    let a = this; jl_Record.call(a);
    a.$id0 = null;
    a.$name2 = null;
    a.$detail = null;
    a.$value5 = 0;
}
let w_DealBrowser$Option__init_ = ($this, $id, $name, $detail, $value) => {
    $this.$id0 = $id;
    $this.$name2 = $name;
    $this.$detail = $detail;
    $this.$value5 = $value;
},
w_DealBrowser$Option__init_0 = (var_0, var_1, var_2, var_3) => {
    let var_4 = new w_DealBrowser$Option();
    w_DealBrowser$Option__init_(var_4, var_0, var_1, var_2, var_3);
    return var_4;
},
w_DealBrowser$Option_toString = $this => {
    return jl_AbstractStringBuilder_toString(jl_StringBuilder_append1(jl_StringBuilder_append0(jl_StringBuilder_append1(jl_StringBuilder_append(jl_StringBuilder_append1(jl_StringBuilder_append(jl_StringBuilder_append1(jl_StringBuilder_append(jl_StringBuilder_append1(jl_StringBuilder__init_0($rt_s(606)), $rt_s(607)), $this.$id0), $rt_s(608)), $this.$name2), $rt_s(609)), $this.$detail), $rt_s(610)), $this.$value5), $rt_s(611)));
},
w_DealBrowser$Option_hashCode = $this => {
    let var$1, var$2;
    var$1 = (((((31 + ju_Objects_hashCode($this.$id0) | 0) * 31 | 0) + ju_Objects_hashCode($this.$name2) | 0) * 31 | 0) + ju_Objects_hashCode($this.$detail) | 0) * 31 | 0;
    var$2 = $this.$value5;
    jl_Integer_$callClinit();
    return var$1 + var$2 | 0;
},
w_DealBrowser$Option_equals = ($this, $o) => {
    let var$2;
    if ($this === $o)
        var$2 = 1;
    else if (!($o !== null && jl_Object_getClass($o) === $rt_cls(w_DealBrowser$Option)))
        var$2 = 0;
    else {
        $o = $o;
        var$2 = !ju_Objects_equals($this.$id0, $o.$id0) ? 0 : !ju_Objects_equals($this.$name2, $o.$name2) ? 0 : !ju_Objects_equals($this.$detail, $o.$detail) ? 0 : $this.$value5 == $o.$value5 ? 1 : 0;
    }
    return var$2;
},
juf_IntPredicate = $rt_classWithoutFields(0);
function jusi_SumIntConsumer() {
    jl_Object.call(this);
    this.$sum0 = 0;
}
function ju_GenericEnumSet$1() {
    let a = this; jl_Object.call(a);
    a.$index0 = 0;
    a.$indexToRemove = 0;
    a.$constantsCache = null;
    a.$this$0 = null;
}
let ju_GenericEnumSet$1_find = $this => {
    let $overflow, var$2, $next;
    $overflow = $this.$this$0.$bits0.data.length * 32 | 0;
    while (true) {
        var$2 = $this.$index0;
        if (var$2 >= $overflow)
            break;
        $next = jl_Integer_numberOfTrailingZeros($this.$this$0.$bits0.data[var$2 / 32 | 0] >>> (var$2 % 32 | 0) | 0);
        if ($next < 32) {
            $next = $this.$index0 + $next | 0;
            $this.$index0 = $next;
            return $next;
        }
        $this.$index0 = (($this.$index0 / 32 | 0) + 1 | 0) * 32 | 0;
    }
    return var$2;
},
ju_GenericEnumSet$1_hasNext = $this => {
    return $this.$index0 >= ($this.$this$0.$bits0.data.length * 32 | 0) ? 0 : 1;
},
ju_GenericEnumSet$1_next = $this => {
    let var$1, var$2, var$3;
    if (ju_GenericEnumSet$1_hasNext($this)) {
        $this.$indexToRemove = $this.$index0;
        if ($this.$constantsCache === null)
            $this.$constantsCache = ju_GenericEnumSet_getConstants($this.$this$0.$cls);
        var$1 = $this.$constantsCache.data;
        var$2 = $this.$index0;
        $this.$index0 = var$2 + 1 | 0;
        var$3 = var$1[var$2];
        $this.$index0 = ju_GenericEnumSet$1_find($this);
        return var$3;
    }
    var$3 = new ju_NoSuchElementException;
    jl_Throwable__init_0(var$3);
    $rt_throw(var$3);
},
juf_IntFunction = $rt_classWithoutFields(0),
jusi_SimpleStreamImpl$toArray$lambda$_20_0 = $rt_classWithoutFields(),
jusi_SimpleStreamImpl$toArray$lambda$_20_0_apply = (var$0, var$1) => {
    return $rt_createArray(jl_Object, var$1);
},
cgme_GameEventListener = $rt_classWithoutFields(0);
function ju_Comparator$thenComparingInt$lambda$_5_0() {
    let a = this; jl_Object.call(a);
    a.$_040 = null;
    a.$_112 = null;
}
let ju_Comparator$thenComparingInt$lambda$_5_0_compare = (var$0, var$1, var$2) => {
    let var$3, var$4, var$5;
    var$3 = var$0.$_040;
    var$4 = var$0.$_112;
    var$5 = var$3.$compare0(var$1, var$2);
    if (!var$5)
        var$5 = jl_Integer_compare(var$4.$applyAsInt(var$1), var$4.$applyAsInt(var$2));
    return var$5;
};
function jusi_FilteringStreamImpl() {
    jusi_WrappingStreamImpl.call(this);
    this.$filter0 = null;
}
let jusi_FilteringStreamImpl_wrap = ($this, $consumer) => {
    let var$2;
    var$2 = new jusi_FilteringStreamImpl$wrap$lambda$_1_0;
    var$2.$_042 = $this;
    var$2.$_113 = $consumer;
    return var$2;
},
otci_RandomUtils = $rt_classWithoutFields(),
cgmcf_CardPlayFlowService$changeWildcardColor$lambda$_2_0 = $rt_classWithoutFields(),
cgmcf_CardPlayFlowService$changeWildcardColor$lambda$_2_0_get = var$0 => {
    let var$1;
    var$1 = new cgme_InvalidMoveException;
    jl_Throwable__init_(var$1, $rt_s(612));
    return var$1;
},
cgmcf_CardPlayFlowService$changeWildcardColor$lambda$_2_1 = $rt_classWithoutFields(),
cgmcf_CardPlayFlowService$changeWildcardColor$lambda$_2_1_get = var$0 => {
    let var$1;
    var$1 = new cgme_InvalidMoveException;
    jl_Throwable__init_(var$1, $rt_s(613));
    return var$1;
};
function w_DealBrowser$lambda$promptDiscard$29$lambda$_45_0() {
    jl_Object.call(this);
    this.$_072 = null;
}
let w_DealBrowser$lambda$promptDiscard$29$lambda$_45_0_apply = (var$0, var$1) => {
    let var$2;
    var$1 = var$1;
    var$2 = var$0.$_072;
    w_DealBrowser_$callClinit();
    return w_DealBrowser_find(var$2, var$1);
},
cgmmc_BuildingType = $rt_classWithoutFields(jl_Enum),
cgmmc_BuildingType_HOUSE = null,
cgmmc_BuildingType_HOTEL = null,
cgmmc_BuildingType_$VALUES = null,
cgmmc_BuildingType_$callClinit = () => {
    cgmmc_BuildingType_$callClinit = $rt_eraseClinit(cgmmc_BuildingType);
    cgmmc_BuildingType__clinit_();
},
cgmmc_BuildingType__init_0 = ($this, var$1, var$2) => {
    cgmmc_BuildingType_$callClinit();
    jl_Enum__init_($this, var$1, var$2);
},
cgmmc_BuildingType__init_ = (var_0, var_1) => {
    let var_2 = new cgmmc_BuildingType();
    cgmmc_BuildingType__init_0(var_2, var_0, var_1);
    return var_2;
},
cgmmc_BuildingType__clinit_ = () => {
    let var$1, var$2, var$3;
    cgmmc_BuildingType_HOUSE = cgmmc_BuildingType__init_($rt_s(168), 0);
    var$1 = cgmmc_BuildingType__init_($rt_s(169), 1);
    cgmmc_BuildingType_HOTEL = var$1;
    var$2 = $rt_createArray(cgmmc_BuildingType, 2);
    var$3 = var$2.data;
    var$3[0] = cgmmc_BuildingType_HOUSE;
    var$3[1] = var$1;
    cgmmc_BuildingType_$VALUES = var$2;
},
cgma_SimpleBotStrategy$lambda$pickBestWildcardColor$9$lambda$_39_0 = $rt_classWithoutFields(),
cgma_SimpleBotStrategy$lambda$pickBestWildcardColor$9$lambda$_39_0_apply = (var$0, var$1) => {
    return jl_Integer_valueOf(ju_TemplateCollections$ImmutableArrayList_size(ju_List_copyOf(var$1.$properties0)));
},
cgma_SimpleBotStrategy$lambda$pickRichestOpponent$25$lambda$_23_0 = $rt_classWithoutFields(),
cgma_SimpleBotStrategy$lambda$pickRichestOpponent$25$lambda$_23_0_applyAsInt = (var$0, var$1) => {
    return var$1.$value;
};
function ju_TemplateCollections$NElementSet() {
    ju_TemplateCollections$AbstractImmutableSet.call(this);
    this.$data0 = null;
}
let ju_TemplateCollections$NElementSet_iterator = $this => {
    let var$1;
    var$1 = new ju_TemplateCollections$NElementSet$1;
    var$1.$this$04 = $this;
    return var$1;
},
ju_TemplateCollections$NElementSet_size = $this => {
    return $this.$data0.data.length;
},
ju_TemplateCollections$NElementSet_contains = ($this, $o) => {
    let $suggestedIndex, $i, var$4;
    if ($this.$data0.data.length && $o !== null) {
        $suggestedIndex = jl_Math_abs($o.$hashCode()) % $this.$data0.data.length | 0;
        $i = $suggestedIndex;
        while (true) {
            var$4 = $this.$data0.data;
            if ($i >= var$4.length) {
                $i = 0;
                while ($i < $suggestedIndex) {
                    if ($this.$data0.data[$i].$equals($o))
                        return 1;
                    $i = $i + 1 | 0;
                }
                return 0;
            }
            if (var$4[$i].$equals($o))
                break;
            $i = $i + 1 | 0;
        }
        return 1;
    }
    return 0;
};
function jusi_FilteringStreamImpl$wrap$lambda$_1_0() {
    let a = this; jl_Object.call(a);
    a.$_042 = null;
    a.$_113 = null;
}
let jusi_FilteringStreamImpl$wrap$lambda$_1_0_test = (var$0, var$1) => {
    let var$2, var$3;
    var$2 = var$0.$_042;
    var$3 = var$0.$_113;
    return var$2.$filter0.$test(var$1) ? var$3.$test(var$1) : 1;
};
function jusi_MappingStreamImpl$wrap$lambda$_1_0() {
    let a = this; jl_Object.call(a);
    a.$_038 = null;
    a.$_111 = null;
}
let jusi_MappingStreamImpl$wrap$lambda$_1_0_test = (var$0, var$1) => {
    let var$2;
    var$2 = var$0.$_038;
    return var$0.$_111.$test(var$2.$mapper0.$apply0(var$1));
};
function jusi_FindFirstConsumer() {
    jl_Object.call(this);
    this.$result0 = null;
}
let jusi_FindFirstConsumer_test = ($this, $t) => {
    $this.$result0 = $t;
    return 0;
};
function jusi_SortedStreamImpl() {
    let a = this; jusi_SimpleStreamImpl.call(a);
    a.$sourceStream1 = null;
    a.$array2 = null;
    a.$index5 = 0;
}
let jusi_SortedStreamImpl_next = ($this, $consumer) => {
    let var$2, var$3;
    a: {
        while (true) {
            var$2 = $this.$index5;
            var$3 = $this.$array2.data;
            if (var$2 >= var$3.length)
                break a;
            $this.$index5 = var$2 + 1 | 0;
            if ($consumer.$test(var$3[var$2]))
                continue;
            else
                break;
        }
    }
    return $this.$index5 >= $this.$array2.data.length ? 0 : 1;
},
jusi_SortedStreamImpl_estimateSize = $this => {
    return $this.$sourceStream1.$estimateSize();
},
juf_BiFunction = $rt_classWithoutFields(0),
juf_BinaryOperator = $rt_classWithoutFields(0);
function jusi_SimpleStreamImpl$max$lambda$_28_0() {
    jl_Object.call(this);
    this.$_010 = null;
}
let jusi_SimpleStreamImpl$max$lambda$_28_0_apply = (var$0, var$1, var$2) => {
    if (var$0.$_010.$compare0(var$1, var$2) >= 0)
        var$2 = var$1;
    return var$2;
},
cgmmc_PropertyCollection$getCompletedSets$lambda$_9_0 = $rt_classWithoutFields(),
cgmmc_PropertyCollection$getCompletedSets$lambda$_9_0_test = (var$0, var$1) => {
    return cgmmc_PropertySet_isComplete(var$1);
};
function cgmea_ForcedDealEffect$execute$lambda$_1_0() {
    jl_Object.call(this);
    this.$_045 = null;
}
let cgmea_ForcedDealEffect$execute$lambda$_1_0_accept = (var$0, var$1) => {
    var$1 = var$1;
    cgmmc_PropertyCollection_addToBestSet(var$0.$_045.$targetPlayer0.$properties, var$1);
};
function cgmea_ForcedDealEffect$execute$lambda$_1_1() {
    jl_Object.call(this);
    this.$_02 = null;
}
let cgmea_ForcedDealEffect$execute$lambda$_1_1_accept = (var$0, var$1) => {
    var$1 = var$1;
    cgmmc_PropertyCollection_addToBestSet(var$0.$_02.$actor.$properties, var$1);
},
cgmea_BuildingEffect$execute$lambda$_1_0 = $rt_classWithoutFields(),
cgmea_BuildingEffect$execute$lambda$_1_0_apply = (var$0, var$1) => {
    return jl_Boolean_valueOf(cgmmc_PropertySet_isComplete(var$1));
};
function cgmea_SlyDealEffect$execute$lambda$_1_0() {
    jl_Object.call(this);
    this.$_063 = null;
}
let cgmea_SlyDealEffect$execute$lambda$_1_0_accept = (var$0, var$1) => {
    var$1 = var$1;
    cgmmc_PropertyCollection_addToBestSet(var$0.$_063.$actor.$properties, var$1);
};
function cgmea_RentEffect$execute$lambda$_1_0() {
    jl_Object.call(this);
    this.$_066 = null;
}
let cgmea_RentEffect$execute$lambda$_1_0_test = (var$0, var$1) => {
    return cgmmg_Player_equals(var$1, var$0.$_066.$actor) ? 0 : 1;
};
function cgmea_RentEffect$execute$lambda$_1_1() {
    let a = this; jl_Object.call(a);
    a.$_016 = null;
    a.$_15 = 0;
}
let cgmea_RentEffect$execute$lambda$_1_1_apply = (var$0, var$1) => {
    let var$2, var$3, var$4, var$5;
    var$1 = var$1;
    var$2 = var$0.$_016;
    var$3 = var$0.$_15;
    var$4 = new cgmep_PaymentRequest;
    var$5 = var$2.$actor;
    var$2 = ju_List_of();
    cgmep_PaymentReason_$callClinit();
    cgmep_PaymentRequest__init_(var$4, var$1, var$5, var$3, var$2, cgmep_PaymentReason_RENT);
    return var$4;
};
function cgmea_DealBreakerEffect$execute$lambda$_1_0() {
    jl_Object.call(this);
    this.$_054 = null;
}
let cgmea_DealBreakerEffect$execute$lambda$_1_0_get = var$0 => {
    let var$1, var$2, var$3;
    var$1 = var$0.$_054;
    var$2 = new cgme_InvalidMoveException;
    var$1 = jl_String_valueOf(var$1.$chosenColor1);
    var$3 = new jl_StringBuilder;
    jl_AbstractStringBuilder__init_(var$3);
    jl_StringBuilder_append(jl_StringBuilder_append(var$3, $rt_s(614)), var$1);
    jl_Throwable__init_(var$2, jl_AbstractStringBuilder_toString(var$3));
    return var$2;
};
function cgmea_DealBreakerEffect$execute$lambda$_1_1() {
    jl_Object.call(this);
    this.$_036 = null;
}
let cgmea_DealBreakerEffect$execute$lambda$_1_1_get = var$0 => {
    let var$1, var$2, var$3;
    var$1 = var$0.$_036;
    var$2 = new cgme_InvalidMoveException;
    var$1 = jl_String_valueOf(var$1.$chosenColor1);
    var$3 = new jl_StringBuilder;
    jl_AbstractStringBuilder__init_(var$3);
    jl_StringBuilder_append(jl_StringBuilder_append(var$3, $rt_s(615)), var$1);
    jl_Throwable__init_(var$2, jl_AbstractStringBuilder_toString(var$3));
    return var$2;
},
cgmea_DealBreakerEffect$execute$lambda$_1_2 = $rt_classWithoutFields(),
cgmea_DealBreakerEffect$execute$lambda$_1_2_apply = (var$0, var$1) => {
    return jl_Boolean_valueOf(cgmmc_BuildingCard_isHotel(var$1));
};
function cgmea_DealBreakerEffect$execute$lambda$_1_3() {
    jl_Object.call(this);
    this.$_065 = null;
}
function cgmea_BirthdayEffect$execute$lambda$_1_0() {
    jl_Object.call(this);
    this.$_09 = null;
}
let cgmea_BirthdayEffect$execute$lambda$_1_0_test = (var$0, var$1) => {
    return cgmmg_Player_equals(var$1, var$0.$_09.$actor) ? 0 : 1;
};
function cgmea_BirthdayEffect$execute$lambda$_1_1() {
    jl_Object.call(this);
    this.$_032 = null;
}
let cgmea_BirthdayEffect$execute$lambda$_1_1_apply = (var$0, var$1) => {
    let var$2, var$3, var$4;
    var$1 = var$1;
    var$2 = var$0.$_032;
    var$3 = new cgmep_PaymentRequest;
    var$4 = var$2.$actor;
    var$2 = ju_List_of();
    cgmep_PaymentReason_$callClinit();
    cgmep_PaymentRequest__init_(var$3, var$1, var$4, 2, var$2, cgmep_PaymentReason_BIRTHDAY);
    return var$3;
};
function ju_ArrayDeque$1() {
    let a = this; jl_Object.call(a);
    a.$refVersion = 0;
    a.$index4 = 0;
    a.$lastIndex = 0;
    a.$left = 0;
    a.$this$09 = null;
}
let ju_ArrayDeque$1_next = $this => {
    let var$1, $result, var$3;
    var$1 = $this.$left - 1 | 0;
    $this.$left = var$1;
    if (var$1 >= 0) {
        $result = $this.$this$09;
        if ($result.$version <= $this.$refVersion) {
            var$1 = $this.$index4;
            $this.$lastIndex = var$1;
            var$3 = $result.$array0.data;
            $result = var$3[var$1];
            $this.$index4 = ju_ArrayDeque_modInc(var$1, var$3.length);
            return $result;
        }
        $result = new ju_ConcurrentModificationException;
        jl_Throwable__init_0($result);
        $rt_throw($result);
    }
    $result = new ju_NoSuchElementException;
    jl_Throwable__init_0($result);
    $rt_throw($result);
};
function jusi_SimpleStreamImpl$ArrayFillingConsumer() {
    let a = this; jl_Object.call(a);
    a.$array3 = null;
    a.$index7 = 0;
}
let jusi_SimpleStreamImpl$ArrayFillingConsumer_test = ($this, $t) => {
    let var$2, var$3;
    var$2 = $this.$array3.data;
    var$3 = $this.$index7;
    $this.$index7 = var$3 + 1 | 0;
    var$2[var$3] = $t;
    return 1;
};
function jusi_SimpleStreamImpl$toArray$lambda$_21_0() {
    jl_Object.call(this);
    this.$_060 = null;
}
let jusi_SimpleStreamImpl$toArray$lambda$_21_0_test = (var$0, var$1) => {
    return ju_ArrayList_add(var$0.$_060, var$1);
};
function jusi_MappingToIntStreamImpl$next$lambda$_1_0() {
    let a = this; jl_Object.call(a);
    a.$_043 = null;
    a.$_114 = null;
}
let jusi_MappingToIntStreamImpl$next$lambda$_1_0_test = (var$0, var$1) => {
    let var$2, var$3, var$4;
    var$2 = var$0.$_043;
    var$3 = var$0.$_114;
    var$4 = var$2.$mapper.$applyAsInt(var$1);
    var$1 = var$3;
    var$1.$sum0 = var$1.$sum0 + var$4 | 0;
    return 1;
};
function cgmmc_PropertyCollection$findSetContaining$lambda$_7_0() {
    jl_Object.call(this);
    this.$_039 = null;
}
let cgmmc_PropertyCollection$findSetContaining$lambda$_7_0_test = (var$0, var$1) => {
    let var$2;
    var$1 = var$1;
    var$2 = var$0.$_039;
    return ju_AbstractCollection_contains(cgmmc_PropertySet_getAllCards(var$1), var$2);
};
function jusi_LimitingStreamImpl() {
    let a = this; jusi_SimpleStreamImpl.call(a);
    a.$sourceStream = null;
    a.$limit0 = 0;
    a.$remaining = 0;
}
let jusi_LimitingStreamImpl_next = ($this, $consumer) => {
    let var$2, var$3;
    if ($this.$remaining) {
        var$2 = $this.$sourceStream;
        var$3 = new jusi_LimitingStreamImpl$next$lambda$_1_0;
        var$3.$_031 = $this;
        var$3.$_19 = $consumer;
        if (!var$2.$next1(var$3))
            $this.$remaining = 0;
        return $this.$remaining <= 0 ? 0 : 1;
    }
    return 0;
},
jusi_LimitingStreamImpl_estimateSize = $this => {
    let $sourceEstimation;
    $sourceEstimation = $this.$sourceStream.$estimateSize();
    return $sourceEstimation < 0 ? $this.$limit0 : jl_Math_min($this.$limit0, $sourceEstimation);
};
function jusi_DistinctStreamImpl$wrap$lambda$_1_0() {
    let a = this; jl_Object.call(a);
    a.$_03 = null;
    a.$_11 = null;
}
let jusi_DistinctStreamImpl$wrap$lambda$_1_0_test = (var$0, var$1) => {
    let var$2, var$3;
    var$2 = var$0.$_03;
    var$3 = var$0.$_11;
    return ju_HashSet_add(var$2, var$1) ? var$3.$test(var$1) : 1;
},
jusi_SortedStreamImpl$_init_$lambda$_0_0 = $rt_classWithoutFields(),
jusi_SortedStreamImpl$_init_$lambda$_0_0_apply = (var$0, var$1) => {
    return $rt_createArray(jl_Object, var$1);
},
cgmea_DealBreakerEffect$validateReceiverCanTakeSet$lambda$_2_0 = $rt_classWithoutFields(),
cgmea_DealBreakerEffect$validateReceiverCanTakeSet$lambda$_2_0_test = (var$0, var$1) => {
    let var$2;
    var$2 = var$1.$buildingType;
    cgmmc_BuildingType_$callClinit();
    return var$2 !== cgmmc_BuildingType_HOUSE ? 0 : 1;
},
cgmea_DealBreakerEffect$validateReceiverCanTakeSet$lambda$_2_1 = $rt_classWithoutFields(),
cgmea_DealBreakerEffect$validateReceiverCanTakeSet$lambda$_2_1_test = (var$0, var$1) => {
    return cgmmc_BuildingCard_isHotel(var$1);
};
function ju_Comparator$comparing$lambda$_9_0() {
    jl_Object.call(this);
    this.$_014 = null;
}
let ju_Comparator$comparing$lambda$_9_0_compare = (var$0, var$1, var$2) => {
    let var$3, var$4, var$5;
    var$3 = var$0.$_014;
    var$1 = cgmea_DealBreakerEffect$execute$lambda$_1_2_apply(var$3, var$1);
    var$2 = cgmea_DealBreakerEffect$execute$lambda$_1_2_apply(var$3, var$2);
    var$1 = var$1;
    var$2 = var$2;
    var$4 = var$1.$value2;
    var$5 = var$2.$value2;
    jl_Boolean_$callClinit();
    return var$4 == var$5 ? 0 : !var$4 ? (-1) : 1;
},
cgmmc_PropertyCollection$set$lambda$_16_0 = $rt_classWithoutFields();
function jusi_LimitingStreamImpl$next$lambda$_1_0() {
    let a = this; jl_Object.call(a);
    a.$_031 = null;
    a.$_19 = null;
}
let jusi_LimitingStreamImpl$next$lambda$_1_0_test = (var$0, var$1) => {
    let var$2, var$3, var$4;
    var$2 = var$0.$_031;
    var$3 = var$0.$_19;
    var$4 = var$2.$remaining - 1 | 0;
    var$2.$remaining = var$4;
    var$4 = var$4 <= 0 ? 0 : 1;
    return !(var$3.$test(var$1) && var$4) ? 0 : 1;
};
function jusi_FlatMappingStreamImpl() {
    let a = this; jusi_SimpleStreamImpl.call(a);
    a.$sourceStream2 = null;
    a.$currentSet = 0;
    a.$current = null;
    a.$iterator1 = null;
    a.$mapper1 = null;
    a.$done = 0;
}
let jusi_FlatMappingStreamImpl_next = ($this, $consumer) => {
    let $castCurrent, $e, var$4;
    a: {
        if ($this.$current === null) {
            if (!$this.$done) {
                $this.$currentSet = 0;
                b: {
                    while (true) {
                        if ($this.$currentSet)
                            break b;
                        $castCurrent = $this.$sourceStream2;
                        $e = new jusi_FlatMappingStreamImpl$next$lambda$_1_0;
                        $e.$_013 = $this;
                        if (!jusi_StreamOverSpliterator_next($castCurrent, $e))
                            break;
                    }
                    $this.$done = 1;
                }
                if ($this.$current !== null)
                    break a;
                return 0;
            }
            return 0;
        }
    }
    c: {
        $castCurrent = $this.$current;
        if ($castCurrent instanceof jusi_SimpleStreamImpl) {
            if (!jusi_StreamOverSpliterator_next($castCurrent, $consumer)) {
                $this.$current = null;
                break c;
            }
            return 1;
        }
        $castCurrent = $castCurrent;
        $e = new jusi_SimpleStreamIterator;
        $e.$stream0 = $castCurrent;
        $this.$iterator1 = $e;
        while (true) {
            $castCurrent = $this.$iterator1;
            jusi_SimpleStreamIterator_fetchIfNeeded($castCurrent);
            if (!($castCurrent.$state4 == 3 ? 0 : 1)) {
                $this.$iterator1 = null;
                $this.$current = null;
                break c;
            }
            $castCurrent = $this.$iterator1;
            jusi_SimpleStreamIterator_fetchIfNeeded($castCurrent);
            var$4 = $castCurrent.$state4;
            if (var$4 == 3) {
                $consumer = new ju_NoSuchElementException;
                jl_Throwable__init_0($consumer);
                $rt_throw($consumer);
            }
            $e = $castCurrent.$lastElement;
            $castCurrent.$lastElement = null;
            $castCurrent.$state4 = var$4 != 2 ? 0 : 3;
            if (!$consumer.$test($e))
                break;
        }
        return 1;
    }
    return 1;
};
function jusi_SimpleStreamImpl$min$lambda$_27_0() {
    jl_Object.call(this);
    this.$_017 = null;
}
let jusi_SimpleStreamImpl$min$lambda$_27_0_apply = (var$0, var$1, var$2) => {
    if (ju_Comparator$comparingInt$lambda$_14_0_compare(var$0.$_017, var$1, var$2) <= 0)
        var$2 = var$1;
    return var$2;
};
function jusi_ReducingConsumer() {
    let a = this; jl_Object.call(a);
    a.$accumulator = null;
    a.$result = null;
    a.$initialized = 0;
}
let jusi_ReducingConsumer_test = ($this, $t) => {
    if (!$this.$initialized) {
        $this.$result = $t;
        $this.$initialized = 1;
    } else
        $this.$result = $this.$accumulator.$apply1($this.$result, $t);
    return 1;
};
function cgmmc_AbstractCardCollection$addAll$lambda$_4_0() {
    jl_Object.call(this);
    this.$_053 = null;
}
let cgmmc_AbstractCardCollection$addAll$lambda$_4_0_accept = (var$0, var$1) => {
    var$1 = var$1;
    var$0.$_053.$add0(var$1);
},
cgmmc_Bank$totalValue$lambda$_2_0 = $rt_classWithoutFields(),
cgmmc_Bank$totalValue$lambda$_2_0_applyAsInt = (var$0, var$1) => {
    return var$1.$value;
};
function ju_TemplateCollections$NElementSet$1() {
    let a = this; jl_Object.call(a);
    a.$index8 = 0;
    a.$this$04 = null;
}
let ju_TemplateCollections$NElementSet$1_hasNext = $this => {
    return $this.$index8 >= $this.$this$04.$data0.data.length ? 0 : 1;
},
ju_TemplateCollections$NElementSet$1_next = $this => {
    let var$1, var$2, var$3;
    var$1 = $this.$index8;
    var$2 = $this.$this$04.$data0.data;
    if (var$1 >= var$2.length) {
        var$3 = new ju_NoSuchElementException;
        jl_Throwable__init_0(var$3);
        $rt_throw(var$3);
    }
    $this.$index8 = var$1 + 1 | 0;
    return var$2[var$1];
};
function ju_EnumMap$2() {
    ju_AbstractCollection.call(this);
    this.$this$03 = null;
}
let ju_EnumMap$2_size = $this => {
    return $this.$this$03.$size1;
},
ju_EnumMap$2_iterator = $this => {
    let var$1, $it;
    var$1 = $this.$this$03;
    if (var$1.$entrySet0 === null) {
        $it = new ju_EnumMap$1;
        $it.$this$01 = var$1;
        var$1.$entrySet0 = $it;
    }
    var$1 = var$1.$entrySet0;
    $it = new ju_EnumMap$1$1;
    $it.$this$1 = var$1;
    $it.$removeIndex0 = (-1);
    ju_EnumMap$1$1_find($it);
    var$1 = new ju_EnumMap$2$1;
    var$1.$this$11 = $this;
    var$1.$val$it = $it;
    return var$1;
};
function cgme_StandardRentCalculator$calculateRent$lambda$_1_0() {
    jl_Object.call(this);
    this.$_011 = null;
}
let cgme_StandardRentCalculator$calculateRent$lambda$_1_0_get = var$0 => {
    let var$1, var$2, var$3;
    var$1 = var$0.$_011;
    var$2 = new cgme_InvalidMoveException;
    var$1 = jl_String_valueOf(var$1);
    var$3 = new jl_StringBuilder;
    jl_AbstractStringBuilder__init_(var$3);
    jl_StringBuilder_append(jl_StringBuilder_append(var$3, $rt_s(616)), var$1);
    jl_Throwable__init_(var$2, jl_AbstractStringBuilder_toString(var$3));
    return var$2;
};
function jusi_FlatMappingStreamImpl$next$lambda$_1_0() {
    jl_Object.call(this);
    this.$_013 = null;
}
let jusi_FlatMappingStreamImpl$next$lambda$_1_0_test = (var$0, var$1) => {
    let var$2;
    var$2 = var$0.$_013;
    var$1 = var$1;
    w_DealBrowser_$callClinit();
    var$2.$current = ju_Collection_stream(ju_List_copyOf(var$1.$wildcards));
    var$2.$currentSet = 1;
    return 0;
};
function ju_EnumMap$2$1() {
    let a = this; jl_Object.call(a);
    a.$val$it = null;
    a.$this$11 = null;
}
let ju_EnumMap$2$1_hasNext = $this => {
    let var$1;
    var$1 = $this.$val$it;
    return var$1.$index1 >= var$1.$this$1.$this$01.$data1.data.length ? 0 : 1;
},
ju_EnumMap$2$1_next = $this => {
    let var$1, var$2, var$3, var$4, var$5, var$6;
    var$1 = $this.$val$it;
    var$2 = var$1.$index1;
    var$3 = var$1.$this$1;
    if (var$2 < var$3.$this$01.$data1.data.length) {
        var$1.$removeIndex0 = var$2;
        var$4 = new ju_EnumMap$1$EntryImpl;
        var$1.$index1 = var$2 + 1 | 0;
        var$4.$this$10 = var$3;
        var$4.$index10 = var$2;
        ju_EnumMap$1$1_find(var$1);
        var$1 = var$4;
        var$3 = var$1.$this$10.$this$01;
        var$5 = var$3.$provided.data;
        var$6 = var$1.$index10;
        if (!var$5[var$6]) {
            var$1 = new jl_IllegalStateException;
            jl_Throwable__init_0(var$1);
            $rt_throw(var$1);
        }
        return var$3.$data1.data[var$6];
    }
    var$1 = new ju_NoSuchElementException;
    jl_Throwable__init_0(var$1);
    $rt_throw(var$1);
};
function jusi_SimpleStreamImpl$forEachOrdered$lambda$_19_0() {
    jl_Object.call(this);
    this.$_068 = null;
}
let jusi_SimpleStreamImpl$forEachOrdered$lambda$_19_0_test = (var$0, var$1) => {
    let var$2;
    var$2 = var$0.$_068;
    var$1 = var$1;
    var$2 = var$2.$_065;
    cgmmc_PropertyCollection_attachBuilding(var$2.$actor.$properties, var$1, var$2.$chosenColor1);
    return 1;
};
function w_DealBrowser$lambda$submit$8$lambda$_66_0() {
    jl_Object.call(this);
    this.$_058 = null;
}
let w_DealBrowser$lambda$submit$8$lambda$_66_0_test = (var$0, var$1) => {
    let var$2;
    var$1 = var$1;
    var$2 = var$0.$_058;
    w_DealBrowser_$callClinit();
    return jl_String_equals(var$1.$id0, var$2);
},
w_DealBrowser$lambda$playerData$39$lambda$_35_0 = $rt_classWithoutFields(),
w_DealBrowser$lambda$playerData$39$lambda$_35_0_apply = (var$0, var$1) => {
    return w_DealBrowser_cardData(var$1);
},
cgma_SimpleBotStrategy$lambda$pickBestWildcardColor$11$lambda$_37_0 = $rt_classWithoutFields(),
cgma_SimpleBotStrategy$lambda$pickBestWildcardColor$11$lambda$_37_0_apply = (var$0, var$1) => {
    return jl_Integer_valueOf(cgmmc_PropertySet_propertyCount(var$1));
},
cgma_SimpleBotStrategy$lambda$pickBestWildcardColor$13$lambda$_35_0 = $rt_classWithoutFields(),
cgma_SimpleBotStrategy$lambda$pickBestWildcardColor$13$lambda$_35_0_apply = (var$0, var$1) => {
    return jl_Integer_valueOf(cgmmc_PropertySet_propertyCount(var$1));
};
function ju_HashMap$1() {
    ju_AbstractSet.call(this);
    this.$this$08 = null;
}
let ju_HashMap$1_iterator = $this => {
    let var$1, var$2;
    var$1 = new ju_HashMap$KeyIterator;
    var$2 = $this.$this$08;
    var$1.$associatedMap = var$2;
    var$1.$expectedModCount = var$2.$modCount0;
    var$1.$futureEntry = null;
    return var$1;
};
function ju_EnumMap$1() {
    ju_AbstractSet.call(this);
    this.$this$01 = null;
}
function ju_HashMap$AbstractMapIterator() {
    let a = this; jl_Object.call(a);
    a.$position = 0;
    a.$expectedModCount = 0;
    a.$futureEntry = null;
    a.$currentEntry = null;
    a.$prevEntry = null;
    a.$associatedMap = null;
}
let ju_HashMap$AbstractMapIterator_hasNext = $this => {
    let var$1, var$2;
    if ($this.$futureEntry === null) {
        while (true) {
            var$1 = $this.$position;
            var$2 = $this.$associatedMap.$elementData.data;
            if (var$1 >= var$2.length)
                break;
            if (var$2[var$1] !== null)
                return 1;
            $this.$position = var$1 + 1 | 0;
        }
        return 0;
    }
    return 1;
},
ju_HashMap$KeyIterator = $rt_classWithoutFields(ju_HashMap$AbstractMapIterator),
ju_HashMap$KeyIterator_next = $this => {
    let var$1, var$2, var$3, var$4;
    if ($this.$expectedModCount == $this.$associatedMap.$modCount0) {
        if (ju_HashMap$AbstractMapIterator_hasNext($this)) {
            var$1 = $this.$futureEntry;
            if (var$1 === null) {
                var$2 = $this.$associatedMap.$elementData.data;
                var$3 = $this.$position;
                $this.$position = var$3 + 1 | 0;
                var$1 = var$2[var$3];
                $this.$currentEntry = var$1;
                $this.$futureEntry = var$1.$next3;
                $this.$prevEntry = null;
            } else {
                var$4 = $this.$currentEntry;
                if (var$4 !== null)
                    $this.$prevEntry = var$4;
                $this.$currentEntry = var$1;
                $this.$futureEntry = var$1.$next3;
            }
            return $this.$currentEntry.$key;
        }
        var$1 = new ju_NoSuchElementException;
        jl_Throwable__init_0(var$1);
        $rt_throw(var$1);
    }
    var$1 = new ju_ConcurrentModificationException;
    jl_Throwable__init_0(var$1);
    $rt_throw(var$1);
};
function ju_EnumMap$1$1() {
    let a = this; jl_Object.call(a);
    a.$index1 = 0;
    a.$removeIndex0 = 0;
    a.$this$1 = null;
}
let ju_EnumMap$1$1_find = $this => {
    let var$1, var$2;
    while (true) {
        var$1 = $this.$index1;
        var$2 = $this.$this$1.$this$01.$provided.data;
        if (var$1 >= var$2.length)
            break;
        if (var$2[var$1])
            break;
        $this.$index1 = var$1 + 1 | 0;
    }
};
function ju_LinkedHashMapKeySet() {
    let a = this; ju_AbstractSet.call(a);
    a.$base0 = null;
    a.$reversed0 = 0;
}
let ju_LinkedHashMapKeySet_iterator = $this => {
    let var$1;
    var$1 = new ju_LinkedHashMapIterator$KeyIterator;
    ju_LinkedHashMapIterator__init_(var$1, $this.$base0, $this.$reversed0);
    return var$1;
},
ju_LinkedHashMapIterator$KeyIterator = $rt_classWithoutFields(ju_LinkedHashMapIterator),
ju_LinkedHashMapIterator$KeyIterator_next = $this => {
    ju_LinkedHashMapIterator_makeNext($this);
    return $this.$currentEntry0.$key;
};
function ju_EnumMap$1$EntryImpl() {
    let a = this; jl_Object.call(a);
    a.$index10 = 0;
    a.$this$10 = null;
}
let cgmmc_PropertySet$removeCard$lambda$_4_0 = $rt_classWithoutFields(),
cgmmc_PropertySet$removeCard$lambda$_4_0_apply = (var$0, var$1) => {
    return var$1;
},
cgmmc_PropertySet$removeCard$lambda$_4_1 = $rt_classWithoutFields(),
cgmmc_PropertySet$removeCard$lambda$_4_1_apply = (var$0, var$1) => {
    return var$1;
},
cgmmc_PropertySet$removeCard$lambda$_4_2 = $rt_classWithoutFields(),
cgmmc_PropertySet$removeCard$lambda$_4_2_apply = (var$0, var$1) => {
    return var$1;
};
function jusi_SimpleStreamIterator() {
    let a = this; jl_Object.call(a);
    a.$stream0 = null;
    a.$lastElement = null;
    a.$state4 = 0;
}
let jusi_SimpleStreamIterator_fetchIfNeeded = $this => {
    let var$1, var$2;
    if (!$this.$state4) {
        $this.$state4 = 0;
        while (!$this.$state4) {
            var$1 = $this.$stream0;
            var$2 = new jusi_SimpleStreamIterator$fetchIfNeeded$lambda$_4_0;
            var$2.$_023 = $this;
            if (!jusi_StreamOverSpliterator_next(var$1, var$2)) {
                if ($this.$state4)
                    $this.$state4 = 2;
                else
                    $this.$state4 = 3;
                $this.$stream0 = null;
            }
        }
        return;
    }
};
function jusi_SimpleStreamIterator$fetchIfNeeded$lambda$_4_0() {
    jl_Object.call(this);
    this.$_023 = null;
}
let jusi_SimpleStreamIterator$fetchIfNeeded$lambda$_4_0_test = (var$0, var$1) => {
    let var$2;
    var$2 = var$0.$_023;
    var$2.$lastElement = var$1;
    var$2.$state4 = 1;
    return 0;
};
$rt_packages([-1, "com", 0, "group4", 1, "monopolydeal", 2, "engine", 3, "action", 3, "payment", 2, "model", 6, "game", 6, "collection", 6, "card", 2, "command", -1, "webdeal", -1, "java", 12, "util", 13, "regex", 12, "time", 12, "lang", -1, "org", 17, "teavm", 18, "classlib", 19, "impl", 20, "unicode"
]);
$rt_metadata([jl_Object, "Object", 16, 0, [], 1, 0, 0, ["$hashCode", $rt_wrapFunction0(jl_Object_hashCode), "$equals", $rt_wrapFunction1(jl_Object_equals), "$toString", $rt_wrapFunction0(jl_Object_toString)],
ji_Serializable, 0, jl_Object, [], 1537, 0, 0, 0,
jl_Comparable, 0, jl_Object, [], 1537, 0, 0, 0,
jl_CharSequence, 0, jl_Object, [], 1537, 0, 0, 0,
jl_String, "String", 16, jl_Object, [ji_Serializable, jl_Comparable, jl_CharSequence], 17, 0, () => jl_String_$callClinit(), ["$toString", $rt_wrapFunction0(jl_String_toString), "$equals", $rt_wrapFunction1(jl_String_equals), "$hashCode", $rt_wrapFunction0(jl_String_hashCode), "$compareTo", $rt_wrapFunction1(jl_String_compareTo)],
jlr_AnnotatedElement, 0, jl_Object, [], 1537, 0, 0, 0,
jlr_GenericDeclaration, 0, jl_Object, [jlr_AnnotatedElement], 1537, 0, 0, 0,
jlr_Type, 0, jl_Object, [], 1537, 0, 0, 0,
jl_Class, 0, jl_Object, [jlr_GenericDeclaration, jlr_Type], 17, 0, 0, ["$toString", $rt_wrapFunction0(jl_Class_toString)],
jl_Number, 0, jl_Object, [ji_Serializable], 1025, 0, 0, 0,
jl_Integer, "Integer", 16, jl_Number, [jl_Comparable], 1, 0, () => jl_Integer_$callClinit(), ["$toString", $rt_wrapFunction0(jl_Integer_toString1), "$hashCode", $rt_wrapFunction0(jl_Integer_hashCode), "$equals", $rt_wrapFunction1(jl_Integer_equals), "$compareTo", $rt_wrapFunction1(jl_Integer_compareTo)],
jl_AbstractStringBuilder, 0, jl_Object, [ji_Serializable, jl_CharSequence], 0, 0, 0, ["$ensureCapacity", $rt_wrapFunction1(jl_AbstractStringBuilder_ensureCapacity), "$toString", $rt_wrapFunction0(jl_AbstractStringBuilder_toString)],
jl_Appendable, 0, jl_Object, [], 1537, 0, 0, 0,
jl_StringBuilder, 0, jl_AbstractStringBuilder, [jl_Appendable], 1, 0, 0, ["$insert1", $rt_wrapFunction4(jl_StringBuilder_insert1), "$append3", $rt_wrapFunction3(jl_StringBuilder_append3), "$toString", $rt_wrapFunction0(jl_StringBuilder_toString), "$ensureCapacity", $rt_wrapFunction1(jl_StringBuilder_ensureCapacity), "$insert0", $rt_wrapFunction2(jl_StringBuilder_insert0)],
jl_Throwable, 0, jl_Object, [], 1, 0, 0, ["$getMessage", $rt_wrapFunction0(jl_Throwable_getMessage)],
jl_Exception, 0, jl_Throwable, [], 1, 0, 0, 0,
jl_RuntimeException, 0, jl_Exception, [], 1, 0, 0, 0,
otrr_ReflectionInfo, 0, jl_Object, [], 1025, 0, 0, 0,
otrr_ClassInfo, 0, otrr_ReflectionInfo, [], 17, 0, 0, 0,
otr_StringInfo, 0, otrr_ReflectionInfo, [], 17, 0, 0, 0,
cgmv_GameView, 0, jl_Object, [], 1537, 0, 0, 0,
w_DealBrowser, 0, jl_Object, [cgmv_GameView], 17, 0, () => w_DealBrowser_$callClinit(), 0,
jl_ClassCastException, 0, jl_RuntimeException, [], 1, 0, 0, 0,
otp_Platform, 0, jl_Object, [], 17, 0, 0, 0,
otji_JS, 0, jl_Object, [], 17, 0, 0, 0,
otci_IntegerUtil, 0, jl_Object, [], 17, 0, 0, 0,
ju_Comparator, 0, jl_Object, [], 1537, 0, 0, 0,
jl_String$_clinit_$lambda$_118_0, 0, jl_Object, [ju_Comparator], 1, 0, 0, 0,
jl_Character, 0, jl_Object, [jl_Comparable], 1, 0, () => jl_Character_$callClinit(), 0,
ju_Objects, 0, jl_Object, [], 17, 0, 0, 0,
otji_JSWrapper, 0, jl_Object, [], 17, 0, 0, 0,
cgmc_GameController, 0, jl_Object, [], 1, 0, 0, 0,
jl_Iterable, 0, jl_Object, [], 1537, 0, 0, ["$forEach", $rt_wrapFunction1(jl_Iterable_forEach)],
ju_Collection, 0, jl_Object, [jl_Iterable], 1537, 0, 0, ["$forEach", $rt_wrapFunction1(jl_Iterable_forEach)],
ju_SequencedCollection, 0, jl_Object, [ju_Collection], 1537, 0, 0, ["$forEach", $rt_wrapFunction1(jl_Iterable_forEach)],
ju_List, 0, jl_Object, [ju_SequencedCollection], 1537, 0, 0, ["$forEach", $rt_wrapFunction1(jl_Iterable_forEach)],
jl_Runnable, 0, jl_Object, [], 1537, 0, 0, 0,
w_DealBrowser$play$lambda$_2_0, 0, jl_Object, [jl_Runnable], 1, 0, 0, ["$run", $rt_wrapFunction0(w_DealBrowser$play$lambda$_2_0_run)],
w_DealBrowser$moveWildcard$lambda$_3_0, 0, jl_Object, [jl_Runnable], 1, 0, 0, ["$run", $rt_wrapFunction0(w_DealBrowser$moveWildcard$lambda$_3_0_run)],
w_DealBrowser$endTurn$lambda$_4_0, 0, jl_Object, [jl_Runnable], 1, 0, 0, ["$run", $rt_wrapFunction0(w_DealBrowser$endTurn$lambda$_4_0_run)],
w_DealBrowser$stepBot$lambda$_5_0, 0, jl_Object, [jl_Runnable], 1, 0, 0, ["$run", $rt_wrapFunction0(w_DealBrowser$stepBot$lambda$_5_0_run)],
ju_Arrays, 0, jl_Object, [], 1, 0, 0, 0,
jl_Record, 0, jl_Object, [], 1025, 0, 0, 0,
w_DealBrowser$Choice, 0, jl_Record, [], 16, 0, 0, 0,
juf_Predicate, 0, jl_Object, [], 1537, 0, 0, 0,
w_DealBrowser$submit$lambda$_6_0, 0, jl_Object, [juf_Predicate], 1, 0, 0, ["$test", $rt_wrapFunction1(w_DealBrowser$submit$lambda$_6_0_test)],
w_DealBrowser$submit$lambda$_6_1, 0, jl_Object, [jl_Runnable], 1, 0, 0, ["$run", $rt_wrapFunction0(w_DealBrowser$submit$lambda$_6_1_run)],
jl_IndexOutOfBoundsException, 0, jl_RuntimeException, [], 1, 0, 0, 0,
ju_AbstractCollection, 0, jl_Object, [ju_Collection], 1025, 0, 0, ["$forEach", $rt_wrapFunction1(jl_Iterable_forEach), "$isEmpty", $rt_wrapFunction0(ju_AbstractCollection_isEmpty), "$toString", $rt_wrapFunction0(ju_AbstractCollection_toString)],
ju_Queue, 0, jl_Object, [ju_Collection], 1537, 0, 0, ["$forEach", $rt_wrapFunction1(jl_Iterable_forEach)]]);
$rt_metadata([ju_Deque, 0, jl_Object, [ju_Queue, ju_SequencedCollection], 1537, 0, 0, ["$forEach", $rt_wrapFunction1(jl_Iterable_forEach)],
jl_Cloneable, 0, jl_Object, [], 1537, 0, 0, 0,
ju_ArrayDeque, 0, ju_AbstractCollection, [ju_Deque, jl_Cloneable, ji_Serializable], 1, 0, 0, ["$forEach", $rt_wrapFunction1(jl_Iterable_forEach), "$add", $rt_wrapFunction1(ju_ArrayDeque_add), "$size", $rt_wrapFunction0(ju_ArrayDeque_size), "$iterator", $rt_wrapFunction0(ju_ArrayDeque_iterator)],
cgmcf_ControllerState, 0, jl_Object, [], 17, 0, 0, 0,
cgmcf_ReactionFlowService, 0, jl_Object, [], 17, 0, 0, 0,
cgmcf_TurnFlowService, 0, jl_Object, [], 17, 0, 0, 0,
cgmcf_PaymentFlowService, 0, jl_Object, [], 17, 0, 0, 0,
cgmcf_CardPlayFlowService, 0, jl_Object, [], 17, 0, 0, 0,
ju_Collections, 0, jl_Object, [], 17, 0, () => ju_Collections_$callClinit(), 0,
jl_Enum, "Enum", 16, jl_Object, [jl_Comparable, ji_Serializable], 1025, 0, 0, ["$toString", $rt_wrapFunction0(jl_Enum_toString), "$equals", $rt_wrapFunction1(jl_Enum_equals), "$hashCode", $rt_wrapFunction0(jl_Enum_hashCode), "$compareTo", $rt_wrapFunction1(jl_Enum_compareTo)],
w_Wire, 0, jl_Object, [], 16, 0, 0, 0,
jur_Pattern, 0, jl_Object, [ji_Serializable], 17, 0, 0, 0,
ju_AbstractList, 0, ju_AbstractCollection, [ju_List], 1025, 0, 0, ["$forEach", $rt_wrapFunction1(jl_Iterable_forEach), "$iterator", $rt_wrapFunction0(ju_AbstractList_iterator), "$remove", $rt_wrapFunction1(ju_AbstractList_remove), "$hashCode", $rt_wrapFunction0(ju_AbstractList_hashCode), "$equals", $rt_wrapFunction1(ju_AbstractList_equals)],
ju_RandomAccess, 0, jl_Object, [], 1537, 0, 0, 0,
ju_Arrays$ArrayAsList, 0, ju_AbstractList, [ju_RandomAccess, ji_Serializable], 0, 0, 0, ["$forEach", $rt_wrapFunction1(jl_Iterable_forEach), "$get", $rt_wrapFunction1(ju_Arrays$ArrayAsList_get), "$size", $rt_wrapFunction0(ju_Arrays$ArrayAsList_size)],
cgmep_PaymentService, 0, jl_Object, [], 1, 0, 0, 0,
cgme_WinCondition, 0, jl_Object, [], 1537, 0, 0, 0,
cgme_StandardWinCondition, 0, jl_Object, [cgme_WinCondition], 1, 0, 0, 0,
cgmea_ActionCardExecutor, 0, jl_Object, [], 1, 0, 0, 0,
cgme_RentCalculator, 0, jl_Object, [], 1537, 0, 0, 0,
cgme_StandardRentCalculator, 0, jl_Object, [cgme_RentCalculator], 1, 0, 0, 0,
cgme_EventBus, 0, jl_Object, [], 1, 0, 0, 0,
ju_TemplateCollections$AbstractImmutableList, 0, ju_AbstractList, [ju_RandomAccess], 1024, 0, 0, ["$forEach", $rt_wrapFunction1(jl_Iterable_forEach), "$remove", $rt_wrapFunction1(ju_TemplateCollections$AbstractImmutableList_remove)],
ju_TemplateCollections$SingleElementList, 0, ju_TemplateCollections$AbstractImmutableList, [ju_RandomAccess], 0, 0, 0, ["$forEach", $rt_wrapFunction1(jl_Iterable_forEach), "$size", $rt_wrapFunction0(ju_TemplateCollections$SingleElementList_size), "$get", $rt_wrapFunction1(ju_TemplateCollections$SingleElementList_get)],
cgmmg_Player, "Player", 7, jl_Object, [], 1, 0, 0, ["$equals", $rt_wrapFunction1(cgmmg_Player_equals), "$hashCode", $rt_wrapFunction0(cgmmg_Player_hashCode), "$toString", $rt_wrapFunction0(cgmmg_Player_toString)],
juf_Function, 0, jl_Object, [], 1537, 0, 0, 0,
w_DealBrowser$playerData$lambda$_32_0, 0, jl_Object, [juf_Function], 1, 0, 0, ["$apply0", $rt_wrapFunction1(w_DealBrowser$playerData$lambda$_32_0_apply)],
w_DealBrowser$playerData$lambda$_32_1, 0, jl_Object, [juf_Function], 1, 0, 0, ["$apply0", $rt_wrapFunction1(w_DealBrowser$playerData$lambda$_32_1_apply)],
juf_ToIntFunction, 0, jl_Object, [], 1537, 0, 0, 0,
w_DealBrowser$playerData$lambda$_32_2, 0, jl_Object, [juf_ToIntFunction], 1, 0, 0, ["$applyAsInt", $rt_wrapFunction1(w_DealBrowser$playerData$lambda$_32_2_applyAsInt)],
w_DealBrowser$playerData$lambda$_32_3, 0, jl_Object, [juf_Function], 1, 0, 0, ["$apply0", $rt_wrapFunction1(w_DealBrowser$playerData$lambda$_32_3_apply)],
ju_TemplateCollections$TwoElementsList, "TemplateCollections$TwoElementsList", 13, ju_TemplateCollections$AbstractImmutableList, [ju_RandomAccess], 0, 0, 0, ["$forEach", $rt_wrapFunction1(jl_Iterable_forEach), "$size", $rt_wrapFunction0(ju_TemplateCollections$TwoElementsList_size), "$get", $rt_wrapFunction1(ju_TemplateCollections$TwoElementsList_get)],
cgmmg_GameSnapshot, 0, jl_Object, [], 1, 0, 0, 0,
w_DealBrowser$Choice$data$lambda$_1_0, 0, jl_Object, [juf_Function], 1, 0, 0, ["$apply0", $rt_wrapFunction1(w_DealBrowser$Choice$data$lambda$_1_0_apply)],
jl_Boolean, "Boolean", 16, jl_Object, [ji_Serializable, jl_Comparable], 1, 0, () => jl_Boolean_$callClinit(), ["$toString", $rt_wrapFunction0(jl_Boolean_toString), "$hashCode", $rt_wrapFunction0(jl_Boolean_hashCode), "$equals", $rt_wrapFunction1(jl_Boolean_equals)],
ju_Map, 0, jl_Object, [], 1537, 0, 0, 0,
ju_AbstractMap, 0, jl_Object, [ju_Map], 1025, 0, 0, ["$put", $rt_wrapFunction2(ju_AbstractMap_put), "$equals", $rt_wrapFunction1(ju_AbstractMap_equals), "$hashCode", $rt_wrapFunction0(ju_AbstractMap_hashCode), "$toString", $rt_wrapFunction0(ju_AbstractMap_toString)],
ju_HashMap, 0, ju_AbstractMap, [jl_Cloneable, ji_Serializable], 1, 0, 0, ["$newElementArray", $rt_wrapFunction1(ju_HashMap_newElementArray), "$keySet", $rt_wrapFunction0(ju_HashMap_keySet), "$put", $rt_wrapFunction2(ju_HashMap_put)],
ju_SequencedMap, 0, jl_Object, [ju_Map], 1537, 0, 0, 0,
ju_LinkedHashMap, "LinkedHashMap", 13, ju_HashMap, [ju_SequencedMap], 1, 0, 0, ["$newElementArray", $rt_wrapFunction1(ju_LinkedHashMap_newElementArray), "$put", $rt_wrapFunction2(ju_LinkedHashMap_put), "$keySet", $rt_wrapFunction0(ju_LinkedHashMap_keySet)],
ju_Map$Entry, 0, jl_Object, [], 1537, 0, 0, 0,
jl_IllegalArgumentException, 0, jl_RuntimeException, [], 1, 0, 0, 0,
cgmep_PaymentRequest, "PaymentRequest", 5, jl_Object, [], 1, 0, 0, 0,
cgmmg_PlayerType, 0, jl_Enum, [], 65553, 0, () => cgmmg_PlayerType_$callClinit(), 0,
w_DealBrowser$settlePayments$lambda$_16_0, 0, jl_Object, [juf_Function], 1, 0, 0, ["$apply0", $rt_wrapFunction1(w_DealBrowser$settlePayments$lambda$_16_0_apply)],
juf_Consumer, 0, jl_Object, [], 1537, 0, 0, 0,
w_DealBrowser$settlePayments$lambda$_16_1, 0, jl_Object, [juf_Consumer], 1, 0, 0, ["$accept", $rt_wrapFunction1(w_DealBrowser$settlePayments$lambda$_16_1_accept)],
w_BotPayment, 0, jl_Object, [], 16, 0, 0, 0,
ju_EnumMap, 0, ju_AbstractMap, [ji_Serializable, jl_Cloneable], 1, 0, 0, 0,
cgmmc_ActionType, "ActionType", 9, jl_Enum, [], 65553, 0, () => cgmmc_ActionType_$callClinit(), 0]);
$rt_metadata([cgmea_ActionEffect, 0, jl_Object, [], 1537, 0, 0, 0,
cgmea_SlyDealEffect, "SlyDealEffect", 4, jl_Object, [cgmea_ActionEffect], 1, 0, 0, ["$execute0", $rt_wrapFunction1(cgmea_SlyDealEffect_execute)],
cgmea_ForcedDealEffect, "ForcedDealEffect", 4, jl_Object, [cgmea_ActionEffect], 1, 0, 0, ["$execute0", $rt_wrapFunction1(cgmea_ForcedDealEffect_execute)],
cgmea_DebtCollectorEffect, "DebtCollectorEffect", 4, jl_Object, [cgmea_ActionEffect], 1, 0, 0, ["$execute0", $rt_wrapFunction1(cgmea_DebtCollectorEffect_execute)],
cgmea_BirthdayEffect, "BirthdayEffect", 4, jl_Object, [cgmea_ActionEffect], 1, 0, 0, ["$execute0", $rt_wrapFunction1(cgmea_BirthdayEffect_execute)],
cgmea_RentEffect, "RentEffect", 4, jl_Object, [cgmea_ActionEffect], 1, 0, 0, ["$execute0", $rt_wrapFunction1(cgmea_RentEffect_execute)],
cgmea_DoubleRentEffect, "DoubleRentEffect", 4, jl_Object, [cgmea_ActionEffect], 1, 0, 0, ["$execute0", $rt_wrapFunction1(cgmea_DoubleRentEffect_execute)],
cgmea_PassGoEffect, "PassGoEffect", 4, jl_Object, [cgmea_ActionEffect], 1, 0, 0, ["$execute0", $rt_wrapFunction1(cgmea_PassGoEffect_execute)],
cgmea_JustSayNoEffect, "JustSayNoEffect", 4, jl_Object, [cgmea_ActionEffect], 1, 0, 0, ["$execute0", $rt_wrapFunction1(cgmea_JustSayNoEffect_execute)],
cgmea_BuildingEffect, "BuildingEffect", 4, jl_Object, [cgmea_ActionEffect], 1, 0, 0, ["$execute0", $rt_wrapFunction1(cgmea_BuildingEffect_execute)],
cgmea_DealBreakerEffect, "DealBreakerEffect", 4, jl_Object, [cgmea_ActionEffect], 1, 0, 0, ["$execute0", $rt_wrapFunction1(cgmea_DealBreakerEffect_execute)],
ju_ArrayList, 0, ju_AbstractList, [jl_Cloneable, ji_Serializable, ju_RandomAccess], 1, 0, 0, ["$get", $rt_wrapFunction1(ju_ArrayList_get), "$size", $rt_wrapFunction0(ju_ArrayList_size), "$add", $rt_wrapFunction1(ju_ArrayList_add), "$remove", $rt_wrapFunction1(ju_ArrayList_remove), "$forEach", $rt_wrapFunction1(ju_ArrayList_forEach)],
ju_Set, 0, jl_Object, [ju_Collection], 1537, 0, 0, ["$forEach", $rt_wrapFunction1(jl_Iterable_forEach)],
ju_AbstractSet, 0, ju_AbstractCollection, [ju_Set], 1025, 0, 0, ["$forEach", $rt_wrapFunction1(jl_Iterable_forEach), "$equals", $rt_wrapFunction1(ju_AbstractSet_equals), "$hashCode", $rt_wrapFunction0(ju_AbstractSet_hashCode)],
ju_TemplateCollections$AbstractImmutableSet, 0, ju_AbstractSet, [], 1024, 0, 0, ["$forEach", $rt_wrapFunction1(jl_Iterable_forEach)],
ju_Collections$1, 0, ju_TemplateCollections$AbstractImmutableSet, [], 0, 0, 0, ["$forEach", $rt_wrapFunction1(jl_Iterable_forEach), "$size", $rt_wrapFunction0(ju_Collections$1_size), "$iterator", $rt_wrapFunction0(ju_Collections$1_iterator), "$isEmpty", $rt_wrapFunction0(ju_Collections$1_isEmpty)],
ju_TemplateCollections$AbstractImmutableMap, 0, ju_AbstractMap, [], 1024, 0, 0, ["$put", $rt_wrapFunction2(ju_TemplateCollections$AbstractImmutableMap_put)],
ju_Collections$2, 0, ju_TemplateCollections$AbstractImmutableMap, [], 0, 0, 0, 0,
ju_Collections$3, "Collections$3", 13, ju_TemplateCollections$AbstractImmutableList, [], 0, 0, 0, ["$forEach", $rt_wrapFunction1(jl_Iterable_forEach), "$get", $rt_wrapFunction1(ju_Collections$3_get), "$size", $rt_wrapFunction0(ju_Collections$3_size), "$iterator", $rt_wrapFunction0(ju_Collections$3_iterator), "$isEmpty", $rt_wrapFunction0(ju_Collections$3_isEmpty)],
ju_Iterator, 0, jl_Object, [], 1537, 0, 0, 0,
ju_Collections$4, 0, jl_Object, [ju_Iterator], 0, 0, 0, ["$hasNext", $rt_wrapFunction0(ju_Collections$4_hasNext), "$next", $rt_wrapFunction0(ju_Collections$4_next)],
ju_ListIterator, 0, jl_Object, [ju_Iterator], 1537, 0, 0, 0,
ju_Collections$5, 0, jl_Object, [ju_ListIterator], 0, 0, 0, 0,
ju_Collections$_clinit_$lambda$_59_0, 0, jl_Object, [ju_Comparator], 1, 0, 0, 0,
cgmmc_CardCollection, 0, jl_Object, [], 1537, 0, 0, 0,
cgmmc_AbstractCardCollection, 0, jl_Object, [cgmmc_CardCollection], 1025, 0, 0, ["$add0", $rt_wrapFunction1(cgmmc_AbstractCardCollection_add)],
cgmmc_PropertyCollection, 0, jl_Object, [], 1, 0, 0, 0,
jl_AutoCloseable, 0, jl_Object, [], 1537, 0, 0, 0,
jus_BaseStream, 0, jl_Object, [jl_AutoCloseable], 1537, 0, 0, 0,
jus_Stream, 0, jl_Object, [jus_BaseStream], 1537, 0, 0, 0,
w_BotPayment$findBestPayment$lambda$_1_0, 0, jl_Object, [juf_ToIntFunction], 1, 0, 0, ["$applyAsInt", $rt_wrapFunction1(w_BotPayment$findBestPayment$lambda$_1_0_applyAsInt)],
cgmmc_Payable, 0, jl_Object, [], 1537, 0, 0, 0,
cgmmc_Card, 0, jl_Object, [cgmmc_Payable], 1025, 0, 0, ["$canBeBanked", $rt_wrapFunction0(cgmmc_Card_canBeBanked), "$canPayFromTable", $rt_wrapFunction0(cgmmc_Card_canPayFromTable), "$toString", $rt_wrapFunction0(cgmmc_Card_toString)],
jl_NullPointerException, 0, jl_RuntimeException, [], 1, 0, 0, 0,
jur_AbstractSet, 0, jl_Object, [], 1024, 0, () => jur_AbstractSet_$callClinit(), ["$find1", $rt_wrapFunction3(jur_AbstractSet_find), "$findBack", $rt_wrapFunction4(jur_AbstractSet_findBack), "$getType0", $rt_wrapFunction0(jur_AbstractSet_getType), "$toString", $rt_wrapFunction0(jur_AbstractSet_toString), "$setNext", $rt_wrapFunction1(jur_AbstractSet_setNext), "$first", $rt_wrapFunction1(jur_AbstractSet_first), "$processBackRefReplacement", $rt_wrapFunction0(jur_AbstractSet_processBackRefReplacement), "$processSecondPass",
$rt_wrapFunction0(jur_AbstractSet_processSecondPass)],
jur_MatchResult, 0, jl_Object, [], 1537, 0, 0, 0,
jur_Matcher, 0, jl_Object, [jur_MatchResult], 17, 0, 0, 0,
jl_StringIndexOutOfBoundsException, 0, jl_IndexOutOfBoundsException, [], 1, 0, 0, 0,
ju_Comparator$comparingInt$lambda$_14_0, 0, jl_Object, [ju_Comparator], 1, 0, 0, ["$compare0", $rt_wrapFunction2(ju_Comparator$comparingInt$lambda$_14_0_compare)],
jur_FSet, "FSet", 14, jur_AbstractSet, [], 0, 0, () => jur_FSet_$callClinit(), ["$matches", $rt_wrapFunction3(jur_FSet_matches), "$getName", $rt_wrapFunction0(jur_FSet_getName), "$hasConsumed", $rt_wrapFunction1(jur_FSet_hasConsumed)],
jur_Lexer, 0, jl_Object, [], 0, 0, 0, 0,
jur_PatternSyntaxException, 0, jl_IllegalArgumentException, [], 1, 0, 0, ["$getMessage", $rt_wrapFunction0(jur_PatternSyntaxException_getMessage)],
jur_MatchResultImpl, 0, jl_Object, [jur_MatchResult], 0, 0, 0, 0,
ju_EnumSet, 0, ju_AbstractSet, [jl_Cloneable, ji_Serializable], 1025, 0, 0, ["$forEach", $rt_wrapFunction1(jl_Iterable_forEach)],
ju_GenericEnumSet, 0, ju_EnumSet, [], 0, 0, 0, ["$forEach", $rt_wrapFunction1(jl_Iterable_forEach), "$iterator", $rt_wrapFunction0(ju_GenericEnumSet_iterator), "$size", $rt_wrapFunction0(ju_GenericEnumSet_size), "$contains", $rt_wrapFunction1(ju_GenericEnumSet_contains)],
jl_System, 0, jl_Object, [], 17, 0, 0, 0,
jur_NonCapFSet, "NonCapFSet", 14, jur_FSet, [], 0, 0, 0, ["$matches", $rt_wrapFunction3(jur_NonCapFSet_matches), "$getName", $rt_wrapFunction0(jur_NonCapFSet_getName), "$hasConsumed", $rt_wrapFunction1(jur_NonCapFSet_hasConsumed)],
jur_AheadFSet, "AheadFSet", 14, jur_FSet, [], 0, 0, 0, ["$matches", $rt_wrapFunction3(jur_AheadFSet_matches), "$getName", $rt_wrapFunction0(jur_AheadFSet_getName)],
jur_BehindFSet, "BehindFSet", 14, jur_FSet, [], 0, 0, 0, ["$matches", $rt_wrapFunction3(jur_BehindFSet_matches), "$getName", $rt_wrapFunction0(jur_BehindFSet_getName)],
jur_AtomicFSet, "AtomicFSet", 14, jur_FSet, [], 0, 0, 0, ["$matches", $rt_wrapFunction3(jur_AtomicFSet_matches), "$getName", $rt_wrapFunction0(jur_AtomicFSet_getName), "$hasConsumed", $rt_wrapFunction1(jur_AtomicFSet_hasConsumed)]]);
$rt_metadata([jur_FinalSet, "FinalSet", 14, jur_FSet, [], 0, 0, 0, ["$matches", $rt_wrapFunction3(jur_FinalSet_matches), "$getName", $rt_wrapFunction0(jur_FinalSet_getName)],
jur_LeafSet, 0, jur_AbstractSet, [], 1024, 0, 0, ["$matches", $rt_wrapFunction3(jur_LeafSet_matches), "$charCount", $rt_wrapFunction0(jur_LeafSet_charCount), "$hasConsumed", $rt_wrapFunction1(jur_LeafSet_hasConsumed)],
jur_EmptySet, "EmptySet", 14, jur_LeafSet, [], 0, 0, 0, ["$accepts", $rt_wrapFunction2(jur_EmptySet_accepts), "$find1", $rt_wrapFunction3(jur_EmptySet_find), "$findBack", $rt_wrapFunction4(jur_EmptySet_findBack), "$getName", $rt_wrapFunction0(jur_EmptySet_getName), "$hasConsumed", $rt_wrapFunction1(jur_EmptySet_hasConsumed)],
jur_JointSet, "JointSet", 14, jur_AbstractSet, [], 0, 0, 0, ["$matches", $rt_wrapFunction3(jur_JointSet_matches), "$setNext", $rt_wrapFunction1(jur_JointSet_setNext), "$getName", $rt_wrapFunction0(jur_JointSet_getName), "$first", $rt_wrapFunction1(jur_JointSet_first), "$hasConsumed", $rt_wrapFunction1(jur_JointSet_hasConsumed), "$processSecondPass", $rt_wrapFunction0(jur_JointSet_processSecondPass)],
jur_NonCapJointSet, "NonCapJointSet", 14, jur_JointSet, [], 0, 0, 0, ["$matches", $rt_wrapFunction3(jur_NonCapJointSet_matches), "$getName", $rt_wrapFunction0(jur_NonCapJointSet_getName), "$hasConsumed", $rt_wrapFunction1(jur_NonCapJointSet_hasConsumed)],
jur_AtomicJointSet, "AtomicJointSet", 14, jur_NonCapJointSet, [], 0, 0, 0, ["$matches", $rt_wrapFunction3(jur_AtomicJointSet_matches), "$setNext", $rt_wrapFunction1(jur_AtomicJointSet_setNext), "$getName", $rt_wrapFunction0(jur_AtomicJointSet_getName)],
jur_PositiveLookAhead, "PositiveLookAhead", 14, jur_AtomicJointSet, [], 0, 0, 0, ["$matches", $rt_wrapFunction3(jur_PositiveLookAhead_matches), "$hasConsumed", $rt_wrapFunction1(jur_PositiveLookAhead_hasConsumed), "$getName", $rt_wrapFunction0(jur_PositiveLookAhead_getName)],
jur_NegativeLookAhead, "NegativeLookAhead", 14, jur_AtomicJointSet, [], 0, 0, 0, ["$matches", $rt_wrapFunction3(jur_NegativeLookAhead_matches), "$hasConsumed", $rt_wrapFunction1(jur_NegativeLookAhead_hasConsumed), "$getName", $rt_wrapFunction0(jur_NegativeLookAhead_getName)],
jur_PositiveLookBehind, "PositiveLookBehind", 14, jur_AtomicJointSet, [], 0, 0, 0, ["$matches", $rt_wrapFunction3(jur_PositiveLookBehind_matches), "$hasConsumed", $rt_wrapFunction1(jur_PositiveLookBehind_hasConsumed), "$getName", $rt_wrapFunction0(jur_PositiveLookBehind_getName)],
jur_NegativeLookBehind, "NegativeLookBehind", 14, jur_AtomicJointSet, [], 0, 0, 0, ["$matches", $rt_wrapFunction3(jur_NegativeLookBehind_matches), "$hasConsumed", $rt_wrapFunction1(jur_NegativeLookBehind_hasConsumed), "$getName", $rt_wrapFunction0(jur_NegativeLookBehind_getName)],
jur_SingleSet, "SingleSet", 14, jur_JointSet, [], 0, 0, 0, ["$matches", $rt_wrapFunction3(jur_SingleSet_matches), "$find1", $rt_wrapFunction3(jur_SingleSet_find), "$findBack", $rt_wrapFunction4(jur_SingleSet_findBack), "$first", $rt_wrapFunction1(jur_SingleSet_first), "$processBackRefReplacement", $rt_wrapFunction0(jur_SingleSet_processBackRefReplacement), "$processSecondPass", $rt_wrapFunction0(jur_SingleSet_processSecondPass)],
jlr_Array, 0, jl_Object, [], 17, 0, 0, 0,
jl_ArrayStoreException, 0, jl_RuntimeException, [], 1, 0, 0, 0,
jur_SpecialToken, 0, jl_Object, [], 1024, 0, 0, 0,
jur_AbstractCharClass, 0, jur_SpecialToken, [], 1024, 0, () => jur_AbstractCharClass_$callClinit(), ["$getBits", $rt_wrapFunction0(jur_AbstractCharClass_getBits), "$getLowHighSurrogates", $rt_wrapFunction0(jur_AbstractCharClass_getLowHighSurrogates), "$getInstance0", $rt_wrapFunction0(jur_AbstractCharClass_getInstance), "$hasUCI", $rt_wrapFunction0(jur_AbstractCharClass_hasUCI)],
ju_MissingResourceException, 0, jl_RuntimeException, [], 1, 0, 0, 0,
jur_CharClass, "CharClass", 14, jur_AbstractCharClass, [], 0, 0, 0, ["$contains0", $rt_wrapFunction1(jur_CharClass_contains), "$getBits", $rt_wrapFunction0(jur_CharClass_getBits), "$getLowHighSurrogates", $rt_wrapFunction0(jur_CharClass_getLowHighSurrogates), "$getInstance0", $rt_wrapFunction0(jur_CharClass_getInstance), "$toString", $rt_wrapFunction0(jur_CharClass_toString), "$hasUCI", $rt_wrapFunction0(jur_CharClass_hasUCI)],
jur_QuantifierSet, 0, jur_AbstractSet, [], 1024, 0, 0, ["$first", $rt_wrapFunction1(jur_QuantifierSet_first), "$hasConsumed", $rt_wrapFunction1(jur_QuantifierSet_hasConsumed), "$processSecondPass", $rt_wrapFunction0(jur_QuantifierSet_processSecondPass)],
jur_LeafQuantifierSet, "LeafQuantifierSet", 14, jur_QuantifierSet, [], 0, 0, 0, ["$matches", $rt_wrapFunction3(jur_LeafQuantifierSet_matches), "$getName", $rt_wrapFunction0(jur_LeafQuantifierSet_getName)],
jur_CompositeQuantifierSet, "CompositeQuantifierSet", 14, jur_LeafQuantifierSet, [], 0, 0, 0, ["$matches", $rt_wrapFunction3(jur_CompositeQuantifierSet_matches), "$getName", $rt_wrapFunction0(jur_CompositeQuantifierSet_getName)],
jur_GroupQuantifierSet, "GroupQuantifierSet", 14, jur_QuantifierSet, [], 0, 0, 0, ["$matches", $rt_wrapFunction3(jur_GroupQuantifierSet_matches), "$getName", $rt_wrapFunction0(jur_GroupQuantifierSet_getName)],
jur_AltQuantifierSet, "AltQuantifierSet", 14, jur_LeafQuantifierSet, [], 0, 0, 0, ["$matches", $rt_wrapFunction3(jur_AltQuantifierSet_matches), "$setNext", $rt_wrapFunction1(jur_AltQuantifierSet_setNext)],
jur_UnifiedQuantifierSet, "UnifiedQuantifierSet", 14, jur_LeafQuantifierSet, [], 0, 0, 0, ["$matches", $rt_wrapFunction3(jur_UnifiedQuantifierSet_matches), "$find1", $rt_wrapFunction3(jur_UnifiedQuantifierSet_find)],
ju_Collections$13, 0, ju_AbstractMap, [], 0, 0, 0, 0,
jl_Math, 0, jl_Object, [], 17, 0, 0, 0,
jur_AbstractCharClass$PredefinedCharacterClasses, 0, jl_Object, [], 16, 0, () => jur_AbstractCharClass$PredefinedCharacterClasses_$callClinit(), 0,
jur_AbstractCharClass$LazyCharClass, 0, jl_Object, [], 1024, 0, 0, 0,
jl_NumberFormatException, 0, jl_IllegalArgumentException, [], 1, 0, 0, 0,
jur_Quantifier, "Quantifier", 14, jur_SpecialToken, [jl_Cloneable], 0, 0, 0, ["$toString", $rt_wrapFunction0(jur_Quantifier_toString)],
jur_FSet$PossessiveFSet, "FSet$PossessiveFSet", 14, jur_AbstractSet, [], 0, 0, 0, ["$matches", $rt_wrapFunction3(jur_FSet$PossessiveFSet_matches), "$getName", $rt_wrapFunction0(jur_FSet$PossessiveFSet_getName), "$hasConsumed", $rt_wrapFunction1(jur_FSet$PossessiveFSet_hasConsumed)],
ju_BitSet, 0, jl_Object, [jl_Cloneable, ji_Serializable], 1, 0, 0, 0,
jur_LowHighSurrogateRangeSet, 0, jur_JointSet, [], 0, 0, 0, ["$getName", $rt_wrapFunction0(jur_LowHighSurrogateRangeSet_getName)],
jur_CompositeRangeSet, "CompositeRangeSet", 14, jur_JointSet, [], 0, 0, 0, ["$matches", $rt_wrapFunction3(jur_CompositeRangeSet_matches), "$setNext", $rt_wrapFunction1(jur_CompositeRangeSet_setNext), "$getName", $rt_wrapFunction0(jur_CompositeRangeSet_getName), "$hasConsumed", $rt_wrapFunction1(jur_CompositeRangeSet_hasConsumed), "$first", $rt_wrapFunction1(jur_CompositeRangeSet_first)],
jur_SupplRangeSet, "SupplRangeSet", 14, jur_JointSet, [], 0, 0, 0, ["$matches", $rt_wrapFunction3(jur_SupplRangeSet_matches), "$getName", $rt_wrapFunction0(jur_SupplRangeSet_getName), "$contains0", $rt_wrapFunction1(jur_SupplRangeSet_contains), "$first", $rt_wrapFunction1(jur_SupplRangeSet_first), "$setNext", $rt_wrapFunction1(jur_SupplRangeSet_setNext), "$hasConsumed", $rt_wrapFunction1(jur_SupplRangeSet_hasConsumed)],
jur_UCISupplRangeSet, "UCISupplRangeSet", 14, jur_SupplRangeSet, [], 0, 0, 0, ["$contains0", $rt_wrapFunction1(jur_UCISupplRangeSet_contains), "$getName", $rt_wrapFunction0(jur_UCISupplRangeSet_getName)],
jur_UCIRangeSet, "UCIRangeSet", 14, jur_LeafSet, [], 0, 0, 0, ["$accepts", $rt_wrapFunction2(jur_UCIRangeSet_accepts), "$getName", $rt_wrapFunction0(jur_UCIRangeSet_getName)],
jur_RangeSet, "RangeSet", 14, jur_LeafSet, [], 0, 0, 0, ["$accepts", $rt_wrapFunction2(jur_RangeSet_accepts), "$getName", $rt_wrapFunction0(jur_RangeSet_getName), "$first", $rt_wrapFunction1(jur_RangeSet_first)],
jur_HangulDecomposedCharSet, "HangulDecomposedCharSet", 14, jur_JointSet, [], 0, 0, 0, ["$setNext", $rt_wrapFunction1(jur_HangulDecomposedCharSet_setNext), "$getName", $rt_wrapFunction0(jur_HangulDecomposedCharSet_getName), "$matches", $rt_wrapFunction3(jur_HangulDecomposedCharSet_matches), "$first", $rt_wrapFunction1(jur_HangulDecomposedCharSet_first), "$hasConsumed", $rt_wrapFunction1(jur_HangulDecomposedCharSet_hasConsumed)],
jur_CharSet, "CharSet", 14, jur_LeafSet, [], 0, 0, 0, ["$charCount", $rt_wrapFunction0(jur_CharSet_charCount), "$accepts", $rt_wrapFunction2(jur_CharSet_accepts), "$find1", $rt_wrapFunction3(jur_CharSet_find), "$findBack", $rt_wrapFunction4(jur_CharSet_findBack), "$getName", $rt_wrapFunction0(jur_CharSet_getName), "$first", $rt_wrapFunction1(jur_CharSet_first)],
jur_UCICharSet, "UCICharSet", 14, jur_LeafSet, [], 0, 0, 0, ["$accepts", $rt_wrapFunction2(jur_UCICharSet_accepts), "$getName", $rt_wrapFunction0(jur_UCICharSet_getName)],
jur_CICharSet, "CICharSet", 14, jur_LeafSet, [], 0, 0, 0, ["$accepts", $rt_wrapFunction2(jur_CICharSet_accepts), "$getName", $rt_wrapFunction0(jur_CICharSet_getName)],
jur_DecomposedCharSet, "DecomposedCharSet", 14, jur_JointSet, [], 0, 0, 0, ["$setNext", $rt_wrapFunction1(jur_DecomposedCharSet_setNext), "$matches", $rt_wrapFunction3(jur_DecomposedCharSet_matches), "$getName", $rt_wrapFunction0(jur_DecomposedCharSet_getName), "$first", $rt_wrapFunction1(jur_DecomposedCharSet_first), "$hasConsumed", $rt_wrapFunction1(jur_DecomposedCharSet_hasConsumed)],
jur_UCIDecomposedCharSet, "UCIDecomposedCharSet", 14, jur_DecomposedCharSet, [], 0, 0, 0, 0,
jur_CIDecomposedCharSet, "CIDecomposedCharSet", 14, jur_DecomposedCharSet, [], 0, 0, 0, 0,
jur_PossessiveGroupQuantifierSet, "PossessiveGroupQuantifierSet", 14, jur_GroupQuantifierSet, [], 0, 0, 0, ["$matches", $rt_wrapFunction3(jur_PossessiveGroupQuantifierSet_matches)],
jur_PosPlusGroupQuantifierSet, "PosPlusGroupQuantifierSet", 14, jur_GroupQuantifierSet, [], 0, 0, 0, ["$matches", $rt_wrapFunction3(jur_PosPlusGroupQuantifierSet_matches)],
jur_AltGroupQuantifierSet, "AltGroupQuantifierSet", 14, jur_GroupQuantifierSet, [], 0, 0, 0, ["$matches", $rt_wrapFunction3(jur_AltGroupQuantifierSet_matches), "$setNext", $rt_wrapFunction1(jur_AltGroupQuantifierSet_setNext)],
jur_PosAltGroupQuantifierSet, "PosAltGroupQuantifierSet", 14, jur_AltGroupQuantifierSet, [], 0, 0, 0, ["$matches", $rt_wrapFunction3(jur_PosAltGroupQuantifierSet_matches), "$setNext", $rt_wrapFunction1(jur_PosAltGroupQuantifierSet_setNext)],
jur_CompositeGroupQuantifierSet, "CompositeGroupQuantifierSet", 14, jur_GroupQuantifierSet, [], 0, 0, 0, ["$matches", $rt_wrapFunction3(jur_CompositeGroupQuantifierSet_matches), "$getName", $rt_wrapFunction0(jur_CompositeGroupQuantifierSet_getName)],
jur_PosCompositeGroupQuantifierSet, "PosCompositeGroupQuantifierSet", 14, jur_CompositeGroupQuantifierSet, [], 0, 0, 0, ["$matches", $rt_wrapFunction3(jur_PosCompositeGroupQuantifierSet_matches)]]);
$rt_metadata([jur_ReluctantGroupQuantifierSet, "ReluctantGroupQuantifierSet", 14, jur_GroupQuantifierSet, [], 0, 0, 0, ["$matches", $rt_wrapFunction3(jur_ReluctantGroupQuantifierSet_matches)],
jur_RelAltGroupQuantifierSet, "RelAltGroupQuantifierSet", 14, jur_AltGroupQuantifierSet, [], 0, 0, 0, ["$matches", $rt_wrapFunction3(jur_RelAltGroupQuantifierSet_matches)],
jur_RelCompositeGroupQuantifierSet, "RelCompositeGroupQuantifierSet", 14, jur_CompositeGroupQuantifierSet, [], 0, 0, 0, ["$matches", $rt_wrapFunction3(jur_RelCompositeGroupQuantifierSet_matches)],
jur_DotAllQuantifierSet, "DotAllQuantifierSet", 14, jur_QuantifierSet, [], 0, 0, 0, ["$matches", $rt_wrapFunction3(jur_DotAllQuantifierSet_matches), "$find1", $rt_wrapFunction3(jur_DotAllQuantifierSet_find), "$getName", $rt_wrapFunction0(jur_DotAllQuantifierSet_getName)],
jur_DotQuantifierSet, "DotQuantifierSet", 14, jur_QuantifierSet, [], 0, 0, 0, ["$matches", $rt_wrapFunction3(jur_DotQuantifierSet_matches), "$find1", $rt_wrapFunction3(jur_DotQuantifierSet_find), "$getName", $rt_wrapFunction0(jur_DotQuantifierSet_getName)],
jur_AbstractLineTerminator, 0, jl_Object, [], 1024, 0, 0, 0,
jur_PossessiveQuantifierSet, "PossessiveQuantifierSet", 14, jur_LeafQuantifierSet, [], 0, 0, 0, ["$matches", $rt_wrapFunction3(jur_PossessiveQuantifierSet_matches)],
jur_PossessiveAltQuantifierSet, "PossessiveAltQuantifierSet", 14, jur_AltQuantifierSet, [], 0, 0, 0, ["$matches", $rt_wrapFunction3(jur_PossessiveAltQuantifierSet_matches)],
jur_PossessiveCompositeQuantifierSet, "PossessiveCompositeQuantifierSet", 14, jur_CompositeQuantifierSet, [], 0, 0, 0, ["$matches", $rt_wrapFunction3(jur_PossessiveCompositeQuantifierSet_matches)],
jur_ReluctantQuantifierSet, "ReluctantQuantifierSet", 14, jur_LeafQuantifierSet, [], 0, 0, 0, ["$matches", $rt_wrapFunction3(jur_ReluctantQuantifierSet_matches)],
jur_ReluctantAltQuantifierSet, "ReluctantAltQuantifierSet", 14, jur_AltQuantifierSet, [], 0, 0, 0, ["$matches", $rt_wrapFunction3(jur_ReluctantAltQuantifierSet_matches)],
jur_ReluctantCompositeQuantifierSet, "ReluctantCompositeQuantifierSet", 14, jur_CompositeQuantifierSet, [], 0, 0, 0, ["$matches", $rt_wrapFunction3(jur_ReluctantCompositeQuantifierSet_matches)],
jur_SOLSet, "SOLSet", 14, jur_AbstractSet, [], 16, 0, 0, ["$matches", $rt_wrapFunction3(jur_SOLSet_matches), "$hasConsumed", $rt_wrapFunction1(jur_SOLSet_hasConsumed), "$getName", $rt_wrapFunction0(jur_SOLSet_getName)],
jur_WordBoundary, "WordBoundary", 14, jur_AbstractSet, [], 0, 0, 0, ["$matches", $rt_wrapFunction3(jur_WordBoundary_matches), "$hasConsumed", $rt_wrapFunction1(jur_WordBoundary_hasConsumed), "$getName", $rt_wrapFunction0(jur_WordBoundary_getName)],
jur_PreviousMatch, "PreviousMatch", 14, jur_AbstractSet, [], 0, 0, 0, ["$matches", $rt_wrapFunction3(jur_PreviousMatch_matches), "$hasConsumed", $rt_wrapFunction1(jur_PreviousMatch_hasConsumed), "$getName", $rt_wrapFunction0(jur_PreviousMatch_getName)],
jur_EOLSet, "EOLSet", 14, jur_AbstractSet, [], 16, 0, 0, ["$matches", $rt_wrapFunction3(jur_EOLSet_matches), "$hasConsumed", $rt_wrapFunction1(jur_EOLSet_hasConsumed), "$getName", $rt_wrapFunction0(jur_EOLSet_getName)],
jur_EOISet, "EOISet", 14, jur_AbstractSet, [], 0, 0, 0, ["$matches", $rt_wrapFunction3(jur_EOISet_matches), "$hasConsumed", $rt_wrapFunction1(jur_EOISet_hasConsumed), "$getName", $rt_wrapFunction0(jur_EOISet_getName)],
jur_MultiLineSOLSet, "MultiLineSOLSet", 14, jur_AbstractSet, [], 0, 0, 0, ["$matches", $rt_wrapFunction3(jur_MultiLineSOLSet_matches), "$hasConsumed", $rt_wrapFunction1(jur_MultiLineSOLSet_hasConsumed), "$getName", $rt_wrapFunction0(jur_MultiLineSOLSet_getName)],
jur_DotAllSet, "DotAllSet", 14, jur_JointSet, [], 0, 0, 0, ["$matches", $rt_wrapFunction3(jur_DotAllSet_matches), "$getName", $rt_wrapFunction0(jur_DotAllSet_getName), "$setNext", $rt_wrapFunction1(jur_DotAllSet_setNext), "$getType0", $rt_wrapFunction0(jur_DotAllSet_getType), "$hasConsumed", $rt_wrapFunction1(jur_DotAllSet_hasConsumed)],
jur_DotSet, "DotSet", 14, jur_JointSet, [], 16, 0, 0, ["$matches", $rt_wrapFunction3(jur_DotSet_matches), "$getName", $rt_wrapFunction0(jur_DotSet_getName), "$setNext", $rt_wrapFunction1(jur_DotSet_setNext), "$getType0", $rt_wrapFunction0(jur_DotSet_getType), "$hasConsumed", $rt_wrapFunction1(jur_DotSet_hasConsumed)],
jur_UEOLSet, "UEOLSet", 14, jur_AbstractSet, [], 16, 0, 0, ["$matches", $rt_wrapFunction3(jur_UEOLSet_matches), "$hasConsumed", $rt_wrapFunction1(jur_UEOLSet_hasConsumed), "$getName", $rt_wrapFunction0(jur_UEOLSet_getName)],
jur_UMultiLineEOLSet, "UMultiLineEOLSet", 14, jur_AbstractSet, [], 0, 0, 0, ["$matches", $rt_wrapFunction3(jur_UMultiLineEOLSet_matches), "$hasConsumed", $rt_wrapFunction1(jur_UMultiLineEOLSet_hasConsumed), "$getName", $rt_wrapFunction0(jur_UMultiLineEOLSet_getName)],
jur_MultiLineEOLSet, "MultiLineEOLSet", 14, jur_AbstractSet, [], 0, 0, 0, ["$matches", $rt_wrapFunction3(jur_MultiLineEOLSet_matches), "$hasConsumed", $rt_wrapFunction1(jur_MultiLineEOLSet_hasConsumed), "$getName", $rt_wrapFunction0(jur_MultiLineEOLSet_getName)],
jur_CIBackReferenceSet, "CIBackReferenceSet", 14, jur_JointSet, [], 0, 0, 0, ["$matches", $rt_wrapFunction3(jur_CIBackReferenceSet_matches), "$setNext", $rt_wrapFunction1(jur_CIBackReferenceSet_setNext), "$getName", $rt_wrapFunction0(jur_CIBackReferenceSet_getName), "$hasConsumed", $rt_wrapFunction1(jur_CIBackReferenceSet_hasConsumed)],
jur_BackReferenceSet, "BackReferenceSet", 14, jur_CIBackReferenceSet, [], 0, 0, 0, ["$matches", $rt_wrapFunction3(jur_BackReferenceSet_matches), "$find1", $rt_wrapFunction3(jur_BackReferenceSet_find), "$findBack", $rt_wrapFunction4(jur_BackReferenceSet_findBack), "$first", $rt_wrapFunction1(jur_BackReferenceSet_first), "$getName", $rt_wrapFunction0(jur_BackReferenceSet_getName)],
jur_UCIBackReferenceSet, "UCIBackReferenceSet", 14, jur_CIBackReferenceSet, [], 0, 0, 0, ["$matches", $rt_wrapFunction3(jur_UCIBackReferenceSet_matches), "$getName", $rt_wrapFunction0(jur_UCIBackReferenceSet_getName)],
jl_StringBuffer, 0, jl_AbstractStringBuilder, [jl_Appendable], 1, 0, 0, ["$insert1", $rt_wrapFunction4(jl_StringBuffer_insert0), "$append3", $rt_wrapFunction3(jl_StringBuffer_append), "$ensureCapacity", $rt_wrapFunction1(jl_StringBuffer_ensureCapacity), "$insert0", $rt_wrapFunction2(jl_StringBuffer_insert)],
jur_SequenceSet, "SequenceSet", 14, jur_LeafSet, [], 0, 0, 0, ["$accepts", $rt_wrapFunction2(jur_SequenceSet_accepts), "$find1", $rt_wrapFunction3(jur_SequenceSet_find), "$findBack", $rt_wrapFunction4(jur_SequenceSet_findBack), "$getName", $rt_wrapFunction0(jur_SequenceSet_getName), "$first", $rt_wrapFunction1(jur_SequenceSet_first)],
jur_UCISequenceSet, "UCISequenceSet", 14, jur_LeafSet, [], 0, 0, 0, ["$accepts", $rt_wrapFunction2(jur_UCISequenceSet_accepts), "$getName", $rt_wrapFunction0(jur_UCISequenceSet_getName)],
jur_CISequenceSet, "CISequenceSet", 14, jur_LeafSet, [], 0, 0, 0, ["$accepts", $rt_wrapFunction2(jur_CISequenceSet_accepts), "$getName", $rt_wrapFunction0(jur_CISequenceSet_getName)],
jur_UCISupplCharSet, "UCISupplCharSet", 14, jur_LeafSet, [], 0, 0, 0, ["$accepts", $rt_wrapFunction2(jur_UCISupplCharSet_accepts), "$getName", $rt_wrapFunction0(jur_UCISupplCharSet_getName)],
jur_LowSurrogateCharSet, "LowSurrogateCharSet", 14, jur_JointSet, [], 0, 0, 0, ["$setNext", $rt_wrapFunction1(jur_LowSurrogateCharSet_setNext), "$matches", $rt_wrapFunction3(jur_LowSurrogateCharSet_matches), "$find1", $rt_wrapFunction3(jur_LowSurrogateCharSet_find), "$findBack", $rt_wrapFunction4(jur_LowSurrogateCharSet_findBack), "$getName", $rt_wrapFunction0(jur_LowSurrogateCharSet_getName), "$first", $rt_wrapFunction1(jur_LowSurrogateCharSet_first), "$hasConsumed", $rt_wrapFunction1(jur_LowSurrogateCharSet_hasConsumed)],
jur_HighSurrogateCharSet, "HighSurrogateCharSet", 14, jur_JointSet, [], 0, 0, 0, ["$setNext", $rt_wrapFunction1(jur_HighSurrogateCharSet_setNext), "$matches", $rt_wrapFunction3(jur_HighSurrogateCharSet_matches), "$find1", $rt_wrapFunction3(jur_HighSurrogateCharSet_find), "$findBack", $rt_wrapFunction4(jur_HighSurrogateCharSet_findBack), "$getName", $rt_wrapFunction0(jur_HighSurrogateCharSet_getName), "$first", $rt_wrapFunction1(jur_HighSurrogateCharSet_first), "$hasConsumed", $rt_wrapFunction1(jur_HighSurrogateCharSet_hasConsumed)],
jur_SupplCharSet, "SupplCharSet", 14, jur_LeafSet, [], 0, 0, 0, ["$accepts", $rt_wrapFunction2(jur_SupplCharSet_accepts), "$find1", $rt_wrapFunction3(jur_SupplCharSet_find), "$findBack", $rt_wrapFunction4(jur_SupplCharSet_findBack), "$getName", $rt_wrapFunction0(jur_SupplCharSet_getName), "$first", $rt_wrapFunction1(jur_SupplCharSet_first)],
jur_AbstractLineTerminator$1, 0, jur_AbstractLineTerminator, [], 0, 0, 0, ["$isLineTerminator", $rt_wrapFunction1(jur_AbstractLineTerminator$1_isLineTerminator), "$isAfterLineTerminator", $rt_wrapFunction2(jur_AbstractLineTerminator$1_isAfterLineTerminator)],
jur_AbstractLineTerminator$2, 0, jur_AbstractLineTerminator, [], 0, 0, 0, ["$isLineTerminator", $rt_wrapFunction1(jur_AbstractLineTerminator$2_isLineTerminator), "$isAfterLineTerminator", $rt_wrapFunction2(jur_AbstractLineTerminator$2_isAfterLineTerminator)],
jur_SequenceSet$IntHash, 0, jl_Object, [], 0, 0, 0, 0,
jur_AbstractCharClass$LazySpace, 0, jur_AbstractCharClass$LazyCharClass, [], 0, 0, 0, ["$computeValue", $rt_wrapFunction0(jur_AbstractCharClass$LazySpace_computeValue)],
jur_AbstractCharClass$LazyDigit, 0, jur_AbstractCharClass$LazyCharClass, [], 0, 0, 0, ["$computeValue", $rt_wrapFunction0(jur_AbstractCharClass$LazyDigit_computeValue)],
jur_AbstractCharClass$LazyLower, 0, jur_AbstractCharClass$LazyCharClass, [], 0, 0, 0, ["$computeValue", $rt_wrapFunction0(jur_AbstractCharClass$LazyLower_computeValue)],
jur_AbstractCharClass$LazyUpper, 0, jur_AbstractCharClass$LazyCharClass, [], 0, 0, 0, ["$computeValue", $rt_wrapFunction0(jur_AbstractCharClass$LazyUpper_computeValue)],
jur_AbstractCharClass$LazyASCII, 0, jur_AbstractCharClass$LazyCharClass, [], 0, 0, 0, ["$computeValue", $rt_wrapFunction0(jur_AbstractCharClass$LazyASCII_computeValue)],
jur_AbstractCharClass$LazyAlpha, 0, jur_AbstractCharClass$LazyCharClass, [], 0, 0, 0, ["$computeValue", $rt_wrapFunction0(jur_AbstractCharClass$LazyAlpha_computeValue)],
jur_AbstractCharClass$LazyAlnum, 0, jur_AbstractCharClass$LazyAlpha, [], 0, 0, 0, ["$computeValue", $rt_wrapFunction0(jur_AbstractCharClass$LazyAlnum_computeValue)],
jur_AbstractCharClass$LazyPunct, 0, jur_AbstractCharClass$LazyCharClass, [], 0, 0, 0, ["$computeValue", $rt_wrapFunction0(jur_AbstractCharClass$LazyPunct_computeValue)],
jur_AbstractCharClass$LazyGraph, 0, jur_AbstractCharClass$LazyAlnum, [], 0, 0, 0, ["$computeValue", $rt_wrapFunction0(jur_AbstractCharClass$LazyGraph_computeValue)],
jur_AbstractCharClass$LazyPrint, 0, jur_AbstractCharClass$LazyGraph, [], 0, 0, 0, ["$computeValue", $rt_wrapFunction0(jur_AbstractCharClass$LazyPrint_computeValue)],
jur_AbstractCharClass$LazyBlank, 0, jur_AbstractCharClass$LazyCharClass, [], 0, 0, 0, ["$computeValue", $rt_wrapFunction0(jur_AbstractCharClass$LazyBlank_computeValue)],
jur_AbstractCharClass$LazyCntrl, 0, jur_AbstractCharClass$LazyCharClass, [], 0, 0, 0, ["$computeValue", $rt_wrapFunction0(jur_AbstractCharClass$LazyCntrl_computeValue)],
jur_AbstractCharClass$LazyXDigit, 0, jur_AbstractCharClass$LazyCharClass, [], 0, 0, 0, ["$computeValue", $rt_wrapFunction0(jur_AbstractCharClass$LazyXDigit_computeValue)]]);
$rt_metadata([jur_AbstractCharClass$LazyJavaLowerCase, 0, jur_AbstractCharClass$LazyCharClass, [], 0, 0, 0, ["$computeValue", $rt_wrapFunction0(jur_AbstractCharClass$LazyJavaLowerCase_computeValue)],
jur_AbstractCharClass$LazyJavaUpperCase, 0, jur_AbstractCharClass$LazyCharClass, [], 0, 0, 0, ["$computeValue", $rt_wrapFunction0(jur_AbstractCharClass$LazyJavaUpperCase_computeValue)],
jur_AbstractCharClass$LazyJavaWhitespace, 0, jur_AbstractCharClass$LazyCharClass, [], 0, 0, 0, ["$computeValue", $rt_wrapFunction0(jur_AbstractCharClass$LazyJavaWhitespace_computeValue)],
jur_AbstractCharClass$LazyJavaMirrored, 0, jur_AbstractCharClass$LazyCharClass, [], 0, 0, 0, ["$computeValue", $rt_wrapFunction0(jur_AbstractCharClass$LazyJavaMirrored_computeValue)],
jur_AbstractCharClass$LazyJavaDefined, 0, jur_AbstractCharClass$LazyCharClass, [], 0, 0, 0, ["$computeValue", $rt_wrapFunction0(jur_AbstractCharClass$LazyJavaDefined_computeValue)],
jur_AbstractCharClass$LazyJavaDigit, 0, jur_AbstractCharClass$LazyCharClass, [], 0, 0, 0, ["$computeValue", $rt_wrapFunction0(jur_AbstractCharClass$LazyJavaDigit_computeValue)],
jur_AbstractCharClass$LazyJavaIdentifierIgnorable, 0, jur_AbstractCharClass$LazyCharClass, [], 0, 0, 0, ["$computeValue", $rt_wrapFunction0(jur_AbstractCharClass$LazyJavaIdentifierIgnorable_computeValue)],
jur_AbstractCharClass$LazyJavaISOControl, 0, jur_AbstractCharClass$LazyCharClass, [], 0, 0, 0, ["$computeValue", $rt_wrapFunction0(jur_AbstractCharClass$LazyJavaISOControl_computeValue)],
jur_AbstractCharClass$LazyJavaJavaIdentifierPart, 0, jur_AbstractCharClass$LazyCharClass, [], 0, 0, 0, ["$computeValue", $rt_wrapFunction0(jur_AbstractCharClass$LazyJavaJavaIdentifierPart_computeValue)],
jur_AbstractCharClass$LazyJavaJavaIdentifierStart, 0, jur_AbstractCharClass$LazyCharClass, [], 0, 0, 0, ["$computeValue", $rt_wrapFunction0(jur_AbstractCharClass$LazyJavaJavaIdentifierStart_computeValue)],
jur_AbstractCharClass$LazyJavaLetter, 0, jur_AbstractCharClass$LazyCharClass, [], 0, 0, 0, ["$computeValue", $rt_wrapFunction0(jur_AbstractCharClass$LazyJavaLetter_computeValue)],
jur_AbstractCharClass$LazyJavaLetterOrDigit, 0, jur_AbstractCharClass$LazyCharClass, [], 0, 0, 0, ["$computeValue", $rt_wrapFunction0(jur_AbstractCharClass$LazyJavaLetterOrDigit_computeValue)],
jur_AbstractCharClass$LazyJavaSpaceChar, 0, jur_AbstractCharClass$LazyCharClass, [], 0, 0, 0, ["$computeValue", $rt_wrapFunction0(jur_AbstractCharClass$LazyJavaSpaceChar_computeValue)],
jur_AbstractCharClass$LazyJavaTitleCase, 0, jur_AbstractCharClass$LazyCharClass, [], 0, 0, 0, ["$computeValue", $rt_wrapFunction0(jur_AbstractCharClass$LazyJavaTitleCase_computeValue)],
jur_AbstractCharClass$LazyJavaUnicodeIdentifierPart, 0, jur_AbstractCharClass$LazyCharClass, [], 0, 0, 0, ["$computeValue", $rt_wrapFunction0(jur_AbstractCharClass$LazyJavaUnicodeIdentifierPart_computeValue)],
jur_AbstractCharClass$LazyJavaUnicodeIdentifierStart, 0, jur_AbstractCharClass$LazyCharClass, [], 0, 0, 0, ["$computeValue", $rt_wrapFunction0(jur_AbstractCharClass$LazyJavaUnicodeIdentifierStart_computeValue)],
jur_AbstractCharClass$LazyWord, 0, jur_AbstractCharClass$LazyCharClass, [], 0, 0, 0, ["$computeValue", $rt_wrapFunction0(jur_AbstractCharClass$LazyWord_computeValue)],
jur_AbstractCharClass$LazyNonWord, 0, jur_AbstractCharClass$LazyWord, [], 0, 0, 0, ["$computeValue", $rt_wrapFunction0(jur_AbstractCharClass$LazyNonWord_computeValue)],
jur_AbstractCharClass$LazyNonSpace, 0, jur_AbstractCharClass$LazySpace, [], 0, 0, 0, ["$computeValue", $rt_wrapFunction0(jur_AbstractCharClass$LazyNonSpace_computeValue)],
jur_AbstractCharClass$LazyNonDigit, 0, jur_AbstractCharClass$LazyDigit, [], 0, 0, 0, ["$computeValue", $rt_wrapFunction0(jur_AbstractCharClass$LazyNonDigit_computeValue)],
jur_AbstractCharClass$LazyRange, 0, jur_AbstractCharClass$LazyCharClass, [], 0, 0, 0, ["$computeValue", $rt_wrapFunction0(jur_AbstractCharClass$LazyRange_computeValue)],
jur_AbstractCharClass$LazySpecialsBlock, 0, jur_AbstractCharClass$LazyCharClass, [], 0, 0, 0, ["$computeValue", $rt_wrapFunction0(jur_AbstractCharClass$LazySpecialsBlock_computeValue)],
jur_AbstractCharClass$LazyCategory, 0, jur_AbstractCharClass$LazyCharClass, [], 0, 0, 0, ["$computeValue", $rt_wrapFunction0(jur_AbstractCharClass$LazyCategory_computeValue)],
jur_AbstractCharClass$LazyCategoryScope, 0, jur_AbstractCharClass$LazyCharClass, [], 0, 0, 0, ["$computeValue", $rt_wrapFunction0(jur_AbstractCharClass$LazyCategoryScope_computeValue)],
jl_NegativeArraySizeException, 0, jl_RuntimeException, [], 1, 0, 0, 0,
jur_IntHash, 0, jl_Object, [], 0, 0, 0, 0,
otpp_ResourceAccessor, 0, jl_Object, [], 16, 0, 0, 0,
otciu_UnicodeHelper, 0, jl_Object, [], 17, 0, 0, 0,
otciu_CharMapping, 0, jl_Object, [], 1, 0, 0, 0,
otciu_UnicodeHelper$Range, "UnicodeHelper$Range", 21, jl_Object, [], 1, 0, 0, 0,
otci_CharFlow, 0, jl_Object, [], 1, 0, 0, 0,
otci_Base46, 0, jl_Object, [], 17, 0, 0, 0,
cgme_GameInitializer, 0, jl_Object, [], 1, 0, 0, 0,
cgme_CardFactory, 0, jl_Object, [], 1, 0, () => cgme_CardFactory_$callClinit(), 0,
cgma_BotStrategy, 0, jl_Object, [], 1537, 0, 0, 0,
cgma_SimpleBotStrategy, 0, jl_Object, [cgma_BotStrategy], 1, 0, 0, 0,
jusi_SimpleStreamImpl, 0, jl_Object, [jus_Stream], 1025, 0, 0, ["$estimateSize", $rt_wrapFunction0(jusi_SimpleStreamImpl_estimateSize)],
jusi_StreamOverSpliterator, 0, jusi_SimpleStreamImpl, [], 1, 0, 0, ["$next1", $rt_wrapFunction1(jusi_StreamOverSpliterator_next), "$estimateSize", $rt_wrapFunction0(jusi_StreamOverSpliterator_estimateSize)],
ju_SequencedSet, 0, jl_Object, [ju_SequencedCollection, ju_Set], 1537, 0, 0, ["$forEach", $rt_wrapFunction1(jl_Iterable_forEach)],
ju_LinkedHashMapEntrySet, 0, ju_AbstractSet, [ju_SequencedSet], 0, 0, 0, ["$forEach", $rt_wrapFunction1(jl_Iterable_forEach)],
ju_Comparator$reversed$lambda$_1_0, 0, jl_Object, [ju_Comparator], 1, 0, 0, ["$compare0", $rt_wrapFunction2(ju_Comparator$reversed$lambda$_1_0_compare)],
jl_UnsupportedOperationException, 0, jl_RuntimeException, [], 1, 0, 0, 0,
ju_NoSuchElementException, 0, jl_RuntimeException, [], 1, 0, 0, 0,
ju_AbstractList$1, 0, jl_Object, [ju_Iterator], 0, 0, 0, ["$hasNext", $rt_wrapFunction0(ju_AbstractList$1_hasNext), "$next", $rt_wrapFunction0(ju_AbstractList$1_next)],
ju_MapEntry, 0, jl_Object, [ju_Map$Entry, jl_Cloneable], 0, 0, 0, 0,
ju_HashMap$HashEntry, 0, ju_MapEntry, [], 0, 0, 0, 0,
ju_LinkedHashMap$LinkedHashMapEntry, 0, ju_HashMap$HashEntry, [], 16, 0, 0, 0,
jur_AbstractCharClass$1, "AbstractCharClass$1", 14, jur_AbstractCharClass, [], 0, 0, 0, ["$contains0", $rt_wrapFunction1(jur_AbstractCharClass$1_contains)],
jur_AbstractCharClass$2, "AbstractCharClass$2", 14, jur_AbstractCharClass, [], 0, 0, 0, ["$contains0", $rt_wrapFunction1(jur_AbstractCharClass$2_contains)],
jur_CharClass$18, "CharClass$18", 14, jur_AbstractCharClass, [], 0, 0, 0, ["$contains0", $rt_wrapFunction1(jur_CharClass$18_contains), "$toString", $rt_wrapFunction0(jur_CharClass$18_toString)]]);
$rt_metadata([jur_CharClass$1, 0, jur_AbstractCharClass, [], 0, 0, 0, ["$contains0", $rt_wrapFunction1(jur_CharClass$1_contains)],
jur_CharClass$3, 0, jur_AbstractCharClass, [], 0, 0, 0, ["$contains0", $rt_wrapFunction1(jur_CharClass$3_contains)],
jur_CharClass$2, 0, jur_AbstractCharClass, [], 0, 0, 0, ["$contains0", $rt_wrapFunction1(jur_CharClass$2_contains)],
jur_CharClass$5, 0, jur_AbstractCharClass, [], 0, 0, 0, ["$contains0", $rt_wrapFunction1(jur_CharClass$5_contains)],
jur_CharClass$4, 0, jur_AbstractCharClass, [], 0, 0, 0, ["$contains0", $rt_wrapFunction1(jur_CharClass$4_contains)],
jur_CharClass$7, 0, jur_AbstractCharClass, [], 0, 0, 0, ["$contains0", $rt_wrapFunction1(jur_CharClass$7_contains)],
jur_CharClass$6, 0, jur_AbstractCharClass, [], 0, 0, 0, ["$contains0", $rt_wrapFunction1(jur_CharClass$6_contains)],
jur_CharClass$9, 0, jur_AbstractCharClass, [], 0, 0, 0, ["$contains0", $rt_wrapFunction1(jur_CharClass$9_contains)],
jur_CharClass$8, 0, jur_AbstractCharClass, [], 0, 0, 0, ["$contains0", $rt_wrapFunction1(jur_CharClass$8_contains)],
jur_CharClass$11, 0, jur_AbstractCharClass, [], 0, 0, 0, ["$contains0", $rt_wrapFunction1(jur_CharClass$11_contains)],
jur_CharClass$10, 0, jur_AbstractCharClass, [], 0, 0, 0, ["$contains0", $rt_wrapFunction1(jur_CharClass$10_contains)],
jur_CharClass$13, 0, jur_AbstractCharClass, [], 0, 0, 0, ["$contains0", $rt_wrapFunction1(jur_CharClass$13_contains)],
jur_CharClass$12, 0, jur_AbstractCharClass, [], 0, 0, 0, ["$contains0", $rt_wrapFunction1(jur_CharClass$12_contains)],
jur_CharClass$15, 0, jur_AbstractCharClass, [], 0, 0, 0, ["$contains0", $rt_wrapFunction1(jur_CharClass$15_contains)],
jur_CharClass$14, 0, jur_AbstractCharClass, [], 0, 0, 0, ["$contains0", $rt_wrapFunction1(jur_CharClass$14_contains)],
jur_CharClass$17, 0, jur_AbstractCharClass, [], 0, 0, 0, ["$contains0", $rt_wrapFunction1(jur_CharClass$17_contains)],
jur_CharClass$16, 0, jur_AbstractCharClass, [], 0, 0, 0, ["$contains0", $rt_wrapFunction1(jur_CharClass$16_contains)],
w_DealBrowser$lambda$moveWildcard$4$lambda$_70_0, 0, jl_Object, [juf_Function], 1, 0, 0, 0,
w_DealBrowser$lambda$moveWildcard$4$lambda$_70_1, 0, jl_Object, [juf_Function], 1, 0, 0, ["$apply0", $rt_wrapFunction1(w_DealBrowser$lambda$moveWildcard$4$lambda$_70_1_apply)],
cgmmc_WildcardCard, "WildcardCard", 9, cgmmc_Card, [], 1, 0, 0, ["$canBeBanked", $rt_wrapFunction0(cgmmc_WildcardCard_canBeBanked), "$canPayFromTable", $rt_wrapFunction0(cgmmc_WildcardCard_canPayFromTable)],
w_DealBrowser$lambda$moveWildcard$4$lambda$_70_2, 0, jl_Object, [juf_Consumer], 1, 0, 0, ["$accept", $rt_wrapFunction1(w_DealBrowser$lambda$moveWildcard$4$lambda$_70_2_accept)],
cgme_TurnManager, 0, jl_Object, [], 1, 0, 0, 0,
cgme_GameEvent, 0, jl_Record, [], 17, 0, 0, 0,
jur_RandomGenerator, 0, jl_Object, [], 1537, 0, 0, 0,
ju_Random, 0, jl_Object, [jur_RandomGenerator, ji_Serializable], 1, 0, 0, 0,
cgmc_GameController$PlayCardRequest, 0, jl_Record, [], 17, 0, 0, 0,
cgmep_PaymentResult, 0, jl_Object, [], 1, 0, 0, 0,
ju_Comparator$NaturalOrder, 0, jl_Object, [ju_Comparator], 1, 0, () => ju_Comparator$NaturalOrder_$callClinit(), ["$compare0", $rt_wrapFunction2(ju_Comparator$NaturalOrder_compare)],
jl_IllegalStateException, 0, jl_RuntimeException, [], 1, 0, 0, 0,
cgmmg_TurnState, 0, jl_Enum, [], 65553, 0, () => cgmmg_TurnState_$callClinit(), 0,
w_DealBrowser$find$lambda$_12_0, 0, jl_Object, [juf_Predicate], 1, 0, 0, ["$test", $rt_wrapFunction1(w_DealBrowser$find$lambda$_12_0_test)],
juf_Supplier, 0, jl_Object, [], 1537, 0, 0, 0,
w_DealBrowser$find$lambda$_12_1, 0, jl_Object, [juf_Supplier], 1, 0, 0, ["$get0", $rt_wrapFunction0(w_DealBrowser$find$lambda$_12_1_get)],
ju_Optional, 0, jl_Object, [], 17, 0, 0, 0,
w_DealBrowser$promptColorSelection$lambda$_26_0, 0, jl_Object, [juf_Function], 1, 0, 0, ["$apply0", $rt_wrapFunction1(w_DealBrowser$promptColorSelection$lambda$_26_0_apply)],
w_DealBrowser$promptColorSelection$lambda$_26_1, 0, jl_Object, [juf_Consumer], 1, 0, 0, ["$accept", $rt_wrapFunction1(w_DealBrowser$promptColorSelection$lambda$_26_1_accept)],
cgmmc_PropertyColor, "PropertyColor", 9, jl_Enum, [], 65553, 0, () => cgmmc_PropertyColor_$callClinit(), 0,
jtt_TemporalAccessor, 0, jl_Object, [], 1537, 0, 0, 0,
jtt_Temporal, 0, jl_Object, [jtt_TemporalAccessor], 1537, 0, 0, 0,
jtt_TemporalAdjuster, 0, jl_Object, [], 1537, 0, 0, 0,
jt_Instant, 0, jl_Object, [jtt_Temporal, jtt_TemporalAdjuster, jl_Comparable, ji_Serializable, jtt_TemporalAccessor], 17, 0, () => jt_Instant_$callClinit(), 0,
cgme_InvalidMoveException, 0, jl_RuntimeException, [], 1, 0, 0, 0,
cgmmc_BuildingCard, "BuildingCard", 9, cgmmc_Card, [], 1, 0, 0, 0,
w_DealBrowser$choosePlay$lambda$_13_0, 0, jl_Object, [juf_Consumer], 1, 0, 0, ["$accept", $rt_wrapFunction1(w_DealBrowser$choosePlay$lambda$_13_0_accept)],
cgmmc_ActionCard, "ActionCard", 9, cgmmc_Card, [], 1, 0, 0, ["$canBeBanked", $rt_wrapFunction0(cgmmc_ActionCard_canBeBanked), "$toString", $rt_wrapFunction0(cgmmc_ActionCard_toString), "$equals", $rt_wrapFunction1(cgmmc_ActionCard_equals), "$hashCode", $rt_wrapFunction0(cgmmc_ActionCard_hashCode)],
w_DealBrowser$choosePlay$lambda$_13_1, 0, jl_Object, [juf_Predicate], 1, 0, 0, ["$test", $rt_wrapFunction1(w_DealBrowser$choosePlay$lambda$_13_1_test)],
w_DealBrowser$choosePlay$lambda$_13_2, 0, jl_Object, [juf_Function], 1, 0, 0, ["$apply0", $rt_wrapFunction1(w_DealBrowser$choosePlay$lambda$_13_2_apply)],
w_DealBrowser$choosePlay$lambda$_13_3, 0, jl_Object, [juf_Consumer], 1, 0, 0, ["$accept", $rt_wrapFunction1(w_DealBrowser$choosePlay$lambda$_13_3_accept)],
cgmcf_PaymentFlowService$1, 0, jl_Object, [], 32768, 0, () => cgmcf_PaymentFlowService$1_$callClinit(), 0,
jl_Error, 0, jl_Throwable, [], 1, 0, 0, 0]);
$rt_metadata([jl_LinkageError, 0, jl_Error, [], 1, 0, 0, 0,
jl_IncompatibleClassChangeError, 0, jl_LinkageError, [], 1, 0, 0, 0,
juca_AtomicBoolean, 0, jl_Object, [ji_Serializable], 1, 0, 0, 0,
cgmcf_ReactionFlowService$resolveJustSayNoChain$lambda$_1_0, 0, jl_Object, [juf_Consumer], 1, 0, 0, 0,
cgmmg_Game, 0, jl_Object, [], 1, 0, 0, 0,
cgmcf_ControllerState$checkWinAfterOwnTurnOperation$lambda$_26_0, 0, jl_Object, [juf_Consumer], 1, 0, 0, ["$accept", $rt_wrapFunction1(cgmcf_ControllerState$checkWinAfterOwnTurnOperation$lambda$_26_0_accept)],
jt_Clock, 0, jl_Object, [], 1025, 0, 0, 0,
w_DealBrowser$1, 0, jl_Object, [], 32768, 0, () => w_DealBrowser$1_$callClinit(), 0,
w_DealBrowser$chooseAction$lambda$_14_0, 0, jl_Object, [juf_Consumer], 1, 0, 0, ["$accept", $rt_wrapFunction1(w_DealBrowser$chooseAction$lambda$_14_0_accept)],
w_DealBrowser$chooseAction$lambda$_14_1, 0, jl_Object, [juf_Function], 1, 0, 0, ["$apply0", $rt_wrapFunction1(w_DealBrowser$chooseAction$lambda$_14_1_apply)],
w_DealBrowser$chooseAction$lambda$_14_2, 0, jl_Object, [juf_Consumer], 1, 0, 0, ["$accept", $rt_wrapFunction1(w_DealBrowser$chooseAction$lambda$_14_2_accept)],
w_DealBrowser$chooseAction$lambda$_14_3, 0, jl_Object, [juf_Predicate], 1, 0, 0, ["$test", $rt_wrapFunction1(w_DealBrowser$chooseAction$lambda$_14_3_test)],
w_DealBrowser$chooseAction$lambda$_14_4, 0, jl_Object, [juf_Function], 1, 0, 0, ["$apply0", $rt_wrapFunction1(w_DealBrowser$chooseAction$lambda$_14_4_apply)],
w_DealBrowser$chooseAction$lambda$_14_5, 0, jl_Object, [juf_Predicate], 1, 0, 0, ["$test", $rt_wrapFunction1(w_DealBrowser$chooseAction$lambda$_14_5_test)],
w_DealBrowser$chooseAction$lambda$_14_6, 0, jl_Object, [juf_Consumer], 1, 0, 0, ["$accept", $rt_wrapFunction1(w_DealBrowser$chooseAction$lambda$_14_6_accept)],
w_DealBrowser$chooseAction$lambda$_14_7, 0, jl_Object, [juf_Consumer], 1, 0, 0, ["$accept", $rt_wrapFunction1(w_DealBrowser$chooseAction$lambda$_14_7_accept)],
cgmcf_ReactionFlowService$findReactionCard$lambda$_2_0, 0, jl_Object, [juf_Predicate], 1, 0, 0, ["$test", $rt_wrapFunction1(cgmcf_ReactionFlowService$findReactionCard$lambda$_2_0_test)],
cgmcf_ReactionFlowService$findReactionCard$lambda$_2_1, 0, jl_Object, [juf_Function], 1, 0, 0, ["$apply0", $rt_wrapFunction1(cgmcf_ReactionFlowService$findReactionCard$lambda$_2_1_apply)],
cgmcf_ReactionFlowService$findReactionCard$lambda$_2_2, 0, jl_Object, [juf_Predicate], 1, 0, 0, ["$test", $rt_wrapFunction1(cgmcf_ReactionFlowService$findReactionCard$lambda$_2_2_test)],
jtt_TemporalQuery, 0, jl_Object, [], 1537, 0, 0, 0,
jt_Instant$1, 0, jl_Object, [jtt_TemporalQuery], 0, 0, 0, 0,
jt_Clock$SystemClock, 0, jt_Clock, [ji_Serializable], 16, 0, 0, 0,
jt_ZoneId, 0, jl_Object, [ji_Serializable], 1025, 0, () => jt_ZoneId_$callClinit(), 0,
jt_ZoneOffset, "ZoneOffset", 15, jt_ZoneId, [jtt_TemporalAccessor, jtt_TemporalAdjuster, jl_Comparable, ji_Serializable], 17, 0, () => jt_ZoneOffset_$callClinit(), ["$equals", $rt_wrapFunction1(jt_ZoneOffset_equals), "$hashCode", $rt_wrapFunction0(jt_ZoneOffset_hashCode), "$toString", $rt_wrapFunction0(jt_ZoneOffset_toString)],
cgmmc_Deck, 0, jl_Object, [], 1, 0, 0, 0,
ju_TemplateCollections$ImmutableArrayList, "TemplateCollections$ImmutableArrayList", 13, ju_TemplateCollections$AbstractImmutableList, [ju_RandomAccess], 1, 0, 0, ["$forEach", $rt_wrapFunction1(jl_Iterable_forEach), "$get", $rt_wrapFunction1(ju_TemplateCollections$ImmutableArrayList_get), "$size", $rt_wrapFunction0(ju_TemplateCollections$ImmutableArrayList_size), "$remove", $rt_wrapFunction1(ju_TemplateCollections$ImmutableArrayList_remove)],
cgmmg_GameRules, 0, jl_Object, [], 1, 0, 0, 0,
w_DealBrowser$promptCardSelection$lambda$_27_0, 0, jl_Object, [juf_Function], 1, 0, 0, ["$apply0", $rt_wrapFunction1(w_DealBrowser$promptCardSelection$lambda$_27_0_apply)],
w_DealBrowser$promptCardSelection$lambda$_27_1, 0, jl_Object, [juf_Consumer], 1, 0, 0, ["$accept", $rt_wrapFunction1(w_DealBrowser$promptCardSelection$lambda$_27_1_accept)],
cgmep_PaymentReason, "PaymentReason", 5, jl_Enum, [], 65553, 0, () => cgmep_PaymentReason_$callClinit(), 0,
jl_ArithmeticException, 0, jl_RuntimeException, [], 1, 0, 0, 0,
jt_DateTimeException, 0, jl_RuntimeException, [], 1, 0, 0, 0,
jl_CloneNotSupportedException, 0, jl_Exception, [], 1, 0, 0, 0,
jt_ZoneRegion, 0, jt_ZoneId, [ji_Serializable], 16, 0, 0, 0,
jl_AssertionError, 0, jl_Error, [], 1, 0, 0, 0,
jt_ZoneId$1, 0, jl_Object, [jtt_TemporalQuery], 0, 0, 0, 0,
jusi_WrappingStreamImpl, 0, jusi_SimpleStreamImpl, [], 1025, 0, 0, ["$next1", $rt_wrapFunction1(jusi_WrappingStreamImpl_next), "$estimateSize", $rt_wrapFunction0(jusi_WrappingStreamImpl_estimateSize)],
jusi_DistinctStreamImpl, 0, jusi_WrappingStreamImpl, [], 1, 0, 0, ["$wrap", $rt_wrapFunction1(jusi_DistinctStreamImpl_wrap)],
jusi_AnyMatchConsumer, 0, jl_Object, [juf_Predicate], 1, 0, 0, ["$test", $rt_wrapFunction1(jusi_AnyMatchConsumer_test)],
ju_LinkedHashMapIterator, 0, jl_Object, [], 0, 0, 0, ["$hasNext", $rt_wrapFunction0(ju_LinkedHashMapIterator_hasNext)],
ju_LinkedHashMapIterator$EntryIterator, 0, ju_LinkedHashMapIterator, [ju_Iterator], 0, 0, 0, 0,
jur_BackReferencedSingleSet, "BackReferencedSingleSet", 14, jur_SingleSet, [], 0, 0, 0, ["$find1", $rt_wrapFunction3(jur_BackReferencedSingleSet_find), "$findBack", $rt_wrapFunction4(jur_BackReferencedSingleSet_findBack), "$processBackRefReplacement", $rt_wrapFunction0(jur_BackReferencedSingleSet_processBackRefReplacement)],
cgme_EventBus$publish$lambda$_3_0, 0, jl_Object, [juf_Consumer], 1, 0, 0, ["$accept", $rt_wrapFunction1(cgme_EventBus$publish$lambda$_3_0_accept)],
cgmep_PaymentService$processPayment$lambda$_1_0, 0, jl_Object, [juf_ToIntFunction], 1, 0, 0, ["$applyAsInt", $rt_wrapFunction1(cgmep_PaymentService$processPayment$lambda$_1_0_applyAsInt)],
ju_Spliterator, 0, jl_Object, [], 1537, 0, 0, 0,
jusi_SpliteratorOverCollection, 0, jl_Object, [ju_Spliterator], 1, 0, 0, 0,
jur_AbstractCharClass$LazyJavaLowerCase$1, "AbstractCharClass$LazyJavaLowerCase$1", 14, jur_AbstractCharClass, [], 0, 0, 0, ["$contains0", $rt_wrapFunction1(jur_AbstractCharClass$LazyJavaLowerCase$1_contains)],
jur_AbstractCharClass$LazyJavaUpperCase$1, "AbstractCharClass$LazyJavaUpperCase$1", 14, jur_AbstractCharClass, [], 0, 0, 0, ["$contains0", $rt_wrapFunction1(jur_AbstractCharClass$LazyJavaUpperCase$1_contains)],
jur_AbstractCharClass$LazyJavaWhitespace$1, "AbstractCharClass$LazyJavaWhitespace$1", 14, jur_AbstractCharClass, [], 0, 0, 0, ["$contains0", $rt_wrapFunction1(jur_AbstractCharClass$LazyJavaWhitespace$1_contains)],
jur_AbstractCharClass$LazyJavaMirrored$1, "AbstractCharClass$LazyJavaMirrored$1", 14, jur_AbstractCharClass, [], 0, 0, 0, ["$contains0", $rt_wrapFunction1(jur_AbstractCharClass$LazyJavaMirrored$1_contains)]]);
$rt_metadata([jur_AbstractCharClass$LazyJavaDefined$1, "AbstractCharClass$LazyJavaDefined$1", 14, jur_AbstractCharClass, [], 0, 0, 0, ["$contains0", $rt_wrapFunction1(jur_AbstractCharClass$LazyJavaDefined$1_contains)],
jur_AbstractCharClass$LazyJavaDigit$1, "AbstractCharClass$LazyJavaDigit$1", 14, jur_AbstractCharClass, [], 0, 0, 0, ["$contains0", $rt_wrapFunction1(jur_AbstractCharClass$LazyJavaDigit$1_contains)],
jur_AbstractCharClass$LazyJavaIdentifierIgnorable$1, "AbstractCharClass$LazyJavaIdentifierIgnorable$1", 14, jur_AbstractCharClass, [], 0, 0, 0, ["$contains0", $rt_wrapFunction1(jur_AbstractCharClass$LazyJavaIdentifierIgnorable$1_contains)],
jur_AbstractCharClass$LazyJavaISOControl$1, "AbstractCharClass$LazyJavaISOControl$1", 14, jur_AbstractCharClass, [], 0, 0, 0, ["$contains0", $rt_wrapFunction1(jur_AbstractCharClass$LazyJavaISOControl$1_contains)],
jur_AbstractCharClass$LazyJavaJavaIdentifierPart$1, "AbstractCharClass$LazyJavaJavaIdentifierPart$1", 14, jur_AbstractCharClass, [], 0, 0, 0, ["$contains0", $rt_wrapFunction1(jur_AbstractCharClass$LazyJavaJavaIdentifierPart$1_contains)],
jur_AbstractCharClass$LazyJavaJavaIdentifierStart$1, "AbstractCharClass$LazyJavaJavaIdentifierStart$1", 14, jur_AbstractCharClass, [], 0, 0, 0, ["$contains0", $rt_wrapFunction1(jur_AbstractCharClass$LazyJavaJavaIdentifierStart$1_contains)],
jur_AbstractCharClass$LazyJavaLetter$1, "AbstractCharClass$LazyJavaLetter$1", 14, jur_AbstractCharClass, [], 0, 0, 0, ["$contains0", $rt_wrapFunction1(jur_AbstractCharClass$LazyJavaLetter$1_contains)],
jur_AbstractCharClass$LazyJavaLetterOrDigit$1, "AbstractCharClass$LazyJavaLetterOrDigit$1", 14, jur_AbstractCharClass, [], 0, 0, 0, ["$contains0", $rt_wrapFunction1(jur_AbstractCharClass$LazyJavaLetterOrDigit$1_contains)],
jur_AbstractCharClass$LazyJavaSpaceChar$1, "AbstractCharClass$LazyJavaSpaceChar$1", 14, jur_AbstractCharClass, [], 0, 0, 0, ["$contains0", $rt_wrapFunction1(jur_AbstractCharClass$LazyJavaSpaceChar$1_contains)],
jur_AbstractCharClass$LazyJavaTitleCase$1, "AbstractCharClass$LazyJavaTitleCase$1", 14, jur_AbstractCharClass, [], 0, 0, 0, ["$contains0", $rt_wrapFunction1(jur_AbstractCharClass$LazyJavaTitleCase$1_contains)],
jur_AbstractCharClass$LazyJavaUnicodeIdentifierPart$1, "AbstractCharClass$LazyJavaUnicodeIdentifierPart$1", 14, jur_AbstractCharClass, [], 0, 0, 0, ["$contains0", $rt_wrapFunction1(jur_AbstractCharClass$LazyJavaUnicodeIdentifierPart$1_contains)],
jur_AbstractCharClass$LazyJavaUnicodeIdentifierStart$1, "AbstractCharClass$LazyJavaUnicodeIdentifierStart$1", 14, jur_AbstractCharClass, [], 0, 0, 0, ["$contains0", $rt_wrapFunction1(jur_AbstractCharClass$LazyJavaUnicodeIdentifierStart$1_contains)],
jur_UnicodeCategory, "UnicodeCategory", 14, jur_AbstractCharClass, [], 0, 0, 0, ["$contains0", $rt_wrapFunction1(jur_UnicodeCategory_contains)],
jur_UnicodeCategoryScope, "UnicodeCategoryScope", 14, jur_UnicodeCategory, [], 0, 0, 0, ["$contains0", $rt_wrapFunction1(jur_UnicodeCategoryScope_contains)],
cgmc_GameCommand, 0, jl_Object, [], 1537, 0, 0, 0,
cgmc_GameController$stepBotTurn$lambda$_7_0, 0, jl_Object, [juf_Function], 1, 0, 0, ["$apply0", $rt_wrapFunction1(cgmc_GameController$stepBotTurn$lambda$_7_0_apply)],
cgmc_GameController$stepBotTurn$lambda$_7_1, 0, jl_Object, [juf_ToIntFunction], 1, 0, 0, ["$applyAsInt", $rt_wrapFunction1(cgmc_GameController$stepBotTurn$lambda$_7_1_applyAsInt)],
jusi_MappingStreamImpl, 0, jusi_WrappingStreamImpl, [], 1, 0, 0, ["$wrap", $rt_wrapFunction1(jusi_MappingStreamImpl_wrap)],
ju_ConcurrentModificationException, 0, jl_RuntimeException, [], 1, 0, 0, 0,
ju_HashSet, "HashSet", 13, ju_AbstractSet, [jl_Cloneable, ji_Serializable], 1, 0, 0, ["$forEach", $rt_wrapFunction1(jl_Iterable_forEach), "$contains", $rt_wrapFunction1(ju_HashSet_contains), "$iterator", $rt_wrapFunction0(ju_HashSet_iterator), "$size", $rt_wrapFunction0(ju_HashSet_size)],
ju_LinkedHashSet, "LinkedHashSet", 13, ju_HashSet, [ju_SequencedSet, jl_Cloneable, ji_Serializable], 1, 0, 0, ["$forEach", $rt_wrapFunction1(jl_Iterable_forEach)],
cgmep_PaymentService$validateSelection$lambda$_3_0, 0, jl_Object, [juf_ToIntFunction], 1, 0, 0, ["$applyAsInt", $rt_wrapFunction1(cgmep_PaymentService$validateSelection$lambda$_3_0_applyAsInt)],
cgmmc_Bank, 0, cgmmc_AbstractCardCollection, [], 1, 0, 0, ["$add0", $rt_wrapFunction1(cgmmc_Bank_add)],
cgmmc_DiscardPile, 0, cgmmc_AbstractCardCollection, [], 1, 0, 0, 0,
ju_UUID, 0, jl_Object, [], 1, 0, 0, 0,
cgmmc_Hand, 0, cgmmc_AbstractCardCollection, [], 1, 0, 0, 0,
cgmmc_PropertyCard, "PropertyCard", 9, cgmmc_Card, [], 1, 0, 0, ["$canBeBanked", $rt_wrapFunction0(cgmmc_PropertyCard_canBeBanked)],
cgmmc_MoneyCard, "MoneyCard", 9, cgmmc_Card, [], 1, 0, () => cgmmc_MoneyCard_$callClinit(), ["$canBeBanked", $rt_wrapFunction0(cgmmc_MoneyCard_canBeBanked)],
jur_IntArrHash, 0, jl_Object, [], 0, 0, 0, 0,
w_DealBrowser$lambda$promptCardSelection$37$lambda$_37_0, 0, jl_Object, [juf_Function], 1, 0, 0, ["$apply0", $rt_wrapFunction1(w_DealBrowser$lambda$promptCardSelection$37$lambda$_37_0_apply)],
otj_JSObject, 0, jl_Object, [], 1537, 0, 0, 0,
otjc_Crypto, 0, jl_Object, [otj_JSObject], 1025, 0, 0, 0,
w_DealBrowser$lambda$settlePayments$26$lambda$_48_0, 0, jl_Object, [juf_Function], 1, 0, 0, ["$apply0", $rt_wrapFunction1(w_DealBrowser$lambda$settlePayments$26$lambda$_48_0_apply)],
cgmcf_CardPlayFlowService$playWildcard$lambda$_4_0, 0, jl_Object, [juf_Consumer], 1, 0, 0, ["$accept", $rt_wrapFunction1(cgmcf_CardPlayFlowService$playWildcard$lambda$_4_0_accept)],
cgmcf_CardPlayFlowService$playBuilding$lambda$_5_0, 0, jl_Object, [juf_Predicate], 1, 0, 0, ["$test", $rt_wrapFunction1(cgmcf_CardPlayFlowService$playBuilding$lambda$_5_0_test)],
cgmcf_CardPlayFlowService$playBuilding$lambda$_5_1, 0, jl_Object, [juf_Function], 1, 0, 0, ["$apply0", $rt_wrapFunction1(cgmcf_CardPlayFlowService$playBuilding$lambda$_5_1_apply)],
cgmcf_CardPlayFlowService$playBuilding$lambda$_5_2, 0, jl_Object, [juf_Consumer], 1, 0, 0, ["$accept", $rt_wrapFunction1(cgmcf_CardPlayFlowService$playBuilding$lambda$_5_2_accept)],
cgmea_ActionContext, 0, jl_Record, [], 17, 0, 0, 0,
cgmea_ActionResult, 0, jl_Record, [], 17, 0, 0, 0,
cgmcf_CardPlayFlowService$playActionCard$lambda$_6_0, 0, jl_Object, [juf_Consumer], 1, 0, 0, ["$accept", $rt_wrapFunction1(cgmcf_CardPlayFlowService$playActionCard$lambda$_6_0_accept)],
cgmcf_CardPlayFlowService$1, 0, jl_Object, [], 32768, 0, () => cgmcf_CardPlayFlowService$1_$callClinit(), 0,
cgmcf_CardPlayFlowService$resolveDoubleRentCards$lambda$_10_0, 0, jl_Object, [juf_Predicate], 1, 0, 0, ["$test", $rt_wrapFunction1(cgmcf_CardPlayFlowService$resolveDoubleRentCards$lambda$_10_0_test)],
cgmcf_CardPlayFlowService$resolveDoubleRentCards$lambda$_10_1, 0, jl_Object, [juf_Function], 1, 0, 0, ["$apply0", $rt_wrapFunction1(cgmcf_CardPlayFlowService$resolveDoubleRentCards$lambda$_10_1_apply)],
cgmcf_CardPlayFlowService$resolveDoubleRentCards$lambda$_10_2, 0, jl_Object, [juf_Predicate], 1, 0, 0, ["$test", $rt_wrapFunction1(cgmcf_CardPlayFlowService$resolveDoubleRentCards$lambda$_10_2_test)],
cgmcf_CardPlayFlowService$resolveDoubleRentCards$lambda$_10_3, 0, jl_Object, [juf_Predicate], 1, 0, 0, ["$test", $rt_wrapFunction1(cgmcf_CardPlayFlowService$resolveDoubleRentCards$lambda$_10_3_test)],
jusi_CountingConsumer, 0, jl_Object, [juf_Predicate], 1, 0, 0, ["$test", $rt_wrapFunction1(jusi_CountingConsumer_test)],
jus_IntStream, 0, jl_Object, [jus_BaseStream], 1537, 0, 0, 0,
jusi_SimpleIntStreamImpl, 0, jl_Object, [jus_IntStream], 1025, 0, 0, 0,
jusi_MappingToIntStreamImpl, 0, jusi_SimpleIntStreamImpl, [], 1, 0, 0, 0,
cgmc_EndTurnCommand, "EndTurnCommand", 10, jl_Object, [cgmc_GameCommand], 1, [0,0,0], 0, ["$execute", $rt_wrapFunction0(cgmc_EndTurnCommand_execute)]]);
$rt_metadata([jusi_StreamOverSpliterator$AdapterAction, 0, jl_Object, [juf_Consumer], 0, 0, 0, 0,
w_DealBrowser$promptDiscard$lambda$_24_0, 0, jl_Object, [juf_Function], 1, 0, 0, ["$apply0", $rt_wrapFunction1(w_DealBrowser$promptDiscard$lambda$_24_0_apply)],
w_DealBrowser$promptDiscard$lambda$_24_1, 0, jl_Object, [juf_Consumer], 1, 0, 0, ["$accept", $rt_wrapFunction1(w_DealBrowser$promptDiscard$lambda$_24_1_accept)],
ju_Collections$9, 0, ju_AbstractList, [], 0, 0, 0, ["$forEach", $rt_wrapFunction1(jl_Iterable_forEach), "$get", $rt_wrapFunction1(ju_Collections$9_get), "$size", $rt_wrapFunction0(ju_Collections$9_size)],
cgma_SimpleBotStrategy$chooseDiscards$lambda$_19_0, 0, jl_Object, [juf_ToIntFunction], 1, 0, 0, ["$applyAsInt", $rt_wrapFunction1(cgma_SimpleBotStrategy$chooseDiscards$lambda$_19_0_applyAsInt)],
cgma_SimpleBotStrategy$chooseDiscards$lambda$_19_1, 0, jl_Object, [juf_ToIntFunction], 1, 0, 0, ["$applyAsInt", $rt_wrapFunction1(cgma_SimpleBotStrategy$chooseDiscards$lambda$_19_1_applyAsInt)],
cgma_SimpleBotStrategy$playMoney$lambda$_2_0, 0, jl_Object, [juf_Predicate], 1, 0, 0, ["$test", $rt_wrapFunction1(cgma_SimpleBotStrategy$playMoney$lambda$_2_0_test)],
cgma_SimpleBotStrategy$playMoney$lambda$_2_1, 0, jl_Object, [juf_ToIntFunction], 1, 0, 0, ["$applyAsInt", $rt_wrapFunction1(cgma_SimpleBotStrategy$playMoney$lambda$_2_1_applyAsInt)],
cgma_SimpleBotStrategy$playMoney$lambda$_2_2, 0, jl_Object, [juf_Function], 1, 0, 0, ["$apply0", $rt_wrapFunction1(cgma_SimpleBotStrategy$playMoney$lambda$_2_2_apply)],
cgma_SimpleBotStrategy$playProperty$lambda$_4_0, 0, jl_Object, [juf_Predicate], 1, 0, 0, ["$test", $rt_wrapFunction1(cgma_SimpleBotStrategy$playProperty$lambda$_4_0_test)],
cgma_SimpleBotStrategy$playProperty$lambda$_4_1, 0, jl_Object, [juf_Predicate], 1, 0, 0, ["$test", $rt_wrapFunction1(cgma_SimpleBotStrategy$playProperty$lambda$_4_1_test)],
cgmc_PlayCardCommand, "PlayCardCommand", 10, jl_Object, [cgmc_GameCommand], 1, [0,0,0], 0, ["$execute", $rt_wrapFunction0(cgmc_PlayCardCommand_execute)],
cgma_SimpleBotStrategy$playBuilding$lambda$_3_0, 0, jl_Object, [juf_Predicate], 1, 0, 0, ["$test", $rt_wrapFunction1(cgma_SimpleBotStrategy$playBuilding$lambda$_3_0_test)],
cgma_SimpleBotStrategy$playBuilding$lambda$_3_1, 0, jl_Object, [juf_Function], 1, 0, 0, ["$apply0", $rt_wrapFunction1(cgma_SimpleBotStrategy$playBuilding$lambda$_3_1_apply)],
cgma_SimpleBotStrategy$playBuilding$lambda$_3_2, 0, jl_Object, [juf_Predicate], 1, 0, 0, ["$test", $rt_wrapFunction1(cgma_SimpleBotStrategy$playBuilding$lambda$_3_2_test)],
cgmmc_PropertySet, "PropertySet", 8, jl_Object, [], 1, 0, 0, 0,
cgma_SimpleBotStrategy$playAction$lambda$_6_0, 0, jl_Object, [juf_Predicate], 1, 0, 0, ["$test", $rt_wrapFunction1(cgma_SimpleBotStrategy$playAction$lambda$_6_0_test)],
cgma_SimpleBotStrategy$playAction$lambda$_6_1, 0, jl_Object, [juf_Function], 1, 0, 0, ["$apply0", $rt_wrapFunction1(cgma_SimpleBotStrategy$playAction$lambda$_6_1_apply)],
cgma_SimpleBotStrategy$playAction$lambda$_6_2, 0, jl_Object, [juf_Predicate], 1, 0, 0, ["$test", $rt_wrapFunction1(cgma_SimpleBotStrategy$playAction$lambda$_6_2_test)],
cgma_SimpleBotStrategy$playAction$lambda$_6_3, 0, jl_Object, [juf_ToIntFunction], 1, 0, 0, ["$applyAsInt", $rt_wrapFunction1(cgma_SimpleBotStrategy$playAction$lambda$_6_3_applyAsInt)],
cgme_CardFactory$addMoneyCards$lambda$_3_0, 0, jl_Object, [juf_Supplier], 1, 0, 0, ["$get0", $rt_wrapFunction0(cgme_CardFactory$addMoneyCards$lambda$_3_0_get)],
cgme_CardFactory$addMoneyCards$lambda$_3_1, 0, jl_Object, [juf_Supplier], 1, 0, 0, ["$get0", $rt_wrapFunction0(cgme_CardFactory$addMoneyCards$lambda$_3_1_get)],
cgme_CardFactory$addMoneyCards$lambda$_3_2, 0, jl_Object, [juf_Supplier], 1, 0, 0, ["$get0", $rt_wrapFunction0(cgme_CardFactory$addMoneyCards$lambda$_3_2_get)],
cgme_CardFactory$addMoneyCards$lambda$_3_3, 0, jl_Object, [juf_Supplier], 1, 0, 0, ["$get0", $rt_wrapFunction0(cgme_CardFactory$addMoneyCards$lambda$_3_3_get)],
cgme_CardFactory$addMoneyCards$lambda$_3_4, 0, jl_Object, [juf_Supplier], 1, 0, 0, ["$get0", $rt_wrapFunction0(cgme_CardFactory$addMoneyCards$lambda$_3_4_get)],
cgme_CardFactory$addMoneyCards$lambda$_3_5, 0, jl_Object, [juf_Supplier], 1, 0, 0, ["$get0", $rt_wrapFunction0(cgme_CardFactory$addMoneyCards$lambda$_3_5_get)],
cgme_CardFactory$addWildcardCards$lambda$_5_0, 0, jl_Object, [juf_Supplier], 1, 0, 0, ["$get0", $rt_wrapFunction0(cgme_CardFactory$addWildcardCards$lambda$_5_0_get)],
cgme_CardFactory$addWildcardCards$lambda$_5_1, 0, jl_Object, [juf_Supplier], 1, 0, 0, ["$get0", $rt_wrapFunction0(cgme_CardFactory$addWildcardCards$lambda$_5_1_get)],
cgme_CardFactory$addWildcardCards$lambda$_5_2, 0, jl_Object, [juf_Supplier], 1, 0, 0, ["$get0", $rt_wrapFunction0(cgme_CardFactory$addWildcardCards$lambda$_5_2_get)],
cgme_CardFactory$addActionCards$lambda$_6_0, 0, jl_Object, [juf_Supplier], 1, 0, 0, ["$get0", $rt_wrapFunction0(cgme_CardFactory$addActionCards$lambda$_6_0_get)],
cgme_CardFactory$addActionCards$lambda$_6_1, 0, jl_Object, [juf_Supplier], 1, 0, 0, ["$get0", $rt_wrapFunction0(cgme_CardFactory$addActionCards$lambda$_6_1_get)],
cgme_CardFactory$addActionCards$lambda$_6_2, 0, jl_Object, [juf_Supplier], 1, 0, 0, ["$get0", $rt_wrapFunction0(cgme_CardFactory$addActionCards$lambda$_6_2_get)],
cgme_CardFactory$addActionCards$lambda$_6_3, 0, jl_Object, [juf_Supplier], 1, 0, 0, ["$get0", $rt_wrapFunction0(cgme_CardFactory$addActionCards$lambda$_6_3_get)],
cgme_CardFactory$addActionCards$lambda$_6_4, 0, jl_Object, [juf_Supplier], 1, 0, 0, ["$get0", $rt_wrapFunction0(cgme_CardFactory$addActionCards$lambda$_6_4_get)],
cgme_CardFactory$addActionCards$lambda$_6_5, 0, jl_Object, [juf_Supplier], 1, 0, 0, ["$get0", $rt_wrapFunction0(cgme_CardFactory$addActionCards$lambda$_6_5_get)],
cgme_CardFactory$addActionCards$lambda$_6_6, 0, jl_Object, [juf_Supplier], 1, 0, 0, ["$get0", $rt_wrapFunction0(cgme_CardFactory$addActionCards$lambda$_6_6_get)],
cgme_CardFactory$addActionCards$lambda$_6_7, 0, jl_Object, [juf_Supplier], 1, 0, 0, ["$get0", $rt_wrapFunction0(cgme_CardFactory$addActionCards$lambda$_6_7_get)],
cgme_CardFactory$addActionCards$lambda$_6_8, 0, jl_Object, [juf_Supplier], 1, 0, 0, ["$get0", $rt_wrapFunction0(cgme_CardFactory$addActionCards$lambda$_6_8_get)],
cgme_CardFactory$addActionCards$lambda$_6_9, 0, jl_Object, [juf_Supplier], 1, 0, 0, ["$get0", $rt_wrapFunction0(cgme_CardFactory$addActionCards$lambda$_6_9_get)],
cgme_CardFactory$addRentCards$lambda$_7_0, 0, jl_Object, [juf_Supplier], 1, 0, 0, ["$get0", $rt_wrapFunction0(cgme_CardFactory$addRentCards$lambda$_7_0_get)],
cgma_SimpleBotStrategy$pickBestWildcardColor$lambda$_5_0, 0, jl_Object, [juf_Predicate], 1, 0, 0, ["$test", $rt_wrapFunction1(cgma_SimpleBotStrategy$pickBestWildcardColor$lambda$_5_0_test)],
cgma_SimpleBotStrategy$pickBestWildcardColor$lambda$_5_1, 0, jl_Object, [juf_ToIntFunction], 1, 0, 0, ["$applyAsInt", $rt_wrapFunction1(cgma_SimpleBotStrategy$pickBestWildcardColor$lambda$_5_1_applyAsInt)],
cgma_SimpleBotStrategy$pickBestWildcardColor$lambda$_5_2, 0, jl_Object, [juf_ToIntFunction], 1, 0, 0, ["$applyAsInt", $rt_wrapFunction1(cgma_SimpleBotStrategy$pickBestWildcardColor$lambda$_5_2_applyAsInt)],
cgma_SimpleBotStrategy$pickBestWildcardColor$lambda$_5_3, 0, jl_Object, [juf_ToIntFunction], 1, 0, 0, ["$applyAsInt", $rt_wrapFunction1(cgma_SimpleBotStrategy$pickBestWildcardColor$lambda$_5_3_applyAsInt)],
cgma_SimpleBotStrategy$1, 0, jl_Object, [], 32768, 0, () => cgma_SimpleBotStrategy$1_$callClinit(), 0,
cgmmc_CardType, 0, jl_Enum, [], 65553, 0, () => cgmmc_CardType_$callClinit(), 0,
cgme_CardFactory$addRentCards$lambda$_8_0, 0, jl_Object, [juf_Supplier], 1, 0, 0, ["$get0", $rt_wrapFunction0(cgme_CardFactory$addRentCards$lambda$_8_0_get)],
w_DealBrowser$lambda$chooseAction$17$lambda$_57_0, 0, jl_Object, [juf_Consumer], 1, 0, 0, ["$accept", $rt_wrapFunction1(w_DealBrowser$lambda$chooseAction$17$lambda$_57_0_accept)],
cgma_SimpleBotStrategy$playMultiRent$lambda$_11_0, 0, jl_Object, [juf_Predicate], 1, 0, 0, ["$test", $rt_wrapFunction1(cgma_SimpleBotStrategy$playMultiRent$lambda$_11_0_test)],
cgma_SimpleBotStrategy$playForcedDeal$lambda$_14_0, 0, jl_Object, [juf_ToIntFunction], 1, 0, 0, ["$applyAsInt", $rt_wrapFunction1(cgma_SimpleBotStrategy$playForcedDeal$lambda$_14_0_applyAsInt)]]);
$rt_metadata([cgma_SimpleBotStrategy$playForcedDeal$lambda$_14_1, 0, jl_Object, [juf_ToIntFunction], 1, 0, 0, ["$applyAsInt", $rt_wrapFunction1(cgma_SimpleBotStrategy$playForcedDeal$lambda$_14_1_applyAsInt)],
w_DealBrowser$chooseRentMultiplier$lambda$_15_0, 0, jl_Object, [juf_Predicate], 1, 0, 0, ["$test", $rt_wrapFunction1(w_DealBrowser$chooseRentMultiplier$lambda$_15_0_test)],
w_DealBrowser$chooseRentMultiplier$lambda$_15_1, 0, jl_Object, [juf_Consumer], 1, 0, 0, 0,
cgma_SimpleBotStrategy$pickRichestOpponent$lambda$_17_0, 0, jl_Object, [juf_Predicate], 1, 0, 0, ["$test", $rt_wrapFunction1(cgma_SimpleBotStrategy$pickRichestOpponent$lambda$_17_0_test)],
cgma_SimpleBotStrategy$pickRichestOpponent$lambda$_17_1, 0, jl_Object, [juf_ToIntFunction], 1, 0, 0, ["$applyAsInt", $rt_wrapFunction1(cgma_SimpleBotStrategy$pickRichestOpponent$lambda$_17_1_applyAsInt)],
cgma_SimpleBotStrategy$pickBestRentColor$lambda$_15_0, 0, jl_Object, [juf_Predicate], 1, 0, 0, ["$test", $rt_wrapFunction1(cgma_SimpleBotStrategy$pickBestRentColor$lambda$_15_0_test)],
cgma_SimpleBotStrategy$pickBestRentColor$lambda$_15_1, 0, jl_Object, [juf_Predicate], 1, 0, 0, ["$test", $rt_wrapFunction1(cgma_SimpleBotStrategy$pickBestRentColor$lambda$_15_1_test)],
cgma_SimpleBotStrategy$pickBestRentColor$lambda$_15_2, 0, jl_Object, [juf_ToIntFunction], 1, 0, 0, ["$applyAsInt", $rt_wrapFunction1(cgma_SimpleBotStrategy$pickBestRentColor$lambda$_15_2_applyAsInt)],
cgma_SimpleBotStrategy$pickBestRentColor$lambda$_15_3, 0, jl_Object, [juf_Function], 1, 0, 0, ["$apply0", $rt_wrapFunction1(cgma_SimpleBotStrategy$pickBestRentColor$lambda$_15_3_apply)],
cgma_SimpleBotStrategy$countDoubleRentCards$lambda$_16_0, 0, jl_Object, [juf_Predicate], 1, 0, 0, ["$test", $rt_wrapFunction1(cgma_SimpleBotStrategy$countDoubleRentCards$lambda$_16_0_test)],
cgma_SimpleBotStrategy$countDoubleRentCards$lambda$_16_1, 0, jl_Object, [juf_Function], 1, 0, 0, ["$apply0", $rt_wrapFunction1(cgma_SimpleBotStrategy$countDoubleRentCards$lambda$_16_1_apply)],
cgma_SimpleBotStrategy$countDoubleRentCards$lambda$_16_2, 0, jl_Object, [juf_Predicate], 1, 0, 0, ["$test", $rt_wrapFunction1(cgma_SimpleBotStrategy$countDoubleRentCards$lambda$_16_2_test)],
w_DealBrowser$promptDoubleRentSelection$lambda$_28_0, 0, jl_Object, [juf_Consumer], 1, 0, 0, ["$accept", $rt_wrapFunction1(w_DealBrowser$promptDoubleRentSelection$lambda$_28_0_accept)],
w_DealBrowser$Option, "DealBrowser$Option", 11, jl_Record, [], 16, 0, 0, ["$toString", $rt_wrapFunction0(w_DealBrowser$Option_toString), "$hashCode", $rt_wrapFunction0(w_DealBrowser$Option_hashCode), "$equals", $rt_wrapFunction1(w_DealBrowser$Option_equals)],
juf_IntPredicate, 0, jl_Object, [], 1537, 0, 0, 0,
jusi_SumIntConsumer, 0, jl_Object, [juf_IntPredicate], 1, 0, 0, 0,
ju_GenericEnumSet$1, 0, jl_Object, [ju_Iterator], 0, 0, 0, ["$hasNext", $rt_wrapFunction0(ju_GenericEnumSet$1_hasNext), "$next", $rt_wrapFunction0(ju_GenericEnumSet$1_next)],
juf_IntFunction, 0, jl_Object, [], 1537, 0, 0, 0,
jusi_SimpleStreamImpl$toArray$lambda$_20_0, 0, jl_Object, [juf_IntFunction], 1, 0, 0, ["$apply", $rt_wrapFunction1(jusi_SimpleStreamImpl$toArray$lambda$_20_0_apply)],
cgme_GameEventListener, 0, jl_Object, [], 1537, 0, 0, 0,
ju_Comparator$thenComparingInt$lambda$_5_0, 0, jl_Object, [ju_Comparator], 1, 0, 0, ["$compare0", $rt_wrapFunction2(ju_Comparator$thenComparingInt$lambda$_5_0_compare)],
jusi_FilteringStreamImpl, 0, jusi_WrappingStreamImpl, [], 1, 0, 0, ["$wrap", $rt_wrapFunction1(jusi_FilteringStreamImpl_wrap)],
otci_RandomUtils, 0, jl_Object, [], 1, 0, 0, 0,
cgmcf_CardPlayFlowService$changeWildcardColor$lambda$_2_0, 0, jl_Object, [juf_Supplier], 1, 0, 0, ["$get0", $rt_wrapFunction0(cgmcf_CardPlayFlowService$changeWildcardColor$lambda$_2_0_get)],
cgmcf_CardPlayFlowService$changeWildcardColor$lambda$_2_1, 0, jl_Object, [juf_Supplier], 1, 0, 0, ["$get0", $rt_wrapFunction0(cgmcf_CardPlayFlowService$changeWildcardColor$lambda$_2_1_get)],
w_DealBrowser$lambda$promptDiscard$29$lambda$_45_0, 0, jl_Object, [juf_Function], 1, 0, 0, ["$apply0", $rt_wrapFunction1(w_DealBrowser$lambda$promptDiscard$29$lambda$_45_0_apply)],
cgmmc_BuildingType, 0, jl_Enum, [], 65553, 0, () => cgmmc_BuildingType_$callClinit(), 0,
cgma_SimpleBotStrategy$lambda$pickBestWildcardColor$9$lambda$_39_0, 0, jl_Object, [juf_Function], 1, 0, 0, ["$apply0", $rt_wrapFunction1(cgma_SimpleBotStrategy$lambda$pickBestWildcardColor$9$lambda$_39_0_apply)],
cgma_SimpleBotStrategy$lambda$pickRichestOpponent$25$lambda$_23_0, 0, jl_Object, [juf_ToIntFunction], 1, 0, 0, ["$applyAsInt", $rt_wrapFunction1(cgma_SimpleBotStrategy$lambda$pickRichestOpponent$25$lambda$_23_0_applyAsInt)],
ju_TemplateCollections$NElementSet, 0, ju_TemplateCollections$AbstractImmutableSet, [], 0, 0, 0, ["$forEach", $rt_wrapFunction1(jl_Iterable_forEach), "$iterator", $rt_wrapFunction0(ju_TemplateCollections$NElementSet_iterator), "$size", $rt_wrapFunction0(ju_TemplateCollections$NElementSet_size)],
jusi_FilteringStreamImpl$wrap$lambda$_1_0, 0, jl_Object, [juf_Predicate], 1, 0, 0, ["$test", $rt_wrapFunction1(jusi_FilteringStreamImpl$wrap$lambda$_1_0_test)],
jusi_MappingStreamImpl$wrap$lambda$_1_0, 0, jl_Object, [juf_Predicate], 1, 0, 0, ["$test", $rt_wrapFunction1(jusi_MappingStreamImpl$wrap$lambda$_1_0_test)],
jusi_FindFirstConsumer, 0, jl_Object, [juf_Predicate], 1, 0, 0, ["$test", $rt_wrapFunction1(jusi_FindFirstConsumer_test)],
jusi_SortedStreamImpl, 0, jusi_SimpleStreamImpl, [], 1, 0, 0, ["$next1", $rt_wrapFunction1(jusi_SortedStreamImpl_next), "$estimateSize", $rt_wrapFunction0(jusi_SortedStreamImpl_estimateSize)],
juf_BiFunction, 0, jl_Object, [], 1537, 0, 0, 0,
juf_BinaryOperator, 0, jl_Object, [juf_BiFunction], 1537, 0, 0, 0,
jusi_SimpleStreamImpl$max$lambda$_28_0, 0, jl_Object, [juf_BinaryOperator], 1, 0, 0, ["$apply1", $rt_wrapFunction2(jusi_SimpleStreamImpl$max$lambda$_28_0_apply)],
cgmmc_PropertyCollection$getCompletedSets$lambda$_9_0, 0, jl_Object, [juf_Predicate], 1, 0, 0, ["$test", $rt_wrapFunction1(cgmmc_PropertyCollection$getCompletedSets$lambda$_9_0_test)],
cgmea_ForcedDealEffect$execute$lambda$_1_0, 0, jl_Object, [juf_Consumer], 1, 0, 0, ["$accept", $rt_wrapFunction1(cgmea_ForcedDealEffect$execute$lambda$_1_0_accept)],
cgmea_ForcedDealEffect$execute$lambda$_1_1, 0, jl_Object, [juf_Consumer], 1, 0, 0, ["$accept", $rt_wrapFunction1(cgmea_ForcedDealEffect$execute$lambda$_1_1_accept)],
cgmea_BuildingEffect$execute$lambda$_1_0, 0, jl_Object, [juf_Function], 1, 0, 0, ["$apply0", $rt_wrapFunction1(cgmea_BuildingEffect$execute$lambda$_1_0_apply)],
cgmea_SlyDealEffect$execute$lambda$_1_0, 0, jl_Object, [juf_Consumer], 1, 0, 0, ["$accept", $rt_wrapFunction1(cgmea_SlyDealEffect$execute$lambda$_1_0_accept)],
cgmea_RentEffect$execute$lambda$_1_0, 0, jl_Object, [juf_Predicate], 1, 0, 0, ["$test", $rt_wrapFunction1(cgmea_RentEffect$execute$lambda$_1_0_test)],
cgmea_RentEffect$execute$lambda$_1_1, 0, jl_Object, [juf_Function], 1, 0, 0, ["$apply0", $rt_wrapFunction1(cgmea_RentEffect$execute$lambda$_1_1_apply)],
cgmea_DealBreakerEffect$execute$lambda$_1_0, 0, jl_Object, [juf_Supplier], 1, 0, 0, ["$get0", $rt_wrapFunction0(cgmea_DealBreakerEffect$execute$lambda$_1_0_get)],
cgmea_DealBreakerEffect$execute$lambda$_1_1, 0, jl_Object, [juf_Supplier], 1, 0, 0, ["$get0", $rt_wrapFunction0(cgmea_DealBreakerEffect$execute$lambda$_1_1_get)],
cgmea_DealBreakerEffect$execute$lambda$_1_2, 0, jl_Object, [juf_Function], 1, 0, 0, 0,
cgmea_DealBreakerEffect$execute$lambda$_1_3, 0, jl_Object, [juf_Consumer], 1, 0, 0, 0,
cgmea_BirthdayEffect$execute$lambda$_1_0, 0, jl_Object, [juf_Predicate], 1, 0, 0, ["$test", $rt_wrapFunction1(cgmea_BirthdayEffect$execute$lambda$_1_0_test)],
cgmea_BirthdayEffect$execute$lambda$_1_1, 0, jl_Object, [juf_Function], 1, 0, 0, ["$apply0", $rt_wrapFunction1(cgmea_BirthdayEffect$execute$lambda$_1_1_apply)]]);
$rt_metadata([ju_ArrayDeque$1, 0, jl_Object, [ju_Iterator], 0, 0, 0, ["$next", $rt_wrapFunction0(ju_ArrayDeque$1_next)],
jusi_SimpleStreamImpl$ArrayFillingConsumer, 0, jl_Object, [juf_Predicate], 0, 0, 0, ["$test", $rt_wrapFunction1(jusi_SimpleStreamImpl$ArrayFillingConsumer_test)],
jusi_SimpleStreamImpl$toArray$lambda$_21_0, 0, jl_Object, [juf_Predicate], 1, 0, 0, ["$test", $rt_wrapFunction1(jusi_SimpleStreamImpl$toArray$lambda$_21_0_test)],
jusi_MappingToIntStreamImpl$next$lambda$_1_0, 0, jl_Object, [juf_Predicate], 1, 0, 0, ["$test", $rt_wrapFunction1(jusi_MappingToIntStreamImpl$next$lambda$_1_0_test)],
cgmmc_PropertyCollection$findSetContaining$lambda$_7_0, 0, jl_Object, [juf_Predicate], 1, 0, 0, ["$test", $rt_wrapFunction1(cgmmc_PropertyCollection$findSetContaining$lambda$_7_0_test)],
jusi_LimitingStreamImpl, 0, jusi_SimpleStreamImpl, [], 1, 0, 0, ["$next1", $rt_wrapFunction1(jusi_LimitingStreamImpl_next), "$estimateSize", $rt_wrapFunction0(jusi_LimitingStreamImpl_estimateSize)],
jusi_DistinctStreamImpl$wrap$lambda$_1_0, 0, jl_Object, [juf_Predicate], 1, 0, 0, ["$test", $rt_wrapFunction1(jusi_DistinctStreamImpl$wrap$lambda$_1_0_test)],
jusi_SortedStreamImpl$_init_$lambda$_0_0, 0, jl_Object, [juf_IntFunction], 1, 0, 0, ["$apply", $rt_wrapFunction1(jusi_SortedStreamImpl$_init_$lambda$_0_0_apply)],
cgmea_DealBreakerEffect$validateReceiverCanTakeSet$lambda$_2_0, 0, jl_Object, [juf_Predicate], 1, 0, 0, ["$test", $rt_wrapFunction1(cgmea_DealBreakerEffect$validateReceiverCanTakeSet$lambda$_2_0_test)],
cgmea_DealBreakerEffect$validateReceiverCanTakeSet$lambda$_2_1, 0, jl_Object, [juf_Predicate], 1, 0, 0, ["$test", $rt_wrapFunction1(cgmea_DealBreakerEffect$validateReceiverCanTakeSet$lambda$_2_1_test)],
ju_Comparator$comparing$lambda$_9_0, 0, jl_Object, [ju_Comparator], 1, 0, 0, ["$compare0", $rt_wrapFunction2(ju_Comparator$comparing$lambda$_9_0_compare)],
cgmmc_PropertyCollection$set$lambda$_16_0, 0, jl_Object, [juf_Function], 1, 0, 0, 0,
jusi_LimitingStreamImpl$next$lambda$_1_0, 0, jl_Object, [juf_Predicate], 1, 0, 0, ["$test", $rt_wrapFunction1(jusi_LimitingStreamImpl$next$lambda$_1_0_test)],
jusi_FlatMappingStreamImpl, 0, jusi_SimpleStreamImpl, [], 1, 0, 0, ["$next1", $rt_wrapFunction1(jusi_FlatMappingStreamImpl_next)],
jusi_SimpleStreamImpl$min$lambda$_27_0, 0, jl_Object, [juf_BinaryOperator], 1, 0, 0, ["$apply1", $rt_wrapFunction2(jusi_SimpleStreamImpl$min$lambda$_27_0_apply)],
jusi_ReducingConsumer, 0, jl_Object, [juf_Predicate], 0, 0, 0, ["$test", $rt_wrapFunction1(jusi_ReducingConsumer_test)],
cgmmc_AbstractCardCollection$addAll$lambda$_4_0, 0, jl_Object, [juf_Consumer], 1, 0, 0, ["$accept", $rt_wrapFunction1(cgmmc_AbstractCardCollection$addAll$lambda$_4_0_accept)],
cgmmc_Bank$totalValue$lambda$_2_0, 0, jl_Object, [juf_ToIntFunction], 1, 0, 0, ["$applyAsInt", $rt_wrapFunction1(cgmmc_Bank$totalValue$lambda$_2_0_applyAsInt)],
ju_TemplateCollections$NElementSet$1, 0, jl_Object, [ju_Iterator], 0, 0, 0, ["$hasNext", $rt_wrapFunction0(ju_TemplateCollections$NElementSet$1_hasNext), "$next", $rt_wrapFunction0(ju_TemplateCollections$NElementSet$1_next)],
ju_EnumMap$2, 0, ju_AbstractCollection, [], 0, 0, 0, ["$forEach", $rt_wrapFunction1(jl_Iterable_forEach), "$size", $rt_wrapFunction0(ju_EnumMap$2_size), "$iterator", $rt_wrapFunction0(ju_EnumMap$2_iterator)],
cgme_StandardRentCalculator$calculateRent$lambda$_1_0, 0, jl_Object, [juf_Supplier], 1, 0, 0, ["$get0", $rt_wrapFunction0(cgme_StandardRentCalculator$calculateRent$lambda$_1_0_get)],
jusi_FlatMappingStreamImpl$next$lambda$_1_0, 0, jl_Object, [juf_Predicate], 1, 0, 0, ["$test", $rt_wrapFunction1(jusi_FlatMappingStreamImpl$next$lambda$_1_0_test)],
ju_EnumMap$2$1, 0, jl_Object, [ju_Iterator], 0, 0, 0, ["$hasNext", $rt_wrapFunction0(ju_EnumMap$2$1_hasNext), "$next", $rt_wrapFunction0(ju_EnumMap$2$1_next)],
jusi_SimpleStreamImpl$forEachOrdered$lambda$_19_0, 0, jl_Object, [juf_Predicate], 1, 0, 0, ["$test", $rt_wrapFunction1(jusi_SimpleStreamImpl$forEachOrdered$lambda$_19_0_test)],
w_DealBrowser$lambda$submit$8$lambda$_66_0, 0, jl_Object, [juf_Predicate], 1, 0, 0, ["$test", $rt_wrapFunction1(w_DealBrowser$lambda$submit$8$lambda$_66_0_test)],
w_DealBrowser$lambda$playerData$39$lambda$_35_0, 0, jl_Object, [juf_Function], 1, 0, 0, ["$apply0", $rt_wrapFunction1(w_DealBrowser$lambda$playerData$39$lambda$_35_0_apply)],
cgma_SimpleBotStrategy$lambda$pickBestWildcardColor$11$lambda$_37_0, 0, jl_Object, [juf_Function], 1, 0, 0, ["$apply0", $rt_wrapFunction1(cgma_SimpleBotStrategy$lambda$pickBestWildcardColor$11$lambda$_37_0_apply)],
cgma_SimpleBotStrategy$lambda$pickBestWildcardColor$13$lambda$_35_0, 0, jl_Object, [juf_Function], 1, 0, 0, ["$apply0", $rt_wrapFunction1(cgma_SimpleBotStrategy$lambda$pickBestWildcardColor$13$lambda$_35_0_apply)],
ju_HashMap$1, 0, ju_AbstractSet, [], 0, 0, 0, ["$forEach", $rt_wrapFunction1(jl_Iterable_forEach), "$iterator", $rt_wrapFunction0(ju_HashMap$1_iterator)],
ju_EnumMap$1, 0, ju_AbstractSet, [], 0, 0, 0, ["$forEach", $rt_wrapFunction1(jl_Iterable_forEach)],
ju_HashMap$AbstractMapIterator, 0, jl_Object, [], 0, 0, 0, ["$hasNext", $rt_wrapFunction0(ju_HashMap$AbstractMapIterator_hasNext)],
ju_HashMap$KeyIterator, 0, ju_HashMap$AbstractMapIterator, [ju_Iterator], 0, 0, 0, ["$next", $rt_wrapFunction0(ju_HashMap$KeyIterator_next)],
ju_EnumMap$1$1, 0, jl_Object, [ju_Iterator], 0, 0, 0, 0,
ju_LinkedHashMapKeySet, 0, ju_AbstractSet, [ju_SequencedSet], 0, 0, 0, ["$forEach", $rt_wrapFunction1(jl_Iterable_forEach), "$iterator", $rt_wrapFunction0(ju_LinkedHashMapKeySet_iterator)],
ju_LinkedHashMapIterator$KeyIterator, 0, ju_LinkedHashMapIterator, [ju_Iterator], 0, 0, 0, ["$next", $rt_wrapFunction0(ju_LinkedHashMapIterator$KeyIterator_next)],
ju_EnumMap$1$EntryImpl, 0, jl_Object, [ju_Map$Entry], 0, 0, 0, 0,
cgmmc_PropertySet$removeCard$lambda$_4_0, 0, jl_Object, [juf_Function], 1, 0, 0, ["$apply0", $rt_wrapFunction1(cgmmc_PropertySet$removeCard$lambda$_4_0_apply)],
cgmmc_PropertySet$removeCard$lambda$_4_1, 0, jl_Object, [juf_Function], 1, 0, 0, ["$apply0", $rt_wrapFunction1(cgmmc_PropertySet$removeCard$lambda$_4_1_apply)],
cgmmc_PropertySet$removeCard$lambda$_4_2, 0, jl_Object, [juf_Function], 1, 0, 0, ["$apply0", $rt_wrapFunction1(cgmmc_PropertySet$removeCard$lambda$_4_2_apply)],
jusi_SimpleStreamIterator, 0, jl_Object, [ju_Iterator], 1, 0, 0, 0,
jusi_SimpleStreamIterator$fetchIfNeeded$lambda$_4_0, 0, jl_Object, [juf_Predicate], 1, 0, 0, ["$test", $rt_wrapFunction1(jusi_SimpleStreamIterator$fetchIfNeeded$lambda$_4_0_test)]]);
$rt_enumConstantsMetadata([
    cgmmg_PlayerType, () => [cgmmg_PlayerType_HUMAN, cgmmg_PlayerType_COMPUTER], cgmmc_ActionType, () => [cgmmc_ActionType_SLY_DEAL, cgmmc_ActionType_FORCED_DEAL, cgmmc_ActionType_DEAL_BREAKER, cgmmc_ActionType_DEBT_COLLECTOR, cgmmc_ActionType_ITS_MY_BIRTHDAY, cgmmc_ActionType_RENT, cgmmc_ActionType_MULTI_COLOUR_RENT, cgmmc_ActionType_DOUBLE_THE_RENT, cgmmc_ActionType_PASS_GO, cgmmc_ActionType_JUST_SAY_NO, cgmmc_ActionType_HOUSE, cgmmc_ActionType_HOTEL], cgmmg_TurnState, () => [cgmmg_TurnState_NOT_STARTED, cgmmg_TurnState_START_OF_TURN,
    cgmmg_TurnState_PLAYING_CARDS, cgmmg_TurnState_AWAITING_TARGET, cgmmg_TurnState_AWAITING_PAYMENT, cgmmg_TurnState_DISCARDING, cgmmg_TurnState_TURN_END, cgmmg_TurnState_GAME_OVER], cgmmc_PropertyColor, () => [cgmmc_PropertyColor_BROWN, cgmmc_PropertyColor_LIGHT_BLUE, cgmmc_PropertyColor_PINK, cgmmc_PropertyColor_ORANGE, cgmmc_PropertyColor_RED, cgmmc_PropertyColor_YELLOW, cgmmc_PropertyColor_GREEN, cgmmc_PropertyColor_DARK_BLUE, cgmmc_PropertyColor_RAILROAD, cgmmc_PropertyColor_UTILITY, cgmmc_PropertyColor_ANY],
    cgmep_PaymentReason, () => [cgmep_PaymentReason_RENT, cgmep_PaymentReason_DEBT_COLLECTOR, cgmep_PaymentReason_BIRTHDAY], cgmmc_CardType, () => [cgmmc_CardType_PROPERTY, cgmmc_CardType_MONEY, cgmmc_CardType_ACTION, cgmmc_CardType_WILDCARD, cgmmc_CardType_BUILDING], cgmmc_BuildingType, () => [cgmmc_BuildingType_HOUSE, cgmmc_BuildingType_HOTEL]]);
let $rt_booleanArrayCls = $rt_arraycls($rt_booleancls),
$rt_charArrayCls = $rt_arraycls($rt_charcls),
$rt_byteArrayCls = $rt_arraycls($rt_bytecls),
$rt_intArrayCls = $rt_arraycls($rt_intcls);
$rt_stringPool(["null", "interface ", "class ", "", "[L", "[]", " is not subtype of ", "0", "String is null", "String contains invalid digits: ", "String contains digits out of radix ", ": ", "The value is too big for integer type", "The value is too big for int type: ", "Illegal radix: ", "String is empty", "暂时无法执行这一步。", "请等到你的出牌阶段。", " cancelled the payment with Just Say No", "需支付 ", "M。资产不足时，交出所有可用牌。", "选择付款用牌", "当前没有可用的目标或地产。", "选择 ", " 张手牌弃掉。", "回合结束前弃牌", "players", "turn", "phase", "deck", "discard", "plays",
"winner", "choice", "title", "help", "options", "min", "max", "required", "amount", "notice", "log", "name", "handCount", "hand", "bank", "balance", "completed", "sets", "id", "value", "type", "description", "canBank", "你", "机器人", "Game started with AI", "从手牌里选一张卡，存入银行、放置地产或发动行动。", ",", "请选择符合要求的选项。", "[Bot] step skipped: unexpected state ", "[Bot] cmd failed: ", "Bot error: ", "[Bot] force-end failed: ", "Bot force-end error: ", "[Bot] step skipped: not bot turn (state=", "Selected payment card is no longer available",
" paid ", "M to ", " (", " received ", "M from ", "Payment amount must not be negative", "Player still has too many cards in hand", "Discarded card must come from the current hand", "Cannot discard the same card twice", "Must discard exactly ", " cards", "Player is not discarding", "INFO", "万能地产颜色", "选择要加入的地产组。", "选择可以放置建筑的完整地产组。", "选一张机器人的地产。", "选择机器人的一个完整地产组。", "选一张你要交出的地产。", "机器人没有可交换的地产。", "选择你要收租的地产颜色。", "移动万能地产", "选择要归入的地产颜色。", "(this Collection)", ", ", "Game not started", "\n", "Only current player can act",
"Not in play phase", "Not enough remaining plays for this combination", "Card is not in the player\'s hand", "Play Just Say No to cancel the previous Just Say No?", "Play Just Say No against ", "--- Turn ", " ---", " ended turn (hand: ", "rent payment", "Debt Collector", "It\'s My Birthday", "Choose a complete set for this building", " attached ", " to ", "No complete property set can accept this building", " played ", "Unsupported card", " banked ", "Wildcard color", "Choose a property color for this wildcard",
"ANY cannot be used as a table color", "This card cannot be banked", "Selected card is not in the player\'s hand", "Max cards played this turn", "Double The Rent only works with Rent cards", "Sly Deal requires exactly one target property card", "Forced Deal requires one property from each side", "Deal Breaker requires a complete-set color", "Two-color Rent cards charge all opponents", "Rent card must use one of its printed colors", "Multi-colour Rent requires a chosen property color", "Unsupported action: ",
"Double The Rent can only be used with Rent cards", "Not enough Double The Rent cards in hand", " was cancelled by Just Say No", " can only be used as a reaction", " requires a target player", "You cannot target yourself", "Can\'t compare ", "{", "[", "Unsupported browser state", "\"", "\\u00", "The payer must choose cards to pay", "Selected cards do not satisfy the payment requirement", "Any Color Wildcards cannot be used for payment", "Payment selection must use cards the payer owns", "Cannot pay with the same card twice",
"No effect: ", "color", "size", "goal", "cards", "detail", "false", "true", "(this Map)", "HUMAN", "COMPUTER", "地产", "银行", "SLY_DEAL", "FORCED_DEAL", "DEAL_BREAKER", "DEBT_COLLECTOR", "ITS_MY_BIRTHDAY", "RENT", "MULTI_COLOUR_RENT", "DOUBLE_THE_RENT", "PASS_GO", "JUST_SAY_NO", "HOUSE", "HOTEL", "Sly Deal stole ", "card is part of a full set and cannot be stolen", "Sly Deal requires a target player and one property card", "Forced Deal Successfully exchanged properties", "The card you chose to take belongs to a complete set and cannot be traded.",
"The card you chose to give belongs to a complete set and cannot be traded.", "Forced Deal Must select a target player and one property card from each side respectively", "Debt Collector: ", " must pay 5M", "Debt Collector requires a target player", "Birthday: all others pay 2M", "Multi-colour Rent requires a target player", "Rent: charging ", "no properties of chosen color to charge rent", "Double The Rent count must be between 0 and 2", "Cannot collect rent without properties.", "Rent requires a chosen color",
"Double The Rent must be played with a Rent card", "Pass Go: draw 2", "Just Say No can only be played as a reaction to an action or payment request", "building validation passed for ", " set", "buildings can only be added to full sets", "building requires target set color", "Deal Breaker took full set of ", " from ", "target does not have a full set of ", "Deal Breaker requires target player and full set color", "Cannot steal this set because your ", " set already has a House", " set already has a Hotel", "Cannot attach a Hotel without a House",
"Stolen buildings require a complete ", "Buildings cannot be attached to ", "Color mismatch", "Property card must be placed in its own color set", "Wildcard cannot be ", "Wildcard cannot join ", "Building card must be attached to a chosen complete set.", "Remove hotel before removing house.", "Cannot attach ", "No property set found for ", "ANY cannot be used as a real property set color.", "ANY cannot be used as a real set color.", "Card value must not be negative", "Card name must not be blank", "M)", "fSet",
"Name capturing group should start with letter", "Is", "In", "Either src or dest is null", "NonCapFSet", "AheadFSet", "BehindFSet", "AtomicFSet", "FinalSet", "<Empty set>", "JointSet", "NonCapJointSet", "PosLookaheadJointSet", "NegLookaheadJointSet", "PosBehindJointSet", "NegBehindJointSet", "<Quant>", "<GroupQuant>", "Lower", "Upper", "ASCII", "Alpha", "Digit", "Alnum", "Punct", "Graph", "Print", "Blank", "Cntrl", "XDigit", "javaLowerCase", "javaUpperCase", "javaWhitespace", "javaMirrored", "javaDefined", "javaDigit",
"javaIdentifierIgnorable", "javaISOControl", "javaJavaIdentifierPart", "javaJavaIdentifierStart", "javaLetter", "javaLetterOrDigit", "javaSpaceChar", "javaTitleCase", "javaUnicodeIdentifierPart", "javaUnicodeIdentifierStart", "Space", "w", "W", "s", "S", "d", "D", "BasicLatin", "Latin-1Supplement", "LatinExtended-A", "LatinExtended-B", "IPAExtensions", "SpacingModifierLetters", "CombiningDiacriticalMarks", "Greek", "Cyrillic", "CyrillicSupplement", "Armenian", "Hebrew", "Arabic", "Syriac", "ArabicSupplement",
"Thaana", "Devanagari", "Bengali", "Gurmukhi", "Gujarati", "Oriya", "Tamil", "Telugu", "Kannada", "Malayalam", "Sinhala", "Thai", "Lao", "Tibetan", "Myanmar", "Georgian", "HangulJamo", "Ethiopic", "EthiopicSupplement", "Cherokee", "UnifiedCanadianAboriginalSyllabics", "Ogham", "Runic", "Tagalog", "Hanunoo", "Buhid", "Tagbanwa", "Khmer", "Mongolian", "Limbu", "TaiLe", "NewTaiLue", "KhmerSymbols", "Buginese", "PhoneticExtensions", "PhoneticExtensionsSupplement", "CombiningDiacriticalMarksSupplement", "LatinExtendedAdditional",
"GreekExtended", "GeneralPunctuation", "SuperscriptsandSubscripts", "CurrencySymbols", "CombiningMarksforSymbols", "LetterlikeSymbols", "NumberForms", "Arrows", "MathematicalOperators", "MiscellaneousTechnical", "ControlPictures", "OpticalCharacterRecognition", "EnclosedAlphanumerics", "BoxDrawing", "BlockElements", "GeometricShapes", "MiscellaneousSymbols", "Dingbats", "MiscellaneousMathematicalSymbols-A", "SupplementalArrows-A", "BraillePatterns", "SupplementalArrows-B", "MiscellaneousMathematicalSymbols-B",
"SupplementalMathematicalOperators", "MiscellaneousSymbolsandArrows", "Glagolitic", "Coptic", "GeorgianSupplement", "Tifinagh", "EthiopicExtended", "SupplementalPunctuation", "CJKRadicalsSupplement", "KangxiRadicals", "IdeographicDescriptionCharacters", "CJKSymbolsandPunctuation", "Hiragana", "Katakana", "Bopomofo", "HangulCompatibilityJamo", "Kanbun", "BopomofoExtended", "CJKStrokes", "KatakanaPhoneticExtensions", "EnclosedCJKLettersandMonths", "CJKCompatibility", "CJKUnifiedIdeographsExtensionA", "YijingHexagramSymbols",
"CJKUnifiedIdeographs", "YiSyllables", "YiRadicals", "ModifierToneLetters", "SylotiNagri", "HangulSyllables", "HighSurrogates", "HighPrivateUseSurrogates", "LowSurrogates", "PrivateUseArea", "CJKCompatibilityIdeographs", "AlphabeticPresentationForms", "ArabicPresentationForms-A", "VariationSelectors", "VerticalForms", "CombiningHalfMarks", "CJKCompatibilityForms", "SmallFormVariants", "ArabicPresentationForms-B", "HalfwidthandFullwidthForms", "all", "Specials", "Cn", "IsL", "Lu", "Ll", "Lt", "Lm", "Lo", "IsM",
"Mn", "Me", "Mc", "N", "Nd", "Nl", "No", "IsZ", "Zs", "Zl", "Zp", "IsC", "Cc", "Cf", "Co", "Cs", "IsP", "Pd", "Ps", "Pe", "Pc", "Po", "IsS", "Sm", "Sc", "Sk", "So", "Pi", "Pf", "posFSet", " ", "^ ", "range:", "CompositeRangeSet:  <nonsurrogate> ", " <surrogate> ", "UCI range:", "decomposed Hangul syllable:", "UCI ", "CI ", "decomposed char:", "<DotAllQuant>", "<DotQuant>", "<SOL>", "WordBoundary", "PreviousMatch", "<EOL>", "EOI", "^", "DotAll", ".", "<Unix MultiLine $>", "<MultiLine $>", "CI back reference: ",
"back reference: ", "UCI back reference: ", "sequence: ", "UCI sequence: ", "CI sequence: ", "Monopoly Deal supports 2-5 players", "Brown/Light Blue Wildcard", "Light Blue/Railroad Wildcard", "Green/Dark Blue Wildcard", "Green/Railroad Wildcard", "Railroad/Utility Wildcard", "Brown/Light Blue Rent", "Pink/Orange Rent", "Red/Yellow Rent", "Green/Dark Blue Rent", "Railroad/Utility Rent", " Property ", "Property: ", "Wildcard", "Wildcard cannot be moved to ", "doubleRentCount must be between 0 and 2", "NOT_STARTED",
"START_OF_TURN", "PLAYING_CARDS", "AWAITING_TARGET", "AWAITING_PAYMENT", "DISCARDING", "TURN_END", "GAME_OVER", "找不到这张牌。", "Enum ", " does not have the ", " constant", "Class does not represent enum", "BROWN", "LIGHT_BLUE", "PINK", "ORANGE", "RED", "YELLOW", "GREEN", "DARK_BLUE", "RAILROAD", "UTILITY", "ANY", "Instant exceeds minimum or maximum instant", "Hotel", "House", "Play on a complete set that already has a House. +4M rent bonus.", "Play on a complete set. +3M rent bonus.", "buildingType cannot be null",
"amount must not be negative", ">>> ", " WINS! <<<", "获胜。", " 张", "租金翻倍", "选择要额外使用的翻倍牌数量。", "选一张对方的地产。", "ACT", "Australia/Darwin", "AET", "Australia/Sydney", "AGT", "America/Argentina/Buenos_Aires", "ART", "Africa/Cairo", "AST", "America/Anchorage", "BET", "America/Sao_Paulo", "BST", "Asia/Dhaka", "CAT", "Africa/Harare", "CNT", "America/St_Johns", "CST", "America/Chicago", "CTT", "Asia/Shanghai", "EAT", "Africa/Addis_Ababa", "ECT", "Europe/Paris", "IET", "America/Indiana/Indianapolis", "IST", "Asia/Kolkata",
"JST", "Asia/Tokyo", "MIT", "Pacific/Apia", "NET", "Asia/Yerevan", "NST", "Pacific/Auckland", "PLT", "Asia/Karachi", "PNT", "America/Phoenix", "PRT", "America/Puerto_Rico", "PST", "America/Los_Angeles", "SST", "Pacific/Guadalcanal", "VST", "Asia/Ho_Chi_Minh", "EST", "-05:00", "MST", "-07:00", "HST", "-10:00", "Zone offset not in valid range: -18:00 to +18:00", "Invalid subclass", "Z", "+", "-", ":", ":0", "BIRTHDAY", "Cannot bank: ", "Invalid money card value: ", "Money card", "Pink/Orange Wildcard", "Red/Yellow Wildcard",
"Any Color Wildcard", "Deal Breaker", "Steal a complete property set", "Forced Deal", "Swap one property with another player", "Sly Deal", "Steal one non-complete property", "Just Say No", "Cancel an action card", "Target player pays 5M", "All other players pay 2M", "Double The Rent", "Double a rent charge", "Pass Go", "Draw 2 cards", "Multi-colour Rent", "Charge rent for any color", "PROPERTY", "MONEY", "ACTION", "WILDCARD", "BUILDING", "Charge rent for ", " or ", "Option[", "id=", ", name=", ", detail=", ", value=",
"]", "Wildcard must already be on the table", "Wildcard is no longer on the table", "target does not own any properties of color ", "target no longer owns any properties of color ", "No property set found for color: "]);
jl_String.prototype.toString = function() {
    return $rt_ustr(this);
};
jl_String.prototype.valueOf = jl_String.prototype.toString;
jl_Object.prototype.toString = function() {
    return $rt_ustr(jl_Object_toString(this));
};
jl_Object.prototype.__teavm_class__ = function() {
    return $dbg_class(this);
};
let $rt_jso_marker = Symbol('jsoClass');
(() => {
    let c;
})();
export { w_DealBrowser_start$exported$0 as start, w_DealBrowser_play$exported$1 as play, w_DealBrowser_moveWildcard$exported$2 as moveWildcard, w_DealBrowser_endTurn$exported$3 as endTurn, w_DealBrowser_stepBot$exported$4 as stepBot, w_DealBrowser_submit$exported$5 as submit, w_DealBrowser_cancel$exported$6 as cancel };

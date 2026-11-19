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
}),
$rt_charcls = $rt_createPrimitiveCls("char", "C", 4, meta => {
}),
$rt_intcls = $rt_createPrimitiveCls("int", "I", 5, meta => {
}),
$rt_voidcls = $rt_createPrimitiveCls("void", "V", 9, meta => {
    meta.valueToObject = () => null;
}),
$rt_compare = (a, b) => a === b ? 0 : a < b ?  -1 : 1,
$rt_udiv = (a, b) => (a >>> 0) / (b >>> 0) >>> 0,
$rt_umod = (a, b) => (a >>> 0) % (b >>> 0) >>> 0,
$rt_ucmp = (a, b) => {
    a >>>= 0;
    b >>>= 0;
    return a < b ?  -1 : a > b ? 1 : 0;
},
Long_ZERO = BigInt(0),
Long_fromInt = val => BigInt.asIntN(64, BigInt(val | 0)),
Long_ge = (a, b) => a >= b,
Long_add = (a, b) => BigInt.asIntN(64, a + b),
Long_sub = (a, b) => BigInt.asIntN(64, a - b),
$rt_createArray = (cls, sz) => {
    let data = new Array(sz);
    data.fill(null);
    return new ($rt_arraycls(cls))(data);
},
$rt_createCharArray = sz => new $rt_charArrayCls(new Uint16Array(sz)),
$rt_createIntArray = sz => new $rt_intArrayCls(new Int32Array(sz)),
$rt_createBooleanArray = sz => new $rt_booleanArrayCls(new Int8Array(sz)),
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
$rt_str = str => str === null ? null : jl_String__init_1(str),
$rt_ustr = str => str === null ? null : str.$nativeString,
$rt_stringClassInit = () => jl_String_$callClinit(),
$rt_intern;
{
    $rt_intern = str => str;
}
let $rt_isInstance = (obj, cls) => obj instanceof $rt_objcls() && !!obj.constructor[$rt_meta] && $rt_isAssignable(obj.constructor, cls),
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
let $rt_throwableMessage = t => jl_Throwable_getMessage(t),
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
jl_Object_toString = $this => {
    let var$1, var$2, var$3, var$4, var$5, var$6, var$7, var$8, var$9, var$10;
    var$1 = jl_Class_getName(jl_Object_getClass($this));
    var$2 = $this;
    if (!var$2.$id$)
        var$2.$id$ = $rt_nextId();
    var$3 = $this.$id$;
    jl_Integer_$callClinit();
    if (!var$3)
        var$4 = $rt_s(0);
    else {
        if (!var$3)
            var$5 = 32;
        else {
            var$6 = 0;
            var$5 = var$3 >>> 16 | 0;
            if (var$5)
                var$6 = 16;
            else
                var$5 = var$3;
            var$7 = var$5 >>> 8 | 0;
            if (!var$7)
                var$7 = var$5;
            else
                var$6 = var$6 | 8;
            var$5 = var$7 >>> 4 | 0;
            if (!var$5)
                var$5 = var$7;
            else
                var$6 = var$6 | 4;
            var$7 = var$5 >>> 2 | 0;
            if (!var$7)
                var$7 = var$5;
            else
                var$6 = var$6 | 2;
            if (var$7 >>> 1 | 0)
                var$6 = var$6 | 1;
            var$5 = (32 - var$6 | 0) - 1 | 0;
        }
        var$5 = (((32 - var$5 | 0) + 4 | 0) - 1 | 0) / 4 | 0;
        var$8 = $rt_createCharArray(var$5);
        var$9 = var$8.data;
        var$6 = (var$5 - 1 | 0) * 4 | 0;
        var$7 = 0;
        while (var$6 >= 0) {
            var$10 = var$7 + 1 | 0;
            var$9[var$7] = jl_Character_forDigit((var$3 >>> var$6 | 0) & 15, 16);
            var$6 = var$6 - 4 | 0;
            var$7 = var$10;
        }
        var$4 = jl_String__init_0(var$8);
    }
    var$2 = jl_StringBuilder__init_();
    jl_StringBuilder_append(jl_StringBuilder_append1(jl_StringBuilder_append(var$2, var$1), 64), var$4);
    return jl_StringBuilder_toString(var$2);
},
jl_Object_clone = $this => {
    let $cls, $result, var$3;
    $cls = (jl_Object_getClass($this)).$classInfo;
    if (!$rt_isInstance($this, jl_Cloneable) && $cls[$rt_meta].itemType === null) {
        $cls = new jl_CloneNotSupportedException;
        jl_Exception__init_($cls);
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
jl_CharSequence = $rt_classWithoutFields(0),
jl_String = $rt_classWithoutFields(),
jl_String_EMPTY_CHARS = null,
jl_String_EMPTY = null,
jl_String_CASE_INSENSITIVE_ORDER = null,
jl_String_$callClinit = () => {
    jl_String_$callClinit = $rt_eraseClinit(jl_String);
    jl_String__clinit_();
},
jl_String__init_ = ($this, $characters) => {
    jl_String_$callClinit();
    $this.$nativeString = $rt_charArrayToString($characters.data, 0, $characters.data.length);
},
jl_String__init_0 = var_0 => {
    let var_1 = new jl_String();
    jl_String__init_(var_1, var_0);
    return var_1;
},
jl_String__init_2 = (var$0, var$1) => {
    var$0.$nativeString = var$1;
},
jl_String__init_1 = var_0 => {
    let var_1 = new jl_String();
    jl_String__init_2(var_1, var_0);
    return var_1;
},
jl_String__clinit_ = () => {
    let var$1;
    jl_String_EMPTY_CHARS = $rt_createCharArray(0);
    var$1 = new jl_String;
    jl_String_$callClinit();
    var$1.$nativeString = "";
    jl_String_EMPTY = var$1;
    jl_String_CASE_INSENSITIVE_ORDER = new jl_String$_clinit_$lambda$_118_0;
},
jlr_AnnotatedElement = $rt_classWithoutFields(0),
jlr_GenericDeclaration = $rt_classWithoutFields(0),
jlr_Type = $rt_classWithoutFields(0);
function jl_Class() {
    let a = this; jl_Object.call(a);
    a.$flags = 0;
    a.$classInfo = null;
    a.$name = null;
}
let jl_Class_createClass = $classInfo => {
    let var$2;
    var$2 = new jl_Class;
    var$2.$classInfo = $classInfo;
    return var$2;
},
jl_Class_getName = $this => {
    let var$1, $metadataName, $result, $itemType, $itemName;
    var$1 = $this.$flags;
    if (!(var$1 & 1)) {
        $this.$flags = var$1 | 1;
        $metadataName = $this.$classInfo[$rt_meta].name;
        $result = $metadataName === null ? null : $rt_str($metadataName);
        if ($result === null) {
            $itemType = $this.$classInfo[$rt_meta].itemType;
            if ($itemType !== null) {
                $itemName = jl_Class_getName($rt_cls($itemType));
                if ($itemName !== null) {
                    if ($itemType[$rt_meta].itemType !== null) {
                        $metadataName = jl_StringBuilder__init_();
                        jl_StringBuilder_append(jl_StringBuilder_append1($metadataName, 91), $itemName);
                        $result = jl_StringBuilder_toString($metadataName);
                    } else {
                        $metadataName = jl_StringBuilder__init_();
                        jl_StringBuilder_append1(jl_StringBuilder_append(jl_StringBuilder_append($metadataName, $rt_s(1)), $itemName), 59);
                        $result = jl_StringBuilder_toString($metadataName);
                    }
                }
            }
        }
        $this.$name = $result;
    }
    return $this.$name;
},
jl_Class_getComponentType = $this => {
    let $itemTypeInfo;
    $itemTypeInfo = $this.$classInfo[$rt_meta].itemType;
    return $itemTypeInfo === null ? null : $rt_cls($itemTypeInfo);
},
jl_Number = $rt_classWithoutFields(),
jl_Integer = $rt_classWithoutFields(jl_Number),
jl_Integer_TYPE = null,
jl_Integer_$callClinit = () => {
    jl_Integer_$callClinit = $rt_eraseClinit(jl_Integer);
    jl_Integer__clinit_();
},
jl_Integer__clinit_ = () => {
    jl_Integer_TYPE = $rt_cls($rt_intcls);
};
function jl_AbstractStringBuilder() {
    let a = this; jl_Object.call(a);
    a.$buffer = null;
    a.$length = 0;
}
let jl_AbstractStringBuilder_insertSpace = ($this, $start, $end) => {
    let var$3, $sz, $i, var$6;
    var$3 = $this.$length;
    $sz = var$3 - $start | 0;
    var$3 = (var$3 + $end | 0) - $start | 0;
    jl_StringBuilder_ensureCapacity($this, var$3);
    $i = $sz - 1 | 0;
    while ($i >= 0) {
        var$6 = $this.$buffer.data;
        var$6[$end + $i | 0] = var$6[$start + $i | 0];
        $i = $i + (-1) | 0;
    }
    $this.$length = $this.$length + ($end - $start | 0) | 0;
},
jl_Appendable = $rt_classWithoutFields(0),
jl_StringBuilder = $rt_classWithoutFields(jl_AbstractStringBuilder),
jl_StringBuilder__init_0 = $this => {
    $this.$buffer = $rt_createCharArray(16);
},
jl_StringBuilder__init_ = () => {
    let var_0 = new jl_StringBuilder();
    jl_StringBuilder__init_0(var_0);
    return var_0;
},
jl_StringBuilder_append = ($this, $obj) => {
    let var$2, var$3, var$4, var$5, var$6, var$7, var$8;
    var$2 = $this.$length;
    var$3 = $this;
    $obj = $obj === null ? $rt_s(2) : $obj;
    var$4 = var$3;
    if (var$2 >= 0 && var$2 <= var$4.$length) {
        a: {
            b: {
                if ($obj === null)
                    $obj = $rt_s(2);
                else if ($obj.$nativeString.length ? 0 : 1)
                    break b;
                var$5 = var$4.$length + $obj.$nativeString.length | 0;
                jl_StringBuilder_ensureCapacity(var$4, var$5);
                var$6 = var$4.$length - 1 | 0;
                while (var$6 >= var$2) {
                    var$4.$buffer.data[var$6 + $obj.$nativeString.length | 0] = var$4.$buffer.data[var$6];
                    var$6 = var$6 + (-1) | 0;
                }
                var$4.$length = var$4.$length + $obj.$nativeString.length | 0;
                var$5 = 0;
                while (var$5 < $obj.$nativeString.length) {
                    var$7 = var$4.$buffer;
                    var$8 = var$2 + 1 | 0;
                    if (var$5 < 0)
                        break a;
                    if (var$5 >= $obj.$nativeString.length)
                        break a;
                    var$7.data[var$2] = $obj.$nativeString.charCodeAt(var$5);
                    var$5 = var$5 + 1 | 0;
                    var$2 = var$8;
                }
            }
            return $this;
        }
        $rt_throw(jl_StringIndexOutOfBoundsException__init_());
    }
    $obj = new jl_StringIndexOutOfBoundsException;
    jl_IndexOutOfBoundsException__init_($obj);
    $rt_throw($obj);
},
jl_StringBuilder_append0 = ($this, $value) => {
    let var$2, var$3, var$4, var$5, var$6, var$7, var$8, var$9;
    var$2 = $this.$length;
    var$3 = 1;
    if ($value < 0) {
        var$3 = 0;
        $value =  -$value | 0;
    }
    a: {
        if ($rt_ucmp($value, 10) < 0) {
            if (var$3)
                jl_AbstractStringBuilder_insertSpace($this, var$2, var$2 + 1 | 0);
            else {
                jl_AbstractStringBuilder_insertSpace($this, var$2, var$2 + 2 | 0);
                var$4 = $this.$buffer.data;
                var$5 = var$2 + 1 | 0;
                var$4[var$2] = 45;
                var$2 = var$5;
            }
            $this.$buffer.data[var$2] = jl_Character_forDigit($value, 10);
        } else {
            var$6 = 1;
            var$7 = 1;
            var$5 = $rt_udiv((-1), 10);
            b: {
                c: {
                    while (true) {
                        var$8 = var$6 * 10 | 0;
                        if ($rt_ucmp(var$8, $value) > 0)
                            break c;
                        var$7 = var$7 + 1 | 0;
                        if ($rt_ucmp(var$8, var$5) > 0)
                            break;
                        var$6 = var$8;
                    }
                    break b;
                }
                var$8 = var$6;
            }
            if (!var$3)
                var$7 = var$7 + 1 | 0;
            jl_AbstractStringBuilder_insertSpace($this, var$2, var$2 + var$7 | 0);
            if (var$3)
                var$5 = var$2;
            else {
                var$4 = $this.$buffer.data;
                var$5 = var$2 + 1 | 0;
                var$4[var$2] = 45;
            }
            while (true) {
                if (!var$8)
                    break a;
                var$4 = $this.$buffer.data;
                var$9 = var$5 + 1 | 0;
                var$4[var$5] = jl_Character_forDigit($rt_udiv($value, var$8), 10);
                $value = $rt_umod($value, var$8);
                var$8 = $rt_udiv(var$8, 10);
                var$5 = var$9;
            }
        }
    }
    return $this;
},
jl_StringBuilder_append1 = ($this, $c) => {
    let var$2, var$3;
    var$2 = $this.$length;
    var$3 = $this;
    jl_AbstractStringBuilder_insertSpace(var$3, var$2, var$2 + 1 | 0);
    var$3.$buffer.data[var$2] = $c;
    return $this;
},
jl_StringBuilder_toString = $this => {
    let var$1, var$2, var$3, var$4, var$5;
    var$1 = new jl_String;
    var$2 = $this.$buffer;
    var$3 = var$2.data;
    var$4 = $this.$length;
    jl_String_$callClinit();
    var$5 = var$3.length;
    if (var$4 >= 0 && var$4 <= (var$5 - 0 | 0)) {
        var$1.$nativeString = $rt_charArrayToString(var$2.data, 0, var$4);
        return var$1;
    }
    var$1 = new jl_IndexOutOfBoundsException;
    jl_Exception__init_(var$1);
    $rt_throw(var$1);
},
jl_StringBuilder_ensureCapacity = ($this, var$1) => {
    let var$2, var$3, var$4, var$5;
    var$2 = $this.$buffer.data.length;
    if (var$2 < var$1) {
        var$1 = var$2 >= 1073741823 ? 2147483647 : jl_Math_max(var$1, jl_Math_max(var$2 * 2 | 0, 5));
        var$3 = $this.$buffer.data;
        var$4 = $rt_createCharArray(var$1);
        var$5 = var$4.data;
        var$1 = jl_Math_min(var$1, var$3.length);
        var$2 = 0;
        while (var$2 < var$1) {
            var$5[var$2] = var$3[var$2];
            var$2 = var$2 + 1 | 0;
        }
        $this.$buffer = var$4;
    }
};
function jl_Throwable() {
    let a = this; jl_Object.call(a);
    a.$message = null;
    a.$cause = null;
    a.$suppressionEnabled = 0;
    a.$writableStackTrace = 0;
    a.$suppressed = null;
}
let jl_Throwable_fillInStackTrace = $this => {
    return $this;
},
jl_Throwable_initNativeException = $this => {
    $rt_fillNativeException($this);
},
jl_Throwable_getMessage = $this => {
    return $this.$message;
},
jl_Throwable_getCause = $this => {
    let var$1;
    var$1 = $this.$cause;
    if (var$1 === $this)
        var$1 = null;
    return var$1;
},
jl_Exception = $rt_classWithoutFields(jl_Throwable),
jl_Exception__init_ = $this => {
    $this.$suppressed = $rt_createArray(jl_Throwable, 0);
    jl_Throwable_initNativeException($this);
    $this.$suppressionEnabled = 1;
    $this.$writableStackTrace = 1;
},
jl_Exception__init_0 = () => {
    let var_0 = new jl_Exception();
    jl_Exception__init_(var_0);
    return var_0;
},
jl_RuntimeException = $rt_classWithoutFields(jl_Exception),
jl_RuntimeException__init_ = ($this, $message) => {
    $this.$suppressed = $rt_createArray(jl_Throwable, 0);
    jl_Throwable_initNativeException($this);
    $this.$suppressionEnabled = 1;
    $this.$writableStackTrace = 1;
    $this.$message = $message;
},
jl_RuntimeException__init_0 = var_0 => {
    let var_1 = new jl_RuntimeException();
    jl_RuntimeException__init_(var_1, var_0);
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
w_FroggerBrowser = $rt_classWithoutFields(),
w_FroggerBrowser_listener = null,
w_FroggerBrowser_game = null,
w_FroggerBrowser_screen = null,
w_FroggerBrowser_$callClinit = () => {
    w_FroggerBrowser_$callClinit = $rt_eraseClinit(w_FroggerBrowser);
    w_FroggerBrowser__clinit_();
},
w_FroggerBrowser__clinit_ = () => {
    w_FroggerBrowser_listener = new fd_PlayerListener;
},
w_FroggerBrowser_reset$exported$0 = () => {
    let var$1, var$2, var$3, var$4, var$5, var$6;
    w_FroggerBrowser_$callClinit();
    w_BrowserClock_elapsed = Long_ZERO;
    var$1 = w_FroggerBrowser_listener;
    var$1.$keys = 0;
    var$2 = new fm_FroggerGame;
    var$2.$pause = 0;
    var$2.$gameOver = 0;
    var$2.$gameWon = 0;
    var$2.$upWasPressed = 0;
    var$2.$downWasPressed = 0;
    var$2.$leftWasPressed = 0;
    var$2.$rightWasPressed = 0;
    var$2.$pauseWasPressed = 0;
    var$2.$currentLevel = 1;
    var$2.$lastTimerUpdate = Long_ZERO;
    var$2.$farthestLane0 = 0;
    var$2.$listener = var$1;
    var$2.$playerLives = 3;
    var$2.$playerScore = 0;
    var$2.$currentLevel = 1;
    var$2.$timer = 30;
    var$2.$gameWon = 0;
    var$2.$gameOver = 0;
    var$1 = new fm_Frog;
    var$1.$width0 = 40.0;
    var$1.$height = 40.0;
    var$1.$onMovingObject = 0;
    var$1.$platformSpeed = 0.0;
    var$1.$farthestLane = 0;
    var$1.$currentSpeed = 0.0;
    var$1.$x = 300.0;
    var$1.$y = 750.0;
    var$1.$startX = 300.0;
    var$1.$startY = 750.0;
    var$2.$frog = var$1;
    var$2.$vehicles = ju_ArrayList__init_();
    var$2.$woods = ju_ArrayList__init_();
    var$2.$turtles = ju_ArrayList__init_();
    var$3 = $rt_createBooleanArray(5);
    var$4 = var$3.data;
    var$2.$homes = var$3;
    var$5 = 0;
    var$6 = var$4.length;
    while (var$5 < var$6) {
        var$4[var$5] = 0;
        var$5 = var$5 + 1 | 0;
    }
    fm_FroggerGame_createLevel(var$2, var$2.$currentLevel);
    w_FroggerBrowser_game = var$2;
    w_FroggerBrowser_screen = null;
},
w_FroggerBrowser_step$exported$1 = var$1 => {
    let var$2, var$3, var$4, var$5, var$6, var$7, var$8, var$9, var$10, var$11, var$12, var$13, var$14, var$15, var$16, var$17;
    w_FroggerBrowser_$callClinit();
    var$2 = var$1;
    var$1 = w_FroggerBrowser_game;
    if (!var$1.$pause && !fm_FroggerGame_isGameOver(var$1)) {
        var$1 = w_FroggerBrowser_game;
        var$3 = var$1.$gameWon;
        if (!var$3) {
            w_FroggerBrowser_listener.$keys = var$2;
            w_BrowserClock_elapsed = Long_add(w_BrowserClock_elapsed, Long_fromInt(17));
            if (!var$3 && !var$1.$gameOver && !var$1.$pause) {
                var$3 = var$1.$listener.$keys;
                var$4 = !(var$3 & 1) ? 0 : 1;
                var$5 = !(var$3 & 2) ? 0 : 1;
                var$6 = !(var$3 & 4) ? 0 : 1;
                var$7 = !(var$3 & 8) ? 0 : 1;
                if (var$4 && !var$1.$upWasPressed) {
                    var$8 = var$1.$frog;
                    var$9 = var$8.$y - 50.0;
                    if (var$9 >= 0.0)
                        var$8.$y = var$9;
                    fm_Frog_leaveMovingObject(var$8);
                }
                var$1.$upWasPressed = var$4;
                if (var$5 && !var$1.$downWasPressed) {
                    var$8 = var$1.$frog;
                    var$9 = var$8.$y + 50.0;
                    if (var$9 <= 800.0)
                        var$8.$y = var$9;
                    fm_Frog_leaveMovingObject(var$8);
                }
                var$1.$downWasPressed = var$5;
                if (var$6 && !var$1.$leftWasPressed) {
                    var$8 = var$1.$frog;
                    var$9 = var$8.$x - 50.0;
                    if (var$9 >= 0.0)
                        var$8.$x = var$9;
                    fm_Frog_leaveMovingObject(var$8);
                }
                var$1.$leftWasPressed = var$6;
                if (var$7 && !var$1.$rightWasPressed) {
                    var$8 = var$1.$frog;
                    var$9 = var$8.$x + 50.0;
                    if (var$9 <= 600.0)
                        var$8.$x = var$9;
                    fm_Frog_leaveMovingObject(var$8);
                }
                var$1.$rightWasPressed = var$7;
                var$1.$pauseWasPressed = 0;
                var$10 = w_BrowserClock_elapsed;
                if (Long_ge(Long_sub(var$10, var$1.$lastTimerUpdate), Long_fromInt(1000))) {
                    var$2 = var$1.$timer - 1 | 0;
                    var$1.$timer = var$2;
                    var$1.$lastTimerUpdate = var$10;
                    if (var$2 <= 0) {
                        fm_FroggerGame_loseLife(var$1);
                        var$1.$timer = 30;
                    }
                }
                var$8 = ju_ArrayList__init_();
                var$11 = var$1.$vehicles;
                var$12 = var$8;
                ju_AbstractCollection_addAll(var$12, var$11);
                ju_AbstractCollection_addAll(var$12, var$1.$woods);
                ju_AbstractCollection_addAll(var$12, var$1.$turtles);
                var$11 = ju_AbstractList_iterator(var$8);
                while (ju_AbstractList$1_hasNext(var$11)) {
                    (ju_AbstractList$1_next(var$11)).$move();
                }
                a: {
                    fm_Frog_leaveMovingObject(var$1.$frog);
                    if (fm_Frog_isInRiver(var$1.$frog)) {
                        var$2 = 0;
                        var$12 = ju_AbstractList_iterator(var$1.$woods);
                        b: {
                            c: {
                                while (ju_AbstractList$1_hasNext(var$12)) {
                                    var$8 = ju_AbstractList$1_next(var$12);
                                    var$11 = var$1.$frog;
                                    var$13 = new wp_Rectangle2D;
                                    var$14 = var$11.$x;
                                    var$15 = var$11.$width0;
                                    var$14 = var$14 - var$15 / 2.0;
                                    var$16 = var$11.$y;
                                    var$17 = var$11.$height;
                                    wp_Rectangle2D__init_(var$13, var$14, var$16 - var$17 / 2.0, var$15, var$17);
                                    if (wp_Rectangle2D_intersects(var$13, fm_Wood_getBounds(var$8)))
                                        break c;
                                }
                                break b;
                            }
                            fm_Frog_setOnMovingObject(var$1.$frog, var$8.$speed1);
                            var$2 = 1;
                        }
                        if (!var$2) {
                            var$12 = ju_AbstractList_iterator(var$1.$turtles);
                            while (true) {
                                if (!ju_AbstractList$1_hasNext(var$12))
                                    break a;
                                var$8 = ju_AbstractList$1_next(var$12);
                                var$11 = var$1.$frog;
                                var$13 = new wp_Rectangle2D;
                                var$14 = var$11.$x;
                                var$15 = var$11.$width0;
                                var$14 = var$14 - var$15 / 2.0;
                                var$16 = var$11.$y;
                                var$17 = var$11.$height;
                                wp_Rectangle2D__init_(var$13, var$14, var$16 - var$17 / 2.0, var$15, var$17);
                                if (wp_Rectangle2D_intersects(var$13, fm_Turtle_getBounds(var$8)))
                                    break;
                            }
                            fm_Frog_setOnMovingObject(var$1.$frog, var$8.$speed0);
                        }
                    }
                }
                fm_Frog_moveWithPlatform(var$1.$frog);
                fm_FroggerGame_checkCollisions(var$1);
                fm_FroggerGame_checkGameOver(var$1);
            }
        }
    }
},
w_FroggerBrowser_setPaused$exported$2 = var$1 => {
    let var$2;
    w_FroggerBrowser_$callClinit();
    var$2 = var$1 ? 1 : 0;
    w_FroggerBrowser_game.$pause = var$2;
},
w_FroggerBrowser_paint$exported$3 = () => {
    let var$1, var$2, var$3, var$4, var$5, var$6, var$7, var$8, var$9, var$10, var$11, var$12, var$13, var$14;
    w_FroggerBrowser_$callClinit();
    if (w_FroggerBrowser_screen === null) {
        var$1 = new fd_GameScreen;
        var$1.$game = w_FroggerBrowser_game;
        var$2 = new wp_Canvas;
        var$3 = new wp_GraphicsContext;
        var$3.$ctx = (document.getElementById('frog-board')).getContext('2d');
        var$2.$context = var$3;
        var$2.$width = 600.0;
        var$2.$height0 = 800.0;
        var$1.$canvas = var$2;
        var$1.$gc = var$3;
        w_FroggerBrowser_screen = var$1;
    }
    var$2 = w_FroggerBrowser_screen;
    var$1 = var$2.$gc;
    var$3 = var$2.$canvas;
    var$4 = var$3.$width;
    var$5 = var$3.$height0;
    var$1.$ctx.clearRect(0.0, 0.0, var$4, var$5);
    var$1 = var$2.$gc;
    wp_GraphicsContext_setFill(var$1, $rt_s(3));
    var$3 = var$2.$canvas;
    wp_GraphicsContext_fillRect(var$1, 0.0, 0.0, var$3.$width, var$3.$height0);
    wp_GraphicsContext_setFill(var$1, $rt_s(4));
    var$6 = 0;
    while (var$6 < 5) {
        var$7 = 50 + (var$6 * 110 | 0) | 0;
        wp_GraphicsContext_fillRect(var$1, var$7, 30.0, 60.0, 40.0);
        var$8 = var$1.$ctx;
        var$3 = "white";
        var$8.strokeStyle = var$3;
        var$3 = var$1.$ctx;
        var$8 = 2.0;
        var$3.lineWidth = var$8;
        var$1.$ctx.strokeRect(var$7, 30.0, 60.0, 40.0);
        var$6 = var$6 + 1 | 0;
    }
    wp_GraphicsContext_setFill(var$1, $rt_s(5));
    wp_GraphicsContext_fillRect(var$1, 0.0, 80.0, var$2.$canvas.$width, 250.0);
    wp_GraphicsContext_setFill(var$1, $rt_s(6));
    wp_GraphicsContext_fillRect(var$1, 0.0, 375.0, var$2.$canvas.$width, 250.0);
    var$1 = var$2.$gc;
    var$3 = ju_ArrayList__init_();
    var$9 = ju_AbstractList_iterator(var$2.$game.$vehicles);
    while (ju_AbstractList$1_hasNext(var$9)) {
        var$8 = ju_AbstractList$1_next(var$9);
        ju_ArrayList_add(var$3, var$8);
    }
    var$9 = ju_AbstractList_iterator(var$2.$game.$woods);
    while (ju_AbstractList$1_hasNext(var$9)) {
        var$8 = ju_AbstractList$1_next(var$9);
        ju_ArrayList_add(var$3, var$8);
    }
    var$9 = ju_AbstractList_iterator(var$2.$game.$turtles);
    while (ju_AbstractList$1_hasNext(var$9)) {
        var$8 = ju_AbstractList$1_next(var$9);
        ju_ArrayList_add(var$3, var$8);
    }
    var$8 = ju_AbstractList_iterator(var$3);
    while (ju_AbstractList$1_hasNext(var$8)) {
        var$3 = ju_AbstractList$1_next(var$8);
        if (!(var$3 instanceof fm_Vehicle)) {
            if (var$3 instanceof fm_Wood)
                a: {
                    b: {
                        c: {
                            var$3 = var$3;
                            var$10 = var$3.$type;
                            fd_GameScreen$1_$callClinit();
                            switch (fd_GameScreen$1_$SwitchMap$fg$model$WoodType.data[var$10.$ordinal]) {
                                case 1:
                                    break;
                                case 2:
                                    break c;
                                default:
                                    break b;
                            }
                            fd_GameScreen_drawWood1(var$2, var$1, var$3);
                            break a;
                        }
                        fd_GameScreen_drawWood2(var$2, var$1, var$3);
                        break a;
                    }
                    fd_GameScreen_drawWood1(var$2, var$1, var$3);
                }
            else if (var$3 instanceof fm_Turtle)
                fd_GameScreen_drawTurtle(var$2, var$1, var$3);
        } else
            d: {
                e: {
                    f: {
                        g: {
                            var$3 = var$3;
                            var$11 = var$3.$x0;
                            var$7 = var$3.$y0;
                            var$10 = var$3.$type0;
                            var$6 = var$10.$gridSize0;
                            var$9 = var$10.$color;
                            fd_GameScreen$1_$callClinit();
                            switch (fd_GameScreen$1_$SwitchMap$fg$model$VehicleType.data[var$10.$ordinal]) {
                                case 1:
                                    break;
                                case 2:
                                    break g;
                                case 3:
                                    break f;
                                default:
                                    break e;
                            }
                            fd_GameScreen_drawVehicle1(var$2, var$1, var$3, var$11, var$7, var$6, var$9);
                            break d;
                        }
                        fd_GameScreen_drawVehicle2(var$2, var$1, var$3, var$11, var$7, var$6, var$9);
                        break d;
                    }
                    fd_GameScreen_drawVehicle3(var$2, var$1, var$3, var$11, var$7, var$6, var$9);
                    break d;
                }
                fd_GameScreen_drawVehicle1(var$2, var$1, var$3, var$11, var$7, var$6, var$9);
            }
    }
    var$3 = var$2.$game.$frog;
    fd_GameScreen_drawFrogShape(var$2, var$1, var$3.$x, var$3.$y, 3);
    var$12 = var$2.$game.$homes;
    var$13 = 0;
    while (true) {
        var$14 = var$12.data;
        if (var$13 >= var$14.length)
            break;
        if (var$14[var$13])
            fd_GameScreen_drawFrogShape(var$2, var$1, (55 + (var$13 * 110 | 0) | 0) + 25 | 0, 50.0, 3);
        var$13 = var$13 + 1 | 0;
    }
    fd_GameScreen_drawUI(var$2, var$2.$gc);
},
w_FroggerBrowser_score$exported$4 = () => {
    w_FroggerBrowser_$callClinit();
    return w_FroggerBrowser_game.$playerScore;
},
w_FroggerBrowser_lives$exported$5 = () => {
    w_FroggerBrowser_$callClinit();
    return w_FroggerBrowser_game.$playerLives;
},
w_FroggerBrowser_level$exported$6 = () => {
    w_FroggerBrowser_$callClinit();
    return w_FroggerBrowser_game.$currentLevel;
},
w_FroggerBrowser_timer$exported$7 = () => {
    w_FroggerBrowser_$callClinit();
    return w_FroggerBrowser_game.$timer;
},
w_FroggerBrowser_frogX$exported$8 = () => {
    w_FroggerBrowser_$callClinit();
    return w_FroggerBrowser_game.$frog.$x;
},
w_FroggerBrowser_frogY$exported$9 = () => {
    w_FroggerBrowser_$callClinit();
    return w_FroggerBrowser_game.$frog.$y;
},
w_FroggerBrowser_won$exported$10 = () => {
    w_FroggerBrowser_$callClinit();
    return !!w_FroggerBrowser_game.$gameWon;
},
w_FroggerBrowser_homes$exported$11 = () => {
    let var$1, var$2, var$3, var$4;
    w_FroggerBrowser_$callClinit();
    var$1 = 0;
    var$2 = w_FroggerBrowser_game.$homes.data;
    var$3 = var$2.length;
    var$4 = 0;
    while (var$4 < var$3) {
        if (var$2[var$4])
            var$1 = var$1 + 1 | 0;
        var$4 = var$4 + 1 | 0;
    }
    return var$1;
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
jl_String$_clinit_$lambda$_118_0 = $rt_classWithoutFields(),
jl_Character = $rt_classWithoutFields(),
jl_Character_TYPE = null,
jl_Character_characterCache = null,
jl_Character_$callClinit = () => {
    jl_Character_$callClinit = $rt_eraseClinit(jl_Character);
    jl_Character__clinit_();
},
jl_Character_forDigit = (var$1, $radix) => {
    jl_Character_$callClinit();
    if ($radix >= 2 && $radix <= 36 && var$1 >= 0 && var$1 < $radix)
        return var$1 < 10 ? (48 + var$1 | 0) & 65535 : ((97 + var$1 | 0) - 10 | 0) & 65535;
    return 0;
},
jl_Character__clinit_ = () => {
    jl_Character_TYPE = $rt_cls($rt_charcls);
    jl_Character_characterCache = $rt_createArray(jl_Character, 128);
};
function fd_PlayerListener() {
    jl_Object.call(this);
    this.$keys = 0;
}
let ju_Objects = $rt_classWithoutFields(),
otji_JSWrapper = $rt_classWithoutFields(),
w_BrowserClock = $rt_classWithoutFields(),
w_BrowserClock_elapsed = Long_ZERO;
function fm_FroggerGame() {
    let a = this; jl_Object.call(a);
    a.$playerLives = 0;
    a.$playerScore = 0;
    a.$pause = 0;
    a.$gameOver = 0;
    a.$gameWon = 0;
    a.$frog = null;
    a.$vehicles = null;
    a.$woods = null;
    a.$turtles = null;
    a.$homes = null;
    a.$upWasPressed = 0;
    a.$downWasPressed = 0;
    a.$leftWasPressed = 0;
    a.$rightWasPressed = 0;
    a.$pauseWasPressed = 0;
    a.$currentLevel = 0;
    a.$timer = 0;
    a.$lastTimerUpdate = Long_ZERO;
    a.$farthestLane0 = 0;
    a.$listener = null;
}
let fm_FroggerGame_createLevel = ($this, $level) => {
    let $i, $turtleSpeed, $vehicleSpeed, $denseVehicleCount, $vehicleCount, var$7, var$8, $woodSpeed, $fasterWoodSpeed, var$11;
    ju_ArrayList_clear($this.$vehicles);
    ju_ArrayList_clear($this.$woods);
    ju_ArrayList_clear($this.$turtles);
    $i = $level - 1 | 0;
    $turtleSpeed = $i;
    $vehicleSpeed = 2.0 + $turtleSpeed * 0.5;
    $denseVehicleCount = (3 + $i | 0) + 3 | 0;
    $i = 0;
    $vehicleCount = ($denseVehicleCount / 2 | 0) + 1 | 0;
    while ($i < $vehicleCount) {
        var$7 = $this.$vehicles;
        var$8 = new fm_Vehicle;
        $woodSpeed = $i * 200 | 0;
        fm_VehicleType_$callClinit();
        fm_Vehicle__init_(var$8, $woodSpeed, 450.0, $vehicleSpeed, 1, $level, fm_VehicleType_CAR1);
        ju_ArrayList_add(var$7, var$8);
        var$7 = $this.$vehicles;
        var$8 = fm_Vehicle__init_0($i * 220 | 0, 550.0, $vehicleSpeed, 1, $level, fm_VehicleType_CAR1);
        ju_ArrayList_add(var$7, var$8);
        $i = $i + 1 | 0;
    }
    $i = 0;
    $vehicleCount = $denseVehicleCount / 3 | 0;
    $fasterWoodSpeed = $vehicleSpeed + 2.0;
    while ($i < $vehicleCount) {
        var$8 = $this.$vehicles;
        var$11 = new fm_Vehicle;
        $woodSpeed = $i * 220 | 0;
        fm_VehicleType_$callClinit();
        fm_Vehicle__init_(var$11, $woodSpeed, 400.0, $fasterWoodSpeed, 0, $level, fm_VehicleType_CAR2);
        ju_ArrayList_add(var$8, var$11);
        var$7 = $this.$vehicles;
        var$8 = fm_Vehicle__init_0($i * 200 | 0, 500.0, $vehicleSpeed, 0, $level, fm_VehicleType_CAR3);
        ju_ArrayList_add(var$7, var$8);
        var$7 = $this.$vehicles;
        var$8 = fm_Vehicle__init_0($i * 240 | 0, 600.0, $fasterWoodSpeed, 0, $level, fm_VehicleType_CAR2);
        ju_ArrayList_add(var$7, var$8);
        $i = $i + 1 | 0;
    }
    $woodSpeed = 1.5 + $turtleSpeed * 0.3;
    $turtleSpeed = (-2.0) - $turtleSpeed * 0.4;
    var$11 = $this.$woods;
    var$8 = new fm_Wood;
    fm_WoodType_$callClinit();
    fm_Wood__init_0(var$8, (-100.0), 100.0, $woodSpeed, $level, fm_WoodType_SHORT);
    ju_ArrayList_add(var$11, var$8);
    var$7 = $this.$woods;
    var$8 = fm_Wood__init_(200.0, 100.0, $woodSpeed, $level, fm_WoodType_SHORT);
    ju_ArrayList_add(var$7, var$8);
    var$7 = $this.$woods;
    var$8 = fm_Wood__init_(500.0, 100.0, $woodSpeed, $level, fm_WoodType_SHORT);
    ju_ArrayList_add(var$7, var$8);
    var$7 = $this.$turtles;
    var$8 = fm_Turtle__init_(700.0, 150.0, $turtleSpeed, $level);
    ju_ArrayList_add(var$7, var$8);
    var$7 = $this.$turtles;
    var$8 = fm_Turtle__init_(450.0, 150.0, $turtleSpeed, $level);
    ju_ArrayList_add(var$7, var$8);
    var$7 = $this.$turtles;
    var$8 = fm_Turtle__init_(200.0, 150.0, $turtleSpeed, $level);
    ju_ArrayList_add(var$7, var$8);
    $fasterWoodSpeed = $woodSpeed + 0.5;
    var$8 = $this.$woods;
    var$11 = fm_Wood__init_((-150.0), 200.0, $fasterWoodSpeed, $level, fm_WoodType_LONG);
    ju_ArrayList_add(var$8, var$11);
    var$7 = $this.$woods;
    var$8 = fm_Wood__init_(150.0, 200.0, $fasterWoodSpeed, $level, fm_WoodType_LONG);
    ju_ArrayList_add(var$7, var$8);
    var$7 = $this.$woods;
    var$8 = fm_Wood__init_(450.0, 200.0, $fasterWoodSpeed, $level, fm_WoodType_LONG);
    ju_ArrayList_add(var$7, var$8);
    var$7 = $this.$woods;
    var$8 = fm_Wood__init_((-150.0), 250.0, $woodSpeed, $level, fm_WoodType_SHORT);
    ju_ArrayList_add(var$7, var$8);
    var$7 = $this.$woods;
    var$8 = fm_Wood__init_(150.0, 250.0, $woodSpeed, $level, fm_WoodType_SHORT);
    ju_ArrayList_add(var$7, var$8);
    var$7 = $this.$woods;
    var$8 = fm_Wood__init_(450.0, 250.0, $woodSpeed, $level, fm_WoodType_SHORT);
    ju_ArrayList_add(var$7, var$8);
    var$7 = $this.$turtles;
    var$8 = fm_Turtle__init_(650.0, 300.0, $turtleSpeed, $level);
    ju_ArrayList_add(var$7, var$8);
    var$7 = $this.$turtles;
    var$8 = fm_Turtle__init_(400.0, 300.0, $turtleSpeed, $level);
    ju_ArrayList_add(var$7, var$8);
    var$7 = $this.$turtles;
    var$8 = fm_Turtle__init_(150.0, 300.0, $turtleSpeed, $level);
    ju_ArrayList_add(var$7, var$8);
},
fm_FroggerGame_checkCollisions = $this => {
    let $vehicle, $currentLane, var$3, var$4, var$5, var$6, var$7, var$8, $lanesAdvanced, var$10, var$11, var$12, var$13, var$14;
    $vehicle = $this.$frog;
    $currentLane = (800.0 - $vehicle.$y) / 50.0 | 0;
    var$3 = $vehicle.$farthestLane;
    if ($currentLane > var$3) {
        fm_FroggerGame_addScore($this, ($currentLane - var$3 | 0) * 150 | 0);
        $vehicle.$farthestLane = $currentLane;
    }
    var$4 = ju_AbstractList_iterator($this.$vehicles);
    while (true) {
        if (!ju_AbstractList$1_hasNext(var$4)) {
            if (fm_Frog_isInRiver($this.$frog) && !$this.$frog.$onMovingObject) {
                fm_FroggerGame_loseLife($this);
                return;
            }
            $vehicle = $this.$frog;
            var$5 = $vehicle.$x;
            var$6 = $vehicle.$width0;
            if (!(var$5 <  -var$6) && !(var$5 > 600.0 + var$6)) {
                var$6 = $vehicle.$y;
                if (var$6 >= 25.0 && var$6 <= 65.0) {
                    $currentLane = 0;
                    a: {
                        b: {
                            while (true) {
                                if ($currentLane >= 5)
                                    break b;
                                var$7 = 50 + ($currentLane * 110 | 0) | 0;
                                var$6 = var$7 + 60.0;
                                if (var$5 >= var$7 && var$5 <= var$6)
                                    break;
                                $currentLane = $currentLane + 1 | 0;
                            }
                            break a;
                        }
                        $currentLane = (-1);
                    }
                    if ($currentLane == (-1))
                        fm_FroggerGame_loseLife($this);
                    else {
                        var$8 = $this.$homes.data;
                        if (var$8[$currentLane])
                            fm_FroggerGame_loseLife($this);
                        else {
                            var$8[$currentLane] = 1;
                            fm_FroggerGame_addScore($this, 500);
                            $this.$timer = $this.$timer + 30 | 0;
                            $lanesAdvanced = 0;
                            while (true) {
                                var$8 = $this.$homes.data;
                                if ($lanesAdvanced >= var$8.length)
                                    break;
                                $lanesAdvanced = $lanesAdvanced + 1 | 0;
                            }
                            fm_FroggerGame_resetDestroyedPlayer($this);
                            $lanesAdvanced = 0;
                            var$8 = $this.$homes.data;
                            var$3 = var$8.length;
                            $currentLane = 0;
                            while ($currentLane < var$3) {
                                if (var$8[$currentLane])
                                    $lanesAdvanced = $lanesAdvanced + 1 | 0;
                                $currentLane = $currentLane + 1 | 0;
                            }
                            if ($lanesAdvanced != 5 ? 0 : 1) {
                                fm_FroggerGame_addScore($this, 10000);
                                fm_FroggerGame_addScore($this, $this.$timer * 250 | 0);
                                $lanesAdvanced = $this.$currentLevel;
                                var$3 = $rt_compare($lanesAdvanced, 3);
                                if (var$3 >= 0)
                                    $this.$gameWon = 1;
                                else if (var$3 >= 0)
                                    $this.$gameWon = 1;
                                else {
                                    $lanesAdvanced = $lanesAdvanced + 1 | 0;
                                    $this.$currentLevel = $lanesAdvanced;
                                    $this.$timer = 30;
                                    var$3 = 0;
                                    while (true) {
                                        var$8 = $this.$homes.data;
                                        if (var$3 >= var$8.length)
                                            break;
                                        var$8[var$3] = 0;
                                        var$3 = var$3 + 1 | 0;
                                    }
                                    fm_FroggerGame_createLevel($this, $lanesAdvanced);
                                    fm_FroggerGame_resetDestroyedPlayer($this);
                                }
                            }
                        }
                    }
                }
                return;
            }
            fm_FroggerGame_loseLife($this);
            return;
        }
        $vehicle = ju_AbstractList$1_next(var$4);
        var$10 = $this.$frog;
        var$11 = new wp_Rectangle2D;
        var$6 = var$10.$x;
        var$5 = var$10.$width0;
        var$6 = var$6 - var$5 / 2.0;
        var$12 = var$10.$y;
        var$13 = var$10.$height;
        wp_Rectangle2D__init_(var$11, var$6, var$12 - var$13 / 2.0, var$5, var$13);
        var$10 = new wp_Rectangle2D;
        var$7 = $vehicle.$x0;
        var$14 = $vehicle.$type0;
        var$3 = var$14.$width3;
        var$12 = var$7 - (var$3 / 2 | 0);
        var$7 = $vehicle.$y0;
        $lanesAdvanced = var$14.$height4;
        wp_Rectangle2D__init_(var$10, var$12, var$7 - ($lanesAdvanced / 2 | 0), var$3, $lanesAdvanced);
        if (wp_Rectangle2D_intersects(var$11, var$10))
            break;
    }
    fm_FroggerGame_loseLife($this);
},
fm_FroggerGame_checkGameOver = $this => {
    if (!($this.$timer > 0 && $this.$playerLives > 0))
        $this.$gameOver = 1;
},
fm_FroggerGame_loseLife = $this => {
    let var$1;
    var$1 = $this.$playerLives - 1 | 0;
    $this.$playerLives = var$1;
    if (var$1 > 0) {
        fm_FroggerGame_resetDestroyedPlayer($this);
        $this.$timer = $this.$timer + 30 | 0;
    }
},
fm_FroggerGame_resetDestroyedPlayer = $this => {
    let var$1;
    var$1 = $this.$frog;
    var$1.$x = var$1.$startX;
    var$1.$y = var$1.$startY;
    var$1.$farthestLane = 0;
    fm_Frog_leaveMovingObject(var$1);
},
fm_FroggerGame_isGameOver = $this => {
    return $this.$playerLives > 0 ? 0 : 1;
},
fm_FroggerGame_addScore = ($this, $points) => {
    $this.$playerScore = $this.$playerScore + $points | 0;
};
function fd_GameScreen() {
    let a = this; jl_Object.call(a);
    a.$canvas = null;
    a.$game = null;
    a.$gc = null;
}
let fd_GameScreen_drawFrogShape = ($this, $gc, $centerX, $centerY, $grid) => {
    let var$5, var$6, var$7, var$8, var$9, var$10, var$11, var$12, var$13, var$14;
    wp_GraphicsContext_setFill($gc, $rt_s(7));
    var$5 = 6 * $grid | 0;
    var$6 = $centerX - var$5;
    var$7 = 2 * $grid | 0;
    var$8 = $centerY - var$7;
    var$9 = 12 * $grid | 0;
    var$10 = $grid;
    wp_GraphicsContext_fillRect($gc, var$6, var$8, var$9, var$10);
    var$11 = $centerY + var$10;
    wp_GraphicsContext_fillRect($gc, var$6, var$11, var$9, var$10);
    var$9 = $centerY - var$5;
    var$12 = 5 * $grid | 0;
    wp_GraphicsContext_fillRect($gc, var$6, var$9, var$10, var$12);
    var$13 = $centerX + var$12;
    wp_GraphicsContext_fillRect($gc, var$13, var$9, var$10, var$12);
    wp_GraphicsContext_fillRect($gc, var$6, var$11, var$10, var$12);
    wp_GraphicsContext_fillRect($gc, var$13, var$11, var$10, var$12);
    var$13 = $centerX - (7 * $grid | 0);
    var$14 = $centerY - var$12;
    var$6 = 3 * $grid | 0;
    wp_GraphicsContext_fillRect($gc, var$13, var$14, var$6, var$10);
    var$9 = 4 * $grid | 0;
    var$11 = $centerX + var$9;
    wp_GraphicsContext_fillRect($gc, var$11, var$14, var$6, var$10);
    var$12 = $centerY + var$9;
    wp_GraphicsContext_fillRect($gc, var$13, var$12, var$6, var$10);
    wp_GraphicsContext_fillRect($gc, var$11, var$12, var$6, var$10);
    wp_GraphicsContext_setFill($gc, $rt_s(7));
    wp_GraphicsContext_fillRect($gc, $centerX - var$6, $centerY - var$9, var$5, 8 * $grid | 0);
    wp_GraphicsContext_setFill($gc, $rt_s(8));
    wp_GraphicsContext_fillRect($gc, $centerX - var$7, var$14, var$10, var$10);
    wp_GraphicsContext_fillRect($gc, $centerX + var$10, var$14, var$10, var$10);
    wp_GraphicsContext_setFill($gc, $rt_s(9));
    wp_GraphicsContext_fillRect($gc, $centerX - var$10, var$8, var$7, var$9);
},
fd_GameScreen_drawVehicle1 = ($this, $gc, $vehicle, $x, $y, $grid, $color) => {
    let $centerX, $centerY, var$9, var$10, var$11, var$12, var$13, var$14, var$15, var$16, var$17;
    $centerX = $vehicle.$x0;
    $centerY = $vehicle.$y0;
    wp_GraphicsContext_setFill($gc, $rt_s(10));
    wp_GraphicsContext_beginPath($gc);
    $x = 10 * $grid | 0;
    wp_GraphicsContext_moveTo($gc, $centerX + $x, $centerY);
    var$9 = 7 * $grid | 0;
    var$10 = $centerX + var$9;
    var$11 = 3 * $grid | 0;
    var$12 = $centerY + var$11;
    wp_GraphicsContext_lineTo($gc, var$10, var$12);
    $y = $centerX - (9 * $grid | 0);
    wp_GraphicsContext_lineTo($gc, $y, var$12);
    $x = $centerX - $x;
    var$13 = 2 * $grid | 0;
    var$14 = $centerY + var$13;
    wp_GraphicsContext_lineTo($gc, $x, var$14);
    var$15 = 4 * $grid | 0;
    var$16 = $centerX - var$15;
    wp_GraphicsContext_lineTo($gc, var$16, var$14);
    var$17 = $centerY - var$13;
    wp_GraphicsContext_lineTo($gc, var$16, var$17);
    wp_GraphicsContext_lineTo($gc, $x, var$17);
    $x = $centerY - var$11;
    wp_GraphicsContext_lineTo($gc, $y, $x);
    wp_GraphicsContext_lineTo($gc, var$10, $x);
    wp_GraphicsContext_closePath($gc);
    wp_GraphicsContext_fill($gc);
    wp_GraphicsContext_setFill($gc, $rt_s(7));
    var$10 = $centerX + var$11;
    $x = $centerY - var$15;
    $y = $grid;
    wp_GraphicsContext_fillRect($gc, var$10, $x, $y, $y);
    wp_GraphicsContext_fillRect($gc, var$10, var$12, $y, $y);
    var$10 = $centerX - var$9;
    wp_GraphicsContext_fillRect($gc, var$10, $x, $y, $y);
    wp_GraphicsContext_fillRect($gc, var$10, var$12, $y, $y);
    wp_GraphicsContext_setFill($gc, $rt_s(11));
    $x = $centerX - (8 * $grid | 0);
    wp_GraphicsContext_fillRect($gc, $x, $centerY - (6 * $grid | 0), var$11, var$13);
    var$10 = $centerY + var$15;
    wp_GraphicsContext_fillRect($gc, $x, var$10, var$11, var$13);
    var$12 = $centerX + var$13;
    var$16 = 5 * $grid | 0;
    wp_GraphicsContext_fillRect($gc, var$12, $centerY - var$16, var$11, $y);
    wp_GraphicsContext_fillRect($gc, var$12, var$10, var$11, $y);
    wp_GraphicsContext_setFill($gc, $rt_s(11));
    var$10 = $centerY - $y;
    wp_GraphicsContext_fillRect($gc, $x, var$10, $y, var$13);
    wp_GraphicsContext_fillRect($gc, $centerX - var$16, var$10, $y, var$13);
    wp_GraphicsContext_fillRect($gc, $centerX - var$13, var$10, $y, var$13);
    wp_GraphicsContext_setFill($gc, $rt_s(7));
    $x = $centerX - (11 * $grid | 0);
    wp_GraphicsContext_fillRect($gc, $x, var$17, var$9, $y);
    var$13 = $centerY + $y;
    wp_GraphicsContext_fillRect($gc, $x, var$13, var$9, $y);
    wp_GraphicsContext_setFill($gc, $rt_s(7));
    wp_GraphicsContext_beginPath($gc);
    wp_GraphicsContext_moveTo($gc, $centerX + var$16, $centerY);
    $x = $centerX + var$15;
    wp_GraphicsContext_lineTo($gc, $x, var$14);
    $y = $centerX + $y;
    wp_GraphicsContext_lineTo($gc, $y, var$14);
    wp_GraphicsContext_lineTo($gc, $y, var$13);
    wp_GraphicsContext_lineTo($gc, var$12, var$13);
    wp_GraphicsContext_lineTo($gc, var$12, var$10);
    wp_GraphicsContext_lineTo($gc, $y, var$10);
    wp_GraphicsContext_lineTo($gc, $y, var$17);
    wp_GraphicsContext_lineTo($gc, $x, var$17);
    wp_GraphicsContext_closePath($gc);
    wp_GraphicsContext_fill($gc);
},
fd_GameScreen_drawVehicle2 = ($this, $gc, $vehicle, $x, $y, $grid, $color) => {
    let $centerX, $centerY, var$9, var$10, var$11, var$12, var$13, var$14, var$15, var$16, var$17, var$18, var$19;
    $centerX = $vehicle.$x0;
    $centerY = $vehicle.$y0;
    wp_GraphicsContext_setFill($gc, $rt_s(9));
    wp_GraphicsContext_beginPath($gc);
    $x = 10 * $grid | 0;
    wp_GraphicsContext_moveTo($gc, $centerX - $x, $centerY);
    $y = 7 * $grid | 0;
    var$9 = $centerX - $y;
    var$10 = 3 * $grid | 0;
    var$11 = $centerY + var$10;
    wp_GraphicsContext_lineTo($gc, var$9, var$11);
    var$12 = $centerX + (9 * $grid | 0);
    wp_GraphicsContext_lineTo($gc, var$12, var$11);
    $x = $centerX + $x;
    var$13 = 2 * $grid | 0;
    var$14 = $centerY + var$13;
    wp_GraphicsContext_lineTo($gc, $x, var$14);
    var$15 = 4 * $grid | 0;
    var$16 = $centerX + var$15;
    wp_GraphicsContext_lineTo($gc, var$16, var$14);
    var$17 = $centerY - var$13;
    wp_GraphicsContext_lineTo($gc, var$16, var$17);
    wp_GraphicsContext_lineTo($gc, $x, var$17);
    $x = $centerY - var$10;
    wp_GraphicsContext_lineTo($gc, var$12, $x);
    wp_GraphicsContext_lineTo($gc, var$9, $x);
    wp_GraphicsContext_closePath($gc);
    wp_GraphicsContext_fill($gc);
    wp_GraphicsContext_setFill($gc, $rt_s(3));
    var$9 = $centerX - var$10;
    $x = $centerY - var$15;
    var$12 = $grid;
    wp_GraphicsContext_fillRect($gc, var$9, $x, var$12, var$12);
    wp_GraphicsContext_fillRect($gc, var$9, var$11, var$12, var$12);
    var$18 = $centerX + $y;
    wp_GraphicsContext_fillRect($gc, var$18, $x, var$12, var$12);
    wp_GraphicsContext_fillRect($gc, var$18, var$11, var$12, var$12);
    wp_GraphicsContext_setFill($gc, $rt_s(11));
    $x = 6 * $grid | 0;
    var$9 = $centerX + $x;
    wp_GraphicsContext_fillRect($gc, var$9, $centerY - $x, var$10, var$13);
    var$19 = $centerY + var$15;
    wp_GraphicsContext_fillRect($gc, var$9, var$19, var$10, var$13);
    var$11 = $centerX - var$15;
    $x = 5 * $grid | 0;
    wp_GraphicsContext_fillRect($gc, var$11, $centerY - $x, var$10, var$12);
    wp_GraphicsContext_fillRect($gc, var$11, var$19, var$10, var$12);
    wp_GraphicsContext_setFill($gc, $rt_s(11));
    var$9 = $centerX + var$12;
    var$10 = $centerY - var$12;
    wp_GraphicsContext_fillRect($gc, var$9, var$10, var$12, var$13);
    wp_GraphicsContext_fillRect($gc, var$16, var$10, var$12, var$13);
    wp_GraphicsContext_fillRect($gc, var$18, var$10, var$12, var$13);
    wp_GraphicsContext_setFill($gc, $rt_s(3));
    wp_GraphicsContext_fillRect($gc, var$16, var$17, $y, var$12);
    var$9 = $centerY + var$12;
    wp_GraphicsContext_fillRect($gc, var$16, var$9, $y, var$12);
    wp_GraphicsContext_setFill($gc, $rt_s(3));
    wp_GraphicsContext_beginPath($gc);
    wp_GraphicsContext_moveTo($gc, $centerX - $x, $centerY);
    wp_GraphicsContext_lineTo($gc, var$11, var$14);
    $x = $centerX - var$12;
    wp_GraphicsContext_lineTo($gc, $x, var$14);
    wp_GraphicsContext_lineTo($gc, $x, var$9);
    $y = $centerX - var$13;
    wp_GraphicsContext_lineTo($gc, $y, var$9);
    wp_GraphicsContext_lineTo($gc, $y, var$10);
    wp_GraphicsContext_lineTo($gc, $x, var$10);
    wp_GraphicsContext_lineTo($gc, $x, var$17);
    wp_GraphicsContext_lineTo($gc, var$11, var$17);
    wp_GraphicsContext_closePath($gc);
    wp_GraphicsContext_fill($gc);
},
fd_GameScreen_drawVehicle3 = ($this, $gc, $vehicle, $x, $y, $grid, $color) => {
    let $centerX, $centerY, var$9, var$10, var$11, var$12, var$13, var$14, var$15, var$16, var$17, var$18, var$19, var$20, var$21, var$22;
    $centerX = $vehicle.$x0;
    $centerY = $vehicle.$y0;
    wp_GraphicsContext_setFill($gc, $rt_s(12));
    $x = 6 * $grid | 0;
    var$9 = $centerX - $x;
    var$10 = 4 * $grid | 0;
    var$11 = $centerY - var$10;
    wp_GraphicsContext_fillOval($gc, var$9, var$11, $x, 8 * $grid | 0);
    var$12 = $grid;
    var$13 = $centerX - var$12;
    var$14 = 2 * $grid | 0;
    var$15 = $centerY - var$14;
    wp_GraphicsContext_fillRect($gc, var$13, var$15, var$14, var$10);
    wp_GraphicsContext_setFill($gc, $rt_s(12));
    wp_GraphicsContext_beginPath($gc);
    $y = $centerX + var$12;
    wp_GraphicsContext_moveTo($gc, $y, var$15);
    var$16 = $centerX + var$14;
    wp_GraphicsContext_lineTo($gc, var$16, var$11);
    var$17 = $centerX + var$10;
    wp_GraphicsContext_lineTo($gc, var$17, var$11);
    var$18 = 5 * $grid | 0;
    var$19 = $centerX + var$18;
    var$11 = 3 * $grid | 0;
    wp_GraphicsContext_lineTo($gc, var$19, $centerY - var$11);
    $x = $centerX + $x;
    var$20 = $centerY - var$12;
    wp_GraphicsContext_lineTo($gc, $x, var$20);
    var$21 = $centerY + var$12;
    wp_GraphicsContext_lineTo($gc, $x, var$21);
    wp_GraphicsContext_lineTo($gc, var$19, $centerY + var$11);
    var$22 = $centerY + var$10;
    wp_GraphicsContext_lineTo($gc, var$17, var$22);
    wp_GraphicsContext_lineTo($gc, var$16, var$22);
    wp_GraphicsContext_lineTo($gc, $y, $centerY + var$14);
    wp_GraphicsContext_closePath($gc);
    wp_GraphicsContext_fill($gc);
    wp_GraphicsContext_setFill($gc, $rt_s(7));
    $x = $centerX - var$10;
    $y = $centerY - var$18;
    wp_GraphicsContext_fillRect($gc, $x, $y, var$14, var$12);
    wp_GraphicsContext_fillRect($gc, var$16, $y, var$14, var$12);
    wp_GraphicsContext_fillRect($gc, $x, var$22, var$14, var$12);
    wp_GraphicsContext_fillRect($gc, var$16, var$22, var$14, var$12);
    wp_GraphicsContext_setFill($gc, $rt_s(7));
    $x = $centerX - var$18;
    wp_GraphicsContext_fillRect($gc, $x, var$15, var$14, var$12);
    wp_GraphicsContext_fillRect($gc, $x, var$21, var$14, var$12);
    wp_GraphicsContext_setFill($gc, $rt_s(13));
    wp_GraphicsContext_fillRect($gc, var$9, var$15, var$12, var$10);
    wp_GraphicsContext_fillRect($gc, $centerX + var$11, var$20, var$12, var$14);
    wp_GraphicsContext_fillRect($gc, var$19, var$15, var$14, var$12);
    wp_GraphicsContext_fillRect($gc, var$19, var$21, var$14, var$12);
    wp_GraphicsContext_fillOval($gc, var$13, var$20, var$14, var$14);
},
fd_GameScreen_drawWood1 = ($this, $gc, $wood) => {
    let $centerX, $centerY, $grid, var$6, var$7, var$8, var$9, var$10, var$11, var$12;
    $centerX = $wood.$x1;
    $centerY = $wood.$y1;
    $grid = $wood.$type.$gridSize;
    wp_GraphicsContext_setFill($gc, $rt_s(14));
    var$6 = $centerX - (12 * $grid | 0);
    var$7 = $centerY - (3 * $grid | 0);
    var$8 = 4 * $grid | 0;
    var$9 = 6 * $grid | 0;
    wp_GraphicsContext_fillOval($gc, var$6, var$7, var$8, var$9);
    var$10 = $centerX - (10 * $grid | 0);
    wp_GraphicsContext_fillRect($gc, var$10, var$7, 20 * $grid | 0, var$9);
    wp_GraphicsContext_setFill($gc, $rt_s(10));
    wp_GraphicsContext_fillOval($gc, $centerX + (8 * $grid | 0), var$7, var$8, var$9);
    wp_GraphicsContext_setFill($gc, $rt_s(14));
    var$6 = $centerX + (9 * $grid | 0);
    var$7 = 2 * $grid | 0;
    var$9 = $centerY - var$7;
    wp_GraphicsContext_fillOval($gc, var$6, var$9, var$7, var$8);
    wp_GraphicsContext_setFill($gc, $rt_s(10));
    var$6 = $centerX - (11 * $grid | 0);
    var$11 = $grid / 2 | 0;
    wp_GraphicsContext_fillRect($gc, var$6, $centerY, var$7, var$11);
    wp_GraphicsContext_fillRect($gc, var$10, var$9, var$7, var$11);
    var$6 = 5 * $grid | 0;
    var$10 = $centerX - var$6;
    var$12 = $grid;
    wp_GraphicsContext_fillRect($gc, var$10, $centerY - var$12, var$7, var$11);
    wp_GraphicsContext_fillRect($gc, $centerX + var$7, $centerY, var$7, var$11);
    wp_GraphicsContext_fillRect($gc, $centerX + var$6, $centerY + var$12, var$7, var$11);
    wp_GraphicsContext_fillRect($gc, $centerX + var$8, var$9, var$12, var$11);
},
fd_GameScreen_drawWood2 = ($this, $gc, $wood) => {
    let $centerX, $centerY, $grid, var$6, var$7, var$8, var$9, var$10, var$11, var$12;
    $centerX = $wood.$x1;
    $centerY = $wood.$y1;
    $grid = $wood.$type.$gridSize;
    wp_GraphicsContext_setFill($gc, $rt_s(14));
    var$6 = $centerX - (17 * $grid | 0);
    var$7 = $centerY - (3 * $grid | 0);
    var$8 = 4 * $grid | 0;
    var$9 = 6 * $grid | 0;
    wp_GraphicsContext_fillOval($gc, var$6, var$7, var$8, var$9);
    var$6 = $centerX - (15 * $grid | 0);
    wp_GraphicsContext_fillRect($gc, var$6, var$7, 30 * $grid | 0, var$9);
    wp_GraphicsContext_setFill($gc, $rt_s(10));
    wp_GraphicsContext_fillOval($gc, $centerX + (13 * $grid | 0), var$7, var$8, var$9);
    wp_GraphicsContext_setFill($gc, $rt_s(14));
    var$7 = $centerX + (14 * $grid | 0);
    var$9 = 2 * $grid | 0;
    var$10 = $centerY - var$9;
    wp_GraphicsContext_fillOval($gc, var$7, var$10, var$9, var$8);
    wp_GraphicsContext_setFill($gc, $rt_s(10));
    var$7 = $centerX - (16 * $grid | 0);
    var$8 = $grid / 2 | 0;
    wp_GraphicsContext_fillRect($gc, var$7, $centerY, var$9, var$8);
    wp_GraphicsContext_fillRect($gc, var$6, var$10, var$9, var$8);
    var$11 = 10 * $grid | 0;
    var$6 = $centerX - var$11;
    var$12 = $grid;
    wp_GraphicsContext_fillRect($gc, var$6, $centerY - var$12, var$9, var$8);
    var$7 = $centerX - (7 * $grid | 0);
    var$6 = $centerY + var$12;
    wp_GraphicsContext_fillRect($gc, var$7, var$6, var$9, var$8);
    wp_GraphicsContext_fillRect($gc, $centerX + var$9, $centerY, var$9, var$8);
    wp_GraphicsContext_fillRect($gc, $centerX + var$12, $centerY, var$12, var$8);
    wp_GraphicsContext_fillRect($gc, $centerX + (5 * $grid | 0), var$6, var$9, var$8);
    wp_GraphicsContext_fillRect($gc, $centerX + var$11, var$6, var$9, var$8);
    var$6 = $centerX + (8 * $grid | 0);
    wp_GraphicsContext_fillRect($gc, var$6, $centerY + var$9, var$12, var$8);
    wp_GraphicsContext_fillRect($gc, var$6, var$10, var$9, var$8);
},
fd_GameScreen_drawTurtle = ($this, $gc, $turtle) => {
    let $centerX, $centerY, var$5, var$6, var$7, var$8, var$9;
    $centerX = $turtle.$x2;
    $centerY = $turtle.$y3;
    wp_GraphicsContext_setFill($gc, $rt_s(4));
    var$5 = $centerX - 40.5;
    var$6 = $centerY - 18.0;
    wp_GraphicsContext_fillRect($gc, var$5, var$6, 9.0, 4.5);
    wp_GraphicsContext_fillRect($gc, $centerX - 36.0, var$6, 4.5, 36.0);
    var$7 = $centerY + 13.5;
    wp_GraphicsContext_fillRect($gc, var$5, var$7, 9.0, 4.5);
    var$8 = $centerX - 13.5;
    wp_GraphicsContext_fillRect($gc, var$8, var$6, 9.0, 4.5);
    wp_GraphicsContext_fillRect($gc, var$8, var$6, 4.5, 36.0);
    wp_GraphicsContext_fillRect($gc, var$8, var$7, 9.0, 4.5);
    var$8 = $centerX + 9.0;
    wp_GraphicsContext_fillRect($gc, var$8, var$6, 9.0, 4.5);
    wp_GraphicsContext_fillRect($gc, $centerX + 13.5, var$6, 4.5, 36.0);
    wp_GraphicsContext_fillRect($gc, var$8, var$7, 9.0, 4.5);
    var$9 = $centerX + 36.0;
    wp_GraphicsContext_fillRect($gc, var$9, var$6, 9.0, 4.5);
    wp_GraphicsContext_fillRect($gc, var$9, var$6, 4.5, 36.0);
    wp_GraphicsContext_fillRect($gc, var$9, var$7, 9.0, 4.5);
    wp_GraphicsContext_setFill($gc, $rt_s(11));
    var$7 = $centerY - 13.5;
    wp_GraphicsContext_fillOval($gc, var$5, var$7, 36.0, 27.0);
    wp_GraphicsContext_fillOval($gc, var$8, var$7, 36.0, 27.0);
    wp_GraphicsContext_setFill($gc, $rt_s(10));
    var$5 = $centerX - 27.0;
    var$7 = $centerY + 6.75;
    wp_GraphicsContext_fillRect($gc, var$5, var$7, 9.0, 2.25);
    wp_GraphicsContext_fillRect($gc, $centerX + 22.5, var$7, 9.0, 2.25);
    wp_GraphicsContext_setFill($gc, $rt_s(4));
    var$5 = $centerX - 49.5;
    var$7 = $centerY - 4.5;
    wp_GraphicsContext_fillOval($gc, var$5, var$7, 9.0, 9.0);
    wp_GraphicsContext_fillOval($gc, $centerX, var$7, 9.0, 9.0);
    wp_GraphicsContext_fillRect($gc, $centerX - 4.5, $centerY, 2.6999999999999997, 4.5);
    wp_GraphicsContext_fillRect($gc, $centerX + 45.0, $centerY, 2.6999999999999997, 4.5);
},
fd_GameScreen_drawUI = ($this, $gc) => {
    let var$2, var$3;
    wp_GraphicsContext_setFill($gc, $rt_s(10));
    wp_GraphicsContext_setFont($gc, wp_Font__init_($rt_s(15), 16));
    var$2 = $this.$game.$playerScore;
    var$3 = jl_StringBuilder__init_();
    jl_StringBuilder_append0(jl_StringBuilder_append(var$3, $rt_s(16)), var$2);
    wp_GraphicsContext_fillText($gc, jl_StringBuilder_toString(var$3), 10.0, 650.0);
    var$2 = $this.$game.$playerLives;
    var$3 = jl_StringBuilder__init_();
    jl_StringBuilder_append0(jl_StringBuilder_append(var$3, $rt_s(17)), var$2);
    wp_GraphicsContext_fillText($gc, jl_StringBuilder_toString(var$3), 10.0, 665.0);
    var$2 = $this.$game.$currentLevel;
    var$3 = jl_StringBuilder__init_();
    jl_StringBuilder_append0(jl_StringBuilder_append(var$3, $rt_s(18)), var$2);
    wp_GraphicsContext_fillText($gc, jl_StringBuilder_toString(var$3), 10.0, 680.0);
    var$2 = $this.$game.$timer;
    var$3 = jl_StringBuilder__init_();
    jl_StringBuilder_append(jl_StringBuilder_append0(jl_StringBuilder_append(var$3, $rt_s(19)), var$2), $rt_s(20));
    wp_GraphicsContext_fillText($gc, jl_StringBuilder_toString(var$3), 450.0, 680.0);
    if ($this.$game.$pause) {
        wp_GraphicsContext_setFill($gc, $rt_s(10));
        wp_GraphicsContext_fillText($gc, $rt_s(21), 200.0, 360.0);
    }
    if ($this.$game.$gameWon) {
        wp_GraphicsContext_setFill($gc, $rt_s(22));
        wp_GraphicsContext_setFont($gc, wp_Font__init_($rt_s(15), 36));
        wp_GraphicsContext_fillText($gc, $rt_s(23), $this.$canvas.$width / 2.0 - 70.0, 300.0);
        wp_GraphicsContext_setFont($gc, wp_Font__init_($rt_s(15), 20));
        wp_GraphicsContext_fillText($gc, $rt_s(24), $this.$canvas.$width / 2.0 - 150.0, 350.0);
        var$2 = $this.$game.$playerScore;
        var$3 = jl_StringBuilder__init_();
        jl_StringBuilder_append0(jl_StringBuilder_append(var$3, $rt_s(25)), var$2);
        wp_GraphicsContext_fillText($gc, jl_StringBuilder_toString(var$3), $this.$canvas.$width / 2.0 - 80.0, 400.0);
    }
    if (fm_FroggerGame_isGameOver($this.$game)) {
        wp_GraphicsContext_setFill($gc, $rt_s(11));
        wp_GraphicsContext_setFont($gc, wp_Font__init_($rt_s(15), 24));
        wp_GraphicsContext_fillText($gc, $rt_s(26), 250.0, 300.0);
    }
},
jl_IndexOutOfBoundsException = $rt_classWithoutFields(jl_RuntimeException),
jl_IndexOutOfBoundsException__init_ = $this => {
    jl_Exception__init_($this);
},
jl_IndexOutOfBoundsException__init_0 = () => {
    let var_0 = new jl_IndexOutOfBoundsException();
    jl_IndexOutOfBoundsException__init_(var_0);
    return var_0;
};
function wp_Canvas() {
    let a = this; jl_Object.call(a);
    a.$width = 0.0;
    a.$height0 = 0.0;
    a.$context = null;
}
let fm_Movable = $rt_classWithoutFields(0);
function fm_Frog() {
    let a = this; jl_Object.call(a);
    a.$x = 0.0;
    a.$y = 0.0;
    a.$width0 = 0.0;
    a.$height = 0.0;
    a.$startX = 0.0;
    a.$startY = 0.0;
    a.$onMovingObject = 0;
    a.$platformSpeed = 0.0;
    a.$farthestLane = 0;
    a.$currentSpeed = 0.0;
}
let fm_Frog_isInRiver = $this => {
    let var$1;
    var$1 = $this.$y;
    return !(var$1 >= 75.0 && var$1 <= 300.0) ? 0 : 1;
},
fm_Frog_setOnMovingObject = ($this, $speed) => {
    $this.$onMovingObject = 1;
    $this.$platformSpeed = $speed;
    $this.$currentSpeed = $speed;
},
fm_Frog_leaveMovingObject = $this => {
    $this.$onMovingObject = 0;
    $this.$platformSpeed = 0.0;
    $this.$currentSpeed = 0.0;
},
fm_Frog_moveWithPlatform = $this => {
    if ($this.$onMovingObject)
        $this.$x = $this.$x + $this.$platformSpeed;
};
function wp_GraphicsContext() {
    jl_Object.call(this);
    this.$ctx = null;
}
let wp_GraphicsContext_setFill = ($this, $fill) => {
    let var$2;
    var$2 = $this.$ctx;
    $fill = $rt_ustr($fill);
    var$2.fillStyle = $fill;
},
wp_GraphicsContext_setFont = ($this, $font) => {
    let var$2, var$3, var$4;
    var$2 = $this.$ctx;
    var$3 = $font.$size0;
    var$4 = $font.$family;
    $font = jl_StringBuilder__init_();
    jl_StringBuilder_append(jl_StringBuilder_append(jl_StringBuilder_append0($font, var$3), $rt_s(27)), var$4);
    $font = $rt_ustr(jl_StringBuilder_toString($font));
    var$2.font = $font;
},
wp_GraphicsContext_fillRect = ($this, $x, $y, $w, $h) => {
    $this.$ctx.fillRect($x, $y, $w, $h);
},
wp_GraphicsContext_beginPath = $this => {
    $this.$ctx.beginPath();
},
wp_GraphicsContext_closePath = $this => {
    $this.$ctx.closePath();
},
wp_GraphicsContext_moveTo = ($this, $x, $y) => {
    $this.$ctx.moveTo($x, $y);
},
wp_GraphicsContext_lineTo = ($this, $x, $y) => {
    $this.$ctx.lineTo($x, $y);
},
wp_GraphicsContext_fill = $this => {
    $this.$ctx.fill();
},
wp_GraphicsContext_fillText = ($this, $text, $x, $y) => {
    $this.$ctx.fillText($rt_ustr($text), $x, $y);
},
wp_GraphicsContext_fillOval = ($this, $x, $y, $w, $h) => {
    let var$5, var$6;
    $this.$ctx.beginPath();
    var$5 = $this.$ctx;
    var$6 = $w / 2.0;
    $w = $x + var$6;
    $h = $h / 2.0;
    $y = $y + $h;
    var$5.ellipse($w, $y, var$6, $h, 0.0, 0.0, 6.283185307179586);
    $this.$ctx.fill();
},
jl_Iterable = $rt_classWithoutFields(0),
ju_Collection = $rt_classWithoutFields(0),
ju_AbstractCollection = $rt_classWithoutFields(),
ju_AbstractCollection_addAll = ($this, $c) => {
    let $changed, var$3;
    $changed = 0;
    var$3 = ju_AbstractList_iterator($c);
    while (ju_AbstractList$1_hasNext(var$3)) {
        $c = ju_AbstractList$1_next(var$3);
        if (!ju_ArrayList_add($this, $c))
            continue;
        $changed = 1;
    }
    return $changed;
},
ju_SequencedCollection = $rt_classWithoutFields(0),
ju_List = $rt_classWithoutFields(0);
function ju_AbstractList() {
    ju_AbstractCollection.call(this);
    this.$modCount = 0;
}
let ju_AbstractList_iterator = $this => {
    let var$1;
    var$1 = new ju_AbstractList$1;
    var$1.$this$0 = $this;
    var$1.$modCount0 = $this.$modCount;
    var$1.$size1 = $this.$size;
    var$1.$removeIndex = (-1);
    return var$1;
},
jl_Cloneable = $rt_classWithoutFields(0),
ju_RandomAccess = $rt_classWithoutFields(0);
function ju_ArrayList() {
    let a = this; ju_AbstractList.call(a);
    a.$array = null;
    a.$size = 0;
}
let ju_ArrayList__init_0 = $this => {
    $this.$array = $rt_createArray(jl_Object, 10);
},
ju_ArrayList__init_ = () => {
    let var_0 = new ju_ArrayList();
    ju_ArrayList__init_0(var_0);
    return var_0;
},
ju_ArrayList_add = ($this, $element) => {
    let var$2, var$3, var$4, var$5, var$6, var$7;
    a: {
        var$2 = $this.$size + 1 | 0;
        var$3 = $this.$array.data.length;
        if (var$3 < var$2) {
            var$2 = var$3 >= 1073741823 ? 2147483647 : jl_Math_max(var$2, jl_Math_max(var$3 * 2 | 0, 5));
            var$4 = $this.$array;
            var$5 = jl_Class_getComponentType(jl_Object_getClass(var$4));
            if (var$5 !== null) {
                if (var$5 !== $rt_cls($rt_voidcls)) {
                    if (var$2 >= 0) {
                        var$6 = var$4.data;
                        var$4 = otrr_ClassInfo_newArrayInstance(var$5.$classInfo, var$2);
                        var$7 = jl_Math_min(var$2, var$6.length);
                        var$3 = 0;
                        while (var$3 < var$7) {
                            var$4.data[var$3] = var$6[var$3];
                            var$3 = var$3 + 1 | 0;
                        }
                        $this.$array = var$4;
                        break a;
                    }
                    $element = new jl_NegativeArraySizeException;
                    jl_Exception__init_($element);
                    $rt_throw($element);
                }
                $element = new jl_IllegalArgumentException;
                jl_Exception__init_($element);
                $rt_throw($element);
            }
            $element = new jl_NullPointerException;
            jl_Exception__init_($element);
            $rt_throw($element);
        }
    }
    var$4 = $this.$array.data;
    var$7 = $this.$size;
    $this.$size = var$7 + 1 | 0;
    var$4[var$7] = $element;
    $this.$modCount = $this.$modCount + 1 | 0;
    return 1;
},
ju_ArrayList_clear = $this => {
    let var$1, var$2, var$3, var$4, var$5, var$6;
    var$1 = $this.$array;
    var$2 = 0;
    var$3 = $this.$size;
    var$4 = null;
    if (var$2 <= var$3) {
        while (var$2 < var$3) {
            var$5 = var$1.data;
            var$6 = var$2 + 1 | 0;
            var$5[var$2] = var$4;
            var$2 = var$6;
        }
        $this.$size = 0;
        $this.$modCount = $this.$modCount + 1 | 0;
        return;
    }
    var$4 = new jl_IllegalArgumentException;
    jl_Exception__init_(var$4);
    $rt_throw(var$4);
},
jl_Record = $rt_classWithoutFields();
function wp_Font() {
    let a = this; jl_Record.call(a);
    a.$family = null;
    a.$size0 = 0;
}
let wp_Font__init_0 = ($this, $family, $size) => {
    $this.$family = $family;
    $this.$size0 = $size;
},
wp_Font__init_ = (var_0, var_1) => {
    let var_2 = new wp_Font();
    wp_Font__init_0(var_2, var_0, var_1);
    return var_2;
};
function fm_Wood() {
    let a = this; jl_Object.call(a);
    a.$x1 = 0.0;
    a.$y1 = 0.0;
    a.$speed1 = 0.0;
    a.$level0 = 0;
    a.$type = null;
}
let fm_Wood__init_0 = ($this, $startX, $startY, $speed, $level, $type) => {
    $this.$x1 = $startX;
    $this.$y1 = $startY;
    $this.$speed1 = $speed;
    $this.$level0 = $level;
    $this.$type = $type;
},
fm_Wood__init_ = (var_0, var_1, var_2, var_3, var_4) => {
    let var_5 = new fm_Wood();
    fm_Wood__init_0(var_5, var_0, var_1, var_2, var_3, var_4);
    return var_5;
},
fm_Wood_move = $this => {
    let var$1;
    var$1 = $this.$x1 + $this.$speed1;
    $this.$x1 = var$1;
    if (var$1 > 750.0)
        $this.$x1 = (-150.0);
    else if (var$1 < (-150.0))
        $this.$x1 = 750.0;
},
fm_Wood_getBounds = $this => {
    let var$1, var$2, var$3, var$4, var$5, var$6;
    var$1 = new wp_Rectangle2D;
    var$2 = $this.$x1;
    var$3 = $this.$type;
    var$4 = var$3.$width4;
    var$2 = var$2 - (var$4 / 2 | 0);
    var$5 = $this.$y1;
    var$6 = var$3.$height2;
    wp_Rectangle2D__init_(var$1, var$2, var$5 - (var$6 / 2 | 0), var$4, var$6);
    return var$1;
};
function fm_Turtle() {
    let a = this; jl_Object.call(a);
    a.$x2 = 0.0;
    a.$y3 = 0.0;
    a.$speed0 = 0.0;
    a.$width2 = 0.0;
    a.$height3 = 0.0;
    a.$level = 0;
}
let fm_Turtle__init_0 = ($this, $startX, $startY, $speed, $level) => {
    $this.$width2 = 60.0;
    $this.$height3 = 30.0;
    $this.$x2 = $startX;
    $this.$y3 = $startY;
    $this.$speed0 = $speed;
    $this.$level = $level;
},
fm_Turtle__init_ = (var_0, var_1, var_2, var_3) => {
    let var_4 = new fm_Turtle();
    fm_Turtle__init_0(var_4, var_0, var_1, var_2, var_3);
    return var_4;
},
fm_Turtle_move = $this => {
    let var$1;
    var$1 = $this.$x2 + $this.$speed0;
    $this.$x2 = var$1;
    if (var$1 > 700.0)
        $this.$x2 = (-100.0);
    else if (var$1 < (-100.0))
        $this.$x2 = 700.0;
},
fm_Turtle_getBounds = $this => {
    let var$1, var$2, var$3, var$4, var$5;
    var$1 = new wp_Rectangle2D;
    var$2 = $this.$x2;
    var$3 = $this.$width2;
    var$4 = var$2 - var$3 / 2.0;
    var$5 = $this.$y3;
    var$2 = $this.$height3;
    wp_Rectangle2D__init_(var$1, var$4, var$5 - var$2 / 2.0, var$3, var$2);
    return var$1;
};
function fm_Vehicle() {
    let a = this; jl_Object.call(a);
    a.$x0 = 0.0;
    a.$y0 = 0.0;
    a.$speed = 0.0;
    a.$movingRight = 0;
    a.$level1 = 0;
    a.$type0 = null;
}
let fm_Vehicle__init_ = ($this, $startX, $startY, $speed, $movingRight, $level, $type) => {
    $this.$x0 = $startX;
    $this.$y0 = $startY;
    $this.$speed = $speed;
    $this.$movingRight = $movingRight;
    $this.$level1 = $level;
    $this.$type0 = $type;
},
fm_Vehicle__init_0 = (var_0, var_1, var_2, var_3, var_4, var_5) => {
    let var_6 = new fm_Vehicle();
    fm_Vehicle__init_(var_6, var_0, var_1, var_2, var_3, var_4, var_5);
    return var_6;
},
fm_Vehicle_move = $this => {
    let var$1, var$2;
    if (!$this.$movingRight) {
        var$1 = $this.$x0 - $this.$speed;
        $this.$x0 = var$1;
        if (var$1 < (-100.0))
            $this.$x0 = 700.0;
    } else {
        var$2 = $this.$x0 + $this.$speed;
        $this.$x0 = var$2;
        if (var$2 > 700.0)
            $this.$x0 = (-100.0);
    }
};
function jl_Enum() {
    let a = this; jl_Object.call(a);
    a.$name0 = null;
    a.$ordinal = 0;
}
let jl_Enum__init_ = ($this, $name, $ordinal) => {
    $this.$name0 = $name;
    $this.$ordinal = $ordinal;
};
function fm_VehicleType() {
    let a = this; jl_Enum.call(a);
    a.$width3 = 0;
    a.$height4 = 0;
    a.$gridSize0 = 0;
    a.$color = null;
}
let fm_VehicleType_CAR1 = null,
fm_VehicleType_CAR2 = null,
fm_VehicleType_CAR3 = null,
fm_VehicleType_$VALUES = null,
fm_VehicleType_$callClinit = () => {
    fm_VehicleType_$callClinit = $rt_eraseClinit(fm_VehicleType);
    fm_VehicleType__clinit_();
},
fm_VehicleType__init_0 = ($this, var$1, var$2, $width, $height, $gridSize, $color) => {
    fm_VehicleType_$callClinit();
    jl_Enum__init_($this, var$1, var$2);
    $this.$width3 = $width;
    $this.$height4 = $height;
    $this.$gridSize0 = $gridSize;
    $this.$color = $color;
},
fm_VehicleType__init_ = (var_0, var_1, var_2, var_3, var_4, var_5) => {
    let var_6 = new fm_VehicleType();
    fm_VehicleType__init_0(var_6, var_0, var_1, var_2, var_3, var_4, var_5);
    return var_6;
},
fm_VehicleType__clinit_ = () => {
    let var$1, var$2, var$3;
    fm_VehicleType_CAR1 = fm_VehicleType__init_($rt_s(28), 0, 50, 40, 3, $rt_s(29));
    fm_VehicleType_CAR2 = fm_VehicleType__init_($rt_s(30), 1, 50, 40, 3, $rt_s(31));
    var$1 = fm_VehicleType__init_($rt_s(32), 2, 50, 40, 5, $rt_s(33));
    fm_VehicleType_CAR3 = var$1;
    var$2 = $rt_createArray(fm_VehicleType, 3);
    var$3 = var$2.data;
    var$3[0] = fm_VehicleType_CAR1;
    var$3[1] = fm_VehicleType_CAR2;
    var$3[2] = var$1;
    fm_VehicleType_$VALUES = var$2;
};
function fm_WoodType() {
    let a = this; jl_Enum.call(a);
    a.$width4 = 0;
    a.$height2 = 0;
    a.$gridSize = 0;
}
let fm_WoodType_SHORT = null,
fm_WoodType_LONG = null,
fm_WoodType_$VALUES = null,
fm_WoodType_$callClinit = () => {
    fm_WoodType_$callClinit = $rt_eraseClinit(fm_WoodType);
    fm_WoodType__clinit_();
},
fm_WoodType__init_0 = ($this, var$1, var$2, $width, $height, $gridSize) => {
    fm_WoodType_$callClinit();
    jl_Enum__init_($this, var$1, var$2);
    $this.$width4 = $width;
    $this.$height2 = $height;
    $this.$gridSize = $gridSize;
},
fm_WoodType__init_ = (var_0, var_1, var_2, var_3, var_4) => {
    let var_5 = new fm_WoodType();
    fm_WoodType__init_0(var_5, var_0, var_1, var_2, var_3, var_4);
    return var_5;
},
fm_WoodType__clinit_ = () => {
    let var$1, var$2, var$3;
    fm_WoodType_SHORT = fm_WoodType__init_($rt_s(34), 0, 120, 30, 5);
    var$1 = fm_WoodType__init_($rt_s(35), 1, 180, 30, 5);
    fm_WoodType_LONG = var$1;
    var$2 = $rt_createArray(fm_WoodType, 2);
    var$3 = var$2.data;
    var$3[0] = fm_WoodType_SHORT;
    var$3[1] = var$1;
    fm_WoodType_$VALUES = var$2;
},
jl_IllegalArgumentException = $rt_classWithoutFields(jl_RuntimeException),
fd_GameScreen$1 = $rt_classWithoutFields(),
fd_GameScreen$1_$SwitchMap$fg$model$VehicleType = null,
fd_GameScreen$1_$SwitchMap$fg$model$WoodType = null,
fd_GameScreen$1_$callClinit = () => {
    fd_GameScreen$1_$callClinit = $rt_eraseClinit(fd_GameScreen$1);
    fd_GameScreen$1__clinit_();
},
fd_GameScreen$1__clinit_ = () => {
    let var$1, var$2;
    fm_WoodType_$callClinit();
    var$1 = $rt_createIntArray((fm_WoodType_$VALUES.$clone0()).data.length);
    var$2 = var$1.data;
    fd_GameScreen$1_$SwitchMap$fg$model$WoodType = var$1;
    var$2[fm_WoodType_SHORT.$ordinal] = 1;
    var$2[fm_WoodType_LONG.$ordinal] = 2;
    fm_VehicleType_$callClinit();
    var$2 = $rt_createIntArray((fm_VehicleType_$VALUES.$clone0()).data.length);
    var$1 = var$2.data;
    fd_GameScreen$1_$SwitchMap$fg$model$VehicleType = var$2;
    var$1[fm_VehicleType_CAR1.$ordinal] = 1;
    var$1[fm_VehicleType_CAR2.$ordinal] = 2;
    var$1[fm_VehicleType_CAR3.$ordinal] = 3;
},
jl_CloneNotSupportedException = $rt_classWithoutFields(jl_Exception),
ju_Iterator = $rt_classWithoutFields(0);
function ju_AbstractList$1() {
    let a = this; jl_Object.call(a);
    a.$index = 0;
    a.$modCount0 = 0;
    a.$size1 = 0;
    a.$removeIndex = 0;
    a.$this$0 = null;
}
let ju_AbstractList$1_hasNext = $this => {
    return $this.$index >= $this.$size1 ? 0 : 1;
},
ju_AbstractList$1_next = $this => {
    let var$1, var$2, var$3;
    var$1 = $this.$modCount0;
    var$2 = $this.$this$0;
    if (var$1 == var$2.$modCount) {
        var$3 = $this.$index;
        $this.$removeIndex = var$3;
        $this.$index = var$3 + 1 | 0;
        var$2 = var$2;
        if (var$3 >= 0 && var$3 < var$2.$size)
            return var$2.$array.data[var$3];
        var$2 = new jl_IndexOutOfBoundsException;
        jl_Exception__init_(var$2);
        $rt_throw(var$2);
    }
    var$2 = new ju_ConcurrentModificationException;
    jl_Exception__init_(var$2);
    $rt_throw(var$2);
};
function wp_Rectangle2D() {
    let a = this; jl_Record.call(a);
    a.$x3 = 0.0;
    a.$y2 = 0.0;
    a.$width1 = 0.0;
    a.$height1 = 0.0;
}
let wp_Rectangle2D__init_ = ($this, $x, $y, $width, $height) => {
    $this.$x3 = $x;
    $this.$y2 = $y;
    $this.$width1 = $width;
    $this.$height1 = $height;
},
wp_Rectangle2D__init_0 = (var_0, var_1, var_2, var_3) => {
    let var_4 = new wp_Rectangle2D();
    wp_Rectangle2D__init_(var_4, var_0, var_1, var_2, var_3);
    return var_4;
},
wp_Rectangle2D_intersects = ($this, $other) => {
    let var$2, var$3, var$4;
    a: {
        b: {
            var$2 = $this.$x3;
            var$3 = $other.$x3;
            if (var$2 < var$3 + $other.$width1 && var$2 + $this.$width1 > var$3) {
                var$2 = $this.$y2;
                var$3 = $other.$y2;
                if (var$2 < var$3 + $other.$height1 && var$2 + $this.$height1 > var$3)
                    break b;
            }
            var$4 = 0;
            break a;
        }
        var$4 = 1;
    }
    return var$4;
},
ju_Arrays = $rt_classWithoutFields(),
jl_Math = $rt_classWithoutFields(),
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
ju_ConcurrentModificationException = $rt_classWithoutFields(jl_RuntimeException),
jlr_Array = $rt_classWithoutFields(),
jl_NullPointerException = $rt_classWithoutFields(jl_RuntimeException),
jl_NegativeArraySizeException = $rt_classWithoutFields(jl_RuntimeException),
jl_StringIndexOutOfBoundsException = $rt_classWithoutFields(jl_IndexOutOfBoundsException),
jl_StringIndexOutOfBoundsException__init_0 = $this => {
    jl_Exception__init_($this);
},
jl_StringIndexOutOfBoundsException__init_ = () => {
    let var_0 = new jl_StringIndexOutOfBoundsException();
    jl_StringIndexOutOfBoundsException__init_0(var_0);
    return var_0;
};
$rt_packages([-1, "java", 0, "lang"
]);
$rt_metadata([jl_Object, "Object", 1, 0, [], 1, 0, 0, 0,
ji_Serializable, 0, jl_Object, [], 1537, 0, 0, 0,
jl_Comparable, 0, jl_Object, [], 1537, 0, 0, 0,
jl_CharSequence, 0, jl_Object, [], 1537, 0, 0, 0,
jl_String, 0, jl_Object, [ji_Serializable, jl_Comparable, jl_CharSequence], 17, 0, () => jl_String_$callClinit(), 0,
jlr_AnnotatedElement, 0, jl_Object, [], 1537, 0, 0, 0,
jlr_GenericDeclaration, 0, jl_Object, [jlr_AnnotatedElement], 1537, 0, 0, 0,
jlr_Type, 0, jl_Object, [], 1537, 0, 0, 0,
jl_Class, 0, jl_Object, [jlr_GenericDeclaration, jlr_Type], 17, 0, 0, 0,
jl_Number, 0, jl_Object, [ji_Serializable], 1025, 0, 0, 0,
jl_Integer, 0, jl_Number, [jl_Comparable], 1, 0, () => jl_Integer_$callClinit(), 0,
jl_AbstractStringBuilder, 0, jl_Object, [ji_Serializable, jl_CharSequence], 0, 0, 0, 0,
jl_Appendable, 0, jl_Object, [], 1537, 0, 0, 0,
jl_StringBuilder, 0, jl_AbstractStringBuilder, [jl_Appendable], 1, 0, 0, 0,
jl_Throwable, 0, jl_Object, [], 1, 0, 0, 0,
jl_Exception, 0, jl_Throwable, [], 1, 0, 0, 0,
jl_RuntimeException, 0, jl_Exception, [], 1, 0, 0, 0,
otrr_ReflectionInfo, 0, jl_Object, [], 1025, 0, 0, 0,
otrr_ClassInfo, 0, otrr_ReflectionInfo, [], 17, 0, 0, 0,
otr_StringInfo, 0, otrr_ReflectionInfo, [], 17, 0, 0, 0,
w_FroggerBrowser, 0, jl_Object, [], 17, 0, () => w_FroggerBrowser_$callClinit(), 0,
jl_ClassCastException, 0, jl_RuntimeException, [], 1, 0, 0, 0,
otp_Platform, 0, jl_Object, [], 17, 0, 0, 0,
otji_JS, 0, jl_Object, [], 17, 0, 0, 0,
otci_IntegerUtil, 0, jl_Object, [], 17, 0, 0, 0,
ju_Comparator, 0, jl_Object, [], 1537, 0, 0, 0,
jl_String$_clinit_$lambda$_118_0, 0, jl_Object, [ju_Comparator], 1, 0, 0, 0,
jl_Character, 0, jl_Object, [jl_Comparable], 1, 0, () => jl_Character_$callClinit(), 0,
fd_PlayerListener, 0, jl_Object, [], 17, 0, 0, 0,
ju_Objects, 0, jl_Object, [], 17, 0, 0, 0,
otji_JSWrapper, 0, jl_Object, [], 17, 0, 0, 0,
w_BrowserClock, 0, jl_Object, [], 17, 0, 0, 0,
fm_FroggerGame, 0, jl_Object, [], 1, 0, 0, 0,
fd_GameScreen, 0, jl_Object, [], 1, 0, 0, 0,
jl_IndexOutOfBoundsException, 0, jl_RuntimeException, [], 1, 0, 0, 0,
wp_Canvas, 0, jl_Object, [], 17, 0, 0, 0,
fm_Movable, 0, jl_Object, [], 1537, 0, 0, 0,
fm_Frog, 0, jl_Object, [fm_Movable], 1, 0, 0, 0,
wp_GraphicsContext, 0, jl_Object, [], 17, 0, 0, 0,
jl_Iterable, 0, jl_Object, [], 1537, 0, 0, 0,
ju_Collection, 0, jl_Object, [jl_Iterable], 1537, 0, 0, 0,
ju_AbstractCollection, 0, jl_Object, [ju_Collection], 1025, 0, 0, 0,
ju_SequencedCollection, 0, jl_Object, [ju_Collection], 1537, 0, 0, 0,
ju_List, 0, jl_Object, [ju_SequencedCollection], 1537, 0, 0, 0,
ju_AbstractList, 0, ju_AbstractCollection, [ju_List], 1025, 0, 0, 0,
jl_Cloneable, 0, jl_Object, [], 1537, 0, 0, 0,
ju_RandomAccess, 0, jl_Object, [], 1537, 0, 0, 0,
ju_ArrayList, 0, ju_AbstractList, [jl_Cloneable, ji_Serializable, ju_RandomAccess], 1, 0, 0, 0,
jl_Record, 0, jl_Object, [], 1025, 0, 0, 0,
wp_Font, 0, jl_Record, [], 17, 0, 0, 0]);
$rt_metadata([fm_Wood, 0, jl_Object, [fm_Movable], 1, 0, 0, ["$move", $rt_wrapFunction0(fm_Wood_move)],
fm_Turtle, 0, jl_Object, [fm_Movable], 1, 0, 0, ["$move", $rt_wrapFunction0(fm_Turtle_move)],
fm_Vehicle, 0, jl_Object, [fm_Movable], 1, 0, 0, ["$move", $rt_wrapFunction0(fm_Vehicle_move)],
jl_Enum, 0, jl_Object, [jl_Comparable, ji_Serializable], 1025, 0, 0, 0,
fm_VehicleType, 0, jl_Enum, [], 65553, 0, () => fm_VehicleType_$callClinit(), 0,
fm_WoodType, 0, jl_Enum, [], 65553, 0, () => fm_WoodType_$callClinit(), 0,
jl_IllegalArgumentException, 0, jl_RuntimeException, [], 1, 0, 0, 0,
fd_GameScreen$1, 0, jl_Object, [], 32768, 0, () => fd_GameScreen$1_$callClinit(), 0,
jl_CloneNotSupportedException, 0, jl_Exception, [], 1, 0, 0, 0,
ju_Iterator, 0, jl_Object, [], 1537, 0, 0, 0,
ju_AbstractList$1, 0, jl_Object, [ju_Iterator], 0, 0, 0, 0,
wp_Rectangle2D, 0, jl_Record, [], 17, 0, 0, 0,
ju_Arrays, 0, jl_Object, [], 1, 0, 0, 0,
jl_Math, 0, jl_Object, [], 17, 0, 0, 0,
ju_ConcurrentModificationException, 0, jl_RuntimeException, [], 1, 0, 0, 0,
jlr_Array, 0, jl_Object, [], 17, 0, 0, 0,
jl_NullPointerException, 0, jl_RuntimeException, [], 1, 0, 0, 0,
jl_NegativeArraySizeException, 0, jl_RuntimeException, [], 1, 0, 0, 0,
jl_StringIndexOutOfBoundsException, 0, jl_IndexOutOfBoundsException, [], 1, 0, 0, 0]);
let $rt_booleanArrayCls = $rt_arraycls($rt_booleancls),
$rt_charArrayCls = $rt_arraycls($rt_charcls),
$rt_intArrayCls = $rt_arraycls($rt_intcls);
$rt_stringPool(["0", "[L", "null", "purple", "yellowgreen", "darkblue", "black", "lightgreen", "darkorange", "yellow", "white", "red", "lightpink", "blue", "brown", "Arial", "Score: ", "Lives: ", "Level: ", "Time: ", "Seconds", "Pause, press P to continue", "green", "VICTORY!", "Congratulations! You beat all levels!", "Final Score: ", "Game Over!!!", "px ", "CAR1", "WHITE", "CAR2", "YELLOW", "CAR3", "LIGHTPINK", "SHORT", "LONG"]);
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
export { w_FroggerBrowser_reset$exported$0 as reset, w_FroggerBrowser_step$exported$1 as step, w_FroggerBrowser_setPaused$exported$2 as setPaused, w_FroggerBrowser_paint$exported$3 as paint, w_FroggerBrowser_score$exported$4 as score, w_FroggerBrowser_lives$exported$5 as lives, w_FroggerBrowser_level$exported$6 as level, w_FroggerBrowser_timer$exported$7 as timer, w_FroggerBrowser_frogX$exported$8 as frogX, w_FroggerBrowser_frogY$exported$9 as frogY, w_FroggerBrowser_won$exported$10 as won, w_FroggerBrowser_homes$exported$11 as homes
};

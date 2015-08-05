(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
require('./src');
if (!FIRE_TEST) {
    require('../builtin/canvas-assets/asset');
}

},{"../builtin/canvas-assets/asset":5,"./src":54}],2:[function(require,module,exports){

var AudioClip = Fire.Class({

    name: 'Fire.AudioClip',

    extends: Fire.Asset,

    constructor: function () {
    },

    properties: {

    },
});

Fire.AudioClip = AudioClip;

return AudioClip;

},{}],3:[function(require,module,exports){
module.exports = (function () {

    /**
     * Class for BitmapFont handling.
     *
     * @class BitmapFont
     * @extends Asset
     * @constructor
     */
    var BitmapFont = Fire.Class({

        name: 'Fire.BitmapFont',

        extends: Fire.Asset,

        constructor: function () {
        },

        properties: {
            texture: {
                default: null,
                type: Fire.Texture,
                visible: false,
            }
        },
    });

    Fire.BitmapFont = BitmapFont;

    return BitmapFont;
})();

},{}],4:[function(require,module,exports){
var CoffeeScript = Fire.Class({
    name: 'Fire.CoffeeScript',
    extends: Fire.Asset,

    properties: {
    },
});

Fire.CoffeeScript = CoffeeScript;
module.exports = CoffeeScript;

},{}],5:[function(require,module,exports){
// Use this file to browserify

require('./texture');
require('./sprite');
require('./bitmap-font');
require('./ttf-font');
require('./javascript');
require('./coffeescript');
require('./scene');
require('./audio-clip');

module.exports = [
    'texture',
    'sprite',
    'bitmap-font',
    'ttf-font',
    'javascript',
    'coffeescript',
    'scene',
    'audio-clip'
];

},{"./audio-clip":2,"./bitmap-font":3,"./coffeescript":4,"./javascript":6,"./scene":7,"./sprite":8,"./texture":9,"./ttf-font":10}],6:[function(require,module,exports){
var JavaScript = Fire.Class({
    name: 'Fire.JavaScript',
    extends: Fire.Asset,

    properties: {
    },
});

Fire.JavaScript = JavaScript;
module.exports = JavaScript;

},{}],7:[function(require,module,exports){
var Scene = Fire.Class({
    name: 'Fire.Scene',
    extends: Fire.Asset,

    properties: {
        scene: null
    },
});

Fire.Scene = Scene;
module.exports = Scene;

},{}],8:[function(require,module,exports){
module.exports = (function () {

    /**
     * Represents a Sprite object which obtained from Texture.
     * @class Sprite
     * @extends Asset
     * @constructor
     * @param {Image} [img] - Specify the html image element to render so you can create Sprite dynamically.
     */
    var Sprite = Fire.Class({

        name: 'Fire.Sprite',

        extends: Fire.Asset,

        constructor: function () {
            var img = arguments[0];
            if (img) {
                this.texture = new Fire.Texture(img);
                this.width = img.width;
                this.height = img.height;
            }
        },
        properties: {
            /**
             * @property pivot
             * @type Vec2
             * @default new Fire.Vec2(0.5, 0.5)
             */
            pivot: {
                default: new Fire.Vec2(0.5, 0.5),
                tooltip: 'The pivot is normalized, like a percentage.\n' +
                         '(0,0) means the bottom-left corner and (1,1) means the top-right corner.\n' +
                         'But you can use values higher than (1,1) and lower than (0,0) too.'
            },
            // trim info
            /**
             * @property trimX
             * @type number
             */
            trimX: {
                default: 0,
                type: Fire.Integer
            },
            /**
             * @property trimY
             * @type number
             */
            trimY: {
                default: 0,
                type: Fire.Integer
            },
            /**
             * @property width
             * @type number
             */
            width: {
                default: 0,
                type: Fire.Integer
            },
            /**
             * @property height
             * @type number
             */
            height: {
                default: 0,
                type: Fire.Integer
            },
            /**
             * @property texture
             * @type Texture
             */
            texture: {
                default: null,
                type: Fire.Texture,
                visible: false
            },
            /**
             * @property rotated
             * @type boolean
             * @default false
             */
            rotated: {
                default: false,
                visible: false
            },
            // raw texture info (used for texture-offset calculation)

            /**
             * uv of the sprite in atlas-texture
             * @property x
             * @type number
             */
            x: {
                default: 0,
                type: Fire.Integer,
                visible: false
            },
            /**
             * uv of the sprite in atlas-texture
             * @property y
             * @type number
             */
            y: {
                default: 0,
                type: Fire.Integer,
                visible: false
            },

            /**
             * @property rawWidth
             * @type number
             */
            rawWidth: {
                default: 0,
                type: Fire.Integer,
                visible: false
            },
            /**
             * @property rawHeight
             * @type number
             */
            rawHeight: {
                default: 0,
                type: Fire.Integer,
                visible: false
            },
            /**
             * Use pixel-level hit testing.
             * @property pixelLevelHitTest
             * @type boolean
             * @default false
             */
            pixelLevelHitTest: {
                default: false,
                tooltip: 'Use pixel-level hit testing.'
            },
            /**
             * The highest alpha channel value that is considered opaque for hit test. [0, 1]
             * @property alphaThreshold
             * @type number
             * @default 0.1
             */
            alphaThreshold: {
                default: 0.1,
                tooltip: 'The highest alpha channel value that is considered opaque for hit test.',
                watch: {
                    'pixelLevelHitTest': function (obj, propEL) {
                        propEL.disabled = !obj.pixelLevelHitTest;
                    }
                }
            },
            /**
             * Top border of the sprite
             * @property borderTop
             * @type number
             * @default 0
             */
            borderTop: {
                default: 0,
                type: Fire.Integer
            },
            /**
             * Bottom border of the sprite
             * @property borderTop
             * @type number
             * @default 0
             */
            borderBottom: {
                default: 0,
                type: Fire.Integer
            },
            /**
             * Left border of the sprite
             * @property borderTop
             * @type number
             * @default 0
             */
            borderLeft: {
                default: 0,
                type: Fire.Integer
            },
            /**
             * Right border of the sprite
             * @property borderTop
             * @type number
             * @default 0
             */
            borderRight: {
                default: 0,
                type: Fire.Integer
            },

            /**
             * @property rotatedWidth
             * @type number
             * @readOnly
             */
            rotatedWidth: {
                get: function () {
                    return this.rotated ? this.height : this.width;
                }
            },

            /**
             * @property rotatedHeight
             * @type number
             * @readOnly
             */
            rotatedHeight: {
                get: function () {
                    return this.rotated ? this.width : this.height;
                }
            }
        }
    });

    Fire.Sprite = Sprite;

    return Sprite;
})();

},{}],9:[function(require,module,exports){
module.exports = (function () {

    var canvasCtxToGetPixel = null;

    /**
     * @class WrapMode
     * @static
     * @namespace Texture
     */
    var WrapMode = Fire.defineEnum({
        /**
         * @property Repeat
         * @type number
         */
        Repeat: -1,
        /**
         * @property Clamp
         * @type number
         */
        Clamp: -1
    });

    /**
     * @class FilterMode
     * @static
     * @namespace Texture
     */
    var FilterMode = Fire.defineEnum({
        /**
         * @property Point
         * @type number
         */
        Point: -1,
        /**
         * @property Bilinear
         * @type number
         */
        Bilinear: -1,
        /**
         * @property Trilinear
         * @type number
         */
        Trilinear: -1
    });

    /**
     * Class for texture handling.
     * Use this to create textures on the fly or to modify existing texture assets.
     *
     * @class Texture
     * @extends Asset
     * @constructor
     * @param {Image} [img] - the html image element to render
     */
    var Texture = Fire.Class({

        name: 'Fire.Texture',

        extends: Fire.Asset,

        constructor: function () {
            var img = arguments[0];
            if (img) {
                this.width = img.width;
                this.height = img.height;
            }
        },

        properties: {
            /**
             * @property width
             * @type number
             */
            width: {
                default: 0,
                type: Fire.Integer,
                readonly: true
            },

            /**
             * @property height
             * @type number
             */
            height: {
                default: 0,
                type: Fire.Integer,
                readonly: true
            },

            /**
             * @property wrapMode
             * @type Texture.WrapMode
             * @default Texture.WrapMode.Clamp
             */
            wrapMode: {
                default: WrapMode.Clamp,
                type: WrapMode,
                readonly: true
            },

            /**
             * @property filterMode
             * @type Texture.FilterMode
             * @default Texture.FilterMode.Bilinear
             */
            filterMode: {
                default: FilterMode.Bilinear,
                type: FilterMode,
                readonly: true
            }
        },
    });

    Texture.WrapMode = WrapMode;
    Texture.FilterMode = FilterMode;

    Fire.Texture = Texture;

    return Texture;
})();

},{}],10:[function(require,module,exports){
module.exports = (function () {

    var TTFFont = Fire.Class({

        name: 'Fire.TTFFont',

        extends: Fire.Asset,

        constructor: function () {
        },

        properties: {
            fontFamily: {
                default: ''
            }
        },
    });

    Fire.TTFFont = TTFFont;

    return TTFFont;
})();

},{}],11:[function(require,module,exports){
module.exports={
  "name": "engine-framework",
  "version": "0.1.0",
  "description": "A simple framework for connecting Fireball Editor and other game engines",
  "homepage": "http://fireball-x.com",
  "repository": {
    "type": "git",
    "url": "https://github.com/fireball-x/engine-framework.git"
  },
  "author": "Firebox Technology",
  "license": "MIT",
  "bugs": "https://github.com/fireball-x/editor-framework/issues",
  "scripts": {
    "test": "gulp test"
  },
  "dependencies": {
    "node-uuid": "1.4.2"
  },
  "devDependencies": {
    "browserify": "10.2.3",
    "del": "1.2.0",
    "gulp": "3.8.11",
    "gulp-cached": "1.0.1",
    "gulp-fb": "0.0.9",
    "gulp-header": "1.2.2",
    "gulp-jshint": "1.11.0",
    "gulp-mirror": "0.4.0",
    "gulp-plumber": "0.6.6",
    "gulp-rename": "1.2.2",
    "gulp-sourcemaps": "1.5.2",
    "gulp-uglify": "1.2.0",
    "gulp-util": "3.0.5",
    "jshint-stylish": "2.0.0",
    "require-dir": "0.1.0",
    "vinyl-buffer": "1.0.0",
    "vinyl-source-stream": "1.0.0"
  }
}

},{}],12:[function(require,module,exports){
var JS = require('./js');
var Asset = Fire.Asset;
var callInNextTick = require('./utils').callInNextTick;
var LoadManager = require('./load-manager');
var JsonLoader = require('./loaders').JsonLoader;


/**
 * The asset library which managing loading/unloading assets in project.
 *
 * @class AssetLibrary
 * @static
 */
var AssetLibrary = (function () {

    // configs

    var _libraryBase = '';

    // variables

    // the loading uuid's callbacks
    var _uuidToCallbacks = new Fire.CallbacksInvoker();

    // temp deserialize info
    var _tdInfo = new Fire._DeserializeInfo();

    // create a loading context which reserves all relevant parameters
    function LoadingHandle (readMainCache, writeMainCache, recordAssets) {
        //this.readMainCache = readMainCache;
        //this.writeMainCache = writeMainCache;

        // FORCE ignore global cache in fireball lite
        this.readMainCache = false;
        this.writeMainCache = false;

        var needIndieCache = !(this.readMainCache && this.writeMainCache);
        this.taskIndieCache = needIndieCache ? {} : null;

        // 需要让场景 preload 的 asset（所有包含 raw file 后缀名的 asset 并且不含 rawType 属性的 asset）
        this.assetsNeedPostLoad = recordAssets ? [] : null;
    }
    LoadingHandle.prototype.readCache = function (uuid) {
        if (this.readMainCache && this.writeMainCache) {
            return AssetLibrary._uuidToAsset[uuid];
        }
        else {
            if (this.readMainCache) {
                // writeMainCache == false
                return AssetLibrary._uuidToAsset[uuid] || this.taskIndieCache[uuid];
            }
            else {
                return this.taskIndieCache[uuid];
            }
        }
    };
    LoadingHandle.prototype.writeCache = function (uuid, asset, hasRawType) {
        if (this.writeMainCache) {
            AssetLibrary._uuidToAsset[uuid] = asset;
        }
        if (this.taskIndieCache) {
            this.taskIndieCache[uuid] = asset;
        }
        if (this.assetsNeedPostLoad && asset._rawFiles && !hasRawType) {
            this.assetsNeedPostLoad.push(asset);
        }
    };

    // publics

    var AssetLibrary = {
        /**
         * @callback loadCallback
         * @param {string} error - null or the error info
         * @param {Asset} data - the loaded asset or null
         */

        /**
         * @method loadAsset
         * @param {string} uuid
         * @param {loadCallback} callback - the callback function once load finished
         * @param {Boolean} [readMainCache=true] - If false, the asset and all its depends assets will reload and create new instances from library.
         * @param {Boolean} [writeMainCache=true] - If true, the result will cache to AssetLibrary, and MUST be unload by user manually.
         * @param {Asset} [existingAsset] - load to existing asset, this argument is only available in editor
         * @private
         */
        loadAsset: function (uuid, callback, readMainCache, writeMainCache, existingAsset) {
            readMainCache = typeof readMainCache !== 'undefined' ? readMainCache : true;
            writeMainCache = typeof writeMainCache !== 'undefined' ? writeMainCache : true;

            var handle = new LoadingHandle(readMainCache, writeMainCache);
            this._loadAssetByUuid(uuid, callback, handle, existingAsset);
        },

        _LoadingHandle: LoadingHandle,

        getRawBase: function (uuid) {
            return _libraryBase + uuid.slice(0, 2) + Fire.Path.sep + uuid;
        },

        getUrl: function (uuid) {
            var url = this.getRawBase(uuid);
            return url + '.json';
        },

        getUuid: function (url) {
            var hasUuid = url.indexOf(_libraryBase) === 0;
            if ( hasUuid ) {
                var dir = Fire.Path.dirname(url);
                var dirBasename = Fire.Path.basename(dir);

                var isAssetUrl = dirBasename.length === 2;

                var uuid;

                if (isAssetUrl) {
                    uuid = Fire.Path.basename(url);

                    var index = uuid.indexOf('.');

                    if ( index !== -1) {
                        uuid = uuid.slice(0, index);
                    }
                }
                else {
                    uuid = dirBasename;
                }

                return uuid;
            }

            // If url is not in the library, just return 0
            return "";
        },

        /**
         * !#zh uuid加载流程：
         * 1. 查找_uuidToAsset，如果已经加载过，直接返回
         * 2. 查找_uuidToCallbacks，如果已经在加载，则注册回调，直接返回
         * 3. 如果没有url，则将uuid直接作为路径
         * 4. 递归加载Asset及其引用到的其它Asset
         *
         * @method _loadAssetByUuid
         * @param {string} uuid
         * @param {loadCallback} callback - the callback to receive the asset, can be null
         * @param {LoadingHandle} handle - the loading context which reserves all relevant parameters
         * @param {Asset} [existingAsset] - load to existing asset, this argument is only available in editor
         * @private
         */
        _loadAssetByUuid: function (uuid, callback, handle, existingAsset) {
            if (typeof uuid !== 'string') {
                callInNextTick(callback, new Error('[AssetLibrary] uuid must be string'), null);
                return;
            }
            // step 1
            if ( !existingAsset ) {
                var asset = handle.readCache(uuid);
                if (asset) {
                    callInNextTick(callback, null, asset);
                    return;
                }
            }

            // step 2
            // 如果必须重新加载，则不能合并到到 _uuidToCallbacks，否则现有的加载成功后会同时触发回调，
            // 导致提前返回的之前的资源。
            var canShareLoadingTask = handle.readMainCache && !existingAsset;
            if ( canShareLoadingTask && !_uuidToCallbacks.add(uuid, callback) ) {
                // already loading
                return;
            }

            // step 3

            if (FIRE_EDITOR && !_libraryBase) {
                callInNextTick(callback, new Error('Cannot load ' + uuid + ' in editor because AssetLibrary not yet initialized!'), null);
                return;
            }
            var url = this.getUrl(uuid);

            // step 4
            LoadManager.loadByLoader(JsonLoader, url,
                function (error, json) {
                    function onDeserializedWithDepends (err, asset, hasRawType) {
                        if (asset) {
                            asset._uuid = uuid;
                            handle.writeCache(uuid, asset, hasRawType);
                        }
                        if ( canShareLoadingTask ) {
                            _uuidToCallbacks.invokeAndRemove(uuid, err, asset);
                        }
                        else if (callback) {
                            callback(err, asset);
                        }
                    }
                    if (json) {
                        AssetLibrary._deserializeWithDepends(json, url, onDeserializedWithDepends, handle, existingAsset);
                    }
                    else {
                        onDeserializedWithDepends(error, null);
                    }
                }
            );
        },

        /**
         * @method loadJson
         * @param {string|object} json
         * @param {loadCallback} callback
         * @param {Boolean} [dontCache=false] - If false, the result will cache to AssetLibrary, and MUST be unload by user manually.
         * @param {Boolean} [recordAssets=false] - 是否统计新加载的需要让场景 preload 的 asset（所有包含 raw file 后缀名的 asset 并且不含 rawType 属性的 asset）
         * @return {LoadingHandle}
         * @private
         */
        loadJson: function (json, callback, dontCache, recordAssets) {
            var handle = new LoadingHandle(!dontCache, !dontCache, recordAssets);
            var thisTick = true;
            this._deserializeWithDepends(json, '', function (p1, p2) {
                if (thisTick) {
                    callInNextTick(callback, p1, p2);
                }
                else {
                    callback(p1, p2);
                }
            }, handle);
            thisTick = false;
            return handle;
        },

        /**
         * @method _deserializeWithDepends
         * @param {string|object} json
         * @param {string} url
         * @param {loadCallback} callback
         * @param {object} handle - the loading context which reserves all relevant parameters
         * @param {Asset} [existingAsset] - existing asset to reload
         * @private
         */
        _deserializeWithDepends: function (json, url, callback, handle, existingAsset) {
            // deserialize asset
            //var isScene = typeof Scene !== 'undefined' && json && json[0] && json[0].__type__ === JS._getClassId(Scene);
            //var classFinder = isScene ? Fire._MissingScript.safeFindClass : function (id) {
            var classFinder = function (id) {
                var cls = JS._getClassById(id);
                if (cls) {
                    return cls;
                }
                Fire.warn('Can not get class "%s"', id);
                return Object;
            };
            //Fire.engine._canModifyCurrentScene = false;
            var asset = Fire.deserialize(json, _tdInfo, {
                classFinder: classFinder,
                target: existingAsset
            });
            //Fire.engine._canModifyCurrentScene = true;

            // load depends
            var pendingCount = _tdInfo.uuidList.length;

            // load raw
            var rawProp = _tdInfo.rawProp;     // _tdInfo不能用在回调里！
            if (rawProp) {
                // load depends raw objects
                var attrs = Fire.attr(asset.constructor, _tdInfo.rawProp);
                var rawType = attrs.rawType;
                ++pendingCount;
                LoadManager.load(url, rawType, asset._rawext, function onRawObjLoaded (error, raw) {
                    if (error) {
                        Fire.error('[AssetLibrary] Failed to load %s of %s. %s', rawType, url, error);
                    }
                    asset[rawProp] = raw;
                    --pendingCount;
                    if (pendingCount === 0) {
                        callback(null, asset, true);
                    }
                });
            }

            if (pendingCount === 0) {
                callback(null, asset, !!rawProp);
                // _tdInfo 是用来重用的临时对象，每次使用后都要重设，这样才对 GC 友好。
                _tdInfo.reset();
                return;
            }

            /*
             如果依赖的所有资源都要重新下载，批量操作时将会导致同时执行多次重复下载。优化方法是增加一全局事件队列，
             队列保存每个任务的注册，启动，结束事件，任务从注册到启动要延迟几帧，每个任务都存有父任务。
             这样通过队列的事件序列就能做到合并批量任务。
             如果依赖的资源不重新下载也行，但要判断是否刚好在下载过程中，如果是的话必须等待下载完成才能结束本资源的加载，
             否则外部获取到的依赖资源就会是旧的。
             */

            // AssetLibrary._loadAssetByUuid 的回调有可能在当帧也可能延后执行，这里要判断是否由它调用 callback，
            // 否则 callback 可能会重复调用
            var invokeCbByDepends = false;

            // load depends assets
            for (var i = 0, len = _tdInfo.uuidList.length; i < len; i++) {
                var dependsUuid = _tdInfo.uuidList[i];
                if (FIRE_EDITOR && existingAsset) {
                    var existingDepends = _tdInfo.uuidObjList[i][_tdInfo.uuidPropList[i]];
                    if (existingDepends && existingDepends._uuid === dependsUuid) {
                        var dependsUrl = _libraryBase + dependsUuid.substring(0, 2) + Fire.Path.sep + dependsUuid;
                        if ( !LoadManager.isLoading(dependsUrl, true) ) {
                            // 如果有依赖但依赖不在加载过程中就直接略过
                            --pendingCount;
                        }
                        else {
                            // 等待依赖加载完成
                            (function (dependsUrl) {
                                var idToClear = setInterval(function () {
                                    if ( !LoadManager.isLoading(dependsUrl, true) ) {
                                        clearInterval(idToClear);
                                        --pendingCount;
                                        if (pendingCount === 0) {
                                            callback(null, asset, !!rawProp);
                                        }
                                    }
                                }, 10);
                            })(dependsUrl);
                        }
                        continue;
                    }
                }
                var onDependsAssetLoaded = (function (dependsUuid, obj, prop) {
                    // create closure manually because its extremely faster than bind
                    return function (error, dependsAsset, hasRawType) {
                        if (FIRE_EDITOR && error) {
                            if (Editor.AssetDB && Editor.AssetDB.isValidUuid(dependsUuid)) {
                                Fire.error('[AssetLibrary] Failed to load "%s", %s', dependsUuid, error);
                            }
                        }
                        //else {
                        //    dependsAsset._uuid = dependsUuid;
                        //}
                        // update reference
                        obj[prop] = dependsAsset;

                        // check all finished
                        --pendingCount;
                        if (pendingCount === 0) {
                            callback(null, asset, !!rawProp);
                        }
                    };
                })( dependsUuid, _tdInfo.uuidObjList[i], _tdInfo.uuidPropList[i] );
                AssetLibrary._loadAssetByUuid(dependsUuid, onDependsAssetLoaded, handle);
                invokeCbByDepends = true;
            }

            if (FIRE_EDITOR && !invokeCbByDepends && pendingCount === 0) {
                callback(null, asset, !!rawProp);
            }

            // _tdInfo 是用来重用的临时对象，每次使用后都要重设，这样才对 GC 友好。
            _tdInfo.reset();
        },

        /**
         * Get the exists asset by uuid.
         *
         * @method getAssetByUuid
         * @param {string} uuid
         * @return {Asset} - the existing asset, if not loaded, just returns null.
         * @private
         */
        getAssetByUuid: function (uuid) {
            return AssetLibrary._uuidToAsset[uuid] || null;
        },

        /**
         * !#en Kill references to the asset so it can be garbage collected.
         * Fireball will reload the asset from disk or remote if loadAssetByUuid being called again.
         * You rarely use this function in scripts, since it will be called automatically when the Asset is destroyed.
         * !#zh 手动卸载指定的资源，这个方法会在 Asset 被 destroy 时自动调用，一般不需要用到这个方法。卸载以后，Fireball 可以重新从硬盘或网络加载这个资源。
         *
         * 如果还有地方引用到asset，除非 destroyImmediated 为true，否则不应该执行这个方法，因为那样可能会导致 asset 被多次创建。
         *
         * @method unloadAsset
         * @param {Asset|string} assetOrUuid
         * @param {Boolean} [destroy=false] - When destroyImmediate is true, if there are objects referencing the asset, the references will become invalid.
         */
        unloadAsset: function (assetOrUuid, destroy) {
            var asset;
            if (typeof assetOrUuid === 'string') {
                asset = AssetLibrary._uuidToAsset[assetOrUuid];
            }
            else {
                asset = assetOrUuid;
            }
            if (asset) {
                if (destroy && asset.isValid) {
                    asset.destroy();
                }
                delete AssetLibrary._uuidToAsset[asset._uuid];
            }
        },

        /**
         * init the asset library
         * @method init
         * @param {string} libraryPath
         */
        init: function (libraryPath) {
            if (FIRE_EDITOR && _libraryBase && !FIRE_TEST) {
                Fire.error('AssetLibrary has already been initialized!');
                return;
            }
            _libraryBase = Fire.Path.setEndWithSep(libraryPath);
            //Fire.log('[AssetLibrary] library: ' + _libraryBase);
        }

        ///**
        // * temporary flag for deserializing assets
        // * @property {Boolean} Fire.AssetLibrary.isLoadingAsset
        // */
        //isLoadingAsset: false,
    };

    // unload asset if it is destoryed

    /**
     * !#en Caches uuid to all loaded assets in scenes.
     *
     * !#zh 这里保存所有已经加载的场景资源，防止同一个资源在内存中加载出多份拷贝。
     *
     * 这里用不了WeakMap，在浏览器中所有加载过的资源都只能手工调用 unloadAsset 释放。
     *
     * 参考：
     * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap
     * https://github.com/TooTallNate/node-weak
     *
     * @property _uuidToAsset
     * @type {object}
     * @private
     */
    AssetLibrary._uuidToAsset = {};

    //暂时屏蔽，因为目前没有缓存任何asset
    //if (FIRE_DEV && Asset.prototype._onPreDestroy) {
    //    Fire.error('_onPreDestroy of Asset has already defined');
    //}
    //Asset.prototype._onPreDestroy = function () {
    //    if (AssetLibrary._uuidToAsset[this._uuid] === this) {
    //        AssetLibrary.unloadAsset(this);
    //    }
    //};

    return AssetLibrary;
})();

Fire.AssetLibrary = AssetLibrary;

},{"./js":27,"./load-manager":28,"./loaders":29,"./utils":40}],13:[function(require,module,exports){
var FObject = require('./fobject');

/**
 * Base class for asset handling.
 *
 * You should override:
 * - validateAsset (static)
 *
 * You may want to override:
 * - createNode
 * - Fire.FObject._serialize
 * - Fire.FObject._deserialize
 *
 * @class Asset
 * @extends Object
 * @constructor
 */
Fire.Asset = Fire.Class({
    name: 'Fire.Asset', extends: FObject,

    constructor: function () {
        /**
         * @property _uuid
         * @type {string}
         * @private
         */
        Object.defineProperty(this, '_uuid', {
            value: '',
            writable: true,
            enumerable: false   // avoid uuid being assigned to empty string during destroy,
        });

        ///**
        // * @property dirty
        // * @type boolean
        // * @private
        // */
        //this.dirty = false;
    },

    properties: {
        /**
         * Returns the url of this asset's first raw file, if none of rawFile exists,
         * it will returns the url of this serialized asset.
         * @property url
         * @type {string}
         * @readOnly
         */
        url: {
            get: function () {
                if (this._rawFiles) {
                    if (Fire.AssetLibrary) {
                        var url = Fire.AssetLibrary.getRawBase(this._uuid);
                        var filename = this._rawFiles[0];
                        return url + Fire.Path.sep + filename;
                    }
                    else {
                        Fire.error('asset.url is not usable in core process');
                    }
                }
                return '';
            },
            visible: false
        },

        /**
         * Returns the url of this asset's raw files, if none of rawFile exists,
         * it will returns an empty array.
         * @property urls
         * @type {string[]}
         * @readOnly
         */
        urls: {
            get: function () {
                if (this._rawFiles) {
                    if (Fire.AssetLibrary) {
                        var url = Fire.AssetLibrary.getRawBase(this._uuid);
                        return this._rawFiles.map(function (filename) {
                            return url + Fire.Path.sep + filename;
                        });
                    }
                    else {
                        Fire.error('asset.urls is not usable in core process');
                    }
                }
                return [];
            },
            visible: false
        },

        /**
         * 在 lite 版的 Fireball 里，raw asset 并不仅仅是在 properties 里声明了 rawType 才有，
         * 而是每个 asset 都能指定自己的 raw file url。但 AssetLibrary 并不会帮你加载这个 url，除非你声明了 rawType。
         * @property _rawFiles
         * @type {string[]}
         * @default null
         * @private
         */
        _rawFiles: null
    },

    statics: {
        /**
         * 这个方法给 AssetDB 专用，或许能让 AssetDB 不耦合 Fire.deserialize()。
         * @method deserialize
         * @param {string} data
         * @return {Asset}
         * @static
         * @private
         */
        deserialize: function (data) {
            return Fire.deserialize(data);
        },

        urlToUuid: function (url) {
            if (Fire.AssetLibrary) {
                if (url) {
                    var uuid = Fire.AssetLibrary.getUuid(url);
                    return uuid;
                }
            }
            else {
                Fire.error('Asset.urlToUuid is not usable in core process');
            }
            return '';
        }
    },

    /**
     * 这个方法为了让 AssetDB 不耦合 Editor.serialize()。
     * @method serialize
     * @return {string}
     * @private
     */
    serialize: function () {
        return Editor.serialize(this);
    },

    /**
     * Create a new node using this asset in the scene.
     * If this type of asset dont have corresponding type of node, this method should be null.
     * @method createNode
     * @param {function} callback
     * @param {string} callback.error - null or the error info
     * @param {object} callback.node - the created node or null
     */
    createNode: null,

    /**
     * Set raw extname for this asset.
     * @method _setRawFiles
     * @param {string[]} rawFiles
     * @private
     */
    _setRawFiles: function (rawFiles) {
        rawFiles = rawFiles.map(function (item) {
            if (item.charAt(0) === '.') {
                item = item.slice(1);
            }
            var nextChar = item.charAt(0);
            if (nextChar === '/' || nextChar === '\\') {
                item = item.slice(1);
            }
            return item;
        });
        this._rawFiles = rawFiles.length > 0 ? rawFiles : null;
    }
});

module.exports = Fire.Asset;

},{"./fobject":24}],14:[function(require,module,exports){
var JS = require('./js');
var isPlainEmptyObj = require('./utils').isPlainEmptyObj_DEV;

/**
 * Tag the class with any meta attributes, then return all current attributes assigned to it.
 * This function holds only the attributes, not their implementations.
 *
 * @method attr
 * @param {function|object} constructor - the class or instance. If instance, the attribute will be dynamic and only available for the specified instance.
 * @param {string} propertyName - the name of property or function, used to retrieve the attributes
 * @param {object} [attributes] - the attribute table to mark, new attributes will merged with existed attributes. Attribute whose key starts with '_' will be ignored.
 * @return {object|undefined} return all attributes associated with the property. if none undefined will be returned
 *
 * @example
 * ```js
 *  var myClass = function () { this.value = 0.5 };
 *  Fire.attr(myClass, 'value');         // return undefined
 *  Fire.attr(myClass, 'value', {}).min = 0;  // assign new attribute table
 *              //associated with 'value', and set its min = 0
 *  Fire.attr(myClass, 'value', {       // set values max and default
 *     max: 1,
 *     default: 0.5,
 *  });
 *  Fire.attr(myClass, 'value');  // return { default: 0.5, min: 0, max: 1 }
 * ```
 */
Fire.attr = function (constructor, propertyName, attributes) {
    var key = '_attr$' + propertyName;
    var instance, attrs, name;
    if (typeof constructor === 'function') {
        // attributes in class
        instance = constructor.prototype;
        attrs = instance[key];
        if (typeof attributes !== 'undefined') {
            // set
            if (typeof attributes === 'object') {
                if (!attrs) {
                    instance[key] = attrs = {};
                }
                for (name in attributes) {
                    if (name[0] !== '_') {
                        attrs[name] = attributes[name];
                    }
                }
            }
            else {
                instance[key] = attributes;
                return attributes;
            }
        }
        return attrs;
    }
    else {
        // attributes in instance
        instance = constructor;
        if (typeof attributes !== 'undefined') {
            // set
            if (typeof attributes === 'object') {
                if (instance.hasOwnProperty(key)) {
                    attrs = instance[key];
                }
                if (!attrs) {
                    instance[key] = attrs = {};
                }
                for (name in attributes) {
                    if (name[0] !== '_') {
                        attrs[name] = attributes[name];
                    }
                }
                return JS.addon({}, attrs, instance.constructor.prototype[key]);
            }
            else {
                instance[key] = attributes;
                return attributes;
            }
        }
        else {
            // get
            attrs = instance[key];
            if (typeof attrs === 'object') {
                return JS.addon({}, attrs, instance.constructor.prototype[key]);
            }
            else {
                return attrs;
            }
        }
    }
};

/*

BuiltinAttributes: {
    default: defaultValue,
    _canUsedInGetter: true, (default true)
    _canUsedInSetter: false, (default false) (NYI)
}
Getter or Setter: {
    hasGetter: true,
    hasSetter: true,
}
Callbacks: {
    _onAfterProp: function (constructor, propName) {},
    _onAfterGetter: function (constructor, propName) {}, (NYI)
    _onAfterSetter: function (constructor, propName) {}, (NYI)
}
 */

/**
 * By default, all properties declared by "Class.prop" is serializable.
 * The NonSerialized attribute marks a variable to not be serialized,
 * so you can keep a property show in the Editor and Fireball will not attempt to serialize it.
 * See {% crosslink EditorOnly Fire.EditorOnly %} for more details.
 *
 * @property NonSerialized
 * @type object
 * @private
 */
Fire.NonSerialized = {
    serializable: false,
    _canUsedInGetter: false
};

/**
 * The EditorOnly attribute marks a variable to be serialized in editor project, but non-serialized
 * in exported products.
 *
 * @property EditorOnly
 * @type object
 * @private
 */
Fire.EditorOnly = {
    editorOnly: true,
    _canUsedInGetter: false
};

/**
 * Specify that the input value must be integer in Inspector.
 * Also used to indicates that the type of elements in array or the type of value in dictionary is integer.
 * @property Integer
 * @type object
 */
Fire.Integer = 'Integer';

/**
 * Indicates that the type of elements in array or the type of value in dictionary is double.
 * @property Float
 * @type object
 */
Fire.Float = 'Float';

function getTypeChecker (type, attrName, objectTypeCtor) {
    if (FIRE_DEV) {
        return function (constructor, mainPropName) {
            var mainPropAttrs = Fire.attr(constructor, mainPropName) || {};
            if (mainPropAttrs.type !== type) {
                Fire.warn('Can only indicate one type attribute for %s.%s.', JS.getClassName(constructor),
                    mainPropName);
                return;
            }
            if (!mainPropAttrs.hasOwnProperty('default')) {
                return;
            }
            var defaultVal = mainPropAttrs.default;
            if (typeof defaultVal === 'undefined') {
                return;
            }
            var isContainer = Array.isArray(defaultVal) || isPlainEmptyObj(defaultVal);
            if (isContainer) {
                return;
            }
            var defaultType = typeof defaultVal;
            var type_lowerCase = type.toLowerCase();
            if (defaultType === type_lowerCase) {
                if (type_lowerCase === 'object') {
                    if (defaultVal && !(defaultVal instanceof objectTypeCtor)) {
                        Fire.warn('The default value of %s.%s is not instance of %s.',
                            JS.getClassName(constructor), mainPropName, JS.getClassName(objectTypeCtor));
                    }
                    else {
                        return;
                    }
                }
                else {
                    Fire.warn('No needs to indicate the "%s" attribute for %s.%s, which its default value is type of %s.',
                        attrName, JS.getClassName(constructor), mainPropName, type);
                }
            }
            else {
                Fire.warn('Can not indicate the "%s" attribute for %s.%s, which its default value is type of %s.',
                    attrName, JS.getClassName(constructor), mainPropName, defaultType);
            }
            delete mainPropAttrs.type;
        };
    }
}

/**
 * Indicates that the type of elements in array or the type of value in dictionary is boolean.
 * @property Boolean
 * @type
 */
Fire.Boolean = 'Boolean';

/**
 * Indicates that the type of elements in array or the type of value in dictionary is string.
 * @property String
 * @type object
 */
Fire.String = 'String';

// the value will be represented as a uuid string
Fire._ScriptUuid = {};

/**
 * Makes a property only accept the supplied object type in Inspector.
 * If the type is derived from Fire.Asset, it will be serialized as uuid.
 *
 * @method ObjectType
 * @param {function} typeCtor - the special type you want
 * @return {object} the attribute
 * @private
 */
Fire.ObjectType = function (typeCtor) {
    if (FIRE_EDITOR) {
        if (!typeCtor) {
            Fire.warn('Argument for Fire.ObjectType must be non-nil');
            return;
        }
        if (typeof typeCtor !== 'function') {
            Fire.warn('Argument for Fire.ObjectType must be function type');
            return;
        }
    }
    return {
        type: 'Object',
        ctor: typeCtor,
        // _onAfterProp: (function () {
        //     if (FIRE_DEV) {
        //         return function (classCtor, mainPropName) {
        //             var check = getTypeChecker('Object', 'Fire.ObjectType', typeCtor);
        //             check(classCtor, mainPropName);
        //             // check ValueType
        //             var mainPropAttrs = Fire.attr(classCtor, mainPropName) || {};
        //             if (!Array.isArray(mainPropAttrs.default) && typeof typeCtor.prototype.clone === 'function') {
        //                 var typename = JS.getClassName(typeCtor);
        //                 var hasDefault = mainPropAttrs.default === null || mainPropAttrs.default === undefined;
        //                 if (hasDefault) {
        //                     Fire.warn('%s is a ValueType, no need to specify the "type" of "%s.%s", ' +
        //                               'because the type information can obtain from its default value directly.',
        //                         typename, JS.getClassName(classCtor), mainPropName, typename);
        //                 }
        //                 else {
        //                     Fire.warn('%s is a ValueType, no need to specify the "type" of "%s.%s", ' +
        //                               'just set the default value to "new %s()" and it will be handled properly.',
        //                         typename, JS.getClassName(classCtor), mainPropName, typename);
        //                 }
        //             }
        //         };
        //     }
        //     else {
        //         return undefined;
        //     }
        // })()
    };
};

/**
 * Makes a property referenced to a javascript host object which needs to load before deserialzation.
 * The property will not be serialized but will be referenced to the loaded host object while deserialzation.
 *
 * @method RawType
 * @param {string} [typename]
 * @return {object} the attribute
 * @private
 */
Fire.RawType = function (typename) {
    var NEED_EXT_TYPES = ['image', 'json', 'text', 'audio'];  // the types need to specify exact extname
    return {
        // type: 'raw',
        rawType: typename,
        serializable: false,
        // hideInInspector: true,
        _canUsedInGetter: false,

        _onAfterProp: function (constructor, mainPropName) {
            // check raw object
            var checked = !FIRE_DEV || (function checkRawType(constructor) {
                if (! Fire.isChildClassOf(constructor, Fire.Asset)) {
                    Fire.error('RawType is only available for Assets');
                    return false;
                }
                var found = false;
                for (var p = 0; p < constructor.__props__.length; p++) {
                    var propName = constructor.__props__[p];
                    var attrs = Fire.attr(constructor, propName);
                    var rawType = attrs.rawType;
                    if (rawType) {
                        var containsUppercase = (rawType.toLowerCase() !== rawType);
                        if (containsUppercase) {
                            Fire.error('RawType name cannot contain uppercase');
                            return false;
                        }
                        if (found) {
                            Fire.error('Each asset cannot have more than one RawType');
                            return false;
                        }
                        found = true;
                    }
                }
                return true;
            })(constructor);
        }
    };
};

/**
 * @method Nullable
 * @param {string} boolPropName
 * @param {Boolean} hasValueByDefault
 * @return {object} the attribute
 * @private
 */
Fire.Nullable = function (boolPropName, hasValueByDefault) {
    return {
        nullable: boolPropName,

        _onAfterProp: function (constructor, mainPropName) {
            // declare boolean
            constructor.prop(boolPropName, hasValueByDefault, { visible: false });
            // copy attributes from main property
            var mainPropAttr = Fire.attr(constructor, mainPropName) || {};
            if (mainPropAttr.serializable === false) {
                Fire.attr(constructor, boolPropName, Fire.NonSerialized);
            }
            else if (mainPropAttr.editorOnly) {
                Fire.attr(constructor, boolPropName, Fire.EditorOnly);
            }
        }
    };
};

/**
 * @method Watch
 * @param {string} names - the name of target property to watch, array is also acceptable.
 * @param {function} callback - the callback function to invoke when target property(s) is changed.
 * @param {object} callback.param object - the instance object which contains watching property(s).
 * @param {object} callback.param element - the property element which displays watching property(s).
 * @return {object} the attribute
 * @private
 */
Fire.Watch = function (names, callback) {
    return {
        watch: [].concat(names),  // array of property name to watch
        watchCallback: callback
    };
};

/**
 * @method Range
 * @param {number} min: null mins infinite
 * @param {number} max: null mins infinite
 * @return {object} the attribute
 * @private
 */
Fire.Range = function (min, max) {
   return { min: min, max: max };
};

module.exports = {
    getTypeChecker: getTypeChecker
};

},{"./js":27,"./utils":40}],15:[function(require,module,exports){
var JS = require('./js');

/**
 * The CallbacksHandler is an abstract class that can register and unregister callbacks by key.
 * Subclasses should implement their own methods about how to invoke the callbacks.
 * @class _CallbacksHandler
 * @constructor
 * @private
 */
var CallbacksHandler = (function () {
    this._callbackTable = {};
});

/**
 * @method add
 * @param {string} key
 * @param {function} callback - can be null
 * @return {Boolean} whether the key is new
 */
CallbacksHandler.prototype.add = function (key, callback) {
    var list = this._callbackTable[key];
    if (typeof list !== 'undefined') {
        if (callback) {
            if (list !== null) {
                list.push(callback);
            }
            else {
                list = [callback];
                this._callbackTable[key] = list;
            }
        }
        return false;
    }
    else {
        // new key
        list = callback ? [callback] : null;
        this._callbackTable[key] = list;
        return true;
    }
};

/**
 * Check if the specified key has any registered callback. If a callback is also specified,
 * it will only return true if the callback is registered.
 * @method has
 * @param {string} key
 * @param {function} [callback]
 * @return {Boolean}
 */
CallbacksHandler.prototype.has = function (key, callback) {
    var list = this._callbackTable[key];
    if (list && list.length > 0) {
        if (callback) {
            return list.indexOf(callback) !== -1;
        }
        return true;
    }
    return false;
};

/**
 * @method removeAll
 * @param {string} key
 */
CallbacksHandler.prototype.removeAll = function (key) {
    delete this._callbackTable[key];
};

/**
 * @method remove
 * @param {string} key
 * @param {function} callback
 * @return {Boolean} removed
 */
CallbacksHandler.prototype.remove = function (key, callback) {
    var list = this._callbackTable[key];
    if (list) {
        var index = list.indexOf(callback);
        if (index !== -1) {
            list.splice(index, 1);
            return true;
        }
    }
    return false;
};

Fire._CallbacksHandler = CallbacksHandler;


/**
 * The callbacks invoker to handle and invoke callbacks by key
 *
 * @class CallbacksInvoker
 * @constructor
 * @extends _CallbacksHandler
 */
var CallbacksInvoker = function () {
    CallbacksHandler.call(this);
};
JS.extend(CallbacksInvoker, CallbacksHandler);

Fire.CallbacksInvoker = CallbacksInvoker;

/**
 * @method invoke
 * @param {string} key
 * @param {any} [p1]
 * @param {any} [p2]
 * @param {any} [p3]
 * @param {any} [p4]
 * @param {any} [p5]
 */
CallbacksInvoker.prototype.invoke = function (key, p1, p2, p3, p4, p5) {
    var list = this._callbackTable[key];
    if (list) {
        for (var i = 0; i < list.length; i++) {
            list[i](p1, p2, p3, p4, p5);
        }
    }
};

/**
 * @method invokeAndRemove
 * @param {string} key
 * @param {any} [p1]
 * @param {any} [p2]
 * @param {any} [p3]
 * @param {any} [p4]
 * @param {any} [p5]
 */
CallbacksInvoker.prototype.invokeAndRemove = function (key, p1, p2, p3, p4, p5) {
    // this.invoke(key, p1, p2, p3, p4, p5);
    // 这里不直接调用invoke仅仅是为了减少调用堆栈的深度，方便调试
    var list = this._callbackTable[key];
    if (list) {
        for (var i = 0; i < list.length; i++) {
            list[i](p1, p2, p3, p4, p5);
        }
    }
    this.removeAll(key);
};

/**
 * @method bindKey
 * @param {string} key
 * @param {Boolean} [remove=false] - remove callbacks after invoked
 * @return {function} the new callback which will invoke all the callbacks binded with the same supplied key
 */
CallbacksInvoker.prototype.bindKey = function (key, remove) {
    var self = this;
    return function bindedInvocation (p1, p2, p3, p4, p5) {
        // this.invoke(key, p1, p2, p3, p4, p5);
        // 这里不直接调用invoke仅仅是为了减少调用堆栈的深度，方便调试
        var list = self._callbackTable[key];
        if (list) {
            for (var i = 0; i < list.length; i++) {
                list[i](p1, p2, p3, p4, p5);
            }
        }
        if (remove) {
            self.removeAll(key);
        }
    };
};

CallbacksInvoker.CallbacksHandler = CallbacksHandler;
module.exports = CallbacksInvoker;

},{"./js":27}],16:[function(require,module,exports){
require('./attribute');
require('./class');
//var FObject = require('./fobject');
var getTypeChecker = require('./attribute').getTypeChecker;
var preprocessAttrs = require('./preprocess-attrs');


/**
 * !#en Defines a FireClass using the given specification, please see [Class](/en/scripting/class/) for details.
 * !#zh 定义一个 FireClass，传入参数必须是一个包含类型参数的字面量对象，具体用法请查阅[类型定义](/zh/scripting/class/)。
 *
 * @method Class
 * @param {object} options
 * @return {function} - the created class
 *
 * @example
    // define base class
    var Node = Fire.Class();

    // define sub class
    var Sprite = Fire.Class({
        name: 'Sprite',
        extends: Node,
        constructor: function () {
            this.url = "";
            this.id = 0;
        },

        properties {
            width: {
                default: 128,
                type: 'Integer',
                tooltip: 'The width of sprite'
            },
            height: 128,
            size: {
                get: function () {
                    return Fire.v2(this.width, this.height);
                }
            }
        },

        load: function () {
            // load this.url
        };
    });

    // instantiate

    var obj = new Sprite();
    obj.url = 'sprite.png';
    obj.load();

    // define static member

    Sprite.count = 0;
    Sprite.getBounds = function (spriteList) {
        // ...
    };
 */
Fire.Class = function (options) {
    if (arguments.length === 0) {
        return Fire.extend();
    }
    if ( !options ) {
        Fire.error('[Fire.Class] Option must be non-nil');
        return Fire.extend();
    }

    var name = options.name;
    var base = options.extends/* || FObject*/;
    var ctor = (options.hasOwnProperty('constructor') && options.constructor) || undefined;

    // create constructor
    var cls;
    //if (base) {
        if (name) {
            cls = Fire.extend(name, base, ctor);
        }
        else {
            cls = Fire.extend(base, ctor);
            name = Fire.JS.getClassName(cls);
        }
    //}
    //else {
    //    if (name) {
    //        cls = Fire.define(name, ctor);
    //    }
    //    else {
    //        cls = Fire.define(ctor);
    //        name = Fire.JS.getClassName(cls);
    //    }
    //}

    // define properties
    var properties = options.properties;
    if (properties) {

        // 预处理属性
        preprocessAttrs(properties, name);

        for (var propName in properties) {
            var val = properties[propName];
            var isObj = val && typeof val === 'object' && !Array.isArray(val);
            var isLiteral = isObj && val.constructor === ({}).constructor;
            if ( !isLiteral ) {
                val = {
                    default: val
                };
            }
            //var isValueType = typeof val.prototype.clone === 'function';
            //if (isValueType) {
            //    cls.prop(propName, val);
            //    continue;
            //}
            var attrs = parseAttributes(val, name, propName);
            if (val.hasOwnProperty('default')) {
                cls.prop.apply(cls, [propName, val.default].concat(attrs));
            }
            else {
                var getter = val.get;
                var setter = val.set;
                if (FIRE_EDITOR) {
                    if (!getter && !setter) {
                        Fire.error('Property %s.%s must define at least one of "default", "get" or "set".', name,
                            propName);
                    }
                }
                if (getter) {
                    cls.get.apply(cls, [propName, getter].concat(attrs));
                }
                if (setter) {
                    cls.set(propName, setter);
                }
            }
        }
    }

    // define statics
    var statics = options.statics;
    if (statics) {
        var staticPropName;
        if (FIRE_EDITOR) {
            var INVALID_STATICS = ['name', '__ctors__', '__props__', 'arguments', 'call', 'apply', 'caller', 'get',
                                   'getset', 'length', 'prop', 'prototype', 'set'];
            for (staticPropName in statics) {
                if (INVALID_STATICS.indexOf(staticPropName) !== -1) {
                    Fire.error('Cannot define %s.%s because static member name can not be "%s".', name, staticPropName,
                        staticPropName);
                    continue;
                }
            }
        }
        for (staticPropName in statics) {
            cls[staticPropName] = statics[staticPropName];
        }
    }

    // define functions
    var BUILTIN_ENTRIES = ['name', 'extends', 'constructor', 'properties', 'statics'];
    for (var funcName in options) {
        if (BUILTIN_ENTRIES.indexOf(funcName) !== -1) {
            continue;
        }
        var func = options[funcName];
        var type = typeof func;
        if (type === 'function' || func === null) {
            cls.prototype[funcName] = func;
        }
        else if (FIRE_EDITOR) {
            var TypoCheckList = {
                extend: 'extends',
                property: 'properties',
                static: 'statics'
            };
            var correct = TypoCheckList[funcName];
            if (correct) {
                Fire.warn('Unknown parameter of %s.%s, maybe you want is "%s".', name, funcName, correct);
            }
            else {
                Fire.error('Unknown parameter of %s.%s', name, funcName);
            }
        }
    }

    return cls;
};

var tmpAttrs = [];
function parseAttributes (attrs, className, propName) {
    var ERR_Type = FIRE_EDITOR ? 'The %s of %s must be type %s' : '';

    tmpAttrs.length = 0;
    var result = tmpAttrs;

    var type = attrs.type;
    if (type && FIRE_EDITOR) {
        if (Array.isArray(type)) {
            if (type.length > 0) {
                type = type[0];
            }
            else {
                Fire.error('Invalid type of %s.%s', className, propName);
                return;
            }
        }
        if (type === Fire.Integer) {
            result.push( { type: Fire.Integer } );
        }
        else if (type === Fire.Float || type === Number) {
            result.push( { type: Fire.Float } );
        }
        else if (type === Fire.Boolean || type === Boolean) {
            result.push({
                type: Fire.Boolean,
                _onAfterProp: getTypeChecker(Fire.Boolean, 'Fire.Boolean')
            });
        }
        else if (type === Fire.String || type === String) {
            result.push({
                type: Fire.String,
                _onAfterProp: getTypeChecker(Fire.String, 'Fire.String')
            });
        }
        else if (type === 'Object' || type === Object) {
            if (FIRE_EDITOR) {
                Fire.error('Please define "type" parameter of %s.%s as the actual constructor.', className, propName);
            }
        }
        else if (type === Fire._ScriptUuid) {
            var attr = Fire.ObjectType(Fire.ScriptAsset);
            attr.type = 'Script';
            result.push(attr);
        }
        else {
            if (typeof type === 'object') {
                if (Fire.isEnumType(type)) {
                    result.push({
                        type: 'Enum',
                        enumList: Fire.getEnumList(type)
                    });
                }
                else if (FIRE_EDITOR) {
                    Fire.error('Please define "type" parameter of %s.%s as the constructor of %s.', className, propName, type);
                }
            }
            else if (typeof type === 'function') {
                result.push(Fire.ObjectType(type));
            }
            else if (FIRE_EDITOR) {
                Fire.error('Unknown "type" parameter of %s.%s：%s', className, propName, type);
            }
        }
    }

    function parseSimpleAttr (attrName, expectType, attrCreater) {
        var val = attrs[attrName];
        if (val) {
            if (typeof val === expectType) {
                if (typeof attrCreater === 'undefined') {
                    var attr = {};
                    attr[attrName] = val;
                    result.push(attr);
                }
                else {
                    result.push(typeof attrCreater === 'function' ? attrCreater(val) : attrCreater);
                }
            }
            else if (FIRE_EDITOR) {
                Fire.error('The %s of %s.%s must be type %s', attrName, className, propName, expectType);
            }
        }
    }

    parseSimpleAttr('rawType', 'string', Fire.RawType);
    parseSimpleAttr('editorOnly', 'boolean', Fire.EditorOnly);
    if (FIRE_EDITOR) {
        parseSimpleAttr('displayName', 'string');
        parseSimpleAttr('multiline', 'boolean', {multiline: true});
        parseSimpleAttr('readonly', 'boolean', {readOnly: true});
        parseSimpleAttr('tooltip', 'string');
    }

    if (attrs.url) {
        result.push({ saveUrlAsAsset: true });
    }
    else if (attrs.serializable === false) {
        result.push(Fire.NonSerialized);
    }

    if (FIRE_EDITOR) {
        var visible = attrs.visible;
        if (typeof visible !== 'undefined') {
            if (!attrs.visible) {
                result.push({visible: false});
            }
        }
        else {
            var startsWithUS = (propName.charCodeAt(0) === 95);
            if (startsWithUS) {
                result.push({visible: false});
            }
        }
    }

    //if (attrs.custom) {
    //    result.push( { custom: attrs.custom });
    //}

    var range = attrs.range;
    if (range) {
        if (Array.isArray(range)) {
            if (range.length >= 2) {
                result.push(Fire.Range(range[0], range[1]));
            }
            else if (FIRE_EDITOR) {
                Fire.error('The length of range array must be 2');
            }
        }
        else if (FIRE_EDITOR) {
            Fire.error(ERR_Type, '"range"', className + '.' + propName, 'array');
        }
    }

    var nullable = attrs.nullable;
    if (nullable) {
        if (typeof nullable === 'object') {
            var boolPropName = nullable.propName;
            if (typeof boolPropName === 'string') {
                var def = nullable.default;
                if (typeof def === 'boolean') {
                    result.push(Fire.Nullable(boolPropName, def));
                }
                else if (FIRE_EDITOR) {
                    Fire.error(ERR_Type, '"default"', 'nullable object', 'boolean');
                }
            }
            else if (FIRE_EDITOR) {
                Fire.error(ERR_Type, '"propName"', 'nullable object', 'string');
            }
        }
        else if (FIRE_EDITOR) {
            Fire.error(ERR_Type, '"nullable"', className + '.' + propName, 'object');
        }
    }

    if (FIRE_EDITOR) {
        var watch = attrs.watch;
        if (watch) {
            if (typeof watch === 'object') {
                for (var watchKey in watch) {
                    var watchCallback = watch[watchKey];
                    if (typeof watchCallback === 'function') {
                        result.push(Fire.Watch(watchKey.split(' '), watchCallback));
                    }
                    else if (FIRE_EDITOR) {
                        Fire.error(ERR_Type, 'value', 'watch object', 'function');
                    }
                }
            }
            else {
                Fire.error(ERR_Type, 'watch', className + '.' + propName, 'object');
            }
        }
    }

    return result;
}

},{"./attribute":14,"./class":17,"./preprocess-attrs":35}],17:[function(require,module,exports){
var JS = require('./js');
var Utils = require('./utils');
var _isPlainEmptyObj_DEV = Utils.isPlainEmptyObj_DEV;
var _cloneable_DEV = Utils.cloneable_DEV;

require('./attribute');

///**
// * both getter and prop must register the name into __props__ array
// * @param {string} name - prop name
// */
var _appendProp = function (name/*, isGetter*/) {
    if (FIRE_DEV) {
        //var JsVarReg = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/;
        //if (!JsVarReg.test(name)) {
        //    Fire.error('The property name "' + name + '" is not compliant with JavaScript naming standards');
        //    return;
        //}
        if (name.indexOf('.') !== -1) {
            Fire.error('Disallow to use "." in property name');
            return;
        }
    }

    if (!this.__props__) {
        this.__props__ = [name];
    }
    else {
        var index = this.__props__.indexOf(name);
        if (index < 0) {
            this.__props__.push(name);
        }
        // 这里不进行报错，因为重写 prop 可以是一个合法的行为，可以用于设置新的默认值。
        //else {
        //    Fire.error(Fire.getClassName(this) + '.' + name + ' is already defined!');
        //}
    }
};

///**
// * the metaclass of the "fire class" created by Fire.define, all its static members
// * will inherited by fire class.
// */
var _metaClass = {

    // string[]
    __props__: null,

    /**
     * Add new instance field, propertie, or method made available on the class.
     * 该方法定义的变量默认情况下都会被序列化，也会在inspector中显示。
     * 如果传入属性包含Fire.HideInInspector则仍会序列化但不在inspector中显示。
     * 如果传入属性包含Fire.NonSerialized则不会序列化并且不会在inspector中显示。
     * 如果传入属性包含Fire.EditorOnly则只在编辑器下序列化，打包时不序列化。
     *
     * @method class.prop
     * @param {string} name - the property name
     * @param {*} defaultValue - the default value
     * @param {...object} attribute - additional property attributes, any number of attributes can be added
     * @return {function} the class itself
     * @private
     */
    prop: function (name, defaultValue, attribute) {
        'use strict';
        if (FIRE_DEV) {
            // check default object value
            if (typeof defaultValue === 'object' && defaultValue) {
                if (Array.isArray(defaultValue)) {
                    // check array empty
                    if (defaultValue.length > 0) {
                        Fire.error('Default array must be empty, set default value of %s.prop("%s", ...) to null or [], ' +
                                   'and initialize in constructor please. (just like "this.%s = [...];")',
                                    JS.getClassName(this), name, name);
                        return this;
                    }
                }
                else if (!_isPlainEmptyObj_DEV(defaultValue)) {
                    // check cloneable
                    if (!_cloneable_DEV(defaultValue)) {
                        Fire.error('Do not set default value to non-empty object, ' +
        'unless the object defines its own "clone" function. Set default value of %s.prop("%s", ...) to null or {}, ' +
        'and initialize in constructor please. (just like "this.%s = {foo: bar};")',
                            JS.getClassName(this), name, name);
                        return this;
                    }
                }
            }

            // check base prototype to avoid name collision
            for (var base = this.$super; base; base = base.$super) {
                // 这个循环只能检测到最上面的FireClass的父类，如果再上还有父类，将不做检测。（Fire.extend 将 prototype.constructor 设为子类）
                if (base.prototype.hasOwnProperty(name)) {
                    Fire.error('Can not declare %s.%s, it is already defined in the prototype of %s',
                        JS.getClassName(this), name, JS.getClassName(base));
                    return;
                }
            }
        }

        // set default value
        Fire.attr(this, name, { 'default': defaultValue });

        // register property
        _appendProp.call(this, name);

        // 禁用，因为getter/setter需要动态获得类型，所以类型统一由上层处理
        //// apply default type (NOTE: if user provide type attribute, this one will be overwrote)
        //var mytype = typeof defaultValue;
        //if ( mytype === 'number' ) {
        //    mytype = 'float';
        //}
        //Fire.attr( this, name, { 'type': mytype } );

        // apply attributes
        if (attribute) {
            var onAfterProp = null;
            var AttrArgStart = 2;
            for (var i = AttrArgStart; i < arguments.length; i++) {
                var attr = arguments[i];
                Fire.attr(this, name, attr);
                // register callback
                if (attr._onAfterProp) {
                    onAfterProp = onAfterProp || [];
                    onAfterProp.push(attr._onAfterProp);
                }
            }
            // call callback
            if (onAfterProp) {
                for (var c = 0; c < onAfterProp.length; c++) {
                    onAfterProp[c](this, name);
                }
            }
        }
        return this;
    },

    /**
     * 该方法定义的变量**不会**被序列化，默认会在inspector中显示。
     * 如果传入参数包含Fire.HideInInspector则不在inspector中显示。
     *
     * @method class.get
     * @param {string} name - the getter property
     * @param {function} getter - the getter function which returns the real property
     * @param {...object} attribute - additional property attributes, any number of attributes can be added
     * @return {function} the class itself
     * @private
     */
    get: function (name, getter, attribute) {
        'use strict';

        if (FIRE_DEV) {
            var d = Object.getOwnPropertyDescriptor(this.prototype, name);
            if (d && d.get) {
                Fire.error('%s: the getter of "%s" is already defined!', JS.getClassName(this), name);
                return this;
            }
        }

        if (attribute) {
            var AttrArgStart = 2;
            for (var i = AttrArgStart; i < arguments.length; i++) {
                var attr = arguments[i];
                if (FIRE_DEV) {
                    if (attr._canUsedInGetter === false) {
                        Fire.error('Can not apply the specified attribute to the getter of "%s.%s", attribute index: %s',
                            JS.getClassName(this), name, (i - AttrArgStart));
                        continue;
                    }
                }

                Fire.attr(this, name, attr);

                if (FIRE_DEV) {
                    // check attributes
                    if (attr.serializable === false || attr.editorOnly === true) {
                        Fire.warn('No need to use Fire.NonSerialized or Fire.EditorOnly for the getter of %s.%s, ' +
                                  'every getter is actually non-serialized.',
                            JS.getClassName(this), name);
                    }
                    if (attr.hasOwnProperty('default')) {
                        Fire.error('%s: Can not set default value of a getter!', JS.getClassName(this));
                        return this;
                    }
                }
            }
        }
        Fire.attr(this, name, Fire.NonSerialized);

        var serializingUrlAttr = true;
        if (serializingUrlAttr || FIRE_DEV) {
            // 不论是否 hide in inspector 都要添加到 props，否则 asset watcher 不能正常工作
            _appendProp.call(this, name/*, true*/);
        }

        if (Object.getOwnPropertyDescriptor(this.prototype, name)) {
            Object.defineProperty(this.prototype, name, {
                get: getter
            });
        }
        else {
            Object.defineProperty(this.prototype, name, {
                get: getter,
                configurable: true,
                enumerable: true
            });
        }

        if (FIRE_EDITOR) {
            Fire.attr(this, name, {hasGetter: true}); // 方便 editor 做判断
        }
        return this;
    },

    /**
     * 该方法定义的变量**不会**被序列化，除非有对应的getter否则不在inspector中显示。
     *
     * @method class.set
     * @static
     * @param {string} name - the setter property
     * @param {function} setter - the setter function
     * @return {function} the class itself
     * @private
     */
    set: function (name, setter) {
        if (FIRE_DEV) {
            var d = Object.getOwnPropertyDescriptor(this.prototype, name);
            if (d && d.set) {
                Fire.error('%s: the setter of "%s" is already defined!', JS.getClassName(this), name);
                return this;
            }
        }

        if (FIRE_EDITOR) {
            Object.defineProperty(this.prototype, name, {
                set: function setter_editorWrapper (value) {
                    if (this._observing) {
                        Object.getNotifier(this).notify({
                            type: 'update',
                            name: name,
                            oldValue: this[name]
                        });
                    }
                    setter.call(this, value);
                },
                configurable: true,
                enumerable: true
            });
            Fire.attr(this, name, { hasSetter: true }); // 方便 editor 做判断
        }
        else {
            if (Object.getOwnPropertyDescriptor(this.prototype, name)) {
                Object.defineProperty(this.prototype, name, {
                    set: setter
                });
            }
            else {
                Object.defineProperty(this.prototype, name, {
                    set: setter,
                    configurable: true,
                    enumerable: true
                });
            }
        }

        return this;
    },

    /**
     * 该方法定义的变量**不会**被序列化，默认会在inspector中显示。
     * 如果传入参数包含Fire.HideInInspector则不在inspector中显示。
     *
     * @method class.getset
     * @static
     * @param {string} name - the getter property
     * @param {function} getter - the getter function which returns the real property
     * @param {function} setter - the setter function
     * @param {...object} attribute - additional property attributes, any number of attributes can be added
     * @return {function} the class itself
     * @private
     */
    getset: function (name, getter, setter, attribute) {
        'use strict';
        if (attribute) {
            var getterArgs = [].slice.call(arguments);
            getterArgs.splice(2, 1);    // remove setter
            this.get.apply(this, getterArgs);
        }
        else {
            this.get(name, getter);
        }
        this.set(name, setter);
        return this;
    }
};

function instantiateProps (instance, itsClass) {
    var propList = itsClass.__props__;
    if (propList) {
        for (var i = 0; i < propList.length; i++) {
            var prop = propList[i];
            var attrs = Fire.attr(itsClass, prop);
            if (attrs && attrs.hasOwnProperty('default')) {  // getter does not have default, default maybe 0
                var def = attrs.default;
                if (typeof def === 'object' && def) {
                    // 防止多个实例引用相同对象
                    if (def.clone) {
                        def = def.clone();
                    }
                    else if (Array.isArray(def)) {
                        def = [];
                    }
                    else {
                        def = {};
                    }
                }
                instance[prop] = def;
            }
        }
    }
}

/**
 * Checks whether the constructor is created by Fire.define or Fire.Class
 *
 * @method _isFireClass
 * @param {function} constructor
 * @return {Boolean}
 * @private
 */
Fire._isFireClass = function (constructor) {
    return !!constructor && (constructor.prop === _metaClass.prop);
};

/**
 * @method _convertToFireClass
 * @param {function} constructor
 * @private
 */
Fire._convertToFireClass = function (constructor) {
    constructor.prop = _metaClass.prop;
};

/**
 * Checks whether subclass is child of superclass or equals to superclass
 *
 * @method isChildClassOf
 * @param {function} subclass
 * @param {function} superclass
 * @return {Boolean}
 */
Fire.isChildClassOf = function (subclass, superclass) {
    if (subclass && superclass) {
        if (typeof subclass !== 'function') {
            if (FIRE_DEV) {
                Fire.warn('[isChildClassOf] subclass should be function type, not', subclass);
            }
            return false;
        }
        if (typeof superclass !== 'function') {
            if (FIRE_DEV) {
                Fire.warn('[isChildClassOf] superclass should be function type, not', superclass);
            }
            return false;
        }
        // fireclass
        for (; subclass && subclass.$super; subclass = subclass.$super) {
            if (subclass === superclass) {
                return true;
            }
        }
        if (subclass === superclass) {
            return true;
        }
        // js class
        var dunderProto = Object.getPrototypeOf(subclass.prototype);
        while (dunderProto) {
            subclass = dunderProto.constructor;
            if (subclass === superclass) {
                return true;
            }
            dunderProto = Object.getPrototypeOf(subclass.prototype);
        }
    }
    return false;
};

function _initClass(className, fireClass) {
    // occupy some non-inherited static members
    for (var staticMember in _metaClass) {
        Object.defineProperty(fireClass, staticMember, {
            value: _metaClass[staticMember],
            // __props__ is writable
            writable: staticMember === '__props__',
            // __props__ is enumerable so it can be inherited by Fire.extend
            enumerable: staticMember === '__props__'
        });
    }
}

function _nicifyFireClass (fireClass, className) {
    if (FIRE_EDITOR) {
        if (className) {
            fireClass.toString = function () {
                var plain = Function.toString.call(this);
                return plain.replace('function ', 'function ' + JS.getClassName(this));
            };
        }
    }
}

function doDefine (className, baseClass, constructor) {
    var useTryCatch = ! JS.String.startsWith(className, 'Fire.');
    var fireClass = _createCtor(constructor, baseClass, useTryCatch);
    _initClass(className, fireClass);

    if (baseClass) {
        // inherit
        JS.extend(fireClass, baseClass);
        fireClass.$super = baseClass;
        if (baseClass.__props__) {
            // copy __props__
            fireClass.__props__ = baseClass.__props__.slice();
        }
    }

    JS.setClassName(className, fireClass);

    if (FIRE_EDITOR) {
        _nicifyFireClass(fireClass, className);
    }

    return fireClass;
}

function define (className, baseClass, constructor) {
    if (Fire.isChildClassOf(baseClass, Fire.Behavior)) {
        var frame = Fire._RFpeek();
        if (frame) {
            if (FIRE_DEV && constructor) {
                Fire.warn('Fire.Class: Should not define constructor for Fire.Behavior.');
            }
            if (frame.beh) {
                Fire.error('Each script can have at most one Behavior.');
                return;
            }
            var isInProject = frame.uuid;
            if (isInProject) {
                if (className) {
                    Fire.warn('Should not specify class name for Behavior which defines in project.');
                }
            }
            //else {
            //    builtin plugin behavior
            //}
            className = className || frame.script;
            var cls = doDefine(className, baseClass, constructor);
            if (frame.uuid) {
                JS._setClassId(frame.uuid, cls);
            }
            frame.beh = cls;
            return cls;
        }
    }
    // not project behavior
    return doDefine(className, baseClass, constructor);
}

/**
 * Creates a sub FireClass based on the specified baseClass parameter.
 *
 * @method extend
 * @param {string} [className] - the name of class that is used to deserialize this class
 * @param {function} baseClass - !#en The base class to inherit from
 *                               !#zh 继承的基类
 * @param {function} [constructor] - a constructor function that is used to instantiate this class,
 *                                   if not supplied, the constructor of baseClass will be called automatically.
 * @return {function} the constructor of newly defined class
 * @private
 */
Fire.extend = function (className, baseClass, constructor) {
    if (typeof className === 'function') {
        if (FIRE_DEV) {
            if (constructor) {
                Fire.error('[Fire.extend] invalid type of arguments');
                return null;
            }
        }
        constructor = baseClass;
        baseClass = className;
        className = '';
    }
    if (typeof className === 'string') {
        return define(className, baseClass, constructor);
    }
    else if (typeof className === 'undefined') {
        // 未传入任何参数
        return define('', baseClass, constructor);
    }
    else if (FIRE_DEV && className) {
        Fire.error('[Fire.extend] unknown typeof first argument:' + className);
    }
    return null;
};

function _checkCtor (ctor) {
    if (FIRE_DEV) {
        if (Fire._isFireClass(ctor)) {
            Fire.error("Constructor can not be another FireClass");
            return;
        }
        if (typeof ctor !== 'function') {
            Fire.error("Constructor of FireClass must be function type");
            return;
        }
        if (ctor.length > 0) {
            // fireball-x/dev#138: To make a unified FireClass serialization process,
            // we don't allow parameters for constructor when creating instances of FireClass.
            // For advance user, construct arguments can still get from 'arguments'.
            Fire.warn("Can not instantiate FireClass with arguments.");
            return;
        }
    }
}

function _createCtor (constructor, baseClass, useTryCatch) {
    if (constructor && FIRE_DEV) {
        _checkCtor(constructor);
    }
    // get base user constructors
    var ctors;
    if (Fire._isFireClass(baseClass)) {
        ctors = baseClass.__ctors__;
        if (ctors) {
            ctors = ctors.slice();
        }
    }
    else if (baseClass) {
        ctors = [baseClass];
    }
    // append subclass user constructors
    if (ctors) {
        if (constructor) {
            ctors.push(constructor);
        }
    }
    else if (constructor) {
        ctors = [constructor];
    }
    // create class constructor
    var fireClass;
    var body = '(function(){\n';

    if (FIRE_EDITOR) {
        body += 'this._observing=false;\n';
    }
    body += 'instantiateProps(this,fireClass);\n';

    // call user constructors
    if (ctors) {
        if (FIRE_EDITOR) {
            console.assert(ctors.length > 0);
        }

        body += 'var cs=fireClass.__ctors__;\n';

        if (useTryCatch) {
            body += 'try{\n';
        }

        if (ctors.length <= 5) {
            for (var i = 0; i < ctors.length; i++) {
                body += '(cs[' + i + ']).apply(this,arguments);\n';
            }
        }
        else {
            body += 'for(var i=0,l=cs.length;i<l;++i){\n';
            body += '(cs[i]).apply(this,arguments);\n}\n';
        }

        if (useTryCatch) {
            body += '}catch(e){\nFire._throw(e);\n}\n';
        }
    }
    body += '})';

    // jshint evil: true
    fireClass = eval(body);
    // jshint evil: false

    Object.defineProperty(fireClass, '__ctors__', {
        value: ctors || null,
        writable: false,
        enumerable: false
    });
    return fireClass;
}

/**
 * Specially optimized define function only for internal base classes
 *
 * @method _fastDefine
 * @param {string} className
 * @param {function} constructor
 * @param {string[]} serializableFields
 * @private
 */
Fire._fastDefine = function (className, constructor, serializableFields) {
    JS.setClassName(className, constructor);
    constructor.__props__ = serializableFields;
    for (var i = 0; i < serializableFields.length; i++) {
        Fire.attr(constructor, serializableFields[i], { visible: false });
    }
};

module.exports = {
    instantiateProps: instantiateProps
};

},{"./attribute":14,"./js":27,"./utils":40}],18:[function(require,module,exports){
// global definitions

/**
 * @property {Boolean} isNode - !#en indicates whether executes in node.js application !#zh 是否在 nodejs 运行环境下
 */
Fire.isNode = !!(typeof process !== 'undefined' && process.versions && process.versions.node);
Fire.isNodeWebkit = !!(Fire.isNode && 'node-webkit' in process.versions);   // node-webkit
Fire.isAtomShell = !!(Fire.isNode && 'atom-shell' in process.versions);     // atom-shell
Fire.isApp = Fire.isNodeWebkit || Fire.isAtomShell;

/**
 * indicates whether executes in common web browser
 * @property isPureWeb
 * @type {Boolean}
 */
Fire.isPureWeb = !Fire.isNode && !Fire.isApp;                               // common web browser

/**
 * indicates whether executes in Fireball editor
 * @property isEditor
 * @type {Boolean}
 */
Fire.isEditor = Fire.isApp;     // by far there is no standalone client version, so app == editor
// Always export FIRE_EDITOR globally
if (typeof FIRE_EDITOR === 'undefined') {
    eval('FIRE_EDITOR=Fire.isEditor');  // use eval to ignore uglify
}


/**
 * indicates whether executes in common web browser, or editor's window process(atom-shell's renderer context)
 * @property isWeb
 * @type {Boolean}
 */
if (Fire.isAtomShell) {
    Fire.isWeb = typeof process !== 'undefined' && process.type === 'renderer';
}
else {
    Fire.isWeb = (typeof __dirname === 'undefined' || __dirname === null);
}

/**
 * Indicates whether executes in editor's main process (Electron's browser context)
 * @property isCoreLevel
 * @type {Boolean}
 */
Fire.isCoreLevel = Fire.isApp && !Fire.isWeb;

if (Fire.isNode) {
    /**
     * indicates whether executes in OSX
     * @property isDarwin
     * @type {Boolean}
     */
    Fire.isDarwin = process.platform === 'darwin';

    /**
     * indicates whether executes in Windows
     * @property isWin32
     * @type {Boolean}
     */
    Fire.isWin32 = process.platform === 'win32';
}
else {
    // http://stackoverflow.com/questions/19877924/what-is-the-list-of-possible-values-for-navigator-platform-as-of-today
    var platform = window.navigator.platform;
    Fire.isDarwin = platform.substring(0, 3) === 'Mac';
    Fire.isWin32 = platform.substring(0, 3) === 'Win';
}

if (Fire.isPureWeb) {
    var win = window, nav = win.navigator, doc = document, docEle = doc.documentElement;
    var ua = nav.userAgent.toLowerCase();

    /**
     * indicates whether executes in mobile device
     * @property isMobile
     * @type {Boolean}
     */
    Fire.isMobile = ua.indexOf('mobile') !== -1 || ua.indexOf('android') !== -1;
    /**
     * indicates whether executes in iOS
     * @property isIOS
     * @type {Boolean}
     */
    Fire.isIOS = !!ua.match(/(iPad|iPhone|iPod)/i);
    /**
     * indicates whether executes in Android
     * @property isAndroid
     * @type {Boolean}
     */
    Fire.isAndroid = !!(ua.match(/android/i) || nav.platform.match(/android/i));
}
else {
    Fire.isAndroid = Fire.isIOS = Fire.isMobile = false;
}

/**
 * !#en Check if running in retina display
 * !#zh 判断窗口是否显示在 Retina 显示器下。这个属性会随着窗口所在的显示器变化而变化
 * @property isRetina
 * @type boolean
 */
Object.defineProperty(Fire, 'isRetina', {
    get: function () {
        return Fire.isWeb && window.devicePixelRatio && window.devicePixelRatio > 1;
    }
});

/**
 * !#en Indicates whether retina mode is enabled currently. Retina mode is enabled by default for Apple device but disabled for other devices.
 * !#zh 判断当前是否启用 retina 渲染模式。Fire.isRetina 只是表示系统的支持状态，而最终是否启用 retina 则取决于 Fire.isRetinaEnabled。由于安卓太卡，这里默认禁用 retina。
 * @property isRetinaEnabled
 * @type {Boolean}
 */
Fire.isRetinaEnabled = (Fire.isIOS || Fire.isDarwin) && !FIRE_EDITOR && Fire.isRetina;

// definitions for FObject._objFlags

var Destroyed = 1 << 0;
var ToDestroy = 1 << 1;
var DontSave = 1 << 2;
var EditorOnly  = 1 << 3;
var Dirty = 1 << 4;
var DontDestroy = 1 << 5;

/**
 * Bit mask that controls object states.
 * @class _ObjectFlags
 * @static
 * @private
 */
var ObjectFlags = {

    // public flags

    /**
     * The object will not be saved.
     * @property DontSave
     * @type number
     */
    DontSave: DontSave,

    /**
     * The object will not be saved when building a player.
     * @property EditorOnly
     * @type number
     */
    EditorOnly: EditorOnly,

    Dirty: Dirty,

    /**
     * Dont destroy automatically when loading a new scene.
     * @property DontDestroy
     * @private
     */
    DontDestroy: DontDestroy,

    // public flags for engine

    Destroying: 1 << 9,

    /**
     * Hide in game and hierarchy.
     * This flag is readonly, it can only be used as an argument of scene.addEntity() or Entity.createWithFlags()
     * @property HideInGame
     * @type number
     */
    HideInGame: 1 << 10,

    // public flags for editor

    /**
     * This flag is readonly, it can only be used as an argument of scene.addEntity() or Entity.createWithFlags()
     * @property HideInEditor
     * @type number
     */
    HideInEditor: 1 << 11,

    // flags for Component
    IsOnEnableCalled: 1 << 12,
    IsOnLoadCalled: 1 << 13,
    IsOnStartCalled: 1 << 14,
    IsEditorOnEnabledCalled: 1 << 15

};

/**
 * Hide in game view, hierarchy, and scene view... etc.
 * This flag is readonly, it can only be used as an argument of scene.addEntity() or Entity.createWithFlags()
 * @property Hide
 * @type number
 */
ObjectFlags.Hide = ObjectFlags.HideInGame | ObjectFlags.HideInEditor;

Fire._ObjectFlags = ObjectFlags;

var PersistentMask = ~(ToDestroy | Dirty | ObjectFlags.Destroying | DontDestroy |     // can not clone these flags
                       ObjectFlags.IsOnEnableCalled |
                       ObjectFlags.IsEditorOnEnabledCalled |
                       ObjectFlags.IsOnLoadCalled |
                       ObjectFlags.IsOnStartCalled);

module.exports = {
    Destroyed: Destroyed,
    ToDestroy: ToDestroy,
    DontSave: DontSave,
    EditorOnly: EditorOnly,
    //Dirty: Dirty,
    //DontDestroy: DontDestroy,
    PersistentMask: PersistentMask
};

},{}],19:[function(require,module,exports){
var JS = require('./js');

var ENABLE_TARGET = FIRE_EDITOR;

var _Deserializer = (function () {
    ///**
    // * @param {Boolean} isEditor - if false, property with Fire.EditorOnly will be discarded
    // */
    function _Deserializer(jsonObj, result, target, isEditor, classFinder) {
        this._editor = isEditor;
        this._classFinder = classFinder;
        if (ENABLE_TARGET) {
            this._target = target;
        }
        this._idList = [];
        this._idObjList = [];
        this._idPropList = [];
        this.result = result || new Fire._DeserializeInfo();

        if (Array.isArray(jsonObj)) {
            var jsonArray = jsonObj;
            var refCount = jsonArray.length;
            this.deserializedList = new Array(refCount);
            // deserialize
            for (var i = 0; i < refCount; i++) {
                if (jsonArray[i]) {
                    var mainTarget;
                    if (ENABLE_TARGET) {
                        mainTarget = (i === 0 && target);
                    }
                    this.deserializedList[i] = _deserializeObject(this, jsonArray[i], mainTarget);
                }
            }
            this.deserializedData = refCount > 0 ? this.deserializedList[0] : [];

            //// callback
            //for (var j = 0; j < refCount; j++) {
            //    if (referencedList[j].onAfterDeserialize) {
            //        referencedList[j].onAfterDeserialize();
            //    }
            //}
        }
        else {
            this.deserializedList = [null];
            this.deserializedData = jsonObj ? _deserializeObject(this, jsonObj, target) : null;
            this.deserializedList[0] = this.deserializedData;

            //// callback
            //if (deserializedData.onAfterDeserialize) {
            //    deserializedData.onAfterDeserialize();
            //}
        }

        // dereference
        _dereference(this);
    }

    var _dereference = function (self) {
        // 这里不采用遍历反序列化结果的方式，因为反序列化的结果如果引用到复杂的外部库，很容易堆栈溢出。
        var deserializedList = self.deserializedList;
        for (var i = 0, len = self._idList.length; i < len; i++) {
            var propName = self._idPropList[i];
            var id = self._idList[i];
            self._idObjList[i][propName] = deserializedList[id];
        }
    };

    // 和 _deserializeObject 不同的地方在于会判断 id 和 uuid
    _Deserializer.prototype._deserializeObjField = function (obj, jsonObj, propName, target) {
        var id = jsonObj.__id__;
        if (typeof id === 'undefined') {
            var uuid = jsonObj.__uuid__;
            if (uuid) {
                //if (ENABLE_TARGET) {
                    //这里不做任何操作，因为有可能调用者需要知道依赖哪些 asset。
                    //调用者使用 uuidList 时，可以判断 obj[propName] 是否为空，为空则表示待进一步加载，
                    //不为空则只是表明依赖关系。
                //    if (target && target[propName] && target[propName]._uuid === uuid) {
                //        console.assert(obj[propName] === target[propName]);
                //        return;
                //    }
                // }
                this.result.uuidList.push(uuid);
                this.result.uuidObjList.push(obj);
                this.result.uuidPropList.push(propName);
            }
            else {
                if (ENABLE_TARGET) {
                    obj[propName] = _deserializeObject(this, jsonObj, target && target[propName]);
                }
                else {
                    obj[propName] = _deserializeObject(this, jsonObj);
                }
            }
        }
        else {
            var dObj = this.deserializedList[id];
            if (dObj) {
                obj[propName] = dObj;
            }
            else {
                this._idList.push(id);
                this._idObjList.push(obj);
                this._idPropList.push(propName);
            }
        }
    };

    function _deserializePrimitiveObject (self, instance, serialized) {
        for (var propName in serialized) {
            if (serialized.hasOwnProperty(propName)) {
                var prop = serialized[propName];
                if (typeof prop !== 'object') {
                    if (propName !== '__type__'/* && k != '__id__'*/) {
                        instance[propName] = prop;
                    }
                }
                else {
                    if (prop) {
                        if ( !prop.__uuid__ && typeof prop.__id__ === 'undefined' ) {
                            if (ENABLE_TARGET) {
                                instance[propName] = _deserializeObject(self, prop, self._target && instance[propName]);
                            }
                            else {
                                instance[propName] = _deserializeObject(self, prop);
                            }
                        }
                        else {
                            if (ENABLE_TARGET) {
                                self._deserializeObjField(instance, prop, propName, self._target && instance);
                            }
                            else {
                                self._deserializeObjField(instance, prop, propName);
                            }
                        }
                    }
                    else {
                        instance[propName] = null;
                    }
                }
            }
        }
    }

    function _deserializeTypedObject (self, instance, serialized) {
        //++self.stackCounter;
        //if (self.stackCounter === 100) {
        //    debugger;
        //}
        for (var propName in instance) {    // 遍历 instance，如果具有类型，才不会把 __type__ 也读进来
            var prop = serialized[propName];
            if (typeof prop !== 'undefined' && serialized.hasOwnProperty(propName)) {
                if (typeof prop !== 'object') {
                    instance[propName] = prop;
                }
                else {
                    if (prop) {
                        if ( !prop.__uuid__ && typeof prop.__id__ === 'undefined' ) {
                            if (ENABLE_TARGET) {
                                instance[propName] = _deserializeObject(self, prop, self._target && instance[propName]);
                            }
                            else {
                                instance[propName] = _deserializeObject(self, prop);
                            }
                        }
                        else {
                            if (ENABLE_TARGET) {
                                self._deserializeObjField(instance, prop, propName, self._target && instance);
                            }
                            else {
                                self._deserializeObjField(instance, prop, propName);
                            }
                        }
                    }
                    else {
                        instance[propName] = null;
                    }
                }
            }
        }
        //--self.stackCounter;
    }

    function _deserializeFireClass(self, obj, serialized, klass, target) {
        var props = klass.__props__;
        if (!props) {
            return;
        }
        for (var p = 0; p < props.length; p++) {
            var propName = props[p];
            var attrs = Fire.attr(klass, propName);
            // assume all prop in __props__ must have attr
            var rawType = attrs.rawType;
            if (!rawType) {
                if (!self._editor && attrs.editorOnly) {
                    continue;   // skip editor only if not editor
                }
                var saveUrlAsAsset = attrs.saveUrlAsAsset;
                if (attrs.serializable === false && !saveUrlAsAsset) {
                    continue;   // skip nonSerialized
                }
                var prop = serialized[propName];
                if (typeof prop === 'undefined') {
                    continue;
                }
                if (typeof prop !== 'object') {
                    obj[propName] = prop;
                }
                else {
                    if (prop) {
                        if (!prop.__uuid__ && typeof prop.__id__ === 'undefined') {
                            if (ENABLE_TARGET) {
                                obj[propName] = _deserializeObject(self, prop, target && target[propName]);
                            }
                            else {
                                obj[propName] = _deserializeObject(self, prop);
                            }
                        }
                        else {
                            if (ENABLE_TARGET) {
                                self._deserializeObjField(obj, prop, propName, target && obj);
                            }
                            else {
                                self._deserializeObjField(obj, prop, propName);
                            }
                            if (saveUrlAsAsset) {
                                // redirect to setter
                                var result = self.result;
                                if (result.uuidObjList[result.uuidObjList.length - 1] === obj) {
                                    result.uuidPropList[result.uuidPropList.length - 1] = "_set$" + propName;
                                }
                            }
                        }
                    }
                    else {
                        obj[propName] = null;
                    }
                }
            }
            else {
                // always load raw objects even if property not serialized
                if (self.result.rawProp) {
                    Fire.error('not support multi raw object in a file');
                    // 这里假定每个asset都有uuid，每个json只能包含一个asset，只能包含一个rawProp
                }
                self.result.rawProp = propName;
            }
        }
        if (props[props.length - 1] === '_$erialized') {
            // save original serialized data
            obj._$erialized = serialized;
            // parse the serialized data as primitive javascript object, so its __id__ will be dereferenced
            _deserializePrimitiveObject(self, obj._$erialized, serialized);
        }
    }

    ///**
    // * @param {object} serialized - The obj to deserialize, must be non-nil
    // * @param {object} [target=null]
    // */
    var _deserializeObject = function (self, serialized, target) {
        var propName, prop;
        var obj = null;     // the obj to return
        var klass = null;
        if (serialized.__type__) {

            // Type Object (including FireClass)

            klass = self._classFinder(serialized.__type__);
            if (!klass) {
                Fire.error('[Fire.deserialize] unknown type: ' + serialized.__type__);
                return null;
            }

            if (ENABLE_TARGET && target) {
                // use target
                if ( !(target instanceof klass) ) {
                    Fire.warn('Type of target to deserialize not matched with data: target is %s, data is %s',
                        JS.getClassName(target), klass);
                }
                obj = target;
            }
            else {
                // instantiate a new object
                obj = new klass();
            }

            if (obj instanceof FObject && obj._deserialize) {
                obj._deserialize(serialized.content, self);
                return obj;
            }
            if ( Fire._isFireClass(klass) ) {
                _deserializeFireClass(self, obj, serialized, klass, target);
            }
            else {
                _deserializeTypedObject(self, obj, serialized);
            }
        }
        else if ( !Array.isArray(serialized) ) {

            // embedded primitive javascript object

            obj = (ENABLE_TARGET && target) || {};
            _deserializePrimitiveObject(self, obj, serialized);
        }
        else {

            // Array

            if (ENABLE_TARGET && target) {
                target.length = serialized.length;
                obj = target;
            }
            else {
                obj = new Array(serialized.length);
            }

            for (var i = 0; i < serialized.length; i++) {
                prop = serialized[i];
                if (typeof prop === 'object' && prop) {
                    if (!prop.__uuid__ && typeof prop.__id__ === 'undefined') {
                        if (ENABLE_TARGET) {
                            obj[i] = _deserializeObject(self, prop, target && target[i]);
                        }
                        else {
                            obj[i] = _deserializeObject(self, prop);
                        }
                    }
                    else {
                        if (ENABLE_TARGET) {
                            self._deserializeObjField(obj, prop, '' + i, target && target[i]);
                        }
                        else {
                            self._deserializeObjField(obj, prop, '' + i);
                        }
                    }
                }
                else {
                    obj[i] = prop;
                }
            }
        }
        return obj;
    };

    return _Deserializer;
})();

/**
 * !#en Deserialize json to Fire.Asset
 * !#zh 将 JSON 反序列化为对象实例。
 *
 * 当指定了 target 选项时，如果 target 引用的其它 asset 的 uuid 不变，则不会改变 target 对 asset 的引用，
 * 也不会将 uuid 保存到 result 对象中。
 *
 * @method deserialize
 * @param {(string|object)} data - the serialized Fire.Asset json string or json object.
 * @param {_DeserializeInfo} [result] - additional loading result
 * @param {object} [options]
 * @return {object} the main data(asset)
 */
Fire.deserialize = function (data, result, options) {
    var isEditor = (options && 'isEditor' in options) ? options.isEditor : FIRE_EDITOR;
    var classFinder = (options && options.classFinder) || JS._getClassById;
    var createAssetRefs = (options && options.createAssetRefs) || Fire.isCoreLevel;
    var target = ENABLE_TARGET && (options && options.target);

    if ((FIRE_EDITOR || FIRE_TEST) && Fire.isNode && Buffer.isBuffer(data)) {
        data = data.toString();
    }

    if (typeof data === 'string') {
        data = JSON.parse(data);
    }

    if (createAssetRefs && !result) {
        result = new Fire._DeserializeInfo();
    }

    Fire._isCloning = true;
    var deserializer = new _Deserializer(data, result, target, isEditor, classFinder);
    Fire._isCloning = false;

    if (createAssetRefs) {
        result.assignAssetsBy(Editor.serialize.asAsset);
    }

    return deserializer.deserializedData;
};

/**
 * !#zh 包含反序列化时的一些信息
 * @class _DeserializeInfo
 * @constructor
 */
Fire._DeserializeInfo = function () {

    //this.urlList = [];
    //this.callbackList = [];

    // uuids(assets) need to load

    /**
     * list of the depends assets' uuid
     * @property uuidList
     * @type {string[]}
     */
    this.uuidList = [];
    /**
     * the obj list whose field needs to load asset by uuid
     * @property uuidObjList
     * @type {object[]}
     */
    this.uuidObjList = [];
    /**
     * the corresponding field name which referenced to the asset
     * @property uuidPropList
     * @type {string[]}
     */
    this.uuidPropList = [];

    // raw objects need to load
    // (不用存rawList因为它的uuid可以从asset上获得)

    /**
     * the corresponding field name which referenced to the raw object
     * @property rawProp
     * @type {string}
     */
    this.rawProp = '';
    // @property {Asset[]} rawObjList - the obj list whose corresponding raw object needs to load
    //this.rawObjList = [];
    //@property {string[]} rawPropList - the corresponding field name which referenced to the raw object
    //this.rawPropList = [];
};

/**
 * @method reset
 */
Fire._DeserializeInfo.prototype.reset = function () {
    this.uuidList.length = 0;
    this.uuidObjList.length = 0;
    this.uuidPropList.length = 0;
    this.rawProp = '';
    //this.rawObjList.length = 0;
    //this.rawPropList.length = 0;
};

/**
 * @method getUuidOf
 * @param {object} obj
 * @param {string} propName
 * @return {string}
 */
Fire._DeserializeInfo.prototype.getUuidOf = function (obj, propName) {
    for (var i = 0; i < this.uuidObjList.length; i++) {
        if (this.uuidObjList[i] === obj && this.uuidPropList[i] === propName) {
            return this.uuidList[i];
        }
    }
    return "";
};

/**
 * @method assignAssetsBy
 * @param {function} getter
 * @return {Boolean} success
 */
Fire._DeserializeInfo.prototype.assignAssetsBy = function (getter) {
    var success = true;
    for (var i = 0, len = this.uuidList.length; i < len; i++) {
        var uuid = this.uuidList[i];
        var asset = getter(uuid);
        if (asset) {
            var obj = this.uuidObjList[i];
            var prop = this.uuidPropList[i];
            obj[prop] = asset;
        }
        else {
            Fire.error('Failed to assign asset: ' + uuid);
            success = false;
        }
    }
    return success;
};

Fire.deserialize.applyMixinProps = function (data, classToMix, target) {
    var props = classToMix.__props__;
    if (props) {
        for (var p = 0; p < props.length; p++) {
            var propName = props[p];
            var attrs = Fire.attr(classToMix, propName);
            // assume all prop in __props__ must have attr
            var saveUrlAsAsset = attrs.saveUrlAsAsset;
            if (attrs.serializable === false && !saveUrlAsAsset) {
                continue;   // skip nonSerialized
            }
            if (!FIRE_EDITOR && attrs.editorOnly) {
                continue;   // skip editor only if not editor
            }
            var prop = data[propName];
            if (typeof prop !== 'undefined') {
                if (saveUrlAsAsset) {
                    propName = "_set$" + propName;
                }
                target[propName] = prop;
            }
        }
        //if (props[props.length - 1] === '_$erialized') {
        //    // save original serialized data
        //    target._$erialized = data;
        //}
    }
};

},{"./js":27}],20:[function(require,module,exports){

// enum

/**
 * Define an enum type. If a enum item has a value of -1, it will be given an Integer number according to it's order in the list. Otherwise it will use the value specified by user who writes the enum definition.
 * @method defineEnum
 * @param {object} obj - a JavaScript literal object containing enum names and values
 * @return {object} the defined enum type
 *
 * @example
 Texture.WrapMode = Fire.defineEnum({
    Repeat: -1,
    Clamp: -1
});
 // Texture.WrapMode.Repeat == 0
 // Texture.WrapMode.Clamp == 1
 // Texture.WrapMode[0] == "Repeat"
 // Texture.WrapMode[1] == "Clamp"

 var FlagType = Fire.defineEnum({
    Flag1: 1,
    Flag2: 2,
    Flag3: 4,
    Flag4: 8,
});
 var AtlasSizeList = Fire.defineEnum({
    128: 128,
    256: 256,
    512: 512,
    1024: 1024,
});
 */
Fire.defineEnum = function (obj) {
    var enumType = {};
    Object.defineProperty(enumType, '__enums__', {
        value: undefined,
        writable: true
    });

    var lastIndex = -1;
    for (var key in obj) {
        var val = obj[key];
        if (val === -1) {
            val = ++lastIndex;
        }
        else {
            lastIndex = val;
        }
        enumType[key] = val;

        var reverseKey = '' + val;
        if (key !== reverseKey) {
            Object.defineProperty(enumType, reverseKey, {
                value: key,
                enumerable: false
            });
        }
    }
    return enumType;
};

Fire.isEnumType = function (enumType) {
    return enumType && enumType.hasOwnProperty('__enums__');
};

if (FIRE_DEV) {
    // check key order in object literal
    var _TestEnum = Fire.defineEnum({
        ZERO: -1,
        ONE: -1,
        TWO: -1,
        THREE: -1
    });
    if (_TestEnum.ZERO !== 0 || _TestEnum.ONE !== 1 || _TestEnum.TWO !== 2 || _TestEnum.THREE !== 3) {
        Fire.error('Sorry, "Fire.defineEnum" not available on this platform, ' +
                   'please report this error here: https://github.com/fireball-x/fireball/issues/new !');
    }
}

},{}],21:[function(require,module,exports){
var JS = require('../js');
var CallbacksHandler = require('../callbacks-invoker').CallbacksHandler;

// Extends Fire._CallbacksHandler to handle and invoke event callbacks.
function EventListeners () {
    CallbacksHandler.call(this);
}
JS.extend(EventListeners, CallbacksHandler);

EventListeners.prototype.invoke = function (event) {
    var list = this._callbackTable[event.type];
    if (list && list.length > 0) {
        if (list.length === 1) {
            list[0].call(event.currentTarget, event);
            return;
        }
        var endIndex = list.length - 1;
        var lastFunc = list[endIndex];
        for (var i = 0; i <= endIndex; ++i) {
            var callingFunc = list[i];
            callingFunc.call(event.currentTarget, event);
            if (event._propagationImmediateStopped || i === endIndex) {
                break;
            }
            // 为了不每次触发消息时都创建一份回调数组的拷贝，这里需要对消息的反注册做检查和限制
            // check last one to see if any one removed
            if (list[endIndex] !== lastFunc) {          // 如果变短
                if (list[endIndex - 1] === lastFunc) {  // 只支持删一个
                    if (list[i] !== callingFunc) {      // 如果删了前面的回调，索引不变
                        --i;
                    }
                    --endIndex;
                }
                else {
                    // 只允许在一个回调里面移除一个回调。如果要移除很多，只能用 event.stop(true)
                    Fire.error('Call event.stop(true) when you remove more than one callbacks in a event callback.');
                    return;
                }
            }
        }
    }
};

module.exports = EventListeners;

},{"../callbacks-invoker":15,"../js":27}],22:[function(require,module,exports){
var EventListeners = require('./event-listeners');
var Event = require('./event');
var CustomEvent = Event.CustomEvent;
var FObject = require('../fobject');
var JS = require('../js');

/**
 * EventTarget is an object to which an event is dispatched when something has occurred.
 * Entity are the most common event targets, but other objects can be event targets too.
 *
 * Event targets are an important part of the Fireball event model.
 * The event target serves as the focal point for how events flow through the scene graph.
 * When an event such as a mouse click or a keypress occurs, Fireball dispatches an event object
 * into the event flow from the root of the hierarchy. The event object then makes its way through
 * the scene graph until it reaches the event target, at which point it begins its return trip through
 * the scene graph. This round-trip journey to the event target is conceptually divided into three phases:
 * - The capture phase comprises the journey from the root to the last node before the event target's node
 * - The target phase comprises only the event target node
 * - The bubbling phase comprises any subsequent nodes encountered on the return trip to the root of the tree
 * See also: http://www.w3.org/TR/DOM-Level-3-Events/#event-flow
 *
 * Event targets can implement the following methods:
 *  - _getCapturingTargets
 *  - _getBubblingTargets
 *
 * @class EventTarget
 * @constructor
 */
function EventTarget() {
    //HashObject.call(this);
    FObject.call(this);

    /**
     * @property _capturingListeners
     * @type {EventListeners}
     * @default null
     * @private
     */
    this._capturingListeners = null;

    /**
     * @property _bubblingListeners
     * @type {EventListeners}
     * @default null
     * @private
     */
    this._bubblingListeners = null;
}
JS.extend(EventTarget, FObject/*HashObject*/);

/**
 * Register an callback of a specific event type on the EventTarget.
 * This method is merely an alias to addEventListener.
 *
 * @method on
 * @param {string} type - A string representing the event type to listen for.
 * @param {function} callback - The callback that will be invoked when the event is dispatched.
 *                              The callback is ignored if it is a duplicate (the callbacks are unique).
 * @param {Event} callback.param event
 * @param {Boolean} [useCapture=false] - When set to true, the capture argument prevents callback
 *                              from being invoked when the event's eventPhase attribute value is BUBBLING_PHASE.
 *                              When false, callback will NOT be invoked when event's eventPhase attribute value is CAPTURING_PHASE.
 *                              Either way, callback will be invoked when event's eventPhase attribute value is AT_TARGET.
 */
EventTarget.prototype.on = function (type, callback, useCapture) {
    useCapture = typeof useCapture !== "undefined" ? useCapture : false;
    if (!callback) {
        Fire.error('Callback of event must be non-nil');
        return;
    }
    var listeners = null;
    if (useCapture) {
        listeners = this._capturingListeners = this._capturingListeners || new EventListeners();
    }
    else {
        listeners = this._bubblingListeners = this._bubblingListeners || new EventListeners();
    }
    if ( ! listeners.has(type, callback) ) {
        listeners.add(type, callback);
    }
};

/**
 * Removes the callback previously registered with the same type, callback, and capture.
 * This method is merely an alias to removeEventListener.
 *
 * @method off
 * @param {string} type - A string representing the event type being removed.
 * @param {function} callback - The callback to remove.
 * @param {Boolean} [useCapture=false] - Specifies whether the callback being removed was registered as a capturing callback or not.
 *                              If not specified, useCapture defaults to false. If a callback was registered twice,
 *                              one with capture and one without, each must be removed separately. Removal of a capturing callback
 *                              does not affect a non-capturing version of the same listener, and vice versa.
 */
EventTarget.prototype.off = function (type, callback, useCapture) {
    useCapture = typeof useCapture !== "undefined" ? useCapture : false;
    if (!callback) {
        return;
    }
    var listeners = useCapture ? this._capturingListeners : this._bubblingListeners;
    if (listeners) {
        listeners.remove(type, callback);
    }
};

/**
 * Register an callback of a specific event type on the EventTarget, the callback will remove itself after the first time it is triggered.
 *
 * @method once
 * @param {string} type - A string representing the event type to listen for.
 * @param {function} callback - The callback that will be invoked when the event is dispatched.
 *                              The callback is ignored if it is a duplicate (the callbacks are unique).
 * @param {Event} callback.param event
 * @param {Boolean} [useCapture=false] - When set to true, the capture argument prevents callback
 *                              from being invoked when the event's eventPhase attribute value is BUBBLING_PHASE.
 *                              When false, callback will NOT be invoked when event's eventPhase attribute value is CAPTURING_PHASE.
 *                              Either way, callback will be invoked when event's eventPhase attribute value is AT_TARGET.
 */
EventTarget.prototype.once = function (type, callback, useCapture) {
    var self = this;
    var cb = function (event) {
        self.off(type, cb, useCapture);
        callback(event);
    };
    this.on(type, cb, useCapture);
};

///**
// * Checks whether the EventTarget object has any callback registered for a specific type of event.
// *
// * @param {string} type - The type of event.
// * @param {Boolean} A value of true if a callback of the specified type is registered; false otherwise.
// */
//EventTarget.prototype.hasEventListener = function (type) {};

var cachedArray = new Array(16);
cachedArray.length = 0;

EventTarget.prototype._doDispatchEvent = function (event) {
    event.target = this;

    // Event.CAPTURING_PHASE
    this._getCapturingTargets(event.type, cachedArray);
    // propagate
    event.eventPhase = 1;
    var target, i;
    for (i = cachedArray.length - 1; i >= 0; --i) {
        target = cachedArray[i];
        if (target.isValid && target._capturingListeners) {
            event.currentTarget = target;
            // fire event
            target._capturingListeners.invoke(event);
            // check if propagation stopped
            if (event._propagationStopped) {
                return;
            }
        }
    }
    cachedArray.length = 0;

    // Event.AT_TARGET
    // checks if destroyed in capturing callbacks
    if (this.isValid) {
        this._doSendEvent(event);
        if (event._propagationStopped) {
            return;
        }
    }

    if (event.bubbles) {
        // Event.BUBBLING_PHASE
        this._getBubblingTargets(event.type, cachedArray);
        // propagate
        event.eventPhase = 3;
        for (i = 0; i < cachedArray.length; ++i) {
            target = cachedArray[i];
            if (target.isValid && target._bubblingListeners) {
                event.currentTarget = target;
                // fire event
                target._bubblingListeners.invoke(event);
                // check if propagation stopped
                if (event._propagationStopped) {
                    return;
                }
            }
        }
    }
};

/**
 * Dispatches an event into the event flow. The event target is the EventTarget object upon which the dispatchEvent() method is called.
 *
 * @method dispatchEvent
 * @param {Event} event - The Event object that is dispatched into the event flow
 * @return {Boolean} - returns true if either the event's preventDefault() method was not invoked,
 *                      or its cancelable attribute value is false, and false otherwise.
 */
EventTarget.prototype.dispatchEvent = function (event) {
    this._doDispatchEvent(event);
    cachedArray.length = 0;
    var notPrevented = ! event._defaultPrevented;
    event._reset();
    return notPrevented;
};

/**
 * Send an event to this object directly, this method will not propagate the event to any other objects.
 *
 * @method _doSendEvent
 * @param {Event} event - The Event object that is sent to this event target.
 * @private
 */
EventTarget.prototype._doSendEvent = function (event) {
    // Event.AT_TARGET
    event.eventPhase = 2;
    event.currentTarget = this;
    if (this._capturingListeners) {
        this._capturingListeners.invoke(event);
        if (event._propagationStopped) {
            return;
        }
    }
    if (this._bubblingListeners) {
        this._bubblingListeners.invoke(event);
    }
};

/**
 * Send an event to this object directly, this method will not propagate the event to any other objects.
 * The event will be created from the supplied message, you can get the "detail" argument from event.detail.
 *
 * @method emit
 * @param {string} message - the message to send
 * @param {any} [detail] - whatever argument the message needs
 */
EventTarget.prototype.emit = function (message, detail) {
    if ( typeof message === 'string' ) {
        var event = new CustomEvent(message);
        event.detail = detail;
        this._doSendEvent(event);
    }
    else {
        Fire.error('The message must be provided');
    }
};

///**
// * Send an event to this object directly, this method will not propagate the event to any other objects.
// *
// * @param {Event} event - The Event object that is sent to this event target.
// * @return {Boolean} - returns true if either the event's preventDefault() method was not invoked,
// *                      or its cancelable attribute value is false, and false otherwise.
// */
//EventTarget.prototype.sendEvent = function (event) {
//    // Event.AT_TARGET
//    event.reset();
//    event.target = this;
//    this._doSendEvent(event);
//    return ! event._defaultPrevented;
//};

/**
 * Get all the targets listening to the supplied type of event in the target's capturing phase.
 * The capturing phase comprises the journey from the root to the last node BEFORE the event target's node.
 * The result should save in the array parameter, and MUST SORT from child nodes to parent nodes.
 *
 * Subclasses can override this method to make event propagable.
 * @method _getCapturingTargets
 * @param {string} type - the event type
 * @param {array} array - the array to receive targets
 * @example
 * Subclasses can override this method to make event propagable
 * ```js
 * for (var target = this._parent; target; target = target._parent) {
 *     if (target._capturingListeners && target._capturingListeners.has(type)) {
 *         array.push(target);
 *     }
 * }
 * ```
 */
EventTarget.prototype._getCapturingTargets = function (type, array) {

};

/**
 * Get all the targets listening to the supplied type of event in the target's bubbling phase.
 * The bubbling phase comprises any SUBSEQUENT nodes encountered on the return trip to the root of the tree.
 * The result should save in the array parameter, and MUST SORT from child nodes to parent nodes.
 *
 * Subclasses can override this method to make event propagable.
 * @method _getBubblingTargets
 * @param {string} type - the event type
 * @param {array} array - the array to receive targets
 */
EventTarget.prototype._getBubblingTargets = function (type, array) {
    // Subclasses can override this method to make event propagable.
};

Fire.EventTarget = EventTarget;

module.exports = EventTarget;

},{"../fobject":24,"../js":27,"./event":23,"./event-listeners":21}],23:[function(require,module,exports){

/**
 * An event allows for signaling that something has occurred. E.g. that an asset has completed downloading.
 * @class Event
 * @constructor
 * @param {string} type - The name of the event (case-sensitive), e.g. "click", "fire", or "submit"
 * @param {boolean} [bubbles=false] - A boolean indicating whether the event bubbles up through the tree or not
 */
function Event (type, bubbles) {
    //HashObject.call(this);
    if (typeof bubbles === 'undefined') { bubbles = false; }

    /**
     * The name of the event (case-sensitive), e.g. "click", "fire", or "submit"
     * @property type
     * @type {string}
     */
    this.type = type;

    /**
     * A reference to the target to which the event was originally dispatched
     * @property target
     * @type {object}
     */
    this.target = null;

    /**
     * A reference to the currently registered target for the event
     * @property currentTarget;
     * @type {object}
     */
    this.currentTarget = null;

    /**
     * Indicates which phase of the event flow is currently being evaluated.
     * Returns an integer value represented by 4 constants:
     *  - Event.NONE = 0
     *  - Event.CAPTURING_PHASE = 1
     *  - Event.AT_TARGET = 2
     *  - Event.BUBBLING_PHASE = 3
     * The phases are explained in the [section 3.1, Event dispatch and DOM event flow]
     * (http://www.w3.org/TR/DOM-Level-3-Events/#event-flow), of the DOM Level 3 Events specification.
     *
     * @property eventPhase
     * @type {number}
     */
    this.eventPhase = 0;

    /**
     * A boolean indicating whether the event bubbles up through the hierarchy or not
     * @property bubbles
     * @type {boolean}
     */
    this.bubbles = bubbles;

    /**
     * Indicates whether or not event.preventDefault() has been called on the event
     * @property _defaultPrevented
     * @type {boolean}
     * @private
     */
    this._defaultPrevented = false;

    /**
     * Indicates whether or not event.stop() has been called on the event
     * @property _propagationStopped
     * @type {boolean}
     * @private
     */
    this._propagationStopped = false;

    /**
     * Indicates whether or not event.stop(true) has been called on the event
     * @property _propagationImmediateStopped
     * @type {boolean}
     * @private
     */
    this._propagationImmediateStopped = false;

    //this.cancelable = false;
    //this.clipboardData = undefined;
    //this.path = NodeList[0];
    //this.returnValue = true;
    //this.srcElement = null;
    //this.timeStamp = 1415761681529;
}

/**
 * Events not currently dispatched are in this phase
 * @property NONE
 * @type {number}
 * @static
 * @final
 */
Event.NONE = 0;
/**
 * The capturing phase comprises the journey from the root to the last node before the event target's node
 * see http://www.w3.org/TR/DOM-Level-3-Events/#event-flow
 * @property CAPTURING_PHASE
 * @type {number}
 * @static
 * @final
 */
Event.CAPTURING_PHASE = 1;
/**
 * The target phase comprises only the event target node
 * see http://www.w3.org/TR/DOM-Level-3-Events/#event-flow
 * @property AT_TARGET
 * @type {number}
 * @static
 * @final
 */
Event.AT_TARGET = 2;
/**
 * The bubbling phase comprises any subsequent nodes encountered on the return trip to the root of the hierarchy
 * see http://www.w3.org/TR/DOM-Level-3-Events/#event-flow
 * @property BUBBLING_PHASE
 * @type {number}
 * @static
 * @final
 */
Event.BUBBLING_PHASE = 3;

/**
 * Stop propagation. When dispatched in a tree, invoking this method prevents event from reaching any other objects than the current.
 *
 * @method stop
 * @param {boolean} [immediate=false] - Indicates whether or not to immediate stop the propagation, default is false.
 *                                      If true, for this particular event, no other callback will be called.
 *                                      Neither those attached on the same event target,
 *                                      nor those attached on targets which will be traversed later.
 */
Event.prototype.stop = function (immediate) {
    this._propagationStopped = true;
    if (immediate) {
        this._propagationImmediateStopped = true;
    }
};

/**
 * If invoked when the cancelable attribute value is true, signals to the operation that caused event to be dispatched that it needs to be canceled.
 * @method preventDefault
 */
Event.prototype.preventDefault = function () {
    this._defaultPrevented = true;
};

/**
 * @method _reset
 * @private
 */
Event.prototype._reset = function () {
    this.target = null;
    this.currentTarget = null;
    this.eventPhase = 0;
    this._defaultPrevented = false;
    this._propagationStopped = false;
    this._propagationImmediateStopped = false;
};

function CustomEvent (type, bubbles) {
    Event.call(this, type, bubbles);
    this.detail = null;
}
Event.CustomEvent = CustomEvent;

Fire.Event = Event;
Fire.CustomEvent = CustomEvent;

module.exports = Event;

},{}],24:[function(require,module,exports){
var JS = require('./js');
require('./class');
var Def = require('./definition');

var Destroyed = Def.Destroyed;
var ToDestroy = Def.ToDestroy;

/**
 * The base class of most of all the objects in Fireball.
 * @class FObject
 * @constructor
 */
FObject = (function () {

    // constructor

    function FObject () {

        /**
         * @property _name
         * @type string
         * @default ""
         * @private
         */
        this._name = '';

        /**
         * @property _objFlags
         * @type number
         * @default 0
         * @private
         */
        this._objFlags = 0;
    }

    Fire._fastDefine('Fire.FObject', FObject, ['_name', '_objFlags']);

    // internal static

    var objectsToDestroy = [];

    Object.defineProperty(FObject, '_deferredDestroy', {
        value: function () {
            var deleteCount = objectsToDestroy.length;
            for (var i = 0; i < deleteCount; ++i) {
                var obj = objectsToDestroy[i];
                if (!(obj._objFlags & Destroyed)) {
                    obj._destroyImmediate();
                }
            }
            // if we called b.destory() in a.onDestroy(), objectsToDestroy will be resized,
            // but we only destroy the objects which called destory in this frame.
            if (deleteCount === objectsToDestroy.length) {
                objectsToDestroy.length = 0;
            }
            else {
                objectsToDestroy.splice(0, deleteCount);
            }

            // @ifdef EDITOR
            deferredDestroyTimer = -1;
            // @endif
        },
        enumerable: false
    });

    // @ifdef EDITOR
    Object.defineProperty(FObject, '_clearDeferredDestroyTimer', {
        value: function () {
            if (deferredDestroyTimer !== -1) {
                clearTimeout(deferredDestroyTimer);
                deferredDestroyTimer = -1;
            }
        },
        enumerable: false
    });
    // @endif

    // member

    var prototype = FObject.prototype;

    /**
     * The name of the object.
     * @property name
     * @type string
     * @default ""
     */
    JS.getset(prototype, 'name',
        function () {
            return this._name;
        },
        function (value) {
            this._name = value;
        }
    );

    /**
     * Indicates whether the object is not yet destroyed
     * @property isValid
     * @type boolean
     * @default true
     * @readOnly
     */
    JS.get(prototype, 'isValid', function () {
        return !(this._objFlags & Destroyed);
    });

    // @ifdef EDITOR
    var deferredDestroyTimer = -1;
    // @endif

    /**
     * Destroy this FObject, and release all its own references to other resources.
     *
     * After destory, this FObject is not usable any more.
     * You can use Fire.isValid(obj) (or obj.isValid if obj is non-nil) to check whether the object is destroyed before
     * accessing it.
     *
     * @method destroy
     * @return {Boolean} whether it is the first time the destroy being called
     */
    prototype.destroy = function () {
        if (this._objFlags & Destroyed) {
            Fire.warn('object already destroyed');
            return false;
        }
        if (this._objFlags & ToDestroy) {
            return false;
        }
        this._objFlags |= ToDestroy;
        objectsToDestroy.push(this);

        // @ifdef EDITOR
        if (deferredDestroyTimer === -1 && Fire.engine && ! Fire.engine._isUpdating) {
            // auto destroy immediate in edit mode
            deferredDestroyTimer = setTimeout(FObject._deferredDestroy, 1);
        }
        // @endif
        return true;
    };

    /**
     * Clear all references in the instance.
     *
     * NOTE: this method will not clear the getter or setter functions which defined in the INSTANCE of FObject.
     *       You can override the _destruct method if you need.
     * @method _destruct
     * @private
     */
    prototype._destruct = function () {
        // 允许重载destroy
        // 所有可枚举到的属性，都会被清空
        for (var key in this) {
            if (this.hasOwnProperty(key)) {
                var type = typeof this[key];
                switch (type) {
                    case 'string':
                        this[key] = '';
                        break;
                    case 'object':
                        this[key] = null;
                        break;
                    case 'function':
                        this[key] = null;
                        break;
                    default:
                        break;
                }
            }
        }
    };

    /**
     * Called before the object being destroyed.
     * @method _onPreDestroy
     * @private
     */
    prototype._onPreDestroy = null;

    prototype._destroyImmediate = function () {
        if (this._objFlags & Destroyed) {
            Fire.error('object already destroyed');
            return;
        }
        // engine internal callback
        if (this._onPreDestroy) {
            this._onPreDestroy();
        }
        // do destroy
        this._destruct();
        // mark destroyed
        this._objFlags |= Destroyed;
    };

    // @ifdef EDITOR
    /**
     * The customized serialization for this object. (Editor Only)
     * @method _serialize
     * @param {Boolean} exporting
     * @return {object} the serialized json data object
     * @private
     */
    prototype._serialize = null;
    // @endif

    /**
     * Init this object from the custom serialized data.
     * @method _deserialize
     * @param {object} data - the serialized json data
     * @param {_Deserializer} ctx
     * @private
     */
    prototype._deserialize = null;

    return FObject;
})();

/**
 * @module Fire
 */
/**
 * Checks whether the object is non-nil and not yet destroyed
 * @method isValid
 * @param {object|any} value
 * @return {Boolean} whether is valid
 */
Fire.isValid = function (value) {
    if (typeof value === 'object') {
        return !!value && !(value._objFlags & Destroyed);
    }
    else {
        return typeof value !== 'undefined';
    }
};

Fire.FObject = FObject;

module.exports = FObject;

},{"./class":17,"./definition":18,"./js":27}],25:[function(require,module,exports){
var root = typeof global !== 'undefined' ? global : window;

/**
 * !#en
 * Global object with runtime classes, properties and methods you can access from anywhere.
 *
 * `Fire(node)` takes a runtime node and return its corresponding Fire.Runtime.NodeWrapper instance.
 *
 * Submodules:
 * - [JS](./Fire.JS.html)
 * - [Runtime](./Fire.Runtime.html)
 *
 * !#zh
 * 可全局访问的公共方法和属性，也会包括一些组件和类的静态方法。
 * Fire 本身也是一个方法，直接调用的话将返回或新建跟给定 node 相互绑定的 NodeWrapper 实例。
 *
 * 包含的子模块:
 * - [JS](./Fire.JS.html)
 * - [Runtime](./Fire.Runtime.html)
 *
 * @module Fire
 * @main Fire
 */
var getWrapper;
if (!root.Fire) {
    // Always export Fire globally.
    root.Fire = function (node) {
        return getWrapper(node);
    };
}

Fire._setWrapperGetter = function (getter) {
    getWrapper = getter;
};

require('./definition');

// Declare pre-process macros globally for uglify
if (typeof FIRE_DEBUG === 'undefined') {
    eval('FIRE_DEBUG=!0');      // use eval to ignore uglify
}
if (typeof FIRE_DEV === 'undefined') {
    if (FIRE_EDITOR || FIRE_DEBUG) {
        eval('FIRE_DEV=!0');    // use eval to ignore uglify
    }
    else {
        eval('FIRE_DEV=!1');    // use eval to ignore uglify
    }
}
if (typeof FIRE_TEST === 'undefined') {
    if (FIRE_EDITOR) {
        eval('FIRE_TEST=typeof describe!=="undefined"');       // use eval to ignore uglify
    }
    else {
        eval('FIRE_TEST=!1');       // use eval to ignore uglify
    }
}

// javascript extends

require('./js');
if (!Fire.log) {
    // 编辑器已经定义了 Fire.log
    require('./log');
}
require('./math');
require('./utils');
require('./enum');
require('./fobject');
require('./class-new');
require('./value-types');
require('./callbacks-invoker');
require('./path');
require('./intersection');
require('./polygon');

// engine toolkit

require('./url');
require('./asset');
require('./deserialize');
require('./event/event-target');
require('./playable');
require('./../runtime/behavior');

// script management

require('./requiring-frame');

if (Fire.isWeb) {
    // codes only available in page level
    require('./ticker');
    require('./time');
    require('./loaders');
    require('./load-manager');
    require('./asset-library');
}

module.exports = Fire;

},{"./../runtime/behavior":57,"./asset":13,"./asset-library":12,"./callbacks-invoker":15,"./class-new":16,"./definition":18,"./deserialize":19,"./enum":20,"./event/event-target":22,"./fobject":24,"./intersection":26,"./js":27,"./load-manager":28,"./loaders":29,"./log":30,"./math":31,"./path":32,"./playable":33,"./polygon":34,"./requiring-frame":36,"./ticker":37,"./time":38,"./url":39,"./utils":40,"./value-types":42}],26:[function(require,module,exports){
/**
 * @class Intersection
 * @static
 */
Fire.Intersection = (function () {
    var Intersection = {};

    /**
     * @method lineLine
     * @param {Vec2} a1
     * @param {Vec2} a2
     * @param {Vec2} b1
     * @param {Vec2} b2
     * @return {boolean}
     */
    function _lineLine ( a1, a2, b1, b2 ) {
        var result;

        var ua_t = (b2.x - b1.x) * (a1.y - b1.y) - (b2.y - b1.y) * (a1.x - b1.x);
        var ub_t = (a2.x - a1.x) * (a1.y - b1.y) - (a2.y - a1.y) * (a1.x - b1.x);
        var u_b  = (b2.y - b1.y) * (a2.x - a1.x) - (b2.x - b1.x) * (a2.y - a1.y);

        if ( u_b !== 0 ) {
            var ua = ua_t / u_b;
            var ub = ub_t / u_b;

            if ( 0 <= ua && ua <= 1 && 0 <= ub && ub <= 1 ) {
                return true;
            }
        }

        return false;
    }

    Intersection.lineLine = _lineLine;

    /**
     * @method lineRect
     * @param {Vec2} a1
     * @param {Vec2} a2
     * @param {Vec2} b
     * @return {boolean}
     */
    function _lineRect ( a1, a2, b ) {
        var r0 = new Fire.Vec2( b.x, b.y );
        var r1 = new Fire.Vec2( b.x, b.yMax );
        var r2 = new Fire.Vec2( b.xMax, b.yMax );
        var r3 = new Fire.Vec2( b.xMax, b.y );

        if ( _lineLine( a1, a2, r0, r1 ) )
            return true;

        if ( _lineLine( a1, a2, r1, r2 ) )
            return true;

        if ( _lineLine( a1, a2, r2, r3 ) )
            return true;

        if ( _lineLine( a1, a2, r3, r0 ) )
            return true;

        return false;
    }

    Intersection.lineRect = _lineRect;

    /**
     * @method linePolygon
     * @param {Vec2} a1
     * @param {Vec2} a2
     * @param {Polygon} b
     * @return {boolean}
     */
    function _linePolygon ( a1, a2, b ) {
        var length = b.points.length;

        for ( var i = 0; i < length; ++i ) {
            var b1 = b.points[i];
            var b2 = b.points[(i+1)%length];

            if ( _lineLine( a1, a2, b1, b2 ) )
                return true;
        }

        return false;
    }
    Intersection.linePolygon = _linePolygon;

    /**
     * @method rectRect
     * @param {Rect} a
     * @param {Rect} b
     * @return {boolean}
     */
    function _rectRect ( a, b ) {
        var a_min_x = a.x;
        var a_min_y = a.y;
        var a_max_x = a.x + a.width;
        var a_max_y = a.y + a.height;

        var b_min_x = b.x;
        var b_min_y = b.y;
        var b_max_x = b.x + b.width;
        var b_max_y = b.y + b.height;

        return a_min_x <= b_max_x &&
               a_max_x >= b_min_x &&
               a_min_y <= b_max_y &&
               a_max_y >= b_min_y
               ;
    }
    Intersection.rectRect = _rectRect;

    /**
     * @method rectPolygon
     * @param {Rect} a
     * @param {Polygon} b
     * @return {boolean}
     */
    function _rectPolygon ( a, b ) {
        var i;
        var r0 = new Fire.Vec2( a.x, a.y );
        var r1 = new Fire.Vec2( a.x, a.yMax );
        var r2 = new Fire.Vec2( a.xMax, a.yMax );
        var r3 = new Fire.Vec2( a.xMax, a.y );

        // intersection check
        if ( _linePolygon( r0, r1, b ) )
            return true;

        if ( _linePolygon( r1, r2, b ) )
            return true;

        if ( _linePolygon( r2, r3, b ) )
            return true;

        if ( _linePolygon( r3, r0, b ) )
            return true;

        // check if a contains b
        for ( i = 0; i < b.points.length; ++i ) {
            if ( a.contains( b.points[i] ) )
                return true;
        }

        // check if b contains a
        if ( b.contains(r0) )
            return true;

        if ( b.contains(r1) )
            return true;

        if ( b.contains(r2) )
            return true;

        if ( b.contains(r3) )
            return true;

        return false;
    }
    Intersection.rectPolygon = _rectPolygon;

    /**
     * @method polygonPolygon
     * @param {Polygon} a
     * @param {Polygon} b
     * @return {boolean}
     */
    function _polygonPolygon ( a, b ) {
        var i;

        // check if a intersects b
        for ( i = 0; i < length; ++i ) {
            var a1 = a.points[i];
            var a2 = a.points[(i+1)%length];

            if ( _linePolygon( a1, a2, b ) )
                return true;
        }

        // check if a contains b
        for ( i = 0; i < b.points.length; ++i ) {
            if ( a.contains( b.points[i] ) )
                return true;
        }

        // check if b contains a
        for ( i = 0; i < a.points.length; ++i ) {
            if ( b.contains( a.points[i] ) )
                return true;
        }

        return false;
    }
    Intersection.polygonPolygon = _polygonPolygon;

    return Intersection;
})();

},{}],27:[function(require,module,exports){

function _getPropertyDescriptor (obj, name) {
    var pd = Object.getOwnPropertyDescriptor(obj, name);
    if (pd) {
        return pd;
    }
    var p = Object.getPrototypeOf(obj);
    if (p) {
        return _getPropertyDescriptor(p, name);
    }
    else {
        return null;
    }
}

function _copyprop(name, source, target) {
    var pd = _getPropertyDescriptor(source, name);
    Object.defineProperty(target, name, pd);
}

/**
 * This module provides some JavaScript utilities.
 *
 * @module Fire.JS
 */
var JS = {

    /**
     * copy all properties not defined in obj from arguments[1...n]
     * @method addon
     * @param {object} obj object to extend its properties
     * @param {object} ...sourceObj source object to copy properties from
     * @return {object} the result obj
     */
    addon: function (obj) {
        'use strict';
        obj = obj || {};
        for (var i = 1, length = arguments.length; i < length; i++) {
            var source = arguments[i];
            if (source) {
                if (typeof source !== 'object') {
                    Fire.error('Fire.JS.addon called on non-object:', source);
                    continue;
                }
                for ( var name in source) {
                    if ( !(name in obj) ) {
                        _copyprop( name, source, obj);
                    }
                }
            }
        }
        return obj;
    },

    /**
     * copy all properties from arguments[1...n] to obj
     * @method mixin
     * @param {object} obj
     * @param {object} ...sourceObj
     * @return {object} the result obj
     */
    mixin: function (obj) {
        'use strict';
        obj = obj || {};
        for (var i = 1, length = arguments.length; i < length; i++) {
            var source = arguments[i];
            if (source) {
                if (typeof source !== 'object') {
                    Fire.error('Fire.JS.mixin: arguments must be type object:', source);
                    continue;
                }
                for ( var name in source) {
                    _copyprop( name, source, obj);
                }
            }
        }
        return obj;
    },

    /**
     * Derive the class from the supplied base class.
     * Both classes are just native javascript constructors, not created by Fire.Class, so
     * usually you will want to inherit using {% crosslink Fire.Class Fire.Class %} instead.
     *
     * @method extend
     * @param {function} cls
     * @param {function} base - the baseclass to inherit
     * @return {function} the result class
     */
    extend: function (cls, base) {
        if (FIRE_DEV) {
            if (!base) {
                Fire.error('The base class to extend from must be non-nil');
                return;
            }
            if (!cls) {
                Fire.error('The class to extend must be non-nil');
                return;
            }
        }
        for (var p in base) if (base.hasOwnProperty(p)) cls[p] = base[p];
        function __() { this.constructor = cls; }
        __.prototype = base.prototype;
        cls.prototype = new __();
        return cls;
    },

    /**
     * Removes all enumerable properties from object
     * @method clear
     * @param {any} obj
     */
    clear: function (obj) {
        var keys = Object.keys(obj);
        for (var i = 0; i < keys.length; i++) {
            delete obj[keys[i]];
        }
    },

    /**
     * 查找所有父类，直到找到原始定义 property 的地方
     * @method getPropertyDescriptor
     * @param {object} obj
     * @param {string} name
     * @return {object}
     */
    getPropertyDescriptor: _getPropertyDescriptor
};

/**
 * Get class name of the object, if object is just a {} (and which class named 'Object'), it will return null.
 * (modified from <a href="http://stackoverflow.com/questions/1249531/how-to-get-a-javascript-objects-class">the code from this stackoverflow post</a>)
 * @method getClassName
 * @param {object|function} obj - instance or constructor
 * @return {string}
 */
JS.getClassName = function (obj) {
    if (typeof obj === 'function') {
        if (obj.prototype.__classname__) {
            return obj.prototype.__classname__;
        }
    }
    else if (obj && obj.constructor) {
        if (obj.constructor.prototype && obj.constructor.prototype.hasOwnProperty('__classname__')) {
            return obj.__classname__;
        }
        var retval;
        //  for browsers which have name property in the constructor of the object, such as chrome
        if (obj.constructor.name) {
            retval = obj.constructor.name;
        }
        if (obj.constructor.toString) {
            var arr, str = obj.constructor.toString();
            if (str.charAt(0) === '[') {
                // str is "[object objectClass]"
                arr = str.match(/\[\w+\s*(\w+)\]/);
            }
            else {
                // str is function objectClass () {} for IE Firefox
                arr = str.match(/function\s*(\w+)/);
            }
            if (arr && arr.length === 2) {
                retval = arr[1];
            }
        }
        return retval !== 'Object' ? retval : null;
    }
    return null;
};

// id 注册
(function () {
    var _idToClass = {};
    var _nameToClass = {};

    function getRegister (key, table) {
        return function (id, constructor) {
            // deregister old
            if (constructor.prototype.hasOwnProperty(key)) {
                delete table[constructor.prototype[key]];
            }
            constructor.prototype[key] = id;
            // register class
            if (id) {
                var registered = table[id];
                if (registered && registered !== constructor) {
                    var error = 'A Class already exists with the same ' + key + ' : "' + id + '".';
                    if (FIRE_TEST) {
                        error += ' (This may be caused by error of unit test.) \
If you dont need serialization, you can set class id to "". You can also call \
Fire.JS.unregisterClass to remove the id of unused class';
                    }
                    Fire.error(error);
                }
                else {
                    table[id] = constructor;
                }
                //if (id === "") {
                //    console.trace("", table === _nameToClass);
                //}
            }
        };
    }

    /**
     * Register the class by specified id, if its classname is not defined, the class name will also be set.
     * @method _setClassId
     * @param {string} classId
     * @param {function} constructor
     * @private
     */
    JS._setClassId = getRegister('__cid__', _idToClass);

    var doSetClassName = getRegister('__classname__', _nameToClass);

    /**
     * Register the class by specified name manually
     * @method setClassName
     * @param {string} className
     * @param {function} constructor
     */
    JS.setClassName = function (className, constructor) {
        doSetClassName(className, constructor);
        // auto set class id
        if (className && !constructor.prototype.hasOwnProperty('__cid__')) {
            JS._setClassId(className, constructor);
        }
    };

    /**
     * Unregister a class from fireball.
     *
     * If you dont need a class (which defined by Fire.define or Fire.setClassName) anymore,
     * You should unregister the class so that Fireball will not keep its reference anymore.
     * Please note that its still your responsibility to free other references to the class.
     *
     * @method unregisterClass
     * @param {function} ...constructor - the class you will want to unregister, any number of classes can be added
     */
    JS.unregisterClass = function (constructor) {
        'use strict';
        for (var i = 0; i < arguments.length; i++) {
            var p = arguments[i].prototype;
            var classId = p.__cid__;
            if (classId) {
                delete _idToClass[classId];
            }
            var classname = p.__classname__;
            if (classname) {
                delete _nameToClass[classname];
            }
        }
    };

    /**
     * Get the registered class by id
     * @method _getClassById
     * @param {string} classId
     * @return {function} constructor
     * @private
     */
    JS._getClassById = function (classId) {
        var cls = _idToClass[classId];
        if (FIRE_EDITOR && !cls) {
            if (classId.length === 32) {
                // 尝试解析旧的 uuid 压缩格式
                cls = _idToClass[Editor.compressUuid(classId)];
            }
        }
        return cls;
    };

    /**
     * Get the registered class by name
     * @method getClassByName
     * @param {string} classname
     * @return {function} constructor
     */
    JS.getClassByName = function (classname) {
        return _nameToClass[classname];
    };

    /**
     * Get class id of the object
     * @method _getClassId
     * @param {object|function} obj - instance or constructor
     * @return {string}
     * @private
     */
    JS._getClassId = function (obj) {
        if (typeof obj === 'function' && obj.prototype.hasOwnProperty('__cid__')) {
            return obj.prototype.__cid__;
        }
        if (obj && obj.constructor) {
            var prototype = obj.constructor.prototype;
            if (prototype && prototype.hasOwnProperty('__cid__')) {
                return obj.__cid__;
            }
        }
        return '';
    };

    if (FIRE_EDITOR) {
        Object.defineProperty(JS, '_registeredClassIds', {
            get: function () {
                var dump = {};
                for (var id in _idToClass) {
                    dump[id] = _idToClass[id];
                }
                return dump;
            },
            set: function (value) {
                JS.clear(_idToClass);
                for (var id in value) {
                    _idToClass[id] = value[id];
                }
            }
        });
        Object.defineProperty(JS, '_registeredClassNames', {
            get: function () {
                var dump = {};
                for (var id in _nameToClass) {
                    dump[id] = _nameToClass[id];
                }
                return dump;
            },
            set: function (value) {
                JS.clear(_nameToClass);
                for (var id in value) {
                    _nameToClass[id] = value[id];
                }
            }
        });
    }

})();

/**
 * Define get set accessor, just help to call Object.defineProperty(...)
 * @method getset
 * @param {any} obj
 * @param {string} prop
 * @param {function} getter
 * @param {function} setter
 * @param {Boolean} [enumerable=false]
 */
JS.getset = function (obj, prop, getter, setter, enumerable) {
    Object.defineProperty(obj, prop, {
        get: getter,
        set: setter,
        enumerable: !!enumerable
    });
};

/**
 * Define get accessor, just help to call Object.defineProperty(...)
 * @method get
 * @param {any} obj
 * @param {string} prop
 * @param {function} getter
 * @param {Boolean} [enumerable=false]
 */
JS.get = function (obj, prop, getter, enumerable) {
    Object.defineProperty(obj, prop, {
        get: getter,
        enumerable: !!enumerable
    });
};

/**
 * Define set accessor, just help to call Object.defineProperty(...)
 * @method set
 * @param {any} obj
 * @param {string} prop
 * @param {function} setter
 * @param {Boolean} [enumerable=false]
 */
JS.set = function (obj, prop, setter, enumerable) {
    Object.defineProperty(obj, prop, {
        set: setter,
        enumerable: !!enumerable
    });
};

/**
 * Defines a polyfill field for obsoleted codes.
 * @method obsolete
 * @param {any} obj - YourObject or YourClass.prototype
 * @param {string} obsoleted - "OldParam" or "YourClass.OldParam"
 * @param {string} newPropName - "NewParam"
 * @param {bool} [writable=false]
 */
JS.obsolete = function (obj, obsoleted, newPropName, writable) {
    var oldName = obsoleted.split('.').slice(-1);
    JS.get(obj, oldName, function () {
        if (FIRE_DEV) {
            Fire.warn('"%s" is deprecated, use "%s" instead please.', obsoleted, newPropName);
        }
        return obj[newPropName];
    });
    if (writable) {
        JS.set(obj, oldName, function (value) {
            if (FIRE_DEV) {
                Fire.warn('"%s" is deprecated, use "%s" instead please.', obsoleted, newPropName);
            }
            obj[newPropName] = value;
        });
    }
};

/**
 * Defines all polyfill fields for obsoleted codes corresponding to the enumerable properties of props.
 * @method obsoletes
 * @param {any} obj - YourObject or YourClass.prototype
 * @param {any} objName - "YourObject" or "YourClass"
 * @param {object} props
 * @param {bool} [writable=false]
 */
JS.obsoletes = function (obj, objName, props, writable) {
    for (var obsoleted in props) {
        var newName = props[obsoleted];
        JS.obsolete(obj, objName + '.' + obsoleted, newName, writable);
    }
};

/**
 * @class Array
 * @static
 */
JS.Array = {
    /**
     * Removes the first occurrence of a specific object from the array.
     * @method remove
     * @param {any[]} array
     * @param {any} value
     * @return {Boolean}
     */
    remove: function (array, value) {
        var index = array.indexOf(value);
        if (index !== -1) {
            array.splice(index, 1);
            return true;
        }
        else {
            return false;
        }
    },

    /**
     * Removes the array item at the specified index.
     * @method removeAt
     * @param {any[]} array
     * @param {number} index
     */
    removeAt: function (array, index) {
        array.splice(index, 1);
    },

    /**
     * Determines whether the array contains a specific value.
     * @method contains
     * @param {any[]} array
     * @param {any} value
     * @return {Boolean}
     */
    contains: function (array, value) {
        return array.indexOf(value) !== -1;
    }
};

/**
 * @class String
 * @static
 */
JS.String = {
    /**
     * The startsWith() method determines whether a string begins with the characters of another string, returning true or false as appropriate.
     * @method startsWith
     * @param {string} string
     * @param {string} searchString - The characters to be searched for at the start of this string.
     * @param {string} [position=0] - Optional. The position in this string at which to begin searching for searchString; defaults to 0.
     * @return {Boolean}
     */
    startsWith: String.prototype.startsWith ?
        function (string, searchString, position) {
            return string.startsWith(searchString, position);
        } :
        function (string, searchString, position) {
            position = position || 0;
            return string.lastIndexOf(searchString, position) === position;
        },

    /**
     * This method lets you determine whether or not a string ends with another string.
     * @method startsWith
     * @param {string} string
     * @param {string} searchString - The characters to be searched for at the end of this string.
     * @param {string} [position=0] - Optional. Search within this string as if this string were only this long; defaults to this string's actual length, clamped within the range established by this string's length.
     * @return {Boolean}
     */
    endsWith: String.prototype.endsWith ?
        function (string, searchString, position) {
            return string.endsWith(searchString, position);
        } :
        function (string, searchString, position) {
            if (typeof position === 'undefined' || position > string.length) {
                position = string.length;
            }
            position -= searchString.length;
            var lastIndex = string.indexOf(searchString, position);
            return lastIndex !== -1 && lastIndex === position;
        }
};

Fire.JS = JS;

module.exports = JS;

},{}],28:[function(require,module,exports){
var Loaders = require('./loaders');
var CallbacksInvoker = require('./callbacks-invoker');

function getBuiltinRawTypes () {
    return {
        image: {
            loader: Loaders.ImageLoader,
            defaultExtname: '.host'
        },
        json: {
            loader: Loaders.JsonLoader,
            defaultExtname: '.json'
        },
        text: {
            loader: Loaders.TextLoader,
            defaultExtname: '.txt'
        }
    };
}

var urlToCallbacks = new Fire.CallbacksInvoker();


 // list of elements to load, the element type is {
 //     url: url,
 //     loader: loader,
 //     callback: callback,
 // }
var loadQueue = [];

var loadNext = function () {
    if (LoadManager._curConcurrent >= LoadManager.maxConcurrent) {
        Fire.error('too many concurrent requests');
        return;
    }
    var nextOne = loadQueue.pop();
    if (nextOne) {
        doLoad(nextOne.loader, nextOne.url, nextOne.callback);
    }
};

function doLoad (loader, url, callback) {
    LoadManager._curConcurrent += 1;
    loader(url, function doLoadCB (error, asset) {
        callback(error, asset);
        LoadManager._curConcurrent = Math.max(0, LoadManager._curConcurrent - 1);
        loadNext();
    });
}

/**
* The manager scheduling resources loading
* - It will:
*   - select registered loader
*   - merge same url request
*   - limit the max concurrent request
* - It will NOT:
*   - cache what has being loaded
*   - load depends of resource
* @class LoadManager
* @static
*/
var LoadManager = {

    /**
     * Max allowed concurrent request count
     * @property maxConcurrent
     * @type {number}
     * @default 2
     */
    maxConcurrent: 2,

    /**
     * Current concurrent request count
     * @property _curConcurrent
     * @type {number}
     * @readOnly
     */
    _curConcurrent: 0,

    /**
     * NOTE: Request the same url with different loader is disallowed
     * @method loadByLoader
     * @param {function} loader
     * @param {string} url
     * @param {function} callback
     * @param {string} callback.param error - null or the error info
     * @param {any} callback.param data - the loaded data
     * @private
     */
    loadByLoader: function (loader, url, callback) {
        if (urlToCallbacks.add(url, callback)) {
            var callbackBundle = urlToCallbacks.bindKey(url, true);
            if (this._curConcurrent < this.maxConcurrent) {
                doLoad(loader, url, callbackBundle);
            }
            else {
                loadQueue.push({
                    url: url,
                    loader: loader,
                    callback: callbackBundle
                });
            }
        }
    },

    /**
     * @method load
     * @param {string} url
     * @param {string} rawType
     * @param {string} [rawExtname]
     * @param {function} callback
     * @param {string} callback.param error - null or the error info
     * @param {any} callback.param data - the loaded data
     * @private
     */
    load: function (url, rawType, rawExtname, callback) {
        if (typeof rawExtname === 'function') {
            callback = rawExtname;
        }
        var typeInfo = this._rawTypes[rawType];
        if (typeInfo) {
            var extname = rawExtname ? ('.' + rawExtname) : typeInfo.defaultExtname;
            if (extname) {
                var rawUrl = url + extname;
                this.loadByLoader(typeInfo.loader, rawUrl, callback);
            }
            else {
                callback(new Error('Undefined extname for the raw ' + rawType + ' file of ' + url), null);
            }
        }
        else {
            callback(new Error('Unknown raw type "' + rawType + '" of ' + url), null);
        }
    },

    _rawTypes: getBuiltinRawTypes(),

    /**
     * @method registerRawTypes
     * @param {string} rawType
     * @param {function} loader
     * @param {string} defaultExtname
     */
    registerRawTypes: function (rawType, loader, defaultExtname) {
        if (FIRE_DEV) {
            if (!rawType) {
                Fire.error('[AssetLibrary.registerRawTypes] rawType must be non-nil');
                return;
            }
            if (typeof rawType !== 'string') {
                Fire.error('[AssetLibrary.registerRawTypes] rawType must be string');
                return;
            }
            if (!loader) {
                Fire.error('[AssetLibrary.registerRawTypes] loader must be non-nil');
                return;
            }
            if (typeof loader !== 'function') {
                Fire.error('[AssetLibrary.registerRawTypes] loader must be function');
                return;
            }
        }
        if (this._rawTypes[rawType]) {
            Fire.error('rawType "%s" has already defined', rawType);
            return;
        }
        if (defaultExtname && defaultExtname[0] !== '.') {
            defaultExtname = '.' + defaultExtname;
        }
        this._rawTypes[rawType] = {
            loader: loader,
            defaultExtname: defaultExtname
        };
    },

    reset: function () {
        if (FIRE_EDITOR) {
            var audio = this._rawTypes.audio;
            this._rawTypes = getBuiltinRawTypes();
            this._rawTypes.audio = audio;
        }
    },

    isLoading: function (url, alsoCheckRaw) {
        if (FIRE_EDITOR) {
            if (this._curConcurrent === 0) {
                return false;
            }
            if (urlToCallbacks.has(url)) {
                return true;
            }
            if (alsoCheckRaw) {
                for (var u in urlToCallbacks._callbackTable) {
                    if (u.indexOf(url) === 0) {
                        return true;
                    }
                }
            }
            return false;
        }
    }
};

Fire.LoadManager = LoadManager;

module.exports = LoadManager;

if (FIRE_DEV) {
    LoadManager._urlToCallbacks = urlToCallbacks;
}

},{"./callbacks-invoker":15,"./loaders":29}],29:[function(require,module,exports){
var FireUrl = FIRE_EDITOR && !FIRE_TEST && require('fire-url');

function ImageLoader(url, callback, onProgress) {
    if (FIRE_EDITOR && FireUrl) {
        url = FireUrl.addRandomQuery(url);
    }

    var image = document.createElement('img');
    image.crossOrigin = 'Anonymous';

    var onload = function () {
        if (callback) {
            callback(null, this);
        }
        image.removeEventListener('load', onload);
        image.removeEventListener('error', onerror);
        image.removeEventListener('progress', onProgress);
    };
    var onerror = function (msg, line, url) {
        if (callback) {
            var error = new Error('Failed to load image: ' + msg + ' Url: ' + url);
            callback(error, null);
        }
        image.removeEventListener('load', onload);
        image.removeEventListener('error', onerror);
        image.removeEventListener('progress', onProgress);
    };

    image.addEventListener('load', onload);
    image.addEventListener('error', onerror);
    if (onProgress) {
        image.addEventListener('progress', onProgress);
    }
    image.src = url;
    return image;
}

Fire._ImageLoader = ImageLoader;

///**
// * @param {string} [responseType="text"] - the XMLHttpRequestResponseType
// */
function _LoadFromXHR(url, callback, onProgress, responseType) {
    var xhr = new XMLHttpRequest();
    //xhr.withCredentials = true;   // INVALID_STATE_ERR: DOM Exception 11 in phantomjs
    var total = -1;
    xhr.onreadystatechange = function () {
        if (xhr.readyState === xhr.DONE) {
            if (callback) {
                if (xhr.status === 200 || xhr.status === 0) {
                    callback(null, xhr);
                }
                else {
                    callback(new Error('LoadFromXHR: Could not load "' + url + '", status: ' + xhr.status), null);
                }
            }
            xhr.onreadystatechange = null;
            //xhr.onload = null;
            if (addedProgressListener) {
                xhr.removeEventListener('progress', addedProgressListener);
            }
        }
        else {
            if (onProgress && xhr.readyState === xhr.LOADING && !('onprogress' in xhr)) {
                if (total === -1) {
                    total = xhr.getResponseHeader('Content-Length');
                }
                onProgress(xhr.responseText.length, total);
            }
            if (onProgress && xhr.readyState === xhr.HEADERS_RECEIVED) {
                total = xhr.getResponseHeader('Content-Length');
            }
        }
    };
    //xhr.onload = function () {
    //    if (callback) {
    //        if (xhr.status === 200 || xhr.status === 0) {
    //            callback(xhr);
    //        }
    //        else {
    //            callback(null, 'LoadFromXHR: Could not load "' + url + '", status: ' + xhr.status);
    //        }
    //    }
    //    xhr.onreadystatechange = null;
    //    xhr.onload = null;
    //    if (addedProgressListener) {
    //        xhr.removeEventListener('progress', addedProgressListener);
    //    }
    //};
    xhr.open('GET', url, true);
    if (responseType) {
        xhr.responseType = responseType;
    }
    var addedProgressListener;
    if (onProgress && 'onprogress' in xhr) {
        addedProgressListener = function (event) {
            if (event.lengthComputable) {
                onProgress(event.loaded, event.total);
            }
        };
        xhr.addEventListener('progress', onprogress);
    }
    xhr.send();
}

function TextLoader(url, callback, onProgress) {
    var cb = callback && function(error, xhr) {
        if (xhr && xhr.responseText) {
            callback(null, xhr.responseText);
        }
        else {
            callback(new Error('TextLoader: "' + url +
                '" seems to be unreachable or the file is empty. InnerMessage: ' + error), null);
        }
    };
    _LoadFromXHR(url, cb, onProgress);
}

/**
 * @method _JsonLoader
 * @param {string} url
 * @param {function} callback
 * @param {string} callback.param error - null or the error info
 * @param {object} callback.param data - the loaded json object or null
 * @async
 * @private
 */
function JsonLoader(url, callback, onProgress) {
    var cb = callback && function(error, xhr) {
        if (xhr && xhr.responseText) {
            var json;
            try {
                json = JSON.parse(xhr.responseText);
            }
            catch (e) {
                callback(e, null);
                return;
            }
            callback(null, json);
        }
        else {
            callback(new Error('JsonLoader: "' + url +
                '" seems to be unreachable or the file is empty. InnerMessage: ' + error), null);
        }
    };
    _LoadFromXHR(url, cb, onProgress);
}

Fire._JsonLoader = JsonLoader;

module.exports = {
    LoadFromXHR: _LoadFromXHR,
    ImageLoader: ImageLoader,
    TextLoader: TextLoader,
    JsonLoader: JsonLoader
};

},{"fire-url":undefined}],30:[function(require,module,exports){

/**
 * !#en Outputs a message to the Fireball Console (editor) or Web Console (runtime).
 * !#zh 向 Fireball 编辑器控制台或浏览器控制台输出信息。
 * @method log
 * @param {any|string} obj - !#en A JavaScript string containing zero or more substitution strings. !#zh 包含一个或多个替代 string
 * @param {any} ...subst - JavaScript objects with which to replace substitution strings within msg. This gives you additional control over the format of the output.
 */
Fire.log = function () {
    console.log.apply(console, arguments);
};

/**
 * Outputs an informational message to the Fireball Console (editor) or Web Console (runtime).
 * - In Fireball, info is blue.
 * - In Firefox and Chrome, a small "i" icon is displayed next to these items in the Web Console's log.
 * @method info
 * @param {any|string} obj - A JavaScript string containing zero or more substitution strings.
 * @param {any} ...subst - JavaScript objects with which to replace substitution strings within msg. This gives you additional control over the format of the output.
 */
Fire.info = function () {
    (console.info || console.log).apply(console, arguments);
};

/**
 * Outputs a warning message to the Fireball Console (editor) or Web Console (runtime).
 * - In Fireball, warning is yellow.
 * - In Chrome, warning have a yellow warning icon with the message text.
 * @method warn
 * @param {any|string} obj - A JavaScript string containing zero or more substitution strings.
 * @param {any} ...subst - JavaScript objects with which to replace substitution strings within msg. This gives you additional control over the format of the output.
 */
Fire.warn = function () {
    console.warn.apply(console, arguments);
};

/**
 * Outputs an error message to the Fireball Console (editor) or Web Console (runtime).
 * - In Fireball, error is red.
 * - In Chrome, error have a red icon along with red message text.
 * @method error
 * @param {any|string} obj - A JavaScript string containing zero or more substitution strings.
 * @param {any} ...subst - JavaScript objects with which to replace substitution strings within msg. This gives you additional control over the format of the output.
 */
// error会dump call stack，用bind可以避免dump Fire.error自己。
Fire.error = console.error.bind(console);

/**
 * show error stacks in unit tests
 * @method _throw
 * @param {Error} error
 * @private
 */
Fire._throw = function (error) {
    Fire.error(error.stack || error);
};

},{}],31:[function(require,module,exports){
var JS = require('./js');

var _d2r = Math.PI / 180.0;
var _r2d = 180.0 / Math.PI;

/**
 * !#en
 * Extends the JavaScript built-in object that has properties and methods for mathematical constants and functions.
 * See [Global_Objects/Math on MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math)
 * !#zh 扩展 JavaScript 内建的数学计算属性和方法。
 * 请参考[MDN上的Global_Objects/Math](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math)
 * @module Math
 */
JS.mixin (Math, {

    /**
     * @property TWO_PI
     * @type number
     */
    TWO_PI: 2.0 * Math.PI,

    /**
     * @property HALF_PI
     * @type number
     */
    HALF_PI: 0.5 * Math.PI,

    /**
     * degree to radius
     * @property D2R
     * @type number
     */
    D2R: _d2r,

    /**
     * radius to degree
     * @property R2D
     * @type number
     */
    R2D: _r2d,

    /**
     * degree to radius
     * @method deg2rad
     * @param {number} degree
     * @return {number} radius
     */
    deg2rad: function ( degree ) {
        return degree * _d2r;
    },

    /**
     * radius to degree
     * @method rad2deg
     * @param {number} radius
     * @return {number} degree
     */
    rad2deg: function ( radius ) {
        return radius * _r2d;
    },

    /**
     * let radius in -pi to pi
     * @method rad180
     * @param {number} radius
     * @return {number} clamped radius
     */
    rad180: function ( radius ) {
        if ( radius > Math.PI || radius < -Math.PI ) {
            radius = (radius + Math.TOW_PI) % Math.TOW_PI;
        }
        return radius;
    },

    /**
     * let radius in 0 to 2pi
     * @method rad360
     * @param {number} radius
     * @return {number} clamped radius
     */
    rad360: function ( radius ) {
        if ( radius > Math.TWO_PI )
            return radius % Math.TOW_PI;
        else if ( radius < 0.0 )
            return Math.TOW_PI + radius % Math.TOW_PI;
        return radius;
    },

    /**
     * let degree in -180 to 180
     * @method deg180
     * @param {number} degree
     * @return {number} clamped degree
     */

    deg180: function ( degree ) {
        if ( degree > 180.0 || degree < -180.0 ) {
            degree = (degree + 360.0) % 360.0;
        }
        return degree;
    },

    /**
     * let degree in 0 to 360
     * @method deg360
     * @param {number} degree
     * @return {number} clamped degree
     */
    deg360: function ( degree ) {
        if ( degree > 360.0 )
            return degree % 360.0;
        else if ( degree < 0.0 )
            return 360.0 + degree % 360.0;
        return degree;
    },

    /**
     * Returns a floating-point random number between min (inclusive) and max (exclusive).
     * @method randomRange
     * @param {number} min
     * @param {number} max
     * @return {number} the random number
     */
    randomRange: function (min, max) {
        return Math.random() * (max - min) + min;
    },

    /**
     * Returns a random integer between min (inclusive) and max (exclusive).
     * @method randomRangeInt
     * @param {number} min
     * @param {number} max
     * @return {number} the random integer
     */
    randomRangeInt: function (min, max) {
        return Math.floor(this.randomRange(min, max));
    },

    /**
     * Clamps a value between a minimum float and maximum float value.
     * @method clamp
     * @param {number} val
     * @param {number} min
     * @param {number} max
     * @return {number}
     */
    clamp: function ( val, min, max ) {
        if (typeof min !== 'number') {
            Fire.error('[clamp] min value must be type number');
            return;
        }
        if (typeof max !== 'number') {
            Fire.error('[clamp] max value must be type number');
            return;
        }
        if (min > max) {
            Fire.error('[clamp] max value must not less than min value');
            return;
        }
        return Math.min( Math.max( val, min ), max );
    },

    /**
     * Clamps a value between 0 and 1.
     * @method clamp01
     * @param {number} val
     * @return {number}
     */
    clamp01: function ( val ) {
        return Math.min( Math.max( val, 0 ), 1 );
    },

    /**
     * @method calculateMaxRect
     * @param {Rect} out
     * @param {Vec2} p0
     * @param {Vec2} p1
     * @param {Vec2} p2
     * @param {Vec2} p3
     * @return {Rect} just the out rect itself
     */
    calculateMaxRect: function (out, p0, p1, p2, p3) {
        var minX = Math.min(p0.x, p1.x, p2.x, p3.x);
        var maxX = Math.max(p0.x, p1.x, p2.x, p3.x);
        var minY = Math.min(p0.y, p1.y, p2.y, p3.y);
        var maxY = Math.max(p0.y, p1.y, p2.y, p3.y);
        out.x = minX;
        out.y = minY;
        out.width = maxX - minX;
        out.height = maxY - minY;
        return out;
    },

    /**
     * @method lerp
     * @param {number} from
     * @param {number} to
     * @param {number} ratio - the interpolation coefficient
     * @return {number}
     */
    lerp: function (from, to, ratio) {
        return from + (to - from) * ratio;
    }
});

module.exports = Math;

},{"./js":27}],32:[function(require,module,exports){
/**
 * The utils for path operation
 * @class Path
 * @static
 */
if (Fire.isNode) {
    Fire.Path = require('path');
}
else {
    // implement a simple fallback if node not available
    Fire.Path = (function () {

        var splitPath;
        if (Fire.isWin32) {
            // copied from node.js/lib/path.js
            // Regex to split a windows path into three parts: [*, device, slash,
            // tail] windows-only
            var splitDeviceRe =
                /^([a-zA-Z]:|[\\\/]{2}[^\\\/]+[\\\/]+[^\\\/]+)?([\\\/])?([\s\S]*?)$/;

            // Regex to split the tail part of the above into [*, dir, basename, ext]
            var splitTailRe =
                /^([\s\S]*?)((?:\.{1,2}|[^\\\/]+?|)(\.[^.\/\\]*|))(?:[\\\/]*)$/;

            // Function to split a filename into [root, dir, basename, ext]
            // windows version
            splitPath = function(filename) {
                // Separate device+slash from tail
                var result = splitDeviceRe.exec(filename),
                    device = (result[1] || '') + (result[2] || ''),
                    tail = result[3] || '';
                // Split the tail into dir, basename and extension
                var result2 = splitTailRe.exec(tail),
                    dir = result2[1],
                    basename = result2[2],
                    ext = result2[3];
                return [device, dir, basename, ext];
            };
        }
        else {
            // copied from node.js/lib/path.js
            // Split a filename into [root, dir, basename, ext], unix version
            // 'root' is just a slash, or nothing.
            var splitPathRe =
                /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
            splitPath = function(filename) {
                return splitPathRe.exec(filename).slice(1);
            };
        }

        var Path = {
            /**
             * Return the last portion of a path.
             * @method basename
             * @param {string} path
             * @return {string}
             *
             * @example
    path.basename('/foo/bar/baz/asdf/quux.html')    // returns 'quux.html'
             */
            basename: function (path) {
                return path.replace(/^.*(\\|\/|\:)/, '');
            },

            /**
             * Return the extension of the path, from the last '.' to end of string in the last portion of the path.
             * If there is no '.' in the last portion of the path or the first character of it is '.',
             * then it returns an empty string.
             *
             * @method extname
             * @param {string} path
             * @return {string}
             *
             * @example
path.extname('index.html')      // returns '.html'
path.extname('index.coffee.md') // returns '.md'
path.extname('index.')          // returns '.'
path.extname('index')           // returns ''
             */
            extname: function (path) {
                path = Path.basename(path);
                return path.substring((~-path.lastIndexOf(".") >>> 0) + 1);
            },

            /**
             * Return the directory name of a path.
             *
             * @method dirname
             * @param {string} path
             * @return {string}
             *
             * @example
path.dirname('/foo/bar/baz/asdf/quux') // returns '/foo/bar/baz/asdf'
             */
            dirname: function (path) {
                // copied from node.js/lib/path.js
                var result = splitPath(path),
                    root = result[0],
                    dir = result[1];

                if (!root && !dir) {
                    // No dirname whatsoever
                    return '.';
                }

                if (dir) {
                    // It has a dirname, strip trailing slash
                    dir = dir.substr(0, dir.length - 1);
                }

                return root + dir;
            },

            /**
             * The platform-specific file separator. '\\' or '/'.
             * @property sep
             * @type {string}
             * @default windows: "\", mac: "/"
             * @readOnly
             */
            sep: (Fire.isWin32 ? '\\' : '/')
        };
        return Path;
    })();
}

/**
 * @method setExtname
 * @param {string} path
 * @param {string} newExtension - extension to replace with
 * @return {string} result
 */
Fire.Path.setExtname = function (path, newExtension) {
    // if (Fire.isNode) return Path.join(Path.dirname(path), Path.basename(path, Path.extname(path))) + newExtension;
    var dotIndex = (~-path.lastIndexOf(".") >>> 0) + 1;
    return path.substring(0, dotIndex) + newExtension;
};

/**
 * @method setEndWithSep
 * @param {string} path
 * @param {boolean} [endWithSep = true]
 * @param {string} [sep = Fire.Path.sep]
 * @return {string} result
 */
Fire.Path.setEndWithSep = function (path, endWithSep, sep) {
    endWithSep = (typeof endWithSep !== 'undefined') ? endWithSep : true;

    var endChar = path[path.length - 1];
    var oldEndWithSep = (endChar === '\\' || endChar === '/');
    if (!oldEndWithSep && endWithSep) {
        path += (sep || Fire.Path.sep);
    }
    else if (oldEndWithSep && !endWithSep) {
        path = path.slice(0, -1);
    }
    return path;
};

},{"path":undefined}],33:[function(require,module,exports){
var JS = require('./js');
var EventTarget = require('./event/event-target');

var Playable = (function () {
    /**
     * @class Playable
     * @constructor
     */
    function Playable () {
        this._isPlaying = false;
        this._isPaused = false;
        this._isUpdating = false;   // to cache the result of _isPlaying && !_isPaused
        this._stepOnce = false;
    }

    JS.extend(Playable, EventTarget);

    var prototype = Playable.prototype;

    /**
     * Is playing?
     * This property ignores the paused state, so even it is currently paused, this property still true.
     *
     * @property isPlaying
     * @type {Boolean}
     * @default false
     * @readOnly
     */
    JS.get(prototype, 'isPlaying', function () {
        return this._isPlaying;
    }, true);

    /**
     * Is currently updating?
     * This property is just the result of (this.isPlaying == true && this.isPaused == false)
     *
     * @property isUpdating
     * @type {Boolean}
     * @default false
     * @readOnly
     */
    JS.get(prototype, 'isUpdating', function () {
        return this._isUpdating;
    }, true);

    /**
     * Is currently paused? This can be true even if in edit mode(isPlaying == false).
     * @property isPaused
     * @type {Boolean}
     * @default false
     * @readOnly
     */
    JS.get(prototype, 'isPaused', function () {
        return this._isPaused;
    }, true);

    // virtual

    var virtual = function () {};
    /**
     * @method onPlay
     * @private
     */
    prototype.onPlay = virtual;
    /**
     * @method onPause
     * @private
     */
    prototype.onPause = virtual;
    /**
     * @method onResume
     * @private
     */
    prototype.onResume = virtual;
    /**
     * @method onStop
     * @private
     */
    prototype.onStop = virtual;
    /**
     * @method onError
     * @param {string} errorCode
     * @private
     */
    prototype.onError = virtual;

    // public

    /**
     * @method play
     */
    prototype.play = function () {
        if (this._isPlaying) {
            if (this._isPaused) {
                this._isPaused = false;
                this._isUpdating = true;
                this.onResume();
                this.emit('resume');
            }
            else {
                this.onError('already-playing');
                //this.emit('error', 'already-play');
            }
        }
        else {
            this._isPlaying = true;
            this._isUpdating = !this._isPaused;
            this.onPlay();
            this.emit('play');
        }
    };

    /**
     * @method stop
     */
    prototype.stop = function () {
        if (this._isPlaying) {
            this._isPlaying = false;
            this._isPaused = false;
            this._isUpdating = false;
            this.emit('stop');
            this.onStop();
        }
    };

    /**
     * @method pause
     */
    prototype.pause = function () {
        this._isPaused = true;
        this._isUpdating = false;
        this.emit('pause');
        this.onPause();
    };

    /**
     * Perform a single frame step.
     * @method step
     */
    prototype.step = function () {
        this.pause();
        this._stepOnce = true;
        if (!this._isPlaying) {
            this.play();
        }
    };

    return Playable;
})();

Fire.Playable = Playable;

module.exports = Playable;

},{"./event/event-target":22,"./js":27}],34:[function(require,module,exports){
var JS = require('./js');

Fire.Polygon = (function () {
    function Polygon( points ) {
        this.points = points;

        if ( this.points.length < 3 ) {
            console.warn( "Invalid polygon, the data must contains 3 or more points." );
        }
    }
    JS.setClassName('Fire.Polygon', Polygon);

    Polygon.prototype.intersects = function ( polygon ) {
        return Intersection.polygonPolygon( this, polygon );
    };

    Polygon.prototype.contains = function ( point ) {
        var inside = false;
        var x = point.x;
        var y = point.y;

        // use some raycasting to test hits
        // https://github.com/substack/point-in-polygon/blob/master/index.js
        var length = this.points.length;

        for ( var i = 0, j = length-1; i < length; j = i++ ) {
            var xi = this.points[i].x, yi = this.points[i].y,
                xj = this.points[j].x, yj = this.points[j].y,
                intersect = ((yi > y) !== (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);

            if ( intersect ) inside = !inside;
        }

        return inside;
    };

    Object.defineProperty(Polygon.prototype, 'center', {
        get: function () {
            if ( this.points.length < 3 )
                return null;

            var min_x = this.points[0].x;
            var min_y = this.points[0].y;
            var max_x = this.points[0].x;
            var max_y = this.points[0].y;

            for ( var i = 1; i < this.points.length; ++i ) {
                var x = this.points[i].x;
                var y = this.points[i].y;

                if ( x < min_x )
                    min_x = x;
                else if ( x > max_x )
                    max_x = x;

                if ( y < min_y )
                    min_y = y;
                else if ( y > max_y )
                    max_y = y;
            }

            return new Fire.Vec2( (max_x + min_x) * 0.5,
                                  (max_y + min_y) * 0.5 );
        }
    });

    return Polygon;
})();


},{"./js":27}],35:[function(require,module,exports){

// 不能使用于get方法的属性
var _propertyNotForGet = [
    'default',
    'serializable',
    'editorOnly',
    'rawType'
];

// 预处理 notify 等扩展属性
function parseNotify (val, propName, notify, properties) {
    if (val.get || val.set) {
        if (FIRE_DEV) {
            Fire.warn('"notify" can\'t work with "get/set" !');
        }
        return;
    }
    if (val.hasOwnProperty('default')) {
        // 添加新的内部属性，将原来的属性修改为 getter/setter 形式
        // 以 _ 开头将自动设置property 为 Fire.HideInInspector
        var newKey = "_valOf$" + propName;

        val.get = function () {
            return this[newKey];
        };
        val.set = function (value) {
            var oldValue = this[newKey];
            this[newKey] = value;
            notify.call(this, oldValue);
        };

        var newValue = {};
        properties[newKey] = newValue;
        // 将不能用于get方法中的属性移动到newValue中
        for (var i = 0; i < _propertyNotForGet.length; i++) {
            var prop = _propertyNotForGet[i];
            if (val.hasOwnProperty(prop)) {
                newValue[prop] = val[prop];
                delete val[prop];
            }
        }
    }
    else if (FIRE_DEV) {
        Fire.warn('"notify" must work with "default" !');
    }
}

// auto set wrapper's type
function parseWrapper (val, propName, wrapperOf, classname) {
    if (FIRE_EDITOR) {
        if (val.type) {
            Fire.warn('The "wrapper" attribute of %s.%s can not be used with "type"', classname, propName);
        }
        if (Fire.isChildClassOf(wrapperOf, Fire.Runtime.NodeWrapper)) {
            val.type = wrapperOf;
            return;
        }
        var wrapper = Fire.getWrapperType(wrapperOf);
        if (wrapper) {
            val.type = wrapper;
        }
        else {
            Fire.warn('Can not declare "wrapper" attribute for %s.%s, the registered wrapper of "%s" is not found.',
                name, propName, Fire.JS.getClassName(wrapperOf));
        }
    }
}

function createUuidAdapter (val, propName, type, properties, def) {
    // create an adapter field which actual value is uuid for Inspector
    var uuidKey = "_idOf$" + propName;
    var uuidDef = def;
    if (FIRE_EDITOR) {
        // hide original asset in Inspector
        val.visible = false;
        var originDisplayName = val.displayName;
        if (originDisplayName) {
            delete val.displayName;
        }
        uuidDef.displayName = originDisplayName ||
                              (typeof EditorUI !== 'undefined' && EditorUI.toHumanText(propName)) ||
                              propName;
        uuidDef.visible = true;
        uuidDef.type = type;
    }
    properties[uuidKey] = uuidDef;
}

//function parseAssetType (val, propName, type, properties) {
//    if (FIRE_EDITOR) {
//        createUuidAdapter(val, propName, type, properties, {
//            get: function () {
//                var asset = this[propName];
//                return asset ? asset._uuid : '';
//            },
//            set: function (value) {
//                if (value) {
//                    var self = this;
//                    Fire.AssetLibrary.loadAsset(value, function (err, asset) {
//                        if (asset) {
//                            if (!(asset instanceof type)) {
//                                Fire.error('The new %s must be %s', propName, Fire.JS.getClassName(type));
//                            }
//                        }
//                        self[propName] = asset;
//                    });
//                }
//                else {
//                    this[propName] = null;
//                }
//            }
//        });
//    }
//}

// create an adapter field which actual value is uuid for inspector
function parseAssetUrl (val, propName, typeOfUrl, properties, classname) {
    if (FIRE_EDITOR) {
        if (typeof typeOfUrl !== 'function' || !Fire.isChildClassOf(typeOfUrl, Fire.Asset)) {
            Fire.error('The "url" type of "%s.%s" must be child class of Fire.Asset.', classname, propName);
            return;
        }
    }
    //createUuidAdapter(val, propName, typeOfUrl, properties, {
    //    get: function () {
    //        if (FIRE_EDITOR) {
    //            var url = this[propName];
    //            return (url && Fire.Asset.urlToUuid(url)) || '';
    //        }
    //    },
    //    set: function (value) {
    //        if (value) {
    //            var self = this;
    //            Fire.AssetLibrary.loadAsset(value, function (err, asset) {
    //                if (asset) {
    //                    if (!(asset instanceof typeOfUrl)) {
    //                        Fire.error('The new %s must be %s', propName, Fire.JS.getClassName(typeOfUrl));
    //                    }
    //                }
    //                self[propName] = (asset && asset.url) || '';
    //            });
    //        }
    //        else {
    //            this[propName] = '';
    //        }
    //    }
    //});
    val.type = typeOfUrl;
    // create setter used after deserialized from asset library
    var setterKey = "_set$" + propName;
    var setterDef = {
        set: function (asset) {
            if (asset) {
                this[propName] = asset.url;
            }
        }
    };
    properties[setterKey] = setterDef;
}

module.exports = function (properties, classname) {
    for (var propName in properties) {
        var val = properties[propName];
        if (val) {
            var notify = val.notify;
            if (notify) {
                parseNotify(val, propName, notify, properties);
            }
            if (FIRE_EDITOR) {
                var wrapperOf = val.wrapper;
                if (wrapperOf) {
                    parseWrapper(val, propName, wrapperOf, classname);
                }
                //var type = val.type;
                //if (typeof type === 'function' && Fire.isChildClassOf(type, Fire.Asset)) {
                //    parseAssetType(val, propName, type, properties);
                //}
            }
            var url = val.url;
            if (url) {
                parseAssetUrl(val, propName, url, properties, classname);
            }
        }
    }
};

},{}],36:[function(require,module,exports){
var requiringFrames = [];  // the requiring frame infos

Fire._RFpush = function (module, uuid, script) {
    if (arguments.length === 2) {
        script = uuid;
        uuid = '';
    }
    requiringFrames.push({
        uuid: uuid,
        script: script,
        module: module,
        exports: module.exports,    // original exports
        beh: null
    });
};

Fire._RFpop = function () {
    var frameInfo = requiringFrames.pop();
    // check exports
    var module = frameInfo.module;
    var exports = module.exports;
    if (exports === frameInfo.exports) {
        for (var anyKey in exports) {
            // exported
            return;
        }
        // auto export behavior
        module.exports = exports = frameInfo.beh;
    }
    //if (Fire.isChildClassOf(exports, Fire.Behavior)) {
    //    if (frameInfo.script) {
    //        if (! Fire.JS.getClassName(exports)) {
    //            Fire.JS.setClassName(frameInfo.script, exports);
    //        }
    //        else {
    //            Fire.warn('Sorry, specifying class name for exported Behavior is not allowed.');
    //        }
    //    }
    //    if (frameInfo.uuid) {
    //        Fire.JS._setClassId(frameInfo.uuid, exports);
    //    }
    //}
};

Fire._RFpeek = function () {
    return requiringFrames[requiringFrames.length - 1];
};

},{}],37:[function(require,module,exports){
var Ticker = (function () {
    var Ticker = {};

    var _frameRate = 60;

    // Ticker.requestAnimationFrame

    window.requestAnimationFrame = window.requestAnimationFrame ||
                                   window.webkitRequestAnimationFrame ||
                                   window.msRequestAnimationFrame ||
                                   window.mozRequestAnimationFrame ||
                                   window.oRequestAnimationFrame;
    if (_frameRate !== 60 || !window.requestAnimationFrame) {
        Ticker.requestAnimationFrame = function (callback) {
            return window.setTimeout(callback, 1000 / _frameRate);
        };
    }
    else {
        Ticker.requestAnimationFrame = function (callback) {
            return window.requestAnimationFrame(callback);
        };
    }

    // Ticker.cancelAnimationFrame

    window.cancelAnimationFrame = window.cancelAnimationFrame ||
                                  window.webkitCancelAnimationFrame ||
                                  window.msCancelAnimationFrame ||
                                  window.mozCancelAnimationFrame ||
                                  window.oCancelAnimationFrame;
    if (window.cancelAnimationFrame) {
        Ticker.cancelAnimationFrame = function (requestId) {
            window.cancelAnimationFrame(requestId);
        };
    }
    else {
        Ticker.cancelAnimationFrame = function (requestId) {
            window.clearTimeout(requestId);
        };
    }

    // Ticker.now

    if (window.performance && window.performance.now) {
        Ticker.now = function () {
            return window.performance.now() / 1000;
        };
    }
    else {
        Ticker.now = function () {
            return Date.now() / 1000;
        };
    }

    return Ticker;
})();

Fire._Ticker = Ticker;

module.exports = Ticker;

},{}],38:[function(require,module,exports){

var lastUpdateTime = 0;
var startTime = 0;

/**
 * !#en The interface to get time information from Fireball.
 *
 * See [Time](/en/scripting/time/)
 * !#zh Time 模块用于获得游戏里的时间和帧率相关信息。直接使用 Fire.Time.*** 访问即可。
 *
 * 请参考教程[计时和帧率](/zh/scripting/time/)
 *
 * @class Time
 * @static
 */
var Time = {

    /**
     * The time at the beginning of this frame. This is the time in seconds since the start of the game.
     * @property time
     * @type {number}
     * @readOnly
     */
    time: 0,

    /**
     * The time at the beginning of this frame. This is the real time in seconds since the start of the game.
     *
     * `Time.realTime` not affected by time scale, and also keeps increasing while the player is paused in editor or in the background.
     * @property realTime
     * @type {number}
     * @readOnly
     */
    realTime: 0,

    /**
     * The time in seconds it took to complete the last frame. Use this property to make your game frame rate independent.
     * @property deltaTime
     * @type {number}
     * @readOnly
     */
    deltaTime: 0,

    /**
     * The total number of frames that have passed.
     * @property frameCount
     * @type {number}
     * @readOnly
     */
    frameCount: 0,

    /**
     * The maximum time a frame can take.
     * @property maxDeltaTime
     * @type {number}
     * @readOnly
     */
    maxDeltaTime: 0.3333333,

    /**
     * @method _update
     * @param {number} timestamp
     * @param {Boolean} [paused=false] if true, only realTime will be updated
     * @param {number} [maxDeltaTime=Time.maxDeltaTime]
     * @private
     */
    _update: function (timestamp, paused, maxDeltaTime) {
        if (!paused) {
            maxDeltaTime = maxDeltaTime || Time.maxDeltaTime;
            var delta = timestamp - lastUpdateTime;
            delta = Math.min(maxDeltaTime, delta);
            Time.deltaTime = delta;
            lastUpdateTime = timestamp;

            if (Time.frameCount === 0) {
                startTime = timestamp;
            }
            else {
                Time.time += delta;
                Time.realTime = timestamp - startTime;
            }
            ++Time.frameCount;
        }
    },

    /**
     * @method _restart
     * @param {number} timestamp
     * @private
     */
    _restart: function (timestamp) {
        Time.time = 0;
        Time.realTime = 0;
        Time.deltaTime = 0;
        Time.frameCount = 0;
        lastUpdateTime = timestamp;
    },
};

Fire.Time = Time;

module.exports = Time;

},{}],39:[function(require,module,exports){
/**
 * @class url
 * @static
 */
Fire.url = {

    /**
     * The base url of raw files.
     * @property rawUrl
     * @readOnly
     */
    rawUrl: '',

    /**
     * Returns the url of raw files.
     * @method raw
     * @param {string} path
     * @return {string} raw url
     * @example
var url = Fire.url.raw("myTexture.png");
console.log(url);   // "resources/raw/myTexture.png"
     */
    raw: function (url) {
        if (url[0] === '.' && url[1] === '/') {
            url = url.slice(2);
        }
        else if (url[0] === '/') {
            url = url.slice(1);
        }
        return this.rawUrl + url;
    }
};

module.exports = Fire.url;

},{}],40:[function(require,module,exports){
/**
 * @method padLeft
 * @param {string} text
 * @param {number} width
 * @param {string} ch - the character used to pad
 * @return {string}
 */
Fire.padLeft = function ( text, width, ch ) {
    text = text.toString();
    width -= text.length;
    if ( width > 0 ) {
        return new Array( width + 1 ).join(ch) + text;
    }
    return text;
};

/**
 * @method getEnumList
 * @param {object} enumDef - the enum type defined from Fire.defineEnum
 * @return {object[]}
 * @private
 */
Fire.getEnumList = function (enumDef) {
    if ( enumDef.__enums__ !== undefined )
        return enumDef.__enums__;

    var enums = [];
    for ( var entry in enumDef ) {
        if ( enumDef.hasOwnProperty(entry) ) {
            var value = enumDef[entry];
            var isInteger = typeof value === 'number' && (value | 0) === value; // polyfill Number.isInteger
            if ( isInteger ) {
                enums.push( { name: entry, value: value } );
            }
        }
    }
    enums.sort( function ( a, b ) { return a.value - b.value; } );

    enumDef.__enums__ = enums;
    return enums;
};

/**
 * @method getVarFrom
 * @param {object} obj
 * @param {string} text
 * @return {any}
 * @private
 */
Fire.getVarFrom = function ( obj, text ) {
    var res = text.split('.');
    var curObj = obj;
    for ( var i = 0; i < res.length; ++i ) {
        var name = res[i];
        curObj = curObj[name];
        if ( curObj === undefined || curObj === null )
            return null;
    }
    return curObj;
};

/**
 * @method rgb2hsv
 * @param {number} r - red, must be [0.0, 1.0]
 * @param {number} g - red, must be [0.0, 1.0]
 * @param {number} b - red, must be [0.0, 1.0]
 * @return {object} - {h: number, s: number, v: number}
 */
Fire.rgb2hsv = function ( r, g, b ) {
    var hsv = { h: 0, s: 0, v: 0 };
    var max = Math.max(r,g,b);
    var min = Math.min(r,g,b);
    var delta = 0;
    hsv.v = max;
    hsv.s = max ? (max - min) / max : 0;
    if (!hsv.s) hsv.h = 0;
    else {
        delta = max - min;
        if (r === max) hsv.h = (g - b) / delta;
        else if (g === max) hsv.h = 2 + (b - r) / delta;
        else hsv.h = 4 + (r - g) / delta;
        hsv.h /= 6;
        if (hsv.h < 0) hsv.h += 1.0;
    }
    return hsv;
};

/**
 * @method hsv2rgb
 * @param {number} h
 * @param {number} s
 * @param {number} v
 * @return {object} - {r: number, g: number, b: number}}, rgb will be in [0.0, 1.0]
 */
Fire.hsv2rgb = function ( h, s, v ) {
    var rgb = { r: 0, g: 0, b: 0 };
    if (s === 0) {
        rgb.r = rgb.g = rgb.b = v;
    }
    else {
        if (v === 0) {
            rgb.r = rgb.g = rgb.b = 0;
        }
        else {
            if (h === 1) h = 0;
            h *= 6;
            s = s;
            v = v;
            var i = Math.floor(h);
            var f = h - i;
            var p = v * (1 - s);
            var q = v * (1 - (s * f));
            var t = v * (1 - (s * (1 - f)));
            switch (i) {
                case 0:
                    rgb.r = v;
                    rgb.g = t;
                    rgb.b = p;
                    break;

                case 1:
                    rgb.r = q;
                    rgb.g = v;
                    rgb.b = p;
                    break;

                case 2:
                    rgb.r = p;
                    rgb.g = v;
                    rgb.b = t;
                    break;

                case 3:
                    rgb.r = p;
                    rgb.g = q;
                    rgb.b = v;
                    break;

                case 4:
                    rgb.r = t;
                    rgb.g = p;
                    rgb.b = v;
                    break;

                case 5:
                    rgb.r = v;
                    rgb.g = p;
                    rgb.b = q;
                    break;
            }
        }
    }
    return rgb;
};

/**
 * Searches the entire sorted Array for an element and returns the zero-based index of the element.
 * @method binarySearch
 * @param {number[]} array
 * @param {number} value
 * @return {number} The zero-based index of item in the sorted Array, if item is found; otherwise, a negative number that is the bitwise complement of the index of the next element that is larger than item or, if there is no larger element, the bitwise complement of array's length.
 */
Fire.binarySearch = function(array, value) {
    var l = 0, h = array.length - 1;
    while (l <= h) {
        var m = ((l + h) >> 1);
        if (array[m] === value) {
            return m;
        }
        if (array[m] > value) {
            h = m - 1;
        }
        else {
            l = m + 1;
        }
    }
    return ~l;
};

/**
 * Once the current event loop turn runs to completion, call the callback function.
 * @method nextTick
 * @param {function} callback
 * @param {any} p1
 * @param {any} p2
 */
Fire.nextTick = function (callback, p1, p2) {
    if (callback) {
        setTimeout(function () {
            callback(p1, p2);
        }, 1);
    }
};

module.exports = {
    isDomNode: Fire.isWeb && function (obj) {
        return (
            typeof Node === "object" ? obj instanceof Node :
            obj && typeof obj === "object" && typeof obj.nodeType === "number" && typeof obj.nodeName === "string"
        );
    },

    callInNextTick: function (callback, p1, p2) {
        if (callback) {
            setTimeout(function () {
                callback(p1, p2);
            }, 1);
        }
    }
};

if (FIRE_DEV) {
    Fire.JS.mixin(module.exports, {
        ///**
        // * @param {object} obj
        // * @return {Boolean} is {} ?
        // */
        isPlainEmptyObj_DEV: function (obj) {
            if (!obj || obj.constructor !== ({}).constructor) {
                return false;
            }
            // jshint ignore: start
            for (var k in obj) {
                return false;
            }
            // jshint ignore: end
            return true;
        },
        cloneable_DEV: function (obj) {
            return obj && typeof obj.clone === 'function' &&
                  (obj.constructor.prototype.hasOwnProperty('clone') || obj.hasOwnProperty('clone'));
        }
    });
}

},{}],41:[function(require,module,exports){
var ValueType = require('./value-type');
var JS = require('../js');

var Color = (function () {

    /**
     * Representation of RGBA colors.
     *
     * Each color component is a floating point value with a range from 0 to 1.
     *
     * You can also use the convenience method <% crosslink Fire.color Fire.color %> to create a new Color.
     *
     * @class Color
     * @extends ValueType
     * @constructor
     * @param {number} [r=0] - red component of the color
     * @param {number} [g=0] - green component of the color
     * @param {number} [b=0] - blue component of the color
     * @param {number} [a=1] - alpha component of the color
     */
    function Color( r, g, b, a ) {
        this.r = typeof r === 'number' ? r : 0.0;
        this.g = typeof g === 'number' ? g : 0.0;
        this.b = typeof b === 'number' ? b : 0.0;
        this.a = typeof a === 'number' ? a : 1.0;
    }
    JS.extend(Color, ValueType);
    Fire._fastDefine('Fire.Color', Color, ['r', 'g', 'b', 'a']);

    var DefaultColors = {
        // color: [r, g, b, a]
        /**
         * @property white
         * @type Color
         * @static
         */
        white:      [1, 1, 1, 1],
        /**
         * @property black
         * @type Color
         * @static
         */
        black:      [0, 0, 0, 1],
        /**
         * @property transparent
         * @type Color
         * @static
         */
        transparent:[0, 0, 0, 0],
        /**
         * @property gray
         * @type Color
         * @static
         */
        gray:       [0.5, 0.5, 0.5],
        /**
         * @property red
         * @type Color
         * @static
         */
        red:        [1, 0, 0],
        /**
         * @property green
         * @type Color
         * @static
         */
        green:      [0, 1, 0],
        /**
         * @property blue
         * @type Color
         * @static
         */
        blue:       [0, 0, 1],
        /**
         * @property yellow
         * @type Color
         * @static
         */
        yellow:     [1, 235/255, 4/255],
        /**
         * @property cyan
         * @type Color
         * @static
         */
        cyan:       [0, 1, 1],
        /**
         * @property magenta
         * @type Color
         * @static
         */
        magenta:    [1, 0, 1]
    };
    for (var colorName in DefaultColors) {
        var colorGetter = (function (r, g, b, a) {
            return function () {
                return new Color(r, g, b, a);
            };
        }).apply(null, DefaultColors[colorName]);
        Object.defineProperty(Color, colorName, { get: colorGetter });
    }

    /**
     * Clone a new color from the current color.
     * @method clone
     * @return {Color} Newly created color.
     */
    Color.prototype.clone = function () {
        return new Color(this.r, this.g, this.b, this.a);
    };

    /**
     * @method equals
     * @param {Color} other
     * @return {Boolean}
     */
    Color.prototype.equals = function (other) {
        return other &&
               this.r === other.r &&
               this.g === other.g &&
               this.b === other.b &&
               this.a === other.a;
    };

    /**
     * @method lerp
     * @param {Color} to
     * @param {number} ratio - the interpolation coefficient
     * @param {Color} [out] - optional, the receiving vector
     * @return {Color}
     */
    Color.prototype.lerp = function (to, ratio, out) {
        out = out || new Color();
        var r = this.r;
        var g = this.g;
        var b = this.b;
        var a = this.a;
        out.r = r + (to.r - r) * ratio;
        out.g = g + (to.g - g) * ratio;
        out.b = b + (to.b - b) * ratio;
        out.a = a + (to.a - a) * ratio;
        return out;
    };

    /**
     * @method toString
     * @return {string}
     */
    Color.prototype.toString = function () {
        return "rgba(" +
            this.r.toFixed(2) + ", " +
            this.g.toFixed(2) + ", " +
            this.b.toFixed(2) + ", " +
            this.a.toFixed(2) + ")"
        ;
    };

    /**
     * @method setR
     * @param {number} red - the new Red component
     * @return {Color} this color
     */
    Color.prototype.setR = function (red) {
        this.r = red;
        return this;
    };
    /**
     * @method setG
     * @param {number} green - the new Green component
     * @return {Color} this color
     */
    Color.prototype.setG = function (green) {
        this.g = green;
        return this;
    };
    /**
     * @method setB
     * @param {number} blue - the new Blue component
     * @return {Color} this color
     */
    Color.prototype.setB = function (blue) {
        this.b = blue;
        return this;
    };
    /**
     * @method setA
     * @param {number} alpha - the new Alpha component
     * @return {Color} this color
     */
    Color.prototype.setA = function (alpha) {
        this.a = alpha;
        return this;
    };

    /**
     * @method toCSS
     * @param {string} opt - "rgba", "rgb", "#rgb" or "#rrggbb"
     * @return {string}
     */
    Color.prototype.toCSS = function ( opt ) {
        if ( opt === 'rgba' ) {
            return "rgba(" +
                (this.r * 255 | 0 ) + "," +
                (this.g * 255 | 0 ) + "," +
                (this.b * 255 | 0 ) + "," +
                this.a.toFixed(2) + ")"
            ;
        }
        else if ( opt === 'rgb' ) {
            return "rgb(" +
                (this.r * 255 | 0 ) + "," +
                (this.g * 255 | 0 ) + "," +
                (this.b * 255 | 0 ) + ")"
            ;
        }
        else {
            return '#' + this.toHEX(opt);
        }
    };

    /**
     * Clamp this color to make all components between 0 to 1.
     * @method clamp
     */
    Color.prototype.clamp = function () {
        this.r = Math.clamp01(this.r);
        this.g = Math.clamp01(this.g);
        this.b = Math.clamp01(this.b);
        this.a = Math.clamp01(this.a);
    };

    /**
     * @method fromHEX
     * @param {string} hexString
     * @return {Color}
     * @chainable
     */
    Color.prototype.fromHEX = function (hexString) {
        var hex = parseInt(((hexString.indexOf('#') > -1) ? hexString.substring(1) : hexString), 16);
        this.r = (hex >> 16)/255;
        this.g = ((hex & 0x00FF00) >> 8)/255;
        this.b = ((hex & 0x0000FF))/255;
        return this;
    };

    /**
     * @method toHEX
     * @param {string} fmt - "#rgb" or "#rrggbb"
     * @return {string}
     */
    Color.prototype.toHEX = function ( fmt ) {
        var hex = [
            (this.r * 255 | 0 ).toString(16),
            (this.g * 255 | 0 ).toString(16),
            (this.b * 255 | 0 ).toString(16),
        ];
        var i = -1;
        if ( fmt === '#rgb' ) {
            for ( i = 0; i < hex.length; ++i ) {
                if ( hex[i].length > 1 ) {
                    hex[i] = hex[i][0];
                }
            }
        }
        else if ( fmt === '#rrggbb' ) {
            for ( i = 0; i < hex.length; ++i ) {
                if ( hex[i].length === 1 ) {
                    hex[i] = '0' + hex[i];
                }
            }
        }
        return hex.join('');
    };

    /**
     * Convert to 24bit rgb value
     * @method toRGBValue
     * @return {number}
     */
    Color.prototype.toRGBValue = function () {
        return (Math.clamp01(this.r) * 255 << 16) +
               (Math.clamp01(this.g) * 255 << 8) +
               (Math.clamp01(this.b) * 255);
    };

    /**
     * @method fromHSV
     * @param {number} h
     * @param {number} s
     * @param {number} v
     * @return {Color}
     * @chainable
     */
    Color.prototype.fromHSV = function ( h, s, v ) {
        var rgb = Fire.hsv2rgb( h, s, v );
        this.r = rgb.r;
        this.g = rgb.g;
        this.b = rgb.b;
        return this;
    };

    /**
     * @method toHSV
     * @return {object} - {h: number, s: number, v: number}
     */
    Color.prototype.toHSV = function () {
        return Fire.rgb2hsv( this.r, this.g, this.b );
    };

    return Color;
})();

Fire.Color = Color;

/**
 * The convenience method to create a new <% crosslink Fire.Color Color %>
 * @method color
 * @param {number} [r=0]
 * @param {number} [g=0]
 * @param {number} [b=0]
 * @param {number} [a=1]
 * @return {Color}
 */
Fire.color = function color (r, g, b, a) {
    if (Array.isArray(r)) {
        return new Color(r[0], r[1], r[2], r[3]);
    }
    else {
        return new Color(r, g, b, a);
    }
};

},{"../js":27,"./value-type":45}],42:[function(require,module,exports){
require('./vec2');
require('./rect');
require('./color');
require('./matrix23');

},{"./color":41,"./matrix23":43,"./rect":44,"./vec2":46}],43:[function(require,module,exports){
var ValueType = require('./value-type');
var JS = require('../js');

/**
 * Simple matrix to do 2D affine transformations.
 * It is actually 3x3 but the last row is [0 0 1].
 * @class Matrix23
 * @extends ValueType
 * @constructor
 */
var Matrix23 = function () {
    /**
     * @property a
     * @type {number}
     * @default 1
     */
    this.a = 1;

    /**
     * @property b
     * @type {number}
     * @default 0
     */
    this.b = 0;

    /**
     * @property c
     * @type {number}
     * @default 0
     */
    this.c = 0;

    /**
     * @property d
     * @type {number}
     * @default 1
     */
    this.d = 1;

    /**
     * @property tx
     * @type {number}
     * @default 0
     */
    this.tx = 0;

    /**
     * @property ty
     * @type {number}
     * @default 0
     */
    this.ty = 0;
};
JS.extend(Matrix23, ValueType);
Fire._fastDefine('Fire.Matrix23', Matrix23, ['a', 'b', 'c', 'd', 'tx', 'ty']);
Fire.Matrix23 = Matrix23;

/**
 * @property identity
 * @type {Matrix23}
 * @static
 */
Matrix23.identity = new Matrix23();

/**
 * @method clone
 * @return {Matrix23}
 */
Matrix23.prototype.clone = function () {
    var mat = new Matrix23();
    mat.a = this.a;
    mat.b = this.b;
    mat.c = this.c;
    mat.d = this.d;
    mat.tx = this.tx;
    mat.ty = this.ty;
    return mat;
};

/**
 * @method clone
 * @param {Matrix23} other
 * @return {Matrix23}
 * @chainable
 */
Matrix23.prototype.set = function (other) {
    this.a = other.a;
    this.b = other.b;
    this.c = other.c;
    this.d = other.d;
    this.tx = other.tx;
    this.ty = other.ty;
    return this;
};

/**
 * @method equals
 * @param {Matrix23} other
 * @return {Boolean}
 */
Matrix23.prototype.equals = function (other) {
    return other &&
           this.a === other.a &&
           this.b === other.b &&
           this.c === other.c &&
           this.d === other.d &&
           this.tx === other.tx &&
           this.ty === other.ty;
};

/**
 * @method toString
 * @return {string}
 */
Matrix23.prototype.toString = function () {
    return '|' + this.a.toFixed(2) + ' ' + this.c.toFixed(2) + ' ' + this.tx.toFixed(2) +
        '|\n|' + this.b.toFixed(2) + ' ' + this.d.toFixed(2) + ' ' + this.ty.toFixed(2) +
        '|\n|0.00 0.00 1.00|';
};

/**
 * Reset this matrix to identity.
 * @method identity
 * @return {Matrix23}
 * @chainable
 */
Matrix23.prototype.identity = function () {
    this.a = 1;
    this.b = 0;
    this.c = 0;
    this.d = 1;
    this.tx = 0;
    this.ty = 0;
    return this;
};

/**
 * Prepend this matrix.
 * @method prepend
 * @param {Matrix23} other
 * @return {Matrix23}
 * @chainable
 */
Matrix23.prototype.prepend = function (other) {
    var a = other.a;
    var b = other.b;
    var c = other.c;
    var d = other.d;
    if (a !== 1 || b !== 0 || c !== 0 || d !== 1) {
        var oa = this.a;
        var oc = this.c;
        this.a = oa * a + this.b * c;
        this.b = oa * b + this.b * d;
        this.c = oc * a + this.d * c;
        this.d = oc * b + this.d * d;
        var otx = this.tx;
        this.tx = otx * a + this.ty * c + other.tx;
        this.ty = otx * b + this.ty * d + other.ty;
    }
    else {
        this.tx += other.tx;
        this.ty += other.ty;
    }
    return this;
};

/**
 * Invert this matrix.
 * @method invert
 * @return {Matrix23}
 * @chainable
 */
Matrix23.prototype.invert = function () {
    var a = this.a;
    var b = this.b;
    var c = this.c;
    var d = this.d;
    var tx = this.tx;
    var determinant = 1 / (a * d - b * c);
    this.a = d * determinant;
    this.b = -b * determinant;
    this.c = -c * determinant;
    this.d = a * determinant;
    this.tx = (c * this.ty - d * tx) * determinant;
    this.ty = (b * tx - a * this.ty) * determinant;
    return this;
};

/**
 * Apply transforms to given vector
 * @method transformPoint
 * @param {Vec2} vector
 * @param {Vec2} [out] - optional, the receiving vector
 * @return {Vec2} the result
 */
Matrix23.prototype.transformPoint = function (vector, out) {
    out = out || new Vec2();
    var x = vector.x;   // vector may === out
    out.x = this.a * x + this.c * vector.y + this.tx;
    out.y = this.b * x + this.d * vector.y + this.ty;
    return out;
};

//Matrix23.prototype.transformPointXY = function (x, y, out) {
//    out = out || new Vec2();
//    out.x = this.a * x + this.c * y + this.tx;
//    out.y = this.b * x + this.d * y + this.ty;
//    return out;
//};

/**
 * Get scaling of this matrix.
 *
 * NOTE: negative scaling (mirroring) is not supported
 * @method getScale
 * @param {Vec2} [out] - optional, the receiving vector
 * @return {Vec2} the result
 */
Matrix23.prototype.getScale = function (out) {
    out = out || new Vec2();
    out.x = Math.sqrt(this.a * this.a + this.b * this.b);
    out.y = Math.sqrt(this.c * this.c + this.d * this.d);
    return out;
};

/**
 * Extract translation, rotation and scaling component from this matrix.
 * Only support negative(mirroring) scaling in some special case.
 *
 * @method getTRS
 * @return {object} {translation: Vec2, rotation: number, scale: Vec2}
 */
Matrix23.prototype.getTRS = function () {
    var r = 0;
    var s = this.getScale();
    var mirrored = this.a !== 0 && this.a === -this.d && this.b === 0 && this.c === 0;
    if (mirrored) {
        if (this.a < 0) {
            s.x = -s.x;
        }
        else {
            s.y = -s.y;
        }
    }
    else {
        r = this.getRotation();
    }
    return {
        translation: new Fire.Vec2(this.tx, this.ty),
        rotation: r,
        scale: s
    };
};

/**
 * Set scaling of this matrix.
 *
 * NOTE: Can not scale negative scaling (mirroring) and zero scaling matrix.
 * @method setScale
 * @param {Vec2} scale
 * @return {Matrix23}
 * @chainable
 */
Matrix23.prototype.setScale = function (scale) {
    var s = this.getScale();
    var x = scale.x / s.x;
    var y = scale.y / s.y;
    this.a *= x;
    this.b *= x;
    this.c *= y;
    this.d *= y;
    return this;
};

/**
 * Get rotation of this matrix.
 * @method getRotation
 * @return {number}
 */
Matrix23.prototype.getRotation = function () {
    var hasSkew = this.b / this.a !== -this.c / this.d;
    if ( !hasSkew ) {
        return Math.atan2(-this.c, this.d);
    }
    else {
        return (Math.atan2(this.b, this.a) + Math.atan2(-this.c, this.d)) * 0.5;
    }
};

/**
 * Get translation of this matrix.
 * @method getTranslation
 * @return {Vec2}
 */
Matrix23.prototype.getTranslation = function (out) {
    out = out || new Vec2();
    out.x = this.tx;
    out.y = this.ty;
    return out;
};

/**
 * Rotate this matrix by counterclockwise.
 * @method rotate
 * @param {number} radians
 * @return {Matrix23}
 * @chainable
 */
Matrix23.prototype.rotate = function (radians) {
    var sin = Math.sin(radians);
    var cos = Math.cos(radians);
    var a = this.a;
    var b = this.b;
    this.a = (a * cos + this.c * sin);
    this.b = (b * cos + this.d * sin);
    this.c = (this.c * cos - a * sin);
    this.d = (this.d * cos - b * sin);
    return this;
};

/*
Matrix23.prototype.translate = function (x, y) {
    this.tx += x;
    this.ty += y;
};

Matrix23.prototype.scale = function (x, y) {
    this.a *= x;
    this.b *= x;
    this.c *= y;
    this.d *= y;
    this.tx *= x;
    this.ty *= y;
    return this;
};
*/

},{"../js":27,"./value-type":45}],44:[function(require,module,exports){
var ValueType = require('./value-type');
var JS = require('../js');

var Rect = (function () {
    /**
     * A 2D rectangle defined by x, y position and width, height.
     *
     * see {% crosslink Fire.rect Fire.rect %}
     *
     * @class Rect
     * @extends ValueType
     * @constructor
     * @param {number} [x=0]
     * @param {number} [y=0]
     * @param {number} [w=0]
     * @param {number} [h=0]
     */
    function Rect( x, y, w, h ) {
        this.x = typeof x === 'number' ? x : 0.0;
        this.y = typeof y === 'number' ? y : 0.0;
        this.width = typeof w === 'number' ? w : 0.0;
        this.height = typeof h === 'number' ? h : 0.0;
    }
    JS.extend(Rect, ValueType);
    Fire._fastDefine('Fire.Rect', Rect, ['x', 'y', 'width', 'height']);

    /**
     * Creates a rectangle from two coordinate values.
     * @static
     * @method fromMinMax
     * @param {Vec2} v1
     * @param {Vec2} v2
     * @return {Rect}
     */
    Rect.fromMinMax = function ( v1, v2 ) {
        var min_x = Math.min( v1.x, v2.x );
        var min_y = Math.min( v1.y, v2.y );
        var max_x = Math.max( v1.x, v2.x );
        var max_y = Math.max( v1.y, v2.y );

        return new Rect ( min_x, min_y, max_x - min_x, max_y - min_y );
    };

    /**
     * Creates a rectangle from left-top coordinate value and size.
     * @static
     * @method fromVec2
     * @param {Vec2} leftTop
     * @param {Vec2} size
     * @return {Rect}
     */
    Rect.fromVec2 = function ( leftTop, size ) {
        return new Rect ( leftTop.x, leftTop.y, size.x, size.y );
    };

    /**
     * Checks if rect contains
     * @static
     * @method contain
     * @param a {Rect} Rect a
     * @param b {Rect} Rect b
     * @return {Number} The contains result, 1 is a contains b, -1 is b contains a, 0 is no contains
     */
    Rect.contain = function _Contain ( a, b ) {
        if ( a.x <= b.x &&
             a.x + a.width >= b.x + b.width &&
             a.y <= b.y &&
             a.y + a.height >= b.y + b.height )
        {
            // a contains b
            return 1;
        }
        if ( b.x <= a.x &&
             b.x + b.width >= a.x + a.width &&
             b.y <= a.y &&
             b.y + b.height >= a.y + a.height )
        {
            // b contains a
            return -1;
        }
        return 0;
    };

    /**
     * @method clone
     * @return {Rect}
     */
    Rect.prototype.clone = function () {
        return new Rect(this.x, this.y, this.width, this.height);
    };

    /**
     * @method equals
     * @param {Rect} other
     * @return {Boolean}
     */
    Rect.prototype.equals = function (other) {
        return other &&
               this.x === other.x &&
               this.y === other.y &&
               this.width === other.width &&
               this.height === other.height;
    };

    /**
     * @method lerp
     * @param {Rect} to
     * @param {number} ratio - the interpolation coefficient
     * @param {Rect} [out] - optional, the receiving vector
     * @return {Rect}
     */
    Rect.prototype.lerp = function (to, ratio, out) {
        out = out || new Rect();
        var x = this.x;
        var y = this.y;
        var width = this.width;
        var height = this.height;
        out.x = x + (to.x - x) * ratio;
        out.y = y + (to.y - y) * ratio;
        out.width = width + (to.width - width) * ratio;
        out.height = height + (to.height - height) * ratio;
        return out;
    };

    /**
     * @method toString
     * @return {string}
     */
    Rect.prototype.toString = function () {
        return '(' + this.x.toFixed(2) + ', ' + this.y.toFixed(2) + ', ' + this.width.toFixed(2) +
               ', ' + this.height.toFixed(2) + ')';
    };

    /**
     * @property xMin
     * @type number
     */
    Object.defineProperty(Rect.prototype, 'xMin', {
        get: function () { return this.x; },
        set: function (value) {
            this.width += this.x - value;
            this.x = value;
        }
    });

    /**
     * @property yMin
     * @type number
     */
    Object.defineProperty(Rect.prototype, 'yMin', {
        get: function () { return this.y; },
        set: function (value) {
            this.height += this.y - value;
            this.y = value;
        }
    });

    /**
     * @property xMax
     * @type number
     */
    Object.defineProperty(Rect.prototype, 'xMax', {
        get: function () { return this.x + this.width; },
        set: function (value) { this.width = value - this.x; }
    });

    /**
     * @property yMax
     * @type number
     */
    Object.defineProperty(Rect.prototype, 'yMax', {
        get: function () { return this.y + this.height; },
        set: function (value) { this.height = value - this.y; }
    });

    /**
     * @property center
     * @type number
     */
    Object.defineProperty(Rect.prototype, 'center', {
        get: function () {
            return new Fire.Vec2( this.x + this.width * 0.5,
                                  this.y + this.height * 0.5 );
        },
        set: function (value) {
            this.x = value.x - this.width * 0.5;
            this.y = value.y - this.height * 0.5;
        }
    });

    /**
     * @property size
     * @type {Vec2}
     */
    Object.defineProperty(Rect.prototype, 'size', {
        get: function () {
            return new Fire.Vec2(this.width, this.height);
        },
        set: function (value) {
            this.width = value.x;
            this.height = value.y;
        }
    });

    /**
     * @method intersects
     * @param {Rect} rect
     * @type {Boolean}
     */
    Rect.prototype.intersects = function ( rect ) {
        return Fire.Intersection.rectRect( this, rect );
    };

    /**
     * Returns true if the point inside this rectangle.
     * @method contains
     * @param {Vec2} point
     * @type {Boolean}
     */
    Rect.prototype.contains = function ( point ) {
        if ( this.x <= point.x &&
             this.x + this.width >= point.x &&
             this.y <= point.y &&
             this.y + this.height >= point.y )
        {
            return true;
        }
        return false;
    };

    /**
     * Returns true if the other rect totally inside this rectangle.
     * @method containsRect
     * @param {Rect} rect
     * @type {Boolean}
     */
    Rect.prototype.containsRect = function ( rect ) {
        if ( this.x <= rect.x &&
             this.x + this.width >= rect.x + rect.width &&
             this.y <= rect.y &&
             this.y + this.height >= rect.y + rect.height )
        {
            return true;
        }
        return false;
    };

    return Rect;
})();

Fire.Rect = Rect;

/**
 * @module Fire
 */
/**
 * The convenience method to create a new Rect
 * @method rect
 * @param {number} [x=0]
 * @param {number} [y=0]
 * @param {number} [w=0]
 * @param {number} [h=0]
 * @return {Rect}
 */
Fire.rect = function rect (x, y, w, h) {
    if (Array.isArray(x)) {
        return new Rect(x[0], x[1], x[2], x[3]);
    }
    else {
        return new Rect(x, y, w, h);
    }
};

},{"../js":27,"./value-type":45}],45:[function(require,module,exports){
var JS = require('../js');

/**
 * The base class of all value types.
 * @class ValueType
 * @constructor
 */
function ValueType () {}
JS.setClassName('Fire.ValueType', ValueType);

JS.mixin(ValueType.prototype, {
    /**
     * !#en This method returns an exact copy of current value.
     * !#zh 克隆当前值，该方法返回一个新对象，新对象的值和原对象相等。
     * @method clone
     * @return {ValueType}
     */
    clone: function () {
        Fire.error("%.clone not yet implemented.", JS.getClassName(this));
        return null;
    },

    /**
     * Compares this object with the other one.
     * @method equals
     * @param {ValueType} other
     * @return {Boolean}
     */
    equals: function (other) {
        Fire.error("%.equals not yet implemented.", JS.getClassName(this));
        return false;
    },

    /**
     * @method toString
     * @return {string}
     */
    toString: function () {
        return '[object Object]';
    },

    /**
     * Linearly interpolates between this value to to value by ratio which is in the range [0, 1].
     * When ratio = 0 returns this. When ratio = 1 return to. When ratio = 0.5 returns the average of this and to.
     * @method lerp
     * @param {ValueType} to - the to value
     * @param {number} ratio - the interpolation coefficient
     * @return {ValueType}
     */
    lerp: function (to, ratio) {
        return this.clone();
    }
});

Fire.ValueType = ValueType;

Fire.isValueType = function (type) {
    return type instanceof ValueType;
};

module.exports = ValueType;

},{"../js":27}],46:[function(require,module,exports){
var ValueType = require('./value-type');
var JS = require('../js');

/**
 * Representation of 2D vectors and points.
 *
 * see {% crosslink Fire.v2 Fire.v2 %}
 * @class Vec2
 * @extends ValueType
 * @constructor
 * @param {number} [x=0]
 * @param {number} [y=0]
 */
function Vec2 (x, y) {
    this.x = (typeof x === 'number' ? x : 0.0);
    this.y = (typeof y === 'number' ? y : 0.0);
}
JS.extend(Vec2, ValueType);
Fire._fastDefine('Fire.Vec2', Vec2, ['x', 'y']);

JS.mixin(Vec2.prototype, {

    /**
     * !#en clone a Vec2 value
     * !#zh 克隆一个 Vec2 值
     * @method clone
     * @return {Vec2}
     */
    clone: function () {
        return new Vec2(this.x, this.y);
    },

    /**
     * @method set
     * @param {Vec2} newValue - !#en new value to set. !#zh 要设置的新值
     * @return {Vec2} returns this
     * @chainable
     */
    set: function (newValue) {
        this.x = newValue.x;
        this.y = newValue.y;
        return this;
    },

    /**
     * @method equals
     * @param {Vec2} other
     * @return {Boolean}
     */
    equals: function (other) {
        return other && this.x === other.x && this.y === other.y;
    },

    /**
     * @method toString
     * @return {string}
     */
    toString: function () {
        return "(" +
               this.x.toFixed(2) + ", " +
               this.y.toFixed(2) + ")"
            ;
    },

    /**
     * @method lerp
     * @param {Vec2} to
     * @param {number} ratio - the interpolation coefficient
     * @param {Vec2} [out] - optional, the receiving vector
     * @return {Vec2}
     */
    lerp: function (to, ratio, out) {
        out = out || new Vec2();
        var x = this.x;
        var y = this.y;
        out.x = x + (to.x - x) * ratio;
        out.y = y + (to.y - y) * ratio;
        return out;
    },

    /**
     * Adds this vector. If you want to save result to another vector, use add() instead.
     * @method addSelf
     * @param {Vec2} vector
     * @return {Vec2} returns this
     * @chainable
     */
    addSelf: function (vector) {
        this.x += vector.x;
        this.y += vector.y;
        return this;
    },

    /**
     * Adds tow vectors, and returns the new result.
     * @method add
     * @param {Vec2} vector
     * @param {Vec2} [out] - optional, the receiving vector
     * @return {Vec2} the result
     */
    add: function (vector, out) {
        out = out || new Vec2();
        out.x = this.x + vector.x;
        out.y = this.y + vector.y;
        return out;
    },

    /**
     * Subtracts one vector from this. If you want to save result to another vector, use sub() instead.
     * @method subSelf
     * @param {Vec2} vector
     * @return {Vec2} returns this
     * @chainable
     */
    subSelf: function (vector) {
        this.x -= vector.x;
        this.y -= vector.y;
        return this;
    },

    /**
     * Subtracts one vector from this, and returns the new result.
     * @method sub
     * @param {Vec2} vector
     * @param {Vec2} [out] - optional, the receiving vector
     * @return {Vec2} the result
     */
    sub: function (vector, out) {
        out = out || new Vec2();
        out.x = this.x - vector.x;
        out.y = this.y - vector.y;
        return out;
    },

    /**
     * Multiplies this by a number. If you want to save result to another vector, use mul() instead.
     * @method mulSelf
     * @param {number} num
     * @return {Vec2} returns this
     * @chainable
     */
    mulSelf: function (num) {
        this.x *= num;
        this.y *= num;
        return this;
    },

    /**
     * Multiplies by a number, and returns the new result.
     * @method mul
     * @param {number} num
     * @param {Vec2} [out] - optional, the receiving vector
     * @return {Vec2} the result
     */
    mul: function (num, out) {
        out = out || new Vec2();
        out.x = this.x * num;
        out.y = this.y * num;
        return out;
    },

    /**
     * Multiplies two vectors.
     * @method scaleSelf
     * @param {Vec2} vector
     * @return {Vec2} returns this
     * @chainable
     */
    scaleSelf: function (vector) {
        this.x *= vector.x;
        this.y *= vector.y;
        return this;
    },

    /**
     * Multiplies two vectors, and returns the new result.
     * @method scale
     * @param {Vec2} vector
     * @param {Vec2} [out] - optional, the receiving vector
     * @return {Vec2} the result
     */
    scale: function (vector, out) {
        out = out || new Vec2();
        out.x = this.x * vector.x;
        out.y = this.y * vector.y;
        return out;
    },

    /**
     * Divides two vectors. If you want to save result to another vector, use div() instead.
     * @method divSelf
     * @param {Vec2} vector
     * @return {Vec2} returns this
     * @chainable
     */
    divSelf: function (vector) {
        this.x /= vector.x;
        this.y /= vector.y;
        return this;
    },

    /**
     * Divides two vectors, and returns the new result.
     * @method div
     * @param {Vec2} vector
     * @param {Vec2} [out] - optional, the receiving vector
     * @return {Vec2} the result
     */
    div: function (vector, out) {
        out = out || new Vec2();
        out.x = this.x / vector.x;
        out.y = this.y / vector.y;
        return out;
    },

    /**
     * Negates the components. If you want to save result to another vector, use neg() instead.
     * @method negSelf
     * @return {Vec2} returns this
     * @chainable
     */
    negSelf: function () {
        this.x = -this.x;
        this.y = -this.y;
        return this;
    },

    /**
     * Negates the components, and returns the new result.
     * @method neg
     * @param {Vec2} [out] - optional, the receiving vector
     * @return {Vec2} the result
     */
    neg: function (out) {
        out = out || new Vec2();
        out.x = -this.x;
        out.y = -this.y;
        return out;
    },

    /**
     * Dot product
     * @method dot
     * @param {Vec2} [vector]
     * @return {number} the result
     */
    dot: function (vector) {
        return this.x * vector.x + this.y * vector.y;
    },

    /**
     * Cross product
     * @method cross
     * @param {Vec2} [vector]
     * @return {number} the result
     */
    cross: function (vector) {
        return this.y * vector.x - this.x * vector.y;
    },

    /**
     * Returns the length of this vector.
     * @method mag
     * @return {number} the result
     */
    mag: function () {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    },

    /**
     * Returns the squared length of this vector.
     * @method magSqr
     * @return {number} the result
     */
    magSqr: function () {
        return this.x * this.x + this.y * this.y;
    },

    /**
     * Make the length of this vector to 1.
     * @method normalizeSelf
     * @return {Vec2} returns this
     * @chainable
     */
    normalizeSelf: function () {
        var magSqr = this.x * this.x + this.y * this.y;
        if (magSqr === 1.0)
            return this;

        if (magSqr === 0.0) {
            console.warn("Can't normalize zero vector");
            return this;
        }

        var invsqrt = 1.0 / Math.sqrt(magSqr);
        this.x *= invsqrt;
        this.y *= invsqrt;

        return this;
    },

    /**
     * Returns this vector with a magnitude of 1.
     *
     * Note that the current vector is unchanged and a new normalized vector is returned. If you want to normalize the current vector, use normalizeSelf function.
     * @method normalize
     * @param {Vec2} [out] - optional, the receiving vector
     * @return {Vec2} result
     */
    normalize: function (out) {
        out = out || new Vec2();
        out.x = this.x;
        out.y = this.y;
        out.normalizeSelf();
        return out;
    },

    /**
     * Get angle in radian between this and vector
     * @method angle
     * @param {Vec2} vector
     * @return {number} from 0 to Math.PI
     */
    angle: function (vector) {
        var magSqr1 = this.magSqr();
        var magSqr2 = vector.magSqr();

        if (magSqr1 === 0 || magSqr2 === 0) {
            console.warn("Can't get angle between zero vector");
            return 0.0;
        }

        var dot = this.dot(vector);
        var theta = dot / (Math.sqrt(magSqr1 * magSqr2));
        theta = Math.clamp(theta, -1.0, 1.0);
        return Math.acos(theta);
    },

    /**
     * Get angle in radian between this and vector with direction
     * @method signAngle
     * @param {Vec2} vector
     * @return {number} from -MathPI to Math.PI
     */
    signAngle: function (vector) {
        // NOTE: this algorithm will return 0.0 without signed if vectors are parallex
        // var angle = this.angle(vector);
        // var cross = this.cross(vector);
        // return Math.sign(cross) * angle;

        return Math.atan2(this.y, this.x) - Math.atan2(vector.y, vector.x);
    },

    /**
     * rotate
     * @method rotate
     * @param {number} radians
     * @param {Vec2} [out] - optional, the receiving vector
     * @return {Vec2} the result
     */
    rotate: function (radians, out) {
        out = out || new Vec2();
        out.x = this.x;
        out.y = this.y;
        return out.rotateSelf(radians);
    },

    /**
     * rotate self
     * @method rotateSelf
     * @param {number} radians
     * @return {Vec2} returns this
     * @chainable
     */
    rotateSelf: function (radians) {
        var sin = Math.sin(radians);
        var cos = Math.cos(radians);
        var x = this.x;
        this.x = cos * x - sin * this.y;
        this.y = sin * x + cos * this.y;
        return this;
    }

    //_serialize: function () {
    //    return [this.x, this.y];
    //},
    //_deserialize: function (data) {
    //    this.x = data[0];
    //    this.y = data[1];
    //}
});

// static

/**
 * return a Vec2 object with x = 1 and y = 1
 * @property one
 * @type Vec2
 * @static
 */
JS.get(Vec2, 'one', function () {
    return new Vec2(1.0, 1.0);
});

/**
 * return a Vec2 object with x = 0 and y = 0
 * @property zero
 * @type Vec2
 * @static
 */
JS.get(Vec2, 'zero', function () {
    return new Vec2(0.0, 0.0);
});

/**
 * return a Vec2 object with x = 0 and y = 1
 * @property up
 * @type Vec2
 * @static
 */
JS.get(Vec2, 'up', function () {
    return new Vec2(0.0, 1.0);
});

/**
 * return a Vec2 object with x = 1 and y = 0
 * @property right
 * @type Vec2
 * @static
 */
JS.get(Vec2, 'right', function () {
    return new Vec2(1.0, 0.0);
});

Fire.Vec2 = Vec2;

/**
 * @module Fire
 */
/**
 * The convenience method to create a new {% crosslink Vec2 Vec2 %}
 * @method v2
 * @param {number} [x=0]
 * @param {number} [y=0]
 * @return {Vec2}
 */
Fire.v2 = function v2 (x, y) {
    if (Array.isArray(x)) {
        return new Vec2(x[0], x[1]);
    }
    else {
        return new Vec2(x, y);
    }
};

},{"../js":27,"./value-type":45}],47:[function(require,module,exports){
/**
 * @module Fire
 */

var getChildrenN = function (node) {
    var wrapper = Fire(node);
    var childrenN = wrapper.childrenN;
    if (wrapper.constructor.canHaveChildrenInEditor) {
        return {
            name: wrapper.name,
            id: wrapper.uuid,
            children: childrenN.length > 0 ? childrenN.map(getChildrenN) : null
        };
    }
    else {
        return {
            name: wrapper.name,
            id: wrapper.uuid,
            children: [],
            canHaveChildren: false
        };
    }
};

/**
 * @method getHierarchyDump
 * @return {object[]}
 */
Editor.getHierarchyDump = function () {
    var root = Fire.engine.getCurrentSceneN();
    var children = Fire(root).childrenN;
    return children.map(getChildrenN);
};

module.exports = Editor.getHierarchyDump;

},{}],48:[function(require,module,exports){
//var _isDomNode = require('../core/utils').isDomNode;
var JS = Fire.JS;

/**
 * @module Editor
 */

function getTypeId (obj) {
    if (typeof obj === 'object') {
        obj = obj.constructor;
    }
    return JS.getClassName(obj);
}

function dumpAttrs (types, data, attrs) {
    var ctor = attrs.ctor;
    if (ctor) {
        var type = getTypeId(ctor);
        data.type = type;
        if (!types[type]) {
            var isAssetType = Fire.isChildClassOf(ctor, Fire.Asset);
            var isNodeType = Fire.isChildClassOf(ctor, Fire.Runtime.NodeWrapper);
            if (isAssetType || isNodeType) {
                dumpInheritanceChain(types, ctor, type);
            }
            else {
                dumpType(types, ctor, type);
            }
        }
    }
    else if (attrs.type) {
        data.type = attrs.type;
    }

    if (attrs.readonly) {
        data.readonly = attrs.readonly;
    }

    if (attrs.hasOwnProperty('default')) {
        data.default = attrs.default;
    }
    else if (attrs.hasSetter === false) {
        data.readonly = false;
    }

    if (attrs.hasOwnProperty('visible')) {
        data.visible = attrs.visible;
    }
    if (attrs.enumList) {
        data.enumList = attrs.enumList;
    }
    if (attrs.hasOwnProperty('displayName')) {
        data.displayName = attrs.displayName;
    }
    if (attrs.hasOwnProperty('multiline')) {
        data.multiline = attrs.multiline;
    }
    if (attrs.hasOwnProperty('min')) {
        data.min = attrs.min;
    }
    if (attrs.hasOwnProperty('max')) {
        data.max = attrs.max;
    }
    if (attrs.nullable) {
        // {String} - the property name of boolean value
        data.nullable = attrs.nullable;
    }
    if (attrs.tooltip) {
        data.tooltip = attrs.tooltip;
    }
}

function getInheritanceChain (klass) {
    var chain = [];
    var typeId;

    // fireclass
    var superCls = klass;
    for (;;) {
        if (superCls !== klass) {
            typeId = getTypeId(superCls);
            if (typeId) {
                chain.push(typeId);
            }
        }
        if (superCls.$super) {
            superCls = superCls.$super;
        }
        else {
            break;
        }
    }
    // js class
    var dunderProto = Object.getPrototypeOf(superCls.prototype);
    while (dunderProto) {
        superCls = dunderProto.constructor;
        if (superCls && superCls !== klass) {
            typeId = getTypeId(superCls);
            if (typeId) {
                chain.push(typeId);
            }
        }
        dunderProto = Object.getPrototypeOf(superCls.prototype);
    }
    return chain;
}

// assert(obj)
function dumpType (types, objOrClass, typeId) {
    var klass;
    if (typeof objOrClass === 'object') {
        var isEnum = Fire.isEnumType(objOrClass);
        if (isEnum) {
            // dump Enum
            var enumList = Fire.getEnumList(objOrClass);
            return enumList;
        }
        else {
            klass = objOrClass.constructor;
        }
    }
    else {
        klass = objOrClass;
    }

    var type = {};
    types[typeId] = type;

    // dump FireClass
    if (klass) {
        // TODO - cache in klass
        var chain = getInheritanceChain(klass);
        if (chain.length > 0) {
            type.extends = chain;
        }
        // dump props
        var propNames = klass.__props__;
        if (propNames) {
            var properties = {};
            for (var p = 0; p < propNames.length; p++) {
                var propName = propNames[p];
                var dumpProp = {};
                // dump inspector attrs
                var attrs = Fire.attr(klass, propName);
                if (attrs) {
                    dumpAttrs(types, dumpProp, attrs);
                }
                properties[propName] = dumpProp;
            }
            type.properties = properties;
        }
    }
}

function dumpInheritanceChain (types, klass, typeId) {
    var type = {};
    var chain = getInheritanceChain(klass);
    if (chain.length > 0) {
        type.extends = chain;
    }
    types[typeId] = type;
}

function getExpectedTypeInClassDef (types, klass, propName) {
    var typeId = getTypeId(klass);
    if (typeId) {
        var typeInfo = types[typeId];
        if (typeInfo) {
            return typeInfo.properties[propName].type;
        }
    }
}

function dumpObject (types, obj, expectedType) {
    if (!obj) {
        return null;
    }
    var attrType, actualType;
    var ctor = obj.constructor;
    if (obj instanceof FObject) {
        // FObject
        if ( !obj.isValid ) {
            return null;
        }
        var uuid = obj._uuid;
        if (uuid) {
            // Asset
            actualType = getTypeId(obj);
            if (expectedType !== actualType) {
                if (!types[actualType]) {
                    dumpInheritanceChain(types, ctor, actualType);
                }
                return {
                    __type__: actualType,
                    uuid: uuid
                };
            }
            else {
                return {
                    uuid: uuid
                };
            }
        }

        if (obj instanceof Fire.Runtime.NodeWrapper) {
            actualType = getTypeId(obj);
            if (expectedType !== actualType) {
                if (!types[actualType]) {
                    dumpInheritanceChain(types, ctor, actualType);
                }
                return {
                    __type__: actualType,
                    uuid: obj.uuid
                };
            }
            else {
                return {
                    uuid: obj.uuid
                };
            }
        }
    }
    else if (obj instanceof Fire.ValueType) {
        var res = Editor.serialize(obj, {stringify: false});
        if (!types[res.__type__]) {
            dumpInheritanceChain(types, ctor, res.__type__);
        }
        return res;
    }

    if (Fire._isFireClass(ctor)) {
        var data = {};
        actualType = getTypeId(obj);
        if (expectedType !== actualType) {
            if (!types[actualType]) {
                dumpType(types, ctor, actualType);
            }
            data.__type__ = actualType;
        }
        // TODO - 如果嵌套怎么办？考虑在下面这次 dumpByClass 时，只支持值类型。
        dumpByClass(types, data, obj, ctor);
        return data;
    }
    // TODO - 支持数组和表

    return null;
}

function dumpField (types, val, klass, propName) {
    if (val == null || typeof val === 'string') {
        var attr = Fire.attr(klass, propName);
        var type = attr && /*attr.type === 'Object' &&*/ attr.ctor;
        if (type && typeof type === 'function' && Fire.isChildClassOf(type, Fire.Asset)) {
            if (attr.saveUrlAsAsset) {
                // is url adapter
                return {
                    uuid: (val && Fire.Asset.urlToUuid(val)) || ''
                };
            }
            //else {
            //    return {
            //        uuid: val
            //    }
            //}
        }
    }
    if (typeof val === 'object') {
        var expectedType = getExpectedTypeInClassDef(types, klass, propName);
        return dumpObject(types, val, expectedType);
    }
    else if (typeof val !== 'function') {
        return val;
    }
    else {
        // function
        return null;
    }
}

function dumpByClass (types, data, obj, klass) {
    var props = klass.__props__;
    if (props) {
        for (var p = 0; p < props.length; p++) {
            var propName = props[p];
            data[propName] = dumpField(types, obj[propName], klass, propName);
        }
    }
}

// assert(obj && typeof obj === 'object')
function dumpMain (types, wrapper) {
    var data = {};

    // dump main type
    var typeId = getTypeId(wrapper);
    if (typeId) {
        data.__type__ = typeId;
        dumpType(types, wrapper, typeId);
    }

    // dump wrapper values
    dumpByClass(types, data, wrapper, wrapper.constructor);

    // iterate mixins
    var mixinClasses = wrapper.targetN._mixinClasses;
    if (mixinClasses) {
        data.__mixins__ = [];
        for (var i = 0; i < mixinClasses.length; i++) {
            var klass = mixinClasses[i];
            typeId = getTypeId(klass);
            if (typeId) {
                dumpType(types, klass, typeId);
                var mixinData = {
                    __type__: typeId
                };

                // dump mixin values
                dumpByClass(types, mixinData, wrapper.targetN, klass);

                data.__mixins__.push(mixinData);
            }
        }
    }

    return data;
}

/**
 * Take a snapshot on node for inspector.
 * @method getNodeDump
 * @param {RuntimeNode}
 * @return {object} - returns a json object such like:
 * ```
 *  {
 *      types: {
 *          type1: {
 *              extends: ["type_base", "object"]
 *              properties: {
 *                  key1: {
 *                      default: 0,
 *                      type: 'Integer' // ["Integer"|"Float"|"String"|"Boolean"|"Object"|"Enum"|"Script"]
 *                  }
 *              }
 *          },
 *          mixin1: {
 *              properties: {
 *                  key2: {
 *                      default: 0,
 *                      type: 'Integer'
 *                  },
 *                  asset: {
 *                      __type__: 'Fire.Texture',
 *                      uuid: 'uuid'
 *                  },
 *                  node: {
 *                      __type__: 'Runtime.NodeWrapper',
 *                      id: 'id'
 *                  }
 *              }
 *          }
 *      },
 *      value: {
 *          __type__: 'type1',
 *          key1: value1,
 *
 *          __mixins__: [{
 *              __type__: 'mixin1',
 *              key2: value2,
 *          }],
 *      }
 *  }
 * ```
 */
Editor.getNodeDump = function (node) {
    var types = {};

    if (!node) {
        return {
            types: types,
            value: null
        };
    }

    var wrapper = Fire(node);
    var value = dumpMain(types, wrapper);

    return {
        types: types,
        value: value
    };
};

module.exports = Editor.getNodeDump;

// for unit tests
Editor.getNodeDump.getInheritanceChain = getInheritanceChain;

},{}],49:[function(require,module,exports){
var root = typeof global !== 'undefined' ? global : window;

/**
 * Global object with classes, properties and methods you can access in fireball editor.
 *
 * @module Editor
 * @main Editor
 */

if (!root.Editor) {
    // Always export Editor globally.
    root.Editor = {};
}

//// extends engine
//require('./extends/runtime');

require('./serialize');
require('./get-node-dump');
require('./get-hierarchy-dump');
require('./set-property-by-path');
require('./utils');

if (!FIRE_TEST) {
    // redirect log methods to fireball console
    Fire.log = Editor.log;
    Fire.info = Editor.info;
    Fire.warn = Editor.warn;
    Fire.error = Editor.error;
}

if (Editor.isCoreLevel) {
    // declare global variables that can be accessed remotely in page-level
    Editor.nodeCreateMenu = null;
}

module.exports = Editor;

},{"./get-hierarchy-dump":47,"./get-node-dump":48,"./serialize":51,"./set-property-by-path":52,"./utils":53}],50:[function(require,module,exports){
var RefInfos = function () {
    // id所在的对象列表
    this.objList = [];
    // 关键字列表
    this.keyList = [];
    // 引用的id列表
    this.referncedIDList = [];
    // 引用id的次数
    this.referencedCounts = [];
    // 保存有标记_iN$t列表
    this.temporaryDataList = [];
};

var nicifySerialized = function (serialized) {

    var mainObject = serialized[0];

    if (typeof mainObject === 'undefined') {
        return;
    }

    var refInfos = new RefInfos();
    refInfos.referencedCounts = new Array(serialized.length);

    var id;
    var obj;
    var key;
    var value;
    var hasRepeatID;
    var tempSelf = serialized.slice();

    // 遍历，并且保存需要美化的数据
    _iterative(mainObject, serialized, refInfos);
    
    var idx = 0;

    // del _iN$t
    for (idx = 0; idx < refInfos.temporaryDataList.length; idx++) {
        delete refInfos.temporaryDataList[idx]._iN$t;
    }

    // dereference
    for (idx = 0; idx < refInfos.objList.length; idx++) {
        obj = refInfos.objList[idx];
        id = refInfos.referncedIDList[idx];
        key = refInfos.keyList[idx];
        value = tempSelf[id];
        hasRepeatID = refInfos.referencedCounts[id] > 1;
        if (hasRepeatID) {
            continue;
        }
        obj[key] = value;
        var delIdx = serialized.indexOf(value);
        serialized.splice(delIdx, 1);
    }

    // update id
    for (idx = 0; idx < refInfos.objList.length; idx++) {
        id = refInfos.referncedIDList[idx];
        key = refInfos.keyList[idx];
        obj = refInfos.objList[idx];
        hasRepeatID = refInfos.referencedCounts[id] > 1;
        if (hasRepeatID) {
            value = tempSelf[id];
            var newIdx = serialized.indexOf(value);
            obj[key].__id__ = newIdx;
        }
    }
};

var _iterative = function (obj, serialized, refInfos) {
    if (typeof obj !== 'object') {
        return;
    }
    obj._iN$t = true;
    refInfos.temporaryDataList.push(obj);
    if (obj.content) {
        var type = obj.__type__ && Fire.JS._getClassById(obj.__type__);
        if (type && type.prototype._serialize) {
            // skip customized data
            return;
        }
    }

    var element;
    if (Array.isArray(obj)) {
        for (var key = 0; key < obj.length; key++) {
            element = obj[key];
            if (element) {
                _traversalChild(element, key, obj, serialized, refInfos);
            }
        }
    }
    else {
        for (var i in obj) {
            element = obj[i];
            if (element) {
                _traversalChild(element, i, obj, serialized, refInfos);
            }
        }
    }
};

var _traversalChild = function (element, key, obj, serialized, refInfos) {
    var hasRepeatID;
    var id = element.__id__;
    var hasID = typeof id !== 'undefined';
    if (hasID) {
        element = serialized[id];
        hasRepeatID = refInfos.referncedIDList.indexOf(id) !== -1;
        if (hasRepeatID) {
            refInfos.referencedCounts[id]++;
        }
        else {
            refInfos.referencedCounts[id] = 1;
        }
        refInfos.referncedIDList.push(id);
        refInfos.keyList.push(key);
        refInfos.objList.push(obj);
    }
    var isNew = !element._iN$t;
    if (isNew) {
        _iterative(element, serialized, refInfos);
    }
    else {
        if (hasID) {
            refInfos.referencedCounts[id]++;
        }
    }
};

Fire._nicifySerialized = nicifySerialized;
module.exports = nicifySerialized;

},{}],51:[function(require,module,exports){
var Def = require('../core/definition');
var PersistentMask = Def.PersistentMask;
var DontSave = Def.DontSave;
var EditorOnly = Def.EditorOnly;
var _isDomNode = require('../core/utils').isDomNode;
var nicifySerialized = require('./serialize-nicify');

function _getType (obj) {
    var p = obj.constructor.prototype;
    if (p.hasOwnProperty('__cid__')) {
        return p.__cid__;
    }
    //if (p.hasOwnProperty('__classname__')) {
    //    return p.__classname__;
    //}
    return '';
}

var _Serializer = (function () {

    ///**
    // * @param {Boolean} [exporting=false] - if true, property with Fire.EditorOnly will be discarded
    // */
    function _Serializer(obj, exporting) {
        this._exporting = exporting;

        this.serializedList = [];  // list of serialized data for all Fire.FObject objs
        this._parsingObjs = [];    // 记录当前引用对象，防止循环引用
        this._parsingData = [];    // 记录当前引用对象的序列化结果
        this._objsToResetId = [];

        _serializeMainObj(this, obj);

        for (var i = 0; i < this._objsToResetId.length; ++i) {
            this._objsToResetId[i].__id__ = undefined;
        }

        this._parsingObjs = null;
        this._parsingData = null;
        this._objsToResetId = null;
    }

    // even array may caused circular reference, so we'd be better check it all the time, 否则就要像unity限制递归层次，有好有坏
    var _checkCircularReference = function (self, obj) {
        var parsingIndex = self._parsingObjs.indexOf(obj);
        var circularReferenced = (parsingIndex !== -1);
        if (circularReferenced) {
            // register new referenced object
            var id = self.serializedList.length;
            obj.__id__ = id;        // we add this prop dynamically to simply lookup whether an obj has been serialized.
                                    // If it will lead to performance degradations in V8, we just need to save ids to another table.
            self._objsToResetId.push(obj);
            var data = self._parsingData[parsingIndex];
            if (Array.isArray(obj) === false) {
                //data.__id__ = id;   // also save id in source data, just for debugging
                var type = _getType(obj);
                if (type) {
                    data.__type__ = type;
                }
            }
            self.serializedList.push(data);
            return data;
        }
    };

    function enumerateByFireClass (self, obj, data, fireClass) {
        var props = fireClass.__props__;
        if (props) {
            for (var p = 0; p < props.length; p++) {
                var propName = props[p];
                var attrs = Fire.attr(fireClass, propName);
                // assume all prop in __props__ must have attr

                // skip editor only when exporting
                if (self._exporting && attrs.editorOnly) {
                    continue;
                }

                if (attrs.saveUrlAsAsset) {
                    var url = obj[propName];
                    if (!url) {
                        continue;
                    }
                    if (typeof url !== 'string') {
                        Fire.error('The url must be "string" type');
                        continue;
                    }
                    var uuid = Fire.Asset.urlToUuid(url);
                    if (!uuid) {
                        continue;
                    }
                    data[propName] = _serializeField(self, Editor.serialize.asAsset(uuid));
                    continue;
                }
                else if (attrs.serializable === false) {
                    continue;
                }

                // undefined value (if dont save) will be stripped from JSON
                data[propName] = _serializeField(self, obj[propName]);
            }
        }
    }

    ///**
    // * @param {object} obj - The object to serialize
    // * @param {array|object} data - The array or dict where serialized data to store
    // * @return {object} The reference info used to embed to its container.
    // *                   if the serialized data not contains in serializedList, then return the data directly.
    // */
    var _enumerateObject = function (self, obj, data) {
        if (Array.isArray(obj)) {
            for (var i = 0; i < obj.length; ++i) {
                var item = _serializeField(self, obj[i]);
                if (typeof item !== 'undefined') {     // strip undefined item (dont save)
                    data.push(item);
                }
            }
        }
        else {
            var attrs, propName, props;
            var klass = obj.constructor;
            var mixinClasses = obj._mixinClasses;
            if (mixinClasses) {
                for (var m = 0; m < mixinClasses.length; m++) {
                    var mixinClass = mixinClasses[m];
                    enumerateByFireClass(self, obj, data, mixinClass);
                }
            }
            else if (! Fire._isFireClass(klass)) {
                // primitive javascript object
                for (var key in obj) {
                    //Fire.log(key);
                    if ( !obj.hasOwnProperty(key) || (key.charCodeAt(0) === 95 && key.charCodeAt(1) === 95))    // starts with __
                        continue;
                    // undefined value (if dont save) will be stripped from JSON
                    data[key] = _serializeField(self, obj[key]);
                }
            }
            else {
                // normal FireClass

                //if (obj.onBeforeSerialize) {
                //    obj.onBeforeSerialize();
                //}
                props = klass.__props__;
                if (props) {
                    if (props[props.length - 1] !== '_$erialized') {
                        enumerateByFireClass(self, obj, data, klass);
                    }
                    else {
                        // If is missing script proxy, serialized as original data
                        data.__type__ = obj._$erialized.__type__;
                        _enumerateObject(self, obj._$erialized, data);
                    }
                }
            }
        }
    };

    ///**
    // * serialize any type
    // * @param {*} val - The element to serialize
    // */
    var _serializeField = function (self, val) {
        var type = typeof val;
        if (type === 'object') {
            if (val instanceof FObject) {
                var objFlags = val._objFlags;
                if (objFlags & DontSave) {
                    return undefined;
                }
                else if (self._exporting && (objFlags & EditorOnly)) {
                    return undefined;
                }
            }
            return _serializeObj(self, val);
        }
        else if (type !== 'function') {
            return val;
        }
        else /*function*/ {
            return null;
        }
    };

    ///**
    // * serialize only primitive object type
    // * @param {object} obj - The object to serialize
    // */
    var _serializePrimitiveObj = function (self, obj) {
        var data;
        if (Array.isArray(obj)) {
            data = [];
        }
        else {  // 'object'
            data = {};
            var type = _getType(obj);
            if (type) {
                data.__type__ = type;
            }
        }

        var oldSerializedCount = self.serializedList.length;

        // mark parsing to prevent circular reference
        self._parsingObjs.push(obj);
        self._parsingData.push(data);

        _enumerateObject(self, obj, data);

        self._parsingObjs.pop();
        self._parsingData.pop();

        // check whether obj has been serialized to serializedList,
        // if it is, no need to serialized to data again
        if (self.serializedList.length > oldSerializedCount) {
            var index = self.serializedList.indexOf(data, oldSerializedCount);
            if (index !== -1) {
                return { __id__: index };
            }
        }

        // inline
        return data;
    };

    ///**
    // * serialize object
    // * @param {object} obj - The object to serialize
    // */
    var _serializeObj = function (self, obj) {
        //Fire.log(obj);
        if (!obj) {
            return null;
        }

        // has been serialized ?
        var id = obj.__id__;
        if (typeof id !== 'undefined') {
            return { __id__: id }; // no need to parse again
        }

        var isFObj = obj instanceof FObject;
        if (isFObj) {
            // FObject
            if (!obj.isValid) {
                return null;
            }
            var uuid = obj._uuid;
            if (uuid) {
                // Asset
                return {__uuid__: uuid};
            }
        }
        if (isFObj || Fire._isFireClass(obj.constructor)) {
            // assign id for FObject
            id = self.serializedList.length;
            obj.__id__ = id;        // we add this prop dynamically to simply lookup whether an obj has been serialized.
                                    // If it will lead to performance degradations in V8, we just need to save ids to another table.
            self._objsToResetId.push(obj);

            // get FObject data
            var data = {};
            self.serializedList.push(data);

            var type = _getType(obj);
            if (type) {
                data.__type__ = type;
            }
            if (! obj._serialize) {
                _enumerateObject(self, obj, data);
                if (isFObj) {
                    data._objFlags &= PersistentMask;
                }
            }
            else {
                //if (isFObj) {
                //    obj._objFlags &= PersistentMask;
                //}
                data.content = obj._serialize(self._exporting);
            }

            return { __id__: id };
        }
        else if (_isDomNode && _isDomNode(obj)) {
            // raw obj
            //Fire.warn("" + obj + " won't be serialized");
            return null;
        }
        else {
            // check circular reference if primitive object
            // 对于原生javascript类型，只做循环引用的保护，
            // 并不保证同个对象的多处引用反序列化后仍然指向同一个对象。
            // 如果有此需求，应该继承自FObject
            var referencedData = _checkCircularReference(self, obj);
            if (referencedData) {
                // already referenced
                id = obj.__id__;
                return { __id__: id };
            }
            else {
                return _serializePrimitiveObj(self, obj);
            }
        }
    };

    ///**
    // * serialize main object
    // * 这个方法主要是对 main object 做特殊处理，虽然和 _serializeObj 很接近，但为了
    // * 避免增加 _serializeObj 的额外开销并不和它合并到一起。
    // * @param {object} obj - The object to serialize
    // */
    var _serializeMainObj = function (self, obj) {
        if (obj instanceof FObject || Fire._isFireClass(obj.constructor)) {
            var uuid = obj._uuid;
            if (typeof uuid !== 'undefined') {
                // force Asset serializable, or _serializeObj will just return { __uuid__: ... }
                obj._uuid = null;
            }

            _serializeObj(self, obj);

            if (typeof uuid !== 'undefined') {
                // restore uuid
                obj._uuid = uuid;
            }
        }
        else if (typeof obj === 'object' && obj) {
            if (_isDomNode && _isDomNode(obj)) {
                Fire.warn("" + obj + " won't be serialized");
                self.serializedList.push(null);
                return;
            }

            var data;
            if (Array.isArray(obj)) {
                data = [];
            }
            else {
                data = {};
                var type = _getType(obj);
                if (type) {
                    data.__type__ = type;
                }
            }

            obj.__id__ = 0;
            self._objsToResetId.push(obj);
            self.serializedList.push(data);
            _enumerateObject(self, obj, data);
        }
        else {
            self.serializedList.push(_serializeObj(self, obj));
        }
    };

    return _Serializer;
})();

/**
 * @module Editor
 */
/**
 * Serialize Fire.Asset to a json string
 * @method serialize
 * @param {Asset} obj - The object to serialize
 * @param {object} [options=null]
 * @return {string|object} The json string to represent the object or json object if dontStringify is true
 */
Editor.serialize = function (obj, options) {
    var exporting = (options && options.exporting);
    // indicates whether needs to convert the result by JSON.stringify, default is true
    var stringify = (options && 'stringify' in options) ? options.stringify : true;
    var minify = (options && 'minify' in options) ? options.minify : false;
    var nicify = minify || (options && options.nicify);

    var serializer = new _Serializer(obj, exporting);
    var serializedList = serializer.serializedList;

    if (nicify) {
        nicifySerialized(serializedList);
    }

    var serializedData;
    if (serializedList.length === 1 && !Array.isArray(serializedList[0])) {
        serializedData = serializedList[0];
    }
    else {
        serializedData = serializedList;
    }
    if (stringify === false) {
        return serializedData;
    }
    else {
        return JSON.stringify(serializedData, null, minify ? 0 : 2);
    }
};

/**
 * Create a pseudo object which will be force serialized as a reference to any asset by specified uuid.
 * @method serialize.asAsset
 * @param {string} uuid
 * @return {Asset}
 */
Editor.serialize.asAsset = function (uuid) {
    if ( !uuid ) {
        Fire.error('[Editor.serialize.asAsset] The uuid must be non-nil!');
    }
    var pseudoAsset = new Fire.Asset();
    pseudoAsset._uuid = uuid;
    return pseudoAsset;
};

/**
 * Set the asset's name directly in JSON object
 * @method serialize.setName
 * @param {object} jsonObj
 * @param {string} name
 */
Editor.serialize.setName = function (jsonObj, name) {
    if ( Array.isArray(jsonObj) ) {
        jsonObj[0]._name = name;
    }
    else {
        jsonObj._name = name;
    }
};

module.exports = Editor.serialize;

},{"../core/definition":18,"../core/utils":40,"./serialize-nicify":50}],52:[function(require,module,exports){

function setAsset (obj, name, uuid) {
    if (name.endsWith('Uuid')) {
        // TODO - obsolete me after bitmap font and particle updated
        obj[name] = uuid;
        return;
    }
    Fire.AssetLibrary.loadAsset(uuid, function (err, asset) {
        //if (!(asset instanceof typeOfUrl)) {
        //    Fire.error('The new %s must be %s', propName, Fire.JS.getClassName(typeOfUrl));
        //}
        var isUrl = true;
        if (isUrl) {
            obj[name] = (asset && asset.url) || '';
        }
        else {
            obj[name] = asset;
        }
    });
}

// assert value.uuid && actualType
function setByUuid (obj, name, value, actualType) {
    var uuid = value.uuid;
    var type = Fire.JS.getClassByName(actualType);
    if (type) {
        if (Fire.isChildClassOf(type, Fire.Asset)) {
            setAsset(obj, name, uuid);
        }
        else if (Fire.isChildClassOf(type, Fire.Runtime.NodeWrapper)) {
            obj[name] = Fire.engine.getInstanceById(uuid);
        }
        else {
            // just a common primitive object
            obj[name] = value;
        }
    }
    else {
        Fire.warn('Unknown type to apply: ' + actualType);
    }
}

function setPropertyByPath (node, path, value, actualType) {
    if (path.indexOf('.') === -1) {
        if (actualType && value.uuid) {
            setByUuid(node, path, value, actualType);
        }
        else {
            node[path] = value;
        }
    }
    else {
        var props = path.split('.');
        var mainPropName = props[0];
        var mainProp = node[mainPropName];
        // parse embedded props
        var subProp = mainProp;
        //if (subProp) {
            for (var i = 1; i < props.length - 1; i++) {
                var subPropName = props[i];
                subProp = subProp[subPropName];
                //if (subProp == null) {
                //}
            }
            var propName = props[props.length - 1];
            if (actualType && value.uuid) {
                setByUuid(subProp, propName, value, actualType);
            }
            else {
                subProp[propName] = value;
                // invoke setter (for position)
                node[mainPropName] = mainProp;
            }
        //}
        //else {
        //}
    }
}

function getPropertyByPath (node, path) {
    if (path.indexOf('.') === -1) {
        return node[path];
    }
    else {
        var props = path.split('.');
        var subProp = node;
        for (var i = 0; i < props.length; i++) {
            subProp = subProp[props[i]];
            if (subProp == null) {
                Fire.warn('Failed to parse "%s", %s is nil', path, props[i]);
                return null;
            }
        }
        return subProp;
    }
}

function setDeepPropertyByPath (node, path, value, actualType) {
    if (typeof value === 'object' && !Array.isArray(value)) {
        if (actualType && value.uuid) {
            setPropertyByPath(node, path, value, actualType);
        }
        else {
            var obj = getPropertyByPath(node, path);
            // change current value
            for (var subKey in value) {
                var subVal = value[subKey];
                // 不会发复合对象过来，所以不用把 type 传给子对象
                setDeepPropertyByPath(obj, subKey, subVal);
            }
            // apply changes
            setPropertyByPath(node, path, obj);
        }
    }
    else {
        setPropertyByPath(node, path, value, actualType);
    }
}

Editor.setPropertyByPath = setPropertyByPath;
Editor.setDeepPropertyByPath = setDeepPropertyByPath;

module.exports = setPropertyByPath;

},{}],53:[function(require,module,exports){
(function (exports) {
    var Base64KeyChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

    var AsciiTo64 = new Array(128);
    for (var i = 0; i < 128; ++i) { AsciiTo64[i] = 0; }
    for (i = 0; i < 64; ++i) { AsciiTo64[Base64KeyChars.charCodeAt(i)] = i; }

    var Reg_RemoveDash = /-/g;

    // 将 uuid 的后面 27 位压缩成 18 位，前 5 位保留下来，方便调试。
    // 压缩后的 uuid 可以减小保存时的尺寸，但不能做为文件名。
    exports.compressUuid = function (uuid) {
        // fc991dd7-0033-4b80-9d41-c8a86a702e59
        var striped = uuid.replace(Reg_RemoveDash, '');
        var head = striped.slice(0, 5);
        // encode base64
        var base64Chars = [];
        for (var i = 5; i < 32; i += 3) {
            var hexVal1 = parseInt(striped[i], 16);
            var hexVal2 = parseInt(striped[i + 1], 16);
            var hexVal3 = parseInt(striped[i + 2], 16);
            base64Chars.push(Base64KeyChars[(hexVal1 << 2) | (hexVal2 >> 2)]);
            base64Chars.push(Base64KeyChars[((hexVal2 & 3) << 4) | hexVal3]);
        }
        //
        return head + base64Chars.join('');
    };

    exports.decompressUuid = function (str) {
        if (str.length === 23) {
            // decode base64
            var hexChars = [];
            for (var i = 5; i < 23; i += 2) {
                var lhs = AsciiTo64[str.charCodeAt(i)];
                var rhs = AsciiTo64[str.charCodeAt(i + 1)];
                hexChars.push((lhs >> 2).toString(16));
                hexChars.push((((lhs & 3) << 2) | rhs >> 4).toString(16));
                hexChars.push((rhs & 0xF).toString(16));
            }
            //
            str = str.slice(0, 5) + hexChars.join('');
        }
        return [str.slice(0, 8), str.slice(8, 12), str.slice(12, 16), str.slice(16, 20), str.slice(20)].join('-');
    };

    var Reg_Uuid = /^[0-9a-fA-F]{32}$/;
    var Reg_CompressedUuid = /^[0-9a-zA-Z+/]{23}$/;

    exports.isUuid = function (str) {
        if (str.length === 36) {
            str = str.replace(Reg_RemoveDash, '');
        }
        return Reg_CompressedUuid.test(str) || Reg_Uuid.test(str);
    };
})(Editor);

module.exports = Editor;

},{}],54:[function(require,module,exports){
require('./polyfill');

var Fire = require('./core');

if (FIRE_EDITOR) {
    // TODO - exclude editor in browserify (https://github.com/substack/node-browserify#bexcludefile)
    var Editor = require('./editor');

    if (Editor.isCoreLevel) {
        Editor.versions['engine-framework'] = require('../package.json').version;
    }
}

if (Fire.isWeb) {
    // PAGE LEVEL
    Fire.Runtime = require('./runtime');
}

module.exports = Fire;

},{"../package.json":11,"./core":25,"./editor":49,"./polyfill":56,"./runtime":62}],55:[function(require,module,exports){
// http://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind.html
if (!Function.prototype.bind) {
    Function.prototype.bind = function (oThis) {
        //return function () {};
        if (typeof this !== 'function') {
            // closest thing possible to the ECMAScript 5
            // internal IsCallable function
            throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
        }

        var aArgs = Array.prototype.slice.call(arguments, 1),
            fToBind = this,
            fNOP = function () {},
            fBound = function () {
                return fToBind.apply(this instanceof fNOP ? this : oThis,
                    aArgs.concat(Array.prototype.slice.call(arguments)));
            };

        fNOP.prototype = this.prototype;
        fBound.prototype = new fNOP();

        return fBound;
    };
}

},{}],56:[function(require,module,exports){
require('./bind');

},{"./bind":55}],57:[function(require,module,exports){

/**
 * Base class for every scripts mixin to Nodes.
 * This class will not instantiate actually, it just used to define properties and methods to mixin.
 *
 * NOTE: Should not use constructor, use `onLoad` instead please.
 *
 * @class Behavior
 * @constructor
 */
var Behavior = Fire.Class({
    name: 'Fire.Behavior',

    /**
     * Called when attaching to a node.
     * @method onLoad
     */
    onLoad: null,

    ///**
    // * Called before all scripts' update.
    // * @method start
    // */
    //start: null,

    /**
     * Update is called every frame.
     * @method update
     */
    update: null,
});

Behavior.onActivated = function (target) {
    if (target.onLoad) {
        target.onLoad();
    }
    //if (target._enabled) {
    //    _callOnEnable(target, active);
    //}
};

// life cycle methods

var CallLcmOnceTmpl;
if (FIRE_EDITOR) {
    CallLcmOnceTmpl = function () {
        if (!Fire.engine._isPlaying) {
            return;
        }
        for (var i = 0; i < this._mixinContexts.length; i++) {
            var ctx = this._mixinContexts[i];
            if (!(ctx._objFlags & _FLAG_)) {
                var func = ctx._FUNC_;
                if (func) {
                    try {
                        func.call(this);
                    }
                    catch (e) {
                        Fire._throw(e);
                    }
                }
                ctx._objFlags |= _FLAG_;
            }
        }
        this._FUNC_ = null;
    };
}
else {
    CallLcmOnceTmpl = function () {
        for (var i = 0; i < this._mixinContexts.length; i++) {
            var ctx = this._mixinContexts[i];
            if (!(ctx._objFlags & _FLAG_)) {
                var func = ctx._FUNC_;
                if (func) {
                    func.call(this);
                }
                ctx._objFlags |= _FLAG_;
            }
        }
        this._FUNC_ = null;
    };
}

var CallLcmTmpl;
if (FIRE_EDITOR) {
    CallLcmTmpl = function () {
        if (!Fire.engine._isPlaying) {
            return;
        }
        for (var i = 0; i < this._mixinContexts.length; i++) {
            var ctx = this._mixinContexts[i];
            var func = ctx._FUNC_;
            if (func) {
                try {
                    func.apply(this, arguments);
                }
                catch (e) {
                    Fire._throw(e);
                }
            }
        }
    };
}
else {
    CallLcmTmpl = function () {
        for (var i = 0; i < this._mixinContexts.length; i++) {
            var ctx = this._mixinContexts[i];
            var func = ctx._FUNC_;
            if (func) {
                func.apply(this, arguments);
            }
        }
    };
}

// define LC methods
var LCMethods = {
    onLoad: {
        tmpl: CallLcmOnceTmpl,
        flag: Fire._ObjectFlags.IsOnLoadCalled
    },
    //start: {
    //    tmpl: CallLcmOnceTmpl,
    //    flag: Fire._ObjectFlags.IsOnStartCalled
    //},
    onEnter: {
        tmpl: CallLcmTmpl,
    },
    onExit: {
        tmpl: CallLcmTmpl,
    },
    update: {
        tmpl: CallLcmTmpl,
    }
};
var LCMethodNames = Object.keys(LCMethods);

// generate LC invokers
var LCInvokers = {};
for (var j = 0; j < LCMethodNames.length; j++) {
    var name = LCMethodNames[j];
    var info = LCMethods[name];
    var tmpl = '(' + info.tmpl + ')';
    tmpl = tmpl.replace(/_FUNC_/g, name);
    if (info.flag) {
        tmpl = tmpl.replace(/_FLAG_/g, info.flag);
    }
    LCInvokers[name] = eval(tmpl);
}

// exports
Fire.Behavior = Behavior;
Behavior.LCMethodNames = LCMethodNames;
Behavior.lcmInvokers = LCInvokers;
module.exports = Behavior;

},{}],58:[function(require,module,exports){
var JS = Fire.JS;
var SceneWrapper = require('../wrappers/scene');

/**
 * @module Fire.Runtime
 */

/**
 * @class EngineWrapper
 */

var EngineWrapper = require('../wrappers/engine');
var engineProto = EngineWrapper.prototype;

if (FIRE_EDITOR) {
    /**
     * Returns the wrapper by wrapper id.
     * @method getInstanceById
     * @param {String} uuid
     * @return {Fire.Runtime.NodeWrapper}
     */
    engineProto.getInstanceById = function (uuid) {
        return this.attachedWrappersForEditor[uuid] || null;
    };

    /**
     * Returns the node by wrapper id.
     * @method getInstanceByIdN
     * @param {String} uuid
     * @return {RuntimeNode}
     */
    engineProto.getInstanceByIdN = function (uuid) {
        var wrapper = this.attachedWrappersForEditor[uuid];
        return (wrapper && wrapper.targetN) || null;
    };
}

JS.mixin(engineProto, {

    /**
     * Get the wrapper of current running scene.
     * @method getCurrentScene
     * @return {SceneWrapper}
     */
    getCurrentScene: function () {
        return Fire(this.getCurrentSceneN());
    },

    _initScene: function (sceneWrapper, callback) {
        if (sceneWrapper._needCreate) {
            sceneWrapper.create(callback);
        }
        else {
            callback();
        }
    },

    /**
     * Launch loaded scene.
     * @method _launchScene
     * @param {SceneWrapper} scene
     * @param {function} [onBeforeLoadScene]
     * @private
     */
    _launchScene: function (scene, onBeforeLoadScene) {
        var self = this;

        if (!scene) {
            Fire.error('Argument must be non-nil');
            return;
        }

        if (scene._needCreate && FIRE_EDITOR) {
            Fire.error('The scene wrapper %s is not yet fully created', scene.name);
            return;
        }

        //Engine._dontDestroyEntities.length = 0;

        //// unload scene
        //var oldScene = Engine._scene;
        //
        ////editorCallback.onStartUnloadScene(oldScene);
        //
        //if (Fire.isValid(oldScene)) {
        //    // destroyed and unload
        //    AssetLibrary.unloadAsset(oldScene, true);
        //}
        //
        //// purge destroyed entities belongs to old scene
        //FObject._deferredDestroy();
        //
        //Engine._scene = null;

        // destroy last scene
        self._setCurrentSceneN(this._emptySceneN);

        if (onBeforeLoadScene) {
            onBeforeLoadScene();
        }

        self.emit('pre-launch-scene');

        //// init scene
        //Engine._renderContext.onSceneLoaded(scene);

        ////if (editorCallback.onSceneLoaded) {
        ////    editorCallback.onSceneLoaded(scene);
        ////}

        //// launch scene
        //scene.entities = scene.entities.concat(Engine._dontDestroyEntities);
        //Engine._dontDestroyEntities.length = 0;
        self._setCurrentSceneN(scene.targetN);
        //Engine._renderContext.onSceneLaunched(scene);

        //editorCallback.onBeforeActivateScene(scene);

        scene._onActivated();

        //editorCallback.onSceneLaunched(scene);
    },

    /**
     * Loads the scene by its name.
     * @method loadScene
     * @param {string} sceneName - the name of the scene to load
     * @param {function} [onLaunched] - callback, will be called after scene launched
     * @param {function} [onUnloaded] - callback, will be called when the previous scene was unloaded
     * @return {boolean} if error, return false
     */
    loadScene: function (sceneName, onLaunched, onUnloaded) {
        if (this._loadingScene) {
            Fire.error('[loadScene] Failed to load scene "%s" because "%s" is already loading', sceneName, this._loadingScene);
            return false;
        }
        var uuid, info;
        if (typeof sceneName === 'string') {
            if (!sceneName.endsWith('.fire')) {
                sceneName += '.fire';
            }
            // search scene
            for (var i = 0; i < this._sceneInfos.length; i++) {
                info = this._sceneInfos[i];
                var url = info.url;
                if (url.endsWith(sceneName)) {
                    uuid = info.uuid;
                    break;
                }
            }
        }
        else {
            info = this._sceneInfos[sceneName];
            if (typeof info === 'object') {
                uuid = info.uuid;
            }
            else {
                Fire.error('[loadScene] The scene index to load (%s) is out of range.', sceneName);
                return false;
            }
        }
        if (uuid) {
            this._loadingScene = sceneName;
            this._loadSceneByUuid(uuid, onLaunched, onUnloaded);
            return true;
        }
        else {
            Fire.error('[loadScene] Can not load the scene "%s" because it has not been added to the build settings before play.', sceneName);
            return false;
        }
    },

    /**
     * Loads the scene by its uuid.
     * @method _loadSceneByUuid
     * @param {string} uuid - the uuid of the scene asset to load
     * @param {function} [onLaunched]
     * @param {function} [onUnloaded]
     * @private
     */
    _loadSceneByUuid: function (uuid, onLaunched, onUnloaded) {
        var self = this;
        //Fire.AssetLibrary.unloadAsset(uuid);     // force reload
        Fire.AssetLibrary.loadAsset(uuid, function (error, scene) {
            if (error) {
                error = 'Failed to load scene: ' + error;
                if (FIRE_EDITOR) {
                    console.assert(false, error);
                }
            }
            else {
                var uuid = scene._uuid;
                scene = scene.scene;    // Currently our scene not inherited from Asset, so need to extract scene from dummy asset
                if (scene instanceof SceneWrapper) {
                    scene.uuid = uuid;
                }
                else {
                    error = 'The asset ' + uuid + ' is not a scene';
                    scene = null;
                }
            }
            if (scene) {
                self._initScene(scene, function () {
                    self._launchScene(scene, onUnloaded);
                    self._loadingScene = '';
                    if (onLaunched) {
                        onLaunched(error, scene);
                    }
                });
            }
            else {
                Fire.error(error);
                self._loadingScene = '';
                if (onLaunched) {
                    onLaunched(error, scene);
                }
            }
        });
    },

    //launchNewScene: function () {
    //    var SceneWrapperImpl = Fire.engine.getCurrentScene().constructor;
    //    var sceneWrapper = new SceneWrapperImpl();
    //    sceneWrapper.onAfterDeserialize();
    //    Fire.engine._launchScene(sceneWrapper);
    //}
});

},{"../wrappers/engine":66,"../wrappers/scene":68}],59:[function(require,module,exports){
var JS = Fire.JS;
var Behavior = Fire.Behavior;

/**
 * @module Fire.Runtime
 */

/**
 * @class NodeWrapper
 */
var NodeWrapper = require('../wrappers/node');

var nodeProto = NodeWrapper.prototype;

/**
 * The parent of the wrapper.
 * If this is the top most node in hierarchy, its parent must be type SceneWrapper.
 * Changing the parent will keep the transform's local space position, rotation and scale the same but modify
 * the world space position, scale and rotation.
 * @property parent
 * @type {NodeWrapper}
 */
JS.getset(nodeProto, 'parent',
    function () {
        var parent = this.parentN;
        return parent && Fire(parent);
    },
    function (value) {
        if (FIRE_EDITOR && value) {
            if (!(value instanceof NodeWrapper)) {
                Fire.error('The new parent must be type NodeWrapper');
                return;
            }
            if (value.constructor.canHaveChildrenInEditor) {
                this.parentN = value && value.targetN;
            }
            else {
                Fire.warn('Can not add "%s" to "%s" which type is "%s".', this.name, value.name, JS.getClassName(value));
                if (!this.parentN) {
                    this.parentN = Fire.engine.getCurrentSceneN();
                }
            }
        }
        else {
            this.parentN = value && value.targetN;
        }
    }
);

/**
 * Returns a new array which contains wrappers of child nodes.
 * @property children
 * @type {NodeWrapper[]}
 */
JS.get(nodeProto, 'children',
    function () {
        if (!FIRE_EDITOR || this.constructor.canHaveChildrenInEditor) {
            return this.childrenN.map(Fire);
        }
        else {
            return [];
        }
    }
);

/**
 * The position relative to the scene.
 * @property scenePosition
 * @type {Fire.Vec2}
 * @private
 */
JS.getset(nodeProto, 'scenePosition',
    function () {
        var scene = Fire.engine && Fire.engine.getCurrentScene();
        if (!scene) {
            Fire.error('Can not access scenePosition if no running scene');
            return Fire.Vec2.zero;
        }

        return scene.transformPointToLocal( this.worldPosition );
    },
    function (value) {
        var scene = Fire.engine && Fire.engine.getCurrentScene();
        if (!scene) {
            Fire.error('Can not access scenePosition if no running scene');
            return;
        }

        this.worldPosition = scene.transformPointToWorld(value);
    }
);

/**
 * The rotation relative to the scene.
 * @property sceneRotation
 * @type {Number}
 * @private
 */
JS.getset(nodeProto, 'sceneRotation',
    function () {
        var scene = Fire.engine && Fire.engine.getCurrentScene();
        if (!scene) {
            Fire.error('Can not access sceneRotation if no running scene');
            return 0;
        }

        return this.worldRotation - scene.rotation;
    },
    function (value) {
        var scene = Fire.engine && Fire.engine.getCurrentScene();
        if (!scene) {
            Fire.error('Can not access sceneRotation if no running scene');
            return;
        }

        this.worldRotation = scene.rotation + value;
    }
);

/**
 * The lossy scale relative to the scene. (Read Only)
 * @property sceneScale
 * @type {Fire.Vec2}
 * @readOnly
 * @private
 */
JS.getset(nodeProto, 'sceneScale',
    function () {
        var scene = Fire.engine && Fire.engine.getCurrentScene();
        if (!scene) {
            Fire.error('Can not access sceneScale if no running scene');
            return Fire.Vec2.one;
        }

        return this.worldScale.div(scene.scale);
    }
);

JS.mixin(nodeProto, {
    /**
     * Is this node an instance of Scene?
     *
     * @property isScene
     */
    isScene: false,

    /**
     * Is this wrapper a child of the parentWrapper?
     *
     * @method isChildOf
     * @param {NodeWrapper} parentWrapper
     * @return {boolean} - Returns true if this wrapper is a child, deep child or identical to the given wrapper.
     */
    isChildOf: function (parentWrapper) {
        var child = this;
        do {
            if (child === parentWrapper) {
                return true;
            }
            child = child.parent;
        }
        while (child);
        return false;
    },

    /**
     * Move the node to the top.
     *
     * @method setAsFirstSibling
     */
    setAsFirstSibling: function () {
        this.setSiblingIndex(0);
    },

    /**
     * Move the node to the bottom.
     *
     * @method setAsLastSibling
     */
    setAsLastSibling: function () {
        this.setSiblingIndex(-1);
    },

    _onActivated: function () {
        if (!FIRE_EDITOR || Fire.engine._isPlaying) {
            this._onActivatedInGameMode();
        }
        else {
            this._onActivatedInEditMode();
        }
    },

    _onActivatedInGameMode: function () {
        // invoke mixin
        Behavior.onActivated(this.targetN);

        // invoke children recursively
        var children = this.childrenN;
        for (var i = 0, len = children.length; i < len; ++i) {
            var node = children[i];
            Fire(node)._onActivatedInGameMode();
        }
    },

    _onActivatedInEditMode: function () {
        if (FIRE_EDITOR) {
            // invoke wrapper
            var focused = !FIRE_TEST && Editor.Selection.curActivate('node') === this.uuid;
            if (focused) {
                if (this.onFocusInEditor) {
                    this.onFocusInEditor();
                }
            }
            else if (this.onLostFocusInEditor) {
                this.onLostFocusInEditor();
            }

            // invoke children recursively
            var children = this.childrenN;
            for (var i = 0, len = children.length; i < len; ++i) {
                var node = children[i];
                Fire(node)._onActivatedInEditMode();
            }
        }
    },
});

},{"../wrappers/node":67}],60:[function(require,module,exports){
var JS = Fire.JS;
var mixin = require('../mixin').mixin;

/**
 * @module Fire.Runtime
 */

/**
 * @class SceneWrapper
 */
var SceneWrapper = require('../wrappers/scene');

var sceneProto = SceneWrapper.prototype;

JS.mixin(sceneProto, {
    isScene: true,

    _initNodes: function (datas, parentWrapper) {
        for (var i = 0, len = datas.length; i < len; i++) {
            var child = datas[i];
            var wrapper = child.w;
            wrapper.onAfterDeserialize();
            wrapper.parentN = parentWrapper.targetN;
            var classIdToMixin = child.m;
            if (classIdToMixin) {
                var ClassToMixin;
                if (Array.isArray(classIdToMixin)) {
                    for (var j = 0; j < classIdToMixin.length; j++) {
                        ClassToMixin = JS._getClassById(classIdToMixin[j]);
                        if (ClassToMixin) {
                            mixin(wrapper.targetN, ClassToMixin);
                            Fire.deserialize.applyMixinProps(child.t, ClassToMixin, wrapper.targetN);
                        }
                        else {
                            Fire.error('Failed to find class %s to mixin', classIdToMixin[j]);
                        }
                    }
                }
                else {
                    ClassToMixin = JS._getClassById(classIdToMixin);
                    if (ClassToMixin) {
                        mixin(wrapper.targetN, ClassToMixin);
                        Fire.deserialize.applyMixinProps(child.t, ClassToMixin, wrapper.targetN);
                    }
                    else {
                        if (Editor.isUuid(classIdToMixin) && FIRE_EDITOR) {
                            classIdToMixin = Editor.decompressUuid(classIdToMixin);
                        }
                        Fire.error('Failed to find class %s to mixin', classIdToMixin);
                    }
                }
            }
            var children = child.c;
            if (children) {
                this._initNodes(children, wrapper);
            }
        }
    },

    /**
     * Create scene objects using previous serialized data.
     * @method create
     * @param {function} callback
     * @private
     */
    create: function (callback) {
        if (FIRE_EDITOR) {
            if (!this._dataToDeserialize) {
                Fire.error('No need to create scene which not deserialized');
                return callback();
            }
        }
        var self = this;
        // deserialize (create wrappers)
        var json = this._dataToDeserialize;

        //
        function doCreate (wrappers) {
            // create scene node
            self.onAfterDeserialize();
            // create remainder nodes
            Fire.engine._isCloning = true;
            self._initNodes(wrappers, self);
            Fire.engine._isCloning = false;
            callback();
        }

        // 统计所有需要 preload 的 Asset
        var recordAssets = true;
        var handle = Fire.AssetLibrary.loadJson(
            json,
            function (err, data) {
                self._dataToDeserialize = null;
                var wrappers = data.c;
                if (FIRE_EDITOR) {
                    // fallback to old format
                    wrappers = wrappers || data;
                }
                if (handle.assetsNeedPostLoad.length > 0) {
                    // preload
                    self.preloadAssets(handle.assetsNeedPostLoad, function () {
                        doCreate(wrappers);
                    });
                }
                else {
                    doCreate(wrappers);
                }
            },
            true, recordAssets
        );
    },

    /**
     * Init this scene wrapper from the previous serialized data.
     * @method _deserialize
     * @param {object} data - the serialized json data
     * @param {_Deserializer} ctx
     * @private
     */
    _deserialize: function (data, ctx) {
        // save temporarily for create()
        this._dataToDeserialize = data;
        if (data.length > 0) {
            this.uuid = data[0].uuid;
        }
    }
});

/**
 * @property {Boolean} _needCreate - Needs to call create().
 * @private
 */
JS.get(sceneProto, '_needCreate', function () {
    return !!this._dataToDeserialize;
});

// scene uuid will copy from assets
JS.getset(sceneProto, 'uuid',
    function () {
        return this._id;
    },
    function (value) {
        this._id = value;
    }
);

if (FIRE_EDITOR) {

    var serialize = require('../../editor/serialize');

    //var getMixinData = function (node) {
    //
    //};

    var parseWrappers = function (node) {
        var wrapper = Fire(node);
        wrapper.onBeforeSerialize();
        var children;
        var childrenN = wrapper.childrenN;
        if (childrenN.length > 0) {
            children = childrenN.map(parseWrappers);
        }
        var mixinClasses = node._mixinClasses;
        var targetN = mixinClasses ? node : undefined;

        var mixin;
        if (mixinClasses) {
            if (mixinClasses.length === 1) {
                mixin = JS._getClassId(mixinClasses[0]);
            }
            else {
                mixin = mixinClasses.map(JS._getClassId);
            }
        }
        return {
            w: wrapper,     // wrapper properties
            c: children,    // children
            t: targetN,     // target node
            m: mixin        // mixin class list
        };
    };

    JS.mixin(sceneProto, {
        /**
         * The implement of serialization for the whole scene.
         * @method _serialize
         * @param {boolean} exporting
         * @return {object} the serialized json data object
         * @private
         */
        _serialize: function (exporting) {
            this.onBeforeSerialize();

            var childWrappers = parseWrappers(this.targetN).c;
            var toSerialize = {
                c: childWrappers || [],
                uuid: this.uuid || ''
            };

            return serialize(toSerialize, {
                exporting: exporting,
                nicify: exporting,
                stringify: false
            });
        }
    });
}

},{"../../editor/serialize":51,"../mixin":63,"../wrappers/scene":68}],61:[function(require,module,exports){

var detachingNodes = {};

module.exports = {
    init: function () {
        if (FIRE_EDITOR) {
            Fire.engine.on('post-update', this._debounceNodeEvent);

            // 场景重建时，有可能引用改变ID不变，这里先 flush 一下以免事件顺序错乱
            Fire.engine.on('pre-launch-scene', this._debounceNodeEvent);
        }
    },

    // assert(node)
    onNodeAttachedToParent: function (node) {
        if (FIRE_EDITOR) {
            var uuid = Fire(node).uuid;
            if (!uuid) {
                return;
            }
            var nodeWithSameId = detachingNodes[uuid];
            if (nodeWithSameId) {
                delete detachingNodes[uuid];
                if (nodeWithSameId === node) {
                    // debounce
                    return;
                }
                else {
                    // flush previous detach event
                    Fire.engine.emit('node-detach-from-scene', {
                        targetN: nodeWithSameId
                    });
                }
            }
            // new node
            Fire.engine.emit('node-attach-to-scene', {
                targetN: node
            });
        }
    },

    // assert(node)
    onNodeDetachedFromParent: function (node) {
        if (FIRE_EDITOR) {
            var uuid = Fire(node).uuid;
            if (!uuid) {
                return;
            }
            detachingNodes[uuid] = node;
        }
    },

    _debounceNodeEvent: function () {
        if (FIRE_EDITOR) {
            for (var uuid in detachingNodes) {
                var node = detachingNodes[uuid];
                Fire.engine.emit('node-detach-from-scene', {
                    targetN: node
                });
            }
            detachingNodes = {};
        }
    }
};

},{}],62:[function(require,module,exports){

/**
 * This module provides interfaces for runtime implementation.
 * @module Fire.Runtime
 * @main
 */

var Runtime = {};

var register = require('./register');
var NodeWrapper = require('./wrappers/node');

Fire.JS.mixin(Runtime, {
    NodeWrapper: NodeWrapper,
    SceneWrapper: require('./wrappers/scene'),
    registerNodeType: register.registerNodeType,

    registerMixin: register.registerMixin,

    EngineWrapper: require('./wrappers/engine'),
    registerEngine: register.registerEngine,

    Helpers: require('./helpers')
});

// load utility methods
require('./extends/node-extends');
require('./extends/scene-extends');
require('./extends/engine-extends');

// register a default mixin solution
var mixin = require('./mixin');
register.registerMixin(mixin);

Runtime.Settings = require('./settings');

/**
 * @module Fire
 */

Fire.getWrapperType = register.getWrapperType;
Fire.menuToWrapper = register.menuToWrapper;

var mixin = register.getMixinOptions();
Fire.mixin = mixin.mixin;
Fire.hasMixin = mixin.hasMixin;
Fire.unMixin = mixin.unMixin;

///**
// * The SceneWrapper class registered by runtime.
// * @property SceneWrapperImpl
// * @type {Fire.Runtime.SceneWrapper}
// */
//Fire.JS.get(Fire, 'SceneWrapperImpl', register.getRegisteredSceneWrapper);



module.exports = Runtime;

},{"./extends/engine-extends":58,"./extends/node-extends":59,"./extends/scene-extends":60,"./helpers":61,"./mixin":63,"./register":64,"./settings":65,"./wrappers/engine":66,"./wrappers/node":67,"./wrappers/scene":68}],63:[function(require,module,exports){
// The default mixin solution
var JS = Fire.JS;
var Wrapper = require('./wrappers/node');
var Behavior = require('./behavior');
var instantiateProps = require('../core/class').instantiateProps;

var LifecycleMethods = Behavior.LCMethodNames;
var lcmInvokers = Behavior.lcmInvokers;

function callInTryCatch (method, target) {
    try {
        method.call(target);
    }
    catch (e) {
        Fire._throw(e);
    }
}

function mixin (node, typeOrTypename) {
    'use strict';
    if (arguments.length > 2) {
        for (var a = 1; a < arguments.length; a++) {
            mixin(node, arguments[a]);
        }
        return;
    }
    var classToMix;
    if (typeof typeOrTypename === 'string') {
        classToMix = JS.getClassByName(typeOrTypename);
        if ( !classToMix ) {
            Fire.error('Fire.mixin: Failed to get class "%s"');
            if (Fire._RFpeek()) {
                Fire.error('You should not mixin %s when the scripts are still loading.', typeOrTypename);
            }
        }
    }
    else {
        if ( !typeOrTypename ) {
            Fire.error('Fire.mixin: The class to mixin must be non-nil');
        }
        classToMix = typeOrTypename;
    }

    if (FIRE_EDITOR) {
        // validate
        if (!Fire._isFireClass(classToMix)) {
            Fire.error('Fire.mixin: The class to mixin must be FireClass.');
            return;
        }
        if (!JS._getClassId(classToMix) && !FIRE_TEST) {
            Fire.error("Fire.mixin: The class to mixin must have class name or script's uuid.");
            return;
        }
        if (!Fire.isChildClassOf(classToMix, Behavior)) {
            Fire.warn("Fire.mixin: The class to mixin must inherit from Fire.Behavior.");
            return;
        }
    }

    if (node instanceof Wrapper) {
        node = node.targetN;
    }

    if (!node) {
        Fire.error("Fire.mixin: The node to mixin must be non-nil.");
        return;
    }

    if (FIRE_EDITOR && node._mixinClasses && node._mixinClasses.indexOf(classToMix) !== -1) {
        Fire.warn("Fire.mixin: The class has already mixined.");
        return;
    }

    // init props
    instantiateProps(node, classToMix);

    // creating mixin script context
    var scriptCtx = {
        _objFlags: 0,
    };

    var mixinData;

    // maintain mixin states
    var _mixinClasses = node._mixinClasses;
    if (_mixinClasses) {
        _mixinClasses.push(classToMix);
        node._mixinContexts.push(scriptCtx);
        mixinData = node._mixin;
    }
    else {
        node._mixinClasses = [classToMix];
        node._mixinContexts = [scriptCtx];
        mixinData = {
            lcmInitStates: []
        };
        node._mixin = mixinData;
    }
    var lcmInitStates = mixinData.lcmInitStates;
    lcmInitStates.length = LifecycleMethods.length;

    // DO MIXIN
    var classToMixProto = classToMix.prototype;
    for (var propName in classToMixProto) {
        if (propName === '__cid__' ||
            propName === '__classname__' ||
            propName === 'constructor') {
            continue;
        }
        // TODO - dont mixin class attr

        var lcmIndex = LifecycleMethods.indexOf(propName);
        var isLifecycleMethods = lcmIndex !== -1;
        if (isLifecycleMethods) {
            //if (Fire.engine && !Fire.engine._isPlaying && FIRE_EDITOR) {
            //    continue;
            //}
            scriptCtx[propName] = classToMixProto[propName];
            if (! lcmInitStates[lcmIndex]) {
                lcmInitStates[lcmIndex] = true;
                // Fire.warn("Fire.mixin: %s's %s is overridden", Fire(node).name, propName);
                (function () {
                    var invoker = lcmInvokers[propName];
                    var originMethod = node[propName];
                    if (originMethod) {
                        node[propName] = function () {
                            originMethod.apply(this, arguments);
                            invoker.apply(this, arguments);
                        };
                    }
                    else {
                        node[propName] = invoker;
                    }
                })();
            }
        }
        else {
            var pd = JS.getPropertyDescriptor(classToMixProto, propName);
            Object.defineProperty(node, propName, pd);
        }
    }

    if (Fire.engine && (Fire.engine._isPlaying || !FIRE_EDITOR) && !Fire.engine._isCloning) {
        // invoke onLoad
        var onLoad = classToMixProto.onLoad;
        if (onLoad) {
            if (FIRE_EDITOR) {
                callInTryCatch(onLoad, node);
            }
            else {
                onLoad.call(node);
            }
        }
    }
}

var exports = {

    mixin: mixin,

    hasMixin: function (node, typeOrTypename) {
        if (node instanceof Wrapper) {
            node = node.targetN;
        }

        if (!node) {
            return false;
        }

        var mixinClasses = node._mixinClasses;
        if (mixinClasses) {
            var classToMix;
            if (typeof typeOrTypename === 'string') {
                classToMix = JS.getClassByName(typeOrTypename);
                if ( !classToMix ) {
                    Fire.error('Fire.hasMixin: Failed to get class "%s"', typeOrTypename);
                    return false;
                }
            }
            else {
                if ( !typeOrTypename ) {
                    return false;
                }
                classToMix = typeOrTypename;
            }
            return mixinClasses.indexOf(classToMix) !== -1;
        }
        return false;
    },

    unMixin: function (node, typeOrTypename) {
        if ((Fire.engine && Fire.engine.isPlaying) || !FIRE_EDITOR) {
            return Fire.warn("Fire.unMixin: Sorry, can not un-mixin when the engine is playing.");
        }

        if (node instanceof Wrapper) {
            node = node.targetN;
        }

        if (!node) {
            return Fire.error("Fire.unMixin: The node to un-mixin must be non-nil.");
        }

        var mixinClasses = node._mixinClasses;
        if (mixinClasses) {
            var classToUnmix;
            if (typeof typeOrTypename === 'string') {
                classToUnmix = JS.getClassByName(typeOrTypename);
                if ( !classToUnmix ) {
                    return Fire.error('Fire.unMixin: Failed to get class "%s"', typeOrTypename);
                }
            }
            else {
                if ( !typeOrTypename ) {
                    return Fire.error('Fire.unMixin: The class to un-mixin must be non-nil');
                }
                classToUnmix = typeOrTypename;
            }

            var index = mixinClasses.indexOf(classToUnmix);
            if (index !== -1) {
                mixinClasses.splice(index, 1);
                node._mixinContexts.splice(index, 1);
                return;
            }
        }
        return Fire.error('Fire.unMixin: Can not find mixed class "%s" in node "%s".',
            typeOrTypename, Fire(node).name);
    }
};

module.exports = exports;

},{"../core/class":17,"./behavior":57,"./wrappers/node":67}],64:[function(require,module,exports){
/**
 * @module Fire.Runtime
 */

var JS = Fire.JS;
var getClassName = JS.getClassName;

var NodeWrapper = require('./wrappers/node');
var SceneWrapper = require('./wrappers/scene');
var EngineWrapper = require('./wrappers/engine');

//var runtimeSceneWrapper = null;
var runtimeMixinOptions = null;

//This dictionary stores all the registered WrapperTypes, and use MenuPath as key.
//@property menuToWrapper
//@type {object}
var menuToWrapper = {};

/**
 * 通过注册 runtime 的 type 为某个解释器, 使得这份 type 具备序列化, Inspector 中展示的能力
 * @method registerNodeType
 * @param {function} nodeType
 * @param {NodeWrapper} nodeWrapper
 * @param {string} [menuPath] - Optional, the menu path name. Eg. "Rendering/Camera"
 */
function registerNodeType (nodeType, nodeWrapper, menuPath) {
    if (! Fire.isChildClassOf(nodeWrapper, NodeWrapper)) {
        Fire.error('%s must be child class of %s!', getClassName(nodeWrapper), getClassName(NodeWrapper));
        return;
    }
    if (nodeType.prototype.hasOwnProperty('_FB_WrapperType')) {
        Fire.error('%s is already registered!', getClassName(nodeType));
        return;
    }
    //if (Fire.isChildClassOf(nodeWrapper, SceneWrapper)) {
    //    if (!FIRE_TEST && runtimeSceneWrapper) {
    //        Fire.error('The %s can only register once!', getClassName(SceneWrapper));
    //    }
    //    else {
    //        runtimeSceneWrapper = nodeWrapper;
    //    }
    //}

    nodeType.prototype._FB_WrapperType = nodeWrapper;

    // TODO - 菜单应该在 package.json 里注册
    if (menuPath) {
        menuToWrapper[menuPath] = nodeWrapper;
    }
}

/**
 * 通过注册 mixin 的描述来让 engine-framework 懂得如何 mixin 一份 FireClass 到 runtime 的 nodeType 中。
 * @method registerMixin
 * @param {object} mixinOptions
 * @param {function} mixinOptions.mixin - mixin method
 */
function registerMixin (mixinOptions) {
    runtimeMixinOptions = mixinOptions;
}

/**
 * 注册一份引擎实例，注册后的引擎可以通过 Fire.engine 进行访问。
 * @method registerEngine
 * @param {EngineWrapper} engineInstance
 */
function registerEngine (engineInstance) {
    if (FIRE_EDITOR) {
        if (!(engineInstance instanceof EngineWrapper)) {
            Fire.error('The engine to register must be child class of %s', getClassName(EngineWrapper));
            return;
        }
        if (Fire.engine) {
            Fire.error('The engine is already registered!');
            return;
        }
    }
    Fire.engine = engineInstance;
    JS.obsolete(Fire, 'Fire.Engine', 'engine');
}

/**
 * @module Fire
 */

/**
 * @property {EngineWrapper} engine - The instance of current registered engine.
 */

/**
 * 返回已注册的 NodeWrapper 类型，如果 nodeOrNodeType 是实例，则返回自身类型对应的 NodeWrapper 或继承树上方的最近一个注册的 NodeWrapper。
 * 如果 nodeOrNodeType 是构造函数，则只返回自身对应的 NodeWrapper。
 * @method getWrapperType
 * @param {object|function} nodeOrNodeType
 * @return {Fire.Runtime.NodeWrapper|undefined}
 */
function getWrapperType (nodeOrNodeType) {
    if (typeof nodeOrNodeType !== 'function') {
        return nodeOrNodeType._FB_WrapperType;
    }
    else {
        return nodeOrNodeType.prototype._FB_WrapperType;
    }
}

//// 值得注意的是, 不同的 runtime 中, 他们 runtimeType 的 mixin 的关键字将会有些许变动, 比如: 有些 runtime 的 node 不支持 event,
//// 那么 listeners 关键字: 在这些 runtime 中将会失效, 我们可以 warning user.
//Fire.registerMixin = require('./mixin');
//

module.exports = {
    registerNodeType: registerNodeType,
    getWrapperType: getWrapperType,
    //getRegisteredSceneWrapper: function () {
    //    return runtimeSceneWrapper;
    //},

    registerToCoreLevel: function () {
        if (FIRE_EDITOR) {
            // register create node menu
            var menuTmpl = [];
            for (var menuPath in menuToWrapper) {
                var basename = menuPath.split('/').slice(-1)[0];
                menuTmpl.push({
                    label: menuPath,
                    message: 'scene:create-node-by-classid',
                    params: [
                        'New ' + basename,
                        JS._getClassId(menuToWrapper[menuPath])
                    ],
                });
            }
            Editor.sendToCore('app:register-menu', 'create-node', menuTmpl);
        }
    },

    registerMixin: registerMixin,
    /**
     * get current registered mixin options
     * @method getMixinOptions
     * @return {object}
     */
    getMixinOptions: function () {
        return runtimeMixinOptions;
    },

    registerEngine: registerEngine
};

},{"./wrappers/engine":66,"./wrappers/node":67,"./wrappers/scene":68}],65:[function(require,module,exports){
module.exports = {
    "mapping-v": [1, 0, 1],
    "mapping-h": [0, 1, 1],
};

},{}],66:[function(require,module,exports){
/**
 * @module Fire.Runtime
 */

var JS = Fire.JS;
var Ticker = Fire._Ticker;
var Time = Fire.Time;

var Utils = require('./utils');
var NYI = Utils.NYI;
var NYI_Accessor = Utils.NYI_Accessor;

//var SceneWrapper = require('./scene');

/**
 * !#zh 这个类用来封装编辑器对引擎的操作，并且提供运行时的一些全局接口和状态。
 * 可以通过 `Fire.engine` 来访问当前的 runtime wrapper。
 * !#en Access to engine runtime data.
 * This class contains methods for looking up information about and controlling the runtime data.
 * You can access this class using `Fire.engine`.
 *
 * You should override:
 * - initRuntime
 * - playRuntime
 * - stopRuntime
 * - pauseRuntime
 * - resumeRuntime
 * - updateRuntime
 * - animateRuntime
 * - renderRuntime
 * - getCurrentSceneN
 * - _setCurrentSceneN
 * - canvasSize
 * - getIntersectionList
 *
 * You may want to override:
 * - tick (if useDefaultMainLoop)
 * - tickInEditMode
 *
 * @class EngineWrapper
 * @extends Playable
 * @constructor
 * @param {boolean} useDefaultMainLoop - if true, tick() will be invoked every frame
 */
var EngineWrapper = Fire.Class({
    name: 'Fire.Runtime.EngineWrapper',
    extends: Fire.Playable,

    constructor: function () {
        var useDefaultMainLoop = arguments[0];

        /**
         * We should use this id to cancel ticker, otherwise if the engine stop and replay immediately,
         * last ticker will not cancel correctly.
         *
         * @property _requestId
         * @type {number}
         * @private
         */
        this._requestId = -1;

        this._useDefaultMainLoop = useDefaultMainLoop;
        this._isInitialized = false;

        // Scene list
        this._sceneInfos = [];

        // current scene
        this._loadingScene = '';
        this._emptySceneN = null;

        this._bindedTick = (FIRE_EDITOR || useDefaultMainLoop) && this._tick.bind(this);

        // states
        this._isCloning = false;    // deserializing or instantiating
        //this._isLockingScene = false;

        if (FIRE_EDITOR) {
            /**
             * The maximum value the Time.deltaTime in edit mode.
             * @property maxDeltaTimeInEM
             * @type {Number}
             * @private
             */
            this.maxDeltaTimeInEM = 1 / 30;
            /**
             * Is playing animation in edit mode.
             * @property animatingInEditMode
             * @type {Boolean}
             * @private
             */
            this.animatingInEditMode = false;

            this._shouldRepaintInEM = false;
            this._forceRepaintId = -1;

            // used in getInstanceById and editor only
            this.attachedWrappersForEditor = {};

            var attachedWrappersForEditor = this.attachedWrappersForEditor;
            this.on('node-detach-from-scene', function (event) {
                var node = event.detail.targetN;
                if (node) {
                    var uuid = Fire(node).uuid;
                    if (uuid) {
                        delete attachedWrappersForEditor[uuid];
                    }
                }
            });
            this.on('node-attach-to-scene', function (event) {
                var node = event.detail.targetN;
                if (node) {
                    var wrapper = Fire(node);
                    var uuid = wrapper.uuid;
                    if (uuid) {
                        attachedWrappersForEditor[uuid] = wrapper;
                    }
                }
            });
        }
    },

    properties: {
        /**
         * @property {boolean} isInitialized - Indicates whether the engine instance is initialized.
         * @readOnly
         */
        isInitialized: {
            get: function () {
                return this._isInitialized;
            }
        },

        /**
         * @property {boolean} loadingScene
         * @readOnly
         */
        loadingScene: {
            get: function () {
                return this._loadingScene;
            }
        },

        /**
         * @property {Fire.Vec2} canvasSize - Resize the rendering canvas.
         */
        canvasSize: NYI_Accessor(Fire.Vec2.zero),

        /**
         * The interval(ms) every time the engine force to repaint the scene in edit mode.
         * If don't need, set this to 0.
         * @property forceRepaintIntervalInEM
         * @type {Number}
         * @private
         */
        forceRepaintIntervalInEM: {
            default: 500,
            notify: FIRE_EDITOR && function () {
                if (this._forceRepaintId !== -1) {
                    clearInterval(this._forceRepaintId);
                }
                if (this.forceRepaintIntervalInEM > 0) {
                    var self = this;
                    this._forceRepaintId = setInterval(function () {
                        self.repaintInEditMode();
                    }, this.forceRepaintIntervalInEM);
                }
            }
        }
    },

    // TO OVERRIDE

    /**
     * @callback InitCallback
     * @param {string} [error] - null or the error info
     */

    /**
     * Initialize the runtime. This method will be called by init method.
     * @method initRuntime
     * @param {object} options
     * @param {number} options.width
     * @param {number} options.height
     * @param {Canvas} [options.canvas]
     * @param {InitCallback} callback
     */
    initRuntime: function (options, callback) {
        NYI();
        callback();
    },

    /**
     * Starts playback.
     * @method playRuntime
     */
    playRuntime: NYI,
    /**
     * Stops playback.
     * @method stopRuntime
     */
    stopRuntime: NYI,
    /**
     * Pauses playback.
     * @method pauseRuntime
     */
    pauseRuntime: NYI,
    /**
     * Resumes playback.
     * @method resumeRuntime
     */
    resumeRuntime: NYI,

    /**
     * Update phase, will not invoked in edit mode.
     * Use this method to update your engine logic, such as input logic and game logic.
     * @method updateRuntime
     */
    updateRuntime: NYI,
    /**
     * Animate phase, called after updateRuntime.
     * Use this method to update your particle and animation.
     * @method animateRuntime
     */
    animateRuntime: NYI,
    /**
     * Render phase, called after animateRuntime.
     * Use this method to render your scene.
     * @method renderRuntime
     */
    renderRuntime: NYI,

    ///**
    // * Steps playback.
    // * @method stepRuntime
    // */
    //stepRuntime: NYI,

    /**
     * Get the current running runtime scene.
     * @method getCurrentSceneN
     * @return {RuntimeNode}
     */
    getCurrentSceneN: NYI,

    /**
     * Set the current running runtime scene.
     * @method _setCurrentSceneN
     * @param {RuntimeNode}
     */
    _setCurrentSceneN: NYI,

    /**
     * This method will be invoke only if useDefaultMainLoop is true.
     * @method tick
     * @param {number} deltaTime
     * @param {boolean} updateLogic
     */
    tick: function (deltaTime, updateLogic) {
        if (updateLogic) {
            this.updateRuntime(deltaTime);
            this.animateRuntime(deltaTime);
            this.emit('post-update');
        }
        this.renderRuntime();
    },

    /**
     * This method will be invoked in edit mode even if useDefaultMainLoop is false.
     * @method tickInEditMode
     * @param {number} deltaTime
     * @param {boolean} updateAnimate
     */
    tickInEditMode: function (deltaTime, updateAnimate) {
        if (FIRE_EDITOR) {
            if (updateAnimate) {
                this.animateRuntime(deltaTime);
                this.emit('post-update');
            }
            this.renderRuntime();
        }
    },

    /**
     * Pick nodes that lie within a specified screen rectangle.
     * @method getIntersectionList
     * @param {Rect} rect - An rectangle specified with world coordinates.
     * @return {RuntimeNode[]}
     */
    getIntersectionList: NYI,

    // PUBLIC

    /**
     * Initialize the engine. This method will be called by boot.js or editor.
     * @method init
     * @param {object} options
     * @param {number} options.width
     * @param {number} options.height
     * @param {string} options.rawUrl
     * @param {Canvas} [options.canvas]
     * @param {initCallback} callback
     */
    init: function (options, callback) {
        if (this._isInitialized) {
            Fire.error('Engine already initialized');
            return;
        }
        this._isInitialized = true;

        this._sceneInfos = this._sceneInfos.concat(options.scenes);
        if (options.rawUrl) {
            Fire.url.rawUrl = Fire.Path.setEndWithSep(options.rawUrl, true, '/');
        }
        //Resources._resBundle.init(options.resBundle);

        Fire.Runtime.Helpers.init();

        var self = this;
        this.initRuntime(options, function (err) {
            if (!err) {
                if (FIRE_EDITOR && Editor.isPageLevel) {
                    var Register = require('../register');
                    Register.registerToCoreLevel();
                }
                //var scene = SceneWrapper.getCurrentSceneN()
                //if (editorCallback.onSceneLoaded) {
                //    editorCallback.onSceneLoaded(this._scene);
                //}
            }
            callback(err);

            if (FIRE_EDITOR) {
                // start main loop for editor after initialized
                self._tickStart();
                // start timer to force repaint the scene in edit mode
                self.forceRepaintIntervalInEM = self.forceRepaintIntervalInEM;
            }

            // create empty scene
            var scene = new (self.getCurrentScene().constructor)();
            scene.onAfterDeserialize();
            self._emptySceneN = scene.targetN;
        });
    },

    repaintInEditMode: function () {
        if (FIRE_EDITOR && !this._isUpdating) {
            this._shouldRepaintInEM = true;
        }
    },

    // OVERRIDE

    onError: function (error) {
        if (FIRE_EDITOR) {
            switch (error) {
                case 'already-playing':
                    Fire.warn('Fireball is already playing');
                    break;
            }
        }
    },
    onResume: function () {
        // if (FIRE_EDITOR) {
        //     FObject._clearDeferredDestroyTimer();
        //     editorCallback.onEnginePlayed(true);
        // }
        this.resumeRuntime();

        if (FIRE_EDITOR && !this._useDefaultMainLoop) {
            this._tickStop();
        }
    },
    onPause: function () {
        // if (FIRE_EDITOR) {
        //     editorCallback.onEnginePaused();
        // }
        this.pauseRuntime();

        if (FIRE_EDITOR) {
            // start tick for edit mode
            this._tickStart();
        }
    },
    onPlay: function () {
        //if (FIRE_EDITOR && ! this._isPaused) {
        //    FObject._clearDeferredDestroyTimer();
        //}

        this.playRuntime();

        this._shouldRepaintInEM = false;
        if (this._useDefaultMainLoop) {
            // reset timer for default main loop
            var now = Ticker.now();
            Time._restart(now);
            //
            if (FIRE_EDITOR) {
                this._tickStart();
            }
        }
        else if (FIRE_EDITOR) {
            // dont tick in play mode
            this._tickStop();
        }

        //if (FIRE_EDITOR) {
        //    editorCallback.onEnginePlayed(false);
        //}
    },

    onStop: function () {
        //FObject._deferredDestroy();

        this.stopRuntime();

        // reset states
        this._loadingScene = ''; // TODO: what if loading scene ?

        if (FIRE_EDITOR) {
            // start tick for edit mode
            this.repaintInEditMode();
            this._tickStart();
        }

        //if (FIRE_EDITOR) {
        //    editorCallback.onEngineStopped();
        //}
    },

    // PRIVATE

    /**
     * @method _tick
     * @private
     */
    _tick: function (unused) {
        this._requestId = Ticker.requestAnimationFrame(this._bindedTick);

        var now = Ticker.now();
        if (this._isUpdating || this._stepOnce) {
            // play mode

            //if (sceneLoadingQueue) {
            //    return;
            //}
            Time._update(now, false, this._stepOnce ? 1 / 60 : 0);
            this._stepOnce = false;

            //if (this._scene) {
                this.tick(Time.deltaTime, true);
            //}
        }
        else if (FIRE_EDITOR) {
            // edit mode
            Time._update(now, false, this.maxDeltaTimeInEM);
            if (this._shouldRepaintInEM || this.animatingInEditMode) {
                this.tickInEditMode(Time.deltaTime, this.animatingInEditMode);
                this._shouldRepaintInEM = false;
            }
        }
    },

    _tickStart: function () {
        if (this._requestId === -1) {
            this._tick();
        }
    },

    _tickStop: function () {
        if (this._requestId !== -1) {
            Ticker.cancelAnimationFrame(this._requestId);
            this._requestId = -1;
        }
    }
});

/**
 * @event node-attach-to-scene
 * @param {CustomEvent} event
 * @param {RuntimeNode} event.detail.targetN
 * @private
 */

/**
 * @event node-detach-from-scene
 * @param {CustomEvent} event
 * @param {RuntimeNode} event.detail.targetN
 * @private
 */

/**
 * @event post-update
 * @private
 */

/**
 * @event pre-launch-scene
 * @private
 */

module.exports = EngineWrapper;

},{"../register":64,"./utils":69}],67:[function(require,module,exports){
/**
 * @module Fire.Runtime
 */

var JS = Fire.JS;
var Vec2 = Fire.Vec2;
var Rect = Fire.Rect;
var Utils = require('./utils');
var NYI = Utils.NYI;
var NYI_Accessor = Utils.NYI_Accessor;
var Uuid = require('./uuid');

var INVISIBLE = {
    visible: false
};

var ERR_NaN = 'The %s must not be NaN';

/**
 * !#zh: 这个类用来封装编辑器针对节点的操作。
 * Note: 接口中以 "N" 结尾的使用的都是 Runtime 的原生 Node 类型。
 * !#en: This is a wrapper class for operating node with editor script
 * The instance of this class is a wrapper, not a node.
 * You can use `Fire(node)` to get the wrapper if you really want to
 * use these API on runtime nodes.
 * Note: API that has a suffix "N" return Runtime's native Node type
 *
 * You should override:
 * - createEmpty (static)
 * - name
 * - parentN
 * - childrenN
 * - position
 * - worldPosition
 * - rotation
 * - worldRotation
 * - scale
 * - worldScale
 * - getWorldBounds
 * - getWorldOrientedBounds
 * - transformPoints
 * - inverseTransformPoints
 * - onBeforeSerialize (so that the node's properties can be serialized in wrapper)
 * - createNode
 *
 * You may want to override:
 * - animatableInEditor (static)
 * - setSiblingIndex
 * - getSiblingIndex
 * - x
 * - y
 * - worldX
 * - worldY
 * - scaleX
 * - scaleY
 * - scenePosition
 * - attached
 * - onFocusInEditor
 * - onLostFocusInEditor
 *
 * @class NodeWrapper
 * @constructor
 * @param {RuntimeNode} node
 */
var NodeWrapper = Fire.Class({
    name: 'Fire.Runtime.NodeWrapper',
    extends: Fire.FObject,

    constructor: function () {
        /**
         * The targetN node to wrap.
         * @property targetN
         * @type {RuntimeNode}
         */
        this.targetN = arguments[0];
        if (this.targetN) {
            var uuid = this.uuid;
            if (uuid && FIRE_EDITOR) {
                Fire.engine.attachedWrappersForEditor[uuid] = this;
            }
            this.attached();
        }

        this.gizmo = null;
        this.mixinGizmos = [];

        //if (FIRE_EDITOR && !this.targetN) {
        //    Fire.warn('targetN of %s must be non-nil', JS.getClassName(this));
        //}
    },

    properties: {
        ///**
        // * The class ID of attached script.
        // * @property mixinId
        // * @type {string|string[]}
        // * @default ""
        // */
        //mixinId: {
        //    default: "",
        //    visible: false
        //},

        /**
         * The name of the node.
         * @property name
         * @type {string}
         */
        name: {
            get: function () {
                return '';
            },
            set: function (value) {
            }
        },

        /**
         * uuid
         * @property _id
         * @type {string}
         * @private
         */
        _id: {
            default: '',
            editorOnly: true
        },

        /**
         * !#en the UUID, must be type string, editor only
         * !#zh 节点的 UUID，是字符串类型，只能在编辑器里用
         * @property uuid
         * @type {string}
         * @readOnly
         */
        uuid: {
            get: function () {
                return this._id || (this._id = Uuid());
            },
            visible: false
        },

        // HIERARCHY

        /**
         * The runtime parent of the node.
         * If this is the top most node in hierarchy, the wrapper of its parent must be type SceneWrapper.
         * Changing the parent will keep the transform's local space position, rotation and scale the same but modify
         * the world space position, scale and rotation.
         * @property parentN
         * @type {RuntimeNode}
         */
        parentN: NYI_Accessor(null, INVISIBLE),

        /**
         * Returns the array of children. If no child, this method should return an empty array.
         * The returns array can be modified ONLY in setSiblingIndex.
         * @property childrenN
         * @type {RuntimeNode[]}
         * @readOnly
         */
        childrenN: NYI_Accessor([], INVISIBLE, true),

        // TRANSFORM

        /**
         * The local position in its parent's coordinate system
         * @property position
         * @type {Fire.Vec2}
         */
        position: NYI_Accessor(Vec2.zero),

        /**
         * The local x position in its parent's coordinate system
         * @property x
         * @type {number}
         */
        x: {
            get: function () {
                return this.position.x;
            },
            set: function (value) {
                if ( !isNaN(value) ) {
                    var p = this.position;
                    p.x = value;
                    this.position = p;
                }
                else {
                    Fire.error(ERR_NaN, 'new x');
                }
            },
            visible: false
        },

        /**
         * The local y position in its parent's coordinate system
         * @property y
         * @type {number}
         */
        y: {
            get: function () {
                return this.position.y;
            },
            set: function (value) {
                if ( !isNaN(value) ) {
                    var p = this.position;
                    p.y = value;
                    this.position = p;
                }
                else {
                    Fire.error(ERR_NaN, 'new y');
                }
            },
            visible: false
        },

        /**
         * The position of the transform in world space
         * @property worldPosition
         * @type {Fire.Vec2}
         */
        worldPosition: NYI_Accessor(Vec2.zero, INVISIBLE),

        /**
         * The x position of the transform in world space
         * @property worldX
         * @type {number}
         */
        worldX: {
            get: function () {
                return this.worldPosition.x;
            },
            set: function (value) {
                if ( !isNaN(value) ) {
                    var p = this.worldPosition;
                    p.x = value;
                    this.worldPosition = p;
                }
                else {
                    Fire.error(ERR_NaN, 'new worldX');
                }
            },
            visible: false
        },

        /**
         * The y position of the transform in world space
         * @property worldY
         * @type {number}
         */
        worldY: {
            get: function () {
                return this.worldPosition.y;
            },
            set: function (value) {
                if ( !isNaN(value) ) {
                    var p = this.worldPosition;
                    p.y = value;
                    this.worldPosition = p;
                }
                else {
                    Fire.error(ERR_NaN, 'new worldY');
                }
            },
            visible: false
        },

        /**
         * The clockwise degrees of rotation relative to the parent
         * @property rotation
         * @type {number}
         */
        rotation: NYI_Accessor(0, {
            tooltip: "The clockwise degrees of rotation relative to the parent"
        }),

        /**
         * The clockwise degrees of rotation in world space
         * @property worldRotation
         * @type {number}
         */
        worldRotation: NYI_Accessor(0, INVISIBLE),

        /**
         * The local scale factor relative to the parent
         * @property scale
         * @type {Fire.Vec2}
         */
        scale: NYI_Accessor(Vec2.one),

        /**
         * The local x scale factor relative to the parent
         * @property scaleX
         * @type {number}
         */
        scaleX: {
            get: function () {
                return this.scale.x;
            },
            set: function (value) {
                if ( !isNaN(value) ) {
                    var p = this.scale;
                    p.x = value;
                    this.scale = p;
                }
                else {
                    Fire.error(ERR_NaN, 'new scaleX');
                }
            },
            visible: false
        },

        /**
         * The local y scale factor relative to the parent
         * @property scaleY
         * @type {number}
         */
        scaleY: {
            get: function () {
                return this.scale.y;
            },
            set: function (value) {
                if ( !isNaN(value) ) {
                    var p = this.scale;
                    p.y = value;
                    this.scale = p;
                }
                else {
                    Fire.error(ERR_NaN, 'new scaleY');
                }
            },
            visible: false
        },

        /**
         * The lossy scale of the transform in world space (Read Only)
         * @property worldScale
         * @type {Fire.Vec2}
         * @readOnly
         */
        worldScale: NYI_Accessor(Vec2.one, INVISIBLE, true),

        root: {
            get: function () {
                var node = this;
                var next = node.parent;
                while (next) {
                    node = next;
                    next = next.parent;
                }
                return node;
            }
        }
    },

    statics: {
        ///**
        // * Creates a new node without any resources.
        // * @method createEmpty
        // * @return {RuntimeNode}
        // * @static
        // */
        //createEmpty: function () {
        //    if (FIRE_EDITOR) {
        //        Fire.error('Not yet implemented');
        //    }
        //    return null;
        //}

        /**
         * If true, the engine will keep updating this node in 60 fps when it is selected,
         * otherwise, it will update only if necessary
         * @property {Boolean} animatableInEditor
         * @default false
         * @static
         */
        animatableInEditor: false,

        /**
         * If false, Hierarchy will disallow to drag child into this node, and all children will be hidden.
         * @property {Boolean} canHaveChildrenInEditor
         * @default true
         * @static
         */
        canHaveChildrenInEditor: true
    },

    // SERIALIZATION

    /**
     * Creates a new node using the properties defined in this wrapper, the properties will be serialized in the scene.
     * Note: 不需要设置新节点的父子关系，也不需要设置 wrapper 的 targetN 为新节点.
     * @method createNode
     * @return {RuntimeNode} - the created node
     */
    createNode: function () {
        NYI();
        return null;
    },

    /**
     * 这个方法会在场景保存前调用，你可以将 node 的属性保存到 wrapper 的可序列化的 properties 中，
     * 以便在 createNode() 方法中重新设置好 node。
     * @method onBeforeSerialize
     */
    onBeforeSerialize: function () {
    },

    /**
     * Creates a new node and bind with this wrapper.
     * @method onAfterDeserialize
     */
    onAfterDeserialize: function () {
        var node = this.createNode();
        this.targetN = node;
        node._FB_wrapper = this;
        if (FIRE_EDITOR) {
            var uuid = this.uuid;
            if (uuid) {
                Fire.engine.attachedWrappersForEditor[uuid] = this;
            }
        }
        this.attached();
    },

    /**
     * Invoked after the wrapper's targetN is assigned. Override this method if you need to initialize your node.
     * @method attached
     */
    attached: function () {
    },

    ///**
    // * This method is called when the scene is saving, allowing you to return JSON to represent the state of your node.
    // * When the scene is later loaded, the data you returned is passed to the wrapper's deserialize method so you can
    // * restore the node.
    // * @method serialize
    // * @return {object} - a JSON represents the state of the targetN node
    // */
    //serialize: function (data) {
    //    if (FIRE_EDITOR) {
    //        Fire.error('Not yet implemented');
    //    }
    //    return null;
    //},
    //
    ///**
    // * @callback deserializeCallback
    // * @param {string} error - null or the error info
    // * @param {RuntimeNode} node - the loaded node or null
    // */
    //
    ///**
    // * Creates a new node using the state data from the last time the scene was serialized if the wrapper implements the serialize() method.
    // * @method deserializeAsync
    // * @param {object} data - the JSON data returned from serialize() method
    // * @param {deserializeCallback} callback - Should not being called in current tick.
    // *                                         If there's no async operation, use Fire.nextTick to simulate.
    // */
    //deserializeAsync: function (data, callback) {
    //    Fire.nextTick(callback, 'Not yet implemented', null);
    //},

    ///**
    // * Creates a new node using the state data from the last time the scene was serialized if the wrapper implements the serialize() method.
    // * @method deserialize
    // * @param {object} data - the JSON data returned from serialize() method
    // * @return {RuntimeNode}
    // */
    //deserialize: function (data) {
    //    if (FIRE_EDITOR) {
    //        Fire.error('Not yet implemented');
    //    }
    //    return null;
    //},

    // HIERARCHY

    /**
     * Get the sibling index.
     *
     * NOTE: If this node does not have parent and not belongs to the current scene,
     *       The return value will be -1
     *
     * @method getSiblingIndex
     * @return {number}
     */
    getSiblingIndex: function () {
        return Fire(this.parentN).childrenN.indexOf(this.targetN);
    },

    /**
     * Set the sibling index of this node.
     * (值越小越先渲染，-1 代表最后一个)
     *
     * @method setSiblingIndex
     * @param {number} index - new zero-based index of the node, -1 will move to the end of children.
     */
    setSiblingIndex: function (index) {
        var siblings = Fire(this.parentN).childrenN;
        var item = this.targetN;
        index = index !== -1 ? index : siblings.length - 1;
        var oldIndex = siblings.indexOf(item);
        if (index !== oldIndex) {
            siblings.splice(oldIndex, 1);
            if (index < siblings.length) {
                siblings.splice(index, 0, item);
            }
            else {
                siblings.push(item);
            }
        }
    },

    // TRANSFORM

    /**
     * Rotates this transform through point in world space by angle degrees.
     * @method rotateAround
     * @param {Fire.Vec2} point - the world point rotates through
     * @param {number} angle - degrees
     */
    rotateAround: function (point, angle) {
        var delta = this.worldPosition.subSelf(point);
        delta.rotateSelf(Math.deg2rad(angle));
        this.worldPosition = point.addSelf(delta);
        this.rotation += angle;
    },

    /**
     * Transforms position from local space to world space.
     * @method transformPointToWorld
     * @param {Vec2} point
     * @return {Vec2}
     */
    transformPointToWorld: NYI,

    /**
     * Transforms position from local space to world space.
     * @method transformPointToLocal
     * @param {Vec2} point
     * @return {Vec2}
     */
    transformPointToLocal: NYI,

    // RENDERER

    /**
     * Returns a "world" axis aligned bounding box(AABB) of the renderer.
     *
     * @method getWorldBounds
     * @param {Fire.Rect} [out] - optional, the receiving rect
     * @return {Fire.Rect} - the rect represented in world position
     */
    getWorldBounds: function (out) {
        NYI();
        return new Rect();
    },

    /**
     * Returns a "world" oriented bounding box(OBB) of the renderer.
     *
     * @method getWorldOrientedBounds
     * @param {Fire.Vec2} [out_bl] - optional, the vector to receive the world position of bottom left
     * @param {Fire.Vec2} [out_tl] - optional, the vector to receive the world position of top left
     * @param {Fire.Vec2} [out_tr] - optional, the vector to receive the world position of top right
     * @param {Fire.Vec2} [out_br] - optional, the vector to receive the world position of bottom right
     * @return {Fire.Vec2} - the array contains vectors represented in world position,
     *                    in the sequence of BottomLeft, TopLeft, TopRight, BottomRight
     */
    getWorldOrientedBounds: function (out_bl, out_tl, out_tr, out_br){
        NYI();
        return [Vec2.zero, Vec2.zero, Vec2.zero, Vec2.zero];
    },

    /**
     * @method onFocusInEditor
     */
    onFocusInEditor: null,

    /**
     * @method onLostFocusInEditor
     */
    onLostFocusInEditor: null,
});

Fire._setWrapperGetter(function (node) {
    if (node instanceof NodeWrapper) {
        Fire.warn('Fire accept argument of type runtime node, not wrapper.');
        return node;
    }
    if (!node) {
        return null;
    }
    var wrapper = node._FB_wrapper;
    if (!wrapper) {
        var Wrapper = Fire.getWrapperType(node);
        if (!Wrapper) {
            var getClassName = Fire.JS.getClassName;
            Fire.error('%s not registered for %s', getClassName(NodeWrapper), getClassName(node));
            return null;
        }
        wrapper = new Wrapper(node);
        node._FB_wrapper = wrapper;
    }
    return wrapper;
});

module.exports = NodeWrapper;

},{"./utils":69,"./uuid":70}],68:[function(require,module,exports){
/**
 * @module Fire.Runtime
 */

var NodeWrapper = require('./node');
var NYI = require('./utils').NYI;

/**
 * You should override:
 * - childrenN
 * - createNode
 * - position
 * - scale
 *
 * You may want to override:
 * - onBeforeSerialize (so that the scene's properties can be serialized in wrapper)
 * - preloadAssets (so that scene can load synchronously)
 *
 * @class SceneWrapper
 * @extends NodeWrapper
 * @constructor
 * @param {RuntimeNode} node - The root node of current stage.
 */
var SceneWrapper = Fire.Class({
    name: 'Fire.Runtime.SceneWrapper',
    extends: NodeWrapper,
    constructor: function () {
        this._dataToDeserialize = null;
    },

    properties: {
        parentN: {
            get: function () {
                return null;
            },
            set: function () {
                if (FIRE_DEV) {
                    Fire.error("Disallow to set scene's parent.");
                }
            }
        },
        scenePosition: {
            get: function () {
                return new Fire.Vec2(0, 0);
            },
            set: function () {
                Fire.error("Disallow to set scene's scenePosition.");
            },
            visible: false
        }
        /**
         * The local position in its parent's coordinate system.
         * This is used to simulate the panning of preview camera in edit mode.
         * @property position
         * @type {Fire.Vec2}
         */
        /**
         * The local scale factor relative to the parent.
         * This is used to simulate the zoom in and out of preview camera in edit mode.
         * @property scale
         * @type {Fire.Vec2}
         */
    },

    /**
     * Preload assets before scene loading.
     * @method preloadAssets
     * @param {Fire.Asset[]} assets
     * @param {function} callback
     * @param {string} callback.error
     */
    preloadAssets: function (assets, callback) {
        callback();
    },

    getSiblingIndex: function () {
        return 0;
    },

    setSiblingIndex: function (index) {
        if (FIRE_DEV) {
            if (index !== 0) {
                Fire.error("Disallow to change scene's sibling index.");
            }
        }
    }
});

module.exports = SceneWrapper;

},{"./node":67,"./utils":69}],69:[function(require,module,exports){
var JS = Fire.JS;

function NYI () {
    if (FIRE_EDITOR) {
        Fire.info('Not yet implemented');
    }
}

function NYI_Accessor (defVal, attrs, noSetter) {
    var prop = {
        get: function () {
            NYI();
            return defVal;
        }
    };
    if (!noSetter) {
        prop.set = NYI;
    }
    if (attrs) {
        return JS.mixin(prop, attrs);
    }
    else {
        return prop;
    }
}

module.exports = {
    NYI: NYI,
    NYI_Accessor: NYI_Accessor
};

},{}],70:[function(require,module,exports){
if (FIRE_TEST) {
    module.exports = function () {
        return '' + ((new Date()).getTime() + Math.random());
    };
}
else if (FIRE_EDITOR) {
    var Uuid = require('node-uuid');
    module.exports = function () {
        var uuid = Uuid.v4();
        return Editor.compressUuid(uuid);
    };
}
else {
    module.exports = function () {
        Fire.error('Can only use uuid inside editor.');
        return '';
    };
}

},{"node-uuid":undefined}]},{},[1])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJidWlsZC1lbnRyeSIsIi4uL2J1aWx0aW4vY2FudmFzLWFzc2V0cy9hc3NldC9hdWRpby1jbGlwLmpzIiwiLi4vYnVpbHRpbi9jYW52YXMtYXNzZXRzL2Fzc2V0L2JpdG1hcC1mb250LmpzIiwiLi4vYnVpbHRpbi9jYW52YXMtYXNzZXRzL2Fzc2V0L2NvZmZlZXNjcmlwdC5qcyIsIi4uL2J1aWx0aW4vY2FudmFzLWFzc2V0cy9hc3NldC9pbmRleC5qcyIsIi4uL2J1aWx0aW4vY2FudmFzLWFzc2V0cy9hc3NldC9qYXZhc2NyaXB0LmpzIiwiLi4vYnVpbHRpbi9jYW52YXMtYXNzZXRzL2Fzc2V0L3NjZW5lLmpzIiwiLi4vYnVpbHRpbi9jYW52YXMtYXNzZXRzL2Fzc2V0L3Nwcml0ZS5qcyIsIi4uL2J1aWx0aW4vY2FudmFzLWFzc2V0cy9hc3NldC90ZXh0dXJlLmpzIiwiLi4vYnVpbHRpbi9jYW52YXMtYXNzZXRzL2Fzc2V0L3R0Zi1mb250LmpzIiwicGFja2FnZS5qc29uIiwic3JjL2NvcmUvYXNzZXQtbGlicmFyeS5qcyIsInNyYy9jb3JlL2Fzc2V0LmpzIiwic3JjL2NvcmUvYXR0cmlidXRlLmpzIiwic3JjL2NvcmUvY2FsbGJhY2tzLWludm9rZXIuanMiLCJzcmMvY29yZS9jbGFzcy1uZXcuanMiLCJzcmMvY29yZS9jbGFzcy5qcyIsInNyYy9jb3JlL2RlZmluaXRpb24uanMiLCJzcmMvY29yZS9kZXNlcmlhbGl6ZS5qcyIsInNyYy9jb3JlL2VudW0uanMiLCJzcmMvY29yZS9ldmVudC9ldmVudC1saXN0ZW5lcnMuanMiLCJzcmMvY29yZS9ldmVudC9ldmVudC10YXJnZXQuanMiLCJzcmMvY29yZS9ldmVudC9ldmVudC5qcyIsInNyYy9jb3JlL2ZvYmplY3QuanMiLCJzcmMvY29yZS9pbmRleC5qcyIsInNyYy9jb3JlL2ludGVyc2VjdGlvbi5qcyIsInNyYy9jb3JlL2pzLmpzIiwic3JjL2NvcmUvbG9hZC1tYW5hZ2VyLmpzIiwic3JjL2NvcmUvbG9hZGVycy5qcyIsInNyYy9jb3JlL2xvZy5qcyIsInNyYy9jb3JlL21hdGguanMiLCJzcmMvY29yZS9wYXRoLmpzIiwic3JjL2NvcmUvcGxheWFibGUuanMiLCJzcmMvY29yZS9wb2x5Z29uLmpzIiwic3JjL2NvcmUvcHJlcHJvY2Vzcy1hdHRycy5qcyIsInNyYy9jb3JlL3JlcXVpcmluZy1mcmFtZS5qcyIsInNyYy9jb3JlL3RpY2tlci5qcyIsInNyYy9jb3JlL3RpbWUuanMiLCJzcmMvY29yZS91cmwuanMiLCJzcmMvY29yZS91dGlscy5qcyIsInNyYy9jb3JlL3ZhbHVlLXR5cGVzL2NvbG9yLmpzIiwic3JjL2NvcmUvdmFsdWUtdHlwZXMvaW5kZXguanMiLCJzcmMvY29yZS92YWx1ZS10eXBlcy9tYXRyaXgyMy5qcyIsInNyYy9jb3JlL3ZhbHVlLXR5cGVzL3JlY3QuanMiLCJzcmMvY29yZS92YWx1ZS10eXBlcy92YWx1ZS10eXBlLmpzIiwic3JjL2NvcmUvdmFsdWUtdHlwZXMvdmVjMi5qcyIsInNyYy9lZGl0b3IvZ2V0LWhpZXJhcmNoeS1kdW1wLmpzIiwic3JjL2VkaXRvci9nZXQtbm9kZS1kdW1wLmpzIiwic3JjL2VkaXRvci9pbmRleC5qcyIsInNyYy9lZGl0b3Ivc2VyaWFsaXplLW5pY2lmeS5qcyIsInNyYy9lZGl0b3Ivc2VyaWFsaXplLmpzIiwic3JjL2VkaXRvci9zZXQtcHJvcGVydHktYnktcGF0aC5qcyIsInNyYy9lZGl0b3IvdXRpbHMuanMiLCJzcmMvaW5kZXguanMiLCJzcmMvcG9seWZpbGwvYmluZC5qcyIsInNyYy9wb2x5ZmlsbC9pbmRleC5qcyIsInNyYy9ydW50aW1lL2JlaGF2aW9yLmpzIiwic3JjL3J1bnRpbWUvZXh0ZW5kcy9lbmdpbmUtZXh0ZW5kcy5qcyIsInNyYy9ydW50aW1lL2V4dGVuZHMvbm9kZS1leHRlbmRzLmpzIiwic3JjL3J1bnRpbWUvZXh0ZW5kcy9zY2VuZS1leHRlbmRzLmpzIiwic3JjL3J1bnRpbWUvaGVscGVycy5qcyIsInNyYy9ydW50aW1lL2luZGV4LmpzIiwic3JjL3J1bnRpbWUvbWl4aW4uanMiLCJzcmMvcnVudGltZS9yZWdpc3Rlci5qcyIsInNyYy9ydW50aW1lL3NldHRpbmdzLmpzIiwic3JjL3J1bnRpbWUvd3JhcHBlcnMvZW5naW5lLmpzIiwic3JjL3J1bnRpbWUvd3JhcHBlcnMvbm9kZS5qcyIsInNyYy9ydW50aW1lL3dyYXBwZXJzL3NjZW5lLmpzIiwic3JjL3J1bnRpbWUvd3JhcHBlcnMvdXRpbHMuanMiLCJzcmMvcnVudGltZS93cmFwcGVycy91dWlkLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4SEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyY0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDblhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2S0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDem1CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsZ0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN1NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9PQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdE1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcmdCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25OQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1SkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOU1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5SkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekpBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekxBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNURBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxT0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMVVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaFZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0Y0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25DQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1WUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNySUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5YUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4QkE7QUFDQTs7QUNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuT0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsT0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL01BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMURBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeE9BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNySkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdmZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNobUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6RkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsInJlcXVpcmUoJy4vc3JjJyk7XG5pZiAoIUZJUkVfVEVTVCkge1xuICAgIHJlcXVpcmUoJy4uL2J1aWx0aW4vY2FudmFzLWFzc2V0cy9hc3NldCcpO1xufVxuIiwiXG52YXIgQXVkaW9DbGlwID0gRmlyZS5DbGFzcyh7XG5cbiAgICBuYW1lOiAnRmlyZS5BdWRpb0NsaXAnLFxuXG4gICAgZXh0ZW5kczogRmlyZS5Bc3NldCxcblxuICAgIGNvbnN0cnVjdG9yOiBmdW5jdGlvbiAoKSB7XG4gICAgfSxcblxuICAgIHByb3BlcnRpZXM6IHtcblxuICAgIH0sXG59KTtcblxuRmlyZS5BdWRpb0NsaXAgPSBBdWRpb0NsaXA7XG5cbnJldHVybiBBdWRpb0NsaXA7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IChmdW5jdGlvbiAoKSB7XG5cbiAgICAvKipcbiAgICAgKiBDbGFzcyBmb3IgQml0bWFwRm9udCBoYW5kbGluZy5cbiAgICAgKlxuICAgICAqIEBjbGFzcyBCaXRtYXBGb250XG4gICAgICogQGV4dGVuZHMgQXNzZXRcbiAgICAgKiBAY29uc3RydWN0b3JcbiAgICAgKi9cbiAgICB2YXIgQml0bWFwRm9udCA9IEZpcmUuQ2xhc3Moe1xuXG4gICAgICAgIG5hbWU6ICdGaXJlLkJpdG1hcEZvbnQnLFxuXG4gICAgICAgIGV4dGVuZHM6IEZpcmUuQXNzZXQsXG5cbiAgICAgICAgY29uc3RydWN0b3I6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgfSxcblxuICAgICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgICAgICB0ZXh0dXJlOiB7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgICAgICAgICAgICB0eXBlOiBGaXJlLlRleHR1cmUsXG4gICAgICAgICAgICAgICAgdmlzaWJsZTogZmFsc2UsXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgfSk7XG5cbiAgICBGaXJlLkJpdG1hcEZvbnQgPSBCaXRtYXBGb250O1xuXG4gICAgcmV0dXJuIEJpdG1hcEZvbnQ7XG59KSgpO1xuIiwidmFyIENvZmZlZVNjcmlwdCA9IEZpcmUuQ2xhc3Moe1xuICAgIG5hbWU6ICdGaXJlLkNvZmZlZVNjcmlwdCcsXG4gICAgZXh0ZW5kczogRmlyZS5Bc3NldCxcblxuICAgIHByb3BlcnRpZXM6IHtcbiAgICB9LFxufSk7XG5cbkZpcmUuQ29mZmVlU2NyaXB0ID0gQ29mZmVlU2NyaXB0O1xubW9kdWxlLmV4cG9ydHMgPSBDb2ZmZWVTY3JpcHQ7XG4iLCIvLyBVc2UgdGhpcyBmaWxlIHRvIGJyb3dzZXJpZnlcblxucmVxdWlyZSgnLi90ZXh0dXJlJyk7XG5yZXF1aXJlKCcuL3Nwcml0ZScpO1xucmVxdWlyZSgnLi9iaXRtYXAtZm9udCcpO1xucmVxdWlyZSgnLi90dGYtZm9udCcpO1xucmVxdWlyZSgnLi9qYXZhc2NyaXB0Jyk7XG5yZXF1aXJlKCcuL2NvZmZlZXNjcmlwdCcpO1xucmVxdWlyZSgnLi9zY2VuZScpO1xucmVxdWlyZSgnLi9hdWRpby1jbGlwJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gW1xuICAgICd0ZXh0dXJlJyxcbiAgICAnc3ByaXRlJyxcbiAgICAnYml0bWFwLWZvbnQnLFxuICAgICd0dGYtZm9udCcsXG4gICAgJ2phdmFzY3JpcHQnLFxuICAgICdjb2ZmZWVzY3JpcHQnLFxuICAgICdzY2VuZScsXG4gICAgJ2F1ZGlvLWNsaXAnXG5dO1xuIiwidmFyIEphdmFTY3JpcHQgPSBGaXJlLkNsYXNzKHtcbiAgICBuYW1lOiAnRmlyZS5KYXZhU2NyaXB0JyxcbiAgICBleHRlbmRzOiBGaXJlLkFzc2V0LFxuXG4gICAgcHJvcGVydGllczoge1xuICAgIH0sXG59KTtcblxuRmlyZS5KYXZhU2NyaXB0ID0gSmF2YVNjcmlwdDtcbm1vZHVsZS5leHBvcnRzID0gSmF2YVNjcmlwdDtcbiIsInZhciBTY2VuZSA9IEZpcmUuQ2xhc3Moe1xuICAgIG5hbWU6ICdGaXJlLlNjZW5lJyxcbiAgICBleHRlbmRzOiBGaXJlLkFzc2V0LFxuXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICBzY2VuZTogbnVsbFxuICAgIH0sXG59KTtcblxuRmlyZS5TY2VuZSA9IFNjZW5lO1xubW9kdWxlLmV4cG9ydHMgPSBTY2VuZTtcbiIsIm1vZHVsZS5leHBvcnRzID0gKGZ1bmN0aW9uICgpIHtcblxuICAgIC8qKlxuICAgICAqIFJlcHJlc2VudHMgYSBTcHJpdGUgb2JqZWN0IHdoaWNoIG9idGFpbmVkIGZyb20gVGV4dHVyZS5cbiAgICAgKiBAY2xhc3MgU3ByaXRlXG4gICAgICogQGV4dGVuZHMgQXNzZXRcbiAgICAgKiBAY29uc3RydWN0b3JcbiAgICAgKiBAcGFyYW0ge0ltYWdlfSBbaW1nXSAtIFNwZWNpZnkgdGhlIGh0bWwgaW1hZ2UgZWxlbWVudCB0byByZW5kZXIgc28geW91IGNhbiBjcmVhdGUgU3ByaXRlIGR5bmFtaWNhbGx5LlxuICAgICAqL1xuICAgIHZhciBTcHJpdGUgPSBGaXJlLkNsYXNzKHtcblxuICAgICAgICBuYW1lOiAnRmlyZS5TcHJpdGUnLFxuXG4gICAgICAgIGV4dGVuZHM6IEZpcmUuQXNzZXQsXG5cbiAgICAgICAgY29uc3RydWN0b3I6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBpbWcgPSBhcmd1bWVudHNbMF07XG4gICAgICAgICAgICBpZiAoaW1nKSB7XG4gICAgICAgICAgICAgICAgdGhpcy50ZXh0dXJlID0gbmV3IEZpcmUuVGV4dHVyZShpbWcpO1xuICAgICAgICAgICAgICAgIHRoaXMud2lkdGggPSBpbWcud2lkdGg7XG4gICAgICAgICAgICAgICAgdGhpcy5oZWlnaHQgPSBpbWcuaGVpZ2h0O1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIEBwcm9wZXJ0eSBwaXZvdFxuICAgICAgICAgICAgICogQHR5cGUgVmVjMlxuICAgICAgICAgICAgICogQGRlZmF1bHQgbmV3IEZpcmUuVmVjMigwLjUsIDAuNSlcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgcGl2b3Q6IHtcbiAgICAgICAgICAgICAgICBkZWZhdWx0OiBuZXcgRmlyZS5WZWMyKDAuNSwgMC41KSxcbiAgICAgICAgICAgICAgICB0b29sdGlwOiAnVGhlIHBpdm90IGlzIG5vcm1hbGl6ZWQsIGxpa2UgYSBwZXJjZW50YWdlLlxcbicgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICcoMCwwKSBtZWFucyB0aGUgYm90dG9tLWxlZnQgY29ybmVyIGFuZCAoMSwxKSBtZWFucyB0aGUgdG9wLXJpZ2h0IGNvcm5lci5cXG4nICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAnQnV0IHlvdSBjYW4gdXNlIHZhbHVlcyBoaWdoZXIgdGhhbiAoMSwxKSBhbmQgbG93ZXIgdGhhbiAoMCwwKSB0b28uJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIC8vIHRyaW0gaW5mb1xuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBAcHJvcGVydHkgdHJpbVhcbiAgICAgICAgICAgICAqIEB0eXBlIG51bWJlclxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICB0cmltWDoge1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6IDAsXG4gICAgICAgICAgICAgICAgdHlwZTogRmlyZS5JbnRlZ2VyXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBAcHJvcGVydHkgdHJpbVlcbiAgICAgICAgICAgICAqIEB0eXBlIG51bWJlclxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICB0cmltWToge1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6IDAsXG4gICAgICAgICAgICAgICAgdHlwZTogRmlyZS5JbnRlZ2VyXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBAcHJvcGVydHkgd2lkdGhcbiAgICAgICAgICAgICAqIEB0eXBlIG51bWJlclxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICB3aWR0aDoge1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6IDAsXG4gICAgICAgICAgICAgICAgdHlwZTogRmlyZS5JbnRlZ2VyXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBAcHJvcGVydHkgaGVpZ2h0XG4gICAgICAgICAgICAgKiBAdHlwZSBudW1iZXJcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgaGVpZ2h0OiB7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDogMCxcbiAgICAgICAgICAgICAgICB0eXBlOiBGaXJlLkludGVnZXJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIEBwcm9wZXJ0eSB0ZXh0dXJlXG4gICAgICAgICAgICAgKiBAdHlwZSBUZXh0dXJlXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHRleHR1cmU6IHtcbiAgICAgICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgICAgICAgICAgIHR5cGU6IEZpcmUuVGV4dHVyZSxcbiAgICAgICAgICAgICAgICB2aXNpYmxlOiBmYWxzZVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogQHByb3BlcnR5IHJvdGF0ZWRcbiAgICAgICAgICAgICAqIEB0eXBlIGJvb2xlYW5cbiAgICAgICAgICAgICAqIEBkZWZhdWx0IGZhbHNlXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHJvdGF0ZWQ6IHtcbiAgICAgICAgICAgICAgICBkZWZhdWx0OiBmYWxzZSxcbiAgICAgICAgICAgICAgICB2aXNpYmxlOiBmYWxzZVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIC8vIHJhdyB0ZXh0dXJlIGluZm8gKHVzZWQgZm9yIHRleHR1cmUtb2Zmc2V0IGNhbGN1bGF0aW9uKVxuXG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIHV2IG9mIHRoZSBzcHJpdGUgaW4gYXRsYXMtdGV4dHVyZVxuICAgICAgICAgICAgICogQHByb3BlcnR5IHhcbiAgICAgICAgICAgICAqIEB0eXBlIG51bWJlclxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICB4OiB7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDogMCxcbiAgICAgICAgICAgICAgICB0eXBlOiBGaXJlLkludGVnZXIsXG4gICAgICAgICAgICAgICAgdmlzaWJsZTogZmFsc2VcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIHV2IG9mIHRoZSBzcHJpdGUgaW4gYXRsYXMtdGV4dHVyZVxuICAgICAgICAgICAgICogQHByb3BlcnR5IHlcbiAgICAgICAgICAgICAqIEB0eXBlIG51bWJlclxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICB5OiB7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDogMCxcbiAgICAgICAgICAgICAgICB0eXBlOiBGaXJlLkludGVnZXIsXG4gICAgICAgICAgICAgICAgdmlzaWJsZTogZmFsc2VcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogQHByb3BlcnR5IHJhd1dpZHRoXG4gICAgICAgICAgICAgKiBAdHlwZSBudW1iZXJcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgcmF3V2lkdGg6IHtcbiAgICAgICAgICAgICAgICBkZWZhdWx0OiAwLFxuICAgICAgICAgICAgICAgIHR5cGU6IEZpcmUuSW50ZWdlcixcbiAgICAgICAgICAgICAgICB2aXNpYmxlOiBmYWxzZVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogQHByb3BlcnR5IHJhd0hlaWdodFxuICAgICAgICAgICAgICogQHR5cGUgbnVtYmVyXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHJhd0hlaWdodDoge1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6IDAsXG4gICAgICAgICAgICAgICAgdHlwZTogRmlyZS5JbnRlZ2VyLFxuICAgICAgICAgICAgICAgIHZpc2libGU6IGZhbHNlXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBVc2UgcGl4ZWwtbGV2ZWwgaGl0IHRlc3RpbmcuXG4gICAgICAgICAgICAgKiBAcHJvcGVydHkgcGl4ZWxMZXZlbEhpdFRlc3RcbiAgICAgICAgICAgICAqIEB0eXBlIGJvb2xlYW5cbiAgICAgICAgICAgICAqIEBkZWZhdWx0IGZhbHNlXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHBpeGVsTGV2ZWxIaXRUZXN0OiB7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDogZmFsc2UsXG4gICAgICAgICAgICAgICAgdG9vbHRpcDogJ1VzZSBwaXhlbC1sZXZlbCBoaXQgdGVzdGluZy4nXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBUaGUgaGlnaGVzdCBhbHBoYSBjaGFubmVsIHZhbHVlIHRoYXQgaXMgY29uc2lkZXJlZCBvcGFxdWUgZm9yIGhpdCB0ZXN0LiBbMCwgMV1cbiAgICAgICAgICAgICAqIEBwcm9wZXJ0eSBhbHBoYVRocmVzaG9sZFxuICAgICAgICAgICAgICogQHR5cGUgbnVtYmVyXG4gICAgICAgICAgICAgKiBAZGVmYXVsdCAwLjFcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgYWxwaGFUaHJlc2hvbGQ6IHtcbiAgICAgICAgICAgICAgICBkZWZhdWx0OiAwLjEsXG4gICAgICAgICAgICAgICAgdG9vbHRpcDogJ1RoZSBoaWdoZXN0IGFscGhhIGNoYW5uZWwgdmFsdWUgdGhhdCBpcyBjb25zaWRlcmVkIG9wYXF1ZSBmb3IgaGl0IHRlc3QuJyxcbiAgICAgICAgICAgICAgICB3YXRjaDoge1xuICAgICAgICAgICAgICAgICAgICAncGl4ZWxMZXZlbEhpdFRlc3QnOiBmdW5jdGlvbiAob2JqLCBwcm9wRUwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb3BFTC5kaXNhYmxlZCA9ICFvYmoucGl4ZWxMZXZlbEhpdFRlc3Q7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBUb3AgYm9yZGVyIG9mIHRoZSBzcHJpdGVcbiAgICAgICAgICAgICAqIEBwcm9wZXJ0eSBib3JkZXJUb3BcbiAgICAgICAgICAgICAqIEB0eXBlIG51bWJlclxuICAgICAgICAgICAgICogQGRlZmF1bHQgMFxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBib3JkZXJUb3A6IHtcbiAgICAgICAgICAgICAgICBkZWZhdWx0OiAwLFxuICAgICAgICAgICAgICAgIHR5cGU6IEZpcmUuSW50ZWdlclxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogQm90dG9tIGJvcmRlciBvZiB0aGUgc3ByaXRlXG4gICAgICAgICAgICAgKiBAcHJvcGVydHkgYm9yZGVyVG9wXG4gICAgICAgICAgICAgKiBAdHlwZSBudW1iZXJcbiAgICAgICAgICAgICAqIEBkZWZhdWx0IDBcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgYm9yZGVyQm90dG9tOiB7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDogMCxcbiAgICAgICAgICAgICAgICB0eXBlOiBGaXJlLkludGVnZXJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIExlZnQgYm9yZGVyIG9mIHRoZSBzcHJpdGVcbiAgICAgICAgICAgICAqIEBwcm9wZXJ0eSBib3JkZXJUb3BcbiAgICAgICAgICAgICAqIEB0eXBlIG51bWJlclxuICAgICAgICAgICAgICogQGRlZmF1bHQgMFxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBib3JkZXJMZWZ0OiB7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDogMCxcbiAgICAgICAgICAgICAgICB0eXBlOiBGaXJlLkludGVnZXJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIFJpZ2h0IGJvcmRlciBvZiB0aGUgc3ByaXRlXG4gICAgICAgICAgICAgKiBAcHJvcGVydHkgYm9yZGVyVG9wXG4gICAgICAgICAgICAgKiBAdHlwZSBudW1iZXJcbiAgICAgICAgICAgICAqIEBkZWZhdWx0IDBcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgYm9yZGVyUmlnaHQ6IHtcbiAgICAgICAgICAgICAgICBkZWZhdWx0OiAwLFxuICAgICAgICAgICAgICAgIHR5cGU6IEZpcmUuSW50ZWdlclxuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBAcHJvcGVydHkgcm90YXRlZFdpZHRoXG4gICAgICAgICAgICAgKiBAdHlwZSBudW1iZXJcbiAgICAgICAgICAgICAqIEByZWFkT25seVxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICByb3RhdGVkV2lkdGg6IHtcbiAgICAgICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucm90YXRlZCA/IHRoaXMuaGVpZ2h0IDogdGhpcy53aWR0aDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIEBwcm9wZXJ0eSByb3RhdGVkSGVpZ2h0XG4gICAgICAgICAgICAgKiBAdHlwZSBudW1iZXJcbiAgICAgICAgICAgICAqIEByZWFkT25seVxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICByb3RhdGVkSGVpZ2h0OiB7XG4gICAgICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnJvdGF0ZWQgPyB0aGlzLndpZHRoIDogdGhpcy5oZWlnaHQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBGaXJlLlNwcml0ZSA9IFNwcml0ZTtcblxuICAgIHJldHVybiBTcHJpdGU7XG59KSgpO1xuIiwibW9kdWxlLmV4cG9ydHMgPSAoZnVuY3Rpb24gKCkge1xuXG4gICAgdmFyIGNhbnZhc0N0eFRvR2V0UGl4ZWwgPSBudWxsO1xuXG4gICAgLyoqXG4gICAgICogQGNsYXNzIFdyYXBNb2RlXG4gICAgICogQHN0YXRpY1xuICAgICAqIEBuYW1lc3BhY2UgVGV4dHVyZVxuICAgICAqL1xuICAgIHZhciBXcmFwTW9kZSA9IEZpcmUuZGVmaW5lRW51bSh7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAcHJvcGVydHkgUmVwZWF0XG4gICAgICAgICAqIEB0eXBlIG51bWJlclxuICAgICAgICAgKi9cbiAgICAgICAgUmVwZWF0OiAtMSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBwcm9wZXJ0eSBDbGFtcFxuICAgICAgICAgKiBAdHlwZSBudW1iZXJcbiAgICAgICAgICovXG4gICAgICAgIENsYW1wOiAtMVxuICAgIH0pO1xuXG4gICAgLyoqXG4gICAgICogQGNsYXNzIEZpbHRlck1vZGVcbiAgICAgKiBAc3RhdGljXG4gICAgICogQG5hbWVzcGFjZSBUZXh0dXJlXG4gICAgICovXG4gICAgdmFyIEZpbHRlck1vZGUgPSBGaXJlLmRlZmluZUVudW0oe1xuICAgICAgICAvKipcbiAgICAgICAgICogQHByb3BlcnR5IFBvaW50XG4gICAgICAgICAqIEB0eXBlIG51bWJlclxuICAgICAgICAgKi9cbiAgICAgICAgUG9pbnQ6IC0xLFxuICAgICAgICAvKipcbiAgICAgICAgICogQHByb3BlcnR5IEJpbGluZWFyXG4gICAgICAgICAqIEB0eXBlIG51bWJlclxuICAgICAgICAgKi9cbiAgICAgICAgQmlsaW5lYXI6IC0xLFxuICAgICAgICAvKipcbiAgICAgICAgICogQHByb3BlcnR5IFRyaWxpbmVhclxuICAgICAgICAgKiBAdHlwZSBudW1iZXJcbiAgICAgICAgICovXG4gICAgICAgIFRyaWxpbmVhcjogLTFcbiAgICB9KTtcblxuICAgIC8qKlxuICAgICAqIENsYXNzIGZvciB0ZXh0dXJlIGhhbmRsaW5nLlxuICAgICAqIFVzZSB0aGlzIHRvIGNyZWF0ZSB0ZXh0dXJlcyBvbiB0aGUgZmx5IG9yIHRvIG1vZGlmeSBleGlzdGluZyB0ZXh0dXJlIGFzc2V0cy5cbiAgICAgKlxuICAgICAqIEBjbGFzcyBUZXh0dXJlXG4gICAgICogQGV4dGVuZHMgQXNzZXRcbiAgICAgKiBAY29uc3RydWN0b3JcbiAgICAgKiBAcGFyYW0ge0ltYWdlfSBbaW1nXSAtIHRoZSBodG1sIGltYWdlIGVsZW1lbnQgdG8gcmVuZGVyXG4gICAgICovXG4gICAgdmFyIFRleHR1cmUgPSBGaXJlLkNsYXNzKHtcblxuICAgICAgICBuYW1lOiAnRmlyZS5UZXh0dXJlJyxcblxuICAgICAgICBleHRlbmRzOiBGaXJlLkFzc2V0LFxuXG4gICAgICAgIGNvbnN0cnVjdG9yOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgaW1nID0gYXJndW1lbnRzWzBdO1xuICAgICAgICAgICAgaWYgKGltZykge1xuICAgICAgICAgICAgICAgIHRoaXMud2lkdGggPSBpbWcud2lkdGg7XG4gICAgICAgICAgICAgICAgdGhpcy5oZWlnaHQgPSBpbWcuaGVpZ2h0O1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogQHByb3BlcnR5IHdpZHRoXG4gICAgICAgICAgICAgKiBAdHlwZSBudW1iZXJcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgd2lkdGg6IHtcbiAgICAgICAgICAgICAgICBkZWZhdWx0OiAwLFxuICAgICAgICAgICAgICAgIHR5cGU6IEZpcmUuSW50ZWdlcixcbiAgICAgICAgICAgICAgICByZWFkb25seTogdHJ1ZVxuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBAcHJvcGVydHkgaGVpZ2h0XG4gICAgICAgICAgICAgKiBAdHlwZSBudW1iZXJcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgaGVpZ2h0OiB7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDogMCxcbiAgICAgICAgICAgICAgICB0eXBlOiBGaXJlLkludGVnZXIsXG4gICAgICAgICAgICAgICAgcmVhZG9ubHk6IHRydWVcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogQHByb3BlcnR5IHdyYXBNb2RlXG4gICAgICAgICAgICAgKiBAdHlwZSBUZXh0dXJlLldyYXBNb2RlXG4gICAgICAgICAgICAgKiBAZGVmYXVsdCBUZXh0dXJlLldyYXBNb2RlLkNsYW1wXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHdyYXBNb2RlOiB7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDogV3JhcE1vZGUuQ2xhbXAsXG4gICAgICAgICAgICAgICAgdHlwZTogV3JhcE1vZGUsXG4gICAgICAgICAgICAgICAgcmVhZG9ubHk6IHRydWVcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogQHByb3BlcnR5IGZpbHRlck1vZGVcbiAgICAgICAgICAgICAqIEB0eXBlIFRleHR1cmUuRmlsdGVyTW9kZVxuICAgICAgICAgICAgICogQGRlZmF1bHQgVGV4dHVyZS5GaWx0ZXJNb2RlLkJpbGluZWFyXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIGZpbHRlck1vZGU6IHtcbiAgICAgICAgICAgICAgICBkZWZhdWx0OiBGaWx0ZXJNb2RlLkJpbGluZWFyLFxuICAgICAgICAgICAgICAgIHR5cGU6IEZpbHRlck1vZGUsXG4gICAgICAgICAgICAgICAgcmVhZG9ubHk6IHRydWVcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICB9KTtcblxuICAgIFRleHR1cmUuV3JhcE1vZGUgPSBXcmFwTW9kZTtcbiAgICBUZXh0dXJlLkZpbHRlck1vZGUgPSBGaWx0ZXJNb2RlO1xuXG4gICAgRmlyZS5UZXh0dXJlID0gVGV4dHVyZTtcblxuICAgIHJldHVybiBUZXh0dXJlO1xufSkoKTtcbiIsIm1vZHVsZS5leHBvcnRzID0gKGZ1bmN0aW9uICgpIHtcblxuICAgIHZhciBUVEZGb250ID0gRmlyZS5DbGFzcyh7XG5cbiAgICAgICAgbmFtZTogJ0ZpcmUuVFRGRm9udCcsXG5cbiAgICAgICAgZXh0ZW5kczogRmlyZS5Bc3NldCxcblxuICAgICAgICBjb25zdHJ1Y3RvcjogZnVuY3Rpb24gKCkge1xuICAgICAgICB9LFxuXG4gICAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgICAgIGZvbnRGYW1pbHk6IHtcbiAgICAgICAgICAgICAgICBkZWZhdWx0OiAnJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgIH0pO1xuXG4gICAgRmlyZS5UVEZGb250ID0gVFRGRm9udDtcblxuICAgIHJldHVybiBUVEZGb250O1xufSkoKTtcbiIsIm1vZHVsZS5leHBvcnRzPXtcbiAgXCJuYW1lXCI6IFwiZW5naW5lLWZyYW1ld29ya1wiLFxuICBcInZlcnNpb25cIjogXCIwLjEuMFwiLFxuICBcImRlc2NyaXB0aW9uXCI6IFwiQSBzaW1wbGUgZnJhbWV3b3JrIGZvciBjb25uZWN0aW5nIEZpcmViYWxsIEVkaXRvciBhbmQgb3RoZXIgZ2FtZSBlbmdpbmVzXCIsXG4gIFwiaG9tZXBhZ2VcIjogXCJodHRwOi8vZmlyZWJhbGwteC5jb21cIixcbiAgXCJyZXBvc2l0b3J5XCI6IHtcbiAgICBcInR5cGVcIjogXCJnaXRcIixcbiAgICBcInVybFwiOiBcImh0dHBzOi8vZ2l0aHViLmNvbS9maXJlYmFsbC14L2VuZ2luZS1mcmFtZXdvcmsuZ2l0XCJcbiAgfSxcbiAgXCJhdXRob3JcIjogXCJGaXJlYm94IFRlY2hub2xvZ3lcIixcbiAgXCJsaWNlbnNlXCI6IFwiTUlUXCIsXG4gIFwiYnVnc1wiOiBcImh0dHBzOi8vZ2l0aHViLmNvbS9maXJlYmFsbC14L2VkaXRvci1mcmFtZXdvcmsvaXNzdWVzXCIsXG4gIFwic2NyaXB0c1wiOiB7XG4gICAgXCJ0ZXN0XCI6IFwiZ3VscCB0ZXN0XCJcbiAgfSxcbiAgXCJkZXBlbmRlbmNpZXNcIjoge1xuICAgIFwibm9kZS11dWlkXCI6IFwiMS40LjJcIlxuICB9LFxuICBcImRldkRlcGVuZGVuY2llc1wiOiB7XG4gICAgXCJicm93c2VyaWZ5XCI6IFwiMTAuMi4zXCIsXG4gICAgXCJkZWxcIjogXCIxLjIuMFwiLFxuICAgIFwiZ3VscFwiOiBcIjMuOC4xMVwiLFxuICAgIFwiZ3VscC1jYWNoZWRcIjogXCIxLjAuMVwiLFxuICAgIFwiZ3VscC1mYlwiOiBcIjAuMC45XCIsXG4gICAgXCJndWxwLWhlYWRlclwiOiBcIjEuMi4yXCIsXG4gICAgXCJndWxwLWpzaGludFwiOiBcIjEuMTEuMFwiLFxuICAgIFwiZ3VscC1taXJyb3JcIjogXCIwLjQuMFwiLFxuICAgIFwiZ3VscC1wbHVtYmVyXCI6IFwiMC42LjZcIixcbiAgICBcImd1bHAtcmVuYW1lXCI6IFwiMS4yLjJcIixcbiAgICBcImd1bHAtc291cmNlbWFwc1wiOiBcIjEuNS4yXCIsXG4gICAgXCJndWxwLXVnbGlmeVwiOiBcIjEuMi4wXCIsXG4gICAgXCJndWxwLXV0aWxcIjogXCIzLjAuNVwiLFxuICAgIFwianNoaW50LXN0eWxpc2hcIjogXCIyLjAuMFwiLFxuICAgIFwicmVxdWlyZS1kaXJcIjogXCIwLjEuMFwiLFxuICAgIFwidmlueWwtYnVmZmVyXCI6IFwiMS4wLjBcIixcbiAgICBcInZpbnlsLXNvdXJjZS1zdHJlYW1cIjogXCIxLjAuMFwiXG4gIH1cbn1cbiIsInZhciBKUyA9IHJlcXVpcmUoJy4vanMnKTtcbnZhciBBc3NldCA9IEZpcmUuQXNzZXQ7XG52YXIgY2FsbEluTmV4dFRpY2sgPSByZXF1aXJlKCcuL3V0aWxzJykuY2FsbEluTmV4dFRpY2s7XG52YXIgTG9hZE1hbmFnZXIgPSByZXF1aXJlKCcuL2xvYWQtbWFuYWdlcicpO1xudmFyIEpzb25Mb2FkZXIgPSByZXF1aXJlKCcuL2xvYWRlcnMnKS5Kc29uTG9hZGVyO1xuXG5cbi8qKlxuICogVGhlIGFzc2V0IGxpYnJhcnkgd2hpY2ggbWFuYWdpbmcgbG9hZGluZy91bmxvYWRpbmcgYXNzZXRzIGluIHByb2plY3QuXG4gKlxuICogQGNsYXNzIEFzc2V0TGlicmFyeVxuICogQHN0YXRpY1xuICovXG52YXIgQXNzZXRMaWJyYXJ5ID0gKGZ1bmN0aW9uICgpIHtcblxuICAgIC8vIGNvbmZpZ3NcblxuICAgIHZhciBfbGlicmFyeUJhc2UgPSAnJztcblxuICAgIC8vIHZhcmlhYmxlc1xuXG4gICAgLy8gdGhlIGxvYWRpbmcgdXVpZCdzIGNhbGxiYWNrc1xuICAgIHZhciBfdXVpZFRvQ2FsbGJhY2tzID0gbmV3IEZpcmUuQ2FsbGJhY2tzSW52b2tlcigpO1xuXG4gICAgLy8gdGVtcCBkZXNlcmlhbGl6ZSBpbmZvXG4gICAgdmFyIF90ZEluZm8gPSBuZXcgRmlyZS5fRGVzZXJpYWxpemVJbmZvKCk7XG5cbiAgICAvLyBjcmVhdGUgYSBsb2FkaW5nIGNvbnRleHQgd2hpY2ggcmVzZXJ2ZXMgYWxsIHJlbGV2YW50IHBhcmFtZXRlcnNcbiAgICBmdW5jdGlvbiBMb2FkaW5nSGFuZGxlIChyZWFkTWFpbkNhY2hlLCB3cml0ZU1haW5DYWNoZSwgcmVjb3JkQXNzZXRzKSB7XG4gICAgICAgIC8vdGhpcy5yZWFkTWFpbkNhY2hlID0gcmVhZE1haW5DYWNoZTtcbiAgICAgICAgLy90aGlzLndyaXRlTWFpbkNhY2hlID0gd3JpdGVNYWluQ2FjaGU7XG5cbiAgICAgICAgLy8gRk9SQ0UgaWdub3JlIGdsb2JhbCBjYWNoZSBpbiBmaXJlYmFsbCBsaXRlXG4gICAgICAgIHRoaXMucmVhZE1haW5DYWNoZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLndyaXRlTWFpbkNhY2hlID0gZmFsc2U7XG5cbiAgICAgICAgdmFyIG5lZWRJbmRpZUNhY2hlID0gISh0aGlzLnJlYWRNYWluQ2FjaGUgJiYgdGhpcy53cml0ZU1haW5DYWNoZSk7XG4gICAgICAgIHRoaXMudGFza0luZGllQ2FjaGUgPSBuZWVkSW5kaWVDYWNoZSA/IHt9IDogbnVsbDtcblxuICAgICAgICAvLyDpnIDopoHorqnlnLrmma8gcHJlbG9hZCDnmoQgYXNzZXTvvIjmiYDmnInljIXlkKsgcmF3IGZpbGUg5ZCO57yA5ZCN55qEIGFzc2V0IOW5tuS4lOS4jeWQqyByYXdUeXBlIOWxnuaAp+eahCBhc3NldO+8iVxuICAgICAgICB0aGlzLmFzc2V0c05lZWRQb3N0TG9hZCA9IHJlY29yZEFzc2V0cyA/IFtdIDogbnVsbDtcbiAgICB9XG4gICAgTG9hZGluZ0hhbmRsZS5wcm90b3R5cGUucmVhZENhY2hlID0gZnVuY3Rpb24gKHV1aWQpIHtcbiAgICAgICAgaWYgKHRoaXMucmVhZE1haW5DYWNoZSAmJiB0aGlzLndyaXRlTWFpbkNhY2hlKSB7XG4gICAgICAgICAgICByZXR1cm4gQXNzZXRMaWJyYXJ5Ll91dWlkVG9Bc3NldFt1dWlkXTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnJlYWRNYWluQ2FjaGUpIHtcbiAgICAgICAgICAgICAgICAvLyB3cml0ZU1haW5DYWNoZSA9PSBmYWxzZVxuICAgICAgICAgICAgICAgIHJldHVybiBBc3NldExpYnJhcnkuX3V1aWRUb0Fzc2V0W3V1aWRdIHx8IHRoaXMudGFza0luZGllQ2FjaGVbdXVpZF07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy50YXNrSW5kaWVDYWNoZVt1dWlkXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG4gICAgTG9hZGluZ0hhbmRsZS5wcm90b3R5cGUud3JpdGVDYWNoZSA9IGZ1bmN0aW9uICh1dWlkLCBhc3NldCwgaGFzUmF3VHlwZSkge1xuICAgICAgICBpZiAodGhpcy53cml0ZU1haW5DYWNoZSkge1xuICAgICAgICAgICAgQXNzZXRMaWJyYXJ5Ll91dWlkVG9Bc3NldFt1dWlkXSA9IGFzc2V0O1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnRhc2tJbmRpZUNhY2hlKSB7XG4gICAgICAgICAgICB0aGlzLnRhc2tJbmRpZUNhY2hlW3V1aWRdID0gYXNzZXQ7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuYXNzZXRzTmVlZFBvc3RMb2FkICYmIGFzc2V0Ll9yYXdGaWxlcyAmJiAhaGFzUmF3VHlwZSkge1xuICAgICAgICAgICAgdGhpcy5hc3NldHNOZWVkUG9zdExvYWQucHVzaChhc3NldCk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgLy8gcHVibGljc1xuXG4gICAgdmFyIEFzc2V0TGlicmFyeSA9IHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBjYWxsYmFjayBsb2FkQ2FsbGJhY2tcbiAgICAgICAgICogQHBhcmFtIHtzdHJpbmd9IGVycm9yIC0gbnVsbCBvciB0aGUgZXJyb3IgaW5mb1xuICAgICAgICAgKiBAcGFyYW0ge0Fzc2V0fSBkYXRhIC0gdGhlIGxvYWRlZCBhc3NldCBvciBudWxsXG4gICAgICAgICAqL1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWV0aG9kIGxvYWRBc3NldFxuICAgICAgICAgKiBAcGFyYW0ge3N0cmluZ30gdXVpZFxuICAgICAgICAgKiBAcGFyYW0ge2xvYWRDYWxsYmFja30gY2FsbGJhY2sgLSB0aGUgY2FsbGJhY2sgZnVuY3Rpb24gb25jZSBsb2FkIGZpbmlzaGVkXG4gICAgICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gW3JlYWRNYWluQ2FjaGU9dHJ1ZV0gLSBJZiBmYWxzZSwgdGhlIGFzc2V0IGFuZCBhbGwgaXRzIGRlcGVuZHMgYXNzZXRzIHdpbGwgcmVsb2FkIGFuZCBjcmVhdGUgbmV3IGluc3RhbmNlcyBmcm9tIGxpYnJhcnkuXG4gICAgICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gW3dyaXRlTWFpbkNhY2hlPXRydWVdIC0gSWYgdHJ1ZSwgdGhlIHJlc3VsdCB3aWxsIGNhY2hlIHRvIEFzc2V0TGlicmFyeSwgYW5kIE1VU1QgYmUgdW5sb2FkIGJ5IHVzZXIgbWFudWFsbHkuXG4gICAgICAgICAqIEBwYXJhbSB7QXNzZXR9IFtleGlzdGluZ0Fzc2V0XSAtIGxvYWQgdG8gZXhpc3RpbmcgYXNzZXQsIHRoaXMgYXJndW1lbnQgaXMgb25seSBhdmFpbGFibGUgaW4gZWRpdG9yXG4gICAgICAgICAqIEBwcml2YXRlXG4gICAgICAgICAqL1xuICAgICAgICBsb2FkQXNzZXQ6IGZ1bmN0aW9uICh1dWlkLCBjYWxsYmFjaywgcmVhZE1haW5DYWNoZSwgd3JpdGVNYWluQ2FjaGUsIGV4aXN0aW5nQXNzZXQpIHtcbiAgICAgICAgICAgIHJlYWRNYWluQ2FjaGUgPSB0eXBlb2YgcmVhZE1haW5DYWNoZSAhPT0gJ3VuZGVmaW5lZCcgPyByZWFkTWFpbkNhY2hlIDogdHJ1ZTtcbiAgICAgICAgICAgIHdyaXRlTWFpbkNhY2hlID0gdHlwZW9mIHdyaXRlTWFpbkNhY2hlICE9PSAndW5kZWZpbmVkJyA/IHdyaXRlTWFpbkNhY2hlIDogdHJ1ZTtcblxuICAgICAgICAgICAgdmFyIGhhbmRsZSA9IG5ldyBMb2FkaW5nSGFuZGxlKHJlYWRNYWluQ2FjaGUsIHdyaXRlTWFpbkNhY2hlKTtcbiAgICAgICAgICAgIHRoaXMuX2xvYWRBc3NldEJ5VXVpZCh1dWlkLCBjYWxsYmFjaywgaGFuZGxlLCBleGlzdGluZ0Fzc2V0KTtcbiAgICAgICAgfSxcblxuICAgICAgICBfTG9hZGluZ0hhbmRsZTogTG9hZGluZ0hhbmRsZSxcblxuICAgICAgICBnZXRSYXdCYXNlOiBmdW5jdGlvbiAodXVpZCkge1xuICAgICAgICAgICAgcmV0dXJuIF9saWJyYXJ5QmFzZSArIHV1aWQuc2xpY2UoMCwgMikgKyBGaXJlLlBhdGguc2VwICsgdXVpZDtcbiAgICAgICAgfSxcblxuICAgICAgICBnZXRVcmw6IGZ1bmN0aW9uICh1dWlkKSB7XG4gICAgICAgICAgICB2YXIgdXJsID0gdGhpcy5nZXRSYXdCYXNlKHV1aWQpO1xuICAgICAgICAgICAgcmV0dXJuIHVybCArICcuanNvbic7XG4gICAgICAgIH0sXG5cbiAgICAgICAgZ2V0VXVpZDogZnVuY3Rpb24gKHVybCkge1xuICAgICAgICAgICAgdmFyIGhhc1V1aWQgPSB1cmwuaW5kZXhPZihfbGlicmFyeUJhc2UpID09PSAwO1xuICAgICAgICAgICAgaWYgKCBoYXNVdWlkICkge1xuICAgICAgICAgICAgICAgIHZhciBkaXIgPSBGaXJlLlBhdGguZGlybmFtZSh1cmwpO1xuICAgICAgICAgICAgICAgIHZhciBkaXJCYXNlbmFtZSA9IEZpcmUuUGF0aC5iYXNlbmFtZShkaXIpO1xuXG4gICAgICAgICAgICAgICAgdmFyIGlzQXNzZXRVcmwgPSBkaXJCYXNlbmFtZS5sZW5ndGggPT09IDI7XG5cbiAgICAgICAgICAgICAgICB2YXIgdXVpZDtcblxuICAgICAgICAgICAgICAgIGlmIChpc0Fzc2V0VXJsKSB7XG4gICAgICAgICAgICAgICAgICAgIHV1aWQgPSBGaXJlLlBhdGguYmFzZW5hbWUodXJsKTtcblxuICAgICAgICAgICAgICAgICAgICB2YXIgaW5kZXggPSB1dWlkLmluZGV4T2YoJy4nKTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoIGluZGV4ICE9PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdXVpZCA9IHV1aWQuc2xpY2UoMCwgaW5kZXgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB1dWlkID0gZGlyQmFzZW5hbWU7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHV1aWQ7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIElmIHVybCBpcyBub3QgaW4gdGhlIGxpYnJhcnksIGp1c3QgcmV0dXJuIDBcbiAgICAgICAgICAgIHJldHVybiBcIlwiO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiAhI3poIHV1aWTliqDovb3mtYHnqIvvvJpcbiAgICAgICAgICogMS4g5p+l5om+X3V1aWRUb0Fzc2V077yM5aaC5p6c5bey57uP5Yqg6L296L+H77yM55u05o6l6L+U5ZueXG4gICAgICAgICAqIDIuIOafpeaJvl91dWlkVG9DYWxsYmFja3PvvIzlpoLmnpzlt7Lnu4/lnKjliqDovb3vvIzliJnms6jlhozlm57osIPvvIznm7TmjqXov5Tlm55cbiAgICAgICAgICogMy4g5aaC5p6c5rKh5pyJdXJs77yM5YiZ5bCGdXVpZOebtOaOpeS9nOS4uui3r+W+hFxuICAgICAgICAgKiA0LiDpgJLlvZLliqDovb1Bc3NldOWPiuWFtuW8leeUqOWIsOeahOWFtuWug0Fzc2V0XG4gICAgICAgICAqXG4gICAgICAgICAqIEBtZXRob2QgX2xvYWRBc3NldEJ5VXVpZFxuICAgICAgICAgKiBAcGFyYW0ge3N0cmluZ30gdXVpZFxuICAgICAgICAgKiBAcGFyYW0ge2xvYWRDYWxsYmFja30gY2FsbGJhY2sgLSB0aGUgY2FsbGJhY2sgdG8gcmVjZWl2ZSB0aGUgYXNzZXQsIGNhbiBiZSBudWxsXG4gICAgICAgICAqIEBwYXJhbSB7TG9hZGluZ0hhbmRsZX0gaGFuZGxlIC0gdGhlIGxvYWRpbmcgY29udGV4dCB3aGljaCByZXNlcnZlcyBhbGwgcmVsZXZhbnQgcGFyYW1ldGVyc1xuICAgICAgICAgKiBAcGFyYW0ge0Fzc2V0fSBbZXhpc3RpbmdBc3NldF0gLSBsb2FkIHRvIGV4aXN0aW5nIGFzc2V0LCB0aGlzIGFyZ3VtZW50IGlzIG9ubHkgYXZhaWxhYmxlIGluIGVkaXRvclxuICAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAgKi9cbiAgICAgICAgX2xvYWRBc3NldEJ5VXVpZDogZnVuY3Rpb24gKHV1aWQsIGNhbGxiYWNrLCBoYW5kbGUsIGV4aXN0aW5nQXNzZXQpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdXVpZCAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICBjYWxsSW5OZXh0VGljayhjYWxsYmFjaywgbmV3IEVycm9yKCdbQXNzZXRMaWJyYXJ5XSB1dWlkIG11c3QgYmUgc3RyaW5nJyksIG51bGwpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIHN0ZXAgMVxuICAgICAgICAgICAgaWYgKCAhZXhpc3RpbmdBc3NldCApIHtcbiAgICAgICAgICAgICAgICB2YXIgYXNzZXQgPSBoYW5kbGUucmVhZENhY2hlKHV1aWQpO1xuICAgICAgICAgICAgICAgIGlmIChhc3NldCkge1xuICAgICAgICAgICAgICAgICAgICBjYWxsSW5OZXh0VGljayhjYWxsYmFjaywgbnVsbCwgYXNzZXQpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBzdGVwIDJcbiAgICAgICAgICAgIC8vIOWmguaenOW/hemhu+mHjeaWsOWKoOi9ve+8jOWImeS4jeiDveWQiOW5tuWIsOWIsCBfdXVpZFRvQ2FsbGJhY2tz77yM5ZCm5YiZ546w5pyJ55qE5Yqg6L295oiQ5Yqf5ZCO5Lya5ZCM5pe26Kem5Y+R5Zue6LCD77yMXG4gICAgICAgICAgICAvLyDlr7zoh7Tmj5DliY3ov5Tlm57nmoTkuYvliY3nmoTotYTmupDjgIJcbiAgICAgICAgICAgIHZhciBjYW5TaGFyZUxvYWRpbmdUYXNrID0gaGFuZGxlLnJlYWRNYWluQ2FjaGUgJiYgIWV4aXN0aW5nQXNzZXQ7XG4gICAgICAgICAgICBpZiAoIGNhblNoYXJlTG9hZGluZ1Rhc2sgJiYgIV91dWlkVG9DYWxsYmFja3MuYWRkKHV1aWQsIGNhbGxiYWNrKSApIHtcbiAgICAgICAgICAgICAgICAvLyBhbHJlYWR5IGxvYWRpbmdcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIHN0ZXAgM1xuXG4gICAgICAgICAgICBpZiAoRklSRV9FRElUT1IgJiYgIV9saWJyYXJ5QmFzZSkge1xuICAgICAgICAgICAgICAgIGNhbGxJbk5leHRUaWNrKGNhbGxiYWNrLCBuZXcgRXJyb3IoJ0Nhbm5vdCBsb2FkICcgKyB1dWlkICsgJyBpbiBlZGl0b3IgYmVjYXVzZSBBc3NldExpYnJhcnkgbm90IHlldCBpbml0aWFsaXplZCEnKSwgbnVsbCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIHVybCA9IHRoaXMuZ2V0VXJsKHV1aWQpO1xuXG4gICAgICAgICAgICAvLyBzdGVwIDRcbiAgICAgICAgICAgIExvYWRNYW5hZ2VyLmxvYWRCeUxvYWRlcihKc29uTG9hZGVyLCB1cmwsXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gKGVycm9yLCBqc29uKSB7XG4gICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uIG9uRGVzZXJpYWxpemVkV2l0aERlcGVuZHMgKGVyciwgYXNzZXQsIGhhc1Jhd1R5cGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChhc3NldCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFzc2V0Ll91dWlkID0gdXVpZDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoYW5kbGUud3JpdGVDYWNoZSh1dWlkLCBhc3NldCwgaGFzUmF3VHlwZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIGNhblNoYXJlTG9hZGluZ1Rhc2sgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX3V1aWRUb0NhbGxiYWNrcy5pbnZva2VBbmRSZW1vdmUodXVpZCwgZXJyLCBhc3NldCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChjYWxsYmFjaykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKGVyciwgYXNzZXQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChqc29uKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBBc3NldExpYnJhcnkuX2Rlc2VyaWFsaXplV2l0aERlcGVuZHMoanNvbiwgdXJsLCBvbkRlc2VyaWFsaXplZFdpdGhEZXBlbmRzLCBoYW5kbGUsIGV4aXN0aW5nQXNzZXQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgb25EZXNlcmlhbGl6ZWRXaXRoRGVwZW5kcyhlcnJvciwgbnVsbCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICApO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWV0aG9kIGxvYWRKc29uXG4gICAgICAgICAqIEBwYXJhbSB7c3RyaW5nfG9iamVjdH0ganNvblxuICAgICAgICAgKiBAcGFyYW0ge2xvYWRDYWxsYmFja30gY2FsbGJhY2tcbiAgICAgICAgICogQHBhcmFtIHtCb29sZWFufSBbZG9udENhY2hlPWZhbHNlXSAtIElmIGZhbHNlLCB0aGUgcmVzdWx0IHdpbGwgY2FjaGUgdG8gQXNzZXRMaWJyYXJ5LCBhbmQgTVVTVCBiZSB1bmxvYWQgYnkgdXNlciBtYW51YWxseS5cbiAgICAgICAgICogQHBhcmFtIHtCb29sZWFufSBbcmVjb3JkQXNzZXRzPWZhbHNlXSAtIOaYr+WQpue7n+iuoeaWsOWKoOi9veeahOmcgOimgeiuqeWcuuaZryBwcmVsb2FkIOeahCBhc3NldO+8iOaJgOacieWMheWQqyByYXcgZmlsZSDlkI7nvIDlkI3nmoQgYXNzZXQg5bm25LiU5LiN5ZCrIHJhd1R5cGUg5bGe5oCn55qEIGFzc2V077yJXG4gICAgICAgICAqIEByZXR1cm4ge0xvYWRpbmdIYW5kbGV9XG4gICAgICAgICAqIEBwcml2YXRlXG4gICAgICAgICAqL1xuICAgICAgICBsb2FkSnNvbjogZnVuY3Rpb24gKGpzb24sIGNhbGxiYWNrLCBkb250Q2FjaGUsIHJlY29yZEFzc2V0cykge1xuICAgICAgICAgICAgdmFyIGhhbmRsZSA9IG5ldyBMb2FkaW5nSGFuZGxlKCFkb250Q2FjaGUsICFkb250Q2FjaGUsIHJlY29yZEFzc2V0cyk7XG4gICAgICAgICAgICB2YXIgdGhpc1RpY2sgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5fZGVzZXJpYWxpemVXaXRoRGVwZW5kcyhqc29uLCAnJywgZnVuY3Rpb24gKHAxLCBwMikge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzVGljaykge1xuICAgICAgICAgICAgICAgICAgICBjYWxsSW5OZXh0VGljayhjYWxsYmFjaywgcDEsIHAyKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKHAxLCBwMik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgaGFuZGxlKTtcbiAgICAgICAgICAgIHRoaXNUaWNrID0gZmFsc2U7XG4gICAgICAgICAgICByZXR1cm4gaGFuZGxlO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWV0aG9kIF9kZXNlcmlhbGl6ZVdpdGhEZXBlbmRzXG4gICAgICAgICAqIEBwYXJhbSB7c3RyaW5nfG9iamVjdH0ganNvblxuICAgICAgICAgKiBAcGFyYW0ge3N0cmluZ30gdXJsXG4gICAgICAgICAqIEBwYXJhbSB7bG9hZENhbGxiYWNrfSBjYWxsYmFja1xuICAgICAgICAgKiBAcGFyYW0ge29iamVjdH0gaGFuZGxlIC0gdGhlIGxvYWRpbmcgY29udGV4dCB3aGljaCByZXNlcnZlcyBhbGwgcmVsZXZhbnQgcGFyYW1ldGVyc1xuICAgICAgICAgKiBAcGFyYW0ge0Fzc2V0fSBbZXhpc3RpbmdBc3NldF0gLSBleGlzdGluZyBhc3NldCB0byByZWxvYWRcbiAgICAgICAgICogQHByaXZhdGVcbiAgICAgICAgICovXG4gICAgICAgIF9kZXNlcmlhbGl6ZVdpdGhEZXBlbmRzOiBmdW5jdGlvbiAoanNvbiwgdXJsLCBjYWxsYmFjaywgaGFuZGxlLCBleGlzdGluZ0Fzc2V0KSB7XG4gICAgICAgICAgICAvLyBkZXNlcmlhbGl6ZSBhc3NldFxuICAgICAgICAgICAgLy92YXIgaXNTY2VuZSA9IHR5cGVvZiBTY2VuZSAhPT0gJ3VuZGVmaW5lZCcgJiYganNvbiAmJiBqc29uWzBdICYmIGpzb25bMF0uX190eXBlX18gPT09IEpTLl9nZXRDbGFzc0lkKFNjZW5lKTtcbiAgICAgICAgICAgIC8vdmFyIGNsYXNzRmluZGVyID0gaXNTY2VuZSA/IEZpcmUuX01pc3NpbmdTY3JpcHQuc2FmZUZpbmRDbGFzcyA6IGZ1bmN0aW9uIChpZCkge1xuICAgICAgICAgICAgdmFyIGNsYXNzRmluZGVyID0gZnVuY3Rpb24gKGlkKSB7XG4gICAgICAgICAgICAgICAgdmFyIGNscyA9IEpTLl9nZXRDbGFzc0J5SWQoaWQpO1xuICAgICAgICAgICAgICAgIGlmIChjbHMpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNscztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgRmlyZS53YXJuKCdDYW4gbm90IGdldCBjbGFzcyBcIiVzXCInLCBpZCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIE9iamVjdDtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICAvL0ZpcmUuZW5naW5lLl9jYW5Nb2RpZnlDdXJyZW50U2NlbmUgPSBmYWxzZTtcbiAgICAgICAgICAgIHZhciBhc3NldCA9IEZpcmUuZGVzZXJpYWxpemUoanNvbiwgX3RkSW5mbywge1xuICAgICAgICAgICAgICAgIGNsYXNzRmluZGVyOiBjbGFzc0ZpbmRlcixcbiAgICAgICAgICAgICAgICB0YXJnZXQ6IGV4aXN0aW5nQXNzZXRcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgLy9GaXJlLmVuZ2luZS5fY2FuTW9kaWZ5Q3VycmVudFNjZW5lID0gdHJ1ZTtcblxuICAgICAgICAgICAgLy8gbG9hZCBkZXBlbmRzXG4gICAgICAgICAgICB2YXIgcGVuZGluZ0NvdW50ID0gX3RkSW5mby51dWlkTGlzdC5sZW5ndGg7XG5cbiAgICAgICAgICAgIC8vIGxvYWQgcmF3XG4gICAgICAgICAgICB2YXIgcmF3UHJvcCA9IF90ZEluZm8ucmF3UHJvcDsgICAgIC8vIF90ZEluZm/kuI3og73nlKjlnKjlm57osIPph4zvvIFcbiAgICAgICAgICAgIGlmIChyYXdQcm9wKSB7XG4gICAgICAgICAgICAgICAgLy8gbG9hZCBkZXBlbmRzIHJhdyBvYmplY3RzXG4gICAgICAgICAgICAgICAgdmFyIGF0dHJzID0gRmlyZS5hdHRyKGFzc2V0LmNvbnN0cnVjdG9yLCBfdGRJbmZvLnJhd1Byb3ApO1xuICAgICAgICAgICAgICAgIHZhciByYXdUeXBlID0gYXR0cnMucmF3VHlwZTtcbiAgICAgICAgICAgICAgICArK3BlbmRpbmdDb3VudDtcbiAgICAgICAgICAgICAgICBMb2FkTWFuYWdlci5sb2FkKHVybCwgcmF3VHlwZSwgYXNzZXQuX3Jhd2V4dCwgZnVuY3Rpb24gb25SYXdPYmpMb2FkZWQgKGVycm9yLCByYXcpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBGaXJlLmVycm9yKCdbQXNzZXRMaWJyYXJ5XSBGYWlsZWQgdG8gbG9hZCAlcyBvZiAlcy4gJXMnLCByYXdUeXBlLCB1cmwsIGVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBhc3NldFtyYXdQcm9wXSA9IHJhdztcbiAgICAgICAgICAgICAgICAgICAgLS1wZW5kaW5nQ291bnQ7XG4gICAgICAgICAgICAgICAgICAgIGlmIChwZW5kaW5nQ291bnQgPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKG51bGwsIGFzc2V0LCB0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAocGVuZGluZ0NvdW50ID09PSAwKSB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2sobnVsbCwgYXNzZXQsICEhcmF3UHJvcCk7XG4gICAgICAgICAgICAgICAgLy8gX3RkSW5mbyDmmK/nlKjmnaXph43nlKjnmoTkuLTml7blr7nosaHvvIzmr4/mrKHkvb/nlKjlkI7pg73opoHph43orr7vvIzov5nmoLfmiY3lr7kgR0Mg5Y+L5aW944CCXG4gICAgICAgICAgICAgICAgX3RkSW5mby5yZXNldCgpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLypcbiAgICAgICAgICAgICDlpoLmnpzkvp3otZbnmoTmiYDmnInotYTmupDpg73opoHph43mlrDkuIvovb3vvIzmibnph4/mk43kvZzml7blsIbkvJrlr7zoh7TlkIzml7bmiafooYzlpJrmrKHph43lpI3kuIvovb3jgILkvJjljJbmlrnms5XmmK/lop7liqDkuIDlhajlsYDkuovku7bpmJ/liJfvvIxcbiAgICAgICAgICAgICDpmJ/liJfkv53lrZjmr4/kuKrku7vliqHnmoTms6jlhozvvIzlkK/liqjvvIznu5PmnZ/kuovku7bvvIzku7vliqHku47ms6jlhozliLDlkK/liqjopoHlu7bov5/lh6DluKfvvIzmr4/kuKrku7vliqHpg73lrZjmnInniLbku7vliqHjgIJcbiAgICAgICAgICAgICDov5nmoLfpgJrov4fpmJ/liJfnmoTkuovku7bluo/liJflsLHog73lgZrliLDlkIjlubbmibnph4/ku7vliqHjgIJcbiAgICAgICAgICAgICDlpoLmnpzkvp3otZbnmoTotYTmupDkuI3ph43mlrDkuIvovb3kuZ/ooYzvvIzkvYbopoHliKTmlq3mmK/lkKbliJrlpb3lnKjkuIvovb3ov4fnqIvkuK3vvIzlpoLmnpzmmK/nmoTor53lv4XpobvnrYnlvoXkuIvovb3lrozmiJDmiY3og73nu5PmnZ/mnKzotYTmupDnmoTliqDovb3vvIxcbiAgICAgICAgICAgICDlkKbliJnlpJbpg6jojrflj5bliLDnmoTkvp3otZbotYTmupDlsLHkvJrmmK/ml6fnmoTjgIJcbiAgICAgICAgICAgICAqL1xuXG4gICAgICAgICAgICAvLyBBc3NldExpYnJhcnkuX2xvYWRBc3NldEJ5VXVpZCDnmoTlm57osIPmnInlj6/og73lnKjlvZPluKfkuZ/lj6/og73lu7blkI7miafooYzvvIzov5nph4zopoHliKTmlq3mmK/lkKbnlLHlroPosIPnlKggY2FsbGJhY2vvvIxcbiAgICAgICAgICAgIC8vIOWQpuWImSBjYWxsYmFjayDlj6/og73kvJrph43lpI3osIPnlKhcbiAgICAgICAgICAgIHZhciBpbnZva2VDYkJ5RGVwZW5kcyA9IGZhbHNlO1xuXG4gICAgICAgICAgICAvLyBsb2FkIGRlcGVuZHMgYXNzZXRzXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gX3RkSW5mby51dWlkTGlzdC5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgICAgICAgIHZhciBkZXBlbmRzVXVpZCA9IF90ZEluZm8udXVpZExpc3RbaV07XG4gICAgICAgICAgICAgICAgaWYgKEZJUkVfRURJVE9SICYmIGV4aXN0aW5nQXNzZXQpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGV4aXN0aW5nRGVwZW5kcyA9IF90ZEluZm8udXVpZE9iakxpc3RbaV1bX3RkSW5mby51dWlkUHJvcExpc3RbaV1dO1xuICAgICAgICAgICAgICAgICAgICBpZiAoZXhpc3RpbmdEZXBlbmRzICYmIGV4aXN0aW5nRGVwZW5kcy5fdXVpZCA9PT0gZGVwZW5kc1V1aWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBkZXBlbmRzVXJsID0gX2xpYnJhcnlCYXNlICsgZGVwZW5kc1V1aWQuc3Vic3RyaW5nKDAsIDIpICsgRmlyZS5QYXRoLnNlcCArIGRlcGVuZHNVdWlkO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCAhTG9hZE1hbmFnZXIuaXNMb2FkaW5nKGRlcGVuZHNVcmwsIHRydWUpICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIOWmguaenOacieS+nei1luS9huS+nei1luS4jeWcqOWKoOi9vei/h+eoi+S4reWwseebtOaOpeeVpei/h1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC0tcGVuZGluZ0NvdW50O1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8g562J5b6F5L6d6LWW5Yqg6L295a6M5oiQXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKGZ1bmN0aW9uIChkZXBlbmRzVXJsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpZFRvQ2xlYXIgPSBzZXRJbnRlcnZhbChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoICFMb2FkTWFuYWdlci5pc0xvYWRpbmcoZGVwZW5kc1VybCwgdHJ1ZSkgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChpZFRvQ2xlYXIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC0tcGVuZGluZ0NvdW50O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwZW5kaW5nQ291bnQgPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2sobnVsbCwgYXNzZXQsICEhcmF3UHJvcCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCAxMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkoZGVwZW5kc1VybCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB2YXIgb25EZXBlbmRzQXNzZXRMb2FkZWQgPSAoZnVuY3Rpb24gKGRlcGVuZHNVdWlkLCBvYmosIHByb3ApIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gY3JlYXRlIGNsb3N1cmUgbWFudWFsbHkgYmVjYXVzZSBpdHMgZXh0cmVtZWx5IGZhc3RlciB0aGFuIGJpbmRcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChlcnJvciwgZGVwZW5kc0Fzc2V0LCBoYXNSYXdUeXBlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoRklSRV9FRElUT1IgJiYgZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoRWRpdG9yLkFzc2V0REIgJiYgRWRpdG9yLkFzc2V0REIuaXNWYWxpZFV1aWQoZGVwZW5kc1V1aWQpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEZpcmUuZXJyb3IoJ1tBc3NldExpYnJhcnldIEZhaWxlZCB0byBsb2FkIFwiJXNcIiwgJXMnLCBkZXBlbmRzVXVpZCwgZXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICBkZXBlbmRzQXNzZXQuX3V1aWQgPSBkZXBlbmRzVXVpZDtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vfVxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gdXBkYXRlIHJlZmVyZW5jZVxuICAgICAgICAgICAgICAgICAgICAgICAgb2JqW3Byb3BdID0gZGVwZW5kc0Fzc2V0O1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBjaGVjayBhbGwgZmluaXNoZWRcbiAgICAgICAgICAgICAgICAgICAgICAgIC0tcGVuZGluZ0NvdW50O1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHBlbmRpbmdDb3VudCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKG51bGwsIGFzc2V0LCAhIXJhd1Byb3ApO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIH0pKCBkZXBlbmRzVXVpZCwgX3RkSW5mby51dWlkT2JqTGlzdFtpXSwgX3RkSW5mby51dWlkUHJvcExpc3RbaV0gKTtcbiAgICAgICAgICAgICAgICBBc3NldExpYnJhcnkuX2xvYWRBc3NldEJ5VXVpZChkZXBlbmRzVXVpZCwgb25EZXBlbmRzQXNzZXRMb2FkZWQsIGhhbmRsZSk7XG4gICAgICAgICAgICAgICAgaW52b2tlQ2JCeURlcGVuZHMgPSB0cnVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoRklSRV9FRElUT1IgJiYgIWludm9rZUNiQnlEZXBlbmRzICYmIHBlbmRpbmdDb3VudCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrKG51bGwsIGFzc2V0LCAhIXJhd1Byb3ApO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBfdGRJbmZvIOaYr+eUqOadpemHjeeUqOeahOS4tOaXtuWvueixoe+8jOavj+asoeS9v+eUqOWQjumDveimgemHjeiuvu+8jOi/meagt+aJjeWvuSBHQyDlj4vlpb3jgIJcbiAgICAgICAgICAgIF90ZEluZm8ucmVzZXQoKTtcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogR2V0IHRoZSBleGlzdHMgYXNzZXQgYnkgdXVpZC5cbiAgICAgICAgICpcbiAgICAgICAgICogQG1ldGhvZCBnZXRBc3NldEJ5VXVpZFxuICAgICAgICAgKiBAcGFyYW0ge3N0cmluZ30gdXVpZFxuICAgICAgICAgKiBAcmV0dXJuIHtBc3NldH0gLSB0aGUgZXhpc3RpbmcgYXNzZXQsIGlmIG5vdCBsb2FkZWQsIGp1c3QgcmV0dXJucyBudWxsLlxuICAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAgKi9cbiAgICAgICAgZ2V0QXNzZXRCeVV1aWQ6IGZ1bmN0aW9uICh1dWlkKSB7XG4gICAgICAgICAgICByZXR1cm4gQXNzZXRMaWJyYXJ5Ll91dWlkVG9Bc3NldFt1dWlkXSB8fCBudWxsO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiAhI2VuIEtpbGwgcmVmZXJlbmNlcyB0byB0aGUgYXNzZXQgc28gaXQgY2FuIGJlIGdhcmJhZ2UgY29sbGVjdGVkLlxuICAgICAgICAgKiBGaXJlYmFsbCB3aWxsIHJlbG9hZCB0aGUgYXNzZXQgZnJvbSBkaXNrIG9yIHJlbW90ZSBpZiBsb2FkQXNzZXRCeVV1aWQgYmVpbmcgY2FsbGVkIGFnYWluLlxuICAgICAgICAgKiBZb3UgcmFyZWx5IHVzZSB0aGlzIGZ1bmN0aW9uIGluIHNjcmlwdHMsIHNpbmNlIGl0IHdpbGwgYmUgY2FsbGVkIGF1dG9tYXRpY2FsbHkgd2hlbiB0aGUgQXNzZXQgaXMgZGVzdHJveWVkLlxuICAgICAgICAgKiAhI3poIOaJi+WKqOWNuOi9veaMh+WumueahOi1hOa6kO+8jOi/meS4quaWueazleS8muWcqCBBc3NldCDooqsgZGVzdHJveSDml7boh6rliqjosIPnlKjvvIzkuIDoiKzkuI3pnIDopoHnlKjliLDov5nkuKrmlrnms5XjgILljbjovb3ku6XlkI7vvIxGaXJlYmFsbCDlj6/ku6Xph43mlrDku47noaznm5jmiJbnvZHnu5zliqDovb3ov5nkuKrotYTmupDjgIJcbiAgICAgICAgICpcbiAgICAgICAgICog5aaC5p6c6L+Y5pyJ5Zyw5pa55byV55So5YiwYXNzZXTvvIzpmaTpnZ4gZGVzdHJveUltbWVkaWF0ZWQg5Li6dHJ1Ze+8jOWQpuWImeS4jeW6lOivpeaJp+ihjOi/meS4quaWueazle+8jOWboOS4uumCo+agt+WPr+iDveS8muWvvOiHtCBhc3NldCDooqvlpJrmrKHliJvlu7rjgIJcbiAgICAgICAgICpcbiAgICAgICAgICogQG1ldGhvZCB1bmxvYWRBc3NldFxuICAgICAgICAgKiBAcGFyYW0ge0Fzc2V0fHN0cmluZ30gYXNzZXRPclV1aWRcbiAgICAgICAgICogQHBhcmFtIHtCb29sZWFufSBbZGVzdHJveT1mYWxzZV0gLSBXaGVuIGRlc3Ryb3lJbW1lZGlhdGUgaXMgdHJ1ZSwgaWYgdGhlcmUgYXJlIG9iamVjdHMgcmVmZXJlbmNpbmcgdGhlIGFzc2V0LCB0aGUgcmVmZXJlbmNlcyB3aWxsIGJlY29tZSBpbnZhbGlkLlxuICAgICAgICAgKi9cbiAgICAgICAgdW5sb2FkQXNzZXQ6IGZ1bmN0aW9uIChhc3NldE9yVXVpZCwgZGVzdHJveSkge1xuICAgICAgICAgICAgdmFyIGFzc2V0O1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBhc3NldE9yVXVpZCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICBhc3NldCA9IEFzc2V0TGlicmFyeS5fdXVpZFRvQXNzZXRbYXNzZXRPclV1aWRdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgYXNzZXQgPSBhc3NldE9yVXVpZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChhc3NldCkge1xuICAgICAgICAgICAgICAgIGlmIChkZXN0cm95ICYmIGFzc2V0LmlzVmFsaWQpIHtcbiAgICAgICAgICAgICAgICAgICAgYXNzZXQuZGVzdHJveSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBkZWxldGUgQXNzZXRMaWJyYXJ5Ll91dWlkVG9Bc3NldFthc3NldC5fdXVpZF07XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIGluaXQgdGhlIGFzc2V0IGxpYnJhcnlcbiAgICAgICAgICogQG1ldGhvZCBpbml0XG4gICAgICAgICAqIEBwYXJhbSB7c3RyaW5nfSBsaWJyYXJ5UGF0aFxuICAgICAgICAgKi9cbiAgICAgICAgaW5pdDogZnVuY3Rpb24gKGxpYnJhcnlQYXRoKSB7XG4gICAgICAgICAgICBpZiAoRklSRV9FRElUT1IgJiYgX2xpYnJhcnlCYXNlICYmICFGSVJFX1RFU1QpIHtcbiAgICAgICAgICAgICAgICBGaXJlLmVycm9yKCdBc3NldExpYnJhcnkgaGFzIGFscmVhZHkgYmVlbiBpbml0aWFsaXplZCEnKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBfbGlicmFyeUJhc2UgPSBGaXJlLlBhdGguc2V0RW5kV2l0aFNlcChsaWJyYXJ5UGF0aCk7XG4gICAgICAgICAgICAvL0ZpcmUubG9nKCdbQXNzZXRMaWJyYXJ5XSBsaWJyYXJ5OiAnICsgX2xpYnJhcnlCYXNlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vLyoqXG4gICAgICAgIC8vICogdGVtcG9yYXJ5IGZsYWcgZm9yIGRlc2VyaWFsaXppbmcgYXNzZXRzXG4gICAgICAgIC8vICogQHByb3BlcnR5IHtCb29sZWFufSBGaXJlLkFzc2V0TGlicmFyeS5pc0xvYWRpbmdBc3NldFxuICAgICAgICAvLyAqL1xuICAgICAgICAvL2lzTG9hZGluZ0Fzc2V0OiBmYWxzZSxcbiAgICB9O1xuXG4gICAgLy8gdW5sb2FkIGFzc2V0IGlmIGl0IGlzIGRlc3RvcnllZFxuXG4gICAgLyoqXG4gICAgICogISNlbiBDYWNoZXMgdXVpZCB0byBhbGwgbG9hZGVkIGFzc2V0cyBpbiBzY2VuZXMuXG4gICAgICpcbiAgICAgKiAhI3poIOi/memHjOS/neWtmOaJgOacieW3sue7j+WKoOi9veeahOWcuuaZr+i1hOa6kO+8jOmYsuatouWQjOS4gOS4qui1hOa6kOWcqOWGheWtmOS4reWKoOi9veWHuuWkmuS7veaLt+i0neOAglxuICAgICAqXG4gICAgICog6L+Z6YeM55So5LiN5LqGV2Vha01hcO+8jOWcqOa1j+iniOWZqOS4reaJgOacieWKoOi9vei/h+eahOi1hOa6kOmDveWPquiDveaJi+W3peiwg+eUqCB1bmxvYWRBc3NldCDph4rmlL7jgIJcbiAgICAgKlxuICAgICAqIOWPguiAg++8mlxuICAgICAqIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL1dlYWtNYXBcbiAgICAgKiBodHRwczovL2dpdGh1Yi5jb20vVG9vVGFsbE5hdGUvbm9kZS13ZWFrXG4gICAgICpcbiAgICAgKiBAcHJvcGVydHkgX3V1aWRUb0Fzc2V0XG4gICAgICogQHR5cGUge29iamVjdH1cbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIEFzc2V0TGlicmFyeS5fdXVpZFRvQXNzZXQgPSB7fTtcblxuICAgIC8v5pqC5pe25bGP6JS977yM5Zug5Li655uu5YmN5rKh5pyJ57yT5a2Y5Lu75L2VYXNzZXRcbiAgICAvL2lmIChGSVJFX0RFViAmJiBBc3NldC5wcm90b3R5cGUuX29uUHJlRGVzdHJveSkge1xuICAgIC8vICAgIEZpcmUuZXJyb3IoJ19vblByZURlc3Ryb3kgb2YgQXNzZXQgaGFzIGFscmVhZHkgZGVmaW5lZCcpO1xuICAgIC8vfVxuICAgIC8vQXNzZXQucHJvdG90eXBlLl9vblByZURlc3Ryb3kgPSBmdW5jdGlvbiAoKSB7XG4gICAgLy8gICAgaWYgKEFzc2V0TGlicmFyeS5fdXVpZFRvQXNzZXRbdGhpcy5fdXVpZF0gPT09IHRoaXMpIHtcbiAgICAvLyAgICAgICAgQXNzZXRMaWJyYXJ5LnVubG9hZEFzc2V0KHRoaXMpO1xuICAgIC8vICAgIH1cbiAgICAvL307XG5cbiAgICByZXR1cm4gQXNzZXRMaWJyYXJ5O1xufSkoKTtcblxuRmlyZS5Bc3NldExpYnJhcnkgPSBBc3NldExpYnJhcnk7XG4iLCJ2YXIgRk9iamVjdCA9IHJlcXVpcmUoJy4vZm9iamVjdCcpO1xuXG4vKipcbiAqIEJhc2UgY2xhc3MgZm9yIGFzc2V0IGhhbmRsaW5nLlxuICpcbiAqIFlvdSBzaG91bGQgb3ZlcnJpZGU6XG4gKiAtIHZhbGlkYXRlQXNzZXQgKHN0YXRpYylcbiAqXG4gKiBZb3UgbWF5IHdhbnQgdG8gb3ZlcnJpZGU6XG4gKiAtIGNyZWF0ZU5vZGVcbiAqIC0gRmlyZS5GT2JqZWN0Ll9zZXJpYWxpemVcbiAqIC0gRmlyZS5GT2JqZWN0Ll9kZXNlcmlhbGl6ZVxuICpcbiAqIEBjbGFzcyBBc3NldFxuICogQGV4dGVuZHMgT2JqZWN0XG4gKiBAY29uc3RydWN0b3JcbiAqL1xuRmlyZS5Bc3NldCA9IEZpcmUuQ2xhc3Moe1xuICAgIG5hbWU6ICdGaXJlLkFzc2V0JywgZXh0ZW5kczogRk9iamVjdCxcblxuICAgIGNvbnN0cnVjdG9yOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAcHJvcGVydHkgX3V1aWRcbiAgICAgICAgICogQHR5cGUge3N0cmluZ31cbiAgICAgICAgICogQHByaXZhdGVcbiAgICAgICAgICovXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCAnX3V1aWQnLCB7XG4gICAgICAgICAgICB2YWx1ZTogJycsXG4gICAgICAgICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIGVudW1lcmFibGU6IGZhbHNlICAgLy8gYXZvaWQgdXVpZCBiZWluZyBhc3NpZ25lZCB0byBlbXB0eSBzdHJpbmcgZHVyaW5nIGRlc3Ryb3ksXG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vLyoqXG4gICAgICAgIC8vICogQHByb3BlcnR5IGRpcnR5XG4gICAgICAgIC8vICogQHR5cGUgYm9vbGVhblxuICAgICAgICAvLyAqIEBwcml2YXRlXG4gICAgICAgIC8vICovXG4gICAgICAgIC8vdGhpcy5kaXJ0eSA9IGZhbHNlO1xuICAgIH0sXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBSZXR1cm5zIHRoZSB1cmwgb2YgdGhpcyBhc3NldCdzIGZpcnN0IHJhdyBmaWxlLCBpZiBub25lIG9mIHJhd0ZpbGUgZXhpc3RzLFxuICAgICAgICAgKiBpdCB3aWxsIHJldHVybnMgdGhlIHVybCBvZiB0aGlzIHNlcmlhbGl6ZWQgYXNzZXQuXG4gICAgICAgICAqIEBwcm9wZXJ0eSB1cmxcbiAgICAgICAgICogQHR5cGUge3N0cmluZ31cbiAgICAgICAgICogQHJlYWRPbmx5XG4gICAgICAgICAqL1xuICAgICAgICB1cmw6IHtcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9yYXdGaWxlcykge1xuICAgICAgICAgICAgICAgICAgICBpZiAoRmlyZS5Bc3NldExpYnJhcnkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciB1cmwgPSBGaXJlLkFzc2V0TGlicmFyeS5nZXRSYXdCYXNlKHRoaXMuX3V1aWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGZpbGVuYW1lID0gdGhpcy5fcmF3RmlsZXNbMF07XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdXJsICsgRmlyZS5QYXRoLnNlcCArIGZpbGVuYW1lO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgRmlyZS5lcnJvcignYXNzZXQudXJsIGlzIG5vdCB1c2FibGUgaW4gY29yZSBwcm9jZXNzJyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuICcnO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHZpc2libGU6IGZhbHNlXG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFJldHVybnMgdGhlIHVybCBvZiB0aGlzIGFzc2V0J3MgcmF3IGZpbGVzLCBpZiBub25lIG9mIHJhd0ZpbGUgZXhpc3RzLFxuICAgICAgICAgKiBpdCB3aWxsIHJldHVybnMgYW4gZW1wdHkgYXJyYXkuXG4gICAgICAgICAqIEBwcm9wZXJ0eSB1cmxzXG4gICAgICAgICAqIEB0eXBlIHtzdHJpbmdbXX1cbiAgICAgICAgICogQHJlYWRPbmx5XG4gICAgICAgICAqL1xuICAgICAgICB1cmxzOiB7XG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fcmF3RmlsZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKEZpcmUuQXNzZXRMaWJyYXJ5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgdXJsID0gRmlyZS5Bc3NldExpYnJhcnkuZ2V0UmF3QmFzZSh0aGlzLl91dWlkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9yYXdGaWxlcy5tYXAoZnVuY3Rpb24gKGZpbGVuYW1lKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHVybCArIEZpcmUuUGF0aC5zZXAgKyBmaWxlbmFtZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgRmlyZS5lcnJvcignYXNzZXQudXJscyBpcyBub3QgdXNhYmxlIGluIGNvcmUgcHJvY2VzcycpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB2aXNpYmxlOiBmYWxzZVxuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiDlnKggbGl0ZSDniYjnmoQgRmlyZWJhbGwg6YeM77yMcmF3IGFzc2V0IOW5tuS4jeS7heS7heaYr+WcqCBwcm9wZXJ0aWVzIOmHjOWjsOaYjuS6hiByYXdUeXBlIOaJjeacie+8jFxuICAgICAgICAgKiDogIzmmK/mr4/kuKogYXNzZXQg6YO96IO95oyH5a6a6Ieq5bex55qEIHJhdyBmaWxlIHVybOOAguS9hiBBc3NldExpYnJhcnkg5bm25LiN5Lya5biu5L2g5Yqg6L296L+Z5LiqIHVybO+8jOmZpOmdnuS9oOWjsOaYjuS6hiByYXdUeXBl44CCXG4gICAgICAgICAqIEBwcm9wZXJ0eSBfcmF3RmlsZXNcbiAgICAgICAgICogQHR5cGUge3N0cmluZ1tdfVxuICAgICAgICAgKiBAZGVmYXVsdCBudWxsXG4gICAgICAgICAqIEBwcml2YXRlXG4gICAgICAgICAqL1xuICAgICAgICBfcmF3RmlsZXM6IG51bGxcbiAgICB9LFxuXG4gICAgc3RhdGljczoge1xuICAgICAgICAvKipcbiAgICAgICAgICog6L+Z5Liq5pa55rOV57uZIEFzc2V0REIg5LiT55So77yM5oiW6K646IO96K6pIEFzc2V0REIg5LiN6ICm5ZCIIEZpcmUuZGVzZXJpYWxpemUoKeOAglxuICAgICAgICAgKiBAbWV0aG9kIGRlc2VyaWFsaXplXG4gICAgICAgICAqIEBwYXJhbSB7c3RyaW5nfSBkYXRhXG4gICAgICAgICAqIEByZXR1cm4ge0Fzc2V0fVxuICAgICAgICAgKiBAc3RhdGljXG4gICAgICAgICAqIEBwcml2YXRlXG4gICAgICAgICAqL1xuICAgICAgICBkZXNlcmlhbGl6ZTogZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICAgIHJldHVybiBGaXJlLmRlc2VyaWFsaXplKGRhdGEpO1xuICAgICAgICB9LFxuXG4gICAgICAgIHVybFRvVXVpZDogZnVuY3Rpb24gKHVybCkge1xuICAgICAgICAgICAgaWYgKEZpcmUuQXNzZXRMaWJyYXJ5KSB7XG4gICAgICAgICAgICAgICAgaWYgKHVybCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgdXVpZCA9IEZpcmUuQXNzZXRMaWJyYXJ5LmdldFV1aWQodXJsKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHV1aWQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgRmlyZS5lcnJvcignQXNzZXQudXJsVG9VdWlkIGlzIG5vdCB1c2FibGUgaW4gY29yZSBwcm9jZXNzJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gJyc7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICog6L+Z5Liq5pa55rOV5Li65LqG6K6pIEFzc2V0REIg5LiN6ICm5ZCIIEVkaXRvci5zZXJpYWxpemUoKeOAglxuICAgICAqIEBtZXRob2Qgc2VyaWFsaXplXG4gICAgICogQHJldHVybiB7c3RyaW5nfVxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgc2VyaWFsaXplOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBFZGl0b3Iuc2VyaWFsaXplKHRoaXMpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGUgYSBuZXcgbm9kZSB1c2luZyB0aGlzIGFzc2V0IGluIHRoZSBzY2VuZS5cbiAgICAgKiBJZiB0aGlzIHR5cGUgb2YgYXNzZXQgZG9udCBoYXZlIGNvcnJlc3BvbmRpbmcgdHlwZSBvZiBub2RlLCB0aGlzIG1ldGhvZCBzaG91bGQgYmUgbnVsbC5cbiAgICAgKiBAbWV0aG9kIGNyZWF0ZU5vZGVcbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBjYWxsYmFja1xuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBjYWxsYmFjay5lcnJvciAtIG51bGwgb3IgdGhlIGVycm9yIGluZm9cbiAgICAgKiBAcGFyYW0ge29iamVjdH0gY2FsbGJhY2subm9kZSAtIHRoZSBjcmVhdGVkIG5vZGUgb3IgbnVsbFxuICAgICAqL1xuICAgIGNyZWF0ZU5vZGU6IG51bGwsXG5cbiAgICAvKipcbiAgICAgKiBTZXQgcmF3IGV4dG5hbWUgZm9yIHRoaXMgYXNzZXQuXG4gICAgICogQG1ldGhvZCBfc2V0UmF3RmlsZXNcbiAgICAgKiBAcGFyYW0ge3N0cmluZ1tdfSByYXdGaWxlc1xuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgX3NldFJhd0ZpbGVzOiBmdW5jdGlvbiAocmF3RmlsZXMpIHtcbiAgICAgICAgcmF3RmlsZXMgPSByYXdGaWxlcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgICAgIGlmIChpdGVtLmNoYXJBdCgwKSA9PT0gJy4nKSB7XG4gICAgICAgICAgICAgICAgaXRlbSA9IGl0ZW0uc2xpY2UoMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgbmV4dENoYXIgPSBpdGVtLmNoYXJBdCgwKTtcbiAgICAgICAgICAgIGlmIChuZXh0Q2hhciA9PT0gJy8nIHx8IG5leHRDaGFyID09PSAnXFxcXCcpIHtcbiAgICAgICAgICAgICAgICBpdGVtID0gaXRlbS5zbGljZSgxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBpdGVtO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5fcmF3RmlsZXMgPSByYXdGaWxlcy5sZW5ndGggPiAwID8gcmF3RmlsZXMgOiBudWxsO1xuICAgIH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEZpcmUuQXNzZXQ7XG4iLCJ2YXIgSlMgPSByZXF1aXJlKCcuL2pzJyk7XG52YXIgaXNQbGFpbkVtcHR5T2JqID0gcmVxdWlyZSgnLi91dGlscycpLmlzUGxhaW5FbXB0eU9ial9ERVY7XG5cbi8qKlxuICogVGFnIHRoZSBjbGFzcyB3aXRoIGFueSBtZXRhIGF0dHJpYnV0ZXMsIHRoZW4gcmV0dXJuIGFsbCBjdXJyZW50IGF0dHJpYnV0ZXMgYXNzaWduZWQgdG8gaXQuXG4gKiBUaGlzIGZ1bmN0aW9uIGhvbGRzIG9ubHkgdGhlIGF0dHJpYnV0ZXMsIG5vdCB0aGVpciBpbXBsZW1lbnRhdGlvbnMuXG4gKlxuICogQG1ldGhvZCBhdHRyXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufG9iamVjdH0gY29uc3RydWN0b3IgLSB0aGUgY2xhc3Mgb3IgaW5zdGFuY2UuIElmIGluc3RhbmNlLCB0aGUgYXR0cmlidXRlIHdpbGwgYmUgZHluYW1pYyBhbmQgb25seSBhdmFpbGFibGUgZm9yIHRoZSBzcGVjaWZpZWQgaW5zdGFuY2UuXG4gKiBAcGFyYW0ge3N0cmluZ30gcHJvcGVydHlOYW1lIC0gdGhlIG5hbWUgb2YgcHJvcGVydHkgb3IgZnVuY3Rpb24sIHVzZWQgdG8gcmV0cmlldmUgdGhlIGF0dHJpYnV0ZXNcbiAqIEBwYXJhbSB7b2JqZWN0fSBbYXR0cmlidXRlc10gLSB0aGUgYXR0cmlidXRlIHRhYmxlIHRvIG1hcmssIG5ldyBhdHRyaWJ1dGVzIHdpbGwgbWVyZ2VkIHdpdGggZXhpc3RlZCBhdHRyaWJ1dGVzLiBBdHRyaWJ1dGUgd2hvc2Uga2V5IHN0YXJ0cyB3aXRoICdfJyB3aWxsIGJlIGlnbm9yZWQuXG4gKiBAcmV0dXJuIHtvYmplY3R8dW5kZWZpbmVkfSByZXR1cm4gYWxsIGF0dHJpYnV0ZXMgYXNzb2NpYXRlZCB3aXRoIHRoZSBwcm9wZXJ0eS4gaWYgbm9uZSB1bmRlZmluZWQgd2lsbCBiZSByZXR1cm5lZFxuICpcbiAqIEBleGFtcGxlXG4gKiBgYGBqc1xuICogIHZhciBteUNsYXNzID0gZnVuY3Rpb24gKCkgeyB0aGlzLnZhbHVlID0gMC41IH07XG4gKiAgRmlyZS5hdHRyKG15Q2xhc3MsICd2YWx1ZScpOyAgICAgICAgIC8vIHJldHVybiB1bmRlZmluZWRcbiAqICBGaXJlLmF0dHIobXlDbGFzcywgJ3ZhbHVlJywge30pLm1pbiA9IDA7ICAvLyBhc3NpZ24gbmV3IGF0dHJpYnV0ZSB0YWJsZVxuICogICAgICAgICAgICAgIC8vYXNzb2NpYXRlZCB3aXRoICd2YWx1ZScsIGFuZCBzZXQgaXRzIG1pbiA9IDBcbiAqICBGaXJlLmF0dHIobXlDbGFzcywgJ3ZhbHVlJywgeyAgICAgICAvLyBzZXQgdmFsdWVzIG1heCBhbmQgZGVmYXVsdFxuICogICAgIG1heDogMSxcbiAqICAgICBkZWZhdWx0OiAwLjUsXG4gKiAgfSk7XG4gKiAgRmlyZS5hdHRyKG15Q2xhc3MsICd2YWx1ZScpOyAgLy8gcmV0dXJuIHsgZGVmYXVsdDogMC41LCBtaW46IDAsIG1heDogMSB9XG4gKiBgYGBcbiAqL1xuRmlyZS5hdHRyID0gZnVuY3Rpb24gKGNvbnN0cnVjdG9yLCBwcm9wZXJ0eU5hbWUsIGF0dHJpYnV0ZXMpIHtcbiAgICB2YXIga2V5ID0gJ19hdHRyJCcgKyBwcm9wZXJ0eU5hbWU7XG4gICAgdmFyIGluc3RhbmNlLCBhdHRycywgbmFtZTtcbiAgICBpZiAodHlwZW9mIGNvbnN0cnVjdG9yID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIC8vIGF0dHJpYnV0ZXMgaW4gY2xhc3NcbiAgICAgICAgaW5zdGFuY2UgPSBjb25zdHJ1Y3Rvci5wcm90b3R5cGU7XG4gICAgICAgIGF0dHJzID0gaW5zdGFuY2Vba2V5XTtcbiAgICAgICAgaWYgKHR5cGVvZiBhdHRyaWJ1dGVzICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgLy8gc2V0XG4gICAgICAgICAgICBpZiAodHlwZW9mIGF0dHJpYnV0ZXMgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFhdHRycykge1xuICAgICAgICAgICAgICAgICAgICBpbnN0YW5jZVtrZXldID0gYXR0cnMgPSB7fTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZm9yIChuYW1lIGluIGF0dHJpYnV0ZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG5hbWVbMF0gIT09ICdfJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnNbbmFtZV0gPSBhdHRyaWJ1dGVzW25hbWVdO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgaW5zdGFuY2Vba2V5XSA9IGF0dHJpYnV0ZXM7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGF0dHJpYnV0ZXM7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGF0dHJzO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgLy8gYXR0cmlidXRlcyBpbiBpbnN0YW5jZVxuICAgICAgICBpbnN0YW5jZSA9IGNvbnN0cnVjdG9yO1xuICAgICAgICBpZiAodHlwZW9mIGF0dHJpYnV0ZXMgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAvLyBzZXRcbiAgICAgICAgICAgIGlmICh0eXBlb2YgYXR0cmlidXRlcyA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgICAgICBpZiAoaW5zdGFuY2UuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgICAgICAgICAgICBhdHRycyA9IGluc3RhbmNlW2tleV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICghYXR0cnMpIHtcbiAgICAgICAgICAgICAgICAgICAgaW5zdGFuY2Vba2V5XSA9IGF0dHJzID0ge307XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGZvciAobmFtZSBpbiBhdHRyaWJ1dGVzKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChuYW1lWzBdICE9PSAnXycpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzW25hbWVdID0gYXR0cmlidXRlc1tuYW1lXTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gSlMuYWRkb24oe30sIGF0dHJzLCBpbnN0YW5jZS5jb25zdHJ1Y3Rvci5wcm90b3R5cGVba2V5XSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBpbnN0YW5jZVtrZXldID0gYXR0cmlidXRlcztcbiAgICAgICAgICAgICAgICByZXR1cm4gYXR0cmlidXRlcztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIC8vIGdldFxuICAgICAgICAgICAgYXR0cnMgPSBpbnN0YW5jZVtrZXldO1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBhdHRycyA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gSlMuYWRkb24oe30sIGF0dHJzLCBpbnN0YW5jZS5jb25zdHJ1Y3Rvci5wcm90b3R5cGVba2V5XSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gYXR0cnM7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59O1xuXG4vKlxuXG5CdWlsdGluQXR0cmlidXRlczoge1xuICAgIGRlZmF1bHQ6IGRlZmF1bHRWYWx1ZSxcbiAgICBfY2FuVXNlZEluR2V0dGVyOiB0cnVlLCAoZGVmYXVsdCB0cnVlKVxuICAgIF9jYW5Vc2VkSW5TZXR0ZXI6IGZhbHNlLCAoZGVmYXVsdCBmYWxzZSkgKE5ZSSlcbn1cbkdldHRlciBvciBTZXR0ZXI6IHtcbiAgICBoYXNHZXR0ZXI6IHRydWUsXG4gICAgaGFzU2V0dGVyOiB0cnVlLFxufVxuQ2FsbGJhY2tzOiB7XG4gICAgX29uQWZ0ZXJQcm9wOiBmdW5jdGlvbiAoY29uc3RydWN0b3IsIHByb3BOYW1lKSB7fSxcbiAgICBfb25BZnRlckdldHRlcjogZnVuY3Rpb24gKGNvbnN0cnVjdG9yLCBwcm9wTmFtZSkge30sIChOWUkpXG4gICAgX29uQWZ0ZXJTZXR0ZXI6IGZ1bmN0aW9uIChjb25zdHJ1Y3RvciwgcHJvcE5hbWUpIHt9LCAoTllJKVxufVxuICovXG5cbi8qKlxuICogQnkgZGVmYXVsdCwgYWxsIHByb3BlcnRpZXMgZGVjbGFyZWQgYnkgXCJDbGFzcy5wcm9wXCIgaXMgc2VyaWFsaXphYmxlLlxuICogVGhlIE5vblNlcmlhbGl6ZWQgYXR0cmlidXRlIG1hcmtzIGEgdmFyaWFibGUgdG8gbm90IGJlIHNlcmlhbGl6ZWQsXG4gKiBzbyB5b3UgY2FuIGtlZXAgYSBwcm9wZXJ0eSBzaG93IGluIHRoZSBFZGl0b3IgYW5kIEZpcmViYWxsIHdpbGwgbm90IGF0dGVtcHQgdG8gc2VyaWFsaXplIGl0LlxuICogU2VlIHslIGNyb3NzbGluayBFZGl0b3JPbmx5IEZpcmUuRWRpdG9yT25seSAlfSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIEBwcm9wZXJ0eSBOb25TZXJpYWxpemVkXG4gKiBAdHlwZSBvYmplY3RcbiAqIEBwcml2YXRlXG4gKi9cbkZpcmUuTm9uU2VyaWFsaXplZCA9IHtcbiAgICBzZXJpYWxpemFibGU6IGZhbHNlLFxuICAgIF9jYW5Vc2VkSW5HZXR0ZXI6IGZhbHNlXG59O1xuXG4vKipcbiAqIFRoZSBFZGl0b3JPbmx5IGF0dHJpYnV0ZSBtYXJrcyBhIHZhcmlhYmxlIHRvIGJlIHNlcmlhbGl6ZWQgaW4gZWRpdG9yIHByb2plY3QsIGJ1dCBub24tc2VyaWFsaXplZFxuICogaW4gZXhwb3J0ZWQgcHJvZHVjdHMuXG4gKlxuICogQHByb3BlcnR5IEVkaXRvck9ubHlcbiAqIEB0eXBlIG9iamVjdFxuICogQHByaXZhdGVcbiAqL1xuRmlyZS5FZGl0b3JPbmx5ID0ge1xuICAgIGVkaXRvck9ubHk6IHRydWUsXG4gICAgX2NhblVzZWRJbkdldHRlcjogZmFsc2Vcbn07XG5cbi8qKlxuICogU3BlY2lmeSB0aGF0IHRoZSBpbnB1dCB2YWx1ZSBtdXN0IGJlIGludGVnZXIgaW4gSW5zcGVjdG9yLlxuICogQWxzbyB1c2VkIHRvIGluZGljYXRlcyB0aGF0IHRoZSB0eXBlIG9mIGVsZW1lbnRzIGluIGFycmF5IG9yIHRoZSB0eXBlIG9mIHZhbHVlIGluIGRpY3Rpb25hcnkgaXMgaW50ZWdlci5cbiAqIEBwcm9wZXJ0eSBJbnRlZ2VyXG4gKiBAdHlwZSBvYmplY3RcbiAqL1xuRmlyZS5JbnRlZ2VyID0gJ0ludGVnZXInO1xuXG4vKipcbiAqIEluZGljYXRlcyB0aGF0IHRoZSB0eXBlIG9mIGVsZW1lbnRzIGluIGFycmF5IG9yIHRoZSB0eXBlIG9mIHZhbHVlIGluIGRpY3Rpb25hcnkgaXMgZG91YmxlLlxuICogQHByb3BlcnR5IEZsb2F0XG4gKiBAdHlwZSBvYmplY3RcbiAqL1xuRmlyZS5GbG9hdCA9ICdGbG9hdCc7XG5cbmZ1bmN0aW9uIGdldFR5cGVDaGVja2VyICh0eXBlLCBhdHRyTmFtZSwgb2JqZWN0VHlwZUN0b3IpIHtcbiAgICBpZiAoRklSRV9ERVYpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChjb25zdHJ1Y3RvciwgbWFpblByb3BOYW1lKSB7XG4gICAgICAgICAgICB2YXIgbWFpblByb3BBdHRycyA9IEZpcmUuYXR0cihjb25zdHJ1Y3RvciwgbWFpblByb3BOYW1lKSB8fCB7fTtcbiAgICAgICAgICAgIGlmIChtYWluUHJvcEF0dHJzLnR5cGUgIT09IHR5cGUpIHtcbiAgICAgICAgICAgICAgICBGaXJlLndhcm4oJ0NhbiBvbmx5IGluZGljYXRlIG9uZSB0eXBlIGF0dHJpYnV0ZSBmb3IgJXMuJXMuJywgSlMuZ2V0Q2xhc3NOYW1lKGNvbnN0cnVjdG9yKSxcbiAgICAgICAgICAgICAgICAgICAgbWFpblByb3BOYW1lKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIW1haW5Qcm9wQXR0cnMuaGFzT3duUHJvcGVydHkoJ2RlZmF1bHQnKSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBkZWZhdWx0VmFsID0gbWFpblByb3BBdHRycy5kZWZhdWx0O1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBkZWZhdWx0VmFsID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBpc0NvbnRhaW5lciA9IEFycmF5LmlzQXJyYXkoZGVmYXVsdFZhbCkgfHwgaXNQbGFpbkVtcHR5T2JqKGRlZmF1bHRWYWwpO1xuICAgICAgICAgICAgaWYgKGlzQ29udGFpbmVyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIGRlZmF1bHRUeXBlID0gdHlwZW9mIGRlZmF1bHRWYWw7XG4gICAgICAgICAgICB2YXIgdHlwZV9sb3dlckNhc2UgPSB0eXBlLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICBpZiAoZGVmYXVsdFR5cGUgPT09IHR5cGVfbG93ZXJDYXNlKSB7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVfbG93ZXJDYXNlID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZGVmYXVsdFZhbCAmJiAhKGRlZmF1bHRWYWwgaW5zdGFuY2VvZiBvYmplY3RUeXBlQ3RvcikpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIEZpcmUud2FybignVGhlIGRlZmF1bHQgdmFsdWUgb2YgJXMuJXMgaXMgbm90IGluc3RhbmNlIG9mICVzLicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgSlMuZ2V0Q2xhc3NOYW1lKGNvbnN0cnVjdG9yKSwgbWFpblByb3BOYW1lLCBKUy5nZXRDbGFzc05hbWUob2JqZWN0VHlwZUN0b3IpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgRmlyZS53YXJuKCdObyBuZWVkcyB0byBpbmRpY2F0ZSB0aGUgXCIlc1wiIGF0dHJpYnV0ZSBmb3IgJXMuJXMsIHdoaWNoIGl0cyBkZWZhdWx0IHZhbHVlIGlzIHR5cGUgb2YgJXMuJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJOYW1lLCBKUy5nZXRDbGFzc05hbWUoY29uc3RydWN0b3IpLCBtYWluUHJvcE5hbWUsIHR5cGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIEZpcmUud2FybignQ2FuIG5vdCBpbmRpY2F0ZSB0aGUgXCIlc1wiIGF0dHJpYnV0ZSBmb3IgJXMuJXMsIHdoaWNoIGl0cyBkZWZhdWx0IHZhbHVlIGlzIHR5cGUgb2YgJXMuJyxcbiAgICAgICAgICAgICAgICAgICAgYXR0ck5hbWUsIEpTLmdldENsYXNzTmFtZShjb25zdHJ1Y3RvciksIG1haW5Qcm9wTmFtZSwgZGVmYXVsdFR5cGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZGVsZXRlIG1haW5Qcm9wQXR0cnMudHlwZTtcbiAgICAgICAgfTtcbiAgICB9XG59XG5cbi8qKlxuICogSW5kaWNhdGVzIHRoYXQgdGhlIHR5cGUgb2YgZWxlbWVudHMgaW4gYXJyYXkgb3IgdGhlIHR5cGUgb2YgdmFsdWUgaW4gZGljdGlvbmFyeSBpcyBib29sZWFuLlxuICogQHByb3BlcnR5IEJvb2xlYW5cbiAqIEB0eXBlXG4gKi9cbkZpcmUuQm9vbGVhbiA9ICdCb29sZWFuJztcblxuLyoqXG4gKiBJbmRpY2F0ZXMgdGhhdCB0aGUgdHlwZSBvZiBlbGVtZW50cyBpbiBhcnJheSBvciB0aGUgdHlwZSBvZiB2YWx1ZSBpbiBkaWN0aW9uYXJ5IGlzIHN0cmluZy5cbiAqIEBwcm9wZXJ0eSBTdHJpbmdcbiAqIEB0eXBlIG9iamVjdFxuICovXG5GaXJlLlN0cmluZyA9ICdTdHJpbmcnO1xuXG4vLyB0aGUgdmFsdWUgd2lsbCBiZSByZXByZXNlbnRlZCBhcyBhIHV1aWQgc3RyaW5nXG5GaXJlLl9TY3JpcHRVdWlkID0ge307XG5cbi8qKlxuICogTWFrZXMgYSBwcm9wZXJ0eSBvbmx5IGFjY2VwdCB0aGUgc3VwcGxpZWQgb2JqZWN0IHR5cGUgaW4gSW5zcGVjdG9yLlxuICogSWYgdGhlIHR5cGUgaXMgZGVyaXZlZCBmcm9tIEZpcmUuQXNzZXQsIGl0IHdpbGwgYmUgc2VyaWFsaXplZCBhcyB1dWlkLlxuICpcbiAqIEBtZXRob2QgT2JqZWN0VHlwZVxuICogQHBhcmFtIHtmdW5jdGlvbn0gdHlwZUN0b3IgLSB0aGUgc3BlY2lhbCB0eXBlIHlvdSB3YW50XG4gKiBAcmV0dXJuIHtvYmplY3R9IHRoZSBhdHRyaWJ1dGVcbiAqIEBwcml2YXRlXG4gKi9cbkZpcmUuT2JqZWN0VHlwZSA9IGZ1bmN0aW9uICh0eXBlQ3Rvcikge1xuICAgIGlmIChGSVJFX0VESVRPUikge1xuICAgICAgICBpZiAoIXR5cGVDdG9yKSB7XG4gICAgICAgICAgICBGaXJlLndhcm4oJ0FyZ3VtZW50IGZvciBGaXJlLk9iamVjdFR5cGUgbXVzdCBiZSBub24tbmlsJyk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHR5cGVvZiB0eXBlQ3RvciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgRmlyZS53YXJuKCdBcmd1bWVudCBmb3IgRmlyZS5PYmplY3RUeXBlIG11c3QgYmUgZnVuY3Rpb24gdHlwZScpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICAgIHR5cGU6ICdPYmplY3QnLFxuICAgICAgICBjdG9yOiB0eXBlQ3RvcixcbiAgICAgICAgLy8gX29uQWZ0ZXJQcm9wOiAoZnVuY3Rpb24gKCkge1xuICAgICAgICAvLyAgICAgaWYgKEZJUkVfREVWKSB7XG4gICAgICAgIC8vICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChjbGFzc0N0b3IsIG1haW5Qcm9wTmFtZSkge1xuICAgICAgICAvLyAgICAgICAgICAgICB2YXIgY2hlY2sgPSBnZXRUeXBlQ2hlY2tlcignT2JqZWN0JywgJ0ZpcmUuT2JqZWN0VHlwZScsIHR5cGVDdG9yKTtcbiAgICAgICAgLy8gICAgICAgICAgICAgY2hlY2soY2xhc3NDdG9yLCBtYWluUHJvcE5hbWUpO1xuICAgICAgICAvLyAgICAgICAgICAgICAvLyBjaGVjayBWYWx1ZVR5cGVcbiAgICAgICAgLy8gICAgICAgICAgICAgdmFyIG1haW5Qcm9wQXR0cnMgPSBGaXJlLmF0dHIoY2xhc3NDdG9yLCBtYWluUHJvcE5hbWUpIHx8IHt9O1xuICAgICAgICAvLyAgICAgICAgICAgICBpZiAoIUFycmF5LmlzQXJyYXkobWFpblByb3BBdHRycy5kZWZhdWx0KSAmJiB0eXBlb2YgdHlwZUN0b3IucHJvdG90eXBlLmNsb25lID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICB2YXIgdHlwZW5hbWUgPSBKUy5nZXRDbGFzc05hbWUodHlwZUN0b3IpO1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgdmFyIGhhc0RlZmF1bHQgPSBtYWluUHJvcEF0dHJzLmRlZmF1bHQgPT09IG51bGwgfHwgbWFpblByb3BBdHRycy5kZWZhdWx0ID09PSB1bmRlZmluZWQ7XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICBpZiAoaGFzRGVmYXVsdCkge1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgIEZpcmUud2FybignJXMgaXMgYSBWYWx1ZVR5cGUsIG5vIG5lZWQgdG8gc3BlY2lmeSB0aGUgXCJ0eXBlXCIgb2YgXCIlcy4lc1wiLCAnICtcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2JlY2F1c2UgdGhlIHR5cGUgaW5mb3JtYXRpb24gY2FuIG9idGFpbiBmcm9tIGl0cyBkZWZhdWx0IHZhbHVlIGRpcmVjdGx5LicsXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGVuYW1lLCBKUy5nZXRDbGFzc05hbWUoY2xhc3NDdG9yKSwgbWFpblByb3BOYW1lLCB0eXBlbmFtZSk7XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICB9XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICBGaXJlLndhcm4oJyVzIGlzIGEgVmFsdWVUeXBlLCBubyBuZWVkIHRvIHNwZWNpZnkgdGhlIFwidHlwZVwiIG9mIFwiJXMuJXNcIiwgJyArXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdqdXN0IHNldCB0aGUgZGVmYXVsdCB2YWx1ZSB0byBcIm5ldyAlcygpXCIgYW5kIGl0IHdpbGwgYmUgaGFuZGxlZCBwcm9wZXJseS4nLFxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlbmFtZSwgSlMuZ2V0Q2xhc3NOYW1lKGNsYXNzQ3RvciksIG1haW5Qcm9wTmFtZSwgdHlwZW5hbWUpO1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgfVxuICAgICAgICAvLyAgICAgICAgICAgICB9XG4gICAgICAgIC8vICAgICAgICAgfTtcbiAgICAgICAgLy8gICAgIH1cbiAgICAgICAgLy8gICAgIGVsc2Uge1xuICAgICAgICAvLyAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgIC8vICAgICB9XG4gICAgICAgIC8vIH0pKClcbiAgICB9O1xufTtcblxuLyoqXG4gKiBNYWtlcyBhIHByb3BlcnR5IHJlZmVyZW5jZWQgdG8gYSBqYXZhc2NyaXB0IGhvc3Qgb2JqZWN0IHdoaWNoIG5lZWRzIHRvIGxvYWQgYmVmb3JlIGRlc2VyaWFsemF0aW9uLlxuICogVGhlIHByb3BlcnR5IHdpbGwgbm90IGJlIHNlcmlhbGl6ZWQgYnV0IHdpbGwgYmUgcmVmZXJlbmNlZCB0byB0aGUgbG9hZGVkIGhvc3Qgb2JqZWN0IHdoaWxlIGRlc2VyaWFsemF0aW9uLlxuICpcbiAqIEBtZXRob2QgUmF3VHlwZVxuICogQHBhcmFtIHtzdHJpbmd9IFt0eXBlbmFtZV1cbiAqIEByZXR1cm4ge29iamVjdH0gdGhlIGF0dHJpYnV0ZVxuICogQHByaXZhdGVcbiAqL1xuRmlyZS5SYXdUeXBlID0gZnVuY3Rpb24gKHR5cGVuYW1lKSB7XG4gICAgdmFyIE5FRURfRVhUX1RZUEVTID0gWydpbWFnZScsICdqc29uJywgJ3RleHQnLCAnYXVkaW8nXTsgIC8vIHRoZSB0eXBlcyBuZWVkIHRvIHNwZWNpZnkgZXhhY3QgZXh0bmFtZVxuICAgIHJldHVybiB7XG4gICAgICAgIC8vIHR5cGU6ICdyYXcnLFxuICAgICAgICByYXdUeXBlOiB0eXBlbmFtZSxcbiAgICAgICAgc2VyaWFsaXphYmxlOiBmYWxzZSxcbiAgICAgICAgLy8gaGlkZUluSW5zcGVjdG9yOiB0cnVlLFxuICAgICAgICBfY2FuVXNlZEluR2V0dGVyOiBmYWxzZSxcblxuICAgICAgICBfb25BZnRlclByb3A6IGZ1bmN0aW9uIChjb25zdHJ1Y3RvciwgbWFpblByb3BOYW1lKSB7XG4gICAgICAgICAgICAvLyBjaGVjayByYXcgb2JqZWN0XG4gICAgICAgICAgICB2YXIgY2hlY2tlZCA9ICFGSVJFX0RFViB8fCAoZnVuY3Rpb24gY2hlY2tSYXdUeXBlKGNvbnN0cnVjdG9yKSB7XG4gICAgICAgICAgICAgICAgaWYgKCEgRmlyZS5pc0NoaWxkQ2xhc3NPZihjb25zdHJ1Y3RvciwgRmlyZS5Bc3NldCkpIHtcbiAgICAgICAgICAgICAgICAgICAgRmlyZS5lcnJvcignUmF3VHlwZSBpcyBvbmx5IGF2YWlsYWJsZSBmb3IgQXNzZXRzJyk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdmFyIGZvdW5kID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgcCA9IDA7IHAgPCBjb25zdHJ1Y3Rvci5fX3Byb3BzX18ubGVuZ3RoOyBwKyspIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHByb3BOYW1lID0gY29uc3RydWN0b3IuX19wcm9wc19fW3BdO1xuICAgICAgICAgICAgICAgICAgICB2YXIgYXR0cnMgPSBGaXJlLmF0dHIoY29uc3RydWN0b3IsIHByb3BOYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHJhd1R5cGUgPSBhdHRycy5yYXdUeXBlO1xuICAgICAgICAgICAgICAgICAgICBpZiAocmF3VHlwZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGNvbnRhaW5zVXBwZXJjYXNlID0gKHJhd1R5cGUudG9Mb3dlckNhc2UoKSAhPT0gcmF3VHlwZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY29udGFpbnNVcHBlcmNhc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBGaXJlLmVycm9yKCdSYXdUeXBlIG5hbWUgY2Fubm90IGNvbnRhaW4gdXBwZXJjYXNlJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGZvdW5kKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgRmlyZS5lcnJvcignRWFjaCBhc3NldCBjYW5ub3QgaGF2ZSBtb3JlIHRoYW4gb25lIFJhd1R5cGUnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3VuZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9KShjb25zdHJ1Y3Rvcik7XG4gICAgICAgIH1cbiAgICB9O1xufTtcblxuLyoqXG4gKiBAbWV0aG9kIE51bGxhYmxlXG4gKiBAcGFyYW0ge3N0cmluZ30gYm9vbFByb3BOYW1lXG4gKiBAcGFyYW0ge0Jvb2xlYW59IGhhc1ZhbHVlQnlEZWZhdWx0XG4gKiBAcmV0dXJuIHtvYmplY3R9IHRoZSBhdHRyaWJ1dGVcbiAqIEBwcml2YXRlXG4gKi9cbkZpcmUuTnVsbGFibGUgPSBmdW5jdGlvbiAoYm9vbFByb3BOYW1lLCBoYXNWYWx1ZUJ5RGVmYXVsdCkge1xuICAgIHJldHVybiB7XG4gICAgICAgIG51bGxhYmxlOiBib29sUHJvcE5hbWUsXG5cbiAgICAgICAgX29uQWZ0ZXJQcm9wOiBmdW5jdGlvbiAoY29uc3RydWN0b3IsIG1haW5Qcm9wTmFtZSkge1xuICAgICAgICAgICAgLy8gZGVjbGFyZSBib29sZWFuXG4gICAgICAgICAgICBjb25zdHJ1Y3Rvci5wcm9wKGJvb2xQcm9wTmFtZSwgaGFzVmFsdWVCeURlZmF1bHQsIHsgdmlzaWJsZTogZmFsc2UgfSk7XG4gICAgICAgICAgICAvLyBjb3B5IGF0dHJpYnV0ZXMgZnJvbSBtYWluIHByb3BlcnR5XG4gICAgICAgICAgICB2YXIgbWFpblByb3BBdHRyID0gRmlyZS5hdHRyKGNvbnN0cnVjdG9yLCBtYWluUHJvcE5hbWUpIHx8IHt9O1xuICAgICAgICAgICAgaWYgKG1haW5Qcm9wQXR0ci5zZXJpYWxpemFibGUgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgRmlyZS5hdHRyKGNvbnN0cnVjdG9yLCBib29sUHJvcE5hbWUsIEZpcmUuTm9uU2VyaWFsaXplZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChtYWluUHJvcEF0dHIuZWRpdG9yT25seSkge1xuICAgICAgICAgICAgICAgIEZpcmUuYXR0cihjb25zdHJ1Y3RvciwgYm9vbFByb3BOYW1lLCBGaXJlLkVkaXRvck9ubHkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbn07XG5cbi8qKlxuICogQG1ldGhvZCBXYXRjaFxuICogQHBhcmFtIHtzdHJpbmd9IG5hbWVzIC0gdGhlIG5hbWUgb2YgdGFyZ2V0IHByb3BlcnR5IHRvIHdhdGNoLCBhcnJheSBpcyBhbHNvIGFjY2VwdGFibGUuXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBjYWxsYmFjayAtIHRoZSBjYWxsYmFjayBmdW5jdGlvbiB0byBpbnZva2Ugd2hlbiB0YXJnZXQgcHJvcGVydHkocykgaXMgY2hhbmdlZC5cbiAqIEBwYXJhbSB7b2JqZWN0fSBjYWxsYmFjay5wYXJhbSBvYmplY3QgLSB0aGUgaW5zdGFuY2Ugb2JqZWN0IHdoaWNoIGNvbnRhaW5zIHdhdGNoaW5nIHByb3BlcnR5KHMpLlxuICogQHBhcmFtIHtvYmplY3R9IGNhbGxiYWNrLnBhcmFtIGVsZW1lbnQgLSB0aGUgcHJvcGVydHkgZWxlbWVudCB3aGljaCBkaXNwbGF5cyB3YXRjaGluZyBwcm9wZXJ0eShzKS5cbiAqIEByZXR1cm4ge29iamVjdH0gdGhlIGF0dHJpYnV0ZVxuICogQHByaXZhdGVcbiAqL1xuRmlyZS5XYXRjaCA9IGZ1bmN0aW9uIChuYW1lcywgY2FsbGJhY2spIHtcbiAgICByZXR1cm4ge1xuICAgICAgICB3YXRjaDogW10uY29uY2F0KG5hbWVzKSwgIC8vIGFycmF5IG9mIHByb3BlcnR5IG5hbWUgdG8gd2F0Y2hcbiAgICAgICAgd2F0Y2hDYWxsYmFjazogY2FsbGJhY2tcbiAgICB9O1xufTtcblxuLyoqXG4gKiBAbWV0aG9kIFJhbmdlXG4gKiBAcGFyYW0ge251bWJlcn0gbWluOiBudWxsIG1pbnMgaW5maW5pdGVcbiAqIEBwYXJhbSB7bnVtYmVyfSBtYXg6IG51bGwgbWlucyBpbmZpbml0ZVxuICogQHJldHVybiB7b2JqZWN0fSB0aGUgYXR0cmlidXRlXG4gKiBAcHJpdmF0ZVxuICovXG5GaXJlLlJhbmdlID0gZnVuY3Rpb24gKG1pbiwgbWF4KSB7XG4gICByZXR1cm4geyBtaW46IG1pbiwgbWF4OiBtYXggfTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGdldFR5cGVDaGVja2VyOiBnZXRUeXBlQ2hlY2tlclxufTtcbiIsInZhciBKUyA9IHJlcXVpcmUoJy4vanMnKTtcblxuLyoqXG4gKiBUaGUgQ2FsbGJhY2tzSGFuZGxlciBpcyBhbiBhYnN0cmFjdCBjbGFzcyB0aGF0IGNhbiByZWdpc3RlciBhbmQgdW5yZWdpc3RlciBjYWxsYmFja3MgYnkga2V5LlxuICogU3ViY2xhc3NlcyBzaG91bGQgaW1wbGVtZW50IHRoZWlyIG93biBtZXRob2RzIGFib3V0IGhvdyB0byBpbnZva2UgdGhlIGNhbGxiYWNrcy5cbiAqIEBjbGFzcyBfQ2FsbGJhY2tzSGFuZGxlclxuICogQGNvbnN0cnVjdG9yXG4gKiBAcHJpdmF0ZVxuICovXG52YXIgQ2FsbGJhY2tzSGFuZGxlciA9IChmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5fY2FsbGJhY2tUYWJsZSA9IHt9O1xufSk7XG5cbi8qKlxuICogQG1ldGhvZCBhZGRcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXlcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IGNhbGxiYWNrIC0gY2FuIGJlIG51bGxcbiAqIEByZXR1cm4ge0Jvb2xlYW59IHdoZXRoZXIgdGhlIGtleSBpcyBuZXdcbiAqL1xuQ2FsbGJhY2tzSGFuZGxlci5wcm90b3R5cGUuYWRkID0gZnVuY3Rpb24gKGtleSwgY2FsbGJhY2spIHtcbiAgICB2YXIgbGlzdCA9IHRoaXMuX2NhbGxiYWNrVGFibGVba2V5XTtcbiAgICBpZiAodHlwZW9mIGxpc3QgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIGlmIChjYWxsYmFjaykge1xuICAgICAgICAgICAgaWYgKGxpc3QgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICBsaXN0LnB1c2goY2FsbGJhY2spO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgbGlzdCA9IFtjYWxsYmFja107XG4gICAgICAgICAgICAgICAgdGhpcy5fY2FsbGJhY2tUYWJsZVtrZXldID0gbGlzdDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICAvLyBuZXcga2V5XG4gICAgICAgIGxpc3QgPSBjYWxsYmFjayA/IFtjYWxsYmFja10gOiBudWxsO1xuICAgICAgICB0aGlzLl9jYWxsYmFja1RhYmxlW2tleV0gPSBsaXN0O1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG59O1xuXG4vKipcbiAqIENoZWNrIGlmIHRoZSBzcGVjaWZpZWQga2V5IGhhcyBhbnkgcmVnaXN0ZXJlZCBjYWxsYmFjay4gSWYgYSBjYWxsYmFjayBpcyBhbHNvIHNwZWNpZmllZCxcbiAqIGl0IHdpbGwgb25seSByZXR1cm4gdHJ1ZSBpZiB0aGUgY2FsbGJhY2sgaXMgcmVnaXN0ZXJlZC5cbiAqIEBtZXRob2QgaGFzXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5XG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBbY2FsbGJhY2tdXG4gKiBAcmV0dXJuIHtCb29sZWFufVxuICovXG5DYWxsYmFja3NIYW5kbGVyLnByb3RvdHlwZS5oYXMgPSBmdW5jdGlvbiAoa2V5LCBjYWxsYmFjaykge1xuICAgIHZhciBsaXN0ID0gdGhpcy5fY2FsbGJhY2tUYWJsZVtrZXldO1xuICAgIGlmIChsaXN0ICYmIGxpc3QubGVuZ3RoID4gMCkge1xuICAgICAgICBpZiAoY2FsbGJhY2spIHtcbiAgICAgICAgICAgIHJldHVybiBsaXN0LmluZGV4T2YoY2FsbGJhY2spICE9PSAtMTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xufTtcblxuLyoqXG4gKiBAbWV0aG9kIHJlbW92ZUFsbFxuICogQHBhcmFtIHtzdHJpbmd9IGtleVxuICovXG5DYWxsYmFja3NIYW5kbGVyLnByb3RvdHlwZS5yZW1vdmVBbGwgPSBmdW5jdGlvbiAoa2V5KSB7XG4gICAgZGVsZXRlIHRoaXMuX2NhbGxiYWNrVGFibGVba2V5XTtcbn07XG5cbi8qKlxuICogQG1ldGhvZCByZW1vdmVcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXlcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IGNhbGxiYWNrXG4gKiBAcmV0dXJuIHtCb29sZWFufSByZW1vdmVkXG4gKi9cbkNhbGxiYWNrc0hhbmRsZXIucHJvdG90eXBlLnJlbW92ZSA9IGZ1bmN0aW9uIChrZXksIGNhbGxiYWNrKSB7XG4gICAgdmFyIGxpc3QgPSB0aGlzLl9jYWxsYmFja1RhYmxlW2tleV07XG4gICAgaWYgKGxpc3QpIHtcbiAgICAgICAgdmFyIGluZGV4ID0gbGlzdC5pbmRleE9mKGNhbGxiYWNrKTtcbiAgICAgICAgaWYgKGluZGV4ICE9PSAtMSkge1xuICAgICAgICAgICAgbGlzdC5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xufTtcblxuRmlyZS5fQ2FsbGJhY2tzSGFuZGxlciA9IENhbGxiYWNrc0hhbmRsZXI7XG5cblxuLyoqXG4gKiBUaGUgY2FsbGJhY2tzIGludm9rZXIgdG8gaGFuZGxlIGFuZCBpbnZva2UgY2FsbGJhY2tzIGJ5IGtleVxuICpcbiAqIEBjbGFzcyBDYWxsYmFja3NJbnZva2VyXG4gKiBAY29uc3RydWN0b3JcbiAqIEBleHRlbmRzIF9DYWxsYmFja3NIYW5kbGVyXG4gKi9cbnZhciBDYWxsYmFja3NJbnZva2VyID0gZnVuY3Rpb24gKCkge1xuICAgIENhbGxiYWNrc0hhbmRsZXIuY2FsbCh0aGlzKTtcbn07XG5KUy5leHRlbmQoQ2FsbGJhY2tzSW52b2tlciwgQ2FsbGJhY2tzSGFuZGxlcik7XG5cbkZpcmUuQ2FsbGJhY2tzSW52b2tlciA9IENhbGxiYWNrc0ludm9rZXI7XG5cbi8qKlxuICogQG1ldGhvZCBpbnZva2VcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXlcbiAqIEBwYXJhbSB7YW55fSBbcDFdXG4gKiBAcGFyYW0ge2FueX0gW3AyXVxuICogQHBhcmFtIHthbnl9IFtwM11cbiAqIEBwYXJhbSB7YW55fSBbcDRdXG4gKiBAcGFyYW0ge2FueX0gW3A1XVxuICovXG5DYWxsYmFja3NJbnZva2VyLnByb3RvdHlwZS5pbnZva2UgPSBmdW5jdGlvbiAoa2V5LCBwMSwgcDIsIHAzLCBwNCwgcDUpIHtcbiAgICB2YXIgbGlzdCA9IHRoaXMuX2NhbGxiYWNrVGFibGVba2V5XTtcbiAgICBpZiAobGlzdCkge1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGxpc3RbaV0ocDEsIHAyLCBwMywgcDQsIHA1KTtcbiAgICAgICAgfVxuICAgIH1cbn07XG5cbi8qKlxuICogQG1ldGhvZCBpbnZva2VBbmRSZW1vdmVcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXlcbiAqIEBwYXJhbSB7YW55fSBbcDFdXG4gKiBAcGFyYW0ge2FueX0gW3AyXVxuICogQHBhcmFtIHthbnl9IFtwM11cbiAqIEBwYXJhbSB7YW55fSBbcDRdXG4gKiBAcGFyYW0ge2FueX0gW3A1XVxuICovXG5DYWxsYmFja3NJbnZva2VyLnByb3RvdHlwZS5pbnZva2VBbmRSZW1vdmUgPSBmdW5jdGlvbiAoa2V5LCBwMSwgcDIsIHAzLCBwNCwgcDUpIHtcbiAgICAvLyB0aGlzLmludm9rZShrZXksIHAxLCBwMiwgcDMsIHA0LCBwNSk7XG4gICAgLy8g6L+Z6YeM5LiN55u05o6l6LCD55SoaW52b2tl5LuF5LuF5piv5Li65LqG5YeP5bCR6LCD55So5aCG5qCI55qE5rex5bqm77yM5pa55L6/6LCD6K+VXG4gICAgdmFyIGxpc3QgPSB0aGlzLl9jYWxsYmFja1RhYmxlW2tleV07XG4gICAgaWYgKGxpc3QpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBsaXN0W2ldKHAxLCBwMiwgcDMsIHA0LCBwNSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5yZW1vdmVBbGwoa2V5KTtcbn07XG5cbi8qKlxuICogQG1ldGhvZCBiaW5kS2V5XG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5XG4gKiBAcGFyYW0ge0Jvb2xlYW59IFtyZW1vdmU9ZmFsc2VdIC0gcmVtb3ZlIGNhbGxiYWNrcyBhZnRlciBpbnZva2VkXG4gKiBAcmV0dXJuIHtmdW5jdGlvbn0gdGhlIG5ldyBjYWxsYmFjayB3aGljaCB3aWxsIGludm9rZSBhbGwgdGhlIGNhbGxiYWNrcyBiaW5kZWQgd2l0aCB0aGUgc2FtZSBzdXBwbGllZCBrZXlcbiAqL1xuQ2FsbGJhY2tzSW52b2tlci5wcm90b3R5cGUuYmluZEtleSA9IGZ1bmN0aW9uIChrZXksIHJlbW92ZSkge1xuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICByZXR1cm4gZnVuY3Rpb24gYmluZGVkSW52b2NhdGlvbiAocDEsIHAyLCBwMywgcDQsIHA1KSB7XG4gICAgICAgIC8vIHRoaXMuaW52b2tlKGtleSwgcDEsIHAyLCBwMywgcDQsIHA1KTtcbiAgICAgICAgLy8g6L+Z6YeM5LiN55u05o6l6LCD55SoaW52b2tl5LuF5LuF5piv5Li65LqG5YeP5bCR6LCD55So5aCG5qCI55qE5rex5bqm77yM5pa55L6/6LCD6K+VXG4gICAgICAgIHZhciBsaXN0ID0gc2VsZi5fY2FsbGJhY2tUYWJsZVtrZXldO1xuICAgICAgICBpZiAobGlzdCkge1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgbGlzdFtpXShwMSwgcDIsIHAzLCBwNCwgcDUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChyZW1vdmUpIHtcbiAgICAgICAgICAgIHNlbGYucmVtb3ZlQWxsKGtleSk7XG4gICAgICAgIH1cbiAgICB9O1xufTtcblxuQ2FsbGJhY2tzSW52b2tlci5DYWxsYmFja3NIYW5kbGVyID0gQ2FsbGJhY2tzSGFuZGxlcjtcbm1vZHVsZS5leHBvcnRzID0gQ2FsbGJhY2tzSW52b2tlcjtcbiIsInJlcXVpcmUoJy4vYXR0cmlidXRlJyk7XG5yZXF1aXJlKCcuL2NsYXNzJyk7XG4vL3ZhciBGT2JqZWN0ID0gcmVxdWlyZSgnLi9mb2JqZWN0Jyk7XG52YXIgZ2V0VHlwZUNoZWNrZXIgPSByZXF1aXJlKCcuL2F0dHJpYnV0ZScpLmdldFR5cGVDaGVja2VyO1xudmFyIHByZXByb2Nlc3NBdHRycyA9IHJlcXVpcmUoJy4vcHJlcHJvY2Vzcy1hdHRycycpO1xuXG5cbi8qKlxuICogISNlbiBEZWZpbmVzIGEgRmlyZUNsYXNzIHVzaW5nIHRoZSBnaXZlbiBzcGVjaWZpY2F0aW9uLCBwbGVhc2Ugc2VlIFtDbGFzc10oL2VuL3NjcmlwdGluZy9jbGFzcy8pIGZvciBkZXRhaWxzLlxuICogISN6aCDlrprkuYnkuIDkuKogRmlyZUNsYXNz77yM5Lyg5YWl5Y+C5pWw5b+F6aG75piv5LiA5Liq5YyF5ZCr57G75Z6L5Y+C5pWw55qE5a2X6Z2i6YeP5a+56LGh77yM5YW35L2T55So5rOV6K+35p+l6ZiFW+exu+Wei+WumuS5iV0oL3poL3NjcmlwdGluZy9jbGFzcy8p44CCXG4gKlxuICogQG1ldGhvZCBDbGFzc1xuICogQHBhcmFtIHtvYmplY3R9IG9wdGlvbnNcbiAqIEByZXR1cm4ge2Z1bmN0aW9ufSAtIHRoZSBjcmVhdGVkIGNsYXNzXG4gKlxuICogQGV4YW1wbGVcbiAgICAvLyBkZWZpbmUgYmFzZSBjbGFzc1xuICAgIHZhciBOb2RlID0gRmlyZS5DbGFzcygpO1xuXG4gICAgLy8gZGVmaW5lIHN1YiBjbGFzc1xuICAgIHZhciBTcHJpdGUgPSBGaXJlLkNsYXNzKHtcbiAgICAgICAgbmFtZTogJ1Nwcml0ZScsXG4gICAgICAgIGV4dGVuZHM6IE5vZGUsXG4gICAgICAgIGNvbnN0cnVjdG9yOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLnVybCA9IFwiXCI7XG4gICAgICAgICAgICB0aGlzLmlkID0gMDtcbiAgICAgICAgfSxcblxuICAgICAgICBwcm9wZXJ0aWVzIHtcbiAgICAgICAgICAgIHdpZHRoOiB7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDogMTI4LFxuICAgICAgICAgICAgICAgIHR5cGU6ICdJbnRlZ2VyJyxcbiAgICAgICAgICAgICAgICB0b29sdGlwOiAnVGhlIHdpZHRoIG9mIHNwcml0ZSdcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBoZWlnaHQ6IDEyOCxcbiAgICAgICAgICAgIHNpemU6IHtcbiAgICAgICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIEZpcmUudjIodGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBsb2FkOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAvLyBsb2FkIHRoaXMudXJsXG4gICAgICAgIH07XG4gICAgfSk7XG5cbiAgICAvLyBpbnN0YW50aWF0ZVxuXG4gICAgdmFyIG9iaiA9IG5ldyBTcHJpdGUoKTtcbiAgICBvYmoudXJsID0gJ3Nwcml0ZS5wbmcnO1xuICAgIG9iai5sb2FkKCk7XG5cbiAgICAvLyBkZWZpbmUgc3RhdGljIG1lbWJlclxuXG4gICAgU3ByaXRlLmNvdW50ID0gMDtcbiAgICBTcHJpdGUuZ2V0Qm91bmRzID0gZnVuY3Rpb24gKHNwcml0ZUxpc3QpIHtcbiAgICAgICAgLy8gLi4uXG4gICAgfTtcbiAqL1xuRmlyZS5DbGFzcyA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgcmV0dXJuIEZpcmUuZXh0ZW5kKCk7XG4gICAgfVxuICAgIGlmICggIW9wdGlvbnMgKSB7XG4gICAgICAgIEZpcmUuZXJyb3IoJ1tGaXJlLkNsYXNzXSBPcHRpb24gbXVzdCBiZSBub24tbmlsJyk7XG4gICAgICAgIHJldHVybiBGaXJlLmV4dGVuZCgpO1xuICAgIH1cblxuICAgIHZhciBuYW1lID0gb3B0aW9ucy5uYW1lO1xuICAgIHZhciBiYXNlID0gb3B0aW9ucy5leHRlbmRzLyogfHwgRk9iamVjdCovO1xuICAgIHZhciBjdG9yID0gKG9wdGlvbnMuaGFzT3duUHJvcGVydHkoJ2NvbnN0cnVjdG9yJykgJiYgb3B0aW9ucy5jb25zdHJ1Y3RvcikgfHwgdW5kZWZpbmVkO1xuXG4gICAgLy8gY3JlYXRlIGNvbnN0cnVjdG9yXG4gICAgdmFyIGNscztcbiAgICAvL2lmIChiYXNlKSB7XG4gICAgICAgIGlmIChuYW1lKSB7XG4gICAgICAgICAgICBjbHMgPSBGaXJlLmV4dGVuZChuYW1lLCBiYXNlLCBjdG9yKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGNscyA9IEZpcmUuZXh0ZW5kKGJhc2UsIGN0b3IpO1xuICAgICAgICAgICAgbmFtZSA9IEZpcmUuSlMuZ2V0Q2xhc3NOYW1lKGNscyk7XG4gICAgICAgIH1cbiAgICAvL31cbiAgICAvL2Vsc2Uge1xuICAgIC8vICAgIGlmIChuYW1lKSB7XG4gICAgLy8gICAgICAgIGNscyA9IEZpcmUuZGVmaW5lKG5hbWUsIGN0b3IpO1xuICAgIC8vICAgIH1cbiAgICAvLyAgICBlbHNlIHtcbiAgICAvLyAgICAgICAgY2xzID0gRmlyZS5kZWZpbmUoY3Rvcik7XG4gICAgLy8gICAgICAgIG5hbWUgPSBGaXJlLkpTLmdldENsYXNzTmFtZShjbHMpO1xuICAgIC8vICAgIH1cbiAgICAvL31cblxuICAgIC8vIGRlZmluZSBwcm9wZXJ0aWVzXG4gICAgdmFyIHByb3BlcnRpZXMgPSBvcHRpb25zLnByb3BlcnRpZXM7XG4gICAgaWYgKHByb3BlcnRpZXMpIHtcblxuICAgICAgICAvLyDpooTlpITnkIblsZ7mgKdcbiAgICAgICAgcHJlcHJvY2Vzc0F0dHJzKHByb3BlcnRpZXMsIG5hbWUpO1xuXG4gICAgICAgIGZvciAodmFyIHByb3BOYW1lIGluIHByb3BlcnRpZXMpIHtcbiAgICAgICAgICAgIHZhciB2YWwgPSBwcm9wZXJ0aWVzW3Byb3BOYW1lXTtcbiAgICAgICAgICAgIHZhciBpc09iaiA9IHZhbCAmJiB0eXBlb2YgdmFsID09PSAnb2JqZWN0JyAmJiAhQXJyYXkuaXNBcnJheSh2YWwpO1xuICAgICAgICAgICAgdmFyIGlzTGl0ZXJhbCA9IGlzT2JqICYmIHZhbC5jb25zdHJ1Y3RvciA9PT0gKHt9KS5jb25zdHJ1Y3RvcjtcbiAgICAgICAgICAgIGlmICggIWlzTGl0ZXJhbCApIHtcbiAgICAgICAgICAgICAgICB2YWwgPSB7XG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6IHZhbFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvL3ZhciBpc1ZhbHVlVHlwZSA9IHR5cGVvZiB2YWwucHJvdG90eXBlLmNsb25lID09PSAnZnVuY3Rpb24nO1xuICAgICAgICAgICAgLy9pZiAoaXNWYWx1ZVR5cGUpIHtcbiAgICAgICAgICAgIC8vICAgIGNscy5wcm9wKHByb3BOYW1lLCB2YWwpO1xuICAgICAgICAgICAgLy8gICAgY29udGludWU7XG4gICAgICAgICAgICAvL31cbiAgICAgICAgICAgIHZhciBhdHRycyA9IHBhcnNlQXR0cmlidXRlcyh2YWwsIG5hbWUsIHByb3BOYW1lKTtcbiAgICAgICAgICAgIGlmICh2YWwuaGFzT3duUHJvcGVydHkoJ2RlZmF1bHQnKSkge1xuICAgICAgICAgICAgICAgIGNscy5wcm9wLmFwcGx5KGNscywgW3Byb3BOYW1lLCB2YWwuZGVmYXVsdF0uY29uY2F0KGF0dHJzKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB2YXIgZ2V0dGVyID0gdmFsLmdldDtcbiAgICAgICAgICAgICAgICB2YXIgc2V0dGVyID0gdmFsLnNldDtcbiAgICAgICAgICAgICAgICBpZiAoRklSRV9FRElUT1IpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFnZXR0ZXIgJiYgIXNldHRlcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgRmlyZS5lcnJvcignUHJvcGVydHkgJXMuJXMgbXVzdCBkZWZpbmUgYXQgbGVhc3Qgb25lIG9mIFwiZGVmYXVsdFwiLCBcImdldFwiIG9yIFwic2V0XCIuJywgbmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9wTmFtZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGdldHRlcikge1xuICAgICAgICAgICAgICAgICAgICBjbHMuZ2V0LmFwcGx5KGNscywgW3Byb3BOYW1lLCBnZXR0ZXJdLmNvbmNhdChhdHRycykpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoc2V0dGVyKSB7XG4gICAgICAgICAgICAgICAgICAgIGNscy5zZXQocHJvcE5hbWUsIHNldHRlcik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gZGVmaW5lIHN0YXRpY3NcbiAgICB2YXIgc3RhdGljcyA9IG9wdGlvbnMuc3RhdGljcztcbiAgICBpZiAoc3RhdGljcykge1xuICAgICAgICB2YXIgc3RhdGljUHJvcE5hbWU7XG4gICAgICAgIGlmIChGSVJFX0VESVRPUikge1xuICAgICAgICAgICAgdmFyIElOVkFMSURfU1RBVElDUyA9IFsnbmFtZScsICdfX2N0b3JzX18nLCAnX19wcm9wc19fJywgJ2FyZ3VtZW50cycsICdjYWxsJywgJ2FwcGx5JywgJ2NhbGxlcicsICdnZXQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnZ2V0c2V0JywgJ2xlbmd0aCcsICdwcm9wJywgJ3Byb3RvdHlwZScsICdzZXQnXTtcbiAgICAgICAgICAgIGZvciAoc3RhdGljUHJvcE5hbWUgaW4gc3RhdGljcykge1xuICAgICAgICAgICAgICAgIGlmIChJTlZBTElEX1NUQVRJQ1MuaW5kZXhPZihzdGF0aWNQcm9wTmFtZSkgIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIEZpcmUuZXJyb3IoJ0Nhbm5vdCBkZWZpbmUgJXMuJXMgYmVjYXVzZSBzdGF0aWMgbWVtYmVyIG5hbWUgY2FuIG5vdCBiZSBcIiVzXCIuJywgbmFtZSwgc3RhdGljUHJvcE5hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBzdGF0aWNQcm9wTmFtZSk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBmb3IgKHN0YXRpY1Byb3BOYW1lIGluIHN0YXRpY3MpIHtcbiAgICAgICAgICAgIGNsc1tzdGF0aWNQcm9wTmFtZV0gPSBzdGF0aWNzW3N0YXRpY1Byb3BOYW1lXTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIGRlZmluZSBmdW5jdGlvbnNcbiAgICB2YXIgQlVJTFRJTl9FTlRSSUVTID0gWyduYW1lJywgJ2V4dGVuZHMnLCAnY29uc3RydWN0b3InLCAncHJvcGVydGllcycsICdzdGF0aWNzJ107XG4gICAgZm9yICh2YXIgZnVuY05hbWUgaW4gb3B0aW9ucykge1xuICAgICAgICBpZiAoQlVJTFRJTl9FTlRSSUVTLmluZGV4T2YoZnVuY05hbWUpICE9PSAtMSkge1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGZ1bmMgPSBvcHRpb25zW2Z1bmNOYW1lXTtcbiAgICAgICAgdmFyIHR5cGUgPSB0eXBlb2YgZnVuYztcbiAgICAgICAgaWYgKHR5cGUgPT09ICdmdW5jdGlvbicgfHwgZnVuYyA9PT0gbnVsbCkge1xuICAgICAgICAgICAgY2xzLnByb3RvdHlwZVtmdW5jTmFtZV0gPSBmdW5jO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKEZJUkVfRURJVE9SKSB7XG4gICAgICAgICAgICB2YXIgVHlwb0NoZWNrTGlzdCA9IHtcbiAgICAgICAgICAgICAgICBleHRlbmQ6ICdleHRlbmRzJyxcbiAgICAgICAgICAgICAgICBwcm9wZXJ0eTogJ3Byb3BlcnRpZXMnLFxuICAgICAgICAgICAgICAgIHN0YXRpYzogJ3N0YXRpY3MnXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgdmFyIGNvcnJlY3QgPSBUeXBvQ2hlY2tMaXN0W2Z1bmNOYW1lXTtcbiAgICAgICAgICAgIGlmIChjb3JyZWN0KSB7XG4gICAgICAgICAgICAgICAgRmlyZS53YXJuKCdVbmtub3duIHBhcmFtZXRlciBvZiAlcy4lcywgbWF5YmUgeW91IHdhbnQgaXMgXCIlc1wiLicsIG5hbWUsIGZ1bmNOYW1lLCBjb3JyZWN0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIEZpcmUuZXJyb3IoJ1Vua25vd24gcGFyYW1ldGVyIG9mICVzLiVzJywgbmFtZSwgZnVuY05hbWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGNscztcbn07XG5cbnZhciB0bXBBdHRycyA9IFtdO1xuZnVuY3Rpb24gcGFyc2VBdHRyaWJ1dGVzIChhdHRycywgY2xhc3NOYW1lLCBwcm9wTmFtZSkge1xuICAgIHZhciBFUlJfVHlwZSA9IEZJUkVfRURJVE9SID8gJ1RoZSAlcyBvZiAlcyBtdXN0IGJlIHR5cGUgJXMnIDogJyc7XG5cbiAgICB0bXBBdHRycy5sZW5ndGggPSAwO1xuICAgIHZhciByZXN1bHQgPSB0bXBBdHRycztcblxuICAgIHZhciB0eXBlID0gYXR0cnMudHlwZTtcbiAgICBpZiAodHlwZSAmJiBGSVJFX0VESVRPUikge1xuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheSh0eXBlKSkge1xuICAgICAgICAgICAgaWYgKHR5cGUubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIHR5cGUgPSB0eXBlWzBdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgRmlyZS5lcnJvcignSW52YWxpZCB0eXBlIG9mICVzLiVzJywgY2xhc3NOYW1lLCBwcm9wTmFtZSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICh0eXBlID09PSBGaXJlLkludGVnZXIpIHtcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKCB7IHR5cGU6IEZpcmUuSW50ZWdlciB9ICk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodHlwZSA9PT0gRmlyZS5GbG9hdCB8fCB0eXBlID09PSBOdW1iZXIpIHtcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKCB7IHR5cGU6IEZpcmUuRmxvYXQgfSApO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHR5cGUgPT09IEZpcmUuQm9vbGVhbiB8fCB0eXBlID09PSBCb29sZWFuKSB7XG4gICAgICAgICAgICByZXN1bHQucHVzaCh7XG4gICAgICAgICAgICAgICAgdHlwZTogRmlyZS5Cb29sZWFuLFxuICAgICAgICAgICAgICAgIF9vbkFmdGVyUHJvcDogZ2V0VHlwZUNoZWNrZXIoRmlyZS5Cb29sZWFuLCAnRmlyZS5Cb29sZWFuJylcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHR5cGUgPT09IEZpcmUuU3RyaW5nIHx8IHR5cGUgPT09IFN0cmluZykge1xuICAgICAgICAgICAgcmVzdWx0LnB1c2goe1xuICAgICAgICAgICAgICAgIHR5cGU6IEZpcmUuU3RyaW5nLFxuICAgICAgICAgICAgICAgIF9vbkFmdGVyUHJvcDogZ2V0VHlwZUNoZWNrZXIoRmlyZS5TdHJpbmcsICdGaXJlLlN0cmluZycpXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0eXBlID09PSAnT2JqZWN0JyB8fCB0eXBlID09PSBPYmplY3QpIHtcbiAgICAgICAgICAgIGlmIChGSVJFX0VESVRPUikge1xuICAgICAgICAgICAgICAgIEZpcmUuZXJyb3IoJ1BsZWFzZSBkZWZpbmUgXCJ0eXBlXCIgcGFyYW1ldGVyIG9mICVzLiVzIGFzIHRoZSBhY3R1YWwgY29uc3RydWN0b3IuJywgY2xhc3NOYW1lLCBwcm9wTmFtZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodHlwZSA9PT0gRmlyZS5fU2NyaXB0VXVpZCkge1xuICAgICAgICAgICAgdmFyIGF0dHIgPSBGaXJlLk9iamVjdFR5cGUoRmlyZS5TY3JpcHRBc3NldCk7XG4gICAgICAgICAgICBhdHRyLnR5cGUgPSAnU2NyaXB0JztcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKGF0dHIpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiB0eXBlID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgICAgIGlmIChGaXJlLmlzRW51bVR5cGUodHlwZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnB1c2goe1xuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogJ0VudW0nLFxuICAgICAgICAgICAgICAgICAgICAgICAgZW51bUxpc3Q6IEZpcmUuZ2V0RW51bUxpc3QodHlwZSlcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKEZJUkVfRURJVE9SKSB7XG4gICAgICAgICAgICAgICAgICAgIEZpcmUuZXJyb3IoJ1BsZWFzZSBkZWZpbmUgXCJ0eXBlXCIgcGFyYW1ldGVyIG9mICVzLiVzIGFzIHRoZSBjb25zdHJ1Y3RvciBvZiAlcy4nLCBjbGFzc05hbWUsIHByb3BOYW1lLCB0eXBlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICh0eXBlb2YgdHlwZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKEZpcmUuT2JqZWN0VHlwZSh0eXBlKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChGSVJFX0VESVRPUikge1xuICAgICAgICAgICAgICAgIEZpcmUuZXJyb3IoJ1Vua25vd24gXCJ0eXBlXCIgcGFyYW1ldGVyIG9mICVzLiVz77yaJXMnLCBjbGFzc05hbWUsIHByb3BOYW1lLCB0eXBlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHBhcnNlU2ltcGxlQXR0ciAoYXR0ck5hbWUsIGV4cGVjdFR5cGUsIGF0dHJDcmVhdGVyKSB7XG4gICAgICAgIHZhciB2YWwgPSBhdHRyc1thdHRyTmFtZV07XG4gICAgICAgIGlmICh2YWwpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdmFsID09PSBleHBlY3RUeXBlKSB7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBhdHRyQ3JlYXRlciA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGF0dHIgPSB7fTtcbiAgICAgICAgICAgICAgICAgICAgYXR0clthdHRyTmFtZV0gPSB2YWw7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKGF0dHIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnB1c2godHlwZW9mIGF0dHJDcmVhdGVyID09PSAnZnVuY3Rpb24nID8gYXR0ckNyZWF0ZXIodmFsKSA6IGF0dHJDcmVhdGVyKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChGSVJFX0VESVRPUikge1xuICAgICAgICAgICAgICAgIEZpcmUuZXJyb3IoJ1RoZSAlcyBvZiAlcy4lcyBtdXN0IGJlIHR5cGUgJXMnLCBhdHRyTmFtZSwgY2xhc3NOYW1lLCBwcm9wTmFtZSwgZXhwZWN0VHlwZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwYXJzZVNpbXBsZUF0dHIoJ3Jhd1R5cGUnLCAnc3RyaW5nJywgRmlyZS5SYXdUeXBlKTtcbiAgICBwYXJzZVNpbXBsZUF0dHIoJ2VkaXRvck9ubHknLCAnYm9vbGVhbicsIEZpcmUuRWRpdG9yT25seSk7XG4gICAgaWYgKEZJUkVfRURJVE9SKSB7XG4gICAgICAgIHBhcnNlU2ltcGxlQXR0cignZGlzcGxheU5hbWUnLCAnc3RyaW5nJyk7XG4gICAgICAgIHBhcnNlU2ltcGxlQXR0cignbXVsdGlsaW5lJywgJ2Jvb2xlYW4nLCB7bXVsdGlsaW5lOiB0cnVlfSk7XG4gICAgICAgIHBhcnNlU2ltcGxlQXR0cigncmVhZG9ubHknLCAnYm9vbGVhbicsIHtyZWFkT25seTogdHJ1ZX0pO1xuICAgICAgICBwYXJzZVNpbXBsZUF0dHIoJ3Rvb2x0aXAnLCAnc3RyaW5nJyk7XG4gICAgfVxuXG4gICAgaWYgKGF0dHJzLnVybCkge1xuICAgICAgICByZXN1bHQucHVzaCh7IHNhdmVVcmxBc0Fzc2V0OiB0cnVlIH0pO1xuICAgIH1cbiAgICBlbHNlIGlmIChhdHRycy5zZXJpYWxpemFibGUgPT09IGZhbHNlKSB7XG4gICAgICAgIHJlc3VsdC5wdXNoKEZpcmUuTm9uU2VyaWFsaXplZCk7XG4gICAgfVxuXG4gICAgaWYgKEZJUkVfRURJVE9SKSB7XG4gICAgICAgIHZhciB2aXNpYmxlID0gYXR0cnMudmlzaWJsZTtcbiAgICAgICAgaWYgKHR5cGVvZiB2aXNpYmxlICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgaWYgKCFhdHRycy52aXNpYmxlKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0LnB1c2goe3Zpc2libGU6IGZhbHNlfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB2YXIgc3RhcnRzV2l0aFVTID0gKHByb3BOYW1lLmNoYXJDb2RlQXQoMCkgPT09IDk1KTtcbiAgICAgICAgICAgIGlmIChzdGFydHNXaXRoVVMpIHtcbiAgICAgICAgICAgICAgICByZXN1bHQucHVzaCh7dmlzaWJsZTogZmFsc2V9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vaWYgKGF0dHJzLmN1c3RvbSkge1xuICAgIC8vICAgIHJlc3VsdC5wdXNoKCB7IGN1c3RvbTogYXR0cnMuY3VzdG9tIH0pO1xuICAgIC8vfVxuXG4gICAgdmFyIHJhbmdlID0gYXR0cnMucmFuZ2U7XG4gICAgaWYgKHJhbmdlKSB7XG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KHJhbmdlKSkge1xuICAgICAgICAgICAgaWYgKHJhbmdlLmxlbmd0aCA+PSAyKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0LnB1c2goRmlyZS5SYW5nZShyYW5nZVswXSwgcmFuZ2VbMV0pKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKEZJUkVfRURJVE9SKSB7XG4gICAgICAgICAgICAgICAgRmlyZS5lcnJvcignVGhlIGxlbmd0aCBvZiByYW5nZSBhcnJheSBtdXN0IGJlIDInKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChGSVJFX0VESVRPUikge1xuICAgICAgICAgICAgRmlyZS5lcnJvcihFUlJfVHlwZSwgJ1wicmFuZ2VcIicsIGNsYXNzTmFtZSArICcuJyArIHByb3BOYW1lLCAnYXJyYXknKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHZhciBudWxsYWJsZSA9IGF0dHJzLm51bGxhYmxlO1xuICAgIGlmIChudWxsYWJsZSkge1xuICAgICAgICBpZiAodHlwZW9mIG51bGxhYmxlID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgdmFyIGJvb2xQcm9wTmFtZSA9IG51bGxhYmxlLnByb3BOYW1lO1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBib29sUHJvcE5hbWUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgdmFyIGRlZiA9IG51bGxhYmxlLmRlZmF1bHQ7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBkZWYgPT09ICdib29sZWFuJykge1xuICAgICAgICAgICAgICAgICAgICByZXN1bHQucHVzaChGaXJlLk51bGxhYmxlKGJvb2xQcm9wTmFtZSwgZGVmKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKEZJUkVfRURJVE9SKSB7XG4gICAgICAgICAgICAgICAgICAgIEZpcmUuZXJyb3IoRVJSX1R5cGUsICdcImRlZmF1bHRcIicsICdudWxsYWJsZSBvYmplY3QnLCAnYm9vbGVhbicpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKEZJUkVfRURJVE9SKSB7XG4gICAgICAgICAgICAgICAgRmlyZS5lcnJvcihFUlJfVHlwZSwgJ1wicHJvcE5hbWVcIicsICdudWxsYWJsZSBvYmplY3QnLCAnc3RyaW5nJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoRklSRV9FRElUT1IpIHtcbiAgICAgICAgICAgIEZpcmUuZXJyb3IoRVJSX1R5cGUsICdcIm51bGxhYmxlXCInLCBjbGFzc05hbWUgKyAnLicgKyBwcm9wTmFtZSwgJ29iamVjdCcpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaWYgKEZJUkVfRURJVE9SKSB7XG4gICAgICAgIHZhciB3YXRjaCA9IGF0dHJzLndhdGNoO1xuICAgICAgICBpZiAod2F0Y2gpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2Ygd2F0Y2ggPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgd2F0Y2hLZXkgaW4gd2F0Y2gpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHdhdGNoQ2FsbGJhY2sgPSB3YXRjaFt3YXRjaEtleV07XG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2Ygd2F0Y2hDYWxsYmFjayA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnB1c2goRmlyZS5XYXRjaCh3YXRjaEtleS5zcGxpdCgnICcpLCB3YXRjaENhbGxiYWNrKSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoRklSRV9FRElUT1IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIEZpcmUuZXJyb3IoRVJSX1R5cGUsICd2YWx1ZScsICd3YXRjaCBvYmplY3QnLCAnZnVuY3Rpb24nKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIEZpcmUuZXJyb3IoRVJSX1R5cGUsICd3YXRjaCcsIGNsYXNzTmFtZSArICcuJyArIHByb3BOYW1lLCAnb2JqZWN0Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gcmVzdWx0O1xufVxuIiwidmFyIEpTID0gcmVxdWlyZSgnLi9qcycpO1xudmFyIFV0aWxzID0gcmVxdWlyZSgnLi91dGlscycpO1xudmFyIF9pc1BsYWluRW1wdHlPYmpfREVWID0gVXRpbHMuaXNQbGFpbkVtcHR5T2JqX0RFVjtcbnZhciBfY2xvbmVhYmxlX0RFViA9IFV0aWxzLmNsb25lYWJsZV9ERVY7XG5cbnJlcXVpcmUoJy4vYXR0cmlidXRlJyk7XG5cbi8vLyoqXG4vLyAqIGJvdGggZ2V0dGVyIGFuZCBwcm9wIG11c3QgcmVnaXN0ZXIgdGhlIG5hbWUgaW50byBfX3Byb3BzX18gYXJyYXlcbi8vICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgLSBwcm9wIG5hbWVcbi8vICovXG52YXIgX2FwcGVuZFByb3AgPSBmdW5jdGlvbiAobmFtZS8qLCBpc0dldHRlciovKSB7XG4gICAgaWYgKEZJUkVfREVWKSB7XG4gICAgICAgIC8vdmFyIEpzVmFyUmVnID0gL15bYS16QS1aXyRdW2EtekEtWjAtOV8kXSokLztcbiAgICAgICAgLy9pZiAoIUpzVmFyUmVnLnRlc3QobmFtZSkpIHtcbiAgICAgICAgLy8gICAgRmlyZS5lcnJvcignVGhlIHByb3BlcnR5IG5hbWUgXCInICsgbmFtZSArICdcIiBpcyBub3QgY29tcGxpYW50IHdpdGggSmF2YVNjcmlwdCBuYW1pbmcgc3RhbmRhcmRzJyk7XG4gICAgICAgIC8vICAgIHJldHVybjtcbiAgICAgICAgLy99XG4gICAgICAgIGlmIChuYW1lLmluZGV4T2YoJy4nKSAhPT0gLTEpIHtcbiAgICAgICAgICAgIEZpcmUuZXJyb3IoJ0Rpc2FsbG93IHRvIHVzZSBcIi5cIiBpbiBwcm9wZXJ0eSBuYW1lJyk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoIXRoaXMuX19wcm9wc19fKSB7XG4gICAgICAgIHRoaXMuX19wcm9wc19fID0gW25hbWVdO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgdmFyIGluZGV4ID0gdGhpcy5fX3Byb3BzX18uaW5kZXhPZihuYW1lKTtcbiAgICAgICAgaWYgKGluZGV4IDwgMCkge1xuICAgICAgICAgICAgdGhpcy5fX3Byb3BzX18ucHVzaChuYW1lKTtcbiAgICAgICAgfVxuICAgICAgICAvLyDov5nph4zkuI3ov5vooYzmiqXplJnvvIzlm6DkuLrph43lhpkgcHJvcCDlj6/ku6XmmK/kuIDkuKrlkIjms5XnmoTooYzkuLrvvIzlj6/ku6XnlKjkuo7orr7nva7mlrDnmoTpu5jorqTlgLzjgIJcbiAgICAgICAgLy9lbHNlIHtcbiAgICAgICAgLy8gICAgRmlyZS5lcnJvcihGaXJlLmdldENsYXNzTmFtZSh0aGlzKSArICcuJyArIG5hbWUgKyAnIGlzIGFscmVhZHkgZGVmaW5lZCEnKTtcbiAgICAgICAgLy99XG4gICAgfVxufTtcblxuLy8vKipcbi8vICogdGhlIG1ldGFjbGFzcyBvZiB0aGUgXCJmaXJlIGNsYXNzXCIgY3JlYXRlZCBieSBGaXJlLmRlZmluZSwgYWxsIGl0cyBzdGF0aWMgbWVtYmVyc1xuLy8gKiB3aWxsIGluaGVyaXRlZCBieSBmaXJlIGNsYXNzLlxuLy8gKi9cbnZhciBfbWV0YUNsYXNzID0ge1xuXG4gICAgLy8gc3RyaW5nW11cbiAgICBfX3Byb3BzX186IG51bGwsXG5cbiAgICAvKipcbiAgICAgKiBBZGQgbmV3IGluc3RhbmNlIGZpZWxkLCBwcm9wZXJ0aWUsIG9yIG1ldGhvZCBtYWRlIGF2YWlsYWJsZSBvbiB0aGUgY2xhc3MuXG4gICAgICog6K+l5pa55rOV5a6a5LmJ55qE5Y+Y6YeP6buY6K6k5oOF5Ya15LiL6YO95Lya6KKr5bqP5YiX5YyW77yM5Lmf5Lya5ZyoaW5zcGVjdG9y5Lit5pi+56S644CCXG4gICAgICog5aaC5p6c5Lyg5YWl5bGe5oCn5YyF5ZCrRmlyZS5IaWRlSW5JbnNwZWN0b3LliJnku43kvJrluo/liJfljJbkvYbkuI3lnKhpbnNwZWN0b3LkuK3mmL7npLrjgIJcbiAgICAgKiDlpoLmnpzkvKDlhaXlsZ7mgKfljIXlkKtGaXJlLk5vblNlcmlhbGl6ZWTliJnkuI3kvJrluo/liJfljJblubbkuJTkuI3kvJrlnKhpbnNwZWN0b3LkuK3mmL7npLrjgIJcbiAgICAgKiDlpoLmnpzkvKDlhaXlsZ7mgKfljIXlkKtGaXJlLkVkaXRvck9ubHnliJnlj6rlnKjnvJbovpHlmajkuIvluo/liJfljJbvvIzmiZPljIXml7bkuI3luo/liJfljJbjgIJcbiAgICAgKlxuICAgICAqIEBtZXRob2QgY2xhc3MucHJvcFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIC0gdGhlIHByb3BlcnR5IG5hbWVcbiAgICAgKiBAcGFyYW0geyp9IGRlZmF1bHRWYWx1ZSAtIHRoZSBkZWZhdWx0IHZhbHVlXG4gICAgICogQHBhcmFtIHsuLi5vYmplY3R9IGF0dHJpYnV0ZSAtIGFkZGl0aW9uYWwgcHJvcGVydHkgYXR0cmlidXRlcywgYW55IG51bWJlciBvZiBhdHRyaWJ1dGVzIGNhbiBiZSBhZGRlZFxuICAgICAqIEByZXR1cm4ge2Z1bmN0aW9ufSB0aGUgY2xhc3MgaXRzZWxmXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBwcm9wOiBmdW5jdGlvbiAobmFtZSwgZGVmYXVsdFZhbHVlLCBhdHRyaWJ1dGUpIHtcbiAgICAgICAgJ3VzZSBzdHJpY3QnO1xuICAgICAgICBpZiAoRklSRV9ERVYpIHtcbiAgICAgICAgICAgIC8vIGNoZWNrIGRlZmF1bHQgb2JqZWN0IHZhbHVlXG4gICAgICAgICAgICBpZiAodHlwZW9mIGRlZmF1bHRWYWx1ZSA9PT0gJ29iamVjdCcgJiYgZGVmYXVsdFZhbHVlKSB7XG4gICAgICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoZGVmYXVsdFZhbHVlKSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBjaGVjayBhcnJheSBlbXB0eVxuICAgICAgICAgICAgICAgICAgICBpZiAoZGVmYXVsdFZhbHVlLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIEZpcmUuZXJyb3IoJ0RlZmF1bHQgYXJyYXkgbXVzdCBiZSBlbXB0eSwgc2V0IGRlZmF1bHQgdmFsdWUgb2YgJXMucHJvcChcIiVzXCIsIC4uLikgdG8gbnVsbCBvciBbXSwgJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdhbmQgaW5pdGlhbGl6ZSBpbiBjb25zdHJ1Y3RvciBwbGVhc2UuIChqdXN0IGxpa2UgXCJ0aGlzLiVzID0gWy4uLl07XCIpJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEpTLmdldENsYXNzTmFtZSh0aGlzKSwgbmFtZSwgbmFtZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmICghX2lzUGxhaW5FbXB0eU9ial9ERVYoZGVmYXVsdFZhbHVlKSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBjaGVjayBjbG9uZWFibGVcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFfY2xvbmVhYmxlX0RFVihkZWZhdWx0VmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBGaXJlLmVycm9yKCdEbyBub3Qgc2V0IGRlZmF1bHQgdmFsdWUgdG8gbm9uLWVtcHR5IG9iamVjdCwgJyArXG4gICAgICAgICd1bmxlc3MgdGhlIG9iamVjdCBkZWZpbmVzIGl0cyBvd24gXCJjbG9uZVwiIGZ1bmN0aW9uLiBTZXQgZGVmYXVsdCB2YWx1ZSBvZiAlcy5wcm9wKFwiJXNcIiwgLi4uKSB0byBudWxsIG9yIHt9LCAnICtcbiAgICAgICAgJ2FuZCBpbml0aWFsaXplIGluIGNvbnN0cnVjdG9yIHBsZWFzZS4gKGp1c3QgbGlrZSBcInRoaXMuJXMgPSB7Zm9vOiBiYXJ9O1wiKScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgSlMuZ2V0Q2xhc3NOYW1lKHRoaXMpLCBuYW1lLCBuYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBjaGVjayBiYXNlIHByb3RvdHlwZSB0byBhdm9pZCBuYW1lIGNvbGxpc2lvblxuICAgICAgICAgICAgZm9yICh2YXIgYmFzZSA9IHRoaXMuJHN1cGVyOyBiYXNlOyBiYXNlID0gYmFzZS4kc3VwZXIpIHtcbiAgICAgICAgICAgICAgICAvLyDov5nkuKrlvqrnjq/lj6rog73mo4DmtYvliLDmnIDkuIrpnaLnmoRGaXJlQ2xhc3PnmoTniLbnsbvvvIzlpoLmnpzlho3kuIrov5jmnInniLbnsbvvvIzlsIbkuI3lgZrmo4DmtYvjgILvvIhGaXJlLmV4dGVuZCDlsIYgcHJvdG90eXBlLmNvbnN0cnVjdG9yIOiuvuS4uuWtkOexu++8iVxuICAgICAgICAgICAgICAgIGlmIChiYXNlLnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eShuYW1lKSkge1xuICAgICAgICAgICAgICAgICAgICBGaXJlLmVycm9yKCdDYW4gbm90IGRlY2xhcmUgJXMuJXMsIGl0IGlzIGFscmVhZHkgZGVmaW5lZCBpbiB0aGUgcHJvdG90eXBlIG9mICVzJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIEpTLmdldENsYXNzTmFtZSh0aGlzKSwgbmFtZSwgSlMuZ2V0Q2xhc3NOYW1lKGJhc2UpKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHNldCBkZWZhdWx0IHZhbHVlXG4gICAgICAgIEZpcmUuYXR0cih0aGlzLCBuYW1lLCB7ICdkZWZhdWx0JzogZGVmYXVsdFZhbHVlIH0pO1xuXG4gICAgICAgIC8vIHJlZ2lzdGVyIHByb3BlcnR5XG4gICAgICAgIF9hcHBlbmRQcm9wLmNhbGwodGhpcywgbmFtZSk7XG5cbiAgICAgICAgLy8g56aB55So77yM5Zug5Li6Z2V0dGVyL3NldHRlcumcgOimgeWKqOaAgeiOt+W+l+exu+Wei++8jOaJgOS7peexu+Wei+e7n+S4gOeUseS4iuWxguWkhOeQhlxuICAgICAgICAvLy8vIGFwcGx5IGRlZmF1bHQgdHlwZSAoTk9URTogaWYgdXNlciBwcm92aWRlIHR5cGUgYXR0cmlidXRlLCB0aGlzIG9uZSB3aWxsIGJlIG92ZXJ3cm90ZSlcbiAgICAgICAgLy92YXIgbXl0eXBlID0gdHlwZW9mIGRlZmF1bHRWYWx1ZTtcbiAgICAgICAgLy9pZiAoIG15dHlwZSA9PT0gJ251bWJlcicgKSB7XG4gICAgICAgIC8vICAgIG15dHlwZSA9ICdmbG9hdCc7XG4gICAgICAgIC8vfVxuICAgICAgICAvL0ZpcmUuYXR0ciggdGhpcywgbmFtZSwgeyAndHlwZSc6IG15dHlwZSB9ICk7XG5cbiAgICAgICAgLy8gYXBwbHkgYXR0cmlidXRlc1xuICAgICAgICBpZiAoYXR0cmlidXRlKSB7XG4gICAgICAgICAgICB2YXIgb25BZnRlclByb3AgPSBudWxsO1xuICAgICAgICAgICAgdmFyIEF0dHJBcmdTdGFydCA9IDI7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gQXR0ckFyZ1N0YXJ0OyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgdmFyIGF0dHIgPSBhcmd1bWVudHNbaV07XG4gICAgICAgICAgICAgICAgRmlyZS5hdHRyKHRoaXMsIG5hbWUsIGF0dHIpO1xuICAgICAgICAgICAgICAgIC8vIHJlZ2lzdGVyIGNhbGxiYWNrXG4gICAgICAgICAgICAgICAgaWYgKGF0dHIuX29uQWZ0ZXJQcm9wKSB7XG4gICAgICAgICAgICAgICAgICAgIG9uQWZ0ZXJQcm9wID0gb25BZnRlclByb3AgfHwgW107XG4gICAgICAgICAgICAgICAgICAgIG9uQWZ0ZXJQcm9wLnB1c2goYXR0ci5fb25BZnRlclByb3ApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIGNhbGwgY2FsbGJhY2tcbiAgICAgICAgICAgIGlmIChvbkFmdGVyUHJvcCkge1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGMgPSAwOyBjIDwgb25BZnRlclByb3AubGVuZ3RoOyBjKyspIHtcbiAgICAgICAgICAgICAgICAgICAgb25BZnRlclByb3BbY10odGhpcywgbmFtZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiDor6Xmlrnms5XlrprkuYnnmoTlj5jph48qKuS4jeS8mioq6KKr5bqP5YiX5YyW77yM6buY6K6k5Lya5ZyoaW5zcGVjdG9y5Lit5pi+56S644CCXG4gICAgICog5aaC5p6c5Lyg5YWl5Y+C5pWw5YyF5ZCrRmlyZS5IaWRlSW5JbnNwZWN0b3LliJnkuI3lnKhpbnNwZWN0b3LkuK3mmL7npLrjgIJcbiAgICAgKlxuICAgICAqIEBtZXRob2QgY2xhc3MuZ2V0XG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgLSB0aGUgZ2V0dGVyIHByb3BlcnR5XG4gICAgICogQHBhcmFtIHtmdW5jdGlvbn0gZ2V0dGVyIC0gdGhlIGdldHRlciBmdW5jdGlvbiB3aGljaCByZXR1cm5zIHRoZSByZWFsIHByb3BlcnR5XG4gICAgICogQHBhcmFtIHsuLi5vYmplY3R9IGF0dHJpYnV0ZSAtIGFkZGl0aW9uYWwgcHJvcGVydHkgYXR0cmlidXRlcywgYW55IG51bWJlciBvZiBhdHRyaWJ1dGVzIGNhbiBiZSBhZGRlZFxuICAgICAqIEByZXR1cm4ge2Z1bmN0aW9ufSB0aGUgY2xhc3MgaXRzZWxmXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBnZXQ6IGZ1bmN0aW9uIChuYW1lLCBnZXR0ZXIsIGF0dHJpYnV0ZSkge1xuICAgICAgICAndXNlIHN0cmljdCc7XG5cbiAgICAgICAgaWYgKEZJUkVfREVWKSB7XG4gICAgICAgICAgICB2YXIgZCA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGhpcy5wcm90b3R5cGUsIG5hbWUpO1xuICAgICAgICAgICAgaWYgKGQgJiYgZC5nZXQpIHtcbiAgICAgICAgICAgICAgICBGaXJlLmVycm9yKCclczogdGhlIGdldHRlciBvZiBcIiVzXCIgaXMgYWxyZWFkeSBkZWZpbmVkIScsIEpTLmdldENsYXNzTmFtZSh0aGlzKSwgbmFtZSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoYXR0cmlidXRlKSB7XG4gICAgICAgICAgICB2YXIgQXR0ckFyZ1N0YXJ0ID0gMjtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSBBdHRyQXJnU3RhcnQ7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICB2YXIgYXR0ciA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgICAgICAgICBpZiAoRklSRV9ERVYpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGF0dHIuX2NhblVzZWRJbkdldHRlciA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIEZpcmUuZXJyb3IoJ0NhbiBub3QgYXBwbHkgdGhlIHNwZWNpZmllZCBhdHRyaWJ1dGUgdG8gdGhlIGdldHRlciBvZiBcIiVzLiVzXCIsIGF0dHJpYnV0ZSBpbmRleDogJXMnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEpTLmdldENsYXNzTmFtZSh0aGlzKSwgbmFtZSwgKGkgLSBBdHRyQXJnU3RhcnQpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgRmlyZS5hdHRyKHRoaXMsIG5hbWUsIGF0dHIpO1xuXG4gICAgICAgICAgICAgICAgaWYgKEZJUkVfREVWKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGNoZWNrIGF0dHJpYnV0ZXNcbiAgICAgICAgICAgICAgICAgICAgaWYgKGF0dHIuc2VyaWFsaXphYmxlID09PSBmYWxzZSB8fCBhdHRyLmVkaXRvck9ubHkgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIEZpcmUud2FybignTm8gbmVlZCB0byB1c2UgRmlyZS5Ob25TZXJpYWxpemVkIG9yIEZpcmUuRWRpdG9yT25seSBmb3IgdGhlIGdldHRlciBvZiAlcy4lcywgJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2V2ZXJ5IGdldHRlciBpcyBhY3R1YWxseSBub24tc2VyaWFsaXplZC4nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEpTLmdldENsYXNzTmFtZSh0aGlzKSwgbmFtZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKGF0dHIuaGFzT3duUHJvcGVydHkoJ2RlZmF1bHQnKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgRmlyZS5lcnJvcignJXM6IENhbiBub3Qgc2V0IGRlZmF1bHQgdmFsdWUgb2YgYSBnZXR0ZXIhJywgSlMuZ2V0Q2xhc3NOYW1lKHRoaXMpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIEZpcmUuYXR0cih0aGlzLCBuYW1lLCBGaXJlLk5vblNlcmlhbGl6ZWQpO1xuXG4gICAgICAgIHZhciBzZXJpYWxpemluZ1VybEF0dHIgPSB0cnVlO1xuICAgICAgICBpZiAoc2VyaWFsaXppbmdVcmxBdHRyIHx8IEZJUkVfREVWKSB7XG4gICAgICAgICAgICAvLyDkuI3orrrmmK/lkKYgaGlkZSBpbiBpbnNwZWN0b3Ig6YO96KaB5re75Yqg5YiwIHByb3Bz77yM5ZCm5YiZIGFzc2V0IHdhdGNoZXIg5LiN6IO95q2j5bi45bel5L2cXG4gICAgICAgICAgICBfYXBwZW5kUHJvcC5jYWxsKHRoaXMsIG5hbWUvKiwgdHJ1ZSovKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRoaXMucHJvdG90eXBlLCBuYW1lKSkge1xuICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMucHJvdG90eXBlLCBuYW1lLCB7XG4gICAgICAgICAgICAgICAgZ2V0OiBnZXR0ZXJcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMucHJvdG90eXBlLCBuYW1lLCB7XG4gICAgICAgICAgICAgICAgZ2V0OiBnZXR0ZXIsXG4gICAgICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWVcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKEZJUkVfRURJVE9SKSB7XG4gICAgICAgICAgICBGaXJlLmF0dHIodGhpcywgbmFtZSwge2hhc0dldHRlcjogdHJ1ZX0pOyAvLyDmlrnkvr8gZWRpdG9yIOWBmuWIpOaWrVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiDor6Xmlrnms5XlrprkuYnnmoTlj5jph48qKuS4jeS8mioq6KKr5bqP5YiX5YyW77yM6Zmk6Z2e5pyJ5a+55bqU55qEZ2V0dGVy5ZCm5YiZ5LiN5ZyoaW5zcGVjdG9y5Lit5pi+56S644CCXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIGNsYXNzLnNldFxuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZSAtIHRoZSBzZXR0ZXIgcHJvcGVydHlcbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBzZXR0ZXIgLSB0aGUgc2V0dGVyIGZ1bmN0aW9uXG4gICAgICogQHJldHVybiB7ZnVuY3Rpb259IHRoZSBjbGFzcyBpdHNlbGZcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIHNldDogZnVuY3Rpb24gKG5hbWUsIHNldHRlcikge1xuICAgICAgICBpZiAoRklSRV9ERVYpIHtcbiAgICAgICAgICAgIHZhciBkID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0aGlzLnByb3RvdHlwZSwgbmFtZSk7XG4gICAgICAgICAgICBpZiAoZCAmJiBkLnNldCkge1xuICAgICAgICAgICAgICAgIEZpcmUuZXJyb3IoJyVzOiB0aGUgc2V0dGVyIG9mIFwiJXNcIiBpcyBhbHJlYWR5IGRlZmluZWQhJywgSlMuZ2V0Q2xhc3NOYW1lKHRoaXMpLCBuYW1lKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChGSVJFX0VESVRPUikge1xuICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMucHJvdG90eXBlLCBuYW1lLCB7XG4gICAgICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiBzZXR0ZXJfZWRpdG9yV3JhcHBlciAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX29ic2VydmluZykge1xuICAgICAgICAgICAgICAgICAgICAgICAgT2JqZWN0LmdldE5vdGlmaWVyKHRoaXMpLm5vdGlmeSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogJ3VwZGF0ZScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogbmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbGRWYWx1ZTogdGhpc1tuYW1lXVxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgc2V0dGVyLmNhbGwodGhpcywgdmFsdWUpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWVcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgRmlyZS5hdHRyKHRoaXMsIG5hbWUsIHsgaGFzU2V0dGVyOiB0cnVlIH0pOyAvLyDmlrnkvr8gZWRpdG9yIOWBmuWIpOaWrVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgaWYgKE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGhpcy5wcm90b3R5cGUsIG5hbWUpKSB7XG4gICAgICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMucHJvdG90eXBlLCBuYW1lLCB7XG4gICAgICAgICAgICAgICAgICAgIHNldDogc2V0dGVyXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcy5wcm90b3R5cGUsIG5hbWUsIHtcbiAgICAgICAgICAgICAgICAgICAgc2V0OiBzZXR0ZXIsXG4gICAgICAgICAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIOivpeaWueazleWumuS5ieeahOWPmOmHjyoq5LiN5LyaKirooqvluo/liJfljJbvvIzpu5jorqTkvJrlnKhpbnNwZWN0b3LkuK3mmL7npLrjgIJcbiAgICAgKiDlpoLmnpzkvKDlhaXlj4LmlbDljIXlkKtGaXJlLkhpZGVJbkluc3BlY3RvcuWImeS4jeWcqGluc3BlY3RvcuS4reaYvuekuuOAglxuICAgICAqXG4gICAgICogQG1ldGhvZCBjbGFzcy5nZXRzZXRcbiAgICAgKiBAc3RhdGljXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgLSB0aGUgZ2V0dGVyIHByb3BlcnR5XG4gICAgICogQHBhcmFtIHtmdW5jdGlvbn0gZ2V0dGVyIC0gdGhlIGdldHRlciBmdW5jdGlvbiB3aGljaCByZXR1cm5zIHRoZSByZWFsIHByb3BlcnR5XG4gICAgICogQHBhcmFtIHtmdW5jdGlvbn0gc2V0dGVyIC0gdGhlIHNldHRlciBmdW5jdGlvblxuICAgICAqIEBwYXJhbSB7Li4ub2JqZWN0fSBhdHRyaWJ1dGUgLSBhZGRpdGlvbmFsIHByb3BlcnR5IGF0dHJpYnV0ZXMsIGFueSBudW1iZXIgb2YgYXR0cmlidXRlcyBjYW4gYmUgYWRkZWRcbiAgICAgKiBAcmV0dXJuIHtmdW5jdGlvbn0gdGhlIGNsYXNzIGl0c2VsZlxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgZ2V0c2V0OiBmdW5jdGlvbiAobmFtZSwgZ2V0dGVyLCBzZXR0ZXIsIGF0dHJpYnV0ZSkge1xuICAgICAgICAndXNlIHN0cmljdCc7XG4gICAgICAgIGlmIChhdHRyaWJ1dGUpIHtcbiAgICAgICAgICAgIHZhciBnZXR0ZXJBcmdzID0gW10uc2xpY2UuY2FsbChhcmd1bWVudHMpO1xuICAgICAgICAgICAgZ2V0dGVyQXJncy5zcGxpY2UoMiwgMSk7ICAgIC8vIHJlbW92ZSBzZXR0ZXJcbiAgICAgICAgICAgIHRoaXMuZ2V0LmFwcGx5KHRoaXMsIGdldHRlckFyZ3MpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5nZXQobmFtZSwgZ2V0dGVyKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNldChuYW1lLCBzZXR0ZXIpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG59O1xuXG5mdW5jdGlvbiBpbnN0YW50aWF0ZVByb3BzIChpbnN0YW5jZSwgaXRzQ2xhc3MpIHtcbiAgICB2YXIgcHJvcExpc3QgPSBpdHNDbGFzcy5fX3Byb3BzX187XG4gICAgaWYgKHByb3BMaXN0KSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcExpc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHZhciBwcm9wID0gcHJvcExpc3RbaV07XG4gICAgICAgICAgICB2YXIgYXR0cnMgPSBGaXJlLmF0dHIoaXRzQ2xhc3MsIHByb3ApO1xuICAgICAgICAgICAgaWYgKGF0dHJzICYmIGF0dHJzLmhhc093blByb3BlcnR5KCdkZWZhdWx0JykpIHsgIC8vIGdldHRlciBkb2VzIG5vdCBoYXZlIGRlZmF1bHQsIGRlZmF1bHQgbWF5YmUgMFxuICAgICAgICAgICAgICAgIHZhciBkZWYgPSBhdHRycy5kZWZhdWx0O1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgZGVmID09PSAnb2JqZWN0JyAmJiBkZWYpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8g6Ziy5q2i5aSa5Liq5a6e5L6L5byV55So55u45ZCM5a+56LGhXG4gICAgICAgICAgICAgICAgICAgIGlmIChkZWYuY2xvbmUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZiA9IGRlZi5jbG9uZSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKEFycmF5LmlzQXJyYXkoZGVmKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGVmID0gW107XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkZWYgPSB7fTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpbnN0YW5jZVtwcm9wXSA9IGRlZjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cblxuLyoqXG4gKiBDaGVja3Mgd2hldGhlciB0aGUgY29uc3RydWN0b3IgaXMgY3JlYXRlZCBieSBGaXJlLmRlZmluZSBvciBGaXJlLkNsYXNzXG4gKlxuICogQG1ldGhvZCBfaXNGaXJlQ2xhc3NcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IGNvbnN0cnVjdG9yXG4gKiBAcmV0dXJuIHtCb29sZWFufVxuICogQHByaXZhdGVcbiAqL1xuRmlyZS5faXNGaXJlQ2xhc3MgPSBmdW5jdGlvbiAoY29uc3RydWN0b3IpIHtcbiAgICByZXR1cm4gISFjb25zdHJ1Y3RvciAmJiAoY29uc3RydWN0b3IucHJvcCA9PT0gX21ldGFDbGFzcy5wcm9wKTtcbn07XG5cbi8qKlxuICogQG1ldGhvZCBfY29udmVydFRvRmlyZUNsYXNzXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBjb25zdHJ1Y3RvclxuICogQHByaXZhdGVcbiAqL1xuRmlyZS5fY29udmVydFRvRmlyZUNsYXNzID0gZnVuY3Rpb24gKGNvbnN0cnVjdG9yKSB7XG4gICAgY29uc3RydWN0b3IucHJvcCA9IF9tZXRhQ2xhc3MucHJvcDtcbn07XG5cbi8qKlxuICogQ2hlY2tzIHdoZXRoZXIgc3ViY2xhc3MgaXMgY2hpbGQgb2Ygc3VwZXJjbGFzcyBvciBlcXVhbHMgdG8gc3VwZXJjbGFzc1xuICpcbiAqIEBtZXRob2QgaXNDaGlsZENsYXNzT2ZcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IHN1YmNsYXNzXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBzdXBlcmNsYXNzXG4gKiBAcmV0dXJuIHtCb29sZWFufVxuICovXG5GaXJlLmlzQ2hpbGRDbGFzc09mID0gZnVuY3Rpb24gKHN1YmNsYXNzLCBzdXBlcmNsYXNzKSB7XG4gICAgaWYgKHN1YmNsYXNzICYmIHN1cGVyY2xhc3MpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBzdWJjbGFzcyAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgaWYgKEZJUkVfREVWKSB7XG4gICAgICAgICAgICAgICAgRmlyZS53YXJuKCdbaXNDaGlsZENsYXNzT2ZdIHN1YmNsYXNzIHNob3VsZCBiZSBmdW5jdGlvbiB0eXBlLCBub3QnLCBzdWJjbGFzcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHR5cGVvZiBzdXBlcmNsYXNzICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBpZiAoRklSRV9ERVYpIHtcbiAgICAgICAgICAgICAgICBGaXJlLndhcm4oJ1tpc0NoaWxkQ2xhc3NPZl0gc3VwZXJjbGFzcyBzaG91bGQgYmUgZnVuY3Rpb24gdHlwZSwgbm90Jywgc3VwZXJjbGFzcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgLy8gZmlyZWNsYXNzXG4gICAgICAgIGZvciAoOyBzdWJjbGFzcyAmJiBzdWJjbGFzcy4kc3VwZXI7IHN1YmNsYXNzID0gc3ViY2xhc3MuJHN1cGVyKSB7XG4gICAgICAgICAgICBpZiAoc3ViY2xhc3MgPT09IHN1cGVyY2xhc3MpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoc3ViY2xhc3MgPT09IHN1cGVyY2xhc3MpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIC8vIGpzIGNsYXNzXG4gICAgICAgIHZhciBkdW5kZXJQcm90byA9IE9iamVjdC5nZXRQcm90b3R5cGVPZihzdWJjbGFzcy5wcm90b3R5cGUpO1xuICAgICAgICB3aGlsZSAoZHVuZGVyUHJvdG8pIHtcbiAgICAgICAgICAgIHN1YmNsYXNzID0gZHVuZGVyUHJvdG8uY29uc3RydWN0b3I7XG4gICAgICAgICAgICBpZiAoc3ViY2xhc3MgPT09IHN1cGVyY2xhc3MpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGR1bmRlclByb3RvID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKHN1YmNsYXNzLnByb3RvdHlwZSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xufTtcblxuZnVuY3Rpb24gX2luaXRDbGFzcyhjbGFzc05hbWUsIGZpcmVDbGFzcykge1xuICAgIC8vIG9jY3VweSBzb21lIG5vbi1pbmhlcml0ZWQgc3RhdGljIG1lbWJlcnNcbiAgICBmb3IgKHZhciBzdGF0aWNNZW1iZXIgaW4gX21ldGFDbGFzcykge1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZmlyZUNsYXNzLCBzdGF0aWNNZW1iZXIsIHtcbiAgICAgICAgICAgIHZhbHVlOiBfbWV0YUNsYXNzW3N0YXRpY01lbWJlcl0sXG4gICAgICAgICAgICAvLyBfX3Byb3BzX18gaXMgd3JpdGFibGVcbiAgICAgICAgICAgIHdyaXRhYmxlOiBzdGF0aWNNZW1iZXIgPT09ICdfX3Byb3BzX18nLFxuICAgICAgICAgICAgLy8gX19wcm9wc19fIGlzIGVudW1lcmFibGUgc28gaXQgY2FuIGJlIGluaGVyaXRlZCBieSBGaXJlLmV4dGVuZFxuICAgICAgICAgICAgZW51bWVyYWJsZTogc3RhdGljTWVtYmVyID09PSAnX19wcm9wc19fJ1xuICAgICAgICB9KTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIF9uaWNpZnlGaXJlQ2xhc3MgKGZpcmVDbGFzcywgY2xhc3NOYW1lKSB7XG4gICAgaWYgKEZJUkVfRURJVE9SKSB7XG4gICAgICAgIGlmIChjbGFzc05hbWUpIHtcbiAgICAgICAgICAgIGZpcmVDbGFzcy50b1N0cmluZyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB2YXIgcGxhaW4gPSBGdW5jdGlvbi50b1N0cmluZy5jYWxsKHRoaXMpO1xuICAgICAgICAgICAgICAgIHJldHVybiBwbGFpbi5yZXBsYWNlKCdmdW5jdGlvbiAnLCAnZnVuY3Rpb24gJyArIEpTLmdldENsYXNzTmFtZSh0aGlzKSk7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgfVxufVxuXG5mdW5jdGlvbiBkb0RlZmluZSAoY2xhc3NOYW1lLCBiYXNlQ2xhc3MsIGNvbnN0cnVjdG9yKSB7XG4gICAgdmFyIHVzZVRyeUNhdGNoID0gISBKUy5TdHJpbmcuc3RhcnRzV2l0aChjbGFzc05hbWUsICdGaXJlLicpO1xuICAgIHZhciBmaXJlQ2xhc3MgPSBfY3JlYXRlQ3Rvcihjb25zdHJ1Y3RvciwgYmFzZUNsYXNzLCB1c2VUcnlDYXRjaCk7XG4gICAgX2luaXRDbGFzcyhjbGFzc05hbWUsIGZpcmVDbGFzcyk7XG5cbiAgICBpZiAoYmFzZUNsYXNzKSB7XG4gICAgICAgIC8vIGluaGVyaXRcbiAgICAgICAgSlMuZXh0ZW5kKGZpcmVDbGFzcywgYmFzZUNsYXNzKTtcbiAgICAgICAgZmlyZUNsYXNzLiRzdXBlciA9IGJhc2VDbGFzcztcbiAgICAgICAgaWYgKGJhc2VDbGFzcy5fX3Byb3BzX18pIHtcbiAgICAgICAgICAgIC8vIGNvcHkgX19wcm9wc19fXG4gICAgICAgICAgICBmaXJlQ2xhc3MuX19wcm9wc19fID0gYmFzZUNsYXNzLl9fcHJvcHNfXy5zbGljZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgSlMuc2V0Q2xhc3NOYW1lKGNsYXNzTmFtZSwgZmlyZUNsYXNzKTtcblxuICAgIGlmIChGSVJFX0VESVRPUikge1xuICAgICAgICBfbmljaWZ5RmlyZUNsYXNzKGZpcmVDbGFzcywgY2xhc3NOYW1lKTtcbiAgICB9XG5cbiAgICByZXR1cm4gZmlyZUNsYXNzO1xufVxuXG5mdW5jdGlvbiBkZWZpbmUgKGNsYXNzTmFtZSwgYmFzZUNsYXNzLCBjb25zdHJ1Y3Rvcikge1xuICAgIGlmIChGaXJlLmlzQ2hpbGRDbGFzc09mKGJhc2VDbGFzcywgRmlyZS5CZWhhdmlvcikpIHtcbiAgICAgICAgdmFyIGZyYW1lID0gRmlyZS5fUkZwZWVrKCk7XG4gICAgICAgIGlmIChmcmFtZSkge1xuICAgICAgICAgICAgaWYgKEZJUkVfREVWICYmIGNvbnN0cnVjdG9yKSB7XG4gICAgICAgICAgICAgICAgRmlyZS53YXJuKCdGaXJlLkNsYXNzOiBTaG91bGQgbm90IGRlZmluZSBjb25zdHJ1Y3RvciBmb3IgRmlyZS5CZWhhdmlvci4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChmcmFtZS5iZWgpIHtcbiAgICAgICAgICAgICAgICBGaXJlLmVycm9yKCdFYWNoIHNjcmlwdCBjYW4gaGF2ZSBhdCBtb3N0IG9uZSBCZWhhdmlvci4nKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgaXNJblByb2plY3QgPSBmcmFtZS51dWlkO1xuICAgICAgICAgICAgaWYgKGlzSW5Qcm9qZWN0KSB7XG4gICAgICAgICAgICAgICAgaWYgKGNsYXNzTmFtZSkge1xuICAgICAgICAgICAgICAgICAgICBGaXJlLndhcm4oJ1Nob3VsZCBub3Qgc3BlY2lmeSBjbGFzcyBuYW1lIGZvciBCZWhhdmlvciB3aGljaCBkZWZpbmVzIGluIHByb2plY3QuJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy9lbHNlIHtcbiAgICAgICAgICAgIC8vICAgIGJ1aWx0aW4gcGx1Z2luIGJlaGF2aW9yXG4gICAgICAgICAgICAvL31cbiAgICAgICAgICAgIGNsYXNzTmFtZSA9IGNsYXNzTmFtZSB8fCBmcmFtZS5zY3JpcHQ7XG4gICAgICAgICAgICB2YXIgY2xzID0gZG9EZWZpbmUoY2xhc3NOYW1lLCBiYXNlQ2xhc3MsIGNvbnN0cnVjdG9yKTtcbiAgICAgICAgICAgIGlmIChmcmFtZS51dWlkKSB7XG4gICAgICAgICAgICAgICAgSlMuX3NldENsYXNzSWQoZnJhbWUudXVpZCwgY2xzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZyYW1lLmJlaCA9IGNscztcbiAgICAgICAgICAgIHJldHVybiBjbHM7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLy8gbm90IHByb2plY3QgYmVoYXZpb3JcbiAgICByZXR1cm4gZG9EZWZpbmUoY2xhc3NOYW1lLCBiYXNlQ2xhc3MsIGNvbnN0cnVjdG9yKTtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgc3ViIEZpcmVDbGFzcyBiYXNlZCBvbiB0aGUgc3BlY2lmaWVkIGJhc2VDbGFzcyBwYXJhbWV0ZXIuXG4gKlxuICogQG1ldGhvZCBleHRlbmRcbiAqIEBwYXJhbSB7c3RyaW5nfSBbY2xhc3NOYW1lXSAtIHRoZSBuYW1lIG9mIGNsYXNzIHRoYXQgaXMgdXNlZCB0byBkZXNlcmlhbGl6ZSB0aGlzIGNsYXNzXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBiYXNlQ2xhc3MgLSAhI2VuIFRoZSBiYXNlIGNsYXNzIHRvIGluaGVyaXQgZnJvbVxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgISN6aCDnu6fmib/nmoTln7rnsbtcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IFtjb25zdHJ1Y3Rvcl0gLSBhIGNvbnN0cnVjdG9yIGZ1bmN0aW9uIHRoYXQgaXMgdXNlZCB0byBpbnN0YW50aWF0ZSB0aGlzIGNsYXNzLFxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIG5vdCBzdXBwbGllZCwgdGhlIGNvbnN0cnVjdG9yIG9mIGJhc2VDbGFzcyB3aWxsIGJlIGNhbGxlZCBhdXRvbWF0aWNhbGx5LlxuICogQHJldHVybiB7ZnVuY3Rpb259IHRoZSBjb25zdHJ1Y3RvciBvZiBuZXdseSBkZWZpbmVkIGNsYXNzXG4gKiBAcHJpdmF0ZVxuICovXG5GaXJlLmV4dGVuZCA9IGZ1bmN0aW9uIChjbGFzc05hbWUsIGJhc2VDbGFzcywgY29uc3RydWN0b3IpIHtcbiAgICBpZiAodHlwZW9mIGNsYXNzTmFtZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBpZiAoRklSRV9ERVYpIHtcbiAgICAgICAgICAgIGlmIChjb25zdHJ1Y3Rvcikge1xuICAgICAgICAgICAgICAgIEZpcmUuZXJyb3IoJ1tGaXJlLmV4dGVuZF0gaW52YWxpZCB0eXBlIG9mIGFyZ3VtZW50cycpO1xuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNvbnN0cnVjdG9yID0gYmFzZUNsYXNzO1xuICAgICAgICBiYXNlQ2xhc3MgPSBjbGFzc05hbWU7XG4gICAgICAgIGNsYXNzTmFtZSA9ICcnO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIGNsYXNzTmFtZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgcmV0dXJuIGRlZmluZShjbGFzc05hbWUsIGJhc2VDbGFzcywgY29uc3RydWN0b3IpO1xuICAgIH1cbiAgICBlbHNlIGlmICh0eXBlb2YgY2xhc3NOYW1lID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAvLyDmnKrkvKDlhaXku7vkvZXlj4LmlbBcbiAgICAgICAgcmV0dXJuIGRlZmluZSgnJywgYmFzZUNsYXNzLCBjb25zdHJ1Y3Rvcik7XG4gICAgfVxuICAgIGVsc2UgaWYgKEZJUkVfREVWICYmIGNsYXNzTmFtZSkge1xuICAgICAgICBGaXJlLmVycm9yKCdbRmlyZS5leHRlbmRdIHVua25vd24gdHlwZW9mIGZpcnN0IGFyZ3VtZW50OicgKyBjbGFzc05hbWUpO1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbn07XG5cbmZ1bmN0aW9uIF9jaGVja0N0b3IgKGN0b3IpIHtcbiAgICBpZiAoRklSRV9ERVYpIHtcbiAgICAgICAgaWYgKEZpcmUuX2lzRmlyZUNsYXNzKGN0b3IpKSB7XG4gICAgICAgICAgICBGaXJlLmVycm9yKFwiQ29uc3RydWN0b3IgY2FuIG5vdCBiZSBhbm90aGVyIEZpcmVDbGFzc1wiKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAodHlwZW9mIGN0b3IgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIEZpcmUuZXJyb3IoXCJDb25zdHJ1Y3RvciBvZiBGaXJlQ2xhc3MgbXVzdCBiZSBmdW5jdGlvbiB0eXBlXCIpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjdG9yLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIC8vIGZpcmViYWxsLXgvZGV2IzEzODogVG8gbWFrZSBhIHVuaWZpZWQgRmlyZUNsYXNzIHNlcmlhbGl6YXRpb24gcHJvY2VzcyxcbiAgICAgICAgICAgIC8vIHdlIGRvbid0IGFsbG93IHBhcmFtZXRlcnMgZm9yIGNvbnN0cnVjdG9yIHdoZW4gY3JlYXRpbmcgaW5zdGFuY2VzIG9mIEZpcmVDbGFzcy5cbiAgICAgICAgICAgIC8vIEZvciBhZHZhbmNlIHVzZXIsIGNvbnN0cnVjdCBhcmd1bWVudHMgY2FuIHN0aWxsIGdldCBmcm9tICdhcmd1bWVudHMnLlxuICAgICAgICAgICAgRmlyZS53YXJuKFwiQ2FuIG5vdCBpbnN0YW50aWF0ZSBGaXJlQ2xhc3Mgd2l0aCBhcmd1bWVudHMuXCIpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5mdW5jdGlvbiBfY3JlYXRlQ3RvciAoY29uc3RydWN0b3IsIGJhc2VDbGFzcywgdXNlVHJ5Q2F0Y2gpIHtcbiAgICBpZiAoY29uc3RydWN0b3IgJiYgRklSRV9ERVYpIHtcbiAgICAgICAgX2NoZWNrQ3Rvcihjb25zdHJ1Y3Rvcik7XG4gICAgfVxuICAgIC8vIGdldCBiYXNlIHVzZXIgY29uc3RydWN0b3JzXG4gICAgdmFyIGN0b3JzO1xuICAgIGlmIChGaXJlLl9pc0ZpcmVDbGFzcyhiYXNlQ2xhc3MpKSB7XG4gICAgICAgIGN0b3JzID0gYmFzZUNsYXNzLl9fY3RvcnNfXztcbiAgICAgICAgaWYgKGN0b3JzKSB7XG4gICAgICAgICAgICBjdG9ycyA9IGN0b3JzLnNsaWNlKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZiAoYmFzZUNsYXNzKSB7XG4gICAgICAgIGN0b3JzID0gW2Jhc2VDbGFzc107XG4gICAgfVxuICAgIC8vIGFwcGVuZCBzdWJjbGFzcyB1c2VyIGNvbnN0cnVjdG9yc1xuICAgIGlmIChjdG9ycykge1xuICAgICAgICBpZiAoY29uc3RydWN0b3IpIHtcbiAgICAgICAgICAgIGN0b3JzLnB1c2goY29uc3RydWN0b3IpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGVsc2UgaWYgKGNvbnN0cnVjdG9yKSB7XG4gICAgICAgIGN0b3JzID0gW2NvbnN0cnVjdG9yXTtcbiAgICB9XG4gICAgLy8gY3JlYXRlIGNsYXNzIGNvbnN0cnVjdG9yXG4gICAgdmFyIGZpcmVDbGFzcztcbiAgICB2YXIgYm9keSA9ICcoZnVuY3Rpb24oKXtcXG4nO1xuXG4gICAgaWYgKEZJUkVfRURJVE9SKSB7XG4gICAgICAgIGJvZHkgKz0gJ3RoaXMuX29ic2VydmluZz1mYWxzZTtcXG4nO1xuICAgIH1cbiAgICBib2R5ICs9ICdpbnN0YW50aWF0ZVByb3BzKHRoaXMsZmlyZUNsYXNzKTtcXG4nO1xuXG4gICAgLy8gY2FsbCB1c2VyIGNvbnN0cnVjdG9yc1xuICAgIGlmIChjdG9ycykge1xuICAgICAgICBpZiAoRklSRV9FRElUT1IpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuYXNzZXJ0KGN0b3JzLmxlbmd0aCA+IDApO1xuICAgICAgICB9XG5cbiAgICAgICAgYm9keSArPSAndmFyIGNzPWZpcmVDbGFzcy5fX2N0b3JzX187XFxuJztcblxuICAgICAgICBpZiAodXNlVHJ5Q2F0Y2gpIHtcbiAgICAgICAgICAgIGJvZHkgKz0gJ3RyeXtcXG4nO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGN0b3JzLmxlbmd0aCA8PSA1KSB7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGN0b3JzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgYm9keSArPSAnKGNzWycgKyBpICsgJ10pLmFwcGx5KHRoaXMsYXJndW1lbnRzKTtcXG4nO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgYm9keSArPSAnZm9yKHZhciBpPTAsbD1jcy5sZW5ndGg7aTxsOysraSl7XFxuJztcbiAgICAgICAgICAgIGJvZHkgKz0gJyhjc1tpXSkuYXBwbHkodGhpcyxhcmd1bWVudHMpO1xcbn1cXG4nO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHVzZVRyeUNhdGNoKSB7XG4gICAgICAgICAgICBib2R5ICs9ICd9Y2F0Y2goZSl7XFxuRmlyZS5fdGhyb3coZSk7XFxufVxcbic7XG4gICAgICAgIH1cbiAgICB9XG4gICAgYm9keSArPSAnfSknO1xuXG4gICAgLy8ganNoaW50IGV2aWw6IHRydWVcbiAgICBmaXJlQ2xhc3MgPSBldmFsKGJvZHkpO1xuICAgIC8vIGpzaGludCBldmlsOiBmYWxzZVxuXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGZpcmVDbGFzcywgJ19fY3RvcnNfXycsIHtcbiAgICAgICAgdmFsdWU6IGN0b3JzIHx8IG51bGwsXG4gICAgICAgIHdyaXRhYmxlOiBmYWxzZSxcbiAgICAgICAgZW51bWVyYWJsZTogZmFsc2VcbiAgICB9KTtcbiAgICByZXR1cm4gZmlyZUNsYXNzO1xufVxuXG4vKipcbiAqIFNwZWNpYWxseSBvcHRpbWl6ZWQgZGVmaW5lIGZ1bmN0aW9uIG9ubHkgZm9yIGludGVybmFsIGJhc2UgY2xhc3Nlc1xuICpcbiAqIEBtZXRob2QgX2Zhc3REZWZpbmVcbiAqIEBwYXJhbSB7c3RyaW5nfSBjbGFzc05hbWVcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IGNvbnN0cnVjdG9yXG4gKiBAcGFyYW0ge3N0cmluZ1tdfSBzZXJpYWxpemFibGVGaWVsZHNcbiAqIEBwcml2YXRlXG4gKi9cbkZpcmUuX2Zhc3REZWZpbmUgPSBmdW5jdGlvbiAoY2xhc3NOYW1lLCBjb25zdHJ1Y3Rvciwgc2VyaWFsaXphYmxlRmllbGRzKSB7XG4gICAgSlMuc2V0Q2xhc3NOYW1lKGNsYXNzTmFtZSwgY29uc3RydWN0b3IpO1xuICAgIGNvbnN0cnVjdG9yLl9fcHJvcHNfXyA9IHNlcmlhbGl6YWJsZUZpZWxkcztcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNlcmlhbGl6YWJsZUZpZWxkcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBGaXJlLmF0dHIoY29uc3RydWN0b3IsIHNlcmlhbGl6YWJsZUZpZWxkc1tpXSwgeyB2aXNpYmxlOiBmYWxzZSB9KTtcbiAgICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBpbnN0YW50aWF0ZVByb3BzOiBpbnN0YW50aWF0ZVByb3BzXG59O1xuIiwiLy8gZ2xvYmFsIGRlZmluaXRpb25zXG5cbi8qKlxuICogQHByb3BlcnR5IHtCb29sZWFufSBpc05vZGUgLSAhI2VuIGluZGljYXRlcyB3aGV0aGVyIGV4ZWN1dGVzIGluIG5vZGUuanMgYXBwbGljYXRpb24gISN6aCDmmK/lkKblnKggbm9kZWpzIOi/kOihjOeOr+Wig+S4i1xuICovXG5GaXJlLmlzTm9kZSA9ICEhKHR5cGVvZiBwcm9jZXNzICE9PSAndW5kZWZpbmVkJyAmJiBwcm9jZXNzLnZlcnNpb25zICYmIHByb2Nlc3MudmVyc2lvbnMubm9kZSk7XG5GaXJlLmlzTm9kZVdlYmtpdCA9ICEhKEZpcmUuaXNOb2RlICYmICdub2RlLXdlYmtpdCcgaW4gcHJvY2Vzcy52ZXJzaW9ucyk7ICAgLy8gbm9kZS13ZWJraXRcbkZpcmUuaXNBdG9tU2hlbGwgPSAhIShGaXJlLmlzTm9kZSAmJiAnYXRvbS1zaGVsbCcgaW4gcHJvY2Vzcy52ZXJzaW9ucyk7ICAgICAvLyBhdG9tLXNoZWxsXG5GaXJlLmlzQXBwID0gRmlyZS5pc05vZGVXZWJraXQgfHwgRmlyZS5pc0F0b21TaGVsbDtcblxuLyoqXG4gKiBpbmRpY2F0ZXMgd2hldGhlciBleGVjdXRlcyBpbiBjb21tb24gd2ViIGJyb3dzZXJcbiAqIEBwcm9wZXJ0eSBpc1B1cmVXZWJcbiAqIEB0eXBlIHtCb29sZWFufVxuICovXG5GaXJlLmlzUHVyZVdlYiA9ICFGaXJlLmlzTm9kZSAmJiAhRmlyZS5pc0FwcDsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29tbW9uIHdlYiBicm93c2VyXG5cbi8qKlxuICogaW5kaWNhdGVzIHdoZXRoZXIgZXhlY3V0ZXMgaW4gRmlyZWJhbGwgZWRpdG9yXG4gKiBAcHJvcGVydHkgaXNFZGl0b3JcbiAqIEB0eXBlIHtCb29sZWFufVxuICovXG5GaXJlLmlzRWRpdG9yID0gRmlyZS5pc0FwcDsgICAgIC8vIGJ5IGZhciB0aGVyZSBpcyBubyBzdGFuZGFsb25lIGNsaWVudCB2ZXJzaW9uLCBzbyBhcHAgPT0gZWRpdG9yXG4vLyBBbHdheXMgZXhwb3J0IEZJUkVfRURJVE9SIGdsb2JhbGx5XG5pZiAodHlwZW9mIEZJUkVfRURJVE9SID09PSAndW5kZWZpbmVkJykge1xuICAgIGV2YWwoJ0ZJUkVfRURJVE9SPUZpcmUuaXNFZGl0b3InKTsgIC8vIHVzZSBldmFsIHRvIGlnbm9yZSB1Z2xpZnlcbn1cblxuXG4vKipcbiAqIGluZGljYXRlcyB3aGV0aGVyIGV4ZWN1dGVzIGluIGNvbW1vbiB3ZWIgYnJvd3Nlciwgb3IgZWRpdG9yJ3Mgd2luZG93IHByb2Nlc3MoYXRvbS1zaGVsbCdzIHJlbmRlcmVyIGNvbnRleHQpXG4gKiBAcHJvcGVydHkgaXNXZWJcbiAqIEB0eXBlIHtCb29sZWFufVxuICovXG5pZiAoRmlyZS5pc0F0b21TaGVsbCkge1xuICAgIEZpcmUuaXNXZWIgPSB0eXBlb2YgcHJvY2VzcyAhPT0gJ3VuZGVmaW5lZCcgJiYgcHJvY2Vzcy50eXBlID09PSAncmVuZGVyZXInO1xufVxuZWxzZSB7XG4gICAgRmlyZS5pc1dlYiA9ICh0eXBlb2YgX19kaXJuYW1lID09PSAndW5kZWZpbmVkJyB8fCBfX2Rpcm5hbWUgPT09IG51bGwpO1xufVxuXG4vKipcbiAqIEluZGljYXRlcyB3aGV0aGVyIGV4ZWN1dGVzIGluIGVkaXRvcidzIG1haW4gcHJvY2VzcyAoRWxlY3Ryb24ncyBicm93c2VyIGNvbnRleHQpXG4gKiBAcHJvcGVydHkgaXNDb3JlTGV2ZWxcbiAqIEB0eXBlIHtCb29sZWFufVxuICovXG5GaXJlLmlzQ29yZUxldmVsID0gRmlyZS5pc0FwcCAmJiAhRmlyZS5pc1dlYjtcblxuaWYgKEZpcmUuaXNOb2RlKSB7XG4gICAgLyoqXG4gICAgICogaW5kaWNhdGVzIHdoZXRoZXIgZXhlY3V0ZXMgaW4gT1NYXG4gICAgICogQHByb3BlcnR5IGlzRGFyd2luXG4gICAgICogQHR5cGUge0Jvb2xlYW59XG4gICAgICovXG4gICAgRmlyZS5pc0RhcndpbiA9IHByb2Nlc3MucGxhdGZvcm0gPT09ICdkYXJ3aW4nO1xuXG4gICAgLyoqXG4gICAgICogaW5kaWNhdGVzIHdoZXRoZXIgZXhlY3V0ZXMgaW4gV2luZG93c1xuICAgICAqIEBwcm9wZXJ0eSBpc1dpbjMyXG4gICAgICogQHR5cGUge0Jvb2xlYW59XG4gICAgICovXG4gICAgRmlyZS5pc1dpbjMyID0gcHJvY2Vzcy5wbGF0Zm9ybSA9PT0gJ3dpbjMyJztcbn1cbmVsc2Uge1xuICAgIC8vIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvMTk4Nzc5MjQvd2hhdC1pcy10aGUtbGlzdC1vZi1wb3NzaWJsZS12YWx1ZXMtZm9yLW5hdmlnYXRvci1wbGF0Zm9ybS1hcy1vZi10b2RheVxuICAgIHZhciBwbGF0Zm9ybSA9IHdpbmRvdy5uYXZpZ2F0b3IucGxhdGZvcm07XG4gICAgRmlyZS5pc0RhcndpbiA9IHBsYXRmb3JtLnN1YnN0cmluZygwLCAzKSA9PT0gJ01hYyc7XG4gICAgRmlyZS5pc1dpbjMyID0gcGxhdGZvcm0uc3Vic3RyaW5nKDAsIDMpID09PSAnV2luJztcbn1cblxuaWYgKEZpcmUuaXNQdXJlV2ViKSB7XG4gICAgdmFyIHdpbiA9IHdpbmRvdywgbmF2ID0gd2luLm5hdmlnYXRvciwgZG9jID0gZG9jdW1lbnQsIGRvY0VsZSA9IGRvYy5kb2N1bWVudEVsZW1lbnQ7XG4gICAgdmFyIHVhID0gbmF2LnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpO1xuXG4gICAgLyoqXG4gICAgICogaW5kaWNhdGVzIHdoZXRoZXIgZXhlY3V0ZXMgaW4gbW9iaWxlIGRldmljZVxuICAgICAqIEBwcm9wZXJ0eSBpc01vYmlsZVxuICAgICAqIEB0eXBlIHtCb29sZWFufVxuICAgICAqL1xuICAgIEZpcmUuaXNNb2JpbGUgPSB1YS5pbmRleE9mKCdtb2JpbGUnKSAhPT0gLTEgfHwgdWEuaW5kZXhPZignYW5kcm9pZCcpICE9PSAtMTtcbiAgICAvKipcbiAgICAgKiBpbmRpY2F0ZXMgd2hldGhlciBleGVjdXRlcyBpbiBpT1NcbiAgICAgKiBAcHJvcGVydHkgaXNJT1NcbiAgICAgKiBAdHlwZSB7Qm9vbGVhbn1cbiAgICAgKi9cbiAgICBGaXJlLmlzSU9TID0gISF1YS5tYXRjaCgvKGlQYWR8aVBob25lfGlQb2QpL2kpO1xuICAgIC8qKlxuICAgICAqIGluZGljYXRlcyB3aGV0aGVyIGV4ZWN1dGVzIGluIEFuZHJvaWRcbiAgICAgKiBAcHJvcGVydHkgaXNBbmRyb2lkXG4gICAgICogQHR5cGUge0Jvb2xlYW59XG4gICAgICovXG4gICAgRmlyZS5pc0FuZHJvaWQgPSAhISh1YS5tYXRjaCgvYW5kcm9pZC9pKSB8fCBuYXYucGxhdGZvcm0ubWF0Y2goL2FuZHJvaWQvaSkpO1xufVxuZWxzZSB7XG4gICAgRmlyZS5pc0FuZHJvaWQgPSBGaXJlLmlzSU9TID0gRmlyZS5pc01vYmlsZSA9IGZhbHNlO1xufVxuXG4vKipcbiAqICEjZW4gQ2hlY2sgaWYgcnVubmluZyBpbiByZXRpbmEgZGlzcGxheVxuICogISN6aCDliKTmlq3nqpflj6PmmK/lkKbmmL7npLrlnKggUmV0aW5hIOaYvuekuuWZqOS4i+OAgui/meS4quWxnuaAp+S8mumaj+edgOeql+WPo+aJgOWcqOeahOaYvuekuuWZqOWPmOWMluiAjOWPmOWMllxuICogQHByb3BlcnR5IGlzUmV0aW5hXG4gKiBAdHlwZSBib29sZWFuXG4gKi9cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShGaXJlLCAnaXNSZXRpbmEnLCB7XG4gICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBGaXJlLmlzV2ViICYmIHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvICYmIHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvID4gMTtcbiAgICB9XG59KTtcblxuLyoqXG4gKiAhI2VuIEluZGljYXRlcyB3aGV0aGVyIHJldGluYSBtb2RlIGlzIGVuYWJsZWQgY3VycmVudGx5LiBSZXRpbmEgbW9kZSBpcyBlbmFibGVkIGJ5IGRlZmF1bHQgZm9yIEFwcGxlIGRldmljZSBidXQgZGlzYWJsZWQgZm9yIG90aGVyIGRldmljZXMuXG4gKiAhI3poIOWIpOaWreW9k+WJjeaYr+WQpuWQr+eUqCByZXRpbmEg5riy5p+T5qih5byP44CCRmlyZS5pc1JldGluYSDlj6rmmK/ooajnpLrns7vnu5/nmoTmlK/mjIHnirbmgIHvvIzogIzmnIDnu4jmmK/lkKblkK/nlKggcmV0aW5hIOWImeWPluWGs+S6jiBGaXJlLmlzUmV0aW5hRW5hYmxlZOOAgueUseS6juWuieWNk+WkquWNoe+8jOi/memHjOm7mOiupOemgeeUqCByZXRpbmHjgIJcbiAqIEBwcm9wZXJ0eSBpc1JldGluYUVuYWJsZWRcbiAqIEB0eXBlIHtCb29sZWFufVxuICovXG5GaXJlLmlzUmV0aW5hRW5hYmxlZCA9IChGaXJlLmlzSU9TIHx8IEZpcmUuaXNEYXJ3aW4pICYmICFGSVJFX0VESVRPUiAmJiBGaXJlLmlzUmV0aW5hO1xuXG4vLyBkZWZpbml0aW9ucyBmb3IgRk9iamVjdC5fb2JqRmxhZ3NcblxudmFyIERlc3Ryb3llZCA9IDEgPDwgMDtcbnZhciBUb0Rlc3Ryb3kgPSAxIDw8IDE7XG52YXIgRG9udFNhdmUgPSAxIDw8IDI7XG52YXIgRWRpdG9yT25seSAgPSAxIDw8IDM7XG52YXIgRGlydHkgPSAxIDw8IDQ7XG52YXIgRG9udERlc3Ryb3kgPSAxIDw8IDU7XG5cbi8qKlxuICogQml0IG1hc2sgdGhhdCBjb250cm9scyBvYmplY3Qgc3RhdGVzLlxuICogQGNsYXNzIF9PYmplY3RGbGFnc1xuICogQHN0YXRpY1xuICogQHByaXZhdGVcbiAqL1xudmFyIE9iamVjdEZsYWdzID0ge1xuXG4gICAgLy8gcHVibGljIGZsYWdzXG5cbiAgICAvKipcbiAgICAgKiBUaGUgb2JqZWN0IHdpbGwgbm90IGJlIHNhdmVkLlxuICAgICAqIEBwcm9wZXJ0eSBEb250U2F2ZVxuICAgICAqIEB0eXBlIG51bWJlclxuICAgICAqL1xuICAgIERvbnRTYXZlOiBEb250U2F2ZSxcblxuICAgIC8qKlxuICAgICAqIFRoZSBvYmplY3Qgd2lsbCBub3QgYmUgc2F2ZWQgd2hlbiBidWlsZGluZyBhIHBsYXllci5cbiAgICAgKiBAcHJvcGVydHkgRWRpdG9yT25seVxuICAgICAqIEB0eXBlIG51bWJlclxuICAgICAqL1xuICAgIEVkaXRvck9ubHk6IEVkaXRvck9ubHksXG5cbiAgICBEaXJ0eTogRGlydHksXG5cbiAgICAvKipcbiAgICAgKiBEb250IGRlc3Ryb3kgYXV0b21hdGljYWxseSB3aGVuIGxvYWRpbmcgYSBuZXcgc2NlbmUuXG4gICAgICogQHByb3BlcnR5IERvbnREZXN0cm95XG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBEb250RGVzdHJveTogRG9udERlc3Ryb3ksXG5cbiAgICAvLyBwdWJsaWMgZmxhZ3MgZm9yIGVuZ2luZVxuXG4gICAgRGVzdHJveWluZzogMSA8PCA5LFxuXG4gICAgLyoqXG4gICAgICogSGlkZSBpbiBnYW1lIGFuZCBoaWVyYXJjaHkuXG4gICAgICogVGhpcyBmbGFnIGlzIHJlYWRvbmx5LCBpdCBjYW4gb25seSBiZSB1c2VkIGFzIGFuIGFyZ3VtZW50IG9mIHNjZW5lLmFkZEVudGl0eSgpIG9yIEVudGl0eS5jcmVhdGVXaXRoRmxhZ3MoKVxuICAgICAqIEBwcm9wZXJ0eSBIaWRlSW5HYW1lXG4gICAgICogQHR5cGUgbnVtYmVyXG4gICAgICovXG4gICAgSGlkZUluR2FtZTogMSA8PCAxMCxcblxuICAgIC8vIHB1YmxpYyBmbGFncyBmb3IgZWRpdG9yXG5cbiAgICAvKipcbiAgICAgKiBUaGlzIGZsYWcgaXMgcmVhZG9ubHksIGl0IGNhbiBvbmx5IGJlIHVzZWQgYXMgYW4gYXJndW1lbnQgb2Ygc2NlbmUuYWRkRW50aXR5KCkgb3IgRW50aXR5LmNyZWF0ZVdpdGhGbGFncygpXG4gICAgICogQHByb3BlcnR5IEhpZGVJbkVkaXRvclxuICAgICAqIEB0eXBlIG51bWJlclxuICAgICAqL1xuICAgIEhpZGVJbkVkaXRvcjogMSA8PCAxMSxcblxuICAgIC8vIGZsYWdzIGZvciBDb21wb25lbnRcbiAgICBJc09uRW5hYmxlQ2FsbGVkOiAxIDw8IDEyLFxuICAgIElzT25Mb2FkQ2FsbGVkOiAxIDw8IDEzLFxuICAgIElzT25TdGFydENhbGxlZDogMSA8PCAxNCxcbiAgICBJc0VkaXRvck9uRW5hYmxlZENhbGxlZDogMSA8PCAxNVxuXG59O1xuXG4vKipcbiAqIEhpZGUgaW4gZ2FtZSB2aWV3LCBoaWVyYXJjaHksIGFuZCBzY2VuZSB2aWV3Li4uIGV0Yy5cbiAqIFRoaXMgZmxhZyBpcyByZWFkb25seSwgaXQgY2FuIG9ubHkgYmUgdXNlZCBhcyBhbiBhcmd1bWVudCBvZiBzY2VuZS5hZGRFbnRpdHkoKSBvciBFbnRpdHkuY3JlYXRlV2l0aEZsYWdzKClcbiAqIEBwcm9wZXJ0eSBIaWRlXG4gKiBAdHlwZSBudW1iZXJcbiAqL1xuT2JqZWN0RmxhZ3MuSGlkZSA9IE9iamVjdEZsYWdzLkhpZGVJbkdhbWUgfCBPYmplY3RGbGFncy5IaWRlSW5FZGl0b3I7XG5cbkZpcmUuX09iamVjdEZsYWdzID0gT2JqZWN0RmxhZ3M7XG5cbnZhciBQZXJzaXN0ZW50TWFzayA9IH4oVG9EZXN0cm95IHwgRGlydHkgfCBPYmplY3RGbGFncy5EZXN0cm95aW5nIHwgRG9udERlc3Ryb3kgfCAgICAgLy8gY2FuIG5vdCBjbG9uZSB0aGVzZSBmbGFnc1xuICAgICAgICAgICAgICAgICAgICAgICBPYmplY3RGbGFncy5Jc09uRW5hYmxlQ2FsbGVkIHxcbiAgICAgICAgICAgICAgICAgICAgICAgT2JqZWN0RmxhZ3MuSXNFZGl0b3JPbkVuYWJsZWRDYWxsZWQgfFxuICAgICAgICAgICAgICAgICAgICAgICBPYmplY3RGbGFncy5Jc09uTG9hZENhbGxlZCB8XG4gICAgICAgICAgICAgICAgICAgICAgIE9iamVjdEZsYWdzLklzT25TdGFydENhbGxlZCk7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIERlc3Ryb3llZDogRGVzdHJveWVkLFxuICAgIFRvRGVzdHJveTogVG9EZXN0cm95LFxuICAgIERvbnRTYXZlOiBEb250U2F2ZSxcbiAgICBFZGl0b3JPbmx5OiBFZGl0b3JPbmx5LFxuICAgIC8vRGlydHk6IERpcnR5LFxuICAgIC8vRG9udERlc3Ryb3k6IERvbnREZXN0cm95LFxuICAgIFBlcnNpc3RlbnRNYXNrOiBQZXJzaXN0ZW50TWFza1xufTtcbiIsInZhciBKUyA9IHJlcXVpcmUoJy4vanMnKTtcblxudmFyIEVOQUJMRV9UQVJHRVQgPSBGSVJFX0VESVRPUjtcblxudmFyIF9EZXNlcmlhbGl6ZXIgPSAoZnVuY3Rpb24gKCkge1xuICAgIC8vLyoqXG4gICAgLy8gKiBAcGFyYW0ge0Jvb2xlYW59IGlzRWRpdG9yIC0gaWYgZmFsc2UsIHByb3BlcnR5IHdpdGggRmlyZS5FZGl0b3JPbmx5IHdpbGwgYmUgZGlzY2FyZGVkXG4gICAgLy8gKi9cbiAgICBmdW5jdGlvbiBfRGVzZXJpYWxpemVyKGpzb25PYmosIHJlc3VsdCwgdGFyZ2V0LCBpc0VkaXRvciwgY2xhc3NGaW5kZXIpIHtcbiAgICAgICAgdGhpcy5fZWRpdG9yID0gaXNFZGl0b3I7XG4gICAgICAgIHRoaXMuX2NsYXNzRmluZGVyID0gY2xhc3NGaW5kZXI7XG4gICAgICAgIGlmIChFTkFCTEVfVEFSR0VUKSB7XG4gICAgICAgICAgICB0aGlzLl90YXJnZXQgPSB0YXJnZXQ7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5faWRMaXN0ID0gW107XG4gICAgICAgIHRoaXMuX2lkT2JqTGlzdCA9IFtdO1xuICAgICAgICB0aGlzLl9pZFByb3BMaXN0ID0gW107XG4gICAgICAgIHRoaXMucmVzdWx0ID0gcmVzdWx0IHx8IG5ldyBGaXJlLl9EZXNlcmlhbGl6ZUluZm8oKTtcblxuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShqc29uT2JqKSkge1xuICAgICAgICAgICAgdmFyIGpzb25BcnJheSA9IGpzb25PYmo7XG4gICAgICAgICAgICB2YXIgcmVmQ291bnQgPSBqc29uQXJyYXkubGVuZ3RoO1xuICAgICAgICAgICAgdGhpcy5kZXNlcmlhbGl6ZWRMaXN0ID0gbmV3IEFycmF5KHJlZkNvdW50KTtcbiAgICAgICAgICAgIC8vIGRlc2VyaWFsaXplXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHJlZkNvdW50OyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAoanNvbkFycmF5W2ldKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBtYWluVGFyZ2V0O1xuICAgICAgICAgICAgICAgICAgICBpZiAoRU5BQkxFX1RBUkdFVCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbWFpblRhcmdldCA9IChpID09PSAwICYmIHRhcmdldCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kZXNlcmlhbGl6ZWRMaXN0W2ldID0gX2Rlc2VyaWFsaXplT2JqZWN0KHRoaXMsIGpzb25BcnJheVtpXSwgbWFpblRhcmdldCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5kZXNlcmlhbGl6ZWREYXRhID0gcmVmQ291bnQgPiAwID8gdGhpcy5kZXNlcmlhbGl6ZWRMaXN0WzBdIDogW107XG5cbiAgICAgICAgICAgIC8vLy8gY2FsbGJhY2tcbiAgICAgICAgICAgIC8vZm9yICh2YXIgaiA9IDA7IGogPCByZWZDb3VudDsgaisrKSB7XG4gICAgICAgICAgICAvLyAgICBpZiAocmVmZXJlbmNlZExpc3Rbal0ub25BZnRlckRlc2VyaWFsaXplKSB7XG4gICAgICAgICAgICAvLyAgICAgICAgcmVmZXJlbmNlZExpc3Rbal0ub25BZnRlckRlc2VyaWFsaXplKCk7XG4gICAgICAgICAgICAvLyAgICB9XG4gICAgICAgICAgICAvL31cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZGVzZXJpYWxpemVkTGlzdCA9IFtudWxsXTtcbiAgICAgICAgICAgIHRoaXMuZGVzZXJpYWxpemVkRGF0YSA9IGpzb25PYmogPyBfZGVzZXJpYWxpemVPYmplY3QodGhpcywganNvbk9iaiwgdGFyZ2V0KSA6IG51bGw7XG4gICAgICAgICAgICB0aGlzLmRlc2VyaWFsaXplZExpc3RbMF0gPSB0aGlzLmRlc2VyaWFsaXplZERhdGE7XG5cbiAgICAgICAgICAgIC8vLy8gY2FsbGJhY2tcbiAgICAgICAgICAgIC8vaWYgKGRlc2VyaWFsaXplZERhdGEub25BZnRlckRlc2VyaWFsaXplKSB7XG4gICAgICAgICAgICAvLyAgICBkZXNlcmlhbGl6ZWREYXRhLm9uQWZ0ZXJEZXNlcmlhbGl6ZSgpO1xuICAgICAgICAgICAgLy99XG4gICAgICAgIH1cblxuICAgICAgICAvLyBkZXJlZmVyZW5jZVxuICAgICAgICBfZGVyZWZlcmVuY2UodGhpcyk7XG4gICAgfVxuXG4gICAgdmFyIF9kZXJlZmVyZW5jZSA9IGZ1bmN0aW9uIChzZWxmKSB7XG4gICAgICAgIC8vIOi/memHjOS4jemHh+eUqOmBjeWOhuWPjeW6j+WIl+WMlue7k+aenOeahOaWueW8j++8jOWboOS4uuWPjeW6j+WIl+WMlueahOe7k+aenOWmguaenOW8leeUqOWIsOWkjeadgueahOWklumDqOW6k++8jOW+iOWuueaYk+WghuagiOa6ouWHuuOAglxuICAgICAgICB2YXIgZGVzZXJpYWxpemVkTGlzdCA9IHNlbGYuZGVzZXJpYWxpemVkTGlzdDtcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IHNlbGYuX2lkTGlzdC5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgICAgdmFyIHByb3BOYW1lID0gc2VsZi5faWRQcm9wTGlzdFtpXTtcbiAgICAgICAgICAgIHZhciBpZCA9IHNlbGYuX2lkTGlzdFtpXTtcbiAgICAgICAgICAgIHNlbGYuX2lkT2JqTGlzdFtpXVtwcm9wTmFtZV0gPSBkZXNlcmlhbGl6ZWRMaXN0W2lkXTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICAvLyDlkowgX2Rlc2VyaWFsaXplT2JqZWN0IOS4jeWQjOeahOWcsOaWueWcqOS6juS8muWIpOaWrSBpZCDlkowgdXVpZFxuICAgIF9EZXNlcmlhbGl6ZXIucHJvdG90eXBlLl9kZXNlcmlhbGl6ZU9iakZpZWxkID0gZnVuY3Rpb24gKG9iaiwganNvbk9iaiwgcHJvcE5hbWUsIHRhcmdldCkge1xuICAgICAgICB2YXIgaWQgPSBqc29uT2JqLl9faWRfXztcbiAgICAgICAgaWYgKHR5cGVvZiBpZCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIHZhciB1dWlkID0ganNvbk9iai5fX3V1aWRfXztcbiAgICAgICAgICAgIGlmICh1dWlkKSB7XG4gICAgICAgICAgICAgICAgLy9pZiAoRU5BQkxFX1RBUkdFVCkge1xuICAgICAgICAgICAgICAgICAgICAvL+i/memHjOS4jeWBmuS7u+S9leaTjeS9nO+8jOWboOS4uuacieWPr+iDveiwg+eUqOiAhemcgOimgeefpemBk+S+nei1luWTquS6myBhc3NldOOAglxuICAgICAgICAgICAgICAgICAgICAvL+iwg+eUqOiAheS9v+eUqCB1dWlkTGlzdCDml7bvvIzlj6/ku6XliKTmlq0gb2JqW3Byb3BOYW1lXSDmmK/lkKbkuLrnqbrvvIzkuLrnqbrliJnooajnpLrlvoXov5vkuIDmraXliqDovb3vvIxcbiAgICAgICAgICAgICAgICAgICAgLy/kuI3kuLrnqbrliJnlj6rmmK/ooajmmI7kvp3otZblhbPns7vjgIJcbiAgICAgICAgICAgICAgICAvLyAgICBpZiAodGFyZ2V0ICYmIHRhcmdldFtwcm9wTmFtZV0gJiYgdGFyZ2V0W3Byb3BOYW1lXS5fdXVpZCA9PT0gdXVpZCkge1xuICAgICAgICAgICAgICAgIC8vICAgICAgICBjb25zb2xlLmFzc2VydChvYmpbcHJvcE5hbWVdID09PSB0YXJnZXRbcHJvcE5hbWVdKTtcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIC8vICAgIH1cbiAgICAgICAgICAgICAgICAvLyB9XG4gICAgICAgICAgICAgICAgdGhpcy5yZXN1bHQudXVpZExpc3QucHVzaCh1dWlkKTtcbiAgICAgICAgICAgICAgICB0aGlzLnJlc3VsdC51dWlkT2JqTGlzdC5wdXNoKG9iaik7XG4gICAgICAgICAgICAgICAgdGhpcy5yZXN1bHQudXVpZFByb3BMaXN0LnB1c2gocHJvcE5hbWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKEVOQUJMRV9UQVJHRVQpIHtcbiAgICAgICAgICAgICAgICAgICAgb2JqW3Byb3BOYW1lXSA9IF9kZXNlcmlhbGl6ZU9iamVjdCh0aGlzLCBqc29uT2JqLCB0YXJnZXQgJiYgdGFyZ2V0W3Byb3BOYW1lXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBvYmpbcHJvcE5hbWVdID0gX2Rlc2VyaWFsaXplT2JqZWN0KHRoaXMsIGpzb25PYmopO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHZhciBkT2JqID0gdGhpcy5kZXNlcmlhbGl6ZWRMaXN0W2lkXTtcbiAgICAgICAgICAgIGlmIChkT2JqKSB7XG4gICAgICAgICAgICAgICAgb2JqW3Byb3BOYW1lXSA9IGRPYmo7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9pZExpc3QucHVzaChpZCk7XG4gICAgICAgICAgICAgICAgdGhpcy5faWRPYmpMaXN0LnB1c2gob2JqKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9pZFByb3BMaXN0LnB1c2gocHJvcE5hbWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIF9kZXNlcmlhbGl6ZVByaW1pdGl2ZU9iamVjdCAoc2VsZiwgaW5zdGFuY2UsIHNlcmlhbGl6ZWQpIHtcbiAgICAgICAgZm9yICh2YXIgcHJvcE5hbWUgaW4gc2VyaWFsaXplZCkge1xuICAgICAgICAgICAgaWYgKHNlcmlhbGl6ZWQuaGFzT3duUHJvcGVydHkocHJvcE5hbWUpKSB7XG4gICAgICAgICAgICAgICAgdmFyIHByb3AgPSBzZXJpYWxpemVkW3Byb3BOYW1lXTtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHByb3AgIT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChwcm9wTmFtZSAhPT0gJ19fdHlwZV9fJy8qICYmIGsgIT0gJ19faWRfXycqLykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaW5zdGFuY2VbcHJvcE5hbWVdID0gcHJvcDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHByb3ApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICggIXByb3AuX191dWlkX18gJiYgdHlwZW9mIHByb3AuX19pZF9fID09PSAndW5kZWZpbmVkJyApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoRU5BQkxFX1RBUkdFVCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnN0YW5jZVtwcm9wTmFtZV0gPSBfZGVzZXJpYWxpemVPYmplY3Qoc2VsZiwgcHJvcCwgc2VsZi5fdGFyZ2V0ICYmIGluc3RhbmNlW3Byb3BOYW1lXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnN0YW5jZVtwcm9wTmFtZV0gPSBfZGVzZXJpYWxpemVPYmplY3Qoc2VsZiwgcHJvcCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKEVOQUJMRV9UQVJHRVQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5fZGVzZXJpYWxpemVPYmpGaWVsZChpbnN0YW5jZSwgcHJvcCwgcHJvcE5hbWUsIHNlbGYuX3RhcmdldCAmJiBpbnN0YW5jZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLl9kZXNlcmlhbGl6ZU9iakZpZWxkKGluc3RhbmNlLCBwcm9wLCBwcm9wTmFtZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgaW5zdGFuY2VbcHJvcE5hbWVdID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIF9kZXNlcmlhbGl6ZVR5cGVkT2JqZWN0IChzZWxmLCBpbnN0YW5jZSwgc2VyaWFsaXplZCkge1xuICAgICAgICAvLysrc2VsZi5zdGFja0NvdW50ZXI7XG4gICAgICAgIC8vaWYgKHNlbGYuc3RhY2tDb3VudGVyID09PSAxMDApIHtcbiAgICAgICAgLy8gICAgZGVidWdnZXI7XG4gICAgICAgIC8vfVxuICAgICAgICBmb3IgKHZhciBwcm9wTmFtZSBpbiBpbnN0YW5jZSkgeyAgICAvLyDpgY3ljoYgaW5zdGFuY2XvvIzlpoLmnpzlhbfmnInnsbvlnovvvIzmiY3kuI3kvJrmioogX190eXBlX18g5Lmf6K+76L+b5p2lXG4gICAgICAgICAgICB2YXIgcHJvcCA9IHNlcmlhbGl6ZWRbcHJvcE5hbWVdO1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBwcm9wICE9PSAndW5kZWZpbmVkJyAmJiBzZXJpYWxpemVkLmhhc093blByb3BlcnR5KHByb3BOYW1lKSkge1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgcHJvcCAhPT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgICAgICAgICAgaW5zdGFuY2VbcHJvcE5hbWVdID0gcHJvcDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChwcm9wKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoICFwcm9wLl9fdXVpZF9fICYmIHR5cGVvZiBwcm9wLl9faWRfXyA9PT0gJ3VuZGVmaW5lZCcgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKEVOQUJMRV9UQVJHRVQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5zdGFuY2VbcHJvcE5hbWVdID0gX2Rlc2VyaWFsaXplT2JqZWN0KHNlbGYsIHByb3AsIHNlbGYuX3RhcmdldCAmJiBpbnN0YW5jZVtwcm9wTmFtZV0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5zdGFuY2VbcHJvcE5hbWVdID0gX2Rlc2VyaWFsaXplT2JqZWN0KHNlbGYsIHByb3ApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChFTkFCTEVfVEFSR0VUKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuX2Rlc2VyaWFsaXplT2JqRmllbGQoaW5zdGFuY2UsIHByb3AsIHByb3BOYW1lLCBzZWxmLl90YXJnZXQgJiYgaW5zdGFuY2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5fZGVzZXJpYWxpemVPYmpGaWVsZChpbnN0YW5jZSwgcHJvcCwgcHJvcE5hbWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGluc3RhbmNlW3Byb3BOYW1lXSA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8tLXNlbGYuc3RhY2tDb3VudGVyO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIF9kZXNlcmlhbGl6ZUZpcmVDbGFzcyhzZWxmLCBvYmosIHNlcmlhbGl6ZWQsIGtsYXNzLCB0YXJnZXQpIHtcbiAgICAgICAgdmFyIHByb3BzID0ga2xhc3MuX19wcm9wc19fO1xuICAgICAgICBpZiAoIXByb3BzKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgZm9yICh2YXIgcCA9IDA7IHAgPCBwcm9wcy5sZW5ndGg7IHArKykge1xuICAgICAgICAgICAgdmFyIHByb3BOYW1lID0gcHJvcHNbcF07XG4gICAgICAgICAgICB2YXIgYXR0cnMgPSBGaXJlLmF0dHIoa2xhc3MsIHByb3BOYW1lKTtcbiAgICAgICAgICAgIC8vIGFzc3VtZSBhbGwgcHJvcCBpbiBfX3Byb3BzX18gbXVzdCBoYXZlIGF0dHJcbiAgICAgICAgICAgIHZhciByYXdUeXBlID0gYXR0cnMucmF3VHlwZTtcbiAgICAgICAgICAgIGlmICghcmF3VHlwZSkge1xuICAgICAgICAgICAgICAgIGlmICghc2VsZi5fZWRpdG9yICYmIGF0dHJzLmVkaXRvck9ubHkpIHtcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7ICAgLy8gc2tpcCBlZGl0b3Igb25seSBpZiBub3QgZWRpdG9yXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHZhciBzYXZlVXJsQXNBc3NldCA9IGF0dHJzLnNhdmVVcmxBc0Fzc2V0O1xuICAgICAgICAgICAgICAgIGlmIChhdHRycy5zZXJpYWxpemFibGUgPT09IGZhbHNlICYmICFzYXZlVXJsQXNBc3NldCkge1xuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTsgICAvLyBza2lwIG5vblNlcmlhbGl6ZWRcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdmFyIHByb3AgPSBzZXJpYWxpemVkW3Byb3BOYW1lXTtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHByb3AgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHByb3AgIT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICAgICAgICAgIG9ialtwcm9wTmFtZV0gPSBwcm9wO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHByb3ApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghcHJvcC5fX3V1aWRfXyAmJiB0eXBlb2YgcHJvcC5fX2lkX18gPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKEVOQUJMRV9UQVJHRVQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JqW3Byb3BOYW1lXSA9IF9kZXNlcmlhbGl6ZU9iamVjdChzZWxmLCBwcm9wLCB0YXJnZXQgJiYgdGFyZ2V0W3Byb3BOYW1lXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvYmpbcHJvcE5hbWVdID0gX2Rlc2VyaWFsaXplT2JqZWN0KHNlbGYsIHByb3ApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChFTkFCTEVfVEFSR0VUKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuX2Rlc2VyaWFsaXplT2JqRmllbGQob2JqLCBwcm9wLCBwcm9wTmFtZSwgdGFyZ2V0ICYmIG9iaik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLl9kZXNlcmlhbGl6ZU9iakZpZWxkKG9iaiwgcHJvcCwgcHJvcE5hbWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2F2ZVVybEFzQXNzZXQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gcmVkaXJlY3QgdG8gc2V0dGVyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciByZXN1bHQgPSBzZWxmLnJlc3VsdDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdC51dWlkT2JqTGlzdFtyZXN1bHQudXVpZE9iakxpc3QubGVuZ3RoIC0gMV0gPT09IG9iaikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnV1aWRQcm9wTGlzdFtyZXN1bHQudXVpZFByb3BMaXN0Lmxlbmd0aCAtIDFdID0gXCJfc2V0JFwiICsgcHJvcE5hbWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBvYmpbcHJvcE5hbWVdID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIGFsd2F5cyBsb2FkIHJhdyBvYmplY3RzIGV2ZW4gaWYgcHJvcGVydHkgbm90IHNlcmlhbGl6ZWRcbiAgICAgICAgICAgICAgICBpZiAoc2VsZi5yZXN1bHQucmF3UHJvcCkge1xuICAgICAgICAgICAgICAgICAgICBGaXJlLmVycm9yKCdub3Qgc3VwcG9ydCBtdWx0aSByYXcgb2JqZWN0IGluIGEgZmlsZScpO1xuICAgICAgICAgICAgICAgICAgICAvLyDov5nph4zlgYflrprmr4/kuKphc3NldOmDveaciXV1aWTvvIzmr4/kuKpqc29u5Y+q6IO95YyF5ZCr5LiA5LiqYXNzZXTvvIzlj6rog73ljIXlkKvkuIDkuKpyYXdQcm9wXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHNlbGYucmVzdWx0LnJhd1Byb3AgPSBwcm9wTmFtZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAocHJvcHNbcHJvcHMubGVuZ3RoIC0gMV0gPT09ICdfJGVyaWFsaXplZCcpIHtcbiAgICAgICAgICAgIC8vIHNhdmUgb3JpZ2luYWwgc2VyaWFsaXplZCBkYXRhXG4gICAgICAgICAgICBvYmouXyRlcmlhbGl6ZWQgPSBzZXJpYWxpemVkO1xuICAgICAgICAgICAgLy8gcGFyc2UgdGhlIHNlcmlhbGl6ZWQgZGF0YSBhcyBwcmltaXRpdmUgamF2YXNjcmlwdCBvYmplY3QsIHNvIGl0cyBfX2lkX18gd2lsbCBiZSBkZXJlZmVyZW5jZWRcbiAgICAgICAgICAgIF9kZXNlcmlhbGl6ZVByaW1pdGl2ZU9iamVjdChzZWxmLCBvYmouXyRlcmlhbGl6ZWQsIHNlcmlhbGl6ZWQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8vKipcbiAgICAvLyAqIEBwYXJhbSB7b2JqZWN0fSBzZXJpYWxpemVkIC0gVGhlIG9iaiB0byBkZXNlcmlhbGl6ZSwgbXVzdCBiZSBub24tbmlsXG4gICAgLy8gKiBAcGFyYW0ge29iamVjdH0gW3RhcmdldD1udWxsXVxuICAgIC8vICovXG4gICAgdmFyIF9kZXNlcmlhbGl6ZU9iamVjdCA9IGZ1bmN0aW9uIChzZWxmLCBzZXJpYWxpemVkLCB0YXJnZXQpIHtcbiAgICAgICAgdmFyIHByb3BOYW1lLCBwcm9wO1xuICAgICAgICB2YXIgb2JqID0gbnVsbDsgICAgIC8vIHRoZSBvYmogdG8gcmV0dXJuXG4gICAgICAgIHZhciBrbGFzcyA9IG51bGw7XG4gICAgICAgIGlmIChzZXJpYWxpemVkLl9fdHlwZV9fKSB7XG5cbiAgICAgICAgICAgIC8vIFR5cGUgT2JqZWN0IChpbmNsdWRpbmcgRmlyZUNsYXNzKVxuXG4gICAgICAgICAgICBrbGFzcyA9IHNlbGYuX2NsYXNzRmluZGVyKHNlcmlhbGl6ZWQuX190eXBlX18pO1xuICAgICAgICAgICAgaWYgKCFrbGFzcykge1xuICAgICAgICAgICAgICAgIEZpcmUuZXJyb3IoJ1tGaXJlLmRlc2VyaWFsaXplXSB1bmtub3duIHR5cGU6ICcgKyBzZXJpYWxpemVkLl9fdHlwZV9fKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKEVOQUJMRV9UQVJHRVQgJiYgdGFyZ2V0KSB7XG4gICAgICAgICAgICAgICAgLy8gdXNlIHRhcmdldFxuICAgICAgICAgICAgICAgIGlmICggISh0YXJnZXQgaW5zdGFuY2VvZiBrbGFzcykgKSB7XG4gICAgICAgICAgICAgICAgICAgIEZpcmUud2FybignVHlwZSBvZiB0YXJnZXQgdG8gZGVzZXJpYWxpemUgbm90IG1hdGNoZWQgd2l0aCBkYXRhOiB0YXJnZXQgaXMgJXMsIGRhdGEgaXMgJXMnLFxuICAgICAgICAgICAgICAgICAgICAgICAgSlMuZ2V0Q2xhc3NOYW1lKHRhcmdldCksIGtsYXNzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgb2JqID0gdGFyZ2V0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gaW5zdGFudGlhdGUgYSBuZXcgb2JqZWN0XG4gICAgICAgICAgICAgICAgb2JqID0gbmV3IGtsYXNzKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChvYmogaW5zdGFuY2VvZiBGT2JqZWN0ICYmIG9iai5fZGVzZXJpYWxpemUpIHtcbiAgICAgICAgICAgICAgICBvYmouX2Rlc2VyaWFsaXplKHNlcmlhbGl6ZWQuY29udGVudCwgc2VsZik7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG9iajtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICggRmlyZS5faXNGaXJlQ2xhc3Moa2xhc3MpICkge1xuICAgICAgICAgICAgICAgIF9kZXNlcmlhbGl6ZUZpcmVDbGFzcyhzZWxmLCBvYmosIHNlcmlhbGl6ZWQsIGtsYXNzLCB0YXJnZXQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgX2Rlc2VyaWFsaXplVHlwZWRPYmplY3Qoc2VsZiwgb2JqLCBzZXJpYWxpemVkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICggIUFycmF5LmlzQXJyYXkoc2VyaWFsaXplZCkgKSB7XG5cbiAgICAgICAgICAgIC8vIGVtYmVkZGVkIHByaW1pdGl2ZSBqYXZhc2NyaXB0IG9iamVjdFxuXG4gICAgICAgICAgICBvYmogPSAoRU5BQkxFX1RBUkdFVCAmJiB0YXJnZXQpIHx8IHt9O1xuICAgICAgICAgICAgX2Rlc2VyaWFsaXplUHJpbWl0aXZlT2JqZWN0KHNlbGYsIG9iaiwgc2VyaWFsaXplZCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG5cbiAgICAgICAgICAgIC8vIEFycmF5XG5cbiAgICAgICAgICAgIGlmIChFTkFCTEVfVEFSR0VUICYmIHRhcmdldCkge1xuICAgICAgICAgICAgICAgIHRhcmdldC5sZW5ndGggPSBzZXJpYWxpemVkLmxlbmd0aDtcbiAgICAgICAgICAgICAgICBvYmogPSB0YXJnZXQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBvYmogPSBuZXcgQXJyYXkoc2VyaWFsaXplZC5sZW5ndGgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNlcmlhbGl6ZWQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBwcm9wID0gc2VyaWFsaXplZFtpXTtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHByb3AgPT09ICdvYmplY3QnICYmIHByb3ApIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFwcm9wLl9fdXVpZF9fICYmIHR5cGVvZiBwcm9wLl9faWRfXyA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChFTkFCTEVfVEFSR0VUKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JqW2ldID0gX2Rlc2VyaWFsaXplT2JqZWN0KHNlbGYsIHByb3AsIHRhcmdldCAmJiB0YXJnZXRbaV0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JqW2ldID0gX2Rlc2VyaWFsaXplT2JqZWN0KHNlbGYsIHByb3ApO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKEVOQUJMRV9UQVJHRVQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLl9kZXNlcmlhbGl6ZU9iakZpZWxkKG9iaiwgcHJvcCwgJycgKyBpLCB0YXJnZXQgJiYgdGFyZ2V0W2ldKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuX2Rlc2VyaWFsaXplT2JqRmllbGQob2JqLCBwcm9wLCAnJyArIGkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBvYmpbaV0gPSBwcm9wO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gb2JqO1xuICAgIH07XG5cbiAgICByZXR1cm4gX0Rlc2VyaWFsaXplcjtcbn0pKCk7XG5cbi8qKlxuICogISNlbiBEZXNlcmlhbGl6ZSBqc29uIHRvIEZpcmUuQXNzZXRcbiAqICEjemgg5bCGIEpTT04g5Y+N5bqP5YiX5YyW5Li65a+56LGh5a6e5L6L44CCXG4gKlxuICog5b2T5oyH5a6a5LqGIHRhcmdldCDpgInpobnml7bvvIzlpoLmnpwgdGFyZ2V0IOW8leeUqOeahOWFtuWugyBhc3NldCDnmoQgdXVpZCDkuI3lj5jvvIzliJnkuI3kvJrmlLnlj5ggdGFyZ2V0IOWvuSBhc3NldCDnmoTlvJXnlKjvvIxcbiAqIOS5n+S4jeS8muWwhiB1dWlkIOS/neWtmOWIsCByZXN1bHQg5a+56LGh5Lit44CCXG4gKlxuICogQG1ldGhvZCBkZXNlcmlhbGl6ZVxuICogQHBhcmFtIHsoc3RyaW5nfG9iamVjdCl9IGRhdGEgLSB0aGUgc2VyaWFsaXplZCBGaXJlLkFzc2V0IGpzb24gc3RyaW5nIG9yIGpzb24gb2JqZWN0LlxuICogQHBhcmFtIHtfRGVzZXJpYWxpemVJbmZvfSBbcmVzdWx0XSAtIGFkZGl0aW9uYWwgbG9hZGluZyByZXN1bHRcbiAqIEBwYXJhbSB7b2JqZWN0fSBbb3B0aW9uc11cbiAqIEByZXR1cm4ge29iamVjdH0gdGhlIG1haW4gZGF0YShhc3NldClcbiAqL1xuRmlyZS5kZXNlcmlhbGl6ZSA9IGZ1bmN0aW9uIChkYXRhLCByZXN1bHQsIG9wdGlvbnMpIHtcbiAgICB2YXIgaXNFZGl0b3IgPSAob3B0aW9ucyAmJiAnaXNFZGl0b3InIGluIG9wdGlvbnMpID8gb3B0aW9ucy5pc0VkaXRvciA6IEZJUkVfRURJVE9SO1xuICAgIHZhciBjbGFzc0ZpbmRlciA9IChvcHRpb25zICYmIG9wdGlvbnMuY2xhc3NGaW5kZXIpIHx8IEpTLl9nZXRDbGFzc0J5SWQ7XG4gICAgdmFyIGNyZWF0ZUFzc2V0UmVmcyA9IChvcHRpb25zICYmIG9wdGlvbnMuY3JlYXRlQXNzZXRSZWZzKSB8fCBGaXJlLmlzQ29yZUxldmVsO1xuICAgIHZhciB0YXJnZXQgPSBFTkFCTEVfVEFSR0VUICYmIChvcHRpb25zICYmIG9wdGlvbnMudGFyZ2V0KTtcblxuICAgIGlmICgoRklSRV9FRElUT1IgfHwgRklSRV9URVNUKSAmJiBGaXJlLmlzTm9kZSAmJiBCdWZmZXIuaXNCdWZmZXIoZGF0YSkpIHtcbiAgICAgICAgZGF0YSA9IGRhdGEudG9TdHJpbmcoKTtcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIGRhdGEgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIGRhdGEgPSBKU09OLnBhcnNlKGRhdGEpO1xuICAgIH1cblxuICAgIGlmIChjcmVhdGVBc3NldFJlZnMgJiYgIXJlc3VsdCkge1xuICAgICAgICByZXN1bHQgPSBuZXcgRmlyZS5fRGVzZXJpYWxpemVJbmZvKCk7XG4gICAgfVxuXG4gICAgRmlyZS5faXNDbG9uaW5nID0gdHJ1ZTtcbiAgICB2YXIgZGVzZXJpYWxpemVyID0gbmV3IF9EZXNlcmlhbGl6ZXIoZGF0YSwgcmVzdWx0LCB0YXJnZXQsIGlzRWRpdG9yLCBjbGFzc0ZpbmRlcik7XG4gICAgRmlyZS5faXNDbG9uaW5nID0gZmFsc2U7XG5cbiAgICBpZiAoY3JlYXRlQXNzZXRSZWZzKSB7XG4gICAgICAgIHJlc3VsdC5hc3NpZ25Bc3NldHNCeShFZGl0b3Iuc2VyaWFsaXplLmFzQXNzZXQpO1xuICAgIH1cblxuICAgIHJldHVybiBkZXNlcmlhbGl6ZXIuZGVzZXJpYWxpemVkRGF0YTtcbn07XG5cbi8qKlxuICogISN6aCDljIXlkKvlj43luo/liJfljJbml7bnmoTkuIDkupvkv6Hmga9cbiAqIEBjbGFzcyBfRGVzZXJpYWxpemVJbmZvXG4gKiBAY29uc3RydWN0b3JcbiAqL1xuRmlyZS5fRGVzZXJpYWxpemVJbmZvID0gZnVuY3Rpb24gKCkge1xuXG4gICAgLy90aGlzLnVybExpc3QgPSBbXTtcbiAgICAvL3RoaXMuY2FsbGJhY2tMaXN0ID0gW107XG5cbiAgICAvLyB1dWlkcyhhc3NldHMpIG5lZWQgdG8gbG9hZFxuXG4gICAgLyoqXG4gICAgICogbGlzdCBvZiB0aGUgZGVwZW5kcyBhc3NldHMnIHV1aWRcbiAgICAgKiBAcHJvcGVydHkgdXVpZExpc3RcbiAgICAgKiBAdHlwZSB7c3RyaW5nW119XG4gICAgICovXG4gICAgdGhpcy51dWlkTGlzdCA9IFtdO1xuICAgIC8qKlxuICAgICAqIHRoZSBvYmogbGlzdCB3aG9zZSBmaWVsZCBuZWVkcyB0byBsb2FkIGFzc2V0IGJ5IHV1aWRcbiAgICAgKiBAcHJvcGVydHkgdXVpZE9iakxpc3RcbiAgICAgKiBAdHlwZSB7b2JqZWN0W119XG4gICAgICovXG4gICAgdGhpcy51dWlkT2JqTGlzdCA9IFtdO1xuICAgIC8qKlxuICAgICAqIHRoZSBjb3JyZXNwb25kaW5nIGZpZWxkIG5hbWUgd2hpY2ggcmVmZXJlbmNlZCB0byB0aGUgYXNzZXRcbiAgICAgKiBAcHJvcGVydHkgdXVpZFByb3BMaXN0XG4gICAgICogQHR5cGUge3N0cmluZ1tdfVxuICAgICAqL1xuICAgIHRoaXMudXVpZFByb3BMaXN0ID0gW107XG5cbiAgICAvLyByYXcgb2JqZWN0cyBuZWVkIHRvIGxvYWRcbiAgICAvLyAo5LiN55So5a2YcmF3TGlzdOWboOS4uuWug+eahHV1aWTlj6/ku6Xku45hc3NldOS4iuiOt+W+lylcblxuICAgIC8qKlxuICAgICAqIHRoZSBjb3JyZXNwb25kaW5nIGZpZWxkIG5hbWUgd2hpY2ggcmVmZXJlbmNlZCB0byB0aGUgcmF3IG9iamVjdFxuICAgICAqIEBwcm9wZXJ0eSByYXdQcm9wXG4gICAgICogQHR5cGUge3N0cmluZ31cbiAgICAgKi9cbiAgICB0aGlzLnJhd1Byb3AgPSAnJztcbiAgICAvLyBAcHJvcGVydHkge0Fzc2V0W119IHJhd09iakxpc3QgLSB0aGUgb2JqIGxpc3Qgd2hvc2UgY29ycmVzcG9uZGluZyByYXcgb2JqZWN0IG5lZWRzIHRvIGxvYWRcbiAgICAvL3RoaXMucmF3T2JqTGlzdCA9IFtdO1xuICAgIC8vQHByb3BlcnR5IHtzdHJpbmdbXX0gcmF3UHJvcExpc3QgLSB0aGUgY29ycmVzcG9uZGluZyBmaWVsZCBuYW1lIHdoaWNoIHJlZmVyZW5jZWQgdG8gdGhlIHJhdyBvYmplY3RcbiAgICAvL3RoaXMucmF3UHJvcExpc3QgPSBbXTtcbn07XG5cbi8qKlxuICogQG1ldGhvZCByZXNldFxuICovXG5GaXJlLl9EZXNlcmlhbGl6ZUluZm8ucHJvdG90eXBlLnJlc2V0ID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMudXVpZExpc3QubGVuZ3RoID0gMDtcbiAgICB0aGlzLnV1aWRPYmpMaXN0Lmxlbmd0aCA9IDA7XG4gICAgdGhpcy51dWlkUHJvcExpc3QubGVuZ3RoID0gMDtcbiAgICB0aGlzLnJhd1Byb3AgPSAnJztcbiAgICAvL3RoaXMucmF3T2JqTGlzdC5sZW5ndGggPSAwO1xuICAgIC8vdGhpcy5yYXdQcm9wTGlzdC5sZW5ndGggPSAwO1xufTtcblxuLyoqXG4gKiBAbWV0aG9kIGdldFV1aWRPZlxuICogQHBhcmFtIHtvYmplY3R9IG9ialxuICogQHBhcmFtIHtzdHJpbmd9IHByb3BOYW1lXG4gKiBAcmV0dXJuIHtzdHJpbmd9XG4gKi9cbkZpcmUuX0Rlc2VyaWFsaXplSW5mby5wcm90b3R5cGUuZ2V0VXVpZE9mID0gZnVuY3Rpb24gKG9iaiwgcHJvcE5hbWUpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMudXVpZE9iakxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKHRoaXMudXVpZE9iakxpc3RbaV0gPT09IG9iaiAmJiB0aGlzLnV1aWRQcm9wTGlzdFtpXSA9PT0gcHJvcE5hbWUpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnV1aWRMaXN0W2ldO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBcIlwiO1xufTtcblxuLyoqXG4gKiBAbWV0aG9kIGFzc2lnbkFzc2V0c0J5XG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBnZXR0ZXJcbiAqIEByZXR1cm4ge0Jvb2xlYW59IHN1Y2Nlc3NcbiAqL1xuRmlyZS5fRGVzZXJpYWxpemVJbmZvLnByb3RvdHlwZS5hc3NpZ25Bc3NldHNCeSA9IGZ1bmN0aW9uIChnZXR0ZXIpIHtcbiAgICB2YXIgc3VjY2VzcyA9IHRydWU7XG4gICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IHRoaXMudXVpZExpc3QubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgdmFyIHV1aWQgPSB0aGlzLnV1aWRMaXN0W2ldO1xuICAgICAgICB2YXIgYXNzZXQgPSBnZXR0ZXIodXVpZCk7XG4gICAgICAgIGlmIChhc3NldCkge1xuICAgICAgICAgICAgdmFyIG9iaiA9IHRoaXMudXVpZE9iakxpc3RbaV07XG4gICAgICAgICAgICB2YXIgcHJvcCA9IHRoaXMudXVpZFByb3BMaXN0W2ldO1xuICAgICAgICAgICAgb2JqW3Byb3BdID0gYXNzZXQ7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBGaXJlLmVycm9yKCdGYWlsZWQgdG8gYXNzaWduIGFzc2V0OiAnICsgdXVpZCk7XG4gICAgICAgICAgICBzdWNjZXNzID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHN1Y2Nlc3M7XG59O1xuXG5GaXJlLmRlc2VyaWFsaXplLmFwcGx5TWl4aW5Qcm9wcyA9IGZ1bmN0aW9uIChkYXRhLCBjbGFzc1RvTWl4LCB0YXJnZXQpIHtcbiAgICB2YXIgcHJvcHMgPSBjbGFzc1RvTWl4Ll9fcHJvcHNfXztcbiAgICBpZiAocHJvcHMpIHtcbiAgICAgICAgZm9yICh2YXIgcCA9IDA7IHAgPCBwcm9wcy5sZW5ndGg7IHArKykge1xuICAgICAgICAgICAgdmFyIHByb3BOYW1lID0gcHJvcHNbcF07XG4gICAgICAgICAgICB2YXIgYXR0cnMgPSBGaXJlLmF0dHIoY2xhc3NUb01peCwgcHJvcE5hbWUpO1xuICAgICAgICAgICAgLy8gYXNzdW1lIGFsbCBwcm9wIGluIF9fcHJvcHNfXyBtdXN0IGhhdmUgYXR0clxuICAgICAgICAgICAgdmFyIHNhdmVVcmxBc0Fzc2V0ID0gYXR0cnMuc2F2ZVVybEFzQXNzZXQ7XG4gICAgICAgICAgICBpZiAoYXR0cnMuc2VyaWFsaXphYmxlID09PSBmYWxzZSAmJiAhc2F2ZVVybEFzQXNzZXQpIHtcbiAgICAgICAgICAgICAgICBjb250aW51ZTsgICAvLyBza2lwIG5vblNlcmlhbGl6ZWRcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghRklSRV9FRElUT1IgJiYgYXR0cnMuZWRpdG9yT25seSkge1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlOyAgIC8vIHNraXAgZWRpdG9yIG9ubHkgaWYgbm90IGVkaXRvclxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIHByb3AgPSBkYXRhW3Byb3BOYW1lXTtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgcHJvcCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICBpZiAoc2F2ZVVybEFzQXNzZXQpIHtcbiAgICAgICAgICAgICAgICAgICAgcHJvcE5hbWUgPSBcIl9zZXQkXCIgKyBwcm9wTmFtZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGFyZ2V0W3Byb3BOYW1lXSA9IHByb3A7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy9pZiAocHJvcHNbcHJvcHMubGVuZ3RoIC0gMV0gPT09ICdfJGVyaWFsaXplZCcpIHtcbiAgICAgICAgLy8gICAgLy8gc2F2ZSBvcmlnaW5hbCBzZXJpYWxpemVkIGRhdGFcbiAgICAgICAgLy8gICAgdGFyZ2V0Ll8kZXJpYWxpemVkID0gZGF0YTtcbiAgICAgICAgLy99XG4gICAgfVxufTtcbiIsIlxuLy8gZW51bVxuXG4vKipcbiAqIERlZmluZSBhbiBlbnVtIHR5cGUuIElmIGEgZW51bSBpdGVtIGhhcyBhIHZhbHVlIG9mIC0xLCBpdCB3aWxsIGJlIGdpdmVuIGFuIEludGVnZXIgbnVtYmVyIGFjY29yZGluZyB0byBpdCdzIG9yZGVyIGluIHRoZSBsaXN0LiBPdGhlcndpc2UgaXQgd2lsbCB1c2UgdGhlIHZhbHVlIHNwZWNpZmllZCBieSB1c2VyIHdobyB3cml0ZXMgdGhlIGVudW0gZGVmaW5pdGlvbi5cbiAqIEBtZXRob2QgZGVmaW5lRW51bVxuICogQHBhcmFtIHtvYmplY3R9IG9iaiAtIGEgSmF2YVNjcmlwdCBsaXRlcmFsIG9iamVjdCBjb250YWluaW5nIGVudW0gbmFtZXMgYW5kIHZhbHVlc1xuICogQHJldHVybiB7b2JqZWN0fSB0aGUgZGVmaW5lZCBlbnVtIHR5cGVcbiAqXG4gKiBAZXhhbXBsZVxuIFRleHR1cmUuV3JhcE1vZGUgPSBGaXJlLmRlZmluZUVudW0oe1xuICAgIFJlcGVhdDogLTEsXG4gICAgQ2xhbXA6IC0xXG59KTtcbiAvLyBUZXh0dXJlLldyYXBNb2RlLlJlcGVhdCA9PSAwXG4gLy8gVGV4dHVyZS5XcmFwTW9kZS5DbGFtcCA9PSAxXG4gLy8gVGV4dHVyZS5XcmFwTW9kZVswXSA9PSBcIlJlcGVhdFwiXG4gLy8gVGV4dHVyZS5XcmFwTW9kZVsxXSA9PSBcIkNsYW1wXCJcblxuIHZhciBGbGFnVHlwZSA9IEZpcmUuZGVmaW5lRW51bSh7XG4gICAgRmxhZzE6IDEsXG4gICAgRmxhZzI6IDIsXG4gICAgRmxhZzM6IDQsXG4gICAgRmxhZzQ6IDgsXG59KTtcbiB2YXIgQXRsYXNTaXplTGlzdCA9IEZpcmUuZGVmaW5lRW51bSh7XG4gICAgMTI4OiAxMjgsXG4gICAgMjU2OiAyNTYsXG4gICAgNTEyOiA1MTIsXG4gICAgMTAyNDogMTAyNCxcbn0pO1xuICovXG5GaXJlLmRlZmluZUVudW0gPSBmdW5jdGlvbiAob2JqKSB7XG4gICAgdmFyIGVudW1UeXBlID0ge307XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGVudW1UeXBlLCAnX19lbnVtc19fJywge1xuICAgICAgICB2YWx1ZTogdW5kZWZpbmVkLFxuICAgICAgICB3cml0YWJsZTogdHJ1ZVxuICAgIH0pO1xuXG4gICAgdmFyIGxhc3RJbmRleCA9IC0xO1xuICAgIGZvciAodmFyIGtleSBpbiBvYmopIHtcbiAgICAgICAgdmFyIHZhbCA9IG9ialtrZXldO1xuICAgICAgICBpZiAodmFsID09PSAtMSkge1xuICAgICAgICAgICAgdmFsID0gKytsYXN0SW5kZXg7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBsYXN0SW5kZXggPSB2YWw7XG4gICAgICAgIH1cbiAgICAgICAgZW51bVR5cGVba2V5XSA9IHZhbDtcblxuICAgICAgICB2YXIgcmV2ZXJzZUtleSA9ICcnICsgdmFsO1xuICAgICAgICBpZiAoa2V5ICE9PSByZXZlcnNlS2V5KSB7XG4gICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZW51bVR5cGUsIHJldmVyc2VLZXksIHtcbiAgICAgICAgICAgICAgICB2YWx1ZToga2V5LFxuICAgICAgICAgICAgICAgIGVudW1lcmFibGU6IGZhbHNlXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZW51bVR5cGU7XG59O1xuXG5GaXJlLmlzRW51bVR5cGUgPSBmdW5jdGlvbiAoZW51bVR5cGUpIHtcbiAgICByZXR1cm4gZW51bVR5cGUgJiYgZW51bVR5cGUuaGFzT3duUHJvcGVydHkoJ19fZW51bXNfXycpO1xufTtcblxuaWYgKEZJUkVfREVWKSB7XG4gICAgLy8gY2hlY2sga2V5IG9yZGVyIGluIG9iamVjdCBsaXRlcmFsXG4gICAgdmFyIF9UZXN0RW51bSA9IEZpcmUuZGVmaW5lRW51bSh7XG4gICAgICAgIFpFUk86IC0xLFxuICAgICAgICBPTkU6IC0xLFxuICAgICAgICBUV086IC0xLFxuICAgICAgICBUSFJFRTogLTFcbiAgICB9KTtcbiAgICBpZiAoX1Rlc3RFbnVtLlpFUk8gIT09IDAgfHwgX1Rlc3RFbnVtLk9ORSAhPT0gMSB8fCBfVGVzdEVudW0uVFdPICE9PSAyIHx8IF9UZXN0RW51bS5USFJFRSAhPT0gMykge1xuICAgICAgICBGaXJlLmVycm9yKCdTb3JyeSwgXCJGaXJlLmRlZmluZUVudW1cIiBub3QgYXZhaWxhYmxlIG9uIHRoaXMgcGxhdGZvcm0sICcgK1xuICAgICAgICAgICAgICAgICAgICdwbGVhc2UgcmVwb3J0IHRoaXMgZXJyb3IgaGVyZTogaHR0cHM6Ly9naXRodWIuY29tL2ZpcmViYWxsLXgvZmlyZWJhbGwvaXNzdWVzL25ldyAhJyk7XG4gICAgfVxufVxuIiwidmFyIEpTID0gcmVxdWlyZSgnLi4vanMnKTtcbnZhciBDYWxsYmFja3NIYW5kbGVyID0gcmVxdWlyZSgnLi4vY2FsbGJhY2tzLWludm9rZXInKS5DYWxsYmFja3NIYW5kbGVyO1xuXG4vLyBFeHRlbmRzIEZpcmUuX0NhbGxiYWNrc0hhbmRsZXIgdG8gaGFuZGxlIGFuZCBpbnZva2UgZXZlbnQgY2FsbGJhY2tzLlxuZnVuY3Rpb24gRXZlbnRMaXN0ZW5lcnMgKCkge1xuICAgIENhbGxiYWNrc0hhbmRsZXIuY2FsbCh0aGlzKTtcbn1cbkpTLmV4dGVuZChFdmVudExpc3RlbmVycywgQ2FsbGJhY2tzSGFuZGxlcik7XG5cbkV2ZW50TGlzdGVuZXJzLnByb3RvdHlwZS5pbnZva2UgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICB2YXIgbGlzdCA9IHRoaXMuX2NhbGxiYWNrVGFibGVbZXZlbnQudHlwZV07XG4gICAgaWYgKGxpc3QgJiYgbGlzdC5sZW5ndGggPiAwKSB7XG4gICAgICAgIGlmIChsaXN0Lmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgICAgbGlzdFswXS5jYWxsKGV2ZW50LmN1cnJlbnRUYXJnZXQsIGV2ZW50KTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB2YXIgZW5kSW5kZXggPSBsaXN0Lmxlbmd0aCAtIDE7XG4gICAgICAgIHZhciBsYXN0RnVuYyA9IGxpc3RbZW5kSW5kZXhdO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8PSBlbmRJbmRleDsgKytpKSB7XG4gICAgICAgICAgICB2YXIgY2FsbGluZ0Z1bmMgPSBsaXN0W2ldO1xuICAgICAgICAgICAgY2FsbGluZ0Z1bmMuY2FsbChldmVudC5jdXJyZW50VGFyZ2V0LCBldmVudCk7XG4gICAgICAgICAgICBpZiAoZXZlbnQuX3Byb3BhZ2F0aW9uSW1tZWRpYXRlU3RvcHBlZCB8fCBpID09PSBlbmRJbmRleCkge1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8g5Li65LqG5LiN5q+P5qyh6Kem5Y+R5raI5oGv5pe26YO95Yib5bu65LiA5Lu95Zue6LCD5pWw57uE55qE5ou36LSd77yM6L+Z6YeM6ZyA6KaB5a+55raI5oGv55qE5Y+N5rOo5YaM5YGa5qOA5p+l5ZKM6ZmQ5Yi2XG4gICAgICAgICAgICAvLyBjaGVjayBsYXN0IG9uZSB0byBzZWUgaWYgYW55IG9uZSByZW1vdmVkXG4gICAgICAgICAgICBpZiAobGlzdFtlbmRJbmRleF0gIT09IGxhc3RGdW5jKSB7ICAgICAgICAgIC8vIOWmguaenOWPmOefrVxuICAgICAgICAgICAgICAgIGlmIChsaXN0W2VuZEluZGV4IC0gMV0gPT09IGxhc3RGdW5jKSB7ICAvLyDlj6rmlK/mjIHliKDkuIDkuKpcbiAgICAgICAgICAgICAgICAgICAgaWYgKGxpc3RbaV0gIT09IGNhbGxpbmdGdW5jKSB7ICAgICAgLy8g5aaC5p6c5Yig5LqG5YmN6Z2i55qE5Zue6LCD77yM57Si5byV5LiN5Y+YXG4gICAgICAgICAgICAgICAgICAgICAgICAtLWk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgLS1lbmRJbmRleDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIOWPquWFgeiuuOWcqOS4gOS4quWbnuiwg+mHjOmdouenu+mZpOS4gOS4quWbnuiwg+OAguWmguaenOimgeenu+mZpOW+iOWkmu+8jOWPquiDveeUqCBldmVudC5zdG9wKHRydWUpXG4gICAgICAgICAgICAgICAgICAgIEZpcmUuZXJyb3IoJ0NhbGwgZXZlbnQuc3RvcCh0cnVlKSB3aGVuIHlvdSByZW1vdmUgbW9yZSB0aGFuIG9uZSBjYWxsYmFja3MgaW4gYSBldmVudCBjYWxsYmFjay4nKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gRXZlbnRMaXN0ZW5lcnM7XG4iLCJ2YXIgRXZlbnRMaXN0ZW5lcnMgPSByZXF1aXJlKCcuL2V2ZW50LWxpc3RlbmVycycpO1xudmFyIEV2ZW50ID0gcmVxdWlyZSgnLi9ldmVudCcpO1xudmFyIEN1c3RvbUV2ZW50ID0gRXZlbnQuQ3VzdG9tRXZlbnQ7XG52YXIgRk9iamVjdCA9IHJlcXVpcmUoJy4uL2ZvYmplY3QnKTtcbnZhciBKUyA9IHJlcXVpcmUoJy4uL2pzJyk7XG5cbi8qKlxuICogRXZlbnRUYXJnZXQgaXMgYW4gb2JqZWN0IHRvIHdoaWNoIGFuIGV2ZW50IGlzIGRpc3BhdGNoZWQgd2hlbiBzb21ldGhpbmcgaGFzIG9jY3VycmVkLlxuICogRW50aXR5IGFyZSB0aGUgbW9zdCBjb21tb24gZXZlbnQgdGFyZ2V0cywgYnV0IG90aGVyIG9iamVjdHMgY2FuIGJlIGV2ZW50IHRhcmdldHMgdG9vLlxuICpcbiAqIEV2ZW50IHRhcmdldHMgYXJlIGFuIGltcG9ydGFudCBwYXJ0IG9mIHRoZSBGaXJlYmFsbCBldmVudCBtb2RlbC5cbiAqIFRoZSBldmVudCB0YXJnZXQgc2VydmVzIGFzIHRoZSBmb2NhbCBwb2ludCBmb3IgaG93IGV2ZW50cyBmbG93IHRocm91Z2ggdGhlIHNjZW5lIGdyYXBoLlxuICogV2hlbiBhbiBldmVudCBzdWNoIGFzIGEgbW91c2UgY2xpY2sgb3IgYSBrZXlwcmVzcyBvY2N1cnMsIEZpcmViYWxsIGRpc3BhdGNoZXMgYW4gZXZlbnQgb2JqZWN0XG4gKiBpbnRvIHRoZSBldmVudCBmbG93IGZyb20gdGhlIHJvb3Qgb2YgdGhlIGhpZXJhcmNoeS4gVGhlIGV2ZW50IG9iamVjdCB0aGVuIG1ha2VzIGl0cyB3YXkgdGhyb3VnaFxuICogdGhlIHNjZW5lIGdyYXBoIHVudGlsIGl0IHJlYWNoZXMgdGhlIGV2ZW50IHRhcmdldCwgYXQgd2hpY2ggcG9pbnQgaXQgYmVnaW5zIGl0cyByZXR1cm4gdHJpcCB0aHJvdWdoXG4gKiB0aGUgc2NlbmUgZ3JhcGguIFRoaXMgcm91bmQtdHJpcCBqb3VybmV5IHRvIHRoZSBldmVudCB0YXJnZXQgaXMgY29uY2VwdHVhbGx5IGRpdmlkZWQgaW50byB0aHJlZSBwaGFzZXM6XG4gKiAtIFRoZSBjYXB0dXJlIHBoYXNlIGNvbXByaXNlcyB0aGUgam91cm5leSBmcm9tIHRoZSByb290IHRvIHRoZSBsYXN0IG5vZGUgYmVmb3JlIHRoZSBldmVudCB0YXJnZXQncyBub2RlXG4gKiAtIFRoZSB0YXJnZXQgcGhhc2UgY29tcHJpc2VzIG9ubHkgdGhlIGV2ZW50IHRhcmdldCBub2RlXG4gKiAtIFRoZSBidWJibGluZyBwaGFzZSBjb21wcmlzZXMgYW55IHN1YnNlcXVlbnQgbm9kZXMgZW5jb3VudGVyZWQgb24gdGhlIHJldHVybiB0cmlwIHRvIHRoZSByb290IG9mIHRoZSB0cmVlXG4gKiBTZWUgYWxzbzogaHR0cDovL3d3dy53My5vcmcvVFIvRE9NLUxldmVsLTMtRXZlbnRzLyNldmVudC1mbG93XG4gKlxuICogRXZlbnQgdGFyZ2V0cyBjYW4gaW1wbGVtZW50IHRoZSBmb2xsb3dpbmcgbWV0aG9kczpcbiAqICAtIF9nZXRDYXB0dXJpbmdUYXJnZXRzXG4gKiAgLSBfZ2V0QnViYmxpbmdUYXJnZXRzXG4gKlxuICogQGNsYXNzIEV2ZW50VGFyZ2V0XG4gKiBAY29uc3RydWN0b3JcbiAqL1xuZnVuY3Rpb24gRXZlbnRUYXJnZXQoKSB7XG4gICAgLy9IYXNoT2JqZWN0LmNhbGwodGhpcyk7XG4gICAgRk9iamVjdC5jYWxsKHRoaXMpO1xuXG4gICAgLyoqXG4gICAgICogQHByb3BlcnR5IF9jYXB0dXJpbmdMaXN0ZW5lcnNcbiAgICAgKiBAdHlwZSB7RXZlbnRMaXN0ZW5lcnN9XG4gICAgICogQGRlZmF1bHQgbnVsbFxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgdGhpcy5fY2FwdHVyaW5nTGlzdGVuZXJzID0gbnVsbDtcblxuICAgIC8qKlxuICAgICAqIEBwcm9wZXJ0eSBfYnViYmxpbmdMaXN0ZW5lcnNcbiAgICAgKiBAdHlwZSB7RXZlbnRMaXN0ZW5lcnN9XG4gICAgICogQGRlZmF1bHQgbnVsbFxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgdGhpcy5fYnViYmxpbmdMaXN0ZW5lcnMgPSBudWxsO1xufVxuSlMuZXh0ZW5kKEV2ZW50VGFyZ2V0LCBGT2JqZWN0LypIYXNoT2JqZWN0Ki8pO1xuXG4vKipcbiAqIFJlZ2lzdGVyIGFuIGNhbGxiYWNrIG9mIGEgc3BlY2lmaWMgZXZlbnQgdHlwZSBvbiB0aGUgRXZlbnRUYXJnZXQuXG4gKiBUaGlzIG1ldGhvZCBpcyBtZXJlbHkgYW4gYWxpYXMgdG8gYWRkRXZlbnRMaXN0ZW5lci5cbiAqXG4gKiBAbWV0aG9kIG9uXG4gKiBAcGFyYW0ge3N0cmluZ30gdHlwZSAtIEEgc3RyaW5nIHJlcHJlc2VudGluZyB0aGUgZXZlbnQgdHlwZSB0byBsaXN0ZW4gZm9yLlxuICogQHBhcmFtIHtmdW5jdGlvbn0gY2FsbGJhY2sgLSBUaGUgY2FsbGJhY2sgdGhhdCB3aWxsIGJlIGludm9rZWQgd2hlbiB0aGUgZXZlbnQgaXMgZGlzcGF0Y2hlZC5cbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgVGhlIGNhbGxiYWNrIGlzIGlnbm9yZWQgaWYgaXQgaXMgYSBkdXBsaWNhdGUgKHRoZSBjYWxsYmFja3MgYXJlIHVuaXF1ZSkuXG4gKiBAcGFyYW0ge0V2ZW50fSBjYWxsYmFjay5wYXJhbSBldmVudFxuICogQHBhcmFtIHtCb29sZWFufSBbdXNlQ2FwdHVyZT1mYWxzZV0gLSBXaGVuIHNldCB0byB0cnVlLCB0aGUgY2FwdHVyZSBhcmd1bWVudCBwcmV2ZW50cyBjYWxsYmFja1xuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmcm9tIGJlaW5nIGludm9rZWQgd2hlbiB0aGUgZXZlbnQncyBldmVudFBoYXNlIGF0dHJpYnV0ZSB2YWx1ZSBpcyBCVUJCTElOR19QSEFTRS5cbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgV2hlbiBmYWxzZSwgY2FsbGJhY2sgd2lsbCBOT1QgYmUgaW52b2tlZCB3aGVuIGV2ZW50J3MgZXZlbnRQaGFzZSBhdHRyaWJ1dGUgdmFsdWUgaXMgQ0FQVFVSSU5HX1BIQVNFLlxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICBFaXRoZXIgd2F5LCBjYWxsYmFjayB3aWxsIGJlIGludm9rZWQgd2hlbiBldmVudCdzIGV2ZW50UGhhc2UgYXR0cmlidXRlIHZhbHVlIGlzIEFUX1RBUkdFVC5cbiAqL1xuRXZlbnRUYXJnZXQucHJvdG90eXBlLm9uID0gZnVuY3Rpb24gKHR5cGUsIGNhbGxiYWNrLCB1c2VDYXB0dXJlKSB7XG4gICAgdXNlQ2FwdHVyZSA9IHR5cGVvZiB1c2VDYXB0dXJlICE9PSBcInVuZGVmaW5lZFwiID8gdXNlQ2FwdHVyZSA6IGZhbHNlO1xuICAgIGlmICghY2FsbGJhY2spIHtcbiAgICAgICAgRmlyZS5lcnJvcignQ2FsbGJhY2sgb2YgZXZlbnQgbXVzdCBiZSBub24tbmlsJyk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIGxpc3RlbmVycyA9IG51bGw7XG4gICAgaWYgKHVzZUNhcHR1cmUpIHtcbiAgICAgICAgbGlzdGVuZXJzID0gdGhpcy5fY2FwdHVyaW5nTGlzdGVuZXJzID0gdGhpcy5fY2FwdHVyaW5nTGlzdGVuZXJzIHx8IG5ldyBFdmVudExpc3RlbmVycygpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgbGlzdGVuZXJzID0gdGhpcy5fYnViYmxpbmdMaXN0ZW5lcnMgPSB0aGlzLl9idWJibGluZ0xpc3RlbmVycyB8fCBuZXcgRXZlbnRMaXN0ZW5lcnMoKTtcbiAgICB9XG4gICAgaWYgKCAhIGxpc3RlbmVycy5oYXModHlwZSwgY2FsbGJhY2spICkge1xuICAgICAgICBsaXN0ZW5lcnMuYWRkKHR5cGUsIGNhbGxiYWNrKTtcbiAgICB9XG59O1xuXG4vKipcbiAqIFJlbW92ZXMgdGhlIGNhbGxiYWNrIHByZXZpb3VzbHkgcmVnaXN0ZXJlZCB3aXRoIHRoZSBzYW1lIHR5cGUsIGNhbGxiYWNrLCBhbmQgY2FwdHVyZS5cbiAqIFRoaXMgbWV0aG9kIGlzIG1lcmVseSBhbiBhbGlhcyB0byByZW1vdmVFdmVudExpc3RlbmVyLlxuICpcbiAqIEBtZXRob2Qgb2ZmXG4gKiBAcGFyYW0ge3N0cmluZ30gdHlwZSAtIEEgc3RyaW5nIHJlcHJlc2VudGluZyB0aGUgZXZlbnQgdHlwZSBiZWluZyByZW1vdmVkLlxuICogQHBhcmFtIHtmdW5jdGlvbn0gY2FsbGJhY2sgLSBUaGUgY2FsbGJhY2sgdG8gcmVtb3ZlLlxuICogQHBhcmFtIHtCb29sZWFufSBbdXNlQ2FwdHVyZT1mYWxzZV0gLSBTcGVjaWZpZXMgd2hldGhlciB0aGUgY2FsbGJhY2sgYmVpbmcgcmVtb3ZlZCB3YXMgcmVnaXN0ZXJlZCBhcyBhIGNhcHR1cmluZyBjYWxsYmFjayBvciBub3QuXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIElmIG5vdCBzcGVjaWZpZWQsIHVzZUNhcHR1cmUgZGVmYXVsdHMgdG8gZmFsc2UuIElmIGEgY2FsbGJhY2sgd2FzIHJlZ2lzdGVyZWQgdHdpY2UsXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uZSB3aXRoIGNhcHR1cmUgYW5kIG9uZSB3aXRob3V0LCBlYWNoIG11c3QgYmUgcmVtb3ZlZCBzZXBhcmF0ZWx5LiBSZW1vdmFsIG9mIGEgY2FwdHVyaW5nIGNhbGxiYWNrXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRvZXMgbm90IGFmZmVjdCBhIG5vbi1jYXB0dXJpbmcgdmVyc2lvbiBvZiB0aGUgc2FtZSBsaXN0ZW5lciwgYW5kIHZpY2UgdmVyc2EuXG4gKi9cbkV2ZW50VGFyZ2V0LnByb3RvdHlwZS5vZmYgPSBmdW5jdGlvbiAodHlwZSwgY2FsbGJhY2ssIHVzZUNhcHR1cmUpIHtcbiAgICB1c2VDYXB0dXJlID0gdHlwZW9mIHVzZUNhcHR1cmUgIT09IFwidW5kZWZpbmVkXCIgPyB1c2VDYXB0dXJlIDogZmFsc2U7XG4gICAgaWYgKCFjYWxsYmFjaykge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciBsaXN0ZW5lcnMgPSB1c2VDYXB0dXJlID8gdGhpcy5fY2FwdHVyaW5nTGlzdGVuZXJzIDogdGhpcy5fYnViYmxpbmdMaXN0ZW5lcnM7XG4gICAgaWYgKGxpc3RlbmVycykge1xuICAgICAgICBsaXN0ZW5lcnMucmVtb3ZlKHR5cGUsIGNhbGxiYWNrKTtcbiAgICB9XG59O1xuXG4vKipcbiAqIFJlZ2lzdGVyIGFuIGNhbGxiYWNrIG9mIGEgc3BlY2lmaWMgZXZlbnQgdHlwZSBvbiB0aGUgRXZlbnRUYXJnZXQsIHRoZSBjYWxsYmFjayB3aWxsIHJlbW92ZSBpdHNlbGYgYWZ0ZXIgdGhlIGZpcnN0IHRpbWUgaXQgaXMgdHJpZ2dlcmVkLlxuICpcbiAqIEBtZXRob2Qgb25jZVxuICogQHBhcmFtIHtzdHJpbmd9IHR5cGUgLSBBIHN0cmluZyByZXByZXNlbnRpbmcgdGhlIGV2ZW50IHR5cGUgdG8gbGlzdGVuIGZvci5cbiAqIEBwYXJhbSB7ZnVuY3Rpb259IGNhbGxiYWNrIC0gVGhlIGNhbGxiYWNrIHRoYXQgd2lsbCBiZSBpbnZva2VkIHdoZW4gdGhlIGV2ZW50IGlzIGRpc3BhdGNoZWQuXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFRoZSBjYWxsYmFjayBpcyBpZ25vcmVkIGlmIGl0IGlzIGEgZHVwbGljYXRlICh0aGUgY2FsbGJhY2tzIGFyZSB1bmlxdWUpLlxuICogQHBhcmFtIHtFdmVudH0gY2FsbGJhY2sucGFyYW0gZXZlbnRcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gW3VzZUNhcHR1cmU9ZmFsc2VdIC0gV2hlbiBzZXQgdG8gdHJ1ZSwgdGhlIGNhcHR1cmUgYXJndW1lbnQgcHJldmVudHMgY2FsbGJhY2tcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZnJvbSBiZWluZyBpbnZva2VkIHdoZW4gdGhlIGV2ZW50J3MgZXZlbnRQaGFzZSBhdHRyaWJ1dGUgdmFsdWUgaXMgQlVCQkxJTkdfUEhBU0UuXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFdoZW4gZmFsc2UsIGNhbGxiYWNrIHdpbGwgTk9UIGJlIGludm9rZWQgd2hlbiBldmVudCdzIGV2ZW50UGhhc2UgYXR0cmlidXRlIHZhbHVlIGlzIENBUFRVUklOR19QSEFTRS5cbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgRWl0aGVyIHdheSwgY2FsbGJhY2sgd2lsbCBiZSBpbnZva2VkIHdoZW4gZXZlbnQncyBldmVudFBoYXNlIGF0dHJpYnV0ZSB2YWx1ZSBpcyBBVF9UQVJHRVQuXG4gKi9cbkV2ZW50VGFyZ2V0LnByb3RvdHlwZS5vbmNlID0gZnVuY3Rpb24gKHR5cGUsIGNhbGxiYWNrLCB1c2VDYXB0dXJlKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIHZhciBjYiA9IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICBzZWxmLm9mZih0eXBlLCBjYiwgdXNlQ2FwdHVyZSk7XG4gICAgICAgIGNhbGxiYWNrKGV2ZW50KTtcbiAgICB9O1xuICAgIHRoaXMub24odHlwZSwgY2IsIHVzZUNhcHR1cmUpO1xufTtcblxuLy8vKipcbi8vICogQ2hlY2tzIHdoZXRoZXIgdGhlIEV2ZW50VGFyZ2V0IG9iamVjdCBoYXMgYW55IGNhbGxiYWNrIHJlZ2lzdGVyZWQgZm9yIGEgc3BlY2lmaWMgdHlwZSBvZiBldmVudC5cbi8vICpcbi8vICogQHBhcmFtIHtzdHJpbmd9IHR5cGUgLSBUaGUgdHlwZSBvZiBldmVudC5cbi8vICogQHBhcmFtIHtCb29sZWFufSBBIHZhbHVlIG9mIHRydWUgaWYgYSBjYWxsYmFjayBvZiB0aGUgc3BlY2lmaWVkIHR5cGUgaXMgcmVnaXN0ZXJlZDsgZmFsc2Ugb3RoZXJ3aXNlLlxuLy8gKi9cbi8vRXZlbnRUYXJnZXQucHJvdG90eXBlLmhhc0V2ZW50TGlzdGVuZXIgPSBmdW5jdGlvbiAodHlwZSkge307XG5cbnZhciBjYWNoZWRBcnJheSA9IG5ldyBBcnJheSgxNik7XG5jYWNoZWRBcnJheS5sZW5ndGggPSAwO1xuXG5FdmVudFRhcmdldC5wcm90b3R5cGUuX2RvRGlzcGF0Y2hFdmVudCA9IGZ1bmN0aW9uIChldmVudCkge1xuICAgIGV2ZW50LnRhcmdldCA9IHRoaXM7XG5cbiAgICAvLyBFdmVudC5DQVBUVVJJTkdfUEhBU0VcbiAgICB0aGlzLl9nZXRDYXB0dXJpbmdUYXJnZXRzKGV2ZW50LnR5cGUsIGNhY2hlZEFycmF5KTtcbiAgICAvLyBwcm9wYWdhdGVcbiAgICBldmVudC5ldmVudFBoYXNlID0gMTtcbiAgICB2YXIgdGFyZ2V0LCBpO1xuICAgIGZvciAoaSA9IGNhY2hlZEFycmF5Lmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgIHRhcmdldCA9IGNhY2hlZEFycmF5W2ldO1xuICAgICAgICBpZiAodGFyZ2V0LmlzVmFsaWQgJiYgdGFyZ2V0Ll9jYXB0dXJpbmdMaXN0ZW5lcnMpIHtcbiAgICAgICAgICAgIGV2ZW50LmN1cnJlbnRUYXJnZXQgPSB0YXJnZXQ7XG4gICAgICAgICAgICAvLyBmaXJlIGV2ZW50XG4gICAgICAgICAgICB0YXJnZXQuX2NhcHR1cmluZ0xpc3RlbmVycy5pbnZva2UoZXZlbnQpO1xuICAgICAgICAgICAgLy8gY2hlY2sgaWYgcHJvcGFnYXRpb24gc3RvcHBlZFxuICAgICAgICAgICAgaWYgKGV2ZW50Ll9wcm9wYWdhdGlvblN0b3BwZWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgY2FjaGVkQXJyYXkubGVuZ3RoID0gMDtcblxuICAgIC8vIEV2ZW50LkFUX1RBUkdFVFxuICAgIC8vIGNoZWNrcyBpZiBkZXN0cm95ZWQgaW4gY2FwdHVyaW5nIGNhbGxiYWNrc1xuICAgIGlmICh0aGlzLmlzVmFsaWQpIHtcbiAgICAgICAgdGhpcy5fZG9TZW5kRXZlbnQoZXZlbnQpO1xuICAgICAgICBpZiAoZXZlbnQuX3Byb3BhZ2F0aW9uU3RvcHBlZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGV2ZW50LmJ1YmJsZXMpIHtcbiAgICAgICAgLy8gRXZlbnQuQlVCQkxJTkdfUEhBU0VcbiAgICAgICAgdGhpcy5fZ2V0QnViYmxpbmdUYXJnZXRzKGV2ZW50LnR5cGUsIGNhY2hlZEFycmF5KTtcbiAgICAgICAgLy8gcHJvcGFnYXRlXG4gICAgICAgIGV2ZW50LmV2ZW50UGhhc2UgPSAzO1xuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgY2FjaGVkQXJyYXkubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgIHRhcmdldCA9IGNhY2hlZEFycmF5W2ldO1xuICAgICAgICAgICAgaWYgKHRhcmdldC5pc1ZhbGlkICYmIHRhcmdldC5fYnViYmxpbmdMaXN0ZW5lcnMpIHtcbiAgICAgICAgICAgICAgICBldmVudC5jdXJyZW50VGFyZ2V0ID0gdGFyZ2V0O1xuICAgICAgICAgICAgICAgIC8vIGZpcmUgZXZlbnRcbiAgICAgICAgICAgICAgICB0YXJnZXQuX2J1YmJsaW5nTGlzdGVuZXJzLmludm9rZShldmVudCk7XG4gICAgICAgICAgICAgICAgLy8gY2hlY2sgaWYgcHJvcGFnYXRpb24gc3RvcHBlZFxuICAgICAgICAgICAgICAgIGlmIChldmVudC5fcHJvcGFnYXRpb25TdG9wcGVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59O1xuXG4vKipcbiAqIERpc3BhdGNoZXMgYW4gZXZlbnQgaW50byB0aGUgZXZlbnQgZmxvdy4gVGhlIGV2ZW50IHRhcmdldCBpcyB0aGUgRXZlbnRUYXJnZXQgb2JqZWN0IHVwb24gd2hpY2ggdGhlIGRpc3BhdGNoRXZlbnQoKSBtZXRob2QgaXMgY2FsbGVkLlxuICpcbiAqIEBtZXRob2QgZGlzcGF0Y2hFdmVudFxuICogQHBhcmFtIHtFdmVudH0gZXZlbnQgLSBUaGUgRXZlbnQgb2JqZWN0IHRoYXQgaXMgZGlzcGF0Y2hlZCBpbnRvIHRoZSBldmVudCBmbG93XG4gKiBAcmV0dXJuIHtCb29sZWFufSAtIHJldHVybnMgdHJ1ZSBpZiBlaXRoZXIgdGhlIGV2ZW50J3MgcHJldmVudERlZmF1bHQoKSBtZXRob2Qgd2FzIG5vdCBpbnZva2VkLFxuICogICAgICAgICAgICAgICAgICAgICAgb3IgaXRzIGNhbmNlbGFibGUgYXR0cmlidXRlIHZhbHVlIGlzIGZhbHNlLCBhbmQgZmFsc2Ugb3RoZXJ3aXNlLlxuICovXG5FdmVudFRhcmdldC5wcm90b3R5cGUuZGlzcGF0Y2hFdmVudCA9IGZ1bmN0aW9uIChldmVudCkge1xuICAgIHRoaXMuX2RvRGlzcGF0Y2hFdmVudChldmVudCk7XG4gICAgY2FjaGVkQXJyYXkubGVuZ3RoID0gMDtcbiAgICB2YXIgbm90UHJldmVudGVkID0gISBldmVudC5fZGVmYXVsdFByZXZlbnRlZDtcbiAgICBldmVudC5fcmVzZXQoKTtcbiAgICByZXR1cm4gbm90UHJldmVudGVkO1xufTtcblxuLyoqXG4gKiBTZW5kIGFuIGV2ZW50IHRvIHRoaXMgb2JqZWN0IGRpcmVjdGx5LCB0aGlzIG1ldGhvZCB3aWxsIG5vdCBwcm9wYWdhdGUgdGhlIGV2ZW50IHRvIGFueSBvdGhlciBvYmplY3RzLlxuICpcbiAqIEBtZXRob2QgX2RvU2VuZEV2ZW50XG4gKiBAcGFyYW0ge0V2ZW50fSBldmVudCAtIFRoZSBFdmVudCBvYmplY3QgdGhhdCBpcyBzZW50IHRvIHRoaXMgZXZlbnQgdGFyZ2V0LlxuICogQHByaXZhdGVcbiAqL1xuRXZlbnRUYXJnZXQucHJvdG90eXBlLl9kb1NlbmRFdmVudCA9IGZ1bmN0aW9uIChldmVudCkge1xuICAgIC8vIEV2ZW50LkFUX1RBUkdFVFxuICAgIGV2ZW50LmV2ZW50UGhhc2UgPSAyO1xuICAgIGV2ZW50LmN1cnJlbnRUYXJnZXQgPSB0aGlzO1xuICAgIGlmICh0aGlzLl9jYXB0dXJpbmdMaXN0ZW5lcnMpIHtcbiAgICAgICAgdGhpcy5fY2FwdHVyaW5nTGlzdGVuZXJzLmludm9rZShldmVudCk7XG4gICAgICAgIGlmIChldmVudC5fcHJvcGFnYXRpb25TdG9wcGVkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYgKHRoaXMuX2J1YmJsaW5nTGlzdGVuZXJzKSB7XG4gICAgICAgIHRoaXMuX2J1YmJsaW5nTGlzdGVuZXJzLmludm9rZShldmVudCk7XG4gICAgfVxufTtcblxuLyoqXG4gKiBTZW5kIGFuIGV2ZW50IHRvIHRoaXMgb2JqZWN0IGRpcmVjdGx5LCB0aGlzIG1ldGhvZCB3aWxsIG5vdCBwcm9wYWdhdGUgdGhlIGV2ZW50IHRvIGFueSBvdGhlciBvYmplY3RzLlxuICogVGhlIGV2ZW50IHdpbGwgYmUgY3JlYXRlZCBmcm9tIHRoZSBzdXBwbGllZCBtZXNzYWdlLCB5b3UgY2FuIGdldCB0aGUgXCJkZXRhaWxcIiBhcmd1bWVudCBmcm9tIGV2ZW50LmRldGFpbC5cbiAqXG4gKiBAbWV0aG9kIGVtaXRcbiAqIEBwYXJhbSB7c3RyaW5nfSBtZXNzYWdlIC0gdGhlIG1lc3NhZ2UgdG8gc2VuZFxuICogQHBhcmFtIHthbnl9IFtkZXRhaWxdIC0gd2hhdGV2ZXIgYXJndW1lbnQgdGhlIG1lc3NhZ2UgbmVlZHNcbiAqL1xuRXZlbnRUYXJnZXQucHJvdG90eXBlLmVtaXQgPSBmdW5jdGlvbiAobWVzc2FnZSwgZGV0YWlsKSB7XG4gICAgaWYgKCB0eXBlb2YgbWVzc2FnZSA9PT0gJ3N0cmluZycgKSB7XG4gICAgICAgIHZhciBldmVudCA9IG5ldyBDdXN0b21FdmVudChtZXNzYWdlKTtcbiAgICAgICAgZXZlbnQuZGV0YWlsID0gZGV0YWlsO1xuICAgICAgICB0aGlzLl9kb1NlbmRFdmVudChldmVudCk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBGaXJlLmVycm9yKCdUaGUgbWVzc2FnZSBtdXN0IGJlIHByb3ZpZGVkJyk7XG4gICAgfVxufTtcblxuLy8vKipcbi8vICogU2VuZCBhbiBldmVudCB0byB0aGlzIG9iamVjdCBkaXJlY3RseSwgdGhpcyBtZXRob2Qgd2lsbCBub3QgcHJvcGFnYXRlIHRoZSBldmVudCB0byBhbnkgb3RoZXIgb2JqZWN0cy5cbi8vICpcbi8vICogQHBhcmFtIHtFdmVudH0gZXZlbnQgLSBUaGUgRXZlbnQgb2JqZWN0IHRoYXQgaXMgc2VudCB0byB0aGlzIGV2ZW50IHRhcmdldC5cbi8vICogQHJldHVybiB7Qm9vbGVhbn0gLSByZXR1cm5zIHRydWUgaWYgZWl0aGVyIHRoZSBldmVudCdzIHByZXZlbnREZWZhdWx0KCkgbWV0aG9kIHdhcyBub3QgaW52b2tlZCxcbi8vICogICAgICAgICAgICAgICAgICAgICAgb3IgaXRzIGNhbmNlbGFibGUgYXR0cmlidXRlIHZhbHVlIGlzIGZhbHNlLCBhbmQgZmFsc2Ugb3RoZXJ3aXNlLlxuLy8gKi9cbi8vRXZlbnRUYXJnZXQucHJvdG90eXBlLnNlbmRFdmVudCA9IGZ1bmN0aW9uIChldmVudCkge1xuLy8gICAgLy8gRXZlbnQuQVRfVEFSR0VUXG4vLyAgICBldmVudC5yZXNldCgpO1xuLy8gICAgZXZlbnQudGFyZ2V0ID0gdGhpcztcbi8vICAgIHRoaXMuX2RvU2VuZEV2ZW50KGV2ZW50KTtcbi8vICAgIHJldHVybiAhIGV2ZW50Ll9kZWZhdWx0UHJldmVudGVkO1xuLy99O1xuXG4vKipcbiAqIEdldCBhbGwgdGhlIHRhcmdldHMgbGlzdGVuaW5nIHRvIHRoZSBzdXBwbGllZCB0eXBlIG9mIGV2ZW50IGluIHRoZSB0YXJnZXQncyBjYXB0dXJpbmcgcGhhc2UuXG4gKiBUaGUgY2FwdHVyaW5nIHBoYXNlIGNvbXByaXNlcyB0aGUgam91cm5leSBmcm9tIHRoZSByb290IHRvIHRoZSBsYXN0IG5vZGUgQkVGT1JFIHRoZSBldmVudCB0YXJnZXQncyBub2RlLlxuICogVGhlIHJlc3VsdCBzaG91bGQgc2F2ZSBpbiB0aGUgYXJyYXkgcGFyYW1ldGVyLCBhbmQgTVVTVCBTT1JUIGZyb20gY2hpbGQgbm9kZXMgdG8gcGFyZW50IG5vZGVzLlxuICpcbiAqIFN1YmNsYXNzZXMgY2FuIG92ZXJyaWRlIHRoaXMgbWV0aG9kIHRvIG1ha2UgZXZlbnQgcHJvcGFnYWJsZS5cbiAqIEBtZXRob2QgX2dldENhcHR1cmluZ1RhcmdldHNcbiAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlIC0gdGhlIGV2ZW50IHR5cGVcbiAqIEBwYXJhbSB7YXJyYXl9IGFycmF5IC0gdGhlIGFycmF5IHRvIHJlY2VpdmUgdGFyZ2V0c1xuICogQGV4YW1wbGVcbiAqIFN1YmNsYXNzZXMgY2FuIG92ZXJyaWRlIHRoaXMgbWV0aG9kIHRvIG1ha2UgZXZlbnQgcHJvcGFnYWJsZVxuICogYGBganNcbiAqIGZvciAodmFyIHRhcmdldCA9IHRoaXMuX3BhcmVudDsgdGFyZ2V0OyB0YXJnZXQgPSB0YXJnZXQuX3BhcmVudCkge1xuICogICAgIGlmICh0YXJnZXQuX2NhcHR1cmluZ0xpc3RlbmVycyAmJiB0YXJnZXQuX2NhcHR1cmluZ0xpc3RlbmVycy5oYXModHlwZSkpIHtcbiAqICAgICAgICAgYXJyYXkucHVzaCh0YXJnZXQpO1xuICogICAgIH1cbiAqIH1cbiAqIGBgYFxuICovXG5FdmVudFRhcmdldC5wcm90b3R5cGUuX2dldENhcHR1cmluZ1RhcmdldHMgPSBmdW5jdGlvbiAodHlwZSwgYXJyYXkpIHtcblxufTtcblxuLyoqXG4gKiBHZXQgYWxsIHRoZSB0YXJnZXRzIGxpc3RlbmluZyB0byB0aGUgc3VwcGxpZWQgdHlwZSBvZiBldmVudCBpbiB0aGUgdGFyZ2V0J3MgYnViYmxpbmcgcGhhc2UuXG4gKiBUaGUgYnViYmxpbmcgcGhhc2UgY29tcHJpc2VzIGFueSBTVUJTRVFVRU5UIG5vZGVzIGVuY291bnRlcmVkIG9uIHRoZSByZXR1cm4gdHJpcCB0byB0aGUgcm9vdCBvZiB0aGUgdHJlZS5cbiAqIFRoZSByZXN1bHQgc2hvdWxkIHNhdmUgaW4gdGhlIGFycmF5IHBhcmFtZXRlciwgYW5kIE1VU1QgU09SVCBmcm9tIGNoaWxkIG5vZGVzIHRvIHBhcmVudCBub2Rlcy5cbiAqXG4gKiBTdWJjbGFzc2VzIGNhbiBvdmVycmlkZSB0aGlzIG1ldGhvZCB0byBtYWtlIGV2ZW50IHByb3BhZ2FibGUuXG4gKiBAbWV0aG9kIF9nZXRCdWJibGluZ1RhcmdldHNcbiAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlIC0gdGhlIGV2ZW50IHR5cGVcbiAqIEBwYXJhbSB7YXJyYXl9IGFycmF5IC0gdGhlIGFycmF5IHRvIHJlY2VpdmUgdGFyZ2V0c1xuICovXG5FdmVudFRhcmdldC5wcm90b3R5cGUuX2dldEJ1YmJsaW5nVGFyZ2V0cyA9IGZ1bmN0aW9uICh0eXBlLCBhcnJheSkge1xuICAgIC8vIFN1YmNsYXNzZXMgY2FuIG92ZXJyaWRlIHRoaXMgbWV0aG9kIHRvIG1ha2UgZXZlbnQgcHJvcGFnYWJsZS5cbn07XG5cbkZpcmUuRXZlbnRUYXJnZXQgPSBFdmVudFRhcmdldDtcblxubW9kdWxlLmV4cG9ydHMgPSBFdmVudFRhcmdldDtcbiIsIlxuLyoqXG4gKiBBbiBldmVudCBhbGxvd3MgZm9yIHNpZ25hbGluZyB0aGF0IHNvbWV0aGluZyBoYXMgb2NjdXJyZWQuIEUuZy4gdGhhdCBhbiBhc3NldCBoYXMgY29tcGxldGVkIGRvd25sb2FkaW5nLlxuICogQGNsYXNzIEV2ZW50XG4gKiBAY29uc3RydWN0b3JcbiAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlIC0gVGhlIG5hbWUgb2YgdGhlIGV2ZW50IChjYXNlLXNlbnNpdGl2ZSksIGUuZy4gXCJjbGlja1wiLCBcImZpcmVcIiwgb3IgXCJzdWJtaXRcIlxuICogQHBhcmFtIHtib29sZWFufSBbYnViYmxlcz1mYWxzZV0gLSBBIGJvb2xlYW4gaW5kaWNhdGluZyB3aGV0aGVyIHRoZSBldmVudCBidWJibGVzIHVwIHRocm91Z2ggdGhlIHRyZWUgb3Igbm90XG4gKi9cbmZ1bmN0aW9uIEV2ZW50ICh0eXBlLCBidWJibGVzKSB7XG4gICAgLy9IYXNoT2JqZWN0LmNhbGwodGhpcyk7XG4gICAgaWYgKHR5cGVvZiBidWJibGVzID09PSAndW5kZWZpbmVkJykgeyBidWJibGVzID0gZmFsc2U7IH1cblxuICAgIC8qKlxuICAgICAqIFRoZSBuYW1lIG9mIHRoZSBldmVudCAoY2FzZS1zZW5zaXRpdmUpLCBlLmcuIFwiY2xpY2tcIiwgXCJmaXJlXCIsIG9yIFwic3VibWl0XCJcbiAgICAgKiBAcHJvcGVydHkgdHlwZVxuICAgICAqIEB0eXBlIHtzdHJpbmd9XG4gICAgICovXG4gICAgdGhpcy50eXBlID0gdHlwZTtcblxuICAgIC8qKlxuICAgICAqIEEgcmVmZXJlbmNlIHRvIHRoZSB0YXJnZXQgdG8gd2hpY2ggdGhlIGV2ZW50IHdhcyBvcmlnaW5hbGx5IGRpc3BhdGNoZWRcbiAgICAgKiBAcHJvcGVydHkgdGFyZ2V0XG4gICAgICogQHR5cGUge29iamVjdH1cbiAgICAgKi9cbiAgICB0aGlzLnRhcmdldCA9IG51bGw7XG5cbiAgICAvKipcbiAgICAgKiBBIHJlZmVyZW5jZSB0byB0aGUgY3VycmVudGx5IHJlZ2lzdGVyZWQgdGFyZ2V0IGZvciB0aGUgZXZlbnRcbiAgICAgKiBAcHJvcGVydHkgY3VycmVudFRhcmdldDtcbiAgICAgKiBAdHlwZSB7b2JqZWN0fVxuICAgICAqL1xuICAgIHRoaXMuY3VycmVudFRhcmdldCA9IG51bGw7XG5cbiAgICAvKipcbiAgICAgKiBJbmRpY2F0ZXMgd2hpY2ggcGhhc2Ugb2YgdGhlIGV2ZW50IGZsb3cgaXMgY3VycmVudGx5IGJlaW5nIGV2YWx1YXRlZC5cbiAgICAgKiBSZXR1cm5zIGFuIGludGVnZXIgdmFsdWUgcmVwcmVzZW50ZWQgYnkgNCBjb25zdGFudHM6XG4gICAgICogIC0gRXZlbnQuTk9ORSA9IDBcbiAgICAgKiAgLSBFdmVudC5DQVBUVVJJTkdfUEhBU0UgPSAxXG4gICAgICogIC0gRXZlbnQuQVRfVEFSR0VUID0gMlxuICAgICAqICAtIEV2ZW50LkJVQkJMSU5HX1BIQVNFID0gM1xuICAgICAqIFRoZSBwaGFzZXMgYXJlIGV4cGxhaW5lZCBpbiB0aGUgW3NlY3Rpb24gMy4xLCBFdmVudCBkaXNwYXRjaCBhbmQgRE9NIGV2ZW50IGZsb3ddXG4gICAgICogKGh0dHA6Ly93d3cudzMub3JnL1RSL0RPTS1MZXZlbC0zLUV2ZW50cy8jZXZlbnQtZmxvdyksIG9mIHRoZSBET00gTGV2ZWwgMyBFdmVudHMgc3BlY2lmaWNhdGlvbi5cbiAgICAgKlxuICAgICAqIEBwcm9wZXJ0eSBldmVudFBoYXNlXG4gICAgICogQHR5cGUge251bWJlcn1cbiAgICAgKi9cbiAgICB0aGlzLmV2ZW50UGhhc2UgPSAwO1xuXG4gICAgLyoqXG4gICAgICogQSBib29sZWFuIGluZGljYXRpbmcgd2hldGhlciB0aGUgZXZlbnQgYnViYmxlcyB1cCB0aHJvdWdoIHRoZSBoaWVyYXJjaHkgb3Igbm90XG4gICAgICogQHByb3BlcnR5IGJ1YmJsZXNcbiAgICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICB0aGlzLmJ1YmJsZXMgPSBidWJibGVzO1xuXG4gICAgLyoqXG4gICAgICogSW5kaWNhdGVzIHdoZXRoZXIgb3Igbm90IGV2ZW50LnByZXZlbnREZWZhdWx0KCkgaGFzIGJlZW4gY2FsbGVkIG9uIHRoZSBldmVudFxuICAgICAqIEBwcm9wZXJ0eSBfZGVmYXVsdFByZXZlbnRlZFxuICAgICAqIEB0eXBlIHtib29sZWFufVxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgdGhpcy5fZGVmYXVsdFByZXZlbnRlZCA9IGZhbHNlO1xuXG4gICAgLyoqXG4gICAgICogSW5kaWNhdGVzIHdoZXRoZXIgb3Igbm90IGV2ZW50LnN0b3AoKSBoYXMgYmVlbiBjYWxsZWQgb24gdGhlIGV2ZW50XG4gICAgICogQHByb3BlcnR5IF9wcm9wYWdhdGlvblN0b3BwZWRcbiAgICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIHRoaXMuX3Byb3BhZ2F0aW9uU3RvcHBlZCA9IGZhbHNlO1xuXG4gICAgLyoqXG4gICAgICogSW5kaWNhdGVzIHdoZXRoZXIgb3Igbm90IGV2ZW50LnN0b3AodHJ1ZSkgaGFzIGJlZW4gY2FsbGVkIG9uIHRoZSBldmVudFxuICAgICAqIEBwcm9wZXJ0eSBfcHJvcGFnYXRpb25JbW1lZGlhdGVTdG9wcGVkXG4gICAgICogQHR5cGUge2Jvb2xlYW59XG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICB0aGlzLl9wcm9wYWdhdGlvbkltbWVkaWF0ZVN0b3BwZWQgPSBmYWxzZTtcblxuICAgIC8vdGhpcy5jYW5jZWxhYmxlID0gZmFsc2U7XG4gICAgLy90aGlzLmNsaXBib2FyZERhdGEgPSB1bmRlZmluZWQ7XG4gICAgLy90aGlzLnBhdGggPSBOb2RlTGlzdFswXTtcbiAgICAvL3RoaXMucmV0dXJuVmFsdWUgPSB0cnVlO1xuICAgIC8vdGhpcy5zcmNFbGVtZW50ID0gbnVsbDtcbiAgICAvL3RoaXMudGltZVN0YW1wID0gMTQxNTc2MTY4MTUyOTtcbn1cblxuLyoqXG4gKiBFdmVudHMgbm90IGN1cnJlbnRseSBkaXNwYXRjaGVkIGFyZSBpbiB0aGlzIHBoYXNlXG4gKiBAcHJvcGVydHkgTk9ORVxuICogQHR5cGUge251bWJlcn1cbiAqIEBzdGF0aWNcbiAqIEBmaW5hbFxuICovXG5FdmVudC5OT05FID0gMDtcbi8qKlxuICogVGhlIGNhcHR1cmluZyBwaGFzZSBjb21wcmlzZXMgdGhlIGpvdXJuZXkgZnJvbSB0aGUgcm9vdCB0byB0aGUgbGFzdCBub2RlIGJlZm9yZSB0aGUgZXZlbnQgdGFyZ2V0J3Mgbm9kZVxuICogc2VlIGh0dHA6Ly93d3cudzMub3JnL1RSL0RPTS1MZXZlbC0zLUV2ZW50cy8jZXZlbnQtZmxvd1xuICogQHByb3BlcnR5IENBUFRVUklOR19QSEFTRVxuICogQHR5cGUge251bWJlcn1cbiAqIEBzdGF0aWNcbiAqIEBmaW5hbFxuICovXG5FdmVudC5DQVBUVVJJTkdfUEhBU0UgPSAxO1xuLyoqXG4gKiBUaGUgdGFyZ2V0IHBoYXNlIGNvbXByaXNlcyBvbmx5IHRoZSBldmVudCB0YXJnZXQgbm9kZVxuICogc2VlIGh0dHA6Ly93d3cudzMub3JnL1RSL0RPTS1MZXZlbC0zLUV2ZW50cy8jZXZlbnQtZmxvd1xuICogQHByb3BlcnR5IEFUX1RBUkdFVFxuICogQHR5cGUge251bWJlcn1cbiAqIEBzdGF0aWNcbiAqIEBmaW5hbFxuICovXG5FdmVudC5BVF9UQVJHRVQgPSAyO1xuLyoqXG4gKiBUaGUgYnViYmxpbmcgcGhhc2UgY29tcHJpc2VzIGFueSBzdWJzZXF1ZW50IG5vZGVzIGVuY291bnRlcmVkIG9uIHRoZSByZXR1cm4gdHJpcCB0byB0aGUgcm9vdCBvZiB0aGUgaGllcmFyY2h5XG4gKiBzZWUgaHR0cDovL3d3dy53My5vcmcvVFIvRE9NLUxldmVsLTMtRXZlbnRzLyNldmVudC1mbG93XG4gKiBAcHJvcGVydHkgQlVCQkxJTkdfUEhBU0VcbiAqIEB0eXBlIHtudW1iZXJ9XG4gKiBAc3RhdGljXG4gKiBAZmluYWxcbiAqL1xuRXZlbnQuQlVCQkxJTkdfUEhBU0UgPSAzO1xuXG4vKipcbiAqIFN0b3AgcHJvcGFnYXRpb24uIFdoZW4gZGlzcGF0Y2hlZCBpbiBhIHRyZWUsIGludm9raW5nIHRoaXMgbWV0aG9kIHByZXZlbnRzIGV2ZW50IGZyb20gcmVhY2hpbmcgYW55IG90aGVyIG9iamVjdHMgdGhhbiB0aGUgY3VycmVudC5cbiAqXG4gKiBAbWV0aG9kIHN0b3BcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW2ltbWVkaWF0ZT1mYWxzZV0gLSBJbmRpY2F0ZXMgd2hldGhlciBvciBub3QgdG8gaW1tZWRpYXRlIHN0b3AgdGhlIHByb3BhZ2F0aW9uLCBkZWZhdWx0IGlzIGZhbHNlLlxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIElmIHRydWUsIGZvciB0aGlzIHBhcnRpY3VsYXIgZXZlbnQsIG5vIG90aGVyIGNhbGxiYWNrIHdpbGwgYmUgY2FsbGVkLlxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIE5laXRoZXIgdGhvc2UgYXR0YWNoZWQgb24gdGhlIHNhbWUgZXZlbnQgdGFyZ2V0LFxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vciB0aG9zZSBhdHRhY2hlZCBvbiB0YXJnZXRzIHdoaWNoIHdpbGwgYmUgdHJhdmVyc2VkIGxhdGVyLlxuICovXG5FdmVudC5wcm90b3R5cGUuc3RvcCA9IGZ1bmN0aW9uIChpbW1lZGlhdGUpIHtcbiAgICB0aGlzLl9wcm9wYWdhdGlvblN0b3BwZWQgPSB0cnVlO1xuICAgIGlmIChpbW1lZGlhdGUpIHtcbiAgICAgICAgdGhpcy5fcHJvcGFnYXRpb25JbW1lZGlhdGVTdG9wcGVkID0gdHJ1ZTtcbiAgICB9XG59O1xuXG4vKipcbiAqIElmIGludm9rZWQgd2hlbiB0aGUgY2FuY2VsYWJsZSBhdHRyaWJ1dGUgdmFsdWUgaXMgdHJ1ZSwgc2lnbmFscyB0byB0aGUgb3BlcmF0aW9uIHRoYXQgY2F1c2VkIGV2ZW50IHRvIGJlIGRpc3BhdGNoZWQgdGhhdCBpdCBuZWVkcyB0byBiZSBjYW5jZWxlZC5cbiAqIEBtZXRob2QgcHJldmVudERlZmF1bHRcbiAqL1xuRXZlbnQucHJvdG90eXBlLnByZXZlbnREZWZhdWx0ID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuX2RlZmF1bHRQcmV2ZW50ZWQgPSB0cnVlO1xufTtcblxuLyoqXG4gKiBAbWV0aG9kIF9yZXNldFxuICogQHByaXZhdGVcbiAqL1xuRXZlbnQucHJvdG90eXBlLl9yZXNldCA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLnRhcmdldCA9IG51bGw7XG4gICAgdGhpcy5jdXJyZW50VGFyZ2V0ID0gbnVsbDtcbiAgICB0aGlzLmV2ZW50UGhhc2UgPSAwO1xuICAgIHRoaXMuX2RlZmF1bHRQcmV2ZW50ZWQgPSBmYWxzZTtcbiAgICB0aGlzLl9wcm9wYWdhdGlvblN0b3BwZWQgPSBmYWxzZTtcbiAgICB0aGlzLl9wcm9wYWdhdGlvbkltbWVkaWF0ZVN0b3BwZWQgPSBmYWxzZTtcbn07XG5cbmZ1bmN0aW9uIEN1c3RvbUV2ZW50ICh0eXBlLCBidWJibGVzKSB7XG4gICAgRXZlbnQuY2FsbCh0aGlzLCB0eXBlLCBidWJibGVzKTtcbiAgICB0aGlzLmRldGFpbCA9IG51bGw7XG59XG5FdmVudC5DdXN0b21FdmVudCA9IEN1c3RvbUV2ZW50O1xuXG5GaXJlLkV2ZW50ID0gRXZlbnQ7XG5GaXJlLkN1c3RvbUV2ZW50ID0gQ3VzdG9tRXZlbnQ7XG5cbm1vZHVsZS5leHBvcnRzID0gRXZlbnQ7XG4iLCJ2YXIgSlMgPSByZXF1aXJlKCcuL2pzJyk7XG5yZXF1aXJlKCcuL2NsYXNzJyk7XG52YXIgRGVmID0gcmVxdWlyZSgnLi9kZWZpbml0aW9uJyk7XG5cbnZhciBEZXN0cm95ZWQgPSBEZWYuRGVzdHJveWVkO1xudmFyIFRvRGVzdHJveSA9IERlZi5Ub0Rlc3Ryb3k7XG5cbi8qKlxuICogVGhlIGJhc2UgY2xhc3Mgb2YgbW9zdCBvZiBhbGwgdGhlIG9iamVjdHMgaW4gRmlyZWJhbGwuXG4gKiBAY2xhc3MgRk9iamVjdFxuICogQGNvbnN0cnVjdG9yXG4gKi9cbkZPYmplY3QgPSAoZnVuY3Rpb24gKCkge1xuXG4gICAgLy8gY29uc3RydWN0b3JcblxuICAgIGZ1bmN0aW9uIEZPYmplY3QgKCkge1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAcHJvcGVydHkgX25hbWVcbiAgICAgICAgICogQHR5cGUgc3RyaW5nXG4gICAgICAgICAqIEBkZWZhdWx0IFwiXCJcbiAgICAgICAgICogQHByaXZhdGVcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuX25hbWUgPSAnJztcblxuICAgICAgICAvKipcbiAgICAgICAgICogQHByb3BlcnR5IF9vYmpGbGFnc1xuICAgICAgICAgKiBAdHlwZSBudW1iZXJcbiAgICAgICAgICogQGRlZmF1bHQgMFxuICAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5fb2JqRmxhZ3MgPSAwO1xuICAgIH1cblxuICAgIEZpcmUuX2Zhc3REZWZpbmUoJ0ZpcmUuRk9iamVjdCcsIEZPYmplY3QsIFsnX25hbWUnLCAnX29iakZsYWdzJ10pO1xuXG4gICAgLy8gaW50ZXJuYWwgc3RhdGljXG5cbiAgICB2YXIgb2JqZWN0c1RvRGVzdHJveSA9IFtdO1xuXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEZPYmplY3QsICdfZGVmZXJyZWREZXN0cm95Jywge1xuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIGRlbGV0ZUNvdW50ID0gb2JqZWN0c1RvRGVzdHJveS5sZW5ndGg7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGRlbGV0ZUNvdW50OyArK2kpIHtcbiAgICAgICAgICAgICAgICB2YXIgb2JqID0gb2JqZWN0c1RvRGVzdHJveVtpXTtcbiAgICAgICAgICAgICAgICBpZiAoIShvYmouX29iakZsYWdzICYgRGVzdHJveWVkKSkge1xuICAgICAgICAgICAgICAgICAgICBvYmouX2Rlc3Ryb3lJbW1lZGlhdGUoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBpZiB3ZSBjYWxsZWQgYi5kZXN0b3J5KCkgaW4gYS5vbkRlc3Ryb3koKSwgb2JqZWN0c1RvRGVzdHJveSB3aWxsIGJlIHJlc2l6ZWQsXG4gICAgICAgICAgICAvLyBidXQgd2Ugb25seSBkZXN0cm95IHRoZSBvYmplY3RzIHdoaWNoIGNhbGxlZCBkZXN0b3J5IGluIHRoaXMgZnJhbWUuXG4gICAgICAgICAgICBpZiAoZGVsZXRlQ291bnQgPT09IG9iamVjdHNUb0Rlc3Ryb3kubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgb2JqZWN0c1RvRGVzdHJveS5sZW5ndGggPSAwO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgb2JqZWN0c1RvRGVzdHJveS5zcGxpY2UoMCwgZGVsZXRlQ291bnQpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBAaWZkZWYgRURJVE9SXG4gICAgICAgICAgICBkZWZlcnJlZERlc3Ryb3lUaW1lciA9IC0xO1xuICAgICAgICAgICAgLy8gQGVuZGlmXG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IGZhbHNlXG4gICAgfSk7XG5cbiAgICAvLyBAaWZkZWYgRURJVE9SXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEZPYmplY3QsICdfY2xlYXJEZWZlcnJlZERlc3Ryb3lUaW1lcicsIHtcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmIChkZWZlcnJlZERlc3Ryb3lUaW1lciAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQoZGVmZXJyZWREZXN0cm95VGltZXIpO1xuICAgICAgICAgICAgICAgIGRlZmVycmVkRGVzdHJveVRpbWVyID0gLTE7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IGZhbHNlXG4gICAgfSk7XG4gICAgLy8gQGVuZGlmXG5cbiAgICAvLyBtZW1iZXJcblxuICAgIHZhciBwcm90b3R5cGUgPSBGT2JqZWN0LnByb3RvdHlwZTtcblxuICAgIC8qKlxuICAgICAqIFRoZSBuYW1lIG9mIHRoZSBvYmplY3QuXG4gICAgICogQHByb3BlcnR5IG5hbWVcbiAgICAgKiBAdHlwZSBzdHJpbmdcbiAgICAgKiBAZGVmYXVsdCBcIlwiXG4gICAgICovXG4gICAgSlMuZ2V0c2V0KHByb3RvdHlwZSwgJ25hbWUnLFxuICAgICAgICBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fbmFtZTtcbiAgICAgICAgfSxcbiAgICAgICAgZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLl9uYW1lID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICApO1xuXG4gICAgLyoqXG4gICAgICogSW5kaWNhdGVzIHdoZXRoZXIgdGhlIG9iamVjdCBpcyBub3QgeWV0IGRlc3Ryb3llZFxuICAgICAqIEBwcm9wZXJ0eSBpc1ZhbGlkXG4gICAgICogQHR5cGUgYm9vbGVhblxuICAgICAqIEBkZWZhdWx0IHRydWVcbiAgICAgKiBAcmVhZE9ubHlcbiAgICAgKi9cbiAgICBKUy5nZXQocHJvdG90eXBlLCAnaXNWYWxpZCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuICEodGhpcy5fb2JqRmxhZ3MgJiBEZXN0cm95ZWQpO1xuICAgIH0pO1xuXG4gICAgLy8gQGlmZGVmIEVESVRPUlxuICAgIHZhciBkZWZlcnJlZERlc3Ryb3lUaW1lciA9IC0xO1xuICAgIC8vIEBlbmRpZlxuXG4gICAgLyoqXG4gICAgICogRGVzdHJveSB0aGlzIEZPYmplY3QsIGFuZCByZWxlYXNlIGFsbCBpdHMgb3duIHJlZmVyZW5jZXMgdG8gb3RoZXIgcmVzb3VyY2VzLlxuICAgICAqXG4gICAgICogQWZ0ZXIgZGVzdG9yeSwgdGhpcyBGT2JqZWN0IGlzIG5vdCB1c2FibGUgYW55IG1vcmUuXG4gICAgICogWW91IGNhbiB1c2UgRmlyZS5pc1ZhbGlkKG9iaikgKG9yIG9iai5pc1ZhbGlkIGlmIG9iaiBpcyBub24tbmlsKSB0byBjaGVjayB3aGV0aGVyIHRoZSBvYmplY3QgaXMgZGVzdHJveWVkIGJlZm9yZVxuICAgICAqIGFjY2Vzc2luZyBpdC5cbiAgICAgKlxuICAgICAqIEBtZXRob2QgZGVzdHJveVxuICAgICAqIEByZXR1cm4ge0Jvb2xlYW59IHdoZXRoZXIgaXQgaXMgdGhlIGZpcnN0IHRpbWUgdGhlIGRlc3Ryb3kgYmVpbmcgY2FsbGVkXG4gICAgICovXG4gICAgcHJvdG90eXBlLmRlc3Ryb3kgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0aGlzLl9vYmpGbGFncyAmIERlc3Ryb3llZCkge1xuICAgICAgICAgICAgRmlyZS53YXJuKCdvYmplY3QgYWxyZWFkeSBkZXN0cm95ZWQnKTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5fb2JqRmxhZ3MgJiBUb0Rlc3Ryb3kpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9vYmpGbGFncyB8PSBUb0Rlc3Ryb3k7XG4gICAgICAgIG9iamVjdHNUb0Rlc3Ryb3kucHVzaCh0aGlzKTtcblxuICAgICAgICAvLyBAaWZkZWYgRURJVE9SXG4gICAgICAgIGlmIChkZWZlcnJlZERlc3Ryb3lUaW1lciA9PT0gLTEgJiYgRmlyZS5lbmdpbmUgJiYgISBGaXJlLmVuZ2luZS5faXNVcGRhdGluZykge1xuICAgICAgICAgICAgLy8gYXV0byBkZXN0cm95IGltbWVkaWF0ZSBpbiBlZGl0IG1vZGVcbiAgICAgICAgICAgIGRlZmVycmVkRGVzdHJveVRpbWVyID0gc2V0VGltZW91dChGT2JqZWN0Ll9kZWZlcnJlZERlc3Ryb3ksIDEpO1xuICAgICAgICB9XG4gICAgICAgIC8vIEBlbmRpZlxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogQ2xlYXIgYWxsIHJlZmVyZW5jZXMgaW4gdGhlIGluc3RhbmNlLlxuICAgICAqXG4gICAgICogTk9URTogdGhpcyBtZXRob2Qgd2lsbCBub3QgY2xlYXIgdGhlIGdldHRlciBvciBzZXR0ZXIgZnVuY3Rpb25zIHdoaWNoIGRlZmluZWQgaW4gdGhlIElOU1RBTkNFIG9mIEZPYmplY3QuXG4gICAgICogICAgICAgWW91IGNhbiBvdmVycmlkZSB0aGUgX2Rlc3RydWN0IG1ldGhvZCBpZiB5b3UgbmVlZC5cbiAgICAgKiBAbWV0aG9kIF9kZXN0cnVjdFxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgcHJvdG90eXBlLl9kZXN0cnVjdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgLy8g5YWB6K646YeN6L29ZGVzdHJveVxuICAgICAgICAvLyDmiYDmnInlj6/mnprkuL7liLDnmoTlsZ7mgKfvvIzpg73kvJrooqvmuIXnqbpcbiAgICAgICAgZm9yICh2YXIga2V5IGluIHRoaXMpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICAgICAgICB2YXIgdHlwZSA9IHR5cGVvZiB0aGlzW2tleV07XG4gICAgICAgICAgICAgICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ3N0cmluZyc6XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzW2tleV0gPSAnJztcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdvYmplY3QnOlxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpc1trZXldID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdmdW5jdGlvbic6XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzW2tleV0gPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogQ2FsbGVkIGJlZm9yZSB0aGUgb2JqZWN0IGJlaW5nIGRlc3Ryb3llZC5cbiAgICAgKiBAbWV0aG9kIF9vblByZURlc3Ryb3lcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIHByb3RvdHlwZS5fb25QcmVEZXN0cm95ID0gbnVsbDtcblxuICAgIHByb3RvdHlwZS5fZGVzdHJveUltbWVkaWF0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHRoaXMuX29iakZsYWdzICYgRGVzdHJveWVkKSB7XG4gICAgICAgICAgICBGaXJlLmVycm9yKCdvYmplY3QgYWxyZWFkeSBkZXN0cm95ZWQnKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICAvLyBlbmdpbmUgaW50ZXJuYWwgY2FsbGJhY2tcbiAgICAgICAgaWYgKHRoaXMuX29uUHJlRGVzdHJveSkge1xuICAgICAgICAgICAgdGhpcy5fb25QcmVEZXN0cm95KCk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gZG8gZGVzdHJveVxuICAgICAgICB0aGlzLl9kZXN0cnVjdCgpO1xuICAgICAgICAvLyBtYXJrIGRlc3Ryb3llZFxuICAgICAgICB0aGlzLl9vYmpGbGFncyB8PSBEZXN0cm95ZWQ7XG4gICAgfTtcblxuICAgIC8vIEBpZmRlZiBFRElUT1JcbiAgICAvKipcbiAgICAgKiBUaGUgY3VzdG9taXplZCBzZXJpYWxpemF0aW9uIGZvciB0aGlzIG9iamVjdC4gKEVkaXRvciBPbmx5KVxuICAgICAqIEBtZXRob2QgX3NlcmlhbGl6ZVxuICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gZXhwb3J0aW5nXG4gICAgICogQHJldHVybiB7b2JqZWN0fSB0aGUgc2VyaWFsaXplZCBqc29uIGRhdGEgb2JqZWN0XG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBwcm90b3R5cGUuX3NlcmlhbGl6ZSA9IG51bGw7XG4gICAgLy8gQGVuZGlmXG5cbiAgICAvKipcbiAgICAgKiBJbml0IHRoaXMgb2JqZWN0IGZyb20gdGhlIGN1c3RvbSBzZXJpYWxpemVkIGRhdGEuXG4gICAgICogQG1ldGhvZCBfZGVzZXJpYWxpemVcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gZGF0YSAtIHRoZSBzZXJpYWxpemVkIGpzb24gZGF0YVxuICAgICAqIEBwYXJhbSB7X0Rlc2VyaWFsaXplcn0gY3R4XG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBwcm90b3R5cGUuX2Rlc2VyaWFsaXplID0gbnVsbDtcblxuICAgIHJldHVybiBGT2JqZWN0O1xufSkoKTtcblxuLyoqXG4gKiBAbW9kdWxlIEZpcmVcbiAqL1xuLyoqXG4gKiBDaGVja3Mgd2hldGhlciB0aGUgb2JqZWN0IGlzIG5vbi1uaWwgYW5kIG5vdCB5ZXQgZGVzdHJveWVkXG4gKiBAbWV0aG9kIGlzVmFsaWRcbiAqIEBwYXJhbSB7b2JqZWN0fGFueX0gdmFsdWVcbiAqIEByZXR1cm4ge0Jvb2xlYW59IHdoZXRoZXIgaXMgdmFsaWRcbiAqL1xuRmlyZS5pc1ZhbGlkID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgcmV0dXJuICEhdmFsdWUgJiYgISh2YWx1ZS5fb2JqRmxhZ3MgJiBEZXN0cm95ZWQpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHR5cGVvZiB2YWx1ZSAhPT0gJ3VuZGVmaW5lZCc7XG4gICAgfVxufTtcblxuRmlyZS5GT2JqZWN0ID0gRk9iamVjdDtcblxubW9kdWxlLmV4cG9ydHMgPSBGT2JqZWN0O1xuIiwidmFyIHJvb3QgPSB0eXBlb2YgZ2xvYmFsICE9PSAndW5kZWZpbmVkJyA/IGdsb2JhbCA6IHdpbmRvdztcblxuLyoqXG4gKiAhI2VuXG4gKiBHbG9iYWwgb2JqZWN0IHdpdGggcnVudGltZSBjbGFzc2VzLCBwcm9wZXJ0aWVzIGFuZCBtZXRob2RzIHlvdSBjYW4gYWNjZXNzIGZyb20gYW55d2hlcmUuXG4gKlxuICogYEZpcmUobm9kZSlgIHRha2VzIGEgcnVudGltZSBub2RlIGFuZCByZXR1cm4gaXRzIGNvcnJlc3BvbmRpbmcgRmlyZS5SdW50aW1lLk5vZGVXcmFwcGVyIGluc3RhbmNlLlxuICpcbiAqIFN1Ym1vZHVsZXM6XG4gKiAtIFtKU10oLi9GaXJlLkpTLmh0bWwpXG4gKiAtIFtSdW50aW1lXSguL0ZpcmUuUnVudGltZS5odG1sKVxuICpcbiAqICEjemhcbiAqIOWPr+WFqOWxgOiuv+mXrueahOWFrOWFseaWueazleWSjOWxnuaAp++8jOS5n+S8muWMheaLrOS4gOS6m+e7hOS7tuWSjOexu+eahOmdmeaAgeaWueazleOAglxuICogRmlyZSDmnKzouqvkuZ/mmK/kuIDkuKrmlrnms5XvvIznm7TmjqXosIPnlKjnmoTor53lsIbov5Tlm57miJbmlrDlu7rot5/nu5nlrpogbm9kZSDnm7jkupLnu5HlrprnmoQgTm9kZVdyYXBwZXIg5a6e5L6L44CCXG4gKlxuICog5YyF5ZCr55qE5a2Q5qih5Z2XOlxuICogLSBbSlNdKC4vRmlyZS5KUy5odG1sKVxuICogLSBbUnVudGltZV0oLi9GaXJlLlJ1bnRpbWUuaHRtbClcbiAqXG4gKiBAbW9kdWxlIEZpcmVcbiAqIEBtYWluIEZpcmVcbiAqL1xudmFyIGdldFdyYXBwZXI7XG5pZiAoIXJvb3QuRmlyZSkge1xuICAgIC8vIEFsd2F5cyBleHBvcnQgRmlyZSBnbG9iYWxseS5cbiAgICByb290LkZpcmUgPSBmdW5jdGlvbiAobm9kZSkge1xuICAgICAgICByZXR1cm4gZ2V0V3JhcHBlcihub2RlKTtcbiAgICB9O1xufVxuXG5GaXJlLl9zZXRXcmFwcGVyR2V0dGVyID0gZnVuY3Rpb24gKGdldHRlcikge1xuICAgIGdldFdyYXBwZXIgPSBnZXR0ZXI7XG59O1xuXG5yZXF1aXJlKCcuL2RlZmluaXRpb24nKTtcblxuLy8gRGVjbGFyZSBwcmUtcHJvY2VzcyBtYWNyb3MgZ2xvYmFsbHkgZm9yIHVnbGlmeVxuaWYgKHR5cGVvZiBGSVJFX0RFQlVHID09PSAndW5kZWZpbmVkJykge1xuICAgIGV2YWwoJ0ZJUkVfREVCVUc9ITAnKTsgICAgICAvLyB1c2UgZXZhbCB0byBpZ25vcmUgdWdsaWZ5XG59XG5pZiAodHlwZW9mIEZJUkVfREVWID09PSAndW5kZWZpbmVkJykge1xuICAgIGlmIChGSVJFX0VESVRPUiB8fCBGSVJFX0RFQlVHKSB7XG4gICAgICAgIGV2YWwoJ0ZJUkVfREVWPSEwJyk7ICAgIC8vIHVzZSBldmFsIHRvIGlnbm9yZSB1Z2xpZnlcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGV2YWwoJ0ZJUkVfREVWPSExJyk7ICAgIC8vIHVzZSBldmFsIHRvIGlnbm9yZSB1Z2xpZnlcbiAgICB9XG59XG5pZiAodHlwZW9mIEZJUkVfVEVTVCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBpZiAoRklSRV9FRElUT1IpIHtcbiAgICAgICAgZXZhbCgnRklSRV9URVNUPXR5cGVvZiBkZXNjcmliZSE9PVwidW5kZWZpbmVkXCInKTsgICAgICAgLy8gdXNlIGV2YWwgdG8gaWdub3JlIHVnbGlmeVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgZXZhbCgnRklSRV9URVNUPSExJyk7ICAgICAgIC8vIHVzZSBldmFsIHRvIGlnbm9yZSB1Z2xpZnlcbiAgICB9XG59XG5cbi8vIGphdmFzY3JpcHQgZXh0ZW5kc1xuXG5yZXF1aXJlKCcuL2pzJyk7XG5pZiAoIUZpcmUubG9nKSB7XG4gICAgLy8g57yW6L6R5Zmo5bey57uP5a6a5LmJ5LqGIEZpcmUubG9nXG4gICAgcmVxdWlyZSgnLi9sb2cnKTtcbn1cbnJlcXVpcmUoJy4vbWF0aCcpO1xucmVxdWlyZSgnLi91dGlscycpO1xucmVxdWlyZSgnLi9lbnVtJyk7XG5yZXF1aXJlKCcuL2ZvYmplY3QnKTtcbnJlcXVpcmUoJy4vY2xhc3MtbmV3Jyk7XG5yZXF1aXJlKCcuL3ZhbHVlLXR5cGVzJyk7XG5yZXF1aXJlKCcuL2NhbGxiYWNrcy1pbnZva2VyJyk7XG5yZXF1aXJlKCcuL3BhdGgnKTtcbnJlcXVpcmUoJy4vaW50ZXJzZWN0aW9uJyk7XG5yZXF1aXJlKCcuL3BvbHlnb24nKTtcblxuLy8gZW5naW5lIHRvb2xraXRcblxucmVxdWlyZSgnLi91cmwnKTtcbnJlcXVpcmUoJy4vYXNzZXQnKTtcbnJlcXVpcmUoJy4vZGVzZXJpYWxpemUnKTtcbnJlcXVpcmUoJy4vZXZlbnQvZXZlbnQtdGFyZ2V0Jyk7XG5yZXF1aXJlKCcuL3BsYXlhYmxlJyk7XG5yZXF1aXJlKCcuLy4uL3J1bnRpbWUvYmVoYXZpb3InKTtcblxuLy8gc2NyaXB0IG1hbmFnZW1lbnRcblxucmVxdWlyZSgnLi9yZXF1aXJpbmctZnJhbWUnKTtcblxuaWYgKEZpcmUuaXNXZWIpIHtcbiAgICAvLyBjb2RlcyBvbmx5IGF2YWlsYWJsZSBpbiBwYWdlIGxldmVsXG4gICAgcmVxdWlyZSgnLi90aWNrZXInKTtcbiAgICByZXF1aXJlKCcuL3RpbWUnKTtcbiAgICByZXF1aXJlKCcuL2xvYWRlcnMnKTtcbiAgICByZXF1aXJlKCcuL2xvYWQtbWFuYWdlcicpO1xuICAgIHJlcXVpcmUoJy4vYXNzZXQtbGlicmFyeScpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEZpcmU7XG4iLCIvKipcbiAqIEBjbGFzcyBJbnRlcnNlY3Rpb25cbiAqIEBzdGF0aWNcbiAqL1xuRmlyZS5JbnRlcnNlY3Rpb24gPSAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBJbnRlcnNlY3Rpb24gPSB7fTtcblxuICAgIC8qKlxuICAgICAqIEBtZXRob2QgbGluZUxpbmVcbiAgICAgKiBAcGFyYW0ge1ZlYzJ9IGExXG4gICAgICogQHBhcmFtIHtWZWMyfSBhMlxuICAgICAqIEBwYXJhbSB7VmVjMn0gYjFcbiAgICAgKiBAcGFyYW0ge1ZlYzJ9IGIyXG4gICAgICogQHJldHVybiB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBfbGluZUxpbmUgKCBhMSwgYTIsIGIxLCBiMiApIHtcbiAgICAgICAgdmFyIHJlc3VsdDtcblxuICAgICAgICB2YXIgdWFfdCA9IChiMi54IC0gYjEueCkgKiAoYTEueSAtIGIxLnkpIC0gKGIyLnkgLSBiMS55KSAqIChhMS54IC0gYjEueCk7XG4gICAgICAgIHZhciB1Yl90ID0gKGEyLnggLSBhMS54KSAqIChhMS55IC0gYjEueSkgLSAoYTIueSAtIGExLnkpICogKGExLnggLSBiMS54KTtcbiAgICAgICAgdmFyIHVfYiAgPSAoYjIueSAtIGIxLnkpICogKGEyLnggLSBhMS54KSAtIChiMi54IC0gYjEueCkgKiAoYTIueSAtIGExLnkpO1xuXG4gICAgICAgIGlmICggdV9iICE9PSAwICkge1xuICAgICAgICAgICAgdmFyIHVhID0gdWFfdCAvIHVfYjtcbiAgICAgICAgICAgIHZhciB1YiA9IHViX3QgLyB1X2I7XG5cbiAgICAgICAgICAgIGlmICggMCA8PSB1YSAmJiB1YSA8PSAxICYmIDAgPD0gdWIgJiYgdWIgPD0gMSApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBJbnRlcnNlY3Rpb24ubGluZUxpbmUgPSBfbGluZUxpbmU7XG5cbiAgICAvKipcbiAgICAgKiBAbWV0aG9kIGxpbmVSZWN0XG4gICAgICogQHBhcmFtIHtWZWMyfSBhMVxuICAgICAqIEBwYXJhbSB7VmVjMn0gYTJcbiAgICAgKiBAcGFyYW0ge1ZlYzJ9IGJcbiAgICAgKiBAcmV0dXJuIHtib29sZWFufVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIF9saW5lUmVjdCAoIGExLCBhMiwgYiApIHtcbiAgICAgICAgdmFyIHIwID0gbmV3IEZpcmUuVmVjMiggYi54LCBiLnkgKTtcbiAgICAgICAgdmFyIHIxID0gbmV3IEZpcmUuVmVjMiggYi54LCBiLnlNYXggKTtcbiAgICAgICAgdmFyIHIyID0gbmV3IEZpcmUuVmVjMiggYi54TWF4LCBiLnlNYXggKTtcbiAgICAgICAgdmFyIHIzID0gbmV3IEZpcmUuVmVjMiggYi54TWF4LCBiLnkgKTtcblxuICAgICAgICBpZiAoIF9saW5lTGluZSggYTEsIGEyLCByMCwgcjEgKSApXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcblxuICAgICAgICBpZiAoIF9saW5lTGluZSggYTEsIGEyLCByMSwgcjIgKSApXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcblxuICAgICAgICBpZiAoIF9saW5lTGluZSggYTEsIGEyLCByMiwgcjMgKSApXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcblxuICAgICAgICBpZiAoIF9saW5lTGluZSggYTEsIGEyLCByMywgcjAgKSApXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcblxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgSW50ZXJzZWN0aW9uLmxpbmVSZWN0ID0gX2xpbmVSZWN0O1xuXG4gICAgLyoqXG4gICAgICogQG1ldGhvZCBsaW5lUG9seWdvblxuICAgICAqIEBwYXJhbSB7VmVjMn0gYTFcbiAgICAgKiBAcGFyYW0ge1ZlYzJ9IGEyXG4gICAgICogQHBhcmFtIHtQb2x5Z29ufSBiXG4gICAgICogQHJldHVybiB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBfbGluZVBvbHlnb24gKCBhMSwgYTIsIGIgKSB7XG4gICAgICAgIHZhciBsZW5ndGggPSBiLnBvaW50cy5sZW5ndGg7XG5cbiAgICAgICAgZm9yICggdmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyArK2kgKSB7XG4gICAgICAgICAgICB2YXIgYjEgPSBiLnBvaW50c1tpXTtcbiAgICAgICAgICAgIHZhciBiMiA9IGIucG9pbnRzWyhpKzEpJWxlbmd0aF07XG5cbiAgICAgICAgICAgIGlmICggX2xpbmVMaW5lKCBhMSwgYTIsIGIxLCBiMiApIClcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgSW50ZXJzZWN0aW9uLmxpbmVQb2x5Z29uID0gX2xpbmVQb2x5Z29uO1xuXG4gICAgLyoqXG4gICAgICogQG1ldGhvZCByZWN0UmVjdFxuICAgICAqIEBwYXJhbSB7UmVjdH0gYVxuICAgICAqIEBwYXJhbSB7UmVjdH0gYlxuICAgICAqIEByZXR1cm4ge2Jvb2xlYW59XG4gICAgICovXG4gICAgZnVuY3Rpb24gX3JlY3RSZWN0ICggYSwgYiApIHtcbiAgICAgICAgdmFyIGFfbWluX3ggPSBhLng7XG4gICAgICAgIHZhciBhX21pbl95ID0gYS55O1xuICAgICAgICB2YXIgYV9tYXhfeCA9IGEueCArIGEud2lkdGg7XG4gICAgICAgIHZhciBhX21heF95ID0gYS55ICsgYS5oZWlnaHQ7XG5cbiAgICAgICAgdmFyIGJfbWluX3ggPSBiLng7XG4gICAgICAgIHZhciBiX21pbl95ID0gYi55O1xuICAgICAgICB2YXIgYl9tYXhfeCA9IGIueCArIGIud2lkdGg7XG4gICAgICAgIHZhciBiX21heF95ID0gYi55ICsgYi5oZWlnaHQ7XG5cbiAgICAgICAgcmV0dXJuIGFfbWluX3ggPD0gYl9tYXhfeCAmJlxuICAgICAgICAgICAgICAgYV9tYXhfeCA+PSBiX21pbl94ICYmXG4gICAgICAgICAgICAgICBhX21pbl95IDw9IGJfbWF4X3kgJiZcbiAgICAgICAgICAgICAgIGFfbWF4X3kgPj0gYl9taW5feVxuICAgICAgICAgICAgICAgO1xuICAgIH1cbiAgICBJbnRlcnNlY3Rpb24ucmVjdFJlY3QgPSBfcmVjdFJlY3Q7XG5cbiAgICAvKipcbiAgICAgKiBAbWV0aG9kIHJlY3RQb2x5Z29uXG4gICAgICogQHBhcmFtIHtSZWN0fSBhXG4gICAgICogQHBhcmFtIHtQb2x5Z29ufSBiXG4gICAgICogQHJldHVybiB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBfcmVjdFBvbHlnb24gKCBhLCBiICkge1xuICAgICAgICB2YXIgaTtcbiAgICAgICAgdmFyIHIwID0gbmV3IEZpcmUuVmVjMiggYS54LCBhLnkgKTtcbiAgICAgICAgdmFyIHIxID0gbmV3IEZpcmUuVmVjMiggYS54LCBhLnlNYXggKTtcbiAgICAgICAgdmFyIHIyID0gbmV3IEZpcmUuVmVjMiggYS54TWF4LCBhLnlNYXggKTtcbiAgICAgICAgdmFyIHIzID0gbmV3IEZpcmUuVmVjMiggYS54TWF4LCBhLnkgKTtcblxuICAgICAgICAvLyBpbnRlcnNlY3Rpb24gY2hlY2tcbiAgICAgICAgaWYgKCBfbGluZVBvbHlnb24oIHIwLCByMSwgYiApIClcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuXG4gICAgICAgIGlmICggX2xpbmVQb2x5Z29uKCByMSwgcjIsIGIgKSApXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcblxuICAgICAgICBpZiAoIF9saW5lUG9seWdvbiggcjIsIHIzLCBiICkgKVxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG5cbiAgICAgICAgaWYgKCBfbGluZVBvbHlnb24oIHIzLCByMCwgYiApIClcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuXG4gICAgICAgIC8vIGNoZWNrIGlmIGEgY29udGFpbnMgYlxuICAgICAgICBmb3IgKCBpID0gMDsgaSA8IGIucG9pbnRzLmxlbmd0aDsgKytpICkge1xuICAgICAgICAgICAgaWYgKCBhLmNvbnRhaW5zKCBiLnBvaW50c1tpXSApIClcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGNoZWNrIGlmIGIgY29udGFpbnMgYVxuICAgICAgICBpZiAoIGIuY29udGFpbnMocjApIClcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuXG4gICAgICAgIGlmICggYi5jb250YWlucyhyMSkgKVxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG5cbiAgICAgICAgaWYgKCBiLmNvbnRhaW5zKHIyKSApXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcblxuICAgICAgICBpZiAoIGIuY29udGFpbnMocjMpIClcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgSW50ZXJzZWN0aW9uLnJlY3RQb2x5Z29uID0gX3JlY3RQb2x5Z29uO1xuXG4gICAgLyoqXG4gICAgICogQG1ldGhvZCBwb2x5Z29uUG9seWdvblxuICAgICAqIEBwYXJhbSB7UG9seWdvbn0gYVxuICAgICAqIEBwYXJhbSB7UG9seWdvbn0gYlxuICAgICAqIEByZXR1cm4ge2Jvb2xlYW59XG4gICAgICovXG4gICAgZnVuY3Rpb24gX3BvbHlnb25Qb2x5Z29uICggYSwgYiApIHtcbiAgICAgICAgdmFyIGk7XG5cbiAgICAgICAgLy8gY2hlY2sgaWYgYSBpbnRlcnNlY3RzIGJcbiAgICAgICAgZm9yICggaSA9IDA7IGkgPCBsZW5ndGg7ICsraSApIHtcbiAgICAgICAgICAgIHZhciBhMSA9IGEucG9pbnRzW2ldO1xuICAgICAgICAgICAgdmFyIGEyID0gYS5wb2ludHNbKGkrMSklbGVuZ3RoXTtcblxuICAgICAgICAgICAgaWYgKCBfbGluZVBvbHlnb24oIGExLCBhMiwgYiApIClcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGNoZWNrIGlmIGEgY29udGFpbnMgYlxuICAgICAgICBmb3IgKCBpID0gMDsgaSA8IGIucG9pbnRzLmxlbmd0aDsgKytpICkge1xuICAgICAgICAgICAgaWYgKCBhLmNvbnRhaW5zKCBiLnBvaW50c1tpXSApIClcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGNoZWNrIGlmIGIgY29udGFpbnMgYVxuICAgICAgICBmb3IgKCBpID0gMDsgaSA8IGEucG9pbnRzLmxlbmd0aDsgKytpICkge1xuICAgICAgICAgICAgaWYgKCBiLmNvbnRhaW5zKCBhLnBvaW50c1tpXSApIClcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgSW50ZXJzZWN0aW9uLnBvbHlnb25Qb2x5Z29uID0gX3BvbHlnb25Qb2x5Z29uO1xuXG4gICAgcmV0dXJuIEludGVyc2VjdGlvbjtcbn0pKCk7XG4iLCJcbmZ1bmN0aW9uIF9nZXRQcm9wZXJ0eURlc2NyaXB0b3IgKG9iaiwgbmFtZSkge1xuICAgIHZhciBwZCA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iob2JqLCBuYW1lKTtcbiAgICBpZiAocGQpIHtcbiAgICAgICAgcmV0dXJuIHBkO1xuICAgIH1cbiAgICB2YXIgcCA9IE9iamVjdC5nZXRQcm90b3R5cGVPZihvYmopO1xuICAgIGlmIChwKSB7XG4gICAgICAgIHJldHVybiBfZ2V0UHJvcGVydHlEZXNjcmlwdG9yKHAsIG5hbWUpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBfY29weXByb3AobmFtZSwgc291cmNlLCB0YXJnZXQpIHtcbiAgICB2YXIgcGQgPSBfZ2V0UHJvcGVydHlEZXNjcmlwdG9yKHNvdXJjZSwgbmFtZSk7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgbmFtZSwgcGQpO1xufVxuXG4vKipcbiAqIFRoaXMgbW9kdWxlIHByb3ZpZGVzIHNvbWUgSmF2YVNjcmlwdCB1dGlsaXRpZXMuXG4gKlxuICogQG1vZHVsZSBGaXJlLkpTXG4gKi9cbnZhciBKUyA9IHtcblxuICAgIC8qKlxuICAgICAqIGNvcHkgYWxsIHByb3BlcnRpZXMgbm90IGRlZmluZWQgaW4gb2JqIGZyb20gYXJndW1lbnRzWzEuLi5uXVxuICAgICAqIEBtZXRob2QgYWRkb25cbiAgICAgKiBAcGFyYW0ge29iamVjdH0gb2JqIG9iamVjdCB0byBleHRlbmQgaXRzIHByb3BlcnRpZXNcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gLi4uc291cmNlT2JqIHNvdXJjZSBvYmplY3QgdG8gY29weSBwcm9wZXJ0aWVzIGZyb21cbiAgICAgKiBAcmV0dXJuIHtvYmplY3R9IHRoZSByZXN1bHQgb2JqXG4gICAgICovXG4gICAgYWRkb246IGZ1bmN0aW9uIChvYmopIHtcbiAgICAgICAgJ3VzZSBzdHJpY3QnO1xuICAgICAgICBvYmogPSBvYmogfHwge307XG4gICAgICAgIGZvciAodmFyIGkgPSAxLCBsZW5ndGggPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaV07XG4gICAgICAgICAgICBpZiAoc291cmNlKSB7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBzb3VyY2UgIT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICAgICAgICAgIEZpcmUuZXJyb3IoJ0ZpcmUuSlMuYWRkb24gY2FsbGVkIG9uIG5vbi1vYmplY3Q6Jywgc291cmNlKTtcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGZvciAoIHZhciBuYW1lIGluIHNvdXJjZSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoICEobmFtZSBpbiBvYmopICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgX2NvcHlwcm9wKCBuYW1lLCBzb3VyY2UsIG9iaik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG9iajtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogY29weSBhbGwgcHJvcGVydGllcyBmcm9tIGFyZ3VtZW50c1sxLi4ubl0gdG8gb2JqXG4gICAgICogQG1ldGhvZCBtaXhpblxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBvYmpcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gLi4uc291cmNlT2JqXG4gICAgICogQHJldHVybiB7b2JqZWN0fSB0aGUgcmVzdWx0IG9ialxuICAgICAqL1xuICAgIG1peGluOiBmdW5jdGlvbiAob2JqKSB7XG4gICAgICAgICd1c2Ugc3RyaWN0JztcbiAgICAgICAgb2JqID0gb2JqIHx8IHt9O1xuICAgICAgICBmb3IgKHZhciBpID0gMSwgbGVuZ3RoID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldO1xuICAgICAgICAgICAgaWYgKHNvdXJjZSkge1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2Ygc291cmNlICE9PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgICAgICAgICBGaXJlLmVycm9yKCdGaXJlLkpTLm1peGluOiBhcmd1bWVudHMgbXVzdCBiZSB0eXBlIG9iamVjdDonLCBzb3VyY2UpO1xuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZm9yICggdmFyIG5hbWUgaW4gc291cmNlKSB7XG4gICAgICAgICAgICAgICAgICAgIF9jb3B5cHJvcCggbmFtZSwgc291cmNlLCBvYmopO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gb2JqO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBEZXJpdmUgdGhlIGNsYXNzIGZyb20gdGhlIHN1cHBsaWVkIGJhc2UgY2xhc3MuXG4gICAgICogQm90aCBjbGFzc2VzIGFyZSBqdXN0IG5hdGl2ZSBqYXZhc2NyaXB0IGNvbnN0cnVjdG9ycywgbm90IGNyZWF0ZWQgYnkgRmlyZS5DbGFzcywgc29cbiAgICAgKiB1c3VhbGx5IHlvdSB3aWxsIHdhbnQgdG8gaW5oZXJpdCB1c2luZyB7JSBjcm9zc2xpbmsgRmlyZS5DbGFzcyBGaXJlLkNsYXNzICV9IGluc3RlYWQuXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIGV4dGVuZFxuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb259IGNsc1xuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb259IGJhc2UgLSB0aGUgYmFzZWNsYXNzIHRvIGluaGVyaXRcbiAgICAgKiBAcmV0dXJuIHtmdW5jdGlvbn0gdGhlIHJlc3VsdCBjbGFzc1xuICAgICAqL1xuICAgIGV4dGVuZDogZnVuY3Rpb24gKGNscywgYmFzZSkge1xuICAgICAgICBpZiAoRklSRV9ERVYpIHtcbiAgICAgICAgICAgIGlmICghYmFzZSkge1xuICAgICAgICAgICAgICAgIEZpcmUuZXJyb3IoJ1RoZSBiYXNlIGNsYXNzIHRvIGV4dGVuZCBmcm9tIG11c3QgYmUgbm9uLW5pbCcpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghY2xzKSB7XG4gICAgICAgICAgICAgICAgRmlyZS5lcnJvcignVGhlIGNsYXNzIHRvIGV4dGVuZCBtdXN0IGJlIG5vbi1uaWwnKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZm9yICh2YXIgcCBpbiBiYXNlKSBpZiAoYmFzZS5oYXNPd25Qcm9wZXJ0eShwKSkgY2xzW3BdID0gYmFzZVtwXTtcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBjbHM7IH1cbiAgICAgICAgX18ucHJvdG90eXBlID0gYmFzZS5wcm90b3R5cGU7XG4gICAgICAgIGNscy5wcm90b3R5cGUgPSBuZXcgX18oKTtcbiAgICAgICAgcmV0dXJuIGNscztcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogUmVtb3ZlcyBhbGwgZW51bWVyYWJsZSBwcm9wZXJ0aWVzIGZyb20gb2JqZWN0XG4gICAgICogQG1ldGhvZCBjbGVhclxuICAgICAqIEBwYXJhbSB7YW55fSBvYmpcbiAgICAgKi9cbiAgICBjbGVhcjogZnVuY3Rpb24gKG9iaikge1xuICAgICAgICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKG9iaik7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgZGVsZXRlIG9ialtrZXlzW2ldXTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiDmn6Xmib7miYDmnInniLbnsbvvvIznm7TliLDmib7liLDljp/lp4vlrprkuYkgcHJvcGVydHkg55qE5Zyw5pa5XG4gICAgICogQG1ldGhvZCBnZXRQcm9wZXJ0eURlc2NyaXB0b3JcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gb2JqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcbiAgICAgKiBAcmV0dXJuIHtvYmplY3R9XG4gICAgICovXG4gICAgZ2V0UHJvcGVydHlEZXNjcmlwdG9yOiBfZ2V0UHJvcGVydHlEZXNjcmlwdG9yXG59O1xuXG4vKipcbiAqIEdldCBjbGFzcyBuYW1lIG9mIHRoZSBvYmplY3QsIGlmIG9iamVjdCBpcyBqdXN0IGEge30gKGFuZCB3aGljaCBjbGFzcyBuYW1lZCAnT2JqZWN0JyksIGl0IHdpbGwgcmV0dXJuIG51bGwuXG4gKiAobW9kaWZpZWQgZnJvbSA8YSBocmVmPVwiaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8xMjQ5NTMxL2hvdy10by1nZXQtYS1qYXZhc2NyaXB0LW9iamVjdHMtY2xhc3NcIj50aGUgY29kZSBmcm9tIHRoaXMgc3RhY2tvdmVyZmxvdyBwb3N0PC9hPilcbiAqIEBtZXRob2QgZ2V0Q2xhc3NOYW1lXG4gKiBAcGFyYW0ge29iamVjdHxmdW5jdGlvbn0gb2JqIC0gaW5zdGFuY2Ugb3IgY29uc3RydWN0b3JcbiAqIEByZXR1cm4ge3N0cmluZ31cbiAqL1xuSlMuZ2V0Q2xhc3NOYW1lID0gZnVuY3Rpb24gKG9iaikge1xuICAgIGlmICh0eXBlb2Ygb2JqID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIGlmIChvYmoucHJvdG90eXBlLl9fY2xhc3NuYW1lX18pIHtcbiAgICAgICAgICAgIHJldHVybiBvYmoucHJvdG90eXBlLl9fY2xhc3NuYW1lX187XG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZiAob2JqICYmIG9iai5jb25zdHJ1Y3Rvcikge1xuICAgICAgICBpZiAob2JqLmNvbnN0cnVjdG9yLnByb3RvdHlwZSAmJiBvYmouY29uc3RydWN0b3IucHJvdG90eXBlLmhhc093blByb3BlcnR5KCdfX2NsYXNzbmFtZV9fJykpIHtcbiAgICAgICAgICAgIHJldHVybiBvYmouX19jbGFzc25hbWVfXztcbiAgICAgICAgfVxuICAgICAgICB2YXIgcmV0dmFsO1xuICAgICAgICAvLyAgZm9yIGJyb3dzZXJzIHdoaWNoIGhhdmUgbmFtZSBwcm9wZXJ0eSBpbiB0aGUgY29uc3RydWN0b3Igb2YgdGhlIG9iamVjdCwgc3VjaCBhcyBjaHJvbWVcbiAgICAgICAgaWYgKG9iai5jb25zdHJ1Y3Rvci5uYW1lKSB7XG4gICAgICAgICAgICByZXR2YWwgPSBvYmouY29uc3RydWN0b3IubmFtZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAob2JqLmNvbnN0cnVjdG9yLnRvU3RyaW5nKSB7XG4gICAgICAgICAgICB2YXIgYXJyLCBzdHIgPSBvYmouY29uc3RydWN0b3IudG9TdHJpbmcoKTtcbiAgICAgICAgICAgIGlmIChzdHIuY2hhckF0KDApID09PSAnWycpIHtcbiAgICAgICAgICAgICAgICAvLyBzdHIgaXMgXCJbb2JqZWN0IG9iamVjdENsYXNzXVwiXG4gICAgICAgICAgICAgICAgYXJyID0gc3RyLm1hdGNoKC9cXFtcXHcrXFxzKihcXHcrKVxcXS8pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gc3RyIGlzIGZ1bmN0aW9uIG9iamVjdENsYXNzICgpIHt9IGZvciBJRSBGaXJlZm94XG4gICAgICAgICAgICAgICAgYXJyID0gc3RyLm1hdGNoKC9mdW5jdGlvblxccyooXFx3KykvKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChhcnIgJiYgYXJyLmxlbmd0aCA9PT0gMikge1xuICAgICAgICAgICAgICAgIHJldHZhbCA9IGFyclsxXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmV0dmFsICE9PSAnT2JqZWN0JyA/IHJldHZhbCA6IG51bGw7XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xufTtcblxuLy8gaWQg5rOo5YaMXG4oZnVuY3Rpb24gKCkge1xuICAgIHZhciBfaWRUb0NsYXNzID0ge307XG4gICAgdmFyIF9uYW1lVG9DbGFzcyA9IHt9O1xuXG4gICAgZnVuY3Rpb24gZ2V0UmVnaXN0ZXIgKGtleSwgdGFibGUpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChpZCwgY29uc3RydWN0b3IpIHtcbiAgICAgICAgICAgIC8vIGRlcmVnaXN0ZXIgb2xkXG4gICAgICAgICAgICBpZiAoY29uc3RydWN0b3IucHJvdG90eXBlLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICAgICAgICBkZWxldGUgdGFibGVbY29uc3RydWN0b3IucHJvdG90eXBlW2tleV1dO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3RydWN0b3IucHJvdG90eXBlW2tleV0gPSBpZDtcbiAgICAgICAgICAgIC8vIHJlZ2lzdGVyIGNsYXNzXG4gICAgICAgICAgICBpZiAoaWQpIHtcbiAgICAgICAgICAgICAgICB2YXIgcmVnaXN0ZXJlZCA9IHRhYmxlW2lkXTtcbiAgICAgICAgICAgICAgICBpZiAocmVnaXN0ZXJlZCAmJiByZWdpc3RlcmVkICE9PSBjb25zdHJ1Y3Rvcikge1xuICAgICAgICAgICAgICAgICAgICB2YXIgZXJyb3IgPSAnQSBDbGFzcyBhbHJlYWR5IGV4aXN0cyB3aXRoIHRoZSBzYW1lICcgKyBrZXkgKyAnIDogXCInICsgaWQgKyAnXCIuJztcbiAgICAgICAgICAgICAgICAgICAgaWYgKEZJUkVfVEVTVCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3IgKz0gJyAoVGhpcyBtYXkgYmUgY2F1c2VkIGJ5IGVycm9yIG9mIHVuaXQgdGVzdC4pIFxcXG5JZiB5b3UgZG9udCBuZWVkIHNlcmlhbGl6YXRpb24sIHlvdSBjYW4gc2V0IGNsYXNzIGlkIHRvIFwiXCIuIFlvdSBjYW4gYWxzbyBjYWxsIFxcXG5GaXJlLkpTLnVucmVnaXN0ZXJDbGFzcyB0byByZW1vdmUgdGhlIGlkIG9mIHVudXNlZCBjbGFzcyc7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgRmlyZS5lcnJvcihlcnJvcik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0YWJsZVtpZF0gPSBjb25zdHJ1Y3RvcjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy9pZiAoaWQgPT09IFwiXCIpIHtcbiAgICAgICAgICAgICAgICAvLyAgICBjb25zb2xlLnRyYWNlKFwiXCIsIHRhYmxlID09PSBfbmFtZVRvQ2xhc3MpO1xuICAgICAgICAgICAgICAgIC8vfVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlZ2lzdGVyIHRoZSBjbGFzcyBieSBzcGVjaWZpZWQgaWQsIGlmIGl0cyBjbGFzc25hbWUgaXMgbm90IGRlZmluZWQsIHRoZSBjbGFzcyBuYW1lIHdpbGwgYWxzbyBiZSBzZXQuXG4gICAgICogQG1ldGhvZCBfc2V0Q2xhc3NJZFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBjbGFzc0lkXG4gICAgICogQHBhcmFtIHtmdW5jdGlvbn0gY29uc3RydWN0b3JcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIEpTLl9zZXRDbGFzc0lkID0gZ2V0UmVnaXN0ZXIoJ19fY2lkX18nLCBfaWRUb0NsYXNzKTtcblxuICAgIHZhciBkb1NldENsYXNzTmFtZSA9IGdldFJlZ2lzdGVyKCdfX2NsYXNzbmFtZV9fJywgX25hbWVUb0NsYXNzKTtcblxuICAgIC8qKlxuICAgICAqIFJlZ2lzdGVyIHRoZSBjbGFzcyBieSBzcGVjaWZpZWQgbmFtZSBtYW51YWxseVxuICAgICAqIEBtZXRob2Qgc2V0Q2xhc3NOYW1lXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGNsYXNzTmFtZVxuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb259IGNvbnN0cnVjdG9yXG4gICAgICovXG4gICAgSlMuc2V0Q2xhc3NOYW1lID0gZnVuY3Rpb24gKGNsYXNzTmFtZSwgY29uc3RydWN0b3IpIHtcbiAgICAgICAgZG9TZXRDbGFzc05hbWUoY2xhc3NOYW1lLCBjb25zdHJ1Y3Rvcik7XG4gICAgICAgIC8vIGF1dG8gc2V0IGNsYXNzIGlkXG4gICAgICAgIGlmIChjbGFzc05hbWUgJiYgIWNvbnN0cnVjdG9yLnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eSgnX19jaWRfXycpKSB7XG4gICAgICAgICAgICBKUy5fc2V0Q2xhc3NJZChjbGFzc05hbWUsIGNvbnN0cnVjdG9yKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBVbnJlZ2lzdGVyIGEgY2xhc3MgZnJvbSBmaXJlYmFsbC5cbiAgICAgKlxuICAgICAqIElmIHlvdSBkb250IG5lZWQgYSBjbGFzcyAod2hpY2ggZGVmaW5lZCBieSBGaXJlLmRlZmluZSBvciBGaXJlLnNldENsYXNzTmFtZSkgYW55bW9yZSxcbiAgICAgKiBZb3Ugc2hvdWxkIHVucmVnaXN0ZXIgdGhlIGNsYXNzIHNvIHRoYXQgRmlyZWJhbGwgd2lsbCBub3Qga2VlcCBpdHMgcmVmZXJlbmNlIGFueW1vcmUuXG4gICAgICogUGxlYXNlIG5vdGUgdGhhdCBpdHMgc3RpbGwgeW91ciByZXNwb25zaWJpbGl0eSB0byBmcmVlIG90aGVyIHJlZmVyZW5jZXMgdG8gdGhlIGNsYXNzLlxuICAgICAqXG4gICAgICogQG1ldGhvZCB1bnJlZ2lzdGVyQ2xhc3NcbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSAuLi5jb25zdHJ1Y3RvciAtIHRoZSBjbGFzcyB5b3Ugd2lsbCB3YW50IHRvIHVucmVnaXN0ZXIsIGFueSBudW1iZXIgb2YgY2xhc3NlcyBjYW4gYmUgYWRkZWRcbiAgICAgKi9cbiAgICBKUy51bnJlZ2lzdGVyQ2xhc3MgPSBmdW5jdGlvbiAoY29uc3RydWN0b3IpIHtcbiAgICAgICAgJ3VzZSBzdHJpY3QnO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdmFyIHAgPSBhcmd1bWVudHNbaV0ucHJvdG90eXBlO1xuICAgICAgICAgICAgdmFyIGNsYXNzSWQgPSBwLl9fY2lkX187XG4gICAgICAgICAgICBpZiAoY2xhc3NJZCkge1xuICAgICAgICAgICAgICAgIGRlbGV0ZSBfaWRUb0NsYXNzW2NsYXNzSWRdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIGNsYXNzbmFtZSA9IHAuX19jbGFzc25hbWVfXztcbiAgICAgICAgICAgIGlmIChjbGFzc25hbWUpIHtcbiAgICAgICAgICAgICAgICBkZWxldGUgX25hbWVUb0NsYXNzW2NsYXNzbmFtZV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogR2V0IHRoZSByZWdpc3RlcmVkIGNsYXNzIGJ5IGlkXG4gICAgICogQG1ldGhvZCBfZ2V0Q2xhc3NCeUlkXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGNsYXNzSWRcbiAgICAgKiBAcmV0dXJuIHtmdW5jdGlvbn0gY29uc3RydWN0b3JcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIEpTLl9nZXRDbGFzc0J5SWQgPSBmdW5jdGlvbiAoY2xhc3NJZCkge1xuICAgICAgICB2YXIgY2xzID0gX2lkVG9DbGFzc1tjbGFzc0lkXTtcbiAgICAgICAgaWYgKEZJUkVfRURJVE9SICYmICFjbHMpIHtcbiAgICAgICAgICAgIGlmIChjbGFzc0lkLmxlbmd0aCA9PT0gMzIpIHtcbiAgICAgICAgICAgICAgICAvLyDlsJ3or5Xop6PmnpDml6fnmoQgdXVpZCDljovnvKnmoLzlvI9cbiAgICAgICAgICAgICAgICBjbHMgPSBfaWRUb0NsYXNzW0VkaXRvci5jb21wcmVzc1V1aWQoY2xhc3NJZCldO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjbHM7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgcmVnaXN0ZXJlZCBjbGFzcyBieSBuYW1lXG4gICAgICogQG1ldGhvZCBnZXRDbGFzc0J5TmFtZVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBjbGFzc25hbWVcbiAgICAgKiBAcmV0dXJuIHtmdW5jdGlvbn0gY29uc3RydWN0b3JcbiAgICAgKi9cbiAgICBKUy5nZXRDbGFzc0J5TmFtZSA9IGZ1bmN0aW9uIChjbGFzc25hbWUpIHtcbiAgICAgICAgcmV0dXJuIF9uYW1lVG9DbGFzc1tjbGFzc25hbWVdO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBHZXQgY2xhc3MgaWQgb2YgdGhlIG9iamVjdFxuICAgICAqIEBtZXRob2QgX2dldENsYXNzSWRcbiAgICAgKiBAcGFyYW0ge29iamVjdHxmdW5jdGlvbn0gb2JqIC0gaW5zdGFuY2Ugb3IgY29uc3RydWN0b3JcbiAgICAgKiBAcmV0dXJuIHtzdHJpbmd9XG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBKUy5fZ2V0Q2xhc3NJZCA9IGZ1bmN0aW9uIChvYmopIHtcbiAgICAgICAgaWYgKHR5cGVvZiBvYmogPT09ICdmdW5jdGlvbicgJiYgb2JqLnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eSgnX19jaWRfXycpKSB7XG4gICAgICAgICAgICByZXR1cm4gb2JqLnByb3RvdHlwZS5fX2NpZF9fO1xuICAgICAgICB9XG4gICAgICAgIGlmIChvYmogJiYgb2JqLmNvbnN0cnVjdG9yKSB7XG4gICAgICAgICAgICB2YXIgcHJvdG90eXBlID0gb2JqLmNvbnN0cnVjdG9yLnByb3RvdHlwZTtcbiAgICAgICAgICAgIGlmIChwcm90b3R5cGUgJiYgcHJvdG90eXBlLmhhc093blByb3BlcnR5KCdfX2NpZF9fJykpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gb2JqLl9fY2lkX187XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuICcnO1xuICAgIH07XG5cbiAgICBpZiAoRklSRV9FRElUT1IpIHtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEpTLCAnX3JlZ2lzdGVyZWRDbGFzc0lkcycsIHtcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHZhciBkdW1wID0ge307XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaWQgaW4gX2lkVG9DbGFzcykge1xuICAgICAgICAgICAgICAgICAgICBkdW1wW2lkXSA9IF9pZFRvQ2xhc3NbaWRdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gZHVtcDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIEpTLmNsZWFyKF9pZFRvQ2xhc3MpO1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGlkIGluIHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIF9pZFRvQ2xhc3NbaWRdID0gdmFsdWVbaWRdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShKUywgJ19yZWdpc3RlcmVkQ2xhc3NOYW1lcycsIHtcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHZhciBkdW1wID0ge307XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaWQgaW4gX25hbWVUb0NsYXNzKSB7XG4gICAgICAgICAgICAgICAgICAgIGR1bXBbaWRdID0gX25hbWVUb0NsYXNzW2lkXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGR1bXA7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICBKUy5jbGVhcihfbmFtZVRvQ2xhc3MpO1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGlkIGluIHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIF9uYW1lVG9DbGFzc1tpZF0gPSB2YWx1ZVtpZF07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbn0pKCk7XG5cbi8qKlxuICogRGVmaW5lIGdldCBzZXQgYWNjZXNzb3IsIGp1c3QgaGVscCB0byBjYWxsIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSguLi4pXG4gKiBAbWV0aG9kIGdldHNldFxuICogQHBhcmFtIHthbnl9IG9ialxuICogQHBhcmFtIHtzdHJpbmd9IHByb3BcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IGdldHRlclxuICogQHBhcmFtIHtmdW5jdGlvbn0gc2V0dGVyXG4gKiBAcGFyYW0ge0Jvb2xlYW59IFtlbnVtZXJhYmxlPWZhbHNlXVxuICovXG5KUy5nZXRzZXQgPSBmdW5jdGlvbiAob2JqLCBwcm9wLCBnZXR0ZXIsIHNldHRlciwgZW51bWVyYWJsZSkge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIHByb3AsIHtcbiAgICAgICAgZ2V0OiBnZXR0ZXIsXG4gICAgICAgIHNldDogc2V0dGVyLFxuICAgICAgICBlbnVtZXJhYmxlOiAhIWVudW1lcmFibGVcbiAgICB9KTtcbn07XG5cbi8qKlxuICogRGVmaW5lIGdldCBhY2Nlc3NvciwganVzdCBoZWxwIHRvIGNhbGwgT2JqZWN0LmRlZmluZVByb3BlcnR5KC4uLilcbiAqIEBtZXRob2QgZ2V0XG4gKiBAcGFyYW0ge2FueX0gb2JqXG4gKiBAcGFyYW0ge3N0cmluZ30gcHJvcFxuICogQHBhcmFtIHtmdW5jdGlvbn0gZ2V0dGVyXG4gKiBAcGFyYW0ge0Jvb2xlYW59IFtlbnVtZXJhYmxlPWZhbHNlXVxuICovXG5KUy5nZXQgPSBmdW5jdGlvbiAob2JqLCBwcm9wLCBnZXR0ZXIsIGVudW1lcmFibGUpIHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBwcm9wLCB7XG4gICAgICAgIGdldDogZ2V0dGVyLFxuICAgICAgICBlbnVtZXJhYmxlOiAhIWVudW1lcmFibGVcbiAgICB9KTtcbn07XG5cbi8qKlxuICogRGVmaW5lIHNldCBhY2Nlc3NvciwganVzdCBoZWxwIHRvIGNhbGwgT2JqZWN0LmRlZmluZVByb3BlcnR5KC4uLilcbiAqIEBtZXRob2Qgc2V0XG4gKiBAcGFyYW0ge2FueX0gb2JqXG4gKiBAcGFyYW0ge3N0cmluZ30gcHJvcFxuICogQHBhcmFtIHtmdW5jdGlvbn0gc2V0dGVyXG4gKiBAcGFyYW0ge0Jvb2xlYW59IFtlbnVtZXJhYmxlPWZhbHNlXVxuICovXG5KUy5zZXQgPSBmdW5jdGlvbiAob2JqLCBwcm9wLCBzZXR0ZXIsIGVudW1lcmFibGUpIHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBwcm9wLCB7XG4gICAgICAgIHNldDogc2V0dGVyLFxuICAgICAgICBlbnVtZXJhYmxlOiAhIWVudW1lcmFibGVcbiAgICB9KTtcbn07XG5cbi8qKlxuICogRGVmaW5lcyBhIHBvbHlmaWxsIGZpZWxkIGZvciBvYnNvbGV0ZWQgY29kZXMuXG4gKiBAbWV0aG9kIG9ic29sZXRlXG4gKiBAcGFyYW0ge2FueX0gb2JqIC0gWW91ck9iamVjdCBvciBZb3VyQ2xhc3MucHJvdG90eXBlXG4gKiBAcGFyYW0ge3N0cmluZ30gb2Jzb2xldGVkIC0gXCJPbGRQYXJhbVwiIG9yIFwiWW91ckNsYXNzLk9sZFBhcmFtXCJcbiAqIEBwYXJhbSB7c3RyaW5nfSBuZXdQcm9wTmFtZSAtIFwiTmV3UGFyYW1cIlxuICogQHBhcmFtIHtib29sfSBbd3JpdGFibGU9ZmFsc2VdXG4gKi9cbkpTLm9ic29sZXRlID0gZnVuY3Rpb24gKG9iaiwgb2Jzb2xldGVkLCBuZXdQcm9wTmFtZSwgd3JpdGFibGUpIHtcbiAgICB2YXIgb2xkTmFtZSA9IG9ic29sZXRlZC5zcGxpdCgnLicpLnNsaWNlKC0xKTtcbiAgICBKUy5nZXQob2JqLCBvbGROYW1lLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmIChGSVJFX0RFVikge1xuICAgICAgICAgICAgRmlyZS53YXJuKCdcIiVzXCIgaXMgZGVwcmVjYXRlZCwgdXNlIFwiJXNcIiBpbnN0ZWFkIHBsZWFzZS4nLCBvYnNvbGV0ZWQsIG5ld1Byb3BOYW1lKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gb2JqW25ld1Byb3BOYW1lXTtcbiAgICB9KTtcbiAgICBpZiAod3JpdGFibGUpIHtcbiAgICAgICAgSlMuc2V0KG9iaiwgb2xkTmFtZSwgZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICBpZiAoRklSRV9ERVYpIHtcbiAgICAgICAgICAgICAgICBGaXJlLndhcm4oJ1wiJXNcIiBpcyBkZXByZWNhdGVkLCB1c2UgXCIlc1wiIGluc3RlYWQgcGxlYXNlLicsIG9ic29sZXRlZCwgbmV3UHJvcE5hbWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgb2JqW25ld1Byb3BOYW1lXSA9IHZhbHVlO1xuICAgICAgICB9KTtcbiAgICB9XG59O1xuXG4vKipcbiAqIERlZmluZXMgYWxsIHBvbHlmaWxsIGZpZWxkcyBmb3Igb2Jzb2xldGVkIGNvZGVzIGNvcnJlc3BvbmRpbmcgdG8gdGhlIGVudW1lcmFibGUgcHJvcGVydGllcyBvZiBwcm9wcy5cbiAqIEBtZXRob2Qgb2Jzb2xldGVzXG4gKiBAcGFyYW0ge2FueX0gb2JqIC0gWW91ck9iamVjdCBvciBZb3VyQ2xhc3MucHJvdG90eXBlXG4gKiBAcGFyYW0ge2FueX0gb2JqTmFtZSAtIFwiWW91ck9iamVjdFwiIG9yIFwiWW91ckNsYXNzXCJcbiAqIEBwYXJhbSB7b2JqZWN0fSBwcm9wc1xuICogQHBhcmFtIHtib29sfSBbd3JpdGFibGU9ZmFsc2VdXG4gKi9cbkpTLm9ic29sZXRlcyA9IGZ1bmN0aW9uIChvYmosIG9iak5hbWUsIHByb3BzLCB3cml0YWJsZSkge1xuICAgIGZvciAodmFyIG9ic29sZXRlZCBpbiBwcm9wcykge1xuICAgICAgICB2YXIgbmV3TmFtZSA9IHByb3BzW29ic29sZXRlZF07XG4gICAgICAgIEpTLm9ic29sZXRlKG9iaiwgb2JqTmFtZSArICcuJyArIG9ic29sZXRlZCwgbmV3TmFtZSwgd3JpdGFibGUpO1xuICAgIH1cbn07XG5cbi8qKlxuICogQGNsYXNzIEFycmF5XG4gKiBAc3RhdGljXG4gKi9cbkpTLkFycmF5ID0ge1xuICAgIC8qKlxuICAgICAqIFJlbW92ZXMgdGhlIGZpcnN0IG9jY3VycmVuY2Ugb2YgYSBzcGVjaWZpYyBvYmplY3QgZnJvbSB0aGUgYXJyYXkuXG4gICAgICogQG1ldGhvZCByZW1vdmVcbiAgICAgKiBAcGFyYW0ge2FueVtdfSBhcnJheVxuICAgICAqIEBwYXJhbSB7YW55fSB2YWx1ZVxuICAgICAqIEByZXR1cm4ge0Jvb2xlYW59XG4gICAgICovXG4gICAgcmVtb3ZlOiBmdW5jdGlvbiAoYXJyYXksIHZhbHVlKSB7XG4gICAgICAgIHZhciBpbmRleCA9IGFycmF5LmluZGV4T2YodmFsdWUpO1xuICAgICAgICBpZiAoaW5kZXggIT09IC0xKSB7XG4gICAgICAgICAgICBhcnJheS5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogUmVtb3ZlcyB0aGUgYXJyYXkgaXRlbSBhdCB0aGUgc3BlY2lmaWVkIGluZGV4LlxuICAgICAqIEBtZXRob2QgcmVtb3ZlQXRcbiAgICAgKiBAcGFyYW0ge2FueVtdfSBhcnJheVxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBpbmRleFxuICAgICAqL1xuICAgIHJlbW92ZUF0OiBmdW5jdGlvbiAoYXJyYXksIGluZGV4KSB7XG4gICAgICAgIGFycmF5LnNwbGljZShpbmRleCwgMSk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIERldGVybWluZXMgd2hldGhlciB0aGUgYXJyYXkgY29udGFpbnMgYSBzcGVjaWZpYyB2YWx1ZS5cbiAgICAgKiBAbWV0aG9kIGNvbnRhaW5zXG4gICAgICogQHBhcmFtIHthbnlbXX0gYXJyYXlcbiAgICAgKiBAcGFyYW0ge2FueX0gdmFsdWVcbiAgICAgKiBAcmV0dXJuIHtCb29sZWFufVxuICAgICAqL1xuICAgIGNvbnRhaW5zOiBmdW5jdGlvbiAoYXJyYXksIHZhbHVlKSB7XG4gICAgICAgIHJldHVybiBhcnJheS5pbmRleE9mKHZhbHVlKSAhPT0gLTE7XG4gICAgfVxufTtcblxuLyoqXG4gKiBAY2xhc3MgU3RyaW5nXG4gKiBAc3RhdGljXG4gKi9cbkpTLlN0cmluZyA9IHtcbiAgICAvKipcbiAgICAgKiBUaGUgc3RhcnRzV2l0aCgpIG1ldGhvZCBkZXRlcm1pbmVzIHdoZXRoZXIgYSBzdHJpbmcgYmVnaW5zIHdpdGggdGhlIGNoYXJhY3RlcnMgb2YgYW5vdGhlciBzdHJpbmcsIHJldHVybmluZyB0cnVlIG9yIGZhbHNlIGFzIGFwcHJvcHJpYXRlLlxuICAgICAqIEBtZXRob2Qgc3RhcnRzV2l0aFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzdHJpbmdcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc2VhcmNoU3RyaW5nIC0gVGhlIGNoYXJhY3RlcnMgdG8gYmUgc2VhcmNoZWQgZm9yIGF0IHRoZSBzdGFydCBvZiB0aGlzIHN0cmluZy5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gW3Bvc2l0aW9uPTBdIC0gT3B0aW9uYWwuIFRoZSBwb3NpdGlvbiBpbiB0aGlzIHN0cmluZyBhdCB3aGljaCB0byBiZWdpbiBzZWFyY2hpbmcgZm9yIHNlYXJjaFN0cmluZzsgZGVmYXVsdHMgdG8gMC5cbiAgICAgKiBAcmV0dXJuIHtCb29sZWFufVxuICAgICAqL1xuICAgIHN0YXJ0c1dpdGg6IFN0cmluZy5wcm90b3R5cGUuc3RhcnRzV2l0aCA/XG4gICAgICAgIGZ1bmN0aW9uIChzdHJpbmcsIHNlYXJjaFN0cmluZywgcG9zaXRpb24pIHtcbiAgICAgICAgICAgIHJldHVybiBzdHJpbmcuc3RhcnRzV2l0aChzZWFyY2hTdHJpbmcsIHBvc2l0aW9uKTtcbiAgICAgICAgfSA6XG4gICAgICAgIGZ1bmN0aW9uIChzdHJpbmcsIHNlYXJjaFN0cmluZywgcG9zaXRpb24pIHtcbiAgICAgICAgICAgIHBvc2l0aW9uID0gcG9zaXRpb24gfHwgMDtcbiAgICAgICAgICAgIHJldHVybiBzdHJpbmcubGFzdEluZGV4T2Yoc2VhcmNoU3RyaW5nLCBwb3NpdGlvbikgPT09IHBvc2l0aW9uO1xuICAgICAgICB9LFxuXG4gICAgLyoqXG4gICAgICogVGhpcyBtZXRob2QgbGV0cyB5b3UgZGV0ZXJtaW5lIHdoZXRoZXIgb3Igbm90IGEgc3RyaW5nIGVuZHMgd2l0aCBhbm90aGVyIHN0cmluZy5cbiAgICAgKiBAbWV0aG9kIHN0YXJ0c1dpdGhcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc3RyaW5nXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHNlYXJjaFN0cmluZyAtIFRoZSBjaGFyYWN0ZXJzIHRvIGJlIHNlYXJjaGVkIGZvciBhdCB0aGUgZW5kIG9mIHRoaXMgc3RyaW5nLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBbcG9zaXRpb249MF0gLSBPcHRpb25hbC4gU2VhcmNoIHdpdGhpbiB0aGlzIHN0cmluZyBhcyBpZiB0aGlzIHN0cmluZyB3ZXJlIG9ubHkgdGhpcyBsb25nOyBkZWZhdWx0cyB0byB0aGlzIHN0cmluZydzIGFjdHVhbCBsZW5ndGgsIGNsYW1wZWQgd2l0aGluIHRoZSByYW5nZSBlc3RhYmxpc2hlZCBieSB0aGlzIHN0cmluZydzIGxlbmd0aC5cbiAgICAgKiBAcmV0dXJuIHtCb29sZWFufVxuICAgICAqL1xuICAgIGVuZHNXaXRoOiBTdHJpbmcucHJvdG90eXBlLmVuZHNXaXRoID9cbiAgICAgICAgZnVuY3Rpb24gKHN0cmluZywgc2VhcmNoU3RyaW5nLCBwb3NpdGlvbikge1xuICAgICAgICAgICAgcmV0dXJuIHN0cmluZy5lbmRzV2l0aChzZWFyY2hTdHJpbmcsIHBvc2l0aW9uKTtcbiAgICAgICAgfSA6XG4gICAgICAgIGZ1bmN0aW9uIChzdHJpbmcsIHNlYXJjaFN0cmluZywgcG9zaXRpb24pIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgcG9zaXRpb24gPT09ICd1bmRlZmluZWQnIHx8IHBvc2l0aW9uID4gc3RyaW5nLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHBvc2l0aW9uID0gc3RyaW5nLmxlbmd0aDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHBvc2l0aW9uIC09IHNlYXJjaFN0cmluZy5sZW5ndGg7XG4gICAgICAgICAgICB2YXIgbGFzdEluZGV4ID0gc3RyaW5nLmluZGV4T2Yoc2VhcmNoU3RyaW5nLCBwb3NpdGlvbik7XG4gICAgICAgICAgICByZXR1cm4gbGFzdEluZGV4ICE9PSAtMSAmJiBsYXN0SW5kZXggPT09IHBvc2l0aW9uO1xuICAgICAgICB9XG59O1xuXG5GaXJlLkpTID0gSlM7XG5cbm1vZHVsZS5leHBvcnRzID0gSlM7XG4iLCJ2YXIgTG9hZGVycyA9IHJlcXVpcmUoJy4vbG9hZGVycycpO1xudmFyIENhbGxiYWNrc0ludm9rZXIgPSByZXF1aXJlKCcuL2NhbGxiYWNrcy1pbnZva2VyJyk7XG5cbmZ1bmN0aW9uIGdldEJ1aWx0aW5SYXdUeXBlcyAoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgaW1hZ2U6IHtcbiAgICAgICAgICAgIGxvYWRlcjogTG9hZGVycy5JbWFnZUxvYWRlcixcbiAgICAgICAgICAgIGRlZmF1bHRFeHRuYW1lOiAnLmhvc3QnXG4gICAgICAgIH0sXG4gICAgICAgIGpzb246IHtcbiAgICAgICAgICAgIGxvYWRlcjogTG9hZGVycy5Kc29uTG9hZGVyLFxuICAgICAgICAgICAgZGVmYXVsdEV4dG5hbWU6ICcuanNvbidcbiAgICAgICAgfSxcbiAgICAgICAgdGV4dDoge1xuICAgICAgICAgICAgbG9hZGVyOiBMb2FkZXJzLlRleHRMb2FkZXIsXG4gICAgICAgICAgICBkZWZhdWx0RXh0bmFtZTogJy50eHQnXG4gICAgICAgIH1cbiAgICB9O1xufVxuXG52YXIgdXJsVG9DYWxsYmFja3MgPSBuZXcgRmlyZS5DYWxsYmFja3NJbnZva2VyKCk7XG5cblxuIC8vIGxpc3Qgb2YgZWxlbWVudHMgdG8gbG9hZCwgdGhlIGVsZW1lbnQgdHlwZSBpcyB7XG4gLy8gICAgIHVybDogdXJsLFxuIC8vICAgICBsb2FkZXI6IGxvYWRlcixcbiAvLyAgICAgY2FsbGJhY2s6IGNhbGxiYWNrLFxuIC8vIH1cbnZhciBsb2FkUXVldWUgPSBbXTtcblxudmFyIGxvYWROZXh0ID0gZnVuY3Rpb24gKCkge1xuICAgIGlmIChMb2FkTWFuYWdlci5fY3VyQ29uY3VycmVudCA+PSBMb2FkTWFuYWdlci5tYXhDb25jdXJyZW50KSB7XG4gICAgICAgIEZpcmUuZXJyb3IoJ3RvbyBtYW55IGNvbmN1cnJlbnQgcmVxdWVzdHMnKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgbmV4dE9uZSA9IGxvYWRRdWV1ZS5wb3AoKTtcbiAgICBpZiAobmV4dE9uZSkge1xuICAgICAgICBkb0xvYWQobmV4dE9uZS5sb2FkZXIsIG5leHRPbmUudXJsLCBuZXh0T25lLmNhbGxiYWNrKTtcbiAgICB9XG59O1xuXG5mdW5jdGlvbiBkb0xvYWQgKGxvYWRlciwgdXJsLCBjYWxsYmFjaykge1xuICAgIExvYWRNYW5hZ2VyLl9jdXJDb25jdXJyZW50ICs9IDE7XG4gICAgbG9hZGVyKHVybCwgZnVuY3Rpb24gZG9Mb2FkQ0IgKGVycm9yLCBhc3NldCkge1xuICAgICAgICBjYWxsYmFjayhlcnJvciwgYXNzZXQpO1xuICAgICAgICBMb2FkTWFuYWdlci5fY3VyQ29uY3VycmVudCA9IE1hdGgubWF4KDAsIExvYWRNYW5hZ2VyLl9jdXJDb25jdXJyZW50IC0gMSk7XG4gICAgICAgIGxvYWROZXh0KCk7XG4gICAgfSk7XG59XG5cbi8qKlxuKiBUaGUgbWFuYWdlciBzY2hlZHVsaW5nIHJlc291cmNlcyBsb2FkaW5nXG4qIC0gSXQgd2lsbDpcbiogICAtIHNlbGVjdCByZWdpc3RlcmVkIGxvYWRlclxuKiAgIC0gbWVyZ2Ugc2FtZSB1cmwgcmVxdWVzdFxuKiAgIC0gbGltaXQgdGhlIG1heCBjb25jdXJyZW50IHJlcXVlc3RcbiogLSBJdCB3aWxsIE5PVDpcbiogICAtIGNhY2hlIHdoYXQgaGFzIGJlaW5nIGxvYWRlZFxuKiAgIC0gbG9hZCBkZXBlbmRzIG9mIHJlc291cmNlXG4qIEBjbGFzcyBMb2FkTWFuYWdlclxuKiBAc3RhdGljXG4qL1xudmFyIExvYWRNYW5hZ2VyID0ge1xuXG4gICAgLyoqXG4gICAgICogTWF4IGFsbG93ZWQgY29uY3VycmVudCByZXF1ZXN0IGNvdW50XG4gICAgICogQHByb3BlcnR5IG1heENvbmN1cnJlbnRcbiAgICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgICAqIEBkZWZhdWx0IDJcbiAgICAgKi9cbiAgICBtYXhDb25jdXJyZW50OiAyLFxuXG4gICAgLyoqXG4gICAgICogQ3VycmVudCBjb25jdXJyZW50IHJlcXVlc3QgY291bnRcbiAgICAgKiBAcHJvcGVydHkgX2N1ckNvbmN1cnJlbnRcbiAgICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgICAqIEByZWFkT25seVxuICAgICAqL1xuICAgIF9jdXJDb25jdXJyZW50OiAwLFxuXG4gICAgLyoqXG4gICAgICogTk9URTogUmVxdWVzdCB0aGUgc2FtZSB1cmwgd2l0aCBkaWZmZXJlbnQgbG9hZGVyIGlzIGRpc2FsbG93ZWRcbiAgICAgKiBAbWV0aG9kIGxvYWRCeUxvYWRlclxuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb259IGxvYWRlclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB1cmxcbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBjYWxsYmFja1xuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBjYWxsYmFjay5wYXJhbSBlcnJvciAtIG51bGwgb3IgdGhlIGVycm9yIGluZm9cbiAgICAgKiBAcGFyYW0ge2FueX0gY2FsbGJhY2sucGFyYW0gZGF0YSAtIHRoZSBsb2FkZWQgZGF0YVxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgbG9hZEJ5TG9hZGVyOiBmdW5jdGlvbiAobG9hZGVyLCB1cmwsIGNhbGxiYWNrKSB7XG4gICAgICAgIGlmICh1cmxUb0NhbGxiYWNrcy5hZGQodXJsLCBjYWxsYmFjaykpIHtcbiAgICAgICAgICAgIHZhciBjYWxsYmFja0J1bmRsZSA9IHVybFRvQ2FsbGJhY2tzLmJpbmRLZXkodXJsLCB0cnVlKTtcbiAgICAgICAgICAgIGlmICh0aGlzLl9jdXJDb25jdXJyZW50IDwgdGhpcy5tYXhDb25jdXJyZW50KSB7XG4gICAgICAgICAgICAgICAgZG9Mb2FkKGxvYWRlciwgdXJsLCBjYWxsYmFja0J1bmRsZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBsb2FkUXVldWUucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgIHVybDogdXJsLFxuICAgICAgICAgICAgICAgICAgICBsb2FkZXI6IGxvYWRlcixcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2s6IGNhbGxiYWNrQnVuZGxlXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogQG1ldGhvZCBsb2FkXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHVybFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSByYXdUeXBlXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IFtyYXdFeHRuYW1lXVxuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb259IGNhbGxiYWNrXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGNhbGxiYWNrLnBhcmFtIGVycm9yIC0gbnVsbCBvciB0aGUgZXJyb3IgaW5mb1xuICAgICAqIEBwYXJhbSB7YW55fSBjYWxsYmFjay5wYXJhbSBkYXRhIC0gdGhlIGxvYWRlZCBkYXRhXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBsb2FkOiBmdW5jdGlvbiAodXJsLCByYXdUeXBlLCByYXdFeHRuYW1lLCBjYWxsYmFjaykge1xuICAgICAgICBpZiAodHlwZW9mIHJhd0V4dG5hbWUgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNhbGxiYWNrID0gcmF3RXh0bmFtZTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgdHlwZUluZm8gPSB0aGlzLl9yYXdUeXBlc1tyYXdUeXBlXTtcbiAgICAgICAgaWYgKHR5cGVJbmZvKSB7XG4gICAgICAgICAgICB2YXIgZXh0bmFtZSA9IHJhd0V4dG5hbWUgPyAoJy4nICsgcmF3RXh0bmFtZSkgOiB0eXBlSW5mby5kZWZhdWx0RXh0bmFtZTtcbiAgICAgICAgICAgIGlmIChleHRuYW1lKSB7XG4gICAgICAgICAgICAgICAgdmFyIHJhd1VybCA9IHVybCArIGV4dG5hbWU7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkQnlMb2FkZXIodHlwZUluZm8ubG9hZGVyLCByYXdVcmwsIGNhbGxiYWNrKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrKG5ldyBFcnJvcignVW5kZWZpbmVkIGV4dG5hbWUgZm9yIHRoZSByYXcgJyArIHJhd1R5cGUgKyAnIGZpbGUgb2YgJyArIHVybCksIG51bGwpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY2FsbGJhY2sobmV3IEVycm9yKCdVbmtub3duIHJhdyB0eXBlIFwiJyArIHJhd1R5cGUgKyAnXCIgb2YgJyArIHVybCksIG51bGwpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIF9yYXdUeXBlczogZ2V0QnVpbHRpblJhd1R5cGVzKCksXG5cbiAgICAvKipcbiAgICAgKiBAbWV0aG9kIHJlZ2lzdGVyUmF3VHlwZXNcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcmF3VHlwZVxuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb259IGxvYWRlclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBkZWZhdWx0RXh0bmFtZVxuICAgICAqL1xuICAgIHJlZ2lzdGVyUmF3VHlwZXM6IGZ1bmN0aW9uIChyYXdUeXBlLCBsb2FkZXIsIGRlZmF1bHRFeHRuYW1lKSB7XG4gICAgICAgIGlmIChGSVJFX0RFVikge1xuICAgICAgICAgICAgaWYgKCFyYXdUeXBlKSB7XG4gICAgICAgICAgICAgICAgRmlyZS5lcnJvcignW0Fzc2V0TGlicmFyeS5yZWdpc3RlclJhd1R5cGVzXSByYXdUeXBlIG11c3QgYmUgbm9uLW5pbCcpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0eXBlb2YgcmF3VHlwZSAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICBGaXJlLmVycm9yKCdbQXNzZXRMaWJyYXJ5LnJlZ2lzdGVyUmF3VHlwZXNdIHJhd1R5cGUgbXVzdCBiZSBzdHJpbmcnKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIWxvYWRlcikge1xuICAgICAgICAgICAgICAgIEZpcmUuZXJyb3IoJ1tBc3NldExpYnJhcnkucmVnaXN0ZXJSYXdUeXBlc10gbG9hZGVyIG11c3QgYmUgbm9uLW5pbCcpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0eXBlb2YgbG9hZGVyICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgRmlyZS5lcnJvcignW0Fzc2V0TGlicmFyeS5yZWdpc3RlclJhd1R5cGVzXSBsb2FkZXIgbXVzdCBiZSBmdW5jdGlvbicpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5fcmF3VHlwZXNbcmF3VHlwZV0pIHtcbiAgICAgICAgICAgIEZpcmUuZXJyb3IoJ3Jhd1R5cGUgXCIlc1wiIGhhcyBhbHJlYWR5IGRlZmluZWQnLCByYXdUeXBlKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZGVmYXVsdEV4dG5hbWUgJiYgZGVmYXVsdEV4dG5hbWVbMF0gIT09ICcuJykge1xuICAgICAgICAgICAgZGVmYXVsdEV4dG5hbWUgPSAnLicgKyBkZWZhdWx0RXh0bmFtZTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9yYXdUeXBlc1tyYXdUeXBlXSA9IHtcbiAgICAgICAgICAgIGxvYWRlcjogbG9hZGVyLFxuICAgICAgICAgICAgZGVmYXVsdEV4dG5hbWU6IGRlZmF1bHRFeHRuYW1lXG4gICAgICAgIH07XG4gICAgfSxcblxuICAgIHJlc2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmIChGSVJFX0VESVRPUikge1xuICAgICAgICAgICAgdmFyIGF1ZGlvID0gdGhpcy5fcmF3VHlwZXMuYXVkaW87XG4gICAgICAgICAgICB0aGlzLl9yYXdUeXBlcyA9IGdldEJ1aWx0aW5SYXdUeXBlcygpO1xuICAgICAgICAgICAgdGhpcy5fcmF3VHlwZXMuYXVkaW8gPSBhdWRpbztcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBpc0xvYWRpbmc6IGZ1bmN0aW9uICh1cmwsIGFsc29DaGVja1Jhdykge1xuICAgICAgICBpZiAoRklSRV9FRElUT1IpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLl9jdXJDb25jdXJyZW50ID09PSAwKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHVybFRvQ2FsbGJhY2tzLmhhcyh1cmwpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoYWxzb0NoZWNrUmF3KSB7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgdSBpbiB1cmxUb0NhbGxiYWNrcy5fY2FsbGJhY2tUYWJsZSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAodS5pbmRleE9mKHVybCkgPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxufTtcblxuRmlyZS5Mb2FkTWFuYWdlciA9IExvYWRNYW5hZ2VyO1xuXG5tb2R1bGUuZXhwb3J0cyA9IExvYWRNYW5hZ2VyO1xuXG5pZiAoRklSRV9ERVYpIHtcbiAgICBMb2FkTWFuYWdlci5fdXJsVG9DYWxsYmFja3MgPSB1cmxUb0NhbGxiYWNrcztcbn1cbiIsInZhciBGaXJlVXJsID0gRklSRV9FRElUT1IgJiYgIUZJUkVfVEVTVCAmJiByZXF1aXJlKCdmaXJlLXVybCcpO1xuXG5mdW5jdGlvbiBJbWFnZUxvYWRlcih1cmwsIGNhbGxiYWNrLCBvblByb2dyZXNzKSB7XG4gICAgaWYgKEZJUkVfRURJVE9SICYmIEZpcmVVcmwpIHtcbiAgICAgICAgdXJsID0gRmlyZVVybC5hZGRSYW5kb21RdWVyeSh1cmwpO1xuICAgIH1cblxuICAgIHZhciBpbWFnZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuICAgIGltYWdlLmNyb3NzT3JpZ2luID0gJ0Fub255bW91cyc7XG5cbiAgICB2YXIgb25sb2FkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoY2FsbGJhY2spIHtcbiAgICAgICAgICAgIGNhbGxiYWNrKG51bGwsIHRoaXMpO1xuICAgICAgICB9XG4gICAgICAgIGltYWdlLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2xvYWQnLCBvbmxvYWQpO1xuICAgICAgICBpbWFnZS5yZW1vdmVFdmVudExpc3RlbmVyKCdlcnJvcicsIG9uZXJyb3IpO1xuICAgICAgICBpbWFnZS5yZW1vdmVFdmVudExpc3RlbmVyKCdwcm9ncmVzcycsIG9uUHJvZ3Jlc3MpO1xuICAgIH07XG4gICAgdmFyIG9uZXJyb3IgPSBmdW5jdGlvbiAobXNnLCBsaW5lLCB1cmwpIHtcbiAgICAgICAgaWYgKGNhbGxiYWNrKSB7XG4gICAgICAgICAgICB2YXIgZXJyb3IgPSBuZXcgRXJyb3IoJ0ZhaWxlZCB0byBsb2FkIGltYWdlOiAnICsgbXNnICsgJyBVcmw6ICcgKyB1cmwpO1xuICAgICAgICAgICAgY2FsbGJhY2soZXJyb3IsIG51bGwpO1xuICAgICAgICB9XG4gICAgICAgIGltYWdlLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2xvYWQnLCBvbmxvYWQpO1xuICAgICAgICBpbWFnZS5yZW1vdmVFdmVudExpc3RlbmVyKCdlcnJvcicsIG9uZXJyb3IpO1xuICAgICAgICBpbWFnZS5yZW1vdmVFdmVudExpc3RlbmVyKCdwcm9ncmVzcycsIG9uUHJvZ3Jlc3MpO1xuICAgIH07XG5cbiAgICBpbWFnZS5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgb25sb2FkKTtcbiAgICBpbWFnZS5hZGRFdmVudExpc3RlbmVyKCdlcnJvcicsIG9uZXJyb3IpO1xuICAgIGlmIChvblByb2dyZXNzKSB7XG4gICAgICAgIGltYWdlLmFkZEV2ZW50TGlzdGVuZXIoJ3Byb2dyZXNzJywgb25Qcm9ncmVzcyk7XG4gICAgfVxuICAgIGltYWdlLnNyYyA9IHVybDtcbiAgICByZXR1cm4gaW1hZ2U7XG59XG5cbkZpcmUuX0ltYWdlTG9hZGVyID0gSW1hZ2VMb2FkZXI7XG5cbi8vLyoqXG4vLyAqIEBwYXJhbSB7c3RyaW5nfSBbcmVzcG9uc2VUeXBlPVwidGV4dFwiXSAtIHRoZSBYTUxIdHRwUmVxdWVzdFJlc3BvbnNlVHlwZVxuLy8gKi9cbmZ1bmN0aW9uIF9Mb2FkRnJvbVhIUih1cmwsIGNhbGxiYWNrLCBvblByb2dyZXNzLCByZXNwb25zZVR5cGUpIHtcbiAgICB2YXIgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgLy94aHIud2l0aENyZWRlbnRpYWxzID0gdHJ1ZTsgICAvLyBJTlZBTElEX1NUQVRFX0VSUjogRE9NIEV4Y2VwdGlvbiAxMSBpbiBwaGFudG9tanNcbiAgICB2YXIgdG90YWwgPSAtMTtcbiAgICB4aHIub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoeGhyLnJlYWR5U3RhdGUgPT09IHhoci5ET05FKSB7XG4gICAgICAgICAgICBpZiAoY2FsbGJhY2spIHtcbiAgICAgICAgICAgICAgICBpZiAoeGhyLnN0YXR1cyA9PT0gMjAwIHx8IHhoci5zdGF0dXMgPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2sobnVsbCwgeGhyKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKG5ldyBFcnJvcignTG9hZEZyb21YSFI6IENvdWxkIG5vdCBsb2FkIFwiJyArIHVybCArICdcIiwgc3RhdHVzOiAnICsgeGhyLnN0YXR1cyksIG51bGwpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHhoci5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBudWxsO1xuICAgICAgICAgICAgLy94aHIub25sb2FkID0gbnVsbDtcbiAgICAgICAgICAgIGlmIChhZGRlZFByb2dyZXNzTGlzdGVuZXIpIHtcbiAgICAgICAgICAgICAgICB4aHIucmVtb3ZlRXZlbnRMaXN0ZW5lcigncHJvZ3Jlc3MnLCBhZGRlZFByb2dyZXNzTGlzdGVuZXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgaWYgKG9uUHJvZ3Jlc3MgJiYgeGhyLnJlYWR5U3RhdGUgPT09IHhoci5MT0FESU5HICYmICEoJ29ucHJvZ3Jlc3MnIGluIHhocikpIHtcbiAgICAgICAgICAgICAgICBpZiAodG90YWwgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIHRvdGFsID0geGhyLmdldFJlc3BvbnNlSGVhZGVyKCdDb250ZW50LUxlbmd0aCcpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBvblByb2dyZXNzKHhoci5yZXNwb25zZVRleHQubGVuZ3RoLCB0b3RhbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAob25Qcm9ncmVzcyAmJiB4aHIucmVhZHlTdGF0ZSA9PT0geGhyLkhFQURFUlNfUkVDRUlWRUQpIHtcbiAgICAgICAgICAgICAgICB0b3RhbCA9IHhoci5nZXRSZXNwb25zZUhlYWRlcignQ29udGVudC1MZW5ndGgnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG4gICAgLy94aHIub25sb2FkID0gZnVuY3Rpb24gKCkge1xuICAgIC8vICAgIGlmIChjYWxsYmFjaykge1xuICAgIC8vICAgICAgICBpZiAoeGhyLnN0YXR1cyA9PT0gMjAwIHx8IHhoci5zdGF0dXMgPT09IDApIHtcbiAgICAvLyAgICAgICAgICAgIGNhbGxiYWNrKHhocik7XG4gICAgLy8gICAgICAgIH1cbiAgICAvLyAgICAgICAgZWxzZSB7XG4gICAgLy8gICAgICAgICAgICBjYWxsYmFjayhudWxsLCAnTG9hZEZyb21YSFI6IENvdWxkIG5vdCBsb2FkIFwiJyArIHVybCArICdcIiwgc3RhdHVzOiAnICsgeGhyLnN0YXR1cyk7XG4gICAgLy8gICAgICAgIH1cbiAgICAvLyAgICB9XG4gICAgLy8gICAgeGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IG51bGw7XG4gICAgLy8gICAgeGhyLm9ubG9hZCA9IG51bGw7XG4gICAgLy8gICAgaWYgKGFkZGVkUHJvZ3Jlc3NMaXN0ZW5lcikge1xuICAgIC8vICAgICAgICB4aHIucmVtb3ZlRXZlbnRMaXN0ZW5lcigncHJvZ3Jlc3MnLCBhZGRlZFByb2dyZXNzTGlzdGVuZXIpO1xuICAgIC8vICAgIH1cbiAgICAvL307XG4gICAgeGhyLm9wZW4oJ0dFVCcsIHVybCwgdHJ1ZSk7XG4gICAgaWYgKHJlc3BvbnNlVHlwZSkge1xuICAgICAgICB4aHIucmVzcG9uc2VUeXBlID0gcmVzcG9uc2VUeXBlO1xuICAgIH1cbiAgICB2YXIgYWRkZWRQcm9ncmVzc0xpc3RlbmVyO1xuICAgIGlmIChvblByb2dyZXNzICYmICdvbnByb2dyZXNzJyBpbiB4aHIpIHtcbiAgICAgICAgYWRkZWRQcm9ncmVzc0xpc3RlbmVyID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICBpZiAoZXZlbnQubGVuZ3RoQ29tcHV0YWJsZSkge1xuICAgICAgICAgICAgICAgIG9uUHJvZ3Jlc3MoZXZlbnQubG9hZGVkLCBldmVudC50b3RhbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHhoci5hZGRFdmVudExpc3RlbmVyKCdwcm9ncmVzcycsIG9ucHJvZ3Jlc3MpO1xuICAgIH1cbiAgICB4aHIuc2VuZCgpO1xufVxuXG5mdW5jdGlvbiBUZXh0TG9hZGVyKHVybCwgY2FsbGJhY2ssIG9uUHJvZ3Jlc3MpIHtcbiAgICB2YXIgY2IgPSBjYWxsYmFjayAmJiBmdW5jdGlvbihlcnJvciwgeGhyKSB7XG4gICAgICAgIGlmICh4aHIgJiYgeGhyLnJlc3BvbnNlVGV4dCkge1xuICAgICAgICAgICAgY2FsbGJhY2sobnVsbCwgeGhyLnJlc3BvbnNlVGV4dCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjYWxsYmFjayhuZXcgRXJyb3IoJ1RleHRMb2FkZXI6IFwiJyArIHVybCArXG4gICAgICAgICAgICAgICAgJ1wiIHNlZW1zIHRvIGJlIHVucmVhY2hhYmxlIG9yIHRoZSBmaWxlIGlzIGVtcHR5LiBJbm5lck1lc3NhZ2U6ICcgKyBlcnJvciksIG51bGwpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBfTG9hZEZyb21YSFIodXJsLCBjYiwgb25Qcm9ncmVzcyk7XG59XG5cbi8qKlxuICogQG1ldGhvZCBfSnNvbkxvYWRlclxuICogQHBhcmFtIHtzdHJpbmd9IHVybFxuICogQHBhcmFtIHtmdW5jdGlvbn0gY2FsbGJhY2tcbiAqIEBwYXJhbSB7c3RyaW5nfSBjYWxsYmFjay5wYXJhbSBlcnJvciAtIG51bGwgb3IgdGhlIGVycm9yIGluZm9cbiAqIEBwYXJhbSB7b2JqZWN0fSBjYWxsYmFjay5wYXJhbSBkYXRhIC0gdGhlIGxvYWRlZCBqc29uIG9iamVjdCBvciBudWxsXG4gKiBAYXN5bmNcbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIEpzb25Mb2FkZXIodXJsLCBjYWxsYmFjaywgb25Qcm9ncmVzcykge1xuICAgIHZhciBjYiA9IGNhbGxiYWNrICYmIGZ1bmN0aW9uKGVycm9yLCB4aHIpIHtcbiAgICAgICAgaWYgKHhociAmJiB4aHIucmVzcG9uc2VUZXh0KSB7XG4gICAgICAgICAgICB2YXIganNvbjtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAganNvbiA9IEpTT04ucGFyc2UoeGhyLnJlc3BvbnNlVGV4dCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrKGUsIG51bGwpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhbGxiYWNrKG51bGwsIGpzb24pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY2FsbGJhY2sobmV3IEVycm9yKCdKc29uTG9hZGVyOiBcIicgKyB1cmwgK1xuICAgICAgICAgICAgICAgICdcIiBzZWVtcyB0byBiZSB1bnJlYWNoYWJsZSBvciB0aGUgZmlsZSBpcyBlbXB0eS4gSW5uZXJNZXNzYWdlOiAnICsgZXJyb3IpLCBudWxsKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgX0xvYWRGcm9tWEhSKHVybCwgY2IsIG9uUHJvZ3Jlc3MpO1xufVxuXG5GaXJlLl9Kc29uTG9hZGVyID0gSnNvbkxvYWRlcjtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgTG9hZEZyb21YSFI6IF9Mb2FkRnJvbVhIUixcbiAgICBJbWFnZUxvYWRlcjogSW1hZ2VMb2FkZXIsXG4gICAgVGV4dExvYWRlcjogVGV4dExvYWRlcixcbiAgICBKc29uTG9hZGVyOiBKc29uTG9hZGVyXG59O1xuIiwiXG4vKipcbiAqICEjZW4gT3V0cHV0cyBhIG1lc3NhZ2UgdG8gdGhlIEZpcmViYWxsIENvbnNvbGUgKGVkaXRvcikgb3IgV2ViIENvbnNvbGUgKHJ1bnRpbWUpLlxuICogISN6aCDlkJEgRmlyZWJhbGwg57yW6L6R5Zmo5o6n5Yi25Y+w5oiW5rWP6KeI5Zmo5o6n5Yi25Y+w6L6T5Ye65L+h5oGv44CCXG4gKiBAbWV0aG9kIGxvZ1xuICogQHBhcmFtIHthbnl8c3RyaW5nfSBvYmogLSAhI2VuIEEgSmF2YVNjcmlwdCBzdHJpbmcgY29udGFpbmluZyB6ZXJvIG9yIG1vcmUgc3Vic3RpdHV0aW9uIHN0cmluZ3MuICEjemgg5YyF5ZCr5LiA5Liq5oiW5aSa5Liq5pu/5LujIHN0cmluZ1xuICogQHBhcmFtIHthbnl9IC4uLnN1YnN0IC0gSmF2YVNjcmlwdCBvYmplY3RzIHdpdGggd2hpY2ggdG8gcmVwbGFjZSBzdWJzdGl0dXRpb24gc3RyaW5ncyB3aXRoaW4gbXNnLiBUaGlzIGdpdmVzIHlvdSBhZGRpdGlvbmFsIGNvbnRyb2wgb3ZlciB0aGUgZm9ybWF0IG9mIHRoZSBvdXRwdXQuXG4gKi9cbkZpcmUubG9nID0gZnVuY3Rpb24gKCkge1xuICAgIGNvbnNvbGUubG9nLmFwcGx5KGNvbnNvbGUsIGFyZ3VtZW50cyk7XG59O1xuXG4vKipcbiAqIE91dHB1dHMgYW4gaW5mb3JtYXRpb25hbCBtZXNzYWdlIHRvIHRoZSBGaXJlYmFsbCBDb25zb2xlIChlZGl0b3IpIG9yIFdlYiBDb25zb2xlIChydW50aW1lKS5cbiAqIC0gSW4gRmlyZWJhbGwsIGluZm8gaXMgYmx1ZS5cbiAqIC0gSW4gRmlyZWZveCBhbmQgQ2hyb21lLCBhIHNtYWxsIFwiaVwiIGljb24gaXMgZGlzcGxheWVkIG5leHQgdG8gdGhlc2UgaXRlbXMgaW4gdGhlIFdlYiBDb25zb2xlJ3MgbG9nLlxuICogQG1ldGhvZCBpbmZvXG4gKiBAcGFyYW0ge2FueXxzdHJpbmd9IG9iaiAtIEEgSmF2YVNjcmlwdCBzdHJpbmcgY29udGFpbmluZyB6ZXJvIG9yIG1vcmUgc3Vic3RpdHV0aW9uIHN0cmluZ3MuXG4gKiBAcGFyYW0ge2FueX0gLi4uc3Vic3QgLSBKYXZhU2NyaXB0IG9iamVjdHMgd2l0aCB3aGljaCB0byByZXBsYWNlIHN1YnN0aXR1dGlvbiBzdHJpbmdzIHdpdGhpbiBtc2cuIFRoaXMgZ2l2ZXMgeW91IGFkZGl0aW9uYWwgY29udHJvbCBvdmVyIHRoZSBmb3JtYXQgb2YgdGhlIG91dHB1dC5cbiAqL1xuRmlyZS5pbmZvID0gZnVuY3Rpb24gKCkge1xuICAgIChjb25zb2xlLmluZm8gfHwgY29uc29sZS5sb2cpLmFwcGx5KGNvbnNvbGUsIGFyZ3VtZW50cyk7XG59O1xuXG4vKipcbiAqIE91dHB1dHMgYSB3YXJuaW5nIG1lc3NhZ2UgdG8gdGhlIEZpcmViYWxsIENvbnNvbGUgKGVkaXRvcikgb3IgV2ViIENvbnNvbGUgKHJ1bnRpbWUpLlxuICogLSBJbiBGaXJlYmFsbCwgd2FybmluZyBpcyB5ZWxsb3cuXG4gKiAtIEluIENocm9tZSwgd2FybmluZyBoYXZlIGEgeWVsbG93IHdhcm5pbmcgaWNvbiB3aXRoIHRoZSBtZXNzYWdlIHRleHQuXG4gKiBAbWV0aG9kIHdhcm5cbiAqIEBwYXJhbSB7YW55fHN0cmluZ30gb2JqIC0gQSBKYXZhU2NyaXB0IHN0cmluZyBjb250YWluaW5nIHplcm8gb3IgbW9yZSBzdWJzdGl0dXRpb24gc3RyaW5ncy5cbiAqIEBwYXJhbSB7YW55fSAuLi5zdWJzdCAtIEphdmFTY3JpcHQgb2JqZWN0cyB3aXRoIHdoaWNoIHRvIHJlcGxhY2Ugc3Vic3RpdHV0aW9uIHN0cmluZ3Mgd2l0aGluIG1zZy4gVGhpcyBnaXZlcyB5b3UgYWRkaXRpb25hbCBjb250cm9sIG92ZXIgdGhlIGZvcm1hdCBvZiB0aGUgb3V0cHV0LlxuICovXG5GaXJlLndhcm4gPSBmdW5jdGlvbiAoKSB7XG4gICAgY29uc29sZS53YXJuLmFwcGx5KGNvbnNvbGUsIGFyZ3VtZW50cyk7XG59O1xuXG4vKipcbiAqIE91dHB1dHMgYW4gZXJyb3IgbWVzc2FnZSB0byB0aGUgRmlyZWJhbGwgQ29uc29sZSAoZWRpdG9yKSBvciBXZWIgQ29uc29sZSAocnVudGltZSkuXG4gKiAtIEluIEZpcmViYWxsLCBlcnJvciBpcyByZWQuXG4gKiAtIEluIENocm9tZSwgZXJyb3IgaGF2ZSBhIHJlZCBpY29uIGFsb25nIHdpdGggcmVkIG1lc3NhZ2UgdGV4dC5cbiAqIEBtZXRob2QgZXJyb3JcbiAqIEBwYXJhbSB7YW55fHN0cmluZ30gb2JqIC0gQSBKYXZhU2NyaXB0IHN0cmluZyBjb250YWluaW5nIHplcm8gb3IgbW9yZSBzdWJzdGl0dXRpb24gc3RyaW5ncy5cbiAqIEBwYXJhbSB7YW55fSAuLi5zdWJzdCAtIEphdmFTY3JpcHQgb2JqZWN0cyB3aXRoIHdoaWNoIHRvIHJlcGxhY2Ugc3Vic3RpdHV0aW9uIHN0cmluZ3Mgd2l0aGluIG1zZy4gVGhpcyBnaXZlcyB5b3UgYWRkaXRpb25hbCBjb250cm9sIG92ZXIgdGhlIGZvcm1hdCBvZiB0aGUgb3V0cHV0LlxuICovXG4vLyBlcnJvcuS8mmR1bXAgY2FsbCBzdGFja++8jOeUqGJpbmTlj6/ku6Xpgb/lhY1kdW1wIEZpcmUuZXJyb3Loh6rlt7HjgIJcbkZpcmUuZXJyb3IgPSBjb25zb2xlLmVycm9yLmJpbmQoY29uc29sZSk7XG5cbi8qKlxuICogc2hvdyBlcnJvciBzdGFja3MgaW4gdW5pdCB0ZXN0c1xuICogQG1ldGhvZCBfdGhyb3dcbiAqIEBwYXJhbSB7RXJyb3J9IGVycm9yXG4gKiBAcHJpdmF0ZVxuICovXG5GaXJlLl90aHJvdyA9IGZ1bmN0aW9uIChlcnJvcikge1xuICAgIEZpcmUuZXJyb3IoZXJyb3Iuc3RhY2sgfHwgZXJyb3IpO1xufTtcbiIsInZhciBKUyA9IHJlcXVpcmUoJy4vanMnKTtcblxudmFyIF9kMnIgPSBNYXRoLlBJIC8gMTgwLjA7XG52YXIgX3IyZCA9IDE4MC4wIC8gTWF0aC5QSTtcblxuLyoqXG4gKiAhI2VuXG4gKiBFeHRlbmRzIHRoZSBKYXZhU2NyaXB0IGJ1aWx0LWluIG9iamVjdCB0aGF0IGhhcyBwcm9wZXJ0aWVzIGFuZCBtZXRob2RzIGZvciBtYXRoZW1hdGljYWwgY29uc3RhbnRzIGFuZCBmdW5jdGlvbnMuXG4gKiBTZWUgW0dsb2JhbF9PYmplY3RzL01hdGggb24gTUROXShodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9NYXRoKVxuICogISN6aCDmianlsZUgSmF2YVNjcmlwdCDlhoXlu7rnmoTmlbDlraborqHnrpflsZ7mgKflkozmlrnms5XjgIJcbiAqIOivt+WPguiAg1tNRE7kuIrnmoRHbG9iYWxfT2JqZWN0cy9NYXRoXShodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9NYXRoKVxuICogQG1vZHVsZSBNYXRoXG4gKi9cbkpTLm1peGluIChNYXRoLCB7XG5cbiAgICAvKipcbiAgICAgKiBAcHJvcGVydHkgVFdPX1BJXG4gICAgICogQHR5cGUgbnVtYmVyXG4gICAgICovXG4gICAgVFdPX1BJOiAyLjAgKiBNYXRoLlBJLFxuXG4gICAgLyoqXG4gICAgICogQHByb3BlcnR5IEhBTEZfUElcbiAgICAgKiBAdHlwZSBudW1iZXJcbiAgICAgKi9cbiAgICBIQUxGX1BJOiAwLjUgKiBNYXRoLlBJLFxuXG4gICAgLyoqXG4gICAgICogZGVncmVlIHRvIHJhZGl1c1xuICAgICAqIEBwcm9wZXJ0eSBEMlJcbiAgICAgKiBAdHlwZSBudW1iZXJcbiAgICAgKi9cbiAgICBEMlI6IF9kMnIsXG5cbiAgICAvKipcbiAgICAgKiByYWRpdXMgdG8gZGVncmVlXG4gICAgICogQHByb3BlcnR5IFIyRFxuICAgICAqIEB0eXBlIG51bWJlclxuICAgICAqL1xuICAgIFIyRDogX3IyZCxcblxuICAgIC8qKlxuICAgICAqIGRlZ3JlZSB0byByYWRpdXNcbiAgICAgKiBAbWV0aG9kIGRlZzJyYWRcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gZGVncmVlXG4gICAgICogQHJldHVybiB7bnVtYmVyfSByYWRpdXNcbiAgICAgKi9cbiAgICBkZWcycmFkOiBmdW5jdGlvbiAoIGRlZ3JlZSApIHtcbiAgICAgICAgcmV0dXJuIGRlZ3JlZSAqIF9kMnI7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIHJhZGl1cyB0byBkZWdyZWVcbiAgICAgKiBAbWV0aG9kIHJhZDJkZWdcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gcmFkaXVzXG4gICAgICogQHJldHVybiB7bnVtYmVyfSBkZWdyZWVcbiAgICAgKi9cbiAgICByYWQyZGVnOiBmdW5jdGlvbiAoIHJhZGl1cyApIHtcbiAgICAgICAgcmV0dXJuIHJhZGl1cyAqIF9yMmQ7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIGxldCByYWRpdXMgaW4gLXBpIHRvIHBpXG4gICAgICogQG1ldGhvZCByYWQxODBcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gcmFkaXVzXG4gICAgICogQHJldHVybiB7bnVtYmVyfSBjbGFtcGVkIHJhZGl1c1xuICAgICAqL1xuICAgIHJhZDE4MDogZnVuY3Rpb24gKCByYWRpdXMgKSB7XG4gICAgICAgIGlmICggcmFkaXVzID4gTWF0aC5QSSB8fCByYWRpdXMgPCAtTWF0aC5QSSApIHtcbiAgICAgICAgICAgIHJhZGl1cyA9IChyYWRpdXMgKyBNYXRoLlRPV19QSSkgJSBNYXRoLlRPV19QSTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmFkaXVzO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBsZXQgcmFkaXVzIGluIDAgdG8gMnBpXG4gICAgICogQG1ldGhvZCByYWQzNjBcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gcmFkaXVzXG4gICAgICogQHJldHVybiB7bnVtYmVyfSBjbGFtcGVkIHJhZGl1c1xuICAgICAqL1xuICAgIHJhZDM2MDogZnVuY3Rpb24gKCByYWRpdXMgKSB7XG4gICAgICAgIGlmICggcmFkaXVzID4gTWF0aC5UV09fUEkgKVxuICAgICAgICAgICAgcmV0dXJuIHJhZGl1cyAlIE1hdGguVE9XX1BJO1xuICAgICAgICBlbHNlIGlmICggcmFkaXVzIDwgMC4wIClcbiAgICAgICAgICAgIHJldHVybiBNYXRoLlRPV19QSSArIHJhZGl1cyAlIE1hdGguVE9XX1BJO1xuICAgICAgICByZXR1cm4gcmFkaXVzO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBsZXQgZGVncmVlIGluIC0xODAgdG8gMTgwXG4gICAgICogQG1ldGhvZCBkZWcxODBcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gZGVncmVlXG4gICAgICogQHJldHVybiB7bnVtYmVyfSBjbGFtcGVkIGRlZ3JlZVxuICAgICAqL1xuXG4gICAgZGVnMTgwOiBmdW5jdGlvbiAoIGRlZ3JlZSApIHtcbiAgICAgICAgaWYgKCBkZWdyZWUgPiAxODAuMCB8fCBkZWdyZWUgPCAtMTgwLjAgKSB7XG4gICAgICAgICAgICBkZWdyZWUgPSAoZGVncmVlICsgMzYwLjApICUgMzYwLjA7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGRlZ3JlZTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogbGV0IGRlZ3JlZSBpbiAwIHRvIDM2MFxuICAgICAqIEBtZXRob2QgZGVnMzYwXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGRlZ3JlZVxuICAgICAqIEByZXR1cm4ge251bWJlcn0gY2xhbXBlZCBkZWdyZWVcbiAgICAgKi9cbiAgICBkZWczNjA6IGZ1bmN0aW9uICggZGVncmVlICkge1xuICAgICAgICBpZiAoIGRlZ3JlZSA+IDM2MC4wIClcbiAgICAgICAgICAgIHJldHVybiBkZWdyZWUgJSAzNjAuMDtcbiAgICAgICAgZWxzZSBpZiAoIGRlZ3JlZSA8IDAuMCApXG4gICAgICAgICAgICByZXR1cm4gMzYwLjAgKyBkZWdyZWUgJSAzNjAuMDtcbiAgICAgICAgcmV0dXJuIGRlZ3JlZTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhIGZsb2F0aW5nLXBvaW50IHJhbmRvbSBudW1iZXIgYmV0d2VlbiBtaW4gKGluY2x1c2l2ZSkgYW5kIG1heCAoZXhjbHVzaXZlKS5cbiAgICAgKiBAbWV0aG9kIHJhbmRvbVJhbmdlXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IG1pblxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBtYXhcbiAgICAgKiBAcmV0dXJuIHtudW1iZXJ9IHRoZSByYW5kb20gbnVtYmVyXG4gICAgICovXG4gICAgcmFuZG9tUmFuZ2U6IGZ1bmN0aW9uIChtaW4sIG1heCkge1xuICAgICAgICByZXR1cm4gTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4pICsgbWluO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGEgcmFuZG9tIGludGVnZXIgYmV0d2VlbiBtaW4gKGluY2x1c2l2ZSkgYW5kIG1heCAoZXhjbHVzaXZlKS5cbiAgICAgKiBAbWV0aG9kIHJhbmRvbVJhbmdlSW50XG4gICAgICogQHBhcmFtIHtudW1iZXJ9IG1pblxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBtYXhcbiAgICAgKiBAcmV0dXJuIHtudW1iZXJ9IHRoZSByYW5kb20gaW50ZWdlclxuICAgICAqL1xuICAgIHJhbmRvbVJhbmdlSW50OiBmdW5jdGlvbiAobWluLCBtYXgpIHtcbiAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IodGhpcy5yYW5kb21SYW5nZShtaW4sIG1heCkpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBDbGFtcHMgYSB2YWx1ZSBiZXR3ZWVuIGEgbWluaW11bSBmbG9hdCBhbmQgbWF4aW11bSBmbG9hdCB2YWx1ZS5cbiAgICAgKiBAbWV0aG9kIGNsYW1wXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHZhbFxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBtaW5cbiAgICAgKiBAcGFyYW0ge251bWJlcn0gbWF4XG4gICAgICogQHJldHVybiB7bnVtYmVyfVxuICAgICAqL1xuICAgIGNsYW1wOiBmdW5jdGlvbiAoIHZhbCwgbWluLCBtYXggKSB7XG4gICAgICAgIGlmICh0eXBlb2YgbWluICE9PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgRmlyZS5lcnJvcignW2NsYW1wXSBtaW4gdmFsdWUgbXVzdCBiZSB0eXBlIG51bWJlcicpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0eXBlb2YgbWF4ICE9PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgRmlyZS5lcnJvcignW2NsYW1wXSBtYXggdmFsdWUgbXVzdCBiZSB0eXBlIG51bWJlcicpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmIChtaW4gPiBtYXgpIHtcbiAgICAgICAgICAgIEZpcmUuZXJyb3IoJ1tjbGFtcF0gbWF4IHZhbHVlIG11c3Qgbm90IGxlc3MgdGhhbiBtaW4gdmFsdWUnKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gTWF0aC5taW4oIE1hdGgubWF4KCB2YWwsIG1pbiApLCBtYXggKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogQ2xhbXBzIGEgdmFsdWUgYmV0d2VlbiAwIGFuZCAxLlxuICAgICAqIEBtZXRob2QgY2xhbXAwMVxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB2YWxcbiAgICAgKiBAcmV0dXJuIHtudW1iZXJ9XG4gICAgICovXG4gICAgY2xhbXAwMTogZnVuY3Rpb24gKCB2YWwgKSB7XG4gICAgICAgIHJldHVybiBNYXRoLm1pbiggTWF0aC5tYXgoIHZhbCwgMCApLCAxICk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEBtZXRob2QgY2FsY3VsYXRlTWF4UmVjdFxuICAgICAqIEBwYXJhbSB7UmVjdH0gb3V0XG4gICAgICogQHBhcmFtIHtWZWMyfSBwMFxuICAgICAqIEBwYXJhbSB7VmVjMn0gcDFcbiAgICAgKiBAcGFyYW0ge1ZlYzJ9IHAyXG4gICAgICogQHBhcmFtIHtWZWMyfSBwM1xuICAgICAqIEByZXR1cm4ge1JlY3R9IGp1c3QgdGhlIG91dCByZWN0IGl0c2VsZlxuICAgICAqL1xuICAgIGNhbGN1bGF0ZU1heFJlY3Q6IGZ1bmN0aW9uIChvdXQsIHAwLCBwMSwgcDIsIHAzKSB7XG4gICAgICAgIHZhciBtaW5YID0gTWF0aC5taW4ocDAueCwgcDEueCwgcDIueCwgcDMueCk7XG4gICAgICAgIHZhciBtYXhYID0gTWF0aC5tYXgocDAueCwgcDEueCwgcDIueCwgcDMueCk7XG4gICAgICAgIHZhciBtaW5ZID0gTWF0aC5taW4ocDAueSwgcDEueSwgcDIueSwgcDMueSk7XG4gICAgICAgIHZhciBtYXhZID0gTWF0aC5tYXgocDAueSwgcDEueSwgcDIueSwgcDMueSk7XG4gICAgICAgIG91dC54ID0gbWluWDtcbiAgICAgICAgb3V0LnkgPSBtaW5ZO1xuICAgICAgICBvdXQud2lkdGggPSBtYXhYIC0gbWluWDtcbiAgICAgICAgb3V0LmhlaWdodCA9IG1heFkgLSBtaW5ZO1xuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBAbWV0aG9kIGxlcnBcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gZnJvbVxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB0b1xuICAgICAqIEBwYXJhbSB7bnVtYmVyfSByYXRpbyAtIHRoZSBpbnRlcnBvbGF0aW9uIGNvZWZmaWNpZW50XG4gICAgICogQHJldHVybiB7bnVtYmVyfVxuICAgICAqL1xuICAgIGxlcnA6IGZ1bmN0aW9uIChmcm9tLCB0bywgcmF0aW8pIHtcbiAgICAgICAgcmV0dXJuIGZyb20gKyAodG8gLSBmcm9tKSAqIHJhdGlvO1xuICAgIH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IE1hdGg7XG4iLCIvKipcbiAqIFRoZSB1dGlscyBmb3IgcGF0aCBvcGVyYXRpb25cbiAqIEBjbGFzcyBQYXRoXG4gKiBAc3RhdGljXG4gKi9cbmlmIChGaXJlLmlzTm9kZSkge1xuICAgIEZpcmUuUGF0aCA9IHJlcXVpcmUoJ3BhdGgnKTtcbn1cbmVsc2Uge1xuICAgIC8vIGltcGxlbWVudCBhIHNpbXBsZSBmYWxsYmFjayBpZiBub2RlIG5vdCBhdmFpbGFibGVcbiAgICBGaXJlLlBhdGggPSAoZnVuY3Rpb24gKCkge1xuXG4gICAgICAgIHZhciBzcGxpdFBhdGg7XG4gICAgICAgIGlmIChGaXJlLmlzV2luMzIpIHtcbiAgICAgICAgICAgIC8vIGNvcGllZCBmcm9tIG5vZGUuanMvbGliL3BhdGguanNcbiAgICAgICAgICAgIC8vIFJlZ2V4IHRvIHNwbGl0IGEgd2luZG93cyBwYXRoIGludG8gdGhyZWUgcGFydHM6IFsqLCBkZXZpY2UsIHNsYXNoLFxuICAgICAgICAgICAgLy8gdGFpbF0gd2luZG93cy1vbmx5XG4gICAgICAgICAgICB2YXIgc3BsaXREZXZpY2VSZSA9XG4gICAgICAgICAgICAgICAgL14oW2EtekEtWl06fFtcXFxcXFwvXXsyfVteXFxcXFxcL10rW1xcXFxcXC9dK1teXFxcXFxcL10rKT8oW1xcXFxcXC9dKT8oW1xcc1xcU10qPykkLztcblxuICAgICAgICAgICAgLy8gUmVnZXggdG8gc3BsaXQgdGhlIHRhaWwgcGFydCBvZiB0aGUgYWJvdmUgaW50byBbKiwgZGlyLCBiYXNlbmFtZSwgZXh0XVxuICAgICAgICAgICAgdmFyIHNwbGl0VGFpbFJlID1cbiAgICAgICAgICAgICAgICAvXihbXFxzXFxTXSo/KSgoPzpcXC57MSwyfXxbXlxcXFxcXC9dKz98KShcXC5bXi5cXC9cXFxcXSp8KSkoPzpbXFxcXFxcL10qKSQvO1xuXG4gICAgICAgICAgICAvLyBGdW5jdGlvbiB0byBzcGxpdCBhIGZpbGVuYW1lIGludG8gW3Jvb3QsIGRpciwgYmFzZW5hbWUsIGV4dF1cbiAgICAgICAgICAgIC8vIHdpbmRvd3MgdmVyc2lvblxuICAgICAgICAgICAgc3BsaXRQYXRoID0gZnVuY3Rpb24oZmlsZW5hbWUpIHtcbiAgICAgICAgICAgICAgICAvLyBTZXBhcmF0ZSBkZXZpY2Urc2xhc2ggZnJvbSB0YWlsXG4gICAgICAgICAgICAgICAgdmFyIHJlc3VsdCA9IHNwbGl0RGV2aWNlUmUuZXhlYyhmaWxlbmFtZSksXG4gICAgICAgICAgICAgICAgICAgIGRldmljZSA9IChyZXN1bHRbMV0gfHwgJycpICsgKHJlc3VsdFsyXSB8fCAnJyksXG4gICAgICAgICAgICAgICAgICAgIHRhaWwgPSByZXN1bHRbM10gfHwgJyc7XG4gICAgICAgICAgICAgICAgLy8gU3BsaXQgdGhlIHRhaWwgaW50byBkaXIsIGJhc2VuYW1lIGFuZCBleHRlbnNpb25cbiAgICAgICAgICAgICAgICB2YXIgcmVzdWx0MiA9IHNwbGl0VGFpbFJlLmV4ZWModGFpbCksXG4gICAgICAgICAgICAgICAgICAgIGRpciA9IHJlc3VsdDJbMV0sXG4gICAgICAgICAgICAgICAgICAgIGJhc2VuYW1lID0gcmVzdWx0MlsyXSxcbiAgICAgICAgICAgICAgICAgICAgZXh0ID0gcmVzdWx0MlszXTtcbiAgICAgICAgICAgICAgICByZXR1cm4gW2RldmljZSwgZGlyLCBiYXNlbmFtZSwgZXh0XTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAvLyBjb3BpZWQgZnJvbSBub2RlLmpzL2xpYi9wYXRoLmpzXG4gICAgICAgICAgICAvLyBTcGxpdCBhIGZpbGVuYW1lIGludG8gW3Jvb3QsIGRpciwgYmFzZW5hbWUsIGV4dF0sIHVuaXggdmVyc2lvblxuICAgICAgICAgICAgLy8gJ3Jvb3QnIGlzIGp1c3QgYSBzbGFzaCwgb3Igbm90aGluZy5cbiAgICAgICAgICAgIHZhciBzcGxpdFBhdGhSZSA9XG4gICAgICAgICAgICAgICAgL14oXFwvP3wpKFtcXHNcXFNdKj8pKCg/OlxcLnsxLDJ9fFteXFwvXSs/fCkoXFwuW14uXFwvXSp8KSkoPzpbXFwvXSopJC87XG4gICAgICAgICAgICBzcGxpdFBhdGggPSBmdW5jdGlvbihmaWxlbmFtZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBzcGxpdFBhdGhSZS5leGVjKGZpbGVuYW1lKS5zbGljZSgxKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgUGF0aCA9IHtcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogUmV0dXJuIHRoZSBsYXN0IHBvcnRpb24gb2YgYSBwYXRoLlxuICAgICAgICAgICAgICogQG1ldGhvZCBiYXNlbmFtZVxuICAgICAgICAgICAgICogQHBhcmFtIHtzdHJpbmd9IHBhdGhcbiAgICAgICAgICAgICAqIEByZXR1cm4ge3N0cmluZ31cbiAgICAgICAgICAgICAqXG4gICAgICAgICAgICAgKiBAZXhhbXBsZVxuICAgIHBhdGguYmFzZW5hbWUoJy9mb28vYmFyL2Jhei9hc2RmL3F1dXguaHRtbCcpICAgIC8vIHJldHVybnMgJ3F1dXguaHRtbCdcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgYmFzZW5hbWU6IGZ1bmN0aW9uIChwYXRoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHBhdGgucmVwbGFjZSgvXi4qKFxcXFx8XFwvfFxcOikvLCAnJyk7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIFJldHVybiB0aGUgZXh0ZW5zaW9uIG9mIHRoZSBwYXRoLCBmcm9tIHRoZSBsYXN0ICcuJyB0byBlbmQgb2Ygc3RyaW5nIGluIHRoZSBsYXN0IHBvcnRpb24gb2YgdGhlIHBhdGguXG4gICAgICAgICAgICAgKiBJZiB0aGVyZSBpcyBubyAnLicgaW4gdGhlIGxhc3QgcG9ydGlvbiBvZiB0aGUgcGF0aCBvciB0aGUgZmlyc3QgY2hhcmFjdGVyIG9mIGl0IGlzICcuJyxcbiAgICAgICAgICAgICAqIHRoZW4gaXQgcmV0dXJucyBhbiBlbXB0eSBzdHJpbmcuXG4gICAgICAgICAgICAgKlxuICAgICAgICAgICAgICogQG1ldGhvZCBleHRuYW1lXG4gICAgICAgICAgICAgKiBAcGFyYW0ge3N0cmluZ30gcGF0aFxuICAgICAgICAgICAgICogQHJldHVybiB7c3RyaW5nfVxuICAgICAgICAgICAgICpcbiAgICAgICAgICAgICAqIEBleGFtcGxlXG5wYXRoLmV4dG5hbWUoJ2luZGV4Lmh0bWwnKSAgICAgIC8vIHJldHVybnMgJy5odG1sJ1xucGF0aC5leHRuYW1lKCdpbmRleC5jb2ZmZWUubWQnKSAvLyByZXR1cm5zICcubWQnXG5wYXRoLmV4dG5hbWUoJ2luZGV4LicpICAgICAgICAgIC8vIHJldHVybnMgJy4nXG5wYXRoLmV4dG5hbWUoJ2luZGV4JykgICAgICAgICAgIC8vIHJldHVybnMgJydcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgZXh0bmFtZTogZnVuY3Rpb24gKHBhdGgpIHtcbiAgICAgICAgICAgICAgICBwYXRoID0gUGF0aC5iYXNlbmFtZShwYXRoKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gcGF0aC5zdWJzdHJpbmcoKH4tcGF0aC5sYXN0SW5kZXhPZihcIi5cIikgPj4+IDApICsgMSk7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIFJldHVybiB0aGUgZGlyZWN0b3J5IG5hbWUgb2YgYSBwYXRoLlxuICAgICAgICAgICAgICpcbiAgICAgICAgICAgICAqIEBtZXRob2QgZGlybmFtZVxuICAgICAgICAgICAgICogQHBhcmFtIHtzdHJpbmd9IHBhdGhcbiAgICAgICAgICAgICAqIEByZXR1cm4ge3N0cmluZ31cbiAgICAgICAgICAgICAqXG4gICAgICAgICAgICAgKiBAZXhhbXBsZVxucGF0aC5kaXJuYW1lKCcvZm9vL2Jhci9iYXovYXNkZi9xdXV4JykgLy8gcmV0dXJucyAnL2Zvby9iYXIvYmF6L2FzZGYnXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIGRpcm5hbWU6IGZ1bmN0aW9uIChwYXRoKSB7XG4gICAgICAgICAgICAgICAgLy8gY29waWVkIGZyb20gbm9kZS5qcy9saWIvcGF0aC5qc1xuICAgICAgICAgICAgICAgIHZhciByZXN1bHQgPSBzcGxpdFBhdGgocGF0aCksXG4gICAgICAgICAgICAgICAgICAgIHJvb3QgPSByZXN1bHRbMF0sXG4gICAgICAgICAgICAgICAgICAgIGRpciA9IHJlc3VsdFsxXTtcblxuICAgICAgICAgICAgICAgIGlmICghcm9vdCAmJiAhZGlyKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIE5vIGRpcm5hbWUgd2hhdHNvZXZlclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJy4nO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChkaXIpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gSXQgaGFzIGEgZGlybmFtZSwgc3RyaXAgdHJhaWxpbmcgc2xhc2hcbiAgICAgICAgICAgICAgICAgICAgZGlyID0gZGlyLnN1YnN0cigwLCBkaXIubGVuZ3RoIC0gMSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJvb3QgKyBkaXI7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIFRoZSBwbGF0Zm9ybS1zcGVjaWZpYyBmaWxlIHNlcGFyYXRvci4gJ1xcXFwnIG9yICcvJy5cbiAgICAgICAgICAgICAqIEBwcm9wZXJ0eSBzZXBcbiAgICAgICAgICAgICAqIEB0eXBlIHtzdHJpbmd9XG4gICAgICAgICAgICAgKiBAZGVmYXVsdCB3aW5kb3dzOiBcIlxcXCIsIG1hYzogXCIvXCJcbiAgICAgICAgICAgICAqIEByZWFkT25seVxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBzZXA6IChGaXJlLmlzV2luMzIgPyAnXFxcXCcgOiAnLycpXG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBQYXRoO1xuICAgIH0pKCk7XG59XG5cbi8qKlxuICogQG1ldGhvZCBzZXRFeHRuYW1lXG4gKiBAcGFyYW0ge3N0cmluZ30gcGF0aFxuICogQHBhcmFtIHtzdHJpbmd9IG5ld0V4dGVuc2lvbiAtIGV4dGVuc2lvbiB0byByZXBsYWNlIHdpdGhcbiAqIEByZXR1cm4ge3N0cmluZ30gcmVzdWx0XG4gKi9cbkZpcmUuUGF0aC5zZXRFeHRuYW1lID0gZnVuY3Rpb24gKHBhdGgsIG5ld0V4dGVuc2lvbikge1xuICAgIC8vIGlmIChGaXJlLmlzTm9kZSkgcmV0dXJuIFBhdGguam9pbihQYXRoLmRpcm5hbWUocGF0aCksIFBhdGguYmFzZW5hbWUocGF0aCwgUGF0aC5leHRuYW1lKHBhdGgpKSkgKyBuZXdFeHRlbnNpb247XG4gICAgdmFyIGRvdEluZGV4ID0gKH4tcGF0aC5sYXN0SW5kZXhPZihcIi5cIikgPj4+IDApICsgMTtcbiAgICByZXR1cm4gcGF0aC5zdWJzdHJpbmcoMCwgZG90SW5kZXgpICsgbmV3RXh0ZW5zaW9uO1xufTtcblxuLyoqXG4gKiBAbWV0aG9kIHNldEVuZFdpdGhTZXBcbiAqIEBwYXJhbSB7c3RyaW5nfSBwYXRoXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtlbmRXaXRoU2VwID0gdHJ1ZV1cbiAqIEBwYXJhbSB7c3RyaW5nfSBbc2VwID0gRmlyZS5QYXRoLnNlcF1cbiAqIEByZXR1cm4ge3N0cmluZ30gcmVzdWx0XG4gKi9cbkZpcmUuUGF0aC5zZXRFbmRXaXRoU2VwID0gZnVuY3Rpb24gKHBhdGgsIGVuZFdpdGhTZXAsIHNlcCkge1xuICAgIGVuZFdpdGhTZXAgPSAodHlwZW9mIGVuZFdpdGhTZXAgIT09ICd1bmRlZmluZWQnKSA/IGVuZFdpdGhTZXAgOiB0cnVlO1xuXG4gICAgdmFyIGVuZENoYXIgPSBwYXRoW3BhdGgubGVuZ3RoIC0gMV07XG4gICAgdmFyIG9sZEVuZFdpdGhTZXAgPSAoZW5kQ2hhciA9PT0gJ1xcXFwnIHx8IGVuZENoYXIgPT09ICcvJyk7XG4gICAgaWYgKCFvbGRFbmRXaXRoU2VwICYmIGVuZFdpdGhTZXApIHtcbiAgICAgICAgcGF0aCArPSAoc2VwIHx8IEZpcmUuUGF0aC5zZXApO1xuICAgIH1cbiAgICBlbHNlIGlmIChvbGRFbmRXaXRoU2VwICYmICFlbmRXaXRoU2VwKSB7XG4gICAgICAgIHBhdGggPSBwYXRoLnNsaWNlKDAsIC0xKTtcbiAgICB9XG4gICAgcmV0dXJuIHBhdGg7XG59O1xuIiwidmFyIEpTID0gcmVxdWlyZSgnLi9qcycpO1xudmFyIEV2ZW50VGFyZ2V0ID0gcmVxdWlyZSgnLi9ldmVudC9ldmVudC10YXJnZXQnKTtcblxudmFyIFBsYXlhYmxlID0gKGZ1bmN0aW9uICgpIHtcbiAgICAvKipcbiAgICAgKiBAY2xhc3MgUGxheWFibGVcbiAgICAgKiBAY29uc3RydWN0b3JcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBQbGF5YWJsZSAoKSB7XG4gICAgICAgIHRoaXMuX2lzUGxheWluZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9pc1BhdXNlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9pc1VwZGF0aW5nID0gZmFsc2U7ICAgLy8gdG8gY2FjaGUgdGhlIHJlc3VsdCBvZiBfaXNQbGF5aW5nICYmICFfaXNQYXVzZWRcbiAgICAgICAgdGhpcy5fc3RlcE9uY2UgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBKUy5leHRlbmQoUGxheWFibGUsIEV2ZW50VGFyZ2V0KTtcblxuICAgIHZhciBwcm90b3R5cGUgPSBQbGF5YWJsZS5wcm90b3R5cGU7XG5cbiAgICAvKipcbiAgICAgKiBJcyBwbGF5aW5nP1xuICAgICAqIFRoaXMgcHJvcGVydHkgaWdub3JlcyB0aGUgcGF1c2VkIHN0YXRlLCBzbyBldmVuIGl0IGlzIGN1cnJlbnRseSBwYXVzZWQsIHRoaXMgcHJvcGVydHkgc3RpbGwgdHJ1ZS5cbiAgICAgKlxuICAgICAqIEBwcm9wZXJ0eSBpc1BsYXlpbmdcbiAgICAgKiBAdHlwZSB7Qm9vbGVhbn1cbiAgICAgKiBAZGVmYXVsdCBmYWxzZVxuICAgICAqIEByZWFkT25seVxuICAgICAqL1xuICAgIEpTLmdldChwcm90b3R5cGUsICdpc1BsYXlpbmcnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pc1BsYXlpbmc7XG4gICAgfSwgdHJ1ZSk7XG5cbiAgICAvKipcbiAgICAgKiBJcyBjdXJyZW50bHkgdXBkYXRpbmc/XG4gICAgICogVGhpcyBwcm9wZXJ0eSBpcyBqdXN0IHRoZSByZXN1bHQgb2YgKHRoaXMuaXNQbGF5aW5nID09IHRydWUgJiYgdGhpcy5pc1BhdXNlZCA9PSBmYWxzZSlcbiAgICAgKlxuICAgICAqIEBwcm9wZXJ0eSBpc1VwZGF0aW5nXG4gICAgICogQHR5cGUge0Jvb2xlYW59XG4gICAgICogQGRlZmF1bHQgZmFsc2VcbiAgICAgKiBAcmVhZE9ubHlcbiAgICAgKi9cbiAgICBKUy5nZXQocHJvdG90eXBlLCAnaXNVcGRhdGluZycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2lzVXBkYXRpbmc7XG4gICAgfSwgdHJ1ZSk7XG5cbiAgICAvKipcbiAgICAgKiBJcyBjdXJyZW50bHkgcGF1c2VkPyBUaGlzIGNhbiBiZSB0cnVlIGV2ZW4gaWYgaW4gZWRpdCBtb2RlKGlzUGxheWluZyA9PSBmYWxzZSkuXG4gICAgICogQHByb3BlcnR5IGlzUGF1c2VkXG4gICAgICogQHR5cGUge0Jvb2xlYW59XG4gICAgICogQGRlZmF1bHQgZmFsc2VcbiAgICAgKiBAcmVhZE9ubHlcbiAgICAgKi9cbiAgICBKUy5nZXQocHJvdG90eXBlLCAnaXNQYXVzZWQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pc1BhdXNlZDtcbiAgICB9LCB0cnVlKTtcblxuICAgIC8vIHZpcnR1YWxcblxuICAgIHZhciB2aXJ0dWFsID0gZnVuY3Rpb24gKCkge307XG4gICAgLyoqXG4gICAgICogQG1ldGhvZCBvblBsYXlcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIHByb3RvdHlwZS5vblBsYXkgPSB2aXJ0dWFsO1xuICAgIC8qKlxuICAgICAqIEBtZXRob2Qgb25QYXVzZVxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgcHJvdG90eXBlLm9uUGF1c2UgPSB2aXJ0dWFsO1xuICAgIC8qKlxuICAgICAqIEBtZXRob2Qgb25SZXN1bWVcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIHByb3RvdHlwZS5vblJlc3VtZSA9IHZpcnR1YWw7XG4gICAgLyoqXG4gICAgICogQG1ldGhvZCBvblN0b3BcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIHByb3RvdHlwZS5vblN0b3AgPSB2aXJ0dWFsO1xuICAgIC8qKlxuICAgICAqIEBtZXRob2Qgb25FcnJvclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBlcnJvckNvZGVcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIHByb3RvdHlwZS5vbkVycm9yID0gdmlydHVhbDtcblxuICAgIC8vIHB1YmxpY1xuXG4gICAgLyoqXG4gICAgICogQG1ldGhvZCBwbGF5XG4gICAgICovXG4gICAgcHJvdG90eXBlLnBsYXkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0aGlzLl9pc1BsYXlpbmcpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLl9pc1BhdXNlZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2lzUGF1c2VkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdGhpcy5faXNVcGRhdGluZyA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy5vblJlc3VtZSgpO1xuICAgICAgICAgICAgICAgIHRoaXMuZW1pdCgncmVzdW1lJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLm9uRXJyb3IoJ2FscmVhZHktcGxheWluZycpO1xuICAgICAgICAgICAgICAgIC8vdGhpcy5lbWl0KCdlcnJvcicsICdhbHJlYWR5LXBsYXknKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX2lzUGxheWluZyA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLl9pc1VwZGF0aW5nID0gIXRoaXMuX2lzUGF1c2VkO1xuICAgICAgICAgICAgdGhpcy5vblBsYXkoKTtcbiAgICAgICAgICAgIHRoaXMuZW1pdCgncGxheScpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEBtZXRob2Qgc3RvcFxuICAgICAqL1xuICAgIHByb3RvdHlwZS5zdG9wID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodGhpcy5faXNQbGF5aW5nKSB7XG4gICAgICAgICAgICB0aGlzLl9pc1BsYXlpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuX2lzUGF1c2VkID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLl9pc1VwZGF0aW5nID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLmVtaXQoJ3N0b3AnKTtcbiAgICAgICAgICAgIHRoaXMub25TdG9wKCk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogQG1ldGhvZCBwYXVzZVxuICAgICAqL1xuICAgIHByb3RvdHlwZS5wYXVzZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5faXNQYXVzZWQgPSB0cnVlO1xuICAgICAgICB0aGlzLl9pc1VwZGF0aW5nID0gZmFsc2U7XG4gICAgICAgIHRoaXMuZW1pdCgncGF1c2UnKTtcbiAgICAgICAgdGhpcy5vblBhdXNlKCk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFBlcmZvcm0gYSBzaW5nbGUgZnJhbWUgc3RlcC5cbiAgICAgKiBAbWV0aG9kIHN0ZXBcbiAgICAgKi9cbiAgICBwcm90b3R5cGUuc3RlcCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5wYXVzZSgpO1xuICAgICAgICB0aGlzLl9zdGVwT25jZSA9IHRydWU7XG4gICAgICAgIGlmICghdGhpcy5faXNQbGF5aW5nKSB7XG4gICAgICAgICAgICB0aGlzLnBsYXkoKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICByZXR1cm4gUGxheWFibGU7XG59KSgpO1xuXG5GaXJlLlBsYXlhYmxlID0gUGxheWFibGU7XG5cbm1vZHVsZS5leHBvcnRzID0gUGxheWFibGU7XG4iLCJ2YXIgSlMgPSByZXF1aXJlKCcuL2pzJyk7XG5cbkZpcmUuUG9seWdvbiA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gUG9seWdvbiggcG9pbnRzICkge1xuICAgICAgICB0aGlzLnBvaW50cyA9IHBvaW50cztcblxuICAgICAgICBpZiAoIHRoaXMucG9pbnRzLmxlbmd0aCA8IDMgKSB7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oIFwiSW52YWxpZCBwb2x5Z29uLCB0aGUgZGF0YSBtdXN0IGNvbnRhaW5zIDMgb3IgbW9yZSBwb2ludHMuXCIgKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBKUy5zZXRDbGFzc05hbWUoJ0ZpcmUuUG9seWdvbicsIFBvbHlnb24pO1xuXG4gICAgUG9seWdvbi5wcm90b3R5cGUuaW50ZXJzZWN0cyA9IGZ1bmN0aW9uICggcG9seWdvbiApIHtcbiAgICAgICAgcmV0dXJuIEludGVyc2VjdGlvbi5wb2x5Z29uUG9seWdvbiggdGhpcywgcG9seWdvbiApO1xuICAgIH07XG5cbiAgICBQb2x5Z29uLnByb3RvdHlwZS5jb250YWlucyA9IGZ1bmN0aW9uICggcG9pbnQgKSB7XG4gICAgICAgIHZhciBpbnNpZGUgPSBmYWxzZTtcbiAgICAgICAgdmFyIHggPSBwb2ludC54O1xuICAgICAgICB2YXIgeSA9IHBvaW50Lnk7XG5cbiAgICAgICAgLy8gdXNlIHNvbWUgcmF5Y2FzdGluZyB0byB0ZXN0IGhpdHNcbiAgICAgICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL3N1YnN0YWNrL3BvaW50LWluLXBvbHlnb24vYmxvYi9tYXN0ZXIvaW5kZXguanNcbiAgICAgICAgdmFyIGxlbmd0aCA9IHRoaXMucG9pbnRzLmxlbmd0aDtcblxuICAgICAgICBmb3IgKCB2YXIgaSA9IDAsIGogPSBsZW5ndGgtMTsgaSA8IGxlbmd0aDsgaiA9IGkrKyApIHtcbiAgICAgICAgICAgIHZhciB4aSA9IHRoaXMucG9pbnRzW2ldLngsIHlpID0gdGhpcy5wb2ludHNbaV0ueSxcbiAgICAgICAgICAgICAgICB4aiA9IHRoaXMucG9pbnRzW2pdLngsIHlqID0gdGhpcy5wb2ludHNbal0ueSxcbiAgICAgICAgICAgICAgICBpbnRlcnNlY3QgPSAoKHlpID4geSkgIT09ICh5aiA+IHkpKSAmJiAoeCA8ICh4aiAtIHhpKSAqICh5IC0geWkpIC8gKHlqIC0geWkpICsgeGkpO1xuXG4gICAgICAgICAgICBpZiAoIGludGVyc2VjdCApIGluc2lkZSA9ICFpbnNpZGU7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gaW5zaWRlO1xuICAgIH07XG5cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoUG9seWdvbi5wcm90b3R5cGUsICdjZW50ZXInLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKCB0aGlzLnBvaW50cy5sZW5ndGggPCAzIClcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcblxuICAgICAgICAgICAgdmFyIG1pbl94ID0gdGhpcy5wb2ludHNbMF0ueDtcbiAgICAgICAgICAgIHZhciBtaW5feSA9IHRoaXMucG9pbnRzWzBdLnk7XG4gICAgICAgICAgICB2YXIgbWF4X3ggPSB0aGlzLnBvaW50c1swXS54O1xuICAgICAgICAgICAgdmFyIG1heF95ID0gdGhpcy5wb2ludHNbMF0ueTtcblxuICAgICAgICAgICAgZm9yICggdmFyIGkgPSAxOyBpIDwgdGhpcy5wb2ludHMubGVuZ3RoOyArK2kgKSB7XG4gICAgICAgICAgICAgICAgdmFyIHggPSB0aGlzLnBvaW50c1tpXS54O1xuICAgICAgICAgICAgICAgIHZhciB5ID0gdGhpcy5wb2ludHNbaV0ueTtcblxuICAgICAgICAgICAgICAgIGlmICggeCA8IG1pbl94IClcbiAgICAgICAgICAgICAgICAgICAgbWluX3ggPSB4O1xuICAgICAgICAgICAgICAgIGVsc2UgaWYgKCB4ID4gbWF4X3ggKVxuICAgICAgICAgICAgICAgICAgICBtYXhfeCA9IHg7XG5cbiAgICAgICAgICAgICAgICBpZiAoIHkgPCBtaW5feSApXG4gICAgICAgICAgICAgICAgICAgIG1pbl95ID0geTtcbiAgICAgICAgICAgICAgICBlbHNlIGlmICggeSA+IG1heF95IClcbiAgICAgICAgICAgICAgICAgICAgbWF4X3kgPSB5O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gbmV3IEZpcmUuVmVjMiggKG1heF94ICsgbWluX3gpICogMC41LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChtYXhfeSArIG1pbl95KSAqIDAuNSApO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gUG9seWdvbjtcbn0pKCk7XG5cbiIsIlxuLy8g5LiN6IO95L2/55So5LqOZ2V05pa55rOV55qE5bGe5oCnXG52YXIgX3Byb3BlcnR5Tm90Rm9yR2V0ID0gW1xuICAgICdkZWZhdWx0JyxcbiAgICAnc2VyaWFsaXphYmxlJyxcbiAgICAnZWRpdG9yT25seScsXG4gICAgJ3Jhd1R5cGUnXG5dO1xuXG4vLyDpooTlpITnkIYgbm90aWZ5IOetieaJqeWxleWxnuaAp1xuZnVuY3Rpb24gcGFyc2VOb3RpZnkgKHZhbCwgcHJvcE5hbWUsIG5vdGlmeSwgcHJvcGVydGllcykge1xuICAgIGlmICh2YWwuZ2V0IHx8IHZhbC5zZXQpIHtcbiAgICAgICAgaWYgKEZJUkVfREVWKSB7XG4gICAgICAgICAgICBGaXJlLndhcm4oJ1wibm90aWZ5XCIgY2FuXFwndCB3b3JrIHdpdGggXCJnZXQvc2V0XCIgIScpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKHZhbC5oYXNPd25Qcm9wZXJ0eSgnZGVmYXVsdCcpKSB7XG4gICAgICAgIC8vIOa3u+WKoOaWsOeahOWGhemDqOWxnuaAp++8jOWwhuWOn+adpeeahOWxnuaAp+S/ruaUueS4uiBnZXR0ZXIvc2V0dGVyIOW9ouW8j1xuICAgICAgICAvLyDku6UgXyDlvIDlpLTlsIboh6rliqjorr7nva5wcm9wZXJ0eSDkuLogRmlyZS5IaWRlSW5JbnNwZWN0b3JcbiAgICAgICAgdmFyIG5ld0tleSA9IFwiX3ZhbE9mJFwiICsgcHJvcE5hbWU7XG5cbiAgICAgICAgdmFsLmdldCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzW25ld0tleV07XG4gICAgICAgIH07XG4gICAgICAgIHZhbC5zZXQgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgIHZhciBvbGRWYWx1ZSA9IHRoaXNbbmV3S2V5XTtcbiAgICAgICAgICAgIHRoaXNbbmV3S2V5XSA9IHZhbHVlO1xuICAgICAgICAgICAgbm90aWZ5LmNhbGwodGhpcywgb2xkVmFsdWUpO1xuICAgICAgICB9O1xuXG4gICAgICAgIHZhciBuZXdWYWx1ZSA9IHt9O1xuICAgICAgICBwcm9wZXJ0aWVzW25ld0tleV0gPSBuZXdWYWx1ZTtcbiAgICAgICAgLy8g5bCG5LiN6IO955So5LqOZ2V05pa55rOV5Lit55qE5bGe5oCn56e75Yqo5YiwbmV3VmFsdWXkuK1cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBfcHJvcGVydHlOb3RGb3JHZXQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHZhciBwcm9wID0gX3Byb3BlcnR5Tm90Rm9yR2V0W2ldO1xuICAgICAgICAgICAgaWYgKHZhbC5oYXNPd25Qcm9wZXJ0eShwcm9wKSkge1xuICAgICAgICAgICAgICAgIG5ld1ZhbHVlW3Byb3BdID0gdmFsW3Byb3BdO1xuICAgICAgICAgICAgICAgIGRlbGV0ZSB2YWxbcHJvcF07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZiAoRklSRV9ERVYpIHtcbiAgICAgICAgRmlyZS53YXJuKCdcIm5vdGlmeVwiIG11c3Qgd29yayB3aXRoIFwiZGVmYXVsdFwiICEnKTtcbiAgICB9XG59XG5cbi8vIGF1dG8gc2V0IHdyYXBwZXIncyB0eXBlXG5mdW5jdGlvbiBwYXJzZVdyYXBwZXIgKHZhbCwgcHJvcE5hbWUsIHdyYXBwZXJPZiwgY2xhc3NuYW1lKSB7XG4gICAgaWYgKEZJUkVfRURJVE9SKSB7XG4gICAgICAgIGlmICh2YWwudHlwZSkge1xuICAgICAgICAgICAgRmlyZS53YXJuKCdUaGUgXCJ3cmFwcGVyXCIgYXR0cmlidXRlIG9mICVzLiVzIGNhbiBub3QgYmUgdXNlZCB3aXRoIFwidHlwZVwiJywgY2xhc3NuYW1lLCBwcm9wTmFtZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKEZpcmUuaXNDaGlsZENsYXNzT2Yod3JhcHBlck9mLCBGaXJlLlJ1bnRpbWUuTm9kZVdyYXBwZXIpKSB7XG4gICAgICAgICAgICB2YWwudHlwZSA9IHdyYXBwZXJPZjtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB2YXIgd3JhcHBlciA9IEZpcmUuZ2V0V3JhcHBlclR5cGUod3JhcHBlck9mKTtcbiAgICAgICAgaWYgKHdyYXBwZXIpIHtcbiAgICAgICAgICAgIHZhbC50eXBlID0gd3JhcHBlcjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIEZpcmUud2FybignQ2FuIG5vdCBkZWNsYXJlIFwid3JhcHBlclwiIGF0dHJpYnV0ZSBmb3IgJXMuJXMsIHRoZSByZWdpc3RlcmVkIHdyYXBwZXIgb2YgXCIlc1wiIGlzIG5vdCBmb3VuZC4nLFxuICAgICAgICAgICAgICAgIG5hbWUsIHByb3BOYW1lLCBGaXJlLkpTLmdldENsYXNzTmFtZSh3cmFwcGVyT2YpKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZnVuY3Rpb24gY3JlYXRlVXVpZEFkYXB0ZXIgKHZhbCwgcHJvcE5hbWUsIHR5cGUsIHByb3BlcnRpZXMsIGRlZikge1xuICAgIC8vIGNyZWF0ZSBhbiBhZGFwdGVyIGZpZWxkIHdoaWNoIGFjdHVhbCB2YWx1ZSBpcyB1dWlkIGZvciBJbnNwZWN0b3JcbiAgICB2YXIgdXVpZEtleSA9IFwiX2lkT2YkXCIgKyBwcm9wTmFtZTtcbiAgICB2YXIgdXVpZERlZiA9IGRlZjtcbiAgICBpZiAoRklSRV9FRElUT1IpIHtcbiAgICAgICAgLy8gaGlkZSBvcmlnaW5hbCBhc3NldCBpbiBJbnNwZWN0b3JcbiAgICAgICAgdmFsLnZpc2libGUgPSBmYWxzZTtcbiAgICAgICAgdmFyIG9yaWdpbkRpc3BsYXlOYW1lID0gdmFsLmRpc3BsYXlOYW1lO1xuICAgICAgICBpZiAob3JpZ2luRGlzcGxheU5hbWUpIHtcbiAgICAgICAgICAgIGRlbGV0ZSB2YWwuZGlzcGxheU5hbWU7XG4gICAgICAgIH1cbiAgICAgICAgdXVpZERlZi5kaXNwbGF5TmFtZSA9IG9yaWdpbkRpc3BsYXlOYW1lIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAodHlwZW9mIEVkaXRvclVJICE9PSAndW5kZWZpbmVkJyAmJiBFZGl0b3JVSS50b0h1bWFuVGV4dChwcm9wTmFtZSkpIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9wTmFtZTtcbiAgICAgICAgdXVpZERlZi52aXNpYmxlID0gdHJ1ZTtcbiAgICAgICAgdXVpZERlZi50eXBlID0gdHlwZTtcbiAgICB9XG4gICAgcHJvcGVydGllc1t1dWlkS2V5XSA9IHV1aWREZWY7XG59XG5cbi8vZnVuY3Rpb24gcGFyc2VBc3NldFR5cGUgKHZhbCwgcHJvcE5hbWUsIHR5cGUsIHByb3BlcnRpZXMpIHtcbi8vICAgIGlmIChGSVJFX0VESVRPUikge1xuLy8gICAgICAgIGNyZWF0ZVV1aWRBZGFwdGVyKHZhbCwgcHJvcE5hbWUsIHR5cGUsIHByb3BlcnRpZXMsIHtcbi8vICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4vLyAgICAgICAgICAgICAgICB2YXIgYXNzZXQgPSB0aGlzW3Byb3BOYW1lXTtcbi8vICAgICAgICAgICAgICAgIHJldHVybiBhc3NldCA/IGFzc2V0Ll91dWlkIDogJyc7XG4vLyAgICAgICAgICAgIH0sXG4vLyAgICAgICAgICAgIHNldDogZnVuY3Rpb24gKHZhbHVlKSB7XG4vLyAgICAgICAgICAgICAgICBpZiAodmFsdWUpIHtcbi8vICAgICAgICAgICAgICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4vLyAgICAgICAgICAgICAgICAgICAgRmlyZS5Bc3NldExpYnJhcnkubG9hZEFzc2V0KHZhbHVlLCBmdW5jdGlvbiAoZXJyLCBhc3NldCkge1xuLy8gICAgICAgICAgICAgICAgICAgICAgICBpZiAoYXNzZXQpIHtcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghKGFzc2V0IGluc3RhbmNlb2YgdHlwZSkpIHtcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBGaXJlLmVycm9yKCdUaGUgbmV3ICVzIG11c3QgYmUgJXMnLCBwcm9wTmFtZSwgRmlyZS5KUy5nZXRDbGFzc05hbWUodHlwZSkpO1xuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuLy8gICAgICAgICAgICAgICAgICAgICAgICB9XG4vLyAgICAgICAgICAgICAgICAgICAgICAgIHNlbGZbcHJvcE5hbWVdID0gYXNzZXQ7XG4vLyAgICAgICAgICAgICAgICAgICAgfSk7XG4vLyAgICAgICAgICAgICAgICB9XG4vLyAgICAgICAgICAgICAgICBlbHNlIHtcbi8vICAgICAgICAgICAgICAgICAgICB0aGlzW3Byb3BOYW1lXSA9IG51bGw7XG4vLyAgICAgICAgICAgICAgICB9XG4vLyAgICAgICAgICAgIH1cbi8vICAgICAgICB9KTtcbi8vICAgIH1cbi8vfVxuXG4vLyBjcmVhdGUgYW4gYWRhcHRlciBmaWVsZCB3aGljaCBhY3R1YWwgdmFsdWUgaXMgdXVpZCBmb3IgaW5zcGVjdG9yXG5mdW5jdGlvbiBwYXJzZUFzc2V0VXJsICh2YWwsIHByb3BOYW1lLCB0eXBlT2ZVcmwsIHByb3BlcnRpZXMsIGNsYXNzbmFtZSkge1xuICAgIGlmIChGSVJFX0VESVRPUikge1xuICAgICAgICBpZiAodHlwZW9mIHR5cGVPZlVybCAhPT0gJ2Z1bmN0aW9uJyB8fCAhRmlyZS5pc0NoaWxkQ2xhc3NPZih0eXBlT2ZVcmwsIEZpcmUuQXNzZXQpKSB7XG4gICAgICAgICAgICBGaXJlLmVycm9yKCdUaGUgXCJ1cmxcIiB0eXBlIG9mIFwiJXMuJXNcIiBtdXN0IGJlIGNoaWxkIGNsYXNzIG9mIEZpcmUuQXNzZXQuJywgY2xhc3NuYW1lLCBwcm9wTmFtZSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICB9XG4gICAgLy9jcmVhdGVVdWlkQWRhcHRlcih2YWwsIHByb3BOYW1lLCB0eXBlT2ZVcmwsIHByb3BlcnRpZXMsIHtcbiAgICAvLyAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAvLyAgICAgICAgaWYgKEZJUkVfRURJVE9SKSB7XG4gICAgLy8gICAgICAgICAgICB2YXIgdXJsID0gdGhpc1twcm9wTmFtZV07XG4gICAgLy8gICAgICAgICAgICByZXR1cm4gKHVybCAmJiBGaXJlLkFzc2V0LnVybFRvVXVpZCh1cmwpKSB8fCAnJztcbiAgICAvLyAgICAgICAgfVxuICAgIC8vICAgIH0sXG4gICAgLy8gICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAvLyAgICAgICAgaWYgKHZhbHVlKSB7XG4gICAgLy8gICAgICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgLy8gICAgICAgICAgICBGaXJlLkFzc2V0TGlicmFyeS5sb2FkQXNzZXQodmFsdWUsIGZ1bmN0aW9uIChlcnIsIGFzc2V0KSB7XG4gICAgLy8gICAgICAgICAgICAgICAgaWYgKGFzc2V0KSB7XG4gICAgLy8gICAgICAgICAgICAgICAgICAgIGlmICghKGFzc2V0IGluc3RhbmNlb2YgdHlwZU9mVXJsKSkge1xuICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgRmlyZS5lcnJvcignVGhlIG5ldyAlcyBtdXN0IGJlICVzJywgcHJvcE5hbWUsIEZpcmUuSlMuZ2V0Q2xhc3NOYW1lKHR5cGVPZlVybCkpO1xuICAgIC8vICAgICAgICAgICAgICAgICAgICB9XG4gICAgLy8gICAgICAgICAgICAgICAgfVxuICAgIC8vICAgICAgICAgICAgICAgIHNlbGZbcHJvcE5hbWVdID0gKGFzc2V0ICYmIGFzc2V0LnVybCkgfHwgJyc7XG4gICAgLy8gICAgICAgICAgICB9KTtcbiAgICAvLyAgICAgICAgfVxuICAgIC8vICAgICAgICBlbHNlIHtcbiAgICAvLyAgICAgICAgICAgIHRoaXNbcHJvcE5hbWVdID0gJyc7XG4gICAgLy8gICAgICAgIH1cbiAgICAvLyAgICB9XG4gICAgLy99KTtcbiAgICB2YWwudHlwZSA9IHR5cGVPZlVybDtcbiAgICAvLyBjcmVhdGUgc2V0dGVyIHVzZWQgYWZ0ZXIgZGVzZXJpYWxpemVkIGZyb20gYXNzZXQgbGlicmFyeVxuICAgIHZhciBzZXR0ZXJLZXkgPSBcIl9zZXQkXCIgKyBwcm9wTmFtZTtcbiAgICB2YXIgc2V0dGVyRGVmID0ge1xuICAgICAgICBzZXQ6IGZ1bmN0aW9uIChhc3NldCkge1xuICAgICAgICAgICAgaWYgKGFzc2V0KSB7XG4gICAgICAgICAgICAgICAgdGhpc1twcm9wTmFtZV0gPSBhc3NldC51cmw7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHByb3BlcnRpZXNbc2V0dGVyS2V5XSA9IHNldHRlckRlZjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAocHJvcGVydGllcywgY2xhc3NuYW1lKSB7XG4gICAgZm9yICh2YXIgcHJvcE5hbWUgaW4gcHJvcGVydGllcykge1xuICAgICAgICB2YXIgdmFsID0gcHJvcGVydGllc1twcm9wTmFtZV07XG4gICAgICAgIGlmICh2YWwpIHtcbiAgICAgICAgICAgIHZhciBub3RpZnkgPSB2YWwubm90aWZ5O1xuICAgICAgICAgICAgaWYgKG5vdGlmeSkge1xuICAgICAgICAgICAgICAgIHBhcnNlTm90aWZ5KHZhbCwgcHJvcE5hbWUsIG5vdGlmeSwgcHJvcGVydGllcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoRklSRV9FRElUT1IpIHtcbiAgICAgICAgICAgICAgICB2YXIgd3JhcHBlck9mID0gdmFsLndyYXBwZXI7XG4gICAgICAgICAgICAgICAgaWYgKHdyYXBwZXJPZikge1xuICAgICAgICAgICAgICAgICAgICBwYXJzZVdyYXBwZXIodmFsLCBwcm9wTmFtZSwgd3JhcHBlck9mLCBjbGFzc25hbWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvL3ZhciB0eXBlID0gdmFsLnR5cGU7XG4gICAgICAgICAgICAgICAgLy9pZiAodHlwZW9mIHR5cGUgPT09ICdmdW5jdGlvbicgJiYgRmlyZS5pc0NoaWxkQ2xhc3NPZih0eXBlLCBGaXJlLkFzc2V0KSkge1xuICAgICAgICAgICAgICAgIC8vICAgIHBhcnNlQXNzZXRUeXBlKHZhbCwgcHJvcE5hbWUsIHR5cGUsIHByb3BlcnRpZXMpO1xuICAgICAgICAgICAgICAgIC8vfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIHVybCA9IHZhbC51cmw7XG4gICAgICAgICAgICBpZiAodXJsKSB7XG4gICAgICAgICAgICAgICAgcGFyc2VBc3NldFVybCh2YWwsIHByb3BOYW1lLCB1cmwsIHByb3BlcnRpZXMsIGNsYXNzbmFtZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59O1xuIiwidmFyIHJlcXVpcmluZ0ZyYW1lcyA9IFtdOyAgLy8gdGhlIHJlcXVpcmluZyBmcmFtZSBpbmZvc1xuXG5GaXJlLl9SRnB1c2ggPSBmdW5jdGlvbiAobW9kdWxlLCB1dWlkLCBzY3JpcHQpIHtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMikge1xuICAgICAgICBzY3JpcHQgPSB1dWlkO1xuICAgICAgICB1dWlkID0gJyc7XG4gICAgfVxuICAgIHJlcXVpcmluZ0ZyYW1lcy5wdXNoKHtcbiAgICAgICAgdXVpZDogdXVpZCxcbiAgICAgICAgc2NyaXB0OiBzY3JpcHQsXG4gICAgICAgIG1vZHVsZTogbW9kdWxlLFxuICAgICAgICBleHBvcnRzOiBtb2R1bGUuZXhwb3J0cywgICAgLy8gb3JpZ2luYWwgZXhwb3J0c1xuICAgICAgICBiZWg6IG51bGxcbiAgICB9KTtcbn07XG5cbkZpcmUuX1JGcG9wID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBmcmFtZUluZm8gPSByZXF1aXJpbmdGcmFtZXMucG9wKCk7XG4gICAgLy8gY2hlY2sgZXhwb3J0c1xuICAgIHZhciBtb2R1bGUgPSBmcmFtZUluZm8ubW9kdWxlO1xuICAgIHZhciBleHBvcnRzID0gbW9kdWxlLmV4cG9ydHM7XG4gICAgaWYgKGV4cG9ydHMgPT09IGZyYW1lSW5mby5leHBvcnRzKSB7XG4gICAgICAgIGZvciAodmFyIGFueUtleSBpbiBleHBvcnRzKSB7XG4gICAgICAgICAgICAvLyBleHBvcnRlZFxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIC8vIGF1dG8gZXhwb3J0IGJlaGF2aW9yXG4gICAgICAgIG1vZHVsZS5leHBvcnRzID0gZXhwb3J0cyA9IGZyYW1lSW5mby5iZWg7XG4gICAgfVxuICAgIC8vaWYgKEZpcmUuaXNDaGlsZENsYXNzT2YoZXhwb3J0cywgRmlyZS5CZWhhdmlvcikpIHtcbiAgICAvLyAgICBpZiAoZnJhbWVJbmZvLnNjcmlwdCkge1xuICAgIC8vICAgICAgICBpZiAoISBGaXJlLkpTLmdldENsYXNzTmFtZShleHBvcnRzKSkge1xuICAgIC8vICAgICAgICAgICAgRmlyZS5KUy5zZXRDbGFzc05hbWUoZnJhbWVJbmZvLnNjcmlwdCwgZXhwb3J0cyk7XG4gICAgLy8gICAgICAgIH1cbiAgICAvLyAgICAgICAgZWxzZSB7XG4gICAgLy8gICAgICAgICAgICBGaXJlLndhcm4oJ1NvcnJ5LCBzcGVjaWZ5aW5nIGNsYXNzIG5hbWUgZm9yIGV4cG9ydGVkIEJlaGF2aW9yIGlzIG5vdCBhbGxvd2VkLicpO1xuICAgIC8vICAgICAgICB9XG4gICAgLy8gICAgfVxuICAgIC8vICAgIGlmIChmcmFtZUluZm8udXVpZCkge1xuICAgIC8vICAgICAgICBGaXJlLkpTLl9zZXRDbGFzc0lkKGZyYW1lSW5mby51dWlkLCBleHBvcnRzKTtcbiAgICAvLyAgICB9XG4gICAgLy99XG59O1xuXG5GaXJlLl9SRnBlZWsgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHJlcXVpcmluZ0ZyYW1lc1tyZXF1aXJpbmdGcmFtZXMubGVuZ3RoIC0gMV07XG59O1xuIiwidmFyIFRpY2tlciA9IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIFRpY2tlciA9IHt9O1xuXG4gICAgdmFyIF9mcmFtZVJhdGUgPSA2MDtcblxuICAgIC8vIFRpY2tlci5yZXF1ZXN0QW5pbWF0aW9uRnJhbWVcblxuICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUgPSB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvdy53ZWJraXRSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93Lm1zUmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvdy5tb3pSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93Lm9SZXF1ZXN0QW5pbWF0aW9uRnJhbWU7XG4gICAgaWYgKF9mcmFtZVJhdGUgIT09IDYwIHx8ICF3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKSB7XG4gICAgICAgIFRpY2tlci5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUgPSBmdW5jdGlvbiAoY2FsbGJhY2spIHtcbiAgICAgICAgICAgIHJldHVybiB3aW5kb3cuc2V0VGltZW91dChjYWxsYmFjaywgMTAwMCAvIF9mcmFtZVJhdGUpO1xuICAgICAgICB9O1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgVGlja2VyLnJlcXVlc3RBbmltYXRpb25GcmFtZSA9IGZ1bmN0aW9uIChjYWxsYmFjaykge1xuICAgICAgICAgICAgcmV0dXJuIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoY2FsbGJhY2spO1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIC8vIFRpY2tlci5jYW5jZWxBbmltYXRpb25GcmFtZVxuXG4gICAgd2luZG93LmNhbmNlbEFuaW1hdGlvbkZyYW1lID0gd2luZG93LmNhbmNlbEFuaW1hdGlvbkZyYW1lIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93LndlYmtpdENhbmNlbEFuaW1hdGlvbkZyYW1lIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93Lm1zQ2FuY2VsQW5pbWF0aW9uRnJhbWUgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3cubW96Q2FuY2VsQW5pbWF0aW9uRnJhbWUgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3cub0NhbmNlbEFuaW1hdGlvbkZyYW1lO1xuICAgIGlmICh3aW5kb3cuY2FuY2VsQW5pbWF0aW9uRnJhbWUpIHtcbiAgICAgICAgVGlja2VyLmNhbmNlbEFuaW1hdGlvbkZyYW1lID0gZnVuY3Rpb24gKHJlcXVlc3RJZCkge1xuICAgICAgICAgICAgd2luZG93LmNhbmNlbEFuaW1hdGlvbkZyYW1lKHJlcXVlc3RJZCk7XG4gICAgICAgIH07XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBUaWNrZXIuY2FuY2VsQW5pbWF0aW9uRnJhbWUgPSBmdW5jdGlvbiAocmVxdWVzdElkKSB7XG4gICAgICAgICAgICB3aW5kb3cuY2xlYXJUaW1lb3V0KHJlcXVlc3RJZCk7XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgLy8gVGlja2VyLm5vd1xuXG4gICAgaWYgKHdpbmRvdy5wZXJmb3JtYW5jZSAmJiB3aW5kb3cucGVyZm9ybWFuY2Uubm93KSB7XG4gICAgICAgIFRpY2tlci5ub3cgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gd2luZG93LnBlcmZvcm1hbmNlLm5vdygpIC8gMTAwMDtcbiAgICAgICAgfTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIFRpY2tlci5ub3cgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gRGF0ZS5ub3coKSAvIDEwMDA7XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgcmV0dXJuIFRpY2tlcjtcbn0pKCk7XG5cbkZpcmUuX1RpY2tlciA9IFRpY2tlcjtcblxubW9kdWxlLmV4cG9ydHMgPSBUaWNrZXI7XG4iLCJcbnZhciBsYXN0VXBkYXRlVGltZSA9IDA7XG52YXIgc3RhcnRUaW1lID0gMDtcblxuLyoqXG4gKiAhI2VuIFRoZSBpbnRlcmZhY2UgdG8gZ2V0IHRpbWUgaW5mb3JtYXRpb24gZnJvbSBGaXJlYmFsbC5cbiAqXG4gKiBTZWUgW1RpbWVdKC9lbi9zY3JpcHRpbmcvdGltZS8pXG4gKiAhI3poIFRpbWUg5qih5Z2X55So5LqO6I635b6X5ri45oiP6YeM55qE5pe26Ze05ZKM5bin546H55u45YWz5L+h5oGv44CC55u05o6l5L2/55SoIEZpcmUuVGltZS4qKiog6K6/6Zeu5Y2z5Y+v44CCXG4gKlxuICog6K+35Y+C6ICD5pWZ56iLW+iuoeaXtuWSjOW4p+eOh10oL3poL3NjcmlwdGluZy90aW1lLylcbiAqXG4gKiBAY2xhc3MgVGltZVxuICogQHN0YXRpY1xuICovXG52YXIgVGltZSA9IHtcblxuICAgIC8qKlxuICAgICAqIFRoZSB0aW1lIGF0IHRoZSBiZWdpbm5pbmcgb2YgdGhpcyBmcmFtZS4gVGhpcyBpcyB0aGUgdGltZSBpbiBzZWNvbmRzIHNpbmNlIHRoZSBzdGFydCBvZiB0aGUgZ2FtZS5cbiAgICAgKiBAcHJvcGVydHkgdGltZVxuICAgICAqIEB0eXBlIHtudW1iZXJ9XG4gICAgICogQHJlYWRPbmx5XG4gICAgICovXG4gICAgdGltZTogMCxcblxuICAgIC8qKlxuICAgICAqIFRoZSB0aW1lIGF0IHRoZSBiZWdpbm5pbmcgb2YgdGhpcyBmcmFtZS4gVGhpcyBpcyB0aGUgcmVhbCB0aW1lIGluIHNlY29uZHMgc2luY2UgdGhlIHN0YXJ0IG9mIHRoZSBnYW1lLlxuICAgICAqXG4gICAgICogYFRpbWUucmVhbFRpbWVgIG5vdCBhZmZlY3RlZCBieSB0aW1lIHNjYWxlLCBhbmQgYWxzbyBrZWVwcyBpbmNyZWFzaW5nIHdoaWxlIHRoZSBwbGF5ZXIgaXMgcGF1c2VkIGluIGVkaXRvciBvciBpbiB0aGUgYmFja2dyb3VuZC5cbiAgICAgKiBAcHJvcGVydHkgcmVhbFRpbWVcbiAgICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgICAqIEByZWFkT25seVxuICAgICAqL1xuICAgIHJlYWxUaW1lOiAwLFxuXG4gICAgLyoqXG4gICAgICogVGhlIHRpbWUgaW4gc2Vjb25kcyBpdCB0b29rIHRvIGNvbXBsZXRlIHRoZSBsYXN0IGZyYW1lLiBVc2UgdGhpcyBwcm9wZXJ0eSB0byBtYWtlIHlvdXIgZ2FtZSBmcmFtZSByYXRlIGluZGVwZW5kZW50LlxuICAgICAqIEBwcm9wZXJ0eSBkZWx0YVRpbWVcbiAgICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgICAqIEByZWFkT25seVxuICAgICAqL1xuICAgIGRlbHRhVGltZTogMCxcblxuICAgIC8qKlxuICAgICAqIFRoZSB0b3RhbCBudW1iZXIgb2YgZnJhbWVzIHRoYXQgaGF2ZSBwYXNzZWQuXG4gICAgICogQHByb3BlcnR5IGZyYW1lQ291bnRcbiAgICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgICAqIEByZWFkT25seVxuICAgICAqL1xuICAgIGZyYW1lQ291bnQ6IDAsXG5cbiAgICAvKipcbiAgICAgKiBUaGUgbWF4aW11bSB0aW1lIGEgZnJhbWUgY2FuIHRha2UuXG4gICAgICogQHByb3BlcnR5IG1heERlbHRhVGltZVxuICAgICAqIEB0eXBlIHtudW1iZXJ9XG4gICAgICogQHJlYWRPbmx5XG4gICAgICovXG4gICAgbWF4RGVsdGFUaW1lOiAwLjMzMzMzMzMsXG5cbiAgICAvKipcbiAgICAgKiBAbWV0aG9kIF91cGRhdGVcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gdGltZXN0YW1wXG4gICAgICogQHBhcmFtIHtCb29sZWFufSBbcGF1c2VkPWZhbHNlXSBpZiB0cnVlLCBvbmx5IHJlYWxUaW1lIHdpbGwgYmUgdXBkYXRlZFxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBbbWF4RGVsdGFUaW1lPVRpbWUubWF4RGVsdGFUaW1lXVxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgX3VwZGF0ZTogZnVuY3Rpb24gKHRpbWVzdGFtcCwgcGF1c2VkLCBtYXhEZWx0YVRpbWUpIHtcbiAgICAgICAgaWYgKCFwYXVzZWQpIHtcbiAgICAgICAgICAgIG1heERlbHRhVGltZSA9IG1heERlbHRhVGltZSB8fCBUaW1lLm1heERlbHRhVGltZTtcbiAgICAgICAgICAgIHZhciBkZWx0YSA9IHRpbWVzdGFtcCAtIGxhc3RVcGRhdGVUaW1lO1xuICAgICAgICAgICAgZGVsdGEgPSBNYXRoLm1pbihtYXhEZWx0YVRpbWUsIGRlbHRhKTtcbiAgICAgICAgICAgIFRpbWUuZGVsdGFUaW1lID0gZGVsdGE7XG4gICAgICAgICAgICBsYXN0VXBkYXRlVGltZSA9IHRpbWVzdGFtcDtcblxuICAgICAgICAgICAgaWYgKFRpbWUuZnJhbWVDb3VudCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHN0YXJ0VGltZSA9IHRpbWVzdGFtcDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIFRpbWUudGltZSArPSBkZWx0YTtcbiAgICAgICAgICAgICAgICBUaW1lLnJlYWxUaW1lID0gdGltZXN0YW1wIC0gc3RhcnRUaW1lO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgKytUaW1lLmZyYW1lQ291bnQ7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogQG1ldGhvZCBfcmVzdGFydFxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB0aW1lc3RhbXBcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIF9yZXN0YXJ0OiBmdW5jdGlvbiAodGltZXN0YW1wKSB7XG4gICAgICAgIFRpbWUudGltZSA9IDA7XG4gICAgICAgIFRpbWUucmVhbFRpbWUgPSAwO1xuICAgICAgICBUaW1lLmRlbHRhVGltZSA9IDA7XG4gICAgICAgIFRpbWUuZnJhbWVDb3VudCA9IDA7XG4gICAgICAgIGxhc3RVcGRhdGVUaW1lID0gdGltZXN0YW1wO1xuICAgIH0sXG59O1xuXG5GaXJlLlRpbWUgPSBUaW1lO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFRpbWU7XG4iLCIvKipcbiAqIEBjbGFzcyB1cmxcbiAqIEBzdGF0aWNcbiAqL1xuRmlyZS51cmwgPSB7XG5cbiAgICAvKipcbiAgICAgKiBUaGUgYmFzZSB1cmwgb2YgcmF3IGZpbGVzLlxuICAgICAqIEBwcm9wZXJ0eSByYXdVcmxcbiAgICAgKiBAcmVhZE9ubHlcbiAgICAgKi9cbiAgICByYXdVcmw6ICcnLFxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgdXJsIG9mIHJhdyBmaWxlcy5cbiAgICAgKiBAbWV0aG9kIHJhd1xuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBwYXRoXG4gICAgICogQHJldHVybiB7c3RyaW5nfSByYXcgdXJsXG4gICAgICogQGV4YW1wbGVcbnZhciB1cmwgPSBGaXJlLnVybC5yYXcoXCJteVRleHR1cmUucG5nXCIpO1xuY29uc29sZS5sb2codXJsKTsgICAvLyBcInJlc291cmNlcy9yYXcvbXlUZXh0dXJlLnBuZ1wiXG4gICAgICovXG4gICAgcmF3OiBmdW5jdGlvbiAodXJsKSB7XG4gICAgICAgIGlmICh1cmxbMF0gPT09ICcuJyAmJiB1cmxbMV0gPT09ICcvJykge1xuICAgICAgICAgICAgdXJsID0gdXJsLnNsaWNlKDIpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHVybFswXSA9PT0gJy8nKSB7XG4gICAgICAgICAgICB1cmwgPSB1cmwuc2xpY2UoMSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMucmF3VXJsICsgdXJsO1xuICAgIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gRmlyZS51cmw7XG4iLCIvKipcbiAqIEBtZXRob2QgcGFkTGVmdFxuICogQHBhcmFtIHtzdHJpbmd9IHRleHRcbiAqIEBwYXJhbSB7bnVtYmVyfSB3aWR0aFxuICogQHBhcmFtIHtzdHJpbmd9IGNoIC0gdGhlIGNoYXJhY3RlciB1c2VkIHRvIHBhZFxuICogQHJldHVybiB7c3RyaW5nfVxuICovXG5GaXJlLnBhZExlZnQgPSBmdW5jdGlvbiAoIHRleHQsIHdpZHRoLCBjaCApIHtcbiAgICB0ZXh0ID0gdGV4dC50b1N0cmluZygpO1xuICAgIHdpZHRoIC09IHRleHQubGVuZ3RoO1xuICAgIGlmICggd2lkdGggPiAwICkge1xuICAgICAgICByZXR1cm4gbmV3IEFycmF5KCB3aWR0aCArIDEgKS5qb2luKGNoKSArIHRleHQ7XG4gICAgfVxuICAgIHJldHVybiB0ZXh0O1xufTtcblxuLyoqXG4gKiBAbWV0aG9kIGdldEVudW1MaXN0XG4gKiBAcGFyYW0ge29iamVjdH0gZW51bURlZiAtIHRoZSBlbnVtIHR5cGUgZGVmaW5lZCBmcm9tIEZpcmUuZGVmaW5lRW51bVxuICogQHJldHVybiB7b2JqZWN0W119XG4gKiBAcHJpdmF0ZVxuICovXG5GaXJlLmdldEVudW1MaXN0ID0gZnVuY3Rpb24gKGVudW1EZWYpIHtcbiAgICBpZiAoIGVudW1EZWYuX19lbnVtc19fICE9PSB1bmRlZmluZWQgKVxuICAgICAgICByZXR1cm4gZW51bURlZi5fX2VudW1zX187XG5cbiAgICB2YXIgZW51bXMgPSBbXTtcbiAgICBmb3IgKCB2YXIgZW50cnkgaW4gZW51bURlZiApIHtcbiAgICAgICAgaWYgKCBlbnVtRGVmLmhhc093blByb3BlcnR5KGVudHJ5KSApIHtcbiAgICAgICAgICAgIHZhciB2YWx1ZSA9IGVudW1EZWZbZW50cnldO1xuICAgICAgICAgICAgdmFyIGlzSW50ZWdlciA9IHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicgJiYgKHZhbHVlIHwgMCkgPT09IHZhbHVlOyAvLyBwb2x5ZmlsbCBOdW1iZXIuaXNJbnRlZ2VyXG4gICAgICAgICAgICBpZiAoIGlzSW50ZWdlciApIHtcbiAgICAgICAgICAgICAgICBlbnVtcy5wdXNoKCB7IG5hbWU6IGVudHJ5LCB2YWx1ZTogdmFsdWUgfSApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGVudW1zLnNvcnQoIGZ1bmN0aW9uICggYSwgYiApIHsgcmV0dXJuIGEudmFsdWUgLSBiLnZhbHVlOyB9ICk7XG5cbiAgICBlbnVtRGVmLl9fZW51bXNfXyA9IGVudW1zO1xuICAgIHJldHVybiBlbnVtcztcbn07XG5cbi8qKlxuICogQG1ldGhvZCBnZXRWYXJGcm9tXG4gKiBAcGFyYW0ge29iamVjdH0gb2JqXG4gKiBAcGFyYW0ge3N0cmluZ30gdGV4dFxuICogQHJldHVybiB7YW55fVxuICogQHByaXZhdGVcbiAqL1xuRmlyZS5nZXRWYXJGcm9tID0gZnVuY3Rpb24gKCBvYmosIHRleHQgKSB7XG4gICAgdmFyIHJlcyA9IHRleHQuc3BsaXQoJy4nKTtcbiAgICB2YXIgY3VyT2JqID0gb2JqO1xuICAgIGZvciAoIHZhciBpID0gMDsgaSA8IHJlcy5sZW5ndGg7ICsraSApIHtcbiAgICAgICAgdmFyIG5hbWUgPSByZXNbaV07XG4gICAgICAgIGN1ck9iaiA9IGN1ck9ialtuYW1lXTtcbiAgICAgICAgaWYgKCBjdXJPYmogPT09IHVuZGVmaW5lZCB8fCBjdXJPYmogPT09IG51bGwgKVxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiBjdXJPYmo7XG59O1xuXG4vKipcbiAqIEBtZXRob2QgcmdiMmhzdlxuICogQHBhcmFtIHtudW1iZXJ9IHIgLSByZWQsIG11c3QgYmUgWzAuMCwgMS4wXVxuICogQHBhcmFtIHtudW1iZXJ9IGcgLSByZWQsIG11c3QgYmUgWzAuMCwgMS4wXVxuICogQHBhcmFtIHtudW1iZXJ9IGIgLSByZWQsIG11c3QgYmUgWzAuMCwgMS4wXVxuICogQHJldHVybiB7b2JqZWN0fSAtIHtoOiBudW1iZXIsIHM6IG51bWJlciwgdjogbnVtYmVyfVxuICovXG5GaXJlLnJnYjJoc3YgPSBmdW5jdGlvbiAoIHIsIGcsIGIgKSB7XG4gICAgdmFyIGhzdiA9IHsgaDogMCwgczogMCwgdjogMCB9O1xuICAgIHZhciBtYXggPSBNYXRoLm1heChyLGcsYik7XG4gICAgdmFyIG1pbiA9IE1hdGgubWluKHIsZyxiKTtcbiAgICB2YXIgZGVsdGEgPSAwO1xuICAgIGhzdi52ID0gbWF4O1xuICAgIGhzdi5zID0gbWF4ID8gKG1heCAtIG1pbikgLyBtYXggOiAwO1xuICAgIGlmICghaHN2LnMpIGhzdi5oID0gMDtcbiAgICBlbHNlIHtcbiAgICAgICAgZGVsdGEgPSBtYXggLSBtaW47XG4gICAgICAgIGlmIChyID09PSBtYXgpIGhzdi5oID0gKGcgLSBiKSAvIGRlbHRhO1xuICAgICAgICBlbHNlIGlmIChnID09PSBtYXgpIGhzdi5oID0gMiArIChiIC0gcikgLyBkZWx0YTtcbiAgICAgICAgZWxzZSBoc3YuaCA9IDQgKyAociAtIGcpIC8gZGVsdGE7XG4gICAgICAgIGhzdi5oIC89IDY7XG4gICAgICAgIGlmIChoc3YuaCA8IDApIGhzdi5oICs9IDEuMDtcbiAgICB9XG4gICAgcmV0dXJuIGhzdjtcbn07XG5cbi8qKlxuICogQG1ldGhvZCBoc3YycmdiXG4gKiBAcGFyYW0ge251bWJlcn0gaFxuICogQHBhcmFtIHtudW1iZXJ9IHNcbiAqIEBwYXJhbSB7bnVtYmVyfSB2XG4gKiBAcmV0dXJuIHtvYmplY3R9IC0ge3I6IG51bWJlciwgZzogbnVtYmVyLCBiOiBudW1iZXJ9fSwgcmdiIHdpbGwgYmUgaW4gWzAuMCwgMS4wXVxuICovXG5GaXJlLmhzdjJyZ2IgPSBmdW5jdGlvbiAoIGgsIHMsIHYgKSB7XG4gICAgdmFyIHJnYiA9IHsgcjogMCwgZzogMCwgYjogMCB9O1xuICAgIGlmIChzID09PSAwKSB7XG4gICAgICAgIHJnYi5yID0gcmdiLmcgPSByZ2IuYiA9IHY7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBpZiAodiA9PT0gMCkge1xuICAgICAgICAgICAgcmdiLnIgPSByZ2IuZyA9IHJnYi5iID0gMDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGlmIChoID09PSAxKSBoID0gMDtcbiAgICAgICAgICAgIGggKj0gNjtcbiAgICAgICAgICAgIHMgPSBzO1xuICAgICAgICAgICAgdiA9IHY7XG4gICAgICAgICAgICB2YXIgaSA9IE1hdGguZmxvb3IoaCk7XG4gICAgICAgICAgICB2YXIgZiA9IGggLSBpO1xuICAgICAgICAgICAgdmFyIHAgPSB2ICogKDEgLSBzKTtcbiAgICAgICAgICAgIHZhciBxID0gdiAqICgxIC0gKHMgKiBmKSk7XG4gICAgICAgICAgICB2YXIgdCA9IHYgKiAoMSAtIChzICogKDEgLSBmKSkpO1xuICAgICAgICAgICAgc3dpdGNoIChpKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgICAgICByZ2IuciA9IHY7XG4gICAgICAgICAgICAgICAgICAgIHJnYi5nID0gdDtcbiAgICAgICAgICAgICAgICAgICAgcmdiLmIgPSBwO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgcmdiLnIgPSBxO1xuICAgICAgICAgICAgICAgICAgICByZ2IuZyA9IHY7XG4gICAgICAgICAgICAgICAgICAgIHJnYi5iID0gcDtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgICAgIHJnYi5yID0gcDtcbiAgICAgICAgICAgICAgICAgICAgcmdiLmcgPSB2O1xuICAgICAgICAgICAgICAgICAgICByZ2IuYiA9IHQ7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICAgICAgICByZ2IuciA9IHA7XG4gICAgICAgICAgICAgICAgICAgIHJnYi5nID0gcTtcbiAgICAgICAgICAgICAgICAgICAgcmdiLmIgPSB2O1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgNDpcbiAgICAgICAgICAgICAgICAgICAgcmdiLnIgPSB0O1xuICAgICAgICAgICAgICAgICAgICByZ2IuZyA9IHA7XG4gICAgICAgICAgICAgICAgICAgIHJnYi5iID0gdjtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlIDU6XG4gICAgICAgICAgICAgICAgICAgIHJnYi5yID0gdjtcbiAgICAgICAgICAgICAgICAgICAgcmdiLmcgPSBwO1xuICAgICAgICAgICAgICAgICAgICByZ2IuYiA9IHE7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZ2I7XG59O1xuXG4vKipcbiAqIFNlYXJjaGVzIHRoZSBlbnRpcmUgc29ydGVkIEFycmF5IGZvciBhbiBlbGVtZW50IGFuZCByZXR1cm5zIHRoZSB6ZXJvLWJhc2VkIGluZGV4IG9mIHRoZSBlbGVtZW50LlxuICogQG1ldGhvZCBiaW5hcnlTZWFyY2hcbiAqIEBwYXJhbSB7bnVtYmVyW119IGFycmF5XG4gKiBAcGFyYW0ge251bWJlcn0gdmFsdWVcbiAqIEByZXR1cm4ge251bWJlcn0gVGhlIHplcm8tYmFzZWQgaW5kZXggb2YgaXRlbSBpbiB0aGUgc29ydGVkIEFycmF5LCBpZiBpdGVtIGlzIGZvdW5kOyBvdGhlcndpc2UsIGEgbmVnYXRpdmUgbnVtYmVyIHRoYXQgaXMgdGhlIGJpdHdpc2UgY29tcGxlbWVudCBvZiB0aGUgaW5kZXggb2YgdGhlIG5leHQgZWxlbWVudCB0aGF0IGlzIGxhcmdlciB0aGFuIGl0ZW0gb3IsIGlmIHRoZXJlIGlzIG5vIGxhcmdlciBlbGVtZW50LCB0aGUgYml0d2lzZSBjb21wbGVtZW50IG9mIGFycmF5J3MgbGVuZ3RoLlxuICovXG5GaXJlLmJpbmFyeVNlYXJjaCA9IGZ1bmN0aW9uKGFycmF5LCB2YWx1ZSkge1xuICAgIHZhciBsID0gMCwgaCA9IGFycmF5Lmxlbmd0aCAtIDE7XG4gICAgd2hpbGUgKGwgPD0gaCkge1xuICAgICAgICB2YXIgbSA9ICgobCArIGgpID4+IDEpO1xuICAgICAgICBpZiAoYXJyYXlbbV0gPT09IHZhbHVlKSB7XG4gICAgICAgICAgICByZXR1cm4gbTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoYXJyYXlbbV0gPiB2YWx1ZSkge1xuICAgICAgICAgICAgaCA9IG0gLSAxO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgbCA9IG0gKyAxO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiB+bDtcbn07XG5cbi8qKlxuICogT25jZSB0aGUgY3VycmVudCBldmVudCBsb29wIHR1cm4gcnVucyB0byBjb21wbGV0aW9uLCBjYWxsIHRoZSBjYWxsYmFjayBmdW5jdGlvbi5cbiAqIEBtZXRob2QgbmV4dFRpY2tcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IGNhbGxiYWNrXG4gKiBAcGFyYW0ge2FueX0gcDFcbiAqIEBwYXJhbSB7YW55fSBwMlxuICovXG5GaXJlLm5leHRUaWNrID0gZnVuY3Rpb24gKGNhbGxiYWNrLCBwMSwgcDIpIHtcbiAgICBpZiAoY2FsbGJhY2spIHtcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBjYWxsYmFjayhwMSwgcDIpO1xuICAgICAgICB9LCAxKTtcbiAgICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBpc0RvbU5vZGU6IEZpcmUuaXNXZWIgJiYgZnVuY3Rpb24gKG9iaikge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgdHlwZW9mIE5vZGUgPT09IFwib2JqZWN0XCIgPyBvYmogaW5zdGFuY2VvZiBOb2RlIDpcbiAgICAgICAgICAgIG9iaiAmJiB0eXBlb2Ygb2JqID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBvYmoubm9kZVR5cGUgPT09IFwibnVtYmVyXCIgJiYgdHlwZW9mIG9iai5ub2RlTmFtZSA9PT0gXCJzdHJpbmdcIlxuICAgICAgICApO1xuICAgIH0sXG5cbiAgICBjYWxsSW5OZXh0VGljazogZnVuY3Rpb24gKGNhbGxiYWNrLCBwMSwgcDIpIHtcbiAgICAgICAgaWYgKGNhbGxiYWNrKSB7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBjYWxsYmFjayhwMSwgcDIpO1xuICAgICAgICAgICAgfSwgMSk7XG4gICAgICAgIH1cbiAgICB9XG59O1xuXG5pZiAoRklSRV9ERVYpIHtcbiAgICBGaXJlLkpTLm1peGluKG1vZHVsZS5leHBvcnRzLCB7XG4gICAgICAgIC8vLyoqXG4gICAgICAgIC8vICogQHBhcmFtIHtvYmplY3R9IG9ialxuICAgICAgICAvLyAqIEByZXR1cm4ge0Jvb2xlYW59IGlzIHt9ID9cbiAgICAgICAgLy8gKi9cbiAgICAgICAgaXNQbGFpbkVtcHR5T2JqX0RFVjogZnVuY3Rpb24gKG9iaikge1xuICAgICAgICAgICAgaWYgKCFvYmogfHwgb2JqLmNvbnN0cnVjdG9yICE9PSAoe30pLmNvbnN0cnVjdG9yKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8ganNoaW50IGlnbm9yZTogc3RhcnRcbiAgICAgICAgICAgIGZvciAodmFyIGsgaW4gb2JqKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8ganNoaW50IGlnbm9yZTogZW5kXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSxcbiAgICAgICAgY2xvbmVhYmxlX0RFVjogZnVuY3Rpb24gKG9iaikge1xuICAgICAgICAgICAgcmV0dXJuIG9iaiAmJiB0eXBlb2Ygb2JqLmNsb25lID09PSAnZnVuY3Rpb24nICYmXG4gICAgICAgICAgICAgICAgICAob2JqLmNvbnN0cnVjdG9yLnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eSgnY2xvbmUnKSB8fCBvYmouaGFzT3duUHJvcGVydHkoJ2Nsb25lJykpO1xuICAgICAgICB9XG4gICAgfSk7XG59XG4iLCJ2YXIgVmFsdWVUeXBlID0gcmVxdWlyZSgnLi92YWx1ZS10eXBlJyk7XG52YXIgSlMgPSByZXF1aXJlKCcuLi9qcycpO1xuXG52YXIgQ29sb3IgPSAoZnVuY3Rpb24gKCkge1xuXG4gICAgLyoqXG4gICAgICogUmVwcmVzZW50YXRpb24gb2YgUkdCQSBjb2xvcnMuXG4gICAgICpcbiAgICAgKiBFYWNoIGNvbG9yIGNvbXBvbmVudCBpcyBhIGZsb2F0aW5nIHBvaW50IHZhbHVlIHdpdGggYSByYW5nZSBmcm9tIDAgdG8gMS5cbiAgICAgKlxuICAgICAqIFlvdSBjYW4gYWxzbyB1c2UgdGhlIGNvbnZlbmllbmNlIG1ldGhvZCA8JSBjcm9zc2xpbmsgRmlyZS5jb2xvciBGaXJlLmNvbG9yICU+IHRvIGNyZWF0ZSBhIG5ldyBDb2xvci5cbiAgICAgKlxuICAgICAqIEBjbGFzcyBDb2xvclxuICAgICAqIEBleHRlbmRzIFZhbHVlVHlwZVxuICAgICAqIEBjb25zdHJ1Y3RvclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBbcj0wXSAtIHJlZCBjb21wb25lbnQgb2YgdGhlIGNvbG9yXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IFtnPTBdIC0gZ3JlZW4gY29tcG9uZW50IG9mIHRoZSBjb2xvclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBbYj0wXSAtIGJsdWUgY29tcG9uZW50IG9mIHRoZSBjb2xvclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBbYT0xXSAtIGFscGhhIGNvbXBvbmVudCBvZiB0aGUgY29sb3JcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBDb2xvciggciwgZywgYiwgYSApIHtcbiAgICAgICAgdGhpcy5yID0gdHlwZW9mIHIgPT09ICdudW1iZXInID8gciA6IDAuMDtcbiAgICAgICAgdGhpcy5nID0gdHlwZW9mIGcgPT09ICdudW1iZXInID8gZyA6IDAuMDtcbiAgICAgICAgdGhpcy5iID0gdHlwZW9mIGIgPT09ICdudW1iZXInID8gYiA6IDAuMDtcbiAgICAgICAgdGhpcy5hID0gdHlwZW9mIGEgPT09ICdudW1iZXInID8gYSA6IDEuMDtcbiAgICB9XG4gICAgSlMuZXh0ZW5kKENvbG9yLCBWYWx1ZVR5cGUpO1xuICAgIEZpcmUuX2Zhc3REZWZpbmUoJ0ZpcmUuQ29sb3InLCBDb2xvciwgWydyJywgJ2cnLCAnYicsICdhJ10pO1xuXG4gICAgdmFyIERlZmF1bHRDb2xvcnMgPSB7XG4gICAgICAgIC8vIGNvbG9yOiBbciwgZywgYiwgYV1cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBwcm9wZXJ0eSB3aGl0ZVxuICAgICAgICAgKiBAdHlwZSBDb2xvclxuICAgICAgICAgKiBAc3RhdGljXG4gICAgICAgICAqL1xuICAgICAgICB3aGl0ZTogICAgICBbMSwgMSwgMSwgMV0sXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAcHJvcGVydHkgYmxhY2tcbiAgICAgICAgICogQHR5cGUgQ29sb3JcbiAgICAgICAgICogQHN0YXRpY1xuICAgICAgICAgKi9cbiAgICAgICAgYmxhY2s6ICAgICAgWzAsIDAsIDAsIDFdLFxuICAgICAgICAvKipcbiAgICAgICAgICogQHByb3BlcnR5IHRyYW5zcGFyZW50XG4gICAgICAgICAqIEB0eXBlIENvbG9yXG4gICAgICAgICAqIEBzdGF0aWNcbiAgICAgICAgICovXG4gICAgICAgIHRyYW5zcGFyZW50OlswLCAwLCAwLCAwXSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBwcm9wZXJ0eSBncmF5XG4gICAgICAgICAqIEB0eXBlIENvbG9yXG4gICAgICAgICAqIEBzdGF0aWNcbiAgICAgICAgICovXG4gICAgICAgIGdyYXk6ICAgICAgIFswLjUsIDAuNSwgMC41XSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBwcm9wZXJ0eSByZWRcbiAgICAgICAgICogQHR5cGUgQ29sb3JcbiAgICAgICAgICogQHN0YXRpY1xuICAgICAgICAgKi9cbiAgICAgICAgcmVkOiAgICAgICAgWzEsIDAsIDBdLFxuICAgICAgICAvKipcbiAgICAgICAgICogQHByb3BlcnR5IGdyZWVuXG4gICAgICAgICAqIEB0eXBlIENvbG9yXG4gICAgICAgICAqIEBzdGF0aWNcbiAgICAgICAgICovXG4gICAgICAgIGdyZWVuOiAgICAgIFswLCAxLCAwXSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBwcm9wZXJ0eSBibHVlXG4gICAgICAgICAqIEB0eXBlIENvbG9yXG4gICAgICAgICAqIEBzdGF0aWNcbiAgICAgICAgICovXG4gICAgICAgIGJsdWU6ICAgICAgIFswLCAwLCAxXSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBwcm9wZXJ0eSB5ZWxsb3dcbiAgICAgICAgICogQHR5cGUgQ29sb3JcbiAgICAgICAgICogQHN0YXRpY1xuICAgICAgICAgKi9cbiAgICAgICAgeWVsbG93OiAgICAgWzEsIDIzNS8yNTUsIDQvMjU1XSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBwcm9wZXJ0eSBjeWFuXG4gICAgICAgICAqIEB0eXBlIENvbG9yXG4gICAgICAgICAqIEBzdGF0aWNcbiAgICAgICAgICovXG4gICAgICAgIGN5YW46ICAgICAgIFswLCAxLCAxXSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBwcm9wZXJ0eSBtYWdlbnRhXG4gICAgICAgICAqIEB0eXBlIENvbG9yXG4gICAgICAgICAqIEBzdGF0aWNcbiAgICAgICAgICovXG4gICAgICAgIG1hZ2VudGE6ICAgIFsxLCAwLCAxXVxuICAgIH07XG4gICAgZm9yICh2YXIgY29sb3JOYW1lIGluIERlZmF1bHRDb2xvcnMpIHtcbiAgICAgICAgdmFyIGNvbG9yR2V0dGVyID0gKGZ1bmN0aW9uIChyLCBnLCBiLCBhKSB7XG4gICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgQ29sb3IociwgZywgYiwgYSk7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9KS5hcHBseShudWxsLCBEZWZhdWx0Q29sb3JzW2NvbG9yTmFtZV0pO1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQ29sb3IsIGNvbG9yTmFtZSwgeyBnZXQ6IGNvbG9yR2V0dGVyIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENsb25lIGEgbmV3IGNvbG9yIGZyb20gdGhlIGN1cnJlbnQgY29sb3IuXG4gICAgICogQG1ldGhvZCBjbG9uZVxuICAgICAqIEByZXR1cm4ge0NvbG9yfSBOZXdseSBjcmVhdGVkIGNvbG9yLlxuICAgICAqL1xuICAgIENvbG9yLnByb3RvdHlwZS5jbG9uZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBDb2xvcih0aGlzLnIsIHRoaXMuZywgdGhpcy5iLCB0aGlzLmEpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBAbWV0aG9kIGVxdWFsc1xuICAgICAqIEBwYXJhbSB7Q29sb3J9IG90aGVyXG4gICAgICogQHJldHVybiB7Qm9vbGVhbn1cbiAgICAgKi9cbiAgICBDb2xvci5wcm90b3R5cGUuZXF1YWxzID0gZnVuY3Rpb24gKG90aGVyKSB7XG4gICAgICAgIHJldHVybiBvdGhlciAmJlxuICAgICAgICAgICAgICAgdGhpcy5yID09PSBvdGhlci5yICYmXG4gICAgICAgICAgICAgICB0aGlzLmcgPT09IG90aGVyLmcgJiZcbiAgICAgICAgICAgICAgIHRoaXMuYiA9PT0gb3RoZXIuYiAmJlxuICAgICAgICAgICAgICAgdGhpcy5hID09PSBvdGhlci5hO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBAbWV0aG9kIGxlcnBcbiAgICAgKiBAcGFyYW0ge0NvbG9yfSB0b1xuICAgICAqIEBwYXJhbSB7bnVtYmVyfSByYXRpbyAtIHRoZSBpbnRlcnBvbGF0aW9uIGNvZWZmaWNpZW50XG4gICAgICogQHBhcmFtIHtDb2xvcn0gW291dF0gLSBvcHRpb25hbCwgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAgICAgKiBAcmV0dXJuIHtDb2xvcn1cbiAgICAgKi9cbiAgICBDb2xvci5wcm90b3R5cGUubGVycCA9IGZ1bmN0aW9uICh0bywgcmF0aW8sIG91dCkge1xuICAgICAgICBvdXQgPSBvdXQgfHwgbmV3IENvbG9yKCk7XG4gICAgICAgIHZhciByID0gdGhpcy5yO1xuICAgICAgICB2YXIgZyA9IHRoaXMuZztcbiAgICAgICAgdmFyIGIgPSB0aGlzLmI7XG4gICAgICAgIHZhciBhID0gdGhpcy5hO1xuICAgICAgICBvdXQuciA9IHIgKyAodG8uciAtIHIpICogcmF0aW87XG4gICAgICAgIG91dC5nID0gZyArICh0by5nIC0gZykgKiByYXRpbztcbiAgICAgICAgb3V0LmIgPSBiICsgKHRvLmIgLSBiKSAqIHJhdGlvO1xuICAgICAgICBvdXQuYSA9IGEgKyAodG8uYSAtIGEpICogcmF0aW87XG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEBtZXRob2QgdG9TdHJpbmdcbiAgICAgKiBAcmV0dXJuIHtzdHJpbmd9XG4gICAgICovXG4gICAgQ29sb3IucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gXCJyZ2JhKFwiICtcbiAgICAgICAgICAgIHRoaXMuci50b0ZpeGVkKDIpICsgXCIsIFwiICtcbiAgICAgICAgICAgIHRoaXMuZy50b0ZpeGVkKDIpICsgXCIsIFwiICtcbiAgICAgICAgICAgIHRoaXMuYi50b0ZpeGVkKDIpICsgXCIsIFwiICtcbiAgICAgICAgICAgIHRoaXMuYS50b0ZpeGVkKDIpICsgXCIpXCJcbiAgICAgICAgO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBAbWV0aG9kIHNldFJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gcmVkIC0gdGhlIG5ldyBSZWQgY29tcG9uZW50XG4gICAgICogQHJldHVybiB7Q29sb3J9IHRoaXMgY29sb3JcbiAgICAgKi9cbiAgICBDb2xvci5wcm90b3R5cGUuc2V0UiA9IGZ1bmN0aW9uIChyZWQpIHtcbiAgICAgICAgdGhpcy5yID0gcmVkO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEBtZXRob2Qgc2V0R1xuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBncmVlbiAtIHRoZSBuZXcgR3JlZW4gY29tcG9uZW50XG4gICAgICogQHJldHVybiB7Q29sb3J9IHRoaXMgY29sb3JcbiAgICAgKi9cbiAgICBDb2xvci5wcm90b3R5cGUuc2V0RyA9IGZ1bmN0aW9uIChncmVlbikge1xuICAgICAgICB0aGlzLmcgPSBncmVlbjtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBAbWV0aG9kIHNldEJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gYmx1ZSAtIHRoZSBuZXcgQmx1ZSBjb21wb25lbnRcbiAgICAgKiBAcmV0dXJuIHtDb2xvcn0gdGhpcyBjb2xvclxuICAgICAqL1xuICAgIENvbG9yLnByb3RvdHlwZS5zZXRCID0gZnVuY3Rpb24gKGJsdWUpIHtcbiAgICAgICAgdGhpcy5iID0gYmx1ZTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBAbWV0aG9kIHNldEFcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gYWxwaGEgLSB0aGUgbmV3IEFscGhhIGNvbXBvbmVudFxuICAgICAqIEByZXR1cm4ge0NvbG9yfSB0aGlzIGNvbG9yXG4gICAgICovXG4gICAgQ29sb3IucHJvdG90eXBlLnNldEEgPSBmdW5jdGlvbiAoYWxwaGEpIHtcbiAgICAgICAgdGhpcy5hID0gYWxwaGE7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBAbWV0aG9kIHRvQ1NTXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG9wdCAtIFwicmdiYVwiLCBcInJnYlwiLCBcIiNyZ2JcIiBvciBcIiNycmdnYmJcIlxuICAgICAqIEByZXR1cm4ge3N0cmluZ31cbiAgICAgKi9cbiAgICBDb2xvci5wcm90b3R5cGUudG9DU1MgPSBmdW5jdGlvbiAoIG9wdCApIHtcbiAgICAgICAgaWYgKCBvcHQgPT09ICdyZ2JhJyApIHtcbiAgICAgICAgICAgIHJldHVybiBcInJnYmEoXCIgK1xuICAgICAgICAgICAgICAgICh0aGlzLnIgKiAyNTUgfCAwICkgKyBcIixcIiArXG4gICAgICAgICAgICAgICAgKHRoaXMuZyAqIDI1NSB8IDAgKSArIFwiLFwiICtcbiAgICAgICAgICAgICAgICAodGhpcy5iICogMjU1IHwgMCApICsgXCIsXCIgK1xuICAgICAgICAgICAgICAgIHRoaXMuYS50b0ZpeGVkKDIpICsgXCIpXCJcbiAgICAgICAgICAgIDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICggb3B0ID09PSAncmdiJyApIHtcbiAgICAgICAgICAgIHJldHVybiBcInJnYihcIiArXG4gICAgICAgICAgICAgICAgKHRoaXMuciAqIDI1NSB8IDAgKSArIFwiLFwiICtcbiAgICAgICAgICAgICAgICAodGhpcy5nICogMjU1IHwgMCApICsgXCIsXCIgK1xuICAgICAgICAgICAgICAgICh0aGlzLmIgKiAyNTUgfCAwICkgKyBcIilcIlxuICAgICAgICAgICAgO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuICcjJyArIHRoaXMudG9IRVgob3B0KTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBDbGFtcCB0aGlzIGNvbG9yIHRvIG1ha2UgYWxsIGNvbXBvbmVudHMgYmV0d2VlbiAwIHRvIDEuXG4gICAgICogQG1ldGhvZCBjbGFtcFxuICAgICAqL1xuICAgIENvbG9yLnByb3RvdHlwZS5jbGFtcCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5yID0gTWF0aC5jbGFtcDAxKHRoaXMucik7XG4gICAgICAgIHRoaXMuZyA9IE1hdGguY2xhbXAwMSh0aGlzLmcpO1xuICAgICAgICB0aGlzLmIgPSBNYXRoLmNsYW1wMDEodGhpcy5iKTtcbiAgICAgICAgdGhpcy5hID0gTWF0aC5jbGFtcDAxKHRoaXMuYSk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEBtZXRob2QgZnJvbUhFWFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBoZXhTdHJpbmdcbiAgICAgKiBAcmV0dXJuIHtDb2xvcn1cbiAgICAgKiBAY2hhaW5hYmxlXG4gICAgICovXG4gICAgQ29sb3IucHJvdG90eXBlLmZyb21IRVggPSBmdW5jdGlvbiAoaGV4U3RyaW5nKSB7XG4gICAgICAgIHZhciBoZXggPSBwYXJzZUludCgoKGhleFN0cmluZy5pbmRleE9mKCcjJykgPiAtMSkgPyBoZXhTdHJpbmcuc3Vic3RyaW5nKDEpIDogaGV4U3RyaW5nKSwgMTYpO1xuICAgICAgICB0aGlzLnIgPSAoaGV4ID4+IDE2KS8yNTU7XG4gICAgICAgIHRoaXMuZyA9ICgoaGV4ICYgMHgwMEZGMDApID4+IDgpLzI1NTtcbiAgICAgICAgdGhpcy5iID0gKChoZXggJiAweDAwMDBGRikpLzI1NTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEBtZXRob2QgdG9IRVhcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZm10IC0gXCIjcmdiXCIgb3IgXCIjcnJnZ2JiXCJcbiAgICAgKiBAcmV0dXJuIHtzdHJpbmd9XG4gICAgICovXG4gICAgQ29sb3IucHJvdG90eXBlLnRvSEVYID0gZnVuY3Rpb24gKCBmbXQgKSB7XG4gICAgICAgIHZhciBoZXggPSBbXG4gICAgICAgICAgICAodGhpcy5yICogMjU1IHwgMCApLnRvU3RyaW5nKDE2KSxcbiAgICAgICAgICAgICh0aGlzLmcgKiAyNTUgfCAwICkudG9TdHJpbmcoMTYpLFxuICAgICAgICAgICAgKHRoaXMuYiAqIDI1NSB8IDAgKS50b1N0cmluZygxNiksXG4gICAgICAgIF07XG4gICAgICAgIHZhciBpID0gLTE7XG4gICAgICAgIGlmICggZm10ID09PSAnI3JnYicgKSB7XG4gICAgICAgICAgICBmb3IgKCBpID0gMDsgaSA8IGhleC5sZW5ndGg7ICsraSApIHtcbiAgICAgICAgICAgICAgICBpZiAoIGhleFtpXS5sZW5ndGggPiAxICkge1xuICAgICAgICAgICAgICAgICAgICBoZXhbaV0gPSBoZXhbaV1bMF07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKCBmbXQgPT09ICcjcnJnZ2JiJyApIHtcbiAgICAgICAgICAgIGZvciAoIGkgPSAwOyBpIDwgaGV4Lmxlbmd0aDsgKytpICkge1xuICAgICAgICAgICAgICAgIGlmICggaGV4W2ldLmxlbmd0aCA9PT0gMSApIHtcbiAgICAgICAgICAgICAgICAgICAgaGV4W2ldID0gJzAnICsgaGV4W2ldO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gaGV4LmpvaW4oJycpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBDb252ZXJ0IHRvIDI0Yml0IHJnYiB2YWx1ZVxuICAgICAqIEBtZXRob2QgdG9SR0JWYWx1ZVxuICAgICAqIEByZXR1cm4ge251bWJlcn1cbiAgICAgKi9cbiAgICBDb2xvci5wcm90b3R5cGUudG9SR0JWYWx1ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIChNYXRoLmNsYW1wMDEodGhpcy5yKSAqIDI1NSA8PCAxNikgK1xuICAgICAgICAgICAgICAgKE1hdGguY2xhbXAwMSh0aGlzLmcpICogMjU1IDw8IDgpICtcbiAgICAgICAgICAgICAgIChNYXRoLmNsYW1wMDEodGhpcy5iKSAqIDI1NSk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEBtZXRob2QgZnJvbUhTVlxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBoXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHNcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gdlxuICAgICAqIEByZXR1cm4ge0NvbG9yfVxuICAgICAqIEBjaGFpbmFibGVcbiAgICAgKi9cbiAgICBDb2xvci5wcm90b3R5cGUuZnJvbUhTViA9IGZ1bmN0aW9uICggaCwgcywgdiApIHtcbiAgICAgICAgdmFyIHJnYiA9IEZpcmUuaHN2MnJnYiggaCwgcywgdiApO1xuICAgICAgICB0aGlzLnIgPSByZ2IucjtcbiAgICAgICAgdGhpcy5nID0gcmdiLmc7XG4gICAgICAgIHRoaXMuYiA9IHJnYi5iO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogQG1ldGhvZCB0b0hTVlxuICAgICAqIEByZXR1cm4ge29iamVjdH0gLSB7aDogbnVtYmVyLCBzOiBudW1iZXIsIHY6IG51bWJlcn1cbiAgICAgKi9cbiAgICBDb2xvci5wcm90b3R5cGUudG9IU1YgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBGaXJlLnJnYjJoc3YoIHRoaXMuciwgdGhpcy5nLCB0aGlzLmIgKTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIENvbG9yO1xufSkoKTtcblxuRmlyZS5Db2xvciA9IENvbG9yO1xuXG4vKipcbiAqIFRoZSBjb252ZW5pZW5jZSBtZXRob2QgdG8gY3JlYXRlIGEgbmV3IDwlIGNyb3NzbGluayBGaXJlLkNvbG9yIENvbG9yICU+XG4gKiBAbWV0aG9kIGNvbG9yXG4gKiBAcGFyYW0ge251bWJlcn0gW3I9MF1cbiAqIEBwYXJhbSB7bnVtYmVyfSBbZz0wXVxuICogQHBhcmFtIHtudW1iZXJ9IFtiPTBdXG4gKiBAcGFyYW0ge251bWJlcn0gW2E9MV1cbiAqIEByZXR1cm4ge0NvbG9yfVxuICovXG5GaXJlLmNvbG9yID0gZnVuY3Rpb24gY29sb3IgKHIsIGcsIGIsIGEpIHtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShyKSkge1xuICAgICAgICByZXR1cm4gbmV3IENvbG9yKHJbMF0sIHJbMV0sIHJbMl0sIHJbM10pO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcmV0dXJuIG5ldyBDb2xvcihyLCBnLCBiLCBhKTtcbiAgICB9XG59O1xuIiwicmVxdWlyZSgnLi92ZWMyJyk7XG5yZXF1aXJlKCcuL3JlY3QnKTtcbnJlcXVpcmUoJy4vY29sb3InKTtcbnJlcXVpcmUoJy4vbWF0cml4MjMnKTtcbiIsInZhciBWYWx1ZVR5cGUgPSByZXF1aXJlKCcuL3ZhbHVlLXR5cGUnKTtcbnZhciBKUyA9IHJlcXVpcmUoJy4uL2pzJyk7XG5cbi8qKlxuICogU2ltcGxlIG1hdHJpeCB0byBkbyAyRCBhZmZpbmUgdHJhbnNmb3JtYXRpb25zLlxuICogSXQgaXMgYWN0dWFsbHkgM3gzIGJ1dCB0aGUgbGFzdCByb3cgaXMgWzAgMCAxXS5cbiAqIEBjbGFzcyBNYXRyaXgyM1xuICogQGV4dGVuZHMgVmFsdWVUeXBlXG4gKiBAY29uc3RydWN0b3JcbiAqL1xudmFyIE1hdHJpeDIzID0gZnVuY3Rpb24gKCkge1xuICAgIC8qKlxuICAgICAqIEBwcm9wZXJ0eSBhXG4gICAgICogQHR5cGUge251bWJlcn1cbiAgICAgKiBAZGVmYXVsdCAxXG4gICAgICovXG4gICAgdGhpcy5hID0gMTtcblxuICAgIC8qKlxuICAgICAqIEBwcm9wZXJ0eSBiXG4gICAgICogQHR5cGUge251bWJlcn1cbiAgICAgKiBAZGVmYXVsdCAwXG4gICAgICovXG4gICAgdGhpcy5iID0gMDtcblxuICAgIC8qKlxuICAgICAqIEBwcm9wZXJ0eSBjXG4gICAgICogQHR5cGUge251bWJlcn1cbiAgICAgKiBAZGVmYXVsdCAwXG4gICAgICovXG4gICAgdGhpcy5jID0gMDtcblxuICAgIC8qKlxuICAgICAqIEBwcm9wZXJ0eSBkXG4gICAgICogQHR5cGUge251bWJlcn1cbiAgICAgKiBAZGVmYXVsdCAxXG4gICAgICovXG4gICAgdGhpcy5kID0gMTtcblxuICAgIC8qKlxuICAgICAqIEBwcm9wZXJ0eSB0eFxuICAgICAqIEB0eXBlIHtudW1iZXJ9XG4gICAgICogQGRlZmF1bHQgMFxuICAgICAqL1xuICAgIHRoaXMudHggPSAwO1xuXG4gICAgLyoqXG4gICAgICogQHByb3BlcnR5IHR5XG4gICAgICogQHR5cGUge251bWJlcn1cbiAgICAgKiBAZGVmYXVsdCAwXG4gICAgICovXG4gICAgdGhpcy50eSA9IDA7XG59O1xuSlMuZXh0ZW5kKE1hdHJpeDIzLCBWYWx1ZVR5cGUpO1xuRmlyZS5fZmFzdERlZmluZSgnRmlyZS5NYXRyaXgyMycsIE1hdHJpeDIzLCBbJ2EnLCAnYicsICdjJywgJ2QnLCAndHgnLCAndHknXSk7XG5GaXJlLk1hdHJpeDIzID0gTWF0cml4MjM7XG5cbi8qKlxuICogQHByb3BlcnR5IGlkZW50aXR5XG4gKiBAdHlwZSB7TWF0cml4MjN9XG4gKiBAc3RhdGljXG4gKi9cbk1hdHJpeDIzLmlkZW50aXR5ID0gbmV3IE1hdHJpeDIzKCk7XG5cbi8qKlxuICogQG1ldGhvZCBjbG9uZVxuICogQHJldHVybiB7TWF0cml4MjN9XG4gKi9cbk1hdHJpeDIzLnByb3RvdHlwZS5jbG9uZSA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgbWF0ID0gbmV3IE1hdHJpeDIzKCk7XG4gICAgbWF0LmEgPSB0aGlzLmE7XG4gICAgbWF0LmIgPSB0aGlzLmI7XG4gICAgbWF0LmMgPSB0aGlzLmM7XG4gICAgbWF0LmQgPSB0aGlzLmQ7XG4gICAgbWF0LnR4ID0gdGhpcy50eDtcbiAgICBtYXQudHkgPSB0aGlzLnR5O1xuICAgIHJldHVybiBtYXQ7XG59O1xuXG4vKipcbiAqIEBtZXRob2QgY2xvbmVcbiAqIEBwYXJhbSB7TWF0cml4MjN9IG90aGVyXG4gKiBAcmV0dXJuIHtNYXRyaXgyM31cbiAqIEBjaGFpbmFibGVcbiAqL1xuTWF0cml4MjMucHJvdG90eXBlLnNldCA9IGZ1bmN0aW9uIChvdGhlcikge1xuICAgIHRoaXMuYSA9IG90aGVyLmE7XG4gICAgdGhpcy5iID0gb3RoZXIuYjtcbiAgICB0aGlzLmMgPSBvdGhlci5jO1xuICAgIHRoaXMuZCA9IG90aGVyLmQ7XG4gICAgdGhpcy50eCA9IG90aGVyLnR4O1xuICAgIHRoaXMudHkgPSBvdGhlci50eTtcbiAgICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogQG1ldGhvZCBlcXVhbHNcbiAqIEBwYXJhbSB7TWF0cml4MjN9IG90aGVyXG4gKiBAcmV0dXJuIHtCb29sZWFufVxuICovXG5NYXRyaXgyMy5wcm90b3R5cGUuZXF1YWxzID0gZnVuY3Rpb24gKG90aGVyKSB7XG4gICAgcmV0dXJuIG90aGVyICYmXG4gICAgICAgICAgIHRoaXMuYSA9PT0gb3RoZXIuYSAmJlxuICAgICAgICAgICB0aGlzLmIgPT09IG90aGVyLmIgJiZcbiAgICAgICAgICAgdGhpcy5jID09PSBvdGhlci5jICYmXG4gICAgICAgICAgIHRoaXMuZCA9PT0gb3RoZXIuZCAmJlxuICAgICAgICAgICB0aGlzLnR4ID09PSBvdGhlci50eCAmJlxuICAgICAgICAgICB0aGlzLnR5ID09PSBvdGhlci50eTtcbn07XG5cbi8qKlxuICogQG1ldGhvZCB0b1N0cmluZ1xuICogQHJldHVybiB7c3RyaW5nfVxuICovXG5NYXRyaXgyMy5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuICd8JyArIHRoaXMuYS50b0ZpeGVkKDIpICsgJyAnICsgdGhpcy5jLnRvRml4ZWQoMikgKyAnICcgKyB0aGlzLnR4LnRvRml4ZWQoMikgK1xuICAgICAgICAnfFxcbnwnICsgdGhpcy5iLnRvRml4ZWQoMikgKyAnICcgKyB0aGlzLmQudG9GaXhlZCgyKSArICcgJyArIHRoaXMudHkudG9GaXhlZCgyKSArXG4gICAgICAgICd8XFxufDAuMDAgMC4wMCAxLjAwfCc7XG59O1xuXG4vKipcbiAqIFJlc2V0IHRoaXMgbWF0cml4IHRvIGlkZW50aXR5LlxuICogQG1ldGhvZCBpZGVudGl0eVxuICogQHJldHVybiB7TWF0cml4MjN9XG4gKiBAY2hhaW5hYmxlXG4gKi9cbk1hdHJpeDIzLnByb3RvdHlwZS5pZGVudGl0eSA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmEgPSAxO1xuICAgIHRoaXMuYiA9IDA7XG4gICAgdGhpcy5jID0gMDtcbiAgICB0aGlzLmQgPSAxO1xuICAgIHRoaXMudHggPSAwO1xuICAgIHRoaXMudHkgPSAwO1xuICAgIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBQcmVwZW5kIHRoaXMgbWF0cml4LlxuICogQG1ldGhvZCBwcmVwZW5kXG4gKiBAcGFyYW0ge01hdHJpeDIzfSBvdGhlclxuICogQHJldHVybiB7TWF0cml4MjN9XG4gKiBAY2hhaW5hYmxlXG4gKi9cbk1hdHJpeDIzLnByb3RvdHlwZS5wcmVwZW5kID0gZnVuY3Rpb24gKG90aGVyKSB7XG4gICAgdmFyIGEgPSBvdGhlci5hO1xuICAgIHZhciBiID0gb3RoZXIuYjtcbiAgICB2YXIgYyA9IG90aGVyLmM7XG4gICAgdmFyIGQgPSBvdGhlci5kO1xuICAgIGlmIChhICE9PSAxIHx8IGIgIT09IDAgfHwgYyAhPT0gMCB8fCBkICE9PSAxKSB7XG4gICAgICAgIHZhciBvYSA9IHRoaXMuYTtcbiAgICAgICAgdmFyIG9jID0gdGhpcy5jO1xuICAgICAgICB0aGlzLmEgPSBvYSAqIGEgKyB0aGlzLmIgKiBjO1xuICAgICAgICB0aGlzLmIgPSBvYSAqIGIgKyB0aGlzLmIgKiBkO1xuICAgICAgICB0aGlzLmMgPSBvYyAqIGEgKyB0aGlzLmQgKiBjO1xuICAgICAgICB0aGlzLmQgPSBvYyAqIGIgKyB0aGlzLmQgKiBkO1xuICAgICAgICB2YXIgb3R4ID0gdGhpcy50eDtcbiAgICAgICAgdGhpcy50eCA9IG90eCAqIGEgKyB0aGlzLnR5ICogYyArIG90aGVyLnR4O1xuICAgICAgICB0aGlzLnR5ID0gb3R4ICogYiArIHRoaXMudHkgKiBkICsgb3RoZXIudHk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICB0aGlzLnR4ICs9IG90aGVyLnR4O1xuICAgICAgICB0aGlzLnR5ICs9IG90aGVyLnR5O1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogSW52ZXJ0IHRoaXMgbWF0cml4LlxuICogQG1ldGhvZCBpbnZlcnRcbiAqIEByZXR1cm4ge01hdHJpeDIzfVxuICogQGNoYWluYWJsZVxuICovXG5NYXRyaXgyMy5wcm90b3R5cGUuaW52ZXJ0ID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBhID0gdGhpcy5hO1xuICAgIHZhciBiID0gdGhpcy5iO1xuICAgIHZhciBjID0gdGhpcy5jO1xuICAgIHZhciBkID0gdGhpcy5kO1xuICAgIHZhciB0eCA9IHRoaXMudHg7XG4gICAgdmFyIGRldGVybWluYW50ID0gMSAvIChhICogZCAtIGIgKiBjKTtcbiAgICB0aGlzLmEgPSBkICogZGV0ZXJtaW5hbnQ7XG4gICAgdGhpcy5iID0gLWIgKiBkZXRlcm1pbmFudDtcbiAgICB0aGlzLmMgPSAtYyAqIGRldGVybWluYW50O1xuICAgIHRoaXMuZCA9IGEgKiBkZXRlcm1pbmFudDtcbiAgICB0aGlzLnR4ID0gKGMgKiB0aGlzLnR5IC0gZCAqIHR4KSAqIGRldGVybWluYW50O1xuICAgIHRoaXMudHkgPSAoYiAqIHR4IC0gYSAqIHRoaXMudHkpICogZGV0ZXJtaW5hbnQ7XG4gICAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIEFwcGx5IHRyYW5zZm9ybXMgdG8gZ2l2ZW4gdmVjdG9yXG4gKiBAbWV0aG9kIHRyYW5zZm9ybVBvaW50XG4gKiBAcGFyYW0ge1ZlYzJ9IHZlY3RvclxuICogQHBhcmFtIHtWZWMyfSBbb3V0XSAtIG9wdGlvbmFsLCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHJldHVybiB7VmVjMn0gdGhlIHJlc3VsdFxuICovXG5NYXRyaXgyMy5wcm90b3R5cGUudHJhbnNmb3JtUG9pbnQgPSBmdW5jdGlvbiAodmVjdG9yLCBvdXQpIHtcbiAgICBvdXQgPSBvdXQgfHwgbmV3IFZlYzIoKTtcbiAgICB2YXIgeCA9IHZlY3Rvci54OyAgIC8vIHZlY3RvciBtYXkgPT09IG91dFxuICAgIG91dC54ID0gdGhpcy5hICogeCArIHRoaXMuYyAqIHZlY3Rvci55ICsgdGhpcy50eDtcbiAgICBvdXQueSA9IHRoaXMuYiAqIHggKyB0aGlzLmQgKiB2ZWN0b3IueSArIHRoaXMudHk7XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8vTWF0cml4MjMucHJvdG90eXBlLnRyYW5zZm9ybVBvaW50WFkgPSBmdW5jdGlvbiAoeCwgeSwgb3V0KSB7XG4vLyAgICBvdXQgPSBvdXQgfHwgbmV3IFZlYzIoKTtcbi8vICAgIG91dC54ID0gdGhpcy5hICogeCArIHRoaXMuYyAqIHkgKyB0aGlzLnR4O1xuLy8gICAgb3V0LnkgPSB0aGlzLmIgKiB4ICsgdGhpcy5kICogeSArIHRoaXMudHk7XG4vLyAgICByZXR1cm4gb3V0O1xuLy99O1xuXG4vKipcbiAqIEdldCBzY2FsaW5nIG9mIHRoaXMgbWF0cml4LlxuICpcbiAqIE5PVEU6IG5lZ2F0aXZlIHNjYWxpbmcgKG1pcnJvcmluZykgaXMgbm90IHN1cHBvcnRlZFxuICogQG1ldGhvZCBnZXRTY2FsZVxuICogQHBhcmFtIHtWZWMyfSBbb3V0XSAtIG9wdGlvbmFsLCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHJldHVybiB7VmVjMn0gdGhlIHJlc3VsdFxuICovXG5NYXRyaXgyMy5wcm90b3R5cGUuZ2V0U2NhbGUgPSBmdW5jdGlvbiAob3V0KSB7XG4gICAgb3V0ID0gb3V0IHx8IG5ldyBWZWMyKCk7XG4gICAgb3V0LnggPSBNYXRoLnNxcnQodGhpcy5hICogdGhpcy5hICsgdGhpcy5iICogdGhpcy5iKTtcbiAgICBvdXQueSA9IE1hdGguc3FydCh0aGlzLmMgKiB0aGlzLmMgKyB0aGlzLmQgKiB0aGlzLmQpO1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIEV4dHJhY3QgdHJhbnNsYXRpb24sIHJvdGF0aW9uIGFuZCBzY2FsaW5nIGNvbXBvbmVudCBmcm9tIHRoaXMgbWF0cml4LlxuICogT25seSBzdXBwb3J0IG5lZ2F0aXZlKG1pcnJvcmluZykgc2NhbGluZyBpbiBzb21lIHNwZWNpYWwgY2FzZS5cbiAqXG4gKiBAbWV0aG9kIGdldFRSU1xuICogQHJldHVybiB7b2JqZWN0fSB7dHJhbnNsYXRpb246IFZlYzIsIHJvdGF0aW9uOiBudW1iZXIsIHNjYWxlOiBWZWMyfVxuICovXG5NYXRyaXgyMy5wcm90b3R5cGUuZ2V0VFJTID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciByID0gMDtcbiAgICB2YXIgcyA9IHRoaXMuZ2V0U2NhbGUoKTtcbiAgICB2YXIgbWlycm9yZWQgPSB0aGlzLmEgIT09IDAgJiYgdGhpcy5hID09PSAtdGhpcy5kICYmIHRoaXMuYiA9PT0gMCAmJiB0aGlzLmMgPT09IDA7XG4gICAgaWYgKG1pcnJvcmVkKSB7XG4gICAgICAgIGlmICh0aGlzLmEgPCAwKSB7XG4gICAgICAgICAgICBzLnggPSAtcy54O1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcy55ID0gLXMueTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgciA9IHRoaXMuZ2V0Um90YXRpb24oKTtcbiAgICB9XG4gICAgcmV0dXJuIHtcbiAgICAgICAgdHJhbnNsYXRpb246IG5ldyBGaXJlLlZlYzIodGhpcy50eCwgdGhpcy50eSksXG4gICAgICAgIHJvdGF0aW9uOiByLFxuICAgICAgICBzY2FsZTogc1xuICAgIH07XG59O1xuXG4vKipcbiAqIFNldCBzY2FsaW5nIG9mIHRoaXMgbWF0cml4LlxuICpcbiAqIE5PVEU6IENhbiBub3Qgc2NhbGUgbmVnYXRpdmUgc2NhbGluZyAobWlycm9yaW5nKSBhbmQgemVybyBzY2FsaW5nIG1hdHJpeC5cbiAqIEBtZXRob2Qgc2V0U2NhbGVcbiAqIEBwYXJhbSB7VmVjMn0gc2NhbGVcbiAqIEByZXR1cm4ge01hdHJpeDIzfVxuICogQGNoYWluYWJsZVxuICovXG5NYXRyaXgyMy5wcm90b3R5cGUuc2V0U2NhbGUgPSBmdW5jdGlvbiAoc2NhbGUpIHtcbiAgICB2YXIgcyA9IHRoaXMuZ2V0U2NhbGUoKTtcbiAgICB2YXIgeCA9IHNjYWxlLnggLyBzLng7XG4gICAgdmFyIHkgPSBzY2FsZS55IC8gcy55O1xuICAgIHRoaXMuYSAqPSB4O1xuICAgIHRoaXMuYiAqPSB4O1xuICAgIHRoaXMuYyAqPSB5O1xuICAgIHRoaXMuZCAqPSB5O1xuICAgIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBHZXQgcm90YXRpb24gb2YgdGhpcyBtYXRyaXguXG4gKiBAbWV0aG9kIGdldFJvdGF0aW9uXG4gKiBAcmV0dXJuIHtudW1iZXJ9XG4gKi9cbk1hdHJpeDIzLnByb3RvdHlwZS5nZXRSb3RhdGlvbiA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgaGFzU2tldyA9IHRoaXMuYiAvIHRoaXMuYSAhPT0gLXRoaXMuYyAvIHRoaXMuZDtcbiAgICBpZiAoICFoYXNTa2V3ICkge1xuICAgICAgICByZXR1cm4gTWF0aC5hdGFuMigtdGhpcy5jLCB0aGlzLmQpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcmV0dXJuIChNYXRoLmF0YW4yKHRoaXMuYiwgdGhpcy5hKSArIE1hdGguYXRhbjIoLXRoaXMuYywgdGhpcy5kKSkgKiAwLjU7XG4gICAgfVxufTtcblxuLyoqXG4gKiBHZXQgdHJhbnNsYXRpb24gb2YgdGhpcyBtYXRyaXguXG4gKiBAbWV0aG9kIGdldFRyYW5zbGF0aW9uXG4gKiBAcmV0dXJuIHtWZWMyfVxuICovXG5NYXRyaXgyMy5wcm90b3R5cGUuZ2V0VHJhbnNsYXRpb24gPSBmdW5jdGlvbiAob3V0KSB7XG4gICAgb3V0ID0gb3V0IHx8IG5ldyBWZWMyKCk7XG4gICAgb3V0LnggPSB0aGlzLnR4O1xuICAgIG91dC55ID0gdGhpcy50eTtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBSb3RhdGUgdGhpcyBtYXRyaXggYnkgY291bnRlcmNsb2Nrd2lzZS5cbiAqIEBtZXRob2Qgcm90YXRlXG4gKiBAcGFyYW0ge251bWJlcn0gcmFkaWFuc1xuICogQHJldHVybiB7TWF0cml4MjN9XG4gKiBAY2hhaW5hYmxlXG4gKi9cbk1hdHJpeDIzLnByb3RvdHlwZS5yb3RhdGUgPSBmdW5jdGlvbiAocmFkaWFucykge1xuICAgIHZhciBzaW4gPSBNYXRoLnNpbihyYWRpYW5zKTtcbiAgICB2YXIgY29zID0gTWF0aC5jb3MocmFkaWFucyk7XG4gICAgdmFyIGEgPSB0aGlzLmE7XG4gICAgdmFyIGIgPSB0aGlzLmI7XG4gICAgdGhpcy5hID0gKGEgKiBjb3MgKyB0aGlzLmMgKiBzaW4pO1xuICAgIHRoaXMuYiA9IChiICogY29zICsgdGhpcy5kICogc2luKTtcbiAgICB0aGlzLmMgPSAodGhpcy5jICogY29zIC0gYSAqIHNpbik7XG4gICAgdGhpcy5kID0gKHRoaXMuZCAqIGNvcyAtIGIgKiBzaW4pO1xuICAgIHJldHVybiB0aGlzO1xufTtcblxuLypcbk1hdHJpeDIzLnByb3RvdHlwZS50cmFuc2xhdGUgPSBmdW5jdGlvbiAoeCwgeSkge1xuICAgIHRoaXMudHggKz0geDtcbiAgICB0aGlzLnR5ICs9IHk7XG59O1xuXG5NYXRyaXgyMy5wcm90b3R5cGUuc2NhbGUgPSBmdW5jdGlvbiAoeCwgeSkge1xuICAgIHRoaXMuYSAqPSB4O1xuICAgIHRoaXMuYiAqPSB4O1xuICAgIHRoaXMuYyAqPSB5O1xuICAgIHRoaXMuZCAqPSB5O1xuICAgIHRoaXMudHggKj0geDtcbiAgICB0aGlzLnR5ICo9IHk7XG4gICAgcmV0dXJuIHRoaXM7XG59O1xuKi9cbiIsInZhciBWYWx1ZVR5cGUgPSByZXF1aXJlKCcuL3ZhbHVlLXR5cGUnKTtcbnZhciBKUyA9IHJlcXVpcmUoJy4uL2pzJyk7XG5cbnZhciBSZWN0ID0gKGZ1bmN0aW9uICgpIHtcbiAgICAvKipcbiAgICAgKiBBIDJEIHJlY3RhbmdsZSBkZWZpbmVkIGJ5IHgsIHkgcG9zaXRpb24gYW5kIHdpZHRoLCBoZWlnaHQuXG4gICAgICpcbiAgICAgKiBzZWUgeyUgY3Jvc3NsaW5rIEZpcmUucmVjdCBGaXJlLnJlY3QgJX1cbiAgICAgKlxuICAgICAqIEBjbGFzcyBSZWN0XG4gICAgICogQGV4dGVuZHMgVmFsdWVUeXBlXG4gICAgICogQGNvbnN0cnVjdG9yXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IFt4PTBdXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IFt5PTBdXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IFt3PTBdXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IFtoPTBdXG4gICAgICovXG4gICAgZnVuY3Rpb24gUmVjdCggeCwgeSwgdywgaCApIHtcbiAgICAgICAgdGhpcy54ID0gdHlwZW9mIHggPT09ICdudW1iZXInID8geCA6IDAuMDtcbiAgICAgICAgdGhpcy55ID0gdHlwZW9mIHkgPT09ICdudW1iZXInID8geSA6IDAuMDtcbiAgICAgICAgdGhpcy53aWR0aCA9IHR5cGVvZiB3ID09PSAnbnVtYmVyJyA/IHcgOiAwLjA7XG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gdHlwZW9mIGggPT09ICdudW1iZXInID8gaCA6IDAuMDtcbiAgICB9XG4gICAgSlMuZXh0ZW5kKFJlY3QsIFZhbHVlVHlwZSk7XG4gICAgRmlyZS5fZmFzdERlZmluZSgnRmlyZS5SZWN0JywgUmVjdCwgWyd4JywgJ3knLCAnd2lkdGgnLCAnaGVpZ2h0J10pO1xuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIHJlY3RhbmdsZSBmcm9tIHR3byBjb29yZGluYXRlIHZhbHVlcy5cbiAgICAgKiBAc3RhdGljXG4gICAgICogQG1ldGhvZCBmcm9tTWluTWF4XG4gICAgICogQHBhcmFtIHtWZWMyfSB2MVxuICAgICAqIEBwYXJhbSB7VmVjMn0gdjJcbiAgICAgKiBAcmV0dXJuIHtSZWN0fVxuICAgICAqL1xuICAgIFJlY3QuZnJvbU1pbk1heCA9IGZ1bmN0aW9uICggdjEsIHYyICkge1xuICAgICAgICB2YXIgbWluX3ggPSBNYXRoLm1pbiggdjEueCwgdjIueCApO1xuICAgICAgICB2YXIgbWluX3kgPSBNYXRoLm1pbiggdjEueSwgdjIueSApO1xuICAgICAgICB2YXIgbWF4X3ggPSBNYXRoLm1heCggdjEueCwgdjIueCApO1xuICAgICAgICB2YXIgbWF4X3kgPSBNYXRoLm1heCggdjEueSwgdjIueSApO1xuXG4gICAgICAgIHJldHVybiBuZXcgUmVjdCAoIG1pbl94LCBtaW5feSwgbWF4X3ggLSBtaW5feCwgbWF4X3kgLSBtaW5feSApO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgcmVjdGFuZ2xlIGZyb20gbGVmdC10b3AgY29vcmRpbmF0ZSB2YWx1ZSBhbmQgc2l6ZS5cbiAgICAgKiBAc3RhdGljXG4gICAgICogQG1ldGhvZCBmcm9tVmVjMlxuICAgICAqIEBwYXJhbSB7VmVjMn0gbGVmdFRvcFxuICAgICAqIEBwYXJhbSB7VmVjMn0gc2l6ZVxuICAgICAqIEByZXR1cm4ge1JlY3R9XG4gICAgICovXG4gICAgUmVjdC5mcm9tVmVjMiA9IGZ1bmN0aW9uICggbGVmdFRvcCwgc2l6ZSApIHtcbiAgICAgICAgcmV0dXJuIG5ldyBSZWN0ICggbGVmdFRvcC54LCBsZWZ0VG9wLnksIHNpemUueCwgc2l6ZS55ICk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIENoZWNrcyBpZiByZWN0IGNvbnRhaW5zXG4gICAgICogQHN0YXRpY1xuICAgICAqIEBtZXRob2QgY29udGFpblxuICAgICAqIEBwYXJhbSBhIHtSZWN0fSBSZWN0IGFcbiAgICAgKiBAcGFyYW0gYiB7UmVjdH0gUmVjdCBiXG4gICAgICogQHJldHVybiB7TnVtYmVyfSBUaGUgY29udGFpbnMgcmVzdWx0LCAxIGlzIGEgY29udGFpbnMgYiwgLTEgaXMgYiBjb250YWlucyBhLCAwIGlzIG5vIGNvbnRhaW5zXG4gICAgICovXG4gICAgUmVjdC5jb250YWluID0gZnVuY3Rpb24gX0NvbnRhaW4gKCBhLCBiICkge1xuICAgICAgICBpZiAoIGEueCA8PSBiLnggJiZcbiAgICAgICAgICAgICBhLnggKyBhLndpZHRoID49IGIueCArIGIud2lkdGggJiZcbiAgICAgICAgICAgICBhLnkgPD0gYi55ICYmXG4gICAgICAgICAgICAgYS55ICsgYS5oZWlnaHQgPj0gYi55ICsgYi5oZWlnaHQgKVxuICAgICAgICB7XG4gICAgICAgICAgICAvLyBhIGNvbnRhaW5zIGJcbiAgICAgICAgICAgIHJldHVybiAxO1xuICAgICAgICB9XG4gICAgICAgIGlmICggYi54IDw9IGEueCAmJlxuICAgICAgICAgICAgIGIueCArIGIud2lkdGggPj0gYS54ICsgYS53aWR0aCAmJlxuICAgICAgICAgICAgIGIueSA8PSBhLnkgJiZcbiAgICAgICAgICAgICBiLnkgKyBiLmhlaWdodCA+PSBhLnkgKyBhLmhlaWdodCApXG4gICAgICAgIHtcbiAgICAgICAgICAgIC8vIGIgY29udGFpbnMgYVxuICAgICAgICAgICAgcmV0dXJuIC0xO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAwO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBAbWV0aG9kIGNsb25lXG4gICAgICogQHJldHVybiB7UmVjdH1cbiAgICAgKi9cbiAgICBSZWN0LnByb3RvdHlwZS5jbG9uZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBSZWN0KHRoaXMueCwgdGhpcy55LCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEBtZXRob2QgZXF1YWxzXG4gICAgICogQHBhcmFtIHtSZWN0fSBvdGhlclxuICAgICAqIEByZXR1cm4ge0Jvb2xlYW59XG4gICAgICovXG4gICAgUmVjdC5wcm90b3R5cGUuZXF1YWxzID0gZnVuY3Rpb24gKG90aGVyKSB7XG4gICAgICAgIHJldHVybiBvdGhlciAmJlxuICAgICAgICAgICAgICAgdGhpcy54ID09PSBvdGhlci54ICYmXG4gICAgICAgICAgICAgICB0aGlzLnkgPT09IG90aGVyLnkgJiZcbiAgICAgICAgICAgICAgIHRoaXMud2lkdGggPT09IG90aGVyLndpZHRoICYmXG4gICAgICAgICAgICAgICB0aGlzLmhlaWdodCA9PT0gb3RoZXIuaGVpZ2h0O1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBAbWV0aG9kIGxlcnBcbiAgICAgKiBAcGFyYW0ge1JlY3R9IHRvXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHJhdGlvIC0gdGhlIGludGVycG9sYXRpb24gY29lZmZpY2llbnRcbiAgICAgKiBAcGFyYW0ge1JlY3R9IFtvdXRdIC0gb3B0aW9uYWwsIHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gICAgICogQHJldHVybiB7UmVjdH1cbiAgICAgKi9cbiAgICBSZWN0LnByb3RvdHlwZS5sZXJwID0gZnVuY3Rpb24gKHRvLCByYXRpbywgb3V0KSB7XG4gICAgICAgIG91dCA9IG91dCB8fCBuZXcgUmVjdCgpO1xuICAgICAgICB2YXIgeCA9IHRoaXMueDtcbiAgICAgICAgdmFyIHkgPSB0aGlzLnk7XG4gICAgICAgIHZhciB3aWR0aCA9IHRoaXMud2lkdGg7XG4gICAgICAgIHZhciBoZWlnaHQgPSB0aGlzLmhlaWdodDtcbiAgICAgICAgb3V0LnggPSB4ICsgKHRvLnggLSB4KSAqIHJhdGlvO1xuICAgICAgICBvdXQueSA9IHkgKyAodG8ueSAtIHkpICogcmF0aW87XG4gICAgICAgIG91dC53aWR0aCA9IHdpZHRoICsgKHRvLndpZHRoIC0gd2lkdGgpICogcmF0aW87XG4gICAgICAgIG91dC5oZWlnaHQgPSBoZWlnaHQgKyAodG8uaGVpZ2h0IC0gaGVpZ2h0KSAqIHJhdGlvO1xuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBAbWV0aG9kIHRvU3RyaW5nXG4gICAgICogQHJldHVybiB7c3RyaW5nfVxuICAgICAqL1xuICAgIFJlY3QucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gJygnICsgdGhpcy54LnRvRml4ZWQoMikgKyAnLCAnICsgdGhpcy55LnRvRml4ZWQoMikgKyAnLCAnICsgdGhpcy53aWR0aC50b0ZpeGVkKDIpICtcbiAgICAgICAgICAgICAgICcsICcgKyB0aGlzLmhlaWdodC50b0ZpeGVkKDIpICsgJyknO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBAcHJvcGVydHkgeE1pblxuICAgICAqIEB0eXBlIG51bWJlclxuICAgICAqL1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShSZWN0LnByb3RvdHlwZSwgJ3hNaW4nLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpcy54OyB9LFxuICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgdGhpcy53aWR0aCArPSB0aGlzLnggLSB2YWx1ZTtcbiAgICAgICAgICAgIHRoaXMueCA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICAvKipcbiAgICAgKiBAcHJvcGVydHkgeU1pblxuICAgICAqIEB0eXBlIG51bWJlclxuICAgICAqL1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShSZWN0LnByb3RvdHlwZSwgJ3lNaW4nLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpcy55OyB9LFxuICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5oZWlnaHQgKz0gdGhpcy55IC0gdmFsdWU7XG4gICAgICAgICAgICB0aGlzLnkgPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgLyoqXG4gICAgICogQHByb3BlcnR5IHhNYXhcbiAgICAgKiBAdHlwZSBudW1iZXJcbiAgICAgKi9cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoUmVjdC5wcm90b3R5cGUsICd4TWF4Jywge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXMueCArIHRoaXMud2lkdGg7IH0sXG4gICAgICAgIHNldDogZnVuY3Rpb24gKHZhbHVlKSB7IHRoaXMud2lkdGggPSB2YWx1ZSAtIHRoaXMueDsgfVxuICAgIH0pO1xuXG4gICAgLyoqXG4gICAgICogQHByb3BlcnR5IHlNYXhcbiAgICAgKiBAdHlwZSBudW1iZXJcbiAgICAgKi9cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoUmVjdC5wcm90b3R5cGUsICd5TWF4Jywge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXMueSArIHRoaXMuaGVpZ2h0OyB9LFxuICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkgeyB0aGlzLmhlaWdodCA9IHZhbHVlIC0gdGhpcy55OyB9XG4gICAgfSk7XG5cbiAgICAvKipcbiAgICAgKiBAcHJvcGVydHkgY2VudGVyXG4gICAgICogQHR5cGUgbnVtYmVyXG4gICAgICovXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFJlY3QucHJvdG90eXBlLCAnY2VudGVyJywge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgRmlyZS5WZWMyKCB0aGlzLnggKyB0aGlzLndpZHRoICogMC41LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMueSArIHRoaXMuaGVpZ2h0ICogMC41ICk7XG4gICAgICAgIH0sXG4gICAgICAgIHNldDogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLnggPSB2YWx1ZS54IC0gdGhpcy53aWR0aCAqIDAuNTtcbiAgICAgICAgICAgIHRoaXMueSA9IHZhbHVlLnkgLSB0aGlzLmhlaWdodCAqIDAuNTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgLyoqXG4gICAgICogQHByb3BlcnR5IHNpemVcbiAgICAgKiBAdHlwZSB7VmVjMn1cbiAgICAgKi9cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoUmVjdC5wcm90b3R5cGUsICdzaXplJywge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgRmlyZS5WZWMyKHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KTtcbiAgICAgICAgfSxcbiAgICAgICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMud2lkdGggPSB2YWx1ZS54O1xuICAgICAgICAgICAgdGhpcy5oZWlnaHQgPSB2YWx1ZS55O1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICAvKipcbiAgICAgKiBAbWV0aG9kIGludGVyc2VjdHNcbiAgICAgKiBAcGFyYW0ge1JlY3R9IHJlY3RcbiAgICAgKiBAdHlwZSB7Qm9vbGVhbn1cbiAgICAgKi9cbiAgICBSZWN0LnByb3RvdHlwZS5pbnRlcnNlY3RzID0gZnVuY3Rpb24gKCByZWN0ICkge1xuICAgICAgICByZXR1cm4gRmlyZS5JbnRlcnNlY3Rpb24ucmVjdFJlY3QoIHRoaXMsIHJlY3QgKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0cnVlIGlmIHRoZSBwb2ludCBpbnNpZGUgdGhpcyByZWN0YW5nbGUuXG4gICAgICogQG1ldGhvZCBjb250YWluc1xuICAgICAqIEBwYXJhbSB7VmVjMn0gcG9pbnRcbiAgICAgKiBAdHlwZSB7Qm9vbGVhbn1cbiAgICAgKi9cbiAgICBSZWN0LnByb3RvdHlwZS5jb250YWlucyA9IGZ1bmN0aW9uICggcG9pbnQgKSB7XG4gICAgICAgIGlmICggdGhpcy54IDw9IHBvaW50LnggJiZcbiAgICAgICAgICAgICB0aGlzLnggKyB0aGlzLndpZHRoID49IHBvaW50LnggJiZcbiAgICAgICAgICAgICB0aGlzLnkgPD0gcG9pbnQueSAmJlxuICAgICAgICAgICAgIHRoaXMueSArIHRoaXMuaGVpZ2h0ID49IHBvaW50LnkgKVxuICAgICAgICB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgb3RoZXIgcmVjdCB0b3RhbGx5IGluc2lkZSB0aGlzIHJlY3RhbmdsZS5cbiAgICAgKiBAbWV0aG9kIGNvbnRhaW5zUmVjdFxuICAgICAqIEBwYXJhbSB7UmVjdH0gcmVjdFxuICAgICAqIEB0eXBlIHtCb29sZWFufVxuICAgICAqL1xuICAgIFJlY3QucHJvdG90eXBlLmNvbnRhaW5zUmVjdCA9IGZ1bmN0aW9uICggcmVjdCApIHtcbiAgICAgICAgaWYgKCB0aGlzLnggPD0gcmVjdC54ICYmXG4gICAgICAgICAgICAgdGhpcy54ICsgdGhpcy53aWR0aCA+PSByZWN0LnggKyByZWN0LndpZHRoICYmXG4gICAgICAgICAgICAgdGhpcy55IDw9IHJlY3QueSAmJlxuICAgICAgICAgICAgIHRoaXMueSArIHRoaXMuaGVpZ2h0ID49IHJlY3QueSArIHJlY3QuaGVpZ2h0IClcbiAgICAgICAge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH07XG5cbiAgICByZXR1cm4gUmVjdDtcbn0pKCk7XG5cbkZpcmUuUmVjdCA9IFJlY3Q7XG5cbi8qKlxuICogQG1vZHVsZSBGaXJlXG4gKi9cbi8qKlxuICogVGhlIGNvbnZlbmllbmNlIG1ldGhvZCB0byBjcmVhdGUgYSBuZXcgUmVjdFxuICogQG1ldGhvZCByZWN0XG4gKiBAcGFyYW0ge251bWJlcn0gW3g9MF1cbiAqIEBwYXJhbSB7bnVtYmVyfSBbeT0wXVxuICogQHBhcmFtIHtudW1iZXJ9IFt3PTBdXG4gKiBAcGFyYW0ge251bWJlcn0gW2g9MF1cbiAqIEByZXR1cm4ge1JlY3R9XG4gKi9cbkZpcmUucmVjdCA9IGZ1bmN0aW9uIHJlY3QgKHgsIHksIHcsIGgpIHtcbiAgICBpZiAoQXJyYXkuaXNBcnJheSh4KSkge1xuICAgICAgICByZXR1cm4gbmV3IFJlY3QoeFswXSwgeFsxXSwgeFsyXSwgeFszXSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICByZXR1cm4gbmV3IFJlY3QoeCwgeSwgdywgaCk7XG4gICAgfVxufTtcbiIsInZhciBKUyA9IHJlcXVpcmUoJy4uL2pzJyk7XG5cbi8qKlxuICogVGhlIGJhc2UgY2xhc3Mgb2YgYWxsIHZhbHVlIHR5cGVzLlxuICogQGNsYXNzIFZhbHVlVHlwZVxuICogQGNvbnN0cnVjdG9yXG4gKi9cbmZ1bmN0aW9uIFZhbHVlVHlwZSAoKSB7fVxuSlMuc2V0Q2xhc3NOYW1lKCdGaXJlLlZhbHVlVHlwZScsIFZhbHVlVHlwZSk7XG5cbkpTLm1peGluKFZhbHVlVHlwZS5wcm90b3R5cGUsIHtcbiAgICAvKipcbiAgICAgKiAhI2VuIFRoaXMgbWV0aG9kIHJldHVybnMgYW4gZXhhY3QgY29weSBvZiBjdXJyZW50IHZhbHVlLlxuICAgICAqICEjemgg5YWL6ZqG5b2T5YmN5YC877yM6K+l5pa55rOV6L+U5Zue5LiA5Liq5paw5a+56LGh77yM5paw5a+56LGh55qE5YC85ZKM5Y6f5a+56LGh55u4562J44CCXG4gICAgICogQG1ldGhvZCBjbG9uZVxuICAgICAqIEByZXR1cm4ge1ZhbHVlVHlwZX1cbiAgICAgKi9cbiAgICBjbG9uZTogZnVuY3Rpb24gKCkge1xuICAgICAgICBGaXJlLmVycm9yKFwiJS5jbG9uZSBub3QgeWV0IGltcGxlbWVudGVkLlwiLCBKUy5nZXRDbGFzc05hbWUodGhpcykpO1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogQ29tcGFyZXMgdGhpcyBvYmplY3Qgd2l0aCB0aGUgb3RoZXIgb25lLlxuICAgICAqIEBtZXRob2QgZXF1YWxzXG4gICAgICogQHBhcmFtIHtWYWx1ZVR5cGV9IG90aGVyXG4gICAgICogQHJldHVybiB7Qm9vbGVhbn1cbiAgICAgKi9cbiAgICBlcXVhbHM6IGZ1bmN0aW9uIChvdGhlcikge1xuICAgICAgICBGaXJlLmVycm9yKFwiJS5lcXVhbHMgbm90IHlldCBpbXBsZW1lbnRlZC5cIiwgSlMuZ2V0Q2xhc3NOYW1lKHRoaXMpKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBAbWV0aG9kIHRvU3RyaW5nXG4gICAgICogQHJldHVybiB7c3RyaW5nfVxuICAgICAqL1xuICAgIHRvU3RyaW5nOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiAnW29iamVjdCBPYmplY3RdJztcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogTGluZWFybHkgaW50ZXJwb2xhdGVzIGJldHdlZW4gdGhpcyB2YWx1ZSB0byB0byB2YWx1ZSBieSByYXRpbyB3aGljaCBpcyBpbiB0aGUgcmFuZ2UgWzAsIDFdLlxuICAgICAqIFdoZW4gcmF0aW8gPSAwIHJldHVybnMgdGhpcy4gV2hlbiByYXRpbyA9IDEgcmV0dXJuIHRvLiBXaGVuIHJhdGlvID0gMC41IHJldHVybnMgdGhlIGF2ZXJhZ2Ugb2YgdGhpcyBhbmQgdG8uXG4gICAgICogQG1ldGhvZCBsZXJwXG4gICAgICogQHBhcmFtIHtWYWx1ZVR5cGV9IHRvIC0gdGhlIHRvIHZhbHVlXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHJhdGlvIC0gdGhlIGludGVycG9sYXRpb24gY29lZmZpY2llbnRcbiAgICAgKiBAcmV0dXJuIHtWYWx1ZVR5cGV9XG4gICAgICovXG4gICAgbGVycDogZnVuY3Rpb24gKHRvLCByYXRpbykge1xuICAgICAgICByZXR1cm4gdGhpcy5jbG9uZSgpO1xuICAgIH1cbn0pO1xuXG5GaXJlLlZhbHVlVHlwZSA9IFZhbHVlVHlwZTtcblxuRmlyZS5pc1ZhbHVlVHlwZSA9IGZ1bmN0aW9uICh0eXBlKSB7XG4gICAgcmV0dXJuIHR5cGUgaW5zdGFuY2VvZiBWYWx1ZVR5cGU7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFZhbHVlVHlwZTtcbiIsInZhciBWYWx1ZVR5cGUgPSByZXF1aXJlKCcuL3ZhbHVlLXR5cGUnKTtcbnZhciBKUyA9IHJlcXVpcmUoJy4uL2pzJyk7XG5cbi8qKlxuICogUmVwcmVzZW50YXRpb24gb2YgMkQgdmVjdG9ycyBhbmQgcG9pbnRzLlxuICpcbiAqIHNlZSB7JSBjcm9zc2xpbmsgRmlyZS52MiBGaXJlLnYyICV9XG4gKiBAY2xhc3MgVmVjMlxuICogQGV4dGVuZHMgVmFsdWVUeXBlXG4gKiBAY29uc3RydWN0b3JcbiAqIEBwYXJhbSB7bnVtYmVyfSBbeD0wXVxuICogQHBhcmFtIHtudW1iZXJ9IFt5PTBdXG4gKi9cbmZ1bmN0aW9uIFZlYzIgKHgsIHkpIHtcbiAgICB0aGlzLnggPSAodHlwZW9mIHggPT09ICdudW1iZXInID8geCA6IDAuMCk7XG4gICAgdGhpcy55ID0gKHR5cGVvZiB5ID09PSAnbnVtYmVyJyA/IHkgOiAwLjApO1xufVxuSlMuZXh0ZW5kKFZlYzIsIFZhbHVlVHlwZSk7XG5GaXJlLl9mYXN0RGVmaW5lKCdGaXJlLlZlYzInLCBWZWMyLCBbJ3gnLCAneSddKTtcblxuSlMubWl4aW4oVmVjMi5wcm90b3R5cGUsIHtcblxuICAgIC8qKlxuICAgICAqICEjZW4gY2xvbmUgYSBWZWMyIHZhbHVlXG4gICAgICogISN6aCDlhYvpmobkuIDkuKogVmVjMiDlgLxcbiAgICAgKiBAbWV0aG9kIGNsb25lXG4gICAgICogQHJldHVybiB7VmVjMn1cbiAgICAgKi9cbiAgICBjbG9uZTogZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gbmV3IFZlYzIodGhpcy54LCB0aGlzLnkpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBAbWV0aG9kIHNldFxuICAgICAqIEBwYXJhbSB7VmVjMn0gbmV3VmFsdWUgLSAhI2VuIG5ldyB2YWx1ZSB0byBzZXQuICEjemgg6KaB6K6+572u55qE5paw5YC8XG4gICAgICogQHJldHVybiB7VmVjMn0gcmV0dXJucyB0aGlzXG4gICAgICogQGNoYWluYWJsZVxuICAgICAqL1xuICAgIHNldDogZnVuY3Rpb24gKG5ld1ZhbHVlKSB7XG4gICAgICAgIHRoaXMueCA9IG5ld1ZhbHVlLng7XG4gICAgICAgIHRoaXMueSA9IG5ld1ZhbHVlLnk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBAbWV0aG9kIGVxdWFsc1xuICAgICAqIEBwYXJhbSB7VmVjMn0gb3RoZXJcbiAgICAgKiBAcmV0dXJuIHtCb29sZWFufVxuICAgICAqL1xuICAgIGVxdWFsczogZnVuY3Rpb24gKG90aGVyKSB7XG4gICAgICAgIHJldHVybiBvdGhlciAmJiB0aGlzLnggPT09IG90aGVyLnggJiYgdGhpcy55ID09PSBvdGhlci55O1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBAbWV0aG9kIHRvU3RyaW5nXG4gICAgICogQHJldHVybiB7c3RyaW5nfVxuICAgICAqL1xuICAgIHRvU3RyaW5nOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBcIihcIiArXG4gICAgICAgICAgICAgICB0aGlzLngudG9GaXhlZCgyKSArIFwiLCBcIiArXG4gICAgICAgICAgICAgICB0aGlzLnkudG9GaXhlZCgyKSArIFwiKVwiXG4gICAgICAgICAgICA7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEBtZXRob2QgbGVycFxuICAgICAqIEBwYXJhbSB7VmVjMn0gdG9cbiAgICAgKiBAcGFyYW0ge251bWJlcn0gcmF0aW8gLSB0aGUgaW50ZXJwb2xhdGlvbiBjb2VmZmljaWVudFxuICAgICAqIEBwYXJhbSB7VmVjMn0gW291dF0gLSBvcHRpb25hbCwgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAgICAgKiBAcmV0dXJuIHtWZWMyfVxuICAgICAqL1xuICAgIGxlcnA6IGZ1bmN0aW9uICh0bywgcmF0aW8sIG91dCkge1xuICAgICAgICBvdXQgPSBvdXQgfHwgbmV3IFZlYzIoKTtcbiAgICAgICAgdmFyIHggPSB0aGlzLng7XG4gICAgICAgIHZhciB5ID0gdGhpcy55O1xuICAgICAgICBvdXQueCA9IHggKyAodG8ueCAtIHgpICogcmF0aW87XG4gICAgICAgIG91dC55ID0geSArICh0by55IC0geSkgKiByYXRpbztcbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogQWRkcyB0aGlzIHZlY3Rvci4gSWYgeW91IHdhbnQgdG8gc2F2ZSByZXN1bHQgdG8gYW5vdGhlciB2ZWN0b3IsIHVzZSBhZGQoKSBpbnN0ZWFkLlxuICAgICAqIEBtZXRob2QgYWRkU2VsZlxuICAgICAqIEBwYXJhbSB7VmVjMn0gdmVjdG9yXG4gICAgICogQHJldHVybiB7VmVjMn0gcmV0dXJucyB0aGlzXG4gICAgICogQGNoYWluYWJsZVxuICAgICAqL1xuICAgIGFkZFNlbGY6IGZ1bmN0aW9uICh2ZWN0b3IpIHtcbiAgICAgICAgdGhpcy54ICs9IHZlY3Rvci54O1xuICAgICAgICB0aGlzLnkgKz0gdmVjdG9yLnk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBBZGRzIHRvdyB2ZWN0b3JzLCBhbmQgcmV0dXJucyB0aGUgbmV3IHJlc3VsdC5cbiAgICAgKiBAbWV0aG9kIGFkZFxuICAgICAqIEBwYXJhbSB7VmVjMn0gdmVjdG9yXG4gICAgICogQHBhcmFtIHtWZWMyfSBbb3V0XSAtIG9wdGlvbmFsLCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICAgICAqIEByZXR1cm4ge1ZlYzJ9IHRoZSByZXN1bHRcbiAgICAgKi9cbiAgICBhZGQ6IGZ1bmN0aW9uICh2ZWN0b3IsIG91dCkge1xuICAgICAgICBvdXQgPSBvdXQgfHwgbmV3IFZlYzIoKTtcbiAgICAgICAgb3V0LnggPSB0aGlzLnggKyB2ZWN0b3IueDtcbiAgICAgICAgb3V0LnkgPSB0aGlzLnkgKyB2ZWN0b3IueTtcbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogU3VidHJhY3RzIG9uZSB2ZWN0b3IgZnJvbSB0aGlzLiBJZiB5b3Ugd2FudCB0byBzYXZlIHJlc3VsdCB0byBhbm90aGVyIHZlY3RvciwgdXNlIHN1YigpIGluc3RlYWQuXG4gICAgICogQG1ldGhvZCBzdWJTZWxmXG4gICAgICogQHBhcmFtIHtWZWMyfSB2ZWN0b3JcbiAgICAgKiBAcmV0dXJuIHtWZWMyfSByZXR1cm5zIHRoaXNcbiAgICAgKiBAY2hhaW5hYmxlXG4gICAgICovXG4gICAgc3ViU2VsZjogZnVuY3Rpb24gKHZlY3Rvcikge1xuICAgICAgICB0aGlzLnggLT0gdmVjdG9yLng7XG4gICAgICAgIHRoaXMueSAtPSB2ZWN0b3IueTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFN1YnRyYWN0cyBvbmUgdmVjdG9yIGZyb20gdGhpcywgYW5kIHJldHVybnMgdGhlIG5ldyByZXN1bHQuXG4gICAgICogQG1ldGhvZCBzdWJcbiAgICAgKiBAcGFyYW0ge1ZlYzJ9IHZlY3RvclxuICAgICAqIEBwYXJhbSB7VmVjMn0gW291dF0gLSBvcHRpb25hbCwgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAgICAgKiBAcmV0dXJuIHtWZWMyfSB0aGUgcmVzdWx0XG4gICAgICovXG4gICAgc3ViOiBmdW5jdGlvbiAodmVjdG9yLCBvdXQpIHtcbiAgICAgICAgb3V0ID0gb3V0IHx8IG5ldyBWZWMyKCk7XG4gICAgICAgIG91dC54ID0gdGhpcy54IC0gdmVjdG9yLng7XG4gICAgICAgIG91dC55ID0gdGhpcy55IC0gdmVjdG9yLnk7XG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIE11bHRpcGxpZXMgdGhpcyBieSBhIG51bWJlci4gSWYgeW91IHdhbnQgdG8gc2F2ZSByZXN1bHQgdG8gYW5vdGhlciB2ZWN0b3IsIHVzZSBtdWwoKSBpbnN0ZWFkLlxuICAgICAqIEBtZXRob2QgbXVsU2VsZlxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBudW1cbiAgICAgKiBAcmV0dXJuIHtWZWMyfSByZXR1cm5zIHRoaXNcbiAgICAgKiBAY2hhaW5hYmxlXG4gICAgICovXG4gICAgbXVsU2VsZjogZnVuY3Rpb24gKG51bSkge1xuICAgICAgICB0aGlzLnggKj0gbnVtO1xuICAgICAgICB0aGlzLnkgKj0gbnVtO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogTXVsdGlwbGllcyBieSBhIG51bWJlciwgYW5kIHJldHVybnMgdGhlIG5ldyByZXN1bHQuXG4gICAgICogQG1ldGhvZCBtdWxcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gbnVtXG4gICAgICogQHBhcmFtIHtWZWMyfSBbb3V0XSAtIG9wdGlvbmFsLCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICAgICAqIEByZXR1cm4ge1ZlYzJ9IHRoZSByZXN1bHRcbiAgICAgKi9cbiAgICBtdWw6IGZ1bmN0aW9uIChudW0sIG91dCkge1xuICAgICAgICBvdXQgPSBvdXQgfHwgbmV3IFZlYzIoKTtcbiAgICAgICAgb3V0LnggPSB0aGlzLnggKiBudW07XG4gICAgICAgIG91dC55ID0gdGhpcy55ICogbnVtO1xuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBNdWx0aXBsaWVzIHR3byB2ZWN0b3JzLlxuICAgICAqIEBtZXRob2Qgc2NhbGVTZWxmXG4gICAgICogQHBhcmFtIHtWZWMyfSB2ZWN0b3JcbiAgICAgKiBAcmV0dXJuIHtWZWMyfSByZXR1cm5zIHRoaXNcbiAgICAgKiBAY2hhaW5hYmxlXG4gICAgICovXG4gICAgc2NhbGVTZWxmOiBmdW5jdGlvbiAodmVjdG9yKSB7XG4gICAgICAgIHRoaXMueCAqPSB2ZWN0b3IueDtcbiAgICAgICAgdGhpcy55ICo9IHZlY3Rvci55O1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogTXVsdGlwbGllcyB0d28gdmVjdG9ycywgYW5kIHJldHVybnMgdGhlIG5ldyByZXN1bHQuXG4gICAgICogQG1ldGhvZCBzY2FsZVxuICAgICAqIEBwYXJhbSB7VmVjMn0gdmVjdG9yXG4gICAgICogQHBhcmFtIHtWZWMyfSBbb3V0XSAtIG9wdGlvbmFsLCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICAgICAqIEByZXR1cm4ge1ZlYzJ9IHRoZSByZXN1bHRcbiAgICAgKi9cbiAgICBzY2FsZTogZnVuY3Rpb24gKHZlY3Rvciwgb3V0KSB7XG4gICAgICAgIG91dCA9IG91dCB8fCBuZXcgVmVjMigpO1xuICAgICAgICBvdXQueCA9IHRoaXMueCAqIHZlY3Rvci54O1xuICAgICAgICBvdXQueSA9IHRoaXMueSAqIHZlY3Rvci55O1xuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBEaXZpZGVzIHR3byB2ZWN0b3JzLiBJZiB5b3Ugd2FudCB0byBzYXZlIHJlc3VsdCB0byBhbm90aGVyIHZlY3RvciwgdXNlIGRpdigpIGluc3RlYWQuXG4gICAgICogQG1ldGhvZCBkaXZTZWxmXG4gICAgICogQHBhcmFtIHtWZWMyfSB2ZWN0b3JcbiAgICAgKiBAcmV0dXJuIHtWZWMyfSByZXR1cm5zIHRoaXNcbiAgICAgKiBAY2hhaW5hYmxlXG4gICAgICovXG4gICAgZGl2U2VsZjogZnVuY3Rpb24gKHZlY3Rvcikge1xuICAgICAgICB0aGlzLnggLz0gdmVjdG9yLng7XG4gICAgICAgIHRoaXMueSAvPSB2ZWN0b3IueTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIERpdmlkZXMgdHdvIHZlY3RvcnMsIGFuZCByZXR1cm5zIHRoZSBuZXcgcmVzdWx0LlxuICAgICAqIEBtZXRob2QgZGl2XG4gICAgICogQHBhcmFtIHtWZWMyfSB2ZWN0b3JcbiAgICAgKiBAcGFyYW0ge1ZlYzJ9IFtvdXRdIC0gb3B0aW9uYWwsIHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gICAgICogQHJldHVybiB7VmVjMn0gdGhlIHJlc3VsdFxuICAgICAqL1xuICAgIGRpdjogZnVuY3Rpb24gKHZlY3Rvciwgb3V0KSB7XG4gICAgICAgIG91dCA9IG91dCB8fCBuZXcgVmVjMigpO1xuICAgICAgICBvdXQueCA9IHRoaXMueCAvIHZlY3Rvci54O1xuICAgICAgICBvdXQueSA9IHRoaXMueSAvIHZlY3Rvci55O1xuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBOZWdhdGVzIHRoZSBjb21wb25lbnRzLiBJZiB5b3Ugd2FudCB0byBzYXZlIHJlc3VsdCB0byBhbm90aGVyIHZlY3RvciwgdXNlIG5lZygpIGluc3RlYWQuXG4gICAgICogQG1ldGhvZCBuZWdTZWxmXG4gICAgICogQHJldHVybiB7VmVjMn0gcmV0dXJucyB0aGlzXG4gICAgICogQGNoYWluYWJsZVxuICAgICAqL1xuICAgIG5lZ1NlbGY6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy54ID0gLXRoaXMueDtcbiAgICAgICAgdGhpcy55ID0gLXRoaXMueTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIE5lZ2F0ZXMgdGhlIGNvbXBvbmVudHMsIGFuZCByZXR1cm5zIHRoZSBuZXcgcmVzdWx0LlxuICAgICAqIEBtZXRob2QgbmVnXG4gICAgICogQHBhcmFtIHtWZWMyfSBbb3V0XSAtIG9wdGlvbmFsLCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICAgICAqIEByZXR1cm4ge1ZlYzJ9IHRoZSByZXN1bHRcbiAgICAgKi9cbiAgICBuZWc6IGZ1bmN0aW9uIChvdXQpIHtcbiAgICAgICAgb3V0ID0gb3V0IHx8IG5ldyBWZWMyKCk7XG4gICAgICAgIG91dC54ID0gLXRoaXMueDtcbiAgICAgICAgb3V0LnkgPSAtdGhpcy55O1xuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBEb3QgcHJvZHVjdFxuICAgICAqIEBtZXRob2QgZG90XG4gICAgICogQHBhcmFtIHtWZWMyfSBbdmVjdG9yXVxuICAgICAqIEByZXR1cm4ge251bWJlcn0gdGhlIHJlc3VsdFxuICAgICAqL1xuICAgIGRvdDogZnVuY3Rpb24gKHZlY3Rvcikge1xuICAgICAgICByZXR1cm4gdGhpcy54ICogdmVjdG9yLnggKyB0aGlzLnkgKiB2ZWN0b3IueTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogQ3Jvc3MgcHJvZHVjdFxuICAgICAqIEBtZXRob2QgY3Jvc3NcbiAgICAgKiBAcGFyYW0ge1ZlYzJ9IFt2ZWN0b3JdXG4gICAgICogQHJldHVybiB7bnVtYmVyfSB0aGUgcmVzdWx0XG4gICAgICovXG4gICAgY3Jvc3M6IGZ1bmN0aW9uICh2ZWN0b3IpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMueSAqIHZlY3Rvci54IC0gdGhpcy54ICogdmVjdG9yLnk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIGxlbmd0aCBvZiB0aGlzIHZlY3Rvci5cbiAgICAgKiBAbWV0aG9kIG1hZ1xuICAgICAqIEByZXR1cm4ge251bWJlcn0gdGhlIHJlc3VsdFxuICAgICAqL1xuICAgIG1hZzogZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gTWF0aC5zcXJ0KHRoaXMueCAqIHRoaXMueCArIHRoaXMueSAqIHRoaXMueSk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIHNxdWFyZWQgbGVuZ3RoIG9mIHRoaXMgdmVjdG9yLlxuICAgICAqIEBtZXRob2QgbWFnU3FyXG4gICAgICogQHJldHVybiB7bnVtYmVyfSB0aGUgcmVzdWx0XG4gICAgICovXG4gICAgbWFnU3FyOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnggKiB0aGlzLnggKyB0aGlzLnkgKiB0aGlzLnk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIE1ha2UgdGhlIGxlbmd0aCBvZiB0aGlzIHZlY3RvciB0byAxLlxuICAgICAqIEBtZXRob2Qgbm9ybWFsaXplU2VsZlxuICAgICAqIEByZXR1cm4ge1ZlYzJ9IHJldHVybnMgdGhpc1xuICAgICAqIEBjaGFpbmFibGVcbiAgICAgKi9cbiAgICBub3JtYWxpemVTZWxmOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBtYWdTcXIgPSB0aGlzLnggKiB0aGlzLnggKyB0aGlzLnkgKiB0aGlzLnk7XG4gICAgICAgIGlmIChtYWdTcXIgPT09IDEuMClcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuXG4gICAgICAgIGlmIChtYWdTcXIgPT09IDAuMCkge1xuICAgICAgICAgICAgY29uc29sZS53YXJuKFwiQ2FuJ3Qgbm9ybWFsaXplIHplcm8gdmVjdG9yXCIpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgaW52c3FydCA9IDEuMCAvIE1hdGguc3FydChtYWdTcXIpO1xuICAgICAgICB0aGlzLnggKj0gaW52c3FydDtcbiAgICAgICAgdGhpcy55ICo9IGludnNxcnQ7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhpcyB2ZWN0b3Igd2l0aCBhIG1hZ25pdHVkZSBvZiAxLlxuICAgICAqXG4gICAgICogTm90ZSB0aGF0IHRoZSBjdXJyZW50IHZlY3RvciBpcyB1bmNoYW5nZWQgYW5kIGEgbmV3IG5vcm1hbGl6ZWQgdmVjdG9yIGlzIHJldHVybmVkLiBJZiB5b3Ugd2FudCB0byBub3JtYWxpemUgdGhlIGN1cnJlbnQgdmVjdG9yLCB1c2Ugbm9ybWFsaXplU2VsZiBmdW5jdGlvbi5cbiAgICAgKiBAbWV0aG9kIG5vcm1hbGl6ZVxuICAgICAqIEBwYXJhbSB7VmVjMn0gW291dF0gLSBvcHRpb25hbCwgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAgICAgKiBAcmV0dXJuIHtWZWMyfSByZXN1bHRcbiAgICAgKi9cbiAgICBub3JtYWxpemU6IGZ1bmN0aW9uIChvdXQpIHtcbiAgICAgICAgb3V0ID0gb3V0IHx8IG5ldyBWZWMyKCk7XG4gICAgICAgIG91dC54ID0gdGhpcy54O1xuICAgICAgICBvdXQueSA9IHRoaXMueTtcbiAgICAgICAgb3V0Lm5vcm1hbGl6ZVNlbGYoKTtcbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogR2V0IGFuZ2xlIGluIHJhZGlhbiBiZXR3ZWVuIHRoaXMgYW5kIHZlY3RvclxuICAgICAqIEBtZXRob2QgYW5nbGVcbiAgICAgKiBAcGFyYW0ge1ZlYzJ9IHZlY3RvclxuICAgICAqIEByZXR1cm4ge251bWJlcn0gZnJvbSAwIHRvIE1hdGguUElcbiAgICAgKi9cbiAgICBhbmdsZTogZnVuY3Rpb24gKHZlY3Rvcikge1xuICAgICAgICB2YXIgbWFnU3FyMSA9IHRoaXMubWFnU3FyKCk7XG4gICAgICAgIHZhciBtYWdTcXIyID0gdmVjdG9yLm1hZ1NxcigpO1xuXG4gICAgICAgIGlmIChtYWdTcXIxID09PSAwIHx8IG1hZ1NxcjIgPT09IDApIHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihcIkNhbid0IGdldCBhbmdsZSBiZXR3ZWVuIHplcm8gdmVjdG9yXCIpO1xuICAgICAgICAgICAgcmV0dXJuIDAuMDtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBkb3QgPSB0aGlzLmRvdCh2ZWN0b3IpO1xuICAgICAgICB2YXIgdGhldGEgPSBkb3QgLyAoTWF0aC5zcXJ0KG1hZ1NxcjEgKiBtYWdTcXIyKSk7XG4gICAgICAgIHRoZXRhID0gTWF0aC5jbGFtcCh0aGV0YSwgLTEuMCwgMS4wKTtcbiAgICAgICAgcmV0dXJuIE1hdGguYWNvcyh0aGV0YSk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEdldCBhbmdsZSBpbiByYWRpYW4gYmV0d2VlbiB0aGlzIGFuZCB2ZWN0b3Igd2l0aCBkaXJlY3Rpb25cbiAgICAgKiBAbWV0aG9kIHNpZ25BbmdsZVxuICAgICAqIEBwYXJhbSB7VmVjMn0gdmVjdG9yXG4gICAgICogQHJldHVybiB7bnVtYmVyfSBmcm9tIC1NYXRoUEkgdG8gTWF0aC5QSVxuICAgICAqL1xuICAgIHNpZ25BbmdsZTogZnVuY3Rpb24gKHZlY3Rvcikge1xuICAgICAgICAvLyBOT1RFOiB0aGlzIGFsZ29yaXRobSB3aWxsIHJldHVybiAwLjAgd2l0aG91dCBzaWduZWQgaWYgdmVjdG9ycyBhcmUgcGFyYWxsZXhcbiAgICAgICAgLy8gdmFyIGFuZ2xlID0gdGhpcy5hbmdsZSh2ZWN0b3IpO1xuICAgICAgICAvLyB2YXIgY3Jvc3MgPSB0aGlzLmNyb3NzKHZlY3Rvcik7XG4gICAgICAgIC8vIHJldHVybiBNYXRoLnNpZ24oY3Jvc3MpICogYW5nbGU7XG5cbiAgICAgICAgcmV0dXJuIE1hdGguYXRhbjIodGhpcy55LCB0aGlzLngpIC0gTWF0aC5hdGFuMih2ZWN0b3IueSwgdmVjdG9yLngpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiByb3RhdGVcbiAgICAgKiBAbWV0aG9kIHJvdGF0ZVxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSByYWRpYW5zXG4gICAgICogQHBhcmFtIHtWZWMyfSBbb3V0XSAtIG9wdGlvbmFsLCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICAgICAqIEByZXR1cm4ge1ZlYzJ9IHRoZSByZXN1bHRcbiAgICAgKi9cbiAgICByb3RhdGU6IGZ1bmN0aW9uIChyYWRpYW5zLCBvdXQpIHtcbiAgICAgICAgb3V0ID0gb3V0IHx8IG5ldyBWZWMyKCk7XG4gICAgICAgIG91dC54ID0gdGhpcy54O1xuICAgICAgICBvdXQueSA9IHRoaXMueTtcbiAgICAgICAgcmV0dXJuIG91dC5yb3RhdGVTZWxmKHJhZGlhbnMpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiByb3RhdGUgc2VsZlxuICAgICAqIEBtZXRob2Qgcm90YXRlU2VsZlxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSByYWRpYW5zXG4gICAgICogQHJldHVybiB7VmVjMn0gcmV0dXJucyB0aGlzXG4gICAgICogQGNoYWluYWJsZVxuICAgICAqL1xuICAgIHJvdGF0ZVNlbGY6IGZ1bmN0aW9uIChyYWRpYW5zKSB7XG4gICAgICAgIHZhciBzaW4gPSBNYXRoLnNpbihyYWRpYW5zKTtcbiAgICAgICAgdmFyIGNvcyA9IE1hdGguY29zKHJhZGlhbnMpO1xuICAgICAgICB2YXIgeCA9IHRoaXMueDtcbiAgICAgICAgdGhpcy54ID0gY29zICogeCAtIHNpbiAqIHRoaXMueTtcbiAgICAgICAgdGhpcy55ID0gc2luICogeCArIGNvcyAqIHRoaXMueTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLy9fc2VyaWFsaXplOiBmdW5jdGlvbiAoKSB7XG4gICAgLy8gICAgcmV0dXJuIFt0aGlzLngsIHRoaXMueV07XG4gICAgLy99LFxuICAgIC8vX2Rlc2VyaWFsaXplOiBmdW5jdGlvbiAoZGF0YSkge1xuICAgIC8vICAgIHRoaXMueCA9IGRhdGFbMF07XG4gICAgLy8gICAgdGhpcy55ID0gZGF0YVsxXTtcbiAgICAvL31cbn0pO1xuXG4vLyBzdGF0aWNcblxuLyoqXG4gKiByZXR1cm4gYSBWZWMyIG9iamVjdCB3aXRoIHggPSAxIGFuZCB5ID0gMVxuICogQHByb3BlcnR5IG9uZVxuICogQHR5cGUgVmVjMlxuICogQHN0YXRpY1xuICovXG5KUy5nZXQoVmVjMiwgJ29uZScsIGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gbmV3IFZlYzIoMS4wLCAxLjApO1xufSk7XG5cbi8qKlxuICogcmV0dXJuIGEgVmVjMiBvYmplY3Qgd2l0aCB4ID0gMCBhbmQgeSA9IDBcbiAqIEBwcm9wZXJ0eSB6ZXJvXG4gKiBAdHlwZSBWZWMyXG4gKiBAc3RhdGljXG4gKi9cbkpTLmdldChWZWMyLCAnemVybycsIGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gbmV3IFZlYzIoMC4wLCAwLjApO1xufSk7XG5cbi8qKlxuICogcmV0dXJuIGEgVmVjMiBvYmplY3Qgd2l0aCB4ID0gMCBhbmQgeSA9IDFcbiAqIEBwcm9wZXJ0eSB1cFxuICogQHR5cGUgVmVjMlxuICogQHN0YXRpY1xuICovXG5KUy5nZXQoVmVjMiwgJ3VwJywgZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBuZXcgVmVjMigwLjAsIDEuMCk7XG59KTtcblxuLyoqXG4gKiByZXR1cm4gYSBWZWMyIG9iamVjdCB3aXRoIHggPSAxIGFuZCB5ID0gMFxuICogQHByb3BlcnR5IHJpZ2h0XG4gKiBAdHlwZSBWZWMyXG4gKiBAc3RhdGljXG4gKi9cbkpTLmdldChWZWMyLCAncmlnaHQnLCBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIG5ldyBWZWMyKDEuMCwgMC4wKTtcbn0pO1xuXG5GaXJlLlZlYzIgPSBWZWMyO1xuXG4vKipcbiAqIEBtb2R1bGUgRmlyZVxuICovXG4vKipcbiAqIFRoZSBjb252ZW5pZW5jZSBtZXRob2QgdG8gY3JlYXRlIGEgbmV3IHslIGNyb3NzbGluayBWZWMyIFZlYzIgJX1cbiAqIEBtZXRob2QgdjJcbiAqIEBwYXJhbSB7bnVtYmVyfSBbeD0wXVxuICogQHBhcmFtIHtudW1iZXJ9IFt5PTBdXG4gKiBAcmV0dXJuIHtWZWMyfVxuICovXG5GaXJlLnYyID0gZnVuY3Rpb24gdjIgKHgsIHkpIHtcbiAgICBpZiAoQXJyYXkuaXNBcnJheSh4KSkge1xuICAgICAgICByZXR1cm4gbmV3IFZlYzIoeFswXSwgeFsxXSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICByZXR1cm4gbmV3IFZlYzIoeCwgeSk7XG4gICAgfVxufTtcbiIsIi8qKlxuICogQG1vZHVsZSBGaXJlXG4gKi9cblxudmFyIGdldENoaWxkcmVuTiA9IGZ1bmN0aW9uIChub2RlKSB7XG4gICAgdmFyIHdyYXBwZXIgPSBGaXJlKG5vZGUpO1xuICAgIHZhciBjaGlsZHJlbk4gPSB3cmFwcGVyLmNoaWxkcmVuTjtcbiAgICBpZiAod3JhcHBlci5jb25zdHJ1Y3Rvci5jYW5IYXZlQ2hpbGRyZW5JbkVkaXRvcikge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgbmFtZTogd3JhcHBlci5uYW1lLFxuICAgICAgICAgICAgaWQ6IHdyYXBwZXIudXVpZCxcbiAgICAgICAgICAgIGNoaWxkcmVuOiBjaGlsZHJlbk4ubGVuZ3RoID4gMCA/IGNoaWxkcmVuTi5tYXAoZ2V0Q2hpbGRyZW5OKSA6IG51bGxcbiAgICAgICAgfTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBuYW1lOiB3cmFwcGVyLm5hbWUsXG4gICAgICAgICAgICBpZDogd3JhcHBlci51dWlkLFxuICAgICAgICAgICAgY2hpbGRyZW46IFtdLFxuICAgICAgICAgICAgY2FuSGF2ZUNoaWxkcmVuOiBmYWxzZVxuICAgICAgICB9O1xuICAgIH1cbn07XG5cbi8qKlxuICogQG1ldGhvZCBnZXRIaWVyYXJjaHlEdW1wXG4gKiBAcmV0dXJuIHtvYmplY3RbXX1cbiAqL1xuRWRpdG9yLmdldEhpZXJhcmNoeUR1bXAgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHJvb3QgPSBGaXJlLmVuZ2luZS5nZXRDdXJyZW50U2NlbmVOKCk7XG4gICAgdmFyIGNoaWxkcmVuID0gRmlyZShyb290KS5jaGlsZHJlbk47XG4gICAgcmV0dXJuIGNoaWxkcmVuLm1hcChnZXRDaGlsZHJlbk4pO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBFZGl0b3IuZ2V0SGllcmFyY2h5RHVtcDtcbiIsIi8vdmFyIF9pc0RvbU5vZGUgPSByZXF1aXJlKCcuLi9jb3JlL3V0aWxzJykuaXNEb21Ob2RlO1xudmFyIEpTID0gRmlyZS5KUztcblxuLyoqXG4gKiBAbW9kdWxlIEVkaXRvclxuICovXG5cbmZ1bmN0aW9uIGdldFR5cGVJZCAob2JqKSB7XG4gICAgaWYgKHR5cGVvZiBvYmogPT09ICdvYmplY3QnKSB7XG4gICAgICAgIG9iaiA9IG9iai5jb25zdHJ1Y3RvcjtcbiAgICB9XG4gICAgcmV0dXJuIEpTLmdldENsYXNzTmFtZShvYmopO1xufVxuXG5mdW5jdGlvbiBkdW1wQXR0cnMgKHR5cGVzLCBkYXRhLCBhdHRycykge1xuICAgIHZhciBjdG9yID0gYXR0cnMuY3RvcjtcbiAgICBpZiAoY3Rvcikge1xuICAgICAgICB2YXIgdHlwZSA9IGdldFR5cGVJZChjdG9yKTtcbiAgICAgICAgZGF0YS50eXBlID0gdHlwZTtcbiAgICAgICAgaWYgKCF0eXBlc1t0eXBlXSkge1xuICAgICAgICAgICAgdmFyIGlzQXNzZXRUeXBlID0gRmlyZS5pc0NoaWxkQ2xhc3NPZihjdG9yLCBGaXJlLkFzc2V0KTtcbiAgICAgICAgICAgIHZhciBpc05vZGVUeXBlID0gRmlyZS5pc0NoaWxkQ2xhc3NPZihjdG9yLCBGaXJlLlJ1bnRpbWUuTm9kZVdyYXBwZXIpO1xuICAgICAgICAgICAgaWYgKGlzQXNzZXRUeXBlIHx8IGlzTm9kZVR5cGUpIHtcbiAgICAgICAgICAgICAgICBkdW1wSW5oZXJpdGFuY2VDaGFpbih0eXBlcywgY3RvciwgdHlwZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBkdW1wVHlwZSh0eXBlcywgY3RvciwgdHlwZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZiAoYXR0cnMudHlwZSkge1xuICAgICAgICBkYXRhLnR5cGUgPSBhdHRycy50eXBlO1xuICAgIH1cblxuICAgIGlmIChhdHRycy5yZWFkb25seSkge1xuICAgICAgICBkYXRhLnJlYWRvbmx5ID0gYXR0cnMucmVhZG9ubHk7XG4gICAgfVxuXG4gICAgaWYgKGF0dHJzLmhhc093blByb3BlcnR5KCdkZWZhdWx0JykpIHtcbiAgICAgICAgZGF0YS5kZWZhdWx0ID0gYXR0cnMuZGVmYXVsdDtcbiAgICB9XG4gICAgZWxzZSBpZiAoYXR0cnMuaGFzU2V0dGVyID09PSBmYWxzZSkge1xuICAgICAgICBkYXRhLnJlYWRvbmx5ID0gZmFsc2U7XG4gICAgfVxuXG4gICAgaWYgKGF0dHJzLmhhc093blByb3BlcnR5KCd2aXNpYmxlJykpIHtcbiAgICAgICAgZGF0YS52aXNpYmxlID0gYXR0cnMudmlzaWJsZTtcbiAgICB9XG4gICAgaWYgKGF0dHJzLmVudW1MaXN0KSB7XG4gICAgICAgIGRhdGEuZW51bUxpc3QgPSBhdHRycy5lbnVtTGlzdDtcbiAgICB9XG4gICAgaWYgKGF0dHJzLmhhc093blByb3BlcnR5KCdkaXNwbGF5TmFtZScpKSB7XG4gICAgICAgIGRhdGEuZGlzcGxheU5hbWUgPSBhdHRycy5kaXNwbGF5TmFtZTtcbiAgICB9XG4gICAgaWYgKGF0dHJzLmhhc093blByb3BlcnR5KCdtdWx0aWxpbmUnKSkge1xuICAgICAgICBkYXRhLm11bHRpbGluZSA9IGF0dHJzLm11bHRpbGluZTtcbiAgICB9XG4gICAgaWYgKGF0dHJzLmhhc093blByb3BlcnR5KCdtaW4nKSkge1xuICAgICAgICBkYXRhLm1pbiA9IGF0dHJzLm1pbjtcbiAgICB9XG4gICAgaWYgKGF0dHJzLmhhc093blByb3BlcnR5KCdtYXgnKSkge1xuICAgICAgICBkYXRhLm1heCA9IGF0dHJzLm1heDtcbiAgICB9XG4gICAgaWYgKGF0dHJzLm51bGxhYmxlKSB7XG4gICAgICAgIC8vIHtTdHJpbmd9IC0gdGhlIHByb3BlcnR5IG5hbWUgb2YgYm9vbGVhbiB2YWx1ZVxuICAgICAgICBkYXRhLm51bGxhYmxlID0gYXR0cnMubnVsbGFibGU7XG4gICAgfVxuICAgIGlmIChhdHRycy50b29sdGlwKSB7XG4gICAgICAgIGRhdGEudG9vbHRpcCA9IGF0dHJzLnRvb2x0aXA7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBnZXRJbmhlcml0YW5jZUNoYWluIChrbGFzcykge1xuICAgIHZhciBjaGFpbiA9IFtdO1xuICAgIHZhciB0eXBlSWQ7XG5cbiAgICAvLyBmaXJlY2xhc3NcbiAgICB2YXIgc3VwZXJDbHMgPSBrbGFzcztcbiAgICBmb3IgKDs7KSB7XG4gICAgICAgIGlmIChzdXBlckNscyAhPT0ga2xhc3MpIHtcbiAgICAgICAgICAgIHR5cGVJZCA9IGdldFR5cGVJZChzdXBlckNscyk7XG4gICAgICAgICAgICBpZiAodHlwZUlkKSB7XG4gICAgICAgICAgICAgICAgY2hhaW4ucHVzaCh0eXBlSWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChzdXBlckNscy4kc3VwZXIpIHtcbiAgICAgICAgICAgIHN1cGVyQ2xzID0gc3VwZXJDbHMuJHN1cGVyO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLy8ganMgY2xhc3NcbiAgICB2YXIgZHVuZGVyUHJvdG8gPSBPYmplY3QuZ2V0UHJvdG90eXBlT2Yoc3VwZXJDbHMucHJvdG90eXBlKTtcbiAgICB3aGlsZSAoZHVuZGVyUHJvdG8pIHtcbiAgICAgICAgc3VwZXJDbHMgPSBkdW5kZXJQcm90by5jb25zdHJ1Y3RvcjtcbiAgICAgICAgaWYgKHN1cGVyQ2xzICYmIHN1cGVyQ2xzICE9PSBrbGFzcykge1xuICAgICAgICAgICAgdHlwZUlkID0gZ2V0VHlwZUlkKHN1cGVyQ2xzKTtcbiAgICAgICAgICAgIGlmICh0eXBlSWQpIHtcbiAgICAgICAgICAgICAgICBjaGFpbi5wdXNoKHR5cGVJZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZHVuZGVyUHJvdG8gPSBPYmplY3QuZ2V0UHJvdG90eXBlT2Yoc3VwZXJDbHMucHJvdG90eXBlKTtcbiAgICB9XG4gICAgcmV0dXJuIGNoYWluO1xufVxuXG4vLyBhc3NlcnQob2JqKVxuZnVuY3Rpb24gZHVtcFR5cGUgKHR5cGVzLCBvYmpPckNsYXNzLCB0eXBlSWQpIHtcbiAgICB2YXIga2xhc3M7XG4gICAgaWYgKHR5cGVvZiBvYmpPckNsYXNzID09PSAnb2JqZWN0Jykge1xuICAgICAgICB2YXIgaXNFbnVtID0gRmlyZS5pc0VudW1UeXBlKG9iak9yQ2xhc3MpO1xuICAgICAgICBpZiAoaXNFbnVtKSB7XG4gICAgICAgICAgICAvLyBkdW1wIEVudW1cbiAgICAgICAgICAgIHZhciBlbnVtTGlzdCA9IEZpcmUuZ2V0RW51bUxpc3Qob2JqT3JDbGFzcyk7XG4gICAgICAgICAgICByZXR1cm4gZW51bUxpc3Q7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBrbGFzcyA9IG9iak9yQ2xhc3MuY29uc3RydWN0b3I7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGtsYXNzID0gb2JqT3JDbGFzcztcbiAgICB9XG5cbiAgICB2YXIgdHlwZSA9IHt9O1xuICAgIHR5cGVzW3R5cGVJZF0gPSB0eXBlO1xuXG4gICAgLy8gZHVtcCBGaXJlQ2xhc3NcbiAgICBpZiAoa2xhc3MpIHtcbiAgICAgICAgLy8gVE9ETyAtIGNhY2hlIGluIGtsYXNzXG4gICAgICAgIHZhciBjaGFpbiA9IGdldEluaGVyaXRhbmNlQ2hhaW4oa2xhc3MpO1xuICAgICAgICBpZiAoY2hhaW4ubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgdHlwZS5leHRlbmRzID0gY2hhaW47XG4gICAgICAgIH1cbiAgICAgICAgLy8gZHVtcCBwcm9wc1xuICAgICAgICB2YXIgcHJvcE5hbWVzID0ga2xhc3MuX19wcm9wc19fO1xuICAgICAgICBpZiAocHJvcE5hbWVzKSB7XG4gICAgICAgICAgICB2YXIgcHJvcGVydGllcyA9IHt9O1xuICAgICAgICAgICAgZm9yICh2YXIgcCA9IDA7IHAgPCBwcm9wTmFtZXMubGVuZ3RoOyBwKyspIHtcbiAgICAgICAgICAgICAgICB2YXIgcHJvcE5hbWUgPSBwcm9wTmFtZXNbcF07XG4gICAgICAgICAgICAgICAgdmFyIGR1bXBQcm9wID0ge307XG4gICAgICAgICAgICAgICAgLy8gZHVtcCBpbnNwZWN0b3IgYXR0cnNcbiAgICAgICAgICAgICAgICB2YXIgYXR0cnMgPSBGaXJlLmF0dHIoa2xhc3MsIHByb3BOYW1lKTtcbiAgICAgICAgICAgICAgICBpZiAoYXR0cnMpIHtcbiAgICAgICAgICAgICAgICAgICAgZHVtcEF0dHJzKHR5cGVzLCBkdW1wUHJvcCwgYXR0cnMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBwcm9wZXJ0aWVzW3Byb3BOYW1lXSA9IGR1bXBQcm9wO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdHlwZS5wcm9wZXJ0aWVzID0gcHJvcGVydGllcztcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZnVuY3Rpb24gZHVtcEluaGVyaXRhbmNlQ2hhaW4gKHR5cGVzLCBrbGFzcywgdHlwZUlkKSB7XG4gICAgdmFyIHR5cGUgPSB7fTtcbiAgICB2YXIgY2hhaW4gPSBnZXRJbmhlcml0YW5jZUNoYWluKGtsYXNzKTtcbiAgICBpZiAoY2hhaW4ubGVuZ3RoID4gMCkge1xuICAgICAgICB0eXBlLmV4dGVuZHMgPSBjaGFpbjtcbiAgICB9XG4gICAgdHlwZXNbdHlwZUlkXSA9IHR5cGU7XG59XG5cbmZ1bmN0aW9uIGdldEV4cGVjdGVkVHlwZUluQ2xhc3NEZWYgKHR5cGVzLCBrbGFzcywgcHJvcE5hbWUpIHtcbiAgICB2YXIgdHlwZUlkID0gZ2V0VHlwZUlkKGtsYXNzKTtcbiAgICBpZiAodHlwZUlkKSB7XG4gICAgICAgIHZhciB0eXBlSW5mbyA9IHR5cGVzW3R5cGVJZF07XG4gICAgICAgIGlmICh0eXBlSW5mbykge1xuICAgICAgICAgICAgcmV0dXJuIHR5cGVJbmZvLnByb3BlcnRpZXNbcHJvcE5hbWVdLnR5cGU7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmZ1bmN0aW9uIGR1bXBPYmplY3QgKHR5cGVzLCBvYmosIGV4cGVjdGVkVHlwZSkge1xuICAgIGlmICghb2JqKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICB2YXIgYXR0clR5cGUsIGFjdHVhbFR5cGU7XG4gICAgdmFyIGN0b3IgPSBvYmouY29uc3RydWN0b3I7XG4gICAgaWYgKG9iaiBpbnN0YW5jZW9mIEZPYmplY3QpIHtcbiAgICAgICAgLy8gRk9iamVjdFxuICAgICAgICBpZiAoICFvYmouaXNWYWxpZCApIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHZhciB1dWlkID0gb2JqLl91dWlkO1xuICAgICAgICBpZiAodXVpZCkge1xuICAgICAgICAgICAgLy8gQXNzZXRcbiAgICAgICAgICAgIGFjdHVhbFR5cGUgPSBnZXRUeXBlSWQob2JqKTtcbiAgICAgICAgICAgIGlmIChleHBlY3RlZFR5cGUgIT09IGFjdHVhbFR5cGUpIHtcbiAgICAgICAgICAgICAgICBpZiAoIXR5cGVzW2FjdHVhbFR5cGVdKSB7XG4gICAgICAgICAgICAgICAgICAgIGR1bXBJbmhlcml0YW5jZUNoYWluKHR5cGVzLCBjdG9yLCBhY3R1YWxUeXBlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgX190eXBlX186IGFjdHVhbFR5cGUsXG4gICAgICAgICAgICAgICAgICAgIHV1aWQ6IHV1aWRcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgdXVpZDogdXVpZFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAob2JqIGluc3RhbmNlb2YgRmlyZS5SdW50aW1lLk5vZGVXcmFwcGVyKSB7XG4gICAgICAgICAgICBhY3R1YWxUeXBlID0gZ2V0VHlwZUlkKG9iaik7XG4gICAgICAgICAgICBpZiAoZXhwZWN0ZWRUeXBlICE9PSBhY3R1YWxUeXBlKSB7XG4gICAgICAgICAgICAgICAgaWYgKCF0eXBlc1thY3R1YWxUeXBlXSkge1xuICAgICAgICAgICAgICAgICAgICBkdW1wSW5oZXJpdGFuY2VDaGFpbih0eXBlcywgY3RvciwgYWN0dWFsVHlwZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIF9fdHlwZV9fOiBhY3R1YWxUeXBlLFxuICAgICAgICAgICAgICAgICAgICB1dWlkOiBvYmoudXVpZFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICB1dWlkOiBvYmoudXVpZFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZiAob2JqIGluc3RhbmNlb2YgRmlyZS5WYWx1ZVR5cGUpIHtcbiAgICAgICAgdmFyIHJlcyA9IEVkaXRvci5zZXJpYWxpemUob2JqLCB7c3RyaW5naWZ5OiBmYWxzZX0pO1xuICAgICAgICBpZiAoIXR5cGVzW3Jlcy5fX3R5cGVfX10pIHtcbiAgICAgICAgICAgIGR1bXBJbmhlcml0YW5jZUNoYWluKHR5cGVzLCBjdG9yLCByZXMuX190eXBlX18pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXM7XG4gICAgfVxuXG4gICAgaWYgKEZpcmUuX2lzRmlyZUNsYXNzKGN0b3IpKSB7XG4gICAgICAgIHZhciBkYXRhID0ge307XG4gICAgICAgIGFjdHVhbFR5cGUgPSBnZXRUeXBlSWQob2JqKTtcbiAgICAgICAgaWYgKGV4cGVjdGVkVHlwZSAhPT0gYWN0dWFsVHlwZSkge1xuICAgICAgICAgICAgaWYgKCF0eXBlc1thY3R1YWxUeXBlXSkge1xuICAgICAgICAgICAgICAgIGR1bXBUeXBlKHR5cGVzLCBjdG9yLCBhY3R1YWxUeXBlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGRhdGEuX190eXBlX18gPSBhY3R1YWxUeXBlO1xuICAgICAgICB9XG4gICAgICAgIC8vIFRPRE8gLSDlpoLmnpzltYzlpZfmgI7kuYjlip7vvJ/ogIPomZHlnKjkuIvpnaLov5nmrKEgZHVtcEJ5Q2xhc3Mg5pe277yM5Y+q5pSv5oyB5YC857G75Z6L44CCXG4gICAgICAgIGR1bXBCeUNsYXNzKHR5cGVzLCBkYXRhLCBvYmosIGN0b3IpO1xuICAgICAgICByZXR1cm4gZGF0YTtcbiAgICB9XG4gICAgLy8gVE9ETyAtIOaUr+aMgeaVsOe7hOWSjOihqFxuXG4gICAgcmV0dXJuIG51bGw7XG59XG5cbmZ1bmN0aW9uIGR1bXBGaWVsZCAodHlwZXMsIHZhbCwga2xhc3MsIHByb3BOYW1lKSB7XG4gICAgaWYgKHZhbCA9PSBudWxsIHx8IHR5cGVvZiB2YWwgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHZhciBhdHRyID0gRmlyZS5hdHRyKGtsYXNzLCBwcm9wTmFtZSk7XG4gICAgICAgIHZhciB0eXBlID0gYXR0ciAmJiAvKmF0dHIudHlwZSA9PT0gJ09iamVjdCcgJiYqLyBhdHRyLmN0b3I7XG4gICAgICAgIGlmICh0eXBlICYmIHR5cGVvZiB0eXBlID09PSAnZnVuY3Rpb24nICYmIEZpcmUuaXNDaGlsZENsYXNzT2YodHlwZSwgRmlyZS5Bc3NldCkpIHtcbiAgICAgICAgICAgIGlmIChhdHRyLnNhdmVVcmxBc0Fzc2V0KSB7XG4gICAgICAgICAgICAgICAgLy8gaXMgdXJsIGFkYXB0ZXJcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICB1dWlkOiAodmFsICYmIEZpcmUuQXNzZXQudXJsVG9VdWlkKHZhbCkpIHx8ICcnXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vZWxzZSB7XG4gICAgICAgICAgICAvLyAgICByZXR1cm4ge1xuICAgICAgICAgICAgLy8gICAgICAgIHV1aWQ6IHZhbFxuICAgICAgICAgICAgLy8gICAgfVxuICAgICAgICAgICAgLy99XG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYgKHR5cGVvZiB2YWwgPT09ICdvYmplY3QnKSB7XG4gICAgICAgIHZhciBleHBlY3RlZFR5cGUgPSBnZXRFeHBlY3RlZFR5cGVJbkNsYXNzRGVmKHR5cGVzLCBrbGFzcywgcHJvcE5hbWUpO1xuICAgICAgICByZXR1cm4gZHVtcE9iamVjdCh0eXBlcywgdmFsLCBleHBlY3RlZFR5cGUpO1xuICAgIH1cbiAgICBlbHNlIGlmICh0eXBlb2YgdmFsICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHJldHVybiB2YWw7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICAvLyBmdW5jdGlvblxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGR1bXBCeUNsYXNzICh0eXBlcywgZGF0YSwgb2JqLCBrbGFzcykge1xuICAgIHZhciBwcm9wcyA9IGtsYXNzLl9fcHJvcHNfXztcbiAgICBpZiAocHJvcHMpIHtcbiAgICAgICAgZm9yICh2YXIgcCA9IDA7IHAgPCBwcm9wcy5sZW5ndGg7IHArKykge1xuICAgICAgICAgICAgdmFyIHByb3BOYW1lID0gcHJvcHNbcF07XG4gICAgICAgICAgICBkYXRhW3Byb3BOYW1lXSA9IGR1bXBGaWVsZCh0eXBlcywgb2JqW3Byb3BOYW1lXSwga2xhc3MsIHByb3BOYW1lKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuLy8gYXNzZXJ0KG9iaiAmJiB0eXBlb2Ygb2JqID09PSAnb2JqZWN0JylcbmZ1bmN0aW9uIGR1bXBNYWluICh0eXBlcywgd3JhcHBlcikge1xuICAgIHZhciBkYXRhID0ge307XG5cbiAgICAvLyBkdW1wIG1haW4gdHlwZVxuICAgIHZhciB0eXBlSWQgPSBnZXRUeXBlSWQod3JhcHBlcik7XG4gICAgaWYgKHR5cGVJZCkge1xuICAgICAgICBkYXRhLl9fdHlwZV9fID0gdHlwZUlkO1xuICAgICAgICBkdW1wVHlwZSh0eXBlcywgd3JhcHBlciwgdHlwZUlkKTtcbiAgICB9XG5cbiAgICAvLyBkdW1wIHdyYXBwZXIgdmFsdWVzXG4gICAgZHVtcEJ5Q2xhc3ModHlwZXMsIGRhdGEsIHdyYXBwZXIsIHdyYXBwZXIuY29uc3RydWN0b3IpO1xuXG4gICAgLy8gaXRlcmF0ZSBtaXhpbnNcbiAgICB2YXIgbWl4aW5DbGFzc2VzID0gd3JhcHBlci50YXJnZXROLl9taXhpbkNsYXNzZXM7XG4gICAgaWYgKG1peGluQ2xhc3Nlcykge1xuICAgICAgICBkYXRhLl9fbWl4aW5zX18gPSBbXTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBtaXhpbkNsYXNzZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHZhciBrbGFzcyA9IG1peGluQ2xhc3Nlc1tpXTtcbiAgICAgICAgICAgIHR5cGVJZCA9IGdldFR5cGVJZChrbGFzcyk7XG4gICAgICAgICAgICBpZiAodHlwZUlkKSB7XG4gICAgICAgICAgICAgICAgZHVtcFR5cGUodHlwZXMsIGtsYXNzLCB0eXBlSWQpO1xuICAgICAgICAgICAgICAgIHZhciBtaXhpbkRhdGEgPSB7XG4gICAgICAgICAgICAgICAgICAgIF9fdHlwZV9fOiB0eXBlSWRcbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgLy8gZHVtcCBtaXhpbiB2YWx1ZXNcbiAgICAgICAgICAgICAgICBkdW1wQnlDbGFzcyh0eXBlcywgbWl4aW5EYXRhLCB3cmFwcGVyLnRhcmdldE4sIGtsYXNzKTtcblxuICAgICAgICAgICAgICAgIGRhdGEuX19taXhpbnNfXy5wdXNoKG1peGluRGF0YSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gZGF0YTtcbn1cblxuLyoqXG4gKiBUYWtlIGEgc25hcHNob3Qgb24gbm9kZSBmb3IgaW5zcGVjdG9yLlxuICogQG1ldGhvZCBnZXROb2RlRHVtcFxuICogQHBhcmFtIHtSdW50aW1lTm9kZX1cbiAqIEByZXR1cm4ge29iamVjdH0gLSByZXR1cm5zIGEganNvbiBvYmplY3Qgc3VjaCBsaWtlOlxuICogYGBgXG4gKiAge1xuICogICAgICB0eXBlczoge1xuICogICAgICAgICAgdHlwZTE6IHtcbiAqICAgICAgICAgICAgICBleHRlbmRzOiBbXCJ0eXBlX2Jhc2VcIiwgXCJvYmplY3RcIl1cbiAqICAgICAgICAgICAgICBwcm9wZXJ0aWVzOiB7XG4gKiAgICAgICAgICAgICAgICAgIGtleTE6IHtcbiAqICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6IDAsXG4gKiAgICAgICAgICAgICAgICAgICAgICB0eXBlOiAnSW50ZWdlcicgLy8gW1wiSW50ZWdlclwifFwiRmxvYXRcInxcIlN0cmluZ1wifFwiQm9vbGVhblwifFwiT2JqZWN0XCJ8XCJFbnVtXCJ8XCJTY3JpcHRcIl1cbiAqICAgICAgICAgICAgICAgICAgfVxuICogICAgICAgICAgICAgIH1cbiAqICAgICAgICAgIH0sXG4gKiAgICAgICAgICBtaXhpbjE6IHtcbiAqICAgICAgICAgICAgICBwcm9wZXJ0aWVzOiB7XG4gKiAgICAgICAgICAgICAgICAgIGtleTI6IHtcbiAqICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6IDAsXG4gKiAgICAgICAgICAgICAgICAgICAgICB0eXBlOiAnSW50ZWdlcidcbiAqICAgICAgICAgICAgICAgICAgfSxcbiAqICAgICAgICAgICAgICAgICAgYXNzZXQ6IHtcbiAqICAgICAgICAgICAgICAgICAgICAgIF9fdHlwZV9fOiAnRmlyZS5UZXh0dXJlJyxcbiAqICAgICAgICAgICAgICAgICAgICAgIHV1aWQ6ICd1dWlkJ1xuICogICAgICAgICAgICAgICAgICB9LFxuICogICAgICAgICAgICAgICAgICBub2RlOiB7XG4gKiAgICAgICAgICAgICAgICAgICAgICBfX3R5cGVfXzogJ1J1bnRpbWUuTm9kZVdyYXBwZXInLFxuICogICAgICAgICAgICAgICAgICAgICAgaWQ6ICdpZCdcbiAqICAgICAgICAgICAgICAgICAgfVxuICogICAgICAgICAgICAgIH1cbiAqICAgICAgICAgIH1cbiAqICAgICAgfSxcbiAqICAgICAgdmFsdWU6IHtcbiAqICAgICAgICAgIF9fdHlwZV9fOiAndHlwZTEnLFxuICogICAgICAgICAga2V5MTogdmFsdWUxLFxuICpcbiAqICAgICAgICAgIF9fbWl4aW5zX186IFt7XG4gKiAgICAgICAgICAgICAgX190eXBlX186ICdtaXhpbjEnLFxuICogICAgICAgICAgICAgIGtleTI6IHZhbHVlMixcbiAqICAgICAgICAgIH1dLFxuICogICAgICB9XG4gKiAgfVxuICogYGBgXG4gKi9cbkVkaXRvci5nZXROb2RlRHVtcCA9IGZ1bmN0aW9uIChub2RlKSB7XG4gICAgdmFyIHR5cGVzID0ge307XG5cbiAgICBpZiAoIW5vZGUpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHR5cGVzOiB0eXBlcyxcbiAgICAgICAgICAgIHZhbHVlOiBudWxsXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgdmFyIHdyYXBwZXIgPSBGaXJlKG5vZGUpO1xuICAgIHZhciB2YWx1ZSA9IGR1bXBNYWluKHR5cGVzLCB3cmFwcGVyKTtcblxuICAgIHJldHVybiB7XG4gICAgICAgIHR5cGVzOiB0eXBlcyxcbiAgICAgICAgdmFsdWU6IHZhbHVlXG4gICAgfTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gRWRpdG9yLmdldE5vZGVEdW1wO1xuXG4vLyBmb3IgdW5pdCB0ZXN0c1xuRWRpdG9yLmdldE5vZGVEdW1wLmdldEluaGVyaXRhbmNlQ2hhaW4gPSBnZXRJbmhlcml0YW5jZUNoYWluO1xuIiwidmFyIHJvb3QgPSB0eXBlb2YgZ2xvYmFsICE9PSAndW5kZWZpbmVkJyA/IGdsb2JhbCA6IHdpbmRvdztcblxuLyoqXG4gKiBHbG9iYWwgb2JqZWN0IHdpdGggY2xhc3NlcywgcHJvcGVydGllcyBhbmQgbWV0aG9kcyB5b3UgY2FuIGFjY2VzcyBpbiBmaXJlYmFsbCBlZGl0b3IuXG4gKlxuICogQG1vZHVsZSBFZGl0b3JcbiAqIEBtYWluIEVkaXRvclxuICovXG5cbmlmICghcm9vdC5FZGl0b3IpIHtcbiAgICAvLyBBbHdheXMgZXhwb3J0IEVkaXRvciBnbG9iYWxseS5cbiAgICByb290LkVkaXRvciA9IHt9O1xufVxuXG4vLy8vIGV4dGVuZHMgZW5naW5lXG4vL3JlcXVpcmUoJy4vZXh0ZW5kcy9ydW50aW1lJyk7XG5cbnJlcXVpcmUoJy4vc2VyaWFsaXplJyk7XG5yZXF1aXJlKCcuL2dldC1ub2RlLWR1bXAnKTtcbnJlcXVpcmUoJy4vZ2V0LWhpZXJhcmNoeS1kdW1wJyk7XG5yZXF1aXJlKCcuL3NldC1wcm9wZXJ0eS1ieS1wYXRoJyk7XG5yZXF1aXJlKCcuL3V0aWxzJyk7XG5cbmlmICghRklSRV9URVNUKSB7XG4gICAgLy8gcmVkaXJlY3QgbG9nIG1ldGhvZHMgdG8gZmlyZWJhbGwgY29uc29sZVxuICAgIEZpcmUubG9nID0gRWRpdG9yLmxvZztcbiAgICBGaXJlLmluZm8gPSBFZGl0b3IuaW5mbztcbiAgICBGaXJlLndhcm4gPSBFZGl0b3Iud2FybjtcbiAgICBGaXJlLmVycm9yID0gRWRpdG9yLmVycm9yO1xufVxuXG5pZiAoRWRpdG9yLmlzQ29yZUxldmVsKSB7XG4gICAgLy8gZGVjbGFyZSBnbG9iYWwgdmFyaWFibGVzIHRoYXQgY2FuIGJlIGFjY2Vzc2VkIHJlbW90ZWx5IGluIHBhZ2UtbGV2ZWxcbiAgICBFZGl0b3Iubm9kZUNyZWF0ZU1lbnUgPSBudWxsO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEVkaXRvcjtcbiIsInZhciBSZWZJbmZvcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAvLyBpZOaJgOWcqOeahOWvueixoeWIl+ihqFxuICAgIHRoaXMub2JqTGlzdCA9IFtdO1xuICAgIC8vIOWFs+mUruWtl+WIl+ihqFxuICAgIHRoaXMua2V5TGlzdCA9IFtdO1xuICAgIC8vIOW8leeUqOeahGlk5YiX6KGoXG4gICAgdGhpcy5yZWZlcm5jZWRJRExpc3QgPSBbXTtcbiAgICAvLyDlvJXnlKhpZOeahOasoeaVsFxuICAgIHRoaXMucmVmZXJlbmNlZENvdW50cyA9IFtdO1xuICAgIC8vIOS/neWtmOacieagh+iusF9pTiR05YiX6KGoXG4gICAgdGhpcy50ZW1wb3JhcnlEYXRhTGlzdCA9IFtdO1xufTtcblxudmFyIG5pY2lmeVNlcmlhbGl6ZWQgPSBmdW5jdGlvbiAoc2VyaWFsaXplZCkge1xuXG4gICAgdmFyIG1haW5PYmplY3QgPSBzZXJpYWxpemVkWzBdO1xuXG4gICAgaWYgKHR5cGVvZiBtYWluT2JqZWN0ID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdmFyIHJlZkluZm9zID0gbmV3IFJlZkluZm9zKCk7XG4gICAgcmVmSW5mb3MucmVmZXJlbmNlZENvdW50cyA9IG5ldyBBcnJheShzZXJpYWxpemVkLmxlbmd0aCk7XG5cbiAgICB2YXIgaWQ7XG4gICAgdmFyIG9iajtcbiAgICB2YXIga2V5O1xuICAgIHZhciB2YWx1ZTtcbiAgICB2YXIgaGFzUmVwZWF0SUQ7XG4gICAgdmFyIHRlbXBTZWxmID0gc2VyaWFsaXplZC5zbGljZSgpO1xuXG4gICAgLy8g6YGN5Y6G77yM5bm25LiU5L+d5a2Y6ZyA6KaB576O5YyW55qE5pWw5o2uXG4gICAgX2l0ZXJhdGl2ZShtYWluT2JqZWN0LCBzZXJpYWxpemVkLCByZWZJbmZvcyk7XG4gICAgXG4gICAgdmFyIGlkeCA9IDA7XG5cbiAgICAvLyBkZWwgX2lOJHRcbiAgICBmb3IgKGlkeCA9IDA7IGlkeCA8IHJlZkluZm9zLnRlbXBvcmFyeURhdGFMaXN0Lmxlbmd0aDsgaWR4KyspIHtcbiAgICAgICAgZGVsZXRlIHJlZkluZm9zLnRlbXBvcmFyeURhdGFMaXN0W2lkeF0uX2lOJHQ7XG4gICAgfVxuXG4gICAgLy8gZGVyZWZlcmVuY2VcbiAgICBmb3IgKGlkeCA9IDA7IGlkeCA8IHJlZkluZm9zLm9iakxpc3QubGVuZ3RoOyBpZHgrKykge1xuICAgICAgICBvYmogPSByZWZJbmZvcy5vYmpMaXN0W2lkeF07XG4gICAgICAgIGlkID0gcmVmSW5mb3MucmVmZXJuY2VkSURMaXN0W2lkeF07XG4gICAgICAgIGtleSA9IHJlZkluZm9zLmtleUxpc3RbaWR4XTtcbiAgICAgICAgdmFsdWUgPSB0ZW1wU2VsZltpZF07XG4gICAgICAgIGhhc1JlcGVhdElEID0gcmVmSW5mb3MucmVmZXJlbmNlZENvdW50c1tpZF0gPiAxO1xuICAgICAgICBpZiAoaGFzUmVwZWF0SUQpIHtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIG9ialtrZXldID0gdmFsdWU7XG4gICAgICAgIHZhciBkZWxJZHggPSBzZXJpYWxpemVkLmluZGV4T2YodmFsdWUpO1xuICAgICAgICBzZXJpYWxpemVkLnNwbGljZShkZWxJZHgsIDEpO1xuICAgIH1cblxuICAgIC8vIHVwZGF0ZSBpZFxuICAgIGZvciAoaWR4ID0gMDsgaWR4IDwgcmVmSW5mb3Mub2JqTGlzdC5sZW5ndGg7IGlkeCsrKSB7XG4gICAgICAgIGlkID0gcmVmSW5mb3MucmVmZXJuY2VkSURMaXN0W2lkeF07XG4gICAgICAgIGtleSA9IHJlZkluZm9zLmtleUxpc3RbaWR4XTtcbiAgICAgICAgb2JqID0gcmVmSW5mb3Mub2JqTGlzdFtpZHhdO1xuICAgICAgICBoYXNSZXBlYXRJRCA9IHJlZkluZm9zLnJlZmVyZW5jZWRDb3VudHNbaWRdID4gMTtcbiAgICAgICAgaWYgKGhhc1JlcGVhdElEKSB7XG4gICAgICAgICAgICB2YWx1ZSA9IHRlbXBTZWxmW2lkXTtcbiAgICAgICAgICAgIHZhciBuZXdJZHggPSBzZXJpYWxpemVkLmluZGV4T2YodmFsdWUpO1xuICAgICAgICAgICAgb2JqW2tleV0uX19pZF9fID0gbmV3SWR4O1xuICAgICAgICB9XG4gICAgfVxufTtcblxudmFyIF9pdGVyYXRpdmUgPSBmdW5jdGlvbiAob2JqLCBzZXJpYWxpemVkLCByZWZJbmZvcykge1xuICAgIGlmICh0eXBlb2Ygb2JqICE9PSAnb2JqZWN0Jykge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIG9iai5faU4kdCA9IHRydWU7XG4gICAgcmVmSW5mb3MudGVtcG9yYXJ5RGF0YUxpc3QucHVzaChvYmopO1xuICAgIGlmIChvYmouY29udGVudCkge1xuICAgICAgICB2YXIgdHlwZSA9IG9iai5fX3R5cGVfXyAmJiBGaXJlLkpTLl9nZXRDbGFzc0J5SWQob2JqLl9fdHlwZV9fKTtcbiAgICAgICAgaWYgKHR5cGUgJiYgdHlwZS5wcm90b3R5cGUuX3NlcmlhbGl6ZSkge1xuICAgICAgICAgICAgLy8gc2tpcCBjdXN0b21pemVkIGRhdGFcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHZhciBlbGVtZW50O1xuICAgIGlmIChBcnJheS5pc0FycmF5KG9iaikpIHtcbiAgICAgICAgZm9yICh2YXIga2V5ID0gMDsga2V5IDwgb2JqLmxlbmd0aDsga2V5KyspIHtcbiAgICAgICAgICAgIGVsZW1lbnQgPSBvYmpba2V5XTtcbiAgICAgICAgICAgIGlmIChlbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgX3RyYXZlcnNhbENoaWxkKGVsZW1lbnQsIGtleSwgb2JqLCBzZXJpYWxpemVkLCByZWZJbmZvcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGZvciAodmFyIGkgaW4gb2JqKSB7XG4gICAgICAgICAgICBlbGVtZW50ID0gb2JqW2ldO1xuICAgICAgICAgICAgaWYgKGVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICBfdHJhdmVyc2FsQ2hpbGQoZWxlbWVudCwgaSwgb2JqLCBzZXJpYWxpemVkLCByZWZJbmZvcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59O1xuXG52YXIgX3RyYXZlcnNhbENoaWxkID0gZnVuY3Rpb24gKGVsZW1lbnQsIGtleSwgb2JqLCBzZXJpYWxpemVkLCByZWZJbmZvcykge1xuICAgIHZhciBoYXNSZXBlYXRJRDtcbiAgICB2YXIgaWQgPSBlbGVtZW50Ll9faWRfXztcbiAgICB2YXIgaGFzSUQgPSB0eXBlb2YgaWQgIT09ICd1bmRlZmluZWQnO1xuICAgIGlmIChoYXNJRCkge1xuICAgICAgICBlbGVtZW50ID0gc2VyaWFsaXplZFtpZF07XG4gICAgICAgIGhhc1JlcGVhdElEID0gcmVmSW5mb3MucmVmZXJuY2VkSURMaXN0LmluZGV4T2YoaWQpICE9PSAtMTtcbiAgICAgICAgaWYgKGhhc1JlcGVhdElEKSB7XG4gICAgICAgICAgICByZWZJbmZvcy5yZWZlcmVuY2VkQ291bnRzW2lkXSsrO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmVmSW5mb3MucmVmZXJlbmNlZENvdW50c1tpZF0gPSAxO1xuICAgICAgICB9XG4gICAgICAgIHJlZkluZm9zLnJlZmVybmNlZElETGlzdC5wdXNoKGlkKTtcbiAgICAgICAgcmVmSW5mb3Mua2V5TGlzdC5wdXNoKGtleSk7XG4gICAgICAgIHJlZkluZm9zLm9iakxpc3QucHVzaChvYmopO1xuICAgIH1cbiAgICB2YXIgaXNOZXcgPSAhZWxlbWVudC5faU4kdDtcbiAgICBpZiAoaXNOZXcpIHtcbiAgICAgICAgX2l0ZXJhdGl2ZShlbGVtZW50LCBzZXJpYWxpemVkLCByZWZJbmZvcyk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBpZiAoaGFzSUQpIHtcbiAgICAgICAgICAgIHJlZkluZm9zLnJlZmVyZW5jZWRDb3VudHNbaWRdKys7XG4gICAgICAgIH1cbiAgICB9XG59O1xuXG5GaXJlLl9uaWNpZnlTZXJpYWxpemVkID0gbmljaWZ5U2VyaWFsaXplZDtcbm1vZHVsZS5leHBvcnRzID0gbmljaWZ5U2VyaWFsaXplZDtcbiIsInZhciBEZWYgPSByZXF1aXJlKCcuLi9jb3JlL2RlZmluaXRpb24nKTtcbnZhciBQZXJzaXN0ZW50TWFzayA9IERlZi5QZXJzaXN0ZW50TWFzaztcbnZhciBEb250U2F2ZSA9IERlZi5Eb250U2F2ZTtcbnZhciBFZGl0b3JPbmx5ID0gRGVmLkVkaXRvck9ubHk7XG52YXIgX2lzRG9tTm9kZSA9IHJlcXVpcmUoJy4uL2NvcmUvdXRpbHMnKS5pc0RvbU5vZGU7XG52YXIgbmljaWZ5U2VyaWFsaXplZCA9IHJlcXVpcmUoJy4vc2VyaWFsaXplLW5pY2lmeScpO1xuXG5mdW5jdGlvbiBfZ2V0VHlwZSAob2JqKSB7XG4gICAgdmFyIHAgPSBvYmouY29uc3RydWN0b3IucHJvdG90eXBlO1xuICAgIGlmIChwLmhhc093blByb3BlcnR5KCdfX2NpZF9fJykpIHtcbiAgICAgICAgcmV0dXJuIHAuX19jaWRfXztcbiAgICB9XG4gICAgLy9pZiAocC5oYXNPd25Qcm9wZXJ0eSgnX19jbGFzc25hbWVfXycpKSB7XG4gICAgLy8gICAgcmV0dXJuIHAuX19jbGFzc25hbWVfXztcbiAgICAvL31cbiAgICByZXR1cm4gJyc7XG59XG5cbnZhciBfU2VyaWFsaXplciA9IChmdW5jdGlvbiAoKSB7XG5cbiAgICAvLy8qKlxuICAgIC8vICogQHBhcmFtIHtCb29sZWFufSBbZXhwb3J0aW5nPWZhbHNlXSAtIGlmIHRydWUsIHByb3BlcnR5IHdpdGggRmlyZS5FZGl0b3JPbmx5IHdpbGwgYmUgZGlzY2FyZGVkXG4gICAgLy8gKi9cbiAgICBmdW5jdGlvbiBfU2VyaWFsaXplcihvYmosIGV4cG9ydGluZykge1xuICAgICAgICB0aGlzLl9leHBvcnRpbmcgPSBleHBvcnRpbmc7XG5cbiAgICAgICAgdGhpcy5zZXJpYWxpemVkTGlzdCA9IFtdOyAgLy8gbGlzdCBvZiBzZXJpYWxpemVkIGRhdGEgZm9yIGFsbCBGaXJlLkZPYmplY3Qgb2Jqc1xuICAgICAgICB0aGlzLl9wYXJzaW5nT2JqcyA9IFtdOyAgICAvLyDorrDlvZXlvZPliY3lvJXnlKjlr7nosaHvvIzpmLLmraLlvqrnjq/lvJXnlKhcbiAgICAgICAgdGhpcy5fcGFyc2luZ0RhdGEgPSBbXTsgICAgLy8g6K6w5b2V5b2T5YmN5byV55So5a+56LGh55qE5bqP5YiX5YyW57uT5p6cXG4gICAgICAgIHRoaXMuX29ianNUb1Jlc2V0SWQgPSBbXTtcblxuICAgICAgICBfc2VyaWFsaXplTWFpbk9iaih0aGlzLCBvYmopO1xuXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5fb2Jqc1RvUmVzZXRJZC5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgdGhpcy5fb2Jqc1RvUmVzZXRJZFtpXS5fX2lkX18gPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9wYXJzaW5nT2JqcyA9IG51bGw7XG4gICAgICAgIHRoaXMuX3BhcnNpbmdEYXRhID0gbnVsbDtcbiAgICAgICAgdGhpcy5fb2Jqc1RvUmVzZXRJZCA9IG51bGw7XG4gICAgfVxuXG4gICAgLy8gZXZlbiBhcnJheSBtYXkgY2F1c2VkIGNpcmN1bGFyIHJlZmVyZW5jZSwgc28gd2UnZCBiZSBiZXR0ZXIgY2hlY2sgaXQgYWxsIHRoZSB0aW1lLCDlkKbliJnlsLHopoHlg491bml0eemZkOWItumAkuW9kuWxguasoe+8jOacieWlveacieWdj1xuICAgIHZhciBfY2hlY2tDaXJjdWxhclJlZmVyZW5jZSA9IGZ1bmN0aW9uIChzZWxmLCBvYmopIHtcbiAgICAgICAgdmFyIHBhcnNpbmdJbmRleCA9IHNlbGYuX3BhcnNpbmdPYmpzLmluZGV4T2Yob2JqKTtcbiAgICAgICAgdmFyIGNpcmN1bGFyUmVmZXJlbmNlZCA9IChwYXJzaW5nSW5kZXggIT09IC0xKTtcbiAgICAgICAgaWYgKGNpcmN1bGFyUmVmZXJlbmNlZCkge1xuICAgICAgICAgICAgLy8gcmVnaXN0ZXIgbmV3IHJlZmVyZW5jZWQgb2JqZWN0XG4gICAgICAgICAgICB2YXIgaWQgPSBzZWxmLnNlcmlhbGl6ZWRMaXN0Lmxlbmd0aDtcbiAgICAgICAgICAgIG9iai5fX2lkX18gPSBpZDsgICAgICAgIC8vIHdlIGFkZCB0aGlzIHByb3AgZHluYW1pY2FsbHkgdG8gc2ltcGx5IGxvb2t1cCB3aGV0aGVyIGFuIG9iaiBoYXMgYmVlbiBzZXJpYWxpemVkLlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gSWYgaXQgd2lsbCBsZWFkIHRvIHBlcmZvcm1hbmNlIGRlZ3JhZGF0aW9ucyBpbiBWOCwgd2UganVzdCBuZWVkIHRvIHNhdmUgaWRzIHRvIGFub3RoZXIgdGFibGUuXG4gICAgICAgICAgICBzZWxmLl9vYmpzVG9SZXNldElkLnB1c2gob2JqKTtcbiAgICAgICAgICAgIHZhciBkYXRhID0gc2VsZi5fcGFyc2luZ0RhdGFbcGFyc2luZ0luZGV4XTtcbiAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KG9iaikgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgLy9kYXRhLl9faWRfXyA9IGlkOyAgIC8vIGFsc28gc2F2ZSBpZCBpbiBzb3VyY2UgZGF0YSwganVzdCBmb3IgZGVidWdnaW5nXG4gICAgICAgICAgICAgICAgdmFyIHR5cGUgPSBfZ2V0VHlwZShvYmopO1xuICAgICAgICAgICAgICAgIGlmICh0eXBlKSB7XG4gICAgICAgICAgICAgICAgICAgIGRhdGEuX190eXBlX18gPSB0eXBlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNlbGYuc2VyaWFsaXplZExpc3QucHVzaChkYXRhKTtcbiAgICAgICAgICAgIHJldHVybiBkYXRhO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIGVudW1lcmF0ZUJ5RmlyZUNsYXNzIChzZWxmLCBvYmosIGRhdGEsIGZpcmVDbGFzcykge1xuICAgICAgICB2YXIgcHJvcHMgPSBmaXJlQ2xhc3MuX19wcm9wc19fO1xuICAgICAgICBpZiAocHJvcHMpIHtcbiAgICAgICAgICAgIGZvciAodmFyIHAgPSAwOyBwIDwgcHJvcHMubGVuZ3RoOyBwKyspIHtcbiAgICAgICAgICAgICAgICB2YXIgcHJvcE5hbWUgPSBwcm9wc1twXTtcbiAgICAgICAgICAgICAgICB2YXIgYXR0cnMgPSBGaXJlLmF0dHIoZmlyZUNsYXNzLCBwcm9wTmFtZSk7XG4gICAgICAgICAgICAgICAgLy8gYXNzdW1lIGFsbCBwcm9wIGluIF9fcHJvcHNfXyBtdXN0IGhhdmUgYXR0clxuXG4gICAgICAgICAgICAgICAgLy8gc2tpcCBlZGl0b3Igb25seSB3aGVuIGV4cG9ydGluZ1xuICAgICAgICAgICAgICAgIGlmIChzZWxmLl9leHBvcnRpbmcgJiYgYXR0cnMuZWRpdG9yT25seSkge1xuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoYXR0cnMuc2F2ZVVybEFzQXNzZXQpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHVybCA9IG9ialtwcm9wTmFtZV07XG4gICAgICAgICAgICAgICAgICAgIGlmICghdXJsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHVybCAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIEZpcmUuZXJyb3IoJ1RoZSB1cmwgbXVzdCBiZSBcInN0cmluZ1wiIHR5cGUnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHZhciB1dWlkID0gRmlyZS5Bc3NldC51cmxUb1V1aWQodXJsKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF1dWlkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBkYXRhW3Byb3BOYW1lXSA9IF9zZXJpYWxpemVGaWVsZChzZWxmLCBFZGl0b3Iuc2VyaWFsaXplLmFzQXNzZXQodXVpZCkpO1xuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoYXR0cnMuc2VyaWFsaXphYmxlID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyB1bmRlZmluZWQgdmFsdWUgKGlmIGRvbnQgc2F2ZSkgd2lsbCBiZSBzdHJpcHBlZCBmcm9tIEpTT05cbiAgICAgICAgICAgICAgICBkYXRhW3Byb3BOYW1lXSA9IF9zZXJpYWxpemVGaWVsZChzZWxmLCBvYmpbcHJvcE5hbWVdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vLyoqXG4gICAgLy8gKiBAcGFyYW0ge29iamVjdH0gb2JqIC0gVGhlIG9iamVjdCB0byBzZXJpYWxpemVcbiAgICAvLyAqIEBwYXJhbSB7YXJyYXl8b2JqZWN0fSBkYXRhIC0gVGhlIGFycmF5IG9yIGRpY3Qgd2hlcmUgc2VyaWFsaXplZCBkYXRhIHRvIHN0b3JlXG4gICAgLy8gKiBAcmV0dXJuIHtvYmplY3R9IFRoZSByZWZlcmVuY2UgaW5mbyB1c2VkIHRvIGVtYmVkIHRvIGl0cyBjb250YWluZXIuXG4gICAgLy8gKiAgICAgICAgICAgICAgICAgICBpZiB0aGUgc2VyaWFsaXplZCBkYXRhIG5vdCBjb250YWlucyBpbiBzZXJpYWxpemVkTGlzdCwgdGhlbiByZXR1cm4gdGhlIGRhdGEgZGlyZWN0bHkuXG4gICAgLy8gKi9cbiAgICB2YXIgX2VudW1lcmF0ZU9iamVjdCA9IGZ1bmN0aW9uIChzZWxmLCBvYmosIGRhdGEpIHtcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkob2JqKSkge1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBvYmoubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgICAgICB2YXIgaXRlbSA9IF9zZXJpYWxpemVGaWVsZChzZWxmLCBvYmpbaV0pO1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgaXRlbSAhPT0gJ3VuZGVmaW5lZCcpIHsgICAgIC8vIHN0cmlwIHVuZGVmaW5lZCBpdGVtIChkb250IHNhdmUpXG4gICAgICAgICAgICAgICAgICAgIGRhdGEucHVzaChpdGVtKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB2YXIgYXR0cnMsIHByb3BOYW1lLCBwcm9wcztcbiAgICAgICAgICAgIHZhciBrbGFzcyA9IG9iai5jb25zdHJ1Y3RvcjtcbiAgICAgICAgICAgIHZhciBtaXhpbkNsYXNzZXMgPSBvYmouX21peGluQ2xhc3NlcztcbiAgICAgICAgICAgIGlmIChtaXhpbkNsYXNzZXMpIHtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBtID0gMDsgbSA8IG1peGluQ2xhc3Nlcy5sZW5ndGg7IG0rKykge1xuICAgICAgICAgICAgICAgICAgICB2YXIgbWl4aW5DbGFzcyA9IG1peGluQ2xhc3Nlc1ttXTtcbiAgICAgICAgICAgICAgICAgICAgZW51bWVyYXRlQnlGaXJlQ2xhc3Moc2VsZiwgb2JqLCBkYXRhLCBtaXhpbkNsYXNzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICghIEZpcmUuX2lzRmlyZUNsYXNzKGtsYXNzKSkge1xuICAgICAgICAgICAgICAgIC8vIHByaW1pdGl2ZSBqYXZhc2NyaXB0IG9iamVjdFxuICAgICAgICAgICAgICAgIGZvciAodmFyIGtleSBpbiBvYmopIHtcbiAgICAgICAgICAgICAgICAgICAgLy9GaXJlLmxvZyhrZXkpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoICFvYmouaGFzT3duUHJvcGVydHkoa2V5KSB8fCAoa2V5LmNoYXJDb2RlQXQoMCkgPT09IDk1ICYmIGtleS5jaGFyQ29kZUF0KDEpID09PSA5NSkpICAgIC8vIHN0YXJ0cyB3aXRoIF9fXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICAgICAgLy8gdW5kZWZpbmVkIHZhbHVlIChpZiBkb250IHNhdmUpIHdpbGwgYmUgc3RyaXBwZWQgZnJvbSBKU09OXG4gICAgICAgICAgICAgICAgICAgIGRhdGFba2V5XSA9IF9zZXJpYWxpemVGaWVsZChzZWxmLCBvYmpba2V5XSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gbm9ybWFsIEZpcmVDbGFzc1xuXG4gICAgICAgICAgICAgICAgLy9pZiAob2JqLm9uQmVmb3JlU2VyaWFsaXplKSB7XG4gICAgICAgICAgICAgICAgLy8gICAgb2JqLm9uQmVmb3JlU2VyaWFsaXplKCk7XG4gICAgICAgICAgICAgICAgLy99XG4gICAgICAgICAgICAgICAgcHJvcHMgPSBrbGFzcy5fX3Byb3BzX187XG4gICAgICAgICAgICAgICAgaWYgKHByb3BzKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChwcm9wc1twcm9wcy5sZW5ndGggLSAxXSAhPT0gJ18kZXJpYWxpemVkJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgZW51bWVyYXRlQnlGaXJlQ2xhc3Moc2VsZiwgb2JqLCBkYXRhLCBrbGFzcyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBJZiBpcyBtaXNzaW5nIHNjcmlwdCBwcm94eSwgc2VyaWFsaXplZCBhcyBvcmlnaW5hbCBkYXRhXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhLl9fdHlwZV9fID0gb2JqLl8kZXJpYWxpemVkLl9fdHlwZV9fO1xuICAgICAgICAgICAgICAgICAgICAgICAgX2VudW1lcmF0ZU9iamVjdChzZWxmLCBvYmouXyRlcmlhbGl6ZWQsIGRhdGEpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcblxuICAgIC8vLyoqXG4gICAgLy8gKiBzZXJpYWxpemUgYW55IHR5cGVcbiAgICAvLyAqIEBwYXJhbSB7Kn0gdmFsIC0gVGhlIGVsZW1lbnQgdG8gc2VyaWFsaXplXG4gICAgLy8gKi9cbiAgICB2YXIgX3NlcmlhbGl6ZUZpZWxkID0gZnVuY3Rpb24gKHNlbGYsIHZhbCkge1xuICAgICAgICB2YXIgdHlwZSA9IHR5cGVvZiB2YWw7XG4gICAgICAgIGlmICh0eXBlID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgaWYgKHZhbCBpbnN0YW5jZW9mIEZPYmplY3QpIHtcbiAgICAgICAgICAgICAgICB2YXIgb2JqRmxhZ3MgPSB2YWwuX29iakZsYWdzO1xuICAgICAgICAgICAgICAgIGlmIChvYmpGbGFncyAmIERvbnRTYXZlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHNlbGYuX2V4cG9ydGluZyAmJiAob2JqRmxhZ3MgJiBFZGl0b3JPbmx5KSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBfc2VyaWFsaXplT2JqKHNlbGYsIHZhbCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodHlwZSAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgcmV0dXJuIHZhbDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIC8qZnVuY3Rpb24qLyB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICAvLy8qKlxuICAgIC8vICogc2VyaWFsaXplIG9ubHkgcHJpbWl0aXZlIG9iamVjdCB0eXBlXG4gICAgLy8gKiBAcGFyYW0ge29iamVjdH0gb2JqIC0gVGhlIG9iamVjdCB0byBzZXJpYWxpemVcbiAgICAvLyAqL1xuICAgIHZhciBfc2VyaWFsaXplUHJpbWl0aXZlT2JqID0gZnVuY3Rpb24gKHNlbGYsIG9iaikge1xuICAgICAgICB2YXIgZGF0YTtcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkob2JqKSkge1xuICAgICAgICAgICAgZGF0YSA9IFtdO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgeyAgLy8gJ29iamVjdCdcbiAgICAgICAgICAgIGRhdGEgPSB7fTtcbiAgICAgICAgICAgIHZhciB0eXBlID0gX2dldFR5cGUob2JqKTtcbiAgICAgICAgICAgIGlmICh0eXBlKSB7XG4gICAgICAgICAgICAgICAgZGF0YS5fX3R5cGVfXyA9IHR5cGU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgb2xkU2VyaWFsaXplZENvdW50ID0gc2VsZi5zZXJpYWxpemVkTGlzdC5sZW5ndGg7XG5cbiAgICAgICAgLy8gbWFyayBwYXJzaW5nIHRvIHByZXZlbnQgY2lyY3VsYXIgcmVmZXJlbmNlXG4gICAgICAgIHNlbGYuX3BhcnNpbmdPYmpzLnB1c2gob2JqKTtcbiAgICAgICAgc2VsZi5fcGFyc2luZ0RhdGEucHVzaChkYXRhKTtcblxuICAgICAgICBfZW51bWVyYXRlT2JqZWN0KHNlbGYsIG9iaiwgZGF0YSk7XG5cbiAgICAgICAgc2VsZi5fcGFyc2luZ09ianMucG9wKCk7XG4gICAgICAgIHNlbGYuX3BhcnNpbmdEYXRhLnBvcCgpO1xuXG4gICAgICAgIC8vIGNoZWNrIHdoZXRoZXIgb2JqIGhhcyBiZWVuIHNlcmlhbGl6ZWQgdG8gc2VyaWFsaXplZExpc3QsXG4gICAgICAgIC8vIGlmIGl0IGlzLCBubyBuZWVkIHRvIHNlcmlhbGl6ZWQgdG8gZGF0YSBhZ2FpblxuICAgICAgICBpZiAoc2VsZi5zZXJpYWxpemVkTGlzdC5sZW5ndGggPiBvbGRTZXJpYWxpemVkQ291bnQpIHtcbiAgICAgICAgICAgIHZhciBpbmRleCA9IHNlbGYuc2VyaWFsaXplZExpc3QuaW5kZXhPZihkYXRhLCBvbGRTZXJpYWxpemVkQ291bnQpO1xuICAgICAgICAgICAgaWYgKGluZGV4ICE9PSAtMSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB7IF9faWRfXzogaW5kZXggfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGlubGluZVxuICAgICAgICByZXR1cm4gZGF0YTtcbiAgICB9O1xuXG4gICAgLy8vKipcbiAgICAvLyAqIHNlcmlhbGl6ZSBvYmplY3RcbiAgICAvLyAqIEBwYXJhbSB7b2JqZWN0fSBvYmogLSBUaGUgb2JqZWN0IHRvIHNlcmlhbGl6ZVxuICAgIC8vICovXG4gICAgdmFyIF9zZXJpYWxpemVPYmogPSBmdW5jdGlvbiAoc2VsZiwgb2JqKSB7XG4gICAgICAgIC8vRmlyZS5sb2cob2JqKTtcbiAgICAgICAgaWYgKCFvYmopIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gaGFzIGJlZW4gc2VyaWFsaXplZCA/XG4gICAgICAgIHZhciBpZCA9IG9iai5fX2lkX187XG4gICAgICAgIGlmICh0eXBlb2YgaWQgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICByZXR1cm4geyBfX2lkX186IGlkIH07IC8vIG5vIG5lZWQgdG8gcGFyc2UgYWdhaW5cbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBpc0ZPYmogPSBvYmogaW5zdGFuY2VvZiBGT2JqZWN0O1xuICAgICAgICBpZiAoaXNGT2JqKSB7XG4gICAgICAgICAgICAvLyBGT2JqZWN0XG4gICAgICAgICAgICBpZiAoIW9iai5pc1ZhbGlkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgdXVpZCA9IG9iai5fdXVpZDtcbiAgICAgICAgICAgIGlmICh1dWlkKSB7XG4gICAgICAgICAgICAgICAgLy8gQXNzZXRcbiAgICAgICAgICAgICAgICByZXR1cm4ge19fdXVpZF9fOiB1dWlkfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoaXNGT2JqIHx8IEZpcmUuX2lzRmlyZUNsYXNzKG9iai5jb25zdHJ1Y3RvcikpIHtcbiAgICAgICAgICAgIC8vIGFzc2lnbiBpZCBmb3IgRk9iamVjdFxuICAgICAgICAgICAgaWQgPSBzZWxmLnNlcmlhbGl6ZWRMaXN0Lmxlbmd0aDtcbiAgICAgICAgICAgIG9iai5fX2lkX18gPSBpZDsgICAgICAgIC8vIHdlIGFkZCB0aGlzIHByb3AgZHluYW1pY2FsbHkgdG8gc2ltcGx5IGxvb2t1cCB3aGV0aGVyIGFuIG9iaiBoYXMgYmVlbiBzZXJpYWxpemVkLlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gSWYgaXQgd2lsbCBsZWFkIHRvIHBlcmZvcm1hbmNlIGRlZ3JhZGF0aW9ucyBpbiBWOCwgd2UganVzdCBuZWVkIHRvIHNhdmUgaWRzIHRvIGFub3RoZXIgdGFibGUuXG4gICAgICAgICAgICBzZWxmLl9vYmpzVG9SZXNldElkLnB1c2gob2JqKTtcblxuICAgICAgICAgICAgLy8gZ2V0IEZPYmplY3QgZGF0YVxuICAgICAgICAgICAgdmFyIGRhdGEgPSB7fTtcbiAgICAgICAgICAgIHNlbGYuc2VyaWFsaXplZExpc3QucHVzaChkYXRhKTtcblxuICAgICAgICAgICAgdmFyIHR5cGUgPSBfZ2V0VHlwZShvYmopO1xuICAgICAgICAgICAgaWYgKHR5cGUpIHtcbiAgICAgICAgICAgICAgICBkYXRhLl9fdHlwZV9fID0gdHlwZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghIG9iai5fc2VyaWFsaXplKSB7XG4gICAgICAgICAgICAgICAgX2VudW1lcmF0ZU9iamVjdChzZWxmLCBvYmosIGRhdGEpO1xuICAgICAgICAgICAgICAgIGlmIChpc0ZPYmopIHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YS5fb2JqRmxhZ3MgJj0gUGVyc2lzdGVudE1hc2s7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgLy9pZiAoaXNGT2JqKSB7XG4gICAgICAgICAgICAgICAgLy8gICAgb2JqLl9vYmpGbGFncyAmPSBQZXJzaXN0ZW50TWFzaztcbiAgICAgICAgICAgICAgICAvL31cbiAgICAgICAgICAgICAgICBkYXRhLmNvbnRlbnQgPSBvYmouX3NlcmlhbGl6ZShzZWxmLl9leHBvcnRpbmcpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4geyBfX2lkX186IGlkIH07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoX2lzRG9tTm9kZSAmJiBfaXNEb21Ob2RlKG9iaikpIHtcbiAgICAgICAgICAgIC8vIHJhdyBvYmpcbiAgICAgICAgICAgIC8vRmlyZS53YXJuKFwiXCIgKyBvYmogKyBcIiB3b24ndCBiZSBzZXJpYWxpemVkXCIpO1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAvLyBjaGVjayBjaXJjdWxhciByZWZlcmVuY2UgaWYgcHJpbWl0aXZlIG9iamVjdFxuICAgICAgICAgICAgLy8g5a+55LqO5Y6f55SfamF2YXNjcmlwdOexu+Wei++8jOWPquWBmuW+queOr+W8leeUqOeahOS/neaKpO+8jFxuICAgICAgICAgICAgLy8g5bm25LiN5L+d6K+B5ZCM5Liq5a+56LGh55qE5aSa5aSE5byV55So5Y+N5bqP5YiX5YyW5ZCO5LuN54S25oyH5ZCR5ZCM5LiA5Liq5a+56LGh44CCXG4gICAgICAgICAgICAvLyDlpoLmnpzmnInmraTpnIDmsYLvvIzlupTor6Xnu6fmib/oh6pGT2JqZWN0XG4gICAgICAgICAgICB2YXIgcmVmZXJlbmNlZERhdGEgPSBfY2hlY2tDaXJjdWxhclJlZmVyZW5jZShzZWxmLCBvYmopO1xuICAgICAgICAgICAgaWYgKHJlZmVyZW5jZWREYXRhKSB7XG4gICAgICAgICAgICAgICAgLy8gYWxyZWFkeSByZWZlcmVuY2VkXG4gICAgICAgICAgICAgICAgaWQgPSBvYmouX19pZF9fO1xuICAgICAgICAgICAgICAgIHJldHVybiB7IF9faWRfXzogaWQgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiBfc2VyaWFsaXplUHJpbWl0aXZlT2JqKHNlbGYsIG9iaik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgLy8vKipcbiAgICAvLyAqIHNlcmlhbGl6ZSBtYWluIG9iamVjdFxuICAgIC8vICog6L+Z5Liq5pa55rOV5Li76KaB5piv5a+5IG1haW4gb2JqZWN0IOWBmueJueauiuWkhOeQhu+8jOiZveeEtuWSjCBfc2VyaWFsaXplT2JqIOW+iOaOpei/ke+8jOS9huS4uuS6hlxuICAgIC8vICog6YG/5YWN5aKe5YqgIF9zZXJpYWxpemVPYmog55qE6aKd5aSW5byA6ZSA5bm25LiN5ZKM5a6D5ZCI5bm25Yiw5LiA6LW344CCXG4gICAgLy8gKiBAcGFyYW0ge29iamVjdH0gb2JqIC0gVGhlIG9iamVjdCB0byBzZXJpYWxpemVcbiAgICAvLyAqL1xuICAgIHZhciBfc2VyaWFsaXplTWFpbk9iaiA9IGZ1bmN0aW9uIChzZWxmLCBvYmopIHtcbiAgICAgICAgaWYgKG9iaiBpbnN0YW5jZW9mIEZPYmplY3QgfHwgRmlyZS5faXNGaXJlQ2xhc3Mob2JqLmNvbnN0cnVjdG9yKSkge1xuICAgICAgICAgICAgdmFyIHV1aWQgPSBvYmouX3V1aWQ7XG4gICAgICAgICAgICBpZiAodHlwZW9mIHV1aWQgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgLy8gZm9yY2UgQXNzZXQgc2VyaWFsaXphYmxlLCBvciBfc2VyaWFsaXplT2JqIHdpbGwganVzdCByZXR1cm4geyBfX3V1aWRfXzogLi4uIH1cbiAgICAgICAgICAgICAgICBvYmouX3V1aWQgPSBudWxsO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBfc2VyaWFsaXplT2JqKHNlbGYsIG9iaik7XG5cbiAgICAgICAgICAgIGlmICh0eXBlb2YgdXVpZCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICAvLyByZXN0b3JlIHV1aWRcbiAgICAgICAgICAgICAgICBvYmouX3V1aWQgPSB1dWlkO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHR5cGVvZiBvYmogPT09ICdvYmplY3QnICYmIG9iaikge1xuICAgICAgICAgICAgaWYgKF9pc0RvbU5vZGUgJiYgX2lzRG9tTm9kZShvYmopKSB7XG4gICAgICAgICAgICAgICAgRmlyZS53YXJuKFwiXCIgKyBvYmogKyBcIiB3b24ndCBiZSBzZXJpYWxpemVkXCIpO1xuICAgICAgICAgICAgICAgIHNlbGYuc2VyaWFsaXplZExpc3QucHVzaChudWxsKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBkYXRhO1xuICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkob2JqKSkge1xuICAgICAgICAgICAgICAgIGRhdGEgPSBbXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGRhdGEgPSB7fTtcbiAgICAgICAgICAgICAgICB2YXIgdHlwZSA9IF9nZXRUeXBlKG9iaik7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGUpIHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YS5fX3R5cGVfXyA9IHR5cGU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBvYmouX19pZF9fID0gMDtcbiAgICAgICAgICAgIHNlbGYuX29ianNUb1Jlc2V0SWQucHVzaChvYmopO1xuICAgICAgICAgICAgc2VsZi5zZXJpYWxpemVkTGlzdC5wdXNoKGRhdGEpO1xuICAgICAgICAgICAgX2VudW1lcmF0ZU9iamVjdChzZWxmLCBvYmosIGRhdGEpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgc2VsZi5zZXJpYWxpemVkTGlzdC5wdXNoKF9zZXJpYWxpemVPYmooc2VsZiwgb2JqKSk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgcmV0dXJuIF9TZXJpYWxpemVyO1xufSkoKTtcblxuLyoqXG4gKiBAbW9kdWxlIEVkaXRvclxuICovXG4vKipcbiAqIFNlcmlhbGl6ZSBGaXJlLkFzc2V0IHRvIGEganNvbiBzdHJpbmdcbiAqIEBtZXRob2Qgc2VyaWFsaXplXG4gKiBAcGFyYW0ge0Fzc2V0fSBvYmogLSBUaGUgb2JqZWN0IHRvIHNlcmlhbGl6ZVxuICogQHBhcmFtIHtvYmplY3R9IFtvcHRpb25zPW51bGxdXG4gKiBAcmV0dXJuIHtzdHJpbmd8b2JqZWN0fSBUaGUganNvbiBzdHJpbmcgdG8gcmVwcmVzZW50IHRoZSBvYmplY3Qgb3IganNvbiBvYmplY3QgaWYgZG9udFN0cmluZ2lmeSBpcyB0cnVlXG4gKi9cbkVkaXRvci5zZXJpYWxpemUgPSBmdW5jdGlvbiAob2JqLCBvcHRpb25zKSB7XG4gICAgdmFyIGV4cG9ydGluZyA9IChvcHRpb25zICYmIG9wdGlvbnMuZXhwb3J0aW5nKTtcbiAgICAvLyBpbmRpY2F0ZXMgd2hldGhlciBuZWVkcyB0byBjb252ZXJ0IHRoZSByZXN1bHQgYnkgSlNPTi5zdHJpbmdpZnksIGRlZmF1bHQgaXMgdHJ1ZVxuICAgIHZhciBzdHJpbmdpZnkgPSAob3B0aW9ucyAmJiAnc3RyaW5naWZ5JyBpbiBvcHRpb25zKSA/IG9wdGlvbnMuc3RyaW5naWZ5IDogdHJ1ZTtcbiAgICB2YXIgbWluaWZ5ID0gKG9wdGlvbnMgJiYgJ21pbmlmeScgaW4gb3B0aW9ucykgPyBvcHRpb25zLm1pbmlmeSA6IGZhbHNlO1xuICAgIHZhciBuaWNpZnkgPSBtaW5pZnkgfHwgKG9wdGlvbnMgJiYgb3B0aW9ucy5uaWNpZnkpO1xuXG4gICAgdmFyIHNlcmlhbGl6ZXIgPSBuZXcgX1NlcmlhbGl6ZXIob2JqLCBleHBvcnRpbmcpO1xuICAgIHZhciBzZXJpYWxpemVkTGlzdCA9IHNlcmlhbGl6ZXIuc2VyaWFsaXplZExpc3Q7XG5cbiAgICBpZiAobmljaWZ5KSB7XG4gICAgICAgIG5pY2lmeVNlcmlhbGl6ZWQoc2VyaWFsaXplZExpc3QpO1xuICAgIH1cblxuICAgIHZhciBzZXJpYWxpemVkRGF0YTtcbiAgICBpZiAoc2VyaWFsaXplZExpc3QubGVuZ3RoID09PSAxICYmICFBcnJheS5pc0FycmF5KHNlcmlhbGl6ZWRMaXN0WzBdKSkge1xuICAgICAgICBzZXJpYWxpemVkRGF0YSA9IHNlcmlhbGl6ZWRMaXN0WzBdO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgc2VyaWFsaXplZERhdGEgPSBzZXJpYWxpemVkTGlzdDtcbiAgICB9XG4gICAgaWYgKHN0cmluZ2lmeSA9PT0gZmFsc2UpIHtcbiAgICAgICAgcmV0dXJuIHNlcmlhbGl6ZWREYXRhO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHNlcmlhbGl6ZWREYXRhLCBudWxsLCBtaW5pZnkgPyAwIDogMik7XG4gICAgfVxufTtcblxuLyoqXG4gKiBDcmVhdGUgYSBwc2V1ZG8gb2JqZWN0IHdoaWNoIHdpbGwgYmUgZm9yY2Ugc2VyaWFsaXplZCBhcyBhIHJlZmVyZW5jZSB0byBhbnkgYXNzZXQgYnkgc3BlY2lmaWVkIHV1aWQuXG4gKiBAbWV0aG9kIHNlcmlhbGl6ZS5hc0Fzc2V0XG4gKiBAcGFyYW0ge3N0cmluZ30gdXVpZFxuICogQHJldHVybiB7QXNzZXR9XG4gKi9cbkVkaXRvci5zZXJpYWxpemUuYXNBc3NldCA9IGZ1bmN0aW9uICh1dWlkKSB7XG4gICAgaWYgKCAhdXVpZCApIHtcbiAgICAgICAgRmlyZS5lcnJvcignW0VkaXRvci5zZXJpYWxpemUuYXNBc3NldF0gVGhlIHV1aWQgbXVzdCBiZSBub24tbmlsIScpO1xuICAgIH1cbiAgICB2YXIgcHNldWRvQXNzZXQgPSBuZXcgRmlyZS5Bc3NldCgpO1xuICAgIHBzZXVkb0Fzc2V0Ll91dWlkID0gdXVpZDtcbiAgICByZXR1cm4gcHNldWRvQXNzZXQ7XG59O1xuXG4vKipcbiAqIFNldCB0aGUgYXNzZXQncyBuYW1lIGRpcmVjdGx5IGluIEpTT04gb2JqZWN0XG4gKiBAbWV0aG9kIHNlcmlhbGl6ZS5zZXROYW1lXG4gKiBAcGFyYW0ge29iamVjdH0ganNvbk9ialxuICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcbiAqL1xuRWRpdG9yLnNlcmlhbGl6ZS5zZXROYW1lID0gZnVuY3Rpb24gKGpzb25PYmosIG5hbWUpIHtcbiAgICBpZiAoIEFycmF5LmlzQXJyYXkoanNvbk9iaikgKSB7XG4gICAgICAgIGpzb25PYmpbMF0uX25hbWUgPSBuYW1lO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAganNvbk9iai5fbmFtZSA9IG5hbWU7XG4gICAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBFZGl0b3Iuc2VyaWFsaXplO1xuIiwiXG5mdW5jdGlvbiBzZXRBc3NldCAob2JqLCBuYW1lLCB1dWlkKSB7XG4gICAgaWYgKG5hbWUuZW5kc1dpdGgoJ1V1aWQnKSkge1xuICAgICAgICAvLyBUT0RPIC0gb2Jzb2xldGUgbWUgYWZ0ZXIgYml0bWFwIGZvbnQgYW5kIHBhcnRpY2xlIHVwZGF0ZWRcbiAgICAgICAgb2JqW25hbWVdID0gdXVpZDtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBGaXJlLkFzc2V0TGlicmFyeS5sb2FkQXNzZXQodXVpZCwgZnVuY3Rpb24gKGVyciwgYXNzZXQpIHtcbiAgICAgICAgLy9pZiAoIShhc3NldCBpbnN0YW5jZW9mIHR5cGVPZlVybCkpIHtcbiAgICAgICAgLy8gICAgRmlyZS5lcnJvcignVGhlIG5ldyAlcyBtdXN0IGJlICVzJywgcHJvcE5hbWUsIEZpcmUuSlMuZ2V0Q2xhc3NOYW1lKHR5cGVPZlVybCkpO1xuICAgICAgICAvL31cbiAgICAgICAgdmFyIGlzVXJsID0gdHJ1ZTtcbiAgICAgICAgaWYgKGlzVXJsKSB7XG4gICAgICAgICAgICBvYmpbbmFtZV0gPSAoYXNzZXQgJiYgYXNzZXQudXJsKSB8fCAnJztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIG9ialtuYW1lXSA9IGFzc2V0O1xuICAgICAgICB9XG4gICAgfSk7XG59XG5cbi8vIGFzc2VydCB2YWx1ZS51dWlkICYmIGFjdHVhbFR5cGVcbmZ1bmN0aW9uIHNldEJ5VXVpZCAob2JqLCBuYW1lLCB2YWx1ZSwgYWN0dWFsVHlwZSkge1xuICAgIHZhciB1dWlkID0gdmFsdWUudXVpZDtcbiAgICB2YXIgdHlwZSA9IEZpcmUuSlMuZ2V0Q2xhc3NCeU5hbWUoYWN0dWFsVHlwZSk7XG4gICAgaWYgKHR5cGUpIHtcbiAgICAgICAgaWYgKEZpcmUuaXNDaGlsZENsYXNzT2YodHlwZSwgRmlyZS5Bc3NldCkpIHtcbiAgICAgICAgICAgIHNldEFzc2V0KG9iaiwgbmFtZSwgdXVpZCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoRmlyZS5pc0NoaWxkQ2xhc3NPZih0eXBlLCBGaXJlLlJ1bnRpbWUuTm9kZVdyYXBwZXIpKSB7XG4gICAgICAgICAgICBvYmpbbmFtZV0gPSBGaXJlLmVuZ2luZS5nZXRJbnN0YW5jZUJ5SWQodXVpZCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAvLyBqdXN0IGEgY29tbW9uIHByaW1pdGl2ZSBvYmplY3RcbiAgICAgICAgICAgIG9ialtuYW1lXSA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBGaXJlLndhcm4oJ1Vua25vd24gdHlwZSB0byBhcHBseTogJyArIGFjdHVhbFR5cGUpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gc2V0UHJvcGVydHlCeVBhdGggKG5vZGUsIHBhdGgsIHZhbHVlLCBhY3R1YWxUeXBlKSB7XG4gICAgaWYgKHBhdGguaW5kZXhPZignLicpID09PSAtMSkge1xuICAgICAgICBpZiAoYWN0dWFsVHlwZSAmJiB2YWx1ZS51dWlkKSB7XG4gICAgICAgICAgICBzZXRCeVV1aWQobm9kZSwgcGF0aCwgdmFsdWUsIGFjdHVhbFR5cGUpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgbm9kZVtwYXRoXSA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICB2YXIgcHJvcHMgPSBwYXRoLnNwbGl0KCcuJyk7XG4gICAgICAgIHZhciBtYWluUHJvcE5hbWUgPSBwcm9wc1swXTtcbiAgICAgICAgdmFyIG1haW5Qcm9wID0gbm9kZVttYWluUHJvcE5hbWVdO1xuICAgICAgICAvLyBwYXJzZSBlbWJlZGRlZCBwcm9wc1xuICAgICAgICB2YXIgc3ViUHJvcCA9IG1haW5Qcm9wO1xuICAgICAgICAvL2lmIChzdWJQcm9wKSB7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IHByb3BzLmxlbmd0aCAtIDE7IGkrKykge1xuICAgICAgICAgICAgICAgIHZhciBzdWJQcm9wTmFtZSA9IHByb3BzW2ldO1xuICAgICAgICAgICAgICAgIHN1YlByb3AgPSBzdWJQcm9wW3N1YlByb3BOYW1lXTtcbiAgICAgICAgICAgICAgICAvL2lmIChzdWJQcm9wID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAvL31cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBwcm9wTmFtZSA9IHByb3BzW3Byb3BzLmxlbmd0aCAtIDFdO1xuICAgICAgICAgICAgaWYgKGFjdHVhbFR5cGUgJiYgdmFsdWUudXVpZCkge1xuICAgICAgICAgICAgICAgIHNldEJ5VXVpZChzdWJQcm9wLCBwcm9wTmFtZSwgdmFsdWUsIGFjdHVhbFR5cGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgc3ViUHJvcFtwcm9wTmFtZV0gPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICAvLyBpbnZva2Ugc2V0dGVyIChmb3IgcG9zaXRpb24pXG4gICAgICAgICAgICAgICAgbm9kZVttYWluUHJvcE5hbWVdID0gbWFpblByb3A7XG4gICAgICAgICAgICB9XG4gICAgICAgIC8vfVxuICAgICAgICAvL2Vsc2Uge1xuICAgICAgICAvL31cbiAgICB9XG59XG5cbmZ1bmN0aW9uIGdldFByb3BlcnR5QnlQYXRoIChub2RlLCBwYXRoKSB7XG4gICAgaWYgKHBhdGguaW5kZXhPZignLicpID09PSAtMSkge1xuICAgICAgICByZXR1cm4gbm9kZVtwYXRoXTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHZhciBwcm9wcyA9IHBhdGguc3BsaXQoJy4nKTtcbiAgICAgICAgdmFyIHN1YlByb3AgPSBub2RlO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBzdWJQcm9wID0gc3ViUHJvcFtwcm9wc1tpXV07XG4gICAgICAgICAgICBpZiAoc3ViUHJvcCA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgRmlyZS53YXJuKCdGYWlsZWQgdG8gcGFyc2UgXCIlc1wiLCAlcyBpcyBuaWwnLCBwYXRoLCBwcm9wc1tpXSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHN1YlByb3A7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBzZXREZWVwUHJvcGVydHlCeVBhdGggKG5vZGUsIHBhdGgsIHZhbHVlLCBhY3R1YWxUeXBlKSB7XG4gICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgIUFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgICAgIGlmIChhY3R1YWxUeXBlICYmIHZhbHVlLnV1aWQpIHtcbiAgICAgICAgICAgIHNldFByb3BlcnR5QnlQYXRoKG5vZGUsIHBhdGgsIHZhbHVlLCBhY3R1YWxUeXBlKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHZhciBvYmogPSBnZXRQcm9wZXJ0eUJ5UGF0aChub2RlLCBwYXRoKTtcbiAgICAgICAgICAgIC8vIGNoYW5nZSBjdXJyZW50IHZhbHVlXG4gICAgICAgICAgICBmb3IgKHZhciBzdWJLZXkgaW4gdmFsdWUpIHtcbiAgICAgICAgICAgICAgICB2YXIgc3ViVmFsID0gdmFsdWVbc3ViS2V5XTtcbiAgICAgICAgICAgICAgICAvLyDkuI3kvJrlj5HlpI3lkIjlr7nosaHov4fmnaXvvIzmiYDku6XkuI3nlKjmioogdHlwZSDkvKDnu5nlrZDlr7nosaFcbiAgICAgICAgICAgICAgICBzZXREZWVwUHJvcGVydHlCeVBhdGgob2JqLCBzdWJLZXksIHN1YlZhbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBhcHBseSBjaGFuZ2VzXG4gICAgICAgICAgICBzZXRQcm9wZXJ0eUJ5UGF0aChub2RlLCBwYXRoLCBvYmopO1xuICAgICAgICB9XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBzZXRQcm9wZXJ0eUJ5UGF0aChub2RlLCBwYXRoLCB2YWx1ZSwgYWN0dWFsVHlwZSk7XG4gICAgfVxufVxuXG5FZGl0b3Iuc2V0UHJvcGVydHlCeVBhdGggPSBzZXRQcm9wZXJ0eUJ5UGF0aDtcbkVkaXRvci5zZXREZWVwUHJvcGVydHlCeVBhdGggPSBzZXREZWVwUHJvcGVydHlCeVBhdGg7XG5cbm1vZHVsZS5leHBvcnRzID0gc2V0UHJvcGVydHlCeVBhdGg7XG4iLCIoZnVuY3Rpb24gKGV4cG9ydHMpIHtcbiAgICB2YXIgQmFzZTY0S2V5Q2hhcnMgPSBcIkFCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXowMTIzNDU2Nzg5Ky9cIjtcblxuICAgIHZhciBBc2NpaVRvNjQgPSBuZXcgQXJyYXkoMTI4KTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IDEyODsgKytpKSB7IEFzY2lpVG82NFtpXSA9IDA7IH1cbiAgICBmb3IgKGkgPSAwOyBpIDwgNjQ7ICsraSkgeyBBc2NpaVRvNjRbQmFzZTY0S2V5Q2hhcnMuY2hhckNvZGVBdChpKV0gPSBpOyB9XG5cbiAgICB2YXIgUmVnX1JlbW92ZURhc2ggPSAvLS9nO1xuXG4gICAgLy8g5bCGIHV1aWQg55qE5ZCO6Z2iIDI3IOS9jeWOi+e8qeaIkCAxOCDkvY3vvIzliY0gNSDkvY3kv53nlZnkuIvmnaXvvIzmlrnkvr/osIPor5XjgIJcbiAgICAvLyDljovnvKnlkI7nmoQgdXVpZCDlj6/ku6Xlh4/lsI/kv53lrZjml7bnmoTlsLrlr7jvvIzkvYbkuI3og73lgZrkuLrmlofku7blkI3jgIJcbiAgICBleHBvcnRzLmNvbXByZXNzVXVpZCA9IGZ1bmN0aW9uICh1dWlkKSB7XG4gICAgICAgIC8vIGZjOTkxZGQ3LTAwMzMtNGI4MC05ZDQxLWM4YTg2YTcwMmU1OVxuICAgICAgICB2YXIgc3RyaXBlZCA9IHV1aWQucmVwbGFjZShSZWdfUmVtb3ZlRGFzaCwgJycpO1xuICAgICAgICB2YXIgaGVhZCA9IHN0cmlwZWQuc2xpY2UoMCwgNSk7XG4gICAgICAgIC8vIGVuY29kZSBiYXNlNjRcbiAgICAgICAgdmFyIGJhc2U2NENoYXJzID0gW107XG4gICAgICAgIGZvciAodmFyIGkgPSA1OyBpIDwgMzI7IGkgKz0gMykge1xuICAgICAgICAgICAgdmFyIGhleFZhbDEgPSBwYXJzZUludChzdHJpcGVkW2ldLCAxNik7XG4gICAgICAgICAgICB2YXIgaGV4VmFsMiA9IHBhcnNlSW50KHN0cmlwZWRbaSArIDFdLCAxNik7XG4gICAgICAgICAgICB2YXIgaGV4VmFsMyA9IHBhcnNlSW50KHN0cmlwZWRbaSArIDJdLCAxNik7XG4gICAgICAgICAgICBiYXNlNjRDaGFycy5wdXNoKEJhc2U2NEtleUNoYXJzWyhoZXhWYWwxIDw8IDIpIHwgKGhleFZhbDIgPj4gMildKTtcbiAgICAgICAgICAgIGJhc2U2NENoYXJzLnB1c2goQmFzZTY0S2V5Q2hhcnNbKChoZXhWYWwyICYgMykgPDwgNCkgfCBoZXhWYWwzXSk7XG4gICAgICAgIH1cbiAgICAgICAgLy9cbiAgICAgICAgcmV0dXJuIGhlYWQgKyBiYXNlNjRDaGFycy5qb2luKCcnKTtcbiAgICB9O1xuXG4gICAgZXhwb3J0cy5kZWNvbXByZXNzVXVpZCA9IGZ1bmN0aW9uIChzdHIpIHtcbiAgICAgICAgaWYgKHN0ci5sZW5ndGggPT09IDIzKSB7XG4gICAgICAgICAgICAvLyBkZWNvZGUgYmFzZTY0XG4gICAgICAgICAgICB2YXIgaGV4Q2hhcnMgPSBbXTtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSA1OyBpIDwgMjM7IGkgKz0gMikge1xuICAgICAgICAgICAgICAgIHZhciBsaHMgPSBBc2NpaVRvNjRbc3RyLmNoYXJDb2RlQXQoaSldO1xuICAgICAgICAgICAgICAgIHZhciByaHMgPSBBc2NpaVRvNjRbc3RyLmNoYXJDb2RlQXQoaSArIDEpXTtcbiAgICAgICAgICAgICAgICBoZXhDaGFycy5wdXNoKChsaHMgPj4gMikudG9TdHJpbmcoMTYpKTtcbiAgICAgICAgICAgICAgICBoZXhDaGFycy5wdXNoKCgoKGxocyAmIDMpIDw8IDIpIHwgcmhzID4+IDQpLnRvU3RyaW5nKDE2KSk7XG4gICAgICAgICAgICAgICAgaGV4Q2hhcnMucHVzaCgocmhzICYgMHhGKS50b1N0cmluZygxNikpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy9cbiAgICAgICAgICAgIHN0ciA9IHN0ci5zbGljZSgwLCA1KSArIGhleENoYXJzLmpvaW4oJycpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBbc3RyLnNsaWNlKDAsIDgpLCBzdHIuc2xpY2UoOCwgMTIpLCBzdHIuc2xpY2UoMTIsIDE2KSwgc3RyLnNsaWNlKDE2LCAyMCksIHN0ci5zbGljZSgyMCldLmpvaW4oJy0nKTtcbiAgICB9O1xuXG4gICAgdmFyIFJlZ19VdWlkID0gL15bMC05YS1mQS1GXXszMn0kLztcbiAgICB2YXIgUmVnX0NvbXByZXNzZWRVdWlkID0gL15bMC05YS16QS1aKy9dezIzfSQvO1xuXG4gICAgZXhwb3J0cy5pc1V1aWQgPSBmdW5jdGlvbiAoc3RyKSB7XG4gICAgICAgIGlmIChzdHIubGVuZ3RoID09PSAzNikge1xuICAgICAgICAgICAgc3RyID0gc3RyLnJlcGxhY2UoUmVnX1JlbW92ZURhc2gsICcnKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gUmVnX0NvbXByZXNzZWRVdWlkLnRlc3Qoc3RyKSB8fCBSZWdfVXVpZC50ZXN0KHN0cik7XG4gICAgfTtcbn0pKEVkaXRvcik7XG5cbm1vZHVsZS5leHBvcnRzID0gRWRpdG9yO1xuIiwicmVxdWlyZSgnLi9wb2x5ZmlsbCcpO1xuXG52YXIgRmlyZSA9IHJlcXVpcmUoJy4vY29yZScpO1xuXG5pZiAoRklSRV9FRElUT1IpIHtcbiAgICAvLyBUT0RPIC0gZXhjbHVkZSBlZGl0b3IgaW4gYnJvd3NlcmlmeSAoaHR0cHM6Ly9naXRodWIuY29tL3N1YnN0YWNrL25vZGUtYnJvd3NlcmlmeSNiZXhjbHVkZWZpbGUpXG4gICAgdmFyIEVkaXRvciA9IHJlcXVpcmUoJy4vZWRpdG9yJyk7XG5cbiAgICBpZiAoRWRpdG9yLmlzQ29yZUxldmVsKSB7XG4gICAgICAgIEVkaXRvci52ZXJzaW9uc1snZW5naW5lLWZyYW1ld29yayddID0gcmVxdWlyZSgnLi4vcGFja2FnZS5qc29uJykudmVyc2lvbjtcbiAgICB9XG59XG5cbmlmIChGaXJlLmlzV2ViKSB7XG4gICAgLy8gUEFHRSBMRVZFTFxuICAgIEZpcmUuUnVudGltZSA9IHJlcXVpcmUoJy4vcnVudGltZScpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEZpcmU7XG4iLCIvLyBodHRwOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL0Z1bmN0aW9uL2JpbmQuaHRtbFxuaWYgKCFGdW5jdGlvbi5wcm90b3R5cGUuYmluZCkge1xuICAgIEZ1bmN0aW9uLnByb3RvdHlwZS5iaW5kID0gZnVuY3Rpb24gKG9UaGlzKSB7XG4gICAgICAgIC8vcmV0dXJuIGZ1bmN0aW9uICgpIHt9O1xuICAgICAgICBpZiAodHlwZW9mIHRoaXMgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIC8vIGNsb3Nlc3QgdGhpbmcgcG9zc2libGUgdG8gdGhlIEVDTUFTY3JpcHQgNVxuICAgICAgICAgICAgLy8gaW50ZXJuYWwgSXNDYWxsYWJsZSBmdW5jdGlvblxuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignRnVuY3Rpb24ucHJvdG90eXBlLmJpbmQgLSB3aGF0IGlzIHRyeWluZyB0byBiZSBib3VuZCBpcyBub3QgY2FsbGFibGUnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBhQXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSksXG4gICAgICAgICAgICBmVG9CaW5kID0gdGhpcyxcbiAgICAgICAgICAgIGZOT1AgPSBmdW5jdGlvbiAoKSB7fSxcbiAgICAgICAgICAgIGZCb3VuZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZlRvQmluZC5hcHBseSh0aGlzIGluc3RhbmNlb2YgZk5PUCA/IHRoaXMgOiBvVGhpcyxcbiAgICAgICAgICAgICAgICAgICAgYUFyZ3MuY29uY2F0KEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cykpKTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgZk5PUC5wcm90b3R5cGUgPSB0aGlzLnByb3RvdHlwZTtcbiAgICAgICAgZkJvdW5kLnByb3RvdHlwZSA9IG5ldyBmTk9QKCk7XG5cbiAgICAgICAgcmV0dXJuIGZCb3VuZDtcbiAgICB9O1xufVxuIiwicmVxdWlyZSgnLi9iaW5kJyk7XG4iLCJcbi8qKlxuICogQmFzZSBjbGFzcyBmb3IgZXZlcnkgc2NyaXB0cyBtaXhpbiB0byBOb2Rlcy5cbiAqIFRoaXMgY2xhc3Mgd2lsbCBub3QgaW5zdGFudGlhdGUgYWN0dWFsbHksIGl0IGp1c3QgdXNlZCB0byBkZWZpbmUgcHJvcGVydGllcyBhbmQgbWV0aG9kcyB0byBtaXhpbi5cbiAqXG4gKiBOT1RFOiBTaG91bGQgbm90IHVzZSBjb25zdHJ1Y3RvciwgdXNlIGBvbkxvYWRgIGluc3RlYWQgcGxlYXNlLlxuICpcbiAqIEBjbGFzcyBCZWhhdmlvclxuICogQGNvbnN0cnVjdG9yXG4gKi9cbnZhciBCZWhhdmlvciA9IEZpcmUuQ2xhc3Moe1xuICAgIG5hbWU6ICdGaXJlLkJlaGF2aW9yJyxcblxuICAgIC8qKlxuICAgICAqIENhbGxlZCB3aGVuIGF0dGFjaGluZyB0byBhIG5vZGUuXG4gICAgICogQG1ldGhvZCBvbkxvYWRcbiAgICAgKi9cbiAgICBvbkxvYWQ6IG51bGwsXG5cbiAgICAvLy8qKlxuICAgIC8vICogQ2FsbGVkIGJlZm9yZSBhbGwgc2NyaXB0cycgdXBkYXRlLlxuICAgIC8vICogQG1ldGhvZCBzdGFydFxuICAgIC8vICovXG4gICAgLy9zdGFydDogbnVsbCxcblxuICAgIC8qKlxuICAgICAqIFVwZGF0ZSBpcyBjYWxsZWQgZXZlcnkgZnJhbWUuXG4gICAgICogQG1ldGhvZCB1cGRhdGVcbiAgICAgKi9cbiAgICB1cGRhdGU6IG51bGwsXG59KTtcblxuQmVoYXZpb3Iub25BY3RpdmF0ZWQgPSBmdW5jdGlvbiAodGFyZ2V0KSB7XG4gICAgaWYgKHRhcmdldC5vbkxvYWQpIHtcbiAgICAgICAgdGFyZ2V0Lm9uTG9hZCgpO1xuICAgIH1cbiAgICAvL2lmICh0YXJnZXQuX2VuYWJsZWQpIHtcbiAgICAvLyAgICBfY2FsbE9uRW5hYmxlKHRhcmdldCwgYWN0aXZlKTtcbiAgICAvL31cbn07XG5cbi8vIGxpZmUgY3ljbGUgbWV0aG9kc1xuXG52YXIgQ2FsbExjbU9uY2VUbXBsO1xuaWYgKEZJUkVfRURJVE9SKSB7XG4gICAgQ2FsbExjbU9uY2VUbXBsID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoIUZpcmUuZW5naW5lLl9pc1BsYXlpbmcpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuX21peGluQ29udGV4dHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHZhciBjdHggPSB0aGlzLl9taXhpbkNvbnRleHRzW2ldO1xuICAgICAgICAgICAgaWYgKCEoY3R4Ll9vYmpGbGFncyAmIF9GTEFHXykpIHtcbiAgICAgICAgICAgICAgICB2YXIgZnVuYyA9IGN0eC5fRlVOQ187XG4gICAgICAgICAgICAgICAgaWYgKGZ1bmMpIHtcbiAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZ1bmMuY2FsbCh0aGlzKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgRmlyZS5fdGhyb3coZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY3R4Ll9vYmpGbGFncyB8PSBfRkxBR187XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fRlVOQ18gPSBudWxsO1xuICAgIH07XG59XG5lbHNlIHtcbiAgICBDYWxsTGNtT25jZVRtcGwgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5fbWl4aW5Db250ZXh0cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdmFyIGN0eCA9IHRoaXMuX21peGluQ29udGV4dHNbaV07XG4gICAgICAgICAgICBpZiAoIShjdHguX29iakZsYWdzICYgX0ZMQUdfKSkge1xuICAgICAgICAgICAgICAgIHZhciBmdW5jID0gY3R4Ll9GVU5DXztcbiAgICAgICAgICAgICAgICBpZiAoZnVuYykge1xuICAgICAgICAgICAgICAgICAgICBmdW5jLmNhbGwodGhpcyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGN0eC5fb2JqRmxhZ3MgfD0gX0ZMQUdfO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuX0ZVTkNfID0gbnVsbDtcbiAgICB9O1xufVxuXG52YXIgQ2FsbExjbVRtcGw7XG5pZiAoRklSRV9FRElUT1IpIHtcbiAgICBDYWxsTGNtVG1wbCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKCFGaXJlLmVuZ2luZS5faXNQbGF5aW5nKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLl9taXhpbkNvbnRleHRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgY3R4ID0gdGhpcy5fbWl4aW5Db250ZXh0c1tpXTtcbiAgICAgICAgICAgIHZhciBmdW5jID0gY3R4Ll9GVU5DXztcbiAgICAgICAgICAgIGlmIChmdW5jKSB7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgZnVuYy5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgICAgICBGaXJlLl90aHJvdyhlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xufVxuZWxzZSB7XG4gICAgQ2FsbExjbVRtcGwgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5fbWl4aW5Db250ZXh0cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdmFyIGN0eCA9IHRoaXMuX21peGluQ29udGV4dHNbaV07XG4gICAgICAgICAgICB2YXIgZnVuYyA9IGN0eC5fRlVOQ187XG4gICAgICAgICAgICBpZiAoZnVuYykge1xuICAgICAgICAgICAgICAgIGZ1bmMuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG59XG5cbi8vIGRlZmluZSBMQyBtZXRob2RzXG52YXIgTENNZXRob2RzID0ge1xuICAgIG9uTG9hZDoge1xuICAgICAgICB0bXBsOiBDYWxsTGNtT25jZVRtcGwsXG4gICAgICAgIGZsYWc6IEZpcmUuX09iamVjdEZsYWdzLklzT25Mb2FkQ2FsbGVkXG4gICAgfSxcbiAgICAvL3N0YXJ0OiB7XG4gICAgLy8gICAgdG1wbDogQ2FsbExjbU9uY2VUbXBsLFxuICAgIC8vICAgIGZsYWc6IEZpcmUuX09iamVjdEZsYWdzLklzT25TdGFydENhbGxlZFxuICAgIC8vfSxcbiAgICBvbkVudGVyOiB7XG4gICAgICAgIHRtcGw6IENhbGxMY21UbXBsLFxuICAgIH0sXG4gICAgb25FeGl0OiB7XG4gICAgICAgIHRtcGw6IENhbGxMY21UbXBsLFxuICAgIH0sXG4gICAgdXBkYXRlOiB7XG4gICAgICAgIHRtcGw6IENhbGxMY21UbXBsLFxuICAgIH1cbn07XG52YXIgTENNZXRob2ROYW1lcyA9IE9iamVjdC5rZXlzKExDTWV0aG9kcyk7XG5cbi8vIGdlbmVyYXRlIExDIGludm9rZXJzXG52YXIgTENJbnZva2VycyA9IHt9O1xuZm9yICh2YXIgaiA9IDA7IGogPCBMQ01ldGhvZE5hbWVzLmxlbmd0aDsgaisrKSB7XG4gICAgdmFyIG5hbWUgPSBMQ01ldGhvZE5hbWVzW2pdO1xuICAgIHZhciBpbmZvID0gTENNZXRob2RzW25hbWVdO1xuICAgIHZhciB0bXBsID0gJygnICsgaW5mby50bXBsICsgJyknO1xuICAgIHRtcGwgPSB0bXBsLnJlcGxhY2UoL19GVU5DXy9nLCBuYW1lKTtcbiAgICBpZiAoaW5mby5mbGFnKSB7XG4gICAgICAgIHRtcGwgPSB0bXBsLnJlcGxhY2UoL19GTEFHXy9nLCBpbmZvLmZsYWcpO1xuICAgIH1cbiAgICBMQ0ludm9rZXJzW25hbWVdID0gZXZhbCh0bXBsKTtcbn1cblxuLy8gZXhwb3J0c1xuRmlyZS5CZWhhdmlvciA9IEJlaGF2aW9yO1xuQmVoYXZpb3IuTENNZXRob2ROYW1lcyA9IExDTWV0aG9kTmFtZXM7XG5CZWhhdmlvci5sY21JbnZva2VycyA9IExDSW52b2tlcnM7XG5tb2R1bGUuZXhwb3J0cyA9IEJlaGF2aW9yO1xuIiwidmFyIEpTID0gRmlyZS5KUztcbnZhciBTY2VuZVdyYXBwZXIgPSByZXF1aXJlKCcuLi93cmFwcGVycy9zY2VuZScpO1xuXG4vKipcbiAqIEBtb2R1bGUgRmlyZS5SdW50aW1lXG4gKi9cblxuLyoqXG4gKiBAY2xhc3MgRW5naW5lV3JhcHBlclxuICovXG5cbnZhciBFbmdpbmVXcmFwcGVyID0gcmVxdWlyZSgnLi4vd3JhcHBlcnMvZW5naW5lJyk7XG52YXIgZW5naW5lUHJvdG8gPSBFbmdpbmVXcmFwcGVyLnByb3RvdHlwZTtcblxuaWYgKEZJUkVfRURJVE9SKSB7XG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgd3JhcHBlciBieSB3cmFwcGVyIGlkLlxuICAgICAqIEBtZXRob2QgZ2V0SW5zdGFuY2VCeUlkXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHV1aWRcbiAgICAgKiBAcmV0dXJuIHtGaXJlLlJ1bnRpbWUuTm9kZVdyYXBwZXJ9XG4gICAgICovXG4gICAgZW5naW5lUHJvdG8uZ2V0SW5zdGFuY2VCeUlkID0gZnVuY3Rpb24gKHV1aWQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYXR0YWNoZWRXcmFwcGVyc0ZvckVkaXRvclt1dWlkXSB8fCBudWxsO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBub2RlIGJ5IHdyYXBwZXIgaWQuXG4gICAgICogQG1ldGhvZCBnZXRJbnN0YW5jZUJ5SWROXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHV1aWRcbiAgICAgKiBAcmV0dXJuIHtSdW50aW1lTm9kZX1cbiAgICAgKi9cbiAgICBlbmdpbmVQcm90by5nZXRJbnN0YW5jZUJ5SWROID0gZnVuY3Rpb24gKHV1aWQpIHtcbiAgICAgICAgdmFyIHdyYXBwZXIgPSB0aGlzLmF0dGFjaGVkV3JhcHBlcnNGb3JFZGl0b3JbdXVpZF07XG4gICAgICAgIHJldHVybiAod3JhcHBlciAmJiB3cmFwcGVyLnRhcmdldE4pIHx8IG51bGw7XG4gICAgfTtcbn1cblxuSlMubWl4aW4oZW5naW5lUHJvdG8sIHtcblxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgd3JhcHBlciBvZiBjdXJyZW50IHJ1bm5pbmcgc2NlbmUuXG4gICAgICogQG1ldGhvZCBnZXRDdXJyZW50U2NlbmVcbiAgICAgKiBAcmV0dXJuIHtTY2VuZVdyYXBwZXJ9XG4gICAgICovXG4gICAgZ2V0Q3VycmVudFNjZW5lOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBGaXJlKHRoaXMuZ2V0Q3VycmVudFNjZW5lTigpKTtcbiAgICB9LFxuXG4gICAgX2luaXRTY2VuZTogZnVuY3Rpb24gKHNjZW5lV3JhcHBlciwgY2FsbGJhY2spIHtcbiAgICAgICAgaWYgKHNjZW5lV3JhcHBlci5fbmVlZENyZWF0ZSkge1xuICAgICAgICAgICAgc2NlbmVXcmFwcGVyLmNyZWF0ZShjYWxsYmFjayk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIExhdW5jaCBsb2FkZWQgc2NlbmUuXG4gICAgICogQG1ldGhvZCBfbGF1bmNoU2NlbmVcbiAgICAgKiBAcGFyYW0ge1NjZW5lV3JhcHBlcn0gc2NlbmVcbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBbb25CZWZvcmVMb2FkU2NlbmVdXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBfbGF1bmNoU2NlbmU6IGZ1bmN0aW9uIChzY2VuZSwgb25CZWZvcmVMb2FkU2NlbmUpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgICAgIGlmICghc2NlbmUpIHtcbiAgICAgICAgICAgIEZpcmUuZXJyb3IoJ0FyZ3VtZW50IG11c3QgYmUgbm9uLW5pbCcpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHNjZW5lLl9uZWVkQ3JlYXRlICYmIEZJUkVfRURJVE9SKSB7XG4gICAgICAgICAgICBGaXJlLmVycm9yKCdUaGUgc2NlbmUgd3JhcHBlciAlcyBpcyBub3QgeWV0IGZ1bGx5IGNyZWF0ZWQnLCBzY2VuZS5uYW1lKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vRW5naW5lLl9kb250RGVzdHJveUVudGl0aWVzLmxlbmd0aCA9IDA7XG5cbiAgICAgICAgLy8vLyB1bmxvYWQgc2NlbmVcbiAgICAgICAgLy92YXIgb2xkU2NlbmUgPSBFbmdpbmUuX3NjZW5lO1xuICAgICAgICAvL1xuICAgICAgICAvLy8vZWRpdG9yQ2FsbGJhY2sub25TdGFydFVubG9hZFNjZW5lKG9sZFNjZW5lKTtcbiAgICAgICAgLy9cbiAgICAgICAgLy9pZiAoRmlyZS5pc1ZhbGlkKG9sZFNjZW5lKSkge1xuICAgICAgICAvLyAgICAvLyBkZXN0cm95ZWQgYW5kIHVubG9hZFxuICAgICAgICAvLyAgICBBc3NldExpYnJhcnkudW5sb2FkQXNzZXQob2xkU2NlbmUsIHRydWUpO1xuICAgICAgICAvL31cbiAgICAgICAgLy9cbiAgICAgICAgLy8vLyBwdXJnZSBkZXN0cm95ZWQgZW50aXRpZXMgYmVsb25ncyB0byBvbGQgc2NlbmVcbiAgICAgICAgLy9GT2JqZWN0Ll9kZWZlcnJlZERlc3Ryb3koKTtcbiAgICAgICAgLy9cbiAgICAgICAgLy9FbmdpbmUuX3NjZW5lID0gbnVsbDtcblxuICAgICAgICAvLyBkZXN0cm95IGxhc3Qgc2NlbmVcbiAgICAgICAgc2VsZi5fc2V0Q3VycmVudFNjZW5lTih0aGlzLl9lbXB0eVNjZW5lTik7XG5cbiAgICAgICAgaWYgKG9uQmVmb3JlTG9hZFNjZW5lKSB7XG4gICAgICAgICAgICBvbkJlZm9yZUxvYWRTY2VuZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgc2VsZi5lbWl0KCdwcmUtbGF1bmNoLXNjZW5lJyk7XG5cbiAgICAgICAgLy8vLyBpbml0IHNjZW5lXG4gICAgICAgIC8vRW5naW5lLl9yZW5kZXJDb250ZXh0Lm9uU2NlbmVMb2FkZWQoc2NlbmUpO1xuXG4gICAgICAgIC8vLy9pZiAoZWRpdG9yQ2FsbGJhY2sub25TY2VuZUxvYWRlZCkge1xuICAgICAgICAvLy8vICAgIGVkaXRvckNhbGxiYWNrLm9uU2NlbmVMb2FkZWQoc2NlbmUpO1xuICAgICAgICAvLy8vfVxuXG4gICAgICAgIC8vLy8gbGF1bmNoIHNjZW5lXG4gICAgICAgIC8vc2NlbmUuZW50aXRpZXMgPSBzY2VuZS5lbnRpdGllcy5jb25jYXQoRW5naW5lLl9kb250RGVzdHJveUVudGl0aWVzKTtcbiAgICAgICAgLy9FbmdpbmUuX2RvbnREZXN0cm95RW50aXRpZXMubGVuZ3RoID0gMDtcbiAgICAgICAgc2VsZi5fc2V0Q3VycmVudFNjZW5lTihzY2VuZS50YXJnZXROKTtcbiAgICAgICAgLy9FbmdpbmUuX3JlbmRlckNvbnRleHQub25TY2VuZUxhdW5jaGVkKHNjZW5lKTtcblxuICAgICAgICAvL2VkaXRvckNhbGxiYWNrLm9uQmVmb3JlQWN0aXZhdGVTY2VuZShzY2VuZSk7XG5cbiAgICAgICAgc2NlbmUuX29uQWN0aXZhdGVkKCk7XG5cbiAgICAgICAgLy9lZGl0b3JDYWxsYmFjay5vblNjZW5lTGF1bmNoZWQoc2NlbmUpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBMb2FkcyB0aGUgc2NlbmUgYnkgaXRzIG5hbWUuXG4gICAgICogQG1ldGhvZCBsb2FkU2NlbmVcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc2NlbmVOYW1lIC0gdGhlIG5hbWUgb2YgdGhlIHNjZW5lIHRvIGxvYWRcbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBbb25MYXVuY2hlZF0gLSBjYWxsYmFjaywgd2lsbCBiZSBjYWxsZWQgYWZ0ZXIgc2NlbmUgbGF1bmNoZWRcbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBbb25VbmxvYWRlZF0gLSBjYWxsYmFjaywgd2lsbCBiZSBjYWxsZWQgd2hlbiB0aGUgcHJldmlvdXMgc2NlbmUgd2FzIHVubG9hZGVkXG4gICAgICogQHJldHVybiB7Ym9vbGVhbn0gaWYgZXJyb3IsIHJldHVybiBmYWxzZVxuICAgICAqL1xuICAgIGxvYWRTY2VuZTogZnVuY3Rpb24gKHNjZW5lTmFtZSwgb25MYXVuY2hlZCwgb25VbmxvYWRlZCkge1xuICAgICAgICBpZiAodGhpcy5fbG9hZGluZ1NjZW5lKSB7XG4gICAgICAgICAgICBGaXJlLmVycm9yKCdbbG9hZFNjZW5lXSBGYWlsZWQgdG8gbG9hZCBzY2VuZSBcIiVzXCIgYmVjYXVzZSBcIiVzXCIgaXMgYWxyZWFkeSBsb2FkaW5nJywgc2NlbmVOYW1lLCB0aGlzLl9sb2FkaW5nU2NlbmUpO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHZhciB1dWlkLCBpbmZvO1xuICAgICAgICBpZiAodHlwZW9mIHNjZW5lTmFtZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIGlmICghc2NlbmVOYW1lLmVuZHNXaXRoKCcuZmlyZScpKSB7XG4gICAgICAgICAgICAgICAgc2NlbmVOYW1lICs9ICcuZmlyZSc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBzZWFyY2ggc2NlbmVcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5fc2NlbmVJbmZvcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGluZm8gPSB0aGlzLl9zY2VuZUluZm9zW2ldO1xuICAgICAgICAgICAgICAgIHZhciB1cmwgPSBpbmZvLnVybDtcbiAgICAgICAgICAgICAgICBpZiAodXJsLmVuZHNXaXRoKHNjZW5lTmFtZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgdXVpZCA9IGluZm8udXVpZDtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgaW5mbyA9IHRoaXMuX3NjZW5lSW5mb3Nbc2NlbmVOYW1lXTtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgaW5mbyA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgICAgICB1dWlkID0gaW5mby51dWlkO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgRmlyZS5lcnJvcignW2xvYWRTY2VuZV0gVGhlIHNjZW5lIGluZGV4IHRvIGxvYWQgKCVzKSBpcyBvdXQgb2YgcmFuZ2UuJywgc2NlbmVOYW1lKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHV1aWQpIHtcbiAgICAgICAgICAgIHRoaXMuX2xvYWRpbmdTY2VuZSA9IHNjZW5lTmFtZTtcbiAgICAgICAgICAgIHRoaXMuX2xvYWRTY2VuZUJ5VXVpZCh1dWlkLCBvbkxhdW5jaGVkLCBvblVubG9hZGVkKTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgRmlyZS5lcnJvcignW2xvYWRTY2VuZV0gQ2FuIG5vdCBsb2FkIHRoZSBzY2VuZSBcIiVzXCIgYmVjYXVzZSBpdCBoYXMgbm90IGJlZW4gYWRkZWQgdG8gdGhlIGJ1aWxkIHNldHRpbmdzIGJlZm9yZSBwbGF5LicsIHNjZW5lTmFtZSk7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogTG9hZHMgdGhlIHNjZW5lIGJ5IGl0cyB1dWlkLlxuICAgICAqIEBtZXRob2QgX2xvYWRTY2VuZUJ5VXVpZFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB1dWlkIC0gdGhlIHV1aWQgb2YgdGhlIHNjZW5lIGFzc2V0IHRvIGxvYWRcbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBbb25MYXVuY2hlZF1cbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBbb25VbmxvYWRlZF1cbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIF9sb2FkU2NlbmVCeVV1aWQ6IGZ1bmN0aW9uICh1dWlkLCBvbkxhdW5jaGVkLCBvblVubG9hZGVkKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgLy9GaXJlLkFzc2V0TGlicmFyeS51bmxvYWRBc3NldCh1dWlkKTsgICAgIC8vIGZvcmNlIHJlbG9hZFxuICAgICAgICBGaXJlLkFzc2V0TGlicmFyeS5sb2FkQXNzZXQodXVpZCwgZnVuY3Rpb24gKGVycm9yLCBzY2VuZSkge1xuICAgICAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgZXJyb3IgPSAnRmFpbGVkIHRvIGxvYWQgc2NlbmU6ICcgKyBlcnJvcjtcbiAgICAgICAgICAgICAgICBpZiAoRklSRV9FRElUT1IpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5hc3NlcnQoZmFsc2UsIGVycm9yKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB2YXIgdXVpZCA9IHNjZW5lLl91dWlkO1xuICAgICAgICAgICAgICAgIHNjZW5lID0gc2NlbmUuc2NlbmU7ICAgIC8vIEN1cnJlbnRseSBvdXIgc2NlbmUgbm90IGluaGVyaXRlZCBmcm9tIEFzc2V0LCBzbyBuZWVkIHRvIGV4dHJhY3Qgc2NlbmUgZnJvbSBkdW1teSBhc3NldFxuICAgICAgICAgICAgICAgIGlmIChzY2VuZSBpbnN0YW5jZW9mIFNjZW5lV3JhcHBlcikge1xuICAgICAgICAgICAgICAgICAgICBzY2VuZS51dWlkID0gdXVpZDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGVycm9yID0gJ1RoZSBhc3NldCAnICsgdXVpZCArICcgaXMgbm90IGEgc2NlbmUnO1xuICAgICAgICAgICAgICAgICAgICBzY2VuZSA9IG51bGw7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHNjZW5lKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5faW5pdFNjZW5lKHNjZW5lLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuX2xhdW5jaFNjZW5lKHNjZW5lLCBvblVubG9hZGVkKTtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5fbG9hZGluZ1NjZW5lID0gJyc7XG4gICAgICAgICAgICAgICAgICAgIGlmIChvbkxhdW5jaGVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBvbkxhdW5jaGVkKGVycm9yLCBzY2VuZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIEZpcmUuZXJyb3IoZXJyb3IpO1xuICAgICAgICAgICAgICAgIHNlbGYuX2xvYWRpbmdTY2VuZSA9ICcnO1xuICAgICAgICAgICAgICAgIGlmIChvbkxhdW5jaGVkKSB7XG4gICAgICAgICAgICAgICAgICAgIG9uTGF1bmNoZWQoZXJyb3IsIHNjZW5lKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH0sXG5cbiAgICAvL2xhdW5jaE5ld1NjZW5lOiBmdW5jdGlvbiAoKSB7XG4gICAgLy8gICAgdmFyIFNjZW5lV3JhcHBlckltcGwgPSBGaXJlLmVuZ2luZS5nZXRDdXJyZW50U2NlbmUoKS5jb25zdHJ1Y3RvcjtcbiAgICAvLyAgICB2YXIgc2NlbmVXcmFwcGVyID0gbmV3IFNjZW5lV3JhcHBlckltcGwoKTtcbiAgICAvLyAgICBzY2VuZVdyYXBwZXIub25BZnRlckRlc2VyaWFsaXplKCk7XG4gICAgLy8gICAgRmlyZS5lbmdpbmUuX2xhdW5jaFNjZW5lKHNjZW5lV3JhcHBlcik7XG4gICAgLy99XG59KTtcbiIsInZhciBKUyA9IEZpcmUuSlM7XG52YXIgQmVoYXZpb3IgPSBGaXJlLkJlaGF2aW9yO1xuXG4vKipcbiAqIEBtb2R1bGUgRmlyZS5SdW50aW1lXG4gKi9cblxuLyoqXG4gKiBAY2xhc3MgTm9kZVdyYXBwZXJcbiAqL1xudmFyIE5vZGVXcmFwcGVyID0gcmVxdWlyZSgnLi4vd3JhcHBlcnMvbm9kZScpO1xuXG52YXIgbm9kZVByb3RvID0gTm9kZVdyYXBwZXIucHJvdG90eXBlO1xuXG4vKipcbiAqIFRoZSBwYXJlbnQgb2YgdGhlIHdyYXBwZXIuXG4gKiBJZiB0aGlzIGlzIHRoZSB0b3AgbW9zdCBub2RlIGluIGhpZXJhcmNoeSwgaXRzIHBhcmVudCBtdXN0IGJlIHR5cGUgU2NlbmVXcmFwcGVyLlxuICogQ2hhbmdpbmcgdGhlIHBhcmVudCB3aWxsIGtlZXAgdGhlIHRyYW5zZm9ybSdzIGxvY2FsIHNwYWNlIHBvc2l0aW9uLCByb3RhdGlvbiBhbmQgc2NhbGUgdGhlIHNhbWUgYnV0IG1vZGlmeVxuICogdGhlIHdvcmxkIHNwYWNlIHBvc2l0aW9uLCBzY2FsZSBhbmQgcm90YXRpb24uXG4gKiBAcHJvcGVydHkgcGFyZW50XG4gKiBAdHlwZSB7Tm9kZVdyYXBwZXJ9XG4gKi9cbkpTLmdldHNldChub2RlUHJvdG8sICdwYXJlbnQnLFxuICAgIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHBhcmVudCA9IHRoaXMucGFyZW50TjtcbiAgICAgICAgcmV0dXJuIHBhcmVudCAmJiBGaXJlKHBhcmVudCk7XG4gICAgfSxcbiAgICBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgaWYgKEZJUkVfRURJVE9SICYmIHZhbHVlKSB7XG4gICAgICAgICAgICBpZiAoISh2YWx1ZSBpbnN0YW5jZW9mIE5vZGVXcmFwcGVyKSkge1xuICAgICAgICAgICAgICAgIEZpcmUuZXJyb3IoJ1RoZSBuZXcgcGFyZW50IG11c3QgYmUgdHlwZSBOb2RlV3JhcHBlcicpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh2YWx1ZS5jb25zdHJ1Y3Rvci5jYW5IYXZlQ2hpbGRyZW5JbkVkaXRvcikge1xuICAgICAgICAgICAgICAgIHRoaXMucGFyZW50TiA9IHZhbHVlICYmIHZhbHVlLnRhcmdldE47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBGaXJlLndhcm4oJ0NhbiBub3QgYWRkIFwiJXNcIiB0byBcIiVzXCIgd2hpY2ggdHlwZSBpcyBcIiVzXCIuJywgdGhpcy5uYW1lLCB2YWx1ZS5uYW1lLCBKUy5nZXRDbGFzc05hbWUodmFsdWUpKTtcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMucGFyZW50Tikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBhcmVudE4gPSBGaXJlLmVuZ2luZS5nZXRDdXJyZW50U2NlbmVOKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5wYXJlbnROID0gdmFsdWUgJiYgdmFsdWUudGFyZ2V0TjtcbiAgICAgICAgfVxuICAgIH1cbik7XG5cbi8qKlxuICogUmV0dXJucyBhIG5ldyBhcnJheSB3aGljaCBjb250YWlucyB3cmFwcGVycyBvZiBjaGlsZCBub2Rlcy5cbiAqIEBwcm9wZXJ0eSBjaGlsZHJlblxuICogQHR5cGUge05vZGVXcmFwcGVyW119XG4gKi9cbkpTLmdldChub2RlUHJvdG8sICdjaGlsZHJlbicsXG4gICAgZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoIUZJUkVfRURJVE9SIHx8IHRoaXMuY29uc3RydWN0b3IuY2FuSGF2ZUNoaWxkcmVuSW5FZGl0b3IpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNoaWxkcmVuTi5tYXAoRmlyZSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gW107XG4gICAgICAgIH1cbiAgICB9XG4pO1xuXG4vKipcbiAqIFRoZSBwb3NpdGlvbiByZWxhdGl2ZSB0byB0aGUgc2NlbmUuXG4gKiBAcHJvcGVydHkgc2NlbmVQb3NpdGlvblxuICogQHR5cGUge0ZpcmUuVmVjMn1cbiAqIEBwcml2YXRlXG4gKi9cbkpTLmdldHNldChub2RlUHJvdG8sICdzY2VuZVBvc2l0aW9uJyxcbiAgICBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBzY2VuZSA9IEZpcmUuZW5naW5lICYmIEZpcmUuZW5naW5lLmdldEN1cnJlbnRTY2VuZSgpO1xuICAgICAgICBpZiAoIXNjZW5lKSB7XG4gICAgICAgICAgICBGaXJlLmVycm9yKCdDYW4gbm90IGFjY2VzcyBzY2VuZVBvc2l0aW9uIGlmIG5vIHJ1bm5pbmcgc2NlbmUnKTtcbiAgICAgICAgICAgIHJldHVybiBGaXJlLlZlYzIuemVybztcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBzY2VuZS50cmFuc2Zvcm1Qb2ludFRvTG9jYWwoIHRoaXMud29ybGRQb3NpdGlvbiApO1xuICAgIH0sXG4gICAgZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIHZhciBzY2VuZSA9IEZpcmUuZW5naW5lICYmIEZpcmUuZW5naW5lLmdldEN1cnJlbnRTY2VuZSgpO1xuICAgICAgICBpZiAoIXNjZW5lKSB7XG4gICAgICAgICAgICBGaXJlLmVycm9yKCdDYW4gbm90IGFjY2VzcyBzY2VuZVBvc2l0aW9uIGlmIG5vIHJ1bm5pbmcgc2NlbmUnKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMud29ybGRQb3NpdGlvbiA9IHNjZW5lLnRyYW5zZm9ybVBvaW50VG9Xb3JsZCh2YWx1ZSk7XG4gICAgfVxuKTtcblxuLyoqXG4gKiBUaGUgcm90YXRpb24gcmVsYXRpdmUgdG8gdGhlIHNjZW5lLlxuICogQHByb3BlcnR5IHNjZW5lUm90YXRpb25cbiAqIEB0eXBlIHtOdW1iZXJ9XG4gKiBAcHJpdmF0ZVxuICovXG5KUy5nZXRzZXQobm9kZVByb3RvLCAnc2NlbmVSb3RhdGlvbicsXG4gICAgZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgc2NlbmUgPSBGaXJlLmVuZ2luZSAmJiBGaXJlLmVuZ2luZS5nZXRDdXJyZW50U2NlbmUoKTtcbiAgICAgICAgaWYgKCFzY2VuZSkge1xuICAgICAgICAgICAgRmlyZS5lcnJvcignQ2FuIG5vdCBhY2Nlc3Mgc2NlbmVSb3RhdGlvbiBpZiBubyBydW5uaW5nIHNjZW5lJyk7XG4gICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLndvcmxkUm90YXRpb24gLSBzY2VuZS5yb3RhdGlvbjtcbiAgICB9LFxuICAgIGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICB2YXIgc2NlbmUgPSBGaXJlLmVuZ2luZSAmJiBGaXJlLmVuZ2luZS5nZXRDdXJyZW50U2NlbmUoKTtcbiAgICAgICAgaWYgKCFzY2VuZSkge1xuICAgICAgICAgICAgRmlyZS5lcnJvcignQ2FuIG5vdCBhY2Nlc3Mgc2NlbmVSb3RhdGlvbiBpZiBubyBydW5uaW5nIHNjZW5lJyk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLndvcmxkUm90YXRpb24gPSBzY2VuZS5yb3RhdGlvbiArIHZhbHVlO1xuICAgIH1cbik7XG5cbi8qKlxuICogVGhlIGxvc3N5IHNjYWxlIHJlbGF0aXZlIHRvIHRoZSBzY2VuZS4gKFJlYWQgT25seSlcbiAqIEBwcm9wZXJ0eSBzY2VuZVNjYWxlXG4gKiBAdHlwZSB7RmlyZS5WZWMyfVxuICogQHJlYWRPbmx5XG4gKiBAcHJpdmF0ZVxuICovXG5KUy5nZXRzZXQobm9kZVByb3RvLCAnc2NlbmVTY2FsZScsXG4gICAgZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgc2NlbmUgPSBGaXJlLmVuZ2luZSAmJiBGaXJlLmVuZ2luZS5nZXRDdXJyZW50U2NlbmUoKTtcbiAgICAgICAgaWYgKCFzY2VuZSkge1xuICAgICAgICAgICAgRmlyZS5lcnJvcignQ2FuIG5vdCBhY2Nlc3Mgc2NlbmVTY2FsZSBpZiBubyBydW5uaW5nIHNjZW5lJyk7XG4gICAgICAgICAgICByZXR1cm4gRmlyZS5WZWMyLm9uZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLndvcmxkU2NhbGUuZGl2KHNjZW5lLnNjYWxlKTtcbiAgICB9XG4pO1xuXG5KUy5taXhpbihub2RlUHJvdG8sIHtcbiAgICAvKipcbiAgICAgKiBJcyB0aGlzIG5vZGUgYW4gaW5zdGFuY2Ugb2YgU2NlbmU/XG4gICAgICpcbiAgICAgKiBAcHJvcGVydHkgaXNTY2VuZVxuICAgICAqL1xuICAgIGlzU2NlbmU6IGZhbHNlLFxuXG4gICAgLyoqXG4gICAgICogSXMgdGhpcyB3cmFwcGVyIGEgY2hpbGQgb2YgdGhlIHBhcmVudFdyYXBwZXI/XG4gICAgICpcbiAgICAgKiBAbWV0aG9kIGlzQ2hpbGRPZlxuICAgICAqIEBwYXJhbSB7Tm9kZVdyYXBwZXJ9IHBhcmVudFdyYXBwZXJcbiAgICAgKiBAcmV0dXJuIHtib29sZWFufSAtIFJldHVybnMgdHJ1ZSBpZiB0aGlzIHdyYXBwZXIgaXMgYSBjaGlsZCwgZGVlcCBjaGlsZCBvciBpZGVudGljYWwgdG8gdGhlIGdpdmVuIHdyYXBwZXIuXG4gICAgICovXG4gICAgaXNDaGlsZE9mOiBmdW5jdGlvbiAocGFyZW50V3JhcHBlcikge1xuICAgICAgICB2YXIgY2hpbGQgPSB0aGlzO1xuICAgICAgICBkbyB7XG4gICAgICAgICAgICBpZiAoY2hpbGQgPT09IHBhcmVudFdyYXBwZXIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNoaWxkID0gY2hpbGQucGFyZW50O1xuICAgICAgICB9XG4gICAgICAgIHdoaWxlIChjaGlsZCk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogTW92ZSB0aGUgbm9kZSB0byB0aGUgdG9wLlxuICAgICAqXG4gICAgICogQG1ldGhvZCBzZXRBc0ZpcnN0U2libGluZ1xuICAgICAqL1xuICAgIHNldEFzRmlyc3RTaWJsaW5nOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuc2V0U2libGluZ0luZGV4KDApO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBNb3ZlIHRoZSBub2RlIHRvIHRoZSBib3R0b20uXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIHNldEFzTGFzdFNpYmxpbmdcbiAgICAgKi9cbiAgICBzZXRBc0xhc3RTaWJsaW5nOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuc2V0U2libGluZ0luZGV4KC0xKTtcbiAgICB9LFxuXG4gICAgX29uQWN0aXZhdGVkOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICghRklSRV9FRElUT1IgfHwgRmlyZS5lbmdpbmUuX2lzUGxheWluZykge1xuICAgICAgICAgICAgdGhpcy5fb25BY3RpdmF0ZWRJbkdhbWVNb2RlKCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9vbkFjdGl2YXRlZEluRWRpdE1vZGUoKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBfb25BY3RpdmF0ZWRJbkdhbWVNb2RlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIC8vIGludm9rZSBtaXhpblxuICAgICAgICBCZWhhdmlvci5vbkFjdGl2YXRlZCh0aGlzLnRhcmdldE4pO1xuXG4gICAgICAgIC8vIGludm9rZSBjaGlsZHJlbiByZWN1cnNpdmVseVxuICAgICAgICB2YXIgY2hpbGRyZW4gPSB0aGlzLmNoaWxkcmVuTjtcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IGNoaWxkcmVuLmxlbmd0aDsgaSA8IGxlbjsgKytpKSB7XG4gICAgICAgICAgICB2YXIgbm9kZSA9IGNoaWxkcmVuW2ldO1xuICAgICAgICAgICAgRmlyZShub2RlKS5fb25BY3RpdmF0ZWRJbkdhbWVNb2RlKCk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgX29uQWN0aXZhdGVkSW5FZGl0TW9kZTogZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoRklSRV9FRElUT1IpIHtcbiAgICAgICAgICAgIC8vIGludm9rZSB3cmFwcGVyXG4gICAgICAgICAgICB2YXIgZm9jdXNlZCA9ICFGSVJFX1RFU1QgJiYgRWRpdG9yLlNlbGVjdGlvbi5jdXJBY3RpdmF0ZSgnbm9kZScpID09PSB0aGlzLnV1aWQ7XG4gICAgICAgICAgICBpZiAoZm9jdXNlZCkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLm9uRm9jdXNJbkVkaXRvcikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm9uRm9jdXNJbkVkaXRvcigpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMub25Mb3N0Rm9jdXNJbkVkaXRvcikge1xuICAgICAgICAgICAgICAgIHRoaXMub25Mb3N0Rm9jdXNJbkVkaXRvcigpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBpbnZva2UgY2hpbGRyZW4gcmVjdXJzaXZlbHlcbiAgICAgICAgICAgIHZhciBjaGlsZHJlbiA9IHRoaXMuY2hpbGRyZW5OO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IGNoaWxkcmVuLmxlbmd0aDsgaSA8IGxlbjsgKytpKSB7XG4gICAgICAgICAgICAgICAgdmFyIG5vZGUgPSBjaGlsZHJlbltpXTtcbiAgICAgICAgICAgICAgICBGaXJlKG5vZGUpLl9vbkFjdGl2YXRlZEluRWRpdE1vZGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG59KTtcbiIsInZhciBKUyA9IEZpcmUuSlM7XG52YXIgbWl4aW4gPSByZXF1aXJlKCcuLi9taXhpbicpLm1peGluO1xuXG4vKipcbiAqIEBtb2R1bGUgRmlyZS5SdW50aW1lXG4gKi9cblxuLyoqXG4gKiBAY2xhc3MgU2NlbmVXcmFwcGVyXG4gKi9cbnZhciBTY2VuZVdyYXBwZXIgPSByZXF1aXJlKCcuLi93cmFwcGVycy9zY2VuZScpO1xuXG52YXIgc2NlbmVQcm90byA9IFNjZW5lV3JhcHBlci5wcm90b3R5cGU7XG5cbkpTLm1peGluKHNjZW5lUHJvdG8sIHtcbiAgICBpc1NjZW5lOiB0cnVlLFxuXG4gICAgX2luaXROb2RlczogZnVuY3Rpb24gKGRhdGFzLCBwYXJlbnRXcmFwcGVyKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSBkYXRhcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgICAgdmFyIGNoaWxkID0gZGF0YXNbaV07XG4gICAgICAgICAgICB2YXIgd3JhcHBlciA9IGNoaWxkLnc7XG4gICAgICAgICAgICB3cmFwcGVyLm9uQWZ0ZXJEZXNlcmlhbGl6ZSgpO1xuICAgICAgICAgICAgd3JhcHBlci5wYXJlbnROID0gcGFyZW50V3JhcHBlci50YXJnZXROO1xuICAgICAgICAgICAgdmFyIGNsYXNzSWRUb01peGluID0gY2hpbGQubTtcbiAgICAgICAgICAgIGlmIChjbGFzc0lkVG9NaXhpbikge1xuICAgICAgICAgICAgICAgIHZhciBDbGFzc1RvTWl4aW47XG4gICAgICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoY2xhc3NJZFRvTWl4aW4pKSB7XG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgY2xhc3NJZFRvTWl4aW4ubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIENsYXNzVG9NaXhpbiA9IEpTLl9nZXRDbGFzc0J5SWQoY2xhc3NJZFRvTWl4aW5bal0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKENsYXNzVG9NaXhpbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1peGluKHdyYXBwZXIudGFyZ2V0TiwgQ2xhc3NUb01peGluKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBGaXJlLmRlc2VyaWFsaXplLmFwcGx5TWl4aW5Qcm9wcyhjaGlsZC50LCBDbGFzc1RvTWl4aW4sIHdyYXBwZXIudGFyZ2V0Tik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBGaXJlLmVycm9yKCdGYWlsZWQgdG8gZmluZCBjbGFzcyAlcyB0byBtaXhpbicsIGNsYXNzSWRUb01peGluW2pdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgQ2xhc3NUb01peGluID0gSlMuX2dldENsYXNzQnlJZChjbGFzc0lkVG9NaXhpbik7XG4gICAgICAgICAgICAgICAgICAgIGlmIChDbGFzc1RvTWl4aW4pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1peGluKHdyYXBwZXIudGFyZ2V0TiwgQ2xhc3NUb01peGluKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIEZpcmUuZGVzZXJpYWxpemUuYXBwbHlNaXhpblByb3BzKGNoaWxkLnQsIENsYXNzVG9NaXhpbiwgd3JhcHBlci50YXJnZXROKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChFZGl0b3IuaXNVdWlkKGNsYXNzSWRUb01peGluKSAmJiBGSVJFX0VESVRPUikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzSWRUb01peGluID0gRWRpdG9yLmRlY29tcHJlc3NVdWlkKGNsYXNzSWRUb01peGluKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIEZpcmUuZXJyb3IoJ0ZhaWxlZCB0byBmaW5kIGNsYXNzICVzIHRvIG1peGluJywgY2xhc3NJZFRvTWl4aW4pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIGNoaWxkcmVuID0gY2hpbGQuYztcbiAgICAgICAgICAgIGlmIChjaGlsZHJlbikge1xuICAgICAgICAgICAgICAgIHRoaXMuX2luaXROb2RlcyhjaGlsZHJlbiwgd3JhcHBlcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlIHNjZW5lIG9iamVjdHMgdXNpbmcgcHJldmlvdXMgc2VyaWFsaXplZCBkYXRhLlxuICAgICAqIEBtZXRob2QgY3JlYXRlXG4gICAgICogQHBhcmFtIHtmdW5jdGlvbn0gY2FsbGJhY2tcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIGNyZWF0ZTogZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG4gICAgICAgIGlmIChGSVJFX0VESVRPUikge1xuICAgICAgICAgICAgaWYgKCF0aGlzLl9kYXRhVG9EZXNlcmlhbGl6ZSkge1xuICAgICAgICAgICAgICAgIEZpcmUuZXJyb3IoJ05vIG5lZWQgdG8gY3JlYXRlIHNjZW5lIHdoaWNoIG5vdCBkZXNlcmlhbGl6ZWQnKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gY2FsbGJhY2soKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIC8vIGRlc2VyaWFsaXplIChjcmVhdGUgd3JhcHBlcnMpXG4gICAgICAgIHZhciBqc29uID0gdGhpcy5fZGF0YVRvRGVzZXJpYWxpemU7XG5cbiAgICAgICAgLy9cbiAgICAgICAgZnVuY3Rpb24gZG9DcmVhdGUgKHdyYXBwZXJzKSB7XG4gICAgICAgICAgICAvLyBjcmVhdGUgc2NlbmUgbm9kZVxuICAgICAgICAgICAgc2VsZi5vbkFmdGVyRGVzZXJpYWxpemUoKTtcbiAgICAgICAgICAgIC8vIGNyZWF0ZSByZW1haW5kZXIgbm9kZXNcbiAgICAgICAgICAgIEZpcmUuZW5naW5lLl9pc0Nsb25pbmcgPSB0cnVlO1xuICAgICAgICAgICAgc2VsZi5faW5pdE5vZGVzKHdyYXBwZXJzLCBzZWxmKTtcbiAgICAgICAgICAgIEZpcmUuZW5naW5lLl9pc0Nsb25pbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyDnu5/orqHmiYDmnInpnIDopoEgcHJlbG9hZCDnmoQgQXNzZXRcbiAgICAgICAgdmFyIHJlY29yZEFzc2V0cyA9IHRydWU7XG4gICAgICAgIHZhciBoYW5kbGUgPSBGaXJlLkFzc2V0TGlicmFyeS5sb2FkSnNvbihcbiAgICAgICAgICAgIGpzb24sXG4gICAgICAgICAgICBmdW5jdGlvbiAoZXJyLCBkYXRhKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5fZGF0YVRvRGVzZXJpYWxpemUgPSBudWxsO1xuICAgICAgICAgICAgICAgIHZhciB3cmFwcGVycyA9IGRhdGEuYztcbiAgICAgICAgICAgICAgICBpZiAoRklSRV9FRElUT1IpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gZmFsbGJhY2sgdG8gb2xkIGZvcm1hdFxuICAgICAgICAgICAgICAgICAgICB3cmFwcGVycyA9IHdyYXBwZXJzIHx8IGRhdGE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChoYW5kbGUuYXNzZXRzTmVlZFBvc3RMb2FkLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gcHJlbG9hZFxuICAgICAgICAgICAgICAgICAgICBzZWxmLnByZWxvYWRBc3NldHMoaGFuZGxlLmFzc2V0c05lZWRQb3N0TG9hZCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZG9DcmVhdGUod3JhcHBlcnMpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGRvQ3JlYXRlKHdyYXBwZXJzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdHJ1ZSwgcmVjb3JkQXNzZXRzXG4gICAgICAgICk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEluaXQgdGhpcyBzY2VuZSB3cmFwcGVyIGZyb20gdGhlIHByZXZpb3VzIHNlcmlhbGl6ZWQgZGF0YS5cbiAgICAgKiBAbWV0aG9kIF9kZXNlcmlhbGl6ZVxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBkYXRhIC0gdGhlIHNlcmlhbGl6ZWQganNvbiBkYXRhXG4gICAgICogQHBhcmFtIHtfRGVzZXJpYWxpemVyfSBjdHhcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIF9kZXNlcmlhbGl6ZTogZnVuY3Rpb24gKGRhdGEsIGN0eCkge1xuICAgICAgICAvLyBzYXZlIHRlbXBvcmFyaWx5IGZvciBjcmVhdGUoKVxuICAgICAgICB0aGlzLl9kYXRhVG9EZXNlcmlhbGl6ZSA9IGRhdGE7XG4gICAgICAgIGlmIChkYXRhLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHRoaXMudXVpZCA9IGRhdGFbMF0udXVpZDtcbiAgICAgICAgfVxuICAgIH1cbn0pO1xuXG4vKipcbiAqIEBwcm9wZXJ0eSB7Qm9vbGVhbn0gX25lZWRDcmVhdGUgLSBOZWVkcyB0byBjYWxsIGNyZWF0ZSgpLlxuICogQHByaXZhdGVcbiAqL1xuSlMuZ2V0KHNjZW5lUHJvdG8sICdfbmVlZENyZWF0ZScsIGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gISF0aGlzLl9kYXRhVG9EZXNlcmlhbGl6ZTtcbn0pO1xuXG4vLyBzY2VuZSB1dWlkIHdpbGwgY29weSBmcm9tIGFzc2V0c1xuSlMuZ2V0c2V0KHNjZW5lUHJvdG8sICd1dWlkJyxcbiAgICBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pZDtcbiAgICB9LFxuICAgIGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICB0aGlzLl9pZCA9IHZhbHVlO1xuICAgIH1cbik7XG5cbmlmIChGSVJFX0VESVRPUikge1xuXG4gICAgdmFyIHNlcmlhbGl6ZSA9IHJlcXVpcmUoJy4uLy4uL2VkaXRvci9zZXJpYWxpemUnKTtcblxuICAgIC8vdmFyIGdldE1peGluRGF0YSA9IGZ1bmN0aW9uIChub2RlKSB7XG4gICAgLy9cbiAgICAvL307XG5cbiAgICB2YXIgcGFyc2VXcmFwcGVycyA9IGZ1bmN0aW9uIChub2RlKSB7XG4gICAgICAgIHZhciB3cmFwcGVyID0gRmlyZShub2RlKTtcbiAgICAgICAgd3JhcHBlci5vbkJlZm9yZVNlcmlhbGl6ZSgpO1xuICAgICAgICB2YXIgY2hpbGRyZW47XG4gICAgICAgIHZhciBjaGlsZHJlbk4gPSB3cmFwcGVyLmNoaWxkcmVuTjtcbiAgICAgICAgaWYgKGNoaWxkcmVuTi5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBjaGlsZHJlbiA9IGNoaWxkcmVuTi5tYXAocGFyc2VXcmFwcGVycyk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIG1peGluQ2xhc3NlcyA9IG5vZGUuX21peGluQ2xhc3NlcztcbiAgICAgICAgdmFyIHRhcmdldE4gPSBtaXhpbkNsYXNzZXMgPyBub2RlIDogdW5kZWZpbmVkO1xuXG4gICAgICAgIHZhciBtaXhpbjtcbiAgICAgICAgaWYgKG1peGluQ2xhc3Nlcykge1xuICAgICAgICAgICAgaWYgKG1peGluQ2xhc3Nlcy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICAgICAgICBtaXhpbiA9IEpTLl9nZXRDbGFzc0lkKG1peGluQ2xhc3Nlc1swXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBtaXhpbiA9IG1peGluQ2xhc3Nlcy5tYXAoSlMuX2dldENsYXNzSWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB3OiB3cmFwcGVyLCAgICAgLy8gd3JhcHBlciBwcm9wZXJ0aWVzXG4gICAgICAgICAgICBjOiBjaGlsZHJlbiwgICAgLy8gY2hpbGRyZW5cbiAgICAgICAgICAgIHQ6IHRhcmdldE4sICAgICAvLyB0YXJnZXQgbm9kZVxuICAgICAgICAgICAgbTogbWl4aW4gICAgICAgIC8vIG1peGluIGNsYXNzIGxpc3RcbiAgICAgICAgfTtcbiAgICB9O1xuXG4gICAgSlMubWl4aW4oc2NlbmVQcm90bywge1xuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIGltcGxlbWVudCBvZiBzZXJpYWxpemF0aW9uIGZvciB0aGUgd2hvbGUgc2NlbmUuXG4gICAgICAgICAqIEBtZXRob2QgX3NlcmlhbGl6ZVxuICAgICAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IGV4cG9ydGluZ1xuICAgICAgICAgKiBAcmV0dXJuIHtvYmplY3R9IHRoZSBzZXJpYWxpemVkIGpzb24gZGF0YSBvYmplY3RcbiAgICAgICAgICogQHByaXZhdGVcbiAgICAgICAgICovXG4gICAgICAgIF9zZXJpYWxpemU6IGZ1bmN0aW9uIChleHBvcnRpbmcpIHtcbiAgICAgICAgICAgIHRoaXMub25CZWZvcmVTZXJpYWxpemUoKTtcblxuICAgICAgICAgICAgdmFyIGNoaWxkV3JhcHBlcnMgPSBwYXJzZVdyYXBwZXJzKHRoaXMudGFyZ2V0TikuYztcbiAgICAgICAgICAgIHZhciB0b1NlcmlhbGl6ZSA9IHtcbiAgICAgICAgICAgICAgICBjOiBjaGlsZFdyYXBwZXJzIHx8IFtdLFxuICAgICAgICAgICAgICAgIHV1aWQ6IHRoaXMudXVpZCB8fCAnJ1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgcmV0dXJuIHNlcmlhbGl6ZSh0b1NlcmlhbGl6ZSwge1xuICAgICAgICAgICAgICAgIGV4cG9ydGluZzogZXhwb3J0aW5nLFxuICAgICAgICAgICAgICAgIG5pY2lmeTogZXhwb3J0aW5nLFxuICAgICAgICAgICAgICAgIHN0cmluZ2lmeTogZmFsc2VcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfSk7XG59XG4iLCJcbnZhciBkZXRhY2hpbmdOb2RlcyA9IHt9O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBpbml0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmIChGSVJFX0VESVRPUikge1xuICAgICAgICAgICAgRmlyZS5lbmdpbmUub24oJ3Bvc3QtdXBkYXRlJywgdGhpcy5fZGVib3VuY2VOb2RlRXZlbnQpO1xuXG4gICAgICAgICAgICAvLyDlnLrmma/ph43lu7rml7bvvIzmnInlj6/og73lvJXnlKjmlLnlj5hJROS4jeWPmO+8jOi/memHjOWFiCBmbHVzaCDkuIDkuIvku6XlhY3kuovku7bpobrluo/plJnkubFcbiAgICAgICAgICAgIEZpcmUuZW5naW5lLm9uKCdwcmUtbGF1bmNoLXNjZW5lJywgdGhpcy5fZGVib3VuY2VOb2RlRXZlbnQpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8vIGFzc2VydChub2RlKVxuICAgIG9uTm9kZUF0dGFjaGVkVG9QYXJlbnQ6IGZ1bmN0aW9uIChub2RlKSB7XG4gICAgICAgIGlmIChGSVJFX0VESVRPUikge1xuICAgICAgICAgICAgdmFyIHV1aWQgPSBGaXJlKG5vZGUpLnV1aWQ7XG4gICAgICAgICAgICBpZiAoIXV1aWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgbm9kZVdpdGhTYW1lSWQgPSBkZXRhY2hpbmdOb2Rlc1t1dWlkXTtcbiAgICAgICAgICAgIGlmIChub2RlV2l0aFNhbWVJZCkge1xuICAgICAgICAgICAgICAgIGRlbGV0ZSBkZXRhY2hpbmdOb2Rlc1t1dWlkXTtcbiAgICAgICAgICAgICAgICBpZiAobm9kZVdpdGhTYW1lSWQgPT09IG5vZGUpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gZGVib3VuY2VcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gZmx1c2ggcHJldmlvdXMgZGV0YWNoIGV2ZW50XG4gICAgICAgICAgICAgICAgICAgIEZpcmUuZW5naW5lLmVtaXQoJ25vZGUtZGV0YWNoLWZyb20tc2NlbmUnLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXROOiBub2RlV2l0aFNhbWVJZFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBuZXcgbm9kZVxuICAgICAgICAgICAgRmlyZS5lbmdpbmUuZW1pdCgnbm9kZS1hdHRhY2gtdG8tc2NlbmUnLCB7XG4gICAgICAgICAgICAgICAgdGFyZ2V0Tjogbm9kZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLy8gYXNzZXJ0KG5vZGUpXG4gICAgb25Ob2RlRGV0YWNoZWRGcm9tUGFyZW50OiBmdW5jdGlvbiAobm9kZSkge1xuICAgICAgICBpZiAoRklSRV9FRElUT1IpIHtcbiAgICAgICAgICAgIHZhciB1dWlkID0gRmlyZShub2RlKS51dWlkO1xuICAgICAgICAgICAgaWYgKCF1dWlkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZGV0YWNoaW5nTm9kZXNbdXVpZF0gPSBub2RlO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIF9kZWJvdW5jZU5vZGVFdmVudDogZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoRklSRV9FRElUT1IpIHtcbiAgICAgICAgICAgIGZvciAodmFyIHV1aWQgaW4gZGV0YWNoaW5nTm9kZXMpIHtcbiAgICAgICAgICAgICAgICB2YXIgbm9kZSA9IGRldGFjaGluZ05vZGVzW3V1aWRdO1xuICAgICAgICAgICAgICAgIEZpcmUuZW5naW5lLmVtaXQoJ25vZGUtZGV0YWNoLWZyb20tc2NlbmUnLCB7XG4gICAgICAgICAgICAgICAgICAgIHRhcmdldE46IG5vZGVcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGRldGFjaGluZ05vZGVzID0ge307XG4gICAgICAgIH1cbiAgICB9XG59O1xuIiwiXG4vKipcbiAqIFRoaXMgbW9kdWxlIHByb3ZpZGVzIGludGVyZmFjZXMgZm9yIHJ1bnRpbWUgaW1wbGVtZW50YXRpb24uXG4gKiBAbW9kdWxlIEZpcmUuUnVudGltZVxuICogQG1haW5cbiAqL1xuXG52YXIgUnVudGltZSA9IHt9O1xuXG52YXIgcmVnaXN0ZXIgPSByZXF1aXJlKCcuL3JlZ2lzdGVyJyk7XG52YXIgTm9kZVdyYXBwZXIgPSByZXF1aXJlKCcuL3dyYXBwZXJzL25vZGUnKTtcblxuRmlyZS5KUy5taXhpbihSdW50aW1lLCB7XG4gICAgTm9kZVdyYXBwZXI6IE5vZGVXcmFwcGVyLFxuICAgIFNjZW5lV3JhcHBlcjogcmVxdWlyZSgnLi93cmFwcGVycy9zY2VuZScpLFxuICAgIHJlZ2lzdGVyTm9kZVR5cGU6IHJlZ2lzdGVyLnJlZ2lzdGVyTm9kZVR5cGUsXG5cbiAgICByZWdpc3Rlck1peGluOiByZWdpc3Rlci5yZWdpc3Rlck1peGluLFxuXG4gICAgRW5naW5lV3JhcHBlcjogcmVxdWlyZSgnLi93cmFwcGVycy9lbmdpbmUnKSxcbiAgICByZWdpc3RlckVuZ2luZTogcmVnaXN0ZXIucmVnaXN0ZXJFbmdpbmUsXG5cbiAgICBIZWxwZXJzOiByZXF1aXJlKCcuL2hlbHBlcnMnKVxufSk7XG5cbi8vIGxvYWQgdXRpbGl0eSBtZXRob2RzXG5yZXF1aXJlKCcuL2V4dGVuZHMvbm9kZS1leHRlbmRzJyk7XG5yZXF1aXJlKCcuL2V4dGVuZHMvc2NlbmUtZXh0ZW5kcycpO1xucmVxdWlyZSgnLi9leHRlbmRzL2VuZ2luZS1leHRlbmRzJyk7XG5cbi8vIHJlZ2lzdGVyIGEgZGVmYXVsdCBtaXhpbiBzb2x1dGlvblxudmFyIG1peGluID0gcmVxdWlyZSgnLi9taXhpbicpO1xucmVnaXN0ZXIucmVnaXN0ZXJNaXhpbihtaXhpbik7XG5cblJ1bnRpbWUuU2V0dGluZ3MgPSByZXF1aXJlKCcuL3NldHRpbmdzJyk7XG5cbi8qKlxuICogQG1vZHVsZSBGaXJlXG4gKi9cblxuRmlyZS5nZXRXcmFwcGVyVHlwZSA9IHJlZ2lzdGVyLmdldFdyYXBwZXJUeXBlO1xuRmlyZS5tZW51VG9XcmFwcGVyID0gcmVnaXN0ZXIubWVudVRvV3JhcHBlcjtcblxudmFyIG1peGluID0gcmVnaXN0ZXIuZ2V0TWl4aW5PcHRpb25zKCk7XG5GaXJlLm1peGluID0gbWl4aW4ubWl4aW47XG5GaXJlLmhhc01peGluID0gbWl4aW4uaGFzTWl4aW47XG5GaXJlLnVuTWl4aW4gPSBtaXhpbi51bk1peGluO1xuXG4vLy8qKlxuLy8gKiBUaGUgU2NlbmVXcmFwcGVyIGNsYXNzIHJlZ2lzdGVyZWQgYnkgcnVudGltZS5cbi8vICogQHByb3BlcnR5IFNjZW5lV3JhcHBlckltcGxcbi8vICogQHR5cGUge0ZpcmUuUnVudGltZS5TY2VuZVdyYXBwZXJ9XG4vLyAqL1xuLy9GaXJlLkpTLmdldChGaXJlLCAnU2NlbmVXcmFwcGVySW1wbCcsIHJlZ2lzdGVyLmdldFJlZ2lzdGVyZWRTY2VuZVdyYXBwZXIpO1xuXG5cblxubW9kdWxlLmV4cG9ydHMgPSBSdW50aW1lO1xuIiwiLy8gVGhlIGRlZmF1bHQgbWl4aW4gc29sdXRpb25cbnZhciBKUyA9IEZpcmUuSlM7XG52YXIgV3JhcHBlciA9IHJlcXVpcmUoJy4vd3JhcHBlcnMvbm9kZScpO1xudmFyIEJlaGF2aW9yID0gcmVxdWlyZSgnLi9iZWhhdmlvcicpO1xudmFyIGluc3RhbnRpYXRlUHJvcHMgPSByZXF1aXJlKCcuLi9jb3JlL2NsYXNzJykuaW5zdGFudGlhdGVQcm9wcztcblxudmFyIExpZmVjeWNsZU1ldGhvZHMgPSBCZWhhdmlvci5MQ01ldGhvZE5hbWVzO1xudmFyIGxjbUludm9rZXJzID0gQmVoYXZpb3IubGNtSW52b2tlcnM7XG5cbmZ1bmN0aW9uIGNhbGxJblRyeUNhdGNoIChtZXRob2QsIHRhcmdldCkge1xuICAgIHRyeSB7XG4gICAgICAgIG1ldGhvZC5jYWxsKHRhcmdldCk7XG4gICAgfVxuICAgIGNhdGNoIChlKSB7XG4gICAgICAgIEZpcmUuX3Rocm93KGUpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gbWl4aW4gKG5vZGUsIHR5cGVPclR5cGVuYW1lKSB7XG4gICAgJ3VzZSBzdHJpY3QnO1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMikge1xuICAgICAgICBmb3IgKHZhciBhID0gMTsgYSA8IGFyZ3VtZW50cy5sZW5ndGg7IGErKykge1xuICAgICAgICAgICAgbWl4aW4obm9kZSwgYXJndW1lbnRzW2FdKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciBjbGFzc1RvTWl4O1xuICAgIGlmICh0eXBlb2YgdHlwZU9yVHlwZW5hbWUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIGNsYXNzVG9NaXggPSBKUy5nZXRDbGFzc0J5TmFtZSh0eXBlT3JUeXBlbmFtZSk7XG4gICAgICAgIGlmICggIWNsYXNzVG9NaXggKSB7XG4gICAgICAgICAgICBGaXJlLmVycm9yKCdGaXJlLm1peGluOiBGYWlsZWQgdG8gZ2V0IGNsYXNzIFwiJXNcIicpO1xuICAgICAgICAgICAgaWYgKEZpcmUuX1JGcGVlaygpKSB7XG4gICAgICAgICAgICAgICAgRmlyZS5lcnJvcignWW91IHNob3VsZCBub3QgbWl4aW4gJXMgd2hlbiB0aGUgc2NyaXB0cyBhcmUgc3RpbGwgbG9hZGluZy4nLCB0eXBlT3JUeXBlbmFtZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGlmICggIXR5cGVPclR5cGVuYW1lICkge1xuICAgICAgICAgICAgRmlyZS5lcnJvcignRmlyZS5taXhpbjogVGhlIGNsYXNzIHRvIG1peGluIG11c3QgYmUgbm9uLW5pbCcpO1xuICAgICAgICB9XG4gICAgICAgIGNsYXNzVG9NaXggPSB0eXBlT3JUeXBlbmFtZTtcbiAgICB9XG5cbiAgICBpZiAoRklSRV9FRElUT1IpIHtcbiAgICAgICAgLy8gdmFsaWRhdGVcbiAgICAgICAgaWYgKCFGaXJlLl9pc0ZpcmVDbGFzcyhjbGFzc1RvTWl4KSkge1xuICAgICAgICAgICAgRmlyZS5lcnJvcignRmlyZS5taXhpbjogVGhlIGNsYXNzIHRvIG1peGluIG11c3QgYmUgRmlyZUNsYXNzLicpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmICghSlMuX2dldENsYXNzSWQoY2xhc3NUb01peCkgJiYgIUZJUkVfVEVTVCkge1xuICAgICAgICAgICAgRmlyZS5lcnJvcihcIkZpcmUubWl4aW46IFRoZSBjbGFzcyB0byBtaXhpbiBtdXN0IGhhdmUgY2xhc3MgbmFtZSBvciBzY3JpcHQncyB1dWlkLlwiKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIUZpcmUuaXNDaGlsZENsYXNzT2YoY2xhc3NUb01peCwgQmVoYXZpb3IpKSB7XG4gICAgICAgICAgICBGaXJlLndhcm4oXCJGaXJlLm1peGluOiBUaGUgY2xhc3MgdG8gbWl4aW4gbXVzdCBpbmhlcml0IGZyb20gRmlyZS5CZWhhdmlvci5cIik7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAobm9kZSBpbnN0YW5jZW9mIFdyYXBwZXIpIHtcbiAgICAgICAgbm9kZSA9IG5vZGUudGFyZ2V0TjtcbiAgICB9XG5cbiAgICBpZiAoIW5vZGUpIHtcbiAgICAgICAgRmlyZS5lcnJvcihcIkZpcmUubWl4aW46IFRoZSBub2RlIHRvIG1peGluIG11c3QgYmUgbm9uLW5pbC5cIik7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoRklSRV9FRElUT1IgJiYgbm9kZS5fbWl4aW5DbGFzc2VzICYmIG5vZGUuX21peGluQ2xhc3Nlcy5pbmRleE9mKGNsYXNzVG9NaXgpICE9PSAtMSkge1xuICAgICAgICBGaXJlLndhcm4oXCJGaXJlLm1peGluOiBUaGUgY2xhc3MgaGFzIGFscmVhZHkgbWl4aW5lZC5cIik7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBpbml0IHByb3BzXG4gICAgaW5zdGFudGlhdGVQcm9wcyhub2RlLCBjbGFzc1RvTWl4KTtcblxuICAgIC8vIGNyZWF0aW5nIG1peGluIHNjcmlwdCBjb250ZXh0XG4gICAgdmFyIHNjcmlwdEN0eCA9IHtcbiAgICAgICAgX29iakZsYWdzOiAwLFxuICAgIH07XG5cbiAgICB2YXIgbWl4aW5EYXRhO1xuXG4gICAgLy8gbWFpbnRhaW4gbWl4aW4gc3RhdGVzXG4gICAgdmFyIF9taXhpbkNsYXNzZXMgPSBub2RlLl9taXhpbkNsYXNzZXM7XG4gICAgaWYgKF9taXhpbkNsYXNzZXMpIHtcbiAgICAgICAgX21peGluQ2xhc3Nlcy5wdXNoKGNsYXNzVG9NaXgpO1xuICAgICAgICBub2RlLl9taXhpbkNvbnRleHRzLnB1c2goc2NyaXB0Q3R4KTtcbiAgICAgICAgbWl4aW5EYXRhID0gbm9kZS5fbWl4aW47XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBub2RlLl9taXhpbkNsYXNzZXMgPSBbY2xhc3NUb01peF07XG4gICAgICAgIG5vZGUuX21peGluQ29udGV4dHMgPSBbc2NyaXB0Q3R4XTtcbiAgICAgICAgbWl4aW5EYXRhID0ge1xuICAgICAgICAgICAgbGNtSW5pdFN0YXRlczogW11cbiAgICAgICAgfTtcbiAgICAgICAgbm9kZS5fbWl4aW4gPSBtaXhpbkRhdGE7XG4gICAgfVxuICAgIHZhciBsY21Jbml0U3RhdGVzID0gbWl4aW5EYXRhLmxjbUluaXRTdGF0ZXM7XG4gICAgbGNtSW5pdFN0YXRlcy5sZW5ndGggPSBMaWZlY3ljbGVNZXRob2RzLmxlbmd0aDtcblxuICAgIC8vIERPIE1JWElOXG4gICAgdmFyIGNsYXNzVG9NaXhQcm90byA9IGNsYXNzVG9NaXgucHJvdG90eXBlO1xuICAgIGZvciAodmFyIHByb3BOYW1lIGluIGNsYXNzVG9NaXhQcm90bykge1xuICAgICAgICBpZiAocHJvcE5hbWUgPT09ICdfX2NpZF9fJyB8fFxuICAgICAgICAgICAgcHJvcE5hbWUgPT09ICdfX2NsYXNzbmFtZV9fJyB8fFxuICAgICAgICAgICAgcHJvcE5hbWUgPT09ICdjb25zdHJ1Y3RvcicpIHtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIC8vIFRPRE8gLSBkb250IG1peGluIGNsYXNzIGF0dHJcblxuICAgICAgICB2YXIgbGNtSW5kZXggPSBMaWZlY3ljbGVNZXRob2RzLmluZGV4T2YocHJvcE5hbWUpO1xuICAgICAgICB2YXIgaXNMaWZlY3ljbGVNZXRob2RzID0gbGNtSW5kZXggIT09IC0xO1xuICAgICAgICBpZiAoaXNMaWZlY3ljbGVNZXRob2RzKSB7XG4gICAgICAgICAgICAvL2lmIChGaXJlLmVuZ2luZSAmJiAhRmlyZS5lbmdpbmUuX2lzUGxheWluZyAmJiBGSVJFX0VESVRPUikge1xuICAgICAgICAgICAgLy8gICAgY29udGludWU7XG4gICAgICAgICAgICAvL31cbiAgICAgICAgICAgIHNjcmlwdEN0eFtwcm9wTmFtZV0gPSBjbGFzc1RvTWl4UHJvdG9bcHJvcE5hbWVdO1xuICAgICAgICAgICAgaWYgKCEgbGNtSW5pdFN0YXRlc1tsY21JbmRleF0pIHtcbiAgICAgICAgICAgICAgICBsY21Jbml0U3RhdGVzW2xjbUluZGV4XSA9IHRydWU7XG4gICAgICAgICAgICAgICAgLy8gRmlyZS53YXJuKFwiRmlyZS5taXhpbjogJXMncyAlcyBpcyBvdmVycmlkZGVuXCIsIEZpcmUobm9kZSkubmFtZSwgcHJvcE5hbWUpO1xuICAgICAgICAgICAgICAgIChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBpbnZva2VyID0gbGNtSW52b2tlcnNbcHJvcE5hbWVdO1xuICAgICAgICAgICAgICAgICAgICB2YXIgb3JpZ2luTWV0aG9kID0gbm9kZVtwcm9wTmFtZV07XG4gICAgICAgICAgICAgICAgICAgIGlmIChvcmlnaW5NZXRob2QpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vZGVbcHJvcE5hbWVdID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9yaWdpbk1ldGhvZC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGludm9rZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBub2RlW3Byb3BOYW1lXSA9IGludm9rZXI7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdmFyIHBkID0gSlMuZ2V0UHJvcGVydHlEZXNjcmlwdG9yKGNsYXNzVG9NaXhQcm90bywgcHJvcE5hbWUpO1xuICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG5vZGUsIHByb3BOYW1lLCBwZCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoRmlyZS5lbmdpbmUgJiYgKEZpcmUuZW5naW5lLl9pc1BsYXlpbmcgfHwgIUZJUkVfRURJVE9SKSAmJiAhRmlyZS5lbmdpbmUuX2lzQ2xvbmluZykge1xuICAgICAgICAvLyBpbnZva2Ugb25Mb2FkXG4gICAgICAgIHZhciBvbkxvYWQgPSBjbGFzc1RvTWl4UHJvdG8ub25Mb2FkO1xuICAgICAgICBpZiAob25Mb2FkKSB7XG4gICAgICAgICAgICBpZiAoRklSRV9FRElUT1IpIHtcbiAgICAgICAgICAgICAgICBjYWxsSW5UcnlDYXRjaChvbkxvYWQsIG5vZGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgb25Mb2FkLmNhbGwobm9kZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG5cbnZhciBleHBvcnRzID0ge1xuXG4gICAgbWl4aW46IG1peGluLFxuXG4gICAgaGFzTWl4aW46IGZ1bmN0aW9uIChub2RlLCB0eXBlT3JUeXBlbmFtZSkge1xuICAgICAgICBpZiAobm9kZSBpbnN0YW5jZW9mIFdyYXBwZXIpIHtcbiAgICAgICAgICAgIG5vZGUgPSBub2RlLnRhcmdldE47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIW5vZGUpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBtaXhpbkNsYXNzZXMgPSBub2RlLl9taXhpbkNsYXNzZXM7XG4gICAgICAgIGlmIChtaXhpbkNsYXNzZXMpIHtcbiAgICAgICAgICAgIHZhciBjbGFzc1RvTWl4O1xuICAgICAgICAgICAgaWYgKHR5cGVvZiB0eXBlT3JUeXBlbmFtZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICBjbGFzc1RvTWl4ID0gSlMuZ2V0Q2xhc3NCeU5hbWUodHlwZU9yVHlwZW5hbWUpO1xuICAgICAgICAgICAgICAgIGlmICggIWNsYXNzVG9NaXggKSB7XG4gICAgICAgICAgICAgICAgICAgIEZpcmUuZXJyb3IoJ0ZpcmUuaGFzTWl4aW46IEZhaWxlZCB0byBnZXQgY2xhc3MgXCIlc1wiJywgdHlwZU9yVHlwZW5hbWUpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKCAhdHlwZU9yVHlwZW5hbWUgKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2xhc3NUb01peCA9IHR5cGVPclR5cGVuYW1lO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG1peGluQ2xhc3Nlcy5pbmRleE9mKGNsYXNzVG9NaXgpICE9PSAtMTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSxcblxuICAgIHVuTWl4aW46IGZ1bmN0aW9uIChub2RlLCB0eXBlT3JUeXBlbmFtZSkge1xuICAgICAgICBpZiAoKEZpcmUuZW5naW5lICYmIEZpcmUuZW5naW5lLmlzUGxheWluZykgfHwgIUZJUkVfRURJVE9SKSB7XG4gICAgICAgICAgICByZXR1cm4gRmlyZS53YXJuKFwiRmlyZS51bk1peGluOiBTb3JyeSwgY2FuIG5vdCB1bi1taXhpbiB3aGVuIHRoZSBlbmdpbmUgaXMgcGxheWluZy5cIik7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobm9kZSBpbnN0YW5jZW9mIFdyYXBwZXIpIHtcbiAgICAgICAgICAgIG5vZGUgPSBub2RlLnRhcmdldE47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIW5vZGUpIHtcbiAgICAgICAgICAgIHJldHVybiBGaXJlLmVycm9yKFwiRmlyZS51bk1peGluOiBUaGUgbm9kZSB0byB1bi1taXhpbiBtdXN0IGJlIG5vbi1uaWwuXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIG1peGluQ2xhc3NlcyA9IG5vZGUuX21peGluQ2xhc3NlcztcbiAgICAgICAgaWYgKG1peGluQ2xhc3Nlcykge1xuICAgICAgICAgICAgdmFyIGNsYXNzVG9Vbm1peDtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdHlwZU9yVHlwZW5hbWUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgY2xhc3NUb1VubWl4ID0gSlMuZ2V0Q2xhc3NCeU5hbWUodHlwZU9yVHlwZW5hbWUpO1xuICAgICAgICAgICAgICAgIGlmICggIWNsYXNzVG9Vbm1peCApIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIEZpcmUuZXJyb3IoJ0ZpcmUudW5NaXhpbjogRmFpbGVkIHRvIGdldCBjbGFzcyBcIiVzXCInLCB0eXBlT3JUeXBlbmFtZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKCAhdHlwZU9yVHlwZW5hbWUgKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBGaXJlLmVycm9yKCdGaXJlLnVuTWl4aW46IFRoZSBjbGFzcyB0byB1bi1taXhpbiBtdXN0IGJlIG5vbi1uaWwnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2xhc3NUb1VubWl4ID0gdHlwZU9yVHlwZW5hbWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBpbmRleCA9IG1peGluQ2xhc3Nlcy5pbmRleE9mKGNsYXNzVG9Vbm1peCk7XG4gICAgICAgICAgICBpZiAoaW5kZXggIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgbWl4aW5DbGFzc2VzLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgICAgICAgICAgbm9kZS5fbWl4aW5Db250ZXh0cy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gRmlyZS5lcnJvcignRmlyZS51bk1peGluOiBDYW4gbm90IGZpbmQgbWl4ZWQgY2xhc3MgXCIlc1wiIGluIG5vZGUgXCIlc1wiLicsXG4gICAgICAgICAgICB0eXBlT3JUeXBlbmFtZSwgRmlyZShub2RlKS5uYW1lKTtcbiAgICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHM7XG4iLCIvKipcbiAqIEBtb2R1bGUgRmlyZS5SdW50aW1lXG4gKi9cblxudmFyIEpTID0gRmlyZS5KUztcbnZhciBnZXRDbGFzc05hbWUgPSBKUy5nZXRDbGFzc05hbWU7XG5cbnZhciBOb2RlV3JhcHBlciA9IHJlcXVpcmUoJy4vd3JhcHBlcnMvbm9kZScpO1xudmFyIFNjZW5lV3JhcHBlciA9IHJlcXVpcmUoJy4vd3JhcHBlcnMvc2NlbmUnKTtcbnZhciBFbmdpbmVXcmFwcGVyID0gcmVxdWlyZSgnLi93cmFwcGVycy9lbmdpbmUnKTtcblxuLy92YXIgcnVudGltZVNjZW5lV3JhcHBlciA9IG51bGw7XG52YXIgcnVudGltZU1peGluT3B0aW9ucyA9IG51bGw7XG5cbi8vVGhpcyBkaWN0aW9uYXJ5IHN0b3JlcyBhbGwgdGhlIHJlZ2lzdGVyZWQgV3JhcHBlclR5cGVzLCBhbmQgdXNlIE1lbnVQYXRoIGFzIGtleS5cbi8vQHByb3BlcnR5IG1lbnVUb1dyYXBwZXJcbi8vQHR5cGUge29iamVjdH1cbnZhciBtZW51VG9XcmFwcGVyID0ge307XG5cbi8qKlxuICog6YCa6L+H5rOo5YaMIHJ1bnRpbWUg55qEIHR5cGUg5Li65p+Q5Liq6Kej6YeK5ZmoLCDkvb/lvpfov5nku70gdHlwZSDlhbflpIfluo/liJfljJYsIEluc3BlY3RvciDkuK3lsZXnpLrnmoTog73liptcbiAqIEBtZXRob2QgcmVnaXN0ZXJOb2RlVHlwZVxuICogQHBhcmFtIHtmdW5jdGlvbn0gbm9kZVR5cGVcbiAqIEBwYXJhbSB7Tm9kZVdyYXBwZXJ9IG5vZGVXcmFwcGVyXG4gKiBAcGFyYW0ge3N0cmluZ30gW21lbnVQYXRoXSAtIE9wdGlvbmFsLCB0aGUgbWVudSBwYXRoIG5hbWUuIEVnLiBcIlJlbmRlcmluZy9DYW1lcmFcIlxuICovXG5mdW5jdGlvbiByZWdpc3Rlck5vZGVUeXBlIChub2RlVHlwZSwgbm9kZVdyYXBwZXIsIG1lbnVQYXRoKSB7XG4gICAgaWYgKCEgRmlyZS5pc0NoaWxkQ2xhc3NPZihub2RlV3JhcHBlciwgTm9kZVdyYXBwZXIpKSB7XG4gICAgICAgIEZpcmUuZXJyb3IoJyVzIG11c3QgYmUgY2hpbGQgY2xhc3Mgb2YgJXMhJywgZ2V0Q2xhc3NOYW1lKG5vZGVXcmFwcGVyKSwgZ2V0Q2xhc3NOYW1lKE5vZGVXcmFwcGVyKSk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKG5vZGVUeXBlLnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eSgnX0ZCX1dyYXBwZXJUeXBlJykpIHtcbiAgICAgICAgRmlyZS5lcnJvcignJXMgaXMgYWxyZWFkeSByZWdpc3RlcmVkIScsIGdldENsYXNzTmFtZShub2RlVHlwZSkpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIC8vaWYgKEZpcmUuaXNDaGlsZENsYXNzT2Yobm9kZVdyYXBwZXIsIFNjZW5lV3JhcHBlcikpIHtcbiAgICAvLyAgICBpZiAoIUZJUkVfVEVTVCAmJiBydW50aW1lU2NlbmVXcmFwcGVyKSB7XG4gICAgLy8gICAgICAgIEZpcmUuZXJyb3IoJ1RoZSAlcyBjYW4gb25seSByZWdpc3RlciBvbmNlIScsIGdldENsYXNzTmFtZShTY2VuZVdyYXBwZXIpKTtcbiAgICAvLyAgICB9XG4gICAgLy8gICAgZWxzZSB7XG4gICAgLy8gICAgICAgIHJ1bnRpbWVTY2VuZVdyYXBwZXIgPSBub2RlV3JhcHBlcjtcbiAgICAvLyAgICB9XG4gICAgLy99XG5cbiAgICBub2RlVHlwZS5wcm90b3R5cGUuX0ZCX1dyYXBwZXJUeXBlID0gbm9kZVdyYXBwZXI7XG5cbiAgICAvLyBUT0RPIC0g6I+c5Y2V5bqU6K+l5ZyoIHBhY2thZ2UuanNvbiDph4zms6jlhoxcbiAgICBpZiAobWVudVBhdGgpIHtcbiAgICAgICAgbWVudVRvV3JhcHBlclttZW51UGF0aF0gPSBub2RlV3JhcHBlcjtcbiAgICB9XG59XG5cbi8qKlxuICog6YCa6L+H5rOo5YaMIG1peGluIOeahOaPj+i/sOadpeiuqSBlbmdpbmUtZnJhbWV3b3JrIOaHguW+l+WmguS9lSBtaXhpbiDkuIDku70gRmlyZUNsYXNzIOWIsCBydW50aW1lIOeahCBub2RlVHlwZSDkuK3jgIJcbiAqIEBtZXRob2QgcmVnaXN0ZXJNaXhpblxuICogQHBhcmFtIHtvYmplY3R9IG1peGluT3B0aW9uc1xuICogQHBhcmFtIHtmdW5jdGlvbn0gbWl4aW5PcHRpb25zLm1peGluIC0gbWl4aW4gbWV0aG9kXG4gKi9cbmZ1bmN0aW9uIHJlZ2lzdGVyTWl4aW4gKG1peGluT3B0aW9ucykge1xuICAgIHJ1bnRpbWVNaXhpbk9wdGlvbnMgPSBtaXhpbk9wdGlvbnM7XG59XG5cbi8qKlxuICog5rOo5YaM5LiA5Lu95byV5pOO5a6e5L6L77yM5rOo5YaM5ZCO55qE5byV5pOO5Y+v5Lul6YCa6L+HIEZpcmUuZW5naW5lIOi/m+ihjOiuv+mXruOAglxuICogQG1ldGhvZCByZWdpc3RlckVuZ2luZVxuICogQHBhcmFtIHtFbmdpbmVXcmFwcGVyfSBlbmdpbmVJbnN0YW5jZVxuICovXG5mdW5jdGlvbiByZWdpc3RlckVuZ2luZSAoZW5naW5lSW5zdGFuY2UpIHtcbiAgICBpZiAoRklSRV9FRElUT1IpIHtcbiAgICAgICAgaWYgKCEoZW5naW5lSW5zdGFuY2UgaW5zdGFuY2VvZiBFbmdpbmVXcmFwcGVyKSkge1xuICAgICAgICAgICAgRmlyZS5lcnJvcignVGhlIGVuZ2luZSB0byByZWdpc3RlciBtdXN0IGJlIGNoaWxkIGNsYXNzIG9mICVzJywgZ2V0Q2xhc3NOYW1lKEVuZ2luZVdyYXBwZXIpKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoRmlyZS5lbmdpbmUpIHtcbiAgICAgICAgICAgIEZpcmUuZXJyb3IoJ1RoZSBlbmdpbmUgaXMgYWxyZWFkeSByZWdpc3RlcmVkIScpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgfVxuICAgIEZpcmUuZW5naW5lID0gZW5naW5lSW5zdGFuY2U7XG4gICAgSlMub2Jzb2xldGUoRmlyZSwgJ0ZpcmUuRW5naW5lJywgJ2VuZ2luZScpO1xufVxuXG4vKipcbiAqIEBtb2R1bGUgRmlyZVxuICovXG5cbi8qKlxuICogQHByb3BlcnR5IHtFbmdpbmVXcmFwcGVyfSBlbmdpbmUgLSBUaGUgaW5zdGFuY2Ugb2YgY3VycmVudCByZWdpc3RlcmVkIGVuZ2luZS5cbiAqL1xuXG4vKipcbiAqIOi/lOWbnuW3suazqOWGjOeahCBOb2RlV3JhcHBlciDnsbvlnovvvIzlpoLmnpwgbm9kZU9yTm9kZVR5cGUg5piv5a6e5L6L77yM5YiZ6L+U5Zue6Ieq6Lqr57G75Z6L5a+55bqU55qEIE5vZGVXcmFwcGVyIOaIlue7p+aJv+agkeS4iuaWueeahOacgOi/keS4gOS4quazqOWGjOeahCBOb2RlV3JhcHBlcuOAglxuICog5aaC5p6cIG5vZGVPck5vZGVUeXBlIOaYr+aehOmAoOWHveaVsO+8jOWImeWPqui/lOWbnuiHqui6q+WvueW6lOeahCBOb2RlV3JhcHBlcuOAglxuICogQG1ldGhvZCBnZXRXcmFwcGVyVHlwZVxuICogQHBhcmFtIHtvYmplY3R8ZnVuY3Rpb259IG5vZGVPck5vZGVUeXBlXG4gKiBAcmV0dXJuIHtGaXJlLlJ1bnRpbWUuTm9kZVdyYXBwZXJ8dW5kZWZpbmVkfVxuICovXG5mdW5jdGlvbiBnZXRXcmFwcGVyVHlwZSAobm9kZU9yTm9kZVR5cGUpIHtcbiAgICBpZiAodHlwZW9mIG5vZGVPck5vZGVUeXBlICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHJldHVybiBub2RlT3JOb2RlVHlwZS5fRkJfV3JhcHBlclR5cGU7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICByZXR1cm4gbm9kZU9yTm9kZVR5cGUucHJvdG90eXBlLl9GQl9XcmFwcGVyVHlwZTtcbiAgICB9XG59XG5cbi8vLy8g5YC85b6X5rOo5oSP55qE5pivLCDkuI3lkIznmoQgcnVudGltZSDkuK0sIOS7luS7rCBydW50aW1lVHlwZSDnmoQgbWl4aW4g55qE5YWz6ZSu5a2X5bCG5Lya5pyJ5Lqb6K645Y+Y5YqoLCDmr5TlpoI6IOacieS6myBydW50aW1lIOeahCBub2RlIOS4jeaUr+aMgSBldmVudCxcbi8vLy8g6YKj5LmIIGxpc3RlbmVycyDlhbPplK7lrZc6IOWcqOi/meS6myBydW50aW1lIOS4reWwhuS8muWkseaViCwg5oiR5Lus5Y+v5LulIHdhcm5pbmcgdXNlci5cbi8vRmlyZS5yZWdpc3Rlck1peGluID0gcmVxdWlyZSgnLi9taXhpbicpO1xuLy9cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgcmVnaXN0ZXJOb2RlVHlwZTogcmVnaXN0ZXJOb2RlVHlwZSxcbiAgICBnZXRXcmFwcGVyVHlwZTogZ2V0V3JhcHBlclR5cGUsXG4gICAgLy9nZXRSZWdpc3RlcmVkU2NlbmVXcmFwcGVyOiBmdW5jdGlvbiAoKSB7XG4gICAgLy8gICAgcmV0dXJuIHJ1bnRpbWVTY2VuZVdyYXBwZXI7XG4gICAgLy99LFxuXG4gICAgcmVnaXN0ZXJUb0NvcmVMZXZlbDogZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoRklSRV9FRElUT1IpIHtcbiAgICAgICAgICAgIC8vIHJlZ2lzdGVyIGNyZWF0ZSBub2RlIG1lbnVcbiAgICAgICAgICAgIHZhciBtZW51VG1wbCA9IFtdO1xuICAgICAgICAgICAgZm9yICh2YXIgbWVudVBhdGggaW4gbWVudVRvV3JhcHBlcikge1xuICAgICAgICAgICAgICAgIHZhciBiYXNlbmFtZSA9IG1lbnVQYXRoLnNwbGl0KCcvJykuc2xpY2UoLTEpWzBdO1xuICAgICAgICAgICAgICAgIG1lbnVUbXBsLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICBsYWJlbDogbWVudVBhdGgsXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6ICdzY2VuZTpjcmVhdGUtbm9kZS1ieS1jbGFzc2lkJyxcbiAgICAgICAgICAgICAgICAgICAgcGFyYW1zOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAnTmV3ICcgKyBiYXNlbmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIEpTLl9nZXRDbGFzc0lkKG1lbnVUb1dyYXBwZXJbbWVudVBhdGhdKVxuICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgRWRpdG9yLnNlbmRUb0NvcmUoJ2FwcDpyZWdpc3Rlci1tZW51JywgJ2NyZWF0ZS1ub2RlJywgbWVudVRtcGwpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIHJlZ2lzdGVyTWl4aW46IHJlZ2lzdGVyTWl4aW4sXG4gICAgLyoqXG4gICAgICogZ2V0IGN1cnJlbnQgcmVnaXN0ZXJlZCBtaXhpbiBvcHRpb25zXG4gICAgICogQG1ldGhvZCBnZXRNaXhpbk9wdGlvbnNcbiAgICAgKiBAcmV0dXJuIHtvYmplY3R9XG4gICAgICovXG4gICAgZ2V0TWl4aW5PcHRpb25zOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBydW50aW1lTWl4aW5PcHRpb25zO1xuICAgIH0sXG5cbiAgICByZWdpc3RlckVuZ2luZTogcmVnaXN0ZXJFbmdpbmVcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBcIm1hcHBpbmctdlwiOiBbMSwgMCwgMV0sXG4gICAgXCJtYXBwaW5nLWhcIjogWzAsIDEsIDFdLFxufTtcbiIsIi8qKlxuICogQG1vZHVsZSBGaXJlLlJ1bnRpbWVcbiAqL1xuXG52YXIgSlMgPSBGaXJlLkpTO1xudmFyIFRpY2tlciA9IEZpcmUuX1RpY2tlcjtcbnZhciBUaW1lID0gRmlyZS5UaW1lO1xuXG52YXIgVXRpbHMgPSByZXF1aXJlKCcuL3V0aWxzJyk7XG52YXIgTllJID0gVXRpbHMuTllJO1xudmFyIE5ZSV9BY2Nlc3NvciA9IFV0aWxzLk5ZSV9BY2Nlc3NvcjtcblxuLy92YXIgU2NlbmVXcmFwcGVyID0gcmVxdWlyZSgnLi9zY2VuZScpO1xuXG4vKipcbiAqICEjemgg6L+Z5Liq57G755So5p2l5bCB6KOF57yW6L6R5Zmo5a+55byV5pOO55qE5pON5L2c77yM5bm25LiU5o+Q5L6b6L+Q6KGM5pe255qE5LiA5Lqb5YWo5bGA5o6l5Y+j5ZKM54q25oCB44CCXG4gKiDlj6/ku6XpgJrov4cgYEZpcmUuZW5naW5lYCDmnaXorr/pl67lvZPliY3nmoQgcnVudGltZSB3cmFwcGVy44CCXG4gKiAhI2VuIEFjY2VzcyB0byBlbmdpbmUgcnVudGltZSBkYXRhLlxuICogVGhpcyBjbGFzcyBjb250YWlucyBtZXRob2RzIGZvciBsb29raW5nIHVwIGluZm9ybWF0aW9uIGFib3V0IGFuZCBjb250cm9sbGluZyB0aGUgcnVudGltZSBkYXRhLlxuICogWW91IGNhbiBhY2Nlc3MgdGhpcyBjbGFzcyB1c2luZyBgRmlyZS5lbmdpbmVgLlxuICpcbiAqIFlvdSBzaG91bGQgb3ZlcnJpZGU6XG4gKiAtIGluaXRSdW50aW1lXG4gKiAtIHBsYXlSdW50aW1lXG4gKiAtIHN0b3BSdW50aW1lXG4gKiAtIHBhdXNlUnVudGltZVxuICogLSByZXN1bWVSdW50aW1lXG4gKiAtIHVwZGF0ZVJ1bnRpbWVcbiAqIC0gYW5pbWF0ZVJ1bnRpbWVcbiAqIC0gcmVuZGVyUnVudGltZVxuICogLSBnZXRDdXJyZW50U2NlbmVOXG4gKiAtIF9zZXRDdXJyZW50U2NlbmVOXG4gKiAtIGNhbnZhc1NpemVcbiAqIC0gZ2V0SW50ZXJzZWN0aW9uTGlzdFxuICpcbiAqIFlvdSBtYXkgd2FudCB0byBvdmVycmlkZTpcbiAqIC0gdGljayAoaWYgdXNlRGVmYXVsdE1haW5Mb29wKVxuICogLSB0aWNrSW5FZGl0TW9kZVxuICpcbiAqIEBjbGFzcyBFbmdpbmVXcmFwcGVyXG4gKiBAZXh0ZW5kcyBQbGF5YWJsZVxuICogQGNvbnN0cnVjdG9yXG4gKiBAcGFyYW0ge2Jvb2xlYW59IHVzZURlZmF1bHRNYWluTG9vcCAtIGlmIHRydWUsIHRpY2soKSB3aWxsIGJlIGludm9rZWQgZXZlcnkgZnJhbWVcbiAqL1xudmFyIEVuZ2luZVdyYXBwZXIgPSBGaXJlLkNsYXNzKHtcbiAgICBuYW1lOiAnRmlyZS5SdW50aW1lLkVuZ2luZVdyYXBwZXInLFxuICAgIGV4dGVuZHM6IEZpcmUuUGxheWFibGUsXG5cbiAgICBjb25zdHJ1Y3RvcjogZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgdXNlRGVmYXVsdE1haW5Mb29wID0gYXJndW1lbnRzWzBdO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBXZSBzaG91bGQgdXNlIHRoaXMgaWQgdG8gY2FuY2VsIHRpY2tlciwgb3RoZXJ3aXNlIGlmIHRoZSBlbmdpbmUgc3RvcCBhbmQgcmVwbGF5IGltbWVkaWF0ZWx5LFxuICAgICAgICAgKiBsYXN0IHRpY2tlciB3aWxsIG5vdCBjYW5jZWwgY29ycmVjdGx5LlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcHJvcGVydHkgX3JlcXVlc3RJZFxuICAgICAgICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5fcmVxdWVzdElkID0gLTE7XG5cbiAgICAgICAgdGhpcy5fdXNlRGVmYXVsdE1haW5Mb29wID0gdXNlRGVmYXVsdE1haW5Mb29wO1xuICAgICAgICB0aGlzLl9pc0luaXRpYWxpemVkID0gZmFsc2U7XG5cbiAgICAgICAgLy8gU2NlbmUgbGlzdFxuICAgICAgICB0aGlzLl9zY2VuZUluZm9zID0gW107XG5cbiAgICAgICAgLy8gY3VycmVudCBzY2VuZVxuICAgICAgICB0aGlzLl9sb2FkaW5nU2NlbmUgPSAnJztcbiAgICAgICAgdGhpcy5fZW1wdHlTY2VuZU4gPSBudWxsO1xuXG4gICAgICAgIHRoaXMuX2JpbmRlZFRpY2sgPSAoRklSRV9FRElUT1IgfHwgdXNlRGVmYXVsdE1haW5Mb29wKSAmJiB0aGlzLl90aWNrLmJpbmQodGhpcyk7XG5cbiAgICAgICAgLy8gc3RhdGVzXG4gICAgICAgIHRoaXMuX2lzQ2xvbmluZyA9IGZhbHNlOyAgICAvLyBkZXNlcmlhbGl6aW5nIG9yIGluc3RhbnRpYXRpbmdcbiAgICAgICAgLy90aGlzLl9pc0xvY2tpbmdTY2VuZSA9IGZhbHNlO1xuXG4gICAgICAgIGlmIChGSVJFX0VESVRPUikge1xuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBUaGUgbWF4aW11bSB2YWx1ZSB0aGUgVGltZS5kZWx0YVRpbWUgaW4gZWRpdCBtb2RlLlxuICAgICAgICAgICAgICogQHByb3BlcnR5IG1heERlbHRhVGltZUluRU1cbiAgICAgICAgICAgICAqIEB0eXBlIHtOdW1iZXJ9XG4gICAgICAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICB0aGlzLm1heERlbHRhVGltZUluRU0gPSAxIC8gMzA7XG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIElzIHBsYXlpbmcgYW5pbWF0aW9uIGluIGVkaXQgbW9kZS5cbiAgICAgICAgICAgICAqIEBwcm9wZXJ0eSBhbmltYXRpbmdJbkVkaXRNb2RlXG4gICAgICAgICAgICAgKiBAdHlwZSB7Qm9vbGVhbn1cbiAgICAgICAgICAgICAqIEBwcml2YXRlXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHRoaXMuYW5pbWF0aW5nSW5FZGl0TW9kZSA9IGZhbHNlO1xuXG4gICAgICAgICAgICB0aGlzLl9zaG91bGRSZXBhaW50SW5FTSA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5fZm9yY2VSZXBhaW50SWQgPSAtMTtcblxuICAgICAgICAgICAgLy8gdXNlZCBpbiBnZXRJbnN0YW5jZUJ5SWQgYW5kIGVkaXRvciBvbmx5XG4gICAgICAgICAgICB0aGlzLmF0dGFjaGVkV3JhcHBlcnNGb3JFZGl0b3IgPSB7fTtcblxuICAgICAgICAgICAgdmFyIGF0dGFjaGVkV3JhcHBlcnNGb3JFZGl0b3IgPSB0aGlzLmF0dGFjaGVkV3JhcHBlcnNGb3JFZGl0b3I7XG4gICAgICAgICAgICB0aGlzLm9uKCdub2RlLWRldGFjaC1mcm9tLXNjZW5lJywgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgdmFyIG5vZGUgPSBldmVudC5kZXRhaWwudGFyZ2V0TjtcbiAgICAgICAgICAgICAgICBpZiAobm9kZSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgdXVpZCA9IEZpcmUobm9kZSkudXVpZDtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHV1aWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBhdHRhY2hlZFdyYXBwZXJzRm9yRWRpdG9yW3V1aWRdO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLm9uKCdub2RlLWF0dGFjaC10by1zY2VuZScsIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgICAgIHZhciBub2RlID0gZXZlbnQuZGV0YWlsLnRhcmdldE47XG4gICAgICAgICAgICAgICAgaWYgKG5vZGUpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHdyYXBwZXIgPSBGaXJlKG5vZGUpO1xuICAgICAgICAgICAgICAgICAgICB2YXIgdXVpZCA9IHdyYXBwZXIudXVpZDtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHV1aWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGF0dGFjaGVkV3JhcHBlcnNGb3JFZGl0b3JbdXVpZF0gPSB3cmFwcGVyO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICAvKipcbiAgICAgICAgICogQHByb3BlcnR5IHtib29sZWFufSBpc0luaXRpYWxpemVkIC0gSW5kaWNhdGVzIHdoZXRoZXIgdGhlIGVuZ2luZSBpbnN0YW5jZSBpcyBpbml0aWFsaXplZC5cbiAgICAgICAgICogQHJlYWRPbmx5XG4gICAgICAgICAqL1xuICAgICAgICBpc0luaXRpYWxpemVkOiB7XG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5faXNJbml0aWFsaXplZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogQHByb3BlcnR5IHtib29sZWFufSBsb2FkaW5nU2NlbmVcbiAgICAgICAgICogQHJlYWRPbmx5XG4gICAgICAgICAqL1xuICAgICAgICBsb2FkaW5nU2NlbmU6IHtcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9sb2FkaW5nU2NlbmU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7RmlyZS5WZWMyfSBjYW52YXNTaXplIC0gUmVzaXplIHRoZSByZW5kZXJpbmcgY2FudmFzLlxuICAgICAgICAgKi9cbiAgICAgICAgY2FudmFzU2l6ZTogTllJX0FjY2Vzc29yKEZpcmUuVmVjMi56ZXJvKSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIGludGVydmFsKG1zKSBldmVyeSB0aW1lIHRoZSBlbmdpbmUgZm9yY2UgdG8gcmVwYWludCB0aGUgc2NlbmUgaW4gZWRpdCBtb2RlLlxuICAgICAgICAgKiBJZiBkb24ndCBuZWVkLCBzZXQgdGhpcyB0byAwLlxuICAgICAgICAgKiBAcHJvcGVydHkgZm9yY2VSZXBhaW50SW50ZXJ2YWxJbkVNXG4gICAgICAgICAqIEB0eXBlIHtOdW1iZXJ9XG4gICAgICAgICAqIEBwcml2YXRlXG4gICAgICAgICAqL1xuICAgICAgICBmb3JjZVJlcGFpbnRJbnRlcnZhbEluRU06IHtcbiAgICAgICAgICAgIGRlZmF1bHQ6IDUwMCxcbiAgICAgICAgICAgIG5vdGlmeTogRklSRV9FRElUT1IgJiYgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9mb3JjZVJlcGFpbnRJZCAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLl9mb3JjZVJlcGFpbnRJZCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmZvcmNlUmVwYWludEludGVydmFsSW5FTSA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9mb3JjZVJlcGFpbnRJZCA9IHNldEludGVydmFsKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYucmVwYWludEluRWRpdE1vZGUoKTtcbiAgICAgICAgICAgICAgICAgICAgfSwgdGhpcy5mb3JjZVJlcGFpbnRJbnRlcnZhbEluRU0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvLyBUTyBPVkVSUklERVxuXG4gICAgLyoqXG4gICAgICogQGNhbGxiYWNrIEluaXRDYWxsYmFja1xuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBbZXJyb3JdIC0gbnVsbCBvciB0aGUgZXJyb3IgaW5mb1xuICAgICAqL1xuXG4gICAgLyoqXG4gICAgICogSW5pdGlhbGl6ZSB0aGUgcnVudGltZS4gVGhpcyBtZXRob2Qgd2lsbCBiZSBjYWxsZWQgYnkgaW5pdCBtZXRob2QuXG4gICAgICogQG1ldGhvZCBpbml0UnVudGltZVxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBvcHRpb25zXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IG9wdGlvbnMud2lkdGhcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gb3B0aW9ucy5oZWlnaHRcbiAgICAgKiBAcGFyYW0ge0NhbnZhc30gW29wdGlvbnMuY2FudmFzXVxuICAgICAqIEBwYXJhbSB7SW5pdENhbGxiYWNrfSBjYWxsYmFja1xuICAgICAqL1xuICAgIGluaXRSdW50aW1lOiBmdW5jdGlvbiAob3B0aW9ucywgY2FsbGJhY2spIHtcbiAgICAgICAgTllJKCk7XG4gICAgICAgIGNhbGxiYWNrKCk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFN0YXJ0cyBwbGF5YmFjay5cbiAgICAgKiBAbWV0aG9kIHBsYXlSdW50aW1lXG4gICAgICovXG4gICAgcGxheVJ1bnRpbWU6IE5ZSSxcbiAgICAvKipcbiAgICAgKiBTdG9wcyBwbGF5YmFjay5cbiAgICAgKiBAbWV0aG9kIHN0b3BSdW50aW1lXG4gICAgICovXG4gICAgc3RvcFJ1bnRpbWU6IE5ZSSxcbiAgICAvKipcbiAgICAgKiBQYXVzZXMgcGxheWJhY2suXG4gICAgICogQG1ldGhvZCBwYXVzZVJ1bnRpbWVcbiAgICAgKi9cbiAgICBwYXVzZVJ1bnRpbWU6IE5ZSSxcbiAgICAvKipcbiAgICAgKiBSZXN1bWVzIHBsYXliYWNrLlxuICAgICAqIEBtZXRob2QgcmVzdW1lUnVudGltZVxuICAgICAqL1xuICAgIHJlc3VtZVJ1bnRpbWU6IE5ZSSxcblxuICAgIC8qKlxuICAgICAqIFVwZGF0ZSBwaGFzZSwgd2lsbCBub3QgaW52b2tlZCBpbiBlZGl0IG1vZGUuXG4gICAgICogVXNlIHRoaXMgbWV0aG9kIHRvIHVwZGF0ZSB5b3VyIGVuZ2luZSBsb2dpYywgc3VjaCBhcyBpbnB1dCBsb2dpYyBhbmQgZ2FtZSBsb2dpYy5cbiAgICAgKiBAbWV0aG9kIHVwZGF0ZVJ1bnRpbWVcbiAgICAgKi9cbiAgICB1cGRhdGVSdW50aW1lOiBOWUksXG4gICAgLyoqXG4gICAgICogQW5pbWF0ZSBwaGFzZSwgY2FsbGVkIGFmdGVyIHVwZGF0ZVJ1bnRpbWUuXG4gICAgICogVXNlIHRoaXMgbWV0aG9kIHRvIHVwZGF0ZSB5b3VyIHBhcnRpY2xlIGFuZCBhbmltYXRpb24uXG4gICAgICogQG1ldGhvZCBhbmltYXRlUnVudGltZVxuICAgICAqL1xuICAgIGFuaW1hdGVSdW50aW1lOiBOWUksXG4gICAgLyoqXG4gICAgICogUmVuZGVyIHBoYXNlLCBjYWxsZWQgYWZ0ZXIgYW5pbWF0ZVJ1bnRpbWUuXG4gICAgICogVXNlIHRoaXMgbWV0aG9kIHRvIHJlbmRlciB5b3VyIHNjZW5lLlxuICAgICAqIEBtZXRob2QgcmVuZGVyUnVudGltZVxuICAgICAqL1xuICAgIHJlbmRlclJ1bnRpbWU6IE5ZSSxcblxuICAgIC8vLyoqXG4gICAgLy8gKiBTdGVwcyBwbGF5YmFjay5cbiAgICAvLyAqIEBtZXRob2Qgc3RlcFJ1bnRpbWVcbiAgICAvLyAqL1xuICAgIC8vc3RlcFJ1bnRpbWU6IE5ZSSxcblxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgY3VycmVudCBydW5uaW5nIHJ1bnRpbWUgc2NlbmUuXG4gICAgICogQG1ldGhvZCBnZXRDdXJyZW50U2NlbmVOXG4gICAgICogQHJldHVybiB7UnVudGltZU5vZGV9XG4gICAgICovXG4gICAgZ2V0Q3VycmVudFNjZW5lTjogTllJLFxuXG4gICAgLyoqXG4gICAgICogU2V0IHRoZSBjdXJyZW50IHJ1bm5pbmcgcnVudGltZSBzY2VuZS5cbiAgICAgKiBAbWV0aG9kIF9zZXRDdXJyZW50U2NlbmVOXG4gICAgICogQHBhcmFtIHtSdW50aW1lTm9kZX1cbiAgICAgKi9cbiAgICBfc2V0Q3VycmVudFNjZW5lTjogTllJLFxuXG4gICAgLyoqXG4gICAgICogVGhpcyBtZXRob2Qgd2lsbCBiZSBpbnZva2Ugb25seSBpZiB1c2VEZWZhdWx0TWFpbkxvb3AgaXMgdHJ1ZS5cbiAgICAgKiBAbWV0aG9kIHRpY2tcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gZGVsdGFUaW1lXG4gICAgICogQHBhcmFtIHtib29sZWFufSB1cGRhdGVMb2dpY1xuICAgICAqL1xuICAgIHRpY2s6IGZ1bmN0aW9uIChkZWx0YVRpbWUsIHVwZGF0ZUxvZ2ljKSB7XG4gICAgICAgIGlmICh1cGRhdGVMb2dpYykge1xuICAgICAgICAgICAgdGhpcy51cGRhdGVSdW50aW1lKGRlbHRhVGltZSk7XG4gICAgICAgICAgICB0aGlzLmFuaW1hdGVSdW50aW1lKGRlbHRhVGltZSk7XG4gICAgICAgICAgICB0aGlzLmVtaXQoJ3Bvc3QtdXBkYXRlJyk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5yZW5kZXJSdW50aW1lKCk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFRoaXMgbWV0aG9kIHdpbGwgYmUgaW52b2tlZCBpbiBlZGl0IG1vZGUgZXZlbiBpZiB1c2VEZWZhdWx0TWFpbkxvb3AgaXMgZmFsc2UuXG4gICAgICogQG1ldGhvZCB0aWNrSW5FZGl0TW9kZVxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBkZWx0YVRpbWVcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IHVwZGF0ZUFuaW1hdGVcbiAgICAgKi9cbiAgICB0aWNrSW5FZGl0TW9kZTogZnVuY3Rpb24gKGRlbHRhVGltZSwgdXBkYXRlQW5pbWF0ZSkge1xuICAgICAgICBpZiAoRklSRV9FRElUT1IpIHtcbiAgICAgICAgICAgIGlmICh1cGRhdGVBbmltYXRlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hbmltYXRlUnVudGltZShkZWx0YVRpbWUpO1xuICAgICAgICAgICAgICAgIHRoaXMuZW1pdCgncG9zdC11cGRhdGUnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMucmVuZGVyUnVudGltZSgpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFBpY2sgbm9kZXMgdGhhdCBsaWUgd2l0aGluIGEgc3BlY2lmaWVkIHNjcmVlbiByZWN0YW5nbGUuXG4gICAgICogQG1ldGhvZCBnZXRJbnRlcnNlY3Rpb25MaXN0XG4gICAgICogQHBhcmFtIHtSZWN0fSByZWN0IC0gQW4gcmVjdGFuZ2xlIHNwZWNpZmllZCB3aXRoIHdvcmxkIGNvb3JkaW5hdGVzLlxuICAgICAqIEByZXR1cm4ge1J1bnRpbWVOb2RlW119XG4gICAgICovXG4gICAgZ2V0SW50ZXJzZWN0aW9uTGlzdDogTllJLFxuXG4gICAgLy8gUFVCTElDXG5cbiAgICAvKipcbiAgICAgKiBJbml0aWFsaXplIHRoZSBlbmdpbmUuIFRoaXMgbWV0aG9kIHdpbGwgYmUgY2FsbGVkIGJ5IGJvb3QuanMgb3IgZWRpdG9yLlxuICAgICAqIEBtZXRob2QgaW5pdFxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBvcHRpb25zXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IG9wdGlvbnMud2lkdGhcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gb3B0aW9ucy5oZWlnaHRcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy5yYXdVcmxcbiAgICAgKiBAcGFyYW0ge0NhbnZhc30gW29wdGlvbnMuY2FudmFzXVxuICAgICAqIEBwYXJhbSB7aW5pdENhbGxiYWNrfSBjYWxsYmFja1xuICAgICAqL1xuICAgIGluaXQ6IGZ1bmN0aW9uIChvcHRpb25zLCBjYWxsYmFjaykge1xuICAgICAgICBpZiAodGhpcy5faXNJbml0aWFsaXplZCkge1xuICAgICAgICAgICAgRmlyZS5lcnJvcignRW5naW5lIGFscmVhZHkgaW5pdGlhbGl6ZWQnKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9pc0luaXRpYWxpemVkID0gdHJ1ZTtcblxuICAgICAgICB0aGlzLl9zY2VuZUluZm9zID0gdGhpcy5fc2NlbmVJbmZvcy5jb25jYXQob3B0aW9ucy5zY2VuZXMpO1xuICAgICAgICBpZiAob3B0aW9ucy5yYXdVcmwpIHtcbiAgICAgICAgICAgIEZpcmUudXJsLnJhd1VybCA9IEZpcmUuUGF0aC5zZXRFbmRXaXRoU2VwKG9wdGlvbnMucmF3VXJsLCB0cnVlLCAnLycpO1xuICAgICAgICB9XG4gICAgICAgIC8vUmVzb3VyY2VzLl9yZXNCdW5kbGUuaW5pdChvcHRpb25zLnJlc0J1bmRsZSk7XG5cbiAgICAgICAgRmlyZS5SdW50aW1lLkhlbHBlcnMuaW5pdCgpO1xuXG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgdGhpcy5pbml0UnVudGltZShvcHRpb25zLCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICBpZiAoIWVycikge1xuICAgICAgICAgICAgICAgIGlmIChGSVJFX0VESVRPUiAmJiBFZGl0b3IuaXNQYWdlTGV2ZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIFJlZ2lzdGVyID0gcmVxdWlyZSgnLi4vcmVnaXN0ZXInKTtcbiAgICAgICAgICAgICAgICAgICAgUmVnaXN0ZXIucmVnaXN0ZXJUb0NvcmVMZXZlbCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvL3ZhciBzY2VuZSA9IFNjZW5lV3JhcHBlci5nZXRDdXJyZW50U2NlbmVOKClcbiAgICAgICAgICAgICAgICAvL2lmIChlZGl0b3JDYWxsYmFjay5vblNjZW5lTG9hZGVkKSB7XG4gICAgICAgICAgICAgICAgLy8gICAgZWRpdG9yQ2FsbGJhY2sub25TY2VuZUxvYWRlZCh0aGlzLl9zY2VuZSk7XG4gICAgICAgICAgICAgICAgLy99XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYWxsYmFjayhlcnIpO1xuXG4gICAgICAgICAgICBpZiAoRklSRV9FRElUT1IpIHtcbiAgICAgICAgICAgICAgICAvLyBzdGFydCBtYWluIGxvb3AgZm9yIGVkaXRvciBhZnRlciBpbml0aWFsaXplZFxuICAgICAgICAgICAgICAgIHNlbGYuX3RpY2tTdGFydCgpO1xuICAgICAgICAgICAgICAgIC8vIHN0YXJ0IHRpbWVyIHRvIGZvcmNlIHJlcGFpbnQgdGhlIHNjZW5lIGluIGVkaXQgbW9kZVxuICAgICAgICAgICAgICAgIHNlbGYuZm9yY2VSZXBhaW50SW50ZXJ2YWxJbkVNID0gc2VsZi5mb3JjZVJlcGFpbnRJbnRlcnZhbEluRU07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIGNyZWF0ZSBlbXB0eSBzY2VuZVxuICAgICAgICAgICAgdmFyIHNjZW5lID0gbmV3IChzZWxmLmdldEN1cnJlbnRTY2VuZSgpLmNvbnN0cnVjdG9yKSgpO1xuICAgICAgICAgICAgc2NlbmUub25BZnRlckRlc2VyaWFsaXplKCk7XG4gICAgICAgICAgICBzZWxmLl9lbXB0eVNjZW5lTiA9IHNjZW5lLnRhcmdldE47XG4gICAgICAgIH0pO1xuICAgIH0sXG5cbiAgICByZXBhaW50SW5FZGl0TW9kZTogZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoRklSRV9FRElUT1IgJiYgIXRoaXMuX2lzVXBkYXRpbmcpIHtcbiAgICAgICAgICAgIHRoaXMuX3Nob3VsZFJlcGFpbnRJbkVNID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvLyBPVkVSUklERVxuXG4gICAgb25FcnJvcjogZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgICAgIGlmIChGSVJFX0VESVRPUikge1xuICAgICAgICAgICAgc3dpdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICAgIGNhc2UgJ2FscmVhZHktcGxheWluZyc6XG4gICAgICAgICAgICAgICAgICAgIEZpcmUud2FybignRmlyZWJhbGwgaXMgYWxyZWFkeSBwbGF5aW5nJyk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcbiAgICBvblJlc3VtZTogZnVuY3Rpb24gKCkge1xuICAgICAgICAvLyBpZiAoRklSRV9FRElUT1IpIHtcbiAgICAgICAgLy8gICAgIEZPYmplY3QuX2NsZWFyRGVmZXJyZWREZXN0cm95VGltZXIoKTtcbiAgICAgICAgLy8gICAgIGVkaXRvckNhbGxiYWNrLm9uRW5naW5lUGxheWVkKHRydWUpO1xuICAgICAgICAvLyB9XG4gICAgICAgIHRoaXMucmVzdW1lUnVudGltZSgpO1xuXG4gICAgICAgIGlmIChGSVJFX0VESVRPUiAmJiAhdGhpcy5fdXNlRGVmYXVsdE1haW5Mb29wKSB7XG4gICAgICAgICAgICB0aGlzLl90aWNrU3RvcCgpO1xuICAgICAgICB9XG4gICAgfSxcbiAgICBvblBhdXNlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIC8vIGlmIChGSVJFX0VESVRPUikge1xuICAgICAgICAvLyAgICAgZWRpdG9yQ2FsbGJhY2sub25FbmdpbmVQYXVzZWQoKTtcbiAgICAgICAgLy8gfVxuICAgICAgICB0aGlzLnBhdXNlUnVudGltZSgpO1xuXG4gICAgICAgIGlmIChGSVJFX0VESVRPUikge1xuICAgICAgICAgICAgLy8gc3RhcnQgdGljayBmb3IgZWRpdCBtb2RlXG4gICAgICAgICAgICB0aGlzLl90aWNrU3RhcnQoKTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgb25QbGF5OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIC8vaWYgKEZJUkVfRURJVE9SICYmICEgdGhpcy5faXNQYXVzZWQpIHtcbiAgICAgICAgLy8gICAgRk9iamVjdC5fY2xlYXJEZWZlcnJlZERlc3Ryb3lUaW1lcigpO1xuICAgICAgICAvL31cblxuICAgICAgICB0aGlzLnBsYXlSdW50aW1lKCk7XG5cbiAgICAgICAgdGhpcy5fc2hvdWxkUmVwYWludEluRU0gPSBmYWxzZTtcbiAgICAgICAgaWYgKHRoaXMuX3VzZURlZmF1bHRNYWluTG9vcCkge1xuICAgICAgICAgICAgLy8gcmVzZXQgdGltZXIgZm9yIGRlZmF1bHQgbWFpbiBsb29wXG4gICAgICAgICAgICB2YXIgbm93ID0gVGlja2VyLm5vdygpO1xuICAgICAgICAgICAgVGltZS5fcmVzdGFydChub3cpO1xuICAgICAgICAgICAgLy9cbiAgICAgICAgICAgIGlmIChGSVJFX0VESVRPUikge1xuICAgICAgICAgICAgICAgIHRoaXMuX3RpY2tTdGFydCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKEZJUkVfRURJVE9SKSB7XG4gICAgICAgICAgICAvLyBkb250IHRpY2sgaW4gcGxheSBtb2RlXG4gICAgICAgICAgICB0aGlzLl90aWNrU3RvcCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy9pZiAoRklSRV9FRElUT1IpIHtcbiAgICAgICAgLy8gICAgZWRpdG9yQ2FsbGJhY2sub25FbmdpbmVQbGF5ZWQoZmFsc2UpO1xuICAgICAgICAvL31cbiAgICB9LFxuXG4gICAgb25TdG9wOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIC8vRk9iamVjdC5fZGVmZXJyZWREZXN0cm95KCk7XG5cbiAgICAgICAgdGhpcy5zdG9wUnVudGltZSgpO1xuXG4gICAgICAgIC8vIHJlc2V0IHN0YXRlc1xuICAgICAgICB0aGlzLl9sb2FkaW5nU2NlbmUgPSAnJzsgLy8gVE9ETzogd2hhdCBpZiBsb2FkaW5nIHNjZW5lID9cblxuICAgICAgICBpZiAoRklSRV9FRElUT1IpIHtcbiAgICAgICAgICAgIC8vIHN0YXJ0IHRpY2sgZm9yIGVkaXQgbW9kZVxuICAgICAgICAgICAgdGhpcy5yZXBhaW50SW5FZGl0TW9kZSgpO1xuICAgICAgICAgICAgdGhpcy5fdGlja1N0YXJ0KCk7XG4gICAgICAgIH1cblxuICAgICAgICAvL2lmIChGSVJFX0VESVRPUikge1xuICAgICAgICAvLyAgICBlZGl0b3JDYWxsYmFjay5vbkVuZ2luZVN0b3BwZWQoKTtcbiAgICAgICAgLy99XG4gICAgfSxcblxuICAgIC8vIFBSSVZBVEVcblxuICAgIC8qKlxuICAgICAqIEBtZXRob2QgX3RpY2tcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIF90aWNrOiBmdW5jdGlvbiAodW51c2VkKSB7XG4gICAgICAgIHRoaXMuX3JlcXVlc3RJZCA9IFRpY2tlci5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy5fYmluZGVkVGljayk7XG5cbiAgICAgICAgdmFyIG5vdyA9IFRpY2tlci5ub3coKTtcbiAgICAgICAgaWYgKHRoaXMuX2lzVXBkYXRpbmcgfHwgdGhpcy5fc3RlcE9uY2UpIHtcbiAgICAgICAgICAgIC8vIHBsYXkgbW9kZVxuXG4gICAgICAgICAgICAvL2lmIChzY2VuZUxvYWRpbmdRdWV1ZSkge1xuICAgICAgICAgICAgLy8gICAgcmV0dXJuO1xuICAgICAgICAgICAgLy99XG4gICAgICAgICAgICBUaW1lLl91cGRhdGUobm93LCBmYWxzZSwgdGhpcy5fc3RlcE9uY2UgPyAxIC8gNjAgOiAwKTtcbiAgICAgICAgICAgIHRoaXMuX3N0ZXBPbmNlID0gZmFsc2U7XG5cbiAgICAgICAgICAgIC8vaWYgKHRoaXMuX3NjZW5lKSB7XG4gICAgICAgICAgICAgICAgdGhpcy50aWNrKFRpbWUuZGVsdGFUaW1lLCB0cnVlKTtcbiAgICAgICAgICAgIC8vfVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKEZJUkVfRURJVE9SKSB7XG4gICAgICAgICAgICAvLyBlZGl0IG1vZGVcbiAgICAgICAgICAgIFRpbWUuX3VwZGF0ZShub3csIGZhbHNlLCB0aGlzLm1heERlbHRhVGltZUluRU0pO1xuICAgICAgICAgICAgaWYgKHRoaXMuX3Nob3VsZFJlcGFpbnRJbkVNIHx8IHRoaXMuYW5pbWF0aW5nSW5FZGl0TW9kZSkge1xuICAgICAgICAgICAgICAgIHRoaXMudGlja0luRWRpdE1vZGUoVGltZS5kZWx0YVRpbWUsIHRoaXMuYW5pbWF0aW5nSW5FZGl0TW9kZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5fc2hvdWxkUmVwYWludEluRU0gPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBfdGlja1N0YXJ0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0aGlzLl9yZXF1ZXN0SWQgPT09IC0xKSB7XG4gICAgICAgICAgICB0aGlzLl90aWNrKCk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgX3RpY2tTdG9wOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0aGlzLl9yZXF1ZXN0SWQgIT09IC0xKSB7XG4gICAgICAgICAgICBUaWNrZXIuY2FuY2VsQW5pbWF0aW9uRnJhbWUodGhpcy5fcmVxdWVzdElkKTtcbiAgICAgICAgICAgIHRoaXMuX3JlcXVlc3RJZCA9IC0xO1xuICAgICAgICB9XG4gICAgfVxufSk7XG5cbi8qKlxuICogQGV2ZW50IG5vZGUtYXR0YWNoLXRvLXNjZW5lXG4gKiBAcGFyYW0ge0N1c3RvbUV2ZW50fSBldmVudFxuICogQHBhcmFtIHtSdW50aW1lTm9kZX0gZXZlbnQuZGV0YWlsLnRhcmdldE5cbiAqIEBwcml2YXRlXG4gKi9cblxuLyoqXG4gKiBAZXZlbnQgbm9kZS1kZXRhY2gtZnJvbS1zY2VuZVxuICogQHBhcmFtIHtDdXN0b21FdmVudH0gZXZlbnRcbiAqIEBwYXJhbSB7UnVudGltZU5vZGV9IGV2ZW50LmRldGFpbC50YXJnZXROXG4gKiBAcHJpdmF0ZVxuICovXG5cbi8qKlxuICogQGV2ZW50IHBvc3QtdXBkYXRlXG4gKiBAcHJpdmF0ZVxuICovXG5cbi8qKlxuICogQGV2ZW50IHByZS1sYXVuY2gtc2NlbmVcbiAqIEBwcml2YXRlXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBFbmdpbmVXcmFwcGVyO1xuIiwiLyoqXG4gKiBAbW9kdWxlIEZpcmUuUnVudGltZVxuICovXG5cbnZhciBKUyA9IEZpcmUuSlM7XG52YXIgVmVjMiA9IEZpcmUuVmVjMjtcbnZhciBSZWN0ID0gRmlyZS5SZWN0O1xudmFyIFV0aWxzID0gcmVxdWlyZSgnLi91dGlscycpO1xudmFyIE5ZSSA9IFV0aWxzLk5ZSTtcbnZhciBOWUlfQWNjZXNzb3IgPSBVdGlscy5OWUlfQWNjZXNzb3I7XG52YXIgVXVpZCA9IHJlcXVpcmUoJy4vdXVpZCcpO1xuXG52YXIgSU5WSVNJQkxFID0ge1xuICAgIHZpc2libGU6IGZhbHNlXG59O1xuXG52YXIgRVJSX05hTiA9ICdUaGUgJXMgbXVzdCBub3QgYmUgTmFOJztcblxuLyoqXG4gKiAhI3poOiDov5nkuKrnsbvnlKjmnaXlsIHoo4XnvJbovpHlmajpkojlr7noioLngrnnmoTmk43kvZzjgIJcbiAqIE5vdGU6IOaOpeWPo+S4reS7pSBcIk5cIiDnu5PlsL7nmoTkvb/nlKjnmoTpg73mmK8gUnVudGltZSDnmoTljp/nlJ8gTm9kZSDnsbvlnovjgIJcbiAqICEjZW46IFRoaXMgaXMgYSB3cmFwcGVyIGNsYXNzIGZvciBvcGVyYXRpbmcgbm9kZSB3aXRoIGVkaXRvciBzY3JpcHRcbiAqIFRoZSBpbnN0YW5jZSBvZiB0aGlzIGNsYXNzIGlzIGEgd3JhcHBlciwgbm90IGEgbm9kZS5cbiAqIFlvdSBjYW4gdXNlIGBGaXJlKG5vZGUpYCB0byBnZXQgdGhlIHdyYXBwZXIgaWYgeW91IHJlYWxseSB3YW50IHRvXG4gKiB1c2UgdGhlc2UgQVBJIG9uIHJ1bnRpbWUgbm9kZXMuXG4gKiBOb3RlOiBBUEkgdGhhdCBoYXMgYSBzdWZmaXggXCJOXCIgcmV0dXJuIFJ1bnRpbWUncyBuYXRpdmUgTm9kZSB0eXBlXG4gKlxuICogWW91IHNob3VsZCBvdmVycmlkZTpcbiAqIC0gY3JlYXRlRW1wdHkgKHN0YXRpYylcbiAqIC0gbmFtZVxuICogLSBwYXJlbnROXG4gKiAtIGNoaWxkcmVuTlxuICogLSBwb3NpdGlvblxuICogLSB3b3JsZFBvc2l0aW9uXG4gKiAtIHJvdGF0aW9uXG4gKiAtIHdvcmxkUm90YXRpb25cbiAqIC0gc2NhbGVcbiAqIC0gd29ybGRTY2FsZVxuICogLSBnZXRXb3JsZEJvdW5kc1xuICogLSBnZXRXb3JsZE9yaWVudGVkQm91bmRzXG4gKiAtIHRyYW5zZm9ybVBvaW50c1xuICogLSBpbnZlcnNlVHJhbnNmb3JtUG9pbnRzXG4gKiAtIG9uQmVmb3JlU2VyaWFsaXplIChzbyB0aGF0IHRoZSBub2RlJ3MgcHJvcGVydGllcyBjYW4gYmUgc2VyaWFsaXplZCBpbiB3cmFwcGVyKVxuICogLSBjcmVhdGVOb2RlXG4gKlxuICogWW91IG1heSB3YW50IHRvIG92ZXJyaWRlOlxuICogLSBhbmltYXRhYmxlSW5FZGl0b3IgKHN0YXRpYylcbiAqIC0gc2V0U2libGluZ0luZGV4XG4gKiAtIGdldFNpYmxpbmdJbmRleFxuICogLSB4XG4gKiAtIHlcbiAqIC0gd29ybGRYXG4gKiAtIHdvcmxkWVxuICogLSBzY2FsZVhcbiAqIC0gc2NhbGVZXG4gKiAtIHNjZW5lUG9zaXRpb25cbiAqIC0gYXR0YWNoZWRcbiAqIC0gb25Gb2N1c0luRWRpdG9yXG4gKiAtIG9uTG9zdEZvY3VzSW5FZGl0b3JcbiAqXG4gKiBAY2xhc3MgTm9kZVdyYXBwZXJcbiAqIEBjb25zdHJ1Y3RvclxuICogQHBhcmFtIHtSdW50aW1lTm9kZX0gbm9kZVxuICovXG52YXIgTm9kZVdyYXBwZXIgPSBGaXJlLkNsYXNzKHtcbiAgICBuYW1lOiAnRmlyZS5SdW50aW1lLk5vZGVXcmFwcGVyJyxcbiAgICBleHRlbmRzOiBGaXJlLkZPYmplY3QsXG5cbiAgICBjb25zdHJ1Y3RvcjogZnVuY3Rpb24gKCkge1xuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIHRhcmdldE4gbm9kZSB0byB3cmFwLlxuICAgICAgICAgKiBAcHJvcGVydHkgdGFyZ2V0TlxuICAgICAgICAgKiBAdHlwZSB7UnVudGltZU5vZGV9XG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLnRhcmdldE4gPSBhcmd1bWVudHNbMF07XG4gICAgICAgIGlmICh0aGlzLnRhcmdldE4pIHtcbiAgICAgICAgICAgIHZhciB1dWlkID0gdGhpcy51dWlkO1xuICAgICAgICAgICAgaWYgKHV1aWQgJiYgRklSRV9FRElUT1IpIHtcbiAgICAgICAgICAgICAgICBGaXJlLmVuZ2luZS5hdHRhY2hlZFdyYXBwZXJzRm9yRWRpdG9yW3V1aWRdID0gdGhpcztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuYXR0YWNoZWQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZ2l6bW8gPSBudWxsO1xuICAgICAgICB0aGlzLm1peGluR2l6bW9zID0gW107XG5cbiAgICAgICAgLy9pZiAoRklSRV9FRElUT1IgJiYgIXRoaXMudGFyZ2V0Tikge1xuICAgICAgICAvLyAgICBGaXJlLndhcm4oJ3RhcmdldE4gb2YgJXMgbXVzdCBiZSBub24tbmlsJywgSlMuZ2V0Q2xhc3NOYW1lKHRoaXMpKTtcbiAgICAgICAgLy99XG4gICAgfSxcblxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgLy8vKipcbiAgICAgICAgLy8gKiBUaGUgY2xhc3MgSUQgb2YgYXR0YWNoZWQgc2NyaXB0LlxuICAgICAgICAvLyAqIEBwcm9wZXJ0eSBtaXhpbklkXG4gICAgICAgIC8vICogQHR5cGUge3N0cmluZ3xzdHJpbmdbXX1cbiAgICAgICAgLy8gKiBAZGVmYXVsdCBcIlwiXG4gICAgICAgIC8vICovXG4gICAgICAgIC8vbWl4aW5JZDoge1xuICAgICAgICAvLyAgICBkZWZhdWx0OiBcIlwiLFxuICAgICAgICAvLyAgICB2aXNpYmxlOiBmYWxzZVxuICAgICAgICAvL30sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSBuYW1lIG9mIHRoZSBub2RlLlxuICAgICAgICAgKiBAcHJvcGVydHkgbmFtZVxuICAgICAgICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgICAgICAgKi9cbiAgICAgICAgbmFtZToge1xuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICcnO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIHV1aWRcbiAgICAgICAgICogQHByb3BlcnR5IF9pZFxuICAgICAgICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAgKi9cbiAgICAgICAgX2lkOiB7XG4gICAgICAgICAgICBkZWZhdWx0OiAnJyxcbiAgICAgICAgICAgIGVkaXRvck9ubHk6IHRydWVcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogISNlbiB0aGUgVVVJRCwgbXVzdCBiZSB0eXBlIHN0cmluZywgZWRpdG9yIG9ubHlcbiAgICAgICAgICogISN6aCDoioLngrnnmoQgVVVJRO+8jOaYr+Wtl+espuS4suexu+Wei++8jOWPquiDveWcqOe8lui+keWZqOmHjOeUqFxuICAgICAgICAgKiBAcHJvcGVydHkgdXVpZFxuICAgICAgICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgICAgICAgKiBAcmVhZE9ubHlcbiAgICAgICAgICovXG4gICAgICAgIHV1aWQ6IHtcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9pZCB8fCAodGhpcy5faWQgPSBVdWlkKCkpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHZpc2libGU6IGZhbHNlXG4gICAgICAgIH0sXG5cbiAgICAgICAgLy8gSElFUkFSQ0hZXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSBydW50aW1lIHBhcmVudCBvZiB0aGUgbm9kZS5cbiAgICAgICAgICogSWYgdGhpcyBpcyB0aGUgdG9wIG1vc3Qgbm9kZSBpbiBoaWVyYXJjaHksIHRoZSB3cmFwcGVyIG9mIGl0cyBwYXJlbnQgbXVzdCBiZSB0eXBlIFNjZW5lV3JhcHBlci5cbiAgICAgICAgICogQ2hhbmdpbmcgdGhlIHBhcmVudCB3aWxsIGtlZXAgdGhlIHRyYW5zZm9ybSdzIGxvY2FsIHNwYWNlIHBvc2l0aW9uLCByb3RhdGlvbiBhbmQgc2NhbGUgdGhlIHNhbWUgYnV0IG1vZGlmeVxuICAgICAgICAgKiB0aGUgd29ybGQgc3BhY2UgcG9zaXRpb24sIHNjYWxlIGFuZCByb3RhdGlvbi5cbiAgICAgICAgICogQHByb3BlcnR5IHBhcmVudE5cbiAgICAgICAgICogQHR5cGUge1J1bnRpbWVOb2RlfVxuICAgICAgICAgKi9cbiAgICAgICAgcGFyZW50TjogTllJX0FjY2Vzc29yKG51bGwsIElOVklTSUJMRSksXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFJldHVybnMgdGhlIGFycmF5IG9mIGNoaWxkcmVuLiBJZiBubyBjaGlsZCwgdGhpcyBtZXRob2Qgc2hvdWxkIHJldHVybiBhbiBlbXB0eSBhcnJheS5cbiAgICAgICAgICogVGhlIHJldHVybnMgYXJyYXkgY2FuIGJlIG1vZGlmaWVkIE9OTFkgaW4gc2V0U2libGluZ0luZGV4LlxuICAgICAgICAgKiBAcHJvcGVydHkgY2hpbGRyZW5OXG4gICAgICAgICAqIEB0eXBlIHtSdW50aW1lTm9kZVtdfVxuICAgICAgICAgKiBAcmVhZE9ubHlcbiAgICAgICAgICovXG4gICAgICAgIGNoaWxkcmVuTjogTllJX0FjY2Vzc29yKFtdLCBJTlZJU0lCTEUsIHRydWUpLFxuXG4gICAgICAgIC8vIFRSQU5TRk9STVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgbG9jYWwgcG9zaXRpb24gaW4gaXRzIHBhcmVudCdzIGNvb3JkaW5hdGUgc3lzdGVtXG4gICAgICAgICAqIEBwcm9wZXJ0eSBwb3NpdGlvblxuICAgICAgICAgKiBAdHlwZSB7RmlyZS5WZWMyfVxuICAgICAgICAgKi9cbiAgICAgICAgcG9zaXRpb246IE5ZSV9BY2Nlc3NvcihWZWMyLnplcm8pLFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgbG9jYWwgeCBwb3NpdGlvbiBpbiBpdHMgcGFyZW50J3MgY29vcmRpbmF0ZSBzeXN0ZW1cbiAgICAgICAgICogQHByb3BlcnR5IHhcbiAgICAgICAgICogQHR5cGUge251bWJlcn1cbiAgICAgICAgICovXG4gICAgICAgIHg6IHtcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnBvc2l0aW9uLng7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICBpZiAoICFpc05hTih2YWx1ZSkgKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBwID0gdGhpcy5wb3NpdGlvbjtcbiAgICAgICAgICAgICAgICAgICAgcC54ID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucG9zaXRpb24gPSBwO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgRmlyZS5lcnJvcihFUlJfTmFOLCAnbmV3IHgnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdmlzaWJsZTogZmFsc2VcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIGxvY2FsIHkgcG9zaXRpb24gaW4gaXRzIHBhcmVudCdzIGNvb3JkaW5hdGUgc3lzdGVtXG4gICAgICAgICAqIEBwcm9wZXJ0eSB5XG4gICAgICAgICAqIEB0eXBlIHtudW1iZXJ9XG4gICAgICAgICAqL1xuICAgICAgICB5OiB7XG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5wb3NpdGlvbi55O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgaWYgKCAhaXNOYU4odmFsdWUpICkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgcCA9IHRoaXMucG9zaXRpb247XG4gICAgICAgICAgICAgICAgICAgIHAueSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBvc2l0aW9uID0gcDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIEZpcmUuZXJyb3IoRVJSX05hTiwgJ25ldyB5Jyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHZpc2libGU6IGZhbHNlXG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSBwb3NpdGlvbiBvZiB0aGUgdHJhbnNmb3JtIGluIHdvcmxkIHNwYWNlXG4gICAgICAgICAqIEBwcm9wZXJ0eSB3b3JsZFBvc2l0aW9uXG4gICAgICAgICAqIEB0eXBlIHtGaXJlLlZlYzJ9XG4gICAgICAgICAqL1xuICAgICAgICB3b3JsZFBvc2l0aW9uOiBOWUlfQWNjZXNzb3IoVmVjMi56ZXJvLCBJTlZJU0lCTEUpLFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgeCBwb3NpdGlvbiBvZiB0aGUgdHJhbnNmb3JtIGluIHdvcmxkIHNwYWNlXG4gICAgICAgICAqIEBwcm9wZXJ0eSB3b3JsZFhcbiAgICAgICAgICogQHR5cGUge251bWJlcn1cbiAgICAgICAgICovXG4gICAgICAgIHdvcmxkWDoge1xuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMud29ybGRQb3NpdGlvbi54O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgaWYgKCAhaXNOYU4odmFsdWUpICkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgcCA9IHRoaXMud29ybGRQb3NpdGlvbjtcbiAgICAgICAgICAgICAgICAgICAgcC54ID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMud29ybGRQb3NpdGlvbiA9IHA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBGaXJlLmVycm9yKEVSUl9OYU4sICduZXcgd29ybGRYJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHZpc2libGU6IGZhbHNlXG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSB5IHBvc2l0aW9uIG9mIHRoZSB0cmFuc2Zvcm0gaW4gd29ybGQgc3BhY2VcbiAgICAgICAgICogQHByb3BlcnR5IHdvcmxkWVxuICAgICAgICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgICAgICAgKi9cbiAgICAgICAgd29ybGRZOiB7XG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy53b3JsZFBvc2l0aW9uLnk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICBpZiAoICFpc05hTih2YWx1ZSkgKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBwID0gdGhpcy53b3JsZFBvc2l0aW9uO1xuICAgICAgICAgICAgICAgICAgICBwLnkgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy53b3JsZFBvc2l0aW9uID0gcDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIEZpcmUuZXJyb3IoRVJSX05hTiwgJ25ldyB3b3JsZFknKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdmlzaWJsZTogZmFsc2VcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIGNsb2Nrd2lzZSBkZWdyZWVzIG9mIHJvdGF0aW9uIHJlbGF0aXZlIHRvIHRoZSBwYXJlbnRcbiAgICAgICAgICogQHByb3BlcnR5IHJvdGF0aW9uXG4gICAgICAgICAqIEB0eXBlIHtudW1iZXJ9XG4gICAgICAgICAqL1xuICAgICAgICByb3RhdGlvbjogTllJX0FjY2Vzc29yKDAsIHtcbiAgICAgICAgICAgIHRvb2x0aXA6IFwiVGhlIGNsb2Nrd2lzZSBkZWdyZWVzIG9mIHJvdGF0aW9uIHJlbGF0aXZlIHRvIHRoZSBwYXJlbnRcIlxuICAgICAgICB9KSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIGNsb2Nrd2lzZSBkZWdyZWVzIG9mIHJvdGF0aW9uIGluIHdvcmxkIHNwYWNlXG4gICAgICAgICAqIEBwcm9wZXJ0eSB3b3JsZFJvdGF0aW9uXG4gICAgICAgICAqIEB0eXBlIHtudW1iZXJ9XG4gICAgICAgICAqL1xuICAgICAgICB3b3JsZFJvdGF0aW9uOiBOWUlfQWNjZXNzb3IoMCwgSU5WSVNJQkxFKSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIGxvY2FsIHNjYWxlIGZhY3RvciByZWxhdGl2ZSB0byB0aGUgcGFyZW50XG4gICAgICAgICAqIEBwcm9wZXJ0eSBzY2FsZVxuICAgICAgICAgKiBAdHlwZSB7RmlyZS5WZWMyfVxuICAgICAgICAgKi9cbiAgICAgICAgc2NhbGU6IE5ZSV9BY2Nlc3NvcihWZWMyLm9uZSksXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSBsb2NhbCB4IHNjYWxlIGZhY3RvciByZWxhdGl2ZSB0byB0aGUgcGFyZW50XG4gICAgICAgICAqIEBwcm9wZXJ0eSBzY2FsZVhcbiAgICAgICAgICogQHR5cGUge251bWJlcn1cbiAgICAgICAgICovXG4gICAgICAgIHNjYWxlWDoge1xuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2NhbGUueDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIGlmICggIWlzTmFOKHZhbHVlKSApIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHAgPSB0aGlzLnNjYWxlO1xuICAgICAgICAgICAgICAgICAgICBwLnggPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zY2FsZSA9IHA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBGaXJlLmVycm9yKEVSUl9OYU4sICduZXcgc2NhbGVYJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHZpc2libGU6IGZhbHNlXG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSBsb2NhbCB5IHNjYWxlIGZhY3RvciByZWxhdGl2ZSB0byB0aGUgcGFyZW50XG4gICAgICAgICAqIEBwcm9wZXJ0eSBzY2FsZVlcbiAgICAgICAgICogQHR5cGUge251bWJlcn1cbiAgICAgICAgICovXG4gICAgICAgIHNjYWxlWToge1xuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2NhbGUueTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIGlmICggIWlzTmFOKHZhbHVlKSApIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHAgPSB0aGlzLnNjYWxlO1xuICAgICAgICAgICAgICAgICAgICBwLnkgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zY2FsZSA9IHA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBGaXJlLmVycm9yKEVSUl9OYU4sICduZXcgc2NhbGVZJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHZpc2libGU6IGZhbHNlXG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSBsb3NzeSBzY2FsZSBvZiB0aGUgdHJhbnNmb3JtIGluIHdvcmxkIHNwYWNlIChSZWFkIE9ubHkpXG4gICAgICAgICAqIEBwcm9wZXJ0eSB3b3JsZFNjYWxlXG4gICAgICAgICAqIEB0eXBlIHtGaXJlLlZlYzJ9XG4gICAgICAgICAqIEByZWFkT25seVxuICAgICAgICAgKi9cbiAgICAgICAgd29ybGRTY2FsZTogTllJX0FjY2Vzc29yKFZlYzIub25lLCBJTlZJU0lCTEUsIHRydWUpLFxuXG4gICAgICAgIHJvb3Q6IHtcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHZhciBub2RlID0gdGhpcztcbiAgICAgICAgICAgICAgICB2YXIgbmV4dCA9IG5vZGUucGFyZW50O1xuICAgICAgICAgICAgICAgIHdoaWxlIChuZXh0KSB7XG4gICAgICAgICAgICAgICAgICAgIG5vZGUgPSBuZXh0O1xuICAgICAgICAgICAgICAgICAgICBuZXh0ID0gbmV4dC5wYXJlbnQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBub2RlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcblxuICAgIHN0YXRpY3M6IHtcbiAgICAgICAgLy8vKipcbiAgICAgICAgLy8gKiBDcmVhdGVzIGEgbmV3IG5vZGUgd2l0aG91dCBhbnkgcmVzb3VyY2VzLlxuICAgICAgICAvLyAqIEBtZXRob2QgY3JlYXRlRW1wdHlcbiAgICAgICAgLy8gKiBAcmV0dXJuIHtSdW50aW1lTm9kZX1cbiAgICAgICAgLy8gKiBAc3RhdGljXG4gICAgICAgIC8vICovXG4gICAgICAgIC8vY3JlYXRlRW1wdHk6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgLy8gICAgaWYgKEZJUkVfRURJVE9SKSB7XG4gICAgICAgIC8vICAgICAgICBGaXJlLmVycm9yKCdOb3QgeWV0IGltcGxlbWVudGVkJyk7XG4gICAgICAgIC8vICAgIH1cbiAgICAgICAgLy8gICAgcmV0dXJuIG51bGw7XG4gICAgICAgIC8vfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBJZiB0cnVlLCB0aGUgZW5naW5lIHdpbGwga2VlcCB1cGRhdGluZyB0aGlzIG5vZGUgaW4gNjAgZnBzIHdoZW4gaXQgaXMgc2VsZWN0ZWQsXG4gICAgICAgICAqIG90aGVyd2lzZSwgaXQgd2lsbCB1cGRhdGUgb25seSBpZiBuZWNlc3NhcnlcbiAgICAgICAgICogQHByb3BlcnR5IHtCb29sZWFufSBhbmltYXRhYmxlSW5FZGl0b3JcbiAgICAgICAgICogQGRlZmF1bHQgZmFsc2VcbiAgICAgICAgICogQHN0YXRpY1xuICAgICAgICAgKi9cbiAgICAgICAgYW5pbWF0YWJsZUluRWRpdG9yOiBmYWxzZSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogSWYgZmFsc2UsIEhpZXJhcmNoeSB3aWxsIGRpc2FsbG93IHRvIGRyYWcgY2hpbGQgaW50byB0aGlzIG5vZGUsIGFuZCBhbGwgY2hpbGRyZW4gd2lsbCBiZSBoaWRkZW4uXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7Qm9vbGVhbn0gY2FuSGF2ZUNoaWxkcmVuSW5FZGl0b3JcbiAgICAgICAgICogQGRlZmF1bHQgdHJ1ZVxuICAgICAgICAgKiBAc3RhdGljXG4gICAgICAgICAqL1xuICAgICAgICBjYW5IYXZlQ2hpbGRyZW5JbkVkaXRvcjogdHJ1ZVxuICAgIH0sXG5cbiAgICAvLyBTRVJJQUxJWkFUSU9OXG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgbmV3IG5vZGUgdXNpbmcgdGhlIHByb3BlcnRpZXMgZGVmaW5lZCBpbiB0aGlzIHdyYXBwZXIsIHRoZSBwcm9wZXJ0aWVzIHdpbGwgYmUgc2VyaWFsaXplZCBpbiB0aGUgc2NlbmUuXG4gICAgICogTm90ZTog5LiN6ZyA6KaB6K6+572u5paw6IqC54K555qE54i25a2Q5YWz57O777yM5Lmf5LiN6ZyA6KaB6K6+572uIHdyYXBwZXIg55qEIHRhcmdldE4g5Li65paw6IqC54K5LlxuICAgICAqIEBtZXRob2QgY3JlYXRlTm9kZVxuICAgICAqIEByZXR1cm4ge1J1bnRpbWVOb2RlfSAtIHRoZSBjcmVhdGVkIG5vZGVcbiAgICAgKi9cbiAgICBjcmVhdGVOb2RlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIE5ZSSgpO1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICog6L+Z5Liq5pa55rOV5Lya5Zyo5Zy65pmv5L+d5a2Y5YmN6LCD55So77yM5L2g5Y+v5Lul5bCGIG5vZGUg55qE5bGe5oCn5L+d5a2Y5YiwIHdyYXBwZXIg55qE5Y+v5bqP5YiX5YyW55qEIHByb3BlcnRpZXMg5Lit77yMXG4gICAgICog5Lul5L6/5ZyoIGNyZWF0ZU5vZGUoKSDmlrnms5XkuK3ph43mlrDorr7nva7lpb0gbm9kZeOAglxuICAgICAqIEBtZXRob2Qgb25CZWZvcmVTZXJpYWxpemVcbiAgICAgKi9cbiAgICBvbkJlZm9yZVNlcmlhbGl6ZTogZnVuY3Rpb24gKCkge1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgbmV3IG5vZGUgYW5kIGJpbmQgd2l0aCB0aGlzIHdyYXBwZXIuXG4gICAgICogQG1ldGhvZCBvbkFmdGVyRGVzZXJpYWxpemVcbiAgICAgKi9cbiAgICBvbkFmdGVyRGVzZXJpYWxpemU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIG5vZGUgPSB0aGlzLmNyZWF0ZU5vZGUoKTtcbiAgICAgICAgdGhpcy50YXJnZXROID0gbm9kZTtcbiAgICAgICAgbm9kZS5fRkJfd3JhcHBlciA9IHRoaXM7XG4gICAgICAgIGlmIChGSVJFX0VESVRPUikge1xuICAgICAgICAgICAgdmFyIHV1aWQgPSB0aGlzLnV1aWQ7XG4gICAgICAgICAgICBpZiAodXVpZCkge1xuICAgICAgICAgICAgICAgIEZpcmUuZW5naW5lLmF0dGFjaGVkV3JhcHBlcnNGb3JFZGl0b3JbdXVpZF0gPSB0aGlzO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuYXR0YWNoZWQoKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogSW52b2tlZCBhZnRlciB0aGUgd3JhcHBlcidzIHRhcmdldE4gaXMgYXNzaWduZWQuIE92ZXJyaWRlIHRoaXMgbWV0aG9kIGlmIHlvdSBuZWVkIHRvIGluaXRpYWxpemUgeW91ciBub2RlLlxuICAgICAqIEBtZXRob2QgYXR0YWNoZWRcbiAgICAgKi9cbiAgICBhdHRhY2hlZDogZnVuY3Rpb24gKCkge1xuICAgIH0sXG5cbiAgICAvLy8qKlxuICAgIC8vICogVGhpcyBtZXRob2QgaXMgY2FsbGVkIHdoZW4gdGhlIHNjZW5lIGlzIHNhdmluZywgYWxsb3dpbmcgeW91IHRvIHJldHVybiBKU09OIHRvIHJlcHJlc2VudCB0aGUgc3RhdGUgb2YgeW91ciBub2RlLlxuICAgIC8vICogV2hlbiB0aGUgc2NlbmUgaXMgbGF0ZXIgbG9hZGVkLCB0aGUgZGF0YSB5b3UgcmV0dXJuZWQgaXMgcGFzc2VkIHRvIHRoZSB3cmFwcGVyJ3MgZGVzZXJpYWxpemUgbWV0aG9kIHNvIHlvdSBjYW5cbiAgICAvLyAqIHJlc3RvcmUgdGhlIG5vZGUuXG4gICAgLy8gKiBAbWV0aG9kIHNlcmlhbGl6ZVxuICAgIC8vICogQHJldHVybiB7b2JqZWN0fSAtIGEgSlNPTiByZXByZXNlbnRzIHRoZSBzdGF0ZSBvZiB0aGUgdGFyZ2V0TiBub2RlXG4gICAgLy8gKi9cbiAgICAvL3NlcmlhbGl6ZTogZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAvLyAgICBpZiAoRklSRV9FRElUT1IpIHtcbiAgICAvLyAgICAgICAgRmlyZS5lcnJvcignTm90IHlldCBpbXBsZW1lbnRlZCcpO1xuICAgIC8vICAgIH1cbiAgICAvLyAgICByZXR1cm4gbnVsbDtcbiAgICAvL30sXG4gICAgLy9cbiAgICAvLy8qKlxuICAgIC8vICogQGNhbGxiYWNrIGRlc2VyaWFsaXplQ2FsbGJhY2tcbiAgICAvLyAqIEBwYXJhbSB7c3RyaW5nfSBlcnJvciAtIG51bGwgb3IgdGhlIGVycm9yIGluZm9cbiAgICAvLyAqIEBwYXJhbSB7UnVudGltZU5vZGV9IG5vZGUgLSB0aGUgbG9hZGVkIG5vZGUgb3IgbnVsbFxuICAgIC8vICovXG4gICAgLy9cbiAgICAvLy8qKlxuICAgIC8vICogQ3JlYXRlcyBhIG5ldyBub2RlIHVzaW5nIHRoZSBzdGF0ZSBkYXRhIGZyb20gdGhlIGxhc3QgdGltZSB0aGUgc2NlbmUgd2FzIHNlcmlhbGl6ZWQgaWYgdGhlIHdyYXBwZXIgaW1wbGVtZW50cyB0aGUgc2VyaWFsaXplKCkgbWV0aG9kLlxuICAgIC8vICogQG1ldGhvZCBkZXNlcmlhbGl6ZUFzeW5jXG4gICAgLy8gKiBAcGFyYW0ge29iamVjdH0gZGF0YSAtIHRoZSBKU09OIGRhdGEgcmV0dXJuZWQgZnJvbSBzZXJpYWxpemUoKSBtZXRob2RcbiAgICAvLyAqIEBwYXJhbSB7ZGVzZXJpYWxpemVDYWxsYmFja30gY2FsbGJhY2sgLSBTaG91bGQgbm90IGJlaW5nIGNhbGxlZCBpbiBjdXJyZW50IHRpY2suXG4gICAgLy8gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSWYgdGhlcmUncyBubyBhc3luYyBvcGVyYXRpb24sIHVzZSBGaXJlLm5leHRUaWNrIHRvIHNpbXVsYXRlLlxuICAgIC8vICovXG4gICAgLy9kZXNlcmlhbGl6ZUFzeW5jOiBmdW5jdGlvbiAoZGF0YSwgY2FsbGJhY2spIHtcbiAgICAvLyAgICBGaXJlLm5leHRUaWNrKGNhbGxiYWNrLCAnTm90IHlldCBpbXBsZW1lbnRlZCcsIG51bGwpO1xuICAgIC8vfSxcblxuICAgIC8vLyoqXG4gICAgLy8gKiBDcmVhdGVzIGEgbmV3IG5vZGUgdXNpbmcgdGhlIHN0YXRlIGRhdGEgZnJvbSB0aGUgbGFzdCB0aW1lIHRoZSBzY2VuZSB3YXMgc2VyaWFsaXplZCBpZiB0aGUgd3JhcHBlciBpbXBsZW1lbnRzIHRoZSBzZXJpYWxpemUoKSBtZXRob2QuXG4gICAgLy8gKiBAbWV0aG9kIGRlc2VyaWFsaXplXG4gICAgLy8gKiBAcGFyYW0ge29iamVjdH0gZGF0YSAtIHRoZSBKU09OIGRhdGEgcmV0dXJuZWQgZnJvbSBzZXJpYWxpemUoKSBtZXRob2RcbiAgICAvLyAqIEByZXR1cm4ge1J1bnRpbWVOb2RlfVxuICAgIC8vICovXG4gICAgLy9kZXNlcmlhbGl6ZTogZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAvLyAgICBpZiAoRklSRV9FRElUT1IpIHtcbiAgICAvLyAgICAgICAgRmlyZS5lcnJvcignTm90IHlldCBpbXBsZW1lbnRlZCcpO1xuICAgIC8vICAgIH1cbiAgICAvLyAgICByZXR1cm4gbnVsbDtcbiAgICAvL30sXG5cbiAgICAvLyBISUVSQVJDSFlcblxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgc2libGluZyBpbmRleC5cbiAgICAgKlxuICAgICAqIE5PVEU6IElmIHRoaXMgbm9kZSBkb2VzIG5vdCBoYXZlIHBhcmVudCBhbmQgbm90IGJlbG9uZ3MgdG8gdGhlIGN1cnJlbnQgc2NlbmUsXG4gICAgICogICAgICAgVGhlIHJldHVybiB2YWx1ZSB3aWxsIGJlIC0xXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIGdldFNpYmxpbmdJbmRleFxuICAgICAqIEByZXR1cm4ge251bWJlcn1cbiAgICAgKi9cbiAgICBnZXRTaWJsaW5nSW5kZXg6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIEZpcmUodGhpcy5wYXJlbnROKS5jaGlsZHJlbk4uaW5kZXhPZih0aGlzLnRhcmdldE4pO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBTZXQgdGhlIHNpYmxpbmcgaW5kZXggb2YgdGhpcyBub2RlLlxuICAgICAqICjlgLzotorlsI/otorlhYjmuLLmn5PvvIwtMSDku6PooajmnIDlkI7kuIDkuKopXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIHNldFNpYmxpbmdJbmRleFxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBpbmRleCAtIG5ldyB6ZXJvLWJhc2VkIGluZGV4IG9mIHRoZSBub2RlLCAtMSB3aWxsIG1vdmUgdG8gdGhlIGVuZCBvZiBjaGlsZHJlbi5cbiAgICAgKi9cbiAgICBzZXRTaWJsaW5nSW5kZXg6IGZ1bmN0aW9uIChpbmRleCkge1xuICAgICAgICB2YXIgc2libGluZ3MgPSBGaXJlKHRoaXMucGFyZW50TikuY2hpbGRyZW5OO1xuICAgICAgICB2YXIgaXRlbSA9IHRoaXMudGFyZ2V0TjtcbiAgICAgICAgaW5kZXggPSBpbmRleCAhPT0gLTEgPyBpbmRleCA6IHNpYmxpbmdzLmxlbmd0aCAtIDE7XG4gICAgICAgIHZhciBvbGRJbmRleCA9IHNpYmxpbmdzLmluZGV4T2YoaXRlbSk7XG4gICAgICAgIGlmIChpbmRleCAhPT0gb2xkSW5kZXgpIHtcbiAgICAgICAgICAgIHNpYmxpbmdzLnNwbGljZShvbGRJbmRleCwgMSk7XG4gICAgICAgICAgICBpZiAoaW5kZXggPCBzaWJsaW5ncy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBzaWJsaW5ncy5zcGxpY2UoaW5kZXgsIDAsIGl0ZW0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgc2libGluZ3MucHVzaChpdGVtKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvLyBUUkFOU0ZPUk1cblxuICAgIC8qKlxuICAgICAqIFJvdGF0ZXMgdGhpcyB0cmFuc2Zvcm0gdGhyb3VnaCBwb2ludCBpbiB3b3JsZCBzcGFjZSBieSBhbmdsZSBkZWdyZWVzLlxuICAgICAqIEBtZXRob2Qgcm90YXRlQXJvdW5kXG4gICAgICogQHBhcmFtIHtGaXJlLlZlYzJ9IHBvaW50IC0gdGhlIHdvcmxkIHBvaW50IHJvdGF0ZXMgdGhyb3VnaFxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBhbmdsZSAtIGRlZ3JlZXNcbiAgICAgKi9cbiAgICByb3RhdGVBcm91bmQ6IGZ1bmN0aW9uIChwb2ludCwgYW5nbGUpIHtcbiAgICAgICAgdmFyIGRlbHRhID0gdGhpcy53b3JsZFBvc2l0aW9uLnN1YlNlbGYocG9pbnQpO1xuICAgICAgICBkZWx0YS5yb3RhdGVTZWxmKE1hdGguZGVnMnJhZChhbmdsZSkpO1xuICAgICAgICB0aGlzLndvcmxkUG9zaXRpb24gPSBwb2ludC5hZGRTZWxmKGRlbHRhKTtcbiAgICAgICAgdGhpcy5yb3RhdGlvbiArPSBhbmdsZTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogVHJhbnNmb3JtcyBwb3NpdGlvbiBmcm9tIGxvY2FsIHNwYWNlIHRvIHdvcmxkIHNwYWNlLlxuICAgICAqIEBtZXRob2QgdHJhbnNmb3JtUG9pbnRUb1dvcmxkXG4gICAgICogQHBhcmFtIHtWZWMyfSBwb2ludFxuICAgICAqIEByZXR1cm4ge1ZlYzJ9XG4gICAgICovXG4gICAgdHJhbnNmb3JtUG9pbnRUb1dvcmxkOiBOWUksXG5cbiAgICAvKipcbiAgICAgKiBUcmFuc2Zvcm1zIHBvc2l0aW9uIGZyb20gbG9jYWwgc3BhY2UgdG8gd29ybGQgc3BhY2UuXG4gICAgICogQG1ldGhvZCB0cmFuc2Zvcm1Qb2ludFRvTG9jYWxcbiAgICAgKiBAcGFyYW0ge1ZlYzJ9IHBvaW50XG4gICAgICogQHJldHVybiB7VmVjMn1cbiAgICAgKi9cbiAgICB0cmFuc2Zvcm1Qb2ludFRvTG9jYWw6IE5ZSSxcblxuICAgIC8vIFJFTkRFUkVSXG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGEgXCJ3b3JsZFwiIGF4aXMgYWxpZ25lZCBib3VuZGluZyBib3goQUFCQikgb2YgdGhlIHJlbmRlcmVyLlxuICAgICAqXG4gICAgICogQG1ldGhvZCBnZXRXb3JsZEJvdW5kc1xuICAgICAqIEBwYXJhbSB7RmlyZS5SZWN0fSBbb3V0XSAtIG9wdGlvbmFsLCB0aGUgcmVjZWl2aW5nIHJlY3RcbiAgICAgKiBAcmV0dXJuIHtGaXJlLlJlY3R9IC0gdGhlIHJlY3QgcmVwcmVzZW50ZWQgaW4gd29ybGQgcG9zaXRpb25cbiAgICAgKi9cbiAgICBnZXRXb3JsZEJvdW5kczogZnVuY3Rpb24gKG91dCkge1xuICAgICAgICBOWUkoKTtcbiAgICAgICAgcmV0dXJuIG5ldyBSZWN0KCk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYSBcIndvcmxkXCIgb3JpZW50ZWQgYm91bmRpbmcgYm94KE9CQikgb2YgdGhlIHJlbmRlcmVyLlxuICAgICAqXG4gICAgICogQG1ldGhvZCBnZXRXb3JsZE9yaWVudGVkQm91bmRzXG4gICAgICogQHBhcmFtIHtGaXJlLlZlYzJ9IFtvdXRfYmxdIC0gb3B0aW9uYWwsIHRoZSB2ZWN0b3IgdG8gcmVjZWl2ZSB0aGUgd29ybGQgcG9zaXRpb24gb2YgYm90dG9tIGxlZnRcbiAgICAgKiBAcGFyYW0ge0ZpcmUuVmVjMn0gW291dF90bF0gLSBvcHRpb25hbCwgdGhlIHZlY3RvciB0byByZWNlaXZlIHRoZSB3b3JsZCBwb3NpdGlvbiBvZiB0b3AgbGVmdFxuICAgICAqIEBwYXJhbSB7RmlyZS5WZWMyfSBbb3V0X3RyXSAtIG9wdGlvbmFsLCB0aGUgdmVjdG9yIHRvIHJlY2VpdmUgdGhlIHdvcmxkIHBvc2l0aW9uIG9mIHRvcCByaWdodFxuICAgICAqIEBwYXJhbSB7RmlyZS5WZWMyfSBbb3V0X2JyXSAtIG9wdGlvbmFsLCB0aGUgdmVjdG9yIHRvIHJlY2VpdmUgdGhlIHdvcmxkIHBvc2l0aW9uIG9mIGJvdHRvbSByaWdodFxuICAgICAqIEByZXR1cm4ge0ZpcmUuVmVjMn0gLSB0aGUgYXJyYXkgY29udGFpbnMgdmVjdG9ycyByZXByZXNlbnRlZCBpbiB3b3JsZCBwb3NpdGlvbixcbiAgICAgKiAgICAgICAgICAgICAgICAgICAgaW4gdGhlIHNlcXVlbmNlIG9mIEJvdHRvbUxlZnQsIFRvcExlZnQsIFRvcFJpZ2h0LCBCb3R0b21SaWdodFxuICAgICAqL1xuICAgIGdldFdvcmxkT3JpZW50ZWRCb3VuZHM6IGZ1bmN0aW9uIChvdXRfYmwsIG91dF90bCwgb3V0X3RyLCBvdXRfYnIpe1xuICAgICAgICBOWUkoKTtcbiAgICAgICAgcmV0dXJuIFtWZWMyLnplcm8sIFZlYzIuemVybywgVmVjMi56ZXJvLCBWZWMyLnplcm9dO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBAbWV0aG9kIG9uRm9jdXNJbkVkaXRvclxuICAgICAqL1xuICAgIG9uRm9jdXNJbkVkaXRvcjogbnVsbCxcblxuICAgIC8qKlxuICAgICAqIEBtZXRob2Qgb25Mb3N0Rm9jdXNJbkVkaXRvclxuICAgICAqL1xuICAgIG9uTG9zdEZvY3VzSW5FZGl0b3I6IG51bGwsXG59KTtcblxuRmlyZS5fc2V0V3JhcHBlckdldHRlcihmdW5jdGlvbiAobm9kZSkge1xuICAgIGlmIChub2RlIGluc3RhbmNlb2YgTm9kZVdyYXBwZXIpIHtcbiAgICAgICAgRmlyZS53YXJuKCdGaXJlIGFjY2VwdCBhcmd1bWVudCBvZiB0eXBlIHJ1bnRpbWUgbm9kZSwgbm90IHdyYXBwZXIuJyk7XG4gICAgICAgIHJldHVybiBub2RlO1xuICAgIH1cbiAgICBpZiAoIW5vZGUpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHZhciB3cmFwcGVyID0gbm9kZS5fRkJfd3JhcHBlcjtcbiAgICBpZiAoIXdyYXBwZXIpIHtcbiAgICAgICAgdmFyIFdyYXBwZXIgPSBGaXJlLmdldFdyYXBwZXJUeXBlKG5vZGUpO1xuICAgICAgICBpZiAoIVdyYXBwZXIpIHtcbiAgICAgICAgICAgIHZhciBnZXRDbGFzc05hbWUgPSBGaXJlLkpTLmdldENsYXNzTmFtZTtcbiAgICAgICAgICAgIEZpcmUuZXJyb3IoJyVzIG5vdCByZWdpc3RlcmVkIGZvciAlcycsIGdldENsYXNzTmFtZShOb2RlV3JhcHBlciksIGdldENsYXNzTmFtZShub2RlKSk7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICB3cmFwcGVyID0gbmV3IFdyYXBwZXIobm9kZSk7XG4gICAgICAgIG5vZGUuX0ZCX3dyYXBwZXIgPSB3cmFwcGVyO1xuICAgIH1cbiAgICByZXR1cm4gd3JhcHBlcjtcbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IE5vZGVXcmFwcGVyO1xuIiwiLyoqXG4gKiBAbW9kdWxlIEZpcmUuUnVudGltZVxuICovXG5cbnZhciBOb2RlV3JhcHBlciA9IHJlcXVpcmUoJy4vbm9kZScpO1xudmFyIE5ZSSA9IHJlcXVpcmUoJy4vdXRpbHMnKS5OWUk7XG5cbi8qKlxuICogWW91IHNob3VsZCBvdmVycmlkZTpcbiAqIC0gY2hpbGRyZW5OXG4gKiAtIGNyZWF0ZU5vZGVcbiAqIC0gcG9zaXRpb25cbiAqIC0gc2NhbGVcbiAqXG4gKiBZb3UgbWF5IHdhbnQgdG8gb3ZlcnJpZGU6XG4gKiAtIG9uQmVmb3JlU2VyaWFsaXplIChzbyB0aGF0IHRoZSBzY2VuZSdzIHByb3BlcnRpZXMgY2FuIGJlIHNlcmlhbGl6ZWQgaW4gd3JhcHBlcilcbiAqIC0gcHJlbG9hZEFzc2V0cyAoc28gdGhhdCBzY2VuZSBjYW4gbG9hZCBzeW5jaHJvbm91c2x5KVxuICpcbiAqIEBjbGFzcyBTY2VuZVdyYXBwZXJcbiAqIEBleHRlbmRzIE5vZGVXcmFwcGVyXG4gKiBAY29uc3RydWN0b3JcbiAqIEBwYXJhbSB7UnVudGltZU5vZGV9IG5vZGUgLSBUaGUgcm9vdCBub2RlIG9mIGN1cnJlbnQgc3RhZ2UuXG4gKi9cbnZhciBTY2VuZVdyYXBwZXIgPSBGaXJlLkNsYXNzKHtcbiAgICBuYW1lOiAnRmlyZS5SdW50aW1lLlNjZW5lV3JhcHBlcicsXG4gICAgZXh0ZW5kczogTm9kZVdyYXBwZXIsXG4gICAgY29uc3RydWN0b3I6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5fZGF0YVRvRGVzZXJpYWxpemUgPSBudWxsO1xuICAgIH0sXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIHBhcmVudE46IHtcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGlmIChGSVJFX0RFVikge1xuICAgICAgICAgICAgICAgICAgICBGaXJlLmVycm9yKFwiRGlzYWxsb3cgdG8gc2V0IHNjZW5lJ3MgcGFyZW50LlwiKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHNjZW5lUG9zaXRpb246IHtcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgRmlyZS5WZWMyKDAsIDApO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIEZpcmUuZXJyb3IoXCJEaXNhbGxvdyB0byBzZXQgc2NlbmUncyBzY2VuZVBvc2l0aW9uLlwiKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB2aXNpYmxlOiBmYWxzZVxuICAgICAgICB9XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgbG9jYWwgcG9zaXRpb24gaW4gaXRzIHBhcmVudCdzIGNvb3JkaW5hdGUgc3lzdGVtLlxuICAgICAgICAgKiBUaGlzIGlzIHVzZWQgdG8gc2ltdWxhdGUgdGhlIHBhbm5pbmcgb2YgcHJldmlldyBjYW1lcmEgaW4gZWRpdCBtb2RlLlxuICAgICAgICAgKiBAcHJvcGVydHkgcG9zaXRpb25cbiAgICAgICAgICogQHR5cGUge0ZpcmUuVmVjMn1cbiAgICAgICAgICovXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgbG9jYWwgc2NhbGUgZmFjdG9yIHJlbGF0aXZlIHRvIHRoZSBwYXJlbnQuXG4gICAgICAgICAqIFRoaXMgaXMgdXNlZCB0byBzaW11bGF0ZSB0aGUgem9vbSBpbiBhbmQgb3V0IG9mIHByZXZpZXcgY2FtZXJhIGluIGVkaXQgbW9kZS5cbiAgICAgICAgICogQHByb3BlcnR5IHNjYWxlXG4gICAgICAgICAqIEB0eXBlIHtGaXJlLlZlYzJ9XG4gICAgICAgICAqL1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBQcmVsb2FkIGFzc2V0cyBiZWZvcmUgc2NlbmUgbG9hZGluZy5cbiAgICAgKiBAbWV0aG9kIHByZWxvYWRBc3NldHNcbiAgICAgKiBAcGFyYW0ge0ZpcmUuQXNzZXRbXX0gYXNzZXRzXG4gICAgICogQHBhcmFtIHtmdW5jdGlvbn0gY2FsbGJhY2tcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gY2FsbGJhY2suZXJyb3JcbiAgICAgKi9cbiAgICBwcmVsb2FkQXNzZXRzOiBmdW5jdGlvbiAoYXNzZXRzLCBjYWxsYmFjaykge1xuICAgICAgICBjYWxsYmFjaygpO1xuICAgIH0sXG5cbiAgICBnZXRTaWJsaW5nSW5kZXg6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIDA7XG4gICAgfSxcblxuICAgIHNldFNpYmxpbmdJbmRleDogZnVuY3Rpb24gKGluZGV4KSB7XG4gICAgICAgIGlmIChGSVJFX0RFVikge1xuICAgICAgICAgICAgaWYgKGluZGV4ICE9PSAwKSB7XG4gICAgICAgICAgICAgICAgRmlyZS5lcnJvcihcIkRpc2FsbG93IHRvIGNoYW5nZSBzY2VuZSdzIHNpYmxpbmcgaW5kZXguXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gU2NlbmVXcmFwcGVyO1xuIiwidmFyIEpTID0gRmlyZS5KUztcblxuZnVuY3Rpb24gTllJICgpIHtcbiAgICBpZiAoRklSRV9FRElUT1IpIHtcbiAgICAgICAgRmlyZS5pbmZvKCdOb3QgeWV0IGltcGxlbWVudGVkJyk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBOWUlfQWNjZXNzb3IgKGRlZlZhbCwgYXR0cnMsIG5vU2V0dGVyKSB7XG4gICAgdmFyIHByb3AgPSB7XG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgTllJKCk7XG4gICAgICAgICAgICByZXR1cm4gZGVmVmFsO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBpZiAoIW5vU2V0dGVyKSB7XG4gICAgICAgIHByb3Auc2V0ID0gTllJO1xuICAgIH1cbiAgICBpZiAoYXR0cnMpIHtcbiAgICAgICAgcmV0dXJuIEpTLm1peGluKHByb3AsIGF0dHJzKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHJldHVybiBwcm9wO1xuICAgIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgTllJOiBOWUksXG4gICAgTllJX0FjY2Vzc29yOiBOWUlfQWNjZXNzb3Jcbn07XG4iLCJpZiAoRklSRV9URVNUKSB7XG4gICAgbW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiAnJyArICgobmV3IERhdGUoKSkuZ2V0VGltZSgpICsgTWF0aC5yYW5kb20oKSk7XG4gICAgfTtcbn1cbmVsc2UgaWYgKEZJUkVfRURJVE9SKSB7XG4gICAgdmFyIFV1aWQgPSByZXF1aXJlKCdub2RlLXV1aWQnKTtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHV1aWQgPSBVdWlkLnY0KCk7XG4gICAgICAgIHJldHVybiBFZGl0b3IuY29tcHJlc3NVdWlkKHV1aWQpO1xuICAgIH07XG59XG5lbHNlIHtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgRmlyZS5lcnJvcignQ2FuIG9ubHkgdXNlIHV1aWQgaW5zaWRlIGVkaXRvci4nKTtcbiAgICAgICAgcmV0dXJuICcnO1xuICAgIH07XG59XG4iXX0=

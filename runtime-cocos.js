(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
window.Runtime = {};

require('./share/asset');
require('./page');

},{"./page":5,"./share/asset":13}],2:[function(require,module,exports){

var NodeWrapper = require('./node');

var ButtonWrapper = Fire.Class({
    name: 'Runtime.ButtonWrapper',
    extends: NodeWrapper,

    constructor: function () {
        this._normalTexToLoad = '';
        this._pressedTexToLoad = '';
        this._disabledTexToLoad = '';
    },

    properties: {
        _normalTexture: {
            get: function () {
                if (!this.targetN._buttonNormalRenderer) {
                    return '';
                }
                var texture = this.targetN._buttonNormalRenderer.texture;
                return texture ? texture.url : '';
            },
            set: function ( value ) {
                if (this.targetN) {
                    this.targetN.loadTextureNormal( value );
                }
                else {
                    this._normalTexToLoad = value;
                }
            },
            visible: true,
            url: Fire.Texture
        },

        _pressedTexture: {
            get: function () {
                if (!this.targetN._buttonClickedRenderer) {
                    return '';
                }
                var texture = this.targetN._buttonClickedRenderer.texture;
                return texture ? texture.url : '';
            },
            set: function ( value ) {
                if (this.targetN) {
                    this.targetN.loadTexturePressed( value );
                }
                else {
                    this._pressedTexToLoad = value;
                }
            },
            visible: true,
            url: Fire.Texture
        },

        _disabledTexture: {
            get: function () {
                if (!this.targetN._buttonDisableRenderer) {
                    return '';
                }
                var texture = this.targetN._buttonDisableRenderer.texture;
                return texture ? texture.url : '';
            },
            set: function ( value ) {
                if (this.targetN) {
                    this.targetN.loadTextureDisabled( value );
                }
                else {
                    this._disabledTexToLoad = value;
                }
            },
            visible: true,
            url: Fire.Texture
        },

        text: {
            get: function () {
                return this.targetN.titleText;
            },
            set: function (value) {
                if (typeof value === 'string') {
                    this.targetN.titleText = value;
                }
                else {
                    Fire.error('The new text must be String');
                }
            }
        },

        fontSize: {
            get: function () {
                return this.targetN.titleFontSize;
            },
            set: function (value) {
                if ( !isNaN(value) ) {
                    this.targetN.titleFontSize = value;
                }
                else {
                    Fire.error('The new fontSize must not be NaN');
                }
            }
        },

        font: {
            set: function (value) {
                if (!value || value instanceof Fire.TTFFont) {
                    this._font = value;
                    this._setFontToNode(value);
                }
                else {
                    Fire.error('The new font must be Fire.TTFFont');
                }
            }
        },

        fontUuid: {
            get: function () {
                return this._font ? this._font._uuid : '';
            },
            set: function (value) {
                if (value) {
                    var self = this;
                    Fire.AssetLibrary.loadAsset(value, function (err, asset) {
                        if (err) {
                            Fire.error('Failed to load font from uuid, ' + err);
                        }
                        else {
                            self.font = asset;
                        }
                    });
                }
                else {
                    this.font = null;
                }
            },
            displayName: 'Font',
            type: Fire.TTFFont
        },

        fontFamily: {
            get: function () {
                return this.targetN.titleFontName;
            },
            set: function (value) {
                if (typeof value === 'string') {
                    this.targetN.titleFontName = value;
                }
                else {
                    Fire.error('The new fontFamily must be String');
                }
            }
        },

        _text: {
            default: 'Button'
        },

        _fontSize: {
            default: 16
        },

        _font: {
            default: null
        },

        _fontFamily: {
            default: null
        }
    },

    statics: {
    },

    _setFontToNode: function(fontAsset, node) {
        node = node ? node : this.targetN;

        if (fontAsset) {
            var config = {type:'font', name: fontAsset.fontFamily, srcs:[fontAsset.url]};
            cc.loader.load(config, function (err, results) {
                if (err) throw err;

                node.titleFontName = config.name;
            });
        }
    },

    onBeforeSerialize: function () {
        NodeWrapper.prototype.onBeforeSerialize.call(this);

        this._text = this.text;
        this._fontSize = this.fontSize;
        this._font = this.fontUuid ? Editor.serialize.asAsset(this.fontUuid) : null;
        this._fontFamily = this.fontFamily;
    },

    createNode: function (node) {

        node = node || new ccui.Button( this._normalTexToLoad, this._pressedTexToLoad, this._disabledTexToLoad );

        this._normalTexToLoad = this._pressedTexToLoad = this._disabledTexToLoad = '';

        NodeWrapper.prototype.createNode.call(this, node);

        node.titleText = this._text;
        node.titleFontSize = this._fontSize;
        node.titleFontName = this._fontFamily === null ? node.titleFontName : this._fontFamily;

        this._setFontToNode(this._font, node);

        return node;
    }
});

module.exports = ButtonWrapper;

},{"./node":6}],3:[function(require,module,exports){

var TextAlign = Runtime.TextAlign;
var TextAnchor = Runtime.TextAnchor;

var getAnchorPoint = (function () {
    var Anchor2Point = new Array(TextAnchor.BottomRight + 1);
    Anchor2Point[TextAnchor.TopLeft]      = cc.p(0,   1);
    Anchor2Point[TextAnchor.TopCenter]    = cc.p(0.5, 1);
    Anchor2Point[TextAnchor.TopRight]     = cc.p(1,   1);
    Anchor2Point[TextAnchor.MiddleLeft]   = cc.p(0,   0.5);
    Anchor2Point[TextAnchor.MiddleCenter] = cc.p(0.5, 0.5);
    Anchor2Point[TextAnchor.MiddleRight]  = cc.p(1,   0.5);
    Anchor2Point[TextAnchor.BottomLeft]   = cc.p(0,   0);
    Anchor2Point[TextAnchor.BottomCenter] = cc.p(0.5, 0);
    Anchor2Point[TextAnchor.BottomRight]  = cc.p(1,   0);

    return (function (textAnchor) {
        var anchorPoint = Anchor2Point[textAnchor];
        return cc.p(anchorPoint);
    });
})();


var NodeWrapper = require('./node');

var BitmapFontWrapper = Fire.Class({
    name: 'Runtime.BitmapFontWrapper',
    extends: NodeWrapper,

    constructor: function () {
        this._bitmapFontToLoad = '';
    },

    properties: {

        _bitmapFont: {
            get: function () {
                return this.targetN._fntFile || '';
            },
            set: function (value) {
                this._bitmapFontToLoad = value;

                if (this.targetN) {
                    this.targetN._fntFile = value;

                    this.onBeforeSerialize();
                    this.createNode(this.targetN);
                }
            },
            visible: true,
            url: Fire.BitmapFont
        },

        text: {
            get: function () {
                return this.targetN.string;
            },
            set: function ( value ) {
                if (typeof value === 'string') {
                    this.targetN.string = value;
                }
                else {
                    Fire.error('The new text must be string');
                }
            }
        },

        anchor: {
            get: function () {
                return this._anchor;
            },
            set: function ( value ) {
                if (typeof value === 'number') {
                    this._anchor = value;

                    var anchorPoint = getAnchorPoint(value);
                    this.targetN.setAnchorPoint( anchorPoint );
                }
                else {
                    Fire.error('The new text must be number');
                }
            },
            type: TextAnchor
        },

        align: {
            get: function () {
                return this.targetN.textAlign;
            },
            set: function ( value ) {
                if (typeof value === 'number') {
                    this.targetN.textAlign = value;
                }
                else {
                    Fire.error('The new text must be number');
                }
            },
            type: TextAlign
        },

        childrenN: {
            get: function () {
                return [];
            },
        },


        _text: {
            default: ""
        },

        _anchor: {
            default: TextAnchor.MiddleCenter
        },

        _align: {
            default: TextAlign.Left
        }
    },

    statics: {
        canHaveChildrenInEditor: false
    },

    onBeforeSerialize: function () {
        NodeWrapper.prototype.onBeforeSerialize.call(this);

        this._text = this.text;
        this._anchor = this.anchor;
        this._align = this.align;
    },

    createNode: function (node) {
        node = node || new cc.LabelBMFont();

        NodeWrapper.prototype.createNode.call(this, node);

        var bitmapFontUrl;

        if ( this._bitmapFontToLoad ) {
            bitmapFontUrl = this._bitmapFontToLoad;
            this._bitmapFontToLoad = '';
        }

        if ( bitmapFontUrl ) {
            cc.loader.load( bitmapFontUrl, function (err, results) {
                node.initWithString(this._text, bitmapFontUrl);
                node.setAnchorPoint( getAnchorPoint(this._anchor) );
                node.textAlign = this._align;
            }.bind(this));
        }
        else {
            node.setAnchorPoint( getAnchorPoint(this._anchor) );
            node.textAlign = this._align;
        }

        return node;
    }
});

module.exports = BitmapFontWrapper;

},{"./node":6}],4:[function(require,module,exports){

var EngineWrapper = Fire.Class({
    name: 'Runtime.EngineWrapper',
    extends: Fire.Runtime.EngineWrapper,
    constructor: function () {
    },

    properties: {
        canvasSize: {
            get: function () {
                var size = cc.view.getVisibleSize()
                return new Fire.Vec2(size.width, size.height);
            },
            set: function (value) {
                var width = value.x;
                var height = value.y;

                var view = cc.view;

                view.setDesignResolutionSize(width, height, view._resolutionPolicy);
            }
        },

        _needAnimate: false,
        _needRender: true,
    },

    initRuntime: function (options, callback) {
        var width  = options.width  || 800;
        var height = options.height || 600;
        var canvas = options.canvas;
        var id     = 'gameCanvas';

        if ( canvas.id ) {
            id = canvas.id;
        }
        else {
            canvas.id = id;
        }

        var self = this;

        if (document) {
            document.ccConfig = {
                'width'         : width,
                'height'        : height,
                'debugMode'     : 1,
                'showFPS'       : false,
                'frameRate'     : 60,
                'id'            : id,
                'renderMode'    : 2,                 // 0: auto, 1:Canvas, 2:Webgl
                'jsList'        : []
            };
        }

        cc.game._initConfig();

        cc.game.onStart = function () {
            var scene = new cc.Scene();

            // scene anchor point need be 0,0
            scene.setAnchorPoint(0.0, 0.0);

            cc.view.setResolutionPolicy( cc.ResolutionPolicy.SHOW_ALL );
            self._setCurrentSceneN(scene);

            // dont update logic before rendering
            // cc.director.pause();
            cc.director._paused = true;

            // set cocos canvas tabindex to -1 in edit mode
            cc._canvas.setAttribute('tabindex', -1);
            cc._canvas.style.backgroundColor = '';
            if (cc.imeDispatcher && cc.imeDispatcher._domInputControl) {
                cc.imeDispatcher._domInputControl.setAttribute('tabindex', -1);
            }

            self.canvasSize = new Fire.Vec2(width, height);

            self._registerStepRuntime();

            if (callback) {
                callback();
            }
        };

        // dont register event otherwise cocos will block event's propagation in edit mode.
        this._dontRegisterSystemEvent();

        cc.game.run();

    },

    playRuntime: function () {
        this._registerCocosSystemEvent(cc._canvas);

        // playing mode need 60 FPS
        // cc.game.setFrameRate(60);

        // reset cocos tabindex in playing mode
        cc._canvas.setAttribute('tabindex', 99);
        cc._canvas.style.backgroundColor = 'black';
        if (cc.imeDispatcher && cc.imeDispatcher._domInputControl) {
            cc.imeDispatcher._domInputControl.setAttribute('tabindex', 2);
        }
        cc.director.resume();

        cc.view.setDesignResolutionSize(640, 480);
        cc.view.resizeWithBrowserSize(true);
    },

    stopRuntime: function () {

    },

    pauseRuntime: function () {
        cc.director.pause();
    },

    resumeRuntime: function () {
        cc.director.resume();
    },

    animateRuntime: function (dt) {
        this._needAnimate = true;
    },

    renderRuntime: function () {
        this._needRender = true;
    },

    _registerStepRuntime: function () {
        var self = this;
        var originDrawScene = cc.director.drawScene;

        cc.director.drawScene = function () {

            if ( !self.isPlaying && !self._needRender ) {
                return;
            }

            self._needRender = false;

            var engine = Fire.engine;

            engine.emit('post-update');

            if (engine._stepOnce || (!self.isPlaying && engine._needAnimate)) {
                this._paused = false;
            }

            originDrawScene.call(this);

            if (engine._stepOnce || (!self.isPlaying && engine._needAnimate)) {
                this._paused = true;
                engine._stepOnce = false;
                engine._needAnimate = false;
            }
        }
    },

    _setCurrentSceneN: function (scene) {
        cc.director.runScene(scene);
        cc.director.setNextScene();
    },

    getCurrentSceneN: function () {
        return cc.director.getRunningScene();
    },

    /**
     * Cocos will block event's propagation, it's not suitable for edit mode.
     * So hack cc.inputManager.registerSystemEvent, reregister cocos system event when play runtime.
     */
    _dontRegisterSystemEvent: function () {
        this._registerCocosSystemEvent = cc.inputManager.registerSystemEvent.bind( cc.inputManager );

        cc.inputManager.registerSystemEvent = function () {
        };
    },

    getIntersectionList: function (rect) {
        var scene = this.getCurrentScene();
        var list = [];

        scene._deepQueryChildren(function (child) {

            var bounds = child.getWorldBounds();

            // if intersect aabb success, then try intersect obb
            if (rect.intersects(bounds)) {
                bounds = child.getWorldOrientedBounds();
                var polygon = new Fire.Polygon(bounds);

                if (Fire.Intersection.rectPolygon(rect, polygon)) {
                    list.push(child.targetN);
                }
            }

            return true;
        });

        return list;
    }
});

module.exports = EngineWrapper;

},{}],5:[function(require,module,exports){
require('./utils');
require('./types');


// require engine
var EngineWrapper = require('./engine');

// register engine wrapper
Fire.Runtime.registerEngine( new EngineWrapper(false) );

// register node type
var types = [
    [cc,   'Node',           require('./node'),         'Node'],
    [cc,   'Scene',          require('./scene')],
    //[cc, 'LoaderScene',  require('./scene')],
    [cc,   'Sprite',         require('./sprite'),       'Sprite'],
    [cc,   'LabelBMFont',    require('./bitmap-font'),  'LabelBMFont'],
    [cc,   'ParticleSystem', require('./particle'),     'ParticleSystem'],
    [ccui, 'Button',         require('./Button'),       'UI/Button']
];


types.forEach(function (type) {
    registerCCNodeType( type[0], type[1], type[2], type[3] );
});


function registerCCNodeType (namespace, name, wrapper, menuPath) {
    var nodeType = namespace[name];

    // 先屏蔽，因为还有很多节点类型没注册
    //nodeType = Fire.Class({
    //    extends: nodeType,
    //    constructor: function () {
    //        this._FB_wrapper = null;
    //    }
    //});

    Fire.Runtime.registerNodeType(nodeType, wrapper, menuPath);

    namespace[name] = nodeType;
}

},{"./Button":2,"./bitmap-font":3,"./engine":4,"./node":6,"./particle":7,"./scene":8,"./sprite":9,"./types":10,"./utils":11}],6:[function(require,module,exports){
var Vec2 = Fire.Vec2;
var Rect = Fire.Rect;
var Color = Fire.Color;
var Helpers = Fire.Runtime.Helpers;

/**
 * @class NodeWrapper
 * @extends Fire.Runtime.NodeWrapper
 * @constructor
 * @param {RuntimeNode} node
 */
var NodeWrapper = Fire.Class({
    name: 'Runtime.NodeWrapper',
    extends: Fire.Runtime.NodeWrapper,

    properties: {

        /**
         * The name of the node.
         * @property name
         * @type {string}
         */
        name: {
            get: function () {
                return this.targetN.getName();
            },
            set: function (value) {
                this.targetN.setName(value);
            }
        },

        // HIERARCHY

        /**
         * The parent of the node.
         * If this is the top most node in hierarchy, the returns value of Fire(this.parent) must be type SceneWrapper.
         * Changing the parent will keep the transform's local space position, rotation and scale the same but modify
         * the world space position, scale and rotation.
         * @property parentN
         * @type {RuntimeNode}
         */
        parentN: {
            get: function () {
                return this.targetN.parent;
            },
            set: function (value) {
                if ( this.targetN.parent ) {
                    this.targetN.removeFromParent();
                }

                if( value ) {
                    value.addChild(this.targetN);

                    this.setMaxZorder();
                }
            },
            visible: false
        },

        /**
         * Returns the array of children. If no child, this method should return an empty array.
         * The returns array can be modified ONLY in setSiblingIndex.
         * @property childrenN
         * @type {RuntimeNode[]}
         * @readOnly
         */
        childrenN: {
            get: function () {
                return this.targetN.children;
            },
            visible: false
        },

        // TRANSFORM

        /**
         * The local position in its parent's coordinate system
         * @property position
         * @type {Fire.Vec2}
         */
        position: {
            get: function () {
                return new Vec2(this.targetN.x, this.targetN.y);
            },
            set: function (value) {
                if ( value instanceof Vec2 ) {
                    this.targetN.setPosition(value.x, value.y);
                }
                else {
                    Fire.error('The new position must be Fire.Vec2');
                }
            }
        },

        /**
         * The position of the transform in world space
         * @property worldPosition
         * @type {Fire.Vec2}
         */
        worldPosition: {
            get: function () {
                var pos = this.targetN.convertToWorldSpaceAR(cc.p(0,0));
                return new Vec2(pos.x, pos.y);
            },
            set: function (value) {
                if ( value instanceof Vec2 ) {
                    if ( this.parentN ) {
                        var p = this.parentN.convertToNodeSpace(value);
                        this.targetN.setPosition(p.x, p.y);
                    }
                    else {
                        this.position = value;
                    }
                }
                else {
                    Fire.error('The new worldPosition must be Fire.Vec2');
                }
            },
            visible: false
        },

        /**
         * The clockwise degrees of rotation relative to the parent
         * @property rotation
         * @type {number}
         */
        rotation: {
            get: function () {
                return this.targetN.rotation;
            },
            set: function (value) {
                if ( !isNaN(value) ) {
                    this.targetN.rotation = value;
                }
                else {
                    Fire.error('The new rotation must not be NaN');
                }
            }
        },

        /**
         * The clockwise degrees of rotation in world space
         * @property worldRotation
         * @type {number}
         */
        worldRotation: {
            get: function () {
                var parent = this.parentN;
                if ( parent ) {
                    if ( parent instanceof cc.Scene ) {
                        return this.rotation + parent.rotation;
                    }
                    else {
                        return this.rotation + Fire(parent).worldRotation;
                    }
                }
                else {
                    return this.rotation;
                }
            },
            set: function (value) {
                if ( !isNaN(value) ) {
                    var parent = this.parentN;
                    if ( parent ) {
                        if ( parent instanceof cc.Scene ) {
                            this.rotation = value - parent.rotation;
                        }
                        else {
                            this.rotation = value - Fire(parent).worldRotation;
                        }
                    }
                    else {
                        this.rotation = value;
                    }
                }
                else {
                    Fire.error('The new worldRotation must not be NaN');
                }
            },
            visible: false
        },

        /**
         * The local scale factor relative to the parent
         * @property scale
         * @type {Fire.Vec2}
         */
        scale: {
            get: function () {
                return new Vec2(this.targetN.scaleX, this.targetN.scaleY);
            },
            set: function (value) {
                if ( value instanceof Vec2 ) {
                    this.targetN.scaleX = value.x;
                    this.targetN.scaleY = value.y;
                }
                else {
                    Fire.error('The new scale must be Fire.Vec2');
                }
            }
        },

        /**
         * The lossy scale of the transform in world space (Read Only)
         * @property worldScale
         * @type {Fire.Vec2}
         * @readOnly
         */
        worldScale: {
            get: function () {
                var mat = this.targetN.getNodeToWorldTransform();

                var ret = new Vec2();
                ret.x = Math.sqrt(mat.a * mat.a + mat.b * mat.b);
                ret.y = Math.sqrt(mat.c * mat.c + mat.d * mat.d);

                return ret;
            },
            visible: false
        },

        anchorPoint: {
            get: function () {
                return new Vec2(this.targetN.anchorX, this.targetN.anchorY);
            },
            set: function (value) {
                if ( value instanceof Vec2 ) {
                    this.targetN.setAnchorPoint(value.x, value.y);
                }
                else {
                    Fire.error('The new anchorPoint must be Fire.Vec2');
                }
            }
        },

        color: {
            get: function () {
                var color = this.targetN.color;
                color.a = this.targetN.opacity;
                return color.toFireColor();
            },
            set: function (value) {
                if (value instanceof Color) {
                    var color = value.toCCColor();
                    this.targetN.color = color;
                    this.targetN.opacity = color.a;
                }
                else {
                    Fire.error('The new color must be Fire.Color');
                }
            },
            visible: true,
        },

        /**
         * The size of the node
         * @property size
         * @type {Fire.Vec2}
         */
        size: {
            get: function () {
                var size = this.targetN.getContentSize();
                return new Vec2(size.width, size.height);
            },
            set: function (value) {
                if ( value instanceof Vec2 ) {
                    this.targetN.setContentSize(value.x, value.y);
                }
                else {
                    Fire.error('The new size must be Fire.Vec2');
                }
            },
            visible: false
        },

        _name: {
            default: ""
        },

        _position: {
            default: null
        },

        _scale: {
            default: null
        },

        _rotation: {
            default: 0
        },

        _size: {
            default: null
        },

        _color: {
            default: null
        },

        _anchorPoint: {
            default: null
        }
    },

    statics: {
    },

    setMaxZorder: function () {
        var parent = this.parentN;
        var length = parent.children.length;
        if ( length >= 2 ) {
            var prevNode = parent.children[length-2];
            var z = prevNode.getLocalZOrder() + 1;
            this.targetN.setLocalZOrder( z );
        }
    },

    setSiblingIndex: function (index) {
        if (!this.parentN) return;

        Fire.Runtime.NodeWrapper.prototype.setSiblingIndex.call(this, index);

        var siblings = this.parentN.children;
        for (var i=0; i<siblings.length; i++) {
            siblings[i].setLocalZOrder(i);
        }

        cc.renderer.childrenOrderDirty = true;
    },

    attached: function () {
        // onEnter will be called when node enters the parent
        var originOnEnter = this.targetN.onEnter;
        this.targetN.onEnter = function () {
            originOnEnter.call(this);
            Helpers.onNodeAttachedToParent(this);
        };

        // onExit will be called when node leaves the parent
        var originOnExit = this.targetN.onExit;
        this.targetN.onExit = function () {
            originOnExit.call(this);
            Helpers.onNodeDetachedFromParent(this);
        };

        this.targetN.scheduleUpdate();
    },

    // RENDERER

    /**
     * Returns a "world" axis aligned bounding box(AABB) of the renderer.
     *
     * @method getWorldBounds
     * @param {Fire.Rect} [out] - optional, the receiving rect
     * @return {Fire.Rect} - the rect represented in world position
     */
    getWorldBounds: function (out) {
        var size = this.size;
        var rect = cc.rect(0, 0, size.x, size.y);

        var mat = this.targetN.getNodeToWorldTransform();
        cc._rectApplyAffineTransformIn(rect, mat);

        out = out || new Rect();
        out.x = rect.x;
        out.y = rect.y;
        out.width  = rect.width;
        out.height = rect.height;

        return out;
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
        var size   = this.size;
        var width  = size.x;
        var height = size.y;

        out_bl = out_bl || new Vec2();
        out_tl = out_tl || new Vec2();
        out_tr = out_tr || new Vec2();
        out_br = out_br || new Vec2();

        var mat = this.targetN.getNodeToWorldTransform();

        // transform rect(0, 0, width, height) by matrix
        var tx = mat.tx;
        var ty = mat.ty;
        var xa = mat.a * width;
        var xb = mat.b * width;
        var yc = mat.c * height;
        var yd = mat.d * height;

        out_tl.x = tx;
        out_tl.y = ty;
        out_tr.x = xa + tx;
        out_tr.y = xb + ty;
        out_bl.x = yc + tx;
        out_bl.y = yd + ty;
        out_br.x = xa + yc + tx;
        out_br.y = xb + yd + ty;

        return [out_bl, out_tl, out_tr, out_br];
    },

    transformPointToWorld: function (point) {
        var converted = this.targetN.convertToWorldSpaceAR(point);
        return new Fire.Vec2(converted.x, converted.y);
    },

    transformPointToLocal: function (point) {
        var converted = this.targetN.convertToNodeSpaceAR(point);
        return new Fire.Vec2(converted.x, converted.y);
    },

    onBeforeSerialize: function () {
        this._name  = this.name;
        this._size  = [this.size.x, this.size.y];
        this._scale = [this.scaleX, this.scaleY];
        this._rotation = this.rotation;
        this._position = [this.position.x, this.position.y];
        this._anchorPoint = [this.anchorPoint.x, this.anchorPoint.y];

        var color = this.color;
        this._color = [color.r, color.g, color.b, color.a];
    },

    createNode: function (node) {
        node = node || new cc.Node();

        var width = this._size ? this._size[0] : 0;
        var height = this._size ? this._size[1] : 0;

        node.setName(this._name);
        node.setContentSize(width, height);
        node.x = this._position ? this._position[0] : 0;
        node.y = this._position ? this._position[1] : 0;
        node.scaleX = this._scale ? this._scale[0] : 1;
        node.scaleY = this._scale ? this._scale[1] : 1;
        node.rotation = this._rotation;

        if (this._anchorPoint) {
            node.setAnchorPoint(this._anchorPoint[0], this._anchorPoint[1]);
        }

        var color = this._color ? new Color(this._color[0], this._color[1], this._color[2], this._color[3]) : Color.white;
        node.color = color.toCCColor();

        return node;
    }
});

module.exports = NodeWrapper;

},{}],7:[function(require,module,exports){

var NodeWrapper = require('./node');

var shareProperties = [
    'maxParticles',
    'duration',
    'emissionRate',
    'life',
    'lifeVariance',
    'startColor',
    'startColorVariance',
    'endColor',
    'endColorVariance',
    'angle',
    'angleVariance',
    'startSize',
    'startSizeVariance',
    'endSize',
    'endSizeVariance',
    'startSpin',
    'startSpinVariance',
    'endSpin',
    'endSpinVariance',
    'sourcePosition',
    'sourcePositionVariance',
    'positionType',
    'emitterMode'
];

var gravityModeProperties = [
    'gravity',
    'speed',
    'speedVariance',
    'tangentialAccel',
    'tangentialAccelVariance',
    'radialAccel',
    'radialAccelVariance',
    'rotationIsDir'
];

var radiusModeProperties = [
    'startRadius',
    'startRadiusVariance',
    'endRadius',
    'endRadiusVariance',
    'rotatePerSecond',
    'rotatePerSecondVariance'
];

var ParticleWrapper = Fire.Class({
    name: 'Runtime.ParticleWrapper',
    extends: NodeWrapper,
    constructor: function () {
        this._fileToLoad = '';
        this._texToLoad = '';
    },

    properties: {

        // If set custom to true, then use custom properties insteadof read particle file
        custom: {
            default: false
        },

        _file: {
            get: function () {
                return this.targetN._plistFile || '';
            },
            set: function (value) {
                var target = this.targetN;

                if ( target ) {
                    target._plistFile = value;

                    cc.loader.load( value, function (err, results) {
                        if (err) throw err;

                        var originPosition = target.getPosition();
                        target.particleCount = 0;
                        target.initWithFile( value );
                        target.setPosition( originPosition );
                    });
                }
                else {
                    this._fileToLoad = value;
                }
            },
            visible: true,
            url: Runtime.ParticleAsset
        },

        _texture: {
            get: function () {
                var tex = this.targetN.texture;
                return (tex && tex.url) || '';
            },
            set: function (value) {
                if (this.targetN) {
                    var texture = value ? cc.textureCache.addImage( value ) : null;
                    this.targetN.texture = texture;
                }
                else {
                    this._texToLoad = value;
                }
            },
            visible: true,
            url: Fire.Texture
        },

        particleCount: {
            get: function () {
                return this.targetN.particleCount;
            }
        },

        maxParticles: {
            get: function () {
                return this.targetN.totalParticles;
            },
            set: function (value) {
                if ( !isNaN(value)) {
                    this.targetN.totalParticles = value;
                }
                else {
                    Fire.error('The new duration must not be NaN');
                }
            }
        },

        duration: {
            get: function () {
                return this.targetN.duration;
            },
            set: function (value) {
                if ( !isNaN(value)) {
                    this.targetN.duration = value;
                }
                else {
                    Fire.error('The new duration must not be NaN');
                }
            }
        },

        emissionRate: {
            get: function () {
                return this.targetN.emissionRate;
            },
            set: function (value) {
                if ( !isNaN(value)) {
                    this.targetN.emissionRate = value;
                }
                else {
                    Fire.error('The new emissionRate must not be NaN');
                }
            }
        },

        life: {
            get: function () {
                return this.targetN.life;
            },
            set: function (value) {
                if ( !isNaN(value)) {
                    this.targetN.life = value;
                }
                else {
                    Fire.error('The new life must not be NaN');
                }
            }
        },

        lifeVariance: {
            get: function () {
                return this.targetN.lifeVar;
            },
            set: function (value) {
                if ( !isNaN(value)) {
                    this.targetN.lifeVar = value;
                }
                else {
                    Fire.error('The new lifeVariance must not be NaN');
                }
            }
        },

        startColor: {
            get: function () {
                return this.targetN.startColor.toFireColor();
            },
            set: function (value) {
                if ( value instanceof Fire.Color ) {
                    this.targetN.startColor = value.toCCColor();
                }
                else {
                    Fire.error('The new startColor must be Fire.Color');
                }
            },
            type: Fire.Color
        },

        startColorVariance: {
            get: function () {
                return this.targetN.startColorVar.toFireColor();
            },
            set: function (value) {
                if ( value instanceof Fire.Color ) {
                    this.targetN.startColorVar = value.toCCColor();
                }
                else {
                    Fire.error('The new startColorVariance must be Fire.Color');
                }
            },
            type: Fire.Color
        },

        endColor: {
            get: function () {
                return this.targetN.endColor.toFireColor();
            },
            set: function (value) {
                if ( value instanceof Fire.Color ) {
                    this.targetN.endColor = value.toCCColor();
                }
                else {
                    Fire.error('The new endColor must be Fire.Color');
                }
            },
            type: Fire.Color
        },

        endColorVariance: {
            get: function () {
                return this.targetN.endColorVar.toFireColor();
            },
            set: function (value) {
                if ( value instanceof Fire.Color ) {
                    this.targetN.endColorVar = value.toCCColor();
                }
                else {
                    Fire.error('The new endColorVariance must be Fire.Color');
                }
            },
            type: Fire.Color
        },


        angle: {
            get: function () {
                return this.targetN.angle;
            },
            set: function (value) {
                if ( !isNaN(value)) {
                    this.targetN.angle = value;
                }
                else {
                    Fire.error('The new angle must not be NaN');
                }
            }
        },

        angleVariance: {
            get: function () {
                return this.targetN.angleVar;
            },
            set: function (value) {
                if ( !isNaN(value)) {
                    this.targetN.angleVar = value;
                }
                else {
                    Fire.error('The new angleVariance must not be NaN');
                }
            }
        },

        startSize: {
            get: function () {
                return this.targetN.startSize;
            },
            set: function (value) {
                if ( !isNaN(value)) {
                    this.targetN.startSize = value;
                }
                else {
                    Fire.error('The new startSize must not be NaN');
                }
            }
        },

        startSizeVariance: {
            get: function () {
                return this.targetN.startSizeVar;
            },
            set: function (value) {
                if ( !isNaN(value)) {
                    this.targetN.startSizeVar = value;
                }
                else {
                    Fire.error('The new startSizeVariance must not be NaN');
                }
            }
        },

        endSize: {
            get: function () {
                return this.targetN.endSize;
            },
            set: function (value) {
                if ( !isNaN(value)) {
                    this.targetN.endSize = value;
                }
                else {
                    Fire.error('The new endSize must not be NaN');
                }
            }
        },

        endSizeVariance: {
            get: function () {
                return this.targetN.endSizeVar;
            },
            set: function (value) {
                if ( !isNaN(value)) {
                    this.targetN.endSizeVar = value;
                }
                else {
                    Fire.error('The new endSizeVariance must not be NaN');
                }
            }
        },

        startSpin: {
            get: function () {
                return this.targetN.startSpin || 0;
            },
            set: function (value) {
                if ( !isNaN(value)) {
                    this.targetN.startSpin = value;
                }
                else {
                    Fire.error('The new startSpin must not be NaN');
                }
            }
        },

        startSpinVariance: {
            get: function () {
                return this.targetN.startSpinVar || 0;
            },
            set: function (value) {
                if ( !isNaN(value)) {
                    this.targetN.startSpinVar = value;
                }
                else {
                    Fire.error('The new startSpinVariance must not be NaN');
                }
            }
        },

        endSpin: {
            get: function () {
                return this.targetN.endSpin || 0;
            },
            set: function (value) {
                if ( !isNaN(value)) {
                    this.targetN.endSpin = value;
                }
                else {
                    Fire.error('The new endSpin must not be NaN');
                }
            }
        },

        endSpinVariance: {
            get: function () {
                return this.targetN.endSpinVar || 0;
            },
            set: function (value) {
                if ( !isNaN(value)) {
                    this.targetN.endSpinVar = value;
                }
                else {
                    Fire.error('The new endSpinVariance must not be NaN');
                }
            }
        },

        sourcePosition: {
            get: function () {
                var pos = this.targetN.sourcePos;
                return new Fire.Vec2(pos.x, pos.y);
            },
            set: function (value) {
                if ( value instanceof Fire.Vec2 ) {
                    this.targetN.sourcePos = cc.p(value.x, value.y);
                }
                else {
                    Fire.error('The new sourcePosition must be Fire.Vec2');
                }
            },
            type: Fire.Vec2
        },

        sourcePositionVariance: {
            get: function () {
                var pos = this.targetN.posVar;
                return new Fire.Vec2(pos.x, pos.y);
            },
            set: function (value) {
                if ( value instanceof Fire.Vec2 ) {
                    this.targetN.posVar = cc.p(value.x, value.y);
                }
                else {
                    Fire.error('The new sourcePositionVariance must be Fire.Vec2');
                }
            },
            type: Fire.Vec2
        },

        // Runtime.ParticlePositionType.Free | Runtime.ParticlePositionType.Grouped
        positionType: {
            get: function () {
                return this.targetN.positionType;
            },
            set: function (value) {
                if ( !isNaN(value)) {
                    this.targetN.positionType = value;
                }
                else {
                    Fire.error('The new positionType must not be NaN');
                }
            },
            type: Runtime.ParticlePositionType
        },

        // Runtime.ParticleEmitMode.Gravity: uses gravity, speed, radial and tangential acceleration;
        // Runtime.ParticleEmitMode.Radius : uses radius movement + rotation.
        emitterMode: {
            get: function () {
                return this.targetN.emitterMode;
            },
            set: function (value) {
                if ( !isNaN(value)) {
                    this.targetN.emitterMode = value;
                }
                else {
                    Fire.error('The new emitterMode must not be NaN');
                }
            },
            type: Runtime.ParticleEmitMode
        },


        // Runtime.ParticleEmitMode.Gravity

        gravity: {
            get: function () {
                var gravity = this.targetN.gravity;
                return new Fire.Vec2(gravity.x, gravity.y);
            },
            set: function (value) {
                if ( value instanceof Fire.Vec2) {
                    this.targetN.gravity = cc.p(value.x, value.y);
                }
                else {
                    Fire.error('The new gravity must be Fire.Vec2');
                }
            },
            type: Fire.Vec2
        },

        speed: {
            get: function () {
                return this.targetN.speed || 0;
            },
            set: function (value) {
                if ( !isNaN(value)) {
                    this.targetN.speed = value;
                }
                else {
                    Fire.error('The new speed must not be NaN');
                }
            }
        },

        speedVariance: {
            get: function () {
                return this.targetN.speedVar || 0;
            },
            set: function (value) {
                if ( !isNaN(value)) {
                    this.targetN.speedVar = value;
                }
                else {
                    Fire.error('The new speedVariance must not be NaN');
                }
            }
        },

        tangentialAccel: {
            get: function () {
                return this.targetN.tangentialAccel || 0;
            },
            set: function (value) {
                if ( !isNaN(value)) {
                    this.targetN.tangentialAccel = value;
                }
                else {
                    Fire.error('The new tangentialAccel must not be NaN');
                }
            }
        },

        tangentialAccelVariance: {
            get: function () {
                return this.targetN.tangentialAccelVar || 0;
            },
            set: function (value) {
                if ( !isNaN(value)) {
                    this.targetN.tangentialAccelVar = value;
                }
                else {
                    Fire.error('The new tangentialAccelVariance must not be NaN');
                }
            }
        },

        radialAccel: {
            get: function () {
                return this.targetN.radialAccel || 0;
            },
            set: function (value) {
                if ( !isNaN(value)) {
                    this.targetN.radialAccel = value;
                }
                else {
                    Fire.error('The new radialAccel must not be NaN');
                }
            }
        },

        radialAccelVariance: {
            get: function () {
                return this.targetN.radialAccelVar || 0;
            },
            set: function (value) {
                if ( !isNaN(value)) {
                    this.targetN.radialAccelVar = value;
                }
                else {
                    Fire.error('The new radialAccelVariance must not be NaN');
                }
            }
        },

        rotationIsDir: {
            get: function () {
                return this.targetN.rotationIsDir;
            },
            set: function (value) {
                if ( !isNaN(value)) {
                    this.targetN.rotationIsDir = value;
                }
                else {
                    Fire.error('The new rotationIsDir must not be NaN');
                }
            }
        },


        // Runtime.ParticleEmitMode.Radius

        startRadius: {
            get: function () {
                return this.targetN.startRadius || 0;
            },
            set: function (value) {
                if ( !isNaN(value)) {
                    this.targetN.startRadius = value;
                }
                else {
                    Fire.error('The new startRadius must not be NaN');
                }
            }
        },

        startRadiusVariance: {
            get: function () {
                return this.targetN.startRadiusVar || 0;
            },
            set: function (value) {
                if ( !isNaN(value)) {
                    this.targetN.startRadiusVar = value;
                }
                else {
                    Fire.error('The new startRadiusVariance must not be NaN');
                }
            }
        },

        endRadius: {
            get: function () {
                return this.targetN.endRadius || 0;
            },
            set: function (value) {
                if ( !isNaN(value)) {
                    this.targetN.endRadius = value;
                }
                else {
                    Fire.error('The new endRadius must not be NaN');
                }
            }
        },

        endRadiusVariance: {
            get: function () {
                return this.targetN.endRadiusVar || 0;
            },
            set: function (value) {
                if ( !isNaN(value)) {
                    this.targetN.endRadiusVar = value;
                }
                else {
                    Fire.error('The new endRadiusVariance must not be NaN');
                }
            }
        },

        rotatePerSecond: {
            get: function () {
                return this.targetN.rotatePerSecond || 0;
            },
            set: function (value) {
                if ( !isNaN(value)) {
                    this.targetN.rotatePerSecond = value;
                }
                else {
                    Fire.error('The new rotatePerSecond must not be NaN');
                }
            }
        },

        rotatePerSecondVariance: {
            get: function () {
                return this.targetN.rotatePerSecondVar || 0;
            },
            set: function (value) {
                if ( !isNaN(value)) {
                    this.targetN.rotatePerSecondVar = value;
                }
                else {
                    Fire.error('The new rotatePerSecondVariance must not be NaN');
                }
            }
        },

        _serializeObject: {
            default: null
        }
    },

    statics: {
        animatableInEditor: true
    },

    onFocusInEditor: function () {
        this.targetN.resetSystem();
    },

    onLostFocusInEditor: function () {
        this.targetN.resetSystem();
        this.targetN.stopSystem();

        Fire.engine.renderRuntime();
    },

    _serializeToObject: function (object, property) {
        var value = this[property];

        if (value instanceof Fire.Color) {
            object[property] = [value.r, value.g, value.b, value.a];
        }
        else if (value instanceof Fire.Vec2) {
            object[property] = [value.x, value.y];
        }
        else {
            object[property] = value;
        }
    },

    _deserializeFromObject: function (object, property) {
        var value = object[property];

        var attr = Fire.attr(ParticleWrapper, property);

        if (attr.ctor === Fire.Color) {
            this[property] = value ? new Fire.Color(value[0], value[1], value[2], value[3]) : Fire.Color.white;;
        }
        else if(attr.ctor === Fire.Vec2) {
            this[property] = value ? new Fire.Vec2(value[0], value[1]) : Fire.Vec2.zero;
        }
        else {
            this[property] = value;
        }
    },

    _createTextureFromData: function (imgPath, textureData) {
        if (!textureData) return null;

        var texture = cc.textureCache.getTextureForKey(imgPath);
        if (texture) return texture;

        var buffer = cc.unzipBase64AsArray(textureData, 1);
        if (!buffer) {
            Fire.error("Error decoding or ungzipping textureImageData");
            return false;
        }

        var imageFormat = cc.getImageFormatByData(buffer);

        if(imageFormat !== cc.FMT_TIFF && imageFormat !== cc.FMT_PNG){
            Fire.error("Unknown image format with Data");
            return false;
        }

        var canvasObj = cc.newElement("canvas");
        if(imageFormat === cc.FMT_PNG){
            var myPngObj = new cc.PNGReader(buffer);
            myPngObj.render(canvasObj);
        } else {
            var myTIFFObj = cc.tiffReader;
            myTIFFObj.parseTIFF(buffer,canvasObj);
        }

        cc.textureCache.cacheImage(imgPath, canvasObj);

        texture = cc.textureCache.getTextureForKey(imgPath);
        if(!texture)
            Fire.error("Error loading the texture");

        return texture;
    },

    onBeforeSerialize: function () {
        NodeWrapper.prototype.onBeforeSerialize.call(this);

        if (this.custom) {
            this._serializeObject = {};
            var object = this._serializeObject;

            object.emitterMode = this.emitterMode;

            var modeProperties = object.emitterMode === Runtime.ParticleEmitMode.Gravity ? gravityModeProperties : radiusModeProperties;
            var properties = shareProperties.concat(modeProperties);

            properties.forEach(function (property) {
                this._serializeToObject(object, property);
            }.bind(this));
        }
        else {
            this._serializeObject = null;
        }
    },

    createNode: function (node) {
        node = node || new cc.ParticleSystem();

        NodeWrapper.prototype.createNode.call(this, node);

        var object = this._serializeObject;
        if (this.custom && object) {

            var modeProperties = object.emitterMode === Runtime.ParticleEmitMode.Gravity ? gravityModeProperties : radiusModeProperties;
            var properties = shareProperties.concat(modeProperties);

            var oldTarget = this.targetN;
            this.targetN = node;

            properties.forEach(function (property) {
                this._deserializeFromObject(object, property);
            }.bind(this));

            this.targetN = oldTarget;


            if (this._fileToLoad) {
                node._plistFile = this._fileToLoad;
                this._fileToLoad = '';
            }

            if ( this._texToLoad ) {
                var texture = cc.textureCache.addImage( this._texToLoad );
                node.texture = texture;
                this._texToLoad = '';
            }
            else if( node._plistFile ) {
                var dictionary = cc.loader.getRes(node._plistFile);

                if (dictionary) {
                    var textureName = dictionary['textureFileName'];
                    var texture = cc.textureCache.getTextureForKey(textureName);

                    if (!texture) {
                        var textureData = dictionary['textureImageData'];

                        texture = this._createTextureFromData(textureName, textureData);
                    }

                    node.texture = texture;
                }
            }
        }
        else {
            if ( this._fileToLoad ) {
                var originPosition = node.getPosition();
                node.initWithFile( this._fileToLoad );
                node.setPosition( originPosition );
            }
        }

        return node;
    }
});

module.exports = ParticleWrapper;

},{"./node":6}],8:[function(require,module,exports){
var Vec2 = Fire.Vec2;
var Helpers = Fire.Runtime.Helpers;

/**
 * @class SceneWrapper
 * @extends Fire.Runtime.SceneWrapper
 * @constructor
 * @param {RuntimeNode} node - The root node of current stage.
 */
var SceneWrapper = Fire.Class({
    name: 'Runtime.SceneWrapper',
    extends: Fire.Runtime.SceneWrapper,

    properties: {

        childrenN: {
            get: function () {
                return this.targetN.children;
            },
            visible: false
        },

        position: {
            get: function () {
                return new Vec2(this.targetN.x, this.targetN.y);
            },
            set: function (value) {
                if ( value instanceof Vec2 ) {
                    this.targetN.setPosition(value.x, value.y);
                }
                else {
                    Fire.error('The new position must be Fire.Vec2');
                }
            }
        },

        worldPosition: {
            get: function () {
                return this.position;
            },
            set: function (value) {
                this.position = value;
            }
        },

        scale: {
            get: function () {
                return new Vec2(this.targetN.scaleX, this.targetN.scaleY);
            },
            set: function (value) {
                if ( value instanceof Vec2 ) {
                    this.targetN.scaleX = value.x;
                    this.targetN.scaleY = value.y;
                }
                else {
                    Fire.error('The new scale must be Fire.Vec2');
                }
            }
        },

        worldScale: {
            get: function () {
                return this.scale;
            },
            set: function (value) {
                this.scale = value;
            }
        },

        rotation: {
            get: function () {
                return this.targetN.rotation;
            },
            set: function (value) {
                if ( !isNaN(value) ) {
                    this.targetN.rotation = value;
                }
                else {
                    Fire.error('The new rotation must not be NaN');
                }
            }
        },

        worldRotation: {
            get: function () {
                return this.rotation;
            },
            set: function (value) {
                this.rotation = value;
            }
        },

        _position: {
            default: null
        },

        _scale: {
            default: null
        }
    },

    _deepQueryChildren: function (cb) {

        function traversal (node, cb) {
            var children = node.children;

            for (var i = 0; i<children.length; i++) {
                var child = children[i];

                if (!cb( child )) break;

                traversal(child, cb);
            }
        }

        traversal(this, cb);
    },

    transformPointToWorld: function (point) {
        var converted = this.targetN.convertToWorldSpaceAR(point);
        return new Fire.Vec2(converted.x, converted.y);
    },

    transformPointToLocal: function (point) {
        var converted = this.targetN.convertToNodeSpaceAR(point);
        return new Fire.Vec2(converted.x, converted.y);
    },

    attached: function () {
        // onEnter will be called when node enters the stage
        var originOnEnter= this.targetN.onEnter;
        this.targetN.onEnter = function () {
            originOnEnter.call(this);
            Helpers.onNodeAttachedToParent(this);
        };

        // onExit will be called when node leaves the stage
        var originOnExit = this.targetN.onExit;
        this.targetN.onExit = function () {
            originOnExit.call(this);
            Helpers.onNodeDetachedFromParent(this);
        };
    },

    preloadAssets: function (assets, callback) {
        var urls = assets.map( function (asset) {
            return asset.url;
        });

        cc.loader.load(urls, callback);
    },

    onBeforeSerialize: function () {
        this._scale = [this.scaleX, this.scaleY];
        this._position = [this.position.x, this.position.y];
    },

    createNode: function (node) {
        node = node || new cc.Scene();

        node.setAnchorPoint(0.0, 0.0);

        node.x = this._position ? this._position[0] : 0;
        node.y = this._position ? this._position[1] : 0;
        node.scaleX = this._scale ? this._scale[0] : 1;
        node.scaleY = this._scale ? this._scale[1] : 1;

        return node;
    }
});

module.exports = SceneWrapper;

},{}],9:[function(require,module,exports){

var NodeWrapper = require('./node');

var SpriteWrapper = Fire.Class({
    name: 'Runtime.SpriteWrapper',
    extends: NodeWrapper,
    constructor: function () {
        this._texToLoad = '';
    },

    properties: {

        _texture: {
            get: function () {
                var tex = this.targetN.texture;
                return (tex && tex.url) || '';
            },
            set: function (value) {
                if (this.targetN) {
                    this.targetN.texture = value || null;
                }
                else {
                    this._texToLoad = value;
                }
            },
            visible: true,
            url: Fire.Texture
        }
    },

    statics: {
    },

    createNode: function (node) {
        node = node || new cc.Sprite();

        NodeWrapper.prototype.createNode.call(this, node);

        if (this._texToLoad) {
            node.texture = this._texToLoad;
            this._texToLoad = '';
        }

        return node;
    }
});

module.exports = SpriteWrapper;

},{"./node":6}],10:[function(require,module,exports){

Runtime.TextAlign = Fire.defineEnum({
    /**
     * !#en Align to the left !#zh 文字靠左对齐
     * @property Left
     * @type {number}
     */
    Left: -1,
    /**
     * @property Center
     * @type {number}
     */
    Center: -1,
    /**
     * @property Right
     * @type {number}
     */
    Right: -1
});

Runtime.TextAnchor = Fire.defineEnum({
    /**
     * @property TopLeft
     * @type {number}
     */
    TopLeft: -1,
    /**
     * @property TopCenter
     * @type {number}
     */
    TopCenter: -1,
    /**
     * @property TopRight
     * @type {number}
     */
    TopRight: -1,
    /**
     * @property MiddleLeft
     * @type {number}
     */
    MiddleLeft: -1,
    /**
     * @property MiddleCenter
     * @type {number}
     */
    MiddleCenter: -1,
    /**
     * @property MiddleRight
     * @type {number}
     */
    MiddleRight: -1,
    /**
     * @property BottomLeft
     * @type {number}
     */
    BottomLeft: -1,
    /**
     * @property BottomCenter
     * @type {number}
     */
    BottomCenter: -1,
    /**
     * @property BottomRight
     * @type {number}
     */
    BottomRight: -1,
});


Runtime.ParticlePositionType = Fire.defineEnum({

    Free: cc.ParticleSystem.TYPE_FREE,

    Grouped: cc.ParticleSystem.TYPE_GROUPED
});


Runtime.ParticleEmitMode = Fire.defineEnum({

    Gravity: cc.ParticleSystem.MODE_GRAVITY,

    Radius: cc.ParticleSystem.MODE_RADIUS
});


},{}],11:[function(require,module,exports){
var Color = Fire.Color;

Color.prototype.toCCColor = function () {
    return {
        r: (this.r * 255) | 0,
        g: (this.g * 255) | 0,
        b: (this.b * 255) | 0,
        a: (this.a * 255) | 0
    };
};

cc.Color.prototype.toFireColor = function () {
    return new Color(
        this.r / 255,
        this.g / 255,
        this.b / 255,
        this.a / 255
    );
};

},{}],12:[function(require,module,exports){

Fire.JS.mixin( Fire.BitmapFont.prototype, {
    createNode: function (callback) {
        var node;

        try {
            node = new cc.LabelBMFont();
        }
        catch (err) {
            return callback(err);
        }

        var wrapper = Fire(node);
        wrapper.name = this.name;
        wrapper.text = 'Text';
        wrapper._bitmapFont = this.url;

        return callback(null, node);
    }
});

},{}],13:[function(require,module,exports){
// Use this file to browserify

require('./texture');
require('./bitmap-font');
require('./sprite-animation');
require('./particle');
require('./sprite-atlas');


},{"./bitmap-font":12,"./particle":14,"./sprite-animation":15,"./sprite-atlas":16,"./texture":17}],14:[function(require,module,exports){
var ParticleAsset = Fire.Class({

    name: 'Runtime.ParticleAsset',

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

    createNode: function (callback) {
        var node;
        try {
            node = new cc.ParticleSystem();
        }
        catch(e) {
            return callback(e);
        }

        var wrapper = Fire(node);
        wrapper._file = this.url;
        wrapper.name = this.name;
        return callback(null, node);
    }
});

Runtime.ParticleAsset = ParticleAsset;

module.exports = ParticleAsset;

},{}],15:[function(require,module,exports){
module.exports = (function () {

    var SpriteAnimationAsset = Fire.Class({

        name: 'Runtime.SpriteAnimationAsset',

        extends: Fire.Asset,

        constructor: function () {
        },

        properties: {
            0: {
                default: '',
                type: Fire.Texture
            },

            2: {
                default: '',
                type: Fire.Texture
            },

            3: {
                default: '',
                type: Fire.Texture
            },

            4: {
                default: '',
                type: Fire.Texture
            },

            5: {
                default: '',
                type: Fire.Texture
            },

            6: {
                default: '',
                type: Fire.Texture
            },

            7: {
                default: '',
                type: Fire.Texture
            },

            8: {
                default: '',
                type: Fire.Texture
            },

            9: {
                default: '',
                type: Fire.Texture
            },


            loop: {
                default: true
            },

            delay: {
                default: 0.5
            }
        },
    });

    Runtime.SpriteAnimationAsset = SpriteAnimationAsset;

    return SpriteAnimationAsset;
})();

},{}],16:[function(require,module,exports){

var SpriteAtlas = Fire.Class({

    name: 'Runtime.SpriteAtlas',

    extends: Fire.Asset,

    constructor: function () {
    },

    properties: {
        plist: {
            get: function () {
                return this.urls[0];
            }
        },

        texture: {
            get: function () {
                return this.urls[1];
            }
        }
    },
});

Runtime.SpriteAtlas = SpriteAtlas;

module.exports =  SpriteAtlas;
},{}],17:[function(require,module,exports){

Fire.JS.mixin( Fire.Texture.prototype, {
    createNode: function (callback) {
        var sprite;

        try {
            sprite = new cc.Sprite(this.url);
        }
        catch(err) {
            return callback(err);
        }

        var wrapper = Fire(sprite);
        wrapper.name = this.name;

        return callback(null, sprite);
    }
});

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJidWlsZC1lbnRyeS5qcyIsInBhZ2UvQnV0dG9uLmpzIiwicGFnZS9iaXRtYXAtZm9udC5qcyIsInBhZ2UvZW5naW5lLmpzIiwicGFnZS9pbmRleC5qcyIsInBhZ2Uvbm9kZS5qcyIsInBhZ2UvcGFydGljbGUuanMiLCJwYWdlL3NjZW5lLmpzIiwicGFnZS9zcHJpdGUuanMiLCJwYWdlL3R5cGVzLmpzIiwicGFnZS91dGlscy5qcyIsInNoYXJlL2Fzc2V0L2JpdG1hcC1mb250LmpzIiwic2hhcmUvYXNzZXQvaW5kZXguanMiLCJzaGFyZS9hc3NldC9wYXJ0aWNsZS5qcyIsInNoYXJlL2Fzc2V0L3Nwcml0ZS1hbmltYXRpb24uanMiLCJzaGFyZS9hc3NldC9zcHJpdGUtYXRsYXMuanMiLCJzaGFyZS9hc3NldC90ZXh0dXJlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvTUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoZEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3h6QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1S0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJ3aW5kb3cuUnVudGltZSA9IHt9O1xuXG5yZXF1aXJlKCcuL3NoYXJlL2Fzc2V0Jyk7XG5yZXF1aXJlKCcuL3BhZ2UnKTtcbiIsIlxudmFyIE5vZGVXcmFwcGVyID0gcmVxdWlyZSgnLi9ub2RlJyk7XG5cbnZhciBCdXR0b25XcmFwcGVyID0gRmlyZS5DbGFzcyh7XG4gICAgbmFtZTogJ1J1bnRpbWUuQnV0dG9uV3JhcHBlcicsXG4gICAgZXh0ZW5kczogTm9kZVdyYXBwZXIsXG5cbiAgICBjb25zdHJ1Y3RvcjogZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLl9ub3JtYWxUZXhUb0xvYWQgPSAnJztcbiAgICAgICAgdGhpcy5fcHJlc3NlZFRleFRvTG9hZCA9ICcnO1xuICAgICAgICB0aGlzLl9kaXNhYmxlZFRleFRvTG9hZCA9ICcnO1xuICAgIH0sXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIF9ub3JtYWxUZXh0dXJlOiB7XG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMudGFyZ2V0Ti5fYnV0dG9uTm9ybWFsUmVuZGVyZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICcnO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB2YXIgdGV4dHVyZSA9IHRoaXMudGFyZ2V0Ti5fYnV0dG9uTm9ybWFsUmVuZGVyZXIudGV4dHVyZTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGV4dHVyZSA/IHRleHR1cmUudXJsIDogJyc7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiAoIHZhbHVlICkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnRhcmdldE4pIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50YXJnZXROLmxvYWRUZXh0dXJlTm9ybWFsKCB2YWx1ZSApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fbm9ybWFsVGV4VG9Mb2FkID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHZpc2libGU6IHRydWUsXG4gICAgICAgICAgICB1cmw6IEZpcmUuVGV4dHVyZVxuICAgICAgICB9LFxuXG4gICAgICAgIF9wcmVzc2VkVGV4dHVyZToge1xuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLnRhcmdldE4uX2J1dHRvbkNsaWNrZWRSZW5kZXJlcikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJyc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHZhciB0ZXh0dXJlID0gdGhpcy50YXJnZXROLl9idXR0b25DbGlja2VkUmVuZGVyZXIudGV4dHVyZTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGV4dHVyZSA/IHRleHR1cmUudXJsIDogJyc7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiAoIHZhbHVlICkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnRhcmdldE4pIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50YXJnZXROLmxvYWRUZXh0dXJlUHJlc3NlZCggdmFsdWUgKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3ByZXNzZWRUZXhUb0xvYWQgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdmlzaWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIHVybDogRmlyZS5UZXh0dXJlXG4gICAgICAgIH0sXG5cbiAgICAgICAgX2Rpc2FibGVkVGV4dHVyZToge1xuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLnRhcmdldE4uX2J1dHRvbkRpc2FibGVSZW5kZXJlcikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJyc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHZhciB0ZXh0dXJlID0gdGhpcy50YXJnZXROLl9idXR0b25EaXNhYmxlUmVuZGVyZXIudGV4dHVyZTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGV4dHVyZSA/IHRleHR1cmUudXJsIDogJyc7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiAoIHZhbHVlICkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnRhcmdldE4pIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50YXJnZXROLmxvYWRUZXh0dXJlRGlzYWJsZWQoIHZhbHVlICk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9kaXNhYmxlZFRleFRvTG9hZCA9IHZhbHVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB2aXNpYmxlOiB0cnVlLFxuICAgICAgICAgICAgdXJsOiBGaXJlLlRleHR1cmVcbiAgICAgICAgfSxcblxuICAgICAgICB0ZXh0OiB7XG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy50YXJnZXROLnRpdGxlVGV4dDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGFyZ2V0Ti50aXRsZVRleHQgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIEZpcmUuZXJyb3IoJ1RoZSBuZXcgdGV4dCBtdXN0IGJlIFN0cmluZycpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBmb250U2l6ZToge1xuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMudGFyZ2V0Ti50aXRsZUZvbnRTaXplO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgaWYgKCAhaXNOYU4odmFsdWUpICkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRhcmdldE4udGl0bGVGb250U2l6ZSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgRmlyZS5lcnJvcignVGhlIG5ldyBmb250U2l6ZSBtdXN0IG5vdCBiZSBOYU4nKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgZm9udDoge1xuICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICBpZiAoIXZhbHVlIHx8IHZhbHVlIGluc3RhbmNlb2YgRmlyZS5UVEZGb250KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2ZvbnQgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fc2V0Rm9udFRvTm9kZSh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBGaXJlLmVycm9yKCdUaGUgbmV3IGZvbnQgbXVzdCBiZSBGaXJlLlRURkZvbnQnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgZm9udFV1aWQ6IHtcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9mb250ID8gdGhpcy5fZm9udC5fdXVpZCA6ICcnO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgICAgICAgICAgICAgRmlyZS5Bc3NldExpYnJhcnkubG9hZEFzc2V0KHZhbHVlLCBmdW5jdGlvbiAoZXJyLCBhc3NldCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEZpcmUuZXJyb3IoJ0ZhaWxlZCB0byBsb2FkIGZvbnQgZnJvbSB1dWlkLCAnICsgZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuZm9udCA9IGFzc2V0O1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZm9udCA9IG51bGw7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAnRm9udCcsXG4gICAgICAgICAgICB0eXBlOiBGaXJlLlRURkZvbnRcbiAgICAgICAgfSxcblxuICAgICAgICBmb250RmFtaWx5OiB7XG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy50YXJnZXROLnRpdGxlRm9udE5hbWU7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRhcmdldE4udGl0bGVGb250TmFtZSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgRmlyZS5lcnJvcignVGhlIG5ldyBmb250RmFtaWx5IG11c3QgYmUgU3RyaW5nJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIF90ZXh0OiB7XG4gICAgICAgICAgICBkZWZhdWx0OiAnQnV0dG9uJ1xuICAgICAgICB9LFxuXG4gICAgICAgIF9mb250U2l6ZToge1xuICAgICAgICAgICAgZGVmYXVsdDogMTZcbiAgICAgICAgfSxcblxuICAgICAgICBfZm9udDoge1xuICAgICAgICAgICAgZGVmYXVsdDogbnVsbFxuICAgICAgICB9LFxuXG4gICAgICAgIF9mb250RmFtaWx5OiB7XG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsXG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgc3RhdGljczoge1xuICAgIH0sXG5cbiAgICBfc2V0Rm9udFRvTm9kZTogZnVuY3Rpb24oZm9udEFzc2V0LCBub2RlKSB7XG4gICAgICAgIG5vZGUgPSBub2RlID8gbm9kZSA6IHRoaXMudGFyZ2V0TjtcblxuICAgICAgICBpZiAoZm9udEFzc2V0KSB7XG4gICAgICAgICAgICB2YXIgY29uZmlnID0ge3R5cGU6J2ZvbnQnLCBuYW1lOiBmb250QXNzZXQuZm9udEZhbWlseSwgc3JjczpbZm9udEFzc2V0LnVybF19O1xuICAgICAgICAgICAgY2MubG9hZGVyLmxvYWQoY29uZmlnLCBmdW5jdGlvbiAoZXJyLCByZXN1bHRzKSB7XG4gICAgICAgICAgICAgICAgaWYgKGVycikgdGhyb3cgZXJyO1xuXG4gICAgICAgICAgICAgICAgbm9kZS50aXRsZUZvbnROYW1lID0gY29uZmlnLm5hbWU7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBvbkJlZm9yZVNlcmlhbGl6ZTogZnVuY3Rpb24gKCkge1xuICAgICAgICBOb2RlV3JhcHBlci5wcm90b3R5cGUub25CZWZvcmVTZXJpYWxpemUuY2FsbCh0aGlzKTtcblxuICAgICAgICB0aGlzLl90ZXh0ID0gdGhpcy50ZXh0O1xuICAgICAgICB0aGlzLl9mb250U2l6ZSA9IHRoaXMuZm9udFNpemU7XG4gICAgICAgIHRoaXMuX2ZvbnQgPSB0aGlzLmZvbnRVdWlkID8gRWRpdG9yLnNlcmlhbGl6ZS5hc0Fzc2V0KHRoaXMuZm9udFV1aWQpIDogbnVsbDtcbiAgICAgICAgdGhpcy5fZm9udEZhbWlseSA9IHRoaXMuZm9udEZhbWlseTtcbiAgICB9LFxuXG4gICAgY3JlYXRlTm9kZTogZnVuY3Rpb24gKG5vZGUpIHtcblxuICAgICAgICBub2RlID0gbm9kZSB8fCBuZXcgY2N1aS5CdXR0b24oIHRoaXMuX25vcm1hbFRleFRvTG9hZCwgdGhpcy5fcHJlc3NlZFRleFRvTG9hZCwgdGhpcy5fZGlzYWJsZWRUZXhUb0xvYWQgKTtcblxuICAgICAgICB0aGlzLl9ub3JtYWxUZXhUb0xvYWQgPSB0aGlzLl9wcmVzc2VkVGV4VG9Mb2FkID0gdGhpcy5fZGlzYWJsZWRUZXhUb0xvYWQgPSAnJztcblxuICAgICAgICBOb2RlV3JhcHBlci5wcm90b3R5cGUuY3JlYXRlTm9kZS5jYWxsKHRoaXMsIG5vZGUpO1xuXG4gICAgICAgIG5vZGUudGl0bGVUZXh0ID0gdGhpcy5fdGV4dDtcbiAgICAgICAgbm9kZS50aXRsZUZvbnRTaXplID0gdGhpcy5fZm9udFNpemU7XG4gICAgICAgIG5vZGUudGl0bGVGb250TmFtZSA9IHRoaXMuX2ZvbnRGYW1pbHkgPT09IG51bGwgPyBub2RlLnRpdGxlRm9udE5hbWUgOiB0aGlzLl9mb250RmFtaWx5O1xuXG4gICAgICAgIHRoaXMuX3NldEZvbnRUb05vZGUodGhpcy5fZm9udCwgbm9kZSk7XG5cbiAgICAgICAgcmV0dXJuIG5vZGU7XG4gICAgfVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gQnV0dG9uV3JhcHBlcjtcbiIsIlxudmFyIFRleHRBbGlnbiA9IFJ1bnRpbWUuVGV4dEFsaWduO1xudmFyIFRleHRBbmNob3IgPSBSdW50aW1lLlRleHRBbmNob3I7XG5cbnZhciBnZXRBbmNob3JQb2ludCA9IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIEFuY2hvcjJQb2ludCA9IG5ldyBBcnJheShUZXh0QW5jaG9yLkJvdHRvbVJpZ2h0ICsgMSk7XG4gICAgQW5jaG9yMlBvaW50W1RleHRBbmNob3IuVG9wTGVmdF0gICAgICA9IGNjLnAoMCwgICAxKTtcbiAgICBBbmNob3IyUG9pbnRbVGV4dEFuY2hvci5Ub3BDZW50ZXJdICAgID0gY2MucCgwLjUsIDEpO1xuICAgIEFuY2hvcjJQb2ludFtUZXh0QW5jaG9yLlRvcFJpZ2h0XSAgICAgPSBjYy5wKDEsICAgMSk7XG4gICAgQW5jaG9yMlBvaW50W1RleHRBbmNob3IuTWlkZGxlTGVmdF0gICA9IGNjLnAoMCwgICAwLjUpO1xuICAgIEFuY2hvcjJQb2ludFtUZXh0QW5jaG9yLk1pZGRsZUNlbnRlcl0gPSBjYy5wKDAuNSwgMC41KTtcbiAgICBBbmNob3IyUG9pbnRbVGV4dEFuY2hvci5NaWRkbGVSaWdodF0gID0gY2MucCgxLCAgIDAuNSk7XG4gICAgQW5jaG9yMlBvaW50W1RleHRBbmNob3IuQm90dG9tTGVmdF0gICA9IGNjLnAoMCwgICAwKTtcbiAgICBBbmNob3IyUG9pbnRbVGV4dEFuY2hvci5Cb3R0b21DZW50ZXJdID0gY2MucCgwLjUsIDApO1xuICAgIEFuY2hvcjJQb2ludFtUZXh0QW5jaG9yLkJvdHRvbVJpZ2h0XSAgPSBjYy5wKDEsICAgMCk7XG5cbiAgICByZXR1cm4gKGZ1bmN0aW9uICh0ZXh0QW5jaG9yKSB7XG4gICAgICAgIHZhciBhbmNob3JQb2ludCA9IEFuY2hvcjJQb2ludFt0ZXh0QW5jaG9yXTtcbiAgICAgICAgcmV0dXJuIGNjLnAoYW5jaG9yUG9pbnQpO1xuICAgIH0pO1xufSkoKTtcblxuXG52YXIgTm9kZVdyYXBwZXIgPSByZXF1aXJlKCcuL25vZGUnKTtcblxudmFyIEJpdG1hcEZvbnRXcmFwcGVyID0gRmlyZS5DbGFzcyh7XG4gICAgbmFtZTogJ1J1bnRpbWUuQml0bWFwRm9udFdyYXBwZXInLFxuICAgIGV4dGVuZHM6IE5vZGVXcmFwcGVyLFxuXG4gICAgY29uc3RydWN0b3I6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5fYml0bWFwRm9udFRvTG9hZCA9ICcnO1xuICAgIH0sXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG5cbiAgICAgICAgX2JpdG1hcEZvbnQ6IHtcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnRhcmdldE4uX2ZudEZpbGUgfHwgJyc7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9iaXRtYXBGb250VG9Mb2FkID0gdmFsdWU7XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy50YXJnZXROKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGFyZ2V0Ti5fZm50RmlsZSA9IHZhbHVlO1xuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMub25CZWZvcmVTZXJpYWxpemUoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jcmVhdGVOb2RlKHRoaXMudGFyZ2V0Tik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHZpc2libGU6IHRydWUsXG4gICAgICAgICAgICB1cmw6IEZpcmUuQml0bWFwRm9udFxuICAgICAgICB9LFxuXG4gICAgICAgIHRleHQ6IHtcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnRhcmdldE4uc3RyaW5nO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24gKCB2YWx1ZSApIHtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRhcmdldE4uc3RyaW5nID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBGaXJlLmVycm9yKCdUaGUgbmV3IHRleHQgbXVzdCBiZSBzdHJpbmcnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgYW5jaG9yOiB7XG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fYW5jaG9yO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24gKCB2YWx1ZSApIHtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9hbmNob3IgPSB2YWx1ZTtcblxuICAgICAgICAgICAgICAgICAgICB2YXIgYW5jaG9yUG9pbnQgPSBnZXRBbmNob3JQb2ludCh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGFyZ2V0Ti5zZXRBbmNob3JQb2ludCggYW5jaG9yUG9pbnQgKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIEZpcmUuZXJyb3IoJ1RoZSBuZXcgdGV4dCBtdXN0IGJlIG51bWJlcicpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0eXBlOiBUZXh0QW5jaG9yXG4gICAgICAgIH0sXG5cbiAgICAgICAgYWxpZ246IHtcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnRhcmdldE4udGV4dEFsaWduO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24gKCB2YWx1ZSApIHtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRhcmdldE4udGV4dEFsaWduID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBGaXJlLmVycm9yKCdUaGUgbmV3IHRleHQgbXVzdCBiZSBudW1iZXInKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdHlwZTogVGV4dEFsaWduXG4gICAgICAgIH0sXG5cbiAgICAgICAgY2hpbGRyZW5OOiB7XG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gW107XG4gICAgICAgICAgICB9LFxuICAgICAgICB9LFxuXG5cbiAgICAgICAgX3RleHQ6IHtcbiAgICAgICAgICAgIGRlZmF1bHQ6IFwiXCJcbiAgICAgICAgfSxcblxuICAgICAgICBfYW5jaG9yOiB7XG4gICAgICAgICAgICBkZWZhdWx0OiBUZXh0QW5jaG9yLk1pZGRsZUNlbnRlclxuICAgICAgICB9LFxuXG4gICAgICAgIF9hbGlnbjoge1xuICAgICAgICAgICAgZGVmYXVsdDogVGV4dEFsaWduLkxlZnRcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBzdGF0aWNzOiB7XG4gICAgICAgIGNhbkhhdmVDaGlsZHJlbkluRWRpdG9yOiBmYWxzZVxuICAgIH0sXG5cbiAgICBvbkJlZm9yZVNlcmlhbGl6ZTogZnVuY3Rpb24gKCkge1xuICAgICAgICBOb2RlV3JhcHBlci5wcm90b3R5cGUub25CZWZvcmVTZXJpYWxpemUuY2FsbCh0aGlzKTtcblxuICAgICAgICB0aGlzLl90ZXh0ID0gdGhpcy50ZXh0O1xuICAgICAgICB0aGlzLl9hbmNob3IgPSB0aGlzLmFuY2hvcjtcbiAgICAgICAgdGhpcy5fYWxpZ24gPSB0aGlzLmFsaWduO1xuICAgIH0sXG5cbiAgICBjcmVhdGVOb2RlOiBmdW5jdGlvbiAobm9kZSkge1xuICAgICAgICBub2RlID0gbm9kZSB8fCBuZXcgY2MuTGFiZWxCTUZvbnQoKTtcblxuICAgICAgICBOb2RlV3JhcHBlci5wcm90b3R5cGUuY3JlYXRlTm9kZS5jYWxsKHRoaXMsIG5vZGUpO1xuXG4gICAgICAgIHZhciBiaXRtYXBGb250VXJsO1xuXG4gICAgICAgIGlmICggdGhpcy5fYml0bWFwRm9udFRvTG9hZCApIHtcbiAgICAgICAgICAgIGJpdG1hcEZvbnRVcmwgPSB0aGlzLl9iaXRtYXBGb250VG9Mb2FkO1xuICAgICAgICAgICAgdGhpcy5fYml0bWFwRm9udFRvTG9hZCA9ICcnO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCBiaXRtYXBGb250VXJsICkge1xuICAgICAgICAgICAgY2MubG9hZGVyLmxvYWQoIGJpdG1hcEZvbnRVcmwsIGZ1bmN0aW9uIChlcnIsIHJlc3VsdHMpIHtcbiAgICAgICAgICAgICAgICBub2RlLmluaXRXaXRoU3RyaW5nKHRoaXMuX3RleHQsIGJpdG1hcEZvbnRVcmwpO1xuICAgICAgICAgICAgICAgIG5vZGUuc2V0QW5jaG9yUG9pbnQoIGdldEFuY2hvclBvaW50KHRoaXMuX2FuY2hvcikgKTtcbiAgICAgICAgICAgICAgICBub2RlLnRleHRBbGlnbiA9IHRoaXMuX2FsaWduO1xuICAgICAgICAgICAgfS5iaW5kKHRoaXMpKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIG5vZGUuc2V0QW5jaG9yUG9pbnQoIGdldEFuY2hvclBvaW50KHRoaXMuX2FuY2hvcikgKTtcbiAgICAgICAgICAgIG5vZGUudGV4dEFsaWduID0gdGhpcy5fYWxpZ247XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbm9kZTtcbiAgICB9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBCaXRtYXBGb250V3JhcHBlcjtcbiIsIlxudmFyIEVuZ2luZVdyYXBwZXIgPSBGaXJlLkNsYXNzKHtcbiAgICBuYW1lOiAnUnVudGltZS5FbmdpbmVXcmFwcGVyJyxcbiAgICBleHRlbmRzOiBGaXJlLlJ1bnRpbWUuRW5naW5lV3JhcHBlcixcbiAgICBjb25zdHJ1Y3RvcjogZnVuY3Rpb24gKCkge1xuICAgIH0sXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIGNhbnZhc1NpemU6IHtcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHZhciBzaXplID0gY2Mudmlldy5nZXRWaXNpYmxlU2l6ZSgpXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBGaXJlLlZlYzIoc2l6ZS53aWR0aCwgc2l6ZS5oZWlnaHQpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgdmFyIHdpZHRoID0gdmFsdWUueDtcbiAgICAgICAgICAgICAgICB2YXIgaGVpZ2h0ID0gdmFsdWUueTtcblxuICAgICAgICAgICAgICAgIHZhciB2aWV3ID0gY2MudmlldztcblxuICAgICAgICAgICAgICAgIHZpZXcuc2V0RGVzaWduUmVzb2x1dGlvblNpemUod2lkdGgsIGhlaWdodCwgdmlldy5fcmVzb2x1dGlvblBvbGljeSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgX25lZWRBbmltYXRlOiBmYWxzZSxcbiAgICAgICAgX25lZWRSZW5kZXI6IHRydWUsXG4gICAgfSxcblxuICAgIGluaXRSdW50aW1lOiBmdW5jdGlvbiAob3B0aW9ucywgY2FsbGJhY2spIHtcbiAgICAgICAgdmFyIHdpZHRoICA9IG9wdGlvbnMud2lkdGggIHx8IDgwMDtcbiAgICAgICAgdmFyIGhlaWdodCA9IG9wdGlvbnMuaGVpZ2h0IHx8IDYwMDtcbiAgICAgICAgdmFyIGNhbnZhcyA9IG9wdGlvbnMuY2FudmFzO1xuICAgICAgICB2YXIgaWQgICAgID0gJ2dhbWVDYW52YXMnO1xuXG4gICAgICAgIGlmICggY2FudmFzLmlkICkge1xuICAgICAgICAgICAgaWQgPSBjYW52YXMuaWQ7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjYW52YXMuaWQgPSBpZDtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgICAgICBpZiAoZG9jdW1lbnQpIHtcbiAgICAgICAgICAgIGRvY3VtZW50LmNjQ29uZmlnID0ge1xuICAgICAgICAgICAgICAgICd3aWR0aCcgICAgICAgICA6IHdpZHRoLFxuICAgICAgICAgICAgICAgICdoZWlnaHQnICAgICAgICA6IGhlaWdodCxcbiAgICAgICAgICAgICAgICAnZGVidWdNb2RlJyAgICAgOiAxLFxuICAgICAgICAgICAgICAgICdzaG93RlBTJyAgICAgICA6IGZhbHNlLFxuICAgICAgICAgICAgICAgICdmcmFtZVJhdGUnICAgICA6IDYwLFxuICAgICAgICAgICAgICAgICdpZCcgICAgICAgICAgICA6IGlkLFxuICAgICAgICAgICAgICAgICdyZW5kZXJNb2RlJyAgICA6IDIsICAgICAgICAgICAgICAgICAvLyAwOiBhdXRvLCAxOkNhbnZhcywgMjpXZWJnbFxuICAgICAgICAgICAgICAgICdqc0xpc3QnICAgICAgICA6IFtdXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgY2MuZ2FtZS5faW5pdENvbmZpZygpO1xuXG4gICAgICAgIGNjLmdhbWUub25TdGFydCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBzY2VuZSA9IG5ldyBjYy5TY2VuZSgpO1xuXG4gICAgICAgICAgICAvLyBzY2VuZSBhbmNob3IgcG9pbnQgbmVlZCBiZSAwLDBcbiAgICAgICAgICAgIHNjZW5lLnNldEFuY2hvclBvaW50KDAuMCwgMC4wKTtcblxuICAgICAgICAgICAgY2Mudmlldy5zZXRSZXNvbHV0aW9uUG9saWN5KCBjYy5SZXNvbHV0aW9uUG9saWN5LlNIT1dfQUxMICk7XG4gICAgICAgICAgICBzZWxmLl9zZXRDdXJyZW50U2NlbmVOKHNjZW5lKTtcblxuICAgICAgICAgICAgLy8gZG9udCB1cGRhdGUgbG9naWMgYmVmb3JlIHJlbmRlcmluZ1xuICAgICAgICAgICAgLy8gY2MuZGlyZWN0b3IucGF1c2UoKTtcbiAgICAgICAgICAgIGNjLmRpcmVjdG9yLl9wYXVzZWQgPSB0cnVlO1xuXG4gICAgICAgICAgICAvLyBzZXQgY29jb3MgY2FudmFzIHRhYmluZGV4IHRvIC0xIGluIGVkaXQgbW9kZVxuICAgICAgICAgICAgY2MuX2NhbnZhcy5zZXRBdHRyaWJ1dGUoJ3RhYmluZGV4JywgLTEpO1xuICAgICAgICAgICAgY2MuX2NhbnZhcy5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAnJztcbiAgICAgICAgICAgIGlmIChjYy5pbWVEaXNwYXRjaGVyICYmIGNjLmltZURpc3BhdGNoZXIuX2RvbUlucHV0Q29udHJvbCkge1xuICAgICAgICAgICAgICAgIGNjLmltZURpc3BhdGNoZXIuX2RvbUlucHV0Q29udHJvbC5zZXRBdHRyaWJ1dGUoJ3RhYmluZGV4JywgLTEpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBzZWxmLmNhbnZhc1NpemUgPSBuZXcgRmlyZS5WZWMyKHdpZHRoLCBoZWlnaHQpO1xuXG4gICAgICAgICAgICBzZWxmLl9yZWdpc3RlclN0ZXBSdW50aW1lKCk7XG5cbiAgICAgICAgICAgIGlmIChjYWxsYmFjaykge1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgLy8gZG9udCByZWdpc3RlciBldmVudCBvdGhlcndpc2UgY29jb3Mgd2lsbCBibG9jayBldmVudCdzIHByb3BhZ2F0aW9uIGluIGVkaXQgbW9kZS5cbiAgICAgICAgdGhpcy5fZG9udFJlZ2lzdGVyU3lzdGVtRXZlbnQoKTtcblxuICAgICAgICBjYy5nYW1lLnJ1bigpO1xuXG4gICAgfSxcblxuICAgIHBsYXlSdW50aW1lOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuX3JlZ2lzdGVyQ29jb3NTeXN0ZW1FdmVudChjYy5fY2FudmFzKTtcblxuICAgICAgICAvLyBwbGF5aW5nIG1vZGUgbmVlZCA2MCBGUFNcbiAgICAgICAgLy8gY2MuZ2FtZS5zZXRGcmFtZVJhdGUoNjApO1xuXG4gICAgICAgIC8vIHJlc2V0IGNvY29zIHRhYmluZGV4IGluIHBsYXlpbmcgbW9kZVxuICAgICAgICBjYy5fY2FudmFzLnNldEF0dHJpYnV0ZSgndGFiaW5kZXgnLCA5OSk7XG4gICAgICAgIGNjLl9jYW52YXMuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ2JsYWNrJztcbiAgICAgICAgaWYgKGNjLmltZURpc3BhdGNoZXIgJiYgY2MuaW1lRGlzcGF0Y2hlci5fZG9tSW5wdXRDb250cm9sKSB7XG4gICAgICAgICAgICBjYy5pbWVEaXNwYXRjaGVyLl9kb21JbnB1dENvbnRyb2wuc2V0QXR0cmlidXRlKCd0YWJpbmRleCcsIDIpO1xuICAgICAgICB9XG4gICAgICAgIGNjLmRpcmVjdG9yLnJlc3VtZSgpO1xuXG4gICAgICAgIGNjLnZpZXcuc2V0RGVzaWduUmVzb2x1dGlvblNpemUoNjQwLCA0ODApO1xuICAgICAgICBjYy52aWV3LnJlc2l6ZVdpdGhCcm93c2VyU2l6ZSh0cnVlKTtcbiAgICB9LFxuXG4gICAgc3RvcFJ1bnRpbWU6IGZ1bmN0aW9uICgpIHtcblxuICAgIH0sXG5cbiAgICBwYXVzZVJ1bnRpbWU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY2MuZGlyZWN0b3IucGF1c2UoKTtcbiAgICB9LFxuXG4gICAgcmVzdW1lUnVudGltZTogZnVuY3Rpb24gKCkge1xuICAgICAgICBjYy5kaXJlY3Rvci5yZXN1bWUoKTtcbiAgICB9LFxuXG4gICAgYW5pbWF0ZVJ1bnRpbWU6IGZ1bmN0aW9uIChkdCkge1xuICAgICAgICB0aGlzLl9uZWVkQW5pbWF0ZSA9IHRydWU7XG4gICAgfSxcblxuICAgIHJlbmRlclJ1bnRpbWU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5fbmVlZFJlbmRlciA9IHRydWU7XG4gICAgfSxcblxuICAgIF9yZWdpc3RlclN0ZXBSdW50aW1lOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgdmFyIG9yaWdpbkRyYXdTY2VuZSA9IGNjLmRpcmVjdG9yLmRyYXdTY2VuZTtcblxuICAgICAgICBjYy5kaXJlY3Rvci5kcmF3U2NlbmUgPSBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgICAgIGlmICggIXNlbGYuaXNQbGF5aW5nICYmICFzZWxmLl9uZWVkUmVuZGVyICkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgc2VsZi5fbmVlZFJlbmRlciA9IGZhbHNlO1xuXG4gICAgICAgICAgICB2YXIgZW5naW5lID0gRmlyZS5lbmdpbmU7XG5cbiAgICAgICAgICAgIGVuZ2luZS5lbWl0KCdwb3N0LXVwZGF0ZScpO1xuXG4gICAgICAgICAgICBpZiAoZW5naW5lLl9zdGVwT25jZSB8fCAoIXNlbGYuaXNQbGF5aW5nICYmIGVuZ2luZS5fbmVlZEFuaW1hdGUpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fcGF1c2VkID0gZmFsc2U7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIG9yaWdpbkRyYXdTY2VuZS5jYWxsKHRoaXMpO1xuXG4gICAgICAgICAgICBpZiAoZW5naW5lLl9zdGVwT25jZSB8fCAoIXNlbGYuaXNQbGF5aW5nICYmIGVuZ2luZS5fbmVlZEFuaW1hdGUpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fcGF1c2VkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBlbmdpbmUuX3N0ZXBPbmNlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgZW5naW5lLl9uZWVkQW5pbWF0ZSA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcblxuICAgIF9zZXRDdXJyZW50U2NlbmVOOiBmdW5jdGlvbiAoc2NlbmUpIHtcbiAgICAgICAgY2MuZGlyZWN0b3IucnVuU2NlbmUoc2NlbmUpO1xuICAgICAgICBjYy5kaXJlY3Rvci5zZXROZXh0U2NlbmUoKTtcbiAgICB9LFxuXG4gICAgZ2V0Q3VycmVudFNjZW5lTjogZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gY2MuZGlyZWN0b3IuZ2V0UnVubmluZ1NjZW5lKCk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIENvY29zIHdpbGwgYmxvY2sgZXZlbnQncyBwcm9wYWdhdGlvbiwgaXQncyBub3Qgc3VpdGFibGUgZm9yIGVkaXQgbW9kZS5cbiAgICAgKiBTbyBoYWNrIGNjLmlucHV0TWFuYWdlci5yZWdpc3RlclN5c3RlbUV2ZW50LCByZXJlZ2lzdGVyIGNvY29zIHN5c3RlbSBldmVudCB3aGVuIHBsYXkgcnVudGltZS5cbiAgICAgKi9cbiAgICBfZG9udFJlZ2lzdGVyU3lzdGVtRXZlbnQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5fcmVnaXN0ZXJDb2Nvc1N5c3RlbUV2ZW50ID0gY2MuaW5wdXRNYW5hZ2VyLnJlZ2lzdGVyU3lzdGVtRXZlbnQuYmluZCggY2MuaW5wdXRNYW5hZ2VyICk7XG5cbiAgICAgICAgY2MuaW5wdXRNYW5hZ2VyLnJlZ2lzdGVyU3lzdGVtRXZlbnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIH07XG4gICAgfSxcblxuICAgIGdldEludGVyc2VjdGlvbkxpc3Q6IGZ1bmN0aW9uIChyZWN0KSB7XG4gICAgICAgIHZhciBzY2VuZSA9IHRoaXMuZ2V0Q3VycmVudFNjZW5lKCk7XG4gICAgICAgIHZhciBsaXN0ID0gW107XG5cbiAgICAgICAgc2NlbmUuX2RlZXBRdWVyeUNoaWxkcmVuKGZ1bmN0aW9uIChjaGlsZCkge1xuXG4gICAgICAgICAgICB2YXIgYm91bmRzID0gY2hpbGQuZ2V0V29ybGRCb3VuZHMoKTtcblxuICAgICAgICAgICAgLy8gaWYgaW50ZXJzZWN0IGFhYmIgc3VjY2VzcywgdGhlbiB0cnkgaW50ZXJzZWN0IG9iYlxuICAgICAgICAgICAgaWYgKHJlY3QuaW50ZXJzZWN0cyhib3VuZHMpKSB7XG4gICAgICAgICAgICAgICAgYm91bmRzID0gY2hpbGQuZ2V0V29ybGRPcmllbnRlZEJvdW5kcygpO1xuICAgICAgICAgICAgICAgIHZhciBwb2x5Z29uID0gbmV3IEZpcmUuUG9seWdvbihib3VuZHMpO1xuXG4gICAgICAgICAgICAgICAgaWYgKEZpcmUuSW50ZXJzZWN0aW9uLnJlY3RQb2x5Z29uKHJlY3QsIHBvbHlnb24pKSB7XG4gICAgICAgICAgICAgICAgICAgIGxpc3QucHVzaChjaGlsZC50YXJnZXROKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gbGlzdDtcbiAgICB9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBFbmdpbmVXcmFwcGVyO1xuIiwicmVxdWlyZSgnLi91dGlscycpO1xucmVxdWlyZSgnLi90eXBlcycpO1xuXG5cbi8vIHJlcXVpcmUgZW5naW5lXG52YXIgRW5naW5lV3JhcHBlciA9IHJlcXVpcmUoJy4vZW5naW5lJyk7XG5cbi8vIHJlZ2lzdGVyIGVuZ2luZSB3cmFwcGVyXG5GaXJlLlJ1bnRpbWUucmVnaXN0ZXJFbmdpbmUoIG5ldyBFbmdpbmVXcmFwcGVyKGZhbHNlKSApO1xuXG4vLyByZWdpc3RlciBub2RlIHR5cGVcbnZhciB0eXBlcyA9IFtcbiAgICBbY2MsICAgJ05vZGUnLCAgICAgICAgICAgcmVxdWlyZSgnLi9ub2RlJyksICAgICAgICAgJ05vZGUnXSxcbiAgICBbY2MsICAgJ1NjZW5lJywgICAgICAgICAgcmVxdWlyZSgnLi9zY2VuZScpXSxcbiAgICAvL1tjYywgJ0xvYWRlclNjZW5lJywgIHJlcXVpcmUoJy4vc2NlbmUnKV0sXG4gICAgW2NjLCAgICdTcHJpdGUnLCAgICAgICAgIHJlcXVpcmUoJy4vc3ByaXRlJyksICAgICAgICdTcHJpdGUnXSxcbiAgICBbY2MsICAgJ0xhYmVsQk1Gb250JywgICAgcmVxdWlyZSgnLi9iaXRtYXAtZm9udCcpLCAgJ0xhYmVsQk1Gb250J10sXG4gICAgW2NjLCAgICdQYXJ0aWNsZVN5c3RlbScsIHJlcXVpcmUoJy4vcGFydGljbGUnKSwgICAgICdQYXJ0aWNsZVN5c3RlbSddLFxuICAgIFtjY3VpLCAnQnV0dG9uJywgICAgICAgICByZXF1aXJlKCcuL0J1dHRvbicpLCAgICAgICAnVUkvQnV0dG9uJ11cbl07XG5cblxudHlwZXMuZm9yRWFjaChmdW5jdGlvbiAodHlwZSkge1xuICAgIHJlZ2lzdGVyQ0NOb2RlVHlwZSggdHlwZVswXSwgdHlwZVsxXSwgdHlwZVsyXSwgdHlwZVszXSApO1xufSk7XG5cblxuZnVuY3Rpb24gcmVnaXN0ZXJDQ05vZGVUeXBlIChuYW1lc3BhY2UsIG5hbWUsIHdyYXBwZXIsIG1lbnVQYXRoKSB7XG4gICAgdmFyIG5vZGVUeXBlID0gbmFtZXNwYWNlW25hbWVdO1xuXG4gICAgLy8g5YWI5bGP6JS977yM5Zug5Li66L+Y5pyJ5b6I5aSa6IqC54K557G75Z6L5rKh5rOo5YaMXG4gICAgLy9ub2RlVHlwZSA9IEZpcmUuQ2xhc3Moe1xuICAgIC8vICAgIGV4dGVuZHM6IG5vZGVUeXBlLFxuICAgIC8vICAgIGNvbnN0cnVjdG9yOiBmdW5jdGlvbiAoKSB7XG4gICAgLy8gICAgICAgIHRoaXMuX0ZCX3dyYXBwZXIgPSBudWxsO1xuICAgIC8vICAgIH1cbiAgICAvL30pO1xuXG4gICAgRmlyZS5SdW50aW1lLnJlZ2lzdGVyTm9kZVR5cGUobm9kZVR5cGUsIHdyYXBwZXIsIG1lbnVQYXRoKTtcblxuICAgIG5hbWVzcGFjZVtuYW1lXSA9IG5vZGVUeXBlO1xufVxuIiwidmFyIFZlYzIgPSBGaXJlLlZlYzI7XG52YXIgUmVjdCA9IEZpcmUuUmVjdDtcbnZhciBDb2xvciA9IEZpcmUuQ29sb3I7XG52YXIgSGVscGVycyA9IEZpcmUuUnVudGltZS5IZWxwZXJzO1xuXG4vKipcbiAqIEBjbGFzcyBOb2RlV3JhcHBlclxuICogQGV4dGVuZHMgRmlyZS5SdW50aW1lLk5vZGVXcmFwcGVyXG4gKiBAY29uc3RydWN0b3JcbiAqIEBwYXJhbSB7UnVudGltZU5vZGV9IG5vZGVcbiAqL1xudmFyIE5vZGVXcmFwcGVyID0gRmlyZS5DbGFzcyh7XG4gICAgbmFtZTogJ1J1bnRpbWUuTm9kZVdyYXBwZXInLFxuICAgIGV4dGVuZHM6IEZpcmUuUnVudGltZS5Ob2RlV3JhcHBlcixcblxuICAgIHByb3BlcnRpZXM6IHtcblxuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIG5hbWUgb2YgdGhlIG5vZGUuXG4gICAgICAgICAqIEBwcm9wZXJ0eSBuYW1lXG4gICAgICAgICAqIEB0eXBlIHtzdHJpbmd9XG4gICAgICAgICAqL1xuICAgICAgICBuYW1lOiB7XG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy50YXJnZXROLmdldE5hbWUoKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMudGFyZ2V0Ti5zZXROYW1lKHZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICAvLyBISUVSQVJDSFlcblxuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIHBhcmVudCBvZiB0aGUgbm9kZS5cbiAgICAgICAgICogSWYgdGhpcyBpcyB0aGUgdG9wIG1vc3Qgbm9kZSBpbiBoaWVyYXJjaHksIHRoZSByZXR1cm5zIHZhbHVlIG9mIEZpcmUodGhpcy5wYXJlbnQpIG11c3QgYmUgdHlwZSBTY2VuZVdyYXBwZXIuXG4gICAgICAgICAqIENoYW5naW5nIHRoZSBwYXJlbnQgd2lsbCBrZWVwIHRoZSB0cmFuc2Zvcm0ncyBsb2NhbCBzcGFjZSBwb3NpdGlvbiwgcm90YXRpb24gYW5kIHNjYWxlIHRoZSBzYW1lIGJ1dCBtb2RpZnlcbiAgICAgICAgICogdGhlIHdvcmxkIHNwYWNlIHBvc2l0aW9uLCBzY2FsZSBhbmQgcm90YXRpb24uXG4gICAgICAgICAqIEBwcm9wZXJ0eSBwYXJlbnROXG4gICAgICAgICAqIEB0eXBlIHtSdW50aW1lTm9kZX1cbiAgICAgICAgICovXG4gICAgICAgIHBhcmVudE46IHtcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnRhcmdldE4ucGFyZW50O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgaWYgKCB0aGlzLnRhcmdldE4ucGFyZW50ICkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRhcmdldE4ucmVtb3ZlRnJvbVBhcmVudCgpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmKCB2YWx1ZSApIHtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUuYWRkQ2hpbGQodGhpcy50YXJnZXROKTtcblxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldE1heFpvcmRlcigpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB2aXNpYmxlOiBmYWxzZVxuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBSZXR1cm5zIHRoZSBhcnJheSBvZiBjaGlsZHJlbi4gSWYgbm8gY2hpbGQsIHRoaXMgbWV0aG9kIHNob3VsZCByZXR1cm4gYW4gZW1wdHkgYXJyYXkuXG4gICAgICAgICAqIFRoZSByZXR1cm5zIGFycmF5IGNhbiBiZSBtb2RpZmllZCBPTkxZIGluIHNldFNpYmxpbmdJbmRleC5cbiAgICAgICAgICogQHByb3BlcnR5IGNoaWxkcmVuTlxuICAgICAgICAgKiBAdHlwZSB7UnVudGltZU5vZGVbXX1cbiAgICAgICAgICogQHJlYWRPbmx5XG4gICAgICAgICAqL1xuICAgICAgICBjaGlsZHJlbk46IHtcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnRhcmdldE4uY2hpbGRyZW47XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdmlzaWJsZTogZmFsc2VcbiAgICAgICAgfSxcblxuICAgICAgICAvLyBUUkFOU0ZPUk1cblxuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIGxvY2FsIHBvc2l0aW9uIGluIGl0cyBwYXJlbnQncyBjb29yZGluYXRlIHN5c3RlbVxuICAgICAgICAgKiBAcHJvcGVydHkgcG9zaXRpb25cbiAgICAgICAgICogQHR5cGUge0ZpcmUuVmVjMn1cbiAgICAgICAgICovXG4gICAgICAgIHBvc2l0aW9uOiB7XG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IFZlYzIodGhpcy50YXJnZXROLngsIHRoaXMudGFyZ2V0Ti55KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIGlmICggdmFsdWUgaW5zdGFuY2VvZiBWZWMyICkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRhcmdldE4uc2V0UG9zaXRpb24odmFsdWUueCwgdmFsdWUueSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBGaXJlLmVycm9yKCdUaGUgbmV3IHBvc2l0aW9uIG11c3QgYmUgRmlyZS5WZWMyJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgcG9zaXRpb24gb2YgdGhlIHRyYW5zZm9ybSBpbiB3b3JsZCBzcGFjZVxuICAgICAgICAgKiBAcHJvcGVydHkgd29ybGRQb3NpdGlvblxuICAgICAgICAgKiBAdHlwZSB7RmlyZS5WZWMyfVxuICAgICAgICAgKi9cbiAgICAgICAgd29ybGRQb3NpdGlvbjoge1xuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdmFyIHBvcyA9IHRoaXMudGFyZ2V0Ti5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIoY2MucCgwLDApKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IFZlYzIocG9zLngsIHBvcy55KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIGlmICggdmFsdWUgaW5zdGFuY2VvZiBWZWMyICkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIHRoaXMucGFyZW50TiApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBwID0gdGhpcy5wYXJlbnROLmNvbnZlcnRUb05vZGVTcGFjZSh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRhcmdldE4uc2V0UG9zaXRpb24ocC54LCBwLnkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wb3NpdGlvbiA9IHZhbHVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBGaXJlLmVycm9yKCdUaGUgbmV3IHdvcmxkUG9zaXRpb24gbXVzdCBiZSBGaXJlLlZlYzInKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdmlzaWJsZTogZmFsc2VcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIGNsb2Nrd2lzZSBkZWdyZWVzIG9mIHJvdGF0aW9uIHJlbGF0aXZlIHRvIHRoZSBwYXJlbnRcbiAgICAgICAgICogQHByb3BlcnR5IHJvdGF0aW9uXG4gICAgICAgICAqIEB0eXBlIHtudW1iZXJ9XG4gICAgICAgICAqL1xuICAgICAgICByb3RhdGlvbjoge1xuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMudGFyZ2V0Ti5yb3RhdGlvbjtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIGlmICggIWlzTmFOKHZhbHVlKSApIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50YXJnZXROLnJvdGF0aW9uID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBGaXJlLmVycm9yKCdUaGUgbmV3IHJvdGF0aW9uIG11c3Qgbm90IGJlIE5hTicpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIGNsb2Nrd2lzZSBkZWdyZWVzIG9mIHJvdGF0aW9uIGluIHdvcmxkIHNwYWNlXG4gICAgICAgICAqIEBwcm9wZXJ0eSB3b3JsZFJvdGF0aW9uXG4gICAgICAgICAqIEB0eXBlIHtudW1iZXJ9XG4gICAgICAgICAqL1xuICAgICAgICB3b3JsZFJvdGF0aW9uOiB7XG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB2YXIgcGFyZW50ID0gdGhpcy5wYXJlbnROO1xuICAgICAgICAgICAgICAgIGlmICggcGFyZW50ICkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIHBhcmVudCBpbnN0YW5jZW9mIGNjLlNjZW5lICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucm90YXRpb24gKyBwYXJlbnQucm90YXRpb247XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5yb3RhdGlvbiArIEZpcmUocGFyZW50KS53b3JsZFJvdGF0aW9uO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5yb3RhdGlvbjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICBpZiAoICFpc05hTih2YWx1ZSkgKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBwYXJlbnQgPSB0aGlzLnBhcmVudE47XG4gICAgICAgICAgICAgICAgICAgIGlmICggcGFyZW50ICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCBwYXJlbnQgaW5zdGFuY2VvZiBjYy5TY2VuZSApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJvdGF0aW9uID0gdmFsdWUgLSBwYXJlbnQucm90YXRpb247XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJvdGF0aW9uID0gdmFsdWUgLSBGaXJlKHBhcmVudCkud29ybGRSb3RhdGlvbjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucm90YXRpb24gPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgRmlyZS5lcnJvcignVGhlIG5ldyB3b3JsZFJvdGF0aW9uIG11c3Qgbm90IGJlIE5hTicpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB2aXNpYmxlOiBmYWxzZVxuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgbG9jYWwgc2NhbGUgZmFjdG9yIHJlbGF0aXZlIHRvIHRoZSBwYXJlbnRcbiAgICAgICAgICogQHByb3BlcnR5IHNjYWxlXG4gICAgICAgICAqIEB0eXBlIHtGaXJlLlZlYzJ9XG4gICAgICAgICAqL1xuICAgICAgICBzY2FsZToge1xuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBWZWMyKHRoaXMudGFyZ2V0Ti5zY2FsZVgsIHRoaXMudGFyZ2V0Ti5zY2FsZVkpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgaWYgKCB2YWx1ZSBpbnN0YW5jZW9mIFZlYzIgKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGFyZ2V0Ti5zY2FsZVggPSB2YWx1ZS54O1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRhcmdldE4uc2NhbGVZID0gdmFsdWUueTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIEZpcmUuZXJyb3IoJ1RoZSBuZXcgc2NhbGUgbXVzdCBiZSBGaXJlLlZlYzInKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSBsb3NzeSBzY2FsZSBvZiB0aGUgdHJhbnNmb3JtIGluIHdvcmxkIHNwYWNlIChSZWFkIE9ubHkpXG4gICAgICAgICAqIEBwcm9wZXJ0eSB3b3JsZFNjYWxlXG4gICAgICAgICAqIEB0eXBlIHtGaXJlLlZlYzJ9XG4gICAgICAgICAqIEByZWFkT25seVxuICAgICAgICAgKi9cbiAgICAgICAgd29ybGRTY2FsZToge1xuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdmFyIG1hdCA9IHRoaXMudGFyZ2V0Ti5nZXROb2RlVG9Xb3JsZFRyYW5zZm9ybSgpO1xuXG4gICAgICAgICAgICAgICAgdmFyIHJldCA9IG5ldyBWZWMyKCk7XG4gICAgICAgICAgICAgICAgcmV0LnggPSBNYXRoLnNxcnQobWF0LmEgKiBtYXQuYSArIG1hdC5iICogbWF0LmIpO1xuICAgICAgICAgICAgICAgIHJldC55ID0gTWF0aC5zcXJ0KG1hdC5jICogbWF0LmMgKyBtYXQuZCAqIG1hdC5kKTtcblxuICAgICAgICAgICAgICAgIHJldHVybiByZXQ7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdmlzaWJsZTogZmFsc2VcbiAgICAgICAgfSxcblxuICAgICAgICBhbmNob3JQb2ludDoge1xuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBWZWMyKHRoaXMudGFyZ2V0Ti5hbmNob3JYLCB0aGlzLnRhcmdldE4uYW5jaG9yWSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICBpZiAoIHZhbHVlIGluc3RhbmNlb2YgVmVjMiApIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50YXJnZXROLnNldEFuY2hvclBvaW50KHZhbHVlLngsIHZhbHVlLnkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgRmlyZS5lcnJvcignVGhlIG5ldyBhbmNob3JQb2ludCBtdXN0IGJlIEZpcmUuVmVjMicpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBjb2xvcjoge1xuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdmFyIGNvbG9yID0gdGhpcy50YXJnZXROLmNvbG9yO1xuICAgICAgICAgICAgICAgIGNvbG9yLmEgPSB0aGlzLnRhcmdldE4ub3BhY2l0eTtcbiAgICAgICAgICAgICAgICByZXR1cm4gY29sb3IudG9GaXJlQ29sb3IoKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIGlmICh2YWx1ZSBpbnN0YW5jZW9mIENvbG9yKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBjb2xvciA9IHZhbHVlLnRvQ0NDb2xvcigpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRhcmdldE4uY29sb3IgPSBjb2xvcjtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50YXJnZXROLm9wYWNpdHkgPSBjb2xvci5hO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgRmlyZS5lcnJvcignVGhlIG5ldyBjb2xvciBtdXN0IGJlIEZpcmUuQ29sb3InKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdmlzaWJsZTogdHJ1ZSxcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIHNpemUgb2YgdGhlIG5vZGVcbiAgICAgICAgICogQHByb3BlcnR5IHNpemVcbiAgICAgICAgICogQHR5cGUge0ZpcmUuVmVjMn1cbiAgICAgICAgICovXG4gICAgICAgIHNpemU6IHtcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHZhciBzaXplID0gdGhpcy50YXJnZXROLmdldENvbnRlbnRTaXplKCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBWZWMyKHNpemUud2lkdGgsIHNpemUuaGVpZ2h0KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIGlmICggdmFsdWUgaW5zdGFuY2VvZiBWZWMyICkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRhcmdldE4uc2V0Q29udGVudFNpemUodmFsdWUueCwgdmFsdWUueSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBGaXJlLmVycm9yKCdUaGUgbmV3IHNpemUgbXVzdCBiZSBGaXJlLlZlYzInKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdmlzaWJsZTogZmFsc2VcbiAgICAgICAgfSxcblxuICAgICAgICBfbmFtZToge1xuICAgICAgICAgICAgZGVmYXVsdDogXCJcIlxuICAgICAgICB9LFxuXG4gICAgICAgIF9wb3NpdGlvbjoge1xuICAgICAgICAgICAgZGVmYXVsdDogbnVsbFxuICAgICAgICB9LFxuXG4gICAgICAgIF9zY2FsZToge1xuICAgICAgICAgICAgZGVmYXVsdDogbnVsbFxuICAgICAgICB9LFxuXG4gICAgICAgIF9yb3RhdGlvbjoge1xuICAgICAgICAgICAgZGVmYXVsdDogMFxuICAgICAgICB9LFxuXG4gICAgICAgIF9zaXplOiB7XG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsXG4gICAgICAgIH0sXG5cbiAgICAgICAgX2NvbG9yOiB7XG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsXG4gICAgICAgIH0sXG5cbiAgICAgICAgX2FuY2hvclBvaW50OiB7XG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsXG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgc3RhdGljczoge1xuICAgIH0sXG5cbiAgICBzZXRNYXhab3JkZXI6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHBhcmVudCA9IHRoaXMucGFyZW50TjtcbiAgICAgICAgdmFyIGxlbmd0aCA9IHBhcmVudC5jaGlsZHJlbi5sZW5ndGg7XG4gICAgICAgIGlmICggbGVuZ3RoID49IDIgKSB7XG4gICAgICAgICAgICB2YXIgcHJldk5vZGUgPSBwYXJlbnQuY2hpbGRyZW5bbGVuZ3RoLTJdO1xuICAgICAgICAgICAgdmFyIHogPSBwcmV2Tm9kZS5nZXRMb2NhbFpPcmRlcigpICsgMTtcbiAgICAgICAgICAgIHRoaXMudGFyZ2V0Ti5zZXRMb2NhbFpPcmRlciggeiApO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIHNldFNpYmxpbmdJbmRleDogZnVuY3Rpb24gKGluZGV4KSB7XG4gICAgICAgIGlmICghdGhpcy5wYXJlbnROKSByZXR1cm47XG5cbiAgICAgICAgRmlyZS5SdW50aW1lLk5vZGVXcmFwcGVyLnByb3RvdHlwZS5zZXRTaWJsaW5nSW5kZXguY2FsbCh0aGlzLCBpbmRleCk7XG5cbiAgICAgICAgdmFyIHNpYmxpbmdzID0gdGhpcy5wYXJlbnROLmNoaWxkcmVuO1xuICAgICAgICBmb3IgKHZhciBpPTA7IGk8c2libGluZ3MubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHNpYmxpbmdzW2ldLnNldExvY2FsWk9yZGVyKGkpO1xuICAgICAgICB9XG5cbiAgICAgICAgY2MucmVuZGVyZXIuY2hpbGRyZW5PcmRlckRpcnR5ID0gdHJ1ZTtcbiAgICB9LFxuXG4gICAgYXR0YWNoZWQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgLy8gb25FbnRlciB3aWxsIGJlIGNhbGxlZCB3aGVuIG5vZGUgZW50ZXJzIHRoZSBwYXJlbnRcbiAgICAgICAgdmFyIG9yaWdpbk9uRW50ZXIgPSB0aGlzLnRhcmdldE4ub25FbnRlcjtcbiAgICAgICAgdGhpcy50YXJnZXROLm9uRW50ZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBvcmlnaW5PbkVudGVyLmNhbGwodGhpcyk7XG4gICAgICAgICAgICBIZWxwZXJzLm9uTm9kZUF0dGFjaGVkVG9QYXJlbnQodGhpcyk7XG4gICAgICAgIH07XG5cbiAgICAgICAgLy8gb25FeGl0IHdpbGwgYmUgY2FsbGVkIHdoZW4gbm9kZSBsZWF2ZXMgdGhlIHBhcmVudFxuICAgICAgICB2YXIgb3JpZ2luT25FeGl0ID0gdGhpcy50YXJnZXROLm9uRXhpdDtcbiAgICAgICAgdGhpcy50YXJnZXROLm9uRXhpdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIG9yaWdpbk9uRXhpdC5jYWxsKHRoaXMpO1xuICAgICAgICAgICAgSGVscGVycy5vbk5vZGVEZXRhY2hlZEZyb21QYXJlbnQodGhpcyk7XG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy50YXJnZXROLnNjaGVkdWxlVXBkYXRlKCk7XG4gICAgfSxcblxuICAgIC8vIFJFTkRFUkVSXG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGEgXCJ3b3JsZFwiIGF4aXMgYWxpZ25lZCBib3VuZGluZyBib3goQUFCQikgb2YgdGhlIHJlbmRlcmVyLlxuICAgICAqXG4gICAgICogQG1ldGhvZCBnZXRXb3JsZEJvdW5kc1xuICAgICAqIEBwYXJhbSB7RmlyZS5SZWN0fSBbb3V0XSAtIG9wdGlvbmFsLCB0aGUgcmVjZWl2aW5nIHJlY3RcbiAgICAgKiBAcmV0dXJuIHtGaXJlLlJlY3R9IC0gdGhlIHJlY3QgcmVwcmVzZW50ZWQgaW4gd29ybGQgcG9zaXRpb25cbiAgICAgKi9cbiAgICBnZXRXb3JsZEJvdW5kczogZnVuY3Rpb24gKG91dCkge1xuICAgICAgICB2YXIgc2l6ZSA9IHRoaXMuc2l6ZTtcbiAgICAgICAgdmFyIHJlY3QgPSBjYy5yZWN0KDAsIDAsIHNpemUueCwgc2l6ZS55KTtcblxuICAgICAgICB2YXIgbWF0ID0gdGhpcy50YXJnZXROLmdldE5vZGVUb1dvcmxkVHJhbnNmb3JtKCk7XG4gICAgICAgIGNjLl9yZWN0QXBwbHlBZmZpbmVUcmFuc2Zvcm1JbihyZWN0LCBtYXQpO1xuXG4gICAgICAgIG91dCA9IG91dCB8fCBuZXcgUmVjdCgpO1xuICAgICAgICBvdXQueCA9IHJlY3QueDtcbiAgICAgICAgb3V0LnkgPSByZWN0Lnk7XG4gICAgICAgIG91dC53aWR0aCAgPSByZWN0LndpZHRoO1xuICAgICAgICBvdXQuaGVpZ2h0ID0gcmVjdC5oZWlnaHQ7XG5cbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhIFwid29ybGRcIiBvcmllbnRlZCBib3VuZGluZyBib3goT0JCKSBvZiB0aGUgcmVuZGVyZXIuXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIGdldFdvcmxkT3JpZW50ZWRCb3VuZHNcbiAgICAgKiBAcGFyYW0ge0ZpcmUuVmVjMn0gW291dF9ibF0gLSBvcHRpb25hbCwgdGhlIHZlY3RvciB0byByZWNlaXZlIHRoZSB3b3JsZCBwb3NpdGlvbiBvZiBib3R0b20gbGVmdFxuICAgICAqIEBwYXJhbSB7RmlyZS5WZWMyfSBbb3V0X3RsXSAtIG9wdGlvbmFsLCB0aGUgdmVjdG9yIHRvIHJlY2VpdmUgdGhlIHdvcmxkIHBvc2l0aW9uIG9mIHRvcCBsZWZ0XG4gICAgICogQHBhcmFtIHtGaXJlLlZlYzJ9IFtvdXRfdHJdIC0gb3B0aW9uYWwsIHRoZSB2ZWN0b3IgdG8gcmVjZWl2ZSB0aGUgd29ybGQgcG9zaXRpb24gb2YgdG9wIHJpZ2h0XG4gICAgICogQHBhcmFtIHtGaXJlLlZlYzJ9IFtvdXRfYnJdIC0gb3B0aW9uYWwsIHRoZSB2ZWN0b3IgdG8gcmVjZWl2ZSB0aGUgd29ybGQgcG9zaXRpb24gb2YgYm90dG9tIHJpZ2h0XG4gICAgICogQHJldHVybiB7RmlyZS5WZWMyfSAtIHRoZSBhcnJheSBjb250YWlucyB2ZWN0b3JzIHJlcHJlc2VudGVkIGluIHdvcmxkIHBvc2l0aW9uLFxuICAgICAqICAgICAgICAgICAgICAgICAgICBpbiB0aGUgc2VxdWVuY2Ugb2YgQm90dG9tTGVmdCwgVG9wTGVmdCwgVG9wUmlnaHQsIEJvdHRvbVJpZ2h0XG4gICAgICovXG4gICAgZ2V0V29ybGRPcmllbnRlZEJvdW5kczogZnVuY3Rpb24gKG91dF9ibCwgb3V0X3RsLCBvdXRfdHIsIG91dF9icil7XG4gICAgICAgIHZhciBzaXplICAgPSB0aGlzLnNpemU7XG4gICAgICAgIHZhciB3aWR0aCAgPSBzaXplLng7XG4gICAgICAgIHZhciBoZWlnaHQgPSBzaXplLnk7XG5cbiAgICAgICAgb3V0X2JsID0gb3V0X2JsIHx8IG5ldyBWZWMyKCk7XG4gICAgICAgIG91dF90bCA9IG91dF90bCB8fCBuZXcgVmVjMigpO1xuICAgICAgICBvdXRfdHIgPSBvdXRfdHIgfHwgbmV3IFZlYzIoKTtcbiAgICAgICAgb3V0X2JyID0gb3V0X2JyIHx8IG5ldyBWZWMyKCk7XG5cbiAgICAgICAgdmFyIG1hdCA9IHRoaXMudGFyZ2V0Ti5nZXROb2RlVG9Xb3JsZFRyYW5zZm9ybSgpO1xuXG4gICAgICAgIC8vIHRyYW5zZm9ybSByZWN0KDAsIDAsIHdpZHRoLCBoZWlnaHQpIGJ5IG1hdHJpeFxuICAgICAgICB2YXIgdHggPSBtYXQudHg7XG4gICAgICAgIHZhciB0eSA9IG1hdC50eTtcbiAgICAgICAgdmFyIHhhID0gbWF0LmEgKiB3aWR0aDtcbiAgICAgICAgdmFyIHhiID0gbWF0LmIgKiB3aWR0aDtcbiAgICAgICAgdmFyIHljID0gbWF0LmMgKiBoZWlnaHQ7XG4gICAgICAgIHZhciB5ZCA9IG1hdC5kICogaGVpZ2h0O1xuXG4gICAgICAgIG91dF90bC54ID0gdHg7XG4gICAgICAgIG91dF90bC55ID0gdHk7XG4gICAgICAgIG91dF90ci54ID0geGEgKyB0eDtcbiAgICAgICAgb3V0X3RyLnkgPSB4YiArIHR5O1xuICAgICAgICBvdXRfYmwueCA9IHljICsgdHg7XG4gICAgICAgIG91dF9ibC55ID0geWQgKyB0eTtcbiAgICAgICAgb3V0X2JyLnggPSB4YSArIHljICsgdHg7XG4gICAgICAgIG91dF9ici55ID0geGIgKyB5ZCArIHR5O1xuXG4gICAgICAgIHJldHVybiBbb3V0X2JsLCBvdXRfdGwsIG91dF90ciwgb3V0X2JyXTtcbiAgICB9LFxuXG4gICAgdHJhbnNmb3JtUG9pbnRUb1dvcmxkOiBmdW5jdGlvbiAocG9pbnQpIHtcbiAgICAgICAgdmFyIGNvbnZlcnRlZCA9IHRoaXMudGFyZ2V0Ti5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIocG9pbnQpO1xuICAgICAgICByZXR1cm4gbmV3IEZpcmUuVmVjMihjb252ZXJ0ZWQueCwgY29udmVydGVkLnkpO1xuICAgIH0sXG5cbiAgICB0cmFuc2Zvcm1Qb2ludFRvTG9jYWw6IGZ1bmN0aW9uIChwb2ludCkge1xuICAgICAgICB2YXIgY29udmVydGVkID0gdGhpcy50YXJnZXROLmNvbnZlcnRUb05vZGVTcGFjZUFSKHBvaW50KTtcbiAgICAgICAgcmV0dXJuIG5ldyBGaXJlLlZlYzIoY29udmVydGVkLngsIGNvbnZlcnRlZC55KTtcbiAgICB9LFxuXG4gICAgb25CZWZvcmVTZXJpYWxpemU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5fbmFtZSAgPSB0aGlzLm5hbWU7XG4gICAgICAgIHRoaXMuX3NpemUgID0gW3RoaXMuc2l6ZS54LCB0aGlzLnNpemUueV07XG4gICAgICAgIHRoaXMuX3NjYWxlID0gW3RoaXMuc2NhbGVYLCB0aGlzLnNjYWxlWV07XG4gICAgICAgIHRoaXMuX3JvdGF0aW9uID0gdGhpcy5yb3RhdGlvbjtcbiAgICAgICAgdGhpcy5fcG9zaXRpb24gPSBbdGhpcy5wb3NpdGlvbi54LCB0aGlzLnBvc2l0aW9uLnldO1xuICAgICAgICB0aGlzLl9hbmNob3JQb2ludCA9IFt0aGlzLmFuY2hvclBvaW50LngsIHRoaXMuYW5jaG9yUG9pbnQueV07XG5cbiAgICAgICAgdmFyIGNvbG9yID0gdGhpcy5jb2xvcjtcbiAgICAgICAgdGhpcy5fY29sb3IgPSBbY29sb3IuciwgY29sb3IuZywgY29sb3IuYiwgY29sb3IuYV07XG4gICAgfSxcblxuICAgIGNyZWF0ZU5vZGU6IGZ1bmN0aW9uIChub2RlKSB7XG4gICAgICAgIG5vZGUgPSBub2RlIHx8IG5ldyBjYy5Ob2RlKCk7XG5cbiAgICAgICAgdmFyIHdpZHRoID0gdGhpcy5fc2l6ZSA/IHRoaXMuX3NpemVbMF0gOiAwO1xuICAgICAgICB2YXIgaGVpZ2h0ID0gdGhpcy5fc2l6ZSA/IHRoaXMuX3NpemVbMV0gOiAwO1xuXG4gICAgICAgIG5vZGUuc2V0TmFtZSh0aGlzLl9uYW1lKTtcbiAgICAgICAgbm9kZS5zZXRDb250ZW50U2l6ZSh3aWR0aCwgaGVpZ2h0KTtcbiAgICAgICAgbm9kZS54ID0gdGhpcy5fcG9zaXRpb24gPyB0aGlzLl9wb3NpdGlvblswXSA6IDA7XG4gICAgICAgIG5vZGUueSA9IHRoaXMuX3Bvc2l0aW9uID8gdGhpcy5fcG9zaXRpb25bMV0gOiAwO1xuICAgICAgICBub2RlLnNjYWxlWCA9IHRoaXMuX3NjYWxlID8gdGhpcy5fc2NhbGVbMF0gOiAxO1xuICAgICAgICBub2RlLnNjYWxlWSA9IHRoaXMuX3NjYWxlID8gdGhpcy5fc2NhbGVbMV0gOiAxO1xuICAgICAgICBub2RlLnJvdGF0aW9uID0gdGhpcy5fcm90YXRpb247XG5cbiAgICAgICAgaWYgKHRoaXMuX2FuY2hvclBvaW50KSB7XG4gICAgICAgICAgICBub2RlLnNldEFuY2hvclBvaW50KHRoaXMuX2FuY2hvclBvaW50WzBdLCB0aGlzLl9hbmNob3JQb2ludFsxXSk7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgY29sb3IgPSB0aGlzLl9jb2xvciA/IG5ldyBDb2xvcih0aGlzLl9jb2xvclswXSwgdGhpcy5fY29sb3JbMV0sIHRoaXMuX2NvbG9yWzJdLCB0aGlzLl9jb2xvclszXSkgOiBDb2xvci53aGl0ZTtcbiAgICAgICAgbm9kZS5jb2xvciA9IGNvbG9yLnRvQ0NDb2xvcigpO1xuXG4gICAgICAgIHJldHVybiBub2RlO1xuICAgIH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IE5vZGVXcmFwcGVyO1xuIiwiXG52YXIgTm9kZVdyYXBwZXIgPSByZXF1aXJlKCcuL25vZGUnKTtcblxudmFyIHNoYXJlUHJvcGVydGllcyA9IFtcbiAgICAnbWF4UGFydGljbGVzJyxcbiAgICAnZHVyYXRpb24nLFxuICAgICdlbWlzc2lvblJhdGUnLFxuICAgICdsaWZlJyxcbiAgICAnbGlmZVZhcmlhbmNlJyxcbiAgICAnc3RhcnRDb2xvcicsXG4gICAgJ3N0YXJ0Q29sb3JWYXJpYW5jZScsXG4gICAgJ2VuZENvbG9yJyxcbiAgICAnZW5kQ29sb3JWYXJpYW5jZScsXG4gICAgJ2FuZ2xlJyxcbiAgICAnYW5nbGVWYXJpYW5jZScsXG4gICAgJ3N0YXJ0U2l6ZScsXG4gICAgJ3N0YXJ0U2l6ZVZhcmlhbmNlJyxcbiAgICAnZW5kU2l6ZScsXG4gICAgJ2VuZFNpemVWYXJpYW5jZScsXG4gICAgJ3N0YXJ0U3BpbicsXG4gICAgJ3N0YXJ0U3BpblZhcmlhbmNlJyxcbiAgICAnZW5kU3BpbicsXG4gICAgJ2VuZFNwaW5WYXJpYW5jZScsXG4gICAgJ3NvdXJjZVBvc2l0aW9uJyxcbiAgICAnc291cmNlUG9zaXRpb25WYXJpYW5jZScsXG4gICAgJ3Bvc2l0aW9uVHlwZScsXG4gICAgJ2VtaXR0ZXJNb2RlJ1xuXTtcblxudmFyIGdyYXZpdHlNb2RlUHJvcGVydGllcyA9IFtcbiAgICAnZ3Jhdml0eScsXG4gICAgJ3NwZWVkJyxcbiAgICAnc3BlZWRWYXJpYW5jZScsXG4gICAgJ3RhbmdlbnRpYWxBY2NlbCcsXG4gICAgJ3RhbmdlbnRpYWxBY2NlbFZhcmlhbmNlJyxcbiAgICAncmFkaWFsQWNjZWwnLFxuICAgICdyYWRpYWxBY2NlbFZhcmlhbmNlJyxcbiAgICAncm90YXRpb25Jc0Rpcidcbl07XG5cbnZhciByYWRpdXNNb2RlUHJvcGVydGllcyA9IFtcbiAgICAnc3RhcnRSYWRpdXMnLFxuICAgICdzdGFydFJhZGl1c1ZhcmlhbmNlJyxcbiAgICAnZW5kUmFkaXVzJyxcbiAgICAnZW5kUmFkaXVzVmFyaWFuY2UnLFxuICAgICdyb3RhdGVQZXJTZWNvbmQnLFxuICAgICdyb3RhdGVQZXJTZWNvbmRWYXJpYW5jZSdcbl07XG5cbnZhciBQYXJ0aWNsZVdyYXBwZXIgPSBGaXJlLkNsYXNzKHtcbiAgICBuYW1lOiAnUnVudGltZS5QYXJ0aWNsZVdyYXBwZXInLFxuICAgIGV4dGVuZHM6IE5vZGVXcmFwcGVyLFxuICAgIGNvbnN0cnVjdG9yOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuX2ZpbGVUb0xvYWQgPSAnJztcbiAgICAgICAgdGhpcy5fdGV4VG9Mb2FkID0gJyc7XG4gICAgfSxcblxuICAgIHByb3BlcnRpZXM6IHtcblxuICAgICAgICAvLyBJZiBzZXQgY3VzdG9tIHRvIHRydWUsIHRoZW4gdXNlIGN1c3RvbSBwcm9wZXJ0aWVzIGluc3RlYWRvZiByZWFkIHBhcnRpY2xlIGZpbGVcbiAgICAgICAgY3VzdG9tOiB7XG4gICAgICAgICAgICBkZWZhdWx0OiBmYWxzZVxuICAgICAgICB9LFxuXG4gICAgICAgIF9maWxlOiB7XG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy50YXJnZXROLl9wbGlzdEZpbGUgfHwgJyc7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICB2YXIgdGFyZ2V0ID0gdGhpcy50YXJnZXROO1xuXG4gICAgICAgICAgICAgICAgaWYgKCB0YXJnZXQgKSB7XG4gICAgICAgICAgICAgICAgICAgIHRhcmdldC5fcGxpc3RGaWxlID0gdmFsdWU7XG5cbiAgICAgICAgICAgICAgICAgICAgY2MubG9hZGVyLmxvYWQoIHZhbHVlLCBmdW5jdGlvbiAoZXJyLCByZXN1bHRzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZXJyKSB0aHJvdyBlcnI7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBvcmlnaW5Qb3NpdGlvbiA9IHRhcmdldC5nZXRQb3NpdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0LnBhcnRpY2xlQ291bnQgPSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0LmluaXRXaXRoRmlsZSggdmFsdWUgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldC5zZXRQb3NpdGlvbiggb3JpZ2luUG9zaXRpb24gKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9maWxlVG9Mb2FkID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHZpc2libGU6IHRydWUsXG4gICAgICAgICAgICB1cmw6IFJ1bnRpbWUuUGFydGljbGVBc3NldFxuICAgICAgICB9LFxuXG4gICAgICAgIF90ZXh0dXJlOiB7XG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB2YXIgdGV4ID0gdGhpcy50YXJnZXROLnRleHR1cmU7XG4gICAgICAgICAgICAgICAgcmV0dXJuICh0ZXggJiYgdGV4LnVybCkgfHwgJyc7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy50YXJnZXROKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciB0ZXh0dXJlID0gdmFsdWUgPyBjYy50ZXh0dXJlQ2FjaGUuYWRkSW1hZ2UoIHZhbHVlICkgOiBudWxsO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRhcmdldE4udGV4dHVyZSA9IHRleHR1cmU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl90ZXhUb0xvYWQgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdmlzaWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIHVybDogRmlyZS5UZXh0dXJlXG4gICAgICAgIH0sXG5cbiAgICAgICAgcGFydGljbGVDb3VudDoge1xuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMudGFyZ2V0Ti5wYXJ0aWNsZUNvdW50O1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIG1heFBhcnRpY2xlczoge1xuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMudGFyZ2V0Ti50b3RhbFBhcnRpY2xlcztcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIGlmICggIWlzTmFOKHZhbHVlKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRhcmdldE4udG90YWxQYXJ0aWNsZXMgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIEZpcmUuZXJyb3IoJ1RoZSBuZXcgZHVyYXRpb24gbXVzdCBub3QgYmUgTmFOJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIGR1cmF0aW9uOiB7XG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy50YXJnZXROLmR1cmF0aW9uO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgaWYgKCAhaXNOYU4odmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGFyZ2V0Ti5kdXJhdGlvbiA9IHZhbHVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgRmlyZS5lcnJvcignVGhlIG5ldyBkdXJhdGlvbiBtdXN0IG5vdCBiZSBOYU4nKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgZW1pc3Npb25SYXRlOiB7XG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy50YXJnZXROLmVtaXNzaW9uUmF0ZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIGlmICggIWlzTmFOKHZhbHVlKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRhcmdldE4uZW1pc3Npb25SYXRlID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBGaXJlLmVycm9yKCdUaGUgbmV3IGVtaXNzaW9uUmF0ZSBtdXN0IG5vdCBiZSBOYU4nKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgbGlmZToge1xuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMudGFyZ2V0Ti5saWZlO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgaWYgKCAhaXNOYU4odmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGFyZ2V0Ti5saWZlID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBGaXJlLmVycm9yKCdUaGUgbmV3IGxpZmUgbXVzdCBub3QgYmUgTmFOJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIGxpZmVWYXJpYW5jZToge1xuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMudGFyZ2V0Ti5saWZlVmFyO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgaWYgKCAhaXNOYU4odmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGFyZ2V0Ti5saWZlVmFyID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBGaXJlLmVycm9yKCdUaGUgbmV3IGxpZmVWYXJpYW5jZSBtdXN0IG5vdCBiZSBOYU4nKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgc3RhcnRDb2xvcjoge1xuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMudGFyZ2V0Ti5zdGFydENvbG9yLnRvRmlyZUNvbG9yKCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICBpZiAoIHZhbHVlIGluc3RhbmNlb2YgRmlyZS5Db2xvciApIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50YXJnZXROLnN0YXJ0Q29sb3IgPSB2YWx1ZS50b0NDQ29sb3IoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIEZpcmUuZXJyb3IoJ1RoZSBuZXcgc3RhcnRDb2xvciBtdXN0IGJlIEZpcmUuQ29sb3InKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdHlwZTogRmlyZS5Db2xvclxuICAgICAgICB9LFxuXG4gICAgICAgIHN0YXJ0Q29sb3JWYXJpYW5jZToge1xuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMudGFyZ2V0Ti5zdGFydENvbG9yVmFyLnRvRmlyZUNvbG9yKCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICBpZiAoIHZhbHVlIGluc3RhbmNlb2YgRmlyZS5Db2xvciApIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50YXJnZXROLnN0YXJ0Q29sb3JWYXIgPSB2YWx1ZS50b0NDQ29sb3IoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIEZpcmUuZXJyb3IoJ1RoZSBuZXcgc3RhcnRDb2xvclZhcmlhbmNlIG11c3QgYmUgRmlyZS5Db2xvcicpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0eXBlOiBGaXJlLkNvbG9yXG4gICAgICAgIH0sXG5cbiAgICAgICAgZW5kQ29sb3I6IHtcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnRhcmdldE4uZW5kQ29sb3IudG9GaXJlQ29sb3IoKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIGlmICggdmFsdWUgaW5zdGFuY2VvZiBGaXJlLkNvbG9yICkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRhcmdldE4uZW5kQ29sb3IgPSB2YWx1ZS50b0NDQ29sb3IoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIEZpcmUuZXJyb3IoJ1RoZSBuZXcgZW5kQ29sb3IgbXVzdCBiZSBGaXJlLkNvbG9yJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHR5cGU6IEZpcmUuQ29sb3JcbiAgICAgICAgfSxcblxuICAgICAgICBlbmRDb2xvclZhcmlhbmNlOiB7XG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy50YXJnZXROLmVuZENvbG9yVmFyLnRvRmlyZUNvbG9yKCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICBpZiAoIHZhbHVlIGluc3RhbmNlb2YgRmlyZS5Db2xvciApIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50YXJnZXROLmVuZENvbG9yVmFyID0gdmFsdWUudG9DQ0NvbG9yKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBGaXJlLmVycm9yKCdUaGUgbmV3IGVuZENvbG9yVmFyaWFuY2UgbXVzdCBiZSBGaXJlLkNvbG9yJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHR5cGU6IEZpcmUuQ29sb3JcbiAgICAgICAgfSxcblxuXG4gICAgICAgIGFuZ2xlOiB7XG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy50YXJnZXROLmFuZ2xlO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgaWYgKCAhaXNOYU4odmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGFyZ2V0Ti5hbmdsZSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgRmlyZS5lcnJvcignVGhlIG5ldyBhbmdsZSBtdXN0IG5vdCBiZSBOYU4nKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgYW5nbGVWYXJpYW5jZToge1xuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMudGFyZ2V0Ti5hbmdsZVZhcjtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIGlmICggIWlzTmFOKHZhbHVlKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRhcmdldE4uYW5nbGVWYXIgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIEZpcmUuZXJyb3IoJ1RoZSBuZXcgYW5nbGVWYXJpYW5jZSBtdXN0IG5vdCBiZSBOYU4nKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgc3RhcnRTaXplOiB7XG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy50YXJnZXROLnN0YXJ0U2l6ZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIGlmICggIWlzTmFOKHZhbHVlKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRhcmdldE4uc3RhcnRTaXplID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBGaXJlLmVycm9yKCdUaGUgbmV3IHN0YXJ0U2l6ZSBtdXN0IG5vdCBiZSBOYU4nKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgc3RhcnRTaXplVmFyaWFuY2U6IHtcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnRhcmdldE4uc3RhcnRTaXplVmFyO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgaWYgKCAhaXNOYU4odmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGFyZ2V0Ti5zdGFydFNpemVWYXIgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIEZpcmUuZXJyb3IoJ1RoZSBuZXcgc3RhcnRTaXplVmFyaWFuY2UgbXVzdCBub3QgYmUgTmFOJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIGVuZFNpemU6IHtcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnRhcmdldE4uZW5kU2l6ZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIGlmICggIWlzTmFOKHZhbHVlKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRhcmdldE4uZW5kU2l6ZSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgRmlyZS5lcnJvcignVGhlIG5ldyBlbmRTaXplIG11c3Qgbm90IGJlIE5hTicpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBlbmRTaXplVmFyaWFuY2U6IHtcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnRhcmdldE4uZW5kU2l6ZVZhcjtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIGlmICggIWlzTmFOKHZhbHVlKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRhcmdldE4uZW5kU2l6ZVZhciA9IHZhbHVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgRmlyZS5lcnJvcignVGhlIG5ldyBlbmRTaXplVmFyaWFuY2UgbXVzdCBub3QgYmUgTmFOJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIHN0YXJ0U3Bpbjoge1xuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMudGFyZ2V0Ti5zdGFydFNwaW4gfHwgMDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIGlmICggIWlzTmFOKHZhbHVlKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRhcmdldE4uc3RhcnRTcGluID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBGaXJlLmVycm9yKCdUaGUgbmV3IHN0YXJ0U3BpbiBtdXN0IG5vdCBiZSBOYU4nKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgc3RhcnRTcGluVmFyaWFuY2U6IHtcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnRhcmdldE4uc3RhcnRTcGluVmFyIHx8IDA7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICBpZiAoICFpc05hTih2YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50YXJnZXROLnN0YXJ0U3BpblZhciA9IHZhbHVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgRmlyZS5lcnJvcignVGhlIG5ldyBzdGFydFNwaW5WYXJpYW5jZSBtdXN0IG5vdCBiZSBOYU4nKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgZW5kU3Bpbjoge1xuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMudGFyZ2V0Ti5lbmRTcGluIHx8IDA7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICBpZiAoICFpc05hTih2YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50YXJnZXROLmVuZFNwaW4gPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIEZpcmUuZXJyb3IoJ1RoZSBuZXcgZW5kU3BpbiBtdXN0IG5vdCBiZSBOYU4nKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgZW5kU3BpblZhcmlhbmNlOiB7XG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy50YXJnZXROLmVuZFNwaW5WYXIgfHwgMDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIGlmICggIWlzTmFOKHZhbHVlKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRhcmdldE4uZW5kU3BpblZhciA9IHZhbHVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgRmlyZS5lcnJvcignVGhlIG5ldyBlbmRTcGluVmFyaWFuY2UgbXVzdCBub3QgYmUgTmFOJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIHNvdXJjZVBvc2l0aW9uOiB7XG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB2YXIgcG9zID0gdGhpcy50YXJnZXROLnNvdXJjZVBvcztcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IEZpcmUuVmVjMihwb3MueCwgcG9zLnkpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgaWYgKCB2YWx1ZSBpbnN0YW5jZW9mIEZpcmUuVmVjMiApIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50YXJnZXROLnNvdXJjZVBvcyA9IGNjLnAodmFsdWUueCwgdmFsdWUueSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBGaXJlLmVycm9yKCdUaGUgbmV3IHNvdXJjZVBvc2l0aW9uIG11c3QgYmUgRmlyZS5WZWMyJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHR5cGU6IEZpcmUuVmVjMlxuICAgICAgICB9LFxuXG4gICAgICAgIHNvdXJjZVBvc2l0aW9uVmFyaWFuY2U6IHtcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHZhciBwb3MgPSB0aGlzLnRhcmdldE4ucG9zVmFyO1xuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgRmlyZS5WZWMyKHBvcy54LCBwb3MueSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICBpZiAoIHZhbHVlIGluc3RhbmNlb2YgRmlyZS5WZWMyICkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRhcmdldE4ucG9zVmFyID0gY2MucCh2YWx1ZS54LCB2YWx1ZS55KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIEZpcmUuZXJyb3IoJ1RoZSBuZXcgc291cmNlUG9zaXRpb25WYXJpYW5jZSBtdXN0IGJlIEZpcmUuVmVjMicpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0eXBlOiBGaXJlLlZlYzJcbiAgICAgICAgfSxcblxuICAgICAgICAvLyBSdW50aW1lLlBhcnRpY2xlUG9zaXRpb25UeXBlLkZyZWUgfCBSdW50aW1lLlBhcnRpY2xlUG9zaXRpb25UeXBlLkdyb3VwZWRcbiAgICAgICAgcG9zaXRpb25UeXBlOiB7XG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy50YXJnZXROLnBvc2l0aW9uVHlwZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIGlmICggIWlzTmFOKHZhbHVlKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRhcmdldE4ucG9zaXRpb25UeXBlID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBGaXJlLmVycm9yKCdUaGUgbmV3IHBvc2l0aW9uVHlwZSBtdXN0IG5vdCBiZSBOYU4nKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdHlwZTogUnVudGltZS5QYXJ0aWNsZVBvc2l0aW9uVHlwZVxuICAgICAgICB9LFxuXG4gICAgICAgIC8vIFJ1bnRpbWUuUGFydGljbGVFbWl0TW9kZS5HcmF2aXR5OiB1c2VzIGdyYXZpdHksIHNwZWVkLCByYWRpYWwgYW5kIHRhbmdlbnRpYWwgYWNjZWxlcmF0aW9uO1xuICAgICAgICAvLyBSdW50aW1lLlBhcnRpY2xlRW1pdE1vZGUuUmFkaXVzIDogdXNlcyByYWRpdXMgbW92ZW1lbnQgKyByb3RhdGlvbi5cbiAgICAgICAgZW1pdHRlck1vZGU6IHtcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnRhcmdldE4uZW1pdHRlck1vZGU7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICBpZiAoICFpc05hTih2YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50YXJnZXROLmVtaXR0ZXJNb2RlID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBGaXJlLmVycm9yKCdUaGUgbmV3IGVtaXR0ZXJNb2RlIG11c3Qgbm90IGJlIE5hTicpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0eXBlOiBSdW50aW1lLlBhcnRpY2xlRW1pdE1vZGVcbiAgICAgICAgfSxcblxuXG4gICAgICAgIC8vIFJ1bnRpbWUuUGFydGljbGVFbWl0TW9kZS5HcmF2aXR5XG5cbiAgICAgICAgZ3Jhdml0eToge1xuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdmFyIGdyYXZpdHkgPSB0aGlzLnRhcmdldE4uZ3Jhdml0eTtcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IEZpcmUuVmVjMihncmF2aXR5LngsIGdyYXZpdHkueSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICBpZiAoIHZhbHVlIGluc3RhbmNlb2YgRmlyZS5WZWMyKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGFyZ2V0Ti5ncmF2aXR5ID0gY2MucCh2YWx1ZS54LCB2YWx1ZS55KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIEZpcmUuZXJyb3IoJ1RoZSBuZXcgZ3Jhdml0eSBtdXN0IGJlIEZpcmUuVmVjMicpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0eXBlOiBGaXJlLlZlYzJcbiAgICAgICAgfSxcblxuICAgICAgICBzcGVlZDoge1xuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMudGFyZ2V0Ti5zcGVlZCB8fCAwO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgaWYgKCAhaXNOYU4odmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGFyZ2V0Ti5zcGVlZCA9IHZhbHVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgRmlyZS5lcnJvcignVGhlIG5ldyBzcGVlZCBtdXN0IG5vdCBiZSBOYU4nKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgc3BlZWRWYXJpYW5jZToge1xuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMudGFyZ2V0Ti5zcGVlZFZhciB8fCAwO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgaWYgKCAhaXNOYU4odmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGFyZ2V0Ti5zcGVlZFZhciA9IHZhbHVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgRmlyZS5lcnJvcignVGhlIG5ldyBzcGVlZFZhcmlhbmNlIG11c3Qgbm90IGJlIE5hTicpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICB0YW5nZW50aWFsQWNjZWw6IHtcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnRhcmdldE4udGFuZ2VudGlhbEFjY2VsIHx8IDA7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICBpZiAoICFpc05hTih2YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50YXJnZXROLnRhbmdlbnRpYWxBY2NlbCA9IHZhbHVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgRmlyZS5lcnJvcignVGhlIG5ldyB0YW5nZW50aWFsQWNjZWwgbXVzdCBub3QgYmUgTmFOJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIHRhbmdlbnRpYWxBY2NlbFZhcmlhbmNlOiB7XG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy50YXJnZXROLnRhbmdlbnRpYWxBY2NlbFZhciB8fCAwO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgaWYgKCAhaXNOYU4odmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGFyZ2V0Ti50YW5nZW50aWFsQWNjZWxWYXIgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIEZpcmUuZXJyb3IoJ1RoZSBuZXcgdGFuZ2VudGlhbEFjY2VsVmFyaWFuY2UgbXVzdCBub3QgYmUgTmFOJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIHJhZGlhbEFjY2VsOiB7XG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy50YXJnZXROLnJhZGlhbEFjY2VsIHx8IDA7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICBpZiAoICFpc05hTih2YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50YXJnZXROLnJhZGlhbEFjY2VsID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBGaXJlLmVycm9yKCdUaGUgbmV3IHJhZGlhbEFjY2VsIG11c3Qgbm90IGJlIE5hTicpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICByYWRpYWxBY2NlbFZhcmlhbmNlOiB7XG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy50YXJnZXROLnJhZGlhbEFjY2VsVmFyIHx8IDA7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICBpZiAoICFpc05hTih2YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50YXJnZXROLnJhZGlhbEFjY2VsVmFyID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBGaXJlLmVycm9yKCdUaGUgbmV3IHJhZGlhbEFjY2VsVmFyaWFuY2UgbXVzdCBub3QgYmUgTmFOJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIHJvdGF0aW9uSXNEaXI6IHtcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnRhcmdldE4ucm90YXRpb25Jc0RpcjtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIGlmICggIWlzTmFOKHZhbHVlKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRhcmdldE4ucm90YXRpb25Jc0RpciA9IHZhbHVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgRmlyZS5lcnJvcignVGhlIG5ldyByb3RhdGlvbklzRGlyIG11c3Qgbm90IGJlIE5hTicpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuXG4gICAgICAgIC8vIFJ1bnRpbWUuUGFydGljbGVFbWl0TW9kZS5SYWRpdXNcblxuICAgICAgICBzdGFydFJhZGl1czoge1xuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMudGFyZ2V0Ti5zdGFydFJhZGl1cyB8fCAwO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgaWYgKCAhaXNOYU4odmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGFyZ2V0Ti5zdGFydFJhZGl1cyA9IHZhbHVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgRmlyZS5lcnJvcignVGhlIG5ldyBzdGFydFJhZGl1cyBtdXN0IG5vdCBiZSBOYU4nKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgc3RhcnRSYWRpdXNWYXJpYW5jZToge1xuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMudGFyZ2V0Ti5zdGFydFJhZGl1c1ZhciB8fCAwO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgaWYgKCAhaXNOYU4odmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGFyZ2V0Ti5zdGFydFJhZGl1c1ZhciA9IHZhbHVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgRmlyZS5lcnJvcignVGhlIG5ldyBzdGFydFJhZGl1c1ZhcmlhbmNlIG11c3Qgbm90IGJlIE5hTicpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBlbmRSYWRpdXM6IHtcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnRhcmdldE4uZW5kUmFkaXVzIHx8IDA7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICBpZiAoICFpc05hTih2YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50YXJnZXROLmVuZFJhZGl1cyA9IHZhbHVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgRmlyZS5lcnJvcignVGhlIG5ldyBlbmRSYWRpdXMgbXVzdCBub3QgYmUgTmFOJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIGVuZFJhZGl1c1ZhcmlhbmNlOiB7XG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy50YXJnZXROLmVuZFJhZGl1c1ZhciB8fCAwO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgaWYgKCAhaXNOYU4odmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGFyZ2V0Ti5lbmRSYWRpdXNWYXIgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIEZpcmUuZXJyb3IoJ1RoZSBuZXcgZW5kUmFkaXVzVmFyaWFuY2UgbXVzdCBub3QgYmUgTmFOJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIHJvdGF0ZVBlclNlY29uZDoge1xuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMudGFyZ2V0Ti5yb3RhdGVQZXJTZWNvbmQgfHwgMDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIGlmICggIWlzTmFOKHZhbHVlKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRhcmdldE4ucm90YXRlUGVyU2Vjb25kID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBGaXJlLmVycm9yKCdUaGUgbmV3IHJvdGF0ZVBlclNlY29uZCBtdXN0IG5vdCBiZSBOYU4nKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgcm90YXRlUGVyU2Vjb25kVmFyaWFuY2U6IHtcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnRhcmdldE4ucm90YXRlUGVyU2Vjb25kVmFyIHx8IDA7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICBpZiAoICFpc05hTih2YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50YXJnZXROLnJvdGF0ZVBlclNlY29uZFZhciA9IHZhbHVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgRmlyZS5lcnJvcignVGhlIG5ldyByb3RhdGVQZXJTZWNvbmRWYXJpYW5jZSBtdXN0IG5vdCBiZSBOYU4nKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgX3NlcmlhbGl6ZU9iamVjdDoge1xuICAgICAgICAgICAgZGVmYXVsdDogbnVsbFxuICAgICAgICB9XG4gICAgfSxcblxuICAgIHN0YXRpY3M6IHtcbiAgICAgICAgYW5pbWF0YWJsZUluRWRpdG9yOiB0cnVlXG4gICAgfSxcblxuICAgIG9uRm9jdXNJbkVkaXRvcjogZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLnRhcmdldE4ucmVzZXRTeXN0ZW0oKTtcbiAgICB9LFxuXG4gICAgb25Mb3N0Rm9jdXNJbkVkaXRvcjogZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLnRhcmdldE4ucmVzZXRTeXN0ZW0oKTtcbiAgICAgICAgdGhpcy50YXJnZXROLnN0b3BTeXN0ZW0oKTtcblxuICAgICAgICBGaXJlLmVuZ2luZS5yZW5kZXJSdW50aW1lKCk7XG4gICAgfSxcblxuICAgIF9zZXJpYWxpemVUb09iamVjdDogZnVuY3Rpb24gKG9iamVjdCwgcHJvcGVydHkpIHtcbiAgICAgICAgdmFyIHZhbHVlID0gdGhpc1twcm9wZXJ0eV07XG5cbiAgICAgICAgaWYgKHZhbHVlIGluc3RhbmNlb2YgRmlyZS5Db2xvcikge1xuICAgICAgICAgICAgb2JqZWN0W3Byb3BlcnR5XSA9IFt2YWx1ZS5yLCB2YWx1ZS5nLCB2YWx1ZS5iLCB2YWx1ZS5hXTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh2YWx1ZSBpbnN0YW5jZW9mIEZpcmUuVmVjMikge1xuICAgICAgICAgICAgb2JqZWN0W3Byb3BlcnR5XSA9IFt2YWx1ZS54LCB2YWx1ZS55XTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIG9iamVjdFtwcm9wZXJ0eV0gPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBfZGVzZXJpYWxpemVGcm9tT2JqZWN0OiBmdW5jdGlvbiAob2JqZWN0LCBwcm9wZXJ0eSkge1xuICAgICAgICB2YXIgdmFsdWUgPSBvYmplY3RbcHJvcGVydHldO1xuXG4gICAgICAgIHZhciBhdHRyID0gRmlyZS5hdHRyKFBhcnRpY2xlV3JhcHBlciwgcHJvcGVydHkpO1xuXG4gICAgICAgIGlmIChhdHRyLmN0b3IgPT09IEZpcmUuQ29sb3IpIHtcbiAgICAgICAgICAgIHRoaXNbcHJvcGVydHldID0gdmFsdWUgPyBuZXcgRmlyZS5Db2xvcih2YWx1ZVswXSwgdmFsdWVbMV0sIHZhbHVlWzJdLCB2YWx1ZVszXSkgOiBGaXJlLkNvbG9yLndoaXRlOztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmKGF0dHIuY3RvciA9PT0gRmlyZS5WZWMyKSB7XG4gICAgICAgICAgICB0aGlzW3Byb3BlcnR5XSA9IHZhbHVlID8gbmV3IEZpcmUuVmVjMih2YWx1ZVswXSwgdmFsdWVbMV0pIDogRmlyZS5WZWMyLnplcm87XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzW3Byb3BlcnR5XSA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIF9jcmVhdGVUZXh0dXJlRnJvbURhdGE6IGZ1bmN0aW9uIChpbWdQYXRoLCB0ZXh0dXJlRGF0YSkge1xuICAgICAgICBpZiAoIXRleHR1cmVEYXRhKSByZXR1cm4gbnVsbDtcblxuICAgICAgICB2YXIgdGV4dHVyZSA9IGNjLnRleHR1cmVDYWNoZS5nZXRUZXh0dXJlRm9yS2V5KGltZ1BhdGgpO1xuICAgICAgICBpZiAodGV4dHVyZSkgcmV0dXJuIHRleHR1cmU7XG5cbiAgICAgICAgdmFyIGJ1ZmZlciA9IGNjLnVuemlwQmFzZTY0QXNBcnJheSh0ZXh0dXJlRGF0YSwgMSk7XG4gICAgICAgIGlmICghYnVmZmVyKSB7XG4gICAgICAgICAgICBGaXJlLmVycm9yKFwiRXJyb3IgZGVjb2Rpbmcgb3IgdW5nemlwcGluZyB0ZXh0dXJlSW1hZ2VEYXRhXCIpO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGltYWdlRm9ybWF0ID0gY2MuZ2V0SW1hZ2VGb3JtYXRCeURhdGEoYnVmZmVyKTtcblxuICAgICAgICBpZihpbWFnZUZvcm1hdCAhPT0gY2MuRk1UX1RJRkYgJiYgaW1hZ2VGb3JtYXQgIT09IGNjLkZNVF9QTkcpe1xuICAgICAgICAgICAgRmlyZS5lcnJvcihcIlVua25vd24gaW1hZ2UgZm9ybWF0IHdpdGggRGF0YVwiKTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBjYW52YXNPYmogPSBjYy5uZXdFbGVtZW50KFwiY2FudmFzXCIpO1xuICAgICAgICBpZihpbWFnZUZvcm1hdCA9PT0gY2MuRk1UX1BORyl7XG4gICAgICAgICAgICB2YXIgbXlQbmdPYmogPSBuZXcgY2MuUE5HUmVhZGVyKGJ1ZmZlcik7XG4gICAgICAgICAgICBteVBuZ09iai5yZW5kZXIoY2FudmFzT2JqKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHZhciBteVRJRkZPYmogPSBjYy50aWZmUmVhZGVyO1xuICAgICAgICAgICAgbXlUSUZGT2JqLnBhcnNlVElGRihidWZmZXIsY2FudmFzT2JqKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNjLnRleHR1cmVDYWNoZS5jYWNoZUltYWdlKGltZ1BhdGgsIGNhbnZhc09iaik7XG5cbiAgICAgICAgdGV4dHVyZSA9IGNjLnRleHR1cmVDYWNoZS5nZXRUZXh0dXJlRm9yS2V5KGltZ1BhdGgpO1xuICAgICAgICBpZighdGV4dHVyZSlcbiAgICAgICAgICAgIEZpcmUuZXJyb3IoXCJFcnJvciBsb2FkaW5nIHRoZSB0ZXh0dXJlXCIpO1xuXG4gICAgICAgIHJldHVybiB0ZXh0dXJlO1xuICAgIH0sXG5cbiAgICBvbkJlZm9yZVNlcmlhbGl6ZTogZnVuY3Rpb24gKCkge1xuICAgICAgICBOb2RlV3JhcHBlci5wcm90b3R5cGUub25CZWZvcmVTZXJpYWxpemUuY2FsbCh0aGlzKTtcblxuICAgICAgICBpZiAodGhpcy5jdXN0b20pIHtcbiAgICAgICAgICAgIHRoaXMuX3NlcmlhbGl6ZU9iamVjdCA9IHt9O1xuICAgICAgICAgICAgdmFyIG9iamVjdCA9IHRoaXMuX3NlcmlhbGl6ZU9iamVjdDtcblxuICAgICAgICAgICAgb2JqZWN0LmVtaXR0ZXJNb2RlID0gdGhpcy5lbWl0dGVyTW9kZTtcblxuICAgICAgICAgICAgdmFyIG1vZGVQcm9wZXJ0aWVzID0gb2JqZWN0LmVtaXR0ZXJNb2RlID09PSBSdW50aW1lLlBhcnRpY2xlRW1pdE1vZGUuR3Jhdml0eSA/IGdyYXZpdHlNb2RlUHJvcGVydGllcyA6IHJhZGl1c01vZGVQcm9wZXJ0aWVzO1xuICAgICAgICAgICAgdmFyIHByb3BlcnRpZXMgPSBzaGFyZVByb3BlcnRpZXMuY29uY2F0KG1vZGVQcm9wZXJ0aWVzKTtcblxuICAgICAgICAgICAgcHJvcGVydGllcy5mb3JFYWNoKGZ1bmN0aW9uIChwcm9wZXJ0eSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX3NlcmlhbGl6ZVRvT2JqZWN0KG9iamVjdCwgcHJvcGVydHkpO1xuICAgICAgICAgICAgfS5iaW5kKHRoaXMpKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX3NlcmlhbGl6ZU9iamVjdCA9IG51bGw7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgY3JlYXRlTm9kZTogZnVuY3Rpb24gKG5vZGUpIHtcbiAgICAgICAgbm9kZSA9IG5vZGUgfHwgbmV3IGNjLlBhcnRpY2xlU3lzdGVtKCk7XG5cbiAgICAgICAgTm9kZVdyYXBwZXIucHJvdG90eXBlLmNyZWF0ZU5vZGUuY2FsbCh0aGlzLCBub2RlKTtcblxuICAgICAgICB2YXIgb2JqZWN0ID0gdGhpcy5fc2VyaWFsaXplT2JqZWN0O1xuICAgICAgICBpZiAodGhpcy5jdXN0b20gJiYgb2JqZWN0KSB7XG5cbiAgICAgICAgICAgIHZhciBtb2RlUHJvcGVydGllcyA9IG9iamVjdC5lbWl0dGVyTW9kZSA9PT0gUnVudGltZS5QYXJ0aWNsZUVtaXRNb2RlLkdyYXZpdHkgPyBncmF2aXR5TW9kZVByb3BlcnRpZXMgOiByYWRpdXNNb2RlUHJvcGVydGllcztcbiAgICAgICAgICAgIHZhciBwcm9wZXJ0aWVzID0gc2hhcmVQcm9wZXJ0aWVzLmNvbmNhdChtb2RlUHJvcGVydGllcyk7XG5cbiAgICAgICAgICAgIHZhciBvbGRUYXJnZXQgPSB0aGlzLnRhcmdldE47XG4gICAgICAgICAgICB0aGlzLnRhcmdldE4gPSBub2RlO1xuXG4gICAgICAgICAgICBwcm9wZXJ0aWVzLmZvckVhY2goZnVuY3Rpb24gKHByb3BlcnR5KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fZGVzZXJpYWxpemVGcm9tT2JqZWN0KG9iamVjdCwgcHJvcGVydHkpO1xuICAgICAgICAgICAgfS5iaW5kKHRoaXMpKTtcblxuICAgICAgICAgICAgdGhpcy50YXJnZXROID0gb2xkVGFyZ2V0O1xuXG5cbiAgICAgICAgICAgIGlmICh0aGlzLl9maWxlVG9Mb2FkKSB7XG4gICAgICAgICAgICAgICAgbm9kZS5fcGxpc3RGaWxlID0gdGhpcy5fZmlsZVRvTG9hZDtcbiAgICAgICAgICAgICAgICB0aGlzLl9maWxlVG9Mb2FkID0gJyc7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICggdGhpcy5fdGV4VG9Mb2FkICkge1xuICAgICAgICAgICAgICAgIHZhciB0ZXh0dXJlID0gY2MudGV4dHVyZUNhY2hlLmFkZEltYWdlKCB0aGlzLl90ZXhUb0xvYWQgKTtcbiAgICAgICAgICAgICAgICBub2RlLnRleHR1cmUgPSB0ZXh0dXJlO1xuICAgICAgICAgICAgICAgIHRoaXMuX3RleFRvTG9hZCA9ICcnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiggbm9kZS5fcGxpc3RGaWxlICkge1xuICAgICAgICAgICAgICAgIHZhciBkaWN0aW9uYXJ5ID0gY2MubG9hZGVyLmdldFJlcyhub2RlLl9wbGlzdEZpbGUpO1xuXG4gICAgICAgICAgICAgICAgaWYgKGRpY3Rpb25hcnkpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRleHR1cmVOYW1lID0gZGljdGlvbmFyeVsndGV4dHVyZUZpbGVOYW1lJ107XG4gICAgICAgICAgICAgICAgICAgIHZhciB0ZXh0dXJlID0gY2MudGV4dHVyZUNhY2hlLmdldFRleHR1cmVGb3JLZXkodGV4dHVyZU5hbWUpO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICghdGV4dHVyZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHRleHR1cmVEYXRhID0gZGljdGlvbmFyeVsndGV4dHVyZUltYWdlRGF0YSddO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZXh0dXJlID0gdGhpcy5fY3JlYXRlVGV4dHVyZUZyb21EYXRhKHRleHR1cmVOYW1lLCB0ZXh0dXJlRGF0YSk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBub2RlLnRleHR1cmUgPSB0ZXh0dXJlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGlmICggdGhpcy5fZmlsZVRvTG9hZCApIHtcbiAgICAgICAgICAgICAgICB2YXIgb3JpZ2luUG9zaXRpb24gPSBub2RlLmdldFBvc2l0aW9uKCk7XG4gICAgICAgICAgICAgICAgbm9kZS5pbml0V2l0aEZpbGUoIHRoaXMuX2ZpbGVUb0xvYWQgKTtcbiAgICAgICAgICAgICAgICBub2RlLnNldFBvc2l0aW9uKCBvcmlnaW5Qb3NpdGlvbiApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG5vZGU7XG4gICAgfVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gUGFydGljbGVXcmFwcGVyO1xuIiwidmFyIFZlYzIgPSBGaXJlLlZlYzI7XG52YXIgSGVscGVycyA9IEZpcmUuUnVudGltZS5IZWxwZXJzO1xuXG4vKipcbiAqIEBjbGFzcyBTY2VuZVdyYXBwZXJcbiAqIEBleHRlbmRzIEZpcmUuUnVudGltZS5TY2VuZVdyYXBwZXJcbiAqIEBjb25zdHJ1Y3RvclxuICogQHBhcmFtIHtSdW50aW1lTm9kZX0gbm9kZSAtIFRoZSByb290IG5vZGUgb2YgY3VycmVudCBzdGFnZS5cbiAqL1xudmFyIFNjZW5lV3JhcHBlciA9IEZpcmUuQ2xhc3Moe1xuICAgIG5hbWU6ICdSdW50aW1lLlNjZW5lV3JhcHBlcicsXG4gICAgZXh0ZW5kczogRmlyZS5SdW50aW1lLlNjZW5lV3JhcHBlcixcblxuICAgIHByb3BlcnRpZXM6IHtcblxuICAgICAgICBjaGlsZHJlbk46IHtcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnRhcmdldE4uY2hpbGRyZW47XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdmlzaWJsZTogZmFsc2VcbiAgICAgICAgfSxcblxuICAgICAgICBwb3NpdGlvbjoge1xuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBWZWMyKHRoaXMudGFyZ2V0Ti54LCB0aGlzLnRhcmdldE4ueSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICBpZiAoIHZhbHVlIGluc3RhbmNlb2YgVmVjMiApIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50YXJnZXROLnNldFBvc2l0aW9uKHZhbHVlLngsIHZhbHVlLnkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgRmlyZS5lcnJvcignVGhlIG5ldyBwb3NpdGlvbiBtdXN0IGJlIEZpcmUuVmVjMicpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICB3b3JsZFBvc2l0aW9uOiB7XG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5wb3NpdGlvbjtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMucG9zaXRpb24gPSB2YWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBzY2FsZToge1xuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBWZWMyKHRoaXMudGFyZ2V0Ti5zY2FsZVgsIHRoaXMudGFyZ2V0Ti5zY2FsZVkpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgaWYgKCB2YWx1ZSBpbnN0YW5jZW9mIFZlYzIgKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGFyZ2V0Ti5zY2FsZVggPSB2YWx1ZS54O1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRhcmdldE4uc2NhbGVZID0gdmFsdWUueTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIEZpcmUuZXJyb3IoJ1RoZSBuZXcgc2NhbGUgbXVzdCBiZSBGaXJlLlZlYzInKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgd29ybGRTY2FsZToge1xuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2NhbGU7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNjYWxlID0gdmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgcm90YXRpb246IHtcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnRhcmdldE4ucm90YXRpb247XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICBpZiAoICFpc05hTih2YWx1ZSkgKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGFyZ2V0Ti5yb3RhdGlvbiA9IHZhbHVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgRmlyZS5lcnJvcignVGhlIG5ldyByb3RhdGlvbiBtdXN0IG5vdCBiZSBOYU4nKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgd29ybGRSb3RhdGlvbjoge1xuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucm90YXRpb247XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJvdGF0aW9uID0gdmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgX3Bvc2l0aW9uOiB7XG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsXG4gICAgICAgIH0sXG5cbiAgICAgICAgX3NjYWxlOiB7XG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsXG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgX2RlZXBRdWVyeUNoaWxkcmVuOiBmdW5jdGlvbiAoY2IpIHtcblxuICAgICAgICBmdW5jdGlvbiB0cmF2ZXJzYWwgKG5vZGUsIGNiKSB7XG4gICAgICAgICAgICB2YXIgY2hpbGRyZW4gPSBub2RlLmNoaWxkcmVuO1xuXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaTxjaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIHZhciBjaGlsZCA9IGNoaWxkcmVuW2ldO1xuXG4gICAgICAgICAgICAgICAgaWYgKCFjYiggY2hpbGQgKSkgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICB0cmF2ZXJzYWwoY2hpbGQsIGNiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRyYXZlcnNhbCh0aGlzLCBjYik7XG4gICAgfSxcblxuICAgIHRyYW5zZm9ybVBvaW50VG9Xb3JsZDogZnVuY3Rpb24gKHBvaW50KSB7XG4gICAgICAgIHZhciBjb252ZXJ0ZWQgPSB0aGlzLnRhcmdldE4uY29udmVydFRvV29ybGRTcGFjZUFSKHBvaW50KTtcbiAgICAgICAgcmV0dXJuIG5ldyBGaXJlLlZlYzIoY29udmVydGVkLngsIGNvbnZlcnRlZC55KTtcbiAgICB9LFxuXG4gICAgdHJhbnNmb3JtUG9pbnRUb0xvY2FsOiBmdW5jdGlvbiAocG9pbnQpIHtcbiAgICAgICAgdmFyIGNvbnZlcnRlZCA9IHRoaXMudGFyZ2V0Ti5jb252ZXJ0VG9Ob2RlU3BhY2VBUihwb2ludCk7XG4gICAgICAgIHJldHVybiBuZXcgRmlyZS5WZWMyKGNvbnZlcnRlZC54LCBjb252ZXJ0ZWQueSk7XG4gICAgfSxcblxuICAgIGF0dGFjaGVkOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIC8vIG9uRW50ZXIgd2lsbCBiZSBjYWxsZWQgd2hlbiBub2RlIGVudGVycyB0aGUgc3RhZ2VcbiAgICAgICAgdmFyIG9yaWdpbk9uRW50ZXI9IHRoaXMudGFyZ2V0Ti5vbkVudGVyO1xuICAgICAgICB0aGlzLnRhcmdldE4ub25FbnRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIG9yaWdpbk9uRW50ZXIuY2FsbCh0aGlzKTtcbiAgICAgICAgICAgIEhlbHBlcnMub25Ob2RlQXR0YWNoZWRUb1BhcmVudCh0aGlzKTtcbiAgICAgICAgfTtcblxuICAgICAgICAvLyBvbkV4aXQgd2lsbCBiZSBjYWxsZWQgd2hlbiBub2RlIGxlYXZlcyB0aGUgc3RhZ2VcbiAgICAgICAgdmFyIG9yaWdpbk9uRXhpdCA9IHRoaXMudGFyZ2V0Ti5vbkV4aXQ7XG4gICAgICAgIHRoaXMudGFyZ2V0Ti5vbkV4aXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBvcmlnaW5PbkV4aXQuY2FsbCh0aGlzKTtcbiAgICAgICAgICAgIEhlbHBlcnMub25Ob2RlRGV0YWNoZWRGcm9tUGFyZW50KHRoaXMpO1xuICAgICAgICB9O1xuICAgIH0sXG5cbiAgICBwcmVsb2FkQXNzZXRzOiBmdW5jdGlvbiAoYXNzZXRzLCBjYWxsYmFjaykge1xuICAgICAgICB2YXIgdXJscyA9IGFzc2V0cy5tYXAoIGZ1bmN0aW9uIChhc3NldCkge1xuICAgICAgICAgICAgcmV0dXJuIGFzc2V0LnVybDtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgY2MubG9hZGVyLmxvYWQodXJscywgY2FsbGJhY2spO1xuICAgIH0sXG5cbiAgICBvbkJlZm9yZVNlcmlhbGl6ZTogZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLl9zY2FsZSA9IFt0aGlzLnNjYWxlWCwgdGhpcy5zY2FsZVldO1xuICAgICAgICB0aGlzLl9wb3NpdGlvbiA9IFt0aGlzLnBvc2l0aW9uLngsIHRoaXMucG9zaXRpb24ueV07XG4gICAgfSxcblxuICAgIGNyZWF0ZU5vZGU6IGZ1bmN0aW9uIChub2RlKSB7XG4gICAgICAgIG5vZGUgPSBub2RlIHx8IG5ldyBjYy5TY2VuZSgpO1xuXG4gICAgICAgIG5vZGUuc2V0QW5jaG9yUG9pbnQoMC4wLCAwLjApO1xuXG4gICAgICAgIG5vZGUueCA9IHRoaXMuX3Bvc2l0aW9uID8gdGhpcy5fcG9zaXRpb25bMF0gOiAwO1xuICAgICAgICBub2RlLnkgPSB0aGlzLl9wb3NpdGlvbiA/IHRoaXMuX3Bvc2l0aW9uWzFdIDogMDtcbiAgICAgICAgbm9kZS5zY2FsZVggPSB0aGlzLl9zY2FsZSA/IHRoaXMuX3NjYWxlWzBdIDogMTtcbiAgICAgICAgbm9kZS5zY2FsZVkgPSB0aGlzLl9zY2FsZSA/IHRoaXMuX3NjYWxlWzFdIDogMTtcblxuICAgICAgICByZXR1cm4gbm9kZTtcbiAgICB9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBTY2VuZVdyYXBwZXI7XG4iLCJcbnZhciBOb2RlV3JhcHBlciA9IHJlcXVpcmUoJy4vbm9kZScpO1xuXG52YXIgU3ByaXRlV3JhcHBlciA9IEZpcmUuQ2xhc3Moe1xuICAgIG5hbWU6ICdSdW50aW1lLlNwcml0ZVdyYXBwZXInLFxuICAgIGV4dGVuZHM6IE5vZGVXcmFwcGVyLFxuICAgIGNvbnN0cnVjdG9yOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuX3RleFRvTG9hZCA9ICcnO1xuICAgIH0sXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG5cbiAgICAgICAgX3RleHR1cmU6IHtcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHZhciB0ZXggPSB0aGlzLnRhcmdldE4udGV4dHVyZTtcbiAgICAgICAgICAgICAgICByZXR1cm4gKHRleCAmJiB0ZXgudXJsKSB8fCAnJztcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnRhcmdldE4pIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50YXJnZXROLnRleHR1cmUgPSB2YWx1ZSB8fCBudWxsO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fdGV4VG9Mb2FkID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHZpc2libGU6IHRydWUsXG4gICAgICAgICAgICB1cmw6IEZpcmUuVGV4dHVyZVxuICAgICAgICB9XG4gICAgfSxcblxuICAgIHN0YXRpY3M6IHtcbiAgICB9LFxuXG4gICAgY3JlYXRlTm9kZTogZnVuY3Rpb24gKG5vZGUpIHtcbiAgICAgICAgbm9kZSA9IG5vZGUgfHwgbmV3IGNjLlNwcml0ZSgpO1xuXG4gICAgICAgIE5vZGVXcmFwcGVyLnByb3RvdHlwZS5jcmVhdGVOb2RlLmNhbGwodGhpcywgbm9kZSk7XG5cbiAgICAgICAgaWYgKHRoaXMuX3RleFRvTG9hZCkge1xuICAgICAgICAgICAgbm9kZS50ZXh0dXJlID0gdGhpcy5fdGV4VG9Mb2FkO1xuICAgICAgICAgICAgdGhpcy5fdGV4VG9Mb2FkID0gJyc7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbm9kZTtcbiAgICB9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBTcHJpdGVXcmFwcGVyO1xuIiwiXG5SdW50aW1lLlRleHRBbGlnbiA9IEZpcmUuZGVmaW5lRW51bSh7XG4gICAgLyoqXG4gICAgICogISNlbiBBbGlnbiB0byB0aGUgbGVmdCAhI3poIOaWh+Wtl+mdoOW3puWvuem9kFxuICAgICAqIEBwcm9wZXJ0eSBMZWZ0XG4gICAgICogQHR5cGUge251bWJlcn1cbiAgICAgKi9cbiAgICBMZWZ0OiAtMSxcbiAgICAvKipcbiAgICAgKiBAcHJvcGVydHkgQ2VudGVyXG4gICAgICogQHR5cGUge251bWJlcn1cbiAgICAgKi9cbiAgICBDZW50ZXI6IC0xLFxuICAgIC8qKlxuICAgICAqIEBwcm9wZXJ0eSBSaWdodFxuICAgICAqIEB0eXBlIHtudW1iZXJ9XG4gICAgICovXG4gICAgUmlnaHQ6IC0xXG59KTtcblxuUnVudGltZS5UZXh0QW5jaG9yID0gRmlyZS5kZWZpbmVFbnVtKHtcbiAgICAvKipcbiAgICAgKiBAcHJvcGVydHkgVG9wTGVmdFxuICAgICAqIEB0eXBlIHtudW1iZXJ9XG4gICAgICovXG4gICAgVG9wTGVmdDogLTEsXG4gICAgLyoqXG4gICAgICogQHByb3BlcnR5IFRvcENlbnRlclxuICAgICAqIEB0eXBlIHtudW1iZXJ9XG4gICAgICovXG4gICAgVG9wQ2VudGVyOiAtMSxcbiAgICAvKipcbiAgICAgKiBAcHJvcGVydHkgVG9wUmlnaHRcbiAgICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgICAqL1xuICAgIFRvcFJpZ2h0OiAtMSxcbiAgICAvKipcbiAgICAgKiBAcHJvcGVydHkgTWlkZGxlTGVmdFxuICAgICAqIEB0eXBlIHtudW1iZXJ9XG4gICAgICovXG4gICAgTWlkZGxlTGVmdDogLTEsXG4gICAgLyoqXG4gICAgICogQHByb3BlcnR5IE1pZGRsZUNlbnRlclxuICAgICAqIEB0eXBlIHtudW1iZXJ9XG4gICAgICovXG4gICAgTWlkZGxlQ2VudGVyOiAtMSxcbiAgICAvKipcbiAgICAgKiBAcHJvcGVydHkgTWlkZGxlUmlnaHRcbiAgICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgICAqL1xuICAgIE1pZGRsZVJpZ2h0OiAtMSxcbiAgICAvKipcbiAgICAgKiBAcHJvcGVydHkgQm90dG9tTGVmdFxuICAgICAqIEB0eXBlIHtudW1iZXJ9XG4gICAgICovXG4gICAgQm90dG9tTGVmdDogLTEsXG4gICAgLyoqXG4gICAgICogQHByb3BlcnR5IEJvdHRvbUNlbnRlclxuICAgICAqIEB0eXBlIHtudW1iZXJ9XG4gICAgICovXG4gICAgQm90dG9tQ2VudGVyOiAtMSxcbiAgICAvKipcbiAgICAgKiBAcHJvcGVydHkgQm90dG9tUmlnaHRcbiAgICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgICAqL1xuICAgIEJvdHRvbVJpZ2h0OiAtMSxcbn0pO1xuXG5cblJ1bnRpbWUuUGFydGljbGVQb3NpdGlvblR5cGUgPSBGaXJlLmRlZmluZUVudW0oe1xuXG4gICAgRnJlZTogY2MuUGFydGljbGVTeXN0ZW0uVFlQRV9GUkVFLFxuXG4gICAgR3JvdXBlZDogY2MuUGFydGljbGVTeXN0ZW0uVFlQRV9HUk9VUEVEXG59KTtcblxuXG5SdW50aW1lLlBhcnRpY2xlRW1pdE1vZGUgPSBGaXJlLmRlZmluZUVudW0oe1xuXG4gICAgR3Jhdml0eTogY2MuUGFydGljbGVTeXN0ZW0uTU9ERV9HUkFWSVRZLFxuXG4gICAgUmFkaXVzOiBjYy5QYXJ0aWNsZVN5c3RlbS5NT0RFX1JBRElVU1xufSk7XG5cbiIsInZhciBDb2xvciA9IEZpcmUuQ29sb3I7XG5cbkNvbG9yLnByb3RvdHlwZS50b0NDQ29sb3IgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgcjogKHRoaXMuciAqIDI1NSkgfCAwLFxuICAgICAgICBnOiAodGhpcy5nICogMjU1KSB8IDAsXG4gICAgICAgIGI6ICh0aGlzLmIgKiAyNTUpIHwgMCxcbiAgICAgICAgYTogKHRoaXMuYSAqIDI1NSkgfCAwXG4gICAgfTtcbn07XG5cbmNjLkNvbG9yLnByb3RvdHlwZS50b0ZpcmVDb2xvciA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gbmV3IENvbG9yKFxuICAgICAgICB0aGlzLnIgLyAyNTUsXG4gICAgICAgIHRoaXMuZyAvIDI1NSxcbiAgICAgICAgdGhpcy5iIC8gMjU1LFxuICAgICAgICB0aGlzLmEgLyAyNTVcbiAgICApO1xufTtcbiIsIlxuRmlyZS5KUy5taXhpbiggRmlyZS5CaXRtYXBGb250LnByb3RvdHlwZSwge1xuICAgIGNyZWF0ZU5vZGU6IGZ1bmN0aW9uIChjYWxsYmFjaykge1xuICAgICAgICB2YXIgbm9kZTtcblxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgbm9kZSA9IG5ldyBjYy5MYWJlbEJNRm9udCgpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIHJldHVybiBjYWxsYmFjayhlcnIpO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHdyYXBwZXIgPSBGaXJlKG5vZGUpO1xuICAgICAgICB3cmFwcGVyLm5hbWUgPSB0aGlzLm5hbWU7XG4gICAgICAgIHdyYXBwZXIudGV4dCA9ICdUZXh0JztcbiAgICAgICAgd3JhcHBlci5fYml0bWFwRm9udCA9IHRoaXMudXJsO1xuXG4gICAgICAgIHJldHVybiBjYWxsYmFjayhudWxsLCBub2RlKTtcbiAgICB9XG59KTtcbiIsIi8vIFVzZSB0aGlzIGZpbGUgdG8gYnJvd3NlcmlmeVxuXG5yZXF1aXJlKCcuL3RleHR1cmUnKTtcbnJlcXVpcmUoJy4vYml0bWFwLWZvbnQnKTtcbnJlcXVpcmUoJy4vc3ByaXRlLWFuaW1hdGlvbicpO1xucmVxdWlyZSgnLi9wYXJ0aWNsZScpO1xucmVxdWlyZSgnLi9zcHJpdGUtYXRsYXMnKTtcblxuIiwidmFyIFBhcnRpY2xlQXNzZXQgPSBGaXJlLkNsYXNzKHtcblxuICAgIG5hbWU6ICdSdW50aW1lLlBhcnRpY2xlQXNzZXQnLFxuXG4gICAgZXh0ZW5kczogRmlyZS5Bc3NldCxcblxuICAgIGNvbnN0cnVjdG9yOiBmdW5jdGlvbiAoKSB7XG4gICAgfSxcblxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgdGV4dHVyZToge1xuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IEZpcmUuVGV4dHVyZSxcbiAgICAgICAgICAgIHZpc2libGU6IGZhbHNlLFxuICAgICAgICB9XG4gICAgfSxcblxuICAgIGNyZWF0ZU5vZGU6IGZ1bmN0aW9uIChjYWxsYmFjaykge1xuICAgICAgICB2YXIgbm9kZTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIG5vZGUgPSBuZXcgY2MuUGFydGljbGVTeXN0ZW0oKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaChlKSB7XG4gICAgICAgICAgICByZXR1cm4gY2FsbGJhY2soZSk7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgd3JhcHBlciA9IEZpcmUobm9kZSk7XG4gICAgICAgIHdyYXBwZXIuX2ZpbGUgPSB0aGlzLnVybDtcbiAgICAgICAgd3JhcHBlci5uYW1lID0gdGhpcy5uYW1lO1xuICAgICAgICByZXR1cm4gY2FsbGJhY2sobnVsbCwgbm9kZSk7XG4gICAgfVxufSk7XG5cblJ1bnRpbWUuUGFydGljbGVBc3NldCA9IFBhcnRpY2xlQXNzZXQ7XG5cbm1vZHVsZS5leHBvcnRzID0gUGFydGljbGVBc3NldDtcbiIsIm1vZHVsZS5leHBvcnRzID0gKGZ1bmN0aW9uICgpIHtcblxuICAgIHZhciBTcHJpdGVBbmltYXRpb25Bc3NldCA9IEZpcmUuQ2xhc3Moe1xuXG4gICAgICAgIG5hbWU6ICdSdW50aW1lLlNwcml0ZUFuaW1hdGlvbkFzc2V0JyxcblxuICAgICAgICBleHRlbmRzOiBGaXJlLkFzc2V0LFxuXG4gICAgICAgIGNvbnN0cnVjdG9yOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIH0sXG5cbiAgICAgICAgcHJvcGVydGllczoge1xuICAgICAgICAgICAgMDoge1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6ICcnLFxuICAgICAgICAgICAgICAgIHR5cGU6IEZpcmUuVGV4dHVyZVxuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgMjoge1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6ICcnLFxuICAgICAgICAgICAgICAgIHR5cGU6IEZpcmUuVGV4dHVyZVxuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgMzoge1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6ICcnLFxuICAgICAgICAgICAgICAgIHR5cGU6IEZpcmUuVGV4dHVyZVxuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgNDoge1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6ICcnLFxuICAgICAgICAgICAgICAgIHR5cGU6IEZpcmUuVGV4dHVyZVxuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgNToge1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6ICcnLFxuICAgICAgICAgICAgICAgIHR5cGU6IEZpcmUuVGV4dHVyZVxuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgNjoge1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6ICcnLFxuICAgICAgICAgICAgICAgIHR5cGU6IEZpcmUuVGV4dHVyZVxuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgNzoge1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6ICcnLFxuICAgICAgICAgICAgICAgIHR5cGU6IEZpcmUuVGV4dHVyZVxuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgODoge1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6ICcnLFxuICAgICAgICAgICAgICAgIHR5cGU6IEZpcmUuVGV4dHVyZVxuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgOToge1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6ICcnLFxuICAgICAgICAgICAgICAgIHR5cGU6IEZpcmUuVGV4dHVyZVxuICAgICAgICAgICAgfSxcblxuXG4gICAgICAgICAgICBsb29wOiB7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDogdHJ1ZVxuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgZGVsYXk6IHtcbiAgICAgICAgICAgICAgICBkZWZhdWx0OiAwLjVcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICB9KTtcblxuICAgIFJ1bnRpbWUuU3ByaXRlQW5pbWF0aW9uQXNzZXQgPSBTcHJpdGVBbmltYXRpb25Bc3NldDtcblxuICAgIHJldHVybiBTcHJpdGVBbmltYXRpb25Bc3NldDtcbn0pKCk7XG4iLCJcbnZhciBTcHJpdGVBdGxhcyA9IEZpcmUuQ2xhc3Moe1xuXG4gICAgbmFtZTogJ1J1bnRpbWUuU3ByaXRlQXRsYXMnLFxuXG4gICAgZXh0ZW5kczogRmlyZS5Bc3NldCxcblxuICAgIGNvbnN0cnVjdG9yOiBmdW5jdGlvbiAoKSB7XG4gICAgfSxcblxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgcGxpc3Q6IHtcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnVybHNbMF07XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgdGV4dHVyZToge1xuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMudXJsc1sxXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG59KTtcblxuUnVudGltZS5TcHJpdGVBdGxhcyA9IFNwcml0ZUF0bGFzO1xuXG5tb2R1bGUuZXhwb3J0cyA9ICBTcHJpdGVBdGxhczsiLCJcbkZpcmUuSlMubWl4aW4oIEZpcmUuVGV4dHVyZS5wcm90b3R5cGUsIHtcbiAgICBjcmVhdGVOb2RlOiBmdW5jdGlvbiAoY2FsbGJhY2spIHtcbiAgICAgICAgdmFyIHNwcml0ZTtcblxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgc3ByaXRlID0gbmV3IGNjLlNwcml0ZSh0aGlzLnVybCk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2goZXJyKSB7XG4gICAgICAgICAgICByZXR1cm4gY2FsbGJhY2soZXJyKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciB3cmFwcGVyID0gRmlyZShzcHJpdGUpO1xuICAgICAgICB3cmFwcGVyLm5hbWUgPSB0aGlzLm5hbWU7XG5cbiAgICAgICAgcmV0dXJuIGNhbGxiYWNrKG51bGwsIHNwcml0ZSk7XG4gICAgfVxufSk7XG4iXX0=

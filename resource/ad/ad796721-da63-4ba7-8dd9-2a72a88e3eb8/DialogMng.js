"use strict";

var DialogMng = Fire.Class({
    "extends": Fire.Behavior,
    properties: {
        nextRoom: "",
        figureTex1: {
            "default": "",
            url: Fire.Texture
        },
        figureTex2: {
            "default": "",
            url: Fire.Texture
        },
        text1: "欢迎光临，我将为您提供支持与服务",
        text2: "点击右上角按钮选择业务房间",
        text3: "带您进入业务房间",
        text4: "前往业务房间"
    },
    onLoad: function onLoad() {
        var policy = new cc.ResolutionPolicy(cc.ContainerStrategy.PROPORTION_TO_FRAME, cc.ContentStrategy.SHOW_ALL);
        cc.view.setDesignResolutionSize(720, 480, policy);
        // text
        this.textHolder = Fire.engine.getCurrentSceneN().getChildByName("textHolder");
        this.textLabel = new cc.LabelTTF("Main Menu", "Arial", 20, cc.size(300, 100));
        this.textLabel.setName("textLabel");
        this.textHolder.addChild(this.textLabel);
        this.textLabel.setColor(new cc.Color(0, 0, 0));
        // hint arrow
        this.hintArrow = Fire.engine.getCurrentSceneN().getChildByName("arrow");
        // receptionist
        this.reception = Fire.engine.getCurrentSceneN().getChildByName("figure1");
        // register input
        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ALL_AT_ONCE,
            onTouchesBegan: this.onTouchesBegan.bind(this)
        }, this);
        // btn
        this.roomBtn = Fire.engine.getCurrentSceneN().getChildByName("btn1");
        this.roomBtn.addTouchEventListener(this.roomBtnTouched, this);

        this.businessBtn = Fire.engine.getCurrentSceneN().getChildByName("btn3");
        if (this.businessBtn) {
            this.businessBtn.addTouchEventListener(this.businessBtnTouched, this);
        }
        // counter
        this.textIdx = 0;
        this.acceptInput = false;
        this.startSession();
    },

    roomBtnTouched: function roomBtnTouched(sender, type) {
        switch (type) {
            case ccui.Widget.TOUCH_ENDED:
                this.toBusinessRoom();
                break;
            default:
                break;
        }
    },

    businessBtnTouched: function businessBtnTouched(sender, type) {
        switch (type) {
            case ccui.Widget.TOUCH_ENDED:
                this.doBusiness();
                break;
            default:
                break;
        }
    },

    onTouchesBegan: function onTouchesBegan(touches, event) {
        if (this.acceptInput) {
            this.processSession();
        }
    },

    startSession: function startSession() {
        this.textIdx++;
        this.showText(this.textIdx);
        setTimeout((function () {
            this.hintBlink();
            this.acceptInput = true;
        }).bind(this), 1000);
    },

    processSession: function processSession() {
        this.hintStop();
        if (++this.textIdx < 3) {
            this.acceptInput = false;
            this.showText(this.textIdx);
            setTimeout((function () {
                this.hintBlink();
                this.acceptInput = true;
            }).bind(this), 1000);
        }
    },

    toBusinessRoom: function toBusinessRoom() {
        this.hintStop();
        this.acceptInput = false;
        this.showFigureAction();
        this.showText(3);
        setTimeout((function () {
            Fire.log(this.text4);
            Fire.engine.loadScene(this.nextRoom);
        }).bind(this), 1000);
    },

    doBusiness: function doBusiness() {
        this.hintStop();
        this.showFigureAction();
        this.showText(4);
    },

    showFigureNormal: function showFigureNormal() {
        this.reception.setTexture(this.figureTex1);
    },

    showFigureAction: function showFigureAction() {
        this.reception.setTexture(this.figureTex2);
    },

    showText: function showText(idx) {
        this.textLabel.setVisible(true);
        this.textLabel.setString(this['text' + idx]);
    },
    hideText: function hideText() {
        this.textLabel.setVisible(false);
    },

    hintBlink: function hintBlink() {
        var blinkAction = cc.repeatForever(cc.blink(1, 1));
        this.hintArrow.setVisible(true);
        this.hintArrow.runAction(blinkAction);
    },

    hintStop: function hintStop() {
        this.hintArrow.stopAllActions();
        this.hintArrow.setVisible(false);
    }
});
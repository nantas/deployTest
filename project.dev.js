require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"DialogMng":[function(require,module,exports){
Fire._RFpush(module, 'ad796ch2mNLp43ZKnKojj64', 'DialogMng');
// scripts/DialogMng.js

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

Fire._RFpop();
},{}]},{},["DialogMng"])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2ZpcmViYWxsLXgvZmlyZWJhbGwvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsInNjcmlwdHMvRGlhbG9nTW5nLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIkZpcmUuX1JGcHVzaChtb2R1bGUsICdhZDc5NmNoMm1OTHA0M1pLbktvamo2NCcsICdEaWFsb2dNbmcnKTtcbi8vIHNjcmlwdHMvRGlhbG9nTW5nLmpzXG5cblwidXNlIHN0cmljdFwiO1xuXG52YXIgRGlhbG9nTW5nID0gRmlyZS5DbGFzcyh7XG4gICAgXCJleHRlbmRzXCI6IEZpcmUuQmVoYXZpb3IsXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICBuZXh0Um9vbTogXCJcIixcbiAgICAgICAgZmlndXJlVGV4MToge1xuICAgICAgICAgICAgXCJkZWZhdWx0XCI6IFwiXCIsXG4gICAgICAgICAgICB1cmw6IEZpcmUuVGV4dHVyZVxuICAgICAgICB9LFxuICAgICAgICBmaWd1cmVUZXgyOiB7XG4gICAgICAgICAgICBcImRlZmF1bHRcIjogXCJcIixcbiAgICAgICAgICAgIHVybDogRmlyZS5UZXh0dXJlXG4gICAgICAgIH0sXG4gICAgICAgIHRleHQxOiBcIuasoui/juWFieS4tO+8jOaIkeWwhuS4uuaCqOaPkOS+m+aUr+aMgeS4juacjeWKoVwiLFxuICAgICAgICB0ZXh0MjogXCLngrnlh7vlj7PkuIrop5LmjInpkq7pgInmi6nkuJrliqHmiL/pl7RcIixcbiAgICAgICAgdGV4dDM6IFwi5bim5oKo6L+b5YWl5Lia5Yqh5oi/6Ze0XCIsXG4gICAgICAgIHRleHQ0OiBcIuWJjeW+gOS4muWKoeaIv+mXtFwiXG4gICAgfSxcbiAgICBvbkxvYWQ6IGZ1bmN0aW9uIG9uTG9hZCgpIHtcbiAgICAgICAgdmFyIHBvbGljeSA9IG5ldyBjYy5SZXNvbHV0aW9uUG9saWN5KGNjLkNvbnRhaW5lclN0cmF0ZWd5LlBST1BPUlRJT05fVE9fRlJBTUUsIGNjLkNvbnRlbnRTdHJhdGVneS5TSE9XX0FMTCk7XG4gICAgICAgIGNjLnZpZXcuc2V0RGVzaWduUmVzb2x1dGlvblNpemUoNzIwLCA0ODAsIHBvbGljeSk7XG4gICAgICAgIC8vIHRleHRcbiAgICAgICAgdGhpcy50ZXh0SG9sZGVyID0gRmlyZS5lbmdpbmUuZ2V0Q3VycmVudFNjZW5lTigpLmdldENoaWxkQnlOYW1lKFwidGV4dEhvbGRlclwiKTtcbiAgICAgICAgdGhpcy50ZXh0TGFiZWwgPSBuZXcgY2MuTGFiZWxUVEYoXCJNYWluIE1lbnVcIiwgXCJBcmlhbFwiLCAyMCwgY2Muc2l6ZSgzMDAsIDEwMCkpO1xuICAgICAgICB0aGlzLnRleHRMYWJlbC5zZXROYW1lKFwidGV4dExhYmVsXCIpO1xuICAgICAgICB0aGlzLnRleHRIb2xkZXIuYWRkQ2hpbGQodGhpcy50ZXh0TGFiZWwpO1xuICAgICAgICB0aGlzLnRleHRMYWJlbC5zZXRDb2xvcihuZXcgY2MuQ29sb3IoMCwgMCwgMCkpO1xuICAgICAgICAvLyBoaW50IGFycm93XG4gICAgICAgIHRoaXMuaGludEFycm93ID0gRmlyZS5lbmdpbmUuZ2V0Q3VycmVudFNjZW5lTigpLmdldENoaWxkQnlOYW1lKFwiYXJyb3dcIik7XG4gICAgICAgIC8vIHJlY2VwdGlvbmlzdFxuICAgICAgICB0aGlzLnJlY2VwdGlvbiA9IEZpcmUuZW5naW5lLmdldEN1cnJlbnRTY2VuZU4oKS5nZXRDaGlsZEJ5TmFtZShcImZpZ3VyZTFcIik7XG4gICAgICAgIC8vIHJlZ2lzdGVyIGlucHV0XG4gICAgICAgIGNjLmV2ZW50TWFuYWdlci5hZGRMaXN0ZW5lcih7XG4gICAgICAgICAgICBldmVudDogY2MuRXZlbnRMaXN0ZW5lci5UT1VDSF9BTExfQVRfT05DRSxcbiAgICAgICAgICAgIG9uVG91Y2hlc0JlZ2FuOiB0aGlzLm9uVG91Y2hlc0JlZ2FuLmJpbmQodGhpcylcbiAgICAgICAgfSwgdGhpcyk7XG4gICAgICAgIC8vIGJ0blxuICAgICAgICB0aGlzLnJvb21CdG4gPSBGaXJlLmVuZ2luZS5nZXRDdXJyZW50U2NlbmVOKCkuZ2V0Q2hpbGRCeU5hbWUoXCJidG4xXCIpO1xuICAgICAgICB0aGlzLnJvb21CdG4uYWRkVG91Y2hFdmVudExpc3RlbmVyKHRoaXMucm9vbUJ0blRvdWNoZWQsIHRoaXMpO1xuXG4gICAgICAgIHRoaXMuYnVzaW5lc3NCdG4gPSBGaXJlLmVuZ2luZS5nZXRDdXJyZW50U2NlbmVOKCkuZ2V0Q2hpbGRCeU5hbWUoXCJidG4zXCIpO1xuICAgICAgICBpZiAodGhpcy5idXNpbmVzc0J0bikge1xuICAgICAgICAgICAgdGhpcy5idXNpbmVzc0J0bi5hZGRUb3VjaEV2ZW50TGlzdGVuZXIodGhpcy5idXNpbmVzc0J0blRvdWNoZWQsIHRoaXMpO1xuICAgICAgICB9XG4gICAgICAgIC8vIGNvdW50ZXJcbiAgICAgICAgdGhpcy50ZXh0SWR4ID0gMDtcbiAgICAgICAgdGhpcy5hY2NlcHRJbnB1dCA9IGZhbHNlO1xuICAgICAgICB0aGlzLnN0YXJ0U2Vzc2lvbigpO1xuICAgIH0sXG5cbiAgICByb29tQnRuVG91Y2hlZDogZnVuY3Rpb24gcm9vbUJ0blRvdWNoZWQoc2VuZGVyLCB0eXBlKSB7XG4gICAgICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgICAgICAgY2FzZSBjY3VpLldpZGdldC5UT1VDSF9FTkRFRDpcbiAgICAgICAgICAgICAgICB0aGlzLnRvQnVzaW5lc3NSb29tKCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIGJ1c2luZXNzQnRuVG91Y2hlZDogZnVuY3Rpb24gYnVzaW5lc3NCdG5Ub3VjaGVkKHNlbmRlciwgdHlwZSkge1xuICAgICAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgY2N1aS5XaWRnZXQuVE9VQ0hfRU5ERUQ6XG4gICAgICAgICAgICAgICAgdGhpcy5kb0J1c2luZXNzKCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIG9uVG91Y2hlc0JlZ2FuOiBmdW5jdGlvbiBvblRvdWNoZXNCZWdhbih0b3VjaGVzLCBldmVudCkge1xuICAgICAgICBpZiAodGhpcy5hY2NlcHRJbnB1dCkge1xuICAgICAgICAgICAgdGhpcy5wcm9jZXNzU2Vzc2lvbigpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIHN0YXJ0U2Vzc2lvbjogZnVuY3Rpb24gc3RhcnRTZXNzaW9uKCkge1xuICAgICAgICB0aGlzLnRleHRJZHgrKztcbiAgICAgICAgdGhpcy5zaG93VGV4dCh0aGlzLnRleHRJZHgpO1xuICAgICAgICBzZXRUaW1lb3V0KChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLmhpbnRCbGluaygpO1xuICAgICAgICAgICAgdGhpcy5hY2NlcHRJbnB1dCA9IHRydWU7XG4gICAgICAgIH0pLmJpbmQodGhpcyksIDEwMDApO1xuICAgIH0sXG5cbiAgICBwcm9jZXNzU2Vzc2lvbjogZnVuY3Rpb24gcHJvY2Vzc1Nlc3Npb24oKSB7XG4gICAgICAgIHRoaXMuaGludFN0b3AoKTtcbiAgICAgICAgaWYgKCsrdGhpcy50ZXh0SWR4IDwgMykge1xuICAgICAgICAgICAgdGhpcy5hY2NlcHRJbnB1dCA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5zaG93VGV4dCh0aGlzLnRleHRJZHgpO1xuICAgICAgICAgICAgc2V0VGltZW91dCgoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHRoaXMuaGludEJsaW5rKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5hY2NlcHRJbnB1dCA9IHRydWU7XG4gICAgICAgICAgICB9KS5iaW5kKHRoaXMpLCAxMDAwKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICB0b0J1c2luZXNzUm9vbTogZnVuY3Rpb24gdG9CdXNpbmVzc1Jvb20oKSB7XG4gICAgICAgIHRoaXMuaGludFN0b3AoKTtcbiAgICAgICAgdGhpcy5hY2NlcHRJbnB1dCA9IGZhbHNlO1xuICAgICAgICB0aGlzLnNob3dGaWd1cmVBY3Rpb24oKTtcbiAgICAgICAgdGhpcy5zaG93VGV4dCgzKTtcbiAgICAgICAgc2V0VGltZW91dCgoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgRmlyZS5sb2codGhpcy50ZXh0NCk7XG4gICAgICAgICAgICBGaXJlLmVuZ2luZS5sb2FkU2NlbmUodGhpcy5uZXh0Um9vbSk7XG4gICAgICAgIH0pLmJpbmQodGhpcyksIDEwMDApO1xuICAgIH0sXG5cbiAgICBkb0J1c2luZXNzOiBmdW5jdGlvbiBkb0J1c2luZXNzKCkge1xuICAgICAgICB0aGlzLmhpbnRTdG9wKCk7XG4gICAgICAgIHRoaXMuc2hvd0ZpZ3VyZUFjdGlvbigpO1xuICAgICAgICB0aGlzLnNob3dUZXh0KDQpO1xuICAgIH0sXG5cbiAgICBzaG93RmlndXJlTm9ybWFsOiBmdW5jdGlvbiBzaG93RmlndXJlTm9ybWFsKCkge1xuICAgICAgICB0aGlzLnJlY2VwdGlvbi5zZXRUZXh0dXJlKHRoaXMuZmlndXJlVGV4MSk7XG4gICAgfSxcblxuICAgIHNob3dGaWd1cmVBY3Rpb246IGZ1bmN0aW9uIHNob3dGaWd1cmVBY3Rpb24oKSB7XG4gICAgICAgIHRoaXMucmVjZXB0aW9uLnNldFRleHR1cmUodGhpcy5maWd1cmVUZXgyKTtcbiAgICB9LFxuXG4gICAgc2hvd1RleHQ6IGZ1bmN0aW9uIHNob3dUZXh0KGlkeCkge1xuICAgICAgICB0aGlzLnRleHRMYWJlbC5zZXRWaXNpYmxlKHRydWUpO1xuICAgICAgICB0aGlzLnRleHRMYWJlbC5zZXRTdHJpbmcodGhpc1sndGV4dCcgKyBpZHhdKTtcbiAgICB9LFxuICAgIGhpZGVUZXh0OiBmdW5jdGlvbiBoaWRlVGV4dCgpIHtcbiAgICAgICAgdGhpcy50ZXh0TGFiZWwuc2V0VmlzaWJsZShmYWxzZSk7XG4gICAgfSxcblxuICAgIGhpbnRCbGluazogZnVuY3Rpb24gaGludEJsaW5rKCkge1xuICAgICAgICB2YXIgYmxpbmtBY3Rpb24gPSBjYy5yZXBlYXRGb3JldmVyKGNjLmJsaW5rKDEsIDEpKTtcbiAgICAgICAgdGhpcy5oaW50QXJyb3cuc2V0VmlzaWJsZSh0cnVlKTtcbiAgICAgICAgdGhpcy5oaW50QXJyb3cucnVuQWN0aW9uKGJsaW5rQWN0aW9uKTtcbiAgICB9LFxuXG4gICAgaGludFN0b3A6IGZ1bmN0aW9uIGhpbnRTdG9wKCkge1xuICAgICAgICB0aGlzLmhpbnRBcnJvdy5zdG9wQWxsQWN0aW9ucygpO1xuICAgICAgICB0aGlzLmhpbnRBcnJvdy5zZXRWaXNpYmxlKGZhbHNlKTtcbiAgICB9XG59KTtcblxuRmlyZS5fUkZwb3AoKTsiXX0=

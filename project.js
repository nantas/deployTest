require=function t(e,i,n){function s(r,h){if(!i[r]){if(!e[r]){var c="function"==typeof require&&require;if(!h&&c)return c(r,!0);if(o)return o(r,!0);var u=new Error("Cannot find module '"+r+"'");throw u.code="MODULE_NOT_FOUND",u}var a=i[r]={exports:{}};e[r][0].call(a.exports,function(t){var i=e[r][1][t];return s(i?i:t)},a,a.exports,t,e,i,n)}return i[r].exports}for(var o="function"==typeof require&&require,r=0;r<n.length;r++)s(n[r]);return s}({DialogMng:[function(t,e,i){Fire._RFpush(e,"ad796ch2mNLp43ZKnKojj64","DialogMng");Fire.Class({"extends":Fire.Behavior,properties:{nextRoom:"",figureTex1:{"default":"",url:Fire.Texture},figureTex2:{"default":"",url:Fire.Texture},text1:"欢迎光临，我将为您提供支持与服务",text2:"点击右上角按钮选择业务房间",text3:"带您进入业务房间",text4:"前往业务房间"},onLoad:function(){var t=new cc.ResolutionPolicy(cc.ContainerStrategy.PROPORTION_TO_FRAME,cc.ContentStrategy.SHOW_ALL);cc.view.setDesignResolutionSize(720,480,t),this.textHolder=Fire.engine.getCurrentSceneN().getChildByName("textHolder"),this.textLabel=new cc.LabelTTF("Main Menu","Arial",20,cc.size(300,100)),this.textLabel.setName("textLabel"),this.textHolder.addChild(this.textLabel),this.textLabel.setColor(new cc.Color(0,0,0)),this.hintArrow=Fire.engine.getCurrentSceneN().getChildByName("arrow"),this.reception=Fire.engine.getCurrentSceneN().getChildByName("figure1"),cc.eventManager.addListener({event:cc.EventListener.TOUCH_ALL_AT_ONCE,onTouchesBegan:this.onTouchesBegan.bind(this)},this),this.roomBtn=Fire.engine.getCurrentSceneN().getChildByName("btn1"),this.roomBtn.addTouchEventListener(this.roomBtnTouched,this),this.businessBtn=Fire.engine.getCurrentSceneN().getChildByName("btn3"),this.businessBtn&&this.businessBtn.addTouchEventListener(this.businessBtnTouched,this),this.textIdx=0,this.acceptInput=!1,this.startSession()},roomBtnTouched:function(t,e){switch(e){case ccui.Widget.TOUCH_ENDED:this.toBusinessRoom()}},businessBtnTouched:function(t,e){switch(e){case ccui.Widget.TOUCH_ENDED:this.doBusiness()}},onTouchesBegan:function(t,e){this.acceptInput&&this.processSession()},startSession:function(){this.textIdx++,this.showText(this.textIdx),setTimeout(function(){this.hintBlink(),this.acceptInput=!0}.bind(this),1e3)},processSession:function(){this.hintStop(),++this.textIdx<3&&(this.acceptInput=!1,this.showText(this.textIdx),setTimeout(function(){this.hintBlink(),this.acceptInput=!0}.bind(this),1e3))},toBusinessRoom:function(){this.hintStop(),this.acceptInput=!1,this.showFigureAction(),this.showText(3),setTimeout(function(){Fire.log(this.text4),Fire.engine.loadScene(this.nextRoom)}.bind(this),1e3)},doBusiness:function(){this.hintStop(),this.showFigureAction(),this.showText(4)},showFigureNormal:function(){this.reception.setTexture(this.figureTex1)},showFigureAction:function(){this.reception.setTexture(this.figureTex2)},showText:function(t){this.textLabel.setVisible(!0),this.textLabel.setString(this["text"+t])},hideText:function(){this.textLabel.setVisible(!1)},hintBlink:function(){var t=cc.repeatForever(cc.blink(1,1));this.hintArrow.setVisible(!0),this.hintArrow.runAction(t)},hintStop:function(){this.hintArrow.stopAllActions(),this.hintArrow.setVisible(!1)}});Fire._RFpop()},{}]},{},["DialogMng"]);
//# sourceMappingURL=project.js.map
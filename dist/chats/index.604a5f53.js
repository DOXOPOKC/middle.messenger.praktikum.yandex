!function(){function e(e,t,n,r){Object.defineProperty(e,t,{get:n,set:r,enumerable:!0,configurable:!0})}function t(e){return e&&e.__esModule?e.default:e}var n="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},r={},a={},o=n.parcelRequireab20;null==o&&((o=function(e){if(e in r)return r[e].exports;if(e in a){let t=a[e];delete a[e];let n={id:e,exports:{}};return r[e]=n,t.call(n.exports,n,n.exports),n.exports}var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}).register=function(e,t){a[e]=t},n.parcelRequireab20=o),o.register("7i6zE",(function(t,n){var r,a;e(t.exports,"register",(()=>a),(e=>a=e)),e(t.exports,"resolve",(()=>r),(e=>r=e));var o={};a=function(e){for(var t=Object.keys(e),n=0;n<t.length;n++)o[t[n]]=e[t[n]]},r=function(e){var t=o[e];if(null==t)throw new Error("Could not resolve bundle with id "+e);return t}})),o("7i6zE").register(JSON.parse('{"2rF1Q":"chats\\\\index.604a5f53.js","cMdIB":"message-camera.f0e832a5.png","8kcPO":"chatuseravatar.8fe169c6.png","5NYLm":"message-done.0b167469.svg","8rH8i":"arrow-left.40010664.svg","lV8S1":"vertical-dots.8e078e67.svg","37ePj":"attach.e08a1ff0.svg","cxHOv":"append.489e70c5.svg","gnb77":"delete.35a147c1.svg","9lzr5":"chats\\\\index.b1f5ca52.js"}'));var s,c=o("hEJ3L"),i=o("jkMww"),l=o("c1Jui");o.register("9o3MQ",(function(t,n){var r;e(t.exports,"getBundleURL",(()=>r),(e=>r=e));var a=null;function o(e){return(""+e).replace(/^((?:https?|file|ftp):\/\/.+)\/[^/]+$/,"$1")+"/"}r=function(){return a||(a=function(){try{throw new Error}catch(t){var e=(""+t.stack).match(/(https?|file|ftp):\/\/[^)\n]+/g);if(e)return o(e[0])}return"/"}()),a}})),o.register("bVQvX",(function(e,t){"use strict";var n=o("7i6zE").resolve;function r(e){if(""===e)return".";var t="/"===e[e.length-1]?e.slice(0,e.length-1):e,n=t.lastIndexOf("/");return-1===n?".":t.slice(0,n)}function a(e,t){if(e===t)return"";var n=e.split("/");"."===n[0]&&n.shift();var r,a,o=t.split("/");for("."===o[0]&&o.shift(),r=0;(r<o.length||r<n.length)&&null==a;r++)n[r]!==o[r]&&(a=r);var s=[];for(r=0;r<n.length-a;r++)s.push("..");return o.length>a&&s.push.apply(s,o.slice(a)),s.join("/")}e.exports=function(e,t){return a(r(n(e)),n(t))},e.exports._dirname=r,e.exports._relative=a})),s=o("9o3MQ").getBundleURL()+o("bVQvX")("2rF1Q","cMdIB");var d;d=o("9o3MQ").getBundleURL()+o("bVQvX")("2rF1Q","8kcPO");var _;_=o("9o3MQ").getBundleURL()+o("bVQvX")("2rF1Q","5NYLm");var u;u=o("9o3MQ").getBundleURL()+o("bVQvX")("2rF1Q","8rH8i");const g=`\n!= sidebar\nmain.content_chat\n  .chat\n    .chat__header\n      .chat__user\n        .chat__avatar.avatar\n          img.image(\n            src="${t(d)}",\n            alt="chat user"\n          )\n        span.chat__username Вадим\n      .chat__header-dropdown\n        != topDropdown\n    .chat__content\n      .chat__block\n        .chat__date.text-grey 19 июня\n        ul.chat__messages\n          li.chat__message.chat__message_from\n            .chat__message-content\n              p.chat__message-content-text\n                | Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой.\n                br\n                br\n                | Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так никогда и не попали. Всего их было произведено 25 штук, одну из них недавно продали на аукционе за 45000 евро.\n              .chat__message-info\n                .chat__message-time.overline-1.text-grey 11:56\n          li.chat__message.chat__message_image\n            img.image(\n              src="${t(s)}",\n              alt="Фото камеры в сообщении от Вадима"\n            )\n          li.chat__message.chat__message_to\n            .chat__message-content\n              p.chat__message-content-text.body-2 Круто!\n              .chat__message-info\n                .chat__message-status\n                  img(src="${t(_)}")\n                span.chat__message-time.overline-1.text-link 12:00\n    .chat__controls\n      .chat__attach\n        != bottomDropdown\n      input.chat__input(placeholder="Сообщение")\n      .chat__send-button\n        button.rounded_button\n          img(src="${t(u)}")\n`,p=l.compile(g);var h,f=o("cZ6H9");h=o("9o3MQ").getBundleURL()+o("bVQvX")("2rF1Q","lV8S1");var v;v=o("9o3MQ").getBundleURL()+o("bVQvX")("2rF1Q","37ePj");var b;b=o("9o3MQ").getBundleURL()+o("bVQvX")("2rF1Q","cxHOv");var m;m=o("9o3MQ").getBundleURL()+o("bVQvX")("2rF1Q","gnb77");const w=new f.Dropdown({classNames:"dropdown dropdown_right dropdown_top",id:"controls-dropdown",icon:t(h),actions:[{icon:t(b),text:"qwe"},{icon:t(m),text:"ewq"}]}),x=new f.Dropdown({classNames:"dropdown dropdown_left dropdown_bottom",id:"controls-dropdown",icon:t(v),actions:[{icon:t(b),text:"qwe"},{icon:t(m),text:"ewq"}]}),Q=new f.Sidebar({classNames:"sidebar"});class H extends c.default{constructor(){super("div",{classNames:"chats",sidebar:Q,topDropdown:w,bottomDropdown:x,events:{click:e=>{if(e.preventDefault(),"dropdown__image image"===e.target?.className){const t=e.target.parentNode.nextElementSibling;t.style.display?t.style.display="none"===t.style.display?"block":"none":t.style.display="block"}}}})}render(){return p(this.props)}}const R=new H;i.render(".app",R)}();
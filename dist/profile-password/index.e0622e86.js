!function(){function e(e){return e&&e.__esModule?e.default:e}var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},n={},s={},a=t.parcelRequireab20;null==a&&((a=function(e){if(e in n)return n[e].exports;if(e in s){let t=s[e];delete s[e];let a={id:e,exports:{}};return n[e]=a,t.call(a.exports,a,a.exports),a.exports}var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}).register=function(e,t){s[e]=t},t.parcelRequireab20=a),a("7i6zE").register(JSON.parse('{"9fMmE":"profile-password\\\\index.e0622e86.js","2PVTW":"image.36abf4c8.svg","9lzr5":"chats\\\\index.685176b5.js"}'));var i=a("hEJ3L"),r=a("cZ6H9"),l=a("jkMww"),o=a("c1Jui");const p=`\n!= sidebar\nmain.content\n  .profile\n    .profile__avatar-wrapper.avatar\n      .profile__change-avatar\n        .blur-background\n        span.text-light.avatar__text Поменять аватар\n      .profile__avatar\n        img.image(src="${e(a("9o3MQ").getBundleURL()+a("bVQvX")("9fMmE","2PVTW"))}")\n    .profile__title.title Иван\n    .profile__main\n      != form\n    if (actions)\n      .profile__actions\n        .list\n          ul.list__inner\n            each action in actions\n              li.list__item\n                a.list__text_left(class=action.classes href="#")= action.text\n`,c=o.compile(p),w=new r.Button({classNames:"button body-1 text-light button_profile",text:"Сохранить",attrs:{type:"submit"},settings:{withInternalID:!0}}),d=new r.Sidebar({mini:!0,classNames:"sidebar sidebar_mini"}),f={isRow:!0,classNames:"form",firstBtn:w,fields:[new r.Input({isRow:!0,classNames:"input",name:"old-password",type:"password",label:"Старый пароль",value:"qweqweqwe",classes:[],messages:[],settings:{withInternalID:!0}}),new r.Input({isRow:!0,classNames:"input",name:"new-password",type:"password",label:"Новый пароль",value:"qweqweqweqwe",classes:[],messages:[],settings:{withInternalID:!0}}),new r.Input({isRow:!0,classNames:"input",name:"repeat-password",type:"password",label:"Повторите новый пароль",value:"qweqweqweqwe",classes:[],settings:{withInternalID:!0}})],settings:{withInternalID:!0}},u=new r.Form(f);class _ extends i.default{constructor(){super("div",{classNames:"profile-page",sidebar:d,form:u})}render(){return c(this.props)}}const m=new _;l.render(".app",m)}();
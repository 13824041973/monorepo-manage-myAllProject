(()=>{"use strict";var e,t,r,o={556:(e,t,r)=>{var o=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"app"},[r("router-link",{attrs:{to:"/"}},[e._v("home")]),e._v(" "),r("router-link",{attrs:{to:"/about"}},[e._v("about")]),e._v(" "),r("router-view")],1)};o._withStripped=!0;const n={name:"App"};var a=(0,r(486).A)(n,o,[],!1,null,"2a71a7d0",null);a.options.__file="src/vue-views/App.vue";const i=a.exports;Vue.use(VueRouter);const u=new VueRouter({routes:[{path:"/",component:function(){return r.e(274).then(r.bind(r,501))}},{path:"/about",component:function(){return r.e(450).then(r.bind(r,174))}}]});Vue.config.productionTip=!1,new Vue({router:u,render:function(e){return e(i)}}).$mount("#root")}},n={};function a(e){var t=n[e];if(void 0!==t)return t.exports;var r=n[e]={exports:{}};return o[e](r,r.exports,a),r.exports}a.m=o,e=[],a.O=(t,r,o,n)=>{if(!r){var i=1/0;for(l=0;l<e.length;l++){for(var[r,o,n]=e[l],u=!0,c=0;c<r.length;c++)(!1&n||i>=n)&&Object.keys(a.O).every((e=>a.O[e](r[c])))?r.splice(c--,1):(u=!1,n<i&&(i=n));if(u){e.splice(l--,1);var s=o();void 0!==s&&(t=s)}}return t}n=n||0;for(var l=e.length;l>0&&e[l-1][2]>n;l--)e[l]=e[l-1];e[l]=[r,o,n]},a.d=(e,t)=>{for(var r in t)a.o(t,r)&&!a.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},a.f={},a.e=e=>Promise.all(Object.keys(a.f).reduce(((t,r)=>(a.f[r](e,t),t)),[])),a.u=e=>({274:"Home",450:"About"}[e]+"."+a.h().slice(0,8)+".js"),a.miniCssF=e=>"main."+a.h()+".css",a.h=()=>"71e5836a67680a648c66",a.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),a.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),t={},r="learn-webpack:",a.l=(e,o,n,i)=>{if(t[e])t[e].push(o);else{var u,c;if(void 0!==n)for(var s=document.getElementsByTagName("script"),l=0;l<s.length;l++){var p=s[l];if(p.getAttribute("src")==e||p.getAttribute("data-webpack")==r+n){u=p;break}}u||(c=!0,(u=document.createElement("script")).charset="utf-8",u.timeout=120,a.nc&&u.setAttribute("nonce",a.nc),u.setAttribute("data-webpack",r+n),u.src=e),t[e]=[o];var d=(r,o)=>{u.onerror=u.onload=null,clearTimeout(f);var n=t[e];if(delete t[e],u.parentNode&&u.parentNode.removeChild(u),n&&n.forEach((e=>e(o))),r)return r(o)},f=setTimeout(d.bind(null,void 0,{type:"timeout",target:u}),12e4);u.onerror=d.bind(null,u.onerror),u.onload=d.bind(null,u.onload),c&&document.head.appendChild(u)}},a.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},(()=>{var e;a.g.importScripts&&(e=a.g.location+"");var t=a.g.document;if(!e&&t&&(t.currentScript&&"SCRIPT"===t.currentScript.tagName.toUpperCase()&&(e=t.currentScript.src),!e)){var r=t.getElementsByTagName("script");if(r.length)for(var o=r.length-1;o>-1&&(!e||!/^http(s?):/.test(e));)e=r[o--].src}if(!e)throw new Error("Automatic publicPath is not supported in this browser");e=e.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),a.p=e})(),(()=>{var e={792:0};a.f.j=(t,r)=>{var o=a.o(e,t)?e[t]:void 0;if(0!==o)if(o)r.push(o[2]);else{var n=new Promise(((r,n)=>o=e[t]=[r,n]));r.push(o[2]=n);var i=a.p+a.u(t),u=new Error;a.l(i,(r=>{if(a.o(e,t)&&(0!==(o=e[t])&&(e[t]=void 0),o)){var n=r&&("load"===r.type?"missing":r.type),i=r&&r.target&&r.target.src;u.message="Loading chunk "+t+" failed.\n("+n+": "+i+")",u.name="ChunkLoadError",u.type=n,u.request=i,o[1](u)}}),"chunk-"+t,t)}},a.O.j=t=>0===e[t];var t=(t,r)=>{var o,n,[i,u,c]=r,s=0;if(i.some((t=>0!==e[t]))){for(o in u)a.o(u,o)&&(a.m[o]=u[o]);if(c)var l=c(a)}for(t&&t(r);s<i.length;s++)n=i[s],a.o(e,n)&&e[n]&&e[n][0](),e[n]=0;return a.O(l)},r=self.webpackChunklearn_webpack=self.webpackChunklearn_webpack||[];r.forEach(t.bind(null,0)),r.push=t.bind(null,r.push.bind(r))})();var i=a.O(void 0,[486],(()=>a(556)));i=a.O(i)})();
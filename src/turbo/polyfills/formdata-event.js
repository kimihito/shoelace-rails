(function(){
/*

 Copyright (c) 2020 The Polymer Project Authors. All rights reserved. This
 code may only be used under the BSD style license found at
 http://polymer.github.io/LICENSE.txt The complete set of authors may be
 found at http://polymer.github.io/AUTHORS.txt The complete set of
 contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt Code
 distributed by Google as part of the polymer project is also subject to an
 additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
'use strict';function aa(a){var b=0;return function(){return b<a.length?{done:!1,value:a[b++]}:{done:!0}}}function n(a){var b="undefined"!=typeof Symbol&&Symbol.iterator&&a[Symbol.iterator];return b?b.call(a):{next:aa(a)}}function ba(a){for(var b,c=[];!(b=a.next()).done;)c.push(b.value);return c}var ca="function"==typeof Object.create?Object.create:function(a){function b(){}b.prototype=a;return new b};
function da(a){a=["object"==typeof globalThis&&globalThis,a,"object"==typeof window&&window,"object"==typeof self&&self,"object"==typeof global&&global];for(var b=0;b<a.length;++b){var c=a[b];if(c&&c.Math==Math)return c}throw Error("Cannot find global object");}var ea=da(this),q;
if("function"==typeof Object.setPrototypeOf)q=Object.setPrototypeOf;else{var r;a:{var ha={a:!0},ia={};try{ia.__proto__=ha;r=ia.a;break a}catch(a){}r=!1}q=r?function(a,b){a.__proto__=b;if(a.__proto__!==b)throw new TypeError(a+" is not extensible");return a}:null}var ja=q,ka=window.Document.prototype,la=ka.createElement,ma=ka.createEvent;var t=window.Event,u=t.prototype,na=u.initEvent,oa=null===u||void 0===u?void 0:u.stopImmediatePropagation,pa=null===u||void 0===u?void 0:u.stopPropagation,w=Object.getOwnPropertyDescriptor(u,"defaultPrevented"),x=Object.getOwnPropertyDescriptor(u,"target");Object.getOwnPropertyDescriptor(u,"type");var qa=window.document;var ra=null===x||void 0===x?void 0:x.get,y=void 0!==ra?function(a){return ra.call(a)}:function(a){return a.target},sa=null===w||void 0===w?void 0:w.get,ta=void 0!==sa?function(a){return sa.call(a)}:function(a){return a.defaultPrevented};function ua(a,b,c){Object.setPrototypeOf(a,Object.getPrototypeOf(b));for(var d=n(Object.keys(b)),e=d.next();!e.done;e=d.next())e=e.value,"prototype"!==e&&Object.defineProperty(a,e,Object.getOwnPropertyDescriptor(b,e));a.prototype=c;Object.defineProperty(c,"constructor",{writable:!0,configurable:!0,enumerable:!1,value:c.constructor})};var va=new WeakMap,wa=new WeakMap;function z(a,b){b=void 0===b?{}:b;try{var c=new t(a,b)}catch(e){c=ma.call(qa,"Event");var d=b.bubbles;b=b.cancelable;na.call(c,a,void 0===d?!1:d,void 0===b?!1:b)}Object.setPrototypeOf(c,Object.getPrototypeOf(this));return c}ua(z,t,u);
function xa(){z.prototype.constructor=z;Object.setPrototypeOf(z,Function.prototype);z.prototype.stopImmediatePropagation=function(){wa.set(this,!0);return oa.call(this)};z.prototype.stopPropagation=function(){va.set(this,!0);return pa.call(this)};window.Event=z};var A=window.EventTarget,B=null===A||void 0===A?void 0:A.prototype,ya=null===B||void 0===B?void 0:B.addEventListener,za=null===B||void 0===B?void 0:B.removeEventListener,Aa=null===B||void 0===B?void 0:B.dispatchEvent;var C=window.Node.prototype,E=C.addEventListener,Ba=C.appendChild,Ca=C.dispatchEvent,Da=C.getRootNode,Ea=C.insertBefore,Fa=C.removeChild,Ga=C.removeEventListener,F=Object.getOwnPropertyDescriptor(C,"parentNode");var G=window.Window.prototype,H=G.addEventListener,Ha=G.removeEventListener,Ia=G.dispatchEvent;var Ja=A?ya:function(a,b,c){if(this instanceof Node)return E.call(this,a,b,c);if(this instanceof Window)return H.call(this,a,b,c);throw new TypeError("Unsupported.");},Ka=A?za:function(a,b,c){if(this instanceof Node)return Ga.call(this,a,b,c);if(this instanceof Window)return Ha.call(this,a,b,c);throw new TypeError("Unsupported.");},Ma=A?Aa:function(a){if(this instanceof Node)return Ca.call(this,a);if(this instanceof Window)return Ia.call(this,a);throw new TypeError("Unsupported.");};var Na=null===F||void 0===F?void 0:F.get,I=void 0!==Na?function(a){return Na.call(a)}:function(a){return a.parentNode};function Oa(a){if(void 0!==Da)return Da.call(a,void 0);for(var b=I(a);null!==b;)a=b,b=I(b);return a};var J=window.HTMLInputElement.prototype,K=Object.getOwnPropertyDescriptor(J,"name"),L=Object.getOwnPropertyDescriptor(J,"type"),M=Object.getOwnPropertyDescriptor(J,"value");var N,Pa,Qa,Ra=null!==(N=(null!==L&&void 0!==L?L:{}).set)&&void 0!==N?N:function(a){this.type=a},Sa=null!==(Pa=(null!==K&&void 0!==K?K:{}).set)&&void 0!==Pa?Pa:function(a){this.name=a},Ta=null!==(Qa=(null!==M&&void 0!==M?M:{}).set)&&void 0!==Qa?Qa:function(a){this.value=a};var O=window.Element.prototype,P=O.getAttribute,Ua=O.hasAttribute,Va=O.removeAttribute,Wa=O.setAttribute;var Xa=Object.getOwnPropertyDescriptor(window.HTMLCollection.prototype,"length");var Ya,Za=null!==(Ya=(null!==Xa&&void 0!==Xa?Xa:{}).get)&&void 0!==Ya?Ya:function(){return this.length};var Q=window.HTMLFormElement.prototype,$a=Q.submit,ab=Object.getOwnPropertyDescriptor(Q,"elements");var bb=window.FormData,R=bb.prototype,cb=R.append,db=R.delete,eb=R.set;var fb=new WeakMap;function S(a,b){b=void 0===b?{}:b;a=z.call(this,a,b)||this;b=b.formData;if(!(b instanceof FormData))throw new TypeError("Failed to construct 'FormDataEvent': member formData is not of type FormData.");fb.set(a,b);return a}S.prototype=ca(z.prototype);S.prototype.constructor=S;if(ja)ja(S,z);else for(var T in z)if("prototype"!=T)if(Object.defineProperties){var gb=Object.getOwnPropertyDescriptor(z,T);gb&&Object.defineProperty(S,T,gb)}else S[T]=z[T];
ea.Object.defineProperties(S.prototype,{formData:{configurable:!0,enumerable:!0,get:function(){return fb.get(this)}}});var U=new WeakMap;function V(a){var b=new bb(a);Object.setPrototypeOf(b,Object.getPrototypeOf(this));U.set(b,[]);a instanceof HTMLFormElement&&Ma.call(a,new S("formdata",{bubbles:!0,formData:b}));return b}ua(V,bb,R);
function hb(){V.prototype.constructor=V;V.prototype.append=function(a,b){var c=U.get(this);if("string"!==typeof b)throw Error("Unsupported.");c.push({i:"append",name:a,value:b});return cb.call(this,a,b)};void 0!==db&&(V.prototype["delete"]=function(a){U.get(this).push({i:"delete",name:a});return db.call(this,a)});void 0!==eb&&(V.prototype.set=function(a,b){var c=U.get(this);if("string"!==typeof b)throw Error("Unsupported.");c.push({i:"set",name:a,value:b});return eb.call(this,a,b)});window.FormData=
V};function ib(a){function b(p){for(var h=ab.get.call(a),k=Za.call(h),m=0;m<k;m++){var v=h[m],fa;if(fa=P.call(v,"name")===p)fa=!Ua.call(v,"disabled");if(fa)return v}}function c(p){for(var h=ab.get.call(a),k=Za.call(h),m=0;m<k;m++){var v=h[m];P.call(v,"name")===p&&(f.has(v)||f.set(v,P.call(v,"disabled")),Wa.call(v,"disabled",""))}}function d(p,h,k){var m=la.call(qa,"input",void 0);Ra.call(m,"hidden");Sa.call(m,p);Ta.call(m,h);void 0!==k?(p=I(k),Ea.call(p,m,k)):Ba.call(a,m);g.push(m)}var e=new V(a),g=
[],f=new Map;e=n(U.get(e));for(var l=e.next();!l.done;l=e.next())switch(l=l.value,l.i){case "append":d(l.name,l.value);break;case "delete":c(l.name);break;case "set":var D=l;l=D.name;D=D.value;var La=b(l);void 0===La?d(l,D):(c(l),d(l,D,La));break;default:throw Error("UNREACHABLE");}setTimeout(function(){for(var p=n(g),h=p.next();!h.done;h=p.next()){h=h.value;var k=I(h);k&&Fa.call(k,h)}p=n(f);for(h=p.next();!h.done;h=p.next())k=n(h.value),h=k.next().value,k=k.next().value,P.call(h,"disabled")!==k&&
(null===k?Va.call(h,"disabled"):Wa.call(h,"disabled",k))})};function W(){this.h=[]}W.prototype.push=function(a){for(var b=a.g,c=a.capture,d=n(this.h),e=d.next();!e.done;e=d.next())if(e=e.value,b===e.g&&c===e.capture)return;this.h.push(a)};W.prototype.delete=function(a){var b=a.g;a=a.capture;for(var c=0;c<this.h.length;c++){var d=this.h[c];if(b===d.g&&a===d.capture){this.h.splice(c,1);break}}};
ea.Object.defineProperties(W.prototype,{length:{configurable:!0,enumerable:!0,get:function(){return this.h.length}},l:{configurable:!0,enumerable:!0,get:function(){for(var a=this.h,b=a.length-1;0<=b;b--){var c=a[b];if(c.capture)return c.g}}},j:{configurable:!0,enumerable:!0,get:function(){for(var a=this.h,b=a.length-1;0<=b;b--){var c=a[b];if(!c.capture)return c.g}}}});var X=new WeakMap;function jb(a,b,c){var d;b&&(X.has(a)||X.set(a,new W),c="boolean"===typeof c?c:null!==(d=null===c||void 0===c?void 0:c.capture)&&void 0!==d?d:!1,X.get(a).push({g:b,capture:c}))}function kb(a,b,c){var d;b&&(a=X.get(a),void 0!==a&&(c="boolean"===typeof c?c:null!==(d=null===c||void 0===c?void 0:c.capture)&&void 0!==d?d:!1,a.delete({g:b,capture:c})))};var Y=new WeakMap,lb=new WeakMap,Z=new WeakMap;function mb(a){if(!lb.has(a)){lb.set(a,!0);var b=y(a);if(b instanceof HTMLFormElement){b=Oa(b);var c=nb(function(){});Z.set(a,{target:b,g:c});Ja.call(b,"submit",c);jb(b,c)}}}
function nb(a){return function e(c,d){for(var g=[],f=1;f<arguments.length;++f)g[f-1]=arguments[f];g="function"===typeof a?a.call.apply(a,[this,c].concat(g instanceof Array?g:ba(n(g)))):a.handleEvent.apply(a,[c].concat(g instanceof Array?g:ba(n(g))));f=y(c)instanceof HTMLFormElement;if(wa.has(c)&&f)ob(c);else if(va.has(c)&&f){f=X.get(this);var l=f.j;e!==f.l&&e!==l||ob(c)}else Z.has(c)&&(f=Z.get(c),void 0!==f&&this===f.target&&(f=X.get(this).j,e===f&&ob(c)));return g}}
function ob(a){var b=Z.get(a);if(b){var c=b.target;b=b.g;Ka.call(c,"submit",b);kb(c,b);Z.delete(a)}ta(a)||ib(y(a))};var pb=new WeakMap;function qb(a,b){a.addEventListener=function(c,d,e){if("submit"===c&&null!==d){var g=nb(d);pb.set(d,g);d=g}g=b.call(this,c,d,e);if("formdata"===c){c=d;var f;c&&(e="boolean"===typeof e?e:null!==(f=null===e||void 0===e?void 0:e.capture)&&void 0!==f?f:!1,f=Y.get(this),void 0===f?(f=new W,f.push({g:c,capture:e}),Y.set(this,f),Ja.call(this,"submit",mb,!0)):f.push({g:c,capture:e}))}else"submit"===c&&null!==d&&jb(this,d,e);return g}}
function rb(a,b){a.removeEventListener=function(c,d,e){var g;"submit"===c&&null!==d&&(d=null!==(g=pb.get(d))&&void 0!==g?g:d);g=b.call(this,c,d,e);if("formdata"===c){c=d;var f;c&&(d=Y.get(this),void 0!==d&&(e="boolean"===typeof e?e:null!==(f=null===e||void 0===e?void 0:e.capture)&&void 0!==f?f:!1,d.delete({g:c,capture:e}),0===d.length&&(Y.delete(this),Ka.call(this,"submit",mb,!0))))}else"submit"===c&&null!==d&&kb(this,d,e);return g}};function sb(){Q.submit=function(){ib(this);return $a.call(this)}};void 0===window.FormDataEvent&&(xa(),B&&(qb(B,ya),rb(B,za)),E&&(qb(C,E),rb(C,Ga)),H&&(qb(G,H),rb(G,Ha)),hb(),Object.defineProperty(window,"FormDataEvent",{writable:!0,enumerable:!1,configurable:!0,value:S}),Q&&sb());
}).call(self);

//# sourceMappingURL=formdata-event.min.js.map

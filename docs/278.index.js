"use strict";(self.webpackChunkwasm_canvas=self.webpackChunkwasm_canvas||[]).push([[278],{278:(e,r,n)=>{n.a(e,(async(e,t)=>{try{n.r(r),n.d(r,{parser:()=>a.E});var a=n(932),o=e([a]);a=(o.then?(await o)():o)[0],t()}catch(e){t(e)}}))},932:(e,r,n)=>{n.a(e,(async(t,a)=>{try{n.d(r,{E:()=>b});var o=n(626);e=n.hmd(e);var u=t([o]);o=(u.then?(await u)():u)[0];var c=0,f=null;function s(){return null!==f&&f.buffer===o.memory.buffer||(f=new Uint8Array(o.memory.buffer)),f}var d=new("undefined"==typeof TextEncoder?(0,e.require)("util").TextEncoder:TextEncoder)("utf-8"),i="function"==typeof d.encodeInto?function(e,r){return d.encodeInto(e,r)}:function(e,r){var n=d.encode(e);return r.set(n),{read:e.length,written:n.length}};function v(e,r,n){if(void 0===n){var t=d.encode(e),a=r(t.length);return s().subarray(a,a+t.length).set(t),c=t.length,a}for(var o=e.length,u=r(o),f=s(),l=0;l<o;l++){var _=e.charCodeAt(l);if(_>127)break;f[u+l]=_}if(l!==o){0!==l&&(e=e.slice(l)),u=n(u,o,o=l+3*e.length);var v=s().subarray(u+l,u+o);l+=i(e,v).written}return c=l,u}var l=null;function y(){return null!==l&&l.buffer===o.memory.buffer||(l=new Int32Array(o.memory.buffer)),l}var _=new("undefined"==typeof TextDecoder?(0,e.require)("util").TextDecoder:TextDecoder)("utf-8",{ignoreBOM:!0,fatal:!0});function b(e){try{var r=o.__wbindgen_add_to_stack_pointer(-16),n=v(e,o.__wbindgen_malloc,o.__wbindgen_realloc),t=c;o.parser(r,n,t);var a=y()[r/4+0],u=y()[r/4+1];return f=a,d=u,_.decode(s().subarray(f,f+d))}finally{o.__wbindgen_add_to_stack_pointer(16),o.__wbindgen_free(a,u)}var f,d}_.decode(),a()}catch(w){a(w)}}))},626:(e,r,n)=>{e.exports=n.v(r,e.id,"73e2530ef0e267c71e5c")}}]);
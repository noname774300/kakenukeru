(function(){const O=document.createElement("link").relList;if(O&&O.supports&&O.supports("modulepreload"))return;for(const m of document.querySelectorAll('link[rel="modulepreload"]'))H(m);new MutationObserver(m=>{for(const x of m)if(x.type==="childList")for(const le of x.addedNodes)le.tagName==="LINK"&&le.rel==="modulepreload"&&H(le)}).observe(document,{childList:!0,subtree:!0});function te(m){const x={};return m.integrity&&(x.integrity=m.integrity),m.referrerpolicy&&(x.referrerPolicy=m.referrerpolicy),m.crossorigin==="use-credentials"?x.credentials="include":m.crossorigin==="anonymous"?x.credentials="omit":x.credentials="same-origin",x}function H(m){if(m.ep)return;m.ep=!0;const x=te(m);fetch(m.href,x)}})();(function(){(function(n){function O(t,e=0,l=1){return Math.max(e,Math.min(t,l))}function te(t,e,l){const i=l-e,s=t-e;if(s>=0)return s%i+e;{let r=i+s%i+e;return r>=l&&(r-=i),r}}function H(t,e,l){return e<=t&&t<l}function m(t){return[...Array(t).keys()]}function x(t,e){return m(t).map(l=>e(l))}function le(t,e){let l=[];for(let i=0,s=0;i<t.length;s++)e(t[i],s)?(l.push(t[i]),t.splice(i,1)):i++;return l}function Tt(t){return[...t].reduce((e,[l,i])=>(e[l]=i,e),{})}function Ut(t){return Object.keys(t).map(e=>[e,t[e]])}function Dl(t,e){return String.fromCharCode(t.charCodeAt(0)+e)}function ce(t){return t.x!=null&&t.y!=null}class h{constructor(e,l){this.x=0,this.y=0,this.set(e,l)}set(e=0,l=0){return ce(e)?(this.x=e.x,this.y=e.y,this):(this.x=e,this.y=l,this)}add(e,l){return ce(e)?(this.x+=e.x,this.y+=e.y,this):(this.x+=e,this.y+=l,this)}sub(e,l){return ce(e)?(this.x-=e.x,this.y-=e.y,this):(this.x-=e,this.y-=l,this)}mul(e){return this.x*=e,this.y*=e,this}div(e){return this.x/=e,this.y/=e,this}clamp(e,l,i,s){return this.x=O(this.x,e,l),this.y=O(this.y,i,s),this}wrap(e,l,i,s){return this.x=te(this.x,e,l),this.y=te(this.y,i,s),this}addWithAngle(e,l){return this.x+=Math.cos(e)*l,this.y+=Math.sin(e)*l,this}swapXy(){const e=this.x;return this.x=this.y,this.y=e,this}normalize(){return this.div(this.length),this}rotate(e){if(e===0)return this;const l=this.x;return this.x=l*Math.cos(e)-this.y*Math.sin(e),this.y=l*Math.sin(e)+this.y*Math.cos(e),this}angleTo(e,l){return ce(e)?Math.atan2(e.y-this.y,e.x-this.x):Math.atan2(l-this.y,e-this.x)}distanceTo(e,l){let i,s;return ce(e)?(i=e.x-this.x,s=e.y-this.y):(i=e-this.x,s=l-this.y),Math.sqrt(i*i+s*s)}isInRect(e,l,i,s){return H(this.x,e,e+i)&&H(this.y,l,l+s)}equals(e){return this.x===e.x&&this.y===e.y}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}get length(){return Math.sqrt(this.x*this.x+this.y*this.y)}get angle(){return Math.atan2(this.y,this.x)}}const At=["transparent","white","red","green","yellow","blue","purple","cyan","black","light_red","light_green","light_yellow","light_blue","light_purple","light_cyan","light_black"],Fl="twrgybpclRGYBPCL";let ue;const $l=[15658734,15277667,5025616,16761095,4149685,10233776,240116,6381921];function Bl(t){const[e,l,i]=tt(0,t);if(ue=Tt(At.map((s,r)=>{if(r<1)return[s,{r:0,g:0,b:0,a:0}];if(r<9){const[c,f,p]=tt(r-1,t);return[s,{r:c,g:f,b:p,a:1}]}const[o,a,u]=tt(r-9+1,t);return[s,{r:Math.floor(t?o*.5:e-(e-o)*.5),g:Math.floor(t?a*.5:i-(i-a)*.5),b:Math.floor(t?u*.5:l-(l-u)*.5),a:1}]})),t){const s=ue.blue;ue.white={r:Math.floor(s.r*.15),g:Math.floor(s.g*.15),b:Math.floor(s.b*.15),a:1}}}function tt(t,e){e&&(t===0?t=7:t===7&&(t=0));const l=$l[t];return[(l&16711680)>>16,(l&65280)>>8,l&255]}function ie(t,e=1){const l=ue[t];return Math.floor(l.r*e)<<16|Math.floor(l.g*e)<<8|Math.floor(l.b*e)}function de(t,e=1){const l=ue[t],i=Math.floor(l.r*e),s=Math.floor(l.g*e),r=Math.floor(l.b*e);return l.a<1?`rgba(${i},${s},${r},${l.a})`:`rgb(${i},${s},${r})`}const Ll=`
varying vec2 vTextureCoord;
uniform sampler2D uSampler;
uniform float width;
uniform float height;

float gridValue(vec2 uv, float res) {
  vec2 grid = fract(uv * res);
  return (step(res, grid.x) * step(res, grid.y));
}

void main(void) {
  vec4 color = texture2D(uSampler, vTextureCoord);  
  vec2 grid_uv = vTextureCoord.xy * vec2(width, height);
  float v = gridValue(grid_uv, 0.2);
  gl_FragColor.rgba = color * v;
}
`;function Tl(t,e){return new PIXI.Filter(void 0,Ll,{width:t,height:e})}const E=new h;let C,F,y,b=new h;const Kt=5;document.createElement("img");let w,fe,he=1,lt="black",v,Jt,ne=!1,g,Nt;function Ul(t,e,l,i,s,r,o){E.set(t),g=o,lt=l;const a=`
-webkit-touch-callout: none;
-webkit-tap-highlight-color: ${e};
-webkit-user-select: none;
-moz-user-select: none;
-ms-user-select: none;
user-select: none;
background: ${e};
color: #888;
`,u=`
position: absolute;
left: 50%;
top: 50%;
transform: translate(-50%, -50%);
`,c=`
image-rendering: -moz-crisp-edges;
image-rendering: -webkit-optimize-contrast;
image-rendering: -o-crisp-edges;
image-rendering: pixelated;
`;if(document.body.style.cssText=a,b.set(E),g.isUsingPixi){b.mul(Kt);const p=new PIXI.Application({width:b.x,height:b.y});if(C=p.view,y=new PIXI.Graphics,y.scale.x=y.scale.y=Kt,PIXI.settings.SCALE_MODE=PIXI.SCALE_MODES.NEAREST,p.stage.addChild(y),y.filters=[],g.name==="crt"&&y.filters.push(Nt=new PIXI.filters.CRTFilter({vignettingAlpha:.7})),g.name==="pixel"&&y.filters.push(Tl(b.x,b.y)),g.name==="pixel"||g.name==="shapeDark"){const M=new PIXI.filters.AdvancedBloomFilter({threshold:.1,bloomScale:g.name==="pixel"?1.5:1,brightness:g.name==="pixel"?1.5:1,blur:8});y.filters.push(M)}y.lineStyle(0),C.style.cssText=u}else C=document.createElement("canvas"),C.width=b.x,C.height=b.y,F=C.getContext("2d"),F.imageSmoothingEnabled=!1,C.style.cssText=u+c;document.body.appendChild(C);const f=()=>{const M=innerWidth/innerHeight,j=b.x/b.y,_=M<j,z=_?.95*innerWidth:.95*innerHeight*j,Ze=_?.95*innerWidth/j:.95*innerHeight;C.style.width=`${z}px`,C.style.height=`${Ze}px`};if(window.addEventListener("resize",f),f(),i){w=document.createElement("canvas");let p;s?(w.width=b.x,w.height=b.y,p=r):(b.x<=b.y*2?(w.width=b.y*2,w.height=b.y):(w.width=b.x,w.height=b.x/2),w.width>400&&(he=400/w.width,w.width=400,w.height*=he),p=Math.round(400/w.width)),fe=w.getContext("2d"),fe.fillStyle=e,gcc.setOptions({scale:p,capturingFps:60,isSmoothingEnabled:!1})}}function Ee(){if(g.isUsingPixi){y.clear(),y.beginFill(ie(lt,g.isDarkColor?.15:1)),y.drawRect(0,0,E.x,E.y),y.endFill(),y.beginFill(ie(v)),ne=!0;return}F.fillStyle=de(lt,g.isDarkColor?.15:1),F.fillRect(0,0,E.x,E.y),F.fillStyle=de(v)}function $(t){if(t===v){g.isUsingPixi&&!ne&&Ie(ie(v));return}if(v=t,g.isUsingPixi){ne&&y.endFill(),Ie(ie(v));return}F.fillStyle=de(t)}function Ie(t){De(),y.beginFill(t),ne=!0}function De(){ne&&(y.endFill(),ne=!1)}function Fe(){Jt=v}function $e(){$(Jt)}function ge(t,e,l,i){if(g.isUsingPixi){g.name==="shape"||g.name==="shapeDark"?y.drawRoundedRect(t,e,l,i,2):y.drawRect(t,e,l,i);return}F.fillRect(t,e,l,i)}function Al(t,e,l,i,s){const r=ie(v);Ie(r),y.drawCircle(t,e,s*.5),y.drawCircle(l,i,s*.5),De(),y.lineStyle(s,r),y.moveTo(t,e),y.lineTo(l,i),y.lineStyle(0)}function Kl(){Nt.time+=.2}function Jl(){if(fe.fillRect(0,0,w.width,w.height),he===1)fe.drawImage(C,(w.width-C.width)/2,(w.height-C.height)/2);else{const t=C.width*he,e=C.height*he;fe.drawImage(C,(w.width-t)/2,(w.height-e)/2,t,e)}gcc.capture(w)}const _t=[`
l
l
l

l
`,`
l l
l l



`,`
 l l
lllll
 l l
lllll
 l l
`,`
 lll
l l
 lll
  l l
 lll
`,`
l   l
l  l
  l
 l  l
l   l
`,`
 l
l l
 ll l
l  l
 ll l
`,`
l
l



`,`
 l
l
l
l
 l
`,`
l
 l
 l
 l
l
`,`
  l
l l l
 lll
l l l
  l
`,`
  l
  l
lllll
  l
  l
`,`



 l
l
`,`


lllll


`,`




l
`,`
    l
   l
  l
 l
l
`,`
 lll
l  ll
l l l
ll  l
 lll
`,`
 ll
l l
  l
  l
lllll
`,`
 lll
l   l
  ll
 l
lllll
`,`
 lll
l   l
  ll
l   l
 lll
`,`
  ll
 l l
l  l
lllll
   l
`,`
lllll
l
llll
    l
llll
`,`
 lll
l
llll
l   l
 lll
`,`
lllll
l   l
   l
  l
 l
`,`
 lll
l   l
 lll
l   l
 lll
`,`
 lll
l   l
 llll
    l
 lll
`,`

l

l

`,`

 l

 l
l
`,`
   ll
 ll
l
 ll
   ll
`,`

lllll

lllll

`,`
ll
  ll
    l
  ll
ll
`,`
 lll
l   l
  ll

  l
`,`
 lll
l   l
l lll
l
 lll
`,`
 lll
l   l
lllll
l   l
l   l
`,`
llll
l   l
llll
l   l
llll
`,`
 lll
l   l
l
l   l
 lll
`,`
llll
l   l
l   l
l   l
llll
`,`
lllll
l
llll
l
lllll
`,`
lllll
l
llll
l
l
`,`
 lll
l
l  ll
l   l
 lll
`,`
l   l
l   l
lllll
l   l
l   l
`,`
lllll
  l
  l
  l
lllll
`,`
  lll
   l
   l
l  l
 ll
`,`
l   l
l  l
lll
l  l
l   l
`,`
l
l
l
l
lllll
`,`
l   l
ll ll
l l l
l   l
l   l
`,`
l   l
ll  l
l l l
l  ll
l   l
`,`
 lll
l   l
l   l
l   l
 lll
`,`
llll
l   l
llll
l
l
`,`
 lll
l   l
l   l
l  ll
 llll
`,`
llll
l   l
llll
l   l
l   l
`,`
 llll
l
 lll
    l
llll
`,`
lllll
  l
  l
  l
  l
`,`
l   l
l   l
l   l
l   l
 lll
`,`
l   l
l   l
l   l
 l l
  l
`,`
l   l
l l l
l l l
l l l
 l l
`,`
l   l
 l l
  l
 l l
l   l
`,`
l   l
 l l
  l
  l
  l
`,`
lllll
   l
  l
 l
lllll
`,`
  ll
  l
  l
  l
  ll
`,`
l
 l
  l
   l
    l
`,`
 ll
  l
  l
  l
 ll
`,`
  l
 l l



`,`




lllll
`,`
 l
  l



`,`

 lll
l  l
l  l
 lll
`,`
l
l
lll
l  l
lll
`,`

 lll
l  
l
 lll
`,`
   l
   l
 lll
l  l
 lll
`,`

 ll
l ll
ll
 ll
`,`
  l
 l 
lll
 l
 l
`,`
 ll
l  l
 lll
   l
 ll
`,`
l
l
ll
l l
l l
`,`

l

l
l
`,`
 l

 l
 l
l
`,`
l
l
l l
ll
l l
`,`
ll
 l
 l
 l
lll
`,`

llll
l l l
l l l
l   l
`,`

lll
l  l
l  l
l  l
`,`

 ll
l  l
l  l
 ll
`,`

lll
l  l
lll
l
`,`

 lll
l  l
 lll
   l
`,`

l ll
ll
l
l
`,`

 lll
ll
  ll
lll
`,`

 l
lll
 l
  l
`,`

l  l
l  l
l  l
 lll
`,`

l  l
l  l
 ll
 ll
`,`

l   l
l l l
l l l
 l l
`,`

l  l
 ll
 ll
l  l
`,`

l  l
 ll
 l
l
`,`

llll
  l
 l
llll
`,`
 ll
 l
l
 l
 ll
`,`
l
l
l
l
l
`,`
ll
 l
  l
 l
ll
`,`

 l
l l l
   l

`];let se,Be;function Nl(){se=[],Be=[]}function Ht(){se=se.concat(Be),Be=[]}function Wt(t){let e={isColliding:{rect:{},text:{},char:{}}};return se.forEach(l=>{_l(t,l)&&(e=Object.assign(Object.assign(Object.assign({},e),it(l.collision.isColliding.rect)),{isColliding:{rect:Object.assign(Object.assign({},e.isColliding.rect),l.collision.isColliding.rect),text:Object.assign(Object.assign({},e.isColliding.text),l.collision.isColliding.text),char:Object.assign(Object.assign({},e.isColliding.char),l.collision.isColliding.char)}}))}),e}function _l(t,e){const l=e.pos.x-t.pos.x,i=e.pos.y-t.pos.y;return-e.size.x<l&&l<t.size.x&&-e.size.y<i&&i<t.size.y}function it(t){if(t==null)return{};const e={transparent:"tr",white:"wh",red:"rd",green:"gr",yellow:"yl",blue:"bl",purple:"pr",cyan:"cy",black:"lc"};let l={};return Ut(t).forEach(([i,s])=>{const r=e[i];s&&r!=null&&(l[r]=!0)}),l}function Xt(t,e,l,i){return qt(!1,t,e,l,i)}function Hl(t,e,l,i){return qt(!0,t,e,l,i)}function qt(t,e,l,i,s){if(typeof l=="number"){if(typeof i=="number")return ot(e,l,i,Object.assign({isCharacter:t,isCheckingCollision:!0,color:v},s));throw"invalid params"}else return ot(e,l.x,l.y,Object.assign({isCharacter:t,isCheckingCollision:!0,color:v},i))}const pe=6,me=1,d=pe*me;let Vt,nt,st,rt=!1,J,W,ye,Le;const we={color:"black",backgroundColor:"transparent",rotation:0,mirror:{x:1,y:1},scale:{x:1,y:1},isCharacter:!1,isCheckingCollision:!1};function Wl(){J=document.createElement("canvas"),J.width=J.height=d,W=J.getContext("2d"),ye=document.createElement("canvas"),Le=ye.getContext("2d"),Vt=_t.map((t,e)=>Object.assign(Object.assign({},ct(t)),{hitBox:Te(String.fromCharCode(33+e),!1)})),nt=_t.map((t,e)=>Object.assign(Object.assign({},ct(t)),{hitBox:Te(String.fromCharCode(33+e),!0)})),st={}}function Xl(t,e){const l=e.charCodeAt(0)-33;t.forEach((i,s)=>{nt[l+s]=Object.assign(Object.assign({},ct(i)),{hitBox:Te(String.fromCharCode(33+l+s),!0)})})}function ql(){rt=!0}function ot(t,e,l,i={}){const s=el(i);e-=d/2*s.scale.x,l-=d/2*s.scale.y;const r=Math.floor(e);let o=t,a=r,u=Math.floor(l),c={isColliding:{rect:{},text:{},char:{}}};for(let f=0;f<o.length;f++){const p=o[f];if(p===`
`){a=r,u+=d*s.scale.y;continue}const M=Yt(p,a,u,s);s.isCheckingCollision&&(c={isColliding:{rect:Object.assign(Object.assign({},c.isColliding.rect),M.isColliding.rect),text:Object.assign(Object.assign({},c.isColliding.text),M.isColliding.text),char:Object.assign(Object.assign({},c.isColliding.char),M.isColliding.char)}}),a+=d*s.scale.x}return c}function Yt(t,e,l,i){const s=t.charCodeAt(0);if(s<32||s>126)return{isColliding:{rect:{},text:{},char:{}}};const r=el(i);if(r.backgroundColor!=="transparent"&&(Fe(),$(r.backgroundColor),ge(e,l,d*r.scale.x,d*r.scale.y),$e()),s<=32)return{isColliding:{rect:{},text:{},char:{}}};const o=s-33,a=r.isCharacter?nt[o]:Vt[o],u=te(r.rotation,0,4);if(r.color==="black"&&u===0&&r.mirror.x===1&&r.mirror.y===1&&(!g.isUsingPixi||r.scale.x===1&&r.scale.y===1))return at(a,e,l,r.scale,r.isCheckingCollision,!0);const c=JSON.stringify({c:t,options:r}),f=st[c];if(f!=null)return at(f,e,l,r.scale,r.isCheckingCollision,r.color!=="transparent");let p=!1;g.isUsingPixi&&(r.scale.x!==1||r.scale.y!==1)&&(ye.width=d*r.scale.x,ye.height=d*r.scale.y,Le.imageSmoothingEnabled=!1,Le.scale(r.scale.x,r.scale.y),Qt(Le,u,r,a),p=!0),W.clearRect(0,0,d,d),Qt(W,u,r,a);const M=Te(t,r.isCharacter);let j;if(rt||g.isUsingPixi){const _=document.createElement("img");if(_.src=J.toDataURL(),g.isUsingPixi){const z=document.createElement("img");z.src=(p?ye:J).toDataURL(),j=PIXI.Texture.from(z)}rt&&(st[c]={image:_,texture:j,hitBox:M})}return at({image:J,texture:j,hitBox:M},e,l,r.scale,r.isCheckingCollision,r.color!=="transparent")}function Qt(t,e,l,i){e===0&&l.mirror.x===1&&l.mirror.y===1?t.drawImage(i.image,0,0):(t.save(),t.translate(d/2,d/2),t.rotate(Math.PI/2*e),(l.mirror.x===-1||l.mirror.y===-1)&&t.scale(l.mirror.x,l.mirror.y),t.drawImage(i.image,-d/2,-d/2),t.restore()),l.color!=="black"&&(t.globalCompositeOperation="source-in",t.fillStyle=de(l.color==="transparent"?"black":l.color),t.fillRect(0,0,d,d),t.globalCompositeOperation="source-over")}function at(t,e,l,i,s,r){if(r&&(i.x===1&&i.y===1?Zt(t,e,l):Zt(t,e,l,d*i.x,d*i.y)),!s)return;const o={pos:{x:e+t.hitBox.pos.x*i.x,y:l+t.hitBox.pos.y*i.y},size:{x:t.hitBox.size.x*i.x,y:t.hitBox.size.y*i.y},collision:t.hitBox.collision},a=Wt(o);return r&&se.push(o),a}function Zt(t,e,l,i,s){if(g.isUsingPixi){De(),y.beginTextureFill({texture:t.texture,matrix:new PIXI.Matrix().translate(e,l)}),y.drawRect(e,l,i==null?d:i,s==null?d:s),Ie(ie(v));return}i==null?F.drawImage(t.image,e,l):F.drawImage(t.image,e,l,i,s)}function ct(t,e=!0){W.clearRect(0,0,d,d);let l=t.split(`
`);e&&(l=l.slice(1,l.length-1));let i=0;l.forEach(u=>{i=Math.max(u.length,i)});const s=Math.max(Math.ceil((pe-i)/2),0),r=l.length,o=Math.max(Math.ceil((pe-r)/2),0);l.forEach((u,c)=>{if(!(c+o>=pe))for(let f=0;f<pe-s;f++){const p=u.charAt(f);let M=Fl.indexOf(p);p!==""&&M>=1&&(W.fillStyle=de(At[M]),W.fillRect((f+s)*me,(c+o)*me,me,me))}});const a=document.createElement("img");return a.src=J.toDataURL(),g.isUsingPixi?{image:a,texture:PIXI.Texture.from(a)}:{image:a}}function Te(t,e){const l={pos:new h(d,d),size:new h,collision:{isColliding:{char:{},text:{}}}};e?l.collision.isColliding.char[t]=!0:l.collision.isColliding.text[t]=!0;const i=W.getImageData(0,0,d,d).data;let s=0;for(let r=0;r<d;r++)for(let o=0;o<d;o++)i[s+3]>0&&(o<l.pos.x&&(l.pos.x=o),r<l.pos.y&&(l.pos.y=r)),s+=4;s=0;for(let r=0;r<d;r++)for(let o=0;o<d;o++)i[s+3]>0&&(o>l.pos.x+l.size.x-1&&(l.size.x=o-l.pos.x+1),r>l.pos.y+l.size.y-1&&(l.size.y=r-l.pos.y+1)),s+=4;return l}function el(t){let e=Object.assign(Object.assign({},we),t);return t.scale!=null&&(e.scale=Object.assign(Object.assign({},we.scale),t.scale)),t.mirror!=null&&(e.mirror=Object.assign(Object.assign({},we.mirror),t.mirror)),e}let re=!1,Ue=!1,ut=!1;const tl=["Escape","Digit0","Digit1","Digit2","Digit3","Digit4","Digit5","Digit6","Digit7","Digit8","Digit9","Minus","Equal","Backspace","Tab","KeyQ","KeyW","KeyE","KeyR","KeyT","KeyY","KeyU","KeyI","KeyO","KeyP","BracketLeft","BracketRight","Enter","ControlLeft","KeyA","KeyS","KeyD","KeyF","KeyG","KeyH","KeyJ","KeyK","KeyL","Semicolon","Quote","Backquote","ShiftLeft","Backslash","KeyZ","KeyX","KeyC","KeyV","KeyB","KeyN","KeyM","Comma","Period","Slash","ShiftRight","NumpadMultiply","AltLeft","Space","CapsLock","F1","F2","F3","F4","F5","F6","F7","F8","F9","F10","Pause","ScrollLock","Numpad7","Numpad8","Numpad9","NumpadSubtract","Numpad4","Numpad5","Numpad6","NumpadAdd","Numpad1","Numpad2","Numpad3","Numpad0","NumpadDecimal","IntlBackslash","F11","F12","F13","F14","F15","F16","F17","F18","F19","F20","F21","F22","F23","F24","IntlYen","Undo","Paste","MediaTrackPrevious","Cut","Copy","MediaTrackNext","NumpadEnter","ControlRight","LaunchMail","AudioVolumeMute","MediaPlayPause","MediaStop","Eject","AudioVolumeDown","AudioVolumeUp","BrowserHome","NumpadDivide","PrintScreen","AltRight","Help","NumLock","Pause","Home","ArrowUp","PageUp","ArrowLeft","ArrowRight","End","ArrowDown","PageDown","Insert","Delete","OSLeft","OSRight","ContextMenu","BrowserSearch","BrowserFavorites","BrowserRefresh","BrowserStop","BrowserForward","BrowserBack"];let dt;const Vl={onKeyDown:void 0};let ft,ht=!1,gt=!1,pt=!1,mt={},yt={},wt={};function ll(t){ft=Object.assign(Object.assign({},Vl),t),dt=Tt(tl.map(e=>[e,{isPressed:!1,isJustPressed:!1,isJustReleased:!1}])),document.addEventListener("keydown",e=>{ht=gt=!0,mt[e.code]=yt[e.code]=!0,ft.onKeyDown!=null&&ft.onKeyDown(),(e.code==="AltLeft"||e.code==="AltRight"||e.code==="ArrowRight"||e.code==="ArrowDown"||e.code==="ArrowLeft"||e.code==="ArrowUp")&&e.preventDefault()}),document.addEventListener("keyup",e=>{ht=!1,pt=!0,mt[e.code]=!1,wt[e.code]=!0})}function il(){Ue=!re&&gt,ut=re&&pt,gt=pt=!1,re=ht,Ut(dt).forEach(([t,e])=>{e.isJustPressed=!e.isPressed&&yt[t],e.isJustReleased=e.isPressed&&wt[t],e.isPressed=!!mt[t]}),yt={},wt={}}function nl(){Ue=!1,re=!0}var Yl=Object.freeze({__proto__:null,get isPressed(){return re},get isJustPressed(){return Ue},get isJustReleased(){return ut},codes:tl,get code(){return dt},init:ll,update:il,clearJustPressed:nl});class Ae{constructor(e=null){this.setSeed(e)}get(e=1,l){return l==null&&(l=e,e=0),this.next()/4294967295*(l-e)+e}getInt(e,l){l==null&&(l=e,e=0);const i=Math.floor(e),s=Math.floor(l);return s===i?i:this.next()%(s-i)+i}getPlusOrMinus(){return this.getInt(2)*2-1}select(e){return e[this.getInt(e.length)]}setSeed(e,l=123456789,i=362436069,s=521288629,r=32){this.w=e!=null?e>>>0:Math.floor(Math.random()*4294967295)>>>0,this.x=l>>>0,this.y=i>>>0,this.z=s>>>0;for(let o=0;o<r;o++)this.next();return this}getState(){return{x:this.x,y:this.y,z:this.z,w:this.w}}next(){const e=this.x^this.x<<11;return this.x=this.y,this.y=this.z,this.z=this.w,this.w=(this.w^this.w>>>19^(e^e>>>8))>>>0,this.w}}const be=new h;let B=!1,oe=!1,Ce=!1,Ql={isDebugMode:!1,anchor:new h,padding:new h,onPointerDownOrUp:void 0},P,R,S;const Se=new Ae,X=new h,L=new h;let Me=!1,ve=new h,bt=!1,Ct=!1,St=!1;function sl(t,e,l){S=Object.assign(Object.assign({},Ql),l),P=t,R=new h(e.x+S.padding.x*2,e.y+S.padding.y*2),ve.set(P.offsetLeft+P.clientWidth*(.5-S.anchor.x),P.offsetTop+P.clientWidth*(.5-S.anchor.y)),S.isDebugMode&&X.set(P.offsetLeft+P.clientWidth*(.5-S.anchor.x),P.offsetTop+P.clientWidth*(.5-S.anchor.y)),document.addEventListener("mousedown",i=>{al(i.pageX,i.pageY)}),document.addEventListener("touchstart",i=>{al(i.touches[0].pageX,i.touches[0].pageY)}),document.addEventListener("mousemove",i=>{cl(i.pageX,i.pageY)}),document.addEventListener("touchmove",i=>{i.preventDefault(),cl(i.touches[0].pageX,i.touches[0].pageY)},{passive:!1}),document.addEventListener("mouseup",i=>{ul()}),document.addEventListener("touchend",i=>{i.preventDefault(),i.target.click(),ul()},{passive:!1})}function rl(){Zl(ve.x,ve.y,be),S.isDebugMode&&!be.isInRect(0,0,R.x,R.y)?(ei(),be.set(X),oe=!B&&Me,Ce=B&&!Me,B=Me):(oe=!B&&Ct,Ce=B&&St,B=bt),Ct=St=!1}function ol(){oe=!1,B=!0}function Zl(t,e,l){P!=null&&(l.x=Math.round(((t-P.offsetLeft)/P.clientWidth+S.anchor.x)*R.x-S.padding.x),l.y=Math.round(((e-P.offsetTop)/P.clientHeight+S.anchor.y)*R.y-S.padding.y))}function ei(){L.length>0?(X.add(L),!H(X.x,-R.x*.1,R.x*1.1)&&X.x*L.x>0&&(L.x*=-1),!H(X.y,-R.y*.1,R.y*1.1)&&X.y*L.y>0&&(L.y*=-1),Se.get()<.05&&L.set(0)):Se.get()<.1&&(L.set(0),L.addWithAngle(Se.get(Math.PI*2),(R.x+R.y)*Se.get(.01,.03))),Se.get()<.05&&(Me=!Me)}function al(t,e){ve.set(t,e),bt=Ct=!0,S.onPointerDownOrUp!=null&&S.onPointerDownOrUp()}function cl(t,e){ve.set(t,e)}function ul(t){bt=!1,St=!0,S.onPointerDownOrUp!=null&&S.onPointerDownOrUp()}var ti=Object.freeze({__proto__:null,pos:be,get isPressed(){return B},get isJustPressed(){return oe},get isJustReleased(){return Ce},init:sl,update:rl,clearJustPressed:ol});let T=new h,U=!1,I=!1,N=!1;function dl(t){ll({onKeyDown:t}),sl(C,E,{onPointerDownOrUp:t,anchor:new h(.5,.5)})}function fl(){il(),rl(),T=be,U=re||B,I=Ue||oe,N=ut||Ce}function hl(){nl(),ol()}function xe(t){T.set(t.pos),U=t.isPressed,I=t.isJustPressed,N=t.isJustReleased}var li=Object.freeze({__proto__:null,get pos(){return T},get isPressed(){return U},get isJustPressed(){return I},get isJustReleased(){return N},init:dl,update:fl,clearJustPressed:hl,set:xe});let gl,pl;const ml=68,Mt=1e3/ml;let Pe=0;const ii={viewSize:{x:126,y:126},bodyBackground:"#111",viewBackground:"black",isUsingVirtualPad:!0,isFourWaysStick:!1,isCapturing:!1,isCapturingGameCanvasOnly:!1,isSoundEnabled:!0,captureCanvasScale:1,theme:{name:"simple",isUsingPixi:!1,isDarkColor:!1}};let G,yl=10;function ni(t,e,l){gl=t,pl=e,G=Object.assign(Object.assign({},ii),l),Bl(G.theme.isDarkColor),Ul(G.viewSize,G.bodyBackground,G.viewBackground,G.isCapturing,G.isCapturingGameCanvasOnly,G.captureCanvasScale,G.theme),dl(G.isSoundEnabled?sss.startAudio:()=>{}),Wl(),gl(),wl()}function wl(){requestAnimationFrame(wl);const t=window.performance.now();t<Pe-ml/12||(Pe+=Mt,(Pe<t||Pe>t+Mt*2)&&(Pe=t+Mt),G.isSoundEnabled&&sss.update(),fl(),pl(),G.isCapturing&&Jl(),yl--,yl===0&&ql())}class si{constructor(e){this.size=new h,this.size.set(e),this.letterGrid=m(this.size.x).map(()=>m(this.size.y).map(()=>{})),this.colorGrid=m(this.size.x).map(()=>m(this.size.y).map(()=>{})),this.backgroundColorGrid=m(this.size.x).map(()=>m(this.size.y).map(()=>{})),this.rotationGrid=m(this.size.x).map(()=>m(this.size.y).map(()=>{})),this.characterGrid=m(this.size.x).map(()=>m(this.size.y).map(()=>{}))}print(e,l,i,s={}){const r=Object.assign(Object.assign({},we),s);let o=Math.floor(l),a=Math.floor(i);const u=o;for(let c=0;c<e.length;c++){const f=e[c];if(f===`
`){o=u,a++;continue}if(o<0||o>=this.size.x||a<0||a>=this.size.y){o++;continue}this.letterGrid[o][a]=f,this.colorGrid[o][a]=r.color,this.backgroundColorGrid[o][a]=r.backgroundColor,this.rotationGrid[o][a]=r.rotation,this.characterGrid[o][a]=r.isCharacter,o++}}getCharAt(e,l){if(e<0||e>=this.size.x||l<0||l>=this.size.y)return;const i=Math.floor(e),s=Math.floor(l),r=this.letterGrid[i][s],o=this.colorGrid[i][s],a=this.backgroundColorGrid[i][s],u=this.rotationGrid[i][s],c=this.characterGrid[i][s];return{char:r,options:{color:o,backgroundColor:a,rotation:u,isCharacter:c}}}setCharAt(e,l,i,s){if(e<0||e>=this.size.x||l<0||l>=this.size.y)return;const r=Object.assign(Object.assign({},we),s),o=Math.floor(e),a=Math.floor(l);this.letterGrid[o][a]=i,this.colorGrid[o][a]=r.color,this.backgroundColorGrid[o][a]=r.backgroundColor,this.rotationGrid[o][a]=r.rotation,this.characterGrid[o][a]=r.isCharacter}draw(){for(let e=0;e<this.size.x;e++)for(let l=0;l<this.size.y;l++){const i=this.letterGrid[e][l];if(i==null)continue;const s=this.colorGrid[e][l],r=this.backgroundColorGrid[e][l],o=this.rotationGrid[e][l],a=this.characterGrid[e][l];Yt(i,e*d,l*d,{color:s,backgroundColor:r,rotation:o,isCharacter:a})}}clear(){for(let e=0;e<this.size.x;e++)for(let l=0;l<this.size.y;l++)this.letterGrid[e][l]=this.colorGrid[e][l]=this.backgroundColorGrid[e][l]=this.rotationGrid[e][l]=this.characterGrid[e][l]=void 0}scrollUp(){for(let l=0;l<this.size.x;l++)for(let i=1;i<this.size.y;i++)this.letterGrid[l][i-1]=this.letterGrid[l][i],this.colorGrid[l][i-1]=this.colorGrid[l][i],this.backgroundColorGrid[l][i-1]=this.backgroundColorGrid[l][i],this.rotationGrid[l][i-1]=this.rotationGrid[l][i],this.characterGrid[l][i-1]=this.characterGrid[l][i];const e=this.size.y-1;for(let l=0;l<this.size.x;l++)this.letterGrid[l][e]=this.colorGrid[l][e]=this.backgroundColorGrid[l][e]=this.rotationGrid[l][e]=this.characterGrid[l][e]=void 0}getState(){return{charGrid:this.letterGrid.map(e=>[].concat(e)),colorGrid:this.colorGrid.map(e=>[].concat(e)),backgroundColorGrid:this.backgroundColorGrid.map(e=>[].concat(e)),rotationGrid:this.rotationGrid.map(e=>[].concat(e)),symbolGrid:this.characterGrid.map(e=>[].concat(e))}}setState(e){this.letterGrid=e.charGrid.map(l=>[].concat(l)),this.colorGrid=e.colorGrid.map(l=>[].concat(l)),this.backgroundColorGrid=e.backgroundColorGrid.map(l=>[].concat(l)),this.rotationGrid=e.rotationGrid.map(l=>[].concat(l)),this.characterGrid=e.symbolGrid.map(l=>[].concat(l))}}let Ke;const Je=new Ae;function vt(){Ke=[]}function bl(t,e=16,l=1,i=0,s=Math.PI*2){if(e<1){if(Je.get()>e)return;e=1}for(let r=0;r<e;r++){const o=i+Je.get(s)-s/2,a={pos:new h(t),vel:new h(l*Je.get(.5,1),0).rotate(o),color:v,ticks:O(Je.get(10,20)*Math.sqrt(Math.abs(l)),10,60)};Ke.push(a)}}function Ne(){Fe(),Ke=Ke.filter(t=>(t.ticks--,t.ticks<0?!1:(t.pos.add(t.vel),t.vel.mul(.98),$(t.color),ge(Math.floor(t.pos.x),Math.floor(t.pos.y),1,1),!0))),$e()}function xt(t,e,l,i){return Cl(!1,t,e,l,i)}function ri(t,e,l,i){return Cl(!0,t,e,l,i)}function oi(t,e,l,i,s=.5,r=.5){typeof t!="number"&&(r=s,s=i,i=l,l=e,e=t.y,t=t.x);const o=new h(l).rotate(s),a=new h(t-o.x*r,e-o.y*r);return Pt(a,o,i)}function ai(t,e,l=3,i=3,s=3){const r=new h,o=new h;if(typeof t=="number")if(typeof e=="number")typeof l=="number"?(r.set(t,e),o.set(l,i)):(r.set(t,e),o.set(l),s=i);else throw"invalid params";else if(typeof e=="number")if(typeof l=="number")r.set(t),o.set(e,l),s=i;else throw"invalid params";else if(typeof l=="number")r.set(t),o.set(e),s=l;else throw"invalid params";return Pt(r,o.sub(r),s)}function ci(t,e,l,i,s,r){let o=new h;typeof t=="number"?o.set(t,e):(o.set(t),r=s,s=i,i=l,l=e),i==null&&(i=3),s==null&&(s=0),r==null&&(r=Math.PI*2);let a,u;if(s>r?(a=r,u=s-r):(a=s,u=r-s),u=O(u,0,Math.PI*2),u<.01)return;const c=O(Math.ceil(u*Math.sqrt(l*.25)),1,36),f=u/c;let p=a,M=new h(l).rotate(p).add(o),j=new h,_=new h,z={isColliding:{rect:{},text:{},char:{}}};for(let Ze=0;Ze<c;Ze++){p+=f,j.set(l).rotate(p).add(o),_.set(j).sub(M);const et=Pt(M,_,i,!0);z=Object.assign(Object.assign(Object.assign({},z),it(et.isColliding.rect)),{isColliding:{rect:Object.assign(Object.assign({},z.isColliding.rect),et.isColliding.rect),text:Object.assign(Object.assign({},z.isColliding.text),et.isColliding.text),char:Object.assign(Object.assign({},z.isColliding.char),et.isColliding.char)}}),M.set(j)}return Ht(),z}function Cl(t,e,l,i,s){if(typeof e=="number"){if(typeof l=="number")return typeof i=="number"?s==null?q(t,e,l,i,i):q(t,e,l,i,s):q(t,e,l,i.x,i.y);throw"invalid params"}else if(typeof l=="number"){if(i==null)return q(t,e.x,e.y,l,l);if(typeof i=="number")return q(t,e.x,e.y,l,i);throw"invalid params"}else return q(t,e.x,e.y,l.x,l.y)}function Pt(t,e,l,i=!1){let s=!0;(g.name==="shape"||g.name==="shapeDark")&&(v!=="transparent"&&Al(t.x,t.y,t.x+e.x,t.y+e.y,l),s=!1);const r=Math.floor(O(l,3,10)),o=Math.abs(e.x),a=Math.abs(e.y),u=O(Math.ceil(o>a?o/r:a/r)+1,3,99);e.div(u-1);let c={isColliding:{rect:{},text:{},char:{}}};for(let f=0;f<u;f++){const p=q(!0,t.x,t.y,l,l,!0,s);c=Object.assign(Object.assign(Object.assign({},c),it(p.isColliding.rect)),{isColliding:{rect:Object.assign(Object.assign({},c.isColliding.rect),p.isColliding.rect),text:Object.assign(Object.assign({},c.isColliding.text),p.isColliding.text),char:Object.assign(Object.assign({},c.isColliding.char),p.isColliding.char)}}),t.add(e)}return i||Ht(),c}function q(t,e,l,i,s,r=!1,o=!0){let a=o;(g.name==="shape"||g.name==="shapeDark")&&a&&v!=="transparent"&&(t?ge(e-i/2,l-s/2,i,s):ge(e,l,i,s),a=!1);let u=t?{x:Math.floor(e-i/2),y:Math.floor(l-s/2)}:{x:Math.floor(e),y:Math.floor(l)};const c={x:Math.trunc(i),y:Math.trunc(s)};if(c.x===0||c.y===0)return{isColliding:{rect:{},text:{},char:{}}};c.x<0&&(u.x+=c.x,c.x*=-1),c.y<0&&(u.y+=c.y,c.y*=-1);const f={pos:u,size:c,collision:{isColliding:{rect:{}}}};f.collision.isColliding.rect[v]=!0;const p=Wt(f);return v!=="transparent"&&((r?Be:se).push(f),a&&ge(u.x,u.y,c.x,c.y)),p}function kt({pos:t,size:e,text:l,isToggle:i=!1,onClick:s=()=>{}}){return{pos:t,size:e,text:l,isToggle:i,onClick:s,isPressed:!1,isSelected:!1,isHovered:!1,toggleGroup:[]}}function Ot(t){const e=new h(T).sub(t.pos);t.isHovered=e.isInRect(0,0,t.size.x,t.size.y),t.isHovered&&oe&&(t.isPressed=!0),t.isPressed&&!t.isHovered&&(t.isPressed=!1),t.isPressed&&Ce&&(t.onClick(),t.isPressed=!1,t.isToggle&&(t.toggleGroup.length===0?t.isSelected=!t.isSelected:(t.toggleGroup.forEach(l=>{l.isSelected=!1}),t.isSelected=!0))),_e(t)}function _e(t){Fe(),$(t.isPressed?"blue":"light_blue"),xt(t.pos.x,t.pos.y,t.size.x,t.size.y),t.isToggle&&!t.isSelected&&($("white"),xt(t.pos.x+1,t.pos.y+1,t.size.x-2,t.size.y-2)),$(t.isHovered?"black":"blue"),Xt(t.text,t.pos.x+3,t.pos.y+3),$e()}let D,ke,V,Gt;function ui(t){D={randomSeed:t,inputs:[]}}function di(t){D.inputs.push(t)}function Sl(){return D!=null}function fi(t){ke=0,t.setSeed(D.randomSeed)}function hi(){ke>=D.inputs.length||(xe(D.inputs[ke]),ke++)}function gi(){V=[]}function pi(t,e,l){V.push({randomState:l.getState(),gameState:cloneDeep(t),baseState:cloneDeep(e)})}function mi(t){const e=V.pop(),l=e.randomState;return t.setSeed(l.w,l.x,l.y,l.z,0),Gt={pos:new h(T),isPressed:U,isJustPressed:I,isJustReleased:N},xe(D.inputs.pop()),e}function yi(t){const e=V[V.length-1],l=e.randomState;return t.setSeed(l.w,l.x,l.y,l.z,0),Gt={pos:new h(T),isPressed:U,isJustPressed:I,isJustReleased:N},xe(D.inputs[D.inputs.length-1]),e}function wi(){xe(Gt)}function bi(){return V.length===0}function Ci(){const t=ke-1;if(!(t>=D.inputs.length))return V[t]}const Si=Math.PI,Mi=Math.abs,vi=Math.sin,xi=Math.cos,Pi=Math.atan2,ki=Math.sqrt,Oi=Math.pow,Gi=Math.floor,Ri=Math.round,ji=Math.ceil;n.ticks=0,n.difficulty=void 0,n.score=0,n.time=void 0,n.isReplaying=!1;function zi(t=1,e){return A.get(t,e)}function Ei(t=2,e){return A.getInt(t,e)}function Ii(t=1,e){return A.get(t,e)*A.getPlusOrMinus()}function Rt(t="GAME OVER"){Qe=t,ae&&(n.time=void 0),Rl()}function Di(t="COMPLETE"){Qe=t,Rl()}function Fi(t,e,l){if(n.isReplaying||(n.score+=t,e==null))return;const i=`${t>=1?"+":""}${Math.floor(t)}`;let s=new h;typeof e=="number"?s.set(e,l):s.set(e),s.x-=i.length*d/2,s.y-=d/2,Ve.push({str:i,pos:s,vy:-2,ticks:30})}function Ml(t){$(t)}function $i(t,e,l,i,s,r){let o=new h;typeof t=="number"?(o.set(t,e),bl(o,l,i,s,r)):(o.set(t),bl(o,e,l,i,s))}function vl(t,e){return new h(t,e)}function xl(t,e){!je&&!ee&&Z&&(e!=null&&typeof sss.playSoundEffect=="function"?sss.playSoundEffect(t,e):sss.play(Ti[t]))}let jt;function zt(){typeof sss.generateMml=="function"?jt=sss.playMml(sss.generateMml()):sss.playBgm()}function Et(){jt!=null&&sss.stopMml(jt),sss.stopBgm()}function Bi(t){if(je){const e=yi(A),l=e.baseState;return n.score=l.score,n.ticks=l.ticks,cloneDeep(e.gameState)}else if(ee){const e=mi(A),l=e.baseState;return n.score=l.score,n.ticks=l.ticks,e.gameState}else{if(n.isReplaying)return Ci().gameState;if(Y==="inGame"){const e={score:n.score,ticks:n.ticks};pi(t,e,A)}}return t}function Li(){ee||(!n.isReplaying&&qe?qi():Rt())}const Ti={coin:"c",laser:"l",explosion:"e",powerUp:"p",hit:"h",jump:"j",select:"s",lucky:"u",random:"r",click:"i",synth:"y",tone:"t"},Pl={isPlayingBgm:!1,isCapturing:!1,isCapturingGameCanvasOnly:!1,captureCanvasScale:1,isShowingScore:!0,isShowingTime:!1,isReplayEnabled:!1,isRewindEnabled:!1,isDrawingParticleFront:!1,isDrawingScoreFront:!1,isMinifying:!1,isSoundEnabled:!0,viewSize:{x:100,y:100},seed:0,theme:"simple"},Ui=new Ae,A=new Ae;let Y,Ai={title:Hi,inGame:_i,gameOver:Wi,rewind:Vi},k,It=0,He,We=!0,Xe=0,Q,Oe,kl,ae,Ge,qe,Re,Dt,Z,K,Ve,je=!1,ee=!1,ze,Ye,Qe,Ft;function Ki(t){const e=window;e.update=t.update,e.title=t.title,e.description=t.description,e.characters=t.characters,e.options=t.options,Ol()}function Ol(){let t;typeof options<"u"&&options!=null?t=Object.assign(Object.assign({},Pl),options):t=Pl;const e={name:t.theme,isUsingPixi:!1,isDarkColor:!1};t.theme!=="simple"&&t.theme!=="dark"&&(e.isUsingPixi=!0),(t.theme==="pixel"||t.theme==="shapeDark"||t.theme==="crt"||t.theme==="dark")&&(e.isDarkColor=!0),Q={viewSize:{x:100,y:100},bodyBackground:e.isDarkColor?"#101010":"#e0e0e0",viewBackground:e.isDarkColor?"blue":"white",theme:e,isSoundEnabled:t.isSoundEnabled},Xe=t.seed,Q.isCapturing=t.isCapturing,Q.isCapturingGameCanvasOnly=t.isCapturingGameCanvasOnly,Q.captureCanvasScale=t.captureCanvasScale,Q.viewSize=t.viewSize,Oe=t.isPlayingBgm,kl=t.isShowingScore&&!t.isShowingTime,ae=t.isShowingTime,Ge=t.isReplayEnabled,qe=t.isRewindEnabled,Re=t.isDrawingParticleFront,Dt=t.isDrawingScoreFront,Z=t.isSoundEnabled,t.isMinifying&&Zi(),ni(Ji,Ni,Q)}function Ji(){typeof description<"u"&&description!=null&&description.trim().length>0&&(We=!1,Xe+=El(description)),typeof title<"u"&&title!=null&&title.trim().length>0&&(We=!1,document.title=title,Xe+=El(title)),typeof characters<"u"&&characters!=null&&Xl(characters,"a"),Z&&sss.init(Xe);const t=Q.viewSize;K={x:Math.floor(t.x/6),y:Math.floor(t.y/6)},k=new si(K),$("black"),We?($t(),n.ticks=0):Gl()}function Ni(){n.df=n.difficulty=n.ticks/3600+1,n.tc=n.ticks;const t=n.score,e=n.time;n.sc=n.score;const l=n.sc;n.inp={p:T,ip:U,ijp:I,ijr:N},Nl(),Ai[Y](),g.isUsingPixi&&(De(),g.name==="crt"&&Kl()),n.ticks++,n.isReplaying?(n.score=t,n.time=e):n.sc!==l&&(n.score=n.sc)}function $t(){Y="inGame",n.ticks=-1,vt();const t=Math.floor(n.score);t>It&&(It=t),ae&&n.time!=null&&(He==null||He>n.time)&&(He=n.time),n.score=0,n.time=0,Ve=[],Oe&&Z&&zt();const e=Ui.getInt(999999999);A.setSeed(e),(Ge||qe)&&(ui(e),gi(),n.isReplaying=!1)}function _i(){k.clear(),Ee(),Re||Ne(),Dt||zl(),(Ge||qe)&&di({pos:vl(T),isPressed:U,isJustPressed:I,isJustReleased:N}),typeof update=="function"&&update(),Re&&Ne(),Dt&&zl(),Bt(),k.draw(),ae&&n.time!=null&&n.time++}function Gl(){Y="title",n.ticks=-1,vt(),k.clear(),Ee(),Sl()&&(fi(A),n.isReplaying=!0)}function Hi(){if(I){$t();return}if(Ee(),Ge&&Sl()&&(hi(),n.inp={p:T,ip:U,ijp:I,ijr:N},Re||Ne(),update(),Re&&Ne()),n.ticks===0&&(Bt(),typeof title<"u"&&title!=null&&k.print(title,Math.floor(K.x-title.length)/2,Math.ceil(K.y*.2))),(n.ticks===30||n.ticks==40)&&typeof description<"u"&&description!=null){let t=0;description.split(`
`).forEach(l=>{l.length>t&&(t=l.length)});const e=Math.floor((K.x-t)/2);description.split(`
`).forEach((l,i)=>{k.print(l,e,Math.floor(K.y/2)+i)})}k.draw()}function Rl(){Y="gameOver",n.isReplaying||hl(),n.ticks=-1,Xi(),Oe&&Z&&Et()}function Wi(){(n.isReplaying||n.ticks>20)&&I?$t():n.ticks===(Ge?120:300)&&!We&&Gl()}function Xi(){n.isReplaying||(k.print(Qe,Math.floor((K.x-Qe.length)/2),Math.floor(K.y/2)),k.draw())}function qi(){Y="rewind",je=!0,ze=kt({pos:{x:E.x-39,y:11},size:{x:36,y:7},text:"Rewind"}),Ye=kt({pos:{x:E.x-39,y:E.y-19},size:{x:36,y:7},text:"GiveUp"}),Oe&&Z&&Et(),g.isUsingPixi&&(_e(ze),_e(Ye))}function Vi(){k.clear(),Ee(),update(),Bt(),wi(),ee?(_e(ze),(bi()||!U)&&Yi()):(Ot(ze),Ot(Ye),ze.isPressed&&(ee=!0,je=!1)),Ye.isPressed?(je=ee=!1,Rt()):k.draw(),ae&&n.time!=null&&n.time++}function Yi(){ee=!1,Y="inGame",vt(),Oe&&Z&&zt()}function Bt(){if(kl){k.print(`${Math.floor(n.score)}`,0,0);const t=`HI ${It}`;k.print(t,K.x-t.length,0)}ae&&(jl(n.time,0,0),jl(He,9,0))}function jl(t,e,l){if(t==null)return;let i=Math.floor(t*100/50);i>=10*60*100&&(i=10*60*100-1);const s=Lt(Math.floor(i/6e3),1)+"'"+Lt(Math.floor(i%6e3/100),2)+'"'+Lt(Math.floor(i%100),2);k.print(s,e,l)}function Lt(t,e){return("0000"+t).slice(-e)}function zl(){Fe(),$("black"),Ve=Ve.filter(t=>(ot(t.str,t.pos.x,t.pos.y),t.pos.y+=t.vy,t.vy*=.9,t.ticks--,t.ticks>0)),$e()}function El(t){let e=0;for(let l=0;l<t.length;l++){const i=t.charCodeAt(l);e=(e<<5)-e+i,e|=0}return e}function Qi(){let t=window.location.search.substring(1);if(t=t.replace(/[^A-Za-z0-9_-]/g,""),t.length===0)return;const e=document.createElement("script");Ft=`${t}/main.js`,e.setAttribute("src",Ft),document.head.appendChild(e)}function Zi(){fetch(Ft).then(t=>t.text()).then(t=>{const e=Terser.minify(t+"update();",{toplevel:!0}).code,l="function(){",i=e.indexOf(l),s="options={",r=e.indexOf(s);let o=e;if(i>=0)o=e.substring(e.indexOf(l)+l.length,e.length-4);else if(r>=0){let a=1,u;for(let c=r+s.length;c<e.length;c++){const f=e.charAt(c);if(f==="{")a++;else if(f==="}"&&(a--,a===0)){u=c+2;break}}a===0&&(o=e.substring(u))}Il.forEach(([a,u])=>{o=o.split(a).join(u)}),console.log(o),console.log(`${o.length} letters`)})}n.inp=void 0;function en(...t){return Ml.apply(this,t)}function tn(...t){return xl.apply(this,t)}function ln(...t){return x.apply(this,t)}function nn(...t){return le.apply(this.args)}n.tc=void 0,n.df=void 0,n.sc=void 0;const sn="transparent",rn="white",on="red",an="green",cn="yellow",un="blue",dn="purple",fn="cyan",hn="black",gn="coin",pn="laser",mn="explosion",yn="powerUp",wn="hit",bn="jump",Cn="select",Sn="lucky";let Il=[["===","=="],["!==","!="],["input.pos","inp.p"],["input.isPressed","inp.ip"],["input.isJustPressed","inp.ijp"],["input.isJustReleased","inp.ijr"],["color(","clr("],["play(","ply("],["times(","tms("],["remove(","rmv("],["ticks","tc"],["difficulty","df"],["score","sc"],[".isColliding.rect.transparent",".tr"],[".isColliding.rect.white",".wh"],[".isColliding.rect.red",".rd"],[".isColliding.rect.green",".gr"],[".isColliding.rect.yellow",".yl"],[".isColliding.rect.blue",".bl"],[".isColliding.rect.purple",".pr"],[".isColliding.rect.cyan",".cy"],[".isColliding.rect.black",".lc"],['"transparent"',"tr"],['"white"',"wh"],['"red"',"rd"],['"green"',"gr"],['"yellow"',"yl"],['"blue"',"bl"],['"purple"',"pr"],['"cyan"',"cy"],['"black"',"lc"],['"coin"',"cn"],['"laser"',"ls"],['"explosion"',"ex"],['"powerUp"',"pw"],['"hit"',"ht"],['"jump"',"jm"],['"select"',"sl"],['"lucky"',"uc"]];n.PI=Si,n.abs=Mi,n.addGameScript=Qi,n.addScore=Fi,n.addWithCharCode=Dl,n.arc=ci,n.atan2=Pi,n.bar=oi,n.bl=un,n.box=ri,n.ceil=ji,n.char=Hl,n.clamp=O,n.clr=en,n.cn=gn,n.color=Ml,n.complete=Di,n.cos=xi,n.cy=fn,n.end=Rt,n.ex=mn,n.floor=Gi,n.frameState=Bi,n.getButton=kt,n.gr=an,n.ht=wn,n.init=Ki,n.input=li,n.jm=bn,n.keyboard=Yl,n.lc=hn,n.line=ai,n.ls=pn,n.minifyReplaces=Il,n.onLoad=Ol,n.particle=$i,n.play=xl,n.playBgm=zt,n.ply=tn,n.pointer=ti,n.pow=Oi,n.pr=dn,n.pw=yn,n.range=m,n.rd=on,n.rect=xt,n.remove=le,n.rewind=Li,n.rmv=nn,n.rnd=zi,n.rndi=Ei,n.rnds=Ii,n.round=Ri,n.sin=vi,n.sl=Cn,n.sqrt=ki,n.stopBgm=Et,n.text=Xt,n.times=x,n.tms=ln,n.tr=sn,n.uc=Sn,n.updateButton=Ot,n.vec=vl,n.wh=rn,n.wrap=te,n.yl=cn,Object.defineProperty(n,"__esModule",{value:!0})})(window||{})})();const Mn="",vn=`
`,xn=[];function Pn(){ticks}init({update:Pn,title:Mn,description:vn,characters:xn,options:{}});

(function(){const v=document.createElement("link").relList;if(v&&v.supports&&v.supports("modulepreload"))return;for(const c of document.querySelectorAll('link[rel="modulepreload"]'))$(c);new MutationObserver(c=>{for(const w of c)if(w.type==="childList")for(const B of w.addedNodes)B.tagName==="LINK"&&B.rel==="modulepreload"&&$(B)}).observe(document,{childList:!0,subtree:!0});function G(c){const w={};return c.integrity&&(w.integrity=c.integrity),c.referrerpolicy&&(w.referrerPolicy=c.referrerpolicy),c.crossorigin==="use-credentials"?w.credentials="include":c.crossorigin==="anonymous"?w.credentials="omit":w.credentials="same-origin",w}function $(c){if(c.ep)return;c.ep=!0;const w=G(c);fetch(c.href,w)}})();(function(){(function(n){function v(t,e=0,l=1){return Math.max(e,Math.min(t,l))}function G(t,e,l){const i=l-e,s=t-e;if(s>=0)return s%i+e;{let r=i+s%i+e;return r>=l&&(r-=i),r}}function $(t,e,l){return e<=t&&t<l}function c(t){return[...Array(t).keys()]}function w(t,e){return c(t).map(l=>e(l))}function B(t,e){let l=[];for(let i=0,s=0;i<t.length;s++)e(t[i],s)?(l.push(t[i]),t.splice(i,1)):i++;return l}function ue(t){return[...t].reduce((e,[l,i])=>(e[l]=i,e),{})}function de(t){return Object.keys(t).map(e=>[e,t[e]])}function Le(t,e){return String.fromCharCode(t.charCodeAt(0)+e)}function fe(t){return t.x!=null&&t.y!=null}class m{constructor(e,l){this.x=0,this.y=0,this.set(e,l)}set(e=0,l=0){return fe(e)?(this.x=e.x,this.y=e.y,this):(this.x=e,this.y=l,this)}add(e,l){return fe(e)?(this.x+=e.x,this.y+=e.y,this):(this.x+=e,this.y+=l,this)}sub(e,l){return fe(e)?(this.x-=e.x,this.y-=e.y,this):(this.x-=e,this.y-=l,this)}mul(e){return this.x*=e,this.y*=e,this}div(e){return this.x/=e,this.y/=e,this}clamp(e,l,i,s){return this.x=v(this.x,e,l),this.y=v(this.y,i,s),this}wrap(e,l,i,s){return this.x=G(this.x,e,l),this.y=G(this.y,i,s),this}addWithAngle(e,l){return this.x+=Math.cos(e)*l,this.y+=Math.sin(e)*l,this}swapXy(){const e=this.x;return this.x=this.y,this.y=e,this}normalize(){return this.div(this.length),this}rotate(e){if(e===0)return this;const l=this.x;return this.x=l*Math.cos(e)-this.y*Math.sin(e),this.y=l*Math.sin(e)+this.y*Math.cos(e),this}angleTo(e,l){return fe(e)?Math.atan2(e.y-this.y,e.x-this.x):Math.atan2(l-this.y,e-this.x)}distanceTo(e,l){let i,s;return fe(e)?(i=e.x-this.x,s=e.y-this.y):(i=e-this.x,s=l-this.y),Math.sqrt(i*i+s*s)}isInRect(e,l,i,s){return $(this.x,e,e+i)&&$(this.y,l,l+s)}equals(e){return this.x===e.x&&this.y===e.y}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}get length(){return Math.sqrt(this.x*this.x+this.y*this.y)}get angle(){return Math.atan2(this.y,this.x)}}const Zt=["transparent","white","red","green","yellow","blue","purple","cyan","black","light_red","light_green","light_yellow","light_blue","light_purple","light_cyan","light_black"],_l="twrgybpclRGYBPCL";let he;const Wl=[15658734,15277667,5025616,16761095,4149685,10233776,240116,6381921];function ql(t){const[e,l,i]=ft(0,t);if(he=ue(Zt.map((s,r)=>{if(r<1)return[s,{r:0,g:0,b:0,a:0}];if(r<9){const[u,g,y]=ft(r-1,t);return[s,{r:u,g,b:y,a:1}]}const[o,a,d]=ft(r-9+1,t);return[s,{r:Math.floor(t?o*.5:e-(e-o)*.5),g:Math.floor(t?a*.5:i-(i-a)*.5),b:Math.floor(t?d*.5:l-(l-d)*.5),a:1}]})),t){const s=he.blue;he.white={r:Math.floor(s.r*.15),g:Math.floor(s.g*.15),b:Math.floor(s.b*.15),a:1}}}function ft(t,e){e&&(t===0?t=7:t===7&&(t=0));const l=Wl[t];return[(l&16711680)>>16,(l&65280)>>8,l&255]}function ne(t,e=1){const l=he[t];return Math.floor(l.r*e)<<16|Math.floor(l.g*e)<<8|Math.floor(l.b*e)}function ge(t,e=1){const l=he[t],i=Math.floor(l.r*e),s=Math.floor(l.g*e),r=Math.floor(l.b*e);return l.a<1?`rgba(${i},${s},${r},${l.a})`:`rgb(${i},${s},${r})`}const Vl=`
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
`;function Ql(t,e){return new PIXI.Filter(void 0,Vl,{width:t,height:e})}const D=new m;let S,L,C,R=new m;const el=5;document.createElement("img");let b,me,pe=1,ht="black",M,tl,se=!1,p,ll;function Zl(t,e,l,i,s,r,o){D.set(t),p=o,ht=l;const a=`
-webkit-touch-callout: none;
-webkit-tap-highlight-color: ${e};
-webkit-user-select: none;
-moz-user-select: none;
-ms-user-select: none;
user-select: none;
background: ${e};
color: #888;
`,d=`
position: absolute;
left: 50%;
top: 50%;
transform: translate(-50%, -50%);
`,u=`
image-rendering: -moz-crisp-edges;
image-rendering: -webkit-optimize-contrast;
image-rendering: -o-crisp-edges;
image-rendering: pixelated;
`;if(document.body.style.cssText=a,R.set(D),p.isUsingPixi){R.mul(el);const y=new PIXI.Application({width:R.x,height:R.y});if(S=y.view,C=new PIXI.Graphics,C.scale.x=C.scale.y=el,PIXI.settings.SCALE_MODE=PIXI.SCALE_MODES.NEAREST,y.stage.addChild(C),C.filters=[],p.name==="crt"&&C.filters.push(ll=new PIXI.filters.CRTFilter({vignettingAlpha:.7})),p.name==="pixel"&&C.filters.push(Ql(R.x,R.y)),p.name==="pixel"||p.name==="shapeDark"){const k=new PIXI.filters.AdvancedBloomFilter({threshold:.1,bloomScale:p.name==="pixel"?1.5:1,brightness:p.name==="pixel"?1.5:1,blur:8});C.filters.push(k)}C.lineStyle(0),S.style.cssText=d}else S=document.createElement("canvas"),S.width=R.x,S.height=R.y,L=S.getContext("2d"),L.imageSmoothingEnabled=!1,S.style.cssText=d+u;document.body.appendChild(S);const g=()=>{const k=innerWidth/innerHeight,j=R.x/R.y,W=k<j,E=W?.95*innerWidth:.95*innerHeight*j,ot=W?.95*innerWidth/j:.95*innerHeight;S.style.width=`${E}px`,S.style.height=`${ot}px`};if(window.addEventListener("resize",g),g(),i){b=document.createElement("canvas");let y;s?(b.width=R.x,b.height=R.y,y=r):(R.x<=R.y*2?(b.width=R.y*2,b.height=R.y):(b.width=R.x,b.height=R.x/2),b.width>400&&(pe=400/b.width,b.width=400,b.height*=pe),y=Math.round(400/b.width)),me=b.getContext("2d"),me.fillStyle=e,gcc.setOptions({scale:y,capturingFps:60,isSmoothingEnabled:!1})}}function Ue(){if(p.isUsingPixi){C.clear(),C.beginFill(ne(ht,p.isDarkColor?.15:1)),C.drawRect(0,0,D.x,D.y),C.endFill(),C.beginFill(ne(M)),se=!0;return}L.fillStyle=ge(ht,p.isDarkColor?.15:1),L.fillRect(0,0,D.x,D.y),L.fillStyle=ge(M)}function U(t){if(t===M){p.isUsingPixi&&!se&&Ke(ne(M));return}if(M=t,p.isUsingPixi){se&&C.endFill(),Ke(ne(M));return}L.fillStyle=ge(t)}function Ke(t){Ye(),C.beginFill(t),se=!0}function Ye(){se&&(C.endFill(),se=!1)}function Ae(){tl=M}function Je(){U(tl)}function ye(t,e,l,i){if(p.isUsingPixi){p.name==="shape"||p.name==="shapeDark"?C.drawRoundedRect(t,e,l,i,2):C.drawRect(t,e,l,i);return}L.fillRect(t,e,l,i)}function ei(t,e,l,i,s){const r=ne(M);Ke(r),C.drawCircle(t,e,s*.5),C.drawCircle(l,i,s*.5),Ye(),C.lineStyle(s,r),C.moveTo(t,e),C.lineTo(l,i),C.lineStyle(0)}function ti(){ll.time+=.2}function li(){if(me.fillRect(0,0,b.width,b.height),pe===1)me.drawImage(S,(b.width-S.width)/2,(b.height-S.height)/2);else{const t=S.width*pe,e=S.height*pe;me.drawImage(S,(b.width-t)/2,(b.height-e)/2,t,e)}gcc.capture(b)}const il=[`
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

`];let re,Ne;function ii(){re=[],Ne=[]}function nl(){re=re.concat(Ne),Ne=[]}function sl(t){let e={isColliding:{rect:{},text:{},char:{}}};return re.forEach(l=>{ni(t,l)&&(e=Object.assign(Object.assign(Object.assign({},e),gt(l.collision.isColliding.rect)),{isColliding:{rect:Object.assign(Object.assign({},e.isColliding.rect),l.collision.isColliding.rect),text:Object.assign(Object.assign({},e.isColliding.text),l.collision.isColliding.text),char:Object.assign(Object.assign({},e.isColliding.char),l.collision.isColliding.char)}}))}),e}function ni(t,e){const l=e.pos.x-t.pos.x,i=e.pos.y-t.pos.y;return-e.size.x<l&&l<t.size.x&&-e.size.y<i&&i<t.size.y}function gt(t){if(t==null)return{};const e={transparent:"tr",white:"wh",red:"rd",green:"gr",yellow:"yl",blue:"bl",purple:"pr",cyan:"cy",black:"lc"};let l={};return de(t).forEach(([i,s])=>{const r=e[i];s&&r!=null&&(l[r]=!0)}),l}function rl(t,e,l,i){return ol(!1,t,e,l,i)}function si(t,e,l,i){return ol(!0,t,e,l,i)}function ol(t,e,l,i,s){if(typeof l=="number"){if(typeof i=="number")return Ct(e,l,i,Object.assign({isCharacter:t,isCheckingCollision:!0,color:M},s));throw"invalid params"}else return Ct(e,l.x,l.y,Object.assign({isCharacter:t,isCheckingCollision:!0,color:M},i))}const Ce=6,we=1,f=Ce*we;let al,mt,pt,yt=!1,X,q,be,He;const Re={color:"black",backgroundColor:"transparent",rotation:0,mirror:{x:1,y:1},scale:{x:1,y:1},isCharacter:!1,isCheckingCollision:!1};function ri(){X=document.createElement("canvas"),X.width=X.height=f,q=X.getContext("2d"),be=document.createElement("canvas"),He=be.getContext("2d"),al=il.map((t,e)=>Object.assign(Object.assign({},bt(t)),{hitBox:Xe(String.fromCharCode(33+e),!1)})),mt=il.map((t,e)=>Object.assign(Object.assign({},bt(t)),{hitBox:Xe(String.fromCharCode(33+e),!0)})),pt={}}function oi(t,e){const l=e.charCodeAt(0)-33;t.forEach((i,s)=>{mt[l+s]=Object.assign(Object.assign({},bt(i)),{hitBox:Xe(String.fromCharCode(33+l+s),!0)})})}function ai(){yt=!0}function Ct(t,e,l,i={}){const s=fl(i);e-=f/2*s.scale.x,l-=f/2*s.scale.y;const r=Math.floor(e);let o=t,a=r,d=Math.floor(l),u={isColliding:{rect:{},text:{},char:{}}};for(let g=0;g<o.length;g++){const y=o[g];if(y===`
`){a=r,d+=f*s.scale.y;continue}const k=cl(y,a,d,s);s.isCheckingCollision&&(u={isColliding:{rect:Object.assign(Object.assign({},u.isColliding.rect),k.isColliding.rect),text:Object.assign(Object.assign({},u.isColliding.text),k.isColliding.text),char:Object.assign(Object.assign({},u.isColliding.char),k.isColliding.char)}}),a+=f*s.scale.x}return u}function cl(t,e,l,i){const s=t.charCodeAt(0);if(s<32||s>126)return{isColliding:{rect:{},text:{},char:{}}};const r=fl(i);if(r.backgroundColor!=="transparent"&&(Ae(),U(r.backgroundColor),ye(e,l,f*r.scale.x,f*r.scale.y),Je()),s<=32)return{isColliding:{rect:{},text:{},char:{}}};const o=s-33,a=r.isCharacter?mt[o]:al[o],d=G(r.rotation,0,4);if(r.color==="black"&&d===0&&r.mirror.x===1&&r.mirror.y===1&&(!p.isUsingPixi||r.scale.x===1&&r.scale.y===1))return wt(a,e,l,r.scale,r.isCheckingCollision,!0);const u=JSON.stringify({c:t,options:r}),g=pt[u];if(g!=null)return wt(g,e,l,r.scale,r.isCheckingCollision,r.color!=="transparent");let y=!1;p.isUsingPixi&&(r.scale.x!==1||r.scale.y!==1)&&(be.width=f*r.scale.x,be.height=f*r.scale.y,He.imageSmoothingEnabled=!1,He.scale(r.scale.x,r.scale.y),ul(He,d,r,a),y=!0),q.clearRect(0,0,f,f),ul(q,d,r,a);const k=Xe(t,r.isCharacter);let j;if(yt||p.isUsingPixi){const W=document.createElement("img");if(W.src=X.toDataURL(),p.isUsingPixi){const E=document.createElement("img");E.src=(y?be:X).toDataURL(),j=PIXI.Texture.from(E)}yt&&(pt[u]={image:W,texture:j,hitBox:k})}return wt({image:X,texture:j,hitBox:k},e,l,r.scale,r.isCheckingCollision,r.color!=="transparent")}function ul(t,e,l,i){e===0&&l.mirror.x===1&&l.mirror.y===1?t.drawImage(i.image,0,0):(t.save(),t.translate(f/2,f/2),t.rotate(Math.PI/2*e),(l.mirror.x===-1||l.mirror.y===-1)&&t.scale(l.mirror.x,l.mirror.y),t.drawImage(i.image,-f/2,-f/2),t.restore()),l.color!=="black"&&(t.globalCompositeOperation="source-in",t.fillStyle=ge(l.color==="transparent"?"black":l.color),t.fillRect(0,0,f,f),t.globalCompositeOperation="source-over")}function wt(t,e,l,i,s,r){if(r&&(i.x===1&&i.y===1?dl(t,e,l):dl(t,e,l,f*i.x,f*i.y)),!s)return;const o={pos:{x:e+t.hitBox.pos.x*i.x,y:l+t.hitBox.pos.y*i.y},size:{x:t.hitBox.size.x*i.x,y:t.hitBox.size.y*i.y},collision:t.hitBox.collision},a=sl(o);return r&&re.push(o),a}function dl(t,e,l,i,s){if(p.isUsingPixi){Ye(),C.beginTextureFill({texture:t.texture,matrix:new PIXI.Matrix().translate(e,l)}),C.drawRect(e,l,i==null?f:i,s==null?f:s),Ke(ne(M));return}i==null?L.drawImage(t.image,e,l):L.drawImage(t.image,e,l,i,s)}function bt(t,e=!0){q.clearRect(0,0,f,f);let l=t.split(`
`);e&&(l=l.slice(1,l.length-1));let i=0;l.forEach(d=>{i=Math.max(d.length,i)});const s=Math.max(Math.ceil((Ce-i)/2),0),r=l.length,o=Math.max(Math.ceil((Ce-r)/2),0);l.forEach((d,u)=>{if(!(u+o>=Ce))for(let g=0;g<Ce-s;g++){const y=d.charAt(g);let k=_l.indexOf(y);y!==""&&k>=1&&(q.fillStyle=ge(Zt[k]),q.fillRect((g+s)*we,(u+o)*we,we,we))}});const a=document.createElement("img");return a.src=X.toDataURL(),p.isUsingPixi?{image:a,texture:PIXI.Texture.from(a)}:{image:a}}function Xe(t,e){const l={pos:new m(f,f),size:new m,collision:{isColliding:{char:{},text:{}}}};e?l.collision.isColliding.char[t]=!0:l.collision.isColliding.text[t]=!0;const i=q.getImageData(0,0,f,f).data;let s=0;for(let r=0;r<f;r++)for(let o=0;o<f;o++)i[s+3]>0&&(o<l.pos.x&&(l.pos.x=o),r<l.pos.y&&(l.pos.y=r)),s+=4;s=0;for(let r=0;r<f;r++)for(let o=0;o<f;o++)i[s+3]>0&&(o>l.pos.x+l.size.x-1&&(l.size.x=o-l.pos.x+1),r>l.pos.y+l.size.y-1&&(l.size.y=r-l.pos.y+1)),s+=4;return l}function fl(t){let e=Object.assign(Object.assign({},Re),t);return t.scale!=null&&(e.scale=Object.assign(Object.assign({},Re.scale),t.scale)),t.mirror!=null&&(e.mirror=Object.assign(Object.assign({},Re.mirror),t.mirror)),e}let oe=!1,_e=!1,Rt=!1;const hl=["Escape","Digit0","Digit1","Digit2","Digit3","Digit4","Digit5","Digit6","Digit7","Digit8","Digit9","Minus","Equal","Backspace","Tab","KeyQ","KeyW","KeyE","KeyR","KeyT","KeyY","KeyU","KeyI","KeyO","KeyP","BracketLeft","BracketRight","Enter","ControlLeft","KeyA","KeyS","KeyD","KeyF","KeyG","KeyH","KeyJ","KeyK","KeyL","Semicolon","Quote","Backquote","ShiftLeft","Backslash","KeyZ","KeyX","KeyC","KeyV","KeyB","KeyN","KeyM","Comma","Period","Slash","ShiftRight","NumpadMultiply","AltLeft","Space","CapsLock","F1","F2","F3","F4","F5","F6","F7","F8","F9","F10","Pause","ScrollLock","Numpad7","Numpad8","Numpad9","NumpadSubtract","Numpad4","Numpad5","Numpad6","NumpadAdd","Numpad1","Numpad2","Numpad3","Numpad0","NumpadDecimal","IntlBackslash","F11","F12","F13","F14","F15","F16","F17","F18","F19","F20","F21","F22","F23","F24","IntlYen","Undo","Paste","MediaTrackPrevious","Cut","Copy","MediaTrackNext","NumpadEnter","ControlRight","LaunchMail","AudioVolumeMute","MediaPlayPause","MediaStop","Eject","AudioVolumeDown","AudioVolumeUp","BrowserHome","NumpadDivide","PrintScreen","AltRight","Help","NumLock","Pause","Home","ArrowUp","PageUp","ArrowLeft","ArrowRight","End","ArrowDown","PageDown","Insert","Delete","OSLeft","OSRight","ContextMenu","BrowserSearch","BrowserFavorites","BrowserRefresh","BrowserStop","BrowserForward","BrowserBack"];let St;const ci={onKeyDown:void 0};let Pt,kt=!1,Mt=!1,vt=!1,xt={},Ot={},Gt={};function gl(t){Pt=Object.assign(Object.assign({},ci),t),St=ue(hl.map(e=>[e,{isPressed:!1,isJustPressed:!1,isJustReleased:!1}])),document.addEventListener("keydown",e=>{kt=Mt=!0,xt[e.code]=Ot[e.code]=!0,Pt.onKeyDown!=null&&Pt.onKeyDown(),(e.code==="AltLeft"||e.code==="AltRight"||e.code==="ArrowRight"||e.code==="ArrowDown"||e.code==="ArrowLeft"||e.code==="ArrowUp")&&e.preventDefault()}),document.addEventListener("keyup",e=>{kt=!1,vt=!0,xt[e.code]=!1,Gt[e.code]=!0})}function ml(){_e=!oe&&Mt,Rt=oe&&vt,Mt=vt=!1,oe=kt,de(St).forEach(([t,e])=>{e.isJustPressed=!e.isPressed&&Ot[t],e.isJustReleased=e.isPressed&&Gt[t],e.isPressed=!!xt[t]}),Ot={},Gt={}}function pl(){_e=!1,oe=!0}var ui=Object.freeze({__proto__:null,get isPressed(){return oe},get isJustPressed(){return _e},get isJustReleased(){return Rt},codes:hl,get code(){return St},init:gl,update:ml,clearJustPressed:pl});class We{constructor(e=null){this.setSeed(e)}get(e=1,l){return l==null&&(l=e,e=0),this.next()/4294967295*(l-e)+e}getInt(e,l){l==null&&(l=e,e=0);const i=Math.floor(e),s=Math.floor(l);return s===i?i:this.next()%(s-i)+i}getPlusOrMinus(){return this.getInt(2)*2-1}select(e){return e[this.getInt(e.length)]}setSeed(e,l=123456789,i=362436069,s=521288629,r=32){this.w=e!=null?e>>>0:Math.floor(Math.random()*4294967295)>>>0,this.x=l>>>0,this.y=i>>>0,this.z=s>>>0;for(let o=0;o<r;o++)this.next();return this}getState(){return{x:this.x,y:this.y,z:this.z,w:this.w}}next(){const e=this.x^this.x<<11;return this.x=this.y,this.y=this.z,this.z=this.w,this.w=(this.w^this.w>>>19^(e^e>>>8))>>>0,this.w}}const Se=new m;let K=!1,ae=!1,Pe=!1,di={isDebugMode:!1,anchor:new m,padding:new m,onPointerDownOrUp:void 0},x,I,P;const ke=new We,V=new m,Y=new m;let Me=!1,ve=new m,zt=!1,It=!1,jt=!1;function yl(t,e,l){P=Object.assign(Object.assign({},di),l),x=t,I=new m(e.x+P.padding.x*2,e.y+P.padding.y*2),ve.set(x.offsetLeft+x.clientWidth*(.5-P.anchor.x),x.offsetTop+x.clientWidth*(.5-P.anchor.y)),P.isDebugMode&&V.set(x.offsetLeft+x.clientWidth*(.5-P.anchor.x),x.offsetTop+x.clientWidth*(.5-P.anchor.y)),document.addEventListener("mousedown",i=>{bl(i.pageX,i.pageY)}),document.addEventListener("touchstart",i=>{bl(i.touches[0].pageX,i.touches[0].pageY)}),document.addEventListener("mousemove",i=>{Rl(i.pageX,i.pageY)}),document.addEventListener("touchmove",i=>{i.preventDefault(),Rl(i.touches[0].pageX,i.touches[0].pageY)},{passive:!1}),document.addEventListener("mouseup",i=>{Sl()}),document.addEventListener("touchend",i=>{i.preventDefault(),i.target.click(),Sl()},{passive:!1})}function Cl(){fi(ve.x,ve.y,Se),P.isDebugMode&&!Se.isInRect(0,0,I.x,I.y)?(hi(),Se.set(V),ae=!K&&Me,Pe=K&&!Me,K=Me):(ae=!K&&It,Pe=K&&jt,K=zt),It=jt=!1}function wl(){ae=!1,K=!0}function fi(t,e,l){x!=null&&(l.x=Math.round(((t-x.offsetLeft)/x.clientWidth+P.anchor.x)*I.x-P.padding.x),l.y=Math.round(((e-x.offsetTop)/x.clientHeight+P.anchor.y)*I.y-P.padding.y))}function hi(){Y.length>0?(V.add(Y),!$(V.x,-I.x*.1,I.x*1.1)&&V.x*Y.x>0&&(Y.x*=-1),!$(V.y,-I.y*.1,I.y*1.1)&&V.y*Y.y>0&&(Y.y*=-1),ke.get()<.05&&Y.set(0)):ke.get()<.1&&(Y.set(0),Y.addWithAngle(ke.get(Math.PI*2),(I.x+I.y)*ke.get(.01,.03))),ke.get()<.05&&(Me=!Me)}function bl(t,e){ve.set(t,e),zt=It=!0,P.onPointerDownOrUp!=null&&P.onPointerDownOrUp()}function Rl(t,e){ve.set(t,e)}function Sl(t){zt=!1,jt=!0,P.onPointerDownOrUp!=null&&P.onPointerDownOrUp()}var gi=Object.freeze({__proto__:null,pos:Se,get isPressed(){return K},get isJustPressed(){return ae},get isJustReleased(){return Pe},init:yl,update:Cl,clearJustPressed:wl});let A=new m,J=!1,F=!1,_=!1;function Pl(t){gl({onKeyDown:t}),yl(S,D,{onPointerDownOrUp:t,anchor:new m(.5,.5)})}function kl(){ml(),Cl(),A=Se,J=oe||K,F=_e||ae,_=Rt||Pe}function Ml(){pl(),wl()}function xe(t){A.set(t.pos),J=t.isPressed,F=t.isJustPressed,_=t.isJustReleased}var mi=Object.freeze({__proto__:null,get pos(){return A},get isPressed(){return J},get isJustPressed(){return F},get isJustReleased(){return _},init:Pl,update:kl,clearJustPressed:Ml,set:xe});let vl,xl;const Ol=68,Et=1e3/Ol;let Oe=0;const pi={viewSize:{x:126,y:126},bodyBackground:"#111",viewBackground:"black",isUsingVirtualPad:!0,isFourWaysStick:!1,isCapturing:!1,isCapturingGameCanvasOnly:!1,isSoundEnabled:!0,captureCanvasScale:1,theme:{name:"simple",isUsingPixi:!1,isDarkColor:!1}};let z,Gl=10;function yi(t,e,l){vl=t,xl=e,z=Object.assign(Object.assign({},pi),l),ql(z.theme.isDarkColor),Zl(z.viewSize,z.bodyBackground,z.viewBackground,z.isCapturing,z.isCapturingGameCanvasOnly,z.captureCanvasScale,z.theme),Pl(z.isSoundEnabled?sss.startAudio:()=>{}),ri(),vl(),zl()}function zl(){requestAnimationFrame(zl);const t=window.performance.now();t<Oe-Ol/12||(Oe+=Et,(Oe<t||Oe>t+Et*2)&&(Oe=t+Et),z.isSoundEnabled&&sss.update(),kl(),xl(),z.isCapturing&&li(),Gl--,Gl===0&&ai())}class Ci{constructor(e){this.size=new m,this.size.set(e),this.letterGrid=c(this.size.x).map(()=>c(this.size.y).map(()=>{})),this.colorGrid=c(this.size.x).map(()=>c(this.size.y).map(()=>{})),this.backgroundColorGrid=c(this.size.x).map(()=>c(this.size.y).map(()=>{})),this.rotationGrid=c(this.size.x).map(()=>c(this.size.y).map(()=>{})),this.characterGrid=c(this.size.x).map(()=>c(this.size.y).map(()=>{}))}print(e,l,i,s={}){const r=Object.assign(Object.assign({},Re),s);let o=Math.floor(l),a=Math.floor(i);const d=o;for(let u=0;u<e.length;u++){const g=e[u];if(g===`
`){o=d,a++;continue}if(o<0||o>=this.size.x||a<0||a>=this.size.y){o++;continue}this.letterGrid[o][a]=g,this.colorGrid[o][a]=r.color,this.backgroundColorGrid[o][a]=r.backgroundColor,this.rotationGrid[o][a]=r.rotation,this.characterGrid[o][a]=r.isCharacter,o++}}getCharAt(e,l){if(e<0||e>=this.size.x||l<0||l>=this.size.y)return;const i=Math.floor(e),s=Math.floor(l),r=this.letterGrid[i][s],o=this.colorGrid[i][s],a=this.backgroundColorGrid[i][s],d=this.rotationGrid[i][s],u=this.characterGrid[i][s];return{char:r,options:{color:o,backgroundColor:a,rotation:d,isCharacter:u}}}setCharAt(e,l,i,s){if(e<0||e>=this.size.x||l<0||l>=this.size.y)return;const r=Object.assign(Object.assign({},Re),s),o=Math.floor(e),a=Math.floor(l);this.letterGrid[o][a]=i,this.colorGrid[o][a]=r.color,this.backgroundColorGrid[o][a]=r.backgroundColor,this.rotationGrid[o][a]=r.rotation,this.characterGrid[o][a]=r.isCharacter}draw(){for(let e=0;e<this.size.x;e++)for(let l=0;l<this.size.y;l++){const i=this.letterGrid[e][l];if(i==null)continue;const s=this.colorGrid[e][l],r=this.backgroundColorGrid[e][l],o=this.rotationGrid[e][l],a=this.characterGrid[e][l];cl(i,e*f,l*f,{color:s,backgroundColor:r,rotation:o,isCharacter:a})}}clear(){for(let e=0;e<this.size.x;e++)for(let l=0;l<this.size.y;l++)this.letterGrid[e][l]=this.colorGrid[e][l]=this.backgroundColorGrid[e][l]=this.rotationGrid[e][l]=this.characterGrid[e][l]=void 0}scrollUp(){for(let l=0;l<this.size.x;l++)for(let i=1;i<this.size.y;i++)this.letterGrid[l][i-1]=this.letterGrid[l][i],this.colorGrid[l][i-1]=this.colorGrid[l][i],this.backgroundColorGrid[l][i-1]=this.backgroundColorGrid[l][i],this.rotationGrid[l][i-1]=this.rotationGrid[l][i],this.characterGrid[l][i-1]=this.characterGrid[l][i];const e=this.size.y-1;for(let l=0;l<this.size.x;l++)this.letterGrid[l][e]=this.colorGrid[l][e]=this.backgroundColorGrid[l][e]=this.rotationGrid[l][e]=this.characterGrid[l][e]=void 0}getState(){return{charGrid:this.letterGrid.map(e=>[].concat(e)),colorGrid:this.colorGrid.map(e=>[].concat(e)),backgroundColorGrid:this.backgroundColorGrid.map(e=>[].concat(e)),rotationGrid:this.rotationGrid.map(e=>[].concat(e)),symbolGrid:this.characterGrid.map(e=>[].concat(e))}}setState(e){this.letterGrid=e.charGrid.map(l=>[].concat(l)),this.colorGrid=e.colorGrid.map(l=>[].concat(l)),this.backgroundColorGrid=e.backgroundColorGrid.map(l=>[].concat(l)),this.rotationGrid=e.rotationGrid.map(l=>[].concat(l)),this.characterGrid=e.symbolGrid.map(l=>[].concat(l))}}let qe;const Ve=new We;function Dt(){qe=[]}function Il(t,e=16,l=1,i=0,s=Math.PI*2){if(e<1){if(Ve.get()>e)return;e=1}for(let r=0;r<e;r++){const o=i+Ve.get(s)-s/2,a={pos:new m(t),vel:new m(l*Ve.get(.5,1),0).rotate(o),color:M,ticks:v(Ve.get(10,20)*Math.sqrt(Math.abs(l)),10,60)};qe.push(a)}}function Qe(){Ae(),qe=qe.filter(t=>(t.ticks--,t.ticks<0?!1:(t.pos.add(t.vel),t.vel.mul(.98),U(t.color),ye(Math.floor(t.pos.x),Math.floor(t.pos.y),1,1),!0))),Je()}function Ft(t,e,l,i){return jl(!1,t,e,l,i)}function wi(t,e,l,i){return jl(!0,t,e,l,i)}function bi(t,e,l,i,s=.5,r=.5){typeof t!="number"&&(r=s,s=i,i=l,l=e,e=t.y,t=t.x);const o=new m(l).rotate(s),a=new m(t-o.x*r,e-o.y*r);return Tt(a,o,i)}function Ri(t,e,l=3,i=3,s=3){const r=new m,o=new m;if(typeof t=="number")if(typeof e=="number")typeof l=="number"?(r.set(t,e),o.set(l,i)):(r.set(t,e),o.set(l),s=i);else throw"invalid params";else if(typeof e=="number")if(typeof l=="number")r.set(t),o.set(e,l),s=i;else throw"invalid params";else if(typeof l=="number")r.set(t),o.set(e),s=l;else throw"invalid params";return Tt(r,o.sub(r),s)}function Si(t,e,l,i,s,r){let o=new m;typeof t=="number"?o.set(t,e):(o.set(t),r=s,s=i,i=l,l=e),i==null&&(i=3),s==null&&(s=0),r==null&&(r=Math.PI*2);let a,d;if(s>r?(a=r,d=s-r):(a=s,d=r-s),d=v(d,0,Math.PI*2),d<.01)return;const u=v(Math.ceil(d*Math.sqrt(l*.25)),1,36),g=d/u;let y=a,k=new m(l).rotate(y).add(o),j=new m,W=new m,E={isColliding:{rect:{},text:{},char:{}}};for(let ot=0;ot<u;ot++){y+=g,j.set(l).rotate(y).add(o),W.set(j).sub(k);const at=Tt(k,W,i,!0);E=Object.assign(Object.assign(Object.assign({},E),gt(at.isColliding.rect)),{isColliding:{rect:Object.assign(Object.assign({},E.isColliding.rect),at.isColliding.rect),text:Object.assign(Object.assign({},E.isColliding.text),at.isColliding.text),char:Object.assign(Object.assign({},E.isColliding.char),at.isColliding.char)}}),k.set(j)}return nl(),E}function jl(t,e,l,i,s){if(typeof e=="number"){if(typeof l=="number")return typeof i=="number"?s==null?Q(t,e,l,i,i):Q(t,e,l,i,s):Q(t,e,l,i.x,i.y);throw"invalid params"}else if(typeof l=="number"){if(i==null)return Q(t,e.x,e.y,l,l);if(typeof i=="number")return Q(t,e.x,e.y,l,i);throw"invalid params"}else return Q(t,e.x,e.y,l.x,l.y)}function Tt(t,e,l,i=!1){let s=!0;(p.name==="shape"||p.name==="shapeDark")&&(M!=="transparent"&&ei(t.x,t.y,t.x+e.x,t.y+e.y,l),s=!1);const r=Math.floor(v(l,3,10)),o=Math.abs(e.x),a=Math.abs(e.y),d=v(Math.ceil(o>a?o/r:a/r)+1,3,99);e.div(d-1);let u={isColliding:{rect:{},text:{},char:{}}};for(let g=0;g<d;g++){const y=Q(!0,t.x,t.y,l,l,!0,s);u=Object.assign(Object.assign(Object.assign({},u),gt(y.isColliding.rect)),{isColliding:{rect:Object.assign(Object.assign({},u.isColliding.rect),y.isColliding.rect),text:Object.assign(Object.assign({},u.isColliding.text),y.isColliding.text),char:Object.assign(Object.assign({},u.isColliding.char),y.isColliding.char)}}),t.add(e)}return i||nl(),u}function Q(t,e,l,i,s,r=!1,o=!0){let a=o;(p.name==="shape"||p.name==="shapeDark")&&a&&M!=="transparent"&&(t?ye(e-i/2,l-s/2,i,s):ye(e,l,i,s),a=!1);let d=t?{x:Math.floor(e-i/2),y:Math.floor(l-s/2)}:{x:Math.floor(e),y:Math.floor(l)};const u={x:Math.trunc(i),y:Math.trunc(s)};if(u.x===0||u.y===0)return{isColliding:{rect:{},text:{},char:{}}};u.x<0&&(d.x+=u.x,u.x*=-1),u.y<0&&(d.y+=u.y,u.y*=-1);const g={pos:d,size:u,collision:{isColliding:{rect:{}}}};g.collision.isColliding.rect[M]=!0;const y=sl(g);return M!=="transparent"&&((r?Ne:re).push(g),a&&ye(d.x,d.y,u.x,u.y)),y}function $t({pos:t,size:e,text:l,isToggle:i=!1,onClick:s=()=>{}}){return{pos:t,size:e,text:l,isToggle:i,onClick:s,isPressed:!1,isSelected:!1,isHovered:!1,toggleGroup:[]}}function Bt(t){const e=new m(A).sub(t.pos);t.isHovered=e.isInRect(0,0,t.size.x,t.size.y),t.isHovered&&ae&&(t.isPressed=!0),t.isPressed&&!t.isHovered&&(t.isPressed=!1),t.isPressed&&Pe&&(t.onClick(),t.isPressed=!1,t.isToggle&&(t.toggleGroup.length===0?t.isSelected=!t.isSelected:(t.toggleGroup.forEach(l=>{l.isSelected=!1}),t.isSelected=!0))),Ze(t)}function Ze(t){Ae(),U(t.isPressed?"blue":"light_blue"),Ft(t.pos.x,t.pos.y,t.size.x,t.size.y),t.isToggle&&!t.isSelected&&(U("white"),Ft(t.pos.x+1,t.pos.y+1,t.size.x-2,t.size.y-2)),U(t.isHovered?"black":"blue"),rl(t.text,t.pos.x+3,t.pos.y+3),Je()}let T,Ge,Z,Lt;function Pi(t){T={randomSeed:t,inputs:[]}}function ki(t){T.inputs.push(t)}function El(){return T!=null}function Mi(t){Ge=0,t.setSeed(T.randomSeed)}function vi(){Ge>=T.inputs.length||(xe(T.inputs[Ge]),Ge++)}function xi(){Z=[]}function Oi(t,e,l){Z.push({randomState:l.getState(),gameState:cloneDeep(t),baseState:cloneDeep(e)})}function Gi(t){const e=Z.pop(),l=e.randomState;return t.setSeed(l.w,l.x,l.y,l.z,0),Lt={pos:new m(A),isPressed:J,isJustPressed:F,isJustReleased:_},xe(T.inputs.pop()),e}function zi(t){const e=Z[Z.length-1],l=e.randomState;return t.setSeed(l.w,l.x,l.y,l.z,0),Lt={pos:new m(A),isPressed:J,isJustPressed:F,isJustReleased:_},xe(T.inputs[T.inputs.length-1]),e}function Ii(){xe(Lt)}function ji(){return Z.length===0}function Ei(){const t=Ge-1;if(!(t>=T.inputs.length))return Z[t]}const Di=Math.PI,Fi=Math.abs,Ti=Math.sin,$i=Math.cos,Bi=Math.atan2,Li=Math.sqrt,Ui=Math.pow,Ki=Math.floor,Yi=Math.round,Ai=Math.ceil;n.ticks=0,n.difficulty=void 0,n.score=0,n.time=void 0,n.isReplaying=!1;function Ji(t=1,e){return N.get(t,e)}function Ni(t=2,e){return N.getInt(t,e)}function Hi(t=1,e){return N.get(t,e)*N.getPlusOrMinus()}function Ut(t="GAME OVER"){rt=t,ce&&(n.time=void 0),Kl()}function Xi(t="COMPLETE"){rt=t,Kl()}function _i(t,e,l){if(n.isReplaying||(n.score+=t,e==null))return;const i=`${t>=1?"+":""}${Math.floor(t)}`;let s=new m;typeof e=="number"?s.set(e,l):s.set(e),s.x-=i.length*f/2,s.y-=f/2,nt.push({str:i,pos:s,vy:-2,ticks:30})}function Dl(t){U(t)}function Wi(t,e,l,i,s,r){let o=new m;typeof t=="number"?(o.set(t,e),Il(o,l,i,s,r)):(o.set(t),Il(o,e,l,i,s))}function Fl(t,e){return new m(t,e)}function Tl(t,e){!Ee&&!ie&&le&&(e!=null&&typeof sss.playSoundEffect=="function"?sss.playSoundEffect(t,e):sss.play(Qi[t]))}let Kt;function Yt(){typeof sss.generateMml=="function"?Kt=sss.playMml(sss.generateMml()):sss.playBgm()}function At(){Kt!=null&&sss.stopMml(Kt),sss.stopBgm()}function qi(t){if(Ee){const e=zi(N),l=e.baseState;return n.score=l.score,n.ticks=l.ticks,cloneDeep(e.gameState)}else if(ie){const e=Gi(N),l=e.baseState;return n.score=l.score,n.ticks=l.ticks,e.gameState}else{if(n.isReplaying)return Ei().gameState;if(ee==="inGame"){const e={score:n.score,ticks:n.ticks};Oi(t,e,N)}}return t}function Vi(){ie||(!n.isReplaying&&it?cn():Ut())}const Qi={coin:"c",laser:"l",explosion:"e",powerUp:"p",hit:"h",jump:"j",select:"s",lucky:"u",random:"r",click:"i",synth:"y",tone:"t"},$l={isPlayingBgm:!1,isCapturing:!1,isCapturingGameCanvasOnly:!1,captureCanvasScale:1,isShowingScore:!0,isShowingTime:!1,isReplayEnabled:!1,isRewindEnabled:!1,isDrawingParticleFront:!1,isDrawingScoreFront:!1,isMinifying:!1,isSoundEnabled:!0,viewSize:{x:100,y:100},seed:0,theme:"simple"},Zi=new We,N=new We;let ee,en={title:rn,inGame:sn,gameOver:on,rewind:un},O,Jt=0,et,tt=!0,lt=0,te,ze,Bl,ce,Ie,it,je,Nt,le,H,nt,Ee=!1,ie=!1,De,st,rt,Ht;function tn(t){const e=window;e.update=t.update,e.title=t.title,e.description=t.description,e.characters=t.characters,e.options=t.options,Ll()}function Ll(){let t;typeof options<"u"&&options!=null?t=Object.assign(Object.assign({},$l),options):t=$l;const e={name:t.theme,isUsingPixi:!1,isDarkColor:!1};t.theme!=="simple"&&t.theme!=="dark"&&(e.isUsingPixi=!0),(t.theme==="pixel"||t.theme==="shapeDark"||t.theme==="crt"||t.theme==="dark")&&(e.isDarkColor=!0),te={viewSize:{x:100,y:100},bodyBackground:e.isDarkColor?"#101010":"#e0e0e0",viewBackground:e.isDarkColor?"blue":"white",theme:e,isSoundEnabled:t.isSoundEnabled},lt=t.seed,te.isCapturing=t.isCapturing,te.isCapturingGameCanvasOnly=t.isCapturingGameCanvasOnly,te.captureCanvasScale=t.captureCanvasScale,te.viewSize=t.viewSize,ze=t.isPlayingBgm,Bl=t.isShowingScore&&!t.isShowingTime,ce=t.isShowingTime,Ie=t.isReplayEnabled,it=t.isRewindEnabled,je=t.isDrawingParticleFront,Nt=t.isDrawingScoreFront,le=t.isSoundEnabled,t.isMinifying&&hn(),yi(ln,nn,te)}function ln(){typeof description<"u"&&description!=null&&description.trim().length>0&&(tt=!1,lt+=Jl(description)),typeof title<"u"&&title!=null&&title.trim().length>0&&(tt=!1,document.title=title,lt+=Jl(title)),typeof characters<"u"&&characters!=null&&oi(characters,"a"),le&&sss.init(lt);const t=te.viewSize;H={x:Math.floor(t.x/6),y:Math.floor(t.y/6)},O=new Ci(H),U("black"),tt?(Xt(),n.ticks=0):Ul()}function nn(){n.df=n.difficulty=n.ticks/3600+1,n.tc=n.ticks;const t=n.score,e=n.time;n.sc=n.score;const l=n.sc;n.inp={p:A,ip:J,ijp:F,ijr:_},ii(),en[ee](),p.isUsingPixi&&(Ye(),p.name==="crt"&&ti()),n.ticks++,n.isReplaying?(n.score=t,n.time=e):n.sc!==l&&(n.score=n.sc)}function Xt(){ee="inGame",n.ticks=-1,Dt();const t=Math.floor(n.score);t>Jt&&(Jt=t),ce&&n.time!=null&&(et==null||et>n.time)&&(et=n.time),n.score=0,n.time=0,nt=[],ze&&le&&Yt();const e=Zi.getInt(999999999);N.setSeed(e),(Ie||it)&&(Pi(e),xi(),n.isReplaying=!1)}function sn(){O.clear(),Ue(),je||Qe(),Nt||Al(),(Ie||it)&&ki({pos:Fl(A),isPressed:J,isJustPressed:F,isJustReleased:_}),typeof update=="function"&&update(),je&&Qe(),Nt&&Al(),_t(),O.draw(),ce&&n.time!=null&&n.time++}function Ul(){ee="title",n.ticks=-1,Dt(),O.clear(),Ue(),El()&&(Mi(N),n.isReplaying=!0)}function rn(){if(F){Xt();return}if(Ue(),Ie&&El()&&(vi(),n.inp={p:A,ip:J,ijp:F,ijr:_},je||Qe(),update(),je&&Qe()),n.ticks===0&&(_t(),typeof title<"u"&&title!=null&&O.print(title,Math.floor(H.x-title.length)/2,Math.ceil(H.y*.2))),(n.ticks===30||n.ticks==40)&&typeof description<"u"&&description!=null){let t=0;description.split(`
`).forEach(l=>{l.length>t&&(t=l.length)});const e=Math.floor((H.x-t)/2);description.split(`
`).forEach((l,i)=>{O.print(l,e,Math.floor(H.y/2)+i)})}O.draw()}function Kl(){ee="gameOver",n.isReplaying||Ml(),n.ticks=-1,an(),ze&&le&&At()}function on(){(n.isReplaying||n.ticks>20)&&F?Xt():n.ticks===(Ie?120:300)&&!tt&&Ul()}function an(){n.isReplaying||(O.print(rt,Math.floor((H.x-rt.length)/2),Math.floor(H.y/2)),O.draw())}function cn(){ee="rewind",Ee=!0,De=$t({pos:{x:D.x-39,y:11},size:{x:36,y:7},text:"Rewind"}),st=$t({pos:{x:D.x-39,y:D.y-19},size:{x:36,y:7},text:"GiveUp"}),ze&&le&&At(),p.isUsingPixi&&(Ze(De),Ze(st))}function un(){O.clear(),Ue(),update(),_t(),Ii(),ie?(Ze(De),(ji()||!J)&&dn()):(Bt(De),Bt(st),De.isPressed&&(ie=!0,Ee=!1)),st.isPressed?(Ee=ie=!1,Ut()):O.draw(),ce&&n.time!=null&&n.time++}function dn(){ie=!1,ee="inGame",Dt(),ze&&le&&Yt()}function _t(){if(Bl){O.print(`${Math.floor(n.score)}`,0,0);const t=`HI ${Jt}`;O.print(t,H.x-t.length,0)}ce&&(Yl(n.time,0,0),Yl(et,9,0))}function Yl(t,e,l){if(t==null)return;let i=Math.floor(t*100/50);i>=10*60*100&&(i=10*60*100-1);const s=Wt(Math.floor(i/6e3),1)+"'"+Wt(Math.floor(i%6e3/100),2)+'"'+Wt(Math.floor(i%100),2);O.print(s,e,l)}function Wt(t,e){return("0000"+t).slice(-e)}function Al(){Ae(),U("black"),nt=nt.filter(t=>(Ct(t.str,t.pos.x,t.pos.y),t.pos.y+=t.vy,t.vy*=.9,t.ticks--,t.ticks>0)),Je()}function Jl(t){let e=0;for(let l=0;l<t.length;l++){const i=t.charCodeAt(l);e=(e<<5)-e+i,e|=0}return e}function fn(){let t=window.location.search.substring(1);if(t=t.replace(/[^A-Za-z0-9_-]/g,""),t.length===0)return;const e=document.createElement("script");Ht=`${t}/main.js`,e.setAttribute("src",Ht),document.head.appendChild(e)}function hn(){fetch(Ht).then(t=>t.text()).then(t=>{const e=Terser.minify(t+"update();",{toplevel:!0}).code,l="function(){",i=e.indexOf(l),s="options={",r=e.indexOf(s);let o=e;if(i>=0)o=e.substring(e.indexOf(l)+l.length,e.length-4);else if(r>=0){let a=1,d;for(let u=r+s.length;u<e.length;u++){const g=e.charAt(u);if(g==="{")a++;else if(g==="}"&&(a--,a===0)){d=u+2;break}}a===0&&(o=e.substring(d))}Nl.forEach(([a,d])=>{o=o.split(a).join(d)}),console.log(o),console.log(`${o.length} letters`)})}n.inp=void 0;function gn(...t){return Dl.apply(this,t)}function mn(...t){return Tl.apply(this,t)}function pn(...t){return w.apply(this,t)}function yn(...t){return B.apply(this.args)}n.tc=void 0,n.df=void 0,n.sc=void 0;const Cn="transparent",wn="white",bn="red",Rn="green",Sn="yellow",Pn="blue",kn="purple",Mn="cyan",vn="black",xn="coin",On="laser",Gn="explosion",zn="powerUp",In="hit",jn="jump",En="select",Dn="lucky";let Nl=[["===","=="],["!==","!="],["input.pos","inp.p"],["input.isPressed","inp.ip"],["input.isJustPressed","inp.ijp"],["input.isJustReleased","inp.ijr"],["color(","clr("],["play(","ply("],["times(","tms("],["remove(","rmv("],["ticks","tc"],["difficulty","df"],["score","sc"],[".isColliding.rect.transparent",".tr"],[".isColliding.rect.white",".wh"],[".isColliding.rect.red",".rd"],[".isColliding.rect.green",".gr"],[".isColliding.rect.yellow",".yl"],[".isColliding.rect.blue",".bl"],[".isColliding.rect.purple",".pr"],[".isColliding.rect.cyan",".cy"],[".isColliding.rect.black",".lc"],['"transparent"',"tr"],['"white"',"wh"],['"red"',"rd"],['"green"',"gr"],['"yellow"',"yl"],['"blue"',"bl"],['"purple"',"pr"],['"cyan"',"cy"],['"black"',"lc"],['"coin"',"cn"],['"laser"',"ls"],['"explosion"',"ex"],['"powerUp"',"pw"],['"hit"',"ht"],['"jump"',"jm"],['"select"',"sl"],['"lucky"',"uc"]];n.PI=Di,n.abs=Fi,n.addGameScript=fn,n.addScore=_i,n.addWithCharCode=Le,n.arc=Si,n.atan2=Bi,n.bar=bi,n.bl=Pn,n.box=wi,n.ceil=Ai,n.char=si,n.clamp=v,n.clr=gn,n.cn=xn,n.color=Dl,n.complete=Xi,n.cos=$i,n.cy=Mn,n.end=Ut,n.ex=Gn,n.floor=Ki,n.frameState=qi,n.getButton=$t,n.gr=Rn,n.ht=In,n.init=tn,n.input=mi,n.jm=jn,n.keyboard=ui,n.lc=vn,n.line=Ri,n.ls=On,n.minifyReplaces=Nl,n.onLoad=Ll,n.particle=Wi,n.play=Tl,n.playBgm=Yt,n.ply=mn,n.pointer=gi,n.pow=Ui,n.pr=kn,n.pw=zn,n.range=c,n.rd=bn,n.rect=Ft,n.remove=B,n.rewind=Vi,n.rmv=yn,n.rnd=Ji,n.rndi=Ni,n.rnds=Hi,n.round=Yi,n.sin=Ti,n.sl=En,n.sqrt=Li,n.stopBgm=At,n.text=rl,n.times=w,n.tms=pn,n.tr=Cn,n.uc=Dn,n.updateButton=Bt,n.vec=Fl,n.wh=wn,n.wrap=G,n.yl=Sn,Object.defineProperty(n,"__esModule",{value:!0})})(window||{})})();const h={width:90,height:160,laneBlockHeight:3,leftX:33,rightX:58,kumaY:130,kumaStrideLength:4,fastTime:60,slowTime:60,daysUntillGradutation:1461,debug:!1},Fn=h.height/(h.laneBlockHeight*2),Hl=new Date(2022,3,1),Tn="KAKENUKERU",$n=`
    KUMA

  ${h.daysUntillGradutation} days


[Tap]
Change lanes
`,Bn=[`
 l  l
 llll
 lllll
lllll
 llll
    l
`,`
 l  l
 llll
lllll
 lllll
 llll
 l
`,`
rrrrrr
rr  rr
r  r r
r  rrr
r    r
rrrrrr
`,`
CCCCCC
CCC CC
CC   C
C C CC
C    C
CCCCCC
`,`
yyyyyy
yy  yy
y    y
y    y
y yy y
yyyyyy
`,`
YYYYYY
Y YY Y
YY  YY
Y    Y
Y    Y
YYYYYY
`,`
RRRRRR
RR  RR
R    R
R    R
 RRRR
RRRRRR
`,`
gggggg
gggggg
gg   g
g    g
gg   g
gggggg
`,`
RRRRRR
R RR R
R    R
R    R
R    R
RRRR R
`,`
PPPPPP
PPP  P
PP   P
P    P
P    P
PPPPPP
`,`
cccccc
cc ccc
c    c

c    c
cccccc
`,`
RR R R
RR R R
RR R R
R    R
R    R
RRRRRR
`,`
 llll
l    l
l
l    l
 llll
`,`
 l
l l l
l  lll
l l l
 l lll
    l
`,`
  bb
bb byy
bbbbyy
bbyyyy
bby yy
  yy
`],Xl=[],qt=[],Vt=[];let ct,Fe,ut,dt,Qt,Te,$e,Be;function Ln(){if(!ticks){ct=!0,Fe=0,ut=0,dt=0,Qt=!0,Te=0,$e=0,Be=Hl;return}remove(qt,c=>(c.restTime--,c.restTime<=0)),remove(Vt,c=>(c.restTime--,c.restTime<=0));const n=Vt.length>=1?.1:Math.max(difficulty+qt.length*1,0);for(ut++;ut>60/n;){ut-=60/n;const c=n>6?!0:rnd(10)>Math.max(5/n,1e-5);Xl.push({type:c?"Fast":"Slow",character:c?addWithCharCode("c",rndi(10)):addWithCharCode("c",10+rndi(3)),y:0,isInLeft:rndi(2)===0})}const v=ticks*n%h.kumaStrideLength/h.kumaStrideLength;n>.1&&input.isJustPressed&&(ct=!ct,play("jump"));const G=ct?h.leftX:h.rightX;color("black"),v<.5?char("a",G,h.kumaY):char("b",G,h.kumaY),remove(Xl,c=>{var B,ue,de,Le;c.y+=n;const w=char(c.character,c.isInLeft?h.leftX:h.rightX,c.y);if(((ue=(B=w==null?void 0:w.isColliding)==null?void 0:B.char)==null?void 0:ue.a)||((Le=(de=w==null?void 0:w.isColliding)==null?void 0:de.char)==null?void 0:Le.b))switch(c.type){case"Fast":return qt.push({restTime:h.fastTime}),addScore(1,G,h.kumaY),Te++,play("coin"),particle(G,h.kumaY,16,1,PI/2,PI/3),!0;case"Slow":return Vt.push({restTime:h.slowTime}),dt=h.slowTime,Qt=c.isInLeft,Te=0,$e=0,particle(G,h.kumaY,8),play("hit"),!0}return c.y>h.height}),color("black"),dt>0&&(dt--,text("muzu",(Qt?h.leftX:h.rightX)-8,h.kumaY-10)),$e>0&&($e--,text("KIMOCHIee~~~!!!",3,h.height/2+7),particle(G,h.kumaY,16,1,PI/2,PI/3),play("powerUp")),Te>10&&(Te=0,$e=180);const $=ticks*n%(h.laneBlockHeight*2);color("black");for(let c=0;c<Fn;c++){const w=$+h.laneBlockHeight*c*2;rect(20,w,2,h.laneBlockHeight),rect(45,w,2,h.laneBlockHeight),rect(70,w,2,h.laneBlockHeight)}color("white"),rect(0,0,h.width,21),color("black"),Fe+=n/60,Be=new Date(Hl.getTime()+1e3*60*60*24*Fe),text(`${Be.getUTCFullYear()}-${(Be.getUTCMonth()+1).toString().padStart(2,"0")}-${Be.getUTCDate().toString().padStart(2,"0")}(${Math.ceil(h.daysUntillGradutation-Fe)})`,3,10),text(`${n.toFixed(2)} days/s`,3,17),Fe>=h.daysUntillGradutation&&(color("light_red"),rect(0,h.height/2-3,h.width,10),color("black"),play("lucky"),end("Thank you!"))}init({update:Ln,title:Tn,description:$n,characters:Bn,options:{seed:37,isPlayingBgm:!0,isReplayEnabled:!0,viewSize:{x:h.width,y:h.height},isCapturing:!0,isCapturingGameCanvasOnly:!0}});

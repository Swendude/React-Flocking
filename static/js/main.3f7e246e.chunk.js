(this.webpackJsonpflocking=this.webpackJsonpflocking||[]).push([[0],{12:function(n,t,e){},13:function(n,t,e){},15:function(n,t,e){"use strict";e.r(t);var a=e(1),r=e.n(a),c=e(5),i=e.n(c),o=(e(12),e(6)),u=e(7),h=(e(13),e(0)),d=400,f=24;function g(n){return n*(Math.PI/180)}function s(n){return Object(h.jsx)("g",{transform:"translate(".concat(n.x," ").concat(n.y,") rotate(").concat(n.heading,")"),children:Object(h.jsx)("polygon",{points:"".concat(-6,",").concat(12," \n        0,").concat(-12," \n        ").concat(6,",").concat(12),fill:"#999"})})}var x=function(){var n=Object(a.useState)(Object(o.a)(Array(30).keys()).map((function(n){return{id:n,x:Math.floor(Math.random()*d),y:Math.floor(Math.random()*d),heading:Math.floor(360*Math.random())}}))),t=Object(u.a)(n,2),e=t[0],r=t[1],c=Object(a.useRef)(),i=Object(a.useRef)(Date.now()),x=function n(t){c.current=requestAnimationFrame(n),Date.now()-i.current>1e3/30&&r((function(n){return function(n){var t=n.map((function(t){return n.filter((function(n){return n.id!==t.id&&Math.pow(t.x-n.x,2)+Math.pow(t.y-n.y,2)<=Math.pow(100,2)}))})).map((function(n){if(n.length>0){var t=n.reduce((function(n,t){return{x:n.x+t.x,y:n.y+t.y,heading:n.heading+t.heading}}),{x:0,y:0,heading:0});return{x:t.x/n.length,y:t.y/n.length,heading:t.heading/n.length}}return null})),e=n.map((function(n,e){var a,r=t[e];if(!r)return n;var c=.01*(n.heading-r.heading);return c=Math.min(3,Math.max(-3,c)),a=n.heading+c,{id:n.id,x:n.x+Math.sin(g(n.heading)),y:n.y-Math.cos(g(n.heading)),heading:a%360}})),a=function(n,t){return n<-24?t+f:n>t+f?0:n};return e.map((function(n){return{id:n.id,x:a(n.x+Math.sin(g(n.heading)),d),y:a(n.y-Math.cos(g(n.heading)),d),heading:n.heading}}))}(n)}))};return Object(a.useEffect)((function(){return c.current=requestAnimationFrame(x),function(){return cancelAnimationFrame(c.current)}}),[]),Object(h.jsx)(h.Fragment,{children:Object(h.jsxs)("svg",{id:"cvs",viewBox:"0 0 ".concat(d," ").concat(d),children:[Object(h.jsx)("rect",{x:"0",width:d,y:"0",height:d,fill:"#eee"}),e.map((function(n,t){return Object(h.jsx)(s,{x:n.x,y:n.y,heading:n.heading},t)}))]})})},l=function(n){n&&n instanceof Function&&e.e(3).then(e.bind(null,16)).then((function(t){var e=t.getCLS,a=t.getFID,r=t.getFCP,c=t.getLCP,i=t.getTTFB;e(n),a(n),r(n),c(n),i(n)}))};i.a.render(Object(h.jsx)(r.a.StrictMode,{children:Object(h.jsx)(x,{})}),document.getElementById("root")),l()}},[[15,1,2]]]);
//# sourceMappingURL=main.3f7e246e.chunk.js.map
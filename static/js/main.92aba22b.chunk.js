(this.webpackJsonpstatistics_practice=this.webpackJsonpstatistics_practice||[]).push([[0],{101:function(t,n,e){},102:function(t,n,e){},110:function(t,n){},116:function(t,n,e){"use strict";e.r(n);var r=e(14),c=e(0),i=e.n(c),o=e(19),s=e.n(o),u=(e(101),e(102),e(21)),l=e(15),a=e(166),j=e(165),b=Object(a.a)(j.a,{epsilon:1e-12,matrix:"Matrix",number:"number",precision:64,predictable:!1,randomSeed:null}),d=function(t){return b.mean(t)},p=function(){var t=Object(c.useState)([{explanatoryColumn:0,responseColumn:0}]),n=Object(l.a)(t,2),e=n[0],i=n[1],o=function(t,n){return function(r){var c=Object(u.a)(e);c[t][n]=parseInt(r.target.value),i(c)}},s=e.map((function(t,n){return Object(r.jsxs)("tr",{children:[Object(r.jsx)("td",{children:n+1}),Object(r.jsx)("td",{children:Object(r.jsx)("input",{type:"number",onChange:o(n,"explanatoryColumn"),value:t.explanatoryColumn})}),Object(r.jsx)("td",{children:Object(r.jsx)("input",{type:"number",onChange:o(n,"responseColumn"),value:t.responseColumn})})]},n)}));return console.log(e),Object(r.jsxs)("div",{children:["\u5358\u56de\u5e30\u5206\u6790",Object(r.jsxs)("table",{children:[Object(r.jsx)("thead",{children:Object(r.jsxs)("tr",{children:[Object(r.jsx)("td",{children:"No."}),Object(r.jsx)("td",{children:"explanatory"}),Object(r.jsx)("td",{children:"response"})]})}),Object(r.jsx)("tbody",{children:s})]}),Object(r.jsx)("button",{onClick:function(){i([].concat(Object(u.a)(e),[{explanatoryColumn:0,responseColumn:0}]))},children:"Add"}),Object(r.jsx)("button",{onClick:function(){return function(){var t=Object(u.a)(e);t.pop(),i(t)}()},children:"Delete"}),Object(r.jsx)("button",{onClick:function(){return function(t,n){var e=t.map((function(t){return t*t})),r=function(t,n){for(var e=[],r=0;r<t.length;r++)e[r]=t[r]*n[r];return e}(t,n),c=b.matrix([[d(e),d(t)],[d(t),1]]);if(0!==b.det(c._data)){var i=b.inv(c._data),o=b.multiply(i,[d(r),d(n)]);return console.log(o),o}}(e.map((function(t){return t.explanatoryColumn})),e.map((function(t){return t.responseColumn})))},children:"Calculate"})]})},h=e(82),x=null,f=function(t){return t.split("\n")},O=function(t){return t.split(",")},m=function(t){for(var n=f(t),e=[],r=0;r<n.length;r++)e[r]=O(n[r]);return e.shift(),e},g=function(t){return m(t).map((function(t){return t.shift(),t}))},v=function(t){return O(f(t)[0])},C=function(t){return function(t){return g(t).map((function(t){return t.pop(),t}))}(t).map((function(t){return t.unshift(1),t}))},y=function(){var t=Object(c.useState)({columns:[],rows:[]}),n=Object(l.a)(t,2),e=n[0],i=n[1],o=Object(c.useState)(!1),s=Object(l.a)(o,2),u=s[0],a=s[1],j=function(t){for(var n=v(t).map((function(t){return{field:t}})),e=[{}],r=0;r<m(t).length;r++){for(var c={},o=0;o<v(t).length;o++){c[v(t)[o]]=parseInt(m(t)[r][o])}e[r]=c}i({columns:n,rows:e}),a(!0)},d=e.rows.length<5?e.rows.length:5;return Object(r.jsxs)("div",{children:["\u91cd\u56de\u5e30\u5206\u6790",Object(r.jsx)("p",{children:Object(r.jsx)("input",{type:"file",onChange:function(t){if(0===t.target.files.length)return a(!1),x=null,void i({columns:[],rows:[]});var n=new FileReader;n.onload=function(){x=n.result,j(x);var t,e,r=(t=C(x),e=g(x).map((function(t){return t[t.length-1]})),b.multiply(b.multiply(b.inv(b.multiply(b.transpose(b.matrix(t)),b.matrix(t))),b.transpose(b.matrix(t))),b.matrix(e))._data);console.log(r)},n.readAsText(t.target.files[0])},onClick:function(t){t.target.value=""}})}),!0===u&&Object(r.jsx)("div",{style:{height:47+32*d,width:"100%"},children:Object(r.jsx)(h.a,{rows:e.rows,columns:e.columns,hideFooter:!0,rowHeight:32,headerHeight:32})})]})},w=e(56),k=e(22),F=function(){var t="/statistics_practice";return Object(r.jsx)(w.a,{children:Object(r.jsxs)(k.c,{children:[Object(r.jsx)(k.a,{exact:!0,path:t+"/",component:function(){return Object(r.jsxs)("div",{children:["\u7d71\u8a08\u51e6\u7406\u306e\u7df4\u7fd2\u30da\u30fc\u30b8",Object(r.jsx)("p",{children:Object(r.jsx)(w.b,{to:t+"/simpleregression",children:"\u5358\u56de\u5e30\u5206\u6790"})}),Object(r.jsx)("p",{children:Object(r.jsx)(w.b,{to:t+"/multipleregression",children:"\u91cd\u56de\u5e30\u5206\u6790"})})]})}}),Object(r.jsx)(k.a,{exact:!0,path:t+"/simpleregression",component:function(){return Object(r.jsxs)("div",{children:[Object(r.jsx)(p,{}),Object(r.jsx)(w.b,{to:t+"/",children:"\u30c8\u30c3\u30d7\u3078"})]})}}),Object(r.jsx)(k.a,{exact:!0,path:t+"/multipleregression",component:function(){return Object(r.jsxs)("div",{children:[Object(r.jsx)(y,{}),Object(r.jsx)(w.b,{to:t+"/",children:"\u30c8\u30c3\u30d7\u3078"})]})}})]})})},S=function(t){t&&t instanceof Function&&e.e(3).then(e.bind(null,168)).then((function(n){var e=n.getCLS,r=n.getFID,c=n.getFCP,i=n.getLCP,o=n.getTTFB;e(t),r(t),c(t),i(t),o(t)}))};s.a.render(Object(r.jsx)(i.a.StrictMode,{children:Object(r.jsx)(F,{})}),document.getElementById("root")),S()}},[[116,1,2]]]);
//# sourceMappingURL=main.92aba22b.chunk.js.map
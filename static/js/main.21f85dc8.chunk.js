(this.webpackJsonpstatistics_practice=this.webpackJsonpstatistics_practice||[]).push([[0],{107:function(e,t,n){},108:function(e,t,n){},116:function(e,t){},122:function(e,t,n){"use strict";n.r(t);var r=n(9),a=n(0),c=n.n(a),i=n(20),s=n.n(i),o=(n(107),n(108),n(21)),l=n(15),u=n(182),j=n(181),b=Object(u.a)(j.a,{epsilon:1e-12,matrix:"Matrix",number:"number",precision:64,predictable:!1,randomSeed:null}),h=function(e){return b.mean(e)},d=function(){var e=Object(a.useState)([{explanatoryColumn:0,responseColumn:0}]),t=Object(l.a)(e,2),n=t[0],c=t[1],i=function(e,t){return function(r){var a=Object(o.a)(n);a[e][t]=parseInt(r.target.value),c(a)}},s=n.map((function(e,t){return Object(r.jsxs)("tr",{children:[Object(r.jsx)("td",{children:t+1}),Object(r.jsx)("td",{children:Object(r.jsx)("input",{type:"number",onChange:i(t,"explanatoryColumn"),value:e.explanatoryColumn})}),Object(r.jsx)("td",{children:Object(r.jsx)("input",{type:"number",onChange:i(t,"responseColumn"),value:e.responseColumn})})]},t)}));return console.log(n),Object(r.jsxs)("div",{children:["\u5358\u56de\u5e30\u5206\u6790",Object(r.jsxs)("table",{children:[Object(r.jsx)("thead",{children:Object(r.jsxs)("tr",{children:[Object(r.jsx)("td",{children:"No."}),Object(r.jsx)("td",{children:"explanatory"}),Object(r.jsx)("td",{children:"response"})]})}),Object(r.jsx)("tbody",{children:s})]}),Object(r.jsx)("button",{onClick:function(){c([].concat(Object(o.a)(n),[{explanatoryColumn:0,responseColumn:0}]))},children:"Add"}),Object(r.jsx)("button",{onClick:function(){return function(){var e=Object(o.a)(n);e.pop(),c(e)}()},children:"Delete"}),Object(r.jsx)("button",{onClick:function(){return function(e,t){var n=e.map((function(e){return e*e})),r=function(e,t){for(var n=[],r=0;r<e.length;r++)n[r]=e[r]*t[r];return n}(e,t),a=b.matrix([[h(n),h(e)],[h(e),1]]);if(0!==b.det(a._data)){var c=b.inv(a._data),i=b.multiply(c,[h(r),h(t)]);return console.log(i),i}}(n.map((function(e){return e.explanatoryColumn})),n.map((function(e){return e.responseColumn})))},children:"Calculate"})]})},x=n(84),p=n(175),O=n(176),m=n(177),f=n(178),g=n(179),v=n(174),y=n(180),D=n(61),C=n(62),w=n(89),E=function(e){return e.split("\n")},k=function(e){return e.split(",")},I=Object(w.a)("FileData"),N=function(){function e(t){Object(D.a)(this,e),Object.defineProperty(this,I,{writable:!0,value:void 0}),this.FileData=t}return Object(C.a)(e,[{key:"Data",get:function(){for(var e=E(this.FileData),t=[],n=0;n<e.length;n++)t[n]=k(e[n]);return t.shift(),t}},{key:"NonIdData",get:function(){return this.Data.map((function(e){return e.shift(),e}))}},{key:"Header",get:function(){return k(E(this.FileData)[0])}},{key:"ExplanatoryData",get:function(){return this.NonIdData.map((function(e){return e.pop(),e}))}},{key:"ExplanatoryDataWithInterceptPart",get:function(){return this.ExplanatoryData.map((function(e){return e.unshift(1),e}))}},{key:"ResponseData",get:function(){return this.NonIdData.map((function(e){return e[e.length-1]}))}},{key:"SampleNumber",get:function(){return this.Data.length}},{key:"ExplanatoryNumber",get:function(){return this.ExplanatoryDataWithInterceptPart[0].length}}]),e}(),F=null,S=function(e,t){for(var n=[],r=0,a=0;a<t.length;a++){for(var c=0;c<e.length;c++)r+=e[c]*t[a][c];n[a]=r,r=0}return n},P=function(e){var t=e.rows.length<5?e.rows.length:5;return Object(r.jsx)("div",{style:{height:47+32*t},children:Object(r.jsx)(x.a,{rows:e.rows,columns:e.columns,hideFooter:!0,rowHeight:32,headerHeight:32})})},R=function(e){for(var t,n,a,c,i=(t=F.ExplanatoryDataWithInterceptPart,n=F.ResponseData,b.multiply(b.multiply(b.inv(b.multiply(b.transpose(b.matrix(t)),b.matrix(t))),b.transpose(b.matrix(t))),b.matrix(n))._data),s=(a=S(i,F.ExplanatoryDataWithInterceptPart),c=F.ResponseData,b.variance(a)/b.variance(c)),o=function(e,t,n){return 1-(t-1)/(t-n)*(1-e)}(s,F.SampleNumber,F.ExplanatoryNumber),l=function(e,t,n,r){for(var a=0,c=0;c<e.length;c++)a+=b.square(e[c]-t[c]);return a/(n-r)}(F.ResponseData,S(i,F.ExplanatoryDataWithInterceptPart),F.SampleNumber,F.ExplanatoryNumber),u=function(e){return b.sqrt(e)}(l),j=function(e,t,n){for(var r=[],a=0;a<n;a++)r[a]=b.sqrt(b.inv(b.multiply(b.transpose(b.matrix(t)),b.matrix(t)))._data[a][a]*e);return r}(l,F.ExplanatoryDataWithInterceptPart,F.ExplanatoryNumber),h=function(e,t){for(var n=[],r=0;r<e.length;r++)n[r]=e[r]/t[r];return n}(i,j),d=function(e,t){return{name:e,value:t}},x=[d("\u6c7a\u5b9a\u4fc2\u6570 R^2",s),d("\u88dc\u6b63 R^2",o),d("\u6a19\u6e96\u8aa4\u5dee",u),d("\u30c7\u30fc\u30bf\u6570",F.SampleNumber)],D=function(e,t,n,r){return{name:e,coefficient:t,standardErrorOfCoefficient:n,tValue:r}},C=[D("\u5207\u7247",i[0],j[0],h[0])],w=1;w<i.length;w++)C[w]=D(e.columns[w].field,i[w],j[w],h[w]);return Object(r.jsx)("div",{children:Object(r.jsxs)(p.a,{container:!0,direction:"column",spacing:3,children:[Object(r.jsxs)(p.a,{container:!0,spacing:3,children:[Object(r.jsx)(p.a,{item:!0,xs:!0}),Object(r.jsx)(p.a,{item:!0,xs:8,children:Object(r.jsx)(O.a,{children:Object(r.jsxs)(m.a,{size:"small","aria-label":"a dense table",children:[Object(r.jsx)(f.a,{children:Object(r.jsxs)(g.a,{children:[Object(r.jsx)(v.a,{}),Object(r.jsx)(v.a,{children:"\u56de\u5e30\u7d71\u8a08"})]})}),Object(r.jsx)(y.a,{children:x.map((function(e){return Object(r.jsxs)(g.a,{children:[Object(r.jsx)(v.a,{component:"th",scope:"row",children:e.name}),Object(r.jsx)(v.a,{align:"right",children:e.value})]},e.name)}))})]})})}),Object(r.jsx)(p.a,{item:!0,xs:!0})]}),Object(r.jsx)(p.a,{item:!0,xs:!0,children:Object(r.jsx)(O.a,{children:Object(r.jsxs)(m.a,{size:"small","aria-label":"a dense table",children:[Object(r.jsx)(f.a,{children:Object(r.jsxs)(g.a,{children:[Object(r.jsx)(v.a,{}),Object(r.jsx)(v.a,{align:"center",children:"\u4fc2\u6570"}),Object(r.jsx)(v.a,{align:"center",children:"\u6a19\u6e96\u8aa4\u5dee"}),Object(r.jsx)(v.a,{align:"center",children:"t\u5024"})]})}),Object(r.jsx)(y.a,{children:C.map((function(e){return Object(r.jsxs)(g.a,{children:[Object(r.jsx)(v.a,{component:"th",scope:"row",children:e.name}),Object(r.jsx)(v.a,{align:"right",children:e.coefficient}),Object(r.jsx)(v.a,{align:"right",children:e.standardErrorOfCoefficient}),Object(r.jsx)(v.a,{align:"right",children:e.tValue})]},e.name)}))})]})})})]})})},_=function(){var e=Object(a.useState)({columns:[],rows:[]}),t=Object(l.a)(e,2),n=t[0],c=t[1],i=Object(a.useState)(!1),s=Object(l.a)(i,2),o=s[0],u=s[1],j=function(){for(var e=F.Header.map((function(e){return{field:e}})),t=[{}],n=0;n<F.Data.length;n++){for(var r={},a=0;a<F.Header.length;a++){r[F.Header[a]]=parseInt(F.Data[n][a])}t[n]=r}c({columns:e,rows:t}),u(!0)};return Object(r.jsx)("div",{children:Object(r.jsxs)(p.a,{container:!0,direction:"column",alignItems:"center",spacing:3,children:[Object(r.jsx)(p.a,{item:!0,xs:!0,children:"\u91cd\u56de\u5e30\u5206\u6790"}),Object(r.jsx)(p.a,{item:!0,xs:!0,children:Object(r.jsx)("input",{type:"file",accept:".csv",onChange:function(e){if(0===e.target.files.length)return u(!1),F=null,void c({columns:[],rows:[]});var t=new FileReader;t.onload=function(){F=new N(t.result),j()},t.readAsText(e.target.files[0])},onClick:function(e){e.target.value="",u(!1)}})}),!0===o&&Object(r.jsxs)("div",{children:[Object(r.jsx)(p.a,{item:!0,xs:!0,children:Object(r.jsx)(P,{columns:n.columns,rows:n.rows})}),Object(r.jsx)(p.a,{item:!0,xs:!0,children:Object(r.jsx)(R,{columns:n.columns})})]})]})})},H=n(57),W=n(22),q=function(){var e="/statistics_practice";return Object(r.jsx)(H.a,{children:Object(r.jsxs)(W.c,{children:[Object(r.jsx)(W.a,{exact:!0,path:e+"/",component:function(){return Object(r.jsxs)("div",{children:["\u7d71\u8a08\u51e6\u7406\u306e\u7df4\u7fd2\u30da\u30fc\u30b8",Object(r.jsx)("p",{children:Object(r.jsx)(H.b,{to:e+"/simpleregression",children:"\u5358\u56de\u5e30\u5206\u6790"})}),Object(r.jsx)("p",{children:Object(r.jsx)(H.b,{to:e+"/multipleregression",children:"\u91cd\u56de\u5e30\u5206\u6790"})})]})}}),Object(r.jsx)(W.a,{exact:!0,path:e+"/simpleregression",component:function(){return Object(r.jsxs)("div",{children:[Object(r.jsx)(d,{}),Object(r.jsx)(H.b,{to:e+"/",children:"\u30c8\u30c3\u30d7\u3078"})]})}}),Object(r.jsx)(W.a,{exact:!0,path:e+"/multipleregression",component:function(){return Object(r.jsxs)("div",{children:[Object(r.jsx)(_,{}),Object(r.jsx)(H.b,{to:e+"/",children:"\u30c8\u30c3\u30d7\u3078"})]})}})]})})},T=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,184)).then((function(t){var n=t.getCLS,r=t.getFID,a=t.getFCP,c=t.getLCP,i=t.getTTFB;n(e),r(e),a(e),c(e),i(e)}))};s.a.render(Object(r.jsx)(c.a.StrictMode,{children:Object(r.jsx)(q,{})}),document.getElementById("root")),T()}},[[122,1,2]]]);
//# sourceMappingURL=main.21f85dc8.chunk.js.map
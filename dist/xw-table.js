!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define("xwTable",[],t):"object"==typeof exports?exports.xwTable=t():e.xwTable=t()}("undefined"!=typeof self?self:this,function(){return function(e){function t(o){if(n[o])return n[o].exports;var a=n[o]={i:o,l:!1,exports:{}};return e[o].call(a.exports,a,a.exports,t),a.l=!0,a.exports}var n={};return t.m=e,t.c=n,t.d=function(e,n,o){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:o})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="/dist/",t(t.s=3)}([function(e,t){function n(e,t){var n=e[1]||"",a=e[3];if(!a)return n;if(t&&"function"==typeof btoa){var r=o(a);return[n].concat(a.sources.map(function(e){return"/*# sourceURL="+a.sourceRoot+e+" */"})).concat([r]).join("\n")}return[n].join("\n")}function o(e){return"/*# sourceMappingURL=data:application/json;charset=utf-8;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(e))))+" */"}e.exports=function(e){var t=[];return t.toString=function(){return this.map(function(t){var o=n(t,e);return t[2]?"@media "+t[2]+"{"+o+"}":o}).join("")},t.i=function(e,n){"string"==typeof e&&(e=[[null,e,""]]);for(var o={},a=0;a<this.length;a++){var r=this[a][0];"number"==typeof r&&(o[r]=!0)}for(a=0;a<e.length;a++){var i=e[a];"number"==typeof i[0]&&o[i[0]]||(n&&!i[2]?i[2]=n:n&&(i[2]="("+i[2]+") and ("+n+")"),t.push(i))}},t}},function(e,t,n){function o(e){for(var t=0;t<e.length;t++){var n=e[t],o=u[n.id];if(o){o.refs++;for(var a=0;a<o.parts.length;a++)o.parts[a](n.parts[a]);for(;a<n.parts.length;a++)o.parts.push(r(n.parts[a]));o.parts.length>n.parts.length&&(o.parts.length=n.parts.length)}else{for(var i=[],a=0;a<n.parts.length;a++)i.push(r(n.parts[a]));u[n.id]={id:n.id,refs:1,parts:i}}}}function a(){var e=document.createElement("style");return e.type="text/css",d.appendChild(e),e}function r(e){var t,n,o=document.querySelector('style[data-vue-ssr-id~="'+e.id+'"]');if(o){if(h)return m;o.parentNode.removeChild(o)}if(v){var r=f++;o=p||(p=a()),t=i.bind(null,o,r,!1),n=i.bind(null,o,r,!0)}else o=a(),t=s.bind(null,o),n=function(){o.parentNode.removeChild(o)};return t(e),function(o){if(o){if(o.css===e.css&&o.media===e.media&&o.sourceMap===e.sourceMap)return;t(e=o)}else n()}}function i(e,t,n,o){var a=n?"":o.css;if(e.styleSheet)e.styleSheet.cssText=g(t,a);else{var r=document.createTextNode(a),i=e.childNodes;i[t]&&e.removeChild(i[t]),i.length?e.insertBefore(r,i[t]):e.appendChild(r)}}function s(e,t){var n=t.css,o=t.media,a=t.sourceMap;if(o&&e.setAttribute("media",o),a&&(n+="\n/*# sourceURL="+a.sources[0]+" */",n+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(a))))+" */"),e.styleSheet)e.styleSheet.cssText=n;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(n))}}var l="undefined"!=typeof document;if("undefined"!=typeof DEBUG&&DEBUG&&!l)throw new Error("vue-style-loader cannot be used in a non-browser environment. Use { target: 'node' } in your Webpack config to indicate a server-rendering environment.");var c=n(7),u={},d=l&&(document.head||document.getElementsByTagName("head")[0]),p=null,f=0,h=!1,m=function(){},v="undefined"!=typeof navigator&&/msie [6-9]\b/.test(navigator.userAgent.toLowerCase());e.exports=function(e,t,n){h=n;var a=c(e,t);return o(a),function(t){for(var n=[],r=0;r<a.length;r++){var i=a[r],s=u[i.id];s.refs--,n.push(s)}t?(a=c(e,t),o(a)):a=[];for(var r=0;r<n.length;r++){var s=n[r];if(0===s.refs){for(var l=0;l<s.parts.length;l++)s.parts[l]();delete u[s.id]}}}};var g=function(){var e=[];return function(t,n){return e[t]=n,e.filter(Boolean).join("\n")}}()},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=n(11);t.default={name:"xwTable",components:{},props:{tableColumns:{type:Array,required:!0},tableData:{type:Array,default:function(){return[]}},headerShow:{type:Boolean,default:!0},footerShow:{type:Boolean,default:!0},seekShow:{type:Boolean,default:!0},pageShow:{type:Boolean,default:!0},modalTitle:{type:String,default:"对话框标题"},noDataText:{type:String,default:"暂无数据"},pagingData:{type:Object,default:function(){return{total:0,current_page:1,page_size:10}}},modalWidth:{type:[String,Number],default:"80%"},modalFooterHide:{type:Boolean,default:!1},okBtnHide:{type:Boolean,default:!1},modalOkBtnName:{type:String,default:"确定"},modalCancelBtnName:{type:String,default:"取消"},modalBtnPlace:{type:String,default:"right"}},data:function(){return{searchVal:"",modalShow:!1,checkedData:[]}},methods:{searchClick:function(){this.$emit("on-search",this.searchVal)},slotEvent:function(e){console.log(e),console.log("执行了子组件的事件")},modalOk:function(){this.$emit("on-modal-ok")},modalCancel:function(){this.modalShow=!1,this.$emit("on-modal-cancel")},initColumns:function(){var e=this;this.tableColumns.forEach(function(t){t.handle&&(t.render=function(n,a){var r=[];return t.handle.forEach(function(t){r.push((0,o.buttonItem)(e,n,a,t))}),n("div",{style:{padding:"4px 0"}},r)})})},pageChange:function(e){this.$emit("on-page-change",e)},pageSizeChange:function(e){this.$emit("on-page-size-change",e)},tabSelectAll:function(e){var t=this;this.tableData.forEach(function(n){e.forEach(function(e){n.id===e.id&&t.$set(n,"_checked",!0)})})},tabSelectAllCancel:function(e){var t=this;this.tableData.forEach(function(e){t.$set(e,"_checked",!1)})},tabSelect:function(e,t){var n=this;this.tableData.forEach(function(e){e.id===t.id&&n.$set(e,"_checked",!0)})},tabSelectCancel:function(e,t){var n=this;this.tableData.forEach(function(e){e.id===t.id&&n.$set(e,"_checked",!1)})},tabSelectionChange:function(e){this.checkedData=e,this.$emit("select-change",this.checkedData)}},computed:{},watch:{},created:function(){this.initColumns()},mounted:function(){}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=n(4),a=function(e){return e&&e.__esModule?e:{default:e}}(o),r={install:function(e,t){e.component(a.default.name,a.default)}};"undefined"!=typeof window&&window.Vue&&window.Vue.use(r),t.default=r},function(e,t,n){"use strict";function o(e){n(5),n(8)}Object.defineProperty(t,"__esModule",{value:!0});var a=n(2),r=n.n(a);for(var i in a)"default"!==i&&function(e){n.d(t,e,function(){return a[e]})}(i);var s=n(12),l=n(10),c=o,u=l(r.a,s.a,!1,c,"data-v-27a21ffa",null);t.default=u.exports},function(e,t,n){var o=n(6);"string"==typeof o&&(o=[[e.i,o,""]]),o.locals&&(e.exports=o.locals);n(1)("2901e105",o,!0)},function(e,t,n){t=e.exports=n(0)(!1),t.push([e.i,".header[data-v-27a21ffa]{margin-bottom:14px}.footer[data-v-27a21ffa]{display:flex;align-items:center;margin-top:14px}.seek[data-v-27a21ffa]{width:100%}",""])},function(e,t){e.exports=function(e,t){for(var n=[],o={},a=0;a<t.length;a++){var r=t[a],i=r[0],s=r[1],l=r[2],c=r[3],u={id:e+":"+a,css:s,media:l,sourceMap:c};o[i]?o[i].parts.push(u):n.push(o[i]={id:i,parts:[u]})}return n}},function(e,t,n){var o=n(9);"string"==typeof o&&(o=[[e.i,o,""]]),o.locals&&(e.exports=o.locals);n(1)("45c7d17b",o,!0)},function(e,t,n){t=e.exports=n(0)(!1),t.push([e.i,".my-ivu-modal-wrap{position:flex!important;top:92px!important;transition:left .2s ease-in-out}.leftmax{left:200px!important}.leftmin{left:64px!important}.seek .ivu-input-icon-clear{right:50px!important}@media (max-width:768px){.my-modal-box .ivu-modal{width:100%!important;margin:0!important}}.my-modal-box .ivu-modal-header{height:45px}",""])},function(e,t){e.exports=function(e,t,n,o,a,r){var i,s=e=e||{},l=typeof e.default;"object"!==l&&"function"!==l||(i=e,s=e.default);var c="function"==typeof s?s.options:s;t&&(c.render=t.render,c.staticRenderFns=t.staticRenderFns,c._compiled=!0),n&&(c.functional=!0),a&&(c._scopeId=a);var u;if(r?(u=function(e){e=e||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext,e||"undefined"==typeof __VUE_SSR_CONTEXT__||(e=__VUE_SSR_CONTEXT__),o&&o.call(this,e),e&&e._registeredComponents&&e._registeredComponents.add(r)},c._ssrRegister=u):o&&(u=o),u){var d=c.functional,p=d?c.render:c.beforeCreate;d?(c._injectStyles=u,c.render=function(e,t){return u.call(t),p(e,t)}):c.beforeCreate=p?[].concat(p,u):[u]}return{esModule:i,exports:s,options:c}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o={type:"primary",size:"small"},a={confirm:!0,title:"标题",transfer:!0};t.buttonItem=function(e,t,n){var r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{};return r.callback&&r.callback(n,r),(!r.hideBtn||!0!==r.hideBtn)&&(r.poptipOpen?r.poptipOpen?t("Poptip",{props:Object.assign({},a,r.poptip_props||{}),on:{"on-ok":function(){e.$emit("on-poptip-ok",Object.assign({},r,{params:n}))},"on-cancel":function(){e.$emit("on-poptip-cancel",Object.assign({},r,{params:n}))}}},[t("Button",{props:Object.assign({},o,r.button_props||{}),style:{margin:"2px 2px"}},r.name||"按钮")]):void 0:t("Button",{props:Object.assign({},o,r.button_props||{}),style:{margin:"2px 2px"},on:{click:function(){e.$emit("on-btn-click",Object.assign({},r,{params:n})),r.modalShow&&(e.modalShow=r.modalShow)}}},r.name||"按钮"))}},function(e,t,n){"use strict";var o=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[e.headerShow?n("header",{staticClass:"header"},[n("Row",{attrs:{type:"flex",align:"middle",gutter:10}},[n("Col",{attrs:{span:"16"}},[e._t("header",null,{slotEvent:e.slotEvent})],2),e._v(" "),n("Col",{attrs:{span:"8"}},[e.seekShow?n("Input",{staticClass:"seek",attrs:{search:!0,"enter-button":"",clearable:"",placeholder:"搜索..."},on:{"on-search":e.searchClick},model:{value:e.searchVal,callback:function(t){e.searchVal=t},expression:"searchVal"}}):e._e()],1)],1)],1):e._e(),e._v(" "),n("Table",{attrs:{stripe:"",columns:e.tableColumns,data:e.tableData,"highlight-row":!0,"no-data-text":e.noDataText},on:{"on-select-all":e.tabSelectAll,"on-select-all-cancel":e.tabSelectAllCancel,"on-select":e.tabSelect,"on-selection-change":e.tabSelectionChange,"on-select-cancel":e.tabSelectCancel}}),e._v(" "),e.footerShow?n("footer",{staticClass:"footer"},[e._t("footer"),e._v(" "),e.pageShow?n("Page",{staticStyle:{"margin-left":"auto"},attrs:{total:e.pagingData.total,"page-size":e.pagingData.page_size,"show-total":"","show-sizer":"","show-elevator":""},on:{"on-change":e.pageChange,"on-page-size-change":e.pageSizeChange}}):e._e()],2):e._e(),e._v(" "),n("Modal",{attrs:{width:e.modalWidth,"footer-hide":e.modalFooterHide},model:{value:e.modalShow,callback:function(t){e.modalShow=t},expression:"modalShow"}},[n("div",{staticStyle:{position:"relative"},attrs:{slot:"header"},slot:"header"},[n("p",[e._v(e._s(e.modalTitle))]),e._v(" "),n("div",{staticStyle:{position:"absolute",top:"-2px",right:"0"}},[n("Icon",{staticStyle:{cursor:"pointer"},attrs:{color:"#ed4014",size:"26",type:"md-close-circle"},nativeOn:{click:function(t){e.modalShow=!1}}})],1)]),e._v(" "),n("div",{attrs:{slot:"close"},slot:"close"}),e._v(" "),e.modalShow?e._t("modalContent"):e._e(),e._v(" "),n("div",{attrs:{slot:"footer"},slot:"footer"},[e._t("modalFooterBtn",[n("div",{style:{textAlign:e.modalBtnPlace}},[e.okBtnHide?e._e():n("Button",{attrs:{type:"primary"},on:{click:e.modalOk}},[e._v(e._s(e.modalOkBtnName))]),e._v(" "),n("Button",{on:{click:e.modalCancel}},[e._v(e._s(e.modalCancelBtnName))])],1)])],2)],2)],1)},a=[],r={render:o,staticRenderFns:a};t.a=r}])});
//# sourceMappingURL=xw-table.js.map
(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-28ecba64"],{"4ca9":function(e,t,n){"use strict";n.r(t);n("8e6e"),n("456d"),n("6762"),n("2fdb"),n("ac6a"),n("6b54"),n("a481");var r=n("bd86"),a=(n("7514"),n("28a5"),n("55dd"),n("96cf"),n("3b8d")),o=n("aa22"),i=n("fd32"),s=(n("6d21"),function(e,t,n){for(var r=document.querySelectorAll(e),a=r.length,o=0;o<a;o++){var i=r[o];i.removeEventListener(t,n),i.addEventListener(t,n)}}),c=function(e,t,n){for(var r=document.querySelectorAll(e),a=r.length,o=0;o<a;o++){var i=r[o];i.removeEventListener(t,n)}};function l(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,r)}return n}function d(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?l(n,!0).forEach(function(t){Object(r["a"])(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):l(n).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}var u={data:function(){return{graph:{},flowGraph:{},modelData:[],flowData:{},allFlowInstances:[],allFlows:[],allTarget:[],currentFlowNodeId:"",foundRefAry:[],selectedFlowInstance:"",selectedFlow:"",selectedTarget:"",showExcution:!0,isShowBody:!1,isEnqueryPage:!1,workflowActionModalVisible:!1,currentFailedNodeID:""}},mounted:function(){this.getProcessInstances(),this.getAllFlow()},methods:{getProcessInstances:function(){var e=Object(a["a"])(regeneratorRuntime.mark(function e(){var t,n,r,a,i,s=arguments;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return t=s.length>0&&void 0!==s[0]&&s[0],n=s.length>1&&void 0!==s[1]?s[1]:void 0,e.next=4,Object(o["F"])();case 4:r=e.sent,a=r.status,i=r.data,r.message,"OK"===a&&(this.allFlowInstances=i.sort(function(e,t){return t.id-e.id}),t&&(this.selectedFlowInstance=n.id,this.processInstance()));case 9:case"end":return e.stop()}},e,this)}));function t(){return e.apply(this,arguments)}return t}(),getAllFlow:function(){var e=Object(a["a"])(regeneratorRuntime.mark(function e(){var t,n,r;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,Object(o["k"])(!1);case 2:t=e.sent,n=t.status,r=t.data,t.message,"OK"===n&&(this.allFlows=r);case 7:case"end":return e.stop()}},e,this)}));function t(){return e.apply(this,arguments)}return t}(),orchestrationSelectHandler:function(){this.getFlowOutlineData(this.selectedFlow),this.selectedFlow&&!1===this.isEnqueryPage&&(this.showExcution=!0)},getTargetOptions:function(){var e=Object(a["a"])(regeneratorRuntime.mark(function e(){var t,n,r,a,i;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:if(this.flowData&&this.flowData.rootEntity){e.next=2;break}return e.abrupt("return");case 2:return t=this.flowData.rootEntity.split(":")[0],n=this.flowData.rootEntity.split(":")[1],e.next=6,Object(o["O"])(t,n);case 6:r=e.sent,a=r.status,i=r.data,r.message,"OK"===a&&(this.allTarget=i);case 11:case"end":return e.stop()}},e,this)}));function t(){return e.apply(this,arguments)}return t}(),queryHandler:function(){var e=this;this.selectedFlowInstance&&(this.isShowBody=!0,this.isEnqueryPage=!0,this.$nextTick(Object(a["a"])(regeneratorRuntime.mark(function t(){var n,r,a,l;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return n=e.allFlowInstances.find(function(t){return t.id===e.selectedFlowInstance}),t.next=3,Object(o["E"])(n&&n.id);case 3:r=t.sent,a=r.status,l=r.data,r.message,"OK"===a&&(e.flowData=d({},l,{flowNodes:l.taskNodeInstances}),e.initFlowGraph(!0),c(".retry","click",e.retryHandler),s(".retry","click",e.retryHandler),i["selectAll"](".retry").attr("cursor","pointer"),e.showExcution=!1),e.selectedFlow=n.procDefId,e.getTargetOptions(),e.selectedTarget=n.entityDataId,e.getModelData();case 12:case"end":return t.stop()}},t)}))))},createHandler:function(){this.isShowBody=!0,this.isEnqueryPage=!1,this.selectedFlowInstance="",this.selectedTarget="",this.selectedFlow="",this.modelData=[],this.flowData={},this.showExcution=!1,this.initModelGraph()},onTargetSelectHandler:function(){this.getModelData()},getModelData:function(){var e=Object(a["a"])(regeneratorRuntime.mark(function e(){var t,n,r;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,Object(o["P"])(this.selectedFlow,this.selectedTarget);case 2:t=e.sent,n=t.status,r=t.data,t.message,"OK"===n&&(this.modelData=r.map(function(e){return d({},e,{refFlowNodeIds:[]})}),this.initModelGraph());case 7:case"end":return e.stop()}},e,this)}));function t(){return e.apply(this,arguments)}return t}(),getFlowOutlineData:function(){var e=Object(a["a"])(regeneratorRuntime.mark(function e(t){var n,r,a;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,Object(o["x"])(t);case 2:n=e.sent,r=n.status,a=n.data,n.message,"OK"===r&&(this.flowData=a,this.initFlowGraph(),this.getTargetOptions());case 7:case"end":return e.stop()}},e,this)}));function t(t){return e.apply(this,arguments)}return t}(),renderModelGraph:function(){var e=this,t=this.modelData.map(function(e,t){var n=e.packageName+"_"+e.entityName,r=e.isHighlight?"#5DB400":"black",a=e.refFlowNodeIds.length>0,o=a?"Mrecord":"ellipse",i=e.refFlowNodeIds.toString().replace(/,/g,"/")+(a?"|":"")+e.packageName+"_"+e.entityName+"_"+e.dataId;return"".concat(n,' [label="').concat(a?i:e.packageName+"_"+e.entityName+"_"+e.dataId,'" class="model" id="').concat(n,'" color="').concat(r,'" shape="').concat(o,'" width="5"]')}),n=function(){var t=[];return e.modelData.forEach(function(e){if(e.succeedingIds.length>0){e.packageName,e.entityName;var n=[];n=e.succeedingIds.map(function(e){return _nodeId+" -> "+e}),t.push(n)}}),t.flat().toString().replace(/,/g,";")},r=Array.isArray(t)&&t.length>0?t.toString().replace(/,/g,";")+";":"",a='digraph G { bgcolor="transparent";Node [fontname=Arial, shape="ellipse", fixedsize="true", width="1.6", height=".8",fontsize=12];Edge [fontname=Arial, minlen="1", color="#7f8fa6", fontsize=10];'+r+n()+"}";this.graph.graphviz.renderDot(a)},renderFlowGraph:function(e){var t=this,n={Completed:"#5DB400",deployed:"#7F8A96",InProgress:"#3C83F8",Faulted:"#FF6262",Timeouted:"#F7B500",NotStarted:"#7F8A96"},r=this.flowData&&this.flowData.flowNodes&&this.flowData.flowNodes.map(function(r,a){if("startEvent"===r.nodeType||"endEvent"===r.nodeType)return"".concat(r.nodeId,' [label="').concat(r.nodeName||"Null",'", fontsize="10", class="flow",style="').concat(e?"filled":"none",'" color="').concat(e?n[r.status]:"#7F8A96",'" shape="circle", id="').concat(r.nodeId,'"]');var o="Faulted"===r.status||"Timeouted"===r.status?"retry":"";return"".concat(r.nodeId,' [fixedsize=false label="').concat(r.orderedNo+"、"+r.nodeName,'" class="flow ').concat(o,'" style="').concat(e?"filled":"none",'" color="').concat(e?n[r.status]:r.nodeId===t.currentFlowNodeId?"#5DB400":"#7F8A96",'"  shape="box" id="').concat(r.nodeId,'" ]')}),a=function(){var r=[];return t.flowData&&t.flowData.flowNodes&&t.flowData.flowNodes.forEach(function(t){if(t.succeedingNodeIds.length>0){var a=[];a=t.succeedingNodeIds.map(function(r){return t.nodeId+" -> "+"".concat(r,' [color="').concat(e?n[t.status]:"black",'"]')}),r.push(a)}}),r.flat().toString().replace(/,/g,";")},o=Array.isArray(r)?r.toString().replace(/,/g,";")+";":"",i='digraph G {bgcolor="transparent";Node [fontname=Arial, height=".3", fontsize=12];Edge [fontname=Arial, color="#7f8fa6", fontsize=10];'+o+a()+"}";console.log("nodesString",i),this.flowGraph.graphviz.renderDot(i),this.bindFlowEvent()},excutionFlow:function(){var e=Object(a["a"])(regeneratorRuntime.mark(function e(){var t,n,r,a,i,s,c=this;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:if(!this.isEnqueryPage){e.next=5;break}this.processInstance(),this.showExcution=!1,e.next=16;break;case 5:return t=this.allTarget.find(function(e){return e.id===c.selectedTarget}),n=[],this.modelData.forEach(function(e){var t=[];e.refFlowNodeIds.forEach(function(n){t.push(d({},e,{flowOrderNo:n}))}),n=n.concat(t)}),r={entityDataId:t.id,entityTypeId:this.flowData.rootEntity,procDefId:this.flowData.procDefId,taskNodeBinds:n.map(function(e){var t=c.flowData.flowNodes.find(function(t){return t.orderedNo===e.flowOrderNo});return{entityDataId:e.dataId,entityTypeId:c.flowData.rootEntity,nodeDefId:t&&t.nodeDefId||"",orderedNo:e.flowOrderNo}})},e.next=11,Object(o["b"])(r);case 11:a=e.sent,i=a.status,s=a.data,a.message,"OK"===i&&(this.getProcessInstances(!0,s),this.showExcution=!1,this.isEnqueryPage=!0);case 16:case"end":return e.stop()}},e,this)}));function t(){return e.apply(this,arguments)}return t}(),processInstance:function(){var e=this,t=this.allFlowInstances.find(function(t){return t.id===e.selectedFlowInstance}),n=null;function r(){null===n&&u(),null!=n&&(clearInterval(n),n=null),n=setInterval(function(){u()},5e3)}function l(){clearInterval(n),n=null}var u=function(){var n=Object(a["a"])(regeneratorRuntime.mark(function n(){var r,a,u;return regeneratorRuntime.wrap(function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,Object(o["E"])(t&&t.id);case 2:r=n.sent,a=r.status,u=r.data,r.message,"OK"===a&&(e.flowData=d({},u,{flowNodes:u.taskNodeInstances}),e.initFlowGraph(!0),c(".retry","click",e.retryHandler),s(".retry","click",e.retryHandler),i["selectAll"](".retry").attr("cursor","pointer"),"Completed"===u.status&&l());case 7:case"end":return n.stop()}},n)}));return function(){return n.apply(this,arguments)}}();r()},retryHandler:function(e){this.currentFailedNodeID=e.target.parentNode.getAttribute("id"),this.workflowActionModalVisible=!0},workFlowActionHandler:function(){var e=Object(a["a"])(regeneratorRuntime.mark(function e(t){var n,r,a,i,s=this;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:if(n=this.flowData.flowNodes.find(function(e){return e.nodeId===s.currentFailedNodeID}),n){e.next=3;break}return e.abrupt("return");case 3:return r={act:t,nodeInstId:n.id,procInstId:n.procInstId},e.next=6,Object(o["fb"])(r);case 6:a=e.sent,a.data,a.message,i=a.status,"OK"===i&&(this.$Notice.success({title:"Success",desc:("retry"===t?"Retry":"Skip")+" action is proceed successfully"}),this.workflowActionModalVisible=!1);case 11:case"end":return e.stop()}},e,this)}));function t(t){return e.apply(this,arguments)}return t}(),bindFlowEvent:function(){var e=this;!0!==this.isEnqueryPage&&(s(".flow","mouseover",function(e){e.preventDefault(),e.stopPropagation(),i["selectAll"]("g").attr("cursor","pointer")}),s(".flow","click",function(t){t.preventDefault(),t.stopPropagation();var n=t.currentTarget;e.highlightModel(n.id),e.currentFlowNodeId=n.id,e.renderFlowGraph()}))},highlightModel:function(e){var t=this;this.foundRefAry=this.flowData.flowNodes.find(function(t){return t.nodeId==e}).routineExpression.split(/[~.>]/),this.modelData.forEach(function(e){e["isHighlight"]=t.foundRefAry[t.foundRefAry.length-1].includes(e.entityName)}),this.renderModelGraph(),c(".model","click",this.modelClickHandler),this.foundRefAry.forEach(function(e){s("#".concat(e.replace(/:/g,"_")),"click",t.modelClickHandler)})},modelClickHandler:function(e){var t=this;e.preventDefault(),e.stopPropagation();var n=e.currentTarget,r=this.modelData.find(function(e){return e.packageName+"_"+e.entityName==n.id}),a=this.flowData.flowNodes.find(function(e){return e.nodeId===t.currentFlowNodeId}),o=r.refFlowNodeIds.indexOf(a.orderedNo);o>-1?r.refFlowNodeIds.splice(o,1):r.refFlowNodeIds.push(a.orderedNo),document.getElementById("graph").innerHTML="",this.renderModelGraph(),this.foundRefAry.forEach(function(e){s("#".concat(e.replace(/:/g,"_")),"click",t.modelClickHandler)})},initModelGraph:function(){var e=this,t=function(){var t;t=i["select"]("#graph"),t.on("dblclick.zoom",null),e.graph.graphviz=t.graphviz().zoom(!1)};t(),this.renderModelGraph()},initFlowGraph:function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]&&arguments[0],n=function(){var t;t=i["select"]("#flow"),t.on("dblclick.zoom",null),e.flowGraph.graphviz=t.graphviz().zoom(!1)};n(),this.renderFlowGraph(t)}}},f=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("Card",{attrs:{"dis-hover":""}},[n("Row",[n("Col",{attrs:{span:"20"}},[n("Form",{attrs:{"label-position":"left"}},[n("FormItem",{attrs:{"label-width":150,label:e.$t("orchs")}},[n("Select",{staticStyle:{width:"70%"},model:{value:e.selectedFlowInstance,callback:function(t){e.selectedFlowInstance=t},expression:"selectedFlowInstance"}},e._l(e.allFlowInstances,function(t){return n("Option",{key:t.id,attrs:{value:t.id}},[e._v("\n                "+e._s(t.procInstName+" "+(t.createdTime||"createdTime")+" "+(t.operator||"operator"))+"\n              ")])}),1),e._v(" "),n("Button",{attrs:{type:"info"},on:{click:e.queryHandler}},[e._v(e._s(e.$t("query_orch")))]),e._v(" "),n("Button",{attrs:{type:"success"},on:{click:e.createHandler}},[e._v(e._s(e.$t("create_orch")))])],1)],1)],1)],1),e._v(" "),e.isShowBody?n("Row",{staticStyle:{border:"1px solid #ebe7e7","border-radius":"3px",padding:"20px"}},[n("Row",[n("Form",[n("Col",{attrs:{span:"6"}},[n("FormItem",{attrs:{"label-width":100,label:e.$t("select_orch")}},[n("Select",{attrs:{label:"",disabled:e.isEnqueryPage},on:{"on-change":e.orchestrationSelectHandler},model:{value:e.selectedFlow,callback:function(t){e.selectedFlow=t},expression:"selectedFlow"}},e._l(e.allFlows,function(t){return n("Option",{key:t.procDefId,attrs:{value:t.procDefId}},[e._v(e._s(t.procDefName))])}),1)],1)],1),e._v(" "),n("Col",{attrs:{span:"8"}},[n("FormItem",{attrs:{"label-width":100,label:e.$t("target_object")}},[n("Select",{attrs:{label:"",disabled:e.isEnqueryPage},on:{"on-change":e.onTargetSelectHandler},model:{value:e.selectedTarget,callback:function(t){e.selectedTarget=t},expression:"selectedTarget"}},e._l(e.allTarget,function(t){return n("Option",{key:t.id,attrs:{value:t.id}},[e._v(e._s(t.key_name))])}),1)],1)],1)],1)],1),e._v(" "),n("Row",{staticStyle:{border:"1px solid #d3cece","border-radius":"3px",padding:"20px"}},[n("Col",{staticStyle:{"border-right":"1px solid #d3cece","text-align":"center"},attrs:{span:"6"}},[n("div",{staticClass:"graph-container",attrs:{id:"flow"}}),e._v(" "),n("div",{staticStyle:{"text-align":"center","margin-top":"60px"}},[e.showExcution?n("Button",{attrs:{type:"info"},on:{click:e.excutionFlow}},[e._v(e._s(e.$t("execute")))]):e._e()],1)]),e._v(" "),n("Col",{staticStyle:{"text-align":"center","margin-top":"60px"},attrs:{span:"18"}},[n("div",{staticClass:"graph-container",attrs:{id:"graph"}})])],1)],1):e._e()],1),e._v(" "),n("Modal",{attrs:{title:e.$t("select_an_operation"),"footer-hide":!0,"mask-closable":!1,scrollable:!0},model:{value:e.workflowActionModalVisible,callback:function(t){e.workflowActionModalVisible=t},expression:"workflowActionModalVisible"}},[n("div",{staticClass:"workflowActionModal-container",staticStyle:{"text-align":"center","margin-top":"20px"}},[n("Button",{attrs:{type:"info"},on:{click:function(t){return e.workFlowActionHandler("retry")}}},[e._v("\n        "+e._s(e.$t("retry"))+"\n      ")]),e._v(" "),n("Button",{staticStyle:{"margin-left":"20px"},attrs:{type:"info"},on:{click:function(t){return e.workFlowActionHandler("skip")}}},[e._v(e._s(e.$t("skip")))])],1)])],1)},h=[],p=n("2455");function w(e){n("61f0")}var g=!1,v=w,m="data-v-49dd693a",y=null,b=Object(p["a"])(u,f,h,g,v,m,y);t["default"]=b.exports},"61f0":function(e,t,n){var r=n("c6e0");"string"===typeof r&&(r=[[e.i,r,""]]),r.locals&&(e.exports=r.locals);var a=n("2fb2").default;a("32a0a9d6",r,!0,{})},c6e0:function(e,t,n){t=e.exports=n("2350")(!1),t.push([e.i,"body[data-v-49dd693a]{color:#15a043}",""])}}]);
//# sourceMappingURL=chunk-28ecba64.7202a296.js.map
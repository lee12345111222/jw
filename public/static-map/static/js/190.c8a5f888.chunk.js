"use strict";(self.webpackChunkstatic_map=self.webpackChunkstatic_map||[]).push([[190],{4190:function(t,n,e){e.r(n),e.d(n,{default:function(){return L}});var r=e(1413),o=e(4925),a=e(885),c=e(5861),s=e(2982),i=e(7757),u=e.n(i),d=e(7313),l=e(1881),f=e.n(l),p=["data"],A="https://testnets.opensea.io/"===function(){var t=null;if(parent!==window)try{t=parent.location.href}catch(n){t=document.referrer}return t}()?"https://testnetapi.playerone.world":"https://api.playerone.world",m=f().create({baseURL:A,transformRequest:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=new FormData;return Object.keys(t).map((function(e){return n.append(e,t[e])})),n}}),v=function(){var t=(0,c.Z)(u().mark((function t(n){var e,a,c,s,i,d=arguments;return u().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e=d.length>1&&void 0!==d[1]?d[1]:{},a=e.data,c=(0,o.Z)(e,p),t.next=3,m.request((0,r.Z)({url:n,method:a?"post":"get",data:a},c));case 3:return s=t.sent,i=s.data,t.abrupt("return",i);case 6:case"end":return t.stop()}}),t)})));return function(n){return t.apply(this,arguments)}}(),g=v,h=function(){var t=(0,c.Z)(u().mark((function t(){return u().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,g("/index/mapdb",{method:"post"});case 2:return t.abrupt("return",t.sent);case 3:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}(),x=function(){var t=(0,c.Z)(u().mark((function t(){return u().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,g("/event/presaleparcelstatus",{method:"post"});case 2:return t.abrupt("return",t.sent);case 3:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}(),Z=function(){var t=(0,c.Z)(u().mark((function t(n){return u().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,g("/asset/settleparcelstatus",{data:{token_id:n}});case 2:return t.abrupt("return",t.sent);case 3:case"end":return t.stop()}}),t)})));return function(n){return t.apply(this,arguments)}}(),y=e(7805),U=e(4122),k=["formatResult","manual"],B=["runAsync"];function w(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},e=n.formatResult,s=void 0===e?function(t){return t}:e,i=n.manual,l=void 0!==i&&i,f=(0,o.Z)(n,k),p=(0,y.Z)(t,(0,r.Z)({manual:!0},f)),A=p.runAsync,m=(0,o.Z)(p,B),v=(0,d.useState)(),g=(0,a.Z)(v,2),h=g[0],x=g[1],Z=(0,U.Z)(function(){var t=(0,c.Z)(u().mark((function t(n){var e,r;return u().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,A(n);case 3:return e=t.sent,r=s(e),x(r),t.abrupt("return",r);case 9:t.prev=9,t.t0=t.catch(0);case 11:case"end":return t.stop()}}),t,null,[[0,9]])})));return function(n){return t.apply(this,arguments)}}());return(0,d.useEffect)((function(){l||Z()}),[l,Z]),(0,r.Z)((0,r.Z)({},m),{},{run:Z,data:h})}var X=e(3873),I=e(7248),_=e.n(I),j=e(6417),S=function(t){var n=t.building,e=t.map,r=(0,d.useMemo)((function(){return n||{}}),[n]),o=r.startX,a=r.startY,c=r.endX,s=r.endY,i=r.isMain,u=(0,d.useMemo)((function(){return _().layerGroup().addTo(e)}),[e]);return(0,d.useEffect)((function(){var t;if(i){var n=[[o,a],[c,s]];t=_().rectangle(n,{color:"#87c4f8",fill:!1,weight:2,lineJoin:"clip"})}else{var e=[[o+.5,a+.5],[c-.5,s-.5]];t=_().rectangle(e,{stroke:!1,fillColor:"#87c4f8",fillOpacity:1})}u.addLayer(t)}),[c,s,i,u,o,a]),(0,j.jsx)(j.Fragment,{})},b="components_container__KmjU-",C="components_zoom__qVN84",E="components_settle__B75pg",Y="components_settle-box__Lmfpu",T=function(t){var n=t.children,e=t.className;return(0,j.jsx)("div",{className:"".concat(b," ").concat(e),children:n})},O=e(3595),G=e(4723),z=e(2526),R=function(t){var n=t.map,e=(0,d.useMemo)((function(){return n.getBounds()}),[n]);return(0,j.jsx)(j.Fragment,{children:(0,j.jsxs)(T,{className:C,children:[(0,j.jsx)("div",{onClick:function(){n.setZoom(n.getZoom()+1)},children:(0,j.jsx)("img",{src:O,alt:""})}),(0,j.jsx)("div",{onClick:function(){n.fitBounds(e)},children:(0,j.jsx)("img",{src:z,alt:""})}),(0,j.jsx)("div",{onClick:function(){n.setZoom(n.getZoom()-1)},children:(0,j.jsx)("img",{src:G,alt:""})})]})})},K=e(2001),N=e.n(K)().bind({container:"tooltip_container__Eo9Ru",tooltip:"tooltip_tooltip__Si7vk",showTooltip:"tooltip_showTooltip__bU2wY",top:"tooltip_top__bBZ0S"});function F(t){var n=t.children,e=t.title,r=t.top;return(0,j.jsxs)("div",{className:N("container",{top:r}),children:[n,(0,j.jsx)("div",{className:N("tooltip"),children:(0,j.jsx)("div",{children:e})})]})}var P=e.p+"static/media/settled-icon.f2846dbefed6526aa79ab42a608b4605.svg";function M(t){var n,e=t.tokenId,r=w(Z,{manual:!0}),o=r.data,a=r.run,c=(0,d.useMemo)((function(){var t;return 1===(null===o||void 0===o||null===(t=o.data)||void 0===t?void 0:t.status)||!1}),[null===o||void 0===o||null===(n=o.data)||void 0===n?void 0:n.status]);return(0,d.useEffect)((function(){e&&a(e)}),[a,e]),(0,j.jsx)(j.Fragment,{children:c&&(0,j.jsx)(T,{className:E,children:(0,j.jsx)(F,{title:"Settled",top:!0,children:(0,j.jsx)("div",{className:Y,children:(0,j.jsx)("img",{src:P,alt:""})})})})})}var Q=["x1","x2","y1","y2","token_id"],V="/map_static",D=function(t,n){var e=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"",r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"",o=arguments.length>4&&void 0!==arguments[4]?arguments[4]:5,a=arguments.length>5&&void 0!==arguments[5]&&arguments[5];return"\n    <div class='popup-title'>".concat(e,"</div>\n    <div>").concat(a?"Ships":"Buses"," run every ").concat(o," minutes</div>\n    <div class='pop-up-flex'>\n      <div>").concat(t,", ").concat(n,"</div>\n      <div style='display: ").concat(r?"block":"none","'>").concat(r,"</div>\n    </div>\n    ")};function L(t){var n=t.map,e=t.busStations,i=t.shipStations,l=t.building,f=w(h).data,p=w(x,{formatResult:function(t){var n;return null===t||void 0===t||null===(n=t.data)||void 0===n?void 0:n.pp_status}}).data,A=(0,d.useMemo)((function(){var t=20;return _().layerGroup([].concat((0,s.Z)(i.map((function(n){var e=n.startX,r=n.startY,o=n.endX,a=n.name,c=n.area,s=(o-e)/2,i=e+s,u=r+s;return _().marker([i+8,u-8],{icon:_().icon({iconAnchor:[10,10],iconSize:[t,t],iconUrl:"".concat(V,"/shipStationIcon.svg")})}).bindPopup(D(i,u,"".concat(a," Pier"),c,5,!0),{className:"costum-popup-container",closeButton:!1})}))),(0,s.Z)(e.map((function(n){var e=n.startX,r=n.startY,o=n.endX,a=n.name,c=n.area,s=(o-e)/2,i=e+s,u=r+s;return _().marker([i+8,u-8],{icon:_().icon({iconAnchor:[10,10],iconSize:[t,t],iconUrl:"".concat(V,"/busStationIcon.svg")})}).bindPopup(D(i,u,"".concat(a," Bus Station"),c),{className:"costum-popup-container",closeButton:!1})}))))).setZIndex(1)}),[e,i]),m=(0,d.useMemo)((function(){var t=40;return _().layerGroup([].concat((0,s.Z)(i.map((function(n){var e=n.startX,r=n.startY,o=n.endX,a=n.name,c=n.area,s=(o-e)/2,i=e+s,u=r+s;return _().marker([i+8,u-8],{icon:_().icon({iconAnchor:[20,20],iconSize:[t,t],iconUrl:"".concat(V,"/shipStationIcon.svg")})}).bindPopup(D(i,u,"".concat(a," Pier"),c,5,!0),{className:"costum-popup-container",closeButton:!1})}))),(0,s.Z)(e.map((function(n){var e=n.startX,r=n.startY,o=n.endX,a=n.name,c=n.area,s=(o-e)/2,i=e+s,u=r+s;return _().marker([i+8,u-8],{icon:_().icon({iconAnchor:[20,20],iconSize:[t,t],iconUrl:"".concat(V,"/busStationIcon.svg")})}).bindPopup(D(i,u,"".concat(a," Bus Station"),c),{className:"costum-popup-container",closeButton:!1})}))))).setZIndex(1)}),[e,i]);(0,d.useEffect)((function(){n.on("zoomstart",function(){var t=(0,c.Z)(u().mark((function t(n){var e,r;return u().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,n.target;case 2:e=t.sent,(r=e._animateToZoom)<0&&A.remove(),r<2&&m.remove();case 6:case"end":return t.stop()}}),t)})));return function(n){return t.apply(this,arguments)}}()),n.on("zoom",function(){var t=(0,c.Z)(u().mark((function t(e){var r,o;return u().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.target;case 2:r=t.sent,(o=r._animateToZoom)>-1&&A.addTo(n),o>=2&&m.addTo(n);case 6:case"end":return t.stop()}}),t)})));return function(n){return t.apply(this,arguments)}}())}),[m,n,A]);var v=(0,d.useState)(),g=(0,a.Z)(v,2),Z=g[0],y=g[1],U=(0,d.useState)(),k=(0,a.Z)(U,2),B=k[0],I=k[1],b=(0,d.useState)(),C=(0,a.Z)(b,2),E=C[0],Y=C[1],T=(0,d.useState)(),O=(0,a.Z)(T,2),G=O[0],z=O[1],K=(0,d.useState)(),N=(0,a.Z)(K,2),F=N[0],P=N[1],L=(0,d.useMemo)((function(){var t;return f?null===(t=Object.values(f).find((function(t){var n=t.x1,e=t.x2,r=t.y1,o=t.y2,a=l.startX,c=l.startY,s=l.endX,i=l.endY;return+n===+a&&+r===+c&&+e===+s&&+o===+i})))||void 0===t?void 0:t.token_id:void 0}),[l,f]);return(0,d.useEffect)((function(){if(f&&p){var t=Object.values(f).map((function(t){var n=t.x1,e=t.x2,c=t.y1,s=t.y2,i=t.token_id,u=(0,o.Z)(t,Q),d=Object.entries(p).find((function(t){return+(0,a.Z)(t,1)[0]===+i}))||[null,{s:1}],l=(0,a.Z)(d,2)[1].s;return(0,r.Z)((0,r.Z)({},u),{},{startX:n,startY:c,endX:e,endY:s,status:+l})})),e=n.getZoom();y((function(r){r&&r.remove();var o=_().layerGroup(t.filter((function(t){var n=t.startX;return t.endX-n===50})).map((function(t){var n=t.startX,e=t.startY,r=t.endX,o=t.endY,a=t.custom_img;return _().imageOverlay(a||"".concat(V,"/sold0.png"),[[n+1,e+1],[r-1,o-1]])}))).setZIndex(201);return e>-3&&o.addTo(n),o})),I((function(r){r&&r.remove();var o=_().layerGroup(t.filter((function(t){var n=t.startX,e=t.endX,r=t.status;return e-n===40&&r>1})).map((function(t){var n=t.startX,e=t.startY,r=t.endX,o=t.endY,a=t.status,c=t.custom_img;return _().imageOverlay(c||"".concat(V,"/sold").concat(a,".png"),[[n+1,e+1],[r-1,o-1]])}))).setZIndex(201);return e>-2&&o.addTo(n),o})),Y((function(r){r&&r.remove();var o=_().layerGroup(t.filter((function(t){var n=t.startX,e=t.endX,r=t.status;return e-n===30&&r>1})).map((function(t){var n=t.startX,e=t.startY,r=t.endX,o=t.endY,a=t.status,c=t.custom_img;return _().imageOverlay(c||"".concat(V,"/sold").concat(a,".png"),[[n+1,e+1],[r-1,o-1]])}))).setZIndex(201);return e>-1&&o.addTo(n),o})),z((function(r){r&&r.remove();var o=_().layerGroup(t.filter((function(t){var n=t.startX,e=t.endX,r=t.status;return e-n===20&&r>1})).map((function(t){var n=t.startX,e=t.startY,r=t.endX,o=t.endY,a=t.status,c=t.custom_img;return _().imageOverlay(c||"".concat(V,"/sold").concat(a,".png"),[[n+1,e+1],[r-1,o-1]])}))).setZIndex(201);return e>0&&o.addTo(n),o})),P((function(r){r&&r.remove();var o=_().layerGroup(t.filter((function(t){var n=t.startX,e=t.endX,r=t.status;return e-n===10&&r>1})).map((function(t){var n=t.startX,e=t.startY,r=t.endX,o=t.endY,a=t.status,c=t.custom_img;return _().imageOverlay(c||"".concat(V,"/sold").concat(a,".png"),[[n+1,e+1],[r-1,o-1]])}))).setZIndex(201);return e>1&&o.addTo(n),o}))}}),[f,n,p]),(0,d.useEffect)((function(){n.on("zoomstart",(function(){Z&&Z.remove()})),n.on("zoom",(function(){var t=n.getZoom();Z&&t>-3&&Z.addTo(n)}))}),[Z,n]),(0,d.useEffect)((function(){n.on("zoomstart",(function(){B&&B.remove()})),n.on("zoom",(function(){var t=n.getZoom();B&&t>-2&&B.addTo(n)}))}),[B,n]),(0,d.useEffect)((function(){n.on("zoomstart",(function(){E&&E.remove()})),n.on("zoom",(function(){var t=n.getZoom();E&&t>-1&&E.addTo(n)}))}),[E,n]),(0,d.useEffect)((function(){n.on("zoomstart",(function(){G&&G.remove()})),n.on("zoom",(function(){var t=n.getZoom();G&&t>0&&G.addTo(n)}))}),[G,n]),(0,d.useEffect)((function(){n.on("zoomstart",(function(){F&&F.remove()})),n.on("zoom",(function(){var t=n.getZoom();F&&t>1&&F.addTo(n)}))}),[F,n]),(0,j.jsxs)("div",{className:X.Z["ui-container"],children:[(0,j.jsx)(S,{building:l,map:n}),(0,j.jsx)(R,{map:n}),(0,j.jsx)(M,{tokenId:L})]})}},3595:function(t){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoBAMAAAB+0KVeAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAtUExURUdwTP///////////////////////////////////////////////////////81e3QIAAAAPdFJOUwCmKT6RChUUNDOHaEldU+g277kAAAA7SURBVCjPY2AYxKDKFYugovDwEWRVAoGDcmCqACrIIogEHPAJsk02BoKL0iDSOGAYhZIEFsEQt8GcVAG2Ig3XiGygzgAAAABJRU5ErkJggg=="},4723:function(t){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoBAMAAAB+0KVeAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAASUExURUdwTP///////////////////4gZPH8AAAAGdFJOUwCmKT40H1Qsu4sAAAAnSURBVCjPY2AYBQMIgpQQQAEqxiyIBISwCYrAtCsbI4DCaGgOIAAA/UAGIeTupakAAAAASUVORK5CYII="},2526:function(t){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAMAAAC7IEhfAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAA5UExURf///////////////////////////////////////////////////////////////////////////7QQHh4AAAATdFJOU6ZADFQXK2kCkRZoh0ohUzU/IJLyNFBOAAABFklEQVQ4y62V6w6CMAyFS3c9E7y9/8PagRtz1kmi+0EI/dKm53SFwsFDP4A2RnsEtJFIIUnjNJJUTiFJqUt0eifpjfMTkfNC8gBchAsZDD4/BqWNCRu4vn3RceqT/QxyjPgMstMtXuwrKLoYjTNVT6r6FZDnlKYdLCRVnXWvfXmnjgvFa+5I2riTy8eu2niGROfcYD5P36nmyGnWBKINE6UuoIBS1Kog8mhN+QgyS2nLgl8lcMkf7xLF1gyaZjjWHHszKPK0JDZ50HFPwdEIHq4pzdwIjtZCfLYQr0OBmz4UjocLgA/N4+WvE27O9XKdR6Brr+syALldABiVxr5SMG4GxWt867rzeiDPWh1HdMRwAfzvr/AAq5gmQ5IKdPsAAAAASUVORK5CYII="}}]);
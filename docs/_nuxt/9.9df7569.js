(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{189:function(e,t,r){"use strict";r.d(t,"b",(function(){return n})),r.d(t,"c",(function(){return l})),r.d(t,"a",(function(){return c})),r.d(t,"d",(function(){return d}));var o=r(62),n=function(data){return Object(o.b)({method:"POST",url:"/api/users/login",data:data})},l=function(data){return Object(o.b)({method:"POST",url:"/api/users",data:data})},c=function(){return Object(o.b)({method:"GET",url:"/api/user"})},d=function(data){return Object(o.b)({method:"PUT",url:"/api/user",data:data})}},262:function(e,t,r){"use strict";r.r(t);r(78),r(30),r(31),r(13),r(63);var o=r(44),n=(r(29),r(4)),l=r(189);function c(object,e){var t=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(object,e).enumerable}))),t.push.apply(t,r)}return t}function d(e){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?c(Object(source),!0).forEach((function(t){Object(o.a)(e,t,source[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(source)):c(Object(source)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(source,t))}))}return e}var m=r(183),f={name:"settingIndex",middleware:"user",data:function(){return{user:{image:"",bio:"",email:"",username:"",password:""},disabled:!1}},mounted:function(){var e=this;return Object(n.a)(regeneratorRuntime.mark((function t(){var r,data,o,image,n,c,d;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,Object(l.a)();case 2:r=t.sent,data=r.data,o=data.user,image=o.image,n=o.bio,c=o.email,d=o.username,e.user={image:image,bio:n,email:c,username:d,password:""};case 6:case"end":return t.stop()}}),t)})))()},methods:{updateUser:function(){var e=this;return Object(n.a)(regeneratorRuntime.mark((function t(){var r,o,data;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,e.disabled=!0,(r=d({},e.user)).password||delete r.password,t.next=6,Object(l.d)({user:r});case 6:o=t.sent,data=o.data,e.$store.commit("setUser",data.user),m.set("user",data.user),e.$router.push("/profile/".concat(data.user.username)),t.next=16;break;case 13:t.prev=13,t.t0=t.catch(0),e.errorMsg=t.t0.response.data.errors;case 16:case"end":return t.stop()}}),t,null,[[0,13]])})))()}}},v=r(22),component=Object(v.a)(f,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"settings-page"},[r("div",{staticClass:"container page"},[r("div",{staticClass:"row"},[r("div",{staticClass:"col-md-6 offset-md-3 col-xs-12"},[r("h1",{staticClass:"text-xs-center"},[e._v("Your Settings")]),e._v(" "),r("form",{on:{submit:function(t){return t.preventDefault(),e.updateUser(t)}}},[r("fieldset",[r("fieldset",{staticClass:"form-group"},[r("input",{directives:[{name:"model",rawName:"v-model",value:e.user.image,expression:"user.image"}],staticClass:"form-control",attrs:{type:"text",placeholder:"URL of profile picture",disabled:e.disabled},domProps:{value:e.user.image},on:{input:function(t){t.target.composing||e.$set(e.user,"image",t.target.value)}}})]),e._v(" "),r("fieldset",{staticClass:"form-group"},[r("input",{directives:[{name:"model",rawName:"v-model",value:e.user.username,expression:"user.username"}],staticClass:"form-control form-control-lg",attrs:{type:"text",placeholder:"Your Name",disabled:e.disabled},domProps:{value:e.user.username},on:{input:function(t){t.target.composing||e.$set(e.user,"username",t.target.value)}}})]),e._v(" "),r("fieldset",{staticClass:"form-group"},[r("textarea",{directives:[{name:"model",rawName:"v-model",value:e.user.bio,expression:"user.bio"}],staticClass:"form-control form-control-lg",attrs:{disabled:e.disabled,rows:"8",placeholder:"Short bio about you"},domProps:{value:e.user.bio},on:{input:function(t){t.target.composing||e.$set(e.user,"bio",t.target.value)}}})]),e._v(" "),r("fieldset",{staticClass:"form-group"},[r("input",{directives:[{name:"model",rawName:"v-model",value:e.user.email,expression:"user.email"}],staticClass:"form-control form-control-lg",attrs:{disabled:e.disabled,type:"text",placeholder:"Email"},domProps:{value:e.user.email},on:{input:function(t){t.target.composing||e.$set(e.user,"email",t.target.value)}}})]),e._v(" "),r("fieldset",{staticClass:"form-group"},[r("input",{directives:[{name:"model",rawName:"v-model",value:e.user.password,expression:"user.password"}],staticClass:"form-control form-control-lg",attrs:{disabled:e.disabled,type:"password",placeholder:"Password"},domProps:{value:e.user.password},on:{input:function(t){t.target.composing||e.$set(e.user,"password",t.target.value)}}})]),e._v(" "),r("button",{staticClass:"btn btn-lg btn-primary pull-xs-right",attrs:{disabled:e.disabled}},[e._v("\n                Update Settings\n              ")])])])])])])])}),[],!1,null,null,null);t.default=component.exports}}]);
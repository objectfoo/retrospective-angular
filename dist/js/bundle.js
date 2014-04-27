angular.module("retrospective",[]).value("topicMeta",[]).value("version",5).controller("MainCtrl",["$scope","$filter","version","topicMeta","topicStorage","$templateCache","$interpolate",function MainCtrl(d,e,c,g,b,a,f){d.today=new Date();
d.version=c;d.$on("print",function(){var i="";var k=a.get("print-header.html");var j=a.get("print-placeholder.html");var h=a.get("print-topic.html");i+=f(k)({today:d.today});
g.forEach(function(l){var m=b.get(l.id);if(m.length>0){i+=f(j)({placeholder:l.placeholder});m.forEach(function(n){i+=f(h)(n);});}});document.write(i);});
}]);

angular.module("retrospective").factory("topicStorage",["$window",function(a){return{get:function(b){return angular.fromJson(a.localStorage.getItem(b)||"[]");
},put:function(c,b){a.localStorage.setItem(c,angular.toJson(b));},remove:function(b){a.localStorage.removeItem(b);}};}]);

angular.module("retrospective").controller("TopicCtrl",["$scope","$attrs","topicStorage","topicMeta",function(m,k,c,o){var e,b,f,a=k.topId;o.push({id:a,placeholder:k.topPlaceholder});
angular.extend(m,{model:{placeholder:k.topPlaceholder,editedTopic:null,newTopic:null,topics:c.get(a)},add:n,remove:d,editTopic:g,doneEditing:h,revertEditing:j});
f=m.model;b=f.topics;m.$watch("model.topics",i,true);m.$on("topics.clear",l);function i(){c.put(a,b);}function l(){b.length=0;}function n(p){if(p&&p.length){b.unshift({name:p});
f.newTopic="";}}function d(p){b.splice(b.indexOf(p),1);}function g(p){f.editedTopic=p;e=angular.extend({},p);}function h(p){if(f.editedTopic!==null){f.editedTopic=null;
if(p.name.length===0){d(p);}}}function j(p){b[b.indexOf(p)]=e;h(e);}}]);

angular.module("retrospective").directive("topVoting",[function(){return{priority:100,restrict:"A",require:"^TopicsCtrl",scope:"=",controller:["$scope","$rootScope",function(b,a){b.model.isVotingEnabled=true;
a.$on("sort",function(){b.model.topics.sort(function(e,d){var c=e.votes||0,f=d.votes||0;return c-f;});});b.add=function(c){if(c&&c.length){b.model.topics.unshift({name:c,votes:0});
b.model.newTopic="";}};b.increment=function(c){c.votes++;};}]};}]);

angular.module("retrospective").directive("escInInput",[function(){var a=27;return function(c,d,b){d.on("keydown",function(f){if(f.keyCode===a){c.$apply(b.escInInput);
}});};}]);

angular.module("retrospective").directive("focusInput",["$timeout",function todoFocus(a){return function(c,d,b){c.$watch(b.focusInput,function(e){if(e){a(function(){d[0].focus();
},0,false);}});};}]);

angular.module("retrospective").directive("forceNumeric",[function(){return{require:"ngModel",restrict:"A",link:["$scope","$element","$attrs","ngModelCtrl",function(a,d,c,b){b.$parsers.push(e);
function e(g){var f=g.replace(/[^0-9]/g,"");if(f!==g){b.$setViewValue(f);b.$render();}return f;}}]};}]);


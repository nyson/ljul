(this.webpackJsonpljul=this.webpackJsonpljul||[]).push([[0],[,,,,,,,,function(e,t,n){e.exports=n(16)},,,,,function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),o=n(7),i=n.n(o),s=(n(13),n(1)),u=n(2),c=n(4),l=n(3),f=n(5),v=(n(14),function(e){function t(e){var n;return Object(s.a)(this,t),(n=Object(c.a)(this,Object(l.a)(t).call(this,e))).state={hover:!1,value:n.props.max},n}return Object(f.a)(t,e),Object(u.a)(t,[{key:"enter",value:function(e){this.setState({hover:!0})}},{key:"leave",value:function(e){this.setState({hover:!1})}},{key:"render",value:function(){var e=this;return r.a.createElement("div",{key:this.props.id,className:"bar "+(this.state.hover?"hover":""),onMouseEnter:function(t){return e.enter(t)},onMouseLeave:function(t){return e.leave(t)},style:{height:100*this.props.value+"%"}})}}]),t}(r.a.Component)),h=function(e){function t(e){var n;Object(s.a)(this,t),n=Object(c.a)(this,Object(l.a)(t).call(this,e));var a=Array.from({length:10},(function(e){return{value:1}}));return n.state={bars:a,isDrawing:!1},n}return Object(f.a)(t,e),Object(u.a)(t,[{key:"startDrawing",value:function(e){this.setState({isDrawing:!0})}},{key:"stopDrawing",value:function(e){this.setState({isDrawing:!1}),console.log(this.state.bars.map((function(e){return Math.round(100*e.value)})))}},{key:"render",value:function(){var e=this;return r.a.createElement("div",{className:"sequencer",onMouseMove:function(t){return e.drawIfClicked(t)},onMouseDown:function(t){return e.startDrawing(t)},onMouseUp:function(t){return e.stopDrawing(t)}},this.state.bars.map((function(t,n){return r.a.createElement(v,{key:n,id:n,max:e.props.max,min:e.props.min,value:t.value})})))}},{key:"drawIfClicked",value:function(e){this.state.isDrawing&&this.updateAtPosition(e)}},{key:"updateAtPosition",value:function(e){var t=[e.pageX-e.currentTarget.offsetLeft,e.pageY-e.currentTarget.offsetTop,e.currentTarget.offsetHeight,e.currentTarget.offsetWidth],n=t[0],a=t[3],r=1-t[1]/t[2],o=Math.floor(n/(a/this.props.bars)),i=this.state.bars;i[o].value=r,this.setState({bars:i})}},{key:"barClick",value:function(e){console.log(e),console.log(e.clientX,e.clientY),console.log(e.nativeEvent.offsetX,e.nativeEvent.offsetY),console.log(e.currentTarget)}}]),t}(r.a.Component);n(15);var p=function(){return r.a.createElement("div",{className:"App"},r.a.createElement(h,{max:1,min:0,bars:10}))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(r.a.createElement(p,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}],[[8,1,2]]]);
//# sourceMappingURL=main.6cc52170.chunk.js.map
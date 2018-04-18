# svg-test

## 组件属性初始化

```javascript react
<Cp initAttr={{ width : 100, height : 200, fill : 'red', x:100, y:100 }}/>
```
initAttr为初始化组件属性。

## 事件绑定

```JavaScript
/* ... */
const events = {
  create: (ins) => {this.ins=ins},
  click: (e,ins) => {console.log('You clicked')},
}
<Comp events={events}  />
/* ... */
```
其中e为触发事件，ins为组件实例。
事件支持
click, dblclick, mousedown, mouseup, mouseover, mouseout, mousemove, touchstart, touchmove, touchleave, touchend, touchcancel

额外添加create事件，在组件创建时触发, ins为组件实例。
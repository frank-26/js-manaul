/*
会创建一个新函数。当这个新函数被调用时，bind() 的第一个参数将作为它运行时的 this，之后的一序列参数将会在传递的实参前传入作为它的参数。
https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Function/bind
*/
//  Does not work with `new funcA.bind(thisArg, args)`
class PuerComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {  };
  }
  shouldComponentUpdate(nextProps, nextState, nextContext) {
     const {props, state} = this;
     // 浅比较（只比较直接属性是否相等）：坑点在于属性的类型如果是引用类型的，如果发生改变可能不被更新
     function shadowCompare(a, b){
      if(a===b) return true;
      if(Object.keys(a).length !== Object.keys(b).length) return false;
      return Object.keys(a).every(key=>a[key] === b[key])
     }

     return !shadowCompare(props, nextProps) && !shadowCompare(state, nextState)
  }
  render() {
    return (
      <></>
    );
  }
}

export default puerComponent;

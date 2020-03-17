export function memorize(func) {
  let prev; // 保存上一次参数
  let prevValue; //上一次值
  let init = false; // 是否初始化
  return param => {
    if (!init) {
      prevValue = func(param);
      prev = param;
      init = true;
    } else if (!Object.is(prev, param)) { // 浅比较
      prevValue = func(param);
      prev = param; //NOTE
    }
    return prevValue;
  };
}

//use 
class SomeComponent extends Component {
  getBar = memorize(foo => {
    // ...
  });

  render() {
    const {
      foo
    } = this.props;
    const bar = this.getBar(foo);
    // ...
  }
}
// 而有些情况需要使用到getDerivedStateFromProps，例如某个参数会影响组件的内部状态，
// 这时候我们需要把前一次的值存在state上，例如：
/**上层组件更新和组件本身setState都会触发getDerivedStateFromProps，
我们可以通过比较props是不是同一个对象来知道这次更新是由上层触发的还是组件本身触发的，
当props不是同一个对象时，说明这次更新来自上层组件，
*/
class SomeComponent extends Component {
  state = {
    prevType: this.props.type,
    // ...
  };

  static getDerivedStateFromProps({
    type
  }, {
    prevType
  }) {
    if (type !== prevType) {
      return {
        prevType: type,
        // ...
      };
    }
    return null;
  }
}
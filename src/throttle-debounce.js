// 单位时间内，只触发最后一次（NOTE: 频繁触发以最后一次触发生效）
// 当一次事件发生后，事件处理器要等一定阈值的时间，如果这段时间过去后再也没有事件发生，就处理最后一次发生的事件。
//假设还差 0.01 秒就到达指定时间，这时又来了一个事件，那么之前的等待作废，需要重新再等待指定时间。

/*
 * 使用场景：
1. 按钮提交场景：防止多次提交按钮，只执行最后提交的一次
2. 服务端验证场景：表单验证需要服务端配合，只执行一段连续的输入事件的最后一次，
3. 搜索联想词功能类似
**/
function debounce(fn, delay){
    let timer = null;
    return (...args)=>{
        if(timer){
            clearTimeout(timer);
        }
        timer = setTimeout(()=>{
            fn.apply(this, args)
        },delay);
    }
}
// 在单位时间内，只能触发一次（NOTE: 频繁触发以最初一次触发生效）
//可以理解为事件在一个管道中传输，加上这个节流阀以后，事件的流速就会减慢。实际上这个函数的作用就是如此，它可以将一个函数的调用频率限制在一定阈值内，
//例如 1s，那么 1s 内这个函数一定不会被调用两次
/**
 * 使用场景：
    1.拖拽场景：固定时间内只执行一次，防止超高频次触发位置变动
    2. 缩放场景：监控浏览器resize
    3. 动画场景：避免短时间内多次触发动画引起性能问题
*/
function thorottle(fn, s){
    let flag = false;
    return (...arg)=>{
        if(flag) return;
        flag = true;
        setTimeout(()=>{
            fn.applay(this,arg);
            flag = false;
        },s)
    }
}

function throttle2(fn, wait) {
	let prev = new Date();
	return function() { 
	    const args = arguments;
		const now = new Date();
		if (now - prev > wait) {
			fn.apply(this, ...args);
			prev = new Date();// 注意别忘记了更新
		}
    }
}

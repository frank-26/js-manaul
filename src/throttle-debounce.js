// 单位时间内，只触发最后一次（以后触发为准）
// 当一次事件发生后，事件处理器要等一定阈值的时间，如果这段时间过去后 再也没有 事件发生，就处理最后一次发生的事件。
//假设还差 0.01 秒就到达指定时间，这时又来了一个事件，那么之前的等待作废，需要重新再等待指定时间。
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
// 在单位时间内，只能触发一次（以前触发为准）
//可以理解为事件在一个管道中传输，加上这个节流阀以后，事件的流速就会减慢。实际上这个函数的作用就是如此，它可以将一个函数的调用频率限制在一定阈值内，
//例如 1s，那么 1s 内这个函数一定不会被调用两次
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
			fn.apply(this, args);
			prev = new Date();
		}
    }
}

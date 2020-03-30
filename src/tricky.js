const a = {
    num: 0,
    // 改写 valueOf
    valueOf: function() {
      return this.num += 1
    }
  };
  const equality = (a==1 && a==2 && a==3);
  console.log(equality); // true
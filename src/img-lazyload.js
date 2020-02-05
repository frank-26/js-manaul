const testImgUrl1 =
  "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3167343720,497093674&fm=200&gp=0.jpg";
const testImgUrl2 =
  "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=874245974,1655466667&fm=26&gp=0.jpg";
const html = new Array(1000).fill("").reduce((html, value, index) => {
  let image = index & 1 ? testImgUrl1 : testImgUrl2;
  html += `<div class="img" >
  <img class="pic" alt="loading" data-src=${image} >
</div>
`;
  return html;
}, "");

document.getElementById("app").innerHTML = `
${html}
`;

const imgs = document.getElementsByTagName("img");
const viewHeight = window.innerHeight || document.documentElement.clientHeight;
let num = 0;
function lazyload() {
  for (let i = num; i < imgs.length; i++) {
    let distance = viewHeight - imgs[i].getBoundingClientRect().top;
    // if element was shown
    if (distance >= 0) {
      imgs[i].src = imgs[i].getAttribute("data-src");
      num = i + 1;
    }
  }
}
function throttle(fn, delay) {
  let last = 0,
    timer = null;

  return function() {
    let args = arguments;
    let now = +new Date();

    if (now - last < delay) {
      clearTimeout(timer);
      timer = setTimeout(e => {
        last = now;
        fn.apply(this, args);
      }, delay);
    } else {
      last = now;
      fn.apply(this, args);
    }
  };
}
lazyload();
document.addEventListener("scroll", throttle(lazyload, 100));

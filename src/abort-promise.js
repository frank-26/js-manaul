function fetchWithCancel(url, option) { 
    const xhr = new XMLHttpRequest();
   // xhr.open("GET", url);
    return new Promise(function(resolve, reject) {
       const {cancel, ...params} = option
       xhr.onload = function() {
         //resolve(xhr.responseText); 
         fetch(url,params).then(resolve)
       };
       option.cancel = function() {  
         xhr.abort();
         reject(new Error("Cancelled")); 
       };
       xhr.onerror = reject;
    });
 }
 
 // application: closure implemented
 function lastest(fn) {
     const lastToken = { cancel: function(){} };
     // init
     return function() {
         lastToken.cancel();
         const args =[...arguments,lastToken];
         return fn.apply(this, args);
     };
 }
 
 // test
 var synced = lastest(fetchWithCancel);
 synced("/url1?q=a"); // this will get canceled 
 synced("/url1?q=ab"); // this will get canceled too
 synced("/url1?q=abc");  // this will get canceled too
 synced("/url1?q=abcd").then(function() {
     // only this will run
 });
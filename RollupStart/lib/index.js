var e;!function(e){e.expire="__expire__",e.permanent="permanent"}(e||(e={}));class r{get(r){const t=localStorage.getItem(r);if(t){const a=JSON.parse(t),l=(new Date).getTime();return"number"==typeof a[e.expire]&&a[e.expire]<l?(this.remove(r),{message:`您的${r}已过期`,value:null}):{message:"成功读取",value:a.value}}return{message:"值无效",value:null}}set(r,t,a=e.permanent){const l={value:t,[e.expire]:a};localStorage.setItem(r,JSON.stringify(l))}remove(e){localStorage.removeItem(e)}clear(){localStorage.clear()}}export{r as Storage};
//# sourceMappingURL=index.js.map

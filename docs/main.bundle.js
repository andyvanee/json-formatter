const e=new URLSearchParams(window.location.search).get("j"),n={type:"base64",compression:"DEFLATE",checkCRC32:!0,compressionOptions:{level:9}},t=document.getElementById("jsoneditor"),o=new JSONEditor(t,{mode:"tree",modes:["code","tree"]},{test:!0});if(e){const n=decodeURIComponent(e);(new JSZip).loadAsync(n,{base64:!0}).then(e=>e.file("a.json").async("text")).then(e=>{o.set(JSON.parse(e)),o.expandAll()})}window.addEventListener("keydown",e=>{e.metaKey&&"s"==e.key&&(e.preventDefault(),(()=>{const e=JSON.stringify(o.get()),t=new JSZip;t.file("a.json",e),t.generateAsync(n).then(e=>{window.location.search=`j=${encodeURIComponent(e)}`})})())});

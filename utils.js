async function * RequestGenerator(url, type){
  const req = await fetch(url);
  if(!req.ok){ throw new Error(req.status); }
  switch(type) {
    case "text": yield await req.text(); break;
    case "json": yield await req.json(); break;
    case "blob": yield await req.blob(); break;
    case "bytes": yield await req.bytes(); break;
    case "formData": yield await req.formData(); break;
    case "arrayBuffer": yield await req.arrayBuffer(); break;
    default: yield await req.json(); break;
  }
}
export {
  RequestGenerator
}

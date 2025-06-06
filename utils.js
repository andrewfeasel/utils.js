"use strict";
const $ = x => document.querySelector(x);
const $$ = x => Array.from(document.querySelectorAll(x));
async function * RequestGenerator(req, type = "json") {
  const res = await fetch(req);
  if(!res.ok){ throw new Error(res.status); }
  if(typeof res[type] !== "function") { 
    throw new Error(`Invalid type '${type}'. Expected one of: text, json, blob, bytes, arrayBuffer, formData.`);
  } 
  yield await res[type]();
}
async function BatchRequest(arr) {
  return await Promise.all(arr.map( async ({ url, type }) => {
    const gen = RequestGenerator(url, type);
    return (await gen.next()).value;
  }));
}
export {
  $, $$, RequestGenerator, BatchRequest
};

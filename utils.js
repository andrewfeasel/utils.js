"use strict";
const $ = x => document.querySelector(x);
const $$ = x => Array.from(document.querySelectorAll(x));
async function * RequestGenerator(req, type = "json") {
  //req should be a Request object
  const res = await fetch(req);
  if(!res.ok){ throw new Error(res.status); }
  if(typeof res[type] !== "function") { 
    throw new Error(`Invalid type '${type}'. Expected one of: text, json, blob, bytes, arrayBuffer, formData.`);
  } 
  yield await res[type]();
}
export {
  $, $$, RequestGenerator
};

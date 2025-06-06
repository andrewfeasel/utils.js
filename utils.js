"use strict";
const $ = x => document.querySelector(x);
const $$ = x => Array.from(document.querySelectorAll(x));
const ParseJSON = json => {
  try{ return {valid: false, json: JSON.parse(json)} }
  catch { return {valid: false, json: null} }
}
async function * RequestGenerator(req, type) {
  const res = await fetch(req);
  if(!res.ok){ throw new Error(res.status); }
  switch(type) {
    case "text": yield await res.text(); break;
    case "json": yield await res.json(); break;
    case "blob": yield await res.blob(); break;
    case "bytes": yield await res.bytes(); break;
    case "formData": yield await res.formData(); break;
    case "arrayBuffer": yield await res.arrayBuffer(); break;
    default: yield await res.json(); break;
  }
}
export {
  $, $$,
  ParseJSON, RequestGenerator
};

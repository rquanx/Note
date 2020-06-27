import d, {
    c
} from "./default";
import e, {
    b
} from "./export";
import eo, {
    a
} from "./exports";

console.log(d, c, e, b, eo, a)
//  export default d  ==>  { default: d,... }
//  import d ==>  import * as d , 需要 d.default 才读到 d     
// { c } ==> import * as d ,  d.c

//  export var e = {}  ==> { e: {},... }
//  import e ==>  需要e.e才读到值 
//  或 import { e }   ==> e

//  export { e } === export var e

/**
 * export var e  &&  export default e;   ==>  { e:{},default: e, .. }
 * 
 */
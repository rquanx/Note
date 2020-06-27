 /**
  * create vElement
  * @param {*} type 
  * @param {*} props 
  * @param  {...any} children 
  */
 function createElement(type, props, ...children) {
     if (children && children.length > 0) {
        children = expandArray(children);
     }
     return {
         type,
         props,
         children
     }
 }

 /**
  * 
  * @param {[]} arr 
  */
 function expandArray(arr) {
     let result = [];
     arr.forEach((item) => {
         if (item && item.length > 0 && Array.isArray(item)) {
             result = [...result, ...expandArray(item)]
         } else {
             if (Array.isArray(item)) {
                 result = [...result, ...item];
             } else [
                 result.push(item)
             ]
         }
     });
     return result;
 }
 export default createElement;
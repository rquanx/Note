/**
 * 主题:建议的async/await + 模拟Generator
 * 2021-02-11
 * 
 * 重点: context上下文记录状态 + 代码异步切割 + 未完成时多次调用
 * 
 */

const p1 = () =>
  new Promise((res, rej) => {
    console.log("p1 start");
    setTimeout(() => {
      console.log("p1 done");
      res(1);
    });
  });

const p2 = () =>
  new Promise((res, rej) => {
    console.log("p2 start");
    setTimeout(() => {
      console.log("p2 done");
      res(2);
    });
  });

  
function run(gen) {
  //把返回值包装成promise
  return new Promise((resolve, reject) => {
    var g = gen();
    function _next(val) {
      //错误处理
      try {
        var res = g.next(val);
      } catch (err) {
        return reject(err);
      }
      if (res.done) {
        return resolve(res.value);
      }
      //res.value包装为promise，以兼容yield后面跟基本类型的情况
      Promise.resolve(res.value).then(
        (val) => {
          _next(val);
        },
        (err) => {
          //抛出错误
          g.throw(err);
        }
      );
    }
    _next();
  });
}

const wrap = (f) => {
  let done = false;
  let context = {
    prev: 0,
    next: 0,
    sent: undefined,
    stop: () => {
      done = true;
    },
    abrupt: (type, result) => {
      done = true;
      return result;
    },
  };
  const ex = () => {
    return {
      next: (v) => {
        context.sent = v;
        if (context.next === undefined) {
          context.next = "end";
        }
        let r = f(context);
        return {
          done,
          value: r,
        };
      },
      throw: () => {},
    };
  };
  return ex;
};


// const app = async () => {
//   console.log("start");
//   let r1 = await p1();
//   console.log("next" + r1);
//   let r2 = await p2();
//   console.log("end" + r2);
//   return 3;
// };


function _callee() {
  var r1, r2;
  return wrap(function _callee$(_context) {
    while (1) {
      switch ((_context.prev = _context.next)) {
        case 0:
          console.log("start");
          _context.next = 3;
          return p1();

        case 3:
          r1 = _context.sent;
          console.log("next" + r1);
          _context.next = 7;
          return p2();

        case 7:
          r2 = _context.sent;
          console.log("end" + r2);
          return _context.abrupt("return", 3);
        case 9:
        case "end":
          return _context.stop();
      }
    }
  });
}

run(_callee()).then((r) => {
  console.log(`then ${r}`);
});

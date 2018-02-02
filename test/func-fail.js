"use strict";

const xclap = require("..");

// sample to test a function task that fails

const tasks = {
  fnFail: () => {
    throw new Error("fnFail throwing");
  },
  fnFoo2: "echo hello from foo2",
  fnFoo: {
    task: () => {
      console.log("fnFoo");
      return new Promise(resolve => setTimeout(resolve, 500)).then(() => {
        console.log("fnFoo async");
        return "fnFoo2";
      });
    },
    finally: ["fooCleanup"]
  },
  fooCleanup: () => {
    console.log("woop finally");
  },
  shFooX: {
    task: "~$blah",
    finally: "~$echo err $XCLAP_ERR fail $XCLAP_FAILED"
  },
  fooConcurrent: [["fnFoo", "fnFail"]]
};

xclap.load(tasks).run("fooConcurrent");

// 插件构造函数
function HelloWorldPlugin(options) {
  // 插件初始化做一些处理
}

HelloWorldPlugin.prototype.apply = function(compiler) {

  // 编译器开始编译
  compiler.plugin("compile", function(params) {
    console.log("The compiler is starting to compile...");
  });

  // 编译器开始一个新的编译
  compiler.plugin("compilation", function(compilation) {
    console.log("The compiler is starting a new compilation...");

    // 编译器开始优化文件
    compilation.plugin("optimize", function() {
      console.log("The compilation is starting to optimize files...");
    });

  });

  // 编译器将要提交文件
  compiler.plugin("emit", function(compilation, callback) {
    console.log("The compilation is going to emit files...");
    
    // 异步处理
    setTimeout(function() {
      console.log("Done with async work...");
      callback();
    }, 1000);

  });

  // 所有的处理都已经完成
  compiler.plugin('done', function() {
    console.log('Hello World!'); 
  });

};

module.exports = HelloWorldPlugin;
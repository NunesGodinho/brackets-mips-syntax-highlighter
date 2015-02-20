(function(mod) {
  if (typeof exports == "object" && typeof module == "object") // CommonJS
    mod(require("../../lib/codemirror"));
  else if (typeof define == "function" && define.amd) // AMD
    define(["../../lib/codemirror"], mod);
  else // Plain browser env
    mod(CodeMirror);
})(function(CodeMirror) {
  "use strict";

CodeMirror.defineMode("mips",function(){
  
    var curWord = stream.next();
    
    if (stream.eatWhile('\w')){
    }
    else if(stream.eat('#')){
       stream.skipToEnd();
       return 'comment';
    }
    
  
});
    
    //CodeMirror.defineMIME("text/mips","mips");
    
});
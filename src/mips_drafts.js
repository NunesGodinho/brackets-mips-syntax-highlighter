// CodeMirror, copyright (c) by Marijn Haverbeke and others
// Distributed under an MIT license: http://codemirror.net/LICENSE

(function(mod) {
  if (typeof exports == "object" && typeof module == "object") // CommonJS
    mod(require("../../lib/codemirror"));
  else if (typeof define == "function" && define.amd) // AMD
    define(["../../lib/codemirror"], mod);
  else // Plain browser env
    mod(CodeMirror);
})(function(CodeMirror) {
"use strict";

CodeMirror.defineMode('mips', function() {
    
    //var DEFINITIONS = ".data";
    
    //var TEST = /\.[248]byte/; //don't even know if this is correct syntax
    
    //var myDefinitions = /\.(d(ata)|t(ext)|g(lobl))\b/i;
    
    var myDefinitions = /\.([248]?byte|a(ent|lias|lign|sciiz|scii|sm0)|b(gnb)|c(omm|app|padd|pload|plocal|prestore|preturn|psetup)|d(ata|ouble|word)|e(ndr|ndb|nd|nt|xtern|rr)|f(ile|loat|mask|rame)|g(jaldef|jallive|jrlive|lobl|pword)|h(alf)|l(ab|comm|ivereg|oc)|m(ask)|n(ada|oalias|op)|o(ption|rigin)|r(epeat|data)|s(data|ection|et|ize|pace|truct)|t(ext|ype)|v(erstamp|reg)|w(eakext|ord))\b/i;
    
    var myRegisters = /\$(a([0-3]|t)|f(p)|g(p)|k([0-1])|r(a)|s([0-8]|p)|t(\d)|v([0-1])|zero)\b/i;
    
    var myKeywords = /\b(a(bs|ddiu|ddi|ddu|dd|ndi|nd)|b(czt|czf|eqz|eq|gezal|gez|geu|ge|gtu|gtz|gt|leu|lez|le|ltu|lt|nez|ltzal|ltz|ne|qez|)|d(ivu|iv)|e(ret)|j(al|r|)|l(a|b|i|ui|w)|m(fc0|ove|ulou|ulo|ult|ul|tc0)|n(egu|eg|omove|or|ot)|o(ri|r)|r(emu|em|ol|or)|s(b|eq|geu|ge|gtu|gt|leu|le|ne|llv|ll|ltiu|lti|ltu|lt|rav|ra|rlv|rl|ubu|ub|w|yscall)|x(ori|or))\b/i;
    
    var myNumbers = /\b([\da-f]+h|[0-7]+o|[0-1]+b|\d+)\b/i;
    
    var myError = /(\B|\D)\(\$(a([0-3]|t)|f(p)|g(p)|k([0-1])|r(a)|s([0-8]|p)|t(\d)|v([0-1])|zero)\)/i;
    
    var myVariables;
    
    return {
        startState: function(){
            return {context: 0};        
        },
        token: function(stream, state){
            
            if (stream.eatSpace()){
                return null;
            }
            
            var thisItem;            
            
            if (stream.eatWhile(/\w/)){
                thisItem = stream.current();
                
                if (myNumbers.test(thisItem)){
                    return 'number';
                }
                else if (myKeywords.test(thisItem)){
                    return 'keyword';
                }
                /*else if (myError.test(thisItem)){
                    return 'error';
                }//*/
                
            }
            else if (stream.eat('#')){
                stream.skipToEnd();
                return 'comment';
            }
            else if (stream.eat('"')) {
                while (thisItem = stream.next()) {
            
                    if (thisItem == '"'){
                        break;
                    }
                }
                return 'string';
                
            }
            else if (stream.eat('.')){
                
                if (stream.eatWhile(/\w/)){
                    thisItem = stream.current();
                    if (myDefinitions.test(thisItem)){
                        return 'def';
                    }
                    return null;
                    
                }
                
                //stream.next();
                //thisItem = stream.current();
                
                if(stream.eatWhile(/\w/)){
                    return 'def';
                }
            }
            else if(stream.eat('$')){
                
                if(stream.eatWhile(/\w/)){
                    thisItem = stream.current();
                    
                    if (myRegisters.test(thisItem)){
                        return 'atom';
                    }                    
                }
                
            }
            else {                
                
                if(false){
                }
                else {
                    stream.next();
                }
            }
            
            return null;
            
            
            
            
        }
    };
    //*/
    /*
  var keywords1 = /^(exx?|(ld|cp|in)([di]r?)?|pop|push|ad[cd]|cpl|daa|dec|inc|neg|sbc|sub|and|bit|[cs]cf|x?or|res|set|r[lr]c?a?|r[lr]d|s[lr]a|srl|djnz|nop|rst|[de]i|halt|im|ot[di]r|out[di]?)\b/i;
  var keywords2 = /^(call|j[pr]|ret[in]?)\b/i;
  var keywords3 = /^b_?(call|jump)\b/i;
  var variables1 = /^(af?|bc?|c|de?|e|hl?|l|i[xy]?|r|sp)\b/i;
  var variables2 = /^(n?[zc]|p[oe]?|m)\b/i;
  var errors = /^([hl][xy]|i[xy][hl]|slia|sll)\b/i;
  var numbers = /^([\da-f]+h|[0-7]+o|[01]+b|\d+)\b/i;

  return {
    startState: function() {
      return {context: 0};
    },
    token: function(stream, state) {
      if (!stream.column())
        state.context = 0;

      if (stream.eatSpace())
        return null;

      var w;

      if (stream.eatWhile(/\w/)) {
        w = stream.current();

        if (stream.indentation()) {
          if (state.context == 1 && variables1.test(w))
            return 'variable-2';

          if (state.context == 2 && variables2.test(w))
            return 'variable-3';

          if (keywords1.test(w)) {
            state.context = 1;
            return 'keyword';
          } else if (keywords2.test(w)) {
            state.context = 2;
            return 'keyword';
          } else if (keywords3.test(w)) {
            state.context = 3;
            return 'keyword';
          }

          if (errors.test(w))
            return 'error';
        } else if (numbers.test(w)) {
          return 'number';
        } else {
          return null;
        }
      } else if (stream.eat('#')) {
        stream.skipToEnd();
        return 'comment';
      } else if (stream.eat('"')) {
        while (w = stream.next()) {
          if (w == '"')
            break;

          if (w == '\\')
            stream.next();
        }
        return 'string';
      } else if (stream.eat('\'')) {
        if (stream.match(/\\?.'/))
          return 'number';
      } else if (stream.eat('.') || stream.sol() && stream.eat('#')) {
        state.context = 4;

        if (stream.eatWhile(/\w/))
          return 'def';
      } else if (stream.eat('$')) {
        if (stream.eatWhile(/[\da-f]/i))
          return 'number';
      } else if (stream.eat('%')) {
        if (stream.eatWhile(/[01]/))
          return 'number';
      } else {
        stream.next();
      }
      return null;
    }
  };
    
    //*/
});

//CodeMirror.defineMIME("text/mips", "mips");

});


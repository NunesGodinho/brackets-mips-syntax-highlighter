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
    
    var myDefinitions = /\.([248]?byte|a(ent|lias|lign|sciiz|scii|sm0)|b(gnb)|c(omm|app|padd|pload|plocal|prestore|preturn|psetup)|d(ata|ouble|word)|e(ndr|ndb|nd|nt|xtern|rr)|f(ile|loat|mask|rame)|g(jaldef|jallive|jrlive|lobl|pword)|h(alf)|k(data|text)|l(ab|comm|ivereg|oc)|m(ask)|n(ada|oalias|op)|o(ption|rigin)|r(epeat|data)|s(data|ection|et|ize|pace|truct)|t(ext|ype)|v(erstamp|reg)|w(eakext|ord))\b/i;
    
    var myRegisters = /\$(a([0-3]|t)|f(p)|g(p)|k([0-1])|r(a)|s([0-8]|p)|t(\d)|v([0-1])|zero)\b/i;
    
    var myKeywords = /\b(a(bs|ddiu|ddi|ddu|dd|ndi|nd)|b(czt|czf|eqz|eq|gezal|gez|geu|ge|gtu|gtz|gt|leu|lez|le|ltu|lt|nez|ltzal|ltz|ne|qez|)|c(lo|lz)|d(ivu|iv)|e(ret)|j(alr|al|r|)|l(a|bu|b|d|hu|h|i|ui|wcl|wl|wr|w)|m(addu|add|fc0|ove|sub|ulou|ulo|ult|ul|tc0)|n(egu|eg|omove|or|ot)|o(ri|r)|r(emu|em|ol|or)|s(b|c|dcl|d|eq|geu|ge|gtu|gt|h|leu|le|ne|llv|ll|ltiu|lti|ltu|lt|rav|ra|rlv|rl|ubu|ub|wcl|wr|wl|w|yscall)|t(eqi|eq|geu|geiu|gei|ge|ltu|ltiu|lti|lt)|u(lhu|lh|lw|sc|sh|sw)|x(ori|or))\b/i;
    
    var myNumbers = /\b([\da-f]+h|[0-7]+o|[0-1]+b|\d+)\b/i;
    
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
                stream.next();
            }
            
            return null;
            
        }
    };
    
});
    
});


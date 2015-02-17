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
    
  var keywords = ("abs|add|addi|addiu|addu|and|andi|b|bczt|bczf|beq|beqz|bge|bgez|bgeu|"+
                  "bgezal|bgt|bgtu|bgtz|ble|bleu|blez|blt|bltu|bnez|bltzal|bltz|"+                 
                  "bne|bqez|div|divu|eret|j|jal|jr|la|lb|li|lui|lw|mfc0|move|mul|mulo|"+
                  "mulou|mult|mtc0|neg|negu|nomove|nor|not|or|ori|rem|remu|rol|ror|sb|"+
                  "seq|sge|sgeu|sgt|sgtu|sle|sleu|sne|sll|sllv|slt|slti|sltu|sltiu|"+
                  "sra|srav|srl|srlv|sub|subu|sw|syscall|xor|xori").split("|");
  var blockKeywords = "try catch finally do else for if switch while".split(" ");
  var atoms = ".data .text".split(" ");
  var builtins = ".2byte .4byte .8byte .aent .alias .align .ascii .asciiz .asm0 .bgnb .byte .comm .cpadd .cpload .cplocal .cprestore .cpreturn .cpsetup .double .dword .end .endb .endr .ent .extern .err .file .float .fmask .frame .globl .gjaldef .gjallive .gjrlive .gpword .half .lab .lcomm .livereg .loc .mask .nada .noalias .nop .option .origin .repeat .rdata .sdata .section .set .size .space .struct .type .verstamp .vreg .weakext .word".split(" ");

  function set(words) {
    var obj = {};
    for (var i = 0; i < words.length; ++i) obj[words[i]] = true;
    return obj;
  }

  CodeMirror.defineMIME("application/dart", {
    name: "clike",
    keywords: set(keywords),
    multiLineStrings: true,
    blockKeywords: set(blockKeywords),
    builtin: set(builtins),
    //atoms: set(atoms),
    hooks: {
      "@": function(stream) {
        stream.eatWhile(/[\w\$_]/);
        return "meta";
      }
    }
  });

  //CodeMirror.registerHelper("hintWords", "application/dart", keywords.concat(atoms).concat(builtins));

  // This is needed to make loading through meta.js work.
  CodeMirror.defineMode("mips", function(conf) {
    return CodeMirror.getMode(conf, "application/mips");
  }, "clike");
});
});
   
  // CodeMirror.defineMIME("text/mips","mips");
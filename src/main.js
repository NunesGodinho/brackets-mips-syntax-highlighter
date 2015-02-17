/*jslint devel:true */

define(function (require, exports, module) {
	'use strict';
    
    CodeMirror.defineMode();
	var LanguageManager = brackets.getModule("language/LanguageManager"),
        CodeMirror = brackets.getModule("thirdparty/CodeMirror2/lib/codemirror"),
        MIPS_mode = require("mips");
	
	LanguageManager.defineLanguage("MIPS", {
		name: "MIPS",
		mode: "MIPS",
		fileExtensions: ["s", "S", "sx"],
		lineComment: ["#"]
	});

	console.log("MIPS Assembly syntax highlighting extension loaded");
});

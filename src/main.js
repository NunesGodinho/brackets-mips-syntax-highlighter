/*jslint devel:true */

define(function (require, exports, module) {
	'use strict';
	var LanguageManager = brackets.getModule("language/LanguageManager");
	
	LanguageManager.defineLanguage("MIPS", {
		name: "MIPS",
		mode: "MIPS",
		fileExtensions: ["s", "S", "sx"],
		lineComment: ["#"]
	});

	console.log("MIPS Assembly syntax highlighting extension loaded");
});

define(function (require, exports, module) {
    "use strict";
    var LanguageManager = brackets.getModule("language/LanguageManager");

    LanguageManager.defineLanguage("mips", {
        name: "MIPS",
        mode: "mips",
        fileExtensions: ["s","sx"],
        lineComment: ["#"]
    });
});

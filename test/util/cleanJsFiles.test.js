const { cleanJsFiles } = require("../../core/util/folderHandler.js");

test("Test 1 - Cleans .js files from an array of filenames", () => {
    const arr = ["tomate", "tmp.js"];
    const res = cleanJsFiles(arr)
    expect(res[0]).toBe("tomate");
})
const { isFolderEmpty } = require("../../core/util/folderHandler.js");
const fs = require("fs");
const path = `${process.cwd()}/test/util/tmp`

beforeAll(() => {
  fs.mkdirSync(path);
});

test("Test 1 - Returns true if a folder don't have any file", () => {
  const isTmpEmpty = isFolderEmpty(path);
  expect(isTmpEmpty).toBe(true);
}); 

test("Test 2 - Return false if exists files in the folder", () => {
  const newFilePath = `${path}/HelloWorld.txt`;
  fs.writeFileSync(newFilePath, '');
  const isTmpEmpty = isFolderEmpty(path);
  expect(isTmpEmpty).toBe(false);
})
afterAll(() => {
  fs.rmSync(path, {recursive: true});
});

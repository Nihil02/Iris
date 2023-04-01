module.exports = async () => {
  return {
    preset: "ts-jest",
    enviorment: "node",
    transform: {
      "^.+\\.ts?$": "ts-jest",
    },
    transformIgnorePatterns: ['<rootDir>/node_modules/'],
  };
};

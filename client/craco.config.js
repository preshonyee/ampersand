const CracoLessPlugin = require("craco-less");

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { "@primary-color": "#FF5A5F" },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};

const activeConfig = "dev";

const config = {
  dev: {
    appName: "atomic-boilerplate-reactJS",
    url: {
      api: "",
      assets: "",
      origin: "",
    },
  },
  prod: {
    appName: "atomic-boilerplate-reactJS",
    url: {
      api: "",
      assets: "",
      origin: "",
    },
  },
};

const appConfig = config[activeConfig];

export default appConfig;

import { defaultConfig } from "./config";

import { getConfig } from "./getConfig";

const main = async () => {
  const config = getConfig(defaultConfig);
  console.log(config);
};

main();

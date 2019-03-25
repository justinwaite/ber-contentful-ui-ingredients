import { init as initContentfulExtension } from "contentful-ui-extensions-sdk";
import mockSdk from "./mock-sdk";

const initMockSdk = () => {
  return Promise.resolve(mockSdk);
};

const initRealSdk = () => {
  return new Promise(resolve => {
    initContentfulExtension(sdk => {
      resolve(sdk);
    });
  });
};

export const initSdk =
  process.env.NODE_ENV === "production" ? initRealSdk : initMockSdk;

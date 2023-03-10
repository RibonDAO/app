import { Platform, LogBox } from "react-native";

export interface Global {
  btoa: any;
  atob: any;
  self: any;
  Buffer: any;
  process: any;
  location: any;
}

declare let global: Global;
if (typeof global.self === "undefined") {
  global.self = global;
}

if (Platform.OS !== "web") {
  LogBox.ignoreLogs([
    "The provided value 'ms-stream' is not a valid 'responseType'.",
    "The provided value 'moz-chunked-arraybuffer' is not a valid 'responseType'.",
  ]);
  require("react-native-get-random-values");
  require("@ethersproject/shims");
}

global.btoa = global.btoa || require("base-64").encode;
global.atob = global.atob || require("base-64").decode;

global.Buffer = require("buffer").Buffer;

global.process = require("process");

global.process.env.NODE_ENV = __DEV__ ? "development" : "production";
global.process.version = "v9.40";

global.location = {
  protocol: "https",
};

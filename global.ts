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
}
// eslint-disable-next-line @typescript-eslint/no-var-requires
const base64 = require("base-64");

global.btoa = global.btoa || base64.encode;
global.atob = global.atob || base64.decode;

// eslint-disable-next-line @typescript-eslint/no-var-requires
const buffer = require("buffer");

global.Buffer = buffer.Buffer;

global.process = process;

// eslint-disable-next-line no-undef
global.process.env.NODE_ENV = __DEV__ ? "development" : "production";
global.process.version = "v9.40";

global.location = {
  protocol: "https",
};

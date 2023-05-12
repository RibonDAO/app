import axios from "axios";

export async function fetchBase64FromUrl(url: string) {
  try {
    const response = await axios.get(url, { responseType: "arraybuffer" });
    const base64 = Buffer.from(response.data, "binary").toString("base64");
    return base64;
  } catch (error) {
    console.log(error);
    return null;
  }
}

import branch from "react-native-branch";
import { RIBON_INTEGRATION_ID } from "utils/constants/Application";
import { isValidUuid } from "lib/validators";

export async function useIntegrationId() {
  const latestParams = await branch.getLatestReferringParams();
  const INTEGRATION_ID = latestParams.$integrationId || RIBON_INTEGRATION_ID;
  if (!INTEGRATION_ID) return null;
  if (isValidUuid(INTEGRATION_ID)) return String(INTEGRATION_ID);

  return parseInt(INTEGRATION_ID, 10);
}

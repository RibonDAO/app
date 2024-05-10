import { Integration } from "@ribon.io/shared/types/entities";
import { userIntegrationsApi } from "@ribon.io/shared/services";

type Branch = "partners" | "referral";

function useUserIntegration() {
  async function getUserIntegration(branch: Branch) {
    const { data: integration } = await userIntegrationsApi.getIntegration(
      branch as string,
    );

    return integration;
  }

  async function createUserIntegration(data: Integration) {
    const integration = userIntegrationsApi.createIntegration(data);
    return integration;
  }

  return {
    getUserIntegration,
    createUserIntegration,
  };
}

export default useUserIntegration;

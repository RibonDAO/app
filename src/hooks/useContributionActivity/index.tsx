import { useContributions } from "@ribon.io/shared/hooks";
import { useCallback, useEffect, useState } from "react";
import {
  getLocalStorageItem,
  removeLocalStorageItem,
  setLocalStorageItem,
} from "lib/localStorage";

export const HAS_SEEN_CONTRIBUTIONS_TODAY_KEY =
  "HAS_SEEN_CONTRIBUTIONS_TODAY_KEY";
function useContributionActivity() {
  const { useLabelableContributions } = useContributions();
  const { data: userContributions } = useLabelableContributions();

  const [newContributionActivity, setNewContributionActivity] = useState(false);
  const [hasSeenContributionsToday, setHasSeenContributionsToday] =
    useState(false);

  useEffect(() => {
    async function fetchHasSeenToday() {
      const hasSeenToday = await getLocalStorageItem(
        HAS_SEEN_CONTRIBUTIONS_TODAY_KEY,
      );

      if (hasSeenToday) {
        const today = new Date().toLocaleDateString();
        if (hasSeenToday === today) {
          setHasSeenContributionsToday(true);
        } else {
          await removeLocalStorageItem(HAS_SEEN_CONTRIBUTIONS_TODAY_KEY);
        }
      }
    }

    fetchHasSeenToday();
  }, []);

  const setHasSeenToday = async () => {
    const today = new Date().toLocaleDateString();
    await setLocalStorageItem(HAS_SEEN_CONTRIBUTIONS_TODAY_KEY, today);
    setHasSeenContributionsToday(true);
  };

  const hasLabelableContributions = useCallback(
    () => Boolean(userContributions?.length && userContributions?.length > 0),
    [userContributions?.length],
  );

  useEffect(() => {
    setNewContributionActivity(
      hasLabelableContributions() && !hasSeenContributionsToday,
    );
  }, [hasLabelableContributions, hasSeenContributionsToday]);

  return {
    newContributionActivity,
    setHasSeenToday,
  };
}

export default useContributionActivity;

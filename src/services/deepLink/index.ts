import branch from "react-native-branch";

export async function initializeDeeplink(navigateTo: (path: string) => void) {
  branch.subscribe({
    onOpenStart: ({ uri, cachedInitialEvent }) => {
      // eslint-disable-next-line no-console
      console.log(
        `subscribe onOpenStart, will open ${uri} cachedInitialEvent is ${cachedInitialEvent}`,
      );
    },
    onOpenComplete: async ({ error, params, uri }) => {
      if (error) {
        // eslint-disable-next-line no-console
        console.error(
          `subscribe onOpenComplete, Error from opening uri: ${uri} error: ${error}`,
        );
        const latestParams = await branch.getLatestReferringParams();
        if (latestParams.$custom_meta_tags)
          navigateTo(latestParams.$custom_meta_tags as string);
        return;
      }
      if (params) {
        if (params.navigate) {
          navigateTo(params.navigate as string);
        }
      }
    },
  });
}

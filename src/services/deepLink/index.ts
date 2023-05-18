import branch from "react-native-branch";

export function initializeDeeplink(navigateTo: (path: string) => void) {
  branch.subscribe({
    onOpenStart: ({ uri, cachedInitialEvent }) => {
      console.log(
        `subscribe onOpenStart, will open ${ 
          uri 
          } cachedInitialEvent is ${ 
          cachedInitialEvent}`,
      );
    },
    onOpenComplete: ({ error, params, uri }) => {
      if (error) {
        console.error(
          `subscribe onOpenComplete, Error from opening uri: ${ 
            uri 
            } error: ${ 
            error}`,
        );
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

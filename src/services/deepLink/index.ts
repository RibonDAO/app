import branch from 'react-native-branch'

export function initializeDeeplink(navigateTo: (path: string) => void) {
  if (!__DEV__) {
    return;
  }
  branch.subscribe({
    onOpenStart: ({
        uri,
        cachedInitialEvent
    }) => {
        console.log(
            'subscribe onOpenStart, will open ' +
            uri +
            ' cachedInitialEvent is ' +
            cachedInitialEvent,
        );
    },
    onOpenComplete: ({
        error,
        params,
        uri
    }) => {
      console.log("params: ", params)
        if (error) {
            console.error(
                'subscribe onOpenComplete, Error from opening uri: ' +
                uri +
                ' error: ' +
                error,
            );
            return;
        }
        if (params) {
          if(params['$deeplink_path']) {
            navigateTo(params['$deeplink_path'] as string);
          }
        }
    },
  });
}


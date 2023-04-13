import branch from 'react-native-branch';

export default async function createDeepLink() {
  let buo = await branch.createBranchUniversalObject('content/12345', {
    title: 'My Content Title',
    contentDescription: 'My Content Description',
    contentMetadata: {
      customMetadata: {
        key1: 'value1'
      }
    }
  });

  return buo;
}

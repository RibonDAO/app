import CardStories from "components/moleculars/CardStories";
import React, { useCallback } from "react";
import { NonProfit, Story } from "@ribon.io/shared/types";

type Props = {
  stories: Story[];
  nonProfit: NonProfit;
  storiesVisible: boolean;
  setStoriesVisible: (visible: boolean) => void;
};
function StoriesSection({
  stories,
  nonProfit,
  storiesVisible,
  setStoriesVisible,
}: Props): JSX.Element {
  const filteredStories = useCallback(
    () =>
      stories.map((story) => ({
        url: story.image,
        heading: story.title,
        description: story.description,
      })),
    [stories],
  );

  return (
    <CardStories
      stories={filteredStories()}
      visible={storiesVisible}
      setVisible={setStoriesVisible}
      avatar={nonProfit.logo}
      title={nonProfit.name}
      subtitle={nonProfit.cause?.name}
    />
  );
}

export default StoriesSection;

import GroupButtons from "components/moleculars/GroupButtons";
import { useTagDonationContext } from "contexts/tagDonationContext";
import { useTranslation } from "react-i18next";

import { useTagsContext } from "contexts/tagsContext";
import * as S from "./styles";

export default function TagsFilter() {
  const { t } = useTranslation("translation", {
    keyPrefix: "donations.causesScreen",
  });

  const { setChosenTagIndex, setChosenTag, chosenTagIndex } =
    useTagDonationContext();
  const { tags } = useTagsContext();

  const filteredTags = () =>
    [
      {
        id: 0,
        name: t("allCauses"),
      },
      ...tags,
    ] || [];

  const handleTagChange = (_element: any, index: number) => {
    const tag = _element;
    setChosenTagIndex(index);
    if (tag.id !== 0) {
      setChosenTag(tag);
    } else {
      setChosenTag(undefined);
    }
  };

  return (
    <S.Container>
      <S.Scroll horizontal showsHorizontalScrollIndicator={false}>
        <GroupButtons
          elements={filteredTags()}
          onChange={handleTagChange}
          nameExtractor={(Tag) => Tag.name}
          indexSelected={chosenTagIndex}
        />
      </S.Scroll>
    </S.Container>
  );
}

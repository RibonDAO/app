import { useEffect, useState } from "react";
import CardCheckbox from "../CardCheckbox";
import * as S from "./styles";

type GroupCardsCheckboxProps = {
  elements: any[];
  onChange?: (element: any, index: number) => void;
  indexSelected?: number;
  setCurrentElement?: (element: any) => void;
};

function GroupCardsCheckbox({
  elements,
  onChange,
  indexSelected,
  setCurrentElement,
}: GroupCardsCheckboxProps): JSX.Element {
  const [selectedButtonIndex, setSelectedButtonIndex] = useState(
    indexSelected || 0,
  );

  const handleElementClick = (index: number, element: any) => {
    setSelectedButtonIndex(index);
    if (onChange) onChange(element, index);
  };

  useEffect(() => {
    if (setCurrentElement) setCurrentElement(selectedButtonIndex);
  }, [selectedButtonIndex]);

  function renderGroupCardsCheckbox() {
    return elements.map((element: any, index: number) => (
      <S.Button
        onClick={() => handleElementClick(index, element)}
        /* eslint-disable react/no-array-index-key */
        key={index.toString()}
        type="button"
        style={{ border: "none", background: "none" }}
        testID={`card-checkbox-${index}`}
      >
        <CardCheckbox
          firstDescription={element.firstDescription}
          firstIconName={element.firstIconName}
          secondDescription={element.secondDescription}
          secondIconName={element.secondIconName}
          value={element.value}
          recurrence={element.recurrence}
          tagText={element.tagText}
          onClick={() => handleElementClick(index, element)}
          checked={index === selectedButtonIndex}
        />
      </S.Button>
    ));
  }

  return <S.Container>{renderGroupCardsCheckbox()}</S.Container>;
}

export default GroupCardsCheckbox;

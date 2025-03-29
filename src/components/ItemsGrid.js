import { useState } from 'react';
import styled from 'styled-components';
import { Popup } from './popup';
import { useData } from './providers';
import { Card } from './card';
import { useCharacterFilters } from './providers/FilterProvider';

const defaultPopupSettings = {
  visible: false,
  content: {}
};

export function ItemsGrid() {
  const { characters } = useData();
  const { filteredCharacters } = useCharacterFilters();
  const [popupSettings, setPopupSettings] = useState(defaultPopupSettings);
  const isFiltered = filteredCharacters.length > 0;

  const cardOnClickHandler = (character) => {
    setPopupSettings({
      visible: true,
      content: character
    });
  };

  const handleCardClick = (character) => {
    return () => cardOnClickHandler(character);
  };

  if (!characters.length) {
    return null;
  }

  return (
    <Container>
      {(isFiltered ? filteredCharacters : characters).map((character) => (
        <Card
          key={character.id}
          onClickHandler={handleCardClick(character)}
          {...character}
        />
      ))}

      <Popup settings={popupSettings} setSettings={setPopupSettings} />
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  justify-items: center;
  gap: 30px;
`;

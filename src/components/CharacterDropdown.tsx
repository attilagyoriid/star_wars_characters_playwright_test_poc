import React from "react";

interface CharacterDropdownProps {
  characters: { name: string }[];
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const CharacterDropdown: React.FC<CharacterDropdownProps> = ({
  characters,
  onChange,
}) => {
  return (
    <select onChange={onChange}>
      <option value="">Select a character</option>
      {characters.map((character) => (
        <option key={character.name} value={character.name}>
          {character.name}
        </option>
      ))}
    </select>
  );
};

export default CharacterDropdown;

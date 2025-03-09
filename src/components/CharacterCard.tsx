import React from "react";

interface CharacterCardProps {
  character: {
    name: string;
    height: string;
    mass: string;
    hair_color: string;
    skin_color: string;
    eye_color: string;
    birth_year: string;
    gender: string;
    image?: string; // Add image property
  };
}

const CharacterCard: React.FC<CharacterCardProps> = ({ character }) => {
  return (
    <div>
      <h2>{character.name}</h2>
      <p>
        <strong>Height:</strong> {character.height}
      </p>
      <p>
        <strong>Mass:</strong> {character.mass}
      </p>
      <p>
        <strong>Hair Color:</strong> {character.hair_color}
      </p>
      <p>
        <strong>Skin Color:</strong> {character.skin_color}
      </p>
      <p>
        <strong>Eye Color:</strong> {character.eye_color}
      </p>
      <p>
        <strong>Birth Year:</strong> {character.birth_year}
      </p>
      <p>
        <strong>Gender:</strong> {character.gender}
      </p>
    </div>
  );
};

export default CharacterCard;

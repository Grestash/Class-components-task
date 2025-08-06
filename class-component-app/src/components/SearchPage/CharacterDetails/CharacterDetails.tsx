import { useEffect } from 'react';

interface CharacterDetailsProps {
  characterId: string;
}

export default function CharacterDetails({
  characterId,
}: CharacterDetailsProps) {
  useEffect(() => {
    console.log('ID changed');
  }, [characterId]);

  return <h1>Details</h1>;
}

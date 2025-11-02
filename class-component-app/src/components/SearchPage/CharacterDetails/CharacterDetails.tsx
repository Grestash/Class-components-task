import { useEffect} from 'react';
import Loader from 'components/Loader/Loader';
import styles from './CharacterDetail.module.css';
import { useRouter, useSearchParams } from 'next/navigation';
import { useRef } from 'react';
import { useGetCharacterByIdQuery, useGetEpisodeByUrlQuery } from '../../../services/api';

interface CharacterDetailsProps {
  characterId: string;
}

export interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  image: string;
  origin: { name: string };
  episode: string[];
  firstEpisodeName: string;
}

export default function CharacterDetails({
  characterId,
}: CharacterDetailsProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const cardRef = useRef<HTMLDivElement>(null);

  const { data: character, isFetching, error: characterError } = useGetCharacterByIdQuery({
    characterId
  });

  const { data: episode, error: episodeError } = useGetEpisodeByUrlQuery(character?.episode?.[0] ?? '', {
    skip: !character?.episode?.[0],
  });

  const firstEpisodeName = episodeError ? 'Unknown' : episode?.name;

  const handleClose = () => {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.delete('details');
    router.push(`?${newParams.toString()}`);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if ((e.target as Element).closest('.search-item-name')) return;

      if (cardRef.current && !cardRef.current.contains(e.target as Node)) {
        handleClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [searchParams]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleClose]);


  if (isFetching) {
    return (
      <div className={styles.characterDetailsWrapper} ref={cardRef}> <Loader /> </div>)
  }

  if (characterError) {
    return <div className={styles.errorText}>{(characterError as Error)?.message || 'Failed to load character.'}</div>;
  }

  return (
    <div className={styles.characterDetailsWrapper} ref={cardRef}>
      <button className={styles.closeButton} onClick={handleClose}>
        <img src="/icons/closeIcon.svg" alt="Cross" className={styles.crossImage} />
      </button>
      <img
        src={character?.image}
        alt={`${character?.name} image`}
        className={styles.characterImage}
      />

      <div className={styles.characterDetailsContent}>
        <h2 className={styles.characterName}>{character?.name}</h2>
        <p className={styles.characterStatus}>
          <span
            className={`${styles.statusIcon} ${
              character?.status === 'Alive'
                ? styles.statusIconAlive
                : character?.status === 'Dead'
                  ? styles.statusIconDead
                  : styles.statusIconUnknown
            }`}
          />
          {character?.status === 'unknown' ? 'Unknown' : character?.status} -{' '}
          {character?.species}
        </p>
        <div className={styles.characterDetailSection}>
          <span className={styles.spanLabel}>
            Character's origin location:{' '}
          </span>
          <span className={styles.spanText}>{character?.origin.name}</span>
        </div>
        <div className={styles.characterDetailSection}>
          <span className={styles.spanLabel}>First appeared in episode: </span>
          <span className={styles.spanText}>{firstEpisodeName}</span>
        </div>
      </div>
    </div>
  );
}

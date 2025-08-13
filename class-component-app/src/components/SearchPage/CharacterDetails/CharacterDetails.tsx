import { useEffect, useState } from 'react';
import { API_URL } from 'pages/SearchPage';
import Loader from 'components/Loader/Loader';
import styles from './CharacterDetail.module.css';
import closeIcon from 'assets/icons/closeIcon.svg';
import { useSearchParams } from 'react-router-dom';
import { useRef } from 'react';

interface CharacterDetailsProps {
  characterId: string;
}

interface Character {
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
  const [searchParams, setSearchParams] = useSearchParams();
  const [character, setCharacter] = useState<Character | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  async function handleSearchDetails() {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/${characterId}`);

      const data = await response.json();
      console.log(data);

      let firstEpisodeName = '';
      const epResponse = await fetch(data.episode[0]);
      if (!epResponse.ok) throw new Error(`Episode error ${epResponse.status}`);

      const epData = await epResponse.json();
      firstEpisodeName = epData.name;

      setCharacter({ ...data, firstEpisodeName });
      setIsLoading(false);
    } catch (error) {
      if (error instanceof Error) setError(error.message || 'Failed to fetch');
    } finally {
      setIsLoading(false);
    }
  }

  const handleClose = () => {
    const newParams = new URLSearchParams(searchParams);
    newParams.delete('details');
    setSearchParams(newParams);
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

  useEffect(() => {
    handleSearchDetails();
  }, [characterId]);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <div className={styles.errorText}>{error}</div>;
  }

  return (
    <div className={styles.characterDetailsWrapper} ref={cardRef}>
      <button className={styles.closeButton} onClick={handleClose}>
        <img src={closeIcon} alt="Cross" className={styles.crossImage} />
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
          <span className={styles.spanText}>{character?.firstEpisodeName}</span>
        </div>
      </div>
    </div>
  );
}

import { createContext, useCallback, useContext } from 'react';
import { useData } from '..';
import { useEffect, useState } from 'react';

const CharacterFiltersContext = createContext();

export const CharacterFiltersProvider = ({ children }) => {
  const { characters } = useData();
  const [statusOptions, setStatusOptions] = useState([]);
  const [genderOptions, setGenderOptions] = useState([]);
  const [speciesOptions, setSpeciesOptions] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [selectedGender, setSelectedGender] = useState(null);
  const [selectedSpecies, setSelectedSpecies] = useState(null);
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [filteredCharacters, setFilteredCharacters] = useState([]);
  const [filteredPages, setFilteredPages] = useState();

  useEffect(() => {
    if (characters.length > 0) {
      const uniqueStatuses = [
        ...new Set(characters.map((character) => character.status))
      ];
      const uniqueGenders = [
        ...new Set(characters.map((character) => character.gender))
      ];
      const uniqueSpecies = [
        ...new Set(characters.map((character) => character.species))
      ];

      setStatusOptions(
        uniqueStatuses.map((status) => ({
          value: status.toLowerCase(),
          label: status
        }))
      );

      setGenderOptions(
        uniqueGenders.map((gender) => ({
          value: gender.toLowerCase(),
          label: gender
        }))
      );

      setSpeciesOptions(
        uniqueSpecies.map((species) => ({
          value: species.toLowerCase(),
          label: species
        }))
      );
    }
  }, [characters]);

  const buildFilterURI = useCallback(() => {
    const params = new URLSearchParams();
    if (selectedStatus) params.append('status', selectedStatus.value);
    if (selectedGender) params.append('gender', selectedGender.value);
    if (selectedSpecies) params.append('species', selectedSpecies.value);
    if (name) params.append('name', name);
    if (type) params.append('type', type);

    return `https://rickandmortyapi.com/api/character/?${params.toString()}`;
  }, [selectedGender, selectedSpecies, selectedStatus, name, type]);

  const fetchFilteredCharacters = async (endpoint) => {
    const response = await fetch(endpoint);
    const data = await response.json();

    return data;
  };

  const handleFilterChange = useCallback(async () => {
    const uri = await buildFilterURI();

    try {
      const response = await fetchFilteredCharacters(uri);
      if (response && response.results) {
        setFilteredCharacters(response.results);
        setFilteredPages(response.info);
      } else {
        throw new Error('Oops...');
      }
    } catch (error) {
      console.error(error.message);
    }
  }, [buildFilterURI]);

  const handleReset = useCallback(() => {
    setSelectedStatus(null);
    setSelectedGender(null);
    setSelectedSpecies(null);
    setFilteredCharacters([]);
    setName('');
    setType('');
  }, [
    setSelectedStatus,
    setSelectedGender,
    setSelectedSpecies,
    setName,
    setType,
    setFilteredCharacters
  ]);

  return (
    <CharacterFiltersContext.Provider
      value={{
        statusOptions,
        genderOptions,
        speciesOptions,
        selectedStatus,
        selectedGender,
        selectedSpecies,
        setSelectedStatus,
        setSelectedGender,
        setSelectedSpecies,
        name,
        setName,
        type,
        setType,
        buildFilterURI,
        fetchFilteredCharacters,
        handleFilterChange,
        handleReset,
        filteredCharacters,
        filteredPages
      }}
    >
      {children}
    </CharacterFiltersContext.Provider>
  );
};

export const useCharacterFilters = () => {
  return useContext(CharacterFiltersContext);
};

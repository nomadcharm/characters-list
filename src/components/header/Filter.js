import { useCallback } from 'react';
import Async from 'react-select/async';
import styled from 'styled-components';
import { useCharacterFilters } from '../providers/FilterProvider';

export function Filter() {
  const {
    statusOptions,
    genderOptions,
    speciesOptions,
    selectedStatus,
    setSelectedStatus,
    selectedSpecies,
    setSelectedSpecies,
    name,
    setName,
    type,
    setType,
    selectedGender,
    setSelectedGender,
    handleFilterChange,
    handleReset
  } = useCharacterFilters();

  const handleStatusChange = useCallback(
    (option) => {
      setSelectedStatus(option);
    },
    [setSelectedStatus]
  );

  const handleGenderChange = useCallback(
    (option) => {
      setSelectedGender(option);
    },
    [setSelectedGender]
  );

  const handleSpeciesChange = useCallback(
    (option) => {
      setSelectedSpecies(option);
    },
    [setSelectedSpecies]
  );

  const handleNameChange = useCallback(
    (event) => {
      setName(event.target.value);
    },
    [setName]
  );

  const handleTypeChange = useCallback(
    (event) => {
      setType(event.target.value);
    },
    [setType]
  );

  return (
    <FilterContainer>
      <StyledAsync
        placeholder="Status"
        isClearable
        defaultOptions={statusOptions}
        value={selectedStatus}
        onChange={handleStatusChange}
      />
      <StyledAsync
        placeholder="Gender"
        isClearable
        defaultOptions={genderOptions}
        value={selectedGender}
        onChange={handleGenderChange}
      />
      <StyledAsync
        placeholder="Species"
        isClearable
        defaultOptions={speciesOptions}
        value={selectedSpecies}
        onChange={handleSpeciesChange}
      />
      <StyledInput
        placeholder="Name"
        value={name}
        onChange={handleNameChange}
      />
      <StyledInput
        placeholder="Type"
        value={type}
        onChange={handleTypeChange}
      />
      <ButtonContainer>
        <ApplyButton onClick={handleFilterChange}>Apply</ApplyButton>
        <ResetButton onClick={handleReset}>Reset</ResetButton>
      </ButtonContainer>
    </FilterContainer>
  );
}

const FilterContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  max-width: 560px;
  flex-wrap: wrap;

  @media (max-width: 680px) {
    flex-direction: column;
    flex-wrap: nowrap;
    width: 240px;
  }
`;

const StyledInput = styled.input`
  max-width: 180px;
  height: 40px;
  padding: 12px;
  outline: none;
  border: 1px solid #83bf46;
  border-radius: 5px;
  font-size: 16px;
  color: #f5f5f5;
  background-color: #263750;
  transition: background-color 0.3s ease-in-out;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  cursor: pointer;

  ::placeholder {
    color: #b3b3b3;
  }
  &:hover {
    background-color: #334466;
  }
  &:focus {
    background-color: #334466;
  }

  @media (max-width: 680px) {
    max-width: 100%;
    width: 100%;
  }
`;

const ButtonContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  gap: 10px;

  @media (max-width: 680px) {
    flex-direction: column;
    width: 100%;
  }
`;

const ApplyButton = styled.button`
  flex: 1;
  padding: 12px 20.5px;
  max-height: 40px;
  outline: none;
  border: 1px solid #83bf46;
  border-radius: 8px;
  font-size: 16px;
  color: #83bf46;
  background-color: transparent;
  transition: color 0.3s ease-in-out, background-color 0.3s ease-in-out;
  cursor: pointer;
  &:hover {
    color: #ffffff;
    background-color: #83bf46;
  }

  @media (max-width: 680px) {
    width: 100%;
  }
`;

const ResetButton = styled.button`
  flex: 1;
  padding: 10px 20.5px;
  max-height: 40px;
  outline: none;
  border: 1px solid #ff5152;
  border-radius: 8px;
  font-size: 16px;
  color: #ff5152;
  background-color: transparent;
  transition: color 0.3s ease-in-out, background-color 0.3s ease-in-out;
  cursor: pointer;
  &:hover {
    color: #ffffff;
    background-color: #ff5152;
  }

  @media (max-width: 680px) {
    width: 100%;
  }
`;

const customStyles = {
  control: (provided) => ({
    ...provided,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: '180px',
    maxHeight: '40px',
    padding: '0px 5px',
    border: '1px solid #83bf46',
    borderRadius: '5px',
    backgroundColor: '#263750',
    boxShadow: 'none',
    transition: 'background-color 0.3s ease-in-out',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#334466'
    },
    '@media (max-width: 680px)': {
      width: '240px'
    }
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: '5px',
    border: '1px solid #ccc'
  }),
  option: (provided, state) => ({
    ...provided,
    padding: '10px',
    fontWeight: state.isSelected ? '700' : 400,
    color: '#1e1e1e',
    backgroundColor: state.isSelected
      ? 'transparent'
      : state.isFocused
      ? '#83bf4633'
      : 'transparent',
    transition: 'background-color 0.3s ease-in-out',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#83bf4633'
    }
  }),
  singleValue: (provided) => ({
    ...provided,
    color: '#fff5f5'
  }),
  dropdownIndicator: (provided, state) => ({
    ...provided,
    display: state.selectProps.value ? 'none' : 'block',
    margin: 0,
    padding: 0,
    color: '#b3b3b3',
    transition: 'transform 0.3s ease-in-out',
    transform: state.selectProps.menuIsOpen ? 'rotate(180deg)' : 'rotate(0deg)',
    '&:hover': {
      color: '#ffffff'
    }
  }),
  clearIndicator: (provided) => ({
    ...provided,
    padding: '0',
    color: '#f5f5f5',
    cursor: 'pointer',
    '&:hover': {
      color: '#83bf46'
    }
  }),
  indicatorSeparator: () => ({
    display: 'none'
  }),
  placeholder: (provided) => ({
    ...provided,
    color: '#b3b3b3'
  })
};

const StyledAsync = (props) => <Async styles={customStyles} {...props} />;

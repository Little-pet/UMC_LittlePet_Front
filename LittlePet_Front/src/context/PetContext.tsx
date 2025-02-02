import React, { createContext, useContext, useState } from 'react';

interface Pet {
  petId: number;
  name: string;
  categoryName: string;
  gender: string;
  profilePhoto: string;
  birthDay: string;
}

interface PetContextType {
  pets: Pet[];
  addPet: (pet: Pet) => void;
  updatePet: (updatedPet: Pet) => void;
  deletePet: (id: number) => void;
}

const PetContext = createContext<PetContextType | undefined>(undefined);

export const PetProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [pets, setPets] = useState<Pet[]>([]);
  console.log(pets);
  //새 반려동물 추가
  const addPet = (pet: Pet) => {
    if (!pet.birthDay) {
      console.warn('birthDate가 없는 데이터가 추가되고 있습니다!', pet);
    }
    setPets([...pets, pet]);
  };

  // 반려동물 정보 수정
  const updatePet = (updatedPet: Pet) => {
    setPets((prevPets) =>
      prevPets.map((pet) => (pet.petId === updatedPet.petId ? updatedPet : pet))
    );
  };

  //반려동물 삭제
  const deletePet = (id: number) => {
    setPets((prevPets) => prevPets.filter((pet) => pet.petId !== id));
  };

  return (
    <PetContext.Provider value={{ pets, addPet, updatePet, deletePet }}>
      {children}
    </PetContext.Provider>
  );
};

export const usePets = () => {
  const context = useContext(PetContext);
  if (!context) {
    throw new Error('usePets must be used within a PetProvider');
  }
  return context;
};

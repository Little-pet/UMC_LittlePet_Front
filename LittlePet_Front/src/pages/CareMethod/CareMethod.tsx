import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import banner from '@assets/banner/banner-caremethod.svg';

import axios from 'axios';
const CareMethodPage: React.FC = () => {
  const [mainCategories, setMainCategories] = useState<string[]>([]);
  const [subCategories, setSubCategories] = useState<{
    [key: string]: number[];
  }>({});
  const [animals, setAnimals] = useState<
    { id: number; name: string; image: string; link: string }[]
  >([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('전체');
  const navigate = useNavigate();

  // 백엔드 API 호출해서 데이터 가져오기
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          'https://umclittlepet.shop/api/animal-categories'
        );

        const categoryData = response.data.result; // "result" 배열 가져오기

        // 대분류 카테고리 설정 (예: ['전체', '설치류', '파충류', '조류', '기타'])
        const fetchedCategories = categoryData.map(
          (category: any) => category.categoryName
        );
        setMainCategories(['전체', ...fetchedCategories]);
        response.data.result.forEach(() => {});
        // 소분류 및 동물 리스트 변환
        const subCategoryMap: { [key: string]: number[] } = { 전체: [] };
        const animalList: {
          id: number;
          name: string;
          image: string;
          link: string;
        }[] = [];

        categoryData.forEach((category: any) => {
          subCategoryMap[category.categoryName] = category.petCategoryList.map(
            (pet: any) => pet.id
          );

          category.petCategoryList.forEach((pet: any) => {
            animalList.push({
              id: pet.id,
              name: pet.species,
              image: pet.imageUrl,
              link: `/caremethod/pet-detail/${pet.id}`, // 백엔드에서 링크 지원하면 여기에 추가
            });
          });
        });

        // "전체" 카테고리는 모든 동물 포함
        subCategoryMap['전체'] = animalList.map((a) => a.id);

        // 상태 업데이트
        setSubCategories(subCategoryMap);
        setAnimals(animalList);
      } catch (error) {
        console.error('카테고리 데이터를 불러오는 데 실패했습니다.', error);
      }
    };

    fetchCategories();
  }, []);

  const allowedSpecies = [
    '햄스터',
    '고슴도치',
    '토끼',
    '앵무새',
    '거북',
    '뱀',
    '페럿',
  ];
  const handleAnimalClick = (link: string, species: string) => {
    if (allowedSpecies.includes(species)) {
      console.log(`Navigating to: ${link}`); // 이동하는 URL 확인
      navigate(link);
    }
  };

  return (
    <>
      <ContainerWrapper>
        <Banner src={banner} />
        <Container>
          <Header>
            <Title>어떤 소동물이 궁금하신가요?</Title>
            <ButtonList>
              {mainCategories.map((category) => (
                <CategoryButton
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  isSelected={selectedCategory === category}
                >
                  {category}
                </CategoryButton>
              ))}
            </ButtonList>
          </Header>

          {/* Content */}
          <Content>
            <CategoryGrid>
              {subCategories[selectedCategory]?.map((id) => {
                const item = animals.find((animal) => animal.id === id);

                return (
                  item && (
                    <CategoryItemWrapper>
                      <CategoryImg
                        key={item.id}
                        src={item.image}
                        alt={item.name}
                        onClick={() =>
                          allowedSpecies.includes(item.name) &&
                          handleAnimalClick(item.link, item.name)
                        }
                      />
                      <CategoryName>{item.name}</CategoryName>
                    </CategoryItemWrapper>
                  )
                );
              })}
            </CategoryGrid>
          </Content>
        </Container>
      </ContainerWrapper>
    </>
  );
};

export default CareMethodPage;

// Styled Components

const Banner = styled.img`
  width: 100vw;
  @media (max-width: 800px) {
    display: none;
  }
`;

const ContainerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Container = styled.div`
  padding: 25px;
`;

const Header = styled.div`
  width: 100%;
`;

const Title = styled.h1`
  font-size: 22px;
  font-weight: 600;
  margin-top: 11px;
  text-align: center;
  @media (min-width: 800px) {
    font-size: 26px;
    line-height: 22px;
    margin-top: 24px;
  }
`;
const ButtonList = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 20px;
  justify-content: center;
  @media (min-width: 800px) {
    margin-top: 42px;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 23px;
`;

const CategoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 2-column layout */
  gap: 18px;
  width: 100%;
  @media (min-width: 800px) {
    justify-content: space-between;
    grid-template-columns: repeat(5, 1fr);
    width: 855px;
  }
`;

const CategoryButton = styled.button<{ isSelected: boolean }>`
  padding: 6px 12px;
  font-size: 10px;
  background-color: ${({ isSelected }) => (isSelected ? '#6EA8FE' : '#E6E6E6')};
  color: ${({ isSelected }) => (isSelected ? '#fff' : '#737373')};
  border-radius: 5px;
  border: none;
  cursor: pointer;
  height: 27px;
  width: auto;
  font-family: 'Pretendard';
  font-weight: 500;
  @media (min-width: 800px) {
    font-size: 14px
    height:35px;
  }
`;

const CategoryItemWrapper = styled.div`
  position: relative;
  width: 100px;
  height: 130px;

  cursor: pointer;

  @media (min-width: 800px) {
    width: 150px;
    height: 175px;
  }
`;
const CategoryImg = styled.img`
  border-radius: 5px;
  width: 100%;
  height: 100%;
  box-shadow: 0px 2px 5px 0px #00000026;
`;

const CategoryName = styled.div`
  position: absolute;
  bottom: 12px;
  left: 50%;
  transform: translateX(-50%);
  white-space: nowrap;
  color: #ffffff;
  font-size: 12px;
  font-weight: 600;
  @media (min-width: 800px) {
    font-size: 16px;
  }
`;

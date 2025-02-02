import React, { useState, useEffect } from 'react';
import { useParams, useOutletContext } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

const PetDetailPage: React.FC = () => {
  const { speciesId } = useParams<{ speciesId: string }>(); //  URL에서 speciesId 가져오기
  const [petDetail, setPetDetail] = useState<{
    id: number;
    species: string;
    title: string;
    features: string;
    foodInfo: string;
    environment: string;
    playMethods: string;
    featureImagePath: string;
    petBigCategoryId: number;
    petBigCategoryName: string;
    createdAt: string;
    updatedAt: string;
  } | null>(null);

  useEffect(() => {
    const fetchPetDetail = async () => {
      try {
        const response = await axios.get(
          `https://umclittlepet.shop/animal-categories/species`,
          {
            params: { 'species-id': speciesId }, // Query Parameter로 전달
          }
        );
        setPetDetail(response.data.result);
      } catch (error) {
        console.error('소동물 상세 정보를 불러오는 데 실패했습니다.', error);
      }
    };

    fetchPetDetail();
  }, [speciesId]);

  if (!petDetail) {
    return <p>로딩 중...</p>;
  }

  const { featureRef, foodRef, environmentRef, playRef } = useOutletContext<{
    featureRef: React.RefObject<HTMLDivElement>;
    foodRef: React.RefObject<HTMLDivElement>;
    environmentRef: React.RefObject<HTMLDivElement>;
    playRef: React.RefObject<HTMLDivElement>;
  }>();

  return (
    <Container>
      {/* 🟢 페이지 콘텐츠 */}
      <TitleContainer>
        <Title>{petDetail.title}</Title>
        <Date>{petDetail.createdAt} </Date>
        <PetImage src={petDetail.featureImagePath} alt={petDetail.species} />
      </TitleContainer>

      <Content>
        <Section>
          <SectionTitle ref={featureRef}>특징</SectionTitle>
          <hr />
          <p>{petDetail.features}</p>
        </Section>

        <Section>
          <SectionTitle ref={foodRef}>먹이</SectionTitle>
          <hr />
          <p>{petDetail.foodInfo}</p>
        </Section>

        <Section>
          <SectionTitle ref={environmentRef}>환경</SectionTitle>
          <hr />
          <p>{petDetail.environment}</p>
        </Section>

        <Section>
          <SectionTitle ref={playRef}>놀이방법</SectionTitle>
          <hr />
          <p>{petDetail.playMethods}</p>
        </Section>
      </Content>
    </Container>
  );
};

export default PetDetailPage;

// 🟢 Styled Components
const Container = styled.div`
  max-width: 600px;
  margin: auto;
  padding: 20px;
`;

const TitleContainer = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  gap: 8px;
  font-family: 'Pretendard';
`;

const Title = styled.div`
  font-size: 20px;
  font-weight: 600;
  height: 22px;
`;

const Date = styled.div`
  height: 22px;
  font-weight: 500;
  font-size: 12px;
  color: #737373;
`;

const PetImage = styled.img`
  width: 100%;
  border-radius: 5px;
`;
const Content = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  hr {
    border: none;
    height: 1px;
    background-color: #e6e6e6;
    width: 100%;
    margin: 0;
  }
  p {
    margin: 0;
    font-weight: 500;
    font-size: 12px;
    line-height: 18px;
    color: #262627cc;
  }
`;

const SectionTitle = styled.h2`
  color: #262627cc;
  height: 18px;
  font-weight: 600;
  font-size: 16px;
  margin: 0;
  scroll-margin-top: 150px;
`;

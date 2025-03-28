import React from 'react';
import { useParams, useOutletContext } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import styled from 'styled-components';

//  API 요청 함수 (React Query에서 사용할 함수)
const fetchPetDetail = async (speciesId: string) => {
  const response = await axios.get(
    `https://umclittlepet.shop/api/animal-categories/species`,
    {
      params: { 'species-id': speciesId },
    }
  );
  return response.data.result;
};

const PetDetailPage: React.FC = () => {
  const { speciesId } = useParams<{ speciesId: string }>(); // URL에서 speciesId 가져오기

  //  React Query로 데이터 요청 (Infinity 설정 적용)
  const {
    data: petDetail,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['petDetail', speciesId],
    queryFn: () => fetchPetDetail(speciesId!),
    enabled: !!speciesId, // speciesId가 존재할 때만 실행
    staleTime: Infinity, //  항상 신선한 상태로 유지 (다시 요청하지 않음)
    gcTime: Infinity, //  캐시에서 절대 삭제되지 않음
  });

  //  로딩 중 상태 처리
  if (isLoading) return <p>로딩 중...</p>;
  if (isError || !petDetail) return <p>데이터를 불러오는 데 실패했습니다.</p>;

  //  Outlet Context에서 스크롤 참조 가져오기
  const { featureRef, foodRef, environmentRef, playRef } = useOutletContext<{
    featureRef: React.RefObject<HTMLDivElement>;
    foodRef: React.RefObject<HTMLDivElement>;
    environmentRef: React.RefObject<HTMLDivElement>;
    playRef: React.RefObject<HTMLDivElement>;
  }>();

  return (
    <Container>
      <TitleContainer>
        <Title>{petDetail.title}</Title>
        <PetImage src={petDetail.featureImagePath} alt={petDetail.species} />
      </TitleContainer>

      <Content>
        <Section>
          <SectionTitle ref={featureRef}>특징</SectionTitle>
          <hr />
          <p dangerouslySetInnerHTML={{ __html: petDetail.features }} />
        </Section>

        <Section>
          <SectionTitle ref={foodRef}>먹이</SectionTitle>
          <hr />
          <p dangerouslySetInnerHTML={{ __html: petDetail.foodInfo }} />
        </Section>

        <Section>
          <SectionTitle ref={environmentRef}>환경</SectionTitle>
          <hr />
          <p dangerouslySetInnerHTML={{ __html: petDetail.environment }} />
        </Section>

        <Section>
          <SectionTitle ref={playRef}>놀이방법</SectionTitle>
          <hr />
          <p dangerouslySetInnerHTML={{ __html: petDetail.playMethods }} />
        </Section>
      </Content>
    </Container>
  );
};

export default PetDetailPage;

const Container = styled.div`
  margin: auto;
  padding: 20px;
  padding-top: 76px;
  @media (min-width: 800px) {
    padding: 64px 96px;
    margin-top: 39px;
    box-sizing: border-box;
    margin: 100px 96px;
    box-shadow: 0px 2px 5px 0px #00000026;
  }
`;

const TitleContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-family: 'Pretendard';
  @media (min-width: 800px) {
    gap: 24px;
  }
`;

const Title = styled.div`
  font-size: 20px;
  font-weight: 600;
  height: 22px;
  @media (min-width: 800px) {
    font-size: 36px;
    font-weight: 700;
    line-height: 22px;
  }
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
  @media (min-width: 800px) {
    gap: 32px;
    p {
      font-size: 28px;
      line-height: 42px;
    }
  }
`;

const SectionTitle = styled.h2`
  color: #262627cc;
  height: 18px;
  font-weight: 600;
  font-size: 16px;
  margin: 0;
  scroll-margin-top: 150px;
  @media (min-width: 800px) {
    scroll-margin-top: 104px;
    font-size: 32px;
    line-height: 42px;
  }
`;

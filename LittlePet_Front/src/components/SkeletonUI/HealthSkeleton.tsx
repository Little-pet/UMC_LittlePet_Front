import styled from 'styled-components';
const HealthSkeleton = () => {
  return (
    <ContentBox>
      <Title style={{ height: '22px', width: '144px', alignSelf: 'center' }} />
      <Title style={{ marginTop: '10px', height: '30px', width: '60%' }} />
      <Content />
    </ContentBox>
  );
};
export default HealthSkeleton;
const ContentBox = styled.div`
  padding: 0 25px;
  margin: 20px 0;
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  gap: 12px;

  @media only screen and (min-width: 800px) {
    margin: 20px 96px;
    margin-top: 30px;
  }
`;
const Title = styled.div`
  height: 22px;
  width: 100%;
  border-radius: 10px;
  @keyframes skeleton-gradient {
    0% {
      background-color: rgba(165, 165, 165, 0.1);
    }
    50% {
      background-color: rgba(165, 165, 165, 0.3);
    }
    100% {
      background-color: rgba(165, 165, 165, 0.1);
    }
  }
  animation: skeleton-gradient 1.5s infinite ease-in-out;
`;
const Content = styled.div`
  height: 450px;
  border-radius: 10px;
  width: 100%;
  @keyframes skeleton-gradient {
    0% {
      background-color: rgba(165, 165, 165, 0.1);
    }
    50% {
      background-color: rgba(165, 165, 165, 0.3);
    }
    100% {
      background-color: rgba(165, 165, 165, 0.1);
    }
  }
  animation: skeleton-gradient 1.5s infinite ease-in-out;
`;

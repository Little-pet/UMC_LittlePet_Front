import styled from 'styled-components';
const CommunityDetail = () => {
  return (
    <ContentBox>
      <Title />
      <Title style={{ width: '80%' }} />
      <Title style={{ width: '70%' }} />
      <Content />
      <Title style={{ width: '100%', marginTop: '10px', height: '30px' }} />
    </ContentBox>
  );
};
export default CommunityDetail;
const ContentBox = styled.div`
  padding: 0 25px;
  margin: 20px 0;
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  @media only screen and (min-width: 800px) {
    margin: 20px 96px;
    margin-top: 30px;
  }
`;
const Title = styled.div`
  height: 22px;
  width: 90%;
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
  height: 300px;
  border-radius: 10px;
  width: 100%;
  margin-top: 20px;
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

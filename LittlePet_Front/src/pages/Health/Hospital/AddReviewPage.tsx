import starIcon from '#/assets/star.svg';
import styled from 'styled-components';
import vectorIcon from '#/assets/Vector.svg';
import addIcon from '#/assets/추가 버튼.svg';
import { useState, useEffect } from 'react';
import CategoryDropdown from '@components/CategoryDropdown';
import StarModal from '#/components/Hospital/StarModal';
import { useHospitalStore } from '#/context/hospitalStore';
const AddReviewPage = () => {
  const [categoryText, setCategoryText] = useState<string>('');
  const [valid, setValid] = useState<boolean>(false);
  const [showModal, setShowModal] = useState(false);
  const [star, setStar] = useState<number | null>(null);
  const [content, setContet] = useState<string>('');
  const { hospitalDetail } = useHospitalStore();
  useEffect(() => {
    if (star && content) {
      setValid(true);
    } else {
      setValid(false);
    }
  }, [star, content]);
  return (
    <Container>
      <Title>리뷰작성</Title>
      <Form>
        <HospitalName>
          {'>'} {hospitalDetail.name}
        </HospitalName>
        <div style={{ display: 'flex', gap: '15px' }}>
          <StarButton onClick={() => setShowModal(true)}>
            <img src={starIcon} style={{ width: '22px' }} />
            <StarText>{star ? `${star}.0` : '별점주기'}</StarText>
          </StarButton>

          <CategoryDropdown
            selectedCategory={categoryText}
            onCategorySelect={(category) => setCategoryText(category)}
          />
        </div>
        <Footer>
          <FooterItem>24.7.26 금</FooterItem>
          <VectorIcon src={vectorIcon} />
          <FooterItem>1번째 방문</FooterItem>
        </Footer>
        <AddContainer>
          <div style={{ fontSize: '20px', fontFamily: 'Pretendard-SemiBold' }}>
            사진/영상을 추가해주세요
          </div>
          <img src={addIcon} />
        </AddContainer>

        <ReviewTextArea
          onChange={(e) => setContet(e.target.value)}
          value={content}
          placeholder='리뷰를 작성해 주세요'
        />

        {valid === true ? (
          <ButtonWrapper>
            <SubmitButton type='submit'>
              <ButtonText>등록하기</ButtonText>
            </SubmitButton>
          </ButtonWrapper>
        ) : (
          <ButtonWrapper>
            <SubmitButton
              style={{ backgroundColor: '#E6E6E6' }}
              type='submit'
              value='제출'
            >
              <ButtonText style={{ color: '#737373' }}>등록하기</ButtonText>
            </SubmitButton>
          </ButtonWrapper>
        )}
      </Form>
      {showModal && (
        <StarModal
          onClose={() => setShowModal(false)}
          setStar={(score) => {
            setStar(score); // 부모 state에 반영
          }}
        />
      )}
    </Container>
  );
};
export default AddReviewPage;

const StarButton = styled.div`
  display: flex;
  gap: 5px;
  align-items: center;
  cursor: pointer;
`;
const StarText = styled.div`
  font-size: 16px;
  color: #c76b6b;
  cursor: pointer;
`;
const Container = styled.div`
  width: 100%;
  max-width: 855px;
  padding: 0 25px;
  position: relative;
  @media only screen and (min-width: 800px) {
    padding: 0 96px;
  }
`;
const ReviewTextArea = styled.textarea`
  border-radius: 15px;
  color: #737373;
  width: 100%
  resize: none;
  font-size: 12px;
  font-family: Pretendard-Medium;
  line-height: 18px;
  border: 1px solid #ffffff;
  min-height: 188px;
  box-shadow: 0 2px 5px #00000040;
  box-sizing: border-box;
  padding: 25px;
  &::placeholder {
    color: #737373;
    font-size: 16px;
    font-family: Pretendard-SemiBold;
  }
  &:focus {
    outline: none; /* 포커스 상태에서 기본 outline 제거 */
    border: none; /* 포커스 상태에서 추가 border 제거 */
  }
`;

const Title = styled.div`
  font-size: 22px;
  font-family: 'Pretendard-SemiBold';
  text-align: center;
  margin: 20px 0;
`;
const Form = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

const HospitalName = styled.div`
  font-size: 20px;
  font-family: 'Pretendard-SemiBold';
`;
const Footer = styled.div`
  height: 22px;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const FooterItem = styled.div`
  font-size: 14px;
  font-family: 'Pretendard-Medium';
  color: #333333;
`;

const VectorIcon = styled.img`
  height: 10px;
`;
const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`;
const SubmitButton = styled.button`
  height: 48px;
  box-sizing: border-box;
  width: 100%;
  border-radius: 5px;
  background-color: #6ea8fe;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border: none;
  @media only screen and (min-width: 800px) {
    width: 197px;
    box-shadow: 0 4px 5px rgba(0, 0, 0, 0.13);
  }
`;

const ButtonText = styled.div`
  font-size: 16px;
  font-family: 'Pretendard-SemiBold';
  color: #ffffff;
`;

const AddContainer = styled.div`
  border-radius: 15px;
  border: 1px solid #ffffff;
  height: 160px;
  box-shadow: 0 2px 5px #00000040;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 35px 69px;
  cursor: pointer;
`;

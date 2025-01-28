import starIcon from '#/assets/star.svg';
import styled from 'styled-components';
import arrowIcon from '#/assets/arrow.svg';
import vectorIcon from '#/assets/Vector.svg';
import addIcon from '#/assets/추가 버튼.svg';
import AnimalItem from '#/components/Community/AddPage/animalItem';
import React, { useState, useEffect } from 'react';
import StarModal from '#/components/Hospital/StarModal';
const AddReviewPage = () => {
  const animals = ['햄스터', '토끼', '고슴도치'];
  const [categoryText, setCategoryText] = useState<string>('');
  const [view, setView] = useState<boolean>(false);
  const [valid, setValid] = useState<boolean>(false);
  const [showModal, setShowModal] = useState(false);
  const [star, setStar] = useState<number>(null);
  const [content, setContet] = useState<string>('');
  // 종 카테고리 선택
  const handleCategoryClick = (name: string) => {
    setCategoryText(name);
    setView(false);
  };
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
        <HospitalName>{'>'} 로얄동물메디컬센터 본원</HospitalName>
        <div style={{ display: 'flex', gap: '15px' }}>
          <div
            onClick={() => setShowModal(true)}
            style={{ display: 'flex', gap: '5px', alignItems: 'center' }}
          >
            <img src={starIcon} style={{ width: '22px' }} />
            <div
              style={{ fontSize: '16px', color: '#C76B6B', cursor: 'pointer' }}
            >
              {star ? `${star}.0` : '별점주기'}
            </div>
          </div>
          <div>
            <DropdownContainer
              onClick={() => {
                setView(!view);
              }}
            >
              {categoryText === '' ? (
                <DropdownText>종 카테고리</DropdownText>
              ) : (
                <AnimalItem name={categoryText} />
              )}

              <img src={arrowIcon} />
              {view && (
                <DropdownMenu>
                  {animals.map((animal, index) => (
                    <AnimalItem
                      key={index}
                      name={animal}
                      onClick={() => handleCategoryClick(animal)}
                    />
                  ))}
                </DropdownMenu>
              )}
            </DropdownContainer>
          </div>
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
const Container = styled.div`
  width: 100%;
  padding: 0 25px;
  @media only screen and (min-width: 800px) {
    padding: 0 96px;
  }
`;
const ReviewTextArea = styled.textarea`
  border-radius: 15px;
  color: #737373;
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
const DropdownContainer = styled.div`
  width: 126px;
  height: 35px;
  border: 1px solid #e6e6e6;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 6px 15px;
  box-sizing: border-box;
  cursor: pointer;
  position: relative;
`;

const DropdownText = styled.div`
  font-family: 'Pretendard-Medium';
  font-size: 14px;
  color: #737373;
`;
const DropdownMenu = styled.ul`
  position: absolute;
  top: 23px;
  left: -1px;
  width: 126px;
  height: 126px;
  background: #ffffff;
  border: 1px solid #e6e6e6;
  border-radius: 5px;
  padding: 18px 25px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  z-index: 10;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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
  justify-content: flex-end;
`;
const SubmitButton = styled.button`
  height: 48px;
  box-sizing: border-box;
  width: 87.5%;
  border-radius: 5px;
  background-color: #6ea8fe;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 25px;
  cursor: pointer;
  border: none;
  @media only screen and (min-width: 800px) {
    width: 150px;
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
`;

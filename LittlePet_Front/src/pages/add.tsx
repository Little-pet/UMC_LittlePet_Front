import styled from 'styled-components';
import { useState, useRef, useEffect } from 'react';
import arrowIcon from '#/assets/arrow.png';
import pictureIcon from '#/assets/사진 첨부.png';
import videoIcon from '#/assets/영상 첨부.png';
import animalIcon from '#/assets/동물 아이콘.png';
const AnimalWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;
  cursor: pointer;
`;

const AnimalText = styled.div`
  font-size: 14px;
  color: #262627;
  font-family: 'Pretendard-SemiBold';
`;

const AnimalIcon = styled.img`
  width: 17px;
  height: 17px;
`;
// 카테고리에 글 등록하기 페이지에서 종 카테고리 드롭다운을 누르면 나오는 팝업
const AnimalItem = ({
  name,
  onClick,
}: {
  name: string;
  onClick?: () => void;
}) => {
  return (
    <AnimalWrapper onClick={onClick}>
      <AnimalIcon src={animalIcon} alt={`${name} Icon`} />
      <AnimalText>{name}</AnimalText>
    </AnimalWrapper>
  );
};

const CategoryButtonWrapper = styled.div<{ isSelected: boolean }>`
  width: 77px;
  height: 35px;
  border: 1px solid ${({ isSelected }) => (isSelected ? '#6EA8FE' : '#737373')};
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  cursor: pointer;
`;

const CategoryButtonText = styled.div<{ isSelected: boolean }>`
  font-size: 14px;
  font-family: 'Pretendard-Medium';
  color: ${({ isSelected }: { isSelected: boolean }) =>
    isSelected ? '#6EA8FE' : '#737373'};
`;
// 카테고리에 글 등록하기 페이지에 있는 카테고리 버튼 컴포넌트(Q&A, 일상, 소개)
const TagButton = ({
  label,
  onClick,
  isSelected,
}: {
  label: string;
  onClick: () => void;
  isSelected: boolean;
}) => (
  <CategoryButtonWrapper onClick={onClick} isSelected={isSelected}>
    <CategoryButtonText isSelected={isSelected}>{label}</CategoryButtonText>
  </CategoryButtonWrapper>
);

const Container = styled.div`
  margin-left: 200px;
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  width: 393px;
  height: 669px;
  border: 1px solid black;
  position: relative;
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
`;

const DropdownText = styled.div`
  font-family: 'Pretendard-Medium';
  font-size: 14px;
  color: #737373;
`;
const TagButtonContainer = styled.div`
  display: flex;
  gap: 12px;
`;

const Form = styled.form`
  height: 100%;
  padding: 0 25px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 20px;
`;
const MediaIconContainer = styled.div`
  display: flex;
  gap: 15px;
  height: 23px;
  align-items: center;
`;
const Title = styled.input`
  height: 22px;
  font-size: 24px;
  font-family: 'Pretendard-SemiBold';
  border: none;
  outline: none;
  ::placeholder {
    color: #737373;
  }
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid #e6e6e6;
  margin: 1px 0;
`;

const ContentBox = styled.textarea`
  width: 100%;
  height: 50%;
  resize: none; /* 사용자가 크기 조정 불가 */
  font-family: 'Pretendard-Medium';
  font-size: 16px;
  color: #737373;
  border: none;
  outline: none;
  ::placeholder {
    color: #737373;
  }
`;

const SubmitButton = styled.div`
  height: 48px;
  border-radius: 5px;
  background-color: #6ea8fe;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 25px;
  width: 343px;
  cursor: pointer;
`;

const ButtonText = styled.div`
  font-size: 16px;
  font-family: 'Pretendard-SemiBold';
  color: #ffffff;
`;
const DropdownMenu = styled.ul`
  position: absolute;
  top: 45px;
  left: 25px;
  width: 126px;
  height: 126px;
  background: #ffffff;
  border: 1px solid #e6e6e6;
  border-radius: 5px;
  padding: 15px 25px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  z-index: 10;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const AddPage = () => {
  const [view, setView] = useState(false);
  const [tagSelected, setTagSelected] = useState<string>('');
  const [categoryText, setCategoryText] = useState<string>('');
  const [uploadImg, setUploadImg] = useState<File>('');
  const [uploadVideo, setUploadVideo] = useState<File>('');
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [valid, setValid] = useState<boolean>(false);
  const imgRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLInputElement>(null);
  const isTitleValid = title.trim().length >= 1 && title.length <= 30;
  const isContentValid = content.trim().length >= 1 && content.length <= 1000;

  const animals = ['햄스터', '토끼', '고슴도치'];
  const tags = [
    {
      type: 'qna',
      title: 'Q&A',
    },
    {
      type: 'daily',
      title: '일상',
    },
    {
      type: 'intro',
      title: '소개',
    },
  ];

  const handleTagClick = (type: string) => {
    setTagSelected(type);
  };

  const handleCategoryClick = (name: string) => {
    setCategoryText(name);
    setView(false);
  };
  const onChangeImgUpload = (e) => {
    const { files } = e.target;
    const uploadFile = files[0];
    const reader = new FileReader();
    reader.readAsDataURL(uploadFile);
    reader.onloadend = () => {
      setUploadImg(reader.result);
    };
  };
  const handleImageClick = () => {
    if (imgRef.current) {
      imgRef.current.click(); // 숨겨진 input 클릭
    }
  };
  const onChangeVideoUpload = (e) => {
    const { files } = e.target;
    const uploadFile = files[0];
    const reader = new FileReader();
    reader.readAsDataURL(uploadFile);
    reader.onloadend = () => {
      setUploadVideo(reader.result);
    };
  };
  const handleVideoClick = () => {
    if (videoRef.current) {
      videoRef.current.click(); // 숨겨진 input 클릭
    }
  };
  const handleSubmit = () => {
    if (categoryText === '') {
      alert('종 카테고리를 선택해주세요.');
      return;
    }
    if (tagSelected === '') {
      alert('태그를 선택해 주세요.');
      return;
    }
    if (!isTitleValid) {
      alert('제목을 1자~30자 입력해주세요.');
      return;
    }
    if (!isContentValid) {
      alert('내용을 1자~1000자 입력해주세요.');
      return;
    }
  };
  useEffect(() => {
    if (
      isTitleValid &&
      isContentValid &&
      categoryText !== '' &&
      tagSelected !== ''
    ) {
      setValid(true);
    } else {
      setValid(false);
    }
  }, [title, content, categoryText, tagSelected]);

  return (
    <Container>
      <Form>
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
        </DropdownContainer>
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
        <TagButtonContainer>
          {tags.map((tag, index) => (
            <TagButton
              key={index}
              label={tag.title}
              onClick={() => handleTagClick(tag.type)}
              isSelected={tagSelected === tag.type}
            />
          ))}
        </TagButtonContainer>
        <MediaIconContainer>
          <img
            src={pictureIcon}
            style={{ width: '22.5px', height: '22.5px', cursor: 'pointer' }}
            onClick={handleImageClick} // 이미지 클릭 이벤트
          />
          <input
            type='file'
            accept='image/*'
            onChange={onChangeImgUpload}
            ref={imgRef}
            style={{ display: 'none' }} // input 숨김
          />
          <img
            src={videoIcon}
            style={{ width: '23.77px', height: '16.45px', cursor: 'pointer' }}
            onClick={handleVideoClick} // 비디오 클릭 이벤트
          />
          <input
            type='file'
            accept='video/*'
            onChange={onChangeVideoUpload}
            ref={videoRef}
            style={{ display: 'none' }} // input 숨김
          />
        </MediaIconContainer>
        <Title
          placeholder='제목을 입력하세요'
          onChange={(e) => setTitle(e.target.value)}
        />
        <Divider />
        <ContentBox
          placeholder='내용을 입력하세요'
          onChange={(e) => setContent(e.target.value)}
        />
        {valid === true ? (
          <SubmitButton onClick={handleSubmit}>
            <ButtonText>등록하기</ButtonText>
          </SubmitButton>
        ) : (
          <SubmitButton
            onClick={handleSubmit}
            style={{ backgroundColor: '#E6E6E6' }}
          >
            <ButtonText style={{ color: '#737373' }}>등록하기</ButtonText>
          </SubmitButton>
        )}
      </Form>
    </Container>
  );
};
export default AddPage;

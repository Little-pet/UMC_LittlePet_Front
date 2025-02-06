import styled from 'styled-components';
import React, { useState, useRef, useEffect, useMemo } from 'react';
import TagButton from '#/components/Community/AddPage/TagButton';
import CategoryDropdown from '@components/CategoryDropdown';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import DOMPurify from 'dompurify';

// 최대 업로드 개수 & 파일 크기
const MAX_IMAGES = 5;
const MAX_SIZE = 20 * 1024 * 1024; // 20MB
const VALID_TYPES = ['image/jpeg', 'image/png', 'image/jpg'];

const AddPage: React.FC = () => {
  const [tagSelected, setTagSelected] = useState<string>('');
  const [categoryText, setCategoryText] = useState<string>('');
  const [postImgs, setPostImgs] = useState<File[]>([]); // 서버에 전송할 파일 자체
  const [title, setTitle] = useState<string>('');
  const [textCount, setTextCount] = useState<number>(0);
  const [imgCount, setImgCount] = useState<number>(0);
  const [content, setContent] = useState<string>('');
  const [valid, setValid] = useState<boolean>(false);
  const quillRef = useRef<ReactQuill | null>(null);
  const isTitleValid = title.trim().length >= 1 && title.length <= 30;
  const isContentValid = textCount > 0;
  // 스크립트를 활용하여 javascript와 HTML로 악성 코드를 웹 브라우저에 심어,
  // 사용자 접속시 그 악성코드가 실행되는 것을 XSS, 보안을 위해 sanitize 추가
  const sanitizedContent = DOMPurify.sanitize(content);

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
  // 태그 클릭
  const handleTagClick = (type: string) => {
    setTagSelected(type);
  };
  const handleEditorChange = (value: string) => {
    setContent(value); // 상태 업데이트
  };

  // 파일 선택 핸들러
  const handleFileChange = () => {
    //input type= file DOM을 만든다.
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click(); //toolbar 이미지를 누르게 되면 이 부분이 실행된다.
    input.onchange = async () => {
      /*이미지 선택에 따른 조건을 다시 한번 하게 된다.*/
      const file = input.files ? input.files[0] : null;
      /*선택을 안하면 취소버튼처럼 수행하게 된다.*/
      if (!file) return;
      // ✅ 파일 유효성 검사
      if (!VALID_TYPES.includes(file.type)) {
        alert('지원되지 않는 파일 형식입니다.');
        return;
      }
      if (file.size > MAX_SIZE) {
        alert('파일 크기가 20MB를 초과할 수 없습니다.');
        return;
      }
      // ✅ `FileReader`를 사용하여 로컬에서 이미지 URL 생성
      const reader = new FileReader();
      reader.onload = () => {
        const imgUrl = reader.result as string; // ✅ Base64 URL
        let quillObj = quillRef.current?.getEditor(); // ✅ Quill 에디터 인스턴스 가져오기
        const range = quillObj?.getSelection();
        quillObj?.insertEmbed(range?.index || 0, 'image', imgUrl); // ✅ Quill 에디터에 이미지 삽입
        setContent(quillObj?.root.innerHTML || '');
        console.log(quillRef.current);
      };

      reader.readAsDataURL(file); // ✅ 파일을 Base64로 변환하여 `onload` 실행
      setPostImgs((prevImgs) => [...prevImgs, file]);
    };
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (categoryText === '') {
      alert('종 카테고리를 선택해주세요!');
      return;
    }
    if (tagSelected === '') {
      alert('글 카테고리를 선택해주세요!');
      return;
    }
    if (!isTitleValid) {
      alert('제목을 입력해주세요!');
      return;
    }
    if (!isContentValid) {
      alert('내용을 입력해주세요!');
      return;
    }
  };
  useEffect(() => {
    // 글자 수 계산 (HTML 태그 제거 후)
    const plainText = content.replace(/<[^>]*>/g, '').trim();
    const textCount = plainText.length; // 글자 수 계산

    // 이미지 개수 계산 (img 태그 매칭)
    const imgTags = content.match(/<img [^>]*src=["'][^"']*["'][^>]*>/g) || [];
    const imgCount = imgTags.length; // 이미지 개수 계산

    // 상태 업데이트
    setTextCount(textCount);
    setImgCount(imgCount);

    if (
      plainText.length > 0 &&
      isTitleValid &&
      categoryText !== '' &&
      tagSelected !== ''
    ) {
      setValid(true);
    } else {
      setValid(false);
    }
    console.log(imgCount);
  }, [title, content, categoryText, tagSelected]);

  const modules = useMemo(() => {
    return {
      toolbar: {
        container: [
          ['image'],
          [{ size: ['small', false, 'large', 'huge'] }],
          ['bold', 'underline'],
        ],
        handlers: {
          bold: () => {},
          underline: () => {},
          size: () => {},
          image: handleFileChange,
        },
      },
    };
  }, []);
  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <CategoryDropdown
          selectedCategory={categoryText}
          onCategorySelect={(category) => setCategoryText(category)}
        />

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

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <Title
            placeholder='제목을 입력하세요'
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
          <Divider />

          <StyledQuill
            theme='snow'
            modules={modules}
            placeholder='내용을 입력하세요'
            onChange={handleEditorChange}
            value={content}
          />

          {/*  <div
            dangerouslySetInnerHTML={{ __html: sanitizedContent }} // 안전하게 렌더링
          /> */}
        </div>
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
    </Container>
  );
};
export default AddPage;
const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  height: 656px;
  position: relative;
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
  @media only screen and (min-width: 800px) {
    padding: 0 96px;
  }
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
const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
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
  bottom: 20px;
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

const StyledQuill = styled(ReactQuill)`
  .ql-container {
    padding: 10px;
    height: 360px;
  }
  .ql-editor {
    border: none;
    font-family: 'Pretendard-Medium';
    font-size: 16px;
    line-height: 22px;
    padding: 0 !important;
    height: 340px;
    overflow-y: auto; /* 세로 스크롤 */
    /* 크롬, 사파리, 오페라, 엣지에서 스크롤바 숨기기 */
    ::-webkit-scrollbar {
      display: none;
    }

    /* 인터넷 익스플로러에서 스크롤바 숨기기 */
    -ms-overflow-style: none;

    /* 파이어폭스에서 스크롤바 숨기기 */
    scrollbar-width: none;
  }
  .ql-editor.ql-blank::before {
    font-style: normal;
    color: #737373;
  }

  .ql-toolbar .ql-bold {
    pointer-events: none; /* 클릭 방지 */
    cursor: default; /* 커서 기본값으로 설정 */
    opacity: 0.5; /* 비활성화된 느낌 */
  }
  .ql-toolbar .ql-bold:hover {
    background-color: transparent; /* hover 효과 제거 */
  }

  .ql-toolbar .ql-size {
    pointer-events: none; /* 클릭 방지 */
    cursor: default; /* 커서 기본값으로 설정 */
    opacity: 0.5; /* 비활성화된 느낌 */
  }
  .ql-toolbar .ql-size:hover {
    background-color: transparent; /* hover 효과 제거 */
  }

  .ql-toolbar .ql-underline {
    pointer-events: none; /* 클릭 방지 */
    cursor: default; /* 커서 기본값으로 설정 */
    opacity: 0.5; /* 비활성화된 느낌 */
  }
  .ql-toolbar .ql-underline:hover {
    background-color: transparent; /* hover 효과 제거 */
  }
`;

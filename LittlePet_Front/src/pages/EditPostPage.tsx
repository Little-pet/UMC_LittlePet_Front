import styled from 'styled-components';
import React, { useState, useRef, useEffect, useMemo } from 'react';
import TagButton from '#/components/Community/AddPage/tagButton';
import { useNavigate, useLocation } from 'react-router-dom';
import CategoryDropdown from '@components/CategoryDropdown';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import axios from 'axios';
// 최대 업로드 개수 & 파일 크기
const MAX_IMAGES = 5;
const MAX_SIZE = 20 * 1024 * 1024; // 20MB
const VALID_TYPES = ['image/jpeg', 'image/png', 'image/jpg'];
interface Content {
  type: 'text' | 'image';
  value: string;
  orderIndex: number;
}
interface Tag {
  type: string;
  title: string;
}
interface ImageData {
  file: File;
  base64: string;
}

const EditPostPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    category = '',
    categoryType = '',
    id = '',
    initialTitle = '',
    animal = '',
    contents = '',
  } = location.state || {};
  console.log(location.state);
  const [tagSelected, setTagSelected] = useState<Tag>({
    type: categoryType,
    title: category,
  });

  const [categoryText, setCategoryText] = useState<string>(animal);
  const [postImgs, setPostImgs] = useState<ImageData[]>([]);
  const [title, setTitle] = useState<string>(initialTitle);
  const [textCount, setTextCount] = useState<number>(0);
  const [content, setContent] = useState<string>('');
  const [valid, setValid] = useState<boolean>(false);
  const quillRef = useRef<ReactQuill | null>(null);
  const isTitleValid = title.trim().length >= 1 && title.length <= 30;
  const isContentValid = textCount > 0;

  const tags = [
    { type: 'qna', title: 'Q&A' },
    { type: 'daily', title: '일상' },
    { type: 'challenge', title: '챌린지' },
  ];
  // URL을 File로 변환하는 함수
  const convertURLtoFile = async (url: string): Promise<File> => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }
      const blob = await response.blob();
      const fileName = url.split('/').pop() || 'image.jpg';
      return new File([blob], fileName, { type: blob.type });
    } catch (error) {
      console.error('Error fetching image:', error);
      throw error;
    }
  };

  const initialState = {
    title: initialTitle,
    categoryText: animal,
    tagSelected: { type: categoryType, title: category },
    content: contents
      ? contents
          .map((item) =>
            item.content.startsWith('http')
              ? `<img src="${item.content}" alt="uploaded image"/>`
              : `<p>${item.content}</p>`
          )
          .join('')
      : '',
    postImgs: [] as ImageData[],
  };
  // 태그 클릭
  const handleTagClick = (tag: Tag) => {
    setTagSelected(tag);
  };
  const handleEditorChange = (value: string) => {
    setContent(value); // 상태 업데이트
  };
  const getImageCount = (htmlContent: string): number => {
    const imgTags =
      htmlContent.match(/<img [^>]*src=["'][^"']*["'][^>]*>/g) || [];
    return imgTags.length;
  };
  useEffect(() => {
    if (contents && Array.isArray(contents)) {
      // 텍스트와 이미지 데이터를 순서대로 HTML로 변환
      const formattedContent = contents
        .map((item) => {
          if (item.content.startsWith('http')) {
            return `<img src="${item.content}" alt="uploaded image"/>`;
          }
          return `<p>${item.content}</p>`;
        })
        .join('');

      setContent(formattedContent);
    }
    const convertImages = async () => {
      if (contents && Array.isArray(contents)) {
        const imageItems = contents.filter((item) =>
          item.content.startsWith('http')
        );
        const images: ImageData[] = await Promise.all(
          imageItems.map(async (item) => ({
            base64: item.content,
            file: await convertURLtoFile(item.content),
          }))
        );
        setPostImgs(images);
      }
    };
    convertImages();
    console.log(postImgs);
  }, [contents]);
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

      const quillObj = quillRef.current?.getEditor();
      if (!quillObj) return;

      // 현재 Quill 에디터의 콘텐츠에서 이미지 개수를 미리 확인
      const currentContent = quillObj.root.innerHTML || '';
      const currentImageCount = getImageCount(currentContent);

      // 만약 현재 이미지 개수가 MAX_IMAGES 이상이면 삽입하지 않음
      if (currentImageCount >= MAX_IMAGES) {
        alert(`최대 ${MAX_IMAGES}개의 이미지만 업로드할 수 있습니다.`);
        return;
      }

      // ✅ `FileReader`를 사용하여 로컬에서 이미지 URL 생성
      const reader = new FileReader();
      reader.onload = () => {
        const imgUrl = reader.result as string; // ✅ Base64 URL
        const quillObj = quillRef.current?.getEditor(); // ✅ Quill 에디터 인스턴스 가져오기
        const range = quillObj?.getSelection();
        quillObj?.insertEmbed(range?.index || 0, 'image', imgUrl); // ✅ Quill 에디터에 이미지 삽입
        const updatedContent = quillObj?.root.innerHTML || '';
        setContent(updatedContent);
        setPostImgs((prev) => [...prev, { file, base64: imgUrl }]);
        console.log('현재 이미지 개수: ', getImageCount(updatedContent));
      };
      reader.readAsDataURL(file); // ✅ 파일을 Base64로 변환하여 `onload` 실행
    };
  };
  function parseContent(html: string): Content[] {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const contents: Content[] = [];
    let orderIndex = 0;

    // 재귀적으로 노드를 순회하는 함수
    function traverse(node: Node) {
      if (node.nodeType === Node.TEXT_NODE) {
        // 텍스트 노드인 경우, 공백만 있는 경우는 제외
        const text = node.nodeValue?.trim();
        if (text) {
          contents.push({
            type: 'text',
            value: text,
            orderIndex: orderIndex++,
          });
        }
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        const element = node as HTMLElement;
        if (element.tagName.toLowerCase() === 'img') {
          // 이미지인 경우 src 속성을 가져옴
          const src = element.getAttribute('src') || '';
          contents.push({
            type: 'image',
            value: src,
            orderIndex: orderIndex++,
          });
        } else {
          // 다른 요소의 경우 자식 노드를 순회
          node.childNodes.forEach(traverse);
        }
      }
    }
    // 문서의 body에 있는 모든 자식 노드 순회
    doc.body.childNodes.forEach(traverse);
    return contents;
  }
  useEffect(() => {
    // 현재 에디터의 업데이트된 HTML에서 모든 이미지의 src 값을 추출합니다.
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, 'text/html');
    const imgTags = Array.from(doc.getElementsByTagName('img'));
    const currentImageSrcs = imgTags.map((img) => img.getAttribute('src'));

    // postImgs 상태를 필터링: 현재 content에 있는 Base64 문자열만 남김
    setPostImgs((prev) =>
      prev.filter((imgData) => currentImageSrcs.includes(imgData.base64))
    );
  }, [content]);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isTitleValid) {
      alert('제목을 입력해주세요!');
      return;
    }
    if (!isContentValid) {
      alert('내용을 입력해주세요!');
      return;
    }
    const parsedContents = parseContent(content);

    const getFileNameFromUrl = (url: string): string => {
      return url.split('/').pop() || url;
    };

    const updatedContents = parsedContents.map((item) => {
      if (item.type === 'image') {
        if (item.value.startsWith('data:image')) {
          // 새로 추가된 이미지 (Base64 → 파일 저장 필요)
          const fileIndex = postImgs.findIndex(
            (img) => img.base64 === item.value
          );
          if (fileIndex !== -1) {
            return { ...item, value: postImgs[fileIndex].file.name }; // 파일 이름 저장
          }
        } else {
          // 기존 이미지 (URL → 파일명 추출)
          return { ...item, value: getFileNameFromUrl(item.value) };
        }
      }
      return item;
    });

    const postForm = {
      title,
      smallPetCategory: categoryText,
      postCategory: tagSelected.title,
      contents: updatedContents,
    };

    const formData = new FormData();
    formData.append(
      'postForm',
      new Blob([JSON.stringify(postForm)], { type: 'application/json' })
    );

    postImgs.forEach((imgData) => {
      formData.append('images', imgData.file);
    });

    console.log(postForm);
    console.log(postImgs);
    try {
      const response = await axios.post(
        `https://umclittlepet.shop/api/post/${id}`,
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
          withCredentials: true,
        }
      );
      console.log('커뮤니티 게시물 수정 성공', response.data);
      navigate(`/community/${tagSelected.type}/${id}`);
    } catch (error) {
      console.error('커뮤니티 게시물 수정 실패:', error);
    }
  };
  useEffect(() => {
    // 글자 수 계산 (HTML 태그 제거 후)
    const plainText = content.replace(/<[^>]*>/g, '').trim();
    const textCount = plainText.length; // 글자 수 계산

    // 상태 업데이트
    setTextCount(textCount);
    const parseHTML = (html: string) => {
      const parser = new DOMParser();
      return parser.parseFromString(html, 'text/html').body.innerHTML;
    };
    const hasContent = plainText.length > 0;

    /* const isChanged =
      title !== initialState.title ||
      categoryText !== initialState.categoryText ||
      tagSelected.title !== initialState.tagSelected.title ||
      content !== initialState.content; */
    const isTitleChanged = title !== initialState.title;
    const isCategoryChanged = categoryText !== initialState.categoryText;
    const isTagChanged = tagSelected.title !== initialState.tagSelected.title;
    const isContentChanged =
      parseHTML(initialState.content) !== parseHTML(content);
    //const isContentChanged = content !== initialState.content;

    /*  console.log('isTitleChanged:', isTitleChanged);
    console.log('isCategoryChanged:', isCategoryChanged);
    console.log('isTagChanged:', isTagChanged);
    console.log('isContentChanged:', isContentChanged);
    console.log('initial', initialState.content);
    console.log(content); */

    const isChanged =
      isTitleChanged || isCategoryChanged || isTagChanged || isContentChanged;

    setValid(hasContent && isTitleValid && isChanged);
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
              onClick={() => handleTagClick(tag)}
              isSelected={tagSelected.title === tag.title}
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
            ref={quillRef}
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
              <ButtonText>수정하기</ButtonText>
            </SubmitButton>
          </ButtonWrapper>
        ) : (
          <ButtonWrapper>
            <SubmitButton
              style={{ backgroundColor: '#E6E6E6' }}
              type='submit'
              value='제출'
            >
              <ButtonText style={{ color: '#737373' }}>수정하기</ButtonText>
            </SubmitButton>
          </ButtonWrapper>
        )}
      </Form>
    </Container>
  );
};
export default EditPostPage;
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
  width: 100%;
  display: flex;
  justify-content: center;
  padding-bottom: 5px;
  @media only screen and (min-width: 800px) {
    justify-content: flex-end;
  }
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
    min-height: 360px;
    height: auto;
  }
  .ql-editor {
    border: none;
    font-family: 'Pretendard-Medium';
    font-size: 16px;
    line-height: 22px;
    padding: 0 !important;
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

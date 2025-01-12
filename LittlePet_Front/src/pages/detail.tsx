import { useParams } from 'react-router-dom';
import animalIcon from '../assets/동물 아이콘.png';
import femaleIcon from '#/assets/성별여자.png';
import vectorIcon from '#/assets/Vector 7.png';
import likeIcon from '#/assets/thumb-up.png';
import maleIcon from '#/assets/성별남자.png';
import styled from 'styled-components';
const Footer = styled.div`
  height: 22px;
  display: flex;
  align-items: center;
  gap: 12px;
`;
const FooterContainer = styled.div`
  display: flex;
  align-items: center;
`;
const FooterItem = styled.div`
  font-size: 12px;
  font-family: 'Pretendard-Medium';
  margin-right: 12px;
  color: ##737373;
`;
const VectorIcon = styled.img`
  width: 1px;
  height: 10px;
`;
const DetailPage = () => {
  const { postId } = useParams();
  const footerData = ['896', '8', '17'];
  // 추후 백엔드와 연결
  /*  const { data, isLoading, isError } = useQuery({
    queryFn: () => useGetDetail({ postId }),
    queryKey: ['postDetail', postId],
  }); */

  return (
    <div>
      <div style={{ padding: '0 25px', marginTop: '20px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <div style={{ fontSize: '20px', fontFamily: 'Pretendard-SemiBold' }}>
            토끼가 어느 순간부터 사료를 먹지 않아요..
          </div>
          <div style={{ display: 'flex', gap: '15px' }}>
            <div
              style={{ fontSize: '14px', fontFamily: 'Pretendard-SemiBold' }}
            >
              천혜향
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div
                style={{ display: 'flex', alignItems: 'center', gap: '3px' }}
              >
                <img
                  src={animalIcon}
                  style={{ width: '18px', height: '18px' }}
                />
                <div
                  style={{
                    fontSize: '14px',
                    fontFamily: 'Pretendard-SemiBold',
                  }}
                >
                  토끼
                </div>
              </div>
              <img src={femaleIcon} style={{ width: '8px', height: '13px' }} />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <div
                style={{
                  fontSize: '12px',
                  fontFamily: 'Pretendard-Medium',
                  color: '#737373',
                }}
              >
                2024.12.23
              </div>
              <div
                style={{
                  fontSize: '12px',
                  fontFamily: 'Pretendard-Medium',
                  color: '#737373',
                }}
              >
                12:52
              </div>
            </div>
          </div>
          <Footer>
            {footerData.map((item: string, index: number) => {
              return index === 0 ? (
                <FooterContainer key={index}>
                  <FooterItem style={{ margin: '0' }}>조회&nbsp;</FooterItem>
                  <FooterItem>{item}</FooterItem>
                  <VectorIcon src={vectorIcon} />
                </FooterContainer>
              ) : index === 1 ? (
                <FooterContainer key={index}>
                  <FooterItem style={{ margin: '0' }}>좋아요&nbsp;</FooterItem>
                  <FooterItem style={{ color: '#C76B6B' }}>{item}</FooterItem>
                  <VectorIcon src={vectorIcon} />
                </FooterContainer>
              ) : (
                <FooterContainer key={index}>
                  <FooterItem style={{ margin: '0' }}>댓글&nbsp;</FooterItem>
                  <FooterItem style={{ color: '#6EA8FE' }}>{item}</FooterItem>
                </FooterContainer>
              );
            })}
          </Footer>

          <div
            style={{
              fontSize: '12px',
              fontFamily: 'Pretendard-Medium',
              color: '#262627CC',
              lineHeight: '18px',
            }}
          >
            원래 매우 잘 먹던 아이가 한 일주일 정도 지났나.. 사료를 안
            먹네요.이렇게 두다가는 굶을까봐 간식을 줬는데 간식은 또 잘
            먹더라구요...
          </div>
        </div>
        <div
          style={{
            width: '68px',
            height: '30px',
            borderRadius: '25px',
            display: 'flex',
            alignItems: 'center',
            padding: '0 14px',
            boxSizing: 'border-box',
            justifyContent: 'space-between',
            marginTop: '13px',
            boxShadow: '0px 2px 5px #00000040',
          }}
        >
          <img src={likeIcon} style={{ width: '15px', height: '15px' }} />
          <div
            style={{
              fontSize: '16px',
              fontFamily: 'Pretendard-SemiBold',
              color: '#C76B6B',
            }}
          >
            11
          </div>
        </div>
      </div>
      <div style={{ marginTop: '20px' }}>
        <div
          style={{
            height: '44px',
            borderTop: '3px solid #E9E9E9',
            borderBottom: '3px solid #E9E9E9',
            boxSizing: 'border-box',
            display: 'flex',
            padding: '0 25px',
            alignItems: 'center',
          }}
        >
          <div style={{ fontSize: '14px', fontFamily: 'Pretendard-SemiBold' }}>
            전체 댓글&nbsp;
          </div>
          <div
            style={{
              fontSize: '14px',
              fontFamily: 'Pretendard-SemiBold',
              color: '#6EA8FE',
            }}
          >
            [29]
          </div>
        </div>
        <div className='댓글 리스트'>
          <div
            style={{
              borderBottom: '1px solid #E6E6E6',
              padding: '10px 25px',
              display: 'flex',
              flexDirection: 'column',
              gap: '5px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div
                style={{ fontSize: '12px', fontFamily: 'Pretendard-SemiBold' }}
              >
                감초
              </div>
              <div
                style={{ display: 'flex', alignItems: 'center', gap: '5px' }}
              >
                <div
                  style={{ display: 'flex', alignItems: 'center', gap: '2px' }}
                >
                  <img
                    src={animalIcon}
                    style={{ width: '14px', height: '14px' }}
                  />
                  <div
                    style={{
                      fontSize: '10px',
                      fontFamily: 'Pretendard-Medium',
                    }}
                  >
                    햄스터
                  </div>
                </div>
                <img src={maleIcon} />
              </div>
            </div>
            <div
              style={{
                fontSize: '10px',
                fontFamily: 'Pretendard-Medium',
                color: '#262627CC',
                lineHeight: '18px',
              }}
            >
              사료를 먹지 않는다고 간식을 계속 주는 건 좋지 않은 것 같아요...
              건초는 주셨나요?
            </div>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <div
                style={{
                  fontSize: '10px',
                  fontFamily: 'Pretendard-Medium',
                  color: '#737373',
                }}
              >
                2024.12.23 13:01
              </div>
              <div
                style={{
                  width: '56px',
                  height: '22px',
                  borderRadius: '5px',
                  border: '1px solid #E6E6E6',
                  fontSize: '10px',
                  fontFamily: 'Pretendard-Medium',
                  color: '#737373',
                  lineHeight: '22px',
                  textAlign: 'center',
                }}
              >
                답글 쓰기
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default DetailPage;

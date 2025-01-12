import AddButton from '#/components/addButton';
import ItemInTotalPage from '#/components/itemInTotalPage';
import 고슴도치 from '#/assets/고슴도치.png';
import TotalTextBar from '#/components/totalTextBar';
import { ItemListInTotal } from '#/components/styles/common';

const TotalPopularPage = () => {
  return (
    <>
      <TotalTextBar />
      <ItemListInTotal>
        <ItemInTotalPage
          title='인기'
          subText='토끼'
          description='토끼가 어느 순간부터 사료를 먹지 않아요...'
          footerData={['천혜향', '12.23', '919', '11', '29']}
        />
        <ItemInTotalPage
          title='인기'
          subText='토끼'
          description='토끼가 어느 순간부터 사료를 먹지 않아요...'
          footerData={['천혜향', '12.23', '919', '11', '29']}
          img={고슴도치}
        />
      </ItemListInTotal>
      <AddButton />
    </>
  );
};
export default TotalPopularPage;

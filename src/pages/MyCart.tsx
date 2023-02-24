import { useEffect, useState } from 'react';
import DropDown from '../components/DropDown';
import ItemCard from '../components/ItemCard';
import LittleTitle from '../components/LittleTitle';
import SavingsButtons from '../components/SavingsButtons';
import { getApplyItemData } from '../api/api';
import { item } from '../@types/data';
import { useCookies } from 'react-cookie';

const MyCart = () => {
  const [Token] = useCookies();
  const [savingValue, setSavingValue] = useState<string>('예금, 적금');
  const [bank, setBank] = useState({ title: '모든은행', value: '국민신한우리하나' });
  const [ress, setRess] = useState<item[]>();

  useEffect(() => {
    const cartData = () => {
      getApplyItemData(Token.accessToken).then(appData => {
        const data = appData.data.content.filter((content: item, index: number) => {
          return (
            appData.data.content.findIndex((content2: item) => {
              return content.productId === content2.productId;
            }) === index
          );
        });
        console.log(data);
        // console.log(appData.data);

        data.map((item: item) => {
          if (item.productType === '예금') {
            return (item.maxLimit = 0);
          } else {
            return (item.minimumAmount = 0);
          }
        });
        setRess(data);
      });
    };

    cartData();
  }, []);
  console.log(ress);

  // useEffect(() => {
  //   setRess([...ress]);
  //   // console.log(ress);
  // }, [ress]);

  // console.log(ress);

  return (
    <div>
      <LittleTitle title='신청한 상품 내역 보기' move='true' />
      <div>
        <div className='my-4 mx-5 flex flex-wrap justify-between items-center gap-2'>
          <SavingsButtons savingValue={savingValue} setSavingValue={setSavingValue} />
          {/* <ToggleButton toggle={toggle} setToggle={setToggle} /> */}
          <DropDown bank={bank} setBank={setBank} />
        </div>
      </div>
      {/* <div className='flex justify-end'>
        <button
          type='button'
          className='bg-main-blue text-white p-3 mr-5 rounded-3xl'
          onClick={() => {
            setRess([]);
          }}
        >
          전체삭제
        </button>
      </div> */}
      <div className='p-5 flex flex-col gap-5'>
        {ress !== undefined &&
          ress
            ?.filter(res => {
              // console.log(ress);
              // return
              return savingValue.includes(res.productType) && bank.value.includes(res.bankName);
              // return a;
              // console.log(a);
            })
            // .filter(res => {
            //   return bank.value.includes(res.bankName);
            // })
            .map(res => {
              // console.log(res);
              return (
                <div key={res.productName + res.productId}>
                  <ItemCard
                    product={res}
                    setRess={setRess as React.Dispatch<React.SetStateAction<item[]>>}
                    ress={ress}
                    Token={Token}
                  />
                </div>
              );
            })}
      </div>
    </div>
  );
};
export default MyCart;

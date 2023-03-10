import { AiFillMinusCircle } from 'react-icons/ai';
import { useLocation, useNavigate } from 'react-router-dom';
import { IItemCardProps } from '../../@types/IProps';
import { deleteCartData } from '../../api/api';
import { getImageUrl } from '../../utils/getImageUrl';

const ItemCard = ({ product, setRess, ress, Token }: IItemCardProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const onClick = () => {
    if (location.pathname === '/mypage/mycart' && setRess !== undefined && ress !== undefined) {
      deleteCartData(Token?.accessToken, product.id as number);
      setRess(ress.filter(res => res.productId !== product.productId));
    } else {
      navigate(`/detail/${product.productId}`);
    }
  };

  const comma = () => {
    if (product.minimumAmount !== 0) {
      const dallor = product.minimumAmount as number;
      return dallor.toLocaleString();
    } else {
      const dallor = product.maxLimit as number;
      return dallor.toLocaleString();
    }
  };
  return (
    <div className='h-28 w-full bg-white rounded-lg p-4 -shadow-basic cursor-pointer flex'>
      <div
        onClick={() => {
          navigate(`/detail/${product.productId}`);
        }}
        className='flex grow items-center'
      >
        <div
          className={` rounded-full m-auto opacity-90 flex justify-center items-center ${
            location.pathname !== '/mypage/mycart' ? 'basis-1/3' : 'basis-1/5'
          }`}
        >
          <img src={getImageUrl(product.bankName)} alt='은행로고' className='w-14 h-14' />
        </div>
        <div
          className={`text-gray flex flex-col items-start justify-center  gap-1  ${
            location.pathname !== '/mypage/mycart' ? 'basis-2/3' : 'basis-3/5'
          }`}
        >
          <p className='text-base font-bold mb-2 leading-tight'>{`${product.productName} `}</p>
          <p className={`text-sm ${location.pathname === '/mypage/mycart' && 'font-bold'}`}>
            {location.pathname === '/mypage/mycart' && `${product.productType} · `}최고 연
            {product.rate || product.maxRate}%
          </p>
          <p className='text-sm'>
            {location.pathname !== '/mypage/mycart'
              ? product.productType
              : product.productType === '적금'
              ? `최대한도 ${comma()}원`
              : `최저금액 ${comma()}원`}
          </p>
        </div>
      </div>
      <button onClick={onClick} className='basis-1/5 flex justify-center items-center'>
        {location.pathname === '/mypage/mycart' && <AiFillMinusCircle size={40} className='fill-main-blue' />}
      </button>
    </div>
  );
};

export default ItemCard;

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IItemGalleryProps } from '../../@types/IProps';
import { getImageUrl } from '../../utils/getImageUrl';

const ItemGallery = ({ productId, bankName, productName, maxRate, productType, keyword }: IItemGalleryProps) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => {
        navigate(`/detail/${productId}`);
      }}
      className='bg-white rounded-lg flex flex-col justify-between items-center px-4 py-5 -shadow-basic cursor-pointer text-gray gap-5 hover:opacity-70 relative'
    >
      <img src={getImageUrl(bankName)} alt='은행로고' className='w-14 h-14 mb-1' />
      <div className='flex flex-col justify-center h-fit'>
        <p className='text-center align-middle w-full text-sm font-bold leading-4'>{`${productName} `}</p>
      </div>

      <div className='flex flex-col items-center gap-2'>
        <p className='text-xs'>
          {`최고 연 `}
          <span className='text-base font-bold'>{maxRate}</span>
          {` %`}
        </p>
        <p className='text-xxs bg-sub-gray p-1 rounded-full px-2 text-white font-thin'>{productType || keyword}</p>
      </div>
    </div>
  );
};

export default ItemGallery;

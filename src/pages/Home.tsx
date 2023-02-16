import React from 'react';
import ItemCard from '../components/ItemCard';
import KeywordButton from '../components/KeywordButton';
import Slide from '../components/Slide';

const Home = () => {
  const keywords = ['전체', '주거래우대', '청년우대', '주택청약', '농어촌'];

  return (
    <>
      <div className='text-xl font-bold flex flex-col gap-3'>
        <span className='text-main-blue'>
          {`강해경 `}
          <span className='text-black'>님</span>
        </span>
        <p>이런 상품은 어떠신가요?</p>
      </div>
      <Slide />
      <div className='flex flex-wrap text-xs font-base gap-3 text-main-white my-6'>
        {keywords.map(keyword => (
          <KeywordButton key={keyword} keyword={keyword} />
        ))}
      </div>
      <div className='flex flex-wrap text-xs font-base gap-3 text-main-white my-6'>
        <ItemCard />
        <ItemCard />
        <ItemCard />
        <ItemCard />
      </div>
    </>
  );
};

export default Home;

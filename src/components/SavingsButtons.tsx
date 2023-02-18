import React, { useState } from 'react';
import { valueSaving } from '../@types/IProps';

const SavingsButtons = ({ savingValue, setSavingValue }: valueSaving) => {
  const [type, setType] = useState<string>('전체');

  const savingsTypes = [
    { ko: '전체', value: 'DEPOSIT, SAVING' },
    { ko: '예금', value: 'SAVING' },
    { ko: '적금', value: 'DEPOSIT' },
  ];

  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setType(`${event.currentTarget.dataset.name}`);
    if (setSavingValue !== undefined) {
      setSavingValue(`${event.currentTarget.dataset.value}`);
    }
  };

  console.log(savingValue);

  // const typeName = event.currentTarget.dataset.name;
  // typeName && setType(typeName);
  // if (event !== null && event.target instanceof HTMLElement) {
  //   console.log(event.target.dataset.name);
  // }

  // };

  return (
    <div className='flex gap-3 mr-12 text-gray font-bold text-lg'>
      {savingsTypes.map(savingType => (
        <button
          key={savingType.value}
          data-name={savingType.ko}
          onClick={onClick}
          data-value={savingType.value}
          className={
            type === savingType.ko ? 'pb-2 pt-3 px-3 text-main-blue font-bold' : 'pb-2 pt-3 px-3 text-sub-gray'
          }
        >
          {savingType.ko}
        </button>
      ))}
    </div>
  );
};

export default SavingsButtons;

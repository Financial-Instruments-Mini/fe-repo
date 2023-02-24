import { useState, useEffect } from 'react';
import RadioQ from '../components/RadioQ';
import LittleTitle from '../components/LittleTitle';
import TestQ from '../components/TestQ';
import SelectQ from '../components/SelectQ';
// import { IloginDataProps } from '../@types/IProps';
// import { useLoginApi } from '../api/useLoginApi';
import { getLoginData, logIn, putLoginData } from '../api/api';
import { useCookies } from 'react-cookie';
// import { usePushLoginData } from '../api/usePushLoginData';

const MyDetailPage = () => {
  const [replace, setReplace] = useState(false);
  const [Token] = useCookies();
  // console.log(Token);

  const [accToken, setAccToken] = useState({
    email: '',
    password: '',
    name: '',
    birthDate: '',
    phoneNumber: '',
    productType: '',
    bankName: '',
    job: '',
    accessToken: '',
  });

  useEffect(() => {
    const loginData = () => {
      getLoginData(Token.accessToken).then(appData => {
        setAccToken({
          //   ...accToken,
          email: appData.data.email,
          password: '',
          name: appData.data.name,
          birthDate: appData.data.birthDate,
          phoneNumber: appData.data.phoneNumber,
          productType: appData.data.productType,
          bankName: appData.data.bankName,
          job: appData.data.job,
          accessToken: Token.accessToken,
        });
        // console.log(appData.data.email);
      });
    };

    loginData();
  }, []);
  console.log(Token, accToken);

  // console.log(accToken);

  // const { loginData } = useLoginApi({
  //   url: 'https://www.ticcle.store:8080/api/v1/auth/login',
  //   method: 'POST',
  //   body: {
  //     email: 'a@naver.com',
  //     password: 'asdf123@',
  //   },
  // });

  // const [accToken, setAccToken] = useState(loginData?.data as IloginDataProps);
  // const [accToken, setAccToken] = useState(loginData())
  const [submitData, setSubmitData] = useState(false);

  // useEffect(() => {
  //   if (loginData() !== undefined) {
  //     setAccToken({ ...loginData() });
  //   }
  // }, [loginData?.data]);

  const submit = async () => {
    await setReplace(!replace);
    await setSubmitData(!submitData);
  };

  const subData = {
    token: accToken.accessToken,
    password: '',
    phoneNumber: '',
    productType: '',
    job: '',
    bankName: '',
  };

  useEffect(() => {
    // if (accToken?.tokenDto.accessToken !== undefined) {
    //   subData.token = accToken?.tokenDto.accessToken;
    // } else subData.token = '';

    if (accToken?.productType.includes('예금') && accToken?.productType.includes('적금')) {
      subData.productType = 'DEPOSIT_AND_SAVING';
    } else if (accToken?.productType.includes('예금') && !accToken?.productType.includes('적금')) {
      subData.productType = 'DEPOSIT';
    } else if (!accToken?.productType.includes('예금') && accToken?.productType.includes('적금')) {
      subData.productType = 'SAVING';
    } else subData.productType = '';

    if (accToken?.job === '회사원') {
      subData.job = 'OFFICE_WORKERS';
    } else if (accToken?.job === '공무원') {
      subData.job = 'PUBLIC_OFFICIAL';
    } else if (accToken?.job === '전문직') {
      subData.job = 'PROFESSION';
    } else if (accToken?.job === '농부') {
      subData.job = 'AGRICULTURAL_WORKER';
    } else if (accToken?.job === '사업가/자영업자') {
      subData.job = 'BUISNESSMAN';
    } else if (accToken?.job === '프리랜서') {
      subData.job = 'FREELANCER';
    } else if (accToken?.job === '주부') {
      subData.job = 'HOUSEWIFE';
    } else if (accToken?.job === '학생') {
      subData.job = 'STUDENT';
    } else if (accToken?.job === '군인') {
      subData.job = 'SOLDIER';
    } else if (accToken?.job === '무직') {
      subData.job = 'INOCCUPATION';
    } else subData.job = '';

    if (accToken?.bankName === '국민') {
      subData.bankName = 'KOOK_MIN';
    } else if (accToken?.bankName === '신한') {
      subData.bankName = 'SHIN_HAN';
    } else if (accToken?.bankName === '우리') {
      subData.bankName = 'WOO_RIE';
    } else if (accToken?.bankName === '하나') {
      subData.bankName = 'HA_NA';
    } else subData.bankName = '';

    if (accToken?.password !== undefined) {
      subData.password = accToken.password;
    } else subData.password = '';

    if (accToken?.phoneNumber !== undefined) {
      subData.phoneNumber = accToken.phoneNumber;
    } else subData.phoneNumber = '';
  }, [accToken, subData]);

  if (
    !replace &&
    submitData &&
    accToken.password.match(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,12}/g) === null
  ) {
    alert('비밀번호는 영어, 숫자, 특수문자 포함 8자 이상 12자 이하로 입력해주세요');
    setReplace(true);
    setSubmitData(true);
  }

  if (
    !replace &&
    submitData &&
    accToken.phoneNumber.replace(/[^0-9]/g, '').match(/^(\d{2,3})(\d{3,4})(\d{4})$/g) === null
  ) {
    alert('전화번호를 올바르게 입력해주세요.');
    setReplace(true);
    setSubmitData(true);
  }

  const option =
    !replace && submitData
      ? subData
      : { token: '', password: '', phoneNumber: '', productType: '', job: '', bankName: '' };

  useEffect(() => {
    const putlogData = () => {
      putLoginData(option).then(appData => {
        console.log(appData);
      });
    };
    putlogData();
  }, [option]);

  // console.log(option);

  // usePushLoginData(option);

  // console.log(replace, submitData);

  return (
    <div>
      <LittleTitle title='나의 정보 보기' move='true' />
      <div className='bg-white m-7 rounded-xl -shadow-basic '>
        <div className='p-10'>
          <TestQ
            question='이메일'
            loginData={accToken}
            setLoginData={setAccToken}
            type='text'
            value={accToken?.email}
            name='email'
          />
          <TestQ
            question='비밀번호'
            loginData={accToken}
            setLoginData={setAccToken}
            type='password'
            value={accToken?.password}
            name='password'
            replace={replace}
            placeHolder='영어, 숫자, 특수문자 포함 8자 이상 12자 이하'
          />
          <TestQ
            question='이름'
            loginData={accToken}
            setLoginData={setAccToken}
            type='text'
            value={accToken?.name}
            name='name'
          />
          <TestQ
            question='생년월일'
            loginData={accToken}
            setLoginData={setAccToken}
            type='text'
            value={accToken?.birthDate}
            name='birthDate'
          />
          <TestQ
            question='전화번호'
            loginData={accToken}
            setLoginData={setAccToken}
            type='text'
            value={accToken?.phoneNumber}
            name='phoneNumber'
            replace={replace}
            placeHolder="'-'' 제외 입력"
          />
          <RadioQ
            question='상품'
            loginData={accToken}
            setLoginData={setAccToken}
            value={accToken?.productType}
            replace={replace}
          />
          <SelectQ
            question='주거래은행'
            loginData={accToken}
            setLoginData={setAccToken}
            value={accToken?.bankName}
            name='bankName'
            replace={replace}
          />
          <SelectQ
            question='직업'
            loginData={accToken}
            setLoginData={setAccToken}
            value={accToken?.job}
            name='job'
            replace={replace}
          />
        </div>
        <div className='p-7 flex justify-center items-center'>
          <button
            type='button'
            onClick={submit}
            className='mb-7 bg-sub-green p-5 rounded-3xl -shadow-basic font-bold text-main-green hover:bg-main-green hover:text-sub-green'
          >
            {replace ? '수정 완료' : '내 정보 수정'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyDetailPage;

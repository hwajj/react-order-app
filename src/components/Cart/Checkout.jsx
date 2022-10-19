import { useState, useRef } from 'react';
import DaumPostcode from 'react-daum-postcode';
import classes from './Checkout.module.css';

const isEmpty = (value) => value.trim() === '';
const isNotFiveChars = (value) => value.trim().length != 5;

const Checkout = (props) => {
  console.log(props);
  const [openPostcode, setOpenPostcode] = useState(false);
  const [address, setAddress] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const nameInputRef = useRef();
  const postalCodeInputRef = useRef();
  const addressInputRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();
    const enteredName = nameInputRef.current.value;
    const enteredAddress = !isEmpty(enteredName);
    const enteredPostalCode = !isEmpty(enteredName);

    props.onConfirm({
      name: enteredName,
      Address: enteredAddress,
      postalCode: enteredPostalCode,
    });
  };

  const handle = {
    // 버튼 클릭 이벤트
    clickButton: () => {
      setOpenPostcode((current) => !current);
    },

    // 주소 선택 이벤트
    selectAddress: (data) => {
      console.log(`
            주소: ${data.address},
            우편번호: ${data.zonecode}
        `);
      setPostalCode(data.zonecode);
      setAddress(data.address);
      setOpenPostcode(false);
    },
  };

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div>
        <label htmlFor='name'></label>
        <input
          type='text'
          id='name'
          defaultValue={props.user.name}
          ref={nameInputRef}
        />
        <input type='text' id='address' value={address} />

        <input type='text' id='postalCode' value={postalCode} />
      </div>

      <div>
        <button onClick={handle.clickButton}>주소 검색</button>

        {openPostcode && (
          <DaumPostcode
            onComplete={handle.selectAddress} // 값을 선택할 경우 실행되는 이벤트
            autoClose={false} // 값을 선택할 경우 사용되는 DOM을 제거하여 자동 닫힘 설정
            defaultQuery='판교역로 235' // 팝업을 열때 기본적으로 입력되는 검색어
          />
        )}
      </div>
    </form>
  );
};

export default Checkout;

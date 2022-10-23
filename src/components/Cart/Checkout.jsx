import { useState, useRef } from 'react';
import DaumPostcode from 'react-daum-postcode';
import classes from './Checkout.module.css';
import { addAddress } from '../../modules/login';
import { useDispatch } from 'react-redux';

const Checkout = (props) => {
  const dispatch = useDispatch();
  const [openPostcode, setOpenPostcode] = useState(false);
  const [address, setAddress] = useState('');
  const [addressSecond, setAddressSecond] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const nameInputRef = useRef();
  const postalCodeInputRef = useRef();
  const addressInputRef = useRef();
  const addressInputRef2 = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();
    const enteredName = nameInputRef.current.value;
    const enteredAddress = addressInputRef.current.value;
    const enteredPostalCode = postalCodeInputRef.current.value;
    const enteredAddress2 = addressInputRef2.current.value;
    setAddress(enteredAddress);
    setAddressSecond(enteredAddress2);
    setPostalCode(enteredPostalCode);
    dispatch(addAddress(`${address} ${addressSecond} (${postalCode})`));
    props.onConfirm({
      name: enteredName,
      Address: address + ' ' + addressSecond,
      postalCode: postalCode,
    });
  };

  const handle = {
    // 버튼 클릭 이벤트
    clickButton: (event) => {
      event.preventDefault();
      setOpenPostcode((current) => !current);
    },

    // 주소 선택 이벤트
    selectAddress: (data) => {
      setPostalCode(data.zonecode);
      setAddress(data.address);
      setOpenPostcode(false);
    },
  };

  const addressInputCheck = () => {
    setAddressSecond(addressInputRef2.current.value);
  };

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={classes.info}>
        <div>
          <label htmlFor='name'>이름 </label>
          <input
            type='text'
            id='name'
            defaultValue={props.user.name}
            ref={nameInputRef}
          />
        </div>
        <div>
          <label htmlFor='address'>주소 </label>
          <input
            type='text'
            id='address'
            ref={addressInputRef}
            value={address || ''}
            readOnly
          />

          <button
            type='text'
            style={
              address
                ? { backgroundColor: 'buttonface' }
                : { backgroundColor: 'black', color: 'white' }
            }
            className={classes.addressSearch}
            onClick={handle.clickButton}
          >
            주소 검색
          </button>
        </div>

        <div className={classes.address2}>
          <label htmlFor='address2'>주소</label>
          <input
            type='text'
            id='address2'
            ref={addressInputRef2}
            onBlur={addressInputCheck}
          />

          <div
            type='text'
            style={
              addressSecond.length > 0
                ? { visibility: 'hidden' }
                : { visibility: 'visible' }
            }
          >
            나머지 주소를 입력해주세요
          </div>
        </div>

        <div>
          <label htmlFor='postalCode'>우편번호 </label>
          <input
            style={{ width: '100px' }}
            type='text'
            id='postalCode'
            ref={postalCodeInputRef}
            value={postalCode || ''}
            readOnly
          />
        </div>
      </div>
      <div>
        {openPostcode && (
          <div className={classes.postModal}>
            <DaumPostcode
              onComplete={handle.selectAddress} // 값을 선택할 경우 실행되는 이벤트
              autoClose={false} // 값을 선택할 경우 사용되는 DOM을 제거하여 자동 닫힘 설정
              defaultQuery='판교역로 235' // 팝업을 열때 기본적으로 입력되는 검색어
            />
          </div>
        )}
      </div>

      <div className={classes.submit}>
        {address && addressSecond && <button type='submit'>결제</button>}
      </div>
    </form>
  );
};

export default Checkout;

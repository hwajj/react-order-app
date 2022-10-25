import { useState, useEffect, useRef } from 'react';
import DaumPostcode from 'react-daum-postcode';
import classes from './Checkout.module.css';
import { addAddress } from '../../modules/login';
import { useDispatch } from 'react-redux';

const Checkout = ({ onScroll, onConfirm, user, onCancel }) => {
  const dispatch = useDispatch();
  const [openPostcode, setOpenPostcode] = useState(false);
  const [address, setAddress] = useState('');
  const [addressSecond, setAddressSecond] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const nameInputRef = useRef();
  const postalCodeInputRef = useRef();
  const addressInputRef = useRef();
  const addressDetailInputRef = useRef();
  const submitRef = useRef();
  const postcodeSearchRef = useRef();

  useEffect(() => {
    // 주문선택 클릭하면 주소 선택 창 보이게 함
    onScroll(postcodeSearchRef, 100);
    // 나머지 주소 입력시 결제버튼이 보이도록 함
    onScroll(submitRef, 1000);
    //주문서창 뜨면 부드럽게 아래로 내려가게 함
    onScroll(postalCodeInputRef);
  }, [openPostcode, addressSecond, onScroll]);

  const confirmHandler = (event) => {
    event.preventDefault();
    const enteredName = nameInputRef.current.value;
    const enteredAddress = addressInputRef.current.value;
    const enteredPostalCode = postalCodeInputRef.current.value;
    const enteredAddress2 = addressDetailInputRef.current.value;
    setAddress(enteredAddress);
    setAddressSecond(enteredAddress2);
    setPostalCode(enteredPostalCode);
    dispatch(addAddress(`${address} ${addressSecond} (${postalCode})`));
    onConfirm({
      name: enteredName,
      Address: address + ' ' + addressSecond,
      postalCode: postalCode,
    });
  };

  const handle = {
    // 버튼 클릭 이벤트
    clickButton: (event) => {
      event.preventDefault();
      setOpenPostcode(true);
    },

    // 주소 선택 이벤트
    selectAddress: (data) => {
      setPostalCode(data.zonecode);
      setAddress(data.address);
      setOpenPostcode(false);
    },
  };
  const setAddressDetailValue = () => {
    setAddressSecond(addressDetailInputRef.current.value);
  };

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={classes.info}>
        <div className={classes.name}>
          <label htmlFor='name'>이름 </label>
          <input
            type='text'
            id='name'
            defaultValue={user.name}
            ref={nameInputRef}
            placeholder='이름을 입력해주세요'
          />
        </div>
        <div className={classes.address}>
          <label htmlFor='address'>주소 </label>
          <input
            type='text'
            id='address'
            ref={addressInputRef}
            value={address || ''}
            readOnly
            placeholder='주소 검색 클릭'
          />

          <button
            type='text'
            className={classes.addressSearch}
            onClick={handle.clickButton}
          >
            주소 검색
          </button>
        </div>

        <div className={classes.addressDetail}>
          <label htmlFor='addressDetail'>주소</label>
          <input
            type='text'
            id='addressDetail'
            ref={addressDetailInputRef}
            onChange={setAddressDetailValue}
            placeholder='나머지 주소를 입력해주세요'
            onBlur={() => submitRef.current?.focus()}
          />
          <div
            type='text'
            style={
              addressSecond.length > 0
                ? { visibility: 'hidden' }
                : { visibility: 'visible', color: 'red' }
            }
          ></div>
        </div>

        <div className={classes.postalCode} ref={postalCodeInputRef}>
          <label htmlFor='postalCode'>우편번호 </label>
          <input
            type='text'
            id='postalCode'
            value={postalCode || ''}
            readOnly
          />
        </div>
      </div>
      <div ref={postcodeSearchRef}>
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
        {address && addressSecond && (
          <button type='submit' ref={submitRef}>
            결제
          </button>
        )}
      </div>
    </form>
  );
};

export default Checkout;

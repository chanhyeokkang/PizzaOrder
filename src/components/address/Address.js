import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../../components/address/Address.css';

const Address = () => {
    const navigate = useNavigate(); // React Router의 네비게이션 기능 사용

    // 입력된 데이터를 관리하기 위한 상태 관리
    const [formData, setFormData] = useState({
        name: "",
        address: "",
        phoneNumber: "",
        creditCard: "",
    });

    // 알파벳만 허용하는 함수
    const allowOnlyAlphabets = (e) => {
        const { name, value } = e.target;
        const regex = /^[a-zA-Z\s]*$/; // 알파벳과 공백만 허용하는 정규식

        if (regex.test(value) || value === "") {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };
    
    // 숫자만 허용하는 함수
    const allowOnlyNumbers = (e) => {
        const { name, value } = e.target;
        const regex = /^[0-9]*$/; // 숫자만 허용하는 정규식
    
        if (regex.test(value) || value === "") {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };  

    // 주문 취소 처리 함수
    const handleCancel = () => {
        navigate("/cart"); // 카트 페이지로 이동
    };

    // 주문 처리 함수
    const handleOrder = () => {
        const { name, address, phoneNumber, creditCard } = formData;
    
        if (!name || !address || !phoneNumber || !creditCard) {
            alert("모두 입력해주세요."); // 필수 정보를 입력하지 않았을 때 알림
        } else {
            alert("주문이 완료되었습니다."); // 주문 완료 알림
            navigate("/"); // 홈페이지로 이동
        }
    }; 

    return (
        <div className="address-container">
            <h1>주소 입력</h1>
            <form>
                <label>
                    *이름
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={allowOnlyAlphabets}
                    />
                </label>
                <label>
                    *주소
                    <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={allowOnlyAlphabets}
                    />
                </label>
                <label>
                    *전화번호
                    <input
                        type="text"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={allowOnlyNumbers}
                    />
                </label>
                <label>
                    *신용카드
                    <input
                        type="text"
                        name="creditCard"
                        value={formData.creditCard}
                        onChange={allowOnlyNumbers}
                    />
                </label>

            </form>
            <div className="buttons">
                <button onClick={handleCancel} className="cancel-button">
                    취소하기
                </button>
                <button onClick={handleOrder} className="order-button">
                    주문하기
                </button>
            </div>
        </div>
    );
};

export default Address;
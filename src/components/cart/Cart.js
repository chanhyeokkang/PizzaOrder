import { useContext, useEffect, useState } from "react";
import { ContextApp } from "../context/Context";
import '../../components/cart/Cart.css';
import { useNavigate } from "react-router-dom";

const Cart = () => {
    const navigate = useNavigate(); // React Router의 navigate 훅 사용

    const { cartItem, addToCart, setCartItem } = useContext(ContextApp); // ContextApp의 상태 및 함수들 가져오기

    const [totalAmount, setTotalAmount] = useState(0); // 총 가격을 저장할 상태 선언

    const initialCheckedItems = cartItem.reduce((acc, item) => {
        acc[item.id] = true; // 기본 상태를 true로 설정 (체크된 상태)
        return acc;
    }, {});

    const [checkedItems, setCheckedItems] = useState(initialCheckedItems);

    useEffect(() => {
        let total = 0;

        if (cartItem && cartItem.length > 0) {
            // 장바구니에 아이템이 있으면 각 아이템의 가격을 합산하여 총 가격 계산
            cartItem.forEach((item) => {
                total += Number(item.price * item.count);
            });
        }

        setTotalAmount(total); // 총 가격 상태 업데이트
    }, [cartItem]);

    // 장바구니 아이템 수량 업데이트 함수
    const updateCartItem = (id, newCount) => {
        const updatedCart = cartItem.map((item) => {
            if (item.id === id) {
                return {
                    ...item,
                    count: newCount,
                };
            }
            return item;
        });

        setCartItem(updatedCart); // 업데이트된 장바구니 상태로 설정
    };

    // 장바구니에서 특정 아이템 삭제 함수
    const removeItem = (id) => {
        const updatedCart = cartItem.map((item) => {
            if (item.id === id && item.count > 1) {
                return {
                    ...item,
                    count: item.count - 1,
                };
            } else if (item.id === id && item.count <= 1) {
                return null;
            }
            return item;
        });

        const filteredCart = updatedCart.filter((item) => item !== null);

        setCartItem(filteredCart); // 아이템 삭제 후 장바구니 상태 업데이트
    };

    // 홈페이지로 이동 함수
    const goToHomePage = () => {
        navigate("/menu"); // 메뉴 페이지로 이동
    };

    // 주소 입력 페이지로 이동 함수
    const goToAddressPage = () => {
        navigate("/address"); // 주소 페이지로 이동
    };

    // 체크박스 변경 핸들러
    const handleCheckboxChange = (id) => {
        setCheckedItems({
            ...checkedItems,
            [id]: !checkedItems[id], // 체크 상태 반전
        });
    };

    // 선택된 아이템 삭제 함수
    const removeCheckedItems = () => {
        const updatedCart = cartItem.filter((item) => !checkedItems[item.id]);
        setCartItem(updatedCart);
        setCheckedItems({}); // 체크 상태 초기화
    };

    return (
        <div className="cart-container">
            <h1>장바구니</h1>
            {cartItem.length === 0 ? "장바구니가 비어있습니다." : ""}
            <div className="cart-wrapper">
                {cartItem.map((item) => (
                    <div key={item.id} className="cart">
                        <img className="image" src={item.image} alt="" />
                        <div className="details">
                            <p>{item.name}</p>
                            <div className="add-remove-button">
                                <button onClick={() => removeItem(item.id)}>-</button>
                                <input
                                    type="text"
                                    value={item.count}
                                    onChange={(e) => {
                                        const newCount = parseInt(e.target.value, 10);
                                        if (!isNaN(newCount)) {
                                            updateCartItem(item.id, newCount);
                                        }
                                    }}
                                />
                                <button onClick={() => addToCart(item)}>+</button>
                            </div>
                            <p>${(item.price * item.count).toFixed(2)}</p>
                        </div>
                        <input
                            type="checkbox"
                            checked={checkedItems[item.id] || false}
                            onChange={() => handleCheckboxChange(item.id)}
                        />
                    </div>
                ))}

                {cartItem.length > 0 && (
                    <p>합계: ${totalAmount}</p>
                )}

                <div className="buttons">
                    {Object.keys(checkedItems).some((key) => checkedItems[key]) && (
                        <button onClick={removeCheckedItems} className="remove-checked-button">
                            선택 삭제
                        </button>
                    )}

                    <button className="back-button" onClick={goToHomePage}>메뉴</button>
                    {cartItem.length !== 0 && (
                        <button onClick={goToAddressPage} className="pay-out-button">
                            결제하기
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Cart;
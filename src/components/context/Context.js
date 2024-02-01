import React, { createContext, useState, useEffect } from "react";

// 상태 관리를 위한 Context 생성
export const ContextApp = createContext(null);

const Context = (props) => {
    const [cartItem, setCartItem] = useState([]); // 장바구니에 담긴 상품 목록을 관리하는 상태

    const [added, setAdded] = useState(null); // 추가된 상품을 표시하는 상태

    const [cartCount, setCartCount] = useState(0); // 장바구니에 담긴 상품 수량을 관리하는 상태

    useEffect(() => {
        let count = 0;
        if (cartItem && cartItem.length > 0) {
            // 장바구니에 상품이 있으면 각 상품의 수량을 합산하여 전체 수량 계산
            cartItem.forEach((item) => {
                count += item.count;
            });
        }
        setCartCount(count); // 전체 수량을 업데이트
    }, [cartItem]);

    // 장바구니에 상품을 추가하는 함수
    const addToCart = (dish, key) => {
        setTimeout(() => {
            setAdded(null); // 1초 후에 추가된 상품 표시 초기화
        }, 1000);

        setAdded(key); // 추가된 상품 키 값 설정

        const existingItem = cartItem.find((item) => item.id === dish.id);
        if (existingItem) {
            // 이미 있는 상품인 경우 수량만 증가
            setCartItem((prev) =>
                prev.map((item) =>
                    item.id === dish.id ? { ...item, count: item.count + 1 } : item
                )
            );
        } else {
            // 새로운 상품인 경우 장바구니에 추가
            setCartItem([...cartItem, { ...dish, count: 1 }]);
        }
    };

    // Context에 전달할 값
    const values = { addToCart, cartItem, setCartItem, added, cartCount };

    return (
        <ContextApp.Provider value={values}>
            {props.children} {/* 자식 컴포넌트 렌더링 */}
        </ContextApp.Provider>
    );
};

export default Context;
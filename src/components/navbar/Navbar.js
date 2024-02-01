import { AiOutlineShoppingCart } from "@react-icons/all-files/ai/AiOutlineShoppingCart"; 
import { FaHome } from "@react-icons/all-files/fa/FaHome"; 
import '../../components/navbar/Navbar.css'; 
import { Link } from 'react-router-dom'; // 리액트 라우터의 링크 임포트
import React, { useContext } from 'react'; // 리액트 및 useContext 임포트
import { ContextApp } from '../context/Context'; 

const Navbar = () => {
    const { cartCount } = useContext(ContextApp); // ContextApp으로부터 cartCount 가져오기

    return (
        <div className="navbar">
            {/* 홈 링크 */}
            <div className="menu">
                <Link to=''>
                    <FaHome className="home-icon-color" /> {/* 홈 아이콘 */}
                </Link>
            </div>
            {/* 로고 */}
            <div className="logo">
                PIZZA {/* 로고 텍스트 */}
            </div>
            {/* 장바구니 아이콘과 아이템 개수 */}
            <div className="cart-icon">
                <Link to='/cart'>
                    <AiOutlineShoppingCart className="cart-icon-color" /> {/* 장바구니 아이콘 */}
                    {cartCount > 0 && <span className="cart-count">{cartCount}</span>} {/* 장바구니 아이템 개수 */}
                </Link>
            </div>
        </div>
    )
};

export default Navbar;
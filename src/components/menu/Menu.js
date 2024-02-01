import { useContext, useEffect, useRef, useState } from 'react';
import data from '../../assets/data/data.json'; // JSON 데이터 가져오기
import '../../components/menu/Menu.css'; // 메뉴 스타일 시트 가져오기
import { motion } from 'framer-motion'; // Framer Motion 라이브러리에서 motion 임포트
import { AiOutlineClose } from '@react-icons/all-files/ai/AiOutlineClose'; // 아이콘 임포트
import { FaPepperHot } from '@react-icons/all-files/fa/FaPepperHot'; // 아이콘 임포트
import { FaLeaf } from '@react-icons/all-files/fa/FaLeaf'; // 아이콘 임포트
import { ContextApp } from '../context/Context'; // 컨텍스트 임포트

const Menu = () => {
    let menu = Object.getOwnPropertyNames(data); // 데이터에서 메뉴 항목 가져오기

    const [selected, setSelected] = useState(0); // 현재 선택된 항목을 상태로 관리

    const [selectedDish, setSelectedDish] = useState("pizza"); // 선택된 요리를 상태로 관리

    const [width, setWidth] = useState(0); // 슬라이드 요소의 너비를 상태로 관리

    const slide = useRef(null); // 슬라이드 요소를 위한 useRef 생성
    
    const innerSlide = useRef(null); // 내부 슬라이드 요소를 위한 useRef 생성

    const { addToCart, cartItem, added } = useContext(ContextApp); // 컨텍스트에서 필요한 요소들 가져오기

    useEffect(() => {
        // 슬라이드 요소의 너비 설정
        setWidth(slide.current.scrollWidth - slide.current.offsetWidth);
        // 내부 슬라이드 요소 초기 위치를 setTimeout으로 설정
        setTimeout(() => {
            innerSlide.current.style.transform = "translateX(0)";
        }, 5);
    }, [selectedDish]); // selectedDish 상태가 변경될 때마다 실행

    console.log(cartItem); // 카트 아이템 로그

    const handleClick = (item, key) => {
        setSelected(key); // 선택된 항목 업데이트
        setSelectedDish(item); // 선택된 요리 업데이트
        // 내부 슬라이드 요소 초기 위치를 setTimeout으로 설정
        setTimeout(() => {
            innerSlide.current.style.transform = "translateX(0)";
        }, 5);
    };

    return (
        <div className="wrapper">
            <h1 className="title">메뉴</h1>
            <div className="menu-list-wrapper">
                <div className="menu-list">
                    {menu.map((item, key) => (
                        <div
                            key={key}
                            onClick={() => handleClick(item, key)}
                            className={selected === key ? "item-container active" : "item-container"}
                        >
                            <p>{item}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div className='food-wrapper'>
                <motion.div
                    ref={slide}
                    whileTap={{ cursor: "grabbing" }}
                    className='pizza-wrapper'
                >
                    <motion.div
                        drag="x"
                        dragConstraints={{ right: width, left: -width }}
                        className='pizza-container'
                        ref={innerSlide}
                    >
                        {data[selectedDish] ? (
                            data[selectedDish].map((dish, key) => (
                                <motion.div key={dish.id} className='pizza-img-container'>
                                    <motion.img className='pizza-img' src={dish.image} alt='' />
                                    <h4 className='name'>{dish.name}</h4>
                                    <p className='description'>{dish.description}</p>
                                    <div className='details'>
                                        <p>{dish.spicy ? <FaPepperHot style={{ color: 'red' }} /> : <AiOutlineClose style={{ color: 'white' }} />}</p>
                                        <p>{dish.vegetarian ? <FaLeaf style={{ color: 'green' }} /> : <AiOutlineClose style={{ color: 'white' }} />}</p>
                                    </div>
                                    <button onClick={() => addToCart(dish, key)} className={added === key ? 'btn btn-add added' : 'btn btn-add'}>
                                        {added === key ? "추가했습니다." : "추가하기"}
                                    </button>
                                </motion.div>
                            ))
                        ) : (
                            <p>메뉴의 카테고리를 클릭하세요.</p>
                        )}
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
};
export default Menu;

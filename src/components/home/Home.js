import { Link } from 'react-router-dom';
import pizza from '../../assets/img/pizza_main.jpg';
import '../../components/home/Home.css';


const Home = () => {
    return (
        <div className="container">
            <div className="left">
                <div className="text-content">
                    <h1>피자</h1>
                    <p>설명 여기에</p>
                    <Link to="/menu">
                        <button className="btn">메뉴 보기</button>
                    </Link>
                </div>
            </div>
            <div className="right">
                <div className="img-container">
                    <img src={pizza} alt="" className="pizza" />
                </div>
            </div>
        </div>
    )
};

export default Home;
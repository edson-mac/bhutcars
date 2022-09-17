import './Header.css'
import bhut from '../../assets/bhut.svg'
import car from '../../assets/car.svg'

function Header() {
    return (
        <div className="header">
            <div className='logosBox'>
                <img className="bhutLogo" src={bhut} alt="bhutLogo" />
                <img className="carLogo" src={car} alt="carLogo" />
            </div>
        </div>
    )
}

export default Header
import { useProvider } from '../../context/provider'
import CarCard from '../CarCard/CarCard'
import './CarList.css'

function CarList() {
    const { carList } = useProvider();
    return (
        <div className='carList'>

            {carList && carList.map((e) =>
                <CarCard
                    key={e._id}
                    title={e.title}
                    brand={e.brand}
                    age={e.age}
                    price={e.price}
                    id={e._id} />)}

        </div>
    )
}

export default CarList
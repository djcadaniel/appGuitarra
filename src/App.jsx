import { useEffect, useState } from "react"
import { Guitar, Header } from "./components"
import {db} from './data/db'


function App() {

    const initialCar = () =>{
        const localStorageCar = localStorage.getItem('car')
        return localStorageCar ? JSON.parse(localStorageCar) : []
    }

    const [data, setdata] = useState(db)
    const [car, setCar] = useState(initialCar)

    const MAX_ITEMS = 5;
    const MIN_ITEMS = 1;

    useEffect(() => {
        localStorage.setItem('car', JSON.stringify(car))
    }, [car])
    

    function addToCart(item){

        const itemExists = car.findIndex((guitar) => guitar.id === item.id)
        if(itemExists >=0){
            if(car[itemExists].quantity === MAX_ITEMS) return;
            const updatedCart = [...car];
            updatedCart[itemExists].quantity++;
            setCar(updatedCart)
            console.log('existe')
        }else{
            item.quantity = 1;
            console.log('no existe')
            setCar([...car, item])
        }
        // !car.includes(item) && setCar([...car, item])
    }

    function removeCar(id){
        console.log('eliminando')
        setCar( car.filter(item => item.id !== id))
    }

    function increaseQuantity(id){
        const updatedCart = car.map(guitar => {
            if(guitar.id === id && guitar.quantity < MAX_ITEMS){
                return{
                    ...guitar,
                    quantity: guitar.quantity + 1
                }
            }
            return guitar
        })
        setCar(updatedCart)
    }

    
    function decrementCar(id){
        const updatedCart = car.map( guitar => {
            if(guitar.id === id && guitar.quantity > MIN_ITEMS ){
                return {
                    ...guitar,
                    quantity : guitar.quantity - 1
                }
            }else{
                return guitar
            }
        })
        
        setCar(updatedCart)
    }

    function clearCar(){
        setCar([])
    }

  return (
    <>
    
    <Header 
        car={car}
        removeCar = {removeCar}
        increaseQuantity = {increaseQuantity}
        decrementCar = {decrementCar}
        clearCar = {clearCar}
    />

    <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
            {data. map((guitar)=> (
                <Guitar 
                    key = { guitar.id }
                    guitar = { guitar }
                    setCar = { setCar }
                    addToCart = {addToCart}
                />
            ))}
        </div>
    </main>
    
    <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
            <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
        </div>
    </footer>
    </>
  )
}

export default App

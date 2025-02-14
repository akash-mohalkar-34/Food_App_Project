/* eslint-disable react-hooks/rules-of-hooks */

// eslint-disable-next-line no-unused-vars
import { React, useContext, createContext, useReducer } from "react";


const CartStateContext = createContext();
const CartDispatchContext = createContext();

const reducer = (state, action) =>{
    switch (action.type)
    {
        case "ADD":
            return [...state, {id:action.id , name : action.name , price: action.price, size:action.size , qty:action.qty , img:action.img}];
       
        case "REMOVE":
            {
                let newArr = [...state];
                newArr.splice(action.index, 1);
                return newArr;
            }

        case "UPDATE":
            {
            let arr = [...state];
            arr.find((food, index) => {
                if (food.id === action.id) {
                    console.log(food.qty, parseInt(action.qty), action.price, food.price)
                    arr[index] = {...food , qty: parseInt(action.qty) + food.qty , price:action.price + food.price}
                }
            })
                return arr;
            }

           case "DROP": {
            return [];
            }
        default:
            console.log("Error in reducer")
    }
    console.log("action " , action.img)
}


// eslint-disable-next-line react/prop-types
export const CartProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, [])
        return(
            <CartDispatchContext.Provider value = {dispatch}>
                <CartStateContext.Provider value = {state}>
                {children}
                </CartStateContext.Provider>
            </CartDispatchContext.Provider>
        )
    
}
export const useCart = () => useContext(CartStateContext);
export const useDispatchCart = () => useContext(CartDispatchContext);


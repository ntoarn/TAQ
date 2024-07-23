import { ICategory } from "../interfaces/Category"

type State = {
    categories: ICategory[]
}
type Action = 
| {
    type: "SET_CATEGORIES",
    payload: ICategory[]
} 
| { type : "ADD_CATEGORY"; payload: ICategory }
| { type : "UPDATE_CATEGORY"; payload: ICategory }
| { type : "DELETE_CATEGORY"; payload:  string | number}

const  categoryReducer = (state:State , action: Action) => {
    switch(action.type) {
        case "SET_CATEGORIES": 
        return {
            ...state, categories: action.payload
        }
        case "ADD_CATEGORY": 
        return {
            ...state, 
            categories: [...state.categories, action.payload]
        }
        case "UPDATE_CATEGORY": 
        return {
            ...state, 
            categories: state.categories.map(category => (category._id === action.payload._id ? action.payload : category))
        }
        case "DELETE_CATEGORY": 
        return {
            ...state, 
            categories: state.categories.filter((category) => category._id !== action.payload )
        }
        default: 
        return state;
    }
}

export default categoryReducer
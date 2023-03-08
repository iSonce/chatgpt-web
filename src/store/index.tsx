import { useReducer } from 'react'
import { reducer } from './reducer'
import { initState } from './initState'
import { createContext } from "react"

type Props = {
  children?: React.ReactNode
};

export const StoreContext:React.Context<Store> = createContext<any>(null)

export function StoreProvider({children}:Props){
  const [state,dispatch] = useReducer(reducer,initState)
  return (
    <StoreContext.Provider value={[state,dispatch]}>
        {children}
    </StoreContext.Provider>
  )
}

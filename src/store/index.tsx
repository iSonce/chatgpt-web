import { useEffect, useReducer, createContext } from 'react'
import reducer from './reducer'
import initState from './initState'

type Props = {
  children?: React.ReactNode
}

export const StoreContext: React.Context<Store> = createContext<any>(null)

export function StoreProvider({ children }: Props) {
  const [state, dispatch] = useReducer(reducer, initState)
  // when state change, update localStorage
  // useEffect(() => {
  //   window.localStorage.setItem('chatStorage', JSON.stringify(state))
  // }, [state])
  return (
    <StoreContext.Provider value={[state, dispatch]}>
      {children}
    </StoreContext.Provider>
  )
}

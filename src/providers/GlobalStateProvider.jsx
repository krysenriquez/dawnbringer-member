import {useState, createContext, useContext} from 'react'

const GlobalStateContext = createContext({
  param: undefined,
  setParam: (any) => {},
})

const useGlobalState = () => {
  return useContext(GlobalStateContext)
}

const GlobalStateProvider = ({children}) => {
  const [param, setParam] = useState(undefined)

  return (
    <GlobalStateContext.Provider
      value={{
        param,
        setParam,
      }}
    >
      {children}
    </GlobalStateContext.Provider>
  )
}

export {GlobalStateProvider, useGlobalState}

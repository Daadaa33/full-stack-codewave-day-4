import { createContext, useContext, useEffect, useState } from "react"


 export const UserContext = createContext()


export const UserProvider = ({children}) => {
  const [user, setUser] = useState(null);
const logout = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('expirationTime')
    setUser(null)
}
useEffect(()=> {
    const storeUser = localStorage.getItem('user');
    const expirationTime = localStorage.getItem('expirationTime')

    if(storeUser && expirationTime) {
        const currentTime = new Date().getTime()

        if(currentTime < parseInt(expirationTime)) {
            setUser(JSON.parse(storeUser))
        }else{
            logout()
        }
    }
},[])

  const login = ({ userData , expiresIn}) =>{
    console.log('userData in auth', userData)
    console.log("expiresIn" , expiresIn)

    const expirationTime = new Date().getTime() + expiresIn * 1000


    localStorage.setItem('expirationTime', expirationTime.toString())
    localStorage.setItem('user' , JSON.stringify(userData));

    setUser(userData)
  }


  return (
    <UserContext.Provider value={{ user , setUser, login }}>
        {children}
    </UserContext.Provider>
  )
}



export const useUser = () => {

    return useContext(UserContext)
}
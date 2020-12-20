import React, { useContext } from 'react';

const Achild = () => {
    const { name } = useContext(AppContext);
    return (
        <div>这是组件A:{name}</div>
    )
}
const Bchild = () => {
    const { name } = useContext(AppContext);
    return (
        <div>这是组件B:{name}</div>
    )
}


const App = () => {
    const AppContext = React.createContext();
    return (
        <AppContext.Provider value={{name:"hello"}}>
            <Achild></Achild>
            <Bchild></Bchild>
        </AppContext.Provider>
    )
}


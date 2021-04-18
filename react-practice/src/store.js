import create from 'zustand';

const useStore = create((set)=>({
    people: ['Jhon Doe', 'Jane Doe'],
    addPerson: (person) =>{
        set((state)=>({people:[...state.people, person]})),
    }
}))

export default useStore;
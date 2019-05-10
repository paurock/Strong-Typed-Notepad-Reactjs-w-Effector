root.onCreateStore(store=> {
    const snapShot = getLocalStorageItem(storageLabel)
    (snapShot!==null) ? writeNewStateToStore(store, snapShot) : store
    let isFirstSkiped = false;
    $store.watch(newState=> isFirstSkiped ? setLocalStorageItem(newState) : isFirstSkiped = true)
})
console.log(localStorage["effector-storage"])


const storageLabel = "effector-storage"    // Label for your local storage store
const root = effector.createDomain(storageLabel); //Create domain named with your label
const readLS = (storageLabel) => localStorage.getItem(storageLabel) //Fn that read data with your label from LS 
const writeLS = (newItem) => localStorage.setItem(storageLabel, JSON.stringify(newItem)) //Fn that write your object in LS
const preparedStore = () => (localStorage[storageLabel]===null || "undefined") ? writeLS({$notes:[]}) : readLS()

const $store = preparedStore()  // Create one common store

$store.watch(preparedStore)
$store.watch(console.log) 
//localStorage.clear()

console.log("readLS", readLS(storageLabel))
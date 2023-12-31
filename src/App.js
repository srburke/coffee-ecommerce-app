import NavBar from './components/NavBar';
import Home from './components/Home';
import Coffee from './components/Coffee';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { auth, db } from './config/firebase';
import { collection, query, doc, getDocs, getDoc, where, addDoc } from "firebase/firestore";
import { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import AddProduct from './components/AddProduct';
import IndividualProduct from './components/IndividualProduct';
import Footer from './components/Footer';
import { render } from '@testing-library/react';

function App() {

  //const {products} = props

  /** Retrieves the current user from Firebase authentication and Firestore db. Keeps user logged in upon 
   *  page refresh, getting the current user's information.
  */
  function GetCurrentUser() {
    const [user, setUser] = useState('');

    useEffect(() => {
      auth.onAuthStateChanged(userlogged => { /**  Listens for changes to the auth state. If a user is logged in, getusers function is called  */
        if (userlogged) {
          const getUsers = async () => { // Queries the users collection using query method and where clause to filter by the logged-in user's uid.
            const q = query(collection(db, "users"), where("uid", "==", userlogged.uid));
            console.log(q);
            const data = await getDocs(q); // getDocs method is used to retrieve the documents matching the query
            setUser(data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))); // setUser function is used to update the user state with the retrieved data
          };
          getUsers();
        } else {
          setUser('');
        }
      })
    }, [])
    return user
  }
  const loggeduser = GetCurrentUser();



  return (

    <>
      <NavBar />
      <Routes>
        <Route exact path='/' element={<Home loggeduser={loggeduser} />} />
        <Route exact path='/coffee-type/light' element={<Coffee type={'Light'} />} />
        <Route exact path='/coffee-type/medium' element={<Coffee type={'Medium'} />} />
        <Route exact path='/coffee-type/dark' element={<Coffee type={'Dark'} />} />
        <Route exact path='/addproduct' element={<AddProduct />} />
        <Route path='/product/:type/:id' element={<IndividualProduct />} />
      </Routes>
      <Footer />
    </>


  );
}



export default App;

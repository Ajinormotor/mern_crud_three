import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import AddBooks from "./pages/AddBooks";

import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/authStore";
import { useEffect } from "react";
import RedirectAuthenticatedusers from "./providers/RedirectAuthenticatedusers";
import RedirectUnAuthennticatedusers from "./providers/RedirectUnAuthennticatedusers";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import SearchResult from "./pages/SearchResult";
import BookDetails from "./pages/BookDetails";
import UpdateBook from "./pages/UpdateBook";

function App() {

  
  const { fetchUser, fetchingUser } = useAuthStore();

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  if (fetchingUser) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        {" "}
        <p className="">Loading....</p>{" "}
      </div>
    );
  }

  return (
    <>
      <Toaster />
      <Navbar />
      <Routes>
        <Route index element={<HomePage />} />
        <Route
          path="register"
          element={
            <RedirectAuthenticatedusers>
              <SignupPage />
            </RedirectAuthenticatedusers>
          }
        />
        <Route
          path="login"
          element={
            <RedirectAuthenticatedusers>
              <LoginPage />
            </RedirectAuthenticatedusers>
          }
        />
        <Route path="add-books" element={
          
          <RedirectUnAuthennticatedusers>
            <AddBooks />
            </RedirectUnAuthennticatedusers>  } />

            <Route path="/search" element={
       
              <SearchResult  />
          
            }  />

            
<Route path="/bookdetails/:id" element={
       
       <BookDetails />
   
     }  />


<Route path="/update-book/:id" element={ 
       <UpdateBook />
     }  />



      </Routes>
   
      <Footer  />
    </>
  );
}

export default App;

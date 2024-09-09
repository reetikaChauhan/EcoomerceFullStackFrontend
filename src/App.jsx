import React, { useState } from 'react';
import { Routes, Route } from "react-router-dom";
import ClientOrderTransactions from "./Components/SideBarActions/ClientOrdertransactions"
import ProductForm from "./Components/SideBarActions/productadd"
import Category from "./Components/SideBarActions/addcategory"
import SubCategory from "./Components/SideBarActions/addsubcategory"
import AdminHome from './Components/AdminHome'
import Home from './Components/Home'
import LandingPage from './HomeComponents/landingpage';
 function App() {

  return (
    <>
        <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/adminhome" element={<AdminHome />} />
              <Route path="/ClientOrderTransactions" element={<ClientOrderTransactions />} />
              <Route path="/productadd" element={<ProductForm />} />
              <Route path="/addcategory" element={<Category />} />
              <Route path="/addsubcategory" element={<SubCategory />} />
              <Route path="/landingpage" element={<LandingPage />} />
        </Routes>
      
    </>
    
  );
};

export default App;

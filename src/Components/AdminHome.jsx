import '../App.css'
import React, { useState } from 'react';
import Sidebar from './bars/sidebar';
import Navbar from './bars/topbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles.css';



function AdminHome(){
    return(
        <>
            <div className="dashboard d-flex">
                <div>
                    <Sidebar/>
                </div>
                <div style={{flex:"1 1 auto", display:"flex", flexFlow:"column", height:"100vh", overflowY:"hidden"}}>
                    <Navbar/>
                    <div style={{ flex: "1", display: "flex", justifyContent: "center", alignItems: "center" }}>
                       <img src="https://ecommercedemopictures.s3.us-east-2.amazonaws.com/image-1724895978771.jpeg" alt="Center Image" style={{ maxWidth: "100%", maxHeight: "100%" }} />
                   </div>
                </div>
                
            </div>
        
        </>
    )
}
export default AdminHome;
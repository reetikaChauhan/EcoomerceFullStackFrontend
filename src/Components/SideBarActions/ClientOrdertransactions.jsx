import React, { useState, useEffect } from 'react';
import Sidebar from '../bars/sidebar';
import Navbar from '../bars/topbar';
import '../../styles.css'; // Import your styles

const sales = [
    {
        id: 125,
        orderno: 123567,
        cusName: "Richard",
        Moreless: 0,
        OrderTotal: 35,
        FinalTotal: 45,
        CashPayment: 10,
        OnlinePayment: 13,
        Onlinetip: 5,
        Deliveryfee: 7,
        QuickNotes: " "
    },
    {
        id: 125,
        orderno: 123567,
        cusName: "Richard",
        Moreless: 0,
        OrderTotal: 35,
        FinalTotal: 45,
        CashPayment: 10,
        OnlinePayment: 13,
        Onlinetip: 5,
        Deliveryfee: 7,
        QuickNotes: " "
    },
    {
        id: 125,
        orderno: 123567,
        cusName: "Richard",
        Moreless: 0,
        OrderTotal: 35,
        FinalTotal: 45,
        CashPayment: 10,
        OnlinePayment: 13,
        Onlinetip: 5,
        Deliveryfee: 7,
        QuickNotes: " "
    },
    {
        id: 125,
        orderno: 123567,
        cusName: "Richard",
        Moreless: 0,
        OrderTotal: 35,
        FinalTotal: 45,
        CashPayment: 10,
        OnlinePayment: 13,
        Onlinetip: 5,
        Deliveryfee: 7,
        QuickNotes: " "
    }
];

function ClientOrderTransactions ()  {
    const [salesData, setSalesData] = useState(sales);
    const [totals, setTotals] = useState({
        finaltotal: 0,
        cashPayment: 0,
        onlinePayment: 0,
        onlinetip: 0,
        ordertotal: 0,
        deliveryfee: 0
    });

    useEffect(() => {
        calculateTotals();
    }, [salesData]);

    const handleCheckboxChange = (index) => {
        setSalesData(salesData.map((sale, i) => {
            if (i === index) {
                return {
                    ...sale,
                    Moreless: !sale.Moreless
                };
            }
            return sale;
        }));
    };

    const handleInputChange = (e, index, field) => {
        console.log("hello there")
        const value = parseFloat(e.target.value) || 0;
        console.log("value",value)
        setSalesData(salesData.map((sale, i) => {
            if (i === index && field == 'FinalTotal') {
               return{
                ...sale,
                [field]:value
               }
                
            }
            else if(i === index && field == 'CashPayment'){
                if(!sale.Moreless ){
                    let onlinePayment = parseFloat(sale.FinalTotal) - parseFloat(value) 
                    console.log("changed",onlinePayment)
                    return{
                        ...sale,
                        [field] : value,
                        ["OnlinePayment"]:onlinePayment
                    }
                }
                else{
                    return{
                        ...sale,
                        [field]:value
                       }
                }
            }
            else if(i === index && field == 'OnlinePayment'){
                return{
                    ...sale,
                    [field]:value
                   }
            }

           
            return sale;
        }));
    };

    const calculateTotals = () => {
        const totals = {
            finaltotal: 0,
            cashPayment: 0,
            onlinePayment: 0,
            onlinetip: 0,
            ordertotal: 0,
            deliveryfee: 0
        };
        salesData.forEach(sale => {
            totals.finaltotal += sale.FinalTotal || 0;
            totals.cashPayment += sale.CashPayment || 0;
            totals.onlinePayment += sale.OnlinePayment || 0;
            totals.onlinetip += sale.Onlinetip || 0;
            totals.ordertotal += sale.OrderTotal || 0;
            totals.deliveryfee += sale.Deliveryfee || 0;
        });
        setTotals(totals);
    };

    const showModal = (data) => {
        // Implement showModal logic
    };

    return (
    <>
        <div className="dashboard d-flex">
                <div>
                    <Sidebar/>
                </div>
                <div style={{flex:"1 1 auto", display:"flex", flexFlow:"column", height:"100vh", overflowY:"hidden"}}>
                    <Navbar/>
                    <div>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Order No</th>
                                    <th>Cus Name</th>
                                    <th>More Less</th>
                                    <th>Order Total</th>
                                    <th>Final Total</th>
                                    <th>Cash Payment</th>
                                    <th>Online Payment</th>
                                    <th>Online Tip</th>
                                    <th>Delivery Fee</th>
                                    
                                </tr>
                            </thead>
                            <tbody>
                                {salesData.map((sale, index) => (
                                    <tr key={index}>
                                        <td className="itemid" onClick={() => showModal(sale)}>{sale.id}</td>
                                        <td>{sale.orderno}</td>
                                        <td>{sale.cusName}</td>
                                        <td>
                                            <input
                                                type="checkbox"
                                                checked={sale.Moreless}
                                                onChange={() => handleCheckboxChange(index)}
                                            />
                                        </td>
                                        <td>{sale.OrderTotal}</td>
                                        <td>
                                            <input
                                                type="text"
                                                value={sale.FinalTotal}
                                                onChange={(e) => handleInputChange(e, index, 'FinalTotal')}
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="text"
                                                value={sale.CashPayment}
                                                onChange={(e) => handleInputChange(e, index, 'CashPayment')}
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="text"
                                                value={sale.OnlinePayment}
                                                onChange={(e) => handleInputChange(e, index, 'OnlinePayment')}
                                                readOnly={!sale.Moreless}
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="text"
                                                value={sale.Onlinetip}
                                                onChange={(e) => handleInputChange(e, index, 'Onlinetip')}
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="text"
                                                value={sale.Deliveryfee}
                                                onChange={(e) => handleInputChange(e, index, 'Deliveryfee')}
                                            />
                                        </td>
                                        <div>
                        <img href= "http://s3.us-east-2.amazonaws.com/uddermilkproductimages/image-1724281853349.jpeg"/>
                        </div>
                                       
                                    </tr>
                                ))}
                                <tr>
                                    <td colSpan="4">Grand Total</td>
                                    <td>{totals.ordertotal}</td>
                                    <td>{totals.finaltotal}</td>
                                    <td>{totals.cashPayment}</td>
                                    <td>{totals.onlinePayment}</td>
                                    <td>{totals.onlinetip}</td>
                                    <td>{totals.deliveryfee}</td>
                                    <td></td>
                                </tr>
                            </tbody>
                        </table>
                       

                        {/* Modal */}
                        <div id="myModal" className="modal">
                            <div className="modal-content">
                                <img href= "http://s3.us-east-2.amazonaws.com/uddermilkproductimages/image-1724281853349.jpeg"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
       
    </>
    );
};

export default ClientOrderTransactions;

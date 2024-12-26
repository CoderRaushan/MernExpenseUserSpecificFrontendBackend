// import React, { useContext, useEffect } from "react";
// import { UserContext } from "../Stores/UserProfile.jsx";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom"; // Import useNavigate

// // Function to convert ISO date to DD/Mon/YYYY
// const convertDate = (isoDate) => {
//   const date = new Date(isoDate);
//   const day = String(date.getDate()).padStart(2, "0"); // Ensure day is two digits
//   const month = date.toLocaleString("default", { month: "short" }); // Short month name (e.g., Dec)
//   const year = date.getFullYear();

//   return `${day}/${month}/${year}`;
// };

// function ShowExpense() {
//   const { isAuthenticated, ExpenseData, setExpenseData } = useContext(UserContext);
//   const navigate = useNavigate(); // Initialize the navigate function

//   useEffect(() => {
//     axios
//       .get("https://mernexpenseuserspecificbackend.onrender.com/user/ShowExpense", { withCredentials: true })
//       .then((response) => {
//         console.log("Fetched ExpenseData:", response.data);
//         setExpenseData(response.data.expenses || response.data);
//       })
//       .catch((error) => {
//         console.error("Error fetching Expense data:", error);
//         setExpenseData([]);
//       });
//   }, [setExpenseData]);

// //   console.log("Current ExpenseData:", ExpenseData);

//   function calculateTotal() {
//     return ExpenseData.reduce((total, item) => total + item.cost, 0);
//   }

//   const handleEditClick = (item) => {
//     navigate("/EditExpense", {
//       state: {
//         itemId: item._id,
//         itemName: item.item,
//         itemCost: item.cost,
//         itemCategory: item.category,
//       },
//     });
//   };

//   return (
//     <>
//       <h4 style={{ textAlign: "center", padding: "10px" }}>
//         Total: {calculateTotal()}
//       </h4>
//       {isAuthenticated ? (
//         ExpenseData.length > 0 ? (
//           <div
//             style={{
//               display: "flex",
//               flexDirection: "column",
//               alignItems: "center",
//               gap: "10px",
//               padding: "20px",
//             }}
//           >
//             {ExpenseData.slice().reverse().map((item) => (
//               <div
//                 key={item._id}
//                 style={{
//                   backgroundColor: "#f4f4f4",
//                   padding: "7px 7px 0px 7px",
//                   border: "2px solid #ccc",
//                   borderRadius: "8px",
//                   boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
//                   display: "flex",
//                   flexDirection: "column",
//                   gap: "10px",
//                   maxWidth: "600px",
//                   borderLeft: "5px solid #0021a4",
//                 }}
//               >
//                 <p>
//                   Date:{" "}
//                   <strong style={{ background: "yellow" }}>
//                     {convertDate(item.date) || "N/A"}
//                   </strong>{" "}
//                   Item:{" "}
//                   <strong style={{ background: "yellow" }}>
//                     {item.item || "N/A"}
//                   </strong>{" "}
//                   Cost: 
//                   <strong style={{ background: "yellow" }}>
//                     ₹{item.cost || "N/A"}
//                   </strong>{" "}
//                   Category:{" "}
//                   <strong style={{ background: "yellow" }}>
//                     {item.category || "N/A"}{" "}
//                   </strong>
//                   <button
//                     onClick={() => handleEditClick(item)}
//                     style={{
//                       padding: "3px 10px",
//                       backgroundColor: "#000",
//                       color: "#fff",
//                       border: "none",
//                       borderRadius: "50px",
//                       cursor: "pointer",
//                     }}
//                   >
//                     Edit
//                   </button>
//                 </p>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <p>Loading expense data...</p>
//         )
//       ) : (
//         <p style={{ color: "red", textAlign: "center" }}>Login First!</p>
//       )}
//     </>
//   );
// }

// // export default ShowExpense;
// import React, { useContext, useEffect, useState } from "react";
// import { UserContext } from "../Stores/UserProfile.jsx";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// // Function to convert ISO date to DD/Mon/YYYY
// const convertDate = (isoDate) => {
//   const date = new Date(isoDate);
//   const day = String(date.getDate()).padStart(2, "0"); // Ensure day is two digits
//   const month = date.toLocaleString("default", { month: "short" }); // Short month name (e.g., Dec)
//   const year = date.getFullYear();

//   return `${day}/${month}/${year}`;
// };

// // Function to group expenses by month and year
// const groupByMonthYear = (expenses) => {
//   return expenses.reduce((acc, expense) => {
//     const date = new Date(expense.date);
//     const monthYear = `${date.toLocaleString("default", { month: "short" })} ${date.getFullYear()}`;
    
//     if (!acc[monthYear]) {
//       acc[monthYear] = [];
//     }
//     acc[monthYear].push(expense);
//     return acc;
//   }, {});
// };

// function ShowExpense() {
//   const { isAuthenticated, ExpenseData, setExpenseData } = useContext(UserContext);
//   const [groupedExpenses, setGroupedExpenses] = useState({});
//   const navigate = useNavigate();

//   useEffect(() => {
//     axios
//       .get("https://mernexpenseuserspecificbackend.onrender.com/user/ShowExpense", { withCredentials: true })
//       .then((response) => {
//         console.log("Fetched ExpenseData:", response.data);
//         const expenses = response.data.expenses || response.data;
//         setExpenseData(expenses);
//         setGroupedExpenses(groupByMonthYear(expenses));
//       })
//       .catch((error) => {
//         console.error("Error fetching Expense data:", error);
//         setExpenseData([]);
//       });
//   }, [setExpenseData]);

//   const calculateTotal = (expenses) => {
//     return expenses.reduce((total, item) => total + item.cost, 0);
//   };

//   const handleEditClick = (item) => {
//     navigate("/EditExpense", {
//       state: {
//         itemId: item._id,
//         itemName: item.item,
//         itemCost: item.cost,
//         itemCategory: item.category,
//       },
//     });
//   };

//   return (
//     <>
//       {isAuthenticated ? (
//         Object.keys(groupedExpenses).length > 0 ? (
//           <div
//             style={{
//               display: "flex",
//               flexDirection: "column",
//               alignItems: "center",
//               gap: "20px",
//               padding: "20px",
//             }}
//           >
//             {Object.keys(groupedExpenses).map((monthYear) => (
//               <div key={monthYear} style={{ marginBottom: "20px" }}>
//                 <h4>
//                   {monthYear} (Total: ₹{calculateTotal(groupedExpenses[monthYear])})
//                 </h4>
//                 {groupedExpenses[monthYear].map((item) => (
//                   <div
//                     key={item._id}
//                     style={{
//                       backgroundColor: "#f4f4f4",
//                       padding: "7px 7px 0px 7px",
//                       border: "2px solid #ccc",
//                       borderRadius: "8px",
//                       boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
//                       display: "flex",
//                       flexDirection: "column",
//                       gap: "10px",
//                       maxWidth: "600px",
//                       borderLeft: "5px solid #0021a4",
//                     }}
//                   >
//                     <p>
//                       Date:{" "}
//                       <strong style={{ background: "yellow" }}>
//                         {(item.date) || "N/A"}
//                       </strong>{" "}
//                       Item:{" "}
//                       <strong style={{ background: "yellow" }}>
//                         {item.item || "N/A"}
//                       </strong>{" "}
//                       Cost:{" "}
//                       <strong style={{ background: "yellow" }}>
//                         ₹{item.cost || "N/A"}
//                       </strong>{" "}
//                       Category:{" "}
//                       <strong style={{ background: "yellow" }}>
//                         {item.category || "N/A"}
//                       </strong>
//                       <button
//                         onClick={() => handleEditClick(item)}
//                         style={{
//                           padding: "3px 10px",
//                           backgroundColor: "#000",
//                           color: "#fff",
//                           border: "none",
//                           borderRadius: "50px",
//                           cursor: "pointer",
//                         }}
//                       >
//                         Edit
//                       </button>
//                     </p>
//                   </div>
//                 ))}
//               </div>
//             ))}
//           </div>
//         ) : (
//           <p>Loading expense data...</p>
//         )
//       ) : (
//         <p style={{ color: "red", textAlign: "center" }}>Login First!</p>
//       )}
//     </>
//   );
// }

// export default ShowExpense;
// import React, { useContext, useEffect, useState } from "react";
// import { UserContext } from "../Stores/UserProfile.jsx";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { Bar } from "react-chartjs-2";
// import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

// // Register chart.js components
// ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// // Function to convert ISO date to DD/Mon/YYYY
// const convertDate = (isoDate) => {
//   const date = new Date(isoDate);
//   const day = String(date.getDate()).padStart(2, "0"); // Ensure day is two digits
//   const month = date.toLocaleString("default", { month: "short" }); // Short month name (e.g., Dec)
//   const year = date.getFullYear();

//   return `${day}/${month}/${year}`;
// };

// // Function to group expenses by month and year
// const groupByMonthYear = (expenses) => {
//   return expenses.reduce((acc, expense) => {
//     const date = new Date(expense.date);
//     const monthYear = `${date.toLocaleString("default", { month: "short" })} ${date.getFullYear()}`;
    
//     if (!acc[monthYear]) {
//       acc[monthYear] = [];
//     }
//     acc[monthYear].push(expense);
//     return acc;
//   }, {});
// };

// // Function to sort month-year keys from most recent to least recent
// const sortMonths = (months) => {
//   return months.sort((a, b) => {
//     const [monthA, yearA] = a.split(" ");
//     const [monthB, yearB] = b.split(" ");
//     const dateA = new Date(`${monthA} 1, ${yearA}`);
//     const dateB = new Date(`${monthB} 1, ${yearB}`);
//     return dateB - dateA; // Sort in descending order
//   });
// };

// function ShowExpense() {
//   const { isAuthenticated, ExpenseData, setExpenseData } = useContext(UserContext);
//   const [groupedExpenses, setGroupedExpenses] = useState({});
//   const [chartData, setChartData] = useState({});
//   const navigate = useNavigate();

//   useEffect(() => {
//     axios
//       .get("https://mernexpenseuserspecificbackend.onrender.com/user/ShowExpense", { withCredentials: true })
//       .then((response) => {
//         console.log("Fetched ExpenseData:", response.data);
//         const expenses = response.data.expenses || response.data;
//         setExpenseData(expenses);

//         // Group expenses by month-year
//         const grouped = groupByMonthYear(expenses);
//         setGroupedExpenses(grouped);

//         // Prepare data for the chart
//         const months = Object.keys(grouped);
//         const totals = months.map((month) => 
//           grouped[month].reduce((total, item) => total + item.cost, 0)
//         );

//         setChartData({
//           labels: months,
//           datasets: [
//             {
//               label: "Total Expenses by Month",
//               data: totals,
//               backgroundColor: "rgba(75, 192, 192, 0.2)",
//               borderColor: "rgba(75, 192, 192, 1)",
//               borderWidth: 1,
//             },
//           ],
//         });
//       })
//       .catch((error) => {
//         console.error("Error fetching Expense data:", error);
//         setExpenseData([]);
//       });
//   }, [setExpenseData]);

//   const calculateTotal = (expenses) => {
//     return expenses.reduce((total, item) => total + item.cost, 0);
//   };

//   const handleEditClick = (item) => {
//     navigate("/EditExpense", {
//       state: {
//         itemId: item._id,
//         itemName: item.item,
//         itemCost: item.cost,
//         itemCategory: item.category,
//       },
//     });
//   };

//   return (
//     <>
//       {isAuthenticated ? (
//         <>
//           <div
//             style={{
//               display: "flex",
//               flexDirection: "column",
//               alignItems: "center",
//               gap: "20px",
//               padding: "20px",
//             }}
//           >
//             <h3>Expenses Graph (Total Expenses by Month)</h3>
//             <Bar data={chartData} options={{ responsive: true }} />
//             {Object.keys(groupedExpenses).length > 0 ? (
//               <div>
//                 {sortMonths(Object.keys(groupedExpenses)).map((monthYear) => (
//                   <div key={monthYear} style={{ marginBottom: "20px" }}>
//                     <h4>
//                       {monthYear} (Total: ₹{calculateTotal(groupedExpenses[monthYear])})
//                     </h4>
//                     {groupedExpenses[monthYear]
//                       .slice()
//                       .reverse() // Newest items first in each month
//                       .map((item) => (
//                         <div
//                           key={item._id}
//                           style={{
//                             backgroundColor: "#f4f4f4",
//                             padding: "7px 7px 0px 7px",
//                             border: "2px solid #ccc",
//                             borderRadius: "8px",
//                             boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
//                             display: "flex",
//                             flexDirection: "column",
//                             gap: "10px",
//                             maxWidth: "600px",
//                             borderLeft: "5px solid #0021a4",
//                           }}
//                         >
//                           <p>
//                             Date:{" "}
//                             <strong style={{ background: "yellow" }}>
//                               {convertDate(item.date) || "N/A"}
//                             </strong>{" "}
//                             Item:{" "}
//                             <strong style={{ background: "yellow" }}>
//                               {item.item || "N/A"}
//                             </strong>{" "}
//                             Cost:{" "}
//                             <strong style={{ background: "yellow" }}>
//                               ₹{item.cost || "N/A"}
//                             </strong>{" "}
//                             Category:{" "}
//                             <strong style={{ background: "yellow" }}>
//                               {item.category || "N/A"}
//                             </strong>
//                             <button
//                               onClick={() => handleEditClick(item)}
//                               style={{
//                                 padding: "3px 10px",
//                                 backgroundColor: "#000",
//                                 color: "#fff",
//                                 border: "none",
//                                 borderRadius: "50px",
//                                 cursor: "pointer",
//                               }}
//                             >
//                               Edit
//                             </button>
//                           </p>
//                         </div>
//                       ))}
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <p>Loading expense data...</p>
//             )}
//           </div>
//         </>
//       ) : (
//         <p style={{ color: "red", textAlign: "center" }}>Login First!</p>
//       )}
//     </>
//   );
// }

// export default ShowExpense;


import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../Stores/UserProfile.jsx";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

// Register chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// Function to convert ISO date to DD/Mon/YYYY
const convertDate = (isoDate) => {
  const date = new Date(isoDate);
  const day = String(date.getDate()).padStart(2, "0"); // Ensure day is two digits
  const month = date.toLocaleString("default", { month: "short" }); // Short month name (e.g., Dec)
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
};

// Function to group expenses by month and year
const groupByMonthYear = (expenses) => {
  return expenses.reduce((acc, expense) => {
    const date = new Date(expense.date);
    const monthYear = `${date.toLocaleString("default", { month: "short" })} ${date.getFullYear()}`;
    
    if (!acc[monthYear]) {
      acc[monthYear] = [];
    }
    acc[monthYear].push(expense);
    return acc;
  }, {});
};

// Function to sort month-year keys from most recent to least recent
const sortMonths = (months) => {
  return months.sort((a, b) => {
    const [monthA, yearA] = a.split(" ");
    const [monthB, yearB] = b.split(" ");
    const dateA = new Date(`${monthA} 1, ${yearA}`);
    const dateB = new Date(`${monthB} 1, ${yearB}`);
    return dateB - dateA; // Sort in descending order
  });
};

function ShowExpense() {
  const { isAuthenticated, ExpenseData, setExpenseData } = useContext(UserContext);
  const [groupedExpenses, setGroupedExpenses] = useState({});
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://mernexpenseuserspecificbackend.onrender.com/user/ShowExpense", { withCredentials: true })
      .then((response) => {
        console.log("Fetched ExpenseData:", response.data);
        const expenses = response.data.expenses || response.data;
        setExpenseData(expenses);

        // Group expenses by month-year
        const grouped = groupByMonthYear(expenses);
        setGroupedExpenses(grouped);

        // Prepare data for the chart
        const months = Object.keys(grouped);
        const totals = months.map((month) => 
          grouped[month].reduce((total, item) => total + item.cost, 0)
        );

        // Set chart data with proper initialization
        setChartData({
          labels: months,
          datasets: [
            {
              label: "Total Expenses by Month",
              data: totals,
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
            },
          ],
        });
      })
      .catch((error) => {
        console.error("Error fetching Expense data:", error);
        setExpenseData([]);
      });
  }, [setExpenseData]);

  const calculateTotal = (expenses) => {
    return expenses.reduce((total, item) => total + item.cost, 0);
  };

  const handleEditClick = (item) => {
    navigate("/EditExpense", {
      state: {
        itemId: item._id,
        itemName: item.item,
        itemCost: item.cost,
        itemCategory: item.category,
      },
    });
  };

  return (
    <>
      {isAuthenticated ? (
        <>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "20px",
              padding: "20px",
            }}
          >
            <h3>Expenses Graph (Total Expenses by Month)</h3>
            {/* Ensure chartData is valid before passing to the Bar chart */}
            {chartData.labels.length > 0 && chartData.datasets.length > 0 ? (
              <Bar data={chartData} options={{ responsive: true }} />
            ) : (
              <p>Loading chart data...</p>
            )}
            {Object.keys(groupedExpenses).length > 0 ? (
              <div>
                {sortMonths(Object.keys(groupedExpenses)).map((monthYear) => (
                  <div key={monthYear} style={{ marginBottom: "20px" }}>
                    <h4>
                      {monthYear} (Total: ₹{calculateTotal(groupedExpenses[monthYear])})
                    </h4>
                    {groupedExpenses[monthYear]
                      .slice()
                      .reverse() // Newest items first in each month
                      .map((item) => (
                        <div
                          key={item._id}
                          style={{
                            backgroundColor: "#f4f4f4",
                            padding: "7px 7px 0px 7px",
                            border: "2px solid #ccc",
                            borderRadius: "8px",
                            boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                            display: "flex",
                            flexDirection: "column",
                            gap: "10px",
                            maxWidth: "600px",
                            borderLeft: "5px solid #0021a4",
                          }}
                        >
                          <p>
                            Date:{" "}
                            <strong style={{ background: "yellow" }}>
                              {convertDate(item.date) || "N/A"}
                            </strong>{" "}
                            Item:{" "}
                            <strong style={{ background: "yellow" }}>
                              {item.item || "N/A"}
                            </strong>{" "}
                            Cost:{" "}
                            <strong style={{ background: "yellow" }}>
                              ₹{item.cost || "N/A"}
                            </strong>{" "}
                            Category:{" "}
                            <strong style={{ background: "yellow" }}>
                              {item.category || "N/A"}
                            </strong>
                            <button
                              onClick={() => handleEditClick(item)}
                              style={{
                                padding: "3px 10px",
                                backgroundColor: "#000",
                                color: "#fff",
                                border: "none",
                                borderRadius: "50px",
                                cursor: "pointer",
                              }}
                            >
                              Edit
                            </button>
                          </p>
                        </div>
                      ))}
                  </div>
                ))}
              </div>
            ) : (
              <p>Loading expense data...</p>
            )}
          </div>
        </>
      ) : (
        <p style={{ color: "red", textAlign: "center" }}>Login First!</p>
      )}
    </>
  );
}

export default ShowExpense;

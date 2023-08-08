import { Button, Result } from "antd";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import NavBar from "src/layout/navigationBar";

export default function PaymentSuccess() {
  const { customerId } = useParams();
  const [customer, setCustomer] = useState<string>("");
  useEffect(() => {
    const customerName = localStorage.getItem("CustomerName");
    if (customerName != null) {
      setCustomer(customerName);
    }
  }, []);
  return (
    <React.Fragment>
      <NavBar />
      <Result
        status="success"
        title="Payment Successful!"
        subTitle={
          <React.Fragment>
            Thank you {customer}, for completing your secure online payment. <br />
            Have a great day!
          </React.Fragment>
        }
        extra={[<Link to={`/profile/purchase-history/${customerId}`}>To Profile</Link>]}
      />
    </React.Fragment>
  );
}

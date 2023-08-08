import { Button, Result } from "antd";
import React from "react";
import NavBar from "src/layout/navigationBar";

export default function PaymentSuccess() {
  return (
    <React.Fragment>
      <NavBar />
      <Result
        status="success"
        title="Payment Successful!"
        subTitle={
          <React.Fragment>
            Thank you for completing your secure online payment. <br />
            Have a great day!
          </React.Fragment>
        }
        extra={[<Button key="buy">Home</Button>]}
      />
    </React.Fragment>
  );
}

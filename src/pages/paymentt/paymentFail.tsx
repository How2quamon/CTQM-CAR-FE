import { Button, Result } from "antd";
import React from "react";
import NavBar from "src/layout/navigationBar";

export default function PaymentFail() {
  return (
    <React.Fragment>
      <NavBar />
      <Result
        status="error"
        title="Payment Failed!"
        subTitle="Please check and modify the following information before resubmitting."
        extra={[<Button key="buy">Buy Again</Button>]}
      ></Result>
    </React.Fragment>
  );
}

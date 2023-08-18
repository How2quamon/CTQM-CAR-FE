export const columns = [
    {
      title: "STT",
      dataIndex: "STT",
      key: "STT",
      width: 40,
      // fixed: 'left',
      render: (text: any, record: any, index: any) => index + 1,
    },
    {
      title: "Id",
      dataIndex: "customerId",
      key: "customerId",
      width: 90,
      // fixed: 'left',
      render: (customerId: any) => (
          <span className="line-clamp-2" title={customerId}>
            {customerId}
          </span>
        ),
    },
  
    {
      title: "Customer Name",
      dataIndex: "customerName",
      key: "customerName",
      width: 90,      
      render: (customerName: any) => (
        <span className="line-clamp-2" title={customerName}>
          {customerName}
        </span>
      ),
    },
    {
      title: "Phone Number",
      dataIndex: "customerPhone",
      key: "customerPhone",
      width: 90,
    },
    {
      title: "Email",
      dataIndex: "customerEmail",
      key: "customerEmail",
      width: 120,
      render: (customerEmail: any) => (
        <span className="line-clamp-2" title={customerEmail}>
          {customerEmail}
        </span>
      ),
    },
    {
      title: "Address",
      dataIndex: "customerAddress",
      key: "customerAddress",
      width: 50,
      render: (customerAddress: any) => (
        <span className="line-clamp-2" title={customerAddress}>
          {customerAddress}
        </span>
      ),
    },
    {
      title: "D.O.B",
      dataIndex: "customerDate",
      key: "customerDate",
      width: 70,
    },
    {
      title: "License",
      dataIndex: "customerLicense",
      key: "customerLicense",
      width: 60,
    },
  ];
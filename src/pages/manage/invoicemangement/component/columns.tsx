export const columns = [
    {
        title: "STT",
        dataIndex: "STT",
        key: "STT",
        width: 40,
        render: (text: any, record: any, index: any) => index + 1,
    },
    {
        title: 'Order ID',
        width: 100,
        dataIndex: 'orderId',       
        key: 'orderId',
        // fixed: FixedType.Left,
        render: (orderId: any) => (   
            <span className="line-clamp-2" title={orderId}>
                {orderId}
            </span>
        ),
    },
    {
        title: 'CarID',
        width: 100,
        dataIndex: 'carId',
        render: (carId: any) => (
            <span className="line-clamp-2" title={carId}>
              {carId}
            </span>
          ),
    },
    {
        title: 'Customer ID',
        dataIndex: 'customerId',
        width: 150,
        render: (customerId: any) => (
            <span className="line-clamp-2" title={customerId}>
              {customerId}
            </span>
          ),    
    },
    {
        title: 'Date of payment',
        dataIndex: 'orderDate',
        width: 150,
        render: (orderDate: any) => (
            <span className="line-clamp-2" title={orderDate}>
              {orderDate}
            </span>
          ), 
    },
    {
        title: 'Payment methods',
        dataIndex: 'orderStatus',
        width: 150,
        render: (orderStatus: any) => (
            <span className="line-clamp-2" title={orderStatus}>
              {orderStatus}
            </span>
          ), 
    },
    {
        title: 'Amount',
        dataIndex: 'amount',
        width: 150,
        render: (amount: any) => (
            <span className="line-clamp-2" title={amount}>
              {amount}
            </span>
          ), 
    },
    {
        title: 'Total Price',
        dataIndex: 'totalPrice',
        width: 150,
        render: (totalPrice: any) => (
            <span className="line-clamp-2" title={totalPrice}>
              {totalPrice}
            </span>
          ), 
    },
];
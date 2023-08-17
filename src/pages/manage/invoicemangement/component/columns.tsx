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
        dataIndex: 'OrderID',
        key: 'OrderID',
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
        dataIndex: 'CarID',
        render: (carId: any) => (
            <span className="line-clamp-2" title={carId}>
              {carId}
            </span>
          ),
    },
    {
        title: 'CustomerID',
        dataIndex: 'CustomerID',
        width: 150,
        render: (customerId: any) => (
            <span className="line-clamp-2" title={customerId}>
              {customerId}
            </span>
          ),
    },
    {
        title: 'OrderDate',
        dataIndex: 'OrderDate',
        width: 150,
    },
    {
        title: 'OrderStatus',
        dataIndex: 'OrderStatus',
        width: 150,
    },
    {
        title: 'Amount',
        dataIndex: 'Amount',
        width: 150,
    },
    {
        title: 'TotalPrice',
        dataIndex: 'TotalPrice',
        width: 150,
    },
];
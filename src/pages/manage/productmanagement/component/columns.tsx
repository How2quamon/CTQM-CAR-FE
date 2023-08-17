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
    title: "ID",
    dataIndex: "carId",
    key: "carId",
    width: 80,
    // fixed: 'left',
    render: (carId: any) => (
        <span className="line-clamp-2" title={carId}>
          {carId}
        </span>
      ),
  },

  {
    title: "Product Name",
    dataIndex: "carName",
    key: "carName",
    width: 90,
    // fixed: 'left',
    render: (carName: any) => (
      <span className="line-clamp-2" title={carName}>
        {carName}
      </span>
    ),
  },
  {
    title: "Model",
    dataIndex: "carModel",
    key: "carModel",
    width: 80,
  },

  {
    title: "Class",
    dataIndex: "carClass",
    key: "carClass",
    width: 50,
  },
  {
    title: "Engine",
    dataIndex: "carEngine",
    key: "carEngine",
    width: 60,
  },
  {
    title: "Amount",
    dataIndex: "carAmount",
    key: "carAmount",
    width: 60,
  },
  {
    title: "Price",
    dataIndex: "carPrice",
    key: "carPrice",
    width: 70,
  },
  {
    title: "Describe",
    dataIndex: "moTa",
    key: "moTa",
    width: 120,
    render: (moTa: any) => <span className="line-clamp-2">{moTa}</span>,
  },
  {
    title: "Head",
    dataIndex: "head1",
    key: "head1",
    width: 120,
    render: (head1: any) => (
      <span className="line-clamp-2" title={head1}>
        {head1}
      </span>
    ),
  },
  {
    title: "Describe 2",
    dataIndex: "moTa2",
    key: "moTa2",
    width: 100,
    render: (moTa2: any) => (
      <span className="line-clamp-2" title={moTa2}>
        {moTa2}
      </span>
    ),
  },
];

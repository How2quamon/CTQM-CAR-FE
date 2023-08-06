import { ctqmService } from "../../../services/ctqm.services";
import { Form, Select, notification } from "antd";
import React, { useEffect, useState } from "react";

interface FilterProps {
  setFilter: Function;
  filter: any;
  //   loading: boolean;
}

export default function Filter({ setFilter, filter }: FilterProps) {
  const onChangeCarModel = (carModel: string) => {
    setFilter({ ...filter, carModel: carModel });
  };
  const carModel = 'Coupé';
  const [filtertModel, setFiltertModel] = useState<any>();
  const [loading, setIsLoading] = useState<boolean>(false);
  // useEffect(() => {
  //   // Gọi API trong useEffect để lấy dữ liệu khi component được tải lần đầu
  //     setFiltertModel(response.map((item) => item.empFullName));
  // }, []);
  // const getListCar = () => {
  //   setIsLoading(true);
  //   ctqmService.carApi
  //     .getCarWithModel(carModel)
  //     .then((response) => {
  //       setFiltertModel(response);
  //       console.log(response);
        
  //     })
  //     .catch(({ error }) => {
  //       notification.error({
  //         message: "Có lỗi xảy ra",
  //         description:
  //           error?.message ?? "Lỗi trong quá trình xử lý, vui lòng thử lại!",
  //         placement: "bottomRight",
  //       });
  //     })
  //     .finally(() => {
  //       setIsLoading(false);
  //     });
  // };

  return (
    <React.Fragment>
      <div className="flex items-end">
        <Form.Item name="carModel">
          <Select
            loading={loading}
            defaultValue={null}
            className="ml-[181px]"
            style={{ width: 100 }}
            options={[
              { value: null, label: "New" },
              { value: 11, label: "Old" },
              { value: 21, label: "Sale off" },
            ]}
          />
        </Form.Item>
        <Form.Item name="carModel">
          <Select
            defaultValue={null}
            className="ml-5"
            style={{ width: 230 }}
            onChange={onChangeCarModel}
            options={[
              { value: null, label: 'Mercedes-Maybach' },
              { value: 1, label: 'Mercedes-AMG' },
              { value: 2, label: 'Mercedes-Benz GLS-Class' },
              { value: 3, label: 'Mercedes-Benz G-Class' },
              { value: 4, label: 'Mercedes-Benz EQ' },
              { value: 5, label: 'Mercedes-Benz CLS-Class' },
              { value: 6, label: 'Mercedes-Benz SL-Class' },
          ]}
          />
        </Form.Item>
      </div>
    </React.Fragment>
  );
}

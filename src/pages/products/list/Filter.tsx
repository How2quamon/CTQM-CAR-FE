import { ctqmService } from "../../../services/ctqm.services";
import { Form, Select, notification } from "antd";
import React, { useEffect, useState } from "react";
import { CarDTO} from "@share/dtos/service-proxies-dtos";

interface FilterProps {
  setFilter: Function;
  filter: any;
  //   loading: boolean;
}

export default function Filter({ setFilter, filter }: FilterProps) {
  const onChangeCarModel = (carModel: string) => {
    setFilter({ ...filter, carModel: carModel });
  };
  const [listCars, setListCars] = useState<CarDTO[]>([]);
  const [filtertModel, setFiltertModel] = useState<any>();
  const [loading, setIsLoading] = useState<boolean>(false);
  useEffect(() => {
    // Gọi API trong useEffect để lấy dữ liệu khi component được tải lần đầu
    getListCar();
  }, []);
  const getListCar = () => {
    setIsLoading(true);
    ctqmService.carApi
      .getAllCar()
      .then((response) => {
        setListCars(response);
      })
      .catch(({ error }) => {
        notification.error({
          message: "An error occurred",
          description:
            error?.message ?? "Error in processing, please try again!",
          placement: "bottomRight",
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

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
            placeholder="Car Model"
            className="ml-5"
            style={{ width: 230 }}
            onChange={onChangeCarModel}
            options={listCars?.map((item) => ({
              value: item.carModel,
              label: item.carModel,
            }))}
          />
        </Form.Item>
      </div>
    </React.Fragment>
  );
}

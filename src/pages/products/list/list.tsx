import { ShoppingCartOutlined } from "@ant-design/icons";
import { CarDTO, CartNotiDTO, QuickAddCartDTO } from "@share/dtos/service-proxies-dtos";
import { Button, Card, Spin, notification } from "antd";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "src/layout/Footer";
import NavBar from "src/layout/navigationBar";
import Image1 from "src/videos/png_mercedes_21788.png";
import useTitle from "../../../hooks/useTitle";
import { ctqmService } from "../../../services/ctqm.services";
import Filter from "./Filter";

export default function List() {
  useTitle("Catalogs");
  const [filter, setFilter] = useState<any>();
  const [listCars, setListCars] = useState<CarDTO[]>([]);
  const [quickAddDto, setQuickAddDto] = useState<QuickAddCartDTO>({
    customerId: '',
    carId: '',
  });
  const [loading, setIsLoading] = useState<boolean>(false);
  const [loadingProcess, setLoadingProcess] = useState<boolean>(false);
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

  const quickAddToCart = (carId: string) => {
    setLoadingProcess(true);
    const customerId = localStorage.getItem("CustomerId");
    if (customerId == null) {
      notification.error({
        message: "You're not login!",
        description: "Please login to contiune!",
        placement: "bottomRight",
      });
      return;
    }
    console.log("AIOAJFOIWER", carId);
    quickAddDto.carId = carId;
    quickAddDto.customerId = customerId;
    ctqmService.cartApi
      .quickAddToCart(quickAddDto)
      .then((response: CartNotiDTO) => {
        notification.success({
          message: "Add to cart Success!",
          description: response.carName + " with $" + response.price + " are in your cart.",
          placement: "bottomRight", 
        })
      })
      .catch(({ error }) => {
        setLoadingProcess(false);
        notification.error({
          message: "An error occurred",
          description:
            error?.message ?? "Error in processing, please try again!",
          placement: "bottomRight",
        });
      })
      .finally(() => {
        setLoadingProcess(false);
      })
  }

  return (
    <React.Fragment>
      <NavBar />
      <div className="flex flex-col gap-6">
        <h1 className="font-semibold text-[20px] ml-[181px] mt-4">
          Most popular cars
        </h1>
        <div className="flex items-end">
          <Filter setFilter={setFilter} filter={filter} />
        </div>
      </div>
      <section className="flex flex-wrap justify-center gap-3 m-2 mt-10">
        {listCars.length > 0 ? (
          listCars.map((car, index) => (
            <Card key={index} loading={loading}>
              <img src={Image1} alt="" className="w-[300px] rounded" />
              <Button onClick={() => quickAddToCart(car.carId as string)} className="absolute right-1 top-2">
                {loadingProcess ? (
                  <Spin size="large" />
                ) : (
                  <ShoppingCartOutlined rev={undefined} className="text-[17px]" />
                )}
              </Button>
              <div className="flex flex-col gap-3">
                <p className="text-[15px] font-semibold mt-2">{car.carName}</p>
                <p className="text-[15px] font-semibold">${car.carPrice}</p>
                <Card className="border-none bg-gray-100 !p-0 m-0">
                  <div className="flex gap-8 justify-center ">
                    <div className="flex flex-col justify-center items-center">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clip-path="url(#clip0_1_5117)">
                          <path
                            d="M10 1.66669V3.75002M10 1.66669C5.39765 1.66669 1.66669 5.39765 1.66669 10M10 1.66669C14.6024 1.66669 18.3334 5.39765 18.3334 10M10 16.25V18.3334M10 18.3334C14.6024 18.3334 18.3334 14.6024 18.3334 10M10 18.3334C5.39765 18.3334 1.66669 14.6024 1.66669 10M3.75002 10H1.66669M18.3334 10H16.25M15.8987 15.8987L14.4206 14.4206M4.10138 15.8987L5.58098 14.4191M4.10138 4.16669L5.54842 5.61373M15.8987 4.16669L11.2499 8.75002M11.6667 10C11.6667 10.9205 10.9205 11.6667 10 11.6667C9.07955 11.6667 8.33335 10.9205 8.33335 10C8.33335 9.07955 9.07955 8.33335 10 8.33335C10.9205 8.33335 11.6667 9.07955 11.6667 10Z"
                            stroke="black"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_1_5117">
                            <rect width="20" height="20" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                      <p className="text-[13px]">{car.carModel}</p>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                      <svg
                        width="21"
                        height="20"
                        viewBox="0 0 21 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <ellipse
                          cx="4.83332"
                          cy="4.99998"
                          rx="1.66667"
                          ry="1.66667"
                          stroke="#0F0F0F"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <ellipse
                          cx="10.6667"
                          cy="4.99998"
                          rx="1.66667"
                          ry="1.66667"
                          stroke="#0F0F0F"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <ellipse
                          cx="16.5"
                          cy="4.99998"
                          rx="1.66667"
                          ry="1.66667"
                          stroke="#0F0F0F"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <ellipse
                          cx="4.83332"
                          cy="15"
                          rx="1.66667"
                          ry="1.66667"
                          stroke="#0F0F0F"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <ellipse
                          cx="10.6667"
                          cy="15"
                          rx="1.66667"
                          ry="1.66667"
                          stroke="#0F0F0F"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M4.83332 6.66669V13.3334"
                          stroke="#0F0F0F"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M10.6667 6.66669V13.3334"
                          stroke="#0F0F0F"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M16.5 6.66669V8.33335C16.5 9.25383 15.7538 10 14.8333 10H4.83331"
                          stroke="#0F0F0F"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                      <p>Auto</p>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M11.6667 9.16667H12.5C13.4205 9.16667 14.1667 9.91286 14.1667 10.8333V13.3333C14.1667 14.0237 14.7263 14.5833 15.4167 14.5833C16.107 14.5833 16.6667 14.0237 16.6667 13.3333V7.5L14.1667 5"
                          stroke="#0F0F0F"
                          stroke-width="1.75"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M3.33334 16.6666V4.99998C3.33334 4.07951 4.07954 3.33331 5.00001 3.33331H10C10.9205 3.33331 11.6667 4.07951 11.6667 4.99998V16.6666"
                          stroke="#0F0F0F"
                          stroke-width="1.75"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M2.5 16.6667H12.5"
                          stroke="#0F0F0F"
                          stroke-width="1.75"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M15 5.83331V6.66665C15 7.12688 15.3731 7.49998 15.8333 7.49998H16.6667"
                          stroke="#0F0F0F"
                          stroke-width="1.75"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M3.33334 9.16667H11.6667"
                          stroke="#0F0F0F"
                          stroke-width="1.75"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                      <p className="">{car.carEngine}</p>
                    </div>
                  </div>
                </Card>
                <Link key={car.carName} to={`/products-details/${car.carName}`}>
                  <Button className="w-full">Details</Button>
                </Link>
              </div>
            </Card>
          ))
        ) : (
          <Spin size="large"/>
        )}
      </section>
      <Footer />
    </React.Fragment>
  );
}

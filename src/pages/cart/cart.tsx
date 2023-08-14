import React, { useEffect, useState } from "react";
import NavBar from "src/layout/navigationBar";
import Footer from "src/layout/Footer";
import { Link, useParams } from "react-router-dom";
import useTitle from "src/hooks/useTitle";
import { CarDTO, CartDTO } from "@share/dtos/service-proxies-dtos";
import { ctqmService } from "../../services/ctqm.services";
import { Button, Spin, notification } from "antd";

export default function Cart() {
  useTitle("CART");
  const [amounts, setAmounts] = useState(1); // Mảng lưu trữ số lượng cho từng item
  const [customerCartList, setCustomerCartList] = useState<CartDTO[]>([]);
  const [subTotal, setSubTotal] = useState(0);
  const [taxTotal, setTaxTotal] = useState(19.09);
  const [totalPrice, setTotalPrice] = useState(0);
  const [carList, setCarList] = useState<CarDTO[]>([]);
  const [loading, setIsLoading] = useState<boolean>(false);
  const { customerId } = useParams();
  const [getData, setGetData] = useState(false);

  // Hàm thay đổi số lượng cho một item cụ thể
  const handleChangeAmount = (
    index: number,
    newAmount: number,
    cartId: string
  ) => {
    if (newAmount >= 1) {
      setGetData(false);
      console.log(cartId as string, newAmount as number);
      setIsLoading(true);
      ctqmService.cartApi
        .updateCart(cartId as string, newAmount as number)
        .then((rs) => {
          customerCartList[index].amount = newAmount;
          console.log(customerCartList[index].amount);
          getCarData(customerCartList);
          console.log("UPDATE", rs);
        })
        .catch(({ error }) => {
          notification.error({
            message: "Action Failed",
            description: error?.message ?? "Add amounnt faild!  ",
            placement: "bottomRight",
          });
        })
        .finally(() => {
          setIsLoading(false);
          setGetData(true);
        });
    }
  };

  useEffect(() => {
    // Gọi API trong useEffect để lấy dữ liệu khi component được tải lần đầu
    getListCart();
  }, [getData]);

  const getListCart = () => {
    setIsLoading(true);
    ctqmService.cartApi
      .getCustomerCart(customerId as string)
      .then((response) => {
        setCustomerCartList(response);
        getCarData(customerCartList);
      })
      .finally(() => {
        setIsLoading(false);
        setGetData(true);
      });
  };

  const deleteCart = (cartId: string, index: number) => {
    setIsLoading(true);
    console.log("DELETE");
    ctqmService.cartApi
      .deleteCartWithId(cartId as string)
      .then((response) => {
        customerCartList.splice(index, 1);
        console.log(customerCartList);
        if (customerCartList.length == 0) {
          setCarList([]);
          setSubTotal(0);
          setTotalPrice(0);
        }
        else 
          getCarData(customerCartList);
        console.log("DELETE CART", response);
      })
      .catch(({ error }) => {
        notification.error({
          message: "Action Failed",
          description: error?.message ?? "Cannot delete car out of cart!  ",
          placement: "bottomRight",
        });
      })
      .finally(() => {
        setIsLoading(false);
        notification.success({
          message: "Action Success",
          description: "Delete car out of cart!",
          placement: "bottomRight",
        });
      });
  };

  const getCarData = (listCart: CartDTO[]) => {
    console.log(listCart);
    setGetData(false);
    setIsLoading(true);
    let newCarList: CarDTO[] = [];
    let subtotal = 0;
    let totalPrice = 0;
    listCart.forEach((cart, index) => {
      let price = cart.price! * cart.amount!;
      subtotal += price;
      ctqmService.carApi
        .getCarWithId(cart.carId!)
        .then((rs) => {
          // Sao chép mảng hiện tại
          const newCar = rs;
          newCarList.push(newCar);    
        })
        .catch(() => {
          setIsLoading(false);
          setGetData(true);
        })
        .finally(() => {
          console.log("BEORE", index, listCart.length);
          if (index == listCart.length - 1) {
            setIsLoading(false);
            console.log(index, listCart.length);
            totalPrice = subtotal + 19.09;
            setSubTotal(subtotal);
            setTotalPrice(totalPrice);
            setCarList(newCarList);
            setGetData(true);
          }
        });
    });
    
  };

  return (
    <React.Fragment>
      <NavBar />
      <div className="h-screen bg-gray-100 pt-20">
        <h1 className="mb-8 text-center text-2xl font-bold">Cart Items</h1>
        <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
          <div className="rounded-lg md:w-2/3">
            {loading ? (
              <Spin size="large" className="flex justify-center items-center" />
            ) : carList.length > 0 ? (
              customerCartList.map((cart, cartIndex) =>
                carList.map((car) =>
                  cart.carId === car.carId ? (
                    <div
                      key={car.carId}
                      className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start"
                    >
                      <img
                        src="Homepage.png"
                        alt="product"
                        className="w-full rounded-lg sm:w-40"
                      />
                      <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                        <div className="mt-5 sm:mt-0">
                          <h2 className="text-lg font-bold text-gray-900">
                            {car.carName}
                          </h2>
                          <p className="mt-1 text-xs text-gray-700">
                            {car.carModel}
                          </p>
                        </div>
                        <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                          <div className="flex items-center border border-gray-200 rounded">
                            <button
                              className="w-10 h-10 leading-5 text-gray-600 transition hover:opacity-75"
                              onClick={() =>
                                handleChangeAmount(
                                  cartIndex,
                                  (cart.amount as number) - 1,
                                  cart.cartId as string
                                )
                              } // Xử lý cho item đầu tiên
                            >
                              -
                            </button>
                            <span className="text-center items-center">
                              {cart.amount}
                            </span>
                            <button
                              className="w-10 h-10 leading-5 text-gray-600 transition hover:opacity-75"
                              onClick={() =>
                                handleChangeAmount(
                                  cartIndex,
                                  (cart.amount as number) + 1,
                                  cart.cartId as string
                                )
                              } // Xử lý cho item đầu tiên
                            >
                              +
                            </button>
                          </div>
                          <button
                            className="underline decoration-solid bg-white hover:bg-gray-200"
                            onClick={() =>
                              deleteCart(cart.cartId as string, cartIndex)
                            }
                          >
                            Remove
                          </button>
                          <div className="flex items-center space-x-4">
                            <p className="text-sm">{car.carPrice} $</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : null
                )
              )
            ) : (
              <p className="text-[15px] font-semibold mt-2">
                Nothing in your Cart
              </p>
            )}
          </div>
          <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
            <div className="mb-2 flex justify-between">
              <p className="text-gray-700">Subtotal</p>
              <p className="text-gray-700">${subTotal}</p>
            </div>
            <hr className="my-4" />
            <div className="flex justify-between">
              <p className="text-lg font-bold">Total</p>
              <div className="">
                <p className="mb-1 text-lg font-bold">${totalPrice} USD</p>
                <p className="text-sm text-gray-700">including VAT</p>
              </div>
            </div>
            <button className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600">
              Check out
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </React.Fragment>
  );
}

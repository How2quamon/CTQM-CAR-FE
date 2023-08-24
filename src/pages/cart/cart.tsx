import React, { useEffect, useState } from "react";
import NavBar from "src/layout/navigationBar";
import Footer from "src/layout/Footer";
import { Link, useParams } from "react-router-dom";
import useTitle from "src/hooks/useTitle";
import { CartDetailDTO, CustomerCartDTO, UpdateCartDTO } from "@share/dtos/service-proxies-dtos";
import { ctqmService } from "../../services/ctqm.services";
import { Spin, notification } from "antd";

export default function Cart() {
  useTitle("CART");
  const [amounts, setAmounts] = useState(1); // Mảng lưu trữ số lượng cho từng item
  const [customerCartList, setCustomerCartList] = useState<CartDetailDTO[]>([]);
  const [amount, setAmount] = useState(0);
  const [subTotal, setSubTotal] = useState(0);
  const [taxTotal, setTaxTotal] = useState(119.09);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setIsLoading] = useState<boolean>(false);
  const { customerId } = useParams();
  const [getData, setGetData] = useState(false);
  const imagePath = "https://res.cloudinary.com/dbz9e4cwk/image/upload/v1692201767/product/";

  // Hàm thay đổi số lượng cho một item cụ thể
  const handleChangeAmount = (
    index: number,
    newAmount: number,
    cartId: string,
    type: boolean
  ) => {
    if (newAmount >= 1) {
      setGetData(false);
      console.log(cartId as string, newAmount as number);
      setIsLoading(true);
      if (customerCartList[index].carAmount! < newAmount) {
        notification.warning({
          message: "Action Failed",
          description: "Car amount doesn't enough!  ",
          placement: "bottomRight",
        });
        return;
      }
      let updateCartDto: UpdateCartDTO = {
        cartId: cartId,
        amount: newAmount,
      };
      ctqmService.cartApi
        .updateCart(updateCartDto) 
        .then((rs) => {
          customerCartList[index].amount = newAmount;
          var tmpSubTotal = 0;
          var taxSum = 1;
          if (type) {
            setAmount(amount + 1);
            tmpSubTotal = subTotal + customerCartList[index].carPrice!;
            taxSum = taxTotal * (amount + 1);
            setTaxTotal(taxSum);
          }
          if (!type) {
            setAmount(amount - 1);
            tmpSubTotal = subTotal - customerCartList[index].carPrice!;
            taxSum = taxTotal * (amount - 1);
            setTaxTotal(taxSum);
          }
          setSubTotal(tmpSubTotal)
          setTotalPrice(tmpSubTotal + taxSum);
          console.log(customerCartList[index].amount);
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
      .then((response: CustomerCartDTO) => {
        setCustomerCartList(response.customerCarts!);
        setAmount(response.totalAmount!);
        const taxSum = taxTotal * response.totalAmount!;
        setTaxTotal(taxSum)
        setSubTotal(response.totalDiscount!);
        setTotalPrice(response.totalDiscount! + taxSum);
      })
      .catch(({ error }) => {
        notification.error({
          message: "Action Failed",
          description: error?.message ?? "Can't get your cart!",
          placement: "bottomRight",
        })
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
        setAmount(amount - 1);
        setSubTotal(subTotal - customerCartList[index].carPrice!)
        setTotalPrice(subTotal + taxTotal);
        console.log(customerCartList);
        customerCartList.splice(index, 1);
        if (customerCartList.length == 0) {
          setSubTotal(0);
          setTotalPrice(0);
          setIsLoading(false);
        }
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

  return (
    <React.Fragment>
      <NavBar />
      <main className="bg-gray-100 relative h-screen">
        <div className="flex mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mt-[30px] ml-[500px]">Cart Items</h1>
        </div>
        <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
          <div className="rounded-lg md:w-2/3">
            {loading ? (
              <Spin size="large" className="flex justify-center items-center" />
            ) : customerCartList.length > 0 ? (
              customerCartList.map((cart, cartIndex) =>
                <div
                  key={cart.carId}
                  className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start"
                >
                  <img
                    src={imagePath + cart.carName + '/' + cart.image1?.trim()}
                    alt="product"
                    className="w-full rounded-lg sm:w-40 object-cover"
                  />
                  <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                    <div className="mt-5 sm:mt-0">
                      <h2 className="text-lg font-bold text-gray-900">
                        {cart.carName}
                      </h2>
                      <p className="mt-1 text-xs text-gray-700">
                        {cart.carModel}
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
                              cart.cartId as string,
                              false
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
                              cart.cartId as string,
                              true
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
                        <h6 className="text-sm">${cart.carPrice}</h6>
                      </div>
                    </div>
                  </div>
                </div>
              )
            ) : (
              <p className="text-[15px] font-semibold mt-2">
                Nothing in your Cart
              </p>
            )}
          </div>
          <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
            <div className="mb-2 flex justify-between">
              <p className="text-gray-700">Amounts</p>
              <p className="text-gray-700">{amount}</p>
            </div>
            <div className="mb-2 flex justify-between">
              <p className="text-gray-700">Subtotal</p>
              <p className="text-gray-700">${subTotal}</p>
            </div>
            <hr className="my-4" />
            <div className="flex justify-between">
              <p className="text-lg font-bold">Total</p>
              <div className="">
                <p className="mb-1 text-lg font-bold">${totalPrice} USD</p>
                <p className="text-sm text-gray-700">including GST</p>
              </div>
            </div>
            <hr className="my-4" />
            <div className="text-center">
            {customerCartList.length > 0 ? (
              <Link to={`/payment/${customerId}`} className="px-20 py-3 rounded bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600">
                Check out
              </Link>
              ) : (
              <Link to={''} className="px-20 py-3 rounded bg-blue-500 py-1.5 font-medium text-blue-50 opacity-50">
                Check out
              </Link>
              )}
            </div>
            <hr className="my-4" />
            <p className="text-sm text-gray-700 text-justify">
              Shipping and discount codes are added at checkout.
            </p>
            <hr className="my-4" />
            <p className="text-sm text-gray-700 text-justify">
              By placing your order, you agree to our Privacy Notice and Terms of Use.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </React.Fragment>
  );
}

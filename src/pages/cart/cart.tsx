import React, { useState } from 'react';
import NavBar from 'src/layout/navigationBar';
import Footer from 'src/layout/Footer';
import { Link } from 'react-router-dom';
import useTitle from 'src/hooks/useTitle';


export default function Cart() {
    useTitle("Giỏ Hàng");
    const [amounts, setAmounts] = useState([1, 1]); // Mảng lưu trữ số lượng cho từng item

    // Hàm thay đổi số lượng cho một item cụ thể
    const handleChangeAmount = (index: number, newAmount: number) => {
        if (newAmount >= 1) {
            const newAmounts = [...amounts];
            newAmounts[index] = newAmount;
            setAmounts(newAmounts);
        }
    };
    
    return (
        <React.Fragment>
            <NavBar />
            <div className="h-screen bg-gray-100 pt-20">
                <h1 className="mb-8 text-center text-2xl font-bold">Cart Items</h1>
                <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
                    <div className="rounded-lg md:w-2/3">
                        <div className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
                            <img src="Homepage.png" alt="product" className="w-full rounded-lg sm:w-40" />
                            <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                                <div className="mt-5 sm:mt-0">
                                    <h2 className="text-lg font-bold text-gray-900">Cao Viet Thang</h2>
                                    <p className="mt-1 text-xs text-gray-700">Black</p>
                                </div>
                                <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                                    <div className="flex items-center border border-gray-200 rounded">
                                        <button
                                            className="w-10 h-10 leading-5 text-gray-600 transition hover:opacity-75"
                                            onClick={() => handleChangeAmount(0, amounts[0] - 1)} // Xử lý cho item đầu tiên
                                        >
                                            -
                                        </button>
                                        <span className="text-center items-center">{amounts[0]}</span>
                                        <button
                                            type="button"
                                            className="w-10 h-10 leading-5 text-gray-600 transition hover:opacity-75"
                                            onClick={() => handleChangeAmount(0, amounts[0] + 1)} // Xử lý cho item đầu tiên
                                        >
                                            +
                                        </button>
                                    </div>
                                    <button className='underline decoration-solid bg-white hover:bg-gray-200'>
                                         Remove
                                    </button>
                                    <div className="flex items-center space-x-4">
                                        <p className="text-sm">20000 $</p>

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
                            <img src="Homepage2.jpeg" alt="product" className="w-full rounded-lg sm:w-40" />
                            <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                                <div className="mt-5 sm:mt-0">
                                    <h2 className="text-lg font-bold text-gray-900">Cao Anh Tri</h2>
                                    <p className="mt-1 text-xs text-gray-700">White</p>
                                </div>
                                <div className="mt-4 flex justify-between im sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                                    <div className="flex items-center border border-gray-200 rounded">
                                        <button
                                            className="w-10 h-10 leading-5 text-gray-600 transition hover:opacity-75"
                                            onClick={() => handleChangeAmount(1, amounts[1] - 1)} // Xử lý cho item thứ hai
                                        >
                                            -
                                        </button>
                                        <span className="text-center items-center">{amounts[1]}</span>
                                        <button
                                            type="button"
                                            className="w-10 h-10 leading-5 text-gray-600 transition hover:opacity-75"
                                            onClick={() => handleChangeAmount(1, amounts[1] + 1)} // Xử lý cho item thứ hai
                                        >
                                            +
                                        </button>
                                    </div>
                                    <button className='underline decoration-solid bg-white hover:bg-gray-200'>
                                         Remove
                                    </button>
                                    <div className="flex items-center space-x-4">
                                        <p className="text-sm">20000 $</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
                        <div className="mb-2 flex justify-between">
                            <p className="text-gray-700">Subtotal</p>
                            <p className="text-gray-700">$+</p>
                        </div>
                        <div className="flex justify-between">
                            <p className="text-gray-700">Shipping</p>
                            <p className="text-gray-700">$+</p>
                        </div>
                        <hr className="my-4" />
                        <div className="flex justify-between">
                            <p className="text-lg font-bold">Total</p>
                            <div className="">
                                <p className="mb-1 text-lg font-bold">$+ USD</p>
                                <p className="text-sm text-gray-700">including VAT</p>
                            </div>
                        </div>
                        <button className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600">Check out</button>
                    </div>
                </div>
            </div>
            <Footer />
        </React.Fragment>
    )
}
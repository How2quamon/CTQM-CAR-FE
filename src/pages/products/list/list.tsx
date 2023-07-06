import React from 'react';
import useTitle from '../../../hooks/useTitle';
import MenuItems from 'src/layout /menuItems';

export default function List() {
    useTitle("Danh sách sản phẩm");
    return (
        <React.Fragment>
            <MenuItems/>
            <div className=" px-36">
                <div className="">
                    <video autoPlay muted loop>
                        <source src="~/videos/mec4.mp4" />
                    </video>
                    <button
                        className=""
                        onClick={() => (window.location.href = '@Url.Action("Product", "Xes")')}
                    >
                        Discover Now
                    </button>
                </div>
                <div className="">
                    <div className="">
                        <div className="">
                            <div className="">
                                <img src="~/images/Home/mec1.jpg" alt="" />
                            </div>
                        </div>
                        <div className="">
                            <div className="">
                                <h1>Ngoại hình siêu xe Mercedes AMG mới nhất</h1>
                                <p>
                                    Siêu xe Mercedes AMG mới nhất có ngoại hình hầm hố và cơ bắp. Vì vậy, bên cạnh vẻ đẹp sang trọng và
                                    quyến rũ truyền thống của những chiếc xe mang thương hiệu Mercedes thì AMG còn cho vẻ đẹp khỏe khoắn.
                                </p>
                                <div className="">
                                    <a href="#">
                                        <button
                                            className=""
                                            onClick={() => (window.location.href = '@Url.Action("Product", "Xes")')}
                                        >
                                            Discover Now
                                        </button>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="">
                        <div className="">
                            <div className="">
                                <h1>Nội thất siêu xe Mercedes AMG mới nhất</h1>
                                <p>
                                    Không gian nội thất xe Mercedes AMG mới nhất được làm từ vật liệu da cao cấp kết hợp cùng chất liệu gỗ
                                    sang trọng. Ghế ngồi hạng thương gia có đầy đủ các tiện ích cần thiết, hệ thống âm thanh và đèn chiếu
                                    sáng hiện đại,…
                                </p>
                                <div className="">
                                    <a href="#">
                                        <button
                                            className=""
                                            onClick={() => (window.location.href = '@Url.Action("Product", "Xes")')}
                                        >
                                            Discover Now
                                        </button>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="">
                            <div className="">
                                <img src="~/images/Home/mec2.webp" alt=" " />
                            </div>
                        </div>
                    </div>
                </div>
                <br />
                <br />
                <h1>COMING SOON!</h1>
                <div className="">
                    <div className="">
                        <div className="">
                            <div className="">
                                <div className="">
                                    <img
                                        className="history_ShopImage"
                                        src="https://media.zigcdn.com/media/content/2021/Jun/mercedesbenzgleclass_1200x900_0.jpg"
                                        alt="CTQM"
                                    />
                                </div>
                                <div className="history_ShopTextWithButton history_TextWithButton">
                                    <div className="history_ShopText">
                                        <p className="text-lg font-semibold">Mercedes-Benz GLC</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="intro">
                        <div className="left">
                            <div className="history">
                                <div className="history_ShopImageBox">
                                    <img
                                        className="history_ShopImage"
                                        src="https://media.zigcdn.com/media/content/2021/Aug/mercedesbenzglaclass_1200x900_0.jpg"
                                        alt="CTQM"
                                    />
                                </div>
                                <div className="history_ShopTextWithButton history_TextWithButton">
                                    <div className="history_ShopText">
                                        <p className="text-lg font-semibold">Mercedes-Benz GLA</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="intro">
                        <div className="right">
                            <div className="history">
                                <div className="history_ShopImageBox">
                                    <img
                                        className="history_ShopImage"
                                        src="https://media.zigcdn.com/media/content/2021/May/eqaawdtritle.jpg"
                                        alt="CTQM"
                                    />
                                </div>
                                <div className="history_ShopTextWithButton history_TextWithButton">
                                    <div className="history_ShopText">
                                        <p className="text-lg font-semibold">Mercedes-Benz EQA</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="intro">
                        <div className="right">
                            <div className="history">
                                <div className="history_ShopImageBox">
                                    <img
                                        className="history_ShopImage"
                                        src="https://media.zigcdn.com/media/content/2022/Dec/cover_639c64b981967.jpg"
                                        alt="CTQM"
                                    />
                                </div>
                                <div className="history_ShopTextWithButton history_TextWithButton">
                                    <div className="history_ShopText">
                                        <p className="text-lg font-semibold">Mercedes-Benz AMG E 53 Cabriolet</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container_footer">
                    <video autoPlay muted loop>
                        <source src="~/videos/Mercedes AMG GT’s - 4K Cinematic.mp4.mp4" />
                    </video>
                    <div className="text-block">
                        <h4>You have to a file a flight plan before leaving the driveway</h4>
                        <p>
                            Slide into the cockpit of the all-new Mercedes-Benz SLS AMG and the G-Force is guaranteed to keep you there.
                            The first vehicle engineered completely in-house at AMG, its passionate design is destined to become a future
                            classic. Its 563 hp engine accelerates from 0 to 100 km/h in just 3.8 seconds. Faster than a supersonic jet.
                            No really, it is. And its lightweight aluminum frame, long sleek hood, and unmistakable gullwing doors turn
                            heads even faster. What can we say? With great power comes great responsibility.
                        </p>
                    </div>
                </div>
            </div>

        </React.Fragment>
    )
}
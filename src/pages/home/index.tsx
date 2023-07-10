import { SketchOutlined } from '@ant-design/icons';
import { Button, Card } from 'antd';
import React from 'react';
import useTitle from 'src/hooks/useTitle';
import homepage1 from 'src/videos/mercedes-amg-car-png-image-pngpix-9.png';
import Howworks from 'src/videos/mercedes-benz-g-63-amg-mercedes-car-suv-white-front-view-115698742139qrfpozcbr.jpeg';

export default function List() {
    useTitle("Danh sách sản phẩm");
    return (
        <React.Fragment>
            {/* <MenuItems /> */}
            <main>
                <div className=" ">
                    <video autoPlay muted loop className='w-full ' >
                        <source src="../Videos/Mercedes-Maybach S-Class Haute Voiture Limited Edition 2022.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                    <h1 className='font-semibold text-[35px] absolute top-[100px] text-gray-200 flex items-center text-center left-[35%]  '>Mercedes-Maybach S-Class</h1>
                    <div className="flex absolute bottom-[150px] text-gray-200 gap-10 justify-center left-[35%] text-center">
                        <div className="flex flex-col">
                            <p>333mi</p>
                            <p>Range (EPA est.)</p>
                        </div>
                        <div className="flex flex-col">
                            <p>333mi</p>
                            <p>Range (EPA est.)</p>
                        </div>
                        <div className="flex flex-col">
                            <p>333mi</p>
                            <p>Range (EPA est.)</p>
                        </div>
                    </div>
                    <Button size='large' className=' absolute bottom-12 bg-slate-300 w-[20%] left-[40%]' >Discover Now</Button>
                </div>
                <div className="flex flex-row justify-around mt-10">
                    <div className="flex flex-col gap-6 justify-center w-[500px]">
                        <h1 className='font-bold text-[30px]'>Let's explore the wonders.</h1>
                        <p className=''>Open up the era of electrification with technological advancements from Mercedes-Benz.</p>
                        <Button size='large' className='w-36'>Discover Now</Button>
                    </div>
                    <img src={homepage1} alt="Mecedes Benx" className='w-[50%] h-100' />
                </div>
                <div className="flex flex-row justify-around mt-10">
                    <img src={homepage1} alt="Mecedes Benx" className='w-[50%] h-100' />
                    <div className="flex flex-col gap-6 justify-center w-[500px]">
                        <h1 className='font-bold text-[30px]'>Let's explore the wonders.</h1>
                        <p className=''>Open up the era of electrification with technological advancements from Mercedes-Benz.</p>
                        <Button size='large' className='w-36'>Discover Now</Button>
                    </div>
                </div>
                <div className="flex flex-row justify-around mt-10">
                    <div className="flex flex-col gap-6 justify-center w-[500px]">
                        <h1 className='font-bold text-[30px]'>Let's explore the wonders.</h1>
                        <p className=''>Open up the era of electrification with technological advancements from Mercedes-Benz.</p>
                        <Button size='large' className='w-36'>Discover Now</Button>
                    </div>
                    <img src={homepage1} alt="Mecedes Benx" className='w-[50%] h-100' />
                </div>
                <div className="flex flex-row justify-around mt-10">
                    <img src={homepage1} alt="Mecedes Benx" className='w-[50%] h-100' />
                    <div className="flex flex-col gap-6 justify-center w-[500px]">
                        <h1 className='font-bold text-[30px]'>Let's explore the wonders.</h1>
                        <p className=''>Open up the era of electrification with technological advancements from Mercedes-Benz.</p>
                        <Button size='large' className='w-36'>Discover Now</Button>
                    </div>
                </div>
                <div className="">
                    <div className="flex flex-col gap-3 justify-center items-center">
                        <p className='text-[30px] font-semibold'>How it works</p>
                        <p>Renting a luxury car has never been easier.</p>
                        <p>Our streamlined process makes it simple for you to book and confirm your vehicle of choice online.</p>
                    </div>
                    <div className="flex justify-around items-center mt-7">
                        <div className="flex flex-col gap-4 ">
                            <Card>
                                <p>Renting a luxury car has never been easier.</p>
                            </Card>
                            <Card>
                                <p>Renting a luxury car has never been easier.</p>
                            </Card>
                        </div>
                        <div className="w-[40%]">
                            <Card>
                                <img src={Howworks} alt="How it works" className='rounded-2xl' />
                            </Card>
                        </div>
                    </div>
                </div>
                <div className="bg-black text-gray-200 h-[400px] flex flex-col justify-center   ">
                    <div className=" flex flex-col gap-3 text-center">
                        <p className='text-[30px] font-semibold'>Our Services & Benefits</p>
                        <p>To make renting easy and hassle-free, we provide a variety of services and advantages. We have you covered with a variety of vehicles and flexible rental terms.</p>
                    </div>
                    <div className="flex justify-evenly gap-4 mt-[100px] text-center">
                        <div className="flex flex-col justify-center gap-3">
                            <SketchOutlined rev={undefined} title='Quality Choice' />
                            <p className='font-semibold text-[20px]'>Quality Choice</p>
                            <p>We offer a wide range of high-quality vehicles to choose from, including luxury cars, SUVs, vans, and more</p>
                        </div>
                        <div className="flex flex-col gap-3">
                            <SketchOutlined rev={undefined} title='Quality Choice' />
                            <p className='font-semibold text-[20px]'>Quality Choice</p>
                            <p>We offer a wide range of high-quality vehicles to choose from, including luxury cars, SUVs, vans, and more</p>
                        </div>
                        <div className="flex flex-col gap-3">
                            <SketchOutlined rev={undefined} title='Quality Choice' />
                            <p className='font-semibold text-[20px]'>Quality Choice</p>
                            <p>We offer a wide range of high-quality vehicles to choose from, including luxury cars, SUVs, vans, and more</p>
                        </div>
                    </div>
                </div>
            </main>

        </React.Fragment >
    )
}
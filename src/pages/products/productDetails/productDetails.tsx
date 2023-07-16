import React, { useState } from 'react'
import useTitle from 'src/hooks/useTitle';
import NavBar from 'src/layout/navigationBar';
import { Select } from 'antd';
import { Card } from 'antd';
import Footer from 'src/layout/Footer';

const ProductVariants = [
    {
      color: 'Emerald Green metallic',
    },
    {
      color: 'Magnetite Black metallic',
    },
    {
      color: 'Ocean Blue metallic',
    }
  ]

const { Meta } = Card;

const ProductDetails: React.FC = () => {
    useTitle("Chi tiết sản phẩm");
    const [images, setImages] = useState({
        img1 : "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
        img2 : "https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
        img3 : "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
        img4 : "https://images.unsplash.com/photo-1493238792000-8113da705763?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
    })
    const [activeImg, setActiveImage] = useState(images.img1)

    const [amount, setAmount] = useState(1);

    const [ProductVariant, setProductVariant] = useState(ProductVariants[0])

    const handleChange = (value: { value: string; label: React.ReactNode }) => {
        console.log(value); // { value: "lucy", key: "lucy", label: "Lucy (101)" }
      };

    return (
        <React.Fragment>
            <NavBar/>
            <main>
                <div className='flex flex-col justify-center items-center min-h-screen'>
                <section className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:place-items-center lg:py-20">
                        <article>
                            <img src={activeImg} alt="" className="w-full h-full aspect-square object-cover rounded-xl"/>
                            <div className='hidden lg:flex items-center justify-center gap-5 flex-wrap mt-5'>
                                <img src={images.img1} alt="" className='w-32 h-32 object-cover rounded-lg mb-4 cursor-pointer' onClick={() => setActiveImage(images.img1)}/>
                                <img src={images.img2} alt="" className='w-32 h-32 object-cover rounded-lg mb-4 cursor-pointer' onClick={() => setActiveImage(images.img2)}/>
                                <img src={images.img3} alt="" className='w-32 h-32 object-cover rounded-lg mb-4 cursor-pointer' onClick={() => setActiveImage(images.img3)}/>
                                <img src={images.img4} alt="" className='w-32 h-32 object-cover rounded-lg mb-4 cursor-pointer' onClick={() => setActiveImage(images.img4)}/>
                            </div> 
                        </article>
                         {/* ABOUT */}
                        <article className='space-x-4'>
                            <div className='space-x-4 mb-4'>
                                <span className='mx-4 mb-2 text-sky-600 font-semibold'>Mercedes</span>
                                <h1 className='text-3xl font-bold'>Mercedes-AMG G63 2019</h1>
                            </div>
                            <p className='my-2 text-gray-700 leading-7'>
                            With 577 handcrafted horses, the AMG G-63 is a legend raised to a higher power for a new era. Advanced luxury, unwavering confidence, and extensive individualization let you create a G that's at ease in any corner of the world.
                            </p>
                            <h6 className='my-2 text-2xl font-semibold'>12.000.000.000 VND</h6>
                            <div className='my-3 w-72'>
                                <h6 className='mb-2'>Color(s)</h6>
                                    <Select
                                        labelInValue
                                        defaultValue={{ value: 'Emerald Green metallic', label: 'Emerald Green metallic' }}
                                        style={{height: '150%'}}
                                        onChange={handleChange}
                                        options={[
                                        {
                                            value: 'Emerald Green metallic',
                                            label: 'Emerald Green metallic',
                                        },
                                        {
                                            value: 'Magnetite Black metallic',
                                            label: 'Magnetite Black metallic',
                                        },
                                        ]}
                                    />
                            </div>
                           
                            <div className='items-center'>
                                <div className="my-4 w-1/4 flex justify-between items-center border border-gray-200 rounded">
                                    <button                                    
                                    className="w-10 h-10 leading-5 text-gray-600 transition hover:opacity-75" onClick={() => setAmount((prev) => prev - 1)}>
                                    -
                                    </button>
                                    <span className="text-center items-center">{amount}</span>
                                    <button
                                    type="button"
                                    className="w-10 h-10 leading-5 text-gray-600 transition hover:opacity-75" onClick={() => setAmount((prev) => prev + 1)}>
                                    +
                                    </button>
                                </div>
                                <div className='items-center flex-col'>
                                    <button className='my-2 w-3/5  border border-zinc-600 hover:bg-slate-50 text-black font-semibold py-3 px-6 rounded-xl transition ease-in-out duration-300 hover:ease-in'>Add to cart</button>
                                    <button className='w-3/5 bg-slate-800 border border-zinc-600 hover:bg-slate-700 text-white font-semibold py-3 px-6 rounded-xl transition ease-in-out duration-300 hover:ease-in'>Buy it now</button>
                                </div>                    
                            </div>
                        </article>
                </section>
                <section className='mx-20'>
                    <h1 className='text-[30px] font-bold text-center'>Related Products</h1>
                    <div className='my-4 flex flex-col sm:flex-row items-center justify-evenly flex-wrap gap-5'>
                    <Card
                        hoverable
                        style={{ width: 300 }}
                        cover={<img alt="example" src="https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" />}
                    >
                        <Meta title="Mercedes-AMG GT" description="7.000.000.000 VND" />
                    </Card>
                    <Card
                        hoverable
                        style={{ width: 300 }}
                        cover={<img alt="example" src="https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" />}
                    >
                        <Meta title="Mercedes-AMG GT" description="7.000.000.000 VND" />
                    </Card>
                    <Card
                        hoverable
                        style={{ width: 300 }}
                        cover={<img alt="example" src="https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" />}
                    >
                        <Meta title="Mercedes-AMG GT" description="7.000.000.000 VND" />
                    </Card>
                    <Card
                        hoverable
                        style={{ width: 300 }}
                        cover={<img alt="example" src="https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" />}
                    >
                        <Meta title="Mercedes-AMG GT" description="7.000.000.000 VND" />
                    </Card>
                    <Card
                        hoverable
                        style={{ width: 300 }}
                        cover={<img alt="example" src="https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" />}
                    >
                        <Meta title="Mercedes-AMG GT" description="7.000.000.000 VND" />
                    </Card>
                    <Card
                        hoverable
                        style={{ width: 300 }}
                        cover={<img alt="example" src="https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" />}
                    >
                        <Meta title="Mercedes-AMG GT" description="7.000.000.000 VND" />
                    </Card>
                    </div>
                </section>
                </div>
            </main>
            <Footer/>
        </React.Fragment>
        
    )
}

export default ProductDetails

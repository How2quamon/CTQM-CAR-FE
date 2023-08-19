import React, { useEffect, useState } from "react";
// import { CarDetailDTO } from '@share/dtos/service-proxies-dtos';
import {
  CheckCircleOutlined,
  LinkOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { Button, Card, Popover, Spin, notification } from "antd";
import copy from "copy-to-clipboard";
import { Helmet } from "react-helmet";
import { Link, useParams } from "react-router-dom";
import { FacebookIcon, FacebookShareButton } from "react-share";
import { Segment } from "semantic-ui-react";
import useTitle from "src/hooks/useTitle";
import Footer from "src/layout/Footer";
import NavBar from "src/layout/navigationBar";
import { ctqmService } from "../../../services/ctqm.services";
import {
  CarDTO,
  CartDTO,
  CartNotiDTO,
} from "../../../share/dtos/service-proxies-dtos";

const ProductDetails: React.FC = () => {
  useTitle("Chi tiết sản phẩm");
  const [activeImg, setActiveImage] = useState("");
  const [amount, setAmount] = useState(1);
  const { carName } = useParams();
  const [carUrl, setCarUrl] = useState("");
  const [cars, setCars] = useState<CarDTO | null>(null);
  const [relateCars, setRelateCars] = useState<CarDTO[]>([]);
  const [loading, setIsLoading] = useState<boolean>(false);
  const [productLinkCopied, setProductLinkCopied] = useState(false);
  const [getData, setGetData] = useState(false);
  const baseAppURL = "https://ctqmmec.azurewebsites.net/products-details/";
  const handleCopyLink = (carName: string) => {
    const modifiedString = carName?.replace(/ /g, "%20");
    const productURL = `${baseAppURL}${modifiedString}`; // Lấy URL hiện tại của sản phẩm
    copy(productURL); // Sao chép URL vào clipboard
    setProductLinkCopied(true); // Đánh dấu rằng URL đã được sao chép
  };
  const [addToCartDto, setAddToCartDto] = useState<CartDTO>({
    customerId: "",
    carId: "",
    amount: 0,
    price: 0,
  });

  const imagePath =
    "https://res.cloudinary.com/dbz9e4cwk/image/upload/v1692201767/product/";

  useEffect(() => {
    getCarDetail();
  }, [getData]);

  const getCarDetail = () => {
    setIsLoading(true);
    ctqmService.carApi
      .getCarByName(carName as string)
      .then((response) => {
        setCars(response);
        getCarRelate(response.carModel as string);
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
        setGetData(true);
        setIsLoading(false);
        setActiveImage(imagePath + cars?.carName + "/" + cars?.image1?.trim());
        const modifiedString = carName?.replace(/ /g, "%20");
        setCarUrl(baseAppURL + modifiedString);
        console.log("URL: ", carUrl);
      });
  };

  const addToCart = (carDTO: CarDTO) => {
    const customerId = localStorage.getItem("CustomerId");
    if (customerId == null) {
      notification.error({
        message: "You're not login!",
        description: "Please login to contiune!",
        placement: "bottomRight",
      });
      return;
    }
    setIsLoading(true);
    addToCartDto.customerId = customerId;
    addToCartDto.carId = carDTO.carId;
    addToCartDto.amount = amount;
    addToCartDto.price = carDTO.carPrice;
    console.log("AIOAJFOIWER", addToCartDto);
    ctqmService.cartApi
      .addToCart(addToCartDto)
      .then((response: CartNotiDTO) => {
        notification.success({
          message: "Add to cart Success!",
          description:
            response.amount +
            " " +
            response.carName +
            " with $" +
            response.price +
            " are in your cart.",
          placement: "bottomRight",
        });
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

  const getCarRelate = (carModel: string) => {
    setGetData(false);
    setIsLoading(true);
    ctqmService.carApi
      .getCarWithModel(carModel)
      .then((response) => {
        setRelateCars(response);
      })
      .finally(() => {
        setGetData(true);
        setIsLoading(false);
      });
  };

  if (!cars) {
    return (
      <React.Fragment>
        <NavBar />
        <div className="flex justify-center items-center h-screen">
          <Spin size="large" />
        </div>
      </React.Fragment>
    );
  }
  const popoverContent = (
    <div className="flex gap-2">
      <CheckCircleOutlined rev={undefined} className="text-[#73d13d]" />
      Copied successfully!
    </div>
  );
  return (
    <React.Fragment>
      <NavBar />
      <main>
        <meta name="title" content={cars.carName} />
        <meta name="description" content={cars.head1} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={carUrl} />
        <meta property="og:title" content={cars.carName} />
        <meta property="og:description" content={cars.head1} />
        <meta
          property="og:image"
          content={imagePath + cars.carName + "/" + cars.image1?.trim()}
        />
        <Helmet>
          <meta name="title" content={cars.carName} />
          <meta name="description" content={cars.head1} />
          <meta property="og:type" content="website" />
          <meta property="og:url" content={carUrl} />
          <meta property="og:title" content={cars.carName} />
          <meta property="og:description" content={cars.head1} />
          <meta
            property="og:image"
            content={imagePath + cars.carName + "/" + cars.image1?.trim()}
          />
        </Helmet>
        <div className="flex flex-col justify-center min-h-screen">
          {/* {cars !== undefined ? ( */}
          <section className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10  items-start lg:py-14">
            <article>
              <img
                src={activeImg}
                alt=""
                className="w-11/12 h-11/12 aspect-square object-cover rounded-xl items-center justify-center"
              />
              <div className="hidden lg:flex justify-items-center gap-5 flex-wrap mt-5">
                <img
                  src={imagePath + cars.carName + "/" + cars.image1?.trim()}
                  alt=""
                  className="w-32 h-32 object-cover rounded-lg mb-4 cursor-pointer"
                  onClick={() =>
                    setActiveImage(
                      imagePath + cars.carName + "/" + cars.image1?.trim()
                    )
                  }
                />
                <img
                  src={imagePath + cars.carName + "/" + cars.image2?.trim()}
                  alt=""
                  className="w-32 h-32 object-cover rounded-lg mb-4 cursor-pointer"
                  onClick={() =>
                    setActiveImage(
                      imagePath + cars.carName + "/" + cars.image2?.trim()
                    )
                  }
                />
                <img
                  src={imagePath + cars.carName + "/" + cars.image3?.trim()}
                  alt=""
                  className="w-32 h-32 object-cover rounded-lg mb-4 cursor-pointer"
                  onClick={() =>
                    setActiveImage(
                      imagePath + cars.carName + "/" + cars.image3?.trim()
                    )
                  }
                />
                <img
                  src={imagePath + cars.carName + "/" + cars.image4?.trim()}
                  alt=""
                  className="w-32 h-32 object-cover rounded-lg mb-4 cursor-pointer"
                  onClick={() =>
                    setActiveImage(
                      imagePath + cars.carName + "/" + cars.image4?.trim()
                    )
                  }
                />
              </div>
            </article>
            {/* ABOUT */}
            <article className="space-x-4 flex flex-col">
              <div className="space-x-4 mb-3">
                <span className="mx-4 mb-2 text-sky-600 font-semibold">
                  {cars.carModel}
                </span>
                <h1 className="text-3xl font-bold">{cars.carName}</h1>
                <div className="flex flex-row mt-2">
                  <Segment>
                    <FacebookShareButton
                      url={carUrl}
                      quote="Born Pink"
                      className="flex items-center"
                    >
                      <FacebookIcon
                        iconFillColor="white"
                        round={true}
                        size={28}
                      ></FacebookIcon>
                    </FacebookShareButton>
                  </Segment>
                  <Popover content={popoverContent} trigger="click">
                    <LinkOutlined
                      className="pl-2 text-xl flex items-center"
                      title="Copy link"
                      onClick={() => handleCopyLink(cars.carName as string)}
                      rev={undefined}
                    />
                  </Popover>
                </div>
              </div>
              <p className="my-1 text-gray-700 leading-7">{cars.moTa}</p>
              <p className="my-1 text-gray-700 leading-7">{cars.moTa2}</p>
              <div className="my-1 py-4 flex flex-row items-center">
                <h6 className="pr-4">Price:</h6>
                <h6 className="text-2xl font-semibold tracking-wider">
                  ${cars?.carPrice}
                </h6>
              </div>

              <div className="items-center my-3">
                <h6 className="mb-2">Quantity:</h6>
                <div className="my-4 w-1/4 flex justify-between items-center border border-gray-200 rounded">
                  <button
                    className="w-10 h-10 leading-5 text-gray-600 transition hover:opacity-75"
                    onClick={() => {
                      if (amount > 1) {
                        setAmount((prev) => prev - 1);
                      }
                    }}
                  >
                    -
                  </button>
                  <span className="text-center items-center">{amount}</span>
                  <button
                    type="button"
                    className="w-10 h-10 leading-5 text-gray-600 transition hover:opacity-75"
                    onClick={() => setAmount((prev) => prev + 1)}
                  >
                    +
                  </button>
                </div>
                <div className="flex flex-col">
                  <Button
                    className="flex justify-center items-center my-2 w-3/5 h-10 border border-zinc-600 hover:bg-slate-50 text-black font-semibold !py-3 px-6 rounded-xl transition ease-in-out duration-300 hover:ease-in"
                    onClick={() => addToCart(cars)}
                  >
                    Add to cart
                  </Button>
                  <Button className="flex justify-center items-center w-3/5 h-10 bg-slate-800 border border-zinc-600 hover:bg-slate-700 text-white font-semibold py-3 px-6 rounded-xl transition ease-in-out duration-300 hover:ease-in">
                    Buy it now
                  </Button>
                </div>
              </div>
            </article>
          </section>
          {/* ) : (
            <div className="flex justify-center items-center h-screen">
              <Spin size="large" />
            </div>
          )} */}
          <section className="mx-20">
            <h1 className="text-[30px] font-bold text-center">
              Related Products
            </h1>
            <div className="flex flex-wrap justify-center gap-3 m-2 mt-10">
              {relateCars.length > 0 ? (
                relateCars?.map((car) => (
                  <Link to={""}>
                    <Card>
                      <img
                        src={imagePath + car.carName + "/" + car.image1?.trim()}
                        alt=""
                        className="w-[300px] rounded"
                      />
                      <Link to={""} className="absolute right-1 top-2">
                        <ShoppingCartOutlined
                          rev={undefined}
                          className="text-[17px]"
                        />
                      </Link>
                      <div className="flex flex-col gap-3">
                        <p className="text-[15px] font-semibold mt-2">
                          {car.carName}
                        </p>
                        <p className="text-[15px] font-semibold">
                          ${car.carPrice}
                        </p>
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
                              <p>{car.carEngine}</p>
                            </div>
                          </div>
                        </Card>
                        <Link
                          key={car.carName}
                          to={`/products-details/${car.carName}`}
                        >
                          <Button className="w-full">Details</Button>
                        </Link>
                      </div>
                    </Card>
                  </Link>
                ))
              ) : (
                <h2 className="text-[20px] font-bold text-center">
                  There's No Related For This Products
                </h2>
              )}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </React.Fragment>
  );
};

export default ProductDetails;

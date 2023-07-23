import { carDetailService } from "./carDetailsService/carDetails.service";
import { carService } from "./carService/car.service";
import { cartService } from "./cartService/cart.service";
import { customerService } from "./customerService/customer.service";
import { orderService} from "./orderService/order.service";

export const ctqmService = {
    customerApi: customerService,
    carApi: carService,
    carDetailApi: carDetailService,
    cartApi: cartService,
    orderApi:  orderService
};

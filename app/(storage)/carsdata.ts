import { Car } from "../types/types";

export let carsData = null as Array<Car> | null;
export let setCars = (newCars:Array<Car>) => {carsData = newCars}

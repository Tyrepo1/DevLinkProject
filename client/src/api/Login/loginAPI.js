import { baseurl, GET_USERS } from "../configAPI";
import { getData } from "../../core/DB";

export const getListUsers = async () => {
    const url = `${baseurl}${GET_USERS}`;
    const response = await getData(url);
    return response;
}
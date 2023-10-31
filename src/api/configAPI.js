export const base_headers = (contenttype) => {
    return {
        "token": localStorage.getItem("token"),
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": contenttype != null ? contenttype : 'application/json',
        // "Accept": "application/json",
        // "language": "vi"
    }
}
export const file_headers = () => {
    return {
        "token": localStorage.getItem("token"),
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": 'multipart/form-data',
        // "language": "vi"
    }
}
export const baseurl = "localhost:9000/"
export const GET_USERS = "get-users"
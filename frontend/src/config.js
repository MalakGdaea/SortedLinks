const SERVER_ROUTE = "http://localhost:3012/";
const FAV_ICON_LINK = "http://www.google.com/s2/favicons?domain=";
const ADD_Space = "Add New Space";
const ADD_Collection = "Add New Collection";
const DELETE_Space = "Delete Space";
const CONFLICT_STATUS_CODE = 409;

const getIcon = (domain) => {
    return `${FAV_ICON_LINK}${domain}&sz=64`;
}

export { SERVER_ROUTE, getIcon, ADD_Space, ADD_Collection, DELETE_Space, CONFLICT_STATUS_CODE };


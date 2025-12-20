const SERVER_ROUTE =
    process.env.REACT_APP_SERVER_ROUTE || "http://localhost:3012/";

export default SERVER_ROUTE;
const FAV_ICON_LINK = "http://www.google.com/s2/favicons?domain=";


// Action Types - Use present tense verbs
const ADD_SPACE = "Add New Space";
const EDIT_SPACE = "Edit space name";
const DELETE_SPACE = "Delete Space";
const ADD_COLLECTION = "Add New Collection";
const EDIT_COLLECTION = "Edit collection name";
const DELETE_COLLECTION = "Delete collection";
const ADD_LINK = "Add New Link";
const EDIT_LINK = "Edit link";
const DELETE_LINK = "Delete link";

const getIcon = (url) => {
    return `${FAV_ICON_LINK}${url}&sz=64`;
}
export {
    SERVER_ROUTE,
    getIcon,
    ADD_SPACE,
    EDIT_SPACE,
    DELETE_SPACE,
    ADD_COLLECTION,
    EDIT_COLLECTION,
    ADD_LINK,
    EDIT_LINK,
    DELETE_LINK,
    DELETE_COLLECTION,
};


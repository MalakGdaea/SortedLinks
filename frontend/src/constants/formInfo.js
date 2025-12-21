
export const SpaceFormInfo = {
    title: "Add New Space",
    fields: [
        { name: "name", type: "text", placeholder: "Name", required: true },
    ],
    submitBtn: " + Add Space",
};

export const editSpace = {
    title: "Change Space Name",
    fields: [
        { name: "name", type: "text", placeholder: "new name", required: true },
    ],
    submitBtn: " Save",
};

export const CollectionFormInfo = {
    title: "Add New Collection",
    fields: [
        { name: "name", type: "text", placeholder: "Name", required: true },
    ],
    submitBtn: " + Add Collection",
};

export const editCollection = {
    title: "Change Collection Name",
    fields: [
        { name: "name", type: "text", placeholder: "new name", required: true },
    ],
    submitBtn: " Save",
};

export const LinkFormInfo = {
    title: "Add New Link",
    fields: [
        { name: "title", type: "text", placeholder: "Name", required: true },
        { name: "URL", type: "text", placeholder: "URL", required: true },
        { name: "note", type: "textarea", placeholder: "Description" },
        { name: "tags", type: "text", placeholder: "Tags (comma separated)" },
    ],
    submitBtn: "+ Add Link",
};

export const editLink = {
    title: "Edit Link",
    fields: [
        { name: "title", type: "text", placeholder: "Name", required: true },
        { name: "URL", type: "text", placeholder: "URL", required: true },
        { name: "note", type: "textarea", placeholder: "Description" },
        { name: "tags", type: "text", placeholder: "Tags (comma separated)" },
    ],
    submitBtn: " Save",
};
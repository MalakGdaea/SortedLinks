export const SpaceFormInfo = {
    title: "Add New Space",
    fields: [
        { name: "name", type: "text", placeholder: "Name", required: true },
    ],
    submitBtn: " + Add Space",
};

export const CollectionFormInfo = {
    title: "Add New Collection",
    fields: [
        { name: "name", type: "text", placeholder: "Name", required: true },
    ],
    submitBtn: " + Add Collection",
};

export const LinkFormInfo = {
    title: "Add New Link",
    fields: [
        { name: "title", type: "text", placeholder: "Name", required: true },
        { name: "URL", type: "text", placeholder: "URL", required: true },
        { name: "collection", type: "select", placeholder: "collection", required: true },
        { name: "note", type: "textarea", placeholder: "Description" },
        { name: "tags", type: "text", placeholder: "Tags (comma separated)" },
    ],
    submitBtn: "+ Add Link",
};

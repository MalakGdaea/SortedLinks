import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ADD_COLLECTION, ADD_LINK, ADD_SPACE, EDIT_COLLECTION } from "../config";
import { CollectionFormInfo, LinkFormInfo, editCollection, SpaceFormInfo } from "../constants/formInfo";
import { createCollection, updateCollection } from "../state/features/collection/collectionThunks";
import { createLink } from "../state/features/link/linkThunks";
import { selectIsLoading } from "../state/features/space/spaceSelectors";
import { selectLinksLoading } from "../state/features/link/linkSelectors";
import { selectCollectionsByCurrentSpace } from "../state/features/collection/collectionSelectors";
import { selectIsLoading as selectCollectionLoading } from "../state/features/collection/collectionSelectors";
import { createSpace } from "../state/features/space/spaceThunks";


export const useFormManager = (contextData = {}) => {
    const [activeFormType, setActiveFormType] = useState(null);
    const dispatch = useDispatch();

    const collections = useSelector(selectCollectionsByCurrentSpace);

    // Centralized loading states
    const isCollectionLoading = useSelector(selectCollectionLoading);
    const isLinkLoading = useSelector(selectLinksLoading);
    const isSpaceLoading = useSelector(selectIsLoading);

    const getDynamicLinkConfig = () => {
        // If we have a specific collection in context, hide dropdown and change title
        if (contextData.collection) {
            return {
                ...LinkFormInfo,
                title: `Add New Link to ${contextData.collection.name}`,
                fields: LinkFormInfo.fields // Standard fields (no dropdown)
            };
        }

        // If no collection context, add the Select dropdown
        const collectionField = {
            name: "collectionId",
            type: "select",
            placeholder: "Select Collection",
            required: true,
            options: collections.map(c => ({ value: c._id, label: c.name }))
        };

        return {
            ...LinkFormInfo,
            fields: [
                ...LinkFormInfo.fields.slice(0, 2),
                collectionField,
                ...LinkFormInfo.fields.slice(2)
            ]
        };
    };

    const formConfigs = {
        [ADD_SPACE]: {
            config: SpaceFormInfo,
            loading: isSpaceLoading,
            action: (data) => createSpace(data.name)
        },
        [ADD_COLLECTION]: {
            config: CollectionFormInfo,
            loading: isCollectionLoading,
            action: (data) => createCollection({ spaceId: contextData.spaceId, collectionName: data.name }),
        },
        [ADD_LINK]: {
            config: getDynamicLinkConfig(),
            loading: isLinkLoading,
            action: (data) => createLink({ ...data, collectionId: contextData.collection?._id || data.collectionId }),
        },
        [EDIT_COLLECTION]: {
            config: editCollection,
            loading: isCollectionLoading,
            action: (data) => updateCollection({ collectionId: contextData.collection?._id, newName: data.name }),
        },
    };

    const currentForm = formConfigs[activeFormType];

    const handleSubmit = async (data) => {
        if (!currentForm) return;
        try {
            await dispatch(currentForm.action(data)).unwrap();
            setActiveFormType(null);
        } catch (err) {
            console.error("Form Submission Error:", err);
        }
    };

    return {
        activeFormType,
        setActiveFormType,
        currentForm,
        handleSubmit,
        closeForm: () => setActiveFormType(null)
    };
};
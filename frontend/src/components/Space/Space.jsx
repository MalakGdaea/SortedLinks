import "./Space.css"
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentSpace } from "../../state/features/space/spaceSelectors.js";
import { setCurrentSpace } from "../../state/features/space/spaceSlice.js";

function Space({ space }) {
  const dispatch = useDispatch();
  const currentSpace = useSelector(selectCurrentSpace);
  const [isActive, setIsActive] = useState(currentSpace?._id === space._id);

  useEffect(() => {
    setIsActive(currentSpace?._id === space._id);

  }, [currentSpace, space._id]);
  const handleClick = (e) => {
    e.preventDefault();
    dispatch(setCurrentSpace(space));
  };

  return (
    <div className={`space-container ${isActive ? "active" : ""}`} >
      <img src="folder.svg" />
      <div
        onClick={handleClick}
        className='space'
      >
        {space.name}
      </div>
    </div>
  );
}

export default Space;

import "./CollectionList.css";
import Collection from "./Collection";

function CollectionList({ collections }) {

  return (
    <div className="collections-list">
      {collections.map((collection) => (
        <Collection key={collection._id} collection={collection} />
      ))}
    </div>
  );
}
export default CollectionList;

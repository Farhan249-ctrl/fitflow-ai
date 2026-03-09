import FoodUploadZone from "./components/FoodUploadZone";

// Backwards-compatible wrapper so existing imports keep working.
export default function FoodUpload(props) {
  return <FoodUploadZone {...props} />;
}
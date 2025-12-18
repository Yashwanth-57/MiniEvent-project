import { useParams } from "react-router-dom";
import CreateEvent from "../components/CreateEvent";

const EditEvent = () => {
  const { id } = useParams();
  return <CreateEvent eventId={id} />;
};

export default EditEvent;

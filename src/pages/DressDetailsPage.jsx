import { useParams } from 'react-router-dom';
import DressDetails from '../components/DressDetails';

const DressDetailsPage = () => {
  const { id } = useParams();

  return (
    <div className="container mx-auto p-6">
      <DressDetails dressId={id} />
    </div>
  );
};

export default DressDetailsPage;
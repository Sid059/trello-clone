import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Button from '../components/reusable/Button';


export default function BoardPage() {
  const { boardId } = useParams();  // Get boardId from URL
  
  const boardTitle = useSelector(state => state.boards.byId[boardId]?.title) || 'Unknown Board';
  
  const navigate = useNavigate();
  
  const handleBack = () => {
    navigate('/');  // Go back to Dashboard
  };
  
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <Button 
          variant="secondary" 
          onClick={handleBack}
          className="mb-6"
        >
          ← Back to Boards
        </Button>
        
        {/* Board Title Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-800">
            Board: {boardTitle}
          </h1>
          <p className="text-gray-500 mt-2">
          </p>
        </div>
        
        {/* Placeholder for Lists */}
        <div className="bg-white rounded-lg shadow-md p-12 text-center border-2 border-dashed border-gray-300">
          <p className="text-gray-500 text-lg">
            Lists will appear here  {/*Coming soon: Add lists, then add cards*/}
          </p>
          <p className="text-gray-400 text-sm mt-2">
            (Coming soon: Add lists, then add cards)    {/*Coming soon: Add lists, then add cards*/}
          </p>
        </div>
      </div>
    </div>
  );
}

// toastHelper.js
import { toast } from 'react-toastify';

const showToast = (action, itemName) => {
  switch (action) {
    case 'upload':
      toast.success(`${itemName} uploaded successfully!`);
      break;
    case 'update':
      toast.success(`${itemName} updated successfully!`);
      break;
    case 'delete':
      toast.error(`${itemName} deleted successfully!`);
      break;
    // Add more cases for different actions as needed
    default:
      break;
  }
};

export default showToast;

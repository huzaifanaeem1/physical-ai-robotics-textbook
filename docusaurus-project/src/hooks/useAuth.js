import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

// Custom hook that wraps the context to provide the same interface as expected by the old .js files
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  // Map the context to the expected interface
  const {
    user,
    token,
    loading,
    login,
    signup,
    logout,
    getUserProfile,
    updateUserProfile,
    isAuthenticated
  } = context;

  // Provide the expected interface for the old .js files
  return {
    user,
    token,
    loading,
    isAuthenticated,
    login,
    signup,
    logout,
    getProfile: getUserProfile,  // Map to expected name
    updateProfile: updateUserProfile,  // Map to expected name
    error: null,  // The old files expect an error field
  };
};
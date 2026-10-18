
import api from './api';

const authService = {
  // Request an OTP for login.
  sendLoginOtp: mobileNumber => {
    return api.post('/auth/send-otp', {
      mobileNumber,
    });
  },

  // Register a new user and request an OTP.
  register: registrationData => {
    return api.post('/auth/register', registrationData);
  },

  // Verify the OTP entered by the user.
  verifyOtp: (mobileNumber, otp) => {
    return api.post('/auth/verify-otp', {
      mobileNumber,
      otp,
    });
  },
};

export default authService;

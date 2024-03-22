"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const RegisterPage = () => {
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState<string>(''); // Explicitly specify type string
  const [otp, setOtp] = useState<string>(''); // Explicitly specify type string
  const [country, setCountry] = useState<string>(''); // Explicitly specify type string
  const [profileName, setProfileName] = useState<string>(''); // Explicitly specify type string
  const [isOtpSent, setIsOtpSent] = useState<boolean>(false); // Explicitly specify type boolean

  const handlePhoneNumberSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch('https://chatapp.smpco.tech/api/sendOtp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phoneNumber }),
      });

      if (response.ok) {
        setIsOtpSent(true);
      } else {
        console.error('Failed to send phone number:', response.statusText);
      }
    } catch (error:any) {
      console.error('Error sending phone number:', error.message);
    }
  };

  const handleOtpSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const name = profileName;
    try {
      const res = await fetch('https://chatapp.smpco.tech/api/verifyotp', {
        method: 'POST',
         headers: {
          'Content-Type': 'application/json',
        },
         body: JSON.stringify({phoneNumber,otp,name,country})
      });
         if (res.ok) {
        router.push('/');
      } else {
        console.error('Failed to send phone number:', res.statusText);
      }
    } catch (e: any) {
      console.error('Error sending phone number:', e.message);
    }
  
    
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full px-8 py-12 bg-white shadow-lg rounded-md">
        <h1 className="text-3xl font-semibold text-center mb-8">Register</h1>
        {!isOtpSent ? (
          <form onSubmit={handlePhoneNumberSubmit}>
            <input
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Enter your phone number"
              className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
            <button
              type="submit"
              className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            >
              Send OTP
            </button>
          </form>
        ) : (
          <form onSubmit={handleOtpSubmit}>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP"
              className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
            <input
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              placeholder="Enter your country"
              className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
            <input
              type="text"
              value={profileName}
              onChange={(e) => setProfileName(e.target.value)}
              placeholder="Enter your profile name"
              className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
            <button
              type="submit"
              className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            >
              Verify OTP
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default RegisterPage;

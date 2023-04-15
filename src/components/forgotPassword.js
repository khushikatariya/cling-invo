import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import Confetti from 'react-confetti';
import { useNavigate } from 'react-router-dom';


export default function ResetPasswordForm() {
  const navigate = useNavigate(); // create navigate function using useNavigate hook

  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [step, setStep] = useState(1);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [countDown, setCountDown] = useState(5);
    const [showConfetti, setShowConfetti] = useState(false);
  
  const setTokenToCookie = (token) => {
    Cookies.set('token', token, { expires: 7 });
  };

  const getTokenFromCookie = () => {
    return Cookies.get('token');
  };

  const setTokenToLocalStorage = (token) => {
    localStorage.setItem('token', token);
  };

  const getTokenFromLocalStorage = () => {
    return localStorage.getItem('token');
  };
  
  
  
  
  
  useEffect(() => {
    if (success) { // only start countdown if success is true
      const interval = setInterval(() => {
        setCountDown((prevCount) => {
          if (prevCount <= 0) {
            clearInterval(interval);
            if (success) {
              navigate('/');
            }
            console.log("countDown: ", prevCount - 1); // add console.log statement

            return 0;
          } else {
            return prevCount - 1;
          }
        });
      }, 1000);
  
      return () => clearInterval(interval);
    }
  }, [navigate, success]);
  

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (step === 1) {
      try {
        const response = await fetch('https://old-backend-server-14-jqcuvvaua-abhaywankhade001.vercel.app/api/forgot-password', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email })
        });
        const data = await response.json();
        setStep(2);
        setError(null);
      } catch (error) {
        console.error(error);
        setError('Failed to send OTP. Please try again later.');
      }
    } else if (step === 2) {
      try {
        const response = await fetch('https://old-backend-server-14-jqcuvvaua-abhaywankhade001.vercel.app/api/verify-otp', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, otp: parseInt(otp) })
        });

        const data = await response.text();
        console.log(data);

        if (response.ok) {
          const token = data;
          setTokenToLocalStorage(token);
          setTokenToCookie(token); // set token to cookie
          setStep(3);
          setError(null);
        } else {
          setError('Invalid OTP. Please try again.');
        }
      } catch (error) {
        console.error(error);
        setError('Invalid OTP. Please try again.');
      }
    } else if (step === 3) {
      if (password !== confirmPassword) {
        setError('Passwords do not match.');
        return;
      }
  
      try {
        const token = getTokenFromCookie(); // retrieve token from cookie
        console.log(token);
        const response = await fetch('https://old-backend-server-14-jqcuvvaua-abhaywankhade001.vercel.app/api/reset-password', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ email, password })
        });
  
        if (response.ok) {
          setSuccess(true);
          setError(null);
          Cookies.remove('token'); // remove token from cookie on success
          localStorage.removeItem('token'); // remove token from local storage on success
        } else {
          setError('Failed to reset password. Please try again later.');
        }
      } catch (error) {
        console.error(error);
        setError('Failed to reset password. Please try again later.');
      }
    }
  };
  

  
  
  
  
  
  const handleReset = () => {
    setStep(1);
    setEmail('');
    setOtp('');
    setPassword('');
    setConfirmPassword('');
    setError(null);
    setSuccess(false);
    Cookies.remove('token'); // remove token from cookie on reset
    localStorage.removeItem('token'); // remove token from local storage on reset
  };


  return (
    <div className="flex justify-center items-center h-screen max-w-md mx-auto">
      <div class="max-w-md mx-auto bg-white p-10 rounded-md shadow-md space-y-6">
        {success ? (
          <div>
          <Confetti  style={{ width: '100vw', height: '100vh' }}/>
          .
            <h1 class="text-xl font-medium text-gray-700 text-center">Password Reset Successful!</h1>
            <button class="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 block  my-4" onClick={handleReset}>Reset Password Again</button>
            <div className='space-y-6'>
            <h3> redircting  in</h3>
          {countDown}
          </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} class="space-y-6">
            {step === 1 && (
              <div>
                <label htmlFor="email" class="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <div class="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    class="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md py-2 px-3"
                  />
                </div>
                <button
                  type="submit"
                  class="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 block mx-auto my-4"
                >
                  Send OTP
                </button>
              </div>
            )}
            {step === 2 && (
              <div>
                <label htmlFor="otp" class="block text-sm font-medium text-gray-700">
                  OTP
                </label>
                <div class="mt-1">
                  <input
                    id="otp"
                    name="otp"
                    type="numerber"
                    autoComplete="off"
                    required
                    value={otp}
                    onChange={(event) => setOtp(event.target.value)}
                    class="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md py-2 px-3"
                  />
                </div>
                <button
                  type="submit"
                  class="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 block mx-auto my-4"
                >
                  Verify OTP
                </button>
              </div>
            )}
            {step === 3 && (
              <div>
                <label htmlFor="newPassword" class="block text-sm font-medium text-gray-700">
                  New password
                </label>
                <div class="mt-1">
                  <input
                    id="newPassword"
                    name="newPassword"
                    type="password"
                    autoComplete="off"
                    required
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    class="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md py-2 px-3"
                  />
                   <label htmlFor="confirmPassword" class="block text-sm font-medium text-gray-700">
Confirm new password
</label>
<div class="mt-1">
                  <input
id="confirmPassword"
name="confirmPassword"
type="password"
autoComplete="off"
required
value={confirmPassword}
onChange={(event) => setConfirmPassword(event.target.value)}
class="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md py-2 px-3"
/>
</div>
                </div>
                <button
                  type="submit"
                  class="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 block mx-auto my-4"
                >
                  Reset Password
                </button>
              </div>
            )}
          </form>
        )}

      </div>
    </div>
  )
}
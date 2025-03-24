import React from "react";
import { useNavigate } from "react-router-dom";
import { SignInOrUpForm } from "app";
import { Button } from "../components/Button";
import { RedirectAuthenticated } from "../utils/authRedirects";

export default function Signup() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col justify-center items-center p-4">
      <RedirectAuthenticated />
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-blue-600 mb-2">Create Account</h1>
          <p className="text-gray-600">Join Vid2PPT to transform your video presentations</p>
        </div>
        
        <SignInOrUpForm signInOptions={{ google: true, emailAndPassword: true }} />
        
        <div className="mt-8 text-center">
          <p className="text-gray-600">
            Already have an account?{" "}
            <button 
              onClick={() => navigate("/login")} 
              className="text-blue-600 hover:underline font-medium"
            >
              Log in
            </button>
          </p>
        </div>
      </div>
      
      <Button 
        variant="outline" 
        className="mt-8"
        onClick={() => navigate("/")}
      >
        Back to Home
      </Button>
    </div>
  );
}

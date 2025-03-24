import React from "react";
import { useNavigate } from "react-router-dom";
import { SignInOrUpForm } from "app";
import { Button } from "../components/Button";

export default function Login() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-blue-600 mb-2">Welcome Back</h1>
          <p className="text-gray-600">Sign in to your Vid2PPT account</p>
        </div>
        
        <SignInOrUpForm signInOptions={{ google: true, emailAndPassword: true }} />
        
        <div className="mt-8 text-center">
          <p className="text-gray-600">
            Don't have an account?{" "}
            <button 
              onClick={() => navigate("/signup")} 
              className="text-blue-600 hover:underline font-medium"
            >
              Sign up
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
};
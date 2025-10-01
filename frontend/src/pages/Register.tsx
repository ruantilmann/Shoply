import React from 'react';
import { BrandHeader } from '@/components/auth/brand-header';
import { RegisterForm } from '@/components/auth/register-form';
import { GeometricShapes } from '@/components/decorative/geometric-shapes';

const Register = () => {
  return (
    <div className="page-container">
      <GeometricShapes />
      
      <div className="content-wrapper">
        <div className="max-w-lg mx-auto">
          <BrandHeader />
          <RegisterForm />
        </div>
      </div>
    </div>
  );
};

export default Register;
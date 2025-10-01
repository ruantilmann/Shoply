import React from 'react';
import { BrandHeader } from '@/components/auth/brand-header';
import { LoginForm } from '@/components/auth/login-form';
import { GeometricShapes } from '@/components/decorative/geometric-shapes';

const Index = () => {
  return (
    <div className="page-container">
      <GeometricShapes />
      
      <div className="content-wrapper">
        <div className="max-w-lg mx-auto">
          <BrandHeader />
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default Index;

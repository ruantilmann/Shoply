import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

import api from '@/api/axiosConfig';

const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .email({ message: "Email inválido" })
    .max(255, { message: "Email deve ter menos de 255 caracteres" }),
  password: z
    .string()
    .trim()
    .min(6, { message: "Senha deve ter pelo menos 6 caracteres" })
    .max(100, { message: "Senha deve ter menos de 100 caracteres" })
});

type LoginFormData = z.infer<typeof loginSchema>;

export const LoginForm: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema)
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    
    try {
      const response = await api.post('/users/login', data);
      const { token } = response.data;

      localStorage.setItem('token', token);
      
      // Decode token to get user info (optional, but useful)
      // For simplicity, we'll just use the email for now
      localStorage.setItem('user', JSON.stringify({ 
        email: data.email, 
        name: data.email.split('@')[0] 
      }));
      
      toast({
        title: "Login realizado com sucesso!",
        description: "Bem-vindo ao Shoply!",
      });
      
      // Redirect to dashboard
      setTimeout(() => {
        navigate('/dashboard');
      }, 1500);
      
    } catch (error) {
      toast({
        title: "Erro no login",
        description: "Verifique suas credenciais e tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="form-container">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white/90 text-sm font-semibold tracking-wide">
                ENDEREÇO E-MAIL
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="example@gmail.com"
                variant="auth"
                {...register('email')}
                disabled={isLoading}
              />
              {errors.email && (
                <p className="text-red-300 text-sm">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-white/90 text-sm font-semibold tracking-wide">
                SENHA DE ACESSO
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="SENHA DE ACESSO"
                variant="auth"
                {...register('password')}
                disabled={isLoading}
              />
              {errors.password && (
                <p className="text-red-300 text-sm">{errors.password.message}</p>
              )}
            </div>
          </div>

          <Button
            type="submit"
            variant="auth"
            size="lg"
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? "ENTRANDO..." : "ENTRAR"}
          </Button>
        </form>

        <div className="register-section">
          <Button 
            variant="register" 
            size="lg" 
            className="w-full"
            onClick={() => navigate('/register')}
            disabled={isLoading}
          >
            CADASTRE-SE
          </Button>
        </div>
      </div>

      <div className="text-center mt-6">
        <button className="forgot-password-link">
          ESQUECEU SUA SENHA?
        </button>
      </div>
    </div>
  );
};

export default LoginForm;
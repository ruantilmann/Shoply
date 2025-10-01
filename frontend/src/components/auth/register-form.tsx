import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { createUser } from '@/api/users';

const registerSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, { message: "Nome deve ter pelo menos 2 caracteres" })
    .max(100, { message: "Nome deve ter menos de 100 caracteres" }),
  age: z
    .string()
    .transform((val) => parseInt(val, 10))
    .refine((val) => !isNaN(val), { message: "Idade deve ser um número válido" })
    .refine((val) => val >= 13, { message: "Idade mínima é 13 anos" })
    .refine((val) => val <= 120, { message: "Idade máxima é 120 anos" }),
  email: z
    .string()
    .trim()
    .email({ message: "Email inválido" })
    .max(255, { message: "Email deve ter menos de 255 caracteres" }),
  username: z
    .string()
    .trim()
    .min(3, { message: "Username deve ter pelo menos 3 caracteres" })
    .max(50, { message: "Username deve ter menos de 50 caracteres" })
    .regex(/^[a-zA-Z0-9_]+$/, { message: "Username deve conter apenas letras, números e _" }),
  password: z
    .string()
    .trim()
    .min(6, { message: "Senha deve ter pelo menos 6 caracteres" })
    .max(100, { message: "Senha deve ter menos de 100 caracteres" }),
  confirmPassword: z
    .string()
    .trim()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Senhas não coincidem",
  path: ["confirmPassword"],
});

type RegisterFormData = z.infer<typeof registerSchema>;

export const RegisterForm: React.FC = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema)
  });

  const mutation = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      toast({
        title: "Cadastro realizado com sucesso!",
        description: "Sua conta foi criada. Faça login para continuar.",
      });
      navigate('/');
    },
    onError: (error: any) => {
      let errorMessage = "Erro interno do servidor. Tente novamente.";
      if (error.response && error.response.data && error.response.data.message) {
        errorMessage = error.response.data.message;
      } else if (error.request) {
        errorMessage = "Não foi possível conectar ao servidor. Verifique se a API está rodando.";
      } else if (error.message) {
        errorMessage = error.message;
      }
      toast({
        title: "Erro no cadastro",
        description: errorMessage,
        variant: "destructive",
      });
    }
  });

  const onSubmit = (data: RegisterFormData) => {
    mutation.mutate(data);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="form-container">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName" className="text-white/90 text-sm font-semibold tracking-wide">
                NOME COMPLETO
              </Label>
              <Input
                id="fullName"
                type="text"
                placeholder="Seu nome completo"
                variant="auth"
                {...register('fullName')}
                disabled={mutation.isPending}
              />
              {errors.fullName && (
                <p className="text-red-300 text-sm">{errors.fullName.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="age" className="text-white/90 text-sm font-semibold tracking-wide">
                IDADE
              </Label>
              <Input
                id="age"
                type="number"
                placeholder="Sua idade"
                variant="auth"
                {...register('age')}
                disabled={mutation.isPending}
              />
              {errors.age && (
                <p className="text-red-300 text-sm">{errors.age.message}</p>
              )}
            </div>

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
                disabled={mutation.isPending}
              />
              {errors.email && (
                <p className="text-red-300 text-sm">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="username" className="text-white/90 text-sm font-semibold tracking-wide">
                USERNAME
              </Label>
              <Input
                id="username"
                type="text"
                placeholder="Seu username"
                variant="auth"
                {...register('username')}
                disabled={mutation.isPending}
              />
              {errors.username && (
                <p className="text-red-300 text-sm">{errors.username.message}</p>
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
                disabled={mutation.isPending}
              />
              {errors.password && (
                <p className="text-red-300 text-sm">{errors.password.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-white/90 text-sm font-semibold tracking-wide">
                CONFIRMAR SENHA
              </Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="CONFIRME SUA SENHA"
                variant="auth"
                {...register('confirmPassword')}
                disabled={mutation.isPending}
              />
              {errors.confirmPassword && (
                <p className="text-red-300 text-sm">{errors.confirmPassword.message}</p>
              )}
            </div>
          </div>

          <Button
            type="submit"
            variant="register"
            size="lg"
            className="w-full"
            disabled={mutation.isPending}
          >
            {mutation.isPending ? "CADASTRANDO..." : "CADASTRAR"}
          </Button>
        </form>

        <div className="register-section">
          <Button 
            variant="auth" 
            size="lg" 
            className="w-full"
            onClick={() => navigate('/')}
            disabled={mutation.isPending}
          >
            JÁ TENHO CONTA
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
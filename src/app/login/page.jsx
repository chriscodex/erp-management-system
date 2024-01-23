'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { useSession } from 'next-auth/react';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

function LoginPage() {
  const router = useRouter();

  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  /* Verificación de token de inicio de sesión existente */
  const { data: session, status } = useSession();
  if (status === 'authenticated') {
    // Redirección a la pagina de inicio
    router.push('/');
  }

  /* Manejo de visibilidad de contraseña */
  const handleClickShowPassword = () => {
    setError('');
    setShowPassword((show) => !show);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
    setError('');
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
    setError('');
  };

  /* Manejo de formulario */
  const handleSubmit = async (e) => {
    e.preventDefault();

    setError('');
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);

    if (!formData.get('dni')) {
      setIsLoading(false);
      return setError('Ingrese su DNI');
    }

    if (!formData.get('password')) {
      setIsLoading(false);
      return setError('Ingrese su contraseña');
    }

    const res = await signIn('credentials', {
      dni: formData.get('dni'),
      password: formData.get('password'),
      redirect: false,
    });

    if (res?.error) {
      setIsLoading(false);
      return setError(res.error);
    }

    // Redirección a la pagina de inicio
    if (res?.ok) {
      return router.push('/');
    }
  };

  return (
    <>
      <section className="w-full flex flex-col items-center justify-center p-4">
        <Card className="flex flex-row gap-4 shadow-xl rounded-md bg-white">
          {/* Izquierda */}
          <Box
            component="form"
            onSubmit={handleSubmit}
            className="flex flex-col items-center justify-center"
            autoComplete="off"
          >
            <CardHeader>
              <CardTitle className="text-3xl text-black">
                Iniciar Sesión
              </CardTitle>
              <CardDescription>
                Ingrese su DNI y contraseña para iniciar sesión
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <TextField
                id="outlined-basic"
                label="DNI"
                variant="outlined"
                name="dni"
                sx={{
                  width: '300px',
                  marginTop: '20px',
                }}
              />
              <FormControl
                variant="outlined"
                sx={{
                  marginTop: '20px',
                }}
              >
                <InputLabel htmlFor="outlined-adornment-password">
                  Contraseña
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        onMouseUp={handleMouseUpPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Contraseña"
                  sx={{
                    width: '300px',
                  }}
                />
              </FormControl>
              {error ? (
                <p className="text-red-500 h-8 mt-3 font-normal text-sm self-start">
                  {error}
                </p>
              ) : (
                <p className="h-11"></p>
              )}

              <button
                disabled={isLoading}
                className={`w-full font-semibold px-4 py-2 mt-3 rounded-md hover:opacity-80 bg-[#FF0A02] text-white ${
                  isLoading ? 'opacity-80' : 'opacity-100'
                }`}
              >
                {isLoading ? (
                  <Loader2 className="h-6 w-6 animate-spin mx-auto" />
                ) : (
                  'Iniciar Sesión'
                )}
              </button>
            </CardContent>
          </Box>
          {/* Derecha - Imagen */}
          <img
            src="fb.jpg"
            alt="motorock-logo"
            className="rounded-r-md w-[400px] h-[400px] hidden md:block"
          />
        </Card>
      </section>
    </>
  );
}

export default LoginPage;

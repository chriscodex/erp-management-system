'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

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

function LoginPage() {
  const router = useRouter();

  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    if (!formData.get('dni')) {
      return setError('Ingrese su DNI');
    }

    if (!formData.get('password')) {
      return setError('Ingrese su contraseña');
    }

    const res = await signIn('credentials', {
      dni: formData.get('dni'),
      password: formData.get('password'),
      redirect: false,
    });

    console.log(res);

    if (res?.error) return setError(res.error);

    if (res?.ok) return router.push('/dashboard');

    console.log(res);
  };

  return (
    <>
      <section className="h-screen w-full text-black flex justify-center items-center">
        <div className="h-[400px] w-[800px] max-w-7xl grid grid-cols-2 gap-4 bg-gray-100 shadow-xl rounded-md">
          {/* Izquierda */}
          <Box
            component="form"
            onSubmit={handleSubmit}
            className="flex flex-col items-center justify-center"
            autoComplete="off"
          >
            <h1 className="text-3xl self-start pl-12 font-normal">Iniciar Sesión</h1>
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

            {error ? <p className="text-red-500 h-8 pl-4 mt-3 font-normal">{error}</p> : <p className='h-11'></p>}

            <button className="w-[222px] bg-[#FF0A02] text-white font-semibold px-4 py-2 mt-3 rounded-md">
              Iniciar Sesión
            </button>
          </Box>
          {/* Derecha */}
          <div className="w-full pr-4 flex justify-center items-center">
            <img src="fb.jpg" alt="motorock-logo" className="rounded-lg w-[400px]"></img>
          </div>
        </div>
      </section>
    </>
  );
}

export default LoginPage;

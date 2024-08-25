'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

function LoginPage() {
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

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
      <section className="h-screen w-full text-white">
        <div className="h-screen w-full max-w-7xl grid grid-cols-2 gap-4">
          {/* Izquierda */}
          <form onSubmit={handleSubmit} className="flex flex-col">
            {error && <p className="text-red-500">{error}</p>}

            <h1 className="text-3xl">Iniciar Sesión</h1>

            <input type="text" placeholder='DNI' name='dni' className="bg-white px-4 py-2 block"/>

            <input type="password" placeholder='Contraseña' name='password' className="bg-white mt-3 px-4 py-2 block"/>

            <button className='bg-blue-400 px-4 py-2 mt-3'>Iniciar Sesión</button>
          </form>
          {/* Derecha */}
          <div className="py-4 pr-4 flex justify-center items-center">
            <img src="fb.jpg" className="rounded-lg"></img>
          </div>
        </div>
      </section>
    </>
  );
}

export default LoginPage;

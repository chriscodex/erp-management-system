export const userMockData = [
  {
    nombres: 'Christian Gonzalo',
    apellidos: 'Espinoza Cadillo',
    dni: '74062106',
    celular: '931140269',
    direccion: 'Jr. 9 de diciembre 686 Carhuaz Carhuaz',
    rol: 'Administrador',
    password: '123',
    estado: 'activo',
  },
  {
    nombres: 'Josue Israel',
    apellidos: 'Rubina Villareal',
    dni: '44362644',
    celular: '931140270',
    direccion: 'Av. Las Flores 364 Independencia Huaraz',
    rol: 'Administrador',
    password: '123',
    estado: 'inactivo',
  },
  {
    nombres: 'Juan Carlos',
    apellidos: 'Perez Lopez',
    dni: '51456232',
    celular: '931140270',
    direccion: 'Av. Los Próceres 123 Breña Lima',
    rol: 'Tecnico',
    password: '123',
    estado: 'activo',
  },
  {
    nombres: 'Maria Elena',
    apellidos: 'Gomez Torres',
    dni: '33148475',
    celular: '931140271',
    direccion: 'Calle Las Flores 456 Surco Lima',
    rol: 'Vendedor',
    password: '123',
    estado: 'inactivo',
  },
  {
    nombres: 'Eduardo Israel',
    apellidos: 'Herrera Figueroa',
    dni: '25256247',
    celular: '951625325',
    direccion: 'Jr. Calle Victoria 123',
    rol: 'Vendedor',
    password: '123',
    estado: 'activo',
  },
  {
    nombres: 'Carlos Alberto',
    apellidos: 'Lopez Sánchez',
    dni: '36214789',
    celular: '987654321',
    direccion: 'Av. Primavera 456',
    rol: 'Administrador',
    password: 'abc123',
    estado: 'activo',
  },
  {
    nombres: 'Lucía María',
    apellidos: 'Gómez Pérez',
    dni: '45123678',
    celular: '964123789',
    direccion: 'Calle Las Flores 789',
    rol: 'Vendedor',
    password: 'pass456',
    estado: 'inactivo',
  },
  {
    nombres: 'José Manuel',
    apellidos: 'Ramírez Díaz',
    dni: '51247896',
    celular: '951478632',
    direccion: 'Jr. Los Pinos 321',
    rol: 'Vendedor',
    password: 'xyz789',
    estado: 'activo',
  },
  {
    nombres: 'María Fernanda',
    apellidos: 'Castro Rojas',
    dni: '37451289',
    celular: '912345678',
    direccion: 'Av. La Marina 852',
    rol: 'Supervisor',
    password: 'super123',
    estado: 'activo',
  },
  {
    nombres: 'Andrés Felipe',
    apellidos: 'Torres Ruiz',
    dni: '48123657',
    celular: '932147856',
    direccion: 'Calle Las Palmeras 102',
    rol: 'Vendedor',
    password: 'secure789',
    estado: 'inactivo',
  },
  {
    nombres: 'Sofía Andrea',
    apellidos: 'Martínez Valdez',
    dni: '32147895',
    celular: '984563217',
    direccion: 'Av. El Sol 654',
    rol: 'Vendedor',
    password: 'sofia123',
    estado: 'activo',
  },
  {
    nombres: 'Juan Carlos',
    apellidos: 'Paredes Flores',
    dni: '48956231',
    celular: '956874123',
    direccion: 'Jr. San Martín 124',
    rol: 'Administrador',
    password: 'admin321',
    estado: 'activo',
  },
  {
    nombres: 'Elena Patricia',
    apellidos: 'López Quispe',
    dni: '57481236',
    celular: '945612378',
    direccion: 'Av. La Paz 978',
    rol: 'Vendedor',
    password: 'patri456',
    estado: 'inactivo',
  },
  {
    nombres: 'Ricardo José',
    apellidos: 'García Huerta',
    dni: '41257896',
    celular: '964213785',
    direccion: 'Calle Los Jazmines 209',
    rol: 'Supervisor',
    password: 'ricardo789',
    estado: 'activo',
  },
  {
    nombres: 'Ana Belén',
    apellidos: 'Ortega Romero',
    dni: '35891476',
    celular: '987124563',
    direccion: 'Jr. Los Almendros 304',
    rol: 'Vendedor',
    password: 'ana456',
    estado: 'inactivo',
  },
];

export const searchedUsersDataMock = [
  {
    dni: '74062106',
    apellidos: 'Espinoza Cadillo',
    nombres: 'Christian Gonzalo',
  },
];

export const segmentDataMock = [
  {
    nombre: 'Motos',
  },
  {
    nombre: 'Productos',
  },
];

export const categoryDataMock = [
  {
    nombre: 'Aventura',
    descripcion: 'Motos de aventura',
    estado: 'activo',
    segmentId: '',
  },
  {
    nombre: 'Deportiva',
    descripcion: 'Para velocidad y maniobrabilidad en carreteras y circuitos.',
    estado: 'activo',
    segmentId: '',
  },
  {
    nombre: 'Aceites',
    descripcion: 'Aceites para moto.',
    estado: 'activo',
    segmentId: '',
  },
  {
    nombre: 'Montañera',
    descripcion: 'Preparadas para terrenos difíciles y off-road.',
    estado: 'inactivo',
    segmentId: '',
  },
  {
    nombre: 'Custom',
    descripcion: 'Personalizadas para estilo único, enfocadas en el diseño.',
    estado: 'activo',
    segmentId: '',
  },
  {
    nombre: 'Cascos',
    descripcion: 'Cascos para moto.',
    estado: 'activo',
    segmentId: '',
  },
];

export const marcaDataMock = [
  {
    nombre: 'Honda',
    descripcion: 'Motos de aventura',
    estado: 'activo',
    segmentId: '',
  },
  {
    nombre: 'Harley-Davidson',
    descripcion:
      'Marca icónica estadounidense conocida por sus motocicletas de estilo crucero, caracterizadas por su potencia y sonido distintivo.',
    estado: 'activo',
    segmentId: '',
  },
  {
    nombre: 'Castrol',
    descripcion:
      'Marca líder en aceites y lubricantes para motores de motocicletas.',
    estado: 'activo',
    segmentId: '',
  },
  {
    nombre: 'Liqui Moly',
    descripcion:
      'Marca alemana de lubricantes, aditivos y productos de mantenimiento.',
    estado: 'inactivo',
    segmentId: '',
  },
  {
    nombre: 'Yamaha',
    descripcion:
      'Marca japonesa que abarca una amplia gama de motocicletas, desde modelos deportivos y de aventura hasta scooters y cruceros.',
    estado: 'activo',
    segmentId: '',
  },
  {
    nombre: 'Kawasaki',
    descripcion:
      'Conocida por sus motocicletas deportivas de alto rendimiento, especialmente la serie Ninja.',
    estado: 'inactivo',
    segmentId: '',
  },
  {
    nombre: 'Ducati',
    descripcion:
      'Marca italiana reconocida por su estilo distintivo y rendimiento deportivo, especialmente en motocicletas de carretera y competición.',
    estado: 'activo',
    segmentId: '',
  },
  {
    nombre: 'Motul',
    descripcion:
      'Conocida por su amplia gama de aceites y lubricantes de alta calidad, especialmente formulados para motocicletas.',
    estado: 'activo',
    segmentId: '',
  },
  {
    nombre: 'NGK',
    descripcion:
      'Marca japonesa especializada en bujías de alto rendimiento para motocicletas y otros vehículos. ',
    estado: 'inactivo',
    segmentId: '',
  },
  {
    nombre: 'BMW Motorrad',
    descripcion:
      'División de motocicletas de BMW, que fabrica modelos de turismo, aventura y deportivos.',
    estado: 'activo',
    segmentId: '',
  },
  {
    nombre: 'K&N',
    descripcion:
      'Fabricante estadounidense conocido por sus filtros de aire y filtros de aceite de alto rendimiento.',
    estado: 'activo',
    segmentId: '',
  },
];

export const empresaDataMock = [
  {
    nombre: 'MotoRock Ruta 33',
    ruc: '12345678921',
    descripcion: 'Sucursal principal',
    direccion: 'Jr. Los Almendros 123',
    telefono: '963852741',
    email: 'motorock@gmail.com',
  },
  {
    nombre: 'MotoRock Store',
    ruc: '20428729201 ',
    descripcion: 'Empresa secundaria',
    direccion: 'Jr. Los Almendros 123',
    telefono: '963852741',
    email: 'motorock@gmail.com',
  },
];

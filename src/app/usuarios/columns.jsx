'use client';

export const columns = [
  {
    accessorKey: 'dni',
    header: 'Status',
    header: () => <div className="text-right">DNI</div>,
    cell: ({ row }) => {
      const digits = row.getValue('dni');
      const formattedNumber = digits.replace(/\D/g, '');
      const formated = formattedNumber.substring(0, 8)

      return (
        <div className="text-right font-medium">
          {formated}
        </div>
      );
    },
  },
  {
    accessorKey: 'nombres',
    header: 'Nombres',
  },
  {
    accessorKey: 'apellidos',
    header: 'Apellidos',
  },
  {
    accessorKey: 'celular',
    header: 'Celular',
  },
];

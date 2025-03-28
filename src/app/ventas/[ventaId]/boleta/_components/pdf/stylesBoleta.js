export const stylesBoleta = {
  header: {
    fontSize: 12,
    marginBottom: 20,
    flexDirection: 'row', // ✅ Usa flexbox en lugar de grid
    justifyContent: 'space-between', // ✅ Distribuye los elementos en la fila
    alignItems: 'center', // ✅ Alinea verticalmente
    padding: 10,
  },
  image: {
    marginTop: 12,
    width: '25%',
  },
  container: {
    width: '100%',
    height: 'auto',
  },
  datosCliente: {
    marginLeft: '20px',
    marginRight: '20px',
    marginTop: '5px',
    marginBottom: '5px',
    gap: '5px',
  },
  boletaTitle: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginTop: 10,
    marginLeft: 20,
    marginBottom: 10,
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
  },
  fechaEmision: {
    fontSize: 14,
    marginLeft: '20px',
    marginRight: '20px',
    marginBottom: '5px',
  },
  table: {
    width: '93%',
    border: '1px solid black',
    marginLeft: 20,
    marginRight: '20px',
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableCellHeader: {
    backgroundColor: '#ddd',
    padding: 5,
    fontSize: 10,
    fontWeight: 'bold',
    flex: 1,
    borderRight: '1px solid black',
    textAlign: 'center',
  },
  tableCell: {
    padding: 5,
    fontSize: 10,
    flex: 1,
    borderRight: '1px solid black',
    textAlign: 'center',
  },
  totalRow: {
    marginTop: 5,
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'right',
    marginRight: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: 10,
  },
};

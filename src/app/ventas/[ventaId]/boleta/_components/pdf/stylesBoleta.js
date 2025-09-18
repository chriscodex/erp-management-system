/* Estilos Boleta de Ventas */

export const stylesBoleta = {
  header: {
    fontSize: 12,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
  },
  image: {
    padding: 10,
    backgroundColor: '#000',
    width: '35%',
  },
  title: {
    marginVertical: 10,
    fontSize: 28,
    marginLeft: 10,
    color: '#000',
  },
  body: {
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 15,
    fontSize: 12,
  },
  datosEmpresa: {
    marginTop: '5px',
    marginBottom: '5px',
  },
  datosEmpresaTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: '5px',
  },

  datosEmpresaContacto: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 5,
  },

  datosBoletaContainer: {
    flexDirection: 'column',
    marginTop: '10px',
  },
  datosBoleta: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  datosBoletaBold: {
    fontWeight: 'bold',
  },

  separator: {
    width: '100%',
    height: 1,
    backgroundColor: 'gray',
    marginVertical: 10,
    alignSelf: 'center',
  },

  qrContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: 10,
    marginBottom: 10,
    width: '100%',
    gap: 10,
  },
  qrMessage: {
    backgroundColor: '#f5f5f5',
    border: '1px solid #ccc',
    fontSize: 10,
    padding: 6,
    flex: 1,
    color: '#222',
    marginRight: 8,
  },
  qrImage: {
    width: 80,
    height: 80,
    marginRight: 10,
  },

  datosCliente: {
    fontSize: 12,
    marginTop: '5px',
    marginBottom: '5px',
    gap: '5px',
  },
  datosClienteName: {
    marginBottom: '5px',
  },
  datosClienteTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  datosClienteInfo: {
    flexDirection: 'row',
  },
  datosClienteInfoTitle: {
    fontWeight: 'bold',
  },

  boletaTitleContainer: {
    width: '100%',
    height: 'auto',
  },
  boletaTitle: {
    fontSize: '14px',
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
  },

  table: {
    width: '100%',
    border: '1px solid black',
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
    fontSize: 10,
    fontWeight: 'bold',
    textAlign: 'right',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: 4,
  },
};

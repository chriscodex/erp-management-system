export const stylesFactura = {
  header: {
    backgroundColor: "#000",
    fontSize: 12,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-end",
    padding: 10,
  },
  image: {
    //   marginTop: 12,
    width: "35%",
  },
  title: {
    fontSize: 36,
    marginLeft: 10,
    color: "#fff",
  },
  body: {
    padding: 35,
    fontSize: 14,
  },
  datosEmpresa: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginTop: "5px",
    marginBottom: "5px",
    gap: "5px",
  },
  datosEmpresaTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: "5px",
  },

  datosEmpresaContacto: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginBottom: 5,
  },

  datosFactura:{
    flexDirection: "row",
    marginBottom: 5,
  },

  separator: {
    width: "100%", 
    height: 1,             
    backgroundColor: "gray", 
    marginVertical: 10,   
    alignSelf: "center",   
  },

  datosFacturaBold:{
    fontWeight: "bold",
  },

  datosCliente: {
    fontSize: 14,
    marginTop: '5px',
    marginBottom: '5px',
    gap: '5px',
  },
  datosClienteName: {
    marginBottom: '5px',
  },
  datosClienteTitle:{
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  datosClienteInfo:{
    flexDirection: 'row',
  },
  datosClienteInfoTitle:{
    fontWeight: 'bold',
  },
  facturaTitleContainer: {
    width: "100%",
    height: "auto",
  },

  facturaTitle: {
    fontSize: "24px",
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 10,
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
  },

  table: {
    width: "100%",
    border: "1px solid black",

  },
  tableRow: {
    flexDirection: "row",
  },
  tableCellHeader: {
    backgroundColor: "#ddd",
    padding: 5,
    fontSize: 10,
    fontWeight: "bold",
    flex: 1,
    borderRight: "1px solid black",
    textAlign: "center",
  },
  tableCell: {
    padding: 5,
    fontSize: 10,
    flex: 1,
    borderRight: "1px solid black",
    textAlign: "center",
  },
  totalRow: {
    marginTop: 5,
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "right",
    marginRight: 20,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: 10,
  },
};

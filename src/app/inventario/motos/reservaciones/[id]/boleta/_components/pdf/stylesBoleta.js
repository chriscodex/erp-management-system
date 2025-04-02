

export const stylesBoleta = {
    page:{
      fontSize: 14,
      padding: 35,
    },
    header: {
      fontSize: 12,
      flexDirection: 'column', // ✅ Usa flexbox en lugar de grid
      justifyContent: 'space-between', // ✅ Distribuye los elementos en la fila
      alignItems: 'center', // ✅ Alinea verticalmente
      padding: 10,
    },
    image: {
      marginVertical: 15,
      width: '35%',
    },
    headerMotorock:{
      fontSize: 16,
      fontWeight: 'bold',
    },
    headerInfo:{
      marginTop: 30,
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
    },
    headerInfoText:{
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight:20,
      marginBottom: 5,
    },
    separator: {
      width: "95%", 
      height: 1,             
      backgroundColor: "gray", 
      marginVertical: 15,   
      alignSelf: "center",   
    },
   
    reservacionContainer:{
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginVertical: 20,
    }, 
    reservacion:{
      fontSize: 14,
      marginRight: '20px',
      marginTop: '5px',
      marginBottom: '5px',
      gap: '5px',
    },
    reservacionHeading:{
      fontSize: 24,
      fontWeight: 'bold',
    },
    reservacionTitle:{
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 5,
    },
    reservacionInfo:{
      flexDirection: 'row',
    },
    reservacionInfoTitle:{
      fontWeight: 'bold',
      marginRight: 5,
    },



    datosCliente: {
      fontSize: 14,
      marginRight: '20px',
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

    container: {
      width: '100%',
      height: 'auto',
    },
    boletaTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      marginTop: 10,
      marginBottom: 10,
      display: 'flex',
      flexDirection: 'row',
      width: '100%',
      justifyContent: 'center',
    },
    reservacionDate: {
      flexDirection: 'row',
    },
    reservacionDateTitle: {
      fontWeight: 'bold',
      marginBottom: 30,
    },


    table: {
      width: '100%',
      border: '1px solid black',
      marginBottom: 30,
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

    AdditionalInfoTitle:{
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 5,
    }
  };
  
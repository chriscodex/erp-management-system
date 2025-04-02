'use client';

import {
  Document,
  Text,
  Page,
  StyleSheet,
  View,
  Image,
} from '@react-pdf/renderer';

import { stylesBoleta } from '@/app/ventas/[ventaId]/boleta/_components/pdf/stylesBoleta.js';
import {
  formatDateLong,
  formatearCodigoCounterBoletaFactura,
} from '@/lib/formateador';

const styles = StyleSheet.create(stylesBoleta);

export function PdfBoleta({ ventaData, counterBoleta, selectedEmpresa }) {
  const currentTime = formatDateLong(new Date().toISOString());
  
  const codigoBoleta = formatearCodigoCounterBoletaFactura(counterBoleta);

  console.log('selectedEmpresa', selectedEmpresa);
  const empresa = selectedEmpresa || {
    nombre: 'Moto Rock Ruta 33 E.I.R.L',
    direccion: 'Av. Las Flores N° 364 Bar. Nicrupampa',
    telefono: '043-607336',
    email: 'gerencia@motorock33.com',
  };
  return (
    <Document>
      <Page size="A4">
        <View style={styles?.header}>
          <Image src={'/logoB.jpeg'} style={styles.image} />
          <View>
            <Text>{empresa?.nombre}</Text>
            <Text>{empresa?.direccion}</Text>
            <Text>Teléfono: {empresa?.telefono}</Text>
            <Text>Email: {empresa?.email}</Text>
          </View>
          <View>
            <Text>RUC N° {empresa?.ruc}</Text>
            <Text>Boleta de Venta Electrónica</Text>
            <Text>Boleta N° {codigoBoleta}</Text>
          </View>
        </View>
        <View style={styles.datosCliente}>
          <Text>
            {ventaData?.cliente?.tipo === 'empresa'
              ? `Razón Social: ${ventaData?.cliente?.datos?.razonSocial}`
              : `Apellidos y Nombres: ${ventaData?.cliente?.datos?.apellidos} ${ventaData?.cliente?.datos?.nombres}`}
          </Text>
          <Text>
            {ventaData?.cliente?.tipo === 'empresa'
              ? `RUC: ${ventaData?.cliente?.datos?.ruc}`
              : `DNI: ${ventaData?.cliente?.datos?.dni}`}
          </Text>
        </View>
        <View style={styles.container}>
          <Text style={styles.boletaTitle}>Boleta N° {codigoBoleta}</Text>
          <Text style={styles.fechaEmision}>Fecha Emisión: {currentTime}</Text>
        </View>
        {/* Tabla */}
        <View style={styles.table}>
          {/* Encabezados */}
          <View style={styles.tableRow}>
            <Text style={styles.tableCellHeader}>Descripción</Text>
            <Text style={styles.tableCellHeader}>Precio Venta</Text>
            <Text style={styles.tableCellHeader}>Cantidad</Text>
            <Text style={styles.tableCellHeader}>Importe</Text>
          </View>
          {/* Filas de productos */}
          {ventaData?.productos?.map((item) => (
            <View key={item._id} style={styles.tableRow}>
              <Text style={styles.tableCell}>{item?.nombre}</Text>
              <Text style={styles.tableCell}>
                {item?.precioVenta?.toFixed(2)}
              </Text>
              <Text style={styles.tableCell}>{item?.cantidad}</Text>
              <Text style={styles.tableCell}>
                {(item?.precioVenta * item?.cantidad)?.toFixed(2)}
              </Text>
            </View>
          ))}
        </View>
        <View style={styles.totalRow}>
          <Text style={styles.totalCell}>Total: </Text>
          <Text style={styles.totalCell}>
            {ventaData?.productos
              .reduce(
                (acc, producto) =>
                  acc + producto?.precioVenta * producto?.cantidad,
                0
              )
              .toFixed(2)}
          </Text>
        </View>
      </Page>
    </Document>
  );
}

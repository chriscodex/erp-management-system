'use client';

import {
  Document,
  Text,
  Page,
  StyleSheet,
  View,
  Image,
  Svg,
  Path,
} from '@react-pdf/renderer';

import { stylesFactura } from '@/app/taller/ordenes-servicio/[id]/factura/_components/pdf/stylesFactura.js';
import {
  formatDateLong,
  formatNumeroALetras,
  formatearCodigoCounterBoletaFactura,
} from '@/lib/formateador';

const styles = StyleSheet.create(stylesFactura);

export function PdfFactura({
  ordenDeServicioData,
  counterFactura,
  empresaSeleccionada,
  qrBase64,
  clienteRuc,
}) {
  const fechaEmisionComprobante = formatDateLong(
    new Date(ordenDeServicioData?.fechaEmisionComprobante).toISOString(),
    true
  );

  const codigoFactura = formatearCodigoCounterBoletaFactura(
    counterFactura,
    'factura'
  );

  const MapPin = () => (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      width="12"
      height="12"
    >
      <Path d="M12 20.8995L16.9497 15.9497C19.6834 13.2161 19.6834 8.78392 16.9497 6.05025C14.2161 3.31658 9.78392 3.31658 7.05025 6.05025C4.31658 8.78392 4.31658 13.2161 7.05025 15.9497L12 20.8995ZM12 23.7279L5.63604 17.364C2.12132 13.8492 2.12132 8.15076 5.63604 4.63604C9.15076 1.12132 14.8492 1.12132 18.364 4.63604C21.8787 8.15076 21.8787 13.8492 18.364 17.364L12 23.7279ZM12 13C13.1046 13 14 12.1046 14 11C14 9.89543 13.1046 9 12 9C10.8954 9 10 9.89543 10 11C10 12.1046 10.8954 13 12 13ZM12 15C9.79086 15 8 13.2091 8 11C8 8.79086 9.79086 7 12 7C14.2091 7 16 8.79086 16 11C16 13.2091 14.2091 15 12 15Z"></Path>
    </Svg>
  );
  const Phone = () => (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      width="12"
      height="12"
    >
      <Path d="M9.36556 10.6821C10.302 12.3288 11.6712 13.698 13.3179 14.6344L14.2024 13.3961C14.4965 12.9845 15.0516 12.8573 15.4956 13.0998C16.9024 13.8683 18.4571 14.3353 20.0789 14.4637C20.599 14.5049 21 14.9389 21 15.4606V19.9234C21 20.4361 20.6122 20.8657 20.1022 20.9181C19.5723 20.9726 19.0377 21 18.5 21C9.93959 21 3 14.0604 3 5.5C3 4.96227 3.02742 4.42771 3.08189 3.89776C3.1343 3.38775 3.56394 3 4.07665 3H8.53942C9.0611 3 9.49513 3.40104 9.5363 3.92109C9.66467 5.54288 10.1317 7.09764 10.9002 8.50444C11.1427 8.9484 11.0155 9.50354 10.6039 9.79757L9.36556 10.6821ZM6.84425 10.0252L8.7442 8.66809C8.20547 7.50514 7.83628 6.27183 7.64727 5H5.00907C5.00303 5.16632 5 5.333 5 5.5C5 12.9558 11.0442 19 18.5 19C18.667 19 18.8337 18.997 19 18.9909V16.3527C17.7282 16.1637 16.4949 15.7945 15.3319 15.2558L13.9748 17.1558C13.4258 16.9425 12.8956 16.6915 12.3874 16.4061L12.3293 16.373C10.3697 15.2587 8.74134 13.6303 7.627 11.6707L7.59394 11.6126C7.30849 11.1044 7.05754 10.5742 6.84425 10.0252Z"></Path>
    </Svg>
  );
  const Mail = () => (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      width="12"
      height="12"
    >
      <Path d="M3 3H21C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3ZM20 7.23792L12.0718 14.338L4 7.21594V19H20V7.23792ZM4.51146 5L12.0619 11.662L19.501 5H4.51146Z"></Path>
    </Svg>
  );

  return (
    <Document>
      <Page size="A4">
        <View style={styles.header}>
          <Image src={'/logoB.jpeg'} style={styles.image} alt="logo" />
          <Text style={styles.title}>Factura electrónica</Text>
        </View>
        <View style={styles.body}>
          <View style={styles.datosEmpresa}>
            <View>
              <Text style={styles.datosEmpresaTitle}>
                {empresaSeleccionada?.nombre || 'Moto Rock Ruta 33 E.I.R.L'}
              </Text>
              <Text style={styles.datosEmpresaTitle}>
                RUC N° {empresaSeleccionada?.ruc || '20202020202'}
              </Text>
              <View style={styles.datosEmpresaContacto}>
                <MapPin />
                <Text>
                  {empresaSeleccionada?.direccion ||
                    'Av. Las Flores N° 364 Bar. Nicrupampa - Huaraz'}
                </Text>
              </View>

              <View style={styles.datosEmpresaContacto}>
                <Phone />
                <Text>{empresaSeleccionada?.telefono || '01-442-1210'}</Text>
              </View>

              <View style={styles.datosEmpresaContacto}>
                <Mail />
                <Text>
                  {empresaSeleccionada?.email || 'gerencia@motorock33.com'}
                </Text>
              </View>
            </View>

            <View style={styles.datosFacturaContainer}>
              <View style={styles.datosFactura}>
                <Text style={styles.datosFacturaBold}>Factura N°</Text>
                <Text> {codigoFactura}</Text>
              </View>
              <View style={styles.datosFactura}>
                <Text style={styles.datosFacturaBold}>Fecha de emisión: </Text>
                <Text>{fechaEmisionComprobante}</Text>
              </View>
            </View>
          </View>

          <View style={styles.separator} />

          <View style={styles.datosCliente}>
            <Text style={styles.datosClienteTitle}>Datos del cliente</Text>
            <Text style={styles.datosClienteName}>
              {ordenDeServicioData?.cliente?.tipo === 'empresa'
                ? ordenDeServicioData?.cliente?.datos?.nombre
                : `${ordenDeServicioData?.cliente?.datos?.apellidos} ${ordenDeServicioData?.cliente?.datos?.nombres}`}
            </Text>
            <View style={styles.datosClienteInfo}>
              <Text style={styles.datosClienteInfoTitle}>RUC:</Text>
              <Text>{clienteRuc}</Text>
            </View>
            {ordenDeServicioData?.cliente?.tipo === 'empresa' && (
              <View style={styles.datosClienteInfo}>
                <Text style={styles.datosClienteInfoTitle}>
                  {'Representante Legal: '}
                </Text>
                <Text>
                  {ordenDeServicioData?.cliente?.datos?.representanteLegal}
                </Text>
              </View>
            )}
            {ordenDeServicioData?.cliente?.tipo === 'empresa' && (
              <View style={styles.datosClienteInfo}>
                <Text style={styles.datosClienteInfoTitle}>
                  {'Dirección: '}
                </Text>
                <Text>{ordenDeServicioData?.cliente?.datos?.direccion}</Text>
              </View>
            )}
            {ordenDeServicioData?.cliente?.datos?.email && (
              <View style={styles.datosClienteInfo}>
                <Text style={styles.datosClienteInfoTitle}>{'Email: '}</Text>
                <Text>{ordenDeServicioData?.cliente?.datos?.email}</Text>
              </View>
            )}
            {ordenDeServicioData?.cliente?.datos?.celular && (
              <View style={styles.datosClienteInfo}>
                <Text style={styles.datosClienteInfoTitle}>{'Celular: '}</Text>
                <Text>{ordenDeServicioData?.cliente?.datos?.celular}</Text>
              </View>
            )}
          </View>

          <View style={styles.facturaTitleContainer}>
            <Text style={styles.facturaTitle}>Factura</Text>
          </View>
          {/* Tabla */}
          <View style={styles.table}>
            {/* Encabezados */}
            <View style={styles.tableRow}>
              <Text style={styles.tableCellHeader}>Descripción</Text>
              <Text style={styles.tableCellHeader}>Precio</Text>
              <Text style={styles.tableCellHeader}>Cantidad</Text>
              <Text style={styles.tableCellHeader}>Importe</Text>
            </View>
            {/* Filas de productos */}
            {ordenDeServicioData?.productos?.map((item) => (
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
            {ordenDeServicioData?.servicios?.map((item) => (
              <View key={`servicio-${item._id}`} style={styles.tableRow}>
                <Text style={styles.tableCell}>{item?.descripcion}</Text>
                <Text style={styles.tableCell}>{item?.precio?.toFixed(2)}</Text>
                <Text style={styles.tableCell}>{1}</Text>
                <Text style={styles.tableCell}>
                  {(item?.precio * 1)?.toFixed(2)}
                </Text>
              </View>
            ))}
          </View>
          {/* Totales */}
          <View style={styles.totalRow}>
            <Text style={styles.totalCell}>Op. Gravada: S/.</Text>
            <Text>
              {(
                0.82 *
                ordenDeServicioData?.productos
                  .concat(ordenDeServicioData?.servicios || [])
                  .reduce(
                    (acc, item) =>
                      acc + (item?.precioVenta || item?.precio) * 1,
                    0
                  )
              ).toFixed(2)}
            </Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={styles.totalCell}>I.G.V.: S/.</Text>
            <Text>
              {(
                0.18 *
                ordenDeServicioData?.productos
                  .concat(ordenDeServicioData?.servicios || [])
                  .reduce(
                    (acc, item) =>
                      acc + (item?.precioVenta || item?.precio) * 1,
                    0
                  )
              ).toFixed(2)}
            </Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={styles.totalCell}>Importe Total: S/.</Text>
            <Text style={styles.totalCell}>
              {ordenDeServicioData?.productos
                .concat(ordenDeServicioData?.servicios || [])
                .reduce(
                  (acc, item) => acc + (item?.precioVenta || item?.precio) * 1,
                  0
                )
                .toFixed(2)}
            </Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={styles.totalCell}>Importe a Pagar: S/.</Text>
            <Text style={styles.totalCell}>
              {ordenDeServicioData?.productos
                .concat(ordenDeServicioData?.servicios || [])
                .reduce(
                  (acc, item) => acc + (item?.precioVenta || item?.precio) * 1,
                  0
                )
                .toFixed(2)}
            </Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={styles.totalCell}>
              {formatNumeroALetras(
                ordenDeServicioData?.productos
                  .concat(ordenDeServicioData?.servicios || [])
                  .reduce(
                    (acc, item) =>
                      acc + (item?.precioVenta || item?.precio) * 1,
                    0
                  )
                  .toFixed(2)
              )}
            </Text>
          </View>

          <View style={styles.separator} />

          {/* QR en base64 */}
          <View style={styles.qrContainer}>
            <Text style={styles.qrMessage}>
              Representación impresa de la FACTURA DE VENTA ELECTRÓNICA. El
              usuario puede consultar su validez en SUNAT Virtual:
              www.sunat.gob.pe en Operaciones sin Clave SOL / Consulta validez
              del CPE
            </Text>
            {qrBase64 && (
              <Image
                src={qrBase64}
                style={styles.qrImage}
                alt="QR de factura"
              />
            )}
          </View>
        </View>
      </Page>
    </Document>
  );
}

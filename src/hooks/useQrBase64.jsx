import { useState, useEffect } from 'react';
import QRCode from 'qrcode';

export function useQrBase64(
  empresaData,
  ventaData,
  ventaSerie,
  ventaCorrelativo,
  options = { width: 80 }
) {
  const [qrBase64, setQrBase64] = useState(null);

  const rucEmpresa = empresaData?.ruc;
  const tipoDocumento = '03';
  const serie = ventaSerie;
  const correlativo = ventaCorrelativo;

  console.log(ventaData);

  const value =
    rucEmpresa +
    '|' +
    tipoDocumento +
    '|' +
    serie +
    '|' +
    correlativo +
    '|' +
    ventaData?.impuesto +
    '|' +
    ventaData?.total +
    '|' +
    ventaData?.fecha +
    '|' +
    ventaData?.tipoDocumento +
    '|' +
    ventaData?.documento;

  // 10740621063|03|B001|1|18.0|236.00|2021-01-27|6|20000002|
  // RUC Empresa|03|Serie|Correlativo|Impuesto|Total|Fecha|Tipo de Documento|Nro de Documento|

  useEffect(() => {
    if (!value) {
      setQrBase64(null);
      return;
    }
    let isCancelled = false;
    QRCode.toDataURL(value, options)
      .then((url) => {
        if (!isCancelled) setQrBase64(url);
      })
      .catch((err) => {
        console.error(err);
        if (!isCancelled) setQrBase64(null);
      });
    return () => {
      isCancelled = true;
    };
  }, [value, JSON.stringify(options)]);

  return qrBase64;
}

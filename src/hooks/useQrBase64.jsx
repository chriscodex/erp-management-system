import { useState, useEffect } from "react";
import QRCode from "qrcode";

export function useQrBase64(value, options = { width: 80 }) {
  const [qrBase64, setQrBase64] = useState(null);

  useEffect(() => {
    if (!value) {
      setQrBase64(null);
      return;
    }
    let isCancelled = false;
    QRCode.toDataURL(value, options)
      .then(url => {
         if (!isCancelled) setQrBase64(url);
      })
      .catch(err => {
         console.error(err);
         if (!isCancelled) setQrBase64(null);
      });
    return () => { isCancelled = true };
  }, [value, JSON.stringify(options)]);

  return qrBase64;
}

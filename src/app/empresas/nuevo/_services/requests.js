import { postData } from '@/lib/fetchData';
import { createEmpresaClientUrl } from '@/lib/urls';
import { delay } from '@/lib/utils';



export async function createEmpresaRequestClient(empresa, setLoading) {
  /* eslint-disable */
  return new Promise(async (resolve, reject) => {
    /* eslint-enable */
    try {
      setLoading(true);
      // Simular tiempo de retraso
      await delay();

      // Obtener los datos de la persona
      const response = await postData(createEmpresaClientUrl, empresa);
      
      if (response?.status !== 201) {
        setLoading(false);
        reject('No se pudo crear la empresa: ' + response.response?.data?.error);
        return;
      }

      setLoading(false);
      resolve(response?.response?.data?.payload);
    } catch (error) {
      setLoading(false);
      reject(error);
    }
  });
}

import express from 'express';
import axios from 'axios';

const app = express();
const PORT = 3050;

app.use(express.json());

// Define las rutas del gateway

//INVENTARIOS
app.get('/api/v1/service/inventarios/product/', async (req, res) => {
  try {
    const response = await axios.get('http://localhost:3000/api/inventario/producto/listAll');
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Error al conectar con el servicio 1' });
  }
});

app.post('/api/v1/service/inventarios/product/create', async (req, res) => {
    try {
        const { nombre, precio, stock } = req.body;

        const productData = {
            nombre,
            precio,
            stock
        };

        const response = await axios.post('http://localhost:3000/api/inventario/producto/create', productData);
        res.status(201).json(response.data);
      } catch (error) {
        res.status(500).json({ error: 'Error al crear el recurso' });
      }
});

// app.delete('/api/v1/service/inventarios/product/delete/:id', async (req, res) => {
//     const { id } = req.params;
//     try {
//       await axios.delete(`http://localhost:3000/api/inventario/producto/delete/${id}`);
//       res.status(204).send();
//     } catch (error) {
//       res.status(500).json({ error: 'Error al eliminar el recurso' });
//     }
//   });

app.delete('/api/v1/service/inventarios/product/delete/:id', async (req, res) => {
    const { id } = req.params;
    try {
      // Realizamos la petición DELETE al servicio de backend
      await axios.delete(`http://localhost:3000/api/inventario/producto/delete/${id}`);
      // En lugar de simplemente enviar un status 204, enviamos un 200 con mensaje
      res.status(200).json({ message: 'Producto eliminado con éxito.' });
    } catch (error) {
      console.error('Error al eliminar el producto:');
      res.status(500).json({ error: 'Error al eliminar el recurso'});
    }
});


//ORDENES

app.get('/api/v1/service/ordenes/listAll', async (req, res) => {
    try {
      const response = await axios.get('http://localhost:8080/ordenes/listAll');
      res.json(response.data);
    } catch (error) {
      res.status(500).json({ error: 'Error al conectar con el servicio 1' });
    }
  });

app.post('/api/v1/service/ordenes/create', async (req, res) => {
    try {
        const { total, fecha } = req.body;

        const ordenData = {
            total,
            fecha
        }

        const response = await axios.post('http://localhost:8080/ordenes/create', ordenData);
        res.status(201).json(response.data);
      } catch (error) {
        res.status(500).json({ error: 'Error al crear el recurso' });
      }
});

app.put('/api/v1/service/ordenes/update/:id', async (req, res) => {
    const { id } = req.params;
    const { nuevoEstatus } = req.body;
    try {
      // Asegúrate de enviar un objeto con la propiedad 'nuevoEstatus'
      const response = await axios.put(`http://localhost:8080/ordenes/update/${id}/estatus`, { nuevoEstatus });
      res.json(response.data);
    } catch (error) {
      res.status(500).json({ error: 'Error al actualizar el recurso' });
    }
});

// Inicia el servidor
app.listen(PORT, () => {
  console.log(`API Gateway corriendo en http://localhost:${PORT}`);
});

const express = require('express');
const app = express();

const invitados = {
  "Camila": { nombre: "Camila", mesa: "4", confirmado: true },
  "Javier": { nombre: "Javier", mesa: "8", confirmado: false },
  "Ana":    { nombre: "Ana",    mesa: "2", confirmado: true }
};

app.get('/api/:nombre', (req, res) => {
  const nombre = req.params.nombre;
  const invitado = invitados[nombre];
  if (invitado) {
    res.json(invitado);
  } else {
    res.status(404).json({ error: "Invitado no encontrado" });
  }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contactForm');
  const responseMsg = document.getElementById('responseMsg');

  if (!form) {
    console.error('Formulario no encontrado. Asegúrate de que el ID "contactForm" exista en el HTML.');
    return;
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    try {
      const res = await fetch('http://localhost:3333/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Error HTTP ${res.status}: ${errorText}`);
      }

      const result = await res.json();
      responseMsg.textContent = result.message;
    } catch (error) {
      console.error('Error al enviar:', error);
      responseMsg.textContent = 'Error al enviar el formulario.';
    }
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.getElementById('contact-form');

  contactForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const mensagem = document.getElementById('mensagem').value;

    try {
      const response = await fetch('http://localhost:3000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, mensagem }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert(errorData.message || 'Erro ao enviar a mensagem.');
        return;
      }

      const data = await response.json();
      alert(data.message || 'Mensagem enviada com sucesso!');

      contactForm.reset();
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
      alert('Erro interno ao enviar a mensagem. Tente novamente mais tarde.');
    }
  });
});

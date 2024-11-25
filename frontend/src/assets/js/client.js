document.addEventListener('DOMContentLoaded', () => {
    const clientForm = document.getElementById('client-form');
  
    clientForm.addEventListener('submit', async (event) => {
      event.preventDefault();
  
      const name = document.getElementById('nome').value;
      const email = document.getElementById('email').value;
      const endereco = document.getElementById('endereco').value;
      const bairro = document.getElementById('bairro').value;
      const tipoCliente = document.querySelector('input[name="tipoCliente"]:checked').value;
  
      try {
        const response = await fetch('http://localhost:3000/api/clients', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name, email, endereco, bairro, tipoCliente }),
        });
  
        if (!response.ok) {
          const errorData = await response.json();
          alert(errorData.message || 'Erro ao cadastrar o cliente.');
          return;
        }
  
        const data = await response.json();
        alert(data.message || 'Cliente cadastrado com sucesso!');
        
        clientForm.reset();
      } catch (error) {
        console.error('Erro ao cadastrar cliente:', error);
        alert('Erro interno ao cadastrar o cliente.');
      }
    });
  });
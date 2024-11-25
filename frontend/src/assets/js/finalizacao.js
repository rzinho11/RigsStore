// finalizacao.js
document.addEventListener('DOMContentLoaded', () => {
    const finalizacaoForm = document.querySelector('form');
  
    // Função para enviar o formulário de finalização de venda
    finalizacaoForm.addEventListener('submit', async (event) => {
      event.preventDefault();
  
      // Coletando os dados do formulário
      const nomeCompleto = document.getElementById('nomeCompleto').value;
      const email = document.getElementById('email').value;
      const cartao = document.getElementById('cartao').value;
      const dataValidade = document.getElementById('dataValidade').value;
      const cvv = document.getElementById('cvv').value;
      
      // Dados adicionais podem ser coletados aqui (ex: userId, totalAmount) se forem necessários
      const userId = 1;  // Isso pode ser substituído pela lógica do usuário logado
      const totalAmount = 6129.75;  // Esse valor pode ser dinâmico (do carrinho ou da venda)
  
      try {
        const response = await fetch('http://localhost:3000/api/finalizacao/finalizar', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId,
            totalAmount,
            nomeCompleto,
            email,
            cartao,
            dataValidade,
            cvv,
          }),
        });
  
        if (!response.ok) {
          const errorData = await response.json();
          alert(errorData.message || 'Erro ao finalizar a compra.');
          return;
        }
  
        const data = await response.json();
        alert(data.message || 'Compra finalizada com sucesso!');
        
        // Redireciona o usuário para o dashboard ou para uma página de sucesso
        window.location.href = 'dashboard.html';  // Substitua com o caminho desejado após a finalização
  
      } catch (error) {
        console.error('Erro ao enviar os dados de finalização:', error);
        alert('Erro interno ao finalizar a compra. Tente novamente mais tarde.');
      }
    });
  });  
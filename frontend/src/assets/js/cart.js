document.addEventListener('DOMContentLoaded', () => {
    const cartContainer = document.getElementById('cart-container');
    const addItemForm = document.getElementById('add-item-form');
  
    const authToken = localStorage.getItem('authToken'); // Supondo que o token JWT seja armazenado aqui
  
    // Função para carregar os itens do carrinho
    async function loadCart() {
      try {
        const response = await fetch('http://localhost:3000/api/cart', {
          headers: {
            Authorization: `Bearer ${authToken}`, // Envia o token para autenticação
          },
        });
  
        if (!response.ok) {
          const errorData = await response.json();
          alert(errorData.message || 'Erro ao carregar o carrinho');
          return;
        }
  
        const cartItems = await response.json();
  
        // Renderizar itens do carrinho no frontend
        cartContainer.innerHTML = '';
        cartItems.forEach((item) => {
          const cartRow = document.createElement('div');
          cartRow.classList.add('cart-row');
          cartRow.innerHTML = `
            <span>${item.Product.name}</span>
            <span>Quantidade: ${item.quantity}</span>
            <span>Preço: R$${item.Product.price}</span>
            <button onclick="removeFromCart(${item.productId})">Remover</button>
            <button onclick="updateQuantity(${item.productId}, prompt('Digite a nova quantidade:'))">Atualizar</button>
          `;
          cartContainer.appendChild(cartRow);
        });
      } catch (error) {
        console.error('Erro ao carregar carrinho:', error);
        alert('Erro interno ao carregar o carrinho.');
      }
    }
  
    // Função para adicionar item ao carrinho
    addItemForm.addEventListener('submit', async (event) => {
      event.preventDefault();
  
      const productId = document.getElementById('product-id').value;
      const quantity = document.getElementById('quantity').value;
  
      try {
        const response = await fetch('http://localhost:3000/api/cart', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify({ productId, quantity }),
        });
  
        if (!response.ok) {
          const errorData = await response.json();
          alert(errorData.message || 'Erro ao adicionar item ao carrinho');
          return;
        }
  
        alert('Item adicionado ao carrinho com sucesso!');
        loadCart(); // Recarrega os itens do carrinho
      } catch (error) {
        console.error('Erro ao adicionar item ao carrinho:', error);
        alert('Erro interno ao adicionar item ao carrinho.');
      }
    });
  
    // Função para remover item do carrinho
    window.removeFromCart = async (productId) => {
      try {
        const response = await fetch(`http://localhost:3000/api/cart/${productId}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
  
        if (!response.ok) {
          const errorData = await response.json();
          alert(errorData.message || 'Erro ao remover item do carrinho');
          return;
        }
  
        alert('Item removido com sucesso!');
        loadCart(); // Recarrega os itens do carrinho
      } catch (error) {
        console.error('Erro ao remover item do carrinho:', error);
        alert('Erro interno ao remover item do carrinho.');
      }
    };
  
    // Função para atualizar a quantidade de um item
    window.updateQuantity = async (productId, newQuantity) => {
      if (!newQuantity || newQuantity <= 0) {
        alert('Quantidade inválida!');
        return;
      }
  
      try {
        const response = await fetch('http://localhost:3000/api/cart', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify({ productId, quantity: newQuantity }),
        });
  
        if (!response.ok) {
          const errorData = await response.json();
          alert(errorData.message || 'Erro ao atualizar quantidade do item');
          return;
        }
  
        alert('Quantidade atualizada com sucesso!');
        loadCart(); // Recarrega os itens do carrinho
      } catch (error) {
        console.error('Erro ao atualizar quantidade do carrinho:', error);
        alert('Erro interno ao atualizar a quantidade.');
      }
    };
  
    // Carrega o carrinho ao iniciar a página
    loadCart();
  });  
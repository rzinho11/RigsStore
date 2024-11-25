document.addEventListener('DOMContentLoaded', () => {
    const createOrderButton = document.getElementById('create-order');
    const orderHistoryButton = document.getElementById('view-orders');
    const orderHistoryContainer = document.getElementById('order-history');
  
    // Função para criar um novo pedido
    createOrderButton.addEventListener('click', async () => {
      try {
        const response = await fetch('http://localhost:3000/api/orders', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Enviar o token para autenticação
          },
        });
  
        if (!response.ok) {
          const errorData = await response.json();
          alert(errorData.message || 'Erro ao criar pedido.');
          return;
        }
  
        const data = await response.json();
        alert(data.message || 'Pedido criado com sucesso!');
      } catch (error) {
        console.error('Erro ao criar pedido:', error);
        alert('Erro interno ao criar o pedido.');
      }
    });
  
    // Função para carregar o histórico de pedidos
    orderHistoryButton.addEventListener('click', async () => {
      try {
        const response = await fetch('http://localhost:3000/api/orders/history', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Enviar o token para autenticação
          },
        });
  
        if (!response.ok) {
          const errorData = await response.json();
          alert(errorData.message || 'Erro ao carregar o histórico de pedidos.');
          return;
        }
  
        const orders = await response.json();
        renderOrderHistory(orders);
      } catch (error) {
        console.error('Erro ao carregar histórico de pedidos:', error);
        alert('Erro interno ao carregar o histórico.');
      }
    });
  
    // Função para renderizar o histórico de pedidos no DOM
    function renderOrderHistory(orders) {
      orderHistoryContainer.innerHTML = ''; // Limpa o conteúdo anterior
      if (orders.length === 0) {
        orderHistoryContainer.innerHTML = '<p>Você ainda não possui pedidos.</p>';
        return;
      }
  
      const table = document.createElement('table');
      table.innerHTML = `
        <thead>
          <tr>
            <th>ID do Pedido</th>
            <th>Valor Total</th>
            <th>Status</th>
            <th>Data</th>
          </tr>
        </thead>
        <tbody>
          ${orders
            .map(
              (order) => `
            <tr>
              <td>${order.id}</td>
              <td>R$ ${parseFloat(order.totalAmount).toFixed(2)}</td>
              <td>${order.status}</td>
              <td>${new Date(order.createdAt).toLocaleDateString()}</td>
            </tr>
          `
            )
            .join('')}
        </tbody>
      `;
      orderHistoryContainer.appendChild(table);
    }
  });  
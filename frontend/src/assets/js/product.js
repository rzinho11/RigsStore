document.addEventListener('DOMContentLoaded', () => {
  const productForm = document.getElementById('create-product-form');
  const updateForm = document.getElementById('update-product-form');
  const productTableBody = document.querySelector('#product-table tbody');

  // Função para carregar os produtos da API
  async function loadProducts() {
    try {
      const response = await fetch('http://localhost:3000/api/products');
      const products = await response.json();

      productTableBody.innerHTML = ''; // Limpa a tabela

      products.forEach(product => {
        const row = productTableBody.insertRow();
        row.innerHTML = `
          <td>${product.id}</td>
          <td>${product.name}</td>
          <td>${product.price}</td>
          <td>${product.stock}</td>
          <td>${product.categoria}</td>
          <td>
            <button class="btn btn-warning edit-btn" data-id="${product.id}">Editar</button>
            <button class="btn btn-danger delete-btn" data-id="${product.id}">Deletar</button>
          </td>
        `;

        // Seleciona os botões de editar e deletar para cada linha
        const editButton = row.querySelector('.edit-btn');
        const deleteButton = row.querySelector('.delete-btn');

        // Atribui o evento de clique ao botão de edição
        editButton.addEventListener('click', () => {
          console.log('ID do Produto:', product.id); // Verifique o ID no console
          editProduct(product.id);
        });        

        // Atribui o evento de clique ao botão de deletar
        deleteButton.addEventListener('click', () => deleteProduct(product.id));
      });
    } catch (error) {
      console.error('Erro ao carregar os produtos:', error);
    }
  }

  // Função para deletar um produto
  async function deleteProduct(productId) {
    try {
      const response = await fetch(`http://localhost:3000/api/products/${productId}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Erro ao deletar produto.');
      alert('Produto deletado com sucesso!');
      loadProducts(); // Atualiza a tabela
    } catch (error) {
      console.error('Erro ao deletar produto:', error);
      alert('Erro ao deletar o produto.');
    }
  }

  // Função para editar um produto
  async function editProduct(productId) {
    try {
      const response = await fetch(`http://localhost:3000/api/products/${productId}`, {
        method: 'PUT',
      });
      
      const product = await response.json();

      document.getElementById('update-product-id').value = product.id;
      document.getElementById('update-name').value = product.name;
      document.getElementById('update-description').value = product.description;
      document.getElementById('update-price').value = product.price;
      document.getElementById('update-stock').value = product.stock;
      document.getElementById('update-categoria').value = product.categoria;

      document.getElementById('update-product-card').style.display = 'block'; // Exibe o formulário de atualização
    } catch (error) {
      console.error('Erro ao carregar produto:', error);
      alert('Erro ao carregar os dados do produto.');
    }
  }

  // Função para criar um produto
  productForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const name = document.getElementById('create-name').value.trim();
    const description = document.getElementById('create-description').value.trim();
    const price = parseFloat(document.getElementById('create-price').value);
    const stock = parseInt(document.getElementById('create-stock').value);
    const categoria = document.getElementById('create-categoria').value;

    if (!name || !description || isNaN(price) || price <= 0 || isNaN(stock) || stock < 0 || !categoria) {
      alert('Por favor, preencha todos os campos corretamente.');
      return;
    }

    const productData = { name, description, price, stock, categoria };
    try {
      const response = await fetch('http://localhost:3000/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData),
      });

      if (!response.ok) throw new Error('Erro ao cadastrar produto.');

      alert('Produto cadastrado com sucesso!');
      productForm.reset();
      loadProducts(); // Atualiza a tabela após o cadastro
    } catch (error) {
      console.error('Erro ao criar produto:', error);
      alert('Erro ao cadastrar o produto.');
    }
  });

  // Função para atualizar um produto
  updateForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const id = document.getElementById('update-product-id').value;
    const name = document.getElementById('update-name').value.trim();
    const description = document.getElementById('update-description').value.trim();
    const price = parseFloat(document.getElementById('update-price').value);
    const stock = parseInt(document.getElementById('update-stock').value);
    const categoria = document.getElementById('update-categoria').value;

    if (!name || !description || isNaN(price) || price <= 0 || isNaN(stock) || stock < 0 || !categoria) {
      alert('Por favor, preencha todos os campos corretamente.');
      return;
    }

    const productData = { name, description, price, stock, categoria };
    try {
      const response = await fetch(`http://localhost:3000/api/products/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData),
      });

      if (!response.ok) throw new Error('Erro ao atualizar produto.');

      alert('Produto atualizado com sucesso!');
      document.getElementById('update-product-card').style.display = 'none';
      loadProducts(); // Atualiza a tabela após a edição
    } catch (error) {
      console.error('Erro ao atualizar produto:', error);
      alert('Erro ao atualizar o produto.');
    }
  });

  // Carrega os produtos ao carregar a página
  loadProducts();
});
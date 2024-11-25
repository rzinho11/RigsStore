document.addEventListener('DOMContentLoaded', () => {
  const createForm = document.getElementById('create-product-form');
  const updateForm = document.getElementById('update-product-form');
  const productTableBody = document.getElementById('product-table').getElementsByTagName('tbody')[0];

  // Função para carregar os produtos da API
  function loadProducts() {
    fetch('http://localhost:3000/products')
      .then(response => response.json())
      .then(data => {
        productTableBody.innerHTML = '';
        data.forEach(product => {
          const row = productTableBody.insertRow();
          row.innerHTML = `
            <td>${product.id}</td>
            <td>${product.name}</td>
            <td>${product.price}</td>
            <td>${product.stock}</td>
            <td>
              <button class="btn btn-warning" onclick="editProduct(${product.id})">Editar</button>
              <button class="btn btn-danger" onclick="deleteProduct(${product.id})">Deletar</button>
            </td>
          `;
        });
      })
      .catch(error => {
        console.error('Erro ao carregar os produtos:', error);
      });
  }

  // Função para editar um produto
  function editProduct(productId) {
    fetch(`http://localhost:3000/products/${productId}`)
      .then(response => response.json())
      .then(product => {
        document.getElementById('update-product-id').value = product.id;
        document.getElementById('update-name').value = product.name;
        document.getElementById('update-description').value = product.description;
        document.getElementById('update-price').value = product.price;
        document.getElementById('update-stock').value = product.stock;
        document.getElementById('update-category').value = product.category;
        document.getElementById('update-product-card').style.display = 'block';
      })
      .catch(error => console.error('Erro ao carregar produto:', error));
  }

  // Função para deletar um produto
  function deleteProduct(productId) {
    fetch(`http://localhost:3000/products/${productId}`, { method: 'DELETE' })
      .then(response => response.json())
      .then(() => {
        loadProducts();
        alert('Produto deletado com sucesso!');
      })
      .catch(error => console.error('Erro ao deletar produto:', error));
  }

  // Chama a função para carregar os produtos ao carregar a página
  loadProducts();

  // Validação ao criar um produto
  createForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = document.getElementById('create-name').value.trim();
    const description = document.getElementById('create-description').value.trim();
    const price = parseFloat(document.getElementById('create-price').value);
    const stock = parseInt(document.getElementById('create-stock').value);
    const category = document.getElementById('create-category').value;

    if (!name || !description || isNaN(price) || price <= 0 || isNaN(stock) || stock < 0 || !category) {
      alert('Por favor, preencha todos os campos corretamente.');
      return;
    }

    const productData = { name, description, price, stock, category };
    fetch('http://localhost:3000/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(productData)
    })
      .then(response => response.json())
      .then(() => {
        loadProducts();
        alert('Produto cadastrado com sucesso!');
        createForm.reset();
      })
      .catch(error => {
        console.error('Erro ao criar produto:', error);
        alert('Erro ao cadastrar produto.');
      });
  });

  // Validação ao editar um produto
  updateForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const id = document.getElementById('update-product-id').value;
    const name = document.getElementById('update-name').value.trim();
    const description = document.getElementById('update-description').value.trim();
    const price = parseFloat(document.getElementById('update-price').value);
    const stock = parseInt(document.getElementById('update-stock').value);
    const category = document.getElementById('update-category').value;

    if (!name || !description || isNaN(price) || price <= 0 || isNaN(stock) || stock < 0 || !category) {
      alert('Por favor, preencha todos os campos corretamente.');
      return;
    }

    const productData = { id, name, description, price, stock, category };
    fetch(`http://localhost:3000/products/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(productData)
    })
      .then(response => response.json())
      .then(() => {
        loadProducts();
        alert('Produto atualizado com sucesso!');
        document.getElementById('update-product-card').style.display = 'none';
      })
      .catch(error => {
        console.error('Erro ao atualizar produto:', error);
        alert('Erro ao atualizar produto.');
      });
  });
});
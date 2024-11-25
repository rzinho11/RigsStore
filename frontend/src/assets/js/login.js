document.addEventListener('DOMContentLoaded', () => {
    // Selecionar elementos do formulário de login e registro
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
  
    // Handler para login
    loginForm.addEventListener('submit', async (event) => {
      event.preventDefault();
  
      const username = document.getElementById('login-username').value;
      const password = document.getElementById('login-password').value;
  
      try {
        const response = await fetch('http://localhost:3000/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, password }),
        });
  
        if (!response.ok) {
          const errorData = await response.json();
          alert(errorData.message || 'Erro ao fazer login!');
          return;
        }
  
        const data = await response.json();
        alert(`Login bem-sucedido! Token: ${data.token}`);
        // Armazenar o token no localStorage para autenticação futura
        localStorage.setItem('authToken', data.token);
      } catch (error) {
        console.error('Erro ao fazer login:', error);
        alert('Erro interno ao tentar login.');
      }
    });
  
    // Handler para registro
    registerForm.addEventListener('submit', async (event) => {
      event.preventDefault();
  
      const username = document.getElementById('register-username').value;
      const password = document.getElementById('register-password').value;
      const role = document.getElementById('register-role').value || 'user'; // Papel padrão é "user"
  
      try {
        const response = await fetch('http://localhost:3000/api/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, password, role }),
        });
  
        if (!response.ok) {
          const errorData = await response.json();
          alert(errorData.message || 'Erro ao registrar usuário!');
          return;
        }
  
        const data = await response.json();
        alert(`Usuário registrado com sucesso! ID: ${data.user_id}`);
      } catch (error) {
        console.error('Erro ao registrar usuário:', error);
        alert('Erro interno ao tentar registrar.');
      }
    });
  });  
# 📌 Instruções para Entrega

## 📂 Clone do Repositório
Clone este repositório para iniciar o desenvolvimento:

```bash
git clone <https://github.com/lcs7k/inChurch.git>
cd inChurch
```

## 📦 Instalação de Dependências
Instale as dependências necessárias do projeto:

```bash
npm install
```

## 🚀 Iniciar a API Fake e a Aplicação
A API fake e a aplicação Angular são iniciadas simultaneamente com `concurrently`. Basta rodar:

```bash
npm start
```

- O **JSON Server** rodará em: `http://localhost:3000`
- A **aplicação Angular** rodará em: `http://localhost:4200`

## 🔑 Credenciais de Acesso
Para autenticação, utilize um dos logins cadastrados no `db.json`, na seção `users`. Exemplo:

```json
{
  "users": [
    {
      "id": 1,
      "name": "Lucas",
      "email": "Lucas@email.com",
      "password": "123456"
    },
    {
      "id": 2,
      "name": "Weverton",
      "email": "Weverton@email.com",
      "password": "654321"
    },
    {
      "id": 3,
      "name": "Larissa",
      "email": "Larissa@email.com",
      "password": "abcdef"
    }
  ]
}
```

## 📱 Teste de Responsividade
Verifique o comportamento responsivo da aplicação em diferentes dispositivos e tamanhos de tela.







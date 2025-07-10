# 📖 Library Management - Front-end

Este é o front-end do sistema **Library Management**, desenvolvido para atender à demanda da biblioteca da escola onde atuo como estagiário administrativo. O sistema facilita a gestão de livros didáticos e literários, otimizando os processos de empréstimo, devolução e organização do acervo, além do gerenciamento de usuários.

A interface foi construída pensando na **usabilidade**, **acessibilidade** e **responsividade**, garantindo uma experiência intuitiva para alunos, professores e administradores.

---

## ✅ Funcionalidades

- 👥 Autenticação e controle de acesso com base em papéis (admin/usuário).
- 📚 Cadastro, edição e remoção de livros e gêneros literários.
- 🔍 Pesquisa e visualização de livros disponíveis na biblioteca.
- 🔄 Controle visual de empréstimos e devoluções.
- ⚙️ Interface responsiva para uso em dispositivos móveis e desktops.
- 🧩 Integração total com a API REST do back-end via HTTPClient.

---

## 🎨 Tecnologias Utilizadas

- [Angular 19](https://angular.io/)
- [Angular Signals](https://angular.dev/features/reactivity)
- [RxJS](https://rxjs.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [Angular Forms (Reactive Forms)](https://angular.io/guide/reactive-forms)

---

## 🧱 Estrutura do Projeto

O front-end é baseado na arquitetura de componentes , utilizando standalone components do Angular 15.

- `features/`: componentes de páginas e funcionalidades (ex: clients, books, loans)
- `shared/`: componentes reutilizáveis (modais, inputs, botões, etc)
- `core/`: serviços, guards, interceptors e configurações globais
- `styles/`: configurações globais de Tailwind e temas

---

## 🔐 Segurança

- Autenticação via JWT, com interceptação automática de tokens nas requisições.
- Proteção de rotas com guards (`AuthGuard`, `RoleGuard`).
- Validações reativas nos formulários para garantir integridade dos dados.

---

## 📸 Prévia da Interface

Abaixo algumas prévias principais da aplicação:

### Tela de Gênero

![Tela de Gênero](/public/docs/genres.png)

### Tela de Empréstimos

![Tela de Empréstimos](/public/docs/loans.png)

### Tela de Livros

![Tela de Livros](/public/docs/books.png)

### Tela de Usuários

![Tela de Usuários](/public/docs/user.png)

### Tela de Clientes

![Tela de Clientes](/public/docs/clients.png)

## 🚀 Como Rodar o Projeto

1.  **Clone o Repositório:**

    ```bash
    git clone https://github.com/Faelkk/management-library-fe
    ```

2.  **Instalar as Dependências**

    ```bash
    npm install
    ```

3.  **Rodar o Projeto**

    ```bash
    npm run start
    ```

🤝 **Como Contribuir?**

- ⭐ Deixe uma estrela no repositório.
- 🔗 Me siga aqui no GitHub.
- 👥 Conecte-se comigo no LinkedIn e faça parte da minha rede profissional.

👨‍💻**Autor**
Desenvolvido por [Rafael Achtenberg](linkedin.com/in/rafael-achtenberg-7a4b12284/).

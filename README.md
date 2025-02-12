# Projeto Evoluir

Bem-vindo ao **Projeto Evoluir**! Nossa plataforma de cursos online foi desenvolvida para proporcionar uma experiência de aprendizado interativa e dinâmica. Aqui você encontrará tudo o que precisa para começar a usar e contribuir com o projeto.

## Índice

- [Projeto Evoluir](#projeto-evoluir)
  - [Índice](#índice)
  - [Visão Geral](#visão-geral)
  - [Funcionalidades](#funcionalidades)
  - [Tecnologias Utilizadas](#tecnologias-utilizadas)
  - [Instalação](#instalação)
  - [Configuração](#configuração)
  - [Como Contribuir](#como-contribuir)
  - [Licença](#licença)

## Visão Geral

O Projeto Evoluir é uma plataforma de cursos online que oferece uma ampla gama de funcionalidades para alunos e instrutores. Nosso objetivo é tornar o aprendizado acessível e envolvente para todos.

## Funcionalidades

- **Autenticação**: Login, cadastro e recuperação de senha via Firebase Authentication.
- **Gerenciamento de Cursos e Lições**: Criação, atualização e exclusão de cursos e lições.
- **Submissões de Atividades**: Envio de respostas textuais e arquivos para atividades.
- **Interface de Usuário**: Design responsivo utilizando Tailwind CSS e DaisyUI.
- **Temas**: Suporte a múltiplos temas selecionáveis pelo usuário.
- **Navegação e Breadcrumbs**: Navegação intuitiva com breadcrumbs.
- **Dashboard**: Informações sobre cursos disponíveis, progresso e certificados.
- **Firebase**: Utilização do Firebase para autenticação, Firestore e armazenamento de arquivos.

## Tecnologias Utilizadas

- **React**: Biblioteca JavaScript para construção de interfaces de usuário.
- **Next.js**: Framework React para renderização do lado do servidor e geração de sites estáticos.
- **Firebase**: Plataforma de desenvolvimento de aplicativos móveis e web.
- **Tailwind CSS**: Framework CSS utilitário para estilização rápida e eficiente.
- **TypeScript**: Superset do JavaScript que adiciona tipagem estática ao código.

## Instalação

Siga os passos abaixo para configurar o projeto localmente:

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/projeto-evoluir.git
   cd projeto-evoluir
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

## Configuração

Crie um arquivo `.env.local` na raiz do projeto e adicione suas credenciais do Firebase:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

## Como Contribuir

Contribuições são bem-vindas! Siga os passos abaixo para contribuir com o projeto:

1. Faça um fork do repositório.
2. Crie uma branch para sua feature ou correção de bug:
   ```bash
   git checkout -b minha-feature
   ```
3. Faça commit das suas alterações:
   ```bash
   git commit -m 'Adiciona minha feature'
   ```
4. Envie para o repositório remoto:
   ```bash
   git push origin minha-feature
   ```
5. Abra um Pull Request.

## Licença

Este projeto está licenciado sob a Licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

Esperamos que você aproveite o Projeto Evoluir! Se tiver alguma dúvida ou sugestão, sinta-se à vontade para abrir uma issue ou entrar em contato.
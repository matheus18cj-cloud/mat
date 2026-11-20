# matdev — Portfólio

Portfólio responsivo em português, feito com HTML, CSS e JavaScript, sem dependências de instalação ou etapa de build.

## Abrir localmente

Com Node.js 20.11 ou mais recente:

```sh
npm run dev
```

Acesse http://localhost:3000. Para usar outra porta: `PORT=8080 npm run dev`.

Também é possível abrir `index.html` diretamente no navegador. A fonte vem do Google Fonts; sem conexão, o site usa a fonte alternativa do sistema.

## Conteúdo

- Identidade matdev, apresentação e o texto fornecido para Sobre mim.
- Três projetos com imagens locais, ampliação em modal, fechamento por Escape e retorno de foco.
- Contato exclusivo por WhatsApp: +55 62 8469-3117, conforme informado.
- Menu para celular, animações de entrada, navegação por seção, progresso de leitura e respeito à preferência por movimento reduzido.

As imagens dos projetos são prévias visuais: não foram fornecidos links dos sites publicados. Os botões de projeto abrem a imagem completa, sem simular um site online.

## Editar

- `index.html`: conteúdo e links de WhatsApp.
- `styles.css`: cores, layout e animações.
- `script.js`: interações e dados das prévias.
- `assets/`: cópias das imagens fornecidas e favicon.

Para verificar a sintaxe do JavaScript:

```sh
npm run check
```

Para hospedar, envie `index.html`, `styles.css`, `script.js` e `assets/` para uma hospedagem estática. Não é necessário enviar as fotos originais da raiz nem o servidor de desenvolvimento.


# App "Carteira do Motorista" — Visual em React + Tailwind (tema escuro premium)

Vou montar o visual completo do app com mock data, navegação por rotas separadas (cada seção com sua própria URL) e uma identidade dark premium com acentos em azul/verde.

## 🎨 Design system
- Fundo: preto-azulado profundo (`oklch` escuro), cards em superfície elevada com leve gradiente
- Acentos: azul elétrico (primário) + verde esmeralda (status positivo) + âmbar/vermelho (alertas)
- Tipografia limpa, cantos arredondados (2xl), sombras suaves, ícones `lucide-react`
- Mobile-first (viewport atual 372px), com bottom navigation fixa estilo app

## 🧭 Estrutura de navegação
- **Bottom tab bar** fixa com 5 ícones principais: Início, CNH, Veículos, Multas, Mais
- Header superior com saudação, avatar e sino de notificações (badge)
- Cada seção em rota própria para SSR/SEO

## 📄 Rotas e telas
1. `/` — **Início (Dashboard)**: card de boas-vindas, atalhos rápidos (CNH, Veículos, Multas, Pagamentos), resumo de pontos da CNH com barra de progresso, últimas notificações
2. `/cnh` — **CNH Digital**: cartão da CNH em destaque (frente estilo carteira física), foto, nome, número de registro, validade, categoria, badge de situação (Ativa/Suspensa/Cassada)
3. `/veiculos` — **Veículos vinculados**: lista de cards (placa, modelo, situação, débitos pendentes), botão "Consultar débitos" por veículo
4. `/multas` — **Multas e infrações**: tabs (Em aberto / Pago / Em recurso), cards com data, local, infração, pontuação e valor; botão "Pagar" nos abertos
5. `/pontuacao` — **Pontuação da CNH**: gauge circular com pontos atuais (ex.: 8/40), histórico em timeline com infrações que geraram pontos
6. `/pagamentos` — **Pagamentos**: lista de multas pagáveis + tela de confirmação de pagamento (modal com PIX/cartão, mock)
7. `/notificacoes` — **Notificações**: lista agrupada por tipo (nova multa, vencimento CNH, status, pontos) com ícones coloridos e timestamps
8. `/historico` — **Histórico e transparência**: três abas — Infrações, Pagamentos, Log de acessos (quem/quando consultou seus dados)

## 🗂️ Mock data
Um arquivo `src/lib/mock-data.ts` centralizando:
- Usuário (nome, foto, CNH, validade, categoria, situação)
- Lista de veículos (3 exemplos com placas, situações e débitos)
- Lista de multas (variadas, com status diferentes)
- Pontuação e histórico
- Notificações
- Log de acessos

## ✅ Entregáveis
- 8 rotas com tema escuro consistente
- Componentes reutilizáveis: `BottomNav`, `AppHeader`, `StatusBadge`, `SectionCard`
- `index.tsx` substituindo o placeholder
- `styles.css` ajustado para a paleta dark premium
- Tudo navegável e responsivo (sem backend)

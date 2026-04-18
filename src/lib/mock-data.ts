export type CnhStatus = "Ativa" | "Suspensa" | "Cassada";
export type VehicleStatus = "Regular" | "Pendente" | "Bloqueado";
export type FineStatus = "Em aberto" | "Pago" | "Em recurso";

export const user = {
  name: "Carlos Henrique Silva",
  firstName: "Carlos",
  cpf: "123.456.789-00",
  avatar: "https://i.pravatar.cc/150?img=12",
  cnh: {
    number: "01234567890",
    register: "987654321",
    category: "AB",
    issuedAt: "12/03/2018",
    validUntil: "12/03/2028",
    firstLicense: "10/01/2008",
    status: "Ativa" as CnhStatus,
    points: 8,
    maxPoints: 40,
  },
};

export const vehicles = [
  {
    id: "v1",
    plate: "BRA2E19",
    model: "Honda Civic EXL",
    year: "2021",
    color: "Prata",
    status: "Regular" as VehicleStatus,
    debts: 0,
  },
  {
    id: "v2",
    plate: "RIO4A88",
    model: "Yamaha Fazer 250",
    year: "2019",
    color: "Azul",
    status: "Pendente" as VehicleStatus,
    debts: 1,
  },
  {
    id: "v3",
    plate: "SPO7C32",
    model: "Toyota Hilux SRX",
    year: "2023",
    color: "Preto",
    status: "Regular" as VehicleStatus,
    debts: 0,
  },
];

export const fines = [
  {
    id: "m1",
    date: "14/03/2025",
    location: "Av. Paulista, 1500 — São Paulo/SP",
    description: "Excesso de velocidade até 20%",
    points: 4,
    amount: 195.23,
    status: "Em aberto" as FineStatus,
    plate: "BRA2E19",
  },
  {
    id: "m2",
    date: "02/02/2025",
    location: "BR-101, Km 234 — Rio de Janeiro/RJ",
    description: "Avanço de sinal vermelho",
    points: 7,
    amount: 293.47,
    status: "Em recurso" as FineStatus,
    plate: "RIO4A88",
  },
  {
    id: "m3",
    date: "18/12/2024",
    location: "Rua Augusta, 200 — São Paulo/SP",
    description: "Estacionamento proibido",
    points: 3,
    amount: 130.16,
    status: "Pago" as FineStatus,
    plate: "BRA2E19",
  },
  {
    id: "m4",
    date: "05/11/2024",
    location: "Av. Brasil, 500 — Rio de Janeiro/RJ",
    description: "Uso do celular ao volante",
    points: 7,
    amount: 293.47,
    status: "Pago" as FineStatus,
    plate: "BRA2E19",
  },
  {
    id: "m5",
    date: "28/03/2025",
    location: "Marginal Tietê — São Paulo/SP",
    description: "Falta de cinto de segurança",
    points: 5,
    amount: 195.23,
    status: "Em aberto" as FineStatus,
    plate: "SPO7C32",
  },
];

export const notifications = [
  {
    id: "n1",
    type: "fine" as const,
    title: "Nova multa registrada",
    message: "Excesso de velocidade — Av. Paulista",
    time: "há 2 horas",
    unread: true,
  },
  {
    id: "n2",
    type: "points" as const,
    title: "Pontuação atualizada",
    message: "Você acumulou 4 novos pontos na CNH",
    time: "há 2 horas",
    unread: true,
  },
  {
    id: "n3",
    type: "cnh" as const,
    title: "CNH próxima do vencimento",
    message: "Sua CNH vence em 12/03/2028",
    time: "ontem",
    unread: false,
  },
  {
    id: "n4",
    type: "status" as const,
    title: "Status do veículo alterado",
    message: "RIO4A88 está com débitos pendentes",
    time: "há 3 dias",
    unread: false,
  },
];

export const accessLog = [
  { id: "a1", entity: "Polícia Rodoviária Federal", action: "Consulta de CNH", date: "15/03/2025 14:32" },
  { id: "a2", entity: "DETRAN-SP", action: "Consulta de pontuação", date: "10/03/2025 09:11" },
  { id: "a3", entity: "Seguradora Porto", action: "Consulta de histórico", date: "02/03/2025 16:48" },
  { id: "a4", entity: "Você (app)", action: "Login no aplicativo", date: "01/03/2025 08:20" },
];

export const pointsHistory = [
  { id: "p1", date: "14/03/2025", description: "Excesso de velocidade até 20%", points: 4 },
  { id: "p2", date: "05/11/2024", description: "Uso do celular ao volante", points: 7 },
  { id: "p3", date: "18/12/2024", description: "Estacionamento proibido", points: 3 },
];

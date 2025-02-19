// src/app/mocks/mock-data.ts
export const MOCK_CLIENTS = [
  {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    phone: '0123456789'
  },
  {
    id: 2,
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane@example.com',
    phone: '0987654321'
  },
  {
    id: 3,
    firstName: 'Alice',
    lastName: 'Johnson',
    email: 'alice@example.com',
    phone: '0567891234'
  }
];

export const MOCK_SERVICES = [
  {
    id: 1,
    name: 'Soin du visage',
    duration: 60,
    price: 50,
    description: 'Nettoyage et soin complet du visage'
  },
  {
    id: 2,
    name: 'Manucure',
    duration: 45,
    price: 35,
    description: 'Soin des mains et pose de vernis'
  },
  {
    id: 3,
    name: 'Pédicure',
    duration: 45,
    price: 40,
    description: 'Soin des pieds complet'
  },
  {
    id: 4,
    name: 'Massage relaxant',
    duration: 90,
    price: 80,
    description: 'Massage corps complet'
  }
];

export const MOCK_APPOINTMENTS = [
  {
    appointmentId: 1,
    clientId: 1,
    serviceId: 1,
    appointmentDate: new Date('2024-10-29'),
    time: '10:00',
    status: 'confirmed',
    notes: 'Première visite',
    client: MOCK_CLIENTS[0],
    service: MOCK_SERVICES[0]
  },
  {
    appointmentId: 2,
    clientId: 2,
    serviceId: 2,
    appointmentDate: new Date('2024-10-29'),
    time: '14:30',
    status: 'pending',
    notes: 'Client régulier',
    client: MOCK_CLIENTS[1],
    service: MOCK_SERVICES[1]
  },
  {
    appointmentId: 3,
    clientId: 3,
    serviceId: 4,
    appointmentDate: new Date('2024-10-30'),
    time: '11:00',
    status: 'completed',
    notes: 'Demande spéciale: huile bio',
    client: MOCK_CLIENTS[2],
    service: MOCK_SERVICES[3]
  }
];

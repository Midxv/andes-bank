// andes/frontend/src/mockData.js

export const MOCK_USERS = [
    {
        id: 1,
        email: "carlos.prime@email.com",
        password: "password123", // Mock password
        name: "Carlos Mesa",
        dob: "1985-05-15",
        accountNumber: "AP100001",
        accountBalance: 14500.55, // In S/
        creditCard: {
            status: 'Alloted',
            number: '**** **** **** 1234',
            limit: 5000,
            due: 150.00,
            isBlocked: false,
        },
        transactionHistory: [
            { id: 1, date: "2025-12-07", description: "Compra Online - Amazon", amount: -250.00, type: "Card" },
            { id: 2, date: "2025-12-05", description: "Depósito de Salario", amount: 4500.00, type: "Transferencia" },
            { id: 3, date: "2025-12-03", description: "Pago de Servicios (Luz)", amount: -120.50, type: "Transferencia" },
        ],
    },
    {
        id: 2,
        email: "sofia.client@email.com",
        password: "password123",
        name: "Sofía Vargas",
        dob: "1992-08-20",
        accountNumber: "AP100002",
        accountBalance: 3200.75, // In S/
        creditCard: {
            status: 'Pending',
        },
        transactionHistory: [
            { id: 1, date: "2025-12-08", description: "Retiro ATM", amount: -100.00, type: "Efectivo" },
            { id: 2, date: "2025-12-06", description: "Transferencia Recibida", amount: 500.00, type: "Transferencia" },
        ],
    }
];

export const authenticateUser = (email, password) => {
    // Finds user by email and checks password
    const user = MOCK_USERS.find(u => u.email === email);

    // Simulate secure authentication check
    if (user && user.password === password) {
        // In a real app, this returns a JWT token or session ID
        return user;
    }
    return null;
};
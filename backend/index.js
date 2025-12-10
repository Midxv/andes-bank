// andes/backend/index.js (FINAL WORKING VERSION WITH MULTI-TABLE SCHEMA AND FIXED LOGIN)

const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const app = express();
const PORT = 3000;

// --- Configuration & Database Setup ---
const DB_FILE = './useraccount.db';
const db = new sqlite3.Database(DB_FILE, (err) => {
    if (err) {
        console.error(`Error opening database ${DB_FILE}:`, err.message);
    } else {
        console.log(`✅ Connected to SQLite database: ${DB_FILE}`);
        // Run database setup sequentially to ensure tables are ready
        db.serialize(() => {
            initializeDatabaseSchema(db);
        });
    }
});

// --- Middleware ---
app.use(cors({
    origin: 'http://localhost:5173', // Allows connection from your Vite frontend
}));
app.use(express.json());

// --- Helper Functions ---

/**
 * Creates the full multi-table schema, ensuring sequential execution for clean creation.
 */
function initializeDatabaseSchema(db) {
    console.log("--- Initializing Multi-Table Schema ---");

    // 1. CLEANUP (Drop tables sequentially)
    db.serialize(() => {
        db.run("DROP TABLE IF EXISTS transactions;");
        db.run("DROP TABLE IF EXISTS debit_cards;");
        db.run("DROP TABLE IF EXISTS accounts;");
        db.run("DROP TABLE IF EXISTS users;");

        // 2. CREATE CORE IDENTITY TABLE
        db.run(`
            CREATE TABLE IF NOT EXISTS users (
                                                 user_id INTEGER PRIMARY KEY AUTOINCREMENT,
                                                 email TEXT UNIQUE NOT NULL,
                                                 password TEXT NOT NULL,
                                                 full_name TEXT NOT NULL,
                                                 date_of_birth DATE,
                                                 phone_number TEXT UNIQUE NOT NULL,
                                                 national_id TEXT UNIQUE NOT NULL,
                                                 created_at DATETIME DEFAULT CURRENT_TIMESTAMP
            );
        `);

        // 3. CREATE ACCOUNTS TABLE (Primary Financial Link)
        db.run(`
            CREATE TABLE IF NOT EXISTS accounts (
                                                    account_id TEXT PRIMARY KEY,
                                                    user_id INTEGER NOT NULL,
                                                    account_type TEXT NOT NULL,
                                                    current_balance REAL DEFAULT 0.00,
                                                    credit_card_status TEXT DEFAULT 'None',
                                                    status TEXT DEFAULT 'Active',
                                                    FOREIGN KEY (user_id) REFERENCES users(user_id)
                );
        `);

        // 4. CREATE TRANSACTIONS HISTORY TABLE
        db.run(`
            CREATE TABLE IF NOT EXISTS transactions (
                                                        txn_id INTEGER PRIMARY KEY AUTOINCREMENT,
                                                        account_id TEXT NOT NULL,
                                                        date TEXT NOT NULL,
                                                        description TEXT,
                                                        amount REAL NOT NULL,
                                                        txn_type TEXT NOT NULL,
                                                        FOREIGN KEY (account_id) REFERENCES accounts(account_id)
                );
        `);

        // 5. CREATE DEBIT CARDS TABLE
        db.run(`
            CREATE TABLE IF NOT EXISTS debit_cards (
                                                       card_id INTEGER PRIMARY KEY AUTOINCREMENT,
                                                       user_id INTEGER NOT NULL,
                                                       card_number TEXT UNIQUE NOT NULL,
                                                       expiry_date TEXT,
                                                       is_active BOOLEAN DEFAULT 1,
                                                       FOREIGN KEY (user_id) REFERENCES users(user_id)
                );
        `, (err) => {
            if (err) {
                console.error("Error finalizing table creation:", err.message);
            } else {
                console.log("✅ New multi-table schema created successfully.");
            }
        });
    });
}

/**
 * Generates a unique, branded account number.
 */
function generateAccountNumber() {
    return 'AP' + Math.floor(Math.random() * 900000 + 100000);
}


// --- API Endpoints ---

// 1. POST /api/register - Handles new user account opening
app.post('/api/register', async (req, res) => {
    const data = req.body;

    const userPassword = data.password;
    const accountNumber = generateAccountNumber();
    const initialBalance = 0.00;

    db.serialize(() => {
        db.run("BEGIN TRANSACTION;");

        // A) Insert into USERS table
        const insertUserSql = `
            INSERT INTO users (email, password, full_name, date_of_birth, phone_number, national_id)
            VALUES (?, ?, ?, ?, ?, ?);
        `;
        const userStmt = [
            data.email, userPassword, `${data.firstName} ${data.lastName}`,
            data.dateOfBirth, data.phone, data.nationalId
        ];

        db.run(insertUserSql, userStmt, function(err) {
            if (err) {
                db.run("ROLLBACK;");
                console.error("Registration (Users) error:", err.message);
                if (err.message.includes('UNIQUE constraint failed')) {
                    return res.status(409).json({ success: false, message: 'El correo, teléfono o DNI ya está registrado.' });
                }
                return res.status(500).json({ success: false, message: 'Error al registrar el usuario.' });
            }

            const userId = this.lastID;

            // B) Insert into ACCOUNTS table
            const insertAccountSql = `
                INSERT INTO accounts (account_id, user_id, account_type, current_balance, credit_card_status)
                VALUES (?, ?, ?, ?, ?);
            `;
            const accountStmt = [
                accountNumber, userId, data.accountType || 'digital', initialBalance,
                data.requestCreditCard ? 'Requested' : 'None'
            ];

            db.run(insertAccountSql, accountStmt, function(err) {
                if (err) {
                    db.run("ROLLBACK;");
                    console.error("Registration (Accounts) error:", err.message);
                    return res.status(500).json({ success: false, message: 'Error al crear la cuenta financiera.' });
                }

                // C) Commit the transaction
                db.run("COMMIT;", () => {
                    console.log(`\n✅ NEW USER REGISTERED: ${data.email} | Account: ${accountNumber}`);
                    res.json({
                        success: true,
                        message: `¡Cuenta abierta!`,
                        accountNumber: accountNumber
                    });
                });
            });
        });
    });
});


// 2. POST /api/login - Handles user authentication
app.post('/api/login', (req, res) => {
    const { identifier, password } = req.body;

    // Query to find user by email, phone, or national_id (identifier)
    // We select the password field *explicitly* here.
    const selectSql = `
        SELECT
            u.user_id, u.full_name, u.email, u.password,
            a.account_id, a.current_balance, a.credit_card_status
        FROM users u
                 INNER JOIN accounts a ON u.user_id = a.user_id
        WHERE u.email = ? OR u.phone_number = ? OR u.national_id = ?;
    `;

    db.get(selectSql, [identifier, identifier, identifier], (err, user) => {
        if (err) {
            console.error("Login lookup error:", err.message);
            return res.status(500).json({ success: false, message: 'Error en el servidor de autenticación.' });
        }

        if (!user) {
            return res.status(401).json({ success: false, message: 'Credenciales inválidas. El usuario no existe.' });
        }

        // --- AUTHENTICATION CHECK (Plain Text Match) ---
        // user.password is retrieved directly from the DB and compared to the submitted password.
        if (user.password === password) {

            // Fetch transactions for the dashboard
            db.all("SELECT * FROM transactions WHERE account_id = ?", [user.account_id], (err, transactions) => {

                const userData = {
                    id: user.user_id,
                    name: user.full_name,
                    email: user.email,
                    accountNumber: user.account_id,
                    accountBalance: user.current_balance,
                    creditCardStatus: user.credit_card_status,
                    transactionHistory: transactions || [],
                };

                return res.json({ success: true, user: userData, token: 'mock-jwt-token' });
            });

        } else {
            return res.status(401).json({ success: false, message: 'Contraseña incorrecta.' });
        }
    });
});


// --- ADMIN ENDPOINTS (Read/Delete) ---

// 3. GET /api/admin/users - Fetches all registered users and their account data
app.get('/api/admin/users', (req, res) => {
    const selectAllSql = `
        SELECT
            u.user_id, u.full_name, u.email, u.phone_number, u.national_id, u.date_of_birth,
            a.account_id, a.current_balance, a.credit_card_status
        FROM users u
                 INNER JOIN accounts a ON u.user_id = a.user_id;
    `;

    db.all(selectAllSql, [], (err, rows) => {
        if (err) {
            console.error("Admin Fetch All error:", err.message);
            return res.status(500).json({ success: false, message: 'Error fetching users.' });
        }
        res.json({ success: true, users: rows });
    });
});

// 4. DELETE /api/admin/user/:user_id - Deletes a user from all linked tables
app.delete('/api/admin/user/:user_id', (req, res) => {
    const userId = req.params.user_id;

    db.serialize(() => {
        db.run("BEGIN TRANSACTION;");

        // Delete from linked tables first (transactions, debit_cards)
        db.run("DELETE FROM transactions WHERE account_id IN (SELECT account_id FROM accounts WHERE user_id = ?)", [userId], (err) => {
            if (err) { console.error("Delete Txn error:", err.message); db.run("ROLLBACK;"); return res.status(500).json({ success: false, message: 'Failed to delete transactions.' }); }
        });
        db.run("DELETE FROM debit_cards WHERE user_id = ?", [userId], (err) => {
            if (err) { console.error("Delete Cards error:", err.message); db.run("ROLLBACK;"); return res.status(500).json({ success: false, message: 'Failed to delete cards.' }); }
        });
        // Delete from accounts
        db.run("DELETE FROM accounts WHERE user_id = ?", [userId], (err) => {
            if (err) { console.error("Delete Account error:", err.message); db.run("ROLLBACK;"); return res.status(500).json({ success: false, message: 'Failed to delete account data.' }); }
        });
        // Delete from users
        db.run("DELETE FROM users WHERE user_id = ?", [userId], function(err) {
            if (err) {
                db.run("ROLLBACK;");
                return res.status(500).json({ success: false, message: 'Failed to delete user profile.' });
            }
            db.run("COMMIT;", () => {
                res.json({ success: true, message: `User ${userId} deleted successfully.` });
            });
        });
    });
});


// andes/backend/index.js (At the very end of the file)

// --- Find this line (near the bottom): ---
// app.listen(PORT, () => {

// --- Replace the app.listen(...) block with this: ---
const HOST = '0.0.0.0'; // Listen on all network interfaces
app.listen(PORT, HOST, () => {
    console.log(`🚀 Backend server running on http://${HOST}:${PORT}`);
    console.log("NOTE: Ensure 'npm install express sqlite3' is run in the backend folder.");
});
// Este módulo tiene como propósito conectar con la API de Open Payments y 
// crear 1 usuario autenticado con sus respectivas credenciales importadas desde el archivo .env (wallet address, private_key y key_id)
// también, obtiene la wallet address del usuario creado, la cual será muy útil para comenzar a generar transacciones de una wallet a otra

// Este comando ayuda a que podamos extraer las variables almacenadas en .env
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
// importar clientes autenticados y no autenticados desde el plugin de Open Payments
import { createAuthenticatedClient } from "@interledger/open-payments";

dotenv.config();
// Iniciar app express
const app = express();

// Your middleware and routes
app.use(cors());
app.use(express.json());

let KEY_ID = process.env.KEY_ID;
let WALLET_ADDRESS = process.env.WALLET_ADDRESS;
let PRIVATE_KEY = process.env.PRIVATE_KEY;
console.log('Key ID:', KEY_ID);
console.log('Wallet Address:', WALLET_ADDRESS);
console.log('Private Key:', PRIVATE_KEY ? "Loaded!":"Missing");

// Verificar que la clave privada está en el formato correcto
if (PRIVATE_KEY) {
    const hasBegin = PRIVATE_KEY.includes('-----BEGIN PRIVATE KEY-----');
    const hasEnd = PRIVATE_KEY.includes('-----END PRIVATE KEY-----');

    console.log('Private Key format:');
    console.log('  - Has BEGIN header:', hasBegin ? '✅' : '❌');
    console.log('  - Has END header:', hasEnd ? '✅' : '❌');
    console.log('  - Length:', PRIVATE_KEY.length, 'characters');
    
    if (!hasBegin || !hasEnd) {
        console.log('⚠️  WARNING: Use the PEM format key (with BEGIN/END headers)');
    }
}



const testConnection = async () => {

    try {
        console.log("Testing Open Payments connection");
        
        // 2. crear cliente no autenticado
        const client = await createAuthenticatedClient({
          walletAddressUrl: WALLET_ADDRESS,
          privateKey: PRIVATE_KEY,
          keyId: KEY_ID,
        });

        console.log("---------------------------Created authenticated client", client)

        const walletAddress = await client.walletAddress.get({
            url: WALLET_ADDRESS,
        });

        console.log("WALLET ADDRESS DEL NUEVO CLIENTE:", walletAddress);

        
        console.log("open payments client succesfully initialized");
    
        return client; 
        
    } catch (error) {
        console.error('❌ Error:', error.message);
        console.error('❌ Error:', error);
    }

}

testConnection();


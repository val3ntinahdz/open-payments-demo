import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';

// Importar dependencia de Open Payments
import { createAuthenticatedClient, isPendingGrant } from "@interledger/open-payments";

dotenv.config();
// Iniciar app express
const app = express();

// Your middleware and routes
app.use(cors());
app.use(express.json());

// Los argumentos necesarios para generar transacciones
let KEY_ID = process.env.KEY_ID;
let WALLET_ADDRESS = process.env.WALLET_ADDRESS;

let PRIVATE_KEY = process.env.PRIVATE_KEY;
console.log("La clave privada existe?", PRIVATE_KEY ? "Exitosamente cargada":"Pendiente");

let INCOMING_PAYMENT_ACCESS_TOKEN = process.env.INCOMING_PAYMENT_ACCESS_TOKEN;
console.log("El token de acceso del Incoming Payment:", INCOMING_PAYMENT_ACCESS_TOKEN)

const createIncomingPaymentAccessToken = async () => {

    console.log("Creando un Incoming Payment...");
    console.log("Cargando...")
    
    const client = await createAuthenticatedClient({
        walletAddressUrl: WALLET_ADDRESS,
        privateKey: PRIVATE_KEY,
        keyId: KEY_ID,
    })

    console.log("El cliente fue exitosamente creado:", client);

    console.log("Obteniendo wallet address del cliente...")
    // obtener información de wallet address del cliente 
    const walletAddress = await client.walletAddress.get({
        url: WALLET_ADDRESS,
    })

    // Creación de grant de autorización para crear un Incoming Payment
    const grant = await client.grant.request(
        {
            url: walletAddress.authServer,
        },
        {
            access_token: {
            access: [
                {
                type: "incoming-payment",
                actions: ["list", "read", "read-all", "complete", "create"],
                },
            ],
            },
        },
    );

    if (isPendingGrant(grant)) {
        throw new Error("Expected non-interactive grant");
    }

    console.log("INCOMING_PAYMENT_ACCESS_TOKEN =", grant.access_token.value);
    console.log("INCOMING_PAYMENT_ACCESS_TOKEN_MANAGE_URL = ", grant.access_token.manage);
}

createIncomingPaymentAccessToken();
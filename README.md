# Open Payments Demo

Este repositorio contiene una aplicación de ejemplo construida con **Node.js** y **Express**, diseñada para demostrar la integración con Open Payments.  

---

## Requisitos previos

Antes de comenzar, asegúrate de tener instalado en tu máquina:

- [Node.js](https://nodejs.org/) (versión 18.x o superior recomendada)  
- [npm](https://www.npmjs.com/) 

---

## Instalación

1. Clonar el repositorio:

   ```bash
   git clone https://github.com/<tu-org>/open-payments-demo.git
   cd open-payments-demo

2. Instalar dependencias
  ```
  npm install
  ```

## Variables de entorno
Crea un archivo .env en la raíz del proyecto con el siguiente contenido (ajústalo según tu configuración):
  ```
  WALLET_ADDRESS=dirección de wallet
  KEY_ID=
  PRIVATE_KEY= (tiene que tener 118 caracteres)
  ```

## Ejecución
  ```
  npm start
  ```

## Contribución
1. Crea una nueva rama para tu feature o fix:
   ```
   git checkout -b feature/nueva-funcionalidad
   ```

2. Haz tus cambios y commitea:
   ```
   git add . y git commit -m "Agrega nueva funcionalidad"
   ```
3. Sube tu rama y abre un Pull Request 🚀





# OMS Frontend - React & Tailwind CSS

Interfaz administrativa moderna para el sistema de gestión de órdenes.

## 🛠 Tecnologías

- **Framework**: React 18 (Vite)
- **Styling**: Tailwind CSS
- **Charts**: Chart.js + react-chartjs-2
- **Icons**: Lucide React
- **HTTP**: Axios
- **Routing**: React Router DOM

## 📂 Estructura Clave

- `/src/api`: Capa de servicios que conecta con el backend.
- `/src/components`: Componentes reutilizables.
    - `/orders`: Lógica compleja de creación y gestión de órdenes (Wizard form).
    - `/dashboard`: Gráficos y KPIs.
- `/src/pages`: Vistas principales enrutadas.
- `/src/hooks`: Lógica de estado personalizada (Custom Hooks).

## 🚀 Setup

1. Instalar dependencias:
   ```bash
   npm install
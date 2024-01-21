import { useState } from 'react'
import './App.css'

function App() {

  const [consumo, setConsumo] = useState(0)
  const [fornecedores, setFornecedores] = useState([])
  const [melhorFornecedor, setMelhorFornecedor] = useState(null)

  const handleConsumoChange = (e) => {
    setConsumo(e.target.value)
  }

  const buscarMelhorFornecedor = async () => {
    try {
      const response = await fetch(`http://localhost:8080/fornecedores/melhor?consumo=${consumo}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      const data = await response.json();
      setMelhorFornecedor(data);
    } catch (error) {
      console.error('Erro ao buscar o melhor fornecedor:', error);
    }
  };

  return (
    <>
      <h1 data-testid="cypress-title">Escolha de Fornecedor de Energia</h1>
      <label>Informe o consumo mensal de energia (kWh):</label>
      <input type="number" value={consumo} onChange={handleConsumoChange} />
      <button  onClick={buscarMelhorFornecedor}>Buscar Melhor Fornecedor (GET)</button>

      {melhorFornecedor && (
        <div>
          <h2>Melhor Fornecedor:</h2>
          <p>Nome: {melhorFornecedor.nome}</p>
          <p>Logo: {melhorFornecedor.logo}</p>
          <p>Estado de Origem: {melhorFornecedor.estadoOrigem}</p>
          <p>Custo por kWh: {melhorFornecedor.custoPorKwh}</p>
          <p>Limite Mínimo de kWh: {melhorFornecedor.limiteMinimoKwh}</p>
          <p>Número Total de Clientes: {melhorFornecedor.numeroTotalClientes}</p>
          <p>Avaliação Média dos Clientes: {melhorFornecedor.avaliacaoMediaClientes}</p>
        </div>
      )}

    </>
  )
}

export default App

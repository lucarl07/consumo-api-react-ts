import {useEffect, useState} from "react";
import type {Aviso, Consulta} from "./types";
import HorizontalRule from "./components/HorizontalRule.tsx";
import {listarAvisos} from "./api";

function App() {
  const [consulta, setConsulta] = useState<Consulta>({ status: 'carregando' })

  useEffect(() => {
    const controle = new AbortController()

    listarAvisos(controle.signal)
      .then(dados => {
        if (!controle.signal.aborted) setConsulta({ status: 'sucesso', dados })
      })
      .catch(() => {
        if (!controle.signal.aborted) setConsulta({
          status: 'erro',
          mensagem: 'Não foi possível carregar os avisos. Confira se a API está ligada.'
        });
      })
  }, [])

  return (
    <>
      <header className="flex flex-row justify-between items-center p-6 w-full bg-blue-800">
        <hgroup className="font-bold text-white">
          <p className="uppercase">
            Front-End Frameworks · Aula 10
          </p>
          <h1 className="text-2xl">
            Mural de Avisos
          </h1>
        </hgroup>
        <p className="font-semibold text-white">
          Publique os lembretes da turma e mantenha todos informados.
        </p>
      </header>

      <main>
        <section className="p-4">
          <hgroup className="*:inline">
            <h2>
              Avisos da turma &#8203;
            </h2>
            <span>(x)</span> {/* TODO: Quantidade de avisos */}
          </hgroup>
          <HorizontalRule type="section" />
          <ol className="list-none">
            {consulta.status === "sucesso" && consulta.dados.map((aviso) => (
              <>
                <li>{aviso.titulo}</li>
                <HorizontalRule type="list" />
              </>
            ))}
          </ol>
        </section>
      </main>
    </>
  )
}

export default App

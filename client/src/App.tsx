import Game from "./components/Game";

function App() {
  return (
    <div className="min-h-screen bg-paper text-ink flex flex-col">

      <main className="flex-1 flex flex-col items-center px-4 pt-10 pb-6 gap-6">

        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-wide comic-wobble text-center">
          TIC TAC TOE
        </h1>

        <Game />

      </main>

      <footer className="py-4 text-sm text-center opacity-70 font-comic">
        © Kirti 2026
      </footer>

    </div>
  );
}

export default App;

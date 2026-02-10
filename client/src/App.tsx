import Game from "./components/Game";

function App() {
  return (
     <div className="min-h-screen bg-paper text-ink flex flex-col">
      {/* Title OUTSIDE the card */}
    <h1 className="font-comic text-5xl text-center mb-4 tracking-wide rotate-[-1deg]">
                Tic-Tac-Toe</h1>
    
      {/* MAIN CONTENT */}
      <main className="flex-1 flex items-center justify-center px-4">
        <Game />
      </main>

      {/* FOOTER */}
      <footer className="pb-4 text-sm text-center opacity-70 font-comic">
        © Kirti 2026
      </footer>

    </div>
    
  );
}

export default App;

import Game from "./components/Game";

function App() {
  return (
     <div className="min-h-screen bg-paper text-ink flex flex-col">
    <main className="flex-1 flex flex-col items-center justify-center px-4 gap-6">

   
    <h1 className="text-5xl md:text-6xl font-extrabold tracking-wide comic-wobble">
      TIC TAC TOE
    </h1>
     
        <Game />

     </main>
      
      <footer className="pb-4 text-sm text-center opacity-70 font-comic">
        © Kirti 2026
      </footer>

      
 

    </div>
    
  );
}

export default App;

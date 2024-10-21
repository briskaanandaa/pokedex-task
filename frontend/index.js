let pokemonData = [];

// Fetch data from mock server
async function fetchPokemon() {
  try {
    const response = await fetch("http://localhost:3000/pokemon");
    if (!response.ok) {
      throw new Error("http call failed");
    }
    const data = await response.json();
    pokemonData = data;
    renderApp();
  } catch (error) {
    console.error("Failed to fetch Pokemon data:", error);
    renderApp();
  }
}

// Card component
function PokemonCard(props) {
  return React.createElement(
    "div",
    {
      className:
        "bg-white border-4 border-white rounded-lg m-1 shadow-lg w-44 h-60 transform transition-all hover:shadow-xl hover:translate-y-2 ",
    },
    React.createElement("img", {
      src: props.image,
      alt: props.name,
      className: "w-44 h-44 mx-auto object-cover bg-slate-900 p-2 rounded-lg",
    }),
    React.createElement(
      "h2",
      { className: "text-lg font-bold text-center m-2 text-slate-900" },
      props.name
    ),
    React.createElement(
      "p",
      {
        className:
          "text-xs text-center text-white bg-slate-900 px-4 py-1 rounded-full w-fit mx-auto font-rubik",
      },
      `Type: ${props.types}`
    )
  );
}

// List component
function PokemonList() {
  if (pokemonData.length === 0) {
    return React.createElement(
      "p",
      { className: "text-center text-xl text-gray-500 mt-10" },
      "Loading Pokemon data..."
    );
  }

  return React.createElement(
    "div",
    {
      className:
        "grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 xl:grid-cols-7 2xl:grid-cols-10 gap-6 sm:p-10 p-5 justify-items-center",
    },
    pokemonData.map((pokemon) =>
      React.createElement(PokemonCard, {
        key: pokemon.id,
        name: pokemon.name,
        types: pokemon.types.join("/"),
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`,
      })
    )
  );
}

// App component wrap header and list
function App() {
  return React.createElement(
    "div",
    {
      className: "bg-slate-200 min-h-screen font-rubik",
    },
    React.createElement(
      "header",
      { className: "text-center p-10" },
      React.createElement(
        "h1",
        {
          className: "text-7xl text-slate-900 font-extrabold mt-10",
        },
        "Pokedex"
      ),
      React.createElement(
        "p",
        { className: "text-black text-lg mt-4 font-medium" },
        "Discover the world of Pokémon!"
      )
    ),
    React.createElement(PokemonList, null),
    //Footer Component
    React.createElement(
      "footer",
      { className: "text-black text-lg font-medium p-8 text-center bg-white" },
      "Made with love by Briska Ananda"
    )
  );
}

// Function to render the app
function renderApp() {
  ReactDOM.render(React.createElement(App), document.getElementById("root"));
}

// Initial render
renderApp();

// Fetch and display the Pokemon data
fetchPokemon();

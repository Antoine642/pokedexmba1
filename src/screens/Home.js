import generations from "../components/generations";
function Home(props) {
  
  return (
    <div className="m-3">
        <h1>Pikamoon !</h1>
        <p>Choisissez une génération</p>
        <ul>
            {generations.map((generation) => (
                <li key={generation.id}>
                    <a href={"/generation/" + generation.id}>{generation.name}</a>
                </li>
            ))}
        </ul>
    </div>
  )
}

export default Home;
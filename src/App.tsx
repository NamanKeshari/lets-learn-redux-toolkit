import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { amountAdded } from "./feature/counter/counter-slice";
import { useFetchBreedQuery } from "./feature/dogs/dogs-api-slice";
import { useState } from "react";

function App() {
  const [numDogs, setNumDogs] = useState<number>(10);
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();
  const { data = [], isFetching } = useFetchBreedQuery(numDogs);

  const handleClick = () => {
    // increments by 1
    // dispatch(incremented());

    // increments by a fixed amount
    dispatch(amountAdded(5));
  };

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={handleClick}>count is {count}</button>
        <div>
          <p>Number of dogs fetched: {data.length}</p>
          <select
            value={numDogs}
            onChange={(e) => setNumDogs(Number(e.target.value))}
          >
            <option value={"5"}>5</option>
            <option value={"10"}>10</option>
            <option value={"15"}>15</option>
            <option value={"20"}>20</option>
          </select>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Picture</th>
              </tr>
            </thead>
            <tbody>
              {isFetching ? (
                <div>Loading</div>
              ) : (
                data.map((breed) => (
                  <tr key={breed.id}>
                    <td>{breed.id}</td>
                    <td>
                      <img src={breed.url} alt={breed.id} height={250} />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;

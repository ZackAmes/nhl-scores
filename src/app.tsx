import { useState } from 'react';
 
const App = (data: any) => {
  const [count, setCount] = useState(0);
  console.log(data);
 
  return (
    <main>

      <h1>App</h1>
      <p>Lorem Ipsum</p>
      <div>
        <div>{count}</div>
        <button onClick={() => setCount(count + 1)}>Count</button>
      </div>
    </main>
  );
};
 
export default App

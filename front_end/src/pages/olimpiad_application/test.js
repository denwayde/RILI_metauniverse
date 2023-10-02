const ChildComponent = (props) => {
    const [value, setValue] = useState('');
  
    return (
      <div>
        <input type="text" value={value} onChange={(event) => setValue(event.target.value)} />
        <button onClick={() => props.onValueChange(value)}>Submit</button>
      </div>
    );
  };
  
  function ParentComponent() {
    function handleValueChange(newValue) {
      console.log(`Received value from child:`, newValue);
    }
    
    return <ChildComponent onValueChange={handleValueChange} />;
  }
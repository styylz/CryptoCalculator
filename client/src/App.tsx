import React, { useEffect, useState } from "react";
import "./App.css";
import { Input } from "./components/Input";
import Select from "./components/Select";
import { format } from "./helpers/format";

interface InputListProps {
  title: string;
}

interface Result {
  EUR: string;
  GBP: string;
  USD: string;
}


const App: React.FC = () => {
  const [inputList, setInputList] = useState<InputListProps[]>([]);
  const [_, setCurrencyTo] = useState<string>("USD");
  const [btcAmount, setBtcAmount] = useState<number>(0);
  const [result, setResult] = useState<Result>({
    EUR: "",
    GBP: "",
    USD: "",
  });
  const [last, setLast] = useState({
    EUR: 1,
    GBP: 1,
    USD: 1,
  });

  const handleChange = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setBtcAmount(+value);
    setResult({
      ...result,
      EUR: `€ ${format(+value / last["EUR"])}`,
      GBP: `£ ${format(+value / last["GBP"])}`,
      USD: `$ ${format(+value / last["USD"])}`,
    });
  };

  const handleSelectValue = ({
    target: { value },
  }: React.ChangeEvent<HTMLSelectElement>) => {
    const index = inputList.findIndex(({ title }) => title === value);

    if (inputList.length < 3 && index === -1 && value !== "disabled") {
      setInputList([...inputList, { title: value }]);
      setCurrencyTo(value);
    }
    return;
  };

  const handleRemoveInput = (name: string) => {
    setInputList(inputList.filter((item) => item.title !== name));
  };

  useEffect(() => {
    const getDataAndSetLast = async () => {
      await Promise.all([
        fetch("https://spectrocoin.com/scapi/ticker/BTC/EUR"),
        fetch("https://spectrocoin.com/scapi/ticker/BTC/GBP"),
        fetch("https://spectrocoin.com/scapi/ticker/BTC/USD"),
      ])
        .then((responses) =>
          Promise.all(responses.map((response) => response.json()))
        )
        .then((data) => {
          const lastArr = data.map(({ last, currencyTo }) => ({
            ...last,
            [currencyTo]: last,
          }));

          setLast(Object.assign({}, ...lastArr));
        })
        .catch((error) => {
          throw new Error(error);
        });
    };
    getDataAndSetLast();

    const interval = setInterval(() => {
      (() => {
        getDataAndSetLast();
      })();
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="section-wrapper">
      <div className="container">
        <div className="form-container">
          <Input
            label="Crypto Amount"
            value={btcAmount}
            type="number"
            id="cryptoAmount"
            placeholder="Enter your Crypto Amount"
            handleChange={handleChange}
          />

          {inputList.map(({ title }) => (
            <>
                <Input
                  label={title}
                  value={result[title as keyof Result]}
                  type="text"
                  id="currencyField"
                  readOnly
                >
                  <button
                    className="inputButton"
                    onClick={() => handleRemoveInput(title)}
                  >
                    x
                  </button>
                </Input>
            </>
          ))}

          {inputList.length < 3 ? (
            <Select onChange={handleSelectValue} />
          ) : (
            ''
          )}
        </div>
      </div>
    </div>
  );
};

export default App;

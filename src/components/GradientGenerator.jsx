import React, { useState } from "react";

const GradientGenerator = () => {
  const [currentGradient, setCurrentGradient] = useState({
    start: "#ffffff",
    end: "#000000",
  });
  const [currentDirection, setCurrentDirection] = useState("to bottom");
  const [prevGradients, setPrevGradients] = useState([]);

  const directions = [
    { value: "to top", label: "Вверх" },
    { value: "to right", label: "Вправо" },
    { value: "to bottom", label: "Вниз" },
    { value: "to left", label: "Влево" },
  ];

  const generateGradient = () => {
    const newGradient = {
      start:
        "#" + ((Math.random() * 0xffffff) << 0).toString(16).padStart(6, "0"),
      end:
        "#" + ((Math.random() * 0xffffff) << 0).toString(16).padStart(6, "0"),
    };

    const newDirection =
      directions[Math.floor(Math.random() * directions.length)].value;
    setPrevGradients([
      ...prevGradients,
      { ...currentGradient, direction: currentDirection },
    ]);

    setCurrentGradient({ ...newGradient, direction: newDirection });
    setCurrentDirection(newDirection);

    document.body.style.background = `linear-gradient(${newDirection}, ${newGradient.start}, ${newGradient.end})`;
  };

  return (
    <div className="gradient-generator">
      <div className="current-gradient" style={{background: `linear-gradient(${currentDirection}, ${currentGradient.start}, ${currentGradient.end})`,}}>
        <h2>Текущий градиент</h2>
        <p>
          Цвета: {currentGradient.start} - {currentGradient.end}
        </p>
        <p>Направление: {currentDirection}</p>
        <p>
          Код для css: linear-gradient({currentDirection},{" "}
          {currentGradient.start}, {currentGradient.end})
        </p>
      </div>

      <div className="button-wrapper">
        <button onClick={generateGradient}>Сгенерировать новый градиент</button>
      </div>
      
      <div className="prev-gradients-list">
        {prevGradients.map(({ start, end, direction }, index) => (
          <div
            key={index}
            className="prev-gradient"
            style={{
              background: `linear-gradient(${direction}, ${start}, ${end})`,
            }}
            onClick={() => {
              setCurrentGradient({ start, end, direction });
              setCurrentDirection(direction);
              document.body.style.background = `linear-gradient(${direction}, ${start}, ${end})`;
            }}
          >
            <p>Градиент {index + 1}</p>
            <p>
              Цвета: {start} - {end}
            </p>
            <p>Направление: {direction}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GradientGenerator;

import { useEffect, useState } from "react";
import "./CircleBoxComponent.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";

export interface CircleBoxComponentProps {
  numberOfBoxes: number;
  timeset: number;
}

export interface ICoordinate {
  x: number;
  y: number;
}

const CircleBoxComponent = ({
  numberOfBoxes,
  timeset,
}: CircleBoxComponentProps) => {
  const [boxPositions, setBoxPositions] = useState<ICoordinate[]>([]);
  const radius = 38; // You can adjust the radius as needed
  const [number, setNumber] = useState<number>(1);
  const [hide, setHide] = useState<boolean>(false);
  const [timerActive, setTimerActive] = useState<boolean>(false);
  const [seconds, setSeconds] = useState<number>(0);
  console.log(seconds);

  const toggleHide = () => {
    if (!timerActive) {
      if (hide) {
        setTimerActive(true);
      }

      setHide((h) => !h);
    }
  };

  const chooseNumber = (number: number) => {
    if (!timerActive) {
      setNumber(number + 1);
    }
  };

  useEffect(() => {
    const calculateBoxPositions = () => {
      const positions = [];

      for (let i = 0; i < numberOfBoxes; i++) {
        const angle = (i / numberOfBoxes) * 2 * Math.PI;
        const x = radius * Math.cos(angle - Math.PI / 2);
        const y = radius * Math.sin(angle - Math.PI / 2);
        positions.push({ x, y });
      }

      setBoxPositions(positions);
    };

    calculateBoxPositions();
  }, [numberOfBoxes]);

  useEffect(() => {
    if (timerActive) {
      // Function to update the timer every second
      const updateTimer = () => {
        setSeconds((prevSeconds) => prevSeconds + 1);
      };

      // Set up an interval to call updateTimer every second
      const intervalId = setInterval(updateTimer, 1000);

      // Cleanup function to clear the interval when the component is unmounted
      return () => clearInterval(intervalId);
    }
  }, [timerActive, seconds]);

  useEffect(() => {
    if (seconds >= timeset) {
      setSeconds(0);
      setTimerActive(false);
    }
  }, [seconds]);

  return (
    <div className="circle-box-container">
      <CenterButton
        hide={hide}
        number={number}
        toggleHide={toggleHide}
        timerActive={timerActive}
      />
      {boxPositions.map((position, index) => (
        <TimerBall
          key={index}
          chooseNumber={chooseNumber}
          index={index}
          numberOfBalls={numberOfBoxes}
          position={position}
          radius={radius}
          seconds={seconds}
          timerActive={timerActive}
          timeset={timeset}
        />
      ))}
    </div>
  );
};

interface CenterButtonProps {
  toggleHide: () => void;
  hide: boolean;
  number: number;
  timerActive: boolean;
}

const CenterButton = ({
  hide,
  number,
  toggleHide,
  timerActive,
}: CenterButtonProps) => {
  const color = !timerActive ? " bg-orange-600" : " bg-green-600";

  const className =
    "flex items-center justify-center w-[30vw] h-[30vw] rounded-full text-5xl text-white" +
    color;

  return (
    <div className="h-full flex items-center justify-center">
      <div className={className + " select-none"} onClick={toggleHide}>
        {!hide && number}
        {hide && <FontAwesomeIcon icon={faEye} />}
      </div>
    </div>
  );
};

interface TimerBallProps {
  index: number;
  position: ICoordinate;
  radius: number;
  chooseNumber: (number: number) => void;
  seconds: number;
  timerActive: boolean;
  numberOfBalls: number;
  timeset: number;
}

const TimerBall = (props: TimerBallProps) => {
  const GetColor = () => {
    if (!props.timerActive) {
      return " bg-[#006857]";
    }
    if (props.seconds / props.timeset < props.index / props.numberOfBalls) {
      return " bg-[#006857]";
    }
    return " bg-orange-600";
  };
  const className = "circle-box" + GetColor();
  console.log(className);

  return (
    <div
      key={props.index}
      className={className + " select-none"}
      style={{
        top: `${props.position.y + props.radius}vw`,
        left: `${props.position.x + props.radius}vw`,
      }}
      onClick={() => props.chooseNumber(props.index)}
    >
      {/* You can customize the content of each box if needed */}
      {props.index + 1}
    </div>
  );
};

export default CircleBoxComponent;

import "./App.css";
import { useState, useRef, useEffect } from "react";

const sense_radius = 100;
const screensize = 400;
const turn_factor = 0.01;
const bird_height = 24;
const bird_width = 12;

function degrees_to_radians(degrees) {
  var pi = Math.PI;
  return degrees * (pi / 180);
}

function Bird(props) {
  return (
    <g transform={`translate(${props.x} ${props.y}) rotate(${props.heading})`}>
      <polygon
        points={`${-(bird_width / 2)},${bird_height / 2} 
        0,${-(bird_height / 2)} 
        ${bird_width / 2},${bird_height / 2}`}
        fill="#999"
      />
    </g>
  );
}

function App() {
  const randomBird = (i) => {
    return {
      id: i,
      x: Math.floor(Math.random() * screensize),
      y: Math.floor(Math.random() * screensize),
      heading: Math.floor(Math.random() * 360),
    };
  };

  const [flock, setFlock] = useState([...Array(30).keys()].map(randomBird));

  const requestRef = useRef();
  const thenRef = useRef(Date.now());
  function step(current) {
    // get neighbours
    const nbs = current.map((bird) => {
      return current.filter((nb) => {
        if (nb.id === bird.id) {
          return false;
        }
        return (bird.x - nb.x) ** 2 + (bird.y - nb.y) ** 2 <= sense_radius ** 2;
      });
    });

    // average position and heading of neighbours
    const averages = nbs.map((bird_nbs) => {
      if (bird_nbs.length > 0) {
        const totals = bird_nbs.reduce(
          (acc, nb) => {
            return {
              x: acc.x + nb.x,
              y: acc.y + nb.y,
              heading: acc.heading + nb.heading,
            };
          },
          { x: 0, y: 0, heading: 0 }
        );
        return {
          x: totals.x / bird_nbs.length,
          y: totals.y / bird_nbs.length,
          heading: totals.heading / bird_nbs.length,
        };
      } else {
        return null;
      }
    });

    // update headings trying to achieve alignment with neighbours
    const updated = current.map((bird, index) => {
      const average = averages[index];
      if (!average) {
        return bird;
      }
      let newHeading;
      // Alignment
      let deltaHeading = turn_factor * (bird.heading - average.heading);
      deltaHeading = Math.min(3, Math.max(-3, deltaHeading));
      newHeading = bird.heading + deltaHeading;

      return {
        id: bird.id,
        x: bird.x + Math.sin(degrees_to_radians(bird.heading)),
        y: bird.y - Math.cos(degrees_to_radians(bird.heading)),
        heading: newHeading % 360,
      };
    });

    const wrap = (pos, screensize) => {
      if (pos < 0 - bird_height) {
        return screensize + bird_height;
      }
      if (pos > screensize + bird_height) {
        return 0;
      }
      return pos;
    };

    // calculate new positions
    const newFlock = updated.map((bird) => {
      return {
        id: bird.id,
        x: wrap(
          bird.x + Math.sin(degrees_to_radians(bird.heading)),
          screensize
        ),
        y: wrap(
          bird.y - Math.cos(degrees_to_radians(bird.heading)),
          screensize
        ),
        heading: bird.heading,
      };
    });

    return newFlock;
  }

  const animate = (time) => {
    requestRef.current = requestAnimationFrame(animate);
    const now = Date.now();
    const elapsed = now - thenRef.current;
    if (elapsed > 1000 / 30) {
      setFlock((currentFlock) => step(currentFlock));
    }
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <svg id="cvs" viewBox={`0 0 ${screensize} ${screensize}`}>
        <rect
          x="0"
          width={screensize}
          y="0"
          height={screensize}
          fill="#eee"
        ></rect>
        {flock.map((bird, index) => {
          return (
            <Bird
              key={index}
              x={bird.x}
              y={bird.y}
              heading={bird.heading}
            ></Bird>
          );
        })}
      </svg>
    </>
  );
}

export default App;

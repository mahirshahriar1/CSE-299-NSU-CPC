import React, { useEffect, useState, useRef } from "react";

const Stepper = ({ steps, currentStep }) => {
  const [newStep, setNewStep] = useState([]);
  const stepRef = useRef();

  useEffect(() => {
    const updateStep = (stepNumber, steps) => {
      const newSteps = [...steps];
      let count = 0;
      while (count < newStep.length) {
        // Current step
        if (count === stepNumber) {
          newSteps[count] = {
            ...newSteps[count],
            highlighted: true,
            selected: true,
            completed: count === newStep.length - 1,
          };
          count++;
        }
        // Step completed
        else if (count < stepNumber) {
          newSteps[count] = {
            ...newSteps[count],
            highlighted: false,
            selected: true,
            completed: true,
          };
          count++;
        }
        // Step pending
        else {
          newSteps[count] = {
            ...newSteps[count],
            highlighted: false,
            selected: false,
            completed: false,
          };
          count++;
        }
      }
      return newSteps;
    };

    // create object
    const stepsState = steps.map((step, index) =>
      Object.assign(
        {},
        {
          description: step,
          completed: false,
          highlighted: index === 0,
          selected: index === 0,
        }
      )
    );

    stepRef.current = stepsState;
    const current = updateStep(currentStep - 1, stepRef.current);
    setNewStep(current);
  }, [steps, currentStep, newStep.length]);

  const displaySteps = newStep.map((step, index) => {
    return (
      <div
        key={index}
        className={
          index !== newStep.length - 1
            ? "w-full flex items-center"
            : "flex items-center"
        }
      >
        <div className="relative flex flex-col items-center text-teal-600">
          <div
            className={`rounded-full transition duration-500 ease-in-out 
                        border-2 border-gray-300 h-12 w-12 
                        flex items-center justify-center py-3 
                        ${
                          step.selected
                            ? "bg-green-600 text-white font-bold border border-green-600"
                            : ""
                        }`}
          >
            {
              /* Display number */
              step.completed ? (
                <span className="text-white font-bold text-xl">&#10003;</span>
              ) : (
                index + 1
              )
            }
          </div>

          <div
            className={`absolute top-0 text-center mt-16 w-32 text-xs font-medium uppercase ${
              step.highlighted ? "text-gray-900" : "text-gray-400"
            }`}
          >
            {/* Display description */ step.description}
          </div>
        </div>

        <div
          className={`flex-auto border-t-2 transition duration-500 ease-in-out ${
            step.completed ? "border-green-600" : "border-gray-300"
          }`}
        >
          {/* Display line */}
        </div>
      </div>
    );
  });

  return (
    <div className="mx-4 p-4 flex justify-between items-center">
      {displaySteps}
    </div>
  );
};

export default Stepper;

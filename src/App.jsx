import { useState } from "react";
import "./App.css";

function App() {
  const [subject, setSubject] = useState("Mathematics");
  const [priority, setPriority] = useState("Medium");
  const [subjectDate, setSubjectDate] = useState("");

  const [subjects, setSubjects] = useState([]);
  const [plan, setPlan] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);

  const addSubject = () => {
    if (!subjectDate) {
      alert("Please select exam date");
      return;
    }

    const exists = subjects.some(
      (s) =>
        s.name === subject &&
        s.examDate === subjectDate
    );

    if (exists) {
      alert("Subject already added");
      return;
    }

    setSubjects([
      ...subjects,
      {
        name: subject,
        priority,
        examDate: subjectDate,
      },
    ]);

    setSubjectDate("");
  };

  const deleteSubject = (indexToDelete) => {
    const updatedSubjects = subjects.filter(
      (_, index) => index !== indexToDelete
    );

    setSubjects(updatedSubjects);

    setPlan(
      plan.filter(
        (_, index) => index !== indexToDelete
      )
    );
  };

  const generatePlan = () => {
    if (subjects.length === 0) {
      alert("Add subjects first");
      return;
    }

    const today = new Date();

    const generatedPlan = subjects.map(
      (sub) => {
        const exam = new Date(
          sub.examDate
        );

        const daysLeft = Math.ceil(
          (exam - today) /
            (1000 * 60 * 60 * 24)
        );

        let hours;

        if (daysLeft <= 7) {
          hours = 5;
        } else if (daysLeft <= 14) {
          hours = 4;
        } else {
          hours = 2;
        }

        if (sub.priority === "High")
          hours += 1;

        if (sub.priority === "Low")
          hours -= 1;

        if (hours < 1) hours = 1;

        return {
          ...sub,
          daysLeft,
          hours,
        };
      }
    );

    generatedPlan.sort(
      (a, b) =>
        a.daysLeft - b.daysLeft
    );

    setPlan(generatedPlan);
  };

  const toggleTask = (subjectName) => {
    if (
      completedTasks.includes(subjectName)
    ) {
      setCompletedTasks(
        completedTasks.filter(
          (task) => task !== subjectName
        )
      );
    } else {
      setCompletedTasks([
        ...completedTasks,
        subjectName,
      ]);
    }
  };

  const progress =
    plan.length === 0
      ? 0
      : Math.round(
          (completedTasks.length /
            plan.length) *
            100
        );

  const nearestExam =
    plan.length > 0
      ? plan.reduce((a, b) =>
          a.daysLeft < b.daysLeft ? a : b
        )
      : null;

  return (
    <div className="app">
      <h1 className="title">
         Smart Study Planner
      </h1>

      <div className="card">
        <h2>Add Subject</h2>

        <select
          value={subject}
          onChange={(e) =>
            setSubject(e.target.value)
          }
        >
          <option>Mathematics</option>
          <option>Physics</option>
          <option>Chemistry</option>
          <option>Biology</option>
          <option>English</option>
          <option>Computer Science</option>
          <option>History</option>
          <option>Geography</option>
        </select>

        <input
          type="date"
          value={subjectDate}
          onChange={(e) =>
            setSubjectDate(e.target.value)
          }
        />

        <select
          value={priority}
          onChange={(e) =>
            setPriority(e.target.value)
          }
        >
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>

        <button onClick={addSubject}>
          Add Subject
        </button>

        <h3>Added Subjects</h3>

        {subjects.length === 0 ? (
          <p>No subjects added</p>
        ) : (
          subjects.map((sub, index) => (
            <div
              key={index}
              className="subject-item"
            >
              <strong>
                {sub.name}
              </strong>

              <br />

              Priority:
              {" "}
              {sub.priority}

              <br />

              Exam Date:
              {" "}
              {sub.examDate}

              <br />
              <br />

              <button
                className="delete-btn"
                onClick={() =>
                  deleteSubject(index)
                }
              >
                 Delete
              </button>
            </div>
          ))
        )}
      </div>

      <div className="card">
        <button
          className="generate-btn"
          onClick={generatePlan}
        >
          Generate Study Plan
        </button>
      </div>

      <div className="dashboard">
        <div className="stat">
          <h2>{subjects.length}</h2>
          <p>Subjects</p>
        </div>

        <div className="stat">
          <h2>
            {completedTasks.length}
          </h2>
          <p>Completed</p>
        </div>

        <div className="stat">
          <h2>{progress}%</h2>
          <p>Progress</p>
        </div>

        <div className="stat">
          <h2>
            {nearestExam
              ? nearestExam.daysLeft
              : 0}
          </h2>
          <p>Nearest Exam</p>
        </div>
      </div>

      <div className="card">
        <h2>Generated Schedule</h2>

        {plan.length === 0 ? (
          <p>
            Click Generate Study
            Plan
          </p>
        ) : (
          plan.map((item, index) => (
            <div
              key={index}
              className="schedule-item"
            >
              <label>
                <input
                  type="checkbox"
                  checked={completedTasks.includes(
                    item.name
                  )}
                  onChange={() =>
                    toggleTask(item.name)
                  }
                />

                {" "}
                <strong>
                  {item.name}
                </strong>
              </label>

              <br />

              Priority:
              {" "}
              {item.priority}

              <br />

              Exam In:
              {" "}
              {item.daysLeft}
              {" "}
              days

              <br />

              Recommended:
              {" "}
              {item.hours}
              {" "}
              hrs/day
            </div>
          ))
        )}
      </div>

      <div className="footer">
        <p>
          <strong>Name:</strong>
          {" "}
          Janhavi B
        </p>

        <p>
          <strong>Email:</strong>
          {" "}
          janhavib108@gmail.com
        </p>

      </div>
    </div>
  );
}

export default App;

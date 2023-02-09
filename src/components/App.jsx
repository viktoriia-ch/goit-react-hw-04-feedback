import { useState } from 'react';

import Statistics from './Statistics/Statistics';
import FeedbackOptions from './FeedbackOptions/FeedbackOptions';
import Section from './Section/Section';
import Notification from './Notification/Notification';

const App = () => {
  const [state, setState] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
  });

  const addFeedback = event => {
    const prop = event.target.textContent;
    setState(prevState => ({ ...prevState, [prop]: prevState[prop] + 1 }));
  };

  const countTotalFeedback = () => {
    return Object.values(state).reduce((acc, value) => acc + value, 0);
  };

  const countPositiveFeedbackPercentage = () => {
    const percentage = (100 * good) / countTotalFeedback();
    return percentage ? Math.round(percentage) : 0;
  };

  const { good, neutral, bad } = state;
  const keys = Object.keys(state);
  const total = countTotalFeedback();
  const positivePercentage = countPositiveFeedbackPercentage();

  return (
    <>
      <Section title="Please leave feedback!">
        <FeedbackOptions options={keys} onLeaveFeedback={addFeedback} />
      </Section>
      <Section title="Statistics">
        {total >= 1 ? (
          <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            total={total}
            positivePercentage={positivePercentage}
          />
        ) : (
          <Notification message="There is no feedback" />
        )}
      </Section>
    </>
  );
};
export default App;

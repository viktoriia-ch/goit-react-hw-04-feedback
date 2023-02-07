import { Component } from 'react';

import Statistics from './Statistics/Statistics';
import FeedbackOptions from './FeedbackOptions/FeedbackOptions';
import Section from './Section/Section';
import Notification from './Notification/Notification';

class App extends Component {
  state = {
    good: 0,
    neutral: 0,
    bad: 0,
  };

  addFeedback = event => {
    const prop = event.target.textContent;

    this.setState(prevState => {
      return {
        [prop]: prevState[prop] + 1,
      };
    });
  };

  countTotalFeedback = () => {
    const total = Object.values(this.state).reduce(
      (acc, value) => (acc += value),
      0
    );
    return total ? total : 0;
  };

  countPositiveFeedbackPercentage = () => {
    const goodFeedback = this.state.good;
    const totalFeedback = this.countTotalFeedback();

    const percentage = (100 * goodFeedback) / totalFeedback;
    return percentage ? Math.round(percentage) : 0;
  };

  render() {
    const { good, neutral, bad } = this.state;
    const { addFeedback } = this;

    const total = this.countTotalFeedback();
    const positivePercentage = this.countPositiveFeedbackPercentage();
    const keys = Object.keys(this.state);

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
  }
}

export default App;

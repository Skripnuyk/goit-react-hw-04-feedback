import { useState } from 'react';
import Section from './section';
import Feedback from './feedback';
import Statistics from './statistics';
import Notification from './notification';
import { feedbackState } from '../data/feedbackState';
import { AppWrap } from './App.styled';
import { GlobalStyle } from './GlobalStyled';

export default function App() {
  const [good, setGood] = useState(0);
  const [neutral, SetNeutral] = useState(0);
  const [bad, SetBad] = useState(0);
  

  const HandleChange = name => {
    switch (name) {
      case 'good':
        setGood(good + 1);
        break;
      case 'neutral':
        SetNeutral(neutral + 1);
        break;
      case 'bad':
        SetBad(bad + 1);
        break;
      
      default:
        return;
    }
    

  };

  const countTotalFeedback = () => {
    return good + neutral + bad;
  }

  const countPositiveFeedbackPercentage = () => {
    const total = countTotalFeedback();
    return total ? Math.round((good / total) * 100) : 0;
  }

    return (
      <AppWrap>
        <Section title="Please leave feedback">
          <Feedback
            feedbackState={feedbackState}
            onAddFeedback={HandleChange}
          />
        </Section>
        <Section title="Statistics">
          {countTotalFeedback(null) ? (
            <Statistics
              good={good}
              neutral={neutral}
              bad={bad}
              total={countTotalFeedback()}
              positivePercentage={countPositiveFeedbackPercentage()}
            />
          ) : (
            <Notification message="No feedback given" />
          )}
        </Section>
        <GlobalStyle />
      </AppWrap>
    );
  }

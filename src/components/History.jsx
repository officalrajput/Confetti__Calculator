// History.jsx
import React from 'react';
import styled from 'styled-components';

const HistoryWrapper = styled.div`
  width: 100%;
  max-height: 150px;
  overflow-y: auto;
  background: ${({ thememode }) => (thememode === 'dark' ? '#333' : '#f9f9f9')};
  color: ${({ thememode }) => (thememode === 'dark' ? '#fff' : '#000')};
  border: 1px solid ${({ thememode }) => (thememode === 'dark' ? '#555' : '#ccc')};
  border-radius: 5px;
  padding: 10px;
  box-sizing: border-box;
`;

const HistoryItem = styled.div`
  font-size: 1em;
  margin-bottom: 5px;
`;

const History = ({ history, thememode }) => {
  return (
    <HistoryWrapper thememode={thememode}>
      <h3>History</h3>
      {history.map((item, index) => (
        <HistoryItem key={index}>{item}</HistoryItem>
      ))}
    </HistoryWrapper>
  );
};

export default History;

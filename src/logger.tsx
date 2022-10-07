import React from 'react';

const logList: string[] = [];

function getLogList() {
  return logList;
}

function log(info: string) {
  logList.push(info);
}

function LogList() {
  return (
    <div className={'logger'}>
      {logList.map((info, index) => (
        <div>{info}</div>
      ))}
    </div>
  );
}

export { getLogList, log, LogList };

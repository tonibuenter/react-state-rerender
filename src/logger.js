import React from 'react';

const logList = [];

function getLogList() {
    return logList;
}

function log(info) {
    logList.push(info);
}


function LogList(props) {
    return (<div className={'logger'}>{logList.map((info, index) => <div>{info}</div>)}</div>);
}


export {getLogList, log, LogList};

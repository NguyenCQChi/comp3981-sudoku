import { createContext, ReactNode, useState } from 'react';

interface Props {
  children: ReactNode;
}

interface ResultContextTypes {
  resultBF: any[],
  resultCSP: any[],
  initialBoard: any[],
  timeBF: any,
  timeCSP: any,
  changeResultBF: (result: any) => void,
  changeResultCSP: (result: any) => void,
  changeInitialBoard: (board: any) => void,
  changeTimeBF: (time: any) => void,
  changeTimeCSP: (time: any) => void
}

const ResultContext = createContext<ResultContextTypes>({
  resultBF: [],
  resultCSP: [],
  initialBoard: [],
  timeBF: '',
  timeCSP: '',
  changeResultBF: (result: any) => {},
  changeResultCSP: (result: any) => {},
  changeInitialBoard: (board: any) => {},
  changeTimeBF: (time: any) => {},
  changeTimeCSP: (time: any) => {}
})

const { Provider } = ResultContext

const ResultProvider = (props: Props) => {
  const { children } = props;
  const [resultBF, setResultBF] = useState([]);
  const [resultCSP, setResultCSP] = useState([]);
  const [initialBoard, setInitialBoard] = useState([]);
  const [timeBF, setTimeBF] = useState('');
  const [timeCSP, setTimeCSP] = useState('');

  const changeResultBF = (result: any) => {
    setResultBF(result);
  }

  const changeResultCSP = (result: any) => {
    setResultCSP(result);
  }

  const changeInitialBoard = (board:any) => {
    setInitialBoard(board);
  }
  
  const changeTimeBF = (time: any) => {
    setTimeBF(time)
  }

  const changeTimeCSP = (time: any) => {
    setTimeCSP(time)
  }

  return (
    <Provider
      value={{
        resultBF: resultBF,
        resultCSP: resultCSP,
        initialBoard: initialBoard,
        timeBF: timeBF,
        timeCSP: timeCSP,
        changeResultBF: changeResultBF,
        changeResultCSP: changeResultCSP,
        changeInitialBoard: changeInitialBoard,
        changeTimeBF: changeTimeBF,
        changeTimeCSP: changeTimeCSP
      }}
    >
      {children}
    </Provider>
  )
}

export { ResultContext, ResultProvider }
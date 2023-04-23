import { SelectedType } from '@/@types/SelectedType';
import { fillRows } from '@/utils/fillRows';
import { FC, PropsWithChildren, useState } from 'react';
import st from 'styles/Calculator.module.css';
import CalcData from './CalcData';
import LaminateSchema from './LaminateSchema';

const Calculator: FC<PropsWithChildren<unknown>> = () => {
  const [calcData, setCalcData] = useState<ReturnType<typeof fillRows> | null>(
    null,
  );
  const calc = (data: SelectedType) => {
    const result = fillRows(data);
    console.log(result);
    setCalcData(result);
  };

  return (
    <div className={st.calculator}>
      <CalcData onCalc={calc} />
      {!!calcData && <LaminateSchema {...calcData} />}
    </div>
  );
};

export default Calculator;

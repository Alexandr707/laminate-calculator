import { LaminateDirection } from '@/@types/LaminateDirection';
import { RowType, SelectedType } from '@/@types/SelectedType';
import { ofsetVariants } from '@/data/ofsetVariants';
import Button from 'components/ui/Button';
import Input from 'components/ui/Input';
import { ChangeEvent, FC, PropsWithChildren, useEffect, useState } from 'react';
import DirectionVariant from './DirectionVariant';
import OfsetVariants from './OfsetVariants';

type CE = ChangeEvent<HTMLInputElement>;
type CalcData = {
  onCalc?: (data: SelectedType) => unknown;
};

const M2 = (
  <span>
    M<sup>2</sup>
  </span>
);

const CalcData: FC<PropsWithChildren<CalcData>> = ({ onCalc }) => {
  const [l_room, setL_room] = useState(420);
  const [w_room, setW_room] = useState(290);
  const [l_lam, setL_lam] = useState(60);
  const [w_lam, setW_lam] = useState(30);
  const [nPack, setNPack] = useState(10);
  const [minOst, setMinOst] = useState(2);
  const [packArea, setPackArea] = useState<number | string>(10);
  const [ofsetType, setOfsetType] = useState('1');
  const [direction, setDirection] = useState<LaminateDirection>(
    'Укладка по длине 0°',
  );
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const lamArea = (l_lam / 100) * (w_lam / 100) * nPack;
    setPackArea(+lamArea.toFixed(6));
  }, [nPack, l_lam, w_lam]);

  const calculate = () => {
    // prettier-ignore
    if (
      !l_room 
      || !w_room 
      || !l_lam 
      || !w_lam 
      || !nPack 
      || !minOst 
      || !packArea 
      || l_room <= 0 
      || w_room <= 0 
      || l_lam <= 0 
      || w_lam <= 0 
      || nPack <= 0 
      || minOst <= 0 
      || +packArea <= 0
    )
      setErrorMsg('Проверьте корректность данных');
    else if (onCalc) {
      errorMsg.length && setErrorMsg('');

      let rows:RowType[] = []

        if (direction === 'Укладка по длине 0°'){
        rows = new Array<RowType>(Math.ceil(w_room / w_lam))
          .fill({length:l_room,width:w_lam,x:0,y:0});
          
        rows = rows.map((row,idx)=>({...row, y:(idx+1)*w_lam}))
        rows[rows.length - 1].width = w_room - w_lam * (rows.length - 1)

      } else if(direction === 'Укладка по ширине 90°'){
        rows = new Array<RowType>(Math.ceil(l_room / w_lam))
          .fill({length:w_room, width:w_lam,x:0,y:0});

        rows = rows.map((row,idx)=>({...row, x:(idx+1)*w_lam}))
        rows[rows.length - 1].width = l_room - w_lam * (rows.length - 1)
        rows[rows.length - 1].x -= w_lam - rows[rows.length - 1].width 
      }

      onCalc({
        l_room, w_room, l_lam, w_lam, nPack, minOst, direction, rows,
        packArea: +packArea,
        ofsetType:+ofsetType,
      });
    }
  };

  return (
    <>
      {!!errorMsg && (
        <div style={{ color: 'red', fontWeight: 600, textAlign: 'center' }}>
          {errorMsg}
        </div>
      )}
      <Input
        type='number'
        value={l_room}
        min={0}
        onChange={(e: CE) => setL_room(+e.target.value)}
        label='Длина комнаты:'
        description='сантиметры'
      />
      <Input
        type='number'
        value={w_room}
        min={0}
        onChange={(e: CE) => setW_room(+e.target.value)}
        label='Ширина комнаты:'
        description='сантиметры'
      />
      <Input
        type='number'
        value={l_lam}
        min={0}
        onChange={(e: CE) => setL_lam(+e.target.value)}
        label='Длина плашки:'
        description='сантиметры'
      />
      <Input
        type='number'
        value={w_lam}
        min={0}
        onChange={(e: CE) => setW_lam(+e.target.value)}
        label='Ширина плашки:'
        description='сантиметры'
      />
      <Input
        type='number'
        value={nPack}
        min={0}
        onChange={(e: CE) => setNPack(+e.target.value)}
        label='Число плашек в упаковке:'
        description='Шт.'
      />
      <Input
        type='text'
        value={packArea}
        onInput={(e: CE) => setPackArea(e.target.value)}
        label='Площадь упаковки:'
        description={M2}
      />
      <Input
        type='number'
        value={minOst}
        onInput={(e: CE) => setMinOst(+e.target.value)}
        label='Минимальная длина обрезка:'
        description='сантиметры'
      />
      <OfsetVariants
        label='Способ укладки ламината:'
        variants={ofsetVariants}
        current={ofsetType}
        onChange={setOfsetType}
      />
      <DirectionVariant current={direction} onChange={setDirection} />

      <Button onClick={calculate} style={{ margin: '1rem auto' }}>
        Рассчитать
      </Button>
    </>
  );
};

export default CalcData;

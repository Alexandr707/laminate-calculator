import { SelectedType } from 'types/SelectedType';
import { LaminateDto } from './LaminateDto';
import { Ostatki } from './Ostatki';

export function fillRows(options: SelectedType) {
  const rest = new Ostatki();
  const { rows, ofsetType, l_lam, w_lam } = options;

  const lamCount = new LaminateDto(l_lam, w_lam);

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    let ost = row.length;

    if (!row.tiles) row.tiles = [];

    //смещение 1/2
    if (ofsetType === 1) {
      if (i % 2 === 0) {
        ost -= fillWholePlates(options, i, lamCount, ost);

        if (ost > 0) addSlicePlate(options, i, lamCount, rest, ost);
      } else {
        ost -= addSlicePlate(options, i, lamCount, rest, l_lam / 2);

        ost -= fillWholePlates(options, i, lamCount, ost);

        if (ost > 0) addSlicePlate(options, i, lamCount, rest, ost);
      }
    } else if (ofsetType === 2) {
      //смещение 1/3
      if (i % 3 === 0) {
        ost -= fillWholePlates(options, i, lamCount, ost);

        if (ost > 0) addSlicePlate(options, i, lamCount, rest, ost);
      } else if (i % 3 === 1) {
        ost -= addSlicePlate(options, i, lamCount, rest, l_lam / 3);

        ost -= fillWholePlates(options, i, lamCount, ost);

        if (ost > 0) addSlicePlate(options, i, lamCount, rest, ost);
      } else if (i % 3 === 2) {
        ost -= addSlicePlate(options, i, lamCount, rest, (l_lam / 3) * 2);

        ost -= fillWholePlates(options, i, lamCount, ost);

        if (ost > 0) addSlicePlate(options, i, lamCount, rest, ost);
      }
    }
  }

  return { options, rest: rest.getAll(), lamCount: lamCount.platesCount };
}

// заполнение и подсчет целого ламината
function fillWholePlates(
  options: SelectedType,
  lamIdx: number,
  lamCount: LaminateDto,
  ost: number,
): number {
  const { l_lam, rows } = options;
  const whole = Math.floor(ost / l_lam);
  const row = rows[lamIdx];

  if (!row.tiles) row.tiles = [];

  for (let j = 0; j < whole; j++) {
    row.tiles.push({ ...lamCount.getNew(), w: row.width });
  }

  return whole * l_lam;
}

//ищет подходящий остаток
function addSlicePlate(
  options: SelectedType,
  lamIdx: number,
  lamCount: LaminateDto,
  rest: Ostatki,
  ost: number,
) {
  const { l_lam, rows, minOst } = options;
  if (ost > l_lam) throw new RangeError('ошибка в расчетах');

  const row = rows[lamIdx];
  if (!row.tiles) row.tiles = [];

  const lam = rest.get(ost);

  if (lam) {
    row.tiles.push({ ...lam, l: ost, w: row.width });

    if (lam.l - ost > minOst) rest.push({ ...lam, l: lam.l - ost });
  } else {
    const newLam = lamCount.getNew();
    newLam.l = ost;
    row.tiles.push({ ...newLam, w: row.width });

    if (l_lam - ost > minOst) rest.push({ ...newLam, l: l_lam - ost });
  }

  return ost;
}

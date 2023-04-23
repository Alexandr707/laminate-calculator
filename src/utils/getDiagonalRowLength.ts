import { RowType } from '@/@types/SelectedType';
import { Rectangle } from './Rectangle';
import { getRowCount } from './getRowCount';

export function getDiagonalRows(l_room: number, w_room: number, w_lam: number) {
  //максимальная диагональ для угла 45
  const maxLength = Rectangle.getDiagonal(Math.min(l_room, w_room));
  //диагональ комнаты
  const diag = Rectangle.getDiagonal(l_room, w_room);
  const rowCount = getRowCount(l_room, w_room, w_lam, true);
  const dx = l_room / (diag / w_lam);
  const dy = w_room / (diag / w_lam);
  console.log(dx, dy);

  const rows: RowType[] = [];

  for (let i = 1; i <= rowCount; i++) {
    const diagLength = ((i * w_lam) / Math.tan((45 * Math.PI) / 180)) * 2;

    let rowLength = Math.min(diagLength, maxLength);

    if (Rectangle.getSide(diagLength) > Math.max(l_room, w_room)) {
      rowLength = ((diag - i * w_lam) / Math.tan((45 * Math.PI) / 180)) * 2;
    }

    rows.push({
      length: Math.floor(Math.min(maxLength, rowLength)),
      width: w_lam,
      x: dx * (i - 1),
      y: w_lam * (i - 1),
    });
  }

  return rows;
}

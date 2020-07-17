
const CODES = {
  A: 65,
  Z: 90
}

function toCell(row, col) {
  return `
      <div class="cell"  data-row=${row} data-col=${col} contenteditable></div>
    `
}

function toCol(el) {
  return `
          <div class="column" data-col=${el} data-type="resizable">
            ${el}
            <div class="col-resize" data-resize="col"></div>
          </div>
    `
}


function createRow(content, i ) {
  const resize = i ? ' <div class="row-resize" data-resize="row"></div>' : ''
  return `
    <div class="row" data-type="resizable">
        <div class="row-info">
            ${i || ''}
            ${resize}
    </div>
        <div class="row-data">${content}</div>
    </div>
    `
}

export function createTable(rowsCount = 15 ) {
  const colsCounts = CODES.Z - CODES.A + 1
  const rows = []

  const cols = new Array(colsCounts)
      .fill('')
      .map((el, index)=>{
        return String.fromCharCode(CODES.A + index)
      }).map(toCol).join('')

  rows.push(createRow(cols))

  for (let i = 0; i < rowsCount; i++ ) {
    const cells = new Array(colsCounts)
        .fill('')
        .map((c, idx) => toCell(
            i + 1, String.fromCharCode(CODES.A + idx)
        )).join(' ')
    rows.push(createRow(cells, i + 1))
  }
  return rows.join('')
}

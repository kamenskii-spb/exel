
const CODES = {
  A: 65,
  Z: 90
}

function toCell() {
  return `
      <div class="cell" contenteditable></div>
    `
}

function createCol(el) {
  return `
          <div class="column">
            ${el}
          </div>
    `
}


function createRow(content, i) {
  return `
    <div class="row">
        <div class="row-info">${i + 1 || ''}</div>
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
      }).map(createCol).join('')

  rows.push(createRow(cols))

  for (let i = 0; i < rowsCount; i++ ) {
    const cells = new Array(colsCounts)
        .fill('')
        .map(toCell).join(' ')

    rows.push(createRow(cells, i))
  }
  return rows.join('')
}

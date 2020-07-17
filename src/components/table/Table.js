import {ExcelComponent} from '@core/ExcelComponent'
import {createTable} from '@/components/table/table.template'
import {$} from '@core/dom'

export class Table extends ExcelComponent {
  static className = 'excel__table'
  value = null
  constructor($root) {
    super($root, {
      listeners: [
        'mousedown'
      ]
    });
  }

  toHTML() {
    return createTable()
  }

  onMousedown(event) {
    if (event.target.dataset.resize) {
      const $resizer = $(event.target)
      const $parent = $resizer.closest('[data-type="resizable"]')
      const coords = $parent.getCoords()
      const cells = this.$root.findAll(
          `[data-col="${$parent.$el.textContent.trim()}"]`
      )


      const moveCol = (e) =>{
        $resizer.$el.classList.add('view-colResize')
        const delta = e.pageX - coords.right
        this.value = coords.width + delta
        $resizer.$el.style.left = this.value + 'px'
      }

      const moveRow = (e) => {
        const delta = e.pageY - coords.bottom
        this.value = coords.height + delta
        $parent.$el.style.height = this.value + 'px'
      }
      const move = event.target.dataset.resize === 'col' ? moveCol : moveRow


      document.onmousemove = (e) => {
        move(e)
      }
      document.onmouseup = () =>{
        document.onmousemove = null
        $resizer.$el.classList.remove('view-colResize')

        cells.forEach((c) => {
          // console.log(1,this.value)
          c.style.width = this.value + 'px'
        })
      }
    }
  }
}

// 499 msScripting
// 1768 msRendering

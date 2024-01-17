interface MasonryOptions {
  itemSelector?: string
  columnWidth?: number
  gutter?: number
  fitWidth?: boolean
}

export function masonryLoayout(selector: string, payload: MasonryOptions = {}) {
  return new Masonry(selector, payload)
}

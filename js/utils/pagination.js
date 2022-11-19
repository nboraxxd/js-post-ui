export function renderPagination(elementId, pagination) {
  const ulPagination = document.getElementById(elementId)
  if (!pagination || !ulPagination) return
  const { _page, _limit, _totalRows } = pagination

  // calc totalPages
  const totalPages = Math.ceil(_totalRows / _limit)

  // save page and totalPages to ulPagination
  ulPagination.dataset.page = _page
  ulPagination.dataset.totalPages = totalPages

  // check if enable/disable prev/next links
  if (_page <= 1) ulPagination.firstElementChild?.classList.add('disabled')
  else ulPagination.firstElementChild?.classList.remove('disabled')

  if (_page >= totalPages) ulPagination.lastElementChild?.classList.add('disabled')
  else ulPagination.lastElementChild?.classList.remove('disabled')
}

export async function handleFilterChange(filterName, filterValue) {
  try {
    // update query params
    const url = new URL(window.location)
    url.searchParams.set(filterName, filterValue)

    // reset page if needed
    if (filterName === 'title_like') url.searchParams.set('_page', 1)

    history.pushState({}, '', url)

    // fetch API
    // re-render post list
    const { data, pagination } = await postApi.getAll(url.searchParams)
    renderPostList(data)
    renderPagination(pagination)
  } catch (error) {
    console.log('failed to fetch post list', error)
  }
}

export function initPagination({ elementId, defaultParams, onChange }) {
  // blink click event for prev/next link
  const ulPagination = document.getElementById(elementId)
  if (!ulPagination) return

  // TODO: set current active page

  // add click event for prev link
  const prevLink = ulPagination.firstElementChild?.firstElementChild
  if (prevLink) {
    prevLink.addEventListener('click', (e) => {
      e.preventDefault()
      const page = Number.parseInt(ulPagination.dataset.page) || 1
      if (page > 2) onChange?.(page - 1)
    })
  }

  // add click event for next link
  const nextLink = ulPagination.lastElementChild?.firstElementChild
  if (nextLink) {
    nextLink.addEventListener('click', (e) => {
      e.preventDefault()
      const page = Number.parseInt(ulPagination.dataset.page) || 1
      const totalPages = ulPagination.dataset.totalPages
      if (page < totalPages) onChange?.(page + 1)
    })
  }
}

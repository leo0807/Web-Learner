
function useClickOutSide(
  refs: React.RefObject<HTMLElement | null>[],
  onClickOutSide: (event: KeyboardEvent) => void,
) {
  // TODO
  // document.addEventListener('click', xxx)

  document.addEventListener('click', function (e) {
    for (let i of refs) {
      if (e.target === i) {
        onClickOutSide(true);
      }
    }
  })

}
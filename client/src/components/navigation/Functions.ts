export const panelViewController = (
  e: MouseEvent,
  searchPanelBtnRef: React.RefObject<HTMLLIElement>,
  notificationPanelBtnRef: React.RefObject<HTMLLIElement>,
  leftSideRef: React.RefObject<HTMLDivElement>,
  searchPanelRef: React.RefObject<HTMLDivElement>,
  notificationPanelRef: React.RefObject<HTMLDivElement>,
  panel: "search" | "notifications" | null,
  setPanel: React.Dispatch<
    React.SetStateAction<"search" | "notifications" | null>
  >
) => {
  const l = e.composedPath();

  if (
    !(
      searchPanelBtnRef.current &&
      notificationPanelBtnRef.current &&
      leftSideRef.current &&
      searchPanelRef.current &&
      notificationPanelRef.current
    )
  )
    return;
  if (!panel) return;

  if (l.includes(leftSideRef.current)) return;
  if (panel == "notifications") {
    if (
      !(
        l.includes(notificationPanelBtnRef.current) ||
        l.includes(notificationPanelRef.current)
      )
    ) {
      setPanel(null);
    }
  } else {
    if (
      !(
        l.includes(searchPanelBtnRef.current) ||
        l.includes(searchPanelRef.current)
      )
    ) {
      setPanel(null);
    }
  }
};

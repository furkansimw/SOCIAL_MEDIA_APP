"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.panelViewController = void 0;
const panelViewController = (e, searchPanelBtnRef, notificationPanelBtnRef, leftSideRef, searchPanelRef, notificationPanelRef, panel, setPanel) => {
    const l = e.composedPath();
    if (!(searchPanelBtnRef.current &&
        notificationPanelBtnRef.current &&
        leftSideRef.current &&
        searchPanelRef.current &&
        notificationPanelRef.current))
        return;
    if (!panel)
        return;
    if (l.includes(leftSideRef.current))
        return;
    if (panel == "notifications") {
        if (!(l.includes(notificationPanelBtnRef.current) ||
            l.includes(notificationPanelRef.current))) {
            setPanel(null);
        }
    }
    else {
        if (!(l.includes(searchPanelBtnRef.current) ||
            l.includes(searchPanelRef.current))) {
            setPanel(null);
        }
    }
};
exports.panelViewController = panelViewController;
